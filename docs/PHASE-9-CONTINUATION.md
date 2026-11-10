# Phase 9 continuation — finishing what the Phase 9 report deferred

**Branch:** `phase-9-curriculum-integrity` · **Started from:** `949d0a6`
(379 tests passing, clean tree, build OK) · **Ends at:** `33bd8d0`
(**392 tests passing**) · **Not merged to main. Not deployed.**

[`PHASE-9-CURRICULUM-INTEGRITY.md`](PHASE-9-CURRICULUM-INTEGRITY.md) listed six
things it had not done. This closes five of them, corrects three claims it made
about its own work, and says plainly what is still open.

---

## 1 · What was already complete when this started

Re-inspected rather than taken on trust. Baseline recorded first: branch
`phase-9-curriculum-integrity` at `949d0a6`, working tree clean, **379 tests
passing**, build OK, three Phase 9 commits present and their changes real.

| Claimed by the Phase 9 report | Verified? |
|---|---|
| Nine wrong marks corrected, gated by `specification-grid.js` | Yes — and the marks were re-extracted from the PDF independently today and matched |
| OOP syllabus outline + 35/35 coverage map | Yes |
| Hardware 37/37 revalidated | Yes |
| Question bank 15 → 49 | Yes |
| Quiz `data-limit` / `data-shuffle` fixed | Yes — the built page carries both, and a test now pins them |
| DBMS functional-dependency diagram | Yes |
| 379 tests, build passes | Yes, reproduced |

### Three claims that did not survive re-inspection

1. **"Seven under-interactive units."** This audit was never written down
   anywhere in the repo and could not be reproduced. The first count written
   here disagreed with the page, because it counted lab CSS classes and OOP
   Unit 1's stack/queue simulator mounts on `#stackViz` — so the heaviest unit
   in the subject scored zero practice while having a two-panel simulator with
   controls. That is most likely how it came to be called under-interactive.
   §4 gives a measured matrix for all 24 units and the criterion behind it.

2. **"Definitions, code reading, output prediction, error identification and
   applied scenarios."** Counted by topic tag, the 49-question bank held **one**
   error-identification question and **two** output-prediction questions. Thin
   rather than false. §5.

3. **"PDF p. 50 / 59 / 68 / 76."** These read as citations to quote. They were
   derived from the order of the PDF's content streams; the printed folio was
   never confirmed and still has not been. Corrected to "approx." with an
   explanation of what they are. §7.

---

## 2 · DBMS — a verified topic-level coverage map

**39 official topics, 39 mapped, gated by the build.**

Every entry was checked by reading the content it points at. Where a topic is
taught in a callout inside a parent section rather than under a heading of its
own, the callout is named in a comment in `content/coverage.js`.

| Unit | Marks | Topics | Status | Where the non-obvious ones live |
|---|---:|---:|---|---|
| 1 Introduction to Database System | 2 | 8 | Complete | 1.4 *Application* is the callout "Where database systems are used" inside 1.2 & 1.3 — seven domains, bilingual |
| 2 ER-Model | 10 | 6 | Complete **after a fix** | Attribute types and the relationship symbol are in the ER parts lab, one press each; relationship TYPES in the degree callout |
| 3 Relational Model | 6 | 4 | Complete | All nine *Key Concepts* are pressable in the table visualiser; *Properties of Relations* is a callout plus the prediction that tests it |
| 4 SQL | 14 | 7 | Complete **after a fix** | DML is in two places and the map records both anchors |
| 5 Relational Database Design | 6 | 3 | Complete | |
| 6 Database Transaction | 6 | 4 | Complete | |
| 7 Backup, Recovery, Security | 6 | 7 | Complete | *Reasons for failure* and *Common threats* are numbered callouts |

### Two gaps found, and filled before the map was written

**2.2 "Entity Set" — promised and never taught.** The unit's own learning
outcome said "Identify an entity, an entity set and a weak entity". The phrase
"entity set" appeared exactly once in the unit: in that outcome. Not in the
prose, not in the ER symbols figure, not in the parts lab. "Define entity and
entity set" is a one-mark question and the answer was not on the page.

Now taught, with the bridge that makes the pair stick rather than a definition
to memorise: **the entity set becomes the table and each entity becomes one
row** — the same sentence said twice, and a forward reference to Unit 3.

**4.3 "WITH" — one of five named clauses, absent from a 14-mark unit.** The
official list is `WHERE, AND, OR, WITH, ORDER BY`. `WITH` occurred zero times
in the unit. Now taught with the comparison that is the actual exam question: a
view is stored in the database and stays until dropped; a `WITH` name exists for
the single statement that defines it. `AND` and `OR` are now stated as rules
too, where before they appeared only inside example queries.

