# Phase 12.4 — educational focus validation and final pre-push audit

Resolves the educational-design ambiguity left by Phase 12.3, and audits the
complete Phase 12 state independently of the Phase 12.3 report.

**471 tests passing, 0 failing. Production build passes. Grade 10 unchanged at
150/150 and 39 URLs. No question bank, answer key or escaping behaviour
touched. Nothing merged, pushed or deployed.**

---

## A · The educational recommendation model

Phase 12.3 replaced generic advice with units derived from examination marks
and presented them as revision advice. That merged two different questions.

| | **Examination priority** | **Teacher-directed revision** |
|---|---|---|
| Answers | which units carry the most marks | which units students struggle with |
| Source | **derived** — `context.js → examFocus` from `pages.js` | **authored** — `content/revision-focus.js` |
| Nature | a fact about the paper | a judgement |
| Can name a light unit? | never | yes, and usually will |
| Today | all five subjects | **none** |

They disagree on purpose. OOP Unit 3 carries **2 of that subject's 50 external
marks** — its lightest unit — and is where beginners stall. Examination weight
will never name it; a teacher might.

### Whether to reinstate "Units 3, 5 and 6"

The brief said to preserve it **only if its original rationale is documented
or supplied by the owner**. It is neither:

```
git log -S"Re-read Units 3, 5 and 6" -- _source/runtime/quiz.js
  d715698  2026-09-05  Fix styling and update text
```

The string entered the repository in the legacy single-file prototype, in a
commit with that title, with **no design note, no commit body and no teacher
named**. A search of `docs/` and `_source/` finds no rationale other than my
own later write-ups describing the defect.

**So it is not reinstated.** `content/revision-focus.js` ships empty, with a
header explaining exactly that, and the quiz falls back to examination
priority — clearly labelled as examination priority, which is the neutral
fallback the brief asks for. Adding a real entry is a content change, not a
code change.

### Where the data lives, and how the engine consumes it

```js
QuizService.registerFocus(subjectId, { exam: [...], teacher: [...], source });
QuizService.focusKind(subjectId)        // 'teacher' | 'exam' | null
QuizService.getFocus(subjectId, kind)   // [] for an unknown kind — no fallback
```

Registered in the generated `question-bank.js` beside the bank. **No
subject-specific unit number appears anywhere in the shared engine**, and a
test fails if one does.

The band message now says how the attempt went and names nothing. Units appear
on their own line, `#scoreFocus`, behind a chip naming the kind:

> **EXAMINATION PRIORITY** · Most marks in the written exam are in: Unit 1
> Basic Introduction to Data Structure, Unit 2 Concept of OOP using C++ and
> Unit 5 Inheritance. *That is where the marks are, not where the subject is
> hardest.*

> **TEACHER'S REVISION LIST** · Your teacher suggests revising: Unit 3 Class
> and Object.

One line, not two — a teacher's list when the subject has one, marks
otherwise. The examination wording never calls a unit hard or easy and carries
that caveat; the teacher wording carries no marks at all.

| Subject | Kind offered | Units |
|---|---|---|
| grade9/computer-fundamentals | exam | 1 · 6 marks |
| grade10/oop-cpp | exam | 1 · 15, 2 · 14, 5 · 7 |
| grade10/hardware | exam | 3 · 9, 4 · 10, 5 · 11 |
| grade10/dbms | exam | 2 · 10, 3 · 6, 4 · 14 |
| grade10/digital-design | exam | 1 · 7, 2 · 15, 5 · 15 |

**The teacher channel was exercised, not just written.** A probe entry naming
OOP Unit 3 — a unit examination priority can never produce — was registered,
built and driven in a browser: the chip changed to *Teacher's revision list*,
the marks caveat disappeared, both languages rendered, and the other four
subjects stayed on examination priority. The probe was then removed and the
file verified empty (`{}`), so this is not a claim from reading code.

### A defect this introduced and caught

