/* =========================================================
   PRACTICAL LOG

   THE PROBLEM THIS SOLVES
   Grade 9 Fundamentals of Computer and Application is 128 working
   hours: 64 theory and 64 practical. Half the marks are internal, and
   30 of those 50 internal marks are practical and project work
   assessed by a teacher in a room, on a chart the student drew and a
   presentation the student gave. Three of them are for KEEPING A
   RECORD of that work — marks a student loses by doing the work and
   writing nothing down.

   Before this component the product had no idea any of that existed.
   A student reading "8 hrs · 6 marks" on Unit 1 was reading a true
   statement about an exam and a false one about their grade.

   WHAT THIS IS, AND WHAT IT IS CAREFUL NOT TO BE
   It is the student's own tick list, stored on their own device. It is
   NOT an assessment, not a submission, not a mark, and not evidence
   anyone else will ever see. The product cannot watch a speech
   competition or inspect a chart, and nothing here pretends it can.
   Every label names what the STUDENT did — "I have done this" — rather
   than what the product knows, because a label that implied otherwise
   would be a lie told to a child about their own marks.

   WHY THREE STATES AND NOT A CHECKBOX
   `done` and `recorded` are separate in the curriculum's own mark
   distribution — conduction of practical work is 15 marks, record
   keeping of practical work is another 3. A tick list that merged them
   would teach the student that finishing the chart is the end of the
   job. It is not: the write-up is worth marks of its own, and it is
   the half most often skipped.

   WHY `todo` DELETES THE ROW
   Un-ticking should leave no trace. A stored "this student did not do
   activity 1.3" is a record about work nobody did, and it would show
   up in any export of a student's own data as if it were a finding.

   PROGRESSIVE ENHANCEMENT
   The build ships every activity, its requirements and its expected
   outcome as readable text. This file adds the ticks. With JavaScript
   off the student loses the log and keeps the instructions, which is
   the right way round — the instructions are the part that matters.

   WHEN STORAGE IS NOT AVAILABLE
   ProgressService degrades to memory in private windows and with site
   data blocked. The log then works for the session and vanishes. It
   says so, once, in the student's language, rather than silently
   losing a term's worth of ticks.
   ========================================================= */
