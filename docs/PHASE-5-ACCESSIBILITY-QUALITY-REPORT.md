# Phase 5 — Accessibility, Usability, Performance & Production Quality Gate

**Branch** `phase-4-dbms` · **Baseline** `a473621` · **Head** `dca0728`
**Scope** 36 built pages, 3 authored subjects, 55 diagrams, 11 animations,
24 simulation mount points, 3 language modes.
**Not in scope** curriculum expansion, new subjects, redesign.

---

## The one-line summary

Nine real defects were found and fixed. Two of them — 82 Nepali passages
read aloud by an English voice, and a skip link that only scrolled — were
invisible to 290 passing tests and to every rule-based check, because both
are questions about *what a user receives*, not about what the markup says.

**WCAG 2.1 AA is not claimed.** Specific criteria were measured and are
reported individually below. What a screen reader actually speaks is still
**NOT VERIFIED**, for the sixth phase running, and §11 says why.

---

## 1 · Baseline, before anything changed

| | |
|---|---|
| Branch / HEAD | `phase-4-dbms` / `a473621`, clean tree |
| Build | 8 subjects, 7 outlines, 23 authored pages across 3 subjects, 55 diagrams — 0 warnings |
| Tests | 290 pass, 0 fail |
| Built pages | 36 (23 authored + 8 stubs + 2 index + 2 internal, one of which is a dev reference) |
| Diagrams | 55 (44 static, 11 animated), 60 injections |
| Simulation mount points | 24 self-controlled labs + 3 quiz engines + 1 code tracer |
| Language modes | 3 (`bi`, `en`, `ne`) over one DOM |
| Rebuild after build | 0 files changed — deterministic |

---

## 2 · Screen reader — the highest priority item

### What was done

No screen reader is drivable in this environment. Narrator is present on
the machine but produces audio, not a transcript, and cannot be read back
by any tool available here. NVDA and JAWS are not installed.

So the next-strongest thing was built: `tests/manual/screenreader-audit.js`
reconstructs the **linear browse-mode reading order** and the **computed
accessible name** of every node a screen reader would reach, modelling the
accessibility tree's own visibility rules — `display`, `visibility`,
`aria-hidden`, `inert`, and the subtree pruning that `role="img"` performs.
It reports what would be *said*, in order, in which voice.

This is a better instrument than a rule checker and it is still **not a
screen reader**. It models the tree; it does not hear one.

### DEFECT 1 — 82 Nepali passages were handed to an English voice

The document is `<html lang="en">`. Devanagari that does not sit inside an
element declaring `lang="ne"` is passed to an English speech synthesiser,
which produces noise. **82 passages across 20 of 36 pages** were in that
state — the Nepali half of the page, unusable to exactly the students who
need it, on two thirds of the site.

Two causes, both structural:

1. `t-ne` was not listed as a Nepali container in the build, and the
   fallback that should have caught it looks only at the text run
   *immediately after an opening tag*. The house idiom for a Nepali
   passage opens with a nested separator:

   ```html
   <span class="t-ne"><span class="t-en"> · </span>अन्तरक्रियात्मक प्रयोग</span>
   ```

   The captured run is empty, and the Devanagari after the inner `</span>`
   was never examined.

2. Five simulators build their own markup in the browser, after the build's
   tagging pass has finished and can no longer reach them.

**Fixed** at both sites. **Verified**: 0 untagged runs across all 36 pages,
and 0 in the browser after the simulators mount. `tests/manual/lang-scan.js`
is the node half and now gates the build.

Why no automated check found this: every element had an accessible name,
every contrast ratio passed, the markup validated. Nothing was *wrong* —
it was in the wrong voice.

### What the audit found clean

Measured on the densest page in all three modes, then across the site:

| | |
|---|---|
| Controls or images announcing as their role alone | 0 |
| Heading levels skipped | 0 |
| `<h1>` per page | exactly 1 |
| Live regions speaking more than 25 words | 0 |
| Diagrams exposing internal fragments | 0 — all 55 carry `role="img"` + `aria-labelledby` pointing at a real `<title>` |
| Tables announcing as tables | all — real `<table>`, `<caption>`, `<th>` |

