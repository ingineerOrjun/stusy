/* ============================================================
   GUIDED PRACTICE — the content contract and the fading

   WHAT IS BEING PROTECTED
   Two different things, and they fail in different ways.

   The CONTENT contract is a bilingual, checkable data structure. A step
   with no `why` marks an answer wrong and says nothing about it, which
   is worse than not marking it — the student learns they were wrong and
   not what to do differently. A step with no Nepali silently drops half
   the audience at the exact moment they need the explanation most.

   The FADING is an ordering. If the levels arrive in the wrong order, or
   the last problem still shows its steps, the component still works and
   still teaches the wrong thing: help that never comes away is not
   practice, it is reading.
   ============================================================ */
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, '_source');

const BANK = require(path.join(SRC, 'build', 'context.js')).practiceBanks;
const DEVA = /[ऀ-ॿ]/;

function bothLanguages(p, where){
  assert.ok(p && typeof p === 'object', where + ': missing bilingual pair');
  assert.ok(String(p.en || '').trim(), where + ': no English');
  assert.ok(String(p.ne || '').trim(), where + ': no Nepali');
  assert.ok(DEVA.test(p.ne), where + ': the Nepali half has no Devanagari in it — ' +
    JSON.stringify(p.ne).slice(0, 60));
}

/* ---------------------------------------------- the content contract */

test('the practice bank is not empty and every skill is addressable', () => {
  assert.ok(BANK.length >= 1, 'no practice skills registered');
  const ids = BANK.map(s => s.id);
  assert.strictEqual(new Set(ids).size, ids.length, 'two skills share an id: ' + ids.join(', '));
  for (const s of BANK){
    assert.match(s.id, /^[a-z0-9.]+$/i, s.id + ': an id becomes a data-skill attribute');
    assert.ok(s.subject && s.unit, s.id + ': a skill must say which unit it belongs to');
    bothLanguages(s.skill, s.id + '.skill');
  }
});

test('every step can be marked, and every mark can be explained', () => {
  for (const s of BANK){
    s.problems.forEach((p, pi) => {
      const at = s.id + ' problem ' + (pi + 1);
      bothLanguages(p.ask, at + '.ask');
      bothLanguages(p.resultPrompt, at + '.resultPrompt');
      bothLanguages(p.check, at + '.check');
      assert.ok(String(p.result || '').trim(), at + ': no final answer to check against');
      (p.steps || []).forEach((st, si) => {
        const w = at + ' step ' + (si + 1);
        bothLanguages(st.prompt, w + '.prompt');
        /* The reason is the point. Marking without it teaches a student
           that they were wrong and nothing else. */
        bothLanguages(st.why, w + '.why');
        assert.ok(String(st.answer || '').trim(), w + ': nothing to compare against');
        assert.ok(String(st.answer).length <= 12,
          w + ': "' + st.answer + '" is too long to mark by comparison. ' +
          'Long answers belong in an examq retrieval block, which is judged by the student.');
      });
    });
  }
});

/* ---------------------------------------------- the fading itself */

test('the scaffolding actually comes away, in order', () => {
  const ORDER = ['worked', 'partial', 'guided', 'independent'];
  for (const s of BANK){
    const levels = s.problems.map(p => p.fade);
    for (const l of levels) assert.ok(ORDER.includes(l), s.id + ': unknown fade level "' + l + '"');
    /* monotonic: help may stay level or decrease, never come back */
    let last = -1;
    for (const l of levels){
      const i = ORDER.indexOf(l);
      assert.ok(i >= last, s.id + ': help increases again at "' + l + '" — ' + levels.join(' → '));
      last = i;
    }
    assert.strictEqual(levels[0], 'worked',
      s.id + ': the first problem must demonstrate the procedure before asking for it');
    assert.strictEqual(levels[levels.length - 1], 'independent',
      s.id + ': the last problem must be unscaffolded, or nothing was faded');
  }
});

test('the independent problem shows no steps at all', () => {
  for (const s of BANK){
    for (const p of s.problems){
      if (p.fade !== 'independent') continue;
      assert.strictEqual((p.steps || []).length, 0,
        s.id + ': the "on your own" problem still carries steps, so it is not on your own');
    }
  }
});

test('a worked problem has the steps it is meant to demonstrate', () => {
  for (const s of BANK){
    const worked = s.problems.filter(p => p.fade === 'worked');
    for (const p of worked){
      assert.ok((p.steps || []).length >= 2,
        s.id + ': a worked example with fewer than two steps demonstrates nothing');
    }
  }
});

/* The answers are the whole point of the exercise, so they have to be
   right. Recomputing them here is cheap and catches a typo that would
   otherwise teach a student the wrong remainder. */
