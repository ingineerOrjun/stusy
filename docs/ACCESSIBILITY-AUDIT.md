# Accessibility Audit — Phase 3.1

Performed against the built site in a real browser engine. Every number
below is measured; nothing is inferred from the code.

> ## WCAG 2.1 AA IS NOT CLAIMED
>
> No screen reader was available in this environment. Semantic structure,
> keyboard operation, ARIA state and contrast were audited; **the actual
> experience of a screen-reader user was not**. See §7 for exactly what
> that means and what would close it.

---

## 1. Environment and method

| | |
| --- | --- |
| Engine | Chromium, in-app browser pane |
| Pages audited | lesson (`digital-design/unit2`), simulation (`unit5`), prediction (`unit1`), animated diagram (`oop-cpp/unit5`), quiz (`digital-design/quiz`), subject overview |
| Method | live DOM and computed-style measurement, synthetic keyboard events, WCAG relative-luminance computation from the tokens |
| Screen reader | **none available — not tested** |
| Assistive tech other than keyboard | **not tested** |

What a synthetic `KeyboardEvent` proves: that the handler responds and the
state changes. What it does **not** prove: that focus is visible to a real
user, that the reading order matches the visual order in a real screen
reader's virtual buffer, or that announcements arrive at a useful moment.

---

## 2. Contrast — computed, and fixed

Ratios computed with the WCAG 2.1 relative-luminance formula directly from
`tokens.css`. Now asserted by `tests/contrast.test.js`, so a palette change
that regresses this fails the build.

### Text — WCAG 1.4.3, 4.5:1

Every text colour on every ground it is used on: **21 of 21 pass.**

| Token | on `--panel` | on `--board` | on `--bg` |
| --- | --- | --- | --- |
| `--chalk-white` | 12.67 | — | 16.11 |
| `--chalk-dim` | 6.68 | — | 8.49 |
| **`--chalk-faint`** | **4.52** *(was 4.35 — FAILED)* | 5.21 | 5.75 |
| `--yellow` | 10.15 | — | 12.90 |
| `--blue` | 8.32 | — | 10.58 |
| `--coral` | 6.32 | — | 8.03 |
| `--green` | 9.48 | — | 12.05 |
| `--violet` | 7.08 | — | — |

**Fixed:** `--chalk-faint` `#7e948e → #819791`. Chosen by searching for the
smallest change that clears 4.5:1 on all four grounds — **+3 per channel**,
below the perceptual threshold. It failed only on `--panel`; it already
passed elsewhere.

### Non-text — WCAG 1.4.11, 3:1

`--line` measured **1.44:1** on `--panel`. Raising it globally would have
lightened **32 decorative rules** and changed the chalkboard identity.

1.4.11 applies to *"visual information required to identify user interface
components"* — not to a decorative divider. So the token was split:

| Token | Value | Used for | on `--panel` | on `--bg` | on `--board` | on `--board-2` |
| --- | --- | --- | --- | --- | --- | --- |
| **`--line-strong`** *(new)* | `#5d7b72` | control borders | **3.03** | **3.86** | **3.49** | **3.22** |
| `--line` | `#2c4a41` | dividers, rules, hairlines | 1.44 | — | — | — |

Applied to 10 control selectors: `button`, `.opt`, `.nav a`, `.hamburger`,
`.predict-opt`, `.gl-in`, `.gl-gate`, `.nl-bit`, `.km-btn`, `.langbar`.
A test asserts each one references the token, and that the decorative
value stays clearly quieter so the split cannot silently collapse.

**Not raised, and why:** `--line-soft` (1.25) and the code well against its
panel (1.30) are decorative grouping, not component boundaries. A code
block is content presentation; its edge is not required to identify a
control.

---

## 3. Structure

Measured on the Digital Design logic-gates lesson, a representative page.

| Check | Result |
| --- | --- |
| Heading levels | `1,2,2,2,3,3,3,2,3,2,3,2,2` |
| `<h1>` count | 1 |
| Level skips | **0** |
| Landmarks | `main` 1, `nav` 3, `header` 1, `footer` 1 |
| Skip-to-content link | present |
| Controls without an accessible name | **0** |
| `tabindex` > 0 (which would break tab order) | **0** |

