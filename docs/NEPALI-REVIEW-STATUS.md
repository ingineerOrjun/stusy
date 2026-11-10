# Nepali review — status ledger

**Every item is `Pending review`. No human review has taken place.**

No Nepali-speaking teacher has read any of this content. No reviewer has been
engaged, named or approached. This file exists so that when one does, the result
has somewhere to go that is not a claim in a report.

---

## 1 · The package

| | |
|---|---|
| Request document | [`NEPALI-REVIEW-PACKAGE.html`](NEPALI-REVIEW-PACKAGE.html) — open in any browser, works offline |
| Per-item data | `nepali-review-items.json` — the same content, keyed by item id |
| Generator | `tools/nepali-review.js` — regenerate with `node tools/nepali-review.js` |
| Items | **1,956** bilingual pairs |
| Of those, added or changed in Phase 9 | **217** |
| Capture | **99.0%** of the distinct Nepali words in the lesson files appear in some item. The remainder is text inside SVG diagrams and code blocks, which is not a bilingual pair. |

The package is generated from the content, never hand-written, so it cannot
drift from what the site actually shows. Regenerate it before sending it to
anyone.

### What an item carries

Subject · unit · marks · topic heading · kind · source file · the English text ·
the Nepali text · the technical terms left in Latin script · a status · a field
to write in.

### The four statuses

| Status | Meaning |
|---|---|
| **Pending review** | No one has read it. **All 1,956 items are here.** |
| **Reviewed — accepted** | A Nepali-speaking teacher read it and it is fine as it stands. |
| **Reviewed — correction required** | Read, and wrong or unnatural. The reviewer's note says how. |
| **Corrected — awaiting re-review** | The correction has been applied to the source and needs confirming. |

Status lives in `nepali-review-items.json` as the `status` field on each item.
This file is the summary; the JSON is the record.

---

## 2 · Ledger

Counts per unit. Every cell in the four status columns starts at zero except
*Pending*.

| Subject | Unit | Marks | Items | New in Ph9 | Pending | Accepted | Correction req. | Corrected |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Shared interface | — | — | 45 | 0 | 45 | 0 | 0 | 0 |
| DBMS | 1 Introduction to Database System | 2 | 73 | 0 | 73 | 0 | 0 | 0 |
| DBMS | 2 ER-Model | 10 | 89 | 1 | 89 | 0 | 0 | 0 |
| DBMS | 3 Relational Model | 6 | 72 | 0 | 72 | 0 | 0 | 0 |
| DBMS | 4 SQL | 14 | 89 | 1 | 89 | 0 | 0 | 0 |
| DBMS | 5 Relational Database Design | 6 | 65 | 1 | 65 | 0 | 0 | 0 |
| DBMS | 6 Database Transaction | 6 | 62 | 0 | 62 | 0 | 0 | 0 |
| DBMS | 7 Backup, Recovery, Security | 6 | 78 | 0 | 78 | 0 | 0 | 0 |
| Digital Design | 1 Number System and Binary Arithmetic | 7 | 78 | 0 | 78 | 0 | 0 | 0 |
| Digital Design | 2 Concept of Logic Gates | 15 | 124 | 0 | 124 | 0 | 0 | 0 |
| Digital Design | 3 Boolean Algebra and Karnaugh Map | 6 | 80 | 0 | 80 | 0 | 0 | 0 |
| Digital Design | 4 Binary Arithmetic and Combinational Logic | 7 | 84 | 6 | 84 | 0 | 0 | 0 |
| Digital Design | 5 Introduction to Microprocessor | 15 | 87 | 0 | 87 | 0 | 0 | 0 |
| Hardware | 1 Introduction to Electronic Devices | 7 | 63 | 0 | 63 | 0 | 0 | 0 |
| Hardware | 2 Introduction to Computer System | 7 | 57 | 0 | 57 | 0 | 0 | 0 |
| Hardware | 3 Overview on System's Core | 9 | 64 | 0 | 64 | 0 | 0 | 0 |
| Hardware | 4 Troubleshooting Techniques | 10 | 76 | 0 | 76 | 0 | 0 | 0 |
| Hardware | 5 Repair and Maintenance | 11 | 94 | 0 | 94 | 0 | 0 | 0 |
| Hardware | 6 Backup and Recovery | 6 | 78 | 0 | 78 | 0 | 0 | 0 |
| DS & OOP | 1 Basic Introduction to Data Structure | 15 | 127 | 66 | 127 | 0 | 0 | 0 |
| DS & OOP | 2 Concept of OOP using C++ | 14 | 119 | 56 | 119 | 0 | 0 | 0 |
| DS & OOP | 3 Class and Object | 2 | 59 | 7 | 59 | 0 | 0 | 0 |
| DS & OOP | 4 Abstraction and Encapsulation | 5 | 57 | 26 | 57 | 0 | 0 | 0 |
| DS & OOP | 5 Inheritance | 7 | 70 | 25 | 70 | 0 | 0 | 0 |
| DS & OOP | 6 Polymorphism | 7 | 66 | 28 | 66 | 0 | 0 | 0 |
| **Total** | | | **1,956** | **217** | **1,956** | **0** | **0** | **0** |

