# Phase 6 — Learning Quality & Content Depth Upgrade — Completion Report

**Baseline** `f2834aa` (Phase 5 complete) · **Head** this phase's final commit
**Scope** 18 authored units, 3 flagship subjects. No new subject started.
**Result** 321 tests passing, deterministic build, zero regressions.

Throughout: **VERIFIED** means measured in this phase. **NOT VERIFIED** means
it was not. **INFERRED** means reasoned from evidence without direct
measurement. **RECOMMENDED** is for Phase 7.

---

## The one-line summary

The platform's content was already strong. What it asked students to *do*
with that content was mostly reading. Phase 6 changed four things about the
demand placed on the student, added no words, and left the good work alone —
including one planned change that reading the content showed would have made
the product worse.

---

## 1 · Verified baseline before starting

**VERIFIED.** Branch `phase-4-dbms`, HEAD `f2834aa`, clean tree, 297 tests
passing, deterministic build, 55 diagrams, 23 authored pages across 3
subjects. The Phase 5 numbers were re-measured rather than assumed, as
instructed.

---

## 2 · What the audit found

Full detail in [PHASE-6-LEARNING-AUDIT.md](PHASE-6-LEARNING-AUDIT.md). The
striking result was **uniformity**: not eighteen units with eighteen
problems, but one template applied eighteen times with three holes in it.

| Contract item | Before |
|---|---|
| Learning objectives | 18 / 18 ✓ |
| Concept explanation, bilingual | 18 / 18 ✓ |
| Visual mental model | 55 diagrams ✓ |
| Worked examples | 50 ✓ |
| Interactive experiments | 26 ✓ |
| Exam connection | 18 / 18 ✓ |
| Summary | 18 / 18 ✓ |
| **Independent practice** | **64 questions — all reveal-only** |
| **Memory hook** | **0** |
| **Guided practice** | **0** |
| **Prerequisite knowledge** | **0** |
| Prediction | 18 — exactly one per unit |
| Misconception | 19 — about one per unit |

---

## 3 · What changed

### 3.1 · 64 practice questions became retrieval practice — VERIFIED

Every question in the product ended in **"Show the answer"**. A student
reads, presses, reads the model answer, and feels they have studied.
Recognising an answer is not producing one, and the fluency reading creates
is the most reliable predictor of a student overestimating what they know.

Now:

```
question + marks → attempt (optional, never stored) → COMMIT
                 → model answer → self-assess → recorded
```

**No content was edited.** All 64 upgraded at once across 18 files, because
`.examq` already carried the question, the marks and the model answer. The
component supplied the only missing part: the requirement to try.

Self-assessment rather than auto-marking, because these are written SEE
answers that no string comparison can grade — and a component that pretended
to would teach students to write for the matcher.

**VERIFIED** in the browser through the whole loop — gate, reveal, self-grade,
recorded, explained — in all three language modes.

### 3.2 · Faded guided practice, three subjects — VERIFIED

`worked → partial → guided → independent`, with every step marked
individually so the feedback lands at the decision that caused the error.

| Skill | Unit | Exam weight of the topic |
|---|---|---|
| Decimal to binary by repeated division | dd-u1 | 7 marks |
| Name the normal form, then the blocking dependency | db-u5 | 6 marks |
| Constructor and destructor order | u5 | 7 marks |

Each independent problem is built around the mistake students actually make,
and the feedback names *that reasoning* rather than restating the correct
answer:

> "If you answered 2NF, you probably checked for a transitive dependency and
> missed the partial one: always test the key BEFORE the non-key columns."

> "If you answered X Y Z, you sorted the names instead of reading the header."

**VERIFIED**: all four levels on each of the three, correct and incorrect
answers, case-insensitive marking, completion message, in all three modes.

### 3.3 · A memory hook on every misconception — VERIFIED

19 misconception blocks explained a confusion carefully and then stopped —
right while reading the unit, no use in the exam hall. Every unit's block now
ends in one line in both languages:

