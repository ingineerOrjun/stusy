# DBMS Simulation Spec

The three interactive components built for Database Management System, what
each is for, how a lesson configures it, and — the part that matters most —
what each one deliberately does **not** do.

All three follow the platform's existing contracts: they mount from a class in
authored markup, register with `SimulationService`, take their control labels
from `UIStrings`, and render both languages into the DOM so a mode switch never
re-renders and never loses state.

---

## The rule these were built under

Every candidate interaction was put through the same four questions from the
phase brief:

> What misconception does this solve? What can the student understand by
> interacting that is harder to understand from static content? Does the
> interaction improve retention? Is it worth the implementation complexity?

Three passed. The list of things that did **not** is in §5, because a spec that
only records what was built hides the more useful half of the reasoning.

---

## 1. SQL learning simulator — `sqllab`

**Files:** `_source/runtime/sql-engine.js` (logic) · `_source/runtime/sim-sql.js` (UI)

### The misconception it solves

That `WHERE` chooses columns, and `SELECT` chooses rows. Students routinely
write `SELECT * FROM Student WHERE name` expecting a list of names. A result
table alone does not correct this, because the student sees the answer without
seeing which clause produced which part of it.

### What interacting adds

The engine returns a **trace** — the query broken into the stages the syllabus
teaches, each with the row count it produced:

```
FROM 4  →  WHERE 3  →  SELECT 3  →  ORDER BY 3
```

Delete the `WHERE` clause and the count stops falling. Add `ORDER BY` and the
last number does not move. Those two observations are the lesson, and neither
is available from a static example.

### Configuration

```html
<div class="sqllab"
     data-tables="Student,Class"
     data-examples="basic"
     data-query="SELECT name FROM Student WHERE marks > 60;"></div>
```

| Attribute | Meaning |
| --- | --- |
| `data-tables` | which tables of the schema this instance shows |
| `data-examples` | `basic`, `write` or `joins` — the example set offered |
| `data-query` | the query the editor opens with |
| `data-schema` | which teaching schema (default `school`) |

A second lesson needing SQL adds a `data-examples` set, not a component.

### Supported SQL

Determined by reading the syllabus, not by habit — see
[PHASE-4-DBMS-CURRICULUM-MAP.md §2](PHASE-4-DBMS-CURRICULUM-MAP.md).

**Executed:** `SELECT` (with `WHERE`, `AND`/`OR`, bracketed conditions,
`ORDER BY ... ASC|DESC`, and all five joins) · `INSERT` · `UPDATE` · `DELETE` ·
`CREATE TABLE` · `DROP TABLE`.

**Recognised, explained, deliberately not executed:** `ALTER`, `RENAME`
(the simulator keeps one fixed teaching schema) · `GRANT`, `REVOKE` (there are
no users and no server, so a simulator that appeared to run them would be
teaching a fiction) · `WITH` · `CREATE VIEW`.

**Refused with the reason:** `GROUP BY`, `HAVING`, aggregate functions,
`DISTINCT`, `LIKE`, `BETWEEN`, subqueries. None are in this syllabus. A student
who has met `COUNT(*)` elsewhere is told it is not part of their course —
not that the parser expected `FROM`.

### Every refusal is a lesson

There is no generic "syntax error". Each failure names what happened, why, and
what to do:

| Student types | What they are told |
| --- | --- |
| `SELECT nmae FROM Student` | there is no column `nmae`; here are the columns that exist |
| `SELECT name FROM Student JOIN Class` | a join needs an `ON` condition, or every row would pair with every row |
| `INSERT ... VALUES (1, ...)` on an existing key | a primary key must be unique — that is exactly what it promises |
| `GRANT SELECT ON Student TO ram` | DCL changes who is *allowed* to use the data; this site has no users, so there is nothing to change. Learn the syntax |
| `SELECT COUNT(*) ...` | aggregate functions and `GROUP BY` are not part of your syllabus |

### Security

The input is a student's typing and is treated as hostile even though it never
leaves the browser.

- **No `eval`, no `Function` constructor, no template execution.** Asserted by a
  test that greps the engine source, so the guarantee cannot quietly lapse.
- **No network.** No `fetch`, no `XMLHttpRequest`.
- The parser produces a fixed set of node shapes. Identifiers are resolved
  against the loaded schema; an unknown name is an error, never a property
  lookup on a live object.
- Table and column maps use `Object.create(null)`. A plain `{}` inherits from
  `Object.prototype`, which made `SELECT constructor FROM Student` resolve to a
  function — **found by a test, fixed, and now guarded by that test.**
