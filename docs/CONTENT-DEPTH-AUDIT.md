# Content-Depth Audit — Phase 4.5

An audit of whether a student can actually **understand** each concept, as
distinct from whether a page is structurally complete. Every unit of all three
authored subjects, concept by concept.

Measured from the repository at commit `4419060`, branch `phase-4-dbms`, working
tree clean. Nothing here is carried over from an earlier report.

---

## 1. Baseline, verified independently

| | Measured |
| --- | --- |
| Tests | **286 pass, 0 fail** |
| Build | clean, **zero warnings** |
| Tree dirty after rebuild | **0 files** |
| Pages | 36 (34 student + 2 internal) |
| Authored subjects | 3 — OOP with C++, Digital Design, DBMS |
| Authored unit pages | 18 units + 3 quizzes + 2 reference pages |
| Diagrams | **53** — 42 static, 11 animated, **0 unused** |
| Simulation modules | 12, mounted in **23** places |
| Worked examples | 49 |
| Exam questions with model answers | 65 |
| Quiz-bank questions | 121 |
| Predictions | 15 |

---

## 2. THE HEADLINE FINDING

**The first flagship subject is the weakest, and nobody had gone back to look.**

Phase 4.1 found four DBMS units read-only and fixed them. The same check was
never run against OOP with C++, which was authored first, to an earlier
standard.

| Subject | Units with an interaction | Units with a prediction |
| --- | --- | --- |
| DBMS | **7 of 7** | 7 of 7 |
| Digital Design | **5 of 5** | 5 of 5 |
| **OOP with C++** | **2 of 6** | **2 of 6** |

Four OOP units — `u2`, `u3`, `u4`, `u5` — load only `snippets.js` (syntax
colouring). They have **no simulation and no prediction of any kind**.

```
                    marks   READ            SEE        DO   PREDICT
u2  OOP concepts      14    ##################  #######   0      0
u3  Class and Object   2    ##############      ####      0      0
u4  Abstraction        5    #############       ###       0      0
u5  Inheritance        7    ###############     #####     0      0
                     ----
                       28  of the subject's 50 marks
```

**28 of 50 marks (56%) of the OOP subject is read-only.** `u2` alone carries 14
marks — the second-highest-weighted unit in the subject — and a student can do
nothing on it but read.

This is the single largest learning gap in the product and the main work of
this phase.

---

## 3. A correction to this audit's own first pass

The first detector reported **19 thin topics**. It was wrong, and acting on it
would have meant padding topics that were already fine — precisely what §4 of
the brief warns against.

It counted only `{{dia:}}` references as visual support, so it missed:

- `u2 2.2 Features of OOP` — has an **8-card grid** of the OOP features
- `u6 Overloading vs Overriding` — has a **real comparison table**
- every `.out` code block and `.cpp` snippet

With visual support counted honestly — diagrams, card grids, tables and code
blocks — the real number is **7**, and only **2 of those are worth fixing**.

Recorded because the difference between 19 and 7 is the difference between
improving the product and bloating it.

---

## 4. Concept matrix

`STRONG` · `ADEQUATE` · `THIN` · `—` (not needed for this concept)

A dash is not a failure. A definition needs an explanation and a summary; it
does not need a simulator. Status is a judgement about **whether the student
can understand the concept**, not a count of filled columns.

### OOP with C++

