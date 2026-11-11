# Nepali review — status ledger

**Every item is `Pending review`. No human review has taken place.**

No Nepali-speaking teacher has read any of this content. No reviewer has been
engaged, named or approached. This file exists so that when one does, the result
has somewhere to go that is not a claim in a report.

---

## 1 · The package

| | |
|---|---|
| Request document | [`NEPALI-REVIEW-PACKAGE.html`](NEPALI-REVIEW-PACKAGE.html) — open in any browser, works offline |
| Per-item data | `nepali-review-items.json` — the same content, keyed by pair id and occurrence id |
| Generator | `tools/nepali-review.js` — regenerate with `node tools/nepali-review.js` |
| Extraction | `tools/nepali-bilingual.js` — the parser, and the list of shapes it cannot read |
| Distinct translations | **4,438** |
| Occurrences of them | **4,905** |
| New since the baseline commit `72e8bc5` | **1,876** translations, 1,924 occurrences |
| Human-reviewed | **0** |
| Nepali in the source that reaches no reviewer | **52 strings**, all listed by `node tools/nepali-review.js --audit` |

The package is generated from the content, never hand-written, so it cannot
drift from what the site actually shows. Regenerate it before sending it to
anyone.

### Two numbers, and why both are printed

A **translation** is one Nepali text. A reviewer reads it once, so the number of
translations is the size of the job: **4,438**.

An **occurrence** is one place a translation is used — a subject, a unit, a
topic, a file. The platform has **4,905** of them, because 165 translations are
used in more than one place and **64 are shared between different subjects**.

These are not interchangeable and the package no longer prints one of them as
though it were both. The previous ledger said "2,603 items", which was neither:
it was occurrences after some had been silently merged into each other. §2 of
the Phase 13.1 report has the reconciliation.

### What an item carries

Subject · unit · marks · topic heading · kind · source file · reference inside
that file · the English text · the Nepali text · the technical terms left in
Latin script · whether the same Nepali is used elsewhere and where · whether a
number or name is interpolated into it at run time · a status · a field to write
in.

### The four statuses

| Status | Meaning |
|---|---|
| **Pending review** | No one has read it. **All 4,905 occurrences are here.** |
| **Reviewed — accepted** | A Nepali-speaking teacher read it and it is fine as it stands. |
| **Reviewed — correction required** | Read, and wrong or unnatural. The reviewer's note says how. |
| **Corrected — awaiting re-review** | The correction has been applied to the source and needs confirming. |

Status is per **occurrence**, not per translation, because a sentence that reads
well in one unit can read wrongly in another and that is the commonest real
outcome for a reused string. It is carried forward across regeneration by
`carryStatus()`, keyed on occurrence id with a fall-back to pair id. Nothing in
the generator can raise the human-reviewed count; it only ever copies a status
that was already recorded by hand.

---

## 2 · Ledger

Counts per unit, read out of the generated JSON rather than typed. Every cell in
the four right-hand columns starts at zero.

A row like **"Hardware · 2, 3"** is a simulator mounted on two of that subject's
pages. A row under two different subjects for the same file — `sim-parts.js`
appears under both Grade 9 Unit 2 and Hardware Unit 2 — is the same translation
occurring in both, listed in both, which is the point of §1's two numbers.

