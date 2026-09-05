# Phase 1 — Architectural Decision Records

Each record states the decision, why it was taken, what was rejected, and what it
costs. Decisions that were *not* taken are recorded too — several matter more
than the ones that were.

---

## ADR-001 — Keep the existing build system; restructure rather than replace

**Context.** Two scripts (370 + 705 lines) with eight mixed responsibilities
produced the whole site. They worked and were deterministic.

**Options.** (a) Keep as-is. (b) Restructure into layers. (c) Replace with a
static-site generator — Eleventy, Astro, Hugo.

**Decision.** (b).

**Reason.** The generator's *ideas* were sound: pages from a site map, a diagram
registry that fails loudly, centralised tokens. What was wrong was file
organisation. A third-party generator would import a dependency tree, a template
language and a plugin API to do what 700 lines of dependency-free Node already
did — while forcing every lesson to be rewritten into its content model.

**Trade-offs.** No ecosystem: no incremental builds, no plugins, no community
help. Accepted — the full build takes under a second, and will stay fast at 60+
pages because it is string assembly.

**Future.** If build time exceeds a few seconds, add caching before considering a
framework.

---

## ADR-002 — No frontend framework

**Context.** React/Next/Astro were explicitly on the table.

**Decision.** Stay with generated HTML and small vanilla modules.

**Reason.** The product's binding constraints are: works offline opened from a
file, loads on a low-end Android on a slow Nepali connection, no login, and
lasts for years without maintenance. A static site satisfies all four with zero
dependencies. The site is ~95% reading; hydration would add cost and no benefit.
A framework would also break `file://` use, which is how many students will
actually receive this.

**Trade-offs.** No component model, no reactive state. Mitigated by generated
chrome (no duplication) and a documented component vocabulary.

**Revisit when.** Genuinely app-like surfaces arrive — a teacher dashboard, an
authoring tool, a live class. Those could be a separate application against the
same content contract; the student-facing site should stay static.

---

## ADR-003 — Promote the runtime out of `legacy-single-file.html`

**Context.** The CSS, all seven runtime modules and ten HTML sections were
extracted from a 177 KB generated artifact by regular expression on every build,
then modified by twelve string patches.

**Options.** (a) Keep. (b) Improve the regexes. (c) Extract once into real source
files and delete the extraction step.

**Decision.** (c) — one of only two things marked REPLACE in the audit.

**Reason.** The source of truth for the entire runtime was a *generated file
being reverse-engineered*. A drifting anchor string silently produces a broken
site; a moved patch target throws. This cannot be fixed incrementally because the
extraction **is** the defect.

**How the risk was contained.** The migration used the existing extraction to
produce the files, then asserted the parts reassemble byte-for-byte. Afterwards
the full site was rebuilt and every file hashed against a pre-refactor baseline:
**all 29 files byte-identical.** The four runtime modules untouched by later work
are still byte-identical today, which is the standing proof.

**Trade-offs.** `archive/legacy-single-file.html` is kept for provenance but is no
longer an input. Slight duplication; worth it for history.

---

## ADR-004 — Lesson content stays HTML fragments

**Options.** (a) HTML fragments. (b) Markdown + directives. (c) A JSON/AST tree.

**Decision.** (a).

**Reason.** The teaching components are *structural*, not prose: a two-column
bilingual panel, a worked example with labelled steps, an exam question with a
hidden model answer, a captioned diagram. Markdown expresses none of these
without so many custom directives that it becomes worse HTML. A JSON tree needs a
renderer per component and makes review diffs unreadable — and content review by
a teacher is the quality bar that matters most.

**Trade-offs.** Content is not machine-structured, so re-rendering as a PDF or a
native app would need parsing. Authors must know a component vocabulary; it is
documented in [UI-ARCHITECTURE.md](UI-ARCHITECTURE.md) and enforced by tests.

**Mitigation.** Metadata *is* structured. Only lesson prose is HTML.

---

## ADR-005 — Registry, not base class, for simulations

**Options.** (a) Leave bespoke. (b) A `Simulation` base class. (c) A registry of
descriptors.

**Decision.** (c).

**Reason.** The reusable execution core already existed — `runSteps()` is shared
by both simulations. What was missing was identity, metadata, discovery and
lifecycle. A base class would require rewriting both working simulations for no
behavioural gain. Registration is purely additive: each module kept its internals
and gained ~20 lines declaring itself.

**Trade-offs.** No enforced lifecycle, so a simulation can still misbehave
internally. `mounts()` and `reset()` are validated at registration, which covers
the failure that actually matters — a simulation running on a page without its
markup.

---

## ADR-006 — `localStorage` behind `ProgressService`, introduced before it is needed

