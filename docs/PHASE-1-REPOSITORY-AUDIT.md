# Phase 1 — Repository Audit

**Date:** 5 September 2026
**Scope:** full repository inspection prior to any modification.
**Method:** read every build script, runtime module, content file and generated
page; measured counts and checks directly rather than estimating.

---

## 1. Current architecture

```
legacy-single-file.html  (177 KB)
        │  regex extraction + 12 string patches
        ▼
_source/build.js  ──► CSS, 7 JS modules, 10 HTML sections, site map, syllabus data
        │
_source/build2.js ──► site CSS, nav markup, page shell, page-writing loop
        │  + _source/content/u1..u6.html   (authored lessons)
        │  + _source/diagrams.js           (22 SVG diagrams)
        ▼
index.html · grade9/** · grade10/** · assets/**      (20 pages, committed)
```

Two Node scripts (370 + 705 lines) and one 177 KB legacy HTML artifact produce
the whole site. No dependencies, no `package.json`, no lockfile, no framework.

### Module inventory

| Layer | Files | Size |
| --- | --- | --- |
| Build | `build.js`, `build2.js`, `check-links.js` | 63 KB |
| Diagrams | `diagrams.js` — 22 SVGs | 50 KB |
| Authored content | `content/u1..u6.html` | 183 KB |
| Legacy source artifact | `legacy-single-file.html` | 177 KB |
| Generated runtime | `assets/js/*.js` (7), `assets/css/style.css` | 89 KB |
| Generated pages | 20 HTML | 587 KB |

---

## 2. Subsystem-by-subsystem

### 2.1 Build process

`build.js` does four unrelated jobs: reads the legacy file, extracts CSS/JS/HTML
by regex, patches the extracted JS with 12 string replacements, and holds the
site map plus 284 syllabus topics as inline data.

`build2.js` does four more: holds ~300 lines of CSS in a template literal, builds
the nav markup, defines the page shell, and writes all 20 pages.

Neither file has a single responsibility. Both mix data, presentation and I/O.

### 2.2 Content system

Two different representations coexist:

- **Deep-authored lessons** — `content/uN.html`, raw HTML fragments containing one
  `<section>`. Picked up automatically by filename convention.
- **Everything else** — site map (`SITE`), syllabus outlines (`OUTLINE`, 284
  topics), and page config (`CPP_PAGES`) as JavaScript object literals inside
  `build.js`.

There is **no content schema and no validation**. A missing title, a duplicate
slug or a malformed unit produces a broken page silently. The one exception is
diagram references, which fail loudly — that pattern is correct and should be
generalised.

Content is addressed by **file path convention** (`content/u1.html`), not by a
stable ID. There is no grade/subject/unit/lesson identity model, so nothing can
reference a lesson except the build loop that happens to iterate it.

### 2.3 Diagram system

The strongest subsystem. 22 hand-authored inline SVGs in one module, referenced
from content as `{{dia:name}}`, injected at build time, using shared CSS classes
(`f-box`, `f-lbl`, `f-arr`) so they inherit the theme instead of hard-coding
colour. **Unknown placeholders fail the build.** All 22 are used; none orphaned.

Weakness: one 50 KB module, and every diagram is inlined into every page that
uses it — no deduplication across pages.

### 2.4 Simulation system

Three interactive systems share one runtime helper (`runSteps` in `code.js`) that
plays a list of `{line, en, np, out, act}` steps against a code block and a
console. That shared step-player is genuinely reusable and is the seed of a real
simulation architecture.

Around it, however, each simulator is bespoke: `sim-stackqueue.js` and
`sim-dispatch.js` declare their own module-level mutable state (`stkArr`,
`qArr`, `dispGuard`), their own globals, and their own reset logic. There is no
common lifecycle (init / state / render / reset), no registry, and no metadata.
Adding a logic-gate or K-map simulator today means writing a fourth bespoke system.

All simulator entry points are **global functions invoked from inline `onclick`
attributes** — 60 across the site.

### 2.5 Assessment system

`quiz.js` holds 15 questions as an array of `{q, o, a, e, n}` — question text,
options, answer index, English explanation, Nepali explanation. Scoring, answer
locking, feedback rendering and score display all live in the same file, coupled
directly to DOM ids (`quizBox`, `scoreNum`).

Missing for scale: question IDs, subject/unit/topic tagging, difficulty, question
type, and any separation between the *bank*, the *quiz*, and the *attempt*.
A second subject cannot add questions without editing this file.

