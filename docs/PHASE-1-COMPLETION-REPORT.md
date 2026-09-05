# Phase 1 — Completion Report

**Date:** 5 September 2026
**Objective:** turn a working 20-page site into a scalable platform foundation
without breaking anything.
**Outcome:** complete. 73 automated tests, zero known regressions.

---

## 1. Headline

| | Before | After |
| --- | --- | --- |
| Build source of truth | A 177 KB generated artifact, regex-extracted + 12 string patches | Real source files in layered folders |
| Build portability | Hard-coded to one machine at one path | Derived from `__dirname` — runs anywhere |
| Build files | 2 scripts, 1,075 lines, 8 mixed responsibilities | `context` / `validate` / `index`, one job each |
| Content validation | None | 14 rules; the build **fails** on a violation |
| Automated tests | 0 | **73**, zero dependencies |
| Service boundaries | None | Progress · Quiz · Simulation |
| Question storage | Flat array inside the engine | Tagged bank, per subject, engine-independent |
| Nepali for screen readers | Announced as English | `lang="ne"` on every passage, verified |
| Content-Security-Policy | None | Restrictive, on every page |
| Dependencies | 0 | **0** (deliberately preserved) |
| Pages | 20 | 20 |

## 2. What changed

### Two REPLACE items (the only ones the audit justified)

**Hard-coded output path.** `const OUT = 'C:/Users/Acer/Desktop/rgsc-study'`
meant the build ran on exactly one computer — no CI, no second developer, no
hosted build. Now derived from `__dirname`, with a test asserting it resolves to
the repository.

**Runtime extracted from a legacy artifact.** The CSS, all seven runtime modules
and ten HTML sections were reverse-engineered out of `legacy-single-file.html` by
regular expression on every build, then modified by twelve string patches. They
are now real source files. The artifact is archived and is no longer a build input.

*How this was proved safe:* the migration used the existing extraction to
generate the files, asserted the parts reassemble byte-for-byte, then rebuilt the
whole site and hashed every file against a pre-refactor baseline — **all 29 files
byte-identical**. Four runtime modules remain byte-identical to this day.

### IMPROVE items delivered

| Area | Change |
| --- | --- |
| Build | Split into `build/context.js` (inputs), `build/validate.js` (gate), `build/index.js` (templates + writing) |
| Content | Data lifted out of build code into `config/site.js`, `config/pages.js`, `content/syllabus.js`; lessons under `content/lessons/`, shared sections under `content/sections/` |
| Validation | 14 rules — bilingual completeness, unique slugs, resolvable sections and modules, 64-hour syllabus totals, diagram references. Reports **every** error at once, then refuses to write |
| Design | `design/tokens.css` (the contract), `base.css`, `site.css` — no longer inside a generated artifact or a template literal |
| Assessment | 15 questions extracted into a bank tagged by unit, topic, difficulty and type; `QuizService` owns selection, projection and scoring |
| Simulation | `SimulationService` registry — identity, metadata, `mounts()`, `reset()`; both existing simulations register without internal change |
| Progress | `ProgressService` with a swappable storage adapter, built **before** any page needs it |
| Accessibility | Every Nepali passage marked `lang="ne"` centrally in the build |
| Security | CSP on every page; security headers in `vercel.json` |
| Tooling | `package.json` with `build` / `test` / `check` / `serve`; `.gitignore` |

## 3. What did NOT change — deliberately

- **All 20 pages, and every word of teaching content.** No lesson was rewritten.
- **The visual design.** `assets/css/style.css` is byte-identical to before.
- **The technology.** No framework, no bundler, no backend, no dependencies.
- **Every simulation, the tracer, the quiz behaviour, all 22 diagrams.**
- **The generation model.** Pages from a site map was already right; it was kept.
- **`runSteps()`**, the shared simulation core — already reusable, left untouched.
- **Bilingual field naming**, still inconsistent (`np` vs `{en,ne}`). Normalising
  would rewrite 284 topics for no behavioural gain. Recorded as debt.
- **Inline `onclick` handlers.** Removing 60 of them touches every simulator;
  deferred with a concrete plan.

## 4. Output diff versus the pre-refactor baseline