### Defect found and fixed — the quiz heading level

The quiz page measured `1,4,4,4,…` — an **h1 → h4 skip**, so a screen-reader
user navigating by heading would jump two levels at every question and get a
false outline.

Cause: the build's heading normaliser runs at build time; quiz questions are
rendered by the engine afterwards, so it never saw them. Fixed at the source —
questions now render as `<h2>`, a child of the page's single `<h1>`. Measured
after: `1,2,2,2,…`, **0 skips**, and the heading's computed size (16.32px)
and weight (700) are unchanged, because appearance is carried by the class,
not the tag.

---

## 4. Keyboard operation

Driven with synthetic events against the real components.

| Widget | Result |
| --- | --- |
| **Language switcher** | `role="radiogroup"`, 3 × `role="radio"`, **1 of 3 in the tab order** (roving tabindex). ArrowRight moves focus *and* changes the mode. Home/End supported. |
| **Gate input** | `role="switch"`, focusable, **Space toggles `aria-checked` false → true** |
| **K-map cell** | real `<button>`, reachable, activates on Enter/Space |
| **Answer toggle** | `aria-expanded` false → true → false, `aria-controls` points at the answer, label swaps with the mode |
| **Prediction options** | real `<button>`s, `aria-pressed` on each, disabled after commit so a student cannot answer twice |
| **Quiz options** | real `<button>`s, disabled after answering |
| **Focus visibility** | a `:focus-visible` rule exists and applies globally (`outline: 2px solid var(--color-focus)`, offset 2px) |
| **Wide content** | scrollable containers take `tabindex="0"` and `role="region"` when they actually overflow, so a keyboard user can scroll them |

---

## 5. Dynamic content and ARIA state

| Widget | State exposed | Announcement |
| --- | --- | --- |
| Gate inputs | `aria-checked` on 4 of 4 switches | reading line is `role="status"` |
| Gate picker | `aria-selected` on 8 of 8 tabs | — |
| Language switcher | `aria-checked` on 3 of 3 radios | — |
| Truth-table row | `aria-current="true"` follows the student's inputs | — |
| Prediction feedback | — | `role="status"` |
| Diagram caption | — | `role="status"` |
| Step counter | — | `aria-live="polite"` |
| Simulator console | `role="log"`, `aria-live="polite"`, `aria-label` | announced |

### Defect found and fixed — the quiz explanation was silent

The prediction feedback announced itself; **the quiz explanation did not**.
A student answering a question got the verdict and the explanation with no
announcement at all. Added `role="status"` to the explanation and to the
score box.

---

## 6. Language and reduced motion

| Check | Result |
| --- | --- |
| Document language | `lang="en"` with Nepali marked inline |
| Nepali passages marked `lang="ne"` | 108 on the audited lesson |
| Devanagari **not** inside `lang="ne"` | **0** *(was 2 — fixed)* |
| `prefers-reduced-motion` blocks in CSS | 7 |
| Reduced motion honoured in JavaScript | yes — `MotionService.prefersReduced()` gates the step player |
| `--dur-step` under reduced motion | deliberately preserved: it is reading time, not movement |
| Infinite animations | **0** |
| Animations running on an idle page | **1**, `playState: "finished"`, 1 iteration — a completed 200 ms reveal. Nothing loops, nothing runs while idle. |

### Defect found and fixed — Nepali announced in an English voice

Two gate names (`एन्ड`, `न्यान्ड`) were rendered by `sim-gates.js` *after* the
build's marking pass, so they carried no `lang="ne"`. A screen reader would
pronounce Devanagari with an English voice — the exact problem Phase 1 fixed
for static content, reintroduced by a runtime component. Fixed, and a test
now scans every runtime module for Nepali emitted without a language
declaration.

### SVG accessible names

All 5 `role="img"` SVGs on the audited page have an accessible name: 3 via
`<title>` + `aria-labelledby`, 2 via `aria-label` on the workbench-rendered
circuits. **0 unnamed.**

---

## 7. What was NOT verified

Stated plainly, because a compliance claim that has not been tested is worse
than no claim.

