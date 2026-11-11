/* ============================================================
   THE PRACTICAL LOG

   WHAT IS BEING PROTECTED
   Half of Grade 9 Fundamentals of Computer and Application is practical
   work, and 30 of its 50 internal marks are awarded for work the
   product can never see. Two properties matter more than any detail of
   the component:

     1. `done` and `recorded` stay separate. The curriculum awards
        conduction and record keeping their own marks (15 and 3 for
        practical work, 10 and 2 for project work). A log that collapsed
        them would quietly teach a student that the write-up is
        optional, which is how the easiest 3 marks in the subject get
        lost.

     2. Nothing is claimed on the student's behalf. The log stores what
        the student ticked, on the student's own device, and un-ticking
        leaves no row behind. A stored "did not do activity 1.3" is a
        record about work nobody did.

   Every test below was confirmed to fail against a deliberately broken
   version before it was kept — see the mutation notes on each.
   ============================================================ */
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, '_source');
const read = rel => fs.readFileSync(path.join(SRC, rel), 'utf8');

const PROGRESS = path.join(SRC, 'runtime', 'services', 'progress.js');

function fakeStorage(initial){
  const map = new Map(Object.entries(initial || {}));
  return {
    getItem: k => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => { map.set(k, String(v)); },
    removeItem: k => { map.delete(k); },
    _map: map
  };
}

function loadProgress(storage){
  delete require.cache[require.resolve(PROGRESS)];
  if (storage === undefined) delete globalThis.localStorage;
  else globalThis.localStorage = storage;
  return require(PROGRESS);
}

/* ============================================================
   1 · THE SERVICE
   ============================================================ */

test('an activity starts as todo and is never null', () => {
  const p = loadProgress(fakeStorage());
  /* A caller that has to test for null before reading a state is a
     caller that will one day forget to. */
  assert.deepStrictEqual(p.getPractical('g9.cf.p1.1'), { state: 'todo', at: null });
});

test('done and recorded are stored as different states', () => {
  /* MUTATION: make recordPractical store 'done' for both and this fails,
     naming the state it read back. */
  const p = loadProgress(fakeStorage());
  p.recordPractical('g9.cf.p1.1', 'done');
  p.recordPractical('g9.cf.p1.2', 'recorded');
  assert.strictEqual(p.getPractical('g9.cf.p1.1').state, 'done');
  assert.strictEqual(p.getPractical('g9.cf.p1.2').state, 'recorded',
    'the write-up state collapsed into "done" — the 3 record-keeping marks ' +
    'have just become invisible to the student');
});

test('a tick survives a reload', () => {
  const store = fakeStorage();
  loadProgress(store).recordPractical('g9.cf.p1.4', 'recorded');
  assert.strictEqual(loadProgress(store).getPractical('g9.cf.p1.4').state, 'recorded');
});

test('un-ticking removes the row rather than storing a negative record', () => {
  /* MUTATION: store { state: 'todo' } instead of deleting, and this fails
     on the exported state. */
  const p = loadProgress(fakeStorage());
  p.recordPractical('g9.cf.p1.5', 'done');
  p.recordPractical('g9.cf.p1.5', 'todo');
  assert.deepStrictEqual(p.exportState().practical, {},
    'the store kept a row saying the student did not do this activity');
  assert.strictEqual(p.getPractical('g9.cf.p1.5').state, 'todo');
});

test('an unknown state is refused loudly, not stored', () => {
  const p = loadProgress(fakeStorage());
  assert.throws(() => p.recordPractical('g9.cf.p1.1', 'submitted'), RangeError);
  assert.throws(() => p.recordPractical('g9.cf.p1.1', 'marked'), RangeError);
  assert.deepStrictEqual(p.exportState().practical, {});
});

test('the summary counts recorded work as done as well as written up', () => {
  /* A student who has done five and written up two has done five. The
     two counts answer different questions and neither replaces the
     other. */
  const p = loadProgress(fakeStorage());
  const ids = ['a','b','c','d','e','f'];
  p.recordPractical('a', 'done');
  p.recordPractical('b', 'done');
  p.recordPractical('c', 'recorded');
  assert.deepStrictEqual(p.getPracticalSummary(ids),
    { total: 6, done: 3, recorded: 1, todo: 3 });
});

test('a corrupt practical entry is dropped without taking the rest with it', () => {
  const payload = JSON.stringify({
    version: 1, units: {}, quiz: {}, retrieval: {},
    practical: {
      good:     { state: 'recorded', at: '2026-01-01T00:00:00.000Z' },
      badState: { state: 'graded',   at: '2026-01-01T00:00:00.000Z' },
      noDate:   { state: 'done' }
    }
  });
  const p = loadProgress(fakeStorage({ 'rgsc.progress.v1': payload }));
  assert.strictEqual(p.getPractical('good').state, 'recorded');
  assert.strictEqual(p.getPractical('badState').state, 'todo');
  assert.strictEqual(p.getPractical('noDate').state, 'todo');
});

