/* ============================================================
   GRADE 9 · FUNDAMENTALS OF COMPUTER AND APPLICATION
   The completed subject: all seven units.

   WHAT THIS FILE IS FOR, AND WHAT IT IS NOT

   The shared guards already cover a great deal of this subject: the
   build fails on an unmapped topic, a dangling anchor, an incomplete
   simulation or a missing Nepali half; dbms.test.js refuses a unit with
   nothing to do but read; language.test.js holds the heading ratio.
   None of that is repeated here.

   What is here is what only this subject can say: that the seven units
   match the CDC source unit for unit, that every official topic has a
   section a student can reach, that the practical activities on the
   pages are the curriculum's own thirty-two, and that the new
   components do the arithmetic they claim.
   ============================================================ */
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, '_source');
const KEY = 'grade9/computer-fundamentals';

const syllabus = require(path.join(SRC, 'content', 'syllabus.js'));
const grid = require(path.join(SRC, 'content', 'specification-grid.js'));
const pages = require(path.join(SRC, 'config', 'pages.js'));
const coverage = require(path.join(SRC, 'content', 'coverage.js'));
const bank = require(path.join(SRC, 'content', 'questions', 'grade9-computer-fundamentals.js'));

const readLesson = n => fs.readFileSync(path.join(SRC, 'content', 'lessons', 'cf-u' + n + '.html'), 'utf8');
const readBuilt = f => fs.readFileSync(path.join(ROOT, KEY, f), 'utf8');

/* ---------------------------------------------- 1 · the curriculum */

