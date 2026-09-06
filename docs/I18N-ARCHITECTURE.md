# Bilingual Architecture

Bilingualism is not a feature of this product — it is the product. The
architecture reflects that.

> **Superseded in part by Phase 3.** §1 and §7 recorded a decision that there
> would be no language switcher. There now is one, with three modes and
> bilingual as the default. The reasoning below is still why bilingual is the
> default; it is no longer why it is the only option.
> See **[LANGUAGE-SYSTEM.md](LANGUAGE-SYSTEM.md)**.

---

## 1. The pedagogical model comes first

The students sit an exam **written in English** while thinking **in Nepali**.
Ordinary localisation would harm them: a language switch lets a student read
everything in Nepali and then meet unfamiliar English terms in the exam hall.

So the rule is:

> **English and Nepali are always on screen together. There is no toggle.**

English carries the exact exam wording. Nepali explains it. The student learns
the mapping rather than choosing a side.

This makes the system **simultaneous bilingual presentation**, not
internationalisation. That distinction drives every decision below.

## 2. Two kinds of bilingual content

### Structured — metadata

Field pairs in data modules. Machine-readable, validated.

```js
{ label: 'Grade 10',  np: 'कक्षा १०' }
{ name:  'Website Design', short: 'Website Design', np: 'वेबसाइट डिजाइन' }
{ t: 'Concept of Logic Gates', np: 'लजिक गेटको अवधारणा' }
{ title: { en: 'Stack (LIFO)', ne: 'स्ट्याक (LIFO)' } }
{ explanation: { en: '…', ne: '…' } }
```

**Every one of these pairs is validated.** A missing Nepali field fails the
build, with a test proving it does.

### Presentational — lesson prose

Paired blocks in the lesson HTML. The pairing is structural, not stylistic:

```html
<div class="pair">
  <div class="en"><span class="tag">Definition</span>
    <p>A <b>data structure</b> is a particular way of organising…</p>
  </div>
  <div class="np"><span class="tag">परिभाषा</span>
    <p><b>डाटा स्ट्रक्चर</b> भनेको कम्प्युटरको मेमोरीमा…</p>
  </div>
</div>
```

`.en` is a solid-bordered panel; `.np` is a dashed chalk box. Different visual
treatment is deliberate — a student learns to find the Nepali box by shape.

For compact places (table cells, card footers, figure captions) the Nepali rides
inside the element as `.np-cell`.

## 3. Field-naming inconsistency — and why it stands

Two conventions coexist:

| Convention | Where | Example |
| --- | --- | --- |
| `np` sibling key | Site map, syllabus, page map | `{ label, np }` |
| `{en, ne}` object | Services, question bank | `{ en: '…', ne: '…' }` |

The `{en, ne}` form is correct and scales to a third language. The `np` form is
older and shorter.

**Decision: leave it.** Normalising would rewrite 284 syllabus topics and every
site-map entry for no behavioural gain, against Rule 2 (do not rewrite what
works). New content uses `{en, ne}`. The old form is confined to three data files
and is validated either way. Note the language code: `ne` is the ISO 639-1 code
for Nepali; `np` is a legacy shorthand and **must not** be used in `lang`
attributes.

## 4. Language declaration — fixed in Phase 1

Previously every page declared `lang="en"` and nothing else, so a screen reader
pronounced Devanagari with an English voice — making the Nepali half useless to
exactly the students it exists for.

Now the document stays `lang="en"` and every Nepali passage is marked inline.
Applied centrally at build time:

```js
const NEPALI_CONTAINERS = /\b(np|np-cell|np-line|lead-np)\b/;
const DEVANAGARI = /[ऀ-ॿ]/;
```

An element is marked `lang="ne"` when it is a known Nepali container **or** its
own text contains Devanagari. Because it runs in the build, every current and
future content file inherits it without the author remembering.

Result: **2,000+ marked passages across 20 pages, zero unmarked** — asserted by a
test that scans every page.

## 5. Typography

```css
--sans: "Noto Sans", "Segoe UI", Arial, sans-serif;
--deva: "Noto Sans Devanagari", "Noto Sans", "Mangal", "Segoe UI", sans-serif;
```

Devanagari has taller ascenders and the connecting *shirorekha*, so Nepali text
gets its own stack and slightly looser line height. `Mangal` is the Windows
system Devanagari font, which keeps Nepali legible when the web font fails —
the common case on a slow connection, and the reason the fallback matters.

## 6. Adding a third language

The architecture supports it; the pedagogy has to be decided first, because
three simultaneous panels will not fit a phone.

Structured content is straightforward — extend `{en, ne}` to `{en, ne, xx}` and
the validator's language check. Lesson prose is the real work: the `.pair`
component is two-column by construction. A third language needs either a
different component (tabs, or Nepali-primary with English inline) or a real
toggle for the third language only.

**This is a content and design decision, not a technical blocker.** Nothing in
the build assumes exactly two languages except the `.pair` layout itself.

## 7. What is deliberately not built

| Not built | Why |
| --- | --- |
| ~~Language switcher~~ | **Built in Phase 3.** Bilingual remains the default; the other two modes exist so a student is not made to read past the language they do not need. See [LANGUAGE-SYSTEM.md](LANGUAGE-SYSTEM.md) |
| Message catalogues / ICU | Content is prose, not interpolated UI strings |
| RTL support | No target language is right-to-left |
| Locale-formatted numbers/dates | Exam notation is used verbatim; localising it would teach the wrong form |
| Machine translation | Nepali is written by a teacher; the phrasing carries the teaching |

## 8. Known gaps

- **The Nepali has one author and no reviewer.** Highest-value fix in this area.
- Marking is element-level, so an English code term inside a Nepali sentence
  inherits `lang="ne"`. Minor; a screen reader still reads `push()` intelligibly.
- Nepali is embedded in lesson HTML, so it cannot be exported for translation
  review without parsing the pages.
