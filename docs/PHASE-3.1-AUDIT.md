# Phase 3.1 — Audit

Every issue below was verified against the repository on the day of the audit,
not carried over from a previous report. Where a previous report's claim turned
out to be wrong, that is recorded.

**Verified starting state:** branch `main`, 2 commits, 96 uncommitted entries
(59 modified, 37 untracked). `npm run check` → **176 pass, 0 fail**, three
consecutive runs identical. `npm run build` → clean, 28 pages, 38 diagrams.

---

## Summary

| Severity | Count | |
| --- | --- | --- |
| CRITICAL | 2 | a page that did not work, and a feature promise broken across all 28 |
| HIGH | 6 | accessibility failures, the language contract gap, runtime labels with no handle |
| MEDIUM | 8 | tokenisation, dead code, layout-triggering animation, the type floor |
| LOW | 3 | |
| DEFERRED | 4 | recorded with reasons, not silently dropped |
| **Corrected** | 2 | previous reports were wrong; evidence below |

CRITICAL was 0 when this audit was first written. It is 2 because the
three-mode visual pass came later and found what reading the code could not —
see *Found by looking* at the end of this document.

---

## CORRECTIONS TO PREVIOUS REPORTS

### C1 — "h1 inside a `.t-en` wrapper on 8 pages" is a FALSE POSITIVE

**Evidence.** A regex scan (`/<div class="t-en">[\s\S]{0,600}?<h[1-3][ >]/`)
reported headings inside language wrappers on 8 pages. A nesting-aware walk of
the tag stream — tracking wrapper depth properly — reports **zero**. The regex
matched a wrapper that had already closed before the heading appeared.

**Impact.** None on the product. Real impact on the test suite: the Phase 3 test
`every built page keeps its title in Nepali mode` uses the same flawed pattern
(`{0,400}?`). It passes today for the wrong reason and would keep passing if a
heading were wrapped more than 400 characters in.

**Decision.** Replace the test with the nesting-aware check. **HIGH** — a test
that cannot fail is worse than no test.

### C2 — "`_source/build/context.js` contains an absolute Windows path"

**Evidence.** The string `C:/Users/Acer/Desktop/rgsc-study` appears at
`context.js:21` — inside a comment explaining what Phase 1 removed. The code
derives its paths from `__dirname`. No functional dependency.

**Decision.** Not a defect. Reword the comment so a future grep does not
re-raise it. **LOW**.

---

## CRITICAL

### X1 — the whole program tracer vanished in Nepali mode

**Issue.** `trace.html` used `<div class="en">` as a *layout container*. The
class has two meanings in this codebase — "this text is English" and, by
accident of history, "this is a panel" — and the Nepali rule
`[data-lang="ne"] .en { display: none }` could not tell them apart.

**Evidence.** In Nepali mode the page rendered its heading and nothing else.
The code panel, the console, the step controls and the explanation line were
all inside that container. Found by counting visible elements per mode: the
count dropped by the entire tracer.

**Impact.** The single richest interactive page in the product was blank in one
of its three modes. A student who set Nepali once — the setting persists — would
never have seen it work.

**Recommended action.** Separate the two meanings, in both directions:
scope the CSS rule so it can only hide a bilingual panel, and give the layout
role its own class in the markup.

**Risk.** Low. Scoping a rule can only ever hide less.

**Decision.** FIXED, twice on purpose:

```css
[data-lang="ne"] .pair .en,   /* was: [data-lang="ne"] .en */
```

and the markup now uses `.panelbox` for the layout role, with the panel styling
split out of `.en` in `base.css`. Two tests guard it: one asserts the rule stays
scoped, and one walks every page for a component that sits inside a language
container and would vanish in a mode.

**Why this is CRITICAL and the rest of this audit is not.** Everything else
found here is a hardening issue. This was a page that did not work.

### X2 — both languages on one line, in every mode

Recorded in full as **V1** under *Found by looking*, and classified CRITICAL for
the same reason: it broke the three-mode feature's core promise on the most
visible label of every simulation and every recap, in all 28 pages.

---

## HIGH

### H1 — UI control labels are hard-coded English

**Issue.** The three language modes cover lesson content, quiz content and
diagram captions. They do not cover the **controls**. Every simulator emits its
buttons as literal English.

**Evidence.**

