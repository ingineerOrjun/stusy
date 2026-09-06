# Phase 3.1 — Completion Report

**Foundation consolidation.** Not a redesign, not new features. The goal was
to make what already exists trustworthy, and to turn the language system from
a feature of one subject into a contract the next subject inherits without
being told.

Every number below is measured. Where something could not be measured, it says
so in those words.

---

## 1. Executive summary

| | Before Phase 3.1 | After |
| --- | --- | --- |
| Automated tests | 173 | **202** |
| Consecutive clean suite runs verified | 1 | **15** |
| Build determinism | assumed | **proved** — 52 files byte-identical across two absolute paths |
| Contrast failures found | 2, unfixed | **0** |
| Hard-coded diagram colours | 129 | **0** — all tokenised |
| Hard-coded control labels | 19 | **0** — all from the string table |
| Build-time language checks | 0 | **5 checks, 14 distinct refusals** |
| Text below the documented type floor | 7 rules | **0** |
| Labels showing both languages in every mode | 50 | **0** |
| Documentation index | none | `docs/README.md`, all 31 documents mapped |

The most important finding of the phase is not in that table. It is that
**three real defects passed 200 green tests** and were found only by putting
the site on screen and looking at it. That is recorded in
[PHASE-3.1-AUDIT.md § Found by looking](PHASE-3.1-AUDIT.md), and it is why
visual QA became a tool rather than an afternoon.

---

## 2. Audit results

Full detail in [PHASE-3.1-AUDIT.md](PHASE-3.1-AUDIT.md). Counts by severity:

| Severity | Found | Fixed | Deferred with reason |
| --- | --- | --- | --- |
| Critical | 2 | 2 | 0 |
| High | 6 | 6 | 0 |
| Medium | 8 | 6 | 2 |
| Low | 3 | 3 | 0 |
| Deferred by decision | 4 | — | 4 |

Two entries in the audit are **corrections to earlier reports**, kept because
a report that quietly drops a claim is worse than one that withdraws it:

- **C1** — "an `h1` inside a `.t-en` wrapper on 8 pages" was a **false
  positive**. The detecting regex could not count nesting. A nesting-aware walk
  finds zero. The regex was replaced, and a test now proves the walk can fail.
- **C2** — "an absolute Windows path in `context.js`" is a path *in a comment
  describing the defect that was fixed*, not a live path.

### The two critical findings

**The whole program tracer disappeared in Nepali mode.** `<div class="en">` had
been used as a layout container on `trace.html`, and the Nepali rule
`[data-lang="ne"] .en` hid it entirely — the tracer, its controls and its
console. Fixed in two places on purpose: the CSS rule is now scoped to
`.pair .en` so it can only ever hide a bilingual panel, and the markup uses
`.panelbox` for the layout role so the two meanings of "en" are separated at
the source. Both are covered by tests.

**Both languages on one line, in every mode.** 41 authored labels and 9 runtime
labels put English and Nepali in a single text run, which a CSS language layer
cannot split. English mode showed Nepali; Nepali mode showed English. See §5.

---

## 3. What was fixed

**Language system → platform contract**
- `runtime/services/strings.js` — a 15-key UI string table. The 19 hard-coded
  control labels counted in audit H1 now come from it, applied by `textContent`
  only, never a re-render.
- Five build-time checks, refusing a page in 14 distinct ways, enforce the
  contract (§5).
- `§5D Label pairs` added to the contract, with the pattern a future author
  copies.
- The build's pairing pass gained a third rule: it yields to an author's own
  split instead of wrapping over it.

**Contrast** — the two measured failures, fixed by the smallest change that
works rather than by the Phase 2 candidate values:
- `--chalk-faint` `#7e948e` → `#819791`. Was 4.35:1 on `--panel`, now **4.52:1**
  (WCAG 1.4.3 needs 4.5:1). Three steps of 255.
- `--line` was 1.44:1 and is used both for decorative rules and for control
  borders. Rather than raise one token and change every hairline on the site,
  it **split**: `--line` keeps its value for decoration (exempt under 1.4.11),
  and a new `--line-strong` at **3.03:1** is used for control borders only.

