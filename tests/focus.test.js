/* ============================================================
   EXAMINATION PRIORITY vs TEACHER-DIRECTED REVISION

   "Where should I go back to?" has two answers and they are not the
   same answer:

     examFocus     which units carry the most EXAMINATION MARKS — derived
                   at build time from pages.js. A fact about the paper.

     teacherFocus  which units a student actually STRUGGLES with — a
                   judgement, authored in content/revision-focus.js, that
                   nothing in this repository can derive.

   They disagree on purpose. Grade 10 OOP Unit 3 carries 2 of that
   subject's 50 marks and is where beginners stall: examination weight
   will never name it, a teacher might. Showing either in the other's
   voice tells a student something false — that a heavy unit is hard, or
   that a light one is safe to skip.

   Phase 12.1 removed subject-specific advice entirely. Phase 12.3
   brought it back from marks and presented it as revision advice, which
   merged the two. These guards hold them apart.

   Each was confirmed to fail against a deliberately broken version; the
   mutation is named beside it.
   ============================================================ */
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, '_source');

const ctx = require(path.join(SRC, 'build', 'context.js'));
const pages = require(path.join(SRC, 'config', 'pages.js'));
const revisionFocus = require(path.join(SRC, 'content', 'revision-focus.js'));

const readSrc = rel => fs.readFileSync(path.join(SRC, rel), 'utf8');
const readPage = rel => fs.readFileSync(path.join(ROOT, rel), 'utf8');
const unitsOf = key => pages[key].pages.filter(p => typeof p.hrs === 'number');

/* ---------------------------------------------- A · examination priority */

test('examination priority is derived from marks and nothing else', () => {
  /* MUTATION: sort the focus by hours or by unit number and this fails,
     naming the light unit it kept and the heavy one it skipped. */
  for (const [key, focus] of Object.entries(ctx.examFocus)){
    const units = unitsOf(key);
    for (const u of focus){
      const real = units.find(p => String(p.n) === String(u.n));
      assert.ok(real, key + ' Unit ' + u.n + ' is not a unit of this subject');
      assert.strictEqual(u.marks, real.marks,
        key + ' Unit ' + u.n + ' reports ' + u.marks + ' marks; pages.js says ' + real.marks);
    }
    if (units.length < 2) continue;
    const named = new Set(focus.map(u => String(u.n)));
    const lightestNamed = Math.min(...units.filter(u => named.has(String(u.n))).map(u => u.marks));
    const heaviestNot = Math.max(...units.filter(u => !named.has(String(u.n))).map(u => u.marks));
    assert.ok(lightestNamed >= heaviestNot,
      key + ': examination priority kept a ' + lightestNamed + '-mark unit and skipped a ' +
      heaviestNot + '-mark one, so it is not ordered by marks');
  }
});

test('examination priority names only units that exist, with both titles', () => {
  for (const [key, focus] of Object.entries(ctx.examFocus)){
    const have = new Set(unitsOf(key).map(p => String(p.n)));
    assert.ok(focus.length, key + ' has an empty examination focus');
    for (const u of focus){
      assert.ok(have.has(String(u.n)),
        key + ' names Unit ' + u.n + '; its units are ' + [...have].join(', '));
      assert.ok(u.title && u.title.en && u.title.en.trim(), key + ' Unit ' + u.n + ': no English title');
      assert.ok(u.title.ne && /[ऀ-ॿ]/.test(u.title.ne),
        key + ' Unit ' + u.n + ': no Nepali title, so Nepali mode would read English');
    }
    assert.ok(focus.length <= Math.max(1, Math.ceil(have.size / 2)),
      key + ' names ' + focus.length + ' of ' + have.size + ' units — that is the syllabus');
  }
});

