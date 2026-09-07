/* ============================================================
   THE WORKED-EXAMPLE THINK GATE

   WHAT IS BEING PROTECTED
   A pedagogical property, not a component: in a gated worked example
   the student must not be able to reach the working without an act of
   commitment, and the working must be gone from the ACCESSIBILITY TREE
   while it is gated, not merely painted over.

   That second half is the part most likely to rot. `display:none` on a
   class, `opacity:0`, `visibility:hidden`, `height:0` — every one of
   them looks identical in a screenshot and three of them leave the
   answer sitting in the tree for a screen-reader user to read straight
   out. A student using Narrator would be handed the answer the sighted
   student next to them cannot see, and no visual check would ever
   catch it.

   WHY A REAL FIXTURE AND NOT tests/helpers/dom.js
   The shared stub returns [] from querySelectorAll and has no notion of
   parentage, so every assertion below would pass against a component
   that does nothing at all. The fixture here is small but it MOVES
   nodes, which is the behaviour under test: the gate works by
   relocating everything after the marker into a hidden container, and
   a stub that only pushes to an array cannot fail when that breaks.
   Each test below was confirmed to fail against a deliberately broken
   component before being kept.
   ============================================================ */
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, '_source');
const read = rel => fs.readFileSync(path.join(SRC, rel), 'utf8');

/* ---------------------------------------------- a fixture with parentage */

function makeDom(){
  function El(tag){
    this.tag = tag || 'div';
    this.className = '';
    this.children = [];
    this.parent = null;
    this.attrs = {};
    this.hidden = false;
    this.id = '';
    this.rows = 0;
    this._html = '';
    this._on = {};
    const self = this;
    this.classList = {
      contains(c){ return self.className.split(/\s+/).indexOf(c) >= 0; },
      add(c){ if (!this.contains(c)) self.className = (self.className + ' ' + c).trim(); },
      remove(c){ self.className = self.className.split(/\s+/).filter(x => x && x !== c).join(' '); },
      toggle(c, force){
        const want = force === undefined ? !this.contains(c) : !!force;
        if (want) this.add(c); else this.remove(c);
        return want;
      }
    };
  }
  Object.defineProperty(El.prototype, 'innerHTML', {
    get(){ return this._html; }, set(v){ this._html = String(v); }
  });
  Object.defineProperty(El.prototype, 'textContent', {
    get(){ return this._text || ''; }, set(v){ this._text = String(v); }
  });
  /* the whole point of the fixture: appending REMOVES from the old parent */
  El.prototype.appendChild = function (c){
    if (c.parent){
      const i = c.parent.children.indexOf(c);
      if (i >= 0) c.parent.children.splice(i, 1);
    }
    c.parent = this;
    this.children.push(c);
    return c;
  };
  El.prototype.setAttribute = function (k, v){ this.attrs[k] = String(v); };
  El.prototype.getAttribute = function (k){ return k in this.attrs ? this.attrs[k] : null; };
  El.prototype.addEventListener = function (t, fn){ (this._on[t] = this._on[t] || []).push(fn); };
  El.prototype.click = function (){ (this._on.click || []).forEach(fn => fn({})); };

  const all = [];
  const doc = {
    readyState: 'complete',
    createElement(tag){ const e = new El(tag); all.push(e); return e; },
    querySelectorAll(sel){
      const cls = sel.replace('.', '');
      return all.filter(e => e.classList.contains(cls));
    },
    getElementById(){ return null; },
    addEventListener(){},
    body: new El('body')
  };
  return { doc, El, all };
}

/* Builds one worked example: header, question, gate, then `nWork`
   elements of working. Mirrors the real markup's shape. */
