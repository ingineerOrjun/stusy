/* =========================================================
   C PROGRAM STEPPER — what each line does to each variable

   THE PROBLEM THIS SOLVES
   A listing answers "what was written". It cannot answer the question
   the whole of Grade 9 C actually turns on: what is the value of i right
   now, and why did the loop stop? A student who can read every line of a
   for loop and still cannot say what sum holds on the third turn has not
   learnt the loop — and nothing on a printed page will tell them, because
   the page shows the program in its final state and the program is only
   ever in intermediate ones.

   So this component shows three things at once, moving together:

     the code       with the line that is executing right now marked
     the variables  a row each, the one that just changed highlighted
     the console    exactly what has been printed SO FAR, and nothing more

   The console is the part that is easy to get wrong and expensive to get
   wrong. A stepper that shows the whole output from the start teaches
   that printf happens all at once at the end, which is the misconception
   it was built to remove.

   WHY THE STUDENT DRIVES IT AND NOT A TIMER
   Prediction only works if there is a moment to predict in. Press Next
   and the line runs; the pause before pressing is where the learning is.
   An auto-playing animation removes exactly that pause. There is a Prev
   for the same reason: "wait, how did sum become 6?" needs an answer that
   is one press away rather than a restart.

   NO ANIMATION AT ALL, therefore, and nothing to wait for. MotionService
   is not consulted because nothing here moves.

   WHAT THIS IS NOT
   It is NOT a C interpreter. Every step is authored, and the authoring
   is what a test can check: each program's `output` declares what the
   finished program prints, independently of the steps that produce it,
   and tests/grade9-c.test.js fails if the two disagree. Two separate
   authorings that must agree is the strongest check available without a
   compiler, and this file says plainly that no compiler ran.

   WHERE THE PROGRAMS ARE
   NOT here. They are content, and they live in
   _source/content/programs/, which that file's header explains. This
   module is the engine and knows no subject, no unit and no language.

   MOUNTING
       <div class="crun" data-program="forSum"></div>

   The key names a registered program. A missing key renders a visible
   message rather than an empty box, because an empty box is the failure
   mode this product has met before and it is silent.
   ========================================================= */