**Context.** No progress feature exists yet.

**Decision.** Build the service now, with a swappable adapter, before any page
stores anything.

**Reason.** Scattered `localStorage` calls are one of the hardest things to
retrofit, because every call site encodes an assumption about where data lives.
Introducing the boundary while there are **zero** call sites costs nothing. A
future backend becomes a new adapter with three methods.

**Trade-offs.** A service nothing calls yet. Accepted deliberately — and it is
not speculative scaffolding: it is fully implemented and has 18 tests covering
every failure mode.

**Note.** It is published as an asset but not yet loaded by any page, because no
progress UI exists. That is stated plainly rather than wired up for appearance.

---

## ADR-007 — Node's built-in test runner

**Options.** Jest, Vitest, `node:test`, or keep manual checking.

**Decision.** `node:test` + `node:assert`, with a hand-written DOM stub.

**Reason.** Preserves zero dependencies — the single best security property the
project has (see [SECURITY.md](SECURITY.md#2-dependency-risk--structurally-eliminated)).
Jest or Vitest would each pull in hundreds of transitive packages to run 73
tests that need only assertions and a module loader.

**Why a stub instead of jsdom.** jsdom is a large dependency for what these tests
need. The stub is ~130 lines and deliberately minimal: a module that needs
something it does not provide fails loudly rather than passing silently.

**Trade-offs.** The stub is not a browser — no layout, no real events. Mitigated
by keeping browser verification in the loop for visual and CSP checks.

**Learned.** Modules must load in a real `vm` context, not `new Function`: the
runtime assigns globals as `window.X = …`, and only a genuine global object makes
those reachable as a bare `X`, exactly as on a page. Values crossing the vm
boundary also need structural, not reference, comparison.

---

## ADR-008 — Fix the build output path

`const OUT = 'C:/Users/Acer/Desktop/rgsc-study'` meant the build ran on exactly
one machine at one path — no CI, no second developer, no hosted build. Replaced
with a path derived from `__dirname`. Asserted by a test that also proves the
resolved root is the repository.

The second of the two REPLACE items, and unambiguous: there was no incremental
version of this fix.

---

## ADR-009 — CSP now, inline handlers later

**Context.** 60 inline `onclick` attributes prevent a strict CSP.

**Decision.** Ship a restrictive CSP that tolerates `'unsafe-inline'` for scripts
now; remove the handlers in Phase 2.

**Reason.** Even with `'unsafe-inline'`, `connect-src 'none'` means injected
script **cannot exfiltrate anything**, and `base-uri`/`form-action`/`object-src`
close further vectors. That is most of the practical value, available today at
zero regression risk. Removing 60 handlers touches every simulator and several
content files — real risk, against Rule 1, for the remaining increment.

**Trade-offs.** The CSP is not as strong as it reads. Stated explicitly in
[SECURITY.md](SECURITY.md#5-the-inline-handler-problem) rather than left to look
stronger than it is.

---

## ADR-010 — Accessibility measured, not fixed

**Decision.** Fix `lang="ne"`; measure contrast; document the rest.

**Reason.** `lang` was a genuine defect with a central, zero-risk fix in the
build. The two contrast failures are **design changes** to tokens used on every
page, and the brief directs Phase 1 not to redesign. Both are documented with the
exact replacement values, so Phase 2 is a one-line edit each.

**Not done.** No screen-reader testing. Therefore **WCAG 2.1 AA is not claimed** —
see [ACCESSIBILITY.md](ACCESSIBILITY.md).

---

## ADR-011 — Bilingual field naming left inconsistent

Two conventions coexist: `np` sibling keys in older data, `{en, ne}` objects in
newer code. Normalising would rewrite 284 syllabus topics and every site-map
entry for no behavioural gain — against Rule 2.

New content uses `{en, ne}`. Both forms are validated. Recorded as debt rather
than churned. Note that `ne` is the correct ISO code and must be what appears in
`lang` attributes.

---

## Decisions deliberately NOT taken

| Not done | Why |
| --- | --- |
| Backend, database, or API | Nothing needs one. Boundaries are prepared instead |
| Authentication | No user concept; a fake one would be worse than none |
| Search | 20 pages is browsable. Revisit past ~40 |
| Progress UI | The service exists; the interface is a Phase 2 design question |
| Splitting `diagrams.js` | One 50 KB module is still readable; split when it hurts |
| Deduplicating inlined SVG across pages | Would add a fetch and break `file://` |
| Renaming `_source` to `src` | Cosmetic churn; the underscore usefully signals "not published" |
| Deepening `trace` / `tables` / `quiz` pages | Content work, not architecture |
| Extracting a domain-renderer layer for simulations | Speculative until two simulations need the same renderer |
