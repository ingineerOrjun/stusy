# Phase 4 — DBMS Curriculum Map

**Subject:** Database Management System
**Grade:** 10 · Credit hrs 4 · Working hrs 128 · Theory hrs 64 · Written exam 50 marks
**Subject key:** `grade10/dbms`

This maps the official CDC syllabus already in the repository onto pages,
learning experiences and questions. Nothing here is invented curriculum. Where
the syllabus is silent or ambiguous, the gap is **recorded below rather than
quietly filled**.

---

## 1. Source of truth

`_source/content/syllabus.js` → `grade10/dbms` is the authoritative transcription
of the CDC scope-and-sequence list. It gives, for each of 7 units, the title, the
Nepali title, the prescribed hours and the numbered topic list. It totals
**64 theory hours**, which the build already verifies.

It is **unchanged by this phase.** The map below reads it; it does not edit it.

### Hours are transcribed. Marks are derived — and that is a real gap.

| Unit | Content area | Hrs | Marks (derived) |
| --- | --- | --- | --- |
| 1 | Introduction to Database System | 6 | 5 |
| 2 | Entity Relationship Model (ER-Model) | 10 | 8 |
| 3 | Relational Model | 10 | 8 |
| 4 | SQL (Structured Query Language) Overview | 14 | 11 |
| 5 | Relational Database Design | 8 | 6 |
| 6 | Database Transaction | 8 | 6 |
| 7 | Database Backup, Recovery and Security | 8 | 6 |
| | **Total** | **64** | **50** |

> ### AMBIGUITY A1 — the DBMS specification grid is not in this repository
>
> For Digital Design, per-unit marks were **read from the CDC specification
> grid (p. 76)** and transcribed. For DBMS, no specification grid is present in
> the repository or in any project document. Only hours are available.
>
> The build requires a completed subject's marks to total exactly 50, so a
> distribution had to be chosen. It was derived by **apportioning 50 marks
> across the 64 prescribed hours** (0.78125 marks/hour) and rounding by largest
> remainder.
>
> **This is a model, not a transcription, and it is very likely wrong in
> detail.** The real Digital Design grid is *not* proportional to hours — its
> Unit 1 earns 7 marks for 12 hours (0.58/hr) while its Unit 2 earns 15 for 14
> (1.07/hr). A real grid weights by how examinable a topic is, not by how long
> it takes to teach.
>
> **What this affects:** only the mark badge shown on each unit page and the
> relative depth of each unit's exam section. It does not affect what is
> taught — that comes from the hours and the topic list, both of which are
> transcribed.
>
> **What to do when the grid is obtained:** change the `marks` values in
> `_source/config/pages.js` for `grade10/dbms` and rebuild. The build will
> refuse the change unless the new values also total 50, and nothing else needs
> to move.

Even as a derivation, the ordering it produces is defensible: **SQL is the
largest unit at 14 hours and takes the most marks**, which matches both the
syllabus's own emphasis and what SEE papers examine most heavily.

---

## 2. What the SQL syllabus actually requires — and what it does not

§9 of the phase brief asks which SQL syntax is genuinely required before any of
it is implemented. This was checked against the syllabus text rather than
against habit.

**Required — named explicitly in units 4.2–4.7:**

| Category | Syllabus item | Statements |
| --- | --- | --- |
| DDL | 4.2 | `CREATE`, `ALTER`, `DROP`, `RENAME` |
| DML | 4.3 | `SELECT`, `INSERT`, `UPDATE`, `DELETE` |
| DCL | 4.4 | `GRANT`, `REVOKE` |
| Clauses | 4.5 | `WHERE`, `AND`, `OR`, `WITH`, `ORDER BY` |
| Joins | 4.6 | Inner, Natural, Left Outer, Right Outer, Full Outer |
| Views | 4.7 | `CREATE VIEW` |

**NOT required — and therefore not taught and not implemented:**

`GROUP BY` · `HAVING` · aggregate functions (`COUNT`, `SUM`, `AVG`, `MIN`,
`MAX`) · `DISTINCT` · `LIKE` · `BETWEEN` · subqueries · `BCNF` and higher normal
forms · indexes · triggers · stored procedures.

