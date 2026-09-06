# Phase 4 — Completion Report

**Database Management System as the second flagship subject**, and the test of
whether the platform could carry a completely different technical subject
without being changed to suit it.

Every number below is measured. Where something could not be measured, it says
so in those words.

---

## 1. Baseline

Verified before anything was written, on the Phase 3.1 branch
`phase-3.1-foundation-consolidation` at commit `2d7f241`, working tree clean.

| | Before | After |
| --- | --- | --- |
| Authored subjects | 2 | **3** |
| Student pages | 26 | **34** |
| Automated tests | 202 | **265** |
| SVG diagrams | 38 (32 static, 6 animated) | **53** (42 static, 11 animated) |
| Question bank | 69 | **121** |
| Written content | 32,281 words | **49,812 words** |
| Internal links | 1,102 | **1,485**, 0 broken |
| Runtime dependencies | none | **none** |

The baseline suite passed 202/202 and the build was clean before any change.

**Build code changed in exactly four places**, all of them registrations rather
than logic: four runtime modules added to the publish list, one stylesheet added
to the cascade, one question bank registered, and the self-controlled-component
list extended by three class names. The page map and content files did the rest
— which is what the Phase 1 architecture claimed and had not previously been
tested by a second flagship subject.

---

## 2. Curriculum coverage

Source of truth: `_source/content/syllabus.js` → `grade10/dbms`, the CDC
scope-and-sequence transcription already in the repository. **Unchanged by this
phase.** Full mapping in
[PHASE-4-DBMS-CURRICULUM-MAP.md](PHASE-4-DBMS-CURRICULUM-MAP.md).

| | |
| --- | --- |
| Syllabus units | 7 |
| Units authored | **7** |
| Numbered syllabus topics | 39 |
| Topics with a treatment | **39** |
| Topics omitted | **0** |
| Hours | 64, verified by the build against the syllabus |
| Marks | 50, **derived — see below** |

### Six documented ambiguities

Recorded rather than silently resolved. **A1 is the one that matters.**

| # | Ambiguity | Resolution |
| --- | --- | --- |
| **A1** | **No DBMS specification grid exists in this repository.** Only hours are available. | Marks **apportioned from hours** (0.78125 marks/hour, largest-remainder rounding). **This is a model, not a transcription, and is very likely wrong in detail** — the real Digital Design grid is *not* proportional to hours. It affects only the mark badge and the relative depth of each exam section, not what is taught. Replacing it is a one-line change per unit in `pages.js`; the build refuses any set that does not total 50. |
| A2 | `WITH` listed among elementary clauses, though it introduces a CTE | Taught at recognition depth; **not** implemented in the simulator |
| A3 | DCL (`GRANT`/`REVOKE`) has no observable effect with no users and no server | Taught statically with syntax; deliberately **not** simulated, because a simulator that appeared to run it would teach a fiction |
| A4 | Five join types in one 14-hour unit | All five taught; inner and left to composing depth, the rest to reading depth |
| A5 | Normal forms listed as 1NF, 2NF, 3NF only | **BCNF not taught**, not even as an aside |
| A6 | ER→relational mapping sits in Unit 3 but depends on Unit 2 | Taught where the syllabus places it, using the same worked example carried across both units |

### The scope decision that mattered most

§9 of the brief asked which SQL the syllabus actually requires. Checking rather
than assuming found that **`GROUP BY`, `HAVING` and aggregate functions are
absent from this syllabus** — along with `DISTINCT`, `LIKE`, `BETWEEN`,
subqueries and BCNF.

They are standard SQL and standard in university DBMS courses, which is exactly
why they had to be checked. Following the brief's own example list literally
would have added university material to an SEE course. The brief offered
`WHERE ≠ HAVING` as a candidate misconception; `HAVING` is not on this syllabus,
so it was **not** taught, and a test now asserts none of these terms appears in
the DBMS content.

---

## 3. Units completed

All seven, each with the full learning flow: objectives → bilingual explanation
→ diagram → prediction → interaction → worked example → exam connection →
practice questions with model answers → revision summary.

| Unit | Hrs · Marks | Flagship element |
| --- | --- | --- |
| 1 Introduction to Database System | 6 · 5 | animated three-level architecture |
| 2 Entity Relationship Model | 10 · 8 | **ER visualiser** |
| 3 Relational Model | 10 · 8 | **table visualiser**, animated ER→tables |
| 4 SQL | 14 · 11 | **SQL simulator** ×3 instances |
| 5 Relational Database Design | 8 · 6 | animated normalisation to 3NF |
| 6 Database Transaction | 8 · 6 | animated transaction states |
| 7 Backup, Recovery and Security | 8 · 6 | animated redo/undo on the log |