| Unit | Concept | Words | Visual | Example | Interact | Predict | Misconception | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| u1 | 1.1–1.4 What/why data structures | 594 | — | — | — | — | — | **ADEQUATE** — intro prose, correctly READ |
| u1 | 1.5 Classification | 1989 | STRONG | STRONG | — | — | ADEQUATE | **STRONG** |
| u1 | 1.6 Operations | 251 | — | ADEQUATE | — | — | — | ADEQUATE |
| u1 | Stack vs Queue experiment | 296 | — | — | ADEQUATE | ADEQUATE | — | **STRONG** |
| u2 | 2.1 What is OOP | 297 | ADEQUATE | — | — | — | — | ADEQUATE |
| u2 | **2.2 Features of OOP** | 292 | ADEQUATE (8 cards) | — | **—** | **—** | — | **THIN — 14-mark unit, no way to test recall** |
| u2 | **2.4 Structured vs OOP** | 212 | — | — | **—** | **—** | — | **THIN — a comparison asked most years** |
| u2 | 2.5 Tokens · 2.8 Structure · 2.9 Control | 951 | ADEQUATE | STRONG | — | — | ADEQUATE | STRONG |
| u2 | 2.6 Data types · 2.7 I/O | 263 | — | — | — | — | — | ADEQUATE — reference material |
| u3 | 3.1 Class and Object | 279 | ADEQUATE | — | — | — | — | ADEQUATE |
| u3 | **3.2 Access Specifiers** | 233 | ADEQUATE | — | **—** | **—** | ADEQUATE | **THIN — the rule is a lookup students must apply** |
| u3 | 3.3 Declaring a class | 363 | — | STRONG | — | — | ADEQUATE | STRONG |
| u3 | 3.5 Constructor and Destructor | 559 | ADEQUATE | ADEQUATE | — | — | ADEQUATE | STRONG |
| u4 | 4.1 Abstraction | 729 | ADEQUATE | STRONG | — | — | — | STRONG |
| u4 | 4.4 Encapsulation | 427 | ADEQUATE | ADEQUATE | — | — | — | STRONG |
| u4 | **The difference students always get wrong** | 218 | — | — | **—** | **—** | ADEQUATE | **THIN — the unit's named misconception, with nothing to test it** |
| u5 | **5.1 What is Inheritance?** | 417 | **—** | — | **—** | **—** | ADEQUATE | **THIN — the unit's core concept, 417 words, no visual** |
| u5 | 5.4 Syntax | 325 | ADEQUATE | ADEQUATE | — | — | ADEQUATE | STRONG |
| u5 | **5.5 Types of Inheritance** | 580 | ADEQUATE | STRONG | **—** | **—** | — | **ADEQUATE — the identification task is untested** |
| u5 | Constructor/destructor order | 207 | ADEQUATE | ADEQUATE | — | — | ADEQUATE | STRONG |
| u6 | 6.1 What is Polymorphism | 194 | — | — | — | — | — | ADEQUATE — 6.4 diagram follows immediately |
| u6 | Overloading / Overriding | 988 | STRONG | STRONG | — | — | ADEQUATE | STRONG |
| u6 | Which function actually runs? | 299 | — | — | ADEQUATE | ADEQUATE | — | **STRONG** |

### Digital Design

| Unit | Concept | Words | Visual | Example | Interact | Predict | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| dd-u1 | Number systems, conversion, arithmetic | 2698 | STRONG | STRONG (5) | ADEQUATE | ADEQUATE | **STRONG** |
| dd-u2 | Gates, truth tables, De Morgan | 2912 | STRONG | ADEQUATE | ADEQUATE | ADEQUATE | **STRONG** |
| dd-u3 | Boolean algebra, K-map | 2549 | STRONG | STRONG | ADEQUATE | ADEQUATE | **STRONG** |
| dd-u4 | Adders, subtractors, converters | 2338 | STRONG | ADEQUATE | ADEQUATE | ADEQUATE | **STRONG** |
| dd-u5 | **Microprocessor · 15 marks** | 2818 | STRONG | **THIN (1)** | ADEQUATE | ADEQUATE | **ADEQUATE — joint-highest marks, one worked example** |
| dd-u5 | **5.9 Flags and interrupts** | 295 | **—** | — | — | — | **THIN — "draw the flag register" is examinable** |

### DBMS

