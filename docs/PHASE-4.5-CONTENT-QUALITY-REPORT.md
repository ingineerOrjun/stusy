# Phase 4.5 — Content Quality Report

A learning-quality audit of the three completed subjects, and the fixes it
justified. **Not an architecture phase**: no subject was started, no backend
built, no design system changed.

Every number is measured from the repository. Where something was not verified,
it says **NOT VERIFIED** in those words.

---

## 1. Baseline

Verified independently at commit `4419060`, branch `phase-4-dbms`, tree clean.
Nothing was carried over from the Phase 4.1 report.

| | Before | After |
| --- | --- | --- |
| Tests | 286 | **290** |
| Build | clean, 0 warnings | clean, 0 warnings |
| Diagrams | 53 (42 static, 11 animated) | **55** (44 static, 11 animated) |
| Simulation mount points | 23 | **26** |
| Worked examples | 49 | **51** |
| Predictions | 15 | **18** |
| Drill data sets | 4 | **8** |
| Written content | 52,101 words | **54,036 words** |
| Internal links | 1,490 | **1,502**, 0 broken |
| **Units with no interaction or no prediction** | **4** | **0** |

---

## 2. THE FINDING

**The first flagship subject was the weakest, and nobody had gone back to look.**

Phase 4.1 found four DBMS units read-only and fixed them. That check was never
run against OOP with C++, authored first to an earlier standard.

| Subject | Units with an interaction | With a prediction |
| --- | --- | --- |
| DBMS | 7 of 7 | 7 of 7 |
| Digital Design | 5 of 5 | 5 of 5 |
| **OOP with C++** | **2 of 6** | **2 of 6** |

`u2`, `u3`, `u4` and `u5` loaded only `snippets.js`. **28 of that subject's 50
marks (56%) were read-only**, including `u2` at 14 marks — the second
highest-weighted unit in the subject.

### Learning-experience ratio, before and after

```
BEFORE                                 AFTER
u2  14 marks  D 0   P 0                u2  D 1  P 1
u3   2 marks  D 0   P 0                u3  D 1  P 1
u4   5 marks  D 0   P 0                u4  D 1  P 1
u5   7 marks  D 0   P 0                u5  D 1  P 1

units with no DO or no PREDICT:  4  →  0
marks affected:                 28  →  0
```

Held by a test now, for every subject including ones that do not exist yet.

---

## 3. A correction to this audit's own first pass

The first detector reported **19 thin topics**. Acting on it would have meant
padding topics that were already fine — what §4 of the brief warns against.

It counted only `{{dia:}}` as visual support, so it missed the 8-card OOP
features grid, the overloading-vs-overriding comparison table, and every code
block. Counting visual support honestly gives **7**, of which **2 were worth
fixing**.

Recorded because the difference between 19 and 7 is the difference between
improving the product and bloating it.

---

## 4–5. Diagrams — 55 audited, 2 corrected, 2 added

| Check | Result |
| --- | --- |
| Geometry | **55 / 55 pass** |
| Referenced by content | 55 / 55 — no orphans |
| `<title>` for assistive technology | 55 / 55 |
| Mobile | every figure in a scrolling container; 0 page overflow at 320px |

**Classification:** no diagram recommended for `REPLACE` or `REMOVE`. The 44
static figures are taxonomies, comparisons, notation references and things a
student must redraw — §6's list of cases where static is *better*.

### Corrected

**`grayCode` — a real overlap that a previous audit reported clean.** The
"copy" label sat on the vertical copy arrow and clipped the first XOR arrow,
covering 23% of the label's area.

**Why it was missed:** Phase 4.1 ran the geometry audit behind a fixed 900 ms
wait. Text metrics differ between the fallback font and the loaded font, so the
measurement was of the wrong text. Re-run after `document.fonts.ready`, the same
tree reported the overlap immediately, stable across three runs.

**Both were fixed** — the label moved clear, and the audit tool now **refuses to
measure** until `document.fonts.status === 'loaded'` rather than guessing with a
delay. Verified: forcing the status to `loading` returns the refusal.

The label offset had to go in `style=`, not a `text-anchor` attribute —
`.f-lbl { text-anchor: middle }` would have beaten a presentation attribute,
the specificity trap this codebase has hit four times.

### Added

| Figure | Unit | Why it was justified |
| --- | --- | --- |
| `inheritWhat` | u5 5.1 | Inheritance was introduced by 417 words with no figure. The unit *states* in a callout that a derived class does not get everything, and never drew it — and that omission **is** the misconception. The figure shows two arrows getting through and one blocked. |
| `flagRegister` | dd-u5 5.9 | The flag register is examinable as a drawing and existed only as prose. The figure shows all eight bit positions including the three unused ones, which a list cannot. |

Neither was added because a section lacked a diagram. Both were added because
the concept is structural and the prose could not carry it.

## 6–7. Animations — 11 audited, 0 corrected

Every animation driven through its full cycle in a real browser.

