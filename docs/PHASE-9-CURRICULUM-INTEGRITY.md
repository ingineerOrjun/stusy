# Phase 9 — Grade 10 Curriculum Integrity

**Branch:** `phase-9-curriculum-integrity` · **Baseline:** `72e8bc5`, 379 tests
passing, clean tree · **Not merged to main.**

The headline finding is that **nine of twenty-four units displayed the wrong
exam weight**, and the official document needed to prove it had been reachable
the whole time.

---

## 1 · The official source — found, and it changes things

Two previous phases recorded the CDC specification grid as unavailable and
derived marks from hours instead:

> *"Marks are DERIVED, not transcribed — and that is a real gap."*
> — `PHASE-4-DBMS-CURRICULUM-MAP.md`, ambiguity A1

The grid is in the **same PDF** as the syllabus those phases had already
transcribed.

| | |
|---|---|
| Document | *Secondary Level School Curriculum (Technical and Vocational Stream), Grade 9–12 — Computer Engineering*, 2078 BS |
| Publisher | Curriculum Development Centre, Ministry of Education, Science and Technology, Government of Nepal |
| Listing | `moecdc.gov.np/content/553/` |
| PDF read | `giwmscdnone.gov.np/media/pdf_upload/1694337718_jx35alj.pdf` (1.03 MB, 321 pages) |
| How | streams inflated and text extracted locally; 73% ASCII, read directly |

Each Grade 10 subject carries a *Specification Grid* table giving credit hours
and total marks per unit. Hours had been transcribed correctly. Marks had not.

### Nine units were wrong

| Subject | Unit | Showed | Official | Error |
|---|---|---:|---:|---|
| DBMS | 1 Introduction to Database System | 5 | **2** | +3 overstated |
| DBMS | 2 ER-Model | 8 | **10** | −2 understated |
| DBMS | 3 Relational Model | 8 | **6** | +2 overstated |
| DBMS | 4 SQL | 11 | **14** | −3 understated |
| Hardware | 1 Electronic Devices | 8 | **7** | +1 |
| Hardware | 2 Computer System | 8 | **7** | +1 |
| Hardware | 4 Troubleshooting | 9 | **10** | −1 |
| Hardware | 5 Repair and Maintenance | 9 | **11** | −2 |
| Hardware | 6 Backup and Recovery | 7 | **6** | +1 |

OOP and Digital Design were correct in both hours and marks.

**Why this is P0 rather than cosmetic.** Marks are how a student decides where
to spend a week. DBMS Unit 4 is the heaviest unit in its subject and was shown
as lighter than it is; Unit 1 is the lightest and was shown as heavier. A
student allocating revision time by the numbers on the page was being sent to
the wrong units.

**Why no existing rule caught it.** The only check was that a subject totals
50 — which every wrong distribution satisfied perfectly.

### Now enforced

`_source/content/specification-grid.js` holds the official hours and marks with
their citation. `validate.js` compares `pages.js` against it unit by unit and
fails the build on any disagreement.

Verified by mutation — changing one mark by one:

```
x grid["grade10/dbms"]: unit 4 ("SQL — Structured Query Language") is worth
  13 marks in pages.js and 14 in the official grid. Marks tell a student where
  to spend their revision time, so a wrong one sends them to the wrong unit.
```

---

## 2 · The subject nothing could check

`grade10/oop-cpp` had **no syllabus outline at all**. The one fully-authored
subject was the only one with nothing to check it against — while four
*unauthored* Grade 9 subjects had outlines. It was written first, before the
convention existed.

Its official scope and sequence is now transcribed: **6 units, 35 topics,
64 hrs**, matching the authored unit titles and hours exactly.

**Three numbering errors in the official document** are recorded in the
transcription rather than silently tidied:

- Unit 5 prints `5.1` twice; the second is plainly 5.2.
- Unit 3's learning-outcome list is numbered 2.1–2.5.
- Unit 4's learning outcomes repeat *abstraction* three times where the
  scope-and-sequence correctly gives *encapsulation*. The scope-and-sequence is
  authoritative and is what was used.

### Coverage status

| Subject | Official topics | Coverage map | Gated |
|---|---:|---|---|
| DS & OOP with C++ | 35 | 35 / 35 | **yes — new** |
| Hardware & Repair | 37 | 37 / 37 | yes — revalidated |
| DBMS | 39 | — | **no** |
| Digital Design | 39 | — | **no** |

Hardware's 37/37 was **revalidated against the PDF**, not assumed: the official
scope-and-sequence has 4+4+7+6+11+5 = 37 top-level topics, matching exactly.

Several OOP topics are taught inside a parent section rather than under their
own heading and share its anchor. In each case the content was read and
confirmed present — `Class Methods and Data Members` inside 3.3, the
advantages-and-demonstration topics inside 4.1 and 4.4, and so on. Coverage was
not inferred from a heading.

---

## 3 · The OOP question bank was weighted upside down

**Audited before expanding.** 15 questions against a quiz draw of 12 — so a
retake was very nearly the same paper. Worse, the distribution ran against the
official grid:

| Unit | Marks | Questions | Per mark |
|---|---:|---:|---:|
| 1 Data Structure | 15 | 4 | 0.27 |
| **2 OOP using C++** | **14** | **0** | **0.00** |
| 3 Class and Object | 2 | 6 | 3.00 |
| 4 Abstraction/Encapsulation | 5 | 1 | 0.20 |
| 5 Inheritance | 7 | 1 | 0.14 |
| 6 Polymorphism | 7 | 3 | 0.43 |

The second-heaviest unit had **nothing**. The lightest had the most. A 21×
imbalance between the best and worst served units.

### After

