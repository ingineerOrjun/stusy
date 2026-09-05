# Phase 2.5 — Visualization & Animation Audit

**Date:** 5 September 2026
**Scope:** every educational visual in the product — 22 SVG diagrams, 3
simulations, the program tracer, the prediction component, and all existing CSS
motion.
**Method:** read every diagram source, every motion declaration, and drove the
live simulators in a browser to observe what actually animates.

**Starting state verified:** build passes, 93/93 tests, 20 student pages,
22 diagrams, zero dependencies.

---

## 1. What motion exists today

The complete inventory. This is a small list.

| Keyframe | Duration | Applied to | Educational? |
| --- | --- | --- | --- |
| `slidein` | 300ms | `.sbox` — stack/queue boxes | **Yes** — an element entering a structure |
| `slideout` | 300ms | `.sbox.out` | **Dead CSS — never applied** (see F3) |
| `fade` | 200–280ms | Console lines, mobile panel | Supporting |
| `pop` | 500–600ms | Hero decoration, `.cell`, `.node` | Decorative |

Plus 9 CSS `transition` declarations (hover, focus, borders).

**Total educational motion in the product: one keyframe, on one component.**

| | Count |
| --- | --- |
| SVG diagrams | 22 |
| Diagrams with any animation | **0** |
| SVG `<animate>` / SMIL elements | **0** |
| Targetable element ids inside diagrams | **0** (only 22 `<title>` ids + marker ids) |
| Hard-coded hex colours inside diagrams | **93** |

## 2. Findings

### F1 — Diagrams are structurally unanimatable

Every diagram is a flat list of `<rect>`, `<text>` and `<path>` with shared
classes and **no element ids or semantic grouping**. There is no way to say
"highlight the top element", "move this value along the bus", or "activate this
gate", because no element can be addressed.

This is the single blocking finding. It is not a polish problem — the current
diagram format cannot express state at all.

### F2 — Diagrams bypass the design system

93 hard-coded hex values inside `diagrams.js`: 42 × `#ff8f7a`, 37 × `#9ae6a0`,
11 × `#ffd76e`, 3 × `#7fd1ff`. Phase 2 established semantic colour roles
(`--color-success`, `--color-error`, …) and diagrams use none of them.

Consequence: a diagram cannot participate in the product's state language. A
"correct" result in a diagram is a different green from a "correct" result in the
quiz, and neither can be re-themed.

### F3 — The stack simulator animates the wrong thing

`stkRender()` rebuilds the container's entire `innerHTML` on every operation, so
every box is a new DOM node and **every box replays `slidein`**.

Measured in the browser after three pushes: both surviving boxes reported
`animationName: "slidein"` with `currentTime: 0` — both restarted.

**The motion therefore communicates "all elements moved" when the concept being
taught is "exactly one element moved, at one end."** For a LIFO/FIFO lesson that
is teaching the opposite of the point.

The exit animation (`.sbox.out`) is dead CSS: `pop()` re-renders without the
element, so a value never visibly *leaves*. The student sees it vanish.

### F4 — The step player ignores `prefers-reduced-motion`

The Phase 2 CSS rule zeroes `animation-duration` and `transition-duration`, but
the simulators and tracer are paced by `setTimeout(tick, 760)` in JavaScript,
which the media query cannot touch.

A student who has asked their operating system for reduced motion still waits
760ms per step through a 25-step trace. Reduced motion is not honoured where it
matters most.

### F5 — The most important state change in the product has no transition

`.code .ln.on` — the currently-executing line in the tracer and simulators — sets
a background and border colour with **no transition**. It snaps.

This is the single most-repeated state change in the product (58 tracer steps
plus every simulator run), and it is the one the student must follow. An abrupt
jump gives the eye nothing to track between lines.

### F6 — No sequencing, staging or easing vocabulary

`runSteps()` fires every step at a fixed 760ms with no easing, no stagger, no
distinction between a small state change and a large one. Phase 2 defined
`--dur-fast/base/slow` and one `--ease`, which is enough for UI micro-interaction
but not for educational motion: there is no emphasis easing, no enter/exit
distinction, and no stagger tokens.

### F7 — No visualization type system

A lesson author has exactly one option: a static `{{dia:name}}`. There is no way
to declare an animated or interactive diagram, so any future animated
visualization would be hand-built per lesson — which is precisely how
inconsistency starts.

---

## 3. Classification of all 22 diagrams

Type: **STATIC** (reference image) · **ANIMATED** (plays a sequence) ·
**INTERACTIVE** (student drives it) · **SIMULATION** (models a system).

Purpose: REFERENCE · STRUCTURE · PROCESS · SEQUENCE · CAUSE_AND_EFFECT ·
COMPARISON · MEMORY · MANIPULATION.

### Unit 1 — Data Structures

| Diagram | Purpose | Today | Should be | Animation verdict |
| --- | --- | --- | --- | --- |
| `dataHierarchy` | STRUCTURE | STATIC | **STATIC** | A containment hierarchy is a fact, not a process. Nothing moves. |
| `dsClass` | REFERENCE | STATIC | **STATIC** | A taxonomy. Animating a classification tree teaches nothing. |
| `arrayMemory` | MEMORY | STATIC | **STATIC** | Contiguity is the point, and it is spatial. Static shows it better. |
| `linkedList` | STRUCTURE | STATIC | **ANIMATED** | **High value.** Pointer *traversal* is a sequence students cannot see in a still image: the "follow the arrow to the next node" motion is the concept. |
| `arrayVsList` | COMPARISON | STATIC | **STATIC** | Side-by-side comparison. Motion would split attention. |
| `stackOps` | MANIPULATION | STATIC | **INTERACTIVE** | **Highest value in the unit.** Push/pop *is* motion at one end. Already has a simulator; the diagram should show the same mechanism. |
| `queueOps` | MANIPULATION | STATIC | **INTERACTIVE** | Same reasoning — two ends, and which end is used is the whole concept. |
| `tree` | STRUCTURE | STATIC | **STATIC** | Shape is the lesson. Traversal would be animated — but traversal is not in this unit's syllabus. |
| `graph` | STRUCTURE | STATIC | **STATIC** | As above. |