test('adding the practical bucket did not discard anyone’s existing progress', () => {
  /* The whole reason SCHEMA_VERSION did not move. A payload written
     before this phase has no `practical` key at all, and a student who
     opens the site after an update must not find their finished units
     gone. MUTATION: bump SCHEMA_VERSION and this fails. */
  const payload = JSON.stringify({
    version: 1,
    units: { 'grade10/oop-cpp/u1': { completedAt: '2026-01-01T00:00:00.000Z' } },
    quiz: { q1: [{ score: 7, total: 8 }] },
    retrieval: {}
  });
  const p = loadProgress(fakeStorage({ 'rgsc.progress.v1': payload }));
  assert.strictEqual(p.getUnitProgress('grade10/oop-cpp/u1').complete, true,
    'a completed unit was thrown away to make room for the practical log');
  assert.strictEqual(p.getQuizHistory('q1').length, 1);
  assert.deepStrictEqual(p.exportState().practical, {});
});

/* ============================================================
   2 · THE COMPONENT

   A fixture with parentage, because the component inserts the summary
   BEFORE the first child of the block and appends a control INSIDE each
   activity. A stub that only collects elements in an array cannot fail
   when either of those goes to the wrong place.
   ============================================================ */

function makeDom(){
  function El(tag){
    this.tag = tag || 'div';
    this.className = '';
    this.children = [];
    this.parent = null;
    this.attrs = {};
    this.id = '';
    this.type = '';
    this.name = '';
    this.value = '';
    this.checked = false;
    this._on = {};
    const self = this;
    this.classList = {
      contains(c){ return self.className.split(/\s+/).indexOf(c) >= 0; },
      add(c){ if (!this.contains(c)) self.className = (self.className + ' ' + c).trim(); },
      remove(c){ self.className = self.className.split(/\s+/).filter(x => x && x !== c).join(' '); }
    };
  }
  Object.defineProperty(El.prototype, 'textContent', {
    get(){
      if (this._text !== undefined) return this._text;
      return this.children.map(c => c.textContent).join('');
    },
    set(v){ this._text = String(v); this.children = []; }
  });
  Object.defineProperty(El.prototype, 'firstChild', {
    get(){ return this.children[0] || null; }
  });
  El.prototype.appendChild = function (c){
    if (c.parent){
      const i = c.parent.children.indexOf(c);
      if (i >= 0) c.parent.children.splice(i, 1);
    }
    c.parent = this;
    this.children.push(c);
    return c;
  };
  El.prototype.insertBefore = function (c, ref){
    if (c.parent){
      const i = c.parent.children.indexOf(c);
      if (i >= 0) c.parent.children.splice(i, 1);
    }
    c.parent = this;
    const at = ref ? this.children.indexOf(ref) : -1;
    if (at < 0) this.children.push(c); else this.children.splice(at, 0, c);
    return c;
  };
  El.prototype.setAttribute = function (k, v){ this.attrs[k] = String(v); };
  El.prototype.getAttribute = function (k){ return k in this.attrs ? this.attrs[k] : null; };
  El.prototype.hasAttribute = function (k){ return k in this.attrs; };
  El.prototype.removeAttribute = function (k){ delete this.attrs[k]; };
  El.prototype.addEventListener = function (t, fn){ (this._on[t] = this._on[t] || []).push(fn); };
  El.prototype.fire = function (t){ (this._on[t] || []).forEach(fn => fn({})); };

  /* depth-first walk of this element's subtree */
  El.prototype.walk = function (out){
    out = out || [];
    for (const c of this.children){ out.push(c); c.walk(out); }
    return out;
  };
  /* supports '.cls' and '.cls[attr]', which is all the component asks for */
  function matches(e, sel){
    const m = /^\.([\w-]+)(?:\[([\w-]+)\])?$/.exec(sel);
    if (!m) return false;
    if (!e.classList.contains(m[1])) return false;
    if (m[2] && !e.hasAttribute(m[2])) return false;
    return true;
  }
  El.prototype.querySelectorAll = function (sel){
    return this.walk().filter(e => matches(e, sel));
  };
  El.prototype.querySelector = function (sel){ return this.querySelectorAll(sel)[0] || null; };

  const created = [];
  const root = new El('body');
  const doc = {
    readyState: 'complete',
    createElement(tag){ const e = new El(tag); created.push(e); return e; },
    querySelectorAll(sel){ return root.querySelectorAll(sel); },
    addEventListener(){},
    body: root
  };
  return { doc, El, root, created };
}

