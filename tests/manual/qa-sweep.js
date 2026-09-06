/* ============================================================
   THREE-MODE VISUAL QA SWEEP — run in a real browser

   The node test suite asserts on markup. It cannot see layout: it does
   not know that a truth table is 40px wider than the box holding it, or
   that a panel came out empty in Nepali mode, because neither fact
   exists until a browser has applied the CSS.

   This is the instrument for the other half. Load a page from the
   preview server and run:

       var s = document.createElement('script');
       s.src = '/tests/manual/qa-sweep.js';
       document.head.appendChild(s);
       // then
       __qa()

   It puts every mode on screen in turn, measures, and restores the mode
   it found. Everything it reports is a real measurement — nothing here
   is estimated, and nothing here reports a frame rate, because the
   automation pane throttles rAF and any number would be fiction.

   WHAT IT CANNOT SEE, and why the report must say so:
     - what a screen reader announces
     - colour as a colour-blind student perceives it
     - anything above 100% zoom
   ============================================================ */
(function (global) {
  'use strict';

  var DEVA = /[ऀ-ॿ]/;

  function vis(el){
    var cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return false;
    var r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  }

  function check(mode){
    document.documentElement.setAttribute('data-lang', mode);
    var out = { mode: mode, overflowX: 0, clipped: [], empty: [], leaked: [], tiny: [] };

    /* 1. The page itself must never scroll sideways. On a 360px phone
          this is the difference between a usable lesson and one the
          student has to drag. */
    out.overflowX = Math.max(0, document.documentElement.scrollWidth -
                                document.documentElement.clientWidth);

    /* 2. Wide content is allowed — but only inside something that
          scrolls. Wide content in a box that clips is lost content. */
    document.querySelectorAll('table, pre, .out, svg, .km-grid, .gl-tt').forEach(function (el){
      var p = el.parentElement;
      if (!p || !vis(el)) return;
      var scrolls = /auto|scroll/.test(getComputedStyle(p).overflowX);
      var over = el.getBoundingClientRect().width - p.getBoundingClientRect().width;
      if (over > 1 && !scrolls){
        out.clipped.push((el.className || el.tagName) + ' +' + Math.round(over) + 'px');
      }
    });

    /* 3. A box that survives into a mode with nothing left inside it.
          This is how a language rule that hides too much shows up. */
    document.querySelectorAll('.pair, .callout, .wex, .predict, .sim-head, .exam-connect,' +
                              '.keypoints, figcaption, .card, .outcomes').forEach(function (el){
      if (vis(el) && !el.innerText.trim()) out.empty.push(el.className || el.tagName);
    });

    /* 4. The wrong language on screen. The switcher is exempt: it names
          each language in that language, which is the point of it. */
    if (mode === 'en'){
      document.querySelectorAll('body *').forEach(function (el){
        if (el.children.length || el.closest('.langbar') || !vis(el)) return;
        var t = (el.textContent || '').trim();
        if (t && DEVA.test(t)) out.leaked.push(t.slice(0, 40));
      });
    }

    /* 5. Text too small to read on a phone. */
    document.querySelectorAll('p, li, td, span, div').forEach(function (el){
      if (el.children.length || !vis(el) || !(el.textContent || '').trim()) return;
      var px = parseFloat(getComputedStyle(el).fontSize);
      if (px && px < 11) out.tiny.push(Math.round(px * 10) / 10 + 'px ' + (el.className || el.tagName));
    });

    return out;
  }

  global.__qa = function (){
    var was = document.documentElement.getAttribute('data-lang') || 'bi';
    var res = ['bi', 'en', 'ne'].map(check);
    document.documentElement.setAttribute('data-lang', was);
    return { url: location.pathname, w: innerWidth, modes: res };
  };
  /* One line per page, so a 28-page sweep is readable in a console. */
  global.__qaLine = function (){
    var r = global.__qa(), parts = [];
    r.modes.forEach(function (m){
      var b = [];
      if (m.overflowX) b.push('overflowX=' + m.overflowX);
      if (m.clipped.length) b.push('clipped: ' + m.clipped.join(' | '));
      if (m.empty.length) b.push('empty: ' + m.empty.join(' | '));
      if (m.leaked.length) b.push('leaked: ' + m.leaked.join(' | '));
      if (m.tiny.length) b.push('tiny: ' + m.tiny.slice(0, 3).join(' | '));
      if (b.length) parts.push(m.mode + ' ' + b.join(' ; '));
    });
    return r.url + ' @' + r.w + ' => ' + (parts.length ? parts.join('  ||  ') : 'clean');
  };

  /* Load me, then run me, in one expression. */
  global.__qaLoad = function (){
    return new Promise(function (ok, no){
      if (global.__qaLine && document.currentScript) return ok();
      var s = document.createElement('script');
      s.src = '/tests/manual/qa-sweep.js';
      s.onload = ok; s.onerror = no;
      document.head.appendChild(s);
    });
  };
})(window);
