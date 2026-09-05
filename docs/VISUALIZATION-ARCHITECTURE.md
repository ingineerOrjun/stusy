# Visualization Architecture

How educational visuals are authored, built, rendered and validated — and how a
future author adds one without learning any animation internals.

---

## 1. Four visualization modes

All four are first-class. Choosing correctly matters more than choosing the
fanciest.

| Mode | What it is | Authored as | Today |
| --- | --- | --- | --- |
| **STATIC** | A reference figure | `D.name = '<svg>…</svg>'` | 20 diagrams |
| **ANIMATED** | A stepped sequence the student drives | `D.name = { type:'animated', svg, steps }` | 2 diagrams |
| **INTERACTIVE** | The student manipulates a model | A runtime module + `SimulationService.register()` | 3 simulators |
| **SIMULATION** | A system modelled over time | Same as interactive, with more state | (same 3) |

Interactive and simulation share one mechanism; the distinction is depth of
model, not architecture.

## 2. The pipeline

```
_source/diagrams.js            static string  OR  { type:'animated', svg, steps }
        │
        │  {{dia:name}} in a lesson
        ▼
build/index.js
   ├── static   → the SVG, inline, inside figure.fig
   └── animated → <div class="dia" data-dia="name">
                    <div class="dia-stage"> svg </div>
                    control bar · bilingual caption
        │
        ├── assets/js/diagram-data.js   DiagramRuntime.register(name, {intro, steps})
        └── page automatically loads diagram.js + diagram-data.js
        ▼
DiagramRuntime  →  state-driven stepping
```

**The author writes `{{dia:name}}` in both cases.** Whether a diagram animates is
a property of the diagram, not of the lesson. Scripts are added by the build
based on what the page actually contains.

## 3. The animated diagram contract

```js
D.ctorOrder = {
  type: 'animated',
  intro: { en: 'One Puppy object is about to be created…', ne: '…' },
  svg: `<svg viewBox="0 0 720 300" role="img" aria-labelledby="t-cord">
          <title id="t-cord">…</title>
          <g id="cls-animal" class="dia-focus"> … </g>   <!-- emphasisable -->
          <g id="ctor-1"    class="dia-step">  … </g>   <!-- revealed at a step -->
        </svg>`,
  steps: [
    { show: '#ctor-1', focus: '#cls-animal',
      en: 'Animal() runs first — the top-most base is always constructed first.',
      ne: 'पहिले Animal() चल्छ — सबैभन्दा माथिको base क्लास सधैं पहिले बन्छ।' },
    …
  ]
};
```

