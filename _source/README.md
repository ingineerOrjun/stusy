# `_source` — everything the site is generated from

The published site lives in the folder **above** this one and is generated
output. Edit files here, never the HTML in the site root — a rebuild overwrites it.

```bash
npm run build     # regenerate all 28 pages + assets
npm test          # 73 tests: build, links, content, runtime, storage
npm run check     # both
npm run serve     # http://localhost:8080
```

## Layout

```
config/
  site.js         the curriculum tree — grades and subjects
  pages.js        page map for the one fully authored subject
content/
  lessons/        authored lesson bodies, one <section> per file
  sections/       shared page sections (hero, trace, tables, terms, quiz)
  syllabus.js     official CDC outlines for the 7 not-yet-authored subjects
  questions/      tagged question banks, one module per subject
design/
  tokens.css      the design contract every subject inherits
  base.css        component layer
  site.css        chrome — nav, cards, lesson components, print
diagrams.js       22 inline SVG diagrams, referenced as {{dia:name}}
runtime/          browser JavaScript, shipped verbatim to assets/js
  core.js           highlighter, step player, console, content enhancers
  nav.js            hamburger
  snippets.js       static code samples
  sim-*.js          simulations
  trace.js          program tracer
  quiz.js           quiz UI
  services/         ProgressService · QuizService · SimulationService
build/
  context.js      loads config, content, design and runtime; owns paths
  validate.js     the content contract — fails the build on a violation
  index.js        templates and the page-writing loop
archive/
  legacy-single-file.html   the original single-file build. NOT a build input;
                            kept only for provenance.
```

Dependency direction and layer rules: [`../docs/ARCHITECTURE.md`](../docs/ARCHITECTURE.md).

## Common tasks

**Add a diagram.** Define `D.myThing = \`<svg …>\`` in `diagrams.js` using the
shared classes (`f-box`, `f-lbl`, `f-arr`, …) so it themes correctly. Reference it
from any lesson as `{{dia:myThing}}`. An unknown name **fails the build**.

**Deepen a page.** Create `content/lessons/<id>.html` containing one `<section>`.
The build picks it up automatically and stops using the shared section. Use the
existing components: `.outcomes`, `.pair` + `.en`/`.np`, `figure.fig`, `.wex`,
`.mistake`, `.examq`, `.keypoints`, `pre.cpp`.

**Add a subject.** Add it to `config/site.js`, then add its units to
`content/syllabus.js` (hours must total 64). The outline page and all navigation
generate themselves. See
[`../docs/CONTENT-ARCHITECTURE.md`](../docs/CONTENT-ARCHITECTURE.md#6-adding-a-subject).

**Add questions.** Create `content/questions/<subject>.js` following the schema in
[`../docs/ASSESSMENT-ARCHITECTURE.md`](../docs/ASSESSMENT-ARCHITECTURE.md), then
register it in `build/context.js`. The engine needs no change.

**Add a simulation.** See
[`../docs/SIMULATION-ARCHITECTURE.md`](../docs/SIMULATION-ARCHITECTURE.md#4-building-a-new-simulation).

## Conventions that matter

- **Bilingual, always both visible.** English in a solid `.en` panel, Nepali in a
  dashed `.np` box. Never a toggle.
- **English wording is exam wording.** Nepali explains it; it does not replace it.
- **Offline first.** No fetch, no ES modules, no root-relative paths, no external
  assets except optional Google Fonts. Enforced by tests.
- **Nepali is marked `lang="ne"` automatically** by the build. Do not hand-add it.
- **SVG presentation attributes lose to CSS classes.** To override a stroke on a
  classed element use `style="stroke:…"`, not `stroke="…"`.
- Arrow markers use `orient="auto"`; `auto-start-end` is not supported everywhere.
- **Generated output is committed.** Run `npm run build` before committing so the
  site and its source never disagree.
