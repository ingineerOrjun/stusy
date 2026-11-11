/* ============================================================
   GRADE 9 · PROGRAMMING PRINCIPLES AND CONCEPT IN C LANGUAGE
   The completed subject: all seven units.

   WHAT THIS FILE IS FOR, AND WHAT IT IS NOT

   The shared guards already cover a great deal: the build fails on an
   unmapped topic, a dangling anchor, an incomplete simulation or a
   missing Nepali half; dbms.test.js refuses a unit with nothing to do
   but read; language.test.js holds the heading ratio; guided.test.js
   holds the faded practice. None of that is repeated here.

   What is here is what only this subject can say.

   THE PART THAT MATTERS MOST IS §5, AND IT NEEDS SAYING PLAINLY.
   No C compiler was available in the environment this subject was
   written in — gcc, clang, cc, tcc, g++ and cl are all absent — so NOT
   ONE PROGRAM IN THIS SUBJECT HAS BEEN COMPILER-EXECUTED. §5 is a
   mechanical checker, not a compiler, and it says so in its own
   messages. It catches the clerical mistakes that actually occur in
   authored teaching code: an unbalanced brace, a printf whose
   specifiers do not match its arguments, a scanf missing an ampersand,
   a string function with no string.h, a complete program with no main.
   It cannot catch a program that is wrong about what it computes. The
   claim this file supports is "mechanically checked and hand-verified",
   and nothing stronger.
   ============================================================ */
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, '_source');
const KEY = 'grade9/c-programming';

const syllabus = require(path.join(SRC, 'content', 'syllabus.js'));
const grid = require(path.join(SRC, 'content', 'specification-grid.js'));
const pages = require(path.join(SRC, 'config', 'pages.js'));
const coverage = require(path.join(SRC, 'content', 'coverage.js'));
const bank = require(path.join(SRC, 'content', 'questions', 'grade9-c-programming.js'));
const programs = require(path.join(SRC, 'content', 'programs', 'grade9-c-programming.js'));

const readLesson = n => fs.readFileSync(path.join(SRC, 'content', 'lessons', 'c-u' + n + '.html'), 'utf8');
const readBuilt = f => fs.readFileSync(path.join(ROOT, KEY, f), 'utf8');

/* ---------------------------------------------- 1 · the curriculum */

test('the seven units match the CDC source, unit for unit', () => {
  /* Read from the CDC 2078 PDF for Phase 14, not inherited: the scope
     and sequence on printed pages 4-5 (PDF 8-9), the practical table on
     printed page 6 (PDF 10), and the specification grid on printed page
     9 (PDF 13). If any figure here moves, either the source has been
     re-read or the repository has drifted — and a human should look
     rather than the number being quietly updated. */
  const expected = [
    { n: 1, topics: 4, hrs:  6, marks:  5, practical:  2 },
    { n: 2, topics: 7, hrs: 10, marks:  7, practical:  3 },
    { n: 3, topics: 3, hrs: 16, marks: 13, practical: 15 },
    { n: 4, topics: 6, hrs: 12, marks: 10, practical: 15 },
    { n: 5, topics: 5, hrs: 10, marks:  8, practical: 15 },
    { n: 6, topics: 6, hrs:  6, marks:  5, practical:  7 },
    { n: 7, topics: 4, hrs:  4, marks:  2, practical:  7 }
  ];
  const outline = syllabus[KEY];
  const g = grid[KEY];

  assert.strictEqual(outline.length, 7, 'the subject should have seven units');
  for (const want of expected){
    const i = want.n - 1;
    assert.strictEqual(outline[i].c.length, want.topics,
      'unit ' + want.n + ' has ' + outline[i].c.length + ' topics, source says ' + want.topics);
    assert.strictEqual(outline[i].h, want.hrs, 'unit ' + want.n + ' theory hours');
    assert.strictEqual(g.units[i].marks, want.marks, 'unit ' + want.n + ' marks');
    assert.strictEqual(g.practicalHours[String(want.n)], want.practical,
      'unit ' + want.n + ' practical hours');
  }

  assert.strictEqual(expected.reduce((a, u) => a + u.topics, 0), 35, 'topics should total 35');
  assert.strictEqual(expected.reduce((a, u) => a + u.hrs, 0), 64, 'theory hours should total 64');
  assert.strictEqual(expected.reduce((a, u) => a + u.practical, 0), 64,
    'practical hours should total 64');
  assert.strictEqual(expected.reduce((a, u) => a + u.marks, 0), 50, 'marks should total 50');
});

