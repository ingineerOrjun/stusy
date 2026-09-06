/* The Phase 2.5 motion and visualization contract.

   Timing, reduced motion, sequence control and diagram configuration are
   tested here. Whether an animation *looks* right is judged visually —
   see docs/PHASE-2.5-COMPLETION-REPORT.md — not asserted here. */
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { createEnvironment } = require('./helpers/dom.js');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, '_source');
const MOTION = path.join(SRC, 'runtime/services/motion.js');
const css = fs.readFileSync(path.join(ROOT, 'assets/css/style.css'), 'utf8');
const diagrams = require(path.join(SRC, 'diagrams.js'));

/* Load MotionService with a controlled prefers-reduced-motion answer. */
function loadMotion(reduced){
  delete require.cache[require.resolve(MOTION)];
  globalThis.matchMedia = function(q){
    return { matches: reduced && /prefers-reduced-motion/.test(q), media: q,
             addEventListener(){}, removeEventListener(){} };
  };
  return require(MOTION);
}

/* ------------------------------------------------------------ timing */

test('duration tokens exist in code and CSS, and agree', () => {
  const M = loadMotion(false);
  const tokens = fs.readFileSync(path.join(SRC, 'design/tokens.css'), 'utf8');
  const d = M.durations();
  for (const [name, value] of Object.entries(d)){
    if (name === 'instant') continue;
    const m = tokens.match(new RegExp('--dur-' + name + ':\\s*(\\d+)ms'));
    assert.ok(m, 'CSS has no --dur-' + name);
    assert.strictEqual(Number(m[1]), value,
      '--dur-' + name + ' is ' + m[1] + 'ms in CSS but ' + value + 'ms in MotionService');
  }
});

test('easing tokens cover the documented set', () => {
  const tokens = fs.readFileSync(path.join(SRC, 'design/tokens.css'), 'utf8');
  for (const e of ['--ease-standard','--ease-emphasis','--ease-enter','--ease-exit','--ease-flow']){
    assert.ok(tokens.includes(e + ':'), 'missing easing token ' + e);
  }
  assert.match(tokens, /--ease-flow:\s*linear/,
    'travel of data must be linear — easing it misrepresents constant-rate movement');
  for (const s of ['--stagger-sm','--stagger-md','--stagger-lg']){
    assert.ok(tokens.includes(s + ':'), 'missing stagger token ' + s);
  }
});

test('an unknown duration name fails loudly rather than defaulting', () => {
  const M = loadMotion(false);
  assert.throws(() => M.ms('whenever'), /unknown duration/);
});

/* --------------------------------------------------- reduced motion */

test('reduced motion collapses movement but preserves reading time', () => {
  const on = loadMotion(true);
  assert.strictEqual(on.prefersReduced(), true);
  assert.strictEqual(on.ms('fast'), 0);
  assert.strictEqual(on.ms('base'), 0);
  assert.strictEqual(on.ms('slow'), 0);
  assert.strictEqual(on.ms('deliberate'), 0);
  /* The gap between narrated steps is reading time, not decoration.
     Removing it would destroy the explanation, not the animation. */
  assert.strictEqual(on.ms('step'), 760, 'step pacing must survive reduced motion');
});

test('normal motion returns full durations', () => {
  const off = loadMotion(false);
  assert.strictEqual(off.prefersReduced(), false);
  assert.strictEqual(off.ms('base'), 200);
  assert.strictEqual(off.ms('deliberate'), 520);
});

test('the pulse primitive is a no-op under reduced motion', () => {
  const on = loadMotion(true);
  const classes = [];
  const fake = { classList: { add: c => classes.push(c), remove(){} },
                 getBoundingClientRect: () => ({}) };
  on.pulse(fake);
  assert.deepStrictEqual(classes, [], 'pulse should not animate under reduced motion');
});

test('the step player honours reduced motion', () => {
  const core = fs.readFileSync(path.join(ROOT, 'assets/js/code.js'), 'utf8');
  assert.match(core, /MotionService\.prefersReduced\(\)/,
    'runSteps must ask MotionService — a CSS media query cannot reach a setTimeout');
  assert.match(core, /MotionService\.ms\('step'\)/, 'step pacing must come from the token');
});

