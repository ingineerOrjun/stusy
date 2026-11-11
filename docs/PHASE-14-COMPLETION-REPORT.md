# Phase 14 — Grade 9 · Programming Principles and Concept in C Language

**Verdict: READY WITH DOCUMENTED LIMITATIONS.**

Seven units, all 35 official topics, 63 questions, 14 stepped programs and ten
practical activities. The build passes, 526 of 526 tests pass, and Grade 10 is
byte-for-byte unchanged apart from two shared navigation lines per page.

The limitation that sets the verdict is in §14 and is not small: **no C compiler
was available in this environment, so not one program in this subject has been
compiler-executed.** Everything else in this report describes what was done
about that.

---

## 1 · Official curriculum verification

**The CDC 2078 PDF was downloaded and read for this phase.** 1,072,865 bytes,
321 pages, from the URL the repository has cited since Phase 3
(`giwmscdnone.gov.np/media/pdf_upload/1694337718_jx35alj.pdf`). Text was
extracted from the content streams directly — zlib inflate, text-showing
operators — rather than re-typed, and the contents page confirms the subject
begins at printed page 1, which is PDF page 5.

Six tables were read: introduction, competencies, grade-wise learning outcomes,
**scope and sequence** (printed 4–5), **suggested practical and project works**
(printed 6), student evaluation, and the **specification grid** (printed 9).

### Every figure the brief gave was correct

| Figure | Brief | Repository | PDF | |
|---|---:|---:|---:|---|
| Units | 7 | 7 | 7 | ✓ |
| Official numbered topics | 35 | 35 | 35 | ✓ |
| Theory hours | 64 | 64 | 64 | ✓ |
| External marks | 50 | 50 | 50 | ✓ |
| Per-unit hours | — | 6·10·16·12·10·6·4 | 6·10·16·12·10·6·4 | ✓ |
| Per-unit marks | — | 5·7·13·10·8·5·2 | 5·7·13·10·8·5·2 | ✓ |

### Three things the verification added

**The practical half was not in the repository and now is.** The subject header
reads "Credit hrs: 4 / Working hrs: 128": the 64 theory hours are half of it,
and a separate table gives 64 practical hours as **2 · 3 · 15 · 15 · 15 · 7 · 7**.
That distribution is *different* from Computer and Application's, which is why
it was read per subject rather than assumed. It is now in
`specification-grid.js` and on every unit's marks chip.

**The paper's own structure was transcribed.** 9 MCQs at 1 mark, 5 short at 5,
2 long at 8 — 16 questions, 50 marks. Published as whole-paper column totals
only, so it is recorded as such and **not** invented per unit. It is what the
`.examq` practice questions in the lessons are shaped against.

**Three source-document observations, recorded and not corrected:**

| # | Observation |
|---|---|
| G9C-O1 | The practical table inside this Grade 9 subject is headed "Unit / **Grade 11** / Scope / Practical Activities / Hrs." A header typo in the source. |
| G9C-O2 | Learning outcome 5.4 names `gets()` and `puts()`; the scope and sequence does not. The scope and sequence is authoritative, so neither is an official topic. Both are named in the lesson as context, and `gets()` is flagged as **removed from the C standard**. |
| G9C-O3 | Scope item 5.3 reads "Introduction to One-Dimensional Array"; the repository's string is "One-Dimensional Array". A shortening that predates this phase; the coverage map matches on the repository string, so it is recorded rather than renamed across a phase boundary. |

Phase 11's one recorded discrepancy — that 2.7 *Operators in C* closes Unit 2
rather than opening Unit 3 — was **re-verified against the PDF and confirmed**.

Full map: [`GRADE-9-C-PROGRAMMING-CURRICULUM-MAP.md`](GRADE-9-C-PROGRAMMING-CURRICULUM-MAP.md).

---

## 2 · Seven-unit completion