function example(dom, opts){
  opts = opts || {};
  const mk = cls => { const e = dom.doc.createElement('div'); e.className = cls; return e; };
  const wex = mk('wex');
  const head = mk('wex-h');
  const q = mk('wex-q');
  wex.appendChild(head);
  wex.appendChild(q);

  let gate = null;
  if (opts.gate !== false){
    gate = mk('wex-gate');
    wex.appendChild(gate);
  }
  const work = [];
  const n = opts.work === undefined ? 3 : opts.work;
  for (let i = 0; i < n; i++){
    const w = mk('wex-step');
    w.textContent = 'step ' + i;
    work.push(w);
    wex.appendChild(w);
  }
  return { wex, head, q, gate, work };
}

function load(dom){
  const sandbox = { window: null, document: dom.doc };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(read('runtime/wexthink.js'), sandbox);
  return sandbox;
}

/* ---------------------------------------------- behaviour */

test('the working is moved out of reach and the question is not', () => {
  const dom = makeDom();
  const g = load(dom);
  const ex = example(dom, { work: 3 });

  assert.equal(g.WexThink.build(ex.wex), true, 'the gate refused to build on valid markup');

  /* everything before the marker stays exactly where the author put it */
  assert.ok(ex.wex.children.indexOf(ex.head) >= 0, 'the header was swept into the gate');
  assert.ok(ex.wex.children.indexOf(ex.q) >= 0,
    'the question was hidden too — the student would be asked to think about a ' +
    'question they can no longer read');

  /* everything after it is gone from the example's own child list */
  for (const w of ex.work){
    assert.equal(ex.wex.children.indexOf(w), -1,
      'a step of the working is still a direct child of the example, so it is still on screen');
  }

  const box = ex.wex.children.filter(c => c.classList.contains('wex-work'))[0];
  assert.ok(box, 'no .wex-work container was created');
  assert.equal(box.children.length, 3, 'the working lost steps on the way into the box — ' +
    'this is what happens when the child list is mutated while it is being read');
  assert.deepEqual(box.children.map(c => c.textContent), ['step 0', 'step 1', 'step 2'],
    'the working came back in the wrong order');
});

test('the working starts out of the accessibility tree, not merely invisible', () => {
  const dom = makeDom();
  const g = load(dom);
  const ex = example(dom, { work: 2 });
  g.WexThink.build(ex.wex);

  const box = ex.wex.children.filter(c => c.classList.contains('wex-work'))[0];
  assert.equal(box.hidden, true,
    'the working is not `hidden`. A CSS-only hide leaves the answer in the accessibility ' +
    'tree, so a screen-reader user is read the solution the sighted student cannot see.');
});

test('the gate opens and closes, and says which state it is in', () => {
  const dom = makeDom();
  const g = load(dom);
  const ex = example(dom, { work: 2 });
  g.WexThink.build(ex.wex);

  const box = ex.wex.children.filter(c => c.classList.contains('wex-work'))[0];
  const btn = ex.gate.children.filter(c => c.classList.contains('wex-reveal'))[0];
  assert.ok(btn, 'no reveal control was added to the gate');
  assert.equal(btn.getAttribute('aria-controls'), box.id,
    'the control does not point at what it controls');
  assert.equal(btn.getAttribute('aria-expanded'), 'false',
    'the control claims to be expanded while the working is hidden');

  btn.click();
  assert.equal(box.hidden, false, 'pressing the control did not reveal the working');
  assert.equal(btn.getAttribute('aria-expanded'), 'true',
    'the control still reports collapsed after opening — a screen-reader user is told ' +
    'nothing happened');

  btn.click();
  assert.equal(box.hidden, true, 'the working cannot be hidden again');
  assert.equal(btn.getAttribute('aria-expanded'), 'false');
});

test('a scratch space is offered, and its label is tied to it', () => {
  const dom = makeDom();
  const g = load(dom);
  const ex = example(dom, { work: 2 });
  g.WexThink.build(ex.wex);

  const attempt = ex.gate.children.filter(c => c.classList.contains('rt-attempt'))[0];
  assert.ok(attempt, 'no scratch space — "I thought about it" is a claim, not an act');
  const label = attempt.children[0], ta = attempt.children[1];
  assert.equal(label.getAttribute('for'), ta.id,
    'the label is not associated with the textarea, so the control is unnamed');
  assert.ok(/[ऀ-ॿ]/.test(label.innerHTML), 'the scratch label has no Nepali');
});

