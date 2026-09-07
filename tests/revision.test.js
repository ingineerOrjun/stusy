/* ============================================================
   REVISION INTELLIGENCE — the graph, the rules, and the storage

   WHAT IS BEING PROTECTED
   Not a view. Three claims a student is asked to act on:

     1. the prerequisite graph is navigable — every edge points at a real
        unit, and following edges terminates
     2. the priority and mastery rules are the ones documented, not
        whatever the code drifted into
     3. a damaged or unavailable store degrades to "no history" rather
        than to a broken page

   The rules are deliberately deterministic so they can be tested at all.
   A scoring function nobody can predict is a scoring function nobody can
   test, which is most of why this one is not adaptive.
   ============================================================ */
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, '_source');
const ctx = require(path.join(SRC, 'build', 'context.js'));
const MAP = ctx.learningMap;
const DEVA = /[ऀ-ॿ]/;

/* ---------------------------------------------- the graph */

test('every unit in the map is a real page that was built', () => {
  const ids = Object.keys(MAP);
  assert.ok(ids.length >= 18, 'expected at least 18 units, found ' + ids.length);
  for (const id of ids){
    const u = MAP[id];
    assert.ok(fs.existsSync(path.join(ROOT, u.page)), id + ': page ' + u.page + ' was not built');
    assert.ok(u.title.en && u.title.ne, id + ': a unit needs a title in both languages');
    assert.ok(DEVA.test(u.title.ne), id + ': the Nepali title has no Devanagari');
    assert.strictEqual(id, u.subject + '/u' + u.n, id + ': id does not match subject + unit number');
  }
});

test('every prerequisite points at a unit that exists', () => {
  for (const [id, u] of Object.entries(MAP)){
    for (const r of u.prereqs){
      assert.ok(MAP[r.unit], id + ' requires "' + r.unit + '", which is not a unit');
      assert.notStrictEqual(r.unit, id, id + ' is its own prerequisite');
    }
  }
});

/* A reason is the difference between a link and a diagnosis. A student
   who has just missed a normalisation question needs to be told WHICH
   part of Unit 3 to re-read. */
test('every prerequisite explains itself, in both languages', () => {
  let edges = 0;
  for (const [id, u] of Object.entries(MAP)){
    for (const r of u.prereqs){
      edges++;
      assert.ok(r.why && r.why.en && r.why.ne, id + ' → ' + r.unit + ': no reason');
      assert.ok(DEVA.test(r.why.ne), id + ' → ' + r.unit + ': the Nepali reason has no Devanagari');
      assert.ok(r.why.en.trim().split(/\s+/).length >= 8,
        id + ' → ' + r.unit + ': "' + r.why.en + '" is too short to say which part to re-read');
    }
  }
  assert.ok(edges >= 15, 'expected a connected graph, found only ' + edges + ' edges');
});

/* The failure this guards is not a crash. A cycle renders perfectly and
   walks the student in a circle. */
test('the prerequisite graph has no cycles', () => {
  const WHITE = 0, GREY = 1, BLACK = 2;
  const colour = {};
  for (const id of Object.keys(MAP)) colour[id] = WHITE;
  const stack = [];
  function visit(id){
    colour[id] = GREY;
    stack.push(id);
    for (const r of MAP[id].prereqs){
      if (!MAP[r.unit]) continue;
      assert.notStrictEqual(colour[r.unit], GREY,
        'cycle: ' + stack.slice(stack.indexOf(r.unit)).join(' → ') + ' → ' + r.unit);
      if (colour[r.unit] === WHITE) visit(r.unit);
    }
    stack.pop();
    colour[id] = BLACK;
  }
  for (const id of Object.keys(MAP)) if (colour[id] === WHITE) visit(id);
});

test('every subject has at least one unit needing nothing first', () => {
  const bySubject = {};
  for (const u of Object.values(MAP)) (bySubject[u.subject] = bySubject[u.subject] || []).push(u);
  for (const [subject, units] of Object.entries(bySubject)){
    assert.ok(units.some(u => !u.prereqs.length),
      subject + ': every unit has a prerequisite, so there is nowhere to start');
  }
});

