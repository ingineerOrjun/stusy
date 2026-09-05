# Accessibility

**Status: measured and partially fixed. WCAG 2.1 AA compliance is NOT claimed.**

Updated at the end of Phase 2. What follows separates what was **measured**, what
was **fixed**, and what remains **untested**. Contrast is computed from the design
tokens; keyboard and semantic findings come from driving the live pages in a
browser. **No screen reader has been used.**

---

## 1. Fixed in Phase 2

### Heading structure — was broken on every lesson page

Before: lesson pages had **no `<h1>`**, and the mobile navigation's four `<h4>`
grade labels opened the document outline *ahead of the page title*, producing
`h4 h4 h4 h4 h2 h4 h3 …`. For a screen-reader user navigating by heading — the
normal way to skim a 5,000-word page — the outline was actively misleading.

Fixed centrally in the build:

- Navigation labels are no longer headings (`.mobilepanel-label`).
- Heading levels are **derived from the document's own nesting**, so the first
  heading becomes the `h1` and no level is ever skipped.
- Appearance is unchanged: `.topic` and `.sub` carry the styling, the tag carries
  the meaning. A `.topic` still renders at 21px in chalk-yellow while now being
  an `<h2>`.

**Verified:** all 21 generated pages have exactly one `h1` and zero skipped
levels. Asserted by test.

### Simulator output is now announced

A student using a screen reader could press `push()` and hear **nothing** — the
console updated silently. Every `.console` now carries `role="log"`,
`aria-live="polite"` and an accessible name.

### The answer toggle now exposes its state

`.btn-ans` had no `aria-expanded`, so there was no way to tell whether a model
answer was showing. It now sets `aria-expanded` and `aria-controls`, updated on
every toggle.

### Prediction is accessible by construction

`.predict-opt` buttons carry `type="button"` and `aria-pressed`; the feedback
region is given `role="status"` when revealed, so the verdict is announced.

### Touch targets

| | Before | After |
| --- | --- | --- |
| Controls under 44px (320px viewport) | **27 of 30** | **0 of 35** |
| Controls under 24px | 3 | **0** |

Applied under `@media (pointer: coarse)` only, so desktop keeps its density.
Breadcrumb links (20px) and the brand link (34px) were caught in a second pass
after measurement.

### Type floor

Smallest rendered text in lesson content went from **10.0px → 11.4px**, with the
scale floor at 12px. Diagram labels (`.f-lbl`) went 11px → 12px. Nepali also
gained `--lh-deva` (1.85 line height), because Devanagari conjuncts need more
vertical room than Latin at the same size.

### Horizontal overflow — the biggest usability defect

