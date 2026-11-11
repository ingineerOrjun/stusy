/* ============================================================
   SUBJECT STATUS, COUNTS AND SUBJECT-SPECIFIC QUIZ FEEDBACK

   WHAT IS BEING PROTECTED

   A boolean was asked a three-state question for four phases, and when
   a subject arrived with one unit of seven authored, every page that
   consulted it said something false:

     home page    "4 subjects are written in full — … — across 25 units",
                  crediting four complete Grade 10 subjects with a Grade
                  9 unit, two of its diagrams, one simulator, four
                  questions and eight hours. The four have 24 units.

     grade index  Computer and Application labelled "syllabus outline",
                  identical to three subjects with nothing written

     grade index  `s.done ? 6` units for every finished subject — right
                  for OOP and Hardware, wrong for DBMS (7) and Digital
                  Design (5)

     quiz         "Re-read Units 3, 5 and 6" shown to students of five
                  subjects, four of which have no such units to re-read

   None of these were caught by a test, because every test asked whether
   the markup existed and none asked whether the number in it was true.

   Each guard below was confirmed to fail against a deliberately wrong
   value before it was kept; the mutation is named beside it.
   ============================================================ */
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, '_source');

const ctx = require(path.join(SRC, 'build', 'context.js'));
const site = require(path.join(SRC, 'config', 'site.js'));
const pages = require(path.join(SRC, 'config', 'pages.js'));
const syllabus = require(path.join(SRC, 'content', 'syllabus.js'));

const readPage = rel => fs.readFileSync(path.join(ROOT, rel), 'utf8');

/* The build's bilingual pass wraps English prose that sits beside a
   Nepali gloss in <span class="t-en">, and its markNepali pass adds
   lang="ne" to every Nepali container. Both run after these strings are
   written, so a test that matches the source template matches nothing in
   the built page. These read the built page as it ships. */
const cardName = card => {
  const m = /<h3>(?:<span class="t-en">)?([^<]+)/.exec(card);
  return m && m[1];
};
/* Tags out, entities in, whitespace flattened — enough to assert on the
   sentence a student actually reads rather than on the markup. */
const textOf = html => html
  .replace(/<[^>]+>/g, ' ')
  .replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ')
  .replace(/\s+/g, ' ').trim();

/* ============================================================
   1 · THE DERIVED STATUS ITSELF
   ============================================================ */

test('every subject has a status derived from its syllabus and its pages', () => {
  /* Updated in Phase 13, when Computer Fundamentals went from 1 of 7
     units to 7 of 7, and again in Phase 14 for Programming Principles
     in C. The figures below are the authoring state, so they move
     whenever a unit is written — which is the point. What must never
     move is the RELATIONSHIP between them, and the test below this one
     checks that independently against the syllabus and the pages. */
  const expected = {
    'grade9/c-programming':         { authored: 7, official: 7, state: 'complete' },
    'grade9/computer-fundamentals': { authored: 7, official: 7, state: 'complete' },
    'grade9/electro-system':        { authored: 0, official: 7, state: 'outline'  },
    'grade9/website-design':        { authored: 0, official: 7, state: 'outline'  },
    'grade10/oop-cpp':              { authored: 6, official: 6, state: 'complete' },
    'grade10/hardware':             { authored: 6, official: 6, state: 'complete' },
    'grade10/dbms':                 { authored: 7, official: 7, state: 'complete' },
    'grade10/digital-design':       { authored: 5, official: 5, state: 'complete' }
  };
  assert.deepStrictEqual(Object.keys(ctx.subjectStatus).sort(), Object.keys(expected).sort(),
    'a subject appeared or vanished from the site map');

  for (const [key, want] of Object.entries(expected)){
    const got = ctx.subjectStatus[key];
    assert.strictEqual(got.authoredUnits, want.authored, key + ' authored units');
    assert.strictEqual(got.officialUnits, want.official, key + ' official units');
    assert.strictEqual(got.state, want.state,
      key + ' is reported "' + got.state + '" and is ' + want.state);
  }
});

