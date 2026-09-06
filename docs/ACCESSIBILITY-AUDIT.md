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