| Unit | Concept | Words | Visual | Example | Interact | Predict | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| db-u1 | Data/info/database/DBMS · architecture · models | 2379 | STRONG | ADEQUATE | ADEQUATE | ADEQUATE | **STRONG** |
| db-u1 | 1.5 Types of database user | 152 | — | — | — | — | ADEQUATE — a four-item list |
| db-u2 | ER components · cardinality · keys | 2901 | STRONG | ADEQUATE | STRONG | ADEQUATE | **STRONG** |
| db-u3 | Vocabulary · ER→relational | 2598 | ADEQUATE | ADEQUATE | ADEQUATE | ADEQUATE | **STRONG** |
| db-u4 | SELECT · DDL · joins | 3805 | STRONG | STRONG | STRONG | ADEQUATE | **STRONG** |
| db-u4 | **4.7 SQL View** | 439 | — | **—** | — | — | **THIN — 439 words, no example, with a SQL simulator on the page** |
| db-u4 | 4.4 DCL | 178 | — | — | — | — | ADEQUATE — syntax-only by design (ambiguity A3) |
| db-u5 | Functional dependency · normalisation | 2545 | ADEQUATE | ADEQUATE | ADEQUATE | ADEQUATE | **STRONG** |
| db-u6 | Transaction · concurrency · ACID · states | 2406 | ADEQUATE | ADEQUATE | ADEQUATE | ADEQUATE | **STRONG** |
| db-u7 | Backup · recovery · security | 2660 | ADEQUATE | ADEQUATE | ADEQUATE | ADEQUATE | **STRONG** |

---

## 5. Diagram audit — all 53

| Check | Result |
| --- | --- |
| Geometry (collision, out-of-frame, breaks-out) | **53 / 53 pass** |
| Referenced by content | **53 / 53** — no orphans |
| Carrying a `<title>` for assistive technology | **53 / 53** |
| Language behaviour | labels English by policy, meaning in a bilingual caption ([LANGUAGE-SYSTEM.md §8](LANGUAGE-SYSTEM.md)) |
| Mobile | every figure inside a scrolling container; page overflow **0** at 320px |

**Classification.** No diagram is recommended for `REPLACE` or `REMOVE`. The
42 static figures are taxonomies, comparisons, notation references and things a
student must redraw in an exam — §6's list of cases where static is *better*.
Converting any of them to animation would cost revision value and gain nothing.

**Two gaps, both additive rather than corrective:**

- `u5 5.1` — inheritance is a structural relationship introduced by 417 words
  of prose with no figure. What is inherited, and what is **not** (private
  members), is stated in a callout and never drawn.
- `dd-u5 5.9` — the flag register is examinable as a drawing and is described
  only in prose.

## 6. Animation audit — all 11

Every animation driven through its full cycle in a real browser.

| Check | Result |
| --- | --- |
| Starts at step 0 | **11 / 11** |
| Forward stepping reaches the final step | **11 / 11** |
| Every step has a distinct, non-empty caption | **11 / 11** |
| Every caption bilingual, Nepali in Devanagari | **11 / 11** |
| Backward stepping restores the previous caption | **11 / 11** |
| Reset returns to step 0 | **11 / 11** |
| Reduced motion | **fully covered** — 100 animated selectors, universal reset in a `prefers-reduced-motion` block, 0 uncovered |

**No animation is incorrect, and none is recommended for removal.** Each of the
11 shows a sequence, a state change or a transformation — §6's criteria.

## 7. Simulation audit — all 12

| Module | Registers | Reset | Announces | Exposes state | Student decision |
| --- | --- | --- | --- | --- | --- |
| `sim-stackqueue` | ✓ | ✓ | via `core.js` `role="log"` | n/a | push/pop order |
| `sim-dispatch` | ✓ | ✓ | via `core.js` `role="log"` | n/a | which function runs |
| `sim-number` | ✓ | ✓ | ✓ | ✓ | toggle bits, read place value |
| `sim-gates` | ✓ | ✓ | ✓ | ✓ | toggle inputs, read the row |
| `sim-kmap` | ✓ | ✓ | ✓ | ✓ | **group cells, tool judges legality** |
| `sim-comb` | ✓ | ✓ | ✓ | ✓ | toggle inputs across two outputs |
| `sim-8085` | ✓ | ✓ | ✓ | — | step an instruction cycle |
| `sim-table` | ✓ | ✓ | ✓ | ✓ | pick a term, see what it names |
| `sim-er` | ✓ | ✓ | ✓ | ✓ | choose cardinality, see the consequence |
| `sim-sql` | ✓ | ✓ | ✓ | — | **write a query** |
| `sim-drill` | ✓ | ✓ | ✓ | ✓ | **judge a case against a rule** |
| `sim-concurrency` | ✓ | ✓ | ✓ | ✓ | choose a schedule |

