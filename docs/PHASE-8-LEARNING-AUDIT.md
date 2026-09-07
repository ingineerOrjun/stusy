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

---
---

# Phase 8.1 — the second brief

A second Phase 8 brief arrived after the work above had shipped. It
reuses the same three filenames but asks different questions, so this is
appended rather than written over: the record above is still the record
of what was done then.

Its opening instruction was *"Do NOT blindly implement the ideas below.
First inspect the current repository and verify what already exists."*
Doing that first mattered — three of its steps were already built.

---

## 11 · What the brief asked for that already existed

| Asked for | Found | Verdict |
|---|---|---|
| A contrastive "which one is this?" pattern | **8 decision drills** in `sim-drill.js`. `absencap` is literally *"Abstraction or encapsulation?"*, two options, a reason per case | already built |
| Animation where motion carries meaning | 11 animated diagrams, covering every concept on the brief's own candidate list | already built |
| A transfer level in guided practice | the fifth rung, shipped in the first Phase 8 | already built |
| A prerequisite and revision system | Phase 7 | already built |

**Nothing in that column was rebuilt.** What follows is what was
genuinely missing.

---

## 12 · The 18-unit matrix

Measured from source, not carried over from an earlier report. `wex` is
worked examples; `gate` is how many of them ask the student to commit
before the solution appears; `pre` is prediction blocks; `exq` retrieval
questions; `tbl` comparison tables.

| Subject | Unit | hrs | marks | fig | sim | wex | **gate** | pre | exq | tbl | drill | practice | Priority |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| DS & OOP | u1 Data Structure | 20 | 15 | 9 | 1 | 3 | 0 → 1 | 1 | 4 | 2 | — | — | **P0** |
| DS & OOP | u2 OOP concepts | 10 | 14 | 2 | 1 | 4 | 0 → 2 | 1 | 4 | 4 | oopfeature | oop.controlflow | P2 |
| DS & OOP | u3 Class and Object | 7 | 2 | 3 | 1 | 3 | 0 → 1 | 1 | 4 | 1 | accessspec | — | P3 |
| DS & OOP | u4 Abstraction | 7 | 5 | 2 | 1 | 3 | 0 → 1 | 1 | 4 | 1 | absencap | — | P3 |
| DS & OOP | u5 Inheritance | 10 | 7 | 4 | 1 | 4 | 0 → 2 | 1 | 4 | 2 | inhertype | oop.ctororder | P2 |
| DS & OOP | u6 Polymorphism | 10 | 7 | 3 | 1 | 3 | 0 → 2 | 1 | 4 | 1 | — | — | P1 |
| Digital | dd-u1 Number systems | 12 | 7 | 2 | 2 | 5 | 0 → 1 | 1 | 4 | 0 | — | dd.dec2bin | P2 |
| Digital | dd-u2 Logic gates | 14 | **15** | 2 | 2 | 2 | 0 → 2 | 1 | 4 | 1 | — | dd.demorgan | P1 |
| Digital | dd-u3 Boolean and K-map | 10 | 6 | 2 | 1 | 3 | 0 → 1 | 1 | 3 | 0 | — | — | P2 |
| Digital | dd-u4 Combinational | 13 | 7 | 3 | 2 | 2 | 0 → 2 | 1 | 3 | 1 | — | — | P1 |
| Digital | dd-u5 Microprocessor | 15 | **15** | 4 | 1 | 2 | 0 → 2 | 1 | 4 | 1 | — | dd.addressing | P1 |
| DBMS | db-u1 Introduction | 6 | 5 | 3 | 1 | 2 | 0 → 1 | 1 | 3 | 0 | dbterms | — | P3 |
| DBMS | db-u2 ER model | 10 | 8 | 2 | 3 | 2 | 0 → 1 | 1 | 3 | 0 | cardinality | — | P2 |
| DBMS | db-u3 Relational model | 10 | 8 | **0** | 2 | 2 | 0 → 2 | 1 | 3 | 0 | — | — | **P0** |
| DBMS | db-u4 SQL | 14 | 11 | 3 | 3 | 4 | 0 → 2 | 1 | 4 | 0 | — | — | **P0** |
| DBMS | db-u5 Normalization | 8 | 6 | **0** | 1 | 2 | 0 → 1 | 1 | 3 | 0 | normalforms | db.normalform | P1 |
| DBMS | db-u6 Transactions | 8 | 6 | 1 | 1 | 2 | 0 → 1 | 1 | 3 | 0 | — | — | P2 |
| DBMS | db-u7 Backup and recovery | 8 | 6 | 1 | 1 | 2 | 0 → 1 | 1 | 3 | 0 | recovery | — | P2 |

**Three units are P0 and fifteen are not**, which is the point of a
priority scale.

- **u1** — 20 hours and 15 marks, the largest unit in the product, with
  no drill and no faded practice. Its *visual* support is the best
  anywhere (9 diagrams); what a student cannot do in it is practise.
- **db-u3** — 10 hours, 8 marks, **zero diagrams and zero tables**, in
  the unit whose whole subject is tables. The lowest support-to-weight
  ratio measured.
- **db-u4** — 14 hours, 11 marks, no drill, no faded practice. It is
  carried by the SQL simulator, which is genuinely strong, and that is
  why it is P0 and not worse.