| Unit | Title | Topics | Hrs | Marks | Prac hrs | Lesson | Lines |
|---|---|---:|---:|---:|---:|---|---:|
| 1 | Principles of Programming | 4 | 6 | 5 | 2 | `c-u1.html` | 588 |
| 2 | Fundamentals of C | 7 | 10 | 7 | 3 | `c-u2.html` | 811 |
| 3 | Control Flow Statements | 3 | 16 | 13 | 15 | `c-u3.html` | 675 |
| 4 | Functions | 6 | 12 | 10 | 15 | `c-u4.html` | 777 |
| 5 | Arrays & Strings | 5 | 10 | 8 | 15 | `c-u5.html` | 693 |
| 6 | Structure and Union | 6 | 6 | 5 | 7 | `c-u6.html` | 497 |
| 7 | Pointers | 4 | 4 | 2 | 7 | `c-u7.html` | 533 |
| | **Total** | **35** | **64** | **50** | **64** | | **4,574** |

Every unit carries: objectives, a prerequisite block where one applies, every
official topic under its own numbered heading, at least one simulation, at least
one prediction, **two** worked examples with think gates, a misconceptions
block, a memory hook, the unit's practical activities, an exam-focus panel,
examination-style practice questions with model answers, and a recap.

---

## 3 · All 35 topics

Coverage is **derived, not declared**. `node tools/grade9-spec.js` reads
`content/coverage.js`, the page map, the registered question bank and the
`data-practical` ids, and reports per topic. Current output:

```
topics : 168   fully-taught 71, practical-missing 0, assessment-missing 0,
               partially-taught 0, not-implemented 97
```

71 = Computer and Application's 36 + **this subject's 35**. Nothing is
`partially-taught`, nothing is `assessment-missing`, nothing is
`practical-missing`.

| Unit | Topics | Anchors |
|---|---|---|
| 1 | 1.1–1.4 | `c-t11` `c-t12` `c-t13` `c-t14` |
| 2 | 2.1–2.7 | `c-t21` … `c-t27` |
| 3 | 3.1–3.3 | `c-t31` `c-t32` `c-t33` |
| 4 | 4.1–4.6 | `c-t41` … `c-t46` |
| 5 | 5.1–5.5 | `c-t51` … `c-t55` |
| 6 | 6.1–6.6 | `c-t61` `c-t62` `c-t63` `c-t64` ×3 |
| 7 | 7.1–7.4 | `c-t71` … `c-t74` |

Two mapping decisions worth stating, because both could have been hidden:

- **Unit 3's three official topics carry 16 hours and 13 marks** between them —
  the coarsest granularity anywhere in Grade 9. The lesson splits each into
  several sections a student can navigate; the map keeps **one entry per
  official string**, because the string is the contract and inventing finer
  entries would be inventing curriculum.
- **Unit 6's 6.4, 6.5 and 6.6 share the anchor `c-t64`.** Declaring a union and
  accessing its members are *identical in syntax* to a structure's, and the
  section says so in those words. Teaching them apart would imply a difference
  that does not exist.

`tests/grade9-c.test.js` asserts all 35 against the built pages and fails on a
stale entry in either direction.

---

## 4 · Files created and modified

### Created — the subject

| File | Lines | |
|---|---:|---|
| `_source/content/lessons/c-u1.html` … `c-u7.html` | 4,574 | seven lessons |
| `_source/content/sections/c-hero.html` | 28 | subject overview |
| `_source/content/sections/c-quiz.html` | 49 | quiz page |
| `_source/content/questions/grade9-c-programming.js` | 1,369 | 63 questions |
| `_source/content/practice/grade9-c-programming.js` | 545 | 3 faded skills, 15 problems |
| `_source/content/programs/grade9-c-programming.js` | 718 | 14 programs, 101 steps |
| `_source/runtime/sim-crun.js` | 335 | the stepper engine |
| `tests/grade9-c.test.js` | 603 | 19 tests |
| `docs/GRADE-9-C-PROGRAMMING-CURRICULUM-MAP.md` | — | the map §1 refers to |

### Modified — wiring, and nothing else