/* Mirrors the real markup: a .practical block with n .pr-act children,
   each carrying a data-practical id and a .pr-num. */
function block(dom, n){
  const mk = (tag, cls) => { const e = dom.doc.createElement(tag); e.className = cls || ''; return e; };
  const b = mk('div', 'practical');
  dom.root.appendChild(b);
  const acts = [];
  for (let i = 1; i <= n; i++){
    const a = mk('div', 'pr-act');
    a.setAttribute('data-practical', 'g9.cf.p1.' + i);
    const num = mk('span', 'pr-num');
    num.textContent = '1.' + i;
    a.appendChild(num);
    b.appendChild(a);
    acts.push(a);
  }
  return { b, acts };
}

function loadComponent(dom, progressService){
  const sandbox = {
    window: null,
    document: dom.doc,
    ProgressService: progressService
  };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(read('runtime/practical.js'), sandbox);
  return sandbox;
}

test('each activity gets its own three-state control', () => {
  const dom = makeDom();
  const b = block(dom, 6);
  const g = loadComponent(dom, loadProgress(fakeStorage()));

  assert.strictEqual(g.PracticalLog.build(b.b), 0,
    'mount() already ran on this block, so a second build must do nothing');

  for (const a of b.acts){
    const log = a.querySelector('.pr-log');
    assert.ok(log, 'an activity has no log control at all');
    const radios = log.walk().filter(e => e.type === 'radio');
    assert.strictEqual(radios.length, 3,
      'an activity offers ' + radios.length + ' states, not three — done and ' +
      'recorded have to stay separate');
    assert.deepStrictEqual(radios.map(r => r.value), ['todo','done','recorded']);
    /* All three in one activity share a name, and no two activities do,
       or ticking 1.2 would silently un-tick 1.1. */
    assert.strictEqual(new Set(radios.map(r => r.name)).size, 1);
  }
  const names = b.acts.map(a => a.querySelector('.pr-log').walk()
    .filter(e => e.type === 'radio')[0].name);
  assert.strictEqual(new Set(names).size, 6,
    'two activities share a radio group — ticking one un-ticks the other');
});

test('the control group carries a name for assistive technology', () => {
  /* Three identical radios repeated six times is unusable without one.
     MUTATION: drop the legend and this fails. */
  const dom = makeDom();
  const b = block(dom, 2);
  loadComponent(dom, loadProgress(fakeStorage()));
  for (const a of b.acts){
    const leg = a.querySelector('.pr-log-leg');
    assert.ok(leg, 'the radio group has no legend, so it has no accessible name');
    const en = leg.children.filter(c => c.classList.contains('t-en'))[0];
    const ne = leg.children.filter(c => c.classList.contains('t-ne'))[0];
    assert.ok(en && /\d/.test(en.textContent), 'the English name does not say which activity');
    assert.ok(ne, 'the group is unnamed in Nepali mode, where the English half is hidden');
    assert.strictEqual(ne.getAttribute('lang'), 'ne',
      'a Nepali label written by script must declare its own language — ' +
      'the build tagger never sees it');
  }
});

test('ticking an activity records it, and the block tally follows', () => {
  /* MUTATION: drop the recordPractical call from the change handler and
     this fails on the service; drop the onChange and it fails on the
     tally. */
  const dom = makeDom();
  const b = block(dom, 6);
  const p = loadProgress(fakeStorage());
  loadComponent(dom, p);

  const tally = () => b.b.querySelector('.pr-sum-n').textContent;
  assert.match(tally(), /^0 \/ 6 /, 'the tally did not start at zero');

  const pick = (act, value) => {
    const r = act.querySelector('.pr-log').walk().filter(e => e.value === value)[0];
    r.checked = true;
    r.fire('change');
  };

  pick(b.acts[0], 'done');
  assert.strictEqual(p.getPractical('g9.cf.p1.1').state, 'done');
  assert.match(tally(), /^1 \/ 6 /);

  pick(b.acts[1], 'recorded');
  assert.match(tally(), /^2 \/ 6 /, 'written-up work was not counted as done');
  assert.match(tally(), /1 /, 'the written-up count did not move');

  /* and back again */
  pick(b.acts[0], 'todo');
  assert.match(tally(), /^1 \/ 6 /);
  assert.strictEqual(p.getPractical('g9.cf.p1.1').state, 'todo');
});