`#scoreFocus` ships empty beside `#scoreMsgNp`, so `build/bilingual.js` swept
it into a `<div class="t-en">` wrapper. **In Nepali-only mode the entire
recommendation vanished** — the English half hidden because it was English,
the Nepali half hidden because its wrapper was. Found by switching the
finished quiz to Nepali, not by any test. `score-focus` is now in
`NEVER_WRAP_CLASS`, whose own comment had anticipated exactly this case, and a
test asserts on all five built pages that the line is not inside a `t-en`.

---

## B · The status model, audited independently

Read from the implementation, not the Phase 12.3 report.

| Check | Result |
|---|---|
| `officialUnits` from the syllabus | **Yes** — `(syllabus[key] \|\| []).length` |
| `authoredUnits` from authored pages | **Yes** — `pages[key].pages.filter(p => typeof p.hrs === 'number')` |
| outline / partial / complete derived correctly | **Yes**, all eight subjects re-derived from source and compared |
| Production code still reading `done` | **One**, deliberate: `declaredDone: !!s.done` in `context.js`, consumed only by the `validate.js` drift check. `index.js:787` is the CSS class `done`, not the flag |
| A second status calculation elsewhere | **None.** All 8 uses in `index.js` and 5 in `validate.js` read `ctx.subjectStatus` |
| Validation fails on disagreement | **Yes**, both directions — proven by mutation |
| A partial subject counted as complete | **Impossible** — asserted, and the home page's figures come from `contentStats.complete` |
| Zero-authored subject | `grade9/c-programming` — 0/7, outline |
| Partially authored | `grade9/computer-fundamentals` — 1/7, partial |
| Fully authored | all four Grade 10 subjects |

**One duplication found, and held level rather than merged.** The predicate
`typeof p.hrs === 'number'` — "what counts as a unit page" — is written in
four places: the status model, the examination focus, the teacher-focus join,
and the coverage rule in `validate.js`. They agree today. A new test asserts
that the coverage rule and the status model count the same number of unit
pages for every subject, so a drift between them fails rather than letting a
subject be "complete" to the home page and partly covered to the build.

---

## C · Curriculum and homepage figures, independently verified

Re-derived from `syllabus.js`, `specification-grid.js` and `pages.js` — not
read from any report.

| | Expected | Measured |
|---|---:|---:|
| Grade 10 subjects | 4 | **4** |
| Grade 10 authored units | 24 | **24** |
| Grade 9 subjects | 4 | **4** |
| Grade 9 authored units | 1 | **1** |
| Grade 9 official units | 28 | **28** |
| Grade 9 official topics | 168 | **168** |
| Grade 10 official topics | 150 | **150** |
| Combined official topics | 318 | **318** |
| Computer and Application topics | 36 | **36** |
| Computer and Application units | 7 | **7** |
| Theory / practical hours | 64 / 64 | **64 / 64** |
| Working hours | 128 | **128** |
| External / internal marks | 50 / 50 | **50 / 50** |

**No discrepancy was found between the brief's expected figures and the
repository's source data.**

Assessment integrity: the internal 50 breakdown matches CDC page 24 row by row
(5 + 15 + 3 + 10 + 2 + 5 + 10); the **32** practical activities remain mapped
across seven units with no duplicates; Unit 1 carries its six; `done` and
`recorded` remain separate states in `ProgressService`; and the invented
external-supervisor attestation clause is still absent — "attest" appears
nowhere in the 321-page PDF or in any Grade 9 content.

### Pages, verified in a browser in all three language modes

| Page | Result |
|---|---|
| Home | "4 subjects … across 24 units: 70 diagrams, 15 animated, 39 operable, 82 questions" in English and Nepali; the partial subject named separately in both; 0 stray text in any mode |
| Home grade chips | Grade 9 → `part` on Computer Fundamentals only; Grade 10 → all four `on` |
| Grade 9 index | 1 × "1 of 7 units written" / "7 मध्ये 1 युनिट लेखिएको", 3 × "syllabus outline" / "सिलेबस रूपरेखा"; all 7 units |
| Grade 10 index | all "notes ready" / "नोट्स तयार"; **6, 6, 7, 5** units |
| Desktop dropdown | "· 1 of 7 units" for the partial subject; Grade 10 keeps "· notes ready" |
| Mobile panel | "· 1/7"; Grade 10 keeps ✓ |