### DEFECT 2 — 77 table headers declared nothing

No announcement was wrong. All 25 content tables are column-header-only,
the one shape every screen reader infers correctly. But inference is the
reader's guess, not a declaration: the first table to add a row header
would turn a correct guess into a wrong announcement, silently, with no
test to catch it. `scope="col"` is now added centrally at build time —
77 of 77, zero visual change.

---

## 3 · Accessibility in all three language modes

Every check in §2 was run in `bi`, `en` and `ne`. All three are clean.

The reading order is genuinely different in each — 722 spoken nodes in
bilingual, 469 in English, 441 in Nepali — and the language attribution
now follows correctly: in bilingual mode 465 runs are announced in English
and 254 in Nepali, each in its own voice.

### KNOWN LIMITATION — the Nepali-mode heading outline is 80% English

Measured across all built pages: **374 headings, 75 carrying any Nepali —
20%.** Subject index pages run 67–82%; the lesson pages where students
actually study run **7–22%**. On a typical unit page, 2 of 12 headings
carry Nepali.

This is a **documented Phase 3.1 fallback**, not a new defect: fixing it
means authoring Nepali headings as content, which is curriculum work and
explicitly out of Phase 5's scope. What Phase 5 adds is the sharper
consequence. Skimming by heading is *the* way a screen-reader user reads a
5,000-word page. A Nepali-mode student navigating by heading hears an
outline that is four-fifths English, on a page whose body is Nepali.

That is a more serious framing than "some headings are untranslated", and
it should be weighed before the next subject is started.

---

## 4 · Keyboard-only traversal

Audited with `tests/manual/keyboard-audit.js` across four representative
pages covering all three subjects, both dev pages, and the quiz engine.

| | |
|---|---|
| Operable controls audited | 52, 68, 28, 28 per page |
| Reachable by Tab | all |
| `tabindex` greater than 0 | 0 — nothing jumps the sequence |
| Keyboard traps | 0 |
| Open dialogs holding focus | 0 |

---

## 5 · Focus management

### DEFECT 3 — the skip link only scrolled

Measured in Chrome by pressing the keys, not by reading the markup:
activating "Skip to content" set `location.hash` to `#main` and left
`document.activeElement` on `<body>`. The page scrolled and the keyboard
user's position was **lost** — the next Tab started again from the top of
the navigation, which is the one thing the link exists to prevent. A
fragment target that cannot hold focus does not receive it.

`<main>` now carries `tabindex="-1"`: focusable, never tabbed to. Verified:
focus now lands on `MAIN#main`, and no ring is painted because
`:focus-visible` does not match focus moved by a fragment navigation.

An audit of all **38 in-page anchors** found one other non-focusable
target, `#ds` on the internal design-system page. Not student-facing;
recorded, not fixed.

### The focus ring

Confirmed by a real Tab press: `:focus-visible` true, `outline: 3px solid
rgb(255, 215, 110)`. Yellow measures **10.15:1 to 12.90:1** against every
surface in the palette — far above the 3:1 WCAG 1.4.11 asks of a focus
indicator. The skip link's own indicator is different in kind and works:
it moves from `left: -9999px` into view.

---

## 6 · Zoom and reflow

Measured, not assumed. `__qa()` at each width in each of the three modes.

| Width | bi | en | ne |
|---|---|---|---|
| 320 px | clean | clean | clean |
| 390 px | clean | clean | clean |
| 430 px | clean | clean | clean |
| 640 px *(= 1280 at 200% zoom)* | clean | clean | clean |
| 768 px | clean | clean | clean |
| 1280 px | clean | clean | clean |

Clean means: no horizontal page scroll, no clipped content, no empty
panel, no language leak, no text below the 12 px floor.

**Text resize** (WCAG 1.4.4). Raising the root font size to 24px scales
every measured element by exactly 1.50× — paragraphs, list items, `h1`,
`h2`, table cells, buttons. `body { font-size: 16px }` looks like a
pin but is inert: all content uses `rem` tokens, so nothing inherits it.

**The hard case** — 320 px viewport *combined* with 200% text — was run on
the four widest components in the product (SQL simulator, K-map workbench,
8085 stepper, comparison tables) in all three modes. All clean.

