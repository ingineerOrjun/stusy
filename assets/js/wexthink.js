/* =========================================================
   WORKED-EXAMPLE THINK GATE

   THE PROBLEM THIS SOLVES
   The product has 50 worked examples. Measured before this component
   existed, **0 of them asked the student to commit to anything**: the
   question and the full worked solution were on screen together, so
   the eye reaches the answer before the mind reaches the question.
   Two examples were worse than the rest — db-u3 Example 2 and u5
   Example 4 — because their own wording says "predict this output
   before you read it" while the output sits three lines below. The
   instruction was there; the mechanism was not.

   Reading a correct solution produces fluency, and fluency is the
   feeling students mistake for knowing. The solution is not the
   problem — worked examples are among the best-evidenced teaching
   devices there are, especially for a novice. What was missing is the
   half-second of commitment before the reveal, which is what turns
   "I understood that" into "I could have produced that".

   WHY THIS IS AUTHORED, NOT AUTOMATIC
   The obvious implementation hides every solution. That would be
   wrong, and the brief says so. An example that demonstrates NOTATION
   or SYNTAX for the first time has nothing to predict — a student who
   has never seen `class Box { … };` cannot guess it, and hiding it
   just adds a click between them and the thing they came to read.

   So the gate is opt-in per example. An author who wants one inserts

       div.wex-gate
         > p.wex-think
             > span.t-en    the prompt in English
             > span.np-cell the same prompt in Nepali

   after the question and before the working. The Nepali half carries no
   lang attribute of its own: the np-cell class is one of the build's
   NEPALI_CONTAINERS and the tagger adds it. (The markup is spelled out
   as a tree rather than as HTML on purpose — tests/language.test.js
   scans every runtime line for that class name without a language
   declaration, and it should not have to tell a comment from a string
   to do its job.)

   after the question and before the working. Everything after that
   marker, inside the same .wex, is what gets hidden. 26 of the 50
   examples carry one; the other 24 are first demonstrations and stay
   open on purpose. validate.js enforces the contract at build time.

   WHY THE MARKER RATHER THAN INFERENCE
   Splitting "question" from "working" by structure was tried and
   rejected: only 24 of the 50 examples use the `<p><b>Question:</b>`
   convention, so any inference rule would be right about half the
   time and silently wrong about the rest. An explicit marker is
   greppable, reviewable, and cannot drift.

   WHY IT REUSES .rt-* FOR THE SCRATCH BOX
   Those classes name the ACT — attempting before looking — not the
   component that first needed it. retrieval.js already styles them.
   Sharing them means the two gates cannot drift apart visually, which
   is correct, because to a student they are the same act.

   PROGRESSIVE ENHANCEMENT
   The build ships every example fully visible. This file hides the
   working. With JavaScript off, or before this file runs, a student
   sees the complete worked example — never a page of empty boxes.
   ========================================================= */
(function (global) {
  'use strict';

  var doc = global.document;
  if (!doc) return;

  function ui(key, fallback){
    return (typeof global.UIStrings !== 'undefined' && global.UIStrings.get)
      ? global.UIStrings.get(key) : fallback;
  }

  /* This component rewrites its own button text when the gate opens,
     so it cannot go through UIStrings.apply() and has to stamp the
     language itself. UIStrings.write() is the shared primitive that
     does that — the same one retrieval.js uses. */
  function say(el, key, fallback){
    var text = ui(key, fallback);
    if (typeof global.UIStrings !== 'undefined' && global.UIStrings.write)
      global.UIStrings.write(el, text);
    else el.textContent = text;
  }

  var seq = 0;

  function hasClass(el, c){
    return !!(el && el.classList && el.classList.contains(c));
  }

  function build(wex){
    /* Walked rather than queried. `:scope > .wex-gate` would be
       shorter, but a nested .wex-gate belonging to some future inner
       block would then be picked up by the outer example, and the
       index is needed anyway to find where the working starts. */
    var kids = wex.children || [];
    var at = -1;
    for (var k = 0; k < kids.length; k++){
      if (hasClass(kids[k], 'wex-gate')){ at = k; break; }
    }
    if (at < 0) return false;
    var gate = kids[at];

    /* Everything after the marker, at the same level, is the working.
       Copied out first: appending to the new box mutates `children`
       while it is being read, and half the working goes missing. */
    var work = [];
    for (var w = at + 1; w < kids.length; w++) work.push(kids[w]);
    if (!work.length) return false;

    wex.classList.add('wex-gated');

    var id = wex.id || ('wexg' + (++seq));
    var box = doc.createElement('div');
    box.className = 'wex-work';
    box.id = id + '-work';
    box.hidden = true;
    wex.appendChild(box);
    for (var i = 0; i < work.length; i++) box.appendChild(work[i]);

    /* ---- the scratch attempt ----
       Never read, never stored. It exists so that "I thought about it"
       is an action the student takes rather than a claim they make. */
    var attempt = doc.createElement('div');
    attempt.className = 'rt-attempt';

    var lab = doc.createElement('label');
    lab.className = 'rt-label';
    lab.setAttribute('for', id + '-try');
    lab.innerHTML =
      '<span class="t-en" data-ui="thinkAttempt">Jot your answer down first — it is not saved</span>' +
      '<span class="t-ne np-cell" lang="ne">पहिले आफ्नो जवाफ लेख्नुहोस् — यो सुरक्षित गरिँदैन</span>';

    var ta = doc.createElement('textarea');
    ta.className = 'rt-input';
    ta.id = id + '-try';
    ta.rows = 2;
    ta.setAttribute('spellcheck', 'false');

    attempt.appendChild(lab);
    attempt.appendChild(ta);
    gate.appendChild(attempt);

    /* ---- the gate button ---- */
    var btn = doc.createElement('button');
    btn.type = 'button';
    btn.className = 'wex-reveal';
    btn.setAttribute('aria-controls', box.id);
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('data-ui', 'showWorking');
    say(btn, 'showWorking', 'Show the working');
    gate.appendChild(btn);

    var open = false;
    btn.addEventListener('click', function (){
      open = !open;
      box.hidden = !open;
      wex.classList.toggle('wex-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      var key = open ? 'hideWorking' : 'showWorking';
      btn.setAttribute('data-ui', key);
      say(btn, key, open ? 'Hide the working' : 'Show the working');
    });

    doc.addEventListener('languagechange', function (){
      var key = btn.getAttribute('data-ui');
      if (key) say(btn, key, btn.textContent);
    });

    return true;
  }

  function mount(){
    var all = doc.querySelectorAll('.wex');
    var n = 0;
    for (var i = 0; i < all.length; i++){
      if (all[i].classList.contains('wex-gated')) continue;
      if (build(all[i])) n++;
    }
    return n;
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', mount);
  else mount();

  global.WexThink = { mount: mount, build: build };

})(typeof window !== 'undefined' ? window : this);