test('status is computed, not read from the done flag', () => {
  /* MUTATION: set `done: true` on an outline-only Grade 9 subject. The
     derived state must not move, and §4 catches the disagreement. */
  for (const key of Object.keys(ctx.subjectStatus)){
    const s = ctx.subjectStatus[key];
    const official = (syllabus[key] || []).length;
    const authored = ((pages[key] && pages[key].pages) || [])
      .filter(p => typeof p.hrs === 'number').length;
    assert.strictEqual(s.officialUnits, official, key + ': official count is not the syllabus');
    assert.strictEqual(s.authoredUnits, authored, key + ': authored count is not the pages');
    const expect = authored === 0 ? 'outline' : authored < official ? 'partial' : 'complete';
    assert.strictEqual(s.state, expect, key + ': state does not follow from the two counts');
  }
});

test('no subject is called complete while a unit is unwritten', () => {
  /* The rule the whole file exists for. */
  for (const key of Object.keys(ctx.subjectStatus)){
    const s = ctx.subjectStatus[key];
    if (s.state !== 'complete') continue;
    assert.strictEqual(s.authoredUnits, s.officialUnits,
      key + ' is reported complete with ' + s.authoredUnits + ' of ' +
      s.officialUnits + ' units written');
  }
});

test('the done flag in site.js agrees with the derived state', () => {
  /* Two records of the same fact are one record and one bug waiting.
     Nothing in the build reads `done` any more; this keeps it honest for
     whatever else might. */
  for (const g of site){
    for (const s of g.subjects){
      const st = ctx.subjectStatus[g.id + '/' + s.slug];
      assert.strictEqual(!!s.done, st.state === 'complete',
        g.id + '/' + s.slug + ': site.js says done=' + !!s.done +
        ' and ' + st.authoredUnits + ' of ' + st.officialUnits + ' units are written');
    }
  }
});

/* ============================================================
   2 · FINDING D — THE UNIT COUNTS ON THE GRADE INDEX
   ============================================================ */

test('the grade index states each subject’s real unit count', () => {
  /* MUTATION: restore `const units = s.done ? 6` and this fails twice,
     naming DBMS and Digital Design. */
  const truth = {
    'Data Structure & OOP Concept using C++': 6,
    'Computer Hardware, Electronics Repair & Maintenance': 6,
    'Database Management System': 7,
    'Digital Design & Microprocessor': 5,
    'Programming Principles & Concept in C Language': 7,
    'Fundamentals of Computer and Application': 7,
    'Fundamentals of Electro-System': 7,
    'Website Design': 7
  };

  for (const grade of ['grade9', 'grade10']){
    const html = readPage(path.join(grade, 'index.html'));
    const cards = [...html.matchAll(/<a class="scard"[\s\S]*?<\/a>/g)].map(m => m[0]);
    assert.ok(cards.length === 4, grade + ' should show 4 subject cards, found ' + cards.length);

    for (const card of cards){
      const name = cardName(card);
      assert.ok(name && name in truth, grade + ': unrecognised subject card "' + name + '"');
      const stated = Number((/<span class="pill">(\d+) units<\/span>/.exec(card) || [])[1]);
      assert.strictEqual(stated, truth[name],
        grade + ' says ' + name + ' has ' + stated + ' units; it has ' + truth[name]);
    }
  }
});

test('no subject’s unit count is a constant', () => {
  /* The failure was not the number 6, it was that one number served
     every subject. If every card on a grade index agrees, that is worth
     knowing about rather than passing silently. */
  const html = readPage(path.join('grade10', 'index.html'));
  const counts = [...html.matchAll(/<span class="pill">(\d+) units<\/span>/g)].map(m => +m[1]);
  assert.strictEqual(counts.length, 4);
  assert.ok(new Set(counts).size > 1,
    'all four Grade 10 subjects report ' + counts[0] + ' units. They have 6, 6, 7 and 5.');
  assert.strictEqual(counts.reduce((a, b) => a + b, 0), 24,
    'the four Grade 10 subjects should total 24 units');
});

/* ============================================================
   3 · FINDING C — GRADE 9 SUBJECT STATUS ON THE PAGE
   ============================================================ */

