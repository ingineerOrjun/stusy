# Which curriculum edition applies to the SEE cohort?

**Investigated 10 November 2026.** Short answer: the **CDC 2078 BS Computer
Engineering curriculum is the only edition the CDC publishes, and the CDC is
actively publishing Grade 10 textbooks for its subjects as of Mangsir 2082 BS.**
No document reachable anywhere states which edition a given year's examination
is set from. That gap is a limitation, recorded here rather than closed by
assumption.

This file replaces the one-line note Phase 9 left in
`_source/content/specification-grid.js`. The coverage maps are **unchanged** —
there is no verified reason to change them, and Phase 9.5's instruction was to
leave them intact until there is.

---

## 1 · Evidence, by how much weight it carries

### Tier 1 — Official CDC documents and pages

| # | Source | Date | What it establishes |
|---|---|---|---|
| 1.1 | *Secondary Level School Curriculum (Technical and Vocational Stream), Grade 9–12 — Computer Engineering*, **2078 BS**. `giwmscdnone.gov.np/media/pdf_upload/1694337718_jx35alj.pdf`, 1.03 MB, 321 pages | 2078 BS | The curriculum itself: scope and sequence, learning outcomes, and a Specification Grid per subject. **This is what the repo transcribes.** |
| 1.2 | CDC listing page `moecdc.gov.np/content/553/secondary-level-school-curriculum--grade-9-12--computer/` | Page dated **१ मंसिर, २०८२** | Links **exactly one** file — 1.1. No later edition is published for this subject. Verified live on 10 Nov 2026. |
| 1.3 | CDC category *कम्प्युटर इन्जिनियरिङ्गका सिकाइ स्रोत सामग्री* (Computer Engineering learning resource materials), `moecdc.gov.np/category/computer-engineering-learning-resource-materials/` | — | Lists the official learning materials for this stream. |
| 1.4 | **Textbook: *Data structure & OOP concept using C++ Grade - 10***, `moecdc.gov.np/content/542/`, 135 pages | **१ मंसिर, २०८२** | CDC is publishing a Grade 10 textbook whose title matches the 2078 curriculum's subject name **character for character**, including the `&` and the lower-case *concept*. |
| 1.5 | **Textbook: *Computer Hardware, Electronics Repair and Maintenance Grade - 10***, `moecdc.gov.np/content/541/`, 101 pages | **१ मंसिर, २०८२** | Same, for the second Grade 10 subject. |
| 1.6 | Grade 9 textbooks in the same category: *Fundamentals of Computer and Application*, *Fundamentals of Electro-System*, *Programming principal & concept in C Language*, *Website Design* | **१ मंसिर, २०८२** | All four Grade 9 subject names match the 2078 curriculum. The whole subject structure is being supported, not one leftover book. |
| 1.7 | The curriculum's §7, *Student Evaluation* | 2078 BS | *"Internal evaluation covers 50 Percent weightage… Practical Activities (35 Percent), Marks from trimester examinations (10 Percent), and Classroom participation (5 Percent)."* The Specification Grid governs the **external 50** only. |

**What Tier 1 supports.** The 2078 edition is the current published curriculum
for Grade 10 Computer Engineering. CDC was printing textbooks against its
subject list roughly a year ago, which is not what an institution does with a
superseded curriculum.

### Tier 2 — Official government notices

**Nothing found.** No notice on the CDC site names an applicable curriculum
edition for the Computer Engineering technical stream, states a transition year,
or announces a revision. Searched the CDC site's notice column and its
Computer Engineering category; both carry 2082–2083 BS items about textbook
printing, subject-expert rosters and assessment guidance, none about this
curriculum's edition.

### Tier 3 — Official examination guidance

**Nothing found that answers the question.** The Grade 10 examination is run by
the **National Examination Board, Office of the Controller of Examinations
(Class 10)**, Sanothimi, Bhaktapur — `see.gov.np` — which the CDC category page
itself links to. No NEB or SEE publication was found that names the curriculum
edition used to set the technical-stream Computer Engineering papers, or a
specification grid issued separately from the CDC one.

A specification grid for **optional Computer Science** (a different, non-stream
subject) is published and circulates widely. It is **not** this subject and is
not used here.

### Tier 4 — Secondary educational sources

Blog posts, tutoring sites and encyclopaedia entries were read for background
only — who administers the SEE, when it is held, how grading works. **None was
used as evidence for applicability**, and none addressed the technical stream's
curriculum edition. Several circulate older (2072 BS) Grade 9–10 Computer
Engineering material, which is a reason to be careful with them rather than a
reason to cite them.

### Tier 5 — Assumptions, named so they are not mistaken for findings

1. That the SEE paper a current Grade 10 student sits **will be set from the
   2078 Specification Grid**. Reasonable, unverified.
2. That no unpublished revision is in circulation among schools.
3. That the Specification Grid in the curriculum is the same grid the examiner
   uses, rather than a separate NEB-issued one.

---

## 2 · Verdict

| Question | Answer | Confidence |
|---|---|---|
| Is 2078 the current **published** curriculum for this subject? | **Yes** | High — CDC's own listing, plus textbooks dated Mangsir 2082 for its subjects |
| Is 2078 the edition the **SEE paper is set from**? | **Unknown** | No source at any tier states it |
| Is there evidence of a **newer** edition? | **No** | Searched CDC listing, CDC category and the open web |
| Should the coverage maps change? | **No** | Nothing found gives a verified reason, and the instruction was to leave them until something does |

## 3 · What was done about it in the product

One thing, and it came out of Tier 1 evidence 1.7 rather than from the
applicability question.

Each subject is **100 marks: 50 external and 50 internal.** The Specification
Grid the repo transcribes covers the external half only. Three of the four
subject heroes showed a bare **"50 marks"** pill; the fourth already said
**"50 external marks"**. The inconsistency is what made it visible. All four now
say *external*, the quotation above is recorded in
`_source/content/specification-grid.js` beside the numbers it qualifies, and a
test keeps the four subjects from drifting apart again.

## 4 · What would close this, for whoever picks it up

In descending order of how decisive it would be:

1. **An NEB / SEE notice** naming the curriculum edition for technical-stream
   Computer Engineering papers. Would settle it outright.
2. **A specification grid published by NEB** for this subject, to compare
   against the CDC one. If they differ, the CDC grid is the wrong source and
   the marks in this repo are wrong with it.
3. **The front matter of the 2082-dated textbooks** (1.4, 1.5), which normally
   names the curriculum a book implements. Not read: the files are served as
   downloads and as a canvas flipbook, and nothing was downloaded.
4. **A school or teacher** confirming which curriculum they teach from. The
   cheapest of the four and the least citable.

Until one of those exists, the right statement is the one at the top of this
file, and `specification-grid.js` is the single place a correction would land.
