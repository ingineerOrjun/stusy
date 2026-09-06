/* ============================================================
   SQL TEACHING ENGINE

   This engine tells a student their query is wrong, and shows them why
   a result came out the way it did. If it is wrong, the student learns
   a rule that is wrong and carries it into the exam — worse than having
   no tool at all. So the tests here check the SQL semantics themselves,
   not just that the component renders.

   Two kinds of check matter equally:

     1. Correct queries produce the answer real SQL produces.
     2. Everything else produces a USEFUL message. "Syntax error" is
        not a lesson; "ORDER BY sorts, it does not filter" is.

   No DOM is needed — the engine is deliberately separate from its UI.
   ============================================================ */
const test = require('node:test');
const assert = require('node:assert');
const path = require('path');

const SQL = require(path.resolve(__dirname, '..', '_source', 'runtime', 'sql-engine.js'));

/* The teaching schema. Small enough to reason about by hand, and
   deliberately imperfect: Gita has no class, and class 12 has no
   student, so the outer joins have something to show. */
function db(){
  return {
    Student: {
      columns: ['id', 'name', 'marks', 'class_id'], pk: 'id',
      rows: [[1, 'Ram', 78, 10], [2, 'Sita', 91, 10], [3, 'Hari', 55, 11], [4, 'Gita', 64, null]]
    },
    Class: {
      columns: ['class_id', 'room'], pk: 'class_id',
      rows: [[10, 'A-1'], [11, 'B-2'], [12, 'C-3']]
    }
  };
}

function rows(sql, d){
  const r = SQL.execute(sql, d || db());
  assert.ok(r.ok, sql + ' should run, got ' + (r.error && r.error.code));
  return r.result.rows;
}
function err(sql, d){
  const r = SQL.execute(sql, d || db());
  assert.ok(!r.ok, sql + ' should have been refused');
  return r.error;
}

/* ---------------------------------------------------------- SELECT */

test('SELECT with a WHERE keeps the right rows', () => {
  assert.deepStrictEqual(rows('SELECT name FROM Student WHERE marks > 60;'),
    [['Ram'], ['Sita'], ['Gita']]);
});

test('AND narrows, OR widens', () => {
  assert.deepStrictEqual(rows('SELECT name FROM Student WHERE marks > 60 AND class_id = 10;'),
    [['Ram'], ['Sita']]);
  assert.deepStrictEqual(rows("SELECT name FROM Student WHERE name = 'Ram' OR marks < 60;"),
    [['Ram'], ['Hari']]);
});

test('AND binds tighter than OR', () => {
  /* marks < 60 OR (marks > 90 AND class_id = 10) -> Hari, Sita.
     If precedence were flat left-to-right this would give Hari only. */
  assert.deepStrictEqual(
    rows('SELECT name FROM Student WHERE marks < 60 OR marks > 90 AND class_id = 10;'),
    [['Sita'], ['Hari']].sort() .length ? [['Ram'], ['Sita'], ['Hari']].filter(r => r[0] !== 'Ram') : []);
});

test('brackets override precedence', () => {
  assert.deepStrictEqual(
    rows('SELECT name FROM Student WHERE (marks < 60 OR marks > 90) AND class_id = 10;'),
    [['Sita']]);
});

test('a projection returns only the named columns, in the order named', () => {
  const r = SQL.execute('SELECT marks, name FROM Student WHERE id = 1;', db());
  assert.deepStrictEqual(r.result.columns, ['marks', 'name']);
  assert.deepStrictEqual(r.result.rows, [[78, 'Ram']]);
});

test('SELECT * keeps every column', () => {
  const r = SQL.execute('SELECT * FROM Student WHERE id = 3;', db());
  assert.deepStrictEqual(r.result.columns, ['id', 'name', 'marks', 'class_id']);
});

test('a string comparison needs quotes and is exact', () => {
  assert.deepStrictEqual(rows("SELECT id FROM Student WHERE name = 'Sita';"), [[2]]);
  assert.deepStrictEqual(rows("SELECT id FROM Student WHERE name = 'sita';"), []);
});

/* ---------------------------------------------------------- ORDER BY */

