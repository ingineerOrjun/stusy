# RGSC Study Board — build pipeline

The published site lives in the folder **above** this one. This folder holds the
source it is generated from, so the site can be rebuilt and extended.

## Rebuild

```bash
node build2.js      # regenerates every page into the site root
node check-links.js # verifies all internal links resolve
```

`build2.js` requires `build.js`, which does the extraction and holds the site map.

## What each file does

| File | Purpose |
| --- | --- |
| `build.js` | Site map (grades, subjects), syllabus outlines for the not-yet-written subjects, and extraction of CSS/JS/sections from `legacy-single-file.html`. Exports everything `build2.js` needs. |
| `build2.js` | Page writer. Holds the design system CSS, the nav/hamburger markup, the page shell, and the loop that writes all 20 HTML pages. |
| `diagrams.js` | The SVG diagram library — 22 hand-authored, theme-aware diagrams. Content refers to them as `{{dia:name}}`. |
| `enhance.js` | Runtime helper shipped inside `assets/js/code.js`. Turns `<pre class="cpp">` into numbered, syntax-highlighted blocks and wires up the "show the answer" toggles. |
| `content/uN.html` | The deep-authored lesson content for Grade 10 DS & OOP, one file per unit. |
| `legacy-single-file.html` | The original single-file build. Still the source for the trace / tables / quiz sections and for the shared CSS+JS. |
| `check-links.js` | Verifies every internal href/src resolves, and that every page carries the nav chrome. |

## Adding content

**A new diagram:** add it to `diagrams.js` as `D.myDiagram = \`<svg …>\``, using the
shared classes (`f-box`, `f-lbl`, `f-arr`, …) so it themes correctly. Reference it
from any content file as `{{dia:myDiagram}}`. The build fails loudly if a
placeholder has no matching diagram.

**Deepening a unit:** create `content/<id>.html` containing a single `<section>`.
The build picks it up automatically and stops falling back to the legacy extract.
Use the existing components: `.outcomes`, `.pair` + `.en`/`.np`, `figure.fig`,
`.wex` (worked example), `.mistake`, `.examq`, `.keypoints`.

**A new subject:** add its units to `OUTLINE` in `build.js` — the outline page is
generated from that data. To give it full notes, follow the `content/uN.html`
pattern and add the pages to `CPP_PAGES`-style config.

## Conventions that matter

- **Bilingual, always both visible.** English in a solid-bordered `.en` panel,
  Nepali in a dashed `.np` chalk box. Never a toggle.
- **English wording is exam wording.** The Nepali explains it; it does not replace it.
- **Offline first.** No fetch, no ES modules, no root-relative paths, no external
  assets except optional Google Fonts. The site must work from `file://`.
- **SVG presentation attributes lose to CSS classes.** When overriding a stroke on
  an element that carries a class, use `style="stroke:…"`, not `stroke="…"`.
- Arrow markers use `orient="auto"` — `auto-start-end` is not supported everywhere.
