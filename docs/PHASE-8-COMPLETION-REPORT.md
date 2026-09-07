# Phase 8 — Learning Depth, Accessibility & Revision Quality — Completion Report

**Baseline** `51a8f0f` (Phase 7 complete) · **Head** this phase's final commit
**Scope** the three existing flagship subjects. No new subject started.
**Result** 354 tests passing across three consecutive runs, build reproduced
from a wiped `assets/` directory, no regressions.

Throughout: **VERIFIED** = measured in this phase. **NOT VERIFIED** = it was
not. **INFERRED** = reasoned from evidence without direct measurement.

---

## 1 · Baseline — verified, not trusted

Re-measured against the repository as STEP 1 requires:

| | Phase 7 reported | Measured now |
|---|---|---|
| Tests | 346 | **346**, three consecutive runs |
| Deterministic build | yes | **reproduced from a wiped `assets/`**, 0 files differ |
| Units / diagrams / animations | 18 / 55 / 11 | **18 / 55 / 11** |
| Simulation mounts | 26 | **26**, all responding |
| Diagram geometry | 55/55 | **55/55**, 0 defects |
| Prerequisite edges | 19 | **19** |

**No difference.** The Phase 7 report was accurate.

---

## 2 · Findings

The brief's priority order was followed, and the audit confirmed it:

1. **dd-u2 (15 marks)** — the exam asks students to *prove* De Morgan and to
   *apply* it. Proving was well served by a worked example. Applying had no
   practice at all, and the unit names the mistake students make while doing
   it.
2. **dd-u5 (15 marks)** — Example 1 lists five instructions with their
   addressing modes. That is a **lookup table, not practice**: a student
   reads it, agrees, and cannot classify an instruction they have not seen.
3. **u2 (14 marks)** — Example 4 is titled *"while vs do…while — the
   difference that gets tested"*. The unit says where the marks are, and it
   was a worked example nobody practised.
4. **Nepali headings** — 19% of instructional headings carried Nepali.
5. **Screen reader** — deferred seven phases.

**A discrepancy recorded.** The brief describes Unit 2 as covering
abstraction, encapsulation and access control. In this repository that is
Units 3 and 4. Unit 2 was audited as it actually is, per the brief's own
instruction that the repository is the source of truth.

---

## 3 · Changes made, with the learning rationale

### 3.1 · Three faded practice sequences — VERIFIED

| Skill | Unit | The independent problem is the unit's own named trap |
|---|---|---|
| `dd.demorgan` | dd-u2 | `(A' + B)'` — a double negation, where "break the bar, change the sign" stops being mechanical |
| `dd.addressing` | dd-u5 | `MOV A, M` — *looks* like the register-mode `MOV A, C` and is not |
| `oop.controlflow` | u2 | a `do…while` whose condition is false from the start |

**Why this and not more explanation.** Each unit's explanation is correct and
complete. What was missing was doing it — repeatedly, with the help coming
away, and with feedback at the step where the reasoning went wrong rather
than at the end.

### 3.2 · A fifth rung: transfer — VERIFIED

`independent` asks for the same procedure with no help. `transfer` asks
whether the student can use the **idea** when something has moved:

| Skill | What moves |
|---|---|
| De Morgan | **representation** — an expression becomes a NAND *gate* |
| Addressing | **direction** — from an instruction to classify, to a description to name |
| Control flow | **construct** — `do…while` becomes a `for` loop with the same numbers and the opposite answer |

The third is the sharpest: a student who memorised "do…while runs at least
once" cannot answer it; one who understands check-before-act can. That is
what separates a procedure from a concept, and nothing in the product tested
it before.

The completion message now names which was achieved — telling a student they
"did it with no steps shown" when they actually moved an idea somewhere new
is a small lie that costs the message its weight.

### 3.3 · Nepali headings, 19% → 81% — VERIFIED

151 instructional headings translated; 4 of them account for 48 instances.

**Technical terms stay English.** `SQL`, `Inheritance`, `constructor`,
`multiplexer` — the exam's vocabulary. A student who learns *"सम्बन्धात्मक
बीजगणित"* instead of *"relational algebra"* has been handed a word they will
never meet again. **49 headings are bare terms and were deliberately left
alone**, classified by a tool so the decision is inspectable.

**The outline number stays outside both languages.** "1.3" is the same in
every language and belongs to the lesson's structure.

---

## 4 · Screen reader — the seven-phase deferral, partly closed

### What is actually available — determined, not assumed

| | |
|---|---|
| NVDA / JAWS / `inspect.exe` | **not present** |
| Narrator | present — **audio only, no transcript API** |
| **UI Automation client** | **loadable** — new information since Phase 5 |

