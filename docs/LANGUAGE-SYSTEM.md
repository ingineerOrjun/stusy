# Language System

Three modes over one DOM. Added in Phase 3, replacing the fixed
simultaneous-bilingual presentation described in
[I18N-ARCHITECTURE.md](I18N-ARCHITECTURE.md).

---

## 1. What changed, and why

Phase 1 recorded a firm decision:

> **English and Nepali are always on screen together. There is no toggle.**

That was right for the pedagogy and wrong for accessibility. A student who
reads English comfortably was made to scroll past a Nepali translation of every
paragraph; a student who does not was made to scan past English to find the
Nepali. Both were paying for the other's need on every screen.

Phase 3 keeps the pedagogy as the **default** and makes the other two readings
available:

| Mode | Value | What it shows |
| --- | --- | --- |
| **Bilingual** | `bi` | Both languages, side by side. **The default**, and what a student gets until they choose otherwise. |
| **Nepali-led** | `ne` | Nepali prose. English exam terminology is kept. |
| **English** | `en` | English only. |

The one line that has not changed: a student who never meets the words
"Multiplexer" or "truth table" in English will meet them for the first time in
the exam hall. So Nepali mode is **Nepali-led, not Nepali-only** — see §8.

## 2. One source of truth

Both languages are always in the DOM. A mode changes **what is shown**, never
what exists. There is no per-language page, no per-language build output, and
no fetching.

```
content (both languages, once)
        │
        ▼
   build/index.js  ── pairEnglish() adds the .t-en handle
        │
        ▼
   one HTML page, both languages present
        │
        ▼
   <html data-lang="bi|ne|en">   ← language.css decides visibility
```

Consequences that follow from this and are worth stating plainly:

- **Switching cannot lose learning state.** Nothing is re-rendered, so a
  half-finished trace, an answered prediction and a part-completed quiz all
  survive a switch. This is not careful bookkeeping — it is structural.
- **Search finds both languages** on the same page.
- **Printing** carries whichever mode the student chose.
- The page carries the weight of both languages even in single-language mode.
  Measured — see §12.

## 3. How English got a handle

Nepali always declares itself by class: `.np`, `.np-cell`, `.np-line`,
`.lead-np`. English did not — in 186 places across finished content it was
simply the element's own content sitting beside a Nepali gloss:

```html
<p class="wex-note">The user calls one simple function.
  <span class="np-cell">प्रयोगकर्ताले एउटै सजिलो फङ्सन बोलाउँछ।</span></p>
```

Nepali mode cannot hide that English without something to select. Three options
were considered:

| Option | Rejected because |
| --- | --- |
| Ask authors to wrap every English passage by hand | A rule nobody remembers, and it would have to be retrofitted to six finished units |
| Hide only `.pair > .en` panels, leave inline glosses | Would leave English visible in 186 of 221 places — bilingual mode wearing the wrong label |
| **Derive the handle at build time** | **Chosen** |

`_source/build/bilingual.js` walks the token stream and wraps each English run
that sits beside an inline Nepali gloss:

```html
<p class="wex-note"><span class="t-en">The user calls one simple function.</span>
  <span class="np-cell">प्रयोगकर्ताले एउटै सजिलो फङ्सन बोलाउँछ।</span></p>
```

**Safety property:** insertions are placed into the original token stream rather
than re-serialised from a parsed tree, so a page with nothing to wrap comes out
**byte-identical** to its input. That is asserted by a test, and it is what made
this safe to run over six finished units.

It deliberately does not touch:

- `<pre>`, `<code>`, `<script>`, `<style>`, `<svg>`, `<head>` — not prose
- direct children of a grid or flex container (`.pair`, `.simgrid`, the card
  grids) — a wrapper there would become the grid item and break the layout
- a run that is already an explicit English container (`.en`, `.en-line`,
  `.dia-cap-en`), which the CSS selects directly

### Two rules that were added after seeing it fail

The first version wrapped too much, and both failures were found by switching to
Nepali mode and looking — not by a test.

**1. A run is never wrapped if it contains Nepali at any depth.**
A "run" is everything between two Nepali siblings, which at the top of a lesson
is most of the page: the section heading, the objectives, several topics.
Wrapping that hid the Nepali nested inside it as well. The handle exists to hide
English, not both languages, so a run only counts as a gloss pair when it holds
no Nepali of its own. This is what keeps the transform to the local
"English sentence + its Nepali gloss" case it was built for.