test('all 35 official topics are mapped to a section that exists', () => {
  const official = syllabus[KEY].flatMap(u => u.c);
  const map = coverage[KEY];
  assert.strictEqual(official.length, 35);

  const built = pages[KEY].pages
    .filter(p => typeof p.hrs === 'number')
    .map(p => readBuilt(p.file))
    .join('\n');

  for (const topic of official){
    const anchor = map[topic];
    assert.ok(anchor, 'official topic has no coverage entry: ' + topic);
    for (const a of [].concat(anchor)){
      assert.ok(built.includes('id="' + a + '"'),
        'topic "' + topic + '" is mapped to #' + a + ', which no built page contains');
    }
  }

  /* and nothing is mapped that is not official */
  for (const topic of Object.keys(map)){
    assert.ok(official.includes(topic), 'coverage maps a topic that is not official: ' + topic);
  }
});

test('every unit page is authored and carries its own marks chip', () => {
  const g = grid[KEY];
  for (const p of pages[KEY].pages){
    if (typeof p.hrs !== 'number') continue;
    const html = readBuilt(p.file);
    const u = g.units[Number(p.n) - 1];
    const chip = u.hrs + ' hrs · ' + u.marks + ' marks · ' + g.practicalHours[p.n] + ' practical hrs';
    assert.ok(html.includes(chip),
      p.file + ' should carry the chip "' + chip + '" so a student sees the practical hours too');
  }
});

/* ---------------------------------------------- 2 · the practical half */

test('all 10 official practical activities are on the pages', () => {
  /* The curriculum's own list, printed page 6 of the CDC document: one
     activity for unit 1, one for 2, two for 3, two for 4, two for 5,
     one for 6, one for 7. */
  const expected = { 1: 1, 2: 1, 3: 2, 4: 2, 5: 2, 6: 1, 7: 1 };
  let total = 0;

  for (const [unit, count] of Object.entries(expected)){
    const html = readLesson(unit);
    const ids = [...html.matchAll(/data-practical="([^"]+)"/g)].map(m => m[1]);
    assert.strictEqual(ids.length, count,
      'unit ' + unit + ' shows ' + ids.length + ' practical activities, the curriculum lists ' + count);
    assert.strictEqual(new Set(ids).size, ids.length, 'unit ' + unit + ': duplicate activity id');
    for (const id of ids){
      assert.match(id, new RegExp('^g9\\.c\\.p' + unit + '\\.\\d+$'),
        'activity id ' + id + ' does not follow the g9.c.p<unit>.<n> scheme');
    }
    total += ids.length;
  }
  assert.strictEqual(total, 10, 'the subject should carry all 10 official activities');
});

test('every practical activity says it cannot be done from this site', () => {
  /* THE FINDING OF THE PHASE 14 PRACTICAL MAPPING, held as a rule.
     All ten of this subject's activities need a C compiler on a real
     machine — which is different from Computer and Application, where
     several were paper exercises. A brief that let a student believe
     the site could run their program would be the exact failure the
     mapping was written to prevent, and it would be a lie told to a
     child about their own marks. */
  for (let u = 1; u <= 7; u++){
    const html = readLesson(u);
    const blocks = [...html.matchAll(/data-practical="([^"]+)"([\s\S]*?)<\/div>/g)];
    assert.ok(blocks.length, 'unit ' + u + ' has no practical activities at all');
    for (const [, id, body] of blocks){
      const flat = body.replace(/\s+/g, ' ');
      assert.match(flat, /cannot be simulated|cannot be done from this site|cannot do this for you/i,
        id + ' needs a compiler on a real machine and does not say that it cannot be done here');
      assert.ok(!/\b(we have verified|automatically marked|marks awarded|approved by the system)\b/i
        .test(flat), id + ': a brief claims an assessment the product cannot make');
    }
  }
});

/* ---------------------------------------------- 3 · assessment */