> Degree counts across (columns). Cardinality counts down (rows).
> DELETE empties the table. DROP removes the table.
> Break the bar, change the sign. Both, or neither — never one.
> PC points at the next instruction. IR holds the one running now.

**Three rules enforced at build time**, each verified to fail the build when
broken: a misconception without a hook; a hook over 24 words; a hook with no
Nepali.

### 3.4 · Every Nepali control label was still read by an English voice — VERIFIED

Found by running **Phase 5's own screen-reader audit** over the Phase 6 work,
which is what that verification pass exists for.

Phase 5 fixed 82 Devanagari runs in the *content*, and structurally could not
have reached the controls: a control's Nepali is not in the markup at all —
it arrives from the `UIStrings` table at runtime, after the build's tagging
pass has finished. **Measured in Nepali mode: 12 labels on one page** —
रिसेट, अर्को ▸, चरण 0 / 4, स्तम्भ 1 / 4 — all inheriting `lang="en"`.

Fixed centrally in `UIStrings.apply()` and a new `UIStrings.write()` for
components that compose their own labels.

**VERIFIED after the fix**: 0 untagged runs in all three modes, having
exercised the components that rewrite their own labels.

---

## 4 · What was deliberately NOT changed

**The 50 worked examples.** §7 asks for fading and the obvious move was to
fade them. Reading them first showed it would have damaged them: Digital
Design unit 1's five examples are five *different sub-skills* — decimal to
binary, then binary to decimal, then fractions, then subtraction, then
multiplication. Example 2 is not a rehearsal of Example 1; it is the only
demonstration a student ever gets of its own procedure. Fading needs the same
procedure several times, which is a different component with different
content, and that is what was built instead.

This is the phase's clearest case of §6 in practice: the change the brief
appears to ask for, applied literally, would have made the product worse.

**Word count.** Nothing was padded. The units average 2,700 words of dense,
correct, bilingual explanation and did not need more.

**Diagrams, animations, simulations.** 55 / 11 / 26 unchanged. Phase 4.5 and
Phase 5 verified them; adding visuals to raise a count is what §10 forbids.

**Prerequisite blocks** (0 → 0) and **more predictions** (18 → 18). Both are
real gaps, both scored below the four items above, and inventing work to
fill a table is what §25 exists to prevent. **RECOMMENDED for Phase 7.**

---

## 5 · Before and after

```
ACROSS ALL 18 UNITS              before    after
  worked examples                    50       50   unchanged, deliberately
  predictions                        18       18
  simulations                        26       26
  diagrams                           55       55
  misconceptions                     19       19
  exam questions                     64       64
  of which REVEAL-only               64        0
  RETRIEVAL blocks                    0       64
  memory hooks                        0       18
  guided practice sequences           0        3
  prerequisite blocks                 0        0
  tests                             297      321
```

---

## 6 · New reusable components

| Component | File | Reused by |
|---|---|---|
| Retrieval gate | `runtime/retrieval.js` | every `.examq`, automatically |
| Faded guided practice | `runtime/guided.js` + `content/practice/*` | any subject, declaratively |
| Memory hook | CSS + validator rule | every `.mistake` block, enforced |
| Language-declaring label writer | `UIStrings.write()` | diagram stepper, number lab, retrieval gate |
| Retrieval record | `ProgressService.recordRetrieval` etc. | the gate; available to a future revision view |

**No engine code changes are needed to add practice for a fourth subject.**
That was the test the architecture had to pass, and adding the second and
third banks passed it: three content files, three lines in the context, two
lines per page — and the ten content-contract tests written for the first
bank covered the other two without modification.

Decision record: [PHASE-6-LEARNING-ARCHITECTURE.md](PHASE-6-LEARNING-ARCHITECTURE.md).

---

## 7 · Content-quality validation extended

The build now fails on:

- a misconception block with no memory hook
- a memory hook over 24 words
- a memory hook with no Nepali
- a page referencing a generated bank that was not built

Plus the existing gates. All verified to fire by deliberately breaking them.

---

## 8 · Tests — 297 → 321