**Diagram colours** — 129 hard-coded hex values mapped to four semantic tokens.
They are declared in `style=` rather than as presentation attributes, because a
presentation attribute has specificity 0 and loses to any class rule. That trap
had already produced three separate defects in this codebase; 54 colour cues in
the new Digital Design diagrams were silently not rendering because of it.

**Type floor** — seven rules in `digital.css` set labels at 9.5–11px while the
design system's own page states 12px is the floor. Measured first (at 12px the
K-map grid grows 2px, with 774px of slack), then raised, then re-swept.

**Accessibility** — heading order corrected where the quiz produced an
`h1 → h4` skip; `role="status"` added to the quiz explanation, the score box
and the simulator consoles; two Nepali strings that rendered after the build's
language-marking pass now carry `lang="ne"`, with a regression test.

**Determinism** — the one flaky test (~1 run in 15) was a transient Windows file
lock exhausting a 150ms retry budget. Fixed with a real synchronous sleep
(`Atomics.wait`, not a busy-spin) and a 3.9s budget across 9 attempts.

---

## 4. What was deliberately not fixed

Each of these is a decision with a reason, not an omission. Full records in
[PHASE-3.1-DECISIONS.md](PHASE-3.1-DECISIONS.md).

| Not done | Why |
| --- | --- |
| Build all four Phase 2.5 animation candidates | Reviewed one by one; none showed clear educational value over the static figure. Building four animations to satisfy a list is how a study site becomes a toy. **D4** |
| Consolidate `learning-ux.css` into `base.css` | It is a corrective layer and it is honest about being one. Merging it is a large stylesheet rewrite with no user-visible gain and real regression risk across 28 pages. **D5** |
| Remove the 63 inline event handlers | Removing them is the right end state for a strict CSP, but there is no CSP to satisfy yet and the change touches every interactive component. Recorded as debt with the migration path. **D9** |
| Quote a frame rate | The only environment available throttles `requestAnimationFrame`. Any number would be fiction. **D6** |
| Mobile diagram variants | Would mean authoring 38 figures twice. Diagrams scroll horizontally inside a scrolling container instead. **D4 (Phase 2.5), unchanged** |
| Raise SVG label sizes in `site.css` | Those are user units inside a scaled `viewBox`, not CSS pixels. The same number does not mean the same thing, and changing 38 diagrams' internal type on an untested analogy is exactly the churn to avoid. **D14** |

---

## 5. The language system as a platform contract

The Phase 3 brief required that a future subject inherit the three-language
system automatically. Phase 3.1 is where that became true, because a contract
nobody enforces is a convention.

**The contract distinguishes four kinds of text**
([LANGUAGE-SYSTEM.md §5](LANGUAGE-SYSTEM.md)):

| | Rule |
| --- | --- |
| **A. Student-authored content** | Both languages required |
| **B. Technical terminology** | English, deliberately — gate names, `Truth table`, opcodes, register names. Glossed, never replaced |
| **C. UI and system strings** | One label, from `strings.js`, marked `data-ui` |
| **D. Label pairs** | Two names for one thing, split in place so the separator leaves with the Nepali |

**What the build now refuses** — five checks (`validate.js` §4f.1–4f.5) that
refuse a page in fourteen distinct ways, every one proved by breaking the thing
it guards:

a question with no English prompt · no English explanation · no **Nepali**
explanation · an option with no English text · an unknown language key · an
empty English field · a duplicate id · a mode missing from the service · a
bootstrap that disagrees with the service about the storage key · a UI string
with no Nepali · **a component shipping a hard-coded control label** · headings
losing their protection from the pairing transform · the pairing transform
losing its locality rule.

The control-label check is the one that makes the contract inherit. A new
component with `<button>Start over</button>` fails the build with a message
naming the fix. Its exemptions were tuned against real content rather than
guessed: code-like labels (`push()`, `A → B`, `x = 1`) are terminology and pass,
and `data-ui-content` marks a label that is genuinely lesson content.