/* ------------------------------------------------------- sequences */

test('a sequence plays, pauses, resumes and resets', () => {
  const M = loadMotion(false);
  const seen = [];
  const timers = [];
  const realSetTimeout = globalThis.setTimeout;
  globalThis.setTimeout = fn => { timers.push(fn); return timers.length; };
  globalThis.clearTimeout = () => {};
  try {
    const seq = M.sequence({ steps: [1,2,3], onStep: s => seen.push(s) });
    seq.play();
    assert.deepStrictEqual(seen, [1], 'first step should run immediately');
    timers.shift()();
    assert.deepStrictEqual(seen, [1,2]);
    seq.pause();
    assert.strictEqual(seq.state, 'paused');
    const queued = timers.length;
    seq.resume();
    assert.ok(timers.length >= queued, 'resume should schedule again');
    seq.reset();
    assert.strictEqual(seq.i, 0);
    assert.strictEqual(seq.state, 'idle');
  } finally {
    globalThis.setTimeout = realSetTimeout;
  }
});

test('goTo makes a sequence steppable to any point', () => {
  const M = loadMotion(false);
  const seq = M.sequence({ steps: [1,2,3,4] });
  seq.goTo(3);
  assert.strictEqual(seq.i, 3);
  seq.goTo(99);
  assert.strictEqual(seq.i, 4, 'clamped to the end');
  assert.strictEqual(seq.state, 'done');
  seq.goTo(-5);
  assert.strictEqual(seq.i, 0, 'clamped to the start');
});

/* --------------------------------------------- diagram configuration */

const animated = Object.keys(diagrams).filter(n => typeof diagrams[n] !== 'string');
const staticOnes = Object.keys(diagrams).filter(n => typeof diagrams[n] === 'string');

test('the library is mostly static, by deliberate decision', () => {
  const total = Object.keys(diagrams).length;
  assert.ok(total >= 22, 'the library should only grow, found ' + total);
  assert.ok(staticOnes.length / total >= 0.75,
    'most diagrams should stay static — taxonomies and comparisons revise better as stills; ' +
    'only ' + staticOnes.length + ' of ' + total + ' are static');
  assert.ok(animated.length >= 2, 'expected the high-value diagrams to be animated');
});

test('every animated diagram is fully specified and bilingual', () => {
  for (const name of animated){
    const d = diagrams[name];
    assert.strictEqual(d.type, 'animated', name + ': wrong type');
    assert.ok(d.svg.includes('<svg'), name + ': no svg');
    assert.ok(d.intro && d.intro.en && d.intro.ne, name + ': intro missing a language');
    assert.ok(d.steps.length >= 2, name + ': needs at least two steps');
    d.steps.forEach((s, i) => {
      assert.ok(s.en, name + ' step ' + (i+1) + ': missing English');
      assert.ok(s.ne, name + ' step ' + (i+1) + ': missing Nepali');
    });
  }
});

test('every animated selector exists in its own SVG', () => {
  for (const name of animated){
    const d = diagrams[name];
    const ids = new Set([...d.svg.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]));
    d.steps.forEach((s, i) => {
      const sels = [].concat(s.show || [], s.hide || [], s.focus || [],
                             Object.keys(s.state || {}), Object.keys(s.move || {}));
      sels.forEach(sel => {
        assert.strictEqual(sel.charAt(0), '#', name + ': only id selectors are supported');
        assert.ok(ids.has(sel.slice(1)),
          name + ' step ' + (i+1) + ' targets "' + sel + '" which is not in the SVG');
      });
    });
  }
});

test('DiagramRuntime rejects an incomplete configuration', () => {
  const env = createEnvironment([]);
  const api = env.loadAndGet(['diagram.js'], ['DiagramRuntime']);
  assert.throws(() => api.DiagramRuntime.register('x', {}), /steps must be a non-empty array/);
  assert.throws(() => api.DiagramRuntime.register('x', { steps: [{ ne: 'क' }] }),
    /no English caption/);
  assert.throws(() => api.DiagramRuntime.register('x', { steps: [{ en: 'a' }] }),
    /no Nepali caption/);
  assert.throws(() => api.DiagramRuntime.register('', { steps: [] }), /name required/);
});

/* --------------------------------------------------- shipped output */