| Not verified | Why | What would close it |
| --- | --- | --- |
| **Screen-reader experience** | No screen reader in this environment | NVDA or JAWS on Windows, VoiceOver on macOS/iOS, TalkBack on Android — one pass through a lesson, a simulation and the quiz |
| **Reading order in a virtual buffer** | Requires a screen reader | same |
| **Whether announcements arrive usefully** | `role="status"` is present; whether it interrupts helpfully or annoyingly is a human judgement | same |
| **Nepali screen-reader pronunciation** | `lang="ne"` is set correctly, but no Nepali TTS voice was available | a reader with a Devanagari voice installed |
| **Real focus visibility** | The CSS rule exists and computes; how visible it is against each surface is a human judgement | a sighted keyboard pass |
| **Zoom to 200% / 400%** | Not measured this phase | measurement at those zoom levels |
| **Colour-blind simulation** | Not run. Signal state is carried by width *and* colour in the gate workbench, which helps, but this was not verified | a deuteranopia/protanopia pass |
| **Motion sickness / vestibular** | No large parallax or spinning motion exists to test | — |

**Therefore: WCAG 2.1 AA is not claimed.** What can honestly be said is
that the two measured contrast failures are fixed, the semantic structure
and keyboard operation were verified, and three real defects found during
this audit were corrected.

---

## 8. Defects found and fixed in this audit

| # | Defect | Severity | Status |
| --- | --- | --- | --- |
| 1 | `--chalk-faint` at 4.35:1 on `--panel` — below 1.4.3 | HIGH | fixed, tested |
| 2 | Control borders at 1.44:1 — below 1.4.11 | HIGH | fixed, tested |
| 3 | Quiz headings skipped h1 → h4 | MEDIUM | fixed, measured 0 skips |
| 4 | Quiz explanation appeared with no announcement | MEDIUM | fixed |
| 5 | Two Nepali strings rendered without `lang="ne"` | MEDIUM | fixed, regression test added |
| 6 | Control labels were English in every mode | HIGH | fixed — see LANGUAGE-SYSTEM.md |

## 9. Known risks carried forward

| Risk | Impact |
| --- | --- |
| `data-answer` means two different things — the model-answer target id on `.btn-ans`, and the correct value on `.predict` | Harmless today; the answer-toggle wiring skips the prediction boxes because `getElementById` returns null. It would collide if a page ever had an element whose id equals a prediction's answer letter. |
| 63 inline `onclick` handlers | Forces `script-src 'unsafe-inline'`. Not an accessibility issue; recorded in PHASE-3.1-AUDIT.md M6 |
| Static diagrams expose one `<title>` and no `<desc>` | A screen-reader user gets one sentence for a figure that may carry a truth table |

---

# Accessibility-tree verification — Phase 4.1

**Added after Phase 4**, when the question "you said screen-reader
behaviour is unverified — verify it" was put directly.

## What was actually done, and what still was not

A screen reader was still not available, and **none was run**. What *is*
now inspected is the **accessibility tree**: the structure the browser
computes and hands to assistive technology. That tree is the raw
material a screen reader reads out, so inspecting it is strictly more
than the DOM assertions Phase 3.1 proved insufficient — and strictly
less than listening.

The instrument is [`tests/manual/a11y-tree.js`](../tests/manual/a11y-tree.js),
run in a real browser against every page in all three language modes.
It checks the accessible name of every control (computed the way the
spec says, descendants included), roles, states, live regions,
landmarks, label relationships, duplicate ids, focusable elements hidden
from AT, unnamed figures, and tables without header cells.

> ### WCAG 2.1 AA IS STILL NOT CLAIMED
>
> A page that passes this audit has **no structural reason** for a
> screen reader to fail. That is a real, checkable property. It is not
> the same as a person completing a lesson by ear, and the difference is
> not a formality.

**Still NOT VERIFIED**, unchanged:

- What a screen reader actually announces, in what order, and whether it
  makes sense out loud.
- Whether a student can complete a task — run a query, judge a drill
  case — using only audio.
- Colour as a colour-blind student perceives it.
- Layout at 200% and 400% zoom.

## What the audit found

Four defects, none of which the 265-test suite could see.

