/* ============================================================
   STEPPING BACKWARDS AND RESETTING AN ANIMATED DIAGRAM

   WHAT IS BEING PROTECTED, AND THE BUG THAT MADE IT NECESSARY

   Every animated diagram in this product marks its stages as plain
   `<g id="...">` with no class. reset() cleared `.on` only from
   elements carrying an animation class — .dia-step and its relatives —
   so it could never find those groups. _applyStep added `.on`; nothing
   took it off.

   Forward stepping only ever adds, so Next looked perfect and this
   survived from Phase 2 through five subjects. Prev and Reset were
   visually inert on all fifteen animated diagrams: the caption and the
   step counter moved while the picture stayed fully revealed. A student
   stepping back read "POST is running" over a finished boot, and Reset
   handed the next student the answer labelled "step 0".

   WHY NOT tests/helpers/dom.js
   The shared stub returns [] from querySelectorAll and has no class
   list, so every assertion below would pass against a reset() that does
   nothing at all — which is exactly the bug. The fixture here really
   holds classes and really resolves selectors, because that is the
   behaviour under test.

   Each test was confirmed to fail against the pre-fix runtime.
   ============================================================ */
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const SRC = path.join(path.resolve(__dirname, '..'), '_source');
const source = fs.readFileSync(path.join(SRC, 'runtime', 'diagram.js'), 'utf8');

/* ---------------------------------------------- fixture */

function El(tag){
  this.tag = tag;
  this.id = '';
  this.className = '';
  this.attrs = {};
  this._text = '';
  this._on = {};
  const self = this;
  this.classList = {
    contains(c){ return self.className.split(/\s+/).indexOf(c) >= 0; },
    add(c){ if (!this.contains(c)) self.className = (self.className + ' ' + c).trim(); },
    remove(c){ self.className = self.className.split(/\s+/).filter(x => x && x !== c).join(' '); },
    toggle(c, f){ const w = f === undefined ? !this.contains(c) : !!f; if (w) this.add(c); else this.remove(c); return w; }
  };
}
Object.defineProperty(El.prototype, 'textContent', {
  get(){ return this._text; }, set(v){ this._text = String(v); }
});
El.prototype.setAttribute = function (k, v){ this.attrs[k] = String(v); };
El.prototype.getAttribute = function (k){ return k in this.attrs ? this.attrs[k] : null; };
El.prototype.removeAttribute = function (k){ delete this.attrs[k]; };
El.prototype.addEventListener = function (t, fn){ (this._on[t] = this._on[t] || []).push(fn); };

/* Builds a diagram root whose SVG holds plain id groups — no animation
   classes anywhere, exactly like every real diagram in the library. */
function fixture(ids){
  const groups = ids.map(id => { const g = new El('g'); g.id = id; return g; });

  /* Only the selector shapes diagram.js uses: "#id", and a
     comma-separated list of class selectors. */
  function query(sel){
    const out = [];
    for (const raw of String(sel).split(',')){
      const s = raw.trim();
      if (s.charAt(0) === '#') groups.forEach(g => { if (g.id === s.slice(1)) out.push(g); });
      else if (s.charAt(0) === '.') groups.forEach(g => { if (g.classList.contains(s.slice(1))) out.push(g); });
    }
    return out;
  }

  const svg = new El('svg');
  svg.querySelectorAll = query;
  svg.querySelector = s => query(s)[0] || null;

  const capEn = new El('span'), capNe = new El('span'), prog = new El('span');
  const root = new El('div');
  root.querySelector = function (sel){
    if (sel === 'svg') return svg;
    if (sel === '.dia-cap-en') return capEn;
    if (sel === '.dia-cap-ne') return capNe;
    if (sel === '.dia-progress') return prog;
    return null;
  };
  root.querySelectorAll = () => [];

  return { root, svg, groups, capEn, capNe, prog };
}

/* Registers a config, mounts the fixture the way a page does, and hands
   back the live Diagram instance. */
