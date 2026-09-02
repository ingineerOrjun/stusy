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
