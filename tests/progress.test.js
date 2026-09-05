/* ProgressService — the storage boundary.

   The behaviour that matters most here is failure: a student in private
   mode, with a full quota, or with corrupted data must still get a
   working interface. */
const { test } = require('node:test');
const assert = require('node:assert');
const path = require('node:path');

const MODULE = path.resolve(__dirname, '..', '_source', 'runtime', 'services', 'progress.js');

/* Load a fresh instance against a supplied localStorage implementation. */
/* The storage stays installed for the lifetime of the returned service:
   the adapter reads globalThis.localStorage lazily on every call, so
   restoring it here would silently detach the service from its store. */
function load(storage){
  delete require.cache[require.resolve(MODULE)];
  if (storage === undefined) delete globalThis.localStorage;
  else globalThis.localStorage = storage;
  return require(MODULE);
}

function fakeStorage(initial){
  const map = new Map(Object.entries(initial || {}));
  return {
    getItem: k => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => { map.set(k, String(v)); },
    removeItem: k => { map.delete(k); },
    _map: map
  };
}

/* ------------------------------------------------------------- happy path */

test('marks a unit complete and reads it back', () => {
  const p = load(fakeStorage());
  assert.strictEqual(p.getUnitProgress('g10.oop-cpp.u1').complete, false);
  p.markUnitComplete('g10.oop-cpp.u1');
  const got = p.getUnitProgress('g10.oop-cpp.u1');
  assert.strictEqual(got.complete, true);
  assert.match(got.completedAt, /^\d{4}-\d{2}-\d{2}T/);
});

test('unit completion survives a reload', () => {
  const store = fakeStorage();
  load(store).markUnitComplete('g10.oop-cpp.u2');
  const reloaded = load(store);
  assert.strictEqual(reloaded.getUnitProgress('g10.oop-cpp.u2').complete, true);
});

test('subject progress is computed from the ids the caller supplies', () => {
  const p = load(fakeStorage());
  const units = ['u1','u2','u3','u4'];
  p.markUnitComplete('u1'); p.markUnitComplete('u3');
  assert.deepStrictEqual(p.getSubjectProgress('grade10/oop-cpp', units),
    { subjectId: 'grade10/oop-cpp', total: 4, complete: 2, percent: 50 });
});

test('an empty subject reports 0% rather than dividing by zero', () => {
  const p = load(fakeStorage());
  assert.strictEqual(p.getSubjectProgress('empty', []).percent, 0);
});

test('quiz attempts are recorded and the best score is found', () => {
  const p = load(fakeStorage());
  p.recordQuizAttempt('q1', 8, 15);
  p.recordQuizAttempt('q1', 12, 15);
  p.recordQuizAttempt('q1', 10, 15);
  assert.strictEqual(p.getQuizHistory('q1').length, 3);
  assert.strictEqual(p.getBestQuizScore('q1').score, 12);
});

test('quiz history is bounded so storage cannot grow without limit', () => {
  const p = load(fakeStorage());
  for (let i = 0; i < 40; i++) p.recordQuizAttempt('q1', 1, 15);
  assert.strictEqual(p.getQuizHistory('q1').length, 20);
});

test('resetProgress clears everything', () => {
  const p = load(fakeStorage());
  p.markUnitComplete('u1');
  p.recordQuizAttempt('q1', 5, 15);
  p.resetProgress();
  assert.strictEqual(p.getUnitProgress('u1').complete, false);
  assert.deepStrictEqual(p.getQuizHistory('q1'), []);
});

test('subscribers are notified of changes', () => {
  const p = load(fakeStorage());
  const seen = [];
  const off = p.subscribe(e => seen.push(e.type));
  p.markUnitComplete('u1');
  p.recordQuizAttempt('q1', 1, 2);
  off();
  p.markUnitComplete('u2');
  assert.deepStrictEqual(seen, ['unit:complete', 'quiz:attempt'], 'unsubscribe did not take effect');
});

/* ------------------------------------------------------------ degradation */