---

## 3 · Digital Design — a verified topic-level coverage map

**39 official topics, 39 mapped, gated by the build.**

| Unit | Marks | Topics | Status | Note |
|---|---:|---:|---|---|
| 1 Number system and binary arithmetic | 7 | 10 | Complete | All three official conversions taught separately, each with a worked example |
| 2 Concept of logic gates | 15 | 5 | Complete | Five gates with symbol, expression and truth table; universal gates has its own section |
| 3 Boolean algebra and Karnaugh Map | 6 | 4 | Complete | See the official inconsistency below |
| 4 Binary arithmetic and combinational logic | 7 | 10 | Complete **after a fix** | |
| 5 Microprocessor | 15 | 10 | Complete | 5.7 *bus structure and internal architecture* is the CPU block diagram with all three buses and their widths, plus the per-bus callout; 5.8 *description of each block* spans the flag-register section and 5.3–5.6, and the map records both anchors |

### One gap found and filled

**4.7 – 4.10 were defined only inside a static SVG.** Decoder, encoder,
multiplexer and demultiplexer — four separate official topics — shared one block
diagram, one figure caption and one multiplexer lab. The house convention is
that diagram text stays English and the **caption** carries the meaning
(`LANGUAGE-SYSTEM` §10). This caption carried the mnemonic, "learn them in
opposite pairs", and not the definitions. So a student reading in Nepali had no
definition of a decoder anywhere in the unit, and a student reading in English
had four phrases inside a picture.

All four are now defined in prose, in both languages, with the discriminator the
paper tests: **a decoder and an encoder work on a CODE, where the thing moving
is itself the number; a MUX and a DEMUX move DATA, and the select lines are not
the data.**

**4.3 and 4.5, the subtractors, had expressions and no truth tables.** Half
subtractor and full subtractor are separate official topics; between them they
had two rows of a comparison table and one callout. "Draw the truth table of a
full subtractor" is a written question and the table was not on the page. Both
tables are now there — checked row by row against both expressions before being
written down — with the rule that lets a student rebuild them rather than
memorise: borrow is 1 exactly when what you are taking away is bigger than what
you have. Plus a prediction on the trap row, `A=0, B=1, Bᵢₙ=1`, where a borrow
is taken and the difference is still 0.

### An official inconsistency, recorded and not resolved

Unit 3 is titled **"Boolean algebra and Karnaugh Map"** and its official content
list names **no Karnaugh map at all** — 3.1 to 3.4 are Boolean relationships,
SOP, POS and algebraic simplification. The repo teaches a K-map anyway, at
`#t35`, because the unit title and the SEE paper both demand it. That section is
deliberately **not** in the coverage map: it answers no official topic string,
and claiming otherwise would be inventing curriculum.

---

## 4 · The under-interactive units — a measured matrix, and two drills

The previous audit could not be located, so this is a fresh one with a stated
criterion: **PRACTICE = the components a student can operate and be answered by**
— a decision drill, a faded-practice block, or a named lab. A prediction is one
click on a two-option question; valuable, counted separately.

On that count **every one of the 24 units has at least one practice component**
and ten sit at exactly one. Eight remain there after this work:

| Subject | Unit | Marks | PRAC | drill | faded | lab | predict | worked |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Hardware | 3 | 9 | 1 | 0 | 0 | 1 | 1 | 2 |
| Hardware | 1 | 7 | 1 | 1 | 0 | 0 | 1 | 2 |
| Digital Design | 3 | 6 | 1 | 0 | 0 | 1 | 1 | 3 |
| DBMS | 6 | 6 | 1 | 0 | 0 | 1 | 1 | 2 |
| DBMS | 7 | 6 | 1 | 1 | 0 | 0 | 1 | 2 |
| OOP | 4 | 5 | 1 | 1 | 0 | 0 | 1 | 3 |
| OOP | 3 | 2 | 1 | 1 | 0 | 0 | 1 | 3 |
| DBMS | 1 | 2 | 1 | 1 | 0 | 0 | 1 | 2 |

### What was built, and why only two things

Two units had **no decision drill at all** — the "judge this case, get the
reason immediately" component that thirteen other units have. Both were chosen
on marks and on whether the missing interaction had a clear job to do.

**OOP Unit 1 — 20 hrs, 15 marks, the heaviest unit in its subject.**
`dsclassify` asks which structure a situation needs: browser Back, a printer, a
folder tree, bus routes that close into a loop, undo, a ticket queue. Topic 1.5
is classification, and the paper asks it as "which would you use and why", not
as a list to recite. **Not a duplicate of the existing simulator**, which
teaches how a stack and a queue *operate* and contains no tree and no graph.