| Module | Hard-coded labels |
| --- | --- |
| `sim-8085.js` | `◂ Prev`, `Next ▸`, `Reset` |
| `sim-number.js` | `◂ Prev`, `Next ▸`, `Reset` |
| `sim-kmap.js` | `Mode: set 1s`, `Mode: select group`, `Check this group`, `Clear selection`, `Reset` |
| `core.js` | `Show the answer` / `Hide the answer`, `aria-label="Simulation output"` |
| `build/index.js` | animated-diagram controls `Prev`, `Play`, `Next`, `Reset`, `step N / M` |
| `quiz.html` sections | `Try again` |

**Impact.** A student in Nepali mode reads Nepali prose and English buttons.
More importantly for the platform: **the next developer adding a component will
hard-code English too**, because nothing stops them and there is no pattern to
copy. This is the specific failure the phase exists to prevent.

**Recommended action.** A UI string table with `{en, ne}` pairs, applied to
elements marked `data-ui="key"`. Applied by setting `textContent` only, never by
re-rendering, so a language switch cannot disturb a running simulation.

**Risk of changing it.** Low. Additive; components that do not opt in behave
exactly as now.

**Decision.** **FIX.** This is the core of the phase.

### H2 — `--line` fails WCAG 1.4.11 (3:1) on every ground

**Issue.** Interactive control borders are effectively invisible.

**Evidence.** Measured from `tokens.css`:

| Combination | Ratio | Needs |
| --- | --- | --- |
| `--line` on `--panel` | **1.44** | 3.0 |
| `--line` on `--board` | **1.66** | 3.0 |
| `--line` on `--bg` | **1.84** | 3.0 |
| `--line-soft` on `--panel` | **1.25** | 3.0 |

Usage breakdown across the six stylesheets — 70 occurrences:

| Category | Count | Needs 3:1? |
| --- | --- | --- |
| Interactive controls (`button`, `.opt`, `.gl-in`, `.nl-bit`, `.km-btn`, `.predict-opt`, `.hamburger`, `.nav a`, …) | 12 | **Yes** — WCAG 1.4.11 |
| Containers that are links (`.ucard`, `.scard`, `.gcard`, `.pager a`, `.dropmenu a`) | ~8 of 26 | **Yes** |
| Non-interactive containers (`.code`, `.q`, `.fig`, `.tablewrap`) | ~18 | Boundary only; not a control |
| Decorative rules, dashed dividers, hairlines | 32 | **No** — 1.4.11 exempts decoration |

**Impact.** A keyboard or low-vision user cannot see where a button ends.

**Risk of changing it.** Raising `--line` globally to reach 3:1 lightens
**32 decorative rules** as well, which visibly changes the chalkboard identity.
The Phase 2 candidate `#5e7c73` does this.

**Decision.** **FIX, but not globally.** Introduce `--color-border-strong` at
the measured minimum and apply it to interactive controls only. Decorative rules
keep `--line`. This satisfies 1.4.11 without redesigning the surface.

### H3 — `--chalk-faint` fails WCAG 1.4.3 (4.5:1) on `--panel`

**Evidence.** `#7e948e` on `#19302a` = **4.35 : 1**. It passes on every other
ground (`--board` 5.01, `--bg` 5.53), so the failure is specific to text inside
panels — captions, `.cpu-sub`, `.nl-place`.

A search for the smallest change that clears 4.5:1 on all four grounds returns
**`#819791`** — exactly the Phase 2 candidate, and only **+3 per channel**.

**Risk of changing it.** Negligible; 3/255 is below the perceptual threshold.

**Decision.** **FIX.** Apply `#819791`.

### H4 — the OOP question bank has no Nepali prompts or options

**Evidence.**

| Bank | Questions | Prompts without Nepali | Option sets without Nepali | Explanations without Nepali |
| --- | --- | --- | --- | --- |
| `grade10/oop-cpp` | 15 | **15** | **15** | 0 |
| `grade10/digital-design` | 54 | 0 | 0 | 0 |

The explanations are already bilingual, so the gap is confined to the prompt and
the four options of each question.

**Impact.** In Nepali mode a student reads 15 English questions. The engine
falls back rather than blanking (verified), so it is a content gap, not a bug.

**Decision.** **FIX.** 15 prompts and 60 options is bounded work, and the
subject is otherwise complete. Technical terms stay in English per the
terminology policy.

### H5 — no build-time protection for the language contract

**Issue.** Nothing stops the next subject from shipping content that breaks a
language mode. The validator checks that syllabus metadata is bilingual; it does
not check lesson content, question banks or component markup.

**Impact.** The gap the phase exists to close: "Nepali mode works on the
existing subject but breaks when the next developer adds a component."

