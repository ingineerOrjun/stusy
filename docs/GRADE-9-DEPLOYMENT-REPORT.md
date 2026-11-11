# Grade 9 — Shipping Phases 13, 13.1, 14 and 14.1

**Verdict: DEPLOYED AND VERIFIED**

Executed 2026-11-12. Two Grade 9 subjects that existed only as uncommitted
files in the working tree are now committed, merged to `main`, deployed, and
verified live at **https://stusy.vercel.app**.

Grade 9 goes from one unit of one subject to **fourteen units across two
subjects**, with quizzes and revision pages for both.

---

## 1 · What was found, and why nothing was visible

The notes were never missing. They had never been committed.

`C:\Users\Acer\Desktop\rgsc-study`, branch `phase-13-grade-9-units-2-7`,
sitting at `e56fca9` with **no commits of its own**:

```
untracked : 48 files
modified  : 92 files
staged    : 0
```

Four completed phases lived there — Phase 13 (Fundamentals of Computer and
Application, units 2–7), Phase 13.1 (Nepali review integrity), Phase 14
(Programming Principles and Concept in C Language, all seven units) and
Phase 14.1 (C compiler verification). Each of their reports opens by saying
so: *"Nothing is committed, pushed, merged or deployed."*

Never committed → never pushed → Vercel never saw it. The live site was
correct about its own state: it showed Computer Fundamentals as *1 of 7
units* and C Language as a *syllabus outline*, and
`grade9/computer-fundamentals/unit2.html` returned 404. A search of every
branch, local and remote, found no Grade 9 units 2–7 anywhere in git.

This also located the `tools/grade9-spec.js` change an earlier brief asked
to preserve: it was in this checkout, **exactly +17/−2**, not in the
Phase 14.2 worktree where it had been looked for.

---

## 2 · Commits

### `a77e46e` — the snapshot

```
Grade 9: both written subjects, units 1-7
140 files changed, 341109 insertions(+), 49111 deletions(-)
```

Taken first, before anything else was run, so the work could not be lost
whatever followed. Every one of the 48 untracked files was inspected first:
all were project files, no logs, temporaries or editor leftovers.

### `c691f2f` — the merge

The Grade 9 work was written on `e56fca9` and had never seen the
output-block fix shipped in `76edf4a`. `main` was merged into it.

**No conflicts.** The two changes touch `_source/design/site.css` in
different regions — the `.out` rule near the worked-example styles, the
cipher bench appended after them — and git resolved all sixteen overlapping
files automatically.

The tree was then rebuilt, and the build **reproduced the auto-merged
generated files byte for byte** — zero real changes on top of the merge.
That is the strongest available evidence that the textual merge was correct
rather than merely plausible.

---

## 3 · Build, tests, specification

```
npm run build  → content validation: 8 subjects, 8 outlines,
                 52 authored pages across 6 subjects, 82 diagrams — OK
                 (no warnings)
npm test       → tests 527 | pass 527 | fail 0
node tools/grade9-spec.js --check
               → GRADE-9-CURRICULUM-SPECIFICATION.json is current. (exit 0)
```

**527 of 527 pass.** The count rose from 471 because the Grade 9 work brings
three new test files (`grade9-c.test.js`, `grade9-cf.test.js`,
`nepali-review.test.js`).

The build warning that had stood for months — *"grade9/computer-fundamentals:
1 of 7 syllabus units authored — the subject is incomplete"* — **is gone**,
because all seven are now authored.

The specification needed no regeneration: it had already been regenerated
alongside the generator change as part of the Grade 9 work, and `--check`
confirms it current. It now records **14 of 28 units authored** and **71 of
168 topics fully taught**, up from 7 and 36.

| | before | after |
|---|---|---|
| authored pages | 37 across 5 subjects | **52 across 6** |
| units in the learning map | 25 | **38** |
| retrieval questions | 86 | **128** |
| diagrams injected | 79 | **92** |
| Grade 9 unit pages | 1 | **14** |

---

## 4 · The output-block convention, checked against the new content

The Grade 9 pages carry **21 `div.out` blocks and 8 `pre.out` blocks** that
were authored before the `.out-prose` convention existed. This was the exact
risk recorded as a limitation in the Phase 14.2 report: an author who adds a
single-line `div.out` without ` out-prose` gets a sentence that scrolls
sideways, and nothing fails.

Every one of the 21 was classified:

```
MULTI-LINE (aligned, correct as-is): 21
SINGLE-LINE (need out-prose)      : 0
```

All 21 are column-aligned drawings, so **no `out-prose` was needed and no
Grade 9 content was touched**. The convention holds without amendment.

One detail worth recording: the Grade 9 index uses `<span class="status
out">` for its subject badges. The Phase 14.2 rule is scoped to
`pre.out, div.out`, so those badges are untouched — verified live, computed
`white-space: normal`. A bare `.out` selector would have broken them.

---

## 5 · Browser verification

All 14 new Grade 9 unit pages, at **1280 px and 320 px**, with `.wex-work`,
`.ans` and `<details>` forced open so no gated block was skipped.

| | |
|---|---|
| pages | 14 |
| output blocks measured | 29 (21 `div.out`, 8 `pre.out`) |
| page word counts | 3,053 – 6,890 |
| failures at 1280 px | **0** |
| failures at 320 px | **0** |
| horizontal page overflow | **none, at either width** |
| console errors | **none** |