Every figure on those pages is derived from `subjectStatus` and
`contentStats`; none is typed into a template.

---

## D · Grade 10 regression

| | Result |
|---|---|
| Coverage, derived independently of `validate.js` | oop-cpp 35/35, hardware 37/37, dbms 39/39, digital-design 39/39 — **150/150**, 0 dangling anchors |
| URLs | **39** |
| Unit counts | **6, 7, 6, 5** — stated correctly on the grade index |
| Lesson bodies changed | **1 of 24** — `cf-u1.html`, which is Grade 9's. All 23 Grade 10 lesson bodies byte-identical once line endings are normalised |
| Lessons render | oop-cpp u2 and dbms u4 opened: 1 `h1`, simulations present, 0 console errors |
| All five quizzes | Answered to the end: score shown, recommendation line labelled, retake redraws, 0 console errors |
| Language modes | English, Nepali and bilingual verified on home, both indexes and the quizzes |
| Question banks | **0 changed lines** in all four, measured against both `d476a57` and the Phase 11 base |
| Answer keys | unchanged (no lines removed from the generated bundle) |
| HTML escaping | `esc()` and `bilingual()` in `runtime/quiz.js` unchanged since the Phase 11 base |

### What changed in Grade 10's generated pages, and why

All 39 differ in exactly one respect: the shared navigation now shows
`Computer Fundamentals · 1 of 7 units` in the Grade 9 dropdown and `· 1/7` in
the mobile panel. **Grade 10's own entries are untouched** — still
`· notes ready` and `✓`. Diffed line by line on `grade10/oop-cpp/unit3.html`.

### OOP-specific guidance

Honestly reported rather than claimed: **OOP's old advice was not preserved,
and its replacement is examination-weight language — explicitly labelled as
such.** The brief asked that misleading examination-weight language not
replace educational guidance. The resolution here is that nothing is presented
as educational guidance that is not: the chip says *Examination priority*, the
sentence says where the marks are, and the caveat says that is not where the
subject is hardest. The channel for real guidance exists, is validated, and is
empty because no verified judgement exists. **If the owner supplies the
rationale for Units 3, 5 and 6, it becomes a four-line content entry.**

---

## E · Tests and browser verification

```
node _source/build/index.js
  content validation: 8 subjects, 8 outlines, 37 authored pages across
  5 subjects, 72 diagrams — OK (1 warning)
  ! pages["grade9/computer-fundamentals"]: 1 of 7 syllabus units authored

npm test   →   tests 471   pass 471   fail 0
```

Deterministic across repeated runs. **17 tests are new in this phase** — 16 in
`tests/focus.test.js` and 1 added to `tests/status.test.js` — against 454 at
the end of Phase 12.3. No existing test was weakened or deleted; five were
re-pointed from `ctx.quizFocus` to `ctx.examFocus` after the rename.

### Mutations actually executed

| Mutation | Result |
|---|---|
| Examination lead changed to "The hardest units in this subject are" | **Test fails**, naming the difficulty claim |
| The marks-are-not-difficulty caveat removed | **Test fails** |
| `getFocus` falls back to exam for an unknown kind | **Test fails** |
| `score-focus` removed from `NEVER_WRAP_CLASS` | **Test fails** on all five built pages |
| `renderFocus()` moved above the score reveal | **Test fails** |
| Teacher entry with no `source` | **Build fails** |
| Teacher entry with no `why` | **Build fails** |
| Teacher entry naming a unit the subject lacks | **Build fails** |
| Teacher list identical to the derived list | **Build warns** |
| Focus sorted by lightest marks | **Test fails** |
| `s.done ? 6` restored | **Test fails** twice, naming DBMS and Digital Design |
| Home sentence given site-wide totals | **Test fails** with 25 against 24 |
| Partial subject labelled as an outline | **Test fails** |
| Partial chip given the finished class | **Test fails** |
| `done: true` on an outline subject | **Build fails** |

