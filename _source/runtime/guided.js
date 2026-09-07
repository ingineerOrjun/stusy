/* =========================================================
   GUIDED PRACTICE — the same procedure, with the scaffolding coming away

   WHY THIS IS NOT THE WORKED-EXAMPLE COMPONENT
   The units' worked examples are a progression of different sub-skills:
   decimal to binary, then binary to decimal, then fractions, then
   subtraction. Fading across those would remove the only demonstration a
   student gets of each new skill. Fading needs the same procedure
   several times over, which is a different thing and lives in its own
   content bank.

   THE FOUR LEVELS, AND WHAT CHANGES BETWEEN THEM

     worked        every step's answer is shown. The student reads an
                   expert doing it. Nothing is asked.
     partial       the steps are asked, one at a time, but each carries
                   its full prompt.
     guided        the steps are asked with thinner prompts — "second
                   remainder" rather than "6 ÷ 2, write the remainder".
     independent   the question and an answer box. No steps at all.

   Only the LAST level asks for the final answer cold. The three before
   it exist so that by the time the student reaches it, they have done
   the procedure three times with decreasing help — which is what makes
   the fourth attempt a test of the skill rather than of memory.

   WHY EACH STEP IS MARKED, NOT JUST THE ANSWER
   A student who converts 45 and writes 101101 backwards has made one
   mistake, at the end. A student who gets the third remainder wrong has
   made a different mistake, and telling them only that the final answer
   is wrong hides which. Marking per step puts the feedback at the
   decision that caused the error, while the student still remembers
   making it.

   WHY THE COMPARISON IS DELIBERATELY STRICT
   Answers here are single digits and short tokens, so normalising case
   and whitespace is enough. Nothing here tries to mark prose — the
   retrieval gate in retrieval.js handles written answers, and a checker
   that pretended to grade a sentence would teach students to write for
   the checker.
   ========================================================= */
