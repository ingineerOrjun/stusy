# Grade 9 · Fundamentals of Computer and Application — curriculum verification

**All 36 official topics verified. 35 matched; 1 discrepancy found and corrected.
0 unresolved.**

The subject was recorded as **37** topics before this verification. It is 36 —
see `D-1`. Verified by **two independent extractions** of the CDC 2078 PDF, which
agreed on every unit, topic, hour and mark.

---

## 1 · Sources and how they were read

| | |
|---|---|
| Document | *Secondary Level School Curriculum (Technical and Vocational Stream), Grade 9–12 — Computer Engineering*, **2078 BS** |
| Authority | Curriculum Development Centre, MoEST, Government of Nepal |
| File | `giwmscdnone.gov.np/media/pdf_upload/1694337718_jx35alj.pdf` — 1,072,865 bytes, PDF 1.4, **321 pages** |
| Primary source? | **Yes** |

### Printed folio ↔ PDF page

Method 2 walks the PDF's page tree, so it reports true page numbers. Printed
folio **10 = PDF page 15**, giving a constant **+5** offset:

| Section | Printed folio | PDF page |
|---|---:|---:|
| Subject header (credit hrs, working hrs) | 10 | 15 |
| Competencies / learning outcomes | 11–12 | 16–17 |
| **Scope and sequence** | **13–15** | **18–20** |
| Suggested practical and project works | 15–17 | 20–22 |
| Learning facilitation process | 18 | 23 |
| **Internal evaluation** | **19** | **24** |
| **Specification grid** | **20** | **25** |

This confirms the starting reference of "pages 13–19" and extends it: the grid
is on p. 20 and the subject header on p. 10.

### The two methods

| | Method 1 (Phase 11) | Method 2 (written for Phase 12) |
|---|---|---|
| Page mapping | stream order | walks catalog → `/Pages` → `/Kids` for real page numbers |
| Text decoding | latin1 | each font's `/ToUnicode` CMap |
| Independent check | — | reports 321 pages, matching the file's own count |

They agree on every topic, unit title, hour and mark in this subject. Rule 5 is
satisfied by corroboration, not by a second look at one pipeline.

> **Limitation.** `pdftoppm` is not available in this environment, so the pages
> could not be **rendered** and read visually. Both methods are text extraction,
> however differently implemented. A visual read remains the one check not
> performed.

---

## 2 · Verification table — all 36 topics

**Match** = the repository's topic string, unit and numbering agree with the
curriculum. Source for every row: scope and sequence, folios 13–15 (PDF 18–20).

### Unit 1 — Introduction to computer · 8 hrs · 6 marks

| # | Official topic | Existing mapping | Verification |
|---|---|---|---|
| 1.1 | Introduction to computer | same, unit 1 | **Match** |
| 1.2 | Characteristics of computer | same, unit 1 | **Match** |
| 1.3 | Modern Applications of computer | same, unit 1 | **Match** |
| 1.4 | Classification of computers: 1.4.1 on the basis of size, 1.4.2 on the data handling, 1.4.3 on the purpose, 1.4.4 on the model, 1.4.5 on the brand | folded to one topic naming all five bases | **Match** (deliberate fold, all five named) |

### Unit 2 — Computer Components · 10 hrs · 7 marks

| # | Official topic | Existing mapping | Verification |
|---|---|---|---|
| 2.1 | Introduction to Components of computer | same, unit 2 | **Match** |
| 2.2 | Input Unit : Input Devices — Keyboard, Mouse, Joystick, OMR, OCR, BCR, MICR, Scanner, Touch Screen, Touchpad, Microphone and Digital Camera | same, unit 2 | **Match** |
| 2.3 | Output unit : Soft copy Output Devices: Monitors (CRT, LCD, LED/Plasma), Speaker, Projector and Headphone. **·** Hardcopy Output devices: Printer (impact, non-impact and 3D Printer) and Graphic plotter | **was split into two topics (2.3 and 2.4)** | **MISMATCH — see D-1. Corrected.** |
| 2.4 | Concept of Memory unit | was numbered 2.5 | **Corrected by D-1** |
| 2.5 | Processing unit : Microprocessor: basic concepts, clock speed, word length, components and functions | was numbered 2.6 | **Corrected by D-1** |

### Unit 3 — Computer software · 10 hrs · 9 marks

| # | Official topic | Verification |
|---|---|---|
| 3.1 | Introduction to Computer software | **Match** |
| 3.2 | Types of software and its features | **Match** |
| 3.3 | Introduction to Operating System | **Match** |
| 3.4 | Functions and characteristics of Operating System | **Match** |
| 3.5 | Types of Operating System | **Match** |
| 3.6 | User interface — CUI, GUI | **Match** |
| 3.7 | OSS (Open Source Software) | **Match** |

### Unit 4 — Memory/Storage Unit · 10 hrs · 8 marks

| # | Official topic | Verification |
|---|---|---|
| 4.1 | Memory Definition | **Match** |
| 4.2 | Types of Memory | **Match** |
| 4.3 | Cache Memory | **Match** |
| 4.4 | Primary / Main memory (4.4.1 characteristics, 4.4.2 RAM — SRAM, DRAM; ROM — PROM, EPROM, EEPROM) | **Match** (sub-items folded) |
| 4.5 | Secondary Memory (4.5.1 characteristics, 4.5.2 magnetic — Hard disk, SSD; optical — CD/DVD, Blu-ray; flash — Pen-drive) | **Match** (sub-items folded) |

### Unit 5 — Internet and its Application · 10 hrs · 8 marks

