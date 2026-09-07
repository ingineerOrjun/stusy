# Phase 8 — Decisions

Architectural and learning-design decisions taken in this phase, with the
reasoning that produced them.

---

## D1 · A fifth fade rung, rather than a second component

**Decision.** `transfer` was added to the existing `LEVEL_LABEL` table in
`guided.js`. No new component.

**Why.** STEP 6 said "only if the architecture supports it cleanly". The test
of that is what the change costs: one entry in a table, one string, and the
ordering rule the test suite enforces grew from four rungs to five. Nothing
else moved. A model that absorbs a new level that cheaply is a model that was
right.

**The alternative rejected.** A separate "transfer" component would have
duplicated the marking, the bilingual pair helper, the keyboard handling and
the accessibility attributes, and would have let the two drift.

**Consequence.** The fading contract is now: the sequence must *end*
unscaffolded, and either `independent` or `transfer` qualifies — but a
`transfer` without an `independent` before it fails the build's tests, because
asking a student to move an idea they have never used unaided is not
transfer, it is a jump.

---

## D2 · Transfer means something moved, and the test measures it

**Decision.** A transfer problem is guarded by **token overlap** against the
independent problem it follows. More than 80% shared wording fails.

**Why.** "The same question with different numbers" is the easy thing to
write by accident and it tests the procedure a second time while calling
itself transfer. That failure is invisible to review — the content looks
fine — so it needed a measurement.

**What it does not claim.** Overlap is a proxy. It cannot tell that a
genuinely different question is *pedagogically* a transfer. It catches the
specific, common, mechanical failure and says so.

---

## D3 · The practice for OOP Unit 2 is output prediction, not definitions

**Decision.** `oop.controlflow` asks how many times a control statement runs.

**Why not "choose the definition of encapsulation".** That tests whether a
sentence was read. STEP 5 explicitly says to avoid shallow definition
interaction, and the unit already has a decision drill for classifying OOP
features.

**Why not the program tracer.** The tracer walks a whole program step by step
and shows *how* execution proceeds. This asks the student to predict *where*
it ends up without stepping. Both are useful; neither is the other. Reusing
the tracer here would have meant a second tracer or a worse first one.

**A discrepancy recorded rather than resolved.** The brief describes Unit 2
as covering abstraction, encapsulation and access control. In this repository
that is Units 3 and 4. Unit 2 was audited as it actually is, per the brief's
own instruction that the repository is the source of truth.

---

## D4 · Technical terms stay in English inside Nepali headings

**Decision.** `SQL`, `Inheritance`, `constructor`, `normalization`,
`multiplexer`, `binary`, `token` and their kind are **not** translated. The
instructional language around them is.

```
4.1 The three families of SQL   ->  SQL का तीन परिवार
5.4 Syntax of Inheritance       ->  Inheritance को syntax
2.2.6 Universal gates           ->  left in English: it is a term
```

**Why.** The exam is in English. A student who learns *"सम्बन्धात्मक
बीजगणित"* instead of *"relational algebra"* has been handed a word they will
never meet again, and has lost the one they will. The Nepali carries the
meaning; the English carries the vocabulary. This is also how the subject is
actually spoken in a Nepali classroom.

**49 headings are bare terms and were deliberately left alone.**
`tests/manual/heading-lang.js` classifies them, so the decision is inspectable
rather than implicit.

---

## D5 · The outline number stays outside both languages

**Decision.** `1.3 &nbsp;` sits before the `.t-en` / `.t-ne` pair, not inside
either.

**Why.** "1.3" is the same in every language and belongs to the lesson's
structure, not its sentence. A Nepali-mode heading reading *"एक base बाट
अर्कोमा बदल्ने"* with no number in front has lost its place in the unit —
which matters most to the student most likely to be lost.

**Guarded by test**, because the split is done by a regular expression and
the first version of it split through the middle of `&nbsp;`.

---

## D6 · Nepali headings are applied at build time, from a table

**Decision.** `_source/content/heading-ne.js` holds the translations; a build
pass applies them.

**Why not authored inline.** Four headings account for 48 of the 151
instances. A table is one place to be right; inline authoring is 151 places
to be wrong, and it puts the same sentence in eighteen files where they can
drift apart.

**Why the existing markup pattern was reused rather than invented.** Phase
3.1 recorded that a heading mixing both languages in *one* element cannot be
split by the mode — both halves show everywhere. The `.t-en` / `.t-ne`
pattern with the separator nested inside a `.t-en` already solved that, and
is what the pre-existing bilingual headings use.

**Guarded by test**, including one that fails when a translation matches no
heading — a translation written and silently thrown away.

---

## D7 · Chromium's UIA provider was enabled in a throwaway instance

**Decision.** A separate Chrome, `--enable-features=UiaProvider
--force-renderer-accessibility`, on a temporary profile, read via
`UIAutomationClient`, then closed and the profile deleted.

**Why.** Six phases reported "no screen reader available" and substituted a
DOM-derived model. That was accurate but incomplete: Narrator and NVDA read
the **platform** tree, and that tree turned out to be reachable. Chromium
exposes 14 nodes by default because it enables accessibility lazily; with the
flag it exposed 508, including the document and every control.

**What this does and does not establish.** It establishes what the platform
exposes — names, roles, structure, and whether hidden language is present.
It does **not** establish what a screen reader *says*, in what order, or
whether a student can complete a task by ear. Speech was never heard.

**Why a separate instance.** The user's own browser windows were not touched,
and the flags could not be applied to the already-running preview pane. The
instance was closed and its profile removed; 20 of the user's own Chrome
processes were left running and untouched.

**Limitation found and recorded.** The .NET `UIAutomationClient` wrapper does
not surface `AriaRole` or `Level`, so heading hierarchy could not be read
from the platform tree. That measurement remains DOM-level.

---

## D8 · Nothing was animated

**Decision.** No diagram was converted to animation or interaction in this
phase.

**Why.** STEP 8 lists the concepts where motion carries meaning — data
movement, instruction execution, gate propagation, K-map grouping,
normalisation decomposition, ER relationships, SQL execution flow,
inheritance, constructor order, stack and queue. **Every item on that list is
already covered** by the 11 existing animations, all of which were driven to
their final step in Phase 6.

The static diagrams that remain static are reference material — notation
sheets, classification charts, comparison tables — which the same step says
to leave alone, because a student revising from a screenshot needs them still.

**Adding animation here would have increased a count and taught nothing.**