**2. Structural and numeric elements break a run and are never wrapped.**
`h1`–`h6`, `.eyebrow`, `.badge`, `.hrs`, `.marks`, `.pill`, `.meta`, `.mk`,
`.status` and similar. The symptom was a lesson rendering in Nepali mode
**with no title** — the hero's `<h1>` sat before a Nepali lead paragraph and was
swallowed into the run. Unit badges and "12 hrs · 7 marks" read the same in any
language, and hiding them costs the student navigation for no gain.

411 handles are generated across 28 pages.

Both rules are asserted by tests, including a nesting-aware walk of every
built page that would catch a heading at any depth inside a wrapper. The
first version of that test was a regex and generated false positives; see
PHASE-3.1-AUDIT.md C1.

## 4. The layers

| Layer | Responsibility |
| --- | --- |
| `runtime/services/language.js` | the only thing that knows the mode or where it is stored |
| `design/language.css` | the only thing that decides what a mode shows |
| `build/bilingual.js` | derives the `.t-en` handle |
| `build/index.js` | emits the switcher and the pre-paint bootstrap |
| `runtime/nav.js` | the switcher's keyboard and click behaviour |

Nothing else reads or writes the mode. A component that needs to render a
bilingual string in JavaScript calls `LanguageService.pick({en, ne})`.

### No flash of the wrong mode

The mode must be on `<html>` before the first paint, or the page renders
bilingual and then visibly collapses. That means a small inline script in
`<head>` — it cannot wait for an external file:

```html
<script>(function(d){var m="bi";try{var v=localStorage.getItem("rgsc.lang.v1");
if(v==="ne"||v==="en"||v==="bi")m=v;}catch(e){}
d.documentElement.setAttribute("data-lang",m);})(document);</script>
```

The storage key and the valid modes are therefore written in two places. A test
asserts the two copies agree, because a silent divergence would strand every
student's saved preference.

### Why `!important` in `language.css`

That file answers one question — "is this passage shown in this mode?" — and its
answer has to beat every `display` declaration in the product, including deeper
selectors such as `.fig figcaption .np-cell` (0,2,1). Raising specificity to
out-rank each of them individually is a guessing game that breaks the next time
a component is styled. Visibility modes are the legitimate case, and it is
confined to that one file.

## 5. THE CONTENT LANGUAGE CONTRACT

This is the section a future author needs. Everything above explains how the
system works; this says what you must do.

The platform recognises **three kinds of text**, and they are handled
differently on purpose. Putting a string in the wrong category is the mistake
that breaks a language mode.

### A. Student-authored content — BOTH LANGUAGES REQUIRED

Lesson explanations, headings, objectives, worked examples, exam questions,
model answers, quiz prompts and options, feedback, summaries, key points,
figure captions, simulation goals and "why" panels.

**Rule: write both. English is the exam's wording; Nepali is the teaching.**

In lesson HTML, use the existing components — the build does the rest:

```html
<div class="pair">
  <div class="en"><span class="tag">Definition</span><p>English…</p></div>
  <div class="np"><span class="tag">परिभाषा</span><p>नेपाली…</p></div>
</div>

<p class="wex-note">English sentence.
  <span class="np-cell">नेपाली वाक्य।</span></p>
```

You do **not** wrap the English by hand. `build/bilingual.js` derives the
`.t-en` handle for you — that is the whole reason it exists.

In data (question banks, diagram steps, simulation captions):

```js
{ en: 'The complement of a product…', ne: 'गुणनफलको पूरक…' }
```

**Enforced by the build.** A question with no English prompt, no English
explanation, or **no Nepali explanation** fails. An explanation is prose, never
terminology, so it has no excuse for being monolingual.

### B. Technical terminology — ENGLISH, DELIBERATELY

`CPU`, `ALU`, `RAM`, `K-map`, `SQL`, `HTTP`, `compiler`, `Multiplexer`,
`Accumulator`, `NAND`, `truth table`, register names, opcodes, keywords,
Boolean expressions, hex values, bit patterns.

**Rule: leave them in English, inside the Nepali sentence.**

```
NAND भनेको AND पछि NOT हो।
```

Not `न्यान्ड भनेको एन्ड पछि नट हो।` — a student who only ever meets the invented
form cannot read the question paper.