test('the question bank covers every unit, weighted towards the marks', () => {
  const byUnit = {};
  for (const q of bank) byUnit[q.unit] = (byUnit[q.unit] || 0) + 1;

  for (let u = 1; u <= 7; u++){
    assert.ok(byUnit['u' + u] >= 5,
      'unit ' + u + ' has ' + (byUnit['u' + u] || 0) + ' questions — too few for a unit worth ' +
      grid[KEY].units[u - 1].marks + ' marks');
  }

  /* The heaviest unit must not have the smallest bank. Unit 3 carries
     13 of the 50 marks, more than any other. */
  const heaviest = grid[KEY].units.reduce((a, b) => (b.marks > a.marks ? b : a));
  const smallestBank = Math.min(...Object.values(byUnit));
  assert.ok(byUnit['u' + heaviest.n] > smallestBank,
    'unit ' + heaviest.n + ' carries the most marks (' + heaviest.marks +
    ') and does not have more questions than the smallest unit');

  assert.ok(bank.length >= 55 && bank.length <= 75,
    'the bank holds ' + bank.length + ' questions; the blueprint target for 50 marks is 55-75');

  /* and the weighting is real rather than claimed: the four heaviest
     units by marks must hold more than half the bank between them */
  const heavy = [...grid[KEY].units].sort((a, b) => b.marks - a.marks).slice(0, 4)
    .reduce((a, u) => a + (byUnit['u' + u.n] || 0), 0);
  assert.ok(heavy > bank.length / 2,
    'the four heaviest units hold ' + heavy + ' of ' + bank.length +
    ' questions, so the bank is not weighted to the paper');
});

test('the bank has questions at every difficulty, and the draw is smaller than the bank', () => {
  const d = {};
  for (const q of bank) d[q.difficulty] = (d[q.difficulty] || 0) + 1;
  for (const level of ['easy', 'medium', 'hard']){
    assert.ok(d[level] >= 8,
      'only ' + (d[level] || 0) + ' ' + level + ' questions — a paper needs all three');
  }

  const section = fs.readFileSync(path.join(SRC, 'content', 'sections', 'c-quiz.html'), 'utf8');
  const limit = Number((/data-limit="(\d+)"/.exec(section) || [])[1]);
  assert.ok(limit > 0, 'the quiz section has no draw limit');
  assert.ok(bank.length > limit,
    'the bank (' + bank.length + ') is not larger than the draw (' + limit +
    '), so a retake is the same paper reordered');
  /* and the chip above the quiz must agree with the draw, which is a
     thing the two have disagreed about elsewhere in this product */
  assert.match(section, new RegExp('<span class="marks">' + limit + ' questions</span>'),
    'the quiz section claims a different number of questions from the draw it asks for');
});

test('every question is answerable, bilingual and free of markup', () => {
  /* THE MARKUP RULE, AND WHY IT IS NOT A BARE TAG MATCH.
     The quiz engine escapes every string it renders, so HTML in a bank
     string reaches the student as literal angle brackets. That is the
     defect worth catching. But a C question legitimately contains
     `#include <stdio.h>`, which a bare /<[a-z][^>]*>/ reads as a tag —
     and a guard that cannot tell C from markup would force the content
     to be wrong to satisfy the test. So the check names the HTML
     elements this product actually uses. */
  const HTML_TAG = /<\/?(?:a|b|i|u|p|br|hr|em|strong|span|div|code|pre|ul|ol|li|table|tr|td|th|h[1-6]|img|button|section|figure|small|sup|sub)\b[^>]*>/i;
  const seen = new Set();
  for (const q of bank){
    assert.ok(!seen.has(q.id), 'duplicate question id ' + q.id);
    seen.add(q.id);
    assert.strictEqual(q.subject, KEY, q.id + ' claims another subject');
    assert.match(q.topic, /^[a-z0-9]+(-[a-z0-9]+)*$/, q.id + ': topic is not a kebab-case slug');
    assert.ok(q.options.length >= 2, q.id + ': fewer than two options');
    assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length,
      q.id + ': answer index out of range');
    assert.ok(q.prompt.ne && /[ऀ-ॿ]/.test(q.prompt.ne), q.id + ': prompt has no Nepali');
    assert.ok(q.explanation.ne && /[ऀ-ॿ]/.test(q.explanation.ne),
      q.id + ': explanation has no Nepali');
    for (const o of q.options) assert.ok(o.ne, q.id + ': an option has no Nepali');
    for (const s of [q.prompt.en, q.prompt.ne, q.explanation.en, q.explanation.ne,
                     ...q.options.map(o => o.en), ...q.options.map(o => o.ne)]){
      assert.ok(!HTML_TAG.test(s),
        q.id + ' contains HTML, which the quiz renders as literal tags: ' + s.slice(0, 60));
    }
  }

  /* one topic slug per question keeps the bank from asking the same
     thing under different words */
  const topics = new Map();
  bank.forEach(q => topics.set(q.topic, (topics.get(q.topic) || 0) + 1));
  for (const [t, n] of topics){
    assert.ok(n <= 3, 'topic "' + t + '" is asked ' + n + ' times');
  }
});

