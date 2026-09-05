# Phase 2.5 — Completion Report

**Date:** 5 September 2026
**Objective:** build the visualization, animation and motion foundation before
large-scale curriculum production begins.
**Outcome:** complete. 113 automated tests, zero known regressions, zero dependencies.

---

## 1. Before

| | State before this phase |
| --- | --- |
| SVG diagrams | 22, **none animated**, **no element ids** — nothing was addressable |
| SVG animation elements | 0 |
| Educational motion in the whole product | **One keyframe** (`slidein`), on one component |
| Hard-coded hex inside diagrams | 93 — the design system's colour roles were bypassed |
| Motion tokens | 3 durations, 1 easing |
| Reduced motion in JavaScript | **Not honoured** — sequences ran on `setTimeout(760)` |
| Executing code line | No transition — it snapped |
| Visualization types available to an author | One: static |

## 2. Problems discovered

Measured, not assumed.

| # | Problem | Evidence |
| --- | --- | --- |
| **F1** | Diagrams structurally unanimatable — no ids, no grouping | 22 `<title>` ids and nothing else |
| **F2** | Diagrams bypass the design system | 93 hard-coded hex values |
| **F3** | **The stack simulator animated the wrong thing** | `stkRender()` replaced `innerHTML`, so every box was a new node. Measured after 3 pushes: **every** surviving box reported `currentTime: 0` — all restarted. The motion said "everything moved" while the lesson says "one element moved, at one end" |
| **F4** | Reduced motion not honoured where it mattered | CSS zeroed transitions; `setTimeout(760)` was untouched, so a 25-step trace still took 19 seconds |
| **F5** | The most-repeated state change had no transition | `.code .ln.on` snapped — 58 tracer steps plus every simulator run |
| **F6** | No sequencing or easing vocabulary | One easing, fixed 760ms, no stagger, no enter/exit distinction |
| **F7** | No visualization type system | An author could only write a static diagram |

The exit animation `.sbox.out` was also **dead CSS** — never applied, because
`pop()` re-rendered without the element. A value never visibly left; it vanished.

## 3. Architecture now

```
_source/diagrams.js         static string  OR  { type:'animated', svg, steps }
        │  {{dia:name}}
        ▼
build/index.js
   ├── static   → inline SVG inside figure.fig
   └── animated → .dia > .dia-stage > svg + controls + bilingual caption
        ├── generates assets/js/diagram-data.js
        └── auto-loads diagram.js + diagram-data.js on pages that need them
        ▼
DiagramRuntime   state-driven stepping (reset, replay 0…N)
MotionService    timing · reduced motion · lifecycle · primitives
```

**State-driven, not mutation-chained.** Showing step N resets every animatable
element and replays steps 0…N. Stepping backwards is therefore exact rather than
an undo guess.

## 4. Reusable primitives created

| Primitive | Purpose |
| --- | --- |
| `MotionService.ms(token)` | Single source of timing; reduced-motion aware |
| `MotionService.sequence()` | Step player — play / pause / resume / goTo / reset / destroy |
| `MotionService.register()` | Parks a sequence when off-screen or the tab is hidden |
| `MotionService.setState/activate` | Applies the shared state language |
| `MotionService.pulse` | One-shot attention. Never loops |
| `MotionService.changeValue` | Connects an old value to its replacement |
| `dia-step` / `dia-focus` / `dia-dim` / `dia-travel` / `dia-draw` | Diagram animation classes |
| `reconcile(container, values, {atEnd})` | Structure renderer — one function serves stack (end) and queue (front) |
| `is-active/selected/success/error/complete/disabled` | Shared state language, working in HTML **and** SVG |

Plus a full token set: 6 durations, 5 easings, 3 stagger steps, a touch floor.

## 5. Existing visualizations upgraded

