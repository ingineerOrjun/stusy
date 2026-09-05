/* =========================================================
   6. QUIZ
   ========================================================= */
/* Questions come from the bank via QuizService. The engine below renders
   and scores; it does not own the content. Swapping in a per-unit or
   shuffled quiz is a change to this one call.
   Bank: _source/content/questions/  ->  assets/js/question-bank.js */
var QUIZ = QuizService.toRenderModel(
  QuizService.getQuiz({ subject: 'grade10/oop-cpp' })
);

var answered = [], score = 0;

function buildQuiz(){
  var box = document.getElementById('quizBox');
  if (!box) return;
  var h = '';
  for (var i = 0; i < QUIZ.length; i++){
    var Q = QUIZ[i];
    h += '<div class="q" id="q' + i + '">';
    h += '<div class="qn">QUESTION ' + (i + 1) + ' OF ' + QUIZ.length + '</div>';
    h += '<h4>' + Q.q + '</h4>';
    for (var j = 0; j < Q.o.length; j++){
      h += '<button class="opt" id="o' + i + '_' + j + '" onclick="answer(' + i + ',' + j + ')">' +
           String.fromCharCode(65 + j) + '. ' + Q.o[j] + '</button>';
    }
    h += '<div class="expl" id="e' + i + '"></div>';
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
  var e = document.getElementById('e' + i);
  e.innerHTML = '<b style="color:' + (j === correct ? 'var(--green)' : 'var(--coral)') + '">' +
                (j === correct ? 'Correct. ' : 'Not correct. The answer is ' + String.fromCharCode(65 + correct) + '. ') +
                '</b>' + Q.e + '<span class="np-cell">' + Q.n + '</span>';
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
  buildQuiz();
  document.getElementById('quiz').scrollIntoView({behavior:'smooth'});
}

buildQuiz();
