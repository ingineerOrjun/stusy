/* =========================================================
   6. QUIZ
   ========================================================= */
/* Questions come from the bank via QuizService. The engine below renders
   and scores; it does not own the content. Swapping in a per-unit or
   shuffled quiz is a change to this one call.
   Bank: _source/content/questions/  ->  assets/js/question-bank.js */
/* Which subject's bank, how many questions, and whether to draw a fresh
   selection each attempt, all come from the page rather than from here —
   so a second subject's quiz is a page, not a second engine.

     <main data-subject="grade10/digital-design">
     <div id="quizBox" data-limit="15" data-shuffle="true">

   A bank bigger than the limit means a retake is a different paper,
   which is the difference between practising and memorising an order. */
function quizConfig(){
  var box = document.getElementById('quizBox');
  var main = document.querySelector('main[data-subject]');
  var subject = (box && box.getAttribute('data-subject')) ||
                (main && main.getAttribute('data-subject')) ||
                'grade10/oop-cpp';
  var limit = box && parseInt(box.getAttribute('data-limit'), 10);
  return {
    subject: subject,
    limit: limit > 0 ? limit : undefined,
    shuffle: !!(box && box.getAttribute('data-shuffle') === 'true')
  };
}

var CFG = quizConfig();
var QUIZ = QuizService.toRenderModel(QuizService.getQuiz(CFG));

var answered = [], score = 0;

function esc(s){
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* Both halves are written into the DOM; the language layer shows the
   right one. Rendering only the current language would mean re-rendering
   on every switch, and re-rendering a quiz is how you lose a student's
   answers. The Nepali half is omitted entirely when the bank has none,
   so an untranslated question does not leave an empty box behind. */
function bilingual(pair, enClass, neClass){
  var hasEn = !!(pair && pair.en);
  /* Identical halves are a value, not a translation — "1011" and "1011".
     Showing it twice is noise on a screen that is already carrying two
     languages, so the pair collapses to one. */
  var hasNe = !!(pair && pair.ne) && pair.ne.trim() !== (pair.en || '').trim();
  /* Without a Nepali half there is nothing for Nepali mode to fall back
     to, so the English must not be tagged as hideable — otherwise the
     mode would blank the question instead of translating it. An
     untranslated question shows in English in every mode, which is
     visibly a content gap rather than a broken quiz. */
  var enCls = hasNe ? enClass : enClass.replace(/\bt-en\b/, '').trim();
  var en = hasEn
    ? '<span' + (enCls ? ' class="' + enCls + '"' : '') + '>' + esc(pair.en) + '</span>' : '';
  var ne = hasNe
    ? '<span class="' + neClass + '" lang="ne">' + esc(pair.ne) + '</span>' : '';
  return en + ne;
}

function buildQuiz(){
  var box = document.getElementById('quizBox');
  if (!box) return;
  var h = '';
  for (var i = 0; i < QUIZ.length; i++){
    var Q = QUIZ[i];
    h += '<div class="q" id="q' + i + '">';
    h += '<div class="qn">QUESTION ' + (i + 1) + ' OF ' + QUIZ.length + '</div>';
    h += '<h2 class="q-title">' + bilingual(Q.q, 't-en q-en', 't-ne q-ne') + '</h2>';
    for (var j = 0; j < Q.o.length; j++){
      h += '<button class="opt" id="o' + i + '_' + j + '" onclick="answer(' + i + ',' + j + ')">' +
           '<span class="opt-key">' + String.fromCharCode(65 + j) + '.</span> ' +
           bilingual(Q.o[j], 't-en', 't-ne') + '</button>';
    }
    h += '<div class="expl" id="e' + i + '" role="status"></div>';
    h += '</div>';
  }
  box.innerHTML = h;
  answered = []; score = 0;
  document.getElementById('scoreBox').style.display = 'none';
}

function answer(i, j){
  if (answered[i] !== undefined) return;
  answered[i] = j;
  var Q = QUIZ[i];
  var correct = Q.a;
  for (var k = 0; k < Q.o.length; k++){
    var b = document.getElementById('o' + i + '_' + k);
    b.disabled = true;
    if (k === correct) b.className = 'opt right';
    else if (k === j)  b.className = 'opt wrong';
  }
  if (j === correct) score++;
  /* The verdict is bilingual too — a Nepali-mode student should not have
     to read "Not correct" in English to find out they were wrong. */
  var right = (j === correct);
  var letter = String.fromCharCode(65 + correct);
  var verdict = right
    ? { en: 'Correct.', ne: 'ठिक भयो।' }
    : { en: 'Not correct. The answer is ' + letter + '.',
        ne: 'मिलेन। सही उत्तर ' + letter + ' हो।' };

  var e = document.getElementById('e' + i);
  e.innerHTML =
    '<b style="color:' + (right ? 'var(--green)' : 'var(--coral)') + '">' +
    bilingual(verdict, 't-en', 't-ne') + '</b> ' +
    bilingual(Q.e, 't-en', 't-ne np-cell');
  e.className = 'expl show';

  var done = 0;
  for (var m = 0; m < QUIZ.length; m++) if (answered[m] !== undefined) done++;
  if (done === QUIZ.length) showScore();
}

function showScore(){
  if (!document.getElementById("scoreBox")) return;
  var box = document.getElementById('scoreBox');
  document.getElementById('scoreNum').textContent = score + ' / ' + QUIZ.length;
  var msg, msgNp;
  var pct = score / QUIZ.length;
  if (pct === 1)        { msg = 'Perfect. You are ready for this subject.';            msgNp = 'पूर्ण अंक! यो विषयका लागि तपाईं तयार हुनुहुन्छ।'; }
  else if (pct >= 0.8)  { msg = 'Very good. Revise only the ones you missed.';          msgNp = 'धेरै राम्रो। गलत भएका मात्र फेरि हेर्नुहोस्।'; }
  else if (pct >= 0.6)  { msg = 'Good start. Read the comparison tables once more.';    msgNp = 'राम्रो सुरुवात। तुलनात्मक तालिका फेरि एक पटक पढ्नुहोस्।'; }
  else if (pct >= 0.4)  { msg = 'Keep going. Re-read Units 3, 5 and 6, then try again.';msgNp = 'हार नमान्नुहोस्। युनिट ३, ५ र ६ फेरि पढेर पुनः प्रयास गर्नुहोस्।'; }
  else                  { msg = 'Start again from Unit 1 and use the Trace section slowly.'; msgNp = 'युनिट १ बाट फेरि सुरु गर्नुहोस् र Trace सेक्सन बिस्तारै चलाउनुहोस्।'; }
  document.getElementById('scoreMsg').textContent   = msg;
  document.getElementById('scoreMsgNp').textContent = msgNp;
  box.style.display = 'block';
  box.scrollIntoView({behavior:'smooth', block:'center'});
}

function resetQuiz(){
  /* Draw again when the bank is shuffled, so a second attempt is a new
     paper rather than the same fifteen questions in the same order. */
  if (CFG.shuffle) QUIZ = QuizService.toRenderModel(QuizService.getQuiz(CFG));
  buildQuiz();
  document.getElementById('quiz').scrollIntoView({behavior:'smooth'});
}

buildQuiz();
