/* ============================================================
   DBMS — the two visualisers, and the subject's content contract.

   The SQL engine has its own suite (sql-engine.test.js) because it is
   pure logic. These two components generate markup, so the markup is
   what is asserted: a student is taught by what the component renders,
   and a table that draws a FK badge on the wrong column teaches a wrong
   fact just as effectively as a wrong answer would.

   The components are driven directly rather than through clicks. The
   DOM stub cannot dispatch events, and going through a fake event
   system would test the fake rather than the component.
   ============================================================ */
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, '_source');

/* sim-table must load first: sim-er reads DbTable.esc and DbTable.render
   at module scope, exactly as the page map guarantees in the browser. */
const DbTable = require(path.join(SRC, 'runtime', 'sim-table.js'));
const ErLab = require(path.join(SRC, 'runtime', 'sim-er.js'));

/* A root element with just enough surface for render(). */
function fakeRoot(attrs){
  return {
    id: 'test-root',
    _attrs: attrs || {},
    innerHTML: '',
    getAttribute(k){ return k in this._attrs ? this._attrs[k] : null; },
    setAttribute(k, v){ this._attrs[k] = v; },
    querySelector(){ return null; },
    querySelectorAll(){ return []; }
  };
}

/* ---------------------------------------------------- table visualiser */

test('a rendered table marks the primary and foreign keys', () => {
  const t = DbTable.SCHEMAS.school.tables.Student;
  const html = DbTable.render('Student', t.columns, t.rows, { pk: t.pk, fk: t.fk });

  assert.match(html, /<th[^>]*class="[^"]*is-pk[^"]*"[^>]*>id/,
    'the primary key column must carry the PK class');
  assert.match(html, /class="dt-badge dt-pk"[^>]*>PK</,
    'the badge must say PK — colour alone is not a label');
  assert.match(html, /class="dt-badge dt-fk"[^>]*>FK</,
    'the foreign key must be badged too');
});

test('NULL is rendered as a readable value, not an empty cell', () => {
  /* Showing NULL blank is how "NULL means zero" gets learned. */
  const t = DbTable.SCHEMAS.school.tables.Student;
  const html = DbTable.render('Student', t.columns, t.rows, {});
  assert.match(html, /<span class="dt-null">NULL<\/span>/);
});

test('degree and cardinality are reported as separate counts', () => {
  const t = DbTable.SCHEMAS.school.tables.Student;
  const html = DbTable.render('Student', t.columns, t.rows, { counts: true });
  assert.match(html, /<b>4<\/b>\s*<span class="t-en">columns — degree/);
  assert.match(html, /<b>4<\/b>\s*<span class="t-en">rows — cardinality/);
});

test('every rendered cell is escaped', () => {
  /* Values reach here from the SQL engine, which passes student input
     through as data. Escaping is this renderer's job and nobody else's. */
  const html = DbTable.render('T', ['a'], [['<script>alert(1)</script>']], {});
  assert.ok(!/<script>/.test(html), 'raw markup must never survive rendering');
  assert.match(html, /&lt;script&gt;/);
});

test('an empty result says so rather than rendering a bare frame', () => {
  const html = DbTable.render('T', ['a', 'b'], [], {});
  assert.match(html, /class="dt-empty"/);
  assert.match(html, /No rows/);
  assert.match(html, /कुनै पङ्क्ति छैन/, 'the empty state is bilingual too');
});

test('the vocabulary mode highlights what each term actually names', () => {
  const viz = new DbTable.TableViz(fakeRoot({ 'data-table': 'Student', 'data-mode': 'vocab' }));

  /* degree names the columns, cardinality names the rows — the pair
     students swap, and the reason this mode exists */
  viz.term = 'degree';
  assert.deepStrictEqual(viz.marksFor('Student'), { cols: [0, 1, 2, 3] });

  viz.term = 'cardinality';
  assert.deepStrictEqual(viz.marksFor('Student'), { rows: [0, 1, 2, 3] });

  viz.term = 'key';
  assert.deepStrictEqual(viz.marksFor('Student'), { cols: [0] }, 'the key is column 0, id');

  viz.term = 'tuple';
  assert.deepStrictEqual(viz.marksFor('Student'), { rows: [0] }, 'one tuple is one row');
});

test('every vocabulary term is written in both languages', () => {
  for (const t of DbTable.TERMS){
    assert.ok(t.label.en && t.label.ne, t.id + ' has no label pair');
    assert.ok(t.say.en && t.say.ne, t.id + ' has no explanation pair');
    assert.ok(/[ऀ-ॿ]/.test(t.say.ne), t.id + ' Nepali is not in Devanagari');
  }
});