**What is deliberately not enforced:** that every English word has a Nepali
equivalent; that option text is bilingual; prose quality. Those are review, not
validation, and a validator that demanded them would be answered with invented
translations.

**State survives a switch.** Verified by hand: the 8085 simulator at step 7/12
with `ACC = 05H` in the EXECUTE phase kept step, register and phase across two
mode changes. This works because nothing re-renders — the language layer sets
`textContent` and toggles CSS, and the quiz keeps both languages in the DOM so
a switch never touches a student's answers.

---

## 6. Accessibility — and what is NOT verified

> ## WCAG 2.1 AA IS NOT CLAIMED

Full record in [ACCESSIBILITY-AUDIT.md](ACCESSIBILITY-AUDIT.md).

**Measured and fixed**
- Every text/background pair computed against WCAG relative luminance. Two
  failures found, both fixed (§3). All text now meets 1.4.3 (4.5:1).
- Control borders meet 1.4.11 (3:1) via `--line-strong`. Decorative rules are
  exempt under 1.4.11 and were not raised — raising them would have been a
  cosmetic change justified by a misread of the criterion.
- Heading order: measured across all 28 pages, **0 skips**.
- Keyboard: every control reachable and operable, tested by hand. The mode
  switcher is a roving-tabindex radiogroup; wide content is focusable so it can
  be scrolled by keyboard.
- Touch targets: 44px on touch devices, asserted by test.
- Live regions: quiz explanation, score box and simulator consoles announce.

**NOT VERIFIED — stated plainly**

| | Why |
| --- | --- |
| **What a screen reader announces** | No screen reader was available in this environment. The markup was written for one, and `role`, `aria-live` and heading structure are asserted by tests — but **DOM assertions are not screen-reader testing**, and this phase proved exactly how far markup correctness can be from what a user experiences. |
| **Colour as a colour-blind student sees it** | No simulation tool available. Mitigated in design: every colour cue is paired with a shape, a label or a position, never carried by hue alone. Unverified. |
| **Layout at 200% and 400% zoom** | Not tested. |
| **Frame rate** | Not measured, and not estimated. |

---

## 7. Visualization and animation review

**The architecture was verified, not rebuilt.** The Phase 2.5 diagram runtime
and motion service were reused unchanged by five new interactive components
(`sim-gates`, `sim-number`, `sim-kmap`, `sim-comb`, `sim-8085`). That they
absorbed a whole new subject without modification is the evidence that the
abstraction was the right size. No second visualization system was created and
no speculative abstraction was added.

**The four unbuilt animation candidates were reviewed individually. None were
built.** Each was judged against one question: does motion teach something the
static figure cannot? For all four the answer was no — they animate a
*taxonomy* or a *comparison*, which are lookups, not processes. Animating a
lookup teaches the order of the rows.

**Correctness is generated, not typed.** Every truth table, K-map result and
circuit output is computed by the same function that drives the diagram, so a
table cannot drift from its drawing. The K-map rule engine was verified against
known answers including four-corner wrap; every circuit was checked against
arithmetic.

**All 38 diagrams** are collision-free (verified by an audit that now includes
an `isPointInFill` corner test, after the previous bounding-box check was found
blind to rounded containers) and use tokenised colour.

---

## 8. Test suite quality

202 tests, `node:test` + `node:assert`, no framework, no dependencies.

| Suite | Tests | Covers |
| --- | --- | --- |
| `language.test.js` | 41 | The service, storage failure modes, the build-time pairing, mode coverage on every page |
| `motion.test.js` | 26 | Motion levels, reduced-motion, when not to animate |
| `runtime.test.js` | 25 | Components against a DOM stub |
| `ux.test.js` | 18 | Heading order, touch targets, focus, lesson structure |
| `progress.test.js` | 17 | Storage layer and its failure modes |
| `kmap.test.js` | 13 | The K-map rule engine against known answers |
| `content.test.js` | 13 | The content contract |
| `ui-strings.test.js` | 12 | The string table and its application |
| `links.test.js` | 12 | 1,102 internal links |
| `circuits.test.js` | 11 | Every circuit against arithmetic |
| `build.test.js` | 8 | The pipeline |
| `contrast.test.js` | 6 | WCAG luminance computation |

