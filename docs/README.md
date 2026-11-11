# Documentation index

Sixty-one documents accumulated over nine phases of work, plus this index. This is the map.

**If you read only one thing:** [`ARCHITECTURE.md`](ARCHITECTURE.md) for how
the system is put together, then the contract for whatever you are about to
touch.

Two kinds of document live here, and the difference matters:

- **Contracts** describe how the system works *now*. Keep them true. If you
  change the behaviour, change the contract in the same commit.
- **Phase records** are dated accounts of a piece of work — what was found,
  what was decided, what was measured at the time. **Do not update them.**
  A completion report that says "173 tests" was correct on the day it was
  written, and rewriting it destroys the record.

---

## Contracts — keep these true

| Document | Read it when |
| --- | --- |
| [ARCHITECTURE.md](ARCHITECTURE.md) | You need the layers, the dependency direction, and where a new thing is allowed to go |
| [CONTENT-ARCHITECTURE.md](CONTENT-ARCHITECTURE.md) | You are adding a subject, a unit, or a page |
| [LANGUAGE-SYSTEM.md](LANGUAGE-SYSTEM.md) | You are writing anything a student will read. **The content language contract is §5** |
| [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) | You are about to write CSS. Tokens, scales, and the type floor |
| [UI-ARCHITECTURE.md](UI-ARCHITECTURE.md) | You are adding a component or changing page chrome |
| [LEARNING-UX.md](LEARNING-UX.md) | You are shaping a lesson: predict, experiment, exam connection |
| [VISUALIZATION-ARCHITECTURE.md](VISUALIZATION-ARCHITECTURE.md) | You are adding a diagram — static, animated, or interactive |
| [SIMULATION-ARCHITECTURE.md](SIMULATION-ARCHITECTURE.md) | You are building an interactive component |
| [MOTION-DESIGN.md](MOTION-DESIGN.md) | You are about to animate something — including when not to |
| [ASSESSMENT-ARCHITECTURE.md](ASSESSMENT-ARCHITECTURE.md) | You are adding questions or touching the quiz |
| [ACCESSIBILITY.md](ACCESSIBILITY.md) | Any change to colour, focus, headings or controls |
| [SECURITY.md](SECURITY.md) | Threat model, CSP, and the rules a future backend must follow |
| [`_source/README.md`](../_source/README.md) | You are running the build or adding a diagram to it |

[I18N-ARCHITECTURE.md](I18N-ARCHITECTURE.md) is **superseded** by `LANGUAGE-SYSTEM.md`. It described
the Phase 2 bilingual model, before three modes existed. Kept for the reasoning
it records; do not follow its rules.

## Current state

| Document | What it holds |
| --- | --- |
| [PROJECT_REPORT.md](PROJECT_REPORT.md) | **Historical, and says so at the top** — a Phase 1-era snapshot. For what is taught now, read `GRADE-9-CURRICULUM-SPECIFICATION.json`, which is generated from the content |
| [ACCESSIBILITY-AUDIT.md](ACCESSIBILITY-AUDIT.md) | Measured contrast and keyboard results, and an explicit list of what was **not** verified |
| [CONTENT-DEPTH-AUDIT.md](CONTENT-DEPTH-AUDIT.md) | Concept-by-concept learning depth across all three subjects, with the STRONG/ADEQUATE/THIN matrix |
| [PHASE-3-CURRICULUM-MAP.md](PHASE-3-CURRICULUM-MAP.md) | The CDC syllabus mapped to pages, with every ambiguity recorded rather than guessed |
| [DIGITAL-DESIGN-DECISIONS.md](DIGITAL-DESIGN-DECISIONS.md) | Subject-level decisions: terminology, notation, what the syllabus left open |
| [PHASE-4-DBMS-CURRICULUM-MAP.md](PHASE-4-DBMS-CURRICULUM-MAP.md) | The DBMS syllabus mapped to pages, with six documented ambiguities |
| [CURRICULUM-APPLICABILITY.md](CURRICULUM-APPLICABILITY.md) | Which CDC edition applies, graded by evidence tier — and what no source establishes |
| [NEPALI-REVIEW-STATUS.md](NEPALI-REVIEW-STATUS.md) | The review ledger: 4,424 translations used in 4,891 places, all Pending, 0 reviewed. Generated package: NEPALI-REVIEW-PACKAGE.html |
| [GRADE-9-CURRICULUM-SOURCE-AUDIT.md](GRADE-9-CURRICULUM-SOURCE-AUDIT.md) | Which Grade 9 course this is, its official source, and what is still unverified |
| [GRADE-9-CURRICULUM-MAP.md](GRADE-9-CURRICULUM-MAP.md) | 4 subjects, 28 units, 168 topics — of which 71 are taught, being all of Fundamentals of Computer and Application and all of Programming Principles in C |
| [GRADE-9-C-PROGRAMMING-CURRICULUM-MAP.md](GRADE-9-C-PROGRAMMING-CURRICULUM-MAP.md) | The C subject: 35 topics read from the CDC PDF for Phase 14, the ten practical activities, and what was and was not verified about the code |
| [GRADE-9-ARCHITECTURE-PLAN.md](GRADE-9-ARCHITECTURE-PLAN.md) | Why the platform is already multi-grade, and the four small changes Grade 9 needed |
| [GRADE-9-IMPLEMENTATION-ROADMAP.md](GRADE-9-IMPLEMENTATION-ROADMAP.md) | Subject order, what must be built, and the verification gate before each subject |
| [GRADE-10-REGRESSION-BASELINE.md](GRADE-10-REGRESSION-BASELINE.md) | The Grade 10 line Grade 9 work must not cross, and the mutations proving it holds |
| [GRADE-9-COMPUTER-APPLICATION-CURRICULUM-VERIFICATION.md](GRADE-9-COMPUTER-APPLICATION-CURRICULUM-VERIFICATION.md) | All 36 topics verified against the CDC PDF by two independent extractions |
| [GRADE-9-COMPUTER-APPLICATION-CONTENT-BLUEPRINT.md](GRADE-9-COMPUTER-APPLICATION-CONTENT-BLUEPRINT.md) | The seven-unit plan: sequence, hours, and where interaction is justified |
| [GRADE-9-COMPUTER-APPLICATION-ASSESSMENT-BLUEPRINT.md](GRADE-9-COMPUTER-APPLICATION-ASSESSMENT-BLUEPRINT.md) | The 50 external / 50 internal split, and what a study site can and cannot help with |
| [GRADE-9-COMPUTER-APPLICATION-PRACTICAL-MAPPING.md](GRADE-9-COMPUTER-APPLICATION-PRACTICAL-MAPPING.md) | All 32 practical activities across seven units, and the four levels of help the product can honestly give |