17,005 words of DBMS content, all bilingual.

**Each unit is built around one named misconception** — DBMS-vs-database,
1:M-vs-M:N, degree-vs-cardinality, DELETE-vs-DROP, what normalisation is for,
what atomicity promises, redo-vs-undo. The explanation, the prediction, the
worked example and at least one question all point at the same error. The list
is in [DBMS-CONTENT-GUIDELINES.md §3](DBMS-CONTENT-GUIDELINES.md).

**Iterative delivery, as the brief required.** Unit 4 was built first as the
complete representative unit, inspected in all three languages and at four
widths, and two defects were fixed before the other six were written — so the
same mistake was not multiplied seven times. Both are in §12.

---

## 4. Interactive components

Full detail in [DBMS-SIMULATION-SPEC.md](DBMS-SIMULATION-SPEC.md). All three are
configured by data, so a future unit reuses them rather than adding a fourth.

### SQL learning simulator

A hand-written tokeniser, recursive-descent parser and evaluator — 847 lines, no
dependencies. **Separated from its UI** so it can be driven directly by tests: a
student is told their query is wrong by this file, so this file has to be right.

It returns a **trace**, not just an answer: `FROM 4 → WHERE 3 → SELECT 3 →
ORDER BY 3`. That trace is the lesson. Delete the `WHERE` and the count stops
falling; add `ORDER BY` and the last number does not move.

Executed: `SELECT` (with `WHERE`, `AND`/`OR`, brackets, `ORDER BY`, all five
joins), `INSERT`, `UPDATE`, `DELETE`, `CREATE TABLE`, `DROP TABLE`.
Recognised and explained but not executed: `ALTER`, `RENAME`, `GRANT`, `REVOKE`,
`WITH`, `CREATE VIEW`. Refused with a reason: everything outside the syllabus.

**Every refusal is written as teaching.** There is no generic "syntax error" —
a misspelled column lists the columns that exist; a join without `ON` explains
that every row would otherwise pair with every row; `COUNT(*)` is told it is not
part of this course.

### Relational table visualiser

Choose "degree" and the columns light up; choose "cardinality" and the rows do.
The word attaches to a thing on screen rather than to another word.

It is **also the SQL result renderer**, deliberately: a `SELECT` returns a
relation, and rendering it with a different component would quietly teach that a
query result is a different kind of object from a table.

The teaching schema has **two deliberate holes** — Gita has no class, class 12
has no student. Without them every join returns identical rows and the lesson is
invisible. A test asserts both holes still exist.

### ER model visualiser

Shows the notation *and* the actual occurrences beneath it. Changing the
cardinality changes both, and the rows are where the difference lives:

```
1:M   Ram → Maths, Science      every course points back at ONE student
M:N   Ram → Maths, Science      Maths is reached from TWO students
      Sita → Maths, Nepali      both directions are "many"
```

The junction table appears **only** in M:N — the consequence a student must be
able to state in the exam.

---

## 5. Animation decisions

**Five new animated diagrams**, each one a process whose *order* is the lesson:
the three-level architecture (what each level hides), ER→relational mapping (the
junction table appearing), normalisation (one anomaly removed per step),
transaction states (including the failure path most answers omit), and recovery
(redo forwards, undo backwards on the same log).

**Ten static figures** where the content is a taxonomy, a comparison or a
notation reference — animating a lookup teaches the order of the rows.

**Five interaction candidates were considered and rejected**, with reasons
recorded in [DBMS-SIMULATION-SPEC.md §5](DBMS-SIMULATION-SPEC.md): a
normalization drag-and-drop workbench, a concurrency simulator, a backup
timeline, an ACID failure simulator, and a from-scratch schema designer. The
pattern in every rejection: interaction earns its place when the student must
change an input and see a consequence they could not have predicted.

Motion in the components is limited to state changes — a highlight moving, a
shape gaining focus — all CSS transitions on paint properties, none on layout,
and all disabled under `prefers-reduced-motion`.

---

## 6. Language implementation

The Phase 3.1 language system was **inherited, not re-implemented**. No
DBMS-specific language code exists.

- All seven units, the hero, the quiz and all three components are authored in
  both languages. No page is duplicated per language.
