# Phase 12.2 — final release audit

Independent audit of the Phase 12 and Phase 12.1 work before any push.
No feature was implemented, no unit authored, nothing merged, pushed or
deployed.

## Verdict

# READY AFTER MINOR CORRECTIONS

The engineering is sound and every claimed figure was independently
reproduced. Two user-visible inaccuracies introduced by Phase 12 survived
Phase 12.1's verification because nobody looked at the home page or the grade
index. One of them is on the most-visited page of the site and would go live
with this push. Neither is in the Grade 9 content itself.

---

## 1 · Actual git state

| | |
|---|---|
| Branch | `phase-12-grade-9-computer-application` |
| HEAD | `d476a57` — *Phase 12: Unit 1, and three places the build assumed a subject arrives whole* |
| Upstream | **none configured** |
| Branch on remote | **does not exist** — `origin` has `main`, `phase-11-grade-9-foundation`, `phase-9-curriculum-integrity` |
| vs `origin/main` | 5 ahead, 0 behind. `origin/main` = `main` = `49d20b7`, unchanged |
| Merge commits | none |
| Stashes | none |
| Staged changes | none |

**There are no Phase 12.1 commits.** Every Phase 12.1 change — the practical
learning implementation, the quiz-engine fixes, the derived specification, the
documentation — is **uncommitted in the working tree**. 44 files with real
content changes, 5 untracked files.

A second worktree exists at `.claude/worktrees/keen-lamport-c73cfe` on branch
`claude/keen-lamport-c73cfe` at `49d20b7`. That is the separately-started quiz
markup investigation. It is isolated and was not touched.

### Content changes vs the Phase 11 base, by class

Measured with `git diff --numstat`, never `git status`: this repository has
`core.autocrlf=true` and no `.gitattributes`, so after any build `git status`
lists ~49 built files as modified while `--numstat` totals `0 0`.

| Class | Files |
|---|---|
| Grade 9 content and config | `cf-u1.html`, `cf-hero.html`, `cf-quiz.html`, the question bank, `pages.js`, `coverage.js`, `syllabus.js`, `specification-grid.js`, `diagrams.js`, `sim-drill.js` |
| Shared bug fixes | `runtime/quiz.js`, `sections/db-quiz.html`, `sections/hw-quiz.html`, `build/validate.js` |
| Shared feature for Grade 9 | `runtime/practical.js` (new), `services/progress.js`, `services/strings.js`, `site.css`, `learning-ux.css`, `build/context.js` |
| Tests | 8 files, +427 lines |
| Tooling and docs | `tools/grade9-spec.js`, 14 documents |
| Generated output | 5 CSS bundles, 6 JS bundles, 8 HTML pages |

**A checksum audit of Grade 10 source would have raised 23 false alarms.** All
23 Grade 10 lesson files and all four Grade 10 question banks hash differently
against `d476a57` because `git show` and the working copy disagree on line
endings. Normalising line endings, **exactly two files differ in content** —
`cf-u1.html` and the Grade 9 question bank — which is what `--numstat` said.

---

## 2 · Shared quiz engine

The whole diff was read. Escaping was **not** touched: `git diff 648cd48 --
_source/runtime/quiz.js` contains no change to `esc()` or `bilingual()`.

| Requirement | Result |
|---|---|
| No missing DOM element can prevent a score | **Pass.** All four writes go through a guarded helper and `display='block'` follows them. `validate.js` additionally refuses an incomplete score box, and fails loudly if it finds no quiz section to check |
| Score output works in every language mode | **Pass.** Measured on all five pages: in `en` the English line shows and the Nepali is hidden; in `ne` the reverse; in `bi` both. The Nepali line carries `lang="ne"` and real Devanagari |
| Grade 9 feedback references nothing nonexistent | **Pass.** No message names a unit or a section. A test fails if one ever does |
| **Grade 10 feedback retains subject-specific references** | **FAIL — see Finding A** |
| Escaping does not silently damage content | **Unchanged by this work, and pre-existing damage confirmed:** 72 strings across 34 questions — 65 strings in `grade10-oop-cpp.js`, 7 in `grade10-hardware.js`. DBMS, Digital Design and the Grade 9 bank are clean. Separate investigation, correctly out of scope |
| Existing question text and answers preserved | **Pass.** The only source bank changed is Grade 9's. The built bundle shows **144 lines added and 0 removed** — nothing was altered or deleted |
| Every quiz page shows a final result | **Pass on all five — see §3** |
| Empty and partial states | **Pass.** Score box hidden with nothing answered and with all-but-one answered, on all five pages |

