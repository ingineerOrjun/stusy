# Grade 9 · Programming Principles and Concept in C Language — curriculum map

The mapping Phase 14 was built from. Written **before** any lesson, because a
subject authored first and mapped afterwards is a subject whose gaps are
discovered by a student.

---

## 1 · The source, and how it was verified

| | |
|---|---|
| Document | *Secondary Level School Curriculum (Technical and Vocational Stream), Grade 9-12 — Computer Engineering* |
| Authority | Curriculum Development Centre, MoEST, Government of Nepal |
| Edition | 2078 BS |
| File | `giwmscdnone.gov.np/media/pdf_upload/1694337718_jx35alj.pdf` — 1,072,865 bytes, 321 pages |
| Listing | `moecdc.gov.np/content/553/` |

**The PDF was downloaded and read for this phase**, not taken on trust from
the repository's transcription. Text was extracted from the content streams
directly (`zlib` inflate, text-showing operators) rather than re-typed. The
subject occupies printed pages 1–9, which are PDF pages 5–13; the contents
page confirms "Programming principal & concept in C Language … 1".

Four tables were read:

| Table | Printed page | PDF page |
|---|---:|---:|
| Introduction and competencies | 1–2 | 5–6 |
| Grade-wise learning outcomes | 2–3 | 6–7 |
| **Scope and sequence (theory)** | 4–5 | 8–9 |
| **Suggested practical and project works** | 6 | 10 |
| Student evaluation | 7–8 | 11–12 |
| **Specification grid** | 9 | 13 |

The scope-and-sequence table is the authoritative list where it disagrees
with the learning outcomes beside it — the convention this repository already
follows (`_source/content/syllabus.js` header).

### What the verification found

**Every figure in the repository's existing transcription is correct.**

| Figure | Repo | PDF | |
|---|---:|---:|---|
| Units | 7 | 7 | ✓ |
| Official numbered topics | 35 | 35 | ✓ |
| Theory hours | 64 | 64 | ✓ |
| External marks | 50 | 50 | ✓ |
| Per-unit hours | 6·10·16·12·10·6·4 | 6·10·16·12·10·6·4 | ✓ |
| Per-unit marks | 5·7·13·10·8·5·2 | 5·7·13·10·8·5·2 | ✓ |

The specification grid row reads
`6 10 16 12 10 6 4` for credit hours and `5 7 13 10 8 5 2` for marks,
totalling 64 and 50 — the same values `_source/content/specification-grid.js`
has carried since Phase 11.

### The external paper's own structure — newly transcribed

The grid's column totals, which are published for the whole paper rather than
per unit:

| Question type | Number | Marks each | Total |
|---|---:|---:|---:|
| Multiple choice | 9 | 1 | 9 |
| Short answer | 5 | 5 | 25 |
| Long answer | 2 | 8 | 16 |
| **Total** | **16** | | **50** |

Split by Bloom band across the whole paper: knowledge and understanding
4 MCQ / 2 short / 1 long; application 1 / 1 / 1; higher ability 4 / 2 / 0.

This is **not** recorded per unit and has not been invented per unit. It is
transcribed here because it is what the lessons' `.examq` practice questions
are shaped against — 2-mark and 4-mark parts of a 5-mark short answer, and
one 8-mark long answer per heavy unit.

### Three source-document observations, recorded not corrected

| # | Observation |
|---|---|
| G9C-O1 | The practical-activities table is headed **"Unit / Grade 11 / Scope / Practical Activities / Hrs."** inside the Grade 9 subject. A header typo in the source; the activities themselves are plainly Grade 9 C work. |
| G9C-O2 | Learning outcome **5.4** names `gets()` and `puts()`. The scope-and-sequence list does not. The scope and sequence is authoritative, so neither function is an official topic — both are mentioned in the lesson as context, clearly marked as not on the topic list. `gets()` is additionally **removed from the C standard** (C11) and the lesson says so. |
| G9C-O3 | Scope item **5.3** reads "Introduction to One-Dimensional Array"; the repository's outline string is `One-Dimensional Array`. A transcription shortening that predates this phase. The *coverage map matches on the repository string*, so changing it would be a cross-phase edit with no learning gain; recorded here instead. |

### Practical hours