test('ORDER BY sorts, ascending by default', () => {
  assert.deepStrictEqual(rows('SELECT name FROM Student ORDER BY marks;'),
    [['Hari'], ['Gita'], ['Ram'], ['Sita']]);
  assert.deepStrictEqual(rows('SELECT name FROM Student ORDER BY marks DESC;'),
    [['Sita'], ['Ram'], ['Gita'], ['Hari']]);
});

test('ORDER BY may sort by a column the query does not display', () => {
  /* Real SQL allows this. An engine that refused it would teach a rule
     that does not exist — the first version of this engine did, and a
     student following it would have lost marks for correct SQL. */
  const r = SQL.execute('SELECT name FROM Student ORDER BY marks DESC;', db());
  assert.ok(r.ok, 'sorting by an unselected column is legal SQL');
  assert.deepStrictEqual(r.result.columns, ['name']);
  assert.deepStrictEqual(r.result.rows, [['Sita'], ['Ram'], ['Gita'], ['Hari']]);
});

test('ORDER BY does not remove rows', () => {
  assert.strictEqual(rows('SELECT name FROM Student ORDER BY marks;').length, 4);
});

/* ---------------------------------------------------------- joins */

test('an inner join keeps only matching rows', () => {
  /* Gita has no class and class 12 has no student: both disappear. */
  assert.deepStrictEqual(
    rows('SELECT name, room FROM Student JOIN Class ON Student.class_id = Class.class_id;'),
    [['Ram', 'A-1'], ['Sita', 'A-1'], ['Hari', 'B-2']]);
});

test('a left join keeps every left row, padding with NULL', () => {
  assert.deepStrictEqual(
    rows('SELECT name, room FROM Student LEFT JOIN Class ON Student.class_id = Class.class_id;'),
    [['Ram', 'A-1'], ['Sita', 'A-1'], ['Hari', 'B-2'], ['Gita', null]]);
});

test('a right join keeps every right row', () => {
  assert.deepStrictEqual(
    rows('SELECT name, room FROM Student RIGHT JOIN Class ON Student.class_id = Class.class_id;'),
    [['Ram', 'A-1'], ['Sita', 'A-1'], ['Hari', 'B-2'], [null, 'C-3']]);
});

test('a full outer join keeps both unmatched sides', () => {
  assert.deepStrictEqual(
    rows('SELECT name, room FROM Student FULL OUTER JOIN Class ON Student.class_id = Class.class_id;'),
    [['Ram', 'A-1'], ['Sita', 'A-1'], ['Hari', 'B-2'], ['Gita', null], [null, 'C-3']]);
});

test('a natural join finds the shared column by itself', () => {
  assert.deepStrictEqual(
    rows('SELECT name, room FROM Student NATURAL JOIN Class;'),
    [['Ram', 'A-1'], ['Sita', 'A-1'], ['Hari', 'B-2']]);
});

test('OUTER is optional, as in real SQL', () => {
  assert.deepStrictEqual(
    rows('SELECT name FROM Student LEFT OUTER JOIN Class ON Student.class_id = Class.class_id;'),
    rows('SELECT name FROM Student LEFT JOIN Class ON Student.class_id = Class.class_id;'));
});

test('a join without ON is refused rather than silently crossed', () => {
  /* A cross product would produce 12 rows and look like a working
     query. Refusing it is the teaching. */
  assert.strictEqual(err('SELECT name FROM Student JOIN Class;').code, 'join-needs-on');
});

test('a natural join with no shared column says so', () => {
  const d = db();
  d.Room = { columns: ['room_no'], pk: null, rows: [['A-1']] };
  assert.strictEqual(err('SELECT name FROM Student NATURAL JOIN Room;', d).code,
    'natural-join-no-shared-column');
});

test('joined columns are reported qualified, so a student can see where each came from', () => {
  const r = SQL.execute('SELECT name, room FROM Student JOIN Class ON Student.class_id = Class.class_id;', db());
  assert.deepStrictEqual(r.result.columns, ['Student.name', 'Class.room']);
});

/* ---------------------------------------------------------- writes */

test('INSERT adds one row and refuses a duplicate primary key', () => {
  const d = db();
  const ok = SQL.execute("INSERT INTO Student (id, name, marks, class_id) VALUES (5, 'Mina', 88, 11);", d);
  assert.ok(ok.ok);
  assert.strictEqual(ok.db.Student.rows.length, 5);
  assert.strictEqual(err("INSERT INTO Student (id, name, marks, class_id) VALUES (1, 'X', 1, 10);", d).code,
    'duplicate-primary-key');
});

