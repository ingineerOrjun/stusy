/* ============================================================
   COLOUR-INDEPENDENCE AUDIT — browser-run

   THE QUESTION, MADE MEASURABLE
   "Colour never carries meaning alone" has been claimed since Phase 1
   and never tested, because "can a colour-blind student tell these
   apart" sounds like a question only a person can answer.

   It is not, if it is asked precisely. Take two states that mean
   different things — right and wrong, selected and not, 1 and 0 — and
   ask what actually differs between them. If the ONLY difference is
   hue, the meaning is carried by colour alone and a student with
   deuteranopia loses it. If the text differs, or the border style, or a
   glyph, or an aria state, the meaning survives.

   So this compares two rendered states property by property, and
   separately simulates deuteranopia, protanopia and tritanopia on the
   colours to show what remains after the hue difference is taken away.

   WHAT IT CANNOT DO
   It cannot tell you the page feels clear. It tells you whether the
   distinction SURVIVES the loss of hue, which is the part that can be
   demonstrated. Perception is still a person's judgement.

   THE SIMULATION
   Brettel/Viénot-style linear approximations on linear-RGB. They are
   approximations — good enough to answer "do these two collapse into
   each other", not a clinical model, and this file does not pretend
   otherwise.
   ============================================================ */
'use strict';

const COLOUR = String(function colourAudit(pairs){
  function srgb(c){ c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
  function unsrgb(c){ c = c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
    return Math.max(0, Math.min(255, Math.round(c * 255))); }
  function lum(p){ return 0.2126 * srgb(p[0]) + 0.7152 * srgb(p[1]) + 0.0722 * srgb(p[2]); }
  function ratio(a, b){ var x = lum(a), y = lum(b);
    return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
  function parse(c){
    var m = /rgba?\(([^)]+)\)/.exec(c || '');
    if (!m) return null;
    var p = m[1].split(/[,\s/]+/).filter(Boolean).map(Number);
    return [p[0], p[1], p[2]];
  }
  /* linear-RGB matrices */
  var SIM = {
    deuteranopia: [0.625, 0.375, 0, 0.7, 0.3, 0, 0, 0.3, 0.7],
    protanopia:   [0.567, 0.433, 0, 0.558, 0.442, 0, 0, 0.242, 0.758],
    tritanopia:   [0.95, 0.05, 0, 0, 0.433, 0.567, 0, 0.475, 0.525]
  };
  function simulate(rgb, kind){
    var m = SIM[kind];
    var r = srgb(rgb[0]), g = srgb(rgb[1]), b = srgb(rgb[2]);
    return [unsrgb(m[0] * r + m[1] * g + m[2] * b),
            unsrgb(m[3] * r + m[4] * g + m[5] * b),
            unsrgb(m[6] * r + m[7] * g + m[8] * b)];
  }

  /* Everything about an element that could carry a distinction. */
  function snapshot(el){
    var cs = getComputedStyle(el);
    return {
      text: (el.textContent || '').replace(/\s+/g, ' ').trim(),
      colour: cs.color,
      bg: cs.backgroundColor,
      borderColour: cs.borderColor,
      borderStyle: cs.borderStyle,
      borderWidth: cs.borderWidth,
      shadow: cs.boxShadow,
      weight: cs.fontWeight,
      textDecoration: cs.textDecorationLine,
      opacity: cs.opacity,
      content: (getComputedStyle(el, '::before').content || '') + '|' +
               (getComputedStyle(el, '::after').content || ''),
      aria: ['aria-pressed', 'aria-checked', 'aria-selected', 'aria-disabled', 'aria-invalid']
              .map(function (a){ return a + '=' + el.getAttribute(a); }).join(' '),
      className: String(el.className)
    };
  }

  var out = [];
  for (var i = 0; i < pairs.length; i++){
    var p = pairs[i];
    var a = document.querySelector(p.a), b = document.querySelector(p.b);
    if (!a || !b){ out.push({ name: p.name, skipped: 'not on this page' }); continue; }
    var sa = snapshot(a), sb = snapshot(b);

    /* what differs that is NOT a colour? */
    var nonColour = [];
    if (sa.text !== sb.text) nonColour.push('text');
    if (sa.borderStyle !== sb.borderStyle) nonColour.push('border-style');
    if (sa.borderWidth !== sb.borderWidth) nonColour.push('border-width');
    if (sa.weight !== sb.weight) nonColour.push('font-weight');
    if (sa.textDecoration !== sb.textDecoration) nonColour.push('text-decoration');
    if (sa.content !== sb.content) nonColour.push('generated glyph');
    if (sa.aria !== sb.aria) nonColour.push('aria state');
    if (sa.className !== sb.className) nonColour.push('class (styling hook only — not perceivable)');
    /* a shadow that exists on one and not the other is a shape cue */
    var shadowA = sa.shadow !== 'none', shadowB = sb.shadow !== 'none';
    if (shadowA !== shadowB) nonColour.push('ring present/absent');

    var perceivable = nonColour.filter(function (n){ return n.indexOf('not perceivable') < 0; });

    /* HOW FAR APART DO THE TWO STAY WITHOUT HUE?
       Every channel that could carry the distinction, not just the text
       colour: the first run compared `color` alone and reported the
       drill's right and wrong options as identical, because both keep
       the same white text and are told apart by their border. */
    var channels = { text: ['colour'], border: ['borderColour'], background: ['bg'] };
    var collapse = {};
    for (var ch in channels){
      var ca = parse(sa[channels[ch][0]]), cb = parse(sb[channels[ch][0]]);
      if (!ca || !cb) continue;
      var row = { normal: Math.round(ratio(ca, cb) * 100) / 100 };
      for (var k in SIM) row[k] = Math.round(ratio(simulate(ca, k), simulate(cb, k)) * 100) / 100;
      /* 1.00 in every column means this channel says nothing either way */
      if (row.normal !== 1) collapse[ch] = row;
    }

    out.push({
      name: p.name,
      nonColourCues: perceivable,
      colourOnly: perceivable.length === 0,
      textA: sa.text.slice(0, 40), textB: sb.text.slice(0, 40),
      colourA: sa.colour, colourB: sb.colour,
      /* 1.0 means the two are indistinguishable by that eye */
      separationByChannel: collapse
    });
  }
  return { url: location.pathname, pairs: out,
           colourOnly: out.filter(function (r){ return r.colourOnly; }).length };
});

if (require.main === module){
  const fs = require('fs');
  const path = require('path');
  fs.writeFileSync(path.join(__dirname, '__colour-inject.js'), 'window.COLOUR = ' + COLOUR + ';');
  console.log('wrote tests/manual/__colour-inject.js');
  console.log('load it on a served page, then COLOUR([{name, a, b}, ...]) with two selectors per state pair');
}

module.exports = { COLOUR_SOURCE: COLOUR };