test('the seven units match the CDC source, unit for unit', () => {
  /* Transcribed from the scope and sequence, folios 13-15 of the CDC
     2078 curriculum, and verified against the PDF twice by extraction
     and once by reading rendered pages. If any figure here moves, the
     source has been re-read or the repository has drifted — either way
     a human should look rather than the number being quietly updated. */
  const expected = [
    { n: 1, topics: 4, hrs: 8,  marks: 6, practical: 10 },
    { n: 2, topics: 5, hrs: 10, marks: 7, practical: 10 },
    { n: 3, topics: 7, hrs: 10, marks: 9, practical: 8  },
    { n: 4, topics: 5, hrs: 10, marks: 8, practical: 6  },
    { n: 5, topics: 3, hrs: 10, marks: 8, practical: 12 },
    { n: 6, topics: 3, hrs: 8,  marks: 6, practical: 8  },
    { n: 7, topics: 9, hrs: 8,  marks: 6, practical: 10 }
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

  assert.strictEqual(expected.reduce((a, u) => a + u.topics, 0), 36, 'topics should total 36');
  assert.strictEqual(expected.reduce((a, u) => a + u.hrs, 0), 64, 'theory hours should total 64');
  assert.strictEqual(expected.reduce((a, u) => a + u.practical, 0), 64,
    'practical hours should total 64');
  assert.strictEqual(expected.reduce((a, u) => a + u.marks, 0), 50, 'marks should total 50');
});

test('all 36 official topics are mapped to a section that exists', () => {
  const official = syllabus[KEY].flatMap(u => u.c);
  const map = coverage[KEY];
  assert.strictEqual(official.length, 36);

  const built = Object.fromEntries(pages[KEY].pages
    .filter(p => typeof p.hrs === 'number')
    .map(p => [p.n, readBuilt(p.file)]));
  const allHtml = Object.values(built).join('\n');

  for (const topic of official){
    const anchor = map[topic];
    assert.ok(anchor, 'official topic has no coverage entry: ' + topic);
    assert.ok(allHtml.includes('id="' + anchor + '"'),
      'topic "' + topic + '" is mapped to #' + anchor + ', which no built page contains');
  }

  /* and nothing is mapped that is not official — a stale entry points a
     reader at a section about a topic the curriculum does not list */
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

test('all 32 official practical activities are on the pages, one per unit', () => {
  /* The curriculum's own practical list, folios 15-17, read visually as
     well as extracted. Six for unit 1, five for 2, four for 3, five for
     4, three for 5, three for 6, six for 7. */
  const expected = { 1: 6, 2: 5, 3: 4, 4: 5, 5: 3, 6: 3, 7: 6 };
  let total = 0;

  for (const [unit, count] of Object.entries(expected)){
    const html = readLesson(unit);
    const ids = [...html.matchAll(/data-practical="([^"]+)"/g)].map(m => m[1]);
    assert.strictEqual(ids.length, count,
      'unit ' + unit + ' shows ' + ids.length + ' practical activities, the curriculum lists ' + count);
    assert.strictEqual(new Set(ids).size, ids.length, 'unit ' + unit + ': duplicate activity id');
    for (const id of ids){
      assert.match(id, new RegExp('^g9\\.cf\\.p' + unit + '\\.\\d+$'),
        'activity id ' + id + ' does not follow the g9.cf.p<unit>.<n> scheme');
    }
    total += ids.length;
  }
  assert.strictEqual(total, 32, 'the subject should carry all 32 official activities');
});

test('no practical activity claims the product can verify it', () => {
  /* The product cannot watch a speech competition or inspect a chart.
     Every activity brief says what the STUDENT does; a brief that
     claimed otherwise would be a lie told to a child about their marks. */
  const banned = /\b(we have verified|automatically marked|marks awarded|approved by the system)\b/i;
  for (let u = 1; u <= 7; u++){
    const html = readLesson(u);
    const blocks = html.match(/<div class="pr-act"[\s\S]*?<\/div>/g) || [];
    for (const b of blocks){
      assert.ok(!banned.test(b),
        'unit ' + u + ': a practical brief claims an assessment the product cannot make');
    }
  }
});

test('activities that need a real place or a teacher say so', () => {
  /* Two of the thirty-two are visits, one needs the school lab, and 7.2
     is the only computer task in the subject and names the teacher. A
     brief that quietly implied these could be done from the site would
     be the exact failure the practical mapping was written to prevent. */
  const mustSayCannot = [
    { unit: 2, id: 'g9.cf.p2.5' },   /* visit an IT solution office */
    { unit: 4, id: 'g9.cf.p4.5' },   /* visit an IT solution office */
    { unit: 7, id: 'g9.cf.p7.2' }    /* cloud storage, with the teacher */
  ];
  for (const { unit, id } of mustSayCannot){
    const html = readLesson(unit);
    const block = new RegExp('data-practical="' + id.replace(/\./g, '\\.') + '"[\\s\\S]*?</div>')
      .exec(html);
    assert.ok(block, id + ' not found');
    /* Whitespace flattened first: the sentence wraps across a line in
       the source, so a literal match would depend on where the line
       happens to break. */
    const flat = block[0].replace(/\s+/g, ' ');
    assert.match(flat, /cannot be simulated|cannot be done from this site|cannot do this for you/i,
      id + ' needs a real place or a teacher and does not say that it cannot be done here');
  }
});

/* ---------------------------------------------- 3 · assessment */

test('the question bank covers every unit, weighted towards the marks', () => {
  const byUnit = {};
  for (const q of bank) byUnit[q.unit] = (byUnit[q.unit] || 0) + 1;

  for (let u = 1; u <= 7; u++){
    assert.ok(byUnit['u' + u] >= 6,
      'unit ' + u + ' has ' + (byUnit['u' + u] || 0) + ' questions — too few for a unit worth ' +
      grid[KEY].units[u - 1].marks + ' marks');
  }

  /* The Grade 10 OOP lesson: the heaviest unit must not have the
     smallest bank. Unit 3 carries 9 of the 50 marks. */
  const heaviest = grid[KEY].units.reduce((a, b) => (b.marks > a.marks ? b : a));
  const smallestBank = Math.min(...Object.values(byUnit));
  assert.ok(byUnit['u' + heaviest.n] > smallestBank,
    'unit ' + heaviest.n + ' carries the most marks (' + heaviest.marks +
    ') and does not have more questions than the smallest unit');

  assert.ok(bank.length >= 60 && bank.length <= 75,
    'the bank holds ' + bank.length + ' questions; the blueprint target for 50 marks is 60-75');
});

test('the bank has questions at every difficulty, and the draw is smaller than the bank', () => {
  const d = {};
  for (const q of bank) d[q.difficulty] = (d[q.difficulty] || 0) + 1;
  for (const level of ['easy', 'medium', 'hard']){
    assert.ok(d[level] >= 8,
      'only ' + (d[level] || 0) + ' ' + level + ' questions — a paper needs all three');
  }

  const section = fs.readFileSync(path.join(SRC, 'content', 'sections', 'cf-quiz.html'), 'utf8');
  const limit = Number((/data-limit="(\d+)"/.exec(section) || [])[1]);
  assert.ok(limit > 0, 'the quiz section has no draw limit');
  assert.ok(bank.length > limit,
    'the bank (' + bank.length + ') is not larger than the draw (' + limit +
    '), so a retake is the same paper reordered');
});

test('every question is answerable and bilingual', () => {
  for (const q of bank){
    assert.ok(q.options.length >= 2, q.id + ': fewer than two options');
    assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length,
      q.id + ': answer index out of range');
    assert.ok(q.prompt.ne && /[ऀ-ॿ]/.test(q.prompt.ne), q.id + ': prompt has no Nepali');
    assert.ok(q.explanation.ne && /[ऀ-ॿ]/.test(q.explanation.ne),
      q.id + ': explanation has no Nepali');
    for (const o of q.options) assert.ok(o.ne, q.id + ': an option has no Nepali');
    /* The quiz engine escapes everything, so markup in a bank string
       reaches the student as literal tags. */
    for (const s of [q.prompt.en, q.prompt.ne, q.explanation.en, q.explanation.ne,
                     ...q.options.map(o => o.en), ...q.options.map(o => o.ne)]){
      assert.ok(!/<[a-z/][^>]*>/i.test(s),
        q.id + ' contains HTML, which the quiz renders as literal tags: ' + s.slice(0, 60));
    }
  }
});

/* ---------------------------------------------- 4 · the new components */

test('the cipher bench shifts, wraps and returns', () => {
  /* The arithmetic, tested without a DOM. Decryption must be the same
     operation with the key negated — if that stops being true, the
     component is teaching something false about what a key is. */
  /* The component returns immediately without a document — it is a DOM
     component and refuses to half-load. So it gets the smallest stub
     that lets it reach its export: nothing below touches the DOM. */
  const sandbox = {
    window: null,
    document: { readyState: 'complete', querySelectorAll: () => [], addEventListener(){} }
  };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(SRC, 'runtime', 'sim-cipher.js'), 'utf8'), sandbox);
  assert.ok(sandbox.CipherBench, 'sim-cipher.js did not export CipherBench');
  const shift = sandbox.CipherBench.shift;

  assert.strictEqual(shift('NEPAL', 4), 'RITEP', 'basic forward shift');
  assert.strictEqual(shift('RITEP', -4), 'NEPAL', 'decryption is the same operation reversed');
  assert.strictEqual(shift('XYZ', 3), 'ABC', 'the alphabet must wrap past Z');
  assert.strictEqual(shift('ABC', -3), 'XYZ', 'and wrap backwards past A');
  assert.strictEqual(shift('MEET AT DAWN', 0), 'MEET AT DAWN', 'a key of zero changes nothing');
  assert.strictEqual(shift('MEET AT DAWN', 26), 'MEET AT DAWN', 'a full turn of 26 returns');

  /* Spaces and punctuation pass through, which is a real weakness of
     this cipher and one the lesson states out loud. */
  assert.strictEqual(shift('A B', 1), 'B C', 'spaces must survive');
  assert.ok(shift('MEET AT DAWN', 5).includes(' '), 'the word shape leaks, and the page says so');
});

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
        assert.ok(c.why && c.why.en && c.why.ne, m[1] + ': a case has no bilingual reason');
      }
      /* A drill whose cases all share one answer teaches nothing. */
      assert.ok(new Set(set.cases.map(c => c.answer)).size > 1,
        m[1] + ': every case has the same answer');
      mounted++;
    }
  }
  assert.ok(mounted >= 6, 'expected a decision drill in most units, found ' + mounted);
});

test('the runtime each page needs is actually loaded on it', () => {
  /* The empty-quiz defect in another shape: a component mounted in the
     markup whose script is not in the page's js list renders nothing,
     and no test that reads the lesson source would notice. */
  const NEEDS = [
    { mark: /class="drill"/,     js: 'sim-drill.js' },
    { mark: /class="cipher"/,    js: 'sim-cipher.js' },
    { mark: /class="parts-lab"/, js: 'sim-parts.js' },
    { mark: /class="predict"/,   js: 'predict.js' },
    { mark: /data-practical=/,   js: 'practical.js' }
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
  }
});
