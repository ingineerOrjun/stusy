# Phase — Hardware & Repair: Content Audit

The audit carried out before anything was authored, and the coverage
matrix produced from it. Every number here was measured, not estimated.

---

## 1 · The authoritative syllabus, and its condition

**Located at** `_source/content/syllabus.js`, key `grade10/hardware`.

It is **complete and unambiguous**: 6 units, 64 hours, each with an
explicit topic list and a Nepali unit title. Hours total exactly the 64
the build validator requires, so no interpretation was needed and
nothing had to be inferred.

| Unit | Official title | Hrs | Topics listed |
|---|---|---:|---:|
| 1 | Introduction to Electronic Devices | 10 | 4 |
| 2 | Introduction to Computer System | 10 | 4 |
| 3 | Overview on System's Core | 12 | 7 |
| 4 | Troubleshooting Techniques | 12 | 6 |
| 5 | Repair and Maintenance | 12 | 11 |
| 6 | Backup and Recovery | 8 | 5 |
| | **Total** | **64** | **37** |

**One thing the syllabus does not supply: marks.** Every other subject
in this repository carries 50 external marks over 64 hours, and
`validate.js` enforces that total. Marks were therefore derived from the
hours rather than invented — 8, 8, 9, 9, 9, 7 — and that derivation is
recorded in `config/pages.js` beside the numbers themselves.

**No ambiguity was found that required stopping.** §22 of the brief asks
for gaps to be reported rather than filled silently; there were none at
the syllabus level.

---

## 2 · What existed before this phase

Measured, not assumed:

| | |
|---|---|
| Authored lesson pages | **0** |
| Question bank | **absent** — no `grade10-hardware.js` |
| Diagrams | **0** of the 55 in the library related to hardware |
| Guided practice | **0** |
| Prerequisite edges | **0** |
| What a student actually saw | the CDC **syllabus outline only**, generated from `syllabus.js` |

The subject was registered in the site map with a name and a Nepali
title, and `pages.js` had no entry for it at all. It was the one Grade 10
subject with no authored content.

---

## 3 · Coverage matrix — all 37 syllabus topics

Priority: **P0** = carries the most marks and cannot be learned by
reading; **P1** = significant marks, benefits from interaction;
**P2** = definitional, well served by explanation plus a diagram.

| Unit | Official topic | Required concepts | Existed | Built | Interaction | Pri |
|---|---|---|---|---|---|---|
| 1 | Matter, molecule, atom | definitions, 3 particles + charges | none | explanation, `hwMatter` | — | P2 |
| 1 | KCL and KVL | state + apply both | none | explanation, `hwKirchhoff`, 2 worked examples | worked-example gate | P1 |
| 1 | Semiconductor / doping | intrinsic, P, N, majority/minority | none | explanation, `hwDoping` | `dopetype` drill | P1 |
| 1 | PN junction, bias | formation, depletion, fwd/rev | none | explanation | **`hwPnJunction` animated**, prediction | **P0** |
| 2 | Basic components | 5 units, what each does | none | explanation, `hwSystemUnits` | **parts lab** | **P0** |
| 2 | Input unit | keyboard, mouse, scanner, camera | none | explanation | prediction (scanner → OCR) | P1 |
| 2 | Processing unit | ALU vs control unit | none | explanation, worked example | parts lab | **P0** |
| 2 | Display unit | resolution, colour, refresh, CRT/LCD/LED | none | explanation, `hwDisplayTech`, worked example | `displayprop` drill | P1 |
| 3 | System BIOS | 4 functions incl. POST | none | explanation | prediction (CMOS battery) | **P0** |
| 3 | Motherboard, form factors | parts, ATX family | none | explanation, `hwMotherboard` | **parts lab** | **P0** |
| 3 | PCI local bus | bus, expansion, plug and play | none | explanation | — | P2 |
| 3 | Internal power supply | SMPS parts, voltages | none | explanation | — | P2 |
| 3 | Hard drive construction | platter, track, sector, cylinder, head | none | explanation | **`hwHddRead` animated** | **P0** |
| 3 | Partitioning, lettering | primary, extended, logical | none | explanation, `hwPartition` | — | P1 |
| 3 | Formatting and types | quick vs full | none | explanation, worked example | worked-example gate | P1 |
| 4 | General techniques | 5 principles | none | explanation | — | P1 |
| 4 | Steps of troubleshooting | 6 steps, in order | none | explanation, `hwTroubleshootSteps` | — | **P0** |
| 4 | Boot problems | read how far it got | none | explanation, 2 worked examples | **fault lab**, **guided practice**, prediction | **P0** |
| 4 | Boot-time error messages | beep codes, 6 messages | none | comparison table | — | P1 |
| 4 | System slowdowns | 5 causes, telling them apart | none | explanation, worked example | guided practice | P1 |
| 4 | Specific components | applying the sequence | none | explanation | fault lab | P1 |
| 5 | Preventive maintenance | tasks paired with what they prevent | none | explanation | — | P1 |
| 5 | Wireless connection issues | ordered checklist | none | explanation | — | P2 |
| 5 | Power source and protection | surge, sag, blackout, noise | none | explanation, worked example | `powerprotect` drill, prediction | **P0** |
| 5 | Video card failure | symptoms → cause | none | comparison table, worked example | — | P1 |
| 5 | Monitor image quality | resolution, layout | none | comparison table, worked example | — | P1 |
| 5 | I/O connection issues | port, cable, driver | none | comparison table | — | P2 |
| 5 | Processor power / voltage | regulation, instability | none | explanation | — | P2 |
| 5 | Processor cooling | heatsink, paste, fan | none | explanation, `hwCooling` | **fault lab (overheat)** | **P0** |
| 5 | Cooling and ventilation | case airflow path | none | explanation, `hwCooling` | fault lab | P1 |
| 5 | Virus background | definition, how it spreads | none | explanation | — | P1 |
| 5 | Virus detection/prevention | signs, antivirus, prevention | none | explanation | — | P1 |
| 6 | Backup and recovery intro | definitions, why both | none | explanation | — | P2 |
| 6 | Backup methods, devices, media | full/incr/diff, 6 media | none | explanation, worked example | **`hwBackupTypes` animated** | **P0** |
| 6 | Scheduling, media rotation | GFS scheme | none | explanation | — | P1 |
| 6 | RAID | 0, 1, 5 with minimum disks | none | explanation, `hwRaid`, worked example | `backupchoice` drill, prediction | **P0** |
| 6 | Recovery techniques | 6 techniques, when each applies | none | explanation | drill | P1 |