### 2.6 Navigation

Generated per page at build time from the `SITE` map, with correct relative depth
(`../../`). Desktop dropdowns, mobile hamburger, breadcrumbs, unit chip bar and
prev/next pager. Only the hamburger needs JS; everything else is static markup.
This is architecturally sound and scales — adding a subject to `SITE` updates
every page's nav automatically.

### 2.7 Styling

One 30 KB stylesheet, assembled from two sources: `baseCss` (extracted from the
legacy file) plus `siteCss` (a template literal in `build2.js`). Design tokens are
properly centralised in `:root` — 8 colours, 3 font stacks, radius, shadow — and
consistently used. ~90 component classes. Breakpoints at 640/820/900/940 px plus
a print stylesheet that reveals hidden model answers.

The tokens themselves are good. The problem is **where they live**: the canonical
copy is inside a 177 KB legacy HTML artifact.

### 2.8 Data flow

```
Page HTML  ──onclick──►  global function  ──►  module-level mutable state  ──►  innerHTML
```

There is no service layer. No progress storage exists yet, which is fortunate —
it means the abstraction can be introduced before `localStorage` calls get
scattered through pages.

---

## 3. Findings

### KEEP — architecturally sound

| # | Item | Why |
| --- | --- | --- |
| K1 | Static-site architecture, zero dependencies | Correct for the product. Works offline, deploys anywhere, no supply chain, no CVE surface. Can scale to 60+ pages and to a CDN serving millions. |
| K2 | Generated pages from a site map | The reason 20 pages share one nav with zero drift. |
| K3 | Diagram registry + `{{dia:}}` + build-time failure on unknown reference | Exactly the right pattern. Generalise it. |
| K4 | Design tokens in `:root` | Already centralised and consistently used. |
| K5 | Bilingual `.en` / `.np` component pair | Structural, consistent, never a toggle. |
| K6 | `runSteps` shared step player | The reusable core of the simulation system. |
| K7 | Null-guard pattern letting one bundle load safely on any page | Sound; only the *way it is applied* (post-hoc patching) is wrong. |
| K8 | Print stylesheet | Genuine pedagogical value. |
| K9 | `check-links.js` | Real, working validation. Fold into the test suite. |

### IMPROVE — refactor, do not replace

| # | Item | Problem | Direction |
| --- | --- | --- | --- |
| I1 | `build.js` / `build2.js` | Two files, eight responsibilities, 1,075 lines | Split into config / content / design / templates / writer |
| I2 | Content as JS literals in build code | Data and logic interleaved; no schema | Extract to a content module with an explicit contract |
| I3 | No content validation | Broken content ships silently | Validate against the contract; fail the build |
| I4 | No content identity | Lessons addressed by file path | Give every grade/subject/unit a stable ID |
| I5 | Quiz coupled to DOM + no metadata | Cannot add a second subject's questions | Question bank + `QuizService`; keep behaviour identical |
| I6 | Bespoke simulator state | Every new simulation is a new system | Common lifecycle + registry over the existing `runSteps` |
| I7 | Design tokens sourced from legacy artifact | Canonical CSS lives in generated HTML | Promote to real stylesheet source files |
| I8 | All JS loads eagerly | `code.js` on every lesson page regardless of need | Load interactive modules only where used |
| I9 | No `package.json` | No scripts, no engine pin, no test entry point | Add — still with zero runtime dependencies |
| I10 | No progress abstraction | Nothing exists yet | Introduce `ProgressService` *before* pages need it |

### REPLACE — genuinely requires replacement

Only two items. Both are justified below.

| # | Item | Why replacement, not refactor |
| --- | --- | --- |
| **R1** | **Hard-coded absolute output path** — `const OUT = 'C:/Users/Acer/Desktop/rgsc-study'` | The build only runs on one machine at one path. It cannot run in CI, on another developer's machine, or in a Vercel build. There is no incremental fix; the line must be replaced with a path resolved from `__dirname`. |
| **R2** | **Extraction of CSS, 7 JS modules and 10 HTML sections from `legacy-single-file.html` by regex, followed by 12 string patches** | The source of truth for the entire runtime is a 177 KB *generated* artifact that is reverse-engineered on every build. A regex whose anchor text drifts silently produces a broken site; a patch whose target string moves throws. This cannot be refactored incrementally because the extraction step is the defect. The files must be promoted to real source **once**, with byte-identical output proving nothing changed. |