| File | What changed |
|---|---|
| `config/pages.js` | the subject entry: 7 units + revise + quiz |
| `config/site.js` | `done: true`, which the build then checks against the derived state |
| `content/coverage.js` | 35 topic → anchor entries |
| `content/specification-grid.js` | `practicalHours` for this subject |
| `content/prerequisites.js` | 7 unit entries, 8 edges |
| `content/heading-ne.js` | 18 Nepali headings for the new simulation panels |
| `diagrams.js` | 7 new figures |
| `runtime/sim-drill.js` | 11 new decision-drill sets |
| `runtime/core.js` | 14 C keywords and 4 library names added to the highlighter |
| `build/context.js` | registers the question bank, the practice bank, the program bank, `sim-crun.js` |
| `build/index.js` | writes `assets/js/program-bank.js` |
| `build/validate.js` | `crun` added to the self-controlled simulation list; `program-bank.js` to the generated-module list |
| `design/site.css` | the stepper's styles |
| `tools/nepali-bilingual.js` | `unquote()` — see §8 |
| `tools/nepali-review.js` | reads `content/programs/` |
| `tests/focus.test.js` `status.test.js` `ux.test.js` | counts and lists that name every subject |

**Two changes touch shared code and both are justified below in §12.**

---

## 5 · Interactive learning components

### Reused before anything new was built

| Component | Where | Count |
|---|---|---:|
| `sim-drill.js` decision drills | every unit | 11 sets, 54 cases |
| `predict.js` prediction blocks | every unit | 7 |
| `guided.js` faded practice | units 3, 4, 5 | 3 skills, 15 problems |
| `wexthink.js` worked-example gates | every unit | 14 |
| `practical.js` activity log | every unit | 10 activities |
| `D.arrayMemory` | unit 5 | reused from Grade 10 DS & OOP unchanged |

### One new component: the C program stepper

`runtime/sim-crun.js`, mounted 14 times across six units.

**The argument for building it.** A listing answers "what was written". It
cannot answer the question the whole subject turns on: *what is the value of `i`
right now, and why did the loop stop?* A student who can read every line of a
`for` loop and still cannot say what `sum` holds on the third turn has not learnt
the loop, and a printed page cannot tell them, because the page shows the program
in its final state and the program is only ever in intermediate ones.

It shows three things moving together — the code with the executing line marked,
a variable table with the row that just changed highlighted, and **the console
as it is at that moment and no further**. The console is rebuilt from step zero
on every change rather than appended to, so stepping *backwards* un-prints
output. A console that only grew would teach that `printf` happens all at once
at the end, which is the misconception the component exists to remove.

The student drives it. There is no timer and no animation: the pause before
pressing Next is where the prediction happens, and an auto-play would remove
exactly that pause.

**It is not a C interpreter and the file says so.** Every step is authored. What
makes the authoring checkable is that each program *also* declares its finished
`output`, independently of the steps that produce it, and
`tests/grade9-c.test.js` fails if the two disagree. Two separate authorings that
must agree is the strongest check available without a compiler.

**The programs are content, not runtime.** They live in
`_source/content/programs/` beside the question banks and practice banks; the
build generates `assets/js/program-bank.js` as a list of `CRun.register()`
calls. Three reasons, and the first two are the ones that matter: a C listing
with 101 bilingual captions is a curriculum artefact and an author changing a
caption should not be editing a runtime module; Nepali in `_source/content` is
collected and attributed by the review extractor, and Nepali inside a runtime
module is not. The third reason is practical and is in §8.

### Seven new diagrams

`cBuildRun` (source → compiler → executable → output, with each kind of error
where it really occurs), `cFlowSymbols` (the six symbols at drawing size),
`cFunctionCall` (the round trip, and main waiting), `cValueVsRef` (the same swap
twice, as two memory maps), `cStringNull` (six boxes for a five-letter word),
`cStructUnion` (the same members, two layouts), `cPointerMemory` (two boxes, one
arrow). Each answers a question a listing cannot; none is decorative.

---

## 6 · Question bank

**63 questions**, weighted to the external marks rather than to the hours.

| Unit | Marks | Questions | easy | medium | hard |
|---|---:|---:|---:|---:|---:|
| 1 Principles of Programming | 5 | 7 | 2 | 3 | 2 |
| 2 Fundamentals of C | 7 | 9 | 3 | 3 | 3 |
| 3 Control Flow Statements | 13 | 14 | 4 | 6 | 4 |
| 4 Functions | 10 | 11 | 4 | 3 | 4 |
| 5 Arrays & Strings | 8 | 10 | 2 | 5 | 3 |
| 6 Structure and Union | 5 | 7 | 2 | 3 | 2 |
| 7 Pointers | 2 | 5 | 2 | 2 | 1 |
| **Total** | **50** | **63** | **19** | **25** | **19** |

