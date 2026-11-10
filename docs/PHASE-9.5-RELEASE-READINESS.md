# Phase 9.5 — Release readiness

**Branch:** `phase-9-curriculum-integrity` · **From:** `69b76aa` (392 tests) ·
**To:** `110a937` (**397 tests**) · **Not merged. Not pushed. Not deployed.**

An independent validation pass, not a feature phase. Four verdicts in §1; the
evidence for each follows.

---

## 1 · The four verdicts

| | Area | Verdict |
|---|---|---|
| 1 | **Engineering readiness** | **Verified with limitations** |
| 2 | **Curriculum alignment confidence** | **Verified with limitations** |
| 3 | **Nepali educational-language readiness** | **Pending human review** |
| 4 | **Accessibility and responsive readiness** | **Verified with limitations** |

**Automated vs human.** Everything below marked *measured* was produced by a
machine — a test run, a build gate, or a browser probe whose code is recorded.
**Nothing in this phase was verified by a human reader, a Nepali speaker, or a
screen-reader user.** Those are listed in §7 and none of them is claimed.

---

## 2 · Verdict 1 — Engineering readiness: **Verified with limitations**

| Check | Result |
|---|---|
| Test suite | **397 passing, 0 failing** (392 at the start of this phase; 5 added, none removed or weakened) |
| Production build | passes; 8 subjects, 8 outlines, 34 authored pages, 70 diagrams |
| Determinism | two consecutive rebuilds byte-identical — 96 files, md5 `d77f3b22…` |
| Working tree | clean |
| Link validation | 12 tests passing |
| Coverage validation | re-derived **independently of `validate.js`**: 150 / 150 topics, 0 problems |
| Specification grid | all four subjects agree with `pages.js` on hours **and** marks; 64 hrs / 50 marks each |
| Question-bank validation | 11 selection tests, 52 questions, 0 integrity problems |

**Limitations.** No continuous integration — the suite runs when someone runs
it. No production deployment was performed or verified in this phase, by
instruction. Verification was done against a local server; the Vercel
deployment path has not been exercised since Phase 8.

### A correction to the brief's premise

The brief asks for "all 36 Grade 10 pages". There are **39**: 11 for DS & OOP,
10 for DBMS, 8 for Digital Design, 9 for Hardware, and the grade hub. Site-wide
there are **47** built pages. All 47 were swept, not 36.

---

## 3 · Verdict 2 — Curriculum alignment: **Verified with limitations**

Re-verified from source rather than trusted: **150 / 150 official topics mapped
across all four subjects**, every anchor resolving, no stale entry, hours and
marks matching the official grid unit by unit. Checked by a script that does not
use `validate.js`, so a bug in the validator cannot vouch for itself.

Full investigation in [`CURRICULUM-APPLICABILITY.md`](CURRICULUM-APPLICABILITY.md),
with every source graded. The short version:

- **Tier 1, official CDC.** The 2078 edition is the only edition CDC publishes
  for this subject, and CDC is publishing Grade 10 **textbooks** for its
  subjects dated 1 Mangsir 2082 BS — *Data structure & OOP concept using C++
  Grade - 10* and *Computer Hardware, Electronics Repair and Maintenance
  Grade - 10*, titles matching the 2078 subject names character for character.
  All four Grade 9 subjects likewise.
- **Tiers 2 and 3, official notices and examination guidance: nothing found.**
  No CDC notice names an applicable edition; no NEB or SEE publication names the
  curriculum its technical-stream papers are set from.
- **Tier 4**, secondary sources, read for background and cited for nothing.
- **Tier 5** names the three remaining assumptions as assumptions.

**The limitation, stated plainly: no document establishes which curriculum
edition any given year's SEE paper is set from.** The coverage maps are
unchanged, per instruction, because nothing found gives a verified reason to
move them.

### One product change came out of this

The curriculum's §7 states *"Internal evaluation covers 50 Percent weightage"*.
The Specification Grid therefore governs **half** the subject. Three of the four
subject heroes showed a bare **"50 marks"** pill; the fourth already said
**"50 external marks"**, and that inconsistency is what made it visible. A
student reading any of those three could take the theory paper for the whole
subject. All four now say *external*, and a test holds them together.

---

## 4 · Verdict 3 — Nepali language readiness: **Pending human review**

> **No review has taken place. No reviewer has been engaged, named or
> approached. Zero of 1,956 items are accepted.**

