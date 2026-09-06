# Content Architecture

The content model is the most important contract in the product. Everything else
— pages, navigation, quizzes, progress — is derived from it.

---

## 1. The hierarchy

```
Grade            grade9 · grade10 · grade11 · grade12
  └── Subject    grade10/oop-cpp
        └── Unit         u1 … u6           (a syllabus unit)
              └── Lesson  one page          (currently 1:1 with a unit)
                    ├── Concept    .pair — English panel + Nepali box
                    ├── Example    .wex — worked example
                    ├── Diagram    figure.fig ← {{dia:name}}
                    ├── Simulation registered with SimulationService
                    ├── Practice   .examq + hidden model answer
                    └── Assessment question bank, tagged by unit
```

Lesson is deliberately 1:1 with Unit today. The identifiers are separate so a
unit can later hold several lessons without renaming anything.

## 2. Where each level lives

| Level | Representation | File |
| --- | --- | --- |
| Grade | Object in the site map | `config/site.js` |
| Subject | Object under a grade | `config/site.js` |
| Unit (outline) | Object with hours + topics | `content/syllabus.js` |
| Unit (authored) | Page entry | `config/pages.js` |
| Lesson body | HTML fragment, one `<section>` | `content/lessons/<id>.html` |
| Shared section | HTML fragment | `content/sections/<id>.html` |
| Diagram | Named SVG string | `diagrams.js` |
| Question | Tagged object | `content/questions/<subject>.js` |

### Why HTML for lesson bodies, not JSON or Markdown

Considered and rejected — see [PHASE-1-DECISIONS.md](PHASE-1-DECISIONS.md#adr-004).
The teaching components (`.pair`, `.wex`, `.examq`, `figure.fig`) are structural,
not prose. Markdown cannot express a two-column bilingual panel without so many
custom directives that it becomes worse HTML. A JSON tree would need a renderer
for every component and make diffs unreadable. HTML fragments with a fixed
component vocabulary keep authoring direct and reviewable, and the vocabulary is
enforced by tests rather than by a schema language.

## 3. Schemas

### Grade

```js
{
  id:      'grade10',           // must match /^grade(9|10|11|12)$/
  label:   'Grade 10',          // English — required
  np:      'कक्षा १०',           // Nepali  — required
  status:  'open' | 'soon',     // 'soon' grades render disabled
  subjects: [ Subject, … ]      // required and non-empty when status is 'open'
}
```

### Subject

```js
{
  slug:  'oop-cpp',                                  // kebab-case, unique in grade
  name:  'Data Structure & OOP Concept using C++',   // full title, English
  short: 'DS & OOP with C++',                        // navigation label
  np:    'डाटा स्ट्रक्चर र OOP (C++)',                 // Nepali — required
  done:  true                                        // optional: has authored notes
}
```

The addressable key is **`<gradeId>/<slug>`** — for example `grade10/oop-cpp`.
That key joins the site map, the syllabus, and the question banks.

### Unit (syllabus outline)

```js
{
  t:  'Basic Introduction to Data Structure',   // English title
  np: 'डाटा स्ट्रक्चरको आधारभूत परिचय',            // Nepali title
  h:  20,                                        // prescribed hours
  c:  ['Introduction to Data Structures.', … ]   // topics, non-empty
}
```

**Invariant:** a subject's hours must total exactly **64**, the figure the CDC
curriculum prescribes. The build fails otherwise. This has already proved its
worth — it is a cheap check that catches a mistranscribed syllabus.

### Page (authored unit)

Page maps are keyed by subject id — `pages['grade10/digital-design']` — with a
`hero` section and an ordered `pages` array.

```js
{
  file:  'unit1.html',
  n:     '1',                                   // badge shown in navigation
  title: 'Basic Introduction to Data Structure',
  np:    'डाटा स्ट्रक्चरको आधारभूत परिचय',
  hrs:   20, marks: 15,                         // optional, shown as metadata
  sec:   ['u1'],                                // content section ids
  js:    ['services/simulation.js','sim-stackqueue.js']
}
```

Every id in `sec` must resolve through `ctx.section()`; every module in `js`
must be one the build publishes. Both are validated.

### Question

Full schema in [ASSESSMENT-ARCHITECTURE.md](ASSESSMENT-ARCHITECTURE.md).

## 4. Resolution order

```
ctx.section(id)
   ├─ content/lessons/<id>.html    → { html, authored: true }   ← wins
   ├─ content/sections/<id>.html   → { html, authored: false }
   └─ neither                      → throws, naming both paths it tried
```

This is what makes deepening a page a matter of **adding a file**. Drop
`content/lessons/trace.html` next to the existing shared section and the build
starts using it, with no configuration change.

## 5. Validation

`build/validate.js` runs before any page is written and reports **every**
violation at once. Enforced today:

- grade ids match the expected pattern; no duplicates
- every grade, subject, unit and page has **both** languages
- subject slugs are kebab-case and unique within their grade
- an open grade has at least one subject
- syllabus keys map to a real subject (no orphans)
- syllabus hours total exactly 64 per subject
- unit titles are unique within a subject; every unit has topics
- page filenames are safe; no duplicates
- every referenced content section resolves
- every referenced runtime module is actually published
- every `{{dia:}}` reference resolves — unknown names fail the build
- every runtime module is non-empty

Warnings (do not fail the build): a diagram defined but never used; a subject
with neither authored pages nor an outline.

## 6. Adding a subject

Worked example — Grade 11 Programming in Java:

1. **`config/site.js`** — add to the `grade11` grade:
   ```js
   { slug: 'java', name: 'Programming in Java', short: 'Java', np: 'जाभा प्रोग्रामिङ' }
   ```
   Set the grade's `status` to `'open'`. Navigation updates on every page.

2. **`content/syllabus.js`** — add `'grade11/java'` with its units. Hours must
   total 64 or the build stops.

3. `npm run build && npm test`. The outline page exists and is linked.

4. **For full notes:** add `content/lessons/java-u1.html`, register a page in
   `config/pages.js`, and add questions to `content/questions/grade11-java.js`.

No existing subject, page or stylesheet is touched at any step.

## 7. Known limitations

| Limitation | Consequence | When it must be fixed |
| --- | --- | --- |
| Lesson bodies are HTML, not structured data | Cannot re-render as an app or PDF without parsing | If a native app or generated PDF is needed |
| ~~`config/pages.js` is specific to `grade10/oop-cpp`~~ | **Fixed in Phase 3.** The page map is keyed by subject id and the build iterates it, so a third authored subject is a config entry plus lesson files | — |
| Nepali lives inline in HTML, not in a message catalogue | A third *simultaneous* language means re-authoring; a third *switchable* one needs only content | See [LANGUAGE-SYSTEM.md](LANGUAGE-SYSTEM.md) |
| No content versioning | Cannot show "updated since you last revised" | When progress tracking ships |
