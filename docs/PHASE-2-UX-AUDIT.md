# Phase 2 — Learning UX Audit

**Date:** 5 September 2026
**Scope:** the six developed units evaluated as *learning experiences*, plus the
design system, navigation, bilingual presentation and mobile behaviour.
**Method:** structural analysis of every lesson source file, plus live browser
measurement at 320 / 375 / 768 px. Numbers below were measured, not estimated.

**Starting state verified:** build passes, 73/73 tests pass, 20 pages, 22
diagrams, zero dependencies.

---

## 1. Learning flow — what the six units actually do

Component sequence extracted from every lesson source. All six share one skeleton:

```
outcomes  →  [h3 topic → pair → fig → wex → mistake]×n  →  examq×4  →  keypoints
```

Mapped against the target flow:

| Target stage | Present? | Evidence |
| --- | --- | --- |
| Orientation | ⚠️ Partial | Page head + breadcrumb exist; no "where this fits" framing |
| Learning objective | ✅ Strong | `.outcomes` opens all six units, 6 numbered outcomes, bilingual |
| Concept explanation | ✅ Strong | 32 `.pair` blocks; English panel + Nepali box, always together |
| Visualisation | ✅ Strong | 22 diagrams, all used, bilingual captions |
| Worked example | ✅ Strong | 20 `.wex` blocks showing working, not just answers |
| **Interactive experiment** | ❌ **Weak** | **Only u1 and u6 have any interaction. u2, u3, u4, u5 have none** |
| **Predict / think** | ❌ **Absent** | No prediction pattern exists anywhere in the product |
| **Guided practice** | ❌ **Absent** | Only independent practice exists |
| Independent practice | ⚠️ Present but misplaced | 24 `.examq`, but see §2 |
| SEE exam connection | ⚠️ Weak | Questions exist; the *connection* to each concept does not |
| Summary | ✅ Strong | `.keypoints` closes all six units |
| Quick assessment | ❌ Not per-unit | One 15-question quiz on a separate page for the whole subject |

**Verdict.** The passive half of the learning loop — Learn, Visualise — is
genuinely strong. The active half — Interact, Experiment, Predict, Practise —
exists in fragments. The product philosophy is
*Learn → Visualize → Interact → Experiment → Practice → Master*; today it is
mostly *Learn → Visualize → …read some more*.

## 2. Exam questions are appended, not integrated

Measured position of the first `.examq` in each unit:

| Unit | First exam question at |
| --- | --- |
| u1 | 90% down the page |
| u2 | 85% |
| u3 | 84% |
| u4 | 83% |
| u5 | 83% |
| u6 | 83% |

Every unit puts all four questions in a block at the very bottom. A student who
stops reading at 80% — which on a 5,000-word page is likely — never meets a single
exam question.

This is precisely the anti-pattern the brief names: questions that "feel like
random content appended to the bottom". The concept and the question that tests
it can be 3,000 words apart.

## 3. Simulations — the differentiator, under-built

| | |
| --- | --- |
| Units with any interaction | **2 of 6** |
| Simulations total | 3 (`ds.stack`, `ds.queue`, `oop.dispatch`) |
| Consistent container | **None** |

Current markup is ad-hoc: an `.en` panel containing `.btns`, `.vizbox`, `.console`.
There is no shared structure, so each simulation looks and reads differently.

Against the target container, every element is missing:

| Element | Present |
| --- | --- |
| Title | ❌ (only a generic section heading) |
| What you will learn | ❌ |
| Interactive area | ✅ |
| Controls | ✅ |
| Result / feedback | ✅ (bilingual console — genuinely good) |
| **Why did this happen?** | ❌ |
| Initial / empty state | ⚠️ "stack is empty" only |
| Reset | ✅ |

The `SimulationService` registry from Phase 1 already carries `title`, `controls`
and metadata — **the data for a proper container exists and is unused.**

## 4. Mobile — measured, and broken below 530px

Live measurement on `unit1.html`:

| Viewport | Document scroll width | Horizontal overflow |
| --- | --- | --- |
| **320 px** | 546 px | **226 px** ❌ |
| **375 px** | 546 px | **171 px** ❌ |
| 768 px | 753 px | 0 ✅ |

**The page scrolls sideways on every common phone.** This is the single most
serious UX defect found.

### Root cause — precisely identified

Not the diagrams and not the tables; both are correctly contained
(`figure.fig` and `.tablewrap` are 284 px with `overflow-x: auto`).

The offender is the **simulator grid**:

```
.simgrid  width 339 px   grid-template-columns computes to 527.8 px
  .vizbox width 490 px   overflow-x: visible
  .console width 490 px
```

Grid and flex items default to `min-width: auto`, so a track is never allowed to
shrink below its content's min-content width. `.vizbox` cannot shrink, the track
inflates to 528 px, and the whole document overflows.

**Fix: `min-width: 0` on the grid items, plus explicit overflow handling on the
simulator's scrollable areas.** One rule, page-wide effect.

### Diagrams on mobile — behaving correctly, but undiscoverable

`figure.fig` scrolls horizontally; the SVG holds `min-width: 520px`. That is the
**right** decision — scaling a 520 px diagram into 284 px would render its 10 px
labels at ~5.5 px, illegible. Controlled horizontal scrolling is correct here.

But there is **no affordance**: nothing tells a student the diagram scrolls. They
will see a cropped diagram and assume it is broken.

### Touch targets

At 320 px, of 30 interactive elements: **27 are under 44 px tall, 3 are under 24 px.**

| Control | Height |
| --- | --- |
| "Show the answer" | **32 px** |
| Simulator buttons | 39 px |
| Unit chip-bar links | ~26 px |