None of these appear anywhere in the DBMS syllabus. They are standard SQL and
standard in university DBMS courses, which is exactly why they had to be checked
rather than assumed.

> **A note on the brief's own example.** §17 of the phase brief offers
> `WHERE ≠ HAVING` as a candidate misconception. `HAVING` is not in this
> syllabus, so that misconception is **out of scope** and is not taught. Adding
> it would be adding university material to an SEE course — the thing §3
> forbids. The misconceptions actually used are in §5 below, and every one of
> them is anchored to a numbered syllabus topic.

> ### AMBIGUITY A2 — `WITH` in the clause list
>
> 4.5 lists `WITH` among "SQL Clauses — WHERE, AND, OR, WITH, ORDER BY". In
> modern SQL, `WITH` introduces a Common Table Expression, which is well beyond
> SEE level and sits oddly between `OR` and `ORDER BY` — a list otherwise made
> of elementary filtering clauses.
>
> **Resolution: taught as a named clause with a worked example, at recognition
> depth only, and NOT implemented in the simulator.** A student who meets
> "state the SQL clauses you have studied" in a paper must be able to name and
> recognise it. A student is not expected to compose one, and the simulator
> answers a `WITH` query with an educational message saying so.
>
> Recorded so a reviewer with the real question papers can widen or narrow it.

> ### AMBIGUITY A3 — DCL (`GRANT` / `REVOKE`) has no observable effect offline
>
> 4.4 requires DCL. But `GRANT` and `REVOKE` change *permissions*, and this
> platform has no users, no sessions and no server — by design (§29).
>
> **Resolution: taught statically, with syntax and a permissions table, and
> deliberately NOT in the simulator.** A simulator that accepted `GRANT` and
> appeared to do something would be teaching a fiction. The unit says plainly
> that these are the statements a DBA runs and shows what changes for the user
> who is granted the right.

> ### AMBIGUITY A4 — five join types, one syllabus line
>
> 4.6 names Inner, Natural, Left Outer, Right Outer and Full Outer joins in a
> 14-hour unit that also carries all of DDL, DML, DCL, clauses and views.
>
> **Resolution: all five are taught; Inner and Left Outer are taught to
> composing depth, the other three to reading depth.** The join visualiser
> shows all five, because the *difference between them* is the examinable
> idea and it is a visual difference. Composing a full outer join by hand is
> not an SEE-level task.

> ### AMBIGUITY A5 — normalization stops at 3NF
>
> 5.3 names "Normal Forms — 1NF, 2NF, 3NF" and no others.
>
> **Resolution: 1NF, 2NF and 3NF only. BCNF is not taught**, not even as an
> aside. The syllabus is explicit and unusually unambiguous here.

> ### AMBIGUITY A6 — where ER→Relational mapping belongs
>
> "Mapping ER-Model to Relational Model" is topic **3.4**, inside the Relational
> Model unit, although it depends entirely on Unit 2's ER model.
>
> **Resolution: taught in Unit 3 as the syllabus places it**, and used as the
> bridge that opens the unit — Unit 2 ends with an ER diagram, Unit 3 begins by
> turning that same diagram into tables. The continuity is deliberate: it is
> the same worked example carried across two units.

---

## 3. Unit → topic → treatment

Visual treatment uses the Phase 2.5 hierarchy: **static → animated →
interactive → simulation**, chosen by what the student must *do* with the idea.

- **Static** — a spatial fact, a taxonomy, or something to memorise and redraw.
- **Animated** — a process whose order or movement is the lesson.
- **Interactive** — the student changes an input and must see the consequence.
- **Simulation** — the student experiments freely and forms a rule from it.

### Unit 1 — Introduction to Database System · 6 hrs · 5 marks