/* ---------------------------------------------- 4 · the components */

test('every drill this subject mounts exists and is answerable', () => {
  const SETS = require(path.join(SRC, 'runtime', 'sim-drill.js')).SETS;
  let mounted = 0;
  for (let u = 1; u <= 7; u++){
    const html = readLesson(u);
    for (const m of html.matchAll(/class="drill"[^>]*data-set="([^"]+)"/g)){
      const set = SETS[m[1]];
      assert.ok(set, 'unit ' + u + ' mounts drill "' + m[1] + '", which is not a set');
      const ids = set.options.map(o => o.id);
      assert.ok(set.cases.length >= 4, m[1] + ' has only ' + set.cases.length + ' cases');
      for (const c of set.cases){
        assert.ok(ids.includes(c.answer),
          m[1] + ': a case answers "' + c.answer + '", which is not one of its options');
      }
      mounted++;
    }
  }
  assert.ok(mounted >= 8, 'expected a decision drill in most units, found ' + mounted);
});

test('every drill set written for this subject is actually mounted', () => {
  /* A set nobody shows is content a student will never reach, and its
     Nepali reaches no reviewer either — the Phase 13.1 finding, held
     here so it cannot recur for this subject. */
  const SETS = require(path.join(SRC, 'runtime', 'sim-drill.js')).SETS;
  /* Named rather than matched on a prefix. `cflowsym` begins with the
     same two letters as the Computer Fundamentals sets and `cardinality`
     begins with the same one as all of these, so any pattern narrow
     enough to exclude the other subjects would quietly exclude one of
     this subject's own. */
  const mine = ['clangcat', 'cflowsym', 'cformat', 'coperator', 'cloop', 'cjump',
                'cfuncpart', 'ccallby', 'cstrfunc', 'cstructunion', 'cpointerop'];
  for (const name of mine){
    assert.ok(SETS[name], 'drill set "' + name + '" is named here and is not in sim-drill.js');
  }
  const html = [1, 2, 3, 4, 5, 6, 7].map(readLesson).join('\n');
  for (const name of mine){
    assert.ok(html.includes('data-set="' + name + '"'),
      'drill set "' + name + '" is authored and no C lesson mounts it');
  }
  assert.ok(mine.length >= 8, 'expected at least eight C drill sets, found ' + mine.length);
});

test('the runtime each page needs is actually loaded on it', () => {
  const NEEDS = [
    { mark: /class="drill"/,   js: 'sim-drill.js' },
    { mark: /class="crun"/,    js: 'sim-crun.js' },
    { mark: /class="crun"/,    js: 'program-bank.js' },
    { mark: /class="guided"/,  js: 'guided.js' },
    { mark: /class="predict"/, js: 'predict.js' },
    { mark: /data-practical=/, js: 'practical.js' }
  ];
  for (const p of pages[KEY].pages){
    if (typeof p.hrs !== 'number') continue;
    const src = p.sec.map(s => fs.readFileSync(
      path.join(SRC, 'content', 'lessons', s + '.html'), 'utf8')).join('\n');
    const built = readBuilt(p.file);
    for (const { mark, js } of NEEDS){
      if (!mark.test(src)) continue;
      assert.ok((p.js || []).includes(js),
        p.file + ' mounts ' + mark + ' and does not list ' + js + ' in pages.js');
      assert.ok(built.includes(js),
        p.file + ' lists ' + js + ' and the built page does not load it');
    }
    /* order: the engine before the data it registers */
    if (/class="crun"/.test(src)){
      assert.ok(built.indexOf('sim-crun.js') < built.indexOf('program-bank.js'),
        p.file + ': program-bank.js runs before sim-crun.js, so register() has no registry');
    }
  }
});

/* ---------------------------------------------- 5 · the C itself */

/* Decode the entities an author writes so that `<` and `&` reach the
   checker as C rather than as markup. */
function decode(s){
  return s.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"').replace(/&amp;/g, '&');
}