function mountDiagram(name, cfg, ids){
  const fx = fixture(ids);
  fx.root.getAttribute = k => (k === 'data-dia' ? name : null);

  const doc = {
    readyState: 'complete',
    addEventListener(){},
    querySelectorAll(sel){ return sel === '[data-dia]' ? [fx.root] : []; }
  };
  const sandbox = { window: null, document: doc, console: { warn(){} } };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox);

  const RT = sandbox.DiagramRuntime;
  RT.register(name, cfg);
  RT.mount();
  const d = RT.get(name);
  assert.ok(d, 'the runtime did not mount the fixture diagram');
  return { RT, d, fx };
}

const CFG = {
  intro: { en: 'x', ne: 'क' },
  steps: [
    { show: '#s1', focus: '#s1', en: 'one',   ne: 'एक' },
    { show: '#s2', focus: '#s2', en: 'two',   ne: 'दुई' },
    { show: '#s3', focus: '#s3', en: 'three', ne: 'तीन' }
  ]
};

const lit = fx => fx.groups.filter(g => g.classList.contains('on')).length;

/* ---------------------------------------------- behaviour */

test('stepping forward reveals one stage at a time', () => {
  const { d, fx } = mountDiagram('fwd', CFG, ['s1', 's2', 's3']);
  assert.equal(lit(fx), 0, 'a diagram at step 0 already shows something');
  d.applyTo(1); assert.equal(lit(fx), 1);
  d.applyTo(2); assert.equal(lit(fx), 2);
  d.applyTo(3); assert.equal(lit(fx), 3);
});

test('stepping back un-reveals the stage you stepped past', () => {
  /* THE BUG. The counter moved and the picture did not, so the caption
     described one stage while a later one was still on screen. */
  const { d, fx } = mountDiagram('back', CFG, ['s1', 's2', 's3']);
  d.applyTo(3);
  assert.equal(lit(fx), 3);

  d.applyTo(2);
  assert.equal(lit(fx), 2,
    'stepping back left a later stage revealed — the caption and the diagram ' +
    'now disagree, which is worse than either alone');

  d.applyTo(1);
  assert.equal(lit(fx), 1);
});

test('reset returns the picture to the state its counter claims', () => {
  const { d, fx } = mountDiagram('rst', CFG, ['s1', 's2', 's3']);
  d.applyTo(3);
  d.applyTo(0);
  assert.equal(lit(fx), 0,
    'reset reported "step 0" with the diagram fully revealed — the next ' +
    'student to walk up is handed the answer');
  assert.match(fx.prog.textContent, /0\s*\/\s*3/);
});

test('reset clears a transform a move step left behind', () => {
  const cfg = {
    intro: { en: 'x', ne: 'क' },
    steps: [{ move: { '#s1': [10, 20] }, en: 'a', ne: 'क' }]
  };
  const { d, fx } = mountDiagram('mv', cfg, ['s1']);
  d.applyTo(1);
  assert.equal(fx.groups[0].getAttribute('transform'), 'translate(10,20)');
  d.applyTo(0);
  assert.equal(fx.groups[0].getAttribute('transform'), null,
    'the moved element stayed where the step put it after a reset');
});

test('every animated diagram in the library targets ids reset can reach', () => {
  /* The fix collects selectors from the steps. If a future diagram used
     a selector shape the collector does not understand, reset would go
     quiet again for that one diagram only — which is exactly how the
     original bug hid. */
  const diagrams = require(path.join(SRC, 'diagrams.js'));
  const animated = Object.keys(diagrams).filter(n => typeof diagrams[n] !== 'string');
  assert.ok(animated.length >= 15, 'expected the animated diagram set to be non-trivial');

  for (const name of animated){
    for (const [i, s] of diagrams[name].steps.entries()){
      const sels = [].concat(s.show || [], s.hide || [], s.focus || [],
                             Object.keys(s.state || {}), Object.keys(s.move || {}));
      for (const sel of sels){
        assert.ok(String(sel).charAt(0) === '#',
          name + ' step ' + (i + 1) + ' targets "' + sel + '". Only id selectors are ' +
          'collected for reset, so a class selector here would make Prev and Reset ' +
          'silently stop working for this diagram.');
      }
    }
  }
});