**Decision.** **FIX.** Extend `validate.js` with a language section — see
LANGUAGE-SYSTEM.md §11 for the rules it enforces.

---

## MEDIUM

### M1 — diagram colours are hard-coded hex

**Evidence.** 151 hex occurrences across 38 diagrams. **149 of them map exactly
to an existing token**:

| Hex | Uses | Diagrams | Token |
| --- | --- | --- | --- |
| `#ff8f7a` | 60 | 18 | `--coral` |
| `#9ae6a0` | 42 | 13 | `--green` |
| `#ffd76e` | 35 | 19 | `--yellow` |
| `#7fd1ff` | 11 | 5 | `--blue` |
| `#2c4a41` | 1 | 1 | `--line` |
| `#4c7368` | 1 | 1 | none — a dashed-box stroke |
| `#c9b8ff` | 1 | 1 | none — near `--violet` `#c9a9ff` |

**Decision.** **FIX** the 149 mechanically; they are exact matches, so the
rendered colour is unchanged and the change is verifiable by comparing the
built CSS-resolved values. Investigate the 2 orphans individually.

### M2 — a progress bar animates `width`

**Evidence.** `base.css:145` — `.track i { transition: width .25s }`. The only
layout-triggering transition in the product; everything else animates paint-only
properties (colour 8, border-colour 8, background 6, opacity 2, fill 2, stroke 3)
or `transform` (1).

**Decision.** **FIX.** `transform: scaleX()` with a transform-origin, which is
compositor-friendly and visually identical.

### M3 — dead CSS

**Evidence.** Of 290 class selectors defined across the six stylesheets, **2**
never appear in any built page, runtime module or diagram:

- `.c-fn` (`base.css:107`) — a syntax-highlighter colour for function names. The
  highlighter in `core.js` emits `c-com`, `c-str`, `c-key`, `c-typ`, `c-num` and
  never `c-fn`.
- `.scroll-hint` (`learning-ux.css:260`) — superseded by `.is-scrollable`.

**Decision.** **FIX.** Remove both, with the evidence recorded.

### M4 — `learning-ux.css` is a corrective layer

**Issue.** Phase 2 added it explicitly to correct the layers above without
rewriting them. Two years of that becomes override debt.

**Evidence.** 85 rules, 13.9 KB. Inspected by category:

| Category | Rules | Should it move? |
| --- | --- | --- |
| Responsive containment (`min-width: 0`, `overflow-x: clip`) | 4 | **No** — deliberately cross-cutting; moving it to each component would duplicate it |
| Readability and touch floors | 6 | **No** — the same reason; it is a floor applied to a list of selectors |
| Focus visibility | 3 | **No** — one global treatment |
| Lesson rhythm (margins) | 3 | **No** — cross-cutting spacing |
| New components (`.sim`, `.predict`, `.exam-connect`) | ~60 | **These are not corrections.** They are the definitions of Phase 2 components and are in the wrong file |
| Small per-component corrections | ~9 | Candidates, individually low value |

**Decision.** **DEFER the move, document the finding.** The component
definitions belong in `site.css`, but moving 60 rules between stylesheets
changes cascade order for anything with equal specificity, and the only
observable benefit is tidiness. The genuine corrective rules — the ones the
layer exists for — are 16 of 85 and are correctly placed. Recorded in
PHASE-3.1-DECISIONS.md.

### M5 — static diagrams expose only `<title>`

**Evidence.** All 38 diagrams have `<title>` and `role="img"`; **0** have
`<desc>`. A screen-reader user gets one sentence for a figure that may carry a
truth table or a six-block architecture.

**Decision.** **PARTIAL FIX.** Adding a meaningful `<desc>` to 38 diagrams is
content work of the same order as writing them. Fix the highest-value case —
the diagrams a student is asked to reproduce in the exam — and document the rest.

### M6 — 63 inline event handlers block a strict CSP

**Evidence.** 119 `onclick` attributes, of which **56** are
`onclick="return false"` on disabled navigation links (inert), leaving **63**
real handlers. Every page ships
`script-src 'self' 'unsafe-inline'`.

**Decision.** **DEFER.** Converting them is mechanical but touches every
simulator and the tracer, with a real regression surface and no student-visible
benefit. The new Phase 3 components are already fully delegated, so the debt is
bounded and shrinking. Recorded with a migration note.

---

## LOW

### L1 — the `context.js` comment trips path scanners
See **C2**. Reword.