Every generated file was hashed before and after. Nothing is unaccounted for.

| | Count | Files |
| --- | --- | --- |
| **Unchanged** | 6 | `style.css`, `code.js`, `nav.js`, `snippets.js`, `trace.js`, `README.md` |
| **Changed** | 23 | 20 pages (`lang="ne"` + CSP), `quiz.js` (bank extracted), `sim-stackqueue.js` / `sim-dispatch.js` (registration appended) |
| **Added** | 7 | 3 service modules, `question-bank.js`, `package.json`, `vercel.json`, `.gitignore` |
| **Removed** | **0** | — |

That `style.css`, `code.js`, `nav.js`, `snippets.js` and `trace.js` are still
byte-identical after being moved out of the legacy artifact is the strongest
single piece of evidence that the migration was lossless.

## 5. Test results — actually run

```
$ npm test
ℹ tests 73
ℹ pass 73
ℹ fail 0
ℹ duration_ms 3271
```

| Suite | Tests | Covers |
| --- | --- | --- |
| `build.test.js` | 8 | Build runs, validation gate fires, 20 pages, 9 assets, determinism, diagram counts, no legacy input, no hard-coded path |
| `links.test.js` | 10 | 704 links, casing (Linux), chrome on every page, no absolute/root-relative paths, offline safety, external origins, `lang="ne"` coverage, CSP |
| `content.test.js` | 14 | The contract — **including that it rejects** a missing Nepali field, a duplicate slug, wrong hour totals, an unknown diagram, a missing section |
| `runtime.test.js` | 23 | Tracer output (all 3 programs, exact), step bounds, rewind, quiz scoring and locking, stack LIFO, overflow/underflow, queue FIFO, dispatch resolution, bank tagging, `QuizService` filters, registry |
| `progress.test.js` | 18 | Persistence, subject progress, quiz history bounds, subscribers — and every failure mode |

**Suite stability.** The first assembled suite was flaky, failing about 1 run in
5: `build.test.js` rewrites the generated site while `links.test.js` and
`runtime.test.js` read it, and Node runs test files in parallel by default. The
suites share the generated site deliberately — testing what actually ships is the
point — so they now run with `--test-concurrency=1`. Verified stable over six
consecutive runs. A flaky suite is worse than no suite, so this is recorded
rather than left to be rediscovered.

### Failure modes explicitly tested

Storage absent · storage throws on write (private mode) · quota exceeded
mid-session · corrupted JSON · wrong-shape payload · future schema version ·
individually malformed entries · invalid ids · impossible scores · a throwing
subscriber. In every case the student keeps a working interface.

### Browser verification

Served over HTTP and driven programmatically.

| Check | Result |
| --- | --- |
| Console errors, all pages | **None** |
| Unit 1 | 9 diagrams painted, 0 unconverted code blocks, 4 exam questions, 172 `lang="ne"` |
| Unit 6 | 3 diagrams, dispatch → `I am a Circle`, registry reports `oop.dispatch` |
| Simulation registry | Unit 1 reports `ds.stack`, `ds.queue`; stack push → `top = 0 → value 10` |
| Tracer | All 3 programs produce their exact baseline output |
| Quiz | 15 questions, `15 / 15`, service + generated bank loaded in order |
| CSP | Present, **no violations** |
| Hamburger | Opens and closes |
| Home page | Visually identical to baseline |

## 6. Regression contract — every item met

| # | Baseline requirement | Result |
| --- | --- | --- |
| 1 | Build succeeds | ✅ |
| 2 | 20 pages generated | ✅ 20 |
| 3 | 704 links, 0 broken | ✅ |
| 4 | JS valid | ✅ 11/11 (was 7; 4 added) |
| 5 | Output identical or every difference justified | ✅ §4 |
| 6 | 3 tracer programs correct | ✅ exact match |
| 7 | Quiz scores 15/15 | ✅ |
| 8 | Simulators correct | ✅ |
| 9 | Zero console errors | ✅ |

**No known regression exists.**

## 7. Known issues and remaining debt

Nothing below is hidden. Each is either recorded with a plan or explicitly out of
Phase 1 scope.