**Quality, not just count.** Two audit findings were about the tests themselves:

- A test reported 8 failures that did not exist, because its regex could not
  count nesting. **A test that reports a defect that is not there is a defect.**
- A test that cannot fail is worse than no test. Where a check guards something
  subtle, the check was proved by breaking the guarded thing and confirming the
  failure message. The runtime-label test, for instance, reports exactly
  `sim-number.js <sim-controls-label>: Add one column at a time`.

**Stability: 15 consecutive clean runs**, all 202 passing, after the flake fix.
One green run was not accepted as evidence.

**What the suite cannot see** — and this is the phase's real lesson. It asserts
on markup. It has no CSS and no layout, so it cannot see two languages sharing
a line, a table wider than its box, or a panel a mode left empty. Three real
defects lived behind 200 green tests. `tests/manual/qa-sweep.js` is the
instrument for that half, and it is deliberately *not* in the automated suite:
written against the DOM stub it would assert on markup again, which is the
blind spot itself.

---

## 9. Build reproducibility

| Check | Result |
| --- | --- |
| Build from a fresh tree at a different absolute path | **202/202 tests pass** |
| Output compared across the two paths | **52 files byte-identical** |
| Same tree rebuilt twice | **52 files byte-identical** — deterministic |
| Dependencies to install | **none** — Node 20+ is the only requirement |
| Validation gate | Content validation runs *before* any page is written; a contract violation fails the build with nothing half-written |

The Phase 1 defect where the output path was hard-coded to one machine is gone;
the only remaining occurrences of that path are in documents quoting the defect
they fixed.

---

## 10. Repository and documentation

**Repository.** Scanned for scratch files, logs, editor backups, browser
artifacts, screenshots and personal machine paths: **none found** in the
committed tree. The one tool config created during this phase
(`.claude/launch.json`, a preview-server shortcut duplicating `npm run serve`)
was removed rather than committed.

**Git.** Committed without rewriting history. No `reset --hard`, no
`filter-branch`, no force push — the brief's rule, and the right one.

The work of phases 1–3.1 arrived as one working tree with no intermediate
snapshots, so four historically-accurate phase commits are not reconstructible:
`_source/diagrams.js` alone carries Phase 1 structure, Phase 2.5 animation,
Phase 3 diagrams and Phase 3.1 tokens in one file state. Splitting it would
mean inventing intermediate contents that never existed and never built. The
work is therefore committed as **two commits that each build and pass**: the
site (source, generated output, tests) and the documentation set. The phase
records in `docs/` carry the history that the commit graph cannot.

**Documentation consolidated.** 31 documents now have an index
([docs/README.md](README.md)) organised by what a reader is trying to do, and
the distinction that was previously implicit is now stated:

- **Contracts** describe how the system works now. Keep them true.
- **Phase records** are dated accounts. Do not update them — a report saying
  "173 tests" was correct on the day it was written.

`I18N-ARCHITECTURE.md` is marked superseded by `LANGUAGE-SYSTEM.md`, in the
index and in its own header. Stale counts in `README.md` were replaced with
measured ones (tests 113 → 202, links 936 → 1,102, components, word count).

---

## 11. Regression matrix

| Check | Scope | Result |
| --- | --- | --- |
| Build | full | clean, **zero warnings** |
| Content validation | 8 subjects, 7 outlines, 15 authored pages, 38 diagrams | OK |
| Automated tests | 202 | **202 pass, 0 fail** |
| Suite stability | 15 consecutive runs | **all clean** |
| Internal links | 1,102 | **0 broken** |
| Three-mode sweep @1280px | **28 pages × 3 modes** | 0 overflow · 0 clipped · 0 empty panels · 0 language leaks |
| Three-mode sweep @375px | 7 representative pages × 3 modes | same, all clean |
| State across a language switch | 8085 simulator, K-map | preserved — verified by reading state before and after |
| Build determinism | 52 files | byte-identical |
| Fresh-tree reproduction | different absolute path | byte-identical, 202/202 |
| Heading order | 28 pages | 0 skips |
| Offline-first | all built pages | 0 root-relative paths, 0 `fetch`/XHR/ES modules |

