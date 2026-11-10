/* ============================================================
   ASSESSMENT SELECTION — the draw, not the questions

   WHY THIS FILE EXISTS, SEPARATELY FROM THE BANK GUARDS

   runtime.test.js checks the BANK: every question has an id, a unit, a
   difficulty, an answer index in range, and no unit is silently empty.
   Those are properties of the content.

   Nothing checked the DRAW. The OOP quiz serves 12 of 52 questions,
   reshuffled per attempt, and the only assertion anyone had written
   about that was the count. A shuffle that served one question twice, or
   lost one, or returned the same twelve every time, would have passed.
   Phase 9 shipped exactly that second defect in the other direction —
   the page carried neither data-limit nor data-shuffle, so every attempt
   was one fixed paper — and the suite was green throughout.

   A shuffle is also the one thing in this codebase that is deliberately
   non-deterministic, which is why `getQuiz` now accepts `opts.rand`. The
   page passes nothing and gets Math.random; these tests pass a seeded
   generator and can therefore name the exact paper they expect.
   ============================================================ */
const { test } = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const { createEnvironment } = require('./helpers/dom.js');

const ROOT = path.resolve(__dirname, '..');
const SUBJECT = 'grade10/oop-cpp';

function loadService(){
  const env = createEnvironment(['quizBox']);
  return env.loadAndGet(
    ['core.js', 'services/quiz.js', 'built:assets/js/question-bank.js'],
    ['QuizService']);
}

/* mulberry32 — a small seeded PRNG. Written out rather than imported so
   that a test's expected paper cannot change because a dependency did. */
