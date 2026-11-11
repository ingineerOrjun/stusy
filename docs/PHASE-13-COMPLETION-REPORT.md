# Phase 13 — Grade 9 Fundamentals of Computer and Application, Units 2–7

**The subject is finished: all seven units authored, 36 of 36 official topics
covered.** Nothing is committed, pushed, merged or deployed.

This report states what was built, what was measured, and what is still wrong.
Figures come from the build, the test suite, the generated review ledger and a
browser; where a number was not measured, it says so.

> **Two of its Nepali-review figures were later found to be wrong, and are
> corrected in [the Phase 13.1 report](PHASE-13-1-COMPLETION-REPORT.md) §5.**
> The Grade 9 ledger gain is **518**, not 519; and the five Grade 10 items were
> not re-attributed but deleted from the package, five of **sixteen** such
> losses, eleven of which predate Phase 13. The 2,603 item count was also a
> count of what the extractor had collected, which was 58% of the platform's
> Nepali. This report is left as the record of what Phase 13 claimed; the
> corrections live in Phase 13.1's.

---

## A · Repository state

| | |
|---|---|
| Branch | `phase-13-grade-9-units-2-7` |
| Commits ahead of `main` | **0** — nothing has been committed |
| Staged files | **0** — the index is empty |
| New files | **15** |
| Files with real line changes | **82** |
| Pushed / merged / deployed | **No, none of the three** |

### New files

| Path | What it is |
|---|---|
| `_source/content/lessons/cf-u2.html` … `cf-u7.html` | the six unit lessons |
| `_source/runtime/sim-cipher.js` | the shift-cipher bench for topic 7.7 |
| `tests/grade9-cf.test.js` | 12 guards specific to this subject |
| `grade9/computer-fundamentals/unit2.html` … `unit7.html` | the six built pages |
| `assets/js/sim-cipher.js` | the published runtime module |

### What the 82 modified files actually are

| Group | Files | Change |
|---|---:|---|
| Grade 10 built pages | 39 | **2 lines each, all nav** — see §G |
| Built Grade 9 pages, indexes, home page | 8 | status labels, unit counts, the diagram figure |
| Source content and config | 8 | `pages.js`, `coverage.js`, `site.js`, the question bank, `diagrams.js`, `sim-drill.js`, `cf-quiz.html`, `context.js` |
| Published assets | 8 | CSS × 5, `question-bank.js`, `sim-drill.js`, `learning-map.js` |
| Build and validation | 2 | `validate.js`, `context.js` |
| Tests | 3 | `status.test.js`, `focus.test.js`, `ux.test.js` |
| Documentation and review package | 10 | this report's siblings, the Nepali ledger |
| Protected tooling | 1 | `tools/grade9-spec.js` — **not mine, see below** |

About **25 further built files report as modified with an empty diff.** That is
the known CRLF artefact of `core.autocrlf=true` with no `.gitattributes`:
`git diff --numstat` shows 0 added and 0 removed. Every count in this report
comes from `--numstat`, not from `git status`.

### The protected change — `tools/grade9-spec.js`

**Status: present, uncommitted, unstaged, and untouched by Phase 13.**

| | |
|---|---|
| Diff against `HEAD` | **+17 / −2** |
| Staged | **No** |
| Committed | **No** |
| Pushed | **No** |
| Modified during Phase 13 | **No** — the content is byte-for-byte what it was at the start of the phase |

It normalises line endings before the `--check` comparison, so a fresh Windows
checkout no longer reports every line of `GRADE-9-CURRICULUM-SPECIFICATION.json`
as drift. `node tools/grade9-spec.js --check` passes:
*"GRADE-9-CURRICULUM-SPECIFICATION.json is current."*

It was kept out of all Phase 13 work and is reported here rather than folded
into any change set, as instructed. It remains a separate, uncommitted change
for the owner to handle.

---

## B · Curriculum coverage

**36 of 36 official topics, build-enforced.** `_source/content/coverage.js` maps
every official topic string to an anchor, and `validate.js` fails the build on a
topic with no entry, an entry naming an anchor that does not exist, or an entry
for a topic the syllabus has dropped. The failure message for the first is
*"a student would meet this topic for the first time in the exam."*

