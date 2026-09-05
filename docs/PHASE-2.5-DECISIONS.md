# Phase 2.5 — Motion & Visualization Decision Records

---

## ADR-251 — Two thirds of the diagrams stay static

**Context.** 22 diagrams, none animated. The obvious move was to animate as many
as possible.

**Options.** (a) Animate everything animatable. (b) Classify each diagram by
educational purpose and animate only where motion teaches something.

**Decision.** (b). Result: **14 static, 6 animated candidates, 2 interactive.**

**Reason.** Taxonomies (`inhTypes`, `polyTypes`, `dsClass`), comparisons
(`arrayVsList`, `popVsOop`) and reference tables (`accessSpecifiers`,
`inhAccess`) are *better* as stills. Students screenshot them, print them and
revise from them, and a still can be taken in at a glance. Animating a
classification tree adds motion and removes that.

**Trade-offs.** The phase produces fewer animations than "an animation system"
might suggest. That is the point: the deliverable is the *system plus correct
judgement about when to use it*, not a count.

---

## ADR-252 — State-driven diagrams, not mutation chains

**Options.** (a) Each step mutates the DOM; Prev undoes it. (b) Each step is
declarative; showing step N resets and replays 0…N.

**Decision.** (b).

**Reason.** Undo is where step players rot. Every new step verb needs a matching
inverse, and one asymmetry makes backwards stepping silently wrong. Recomputing
from step 0 is a few microseconds of class toggling and is *exact by
construction* — Prev and Next always reach identical states.

**Trade-offs.** A step cannot depend on how the student arrived at it. That is a
feature for teaching: a given step number always shows the same thing.

**Verified in the browser:** stepping 0→1→3→6, then Prev, then Reset produced
exactly the expected element sets at each point.

---

## ADR-253 — No animation library

**Options.** GSAP, anime.js, Motion One, or hand-rolled.

**Decision.** Hand-rolled. `MotionService` is 7.9 KB; `DiagramRuntime` is 8.4 KB.

**Reason.** The product needs timing tokens, a cancellable step player, a
lifecycle that parks off-screen work, and class toggling. Every animation is
CSS-driven; the JavaScript only decides *when*. A library would add 20–70 KB and
a dependency to a project whose zero-dependency status is one of its best
properties, to replace roughly 300 lines.

**When to revisit:** if a future simulation genuinely needs physics, path
morphing, or timeline scrubbing. Nothing in the planned curriculum does.

---

## ADR-254 — Reduced motion drops movement, never information

**Context.** The CSS media query zeroes transitions, but the simulators and
tracer are paced by `setTimeout(760)`, which CSS cannot reach. A student who
asked for reduced motion still waited 760ms per step through a 25-step trace.

**Decision.** Route all timing through `MotionService`. Under reduced motion:
movement durations collapse to zero, narrated sequences **complete instantly**,
step-revealed diagram elements render at 35% opacity rather than hidden, and
`--dur-step` is **preserved** as a token.

**Reason.** Two distinct things were conflated. Animation is movement; the pause
between narrated steps is *reading time*. Removing the first is the point;
removing the second would destroy the explanation. And a diagram whose steps are
hidden must not become blank when the reveal transition is removed — it should
read as one complete static figure.

**Trade-offs.** A reduced-motion student sees the whole simulator sequence at
once rather than stepped. The console is a log, so reading it complete is
equivalent — but it is a different experience, not an identical one.

---

## ADR-255 — Fix the reconciler rather than the animation

**Context.** The stack simulator replaced its container's `innerHTML` on every
operation, so every box became a new node and **every box replayed the enter
animation**. Measured: after three pushes, every surviving box reported
`currentTime: 0`.

**Options.** (a) Shorten or remove the animation. (b) Reconcile so only the
changed element is new.

**Decision.** (b).

**Reason.** The animation was not too strong — it was on the **wrong elements**.
Motion said "everything moved" while the lesson says "exactly one element moved,
at one end". For a LIFO/FIFO comparison that teaches the opposite of the point.

**How the same code serves both structures:** the reconciler takes `atEnd`. A
stack changes at the end, a queue at the front — and that difference is exactly
what the side-by-side comparison exists to teach, so it is now visible in the
motion itself.