---

## 3 · Every quiz page, driven to the end

Five generated quiz pages exist. Each was loaded, every question answered, the
result read, both languages checked, and the retake exercised.

| Page | Drawn | Empty hidden | Partial hidden | Final shown | Score | `en` / `ne` | Retake resets | Console |
|---|---:|---|---|---|---|---|---|---|
| grade9 computer-fundamentals | 8 | yes | yes | **yes** | 0 / 8 | correct | yes, redrew | 0 errors |
| grade10 oop-cpp | 12 | yes | yes | **yes** | 5 / 12 | correct | yes | 0 errors |
| grade10 dbms | 12 | yes | yes | **yes** | 0 / 12 | correct | yes | 0 errors |
| grade10 hardware | 12 | yes | yes | **yes** | 10 / 12 | correct | yes | 0 errors |
| grade10 digital-design | 12 | yes | yes | **yes** | 7 / 12 | correct | yes | 0 errors |

Score banding behaves: 83% → *"Very good"*, 58% → *"Keep going"*, 0% → *"Go
back to the unit"*. All five pages carry a complete score box in the generated
HTML.

---

## 4 · Practical learning

**32 activities confirmed independently of the mapping document.** Extracting
every `n.m` token from PDF pages 20–22 yields 34 unique numbers; three of them
(7.7, 7.8, 7.9) belong to the *scope* table on page 20, and 6.1 is missed by a
word boundary because the text runs `6Multimedia6.1`. 34 − 3 + 1 = **32**,
matching the mapping's seven tables exactly, with no duplicates.

| Check | Result |
|---|---|
| All 32 activities mapped | **Pass** — 6 / 5 / 4 / 5 / 3 / 3 / 6 |
| Per-unit practical hours match the grid | **Pass** — 10 / 10 / 8 / 6 / 12 / 8 / 10 = 64 |
| The six Unit 1 activities are accurate | **Pass.** All six faithful to the curriculum, including the document's own *"mode and brand"* in 1.6. 1.3 is rendered "take part in" where the curriculum says "conduct" — a student-facing rephrasing of an instruction addressed to the class, not a change of requirement |
| Labelled as samples | **Pass.** The page quotes the curriculum calling them samples and says a teacher may set other work, while stating that the 10 hours are not a sample |
| Offline work not presented as simulation | **Pass.** The mapping states *"No activity in this subject can be completed inside Gyansetu. Not one."* No claim of verification, award or approval appears anywhere on the page |
| Completion and recording distinct | **Pass.** `done` and `recorded` are separate states and separate counts, with the curriculum's 15 / 3 and 10 / 2 split as the stated reason |
| Progress persists | **Pass.** Ticks survived a full reload: radio states, `data-pr-state` and the tally all restored. They also survived navigating to the revision page |
| No marks awarded automatically | **Pass.** The summary reads *"Kept on this device only. It is not a mark and nobody else sees it."* No mark figure is displayed |
| Not misrepresented as teacher-verified | **Pass** |
| Practical writes do not disturb other progress | **Pass.** `units`, `quiz` and `retrieval` stayed empty while practical rows were written |

**The invented attestation clause is gone and did not come back.** The string
"attest" appears nowhere in the 321-page PDF, and no Grade 9 content claims
it. What the page does state — the practical exam is before internal **and
external** supervisors and assesses skill as well as product, and a group
project needs each member's own reflection — is on PDF page 24, note (i) and
(ii).

---

## 5 · Curriculum and counts, independently confirmed

Re-derived from `syllabus.js` and `specification-grid.js`, not read from any
report:

| Claim | Measured | |
|---|---:|---|
| Computer and Application topics | 36 | ✓ |
| Grade 9 topics | 168 | ✓ |
| Grade 10 topics | 150 | ✓ |
| Total topics | 318 | ✓ |
| Theory hours | 64 | ✓ |
| Practical hours | 64 | ✓ |
| Working hours | 128 | ✓ |
| External marks | 50 | ✓ |
| Units | 7 | ✓ |

The internal 50 was checked row by row against PDF page 24:
5 + 15 + 3 + 10 + 2 + 5 + 10 = **50**, **0 rows disagreeing**.

---

## 6 · Nepali review status

| | |
|---|---|
| Items | **2,090** |
| Status breakdown | `pending-review`: **2,090**. Nothing else |
| Human-reviewed | **0** |
| Grade 9 represented | **yes — 125 items** |

Per subject: shared 54, dbms 528, oop-cpp 498, digital-design 453, hardware
432, grade9/computer-fundamentals 125. The ledger document states 2,090 and
all pending, and a test now fails if either column drifts. **No document
anywhere claims any human review has happened.**

