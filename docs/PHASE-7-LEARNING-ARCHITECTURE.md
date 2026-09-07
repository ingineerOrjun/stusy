# Phase 7 — Learning Architecture

How the platform now models a learner rather than a set of pages: the
prerequisite graph, the revision rules, the mastery model, and the
principles the three of them are built on.

---

## 1 · The learning loop, and where each part lives

```
LEARN        lesson content, bilingual            content/lessons/
VISUALIZE    55 diagrams, 11 animated             diagrams.js
PREDICT      commit-before-reveal                 predict.js
INTERACT     26 simulation mount points           sim-*.js
PRACTISE     faded guided practice                guided.js + content/practice/
MISTAKE      marked per step, not per answer      guided.js
FEEDBACK     names the reason, both languages     everywhere
RETRIEVE     64 gated practice questions          retrieval.js
REVISE       ← Phase 7                            revision.js + revise.js
RE-TEST      the same question, attempts counted  ProgressService
```

Before Phase 7 the loop ran forward and stopped. A student finished a
unit, graded themselves, and the record went into storage nobody could
read. **REVISE was the missing edge that turns a sequence into a loop.**

---

## 2 · Prerequisite architecture

### The model

```
'<subject>/<unit>': [ { unit: '<subject>/<unit>', why: { en, ne } } ]
```

Subject-qualified on both sides, so a future Grade 11 unit depending on a
Grade 10 one needs no change to the model. **Nothing in the build or the
runtime knows a subject's name.**

### Where each field comes from

The graph file holds only the **edges**. Titles, pages, hours and marks
are already in `config/pages.js` and are joined at build time into one
derived `learningMap`. Nothing is written twice, so nothing can disagree
with itself.

A unit's canonical id is `<subject>/u<n>` — the number the navigation
badge already shows and the key the question banks already tag against.
The map, the quiz and the retrieval record therefore join without a
translation table.

### Why the reason is mandatory

> "You should already know Unit 3" is a link.
> "A partial dependency is defined against PART of a composite key, so you
> need the key vocabulary from Unit 3" is a diagnosis.

A student who has just failed a normalisation question needs the second:
it tells them *what to re-read*. The build refuses an edge without a
reason in both languages, and refuses one under eight words — long enough
to name a specific thing.

### What the build enforces

| Rule | Failure it prevents |
|---|---|
| Every unit on either side exists | A dead link on the page a struggling student was sent to |
| No unit is its own prerequisite | — |
| No cycle, reported with the actual path | "To understand Unit 5, first understand Unit 5" — advice that cannot be followed and that nothing in the UI would reveal |
| Every reason has both languages, with real Devanagari | A Nepali-medium student getting a link with no diagnosis |

### Where it renders

At **build time**, above the objectives, inside an `<aside>` with an
accessible name. Not by script: the student who most needs to be told to
revise Unit 3 is the one whose connection dropped half way through
loading the page.

A unit with no prerequisites renders **nothing** rather than an empty
panel saying "none". Four units are genuine entry points and saying so is
noise.

---

## 3 · Revision architecture

### Storage

No new abstraction was built. `ProgressService` already had one — a
`LocalAdapter`, a `MemoryAdapter`, and a *write probe* rather than a
feature check, because some privacy modes expose `localStorage` and throw
on write. Phase 7 extends it and changes none of it.

**Degradation is tested, not assumed:**

| Failure | Behaviour |
|---|---|
| Quota exceeded mid-session | The grade survives in memory for this session; `isPersistent()` reports false |
| Store throws on first probe | Falls back to memory; `storageInfo().adapter === 'memory'` |
| Corrupt JSON | Discarded; a clean state, no throw into the UI |
| Individually malformed entries | Dropped; valid ones survive |
| `ProgressService` absent entirely | Every question reads as UNSEEN; the page renders |
| `ProgressService` throws | Caught per call; costs a student their history, not their page |

**No backend. No login.** The map is generated at build time; the record
is local; nothing is sent anywhere, and the page says so.

### The join

A retrieval record is keyed by the answer id its author wrote — `dba41` —
which tells a revision view nothing. The build collects `id → unit → page`
**while the pages are written**, so the index cannot drift from what
shipped, and refuses a duplicate id: the id is the storage key for a
student's self-grade, so a collision would silently merge two questions'
histories with nothing in the UI to show it.

---

## 4 · The recommendation rules

Deterministic, documented, and testable. Every decision is a rule that can
be written on one line, read by a teacher, and disagreed with.

```
NEEDS_REVIEW   graded `not`         the student judged their own answer wrong
SHAKY          graded `partly`      half an answer is what a lost mark is made of
FRESH          `got`, one attempt   right, but one data point
SECURE         `got` after a miss   recovered and held — the strongest evidence
UNSEEN         never attempted
```

Ordering is **priority first, exam marks second**, so two units both
needing review are offered weightiest first.

**A unit where everything attempted was right is never recommended.** It
needs finishing, not revising; recommending it would put "0 questions came
out only partly right" on screen, and one visibly empty recommendation
costs the credibility of the rest.

### Why there is no separate confidence axis

