/* =========================================================
   Showcase page behaviour — development/QA only.
   Loaded solely by animation-showcase.html. Nothing student-facing
   depends on this file.
   ========================================================= */
(function (global) {
  'use strict';

  function ready(fn){
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  var DURS = ['fast', 'base', 'slow', 'deliberate'];

  ready(function(){
    /* report what the browser is actually asking for */
    var flag = document.getElementById('fx-reduced');
    if (flag && global.MotionService){
      var on = MotionService.prefersReduced();
      flag.textContent = on ? 'reduce — motion is suppressed' : 'no-preference — motion is on';
      flag.className = 'term ' + (on ? 'is-success' : '');
    }

    /* build the duration comparison track */
    var track = document.getElementById('fx-track');
    if (track && global.MotionService){
      var d = MotionService.durations();
      for (var i = 0; i < DURS.length; i++){
        var name = DURS[i];
        var row = document.createElement('div');
        row.style.cssText = 'display:flex;align-items:center;gap:10px';
        var label = document.createElement('span');
        label.className = 'sim-controls-label';
        label.style.cssText = 'width:96px;margin:0';
        label.textContent = name;
        var rail = document.createElement('span');
        rail.style.cssText = 'flex:1;height:10px;border-radius:999px;background:var(--color-surface-sunken);' +
                             'border:1px solid var(--color-border);overflow:hidden';
        var bar = document.createElement('span');
        bar.id = 'fx-bar-' + name;
        bar.style.cssText = 'display:block;height:100%;width:0;background:var(--color-primary);' +
                            'transition:width ' + d[name] + 'ms var(--ease-standard)';
        rail.appendChild(bar);
        row.appendChild(label); row.appendChild(rail);
        track.appendChild(row);
      }
    }

    document.addEventListener('click', function(e){
      var btn = e.target && e.target.closest ? e.target.closest('[data-fx]') : null;
      if (!btn || !global.MotionService) return;
      var kind = btn.getAttribute('data-fx');

      if (kind === 'pulse'){
        MotionService.pulse(document.querySelector(btn.getAttribute('data-fx-target')));
      }
      else if (kind === 'value'){
        var el = document.querySelector(btn.getAttribute('data-fx-target'));
        if (el) MotionService.changeValue(el, String(Number(el.textContent || 0) + 10));
      }
      else if (kind === 'run'){
        var bar = document.getElementById('fx-bar-' + btn.getAttribute('data-fx-dur'));
        if (!bar) return;
        bar.style.width = '0';
        global.setTimeout(function(){ bar.style.width = '100%'; }, 30);
      }
    });
  });

})(typeof window !== 'undefined' ? window : globalThis);
