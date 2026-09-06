> **Historical — a Phase 1-era snapshot.** Page counts, the diagram total
> and the file layout it describes have all moved on, and it still names
> `build2.js`, which no longer exists. Kept for the record. For current
> status see the phase completion reports, most recently
> [PHASE-3-COMPLETION-REPORT.md](PHASE-3-COMPLETION-REPORT.md).

# RGSC Study Board — Project Report

**Status date:** 5 September 2026
**Repository state:** clean, 1 commit, build reproducible
**Deployment:** not yet pushed to GitHub or deployed

This document is the single source of truth for what the project is, how it is
built, what is finished, and what is not. Every number in it was measured from
the repository, not estimated.

---

## 1. Executive summary

| Area | State |
| --- | --- |
| Design system | **Complete** — tokens, components, responsive, print stylesheet |
| Site architecture | **Complete** — 20 pages, generated, 704 links all resolving |
| Navigation | **Complete** — sticky bar, dropdowns, mobile hamburger, breadcrumbs, prev/next |
| Grade 10 · DS & OOP with C++ | **Complete** — 6 units deep-authored + tracer + tables + quiz |
| Other 7 Grade 9/10 subjects | **Outline only** — full syllabus published, no notes yet |
| Grade 11 & 12 (8 subjects) | **Not started** |
| Offline capability | **Complete and verified** |
| Deployment | **Not done** |

**One-line status:** the platform is finished and one subject is taught to full
depth on it; the remaining seven subjects have their syllabus published but not
their lessons.

---

## 2. What the project is

A revision website for Nepal's CDC Computer Engineering curriculum (Technical and
Vocational stream, Grades 9–12).

**The problem it solves.** These students sit an exam written in English, but
their working language is Nepali. Standard notes force a choice: understand it in
Nepali and fail to recognise the English exam wording, or memorise English
phrases they do not understand.

**The approach.** Every concept appears twice, simultaneously and side by side:

- a **solid-bordered English panel** carrying the exact exam wording, and
- a **dashed Nepali chalk box** explaining the same idea.

Never a toggle. Both are always on screen, so the student learns to map Nepali
understanding onto English exam terms rather than choosing between them.

**Non-goals.** Not a video course, not a login-gated platform, not a quiz bank,
not a CMS. It is a static reference students can download and keep.

---

## 3. Design system — **complete**

### Palette (chalkboard)

Defined once as CSS custom properties in `:root` and reused everywhere, so every
future subject looks like part of the same book.

| Token | Value | Role |
| --- | --- | --- |
| `--bg` | `#0e1a16` | Page ground |
| `--panel` | `#19302a` | English content panels |
| `--line` | `#2c4a41` | Borders |
| `--yellow` | `#ffd76e` | Nepali notes, emphasis, active state |
| `--blue` | `#7fd1ff` | Terms, English tags, links |
| `--coral` | `#ff8f7a` | Warnings, section eyebrows |
| `--green` | `#9ae6a0` | Console output, correct answers |
| `--violet` | `#c9a9ff` | Numeric literals in code |

### Typography

- **JetBrains Mono** — all code and data, falling back to Consolas → Courier New
- **Noto Sans** — English prose, falling back to Segoe UI → Arial
- **Noto Sans Devanagari** — Nepali, falling back to Noto Sans → Mangal

Every stack has a local fallback, so the page stays fully legible offline.

### Component library

Roughly 90 documented classes. The teaching components:

| Component | Purpose |
| --- | --- |
| `.en` / `.np` inside `.pair` | The bilingual unit — solid English panel, dashed Nepali box |
| `.outcomes` | "By the end of this unit you can…" — opens every unit |
| `figure.fig` | Diagram + bilingual caption |
| `.wex` | Worked example, shown step by step |
| `.mistake` | "Students always get this wrong" warning |
| `.examq` | Exam-style question with a hidden model answer |
| `.keypoints` | End-of-unit revision summary |
| `.code` / `pre.cpp` | Numbered, syntax-highlighted C++ |
| `.tablewrap` + `table` | Comparison tables, scrolling inside their own box |