/* The build asserts this too. Duplicated here because the id is the
   storage key for a student's self-grade: a collision silently merges
   two questions' history, and nothing in the UI would show it. */
test('no two retrieval questions share an id', () => {
  const seen = new Map();
  for (const [key, subject] of Object.entries(require(path.join(SRC, 'config', 'pages.js')))){
    for (const p of subject.pages){
      const f = path.join(ROOT, key, p.file);
      if (!fs.existsSync(f)) continue;
      const html = fs.readFileSync(f, 'utf8');
      for (const m of html.matchAll(/<button class="btn-ans" data-answer="([^"]+)"/g)){
        assert.ok(!seen.has(m[1]),
          'id "' + m[1] + '" is used by both ' + seen.get(m[1]) + ' and ' + key + '/' + p.file);
        seen.set(m[1], key + '/' + p.file);
      }
    }
  }
  assert.ok(seen.size >= 60, 'expected 60+ retrieval questions, found ' + seen.size);
});

/* ---------------------------------------------- the rules */

function loadRevision(){
  const src = fs.readFileSync(path.join(ROOT, 'assets', 'js', 'services', 'revision.js'), 'utf8');
  const sandbox = { window: {} };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox);
  return sandbox.window.RevisionService;
}

test('the documented priority rules are the implemented ones', () => {
  const R = loadRevision();
  assert.strictEqual(R.priorityOf(null), 'UNSEEN');
  assert.strictEqual(R.priorityOf({ grade: 'not', attempts: 1 }), 'NEEDS_REVIEW');
  assert.strictEqual(R.priorityOf({ grade: 'not', attempts: 5 }), 'NEEDS_REVIEW',
    'a question still graded wrong is still wrong, however many attempts it took');
  assert.strictEqual(R.priorityOf({ grade: 'partly', attempts: 1 }), 'SHAKY');
  assert.strictEqual(R.priorityOf({ grade: 'got', attempts: 1 }), 'FRESH',
    'right on the first attempt is good, but it is one data point');
  assert.strictEqual(R.priorityOf({ grade: 'got', attempts: 2 }), 'SECURE',
    'right AFTER an earlier miss is the strongest evidence the record can carry');
});

test('the priority order is worst-first and complete', () => {
  const R = loadRevision();
  /* JSON round-trip: the array comes from a vm context, so its prototype
     is a different realm's Array and deepStrictEqual compares prototypes.
     The contract is the contents. */
  assert.deepStrictEqual(JSON.parse(JSON.stringify(R.PRIORITY)),
    ['NEEDS_REVIEW', 'SHAKY', 'FRESH', 'SECURE', 'UNSEEN']);
  for (const p of ['NEEDS_REVIEW', 'SHAKY', 'FRESH', 'SECURE', 'UNSEEN']){
    assert.ok(R.PRIORITY.indexOf(p) >= 0, p + ' is not in the priority order');
  }
});

/* Mastery states, exercised against a controlled record. The service
   reads ProgressService from its own global, so one is supplied. */
function serviceWith(records, map){
  const src = fs.readFileSync(path.join(ROOT, 'assets', 'js', 'services', 'revision.js'), 'utf8');
  const sandbox = {
    window: {},
    ProgressService: {
      getRetrieval(id){ return records[id] || null; }
    }
  };
  sandbox.window.ProgressService = sandbox.ProgressService;
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox);
  const R = sandbox.window.RevisionService;
  R.load(map);
  return R;
}

const TINY = {
  units: {
    's/u1': { id: 's/u1', subject: 's', n: '1', page: 's/unit1.html',
              title: { en: 'One', ne: 'एक' }, marks: 5, prereqs: [] },
    's/u2': { id: 's/u2', subject: 's', n: '2', page: 's/unit2.html',
              title: { en: 'Two', ne: 'दुई' }, marks: 9,
              prereqs: [{ unit: 's/u1', why: { en: 'because', ne: 'किनभने' } }] }
  },
  questions: {
    a: { unit: 's/u1', page: 's/unit1.html' },
    b: { unit: 's/u1', page: 's/unit1.html' },
    c: { unit: 's/u2', page: 's/unit2.html' },
    d: { unit: 's/u2', page: 's/unit2.html' }
  }
};