| Subject | Unit | Marks | Occurrences | Translations | New since baseline | Pending | Accepted | Correction req. | Corrected |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Shared interface | — | — | 100 | 98 | 27 | 100 | 0 | 0 | 0 |
| DBMS | — (subject title) | — | 16 | 10 | 0 | 16 | 0 | 0 | 0 |
| DBMS | 1 Introduction to Database System | 2 | 88 | 87 | 0 | 88 | 0 | 0 | 0 |
| DBMS | 2 Entity Relationship Model (ER-Model) | 10 | 137 | 135 | 5 | 137 | 0 | 0 | 0 |
| DBMS | 2, 3, 4 (the table simulator) | 10 | 34 | 33 | 5 | 34 | 0 | 0 | 0 |
| DBMS | 3 Relational Model | 6 | 86 | 86 | 0 | 86 | 0 | 0 | 0 |
| DBMS | 4 SQL — Structured Query Language | 14 | 168 | 167 | 49 | 168 | 0 | 0 | 0 |
| DBMS | 5 Relational Database Design | 6 | 114 | 114 | 2 | 114 | 0 | 0 | 0 |
| DBMS | 6 Database Transaction | 6 | 95 | 95 | 1 | 95 | 0 | 0 | 0 |
| DBMS | 7 Database Backup, Recovery and Security | 6 | 91 | 91 | 0 | 91 | 0 | 0 | 0 |
| Digital Design | — (subject title) | — | 12 | 7 | 0 | 12 | 0 | 0 | 0 |
| Digital Design | 1 Number System and Binary Arithmetic | 7 | 152 | 150 | 3 | 152 | 0 | 0 | 0 |
| Digital Design | 2 Concept of Logic Gates | 15 | 204 | 198 | 0 | 204 | 0 | 0 | 0 |
| Digital Design | 3 Boolean Algebra and Karnaugh Map | 6 | 110 | 110 | 7 | 110 | 0 | 0 | 0 |
| Digital Design | 4 Binary Arithmetic and Combinational Logic | 7 | 121 | 121 | 6 | 121 | 0 | 0 | 0 |
| Digital Design | 5 Introduction to Microprocessor | 15 | 142 | 138 | 0 | 142 | 0 | 0 | 0 |
| Hardware | — (subject title) | — | 14 | 9 | 0 | 14 | 0 | 0 | 0 |
| Hardware | 1 Introduction to Electronic Devices | 7 | 76 | 76 | 0 | 76 | 0 | 0 | 0 |
| Hardware | 2 Introduction to Computer System | 7 | 64 | 64 | 0 | 64 | 0 | 0 | 0 |
| Hardware | 2, 3 (the parts lab) | 7 | 28 | 28 | 0 | 28 | 0 | 0 | 0 |
| Hardware | 3 Overview on System's Core | 9 | 79 | 79 | 0 | 79 | 0 | 0 | 0 |
| Hardware | 4 Troubleshooting Techniques | 10 | 123 | 119 | 0 | 123 | 0 | 0 | 0 |
| Hardware | 4, 5 (the fault tree) | 10 | 47 | 47 | 1 | 47 | 0 | 0 | 0 |
| Hardware | 5 Repair and Maintenance | 11 | 101 | 101 | 0 | 101 | 0 | 0 | 0 |
| Hardware | 6 Backup and Recovery | 6 | 120 | 118 | 0 | 120 | 0 | 0 | 0 |
| DS & OOP | — (subject title) | — | 16 | 10 | 0 | 16 | 0 | 0 | 0 |
| DS & OOP | 1 Basic Introduction to Data Structure | 15 | 184 | 178 | 79 | 184 | 0 | 0 | 0 |
| DS & OOP | 2 Concept of OOP using C++ | 14 | 157 | 154 | 66 | 157 | 0 | 0 | 0 |
| DS & OOP | 3 Class and Object | 2 | 69 | 69 | 7 | 69 | 0 | 0 | 0 |
| DS & OOP | 4 Abstraction and Encapsulation | 5 | 68 | 68 | 26 | 68 | 0 | 0 | 0 |
| DS & OOP | 5 Inheritance | 7 | 124 | 121 | 25 | 124 | 0 | 0 | 0 |
| DS & OOP | 6 Polymorphism | 7 | 99 | 99 | 45 | 99 | 0 | 0 | 0 |
| DS & OOP | ▶ Trace a Full Program | — | 57 | 57 | 40 | 57 | 0 | 0 | 0 |
| C Programming (Grade 9) | — (subject title) | — | 16 | 9 | 0 | 16 | 0 | 0 | 0 |
| C Programming (Grade 9) | 1 Principles of Programming | 5 | 89 | 88 | 83 | 89 | 0 | 0 | 0 |
| C Programming (Grade 9) | 2 Fundamentals of C | 7 | 143 | 139 | 131 | 143 | 0 | 0 | 0 |
| C Programming (Grade 9) | 2 – 7 (the program stepper) | 7 | 7 | 7 | 6 | 7 | 0 | 0 | 0 |
| C Programming (Grade 9) | 3 Control Flow Statements | 13 | 209 | 206 | 186 | 209 | 0 | 0 | 0 |
| C Programming (Grade 9) | 4 Functions | 10 | 185 | 182 | 176 | 185 | 0 | 0 | 0 |
| C Programming (Grade 9) | 5 Arrays & Strings | 8 | 170 | 166 | 147 | 170 | 0 | 0 | 0 |
| C Programming (Grade 9) | 6 Structure and Union | 5 | 91 | 90 | 85 | 91 | 0 | 0 | 0 |
| C Programming (Grade 9) | 7 Pointers | 2 | 88 | 86 | 80 | 88 | 0 | 0 | 0 |
| Computer Fundamentals (Grade 9) | — (subject title) | — | 16 | 10 | 1 | 16 | 0 | 0 | 0 |
| Computer Fundamentals (Grade 9) | 1 Introduction to Computer | 6 | 131 | 131 | 115 | 131 | 0 | 0 | 0 |
| Computer Fundamentals (Grade 9) | 2 Computer Components | 7 | 120 | 120 | 83 | 120 | 0 | 0 | 0 |
| Computer Fundamentals (Grade 9) | 3 Computer Software | 9 | 101 | 101 | 95 | 101 | 0 | 0 | 0 |
| Computer Fundamentals (Grade 9) | 4 Memory / Storage Unit | 8 | 100 | 100 | 91 | 100 | 0 | 0 | 0 |
| Computer Fundamentals (Grade 9) | 5 Internet and its Application | 8 | 83 | 83 | 77 | 83 | 0 | 0 | 0 |
| Computer Fundamentals (Grade 9) | 6 Multimedia | 6 | 78 | 78 | 71 | 78 | 0 | 0 | 0 |
| Computer Fundamentals (Grade 9) | 7 Emerging Technology | 6 | 109 | 109 | 103 | 109 | 0 | 0 | 0 |
| Electro-System (Grade 9, outline) | — (subject title) | — | 7 | 7 | 0 | 7 | 0 | 0 | 0 |
| Website Design (Grade 9, outline) | — (subject title) | — | 6 | 6 | 0 | 6 | 0 | 0 | 0 |
| Diagrams no lesson uses | — | — | 52 | 52 | 0 | 52 | 0 | 0 | 0 |
| Simulators no page mounts | — | — | 8 | 8 | 0 | 8 | 0 | 0 | 0 |
| **Total** | | | **4,905** | **4,438** | **1,924** | **4,905** | **0** | **0** | **0** |