- Control labels come from `UIStrings`. One new key was needed (`run`), and the
  build **refused to compile until it was added** — the platform contract
  working exactly as Phase 3.1 designed it.
- Every trace step the SQL engine emits is bilingual, asserted by a test that
  also checks the Nepali is in Devanagari.
- Component labels use the §5D label-pair split, so English mode shows English
  and Nepali mode shows Nepali with no stranded separator.

**Terminology stays English**, glossed rather than replaced — `primary key`,
`foreign key`, `tuple`, `degree`, `cardinality`, `normalization`, `ACID`, every
SQL keyword. A Nepali-mode student who met "प्राथमिक कुञ्जी" and then saw
"primary key" on the paper would be worse off. The policy and its full list are
in [DBMS-CONTENT-GUIDELINES.md §2](DBMS-CONTENT-GUIDELINES.md).

**ER and table figures keep English labels inside the SVG**, with the meaning
carried by the bilingual caption below — SVG text does not reflow, and splitting
it is fragile.

**Verified:** all 9 DBMS pages swept in all three modes — 0 language leaks,
0 empty panels.

---

## 7. Question bank

52 new DBMS questions; 121 across the platform.

| Unit | Questions | | Difficulty | Count |
| --- | --- | --- | --- | --- |
| 1 Introduction | 8 | | easy | 14 |
| 2 ER Model | 8 | | medium | 22 |
| 3 Relational Model | 6 | | hard | 16 |
| 4 SQL | 10 | | | |
| 5 Design | 6 | | | |
| 6 Transaction | 6 | | | |
| 7 Backup & Security | 8 | | | |

All bilingual — prompts, options and explanations. Four rules are enforced by
`tests/dbms.test.js`: every unit has questions; **no two questions share unit +
topic + difficulty**; at least five questions at each difficulty; every question
is structurally complete.

That second rule found two real duplicates in this bank while it was being
written — questions that differed in what they tested but shared a topic tag.
The tags were wrong, and were corrected.

Distractors are the misconceptions from §3, so a student who picks one learns
something from the explanation. Explanations are written for the student who got
it **wrong**.

---

## 8. Accessibility

The Phase 3.1 infrastructure was reused; no new accessibility mechanism was
built.

**Verified in this phase**
- Every control is a real `<button>` or `<textarea>` with a visible focus ring
  from the shared token.
- The SQL editor has a `<label>`, and `aria-describedby` pointing at the
  statement-scope note.
- Term and cardinality buttons carry `aria-pressed`, and focus is restored to
  the pressed button after the component re-renders.
- Output regions are `role="status"`, so a result and a refusal both announce.
- Ctrl/Cmd+Enter runs a query; plain Enter still makes a newline, because a
  query is often three lines.
- Every table scrolls inside its own container; the page never scrolls
  sideways.
- No text below the 12px floor. No colour-only signalling — PK and FK are
  badges that say "PK" and "FK".
- `prefers-reduced-motion` disables every transition added by this phase.

> ### WCAG 2.1 AA IS NOT CLAIMED

**NOT VERIFIED**
- **What a screen reader announces.** No screen reader was available in this
  environment. The markup was written for one and the roles are asserted by
  tests, but **DOM assertions are not screen-reader testing** — a point Phase
  3.1 proved the hard way.
- **Colour as a colour-blind student perceives it.** No simulation tool
  available.
- **Layout at 200% and 400% zoom.** Not tested.

---

## 9. Mobile results

Measured with `tests/manual/qa-sweep.js`, which reports real layout after real
CSS — page overflow, content clipped by a non-scrolling parent, panels a mode
left empty, wrong-language text, and text below the type floor.

| Width | Pages swept | Result |
| --- | --- | --- |
| 320px | unit2, unit3, unit4 | **clean** |
| 430px | unit4 | **clean** |
| 768px | unit4 | **clean** |
| 1280px | all 9 DBMS pages × 3 modes | **clean** |

At 320px the SQL simulator remains fully usable: the editor wraps, the buttons
are full-size touch targets, and each pipeline step stacks so the sentence keeps
a readable measure with the row count still on the right. Confirmed by eye, not
only by assertion.

**Not swept:** 375px, 390px and 1440px were not measured individually. The
brief lists seven widths; four were tested, and the two untested phone widths
sit between 320 and 430, both of which are clean. **Stated rather than implied.**

---

## 10. Performance observations