Step verbs: `show` · `hide` · `focus` · `state` (applies the shared state
language) · `move` (translate within the SVG's own coordinates). Each takes an id
selector or an array of them.

Animatable classes: `dia-step` (revealed) · `dia-focus` (emphasised) ·
`dia-dim` (context) · `dia-travel` (moves) · `dia-draw` (draws itself).

## 4. State-driven, not mutation-chained

Showing step *N* means: **reset every animatable element, then apply steps 0…N in
order.** Never "undo the last thing".

Two consequences that matter:

- **Stepping backwards is exact**, not a guess at reversing a mutation
- Any step can be jumped to, replayed or reset, and always looks identical

This is what makes Prev genuinely usable, and it is why the model is worth the
small extra cost of recomputing.

```
Initial state → action → transition → new state → explanation
```

## 5. Accessibility of a visualization

| Mode | Semantics |
| --- | --- |
| Static | `role="img"` + `<title>` — one image with one accessible name. Correct: it does not change |
| Animated | Caption region is `role="status"`, so each step's explanation is announced. Step counter is `aria-live="polite"`. Controls are real buttons with labels |
| Interactive | Simulator consoles are `role="log"` + `aria-live="polite"` |
| Any, when it overflows | `.dia-stage` becomes focusable (`tabindex="0"`, `role="region"`) so it can be scrolled without a mouse, and gets a visible edge fade |

**Known gap:** static diagrams still carry only a `<title>`; their internal
structure is opaque to assistive technology. See
[ACCESSIBILITY.md](ACCESSIBILITY.md).

## 6. Bilingual visualization

SVG labels stay in English because they are **technical identifiers** —
`Animal()`, `Circle::draw()`, `top`. Translating an identifier would teach the
wrong token for the exam.

The **teaching** is bilingual: every step caption carries `en` and `ne`, rendered
into the caption region beneath the diagram, and validation rejects a step
missing either.

This is a deliberate application of the Phase 2 rule: where simultaneous
bilingual labels would overcrowd the visual, restructure so the explanation
carries both languages — never drop one.

## 7. Responsive behaviour

Diagrams are authored at ~720 units wide. On a phone they **scroll inside
`.dia-stage`** rather than scaling down, because scaling a 720-unit diagram into
250 CSS pixels renders 12px labels at roughly 4px.

Verified at 320 / 375 / 390 / 430 / 768 / 1440: page overflow 0 at every width,
stage contained, all controls ≥ 44px, affordance applied only when content
actually overflows.

## 8. Build validation

The build fails — writing no pages — on:

- an unknown `{{dia:name}}`
- an animated diagram with no `svg`, no `steps`, or an unknown `type`
- an `intro` missing either language
- **a step targeting a selector that does not exist in that diagram's SVG**
- a non-id selector
- duplicate element ids within one diagram
- a step missing an English or Nepali caption

It warns on an element marked animatable that no step ever uses.

The selector check is the one that matters most: a typo'd id previously did
nothing at all, silently, and would have shipped.

## 9. Adding a visualization

**A static diagram**

1. `D.myThing = '<svg viewBox="0 0 720 …">…</svg>'` using the shared `f-*` classes
2. Reference `{{dia:myThing}}`
3. `npm run check`

**An animated diagram**

1. Write the SVG; give animatable groups ids and a `dia-*` class
2. Add `steps`, each with `en` and `ne`
3. Reference `{{dia:myThing}}` — the build adds the runtime and controls
4. `npm run check` — validation catches selector typos

**A simulation** — see
[SIMULATION-ARCHITECTURE.md](SIMULATION-ARCHITECTURE.md#4-building-a-new-simulation).

At no point does the author write CSS, JavaScript, control markup, ARIA, or
responsive rules.

## 10. Choosing the mode

Ask, in order:

1. **Does the concept involve time, order, flow or causation?** If not → STATIC.
2. **Would a student learn more by changing something than by watching?** If yes → INTERACTIVE.
3. **Is it a fixed sequence with a single correct path?** → ANIMATED.
4. **Is it a taxonomy, comparison or reference shape?** → STATIC, always.

Applied to the current library this produced 14 static, 6 candidates for
animation, 2 for interaction — the reasoning per diagram is in
[PHASE-2.5-ANIMATION-AUDIT.md](PHASE-2.5-ANIMATION-AUDIT.md#3-classification-of-all-22-diagrams).

## 11. Scaling to the rest of the curriculum

The step model — *reveal, focus, move, state, with a bilingual caption* — covers
most planned subjects without new machinery:

| Future topic | Fits the model | Additional need |
| --- | --- | --- |
| Number-system conversion | Yes | — |
| Logic gates, truth tables | Yes | A gate renderer |
| Half / full adder | Yes | Reuses the gate renderer |
| K-map grouping | Partly | Grid interaction |
| 8085 instruction cycle | Yes | Register-file visual |
| Memory read/write, buses | Yes | Uses `dia-travel` |
| SQL query execution | Yes | Table renderer |
| Packet flow | Yes | Uses `dia-travel` |
| Sorting, searching | Yes | Reuses the stack/queue reconciler |

The recurring gap is **domain renderers** (gates, grids, tables) — the natural
next extraction, once two visualizations need the same one. Building a gate
renderer before any gate diagram exists would be speculation.
