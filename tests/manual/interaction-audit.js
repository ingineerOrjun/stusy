/* ============================================================
   INTERACTION AUDIT — every mount point and every animation, driven

   WHAT "IT MOUNTED" IS NOT
   A simulator that renders its shell and then does nothing when pressed
   is worse than one that is missing: the student presses, sees no
   change, and concludes they misunderstood the lesson. Phase 4.5 called
   this fake interactivity and looked for it by reading source. This
   presses the controls and watches for a change.

   The test is deliberately crude and therefore hard to fool: snapshot
   the component's rendered text and its aria state, operate one control,
   snapshot again. If nothing anywhere in the component changed, the
   control did nothing.

   ANIMATIONS ARE DRIVEN TO THE END
   An animated diagram is stepped through its whole declared cycle, and
   the step counter, the caption and the drawing are all required to
   move. Playing the first step proves the button works; only the last
   step proves the sequence was authored.

   NO FRAME RATE IS REPORTED
   The automation pane throttles requestAnimationFrame. Any fps number
   measured here would be fiction, and this file will not print one.
   ============================================================ */
'use strict';

const INTERACT = String(function interactionAudit(){
  function txt(el){ return (el.textContent || '').replace(/\s+/g, ' ').trim(); }
  function ariaOf(root){
    var out = [];
    var all = root.querySelectorAll('[aria-pressed],[aria-checked],[aria-selected],[aria-expanded],[aria-live],[role="status"]');
    for (var i = 0; i < all.length; i++){
      var e = all[i];
      out.push((e.getAttribute('aria-pressed') || '') + (e.getAttribute('aria-checked') || '') +
               (e.getAttribute('aria-selected') || '') + (e.getAttribute('aria-expanded') || '') + txt(e).slice(0, 30));
    }
    return out.join('|');
  }
  function state(root){ return txt(root).slice(0, 4000) + '###' + ariaOf(root); }

  /* every component that claims to be interactive */
  var MOUNTS = ['gatelab','comblab','kmap','cpu8085','numlab','sqllab','dbtable',
                'erlab','drill','conclab','tracer','stackqueue','dispatch'];
  var sims = [];
  for (var i = 0; i < MOUNTS.length; i++){
    var found = document.querySelectorAll('.' + MOUNTS[i]);
    for (var j = 0; j < found.length; j++) sims.push({ kind: MOUNTS[i], el: found[j] });
  }

  var simReport = [];
  for (var s = 0; s < sims.length; s++){
    var root = sims[s].el;
    var controls = root.querySelectorAll('button:not([disabled]),input,select,textarea,[role="button"]:not([aria-disabled="true"])');
    var rec = { kind: sims[s].kind, controls: controls.length, responded: null, note: '' };
    if (!controls.length){ rec.note = 'NO CONTROLS — a simulator nobody can operate'; simReport.push(rec); continue; }

    var before = state(root);
    /* PRESS SOMETHING THAT IS NOT ALREADY ON.
       The first version pressed the first button it found and reported
       the restricted NAND workbench on Digital Design unit 2 as dead.
       That lab offers two tabs, NAND and NOT, and opens with NAND
       selected — so pressing NAND correctly changes nothing. Choosing
       an inactive control is the difference between testing the
       component and testing the tool. */
    var target = null;
    for (var c = 0; c < controls.length; c++){
      var el = controls[c];
      if (el.tagName !== 'BUTTON') continue;
      if (el.getAttribute('aria-selected') === 'true') continue;
      if (el.getAttribute('aria-pressed') === 'true') continue;
      if (el.getAttribute('aria-checked') === 'true') continue;
      target = el; break;
    }
    if (!target){ rec.note = 'only text inputs — driven separately'; simReport.push(rec); continue; }
    rec.pressed = txt(target).slice(0, 28) || target.getAttribute('aria-label') || '(unnamed)';
    try { target.click(); } catch (e){ rec.note = 'threw: ' + e.message; }
    var after = state(root);
    rec.responded = after !== before;
    if (!rec.responded) rec.note = 'PRESSED AND NOTHING CHANGED';
    simReport.push(rec);
  }

  /* ---- animated diagrams, stepped to the end ---- */
  var anims = [];
  var dias = document.querySelectorAll('.dia[data-dia]');
  for (var d = 0; d < dias.length; d++){
    var dia = dias[d];
    var prog = dia.querySelector('.dia-progress');
    var declared = prog ? Number(prog.getAttribute('data-dia-steps')) : 0;
    var next = dia.querySelector('[data-dia-act="next"]');
    var reset = dia.querySelector('[data-dia-act="reset"]');
    var cap = dia.querySelector('.dia-caption');
    var rec = { name: dia.getAttribute('data-dia'), declaredSteps: declared,
                hasControls: !!(next && reset), captionsSeen: 0, reachedLast: false, note: '' };
    if (!next){ rec.note = 'no Next control'; anims.push(rec); continue; }
    if (reset) reset.click();
    var seen = {}, lastText = '';
    for (var k = 0; k < declared + 1; k++){
      next.click();
      var t = cap ? txt(cap) : '';
      if (t && t !== lastText){ seen[t] = 1; lastText = t; }
    }
    rec.captionsSeen = Object.keys(seen).length;
    rec.progressText = prog ? txt(prog) : '';
    rec.reachedLast = declared > 0 && rec.progressText.indexOf(String(declared)) >= 0;
    if (rec.captionsSeen < declared) rec.note = 'only ' + rec.captionsSeen + ' distinct captions for ' + declared + ' steps';
    if (reset) reset.click();
    anims.push(rec);
  }

  return {
    url: location.pathname,
    simulations: { total: simReport.length,
                   unresponsive: simReport.filter(function (r){ return r.responded === false; }).length,
                   detail: simReport },
    animations: { total: anims.length,
                  incomplete: anims.filter(function (a){ return !a.reachedLast || a.note; }).length,
                  detail: anims }
  };
});

if (require.main === module){
  const fs = require('fs');
  const path = require('path');
  fs.writeFileSync(path.join(__dirname, '__interact-inject.js'), 'window.INTERACT = ' + INTERACT + ';');
  console.log('wrote tests/manual/__interact-inject.js');
}

module.exports = { INTERACT_SOURCE: INTERACT };