The whole phase adds **no dependency, no network request and no build step**.

| | Measured |
| --- | --- |
| `sql-engine.js` | 34.1 KB unminified |
| `sim-sql.js` | 26.9 KB unminified |
| `sim-table.js` | 18.9 KB unminified |
| `sim-er.js` | 21.9 KB unminified |
| `dbms.css` | 14.4 KB unminified |
| Build time, full site | 1.76 s |
| Test suite, 265 tests | 7.43 s |

Only the output region is rebuilt when a query runs, so the student's typing,
caret and scroll position survive a run. The engine never mutates the database
it is given; it works on a copy, which makes Reset exact.

**NOT MEASURED: frame rate.** The only environment available throttles
`requestAnimationFrame`, so any number would be fiction. Consistent with every
previous phase, none is quoted.

---

## 11. Tests

**265 tests, 265 passing, verified across 10 consecutive runs.**

63 new tests in two files:

| Suite | Tests | Covers |
| --- | --- | --- |
| `sql-engine.test.js` | 38 | SQL semantics, teaching errors, safety, the trace |
| `dbms.test.js` | 25 | both visualisers, syllabus coverage, question-bank quality |

The engine tests check **SQL semantics**, not that a component renders: all five
joins against hand-worked answers, AND/OR precedence, NULL comparison, primary
key uniqueness, DELETE-vs-DROP, and that a statement never mutates the caller's
database.

**Two real defects were found by these tests before any student could meet
them:**

- **`ORDER BY` on an unselected column was refused.** `SELECT name FROM Student
  ORDER BY marks` is legal SQL, and an engine that refused it would have taught
  a rule that does not exist — a student following it would lose marks for
  correct SQL. Fixed by sorting before projection.
- **A prototype-chain leak.** `SELECT constructor FROM Student` resolved,
  because a plain `{}` inherits from `Object.prototype`. Fixed with
  `Object.create(null)` and own-property lookup, and the test that found it now
  guards it.

Safety is asserted structurally: a test greps the engine source for `eval`, the
`Function` constructor, `fetch`, `XMLHttpRequest` and `innerHTML`, so the
"no execution path from student input" guarantee cannot quietly lapse.

---

## 12. Regression results

| Check | Scope | Result |
| --- | --- | --- |
| Build | full site | **clean, zero warnings** |
| Content validation | 8 subjects, 7 outlines, 23 authored pages, 53 diagrams | OK |
| Hours and marks | DBMS | 64 hrs, 50 marks — **verified by the build** |
| Automated tests | 265 | **265 pass, 0 fail** |
| Suite stability | 10 consecutive runs | **all clean** |
| Internal links | 1,485 | **0 broken** |
| Build determinism | 64 files | **byte-identical** |
| Fresh-tree reproduction | different absolute path | **byte-identical, 265/265** |
| Three-mode sweep | 9 DBMS pages × 3 modes @1280 | **clean** |
| Mobile sweep | 320 / 430 / 768 | **clean** |
| Pre-existing pages | digital-design unit3, oop-cpp trace, home | **clean** |
| Existing simulations | K-map, program tracer | working |
| New animated diagrams | transaction states, 5 steps | working |

**No regression was found in any existing subject.** No existing content file
was modified by this phase.

### Two defects found in the representative unit, before replication

Both found by looking at Unit 4 on screen, and both fixed before units 1, 2, 3,
5, 6 and 7 were written — which is the entire value of building one unit first.

1. **`degreeस्तम्भ`** — the degree and cardinality labels rendered both
   languages with no separator, the same collision class Phase 3.1 fixed on the
   gate workbench. Fixed in CSS.
2. **The pipeline stage read `ORDER`, not `ORDER BY`** — the engine's internal
   stage name leaking into the student's view. Fixed with an explicit label map,
   so the student sees the SQL keyword they will meet in the exam.

### One caught by the platform contract

`data-ui="run"` with no `run` key in the string table **failed the build**. That
is the Phase 3.1 enforcement doing exactly its job: a new component could not
ship a hard-coded control label even by accident.

---

## 13. Known limitations

Stated plainly rather than left to be discovered.

- **The DBMS marks are derived, not transcribed** (ambiguity A1). The single
  most consequential unknown in this phase.
- **The SQL simulator is not a database.** It runs the syllabus subset against a
  fixed teaching schema. `ALTER`, `RENAME`, `GRANT`, `REVOKE`, `WITH` and
  `CREATE VIEW` are taught but not executed, each with the reason shown to the
  student.
