# Phase 3 — Completion Report

**Objective:** add a three-mode language system, then produce the first complete
subject on top of the platform built in Phases 1, 2 and 2.5.
**Outcome:** complete. 176 automated tests, zero known regressions, zero
dependencies.

---

## 1. Before and after

| | Before Phase 3 | After |
| --- | --- | --- |
| Language | Bilingual only, no choice | **Three modes**, bilingual default, preference persists |
| Subjects with authored notes | 1 (`grade10/oop-cpp`) | **2** |
| Student pages | 20 | **26** (+2 internal dev pages) |
| Diagrams | 22 | **38** (6 animated) |
| Interactive components | 2 simulators | **7** |
| Question bank | 15, English prompts | **69** (54 new, fully bilingual) |
| Automated tests | 145 | **176** |
| Page map | Hard-wired to one subject | Keyed by subject |
| Dependencies | 0 | **0** |

## 2. What was built

### The three-language system

- `runtime/services/language.js` — mode, persistence, validation, notification
- `design/language.css` — the only thing that decides what a mode shows
- `build/bilingual.js` — derives the `.t-en` handle for 411 English passages
- A radiogroup switcher on all 28 pages, with a pre-paint bootstrap

The architectural claim, and why it holds: **both languages are always in the
DOM; a mode changes what is shown, never what exists.** Nothing is re-rendered
on a switch, so a half-finished trace, an answered prediction and a
part-completed quiz all survive it. That is structural, not bookkeeping.

Full detail: [LANGUAGE-SYSTEM.md](LANGUAGE-SYSTEM.md).

### Digital Design & Microprocessor — all five units

| Unit | Hrs | Marks | Words | Interaction |
| --- | --- | --- | --- | --- |
| 1 · Number System and Binary Arithmetic | 12 | 7 | 2,703 | place-value converter · column adder · animated 2's complement |
| 2 · Concept of Logic Gates | 14 | 15 | 2,913 | gate workbench (6 gates) · universal-gate check · animated De Morgan |
| 3 · Boolean Algebra and Karnaugh Map | 10 | 6 | 2,554 | K-map workbench with real rule checking · animated simplification |
| 4 · Binary Arithmetic and Combinational Logic | 13 | 7 | 2,344 | combinational workbench (4 circuits) · animated ripple carry |
| 5 · Introduction to Microprocessor | 15 | 15 | 2,835 | 12-step 8085 instruction cycle simulation |
| | **64** | **50** | **13,349** | |

Hours and marks are **verified by the build** against the CDC syllabus outline
and specification grid — the build fails if either total drifts.

### New code

| Module | Lines | Purpose |
| --- | --- | --- |
| `sim-kmap.js` | 417 | K-map with four-rule judgement |
| `sim-gates.js` | 355 | gate workbench |
| `sim-8085.js` | 344 | instruction cycle simulation |
| `sim-number.js` | 337 | place-value converter and column adder |
| `sim-comb.js` | 332 | half/full adder, half subtractor, MUX |
| `bilingual.js` | 233 | build-time English pairing |
| `services/language.js` | 187 | the language service |

## 3. Problems found and fixed

Found by measurement or by looking, not assumed.

| # | Problem | How it was found |
| --- | --- | --- |
| 1 | Quiz would render a **blank question** in Nepali mode when the bank had no Nepali half | Reasoning through the fallback before shipping; now asserted by a test |
| 2 | Truth table overflowed its own grid column by **131px** — `base.css` sets `table{min-width:560px}` for wide comparison tables | Measured in the browser |
| 3 | Output lamp floated **above** the wire instead of terminating it, so the circuit read as two disconnected things | Visual inspection |
| 4 | Gate name ran into its Nepali translation: `ANDएन्ड` | Visual inspection |
| 5 | Input wires stopped **5 units short** of OR/NOR/XOR bodies — the concave back curves away at the input heights | Visual inspection, then computed from the Bézier |
| 6 | `.sim-goal` gloss ran on from the English sentence as one paragraph — **pre-existing**, also affected unit 6 | Visual inspection |
| 7 | Graph edges ran **through** the vertex labels (12 collisions) — **pre-existing** since Phase 1 | New audit check |
| 8 | NAND figure's row-3 heading sat 1 unit inside a gate outline | New audit check |
| 9 | Colour accent flush to a rounded corner poked outside it | The build's containment guard |
| 10 | 8085 pin list overran its description column | Geometry audit |
| 11 | Bus labels crowded onto their arrows | Looking at it — measurement said clean |
| 12 | Two build lists of runtime modules could drift; a module was registered in one and forgotten by the other | The build failed |
| 13 | **Nepali mode rendered lessons with no title** — the hero's `<h1>` was swallowed into an English run | Switching to Nepali mode and looking |
| 14 | Unit badges and "12 hrs · 7 marks" disappeared in Nepali mode | Same pass |
| 15 | A "run" spanned whole structural blocks, so wrapping one hid the Nepali nested inside it | Same pass |