| Check | Result |
| --- | --- |
| Starts at step 0 | 11 / 11 |
| Forward stepping reaches the final step | 11 / 11 |
| Every step has a distinct, non-empty caption | 11 / 11 |
| Captions bilingual, Nepali in Devanagari | 11 / 11 |
| Backward stepping restores the previous caption | 11 / 11 |
| Reset returns to step 0 | 11 / 11 |
| Reduced motion | **100 animated selectors, universal reset, 0 uncovered** |

**No animation was incorrect and none was removed.** Each shows a sequence, a
state change or a transformation. **No animation was added** — nothing in the
audit found a process that a static figure was failing to carry.

## 8–9. Simulations — 12 audited, 1 corrected

All 12 register with `SimulationService`, all reset to a true initial state, all
announce through `role="status"` or `core.js`'s `role="log"`.

**Corrected:** `sim-drill` had `subject: 'grade10/dbms'` hardcoded. Four OOP
units use it now, so every OOP drill would have been filed under DBMS in the
registry. It reads the subject from the page.

### Fake-interactivity check

| Verdict | Components |
| --- | --- |
| **Real decision** | SQL simulator · K-map · drill · gates / comb / number · ER visualiser |
| **Step-through — the student presses Next** | the 11 animated diagrams · `sim-8085` · `sim-concurrency` |

The step-throughs are not dishonest: an instruction cycle is a sequence, and a
sequence is watched. **What separates a good step-through from a weak one is
whether a prediction precedes it** — the student commits, then the watching
becomes a check. Every unit now pairs them; four could not before, because they
had no prediction at all.

## 10–14. What was added, and why each was justified

| # | Addition | Unit | Marks | Justification |
| --- | --- | --- | --- | --- |
| 1 | Drill `oopfeature` + prediction | u2 | 14 | Naming a feature from a described situation is how the unit is examined; the 8-card list only supports recall |
| 2 | Drill `accessspec` + prediction | u3 | 2 | The access table is a lookup the exam asks you to *apply*, inside a derived class |
| 3 | Drill `absencap` + prediction | u4 | 5 | The unit names this misconception and had a callout but nothing that made the student decide |
| 4 | Drill `inhertype` + prediction | u5 | 7 | Identifying the type from code is the exam task; multilevel-vs-multiple is where the mark goes |
| 5 | Figure `inheritWhat` | u5 5.1 | 7 | see §5 |
| 6 | Figure `flagRegister` | dd-u5 5.9 | 15 | see §5 |
| 7 | Worked example — flag setting | dd-u5 | 15 | Joint-highest-marks unit had **one** worked example across 8 topics |
| 8 | Worked example — writing a view | db-u4 4.7 | 11 | 439 words with no example, on a page that already has a SQL simulator |

**Four drill sets, one component.** No new component was written: `sim-drill`
was built in Phase 4.1 and needed only to stop being DBMS-specific.

**Explicitly not done:** no content added to `u1 1.1–1.4`, `u2 2.6–2.7`,
`db-u1 1.5`, `db-u4 4.4` or `u6 6.1`. Each is short reference or definition
prose that is correctly READ. Lengthening them would have made the product
worse.

## 15. Misconceptions now covered

Five that the OOP content *named* but never tested:

| Concept | Wrong idea | Now corrected by |
| --- | --- | --- |
| abstraction vs encapsulation | the same thing | prediction + 5-case drill |
| inheritance | a derived class gets everything | **figure** + drill case contrasting private and protected |
| access specifiers | `protected` is "less strict" everywhere | drill case 4 — from outside, protected behaves exactly like private |
| multilevel vs multiple | interchangeable | prediction + drill; "count parents, not levels" |
| OOP features | recalled as a list | drill naming the feature from a situation |

## 16. Language QA

Every changed page swept in all three modes.

| Check | Result |
| --- | --- |
| Language leaks, all changed pages × 3 modes | **0** |
| New drill sets bilingual (title, lead, options, every reason) | **8 / 8**, asserted by test |
| Nepali in Devanagari | asserted by test |
| Terminology | English technical terms kept in Nepali prose per [LANGUAGE-SYSTEM.md §5B](LANGUAGE-SYSTEM.md) |

**One inconsistency found and left alone.** OOP units carry a "SEE exam
connection" kicker the other two subjects lack; all 18 share the `Exam focus`
heading. The heading is the landmark a student navigates by and is already
universal, so 12 files were not churned to duplicate a redundant label. The test
now asserts the universal landmark instead of one subject's wording.

## 17. Accessibility

| Check | Result |
| --- | --- |
| Accessibility-tree audit, all changed pages × 3 modes | **clean** |
| Controls with no accessible name | 0 |
| Drill option groups named by their question | ✓ (inherited from Phase 4.1) |
| New predictions' option groups named | ✓ |

> **WCAG 2.1 AA IS NOT CLAIMED.** What a screen reader announces, colour-blind
> perception, and layout above 100% zoom remain **NOT VERIFIED** — unchanged
> from Phase 4.1, which lists what to listen to first.