Accessibility was swept in Phase 4.1 across all pages in all three modes and
returned clean; re-verified for this phase.

## 8. Fake-interactivity check (§9)

Asked of every interaction: **what decision is the student making?**

| Verdict | Components |
| --- | --- |
| **Real decision** | SQL simulator (writes a query) · K-map (groups cells and is judged) · drill (judges a case) · gates / comb / number (sets inputs and must predict the output) · ER (picks a cardinality) |
| **Step-through — the student presses Next** | the 11 animated diagrams · `sim-8085` · `sim-concurrency` |

The step-throughs are **not** dishonest — an instruction cycle and a lost
update are sequences, and a sequence is watched. But §9 is right that pressing
Next is not a decision.

**What separates a good step-through from a weak one is whether a prediction
precedes it.** Where a unit pairs the two, the student commits before watching
and the watching becomes a check. Every DBMS and Digital Design unit does this.
**The four read-only OOP units cannot, because they have no prediction at all** —
which is the same finding as §2 from a different direction.

---

## 9. Misconceptions

`CONCEPT → COMMON WRONG IDEA → CORRECT IDEA → HOW THE PLATFORM CORRECTS IT`

Covered already, and well:

| Concept | Wrong idea | Corrected by |
| --- | --- | --- |
| DBMS vs database | MySQL *is* the database | drill (`dbterms`) + explanation |
| 1:M vs M:N | both are "many" | ER visualiser showing occurrences |
| degree vs cardinality | interchangeable | table visualiser highlighting each |
| DELETE vs DROP | same thing | SQL simulator + mistake block |
| normalisation | saves space | animated decomposition + drill |
| atomicity | half the work survives | animated states + drill |
| redo vs undo | reverse of each other | animated log + drill |

**Named in the content but with nothing to test them** — all in OOP:

| Concept | Wrong idea | Currently |
| --- | --- | --- |
| **abstraction vs encapsulation** | the same thing | a callout and a mistake block, no diagnostic |
| **inheritance** | a derived class gets *everything* | one sentence in a callout, never drawn |
| **access specifiers** | `protected` behaves like `private` everywhere | a table, no application |
| **overloading vs overriding** | interchangeable | a good table, no diagnostic |
| **types of inheritance** | identification by memory | a diagram, no practice |

---

## 10. What this phase will change

Ordered by marks at stake × severity. Nothing is added to a topic that is
already adequate.

| # | Fix | Unit | Marks | Why |
| --- | --- | --- | --- | --- |
| 1 | Diagnostic drills + predictions | u2, u3, u4, u5 | **28** | 56% of the subject is read-only |
| 2 | Inheritance figure — what is and is not inherited | u5 5.1 | 7 | core concept, 417 words, no visual |
| 3 | Flag register figure | dd-u5 5.9 | 15 | examinable as a drawing |
| 4 | Worked examples | dd-u5 | 15 | joint-highest marks, one example |
| 5 | Worked example | db-u4 4.7 | 11 | 439 words, no example, simulator on the page |

**Explicitly not doing:** adding content to `u1 1.1–1.4`, `u2 2.6–2.7`,
`db-u1 1.5`, `db-u4 4.4` or `u6 6.1`. Each is short reference or definition
prose that is correctly READ, and lengthening them would make the product worse.