/* ---------------------------------------------- the refusals */

test('an example with no gate is left completely alone', () => {
  const dom = makeDom();
  const g = load(dom);
  const ex = example(dom, { gate: false, work: 3 });
  const before = ex.wex.children.slice();

  assert.equal(g.WexThink.build(ex.wex), false,
    'a worked example with no gate was gated anyway — 24 of the 50 examples are ' +
    'first demonstrations of notation and must stay open');
  assert.deepEqual(ex.wex.children, before, 'an ungated example was modified');
});

test('a gate with nothing after it builds nothing', () => {
  const dom = makeDom();
  const g = load(dom);
  const ex = example(dom, { work: 0 });
  assert.equal(g.WexThink.build(ex.wex), false,
    'a gate at the very end of an example was accepted. The student would be asked to ' +
    'commit, press the button, and be shown empty space.');
  assert.equal(ex.wex.children.filter(c => c.classList.contains('wex-work')).length, 0);
});

test('mount() is idempotent — a second pass does not re-gate', () => {
  const dom = makeDom();
  const g = load(dom);
  const ex = example(dom, { work: 2 });
  assert.equal(g.WexThink.mount(), 1, 'mount did not find the one gated example');
  assert.equal(g.WexThink.mount(), 0,
    'mount gated the same example twice, which nests the working inside a second ' +
    'hidden box and makes it unreachable even after the student opens the gate');
});

/* ---------------------------------------------- the build contract */

test('the build refuses a gate whose prompt has no Nepali', () => {
  const validate = read('build/validate.js');
  assert.match(validate, /wex-gate/,
    'validate.js no longer checks think gates at all');
  assert.match(validate, /think gate prompt has no Nepali/,
    'the Nepali rule for gate prompts is gone. An English-only prompt gates only half ' +
    'the students the product was built for.');
});

test('every string the gate shows exists in both languages', () => {
  const strings = read('runtime/services/strings.js');
  for (const key of ['showWorking', 'hideWorking', 'thinkAttempt']){
    assert.match(strings, new RegExp(key + '\\s*:\\s*\\{[^}]*ne\\s*:'),
      'UIStrings.' + key + ' has no Nepali');
  }
});

/* ---------------------------------------------- the content itself */

test('the examples that promise a prediction actually gate one', () => {
  /* Both of these say "predict" in their own wording. Before this
     component they showed the answer immediately below the instruction,
     which is worse than not asking at all. */
  const dir = path.join(SRC, 'content', 'lessons');
  const cases = [
    ['u5.html',    'Proving the order'],
    ['db-u3.html', 'Labelling a table with the right term']
  ];
  for (const [file, title] of cases){
    const html = fs.readFileSync(path.join(dir, file), 'utf8');
    const at = html.indexOf(title);
    assert.ok(at > 0, file + ' no longer contains the example titled "' + title + '"');
    const rest = html.slice(at, html.indexOf('</div>', html.indexOf('wex-note', at)));
    assert.ok(rest.indexOf('wex-gate') > 0,
      file + ': "' + title + '" tells the student to predict and then shows them the ' +
      'answer with nothing in between. That is the defect this component exists to fix.');
  }
});

test('gating is selective, and stays selective', () => {
  const dir = path.join(SRC, 'content', 'lessons');
  let total = 0, gated = 0;
  for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.html'))){
    const html = fs.readFileSync(path.join(dir, f), 'utf8');
    total += (html.match(/<div class="wex">/g) || []).length;
    gated += (html.match(/<div class="wex-gate">/g) || []).length;
  }
  assert.ok(gated > 0, 'no worked example gates anything — the measured starting state');
  assert.ok(gated < total,
    'every single worked example is now gated. Some examples demonstrate notation for ' +
    'the first time; a student cannot predict a form they have never seen, and hiding ' +
    'it just adds a click. ' + gated + '/' + total);
});