### L2 — two diagram colours have no token
`#4c7368` (dashed-box stroke) and `#c9b8ff` (one label, 1 shade off `--violet`).
**FIX** — add a token for the first, correct the second to the real token.

### L3 — `_source/README.md` contains a localhost URL
A documentation example, not a build dependency. **No action**; noted so the
reproducibility scan stays honest.

---

## DEFERRED — with reasons

### D1 — the four Phase 2.5 animation candidates

Re-reviewed against the Phase 2.5 test: does motion teach something, is the
concept temporal, would static be clearer, what does it cost?

| Candidate | Temporal? | Verdict |
| --- | --- | --- |
| `linkedList` | Partly — insertion and deletion are steps | **DEFER.** The lesson is the *shape* (nodes and pointers), which a still image carries. Insertion is already taught by the stack/queue simulator, which animates the structure a student can drive. |
| `classObject` | No | **REJECT permanently.** A class and its objects is a relationship, not a process. Motion would imply a sequence that does not exist. |
| `encapsulation` | No | **REJECT permanently.** The redrawn figure shows access allowed and access blocked side by side. Animating it would show one, then the other, and lose the comparison — which is the lesson. |
| `overloadResolve` | Yes — the compiler eliminates candidates in order | **DEFER with intent.** The best remaining candidate, but Unit 6 already carries the `dispatch` animation on the same page, and two step-through animations in one unit competes for the same attention. Revisit when Unit 6 is next edited. |

**Decision.** Build none. Two are rejected on pedagogy, two are deferred with a
specific trigger. Building all four because they were listed would be exactly
the "animate because it is possible" failure the phase brief warns against.

### D2 — frame rate on real hardware

`requestAnimationFrame` and `setTimeout` are throttled in the automation pane, so
any number measured here would describe the harness, not the product.
**NOT VERIFIED. No figure claimed.** What *was* audited instead: animation count,
idle animation count, animated properties, timers, cleanup — see M2 and the
completion report.

### D3 — screen-reader testing

No screen reader is available in this environment. **NOT VERIFIED.**
Static semantic inspection, keyboard operation and ARIA/state inspection were
performed instead and are reported separately in ACCESSIBILITY-AUDIT.md.
**WCAG 2.1 AA is not claimed.**

### D4 — mobile diagram variants

Diagrams scroll horizontally on phones rather than reflowing. Authoring a
simplified mobile variant means authoring every figure twice.
**DEFER** — unchanged decision from Phase 2.5, still correct.

---

## What will NOT be changed, and why

| Not changing | Reason |
| --- | --- |
| The `.pair` two-column component | Works, tested, and is the product's identity |
| The diagram runtime and motion service | No defect found; reused unchanged by five new components |
| The build pipeline's structure | Reproducible, deterministic, zero-dependency |
| Bilingual as the default mode | The pedagogy is unchanged |
| Existing lesson prose | No errors found; rewriting is not hardening |
| The chalkboard palette | Only the two measured failures move, and one by 3/255 |

---

## FOUND BY LOOKING — issues the test suite could not see

Everything above was found by reading code or measuring markup. This
section is what the three-mode visual pass found, and it is recorded
separately because the lesson is worth keeping: **every one of these
passed 200 green tests.** A DOM assertion cannot see two languages
sharing one line, because at the markup level nothing is wrong.

Method: `tests/manual/qa-sweep.js`, run against all 28 pages in all
three modes at 1280px, and against 7 representative pages at 375px.
It measures page overflow, content clipped by a non-scrolling parent,
boxes left empty by a mode, the wrong language on screen, and text
below the type floor.

### V1 — CRITICAL · both languages on one line, in every mode

**Issue.** 41 section labels were authored as a single text run —
`Interactive experiment · अन्तरक्रियात्मक प्रयोग`, `Key points to
revise · …`, `Predict first · …`, `SEE exam connection · …`. One run
cannot be split by a language layer, so English mode showed the Nepali
and Nepali mode showed the English.

**Evidence.** The kicker on `digital-design/unit1.html` in English mode
read `▶ INTERACTIVE EXPERIMENT · अन्तरक्रियात्मक प्रयोग`. Across the
13 affected files: 11 × `Key points to revise`, 8 × `Predict first`,
7 × `Interactive experiment`, 7 × `SEE exam connection`, 8 singles.

**Impact.** The three-mode feature's core promise, broken on the most
visible label of every simulation and every recap.

**Recommended action.** Split into nested language spans so the
separator leaves with whichever half goes, reusing the two CSS rules
that already exist — no new CSS, and bilingual output byte-identical.