test('the Grade 9 focus is drawn from its own authored units', () => {
  /* When this subject had one unit, the whole content of this test was
     that the focus must be ['1']. Phase 13 authored the other six, so it
     now checks the property that mattered all along: every unit named is
     one this subject actually has. */
  const key = 'grade9/computer-fundamentals';
  const have = new Set(unitsOf(key).map(p => String(p.n)));
  const focus = ctx.examFocus[key];
  assert.ok(focus.length, 'Grade 9 has no examination focus');
  for (const u of focus){
    assert.ok(have.has(String(u.n)),
      'Grade 9 is pointed at Unit ' + u.n + '; its units are ' + [...have].join(', '));
  }
});

/* ---------------------------------------------- B · teacher-directed */

test('teacher-directed revision is independent of marks', () => {
  /* The separation itself. An override must be able to name a subject's
     LIGHTEST unit — the case the derived list can never produce, and the
     whole reason this channel exists. */
  for (const [key, entry] of Object.entries(ctx.teacherFocus)){
    const units = unitsOf(key);
    for (const u of entry.units){
      assert.ok(units.find(p => String(p.n) === String(u.n)),
        key + ': the teacher list names Unit ' + u.n + ', which does not exist');
    }
    for (const u of (revisionFocus[key] || {}).units || []){
      assert.ok(!('marks' in u),
        key + ' Unit ' + u.n + ': the authored record carries marks. Examination weight is ' +
        'derived; an authored copy can only go stale or be mistaken for judgement.');
    }
  }
});

test('an authored entry must carry its provenance', () => {
  /* The build enforces this; stating it here puts the reason in front of
     whoever adds the first entry. */
  for (const [key, entry] of Object.entries(revisionFocus)){
    assert.ok(entry.source && String(entry.source).trim(),
      key + ' has no source — who made this judgement, and when?');
    assert.ok(entry.units && entry.units.length, key + ' has a source and no units');
    for (const u of entry.units){
      assert.ok(u.why && String(u.why).trim(),
        key + ' Unit ' + u.n + ' has no why. The reason is the whole difference between ' +
        'a teacher’s judgement and a number somebody typed.');
    }
  }
});

test('the authored revision file is empty, and says why', () => {
  /* It is empty because the string it replaced — "Re-read Units 3, 5 and
     6" — came from a prototype commit titled "Fix styling and update
     text" with no rationale recorded anywhere in the repository or its
     history. If a later phase adds an entry, this is the assertion it
     should have to change deliberately, after reading that. */
  if (Object.keys(revisionFocus).length === 0){
    const src = readSrc(path.join('content', 'revision-focus.js'));
    assert.match(src, /no\s+recorded\s+rationale/i,
      'the file is empty and does not explain why, which is how an empty file becomes ' +
      'a forgotten one');
  }
});

/* ---------------------------------------------- C · the service boundary */

function loadService(){
  const sandbox = { window: null, console };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(readSrc('runtime/services/quiz.js'), sandbox);
  return sandbox.QuizService;
}

test('the service keeps the two kinds apart', () => {
  /* MUTATION: make getFocus fall back to exam when the kind is unknown
     and this fails — that is the bug where a caller asking for judgement
     silently receives marks. */
  const Q = loadService();

  Q.registerFocus('x/y', {
    exam:    [{ n: '1', marks: 15, title: { en: 'Heavy', ne: 'भारी' } }],
    teacher: [{ n: '3', why: 'beginners stall here', title: { en: 'Light', ne: 'हल्का' } }],
    source:  'a named teacher, a date'
  });

  assert.deepStrictEqual(Q.getFocus('x/y', 'exam').map(u => u.n), ['1']);
  assert.deepStrictEqual(Q.getFocus('x/y', 'teacher').map(u => u.n), ['3']);
  assert.strictEqual(Q.getFocus('x/y', 'revision').length, 0, 'an unknown kind returned units');
  assert.strictEqual(Q.getFocus('x/y').length, 0, 'omitting the kind returned units');
  assert.strictEqual(Q.focusKind('x/y'), 'teacher', 'a teacher list must win over marks');
  assert.strictEqual(Q.focusSource('x/y'), 'a named teacher, a date');
});