---

## 7 · Grade 10 regression

| | |
|---|---|
| Coverage, derived independently of `validate.js` | oop-cpp 35/35, hardware 37/37, dbms 39/39, digital-design 39/39 — **150/150**, 0 dangling anchors |
| URLs | **39** |
| Question banks | 52 / 54 / 52 / 30, no source bank changed, 0 lines removed from the bundle |
| Lesson pages | **0 changed.** All 23 byte-identical once line endings are normalised |
| Lesson navigation | dbms unit3: 1 `h1`, 2 simulators, 10 nav links, 3 breadcrumbs, 0 console errors |
| Language modes | All three clean on a Grade 10 lesson: 0 stray text, 0 unnamed controls |
| Progress behaviour | Unit completion, subject percentage, quiz history and best, retrieval grading and reset all verified after the schema addition |
| DBMS and Hardware quiz score | **Fixed and verified by playing them to the end** |

### Every Grade 10 file changed, classified

| File | Lines | Class |
|---|---:|---|
| `_source/content/sections/db-quiz.html` | +4 | **Intended shared bug fix** |
| `_source/content/sections/hw-quiz.html` | +4 | **Intended shared bug fix** |
| `_source/runtime/quiz.js` | +47 −7 | **Intended shared bug fix** |
| `_source/runtime/services/progress.js` | +59 −1 | Intended shared feature, additive |
| `_source/design/learning-ux.css` | +6 −1 | Intended shared fix (touch target) |
| `assets/js/quiz.js`, `services/progress.js`, `services/strings.js`, 5 CSS bundles, `question-bank.js`, `sim-drill.js`, `learning-map.js` | — | **Generated output** |
| `grade10/dbms/quiz.html`, `grade10/hardware/quiz.html` | +6 −2 each | **Generated output** |
| `index.html` | +10 −10 | **Generated output — but see Finding B** |

**No unintended modification was found.**

---

## 8 · Test and build

```
node _source/build/index.js
  content validation: 8 subjects, 8 outlines, 37 authored pages across
  5 subjects, 72 diagrams — OK (1 warning)
  ! pages["grade9/computer-fundamentals"]: 1 of 7 syllabus units authored
```

```
npm test     →  tests 433   pass 433   fail 0
```

Deterministic: three consecutive runs give 433 / 433 / 0. Statically
countable: 433 lines beginning `test(` across 24 files, matching the runtime
count exactly, so no test is conditionally declared and the count cannot vary
with build state.

---

## 9 · Findings

### Finding A — Grade 10 OOP lost its subject-specific quiz advice
**Introduced by Phase 12.1. Minor.**

Two of the five score bands used to read *"Re-read Units 3, 5 and 6"* and
*"use the Trace section slowly"*. Those were correct for OOP and false for the
other four subjects, so Phase 12.1 replaced them with advice that names
nothing. The audit brief asks that Grade 10 **retain** its subject-specific
references; it did not.

The present state is not harmful — generic-but-true beats specific-but-false
for four subjects out of five — but OOP is slightly worse served than before.
Two options, neither implemented here:

1. A per-subject override table keyed on `CFG.subject`, which the engine
   already computes, with the generic text as the fallback. Small and
   faithful to the old behaviour.
2. Name the units the student actually got wrong, which the render model
   already knows. Honest and personal rather than a fixed guess — but it is a
   new feature, not a correction.

### Finding B — the home page attributes Grade 9's unit to the four finished Grade 10 subjects
**Introduced by Phase 12. Not caught by Phase 12.1. User-visible on the front page.**

The home page reads, verbatim:

> *4 subjects are written in full — DS & OOP with C++, Hardware & Repair,
> DBMS, Digital Design — **across 25 units**: 72 diagrams, 15 of them
> animated, 40 things you can actually operate, and 86 practice questions…*

Those four subjects have **24** units. The 25th is Grade 9 Computer
Fundamentals Unit 1 — and the same page's own grade card correctly shows
Computer Fundamentals as **not** finished. The page contradicts itself.

`readySubjects.length` counts subjects with `done: true`; `S.units`,
`S.diagrams`, `S.simulators`, `S.retrieval` and `S.hours` are **site-wide**
totals. Phase 12 added a fifth subject's first unit and the sentence welded
the two together. Misattributed: 1 unit, 2 diagrams, 1 simulator, 4 retrieval
questions, 8 course hours.

The comment above the code says this paragraph is *"derived rather than typed"*
so that it *"cannot say something the site map disagrees with"* — which is
now exactly what it does.