| | Before | After |
|---|---:|---:|
| Questions | 15 | **49** |
| Distinct topics | 15 | **46** |
| Easy / medium / hard | 9 / 5 / 1 | **18 / 21 / 10** |
| Units at 0 questions | 1 | **0** |
| Per-mark range | 0.00 – 3.00 | **0.86 – 1.00** (U3 3.00) |

Unit 3's six existing questions are **kept**. They are sound, and deleting good
content to improve a ratio is the wrong trade — it is now proportionate because
the rest grew around it.

Variety is by kind, not volume: definitions, code reading, output prediction,
error identification and applied scenarios. Checked: **0 duplicate ids,
0 duplicate prompts**.

### A second defect found while testing

The OOP quiz page carried **neither `data-limit` nor `data-shuffle`**, alone
among the four subjects. Every attempt served the whole bank in a fixed order —
merely repetitive at 15 questions, a 49-question paper after the expansion. Now
matched to the others: 12 drawn, reshuffled per attempt.

Verified in a browser across three loads — three different first questions, 12
drawn each time.

---

## 4 · DBMS visual learning — correcting my own report

The Phase 8 project report recorded DBMS Units 3 and 5 as having **zero
diagrams**. That was wrong, and the error is worth recording because it would
have led to building the wrong thing.

The count came from `class="fig"`, which counts only **static** figures. An
animated diagram is wrapped in `class="dia"`. Both units have one:

- Unit 3 → `erToRelational`
- Unit 5 → `normalForms`

### The actual gap

**"Functional Dependency and its Types" is the first official topic of Unit 5
and had no visual at all** — a bilingual pair, a callout and a prediction.
Partial and transitive dependency are named **38 times** across the unit,
because they are the entire reason 2NF and 3NF fail.

A dependency is an arrow between columns. *Partial* means the arrow starts at
part of a composite key; *transitive* means two arrows chain through a non-key
column. That is a shape, and a shape told in prose is rebuilt in the reader's
head each time.

`dbDependencies` puts all three on one table and asks one question: **where does
the arrow start?** It reuses the `(student_id, subject)` table from the
`normalForms` animation already in the unit, so the two read as one story.

**Unit 3's remaining gap was judged weaker and left alone.** Its "Key Concepts"
vocabulary has no still diagram, but it does have the relational table
visualiser, so the concept is covered interactively. A second representation
there would have been decoration while Unit 5 had none.

---

## 5 · Verification

| Check | Result |
|---|---|
| Baseline tests | 379 passing (recorded before any change) |
| Final tests | **379 passing, 0 failing**, two consecutive runs |
| Build | passes; **103+ validation rules** |
| Determinism | two rebuilds byte-identical (`e557fc78…`) |
| Working tree | clean |
| Console errors | none on changed pages |
| Viewports | 0 horizontal overflow at 320 / 768 / 1440 |
| New SVG at 320 px | 520 px wide inside a 288 px figure, `overflow-x: auto`, **not clipped**, carries `<title>` |
| Language modes | Bilingual / English / Nepali correct on the quiz and the new diagram |

### Tests changed rather than renumbered

Nine assertions hardcoded `15`. Bumping the number would have preserved the
brittleness, so they now assert the property that was actually violated — **the
bank must hold at least two quiz draws**.

A new guard checks the shape of the **set** rather than of each question: no
unit silently empty, none holding more than half the bank. Every prior
assertion passed while Unit 2 had zero questions, because they all checked
individual questions and never the distribution.

Both new gates were mutation-tested:

- Specification grid: 1 mark changed by 1 → build fails, unit named.
- Question coverage: Unit 2 emptied → test fails.

---

## 6 · What was NOT done, and why

Stated plainly rather than left to be discovered.

| Item | Status |
|---|---|
| **DBMS and Digital Design coverage maps** | **Not built.** Both have outlines, so both are possible; this is the single largest remaining piece. |
| **DBMS / DD topic lists re-transcribed** | **Not done.** Official counts (34 + 21 sub-items; 37 + 13) differ in *granularity* from the repo's 39 and 39. Not a mismatch — a different folding of sub-items — but not verified line by line either. |
| **Under-interactive units (9E)** | **Audited, not addressed.** Seven units still have no drill, practice, parts lab or fault lab, including OOP Unit 1 at 15 marks. |
| **Screen-reader verification** | **Not performed.** No screen reader was run. **No WCAG 2.1 AA claim is made.** |
| **Nepali reviewed by a native speaker** | **No.** New Nepali was written, not machine-translated, but it has not been reviewed by a Nepali-speaking teacher. |
| **Marks sub-split (MCQ / short / long)** | **Deliberately not transcribed.** The grid publishes those columns only as whole-paper totals, so a per-unit split would be invention. |

---

## 7 · Subject status, on evidence

| Subject | Status | Basis |
|---|---|---|
| **Hardware & Repair** | Complete and verified | 37/37 topics gated and revalidated against the PDF; hours and marks match the official grid |
| **DS & OOP with C++** | Complete and verified | 35/35 topics gated; hours and marks match; question bank rebuilt to the grid |
| **DBMS** | Substantially complete, coverage unverified | Hours and marks now match the official grid; 39 topics outlined but **no coverage map**, so individual topics are unchecked |
| **Digital Design** | Substantially complete, coverage unverified | Same: grid matches, outline present, **no coverage map** |

No subject is marked complete on word count or on a passing suite.

---

## 8 · Next action

**Build the DBMS and Digital Design coverage maps.** The machinery exists and is
mutation-proven; it guards two subjects out of four. Both have outlines on file,
so this is bounded authoring work with a clear finish line — and it is what
converts "we believe it is covered" into a build failure for the remaining half
of Grade 10.

Then: the seven under-interactive units, starting with OOP Unit 1 at 15 marks.
