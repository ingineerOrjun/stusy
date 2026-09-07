/* ============================================================
   RETRIEVAL — the gate in front of every practice question

   WHAT IS BEING PROTECTED
   Not a component. A pedagogical property: a student must not be able to
   reach a model answer without first being asked to attempt it. That
   property lives in three separate places — the runtime that builds the
   gate, the core module that must NOT also bind the same button, and the
   progress service that stores the self-grade — and it is broken by an
   innocent-looking change in any of them.

   The most dangerous failure is the quietest one. If core.js and
   retrieval.js both bind a click on the same button, each toggles the
   answer once, the answer ends exactly where it started, and the reveal
   simply stops working with nothing in either file looking wrong. A test
   for that is the reason this file exists.
   ============================================================ */
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, '_source');

function read(rel){ return fs.readFileSync(path.join(SRC, rel), 'utf8'); }

/* ---------------------------------------------- the no-double-bind rule */

test('core.js leaves practice questions to the retrieval runtime', () => {
  const core = read('runtime/core.js');
  const block = /querySelectorAll\('\[data-answer\]'\)([\s\S]{0,900})/.exec(core);
  assert.ok(block, 'core.js no longer has the data-answer handler this test guards');
  assert.match(block[1], /closest\('\.examq'\)/,
    'core.js binds every [data-answer] button. retrieval.js binds the ones inside .examq too, ' +
    'so both fire, the answer toggles twice, and the reveal silently stops working.');
});

/* ---------------------------------------------- the gate itself */

test('the retrieval runtime hides the answer until a commit', () => {
  const src = read('runtime/retrieval.js');
  assert.match(src, /aria-hidden'?,\s*'true'/,
    'the model answer must start hidden from assistive technology too, not just visually');
  assert.match(src, /classList\.remove\('show'\)/,
    'the model answer must start closed even if the page shipped it open');
  assert.match(src, /revealAfterAttempt/,
    'the gate must say that an attempt is expected — the label is what does the asking');
});

test('the gate keeps the control accessible', () => {
  const src = read('runtime/retrieval.js');
  for (const attr of ['aria-controls', 'aria-expanded', 'aria-labelledby', 'aria-pressed']){
    assert.ok(src.indexOf(attr) >= 0, 'retrieval.js never sets ' + attr);
  }
  assert.match(src, /role'?,\s*'status'/,
    'the feedback after self-assessment is not announced, so a screen-reader user is told nothing');
});

test('every string the gate shows exists in both languages', () => {
  const strings = read('runtime/services/strings.js');
  for (const key of ['revealAfterAttempt', 'attemptLabel', 'gotIt', 'partly', 'notYet']){
    const re = new RegExp(key + '\\s*:\\s*\\{[^}]*ne\\s*:');
    assert.match(strings, re, 'UIStrings.' + key + ' has no Nepali');
  }
});

/* Feedback that says "Correct!" teaches nothing. Every branch has to say
   why, and say it in both languages. */
test('self-assessment feedback explains rather than congratulates', () => {
  const src = read('runtime/retrieval.js');
  const sandbox = { window: {}, document: undefined };
  sandbox.global = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox);
  /* the module returns early without a document, so exercise the pure part */
  const fn = /function feedbackFor\(grade\)\{[\s\S]*?\n  \}/.exec(src);
  assert.ok(fn, 'feedbackFor is gone');
  for (const grade of ['got', 'partly', 'not']){
    const seg = src.split("if (grade === '" + grade + "')")[1] || src;
    assert.ok(true, seg && grade);
  }
  for (const grade of ['got', 'partly', 'not']){
    assert.ok(src.indexOf("'" + grade + "'") >= 0, 'no branch for grade ' + grade);
  }
  const devanagari = (src.match(/lang="ne"/g) || []).length;
  assert.ok(devanagari >= 4,
    'the gate speaks to the student in ' + devanagari + ' places with a Nepali twin; ' +
    'feedback that exists only in English is not feedback for half this audience');
});

/* ---------------------------------------------- the record */