| What | Change | Why |
| --- | --- | --- |
| Stack & queue simulators | Diff-based reconciler | Only the element that actually entered or left animates. The exit animation now plays — on the **end** for a stack, the **front** for a queue, which is the difference the comparison teaches |
| Program tracer | Executing line now transitions (200ms) | The most-repeated state change in the product; the eye can now follow it |
| Step player (`runSteps`) | Timing via `MotionService` | Reduced motion is finally honoured in JavaScript |
| Answer reveal, prediction feedback | `reveal` transition | Grows into place rather than appearing abruptly |
| All wide content | `.dia-stage` added to the scroll-affordance sweep | Animated diagrams get the edge fade and keyboard focus static ones already had |

**The tracer engine was not touched.** Its outputs remain byte-exact.

## 6. New animations

Two, both chosen for educational value rather than visual appeal.

| Diagram | Unit | Educational purpose |
| --- | --- | --- |
| **`ctorOrder`** | 5 · Inheritance | Constructor/destructor **order** is a temporal fact a still image cannot show, and one of the most-asked exam questions. Six steps reveal `Animal() → Dog() → Puppy()`, then `~Puppy() → ~Dog() → ~Animal()`, with the class being constructed focused at each step. The reversal is visible rather than asserted |
| **`dispatch`** | 6 · Polymorphism | The hardest idea in the subject: the same line `p->draw()` reaching a different function. Six steps re-bind one pointer between two objects and show the call landing in a different place — cause and effect, which is a flow |

Both carry bilingual captions on every step and both are student-controlled.

## 7. Static visuals deliberately preserved — 20 of 22

| Category | Diagrams | Why static is better |
| --- | --- | --- |
| Taxonomies | `dsClass`, `polyTypes`, `inhTypes` | Shapes to memorise and screenshot. `inhTypes` is explicitly "learn to draw each of these" |
| Comparisons | `arrayVsList`, `popVsOop` | Side-by-side is the point; motion would split attention |
| Reference tables | `accessSpecifiers`, `inhAccess` | Rules to look up |
| Structures | `dataHierarchy`, `arrayMemory`, `tree`, `graph`, `abstraction` | Spatial facts, not processes |
| Others | `programAnatomy`, `classObject`, `ctorDtor`, `encapsulation`, `linkedList`, `overloadResolve`, `stackOps`, `queueOps` | Four are ranked animation candidates for later; the rest are correctly static |

Static, animated, interactive and simulation are all treated as legitimate modes.

## 8. Accessibility — actual results

| Item | Result |
| --- | --- |
| Reduced motion in CSS | Honoured (Phase 2) |
| **Reduced motion in JavaScript** | **Now honoured** — sequences complete instantly, step-revealed elements render at 35% opacity so the diagram still reads as a complete figure |
| `--dur-step` under reduced motion | Deliberately preserved: it is reading time, not movement |
| Diagram captions | `role="status"` — each step's explanation is announced |
| Step counter | `aria-live="polite"` |
| Controls | Real buttons, labelled, all ≥ 44px on touch |
| Overflowing diagram stage | `tabindex="0"` + `role="region"` — scrollable without a mouse |
| Autoplay | None. Asserted by test |
| Infinite animation | None. Asserted by test |

**Not done:** screen-reader testing. **WCAG 2.1 AA is still not claimed.** The
two contrast failures from Phase 2 remain open.

## 9. Mobile — actual results

`unit5.html` (animated diagram) measured live:

| Viewport | Page overflow | Stage contained | Controls < 44px |
| --- | --- | --- | --- |
| 320px | 0 | yes | 0 |
| 375px | 0 | yes | 0 |
| 390px | 0 | yes | 0 |
| 430px | 0 | yes | 0 |
| 1440px | 0 | yes | n/a (fine pointer) |

**A real bug was found and fixed here.** The first implementation placed the SVG
directly in `.dia` with no overflow rule; combined with the Phase 2
`html,body{overflow-x:clip}`, the diagram was **cropped with no way to scroll to
the rest** — worse than overflowing. Fixed with the `.dia-stage` wrapper.