The subject header reads "Credit hrs: 4 / Working hrs: 128". The 64 theory
hours in the scope and sequence are **half the subject**; the practical table
carries its own 64:

| Unit | 1 | 2 | 3 | 4 | 5 | 6 | 7 | Total |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Practical hrs | 2 | 3 | 15 | 15 | 15 | 7 | 7 | **64** |

64 + 64 = 128. This is the same structure Phase 12 verified for Fundamentals
of Computer and Application, and the per-unit numbers are **different** —
which is why they are read per subject rather than assumed.

> **Not transcribed into `specification-grid.js`.** The existing
> `practicalHours` key is only populated for `grade9/computer-fundamentals`.
> Phase 14 adds it for this subject too, from the table above.

---

## 2 · The 35 official topics

Status vocabulary is the repository's own, derived by
`tools/grade9-spec.js` from the coverage map, the question bank and the
`data-practical` ids — never declared by hand.

### Unit 1 — Principles of Programming · 6 hrs · 5 marks · 2 practical hrs

| # | Official topic | Learning outcome (PDF p.2) | Anchor |
|---|---|---|---|
| 1.1 | Introduction to Programming (Program, Programmer, Programming Language, Software) | 1.1 Illustrate the terms program, programmer, programming language and software | `c-t11` |
| 1.2 | Categories of Programming Language | 1.2 Describe the categories of programming language | `c-t12` |
| 1.3 | Applications — Scientific Application, Business Application | 1.3 Elaborate the programming dimension such as scientific application, business application | `c-t13` |
| 1.4 | Program Design Tools (Algorithm and Flowchart) | 1.4 Explain the program design tools (algorithm and flowchart) | `c-t14` |

Practical: **1 activity** — familiarisation with programming IDE tools
(Visual Studio, DEV C++, Sublime Text, Atom).

### Unit 2 — Fundamentals of C · 10 hrs · 7 marks · 3 practical hrs

| # | Official topic | Anchor |
|---|---|---|
| 2.1 | Introduction to C Programming | `c-t21` |
| 2.2 | Basic Program Structure (Preprocessor Directive, Header Files, Tokens, Semicolons, Comments, Identifiers, Whitespace, Escape Sequence) | `c-t22` |
| 2.3 | Variables and Keywords | `c-t23` |
| 2.4 | Character Sets, Constants and Variables | `c-t24` |
| 2.5 | Data Types and Format Specifiers | `c-t25` |
| 2.6 | Input / Output statements | `c-t26` |
| 2.7 | Operators in C (Arithmetic, Relational, Logical, Bitwise, Assignment) | `c-t27` |

Practical: **1 activity** — write a program to display `HELLO WORLD!`.

> 2.7 is the topic Phase 11 moved. The source reads
> `2.6 Input/ Output statements 2.7 Operators in C (…)10 3Control Flow
> Statements` — the `10` is Unit 2's hour count, so 2.7 closes Unit 2.
> Re-verified against the PDF for this phase: **confirmed, Unit 2.**

### Unit 3 — Control Flow Statements · 16 hrs · 13 marks · 15 practical hrs

| # | Official topic | Sub-items folded in | Anchor |
|---|---|---|---|
| 3.1 | Decision Making Statements — if, if…else, switch | 3.1.1 If, 3.1.2 If-else, 3.1.3 Switch | `c-t31` |
| 3.2 | Loop Statements — for, while, do-while, nested loops | 3.2.1 For, 3.2.2 While, 3.2.3 Do-while, 3.2.4 Nested | `c-t32` |
| 3.3 | Jump Statements — break, continue, goto, return | 3.3.1 Break, 3.3.2 Continue, 3.3.3 Goto, 3.3.4 Return | `c-t33` |

Practical: **2 activities** — programs implementing sequential structure;
programs implementing conditional and iterative structure.

The heaviest unit in the subject: 16 of 64 hours, 13 of 50 marks, and 15 of
the 64 practical hours. Three official topics across that weight, so the
lesson splits each into its own sub-sections while the **coverage map keeps
one anchor per official string**.

### Unit 4 — Functions · 12 hrs · 10 marks · 15 practical hrs

