/* RGSC Study Board — top bar behaviour */
(function(){
  var btn = document.getElementById('hamBtn');
  var panel = document.getElementById('mobilePanel');
  if (!btn || !panel) return;
  function close(){
    panel.classList.remove('open');
    btn.classList.remove('is-open');
    btn.setAttribute('aria-expanded','false');
    document.body.style.overflow='';
  }
  btn.addEventListener('click', function(){
    var open = !panel.classList.contains('open');
    panel.classList.toggle('open', open);
    btn.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  });
  panel.addEventListener('click', function(e){ if (e.target.closest('a')) close(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') close(); });
  window.addEventListener('resize', function(){ if (window.innerWidth > 940) close(); });
})();

/* =========================================================
   LANGUAGE SWITCHER — top bar

   A segmented control over three mutually exclusive modes, so it is a
   radiogroup: arrow keys move between options and only the selected
   option is in the tab order. Three separate tab stops for one choice
   is the usual mistake here, and it makes the header tedious to pass
   through with a keyboard.

   The control changes an attribute on <html> and nothing else. No
   reload, no re-render, no navigation — which is what lets a student
   switch language in the middle of a simulation without losing it.
   ========================================================= */
(function(){
  var bar = document.querySelector('.langbar');
  if (!bar || typeof LanguageService === 'undefined') return;

  var opts = [].slice.call(bar.querySelectorAll('.lang-opt'));
  if (!opts.length) return;

  function sync(mode){
    for (var i = 0; i < opts.length; i++){
      var on = opts[i].getAttribute('data-lang-set') === mode;
      opts[i].setAttribute('aria-checked', on ? 'true' : 'false');
      opts[i].setAttribute('tabindex', on ? '0' : '-1');
    }
  }

  function choose(el, focus){
    if (!el) return;
    LanguageService.set(el.getAttribute('data-lang-set'));
    if (focus) el.focus();
  }

  bar.addEventListener('click', function(e){
    var t = e.target.closest ? e.target.closest('.lang-opt') : null;
    if (t) choose(t, false);
  });

  bar.addEventListener('keydown', function(e){
    var i = opts.indexOf(document.activeElement);
    if (i < 0) return;
    var next = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = opts[(i + 1) % opts.length];
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = opts[(i - 1 + opts.length) % opts.length];
    else if (e.key === 'Home') next = opts[0];
    else if (e.key === 'End') next = opts[opts.length - 1];
    else if (e.key === ' ' || e.key === 'Enter'){ choose(opts[i], true); e.preventDefault(); return; }
    if (next){ e.preventDefault(); choose(next, true); }
  });

  LanguageService.onChange(sync);
  sync(LanguageService.apply());
})();
