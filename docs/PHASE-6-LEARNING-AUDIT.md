# Phase 6 — Learning Quality Audit

**Scope** 18 authored units across 3 flagship subjects, ~50,000 words of
lesson content, 55 diagrams, 26 simulations, 64 practice questions.
**Method** `tests/manual/learning-audit.js` for the structural shape of every
unit, plus reading the content itself for the judgements no counter can make.

---

## How this audit refuses to be scored

Phase 4.5 established that "more content = better" is false, so this audit
does not rank units by word count, by component count, or by any total. A
unit with nine worked examples and no retrieval is not 90% done. A unit with
two worked examples and three retrievals may be finished.

What it reports instead is the **shape** of each unit against the learning
contract, so that a gap reads as a gap rather than as a low score. Exactly
one thing is judged rather than counted, and it is judged because it is the
difference between two activities that look identical in markup and do
opposite things to memory:

> **Can a student reach the answer without attempting it?**

---

## 1 · The shape of every unit, before Phase 6

```
Database Management System
unit     words  topics  dia  wex  pred  sim  misc  examQ  REVEAL  RETRIEVE  hook
db-u1     2381       5    4    2     1    1     1      3       3         0     0
db-u2     2901       3    2    2     1    3     1      3       3         0     0
db-u3     2603       2    1    2     1    2     1      3       3         0     0
db-u4     4081       6    3    4     1    3     1      4       4         0     0
db-u5     2546       2    1    2     1    1     1      3       3         0     0
db-u6     2406       4    2    2     1    1     1      3       3         0     0
db-u7     2661       4    2    2     1    1     1      3       3         0     0

Digital Design & Microprocessor
dd-u1     2699       6    3    5     1    2     1      4       4         0     0
dd-u2     2912       4    3    2     1    2     1      4       4         0     0
dd-u3     2550       3    3    3     1    1     1      3       3         0     0
dd-u4     2339       5    4    2     1    2     1      3       3         0     0
dd-u5     3121       6    4    2     1    1     1      4       4         0     0

DS & OOP with C++
u1        4180      12    9    3     1    1     1      4       4         0     0
u2        3064      16    2    4     1    1     1      4       4         0     0
u3        2366       4    3    3     1    1     2      4       4         0     0
u4        2290       2    2    3     1    1     1      4       4         0     0
u5        2581       3    4    4     1    1     1      4       4         0     0
u6        2569       3    3    3     1    1     1      4       4         0     0
```

**The striking thing is the uniformity.** Every unit has exactly one
prediction. Every unit has one misconception block. Every practice question
without exception ends in "Show the answer". Three columns are zero
everywhere. This is not eighteen units with eighteen different problems; it
is one template applied eighteen times, with three holes in the template.

---

## 2 · Against the learning contract (§5)

| # | Contract item | Before | Assessment |
|---|---|---|---|
| 1 | Learning objectives | **18 / 18** | Strong. Every unit opens with "By the end of this unit you can…" as a numbered list. |
| 2 | Prerequisite knowledge | **0 / 18** | Missing. A student who cannot follow unit 5 is not told which earlier unit to revisit. |
| 3 | Concept explanation | 18 / 18 | Strong, and bilingual throughout. |
| 4 | Visual mental model | 55 diagrams | Strong. Phase 5 verified all 55 geometrically. |
| 5 | Worked example | 50 | Strong — see §3, which is why they were left alone. |
| 6 | Guided practice | **0** | Missing entirely. |
| 7 | Prediction | 18 (1 per unit) | Present but thin. Commit-before-reveal is correctly enforced. |
| 8 | Interactive experiment | 26 | Strong. Phase 5 drove all 26. |
| 9 | Misconception | 19 | Present, well written, and **ends without anything portable** — see §4. |
| 10 | Exam connection | 18 / 18 | Strong. |
| 11 | Independent practice | 64 | Present in form. **Reveal, not retrieval** — see §5. |
| 12 | Retrieval quiz | **0 in-unit** | Missing. Three subject-level quiz pages exist and are not the same thing: they are a separate destination, not a checkpoint inside the lesson. |
| 13 | Summary | 18 / 18 | Present as `keypoints`. |
| 14 | Memory hook | **0** | Missing entirely. |

---

## 3 · Worked examples — the finding that stopped a planned change

§7 asks for FULLY WORKED → PARTIALLY WORKED → GUIDED → INDEPENDENT as a
reusable component, and the obvious implementation was to fade the 50 worked
examples already in the units.

Reading them first showed that would have **damaged** them. Digital Design
unit 1's five examples are:

```
Example 1  Decimal to binary — the division method
Example 2  Binary to decimal, and octal both ways
Example 3  Convert 6.625 to binary
Example 4  Binary subtraction, two ways
Example 5  Binary multiplication
```

These are five **different sub-skills**, not five repetitions of one. Example
2 is not a rehearsal of Example 1; it is the first and only demonstration of
its own procedure. Hiding its working would remove the very thing a worked
example exists to provide. The same is true in DBMS unit 4 (reading a query,
writing CREATE TABLE, identifying a join, writing a view) and in OOP unit 5
(basic syntax, multiple inheritance, virtual base, predict-the-output).

**Verdict: the worked examples are well designed and were left untouched.**
Fading needs the opposite shape — the same procedure several times — which
is a different component with different content, and that is what was built.