test('reset clears the selected term', () => {
  const viz = new DbTable.TableViz(fakeRoot({ 'data-table': 'Student', 'data-mode': 'vocab' }));
  viz.term = 'degree';
  viz.reset();
  assert.strictEqual(viz.term, null);
});

test('the teaching schema keeps the gaps the joins need', () => {
  /* Gita has no class and class 12 has no student. Without those two
     holes every join in Unit 4 returns the same rows and the lesson is
     invisible — so they are asserted, not assumed. */
  const s = DbTable.SCHEMAS.school.tables;
  const orphanStudent = s.Student.rows.filter(r => r[3] === null);
  assert.strictEqual(orphanStudent.length, 1, 'exactly one student must have no class');

  const used = new Set(s.Student.rows.map(r => r[3]));
  const emptyClasses = s.Class.rows.filter(r => !used.has(r[0]));
  assert.strictEqual(emptyClasses.length, 1, 'exactly one class must have no student');
});

/* ---------------------------------------------------- ER visualiser */

test('the ER notation shows the right cardinality marks', () => {
  const root = fakeRoot({ 'data-model': 'student-course' });
  const lab = new ErLab.Lab(root);

  lab.card = '1:1'; lab.render();
  assert.match(root.innerHTML, /class="er-card"[^>]*>1<[\s\S]*class="er-card"[^>]*>1</);

  lab.card = '1:M'; lab.render();
  assert.match(root.innerHTML, /class="er-card"[^>]*>1<[\s\S]*class="er-card"[^>]*>M</);

  lab.card = 'M:N'; lab.render();
  assert.match(root.innerHTML, /class="er-card"[^>]*>M<[\s\S]*class="er-card"[^>]*>N</);
});

test('only a many-to-many relationship produces a junction table', () => {
  /* This is the unit's central fact, and the reason the component shows
     occurrences at all. */
  const root = fakeRoot({ 'data-model': 'student-course' });
  const lab = new ErLab.Lab(root);

  for (const c of ['1:1', '1:M']){
    lab.card = c; lab.render();
    assert.ok(!/class="er-junction"/.test(root.innerHTML), c + ' must not need a third table');
  }
  lab.card = 'M:N'; lab.render();
  assert.match(root.innerHTML, /class="er-junction"/, 'M:N must produce a junction table');
  assert.match(root.innerHTML, /dt-wrap/, 'the junction table is rendered as a real table');
});

test('the occurrence view shows the fan-out that defines "many"', () => {
  const root = fakeRoot({ 'data-model': 'student-course' });
  const lab = new ErLab.Lab(root);

  lab.card = '1:M'; lab.render();
  const oneToMany = (root.innerHTML.match(/class="er-occ-row is-many"/g) || []).length;
  assert.ok(oneToMany >= 1, 'one-to-many must show at least one row fanning out');

  lab.card = '1:1'; lab.render();
  assert.strictEqual((root.innerHTML.match(/class="er-occ-row is-many"/g) || []).length, 0,
    'one-to-one must show no fan-out at all');
});

test('the note reads the relationship backwards, which is what separates 1:M from M:N', () => {
  const root = fakeRoot({ 'data-model': 'student-course' });
  const lab = new ErLab.Lab(root);

  lab.card = '1:M'; lab.render();
  assert.match(root.innerHTML, /points at exactly one/,
    '1:M must point out that the reverse direction is "one"');

  lab.card = 'M:N'; lab.render();
  assert.match(root.innerHTML, /Both directions are "many"/,
    'M:N must point out that both directions are "many"');
});

test('an ER component may be focused, and focus is what the parts mode changes', () => {
  const root = fakeRoot({ 'data-model': 'student-course', 'data-mode': 'parts' });
  const lab = new ErLab.Lab(root);

  assert.ok(!/is-focus/.test(root.innerHTML), 'nothing is focused before a choice is made');

  lab.part = 'relationship'; lab.render();
  assert.match(root.innerHTML, /class="er-rel is-focus"/);

  lab.part = 'entity'; lab.render();
  assert.match(root.innerHTML, /class="er-entity is-focus"/);
});

test('reset returns the ER lab to the model\'s natural cardinality', () => {
  const root = fakeRoot({ 'data-model': 'class-student' });
  const lab = new ErLab.Lab(root);
  assert.strictEqual(lab.card, '1:M', 'a class containing students is naturally 1:M');
  lab.card = 'M:N'; lab.part = 'entity';
  lab.reset();
  assert.strictEqual(lab.card, '1:M');
  assert.strictEqual(lab.part, null);
});

