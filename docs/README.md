# Documentation index

Thirty-five documents accumulated over five phases, plus this index. This is the map.

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
| [PROJECT_REPORT.md](PROJECT_REPORT.md) | What is taught, what is outlined, what remains to write |
| [ACCESSIBILITY-AUDIT.md](ACCESSIBILITY-AUDIT.md) | Measured contrast and keyboard results, and an explicit list of what was **not** verified |
| [PHASE-3-CURRICULUM-MAP.md](PHASE-3-CURRICULUM-MAP.md) | The CDC syllabus mapped to pages, with every ambiguity recorded rather than guessed |
| [DIGITAL-DESIGN-DECISIONS.md](DIGITAL-DESIGN-DECISIONS.md) | Subject-level decisions: terminology, notation, what the syllabus left open |
| [PHASE-4-DBMS-CURRICULUM-MAP.md](PHASE-4-DBMS-CURRICULUM-MAP.md) | The DBMS syllabus mapped to pages, with six documented ambiguities |

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

## Two things every document here agrees on

**WCAG 2.1 AA is not claimed.** Contrast is measured and the two failures found
were fixed. Keyboard operation was tested by hand. But no screen reader was
available in this environment, so the screen-reader experience is unverified,
and a compliance claim would be a guess. See
[ACCESSIBILITY-AUDIT.md](ACCESSIBILITY-AUDIT.md).

**No frame rate is quoted anywhere.** The only environment available for
measuring it throttles `requestAnimationFrame`, so any number would be fiction.
Animation is described by what it does, never by a number nobody measured.