- The engine returns **data, never markup**. Escaping belongs to the renderer
  and happens there; a row containing `<script>` is rendered as text.
- `execute()` never mutates the database it is given. It works on a copy, so
  Reset is always exact and a `DROP` in one experiment cannot ruin the next.

### Why not a real database engine

An embedded SQLite (sql.js) is roughly 1 MB of WebAssembly and would break the
zero-dependency, offline-first architecture. But the deciding reason is the
second one: **a real engine answers the query and cannot say why.** The trace is
the teaching, and completeness is not.

---

## 2. Relational table visualiser — `dbtable`

**File:** `_source/runtime/sim-table.js`

### The misconception it solves

**Degree versus cardinality.** Unit 3.2 is nine terms for six things, and these
two sound interchangeable. A list of definitions cannot fix that; one table you
can point at can.

### What interacting adds

Choose "degree" and the columns light up with the count. Choose "cardinality"
and the rows do. The word attaches to a thing on screen rather than to another
word. The same applies to schema (the heading) versus instance (the body).

### Configuration

```html
<div class="dbtable" data-table="Student" data-mode="vocab"></div>
<div class="dbtable" data-tables="Student,Class" data-mode="keys"></div>
```

| `data-mode` | What it shows |
| --- | --- |
| `plain` | the table, with PK and FK badges |
| `vocab` | the nine terms of 3.2 as buttons; choosing one highlights what it names |
| `keys` | two tables plus a plain-language note on each key and what it links |

### It is also the SQL result renderer

A `SELECT` returns a relation. Rendering it with a second, different table
component would quietly teach that a query result is a different kind of object
from a table — and the syllabus (3.3) makes a point that it is not. So
`DbTable.render()` draws both.

### The teaching schema has deliberate holes

`Student` and `Class`, four rows and three. **Gita has no class, and class 12
has no student.** Without those two gaps every join in Unit 4 returns identical
rows and the difference between them is invisible. A test asserts both holes
still exist, so a future edit cannot tidy them away.

---

## 3. ER model visualiser — `erlab`

**File:** `_source/runtime/sim-er.js`

### The misconception it solves

**One-to-many versus many-to-many** — the most-missed distinction in Unit 2,
missed because in ER notation both are two boxes and a diamond, differing by one
letter.

### What interacting adds

The component shows the notation *and* the actual occurrences beneath it.
Changing the cardinality changes both, and the rows are where the difference is
visible:

```
1:M   Ram  → Maths, Science        every course points back at ONE student
      Sita → Nepali

M:N   Ram  → Maths, Science        Maths is reached from TWO students
      Sita → Maths, Nepali         both directions are "many"
```

And the consequence a student must be able to state in the exam:
**the junction table appears only in M:N**, holding nothing but two foreign
keys — one row per link.

### Configuration

```html
<div class="erlab" data-model="student-course" data-card="1:M"></div>
<div class="erlab" data-model="class-student" data-mode="parts"></div>
```

| Attribute | Meaning |
| --- | --- |
| `data-model` | `student-course` or `class-student` — a future unit adds a model, not a component |
| `data-mode` | `cardinality` (default) or `parts` |
| `data-card` | the cardinality to open on; defaults to the model's natural one |

### Language

Entity and relationship names (`STUDENT`, `ENROLS`) stay English in every mode:
they are ER notation, and the SEE paper prints them in English
([LANGUAGE-SYSTEM.md §8](LANGUAGE-SYSTEM.md)). The meaning is carried by the
bilingual sentence below the figure, which is where a Nepali-mode student reads
it. This avoids splitting text inside SVG, which does not reflow.

---

## 4. Motion

Animation is used where it communicates change, and nowhere else.

**The five animated diagrams** are the ones whose *order* is the lesson: the
three-level architecture (what each level hides), ER→relational mapping (the
junction table appearing), normalisation (one table decomposing, one anomaly per
step), transaction states (including the failure path), and recovery (redo
forwards, undo backwards on the same log).

**The three components animate only state changes** — a highlight moving to a
newly chosen term, a shape gaining focus. Both are CSS transitions on `fill`,
`stroke`, `background` and `box-shadow`; nothing animates layout, and all of it
is disabled under `prefers-reduced-motion`.

**Nothing else moves.** Definitions, taxonomies and comparison tables are static
figures, because a taxonomy is a lookup and animating a lookup teaches the order
of the rows.

---

## 5. Interactions considered and NOT built

