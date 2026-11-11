/* ============================================================
   THE CURRICULUM CONTRACT — every grade, independently of the build

   WHY A SEPARATE FILE, when validate.js already checks the grid.

   validate.js checks `config/pages.js` against the grid, so it only
   sees a subject that has AUTHORED PAGES. Grade 9 has four subjects,
   an outline for each, a specification grid for each, and no pages at
   all — so the build looks at none of it. An outline could disagree
   with the grid on unit count, title or hours and nothing would notice
   until somebody started writing lessons against it.

   That is exactly the shape of the Phase 9 defect, where nine Grade 10
   units carried the wrong marks for three phases because the only check
   was "does the subject total 50". These tests hold the curriculum data
   to itself whether or not anyone has written a lesson yet.
   ============================================================ */
const { test } = require('node:test');
const assert = require('node:assert');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, '_source');

const grid     = require(path.join(SRC, 'content', 'specification-grid.js'));
const syllabus = require(path.join(SRC, 'content', 'syllabus.js'));
const site     = require(path.join(SRC, 'config', 'site.js'));
const pages    = require(path.join(SRC, 'config', 'pages.js'));

/* The CDC curriculum gives every subject in this stream the same shape:
   64 credit hours, and an external paper worth 50 marks. */
const HOURS = 64;
const EXTERNAL_MARKS = 50;

test('every subject in the grid totals 64 hours and 50 external marks', () => {
  const keys = Object.keys(grid);
  assert.ok(keys.length >= 8, 'expected at least 8 subjects in the grid, found ' + keys.length);

  for (const [key, subject] of Object.entries(grid)){
    const hrs = subject.units.reduce((a, u) => a + u.hrs, 0);
    const mk  = subject.units.reduce((a, u) => a + u.marks, 0);
    assert.strictEqual(hrs, HOURS, key + ': credit hours total ' + hrs + ', not ' + HOURS);
    assert.strictEqual(mk, EXTERNAL_MARKS,
      key + ': external marks total ' + mk + ', not ' + EXTERNAL_MARKS);

    assert.ok(subject.source && /CDC 2078/.test(subject.source),
      key + ': no citation naming the source document');

    subject.units.forEach((u, i) => {
      assert.strictEqual(u.n, String(i + 1), key + ': unit numbers are not 1..n in order');
      assert.ok(u.hrs > 0 && u.marks > 0, key + ' unit ' + u.n + ': a zero hour or mark');
      assert.ok(u.content && u.content.trim(), key + ' unit ' + u.n + ': no unit title');
    });
  }
});

test('the grid and the syllabus outline agree, grade by grade', () => {
  /* THE CHECK THAT COVERS GRADE 9 BEFORE A SINGLE LESSON EXISTS.

     Two independent transcriptions of the same document: the outline
     comes from the Scope and Sequence tables, the grid from the
     Specification Grid tables, pages apart. They must agree on how many
     units a subject has, what each is called, and how long it runs. For
     Grade 10 this comparison was never made until Phase 9 and it found
     nine wrong marks. For Grade 9 it was made before authoring, in
     Phase 11, and found nothing. */
  for (const [key, subject] of Object.entries(grid)){
    const outline = syllabus[key];
    assert.ok(outline, key + ': has a specification grid and no syllabus outline');

    assert.strictEqual(outline.length, subject.units.length,
      key + ': the outline has ' + outline.length + ' units and the grid has ' +
      subject.units.length);

    outline.forEach((u, i) => {
      const g = subject.units[i];
      assert.strictEqual(u.h, g.hrs,
        key + ' unit ' + g.n + ' ("' + g.content + '"): the outline says ' + u.h +
        ' hours and the grid says ' + g.hrs);

      /* Titles are compared loosely — the two tables differ in case and
         punctuation ("Computer software" against "Computer Software",
         "Memory/Storage Unit" against "Memory / Storage Unit"), which is
         the document's own inconsistency and not a transcription error.
         The words must still match. */
      const norm = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '');
      assert.strictEqual(norm(u.t), norm(g.content),
        key + ' unit ' + g.n + ': the outline calls it "' + u.t +
        '" and the grid calls it "' + g.content + '"');
    });

    const hrs = outline.reduce((a, u) => a + u.h, 0);
    assert.strictEqual(hrs, HOURS, key + ': the outline totals ' + hrs + ' hours');
  }
});