One guard was found too weak during this work and strengthened: the
difficulty-claim test originally inspected only strings containing "mark", so
changing the lead to "The hardest units…" slipped past it. It now checks every
string in `renderFocus()`.

**Not performed, and not claimed:** no screen-reader test, no WCAG audit, no
human review of any kind.

---

## F · Git integrity

| | |
|---|---|
| Branch | `phase-12-grade-9-computer-application` |
| HEAD | `d476a57` — *Phase 12: Unit 1, and three places the build assumed a subject arrives whole* |
| Commits ahead of `main` | **5** (`d476a57`, `aa1151e`, `648cd48`, `e56fc97`, `9956f4c`) |
| Upstream | **none configured** |
| Remote branch | **does not exist**; `origin` has `main`, `phase-11-grade-9-foundation`, `phase-9-curriculum-integrity` |
| `origin/main` | `49d20b7`, unchanged |
| Staged | **0** |
| Modified (content) | **99** — 39 source/docs, 60 generated |
| CRLF-only rows | 0 at the time of measurement (measured straight after a build) |
| Untracked | **10** |
| Stashes | **0** |
| Work lost or overwritten | **None.** No reset, no clean, no stash, no history rewrite |

Untracked: `_source/content/revision-focus.js`, `_source/runtime/practical.js`,
`assets/js/practical.js`, `tests/{focus,practical,status}.test.js`, and four
`docs/` reports.

A second worktree at `.claude/worktrees/keen-lamport-c73cfe` (branch
`claude/keen-lamport-c73cfe`, the separate quiz-markup investigation) was left
untouched throughout.

Every changed file traces to Phase 12, 12.1, 12.3 or 12.4. No question bank
and no Grade 10 curriculum content was modified.

---

## G · Remaining limitations

- **No Nepali teacher has reviewed any content.** 0 of 2,090 ledger items. This
  phase adds Nepali the ledger has not yet been regenerated to include: the two
  recommendation labels, the examination caveat and the Nepali list joins.
- **No student has used any of it**, including the practical log and the new
  recommendation line.
- **No screen reader has been run, and no WCAG claim is made.** Structure was
  measured — one `h1` per page, named controls, `lang="ne"` on Nepali — and
  nothing more.
- **The teacher-directed channel is empty.** Every subject currently shows
  examination priority. This is the honest state, not a finished feature:
  the thing most worth having here is a teacher's judgement, and none exists.
- **The examination focus is marks-based, not personal.** It does not know
  which questions this student got wrong; the explanation under each wrong
  answer does.
- **Which CDC examination edition applies is still unestablished.**
- **Pre-existing and still live:** 72 markup strings render literally in the
  OOP and Hardware quiz banks. Untouched here, as instructed.
- **Nothing is committed.** All of Phases 12.1–12.4 is in the working tree.

---

## H · Verdict

# READY FOR PUSH

The educational ambiguity is resolved in the direction the evidence supports:
two channels, kept apart at the data layer, at the service boundary and in
what the student reads, with the authored channel empty because its one
candidate entry has no recorded rationale. The status model is genuinely
derived — one calculation, one remaining `done` read whose only job is to fail
when the flag drifts. Every figure the brief listed was reproduced from source
data, and none disagreed.

Grade 10 is intact: 150/150, 39 URLs, correct unit counts, no lesson body, no
question, no answer key and no escaping behaviour changed; the only difference
on its 39 pages is one shared navigation line about a Grade 9 subject.

The one thing a reader should weigh before authorising: **OOP no longer
carries "Units 3, 5 and 6"**, and this report argues that is correct because
no rationale for it exists and Unit 3 is the subject's lightest. If the owner
holds that rationale, supplying it is a four-line content entry and does not
reopen the code.

**No merge, push or deployment was performed. Stopping for review.**
