# RGSC Study Board

A bilingual (English + Nepali) study and revision website for Nepal's
**Secondary Level Computer Engineering** curriculum — Technical and Vocational
stream, Curriculum Development Centre, 2078.

Every topic is explained in **simple English first** — the exact wording the exam
uses — with a **Nepali explanation beside it**. Both are shown together by
default, and a student can switch to **Nepali-led** or **English-only** at any
time without losing their place. The site is built for students whose English is
weak but whose exam is in English.

**Status:** Grade 10 *Data Structure & OOP using C++* and *Digital Design &
Microprocessor* are both complete and live-verified. The other six Grade 9/10
subjects ship their full official syllabus outline. Grades 11–12 are a later
phase. See **[docs/PHASE-3-COMPLETION-REPORT.md](docs/PHASE-3-COMPLETION-REPORT.md)**
for the most recent report.

---

## At a glance

| | |
| --- | --- |
| Pages | 34 student pages + 2 internal |
| Internal links | 1,490, all resolving |
| Language modes | 3 — bilingual (default), Nepali-led, English |
| Subjects with full notes | 3 of 8 (Grade 9 + 10) |
| Subjects with syllabus outline | 5 of 8 |
| Written content | 52,101 words |
| Hand-drawn SVG diagrams | 53 (42 static, 11 animated) |
| Worked examples | 49 |
| Exam-style questions | 65, each with a model answer |
| Interactive components | 23 simulations, 21 runtime modules + 6 services |
| Traceable C++ programs | 3 (58 steps) |
| Question bank | 121, tagged by unit, topic and difficulty |
| Prediction exercises | 15, commit-before-reveal |
| Automated tests | 286 |
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

That runs `npm run build` (writes all 28 pages and assets, failing loudly on any
content-contract violation) followed by `npm test` (286 tests covering the build,
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
assets/css  assets/js      One stylesheet, seventeen scripts
_source/                   Source — config, content, design, runtime, build
tests/                     286 automated tests (npm test)
docs/                      Architecture, security, accessibility, decisions
```

> Edit files in `_source/`, never the generated HTML in the site root —
> a rebuild overwrites it.

## Documentation

Thirty-five documents, indexed by what you are trying to do:
**[docs/README.md](docs/README.md)**.

The short version — contracts describe how the system works now and must be
kept true; phase records are dated accounts of a piece of work and must not be
rewritten. Start with [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md), then read
the contract for whatever you are about to touch.

## Licence and attribution

Syllabus structure and topic lists are taken from the *Secondary Level School
Curriculum (Technical and Vocational Stream), Computer Engineering, Grade 9–12,
2078*, published by the Curriculum Development Centre, Sanothimi, Bhaktapur,
Government of Nepal. All explanations, diagrams, examples and code are original
teaching material written for this site.