test('animated diagrams ship with controls, a caption and the runtime', () => {
  const pages = ['grade10/oop-cpp/unit5.html','grade10/oop-cpp/unit6.html','animation-showcase.html']
    .map(p => path.join(ROOT, p)).filter(fs.existsSync);
  let found = 0;
  for (const f of pages){
    const html = fs.readFileSync(f, 'utf8');
    if (!html.includes('data-dia="')) continue;
    found++;
    const rel = path.basename(f);
    for (const act of ['prev','play','next','reset']){
      assert.ok(html.includes('data-dia-act="' + act + '"'), rel + ': missing ' + act + ' control');
    }
    assert.match(html, /class="dia-cap-en"/, rel + ': no English caption slot');
    assert.match(html, /class="dia-cap-ne np-cell"/, rel + ': no Nepali caption slot');
    assert.match(html, /assets\/js\/diagram\.js/, rel + ': runtime not loaded');
    assert.match(html, /assets\/js\/diagram-data\.js/, rel + ': config not loaded');
    /* order matters — the runtime must define DiagramRuntime first */
    assert.ok(html.indexOf('diagram.js') < html.indexOf('diagram-data.js'),
      rel + ': diagram-data.js must load after diagram.js');
  }
  assert.ok(found >= 2, 'expected animated diagrams on at least two pages, found ' + found);
});

test('static diagrams still ship as plain figures', () => {
  const html = fs.readFileSync(path.join(ROOT, 'grade10/oop-cpp/unit1.html'), 'utf8');
  assert.ok(html.includes('<figure class="fig"'), 'unit1 lost its static figures');
  assert.ok(!html.includes('data-dia="'), 'unit1 should have no animated diagram');
  assert.ok(!html.includes('assets/js/diagram.js'),
    'a page with no animated diagram must not pay for the runtime');
});

/* ------------------------------------------------- motion discipline */