63 distinct topic slugs across 63 questions — no question repeats another's
topic. The quiz draws 12, so a retake is a different paper. Every prompt,
explanation and option is bilingual; every answer index is in range; every
answer was worked out by hand against C semantics and cross-checked against the
lesson that teaches it.

**The kinds the brief asked for, and where each lives:**

| Kind | Example |
|---|---|
| Conceptual | q01 program vs software |
| Syntax interpretation | q08 which identifier is legal |
| Code tracing | q36 how many times `f` is called for `f(4)` |
| Output prediction | q18 `switch` with no `break` anywhere |
| Error identification | q21 the semicolon after `for (…)` |
| Practical reasoning | q58 which to use when memory is short |
| Examination-style short and long | the 19 `.examq` blocks in the lessons, at 2, 4 and 8 marks |

**Under-represented topics, named rather than hidden.** The bank is weighted by
unit, not by official topic, so within a unit some topics carry more questions
than others. Unit 3's three official topics hold 14 questions between them and
the split is roughly 4/6/4, which is proportionate; Unit 6's 6.5 and 6.6 are
covered by questions about the behaviour they share with 6.4 rather than by
questions of their own, because the syntax is identical and a question about it
would be the same question three times.

---

## 7 · Practical activity mapping

**Ten official activities, one for each the curriculum lists.**

| Unit | Activity | Id | Can the site do it? |
|---|---|---|---|
| 1 | Familiarisation with IDE tools | `g9.c.p1.1` | **No** — needs a real installation |
| 2 | Display `HELLO WORLD!` | `g9.c.p2.1` | **No** — needs a compiler |
| 3 | Programs for sequential structure | `g9.c.p3.1` | **No** |
| 3 | Programs for conditional and iterative structure | `g9.c.p3.2` | **No** |
| 4 | Programs using functions | `g9.c.p4.1` | **No** |
| 4 | A simple recursive function | `g9.c.p4.2` | **No** |
| 5 | Programs using arrays, sorting a list | `g9.c.p5.1` | **No** |
| 5 | Programs using strings | `g9.c.p5.2` | **No** |
| 6 | Programs using structure and union | `g9.c.p6.1` | **No** |
| 7 | Programs using pointers (`*`, `&`) | `g9.c.p7.1` | **No** |

**Every one of the ten needs a C compiler on a real machine.** That is the
honest finding and it is different from Computer and Application, where several
activities were paper exercises. **Every brief on the page says so in those
words**, and a test fails if one stops saying it.

What the site provides instead, and says it is providing: the program, the
expected output, the stepper that shows what each line does to each variable,
and an observation to record. Several briefs ask the student to do something
deliberately *wrong* and write down what happened — delete the base case from a
recursive function, rename `main` to `Main`, try `strrev` and record whether
their compiler has it — because meeting a failure on purpose, while you know
what caused it, is worth more than avoiding one.

The **record-keeping** half of the internal marks (3 of 50 practical, 2 of 50
project) is supported by `practical.js`, which stores a student's own ticks on
their own device and claims nothing else. No brief claims the product has
verified any work.

---

## 8 · Nepali extraction and review

| | Before Phase 14 | After |
|---|---:|---:|
| Distinct translations | 3,554 | **4,424** |
| Occurrences | 3,914 | **4,891** |
| Of which this subject | 7 | **984** |
| Human-reviewed | 0 | **0** |
| Devanagari reaching no reviewer | 56 | **52** |

**All 977 added occurrences are new content**, which is the opposite of the
previous phase's increase and the difference matters to a reviewer. Phase 13.1
added 1,311 occurrences of Nepali that had always been in the product and was
simply unreachable. Phase 14 added 984 occurrences that did not exist a phase
ago and have been read by nobody.

**The unreachable count went down while a subject was added**, and neither
change was content:

1. **`content/programs/` was registered with the extractor.** Had the stepper's
   101 bilingual captions stayed inside the runtime module, they would have been
   Nepali in a file the collector reads weakly and attributes to nothing.
   Declared as content with a `subject` and a `unit`, every caption lands on its
   own unit's row in the ledger.
2. **`unquote()` in `tools/nepali-bilingual.js` was wrong about `\\n`.** It ran
   four chained replaces, and the `\n` pass matched the second half of an
   escaped backslash — so `\\n`, which is how a lesson writes the escape
   sequence a student sees, lost its `n` and left a stranded backslash. One
   correctly paired question about escape sequences reported as unpaired, and
   three strings in `build/context.js` were affected too. Now a single
   left-to-right pass, so a backslash can never be read twice. **Any lesson
   teaching `\n`, `\t` or `\\` would have hit this**, which is why it surfaced
   in a C subject and not before.

No new extraction *pattern* was introduced: the programs are an ordinary
`{en, ne}` data module and the question, practice and lesson shapes are the ones
the extractor already read. `tests/grade9-c.test.js` asserts that every stepper
caption is bilingual and Devanagari, and the existing ratchet in
`tests/nepali-review.test.js` fails if the unreachable count grows.

**No Nepali content is marked human-reviewed, and nothing in this phase could
mark it so.** The generator can only copy forward a status recorded by hand.

---

## 9 · Test results

```
ℹ tests 526
ℹ pass 526
ℹ fail 0
```

507 before this phase, **526 after** — 19 new, all in `tests/grade9-c.test.js`.
No test was skipped, weakened or removed. Four existing test files were edited
and each change is a count or a list that names every subject:

| File | Change |
|---|---|
| `focus.test.js` | quiz sections 5 → 6 |
| `status.test.js` | `grade9/c-programming` 0/7 outline → 7/7 complete |
| `ux.test.js` | `crun` added to the self-controlled simulation list, in step with `validate.js` as that test's own comment requires |
| `language.test.js` | *not edited* — it passes unchanged |

### What the new tests actually check

§1–4 are the curriculum, the practicals, the bank and the components, in the
shape `tests/grade9-cf.test.js` established for the previous subject. §5 and §6
are new and are what this subject needed:

**§5 — the C itself.** A mechanical checker over every code block in the
lessons *and* every stepper program: balanced braces, parentheses and brackets
after comments, strings and character constants are blanked out; a complete
program (one carrying `#include`) has `int main` and `return 0`; `printf` and
`scanf` require `<stdio.h>` and the string functions require `<string.h>`; every
`printf` and `scanf` has exactly one argument per conversion specifier, with
`%%` excluded; every `scanf` argument that is not `%s` carries an ampersand; and
no listing has slipped into C++ (`cout`, `cin`, `endl`, `using namespace`,
`iostream`, `class`, `new`, `::`).

One block is exempt and carries `data-broken` in the markup with a comment
saying why: Unit 2's Example 2 is a deliberately wrong program and *is* the
question.

**§6 — the stepper.** Every step's line number is inside its program; every
variable a step sets is one the program displays; every variable displayed is
set by some step; the call stack never pops more than it pushes; every caption
is bilingual with real Devanagari; every mounted program exists and is mounted
in the unit it declares; every authored program is mounted somewhere; and the
console produced by the steps equals the `output` the program declares.

**This is not a compiler and the test file says so in its header.** It catches
the clerical mistakes that actually occur in authored teaching code. It cannot
catch a program that is wrong about what it computes.

---

## 10 · Build results

```
content validation: 8 subjects, 8 outlines, 52 authored pages across 6 subjects,
                    82 diagrams — OK
learning map: 38 units, 33 prerequisite edges, 128 retrieval questions
```

No warnings. Before this phase: 43 authored pages, 75 diagrams, 31 units, 23
prerequisite edges, 112 retrieval questions.

**Home-page statistics are derived and were not touched.** The page now reads
"6 subjects are written in full — C Language, Computer Fundamentals, DS & OOP
with C++, Hardware & Repair, DBMS, Digital Design — across 38 units: 82
diagrams, 15 of them animated, 73 things you can actually operate, and 128
practice questions". Every figure comes from the content registry. The Grade 9
index shows the subject as "notes ready · 7 units", also derived.