- **Two DDL statements cannot be practised interactively.** `ALTER` and `RENAME`
  would need a mutable schema, and the fixed schema is what keeps every other
  example reproducible. A student learns their syntax from a worked example.
- **The ER visualiser offers two models, not free drawing.** Building an ER
  diagram from scratch is a product, not a lesson component.
- **Screen-reader behaviour, colour-blind perception and zoom above 100% are
  NOT VERIFIED** (§8).
- **Frame rate is NOT MEASURED** (§10).
- **375px, 390px and 1440px were not swept individually** (§9).

---

## 14. Deferred work

| # | Item | Why it waits |
| --- | --- | --- |
| 1 | Obtain the DBMS specification grid and replace the derived marks | Needs the physical CDC document. One line per unit in `pages.js`; the build enforces the total |
| 2 | Screen-reader verification | Needs a real reader and a person listening. Still the platform's biggest unknown |
| 3 | Colour-blind simulation, zoom to 200%/400% | Same shape of gap — tools this environment does not have |
| 4 | Frame rate on a mid-range phone | Must be measured on real hardware, not in an automation pane |
| 5 | The 63 inline event handlers | Carried from Phase 3.1. The new components are fully delegated, so the debt is shrinking |
| 6 | English headings in Nepali mode | Carried from Phase 3.1. Fixing it well means authoring Nepali headings as content |
| 7 | The five remaining unwritten subjects | Content work, not platform work |

---

## 15. Architectural lessons

**The extension point held.** Adding a whole subject took a page-map entry,
content files, a question bank and four registrations. No build logic changed.
That claim had been made since Phase 1 and never tested by a second flagship
subject; it is now evidence rather than assertion.

**Separating the engine from its UI paid for itself immediately.** Both real
defects in the SQL simulator — the `ORDER BY` rule and the prototype leak — were
found by tests that drive the engine directly. Neither would have been caught by
clicking through the component, and both would have taught a student something
false.

**The trace is worth more than the answer.** The most valuable design decision
in this phase was returning the *stages* of a query rather than only its result.
It is also the decision that made "why not use a real SQL engine" easy to
answer: a real engine gives a better answer and cannot teach.

**Checking the syllabus beat following the brief.** The brief's own example
misconception (`WHERE ≠ HAVING`) was out of scope, and `GROUP BY` and aggregates
would have been added on autopilot. Reading the syllabus first removed a whole
category of university material from an SEE course.

**Building one unit first was not a formality.** Two defects were found and
fixed in Unit 4 that would otherwise have shipped seven times.

**One thing to watch.** `dbms.css` is 14.4 KB and every page now carries it,
including the ones that use none of it. The same is already true of
`digital.css`. At three subjects this is acceptable; at eight it will not be,
and per-subject stylesheet splitting is the obvious answer when it starts to
matter. Recorded now so it is a decision later rather than a discovery.

---

## 16. Recommendation for Phase 5

**Do not start another subject yet.** Two things are now worth more.

**First — verify accessibility for real.** Screen-reader behaviour has been
unverified since Phase 1 and is now carrying three flagship subjects and
eighteen interactive components. It is the largest gap in the product and the
one that cannot be closed by writing more tests. It needs a reader, a person and
an afternoon.

**Second — close the marks gap.** Obtaining the CDC specification grid for DBMS
turns a documented derivation into a transcription, and is a small change.

**Then, for content:** *Programming in C* (Grade 9) is the natural next subject
— it can reuse the program tracer from OOP with a different language, so it
tests reuse across subjects rather than within one, which is the next thing the
architecture has not been asked to prove.

**Before the eighth subject**, split the per-subject stylesheets (§15).

**Still out of scope, and should stay so until the content is further ahead:**
authentication, payments, cloud sync, analytics, teacher and admin dashboards.
None were begun in this phase.

---

## PHASE 4 — COMPLETE

All seven DBMS units are implemented against the official syllabus, with every
numbered topic covered and six ambiguities documented rather than guessed. Three
reusable interactive components were built and five more were considered and
rejected with reasons. 265 tests pass across 10 consecutive runs, the build is
deterministic and reproducible, and no regression was found in any existing
subject.

Nothing was claimed that was not measured. The four verification gaps in §8, §9
and §10 are stated as **NOT VERIFIED** or **NOT MEASURED** rather than softened,
and **WCAG 2.1 AA is not claimed.**
