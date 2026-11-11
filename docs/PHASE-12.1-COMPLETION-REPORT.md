# Phase 12.1 — completion report

**Grade 9 · Fundamentals of Computer and Application.** Educational
completeness, practical learning, and final verification.

**433 tests passing, 0 failing. Production build passes with 1 accurate
warning. Grade 10 coverage unchanged at 150/150 with all 39 URLs intact.
Nothing merged, nothing pushed, nothing deployed.**

Four distinctions this report keeps apart throughout, because collapsing them
is how a status report becomes a lie:

| | |
|---|---|
| **Curriculum verified** | Read from the CDC PDF by two independent extractors and by eye from rendered pages |
| **Content authored** | Written into the product and gated by the build |
| **Practical implemented** | The activities are on the page with a log the student keeps |
| **Automated tests passed** | 433, each new guard mutation-tested |
| **Human validation** | **None. No teacher and no student has seen any of this.** |

---

## 1 · Visual verification of the curriculum PDF

The Phase 12 report's open limitation was: *"The PDF pages were not read
visually. Two independent text extractions agree, but `pdftoppm` is
unavailable here, so no rendered page was read."*

**That limitation is closed.** Folios 13, 15, 16 and 17 of `cdc-2078.pdf`
(PDF pages 18, 20, 21 and 22 of 321) were rendered to canvas with **PDF.js
3.11.174** and read as images.

| Tried | Result |
|---|---|
| `pdftoppm`, `pdftocairo`, `mutool`, `gs`, `magick` | Not installed. `convert` on PATH is Windows' own filesystem tool |
| Chrome `--headless=new --screenshot` on the PDF | Produced the blank viewer shell, not the page |
| Browser pane on a `file://` PDF | Rendered, but clicks could not reach the embedded viewer frame |
| **PDF.js to canvas, served over the dev server** | **Worked.** Pages rendered and screenshotted |

The page images are not committed — they are a 1 MB government PDF's pages,
and the repository holds the URL. What they established:

| Read visually | Confirms |
|---|---|
| Folio 13 | Unit 1's scope: 1.4 names five **bases** and enumerates **no categories** under any of them |
| Folio 15 | *"the tasks presented here are the samples only"*, and the practical table's header |
| Folio 16 | Unit 1 activities 1.4–1.6, Unit 2's five, Unit 3's four, and the 10 / 10 / 8 hour column |
| Folio 17 | Units 4–7's activities and the 6 / 12 / 8 / 10 hour column |

Every figure matched both text extractions. **No discrepancy was found between
the rendered pages and what Phase 12 recorded.**

---

## 2 · The 36-topic correction, verified rather than replaced

The brief warned against blindly replacing every occurrence of 169. Every
occurrence was examined and classified:

| Where | Figure | Verdict |
|---|---|---|
| `tests/content.test.js` | 318 total, with 37→36 and 169→168 recorded beside it | Correct, and it is the guard |
| `GRADE-9-COMPUTER-APPLICATION-CURRICULUM-VERIFICATION.md` | quotes 37 and 169 as the **old** values | Correct — history, left alone |
| `GRADE-9-CURRICULUM-MAP.md` | quotes both as corrected | Correct, left alone |
| `GRADE-9-IMPLEMENTATION-ROADMAP.md` | 37 in the live topics column | **Stale — corrected to 36** |
| `PROJECT_REPORT.md` | 37 for this subject, total 284 | **Stale — corrected to 36 and 283** |
| `docs/README.md` | "169 topics — and 0 of them taught" | **Stale twice — now 168, of which 4 are taught** |
| 14 other hits of "37" | Grade 10 Hardware, which genuinely has 37 topics | Correct, left alone |

Counts re-derived from `syllabus.js` rather than trusted: Grade 9 **168**, all
subjects **318**, this subject **36**.

### The generated specification was lying, and now cannot

`docs/GRADE-9-CURRICULUM-SPECIFICATION.json` emitted
`status: 'not-implemented'` for all 168 topics as a **literal**. Phase 12
taught four of them and the file went on reporting an untouched curriculum —
for a whole phase, in a document whose own first line calls it
machine-readable.

Status is now **derived** from the same data the build gates: a unit's page in
`pages.js`, the topic's entry in `coverage.js`, questions in the registered
bank, and `data-practical` ids in the authored lesson. It now reports
**1 of 28 units authored, 4 topics fully-taught, 164 not-implemented**.

Mutation-tested — strip the practical ids and the four become
`practical-missing`; un-register the bank and they become
`assessment-missing`. Two new tests fail if the committed JSON drifts or if a
status is hard-coded back to a literal.

---

## 3 · Practical learning — the priority of this phase