test('every decimal-to-binary answer is actually correct', () => {
  for (const s of BANK){
    if (s.id !== 'dd.dec2bin') continue;
    for (const p of s.problems){
      const n = Number((p.ask.en.match(/Convert (\d+)/) || [])[1]);
      assert.ok(Number.isFinite(n), s.id + ': cannot read the number out of "' + p.ask.en + '"');
      assert.strictEqual(p.result, n.toString(2),
        'stated answer for ' + n + ' is ' + p.result + ', but ' + n + ' is ' + n.toString(2));
      /* the remainders, in the order the student writes them down */
      const remainders = [];
      for (let q = n; q > 0; q = Math.floor(q / 2)) remainders.push(String(q % 2));
      const stated = (p.steps || []).map(st => st.answer);
      if (stated.length){
        assert.deepStrictEqual(stated, remainders,
          'the steps for ' + n + ' give remainders ' + stated.join('') +
          ' but repeated division gives ' + remainders.join(''));
      }
    }
  }
});

/* ---------------------------------------------- the runtime */

function loadRuntime(){
  const src = fs.readFileSync(path.join(ROOT, 'assets', 'js', 'guided.js'), 'utf8');
  const sandbox = { window: {}, console: { warn(){} } };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox);
  return sandbox.window.GuidedPractice;
}

test('marking is forgiving about spacing and case, and strict about the answer', () => {
  const G = loadRuntime();
  const step = { answer: '10110', accept: [] };
  assert.ok(G._accepts(step, '10110'));
  assert.ok(G._accepts(step, ' 10110 '));
  assert.ok(!G._accepts(step, '1011'));
  assert.ok(!G._accepts(step, '01101'), 'a reversed answer must not be accepted — ' +
    'reading the remainders the wrong way is the mistake this exercise exists to catch');
  const alt = { answer: 'A', accept: ['a', '10'] };
  assert.ok(G._accepts(alt, 'a'));
  assert.ok(G._accepts(alt, '10'));
});

/* The bug this guards produced no error and no wrong answer: it skipped
   a problem. render() replaces innerHTML, so listeners attached inside
   it accumulated, and by problem 2 a single press of Next fired twice. */
test('the component wires its listeners once, not on every render', () => {
  const src = fs.readFileSync(path.join(SRC, 'runtime', 'guided.js'), 'utf8');
  const render = /Practice\.prototype\.render = function[\s\S]*?\n  \};/.exec(src);
  assert.ok(render, 'render() is gone');
  assert.ok(!/this\.wire\(\)/.test(render[0]),
    'render() calls wire() again. innerHTML is replaced but the host is not, so every ' +
    'render adds another set of listeners and one press of Next starts skipping problems.');
  const ctor = /function Practice\(root, skill\)\{[\s\S]*?\n  \}/.exec(src);
  assert.ok(ctor && /this\.wire\(\)/.test(ctor[0]),
    'nothing wires the component — it renders and does not respond');
});

test('a handler reads the current problem rather than one captured at wire time', () => {
  const src = fs.readFileSync(path.join(SRC, 'runtime', 'guided.js'), 'utf8');
  const wire = /Practice\.prototype\.wire = function[\s\S]*?\n  \};/.exec(src);
  assert.ok(wire, 'wire() is gone');
  assert.ok(!/^\s*var p = this\.problem\(\);/m.test(wire[0]),
    'wire() captures the problem. It now runs once, so a captured problem would be the ' +
    'first one for ever and every later problem would be marked against problem 1.');
});

/* ---------------------------------------------- it reaches the page */

test('every practice block on a page has a skill behind it, and the reverse', () => {
  const pages = require(path.join(SRC, 'config', 'pages.js'));
  const known = new Set(BANK.map(s => s.id));
  const used = new Set();
  for (const [key, subject] of Object.entries(pages)){
    for (const page of subject.pages){
      const file = path.join(ROOT, key, page.file);
      const html = fs.readFileSync(file, 'utf8');
      const rel = key + '/' + page.file;
      for (const m of html.matchAll(/class="guided"[^>]*data-skill="([^"]+)"/g)){
        used.add(m[1]);
        assert.ok(known.has(m[1]), rel + ': practice block asks for skill "' + m[1] +
          '", which no bank registers — the block would render as an empty box');
        assert.match(html, /assets\/js\/guided\.js/, rel + ': practice block with no runtime');
        assert.match(html, /assets\/js\/practice-bank\.js/, rel + ': practice runtime with no bank');
        assert.ok(html.indexOf('guided.js') < html.indexOf('practice-bank.js'),
          rel + ': practice-bank.js runs before guided.js, so register() has no registry');
      }
    }
  }
  for (const id of known){
    assert.ok(used.has(id), 'skill "' + id + '" is authored but no page shows it');
  }
});