Where a transliteration genuinely helps pronunciation, give it **once**
alongside the English, not instead of it: `AND (एन्ड)`.

**Deliberately not enforced.** A validator that demanded a Nepali equivalent
for "Multiplexer" would teach authors to invent one. This category is a
judgement, and the terminology table in
[DIGITAL-DESIGN-DECISIONS.md](DIGITAL-DESIGN-DECISIONS.md#5-terminology)
is the precedent to follow.

**One rule here is absolute:** numbers inside an expression, address or bit
pattern stay in Latin digits. `1011` must never render as `१०११` — a student
copying it into an answer would be wrong. Devanagari digits are fine in prose
(`चार बिट`).

### C. UI and system strings — ONE LABEL, FROM THE TABLE

`Next`, `Previous`, `Reset`, `Play`, `Show the answer`, `Try again`,
`Check this group`, `step 3 / 5`, and any accessible name a control needs.

**Rule: never write these as literals. Add a key to
`runtime/services/strings.js` and mark the control.**

```html
<button data-ui="next">Next ▸</button>
```

The literal text is the English fallback, so the control still reads correctly
if the module never loads. `UIStrings.apply()` rewrites the label on load and
on every language change.

If the string is composed with numbers — `step 3 / 5` — it cannot be a plain
key. Call `UIStrings.get('stepOf')` when rendering and re-render on
`languagechange`. That re-render must be **state-driven** (read the current
step, do not advance it), which is why the counter survives a switch.

**Enforced by the build.** A component that ships a `<button>` with an English
label and no `data-ui` fails, with the message telling you what to do. This
check is what makes the contract inherit rather than be remembered.

### D. Label pairs — TWO NAMES FOR ONE THING, SPLIT IN PLACE

A section label that names itself in both languages —
`Interactive experiment · अन्तरक्रियात्मक प्रयोग`,
`Key points to revise · दोहोर्‍याउनुपर्ने मुख्य कुरा` — is neither prose
(A) nor a control label from the table (C). It is authored content, so it
belongs in the content file; but both languages name the same thing, so
only one of them should survive a mode switch.

**Rule: nest the halves so the separator leaves with the Nepali.**

```html
<p class="sim-kicker">
  <span class="t-en">Interactive experiment</span>
  <span class="t-ne"><span class="t-en"> · </span>अन्तरक्रियात्मक प्रयोग</span>
</p>
```

| Mode | Renders |
| --- | --- |
| Bilingual | `Interactive experiment · अन्तरक्रियात्मक प्रयोग` |
| English | `Interactive experiment` |
| नेपाली | `अन्तरक्रियात्मक प्रयोग` |

The inner `.t-en` around the separator is the whole trick: without it,
Nepali mode opens with a stranded `·`.

**This is not the same as prose containing a term.**

> NAND र NOR — यी दुई universal गेट हुन्

That is rule B, and it must be left exactly as it is. The test is
whether the two sides *name the same thing*. If the Latin text is a term
inside a Nepali sentence, it stays. If it is a translation of the
Devanagari beside it, it splits.

**Where this applies to a component you write.** A simulation builds its
own markup, so the build's pairing pass never sees it — the pass rewrites
authored HTML only. Any English label your component emits beside a
`.np-cell` needs its own `.t-en` wrapper, or it will sit on screen in
Nepali mode.

**Enforced.** `tests/language.test.js` reconstructs the markup each
runtime module emits and fails on an English label that owns a Nepali
gloss with no handle. Terminology is exempt by class — `gl-title`,
`cpu-n`, `nl-name`, `gl-tt-cap` — so the exception is declared in the
markup rather than remembered.

**And the build yields to you.** If you split a label by hand inside a
heading, the pairing pass leaves the whole run alone. An explicit handle
anywhere in a run means the run is already resolved. (Before that rule
existed, the pass wrapped the section number too, and
`1.5.1 (a)  Array — एरे` rendered in Nepali as `एरे`.)

## 6. Fallback policy

Explicit, because a silent fallback is indistinguishable from a bug.

```
Bilingual (default)
    EN + NE where both exist
    EN alone where the pair has no Nepali
    NE alone where the pair has no English

नेपाली
    NE
    → falls back to EN when the item has no Nepali
    Technical terminology stays EN by design, not by fallback

English
    EN
    → falls back to NE only if the item has no English at all
      (which the build refuses for questions, so it should never happen)
```

Rules that follow from this:

1. **Nothing is ever blank.** If a mode has nothing to show, the other
   language is shown rather than hiding the element. The first quiz
   implementation got this wrong — tagging the English half as hideable when
   there was no Nepali half blanked the question. A test now guards it.
2. **A fallback is visible, not silent.** English appearing in Nepali mode
   is a content gap the reader can see and report. It is never patched with a
   machine translation.
3. **Identical halves collapse.** `{ en: '1011', ne: '1011' }` renders once.
   Two identical strings are a value, not a translation, and printing both is
   the clutter bilingual mode exists to avoid.
4. **An empty string is not a translation.** `ne: ''` is treated as absent.
   The build rejects an empty *English* field outright, because that is the
   fallback of last resort.
5. **Never invent a translation to satisfy a validator.** If a term should
   stay English, leave it English and record it in the terminology table.

## 7. Where bilingual mode shows only one language

One deliberate exception to simultaneous presentation: **control labels**.

`Next  अर्को` on a 60px button is clutter, and avoiding clutter is what makes
the bilingual mode usable. So a control shows one label — English in bilingual
and English modes, Nepali in Nepali mode.

Content is never treated this way. A lesson paragraph, a question, an
explanation and a caption all show both languages in bilingual mode.

## 8. Nepali-led, not Nepali-only

In Nepali mode the following stay in English **on purpose**:

- gate names, `Multiplexer`, `Accumulator`, `truth table`, `flip-flop`
- Boolean expressions, opcodes, register names, hex values
- anything the SEE paper prints in English

Nepali prose carries the explanation; the English term rides inside it:

> NAND भनेको AND पछि NOT हो।

This is the same principle as the bilingual mode, compressed. A student in
Nepali mode is still being taught the exam vocabulary — they are simply not
being made to read the English explanation of it.

**This is a product decision, not a translation gap.** Terminology decisions are
recorded in [DIGITAL-DESIGN-DECISIONS.md](DIGITAL-DESIGN-DECISIONS.md#5-terminology).

## 9. The switcher

A segmented control in the top bar, present on all 28 pages.

- **`role="radiogroup"` with three `role="radio"` options** — three modes are one
  mutually exclusive choice. Three separate tab stops for one choice is the
  usual mistake, and it makes the header tedious to pass through by keyboard.
- **Roving tabindex**: only the selected option is in the tab order; arrow keys,
  Home and End move between them.
- **The active state is driven from the `<html>` attribute**, not from a class
  the runtime adds, so it is correct on the very first paint before any script
  has run.
- **No flags.** A language is not a country, and Nepali is spoken outside Nepal.
- **Labels** `नेपाली · Bilingual · English` on wide screens; `ने · दुवै · EN`
  below 640px, where the full labels would not fit beside the brand and the
  hamburger.
- 44px minimum height on touch devices.

Measured at every required breakpoint, all showing zero horizontal page
overflow:

| Viewport | Switcher width | Labels | Control height |
| --- | --- | --- | --- |
| 320px | 99px | short | 44px |
| 375px | 99px | short | 44px |
| 430px | 111px | short | 44px |
| 768px | 212px | full | 44px |
| 1024px | 212px | full | — |
| 1440px | 212px | full | — |

## 10. Coverage

| Surface | Bilingual | Nepali | English |
| --- | --- | --- | --- |
| Lesson prose (`.pair`) | ✅ | ✅ | ✅ |
| Inline glosses (`.np-cell`) | ✅ | ✅ | ✅ |
| Headings with a Nepali sub-line (`.sec-sub`) | ✅ | ✅ | ✅ |
| Figure captions | ✅ | ✅ | ✅ |
| Animated diagram captions | ✅ | ✅ | ✅ |
| Simulation goals, controls and explanations | ✅ | ✅ | ✅ |
| Prediction prompts and feedback | ✅ | ✅ | ✅ |
| Quiz prompts, options, explanations, verdicts | ✅ | ✅¹ | ✅ |
| Exam questions and model answers | ✅ | ✅ | ✅ |
| Key points | ✅ | ✅ | ✅ |
| Simulator console output | ✅ | ✅ | ✅ |
| Program tracer captions | ✅ | ✅ | ✅ |
| Navigation, breadcrumbs, footer | ✅ | ✅ | ✅ |

¹ The Digital Design bank is fully bilingual — asserted by a test. The older
`grade10/oop-cpp` bank has English-only prompts and options; those fall back to
English in Nepali mode rather than blanking. See §9.

### The fallback rule

A pair with no Nepali half renders its English **without** the `.t-en` handle,
so the mode cannot hide it. An untranslated question shows in English in every
mode — visibly a content gap, rather than a broken quiz. This is enforced in
`runtime/quiz.js` and asserted by a test, because the first implementation did
blank the question.

## 11. What the build enforces

Added in Phase 3.1. Every rule below was proved by breaking the thing it
guards and confirming the build refused — a check that cannot fail is worse
than no check.

| Rule | Message |
| --- | --- |
| A question has an English prompt | `"<id>" has no English prompt` |
| A question has an English explanation | `"<id>" has no English explanation` |
| A question has a **Nepali** explanation | `"<id>" has no Nepali explanation — an explanation is prose, not terminology` |
| Every option has English text | `"<id>" option N has no English text` |
| No unknown language key | `"<id>".prompt has unknown language key "fr"` |
| No empty English field | `"<id>".prompt.en is empty` |
| No duplicate question id | `duplicate question id "<id>"` |
| The three modes exist in the service | `mode "ne" is missing` |
| The pre-paint bootstrap accepts all three | `the bootstrap does not accept mode "ne"` |
| The bootstrap and the service agree on the storage key | `every saved preference would be orphaned` |
| Every UI string has both languages | `UI string "reset" has no Nepali` |
| **No component ships a hard-coded control label** | `a control is labelled "Start over" with no data-ui key` |
| Headings stay protected from the pairing transform | `"h1" is not in NEVER_WRAP_TAG` |
| The pairing transform keeps its locality rule | `the locality rule is missing` |
| **A runtime label with a Nepali twin can hide its English half** | `these runtime labels show English and Nepali at once in Nepali mode` |
| **The pairing transform yields to an author's own split** | the run comes back byte-identical |

What is deliberately **not** enforced:

- that every English word has a Nepali equivalent — §5B
- that option text is bilingual — an option is often a keyword or a number
- prose length, tone or reading level — those are review, not validation

## 12. Cost

Measured, not estimated.

| | Value |
| --- | --- |
| `services/language.js` | 6.6 KB unminified |
| `services/strings.js` | 5.4 KB unminified |
| Language rules in `style.css` | 8.1 KB unminified |
| Switcher markup per page | 706 bytes |
| Inline bootstrap per page | 194 bytes |
| `.t-en` handles across the site | 513 across 28 pages — 94 written by an author, the rest derived by the build |

Both languages ship on every page regardless of mode. That is the price of
switching without a reload, and for an offline-first study site loading from
local files it is the right trade.

## 13. Known limitations

| Limitation | Effect | Fix |
| --- | --- | --- |
| The `grade10/oop-cpp` question bank has English-only prompts and options | Those questions show in English in Nepali mode | Translate the 15 questions; the engine already supports it |
| A heading that mixes both languages in one element, e.g. `Key points to revise — दोहोर्‍याउनुपर्ने मुख्य बुँदा` | Cannot be split, so both halves show in every mode | Split into two elements when those headings are next edited |
| Element-level `lang="ne"` marking | An English technical term inside a Nepali sentence inherits `lang="ne"` | Pre-existing; a screen reader still reads `push()` intelligibly |
| Topic headings such as *"2.1 Notations — three ways to write the same gate"* have no Nepali counterpart | They stay in English in Nepali mode | **Deliberate**: they are navigation landmarks, and a lesson whose section headings vanish is harder to use than one with English headings. Give them a Nepali sibling to change this |
| No screen-reader testing | **WCAG 2.1 AA is not claimed** | Carried over from Phase 2 |
| Both languages always download | Slightly larger pages in single-language mode | Acceptable for an offline site; would matter on a metered connection |

## 14. Adding a fourth language

The architecture does not assume two. `MODES` and the `pick()` fallback take a
list; `language.css` takes another `[data-lang="xx"]` block. What does not
generalise is `.pair`, which is a two-column grid by construction — three
simultaneous panels will not fit a phone. A third *simultaneous* language needs
a different component; a third *switchable* language needs only content.
