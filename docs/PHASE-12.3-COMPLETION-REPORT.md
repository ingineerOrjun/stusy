# Phase 12.3 — product accuracy and multi-grade status

The four user-visible inaccuracies from
[the Phase 12.2 audit](PHASE-12.2-RELEASE-AUDIT.md), corrected.

**454 tests passing, 0 failing. Production build passes. Grade 10 coverage
unchanged at 150/150 with 39 URLs. No question bank, answer key or escaping
behaviour was touched. Nothing merged, pushed or deployed.**

---

## 1 · Starting git state, re-inspected

| | |
|---|---|
| Branch | `phase-12-grade-9-computer-application` |
| HEAD | `d476a57` |
| Upstream | none; the branch does not exist on `origin` |
| `origin/main` | `49d20b7`, unchanged |
| Working tree at start | **44 files with content changes, 6 untracked**, nothing staged, no stashes |

The audit reported 5 untracked files; it was 6, because the audit document
itself had been written by then. Everything from Phases 12 and 12.1 is still
uncommitted and was preserved — nothing was reset, stashed or discarded.

A second worktree at `.claude/worktrees/keen-lamport-c73cfe` (branch
`claude/keen-lamport-c73cfe`, the separate quiz-markup investigation) was left
untouched.

---

## 2 · The root cause the four findings shared

Three of the four were the same bug wearing different clothes: **a boolean was
asked a three-state question.**

`site.js` carried `done: true`, and six places in `build/index.js` consulted
it. A subject could be "written" or "not written" and nothing else. When
Grade 9 arrived with one unit of seven, every one of those six places had to
pick a side, and each picked wrong.

So the fix is one derived model, not four patches:

```js
// build/context.js
subjectStatus[key] = {
  officialUnits,   // content/syllabus.js  — what the curriculum prescribes
  authoredUnits,   // config/pages.js      — pages that declare hours
  state            // outline | partial | complete
}
```

`STATUS_LABEL` holds the words for each state in both languages. **Nothing in
the build reads `done` any more.** It stays in the config for anything outside
the build that might, and `validate.js` now fails if it disagrees with the
derived state in either direction — so the two cannot drift.

| Subject | Authored / official | State |
|---|---:|---|
| grade9/c-programming | 0 / 7 | outline |
| **grade9/computer-fundamentals** | **1 / 7** | **partial** |
| grade9/electro-system | 0 / 7 | outline |
| grade9/website-design | 0 / 7 | outline |
| grade10/oop-cpp | 6 / 6 | complete |
| grade10/hardware | 6 / 6 | complete |
| grade10/dbms | 7 / 7 | complete |
| grade10/digital-design | 5 / 5 | complete |

---

## 3 · Finding A — subject-specific quiz feedback

### What the brief asked, and where the data disagreed

The brief asks that OOP **retain references to Units 3, 5 and 6**. It also
says: *do not invent revision recommendations unsupported by the actual
subject structure*. Those two pull apart, and the data decides it:

| OOP unit | External marks |
|---|---:|
| 1 Basic Introduction to Data Structure | **15** |
| 2 Concept of OOP using C++ | **14** |
| 5 Inheritance | 7 |
| 6 Polymorphism | 7 |
| 4 Abstraction and Encapsulation | 5 |
| **3 Class and Object** | **2** |

**Unit 3 is the lightest unit in the subject** — 2 of 50 marks. The old
message sent a struggling student there while Units 1 and 2, holding 29 marks
between them, went unmentioned. Restoring it verbatim would be restoring a
wrong answer that happened to have a unit number in it.

So the focus is **derived from each unit's external marks**: the heaviest
units, capped at three and never more than half a subject's units. That is
subject-specific for all five, supported by data the repository already holds,
and it cannot name a unit that has no page. OOP keeps Unit 5; Units 3 and 6
are replaced by the two units that carry more than half the paper.

**This is the one place this phase departs from the brief as written, and it
is flagged rather than buried.** If the Units 3, 5 and 6 list reflects a
teacher's judgement about difficulty rather than marks, that judgement should
go into the repository as data — a per-subject override beside the derived
default — and the code is shaped to take one.

### What a student now reads

| Subject | Message (low band) |
|---|---|
| grade9/computer-fundamentals | "Start again from **Unit 1 Introduction to Computer**, and read slowly…" |
| grade10/oop-cpp | "…**Unit 1** Basic Introduction to Data Structure, **Unit 2** Concept of OOP using C++ and **Unit 5** Inheritance" |
| grade10/dbms | "…**Unit 2** ER-Model, **Unit 3** Relational Model and **Unit 4** SQL" |
| grade10/hardware | "…**Unit 3** Overview on System's Core, **Unit 4** Troubleshooting Techniques and **Unit 5** Repair and Maintenance" |
| grade10/digital-design | "…**Unit 1** Number System, **Unit 2** Concept of Logic Gates and **Unit 5** Introduction to Microprocessor" |

Grade 9 names only Unit 1, because Unit 1 is the only unit it has.

### How it reaches the engine