| # | Official topic | Anchor |
|---|---|---|
| 4.1 | Introduction to Function | `c-t41` |
| 4.2 | Declaration, Definition and Calling of a Function | `c-t42` |
| 4.3 | Types of Functions — Library Function, User-Defined Function | `c-t43` |
| 4.4 | Types of Function Call — Call by Value, Call by Reference | `c-t44` |
| 4.5 | Concept of Recursive Functions | `c-t45` |
| 4.6 | Advantages of Functions | `c-t46` |

Practical: **2 activities** — programs using functions; a simple program to
familiarise recursive functions.

### Unit 5 — Arrays & Strings · 10 hrs · 8 marks · 15 practical hrs

| # | Official topic | Anchor |
|---|---|---|
| 5.1 | Introduction to Array & String | `c-t51` |
| 5.2 | Declaration and Initialization of Array | `c-t52` |
| 5.3 | One-Dimensional Array | `c-t53` |
| 5.4 | Declaration of String | `c-t54` |
| 5.5 | String Functions — strlen(), strcpy(), strcat(), strcmp(), strrev(), strlwr(), strupr() | `c-t55` |

Practical: **2 activities** — programs using arrays (sorting a list);
programs using strings.

> **5.5 names four standard functions and three that are not.**
> `strlen`, `strcpy`, `strcat` and `strcmp` are in `<string.h>` in every
> conforming C implementation. `strrev`, `strlwr` and `strupr` are **not in
> the C standard** — they are Turbo C / Microsoft extensions, absent from
> glibc, so a program using them compiles on DEV C++ and fails on Linux.
> They are examinable and they are taught, with that distinction stated on
> the page. This is §6 of the phase brief — *clearly distinguish standard C
> behaviour from compiler-specific behaviour* — and it is the single most
> useful thing this unit can tell a student who later moves to a real
> toolchain.

### Unit 6 — Structure and Union · 6 hrs · 5 marks · 7 practical hrs

| # | Official topic | Anchor |
|---|---|---|
| 6.1 | Introduction to Structure | `c-t61` |
| 6.2 | Declaration of Structure and Structure Variable | `c-t62` |
| 6.3 | Accessing Member of Structure | `c-t63` |
| 6.4 | Introduction to Union | `c-t64` |
| 6.5 | Declaration of Union and Union Variable | `c-t65` |
| 6.6 | Accessing Member of Union | `c-t66` |

Practical: **1 activity** — programs using structure and union.

### Unit 7 — Pointers · 4 hrs · 2 marks · 7 practical hrs

| # | Official topic | Anchor |
|---|---|---|
| 7.1 | Introduction to Pointer | `c-t71` |
| 7.2 | Declaring Pointer and Pointer Variable | `c-t72` |
| 7.3 | Referencing and Dereferencing | `c-t73` |
| 7.4 | Advantages of Pointer | `c-t74` |

Practical: **1 activity** — programs using pointers (`*`, `&`).

> **The weighting is unusual and worth naming.** Unit 7 carries 2 of 50
> external marks and 7 of 64 practical hours. It is the lightest unit on
> paper and not a light unit in practice: Unit 4's call by reference cannot
> be explained without `&` and `*`. The lesson teaches it honestly and the
> exam-focus panel says plainly that two marks is what it is worth.

---

## 3 · Teaching order and prerequisites

The official order is also a sound teaching order, which is not always true
of a curriculum. The one real tension is that **4.4 Call by Reference needs
Unit 7's pointers**, four units early.

Resolved the way the subject itself resolves it: Unit 4 introduces `&` and
`*` as *the two operators it needs and no more*, names Unit 7 as where they
are properly taught, and Unit 7's prerequisite block points back. Both
directions are recorded in `_source/content/prerequisites.js`, with the
reason written for a student who is currently stuck rather than as a summary.

```
u1 ──▶ u2 ──▶ u3 ──▶ u4 ──▶ u5
                      │       │
                      └──▶ u6 ┘
                            │
                            ▼
                           u7 ◀── (u4 borrows & and *)
```

---

## 4 · Practical activities — what Gyansetu can and cannot do

Ten official activities. The curriculum calls them *suggested*, and the
teacher may adapt them.

