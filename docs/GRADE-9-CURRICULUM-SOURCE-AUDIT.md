# Grade 9 — curriculum source audit

**Verdict: the correct course is identified and its official source is the
document this repository already cites for Grade 10.** The Grade 9 curriculum
is in the same CDC PDF, four units of it, pages 1–48. Nothing had to be found
that was not already on file.

The foundation is **not blocked**. One limitation is carried forward and named
in §6.

---

## 1 · The course, and the three it is not

Gyansetu teaches the **Technical and Vocational Stream**, Computer Engineering.
Grade 9 of that stream is a set of four subjects with their own CDC curriculum.
It is routinely confused with three other things, and the audit checked against
each:

| Not this | Why it is different | How it was excluded |
|---|---|---|
| **Computer Science (optional), Grade 9/10** | A single optional subject in the general stream, with its own NEB specification grid that circulates widely online | Different subject names, different grid, different document. The CDC publishes it separately at `moecdc.gov.np/content/493/` |
| **General Grade 9 "Computer"** | Not a technical-stream course at all | No matching subject list in the CDC technical curriculum |
| **Grade 10 Computer Engineering (SEE)** | The grade already built here | Each grid is headed with its grade; Grade 9's four read "Grade: 9", Grade 10's four read "Grade: 10" |
| **Grade 9 computing from other countries** | Different curriculum authority | Only CDC Nepal documents were used |

The four Grade 9 subjects below each carry a Specification Grid explicitly
headed **"Specification Grid / Grade: 9"** in the CDC document — that heading is
what settles the stream and the grade together.

## 2 · Sources

### Primary — official, and the basis for everything recorded

| | |
|---|---|
| **Document title** | *Secondary Level School Curriculum (Technical and Vocational Stream), Grade 9–12 — Computer Engineering* |
| **Issuing authority** | Curriculum Development Centre, Ministry of Education, Science and Technology, Government of Nepal |
| **Edition** | **2078 BS** |
| **Listing** | `moecdc.gov.np/content/553/` |
| **File** | `giwmscdnone.gov.np/media/pdf_upload/1694337718_jx35alj.pdf` — 1.03 MB, 321 pages |
| **Primary source?** | **Yes.** Published by the curriculum authority itself |
| **Verification status** | **Verified.** Read directly: streams inflated and text extracted locally |

**Relevant pages.**

| Subject | Scope and Sequence | Specification Grid |
|---|---:|---:|
| Programming Principles and Concept in C Language | p. 4 | **p. 9** |
| Fundamentals of Computer and Application | p. 13 | **p. 20** | ← verified line by line in Phase 12 |
| Fundamentals of electro-system | p. 24 | **p. 31** |
| Website Design | p. 35 | **p. 42** |

Page numbers are the document's own printed folios. Each grid's text block
opens with its page number — the extraction reads `9Specification GridGrade: 9`
— which is also how the four Grade 10 citations (pp. 50, 59, 68, 76) were
**confirmed in this phase**, having been labelled "approx." since Phase 9.

### Supporting — official, corroborating that the edition is live

| | |
|---|---|
| **CDC learning-materials category** | *कम्प्युटर इन्जिनियरिङ्गका सिकाइ स्रोत सामग्री*, `moecdc.gov.np/category/computer-engineering-learning-resource-materials/` |
| **What it shows** | CDC publishes Grade 9 **textbooks** dated **1 Mangsir 2082 BS** titled *Fundamentals of Computer and Application Grade - 9*, *Fundamentals of Electro-System Grade - 9*, *Programming principal & concept in C Language Grade - 9* and *Website Design Grade - 9* |
| **Why it matters** | All four titles match the 2078 curriculum's subject names. The curriculum authority was printing books against this subject list roughly a year ago |
| **Primary source?** | Yes, though supporting rather than the curriculum itself |
| **Verification status** | **Verified** — read on the CDC site |

### Not used

No secondary source — blog, tutoring site, encyclopaedia — was used for any
curriculum fact. Several circulate an older (2072 BS) Grade 9–10 Computer
Engineering syllabus, which is a reason for care rather than a source.

## 3 · What was extracted and how it was checked

