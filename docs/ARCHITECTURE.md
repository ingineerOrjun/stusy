# Architecture

The system that turns authored content into a bilingual, interactive,
offline-capable learning site — and the boundaries that let it grow from one
subject to sixteen without the code becoming unmaintainable.

---

## 1. Shape of the system

A **static site generator with no dependencies**. Content, design and runtime
behaviour are authored as source; a build assembles them into plain HTML, CSS
and JavaScript that a browser can open from a USB stick.

```
_source/                          SOURCE — the only thing humans edit
  config/      site map, page map
  content/     lessons, shared sections, syllabus, question banks
  design/      tokens.css, base.css, site.css
  diagrams.js  22 inline SVG diagrams
  runtime/     browser JavaScript
    services/  ProgressService, QuizService, SimulationService
  build/       context.js, validate.js, index.js
        │
        │  node _source/build/index.js
        ▼
/                                 OUTPUT — generated, never hand-edited
  index.html, grade9/**, grade10/**
  assets/css/style.css, assets/js/**
```

Rebuild with `npm run build`. Verify with `npm test`.

## 2. Layers and dependency direction

Dependencies point **downward only**. Nothing in a lower layer may import from a
higher one.

```
        ┌─────────────────────────────────────────┐
        │  Pages  (generated HTML)                │
        └───────────────┬─────────────────────────┘
                        │ loads
        ┌───────────────▼─────────────────────────┐
        │  UI runtime   core.js, nav.js, quiz.js, │
        │               sim-*.js, trace.js        │
        └───────────────┬─────────────────────────┘
                        │ calls
        ┌───────────────▼─────────────────────────┐
        │  Services     ProgressService           │
        │               QuizService               │
        │               SimulationService         │
        └───────────────┬─────────────────────────┘
                        │ uses
        ┌───────────────▼─────────────────────────┐
        │  Storage / Data adapters                │
        │  localStorage today · API later         │
        └─────────────────────────────────────────┘

  Build time:  config + content + design + diagrams
                        │ validated by build/validate.js
                        ▼
                  build/context.js  →  build/index.js  →  pages
```

### What may import what

| Layer | May use | Must never use |
| --- | --- | --- |
| `build/context.js` | `fs`, `config/`, `content/`, `design/` | Page templates, diagrams, the DOM |
| `build/validate.js` | The context it is handed | Anything it imports itself besides `fs`/`path` |
| `build/index.js` | context, diagrams, validate | `localStorage`, runtime internals |
| `runtime/*.js` (UI) | The DOM, services | `fs`, storage APIs **directly** |
| `runtime/services/*` | Storage adapters | The DOM, page structure, specific ids |
| `content/*` | Nothing — it is data | Any code |

The rule that matters most: **UI never touches storage directly.** A page asks
`ProgressService`; the service decides where the data lives. That single
indirection is what makes a future backend a change in one file.

## 3. Data flow

### Build time

```
config/site.js ─┐
content/*       ├─► validate.js ──► fails loudly, writes nothing
design/*        │        │
diagrams.js  ───┘        ▼
                    context.js ──► index.js ──► 20 pages + assets
```

Validation runs **before any page is written**, so a broken content contract
never produces a half-built site.

### Run time

```
student action
    │
    ▼
UI handler ──► Service ──► adapter ──► localStorage (today)
    │                                   API + DB (later, same call)
    ▼
DOM update + bilingual feedback
```

## 4. Extension points

The architecture is judged by how little must change to add something. Today:

| To add… | You change | You do not touch |
| --- | --- | --- |
| A subject's syllabus outline | `content/syllabus.js` + `config/site.js` | Any page, any other subject |
| A diagram | `diagrams.js`, reference `{{dia:name}}` | The build |
| A lesson's depth | Add `content/lessons/<id>.html` | The build — it is picked up automatically |
| Questions | `content/questions/<subject>.js` | The quiz engine |
| A simulation | A runtime module + `SimulationService.register()` | Existing simulations |
| A page | `config/pages.js` | Navigation — it regenerates |

Adding **Grade 11 Java** requires: one entry in `config/site.js`, one syllabus
entry, and lesson files. No existing subject is edited. That is the property
Phase 1 existed to establish.

## 5. Future boundaries

These are **prepared, not built**. Nothing fake has been added.

### Backend boundary

`ProgressService` already sits behind an adapter interface (`get` / `set` /
`clear`). Introducing a server means writing an `ApiAdapter` with those three
methods and selecting it. No page changes.

```
today   ProgressService ──► LocalAdapter  ──► localStorage
later   ProgressService ──► ApiAdapter    ──► POST /api/progress ──► database
```

### Database boundary

Content is currently JavaScript data modules with a validated contract. That
contract — grade → subject → unit → lesson, with bilingual fields — is the same
shape a `subjects` / `units` / `lessons` schema would take. Moving to a database
means changing what `context.js` reads, not what pages expect.

### Authentication boundary

There is no auth and no user concept. When one arrives, it belongs **beside**
`ProgressService`, not inside the UI: a service that owns identity, with progress
keyed by user id. The current `unitId`-keyed store becomes `(userId, unitId)`.

### Why not a framework

Evaluated and rejected for Phase 1 — see
[PHASE-1-DECISIONS.md](PHASE-1-DECISIONS.md#adr-002). Briefly: the product's
defining constraints are *works offline from a file*, *loads on a weak phone on
a Nepali mobile connection*, and *no login*. A static site satisfies all three
with zero dependencies and zero CVE surface. A framework would add build
complexity and hydration cost for a site that is 95% reading.

## 6. Testing architecture

```
tests/
  build.test.js      the build runs, produces 20 pages, deterministically
  links.test.js      704 links, chrome, offline safety, lang, CSP
  content.test.js    the content contract, including rejection cases
  runtime.test.js    tracer output, quiz scoring, simulators, registry
  progress.test.js   storage boundary, including every failure mode
  helpers/dom.js     a small DOM stub; modules load in a real vm context
```

73 tests, no dependencies, `npm test`.

The runtime tests load modules into a `vm` context rather than `new Function`,
because the runtime assigns globals as `window.X = …` and only a genuine global
object makes those reachable as a bare `X` — exactly as on a page. Quiz tests
load the **generated** `question-bank.js`, so what is tested is what ships.

## 7. Deployment

Static output at the repository root. No build step is required on the host —
`vercel.json` sets security and cache headers only. The generated site is
committed, so hosting is a file copy.

Offline is a hard constraint, enforced by tests: no `fetch`, no XHR, no ES
modules, no root-relative paths, and no external origin except the optional
font hosts.