The standard model is right/wrong × confident/uncertain, and it needs two
questions per item. This product asks one, whose three answers already
blend the two: a student choosing `partly` is saying both that they were
incomplete and that they know it. A second question would double the cost
of every retrieval to sharpen a distinction the first mostly already
makes.

**The trade-off is stated in the service rather than hidden**, so a future
phase can revisit it with the reasoning intact.

### Why it is not adaptive

A scoring function nobody can predict is a scoring function nobody can
test — and, more importantly, one no student can trust. A recommendation a
student cannot understand is one they will not act on.

---

## 5 · The mastery model

```
NEW            nothing in this unit attempted
LEARNING       started, less than half attempted
PRACTICING     half or more attempted, nothing outstanding
NEEDS_REVIEW   anything graded `not` still standing
MASTERED       every question attempted, every one `got`
```

**NEEDS_REVIEW beats everything except NEW.** A unit where one question is
still wrong is not "practising", whatever the other counts say.

Extensible in the direction the brief asks for — `subject → unit → topic →
skill → practice` — without redesign: the question bank already tags
`topic` and `difficulty`, so a topic tier is a grouping of data that
already exists rather than a new model.

---

## 6 · "Revise this" paths

Every weakness leads somewhere, and a weak unit offers **two doors**:

```
Weak in Normalisation
   ├── Review the unit          → the unit page
   └── Revise what it builds on → the prerequisite, WITH its reason
```

The second door exists because when a student keeps missing
Normalisation, the problem is often not Normalisation — it is the key
vocabulary Normalisation is *defined in terms of*. The reason travels with
the link, so the second door is a diagnosis rather than a guess.

---

## 7 · Tone

Every line describes a **record**, never a student.

| Shown | Never shown |
|---|---|
| Needs another look | Failed |
| Almost there | You don't know this |
| Right first time | Bad score |
| Held after a miss | — |

"Needs another look" is a fact about a question. "You don't know this" is a
claim about a person, and a student who reads it is being taught something
other than DBMS.

The wording lives in `UIStrings` where it can be reviewed as *language*,
not buried inside a scoring function.

**No streaks, points, badges, confetti or celebration.** The strongest
thing the page says is that a question was held after an earlier miss,
because that is the strongest thing the record actually knows.

---

## 8 · The three-language model

Unchanged in principle, extended in reach. Three modes over one DOM;
CSS chooses; nothing re-renders, so a running simulation and a
part-answered question both survive a language switch.

Phase 7 additions follow the established split:

| Kind of text | Mechanism |
|---|---|
| Content (titles, reasons, explanations) | Both languages in the DOM, `.t-en` / `.np-cell` + `lang="ne"` |
| Control labels | `UIStrings`, one label per mode, `lang` stamped by the service |
| Composed labels ("चरण 3 / 4") | `UIStrings.write()`, added Phase 6 |
| Sentences containing counts | Built per language and re-rendered on a language change |

**Technical terms stay English inside Nepali prose** — `partial
dependency`, `foreign key`, `constructor` — because that is the vocabulary
the exam uses. A translated "foreign key" would not help a student who
meets it in English in the SEE paper.

### The trap this phase fell into

The revision view rendered perfectly and was **completely blank in Nepali
mode**. Not a data problem: the build's English-pairing pass swept the
empty runtime container into a `<div class="t-en">`, which Nepali mode
hides. The page loaded, the map loaded, every panel was empty.

**Rule now enforced:** a container a runtime fills cannot be paired,
because it is empty at build time and the build cannot know what language
its contents will be. A test walks the ancestor chain of every
runtime-filled mount to check it.

---

## 9 · Accessibility principles

Carried forward from Phase 5, applied to everything new:

- **Landmarks and names** — the prerequisite block is an `<aside>` with
  `aria-labelledby`; the progress bar has `role="img"` and a text label.
- **Heading levels** — runtime-written headings do not pass through the
  build's normaliser, so they must be authored at the right level. Phase 7
  shipped an h1 → h3 skip on the revision page and fixed it.
- **Language attributes** — every Nepali run declares `lang="ne"`,
  including in script-written markup.
- **Colour independence** — every state is named in words before any
  colour is applied; the tally reads correctly in greyscale.
- **Touch targets** — 44px on coarse pointers. The revision action and the
  prerequisite link are the two things a struggling student taps most, and
  both measured 43px before this was checked.
- **Focus** — one ring, one colour, 10:1 or better on every surface.

**WCAG 2.1 AA is not claimed.** What a screen reader actually speaks
remains **NOT VERIFIED** — no screen reader is drivable in this
environment. Phase 5 §23 remains the accurate criterion-by-criterion
statement.

---

## 10 · What a future subject inherits

| To get | Add | Engine change |
|---|---|---|
| Retrieval on every question | `.examq` blocks | none |
| A memory hook | a `.hook` in the `.mistake` block | none — enforced by the validator |
| Faded practice | `content/practice/<subject>.js` + one line | none |
| **Prerequisites** | edges in `content/prerequisites.js` | **none** |
| **A revision page** | a `revise.html` entry in `pages.js` | **none** |

The revision view, the mastery model and the recommendation rules are
entirely subject-agnostic: they read the learning map and never learn a
subject's name. Adding Programming in C, or all of Grade 11, requires no
change to any of them.