(function (global) {
  'use strict';

  var doc = global.document;
  if (!doc) return;

  var STATES = ['todo', 'done', 'recorded'];
  var LABEL  = { todo: 'pracTodo', done: 'pracDone', recorded: 'pracRecorded' };
  var FALLBACK = {
    pracTodo: 'Not done yet',
    pracDone: 'I have done this',
    pracRecorded: 'Done and written up',
    pracLogTitle: 'My record of this unit’s practical work',
    pracLogNote: 'Kept on this device only. It is not a mark and nobody else sees it.',
    pracNoSave: 'This device is not saving — your ticks will be lost when you close the page.',
    pracCount: 'done',
    pracWritten: 'written up',
    pracActivity: 'Activity'
  };

  function ui(key){
    var s = (typeof global.UIStrings !== 'undefined' && global.UIStrings.get)
      ? global.UIStrings.get(key) : null;
    return (s && s !== key) ? s : (FALLBACK[key] || key);
  }

  function progress(){
    return (typeof global.ProgressService !== 'undefined') ? global.ProgressService : null;
  }

  /* Devanagari digits for the Nepali half. The activity numbers are
     authored as १.१ in the prose, and a hidden legend that said 1.1
     beside it would be the only place the two disagree. */
  var DEVA = ['०','१','२','३','४','५','६','७','८','९'];
  function deva(s){
    var out = '';
    for (var i = 0; i < s.length; i++){
      var c = s.charAt(i);
      out += (c >= '0' && c <= '9') ? DEVA[c.charCodeAt(0) - 48] : c;
    }
    return out;
  }

  function el(tag, cls){
    var e = doc.createElement(tag);
    if (cls) e.className = cls;
    return e;
  }

  /* ---------- one activity ---------------------------------------- */

  function buildOne(act, onChange){
    var id = act.getAttribute('data-practical');
    if (!id) return null;

    var numEl = act.querySelector('.pr-num');
    var num = numEl ? (numEl.textContent || '').replace(/\s+/g, '') : '';

    var box = el('fieldset', 'pr-log');
    box.setAttribute('data-for', id);

    /* The group needs a name for assistive technology, and the visible
       activity number is the only thing that distinguishes one group of
       three identical radios from the next. Both halves are present;
       the language layer shows one, and the accessible name comes from
       whichever is visible. */
    var leg = el('legend', 'pr-log-leg');
    var lEn = el('span', 't-en');
    lEn.textContent = ui('pracActivity') + ' ' + num;
    var lNe = el('span', 't-ne np-cell');
    lNe.setAttribute('lang', 'ne');
    lNe.textContent = 'क्रियाकलाप ' + deva(num);
    leg.appendChild(lEn);
    leg.appendChild(lNe);
    box.appendChild(leg);

    var current = progress() ? progress().getPractical(id).state : 'todo';
    var inputs = [];

    for (var i = 0; i < STATES.length; i++){
      (function (st){
        var lab = el('label', 'pr-opt pr-opt-' + st);
        var inp = doc.createElement('input');
        inp.type = 'radio';
        inp.name = 'prac-' + id;
        inp.value = st;
        inp.id = 'prac-' + id + '-' + st;
        if (st === current) inp.checked = true;
        var txt = el('span', 'pr-opt-t');
        txt.setAttribute('data-ui', LABEL[st]);
        txt.textContent = ui(LABEL[st]);
        lab.appendChild(inp);
        lab.appendChild(txt);
        inp.addEventListener('change', function (){
          if (!inp.checked) return;
          var p = progress();
          if (p) { try { p.recordPractical(id, st); } catch (e) { /* never break the page */ } }
          act.setAttribute('data-pr-state', st);
          onChange();
        });
        inputs.push(inp);
        box.appendChild(lab);
      }(STATES[i]));
    }

    act.setAttribute('data-pr-state', current);
    act.appendChild(box);
    return { id: id, inputs: inputs };
  }

  /* ---------- the block summary ------------------------------------ */

  function buildSummary(block, ids){
    var sum = el('div', 'pr-sum');

    var h = el('div', 'pr-sum-h');
    h.setAttribute('data-ui', 'pracLogTitle');
    h.textContent = ui('pracLogTitle');
    sum.appendChild(h);

    /* A live region: the tally changes because the student ticked
       something, and a student using a screen reader should hear the
       new count without hunting for it. */
    var tally = el('p', 'pr-sum-n');
    tally.setAttribute('aria-live', 'polite');
    sum.appendChild(tally);

    var note = el('p', 'pr-sum-note');
    note.setAttribute('data-ui', 'pracLogNote');
    note.textContent = ui('pracLogNote');
    sum.appendChild(note);

    var p = progress();
    if (p && p.isPersistent && !p.isPersistent()){
      var warn = el('p', 'pr-sum-warn');
      warn.setAttribute('data-ui', 'pracNoSave');
      warn.textContent = ui('pracNoSave');
      sum.appendChild(warn);
    }

    function refresh(){
      var s = p && p.getPracticalSummary
        ? p.getPracticalSummary(ids)
        : { total: ids.length, done: 0, recorded: 0, todo: ids.length };
      tally.textContent = s.done + ' / ' + s.total + ' ' + ui('pracCount') +
                          '  ·  ' + s.recorded + ' ' + ui('pracWritten');
    }
    refresh();

    block.insertBefore(sum, block.firstChild);
    return refresh;
  }

  /* ---------- mount ------------------------------------------------- */

  function build(block){
    if (block.classList.contains('pr-logged')) return 0;
    var acts = block.querySelectorAll('.pr-act[data-practical]');
    if (!acts.length) return 0;
    block.classList.add('pr-logged');

    var ids = [], built = [];
    var refresh = function (){};
    for (var i = 0; i < acts.length; i++){
      var one = buildOne(acts[i], function (){ refresh(); });
      if (one){ ids.push(one.id); built.push(one); }
    }
    if (!ids.length){ block.classList.remove('pr-logged'); return 0; }

    refresh = buildSummary(block, ids);

    if (typeof global.UIStrings !== 'undefined' && global.UIStrings.apply){
      global.UIStrings.apply(block);
    }
    /* The tally is assembled from two labels and a pair of numbers, so
       it is not a [data-ui] element and apply() cannot repaint it. */
    if (typeof global.LanguageService !== 'undefined' && global.LanguageService.onChange){
      global.LanguageService.onChange(function (){ refresh(); });
    }
    return built.length;
  }

  function mount(){
    var blocks = doc.querySelectorAll('.practical');
    var n = 0;
    for (var i = 0; i < blocks.length; i++) n += build(blocks[i]);
    return n;
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', mount);
  else mount();

  global.PracticalLog = { mount: mount, build: build, STATES: STATES };

})(typeof window !== 'undefined' ? window : this);