(function (global) {
  'use strict';

  /* No early return when there is no document, so the module can be
     required by the test suite and by the build without one. Nothing
     here touches the document until mount() is called. */
  var doc = global.document || null;

  /* ---------------------------------------------------------------
     THE REGISTRY

     The programs are CONTENT and live in
     _source/content/programs/, exactly as the question banks and the
     practice banks do. The build turns that file into a list of
     register() calls in assets/js/program-bank.js, which a page loads
     after this module. Nothing here knows a subject, a unit or a
     language.
     --------------------------------------------------------------- */
  var PROGRAMS = {};

  function register(prog){
    if (!prog || !prog.id) return false;
    PROGRAMS[prog.id] = prog;
    return true;
  }

  /* ---------------------------------------------------------------
     THE COMPONENT
     --------------------------------------------------------------- */

  /* The only two strings this component owns. Everything else it shows
     comes from the programs or from the UI string table. */
  var LINE = { en: 'Line', ne: 'लाइन' };
  var OPENING = {
    en: 'Press Next to run the first line. Watch the variables, not just the code.',
    ne: 'पहिलो लाइन चलाउन Next थिच्नुहोस्। कोड मात्र होइन, variable हेर्नुहोस्।'
  };

  function ui(key, fallback){
    return (typeof global.UIStrings !== 'undefined' && global.UIStrings.get)
      ? global.UIStrings.get(key) : fallback;
  }

  function esc(s){
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function bi(en, ne){
    return '<span class="t-en">' + esc(en) + '</span>' +
           '<span class="t-ne np-cell" lang="ne">' + esc(ne) + '</span>';
  }

  var seq = 0;

  function CRun(root, prog){
    this.root = root;
    this.p = prog;
    this.i = 0;                       /* 0 = nothing has run yet */
    this.id = 'crun' + (++seq);
    this.draw();
    this.apply();
  }

  /* The state of every variable after `n` steps, rebuilt from the start.
     Rebuilding rather than undoing is what makes Prev correct: there is
     no inverse of "set x to 9" that knows what x was. */
  CRun.prototype.stateAt = function (n){
    var st = {}, i, k;
    for (i = 0; i < this.p.vars.length; i++) st[this.p.vars[i]] = '—';
    var changed = {};
    for (i = 0; i < n; i++){
      var s = this.p.steps[i];
      if (!s.set) continue;
      for (k in s.set){
        if (Object.prototype.hasOwnProperty.call(s.set, k)) st[k] = s.set[k];
      }
      if (i === n - 1) changed = s.set;
    }
    return { vals: st, changed: changed };
  };

  CRun.prototype.stackAt = function (n){
    var out = [];
    for (var i = 0; i < n; i++){
      var s = this.p.steps[i];
      if (s.push) out.push(s.push);
      if (s.pop) out.pop();
    }
    return out;
  };

  CRun.prototype.draw = function (){
    var p = this.p, h = '';

    h += '<p class="crun-title">' + bi(p.title.en, p.title.ne) + '</p>';
    h += '<div class="crun-grid">';
    /* `code` and `console` below are the product's existing well styles.
       Reusing them rather than restyling is deliberate: a program in the
       stepper must look like every other program on the site, or a
       student has to learn two visual languages for one subject. */
    h += '<div class="crun-code code" id="' + this.id + '-code"></div>';

    h += '<div class="crun-side">';
    if (p.vars.length){
      h += '<table class="crun-vars"><caption>' +
           bi('Variables, right now', 'अहिलेको variable') + '</caption><tbody>';
      for (var v = 0; v < p.vars.length; v++){
        h += '<tr data-crun-var="' + esc(p.vars[v]) + '"><th scope="row">' +
             esc(p.vars[v]) + '</th><td>&mdash;</td></tr>';
      }
      h += '</tbody></table>';
    }
    if (p.stack){
      h += '<div class="crun-stack"><span class="crun-cap">' +
           bi('Call stack', 'Call stack') + '</span><ol data-crun-stack></ol></div>';
    }
    h += '<div class="crun-con-wrap"><span class="crun-cap">' +
         bi('Console — what has been printed so far',
            'Console — अहिलेसम्म के छापियो') + '</span>' +
         '<div class="crun-con console" id="' + this.id + '-con" role="log" aria-live="polite"></div></div>';
    h += '</div></div>';

    h += '<div class="sim-controls">' +
         '<span class="sim-controls-label">' +
         '<span class="t-en">Predict the next line before you press</span>' +
         '<span class="np-cell" lang="ne">थिच्नुअघि अर्को लाइनको अनुमान गर्नुहोस्</span></span>' +
         '<button type="button" data-crun-act="prev" data-ui="prev">&#9666; Prev</button>' +
         '<button type="button" class="primary" data-crun-act="next" data-ui="next">Next &#9656;</button>' +
         '<button type="button" class="coral" data-crun-act="reset" data-ui="reset">Reset</button>' +
         '<span class="crun-progress" aria-live="polite"></span></div>';

    h += '<div class="crun-say" role="status">' +
         '<span class="crun-say-en t-en"></span>' +
         '<span class="crun-say-ne np-cell" lang="ne"></span></div>';

    this.root.innerHTML = h;

    var self = this;
    var btns = this.root.querySelectorAll('[data-crun-act]');
    for (var b = 0; b < btns.length; b++){
      btns[b].addEventListener('click', function (){
        var act = this.getAttribute('data-crun-act');
        if (act === 'next') self.i = Math.min(self.i + 1, self.p.steps.length);
        else if (act === 'prev') self.i = Math.max(self.i - 1, 0);
        else self.i = 0;
        self.apply();
      });
    }

    if (typeof global.UIStrings !== 'undefined' && global.UIStrings.apply){
      global.UIStrings.apply(this.root);
    }
    if (typeof global.LanguageService !== 'undefined' && global.LanguageService.onChange){
      global.LanguageService.onChange(function (){ self.apply(); });
    }
  };

  CRun.prototype.apply = function (){
    var p = this.p, root = this.root, i = this.i;
    var s = i > 0 ? p.steps[i - 1] : null;

    /* ---- code, with the executing line marked ----
       renderCode and the syntax highlighter come from code.js, which
       the build puts on every unit page before this module's own list.
       There is no hand-rolled fallback: a second renderer would be a
       copy of the highlighter that drifts, and it would render C in a
       different typeface from every other listing on the site. */
    var codeEl = doc.getElementById(this.id + '-code');
    if (codeEl && typeof global.renderCode === 'function'){
      global.renderCode(codeEl, p.code, s ? s.line : 0);
    }

    /* ---- variables ---- */
    var st = this.stateAt(i);
    var rows = root.querySelectorAll('[data-crun-var]');
    for (var r = 0; r < rows.length; r++){
      var name = rows[r].getAttribute('data-crun-var');
      var cell = rows[r].querySelector('td');
      if (cell) cell.textContent = st.vals[name];
      rows[r].classList.toggle('is-changed',
        !!(st.changed && Object.prototype.hasOwnProperty.call(st.changed, name)));
    }

    /* ---- call stack ---- */
    var stackEl = root.querySelector('[data-crun-stack]');
    if (stackEl){
      var frames = this.stackAt(i);
      var sh = '';
      for (var f = 0; f < frames.length; f++){
        sh += '<li' + (f === frames.length - 1 ? ' class="is-top"' : '') + '>' +
              esc(frames[f]) + '</li>';
      }
      stackEl.innerHTML = sh || '<li class="is-empty">&mdash;</li>';
    }

    /* ---- console, rebuilt from the beginning ----
       Rebuilt and not appended, so that Prev shows the console as it
       really was at that point. A console that only grows would let a
       student step backwards and still see output that has not been
       printed yet, which is the one thing this component must not do. */
    /* EVERY console line goes through conLine and none is built here.
       conLine is where a line carrying Nepali is given lang="ne", so a
       component that assembled its own div would hand Devanagari to an
       English speech synthesiser — the defect Phase 5 fixed at six call
       sites and a seventh would have reintroduced. The empty-state is
       two calls rather than one element with both languages inside it,
       for the same reason. */
    var conEl = doc.getElementById(this.id + '-con');
    if (conEl && typeof global.conLine === 'function'){
      global.conClear(conEl);
      var any = false;
      for (var k = 0; k < i; k++){
        if (p.steps[k].out != null){ global.conLine(conEl, p.steps[k].out, ''); any = true; }
      }
      if (!any){
        global.conLine(conEl, '(nothing has been printed yet)', 'muted t-en');
        global.conLine(conEl, '(अहिलेसम्म केही छापिएको छैन)', 'muted np');
      }
    }

    /* ---- caption ----
       The two strings this component supplies itself are declared as
       {en, ne} pairs rather than written inline at the point of use.
       An inline Nepali literal with its English half on a different
       line is not a pair any scanner can see, and tools/nepali-review.js
       would report it as Devanagari that reaches no reviewer — which is
       exactly what it did, until these became objects. */
    var en = root.querySelector('.crun-say-en');
    var ne = root.querySelector('.crun-say-ne');
    if (en) en.textContent = s ? (LINE.en + ' ' + s.line + ': ' + s.en) : OPENING.en;
    if (ne) ne.textContent = s ? (LINE.ne + ' ' + s.line + ': ' + s.ne) : OPENING.ne;

    /* ---- controls ---- */
    var prog = root.querySelector('.crun-progress');
    if (prog){
      var word = ui('stepOf', 'step');
      if (typeof global.UIStrings !== 'undefined' && global.UIStrings.write){
        global.UIStrings.write(prog, word + ' ' + i + ' / ' + p.steps.length);
      } else {
        prog.textContent = word + ' ' + i + ' / ' + p.steps.length;
      }
    }
    var prev = root.querySelector('[data-crun-act="prev"]');
    var next = root.querySelector('[data-crun-act="next"]');
    if (prev) prev.disabled = (i === 0);
    if (next) next.disabled = (i >= p.steps.length);
  };

  function build(root){
    if (root.getAttribute('data-crun-mounted')) return false;
    var key = root.getAttribute('data-program');
    var prog = PROGRAMS[key];
    if (!prog){
      /* Visible, not silent. An empty box is how a broken mount has hurt
         this product before. */
      root.innerHTML = '<p class="crun-missing">' +
        bi('This program stepper names "' + (key || '') + '", which is not a program in ' +
           'runtime/sim-crun.js.',
           'यो stepper ले "' + (key || '') + '" नाम लिएको छ, जुन runtime/sim-crun.js मा छैन।') +
        '</p>';
      return false;
    }
    new CRun(root, prog);
    root.setAttribute('data-crun-mounted', '1');
    return true;
  }

  function mount(){
    if (!doc || !doc.querySelectorAll) return 0;
    var all = doc.querySelectorAll('.crun');
    var n = 0;
    for (var i = 0; i < all.length; i++) if (build(all[i])) n++;
    return n;
  }

  if (doc && doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', mount);
  else if (doc) mount();

  global.CRun = { mount: mount, build: build, register: register, PROGRAMS: PROGRAMS };
  if (typeof module !== 'undefined' && module.exports) module.exports = global.CRun;

})(typeof window !== 'undefined' ? window : this);
