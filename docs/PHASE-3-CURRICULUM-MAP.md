# Phase 3 — Curriculum Map

**Subject:** Digital Design and Microprocessor
**Grade:** 10 · Credit hrs 4 · Working hrs 128 · Theory hrs 64 · Written exam 50 marks
**Source of truth:** *Curriculum: Computer Engineering Grade 9–12*, Curriculum
Development Centre Nepal, 2078 — pages 68–76 of the official PDF.

This document is the completeness contract for the subject. Every prescribed
content item below has an explicit destination. A topic with no destination is a
gap, and the build's syllabus check is what stops one appearing silently.

---

## 1. How the syllabus was read

The subject appears **three times** in the curriculum document, and the three
lists differ slightly. They were reconciled as follows.

| Where | What it gives | Weight given here |
| --- | --- | --- |
| §3 Grade-wise learning outcomes (p. 69–70) | verbs — *introduce, describe, demonstrate* | sets the depth expected per topic |
| §4 Scope and sequence of contents (p. 71–72) | the numbered content list + hours | **authoritative for what must be covered** |
| Specification grid (p. 76) | marks per unit | sets how much lesson weight each unit earns |

`_source/content/syllabus.js` was checked item by item against §4 and is a
faithful transcription. It is unchanged by this phase.

### Hours and marks

| Unit | Content area | Hrs | Marks |
| --- | --- | --- | --- |
| 1 | Number system and Binary arithmetic operations | 12 | 7 |
| 2 | Concept of logic gates | 14 | 15 |
| 3 | Boolean algebra and Karnaugh Map | 10 | 6 |
| 4 | Binary arithmetic and Combinational Logic | 13 | 7 |
| 5 | Introduction to Microprocessor and its components | 15 | 15 |
| | **Total** | **64** | **50** |

Hours are verified by the build (a subject must total exactly 64). Marks are
read from the specification grid and total exactly 50.

**Units 2 and 5 carry 30 of the 50 marks between them.** They get the deepest
treatment and the flagship interactions. Unit 1 is 12 hours for only 7 marks —
it is foundational rather than heavily examined, so it is taught thoroughly but
its exam section stays proportionate.

### Documented ambiguities

These are recorded rather than silently resolved.

| # | Ambiguity | Resolution | Justification |
| --- | --- | --- | --- |
| **A1** | Unit 3 is titled *"Boolean algebra and **Karnaugh Map**"*, and competency 3 is *"Demonstrate necessity of Boolean algebra and Karnaugh map in digital system"* — but the numbered content list 3.1–3.4 never mentions the K-map. | **K-map is taught.** | The unit title and the competency both name it. A student sitting a paper on "Boolean algebra and Karnaugh Map" can be asked about K-maps. Omitting it because of a gap in one of three lists would be the riskier reading. It is placed after algebraic simplification, as the visual alternative to it. |
| **A2** | §3 numbers De Morgan's theorem as "3. Describe De-Morgan's theorem" inside content area 2, while §4 numbers it "3.1" — also inside unit 2. | **Taught in Unit 2.** | Both lists place it in the logic-gates unit; only the numbering is inconsistent. |
| **A3** | §4 lists "5.7" twice — once for "8085 bus structure and internal architecture" and once for "Pin configuration of 8085" — so the unit-5 numbering runs 5.1…5.9 while §3 runs 5.1…5.10. | **Both topics taught; §3's 5.1–5.10 numbering used.** | The duplicate is a typographical slip. No content is lost either way. |
| **A4** | "Code converters" (4.6) is not specified further. | **Binary↔Gray and BCD↔binary taught.** | These are the two converters universally taught at this level and the two that appear in SEE-style papers. Recorded so a reviewer can widen it. |
| **A5** | "Types of Microprocessor" (5.2) is not specified further. | Taught as **bit-width / instruction-set / application classes**, with 8085 as the worked example the rest of the unit uses. | The syllabus fixes 8085 as the studied device (5.7–5.9), so the typology is framed to lead into it. |

---

## 2. Unit → topic → treatment

Visual treatment uses the Phase 2.5 hierarchy: **static → animated →
interactive → simulation**. The level is chosen by what the student must *do*
with the idea, not by what is technically possible.

- **Static** — a spatial fact, a taxonomy, or something to memorise and redraw in the exam.
- **Animated** — a process whose *order* or *movement* is the lesson.
- **Interactive** — the student changes an input and must see the consequence.
- **Simulation** — the student experiments freely and forms a rule from it.

### Unit 1 — Number System and Binary Arithmetic Operations · 12 hrs · 7 marks