| Unit | Title | Theory | Practical | Marks | Topics | Covered |
|---:|---|---:|---:|---:|---:|---:|
| 1 | Introduction to computer | 8 | 10 | 6 | 4 | 4 |
| 2 | Computer Components | 10 | 10 | 7 | 5 | 5 |
| 3 | Computer software | 10 | 8 | **9** | 7 | 7 |
| 4 | Memory/Storage Unit | 10 | 6 | 8 | 5 | 5 |
| 5 | Internet and its Application | 10 | **12** | 8 | 3 | 3 |
| 6 | Multimedia | 8 | 8 | 6 | 3 | 3 |
| 7 | Emerging Technology | 8 | 10 | 6 | 9 | 9 |
| | | **64** | **64** | **50** | **36** | **36** |

Hours and marks are the CDC 2078 document's own, held by
`tests/curriculum.test.js`. Site-wide coverage is **186 of 186** — Grade 10's
150 and Grade 9's 36.

**What this claim does not include.** It says an explanation exists and is
traced for every topic. It does not say a worked example or a question exists
per topic: the subject has 14 worked examples across 36 topics, and the question
banks key questions to their own topic slugs rather than to official topic
strings, so no automated per-topic assessment audit exists for Grade 9.
`docs/GRADE-9-CURRICULUM-MAP.md` §2 now records this rather than implying the
figure is Grade 10's 150/150.

---

## C · Educational quality

Every unit has the same spine, and the build refuses a unit that does not:

| Unit | Sim | Prediction | Worked ex. | Mistake | Key points | Exam Qs | Practical | Diagram |
|---:|:--:|:--:|:--:|:--:|:--:|---:|---:|---|
| 1 | `cfclassify` | 1 | 2 | 1 | 1 | 4 | 6 | `cfIpoCycle`, `cfClassify` |
| 2 | `cfinput` | 1 | 2 | 1 | 1 | 4 | 5 | `hwSystemUnits` *(reused)* |
| 3 | `cfsoftware` | 1 | 2 | 1 | 1 | 4 | 4 | `cfSoftwareLayers` |
| 4 | `cfmemory` | 1 | 2 | 1 | 1 | 4 | 5 | `cfMemoryHierarchy` |
| 5 | `cfinternet` | 1 | 2 | 1 | 1 | 4 | 3 | `cfInternetChain` |
| 6 | `cfmultimedia` | 1 | 2 | 1 | 1 | 3 | 3 | — |
| 7 | `cfemerging` + cipher bench | 1 | 2 | 1 | 1 | 4 | 6 | — |
| | **8** | **7** | **14** | **7** | **7** | **27** | **32** | **5 + 1 reused** |

**The plan said four of seven units should be interactive; all seven are.** The
plan withheld interaction from Units 5 and 6 as "definitional", and that was
wrong: their marks are awarded for telling connection types and multimedia
components apart, which is a judgement. Both got six-case drills over the
existing `sim-drill.js` engine rather than simulations of the thing itself, so
the plan's real point — that interaction everywhere produces decoration — was
kept. Unit 6 still has no media player, as the plan rightly warned.

**Two components were changed rather than built as planned**, both recorded in
`GRADE-9-COMPUTER-APPLICATION-CONTENT-BLUEPRINT.md` §2: Unit 2's "parts lab"
became a decision drill, because reusing Grade 10's parts lab would have shown
Grade 9 students a motherboard diagram the curriculum does not ask for; and
Unit 4's "memory explorer" became a diagram plus a drill, because the explorer
and the diagram would have carried the same four facts.

**The cipher bench** (`sim-cipher.js`) exists because topic 7.7 is
cryptography, and the sentence a student memorises — *encryption converts
plaintext to ciphertext* — has no key in it. Moving the key changes the output;
setting it back returns the message. Verified by hand: `NEPAL` +4 → `RITEP`,
`XYZ` +3 → `ABC`, key 0 is the identity, spaces survive. The page says plainly
that this is a 2,000-year-old cipher a computer breaks instantly, so nothing
here teaches that shifting letters is security.