### Two patterns visible in the matrix that no single unit shows

1. **Predictions are uniform at exactly one per unit** — 18 units, 18
   prediction blocks. A 5-mark unit and a 15-mark unit get identical
   provision. That is the signature of a quota met rather than a need
   served.
2. **Comparison tables and decision drills are almost perfectly
   disjoint.** All 14 tables are in Digital Design and OOP; all 4 DBMS
   drills sit in units with **no** table. The contrast material and the
   contrast practice are in different subjects.

---

## 13 · The finding that drove the work: 0 of 50

Every worked example was measured individually:

```
worked examples                                 50
  a mechanism hides the solution                 0
  the prose says "predict", nothing hides it     2
  no ask at all                                 48
```

**Not one worked example asked the student to commit to anything.**
Question and full solution were on screen together, so the eye reaches
the answer before the mind reaches the question.

The two in the middle row are worse than the 48:

- `u5` Example 4 is *titled* **"Proving the order — predict this output
  before you read it"**, with the output three lines below it.
- `db-u3` Example 2 says to decide before looking, and shows the answer
  immediately.

The instruction was there; the mechanism was not. A student who obeys it
and a student who ignores it see exactly the same page.

**After this phase: 26 gated, 24 deliberately open, 0 broken promises.**

### Why 24 stay open

The obvious implementation hides all 50, and it is wrong. A student who
has never seen `class Box { … };` cannot predict it, and hiding it only
puts a click between them and what they came to read. The rule applied:
**gate an example when the student can produce a determinate answer;
leave it open when it is the first demonstration of a notation, a syntax
or a procedure.**

| Left open | Why |
|---|---|
| dd-u1 Ex1–Ex3, dd-u3 Ex1 and Ex3 | first demonstration of a conversion or K-map method |
| u1 Ex1–Ex2, u2 Ex2, u3 Ex1–Ex2, u4 Ex1–Ex2, u5 Ex1 and Ex3, u6 Ex2 | C++ syntax shown for the first time |
| db-u4 Ex2 and Ex4 | free-form production ("write a CREATE TABLE"), which the retrieval gate already handles better |
| db-u1 Ex1, db-u2 Ex1, db-u5 Ex1, db-u7 Ex1 | the unit already drills exactly this decision |

---

## 14 · Content defects found while doing it

Four. None would have been caught by any test or build rule that existed.

| Where | Defect |
|---|---|
| `u2` Example 1 | claims the line has **"eight tokens"** and then enumerates **seven**. `int sum = a + 25;` has seven. Fixed in both languages. |
| `u6` Example 3 | titled *"the exam's favourite trick"*, with the trick given away by its own code comment: `// prints "Base show"  <-- surprising!`. The comment now states the setup, not the answer. |
| `db-u6` | **two worked examples both numbered "Example 1"**, so "see Example 1" pointed at two different things. Renumbered, and a build rule added so it cannot recur. |
| `dd-u5` Example 1 | instructions and answers shared one block — which is why the earlier audit called it *"a lookup table masquerading as an example"*. Split into question and answer so it could be gated. |

---

## 15 · All 55 diagrams, classified

The earlier report asserted this classification. It was never produced.
Here it is, measured.

| | Count | What they are |
|---|---|---|
| **Animated** | **11** | motion carries the meaning: `dbArchitecture`, `erToRelational`, `normalForms`, `txnStates`, `recoveryLog`, `twosComplement`, `deMorgan`, `simplify`, `rippleCarry`, `ctorOrder`, `dispatch` |
| **Static reference** | **44** | notation sheets, classification trees, comparison pictures, structural drawings |
| **Unused** | **0** | every diagram is embedded in a lesson |

Per subject: DBMS 15 (5 animated), Digital Design 17 (4 animated),
DS and OOP 23 (2 animated) — 55 in total.

The classification also surfaced a **consistent architecture nobody had
written down**: all 11 animated diagrams are embedded *bare*, because
they caption themselves one line per step; all 44 static ones are
wrapped in `<figure class="fig">` with a bilingual `<figcaption>`. The
split is exact — 11 bare, 44 framed, no exceptions either way.

**Nothing was animated in this phase either**, for the same reason as
before: every concept on the brief's candidate list is already covered,
and the diagrams that stay static are the reference material a student
revises from.

> **A tool phantom, caught before it was reported.** The first run of the
> classifier said `baseTable` was authored but embedded nowhere. It is
> embedded — dd-u1, line 59. The scanner captured a 400-character window
> *inside* its own match, which advances the regex past any second
> diagram within that window. The measurement was wrong, not the
> repository.

---

## 16 · What was left, and why

| Item | Status |
|---|---|
| Prediction density on the heavy units | **Not done.** Real — one block per unit regardless of weight — but the gating work serves the same need in the same units, and adding predictions on top would have raised a count rather than the learning. Recorded for the next phase. |
| A comparison table for the four DBMS drill units | **Not done.** The drills work without one. The disjointness is a finding, not yet a defect. |
| Faded practice for u1, db-u3 and db-u4 | **Not done.** These are the P0s, and each is a content build the size of the three delivered in the first Phase 8 — not something to start at the end of a phase and leave half-finished. |
| Diagrams for db-u3 and db-u5 | **Not done**, and it is the clearest single gap left: two units carrying 14 marks between them with no diagram and no table. |