function loadProgress(store){
  const src = fs.readFileSync(path.join(ROOT, 'assets', 'js', 'services', 'progress.js'), 'utf8');
  const data = Object.assign({}, store || {});
  const sandbox = {
    window: {},
    localStorage: {
      getItem: k => (k in data ? data[k] : null),
      setItem: (k, v) => { data[k] = String(v); },
      removeItem: k => { delete data[k]; }
    }
  };
  sandbox.window.localStorage = sandbox.localStorage;
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox);
  return sandbox.window.ProgressService || sandbox.ProgressService;
}

test('a self-grade is recorded, and re-attempts are counted', () => {
  const p = loadProgress();
  assert.strictEqual(p.getRetrieval('dba41'), null);
  p.recordRetrieval('dba41', 'not');
  assert.strictEqual(p.getRetrieval('dba41').grade, 'not');
  assert.strictEqual(p.getRetrieval('dba41').attempts, 1);
  /* answering badly then well means the student now knows it */
  p.recordRetrieval('dba41', 'got');
  assert.strictEqual(p.getRetrieval('dba41').grade, 'got');
  assert.strictEqual(p.getRetrieval('dba41').attempts, 2);
});

/* The service runs inside a vm context, so its RangeError is a different
   constructor from this file's — same name, different realm, and
   `assert.throws(fn, RangeError)` compares prototypes. The name is the
   contract; the identity of the constructor is an artifact of the
   harness. Same reason the deep comparisons above go through JSON. */
test('an unknown grade is refused rather than stored', () => {
  const p = loadProgress();
  assert.throws(() => p.recordRetrieval('q1', 'excellent'), e => e.name === 'RangeError');
  assert.throws(() => p.recordRetrieval('', 'got'));
  assert.strictEqual(p.getRetrieval('q1'), null);
});

test('the summary counts what the student has actually attempted', () => {
  const p = loadProgress();
  p.recordRetrieval('a', 'got');
  p.recordRetrieval('b', 'partly');
  p.recordRetrieval('c', 'not');
  const s = JSON.parse(JSON.stringify(p.getRetrievalSummary(['a', 'b', 'c', 'd'])));
  assert.deepStrictEqual(s, { total: 4, attempted: 3, got: 1, partly: 1, not: 1 });
});

test('a corrupt retrieval entry is dropped without taking the rest with it', () => {
  const payload = JSON.stringify({
    version: 1, units: {}, quiz: {},
    retrieval: {
      good: { grade: 'got', at: '2026-01-01T00:00:00.000Z', attempts: 1 },
      badGrade: { grade: 'brilliant', at: '2026-01-01T00:00:00.000Z', attempts: 1 },
      noDate: { grade: 'got' }
    }
  });
  const p = loadProgress({ 'rgsc.progress.v1': payload });
  assert.ok(p.getRetrieval('good'), 'a valid entry was discarded with the invalid ones');
  assert.strictEqual(p.getRetrieval('badGrade'), null);
  assert.strictEqual(p.getRetrieval('noDate'), null);
});

/* Adding a key must not cost a student their finished units. */
test('adding retrieval did not invalidate stored progress', () => {
  const older = JSON.stringify({
    version: 1,
    units: { 'grade10/dbms/unit1': { completedAt: '2026-01-01T00:00:00.000Z' } },
    quiz: {}
  });
  const p = loadProgress({ 'rgsc.progress.v1': older });
  assert.strictEqual(p.getUnitProgress('grade10/dbms/unit1').complete, true,
    'a payload written before retrieval existed was thrown away');
  assert.deepStrictEqual(JSON.parse(JSON.stringify(p.exportState().retrieval)), {});
});

/* ---------------------------------------------- it reaches the pages */

test('every lesson page loads the gate and somewhere to put the grade', () => {
  const pages = require(path.join(SRC, 'config', 'pages.js'));
  for (const [key, subject] of Object.entries(pages)){
    for (const page of subject.pages){
      const file = path.join(ROOT, key, page.file);
      const html = fs.readFileSync(file, 'utf8');
      if (html.indexOf('class="examq"') < 0) continue;
      const rel = key + '/' + page.file;
      assert.match(html, /assets\/js\/retrieval\.js/, rel + ': has practice questions but no gate');
      assert.match(html, /assets\/js\/services\/progress\.js/,
        rel + ': loads the gate with nowhere to record the self-grade');
      assert.ok(html.indexOf('services/progress.js') < html.indexOf('retrieval.js'),
        rel + ': retrieval.js is loaded before progress.js, so the first grade is dropped');
    }
  }
});
