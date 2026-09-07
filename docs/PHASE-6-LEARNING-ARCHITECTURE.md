# Phase 6 — Learning Architecture Decision Record

The reusable learning patterns this phase added or changed, why each is
shaped the way it is, and what a future subject has to do to use them.

---

## The principle behind all of it

A component in this product does not decide what a student learns. Content
decides that. A component decides **what the student is required to do** with
the content, and that is a separate axis: the same paragraph, the same
worked example and the same model answer can produce reading or produce
retrieval depending on what stands between the student and the answer.

Phase 6 changed almost no content. It changed what stands in the way.

---

## ADR-1 · The retrieval gate is a component, not an edit to 64 questions

**Decision.** `.examq` blocks are upgraded at runtime by `retrieval.js`. No
lesson file was edited.

**Why.** `.examq` already carried everything the pattern needs — the
question, the mark allocation, the model answer keyed by `data-answer`. The
only missing element was a gate, which is behaviour rather than content. So
all 64 questions across 18 files upgraded at once, and question 65 will
arrive already gated without its author doing anything.

**The shape.**

```
question + marks      already authored
      |
attempt               optional scratch space, never stored
      |
COMMIT                a deliberate act; nothing reveals before it
      |
model answer          already authored
      |
self-assess           Got it / Partly / Not yet
      |
recorded              ProgressService
```

**Why self-assessment and not auto-marking.** These are written SEE answers —
"name the three families and give two statements each". No string comparison
can mark that, and a component that pretended to would teach students to
write for the matcher. Judging your own answer against a mark scheme is the
skill the exam rewards, so the component asks for it directly.

**Why the scratch space is not saved.** Storing a student's free text raises
questions this component should not answer: what is kept, for how long, on
whose device. The learning signal is the attempt and the self-grade; only the
self-grade is recorded, and the textarea says so.

**Trade-off accepted.** A determined student can press the gate without
attempting anything. The gate is a prompt, not a lock, and locking would be
worse: a student legitimately returning to re-read would be stuck. The label
is what does the asking, which is why it is a sentence and not a word.

**Consequence for `core.js`.** It binds every `[data-answer]` button and now
skips those inside `.examq`. Two handlers on one button would each toggle the
answer, leaving it where it started — the reveal would silently stop working
with nothing in either file looking wrong. A test fails if that line is
removed.

---

## ADR-2 · Faded practice is new content, not faded worked examples

**Decision.** Worked-example fading (§7) is implemented as a separate
component with its own content bank. The existing 50 worked examples were not
touched.

**Why.** They are a progression of *different sub-skills*, not repetitions of
one. Fading Digital Design unit 1's Example 2 would hide the only
demonstration a student ever gets of binary-to-decimal conversion. Fading
needs the same procedure several times over; that is a different shape and
needs different content.

**The four levels.**

| Level | Steps | What is asked |
|---|---|---|
| `worked` | shown with answers | nothing — the student reads an expert |
| `partial` | asked, full prompts | each step, one at a time |
| `guided` | asked, thin prompts | "second remainder", not "6 ÷ 2, write the remainder" |
| `independent` | none | the question and an answer box |

Enforced by test: the first problem must be `worked`, the last must be
`independent`, help may stay level or decrease and never increase, and an
`independent` problem carrying steps fails the build's test suite.

**Why every step is marked, not just the answer.** A student who reverses the
final answer has made one mistake, at the end. A student who gets the third
remainder wrong has made a different one. Telling them only that the answer
is wrong hides which. Marking per step puts the feedback at the decision that
caused the error, while the student still remembers making it.

**Why the answers are short tokens.** A step's answer is a digit, a class
name or a normal form, so it can be compared. Anything needing a sentence
goes to the retrieval gate instead, which is judged by the student. A checker
that pretended to grade prose would teach students to write for the checker.

**Data shape** (`_source/content/practice/<subject>.js`):

```js
{
  id, subject, unit,
  skill: { en, ne },
  rule:  { en, ne },              // the one rule the procedure depends on
  problems: [{
    fade: 'worked' | 'partial' | 'guided' | 'independent',
    ask:  { en, ne },
    steps: [{ prompt: {en,ne}, answer, accept: [], why: {en,ne} }],
    result, resultPrompt: {en,ne}, check: {en,ne}
  }]
}
```