| File | Added | Guards |
|---|---|---|
| `retrieval.test.js` | 11 | the gate, the no-double-bind rule, the record, page wiring |
| `guided.test.js` | 10 | the content contract, the fading order, marking, page wiring |
| `ui-strings.test.js` | 3 | a Nepali label declares Nepali; English clears it |

**Every one was verified to fail when its defect is reintroduced**, by
reintroducing it. Two deserve mention:

- **The no-double-bind rule.** `core.js` binds every `[data-answer]` button.
  If it also bound the ones inside `.examq`, each click would toggle the
  answer twice, it would end where it started, and the reveal would stop
  working with nothing in either file looking wrong.
- **Answer correctness.** The suite recomputes every stated binary conversion
  by repeated division, so a typo in the content cannot teach a student the
  wrong remainder.

---

## 9 · Accessibility — VERIFIED, no regression

Re-run with Phase 5's own instruments after the Phase 6 work:

| | Result |
|---|---|
| Untagged Devanagari, all 3 modes | **0** (was 12 — see §3.4) |
| Unnamed controls | **0** |
| Keyboard: operable controls | 49 on the densest new page |
| Unreachable / keyboard traps / positive tabindex | **0 / 0 / 0** |
| Focus ring below 3:1 | **0** |
| Skip-link target focusable | ✓ |
| Contrast failures, measured on rendered pairs | **0**, including the wrong-answer state |
| Reflow 320 → 1440, all 3 modes | no overflow, no clipping, no sub-floor text |
| Touch targets on the new controls | 44px at 320px |
| Table header scope | 77 / 77 |
| Console errors | 0 |
| Deterministic rebuild | 0 files changed |

The new components carry `role="status"` on their feedback, `aria-pressed` on
the self-assessment, `aria-invalid` on a wrongly answered field, `<label for>`
on every input, and Enter-to-check so a student working through five
remainders never reaches for the mouse.

**Colour independence:** every new state says a word before any colour is
applied — "Right." / "Not that." / "Got it" / "Partly" / "Not yet".

**WCAG 2.1 AA is still NOT CLAIMED**, and **what a screen reader actually
speaks is still NOT VERIFIED** — no screen reader is drivable in this
environment. Phase 5 §23 remains the accurate statement.

---

## 10 · Performance impact — VERIFIED

| | Before | After |
|---|---|---|
| Core stylesheet | 76.0 KB | 84.0 KB |
| DBMS stylesheet | 95.1 KB | 103.1 KB |
| Digital stylesheet | 99.7 KB | 107.7 KB |
| New JS on a page with practice | — | `guided.js` 12.9 KB + `practice-bank.js` 33.1 KB |
| New JS on every lesson page | — | `retrieval.js` 10.2 KB + `progress.js` |

**INFERRED, not measured:** the ~8 KB of CSS is uncompressed and would be
substantially smaller over the wire. `practice-bank.js` is 33 KB because it
holds bilingual prose for every step of every problem; it loads only on the
three pages that use it. This remains well inside the Phase 5 budget, where a
dense page reached DOM-interactive in 103 ms.

---

## 11 · Five phantoms from my own tools, fixed before reporting

The pattern from Phase 5 continued, and the discipline with it: a tool that
reports a defect it cannot demonstrate costs more than it finds.

| Phantom | Cause | Fix |
|---|---|---|
| "331 worked examples" | `\b` treats `-` as a boundary, so `\bwex\b` matched `wex-note` | split class tokens on whitespace |
| "5 unnamed controls" | the audit implemented `aria-label` and contents but not `<label for>` — the step the spec puts *first* for form controls | resolve through `element.labels` |
| "45-word live region" | it added both language halves, including the one `display:none` removes from the tree | count only reachable text |
| "live-flood at 26 words" | the threshold flagged a diagram caption that is the explanation the student pressed Next to hear | 40 words, and bilingual mode reported rather than flagged |
| "64 reveal-only" *after the fix* | the audit read lesson source; the gate is applied at runtime | consult the built page for whether the gate is loaded |

The last one is the sharpest: a measurement that cannot see its own fix is
worse than no measurement.