test('every ER part and cardinality is written in both languages', () => {
  for (const p of ErLab.PARTS){
    assert.ok(p.label.en && p.label.ne, p.id + ' has no label pair');
    assert.ok(p.say.en && p.say.ne, p.id + ' has no explanation pair');
    assert.ok(/[ऀ-ॿ]/.test(p.say.ne), p.id + ' Nepali is not in Devanagari');
  }
  for (const c of ErLab.CARDS){
    assert.ok(c.say.en && c.say.ne && c.table.en && c.table.ne, c.id + ' is not fully bilingual');
    assert.ok(/[ऀ-ॿ]/.test(c.say.ne), c.id + ' Nepali is not in Devanagari');
  }
});

/* ---------------------------------------------------- content contract */

const syllabus = require(path.join(SRC, 'content', 'syllabus.js'))['grade10/dbms'];
const pages = require(path.join(SRC, 'config', 'pages.js'))['grade10/dbms'];
const bank = require(path.join(SRC, 'content', 'questions', 'grade10-dbms.js'));

test('every syllabus unit has an authored page, in order', () => {
  const unitPages = pages.pages.filter(p => typeof p.hrs === 'number');
  assert.strictEqual(unitPages.length, syllabus.length,
    'the subject claims to be complete, so every unit must exist');
  unitPages.forEach((p, i) => {
    assert.strictEqual(p.hrs, syllabus[i].h,
      'unit ' + (i + 1) + ' hours must match the syllabus');
  });
});

test('the marks are a derivation and still total the specification grid', () => {
  /* No DBMS specification grid exists in this repository, so the marks
     are apportioned from the hours — recorded as ambiguity A1 in
     docs/PHASE-4-DBMS-CURRICULUM-MAP.md. They must still total 50, and
     the day a real grid arrives this test keeps the replacement honest. */
  const total = pages.pages.reduce((a, p) => a + (p.marks || 0), 0);
  assert.strictEqual(total, 50);

  const map = fs.readFileSync(path.join(ROOT, 'docs', 'PHASE-4-DBMS-CURRICULUM-MAP.md'), 'utf8');
  assert.match(map, /AMBIGUITY A1/,
    'a derived number must stay documented as derived');
});

test('every unit page carries objectives, a recap and an exam connection', () => {
  for (const p of pages.pages){
    for (const sec of p.sec){
      const f = path.join(SRC, 'content', 'lessons', sec + '.html');
      if (!fs.existsSync(f)) continue;          /* the quiz section lives elsewhere */
      const html = fs.readFileSync(f, 'utf8');
      assert.match(html, /class="outcomes"/, sec + ': no learning objectives');
      assert.match(html, /class="keypoints"/, sec + ': no revision summary');
      assert.match(html, /class="exam-connect"/, sec + ': no SEE exam connection');
    }
  }
});

test('the question bank covers every unit', () => {
  const seen = new Set(bank.map(q => q.unit));
  for (let i = 1; i <= syllabus.length; i++){
    assert.ok(seen.has('u' + i), 'unit u' + i + ' has no questions');
  }
});

test('every question is complete and bilingual', () => {
  const ids = new Set();
  for (const q of bank){
    const at = q.id;
    assert.ok(!ids.has(at), 'duplicate question id ' + at);
    ids.add(at);

    assert.strictEqual(q.subject, 'grade10/dbms', at + ': wrong subject');
    assert.ok(q.prompt.en && q.prompt.ne, at + ': prompt is not bilingual');
    assert.ok(/[ऀ-ॿ]/.test(q.prompt.ne), at + ': Nepali prompt is not in Devanagari');
    assert.ok(q.explanation.en && q.explanation.ne, at + ': explanation is not bilingual');
    assert.ok(/[ऀ-ॿ]/.test(q.explanation.ne), at + ': Nepali explanation is not in Devanagari');

    assert.ok(q.options.length >= 2, at + ': needs at least two options');
    q.options.forEach((o, i) => {
      assert.ok(o.en && o.en.trim(), at + ' option ' + i + ': no English');
      assert.ok(o.ne && o.ne.trim(), at + ' option ' + i + ': no Nepali');
    });
    assert.ok(q.answer >= 0 && q.answer < q.options.length, at + ': answer index out of range');
    assert.ok(['easy', 'medium', 'hard'].includes(q.difficulty), at + ': unknown difficulty');
  }
});