test('every grade index labels each subject by its actual state', () => {
  /* REWRITTEN IN PHASE 13. This test used to name Computer Fundamentals
     and assert "1 of 7 units written". That was the authoring state of
     one day, and when the remaining six units were written the test
     failed for being out of date rather than for finding anything.

     It now reads the expected label off the derived status, so it holds
     whatever any subject's state happens to be — and it still fails if a
     page labels a subject as something it is not, which is the defect
     this guard exists for.

     MUTATION: give the partial branch SLABEL.outline.en in index.js and
     this fails on whichever subject is partial at the time. */
  const labelFor = st => st.state === 'partial'
    ? st.authoredUnits + ' of ' + st.officialUnits + ' units written'
    : { outline: 'syllabus outline', complete: 'notes ready' }[st.state];

  let checked = 0;
  for (const grade of ['grade9', 'grade10']){
    const html = readPage(path.join(grade, 'index.html'));
    const cards = [...html.matchAll(/<a class="scard"[\s\S]*?<\/a>/g)].map(m => m[0]);
    const byName = {};
    for (const card of cards) byName[cardName(card)] = textOf(card);

    for (const st of Object.values(ctx.subjectStatus)){
      if (st.grade !== grade) continue;
      const card = byName[st.name];
      assert.ok(card, grade + ': no card for ' + st.name);
      assert.ok(card.includes(labelFor(st)),
        st.name + ' is ' + st.state + ' (' + st.authoredUnits + '/' + st.officialUnits +
        ') and its card does not say "' + labelFor(st) + '": ' + card);

      /* and must not claim either of the other two states */
      for (const other of ['outline', 'partial', 'complete']){
        if (other === st.state) continue;
        const wrong = { outline: 'syllabus outline', complete: 'notes ready',
                        partial: 'units written' }[other];
        assert.ok(!card.includes(wrong),
          st.name + ' is ' + st.state + ' and its card also claims "' + wrong + '"');
      }
      checked++;
    }
  }
  assert.strictEqual(checked, 8, 'expected 8 subject cards across the two grades');
});

test('a status label that appears is also stated in Nepali', () => {
  /* Whatever state a subject is in, a Nepali-mode reader must get the
     same information. Checked for every card rather than for one named
     subject, so it keeps working as subjects are written. */
  for (const grade of ['grade9', 'grade10']){
    const html = readPage(path.join(grade, 'index.html'));
    for (const card of html.matchAll(/<a class="scard"[\s\S]*?<\/a>/g)){
      const status = /<span class="status [^"]*">([\s\S]*?)<\/span>\s*<span class="pill">/.exec(card[0]);
      assert.ok(status, grade + ': a subject card has no status label');
      assert.match(status[1], /[ऀ-ॿ]/,
        grade + ': a status label carries no Nepali — ' + textOf(status[1]));
      assert.match(status[1], /lang="ne"/,
        grade + ': the Nepali half of a status label does not declare its language');
    }
  }
});

test('every authored unit of a complete subject is reachable from its index', () => {
  /* Was "Grade 9 Unit 1 is still reachable". Generalised in Phase 13:
     a subject page that links six of its seven units is a page a student
     cannot finish the subject from, and nothing else would catch it. */
  for (const [key, st] of Object.entries(ctx.subjectStatus)){
    if (!st.authoredUnits) continue;
    const html = readPage(path.join(key, 'index.html'));
    for (const p of pages[key].pages){
      if (typeof p.hrs !== 'number') continue;
      assert.ok(html.includes('href="' + p.file + '"'),
        key + '/index.html does not link ' + p.file);
      assert.ok(fs.existsSync(path.join(ROOT, key, p.file)),
        key + '/' + p.file + ' is linked and does not exist');
    }
  }
});

/* ============================================================
   4 · FINDING B — THE HOME PAGE
   ============================================================ */

