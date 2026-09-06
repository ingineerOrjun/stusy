# Phase 3.1 — Decisions

Significant choices made during the consolidation phase, with the reasoning
and the evidence. Records what changed and why; it does not rewrite history.

---

## D1 — Control labels get a string table, not bilingual markup

**Decision.** UI/system strings (`Next`, `Reset`, `Show the answer`, …) are
resolved from `runtime/services/strings.js` and applied to elements marked
`data-ui="key"`. Content stays bilingual-in-the-DOM as before.

**Why not the same mechanism as content.** Content works by putting both
languages in the DOM and letting CSS choose. Applied to a control that gives
`Next  अर्को` on a 60px button. The bilingual mode's entire value is that it is
*not* cluttered; a control that shows two languages undermines the mode it is
part of.

**Why bilingual mode shows English on controls.** The labels are short, the
exam is in English, and a student in bilingual mode is by definition reading
English elsewhere on the page. Recorded as a deliberate exception in
LANGUAGE-SYSTEM.md §7 rather than left implicit.

**Why `textContent`, never a re-render.** A component that re-renders to change
language throws away whatever the student was doing. `apply()` only writes the
label of an element that already exists. Verified: an 8085 simulation at step
7/12 with ACC = 05H survived two language switches with every value intact.

**Cost.** A composed string like `step 3 / 5` cannot be a plain key, so three
components subscribe to `languagechange` and re-render *state-driven* — they
read the current step rather than advancing it. That is the only reason a
re-render is safe there, and it is commented at each site.

---

## D2 — The contrast fix splits the border token instead of raising it

**Decision.** New `--line-strong: #5d7b72` for control borders. `--line`
(`#2c4a41`) keeps its value for decorative rules.

**Evidence.** `--line` measured 1.44:1 on `--panel`, against a 3:1 requirement.
But of 70 uses across six stylesheets, only ~20 are boundaries of a user
interface component; **32 are decorative rules, dividers and hairlines**.

**Why not the Phase 2 candidate.** `#5e7c73` applied globally reaches 3:1 —
and lightens all 32 decorative rules with it, visibly changing the chalkboard
identity. WCAG 1.4.11 covers *"visual information required to identify user
interface components"*; a divider is not one. Raising everything would have
been over-correction dressed as compliance.

**Why `#5d7b72` and not `#5e7c73`.** It is the measured minimum that clears
3:1 on all four grounds. One unit darker than the Phase 2 candidate, and the
smaller change to the surface.

**`--chalk-faint` did take the Phase 2 candidate**, `#819791` — which turned
out to be exactly the minimum sufficient value, +3 per channel.

**Not raised:** `--line-soft` (1.25) and the code well against its panel
(1.30). Both are decorative grouping. A code block is content presentation;
its edge is not required to identify a control.

---

## D3 — Diagram colours move to tokens, declared where they can win

**Decision.** All 129 raw hex references in the 38 diagrams became
`var(--color-*)`, declared in `style=` rather than as presentation attributes.

**What the move exposed.** 54 colour cues **had never rendered**. A
presentation attribute has specificity 0; `.f-lbl { fill: … }` is (0,1,0) and
beats it. Labels meaning "blocked" and "allowed" were both showing as neutral
grey — and colour is carrying the meaning in those figures, so it was a
teaching defect, not a cosmetic one.

This is the **third** instance of the same trap in this project, after
`font-size` and `text-anchor`. All three had the same shape: an SVG
presentation attribute silently losing to a class rule. A test now asserts
that a classed element declares its colour in `style=`.

**Semantic names, not colour names.** `--color-error` rather than `--coral`,
so a diagram says what a colour *means* and a re-theme cannot invert the
meaning.

**Verified after:** 124 tokenised declarations checked in the browser, all
resolving to their intended value; 38 of 38 figures still pass the geometry
audit.

---

## D4 — Four animation candidates: none built

Re-reviewed against the Phase 2.5 test rather than built because they were on
a list.

| Candidate | Decision | Reason |
| --- | --- | --- |
| `classObject` | **Reject permanently** | A class and its objects is a relationship, not a process. Motion would imply a sequence that does not exist. |
| `encapsulation` | **Reject permanently** | The figure shows access allowed and access blocked *side by side*. Animating it would show one, then the other, and destroy the comparison — which is the lesson. |
| `linkedList` | **Defer** | The lesson is the shape — nodes and pointers — which a still image carries. Insertion is already taught by the stack/queue simulator, which animates a structure the student drives. |
| `overloadResolve` | **Defer, with a trigger** | The best remaining candidate: the compiler eliminating candidates *is* temporal. But Unit 6 already carries the `dispatch` animation on the same page, and two step-through animations in one unit compete for the same attention. Revisit when Unit 6 is next edited. |

Building all four because they were previously identified is exactly the
"animate because it is possible" failure the phase brief warns against.

---

## D5 — `learning-ux.css` is not consolidated

**Decision.** Leave it. Document the finding.

**Evidence.** 85 rules inspected by category:

