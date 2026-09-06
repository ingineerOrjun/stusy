/* ============================================================
   GATE AND CIRCUIT TRUTH FUNCTIONS

   Both workbenches generate their truth tables from the same functions
   that drive the diagram, so a table can never contradict the circuit
   beside it. That only helps if the functions themselves are right —
   which is what this file checks, against the arithmetic each circuit
   claims to perform rather than against a copy of the same table.
   ============================================================ */
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SRC = path.resolve(__dirname, '..', '_source', 'runtime');

function load(file, name){
  const sandbox = {
    document: { readyState: 'complete', addEventListener(){}, querySelectorAll(){ return []; } },
    console
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  const ctx = vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(SRC, file), 'utf8'), ctx);
  return ctx[name];
}

const GATES = load('sim-gates.js', 'GateLab').GATES;
const CIRCUITS = load('sim-comb.js', 'CombLab').CIRCUITS;

/* ------------------------------------------------------------ gates */

test('every gate computes its defining rule', () => {
  const expect = {
    NOT:  (a) => (a ? 0 : 1),
    AND:  (a, b) => (a && b ? 1 : 0),
    OR:   (a, b) => (a || b ? 1 : 0),
    NAND: (a, b) => (a && b ? 0 : 1),
    NOR:  (a, b) => (a || b ? 0 : 1),
    XOR:  (a, b) => (a !== b ? 1 : 0)
  };
  for (const [key, want] of Object.entries(expect)){
    const g = GATES[key];
    assert.ok(g, key + ' is missing from the workbench');
    if (g.inputs === 1){
      for (const a of [0, 1]) assert.strictEqual(g.f(a), want(a), key + '(' + a + ')');
    } else {
      for (const a of [0, 1]) for (const b of [0, 1]){
        assert.strictEqual(g.f(a, b), want(a, b), key + '(' + a + ',' + b + ')');
      }
    }
  }
});

test('NAND and NOR really are the inverses of AND and OR', () => {
  /* The lesson teaches "work out AND, then flip". If that were not
     literally true the shortcut would be wrong. */
  for (const a of [0, 1]) for (const b of [0, 1]){
    assert.strictEqual(GATES.NAND.f(a, b), GATES.NOT.f(GATES.AND.f(a, b)));
    assert.strictEqual(GATES.NOR.f(a, b),  GATES.NOT.f(GATES.OR.f(a, b)));
  }
});

test("a NAND with both inputs joined behaves as a NOT", () => {
  /* The universal-gate simulation rests on this. */
  for (const a of [0, 1]) assert.strictEqual(GATES.NAND.f(a, a), GATES.NOT.f(a));
});

test("De Morgan's laws hold for the implemented gates", () => {
  const not = GATES.NOT.f;
  for (const a of [0, 1]) for (const b of [0, 1]){
    assert.strictEqual(GATES.NAND.f(a, b), GATES.OR.f(not(a), not(b)), "(A·B)' = A' + B'");
    assert.strictEqual(GATES.NOR.f(a, b),  GATES.AND.f(not(a), not(b)), "(A+B)' = A'·B'");
  }
});

test('every gate carries both languages and a Boolean expression', () => {
  for (const [key, g] of Object.entries(GATES)){
    assert.ok(g.name && g.ne, key + ' is missing a name in one language');
    assert.ok(g.expr, key + ' has no Boolean expression');
    assert.ok(g.why && g.why.en && g.why.ne, key + ' has no bilingual explanation');
  }
});

/* -------------------------------------------------------- circuits */

test('the half adder adds two bits', () => {
  const [sum, carry] = CIRCUITS.halfadder.outputs;
  for (const a of [0, 1]) for (const b of [0, 1]){
    const total = a + b;
    assert.strictEqual(sum.f(a, b) & 1, total % 2, `SUM of ${a}+${b}`);
    assert.strictEqual(carry.f(a, b) & 1, total > 1 ? 1 : 0, `CARRY of ${a}+${b}`);
  }
});

test('the full adder adds three bits', () => {
  const [sum, carry] = CIRCUITS.fulladder.outputs;
  for (const a of [0, 1]) for (const b of [0, 1]) for (const c of [0, 1]){
    const total = a + b + c;
    assert.strictEqual(sum.f(a, b, c) & 1, total % 2, `SUM of ${a}+${b}+${c}`);
    assert.strictEqual(carry.f(a, b, c) & 1, total > 1 ? 1 : 0, `CARRY of ${a}+${b}+${c}`);
  }
});

test('the half subtractor computes A minus B', () => {
  const [diff, borrow] = CIRCUITS.halfsub.outputs;
  for (const a of [0, 1]) for (const b of [0, 1]){
    assert.strictEqual(diff.f(a, b) & 1, a ^ b, `DIFFERENCE of ${a}-${b}`);
    assert.strictEqual(borrow.f(a, b) & 1, (a === 0 && b === 1) ? 1 : 0, `BORROW of ${a}-${b}`);
  }
});

test("the half subtractor's difference is the half adder's sum", () => {
  /* Taught as a comparison in the lesson, so it had better be true. */
  for (const a of [0, 1]) for (const b of [0, 1]){
    assert.strictEqual(CIRCUITS.halfsub.outputs[0].f(a, b) & 1,
                       CIRCUITS.halfadder.outputs[0].f(a, b) & 1);
  }
});

test('the multiplexer routes exactly the input its select lines name', () => {
  const y = CIRCUITS.mux.outputs[0].f;
  /* distinct data so a wrong route cannot coincidentally look right */
  const data = [1, 0, 0, 1];
  for (let s1 = 0; s1 < 2; s1++) for (let s0 = 0; s0 < 2; s0++){
    assert.strictEqual(y(s1, s0, ...data), data[s1 * 2 + s0],
      `S1=${s1} S0=${s0} must select I${s1 * 2 + s0}`);
  }
});

test('every circuit is bilingual and names its outputs', () => {
  for (const [key, c] of Object.entries(CIRCUITS)){
    assert.ok(c.name && c.ne, key + ' is missing a name in one language');
    assert.ok(c.why && c.why.en && c.why.ne, key + ' has no bilingual explanation');
    assert.ok(c.note && c.note.en && c.note.ne, key + ' has no bilingual note');
    assert.ok(c.inputs.length >= 2, key + ' needs inputs');
    for (const o of c.outputs){
      assert.ok(o.id && o.label && o.expr, key + ': an output is missing its label or expression');
      assert.strictEqual(typeof o.f, 'function', key + ': an output has no truth function');
    }
  }
});