### Responsive and print

Breakpoints at 640, 820, 900 and 940 px. All multi-column grids collapse to one
column; wide tables scroll inside their own container so the page body never
scrolls sideways.

A **print stylesheet** hides the chrome, switches to black on white, avoids
breaking components across pages, and **reveals every hidden model answer** — so
a student can print a unit as a complete worksheet.

### Diagram system — 22 diagrams

Diagrams are hand-authored inline SVG in `_source/diagrams.js`, referenced from
content as `{{dia:name}}` and injected at build time. They use shared classes
(`f-box`, `f-lbl`, `f-arr`, …) so they inherit the theme rather than hard-coding
colours. **The build fails loudly if a placeholder has no matching diagram.**

| Unit | Diagrams |
| --- | --- |
| 1 · Data Structure | `dataHierarchy` `dsClass` `arrayMemory` `linkedList` `arrayVsList` `stackOps` `queueOps` `tree` `graph` |
| 2 · OOP + C++ | `popVsOop` `programAnatomy` |
| 3 · Class & Object | `classObject` `accessSpecifiers` `ctorDtor` |
| 4 · Abstraction / Encapsulation | `abstraction` `encapsulation` |
| 5 · Inheritance | `inhTypes` `inhAccess` `ctorOrder` |
| 6 · Polymorphism | `polyTypes` `overloadResolve` `dispatch` |

All 22 are used; none are orphaned.

---

## 4. Architecture — **complete**

### The site is generated, not hand-maintained

Twenty pages share one navigation bar, one breadcrumb pattern and one footer.
Hand-editing them would guarantee drift, so the published HTML is **output**:

```
_source/content/uN.html   authored lesson content (one <section> per unit)
_source/diagrams.js       SVG library, injected via {{dia:name}}
_source/build.js          site map, syllabus data, extraction from the legacy build
_source/build2.js         page writer — CSS, nav markup, page shell, writes all 20 pages
        ↓  node build2.js
index.html, grade9/**, grade10/**, assets/**
```

**Verified reproducible.** Running `node build2.js` against a clean checkout
regenerates the committed site byte-for-byte — confirmed this session by
rebuilding and finding an empty `git diff`.

### Why static, and what that buys

| Constraint | Consequence |
| --- | --- |
| No `fetch`, no XHR | Works from `file://` |
| No ES modules | Works from `file://` (modules are blocked there) |
| No root-relative paths | The folder can live at any depth or any URL |
| No `localStorage` dependency | Nothing breaks in private mode |
| Only optional external asset is Google Fonts | Fully legible with no internet |

These are enforced conventions, documented in `_source/README.md`, and were
re-checked this session by grepping the whole tree.

### JavaScript, split by need

Each page loads only what it uses. Every module is guarded so it no-ops when its
elements are absent, which is what makes one shared bundle safe across pages.

| File | Loaded on | Purpose |
| --- | --- | --- |
| `nav.js` | every page | Hamburger, focus handling, Escape to close |
| `code.js` | lesson pages | Syntax highlighter, step player, content enhancers |
| `snippets.js` | units 2–6 | Static code samples |
| `sim-stackqueue.js` | unit 1 | Stack and queue simulators |
| `sim-dispatch.js` | unit 6 | Function-dispatch simulator |
| `trace.js` | trace page | Program tracer — 3 programs, 58 steps |
| `quiz.js` | quiz page | 15 questions, scoring, feedback |

---

## 5. What is complete

### 5.1 Platform

- 20 static pages, **704 internal links, zero broken**
- Sticky top bar; desktop dropdowns per grade; mobile hamburger with animated
  ☰→✕, body-scroll lock, Escape-to-close, and auto-close on resize
- Breadcrumbs on every inner page; unit chip bar; prev/next pager
- Skip-to-content link; emoji favicon as a data URI (no network request)
- Home → grade → subject → unit hierarchy, all four levels built

### 5.2 Grade 10 — Data Structure & OOP using C++ (the taught subject)

Six units plus three practice pages. **~21,800 words.**

