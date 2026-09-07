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
  /* `transfer` joined the ladder in Phase 8. It sits after `independent`
     because it asks for less, not more: the same idea with something
     about the situation moved. The ordering rule below is unchanged —
     it simply has one more rung. */
  const ORDER = ['worked', 'partial', 'guided', 'independent', 'transfer'];
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
    /* The sequence must END unscaffolded. Either rung qualifies: an
       independent problem asks for the same thing with no help, and a
       transfer problem asks for the idea somewhere new. What is not
       allowed is finishing while help is still being given. */
    var end = levels[levels.length - 1];
    assert.ok(end === 'independent' || end === 'transfer',
      s.id + ': the last problem is "' + end + '" — the sequence ends while the student ' +
      'is still being helped, so nothing was actually faded');
    if (levels.indexOf('transfer') >= 0){
      assert.ok(levels.indexOf('independent') >= 0,
        s.id + ': a transfer problem without an independent one first asks a student to move ' +
        'an idea they have never used unaided');
    }
  }
});

test('the independent problem shows no steps at all', () => {
  for (const s of BANK){
    for (const p of s.problems){
      if (p.fade !== 'independent' && p.fade !== 'transfer') continue;
      assert.strictEqual((p.steps || []).length, 0,
        s.id + ': the "' + p.fade + '" problem still carries steps, so it is not unscaffolded');
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

/* ---------------------------------------------- the transfer rung */

/* A transfer problem exists to ask whether the student can use the IDEA
   when the situation moves. The failure it guards is the easy one to
   write by accident: the same question with different numbers, which
   tests the procedure again and calls it transfer. Measured as token
   overlap against the independent problem it follows — a near-duplicate
   shares almost every word. */
test('a transfer problem is not the independent one with new numbers', () => {
  const words = s => new Set(String(s).toLowerCase()
    .replace(/[^a-z0-9'+·*<>=;{}()\s]/g, ' ')
    .split(/\s+/).filter(w => w.length > 1));
  for (const s of BANK){
    const t = s.problems.find(p => p.fade === 'transfer');
    if (!t) continue;
    const ind = s.problems.find(p => p.fade === 'independent');
    assert.ok(ind, s.id + ': a transfer problem with no independent problem before it');
    const a = words(ind.ask.en), b = words(t.ask.en);
    let shared = 0;
    for (const w of b) if (a.has(w)) shared++;
    const overlap = b.size ? shared / b.size : 1;
    assert.ok(overlap < 0.8,
      s.id + ': the transfer problem shares ' + Math.round(overlap * 100) + '% of its wording ' +
      'with the independent one. Transfer means something moved — the representation, the ' +
      'context, or the direction of the question — not just the numbers.');
  }
});

/* The check text is where a transfer problem earns its place: it has to
   say what moved, or the student learns a second answer instead of a
   wider rule. */
test('a transfer problem explains what changed', () => {
  for (const s of BANK){
    const t = s.problems.find(p => p.fade === 'transfer');
    if (!t) continue;
    assert.ok(t.check.en.trim().split(/\s+/).length >= 20,
      s.id + ': the transfer problem\'s explanation is too short to say what moved');
    bothLanguages(t.check, s.id + ' transfer.check');
  }
});

/* ---------------------------------------------- the mathematics */

/* Recomputing the answers is cheap and catches a typo that would
   otherwise teach a student the wrong Boolean identity. The same
   discipline as the decimal-to-binary check above. */
test('every De Morgan answer is algebraically correct', () => {
  /* A tiny evaluator for the expression forms this bank uses:
     variables A B C, ' for complement, · or * for AND, + for OR,
     and parentheses. */
  function evaluate(expr, env){
    let i = 0;
    const src = String(expr).replace(/\s+/g, '');
    function primary(){
      let v;
      if (src[i] === '('){ i++; v = orExpr(); if (src[i] !== ')') throw new Error('unbalanced'); i++; }
      else { const name = src[i++]; if (!(name in env)) throw new Error('unknown var ' + name); v = env[name]; }
      while (src[i] === "'"){ i++; v = v ? 0 : 1; }
      return v;
    }
    function andExpr(){
      let v = primary();
      while (src[i] === '·' || src[i] === '*' || src[i] === '.'){ i++; v = (primary() && v) ? 1 : 0; }
      return v;
    }
    function orExpr(){
      let v = andExpr();
      while (src[i] === '+'){ i++; const r = andExpr(); v = (v || r) ? 1 : 0; }
      return v;
    }
    const out = orExpr();
    if (i !== src.length) throw new Error('trailing input in ' + expr + ' at ' + i);
    return out;
  }

  const skill = BANK.find(s => s.id === 'dd.demorgan');
  assert.ok(skill, 'the De Morgan practice is gone');

  /* Each problem states an expression in its ask and the equivalent in
     its result. Pull the parenthesised expression out of the ask. */
  let checked = 0;
  for (const p of skill.problems){
    const m = /\(([^)]*(?:\([^)]*\)[^)]*)*)\)'/.exec(p.ask.en);
    if (!m) continue;                       /* the transfer problem is prose */
    const left = '(' + m[1] + ")'";
    const right = p.result;
    const vars = [...new Set((left + right).match(/[A-C]/g) || [])];
    for (let bits = 0; bits < (1 << vars.length); bits++){
      const env = {};
      vars.forEach((v, k) => { env[v] = (bits >> k) & 1; });
      const l = evaluate(left, env), r = evaluate(right, env);
      assert.strictEqual(l, r,
        'De Morgan: ' + left + ' = ' + right + ' is false for ' +
        vars.map(v => v + '=' + env[v]).join(', ') + ' — left ' + l + ', right ' + r);
    }
    checked++;
  }
  assert.ok(checked >= 4, 'expected at least 4 checkable identities, verified ' + checked);
});

/* A fade level the runtime does not know falls back to `guided`, so a
   transfer problem would be labelled "Your turn, with prompts" and the
   student would never be told the situation had moved. No error, no
   crash — just the wrong sentence on the screen. */
test('every fade level used in content has a label in the runtime', () => {
  const src = fs.readFileSync(path.join(SRC, 'runtime', 'guided.js'), 'utf8');
  const block = /var LEVEL_LABEL = \{([\s\S]*?)\n  \};/.exec(src);
  assert.ok(block, 'LEVEL_LABEL is gone');
  const labelled = new Set([...block[1].matchAll(/^\s*([a-z]+):/gm)].map(m => m[1]));
  const used = new Set();
  for (const s of BANK) for (const p of s.problems) used.add(p.fade);
  for (const level of used){
    assert.ok(labelled.has(level),
      'content uses the fade level "' + level + '" and the runtime has no label for it — ' +
      'it would silently fall back to the "guided" wording');
  }
  /* and every label must have a UIStrings key, or Nepali mode shows English */
  const strings = fs.readFileSync(path.join(SRC, 'runtime', 'services', 'strings.js'), 'utf8');
  for (const m of block[1].matchAll(/key: '([A-Za-z]+)'/g)){
    assert.ok(new RegExp(m[1] + '\\s*:\\s*\\{[^}]*ne\\s*:').test(strings),
      'UIStrings.' + m[1] + ' has no Nepali, so that level is labelled in English in Nepali mode');
  }
});