**OOP Unit 6 — 7 marks, and one distinction is the whole unit.** `polykind` is
the unit's nine-row comparison table applied to code it has not seen. Two of its
six cases are **neither**, and they fail for opposite reasons: a redefinition
with no `virtual` compiles and quietly runs the base version; two functions
differing only in return type do not compile at all. The first is the trap a
paper sets on purpose.

Both walked end to end in a browser — six cases each, every judgement marked
correctly, bilingual option labels stacking rather than running together.

### And a gate, because a drill can vanish silently

A drill is mounted by one attribute. The runtime cannot build a set it does not
have and fails the only way a runtime can — quietly, leaving the heading, the
objective, the how-to-use text and a blank space. A `data-set` naming no set, or
missing entirely, now fails the build. Both modes mutation-tested.

### One thing that did *not* need fixing

Reading a drill button's `textContent` gives `Already in 3NFपहिले नै 3NF मा`,
which looks exactly like the missing-separator defect Phase 3.1 fixed elsewhere.
It is not. Measured in the browser: `.drill-opt .t-ne` is `display: block` and
the two halves occupy separate lines. `textContent` has no line boxes. Recorded
because the next person to run that grep will reach the same wrong conclusion.

---

## 5 · The OOP question bank, audited rather than assumed

Measured against the official grid, not against the fact that it grew.

| Unit | Marks | Before | Now | Per mark | easy / med / hard | Topics |
|---|---:|---:|---:|---:|---|---:|
| 1 Data Structure | 15 | 13 | 13 | 0.87 | 7 / 4 / 2 | 12 |
| 2 OOP using C++ | 14 | 13 | **15** | 1.07 | 4 / 9 / 2 | 14 |
| 3 Class and Object | 2 | 6 | 6 | 3.00 | 3 / 2 / 1 | 6 |
| 4 Abstraction/Encapsulation | 5 | 5 | 5 | 1.00 | 2 / 2 / 1 | 5 |
| 5 Inheritance | 7 | 6 | **7** | 1.00 | 1 / 3 / 3 | 7 |
| 6 Polymorphism | 7 | 6 | 6 | 0.86 | 1 / 3 / 2 | 6 |

**49 → 52 questions. 49 distinct topics. 0 duplicate ids, 0 duplicate prompts,
0 duplicate options within a question, 0 answer indices out of range.**

Three questions added, for one measured reason: the cognitive mix was thinner
than the previous report said. The new ones are a `cin <<` compile error, a
`switch` with no `break`, and reading a private base member from a derived
class. Weighting is now 0.86–1.07 per mark, with Unit 3 deliberately left at
3.00 — its six questions are sound, and deleting good content to improve a
ratio is the wrong trade.

**On `examRelevant`.** Every question carries `examRelevant: true`. The field
means "this topic appears in the written exam", it is **consumed by nothing** —
no build step, no runtime, no test — and **no question anywhere is labelled an
official SEE past question**, because none is one.

### Tests for the draw, which nothing had

`tests/assessment.test.js`, eleven tests. The bank was already guarded; the
**draw** was not, and the draw is what broke in Phase 9.

The test that earns the file is **"over many attempts the draw reaches the whole
bank"**. If the limit were applied before the shuffle rather than after, every
attempt would serve the same twelve questions reordered — each paper still
twelve long, still free of duplicates, still different from the last as a
sequence. **Ten of the eleven tests pass that bug.** Only the union across
attempts sees it. Mutated and confirmed: it fails alone and names the cause.

`getQuiz` now takes `opts.rand`, defaulting to `Math.random`, so a seeded
generator makes a draw reproducible and a test can name the paper it expects.
Production passes nothing; page behaviour is unchanged.

Mutation-tested four ways: `rand` ignored, a copy instead of a swap, limit
before shuffle, and a Fisher-Yates bound off by one. **The last is worth
recording:** with one seed it passed, because the out-of-range index comes up
about once in fifty draws. The permutation check now sweeps thirty seeds.

---

## 6 · Nepali — what was checked, and what was not

Across all **414 Devanagari-bearing lines** Phase 9 added, and the whole corpus.

**Checked mechanically, and passing:** 109 bilingual pairs in the lessons, every
one with both halves and Devanagari in the Nepali half; every quiz prompt and
explanation bilingual; sixteen concepts counted for competing spellings.

