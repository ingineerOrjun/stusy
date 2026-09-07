# Phase 7 — Learning Experience Completion & Revision Intelligence — Completion Report

**Baseline** `6dc9548` (Phase 6 complete) · **Head** this phase's final commit
**Scope** the three existing flagship subjects. No new subject started.
**Result** 346 tests passing across three consecutive runs, deterministic
build reproduced from a wiped `assets/` directory, no regressions.

Throughout: **VERIFIED** = measured in this phase. **NOT VERIFIED** = it was
not. **INFERRED** = reasoned from evidence without direct measurement.
**RECOMMENDED** = for Phase 8.

---

## The one-line summary

The learning loop ran forward and stopped. A student finished a unit,
graded themselves, and the record went into storage nobody could read.
Phase 7 built the missing edge — **REVISE** — and the prerequisite layer
that gives a weak result somewhere to go.

---

## 1 · Baseline, verified before anything changed

**VERIFIED**, not assumed as the brief instructs.

| | |
|---|---|
| Branch / HEAD | `phase-4-dbms` / `6dc9548`, clean tree |
| Build | 8 subjects, 23 authored pages, 55 diagrams, 0 warnings |
| Tests | 321 pass, 0 fail — **run three times, no flakiness** |
| Rebuild determinism | 0 files changed |

---

## 2 · Before and after

| | Before | After |
|---|---|---|
| Tests | 321 | **346** |
| Authored pages | 23 | **26** |
| Built pages | 36 | **39** |
| Prerequisite edges | **0** | **19** |
| Units declaring what they assume | **0 / 18** | **14 / 18** (4 are entry points) |
| Revision views | **0** | **3** |
| Mastery states | none | 5, deterministic |
| Retrieval records shown to the student | **none** | all 64 |
| Diagrams / animations / simulations | 55 / 11 / 26 | unchanged |
| Word count | — | unchanged |

---

## 3 · What was implemented

### 3.1 · The prerequisite system — VERIFIED

19 edges, 4 entry points, no cycles. The graph file holds **only the
edges**; titles, pages, hours and marks are joined from `config/pages.js`
at build time, so nothing is written twice.

Every edge carries a reason naming the *specific* thing to re-read:

> "A partial dependency is defined against PART of a composite key, and a
> transitive one against a NON-KEY column. Neither definition can be
> applied without the key vocabulary from Unit 3."

The build refuses an edge to a unit that does not exist, an edge without a
reason in both languages, a reason under eight words, and any cycle —
reporting the **actual path** rather than "a cycle exists", because a
five-unit cycle is not findable by inspection.

Rendered at build time above the objectives, in an `<aside>` with an
accessible name, because the student who most needs it is the one whose
page half-loaded.

### 3.2 · Revision intelligence — VERIFIED

Deterministic rules, documented in the service and tested against a
controlled record:

```
not          → NEEDS_REVIEW    SHAKY    → partly
got, once    → FRESH           SECURE   → got after an earlier miss
never seen   → UNSEEN
```

Mastery: `NEW / LEARNING / PRACTICING / NEEDS_REVIEW / MASTERED`, with
NEEDS_REVIEW beating everything except NEW — a unit with one outstanding
wrong answer is not "practising", whatever the other counts say.

**No new storage abstraction was built.** `ProgressService` already had
one, including a write *probe* rather than a feature check. Phase 7
extends it and changes none of it.

### 3.3 · "Revise this" paths — VERIFIED

A weak unit offers **two doors**: the unit itself, and the thing it
assumes you already know — with the reason attached, so the second door is
a diagnosis rather than a guess.

Discoverable from every unit's chip bar (`↻ · Revision`).

### 3.4 · Tone — VERIFIED by review

Every line describes a **record**, never a student: *Needs another look*,
*Almost there*, *Right first time*, *Held after a miss*. No streaks,
points, badges or celebration. Wording lives in `UIStrings` so it can be
reviewed as language rather than buried in a scoring function.

---

## 4 · What was deliberately NOT done

**Content depth items 5–7 from the audit** — faded practice for Digital
Design 2 and 5 (30 marks between them), OOP 2 (14 marks), and more
prediction blocks. All real, all recorded in
[PHASE-7-CONTENT-AUDIT.md](PHASE-7-CONTENT-AUDIT.md) §"Priority list".

Phase 6 established the declarative pattern that makes each one a content
file plus two lines. Spending Phase 7's capacity on content would have
left the structural work half-finished — and no amount of content
substitutes for a student not knowing what to revise.