---

## 11 · Browser and responsive verification

Performed in a real browser against the built site, not asserted.

| Check | Result |
|---|---|
| All 10 C pages load | ✔ index, 7 units, revise, quiz |
| Console errors | **none** (the only entries are the CSP correctly blocking a probe fetch I made) |
| Components mounted | 14 steppers, 11 drills, 7 predictions, 3 guided panels, 8 figures, 10 practical logs — all rendered, none an empty box |
| Stepper interaction | Next / Prev / Reset drive the step counter; Prev is disabled at step 0; Next at the last step |
| Stepper console | stepping **back** from step 5 to 4 removes `Sum = 20` — the console is the state at that moment, verified |
| Guided practice | `c.callby` mounts, accepts an answer and marks it |
| Quiz end to end | 12 questions drawn, all answered, score box shown with **both** messages and the examination-priority line naming Unit 3 and Unit 4 |
| Language modes | bilingual 17,767 EN + 12,824 NE characters; English 17,247 EN / **0** NE; Nepali 13,342 NE + 2,226 EN, the English being code listings and technical terms kept Latin by contract |
| Desktop width | no horizontal page scroll; the stepper lays out code beside variables and console |
| **320 px** | no horizontal page scroll on any unit; the stepper grid collapses to one column and the variable table fits its 220 px column exactly |

Two CSS fixes came out of this and nothing else did: the stepper's variable
table inherited the global `table { min-width: 560px }` and pushed its own
component sideways inside a 376 px column, and Unit 2's data-type table was
authored inside a `.pair` column where it could not fit. The first is now
`table-layout: fixed` with a zero width floor; the second is one bilingual table
in a `.tablewrap`, which is the house pattern.

A **pre-existing** 2–4 px overflow inside `.pair .np` at 320 px was measured on
Computer and Application's pages as well as this subject's. The page itself
never scrolls sideways, so the product's own rule holds; it is recorded here and
not fixed, because it is not this phase's.

---

## 12 · Grade 10 preservation

Measured against `HEAD`, not asserted.

| Check | Result |
|---|---|
| Grade 10 URLs | **39 of 39 present** |
| Pages changed beyond shared navigation | **0** |
| Grade 10 source files identical to HEAD | **32 of 32** — 4 question banks, 4 practice banks, 24 lesson files |
| Questions | **188** — 52 + 52 + 54 + 30, unchanged |
| Official topics mapped | **150 of 150** |
| Tests | 526 pass, including every Grade 10 guard |

The two lines that differ on each of the 39 pages are the desktop navigation and
the mobile panel, and the only text that changed inside them is in the **Grade 9
section**: C Language gained "· notes ready" and "✓". That is the shared
navigation doing what it is for.

### The two shared-code changes, and why each is justified

**`runtime/core.js` — 14 keywords added to the syntax highlighter.** The word
lists were written for C++, so `goto`, `union`, `sizeof`, `typedef`, `long`,
`unsigned` and eight more rendered as plain identifiers — the same colour as a
variable name. A highlighter that colours `break` and not `goto` teaches that
one of them is a keyword and the other is not. **Every word added was checked
against every existing code block in the repository first: not one of the
eighteen Grade 10 lessons contains any of them inside a `<pre class="cpp">`**,
so no existing listing renders differently. The highlighting runs in the browser,
so no built page changed either.

**`build/validate.js` — two list entries.** `crun` joins the self-controlled
simulation list for the same reason `cipher` did in Phase 13: the component
builds its own labelled controls from the string table, and hand-authoring a
duplicate set in the lesson would be a copy that drifts. `program-bank.js` joins
the generated-module list beside `question-bank.js` and `practice-bank.js`.
Neither changes a rule; both extend an explicit list that exists so a typo in a
page's script array is still caught.

---

## 13 · Final Git state

| | |
|---|---|
| Branch | `phase-13-grade-9-units-2-7` |
| HEAD | `e56fca9` |
| Ahead of `origin/main` | **0** |
| Working tree | 137 entries — 92 modified, 45 untracked, **0 staged** |
| Commits made | **none** |
| Pushed / merged / deployed / history rewritten | **none** |

