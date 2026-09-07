/* =========================================================
   RETRIEVAL — turning 64 reveal buttons into retrieval practice

   THE PROBLEM THIS SOLVES
   Every practice question in the product ended in a button that said
   "Show the answer". A student reads the question, presses the button,
   reads the model answer, and feels they have studied. They have not.
   Recognising an answer is not the same as producing one, and the
   feeling of fluency that reading produces is the single most reliable
   predictor of a student overestimating what they know.

   Retrieval practice — attempting to produce the answer BEFORE seeing
   it — is one of the most robustly evidenced findings in learning
   science, and the gap between it and re-reading widens as the delay to
   the exam grows. The markup already had the question and the model
   answer. The only thing missing was the requirement to try.

   WHY THIS CHANGED NO CONTENT
   All 64 questions upgraded at once, in 18 files nobody edited, because
   `.examq` already carries everything this needs: the question, the
   mark allocation, and the model answer keyed by data-answer. The
   component supplies the one thing content cannot — a gate.

   THE SHAPE

       question + marks          (already authored)
             |
       attempt  ...............  optional scratch space, never stored
             |
       COMMIT  ................  a deliberate act. Nothing reveals before it
             |
       model answer  ..........  (already authored)
             |
       self-assess ............  Got it / Partly / Not yet
             |
       recorded  ..............  ProgressService, so §17 can show growth

   WHY SELF-ASSESSMENT AND NOT AUTO-MARKING
   These are written SEE answers — "name three families and give two
   statements each". No string comparison can mark that, and a component
   that pretended to would teach students to write for the matcher.
   Judging your own answer against a mark scheme is the skill the exam
   actually rewards, so the component asks for it directly.

   WHY THE SCRATCH SPACE IS NOT SAVED
   Storing free text raises questions this component should not answer —
   what is kept, for how long, on whose device. The learning signal is
   the attempt and the self-grade, and only the self-grade is recorded.
   The textarea says so.
   ========================================================= */