**Nothing was padded.** No words added, no diagrams added, no animation
added. The audit's §"What the audit found NOT to be a gap" records why:
the brief's own §7 animation candidate list is *already covered*, every
item.

---

## 5 · Files changed

**49 files, +3,963 / −39.** New:

```
_source/content/prerequisites.js        the graph, 19 edges with reasons
_source/content/sections/revise.html    the shared revision frame
_source/runtime/services/revision.js    rules, mastery, recommendations
_source/runtime/revise.js               the view
tests/revision.test.js                  25 tests
grade10/{dbms,digital-design,oop-cpp}/revise.html
assets/js/learning-map.js               generated: units + question join
```

Modified: the build (context, index, validate, bilingual), `pages.js`,
`learning-ux.css`, `strings.js`, and every built page.

---

## 6 · Tests — 321 → 346

| Area | Guards |
|---|---|
| Graph validity | every unit is a real built page; every edge points somewhere; ids match `subject/uN` |
| **Cycle detection** | a cycle renders perfectly and walks the student in a circle |
| Reasons | both languages, real Devanagari, long enough to name a thing |
| Entry points | every subject has somewhere to start |
| Id collisions | the id is the storage key; a collision silently merges two histories |
| Priority rules | all five, including `got×1` vs `got×2` |
| Mastery states | all five, against a controlled record |
| Recommendations | ordering, tie-break by marks, and the empty-recommendation rule |
| **Storage failure** | quota full, store throws on probe, corrupt JSON, absent service, throwing service |
| Page wiring | script order — the map calls a service that must exist first |
| Nepali-mode wrapper | the bug in §7 below |

**Each was verified to fail when its feature is deliberately broken**, by
breaking it. Three of four checks fired immediately; **one did not**, and
that is recorded in §7.

---

## 7 · Two defects found by the phase's own verification

### A vacuous test — caught by trying to break it

The Nepali-mode wrapper test counted `<div class="t-en">` against
`</div>`. Every other div closes too, so the counts balance whatever the
nesting is: it passed when the bug was reintroduced. **A test that cannot
fail is worse than no test, because it is also a claim that the thing is
covered.** It walks the ancestor chain now, and a second test covers every
other runtime-filled mount for the same shape.

### The revision view was blank in Nepali mode

The page rendered, the map loaded, and every panel was empty. Not a data
problem: the build's English-pairing pass swept the **empty** runtime
container into a `<div class="t-en">`, which Nepali mode hides.

Runtime-filled containers now break the pairing run. This is the third
appearance of this bug class (Phase 3.1, Phase 5, now), and the first time
it has been guarded by a test rather than only fixed.

---

## 8 · Accessibility — VERIFIED, no regression

Re-run with the Phase 5 instruments over the new surfaces, all three
language modes:

| | Result |
|---|---|
| Untagged Devanagari | **0** |
| Unnamed controls | **0** |
| Heading-level skips | **0** — after fixing one, see below |
| Unreachable controls / traps / positive tabindex | **0 / 0 / 0** |
| Focus rings below 3:1 | **0** |
| Measured contrast failures | **0** |
| Console errors | **0** |

**Two findings, both fixed:**

- The revision view's runtime headings skipped h1 → h3. The build's
  heading normaliser only sees static content; script-written headings
  must be authored at the right level.
- `.rv-act` measured **43px** at 320px, one pixel under the touch floor.
  The revision action and the prerequisite link are the two things a
  struggling student taps most. 44px on emulated touch, verified.

**WCAG 2.1 AA is NOT CLAIMED.** What a screen reader actually speaks is
**NOT VERIFIED** — no screen reader is drivable here. Phase 5 §23 remains
the accurate criterion-by-criterion statement.

---

## 9 · Visual QA — VERIFIED

**7 widths × 3 language modes = 21 combinations**, all clean: no
horizontal overflow, no clipped content, no empty panel, no language
leak, no text below the 12px floor.

```
320  390  430  768  1024  1280  1440      ×  English / Nepali / Bilingual
```

States exercised: empty (nothing attempted), populated, all five mastery
states, recommendation present and absent, and a language switch with the
view rebuilt under it.

---

## 10 · Performance — VERIFIED, measured

| | Revision page | Unit page with prerequisite |
|---|---|---|
| DOM interactive | **91 ms** | **109 ms** |
| DOMContentLoaded | 96 ms | 371 ms |
| Load complete | 180 ms | 374 ms |
| DOM nodes | 264 | 651 |
| Requests | 12 | — |