Both halves are affected; the Nepali paragraph carries the same numbers.

### Finding C — Grade 9's index gives no signal that Unit 1 exists
**Introduced by Phase 12. Minor, same root cause as B.**

`grade9/index.html` labels all four subjects *"syllabus outline · 7 units · 64
theory hrs"*, including Computer Fundamentals, which has a written unit. A
student scanning that page sees nothing to distinguish the subject with
content from the three without. The card is driven by the same `done` boolean,
which cannot express "partly written". The route still works — the subject's
own page does link Unit 1 — so this is discoverability, not a dead end. The
card also omits practical hours, which the unit chip shows.

### Finding D — the Grade 10 index states the wrong unit count for two subjects
**Pre-existing. Live on stusy.vercel.app. Not a regression.**

`build/index.js` writes `const units = s.done ? 6 : …`. Actual unit pages:
oop-cpp 6, hardware 6, **dbms 7**, **digital-design 5**. The Grade 10 index
tells every student that every subject has six units; it is wrong for half of
them, and a DBMS student is told their subject is a unit shorter than it is.
Confirmed on `origin/main` and by fetching the live page.

### Finding E — 72 markup strings render literally in two quiz banks
**Pre-existing. Live. Under separate investigation.** 65 strings in
`grade10-oop-cpp.js` and 7 in `grade10-hardware.js`, affecting 34 questions.
Correctly excluded from this phase.

---

## 10 · Proposed commit structure — documented, not executed

The change groups are cleanly separable at file granularity. `validate.js`'s
addition is one contiguous block; `cf-quiz.html` contains only the score-box
repair; `progress.js` contains only the practical bucket.

| # | Commit | Source files |
|---|---|---|
| 1 | **Three of five quizzes showed no score at the end** | `runtime/quiz.js`, `sections/{cf,db,hw}-quiz.html`, `build/validate.js`, `tests/assessment.test.js` |
| 2 | **Grade 9 Unit 1: the practical half of the subject** | `runtime/practical.js`, `services/progress.js`, `services/strings.js`, `site.css`, `learning-ux.css`, `config/pages.js`, `build/context.js`, `content/lessons/cf-u1.html`, the question bank, `tests/{practical,progress}.test.js`, the practical mapping and blueprint docs |
| 3 | **The generated specification was reporting a curriculum nobody is teaching** | `tools/grade9-spec.js`, the spec JSON, `tests/{curriculum,language,links,ux}.test.js`, the count corrections, the Nepali ledger, the completion report |

**One caveat that makes this less clean than it looks.** This repository
commits its built output. Running the build regenerates everything, so commit 1
cannot carry built output that reflects only commit 1's source — its
`assets/css/*` would already contain commit 2's practical styles. Producing
three individually-consistent commits means stashing the other groups and
rebuilding between each, which is precisely the risky manoeuvre the brief
warns against for cosmetic gain.

**Recommendation:** either accept three commits whose intermediate built output
is slightly ahead of their source, or make one commit with a message that names
all three concerns. **Nothing was executed; no history was rewritten and no
cherry-pick was attempted.**

---

## 11 · Confirmation

- **No merge was performed.** No merge commits exist on this branch.
- **No push was performed.** The branch has no upstream and does not exist on
  `origin`; the three remote heads are byte-identical to their state at the
  start of this audit.
- **No deployment was performed.** `origin/main` is `49d20b7`, unchanged. The
  live site was read once with a GET to confirm Finding D and was not altered.
- **No history was rewritten.** The reflog shows only the original commits.
- **No feature was implemented and no unit was authored during this audit.**

## 12 · What must happen before READY FOR PUSH

1. **Finding B** — correct the home page so the four finished subjects are not
   credited with a fifth subject's unit, diagrams, simulators, questions and
   hours. This is the blocking one: it is false, it is on the front page, and
   it would go live.
2. **Finding A** — decide whether Grade 10 OOP gets its specific advice back.
3. **Finding C** — optional for this push; worth doing with B, since it is the
   same `done` boolean.

Findings D and E are pre-existing and already live. Neither blocks this push,
and both deserve their own work.

## 13 · Limitations of this audit

- Every judgement about teaching quality is outside its scope. **No teacher
  and no student has reviewed any of this content**, in either language.
- No screen reader was run. Structure was measured; no WCAG claim is made.
- The curriculum was verified against the CDC 2078 PDF. **Which examination
  edition actually applies is still unestablished.**
- Quiz pages were driven by script in one browser engine. Keyboard-only
  operation and assistive technology were not exercised.