test('the bank mixes difficulties rather than testing one level', () => {
  const by = { easy: 0, medium: 0, hard: 0 };
  bank.forEach(q => by[q.difficulty]++);
  for (const level of Object.keys(by)){
    assert.ok(by[level] >= 5, 'only ' + by[level] + ' ' + level + ' questions — the mix is too thin');
  }
});

test('no two questions test the same topic at the same difficulty in the same unit', () => {
  /* The rule the bank was written under: a fact worth two questions is
     worth testing at two different levels. This catches the drift where
     a bank grows by rewording what it already asks. */
  const seen = new Map();
  for (const q of bank){
    const key = q.unit + '|' + q.topic + '|' + q.difficulty;
    assert.ok(!seen.has(key),
      q.id + ' repeats ' + seen.get(key) + ' — same unit, topic and difficulty');
    seen.set(key, q.id);
  }
});

test('the SQL taught in the lesson is the SQL the simulator runs', () => {
  /* A lesson that shows a statement the tool refuses would be teaching
     the student to distrust the tool. Checked against the engine's own
     declared list rather than a copy of it. */
  const SQLEngine = require(path.join(SRC, 'runtime', 'sql-engine.js'));
  const lesson = fs.readFileSync(path.join(SRC, 'content', 'lessons', 'db-u4.html'), 'utf8');

  for (const stmt of SQLEngine.SUPPORTED){
    assert.ok(lesson.includes(stmt.split(' ')[0]),
      'the lesson never mentions ' + stmt + ', which the simulator runs');
  }
  /* And the statements deliberately not executed are taught anyway. */
  for (const stmt of ['ALTER', 'RENAME', 'GRANT', 'REVOKE', 'VIEW']){
    assert.ok(lesson.includes(stmt), 'the syllabus requires ' + stmt + ' to be taught');
  }
});

test('aggregate functions are absent from the DBMS content', () => {
  /* They are standard SQL and absent from this syllabus (curriculum map
     §2). This test is what stops them drifting in later because they
     "feel" like part of SQL. */
  const dir = path.join(SRC, 'content', 'lessons');
  for (const f of fs.readdirSync(dir).filter(n => n.startsWith('db-'))){
    const html = fs.readFileSync(path.join(dir, f), 'utf8');
    for (const kw of ['GROUP BY', 'HAVING', 'COUNT(', 'SUM(', 'AVG(']){
      assert.ok(!html.includes(kw),
        f + ' teaches "' + kw + '", which is not in this syllabus');
    }
  }
});

/* ---------------------------------------------------- decision drill */

const Drill = require(path.join(SRC, 'runtime', 'sim-drill.js'));
const ConcLab = require(path.join(SRC, 'runtime', 'sim-concurrency.js'));

test('every drill case has exactly one answer, and it is one of the options', () => {
  /* A drill marks a student. An answer id that matches no option would
     mark every attempt wrong, silently. */
  for (const [name, set] of Object.entries(Drill.SETS)){
    const ids = set.options.map(o => o.id);
    assert.ok(set.cases.length >= 4, name + ': a drill of fewer than 4 cases is not practice');
    for (const c of set.cases){
      assert.ok(ids.includes(c.answer),
        name + ': answer "' + c.answer + '" is not one of ' + ids.join(', '));
      assert.ok(c.pre && c.pre.trim(), name + ': a case with no evidence to judge');
    }
  }
});

test('a drill exercises more than one answer', () => {
  /* A set whose every case has the same answer teaches the student to
     press the same button, which is worse than no drill. */
  for (const [name, set] of Object.entries(Drill.SETS)){
    const used = new Set(set.cases.map(c => c.answer));
    assert.ok(used.size >= 2,
      name + ': every case answers "' + [...used][0] + '" — that is not a judgement');
  }
});

test('every drill case explains itself in both languages', () => {
  for (const [name, set] of Object.entries(Drill.SETS)){
    assert.ok(set.title.en && set.title.ne, name + ': title is not bilingual');
    assert.ok(set.lead.en && set.lead.ne, name + ': lead is not bilingual');
    for (const o of set.options) assert.ok(o.label.en && o.label.ne, name + ': an option is not bilingual');
    for (const c of set.cases){
      assert.ok(c.why.en && c.why.ne, name + ': a case has no bilingual reason');
      assert.ok(/[ऀ-ॿ]/.test(c.why.ne), name + ': the Nepali reason is not in Devanagari');
      assert.ok(c.why.en.split(/\s+/).length >= 12,
        name + ': a reason too short to teach anything — "' + c.why.en + '"');
    }
  }
});