| # | Topic | Treatment | Assessment |
| --- | --- | --- | --- |
| 1.1 | Data, Information, Database, DBMS | **Static** — the data→information ladder | define, distinguish |
| 1.2 | Limitations of the file system | **Static + table** — redundancy, inconsistency, isolation | list limitations |
| 1.3 | Advantages / disadvantages of a database system | **Static** — two-column comparison | state four advantages |
| 1.4 | Applications of a database system | **Static** — short list, Nepal-relevant examples | give examples |
| 1.5 | Types of database users | **Static** — DBA, designer, analyst, end user | name and describe |
| 1.6 | DBMS architecture | **Animated** — the three-level architecture, showing what each level hides | draw and label |
| 1.7 | Database models | **Static** — hierarchical, network, relational, object | compare |
| 1.8 | Database schema | **Static + worked** — schema vs instance | distinguish |

**Misconception targeted:** *a database is the same thing as a DBMS*.
Addressed in 1.1 and tested in the prediction.

### Unit 2 — Entity Relationship Model · 10 hrs · 8 marks — **flagship: ER visualiser**

| # | Topic | Treatment | Assessment |
| --- | --- | --- | --- |
| 2.1 | Introduction to the ER model | **Static** — why model before building | state purpose |
| 2.2 | Entity, weak entity, entity set | **Interactive (ER visualiser)** — shapes and what each means | identify from a diagram |
| 2.3 | Attributes and their types | **Interactive** — simple, composite, derived, multivalued, key | classify attributes |
| 2.4 | Relationship and its types | **Interactive** — unary, binary, ternary | identify degree |
| 2.5 | Mapping cardinalities | **Interactive + animated** — 1:1, 1:M, M:N, changing the cardinality and seeing the consequence | **draw an ER diagram** |
| 2.6 | Keys in DBMS | **Static + interactive table** — super, candidate, primary, foreign, composite | define and identify |

**Misconceptions targeted:** *entity vs attribute*; *one-to-many vs
many-to-many*; *a weak entity is just an unimportant one*.

### Unit 3 — Relational Model · 10 hrs · 8 marks — **flagship: table visualiser**

| # | Topic | Treatment | Assessment |
| --- | --- | --- | --- |
| 3.1 | Introduction to the relational model | **Static** — everything is a table | state |
| 3.2 | Tuple, cardinality, column, attribute, degree, domain, instance, schema, key | **Interactive (table visualiser)** — the vocabulary shown on one live table, each term highlighting what it names | **label a given table** |
| 3.3 | Properties of relations | **Static + prediction** — no duplicate tuples, order does not matter, atomic values | state properties |
| 3.4 | Mapping ER to relational | **Animated** — the Unit 2 ER diagram decomposing into tables, including the junction table an M:N relationship forces | **convert ER to tables** |

**Misconceptions targeted:** *row vs column*; *degree vs cardinality* (the
single most confusable pair in this unit); *primary key vs foreign key*.

### Unit 4 — SQL Overview · 14 hrs · 11 marks — **flagship: SQL simulator**

| # | Topic | Treatment | Assessment |
| --- | --- | --- | --- |
| 4.1 | Introduction to SQL | **Static** — what SQL is, DDL/DML/DCL families | classify a statement |
| 4.2 | DDL — CREATE, ALTER, DROP, RENAME | **Simulation** — run against the teaching schema | write CREATE TABLE |
| 4.3 | DML — SELECT, INSERT, UPDATE, DELETE | **Simulation** — the core of the unit | **write queries** |
| 4.4 | DCL — GRANT, REVOKE | **Static** (ambiguity **A3**) — syntax and a permissions table | state syntax and purpose |
| 4.5 | Clauses — WHERE, AND, OR, WITH, ORDER BY | **Simulation + animated** — rows filtering, then sorting | **predict a result** |
| 4.6 | Joins — inner, natural, left, right, full outer | **Animated + simulation** (ambiguity **A4**) — matching rows meeting | identify which join produced a result |
| 4.7 | SQL View | **Static + worked** — a stored query that looks like a table | define, state uses |

**Misconceptions targeted:** *DELETE vs DROP* (the costliest one in the unit);
*`WHERE marks > 60` selects columns*; *a join multiplies rows arbitrarily*.

### Unit 5 — Relational Database Design · 8 hrs · 6 marks