test('with no teacher list the service offers marks, and with nothing it offers nothing', () => {
  const Q = loadService();
  Q.registerFocus('x/z', { exam: [{ n: '2', marks: 7, title: { en: 'E', ne: 'ई' } }] });
  assert.strictEqual(Q.focusKind('x/z'), 'exam');
  assert.strictEqual(Q.getFocus('x/z', 'teacher').length, 0, 'an absent teacher list returned units');

  assert.strictEqual(Q.focusKind('x/absent'), null, 'an unregistered subject offered a kind');
  assert.strictEqual(Q.getFocus('x/absent', 'exam').length, 0);
  assert.strictEqual(Q.focusSource('x/absent'), null);
});

test('the service refuses a malformed registration', () => {
  const Q = loadService();
  assert.throws(() => Q.registerFocus('x/bad', [{ n: '1' }]), /expects { exam/,
    'the old array signature is still accepted, so a caller could register marks as judgement');
  assert.throws(() => Q.registerFocus('', { exam: [] }), /non-empty string/);
  assert.throws(() => Q.registerFocus('x/bad', { exam: [{ n: '1' }] }), /no number or no English title/,
    'a unit with no title was accepted');
});

/* ---------------------------------------------- D · what the student reads */

test('the engine labels which kind it is showing', () => {
  const engine = readSrc('runtime/quiz.js');
  assert.match(engine, /focusKind\(/, 'the engine does not ask which kind it is showing');
  assert.match(engine, /Examination priority/,
    'the examination list has no label, so a student cannot tell it from teacher advice');
  assert.match(engine, /revision list/,
    'there is no label for the teacher-directed kind');
});

test('the examination wording never calls a unit hard or easy', () => {
  /* MUTATION: change the lead to "The hardest units are" and this fails.
     A 15-mark unit is not difficult because it is heavy and a 2-mark one
     is not easy because it is light — and the line says so out loud,
     because a student who reads "most marks are in Unit 2" will
     otherwise conclude Unit 5 is safe to skip. */
  const engine = readSrc('runtime/quiz.js').replace(/\/\*[\s\S]*?\*\//g, '');
  const fn = /function renderFocus\(\)[\s\S]*?\n\}/.exec(engine);
  assert.ok(fn, 'renderFocus() was renamed or removed');

  const strings = [...fn[0].matchAll(/'((?:[^'\\]|\\.)*)'/g)].map(m => m[1]);
  assert.ok(strings.some(s => /mark/i.test(s)),
    'no examination wording found — this guard has stopped reading');

  /* EVERY string in the function is checked, not only the ones that
     mention marks. An earlier version of this guard skipped any string
     without "mark" in it, so changing the lead to "The hardest units in
     this subject are" passed — which is the precise claim the whole
     separation exists to prevent. The caveat is the one allowed
     exception, because it is the sentence that denies the claim. */
  for (const s of strings){
    if (/not where the subject is hardest/.test(s)) continue;
    assert.ok(!/\b(hard|hardest|difficult|easy|easiest|simple|tough)\b/i.test(s),
      'the recommendation wording makes a difficulty claim: "' + s + '". Marks are a ' +
      'fact about the paper; which units are hard is a judgement this file cannot make.');
  }
  assert.ok(fn[0].includes('not where the subject is hardest'),
    'the examination line does not tell the student that marks are not difficulty');
});

test('no score message names a unit, in either channel', () => {
  /* The original defect: one subject's unit numbers in a message five
     subjects read. Units belong on the labelled line or nowhere. */
  const engine = readSrc('runtime/quiz.js')
    .replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
  const body = /function showScore\(\)\{?[\s\S]*?\n\}/.exec(engine);
  assert.ok(body, 'showScore() was renamed or removed');
  const msgs = [...body[0].matchAll(/msg(?:Np)?\s*=\s*'((?:[^'\\]|\\.)*)'/g)].map(m => m[1]);
  assert.ok(msgs.length >= 8, 'the message scan found ' + msgs.length + ' — it has stopped reading');
  for (const m of msgs){
    assert.ok(!/\bUnits? \d/i.test(m), 'a score message names a unit: "' + m + '"');
    assert.ok(!/\bTrace\b/.test(m), 'a score message names the Trace section: "' + m + '"');
  }
});