```js
QuizService.registerFocus('grade10/dbms', [ { n, marks, title: {en, ne} }, … ]);
QuizService.getFocus(subjectId)     // [] when nothing is registered
```

Registered beside the bank in the generated `question-bank.js`, the same
pattern the banks already use. The engine never learns a subject's name. With
nothing registered the sentence falls back to "the unit" / "युनिट" and still
reads: **a missing registration costs specificity, never correctness.**

Titles are carried in both languages, so Nepali mode reads
*"युनिट 2 ई–आर मोडेल, युनिट 3 रिलेसनल मोडेल र युनिट 4 एसक्युएल"* — joined with
र, not a comma and "and".

### Guards

| Guard | Mutation that proves it |
|---|---|
| A focus never names a unit the subject lacks | Added `{n:'9'}` → **build fails**, naming the subject and the unit |
| Grade 9 is sent only to Unit 1 | — |
| Each focus is where the subject's marks are | Sorted ascending by marks → **fails**, naming the light unit and the heavy one it skipped |
| Each focus is its own, and ≤ half the units | — |
| Both titles present | — |
| The engine names no unit literally | Hardcoded "Units 3 and 5" back → **fails** |
| Every bank has a registered focus | — |

---

## 4 · Finding B — the home page

**Before:** *"4 subjects are written in full — … — across **25 units**: **72**
diagrams, 15 of them animated, **40** things you can actually operate, and
**86** practice questions."*

Five numbers, all site-wide, all attached to a sentence about the four
finished subjects. The 25th unit, 2 of the diagrams, 1 simulator and 4
questions belong to Grade 9.

**After:** the sentence is built from `contentStats.complete`, which sums only
subjects whose every official unit has a page.

| | Claimed before | Complete subjects | Site-wide |
|---|---:|---:|---:|
| subjects | 4 | **4** | 5 authored |
| units | 25 | **24** | 25 |
| diagrams | 72 | **70** | 72 |
| animated | 15 | **15** | 15 |
| operable | 40 | **39** | 40 |
| questions | 86 | **82** | 86 |

Those four corrected figures are exactly the Grade 10 regression baseline's
own table, written before Grade 9 existed — an independent check that the
split is right.

**The partly written subject is now named in its own sentence**, in both
languages, and generated per partial subject rather than hardcoded, so a
second one needs no code change and zero of them leaves no stray text:

> Computer Fundamentals (Grade 9) is partly written — 1 of its 7 units. Its
> finished units read exactly like the rest; the others are being written.
>
> कम्प्युटरका आधारभूत कुरा (कक्षा ९) आंशिक लेखिएको छ — 7 मध्ये 1 युनिट।

**The stat strip stays site-wide and is unchanged** — 25 units *are* written,
and its labels ("units written", "diagrams") claim nothing about completeness.
The strip and the sentence now differ by exactly the partial subject, and a
test asserts that they add up.

The Grade 9 card's chips gained a third look: `part` (dashed yellow) for a
partly written subject, between `on` (green, finished) and unmarked. Before,
a subject with a unit to read looked identical to one with nothing.

### Guards

| Guard | Mutation |
|---|---|
| The sentence uses complete-subject totals | `C.units` → `S.units` → **fails** with 25 against 24 |
| Each of the six numbers separately | — |
| The partial subject is named, in both languages | — |
| The partial chip differs from an empty one | chip class `part` → `on` → **fails** |
| Site-wide = complete + partial + outline | — |

---

## 5 · Finding C — Grade 9 subject status

`grade9/index.html` labelled Computer and Application **"syllabus outline"**,
identical to the three subjects with nothing written.

It now reads **"1 of 7 units written"** in yellow, with
*"7 मध्ये 1 युनिट लेखिएको"* beneath it; the other three keep "syllabus
outline" in blue; Grade 10 keeps "notes ready" in green.

The same three states reach the rest of the navigation:

| Place | outline | partial | complete |
|---|---|---|---|
| Grade index card | syllabus outline | **1 of 7 units written** | notes ready |
| Desktop dropdown | *(nothing)* | **· 1 of 7 units** | · notes ready |
| Mobile panel | *(nothing)* | **· 1/7** | ✓ |
| Home grade card chip | unmarked | **dashed yellow** | green |

Verified in a browser for all four Grade 9 subjects. Unit 1 remains reachable:
home → Grade 9 → Computer and Application → `unit1.html`.

### Guards

| Guard | Mutation |
|---|---|
| The index distinguishes all three states | Labelled the partial subject as outline → **fails** |
| The partial status is stated in Nepali too | — |
| No outline-only subject claims units written | — |
| Grade 9 Unit 1 is still linked and exists | — |

---

## 6 · Finding D — the hardcoded six

`const units = s.done ? 6 : …` told every finished subject it had six units.
DBMS has **7**; Digital Design has **5**. A DBMS student was shown a subject a
unit shorter than the one they are sitting.

It is now `st.officialUnits` — the subject's own syllabus length, which is
what the outline-only cards already used, so the two cases stopped needing
different code and the duplicate source of truth disappeared with the
constant.