Half of this subject is practical, and **30 of its 50 internal marks** are for
work a website cannot do. Before this phase the product had no idea any of it
existed.

### All seven units mapped

[`GRADE-9-COMPUTER-APPLICATION-PRACTICAL-MAPPING.md`](GRADE-9-COMPUTER-APPLICATION-PRACTICAL-MAPPING.md)
records all **32 activities** across the seven units, each with the level of
help the product can honestly give. Two findings from counting them:

- **21 of the 32 are presentations.** The practical half of this subject is
  mostly about explaining theory to an audience, not operating a machine.
- **Exactly one activity is a computer task** — 7.2, storing a file in cloud
  storage with a teacher. A product that answered this list with simulators
  would be building the wrong thing.

**No activity in this subject can be completed inside Gyansetu. Not one.** The
mapping says so in those words.

### Unit 1 built

| Built | What it is |
|---|---|
| Six activity briefs | The curriculum's own six, with what you need, what it builds on, what to hand in, and what separates good work from work that merely exists |
| A record-keeping block | The 3 marks most often thrown away, what a record contains, and the two procedural facts the curriculum states: the practical exam is before internal **and external** supervisors and assesses skill as well as product; a group project still needs each member's own reflection |
| Two independent exercises | Clearly marked as **not** from the curriculum |
| A practical log | Three states per activity — *not done yet / I have done this / done and written up* — persisted on the student's device, with a per-unit tally |

**`done` and `recorded` are separate because the curriculum's mark
distribution separates them** (15 and 3 for practical work, 10 and 2 for
project work). Five marks hang on the write-up, and a tick list that merged
them would teach a student that finishing the chart is the end of the job.

**Nothing claims an assessment the product cannot make.** Every label names
what the *student* did. A test fails if any `prac*` string ever contains
"verified", "approved", "submitted", "marked", "graded", "certified" or
"awarded".

### Two things the curriculum says that the page now says too

- The activities are **samples**: *"A teacher can assign the extra practical
  and project works as per the students' need or specific context."* The page
  said "requires" before this phase. **The 10 hours are not a sample.**
- Activity 1.6 writes *mode* where the topic list writes *model* — the same
  basis, spelled two ways in one document. The page says so and says which to
  use.

---

## 4 · Unit 1 educational review

### The model/brand labelling, corrected further than asked

The brief asked for model and brand to be labelled as supplementary rather
than official. Re-reading folio 13 showed the Phase 12 statement was true but
incomplete in a way that mattered: **the curriculum enumerates no categories
under *any* of the five bases** — not size, not data handling, not purpose
either. Its whole text is *"on the basis of size, on the data handling, on the
purpose and on the model, on the brand"*.

The page was presenting five lists in one voice when the curriculum supplies
none of them. It now carries a note saying exactly that, singling out model
and brand as the two where textbooks genuinely disagree and where
*IBM PC / IBM compatible / Apple* is a dated convention, and telling the
student to follow their own textbook and teacher where those differ.

### The question bank's real gap

| | At Phase 12 | Now |
|---|---|---|
| Questions | 8 | **12** |
| Difficulty | 4 easy · 4 medium · **0 hard** | 5 easy · 5 medium · **2 hard** |
| Draw | 8 of 8 — a retake was the same paper | **8 of 12** |
| Retakes measured | — | **12 draws, 12 distinct papers, all 12 questions reachable** |

The gap that mattered was not in that table. **Official topic 1.3, *Modern
Applications of computer*, had no question at all** — found by listing the
official topics against the bank's `topic` fields, not by counting the bank.
It is the same shape as the Grade 10 OOP mistake the assessment blueprint
exists to prevent, in a bank of eight.

---

## 5 · A defect found by finishing the quiz

**Three of the five quiz pages showed a student nothing at the end.**

`showScore()` writes the score, the English message, the Nepali message, and
only then makes the box visible. `cf-quiz`, `db-quiz` and `hw-quiz` shipped a
score box with no `#scoreMsgNp`, so the write threw and the box was never
shown. Grade 9 Fundamentals, **DBMS and Hardware** — the last two live on the
deployed site. Digital Design and OOP were complete and worked.

It was found by **answering every question on each of the four pages**, which
no test and no author had ever done. Phase 12's own report says the Grade 9
quiz "draws 8 of 8, marks right/wrong, shows explanations" — all true, all
verified, and the quiz still went silent on the last click.

Four changes, each mutation-tested:

| Change | Why |
|---|---|
| `#scoreMsgNp` and a retake button added to the three sections | The defect |
| `showScore` writes through a guarded helper, and reveals the box after | The next omission should cost a line of Nepali, not the whole result |
| `validate.js` refuses a quiz section with an incomplete score box | So it cannot recur. The rule also fails if it finds no quiz section to check |
| Three tests in `assessment.test.js` | Including one asserting the **order** of the statements, because the order is the behaviour |

### And one piece of advice no student could follow

The shared engine told anyone scoring 40–60% to *"Re-read Units 3, 5 and 6"*
and anyone below 40% to *"use the Trace section slowly"*. True of OOP. A Grade
9 student reading the same line was sent to three units that do not exist in
their subject and a section that exists only in C++. Both messages now name
nothing, and a test fails if an end-of-quiz message names a unit number or the
Trace section.

### One more, left for its own session

The quiz engine escapes all question text, and **72 strings across the OOP and
Hardware banks contain HTML markup**, so a C++ question renders as
`What is printed?<br><code>int i = 5;` on screen. Confirmed visually. It is
pre-existing, dates from commit `dce9644`, and is live. It is **not fixed
here**: the right fix is a judgement between stripping the markup and
whitelisting a small subset for code questions, and it belongs to Grade 10
content rather than to this phase. A task has been raised with the evidence
and both options.

---

## 6 · The 408 vs 409 test count, resolved

Not a discrepancy in the repository. **The figure 408 appears nowhere in it.**

Measured, by checking out each commit and running the suite:

| Tree | Tests |
|---|---:|
| `648cd48` Phase 11 base | **406** |
| `d476a57` Phase 12 | **409** |
| Now | **433** |

The Phase 12 report's claim of 409 is correct against the commit it describes.
The suite is deterministic — three consecutive runs give the same count — and
statically countable: 433 lines beginning `test(` for 433 tests, with no
conditional or data-driven declarations. The count cannot vary with build
state.

A run taken mid-phase, after two of Phase 12's three new tests had been
written, would have read 408. That is the only reading consistent with the
measurements.

---

## 7 · Regression

| | Phase 12 | Now |
|---|---:|---:|
| Tests passing | 409 | **433** |
| Tests failing | 0 | **0** |
| Production build | passes, 1 warning | passes, same warning |
| Grade 10 coverage | 150 / 150 | **150 / 150** |
| Grade 10 URLs | 39 | **39** |
| Grade 9 topics taught | 4 | 4 |
| Grade 9 question bank | 8 | **12** |

Coverage was re-derived independently of `validate.js`: oop-cpp 35/35,
hardware 37/37, dbms 39/39, digital-design 39/39, **0 dangling anchors**.

### Every Grade 10 file this phase touched, and why

Measured with `git diff --numstat`, not `git status` — this repository has
`core.autocrlf=true` and no `.gitattributes`, so after any build `git status`
lists ~65 built files as modified while `--numstat` totals `0 0`. No
`.gitattributes` change was made; no verified blocker required one.

| File | Lines | Why |
|---|---:|---|
| `sections/db-quiz.html` | +4 | The missing score box parts |
| `sections/hw-quiz.html` | +4 | The same |
| `runtime/quiz.js` | +47 −7 | Shared engine: guarded writes, retake scroll, subject-neutral messages |
| `runtime/services/progress.js` | +59 −1 | Shared service: the `practical` bucket |
| `design/learning-ux.css` | +6 −1 | `.pr-opt` added to the touch-target floor |

**No Grade 10 lesson, diagram, question bank or coverage entry was modified.**

### Browser verification — what was operated, not what exists

| Checked | Result |
|---|---|
| Unit 1 page | 1 `h1`, 0 heading jumps, 6 anchors present, 2 figures, 3 callouts, drill, prediction, 2 think-gates, 4 exam questions, 3 practical blocks, 6 logs, 0 empty bilingual pairs |
| Practical log | Ticked, re-ticked and un-ticked; tally followed; survived a reload; un-ticking left no stored row |
| All three language modes | Driven through the real switcher: 0 unnamed controls, 0 stray Devanagari in English, 0 stray English in Nepali; labels, tally and legend all switch; `lang="ne"` stamped |
| Grade 9 quiz | Answered to the end: score shown, both languages, retake drew a different paper, 0 console errors on a fresh tab |
| DBMS, Hardware, OOP quizzes | Answered to the end: all now show the score |
| Responsive | 320 and 768: 0 overflow, no horizontal scroll. `.pr-opt` measured **31px** before the fix and **44px** after, on an emulated touch device |
| Revision page | Loads, 0 errors, practical ticks survived the schema addition |
| Grade 10 lesson pages | oop-cpp u1 and hardware u5: 1 `h1`, simulations intact, 0 practical blocks |

### A test that was counting the wrong repository