Generated to `assets/js/practice-bank.js` as `GuidedPractice.register(...)`
calls — the same pattern as the question bank and the diagram data. **The
runtime never learns a subject's name.**

**A page uses it with one line:** `<div class="guided" data-skill="dd.dec2bin"></div>`

---

## ADR-3 · The misconception pattern ends in something portable

**Decision.** Every `.mistake` block ends in a `<p class="hook">`, and the
build fails without one.

**Why at the end.** On its own a hook is a slogan. After the explanation that
earns it, it is a handle. The student has just read what the confusion is and
why it is wrong; the hook is what they carry out.

**Three rules enforced at build time.**

1. A misconception block with no hook fails the build.
2. A hook over 24 words fails. One that runs to a paragraph is a summary
   wearing a hook's clothes and will not survive being recalled under
   pressure.
3. A hook with no Nepali fails. The students most likely to need a hook are
   the ones reading in Nepali.

These are checked at build time rather than left to review because forgetting
one is exactly the kind of thing that is obvious while writing a single unit
and invisible across eighteen.

---

## ADR-4 · `UIStrings` declares the language it writes

**Decision.** `UIStrings.apply()` stamps `lang="ne"` on a control it labels in
Nepali and clears it on the way back to English. A new `UIStrings.write(el,
text)` does the same for components that compose their own labels.

**Why this is architecture and not a bug fix.** Phase 5 fixed 82 Devanagari
runs in the *content* by teaching the build's tagging pass about a class. It
could not have reached the controls, because a control's Nepali does not
exist in the markup at all — it arrives from the `UIStrings` table at
runtime, after the build has finished. That is a structural blind spot in the
build-time approach, and the fix has to live where the text is written.

**The contract is preserved.** A component still marks a control with
`data-ui` and stops thinking about it. Language declaration joined the list of
things the module handles on the component's behalf, alongside choosing the
word and re-labelling on a language switch.

**`write()` exists because `apply()` cannot reach composed labels.** "चरण 3 /
4" is built from a table lookup plus two numbers; the diagram stepper, the
number lab and the retrieval gate all construct their own strings and would
otherwise skip the whole mechanism.

---

## ADR-5 · Progress records the grade and not the answer

**Decision.** `ProgressService` gained `recordRetrieval` / `getRetrieval` /
`getRetrievalSummary`. `SCHEMA_VERSION` was deliberately **not** changed.

**Why no version bump.** A version mismatch discards the stored payload.
There is no reason to throw away a student's finished units and quiz history
to make room for a new key. An older payload arrives without `retrieval` and
gets an empty one; a newer payload read by older code loses only the new
field.

**Why the latest grade replaces the previous one.** The record answers "where
does this student stand now". A question answered badly in September and well
in December is a question they now know. `attempts` keeps the count, so a run
of re-attempts is still visible.

**What is deliberately not stored.** The student's own words. See ADR-1.

---

## ADR-6 · Feedback names the reason, in both languages, always

**Decision.** No component in this phase says "Correct!" and stops.

Every branch explains:

- *"Not that. 22 is even, so the remainder is 0 and the quotient is 11."*
- *"Recorded. Find the exact part you missed and re-read only that — then
  answer this question again without looking."*
- *"If you answered X Y Z, you sorted the names instead of reading the
  header."*

**Why the independent problems are built around a specific mistake.** The
last problem in each practice sequence is chosen so that the *wrong* answer
is the one students actually give, and the feedback names that reasoning
rather than describing the correct one. `class Z : public Y, public X` has
its bases deliberately out of alphabetical order for exactly this purpose.

---

## What a future subject has to do

To reach the Phase 6 standard, a new subject adds:

| | Where | Engine change |
|---|---|---|
| lessons with `.examq` blocks | `_source/content/lessons/` | none — the gate is automatic |
| a `.mistake` block ending in a `.hook` | same | none — enforced by the validator |
| faded practice | `_source/content/practice/<subject>.js` + one line in `context.js` | none |
| a `<div class="guided" data-skill="…">` | the lesson | none |
| `guided.js`, `practice-bank.js` in the page's `js` | `_source/config/pages.js` | none |
| questions | `_source/content/questions/` | none |

**No engine code changes for any of it.** That was the test this architecture
had to pass, and adding the second and third practice banks passed it: three
content files, three lines in the context, two lines per page, and the ten
content-contract tests written for the first bank covered the other two
without modification.