---

## 7 · Colour-blind and non-colour-dependent information

"Colour never carries meaning alone" has been claimed since Phase 1 and
never tested. `tests/manual/colour-audit.js` makes it measurable: take two
states that mean different things, and ask what actually differs. If the
only difference is hue, the meaning is lost without it.

**Result: 0 of 5 state pairs distinguish by colour alone.**

| State pair | What carries it besides colour | Ink separation under deuteranopia |
|---|---|---|
| Drill: right answer vs the wrong one picked | option text, aria state, and a verdict that says "Correct." / "Not this one." | border 1.50 |
| Predict: chosen vs unchosen | option text, aria state | text + background 1.50 |
| K-map: cell holding 1 vs 0 | the cell shows the character `1` or `0` | background **9.40** |
| K-map: the value glyph | the glyph is `1` or `0` | 1.16 |
| Table badge: primary vs foreign key | the badge reads **PK** or **FK** | 1.36 |

The PK/FK case is the instructive one: gold and blue are almost identical
in *luminance* (1.22:1), so even a sighted reader is not distinguishing
them by brightness. The letters are what carry it, and they are there.

The SQL simulator's error state is likewise a sentence — "Not run — here
is why / चलेन — कारण यो हो" — not a red box.

Simulation uses Brettel/Viénot-style linear approximations. Good enough to
answer "do these two collapse into each other"; not a clinical model.

---

## 8 · Contrast — rechecked, and five failures found

The token matrix is sound. Every ink clears 4.5:1 on all four surfaces:

```
ink                 bg    board  board-2    panel
chalk-white      16.11    14.60    13.47    12.67
chalk-dim         8.49     7.70     7.10     6.68
chalk-faint       5.75     5.21     4.81     4.52
yellow           12.90    11.69    10.79    10.15
blue             10.58     9.59     8.85     8.32
coral             8.03     7.28     6.72     6.32
green            12.05    10.92    10.08     9.48
violet            9.00     8.16     7.53     7.08
```

Earlier phases checked exactly this and stopped. The failures were in what
components paint **on top of** it — measured on rendered pairs, not tokens.

### DEFECTS 4–8

| Where | Before | After | Cause |
|---|---|---|---|
| Code line numbers `.n` | **3.15:1** | 4.78:1 | literal `#4f6b64`, darker than any token |
| Code comments `.c-com` | **3.93:1** | 5.96:1 | literal `#5f7a73` |
| Console placeholder `.console .muted` | **4.12:1** | 6.24:1 | the same literal, on a darker well |
| K-map minterm `.km-m` | **3.53:1** | 5.23:1 | subtle ink on a self-tinted surface |
| K-map result label `.km-r-lab` | **4.02:1** | 5.95:1 | same |

Code comments at 3.93:1 is the one that matters most for learning: the
comment is the part of a code example that explains it.

### The finding behind the finding

`--chalk-faint` is calibrated to **4.52:1 on `--panel` — 0.02 of headroom**,
and `--panel` is *not* the lightest surface in the product. Any component
that tints its own background sits above it and puts the ink below 4.5:1.
The token now carries that rule in its comment: use `--color-text-subtle`
on `--panel` or darker only; on a tinted or raised surface use
`--color-text-muted`, which holds 5.2:1 on the lightest state that exists.

**Verified after the fix**: 0 measured failures across 8 pages spanning all
three subjects, including states that only appear after interaction.

`--line` at 1.44–1.84:1 is **not** a failure. WCAG 1.4.11's 3:1 applies to
the boundary of a UI *control*; `--line` draws dividers. `--line-strong`
(3.03:1 on `--panel`) is the token for control borders and clears it.

---

## 9 · Reduced motion

Verified structurally against the built stylesheet, and by unit test for
the runtime.

- **9 reduced-motion blocks.** The first carries a blanket
  `*, *::before, *::after` rule with `!important` setting
  `animation-duration`, `transition-duration` to `.001ms`,
  `animation-iteration-count` to 1 and `scroll-behavior` to auto.
- The duration tokens `--dur-fast`, `--dur-base`, `--dur-slow` all go to
  `0ms`.
