# Phase 7 — Content & Learning-Flow Audit

All 18 authored units across the three flagship subjects, audited against
the twelve questions in the Phase 7 brief §1. Machine-readable structural
data comes from `tests/manual/learning-audit.js`; the judgements below come
from reading the units.

**The metric is not word count and not component count.** Phase 4.5
established that "more content = better" is false and Phase 6 acted on it.
What is reported here is whether a student can *do* the thing the unit
claims to teach, and where they would get stuck.

---

## How to read the classification

Per the brief §5, each gap is one of:

| | |
|---|---|
| **A** | Sufficient — leave it alone |
| **B** | Needs another example |
| **C** | Needs a visual |
| **D** | Needs interaction |
| **E** | Needs guided practice |
| **F** | Needs misconception treatment |
| **G** | Needs exam application |

Priority is scored as **learning impact × exam marks × current weakness ×
interaction opportunity**, the model carried forward from Phase 6 §25.

---

## The headline

Two of the twelve audit questions were answered by the whole platform and
two were answered by nothing:

| Audit question | State before Phase 7 |
|---|---|
| What must the student remember? | **Answered** — 18 memory hooks, 18 exam-focus blocks |
| What should be visualised? | **Answered** — 55 diagrams, all verified geometrically |
| What should be simulated? | **Answered** — 26 mount points, all verified responsive |
| What should require retrieval? | **Answered** — all 64 practice questions gated (Phase 6) |
| What prerequisite knowledge is required? | **Nothing recorded anywhere** |
| What should be revisited later? | **Nothing recorded anywhere** |

Those last two are what Phase 7 built. They are not content gaps — they are
*structural* gaps, and no amount of writing would have closed them.

---

## Prerequisite gaps — the phase's primary finding

Every unit assumed knowledge and no unit said so. The dependencies were
real, unambiguous and completely invisible:

| Unit | Assumed, silently | Consequence for a stuck student |
|---|---|---|
| DBMS 5 Normalisation | keys from Unit 3, the M:N junction from Unit 2 | Cannot apply "partial dependency" without knowing what *part of a composite key* means. Re-reads Unit 5 repeatedly; the gap is in Unit 3. |
| DBMS 4 SQL | relational vocabulary from Unit 3 | Confusing degree with cardinality in Unit 3 becomes confusing SELECT with WHERE in Unit 4. |
| DBMS 7 Recovery | transaction states from Unit 6 | "Redo committed, undo uncommitted" is meaningless without *committed*. |
| Digital 3 K-map | truth tables from Unit 2, Gray order from Unit 1 | Simplification becomes symbol-shuffling with nothing underneath it. |
| Digital 5 Microprocessor | hex from Unit 1, the adder from Unit 4 | Cannot read `2000H` as a place in memory. |
| OOP 5 Inheritance | access specifiers from Unit 3 | Every inheritance answer *is* an access specifier answer. |
| OOP 6 Polymorphism | inheritance from Unit 5 | A base-class pointer cannot exist without inheritance. |
| OOP 4 Abstraction | access specifiers from Unit 3 | Without them, abstraction and encapsulation stay interchangeable words — which is the exact misconception the unit already names. |

**19 edges, 4 entry points, no cycles.** All now declared, all carrying a
reason that names the specific thing to re-read, all rendered on the page
and reachable from a weak revision result.

---

## Per-unit audit

### Digital Design & Microprocessor

| Unit | Primary concept | Strengths | Gaps | Priority |
|---|---|---|---|---|
| **1** Number Systems (7 marks) | Position gives a digit its value | 5 worked examples covering 5 distinct sub-skills; place-value converter; `twosComplement` animated; **faded practice added Phase 6** | **A** — the best-served unit in the product | — |
| **2** Logic Gates (15 marks) | A gate is a rule, and the truth table is the rule written out | Gate workbench, `deMorgan` animated, universal-gate figure | **E** — De Morgan is applied under time pressure in the exam and there is no repeated practice of *applying* it | **High** — 15 marks, the subject's heaviest |
| **3** Boolean / K-map (6 marks) | Adjacency is what makes a group legal | K-map workbench with grouping validation; `simplify` animated | **E** — grouping is procedural and practised only inside the simulator, which does not fade | Medium |
| **4** Combinational Logic (7 marks) | The carry-in is what makes an adder full | 4 diagrams, half/full adder labs, `rippleCarry` animated | **A** | — |
| **5** Microprocessor (15 marks) | The PC points at the next instruction; the IR holds this one | 8085 stepper, `flagRegister`, pin diagram, addressing modes | **E/G** — 15 marks, entirely recall-and-diagram; the stepper demonstrates the fetch cycle but nothing asks the student to *produce* it | **High** — joint-heaviest unit |

### Database Management System