Nothing else is marked REPLACE. The framework stays, the CSS stays, the diagrams
stay, the simulators stay, the content stays.

---

## 4. Cross-cutting concerns

### Security

| Concern | Assessment |
| --- | --- |
| Dependency vulnerabilities | **None possible** — zero dependencies |
| Exposed secrets | None found |
| External resources | One: Google Fonts, optional, with local fallbacks |
| `innerHTML` sinks | 15 across 5 modules. All currently render **author-controlled** content, so no live XSS. Becomes a real risk the moment content is user-supplied or fetched. |
| Inline event handlers | **60 `onclick` attributes.** These make a strict Content-Security-Policy impossible — `script-src` would need `'unsafe-inline'`, which defeats the policy. |
| CSP | None present |
| URL handling | No dynamic URL construction |
| Storage | None yet |

**Verdict:** no exploitable vulnerability today, because nothing untrusted enters
the page. The architecture is nonetheless not ready for user-supplied content.

### Performance

| Concern | Assessment |
| --- | --- |
| Page weight | Unit 1 is 75 KB — 9 inlined SVGs. Acceptable, no images, no fonts blocking |
| JS weight | 4.7 KB `code.js` + at most 11 KB per page. Trivial |
| Blocking scripts | Scripts are at end of body; Google Fonts is the only render-blocking request, and it is optional |
| Eager loading | `code.js` loads on every lesson page even where nothing interactive exists |
| Diagram duplication | Same SVG re-inlined per page — no shared sprite |
| Repeated DOM work | `renderCode` rebuilds the whole block per step. Fine at this size |

No urgent problem. The scaling principle to establish now: load interactive
modules only where used.

### Accessibility

| Present | Missing / unverified |
| --- | --- |
| Skip-to-content link | Colour contrast never measured |
| `aria-expanded` / `aria-controls` on hamburger | Screen-reader behaviour never tested |
| Escape-to-close, focus-visible states | Quiz answers are `<button>` but give no ARIA feedback on correctness |
| Semantic `main`, `nav`, `header`, `figure`/`figcaption` | Simulator console updates are not announced (no live region) |
| `lang="en"` on `<html>` | **Nepali text is not marked `lang="ne"`** — screen readers will read Devanagari with an English voice |

### Scalability

| Dimension | Ceiling today |
| --- | --- |
| Pages | Fine — generation scales |
| Subjects | **Blocked** — requires editing `build.js` data by hand with no validation |
| Simulations | **Blocked** — each new one is a bespoke system |
| Questions | **Blocked** — single flat array, no subject tagging |
| Contributors | **Blocked** — build runs only on one machine at one path |
| Progress/accounts | Not started; abstraction must land before UI code assumes storage |

---

## 5. Technical debt register

| ID | Debt | Severity | Addressed in Phase 1 |
| --- | --- | --- | --- |
| D1 | Hard-coded absolute build output path | **Critical** | Yes |
| D2 | Runtime sourced from legacy artifact via regex + patches | **Critical** | Yes |
| D3 | No content schema or validation | High | Yes |
| D4 | No automated tests | High | Yes |
| D5 | No `package.json` / scripts | High | Yes |
| D6 | Quiz not bank-driven, untagged | High | Yes |
| D7 | No simulation lifecycle contract | Medium | Yes |
| D8 | 60 inline handlers block CSP | Medium | Yes |
| D9 | Nepali not marked `lang="ne"` | Medium | Yes |
| D10 | No progress abstraction | Medium | Yes |
| D11 | Eager JS loading | Low | Partially |
| D12 | Diagram SVG duplicated per page | Low | No — documented |
| D13 | Trace/tables/quiz pages shallower than units 1–6 | Low (content) | No — content work, not architecture |
| D14 | No accessibility audit | Medium | Documented, not fixed |

---

## 6. Conclusion

The foundation is better than its file layout suggests. The *ideas* are right —
generated pages, a diagram registry that fails loudly, centralised tokens, a
structural bilingual component, a shared step player. What is wrong is that those
ideas are buried in two oversized scripts that reverse-engineer a legacy artifact
at build time, with no schema, no tests, and a build that runs on exactly one
computer.

Phase 1 therefore does **no rewrite**. It promotes what already exists into
explicit, validated, testable boundaries, and fixes the two defects that genuinely
require replacement.
