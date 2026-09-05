/* The Phase 2 learning-UX and design-system contract.

   These tests exist because the system has to hold for 500 future lessons
   written by people who were not here when it was designed. Each one
   encodes a rule that was expensive to discover. */
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, '_source');
const css = fs.readFileSync(path.join(ROOT, 'assets/css/style.css'), 'utf8');
const LESSONS = ['u1','u2','u3','u4','u5','u6'];
const UNIT_PAGES = LESSONS.map((_, i) => path.join(ROOT, 'grade10/oop-cpp', 'unit' + (i + 1) + '.html'));

function allPages(){
  const out = [];
  (function walk(d){
    for (const e of fs.readdirSync(d, { withFileTypes: true })){
      if (['.git','_source','docs','tests','node_modules'].includes(e.name)) continue;
      const p = path.join(d, e.name);
      e.isDirectory() ? walk(p) : p.endsWith('.html') && out.push(p);
    }
  })(ROOT);
  return out;
}

/* ---------------------------------------------------------- design tokens */

test('every token group the design system promises exists', () => {
  const tokens = fs.readFileSync(path.join(SRC, 'design/tokens.css'), 'utf8');
  const required = [
    /* semantic colour roles */
    '--color-background','--color-surface','--color-surface-elevated','--color-surface-sunken',
    '--color-border','--color-text','--color-text-muted','--color-primary','--color-secondary',
    '--color-success','--color-warning','--color-error','--color-info','--color-focus',
    '--color-lang-en','--color-lang-ne',
    /* scales */
    '--sp-1','--sp-4','--sp-12','--space-section','--space-block',
    '--fs-xs','--fs-base','--fs-3xl','--lh-base','--lh-deva',
    '--r-sm','--r-lg','--r-full',
    '--elev-1','--elev-2',
    '--dur-fast','--dur-base','--ease',
    '--touch-min'
  ];
  const missing = required.filter(t => !tokens.includes(t + ':'));
  assert.deepStrictEqual(missing, [], 'tokens missing from the design system');
});

test('components use semantic tokens, not raw hex values', () => {
  const ux = fs.readFileSync(path.join(SRC, 'design/learning-ux.css'), 'utf8');
  /* rgba() is allowed for translucent tints of an existing role */
  const hex = ux.match(/:\s*#[0-9a-f]{3,8}/gi) || [];
  assert.deepStrictEqual(hex, [], 'the Phase 2 layer should reference tokens, found raw hex: ' + hex.join(', '));
});

test('the type scale has a 12px floor and the stylesheet enforces it', () => {
  const tokens = fs.readFileSync(path.join(SRC, 'design/tokens.css'), 'utf8');
  assert.match(tokens, /--fs-xs:\s*0\.75rem/, 'the smallest scale step should be 0.75rem (12px)');
  const ux = fs.readFileSync(path.join(SRC, 'design/learning-ux.css'), 'utf8');
  assert.match(ux, /font-size:\s*var\(--fs-xs\)/, 'no rule raises the sub-12px declarations');
});

test('reduced motion is honoured', () => {
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/,
    'students who ask for less motion must get less motion');
});

/* ------------------------------------------------- responsive containment */

test('grid and flex children are allowed to shrink', () => {
  /* This single rule is what fixed 226px of horizontal overflow at 320px.
     Losing it silently reintroduces sideways scrolling on every phone. */
  const rule = css.match(/\.pair\s*>\s*\*[^{]*\{[^}]*min-width:\s*0[^}]*\}/);
  assert.ok(rule, 'the min-width:0 containment rule is missing');
  for (const sel of ['.simgrid > *', '.cards > *', '.pager > *']){
    assert.ok(css.includes(sel), 'containment rule no longer covers ' + sel);
  }
});