**#11 and #13–15 are the ones worth keeping.** The automated audit reported the microprocessor
block diagram as clean, and it was — every gap was 5–7 units. It still looked
crowded, because the labels carried their full descriptions into a 130-unit gap.
Measurement catches collisions; it does not catch composition. And #13–15 were
invisible in the default mode entirely — every test passed, every page measured
clean, and the product was broken for anyone who chose Nepali. Both passes are
needed, and the second one has to be done in each mode.

## 4. The diagram audit, extended

Phase 2.5 left a browser-based geometry audit. It compared bounding boxes, and
two defect classes slipped past it. Both are now covered, and the tool is saved
at `tests/manual/diagram-audit.js`:

| Check | Catches |
| --- | --- |
| text over text | two labels sharing space |
| out of frame | a caption clipped by the viewBox |
| **breaks out** | a shape crossing a rounded container's *curve* — invisible to bounding boxes |
| **text over geometry** | a heading sitting on a drawn outline |
| **line through text** | an edge passing through the label it terminates at |

Two measurement traps are documented in the tool, because both produced
confident wrong answers first:

- `getBBox()` reports an element's **own** coordinate system, so a shape inside
  `<g transform="translate(...)">` appears at the origin. The first
  text-over-geometry check reported **44 false positives across 9 figures**
  before being redone in screen space.
- A diagonal `<line>`'s bounding box covers a large rectangle it does not draw
  in, so lines are compared as segments.

**Result: 38 of 38 figures clean** on every check.

The rounded-container check also runs in the build (`validate.js` §4e) as a
static analysis, so that class of defect fails CI rather than waiting for a
browser pass. It was proven by deliberately breaking a diagram and watching the
build refuse it.

## 5. Verification

### Tests — 176, all passing

| File | Tests | Covers |
| --- | --- | --- |
| `language.test.js` | 35 | modes, persistence, corrupted and unavailable storage, the build-time pairing, switcher semantics, bank coverage, structural survival in every mode |
| `circuits.test.js` | 11 | every gate and circuit against the arithmetic it claims |
| `kmap.test.js` | 13 | the four grouping rules, wrap-around, term derivation |
| `content.test.js`, `build.test.js`, `links.test.js`, `ux.test.js`, `motion.test.js`, `runtime.test.js`, `progress.test.js` | 117 | Phases 1–2.5, unchanged and still passing |

Counts that used to be hard-coded now derive from the config, so authoring a
unit no longer means editing a test — which is how people learn to edit tests
instead of reading them.

### Truth verified against arithmetic, not against itself

Every truth table is generated from the function that drives its diagram, and
those functions are checked against what they claim to compute: the half adder
against `a + b`, the full adder against `a + b + carry`, the multiplexer against
the input its select lines name, De Morgan's laws against the implemented gates.

### Responsive — measured, all pages, zero overflow

| Viewport | Pages checked | Horizontal page overflow |
| --- | --- | --- |
| 320px | all 7 Digital Design pages | **0** |
| 375px | switcher and chrome | **0** |
| 390px | unit 4 | **0** |
| 430px | switcher and chrome | **0** |
| 768px | unit 3, quiz | **0** |
| 1024px | chrome | **0** |
| 1440px | unit 3, unit 4 | **0** |

Two-column components collapse to one below 720–760px. Every control measured
≥44px on the coarse-pointer path. The one element reported as "escaping" is the
chip bar, which is `overflow-x: auto` with negative margins by design.

### Language — measured on every page