- Nine further targeted blocks neutralise the specific components.
- **22 animation rules and 38 transition rules** exist outside those
  blocks; the blanket rule covers all of them regardless of selector.

`MotionService` is separately asserted by the existing suite to return zero
durations and to make the pulse primitive and the step player no-ops.

**Not verified:** OS-level `prefers-reduced-motion` emulation. The pane
reports `no-preference` and cannot be made to report otherwise here. The
CSS is unambiguous — a blanket `!important` rule cannot be selectively
missed — but the media query was never observed matching.

---

## 10 · Performance — measured values only

`grade10/dbms/unit4.html`, the densest page in the product, served locally.

| | |
|---|---|
| DOM interactive | **103 ms** |
| DOMContentLoaded | **141 ms** |
| Load complete | **144 ms** |
| HTML transferred | 65 KB |
| Stylesheet | 97 KB (was 119 KB — see §11) |
| Scripts | 125 KB across 10 files |
| Total requests | 17 |
| DOM nodes | 1,052 |

**No frame rate is reported.** The automation pane throttles
`requestAnimationFrame`; any number measured here would be fiction, and
Phase 3.1 established that a check reporting a fiction is a defect.

### PRODUCTION FINDING — the offline claim has a network dependency

Every page makes **6 requests to Google Fonts** — one to
`fonts.googleapis.com` for the stylesheet, five to `fonts.gstatic.com` for
font files. The CSP explicitly permits both.

The project's stated architecture is offline-first, no network, works from
`file://`. That is true of everything except its typography, including its
Devanagari face. For students in Nepal on metered or filtered connections,
this is the one thing on the page that can fail.

The fallback chains are declared and reasonable — `Noto Sans Devanagari,
Noto Sans, Mangal, Segoe UI` for Devanagari, `JetBrains Mono, Consolas,
Courier New` for code — and `Mangal` ships with Windows. **This is not
fixed here.** Self-hosting the faces means adding several hundred KB of
binary assets with their own licensing questions, which is a decision to
take deliberately rather than as a side effect of an accessibility pass.

**`file://` operation was NOT VERIFIED.** The preview pane renders files
outside the project as static `data:` snapshots with no CSS or JS, so the
one test that would settle it could not be run here.

---

## 11 · Subject-specific asset loading

Every page loaded one 119 KB stylesheet. 45 KB of it was `digital.css` and
`dbms.css`, so a grade 9 stub with nine links carried the full K-map
workbench and the whole ER notation.

| Page group | Before | After | Saved |
|---|---|---|---|
| Home, grade indexes, all OOP, all grade 9 | 118.8 KB | **76.0 KB** | 36% |
| DBMS units | 118.8 KB | **95.1 KB** | 20% |
| Digital Design units | 118.8 KB | **99.7 KB** | 16% |
| Dev reference pages | 118.8 KB | 118.8 KB | — |

### DEFECT 9 — the layers were not actually separable

This is the more useful half of the finding. Splitting first would have
silently unstyled working components:

- **`dbms.css` styled the decision drill.** Phase 4.5 made that drill
  subject-agnostic *in JavaScript* — it reads `data-subject` and carries
  eight data sets, four of them OOP — but its 2.4 KB of styling stayed
  behind. Four OOP unit pages depended on the DBMS stylesheet for a
  component that has nothing to do with DBMS. Measured before and after:
  9 dbms-only classes on those pages, then 0.
- **`digital.css` held one rule for `.sim-controls-label`**, a shared
  control label.

Both moved to `learning-ux.css`, where the other shared learning components
live, *before* the split.

`digital.css`'s remaining figure rules are `.f-gate`, `.f-gate-open`,
`.f-pin`, `.f-wire` — genuinely gate-specific. The generic `.f-*` styling
all 55 diagrams rely on is in `site.css`, which is core.

**A complete sheet per variant, not a sheet per layer.** Three `<link>`s in
a load-bearing order — `language.css` must come last or a mode cannot hide
what a subject layer drew — is an ordering a future author can break from a
page's `<head>`. Four complete files instead, one request per page, cascade
settled at build time.

---

## 12 · Simulation mount points — driven, not inspected