| # | Issue | Severity | Plan |
| --- | --- | --- | --- |
| 1 | 60 inline `onclick` handlers force `script-src 'unsafe-inline'` | Medium | Concrete 4-step plan in [SECURITY.md](SECURITY.md#5-the-inline-handler-problem); the registry exists to enable it |
| 2 | `--chalk-faint` on `--panel` is 4.35:1, fails AA | Medium | One-line token change to `#819791`, queued for the Phase 2 design pass |
| 3 | `--line` borders 1.44:1, fail non-text contrast | Medium | `#5e7c73`; visible change, needs a design decision |
| 4 | Never tested with a screen reader | Medium | **WCAG AA is not claimed.** [ACCESSIBILITY.md](ACCESSIBILITY.md) lists 10 gaps |
| 5 | `ProgressService` is published but unused | Low | Intentional — no progress UI exists. Fully tested; wiring is a two-line change |
| 6 | Bilingual field naming inconsistent (`np` vs `{en,ne}`) | Low | Deliberate; new content uses `{en, ne}` |
| 7 | `config/pages.js` assumes one authored subject | Low | Key it by subject before the second one is authored |
| 8 | Question distribution does not match exam weights | Low (content) | u1 carries 15 marks but 4 questions; u2 has none. Now visible because the bank is tagged |
| 9 | `trace` / `tables` / `quiz` pages shallower than units 1–6 | Low (content) | Content work, not architecture |
| 10 | Diagram SVG duplicated across pages | Low | Deduplicating needs a fetch, which breaks `file://`. Accepted |
| 11 | Simulation output not announced to screen readers | Medium | `aria-live` on `.console` |
| 12 | C++ programs verified by inspection, not compiled | Low | Compile in CI |

## 8. Phase 2 readiness

| Capability | Ready | What is in place |
| --- | --- | --- |
| **Content expansion** | ✅ | Add a subject by editing two data files. Validation catches errors before a page is written. Adding Grade 11 Java touches no existing subject |
| **Simulation expansion** | ✅ | `runSteps()` covers most planned simulations; the registry gives identity and lifecycle. Gap: domain renderers (gates, K-map grids) — correctly deferred until two simulations need the same one |
| **Assessment expansion** | ✅ | Bank is tagged and per subject; `getQuiz()` already filters by unit, topic and difficulty. A per-unit quiz is one call argument |
| **Design-system refinement** | ✅ | Tokens are isolated in `design/tokens.css`; the two contrast fixes are one-line edits with values computed |
| **Progress + accounts** | ⚠️ Prepared | Service and adapter exist and are tested. Needs a UI and, for accounts, a backend |
| **Search** | ❌ Not started | Fine at 20 pages; needed past ~40 |
| **Backend / API** | ⚠️ Boundary defined | Adapter interface exists; [SECURITY.md §7](SECURITY.md#7-the-backend-boundary) sets the rules before any code is written |

### Recommended Phase 2 order

1. **Second subject — Digital Design & Microprocessor.** The real test of the
   content architecture, and the most diagram-dependent subject in the curriculum.
2. **Accessibility fixes 2, 3, 11** plus a screen-reader pass.
3. **Remove inline handlers**, then tighten the CSP.
4. **Progress UI**, wiring the service that already exists.
5. **Expand the question bank** to match exam weighting.

## 9. Honest assessment

**What genuinely improved.** The build no longer reverse-engineers a generated
artifact, and it runs on any machine. Broken content now fails loudly at build
time instead of reaching a student. There are 73 tests where there were none,
including tests that verify the validator *rejects* bad content — not just that
good content passes. Three real service boundaries exist, and the storage
boundary was introduced before a single page could bypass it.

**What a reviewer would fairly push back on.** `ProgressService` has no consumer
yet — defensible, and stated plainly, but it is code that no student benefits
from today. The inline-handler debt means the CSP reads stronger than it is; that
is documented rather than glossed. And the two contrast failures were measured
but not fixed, which is a judgement call about scope that someone could
reasonably have made differently.

**What did not happen, by design.** No rewrite. No framework migration. No
backend. No fake authentication, no placeholder APIs, no abstractions without a
job. The 20 pages a student sees are the same 20 pages, with better Nepali
accessibility and a security policy.