test('works with no localStorage at all, and says so', () => {
  const p = load(undefined);
  assert.strictEqual(p.isPersistent(), false);
  assert.strictEqual(p.storageInfo().adapter, 'memory');
  p.markUnitComplete('u1');
  assert.strictEqual(p.getUnitProgress('u1').complete, true, 'must still work in-session');
});

test('works when localStorage throws on write (private mode)', () => {
  const p = load({
    getItem(){ return null; },
    setItem(){ throw new Error('SecurityError'); },
    removeItem(){}
  });
  assert.strictEqual(p.isPersistent(), false);
  assert.doesNotThrow(() => p.markUnitComplete('u1'));
  assert.strictEqual(p.getUnitProgress('u1').complete, true);
});

test('falls back to memory when the quota is exceeded mid-session', () => {
  let allow = true;
  const p = load({
    getItem(){ return null; },
    setItem(){ if (!allow) { const e = new Error('quota'); e.name = 'QuotaExceededError'; throw e; } },
    removeItem(){}
  });
  assert.strictEqual(p.isPersistent(), true, 'probe should have succeeded');
  allow = false;
  assert.doesNotThrow(() => p.markUnitComplete('u1'));
  assert.strictEqual(p.isPersistent(), false, 'should have downgraded to memory');
  assert.strictEqual(p.getUnitProgress('u1').complete, true);
});

test('corrupted JSON is discarded rather than thrown', () => {
  const p = load(fakeStorage({ 'rgsc.progress.v1': '{not json at all' }));
  assert.deepStrictEqual(p.exportState(), { version: 1, units: {}, quiz: {} });
});

test('a payload of the wrong shape is discarded', () => {
  const p = load(fakeStorage({ 'rgsc.progress.v1': '["an","array"]' }));
  assert.deepStrictEqual(p.exportState().units, {});
});

test('a payload from a future schema version is discarded', () => {
  const p = load(fakeStorage({ 'rgsc.progress.v1': JSON.stringify({ version: 99, units: { u1: {} } }) }));
  assert.deepStrictEqual(p.exportState().units, {});
});

test('individually malformed entries are dropped, valid ones survive', () => {
  const p = load(fakeStorage({ 'rgsc.progress.v1': JSON.stringify({
    version: 1,
    units: { good: { completedAt: '2026-01-01T00:00:00.000Z' }, bad: { completedAt: 42 }, alsoBad: null },
    quiz:  { q1: [{ score: 5, total: 10 }, { score: 99, total: 10 }, 'nonsense'] }
  }) }));
  assert.strictEqual(p.getUnitProgress('good').complete, true);
  assert.strictEqual(p.getUnitProgress('bad').complete, false);
  assert.strictEqual(p.getUnitProgress('alsoBad').complete, false);
  assert.strictEqual(p.getQuizHistory('q1').length, 1, 'impossible scores must be rejected');
});

/* ------------------------------------------------------------- input guard */

test('rejects invalid ids and impossible scores', () => {
  const p = load(fakeStorage());
  assert.throws(() => p.markUnitComplete(''),      /must be a non-empty string/);
  assert.throws(() => p.markUnitComplete(null),    /must be a non-empty string/);
  assert.throws(() => p.recordQuizAttempt('q', 20, 15), /invalid quiz attempt/);
  assert.throws(() => p.recordQuizAttempt('q', -1, 15), /invalid quiz attempt/);
  assert.throws(() => p.recordQuizAttempt('q', 1, 0),   /invalid quiz attempt/);
  assert.throws(() => p.subscribe('not a function'),    /expects a function/);
});

test('a throwing subscriber cannot break the service', () => {
  const p = load(fakeStorage());
  p.subscribe(() => { throw new Error('subscriber blew up'); });
  let reached = false;
  p.subscribe(() => { reached = true; });
  assert.doesNotThrow(() => p.markUnitComplete('u1'));
  assert.ok(reached, 'a failing subscriber must not stop the others');
});