A simulator that renders its shell and then does nothing when pressed is
worse than one that is missing: the student presses, sees no change, and
concludes they misunderstood the lesson.

`tests/manual/interaction-audit.js` presses the controls. The test is crude
on purpose and therefore hard to fool: snapshot the component's rendered
text and aria state, press a control **that is not already active**,
snapshot again.

| | |
|---|---|
| Self-controlled labs | 24 across 3 subjects — **all respond** |
| Quiz engines | 3 — all respond |
| Code tracer | 1 — responds |

### DEFECT 9b — a block that promised an experiment

DBMS unit 3's *"Keys, and the rule that links two tables"* sits under the
kicker **"Interactive experiment"** and has no controls at all. The `keys`
mode of the table visualiser draws two relations with their PK and FK
badges and states the rule in prose — a good figure and a poor experiment.

Phase 4.5 named this shape "fake interactivity" and looked for it by
reading source. It was found by pressing.

Relabelled *"Worked example — read it"*. The figure is unchanged and worth
keeping. The rest of the site was swept for the same shape: one instance.

---

## 13 · Animations — every one stepped to the end

Playing the first step proves the button works. Only the last step proves
the sequence was authored. All eleven were driven through their complete
declared cycle, and each step was required to produce a distinct caption.

| Diagram | Steps | Captions | Reached last |
|---|---|---|---|
| `deMorgan` | 5 | 5 | ✓ |
| `simplify` | 4 | 4 | ✓ |
| `twosComplement` | 4 | 4 | ✓ |
| `rippleCarry` | 5 | 5 | ✓ |
| `erToRelational` | 4 | 4 | ✓ |
| `normalForms` | 4 | 4 | ✓ |
| `txnStates` | 5 | 5 | ✓ |
| `recoveryLog` | 3 | 3 | ✓ |
| `dbArchitecture` | 4 | 4 | ✓ |
| `ctorOrder` | 6 | 6 | ✓ |
| `dispatch` | 6 | 6 | ✓ |

11 of 11.

---

## 14 · Diagrams

All **55 figures, 0 geometry defects** — no text over text, nothing out of
frame, no shape breaking a rounded container's curve, no label sitting on
drawn geometry, no line through a label.

Measured after `document.fonts.ready`. The audit refuses to run before the
font has loaded, because Phase 4.1 ran it behind a fixed 900 ms wait,
reported 53 figures clean, and missed a real overlap that had been there
all along.

The audit page linked `style.css`, which after §11 no longer carries
`digital.css`. It would have measured unstyled gate figures and called them
defects. Pointed at `style-all.css`.

---

## 15–17 · Content, tables, code tracer

- **Tables** — real `<table>`/`<caption>`/`<th>`, now all with `scope`,
  each scrolling inside its own container so a six-column relation never
  pushes a 320 px phone sideways. Verified at 320 px + 200% text.
- **Code tracer** — 28 operable controls, all reachable, responds to input,
  0 contrast failures after §8, console placeholder legible at 6.24:1.
- **Content** — no clipped or empty blocks at any tested width in any mode.

---

## 18 · Tests

**290 → 297.** Seven added, and — this is the point — **each one was
verified to fail when its defect is reintroduced**, by reintroducing it:

| Test | Guards |
|---|---|
| every Nepali passage declares its language | the 82 |
| the build recognises `t-ne` as a Nepali container | the root cause |
| runtime-emitted Nepali declares its language too | the five simulators |
| table headers declare what they are headers of | all 77 `<th>` |
| the skip link has somewhere to put focus | `tabindex="-1"` on the target |
| each page has exactly one main landmark | ambiguous landmark |
| a block promising an experiment has something to operate | fake interactivity |

Three existing tests asserted exact strings and broke on corrections rather
than regressions — `<main id="main">` twice, and the literal filename
`style.css`. All three now assert the fact rather than the spelling; the
stylesheet one is *stronger* than before, checking that a page links
exactly one sheet and that the file was actually built.

---

## 19 · Visual regression

6 widths × 3 language modes on the densest page, plus 320 px at 200% text
on the four widest components in the product. 18 + 12 = **30 combinations,
all clean.** Detail in §6.

---

## 20 · What was deliberately not fixed