Chromium exposes only **14 nodes and no document** by default, because it
enables its accessibility tree lazily when an assistive client attaches. With
`--enable-features=UiaProvider --force-renderer-accessibility` in a separate
instance on a temporary profile, the **real platform tree** — the one
Narrator and NVDA consume — became readable: **508 nodes, 1 document, 343
text nodes.**

### VERIFIED at the platform level, for the first time

| | Result |
|---|---|
| Document name (announced on page load) | correct and complete page title |
| Interactive elements exposed | 26 buttons, 16 links, 5 edits, 3 radios |
| **Unnamed interactive elements** | **0** |
| Diagrams | all 3 announce as **one named image** with a meaningful description — `role="img"` subtree pruning confirmed against the real tree, not modelled |
| Text inputs | named by their `<label for>` — the association resolves at the platform level |
| Live regions | exposed as StatusBar, empty until something is announced |
| Language switcher | all three options named |

### The decisive language finding — VERIFIED

Driven **through the accessibility API** (`InvokePattern`), with each reading
self-attributed from the page's own content so a lagging tree could not
mislabel it:

| Actual mode | Devanagari text nodes | Latin text nodes |
|---|---|---|
| Bilingual | 97 | 215 |
| **English** | **0** | 189 |
| Nepali | 101 | 113 |

**English mode exposes zero Devanagari to the platform tree.** The hidden
language is genuinely removed from what a screen reader reads — not merely
visually hidden. That has been claimed since Phase 3 and never confirmed
against the real tree until now. The Latin remaining in Nepali mode is
technical vocabulary and navigation, which is intended.

### NOT VERIFIED, and why

- **What a screen reader says.** Speech was never heard. No transcript API
  exists for Narrator, and NVDA is not installed.
- **Heading hierarchy at the platform level.** The .NET `UIAutomationClient`
  wrapper does not surface `AriaRole` or `Level`. Heading structure remains
  measured at DOM level (0 skips, 1 `h1` per page).
- **Announcement order and timing.** The tree can be read; the sequence a
  reader speaks it in cannot.

The throwaway instance was closed and its profile deleted. The user's own
20 Chrome processes were untouched.

---

## 5 · Animation and interaction findings

**Nothing was animated, and that is the finding.**

STEP 8 lists the concepts where motion carries meaning — data movement,
instruction execution, gate propagation, K-map grouping, normalisation
decomposition, ER relationships, SQL execution flow, inheritance, constructor
order, stack and queue. **Every item on that list is already covered** by the
11 existing animations, each driven to its final step in Phase 6.

| | Result |
|---|---|
| Diagram geometry | **55 / 55 clean**, measured after `document.fonts.ready` |
| Simulation mounts | **26**, all responding |
| Animations verified this phase | `deMorgan` 5/5 with a distinct caption per step |
| **Running animations at idle** | **0**, measured |

The static diagrams that remain static are reference material — notation
sheets, classification charts, comparison tables — which the same step says to
leave alone, because a student revising from a screenshot still needs them.

---

## 6 · Performance — measured

`grade10/digital-design/unit2.html`, which gained a practice sequence:

| | |
|---|---|
| DOM interactive | **183 ms** |
| Load complete | 804 ms |
| DOM nodes | 1,056 |
| **Running animations at idle** | **0** |
| `practice-bank.js` | 61.6 KB — loads only on the 6 pages that use it |
| `style-digital.css` | 115.4 KB |

**INFERRED, not measured:** sizes are uncompressed and would be substantially
smaller over the wire. No frame rate is quoted — the automation pane throttles
`requestAnimationFrame` and any number would be fiction.

---

## 7 · Tests — 346 → 354

| Guard | Catches |
|---|---|
| a transfer problem is not the independent one with new numbers | "same question, different numbers" — measured by token overlap |
| a transfer problem explains what changed | a transfer that teaches a second answer instead of a wider rule |
| the scaffolding comes away, in order | a sequence that ends while still helping |
| **every De Morgan answer is algebraically correct** | a typo teaching a wrong Boolean identity — each identity is re-derived over its full truth table by an evaluator in the test |
| every fade level has a runtime label, and the label has Nepali | a level that silently falls back to the "guided" wording, or is English in Nepali mode |
| instructional headings carry Nepali | the heading pass being disabled or regressing |
| a translated heading keeps its outline number outside both languages | a Nepali heading losing its place in the unit |
| no heading was split through an HTML entity | the `&nbsp;` bug, below |
| every translation is used by at least one heading | a translation written and silently thrown away |

**Every new guard was proven to fail by reintroducing its defect** and then
restored — including one that required a purpose-written script because shell
quoting kept mangling the apostrophes in the Boolean expressions.

**Two existing content-contract tests caught real defects in this phase's own
work before it shipped:** a `resultPrompt` whose "Nepali" half was English,
and the new fade level not being in the ordering rule. That is what they are
for.

---

## 8 · Responsive results — VERIFIED