test('nothing animates forever', () => {
  /* Strip comments first: the stylesheet documents why infinite loops are
     avoided, and prose should not fail a check about declarations. */
  const decls = css.replace(/\/\*[\s\S]*?\*\//g, '');
  assert.ok(!/animation-iteration-count:\s*infinite/.test(decls), 'infinite animation found');
  assert.ok(!/\binfinite\b/.test(decls), 'an infinite animation shorthand is present');
  /* every keyframe animation must name a finite duration token */
  const anims = [...decls.matchAll(/animation:\s*([^;]+);/g)].map(m => m[1].trim());
  for (const a of anims){
    if (a === 'none') continue;                     // reduced-motion override
    assert.ok(/var\(--dur-|\d+m?s/.test(a), 'animation with no explicit duration: ' + a);
  }
});

test('no diagram autoplays on load', () => {
  const runtime = fs.readFileSync(path.join(ROOT, 'assets/js/diagram.js'), 'utf8');
  const mountBody = runtime.slice(runtime.indexOf('function mount('), runtime.indexOf('function find('));
  assert.ok(!/\.play\(\)/.test(mountBody),
    'diagrams must start at step 0 and wait for the student, not autoplay');
});

test('a running sequence is parked when it cannot be seen', () => {
  const src = fs.readFileSync(MOTION, 'utf8');
  assert.match(src, /visibilitychange/, 'must stop when the tab is hidden');
  assert.match(src, /IntersectionObserver/, 'must stop when scrolled out of view');
});

test('the state language is shared, not per-feature', () => {
  for (const c of ['.is-active','.is-selected','.is-success','.is-error','.is-disabled']){
    assert.ok(css.includes(c), 'missing shared state class ' + c);
  }
  assert.match(css, /svg \.is-success/, 'state classes must work inside SVG too');
});

test('the executing code line transitions rather than snapping', () => {
  assert.match(css, /\.code \.ln\{[^}]*transition:[^}]*background-color/,
    'the most-repeated state change in the product must be transitioned');
});

/* --------------------------------------------- diagram presentation

   Two CSS-specificity traps produced every label collision in the
   library: a presentation attribute always loses to a class declaration.
   These guard both, because the failure is silent — the diagram simply
   renders wrong and nothing reports it. */

test('no diagram sets font-size as an attribute', () => {
  for (const [name, d] of Object.entries(diagrams)){
    const svg = typeof d === 'string' ? d : d.svg;
    const bad = (svg.match(/font-size="\d+"/g) || []);
    assert.deepStrictEqual(bad, [],
      name + ': font-size attributes are overridden by .f-val/.f-lbl — use style="font-size:Npx"');
  }
});

test('the rule that restores text-anchor exists', () => {
  const motion = fs.readFileSync(path.join(SRC, 'design/motion.css'), 'utf8');
  for (const a of ['start', 'end']){
    assert.ok(motion.includes('svg text[text-anchor="' + a + '"]'),
      'without this rule every text-anchor="' + a + '" label silently centres and spills');
  }
});

test('diagram typography separates machine text from prose', () => {
  assert.match(css, /\.fig svg \.f-val,\s*\.dia-stage svg \.f-val/,
    'f-val must be qualified deeply enough to beat ".fig svg text"');
  assert.match(css, /\.fig svg text,\s*\.dia-stage svg text/,
    'static figures and animated stages must share one typeface rule');
});

test('diagram colours reference tokens, not raw hex', () => {
  const site = fs.readFileSync(path.join(SRC, 'design/site.css'), 'utf8');
  const start = site.indexOf('SVG DIAGRAM BUILDING BLOCKS');
  assert.ok(start > -1, 'diagram building-block section not found in site.css');
  /* the next section marker AFTER the header — "worked example" also appears
     earlier in the file, which would slice backwards into nothing */
  const end = site.indexOf('worked example', start);
  const block = site.slice(start, end > start ? end : site.length);
  for (const cls of ['.f-val', '.f-lbl', '.f-lbl-y', '.f-code', '.f-arr']){
    /* a rule may be written ".f-lbl {" or ".f-lbl-y{" — accept either,
       and require the delimiter so ".f-lbl" does not match ".f-lbl-y" */
    let at = block.indexOf(cls + ' {');
    if (at < 0) at = block.indexOf(cls + '{');
    assert.ok(at > -1, 'missing rule for ' + cls);
    const rule = block.slice(at, block.indexOf('}', at) + 1);
    assert.ok(rule.includes('var(--color-'),
      cls + ' should use a semantic colour token, found: ' + rule.slice(0, 60));
  }
});

/* ---------------------------------------------- diagram colour tokens */

test('no diagram carries a raw hex colour', () => {
  /* Phase 3.1 moved 129 colour references onto the token system. A raw
     hex reintroduced here would sit outside the design system and could
     not follow a palette change. */
  const offenders = [];
  for (const [name, d] of Object.entries(diagrams)){
    const svg = typeof d === 'string' ? d : d.svg;
    const hex = svg.match(/#[0-9a-fA-F]{6}\b/g) || [];
    if (hex.length) offenders.push(name + ': ' + [...new Set(hex)].join(', '));
  }
  assert.deepStrictEqual(offenders, []);
});

test('a diagram colour is declared where it can actually win', () => {
  /* THE BUG THIS GUARDS.

     `fill="var(--color-error)"` is a presentation attribute, specificity
     0. `.f-lbl { fill: ... }` is 0,1,0 and beats it. Measured before the
     fix: 54 colour cues across the library never rendered — labels
     meaning "blocked" and "allowed" both showed as neutral grey, and
     colour is carrying the meaning in those figures.

     Third instance of this trap in the project, after font-size and
     text-anchor. Declaring it in style= is what makes it win. */
  const offenders = [];
  for (const [name, d] of Object.entries(diagrams)){
    const svg = typeof d === 'string' ? d : d.svg;
    for (const m of svg.matchAll(/<(text|circle|rect|path|line|ellipse|polygon)\b([^>]*)>/g)){
      const attrs = m[2];
      /* Only elements that also carry a class can be overridden. */
      if (!/class="/.test(attrs)) continue;
      const bad = attrs.match(/\s(fill|stroke)="(?!none)/);
      if (bad) offenders.push(name + ': <' + m[1] + ' class=' +
        (attrs.match(/class="([^"]*)"/) || [, '?'])[1] + '> sets ' + bad[1] + ' as an attribute');
    }
  }
  assert.deepStrictEqual(offenders, [],
    'a classed element must declare its colour in style=, not as an attribute');
});