test('every open subject in the site map has an outline and a grid', () => {
  /* A subject a student can click on, with no curriculum behind it, is
     a dead end that looks like content. */
  for (const g of site){
    if (g.status !== 'open') continue;
    for (const s of g.subjects){
      const key = g.id + '/' + s.slug;
      assert.ok(syllabus[key], key + ': listed as open in the site map with no syllabus outline');
      assert.ok(grid[key], key + ': listed as open in the site map with no specification grid');
    }
  }
});

test('a subject with authored pages agrees with its grid unit by unit', () => {
  /* What validate.js enforces at build time, asserted here too so that
     it survives someone making the build lenient. */
  for (const [key, cfg] of Object.entries(pages)){
    const g = grid[key];
    assert.ok(g, key + ': has authored pages and no specification grid');
    for (const p of cfg.pages){
      if (typeof p.hrs !== 'number') continue;
      const u = g.units.find(x => x.n === String(p.n));
      assert.ok(u, key + ': page claims unit ' + p.n + ', which the grid does not have');
      assert.strictEqual(p.hrs, u.hrs, key + ' unit ' + p.n + ': hours disagree with the grid');
      assert.strictEqual(p.marks, u.marks, key + ' unit ' + p.n + ': marks disagree with the grid');
    }
  }
});

test('each Grade 9 subject has curriculum data, and a coverage map once it has lessons', () => {
  /* A guard against the quiet half-finish. Phase 11 wrote this when no
     Grade 9 subject had lessons, so that the day one did, it would fail
     and force whoever added it to add a coverage map in the same
     breath — which is how Grade 10's gate came to exist at all, three
     phases too late.

     It did exactly that in Phase 12, when Fundamentals of Computer and
     Application gained Unit 1. The map now exists and this reads the
     state rather than asserting a particular one: curriculum data for
     all four, and a map for whichever have pages.

     It is not a claim that any Grade 9 content is good. It is a claim
     about what exists. */
  const G9 = ['grade9/c-programming', 'grade9/computer-fundamentals',
              'grade9/electro-system', 'grade9/website-design'];
  const coverage = require(path.join(SRC, 'content', 'coverage.js'));

  for (const key of G9){
    assert.ok(syllabus[key], key + ': no outline');
    assert.ok(grid[key], key + ': no specification grid');

    if (!pages[key]){
      assert.ok(!coverage[key],
        key + ' has a coverage map but no authored pages — the map points at nothing');
      continue;
    }
    assert.ok(coverage[key],
      key + ' has authored pages and no coverage map. Add one to content/coverage.js, ' +
      'exactly as Grade 10 does — a subject with lessons and no coverage map is the one ' +
      'failure the build cannot see.');

    /* a partially written subject maps what it has written, and only
       what it has written: an entry for an unwritten unit would point
       at an anchor that does not exist */
    const authoredUnits = new Set(pages[key].pages
      .filter(p => typeof p.hrs === 'number').map(p => String(p.n)));
    const mapped = Object.keys(coverage[key]);
    const fromUnwritten = (syllabus[key] || []).flatMap((u, i) =>
      authoredUnits.has(String(i + 1)) ? [] : (u.c || [])).filter(t => mapped.includes(t));
    assert.deepStrictEqual(fromUnwritten, [],
      key + ': the coverage map claims topics from units that have no page');
  }
});

test('the four grades stay in their own namespaces', () => {
  /* Every curriculum key is "<gradeId>/<slug>". That is what keeps a
     Grade 9 unit, question bank, revision record and progress entry
     from colliding with a Grade 10 one, and it is the only thing that
     does. */
  const KEY = /^grade(9|10|11|12)\/[a-z0-9-]+$/;
  for (const src of [[grid, 'specification-grid'], [syllabus, 'syllabus'], [pages, 'pages']]){
    for (const key of Object.keys(src[0])){
      assert.match(key, KEY, src[1] + ': "' + key + '" is not a grade-namespaced key');
    }
  }
  const slugs = new Set();
  for (const g of site){
    for (const s of g.subjects){
      const key = g.id + '/' + s.slug;
      assert.ok(!slugs.has(key), 'the site map lists ' + key + ' twice');
      slugs.add(key);
    }
  }
});

/* ============================================================
   GRADE 10 PROTECTION

   Grade 10 is finished, deployed and in use. Phase 11 opens a second
   grade beside it, and the risk of that is not a dramatic break — it is
   erosion: a shared file edited for Grade 9, a URL quietly renamed, a
   question bank merged, a coverage map that stops covering.

   These pin the Grade 10 surface by number. They are deliberately
   coarse: they do not care how Grade 10 teaches anything, only that it
   still has what it had on the day Grade 9 work started.
   ============================================================ */