| § | Prescribed content | Treatment | Practice | Exam relevance |
| --- | --- | --- | --- | --- |
| 1.1 | Numbering concept | **Static** — positional value bar | worked example | definition, place value |
| 1.2 | Types: decimal, binary, octal, hexadecimal | **Static** — one comparison table, base/digits/example | exam question | "list the number systems" |
| 1.2.1–1.2.4 | Each system in turn | Static, folded into 1.2 | — | short question |
| 1.3.1 | Decimal integer → binary, binary → decimal | **Interactive** — base converter with the division-remainder trace | prediction + worked ×2 | **conversion is asked every year** |
| 1.3.2 | Decimal fractions → binary | **Animated** — repeated ×2, carry out the integer part | worked example | short/long question |
| 1.3.3 | Octal ↔ decimal | **Static** worked examples; the converter covers it interactively | worked example | short question |
| 1.4 | 1's complement | **Interactive** — flip bits, see the result | worked example | definition + compute |
| 1.5 | 2's complement | **Animated** — invert, then add 1, in two visible stages | worked example | **definition + compute + why** |
| 1.6 | Binary addition | **Simulation** — column adder with visible carry | prediction | compute |
| 1.7 | Binary subtraction | **Simulation** — borrow method and the 2's-complement method side by side | worked example | compute, "why 2's complement" |
| 1.8 | Binary multiplication | **Static + worked** — shift-and-add | worked example | compute |

*Learning objectives:* convert between all four bases in both directions;
compute 1's and 2's complement; add, subtract and multiply binary numbers; and
explain why 2's complement lets one adder circuit also subtract.

### Unit 2 — Concept of Logic Gates · 14 hrs · 15 marks — **representative unit**

| § | Prescribed content | Treatment | Practice | Exam relevance |
| --- | --- | --- | --- | --- |
| 2.1 | Notations | **Static** — symbol / expression / truth-table notation chart | — | "draw the symbol" |
| 2.2 | Concept of gate and truth table | **Interactive** — the gate workbench: toggle A and B, the signal path and the output change, and the matching truth-table row highlights | prediction | **core of the unit** |
| 2.2.1 | Inverter (NOT) | Interactive — same workbench | exam question | symbol, table, expression |
| 2.2.2 | OR gate | Interactive | exam question | symbol, table, expression |
| 2.2.3 | AND gate | Interactive | exam question | symbol, table, expression |
| 2.2.4 | NOR gate | Interactive | exam question | symbol, table, expression |
| 2.2.5 | NAND gate | Interactive | exam question | symbol, table, expression |
| 2.2.6 | Universal gates | **Interactive** — build NOT, AND, OR out of NAND only, and see the truth table match | worked example | **"why is NAND called universal"** |
| 2.3 | De Morgan's theorem | **Animated** — the bubble migrates and the gate changes shape; both circuits then prove equal by truth table | worked example + prediction | **statement, proof by table, application** |

*Learning objectives:* draw and name every basic gate; write its Boolean
expression; complete its truth table from the definition; explain why NAND and
NOR are universal; state and prove both De Morgan laws.

### Unit 3 — Boolean Algebra and Karnaugh Map · 10 hrs · 6 marks

| § | Prescribed content | Treatment | Practice | Exam relevance |
| --- | --- | --- | --- | --- |
| 3.1 | Boolean relationships and simplification | **Static** — the law table, grouped by what each law lets you do | worked example | "state the laws" |
| 3.2 | Sum of Products (SOP) | **Static + worked** — truth table → minterms → SOP | worked example | **write SOP from a table** |
| 3.3 | Product of Sums (POS) | **Static + worked** — the dual route through maxterms | worked example | write POS from a table |
| 3.4 | Algebraic simplification | **Animated** — one law applied per step, named at each step | prediction | **simplify this expression** |
| — | Karnaugh map (ambiguity **A1**) | **Interactive** — fill cells, select a group, the tool judges whether the group is legal and shows the term it produces | worked example | **simplify using K-map** |

*Learning objectives:* state and apply the Boolean laws; convert a truth table
to SOP and POS; simplify algebraically with each step justified; simplify a
2- and 3-variable expression with a K-map and say why a group is or is not valid.

### Unit 4 — Binary Arithmetic and Combinational Logic · 13 hrs · 7 marks

| § | Prescribed content | Treatment | Practice | Exam relevance |
| --- | --- | --- | --- | --- |
| 4.1 | Half adder | **Interactive** — toggle A and B; circuit, SUM, CARRY and the truth-table row move together | prediction | **circuit + table + expression** |
| 4.2 | Binary adder | **Animated** — carry rippling through a 4-bit adder | — | block diagram |
| 4.3 | Half subtractor | **Interactive** — same workbench, DIFFERENCE and BORROW | exam question | circuit + table |
| 4.4 | Full adder | **Interactive** — three inputs including carry-in | worked example | **circuit + table + expression** |
| 4.5 | Full subtractor | **Static + table** | exam question | table |
| 4.6 | Code converters (ambiguity **A4**) | **Static + worked** — binary↔Gray, BCD | worked example | convert |
| 4.7 | Decoder | **Interactive** — n inputs light exactly one of 2ⁿ outputs | — | block diagram + table |
| 4.8 | Encoder | **Static + table** — the inverse | exam question | block diagram |
| 4.9 | Multiplexer | **Interactive** — the select line visibly routes one input to the output | prediction | **block diagram + "many to one"** |
| 4.10 | Demultiplexer | **Interactive** — one to many | exam question | block diagram |