**One real inconsistency found and fixed.** "Entity" is an official exam term.
It is written **इन्टिटी 49 times** across the DBMS units and **एन्टिटी 3 times**
in OOP Unit 1's terms table — the same word, same curriculum, same concept. A
student meeting एन्टिटी in Unit 1 and इन्टिटी in DBMS Unit 2 has no way to know
they are the same thing. Same file, same section: कोलम for a column where the
other 157 occurrences say स्तम्भ. Fixed, and pinned by a test.

That test is deliberately narrow, and its first draft shows why: it rejected
इकाई as a third spelling of entity and failed immediately on Digital Design Unit
5 — केन्द्रीय प्रोसेसिङ इकाई, where it means **unit** and is correct. Three other
apparent conflicts are left alone with stated reasons: टेबल inside ट्रुथ टेबल,
हरफ for a line of code against पङ्क्ति for a row, and बाबु for a base class
against अभिभावक for the parent node of a tree.

> **Human review status: NOT PERFORMED.** No Nepali-speaking teacher has read
> this content. No reviewer exists and none is claimed. The Nepali was written
> rather than machine-translated, and every sentence has an English half saying
> the same thing — which is an internal consistency check, not a language
> review. **Whether it reads naturally, and whether it sits at a Grade 10
> reading level, remain unverified.**

---

## 7 · Official source traceability

| | |
|---|---|
| Title | *Secondary Level School Curriculum (Technical and Vocational Stream), Grade 9–12 — Computer Engineering* |
| Year | **2078 BS** |
| Publisher | Curriculum Development Centre, Ministry of Education, Science and Technology, Government of Nepal |
| Listing | `moecdc.gov.np/content/553/` |
| File | `giwmscdnone.gov.np/media/pdf_upload/1694337718_jx35alj.pdf` — 1.03 MB, 321 pages |
| Tables used | *Scope and Sequence of Contents* → `content/syllabus.js`; *Specification Grid* → `content/specification-grid.js` |

**Is 2078 still the applicable reference?** Checked at the source on
**10 November 2026**. The CDC's own listing page for this subject is dated
**1 Mangsir 2082 BS**, links **exactly one file** — the 2078 PDF — and the site
is actively maintained, carrying 2083 BS notices.

- **Established:** the 2078 edition is the only edition CDC publishes for this
  subject.
- **NOT established, and recorded as a limitation in
  `content/specification-grid.js`:** which edition any particular year's SEE
  paper is set from. Nothing reachable from that listing states it. The marks
  should be read as *the published curriculum*, not as *the grid the next paper
  will be built from*.

**Page numbers.** Corrected downwards. They are the position of each grid in the
PDF's content streams; the printed folio was never confirmed — the text
extraction recovers no page markers and the document is served through a canvas
flipbook that cannot be read as text. They now say "approx." and the file
explains what they are. The verification that does hold is better: **every marks
column was re-extracted independently and compared** — Hardware 7/7/9/10/11/6,
DBMS 2/10/6/14/6/6/6, Digital Design 7/15/6/7/15, all unchanged.

**Granularity**, which the Phase 9 report left open, is answered by stating the
rule rather than re-counting. The official lists nest, and the transcription
folds some sub-items and flattens others, choosing per unit whichever matches
how the material is taught: DBMS 2.2's three components are three entries
because each is a symbol to draw; 3.2's six concepts are one entry because they
are one vocabulary on one table. **34 + 21 against 39 is not a mismatch.** The
strings, not the counts, are the contract — `coverage.js` matches on them
exactly. Five numbering errors in the source are recorded in `syllabus.js`
rather than tidied away.

---

## 8 · Verification

| Check | Result |
|---|---|
| Baseline tests | 379 passing, recorded before any change |
| Final tests | **392 passing, 0 failing** |
| Build | passes — 8 subjects, 8 outlines, 34 authored pages, 70 diagrams |
| Determinism | **three consecutive rebuilds byte-identical**, 95 files, md5 `314c3a36…`, working tree clean after each |
| Coverage maps | **4 of 4 subjects, 150 of 150 official topics**, enforced by the build |
| Specification grid | all four subjects agree with `pages.js` unit by unit |
| Internal links | `tests/links.test.js`, 12 passing |
| Horizontal overflow | **zero at 320, 375, 768 and 1440** on all seven changed pages |
| Truth tables at 320 px | 560 px wide inside a 286 px `.tablewrap`, `overflow-x: auto` — scroll inside, no page scroll |
| Drill touch target | 44 px |
| Console errors | **none** on any changed page |
| Language modes | Bilingual / English / Nepali correct on the new DD prose, the new DBMS prose and both drills |
| New interactions | both drills walked through all six cases; every judgement marked correctly; the new prediction marks and explains |
| Quiz | built page draws 12 of 52, shuffled; pinned by a test |