test('the home page credits finished subjects with finished subjects’ numbers', () => {
  /* MUTATION: put `S.units` back in place of `C.units` and this fails,
     because the sentence would then carry the site-wide total.

     The two assertions that used to pin C.subjects to 4 and C.units to
     24 were removed in Phase 13. They were a snapshot of one day's
     authoring state, and when Computer Fundamentals was finished they
     failed for being out of date rather than for finding anything — the
     page had already updated itself correctly to 5 and 31. What this
     test is for is that the SENTENCE matches the COMPLETE-subject
     totals, whatever those totals are, and the regex below checks
     exactly that. The arithmetic behind the totals is checked
     independently by the site-wide-equals-the-sum test. */
  const text = textOf(readPage('index.html'));
  const C = ctx.contentStats.complete;

  assert.ok(C.subjects > 0 && C.units > 0,
    'no subject is complete, so this guard has nothing to check — if that is ' +
    'intended, the home page sentence should not exist either');

  const claim = new RegExp(
    C.subjects + ' subjects are written in full[^.]*?across ' + C.units + ' units: ' +
    C.diagrams + ' diagrams, ' + C.animations + ' of them animated, ' +
    C.simulators + ' things you can actually operate, and ' + C.retrieval +
    ' practice questions');
  assert.match(text, claim,
    'the home page sentence does not match the complete-subject totals ' +
    JSON.stringify(C) + '. Sentence: ' +
    (/(\d+ subjects are written in full[^.]*\.)/.exec(text) || [])[1]);
});

test('every number in the finished-subjects sentence excludes the partial subject', () => {
  /* The defect was not one wrong number, it was five. Each is checked
     against the figure for the subject it describes. */
  const S = ctx.contentStats;
  const text = textOf(readPage('index.html'));
  const got = /(\d+) subjects are written in full.*?across (\d+) units: (\d+) diagrams, (\d+) of them animated, (\d+) things you can actually operate, and (\d+) practice questions/.exec(text);
  assert.ok(got, 'the finished-subjects sentence has changed shape');
  const [, subjects, units, diagrams, animated, sims, questions] = got.map(Number);

  for (const [what, shown, complete, siteWide] of [
    ['subjects',  subjects,  S.complete.subjects,   S.complete.subjects + S.partial.subjects],
    ['units',     units,     S.complete.units,      S.units],
    ['diagrams',  diagrams,  S.complete.diagrams,   S.diagrams],
    ['animated',  animated,  S.complete.animations, S.animations],
    ['operable',  sims,      S.complete.simulators, S.simulators],
    ['questions', questions, S.complete.retrieval,  S.retrieval]
  ]){
    assert.strictEqual(shown, complete,
      'the sentence says ' + shown + ' ' + what + '; complete subjects have ' +
      complete + ' and the whole site has ' + siteWide);
  }
});

test('the home page names every partly written subject, in both languages', () => {
  /* In Phase 13 the last partial subject was finished, so there is
     currently none. The sentence is generated per partial subject and
     must disappear entirely when there are none — leaving "0 subjects
     are partly written" would be its own defect — so that is what this
     asserts when the list is empty, and the full check runs whenever a
     subject is partial again. */
  const html = readPage('index.html');
  const text = textOf(html);
  const partial = Object.values(ctx.subjectStatus).filter(s => s.state === 'partial');

  if (!partial.length){
    assert.ok(!/is partly written/.test(text),
      'no subject is partly written and the home page says one is');
    assert.ok(!/आंशिक लेखिएको/.test(text),
      'no subject is partly written and the Nepali half says one is');
    return;
  }

  const ne = (html.match(/<div class="np"[^>]*>[\s\S]*?अहिले के तयार छ[\s\S]*?<\/div>\s*<\/div>/) || [])[0];
  assert.ok(ne, 'the Nepali half of the readiness block is missing');

  for (const p of partial){
    assert.match(text, new RegExp(p.short + ' \\(' + p.gradeLabel + '\\) is partly written'),
      p.short + ' is partly written and is not named on the home page');
    assert.match(text, new RegExp(p.authoredUnits + ' of its ' + p.officialUnits + ' units'),
      'the home page does not say how much of ' + p.short + ' is written');
    assert.match(textOf(ne), new RegExp(p.officialUnits + ' मध्ये ' + p.authoredUnits + ' युनिट'),
      'the Nepali half does not state ' + p.short + '’s fraction');
  }
});