Mid-phase, `links.test.js` failed with *"expected 48 student pages, found
95"*. A git worktree had appeared under `.claude/worktrees` — a second
checkout of this repository, whose built pages the walker counted as this
one's. `a11y.test.js` already excluded `.claude`; `links.test.js` and
`ux.test.js` did not, and now do.

---

## 8 · Documentation

| File | Change |
|---|---|
| `GRADE-9-COMPUTER-APPLICATION-PRACTICAL-MAPPING.md` | **New.** All 32 activities, seven units, four levels of help |
| `PHASE-12.1-COMPLETION-REPORT.md` | **New.** This file |
| `GRADE-9-COMPUTER-APPLICATION-ASSESSMENT-BLUEPRINT.md` | Bank figures re-measured; §4 rewritten from "not built" to what is built |
| `GRADE-9-COMPUTER-APPLICATION-CONTENT-BLUEPRINT.md` | The practical texts are no longer untranscribed |
| `PHASE-12-UNIT-1-IMPLEMENTATION-REPORT.md` | The model/brand statement corrected, as a dated note rather than a silent edit |
| `NEPALI-REVIEW-STATUS.md` | Totals re-measured: the ledger said 1,956 and the real figures are 2,046 at Phase 12 and **2,090** now. Grade 9 had no row at all |
| `GRADE-9-IMPLEMENTATION-ROADMAP.md`, `PROJECT_REPORT.md`, `docs/README.md` | The stale topic counts in §2 |
| `GRADE-10-REGRESSION-BASELINE.md` | The Nepali figure |

Corrections are dated notes, not silent edits, so a reader can tell what was
believed when. Nothing was duplicated: the practical mapping is the single
place the activity lists live, and the other documents link to it.

---

## 9 · Guards added this phase

Every one was confirmed to fail against a deliberately broken version.

| Guard | Catches | Mutation |
|---|---|---|
| Quiz score box is complete (build + test) | A student answering every question and seeing nothing | Removed `#scoreMsgNp`; removed the retake button |
| `showScore` guards its writes and reveals in order | A missing element blanking the whole result | Restored the unguarded write |
| End-of-quiz advice names no unit or section | Subject-specific advice in a five-subject engine | Reintroduced "Re-read Units 3 and 5" |
| `done` and `recorded` stay distinct | The record-keeping marks becoming invisible | Collapsed `recorded` into `done` |
| Un-ticking stores no row | A record about work nobody did | Stored `{state:'todo'}` instead of deleting |
| The practical bucket did not discard existing progress | A student losing finished units to a schema bump | Bumped `SCHEMA_VERSION` |
| No practical label claims an assessment | "Verified", "approved", "submitted" reaching a child | — (a word list) |
| The generated specification is current | A machine-readable document reporting a curriculum nobody is teaching | Hand-edited the JSON |
| The specification is derived, not declared | A status hard-coded back to a literal | Stripped the practical ids; un-registered the bank |
| The Nepali ledger states the real count | Understating how much review is outstanding, in the document whose job is to say so | Stale items column; stale pending column |

---

## 10 · What this phase did not do

- **Units 2–7 are not authored.** 4 of this subject's 36 topics are taught.
- **No other subject was started.**
- **Nothing was merged, pushed or deployed.** The branch is
  `phase-12-grade-9-computer-application`, ahead of `main`, uncommitted.
- **No `.gitattributes` change.** No verified blocker required one.
- The literal-HTML defect in the Grade 10 quiz banks is **reported, not
  fixed** — see §5.

## 11 · Limitations

**Unchanged, and the largest ones:**

- **No Nepali teacher has reviewed any content.** 0 of 2,090 items. 44 of
  them are new in this phase, and 35 of those are the first Nepali on the site
  about marks and school procedure rather than about computers.
- **No student has used any of it.** The practical log in particular has never
  been used by the person it is for.
- **No screen reader has been run.** Structure was measured — one `h1`, zero
  heading jumps, every control named, every Nepali block marked, a named radio
  group per activity, a live region on the tally. **No WCAG 2.1 AA claim is
  made.**
- **The applicable examination edition is unestablished**, as for Grade 10.

**New, specific to what was built here:**

- **The practical log is per device.** Clear the browser data or change
  computer and a term of ticks is gone. There is no export.
- **The revision page does not know the log exists.** A student's practical
  progress appears on the unit page and nowhere else.
- **Learning outcomes (folios 11–12) are still untranscribed.**
- **Nobody has checked the activity briefs against a real classroom.** What a
  teacher actually accepts as a record, and whether "demonstrate" means to the
  class or to the teacher, are questions this report cannot answer and the
  page does not pretend to.