### Gates added, all mutation-tested

| Gate | Mutation | Result |
|---|---|---|
| Coverage — missing topic | removed `'Database Schema'` | build fails, topic named |
| Coverage — dangling anchor **inside an array** | `db-t42` → `db-t42-gone` | build fails, anchor named |
| Coverage — stale entry | `Code converters` → `Code convertors` | build fails **twice**, both directions |
| Authored subject must have a map | disabled the DBMS map | test fails |
| Drill mount — bad set | `dsclassify` → `dsclassifys` | build fails, known sets listed |
| Drill mount — no `data-set` | attribute removed | build fails |
| Draw — determinism | `rand` ignored | test fails |
| Draw — duplicates | copy instead of swap | **four** tests fail |
| Draw — limit before shuffle | blocks reordered | one test fails, names the cause |
| Terminology | एन्टिटी restored | test fails, names the file |

### Not claimed

- **No screen reader was run. WCAG 2.1 AA is not claimed.**
- Responsiveness and console cleanliness were measured on the **seven changed
  pages**, not on all 36. No platform-wide claim is made.
- No frame rate is quoted; the environment throttles `requestAnimationFrame`.

---

## 9 · Definition of done

| # | Criterion | Status |
|---|---|---|
| 1 | DBMS has a verified topic-level coverage map | **Done** — 39/39, build-gated |
| 2 | Digital Design has a verified topic-level coverage map | **Done** — 39/39, build-gated |
| 3 | OOP and Hardware coverage remain valid | **Done** — 35/35 and 37/37, still passing |
| 4 | All four maps traceable to official source | **Done** — §7, with the cohort limitation written down |
| 5 | Under-interactive units reviewed, justified improvements made | **Done** — §4; two drills built, eight units left at PRAC 1 with the matrix published |
| 6 | Question bank passed a meaningful quality audit | **Done** — §5 |
| 7 | Assessment selection has automated tests | **Done** — 11 tests, 4 mutations |
| 8 | New Nepali checked, human-review status documented | **Done** — §6; human review **not performed** and not claimed |
| 9 | Curriculum and question-bank validators work | **Done** — all ten gates mutation-tested |
| 10 | Existing functionality intact | **Done** — 379 → 392, none removed, none weakened |
| 11 | Tests and production build pass | **Done** |
| 12 | Remaining limitations documented honestly | **Done** — §10 |

---

## 10 · What is still open

| Item | Status |
|---|---|
| **Nepali read by a native speaker** | **Not done.** The single largest remaining gap, and the only one no test can close. |
| **Eight units at one practice component** | **Measured, published, not addressed.** Led by Hardware Unit 3 at 9 marks. The matrix in §4 is the queue. |
| **Screen-reader verification** | **Not performed.** No WCAG claim. |
| **Platform-wide responsive check** | Seven changed pages measured; the other 29 pages were last measured in Phase 5. |
| **Printed folio for each Specification Grid** | **Unconfirmed**, and now labelled as such rather than stated as a citation. |
| **Which curriculum edition the SEE is set from** | **Cannot be established** from any public CDC document. Recorded in `specification-grid.js`. |
| **Grade 9** | Four subjects outlined, none authored. Out of scope by instruction. |

## 11 · Commits

| Hash | What |
|---|---|
| `0337188` | DBMS + Digital Design coverage maps; Entity Set and WITH filled; multi-anchor entries; the opt-in test |
| `0541d68` | Digital Design 4.3–4.10 — four definitions, two truth tables, one prediction |
| `bd2eeb3` | `dsclassify` and `polykind` drills; the drill-mount build gate; the interaction matrix |
| `6eb28f4` | `tests/assessment.test.js`; `opts.rand`; three questions; `LANGUAGE-SYSTEM` §10 corrected |
| `30ec0b8` | Source traceability — provenance, granularity rule, page citations corrected, cohort limitation |
| `33bd8d0` | Nepali terminology review, इन्टिटी/स्तम्भ fixed and pinned, human-review status recorded |

**Branch `phase-9-curriculum-integrity`. Not merged. Not pushed. Not deployed.**

## 12 · Recommended next action

**Get the Nepali read by a Nepali-speaking teacher.** It is now the only item on
the list that no amount of further engineering can close, it affects every page
a student reads in Nepali, and the work is bounded: the content exists, it is
complete, and it is internally consistent. Everything else here can be checked
by a build.

After that: Hardware Unit 3, at 9 marks the heaviest of the eight units still at
one practice component.
