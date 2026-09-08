/* =========================================================
   HOME — the three behaviours the landing page needs.

   WHY THESE THREE AND NOTHING ELSE
   A landing page can absorb any amount of decoration, so the test
   applied here was the same one every phase has used: does it teach
   the visitor something true about the product? Three things passed.

   1. THE BRIDGE
      The product's whole claim is that it carries a student from what
      they understand in Nepali to what the exam asks in English. That
      claim was previously made in a paragraph. Here it is demonstrated
      with real terms out of the real curriculum — the visitor watches
      the crossing happen before reading a word about it.

   2. THE COUNTERS
      The numbers beside them are counted at build time from the actual
      content (see build/index.js), not typed in. Counting up on first
      sight is what makes someone read a number instead of skimming
      past it. Nothing here inflates a count: if a number is wrong, the
      content is wrong.

   3. THE REVEAL
      Sections fade in as they arrive. This is the one purely
      presentational effect, kept because it costs nothing and paces a
      long page — and it is the first thing disabled under reduced
      motion.

   REDUCED MOTION IS NOT A DEGRADED MODE
   Every one of the three has a still form that shows the same
   information: the bridge stops auto-advancing but stays steppable,
   the counters show their final value, the sections are simply
   visible. Nobody is shown less because they asked for less movement.

   THE PAUSE BUTTON IS NOT OPTIONAL
   Content that moves on its own needs a way to stop it, and
   hover-to-pause does not help someone who cannot hover. The button is
   real, it is keyboard reachable, and it is the first control in the
   bridge's tab order.
   ========================================================= */
(function (global) {
  'use strict';

  var doc = global.document;
  if (!doc) return;

  function reduced(){
    return !!(global.MotionService && global.MotionService.prefersReduced &&
              global.MotionService.prefersReduced());
  }

  /* Bilingual label built the way the rest of the product builds them:
     both halves in the DOM, the language mode decides which is seen.

     The separator is nested INSIDE a .t-en so bilingual mode reads
     "Pause · रोक्नुहोस्" while Nepali mode drops the dot along with the
     English — the house idiom, and without it the two words render
     jammed together as "Pauseरोक्नुहोस्". */
  /* lang="ne" belongs on the .t-ne span ITSELF, not on an inner span.
     Markup written into a page at build time gets that attribute from
     the build's markNepali pass; markup a runtime writes never goes
     through it, which is how Phase 6 found 82 Devanagari runs being
     read aloud by an English voice. tests/a11y.test.js enforces it. */
  function bi(en, ne){
    return '<span class="t-en">' + en + '</span>' +
           '<span class="t-ne" lang="ne"><span class="t-en"> · </span>' + ne + '</span>';
  }

  /* ---------------------------------------------------------------
     1 · THE BRIDGE
     --------------------------------------------------------------- */
  function bridge(root){
    var items = [].slice.call(root.querySelectorAll('.bridge-item'));
    if (items.length < 2) return;

    var dotWrap = root.querySelector('.bridge-dots');
    var playBtn = root.querySelector('.bridge-play');
    var i = 0, timer = null, paused = false, hovered = false;

    /* Only the visible pair is in the accessibility tree. A screen
       reader reading all six at once would report the carousel as a
       wall of unrelated word pairs. */
    function show(n){
      i = (n + items.length) % items.length;
      items.forEach(function (el, k){
        var on = k === i;
        el.classList.toggle('on', on);
        el.hidden = !on;
      });
      if (dots) dots.forEach(function (d, k){
        d.setAttribute('aria-current', k === i ? 'true' : 'false');
      });
    }

    var dots = null;
    if (dotWrap){
      dotWrap.innerHTML = '';
      dots = items.map(function (el, k){
        var b = doc.createElement('button');
        b.type = 'button';
        b.className = 'bridge-dot';
        var term = (el.getAttribute('data-term') || ('' + (k + 1)));
        b.setAttribute('aria-label', 'Show ' + term);
        b.addEventListener('click', function (){ stop(); show(k); });
        dotWrap.appendChild(b);
        return b;
      });
    }

    function tick(){ show(i + 1); }
    function start(){
      if (timer || paused || reduced()) return;
      timer = global.setInterval(tick, 4200);
    }
    function stop(){
      if (timer){ global.clearInterval(timer); timer = null; }
    }

    /* WHY the button reports state rather than intent: a control that
       says "Pause" when the thing is already stopped is the classic
       toggle bug, so the label is written from `paused` every time. */
    function paint(){
      if (!playBtn) return;
      playBtn.setAttribute('aria-pressed', paused ? 'true' : 'false');
      playBtn.innerHTML = paused
        ? bi('Play', 'चलाउनुहोस्')
        : bi('Pause', 'रोक्नुहोस्');
    }

    if (playBtn){
      playBtn.addEventListener('click', function (){
        paused = !paused;
        if (paused) stop(); else start();
        paint();
      });
      paint();
    }

    /* Hovering or tabbing in suspends the rotation without changing the
       button's state — the student is reading that pair, not asking for
       the carousel to stay stopped forever. */
    root.addEventListener('mouseenter', function (){ hovered = true; stop(); });
    root.addEventListener('mouseleave', function (){ hovered = false; start(); });
    root.addEventListener('focusin',  function (){ stop(); });
    root.addEventListener('focusout', function (){ if (!hovered) start(); });

    root.addEventListener('keydown', function (e){
      if (e.key === 'ArrowRight'){ stop(); show(i + 1); e.preventDefault(); }
      else if (e.key === 'ArrowLeft'){ stop(); show(i - 1); e.preventDefault(); }
    });

    show(0);
    if (reduced()){
      /* Nothing moves, so the pause button would control nothing. */
      if (playBtn) playBtn.hidden = true;
    } else {
      start();
    }
  }

  /* ---------------------------------------------------------------
     2 · THE COUNTERS
     --------------------------------------------------------------- */
  function countUp(el){
    var to = parseInt(el.getAttribute('data-to'), 10);
    if (!(to > 0)){ return; }
    if (reduced()){ el.textContent = String(to); return; }

    var dur = 900, t0 = 0;
    function frame(ts){
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      /* ease-out: the number slows into its final value instead of
         stopping dead, which reads as arriving rather than cutting. */
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(to * eased));
      if (p < 1) global.requestAnimationFrame(frame);
      else el.textContent = String(to);
    }
    global.requestAnimationFrame(frame);
  }

  /* ---------------------------------------------------------------
     3 · WIRING
     --------------------------------------------------------------- */
  function onSeen(els, fn){
    if (!els.length) return;
    if (!global.IntersectionObserver || reduced()){
      els.forEach(fn);
      return;
    }
    var io = new global.IntersectionObserver(function (entries){
      entries.forEach(function (en){
        if (!en.isIntersecting) return;
        fn(en.target);
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    els.forEach(function (el){ io.observe(el); });
  }

  function mount(){
    [].slice.call(doc.querySelectorAll('.bridge')).forEach(bridge);

    onSeen([].slice.call(doc.querySelectorAll('.stat-n[data-to]')), countUp);
    onSeen([].slice.call(doc.querySelectorAll('.reveal')), function (el){
      el.classList.add('in');
    });
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', mount);
  else mount();

  global.Home = { mount: mount, countUp: countUp };

})(typeof window !== 'undefined' ? window : this);