| Candidate | Why not |
| --- | --- |
| A normalization workbench — drag columns between tables | The decomposition is a sequence with a right answer at each step, which the animated diagram already delivers. A drag-and-drop version would test dexterity, and the exam asks the student to write the tables out. |
| A transaction concurrency simulator — interleave two transactions | Genuinely interesting, and beyond this syllabus. 6.2 asks for "concurrency in transaction" at the level of naming the lost-update problem; a simulator would teach material that is not examined. |
| A backup/restore timeline | The full/incremental/differential difference is one sentence and one table. Interaction would add motion, not understanding. |
| An ACID failure simulator | Each property is memorised by the failure it prevents. The static figure pairs them; clicking through the same pairs adds nothing. |
| A schema designer — build an ER diagram from scratch | Would need drag-and-drop, shape selection, validation and an answer model. That is a product, not a lesson component, and Unit 2's exam question is answered on paper. |

The pattern in every rejection is the same: **interaction earns its place when
the student must change an input and see a consequence they could not have
predicted.** Where the content is a fact, a list or a procedure with one right
order, static or animated presentation is clearer and cheaper.

---

## 6. Added in Phase 4.1 — two more components, and a reversal

Phase 4 rejected five interaction candidates and shipped **four of seven
DBMS units read-only**, with a single worked example each. That was a
defensible reading of "do not over-interact" and a poor product: a unit
with no interaction and one example is a page of notes.

Two of those rejections were re-examined and **one was reversed**.

### 6.1 Decision drill — `drill`

**File:** `_source/runtime/sim-drill.js`

**The reversal.** Phase 4 rejected "a normalization workbench — drag
columns between tables", and that rejection still stands. But a
**diagnostic** interaction is a different thing from a manipulation one,
and the rejection had quietly covered both.

Several SEE questions are neither recall nor calculation. They are
judgements made against a rule:

> this table — which normal form does it break?
> this log — redo or undo?
> this pair of sentences — 1:M or M:N?

A student who knows the rule can still get these wrong, because the
skill is applying it to a case they have not seen. That skill comes from
doing it several times with immediate reasons — which is exactly what a
quiz does not give, because a quiz asks once, scores, and moves on.

**Why one component and not three.** The three units need the same
interaction and differ only in their cases. A lesson picks a set; a
future unit adds a set, not a component.

```html
<div class="drill" data-set="normalforms"></div>
```

| `data-set` | Unit | The judgement |
| --- | --- | --- |
| `dbterms` | 1 | data, information, database or DBMS? |
| `cardinality` | 2 | 1:1, 1:M or M:N? |
| `normalforms` | 5 | which normal form does this break? |
| `recovery` | 7 | redo or undo? |

**Design rules the sets follow**, all four enforced by
`tests/dbms.test.js`: at least four cases; at least two different
answers used (a set where every case answers the same thing teaches
button-pressing); a bilingual reason of at least twelve words on every
case; and every answer id must exist among the options — an answer that
matches no option would mark every attempt wrong, silently.

The `normalforms` set is additionally checked against the rules the unit
states: the 1NF case must really show a cell holding two values, the 2NF
case must really have a composite key, and the set must contain a table
that is **already correct** — recognising one is as examinable as fixing
one.

### 6.2 Concurrency stepper — `conclab`

**File:** `_source/runtime/sim-concurrency.js`

**Not the rejected simulator.** Phase 4 rejected "a transaction
concurrency simulator — interleave two transactions" as beyond the
syllabus, and a general one still is. This plays exactly **two fixed
schedules of the same two transactions**, interleaved and then
serialised, because 6.2 asks for the lost-update problem by name. There
is nothing to configure and no scheduling to explore.

**The misconception it solves.** Students are told "two users at once
can corrupt the data" and picture something violent. The truth is harder
to accept: **nobody does anything wrong.** Two clerks each read a
correct balance, each subtract correctly, each write correctly — and one
withdrawal vanishes.

That is impossible to believe from a sentence and obvious once you have
watched it. The component shows three numbers at once — what each clerk
is holding, and what the database actually says — and at step 4 all
three disagree, four steps before anything looks wrong.

Switching to the locked schedule runs the same two withdrawals in a
different order and ends at the correct balance. Same arithmetic,
different result: that comparison is the lesson.

The arithmetic is asserted by tests, including that both schedules run
the *same* two withdrawals — without that, the comparison proves
nothing.

### 6.3 Still not built

The other three rejections stand unchanged, for the reasons in §5: the
backup timeline, the ACID failure simulator, and the from-scratch schema
designer. Nothing about them has changed.