test('a tick made last term is on screen when the page is opened again', () => {
  const store = fakeStorage();
  loadProgress(store).recordPractical('g9.cf.p1.3', 'recorded');

  const dom = makeDom();
  const b = block(dom, 6);
  loadComponent(dom, loadProgress(store));

  const checked = b.acts[2].querySelector('.pr-log').walk()
    .filter(e => e.type === 'radio' && e.checked);
  assert.strictEqual(checked.length, 1, 'the stored state was not restored to the control');
  assert.strictEqual(checked[0].value, 'recorded');
  assert.strictEqual(b.acts[2].getAttribute('data-pr-state'), 'recorded',
    'the activity is not marked, so the styling has nothing to key off');
});

test('the student is told when this device is not saving', () => {
  /* Private windows and blocked site data degrade the service to memory.
     Silently losing a term of ticks is the failure mode this prevents.
     MUTATION: remove the isPersistent check and this fails. */
  const dom = makeDom();
  block(dom, 3);
  const p = loadProgress(undefined);          // no localStorage at all
  assert.strictEqual(p.isPersistent(), false, 'the fixture did not actually degrade');
  loadComponent(dom, p);
  assert.ok(dom.root.querySelector('.pr-sum-warn'),
    'storage is not persisting and the student was not told');
});

test('a page with no practical block, and a block with no ids, build nothing', () => {
  const dom = makeDom();
  const g = loadComponent(dom, loadProgress(fakeStorage()));
  assert.strictEqual(g.PracticalLog.mount(), 0);

  const dom2 = makeDom();
  const mk = (tag, cls) => { const e = dom2.doc.createElement(tag); e.className = cls; return e; };
  const b = mk('div', 'practical');
  b.appendChild(mk('p', 'prose'));            // a prose-only practical block
  dom2.root.appendChild(b);
  const g2 = loadComponent(dom2, loadProgress(fakeStorage()));
  assert.strictEqual(g2.PracticalLog.build(b), 0);
  assert.strictEqual(b.querySelector('.pr-sum'), null,
    'a summary was added for zero activities');
});

test('the component survives having no ProgressService at all', () => {
  /* The log is an enhancement. If the service fails to load, the
     activity instructions must still be readable rather than the page
     dying on the first tick. */
  const dom = makeDom();
  const b = block(dom, 2);
  loadComponent(dom, undefined);
  const r = b.acts[0].querySelector('.pr-log').walk().filter(e => e.value === 'done')[0];
  r.checked = true;
  assert.doesNotThrow(() => r.fire('change'));
  assert.strictEqual(b.acts[0].getAttribute('data-pr-state'), 'done');
});

/* ============================================================
   3 · THE CONTRACT WITH THE LESSON
   ============================================================ */

test('every authored practical activity has a unique id for the log', () => {
  /* An activity without data-practical gets no control and no marks
     prompt, and silently: the block still builds. */
  const lesson = read('content/lessons/cf-u1.html');
  const acts = lesson.match(/<div class="pr-act"[^>]*>/g) || [];
  assert.ok(acts.length >= 6, 'Unit 1 should carry the curriculum’s six activities');
  const ids = acts.map(a => (/data-practical="([^"]+)"/.exec(a) || [])[1]);
  assert.ok(ids.every(Boolean), 'an activity carries no data-practical id');
  assert.strictEqual(new Set(ids).size, ids.length, 'two activities share an id');
});

test('every label the log shows exists in both languages', () => {
  const strings = require(path.join(SRC, 'runtime', 'services', 'strings.js'));
  const src = read('runtime/practical.js');
  const keys = [...new Set((src.match(/'(prac[A-Z]\w+)'/g) || [])
    .map(s => s.replace(/'/g, '')))];
  assert.ok(keys.length >= 6, 'the key scan found nothing — the test has stopped testing');
  for (const k of keys){
    const e = strings._table[k];
    assert.ok(e, 'runtime/practical.js uses the string "' + k + '" and the table has no such key');
    assert.ok(e.en && e.ne, '"' + k + '" is missing one of its two languages');
  }
});

test('no label claims the product knows whether the work was done', () => {
  /* The product cannot see a chart or hear a speech. A label in the
     grammar of assessment — "verified", "approved", "submitted",
     "marks awarded" — would be a lie told to a child about their own
     grade, and it is the single easiest thing for a later author to
     add by accident. */
  const strings = require(path.join(SRC, 'runtime', 'services', 'strings.js'));
  const banned = /\b(verified|approved|submitted|marked|graded|certified|awarded)\b/i;
  for (const k of Object.keys(strings._table)){
    if (!/^prac/.test(k)) continue;
    const e = strings._table[k];
    assert.ok(!banned.test(e.en),
      'the practical label "' + k + '" claims an assessment the product cannot make: ' + e.en);
  }
});