| Page | Words | Diagrams | Worked ex. | Exam Q | Nepali blocks |
| --- | --- | --- | --- | --- | --- |
| Unit 1 · Data Structure | 4,982 | 9 | 3 | 4 | 47 |
| Unit 2 · OOP + C++ | 3,226 | 2 | 4 | 4 | 49 |
| Unit 3 · Class & Object | 2,589 | 3 | 3 | 4 | 23 |
| Unit 4 · Abstraction / Encapsulation | 2,352 | 2 | 3 | 4 | 18 |
| Unit 5 · Inheritance | 2,722 | 3 | 4 | 4 | 24 |
| Unit 6 · Polymorphism | 2,790 | 3 | 3 | 4 | 22 |
| Tables & exam terms | 1,708 | — | — | — | — |
| Trace a program | 476 | — | — | — | — |
| Quiz | 336 | — | — | — | — |

Totals: **22 diagrams, 20 worked examples, 24 exam questions** (each with a
hidden model answer), 32 bilingual pairs, 7 common-mistake boxes, 21 C++ code
blocks, 6 learning-outcome blocks, 6 key-point summaries.

**Interactive features, all live-verified:**

- **Stack & queue simulator** (unit 1) — push/pop/enqueue/dequeue with animated
  boxes, the executing code line highlighted, bilingual step commentary, and
  correct overflow/underflow handling
- **Dispatch simulator** (unit 6) — shows how C++ chooses between overloaded
  functions at compile time versus virtual functions at run time
- **Program tracer** — 3 complete C++ programs, 58 steps, Prev/Next/Reset,
  console filling only when a `cout` actually executes. Outputs verified to match
  real C++ behaviour, including destructor reversal, multilevel constructor order
  and virtual dispatch
- **Quiz** — 15 questions, instant right/wrong, bilingual explanations, scoring,
  answer locking, retry

### 5.3 The other seven subjects — syllabus published

Each has a generated page carrying its **complete official CDC syllabus**: every
unit, every sub-topic, and the prescribed hours (each subject verified to total
exactly 64 theory hours, matching the curriculum).

| Grade | Subject | Units | Topics |
| --- | --- | --- | --- |
| 9 | Programming Principles & Concept in C | 7 | 35 |
| 9 | Fundamentals of Computer and Application | 7 | 37 |
| 9 | Fundamentals of Electro-System | 7 | 47 |
| 9 | Website Design | 7 | 50 |
| 10 | Computer Hardware, Repair & Maintenance | 6 | 37 |
| 10 | Database Management System | 7 | 39 |
| 10 | Digital Design & Microprocessor | 5 | 39 |
| | **Total** | **46** | **284** |

This is genuinely useful as a revision checklist, and it is honestly labelled
"syllabus outline" rather than pretending to be finished notes.

---

## 6. What remains

### Priority 1 — finish the taught subject

The six unit pages were deepened with diagrams, worked examples and exam
questions. **The three practice pages were not** — they still carry the original
first-draft depth:

- `trace.html` — 3 programs; no diagrams, no exam questions. Should gain 2–3 more
  programs (a stack-using-array trace and a constructor-order trace) and memory
  diagrams showing objects being created and destroyed.
- `tables.html` — 7 comparison tables, accurate but text-only. Each would be far
  clearer with the matching diagram beside it.
- `quiz.html` — one fixed 15-question set. Needs a per-unit question bank, and
  ideally shuffling so a second attempt is not pure recall.

### Priority 2 — the seven outlined subjects

Each needs the same treatment unit 1–6 received: bilingual notes, diagrams,
worked examples, exam questions, a summary and a quiz. Roughly **46 units**.

The three most valuable first, by exam weight and by how badly students struggle:

1. **Digital Design & Microprocessor** — number systems, logic gates, K-maps and
   adders are the most diagram-dependent topics in the whole curriculum, and the
   diagram system already exists to serve them.
2. **Database Management System** — ER diagrams and SQL benefit enormously from a
   query simulator built like the existing ones.
3. **Programming in C (Grade 9)** — the direct prerequisite for the finished C++
   subject, and the program tracer already handles C-style code.