The translations column does not add to 4,438: a translation shared between two
units is counted in both rows. 4,438 is the number of distinct texts across the
whole table.

> **Programming Principles in C now accounts for 998 occurrences, and all but
> seven of them are new content.** This is the opposite of the previous phase's
> increase and the difference matters to a reviewer planning their time. The
> subject went from a seven-line syllabus outline to a written subject: seven
> lessons, 63 quiz questions, three faded practice skills, fourteen stepper
> programs and eleven decision drills. Every Nepali sentence in those 998
> occurrences bar the seven outline lines was written in Phase 14, corrected in
> Phase 14.1 — where a stepper narrated a variable changing on the wrong line,
> where a stepper printed a string length with the wrong conversion specifier,
> and where a worked example called a compiler warning an error — and read by
> nobody.
>
> Two smaller things moved with it. The extractor gained the
> `content/programs/` directory, so the stepper's captions are collected and
> attributed like any other content rather than being invisible Nepali inside a
> runtime module. And `unquote()` in `tools/nepali-bilingual.js` was reading
> `\\n` — the escape sequence a C lesson has to be able to write — as a
> newline, which made one correctly paired question report as unpaired. Both
> are why the unreachable count went **down**, from 56 to 52, in a phase that
> added a subject.

> **Phase 13.1 raised this ledger from 2,603 occurrences to 3,914, and none of
> that is new content.** Phase 13.1 authored no Nepali. All 1,311 added
> occurrences were already in the product and already being read by students.
> They were not in the package because the generator had never read the files
> they live in.
>
> What it had read: lesson HTML, question banks, `sim-drill.js`, and
> `services/strings.js`. What it had not: every other runtime module (707
> pairs — every simulator's narration, the quiz's score messages, the trace
> stepper's commentary), the four **guided practice banks** (257 pairs of
> taught content, each already carrying its own subject and unit), the
> prerequisite graph, the Nepali heading table, the animated diagrams'
> narration, the curriculum's own unit titles, and the Nepali paragraphs the
> build writes onto the homepage.
>
> Measured against Devanagari string literals in the shipped source rather than
> against itself — the same census, the same content, the two extractors — the
> package held **1,505 of 2,582, or 58.3%**, of the platform's Nepali before
> that phase and **2,526, or 97.8%**, after it, leaving 56 strings outside. The
> current figure is the one in §1 above; whatever it is, the strings are listed
> individually by `node tools/nepali-review.js --audit` and
> `tests/nepali-review.test.js` fails if the number grows.
>
> **The "five Grade 10 items lost to re-attribution" in the Phase 13 report was
> an under-count, and they were not re-attributed — they were deleted from the
> package.** The generator deduplicated on `id + kind`, where `id` is a hash of
> the Nepali alone. Two quiz options with the same Nepali collapsed into one
> whatever subject, unit or question they belonged to. In the question banks
> alone that collapsed 40 occurrences, 16 of them across a subject boundary. Five
> moved in Phase 13; **eleven predate it and nobody had noticed.** A Digital
> Design reviewer could not see that question 406 offers `१६` as an option,
> because an identical option elsewhere had won the key. Every one of the 16 is
> now back, and `tests/nepali-review.test.js` names them individually.