/* Blank out comments, string literals and character constants, keeping
   the length so that offsets still line up. Everything in §5 that
   counts a bracket or looks for a keyword runs on the blanked text, so
   a brace inside a printf string cannot unbalance a program. */
function blank(code){
  let out = '';
  for (let i = 0; i < code.length; i++){
    const c = code[i];
    if (c === '/' && code[i + 1] === '*'){
      const end = code.indexOf('*/', i + 2);
      const stop = end < 0 ? code.length : end + 2;
      for (let k = i; k < stop; k++) out += (code[k] === '\n' ? '\n' : ' ');
      i = stop - 1; continue;
    }
    if (c === '/' && code[i + 1] === '/'){
      while (i < code.length && code[i] !== '\n'){ out += ' '; i++; }
      out += '\n'; continue;
    }
    if (c === '"' || c === "'"){
      const quote = c;
      out += ' '; i++;
      while (i < code.length && code[i] !== quote){
        if (code[i] === '\\'){ out += '  '; i += 2; continue; }
        out += (code[i] === '\n' ? '\n' : ' '); i++;
      }
      out += ' '; continue;
    }
    out += c;
  }
  return out;
}

/* Every code block the subject shows a student, from both places they
   live: the lessons and the stepper programs. */
function codeBlocks(){
  const out = [];
  for (let u = 1; u <= 7; u++){
    const html = readLesson(u);
    for (const m of html.matchAll(/<pre class="cpp"([^>]*)>([\s\S]*?)<\/pre>/g)){
      if (/data-broken/.test(m[1])) continue;
      out.push({ where: 'c-u' + u + '.html', code: decode(m[2]) });
    }
  }
  for (const p of programs){
    out.push({ where: 'programs/' + p.id, code: p.code.join('\n') });
  }
  return out;
}

test('every C listing balances its brackets', () => {
  for (const { where, code } of codeBlocks()){
    const text = blank(code);
    for (const [open, close] of [['{', '}'], ['(', ')'], ['[', ']']]){
      let depth = 0;
      for (const ch of text){
        if (ch === open) depth++;
        else if (ch === close) depth--;
        assert.ok(depth >= 0, where + ': a "' + close + '" closes something that was never opened');
      }
      assert.strictEqual(depth, 0,
        where + ': "' + open + '" and "' + close + '" do not balance (off by ' + depth + ')');
    }
  }
});

