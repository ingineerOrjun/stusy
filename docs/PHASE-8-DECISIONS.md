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

---
---

# Phase 8.1 — decisions

Decisions taken under the second Phase 8 brief. Appended, not merged:
the decisions above still describe why the first Phase 8 looks as it
does.

---

## D9 · The think gate is authored per example, never automatic

**Decision.** A worked example is gated only when an author inserts a
`.wex-gate` marker into it. 26 of the 50 carry one; 24 do not.

**Why not all 50.** The one-line implementation hides every solution and
would have been wrong in exactly the way the brief warns about. Half the
worked examples in this product exist to show a **form** — `class Box
{ … };`, the syntax of an inheritance list, how a K-map is drawn. A
student who has never seen that form cannot predict it. Hiding it adds a
click between them and the thing they opened the page for, and calls the
click pedagogy.

**The rule that decided each one.** Gate where the student can produce a
**determinate answer** from what is already on screen. Leave open where
it is the first demonstration of a notation, a syntax, or a procedure.

**Consequence.** The split is a content judgement, and it is visible: 26
markers, greppable, each one reviewable on its own. It is not derivable
from a rule, and it should not be.

---

## D10 · An explicit marker, because inference was measurably unsafe

**Decision.** The runtime splits an example at a `.wex-gate` element.

**The alternative, tried and rejected.** Infer the split — everything
after the paragraph beginning `<b>Question:</b>` is the working. It
reads well and it does not work: **only 24 of the 50 examples use that
convention.** An inference rule would have been right about half the
time and silently wrong about the rest, and "silently wrong" here means
a student is shown the answer to a question they were told to attempt.

**What the marker buys.** It is greppable, it is countable, the build
validates it, and it cannot drift as content is edited around it.

---

## D11 · The working is `hidden`, not styled out of sight

**Decision.** The gated working is hidden with the `hidden` property,
and the CSS rule is `.wex-work[hidden]{ display:none }`.

**Why this is the whole point.** `opacity:0`, `visibility:hidden`,
`height:0` and a `.is-closed` class all look identical in a screenshot,
and three of them leave the solution **in the accessibility tree**. A
student using Narrator would be read the answer that the sighted student
beside them cannot see — a gate that gates only the people who do not
need it.

**Verified, not assumed.** In Chrome, with the page served: the gated
block reports `display: none`, `offsetParent === null`, and a phrase
unique to it is absent from `document.body.innerText` while closed,
present after the control is pressed, and absent again after it is
closed. A test asserts `hidden === true` and fails when the component is
changed to hide by class — this was confirmed by making that change.

---

## D12 · It reuses `.rt-*` rather than growing a second set of styles

**Decision.** The scratch box uses `rt-attempt`, `rt-label` and
`rt-input` — the classes `retrieval.js` introduced.

**Why.** Those names describe the **act** — attempting before looking —
not the component that first needed it. To a student the two gates are
the same act, so they should not be able to drift apart visually. This
is the brief's "do not duplicate existing components" applied to CSS,
and it is why the gate arrived with 30 lines of new style rather than 80.

---

## D13 · "Show the working", not "Show the answer"

**Decision.** The gate's label names the method, not the result.

**Why.** What is behind the gate is how the answer was reached, and that
is what the marks are for. A student who has already worked the answer
out still has a reason to open it — to check their route rather than
their result. "Show the answer" tells them there is nothing left to do.

---

## D14 · Four content defects were fixed, not worked around

**Decision.** `u2`'s "eight tokens" (it enumerates seven), `u6`'s code
comment that gives away the trick its own title advertises, `db-u6`'s two
Example 1s, and `dd-u5`'s merged question-and-answer block were all
corrected in the content.

**Why it is worth recording.** Three of the four were only visible
*because* of the gating pass. Gating `u6` Example 3 was pointless while
the code comment said `// prints "Base show"  <-- surprising!`; gating
`dd-u5` Example 1 was impossible while the instructions and their
answers shared one block. **Adding the mechanism is what exposed the
content that contradicted it.**

The `db-u6` duplicate numbering was found by a scan, and a build rule now
enforces uniqueness — confirmed to fail by reintroducing the duplicate.

---

## D15 · The build gate includes the one rule that protects the intent

**Decision.** `validate.js` fails the build if **no** worked example
gates anything, alongside the per-gate rules (a gate with no working
after it, a prompt with no Nepali, a marker outside any example).

**Why that rule and not a threshold.** A number would be a quota, and
this phase has argued twice that quotas produce content nobody needed.
What is worth protecting is not "26" — it is that the measured starting
state, **0 of 50**, cannot silently return. Every one of these four
failures is invisible in source and silent at runtime: the component
simply declines to build a gate it cannot understand, and the page looks
finished.

---

## D16 · Three P0 units were named and left unbuilt

**Decision.** `u1`, `db-u3` and `db-u4` are recorded as P0 and no
practice was written for them in this phase.

**Why not start them.** Each is a content build the size of the three
faded-practice skills that were the *whole* of the first Phase 8. Begun
at the end of this one they would have been left half-finished, and half
a practice sequence is worse than none — a student meets a fade that
stops before it withdraws the help.

**Why they are named anyway.** An audit that only reports what was fixed
is a progress report. The matrix exists so the next phase starts from a
measurement instead of a fresh guess.