test('the normal-form drill agrees with the rules the unit states', () => {
  /* Spot-check the judgements themselves. A drill that marks a correct
     answer wrong teaches a rule that does not exist. */
  const nf = Drill.SETS.normalforms;
  const byAnswer = {};
  nf.cases.forEach(c => { (byAnswer[c.answer] = byAnswer[c.answer] || []).push(c); });

  assert.ok(byAnswer['1nf'], 'a 1NF case must exist');
  assert.match(byAnswer['1nf'][0].pre, /"[^"]*,[^"]*"/,
    'the 1NF case must actually show a cell holding two values');
  assert.match(byAnswer['2nf'][0].pre, /key\s*=\s*\(\s*\w+\s*,/,
    'a partial dependency needs a COMPOSITE key, or 2NF cannot fail');
  assert.ok(byAnswer['ok'], 'a drill with no already-correct case teaches that something is always wrong');
});

test('the recovery drill turns only on the COMMIT record', () => {
  for (const c of Drill.SETS.recovery.cases){
    const committed = /COMMIT/.test(c.pre);
    assert.strictEqual(c.answer, committed ? 'redo' : 'undo',
      'a log ' + (committed ? 'with' : 'without') + ' a COMMIT record must be ' +
      (committed ? 'redone' : 'undone') + ': ' + c.pre.replace(/\n/g, ' | '));
  }
});

/* ---------------------------------------------------- concurrency */

test('the interleaved schedule really does lose an update', () => {
  /* The component teaches by arithmetic, so the arithmetic is checked.
     If a later edit made the numbers agree, the lesson would quietly
     become "concurrency is fine". */
  const steps = ConcLab.SCHEDULES.interleaved.steps;
  const final = steps[steps.length - 1].bal;
  assert.strictEqual(final, 3000, 'the interleaved run must end at the WRONG balance');
  assert.strictEqual(5000 - 1000 - 2000, 2000, 'the correct balance is 2000');
  assert.ok(steps.some(s => s.lost), 'the losing step must be marked, so the UI can show it');
});

test('the locked schedule gets the right answer from the same two transactions', () => {
  const steps = ConcLab.SCHEDULES.locked.steps;
  assert.strictEqual(steps[steps.length - 1].bal, 2000,
    'with locking the balance must be correct');

  /* and it must be the SAME work — same two withdrawals, or the
     comparison proves nothing */
  const amounts = s => s.map(x => x.act).join(' ').match(/\d+/g).map(Number).sort();
  assert.deepStrictEqual(
    amounts(ConcLab.SCHEDULES.interleaved.steps).filter(n => n === 1000 || n === 2000),
    amounts(steps).filter(n => n === 1000 || n === 2000),
    'both schedules must run the same two withdrawals');
});

test('both clerks read the same value before either writes — that is the bug', () => {
  const steps = ConcLab.SCHEDULES.interleaved.steps;
  const firstWrite = steps.findIndex(s => s.wrote);
  const readsBefore = steps.slice(0, firstWrite).filter(s => /read/.test(s.act));
  assert.strictEqual(readsBefore.length, 2,
    'two reads before the first write is the pattern the lesson names');
});

test('every concurrency step is narrated in both languages', () => {
  for (const [name, s] of Object.entries(ConcLab.SCHEDULES)){
    assert.ok(s.label.en && s.label.ne, name + ': label is not bilingual');
    for (const st of s.steps){
      assert.ok(st.en && st.ne, name + ': a step has no bilingual narration');
      assert.ok(/[ऀ-ॿ]/.test(st.ne), name + ': the Nepali narration is not in Devanagari');
    }
  }
});

test('every DBMS unit now offers something to do, not only to read', () => {
  /* Four units shipped read-only in Phase 4. That was a defensible
     reading of "do not over-interact" and a poor product: a unit with
     no interaction and one worked example is a page of notes. */
  const dir = path.join(SRC, 'content', 'lessons');
  for (const f of fs.readdirSync(dir).filter(n => /^db-u\d\.html$/.test(n))){
    const html = fs.readFileSync(path.join(dir, f), 'utf8');
    const sims = (html.match(/<div class="sim">/g) || []).length;
    const wex = (html.match(/class="wex"/g) || []).length;
    assert.ok(sims >= 1, f + ' has no interactive component');
    assert.ok(wex >= 2, f + ' has only ' + wex + ' worked example');
  }
});