The page scrolled sideways on every common phone. Now zero overflow at
**320, 375, 430, 768 and 1440px**. See [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md#the-containment-rule).

### Wide content is keyboard-reachable

Diagrams and tables that overflow now get `tabindex="0"` and `role="region"`, so
a keyboard user can scroll them, plus a visible edge fade so a cropped diagram no
longer reads as a broken one. 16 such regions on unit 1 at 320px.

### Reduced motion

`prefers-reduced-motion: reduce` collapses every duration token to zero.

---

## 2. Measured — colour contrast

Computed from `_source/design/tokens.css` with the WCAG 2.1 relative-luminance
formula. Thresholds: **4.5:1** normal text, **3:1** large text and UI components.

| Foreground | on `--bg` | on `--panel` | on `--board-2` |
| --- | --- | --- | --- |
| `--chalk-white` | 16.11 ✅ | 12.67 ✅ | 13.47 ✅ |
| `--chalk-dim` | 8.49 ✅ | 6.68 ✅ | 7.10 ✅ |
| `--chalk-faint` | 5.53 ✅ | **4.35 ❌** | 4.62 ✅ |
| `--yellow` | 12.90 ✅ | 10.15 ✅ | 10.79 ✅ |
| `--blue` | 10.58 ✅ | 8.32 ✅ | 8.85 ✅ |
| `--coral` | 8.03 ✅ | 6.32 ✅ | 6.72 ✅ |
| `--green` | 12.05 ✅ | 9.48 ✅ | 10.08 ✅ |
| `--violet` | 9.00 ✅ | 7.08 ✅ | 7.53 ✅ |

**23 of 24 text combinations pass AA.**

### Two known failures — still open

| # | Issue | Measured | Needs | Exact fix |
| --- | --- | --- | --- | --- |
| A1 | `--chalk-faint` on `--panel` | 4.35 | 4.50 | `--chalk-faint: #7e948e` → **`#819791`** |
| A2 | `--line` borders (WCAG 1.4.11) | 1.44 / 1.84 | 3.00 | `--line: #2c4a41` → **`#5e7c73`** |

**Not fixed in Phase 2 either.** Both alter the visual identity on every page —
A2 lightens every panel border noticeably. The brief directs Phase 2 to preserve
the current identity, and these are design decisions rather than defects with an
obviously correct answer. Both are one-line token edits with values already
computed, queued for a deliberate design pass.

---

## 3. Verified present

| Feature | Evidence |
| --- | --- |
| Skip link is the first focusable element | Measured on the live page |
| Landmarks | `<header> <nav> <main id="main"> <footer>` on every page |
| Breadcrumb | `<nav aria-label="Breadcrumb">` |
| Hamburger state | `aria-expanded`, `aria-controls`, `aria-label`, Escape to close |
| Dropdowns keyboard-reachable | CSS `:focus-within`, works without JS |
| Real buttons, not clickable divs | `<button type="button">` throughout |
| Focus ring | `:focus-visible` → 2px solid `--color-focus`, 2px offset, one treatment everywhere |
| `:focus:not(:focus-visible)` suppressed | Mouse users do not get a ring |
| Figures | `<figure>` + bilingual `<figcaption>` |
| Nepali announced as Nepali | `lang="ne"` on every Devanagari passage, asserted per page |
| Reflow | Single column below 820px, no fixed text heights |
| Print | Model answers revealed, components avoid page breaks |

---

## 4. Remaining gaps — not fixed, not hidden

| # | Gap | Impact | Fix |
| --- | --- | --- | --- |
| G1 | **Never tested with a screen reader** | Everything above is inference from markup | NVDA + VoiceOver pass |
| G2 | Diagrams have no accessible name | 22 SVGs are decorative to assistive tech; meaning lives only in the caption | `role="img"` + `<title>`; captions already exist |
| G3 | Quiz correctness is colour + text only | No `aria-live` on quiz feedback (the *simulator* console has one; the quiz does not) | Mirror the console treatment |
| G4 | Enhanced code blocks are `<div>` structures | Line numbers may be read as content | `role="figure"` or a wrapping `<pre>` |
| G5 | Step player has no pause | A slow reader cannot hold a step | Pause control on `runSteps` |
| G6 | A1 / A2 contrast failures | Border contrast fails 1.4.11 | Token edits, values computed above |
| G7 | Zoom to 200% / 400% never tested | Reflow is designed for but unverified | Manual pass |
| G8 | No automated audit in CI | Regressions rely on hand-written assertions | Add axe-core |
| G9 | No in-page contents on long units | Unit 1 is a very long traversal | Section index |
| G10 | Colour-blindness never simulated | Success/error rely on green/coral plus text | Verify text always accompanies colour |

G1 is the most important. Until it is done, **do not claim AA compliance
anywhere**, including in marketing copy.

---

## 5. Testing status

| Method | Done |
| --- | --- |
| Automated `lang` coverage, all pages | ✅ |
| Automated heading structure (one h1, no skips) | ✅ all 21 pages |
| Automated landmark / skip-link presence | ✅ |
| Contrast computed from tokens | ✅ 24 combinations + borders |
| Touch targets measured at 320–430px | ✅ 0 under 44px |
| Horizontal overflow at 320/375/430/768/1440 | ✅ 0 at every width |
| Focus ring present and token-driven | ✅ asserted by test |
| Reduced-motion honoured | ✅ asserted by test |
| ARIA on toggles, console, prediction | ✅ asserted by test |
| Keyboard walkthrough (full tab order) | ❌ partial — first focusable verified only |
| Screen reader (NVDA / JAWS / VoiceOver) | ❌ |
| Zoom 200% / 400% | ❌ |
| axe / Lighthouse | ❌ |
| Colour-blindness simulation | ❌ |

## 6. Recommended order for Phase 3

1. **G1** — a real screen-reader pass. It will find things this list has not.
2. **G3, G2** — quiz feedback announcement, then diagram names.
3. **A1** — the one-token text-contrast fix.
4. **A2** — border contrast, as part of the design refinement.
5. **G8** — axe-core in the test suite so regressions are caught automatically.