test('a unit nobody has opened is NEW', () => {
  const R = serviceWith({}, TINY);
  assert.strictEqual(R.unitReport('s/u1').state, 'NEW');
});

test('one wrong answer makes a unit NEEDS_REVIEW, whatever else is right', () => {
  const R = serviceWith({
    a: { grade: 'got', attempts: 1 },
    b: { grade: 'not', attempts: 1 }
  }, TINY);
  const r = R.unitReport('s/u1');
  assert.strictEqual(r.state, 'NEEDS_REVIEW',
    'a unit with an outstanding wrong answer is not "practising"');
  assert.strictEqual(r.counts.NEEDS_REVIEW, 1);
  assert.strictEqual(r.attempted, 2);
});

test('every question attempted and every one right is MASTERED', () => {
  const R = serviceWith({
    a: { grade: 'got', attempts: 1 },
    b: { grade: 'got', attempts: 3 }
  }, TINY);
  assert.strictEqual(R.unitReport('s/u1').state, 'MASTERED');
});

test('a partly-right answer stops a unit being MASTERED', () => {
  const R = serviceWith({
    a: { grade: 'got', attempts: 1 },
    b: { grade: 'partly', attempts: 1 }
  }, TINY);
  assert.strictEqual(R.unitReport('s/u1').state, 'PRACTICING');
});

test('less than half attempted is LEARNING, half or more is PRACTICING', () => {
  const one = serviceWith({ c: { grade: 'got', attempts: 1 } }, TINY);
  assert.strictEqual(one.unitReport('s/u2').state, 'PRACTICING', '1 of 2 is half');
  const bigger = {
    units: TINY.units,
    questions: { c: { unit: 's/u2' }, d: { unit: 's/u2' }, e: { unit: 's/u2' } }
  };
  const third = serviceWith({ c: { grade: 'got', attempts: 1 } }, bigger);
  assert.strictEqual(third.unitReport('s/u2').state, 'LEARNING', '1 of 3 is less than half');
});

/* ---------------------------------------------- the recommendations */

test('nothing wrong is never recommended for revision', () => {
  const R = serviceWith({
    a: { grade: 'got', attempts: 1 }              /* u1 part-done, all correct */
  }, TINY);
  const recs = R.recommendations();
  assert.deepStrictEqual(JSON.parse(JSON.stringify(recs.map(r => r.unit))), [],
    'a unit where every answer so far was right needs finishing, not revising — ' +
    'recommending it would print "0 questions came out only partly right"');
});

test('wrong outranks partly, and marks break the tie', () => {
  const R = serviceWith({
    a: { grade: 'partly', attempts: 1 },          /* u1, 5 marks */
    c: { grade: 'not', attempts: 1 }              /* u2, 9 marks */
  }, TINY);
  const recs = R.recommendations();
  assert.deepStrictEqual(JSON.parse(JSON.stringify(recs.map(r => r.unit))), ['s/u2', 's/u1'],
    'the unit with a wrong answer must come first');
  assert.strictEqual(recs[0].worst, 'NEEDS_REVIEW');
  assert.strictEqual(recs[1].worst, 'SHAKY');
});

test('a recommendation carries the prerequisite that explains it', () => {
  const R = serviceWith({ c: { grade: 'not', attempts: 1 } }, TINY);
  const rec = R.recommendations()[0];
  assert.strictEqual(rec.unit, 's/u2');
  assert.strictEqual(rec.prereqs.length, 1);
  assert.strictEqual(rec.prereqs[0].unit, 's/u1');
  assert.ok(rec.prereqs[0].why.ne, 'the second door needs its reason in both languages');
});

test('a subject report totals its units', () => {
  const R = serviceWith({
    a: { grade: 'got', attempts: 1 },
    c: { grade: 'not', attempts: 1 }
  }, TINY);
  const s = R.subjectReport('s');
  assert.strictEqual(s.total, 4);
  assert.strictEqual(s.attempted, 2);
  assert.strictEqual(s.percentAttempted, 50);
  assert.strictEqual(s.states.NEEDS_REVIEW, 1);
});

