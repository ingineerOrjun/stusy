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
  set('scoreNum', score + ' / ' + QUIZ.length);
  var msg, msgNp;
  var pct = score / QUIZ.length;
  if (pct === 1)        { msg = 'Perfect. You are ready for this subject.';            msgNp = 'पूर्ण अंक! यो विषयका लागि तपाईं तयार हुनुहुन्छ।'; }
  else if (pct >= 0.8)  { msg = 'Very good. Revise only the ones you missed.';          msgNp = 'धेरै राम्रो। गलत भएका मात्र फेरि हेर्नुहोस्।'; }
  /* WHY NO MESSAGE HERE NAMES A UNIT
     Two of these used to be written for one subject: "Re-read Units 3,
     5 and 6" and "use the Trace section slowly". This engine serves five
     subjects. A Grade 9 student who scored 45% on Fundamentals of
     Computer and Application was told to re-read three units that do not
     exist in their subject and to use a Trace section that exists only
     in C++.

     These five lines say how the attempt went, and nothing else. Units
     are named on their own line below, with a label saying what kind of
     recommendation it is, because "where to go back to" has two
     different answers and a sentence that merges them is the defect in
     a new shape. See renderFocus(). */
  else if (pct >= 0.6)  { msg = 'Good start. Re-read the explanations under the ones you missed.';
                          msgNp = 'राम्रो सुरुवात। छुटेका प्रश्नमुनिको व्याख्या फेरि पढ्नुहोस्।'; }
  else if (pct >= 0.4)  { msg = 'Keep going. Work through the explanations above, then try again.';
                          msgNp = 'हार नमान्नुहोस्। माथिका व्याख्या पढेर पुनः प्रयास गर्नुहोस्।'; }
  else                  { msg = 'Go back over the unit and read it slowly before trying again.';
                          msgNp = 'पुनः प्रयास गर्नुअघि युनिट फेरि बिस्तारै पढ्नुहोस्।'; }
  /* WHY THESE ARE GUARDED AND THE DISPLAY COMES FIRST
     `document.getElementById('scoreMsgNp').textContent = msgNp` threw on
     three of the five quiz pages — cf-quiz, db-quiz and hw-quiz all ship
     a score box without the Nepali line. The throw landed BEFORE
     `box.style.display = 'block'`, so a student who answered every
     question saw no score at all: the quiz simply stopped. Measured by
     answering all twelve on each page, not by reading the markup.

     The markup is fixed and validate.js now refuses a score box that is
     missing a part. This stays guarded anyway, because the cost of the
     next omission should be one missing line of Nepali, not a student
     finishing a quiz and being shown nothing. */
  set('scoreMsg', msg);
  set('scoreMsgNp', msgNp);
  box.style.display = 'block';
  /* AFTER the box is shown, deliberately. Phase 12.1's defect was a
     throw between the writes and the reveal, which left a student who
     answered every question looking at nothing. The recommendation line
     is the least important thing here and must never be able to cost
     the score. */
  try { renderFocus(); } catch (e) { /* the score is already on screen */ }
  box.scrollIntoView({behavior:'smooth', block:'center'});
}

function set(id, text){
  var el = document.getElementById(id);
  if (el) el.textContent = text;
}

/* "Unit 2 Concept of Logic Gates and Unit 5 Introduction to
   Microprocessor" — named with their real titles so a student does not
   have to go and look up what Unit 5 was. The Nepali list is joined with
   र, not a comma and "and", because that is how a list ends in Nepali. */
function focusList(units, lang){
  var parts = [];
  for (var i = 0; i < units.length; i++){
    var t = units[i].title || {};
    var title = lang === 'ne' ? (t.ne || t.en || '') : (t.en || '');
    parts.push((lang === 'ne' ? 'युनिट ' : 'Unit ') + units[i].n +
               (title ? ' ' + title : ''));
  }
  if (!parts.length) return '';
  if (parts.length === 1) return parts[0];
  var last = parts.pop();
  return parts.join(', ') + (lang === 'ne' ? ' र ' : ' and ') + last;
}

/* THE LABELLED RECOMMENDATION LINE

   "Where should I go back to?" has two answers and they are not
   interchangeable:

     teacher   units a teacher judged students should revisit
     exam      units carrying the most marks in the written paper

   A line that showed one in the other's voice would tell a student
   something false — that a heavy unit is hard, or that a light one is
   safe to skip. So the line always says which kind it is, and the
   examination wording talks about MARKS and never about difficulty.

   Only one line is shown: the teacher's list when a subject has one,
   otherwise examination priority. Two stacked recommendations after a
   bad score is noise at the moment a student is least able to sort it.

   Nothing is shown at all when a subject has neither — the band message
   above still reads on its own, so a missing registration costs
   specificity and never correctness. */
function renderFocus(){
  var el = document.getElementById('scoreFocus');
  if (!el) return;
  el.innerHTML = '';
  el.hidden = true;

  if (typeof QuizService === 'undefined' || !QuizService.focusKind) return;
  var kind = QuizService.focusKind(CFG.subject);
  if (!kind) return;
  var units = QuizService.getFocus(CFG.subject, kind);
  if (!units.length) return;

  var lead = kind === 'teacher'
    ? { en: 'Your teacher suggests revising', ne: 'शिक्षकले दोहोर्‍याउन सुझाएका' }
    : { en: 'Most marks in the written exam are in',
        ne: 'लिखित परीक्षामा सबैभन्दा धेरै अंक यहाँ छन्' };

  /* Said once, plainly, under the examination list: marks are not a
     measure of how hard something is. A student who reads "most marks
     are in Unit 2" and concludes "Unit 5 is easy" has been misled by
     the layout, not by the sentence. */
  var caveat = kind === 'exam'
    ? { en: 'That is where the marks are, not where the subject is hardest.',
        ne: 'यो अंक कहाँ छन् भन्ने हो — कुन कठिन छ भन्ने होइन।' }
    : null;

  var pair = {
    en: lead.en + ': ' + focusList(units, 'en') + '.' + (caveat ? ' ' + caveat.en : ''),
    ne: lead.ne + ': ' + focusList(units, 'ne') + '।' + (caveat ? ' ' + caveat.ne : '')
  };

  el.innerHTML = '<span class="foc-k" data-kind="' + kind + '">' +
                 bilingual(kind === 'teacher'
                   ? { en: 'Teacher’s revision list', ne: 'शिक्षकको दोहोर्‍याउने सूची' }
                   : { en: 'Examination priority', ne: 'परीक्षाको प्राथमिकता' },
                   't-en', 't-ne np-cell') + '</span> ' +
                 bilingual(pair, 't-en', 't-ne np-cell');
  el.hidden = false;
}

function resetQuiz(){
  /* Draw again when the bank is shuffled, so a second attempt is a new
     paper rather than the same fifteen questions in the same order. */
  if (CFG.shuffle) QUIZ = QuizService.toRenderModel(QuizService.getQuiz(CFG));
  buildQuiz();
  /* Only two of the five quiz sections are id="quiz"; the rest are
     id="cf-quiz", "db-quiz", "hw-quiz". Scrolling to the box the quiz is
     actually in works for all of them and cannot go stale when a sixth
     subject picks its own id. */
  var box = document.getElementById('quizBox');
  var target = (box && box.parentNode && box.parentNode.scrollIntoView)
    ? box.parentNode : box;
  if (target) target.scrollIntoView({behavior:'smooth'});
}

buildQuiz();