test('the home page marks a partly written subject differently from an empty one', () => {
  /* MUTATION: give the partial chip class "on" and this fails; give it
     "" and it fails the other way. */
  const html = readPage('index.html');
  const g9 = (html.match(/<a class="gcard" href="grade9\/index\.html"[\s\S]*?<\/a>/) || [])[0];
  assert.ok(g9, 'the Grade 9 card is missing from the home page');
  /* Scoped to .ready — the card's heading also contains spans, and the
     bilingual pass adds more, so an unscoped scan counts six "chips". */
  const ready = (g9.match(/<div class="ready">[\s\S]*?<\/div>/) || [])[0];
  assert.ok(ready, 'the Grade 9 card has no readiness chips');
  const chips = [...ready.matchAll(/<span class="([^"]*)"[^>]*>([^<]+)<\/span>/g)]
    .map(m => ({ cls: m[1], name: m[2] }));

  /* Read off the derived status rather than naming a subject, so this
     holds as subjects are written. Phase 13 finished Computer
     Fundamentals, and before that change this test named it directly. */
  const EXPECT = { complete: 'on', partial: 'part', outline: '' };
  assert.strictEqual(chips.length, 4, 'the Grade 9 card should show four subject chips');

  for (const chip of chips){
    const st = Object.values(ctx.subjectStatus)
      .find(s => s.grade === 'grade9' && s.short === chip.name);
    assert.ok(st, 'no subject matches the chip "' + chip.name + '"');
    assert.strictEqual(chip.cls, EXPECT[st.state],
      chip.name + ' is ' + st.state + ' and its chip is marked "' + chip.cls +
      '" instead of "' + EXPECT[st.state] + '"');
  }

  /* The point of the three looks is that they differ. If every Grade 9
     subject ever reaches the same state this assertion should be the one
     a future author has to think about, rather than the styling quietly
     ceasing to mean anything. */
  const states = new Set(chips.map(c => c.cls));
  assert.ok(states.size > 1,
    'every Grade 9 chip now looks the same, so the readiness styling tells a student nothing');
});

test('a diagram used by two subjects is counted once, not twice', () => {
  /* PHASE 13 DEFECT. Every other figure in the roll-up belongs to one
     subject, so adding them is right. A diagram does not: the registry
     is shared. Grade 9 Unit 2 reuses Hardware's hwSystemUnits, and the
     roll-up was a plain sum, so the home page claimed 76 distinct
     diagrams when 75 exist.

     The existing sentence test did not catch it. It compared the page
     against the same context object that produced the page, so both
     sides carried the same wrong number. This one compares against the
     lesson files and the registry instead.

     MUTATION: restoring `out[f] += ...` for diagrams in sumWhere makes
     this fail with 76 against 75. Confirmed. */
  const S = ctx.contentStats;
  const registry = require(path.join(SRC, 'diagrams.js'));
  const pages = require(path.join(SRC, 'config', 'pages.js'));
  const lessonDir = path.join(SRC, 'content', 'lessons');

  const setFor = key => {
    const cfg = pages[key];
    const ids = [];
    if (cfg) for (const p of cfg.pages){
      if (typeof p.hrs !== 'number') continue;
      for (const id of (p.sec || [])) ids.push(id);
    }
    const text = ids.map(id => {
      const f = path.join(lessonDir, id + '.html');
      return fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : '';
    }).join('\n');
    return new Set([...text.matchAll(/\{\{dia:([A-Za-z0-9_]+)\}\}/g)].map(m => m[1]));
  };

  /* The overlap has to exist, or this test proves nothing. */
  const owners = {};
  for (const key of Object.keys(pages)){
    for (const d of setFor(key)) (owners[d] = owners[d] || []).push(key);
  }
  const shared = Object.entries(owners).filter(([, v]) => v.length > 1);
  assert.ok(shared.length > 0,
    'no diagram is shared between subjects any more, so this guard is vacuous — ' +
    'either restore the reuse or delete the test, but do not leave it passing for ' +
    'the wrong reason');

  const union = new Set();
  let sum = 0;
  for (const key of Object.keys(pages)){
    const s = setFor(key);
    sum += s.size;
    for (const d of s) union.add(d);
  }

  assert.ok(sum > union.size,
    'the sum and the union agree, so the bug could not reproduce; check the fixture');

  assert.strictEqual(S.complete.diagrams, union.size,
    'the complete-subjects roll-up says ' + S.complete.diagrams +
    ' diagrams; the lessons of those subjects use ' + union.size +
    ' distinct ones (a plain sum would give ' + sum + ')');

  assert.ok(S.complete.diagrams <= Object.keys(registry).length,
    'the roll-up claims ' + S.complete.diagrams + ' diagrams, but only ' +
    Object.keys(registry).length + ' are defined — a count of distinct things ' +
    'can never exceed the number that exist');
});