test('INSERT checks the column count', () => {
  assert.strictEqual(err("INSERT INTO Student (id, name) VALUES (9, 'A', 5);").code,
    'insert-count-mismatch');
});

test('UPDATE without WHERE changes every row, and the trace says so', () => {
  const one = SQL.execute('UPDATE Student SET marks = 80 WHERE id = 3;', db());
  assert.strictEqual(one.result.affected, 1);

  const all = SQL.execute('UPDATE Student SET marks = 80;', db());
  assert.strictEqual(all.result.affected, 4);
  assert.ok(all.trace[0].warnAll, 'a WHERE-less UPDATE must be flagged, not quietly run');
});

test('DELETE removes rows but keeps the table; DROP removes the table', () => {
  /* The single costliest confusion in this unit. */
  const del = SQL.execute('DELETE FROM Student;', db());
  assert.ok(del.db.Student, 'DELETE must leave the table in place');
  assert.strictEqual(del.db.Student.rows.length, 0);

  const drop = SQL.execute('DROP TABLE Student;', db());
  assert.strictEqual(drop.db.Student, undefined, 'DROP must remove the table itself');
  assert.match(drop.trace[0].en, /DELETE/, 'the trace should name the contrast');
});

test('CREATE TABLE makes an empty table with the declared key', () => {
  const r = SQL.execute('CREATE TABLE Teacher (id INT PRIMARY KEY, name VARCHAR(30));', db());
  assert.ok(r.ok);
  assert.deepStrictEqual(r.db.Teacher.columns, ['id', 'name']);
  assert.strictEqual(r.db.Teacher.pk, 'id');
  assert.strictEqual(r.db.Teacher.rows.length, 0);
  assert.strictEqual(err('CREATE TABLE Student (id INT);').code, 'table-exists');
});

test('a statement never mutates the database it was given', () => {
  /* The component keeps a pristine copy so Reset always works. */
  const d = db();
  SQL.execute('DELETE FROM Student;', d);
  SQL.execute('DROP TABLE Class;', d);
  SQL.execute("INSERT INTO Student (id, name, marks, class_id) VALUES (9, 'Z', 1, 10);", d);
  assert.strictEqual(d.Student.rows.length, 4);
  assert.ok(d.Class, 'the caller\'s database must be untouched');
});

/* ---------------------------------------------------------- teaching errors */

test('a misspelled column names the columns that do exist', () => {
  const e = err('SELECT nmae FROM Student;');
  assert.strictEqual(e.code, 'unknown-column');
  assert.ok(e.info.available.some(c => /name/.test(c)), 'the real columns must be offered');
});

test('a misspelled table names the tables that do exist', () => {
  const e = err('SELECT name FROM Studnet;');
  assert.strictEqual(e.code, 'unknown-table');
  assert.deepStrictEqual(e.info.available, ['Student', 'Class']);
});

test('syllabus statements that are taught but not run say which and why', () => {
  for (const [sql, statement] of [
    ['ALTER TABLE Student ADD email VARCHAR(20);', 'ALTER'],
    ['RENAME TABLE Student TO Pupil;', 'RENAME'],
    ['GRANT SELECT ON Student TO ram;', 'GRANT'],
    ['REVOKE SELECT ON Student FROM ram;', 'REVOKE'],
    ['WITH x AS (SELECT 1) SELECT * FROM x;', 'WITH'],
    ['CREATE VIEW v AS SELECT name FROM Student;', 'CREATE VIEW']
  ]){
    const e = err(sql);
    assert.strictEqual(e.code, 'not-executed', sql);
    assert.strictEqual(e.info.statement, statement);
    assert.ok(e.info.why.topic, sql + ' must cite the syllabus topic it belongs to');
  }
});