All three modes verified on all 7 Digital Design pages: no page loses its text
in any mode, and all 12 quiz questions render in all three modes. Storage
failure paths — absent, throwing on write, throwing on read, corrupted value,
value from another product — all resolve to bilingual with the mode still
applying for the session.

### Accessibility

| Item | Result |
| --- | --- |
| Switcher | `role="radiogroup"`, three radios, roving tabindex, arrow/Home/End keys |
| Active state | driven from the `<html>` attribute, correct before any script runs |
| Interactive inputs | `role="switch"` with `aria-checked`, Space and Enter |
| Truth-table row | `aria-current="true"` follows the student's inputs |
| Explanations | `role="status"` — announced when they change |
| Step counters | `aria-live="polite"` |
| Touch targets | ≥44px on coarse pointers |
| Reduced motion | every new transition disabled; state changes still happen, instantly |
| Autoplay | none |
| Nepali passages | `lang="ne"`, applied at build time |

**Not done: screen-reader testing. WCAG 2.1 AA is still not claimed.** Carried
over from Phase 2 and unchanged.

## 6. Definition of done

### Platform
- [x] Existing 20 pages functional — all still build and pass their tests
- [x] Existing six units functional
- [x] No regression — 117 pre-existing tests still pass
- [x] Simulations, tracer, animation system unchanged and working
- [x] Zero dependencies

### Language
- [x] Bilingual, Nepali and English modes all work
- [x] Bilingual is the default
- [x] Preference persists across navigation
- [x] Invalid, corrupted, foreign and unavailable preferences fall back safely
- [x] Switcher is keyboard accessible and works at 320px
- [x] Quiz, simulations and diagram captions all respect the mode
- [x] Switching does not reset learning state

### Curriculum
- [x] Official CDC syllabus mapped item by item; ambiguities documented, not guessed
- [x] Every prescribed topic has an explicit destination
- [x] Hours (64) and marks (50) enforced by the build
- [x] Objectives, worked examples, common mistakes, exam connection, summary, quiz in every unit

### Visualization
- [x] Phase 2.5 system reused; no second animation framework
- [x] 12 of 16 new diagrams static — animation used only where order or movement is the lesson
- [x] No autoplay, no infinite animation
- [x] Reduced motion supported
- [x] Mobile verified by measurement

### Quality
- [x] Technical correctness verified against arithmetic
- [x] Visual QA done in a browser, with defects found and fixed
- [x] Responsive QA measured at all seven breakpoints
- [x] 176 tests pass; full regression clean

### Documentation
- [x] `PHASE-3-CURRICULUM-MAP.md`
- [x] `LANGUAGE-SYSTEM.md`
- [x] `DIGITAL-DESIGN-DECISIONS.md`
- [x] `PHASE-3-COMPLETION-REPORT.md`

## 7. Open, and honest about it

| Item | Status |
| --- | --- |
| **Screen-reader testing** | Not done. WCAG 2.1 AA not claimed. |
| **Two Phase 2 contrast failures** | Still open, with the exact fix values recorded in `PHASE-2-UX-AUDIT.md` |
| **`grade10/oop-cpp` question bank** | English-only prompts; falls back rather than blanking. 15 questions to translate. |
| **Headings mixing both languages in one element** | Cannot be split by the mode; both halves show in every mode |
| **60 inline `onclick` handlers** | Still force `script-src 'unsafe-inline'`. New components use delegated handlers; the older ones remain. |
| **Frame rate** | Never measured on real hardware — rAF is throttled in the automation pane. No figure claimed. |
| **Geometry audit** | Needs a real browser, so it is not in `npm test`. The static containment guard in `validate.js` covers the highest-value case. |
| **Nepali has one author and no reviewer** | The highest-value fix in this area, unchanged since Phase 1 |

## 8. What a future subject inherits

Adding Grade 11 Java is now a content job:

1. `config/site.js` — add the subject, set the grade to `open`
2. `content/syllabus.js` — add its units; hours must total 64
3. `config/pages.js` — add a page map keyed by `grade11/java`
4. `content/lessons/java-u1.html` … — write the lessons
5. `content/questions/grade11-java.js` — add the bank

No build code changes, no stylesheet changes, no test changes. The language
system, the motion system, the validation gate, the quiz engine and the
visualization vocabulary all apply automatically. That is the thing Phase 3 was
actually for: the second subject proved the platform, and the third should cost
less than the second did.
