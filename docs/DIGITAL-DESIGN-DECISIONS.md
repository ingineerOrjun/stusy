# Digital Design & Microprocessor — Decisions

Why this subject is built the way it is. Curriculum coverage is in
[PHASE-3-CURRICULUM-MAP.md](PHASE-3-CURRICULUM-MAP.md); this file records the
choices behind it.

---

## 1. Visual treatment, per concept

The Phase 2.5 hierarchy is **static → animated → interactive → simulation**. The
level is chosen by what the student has to *do* with the idea, not by what is
technically possible. Every choice below was made against one question:

> Would a student understand this faster if they could change it, watch it, or
> just look at it?

### Interactive — the student changes an input and must see the consequence

| Component | Concept | Why interactive rather than animated |
| --- | --- | --- |
| **Gate workbench** (`sim-gates.js`) | 2.2 — gates and truth tables | A truth table is a **lookup, not a process**. A student learns a lookup by querying it. An animation of all four rows would teach the order of the rows, which is not the lesson. |
| **Place-value converter** (`sim-number.js`) | 1.2, 1.3 — bases | Base conversion is a rule to **apply**. A student who switched bit 5 on and saw 32 appear has learned the place value; one who watched an animation has seen a number move. |
| **K-map workbench** (`sim-kmap.js`) | 3 — Karnaugh map | Grouping is a **judgement** the student must make and be corrected on. Showing the right answer teaches nothing about why the wrong one was wrong. |
| **Combinational workbench** (`sim-comb.js`) | 4.1, 4.3, 4.4, 4.9 | Several outputs from the same inputs. The comparison — half adder vs half subtractor on identical inputs — is only available if the student controls the inputs. |

### Animated — the *order* or the *movement* is the lesson

| Diagram | Concept | Why the order matters |
| --- | --- | --- |
| **`twosComplement`** | 1.5 | Invert, *then* add 1. Students who do it in one step get the 1's complement and think they are finished. The two stages must be separated in time. |
| **`deMorgan`** | 2.3 | The bubble migrating from the output to the inputs, and the gate changing shape, is a transformation. A still picture of both circuits asserts they are equal; the animation shows the move that makes them equal. |
| **`simplify`** | 3.4 | One law per step, named. Exam marks come from the named steps, so the steps are what is shown. |
| **`rippleCarry`** | 4.2 | The carry *arriving* is why the adder is slow. A still diagram of four adders in a row cannot show waiting. |

### Simulation — the student experiments and forms a rule

| Component | Concept | Why |
| --- | --- | --- |
| **Binary column adder** (`sim-number.js`) | 1.6 | The carry exists only *between* two columns. Stepping is the only way to see it produced and then consumed. |
| **8085 instruction cycle** (`sim-8085.js`) | 5.6–5.9 | The blocks in the syllabus only make sense as things that *do* something during a cycle. Running one real instruction through the real blocks is what connects the block diagram to its purpose. |

### Static — deliberately not animated

| Diagram | Why static is better |
| --- | --- |
| `gateSymbols` | Shapes to memorise and redraw in the exam. Motion would actively hinder that. |
| `baseTable`, `boolLaws`, `addressModes`, `combBlocks` | Reference tables. A student looks things up in them; they do not have a beginning and an end. |
| `placeValue`, `sopPos`, `grayCode`, `halfAdder` | Spatial facts and side-by-side comparisons. Motion would split attention across two things that need to be seen together. |
| `cpuBlocks`, `pins8085` | The diagrams the exam asks students to reproduce. They need to look like the thing that goes on the page. |

**12 of 16 new diagrams are static.** Across the whole library, 32 of 38 are
static — asserted by a test as a ratio rather than a count, so it keeps meaning
something as the library grows.

## 2. Components built, and one that was not

`sim-comb.js` is a **separate component** from `sim-gates.js` rather than a mode
of it. The gate workbench answers "what does *this gate* do with these inputs".
A half adder asks a different question: "what do *several outputs* do at once,
and which gate produced each one". The gate lab's single output lamp cannot
express that, and stretching it to would make both worse.

What *is* shared is the vocabulary — the same gate outlines, the same wire
states, the same truth-table row highlight, the same explain line, the same CSS
classes. A student who learned the gate lab already knows the combinational one.

**No animation library was added.** Every animated diagram uses the Phase 2.5
`DiagramRuntime` and `MotionService`; every interactive component is plain
classes over the existing state language. Dependencies remain zero.

## 3. Truth tables are generated, never typed

Every truth table in the subject is computed from the same function that drives
the diagram beside it:

```js
AND: { f: function (a, b) { return a && b ? 1 : 0; } }
```

The table, the output lamp and the highlighted row all read that one function.
A hand-written table drifting out of step with its circuit is the classic bug in
this kind of lesson, and this makes it structurally impossible.

`tests/circuits.test.js` then checks those functions against the **arithmetic
they claim to perform** — not against a copy of the same table:

- the half adder against `a + b`
- the full adder against `a + b + carry`
- the half subtractor against `a − b`
- the multiplexer against the input its select lines name
- NAND and NOR against NOT-of-AND and NOT-of-OR
- De Morgan's laws against the implemented gates

## 4. The K-map judges, it does not score

The brief was explicit: not a superficial click game. So the four rules are
checked for real, and a rejection **names the rule that was broken**:

| Rule | Checked by |
| --- | --- |
| 1 — only 1s | membership test against the map |
| 2 — size is a power of two | `n & (n-1)` |
| 3 — a rectangle, edges wrapping | distinct rows × distinct columns, each contiguous on a ring |
| 4 — as large as possible | try doubling the rectangle in each direction and see if it still holds only 1s |

Rule 4 is the one that matters pedagogically. A pair inside an available group
of four is legal by rules 1–3 and still the wrong answer, because the mark is
for *simplifying*. The tool says exactly that.

Verified in `tests/kmap.test.js` against known answers, including the two cases
students never believe: **left and right edges are neighbours**, and **the four
corners of a 4-variable map are one group**.

## 5. Terminology

Decisions that will apply to every future subject, so they are recorded here
rather than left to each author.

| Term | In Nepali prose | Why |
| --- | --- | --- |
| Logic gate, AND, OR, NOT, NAND, NOR, XOR | kept in English, transliteration given once at first use (`एन्ड`, `अर`) | The exam prints them in English. The transliteration teaches pronunciation without replacing the term. |
| Truth table | `ट्रुथ टेबल` | Universally used in Nepali classrooms in this form. |
| Multiplexer, Decoder, Encoder, Accumulator | kept in English | No settled Nepali term, and inventing one would leave the student unable to read the question paper. |
| Base / radix | `base` kept, with `आधार` never used | "base" appears in the question paper. |
| Binary, octal, hexadecimal | kept in English | Same reason. |
| Carry, borrow, sum, difference | `क्यारी`, `borrow`, `जोड`, — mixed | Carry is transliterated because it is said aloud constantly; sum and difference have natural Nepali words that read better in a sentence. |
| Register, flag, bus, interrupt | kept in English | These are the words on the exam paper and on every datasheet. |
| Numbers in explanatory prose | Devanagari digits where the sentence is prose (`चार`, `१२`); **Latin digits inside any expression, address or bit pattern** | `1011` must never render as `१०११` — a student copying it into an answer would be wrong. |

The last row is the rule most likely to be broken by a future author, and it is
the one with the worst consequence.

## 6. Content decisions

| Decision | Reason |
| --- | --- |
| **XOR is taught in Unit 2** although the numbered list stops at NAND | The SUM output of a half adder (4.1) *is* an XOR gate. Springing it on the student in Unit 4 would be worse than introducing it with the other gates. Flagged in the lesson as an addition. |
| **The instruction cycle leads Unit 5** although it is not a numbered item | Items 5.6, 5.7 and 5.9 describe blocks. Blocks with no process to belong to are a list to memorise. The cycle is the process that gives them a reason to exist. |
| **The 8085 simulation compresses FETCH after the first instruction** | The first instruction shows the address going out and the instruction coming back as two steps, because that is worth seeing once. Repeating it three times would be padding. **Stated in the lesson** so a student is not confused by the change. |
| **Unit 1 is thorough but its exam section is short** | 12 hours, 7 marks. It is the foundation the subject stands on, not a heavily examined topic. Teaching it lightly would break Units 2–4; over-drilling it would misdirect revision. |
| **No past papers are reproduced** | Every question is labelled "Practice question". Nothing is presented as an official past question, because that claim cannot be verified from the curriculum document. |
| **Marks per unit come from the specification grid** | Not estimated. The build fails if the page map's marks do not total 50, or its hours do not match the syllabus outline. |

## 7. Deliberately out of scope

| Excluded | Why |
| --- | --- |
| Flip-flops, counters, sequential logic | Not in any of the three syllabus lists. Unit 4 is explicitly *combinational*. |
| 8085 assembly programming | 5.10 asks for an *introduction to addressing modes*, not programming. |
| Timing diagrams with T-states | 5.9 asks for a *description* of timing and control, not waveform analysis. |
| Quine–McCluskey, 5- and 6-variable K-maps | Beyond an introduction; 2–4 variables is the examinable range. |
| IEEE 754 floating point | 1.3.2 asks only for decimal fractions to binary. |

## 8. Known limitations

| Limitation | Effect |
| --- | --- |
| The K-map tool covers 2, 3 and 4 variables only | Matches the examinable range; a 5-variable map would need a different layout |
| The 8085 model implements three instructions | Enough to show the cycle and the flags; it is not an emulator and does not claim to be |
| Don't-care conditions (X) are not supported in the K-map | Not in the syllabus content list; would be the first extension if it were |
| The full subtractor is static only | The workbench covers half adder, full adder, half subtractor and MUX; the full subtractor is given as a table and expressions |
| No screen-reader testing | **WCAG 2.1 AA is not claimed.** Carried over from Phase 2 |