/* ---------------------------------------------- degrading gracefully */

test('the service reports honestly when no map was loaded', () => {
  const R = loadRevision();
  assert.strictEqual(R.isLoaded(), false);
  assert.deepStrictEqual(JSON.parse(JSON.stringify(R.units())), []);
  assert.strictEqual(R.unit('anything'), null);
  /* and does not throw */
  assert.deepStrictEqual(JSON.parse(JSON.stringify(R.recommendations())), []);
});

test('a missing ProgressService leaves every question unseen rather than throwing', () => {
  const src = fs.readFileSync(path.join(ROOT, 'assets', 'js', 'services', 'revision.js'), 'utf8');
  const sandbox = { window: {} };            /* no ProgressService at all */
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox);
  const R = sandbox.window.RevisionService;
  R.load(TINY);
  const r = R.unitReport('s/u1');
  assert.strictEqual(r.state, 'NEW');
  assert.strictEqual(r.counts.UNSEEN, 2);
});

test('a ProgressService that throws is survived, not propagated', () => {
  const src = fs.readFileSync(path.join(ROOT, 'assets', 'js', 'services', 'revision.js'), 'utf8');
  const sandbox = {
    window: {},
    ProgressService: { getRetrieval(){ throw new Error('storage is on fire'); } }
  };
  sandbox.window.ProgressService = sandbox.ProgressService;
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox);
  const R = sandbox.window.RevisionService;
  R.load(TINY);
  assert.doesNotThrow(() => R.unitReport('s/u1'),
    'a failing store must cost a student their history, not their page');
  assert.strictEqual(R.unitReport('s/u1').state, 'NEW');
});

/* ---------------------------------------------- storage failure */

function loadProgress(store, opts){
  const src = fs.readFileSync(path.join(ROOT, 'assets', 'js', 'services', 'progress.js'), 'utf8');
  const data = Object.assign({}, store || {});
  const o = opts || {};
  const sandbox = {
    window: {},
    localStorage: {
      getItem: k => (k in data ? data[k] : null),
      setItem: (k, v) => {
        if (o.quotaFull) { const e = new Error('quota'); e.name = 'QuotaExceededError'; throw e; }
        data[k] = String(v);
      },
      removeItem: k => { delete data[k]; }
    }
  };
  sandbox.window.localStorage = sandbox.localStorage;
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox);
  return sandbox.window.ProgressService || sandbox.ProgressService;
}

test('a full quota does not lose the answer the student just gave', () => {
  const p = loadProgress({}, { quotaFull: true });
  assert.doesNotThrow(() => p.recordRetrieval('q1', 'not'));
  assert.strictEqual(p.getRetrieval('q1').grade, 'not',
    'the grade must survive in memory for this session even when it cannot be written');
  assert.strictEqual(p.isPersistent(), false,
    'and the service must admit it is not persisting');
});

test('a store that throws on the very first probe falls back to memory', () => {
  const src = fs.readFileSync(path.join(ROOT, 'assets', 'js', 'services', 'progress.js'), 'utf8');
  const sandbox = {
    window: {},
    localStorage: { setItem(){ throw new Error('blocked'); }, getItem(){ return null; },
                    removeItem(){} }
  };
  sandbox.window.localStorage = sandbox.localStorage;
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox);
  const p = sandbox.window.ProgressService;
  assert.strictEqual(p.isPersistent(), false);
  assert.doesNotThrow(() => p.recordRetrieval('q1', 'got'));
  assert.strictEqual(p.storageInfo().adapter, 'memory');
});

/* ---------------------------------------------- it reaches the pages */