| Item | Status | Evidence |
|---|---|---|
| Subject names | **Verified** | Grid headings, cross-checked against CDC textbook titles |
| Subject codes | **Absent** | The document assigns none. Recorded as absent, not invented |
| Unit count, 7 per subject | **Verified** | Both tables agree for all four subjects |
| Unit titles | **Verified** | Grid and scope-and-sequence agree, modulo the document's own capitalisation |
| Credit hours | **Verified** | Each subject totals exactly 64 |
| External marks per unit | **Verified** | Each subject totals exactly 50 |
| Internal / external split | **Verified** | Quoted in §4 |
| Topic lists | **Partially verified** | See §5 — one error found and fixed, full per-subject pass still required |
| Learning outcomes | **Not transcribed** | A separate column; belongs with the subject being authored |
| Practical activities | **Not transcribed** | A separate table per subject, with its own hours |

### How the marks were read, since the extraction interleaves columns

The grid's columns come out of the PDF text interleaved. Units 2–7 read cleanly
as *hours* then *marks*; unit 1's row is merged with the whole-paper column
totals, so its marks are the digits after the shared run.

The method was **calibrated on a known answer before being trusted**: applied to
the Grade 10 DBMS grid it reproduced 6/10/10/14/8/8/8 hours and 2/10/6/14/6/6/6
marks exactly, which Phase 9 had established independently. Each Grade 9 subject
is then checked by arithmetic — unit 1 must equal 50 minus the rest — and all
four agree.

## 4 · Marks and evaluation

Quoted from the Grade 9 evaluation section:

> *"External evaluation of the students will be based on the written
> examination. It carries 50 percent of the total weightage. Questions for the
> external examination will be based on the specification grid developed by
> Curriculum Development Centre."*

**Each subject is 100 marks.**

| Internal — 50, awarded by the school | Marks |
|---|---:|
| Participation | 5 |
| Practical work — conduction | 15 |
| Practical work — record keeping | 3 |
| Project work — conduction | 10 |
| Project work — record keeping | 2 |
| Viva of practical and project work | 5 |
| Internal exam (5 + 5 across two trimesters) | 10 |
| **Total** | **50** |

| External — 50 | |
|---|---|
| Form | Written examination, 2 hours |
| Basis | The CDC specification grid |
| Levels | Revised Bloom's: remembering, understanding, application, higher ability |

**Grade 9's internal half is more itemised than Grade 10's**, and more of it is
practical: 18 of the 50 internal marks are practical work and another 12 are
project work. Website Design and Electro-System are, by the curriculum's own
weighting, substantially practical subjects. Any Gyansetu Grade 9 plan that
teaches only the written half is addressing half the assessment, and the unit
marks recorded here are shares of that external half only.

## 5 · One discrepancy found, and fixed

**`G9-D1` — "Operators in C" was in the wrong unit.**

| | |
|---|---|
| Official | **2.7**, the last topic of Unit 2, *Fundamentals of C* |
| In the repo | the first topic of Unit 3, *Control Flow Statements* |
| Evidence | The extracted text reads `2.6 Input/ Output statements 2.7 Operators in C (...)10 3Control Flow Statements`. The `10` is Unit 2's credit hours, so 2.7 closes Unit 2 |
| Why it matters | Unit 2 carries **7** external marks; Unit 3 carries **13**. A student revising operators would have weighted them wrongly |
| Status | **Fixed** in `content/syllabus.js` |

This was found by comparing the repository's Grade 9 outline against the PDF
line by line for one subject. It is the reason §6 says the other three still
need the same pass.

## 6 · Limitations, carried forward

1. **The topic lists are not verified line by line.** Unit count, titles and
   hours are verified for all four subjects and agree exactly. Within the units,
   an automated comparison showed count differences that could be genuine
   discrepancies, legitimate folding of sub-items, or artefacts of a crude
   extractor — it missed one whole unit, which is reason enough not to trust
   its verdicts. **Each subject needs a full manual pass before it is
   authored**, and the roadmap schedules it as the first task per subject.
2. **Learning outcomes and practical activities are not transcribed.**
3. **The applicable SEE / examination edition is still unestablished** — the
   same limitation Grade 10 carries. See
   [`CURRICULUM-APPLICABILITY.md`](CURRICULUM-APPLICABILITY.md). Nothing found
   in this phase changes it. It applies to Grade 9 identically.
4. **No Nepali teacher has reviewed anything**, Grade 9 or Grade 10.
5. **No screen reader has been run.**

Limitations 3, 4 and 5 are unchanged from Phase 9.5 and are **not** resolved
here.