| Category | Rules | Verdict |
| --- | --- | --- |
| Responsive containment, readability floors, focus, rhythm | 16 | Correctly placed — deliberately cross-cutting. Moving them into each component would duplicate them. |
| Definitions of the Phase 2 components (`.sim`, `.predict`, `.exam-connect`) | ~60 | **Not corrections.** They are component definitions living in the wrong file. |
| Small per-component corrections | ~9 | Candidates, individually low value |

**Why not move the 60.** They belong in `site.css` on the merits. But moving
rules between stylesheets changes cascade order for anything with equal
specificity, across a product whose most common defect class this phase has
already been *specificity*. The only observable benefit is tidiness. The risk
is not justified by the reward, and a future phase that is already touching
those components can do it with the tests as cover.

---

## D6 — Frame rate is still not measured

Unchanged from Phase 2.5, and deliberately so. `requestAnimationFrame` and
`setTimeout` are throttled in the automation pane, so any number produced here
would describe the harness rather than the product. **No figure is claimed.**

What *was* measured instead, on an idle page after interaction:

| | |
| --- | --- |
| Animations running while idle | **1**, `playState: "finished"` |
| Infinite animations | **0** |
| Layout-triggering transitions | **0** *(was 1 — fixed, see D7)* |
| Animated properties | colour 8, border-colour 8, background 6, stroke 3, opacity 2, fill 2, transform 2 |
| `prefers-reduced-motion` blocks | 7, plus the JavaScript path |
| Timer cleanup | `Sequence.destroy()`, `clearTimeout`, `IntersectionObserver.disconnect()` all present |

---

## D7 — The progress bar animates `transform`, not `width`

The single layout-triggering transition in the product. A progress bar is the
easiest possible case to fix: draw it full width, scale it from the left. The
tracer now sets `transform: scaleX(n)` instead of `style.width = n%`.
Visually identical, composited instead of re-laying-out.

---

## D8 — Dead code removed only with evidence

Two class selectors of 290 never appear in any built page, runtime module or
diagram:

- `.c-fn` — a syntax-highlighter colour for function names. `core.js` emits
  `c-com`, `c-str`, `c-key`, `c-typ`, `c-num`; it has never emitted `c-fn`.
- `.scroll-hint` — superseded by `.is-scrollable`, which `core.js` applies
  only when content genuinely overflows.

Both removed. Nothing else was removed: the other 288 selectors are in use,
and "looks unused" is not evidence.

---

## D9 — Inline event handlers stay, for now

63 real `onclick` handlers (plus 56 inert `onclick="return false"` on disabled
navigation links) keep `script-src 'unsafe-inline'` in the CSP.

**Deferred.** Converting them is mechanical but touches every simulator and
the tracer, with a real regression surface and no student-visible benefit. The
components added in Phase 3 are already fully delegated, so the debt is
bounded and shrinking rather than growing. The migration is recorded in
PHASE-3.1-AUDIT.md M6 for a phase that is already touching those files.

---

## D10 — A test that cannot fail is a defect

`every built page keeps its title in Nepali mode` matched
`/<div class="t-en">[\s\S]{0,400}?<h1[ >]/`. A regex cannot tell whether the
wrapper was still open when the heading appeared. The same pattern reported
**8 pages with a wrapped heading; a nesting-aware walk found zero.** It also
could not have failed if a heading sat more than 400 characters in.

Replaced with a walk of the tag stream that tracks wrapper depth — and a
second test that runs that walk against markup which *does* have the defect,
so the check is proved able to fail.

The same principle was applied to the new build validation: **all 7 language
checks were proved by breaking the thing they guard** and confirming the build
refused, before being trusted.

---

## D11 — Things deliberately left alone

| Left alone | Reason |
| --- | --- |
| `.pair` two-column component | Works, tested, and is the product's visual identity |
| Diagram runtime, motion service, simulation registry | No defect found; reused unchanged by five new components |
| Build pipeline structure | Reproducible, deterministic, zero-dependency |
| Bilingual as the default mode | The pedagogy has not changed |
| Existing lesson prose | No errors found. Rewriting content is not hardening |
| The chalkboard palette | Only the two measured failures moved, one of them by 3/255 |
| `data-answer` serving two meanings | A latent collision, currently harmless — the answer-toggle wiring skips prediction boxes because `getElementById` returns null. Renaming one of them touches six lessons for no present benefit. Recorded in ACCESSIBILITY-AUDIT.md §9 |

---

## D12 — A label pair is split in place, not moved into the string table

**The problem.** 41 authored labels and 9 runtime labels put both
languages in one text run: `Interactive experiment · अन्तरक्रियात्मक
प्रयोग`. A CSS-driven language layer can hide an element. It cannot
hide half of a sentence.

**Option A — move them into `UIStrings`.** They are labels, and the
string table already exists for labels. Rejected: these are section
labels *inside authored content*, and moving them would mean the
lesson's own words live in a JavaScript table where an author cannot
find them. It also breaks the rule the whole system rests on — one
source of truth, and content stays in the content file.

**Option B — author each label twice, in two elements.** Rejected: it
duplicates the separator, and every author would have to remember to
write `·` in exactly one of the two halves.

**Chosen — nest the halves so the separator leaves with the Nepali:**

