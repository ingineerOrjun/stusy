# Phase 8 — Learning Audit

The three units Phase 7 classified as **E, needs guided practice**, audited
before anything was written, plus the heading and screen-reader work the
brief prioritised after them.

**The metric is not word count and not component count.** Phase 4.5
established that "more content = better" is false, and every audit since has
held to it. What is reported here is whether a student can *do* the thing a
unit claims to teach, and where they would get stuck.

---

## 1 · Baseline, verified rather than trusted

Re-measured against the repository, not read from the Phase 7 report:

| | Phase 7 said | Measured |
|---|---|---|
| Tests | 346 | **346**, three consecutive runs |
| Build | deterministic | **reproduced from a wiped `assets/`**, 0 files differ |
| Units / diagrams / animations | 18 / 55 / 11 | **18 / 55 / 11** |
| Simulation mount points | 26 | **26**, all responding |
| Prerequisite edges | 19 | **19** |
| Diagram geometry | 55/55 clean | **55/55**, 0 defects |

No difference. The baseline was accurate.

---

## 2 · Digital Design Unit 2 — Logic Gates (15 marks)

**The heaviest unit in the subject.**

| | |
|---|---|
| Concepts | gate notation (symbol / expression / truth table), gate behaviour, universal gates, De Morgan's theorems |
| Already there | 3 diagrams (one animated), 2 gate-lab mounts, 2 worked examples, 1 prediction, 4 retrieval questions |
| Named misconception | *"breaking the bar but forgetting to change the sign"* |

**The gap.** The exam asks two things about De Morgan: *prove* a theorem, and
*apply* one. Example 2 proves the second theorem by truth table — that half is
well served. Applying a theorem to an expression under time pressure had **no
practice at all**, and the unit itself names the mistake students make while
doing it.

**Classification: E** — needs guided practice, not another explanation. The
explanation is correct and complete; what is missing is doing it.

**Built:** `dd.demorgan`, five rungs. The independent problem is `(A' + B)'`,
where the rule stops being mechanical because a double negation cancels — the
exact place a student who has memorised "break the bar, change the sign"
comes unstuck.

---

## 3 · Digital Design Unit 5 — Microprocessor (15 marks)

**Joint-heaviest in the subject.**

| | |
|---|---|
| Concepts | what a microprocessor is, the blocks, the instruction cycle, flags and interrupts, pins, addressing modes |
| Already there | 4 diagrams, 8085 stepper, 2 worked examples, 1 prediction, 4 retrieval questions |
| Named misconception | *"the PC holds the current instruction"* — it holds the address of the next |

**The gap.** Example 1 lists five instructions with their addressing modes.
That is a **lookup table, not practice**: a student reads it, agrees with
every line, and cannot classify an instruction they have not seen. The unit
also states the confusion — *"direct writes the address in the instruction;
indirect keeps it in a register pair"* — and then never asks the student to
make that call.

**Classification: E.**

**Built:** `dd.addressing`, five rungs. The independent problem is
`MOV A, M`, which *looks* like the register-mode `MOV A, C` and is not — the
confusion the unit names, made into the question.

---

## 4 · DS & OOP Unit 2 — Concept of OOP using C++ (14 marks)

**A discrepancy worth recording.** The brief describes Unit 2 as covering
*"abstraction, encapsulation, access control, private, interface/class
responsibility"*. In this repository that is **Unit 4** (Abstraction and
Encapsulation) and **Unit 3** (Class and Object). Unit 2 is *Concept of OOP
using C++*: the seven OOP features, applications, structured-vs-OOP, tokens,
data types, I/O, program structure and control statements.

Per the brief's own rule — *treat the repository as the source of truth* —
Unit 2 was audited as it actually is, and this is noted rather than silently
resolved.

| | |
|---|---|
| Already there | 16 topics, 2 diagrams, 4 tables, 4 worked examples, a decision drill, 1 prediction, 4 retrieval questions |
| Named misconception | `cin << a;` instead of `cin >> a;` — the arrows point the wrong way |

**The gap.** Most of the unit is recall, and recall is well served. The one
**procedural** thing it teaches is working out what a program prints — and
Example 4 is titled *"while vs do…while — the difference that gets tested"*,
which is the unit saying out loud where the marks are. It was a worked
example nobody practised.

**Classification: E.** Deliberately **not** a "choose the definition"
exercise, which tests whether a sentence was read.

**Built:** `oop.controlflow`, five rungs. The independent problem is a
`do…while` whose condition is false from the start.

**Why not the program tracer:** the tracer walks one complete program step by
step and shows *how* execution proceeds. This asks the student to predict
*where* it ends up without stepping. Neither replaces the other.

---

## 5 · The transfer rung — why a fifth level was justified

STEP 6 asks for a transfer problem "only if the architecture supports it
cleanly". It did: one entry in the level table, one label, and the ordering
rule the tests enforce grew by one rung.