**Nine worked examples and two predictions were added after a first pass**, on
the finding that six units which read as complete gave the student nothing to do
but read. Each worked example is think-gated: the answer is not visible until
the student commits.

**Not claimed:** no teacher has reviewed any of this, and no student has used
it. There is no evidence about whether any of it teaches.

---

## D · Language quality

| | |
|---|---|
| New bilingual pairs | **519** |
| Review ledger | 2,090 → **2,603** items |
| Grade 9 subject total | 125 → **643** |
| Reviewed by a Nepali speaker | **0** |

Per unit: **84 · 94 · 94 · 77 · 72 · 98** for Units 2–7. Counted by regenerating
`tools/nepali-review.js`, not estimated.

**44 Nepali glosses were added to topic headings** after a check found only 63%
of unit-page headings carried one. The outline number sits outside both language
spans so it shows in every mode.

Verified in the browser on all seven pages, in all three language modes:
**0 Devanagari runs without `lang="ne"`**, and **0 stray text** in `en` or `ne`
mode — no English left visible in Nepali mode or the reverse.

### One honest gap

**Six of the cipher bench's Nepali strings are not in the review package.**
`tools/nepali-review.js` reads lesson files, question banks, `sim-drill.js` and
`strings.js`. Four runtime modules build bilingual markup inline instead, and
their strings are invisible to it:

| Module | Pairs | Added |
|---|---:|---|
| `sim-fault.js` | 8 | before Phase 9 |
| `sim-parts.js` | 4 | before Phase 9 |
| `home.js` | 3 | before Phase 9 |
| `sim-cipher.js` | 6 | **Phase 13** |

`practical.js` is not in that list because it routes every string through
`UIStrings` — the pattern the other four should follow. This is a pre-existing
limitation that Phase 13 widened by six pairs; it was found by checking the
cipher's strings against the regenerated ledger, not predicted. It is not fixed,
because both remedies reach into Grade 10 runtime modules or need an attribution
decision the owner should make. Recorded in `NEPALI-REVIEW-STATUS.md` §7.

---

## E · Assessment

**62 questions, up from 12.** Draw is 12, shuffled, so a retake is a different
paper.

| Unit | Marks | Questions | Per mark | easy/med/hard | Topics |
|---:|---:|---:|---:|---|---:|
| 1 | 6 | 12 | **2.00** above band | 5/5/2 | 9 |
| 2 | 7 | 8 | 1.14 below | 3/2/3 | 6 |
| 3 | 9 | 10 | 1.11 below | 2/5/3 | 7 |
| 4 | 8 | 9 | 1.13 below | 2/5/2 | 9 |
| 5 | 8 | 8 | **1.00** below | 2/5/1 | 5 |
| 6 | 6 | 7 | 1.17 below | 2/3/2 | 5 |
| 7 | 6 | 8 | 1.33 in band | 1/4/3 | 8 |
| **Total** | **50** | **62** | **1.24** in band | **17/29/16** | **49** |

62 unique ids, 62 distinct prompts, 0 duplicates.

**The subject-level 1.24 is partly an artefact and should not be read as a
pass.** It sits inside the 1.2–1.5 band only because Unit 1 is at 2.00; five of
the other six units are below 1.2, and Unit 5 is at exactly 1.00. Roughly six
more questions would bring Units 2–6 into band. They were not added, because
padding a bank to hit a ratio is how the Grade 10 banks acquired their weakest
questions — the band is a floor to aim at with questions worth asking, and the
honest record is that five units are under it. Unit 5 also has the fewest hard
questions in the subject (1).

Recorded in `GRADE-9-COMPUTER-APPLICATION-ASSESSMENT-BLUEPRINT.md`.

---

## F · Performance and accessibility

### Weight

| Page | KB | | Page | KB |
|---|---:|---|---|---:|
| cf unit1 | 76.2 | | cf unit5 | 54.9 |
| cf unit2 | 58.2 | | cf unit6 | 46.0 |
| cf unit3 | 64.6 | | cf unit7 | 71.5 |
| cf unit4 | 57.8 | | *grade10 oop unit1* | *89.3* |

Every new page is lighter than the heaviest existing page. No new fonts, no new
dependencies, no network calls; the CSP remains `default-src 'none'`.