| Unit | Activity | Needs | Can Gyansetu do it? |
|---|---|---|---|
| 1 | Familiarisation with IDE tools | A computer with an IDE installed | **No** — a real installation. The lesson describes what to look for and what each tool is. |
| 2 | Display `HELLO WORLD!` | A computer with a C compiler | **No** — compiling is off-site. The lesson walks the exact program line by line. |
| 3 | Programs for sequential structure | Compiler | **No** |
| 3 | Programs for conditional and iterative structure | Compiler | **No** |
| 4 | Programs using functions | Compiler | **No** |
| 4 | A simple recursive function | Compiler | **No** |
| 5 | Programs using arrays (sorting a list) | Compiler | **No** |
| 5 | Programs using strings | Compiler | **No** |
| 6 | Programs using structure and union | Compiler | **No** |
| 7 | Programs using pointers (`*`, `&`) | Compiler | **No** |

**Every one of the ten needs a C compiler on a real machine.** That is the
honest finding, and it is different from Fundamentals of Computer and
Application, where several activities were paper exercises. This subject's
practical half cannot be performed inside a browser page, and no activity
brief on the site says otherwise.

What the site provides instead, and says it is providing: the program, the
expected output, the stepper that shows what each line does to each variable,
and the observation questions to answer in the practical record book. The
*record keeping* half of the internal marks (3 of 50 practical, 2 of 50
project) is supported by `practical.js`, which stores a student's own ticks
on their own device and claims nothing else.

---

## 5 · Assessment coverage plan

Weighted to the external marks, not to the hours.

| Unit | Marks | Questions | Why |
|---|---:|---:|---|
| 1 | 5 | 7 | Definitions and flowchart symbols — easy to ask, easy to get wrong |
| 2 | 7 | 9 | Format specifiers and operators carry most of the MCQs in practice |
| 3 | 13 | 14 | The heaviest unit; output prediction and loop tracing dominate |
| 4 | 10 | 11 | Call by value vs reference is the perennial long-answer |
| 5 | 8 | 10 | Index arithmetic and the null terminator |
| 6 | 5 | 7 | Structure vs union is the standard differentiate question |
| 7 | 2 | 5 | Light on marks; `&` vs `*` still has to be secure |
| **Total** | **50** | **63** | |

The question *kinds* the brief asks for, and where they live:

| Kind | Where |
|---|---|
| Conceptual | question bank, all units |
| Syntax interpretation | question bank — "which declaration is legal" |
| Code tracing | question bank + guided practice + the C stepper |
| Output prediction | `predict` blocks and question bank |
| Error identification | question bank — "this program prints nothing, why" |
| Practical reasoning | question bank — "which loop fits this task" |
| Examination-style short/long | `.examq` blocks in each lesson, 2 / 4 / 8 marks |

---

## 6 · Code accuracy — what was and was not verified

**No C compiler is available in this environment.** `gcc`, `clang`, `cc`,
`tcc`, `g++` and `cl` are all absent, and installing one was not in scope.

So every program in this subject is marked, honestly, as **not
compiler-executed**. What was done instead:

1. **Hand-verification against C99/C11 semantics**, program by program:
   headers, return type of `main`, declaration before use, format specifiers
   against argument types, `&` on `scanf` arguments, loop bounds, array
   indices, function prototypes, and the value of every variable at every
   step shown in a stepper.
2. **A mechanical checker**, `tests/grade9-c.test.js`, which extracts every
   code block in the seven lessons and fails the suite on: unbalanced braces,
   parentheses or brackets; a `printf`/`scanf` whose conversion specifiers do
   not match its argument count; `printf` or `scanf` used without
   `<stdio.h>`; a string function used without `<string.h>`; `scanf` on a
   non-array argument with no `&`; a complete program with no `main`.

   This is not a compiler and the test says so. It catches the mistakes that
   actually occur in authored teaching code, which are nearly all of them
   clerical.
3. **C and C++ kept apart.** No `cout`, no `//`-only comment style where the
   curriculum's own examples use `/* */`, no `bool` without `<stdbool.h>`,
   no declaration in a `for` initialiser presented as universal — the last
   is C99 and is flagged where used.

---

## 7 · Authoring status

Derived, never declared. `node tools/grade9-spec.js` regenerates
`docs/GRADE-9-CURRICULUM-SPECIFICATION.json` from the coverage map, the page
map, the question bank and the `data-practical` ids; the per-topic status in
that file is the answer to "is this topic authored", and this document does
not duplicate it.

At the close of Phase 14: **7 of 7 units authored, 35 of 35 topics mapped to
a section that exists in a built page.**