**Nothing was committed, staged, pushed, merged, rebased or deployed.**

**The protected file is untouched.** `tools/grade9-spec.js` remains at +17/−2,
unstaged, byte-for-byte as it was, and `node tools/grade9-spec.js --check`
passes. Its *output*, `docs/GRADE-9-CURRICULUM-SPECIFICATION.json`, was
regenerated as that file instructs — regenerate, do not edit by hand.

All pre-existing uncommitted work from Phases 13 and 13.1 is intact: the six
`cf-u*.html` lessons, `sim-cipher.js`, `tools/nepali-bilingual.js`,
`tests/grade9-cf.test.js`, `tests/nepali-review.test.js` and both completion
reports are all still present and still untracked.

The working tree is now **137 entries and two and a half phases deep**. That is
not a defect and it is a risk: the longer it stands, the harder it is to reason
about what belongs to which phase, and `tools/grade9-spec.js` has to stay out of
whatever commit is eventually made.

---

## 14 · Remaining limitations

**1 · No program in this subject has been compiler-executed.** `gcc`, `clang`,
`cc`, `tcc`, `g++` and `cl` are all absent from this environment. What was done
instead: hand-verification of every program against C99/C11 semantics, and the
mechanical checker in §9 that fails the suite on unbalanced brackets, a
specifier/argument mismatch, a missing header, a missing ampersand, a complete
program with no `main`, or C++ syntax in a C listing. **The claim this phase
supports is "mechanically checked and hand-verified", and nothing stronger.** A
program that is syntactically perfect and computes the wrong thing would pass
every check in this repository.

**2 · No Nepali teacher has read any of it.** 984 occurrences of new Nepali,
0 reviewed. That number is now 4,891 across the platform and it has never been
anything but 4,891 pending.

**3 · No student and no teacher has used the subject.** No usability testing, no
classroom trial, no evidence that the teaching sequence works. The pedagogy in
§2 is reasoned, not validated.

**4 · 52 Devanagari strings still reach no reviewer**, each named by file and
line by `node tools/nepali-review.js --audit`. None of them is in this subject.

**5 · Prediction options and worked-example titles are English-only across the
entire product.** Measured this phase: **118 prediction options and 90
worked-example titles, 0 with Nepali**, across all six written subjects. A
Nepali-mode student reads a bilingual question and then chooses between English
answers. This is a real gap against the content language contract, it is
**pre-existing and product-wide rather than introduced here**, and fixing it
would mean editing Grade 10 content — so it is documented, not fixed.

**6 · No screen reader has been run** and no WCAG 2.1 AA claim is made. The
stepper uses a real `<table>` with row headers, a `role="log"` live region for
the console and a `role="status"` caption, and its controls are real buttons
with `data-ui` labels — but none of that has been heard.

**7 · The applicable examination edition is still unestablished.** Unchanged
from Phase 9.5 and recorded in `CURRICULUM-APPLICABILITY.md`.

**8 · `strrev`, `strlwr` and `strupr` are on the syllabus and are not standard
C.** This is taught rather than hidden — it is arguably the single most useful
thing Unit 5 can tell a student who later moves to a real toolchain — but it
means the subject teaches three functions that a conforming compiler will
refuse.

---

## 15 · Recommendation

The subject is complete against the curriculum and against the repository's own
gates. Two things should happen before the next subject.

**Commit this work.** 137 entries across three phases, with a protected file
that must stay out of the commit, is a state that gets harder to reason about
every day. This phase did not commit because it was not authorised to.

**Get a compiler into the environment, or get a human to compile these
programs.** Everything else in this report is as strong as the repository can
make it; §14.1 is the one claim a test cannot replace. Fourteen stepper programs
and roughly thirty listings, compiled once, would turn "mechanically checked"
into "verified" — and it is the kind of gap that stays invisible until a student
types one in.

Two subjects of Grade 9 are written and two remain: *Fundamentals of
Electro-System* and *Website Design*, 97 topics between them. The pattern that
generalises from this phase is the one in §5: **a listing shows a program's
final state, and a student only ever meets it in intermediate ones.** Website
Design will have the same problem with CSS and the DOM, and the answer will
again be to show the intermediate states rather than describe them.
