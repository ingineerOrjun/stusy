# Learning Experience Model

How a lesson is structured, and why. This is the framework a content author
follows so that the 500th lesson teaches as well as the 6th.

---

## 1. The loop

```
Learn  →  Visualize  →  Interact  →  Experiment  →  Practice  →  Master
```

The Phase 2 audit found the first half strong and the second half fragmentary:
32 bilingual explanations and 22 diagrams, but interaction in only 2 of 6 units
and no prediction anywhere. The components below exist to close that gap.

## 2. The lesson framework

A **framework, not a checklist.** A number-systems lesson needs more worked
examples; a logic-gates lesson needs more simulation; a terminology lesson may
need neither. Sections are chosen, not filled in.

| Stage | Component | Required? |
| --- | --- | --- |
| Orientation | page head, breadcrumb, unit chip bar | Automatic |
| Learning objective | `.outcomes` | **Yes** — validated |
| Concept explanation | `.pair` (`.en` + `.np`) | **Yes** |
| Visualisation | `figure.fig` + `{{dia:}}` | Where a mechanism has a shape |
| Worked example | `.wex` | Where a procedure has steps |
| Common mistake | `.mistake` | Where students reliably err |
| Predict / think | `.predict` | Before any simulation worth running |
| Interactive experiment | `.sim` | Where behaviour beats description |
| SEE exam connection | `.exam-connect` | **Yes** — warned if absent |
| Independent practice | `.examq` + `.ans` | **Yes** |
| Summary | `.keypoints` | **Yes** — validated |

Four of these are enforced by `build/validate.js`. A unit missing its objectives
or its recap **fails the build**.

## 3. Predict → Experiment → Explain

The most important pattern added in Phase 2.

```
PREDICT          student commits to an answer
   ↓
RUN              the simulation shows what actually happens
   ↓
COMPARE          right or wrong, marked immediately
   ↓
EXPLAIN          why it happened — in both languages
```

**Why commitment first.** A student who reads the correct answer usually
believes they knew it. A student who commits and is wrong has a memory hook.
The cost is one click; the gain is that the correction is *theirs*.

Authoring is declarative — no JavaScript:

```html
<div class="predict" data-answer="b">
  <p class="predict-q">Predict first · पहिले अनुमान गर्नुहोस्</p>
  <h4>You push 10, 20, 30 then call pop(). Which value comes out?</h4>
  <div class="predict-options">
    <button class="predict-opt" data-value="a">10</button>
    <button class="predict-opt" data-value="b">30</button>
  </div>
  <div class="predict-feedback">
    <p>A stack removes from one end only…</p>
    <span class="np-cell">स्ट्याकले एउटै छेउबाट मात्र झिक्छ…</span>
  </div>
</div>
```

The build **rejects** a prediction whose `data-answer` matches no option, that
has fewer than two options, that has no feedback, or whose feedback has no
Nepali. A question a student cannot get right must never reach them.

**Do not force it.** Prediction suits a question with a small set of plausible
answers where the wrong one is *tempting* — LIFO vs FIFO, which overload wins,
what a pointer prints. It does not suit recall.

## 4. Simulation as a learning object

Every simulation uses one frame, so a student learns the interface once and
spends attention on the concept:

```
┌──────────────────────────────────────┐
│ ▶ INTERACTIVE EXPERIMENT             │  .sim-kicker
│ Stack and Queue, side by side        │  .sim-head h4
│ What you will learn: …  (EN + NE)    │  .sim-goal
├──────────────────────────────────────┤
│         interactive area             │  .sim-stage
├──────────────────────────────────────┤
│ TRY IT   [push] [pop] [peek] [Reset] │  .sim-controls
├──────────────────────────────────────┤
│ bilingual step commentary            │  .sim-result
├──────────────────────────────────────┤
│ Why did this happen?                 │  .sim-why
└──────────────────────────────────────┘
```

`.sim-goal` and `.sim-why` are the additions that matter. Before Phase 2 a
student could press buttons, watch boxes move, and leave without knowing what
they were supposed to notice. **A simulation that shows *what* without saying
*why* is a toy.** The build enforces the presence of both.

## 5. Exam connection

The audit measured every unit's first exam question at **83–90% down the page**.
A student who stops reading at 80% — likely on a 5,000-word page — met none.

`.exam-connect` now introduces the practice block by naming *what the SEE
actually asks from this unit*, in both languages, before the questions. The
questions stop reading as an appendix and start reading as the point.

```
Concept  →  SEE relevance  →  worked example  →  exam question  →  model answer
```

**Known limitation.** The questions themselves are still grouped at the end of
each unit rather than placed beside the concept they test. Moving them is content
work — each question must be matched to its concept — and is recorded as content
debt, not architecture debt. The pattern for inline placement exists and is
demonstrated on the design-system page.

## 6. Bilingual presentation

Unchanged, because the audit found it correct: English in a solid `.en` panel
carrying exam wording, Nepali in a dashed `.np` box explaining it, **both always
visible, never a toggle**.

Phase 2 additions:

- `lang="ne"` on every Nepali passage (Phase 1) now pairs with `--lh-deva`, a
  looser line height, because Devanagari conjuncts need more vertical room.
- A 12px type floor applies to both scripts — 10px Devanagari was unreadable.
- Every new component carries both languages, and validation enforces it.

**The mobile problem, stated honestly.** Below 820px `.pair` stacks, so on a
320px screen the Nepali box can be a screen away from its English original. Gap
was tightened, but the fundamental tension — two languages, one narrow column —
is not solved. Options for Phase 3 are in
[PHASE-2-DECISIONS.md](PHASE-2-DECISIONS.md#adr-204).

## 7. Cognitive load

| Rule | Why |
| --- | --- |
| One idea per `.pair` | Two concepts in one panel means neither is the subject |
| A diagram earns its place by showing a *mechanism* | Decoration costs attention and pays nothing |
| `.mistake` names the error, not the rule | "Students write X" beats "remember Y" |
| Interaction must change something visible | A control with no visible consequence teaches nothing |
| `--space-section` between topics | Rhythm tells the eye where a section ends |

## 8. Engagement without dark patterns

Deliberately **not** built: streaks, points, badges, leaderboards, notifications,
artificial urgency, or any reward disconnected from learning.

What is used instead:

| Mechanism | How it appears |
| --- | --- |
| Curiosity | A prediction the student cannot resist answering |
| Agency | Controls that change a visible model |
| Immediate feedback | Right/wrong the moment they commit |
| Competence | Worked examples that show the route, not just the answer |
| Progress | Objectives at the start, recap at the end |

Every one of these is a consequence of learning. None is a reward for time spent.

## 9. Authoring a new lesson

```
1. Create _source/content/lessons/<id>.html          one <section>
2. Open with .outcomes                               objectives, bilingual
3. Per topic:  .topic heading → .pair → figure.fig → .wex
4. Add .mistake where students reliably err
5. Add .predict + .sim where behaviour beats description
6. Close with .exam-connect → .examq → .keypoints
7. Register the page in _source/config/pages.js
8. npm run check
```

The author writes HTML using a fixed vocabulary. They never write CSS, never
write JavaScript, never touch the build, and never think about heading levels,
`lang` attributes or responsive behaviour — all of which the build applies.

The full component list is in
[UI-ARCHITECTURE.md](UI-ARCHITECTURE.md); every component is rendered live on
`design-system.html`.
