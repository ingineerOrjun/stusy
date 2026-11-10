# Phase 12 — regression report

**409 tests passing, 0 failing. Production build passes. Grade 10 unchanged at
150/150 with all 39 URLs intact and no Grade 10 file modified.**

Baseline taken on `phase-11-grade-9-foundation` at `648cd48` before any change.

---

## 1 · Before and after

| | Baseline | After Phase 12 |
|---|---:|---:|
| Tests passing | 406 | **409** |
| Tests failing | 0 | **0** |
| Production build | passes | passes, with 1 accurate warning |
| Grade 10 coverage | 150 / 150 | **150 / 150** |
| Grade 10 URLs | 39 | **39** |
| Grade 10 question banks | 4 subjects, 188 questions | **unchanged** |
| Authored subjects | 4 | **5** |
| Authored pages | 34 | **37** |
| Syllabus topics, all subjects | 319 | **318** (see §3) |

The build's one warning is a true statement about the state:

```
! pages["grade9/computer-fundamentals"]: 1 of 7 syllabus units authored
  — the subject is incomplete
```

---

## 2 · Grade 10 regression — the evidence, not the count

### No Grade 10 file was touched

`git diff --numstat` against the Phase 11 base, filtered to Grade 10 source and
output, returns **nothing**. The files changed are: the validator, the
specification grid, the syllabus (Grade 9 rows), `pages.js`, `coverage.js`,
`diagrams.js`, `sim-drill.js`, `context.js`, two test files, the Grade 9
built pages, and documentation.

### Coverage re-derived independently of `validate.js`

| Subject | Mapped / official | Dangling anchors |
|---|---:|---:|
| grade10/oop-cpp | 35 / 35 | 0 |
| grade10/hardware | 37 / 37 | 0 |
| grade10/dbms | 39 / 39 | 0 |
| grade10/digital-design | 39 / 39 | 0 |
| **Total** | **150 / 150** | **0** |

### URLs

All 39 Grade 10 pages still build, each asserted by name in
`tests/curriculum.test.js`.

### Shared components still protect Grade 10

The validator was relaxed in two places for partial authoring. Both were
mutation-tested to confirm Grade 10 is still guarded:

| Mutation | Result |
|---|---|
| DBMS unit 4 marks 14 → 13 in `pages.js` | **Build fails**, names the unit, cites the grid |
| A Grade 10 question bank loses one question | **Test fails**, names subject and both counts |
| A lesson file outside both naming schemes | **Test fails**, names the file |

`sim-drill.js` gained a set and lost nothing; the 15 existing sets are
untouched and their guards still pass. `diagrams.js` gained two entries.
`context.js` gained one line.

---

## 3 · The one number that moved, and why

`tests/content.test.js` asserts the total outlined topics across all subjects.
It was 319 and is now **318**, and the test **failed** when the change was made
— which is the system working.

The cause is a curriculum **correction**, not a loss: official topic 2.3 of
Grade 9 Fundamentals is one topic carrying two bullets, and the outline had
promoted the second bullet to a topic of its own. Merging it back gave
37 → 36 for the subject, 169 → 168 for Grade 9, 319 → 318 overall. The reason is
recorded in the test beside the number, so the next person to see 318 can find
out why without archaeology.

---

## 4 · New Grade 9 verification

| Check | Result |
|---|---|
| All 7 units represented in the blueprint | Yes — 1 authored, 6 planned |
| All 36 topics documented with a verification result | Yes — 35 Match, 1 corrected, 0 unclear |
| Unit 1 matches the verified curriculum | Yes — 4 topics, 4 coverage entries, build-gated |
| Duplicate topic ids | 0 |
| Duplicate page URLs | 0 |
| Lesson filename collision | 0 — `cf-` prefix, asserted |
| Navigation and Grade 9 routing | Verified in a browser: breadcrumbs, unit bar, grade dropdown |
| Progress / revision | Revision page builds and loads the learning map; unit appears as `grade9/computer-fundamentals/u1` |
| Interactive activity | Drill walked through all 6 cases, each marked correctly |
| Quiz | Draws 8 of 8, marks right/wrong, shows explanations |
| Broken internal links | 0 |
| Missing assets | 0 |
| Three language modes | All clean — see §5 |
| Responsive on changed pages | 0 overflow at 320 / 768 / 1440 |
| Accessible names on controls | All present; 1 `h1`; 0 heading-level jumps |
| Console errors | 0 on all four new pages |

### Language modes, measured

| Mode | Empty pairs | Stray Devanagari | Stray English | Unlabelled controls |
|---|---:|---:|---:|---:|
| Bilingual | 0 | — | — | 0 |
| English | 0 | 0 | — | 0 |
| Nepali | 0 | — | 0 | 0 |

64 Devanagari blocks, 64 with `lang="ne"`.

---

## 5 · A defect this phase introduced and caught

The Grade 9 question bank was written, the quiz page wired to it, and
**`build/context.js` was not updated**. The build succeeded. The page was
generated. All tests passed. The quiz rendered an **empty box**.

It was found by opening the page in a browser — nothing else would have. The
fix is one line; the lasting change is a test that fails if a bank file exists
and is not registered, or a quiz page exists without a bank. Mutation-tested by
un-registering the bank.

This is the case for browser verification over test counts, and it is why
§4 above lists what was operated rather than what exists.

---

## 6 · Line-ending noise, accounted for

`core.autocrlf=true` and no `.gitattributes`, so after any build `git status`
lists ~65 built files as modified while `git diff --numstat` totals **0 0**.
Every change figure in this report comes from `--numstat`, not from
`git status`. No `.gitattributes` cleanup was attempted — no verified blocker
required one.

---

## 7 · Limitations — unchanged and new

**Unchanged from Phase 9.5, for Grade 10 and Grade 9 alike:**

- **No Nepali teacher has reviewed any content.** Unit 1 adds 64 blocks to a
  review package with zero reviewed items.
- **No screen reader has been run.** No WCAG 2.1 AA claim.
- **The applicable examination edition is unestablished.**

**New, specific to this phase:**

- **The PDF pages were not read visually.** Two independent text extractions
  agree, but `pdftoppm` is unavailable here, so no rendered page was read.
- **Learning outcomes and practical activity texts are not transcribed** —
  folios 11–12 and 15–17.
- **Units 2–7 are planned, not written.** 4 of 36 topics are taught.
- **Unit 1's practical hours have no home on the page.** 10 of the unit's 18
  hours, and 30 of the subject's 50 internal marks, are practical work the
  product does not yet support.
- **The question bank equals the draw**, so a retake is the same 8 questions
  reordered, and has no hard questions.
- **The model/brand categories are a textbook convention, not curriculum
  text**, and are flagged for teacher confirmation.