---

## 3 · Suggested order, if a reviewer's time is limited

The package's "Added in Phase 9" button shows exactly this set.

1. **DS & OOP Units 1 and 2** — 122 of the 217 new items, and the two heaviest
   units in that subject (15 and 14 marks). Most of it is the expanded question
   bank and the two new decision drills, so it is the Nepali a student meets
   while being marked.
2. **Digital Design Unit 4** — six new items, including the two subtractor
   truth-table captions and the definitions of decoder, encoder, multiplexer and
   demultiplexer. That last one is the first Nepali definition of those four
   concepts the site has ever had.
3. **DBMS Units 2, 4 and 5** — one new item each, but each is a full
   explanatory block: entity vs entity set, the five SQL clauses including
   `WITH`, and the functional-dependency figure caption.
4. **The shared interface labels** — 45 items, read on every page by every
   student, and unchanged since Phase 3.

## 4 · Questions worth asking the reviewer explicitly

These are decisions taken without a native speaker, and each could reasonably
have gone the other way:

1. **Technical terms are left in Latin script inside Nepali sentences** —
   `compile`, `pointer`, `virtual`, `WHERE`, `borrow`. Is that what a Nepali
   teacher does in class, or should some be rendered in Devanagari?
2. **इन्टिटी was chosen over एन्टिटी** for *entity*, on a corpus count of 49
   against 3, and is now pinned by a test. Is इन्टिटी the better word?
3. **बाबु / छोरा** (father / son) for base and derived classes, against
   **अभिभावक** for the parent node of a tree. Deliberately two metaphors. Does
   that read naturally, or is it jarring?
4. **Register conventions.** Instructions use `-नुहोस्`. Is that the right level
   of formality for a Grade 10 textbook?
5. **Numerals.** Devanagari digits (०, १, २) appear in some Nepali sentences and
   Latin digits in others, usually where the value is part of a code expression.
   Is the split sensible?

## 5 · How a returned review is applied

1. Put the reviewer's answers into `nepali-review-items.json` — set each
   item's `status` and add a `note`.
2. Apply corrections **to the source** under `_source/`, never to the package.
3. `node tools/nepali-review.js` to regenerate; `npm run build && npm test`.
4. Update the ledger above, and mark corrected items
   `Corrected — awaiting re-review` until the reviewer confirms.

The item `id` is derived from the Nepali text, so **correcting an item changes
its id**. That is deliberate: a corrected string is a new string and must not
silently inherit an "accepted" status. The `note` should record the old id.

---

## 6 · What this file does not say

It does not say the Nepali is good. It does not say it is bad. **It says nobody
qualified has looked**, and it is organised so that the moment somebody does,
the result is recorded rather than summarised.