**One pre-existing cost got worse: `assets/js/question-bank.js` is now 425 KB**
(it grew by 1,823 lines this phase) and **every quiz page downloads all five
subjects' banks** to ask about one. Splitting it per subject would cut a Grade 9
student's quiz download by roughly four fifths. Not done in Phase 13 — it
changes how four Grade 10 quiz pages load — but it is the single largest
performance item in the product.

### Accessibility — measured

Checked on all seven pages: **one `<h1>` each, 0 heading-level jumps, 0 unnamed
controls, 0 console errors.** The cipher output is `role="status"` with
`aria-live="polite"`, because it changes without focus moving.

**Touch targets were a real defect and are fixed.** At 320px the cipher text
input measured 37px and the key slider **16px**, against a 44px floor. `.pr-opt`,
`.cip-in` and `.cip-key` were added to the `@media (pointer: coarse)` rule;
re-measured at **44 / 44 / 44**.

**WCAG 2.1 AA is not claimed.** No screen-reader session was run, and no
assistive-technology user has tested any of this. What is claimed is the list
above, each item measured in a browser.

---

## G · Grade 10 regression

**No Grade 10 content changed.**

| Check | Result |
|---|---|
| Grade 10 lesson sources changed | **0** |
| Grade 10 question banks changed | **0** — all four byte-identical to `HEAD` |
| Grade 10 topic coverage | **150 / 150** |
| Grade 10 index unit counts | **6 · 6 · 7 · 5** — correct per subject |
| Grade 10 quizzes, in a browser | OOP drew 12, scored *2 / 12*; DBMS drew 12, scored *0 / 12* |
| Console errors | **0** |

**The 39 Grade 10 pages that changed, changed by exactly 78 lines between
them**, and every one of those lines is the shared navigation: the Grade 9
entry now reads *"· notes ready"* and *"✓"* instead of *"· 1 of 7 units"* and
*"· 1/7"*. Classified mechanically — 78 added, 78 removed, 100% matching the
`desknav` or `mobilePanel` line. That is the derived status model working, and
it is the only reason a Grade 10 file is in the change set at all.

**One Grade 10-looking change that is not one.** The Nepali review ledger shows
five Grade 10 rows each losing one item. Item ids are a hash of the Nepali text
and the generator deduplicates on `id + kind` with no subject in the key, so
Grade 9's new options — `१०००`, `८`, `४`, `१६`, and
`दुवै एउटै कुराका दुई नाम हुन्` — now carry those pairs under Grade 9. The Grade 10
pages still contain the options; a reviewer still sees every distinct Nepali
string exactly once. Only per-subject counts moved.

---

## H · Tests

| | |
|---|---|
| Tests | **484** |
| Passing | **484** |
| Failing | **0** |
| Deterministic | yes — repeated runs give the same result |

New this phase: `tests/grade9-cf.test.js` (12 guards), plus one added to
`status.test.js` and amendments to `focus.test.js` and `ux.test.js`.

**No existing test was weakened.** One test was *strengthened*: the
difficulty-claim guard in `focus.test.js` only inspected strings containing the
word "mark", so rewording a lead to *"The hardest units…"* slipped past it. It
now checks every string `renderFocus()` can produce.

**Guards were confirmed by mutation, not assumed.** Each new guard was run
against a deliberately wrong value first. The clearest case is in §I below.

---

## I · Remaining issues

Ordered by what they cost a student.

**1 · Nobody has reviewed the Nepali.** 2,603 items, all `pending-review`. 519
are new and unread. This is the largest open risk in the subject and no amount
of testing addresses it.

**2 · Five of seven units are below the question-to-mark band.** ~6 questions
short in total; Unit 5 is thinnest at 1.00 with a single hard question. §E.

**3 · `question-bank.js` is 425 KB and served whole to every quiz page.** §F.

**4 · Six cipher Nepali pairs sit outside the review package**, with 15 older
ones from three Grade 10 runtime modules. §D.

**5 · Per-topic assessment and worked-example classification does not exist for
Grade 9.** The `assessment-missing` category the curriculum map has promised
since Phase 11 is still not built, because question banks key to their own topic
slugs rather than official topic strings. §B.