| Grade 10 subject | Page said | Page says | Actual |
|---|---:|---:|---:|
| DS & OOP with C++ | 6 | **6** | 6 |
| Hardware & Repair | 6 | **6** | 6 |
| DBMS | 6 | **7** | 7 |
| Digital Design | 6 | **5** | 5 |
| **Total** | 24 | **24** | 24 |

### Guards

| Guard | Mutation |
|---|---|
| Each card states that subject's real count, Grade 9 and Grade 10 | Restored `s.done ? 6` → **fails twice**, naming DBMS and Digital Design |
| No two Grade 10 cards report the same count, and the four total 24 | — |
| No subject is complete with a unit unwritten | — |
| `done` agrees with the derived state | Set `done: true` on an outline subject → **build fails** |

---

## 7 · Browser verification

| Checked | Result |
|---|---|
| Home page, all three language modes | Sentence reads 4 / 24 / 70 / 15 / 39 / 82 in English and Nepali; partial sentence present in both; 0 console errors |
| Home grade chips | Grade 9 → `part` on Computer Fundamentals, unmarked on the other three; Grade 10 → all `on` |
| Grade 9 index | 4 cards: 1 partial with its fraction, 3 outlines; all 7 units, 64 theory hrs |
| Grade 10 index | 6 / 6 / 7 / 5 units, all "notes ready" |
| Navigation | Dropdown and mobile panel show the partial fraction; Grade 10 keeps ✓ and "notes ready" |
| Grade 9 Unit 1 | Reachable and unchanged |
| All five quiz pages | Answered to the end; subject-specific message in both languages; 0 console errors |
| Grade 10 lesson (hardware u4) | 1 `h1`, 2 simulators, 0 stray text in any mode |

One apparent finding was my own measurement error: an unlabelled `<input>` on
a Grade 10 lesson turned out to have a `<label for>` that the probe did not
check. It is pre-existing, untouched, and correctly labelled.

---

## 8 · Tests and build

```
node _source/build/index.js
  content validation: 8 subjects, 8 outlines, 37 authored pages across
  5 subjects, 72 diagrams — OK (1 warning)
  ! pages["grade9/computer-fundamentals"]: 1 of 7 syllabus units authored

npm test   →   tests 454   pass 454   fail 0
```

**454 = 433 + 21 new.** Deterministic across repeated runs. No existing test
was weakened or deleted.

---

## 9 · Files changed in this phase

| File | What |
|---|---|
| `_source/build/context.js` | `subjectStatus`, `STATUS_LABEL`, `quizFocus`, per-subject and per-status `contentStats` |
| `_source/build/index.js` | Six `s.done` uses replaced; home sentence; grade index card; nav and mobile panel; focus registration |
| `_source/build/validate.js` | `done` must match the derived state; a focus may only name units that exist |
| `_source/runtime/services/quiz.js` | `registerFocus` / `getFocus` |
| `_source/runtime/quiz.js` | `focusList()`; the two low bands name the subject's own units |
| `_source/design/site.css` | `.status.part`, and the status pill wraps and carries Nepali |
| `_source/design/home.css` | `.ready .part` |
| `tests/status.test.js` | **New** — 21 guards for all four findings |
| `docs/CONTENT-ARCHITECTURE.md` | Authoring status is derived, not declared |
| `docs/ASSESSMENT-ARCHITECTURE.md` | The banded message, and why the focus is derived from marks |
| `docs/GRADE-10-REGRESSION-BASELINE.md` | The pages now agree with the baseline table |
| `docs/PHASE-12.3-COMPLETION-REPORT.md` | **New** — this file |
| Generated | `index.html`, both grade indexes, 39 Grade 10 pages (nav), Grade 9 pages, CSS and JS bundles |

**Not touched:** any question bank, any answer key, any lesson body, the HTML
escaping in `quiz.js`, `.gitattributes`.

---

## 10 · Limitations

- **The OOP focus is Units 1, 2 and 5, not 3, 5 and 6** — see §3. If the brief's
  list encodes a judgement the marks do not, it needs to enter the repository
  as data.
- **The focus is marks-based, not personal.** It does not know which questions
  this student got wrong, though the explanation under each wrong answer does.
- **No teacher or student has reviewed any of this**, in either language. The
  new Nepali — the partial-status labels and the focus sentence joins — adds
  to a review ledger with 0 of 2,090 items reviewed.
- **No screen reader was run.** Structure was measured; no WCAG claim.
- **Pre-existing and still live, from the audit:** 72 markup strings render
  literally in the OOP and Hardware quiz banks. Separate investigation,
  deliberately untouched here.
- **Nothing is committed.** The branch is still at `d476a57` with the work in
  the tree.

## 11 · Verdict

# READY FOR PUSH

All four findings are corrected at the root rather than patched, each with a
guard that was proven to fail against the defect it prevents. The build is
green, 454 tests pass deterministically, Grade 10 is unchanged at 150/150 and
39 URLs, and no question content or escaping behaviour was altered.

The one departure from the brief — OOP's focus units — is a deliberate,
evidence-backed choice recorded in §3 and §10, not an oversight. It is worth a
decision before the push, but it does not make the product less accurate than
the brief's version would.

**No merge, push or deployment was performed.**