Every aligned block rendered its exact source line count — never wrapped, so
no column moved. At 320 px the wide ones scroll inside their own box, never
the page. The new C Programming quiz loads 12 question elements with no
errors.

---

## 6 · Grade 10 protection

The merge changes 39 Grade 10 files, and that needed explaining rather than
waving through. It is **exactly 2 lines per file** — 39 × 2 = +78/−78 — and
those two lines are the shared desktop navigation and mobile panel, which
now describe Grade 9 correctly:

```
- C Language …                        Computer Fundamentals · 1 of 7 units
+ C Language · notes ready            Computer Fundamentals · notes ready
```

Lesson content was compared with the navigation excluded:

```
Grade 10 files compared, nav excluded : 39
lesson content identical              : 39
=> no Grade 10 lesson content changed; only the shared navigation
```

All Grade 10 guards pass inside the 527: 150/150 official topics, 150/150
coverage, 39/39 bookmarked URLs, question banks registered and unshared.
Three Grade 10 pages fetched from production after the deploy are
byte-identical to the committed build.

---

## 7 · Push, merge and deployment

`origin/main` was re-confirmed at `6193eef` immediately before the merge, and
`c691f2f` has it as an ancestor, so the update was a fast-forward that
overwrote no remote work. No force-push.

The payload was measured first because this repository uploads slowly and
has failed multi-commit pushes with HTTP 408 before: **193 objects, 3.96 MB,
2 commits**. It was pushed in the background with an enlarged buffer and
completed cleanly.

```
origin/phase-13-grade-9-units-2-7 : c691f2f
origin/main                       : 6193eef → c691f2f
```

Deployment is Vercel's Git integration, as before — no workflows, no
`.vercel` link, `vercel.json` with empty install and build steps and
`outputDirectory` `"."`. The push to `main` is the trigger. It was confirmed
by fetching production, not assumed: homepage **HTTP 200**,
`X-Vercel-Cache: MISS`, `Age: 0` — freshly built.

---

## 8 · Live verification

| check | result |
|---|---|
| Grade 9 unit pages | **14 / 14 → HTTP 200** |
| Grade 9 quiz + revise pages | **4 / 4 → HTTP 200** |
| Pages byte-identical to the committed build | **14 / 14** |
| Grade 9 index status badges | 2 × *notes ready*, 2 × *syllabus outline* |
| Grade 10 pages after deploy | identical to build |
| Console errors | **none** |

The live Grade 9 index now reads:

```
SUBJECT 1  Programming Principles & Concept in C Language   NOTES READY
SUBJECT 2  Fundamentals of Computer and Application         NOTES READY
SUBJECT 3  Fundamentals of Electro-System                   SYLLABUS OUTLINE
SUBJECT 4  Website Design                                   SYLLABUS OUTLINE
```

`grade9/c-programming/unit3.html` serves 5,828 words with its output block
rendering as authored and no horizontal overflow.

---

## 9 · Remaining limitations

1. **Two Grade 9 subjects are still outlines** — Fundamentals of
   Electro-System and Website Design. Unwritten, not broken; the site says
   so on its own index.
2. **97 of 168 Grade 9 topics remain not implemented**, which is those two
   subjects.
3. **The CRLF false negative persists.** Still no `.gitattributes`, so the
   specification guard can report a spurious failure on a fresh Windows
   checkout while passing in CI. Deliberately not addressed. The same
   artifact blocked a fast-forward during this work and had to be reasoned
   around rather than cleared.
4. **No automated guard for the `.out-prose` convention.** It held for all
   21 new Grade 9 blocks by inspection, not by test. Still deliberately not
   added.
5. **The limitations each phase recorded for itself still stand** — see
   `PHASE-13-COMPLETION-REPORT.md`, `PHASE-13-1-COMPLETION-REPORT.md`,
   `PHASE-14-COMPLETION-REPORT.md` and `PHASE-14.1-VERIFICATION-REPORT.md`,
   all now committed alongside the work they describe.

---

## 10 · Final state

```
branch                            : phase-13-grade-9-units-2-7
HEAD                              : c691f2f
origin/main                       : c691f2f
origin/phase-13-grade-9-units-2-7 : c691f2f

real diffs : 0
untracked  : 0
staged     : 0
```

Nothing was reset, discarded, stashed, cleaned or force-pushed. The
`claude/sad-sutherland-c22165` worktree remains on its own branch at
`6193eef`, and `claude/keen-lamport-c73cfe` is untouched at `49d20b7`.

```
*   c691f2f Merge main into the Grade 9 branch
|\
| * 6193eef docs: record the Phase 14.2 deployment
| * 76edf4a fix: improve shared code output formatting
* | a77e46e Grade 9: both written subjects, units 1-7
|/
* e56fca9 A subject is outline, partly written or complete
```

This report was written after `c691f2f` and is committed on top of it.

---

## Verdict

**DEPLOYED AND VERIFIED**

Fourteen Grade 9 unit pages across two subjects, with their quizzes, revision
pages, question and practice banks, simulations and curriculum maps, are
committed, merged fast-forward into `main`, deployed, and serving
byte-identical content live. The build is clean with no warnings for the
first time, 527 of 527 tests pass, the specification check passes, and
Grade 10 is unchanged apart from two lines of shared navigation per page
that now describe Grade 9 correctly.