- **Nepali headings** (§3). Content authoring, out of scope, documented
  since Phase 3.1. Quantified here at 20% coverage.
- **Google Fonts dependency** (§10). A deliberate decision about several
  hundred KB of binary assets and their licensing, not a side effect of an
  accessibility pass.
- **`#ds` on `design-system.html`** (§5). Internal dev page.
- **`--line` contrast** (§8). Not a control boundary; the criterion does
  not apply.

---

## 21 · Production readiness

| Check | Result |
|---|---|
| Build | 0 warnings, deterministic — rebuild changes 0 files |
| Tests | 297 pass, 0 fail |
| Console errors | 0 across sampled pages of all three subjects |
| Network requests | all 200 |
| Root-relative paths | none (asserted by test) |
| CSP | present on every page including dev pages |
| Duplicate landmarks | none |
| Broken in-page anchors | 0 of 38 |
| Working tree after build | clean |

---

## 22 · Every tool built this phase produced a phantom first

Five times, a new audit reported a defect that was not there. Each was
found and fixed **before** anything was reported, on Phase 3.1's rule that
a check reporting a phantom defect is itself a defect. Recording them
because the pattern is the lesson:

| Phantom | Why | Fix |
|---|---|---|
| 26 focusable elements "invisible but tabbable" | all inside `display:none`, which browsers already exclude | compute visibility the way the a11y tree does |
| 91 controls with "no focus indicator" | `el.focus()` does not enter `:focus-visible` — that state follows the user's modality, not the DOM call | read the ring from the rule that defines it |
| Brand mark at 1.15:1, "invisible" | sits on a yellow **gradient**, read only `background-color` | composite `background-image` stops |
| Breadcrumb at 4.34:1, "failing" | worst stop of a body gradient whose bright core is 16,000 px above the viewport; a screenshot showed flat `--bg`, where it measures 5.75:1 | report gradient-backed pairs as *bounded*, never as failures |
| Restricted NAND workbench "dead" | it opens with NAND already selected; the tool pressed the active tab | press a control that is not already on |

A tool that reports a defect it cannot demonstrate costs more than it
finds.

---

## 23 · Honest status of each criterion

| | Status |
|---|---|
| Reading order and accessible names | **Modelled** from the accessibility tree — not heard |
| Language of parts (WCAG 3.1.2) | **Measured**, 0 failures, guarded by test |
| Contrast, text (1.4.3) | **Measured** on rendered pairs, 0 failures across 8 pages |
| Contrast, non-text (1.4.11) | **Measured** for focus indicator and control borders |
| Keyboard (2.1.1), no trap (2.1.2) | **Measured**, 4 pages |
| Focus visible (2.4.7) | **Measured** by real key press |
| Bypass blocks (2.4.1) | **Measured** and fixed |
| Reflow (1.4.10) | **Measured**, 6 widths × 3 modes |
| Resize text (1.4.4) | **Measured**, 1.50× at 150% |
| Use of colour (1.4.1) | **Measured**, 5 state pairs |
| Reduced motion (2.3.3) | **Structural**, blanket rule + unit tests; media query never observed matching |
| Headings and labels (2.4.6) | **Measured** structurally; Nepali coverage 20% |
| **What a screen reader speaks** | **NOT VERIFIED** |
| **`file://` operation** | **NOT VERIFIED** |
| **Frame rate** | **NOT MEASURED** — deliberately |
| **WCAG 2.1 AA conformance** | **NOT CLAIMED** |

---

## 24 · The recommendation

One thing has now been deferred through six phases and covers three
flagship subjects, 24 mount points and 55 diagrams: **a real screen-reader
session.** Phase 5 closed the gap as far as an environment without a screen
reader can, and in doing so found a defect — 82 Nepali passages in the
wrong voice — that no amount of markup inspection had surfaced in five
prior phases. That is evidence for how much a real session would find, not
against it.

Second, in Nepali mode a screen-reader user skimming by heading hears an
outline that is 80% English. That is a content decision with an
accessibility consequence, and it is worth taking before the fourth
subject rather than after.

---

*Phase 5 complete. 9 defects found and fixed, 297 tests, 0 failures,
clean deterministic build. Not deployed.*