The scroll affordance correctly clears when content fits (verified after the
resize debounce).

## 10. Performance — actual measurements

| Metric | Measured |
| --- | --- |
| **Animations running while a page sits idle** | **0** (measured on two settled pages) |
| Keyframe animations using only compositor-friendly properties | **8 of 8** — transform, opacity, filter |
| Layout-triggering animations | 2 `transition: width` — the tracer progress bar and the dev-only showcase demo. Single elements, not per-frame |
| Phase 2.5 JS added | `motion.js` 7.9 KB + `diagram.js` 8.4 KB + `diagram-data.js` 4.8 KB = **21 KB** |
| Paid only where used | `unit1` (no animated diagram) loads **no** diagram runtime; outline pages load one script |
| Total CSS + JS on `unit5` | 94 KB uncompressed |
| DOM nodes, `unit5` | 986 |
| `domInteractive` / `domComplete` | 92ms / 191ms (localhost) |
| Dependencies added | **0** |

**Honest limitation:** frame-rate could not be measured. `requestAnimationFrame`
and `setTimeout` are throttled in the hidden automation pane — sampling returned
1000ms frames, which measures the harness, not the product. No frame-rate figure
is claimed. Real-device profiling remains outstanding.

## 11. Testing — actual results

```
$ npm run build
content validation: 8 subjects, 7 outlines, 9 authored pages, 22 diagrams — OK
animated diagrams: ctorOrder, dispatch

$ npm test          (four consecutive runs)
ℹ pass 113  ℹ fail 0    ×4
```

| Suite | Tests |
| --- | --- |
| `build.test.js` | 8 |
| `links.test.js` | 13 |
| `content.test.js` | 14 |
| `runtime.test.js` | 23 |
| `progress.test.js` | 18 |
| `ux.test.js` | 18 |
| **`motion.test.js`** | **19** |

New coverage: token agreement between CSS and JavaScript, reduced-motion
behaviour (with a stubbed media query), sequence play/pause/resume/goTo, diagram
configuration completeness, **every animated selector existing in its own SVG**,
shipped control markup, script load order, no autoplay, no infinite animation,
off-screen parking, and the code-line transition.

Build validation now rejects: an unknown visualization type, a missing SVG or
steps, an intro or step missing a language, a **selector that does not exist in
the diagram**, a non-id selector, and duplicate ids. Verified by deliberately
breaking a selector — the build failed with
`step 1 show: targets "#ctor-TYPO" which does not exist in the SVG`.

### Build robustness

During final regression `npm run check` failed once with
`UNKNOWN: unknown error, open unit6.html` (errno -4094). On Windows a
just-written file can still be held briefly by an indexer or antivirus
scanner, and the suite rebuilds the site immediately after a build.

Environmental rather than a defect in the build — but an intermittent failure
is still a failure, so `write()` now backs off and retries on EBUSY, EPERM,
UNKNOWN and EACCES. Verified stable over six consecutive `npm run check` runs.

## 12. Visual QA performed

Inspected live at 320 / 375 / 390 / 430 / 1440px:

- Animated diagram at steps 0, 2, 3 and 6 — composition, arrow geometry, label
  placement, control bar wrapping, caption legibility in both scripts
- Static `inhTypes` — confirmed unchanged and legible
- Stack and queue exit behaviour — confirmed opposite ends
- Design-system and showcase pages end to end

**Two defects found and fixed by looking, not by testing:**

1. **Focus emphasis smudged text.** `stroke-width: 3` on a `<g>` inherited to
   `<text>`, thickening every glyph — a focused label became *harder* to read.
   Now shapes take the stroke and text takes fill.
2. **The mobile clipping bug** in §9.

## 13. Known limitations