The only external request on the whole site is Google Fonts, and it is
optional: every font stack falls back to a system face, Devanagari included.
That caveat is documented in five places rather than glossed.

---

## 12. Commercial quality check

Judged from five seats, by using the site rather than by describing it.

**A student.** Two clicks from the home page to any lesson. The first screen of
a unit states what you will be able to do by the end, in both languages. The
interactive components respond to a click and explain *why* the output changed,
which is the difference between a toy and a lesson. Everything works on a
375px phone with no horizontal scrolling, and the language mode a student picks
survives navigation without touching their answers or their progress. Weakness:
in Nepali mode a student still meets English headings — a documented fallback,
not a bug, but it is the most visible gap remaining.

**A parent.** The home page says what it is, which board and syllabus it
follows (CDC Nepal 2078), and which grades are ready. Grades 11 and 12 are
labelled `soon` rather than linked to an empty page. Nothing asks for a login,
a payment or an email address. Nothing tracks the student off the device —
progress is `localStorage`, and there is no analytics of any kind.

**A teacher.** Every unit carries its official teaching hours and marks, and the
build refuses to publish a subject whose hours do not sum to the syllabus. The
four Grade 10 subjects that are not yet written are not hidden and not faked:
each shows the complete official CDC syllabus with a badge reading
`SYLLABUS OUTLINE`, and links to the finished subject as a sample of what full
notes will look like. Curriculum ambiguities are recorded in
[PHASE-3-CURRICULUM-MAP.md](PHASE-3-CURRICULUM-MAP.md) rather than guessed.

**A developer.** `npm run check` is the whole workflow; there is nothing to
install. The build fails loudly and specifically on a contract violation. 202
tests run in about six seconds. Documentation is indexed and distinguishes
contracts from history. Honest weakness: 63 inline event handlers stand between
this and a strict CSP, and `learning-ux.css` is a corrective layer — both
recorded as debt with a migration path rather than left to be discovered.

**The business.** Two of eight subjects are fully written; the other six ship
their real syllabus. That ratio is stated on the home page and in
`PROJECT_REPORT.md` rather than obscured. The architecture's claim to scale is
now evidenced rather than asserted: a whole new subject was added in Phase 3
reusing the existing runtime unchanged, and Phase 3.1 turned the language system
into something the next subject inherits by building, not by remembering. The
honest risk is content velocity, not engineering — writing six more subjects to
this standard is the work, and no amount of platform makes it faster.

---

## 13. Remaining debt

Carried forward deliberately, in the order a future phase should take it.

| # | Item | Why it waits |
| --- | --- | --- |
| 1 | **Screen-reader verification** | Needs a real reader — NVDA, JAWS or VoiceOver — and a person listening. It is the single biggest unknown in the product, and no amount of test-writing substitutes for it. |
| 2 | Colour-blind simulation and zoom to 200%/400% | Same shape of gap: needs tools this environment does not have. |
| 3 | Frame rate on real hardware | Must be measured on a mid-range phone, not in an automation pane. |
| 4 | 63 inline event handlers | Blocks a strict CSP. Do it when a CSP is actually being adopted, in one pass, with the delegation pattern already sketched in **D9**. |
| 5 | `learning-ux.css` consolidation | Only worth doing alongside a change that already touches those components. **D5** |
| 6 | English headings in Nepali mode | The most visible fallback. Fixing it well means authoring Nepali headings as content, not translating them at build time. |
| 7 | The six unwritten subjects | Content work, not platform work. |

**Not started, and deliberately out of scope for this phase:** DBMS, C, Java,
Grade 11, Grade 12, authentication, payments, analytics, teacher and admin
dashboards, cloud infrastructure. None were begun.

---

## PHASE 3.1 — COMPLETE

Everything in the brief was either done, or deferred with a written reason and
a decision record. Nothing was claimed that was not measured. The four
verification gaps in §6 and §13 are stated as **NOT VERIFIED** rather than
softened, and **WCAG 2.1 AA is not claimed.**