test('the recommendation cannot cost the student their score', () => {
  /* Phase 12.1's defect was a throw between the writes and the reveal,
     which left a student who answered every question looking at nothing.
     The recommendation is the least important thing in the box.
     MUTATION: move renderFocus() above `box.style.display` and this fails. */
  const engine = readSrc('runtime/quiz.js').replace(/\/\*[\s\S]*?\*\//g, '');
  const body = /function showScore\(\)\{?[\s\S]*?\n\}/.exec(engine)[0];
  const reveal = body.indexOf("style.display = 'block'");
  const focus = body.indexOf('renderFocus(');
  assert.ok(reveal > 0 && focus > 0, 'showScore no longer reveals the box or renders the focus');
  assert.ok(focus > reveal,
    'renderFocus() runs before the score box is revealed, so a failure in it would ' +
    'blank the score — the exact Phase 12.1 defect');
  assert.match(body, /try\s*\{\s*renderFocus\(\);?\s*\}\s*catch/,
    'renderFocus() is not guarded, so a throw in it would still break the page');
});

/* ---------------------------------------------- E · the markup it needs */

test('every quiz section ships the recommendation line, empty and hidden', () => {
  /* MUTATION: delete #scoreFocus from one section and the BUILD fails. */
  const dir = path.join(SRC, 'content', 'sections');
  let seen = 0;
  for (const f of fs.readdirSync(dir).filter(n => n.endsWith('.html'))){
    const html = fs.readFileSync(path.join(dir, f), 'utf8');
    if (!html.includes('id="quizBox"')) continue;
    seen++;
    assert.match(html, /<p class="score-focus" id="scoreFocus" hidden><\/p>/,
      'sections/' + f + ' has no recommendation line, or it does not ship empty and hidden');
  }
  /* Six since Phase 14 added the Grade 9 C quiz. The count is asserted
     rather than left open so that a new subject's quiz section cannot be
     added without this guard being pointed at it. */
  assert.strictEqual(seen, 6, 'expected 6 quiz sections, found ' + seen);
});

test('the recommendation line is not swept into an English wrapper', () => {
  /* THE DEFECT THIS CATCHES, FOUND IN A BROWSER AND BY NO TEST:
     build/bilingual.js wraps runs of English prose that sit beside a
     Nepali gloss in <div class="t-en">. #scoreFocus ships empty, next to
     #scoreMsgNp, so it was swept into that wrapper — and in Nepali mode
     the entire line vanished: the English half hidden because it was
     English, the Nepali half hidden because its wrapper was.

     MUTATION: remove `score-focus` from NEVER_WRAP_CLASS and this fails
     on all five pages. */
  for (const rel of ['grade9/computer-fundamentals/quiz.html',
                     'grade10/oop-cpp/quiz.html',
                     'grade10/dbms/quiz.html',
                     'grade10/hardware/quiz.html',
                     'grade10/digital-design/quiz.html']){
    const html = readPage(rel);
    const at = html.indexOf('id="scoreFocus"');
    assert.ok(at > 0, rel + ' has no recommendation line');
    const before = html.slice(0, at);
    const lastOpen = before.lastIndexOf('<div class="t-en">');
    const lastClose = before.lastIndexOf('</div>');
    assert.ok(!(lastOpen > -1 && lastOpen > lastClose),
      rel + ': the recommendation line sits inside a div.t-en, so it disappears ' +
      'completely in Nepali mode');
  }
});

test('the generated bank file registers both kinds for every bank', () => {
  const gen = readPage(path.join('assets', 'js', 'question-bank.js'));
  for (const key of Object.keys(ctx.questionBanks)){
    const call = new RegExp('QuizService\\.registerFocus\\("' + key.replace('/', '\\/') +
                            '", \\{[\\s\\S]*?"exam"[\\s\\S]*?"teacher"');
    assert.match(gen, call,
      key + ' is not registered with both an exam and a teacher key, so the engine ' +
      'cannot tell which kind it is showing');
  }
});
