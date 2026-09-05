# RGSC Study Board

A bilingual (English + Nepali) study and revision website for Nepal's
**Secondary Level Computer Engineering** curriculum — Technical and Vocational
stream, Curriculum Development Centre, 2078.

Every topic is explained in **simple English first** — the exact wording the exam
uses — with a **Nepali explanation beside it**, always both visible at once. The
site is built for students whose English is weak but whose exam is in English.

**Status:** Grade 10 *Data Structure & OOP using C++* is complete and live-verified.
The other seven Grade 9/10 subjects ship their full official syllabus outline.
Grades 11–12 are a later phase. See **[docs/PROJECT_REPORT.md](docs/PROJECT_REPORT.md)**
for the complete report.

---

## At a glance

| | |
| --- | --- |
| Pages | 20 static HTML |
| Internal links | 704, all resolving |
| Subjects with full notes | 1 of 8 (Grade 9 + 10) |
| Subjects with syllabus outline | 7 of 8 — 46 units, 284 topics |
| Written content | ~21,800 words |
| Hand-drawn SVG diagrams | 22 (20 static, 2 animated) |
| Worked examples | 20 |
| Exam-style questions | 24, each with a model answer |
| Interactive simulators | 3, in a shared container |
| Animated diagrams | 2, student-stepped |
| Traceable C++ programs | 3 (58 steps) |
| Quiz questions | 15, with instant feedback |
| Prediction exercises | 3, commit-before-reveal |
| Runtime dependencies | none |

## Works offline, permanently

No build step, no server, no framework, no login, no tracking. Open
`index.html` from a USB stick on a laptop with no internet and the entire site
works — simulators, program tracer and quiz included.

The only external request is Google Fonts, and it is optional: every font stack
has a local fallback, so the site is fully legible if the request fails.

## Run it

Just open `index.html` in a browser. Nothing to install.

To serve it locally over HTTP instead:

```bash
npm run serve
```

## Rebuild it

The published site is **generated**. Source lives in `_source/`.

```bash
npm run check
```

That runs `npm run build` (writes all 20 pages and assets, failing loudly on any
content-contract violation) followed by `npm test` (113 tests covering the build,
links, the content contract, the runtime, the storage layer and the design system).

**There are no dependencies to install.** Node 20+ is the only requirement.

## Structure

```
index.html                 Home — grade picker
grade9/  grade10/          Subject index + one folder per subject
  oop-cpp/                 The complete subject
    unit1…unit6.html         Six lesson pages
    trace.html               Step-through C++ program tracer
    tables.html              Comparison tables + exam terms
    quiz.html                15-question self-check
assets/css  assets/js      One stylesheet, twelve scripts
_source/                   Source — config, content, design, runtime, build
tests/                     113 automated tests (npm test)
docs/                      Architecture, security, accessibility, decisions
```

> Edit files in `_source/`, never the generated HTML in the site root —
> a rebuild overwrites it.

## Documentation

| Document | Purpose |
| --- | --- |
| `README.md` | This file — what it is, how to run and rebuild |
| `docs/ARCHITECTURE.md` | Layers, dependency direction, extension points, future boundaries |
| `docs/CONTENT-ARCHITECTURE.md` | The content contract and how to add a subject |
| `docs/I18N-ARCHITECTURE.md` | The bilingual model and why there is no language toggle |
| `docs/UI-ARCHITECTURE.md` | Component vocabulary, chrome generation, responsive and print |
| `docs/SIMULATION-ARCHITECTURE.md` | The step player, the registry, how to build a simulation |
| `docs/ASSESSMENT-ARCHITECTURE.md` | Question schema, QuizService, path to a question bank |
| `docs/SECURITY.md` | Threat model, CSP, and the rules for a future backend |
| `docs/ACCESSIBILITY.md` | Measured contrast, what is fixed, what is not |
| `docs/LEARNING-UX.md` | The lesson framework: predict, experiment, exam connection |
| `docs/DESIGN-SYSTEM.md` | Tokens, scales, components, responsive and motion rules |
| `docs/MOTION-DESIGN.md` | Motion levels, timing, easing, reduced motion, when NOT to animate |
| `docs/VISUALIZATION-ARCHITECTURE.md` | Static / animated / interactive modes and how to add one |
| `docs/PHASE-2.5-ANIMATION-AUDIT.md` | Every visual classified, with the animate-or-not reasoning |
| `docs/PHASE-2.5-DECISIONS.md` | Motion and visualization decision records |
| `docs/PHASE-2.5-COMPLETION-REPORT.md` | What Phase 2.5 changed, measurements, remaining debt |
| `docs/PHASE-1-DECISIONS.md` | Phase 1 decision records, including what was rejected |
| `docs/PHASE-2-DECISIONS.md` | Phase 2 design and UX decision records |
| `docs/PHASE-2-UX-AUDIT.md` | Measured learning-UX and mobile audit |
| `docs/PHASE-2-COMPLETION-REPORT.md` | What Phase 2 changed, results, remaining debt |
| `docs/PHASE-1-COMPLETION-REPORT.md` | What Phase 1 changed, test results, remaining debt |
| `docs/PROJECT_REPORT.md` | Content status: what is taught, what remains to write |
| `_source/README.md` | Build pipeline: add a diagram, deepen a unit, add a subject |

## Licence and attribution

Syllabus structure and topic lists are taken from the *Secondary Level School
Curriculum (Technical and Vocational Stream), Computer Engineering, Grade 9–12,
2078*, published by the Curriculum Development Centre, Sanothimi, Bhaktapur,
Government of Nepal. All explanations, diagrams, examples and code are original
teaching material written for this site.