test('interactive surfaces cannot dictate page width', () => {
  assert.match(css, /\.vizbox[^{]*\{[^}]*overflow-x:\s*auto/,
    'the simulator stage must scroll inside itself');
  assert.match(css, /html,\s*body\s*\{[^}]*overflow-x:\s*clip/,
    'the page itself must never scroll sideways');
});

test('touch targets clear 44px on touch devices', () => {
  assert.match(css, /@media\s*\(pointer:\s*coarse\)/, 'no touch-specific sizing');
  assert.match(css, /min-height:\s*var\(--touch-min\)/, 'controls do not use the touch floor');
});

test('focus is visible and uses the token colour', () => {
  assert.match(css, /:focus-visible\s*\{[^}]*outline:\s*2px solid var\(--color-focus\)/,
    'keyboard users need a visible, consistent focus ring');
});

/* -------------------------------------------------- heading structure */

test('every page has exactly one h1 and no skipped heading levels', () => {
  for (const f of allPages()){
    const html = fs.readFileSync(f, 'utf8');
    const rel = path.relative(ROOT, f);
    const h1 = (html.match(/<h1[\s>]/g) || []).length;
    assert.strictEqual(h1, 1, rel + ' should have exactly one h1, found ' + h1);

    const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map(m => Number(m[1]));
    const skips = [];
    for (let i = 1; i < levels.length; i++){
      if (levels[i] > levels[i - 1] + 1) skips.push(levels[i - 1] + '->' + levels[i]);
    }
    assert.deepStrictEqual(skips, [], rel + ' skips heading levels: ' + skips.join(', '));
  }
});

test('navigation labels are not headings', () => {
  /* Four <h4> grade labels used to open the document outline ahead of the
     page title, which made heading navigation misleading. */
  for (const f of allPages()){
    const html = fs.readFileSync(f, 'utf8');
    const panel = html.slice(html.indexOf('id="mobilePanel"'), html.indexOf('<div class="wrap">'));
    assert.ok(!/<h[1-6][\s>]/.test(panel),
      path.relative(ROOT, f) + ': the mobile panel contains a heading');
  }
});

/* ------------------------------------------------- learning components */

test('every unit states its objectives and ends with a recap', () => {
  for (const f of UNIT_PAGES){
    const html = fs.readFileSync(f, 'utf8');
    const rel = path.basename(f);
    assert.match(html, /class="outcomes"/,  rel + ': no learning objectives');
    assert.match(html, /class="keypoints"/, rel + ': no summary');
  }
});

test('every unit frames its exam questions as part of the lesson', () => {
  for (const f of UNIT_PAGES){
    const html = fs.readFileSync(f, 'utf8');
    assert.match(html, /class="exam-connect"/,
      path.basename(f) + ': exam questions are not connected to the concept');
    assert.match(html, /SEE exam connection/, path.basename(f) + ': no SEE framing');
  }
});

test('every prediction can actually be answered correctly', () => {
  let found = 0;
  for (const f of UNIT_PAGES.concat([path.join(ROOT, 'design-system.html')])){
    const html = fs.readFileSync(f, 'utf8');
    const blocks = html.split('<div class="predict"').slice(1);
    for (const raw of blocks){
      found++;
      const answer = (raw.slice(0, raw.indexOf('>')).match(/data-answer="([^"]*)"/) || [])[1];
      assert.ok(answer, path.basename(f) + ': prediction has no data-answer');
      const values = [...raw.matchAll(/class="predict-opt"[^>]*data-value="([^"]*)"/g)].map(m => m[1]);
      assert.ok(values.length >= 2, path.basename(f) + ': prediction needs at least two options');
      assert.ok(values.includes(answer),
        path.basename(f) + ': data-answer "' + answer + '" matches none of ' + values.join(','));
      assert.match(raw.slice(0, 4000), /class="predict-feedback"/,
        path.basename(f) + ': prediction has no explanation');
    }
  }
  assert.ok(found >= 3, 'expected prediction blocks to be in use, found ' + found);
});

test('every simulation container is complete', () => {
  let found = 0;
  for (const f of UNIT_PAGES.concat([path.join(ROOT, 'design-system.html')])){
    const html = fs.readFileSync(f, 'utf8');
    for (const raw of html.split('<div class="sim">').slice(1)){
      found++;
      const rel = path.basename(f);
      const block = raw.slice(0, 12000);
      assert.match(block, /class="sim-head"/,     rel + ': simulation has no header');
      assert.match(block, /class="sim-goal"/,     rel + ': simulation does not say what will be learned');
      assert.match(block, /class="sim-controls"/, rel + ': simulation has no labelled controls');
      assert.match(block, /class="sim-why"/,      rel + ': simulation does not explain why');
    }
  }
  assert.ok(found >= 3, 'expected simulation containers, found ' + found);
});

test('the prediction runtime ships and is loaded where predictions exist', () => {
  assert.ok(fs.existsSync(path.join(ROOT, 'assets/js/predict.js')), 'predict.js not published');
  for (const f of allPages()){
    const html = fs.readFileSync(f, 'utf8');
    if (!html.includes('class="predict"')) continue;
    assert.match(html, /assets\/js\/predict\.js/,
      path.relative(ROOT, f) + ' has predictions but does not load predict.js');
  }
});

test('bilingual pairing survives in every unit', () => {
  for (const f of UNIT_PAGES){
    const html = fs.readFileSync(f, 'utf8');
    const en = (html.match(/class="en"/g) || []).length;
    const np = (html.match(/class="np"/g) || []).length;
    assert.ok(en > 0 && np > 0, path.basename(f) + ': lost a language');
    /* every .pair must contain both halves */
    for (const raw of html.split('<div class="pair"').slice(1)){
      const block = raw.slice(0, 6000);
      assert.match(block, /class="en"/, path.basename(f) + ': a pair is missing its English panel');
      assert.match(block, /class="np"/, path.basename(f) + ': a pair is missing its Nepali box');
    }
  }
});

/* ------------------------------------------------- interactive semantics */

test('the answer toggle and simulator console are announced to assistive tech', () => {
  const core = fs.readFileSync(path.join(ROOT, 'assets/js/code.js'), 'utf8');
  assert.match(core, /setAttribute\('aria-expanded'/,
    'the show/hide answer button must expose its state');
  assert.match(core, /setAttribute\('aria-controls'/,
    'the toggle must name the region it controls');
  assert.match(core, /setAttribute\('aria-live',\s*'polite'\)/,
    'simulator output must be announced, or a screen-reader user hears nothing');
  assert.match(core, /setAttribute\('role',\s*'log'\)/,
    'the console is a log region');
});

test('wide content is reachable by keyboard when it scrolls', () => {
  const core = fs.readFileSync(path.join(ROOT, 'assets/js/code.js'), 'utf8');
  assert.match(core, /is-scrollable/, 'no scroll affordance is applied');
  assert.match(core, /setAttribute\('tabindex',\s*'0'\)/,
    'a scrollable region must be focusable so it can be scrolled without a mouse');
});