### A1 — an announcement nobody could use

**Found:** the SQL simulator wrapped its entire pipeline *and* its
result table in `role="status"`. Measured in the browser: **44 words
announced in one burst** in single-language mode, **73 in bilingual** —
after every run.

A listener cannot stop that, cannot re-read part of it, and hears it
again on the next run. It is the kind of defect that is invisible to
every check that does not ask "what does this sound like?"

**Fixed:** the announcement is now a one-line outcome —
*"3 rows, 1 column returned."*, **5 words** — and the detail sits in a
named `role="region"` the listener navigates to when they want it.
Errors still announce their reason in full, because an error's reason is
the thing worth hearing.

### A2 — options with no context

**Found:** several predictions offer bare values as options — `10`,
`20`, `30`. Read aloud in isolation that is *"10, button"*. The question
was a separate heading, and tabbing in from elsewhere skipped it.

**Fixed:** the option container is now `role="group"` named by the
question via `aria-labelledby`, so entering the group announces what is
being asked. The same fix was applied to the decision drill.

### A3 — the group name that silently did not attach

**Found while fixing A2:** `predict.js` looked for the question with
`querySelector('h4')`. The build's heading normaliser rewrites that
heading to whatever keeps the page outline unbroken — on the built page
it is an `h3`. The lookup found nothing, so the group got `role="group"`
and **no name at all**, which is worse than before the fix.

This is the class of bug that only appears against the built page. The
source looked right.

**Fixed:** any heading level is accepted.

### A4 — a label that read as one word

**Found:** the drill rendered `"1:11:1"` — the English and Nepali labels
of an option are both `1:1`, so both rendered and ran together. This is
the same collision Phase 3.1 fixed on the gate workbench (`ANDएन्ड`),
reappearing in a new component.

**Fixed** with the rule that phase established: identical halves are a
**value, not a translation**, so they collapse to one unwrapped label
shown in every mode.

## Two corrections to this audit itself

The tool reported defects that were not there, twice. Phase 3.1's rule
is that a test which reports a phantom defect is itself a defect, so
both were fixed rather than tolerated.

- **Numeric options were flagged as "labelled only by a symbol".** A
  value like `1:1` or `10` *is* a usable name once its group is named by
  the question. The check now looks at the group before flagging, and
  still catches a genuinely unnamed `▸`.

- **`tests/language.test.js` had a latent bug of its own.** Its walker
  pushed elements without a `tag`, so glosses landing at the synthetic
  root were attributed to text the literal-stitching had swept up. It
  had been catching real defects for the wrong reason. Fixed, and
  re-proved by breaking the guarded thing and watching it fail with a
  precise message.

## Results after the fixes

| Check | Scope | Result |
| --- | --- | --- |
| Accessibility-tree audit | all pages × 3 modes | **clean** |
| Controls with no accessible name | site-wide | **0** |
| Controls named only by a symbol | site-wide | **0** |
| Broken `aria-labelledby` / `describedby` | site-wide | **0** |
| Duplicate ids | site-wide | **0** |
| Focusable elements inside `aria-hidden` | site-wide | **0** |
| Pages with exactly one `main` landmark | 36 | **36** |
| Figures with a `<title>` | 53 | **53** |
| Longest single announcement | SQL run | **5 words** (was 44) |

Eleven of these are now held by `tests/a11y.test.js` in the automated
suite, so the structural facts cannot regress between browser audits.

## What to do when a screen reader is available

The audit narrows what needs listening to, it does not replace it. In
priority order:

1. **The SQL simulator.** Run a query, then an error. Is the summary
   enough? Is the pipeline reachable and readable after it?
2. **The decision drills.** Does committing an answer announce the
   verdict, and is the reason findable without hunting?
3. **The quiz.** Answer a question and confirm the explanation is
   announced once, not twice in two languages.
4. **The animated diagrams.** Step through one and check the caption is
   announced without the whole figure being re-read.
5. **Bilingual mode generally.** Both languages are in the DOM. A reader
   set to English will meet Devanagari. `lang="ne"` is set on every
   Nepali element, which is what a reader needs to switch voice — but
   whether it does so gracefully is exactly the unknown.