test('Grade 10 keeps every URL a student may have bookmarked', () => {
  const fs = require('node:fs');
  const G10 = [
    'index.html',
    'oop-cpp/index.html','oop-cpp/quiz.html','oop-cpp/revise.html',
    'oop-cpp/tables.html','oop-cpp/trace.html',
    'oop-cpp/unit1.html','oop-cpp/unit2.html','oop-cpp/unit3.html',
    'oop-cpp/unit4.html','oop-cpp/unit5.html','oop-cpp/unit6.html',
    'dbms/index.html','dbms/quiz.html','dbms/revise.html',
    'dbms/unit1.html','dbms/unit2.html','dbms/unit3.html','dbms/unit4.html',
    'dbms/unit5.html','dbms/unit6.html','dbms/unit7.html',
    'digital-design/index.html','digital-design/quiz.html','digital-design/revise.html',
    'digital-design/unit1.html','digital-design/unit2.html','digital-design/unit3.html',
    'digital-design/unit4.html','digital-design/unit5.html',
    'hardware/index.html','hardware/quiz.html','hardware/revise.html',
    'hardware/unit1.html','hardware/unit2.html','hardware/unit3.html',
    'hardware/unit4.html','hardware/unit5.html','hardware/unit6.html'
  ];
  const missing = G10.filter(u => !fs.existsSync(path.join(ROOT, 'grade10', u)));
  assert.deepStrictEqual(missing, [],
    'these Grade 10 URLs no longer build, and an existing link to one is now a 404');
  assert.strictEqual(G10.length, 39, 'the Grade 10 URL list itself was edited');
});

test('Grade 10 coverage, questions and marks have not shrunk', () => {
  /* Measured on the day Phase 11 started. Growth is fine; loss is not. */
  const BASE = {
    'grade10/oop-cpp':        { units: 6, topics: 35, questions: 52 },
    'grade10/digital-design': { units: 5, topics: 39, questions: 54 },
    'grade10/dbms':           { units: 7, topics: 39, questions: 52 },
    'grade10/hardware':       { units: 6, topics: 37, questions: 30 }
  };
  const coverage = require(path.join(SRC, 'content', 'coverage.js'));
  let topics = 0, mapped = 0;

  for (const [key, base] of Object.entries(BASE)){
    const outline = syllabus[key] || [];
    const official = outline.flatMap(u => u.c || []);
    const map = coverage[key] || {};
    const bank = require(path.join(SRC, 'content', 'questions',
      key.replace('grade10/', 'grade10-') + '.js'));

    assert.strictEqual(outline.length, base.units, key + ': unit count changed');
    assert.strictEqual(official.length, base.topics, key + ': official topic count changed');
    assert.ok(bank.length >= base.questions,
      key + ': the question bank shrank from ' + base.questions + ' to ' + bank.length);
    assert.strictEqual(official.filter(t => t in map).length, official.length,
      key + ': a topic lost its coverage map entry');

    topics += official.length;
    mapped += official.filter(t => t in map).length;
  }
  assert.strictEqual(topics, 150, 'Grade 10 no longer has 150 official topics');
  assert.strictEqual(mapped, 150, 'Grade 10 coverage is no longer 150/150');
});

test('Grade 9 and Grade 10 never share a question bank or a lesson file', () => {
  /* The lessons directory is FLAT, and Grade 10 OOP owns the bare names
     u1.html .. u6.html. A Grade 9 subject authored as u1.html would not
     collide loudly — it would overwrite a Grade 10 lesson. Grade 9 files
     must therefore carry their own prefix, and this says so before
     anyone writes one. */
  const fs = require('node:fs');
  const lessons = fs.readdirSync(path.join(SRC, 'content', 'lessons'));
  /* Grade 10 owns the bare u1..u6 and the db-/dd-/hw- prefixes; Grade 9
     owns c-/cf-/es-/wd-, reserved in the Phase 11 architecture plan and
     first used by Phase 12's cf-u1.html. Anything outside both schemes
     is a file that could overwrite a lesson. */
  const KNOWN = /^(u\d+|db-u\d+|dd-u\d+|hw-u\d+|c-u\d+|cf-u\d+|es-u\d+|wd-u\d+)\.html$/;
  const unexpected = lessons.filter(f => f.endsWith('.html') && !KNOWN.test(f));
  assert.deepStrictEqual(unexpected, [],
    'a lesson file outside both grades\' naming schemes appeared. Grade 9 lessons ' +
    'use c-, cf-, es- or wd- — the bare names u1..u6 are Grade 10 OOP and would be ' +
    'overwritten: ' + unexpected.join(', '));

  /* and the prefix must match the subject that claims the file */
  const PREFIX = { 'grade9/c-programming': 'c-', 'grade9/computer-fundamentals': 'cf-',
                   'grade9/electro-system': 'es-', 'grade9/website-design': 'wd-' };
  for (const [key, pre] of Object.entries(PREFIX)){
    if (!pages[key]) continue;
    for (const p of pages[key].pages){
      for (const sec of (p.sec || [])){
        if (/^(revise|.*-quiz|.*-hero)$/.test(sec)) continue;
        assert.ok(sec.startsWith(pre),
          key + ' claims lesson "' + sec + '", which does not carry its reserved ' +
          'prefix "' + pre + '"');
      }
    }
  }

  const banks = fs.readdirSync(path.join(SRC, 'content', 'questions'));
  for (const b of banks){
    assert.match(b, /^grade(9|10)-[a-z0-9-]+\.js$/,
      'question bank "' + b + '" is not named for exactly one grade');
  }
  /* and each bank registers under its own grade's key */
  for (const b of banks){
    const bank = require(path.join(SRC, 'content', 'questions', b));
    const g = b.startsWith('grade9-') ? 'grade9/' : 'grade10/';
    for (const q of bank){
      assert.ok(String(q.subject).startsWith(g),
        b + ': question ' + q.id + ' claims subject "' + q.subject + '"');
    }
  }
});