| # | Official topic | Verification |
|---|---|---|
| 5.1 | Introduction to Internet and its advantages | **Match** |
| 5.2 | Requirements for Internet connection | **Match** |
| 5.3 | Application of Internet (5.3.1 WWW, 5.3.2 E-mail, 5.3.3 Newsgroup, 5.3.4 Telnet, 5.3.5 IRC, 5.3.6 E-commerce, 5.3.7 Search engine, 5.3.8 E-Governance, 5.3.9 Remote Control) | **Match** (nine sub-items folded) |

### Unit 6 — Multimedia · 8 hrs · 6 marks

| # | Official topic | Verification |
|---|---|---|
| 6.1 | Introduction to Multimedia | **Match** |
| 6.2 | Components of Multimedia (Text, Audio, Video, Image, Animation) | **Match** (five sub-items folded) |
| 6.3 | Application of Multimedia | **Match** |

### Unit 7 — Emerging Technology · 8 hrs · 6 marks

| # | Official topic | Verification |
|---|---|---|
| 7.1 | Introduction to Emerging Technology | **Match** |
| 7.2 | Concept of AI | **Match** |
| 7.3 | Concept of Cloud Computing and distributed computing | **Match** |
| 7.4 | Concept of IOT | **Match** |
| 7.5 | Concept of Big data | **Match** |
| 7.6 | Concept of Data mining | **Match** |
| 7.7 | Cryptography (Encryption and Decryption) | **Match** |
| 7.8 | Concept of VR (Virtual Reality) | **Match** |
| 7.9 | Concept of AR (Augmented Reality) | **Match** |

**Totals: 4 + 5 + 7 + 5 + 3 + 3 + 9 = 36 topics · 64 theory hours · 50 external marks.**

---

## 3 · Discrepancy D-1 — corrected

| | |
|---|---|
| **Where** | Unit 2, topic 2.3 |
| **Official** | One numbered topic carrying **two bullets**: soft copy output devices, then hardcopy output devices |
| **In the repository** | Two numbered topics — 2.3 softcopy and 2.4 hardcopy — which pushed *Concept of Memory unit* to 2.5 and *Processing unit* to 2.6 |
| **Evidence** | Method 2 shows a bullet marker before "Hardcopy Output devices" **inside** 2.3, and the next number in the document is 2.4 *Concept of Memory unit*. Method 1 shows the same sequence. |
| **Effect** | Not a marks error — it stays inside Unit 2. But a student holding the official syllabus beside this site would find the numbering out of step from 2.3 onward. |
| **Correction** | The two were merged into one topic naming both halves, restoring 1:1 numbering. Subject 37 → 36 topics; Grade 9 169 → 168; all-subject total 319 → 318. |
| **Why now** | Grade 10 carries exactly this kind of divergence, recorded in Phase 9 and left alone because renumbering six written lessons was judged riskier than documenting it. Here nothing was written yet, so the fix was free — and the first lesson would have baked it in. |
| **Guarded by** | `tests/curriculum.test.js` — per-unit topic counts, mutation-tested by re-splitting 2.3 |

**Unclear items: none.** Every topic resolved to Match or to D-1.

---

## 4 · Assessment structure — verified

From the subject header (folio 10) and the evaluation section (folio 19):

| | |
|---|---|
| Credit hours | **4** |
| Working hours | **128** |
| Theory hours | **64** — the scope-and-sequence and grid column |
| **Practical hours** | **64** — a separate table, folios 15–17 |

**The specification grid's 50 marks is the external paper only — half the
subject.** Confirmed verbatim: *"External evaluation of the students will be
based on the written examination. It carries 50 percent of the total weightage."*

### Internal — 50 marks

| S.N. | Activity | Marks |
|---:|---|---:|
| 1 | Participation (attendance, homework, classwork, project and practical work) | 5 |
| 2.1 | Practical work — conduction of activities | 15 |
| 2.2 | Practical work — record keeping | 3 |
| 3.1 | Project work — conduction of activities | 10 |
| 3.2 | Project work — record keeping | 2 |
| 4 | Viva of practical and project work | 5 |
| 5 | Internal exam (first trimester 5 + second trimester 5) | 10 |
| | **Total** | **50** |

**This confirms the figures carried into this phase: practical 18 (15 + 3) and
project 12 (10 + 2).** Nothing was invented; every row is in the document.

Two notes the curriculum adds: the practical examination is conducted before
internal *and external* supervisors and assesses both the product and the
student's skill with apparatus; project work is assessed on reports and
presentation, and in a group presentation every member submits a short personal
reflection.

### Practical hours per unit — folios 15–17

| Unit | 1 | 2 | 3 | 4 | 5 | 6 | 7 | Total |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Practical hrs | 10 | 10 | 8 | 6 | 12 | 8 | 10 | **64** |

Recorded in `_source/content/specification-grid.js` as `practicalHours` and
asserted by a test: theory 64 + practical 64 = the 128 working hours.

---

## 5 · What this verification does **not** establish

1. **The pages were not read visually.** Both methods are text extraction.
   `pdftoppm` is unavailable here.
2. **Learning outcomes are not transcribed.** They occupy folios 11–12 and are
   a separate per-topic job, scheduled with the unit that uses them.
3. **The practical activity texts are not transcribed**, only their hours. The
   activity list itself is on folios 15–17.
4. **Which examination edition applies is still unestablished** — identical to
   Grade 10, see [`CURRICULUM-APPLICABILITY.md`](CURRICULUM-APPLICABILITY.md).
5. **No Nepali teacher has reviewed any of this.**
