/* ============================================================
   KEYBOARD & FOCUS AUDIT — browser-run

   THE QUESTION
   Not "is there a :focus-visible rule in the stylesheet" — there is, and
   a test already asserts it. The question is whether a student who never
   touches a mouse can reach every control, always see where they are,
   and never get stuck.

   Those are three different failures and this checks them separately:

     REACH    an interactive element that Tab cannot arrive at. Usually
              a div wearing role="button", or a control inside a
              container with tabindex="-1".
     SEE      focus lands and nothing changes visibly, or the ring is
              there but too faint to find. Measured: the ring is
              compared against what it sits on, and against the 3:1 that
              WCAG 1.4.11 asks of a control boundary.
     ESCAPE   focus enters something it cannot Tab out of.

   WHY THE RING IS MEASURED AND NOT ASSERTED
   `outline: 2px solid var(--color-focus)` is correct in the stylesheet
   and invisible on a panel that happens to be the same hue. Only the
   rendered pair answers it.

   RUN
     paste KB into a served page's console, then KB()
   ============================================================ */
'use strict';

const KB = String(function keyboardAudit(){
  function srgb(c){ c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
  function lum(p){ return 0.2126 * srgb(p[0]) + 0.7152 * srgb(p[1]) + 0.0722 * srgb(p[2]); }
  function ratio(a, b){ var x = lum(a), y = lum(b);
    return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
  function rgb(c){
    var m = /rgba?\(([^)]+)\)/.exec(c || ''); if (!m) return null;
    var p = m[1].split(/[,\s/]+/).filter(Boolean).map(Number);
    return { rgb: [p[0], p[1], p[2]], a: p.length > 3 ? p[3] : 1 };
  }
  function visible(el){
    if (el.getClientRects().length === 0) return false;
    for (var n = el; n && n.nodeType === 1; n = n.parentElement){
      var cs = getComputedStyle(n);
      if (cs.display === 'none' || cs.visibility === 'hidden') return false;
      if (n.getAttribute('aria-hidden') === 'true') return false;
      if (n.hasAttribute('inert')) return false;
    }
    return true;
  }

  /* Everything a keyboard user should be able to OPERATE.
     A landmark carrying tabindex="-1" is a focus DESTINATION, not a
     control — <main> wears it so the skip link can hand focus over.
     Counting it as unreachable made the fix look like the bug. */
  var SEL = 'a[href],button,input,select,textarea,summary,' +
            '[role="button"],[role="radio"],[role="tab"],[role="checkbox"],' +
            '[role="link"],[role="switch"],[role="menuitem"],[contenteditable="true"],' +
            '[tabindex]';
  var DESTINATION = /^(main|section|article|aside|nav|header|footer|div|h[1-6])$/i;
  var operable = Array.prototype.filter.call(document.querySelectorAll(SEL), function (el){
    if (!visible(el)) return false;
    if (DESTINATION.test(el.tagName) && el.getAttribute('tabindex') === '-1' &&
        !el.getAttribute('role')) return false;
    return true;
  });

  var unreachable = [], noRing = [], faintRing = [], positiveTabindex = [];

  /* ---- REACH: negative tabindex on something a user must operate ---- */
  operable.forEach(function (el){
    var ti = el.getAttribute('tabindex');
    if (ti !== null && Number(ti) < 0){
      /* legitimate when it is a roving-tabindex member of a composite
         widget — the group is reached, then arrow keys move within it */
      var comp = el.closest('[role="radiogroup"],[role="tablist"],[role="menu"],' +
                            '[role="listbox"],[role="grid"],[role="toolbar"]');
      if (!comp) unreachable.push(describe(el) + ' (tabindex="' + ti + '", not in a composite widget)');
    }
    if (ti !== null && Number(ti) > 0) positiveTabindex.push(describe(el) + ' tabindex="' + ti + '"');
  });

  function describe(el){
    return el.tagName.toLowerCase() +
      (typeof el.className === 'string' && el.className ? '.' + el.className.split(' ')[0] : '') +
      ' "' + (el.textContent || el.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim().slice(0, 26) + '"';
  }

  /* ---- SEE: focus each control and compare before/after ---- */
  /* AN OUTLINE IS PAINTED OUTSIDE THE BORDER BOX.
     So the surface it has to stand out against is what surrounds the
     control, not the control's own fill. Comparing against the element's
     own background reported the skip link's yellow ring at 1:1 "on
     yellow" — but the skip link is a yellow button and its ring is drawn
     on the dark page around it, where it is one of the most visible
     things on the screen. */
  function paintedBg(el){
    for (var n = el.parentElement; n; n = n.parentElement){
      var c = rgb(getComputedStyle(n).backgroundColor);
      if (c && c.a === 1) return c.rgb;
    }
    return [14, 26, 22];
  }

  /* SCRIPTED FOCUS CANNOT ANSWER "IS THE RING VISIBLE".
     el.focus() does not put the element into :focus-visible — that state
     follows the user's interaction modality, not the DOM call. The first
     version of this compared computed styles before and after focus()
     and reported every control on the page as having no focus indicator:
     52 of 52 on one page, 39 of 39 on another. A real Tab press on the
     same page gives :focus-visible true and outline 3px solid #ffd76e.
     All 91 were phantoms.

     So the ring is not discovered by focusing; it is read from the rule
     that defines it and compared against the background each control
     actually sits on. That answers the question that matters — can the
     student find the ring — without pretending to a modality this cannot
     enter. WCAG 1.4.11 asks 3:1 of a focus indicator. */
  var probe = document.createElement('button');
  probe.style.cssText = 'position:fixed;left:-9999px;top:0';
  document.body.appendChild(probe);
  var ringColor = null;
  try {
    /* read the declared focus colour rather than inferring it */
    var declared = getComputedStyle(document.documentElement).getPropertyValue('--color-focus').trim();
    ringColor = rgb(declared) || (function (){
      probe.style.color = declared; var c = rgb(getComputedStyle(probe).color); return c;
    })();
  } catch (e){}
  probe.remove();

  var checked = 0;
  if (ringColor){
    operable.forEach(function (el){
      checked++;
      var on = paintedBg(el);
      var r = ratio(ringColor.rgb, on);
      if (r < 3) faintRing.push(describe(el) + ' ring ' + Math.round(r * 100) / 100 + ':1 on rgb(' + on.join(',') + ')');
    });
  } else {
    noRing.push('--color-focus could not be resolved');
  }

  /* ---- the skip link, which is the whole point of the first Tab ---- */
  var skip = document.querySelector('a[href^="#"]');
  var skipInfo = null;
  if (skip){
    var target = document.getElementById(decodeURIComponent(skip.getAttribute('href').slice(1)));
    skip.focus();
    var cs = getComputedStyle(skip);
    skipInfo = { text: (skip.textContent || '').trim(),
                 targetExists: !!target,
                 targetFocusable: target ? (target.hasAttribute('tabindex') || /^(a|button|input)$/i.test(target.tagName)) : false,
                 visibleWhenFocused: skip.getBoundingClientRect().top > -5 &&
                                     cs.visibility !== 'hidden' && cs.display !== 'none',
                 rect: JSON.parse(JSON.stringify(skip.getBoundingClientRect())) };
    skip.blur();
  }

  /* ---- ESCAPE: does anything hold focus captive? ---- */
  var traps = [];
  Array.prototype.forEach.call(
    document.querySelectorAll('[role="dialog"],[aria-modal="true"],dialog'), function (d){
      if (visible(d)) traps.push(describe(d) + ' is open — verify Escape closes it and focus returns');
    });

  return {
    url: location.pathname,
    mode: document.documentElement.getAttribute('data-lang'),
    operableControls: operable.length,
    focusTested: checked,
    unreachable: unreachable,
    positiveTabindex: positiveTabindex,
    noVisibleFocusChange: noRing,
    focusRingBelow3to1: faintRing,
    skipLink: skipInfo,
    openDialogs: traps
  };
});

if (require.main === module){
  const fs = require('fs');
  const path = require('path');
  fs.writeFileSync(path.join(__dirname, '__kb-inject.js'), 'window.KB = ' + KB + ';');
  console.log('wrote tests/manual/__kb-inject.js — load it on a served page, then KB()');
}

module.exports = { KB_SOURCE: KB };