---

## 12 · One real bug, found by driving the component

`render()` replaces `innerHTML` but not the host, and `wire()` was being
called from `render()`. Listeners accumulated: by problem 2, one press of
Next fired twice and skipped a problem; by problem 3 it skipped two. No
error, no wrong answer — the component simply appeared to lose problems at
random. Found by clicking through all four levels, not by reading the code.

Wired once from the constructor now, with the handlers reading the *current*
problem rather than one captured at wire time. Both guarded by tests verified
to fail when the fix is undone.

---

## 13 · Remaining weaknesses

**Content**

1. **No prerequisite blocks** (0 / 18). A student who cannot follow unit 5 is
   not told which earlier unit to revisit. Helps the weakest students most.
2. **One prediction per unit.** Several concepts with observable outcomes
   still have none — every gate, every SQL clause, every K-map grouping.
3. **Faded practice covers 3 skills of a possible ~12.** The pattern is
   proven across all three subjects; the remaining procedural topics (K-map
   grouping, 2's complement, SQL writing, the 8085 fetch cycle) have none.

**Language**

4. **Nepali-mode heading outline is still 20% translated** (374 headings, 75
   with Nepali; lesson pages 7–22%). Documented since Phase 3.1, quantified
   in Phase 5, unchanged here. It is content authoring, and it is the largest
   remaining gap for a Nepali-medium student.

**Platform**

5. **Google Fonts** — 6 network requests per page in an offline-first
   product. Phase 5 finding, unchanged, deliberately.
6. **Screen-reader session** — deferred through six phases. Phase 6 found 12
   more untagged labels that only a screen-reader-oriented audit surfaces,
   which is further evidence for how much a real session would find.
7. **The retrieval self-grade is recorded and never shown.** §17 asks for
   visible competence growth; the data now exists and there is no view of it.

---

## 14 · Recommendations for Phase 7, in order

1. **A revision view built on the retrieval record.** The data is being
   collected. A student who has graded twelve questions "Not yet" should be
   able to see which, and go straight to them. This is the highest-value
   remaining item and needs no new content.
2. **Nepali headings.** The largest remaining gap for the audience the
   platform exists to serve.
3. **Prerequisite blocks**, one per unit, pointing at the specific earlier
   unit and topic.
4. **Faded practice for the remaining procedural skills**, now that adding
   one costs a content file and two lines.
5. **A real screen-reader session** before the fourth subject.

---

## 15 · The §30 final quality standard, answered honestly

| | |
|---|---|
| **Technical** — still robust and maintainable? | **Yes.** Zero dependencies, deterministic build, 321 tests, no engine changes needed for a fourth subject's practice. |
| **Educational** — can a weak student understand without a teacher? | **Better, not solved.** They can now attempt, be marked per step, and be told *why* — which is new. Prerequisites and Nepali headings remain gaps for exactly this student. |
| **Interaction** — does the student think rather than watch? | **Yes, materially.** 64 questions that could be read now require an attempt; three procedural skills require execution with per-step feedback. |
| **Psychological** — retrieval, prediction, practice, mastery? | **Retrieval yes, practice yes, fading yes.** Spacing and interleaving are not implemented; the retrieval record makes them possible in Phase 7. |
| **Visual** — does every visual improve understanding? | **Yes** — and none were added. Phase 4.5 and Phase 5 verified the existing 55. |
| **Exam** — can the student transfer to an SEE question? | **Better.** Practice problems are exam-shaped, and the independent problems are built around the specific errors that lose marks. |
| **Language** — can a student learn in Nepali without losing terminology? | **Improved but incomplete.** Every new component is bilingual, technical terms stay English, and 12 control labels are no longer read in the wrong voice. The 20% heading coverage is unchanged. |
| **Commercial** — a serious educational product? | **Yes.** A student can now attempt, be marked, be told why, and carry one line out. That is the difference between notes and a learning system. |

---

*Phase 6 complete. 321 tests, 0 failures, deterministic build, no
regressions. No new subject started; Programming in C not begun. Not
deployed.*