What exists is the *request* for a review, which did not exist before.

| | |
|---|---|
| Package | [`NEPALI-REVIEW-PACKAGE.html`](NEPALI-REVIEW-PACKAGE.html) — opens in any browser, works offline, prints |
| Ledger | [`NEPALI-REVIEW-STATUS.md`](NEPALI-REVIEW-STATUS.md) — four statuses, all 1,956 items `Pending review` |
| Data | `nepali-review-items.json` — per-item, keyed by a content-derived id |
| Generator | `tools/nepali-review.js` |
| Items | **1,956** bilingual pairs; **217** added or changed in Phase 9 |
| Capture | **99.0%** of the distinct Nepali words in the lesson files |

Generated from the content on every run, never hand-written, so the package and
the pages cannot disagree. It filters to the 217 newest items in one click,
because 1,956 items is a week of someone's time and 217 is an evening. Each item
carries subject, unit, marks, topic, kind, the English it is meant to match, the
technical terms left in Latin script, and a field to write in.

The status file also puts **five decisions taken without a native speaker** to
the reviewer as questions rather than defending them — which terms stay in Latin
script, इन्टिटी against एन्टिटी, बाबु/छोरा for inheritance against अभिभावक for a tree,
the register of instructions, and the Devanagari/Latin numeral split.

**Three bugs in the "what changed in Phase 9" detection were found and fixed
before the package was trusted:** diff-based matching missed paragraphs that wrap
across source lines; strings too short to identify were reported as new rather
than unknown; and a backslash before a quotation mark made an untouched
explanation compare unequal. The final 217 is reconcilable item by item.

---

## 5 · Verdict 4 — Accessibility and responsive: **Verified with limitations**

### Responsive — measured, all 47 pages × 5 widths

**235 measurements at 320, 375, 768, 1024 and 1440.** Driven from a same-origin
iframe harness, which took two attempts: the site's own CSP is
`default-src 'none'`, so a Gyansetu page cannot frame anything and the harness
had to live outside the built site.

| Check | Result |
|---|---|
| Horizontal page overflow | **zero**, every page, every width |
| Elements bleeding past the viewport | **zero** |
| Text clipped by an `overflow:hidden` box | two found, both fixed (below) |
| Tables at 320px | scroll inside `.tablewrap`, `overflow-x:auto`, no page scroll |
| Touch targets, re-measured with touch emulation | breadcrumb 37×44, brand 116×44, hamburger 42×44, switcher 24×44 |

**Two genuine defects, both in shared components** — which is why checking only
recently-edited pages had missed them for several phases:

1. **A long word in a hero was cut, not wrapped.** `.hero` is `overflow:hidden`,
   so "Microprocessor" ran 5px past the clip edge at 320px and lost its last
   letters. The other three subject titles cleared the same column by 29px purely
   because every word in them is shorter — the page that broke was an accident of
   vocabulary. Fixed with one declaration.
2. **The home carousel dots were 9px wide.** On touch the generic button rule
   already gave them 44px of height, so the target was 9 × 44 — under the 24px
   minimum on the axis a thumb actually aims along, and the single control
   missing from the hand-maintained `pointer: coarse` list. The dot stays 9px and
   the target grows to 25 × 25 via `::after`; the gap goes 7 → 16 so two targets
   cannot overlap and send a press to the wrong slide.

Both pinned by mutation-tested regression tests.

**Two things that looked like defects and were not**, checked rather than fixed:
the home hero's reported clipping is a 343px decorative glow in a 288px box plus
the carousel's off-stage slides, both of which `overflow:hidden` exists to clip;
and the small header controls were measured with a *desktop* pointer, when those
rules sit behind `@media (pointer: coarse)` — the density split is deliberate and
documented.

### Accessibility — measured on 24 pages, with components mounted

| Check | Result |
|---|---|
| Focusable controls without an accessible name | **0 of 1,072** |
| Inputs without a programmatic label | **0 of 78** |
| SVGs exposed without a name | **0 of 52** |
| Pages with more than one `h1` | **0** |
| Heading-level jumps | 1 found, fixed |
| Live regions present | 16 |
| Keyboard focus | verified with real Tab presses; skip link first, 2–3px visible outline, `:focus-visible` matching |
| Accessibility tree | inspected; the switcher exposes as three named radios, the menu as `button "Open menu"`, `main` landmark present |