| Unit | Primary concept | Strengths | Gaps | Priority |
|---|---|---|---|---|
| **1** Introduction (5 marks) | The database is the data; the DBMS is the program | 4 diagrams, `dbArchitecture` animated, drill | **A** | — |
| **2** ER Model (8 marks) | A relationship's cardinality decides what it costs in tables | ER visualiser showing notation *and* occurrences, 3 sims | **A** | — |
| **3** Relational Model (8 marks) | Degree counts across, cardinality counts down | Table visualiser, `erToRelational` animated | **B/E** — the ER→relational mapping is a procedure and has one worked example | Medium |
| **4** SQL (11 marks) | A query narrows data in stages | Deepest interaction in the product: real SQL engine, 3 lab mounts, 4 worked examples | **A** | — |
| **5** Normalisation (6 marks) | Each normal form removes exactly one named problem | 2 worked examples, `normalForms` animated, **faded practice added Phase 6** | **A** after Phase 6 | — |
| **6** Transaction (6 marks) | The failure path is half the diagram | Concurrency stepper showing the lost update, `txnStates` animated | **A** | — |
| **7** Backup & Recovery (6 marks) | Backup is the copy; recovery is what you do with it | `recoveryLog` animated, drill | **A** | — |

### DS & OOP with C++

| Unit | Primary concept | Strengths | Gaps | Priority |
|---|---|---|---|---|
| **1** Data Structures (15 marks) | Linear or non-linear, and what each operation costs | **9 diagrams** — the densest visual support in the product; stack/queue simulator | **A** | — |
| **2** OOP + C++ (14 marks) | OOP organises code around the things, not the steps | 16 topics, 4 tables, 4 worked examples, `programAnatomy` | **E** — the broadest unit at 14 marks, and its content is largely *recall* of definitions and tokens | **High** — 14 marks |
| **3** Class and Object (2 marks) | A class is the plan; an object is the thing | `classObject`, `accessSpecifiers`, `ctorDtor` | **A** — 2 marks does not justify more | — |
| **4** Abstraction/Encapsulation (5 marks) | Encapsulation is *how it is hidden*; abstraction is *what is shown* | The unit is built around the confusion itself | **A** | — |
| **5** Inheritance (7 marks) | Construction goes base-first; destruction is the exact reverse | 4 diagrams, `ctorOrder` animated, **faded practice added Phase 6** | **A** after Phase 6 | — |
| **6** Polymorphism (7 marks) | `virtual` matters only through a pointer or reference | `dispatch` animated, overload-resolution figure, predict block | **E** — predicting output through a base pointer is exam-shaped and practised once | Medium |

---

## What the audit found NOT to be a gap

Recorded because the brief asks for content depth and the honest answer in
several places is *nothing is missing*:

- **Word count.** Units average 2,700 words of dense, correct, bilingual
  explanation. Every one has been through Phase 4.5's depth audit and
  Phase 6's contract audit. Adding prose would reduce quality.
- **Diagram count.** 55 diagrams, all verified geometrically at Phase 5,
  all classified static/animated deliberately. Digital Design 4 has four
  diagrams for a 7-mark unit; OOP 1 has nine. Neither needs more.
- **Animation.** 11 animated diagrams, each stepped to its last frame at
  Phase 6. The brief's §7 candidate list — data movement, instruction
  execution, gate propagation, K-map grouping, normalisation
  decomposition, ER relationships, SQL execution flow, inheritance,
  constructor order, stack/queue — is **already covered**, every item.
- **Misconception treatment.** 19 blocks, all specific and exam-relevant,
  all now ending in a memory hook (Phase 6).

---

## Priority list carried into Phase 7 implementation

| # | Item | Scored on | Done |
|---|---|---|---|
| 1 | Prerequisite system | Every unit affected; nothing existed; unblocks the revision paths | **Yes** |
| 2 | Revision intelligence + view | Phase 6 collected the data and showed none of it | **Yes** |
| 3 | "Revise this" paths from a weak result | The difference between a report and a system | **Yes** |
| 4 | Mastery model | Needed by 2 and 3; extensible to a future backend | **Yes** |
| 5 | Faded practice for Digital 2 and 5 (30 marks between them) | Highest remaining exam weight with **E** | **No** — Phase 8 |
| 6 | Faded practice for OOP 2 (14 marks) | Broadest unit, largely recall | **No** — Phase 8 |
| 7 | More predictions where an outcome is observable | Real but lower value than 5 and 6 | **No** — Phase 8 |

Items 5–7 are recorded rather than attempted. Phase 6 established the
declarative pattern that makes each one a content file plus two lines, and
spending Phase 7's remaining capacity on content would have left the
structural work — which no amount of content can substitute for —
half-finished.

---

## The twelve audit questions, answered for the platform as a whole

| | Question | Answer |
|---|---|---|
| 1 | Primary concept | Named per unit above; every unit has exactly one. |
| 2 | What must be remembered | 18 memory hooks + 18 exam-focus blocks. |
| 3 | What must be *done* | 26 simulations, 3 faded practice sequences, 64 gated questions. |
| 4 | Most likely misconception | 19 blocks, each specific and mark-losing. |
| 5 | What should be visualised | 55 diagrams, classified deliberately. |
| 6 | What should be animated | 11, covering every candidate in the brief's list. |
| 7 | What should be simulated | 26 mount points across all three subjects. |
| 8 | What should require prediction | 18 predict blocks — thin; see priority 7. |
| 9 | What should require retrieval | All 64 practice questions (Phase 6). |
| 10 | What should be practised repeatedly | 3 skills faded; 4 more identified (priorities 5–6). |
| 11 | What should be revisited later | **The revision view, new in Phase 7.** |
| 12 | What prerequisite knowledge is required | **19 declared edges, new in Phase 7.** |