The 44 px guideline is AAA, but 32 px for the primary "reveal the answer"
interaction — used 24 times per subject — is genuinely too small on a phone.

### Type size

Smallest rendered font in main content: **10 px**. The stylesheet declares sizes
down to `0.6rem` (9.6 px). Devanagari needs *more* size than Latin at equal
legibility because of its conjuncts and the connecting *shirorekha*. 10 px Nepali
on a phone is not readable.

## 5. Heading hierarchy — broken

`unit1.html` heading order as a screen reader encounters it:

```
h4  Grade 9 · कक्षा ९        ← mobile nav panel
h4  Grade 10 · कक्षा १०
h4  Grade 11 · कक्षा ११
h4  Grade 12 · कक्षा १२
h2  Basic Introduction to Data Structure   ← the actual page title
h4  By the end of this unit you can…
h3  1.1 What is a Data Structure?
```

Two defects:

1. **No `<h1>` on any lesson page.** Home, grade and subject pages have one;
   lesson and quiz pages do not.
2. **The mobile nav's four `h4`s come first in the DOM**, so the document outline
   opens with navigation labels and jumps h4 → h2 → h4 → h3.

For a screen-reader user navigating by heading — the normal way to skim a long
page — the outline is misleading.

## 6. Design system — good tokens, incomplete coverage

`design/tokens.css` centralises 8 colours, 3 font stacks, one radius, one shadow.
Genuinely well used: no hard-coded colours found in components.

Gaps against a scalable system:

| Needed | State |
| --- | --- |
| Colour roles (`surface`, `surface-elevated`, `border`, `success`, `warning`, `error`, `info`, `focus`) | ❌ Only raw hues (`--yellow`, `--blue`) — semantic meaning is implicit |
| Spacing scale | ❌ **None.** Values are ad-hoc: 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 18, 20, 22, 24, 26 px appear literally |
| Type scale | ❌ **None.** 20+ distinct `font-size` values from 0.6 to 2.15 rem |
| Radius scale | ⚠️ One token (`--r:14px`); literals 7–20 px used elsewhere |
| Elevation scale | ⚠️ One shadow token |
| Motion tokens | ❌ Durations `.15s .16s .2s .22s .28s .3s .5s .6s` scattered |
| Focus token | ❌ No dedicated focus colour or ring |

The palette is sound. **The system around it is missing**, which is why spacing
and type feel inconsistent between units.

## 7. Bilingual presentation — strong, with one flaw

The model is correct and consistently applied: `.en` solid panel beside `.np`
dashed box, both always visible, never a toggle. `lang="ne"` is applied
automatically to every Devanagari passage (Phase 1). 32 pairs, 143 inline
`.np-cell`s.

**The flaw is mobile.** At ≤820 px `.pair` collapses to one column, so English and
Nepali stack. On a 320 px screen with a 5,000-word unit, the Nepali box for a
concept can be an entire screen away from its English original — breaking the
visual connection that the whole model depends on.

## 8. Information hierarchy and cognitive load

| Observation | Assessment |
| --- | --- |
| Unit lengths vary widely (u1 ≈ 713 source lines, u4 ≈ 384) | No pacing standard; u1 is a very long single scroll |
| u2 contains 8 consecutive `<h4>`s with no content between | A wall of headings for the OOP features list |
| No in-page contents or section progress | On a 5,000-word page a student cannot see structure or position |
| Section numbering (1.1, 1.2…) | ✅ Good — matches the syllabus and aids orientation |
| No visual distinction between "read this" and "do this" | Passive and active content look identical |

## 9. Navigation

Strong for 20 pages: breadcrumb, chip bar, prev/next pager, dropdowns, hamburger.
All generated from the site map, so it scales structurally to 60+ pages.

Gaps for scale:

- The unit chip bar scrolls to **1,566 px** at 320 px viewport — with 46 more
  units it becomes unusable as a primary device.
- No progress indication anywhere (`ProgressService` exists but no UI consumes it).
- No "where am I in this unit" — only "which unit am I in".

## 10. Findings summary

### Fix in Phase 2 — high value, contained

| # | Finding | Severity |
| --- | --- | --- |
| F1 | 226 px horizontal overflow at 320 px (grid `min-width`) | **Critical** |
| F2 | No `<h1>`; nav `h4`s pollute the document outline | **High** |
| F3 | Exam questions appended at 83–90% down every unit | **High** |
| F4 | No simulation container pattern | **High** |
| F5 | No spacing / type / motion scales | **High** (scalability) |
| F6 | Touch targets 26–39 px | Medium |
| F7 | 10 px minimum type, worse for Devanagari | Medium |
| F8 | No scroll affordance on wide diagrams | Medium |
| F9 | Semantic colour roles missing | Medium |
| F10 | No prediction / active-learning pattern | Medium (learning) |

### Deliberately out of scope

| Item | Why |
| --- | --- |
| Adding interaction to u2–u5 | Content work; the *pattern* is Phase 2, the content is not |
| Per-unit quizzes | Needs question-bank expansion (content), not UX |
| Progress UI | Depends on decisions about accounts; service is ready |
| Rewriting educational prose | Explicitly forbidden by the brief |
| Chip-bar redesign for 46 units | Premature — revisit with the second authored subject |

## 11. What must not be lost

The audit found real strengths. These are the quality benchmark and must survive
Phase 2 unchanged:

- The bilingual `.pair` model — structural, consistent, never a toggle
- 22 diagrams that show mechanisms, not decoration
- Bilingual step commentary in simulations
- The worked-example component
- Learning outcomes opening every unit
- Syllabus-matched section numbering
- The print stylesheet that reveals hidden answers
- Zero dependencies, offline-first
