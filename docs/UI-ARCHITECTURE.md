# UI Architecture

How 20 pages share one interface, and where the boundary sits between markup
that is generated, authored, and styled.

---

## 1. Three sources of markup

| Source | Produced by | Examples |
| --- | --- | --- |
| **Page chrome** | `build/index.js` templates | Top bar, dropdowns, hamburger panel, breadcrumb, pager, footer |
| **Content components** | Authored in lesson HTML | `.pair`, `.wex`, `.examq`, `figure.fig`, `.keypoints` |
| **Runtime-built** | JavaScript at load time | Numbered code blocks, quiz questions, console lines, simulator boxes |

Chrome is generated because it must be identical everywhere; content is authored
because it is prose; runtime markup exists because it is interactive.

## 2. Chrome is generated, not repeated

Every page calls one `page(o)` function. Passing `{root, grade, title, crumb,
body, pager, js}` produces the complete document, with navigation links resolved
to the right relative depth (`''`, `'../'`, `'../../'`).

This is why adding a subject updates the navigation on all 20 pages with no page
edits — and why there is no drift between them. It is the single most valuable
structural property the project already had, and Phase 1 preserved it unchanged.

Chrome components: `.topbar` · `.brand` · `.desknav` + `.drop`/`.dropmenu` ·
`.hamburger` + `.mobilepanel` · `.crumb` · `.pagehead` · `.nav` chip bar ·
`.pager` · `footer`.

Only the hamburger needs JavaScript (`nav.js`, 946 bytes). Dropdowns are CSS
`:hover` / `:focus-within`, so they work with the keyboard and without JS.

## 3. The content component vocabulary

A fixed set of classes authors compose. This *is* the authoring API — the
constraint is what keeps 46 future units looking like one book.

| Component | Purpose | Rule |
| --- | --- | --- |
| `.pair` > `.en` + `.np` | The bilingual unit | Never one without the other |
| `.outcomes` | "By the end of this unit you can…" | Opens every unit |
| `figure.fig` + `figcaption` | Diagram with bilingual caption | Caption carries both languages |
| `.wex` (`-h`, `-n`, `-out`, `-note`) | Worked example, step by step | Shows working, not just the answer |
| `.mistake` | "Students always get this wrong" | Names the error explicitly |
| `.examq` + `.btn-ans` + `.ans` | Exam question with hidden model answer | Answer hidden until requested; revealed when printing |
| `.keypoints` | End-of-unit recap | Closes every unit |
| `pre.cpp` | C++ source | Converted to numbered, highlighted markup at load |
| `.tablewrap` > `table` | Comparison table | Scrolls inside itself; page never scrolls sideways |
| `.callout` | Analogy or aside | Sparingly |

### The authoring shorthand

Authors write plain, readable source:

```html
<pre class="cpp">
int main() {
    cout &lt;&lt; "Hello";
}
</pre>
```

`enhance.js` (bundled into `code.js`) converts it at load into numbered,
syntax-highlighted `.code` markup. Authors never hand-write line-number spans —
which is why 21 code blocks across six units are perfectly consistent.

## 4. Where components were deliberately *not* extracted

Per the brief: extract only where reuse gives real value.

| Not extracted | Why |
| --- | --- |
| Per-page card variants (`.gcard`, `.scard`, `.ucard`) | Three uses, three different shapes. A generic `Card` with a `variant` prop would be harder to read than three small classes. |
| Section headers | One template literal in the build; a component would add indirection for nothing. |
| Buttons | Styled by class. No behaviour to share. |
| Bilingual pair as a build helper | Authors need free-form prose inside; a helper would fight them. |

The test applied throughout: *does this remove duplication that actually exists,
or does it anticipate duplication that might?* Only the first justifies a
component.

## 5. Interaction patterns

| Pattern | Implementation |
| --- | --- |
| Show/hide model answer | `[data-answer]` → element id, delegated in `enhance.js` |
| Hamburger | `nav.js` — class toggle, `aria-expanded`, body scroll lock, Escape, resize-close |
| Simulator controls | Inline `onclick` → global function (see limitation below) |
| Step player | `runSteps()` in `core.js` — shared by every simulation |
| Quiz | `quiz.js` renders from `QuizService`, locks answered questions |

### The inline-handler limitation

60 controls use inline `onclick`. They work, and they keep the authored HTML
readable. But they force the Content-Security-Policy to allow
`script-src 'unsafe-inline'`, which weakens it substantially.

**Not changed in Phase 1** — it touches every simulator and content file, and the
brief prioritises stability over refactors without clear benefit. It is recorded
as debt with a concrete plan in [SECURITY.md](SECURITY.md#5-the-inline-handler-problem).

## 6. Responsive strategy

Mobile-first in effect: single-column is the natural state, and multi-column
grids are a progressive enhancement that collapse below their breakpoint.

| Breakpoint | Collapses |
| --- | --- |
| 940 px | Desktop nav → hamburger |
| 900 px | Hero grid |
| 820 px | `.pair`, simulator grids |
| 640 px | Pager |

Wide content (tables, code, diagrams) scrolls **inside its own container**. A
test asserts no page has a root-relative path or horizontal body overflow.

## 7. Print

A real stylesheet, not an afterthought: chrome hidden, black on white,
`break-inside: avoid` on every teaching component, and **hidden model answers
revealed** so a unit prints as a complete worksheet. Students in Nepal often
revise from printouts; this is a feature, not a nicety.

## 8. Known gaps

- Quiz option buttons are `<button>` but convey correctness only by colour and
  text — no `aria-live` or `aria-pressed`. See [ACCESSIBILITY.md](ACCESSIBILITY.md).
- Simulator consoles update without announcement; a screen-reader user gets no
  notification that output appeared.
- Colour contrast has never been measured.
- No component catalogue page. Worth adding once a second subject is authored,
  so the vocabulary is visible to new content authors.