test('the site-wide and complete-subject totals differ by exactly the partial subject', () => {
  /* Both sets of numbers appear on the home page — the stat strip is
     site-wide, the sentence is not. They have to add up, or the page
     contradicts itself in a way no single assertion would catch. */
  const S = ctx.contentStats;
  for (const f of ['units', 'simulators', 'retrieval', 'hours']){
    const key = f === 'simulators' ? 'simulators' : f;
    assert.strictEqual(S[key], S.complete[key] + S.partial[key] + S.outline[key],
      'site-wide ' + f + ' (' + S[key] + ') is not the sum of the three states');
  }
});

/* ============================================================
   5 · FINDING A — SUBJECT-SPECIFIC QUIZ FEEDBACK
   ============================================================ */

test('every subject with a quiz has its own revision focus', () => {
  for (const key of Object.keys(ctx.questionBanks)){
    const focus = ctx.examFocus[key];
    assert.ok(focus && focus.length,
      key + ' has a question bank and no revision focus, so its end-of-quiz ' +
      'message would name no unit');
  }
});

test('a revision focus never names a unit the subject does not have', () => {
  /* The original defect, in one assertion: Grade 9 must never be sent to
     Units 3, 5 and 6. MUTATION: add {n:'9'} to any focus and this fails. */
  for (const [key, focus] of Object.entries(ctx.examFocus)){
    const have = new Set((pages[key].pages || [])
      .filter(p => typeof p.hrs === 'number').map(p => String(p.n)));
    for (const u of focus){
      assert.ok(have.has(String(u.n)),
        key + ' sends a student to Unit ' + u.n + ', which it does not have. ' +
        'It has units ' + [...have].join(', '));
    }
  }
});

test('the Grade 9 focus names only units that exist', () => {
  /* The original defect this guards against: a Grade 9 student sent to
     "Units 3, 5 and 6" when the subject had one unit. Phase 13 wrote the
     other six, so the focus is now three units rather than one — which
     is why this reads the authored units rather than expecting ['1']. */
  const key = 'grade9/computer-fundamentals';
  const have = new Set(pages[key].pages
    .filter(p => typeof p.hrs === 'number').map(p => String(p.n)));
  const focus = ctx.examFocus[key];
  assert.ok(focus.length, 'Grade 9 has no revision focus at all');
  for (const u of focus){
    assert.ok(have.has(String(u.n)),
      'the Grade 9 quiz points at Unit ' + u.n + ', which it does not have. It has ' +
      [...have].join(', '));
  }
});

test('each subject’s focus is its own, and is where its marks are', () => {
  /* MUTATION: sort ascending by marks instead of descending and this
     fails, because the lightest units would be named. */
  const seen = new Set();
  for (const [key, focus] of Object.entries(ctx.examFocus)){
    const units = pages[key].pages.filter(p => typeof p.hrs === 'number');
    if (units.length < 2) continue;

    const named = new Set(focus.map(u => String(u.n)));
    const inFocus = units.filter(u => named.has(String(u.n)));
    const outside = units.filter(u => !named.has(String(u.n)));
    const lightestNamed = Math.min(...inFocus.map(u => u.marks));
    const heaviestNot = Math.max(...outside.map(u => u.marks));
    assert.ok(lightestNamed >= heaviestNot,
      key + ' sends a student to a ' + lightestNamed + '-mark unit while a ' +
      heaviestNot + '-mark unit goes unmentioned');

    assert.ok(focus.length <= Math.max(1, Math.ceil(units.length / 2)),
      key + ' names ' + focus.length + ' of ' + units.length + ' units — that is the ' +
      'syllabus, not a focus');

    seen.add(focus.map(u => u.n).join(','));
  }
  assert.ok(seen.size > 1, 'every subject got the same focus, so it is not subject-specific');
});