test('every subject has a revision page that loads what it needs', () => {
  const pages = require(path.join(SRC, 'config', 'pages.js'));
  for (const [key, subject] of Object.entries(pages)){
    const rev = subject.pages.find(p => p.file === 'revise.html');
    assert.ok(rev, key + ': no revision page, so the record is collected and never shown');
    const html = fs.readFileSync(path.join(ROOT, key, 'revise.html'), 'utf8');
    for (const need of ['services/progress.js', 'services/revision.js',
                        'learning-map.js', 'revise.js']){
      assert.ok(html.indexOf('assets/js/' + need) >= 0, key + '/revise.html: does not load ' + need);
    }
    /* order matters: the map calls RevisionService.load() */
    assert.ok(html.indexOf('services/revision.js') < html.indexOf('learning-map.js'),
      key + '/revise.html: the map is loaded before the service that receives it');
    assert.ok(html.indexOf('data-subject="' + key + '"') >= 0,
      key + '/revise.html: does not say which subject it is for');
  }
});

/* The bug this guards rendered a perfect page with every panel blank in
   Nepali mode: the build's English-pairing pass swept the empty
   container into a <div class="t-en">, which Nepali mode hides. */
/* Counting <div class="t-en"> against </div> does NOT work: every other
   div closes too, so the counts balance and the test passes whatever the
   nesting is. The first version of this did exactly that and did not
   fail when the bug was reintroduced — a test that cannot fail is worse
   than no test, because it is also a claim that the thing is covered.
   The ancestors have to actually be walked. */
function ancestorsOf(html, needle){
  const at = html.indexOf(needle);
  if (at < 0) return null;
  const stack = [];
  const tag = /<(\/?)([a-zA-Z][\w-]*)((?:"[^"]*"|'[^']*'|[^>])*?)(\/?)>/g;
  const VOID = new Set(['area','base','br','col','embed','hr','img','input',
                        'link','meta','param','source','track','wbr']);
  let m;
  while ((m = tag.exec(html)) && m.index < at){
    const [, closing, rawTag, attrs, self] = m;
    const name = rawTag.toLowerCase();
    if (closing){
      for (let i = stack.length - 1; i >= 0; i--){
        if (stack[i].tag === name){ stack.length = i; break; }
      }
      continue;
    }
    if (VOID.has(name) || self) continue;
    const cls = /\bclass\s*=\s*"([^"]*)"/i.exec(attrs || '');
    stack.push({ tag: name, cls: cls ? cls[1] : '' });
  }
  return stack;
}

test('the revision container is not swept into an English-only wrapper', () => {
  const pages = require(path.join(SRC, 'config', 'pages.js'));
  for (const key of Object.keys(pages)){
    const html = fs.readFileSync(path.join(ROOT, key, 'revise.html'), 'utf8');
    const chain = ancestorsOf(html, 'id="reviseBox"');
    assert.ok(chain, key + ': no revision container');
    const wrapper = chain.find(a => a.cls.split(/\s+/).indexOf('t-en') >= 0);
    assert.ok(!wrapper,
      key + '/revise.html: the revision container sits inside <' + (wrapper || {}).tag +
      ' class="' + (wrapper || {}).cls + '">, which Nepali mode hides — the page would ' +
      'render perfectly with every panel blank');
  }
});

/* The same check is worth having for the interactive components, which
   are also empty at build time and equally sweepable. */
test('no runtime-filled container is inside an English-only wrapper', () => {
  const pages = require(path.join(SRC, 'config', 'pages.js'));
  const MOUNTS = ['id="reviseBox"', 'id="quizBox"', 'class="guided"',
                  'class="sqllab"', 'class="drill"', 'class="kmap"'];
  for (const [key, subject] of Object.entries(pages)){
    for (const p of subject.pages){
      const f = path.join(ROOT, key, p.file);
      if (!fs.existsSync(f)) continue;
      const html = fs.readFileSync(f, 'utf8');
      for (const needle of MOUNTS){
        if (html.indexOf(needle) < 0) continue;
        const chain = ancestorsOf(html, needle);
        const wrapper = chain.find(a => a.cls.split(/\s+/).indexOf('t-en') >= 0);
        assert.ok(!wrapper, key + '/' + p.file + ': ' + needle +
          ' is inside <div class="t-en">, so Nepali mode hides it');
      }
    }
  }
});