## 18. Mobile

| Width | Pages | Result |
| --- | --- | --- |
| 320px | u2, u4, u5 | **clean** |
| 390px | dd-u5 | **clean** |
| 430px | u3 | **clean** |
| 1280px | all changed pages | **clean** |

**375px and 768px were not swept individually** this phase — they sit between
tested widths, all of which are clean. **Stated rather than implied.**

## 19. Tests

**290 pass, 8 consecutive clean runs.** Four new tests, and **two existing tests
corrected** — both of which had been giving false confidence.

### The test that had been checking one subject out of three

`tests/ux.test.js` derived its page list from a hardcoded
`grade10/oop-cpp/unit1..6` written in Phase 2, when OOP was the only subject.
**Heading order, learning objectives, simulation completeness and exam framing
were never checked against Digital Design or DBMS** — two flagship subjects
added since.

Now derived from the page map, so a fourth subject is covered the day it is
added. Widening it immediately surfaced the exam-wording divergence in §16.

### The test that guarded almost nothing

`build.test.js` held hardcoded figure counts per OOP unit (`unit1: 9, unit2: 2…`).
It broke the moment a figure was added deliberately, and never looked at the
other two subjects. Replaced with the real invariant: **every `{{dia:name}}` in
a source section must arrive in the built page as that diagram**, derived from
source, covering all subjects, needing no maintenance. It verifies every diagram injection across all three subjects.

### New

- every drill set complete, bilingual, and **actually a judgement** (≥4 cases,
  ≥2 distinct answers — a set where every case has the same answer teaches
  button-pressing)
- the OOP drills agree with the rules those units teach — private unreachable
  from a derived class, protected reachable, two bases means multiple
  inheritance, a private member with accessors is encapsulation
- the drill component is subject-agnostic
- **no authored unit is read-only** — the finding of this phase, held

## 20. Regression

| Check | Result |
| --- | --- |
| Build | clean, **0 warnings** |
| Tests | **290 / 290**, 8 consecutive runs |
| Determinism | **66 files byte-identical** |
| Internal links | 1,502, **0 broken** |
| Diagram geometry | 55 / 55 |
| Animations | 11 / 11 full cycle |
| Existing subjects | no regression; no DBMS or Digital Design content removed |

## 21. Remaining weaknesses

Honest, and none of them blocking.

- **Screen-reader behaviour NOT VERIFIED.** Unchanged since Phase 1 and still
  the largest unknown in the product.
- **Colour-blind perception and zoom above 100% NOT VERIFIED.**
- **Frame rate NOT MEASURED** — the environment throttles rAF.
- **375px and 768px not swept this phase** (§18).
- **DBMS marks are derived, not transcribed** — Phase 4 ambiguity A1, unchanged.
- **`sim-8085` and `sim-concurrency` remain step-throughs.** Both are now
  preceded by a prediction, which is the mitigation, but neither asks the
  student to make a choice *inside* the simulation.
- **`u1` is the most text-heavy unit** (28 READ units) but also the richest in
  figures (11) and has both a simulation and a prediction. Judged acceptable:
  it is a 20-hour, 15-mark unit introducing the whole subject.

## 22. Deferred

| Item | Why it waits |
| --- | --- |
| A prediction *inside* the 8085 and concurrency steppers | Would mean interrupting a sequence mid-flow; worth prototyping, not worth guessing at |
| Standardising the exam-section kicker across subjects | Cosmetic; the heading is already universal (§16) |
| Second worked example for `db-u1`, `db-u6`, `db-u7` | All three are STRONG on the matrix; adding would be counting, not teaching |
| Screen-reader session | Needs a reader and a person (Phase 4.1 lists the order) |

## 23. Recommendation for the next phase

**The quality benchmark now exists and all three subjects meet it.** Every unit
has an explanation in two languages, a visual, at least two worked examples, a
prediction, an interaction, an exam connection, practice and a summary — and a
test enforces the floor.

**Do the screen-reader session before the next subject.** It has been deferred
through four phases and now covers three flagship subjects and 26 interactive
mount points. The cost of finding a systemic problem grows with every subject
added.

**Then Programming in C (Grade 9)** as the next subject: it can reuse the
program tracer with a different language, which tests reuse *across* subjects
rather than within one — the thing the architecture has not yet been asked to
prove.

**Before the eighth subject**, split the per-subject stylesheets. `digital.css`
and `dbms.css` ship on every page including the ones using neither. Acceptable
at three subjects; not at eight.

---

## PHASE 4.5 — COMPLETE

The audit found that the subject built first had been left behind, and that two
tests had been quietly checking one subject out of three. Both are fixed. Four
units carrying 28 marks are no longer read-only, two concepts that needed a
figure have one, two thin worked-example gaps are filled, and one diagram defect
that a previous audit reported clean has been corrected — along with the reason
the audit missed it.

Nothing was added to a topic that was already adequate.