### Unit 2 — OOP concepts

| Diagram | Purpose | Today | Should be | Verdict |
| --- | --- | --- | --- | --- |
| `popVsOop` | COMPARISON | STATIC | **STATIC** | A comparison of two philosophies. Nothing sequences. |
| `programAnatomy` | REFERENCE | STATIC | **STATIC** | A labelled diagram of program parts. Reference material. |

### Unit 3 — Class and Object

| Diagram | Purpose | Today | Should be | Verdict |
| --- | --- | --- | --- | --- |
| `classObject` | STRUCTURE | STATIC | **ANIMATED** | Moderate value. One blueprint producing several objects is a *generative* idea; showing objects being stamped out communicates "the class is not the object". |
| `accessSpecifiers` | REFERENCE | STATIC | **STATIC** | A permission table drawn as a diagram. |
| `ctorDtor` | SEQUENCE | STATIC | **ANIMATED** | **High value.** Construction and destruction are ordered events in *time*. A still image cannot show that destruction runs in reverse. |

### Unit 4 — Abstraction / Encapsulation

| Diagram | Purpose | Today | Should be | Verdict |
| --- | --- | --- | --- | --- |
| `abstraction` | STRUCTURE | STATIC | **STATIC** | A layering idea; the layers do not act. |
| `encapsulation` | CAUSE_AND_EFFECT | STATIC | **ANIMATED** | Moderate. Showing an outside call being *blocked* at the private boundary, then succeeding through the setter, makes the rule visible. |

### Unit 5 — Inheritance

| Diagram | Purpose | Today | Should be | Verdict |
| --- | --- | --- | --- | --- |
| `inhTypes` | REFERENCE | STATIC | **STATIC** | Five shapes to memorise for the exam. Static is *better* — students screenshot and revise from it. |
| `inhAccess` | REFERENCE | STATIC | **STATIC** | A rules table. |
| `ctorOrder` | SEQUENCE | STATIC | **ANIMATED** | **Highest value in the unit.** "Base constructor runs first, destructors reverse" is a *temporal* fact and one of the most-asked exam questions. Order is exactly what animation shows and a still image cannot. |

### Unit 6 — Polymorphism

| Diagram | Purpose | Today | Should be | Verdict |
| --- | --- | --- | --- | --- |
| `polyTypes` | REFERENCE | STATIC | **STATIC** | A taxonomy of the two kinds. |
| `overloadResolve` | PROCESS | STATIC | **ANIMATED** | Moderate. The compiler *rejecting* candidates one by one is a process; the existing simulator already covers it well. |
| `dispatch` | CAUSE_AND_EFFECT | STATIC | **ANIMATED** | **High value.** The same pointer reaching a different function depending on the object is the hardest idea in the subject, and it is a *flow*. |

### Non-diagram visuals

| Visual | Type today | Verdict |
| --- | --- | --- |
| Stack / Queue simulator | SIMULATION | Keep; fix F3 so only the changed element animates |
| Dispatch simulator | SIMULATION | Keep; add flow motion along the resolution path |
| Program tracer | INTERACTIVE | Keep engine untouched; fix F5 (line transition) and F4 (reduced motion) |
| Prediction component | INTERACTIVE | Keep; connect commit → animation → explanation |
| Hero visual | STATIC + decorative `pop` | Keep — it is the one place decoration is acceptable |

### Summary of the classification

| Verdict | Count |
| --- | --- |
| **Stay STATIC** (animation would not help, or would hurt) | **14 of 22** |
| Become ANIMATED | 6 |
| Become INTERACTIVE | 2 |

**Two thirds of the diagrams should not be animated.** Taxonomies, comparison
tables and reference shapes are better still: students revise from them, print
them and screenshot them. This is the most important conclusion of the audit and
it directly constrains the rest of the phase.

---

## 4. Priority for implementation

Ranked by *educational value per unit of risk*, not by visual appeal.

| # | Work | Why first |
| --- | --- | --- |
| P1 | Motion token system + reduced-motion for JS-paced steps (F4, F6) | Everything else depends on it; F4 is an accessibility defect |
| P2 | Fix the stack/queue render so only the changed element animates (F3) | Current motion actively teaches the wrong thing |
| P3 | Transition the active code line (F5) | Highest-frequency state change in the product |
| P4 | Animatable diagram format — ids, groups, tokens (F1, F2) | Unblocks every future animated diagram |
| P5 | `ctorOrder` animation | Highest-value single diagram: a temporal fact, heavily examined |
| P6 | `linkedList` traversal | Pointer-following is invisible in a still image |
| P7 | `dispatch` flow | Hardest concept in the subject |
| P8 | Visualization type system + build validation (F7) | Makes the above reusable by future authors |

Not attempted in this phase: CPU, logic gates, networking, DBMS, sorting. Those
subjects do not exist yet; building their animations now would be speculation.

---

## 5. What must not be lost

- 14 diagrams that are correctly static, and print/screenshot well
- The tracer's step correctness — verified byte-exact against baseline output
- Simulator outputs, ids and handlers
- Zero dependencies
- Offline operation
- The bilingual model: any label added to a diagram must carry both languages