## Phase records — historical, do not update

Read these to find out *why* something is the way it is.

| Phase | Audit / baseline | Decisions | Completion |
| --- | --- | --- | --- |
| 1 — architecture foundation | [BASELINE](PHASE-1-BASELINE.md) · [REPOSITORY-AUDIT](PHASE-1-REPOSITORY-AUDIT.md) | [D](PHASE-1-DECISIONS.md) | [report](PHASE-1-COMPLETION-REPORT.md) |
| 2 — learning UX | [UX-AUDIT](PHASE-2-UX-AUDIT.md) | [D](PHASE-2-DECISIONS.md) | [report](PHASE-2-COMPLETION-REPORT.md) |
| 2.5 — visualization and motion | [ANIMATION-AUDIT](PHASE-2.5-ANIMATION-AUDIT.md) | [D](PHASE-2.5-DECISIONS.md) | [report](PHASE-2.5-COMPLETION-REPORT.md) |
| 3 — language system and Digital Design | — | [DIGITAL-DESIGN-DECISIONS](DIGITAL-DESIGN-DECISIONS.md) | [report](PHASE-3-COMPLETION-REPORT.md) |
| 3.1 — foundation consolidation | [AUDIT](PHASE-3.1-AUDIT.md) | [D](PHASE-3.1-DECISIONS.md) | [report](PHASE-3.1-COMPLETION-REPORT.md) |
| 4 — Database Management System | [CURRICULUM-MAP](PHASE-4-DBMS-CURRICULUM-MAP.md) | [SIMULATION-SPEC](DBMS-SIMULATION-SPEC.md) · [CONTENT-GUIDELINES](DBMS-CONTENT-GUIDELINES.md) | [report](PHASE-4-COMPLETION-REPORT.md) |
| 4.5 — content depth and interaction quality | [CONTENT-DEPTH-AUDIT](CONTENT-DEPTH-AUDIT.md) | — | [report](PHASE-4.5-CONTENT-QUALITY-REPORT.md) |
| 5 — accessibility, performance, production gate | — | — | [report](PHASE-5-ACCESSIBILITY-QUALITY-REPORT.md) |
| 6 — learning quality and content depth | [LEARNING-AUDIT](PHASE-6-LEARNING-AUDIT.md) | [LEARNING-ARCHITECTURE](PHASE-6-LEARNING-ARCHITECTURE.md) | [report](PHASE-6-COMPLETION-REPORT.md) |
| 7 — revision intelligence and prerequisites | [CONTENT-AUDIT](PHASE-7-CONTENT-AUDIT.md) | [LEARNING-ARCHITECTURE](PHASE-7-LEARNING-ARCHITECTURE.md) | [report](PHASE-7-COMPLETION-REPORT.md) |
| 8 — learning depth, headings, screen reader | [LEARNING-AUDIT](PHASE-8-LEARNING-AUDIT.md) | [D](PHASE-8-DECISIONS.md) | [report](PHASE-8-COMPLETION-REPORT.md) |
| 8.1 — the 18-unit matrix, and the worked-example think gate | appended to the three Phase 8 documents above | | |
| Hardware — Class 10 Hardware & Repair, complete | [CONTENT-AUDIT](PHASE-HARDWARE-CONTENT-AUDIT.md) | two new components, argued in the report §3 | [report](PHASE-HARDWARE-COMPLETION-REPORT.md) |
| Hardware 8 — boot animation, coverage validation, diagram reset fix | — | syllabus coverage gate, argued in the report §4 | [report](PHASE-8-HARDWARE-REPAIR-COMPLETION-REPORT.md) |
| 9 — Grade 10 curriculum integrity | official CDC grid located; 9 units had wrong marks | specification-grid.js as a build gate | [report](PHASE-9-CURRICULUM-INTEGRITY.md) |
| 9 continued — the four coverage maps | all 150 Grade 10 topics mapped; three claims of the Phase 9 report corrected | a map entry may name several anchors; tests for the DRAW, not just the bank | [report](PHASE-9-CONTINUATION.md) |
| 9.5 — independent validation and release readiness | 47 pages x 5 widths; 24 pages audited with components mounted; curriculum applicability investigated | four readiness verdicts, and a Nepali review package generated from the content | [report](PHASE-9.5-RELEASE-READINESS.md) |
| 11 — Grade 9 foundation | the CDC Grade 9 grid, transcribed and cross-checked | the platform was already multi-grade; four small changes | [report](GRADE-9-ARCHITECTURE-PLAN.md) |
| 12 — Grade 9 Computer Application, Unit 1 | all 36 topics read twice; one topic in the wrong shape | the build learned that a subject can be part-written | [implementation](PHASE-12-UNIT-1-IMPLEMENTATION-REPORT.md) · [regression](PHASE-12-REGRESSION-REPORT.md) |
| 12.1 — practical learning and final verification | the PDF read as rendered pages; three of five quizzes showed no score at the end | half of Grade 9 is practical work, and no website can do any of it | [completion](PHASE-12.1-COMPLETION-REPORT.md) · [practical mapping](GRADE-9-COMPUTER-APPLICATION-PRACTICAL-MAPPING.md) |
| 12.2 — release audit | the home page credited four finished subjects with a fifth's unit; the grade index gave every subject six units | an audit's job is to read the pages nobody thought to open | [audit](PHASE-12.2-RELEASE-AUDIT.md) |
| 12.3 — product accuracy and multi-grade status | one boolean was asked a three-state question in six places | a subject is outline, partly written or complete — and the build derives which | [completion](PHASE-12.3-COMPLETION-REPORT.md) |
| 12.4 — educational focus and final audit | the recommendation line vanished entirely in Nepali mode | "where should I go back to?" has two answers: where the marks are, and what a teacher judged | [audit](PHASE-12.4-FINAL-AUDIT.md) |
| 13 — Grade 9 Units 2–7, the subject finished | six units that read as complete gave a student nothing to do but read; the review package quietly dropped five Grade 10 items | a plan that withholds interaction from "definitional" units is wrong wherever the marks are for telling things apart | [completion](PHASE-13-COMPLETION-REPORT.md) |
| 13.1 — Nepali review integrity | 42% of the platform's Nepali was in no review package and nothing recorded that; the five "re-attributed" Grade 10 items were 16 deleted ones, 11 predating Phase 13 | a collector that reports what it found cannot tell you what it missed — count the content, not the collector's output | [completion](PHASE-13-1-COMPLETION-REPORT.md) |
| 14 — Grade 9 Programming Principles in C, the whole subject | no C compiler in the environment, and all ten official practical activities need one; `unquote()` read the `\n` a C lesson has to teach as a newline | a listing shows the program's final state and a student only ever meets it in intermediate ones — so the stepper, and the programs as content rather than runtime | [curriculum map](GRADE-9-C-PROGRAMMING-CURRICULUM-MAP.md) · [completion](PHASE-14-COMPLETION-REPORT.md) |
| 14.1 — C compiler verification and execution integrity | a warning taught as a compile error; a stepper that printed a string length with the wrong specifier; the same source crashing at -O0 and exiting 0 at -O1 | a compiler is the only thing that can settle a claim about C, and a hash from a curated manifest is the only thing that can settle which compiler | [verification](PHASE-14.1-VERIFICATION-REPORT.md) |

## Two things every document here agrees on

**WCAG 2.1 AA is not claimed.** Phase 5 measured individual criteria and lists
each one's status honestly: contrast on rendered pairs, keyboard traversal,
focus, reflow at six widths, text resize, and use of colour across five state
pairs — all measured, all passing after five contrast failures were fixed. But
no screen reader is drivable in this environment, so **what a screen reader
speaks is still unverified**, and a conformance claim would be a guess. See
[PHASE-5-ACCESSIBILITY-QUALITY-REPORT.md](PHASE-5-ACCESSIBILITY-QUALITY-REPORT.md)
§23 for the criterion-by-criterion status, and
[ACCESSIBILITY-AUDIT.md](ACCESSIBILITY-AUDIT.md) for the earlier work.

**No frame rate is quoted anywhere.** The only environment available for
measuring it throttles `requestAnimationFrame`, so any number would be fiction.
Animation is described by what it does, never by a number nobody measured.