(function (global) {
  'use strict';

  var doc = global.document;
  var BANK = {};

  function ui(key, fallback){
    return (typeof global.UIStrings !== 'undefined' && global.UIStrings.get)
      ? global.UIStrings.get(key) : fallback;
  }

  /* A verdict is built into an HTML string rather than written to an
     element, so UIStrings.write() cannot reach it. In Nepali mode "ठिक।"
     would inherit the document's lang="en" and be read by an English
     voice — the same defect Phase 5 fixed 82 times in the content. */
  function uiTag(key, fallback){
    var text = ui(key, fallback);
    var ne = (typeof global.LanguageService !== 'undefined' &&
              global.LanguageService.get() === 'ne');
    return ne ? '<span lang="ne">' + esc(text) + '</span>' : esc(text);
  }

  function esc(s){
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* Both halves of a bilingual pair, for the modes to choose between.
     Identical halves are a value rather than a translation — a remainder
     of "1" is "1" in every language — so they collapse to one. */
  function pair(p){
    if (!p) return '';
    var en = String(p.en || ''), ne = String(p.ne || '');
    if (!ne || ne.trim() === en.trim()) return esc(en);
    return '<span class="t-en">' + esc(en) + '</span>' +
           '<span class="np-cell" lang="ne">' + esc(ne) + '</span>';
  }

  function normalise(s){
    return String(s == null ? '' : s).trim().toLowerCase().replace(/\s+/g, '');
  }

  function accepts(step, given){
    var want = [step.answer].concat(step.accept || []);
    var g = normalise(given);
    for (var i = 0; i < want.length; i++) if (normalise(want[i]) === g) return true;
    return false;
  }

  /* THE FIFTH LEVEL IS NOT MORE OF THE FOURTH.
     `independent` asks the student to do the same procedure with no help.
     `transfer` asks whether they can use the IDEA when something about
     the situation has moved — the representation, the context, the
     direction of the question. A student who can convert five decimal
     numbers and cannot recognise the same rule stated as a circuit has
     learned a procedure, not a concept, and only the fifth level can
     tell those two apart.

     Added in Phase 8. It is one more entry here and one more label; the
     ordering rule the tests enforce simply grew by one, which is what a
     level model being right looks like. */
  var LEVEL_LABEL = {
    worked:      { key: 'levelWorked',      en: 'Worked for you' },
    partial:     { key: 'levelPartial',     en: 'Some steps hidden' },
    guided:      { key: 'levelGuided',      en: 'Your turn, with prompts' },
    independent: { key: 'levelIndependent', en: 'On your own' },
    transfer:    { key: 'levelTransfer',    en: 'Somewhere new' }
  };

  function Practice(root, skill){
    this.root = root;
    this.skill = skill;
    this.at = 0;                  /* which problem */
    /* WIRED ONCE, NOT PER RENDER.
       render() replaces innerHTML, so the elements change but the host
       does not. Attaching the delegated listeners inside render() added
       a second set on every move: by problem 2 one press of Next fired
       twice and skipped a problem, and by problem 3 it skipped two. The
       component looked like it was losing steps at random. Delegation is
       what makes wiring once possible — the handlers match on the target,
       not on a captured element. */
    this.wire();
    this.render();
  }

  Practice.prototype.problem = function (){ return this.skill.problems[this.at]; };

  Practice.prototype.render = function (){
    var p = this.problem();
    var lvl = LEVEL_LABEL[p.fade] || LEVEL_LABEL.guided;
    var n = this.skill.problems.length;
    var h = '';

    h += '<div class="gp-head">';
    h += '<p class="gp-skill">' + pair(this.skill.skill) + '</p>';
    /* The level is named in words, not only by a position in a bar: a
       student should know they are being given less help, and why. */
    h += '<p class="gp-level"><span class="gp-step-n">' + (this.at + 1) + ' / ' + n + '</span> ' +
         '<span data-ui="' + lvl.key + '">' + esc(lvl.en) + '</span></p>';
    h += '</div>';

    if (this.skill.rule){
      h += '<p class="gp-rule">' + pair(this.skill.rule) + '</p>';
    }

    h += '<p class="gp-ask">' + pair(p.ask) + '</p>';

    if (p.steps && p.steps.length){
      h += '<ol class="gp-steps">';
      for (var i = 0; i < p.steps.length; i++){
        var s = p.steps[i];
        h += '<li class="gp-step" data-step="' + i + '">';
        h += '<span class="gp-prompt">' + pair(s.prompt) + '</span>';
        if (p.fade === 'worked'){
          h += '<span class="gp-shown">' + esc(s.answer) + '</span>';
          h += '<span class="gp-why">' + pair(s.why) + '</span>';
        } else {
          h += '<span class="gp-field">' +
               '<input class="gp-in" type="text" inputmode="text" autocomplete="off" ' +
               'spellcheck="false" size="6" aria-label="' + esc(textOf(s.prompt)) + '">' +
               '<button type="button" class="gp-check" data-ui="checkStep">Check</button>' +
               '</span>';
          h += '<span class="gp-mark" role="status"></span>';
        }
        h += '</li>';
      }
      h += '</ol>';
    }

    /* the final answer is always asked, at every level */
    h += '<div class="gp-final">';
    h += '<label class="gp-final-lab" for="' + this.fieldId() + '">' +
         pair(p.resultPrompt) + '</label>';
    h += '<span class="gp-field">' +
         '<input class="gp-in gp-result" id="' + this.fieldId() + '" type="text" ' +
         'autocomplete="off" spellcheck="false" size="12">' +
         '<button type="button" class="gp-check gp-check-final" data-ui="checkAnswer">Check the answer</button>' +
         '</span>';
    h += '<span class="gp-mark gp-mark-final" role="status"></span>';
    h += '<p class="gp-check-note"></p>';
    h += '</div>';

    h += '<div class="gp-nav">';
    if (this.at > 0){
      h += '<button type="button" class="gp-prev" data-ui="prevProblem">◂ Previous</button>';
    }
    if (this.at < n - 1){
      h += '<button type="button" class="gp-next primary" data-ui="nextProblem">Next problem ▸</button>';
    } else {
      h += '<span class="gp-done" role="status"></span>';
    }
    h += '</div>';

    this.root.innerHTML = h;
    if (typeof global.UIStrings !== 'undefined' && global.UIStrings.apply){
      global.UIStrings.apply(this.root);
    }
  };

  Practice.prototype.fieldId = function (){
    return 'gp-' + this.skill.id.replace(/[^a-z0-9]/gi, '') + '-' + this.at;
  };

  function textOf(p){ return p ? String(p.en || '') : ''; }

  Practice.prototype.wire = function (){
    var self = this;
    /* The current problem is read inside each handler, never captured
       here: these listeners outlive every render, so a problem captured
       at wire time would be the first one for ever. */

    this.root.addEventListener('click', function (e){
      var t = e.target;
      if (!t || !t.closest) return;

      var stepBtn = t.closest('.gp-check:not(.gp-check-final)');
      if (stepBtn){
        var li = stepBtn.closest('.gp-step');
        var i = Number(li.getAttribute('data-step'));
        self.markStep(li, self.problem().steps[i]);
        return;
      }
      if (t.closest('.gp-check-final')){ self.markFinal(); return; }
      if (t.closest('.gp-next')){ self.at++; self.render(); self.focusFirst(); return; }
      if (t.closest('.gp-prev')){ self.at--; self.render(); self.focusFirst(); return; }
    });

    /* Enter in a field checks that field — a student working through
       five remainders should not have to reach for the mouse five times. */
    this.root.addEventListener('keydown', function (e){
      if (e.key !== 'Enter') return;
      var inp = e.target.closest ? e.target.closest('.gp-in') : null;
      if (!inp) return;
      e.preventDefault();
      if (inp.classList.contains('gp-result')) self.markFinal();
      else {
        var li = inp.closest('.gp-step');
        self.markStep(li, self.problem().steps[Number(li.getAttribute('data-step'))]);
      }
    });
  };

  Practice.prototype.focusFirst = function (){
    var f = this.root.querySelector('.gp-in');
    if (f) try { f.focus({ preventScroll: true }); } catch (e){ f.focus(); }
  };

  Practice.prototype.markStep = function (li, step){
    var inp = li.querySelector('.gp-in');
    var mark = li.querySelector('.gp-mark');
    var ok = accepts(step, inp.value);
    li.classList.toggle('is-right', ok);
    li.classList.toggle('is-wrong', !ok);
    inp.setAttribute('aria-invalid', ok ? 'false' : 'true');
    /* The word comes first, then the reason. Colour is never the only
       carrier — Phase 5 §7. */
    mark.innerHTML =
      '<b class="gp-verdict">' + (ok ? uiTag('right', 'Right.') : uiTag('notRight', 'Not that.')) + '</b> ' +
      pair(step.why);
  };

  Practice.prototype.markFinal = function (){
    var p = this.problem();
    var inp = this.root.querySelector('.gp-result');
    var mark = this.root.querySelector('.gp-mark-final');
    var note = this.root.querySelector('.gp-check-note');
    var ok = normalise(inp.value) === normalise(p.result);
    inp.setAttribute('aria-invalid', ok ? 'false' : 'true');
    this.root.querySelector('.gp-final').classList.toggle('is-right', ok);
    this.root.querySelector('.gp-final').classList.toggle('is-wrong', !ok);
    mark.innerHTML = '<b class="gp-verdict">' +
      (ok ? uiTag('right', 'Right.') : uiTag('notRight', 'Not that.')) + '</b> ' +
      (ok ? '' : '<span class="t-en">The answer is ' + esc(p.result) + '.</span>' +
                 '<span class="np-cell" lang="ne">उत्तर ' + esc(p.result) + ' हो।</span>');
    note.innerHTML = pair(p.check);

    if (ok && this.at === this.skill.problems.length - 1){
      var done = this.root.querySelector('.gp-done');
      if (done){
        /* Name the competence, do not throw confetti — and name the
           RIGHT one. "You did it with no steps shown" is true of an
           independent problem and undersells a transfer problem, where
           the student did something harder: used the rule after the
           situation moved. Telling them the wrong thing they achieved is
           a small lie that costs the message its weight. */
        done.innerHTML = (p.fade === 'transfer')
          ? '<span class="t-en">You used the rule in a situation it had not been shown in. ' +
            'That is the difference between knowing a procedure and understanding it.</span>' +
            '<span class="np-cell" lang="ne">नदेखाइएको अवस्थामा नियम लगाउनुभयो। ' +
            'विधि जान्नु र बुझ्नुबीचको फरक यही हो।</span>'
          : '<span class="t-en">You did the last one with no steps shown. That is the ' +
            'version of this the exam asks for.</span>' +
            '<span class="np-cell" lang="ne">अन्तिमचाहिँ कुनै चरण नदेखाई गर्नुभयो। ' +
            'परीक्षामा यही रूप सोधिन्छ।</span>';
      }
    }
  };

  function mount(){
    if (!doc) return;
    var hosts = doc.querySelectorAll('.guided[data-skill]');
    for (var i = 0; i < hosts.length; i++){
      var host = hosts[i];
      if (host.getAttribute('data-mounted')) continue;
      var skill = BANK[host.getAttribute('data-skill')];
      if (!skill){
        /* A missing skill is an authoring error, and a silent empty box
           would ship. Say so where a developer will see it. */
        if (global.console) console.warn('guided: no practice skill registered as ' +
                                         host.getAttribute('data-skill'));
        continue;
      }
      host.setAttribute('data-mounted', '1');
      new Practice(host, skill);
    }
  }

  var GuidedPractice = {
    register: function (skill){ BANK[skill.id] = skill; },
    get: function (id){ return BANK[id]; },
    ids: function (){ return Object.keys(BANK); },
    mount: mount,
    /* exported for the test suite */
    _accepts: accepts,
    _normalise: normalise
  };

  global.GuidedPractice = GuidedPractice;
  if (typeof module !== 'undefined' && module.exports) module.exports = GuidedPractice;

  if (doc){
    if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', mount);
    else mount();
  }

})(typeof window !== 'undefined' ? window : this);