*Learning objectives:* draw and explain half/full adder and subtractor; derive
each from its truth table; convert between binary, Gray and BCD; state what a
decoder, encoder, MUX and DEMUX each do and where each is used.

### Unit 5 — Introduction to Microprocessor and its Components · 15 hrs · 15 marks

| § | Prescribed content | Treatment | Practice | Exam relevance |
| --- | --- | --- | --- | --- |
| 5.1 | Definition and applications | **Static** | exam question | **definition — asked directly** |
| 5.2 | Types of microprocessor (ambiguity **A5**) | **Static** — classification table | exam question | list and classify |
| 5.3 | Input / output | **Static** — in the system block diagram | — | block diagram |
| 5.4 | Memory | **Static** — memory map, and how the address bus reaches it | exam question | address-bus size ↔ memory size |
| 5.5 | Processing unit | **Static** — CPU block diagram | exam question | **draw the block diagram** |
| 5.6 | ALU, control unit, registers | **Animated** — a value travels memory → register → ALU → register | exam question | function of each block |
| 5.7 | 8085 bus structure and internal architecture | **Static** (the diagram to redraw) **+ animated** bus traffic | worked example | **draw and label — high value** |
| 5.8 | Pin configuration of 8085 | **Static** — 40 pins grouped by function, not listed flat | exam question | name the pin groups |
| 5.9 | Registers, flags, data and address bus, timing and control, interrupts | **Static + interactive** flag register: run an operation, watch which flags set | exam question | **flag meanings, interrupt names** |
| 5.10 | Addressing modes | **Interactive** — pick a mode, see where the operand actually comes from | worked example | name and give an example of each |
| — | Instruction cycle | **Simulation** — FETCH → DECODE → EXECUTE → STORE with Prev / Next / Reset | prediction | **explain the instruction cycle** |

*Learning objectives:* define a microprocessor and list applications; name and
describe every block of the 8085; state the width and purpose of the data and
address buses; name the flags and say when each sets; name the interrupts;
explain the instruction cycle in order; identify the addressing mode of an
instruction.

The instruction cycle is not a numbered content item, but 5.6, 5.7 and 5.9
cannot be explained without it — it is the process that gives those blocks a
reason to exist. It is taught as the spine of the unit rather than as an
addition to the syllabus.

---

## 3. Coverage check

| Unit | Prescribed items (§4) | Items with a destination | Uncovered |
| --- | --- | --- | --- |
| 1 | 12 | 12 | 0 |
| 2 | 9 | 9 | 0 |
| 3 | 4 (+ K-map per A1) | 5 | 0 |
| 4 | 10 | 10 | 0 |
| 5 | 10 | 10 (+ instruction cycle) | 0 |

Nothing prescribed is omitted, and nothing substantial is added beyond the
K-map (A1, justified by the unit title) and the instruction cycle (needed to
teach 5.6/5.7/5.9).

## 4. What is deliberately *not* included

The syllabus is a Grade 10 introduction. These are commonly found in
microprocessor and digital-logic texts and are **out of scope**:

| Excluded | Why |
| --- | --- |
| Sequential logic — flip-flops, counters, registers as storage | Not in any of the three lists. Unit 4 is explicitly *combinational* |
| 8085 instruction set / assembly programming | 5.10 asks only for an *introduction to addressing modes* |
| Timing diagrams with T-states | 5.9 asks for a *description* of timing and control, not waveform analysis |
| Quine–McCluskey, 5- and 6-variable K-maps | Beyond an introduction; 2–4 variables is the examinable range |
| Floating-point representation (IEEE 754) | 1.3.2 asks only for decimal fractions → binary |
| Semiconductor physics, transistor-level gate construction | Belongs to Fundamentals of Electro-System (Grade 9) |

---

## 5. Cross-references

- Language presentation of all of the above: [LANGUAGE-SYSTEM.md](LANGUAGE-SYSTEM.md)
- Visual treatment decisions per diagram: [DIGITAL-DESIGN-DECISIONS.md](DIGITAL-DESIGN-DECISIONS.md)
- Content model this subject plugs into: [CONTENT-ARCHITECTURE.md](CONTENT-ARCHITECTURE.md)
- Visualization hierarchy: [VISUALIZATION-ARCHITECTURE.md](VISUALIZATION-ARCHITECTURE.md)
- Question tagging: [ASSESSMENT-ARCHITECTURE.md](ASSESSMENT-ARCHITECTURE.md)