Assets added: `revision.js` 9.1 KB, `revise.js` 11.7 KB,
`learning-map.js` 22.3 KB — the last loading **only on the three revision
pages**. Subject stylesheets grew ~7 KB uncompressed for the prerequisite
and revision components.

**INFERRED, not measured:** these are uncompressed sizes and would be
substantially smaller over the wire. No frame rate is quoted — the
automation pane throttles `requestAnimationFrame` and any number would be
fiction.

---

## 11 · Unresolved issues and technical debt

**Carried from earlier phases, unchanged:**

1. **What a screen reader speaks — NOT VERIFIED.** Seven phases. Phase 6
   found 12 untagged control labels that only a screen-reader-oriented
   audit surfaces; Phase 7 found none, but the instrument is still a model
   of the tree rather than a reader.
2. **Nepali heading outline is ~20% translated.** Documented since Phase
   3.1, quantified in Phase 5, unchanged. **The largest remaining gap for
   a Nepali-medium student**, and the one the prerequisite reasons make
   more visible: the reasons are fully bilingual, the headings above them
   are not.
3. **Google Fonts** — 6 network requests per page in an offline-first
   product.
4. **`file://` operation — NOT VERIFIED.** The preview pane renders
   external files as static snapshots.

**New in Phase 7:**

5. **The revision record is per-device and per-browser.** Stated on the
   page. A student switching phones starts empty. The storage abstraction
   is where an account would attach; nothing else would change.
6. **Revision is unit-level, not topic-level.** The question bank already
   tags `topic`, but the 64 practice questions sit under one "Exam focus"
   heading per unit and carry no topic of their own. Finer granularity
   needs `data-topic` on each — 64 content edits, not an engine change.
7. **No spacing or interleaving.** The brief's §11 asks for both. The
   record now makes them possible (`at` timestamps are stored); neither is
   implemented.

---

## 12 · The quality gate, answered honestly

| | Question | Answer |
|---|---|---|
| 1 | Every unit understandable to a weak student? | **Better, not solved.** They now know what a unit assumes and where to get it. Nepali headings remain a real barrier. |
| 2 | Can students practise, not just read? | **Yes.** 64 gated questions, 26 simulations, 3 faded sequences. Four more procedural skills identified. |
| 3 | Can students identify what to revise? | **Yes** — this is the phase's main deliverable. |
| 4 | Can they move from a weak topic to its prerequisite? | **Yes**, with the reason attached. |
| 5 | Does interaction teach? | **Yes** — verified by driving all 26 mounts and 11 animations in Phase 6, unchanged here. |
| 6 | Animations educational, not decorative? | **Yes** — 11, each stepped to its last frame, each covering a candidate from the brief's own list. |
| 7 | All three language modes genuinely usable? | **Yes for controls and structure.** Verified across 21 width×mode combinations. Lesson *headings* are still ~20% Nepali. |
| 8 | Can students learn through prediction and retrieval? | **Retrieval yes**, all 64. **Prediction is thin** — 18 blocks, one per unit. |
| 9 | Does it encourage mastery over browsing? | **Yes** — a named mastery state per unit and a recommendation that names the reason. |
| 10 | Can the architecture support Grade 9–12 without redesign? | **Yes.** The revision view, mastery model and recommendation rules never learn a subject's name. A new subject adds content files and page entries; no engine change. |

---

## 13 · Recommendations for Phase 8, in order

1. **Faded practice for Digital Design 2 and 5** — 30 marks between them,
   the heaviest units in the product, both classified **E** by the audit.
   Costs a content file and two lines each.
2. **Nepali headings.** Seven phases old. The prerequisite reasons made it
   more visible, not less: a student reads a fully bilingual diagnosis and
   then meets an English heading.
3. **A real screen-reader session** before the fourth subject.
4. **Spacing** — the timestamps are already stored; surfacing "you have
   not looked at this in three weeks" is a query, not a new model.
5. **Topic-level revision** — 64 `data-topic` attributes would take the
   recommendation from "revise Unit 5" to "revise transitive dependency".

**Programming in C should start after 1 and 3.** The architecture is ready
for it; the existing subjects are not yet at the standard those two items
would set.

---

*Phase 7 complete. 346 tests across three consecutive runs, 0 failures,
deterministic build reproduced from a wiped assets directory, no
regressions. Programming in C not started. Not deployed.*