---

## 3 · Suggested order, if a reviewer's time is limited

1. **Programming Principles in C — 995 occurrences, Phases 14 and 14.1.**
   The newest subject and the one with the most at stake: it is Grade 9's first
   subject in the official order, it was written in one phase, and every
   sentence of its Nepali is one person's first draft. Within it, start with
   **Unit 3 (201 occurrences, 13 of the 50 marks)** and **Unit 4 (185
   occurrences, 10 marks)**, which carry nearly half the paper between them.
   Then the **step captions of the fourteen stepper programs**: those sentences
   are read one at a time while a student watches a variable change, so a
   confusing one is confusing at exactly the moment understanding is forming.
2. **Grade 9 Units 2–7 of Computer and Application — 591 occurrences, the whole
   of Phase 13.** Also a complete subject a student would be taught from, and
   also read by nobody. Within it, start with the **practical briefs and the
   exam-connect blocks**: these are the passages that talk about marks, record
   keeping and what a supervisor will ask. A mistranslation in an explanation
   costs a student understanding; a mistranslation about what the examiner wants
   costs them marks.
3. **Grade 9 Unit 7 (Emerging Technology) — 109 occurrences, the largest unit.**
   It carries the newest vocabulary on the site: cloud, IoT, AI, virtual
   reality, and the cryptography topic. Several of these terms have no settled
   Nepali rendering, so the choices here are the least defensible.
4. **The 64 translations shared between subjects.** These are the items most
   likely to be wrong in one place and right in another, and they were invisible
   until Phase 13.1. The package marks each one and lists the other subjects it
   appears in.
5. **The simulator and stepper narration — 479 occurrences.** Never reviewed,
   and never even *offered* for review before Phase 13.1. It is the text a
   student reads while watching something happen, which is where a confusing
   sentence does the most damage.
6. **The shared interface labels — 100 occurrences**, read on every page by
   every student.

### Historical: the Phase 9 set

The package's filter button now reads "new since the baseline" rather than
"added in Phase 9", because the baseline commit `72e8bc5` is where Phase 9
started and everything since has accumulated behind that one label: 1,862
translations, which is Phases 9 through 14 together and not Phase 9's 217.

## 4 · Questions worth asking the reviewer explicitly

These are decisions taken without a native speaker, and each could reasonably
have gone the other way:

1. **Technical terms are left in Latin script inside Nepali sentences** —
   `compile`, `pointer`, `virtual`, `WHERE`, `borrow`, `Plaintext`,
   `Ciphertext`, `key`, `cloud`, `IoT`. Is that what a Nepali teacher does in
   class, or should some be rendered in Devanagari?
2. **इन्टिटी was chosen over एन्टिटी** for *entity*, on a corpus count of 49
   against 3, and is now pinned by a test. Is इन्टिटी the better word?
3. **बाबु / छोरा** (father / son) for base and derived classes, against
   **अभिभावक** for the parent node of a tree. Deliberately two metaphors. Does
   that read naturally, or is it jarring?
4. **Register conventions.** Instructions use `-नुहोस्`. Is that the right level
   of formality for a Grade 9 and Grade 10 textbook?
5. **Numerals.** Devanagari digits (०, १, २) appear in some Nepali sentences and
   Latin digits in others, usually where the value is part of a code expression.
   Is the split sensible?
6. **Grade 9 register against Grade 10.** Grade 9 Units 2–7 were written for a
   younger student than the Grade 10 subjects. Does the Nepali actually read
   more simply, or only the English?
7. **New in Phase 13.1: 22 translations stand in for more than one English
   text.** The package marks each one and shows the other English. One Nepali
   sentence doing two jobs usually fits neither — but some of these are a
   repeated UI label and are fine. Which are which?