(function (global) {
  'use strict';

  var doc = global.document;
  if (!doc) return;

  var GRADES = [
    { key: 'gotIt',  value: 'got',     tone: 'ok'   },
    { key: 'partly', value: 'partly',  tone: 'mid'  },
    { key: 'notYet', value: 'not',     tone: 'no'   }
  ];

  function ui(key, fallback){
    return (typeof global.UIStrings !== 'undefined' && global.UIStrings.get)
      ? global.UIStrings.get(key) : fallback;
  }

  /* A question's identity has to survive a rebuild, so it is the answer
     id the author already wrote rather than an index into the page. */
  function idOf(box){
    var btn = box.querySelector('[data-answer]');
    return btn ? btn.getAttribute('data-answer') : null;
  }

  function record(qid, grade){
    var P = global.ProgressService;
    if (!P || typeof P.recordRetrieval !== 'function') return;
    try { P.recordRetrieval(qid, grade); } catch (e){ /* never break the lesson */ }
  }

  function build(box){
    var btn = box.querySelector('.btn-ans[data-answer]');
    if (!btn) return;
    var id = btn.getAttribute('data-answer');
    var ans = doc.getElementById(id);
    if (!ans) return;

    box.classList.add('examq-retrieval');
    ans.setAttribute('aria-hidden', 'true');
    ans.classList.remove('show');

    /* ---- the attempt ---- */
    var attempt = doc.createElement('div');
    attempt.className = 'rt-attempt';

    var lab = doc.createElement('label');
    lab.className = 'rt-label';
    lab.setAttribute('for', id + '-try');
    lab.innerHTML =
      '<span class="t-en" data-ui="attemptLabel">Write your answer first — it is not saved</span>' +
      '<span class="t-ne np-cell" lang="ne">पहिले आफ्नो उत्तर लेख्नुहोस् — यो सुरक्षित गरिँदैन</span>';

    var ta = doc.createElement('textarea');
    ta.className = 'rt-input';
    ta.id = id + '-try';
    ta.rows = 3;
    ta.setAttribute('spellcheck', 'false');

    attempt.appendChild(lab);
    attempt.appendChild(ta);
    box.insertBefore(attempt, btn);

    /* ---- the gate ----
       The existing button is reused rather than replaced: core.js has
       already given it aria-controls and aria-expanded, and the CSS
       already styles it. Only what it SAYS and what it costs change. */
    btn.setAttribute('data-ui', 'revealAfterAttempt');
    btn.textContent = ui('revealAfterAttempt', 'I have attempted it — show the answer');
    btn.setAttribute('aria-controls', id);
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('type', 'button');

    /* ---- the self-assessment, built now and revealed with the answer ---- */
    var judge = doc.createElement('div');
    judge.className = 'rt-judge';
    judge.hidden = true;

    var jlab = doc.createElement('p');
    jlab.className = 'rt-judge-q';
    jlab.id = id + '-judge';
    jlab.innerHTML =
      '<span class="t-en">Compare your answer with the model. How did you do?</span>' +
      '<span class="t-ne np-cell" lang="ne">आफ्नो उत्तर नमुनासँग मिलाउनुहोस्। कस्तो भयो?</span>';

    var group = doc.createElement('div');
    group.className = 'rt-grades';
    group.setAttribute('role', 'group');
    group.setAttribute('aria-labelledby', jlab.id);

    GRADES.forEach(function (g){
      var b = doc.createElement('button');
      b.type = 'button';
      b.className = 'rt-grade rt-' + g.tone;
      b.setAttribute('data-ui', g.key);
      b.setAttribute('data-grade', g.value);
      b.setAttribute('aria-pressed', 'false');
      b.textContent = ui(g.key, g.key);
      group.appendChild(b);
    });

    var said = doc.createElement('p');
    said.className = 'rt-said';
    said.setAttribute('role', 'status');

    judge.appendChild(jlab);
    judge.appendChild(group);
    judge.appendChild(said);
    ans.parentNode.insertBefore(judge, ans.nextSibling);

    /* ---- behaviour ---- */
    var revealed = false;

    btn.addEventListener('click', function (e){
      e.preventDefault();
      revealed = !revealed;
      ans.classList.toggle('show', revealed);
      ans.setAttribute('aria-hidden', revealed ? 'false' : 'true');
      btn.setAttribute('aria-expanded', revealed ? 'true' : 'false');
      var key = revealed ? 'hideAnswer' : 'revealAfterAttempt';
      btn.setAttribute('data-ui', key);
      btn.textContent = ui(key, revealed ? 'Hide the answer' : 'I have attempted it — show the answer');
      judge.hidden = !revealed;
    });

    group.addEventListener('click', function (e){
      var b = e.target.closest ? e.target.closest('.rt-grade') : null;
      if (!b || !group.contains(b)) return;
      var kids = group.querySelectorAll('.rt-grade');
      for (var i = 0; i < kids.length; i++){
        kids[i].setAttribute('aria-pressed', kids[i] === b ? 'true' : 'false');
      }
      var grade = b.getAttribute('data-grade');
      record(id, grade);
      /* WHY the feedback is a sentence and not a tick.
         §17: motivation comes from visible competence, so the response
         names what the student did and what to do next. */
      said.innerHTML = feedbackFor(grade);
    });

    /* keep the label correct across a language switch */
    doc.addEventListener('languagechange', function (){
      var key = btn.getAttribute('data-ui');
      if (key) btn.textContent = ui(key, btn.textContent);
    });
  }

  function feedbackFor(grade){
    if (grade === 'got'){
      return '<span class="t-en">Recorded. Producing it from memory is what the exam asks for — ' +
             'this one is worth a quick check again in a few days, not a re-read now.</span>' +
             '<span class="t-ne np-cell" lang="ne">रेकर्ड भयो। सम्झेर लेख्न सक्नु नै परीक्षामा चाहिने कुरा हो — ' +
             'यसलाई अहिले फेरि पढ्नुभन्दा केही दिनपछि एक पटक जाँच्नु राम्रो।</span>';
    }
    if (grade === 'partly'){
      return '<span class="t-en">Recorded. Find the exact part you missed and re-read only that — ' +
             'then answer this question again without looking.</span>' +
             '<span class="t-ne np-cell" lang="ne">रेकर्ड भयो। छुटेको ठ्याक्कै भाग पत्ता लगाएर त्यति मात्र फेरि पढ्नुहोस् — ' +
             'अनि नहेरी यही प्रश्न फेरि उत्तर दिनुहोस्।</span>';
    }
    return '<span class="t-en">Recorded. Read the explanation above this question, then come back ' +
           'and answer it again with the answer hidden.</span>' +
           '<span class="t-ne np-cell" lang="ne">रेकर्ड भयो। यो प्रश्नमाथिको व्याख्या पढ्नुहोस्, ' +
           'अनि उत्तर लुकाएर फेरि यहीँ आएर उत्तर दिनुहोस्।</span>';
  }

  function mount(){
    var boxes = doc.querySelectorAll('.examq');
    for (var i = 0; i < boxes.length; i++){
      if (boxes[i].classList.contains('examq-retrieval')) continue;
      build(boxes[i]);
    }
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', mount);
  else mount();

  global.Retrieval = { mount: mount, feedbackFor: feedbackFor };

})(typeof window !== 'undefined' ? window : this);
