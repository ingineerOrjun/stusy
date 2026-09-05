/* =========================================================
   PREDICTION — active learning

       PREDICT  →  commit  →  reveal  →  compare  →  explain

   A student who commits to an answer before seeing the result
   remembers the correction. A student who reads the correct answer
   straight away usually does not notice they would have been wrong.

   Markup contract (authored in the lesson, no JavaScript needed):

     <div class="predict" data-answer="b">
       <p class="predict-q">Predict · अनुमान गर्नुहोस्</p>
       <h4>What does pop() return here?</h4>
       <div class="predict-options">
         <button class="predict-opt" data-value="a">10</button>
         <button class="predict-opt" data-value="b">30</button>
       </div>
       <div class="predict-feedback">
         <p>Because a stack is LIFO…</p>
         <span class="np-cell">किनभने स्ट्याक LIFO हो…</span>
       </div>
     </div>

   Listeners are delegated from the document, so no inline handler is
   needed and any number of prediction blocks cost one listener.
   ========================================================= */
(function (global) {
  'use strict';

  var VERDICT = {
    right: { en: 'Correct — that is exactly right.', ne: 'ठिक — बिल्कुल सही।' },
    wrong: { en: 'Not quite. Read why below, then try the simulation.',
             ne: 'मिलेन। तल कारण पढ्नुहोस्, अनि सिमुलेसन चलाउनुहोस्।' }
  };

  function block(el){ return el.closest ? el.closest('.predict') : null; }

  function answered(box){ return box.getAttribute('data-answered') === 'true'; }

  function reveal(box, chosen){
    if (answered(box)) return;                 // one commitment per question
    var correct = box.getAttribute('data-answer');
    var opts = box.querySelectorAll('.predict-opt');
    var isRight = chosen === correct;

    for (var i = 0; i < opts.length; i++){
      var o = opts[i], v = o.getAttribute('data-value');
      o.disabled = true;
      o.setAttribute('aria-pressed', v === chosen ? 'true' : 'false');
      if (v === correct) o.classList.add('right');
      else if (v === chosen) o.classList.add('wrong');
    }

    var fb = box.querySelector('.predict-feedback');
    if (fb){
      var verdict = fb.querySelector('.verdict');
      if (!verdict){
        verdict = document.createElement('span');
        verdict.className = 'verdict';
        fb.insertBefore(verdict, fb.firstChild);
      }
      verdict.textContent = (isRight ? VERDICT.right.en : VERDICT.wrong.en) + ' ';
      verdict.style.color = isRight ? 'var(--color-success)' : 'var(--color-error)';

      var np = fb.querySelector('.verdict-np');
      if (!np){
        np = document.createElement('span');
        np.className = 'verdict-np np-cell';
        np.setAttribute('lang', 'ne');
        fb.appendChild(np);
      }
      np.textContent = isRight ? VERDICT.right.ne : VERDICT.wrong.ne;

      fb.classList.add('show');
      /* announce the outcome to assistive technology */
      fb.setAttribute('role', 'status');
    }

    box.setAttribute('data-answered', 'true');
    box.setAttribute('data-correct', isRight ? 'true' : 'false');
  }

  function init(){
    var boxes = document.querySelectorAll('.predict');
    for (var i = 0; i < boxes.length; i++){
      var b = boxes[i];
      if (!b.getAttribute('data-answer')){
        /* An unanswerable prediction is an authoring mistake. Make it
           visible in the console rather than silently inert. */
        if (global.console && console.warn){
          console.warn('predict: block is missing data-answer', b);
        }
        continue;
      }
      var opts = b.querySelectorAll('.predict-opt');
      for (var j = 0; j < opts.length; j++){
        opts[j].setAttribute('type', 'button');
        opts[j].setAttribute('aria-pressed', 'false');
      }
      var fb = b.querySelector('.predict-feedback');
      if (fb) fb.classList.remove('show');
    }
  }

  function onClick(e){
    var t = e.target;
    var opt = t && t.closest ? t.closest('.predict-opt') : null;
    if (!opt) return;
    var box = block(opt);
    if (!box) return;
    reveal(box, opt.getAttribute('data-value'));
  }

  function ready(fn){
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  ready(function(){
    init();
    document.addEventListener('click', onClick);
  });

  /* exposed for tests and for a future "reset this lesson" control */
  global.Predict = { init: init, reveal: reveal };
  if (typeof module !== 'undefined' && module.exports) module.exports = global.Predict;

})(typeof window !== 'undefined' ? window : globalThis);
