/* ============================================================
   ACCESSIBILITY TREE AUDIT — run in a real browser

   WHAT THIS IS, AND WHAT IT IS NOT

   This inspects what the page EXPOSES to assistive technology: the
   accessible name of every control, the roles, the states, the live
   regions, the landmarks, the label relationships. That is the raw
   material a screen reader reads out.

   It is NOT a screen reader test. It cannot tell you whether NVDA
   announces a change at the right moment, whether the reading order
   makes sense out loud, or whether a student can actually complete a
   task by ear. Those need a real reader and a person listening.

   So: a page that passes this is not "screen-reader tested". It is a
   page with no *structural* reason for a screen reader to fail. That is
   a real and checkable property, and it is strictly more than the DOM
   assertions in the node suite — which is the gap Phase 3.1 found the
   hard way when three defects survived 200 green tests.

   Load it from the preview server and run:

       var s = document.createElement('script');
       s.src = '/tests/manual/a11y-tree.js';
       document.head.appendChild(s);
       // then
       __a11y()          full report
       __a11yLine()      one line per page, for sweeping

   ============================================================ */
(function (global) {
  'use strict';

  var FOCUSABLE = 'a[href],button,input,select,textarea,summary,' +
                  '[tabindex]:not([tabindex="-1"]),[role="button"],[role="radio"],' +
                  '[role="switch"],[role="tab"],[role="checkbox"]';

  function visible(el){
    var cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') return false;
    var r = el.getBoundingClientRect();
    /* an off-screen skip link is visible to AT even at 0 size on screen,
       so only truly collapsed-and-hidden elements are skipped */
    return !!(r.width || r.height || el.className.indexOf('skip') >= 0);
  }

  /* Accessible name, computed the way the spec says: aria-label wins,
     then aria-labelledby, then the element's own content (traversing
     descendants, which is where most hand-rolled checks stop short),
     then title, then a <label for> for form controls. */
  function accName(el){
    var v = el.getAttribute('aria-label');
    if (v && v.trim()) return { name: v.trim(), from: 'aria-label' };

    var lb = el.getAttribute('aria-labelledby');
    if (lb){
      var parts = [], missing = [];
      lb.split(/\s+/).forEach(function (id){
        var n = document.getElementById(id);
        if (!n) missing.push(id); else parts.push(n.textContent);
      });
      if (missing.length) return { name: parts.join(' ').trim(), from: 'aria-labelledby', broken: missing };
      var t = parts.join(' ').replace(/\s+/g, ' ').trim();
      if (t) return { name: t, from: 'aria-labelledby' };
    }

    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT'){
      if (el.id){
        var lab = document.querySelector('label[for="' + (global.CSS && CSS.escape ? CSS.escape(el.id) : el.id) + '"]');
        if (lab && lab.textContent.trim()) return { name: lab.textContent.replace(/\s+/g, ' ').trim(), from: 'label' };
      }
      var wrap = el.closest('label');
      if (wrap && wrap.textContent.trim()) return { name: wrap.textContent.replace(/\s+/g, ' ').trim(), from: 'wrapping label' };
    }

    /* name from content — descendants included, aria-hidden excluded */
    var txt = '';
    (function walk(n){
      for (var i = 0; i < n.childNodes.length; i++){
        var c = n.childNodes[i];
        if (c.nodeType === 3){ txt += c.nodeValue; continue; }
        if (c.nodeType !== 1) continue;
        if (c.getAttribute('aria-hidden') === 'true') continue;
        var cs = getComputedStyle(c);
        if (cs.display === 'none' || cs.visibility === 'hidden') continue;
        walk(c);
      }
    })(el);
    txt = txt.replace(/\s+/g, ' ').trim();
    if (txt) return { name: txt, from: 'content' };

    var ti = el.getAttribute('title');
    if (ti && ti.trim()) return { name: ti.trim(), from: 'title' };

    return { name: '', from: null };
  }

  /* A name made only of symbols tells a listener nothing: "▸" is a fine
     label to look at and useless to hear.

     A VALUE is different. "1:1", "1NF" and "10" are answer options, and
     they are meaningful the moment the group they sit in is named by
     its question — a listener hears "Which mapping cardinality? group,
     1:1 button". Flagging those was this audit reporting a defect that
     was not there, twice, so the group is checked before flagging. */
  function glyphOnly(el, name){
    if (!name) return false;
    if (/[A-Za-zऀ-ॿ]/.test(name)) return false;      /* has words */
    if (/[0-9]/.test(name)){
      var grp = el.closest('[role="group"],[role="radiogroup"],[role="tablist"]');
      if (grp && (grp.getAttribute('aria-label') || grp.getAttribute('aria-labelledby'))) return false;
    }
    return true;
  }

  function audit(){
    var out = {
      unnamed: [], glyphNamed: [], brokenRefs: [], hiddenFocusable: [],
      badRole: [], missingState: [], liveRegions: [], landmarks: {},
      unlabelledFields: [], svgNoName: [], tableNoHeader: [], dupIds: []
    };

    /* ---- duplicate ids break every aria-labelledby that uses them ---- */
    var ids = {};
    document.querySelectorAll('[id]').forEach(function (el){
      ids[el.id] = (ids[el.id] || 0) + 1;
    });
    Object.keys(ids).forEach(function (id){ if (ids[id] > 1) out.dupIds.push(id + ' ×' + ids[id]); });

    /* ---- every control must have a name a listener can act on ---- */
    document.querySelectorAll(FOCUSABLE).forEach(function (el){
      if (!visible(el)) return;
      var n = accName(el);
      var where = el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).split(' ')[0] : '');
      if (n.broken) out.brokenRefs.push(where + ' → missing id ' + n.broken.join(', '));
      if (!n.name) out.unnamed.push(where + ' :: ' + el.outerHTML.slice(0, 70).replace(/\s+/g, ' '));
      else if (glyphOnly(el, n.name)) out.glyphNamed.push(where + ' :: "' + n.name + '"');
    });

    /* ---- a focusable element inside aria-hidden is a keyboard trap
            for a screen-reader user: reachable by Tab, invisible to AT ---- */
    document.querySelectorAll('[aria-hidden="true"]').forEach(function (h){
      h.querySelectorAll(FOCUSABLE).forEach(function (el){
        if (el.getAttribute('tabindex') === '-1') return;
        out.hiddenFocusable.push(el.tagName.toLowerCase() + '.' + String(el.className).split(' ')[0]);
      });
    });

    /* ---- states the patterns in use are required to expose ---- */
    document.querySelectorAll('[role="radio"]').forEach(function (el){
      if (el.getAttribute('aria-checked') === null)
        out.missingState.push('role=radio without aria-checked');
    });
    document.querySelectorAll('[role="switch"]').forEach(function (el){
      if (el.getAttribute('aria-checked') === null)
        out.missingState.push('role=switch without aria-checked');
    });
    document.querySelectorAll('[role="tab"]').forEach(function (el){
      if (el.getAttribute('aria-selected') === null)
        out.missingState.push('role=tab without aria-selected');
    });
    document.querySelectorAll('[aria-pressed]').forEach(function (el){
      var v = el.getAttribute('aria-pressed');
      if (v !== 'true' && v !== 'false' && v !== 'mixed')
        out.missingState.push('aria-pressed="' + v + '" is not a valid value');
    });
    /* a radiogroup needs a name, or a listener hears three unexplained radios */
    document.querySelectorAll('[role="radiogroup"],[role="group"],[role="tablist"]').forEach(function (el){
      var n = accName(el);
      if (!el.getAttribute('aria-label') && !el.getAttribute('aria-labelledby'))
        out.missingState.push(el.getAttribute('role') + ' has no accessible name');
    });

    /* ---- live regions: what will actually be announced ---- */
    document.querySelectorAll('[role="status"],[role="alert"],[aria-live]').forEach(function (el){
      var live = el.getAttribute('aria-live') || (el.getAttribute('role') === 'alert' ? 'assertive' : 'polite');
      out.liveRegions.push({
        role: el.getAttribute('role') || '-', live: live,
        cls: String(el.className).split(' ')[0] || el.tagName.toLowerCase(),
        empty: !el.textContent.trim()
      });
    });

    /* ---- landmarks: how a listener navigates without seeing ---- */
    ['banner', 'navigation', 'main', 'contentinfo'].forEach(function (r){
      var byRole = document.querySelectorAll('[role="' + r + '"]').length;
      var byTag = { banner: 'header', navigation: 'nav', main: 'main', contentinfo: 'footer' }[r];
      out.landmarks[r] = byRole + document.querySelectorAll(byTag).length;
    });

    /* ---- form fields ---- */
    document.querySelectorAll('input:not([type="hidden"]),textarea,select').forEach(function (el){
      if (!visible(el)) return;
      if (!accName(el).name) out.unlabelledFields.push(el.tagName.toLowerCase() + '#' + (el.id || '?'));
    });

    /* ---- figures: an unnamed SVG is a silent gap in the lesson ---- */
    document.querySelectorAll('svg').forEach(function (s){
      if (!visible(s)) return;
      if (s.getAttribute('aria-hidden') === 'true') return;
      var titled = s.querySelector('title');
      var named = s.getAttribute('aria-label') || s.getAttribute('aria-labelledby');
      if (!titled && !named) out.svgNoName.push(String(s.className.baseVal || s.className || 'svg'));
    });

    /* ---- data tables need header cells to be readable by column ---- */
    document.querySelectorAll('table').forEach(function (t){
      if (!visible(t)) return;
      if (!t.querySelector('th')) out.tableNoHeader.push(String(t.className) || 'table');
    });

    return out;
  }

  global.__a11y = audit;

  global.__a11yLine = function (){
    var was = document.documentElement.getAttribute('data-lang') || 'bi';
    var parts = [];
    ['bi', 'en', 'ne'].forEach(function (m){
      document.documentElement.setAttribute('data-lang', m);
      var a = audit(), b = [];
      if (a.unnamed.length)          b.push('unnamed:' + a.unnamed.length);
      if (a.glyphNamed.length)       b.push('glyph-only:' + a.glyphNamed.length);
      if (a.brokenRefs.length)       b.push('broken-ref:' + a.brokenRefs.length);
      if (a.hiddenFocusable.length)  b.push('hidden-focusable:' + a.hiddenFocusable.length);
      if (a.missingState.length)     b.push('state:' + a.missingState.length);
      if (a.unlabelledFields.length) b.push('unlabelled:' + a.unlabelledFields.length);
      if (a.svgNoName.length)        b.push('svg-unnamed:' + a.svgNoName.length);
      if (a.tableNoHeader.length)    b.push('table-no-th:' + a.tableNoHeader.length);
      if (a.dupIds.length)           b.push('dup-id:' + a.dupIds.length);
      if (!a.landmarks.main)         b.push('NO MAIN LANDMARK');
      if (b.length) parts.push(m + ' ' + b.join(' · '));
    });
    document.documentElement.setAttribute('data-lang', was);
    return location.pathname + ' => ' + (parts.length ? parts.join('  ||  ') : 'clean');
  };
})(window);