**37 / 37 syllabus topics covered.** 11 classified P0, 17 P1, 9 P2.

---

## 4 · Interaction opportunities — what was chosen and what was refused

The brief's §6 lists eight interaction patterns. Four were built, four
were deliberately not, and the reasoning is recorded because a refusal
that is not written down looks like an oversight.

### Built

| Pattern | Where | Why this and not a drill |
|---|---|---|
| **A. Component identification** | u2 system units, u3 motherboard | "Where is the northbridge" is answered by a **position**, not a word. A multiple-choice drill cannot express that. |
| **C/D. Troubleshooting + decision tree** | u4 `nodisplay`, u5 `overheat` | A fault is **narrowed**, not classified. The existing drill answers in one step; diagnosis needs branching. |
| **B. Matching / classification** | 4 new `sim-drill` sets | Reused the existing component exactly as-is — no new framework. |
| **G. Fault → symptom prediction** | 6 `.predict` blocks | Reused `predict.js` unchanged. |

### Refused

| Pattern | Why not |
|---|---|
| **E. Hardware assembly** | Assembly order is not in the syllabus. Building it would be inventing curriculum, which §14 forbids. |
| **F. Port/cable identification** | The syllabus covers "input and output device connection issues" as a *fault* topic, not as port identification. Covered by the table in 5.4 instead. |
| **H. Maintenance simulation** | Preventive maintenance is a checklist, not a decision problem. A simulator over it would be a quiz with pictures — decoration, which §6 forbids. |
| A second parts lab for the power supply | The SMPS has five named parts and no positional content worth clicking. A list is the honest representation. |

---

## 5 · Animation opportunities — three taken, and why the rest were not

§7 asks what becomes easier to understand *because it moves*. Three
topics passed that test:

| Diagram | What moves, and why it matters |
|---|---|
| `hwPnJunction` | The **depletion region changes width**. Forward and reverse bias are not two facts — they are the same region moving in opposite directions, which two still pictures cannot show. |
| `hwHddRead` | A disk read is a **sequence with moving parts**: seek, then rotate, then transfer. "Explain the operation of a hard disk" *is* that sequence. |
| `hwBackupTypes` | The three methods differ in **what gets copied on each successive day**. A still table states the difference; the sequence shows it. |

**Ten static diagrams were left static**, deliberately. `hwMatter`,
`hwDoping`, `hwDisplayTech`, `hwMotherboard`, `hwRaid` and the rest are
reference material — classification charts and labelled layouts that a
student revises from. §7 says explicitly to leave those alone, and
animating a motherboard layout would make it *harder* to revise from.

`hwTroubleshootSteps` is the closest call: it is a process, and processes
often animate well. It was left static because the whole point of the
diagram is that **all six steps and the loop back from 4 to 3 are visible
at once** — that shape is the lesson, and revealing it one step at a time
would hide it.

---

## 6 · Content quality findings

**Two things this subject needed that the others did not:**

1. **Symptom-to-cause reasoning is the actual skill**, and it is not
   testable by definition questions. Ten of the thirty bank questions and
   both fault scenarios present a situation rather than a term. The
   `hw.diagnose` practice fades from a worked diagnosis to an
   unscaffolded one across five rungs.

2. **A correct action can still be a bad move.** Reseating the RAM before
   checking the monitor cable will sometimes fix the machine and is still
   wrong, because it is expensive and out of order. No existing component
   could express that, so the fault lab grades every choice as `good`,
   `wasteful` or `unsafe` — and an unsafe choice is recorded and
   explained but **does not advance the diagnosis**, because letting it
   advance would teach that order does not matter.

**What was NOT added, and why:** no extra prose was written to make units
look substantial. Unit 5 has eleven syllabus topics for 9 marks, so its
treatment of each is deliberately short — the alternative was padding,
which Phase 4.5 established makes a subject worse.

---

## 7 · Remaining gaps

Stated rather than hidden:

| Gap | Status |
|---|---|
| Unit 1 has one drill and no second interaction | **Accepted.** The electronics is genuinely definitional; the PN junction animation carries the one concept that needs motion. |
| No parts lab for the power supply or a monitor | **Accepted.** No positional content worth clicking; see §4. |
| Only one guided-practice skill for the subject | **Real.** `hw.diagnose` covers Unit 4's core procedure. A second skill for Unit 6's restore-set counting would be defensible, and is a candidate for a later phase. |
| Screen-reader behaviour | **Not verified.** DOM-level and platform-level checks were run; no screen reader was heard. Consistent with every prior phase. |
| Unit 3 has no worked-example think gate | **Deliberate.** Its two examples are a capacity calculation and a format comparison; both are demonstrations rather than predictions, and §6 of the earlier phase forbids gating every solution. |