```html
<span class="t-en">Interactive experiment</span>
<span class="t-ne"><span class="t-en"> · </span>अन्तरक्रियात्मक प्रयोग</span>
```

Bilingual renders `Interactive experiment · अन्तरक्रियात्मक प्रयोग` —
byte-identical to what shipped before. English drops the second span and
renders `Interactive experiment`. Nepali drops both `.t-en` spans,
separator included, and renders the Nepali alone.

**Why this and not a new CSS rule.** It reuses the two rules the
language layer already has. No new selector, no new specificity to
reason about later, and no fourth way of expressing "this text is
English" for the next author to choose between.

### Telling a label pair from prose

This was the hard part, and getting it wrong in either direction is a
real cost: split prose and you mangle a sentence; miss a label and the
defect stays.

`NAND र NOR — यी दुई universal गेट हुन्` is **prose** — Nepali carrying
an English technical term, which §5B requires be left exactly as it is.
`Interactive experiment · अन्तरक्रियात्मक प्रयोग` is a **label pair** —
both halves naming the same thing.

The separator alone does not distinguish them; both use `·` or `—`. The
script ratio does: in a label pair the Devanagari half is a translation
of a short Latin half, so it must exceed the Latin by half again. Of
128 mixed-language elements, that test found 41 pairs and left 87 alone,
and the 87 were checked by eye.

### The terminology exception, stated once

Left in English in every mode, because the SEE paper prints them in
English: gate names, CPU block names, `Truth table`, the four base
names. These are glossed beside, never replaced. The regression test
carries the same list, so the exception is enforced rather than
remembered.

**Enforcement.** `tests/language.test.js` — *a runtime label with a
Nepali twin hides its English half in Nepali mode*. It reconstructs the
HTML each simulation emits from its string literals, walks it keeping
the element stack, and fails on any English label owning a Nepali gloss
with no handle. Proved by removing one wrapper: it reports exactly
`sim-number.js <sim-controls-label>: Add one column at a time`.

---

## D13 — The pairing pass yields to an author's own split

**The defect this fixes.** With V1 fixed inside a heading, the build's
pairing pass wrapped the whole run — including the section number that
sat outside the author's spans. `1.5.1 (a)  Array — एरे` rendered in
Nepali mode as `एरे`.

The pass already had a rule for a run that is *exactly one* explicit
English container. It had none for a run that merely *contains* one.

**The rule added.** An explicit handle anywhere in a run means the
author has already resolved that run, and nothing more is owed to it.

This is the third rule of its kind, and they share a shape: each one
stops the transform from reaching past the local
`English sentence + its Nepali gloss` case it was built for. The
locality rule stops it reaching down into nested Nepali; the never-wrap
list stops it swallowing headings and badges; this one stops it
overwriting the author.

**Risk accepted.** The rule can only ever prevent a wrap, never cause
one, so its failure mode is an unwrapped English run — visible, and
caught by the sweep. The test covers both directions: the split heading
must come back byte-identical, and the same text without the author's
handle must still be paired.

---

## D14 — The type floor is enforced by measurement, not by assertion

**The finding.** `digital.css` set seven labels between 9.5px and 11px
while the design system's own page says 12px is the floor and nothing
smaller ships. The K-map's minterm indices — the labels a student reads
to check their own grouping — were the smallest text on the site.

**Why it was not simply raised.** These sit in dense grids. Raising type
in a tight layout is how a table starts to clip, and the brief is
explicit that a stylesheet should not be churned on principle.

**So it was measured first.** At 12px the K-map grid grows from 286px to
288px, the cell stays 56×57, and there is 774px of slack in the parent.
The floor fits. It was then applied and the four affected pages
re-swept at 1280px and 375px: clean.

**The exception, stated rather than left silent.** `•` and `∅` in the
linked-list figure remain at 9.6px. They are glyphs drawn as type, not
text to be read, and the floor is a reading floor.

**What was not done.** The SVG label sizes in `site.css` were left
alone. Those are user units inside a scaled `viewBox`, not CSS pixels,
so the same number does not mean the same thing — and the brief's
warning against unnecessary stylesheet rewrites applies squarely to
changing 38 diagrams' internal type on an untested analogy.

---

## D15 — Visual QA is an instrument, not a session

**The problem with "look at it once".** The three defects above all
passed 200 green tests, so the looking was necessary. But a pass done by
eye once, by whoever happened to be here, is not repeatable and cannot
be handed on.

**So the pass is a tool:** `tests/manual/qa-sweep.js`, run in a real
browser against a page, reporting one line per page. It measures page
overflow, content clipped by a non-scrolling parent, boxes a mode left
empty, the wrong language on screen, and text below the floor.

**Why it is not in the automated suite.** Every one of those five checks
needs applied CSS and real layout. The node suite's DOM stub has neither,
and a version of these checks written against the stub would assert on
markup — which is exactly the blind spot that let the defects through.
Faking the measurement in the suite would be worse than not having it.

**What it deliberately does not report.** No frame rate. The automation
pane throttles `requestAnimationFrame`, so any number measured through
it would be fiction, and the tool says so in its own header rather than
producing one.