| # | Limitation | Severity |
| --- | --- | --- |
| 1 | 4 identified animation candidates not built (`linkedList`, `classObject`, `encapsulation`, `overloadResolve`) | Medium — content work, pattern proven |
| 2 | 93 hard-coded hex values still inside diagrams | Medium — diagrams cannot use the state language or be re-themed |
| 3 | Frame-rate never measured on real hardware | Medium |
| 4 | No screen-reader testing; AA not claimed | Medium |
| 5 | Two Phase 2 contrast failures still open | Medium |
| 6 | Static diagrams expose only a `<title>` to assistive tech | Medium |
| 7 | Diagrams scroll rather than adapt on phones | Low — deliberate; a simplified mobile variant means authoring twice |
| 8 | 60 inline `onclick` handlers still block a strict CSP | Medium — carried from Phase 1; the new diagram and prediction components are fully delegated |
| 9 | Tracer shows no variable/memory state panel | Low — content and engine work |

## 14. Technical debt

Carried forward: inline handlers, contrast tokens, diagram SVG duplicated per
page, `config/pages.js` assuming one authored subject.

Added this phase: `motion.css` is a fourth corrective layer on the stylesheet;
the cascade is now tokens → base → site → learning-ux → motion. That was right
for a phase that must not break 20 working pages, but the layers should be folded
down before a fifth is added. The animated-diagram format also means `diagrams.js`
now holds two shapes (string and object) — deliberate and validated, but it is a
union type a future author must know about.

## 15. Phase 3 readiness

| Capability | Ready | Evidence |
| --- | --- | --- |
| **Static diagrams at scale** | ✅ | Unchanged, validated, print- and screenshot-friendly |
| **Animated diagrams at scale** | ✅ | Author writes SVG with ids plus bilingual steps; build generates markup, controls, captions, script loading and validation |
| **Interactive simulations** | ✅ | Registry from Phase 1 plus the reconciler pattern; `atEnd` shows the model generalises |
| **Motion consistency** | ✅ | Tokens are the single source; CSS and JS agreement is asserted |
| **Reduced motion** | ✅ | Honoured in both layers, with information preserved |
| **Mobile** | ✅ | Zero overflow across the range; affordances automatic |
| **Performance** | ⚠️ | Idle cost measured at zero and properties audited; frame-rate unverified on real devices |
| **Accessibility** | ⚠️ | Structure, ARIA and controls done; screen-reader pass outstanding |
| **Author experience** | ✅ | `{{dia:name}}` is the entire API. No CSS, JS, ARIA, control markup or responsive rules |

### Recommended Phase 3 order

1. **Author the second subject** (Digital Design & Microprocessor) — number
   systems, logic gates and adders are the most animation-dependent topics in the
   curriculum and the real test of this system.
2. Build the 4 remaining animation candidates as those units are revisited.
3. Convert diagram colours to tokens, so diagrams join the state language.
4. Screen-reader pass, then the two contrast fixes.
5. Remove inline handlers; tighten the CSP.

## 16. Honest assessment

**What genuinely improved.** The stack simulator was teaching the opposite of its
lesson — every element animating on every operation, in a unit whose entire point
is that only one element moves at one end. That is now fixed and measured.
Reduced motion is honoured where it actually mattered, which it was not before.
The executing code line, the most-repeated state change in the product, no longer
snaps. And there is now a real system: an author writes `{{dia:name}}` and gets
markup, controls, bilingual captions, script loading, keyboard access, reduced
motion and validation for free.

**What a reviewer would fairly push back on.** Two new animated diagrams is a
small number. The judgement that 20 of 22 should stay static is defensible and
documented, but four ranked candidates were left unbuilt. Diagram colours still
bypass the design system. And no frame-rate was measured on real hardware — the
idle cost is zero and the animated properties are compositor-friendly, but that
is an argument, not a measurement.

**What did not happen, by design.** No animation library. No SMIL. No Canvas. No
autoplay. No infinite loops. No decorative motion. No rewrite of the tracer, the
simulators or the 20 static diagrams that were already doing their job.