function seeded(seed){
  let a = seed >>> 0;
  return function (){
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* The configuration the OOP quiz page actually ships. If this drifts,
   every expectation below is measuring a quiz no student takes. */
const PAGE = { limit: 12, shuffle: true };

test('the quiz page still asks for the draw these tests describe', () => {
  const fs = require('node:fs');
  const html = fs.readFileSync(path.join(ROOT, 'grade10', 'oop-cpp', 'quiz.html'), 'utf8');
  const m = html.match(/id="quizBox"([^>]*)>/);
  assert.ok(m, 'the built quiz page has no #quizBox');
  assert.match(m[1], new RegExp('data-limit="' + PAGE.limit + '"'),
    'the page no longer draws ' + PAGE.limit + ' questions');
  assert.match(m[1], /data-shuffle="true"/,
    'the page no longer shuffles, so every attempt is the same paper again');
});

/* ---------------------------------------------------------- the draw */

test('a drawn paper has no question twice', () => {
  /* The property a count can never show. A Fisher-Yates loop with the
     wrong bound duplicates an element and drops another, and the paper
     is still exactly 12 long. */
  const { QuizService } = loadService();
  for (let s = 1; s <= 40; s++){
    const paper = QuizService.getQuiz({ subject: SUBJECT, ...PAGE, rand: seeded(s) });
    const ids = paper.map(q => q.id);
    assert.strictEqual(new Set(ids).size, ids.length,
      'seed ' + s + ' served a question twice: ' + ids.join(', '));
  }
});

test('a drawn paper is drawn from the bank and loses nothing', () => {
  const { QuizService } = loadService();
  const bankIds = new Set(QuizService.getQuiz({ subject: SUBJECT }).map(q => q.id));
  assert.ok(bankIds.size > PAGE.limit, 'the bank is not bigger than one paper');

  for (let s = 1; s <= 40; s++){
    const paper = QuizService.getQuiz({ subject: SUBJECT, ...PAGE, rand: seeded(s) });
    assert.strictEqual(paper.length, PAGE.limit, 'seed ' + s + ' drew ' + paper.length);
    for (const q of paper){
      assert.ok(bankIds.has(q.id), 'seed ' + s + ' served ' + q.id + ', which is not in the bank');
    }
  }
});

test('a whole-bank shuffle is a permutation of the bank, at every seed', () => {
  /* Shuffling must reorder, never edit. Over the whole bank the drawn
     set and the bank must be the same set — which is the assertion the
     limit hides when only 12 of 52 come back: corruption at the tail of
     the array never reaches the first twelve.

     Many seeds rather than one, and that is not belt-and-braces. An
     off-by-one in the Fisher-Yates bound only bites when the loop
     happens to pick the out-of-range index, so a single seed passes a
     broken shuffle most of the time. Measured: with the bound wrong,
     one seed passed and the sweep below failed. */
  const { QuizService } = loadService();
  const bank = QuizService.getQuiz({ subject: SUBJECT }).map(q => q.id).sort();

  for (let s = 1; s <= 30; s++){
    const drawn = QuizService.getQuiz({ subject: SUBJECT, shuffle: true, rand: seeded(s) });
    assert.ok(drawn.every(q => q && q.id),
      'seed ' + s + ' put a hole in the paper — the shuffle indexed past the end');
    assert.deepStrictEqual(drawn.map(q => q.id).sort(), bank,
      'seed ' + s + ' changed which questions exist');
  }
});

test('the same seed gives the same paper, and a different seed does not', () => {
  const { QuizService } = loadService();
  const draw = (s) => QuizService.getQuiz({ subject: SUBJECT, ...PAGE, rand: seeded(s) })
    .map(q => q.id);

  assert.deepStrictEqual(draw(123), draw(123), 'the same seed produced two different papers');

  /* And the draw is actually a function of the seed. A shuffle that
     ignored `rand` would pass the line above and fail this one. */
  const distinct = new Set();
  for (let s = 1; s <= 12; s++) distinct.add(draw(s).join(','));
  assert.ok(distinct.size >= 10,
    'twelve seeds produced only ' + distinct.size + ' different papers');
});

test('over many attempts the draw reaches the whole bank', () => {
  /* THE PROPERTY THAT CATCHES THE DEFECT THIS FILE EXISTS FOR.

     If the limit were applied BEFORE the shuffle instead of after, every
     attempt would serve the same twelve questions in a different order.
     Each paper would still be twelve long, still be free of duplicates,
     still differ from the last one as a sequence — and forty questions
     would be unreachable. Every other test here passes that bug.

     What separates the two is the UNION across attempts. */
  const { QuizService } = loadService();
  const bank = QuizService.getQuiz({ subject: SUBJECT }).map(q => q.id);
  const seen = new Set();
  for (let s = 1; s <= 200; s++){
    QuizService.getQuiz({ subject: SUBJECT, ...PAGE, rand: seeded(s) })
      .forEach(q => seen.add(q.id));
  }
  assert.strictEqual(seen.size, bank.length,
    '200 attempts reached only ' + seen.size + ' of ' + bank.length + ' questions. ' +
    (seen.size <= PAGE.limit
      ? 'That is the size of one paper, so the limit is being applied before the shuffle.'
      : 'Some questions can never be drawn.'));
});

test('a retake is a different paper', () => {
  /* The student-facing promise. Measured with the real Math.random,
     because that is what a student gets: 30 attempts, and the first
     question must not be the same one every time. */
  const { QuizService } = loadService();
  const firsts = new Set();
  const papers = new Set();
  for (let i = 0; i < 30; i++){
    const paper = QuizService.getQuiz({ subject: SUBJECT, ...PAGE });
    firsts.add(paper[0].id);
    papers.add(paper.map(q => q.id).join(','));
  }
  assert.ok(firsts.size >= 5,
    '30 attempts opened with only ' + firsts.size + ' different questions');
  assert.ok(papers.size >= 25,
    '30 attempts produced only ' + papers.size + ' different papers');
});

/* -------------------------------------------------- selection boundaries */

test('selection boundaries behave, rather than returning something strange', () => {
  const { QuizService } = loadService();
  const all = QuizService.getQuiz({ subject: SUBJECT }).length;

  /* a limit past the end of the bank is the whole bank, not an error and
     not a padded array of undefined */
  const over = QuizService.getQuiz({ subject: SUBJECT, limit: all + 50 });
  assert.strictEqual(over.length, all);
  assert.ok(over.every(q => q && q.id), 'an over-long limit padded the paper');

  /* limit 0 and a negative limit mean "no limit", which is what the
     implementation does — pinned so a refactor cannot quietly turn
     limit: 0 into an empty quiz on a live page */
  assert.strictEqual(QuizService.getQuiz({ subject: SUBJECT, limit: 0 }).length, all);
  assert.strictEqual(QuizService.getQuiz({ subject: SUBJECT, limit: -3 }).length, all);

  assert.strictEqual(QuizService.getQuiz({ subject: SUBJECT, limit: 1 }).length, 1);
  assert.strictEqual(QuizService.getQuiz({ subject: SUBJECT, limit: '12' }).length, all,
    'a limit of the wrong TYPE must not be half-applied');

  /* filters that match nothing return nothing, and do not fall back to
     everything — a per-unit quiz for a unit with no questions must be
     visibly empty rather than silently the whole subject */
  assert.strictEqual(QuizService.getQuiz({ subject: SUBJECT, unit: 'u99' }).length, 0);
  assert.strictEqual(QuizService.getQuiz({ subject: SUBJECT, difficulty: 'nope' }).length, 0);
  assert.strictEqual(QuizService.getQuiz({ subject: 'no/such/subject' }).length, 0);
  assert.strictEqual(QuizService.getQuiz().length, 0, 'getQuiz() with no options threw or leaked');

  /* combined filters intersect */
  const u2hard = QuizService.getQuiz({ subject: SUBJECT, unit: 'u2', difficulty: 'hard' });
  assert.ok(u2hard.every(q => q.unit === 'u2' && q.difficulty === 'hard'),
    'two filters together leaked');

  /* and the service hands back a copy: a caller mutating its paper must
     not be able to shorten the bank for the next attempt */
  const paper = QuizService.getQuiz({ subject: SUBJECT, limit: 5 });
  paper.length = 0;
  assert.strictEqual(QuizService.getQuiz({ subject: SUBJECT }).length, all,
    'the service returned its internal array');
});

/* ------------------------------------------------- the shape of the bank */

test('every question points at a unit that exists, and a named topic', () => {
  /* "Valid topic references": the unit tag is checkable against the
     official grid, and a topic that is blank, duplicated across most of
     the bank, or not in the house slug form is a tagging mistake that
     would quietly break any future per-topic revision view. */
  const bank = require(path.join(ROOT, '_source/content/questions/grade10-oop-cpp.js'));
  const grid = require(path.join(ROOT, '_source/content/specification-grid.js'))[SUBJECT];
  const realUnits = new Set(grid.units.map(u => 'u' + u.n));

  for (const q of bank){
    assert.ok(realUnits.has(q.unit),
      q.id + ' is tagged ' + q.unit + ', which is not a unit of this subject');
    assert.match(q.topic, /^[a-z0-9]+(-[a-z0-9]+)*$/,
      q.id + ': topic "' + q.topic + '" is not a kebab-case slug');
  }

  const topics = new Map();
  bank.forEach(q => topics.set(q.topic, (topics.get(q.topic) || 0) + 1));
  assert.ok(topics.size >= bank.length * 0.8,
    'only ' + topics.size + ' distinct topics across ' + bank.length +
    ' questions — the bank is asking the same few things repeatedly');
  for (const [t, n] of topics){
    assert.ok(n <= 3, 'topic "' + t + '" is asked ' + n + ' times');
  }
});

test('the difficulty mix is a mix', () => {
  /* A bank that is all easy flatters the student and a bank that is all
     hard stops them. Neither is asserted to a ratio — that is the
     author's judgement — but an empty band or a band swallowing the
     bank is a mistake rather than a choice. */
  const bank = require(path.join(ROOT, '_source/content/questions/grade10-oop-cpp.js'));
  const by = { easy: 0, medium: 0, hard: 0 };
  bank.forEach(q => by[q.difficulty]++);

  for (const band of ['easy', 'medium', 'hard']){
    assert.ok(by[band] >= Math.max(3, Math.floor(bank.length * 0.08)),
      'only ' + by[band] + ' ' + band + ' questions in a bank of ' + bank.length);
    assert.ok(by[band] <= bank.length * 0.6,
      band + ' holds ' + by[band] + ' of ' + bank.length + ' questions');
  }
  /* and a 12-question draw should normally meet more than one band */
  assert.ok(Math.min(by.easy, by.medium, by.hard) * (12 / bank.length) >= 0.5,
    'one band is too thin to appear in a typical paper');
});

test('an option with no Nepali half is a value, not a sentence', () => {
  /* The fallback rule (LANGUAGE-SYSTEM §10) is deliberate: an option
     with no Nepali half renders its English in every mode rather than
     blanking. That is right for "public", "~" and "AAXX", which are C++
     tokens and program output — translating them would be wrong.

     It is NOT right for prose. This separates the two cases, so an
     untranslated sentence is a failure while an untranslated keyword is
     not. Every prompt and explanation must be bilingual regardless:
     those are the parts a student has to read to understand. */
  const bank = require(path.join(ROOT, '_source/content/questions/grade10-oop-cpp.js'));
  const DEVA = /[ऀ-ॿ]/;

  for (const q of bank){
    assert.ok(DEVA.test(q.prompt.ne || ''), q.id + ': the prompt has no Nepali');
    assert.ok(DEVA.test(q.explanation.ne || ''), q.id + ': the explanation has no Nepali');

    for (const o of q.options){
      /* A PRESENT ne half is an authoring decision, whichever it is:
         translated prose, or the same string twice because the option is
         code — `cin >> n;` is identical in both languages and the
         renderer collapses identical halves to one label. Either way the
         author looked at it.

         An ABSENT half is the case worth catching, and only when the
         English is prose. Four questions in this bank have options that
         are bare C++ tokens — public, ~, virtual — and a Nepali half
         there would be a mistranslation, not a translation. */
      if (o.ne != null && String(o.ne).trim()) continue;

      const plain = String(o.en)
        .replace(/<[^>]*>/g, '')
        .replace(/&[a-z]+;/g, '')
        .trim();
      const words = plain.split(/\s+/).filter(Boolean);
      assert.ok(words.length <= 2,
        q.id + ': option "' + o.en + '" has no Nepali half and is not a value. A keyword ' +
        'or a value may stay in English; a sentence a student has to read may not. ' +
        '(' + words.length + ' words)');
    }
  }
});