/* ============================================================
   PHASE 12 — the verified shape of Fundamentals of Computer and
   Application.

   Every one of this subject's topics was read from the CDC 2078 PDF by
   TWO independent extractions, which agreed: the Phase 11 pipeline
   (inflate every stream, pull Tj/TJ in stream order, decode latin1) and
   a second one written for Phase 12 that walks the catalog's page tree
   for real page numbers and decodes through each font's ToUnicode CMap.

   The counts below are therefore evidence, not convention, and this
   test is what stops them drifting back. It caught one real error:
   official topic 2.3 is ONE topic carrying two bullets — softcopy
   output devices and hardcopy output devices — and the repository had
   promoted the second bullet to a numbered topic of its own, which
   renumbered 2.4 and 2.5 out of step with the curriculum a student
   would be reading alongside.
   ============================================================ */
test('Fundamentals of Computer and Application matches the verified curriculum', () => {
  const key = 'grade9/computer-fundamentals';
  const outline = syllabus[key];
  const spec = grid[key];
  assert.ok(outline && spec, key + ': missing outline or grid');

  /* unit n -> [official title, credit hrs, external marks, top-level topics]
     Source: CDC 2078, scope and sequence pp. 13-15 (PDF pages 18-20),
     specification grid p. 20 (PDF page 25). */
  const VERIFIED = [
    ['Introduction to computer',      8,  6, 4],
    ['Computer Components',          10,  7, 5],
    ['Computer software',            10,  9, 7],
    ['Memory/Storage Unit',          10,  8, 5],
    ['Internet and its Application', 10,  8, 3],
    ['Multimedia',                    8,  6, 3],
    ['Emerging Technology',           8,  6, 9]
  ];

  assert.strictEqual(outline.length, VERIFIED.length, key + ': unit count changed');

  VERIFIED.forEach(([title, hrs, marks, topics], i) => {
    const u = outline[i], g = spec.units[i];
    const n = i + 1;
    const norm = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '');
    assert.strictEqual(norm(u.t), norm(title), key + ' unit ' + n + ': title changed');
    assert.strictEqual(u.h, hrs,     key + ' unit ' + n + ': hours changed');
    assert.strictEqual(g.marks, marks, key + ' unit ' + n + ': external marks changed');
    assert.strictEqual(u.c.length, topics,
      key + ' unit ' + n + ' ("' + title + '") has ' + u.c.length + ' topics; the ' +
      'curriculum has ' + topics + '. A topic was split or merged — check it against ' +
      'the scope and sequence before changing this number.');
  });

  assert.strictEqual(outline.reduce((a, u) => a + u.c.length, 0), 36,
    key + ': the subject has 36 official topics');
});

test('the Grade 9 practical hours are recorded alongside the theory hours', () => {
  /* The subject is 4 credit hours and 128 WORKING hours: 64 theory,
     which is what the scope-and-sequence table and the specification
     grid count, and 64 practical, which is a separate table the grid
     says nothing about. Reporting "64 hours" without that distinction
     describes half the course. */
  const spec = grid['grade9/computer-fundamentals'];
  const theory = spec.units.reduce((a, u) => a + u.hrs, 0);
  assert.strictEqual(theory, 64, 'theory hours should total 64');
  assert.ok(spec.practicalHours,
    'the practical hours per unit are not recorded. CDC 2078 p.16-17 (PDF 21-22) ' +
    'gives them as 10/10/8/6/12/8/10, totalling 64.');
  const prac = Object.values(spec.practicalHours).reduce((a, n) => a + n, 0);
  assert.strictEqual(prac, 64, 'practical hours should total 64, found ' + prac);
  assert.strictEqual(theory + prac, 128, 'theory + practical should be the 128 working hours');
});