**6 · The revision page does not know the practical log exists.** 32 activities
are tracked per unit and nothing aggregates them.

**7 · No field-report template for activity 3.4**, named in the practical
mapping as the strongest single addition available to this subject.

**8 · The practical log is per-device and cannot be exported.** A student who
changes device loses their ticks.

**9 · Unit 5 shows 3 activities against 12 practical hours** — the most hours in
the subject, the fewest activities. It follows the curriculum, but a student may
read it as a lighter unit.

### One defect found and fixed in this phase, worth naming

Grade 9 Unit 2 reuses Hardware's `hwSystemUnits` diagram — **the first diagram
used by two subjects.** The home page's roll-up added per-subject diagram counts
together, so it began claiming **76 distinct diagrams against a registry of 75.**

Every other figure in that roll-up belongs to exactly one subject, so summing
was correct for all of them and wrong only for this one. Fixed in
`build/context.js` by taking a union.

**The existing test did not catch it, and the reason matters:** it compared the
home page against the same context object that produced the page, so both sides
carried the same wrong number. The new guard compares against the lesson files
and the registry instead, asserts that a cross-subject overlap actually exists
so it cannot pass vacuously, and was confirmed to fail at **76 against 75** when
the summing behaviour was restored.

The home page now reads *"across 31 units: 75 diagrams, 15 of them animated"*,
matching the validator, verified in a browser in both languages and in the
animated stat strip.

---

## J · Patterns worth reusing for the remaining Grade 9 subjects

Three subjects remain: *Programming Principles & Concept in C Language*,
*Fundamentals of Electro-System*, and *Website Design* — 132 topics.

1. **Author the coverage map at the same time as the lessons, not after.** The
   build refuses a missing topic with a message about the exam, which turns
   curriculum fidelity into a build error instead of a review task.
2. **Reuse `sim-drill.js` before inventing a component.** Five of this subject's
   seven interactive pieces are six-case drills on the existing engine. Only the
   cipher needed new code, and only because the concept has a *key*.
3. **Distrust "this unit is definitional."** It was the stated reason for
   planning no interaction in Units 5 and 6, and in both the marks were awarded
   for telling things apart — which is exactly what a drill tests.
4. **Route runtime strings through `UIStrings`**, as `practical.js` does and the
   four `bi()` modules do not. Anything else leaves Nepali outside the review
   package.
5. **A diagram must show an ordering or a flow.** Three of the eight planned
   diagrams were dropped because a table already carried the same facts; nothing
   was lost.
6. **Check a claim against reality, not against the thing that generated it.**
   The 76-diagram defect survived 483 tests because the test and the page shared
   a source.
7. **Count the practical activities from the curriculum's hours, not evenly.**
   Unit 5's 3 activities against 12 hours looks wrong and is right.

---

## K · Verdict

### READY FOR REVIEW

Not because the build passes. The build passing is the floor, and the brief was
explicit that it is not the test.

**The educational content is actually complete**: seven units, 36 of 36 official
topics traced to explanations the build will not let go missing, 32 practical
activities, 62 questions, and an interactive component plus two gated worked
examples in every unit. **Curriculum coverage was verified independently of the
build** — topic by topic against the specification grid, and the per-unit totals
(4·5·7·5·3·3·9 = 36) reconciled against the CDC document's own marks and hours.

**Grade 10 is untouched** in every sense that matters: zero lesson changes, zero
question-bank changes, 150/150 coverage, working quizzes, and 78 changed lines
that are all one shared nav label.

What stands between this and *ready to ship* is **review, not construction**:

- no Nepali speaker has read 2,603 pairs, 519 of them new
- no teacher has judged whether any of it teaches
- no student has used it
- five units are below the assessment band by about six questions
- six of my own Nepali strings are not yet in the package a reviewer would get

None of those is a defect in what a student would see today, and all are
recorded in the documents that own them rather than in this report alone. The
one real defect found in this phase — the 76-diagram claim — is fixed, pinned by
a mutation-verified guard, and verified in a browser.

**Not authorized and not done: commit, push, merge, deploy.** The branch holds
15 new files and 82 modified ones, with `tools/grade9-spec.js` preserved
separately and still uncommitted.
