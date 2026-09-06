/* ============================================================
   K-MAP RULE ENGINE

   This component judges a student's work, so it has to be right. If it
   accepts an illegal group the student learns a wrong rule and carries
   it into the exam — worse than having no tool at all.

   The rules being checked are the real ones:
     1  a group contains only 1s
     2  a group's size is a power of two
     3  a group is a rectangle, with the edges wrapping round
     4  a group is as large as it can be

   Driven directly rather than through clicks: the DOM is stubbed only
   as far as the constructor needs, and the judgement is pure logic.
   ============================================================ */
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SRC = path.resolve(__dirname, '..', '_source');

function fakeEl(attrs){
  return {
    _attrs: attrs || {},
    getAttribute(k){ return k in this._attrs ? this._attrs[k] : null; },
    setAttribute(){},
    classList: { toggle(){}, add(){}, remove(){} },
    querySelector(){ return null; },
    querySelectorAll(){ return []; },
    addEventListener(){},
    set innerHTML(v){ this._html = v; },
    get innerHTML(){ return this._html || ''; },
    parentNode: {}
  };
}

function loadLab(){
  const sandbox = {
    document: { readyState: 'complete', addEventListener(){}, querySelectorAll(){ return []; } },
    console
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  const ctx = vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(SRC, 'runtime', 'sim-kmap.js'), 'utf8'), ctx);
  return ctx.KMapLab;
}

const Lab = loadLab();

function map(vars, minterms){
  return new Lab.KMap(fakeEl({ 'data-vars': String(vars), 'data-minterms': minterms.join(',') }));
}
function judge(m, cells){
  m.sel = new Set(cells);
  return m.judge();
}

/* ---------------------------------------------------- valid groups */

test('a full row of a 3-variable map cancels the row variable', () => {
  const v = judge(map(3, [0, 1, 2, 3]), ['0,0', '0,1', '0,2', '0,3']);
  assert.ok(v.ok, v.en);
  assert.strictEqual(v.term, "A'");
});

test('a group that wraps around the left and right edges is legal', () => {
  /* columns 00 and 10 are the outer two, so this pair of columns only
     touches by wrapping — the classic thing students are told is legal
     and never believe. */
  const v = judge(map(3, [0, 2, 4, 6]), ['0,0', '0,3', '1,0', '1,3']);
  assert.ok(v.ok, v.en);
  assert.strictEqual(v.term, "C'");
});

test('the four corners of a 4-variable map form one group', () => {
  const v = judge(map(4, [0, 2, 8, 10]), ['0,0', '0,3', '3,0', '3,3']);
  assert.ok(v.ok, v.en);
  assert.strictEqual(v.term, "B'D'");
});

test('a lone 1 keeps every variable', () => {
  const v = judge(map(4, [5]), ['1,1']);
  assert.ok(v.ok, v.en);
  assert.strictEqual(v.term, "A'BC'D");
});

test('a two-variable map reduces a column to a single variable', () => {
  const v = judge(map(2, [1, 3]), ['0,1', '1,1']);
  assert.ok(v.ok, v.en);
  assert.strictEqual(v.term, 'B');
});

/* ------------------------------------------------- rejected groups */

test('rule 1 — a group containing a 0 is rejected, and says so', () => {
  const v = judge(map(3, [0, 1]), ['0,0', '0,1', '0,2', '0,3']);
  assert.strictEqual(v.ok, false);
  assert.match(v.en, /Rule 1/);
  assert.ok(v.ne.length > 0, 'the reason must be given in both languages');
});

test('rule 2 — a group of three is rejected, and says so', () => {
  const v = judge(map(3, [0, 1, 3]), ['0,0', '0,1', '0,2']);
  assert.strictEqual(v.ok, false);
  assert.match(v.en, /Rule 2/);
});

test('rule 3 — a diagonal pair is rejected, and says so', () => {
  /* both cells hold 1, so rule 1 cannot fire first and rule 3 is
     genuinely the rule being tested */
  const v = judge(map(3, [0, 5]), ['0,0', '1,1']);
  assert.strictEqual(v.ok, false);
  assert.match(v.en, /Rule 3/);
});

test('rule 4 — a legal but non-maximal group is rejected, and says so', () => {
  /* a valid pair sitting inside an available group of four: legal by
     rules 1-3, and still the wrong answer */
  const v = judge(map(3, [0, 1, 2, 3]), ['0,0', '0,1']);
  assert.strictEqual(v.ok, false);
  assert.match(v.en, /Rule 4/);
});

test('an empty selection is explained rather than silently ignored', () => {
  const v = judge(map(3, [0]), []);
  assert.strictEqual(v.ok, false);
  assert.match(v.en, /Nothing is selected/);
});

/* -------------------------------------------------------- geometry */

test('column headings are Gray-coded, which is what makes adjacency work', () => {
  assert.deepStrictEqual([...Lab.geometry(3).colBits], ['00', '01', '11', '10']);
  assert.deepStrictEqual([...Lab.geometry(4).rowBits], ['00', '01', '11', '10']);
});

test('a cell maps to the minterm its row and column bits spell out', () => {
  const g = Lab.geometry(3);
  assert.strictEqual(Lab.mintermAt(g, 0, 0), 0);   // 0 + 00
  assert.strictEqual(Lab.mintermAt(g, 0, 2), 3);   // 0 + 11
  assert.strictEqual(Lab.mintermAt(g, 1, 3), 6);   // 1 + 10
});

test('every rejection explains which rule was broken', () => {
  /* The component's whole justification is that it teaches the rule
     rather than just refusing. A bare "no" is a regression. */
  const cases = [
    [map(3, [0, 1]), ['0,0', '0,1', '0,2', '0,3']],
    [map(3, [0, 1, 3]), ['0,0', '0,1', '0,2']],
    [map(3, [0, 5]), ['0,0', '1,1']],
    [map(3, [0, 1, 2, 3]), ['0,0', '0,1']]
  ];
  for (const [m, cells] of cases){
    const v = judge(m, cells);
    assert.strictEqual(v.ok, false);
    assert.match(v.en, /Rule \d/, 'rejection must name the rule');
    assert.ok(v.en.length > 60, 'rejection must explain, not just refuse');
    assert.ok(v.ne && v.ne.length > 20, 'the explanation must exist in Nepali too');
  }
});