This is the audit's clearest example of why §6 forbids mechanical
application: the change that the brief seems to ask for, applied literally,
would have made the product worse.

---

## 4 · Misconceptions — the right work, stopped one line early

All 19 blocks are specific, exam-relevant and correct:

- Swapping degree and cardinality
- Using DELETE when the question says DROP
- Saying normalisation is done to save space
- Leaving FAILED and ABORTED out of the transaction state diagram
- Labelling a K-map 00, 01, 10, 11
- Saying the PC holds the current instruction
- Thinking `protected` behaves like `public` from outside the class
- Writing `marks[5]` to reach the last element of a 5-element array

Each explains the confusion carefully and at length. Each then **stops**. The
explanation is exactly right while the student is reading the unit, and no
use at all in the exam hall, where what is needed is one line.

**Priority: HIGH.** High learning impact, maximum exam importance, total
current weakness, low cost.

---

## 5 · The single largest finding: 64 reveals, 0 retrievals

Every practice question in the product ended in:

```html
<button class="btn-ans" data-answer="dba41">Show the answer</button>
```

A student reads the question, presses the button, reads the model answer, and
feels they have studied. They have not. Recognising an answer is not
producing one, and the fluency that reading creates is the most reliable
predictor of a student overestimating what they know. Retrieval practice —
attempting to produce the answer before seeing it — is among the most
robustly evidenced findings in learning science, and its advantage over
re-reading *widens* as the delay to the exam grows.

The markup already had the question, the mark allocation and the model
answer. The only thing missing was the requirement to try.

**Priority: HIGHEST.** Maximum on every axis of the §25 model, and — unusually
— fixable as a component rather than as content, so all 64 upgrade at once
with no lesson file edited.

---

## 6 · Per-subject notes

### Digital Design & Microprocessor

**Strong.** The most procedurally demanding subject and the best served by
its simulations: the gate workbench, K-map grouping, the 8085 stepper and the
number lab all let a student change an input and watch the consequence.
Diagram support is the densest in the product.

**Weak.** dd-u1 and dd-u3 are the two most *procedural* topics in the whole
platform — conversion and K-map simplification are marked on whether the
student can execute a method under time pressure — and neither offered a
single opportunity to execute that method with feedback. The simulations
*demonstrate*; nothing *tested*.

**Highest-value gap:** repeated practice of base conversion with per-step
marking.

### Database Management System

**Strong.** The SQL simulator is the deepest interaction in the product and
teaches the execution-order idea that most SQL teaching skips. ER notation
and the relational table visualiser are both genuine mental models.

**Weak.** Normalisation (db-u5) is 6 marks of pure procedure — decide the
normal form, name the dependency — and had two worked examples and no
practice. A student can read both examples, agree with both, and still be
unable to classify a table they have not seen.

**Highest-value gap:** classify-the-normal-form practice with the *partial
vs transitive* confusion built into the feedback.

### DS & OOP with C++

**Strong.** Broadest concept coverage (u1 alone has 12 topics), the program
tracer, and the constructor-order animation.

**Weak.** Constructor and destructor order is a topic the unit itself labels
"asked very often", is animated well, and had no way for a student to *try
it*. Watching the animation and producing the order under exam conditions are
different skills.

**Highest-value gap:** constructor-order practice, including the multiple-
inheritance case where the base order comes from the class header.

---

## 7 · Priorities, scored by §25

*Learning Impact × Exam Importance × Current Weakness × Interaction Opportunity*

| Rank | Item | Why it scores | Status |
|---|---|---|---|
| 1 | Retrieval instead of reveal, all 64 questions | Max on every axis, and fixable without touching content | **Done** |
| 2 | Faded guided practice for the procedural skills | Highest exam weight where weakness is total | **Done** — 3 skills, one per subject |
| 3 | Memory hooks on every misconception | High retention value, near-zero cost, total weakness | **Done** — 18 |
| 4 | Prerequisite knowledge per unit | Helps the weakest students most; no interaction opportunity | **Not done** — Phase 7 |
| 5 | More predictions where an outcome is observable | Good value, but 18 already exist and work | **Not done** — Phase 7 |
| 6 | In-unit retrieval checkpoint distinct from the quiz page | Overlaps heavily with rank 1, now largely served by it | **Superseded** |

---

## 8 · What this audit deliberately did not do

- **It did not add words.** §6 forbids solving thin content by padding, and
  nothing here was thin. The units average 2,700 words of dense, bilingual,
  correct explanation.
- **It did not add visuals to raise a count.** 55 diagrams already carry the
  concepts that benefit from being seen; Phase 4.5 and Phase 5 both verified
  them.
- **It did not restructure the worked examples.** See §3.
- **It did not invent curriculum.** Every practice problem added sits inside
  a topic the unit already teaches: normalisation stops at 3NF and BCNF is
  not introduced; inheritance covers single, multilevel and multiple, which
  is what the unit lists.

---

## 9 · The shape after Phase 6

```
ACROSS ALL 18 UNITS          before    after
  worked examples                50       50   (unchanged, deliberately)
  predictions                    18       18
  simulations                    26       26
  misconceptions                 19       19
  exam questions                 64       64
  of which REVEAL-only           64        0
  RETRIEVAL blocks                0       64
  memory hooks                    0       18
  guided practice sequences       0        3
  prerequisite blocks             0        0   (Phase 7)
```

Nothing was added to the word count. What changed is what the student is
asked to **do** with what was already there.
