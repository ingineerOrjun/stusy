/* ============================================================
   COLOUR CONTRAST

   Computed from the tokens with the WCAG 2.1 relative-luminance
   formula, so a palette change that regresses accessibility fails the
   build rather than waiting for someone to notice.

   Two levels are checked, and the distinction matters:

     1.4.3  Contrast (Minimum)   4.5:1 for normal text
     1.4.11 Non-text Contrast    3:1 for the boundary of a USER INTERFACE
                                 COMPONENT — not for a decorative rule

   The product splits the border token on exactly that line:
     --line-strong  control borders            must reach 3:1
     --line         dividers, hairlines, rules decorative, exempt

   Decorative values are asserted to stay BELOW the control value, so a
   future edit cannot quietly promote a divider into looking like a
   control boundary.
   ============================================================ */
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const TOKENS = fs.readFileSync(
  path.resolve(__dirname, '..', '_source', 'design', 'tokens.css'), 'utf8');

const tok = {};
for (const m of TOKENS.matchAll(/--([a-z0-9-]+):\s*(#[0-9a-fA-F]{3,8}|var\(--[a-z0-9-]+\))\s*(?:;|\s)/g)){
  if (!(m[1] in tok)) tok[m[1]] = m[2];
}
function resolve(name, depth = 0){
  const v = tok[name];
  if (v === undefined || depth > 10) return null;
  const m = /^var\(--([a-z0-9-]+)\)$/.exec(v);
  return m ? resolve(m[1], depth + 1) : v;
}
function rgb(hex){
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  return [0, 2, 4].map(i => parseInt(hex.slice(i, i + 2), 16));
}
function luminance(hex){
  return rgb(hex).map(c => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  }).reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0);
}
function ratio(a, b){
  const [hi, lo] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (hi + 0.05) / (lo + 0.05);
}
function contrast(fgToken, bgToken){
  const f = resolve(fgToken), b = resolve(bgToken);
  assert.ok(f, 'token --' + fgToken + ' does not resolve to a colour');
  assert.ok(b, 'token --' + bgToken + ' does not resolve to a colour');
  return ratio(f, b);
}

/* Every ground a component can sit on. */
const GROUNDS = ['bg', 'board', 'board-2', 'panel'];

test('every text colour reaches 4.5:1 on every ground it is used on', () => {
  const TEXT = ['chalk-white', 'chalk-dim', 'chalk-faint', 'yellow', 'blue', 'coral', 'green', 'violet'];
  const fails = [];
  for (const fg of TEXT){
    for (const bg of GROUNDS){
      const r = contrast(fg, bg);
      if (r < 4.5) fails.push(`--${fg} on --${bg} = ${r.toFixed(2)}:1`);
    }
  }
  assert.deepStrictEqual(fails, [], 'WCAG 1.4.3 requires 4.5:1 for normal text');
});

test('--chalk-faint clears the panel ground it used to fail on', () => {
  /* The specific regression: #7e948e measured 4.35:1 on --panel. */
  const r = contrast('chalk-faint', 'panel');
  assert.ok(r >= 4.5, '--chalk-faint on --panel is ' + r.toFixed(2) + ':1');
  assert.strictEqual(resolve('chalk-faint'), '#819791',
    'the value was chosen as the smallest change that clears 4.5:1 — ' +
    'a different value needs re-measuring, not a test edit');
});

test('control borders reach 3:1 on every ground', () => {
  const fails = [];
  for (const bg of GROUNDS){
    const r = contrast('line-strong', bg);
    if (r < 3) fails.push(`--line-strong on --${bg} = ${r.toFixed(2)}:1`);
  }
  assert.deepStrictEqual(fails, [],
    'WCAG 1.4.11 requires 3:1 for the boundary of a user interface component');
});

test('the decorative border stays quieter than the control border', () => {
  /* If these ever converge, the split has been lost and every divider
     is about to be promoted to a control boundary. */
  const decorative = contrast('line', 'panel');
  const control = contrast('line-strong', 'panel');
  assert.ok(control > decorative * 1.5,
    'the control border must be clearly stronger than a decorative rule: ' +
    control.toFixed(2) + ' vs ' + decorative.toFixed(2));
});

test('interactive controls use the accessible border token', () => {
  /* The token only helps if the controls actually reference it. */
  const css = ['base', 'site', 'learning-ux', 'digital', 'language']
    .map(f => fs.readFileSync(path.resolve(__dirname, '..', '_source', 'design', f + '.css'), 'utf8'))
    .join('\n');
  const CONTROLS = [
    ['button',        /button\{[^}]*border:1\.5px solid var\(--line-strong\)/],
    ['.opt',          /\.opt\{[^}]*border:1\.5px solid var\(--line-strong\)/],
    ['.nav a',        /\.nav a\{[^}]*border:1px solid var\(--line-strong\)/],
    ['.hamburger',    /\.hamburger\{[^}]*border:1\.5px solid var\(--line-strong\)/],
    ['.predict-opt',  /\.predict-opt\{[^}]*border: 1\.5px solid var\(--color-border-strong\)/],
    ['.gl-in',        /\.gl-in\{[^}]*border: 1\.5px solid var\(--color-border-strong\)/],
    ['.gl-gate',      /\.gl-gate\{[^}]*border: 1\.5px solid var\(--color-border-strong\)/],
    ['.nl-bit',       /\.nl-bit\{[^}]*border: 1\.5px solid var\(--color-border-strong\)/],
    ['.km-btn',       /\.km-btn\{[^}]*border: 1\.5px solid var\(--color-border-strong\)/],
    ['.langbar',      /\.langbar\{[^}]*border: 1\.5px solid var\(--line-strong\)/]
  ];
  const missing = CONTROLS.filter(([, re]) => !re.test(css)).map(([name]) => name);
  assert.deepStrictEqual(missing, [],
    'these controls still use the decorative border and fail WCAG 1.4.11');
});

test('the semantic layer exposes the strong border', () => {
  assert.strictEqual(resolve('color-border-strong'), resolve('line-strong'));
});