8. **New in Phase 13.1: sentences with a number interpolated into them.** The
   simulators build sentences like `यहाँ {…} प्रश्न बाँकी छ।`, where the value
   arrives at run time. Nepali and English put the number in different places
   and take different agreement. The package marks every such item.

## 5 · How a returned review is applied

1. Put the reviewer's answers into `nepali-review-items.json` — set each
   occurrence's `status` and add a `reviewNote`.
2. Apply corrections **to the source** under `_source/`, never to the package.
3. `node tools/nepali-review.js` to regenerate; `npm run build && npm test`.
4. Update the ledger above, and mark corrected items
   `Corrected — awaiting re-review` until the reviewer confirms.

A verdict set in step 1 survives step 3: `carryStatus()` reads the previous
ledger before overwriting it and copies forward every status that is not
`pending-review`, keyed by `occId`. `tests/nepali-review.test.js` holds that
property, and holds the complementary one — that nothing can produce a
`human-reviewed` status for an item that did not already have one.

The pair `id` is derived from the Nepali text, so **correcting a translation
changes its id**. That is deliberate: a corrected string is a new string and
must not silently inherit an "accepted" status. The note should record the old
id. The `occId` also changes, because it is derived from the pair id — so a
correction loses its verdict by design, and that is the one case where the
carry-forward deliberately does not apply.

---

## 6 · What this file does not say

It does not say the Nepali is good. It does not say it is bad. **It says nobody
qualified has looked**, and it is organised so that the moment somebody does,
the result is recorded rather than summarised.

Phase 13.1 made the package complete enough to be worth someone's time. It did
not review anything, and extraction tests passing is not evidence about Nepali.

Phases 14 and 14.1 then added 995 occurrences of brand-new Nepali to it. The package is
now larger and no more reviewed than it was, which is the honest summary: the
backlog grew by a fifth in one phase because a subject was written, and writing
is not reviewing.

---

## 7 · What still reaches no reviewer — 52 strings

The gap that §7 used to describe was "four runtime modules write bilingual
strings inline, and those 21 pairs are not in the package". That was true and
far too small: the real figure was **1,077 Devanagari string literals**, and the
inline `bi()` calls were 21 of them. Phase 13.1 closed 1,021.

What is left, every one listed with its file and line by
`node tools/nepali-review.js --audit`:

| Where | Strings | Why |
|---|---:|---|
| `_source/build/index.js` | 13 | The homepage's Nepali paragraphs, written in template literals with the figures interpolated. The two halves are sibling `<div>` blocks rather than a pair, so they need the lesson collector's logic applied to a template string. |
| `_source/runtime/sql-engine.js` | 9 | JOIN explanations assembled from fragments across more than two arguments. |
| `_source/runtime/sim-number.js` | 7 | Binary-addition narration built from fragments, with the English assembled in a different order from the Nepali. |
| `_source/runtime/sim-kmap.js` | 4 | Grouping explanations, same shape. |
| `_source/runtime/trace.js` | 4 | Three intro strings and one step label. |
| `_source/runtime/sim-8085.js` | 3 | Three block labels on the CPU diagram. |
| `_source/runtime/sim-concurrency.js` | 3 | Three column headings. |
| `_source/runtime/sim-stackqueue.js` | 2 | Two reset messages with a value interpolated. |
| others | 7 | One each, across seven files. |

Phase 14 added a subject and the figure went **down**, from 56 to 52. Two
changes did it, and neither was content: the extractor now reads
`_source/content/programs/`, where the C stepper's captions live, and
`unquote()` no longer mistakes the `\\n` in a lesson about escape sequences for
a newline. Three strings in `build/context.js` that the previous ledger listed
were paired by the second of those.

A further 16 Devanagari fragments — `'०'` to `'९'` in `practical.js`'s digit
table, `'र'` waiting to be concatenated into a sentence — are excluded from the
count. They are not sentences a reviewer can judge, and counting them as missing
content would overstate the gap.

`tests/nepali-review.test.js` records an allowance, not a target: it fails
if the figure grows, so new Nepali written somewhere the extractor cannot read
is caught at `npm test` rather than discovered by a reviewer's absence of
comment. The same test asserts that coverage stays above 97%.

`_source/runtime/practical.js` remains the model: it routes every string through
`UIStrings`, so its labels are captured in the shared-interface row with no
parsing at all. Moving the other modules' strings into `strings.js` would still
be the better fix, and is still an edit to Grade 10 runtime that no phase has
been authorised to make.