**Two defects, both invisible to the existing 17-test static suite** because it
reads built HTML and these are emitted by JavaScript afterwards:

1. **A skipped heading level.** `normaliseHeadings()` derives authored heading
   levels from document nesting; headings emitted after load never pass through
   it, and two simulators hardcoded `<h5>`. On `hardware/unit5.html` the outline
   went h3 → h5. Both components now compute their level from the nearest
   heading above them, because hardcoding h4 would be right today and wrong at
   the next nesting change.
2. **Nepali console output carried no language.** `conLine(el, text, 'np')` told
   the stylesheet the line was Nepali and told assistive technology nothing, so a
   screen reader would read Devanagari in an English voice. Six call sites in
   three files, one of them the shared step player every stepped simulation goes
   through. Fixed in `conLine` itself.

Reduced motion is covered by four existing tests and ten CSS media blocks;
OS-level emulation was not available here, so that remains verified by contract
rather than by observation.

### Three language modes — 17 pages, all four subjects, real switcher

Zero Devanagari visible in English mode. Zero English visible in Nepali mode.
Zero pairs left empty in any mode. Zero controls rendering without a label.
**Interaction state survives switching** — a quiz answer, a drill judgement and a
prediction's feedback all persist across bi → ne → en, with the same DOM nodes.

### The limitation that matters

> **No screen reader was run. None is drivable in this environment.** The
> accessibility *tree* was inspected — that is what a screen reader is given,
> not what it says. **WCAG 2.1 AA conformance is not claimed**, and nothing here
> should be read as claiming it.

---

## 6 · Regression

| | Before | After |
|---|---:|---:|
| Tests | 392 | **397** |
| Failing | 0 | **0** |
| Build | passes | passes |
| Determinism | byte-identical | byte-identical |
| Coverage | 150 / 150 | **150 / 150** |

No assertion was removed, weakened or skipped. The five new tests are: an
authored subject must have a coverage map; a subject must not show its external
paper as the whole subject; a long word in a hero cannot be cut; the carousel
dots are big enough to press; a component that emits a heading computes its
level; and Nepali console output declares its language. **All mutation-tested.**

### My own measurement errors, recorded because they shaped findings

Four probes gave wrong answers before they gave right ones, and each would have
produced a false finding:

1. Touch targets measured with a desktop pointer, when the rules are behind
   `@media (pointer: coarse)` — reported four shared controls as too small when
   all four are 44px on touch.
2. Visibility tested with the element's own computed `display`, when an element
   inside a `display:none` ancestor still reports its own — reported 102 stray
   Devanagari blocks on a page that has none.
3. An accessible-name function that handled `INPUT` but not `TEXTAREA` —
   reported every scratch box on seven pages as unlabelled.
4. Phase 9 change detection compared against a line-based diff, then against
   short strings, then across a backslash — three wrong counts before 217.

---

## 7 · Open, and not claimed

| Item | Status |
|---|---|
| **Nepali read by a qualified human** | **Not done.** Package ready, 0 of 1,956 reviewed. The single largest open item. |
| **Screen-reader verification** | **Not done.** Not drivable here. No WCAG claim. |
| **Which curriculum edition the SEE is set from** | **Unestablished.** No source at any tier states it. |
| **Reduced motion observed under OS emulation** | **Not done.** Verified by contract and CSS. |
| **Continuous integration** | **None.** The suite runs when run. |
| **Production deployment** | **Not performed**, by instruction. |
| **Eight units at one practice component** | Measured and published in the Phase 9 continuation; not addressed. |
| **Grade 9** | Four subjects outlined, none authored. Out of scope by instruction. |

## 8 · Commits

| Hash | What |
|---|---|
| `e61c7b2` | Nepali review package, ledger and generator |
| `3f35ec6` | Curriculum applicability, tiered evidence; the external-marks correction |
| `6739493` | Responsive sweep, 47 pages × 5 widths; two fixes |
| `110a937` | Accessibility: heading level and console language; three-mode verification |

## 9 · Recommendation

**Gyansetu is engineering-ready and curriculum-aligned to the only published
edition. It is not language-reviewed.**

Ship or hold is a judgement about that one gap. The content is complete,
internally consistent and machine-verified; what no machine here can tell you is
whether a Grade 10 student in Nepal reads the Nepali as natural. The package
that answers it is ready and takes a teacher an evening for the 217 newest
items.

The second-largest gap, a screen-reader pass, needs an environment this one
cannot provide.