test('a complete C program has main and the headers it uses', () => {
  /* "Complete" means the listing carries a preprocessor directive, which
     is how this subject writes a program the student is meant to compile.
     A fragment — a syntax skeleton, a few lines of an expression — is
     not held to this, because it is not claiming to be a program. */
  for (const { where, code } of codeBlocks()){
    const text = blank(code);
    const complete = /#include/.test(text);
    if (!complete) continue;

    assert.match(text, /\bint\s+main\s*\(/,
      where + ': a complete program with no int main() — nothing would know where to begin');
    assert.match(text, /\breturn\s+0\s*;/,
      where + ': main does not return 0, which this subject teaches as part of the skeleton');

    if (/\b(printf|scanf|getchar|putchar)\s*\(/.test(text)){
      assert.match(text, /#include\s*<stdio\.h>/,
        where + ': uses a stdio function and does not include <stdio.h>');
    }
    if (/\bstr(len|cpy|cat|cmp|rev|lwr|upr)\s*\(/.test(text)){
      assert.match(text, /#include\s*<string\.h>/,
        where + ': uses a string function and does not include <string.h>');
    }
  }
});

test('no C listing has slipped into C++', () => {
  /* This subject is taught beside Grade 10 C++, and the single easiest
     authoring mistake is to write one in the other. Each marker below
     compiles in C++ and does not compile in C. */
  const CPP = [
    [/\bcout\b/, 'cout'], [/\bcin\b/, 'cin'], [/\bendl\b/, 'endl'],
    [/\busing\s+namespace\b/, 'using namespace'], [/\biostream\b/, 'iostream'],
    [/\bclass\s+\w+\s*\{/, 'class'], [/\bnew\s+\w+/, 'new'], [/::/, '::']
  ];
  for (const { where, code } of codeBlocks()){
    const text = blank(code);
    for (const [re, name] of CPP){
      assert.ok(!re.test(text), where + ': "' + name + '" is C++, not C');
    }
  }
});

/* Pull out one call's argument list, respecting nesting, from a blanked
   copy of the code — so a comma inside a string or inside brackets is
   not mistaken for an argument separator. */
function callsTo(name, raw){
  const text = blank(raw);
  const out = [];
  const re = new RegExp('\\b' + name + '\\s*\\(', 'g');
  let m;
  while ((m = re.exec(text))){
    let depth = 1, i = m.index + m[0].length;
    const start = i;
    while (i < text.length && depth > 0){
      if (text[i] === '(') depth++;
      else if (text[i] === ')') depth--;
      i++;
    }
    if (depth !== 0) continue;                   /* unbalanced; §5.1 reports it */
    const inner = text.slice(start, i - 1);
    const rawInner = raw.slice(start, i - 1);
    /* split on top-level commas */
    const args = [];
    let d = 0, last = 0;
    for (let k = 0; k < inner.length; k++){
      const c = inner[k];
      if (c === '(' || c === '[') d++;
      else if (c === ')' || c === ']') d--;
      else if (c === ',' && d === 0){ args.push(rawInner.slice(last, k).trim()); last = k + 1; }
    }
    args.push(rawInner.slice(last).trim());
    out.push({ args: args.filter(a => a.length), format: raw.slice(start, i - 1) });
  }
  return out;
}

/* The conversion specifiers in a format string, with %% excluded —
   it prints a per-cent sign and consumes no argument. */
function specifiers(format){
  const q = /"((?:[^"\\]|\\.)*)"/.exec(format);
  if (!q) return null;
  const spec = q[1].replace(/%%/g, '');
  return (spec.match(/%[-+ #0]*[0-9*]*(?:\.[0-9*]+)?(?:hh|h|ll|l|L|z|j|t)?[diouxXeEfgGaAcspn]/g) || []);
}

test('every printf and scanf has one argument per conversion specifier', () => {
  /* The mistake this catches is the one that does not stop the compiler
     and does not stop the program: printf believes the format string
     without checking it, so a missing argument prints whatever happens
     to be in the next register. */
  for (const { where, code } of codeBlocks()){
    for (const fn of ['printf', 'scanf']){
      for (const call of callsTo(fn, code)){
        const spec = specifiers(call.format);
        if (spec === null) continue;             /* format is not a literal */
        const given = call.args.length - 1;      /* minus the format string */
        assert.strictEqual(given, spec.length,
          where + ': ' + fn + ' has ' + spec.length + ' specifier(s) (' + spec.join(' ') +
          ') and ' + given + ' argument(s) — ' + call.format.slice(0, 60));
      }
    }
  }
});

test('every scanf argument that needs an ampersand has one', () => {
  /* scanf writes INTO its arguments, so it needs an address. %s is the
     exception: a char array name already is one, which is the fact Unit
     5 and Unit 7 both turn on. */
  for (const { where, code } of codeBlocks()){
    for (const call of callsTo('scanf', code)){
      const spec = specifiers(call.format);
      if (spec === null) continue;
      call.args.slice(1).forEach((arg, i) => {
        if (spec[i] === '%s') return;
        assert.ok(arg.startsWith('&'),
          where + ': scanf writes into "' + arg + '" with ' + (spec[i] || '?') +
          ' and no ampersand, so it would write to whatever address that value happens to be');
      });
    }
  }
});

/* ---------------------------------------------- 6 · the stepper */

test('every stepper program is internally consistent', () => {
  const ids = new Set();
  for (const p of programs){
    assert.ok(p.id && !ids.has(p.id), 'duplicate program id ' + p.id);
    ids.add(p.id);
    assert.strictEqual(p.subject, KEY, p.id + ': claims another subject');
    assert.match(p.unit, /^c-u[1-7]$/, p.id + ': unit "' + p.unit + '" is not a C unit');
    assert.ok(p.title.en && p.title.ne, p.id + ': the title is not bilingual');
    assert.ok(Array.isArray(p.code) && p.code.length, p.id + ': no code');
    assert.ok(Array.isArray(p.steps) && p.steps.length >= 3, p.id + ': too few steps to teach');

    for (const s of p.steps){
      assert.ok(Number.isInteger(s.line) && s.line >= 1 && s.line <= p.code.length,
        p.id + ': a step points at line ' + s.line + ' of a ' + p.code.length + '-line program');
      assert.ok(s.en && s.ne, p.id + ' line ' + s.line + ': the caption is not bilingual');
      assert.ok(/[ऀ-ॿ]/.test(s.ne), p.id + ' line ' + s.line + ': the Nepali is not Devanagari');
      for (const v of Object.keys(s.set || {})){
        assert.ok(p.vars.includes(v),
          p.id + ': a step sets "' + v + '", which is not one of the variables it shows');
      }
    }
    /* a variable column nothing ever writes to is a row of dashes */
    const touched = new Set();
    p.steps.forEach(s => Object.keys(s.set || {}).forEach(v => touched.add(v)));
    for (const v of p.vars){
      assert.ok(touched.has(v), p.id + ': variable "' + v + '" is shown and never set');
    }
    /* a call stack that is pushed and never popped leaves the panel full */
    if (p.stack){
      let depth = 0;
      for (const s of p.steps){ if (s.push) depth++; if (s.pop) depth--; }
      assert.ok(depth >= 0, p.id + ': the call stack pops more frames than it pushes');
    }
  }
});

test('a loop counter only changes on the line that changes it', () => {
  /* THE PHASE 14.1 DEFECT, held so it cannot come back.
     forSum, arraySum and breakContinue each compressed a turn into one
     step, so `i` was shown changing while the BODY line was lit — on
     three of five turns in forSum, four of five in arraySum, and every
     turn in breakContinue. The captions even read "i became 3" beside a
     line that cannot change i.

     It is not a cosmetic slip. forSum exists to show where each of the
     three parts of a for line runs, and arraySum exists to show that an
     index is one less than you say out loud. A stepper that puts the
     increment on the wrong line is teaching against its own lesson.

     The rule is exact and needs no judgement: if a program contains
     `for (X = …; …; X++)`, then every step that sets X must highlight
     that for line, because no other line in the program touches it. */
  for (const p of programs){
    p.code.forEach((line, idx) => {
      const m = /^\s*for\s*\(\s*([A-Za-z_]\w*)\s*=[^;]*;[^;]*;\s*\1\s*(\+\+|\+=)/.exec(line);
      if (!m) return;
      const counter = m[1];
      const forLine = idx + 1;
      p.steps.forEach((s, si) => {
        if (!s.set || !(counter in s.set)) return;
        if (s.set[counter] === '?') return;            /* the "not yet set" row */
        assert.strictEqual(s.line, forLine,
          p.id + ' step ' + (si + 1) + ' sets "' + counter + '" to ' + s.set[counter] +
          ' while line ' + s.line + ' is highlighted — but ' + counter +
          ' changes on line ' + forLine + ', the for line. Line ' + s.line + ' is "' +
          (p.code[s.line - 1] || '').trim() + '".');
      });
    });
  }
});

test('what a stepper prints agrees with what its program declares', () => {
  /* TWO INDEPENDENT AUTHORINGS THAT MUST AGREE, which is the strongest
     check available without a compiler. `output` says what the finished
     program prints; the steps say what is printed and when. A stepper
     whose narration has drifted from its program is the failure this
     catches, and nothing else in the suite would see it. */
  const flat = s => s.replace(/\\n/g, '').replace(/\s+/g, ' ').trim();
  for (const p of programs){
    const fromSteps = flat(p.steps.filter(s => s.out != null).map(s => s.out).join(''));
    const declared = flat((p.output || []).join(''));
    assert.strictEqual(fromSteps, declared,
      p.id + ': the steps print "' + fromSteps + '" and the program declares "' + declared + '"');
  }
});

test('every stepper program a lesson mounts exists, and every one written is mounted', () => {
  const known = new Set(programs.map(p => p.id));
  const used = new Set();
  for (let u = 1; u <= 7; u++){
    const html = readLesson(u);
    for (const m of html.matchAll(/class="crun"[^>]*data-program="([^"]+)"/g)){
      assert.ok(known.has(m[1]),
        'c-u' + u + '.html mounts program "' + m[1] + '", which no bank registers — the student ' +
        'would meet a message where the stepper should be');
      used.add(m[1]);
      /* and it is mounted in the unit it says it belongs to */
      const prog = programs.find(x => x.id === m[1]);
      assert.strictEqual(prog.unit, 'c-u' + u,
        m[1] + ' is declared for ' + prog.unit + ' and is mounted in c-u' + u);
    }
  }
  for (const id of known){
    assert.ok(used.has(id), 'program "' + id + '" is authored and no lesson shows it');
  }
});