test('a focus unit carries both titles, so the message works in Nepali', () => {
  for (const [key, focus] of Object.entries(ctx.examFocus)){
    for (const u of focus){
      assert.ok(u.title && u.title.en && u.title.en.trim(),
        key + ' Unit ' + u.n + ' has no English title');
      assert.ok(u.title.ne && /[ऀ-ॿ]/.test(u.title.ne),
        key + ' Unit ' + u.n + ' has no Nepali title, so Nepali mode would show English');
    }
  }
});

test('the quiz engine reads the focus instead of naming units itself', () => {
  /* MUTATION: hardcode "Units 3, 5 and 6" back into a message and this
     fails. The comment above showScore quotes the old string, so
     comments are stripped before the scan — a guard a comment can trip
     is a guard the next author deletes. */
  const src = fs.readFileSync(path.join(SRC, 'runtime', 'quiz.js'), 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

  assert.match(src, /QuizService\.getFocus\(/,
    'the engine no longer asks the service which units to name');

  const body = /function showScore\(\)\{?[\s\S]*?\n\}/.exec(src);
  assert.ok(body, 'showScore() was renamed or removed');
  const msgs = [...body[0].matchAll(/msg(?:Np)?\s*=\s*'([^']*)'/g)].map(m => m[1]);
  assert.ok(msgs.length >= 8, 'the message scan found ' + msgs.length + ' — it has stopped reading');
  for (const m of msgs){
    assert.ok(!/\bUnits? \d/i.test(m),
      'a score message names a unit number literally: "' + m + '". Five subjects read it.');
    assert.ok(!/\bTrace\b/.test(m),
      'a score message names the Trace section, which only C++ has: "' + m + '"');
  }
});

test('the generated bank file registers a focus for every bank', () => {
  /* The empty-quiz defect taught this: a thing that exists in source and
     is never registered fails silently in the browser and nowhere else. */
  const gen = readPage(path.join('assets', 'js', 'question-bank.js'));
  for (const key of Object.keys(ctx.questionBanks)){
    assert.ok(gen.includes('QuizService.registerBank("' + key + '"'),
      key + ' has no registerBank call in the generated file');
    assert.ok(gen.includes('QuizService.registerFocus("' + key + '"'),
      key + ' has no registerFocus call, so its quiz would name no unit');
  }
});

test('one definition of "a unit page", shared by every rule that counts them', () => {
  /* `typeof p.hrs === 'number'` is written in four places: the status
     model, the examination focus, the teacher-focus join, and the
     coverage rule in validate.js. They agree today. If one ever drifts,
     a subject could be "complete" to the home page and partly covered to
     the build, and the two would disagree in public.

     This does not merge them — it holds them level. */
  const validateSrc = fs.readFileSync(path.join(SRC, 'build', 'validate.js'), 'utf8');
  const m = /const authoredUnits = new Set\(\s*cfg\.pages\.filter\(([^)]*)\)/.exec(validateSrc);
  assert.ok(m, 'the coverage rule no longer derives authored units the way this guard reads');
  assert.match(m[1], /typeof p\.hrs === 'number'/,
    'the coverage rule counts unit pages differently from the status model');

  for (const key of Object.keys(ctx.subjectStatus)){
    const cfg = pages[key];
    if (!cfg) { assert.strictEqual(ctx.subjectStatus[key].authoredUnits, 0); continue; }
    const byCoverageRule = cfg.pages.filter(p => typeof p.hrs === 'number').length;
    assert.strictEqual(ctx.subjectStatus[key].authoredUnits, byCoverageRule,
      key + ': the status model counts ' + ctx.subjectStatus[key].authoredUnits +
      ' unit pages and the coverage rule counts ' + byCoverageRule);
  }
});
