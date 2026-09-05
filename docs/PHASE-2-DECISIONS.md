# Phase 2 — Design and UX Decision Records

Decisions that shaped the learning-UX and design system, including the ones that
were deliberately **not** taken.

---

## ADR-201 — Keep the visual identity; build the system around it

**Context.** The audit found a sound palette (23 of 24 contrast combinations pass
AA) and a distinctive chalkboard identity, but no spacing scale, no type scale, no
motion tokens and no semantic colour roles. Values were ad-hoc: 16 different
spacing literals, 20+ font sizes down to 0.6rem.

**Options.** (a) Redesign with a new visual language. (b) Keep the palette and add
the system around it. (c) Adopt a third-party design system.

**Decision.** (b).

**Reason.** The identity is not the problem — the *system* is. A redesign would
have burned the phase on aesthetics while leaving the actual defect (no scales,
no roles) untouched, and would have invalidated 22 hand-drawn diagrams built
against the palette. A third-party system would import a dependency and a visual
language that fits a SaaS dashboard, not a Nepali chalkboard.

**Trade-offs.** The two known contrast failures survive into Phase 3. The palette
carries some historical decisions (a single `--r` radius) now superseded by scales.

---

## ADR-202 — Fix the mobile overflow at the CSS-default level, not per component

**Context.** 226px of horizontal page overflow at 320px, 171px at 375px. Root
cause: grid and flex items default to `min-width: auto`, so the simulator's
`.vizbox` could not shrink below its 490px content and inflated its track to
528px inside a 339px container.

**Options.** (a) Fix `.vizbox` specifically. (b) Apply `min-width: 0` to the
known layout containers' children. (c) Apply it globally to every element.

**Decision.** (b).

**Reason.** (a) treats one symptom of a default that will recur with every new
grid a future author writes. (c) is a blunt reset with unpredictable effects on
components that legitimately rely on intrinsic sizing.

**Trade-offs.** A new layout container must be added to the rule's selector list
or it can reintroduce overflow. Mitigated by a test that names the covered
selectors and fails if the rule disappears.

**Result.** Zero overflow at 320, 375, 430, 768 and 1440px.

---

## ADR-203 — Diagrams scroll rather than scale on mobile

**Context.** Diagrams are authored at ~520px. On a 320px screen they must either
scale down or scroll.

**Decision.** Controlled horizontal scrolling inside `figure.fig`, with a visible
edge fade and a focusable region.

**Reason.** Scaling 520px into 284px renders 12px labels at ~6.5px — unreadable,
and the labels *are* the content of a diagram. Scrolling keeps them at full size.
The audit found the scrolling already worked but had **no affordance**, so a
cropped diagram read as a broken one; that was the actual defect.

**Trade-offs.** The student must scroll to see a whole diagram, and cannot see it
at a glance. A genuinely better answer for some diagrams is a simplified mobile
variant — deferred, because it means authoring two versions of each of 22 diagrams.

---

## ADR-204 — Keep simultaneous bilingual display; do not add a language toggle

**Context.** On a 320px screen `.pair` stacks, so a Nepali box can sit a full
screen below its English original, weakening the visual connection the model
depends on. A toggle would solve the space problem.

**Decision.** Keep both languages visible. Tighten the stacked gap. Do not toggle.

**Reason.** The toggle *is* the failure mode the product exists to avoid. A
student who can switch to Nepali will read only Nepali, then meet unfamiliar
English wording in the exam hall. The pedagogy is the mapping between the two —
remove the simultaneity and the product becomes ordinary translated notes.

**Trade-offs.** Long units are longer on mobile. Genuinely unsolved.

**Options for Phase 3** (all preserve simultaneity):
- Nepali collapsed by default *per block*, expanding in place — the pair stays
  adjacent, the page shortens.
- A two-column layout that survives to a narrower breakpoint with smaller type.
- Nepali as an inline aside beneath each paragraph rather than a parallel panel.

Each is a content-model change; none should be chosen without watching a student use it.

---

## ADR-205 — Predict → Experiment → Explain as a first-class component

**Context.** The audit found no prediction pattern anywhere, and interaction in
only 2 of 6 units. The passive half of the learning loop was strong; the active
half barely existed.

**Options.** (a) Document the pattern for authors. (b) Build a component with
runtime behaviour and build-time validation.

**Decision.** (b).

**Reason.** A documented-but-unbuilt pattern would be re-invented differently by
each author. Building it means an author writes declarative HTML — a
`data-answer` and some options — and gets commitment, marking, bilingual verdict
and ARIA for free.

**Why commitment before reveal:** a student who reads the correct answer usually
believes they knew it. Being wrong first creates the memory hook. The cost is one
click.

**Trade-offs.** Prediction suits questions with a small set of *tempting* wrong
answers. Forced into recall questions it becomes a quiz in the middle of a lesson.
Documented as "do not force it", but nothing enforces that judgement.

---

## ADR-206 — Simulation container requires an objective and an explanation

**Context.** Three simulations existed with no shared container: no title, no
statement of what to learn, and no "why did that happen".