`independent` asks for the same procedure with no help. `transfer` asks
whether the student can use the **idea** when something has moved:

| Skill | What moves |
|---|---|
| De Morgan | **representation** — from an expression to a NAND *gate*: the same theorem drawn instead of written |
| Addressing mode | **direction of the question** — from an instruction to classify, to a description to name |
| Control flow | **construct** — from `do…while` to a `for` loop with the same numbers and the opposite answer |

The third is the clearest test of the distinction: a student who memorised
"do…while runs at least once" cannot answer it; one who understands
check-before-act can.

**Guarded by test.** A transfer problem sharing more than 80% of its wording
with the independent one fails the suite — that is what "the same question
with different numbers" looks like, and it is the easy mistake to make.

---

## 6 · Examples — audited and largely left alone

STEP 7 asks for classification and explicitly warns against assuming more is
better. Across the 18 units:

| Kind | Count | Verdict |
|---|---|---|
| Explanation / procedural examples | 50 worked examples | **Sufficient.** Phase 6 established these are a progression of *different sub-skills*, not repetitions — fading them would remove the only demonstration of each. |
| Misconception examples | 19 blocks, each with a memory hook | **Sufficient** since Phase 6. |
| Exam-style examples | 64 retrieval questions + 3 quiz banks | **Sufficient.** |
| **Transfer examples** | **0 before this phase** | **The genuine gap** — now 3. |

**No example was added for its own sake, and no prose was padded.** The one
category that was empty is the one that was filled.

---

## 7 · Diagrams and animation — audited, nothing added

STEP 8 asks for animation only where motion carries meaning, and for defects
to be fixed rather than counts increased.

| | |
|---|---|
| Diagram geometry | **55 / 55 clean**, measured after `document.fonts.ready` |
| Animations | **11**, each verified in Phase 6 to reach its final step with a distinct caption per step |
| Running animations at idle | **0**, measured |
| The brief's candidate list | data movement, instruction execution, gate propagation, K-map grouping, normalisation decomposition, ER relationships, SQL execution flow, inheritance, constructor order, stack/queue — **every item already covered** |

**Nothing was animated in this phase, and that is the finding.** The static
diagrams that remain static are reference material — notation sheets,
classification charts, comparison tables — which STEP 8 explicitly says to
leave alone.

---

## 8 · Nepali headings — the largest remaining language gap

Measured across the lesson source:

```
headings                  236
  bare technical terms     49   leave in English — they are the exam's words
  instructional           187
    carrying Nepali        36   (19%)
```

**The distinction that mattered.** Not every heading needs translating. A
heading that is a technical term and nothing else — *"Universal gates"*,
*"SQL View"* — is already the vocabulary a student must recognise in the
paper. Translating it would replace a word they need with one they will never
see again. What needs Nepali is the **instructional language around** the
term.

**151 headings translated**; 4 of them account for 48 instances. Built-page
coverage on unit pages: **19% → 81%**.

---

## 9 · Screen reader — what was actually available

Determined rather than assumed:

| | |
|---|---|
| NVDA | not installed |
| JAWS | not installed |
| `inspect.exe` / `accevent.exe` | not present |
| Narrator | present — **audio only, no transcript API** |
| **UI Automation client** | **loadable** — new information since Phase 5 |

UIA is the API Narrator and NVDA actually consume on Windows. Chromium
exposes only 14 nodes and no document by default, because it enables its
accessibility tree lazily when an assistive client attaches. With
`--enable-features=UiaProvider` in a separate instance on a temporary
profile, the **real platform tree became readable**: 508 nodes, 1 document,
343 text nodes.

Findings in §Screen reader of the completion report. The instance was closed
and its profile deleted; the user's own browser was untouched.

---

## 10 · Priorities, and what was left

| # | Item | Scored on | Done |
|---|---|---|---|
| 1 | Faded practice, dd-u2 | 15 marks, procedural, named misconception, no practice | **Yes** |
| 2 | Faded practice, dd-u5 | 15 marks, lookup table masquerading as an example | **Yes** |
| 3 | Faded practice, u2 | 14 marks, the unit names where the marks are | **Yes** |
| 4 | Transfer rung | STEP 6, architecture supported it cleanly | **Yes** |
| 5 | Nepali headings | seven phases old, largest language gap | **Yes** — 19% → 81% |
| 6 | Screen-reader audit | seven phases deferred | **Partly** — platform tree read for the first time; speech still not heard |
| 7 | More predictions | real but lower value than 1–5 | **No** — Phase 9 |

Item 7 was left deliberately. 18 prediction blocks exist and work; adding
more would have been the easiest thing in the list to do and the least
valuable, and STEP 9 of Phase 7's brief explicitly says not to target a
numerical quota.
