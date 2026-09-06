# DBMS Content Guidelines

How a DBMS unit is written, and the decisions a future author should follow
rather than re-make. This is a **contract** — keep it true if the content
changes.

For the platform-wide rules this sits inside, see
[CONTENT-ARCHITECTURE.md](CONTENT-ARCHITECTURE.md) and
[LANGUAGE-SYSTEM.md](LANGUAGE-SYSTEM.md). Nothing here overrides them; this is
the subject-specific layer.

---

## 1. The shape of a unit

Every DBMS unit is one file, `_source/content/lessons/db-uN.html`, and follows
the platform's existing lesson structure. In order:

```
.sec-head        unit number, title, Nepali subtitle, hours · marks
.outcomes        "By the end of this unit you can…", numbered, + Nepali gloss
.pair            the opening definition, both languages
h3.topic         one per syllabus topic group, id="db-tNN"
  .pair          explanation
  figure.fig     diagram + bilingual figcaption
  .callout       a fact worth boxing
  .predict       commit before the reveal
  .sim           an interactive component, with .sim-head/.sim-body/.sim-why
  .wex           worked example — reasoning, not just the answer
.mistake         "Mistakes that cost marks here"
h3.topic         "Exam focus — what is asked from this unit"
  .exam-connect  what the examiner asks, and how the marks are given
  .examq × 3–4   practice questions with model answers
.keypoints       revision summary, one line per idea
```

The build **refuses** a unit missing `.outcomes` or `.keypoints`, and warns if
it has no `.exam-connect`.

---

## 2. Terminology — what stays in English

DBMS is dense with terms that appear in English on the SEE paper. Translating
them would leave a Nepali-mode student unable to recognise the exam question.

**Always English, in every mode**, glossed in Nepali prose rather than replaced:

`primary key` · `foreign key` · `candidate key` · `super key` · `composite key`
· `entity` · `attribute` · `tuple` · `relation` · `schema` · `instance` ·
`domain` · `degree` · `cardinality` · `normalization` · `1NF` `2NF` `3NF` ·
`functional dependency` · `transaction` · `commit` · `rollback` · `ACID` ·
`atomicity` · `consistency` · `isolation` · `durability` · `redo` · `undo` ·
`backup` · `recovery` · every SQL keyword · `DDL` `DML` `DCL` · `join` and its
five kinds · `view` · `NULL`.

**How that reads in practice** — the Nepali sentence carries the explanation and
the English term rides inside it:

> `Foreign key` को मान अर्को तालिकाको `primary key` मा पहिले नै हुनैपर्छ।

**Where a Nepali gloss IS given**, it is given once, in brackets or as a
subtitle, and the English term is used from then on:

> **Database Administrator (DBA)** — पूर्ण नियन्त्रण।

**Never invent a Nepali term to satisfy a validator.** If a term should stay
English, leave it English. This is [LANGUAGE-SYSTEM.md §5B](LANGUAGE-SYSTEM.md)
applied to this subject.

### Diagram labels

Entity names, relationship verbs, column names and SQL keywords stay English
inside figures, because SVG text does not reflow and splitting it is fragile.
The meaning is carried by the **bilingual figcaption** below, which is where a
Nepali-mode student reads it. Section labels *outside* the SVG follow the normal
label-pair rule ([LANGUAGE-SYSTEM.md §5D](LANGUAGE-SYSTEM.md)).

---

## 3. One misconception per unit, named

Each unit is built around a specific thing students get wrong. The explanation,
the prediction, the worked example and at least one question all point at it.

| Unit | The misconception |
| --- | --- |
| 1 | *A DBMS is the same thing as a database.* MySQL is the software; the database is the data. |
| 2 | *One-to-many and many-to-many are nearly the same.* They differ in the reverse direction, and only one forces a third table. Also: *a weak entity is an unimportant one.* |
| 3 | *Degree and cardinality are interchangeable.* Degree counts columns, cardinality counts rows. |
| 4 | *DELETE and DROP do the same thing.* One removes rows and keeps the table; the other removes the table. Also: *WHERE chooses columns.* |
| 5 | *Normalization is about saving space.* It is about removing anomalies. |
| 6 | *A failed transaction leaves half its work behind.* Atomicity is the promise that it does not. |
| 7 | *Redo and undo are the same operation reversed.* They serve different failures, decided by the COMMIT record. |

**Where a misconception is not on the syllabus, it is not taught.** The phase
brief offered `WHERE ≠ HAVING` as an example; `HAVING` is not in this syllabus,
so it is out of scope. Every misconception above is anchored to a numbered
topic.

---

## 4. Worked examples show reasoning

A worked example that prints the answer teaches nothing the answer key does not.
The pattern used throughout:

```
Question        the task, stated plainly
Given           the table or the query
Step 1 …        one step per stage, with the reason for it
Answer          the result, boxed
.wex-note       the thing that actually goes wrong here, and how to avoid it
```

The `.wex-note` is the part that earns its space. "Gita is dropped because her
`class_id` is NULL, and NULL is not equal to anything" is worth more than the
answer above it.

---

## 5. Exam framing comes early, not only at the end

Each unit's `.exam-connect` states, before the practice questions:

- how many marks the unit carries and how that compares to the others,
- the **shapes** of question that come from it (classify / write / read / draw),
- where the marks are actually awarded — often per step or per named item,
- one piece of practical advice for the hall.

Model answers say **how the marks are split**, because a student who knows that
three marks means three named differences writes a better answer than one who
writes a paragraph.

---

## 6. Question bank rules

Schema, tags and bilingual requirements are the platform's; these are the
subject's own rules, and all four are enforced by `tests/dbms.test.js`.

1. **Every unit has questions.** Coverage is asserted, not assumed.
2. **No two questions share unit + topic + difficulty.** A fact worth two
   questions is worth testing at two different levels. This is what stops a bank
   growing by rewording what it already asks.
3. **At least five questions at each difficulty.** A bank that is all recall
   does not prepare anyone.
4. **Distractors must be plausible and wrong for a reason.** The wrong options
   are usually the misconceptions from §3 — a student who picks one learns
   something from the explanation.

The explanation is written for the student who got it **wrong**. It says why the
right answer is right, and where the tempting wrong answer comes from.

---

## 7. When to add an interactive component

Apply the four questions in
[DBMS-SIMULATION-SPEC.md](DBMS-SIMULATION-SPEC.md), and read §5 of that document
first — five candidates were considered and rejected, and the reasoning
transfers.

The short version: **interaction earns its place when the student must change an
input and see a consequence they could not have predicted.** A fact, a list, or
a procedure with one right order is clearer as a static or animated figure.

If a new unit does need one, configure an existing component through data before
writing a new one. All three take their content from a declared model or schema
precisely so that the next lesson is a configuration change.

---

## 8. Adding an eighth unit, or a second DBMS-like subject

1. Add the lesson file `_source/content/lessons/db-uN.html`.
2. Add its entry to `_source/config/pages.js` — hours must match the syllabus,
   and marks must still total 50, or the build fails.
3. Add questions to `_source/content/questions/grade10-dbms.js`.
4. Add any new diagram to `_source/diagrams.js`; animated ones use
   `type: 'animated'` with `{ show, focus, en, ne }` steps.
5. Run `npm run check`. The build validates the content contract before writing
   any page, and the test suite validates the subject's own rules.

No build code changes. That is the point of the architecture, and Phase 4
was the test of whether it held — it did.