| # | Topic | Treatment | Assessment |
| --- | --- | --- | --- |
| 5.1 | Functional dependency and its types | **Static + worked** — full, partial, transitive | identify the dependency |
| 5.2 | Normalization | **Static** — why decompose at all: the update anomaly | state purpose |
| 5.3 | 1NF, 2NF, 3NF | **Animated** (ambiguity **A5**) — one bad table decomposing step by step, each step removing a named anomaly | **normalise to 3NF** |

**Misconception targeted:** *normalisation is about saving space*. It is about
removing anomalies; the space saving is a side effect.

### Unit 6 — Database Transaction · 8 hrs · 6 marks

| # | Topic | Treatment | Assessment |
| --- | --- | --- | --- |
| 6.1 | Introduction to transaction | **Static + worked** — the bank transfer, the canonical example | define |
| 6.2 | Concurrency in transaction | **Static** — the lost update problem | state a problem |
| 6.3 | ACID properties | **Static + prediction** — one failure per property | **explain ACID** |
| 6.4 | States of a transaction | **Animated** — the state diagram walked, including the abort path | **draw the state diagram** |

**Misconception targeted:** *a failed transaction leaves half its work behind*.
Atomicity is precisely the promise that it does not.

### Unit 7 — Backup, Recovery and Security · 8 hrs · 6 marks

| # | Topic | Treatment | Assessment |
| --- | --- | --- | --- |
| 7.1 | Introduction to backup | **Static** — what and why | define |
| 7.2 | Types — physical, logical | **Static + table** | distinguish |
| 7.3 | Reasons for database failure | **Static** — hardware, software, human, disaster | list |
| 7.4 | Methods of backup | **Static + table** — full, incremental, differential | compare |
| 7.5 | Recovery, redo / undo | **Animated** — the log replayed forward and rolled back | explain redo vs undo |
| 7.6 | Introduction to database security | **Static** — authentication, authorisation, encryption | state measures |
| 7.7 | Common threats | **Static** — with SQL injection named honestly | list threats |

**Misconception targeted:** *redo and undo are the same operation reversed*.
They serve different failures and run at different times.

---

## 4. Coverage check

| | |
| --- | --- |
| Syllabus units | 7 |
| Unit pages planned | 7 |
| Numbered syllabus topics | 39 |
| Topics with a planned treatment | 39 |
| Topics deliberately taught at reading depth only | 3 — `WITH` (**A2**), DCL (**A3**), three of the five joins (**A4**) |
| Topics omitted | 0 |

---

## 5. The learning loop, per unit

Every unit follows the platform's established flow. The map above chooses
*where* each stage earns its place — not every topic gets every stage, because
§5 of the brief is right that interaction without a reason is a gimmick.

```
READ      bilingual explanation, both languages authored
 ↓
SEE       diagram — static unless order or change is the lesson
 ↓
PREDICT   commit to an answer before the reveal, on the topic where
          the common misconception actually bites
 ↓
INTERACT  ER visualiser · table visualiser · SQL simulator
 ↓
OBSERVE   the result, with the reason it came out that way
 ↓
UNDERSTAND  worked example showing reasoning, not just the answer
 ↓
PRACTISE  exam connection early, then SEE-style questions
 ↓
REMEMBER  key points to revise
```

---

## 6. Question bank plan

Target shape per unit, using the existing schema (`id`, `subject`, `unit`,
`topic`, `difficulty`, `type`, `examRelevant`, `prompt`, `options`, `answer`,
`explanation`), fully bilingual.

| Cognitive level | What it asks | Roughly |
| --- | --- | --- |
| Recall | definitions, terminology, syntax | 30% |
| Understanding | interpret a concept, distinguish a confusable pair | 30% |
| Application | apply to a scenario | 20% |
| SQL / output reasoning | predict the result of a query | 10% |
| Diagram interpretation | read an ER diagram or a table | 10% |

**Rule followed while writing:** no two questions may test the same fact with
different wording. Where a fact matters enough for two questions, the second
must test it at a different cognitive level.

---

## 7. What this phase will NOT add

Named here so the boundary is explicit and checkable: no login, no backend, no
database server, no payment, no subscription, no cloud sync, no analytics
backend, no teacher dashboard, no admin CMS. No other subject is started.