### Priority 3 — Grades 11 and 12

Eight further subjects, currently shown as "next phase" in the navigation:

- **Grade 11:** Programming in Java · Computer Organization & Architecture ·
  Operating System · Web & Mobile Application Development
- **Grade 12:** Visual Programming · Computer Network · Contemporary Technology ·
  Software Engineering and Project

### Priority 4 — platform improvements

| Item | Note |
| --- | --- |
| Deploy | Not yet pushed to GitHub or deployed to Vercel |
| Search | 20 pages is browsable; 60+ will not be |
| Progress tracking | "Units I have revised" — needs `localStorage`, must degrade gracefully |
| Accessibility audit | Not formally audited against WCAG 2.1 AA. Keyboard nav, skip link, ARIA on the hamburger and focus states exist, but contrast ratios and screen-reader behaviour are unverified |
| Automated tests | Verification is currently manual scripts plus browser checks; there is no committed test suite that runs on every build |
| Nepali review | All Nepali was written for this site and has not been reviewed by a second Nepali speaker |

---

## 7. Verification evidence

Everything below was executed against the current commit during this session.

| Check | Method | Result |
| --- | --- | --- |
| Build reproducibility | Rebuild, then `git diff` | **Clean** — output matches commit exactly |
| Internal links | `check-links.js` across all pages | **704 checked, 0 broken** |
| Nav chrome present | Automated per-page assertion | **20/20 pages** |
| JS syntax | `node --check` on all 7 files | **All valid** |
| Runtime errors | Browser console on units 1 & 6, trace, quiz, outline pages | **None** |
| Diagram rendering | Measured painted bounding boxes | **All non-zero** |
| Code-block conversion | Counted unconverted `pre.cpp` after load | **0 left unconverted** |
| Answer toggles | Clicked, asserted class and label change | **Working** |
| Dispatch simulator | Driven programmatically | **Correct output** |
| Program tracer | Ran all 3 programs to completion | **All 3 outputs correct** |
| Quiz | Answered all 15 | **15/15, scoring correct** |
| Offline safety | Grep for fetch / XHR / modules / root-relative paths | **None present** |
| Deploy safety | Case-sensitivity check of every link | **Safe on Linux** |
| Syllabus fidelity | Summed prescribed hours per subject | **All 7 total exactly 64** |

**Known limitation:** the three C++ programs in the tracer are verified by
inspection and against expected C++ semantics, **not by compiling them** — no C++
compiler is installed on the build machine. Compiling them in CI would close this
gap.

---

## 8. How to continue the work

```bash
cd _source
node build2.js       # regenerate all 20 pages
node check-links.js  # verify links and nav
```

**Add a diagram:** define `D.name` in `diagrams.js` using the shared `f-*`
classes, then reference `{{dia:name}}` from any content file.

**Deepen a unit:** create `_source/content/<id>.html` containing one `<section>`.
The build picks it up automatically and stops using the legacy fallback.

**Add a subject:** add its units to `OUTLINE` in `build.js` — the outline page
generates itself. For full notes, follow the `content/uN.html` pattern.

Two conventions that have already caused bugs and are worth remembering:

- SVG presentation attributes lose to CSS classes — override a stroke with
  `style="stroke:…"`, not `stroke="…"`.
- Arrow markers must use `orient="auto"`; `auto-start-end` is not universally
  supported.

---

## 9. Honest assessment

**What is genuinely strong.** The bilingual model is applied consistently rather
than decoratively. The diagrams show real mechanisms — memory layout, pointer
links, dispatch resolution — rather than ornamenting the page. The program tracer
teaches the single skill the written exam actually tests: predicting output by
reading code. The build pipeline means the twentieth page costs the same as the
second.

**What a reviewer would fairly criticise.** One subject of sixteen is taught.
The three practice pages did not receive the depth pass the six unit pages did,
so quality is uneven *within* the finished subject. There is no automated test
suite, no accessibility audit, and the Nepali has had one author and no reviewer.

**The honest headline:** this is a finished, well-engineered platform carrying one
complete subject — not yet a complete curriculum.