test('every question bank is registered, and every quiz page has one', () => {
  /* THE SILENT FAILURE THIS CATCHES, met in Phase 12.

     build/context.js lists the question banks by hand. Phase 12 added
     content/questions/grade9-computer-fundamentals.js, wired a quiz
     page to it, and did not add the require. Everything passed: the
     build succeeded, the page was generated, the suite was green — and
     the quiz rendered an empty box, because QuizService had never been
     given the bank. Only opening the page in a browser showed it.

     Two directions, because the gap has two sides: a bank file nobody
     registers, and a quiz page with no bank behind it. */
  const fs = require('node:fs');
  const dir = path.join(SRC, 'content', 'questions');
  const ctxSrc = fs.readFileSync(path.join(SRC, 'build', 'context.js'), 'utf8');

  for (const f of fs.readdirSync(dir).filter(n => n.endsWith('.js'))){
    assert.ok(ctxSrc.includes('questions/' + f),
      'content/questions/' + f + ' exists and build/context.js never requires it. ' +
      'The quiz page that expects it will render an empty box and nothing will fail.');
  }

  for (const [key, cfg] of Object.entries(pages)){
    const hasQuizPage = cfg.pages.some(p => p.file === 'quiz.html');
    if (!hasQuizPage) continue;
    const bank = key.replace('/', '-') + '.js';
    assert.ok(fs.existsSync(path.join(dir, bank)),
      key + ' has a quiz page and no question bank at content/questions/' + bank);
    assert.ok(ctxSrc.includes("'" + key + "'"),
      key + ' has a quiz page but is not keyed in build/context.js questionBanks');
  }
});

test('the generated Grade 9 specification is current', () => {
  /* WHY THIS GUARD EXISTS
     docs/GRADE-9-CURRICULUM-SPECIFICATION.json is a generated document,
     and a generated document that nobody regenerates is a hand-written
     one with a misleading header. Phase 11 emitted
     `status: 'not-implemented'` for all 169 topics as a literal; Phase
     12 taught four of them and the file went on saying none were
     taught, for a whole phase, in a document whose own first line calls
     it machine-readable.

     The generator's --check compares the committed file with what it
     would write now, ignoring only the generation date. If this fails,
     run: node tools/grade9-spec.js */
  const { execFileSync } = require('node:child_process');
  const tool = path.join(ROOT, 'tools', 'grade9-spec.js');
  try {
    execFileSync(process.execPath, [tool, '--check'], { stdio: 'pipe' });
  } catch (e) {
    assert.fail('docs/GRADE-9-CURRICULUM-SPECIFICATION.json has drifted from the ' +
                'curriculum data it is generated from. Run: node tools/grade9-spec.js\n' +
                String(e.stderr || e.stdout || e.message));
  }
});

test('the specification reports what is actually taught, not a literal', () => {
  /* MUTATION: hard-code any topic status back to a literal and this
     fails, because the count below is read from the same source the
     build gates — the coverage map — and not from the document. */
  const fs = require('node:fs');
  const spec = JSON.parse(fs.readFileSync(
    path.join(ROOT, 'docs', 'GRADE-9-CURRICULUM-SPECIFICATION.json'), 'utf8'));
  const coverage = require(path.join(SRC, 'content', 'coverage.js'));

  let mapped = 0;
  for (const key of Object.keys(coverage)){
    if (key.startsWith('grade9/')) mapped += Object.keys(coverage[key]).length;
  }
  const taught = spec.totals.topics - spec.totals.topicsNotImplemented;
  assert.strictEqual(taught, mapped,
    'the specification says ' + taught + ' Grade 9 topics are implemented and the ' +
    'coverage map has ' + mapped + '. One of them is lying to a reader who cannot ' +
    'check.');
  assert.strictEqual(spec.totals.topicsFullyTaught +
                     spec.totals.topicsPartiallyTaught +
                     spec.totals.topicsPracticalMissing +
                     spec.totals.topicsAssessmentMissing +
                     spec.totals.topicsNotImplemented,
                     spec.totals.topics, 'the status tallies do not add up to the topic count');
});