**Verified:** after the fix, settled boxes report `playState: "finished"` while
only the newly added box is `running`. The exit animation, previously dead CSS,
now plays on the correct end for each structure.

---

## ADR-256 — Diagrams scroll on mobile; they do not scale

**Decision.** `.dia-stage` scrolls horizontally, with an edge fade and keyboard
focus, rather than the SVG scaling to fit.

**Reason.** Diagrams are authored at ~720 units. Scaled into 250 CSS pixels,
12px labels render at roughly 4px — the labels *are* the content, so a legible
crop beats an illegible whole.

**Bug this exposed.** The first implementation put the SVG directly in `.dia`,
which had no overflow rule. Combined with the Phase 2 `html,body{overflow-x:clip}`,
the diagram was **cropped with no way to scroll to the rest** — worse than
overflowing. Found in mobile QA at 320px and fixed by adding the stage wrapper.

**Trade-offs.** The student must scroll to see a whole diagram on a phone. A
simplified mobile variant would be better for some diagrams, but means authoring
two versions of each. Deferred.

---

## ADR-257 — Emphasis strokes shapes, not text

**Context.** `.dia-focus.on { stroke: …; stroke-width: 3 }` applied to a `<g>`
inherits to every child, including `<text>`.

**Decision.** Stroke shapes; emphasise text by `fill`.

**Reason.** Found during visual QA: focused labels rendered thickened and
smudged. A focused label must become *easier* to read, not harder — the styling
was doing the opposite of its intent.

**Verified:** focused shapes go 1.6px blue → 3px yellow; text stroke is `none` in
both states.

---

## ADR-258 — No autoplay

**Decision.** Animated diagrams mount at step 0 and wait. Play exists as a
control; nothing starts on load.

**Reason.** A diagram that starts moving while a student is reading the paragraph
above it competes with the text. Worse, they may miss the beginning and have no
idea they can replay. Starting at step 0 with a visible step counter makes the
control obvious. A test asserts `mount()` contains no `play()` call.

---

## ADR-259 — Animate only compositor-friendly properties

**Decision.** Transform, opacity, colour and filter only.

**Verified:** all 8 keyframe animations audited and compliant. Two
`transition: width` cases remain — the tracer progress bar and the showcase
duration demo — both single small elements, neither in a per-frame loop.

**Honest limitation:** frame-rate could not be measured reliably, because
`requestAnimationFrame` and `setTimeout` are throttled in the hidden automation
pane (sampling returned 1000ms frames). What *was* measured: **0 animations
running while a page sits idle**, which is the property that matters most for a
low-end phone. Real-device frame profiling remains outstanding.

---

## ADR-260 — Diagram configuration is generated, not inline

**Decision.** Steps are emitted to `assets/js/diagram-data.js`, mirroring the
question bank, rather than inlined as `<script type="application/json">`.

**Reason.** Keeps the diagram's steps beside the diagram in source, keeps the
page free of embedded data, and keeps the CSP path open — no inline script of
any kind. It also means one diagram used on three pages ships one definition.

**Load order matters** and cost a debugging cycle: `diagram-data.js` calls
`DiagramRuntime.register()`, so the runtime must load first. Now enforced by the
build and asserted by a test.

---

## Decisions deliberately NOT taken

| Not done | Why |
| --- | --- |
| Animate the remaining 4 identified candidates (`linkedList`, `classObject`, `encapsulation`, `overloadResolve`) | The system is proven on two; the rest is content work with a known pattern. Ranked in the audit |
| Convert diagram colours to design tokens | 93 hard-coded hex values across 22 diagrams. A mechanical change with real regression risk to figures that currently render correctly. Recorded as debt |
| Animate the program tracer's variable state | The tracer's correctness is verified byte-exact against baseline; a state panel is a content and engine change, not a motion one |
| SMIL (`<animate>`) | Class-driven CSS is steppable, reversible and reduced-motion aware. SMIL is none of those |
| Canvas | Nothing needs per-pixel rendering. SVG keeps labels selectable, scalable and accessible |
| A visualization type in the lesson markup | The author writes `{{dia:name}}`; the mode belongs to the diagram. Putting it in the lesson would let the same diagram behave differently in two places |