test('SQL outside this syllabus is refused with the reason, not a parse error', () => {
  /* A student who has seen COUNT(*) elsewhere gets told it is not part
     of this course — not that the parser expected FROM. */
  const agg = err('SELECT class_id, COUNT(*) FROM Student;');
  assert.strictEqual(agg.code, 'out-of-syllabus-function');
  assert.strictEqual(agg.info.key, 'aggregate');

  for (const fn of ['SUM', 'AVG', 'MIN', 'MAX']){
    assert.strictEqual(err('SELECT ' + fn + '(marks) FROM Student;').code, 'out-of-syllabus-function');
  }
});

test('an incomplete query reports what it was waiting for', () => {
  assert.strictEqual(err('SELECT name FROM Student WHERE marks >').code, 'expected-value');
  assert.strictEqual(err('SELECT name FROM').code, 'expected-name');
  assert.strictEqual(err('SELECT FROM Student;').code, 'expected-name');
});

test('an unterminated string is caught by the tokeniser', () => {
  assert.strictEqual(err("SELECT name FROM Student WHERE name = 'Ram;").code, 'unterminated-string');
});

test('an empty query is not an error message', () => {
  assert.strictEqual(SQL.execute('   ', db()).error.code, 'empty');
});

/* ---------------------------------------------------------- safety */

test('nothing in the engine can execute what a student types', () => {
  /* The input is treated as hostile even though it never leaves the
     browser. The guarantee is structural: there is no eval and no
     Function constructor anywhere in the file, so there is no path
     from student text to execution. */
  const fs = require('fs');
  const src = fs.readFileSync(
    path.resolve(__dirname, '..', '_source', 'runtime', 'sql-engine.js'), 'utf8');
  assert.ok(!/\beval\s*\(/.test(src), 'eval must not appear');
  assert.ok(!/new\s+Function\s*\(/.test(src), 'the Function constructor must not appear');
  assert.ok(!/\bfetch\s*\(|XMLHttpRequest/.test(src), 'the engine must not reach the network');
  assert.ok(!/innerHTML/.test(src), 'the engine returns data, never markup');
});

test('a hostile-looking string is data, not code', () => {
  const d = db();
  d.Student.rows.push([5, "<script>alert(1)</script>", 10, 10]);
  const r = SQL.execute("SELECT name FROM Student WHERE id = 5;", d);
  assert.strictEqual(r.result.rows[0][0], '<script>alert(1)</script>',
    'the value passes through as a string; escaping belongs to the renderer');
});

test('a query cannot reach a property that is not a column', () => {
  for (const q of ['SELECT constructor FROM Student;',
                   'SELECT __proto__ FROM Student;',
                   'SELECT name FROM constructor;']){
    assert.ok(!SQL.execute(q, db()).ok, q + ' must not resolve');
  }
});

/* ---------------------------------------------------------- the trace */

test('the trace is the lesson: one step per stage, in syllabus order', () => {
  const r = SQL.execute('SELECT name FROM Student WHERE marks > 60 ORDER BY marks DESC;', db());
  assert.deepStrictEqual(r.trace.map(t => t.stage), ['from', 'where', 'select', 'order']);
  assert.deepStrictEqual(r.trace.map(t => t.rows), [4, 3, 3, 3]);
});

test('every trace step is written in both languages', () => {
  const queries = [
    'SELECT name FROM Student WHERE marks > 60 ORDER BY marks;',
    'SELECT name, room FROM Student LEFT JOIN Class ON Student.class_id = Class.class_id;',
    "INSERT INTO Student (id, name, marks, class_id) VALUES (7, 'A', 1, 10);",
    'UPDATE Student SET marks = 1;',
    'DELETE FROM Student WHERE id = 1;',
    'DROP TABLE Student;',
    'CREATE TABLE T (a INT PRIMARY KEY);'
  ];
  for (const q of queries){
    const r = SQL.execute(q, db());
    assert.ok(r.ok, q);
    for (const step of r.trace){
      assert.ok(step.en && step.en.trim(), q + ': a trace step has no English');
      assert.ok(step.ne && step.ne.trim(), q + ': a trace step has no Nepali');
      assert.ok(/[ऀ-ॿ]/.test(step.ne), q + ': the Nepali step is not in Devanagari');
    }
  }
});

test('the WHERE step reports how many rows it dropped', () => {
  const r = SQL.execute('SELECT name FROM Student WHERE marks > 90;', db());
  const where = r.trace.find(t => t.stage === 'where');
  assert.match(where.en, /3 of 4 rows are dropped/);
});
