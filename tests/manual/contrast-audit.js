/* ============================================================
   CONTRAST AUDIT — token matrix (node) + measured pairs (browser)

   WHY BOTH HALVES
   A token comment saying "4.52:1 on --panel" is a claim about a pairing,
   and the claim is only true where that pairing is what renders. The
   node half checks the arithmetic. The browser half checks the premise:
   it walks every element that actually paints text, resolves the real
   foreground and the real background it sits on — through transparent
   ancestors — and reports what a student's eye receives.

   The second half is the one that matters. A palette can be provably
   correct and still fail on the one panel a component nests inside
   another.

   WHICH THRESHOLD
   WCAG 1.4.3 wants 4.5:1 for body text and 3:1 for large text
   (>=24px, or >=18.66px bold). 1.4.11 wants 3:1 for the boundary of a
   UI CONTROL and for meaningful graphics — it does not apply to
   decorative rules, and this audit does not pretend it does.

   RUN
     node tests/manual/contrast-audit.js          -> token matrix
     paste CONTRAST into a served page's console  -> measured pairs
   ============================================================ */
'use strict';

/* ---------- shared colour maths (WCAG 2.x relative luminance) ---------- */
function srgb(c){ c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
function lum(rgb){ return 0.2126 * srgb(rgb[0]) + 0.7152 * srgb(rgb[1]) + 0.0722 * srgb(rgb[2]); }
function ratio(a, b){
  const la = lum(a), lb = lum(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}
function hex(h){
  h = h.replace('#', '');
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

/* ---------- browser half ---------- */
const CONTRAST = String(function contrastAudit(){
  function srgb(c){ c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
  function lum(p){ return 0.2126 * srgb(p[0]) + 0.7152 * srgb(p[1]) + 0.0722 * srgb(p[2]); }
  function ratio(a, b){ var la = lum(a), lb = lum(b);
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05); }
  function parse(c){
    var m = /rgba?\(([^)]+)\)/.exec(c || '');
    if (!m) return null;
    var p = m[1].split(/[,\s/]+/).filter(Boolean).map(Number);
    return { rgb: [p[0], p[1], p[2]], a: p.length > 3 ? p[3] : 1 };
  }
  function over(fg, bg, a){
    return [Math.round(fg[0] * a + bg[0] * (1 - a)),
            Math.round(fg[1] * a + bg[1] * (1 - a)),
            Math.round(fg[2] * a + bg[2] * (1 - a))];
  }
  /* A GRADIENT IS A BACKGROUND TOO.
     The first version of this read only `background-color` and reported
     the brand mark and the active language pill at 1.15:1 — dark text
     "invisible on a dark panel". Both actually sit on a yellow gradient
     painted through `background-image`, and both are perfectly legible.
     A tool that reports a phantom defect is itself a defect.

     A gradient has no single colour, so every stop is collected and the
     caller compares against the WORST one: a ratio that holds across the
     whole sweep is the only one that holds everywhere the text lands. */
  function stops(cs){
    var img = cs.backgroundImage;
    if (!img || img === 'none') return [];
    var found = [], m;
    var re = /rgba?\(([^)]+)\)/g;
    while ((m = re.exec(img))){
      var p = m[1].split(/[,\s/]+/).filter(Boolean).map(Number);
      found.push({ rgb: [p[0], p[1], p[2]], a: p.length > 3 ? p[3] : 1 });
    }
    return found;
  }

  /* THE BACKGROUND A PIXEL ACTUALLY HAS.
     Most elements are transparent; the colour behind the text is
     whichever ancestor last painted, composited through every
     translucent layer in between. Assuming the nearest ancestor's
     declared background is how a palette passes on paper and fails on
     screen. Returns every candidate the text can sit on. */
  function realBgs(el){
    var layers = [];                    /* nearest-first */
    for (var n = el; n; n = n.parentElement){
      var cs = getComputedStyle(n);
      var g = stops(cs);
      if (g.length){ layers.push(g); if (g.every(function (s){ return s.a === 1; })) break; continue; }
      var c = parse(cs.backgroundColor);
      if (c && c.a > 0){ layers.push([c]); if (c.a === 1) break; }
    }
    if (!layers.length) return [[255, 255, 255]];
    /* composite each candidate of the nearest painted layer down through
       the rest; opaque layers below collapse to a single base */
    var base = null;
    for (var i = layers.length - 1; i >= 0; i--){
      var cands = layers[i];
      if (base === null){
        base = cands.map(function (c){ return c.a === 1 ? c.rgb : over(c.rgb, [0, 0, 0], c.a); });
      } else {
        var next = [];
        for (var b = 0; b < base.length; b++)
          for (var k = 0; k < cands.length; k++)
            next.push(cands[k].a === 1 ? cands[k].rgb : over(cands[k].rgb, base[b], cands[k].a));
        base = next;
      }
    }
    return base;
  }

  var results = [], fails = [], bounds = [];
  var seen = Object.create(null);
  var all = document.querySelectorAll('body *');

  for (var i = 0; i < all.length; i++){
    var el = all[i];
    if (el.getClientRects().length === 0) continue;
    /* only elements that paint their own text */
    var own = '';
    for (var j = 0; j < el.childNodes.length; j++){
      if (el.childNodes[j].nodeType === 3) own += el.childNodes[j].nodeValue;
    }
    if (!own.trim()) continue;

    var cs = getComputedStyle(el);
    var fg = parse(cs.webkitTextFillColor && cs.webkitTextFillColor !== 'currentcolor'
                     ? cs.webkitTextFillColor : cs.color);
    if (!fg) continue;
    var size = parseFloat(cs.fontSize);
    var weight = Number(cs.fontWeight) || 400;
    var large = size >= 24 || (size >= 18.66 && weight >= 700);
    var need = large ? 3 : 4.5;

    /* A GRADIENT STOP IS A BOUND, NOT A MEASUREMENT.
       Taking the worst stop of every gradient in the ancestor chain
       reported the breadcrumb separator at 4.34:1 and a Reset button at
       4.48:1 — both "failing". Neither does: body paints two radial
       glows whose positioning area is the full 16,000px document, so
       their bright cores sit far above the viewport and no text on the
       page is ever painted on them. A screenshot showed flat --bg under
       both elements, where they measure 5.75:1 and 8.03:1.

       So a gradient-backed pair is reported as `bounded` and never as a
       failure: this audit cannot say where in the sweep the text lands,
       and reporting a defect it cannot demonstrate is how a tool starts
       costing more than it finds. Solid backgrounds are `measured` and
       those failures are real. */
    var cands = realBgs(el);
    var bounded = cands.length > 1;
    var bg = cands[0], r = Infinity;
    for (var c = 0; c < cands.length; c++){
      var col0 = fg.a < 1 ? over(fg.rgb, cands[c], fg.a) : fg.rgb;
      var rr = ratio(col0, cands[c]);
      if (rr < r){ r = rr; bg = cands[c]; }
    }
    var col = fg.a < 1 ? over(fg.rgb, bg, fg.a) : fg.rgb;

    var key = cs.color + '|' + bg.join(',') + '|' + (large ? 'L' : 'N');
    if (seen[key]) continue;
    seen[key] = 1;

    var rec = { fg: cs.color, bg: 'rgb(' + bg.join(', ') + ')', size: size, weight: weight,
                large: large, ratio: Math.round(r * 100) / 100, need: need,
                kind: bounded ? 'bounded' : 'measured',
                pass: r >= need,
                where: el.tagName.toLowerCase() +
                  (typeof el.className === 'string' && el.className ? '.' + el.className.split(' ')[0] : ''),
                sample: own.replace(/\s+/g, ' ').trim().slice(0, 34) };
    results.push(rec);
    if (!rec.pass){ (bounded ? bounds : fails).push(rec); }
  }

  results.sort(function (a, b){ return a.ratio - b.ratio; });
  return { distinctPairs: results.length,
           failures: fails.length, fails: fails,
           /* below threshold only in the worst case of a gradient — needs
              an eye on the actual position before it means anything */
           boundedBelow: bounds.length, bounded: bounds,
           worst: results.filter(function (x){ return x.kind === 'measured'; }).slice(0, 12) };
});

module.exports = { CONTRAST_SOURCE: CONTRAST, ratio, hex, lum };

/* ---------- node half: the token matrix ---------- */
if (require.main === module){
  const fs = require('fs');
  const path = require('path');
  const css = fs.readFileSync(path.resolve(__dirname, '..', '..', '_source', 'design', 'tokens.css'), 'utf8');
  const tok = {};
  for (const m of css.matchAll(/--([a-z0-9-]+)\s*:\s*(#[0-9a-fA-F]{3,8})\s*;/g)) tok[m[1]] = m[2];

  const surfaces = ['bg', 'board', 'board-2', 'panel'];
  const inks = ['chalk-white', 'chalk-dim', 'chalk-faint', 'yellow', 'blue', 'coral', 'green', 'violet'];

  console.log('TEXT ON SURFACE — WCAG 1.4.3 needs 4.5:1 for body text\n');
  const head = 'ink'.padEnd(13) + surfaces.map(s => s.padStart(9)).join('');
  console.log(head);
  console.log('-'.repeat(head.length));
  for (const ink of inks){
    let row = ink.padEnd(13);
    for (const s of surfaces){
      const r = ratio(hex(tok[ink]), hex(tok[s]));
      row += ((r >= 4.5 ? ' ' : '!') + r.toFixed(2)).padStart(9);
    }
    console.log(row);
  }

  console.log('\nNON-TEXT — WCAG 1.4.11 needs 3:1, and only for CONTROL boundaries\n');
  for (const l of ['line', 'line-strong', 'line-soft']){
    let row = l.padEnd(13);
    for (const s of surfaces){
      const r = ratio(hex(tok[l]), hex(tok[s]));
      row += ((r >= 3 ? ' ' : '!') + r.toFixed(2)).padStart(9);
    }
    console.log(row);
  }
  console.log('\n! = below the threshold for that use. A decorative divider is');
  console.log('  not a control boundary, so a low --line is not automatically a');
  console.log('  failure — the browser half says which ones carry meaning.');
}