**Risk.** Low. Mechanical, and the bilingual rendering does not change.

**Decision.** FIXED. See [D12](PHASE-3.1-DECISIONS.md#d12).

Distinguishing these from prose was the whole difficulty. `NAND र NOR
— यी दुई universal गेट हुन्` is Nepali prose containing an English
technical term, which §5B of the language contract requires be left
exactly as it is. A Devanagari-to-Latin ratio test separated the two:
of 128 mixed-language elements, 41 were label pairs and 87 were prose.

### V2 — HIGH · runtime labels have no way to disappear

**Issue.** The simulations build their own markup, so the build's
bilingual pass never sees it. Nine English labels were emitted beside a
Nepali gloss with no `.t-en` handle, and stayed on screen in Nepali
mode.

**Evidence.** The number lab's control read `Add one column at a time —
एक–एक स्तम्भ जोड्दै जानुहोस्` in Nepali mode. Also `Program in memory`,
`Step through one instruction cycle at a time`, `Inputs`, `Outputs`,
`Click an input to change it`, `Click a cell to set it to 1…`,
`Simplified expression`, and the K-map's variable and Gray-code lines.

**Impact.** Nepali mode was not Nepali inside the five components the
subject is built on.

**Recommended action.** Wrap the English half; leave terminology alone.

**Risk.** Low — additive markup, no layout change in bilingual mode.

**Decision.** FIXED, with a regression test that proves it can fail.
See [D12](PHASE-3.1-DECISIONS.md#d12).

### V3 — MEDIUM · a hand-split label lost its section number

**Issue.** Fixing V1 in a heading exposed a gap in the build's pairing
pass: it wrapped a run that already contained an author's `.t-en`
handle, putting a second handle around the section number as well.

**Evidence.** `oop-cpp/unit1.html`, heading `1.5.1 (a)  Array — एरे`,
rendered in Nepali mode as `एरे` — the number gone.

**Impact.** Six headings on one page; and it would recur for any future
author who splits a label by hand inside a heading.

**Recommended action.** Treat an explicit handle anywhere in a run as
proof the run is already resolved.

**Risk.** Low, and narrowing: the rule only ever prevents a wrap.

**Decision.** FIXED in `_source/build/bilingual.js`, with a unit test
covering both the rule and the case it must not narrow.

### V4 — MEDIUM · new CSS undercut the documented type floor

**Issue.** `digital.css`, written in Phase 3, set seven labels at
9.5px–11px in hard-coded pixels. The design system's own page states
`xs — labels and metadata. This is the floor: nothing smaller ships.`
`--fs-xs` is 12px.

**Evidence.** Measured: `.km-m` 9.5px, `.nl-place` / `.nl-pow` /
`.km-corner` 10px, `.cb-out-e` / `.cpu-sub` 10.5px, `.f-addr` 11px.

**Impact.** The K-map's minterm indices — which a student reads to
check their own grouping — were the smallest text on the site.

**Recommended action.** Raise to `var(--fs-xs)`, but only after
measuring that the dense grids still fit.

**Risk.** Medium in principle: these sit in tight layouts. Measured
before changing — at 12px the K-map grid grows from 286px to 288px
with 774px of slack, and cell size is unchanged at 56×57.

**Decision.** FIXED. Re-swept afterwards: the four affected pages are
clean at 1280px and at 375px.

### V5 — accepted, not a defect

| Seen | Why it stays |
| --- | --- |
| `नेपाली` on the switcher in English mode | The switcher names each language in its own script. That is the point of it. |
| A Devanagari type specimen on `design-system.html` in English mode | It is a specimen of the Devanagari face, on an internal reference page, and must render in every mode. |
| `•` and `∅` at 9.6px in the linked-list figure | Glyphs drawn as type, not text to be read. The floor is a reading floor. |
| English headings in Nepali mode | The documented fallback (§6): headings are never wrapped, and each carries a Nepali subtitle or gloss beside it. |
| `Truth table`, gate names, CPU block names, base names in Nepali mode | Terminology (§8). The SEE paper prints these in English. |

### What the sweep still cannot see

Unchanged from the accessibility audit, and repeated here so the visual
pass is not mistaken for more than it is:

- **NOT VERIFIED** — what a screen reader announces. No reader available.
- **NOT VERIFIED** — colour as a colour-blind student perceives it.
- **NOT VERIFIED** — layout above 100% zoom.
- **NOT MEASURED** — frame rate. The automation pane throttles rAF, so
  any number taken here would be fiction.