**Decision.** A fixed `.sim` frame, with `.sim-goal` and `.sim-why` **required by
the build**.

**Reason.** A student could press buttons, watch boxes move, and leave without
knowing what they were meant to notice. A simulation that shows *what* without
saying *why* is a toy. Making both structural means a future simulation cannot
silently omit them.

**Trade-offs.** Slightly more markup per simulation. The registry's `controls[]`
metadata still does not drive the buttons — inline `onclick` handlers remain (see
ADR-209).

---

## ADR-207 — Heading levels derived by the build, not written by authors

**Context.** No `<h1>` on lesson pages; nav labels opened the outline;
`h1 → h3` skips on four pages. Fixing by hand means every author tracks levels
across a 5,000-word file and gets it right forever.

**Options.** (a) Fix the six files and rely on review. (b) Derive levels from
document nesting at build time.

**Decision.** (b), plus decoupling `.topic`/`.sub` styling from the tag.

**Reason.** Consistent with how `lang="ne"` is already applied: correctness that
every page needs belongs in the build, not in an author's memory. Authors write
`<h2>`/`<h3>`/`<h4>` to express *nesting*; the build assigns the actual levels.

**Trade-offs.** Generated levels differ from authored ones, which can surprise
someone reading source and output side by side. Documented, and the appearance is
identical because the class carries the styling.

**Bug found and fixed during implementation:** the first derivation made every
sibling top-level heading an `h1`. Caught by the "exactly one h1" test, which is
precisely why that test exists.

---

## ADR-208 — 44px touch targets only under `pointer: coarse`

**Decision.** Enforce the 44px floor on touch devices; leave desktop density alone.

**Reason.** A mouse does not need a 44px target, and inflating every control on
desktop would waste vertical space on a product that is mostly reading. Applying
it by input type rather than by viewport width is more accurate: a 1024px tablet
is touch, a 400px desktop window is not.

**Result.** Controls under 44px at 320px went from 27 of 30 to **0 of 35**.

---

## ADR-209 — Inline handlers remain; CSP debt carried forward

**Context.** Phase 1 recorded 60 inline `onclick` attributes forcing
`script-src 'unsafe-inline'`. Phase 2 added `SimulationService.controls[]`
metadata that could drive them by delegation.

**Decision.** Not in Phase 2.

**Reason.** The phase's stated priority was the UX and design system without
breaking the existing 20 pages. Rewiring every simulator control is a change with
real regression risk and no student-visible benefit, competing against fixing an
overflow bug that affects every phone user. Sequencing, not disagreement.

**Trade-offs.** The CSP still reads stronger than it is. Stated plainly in
[SECURITY.md](SECURITY.md#5-the-inline-handler-problem). The new `.predict`
component is already delegated with no inline handlers — the pattern for the
migration now exists in the codebase.

---

## ADR-210 — Design-system page generated, never linked

**Decision.** Generate `design-system.html`; link it from nothing.

**Reason.** A design system that cannot be seen in one place is not maintained. It
must be generated by the real build with the real stylesheet, or it drifts. But
it shows in-progress states and is not student-facing content, so it stays
unlinked. A test asserts no student page links to it, and that it still meets the
same chrome, CSP and offline rules.

**Trade-offs.** It ships publicly at a guessable URL. Acceptable: nothing on it is
sensitive, and gating it would require a backend the product does not have.

---

## ADR-211 — No progress UI, no gamification

**Context.** `ProgressService` has existed and been fully tested since Phase 1,
with no consumer. Phase 2 is the natural place to surface it.

**Decision.** Still no progress UI.

**Reason.** Two separate reasons. First, what progress *means* is unresolved —
units opened? predictions answered? quiz passed? Shipping the wrong metric
teaches students to chase the wrong thing. Second, the brief is explicit about no
fake progress; a bar that fills on scroll is exactly that.

**Explicitly rejected:** streaks, points, badges, leaderboards, notifications,
artificial urgency. Engagement comes from curiosity, agency, immediate feedback
and visible competence — each a consequence of learning rather than a reward for
time spent.

**Trade-offs.** A student cannot see what they have covered. Accepted for now:
the service is ready, so this is a UI decision and not a rebuild.

---

## Decisions deliberately NOT taken

| Not done | Why |
| --- | --- |
| Move exam questions inline beside each concept | Content work — each question must be matched to a concept. Framing (`.exam-connect`) was added; relocation is content debt |
| Add simulations to units 2–5 | Content, not architecture. The pattern exists; the simulations must be designed per topic |
| Redesign the unit chip bar for 46 units | Premature. Revisit when a second subject is authored and the real scale is known |
| Per-unit quizzes | Needs question-bank expansion first (u2 currently has no questions at all) |
| A component framework or CSS-in-JS | The vocabulary is ~20 classes. A framework would add a dependency and a build step to solve a problem that does not exist |
| Splitting the CSS into per-component files | One 4-layer stylesheet is still readable and ships as one request. Revisit past ~2,000 lines |