**5 widths × 3 language modes = 15 combinations**, on the page carrying a new
practice sequence, exercised at the partial-fade level:

```
320  390  430  768  1280      ×      English / Nepali / Bilingual
```

All clean: no horizontal overflow, no clipped content, no empty panel, no
language leak, no text below the 12px floor.

---

## 9 · Three-language results — VERIFIED

| | |
|---|---|
| Untagged Devanagari, all modes | **0** |
| Unnamed controls, all modes | **0** |
| Heading-level skips | **0** |
| Bilingual heading rendering | `1.1 The numbering concept — सङ्ख्या लेख्ने अवधारणा` |
| English | `1.1 The numbering concept` |
| Nepali | `1.1 सङ्ख्या लेख्ने अवधारणा` |
| Practice feedback | both languages at every rung, verified by driving all three sequences |
| Hidden language in the platform tree | **0 Devanagari nodes in English mode** (§4) |

---

## 10 · A bug found and fixed while building this

The first heading-prefix regular expression contained a bare `&` in its
alternation, which matched the ampersand **inside** `&nbsp;` and produced:

```
1.3 &<span class="t-en">nbsp;Converting between bases</span>
```

— a stray ampersand and the literal text "nbsp;" in the heading. It would
also have eaten the leading `1` of *"1's complement"*. The split is done on
the entity now, with entities stripped before looking for letters so
`1.4 &amp; 1.5` is still recognised as a number. **Guarded by test.**

---

## 11 · Known limitations

1. **What a screen reader speaks — NOT VERIFIED.** Advanced this phase from
   "no tooling available" to "the platform tree is readable", which is a real
   step, but speech was never heard.
2. **Heading hierarchy at the platform level — NOT VERIFIED.** The .NET UIA
   wrapper does not expose `AriaRole` or `Level`.
3. **Nepali headings at 81%, not 100%.** The remaining 19% are bare technical
   terms, deliberately left in English. **That is the intended end state**,
   not an unfinished one.
4. **Google Fonts** — 6 network requests per page in an offline-first
   product. Phase 5 finding, unchanged.
5. **`file://` operation — NOT VERIFIED.** The preview pane renders external
   files as static snapshots.
6. **The revision record is per-device.** Phase 7 finding, unchanged.
7. **Revision is unit-level, not topic-level.** Phase 7 finding, unchanged.
8. **The transfer-overlap test is a proxy.** It catches the mechanical
   failure — the same question reworded — and cannot judge whether a
   genuinely different question is pedagogically a transfer.

---

## 12 · Deferred work

| | Why |
|---|---|
| More prediction blocks | 18 exist and work. The easiest item on the list and the least valuable; a quota is what STEP 9 of the previous brief warned against. |
| Faded practice for the remaining procedural skills | K-map grouping, 2's complement, SQL writing, the ER→relational mapping. Each now costs a content file and two lines. |
| Spacing and interleaving | The timestamps are stored; neither is surfaced. |
| Topic-level revision | 64 `data-topic` attributes would take a recommendation from "revise Unit 5" to "revise transitive dependency". |

---

## 13 · What improved, what was fixed, what remains

**Improved**
- The three heaviest units (44 marks) gained the practice their procedural
  skills lacked, each built on the confusion the unit itself names.
- A transfer rung now distinguishes knowing a procedure from understanding
  the idea behind it.
- The Nepali heading outline went from 19% to 81% — a Nepali-medium student
  can now skim a page in Nepali.
- The platform accessibility tree was read for the first time in eight
  phases, confirming diagram pruning, control naming and label association
  against the real tree rather than a model.

**Fixed**
- A heading-prefix regex that split through an HTML entity.
- A completion message that credited the wrong achievement on a transfer
  problem.
- Two content defects caught by existing tests: a non-Nepali "Nepali" prompt,
  and a fade level missing from the ordering rule.

**Remains**
- Speech itself is still unheard.
- Spacing, interleaving and topic-level revision are still unbuilt.
- The Google Fonts dependency still contradicts the offline-first claim.

---

## 14 · Recommended for Phase 9

1. **A real screen-reader session on a machine with NVDA.** This is now the
   single remaining item that no amount of tooling in this environment can
   substitute for — and Phase 8 has established exactly how far the
   substitutes go.
2. **Spacing**, using the timestamps already stored: "you have not looked at
   this in three weeks" is a query, not a new model.
3. **Faded practice for the remaining four procedural skills**, now that each
   costs a content file and two lines.
4. **Self-host the fonts**, or accept and document the network dependency.
5. **Then Programming in C.** The architecture is ready: a new subject needs
   content files and page entries, and no engine change for retrieval,
   practice, prerequisites, revision or the language system.

---

*Phase 8 complete. 354 tests across three consecutive runs, 0 failures, build
reproduced from a wiped assets directory, no regressions. Programming in C not
started. Not deployed.*
