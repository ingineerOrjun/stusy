# Grade 9 · Fundamentals of Computer and Application — content blueprint

The instructional plan for all **seven units**, now all authored — Unit 1 in
Phase 12, Units 2–7 in Phase 13. The blueprint exists so that the subject is one
coherent course rather than seven separately-invented lessons, and it is kept
here as written rather than rewritten to match the result: §2 records where the
build departed from the plan and why.

Hours below are the curriculum's own: **64 theory + 64 practical = 128 working
hours**, distributed as the CDC document distributes them. Nothing is spread
evenly for convenience — Unit 5 gets 12 practical hours and Unit 4 gets 6
because that is what the document says.

---

## 1 · The subject in one view

| Unit | Title | Theory | Practical | External marks | Topics | Status |
|---:|---|---:|---:|---:|---:|---|
| 1 | Introduction to computer | 8 | 10 | 6 | 4 | **Authored** |
| 2 | Computer Components | 10 | 10 | 7 | 5 | **Authored** |
| 3 | Computer software | 10 | 8 | **9** | 7 | **Authored** |
| 4 | Memory/Storage Unit | 10 | 6 | 8 | 5 | **Authored** |
| 5 | Internet and its Application | 10 | **12** | 8 | 3 | **Authored** |
| 6 | Multimedia | 8 | 8 | 6 | 3 | **Authored** |
| 7 | Emerging Technology | 8 | 10 | 6 | 9 | **Authored** |
| | | **64** | **64** | **50** | **36** | **7 of 7** |

Two things the table says that are easy to miss. **Unit 3 carries the most
external marks** (9) despite not being the longest. And **Unit 5 has the most
practical hours** (12) while having only 3 topics — because its topics are
things you do, not things you recite.

---

## 2 · The instructional pattern, fixed once for the subject

Every unit follows the shape proven across Grade 10 and used in Unit 1. It is
written down here so Units 2–7 do not each re-invent it.

1. **Unit head** — number, bilingual title, and a chip carrying *theory hrs ·
   external marks · practical hrs*. Grade 9's chip shows practical hours too,
   because for this subject they are half the course.
2. **Learning objectives** — what the student can do by the end, bilingual.
3. **Topic sections**, one per official topic, in curriculum order, each
   anchored `cf-tNM` so the coverage map can point at it.
4. **Explanation** as an `.en`/`.np` pair — meaning in both languages, not a
   word-for-word translation.
5. **A diagram only where the concept has a shape.** A cycle, a tree, a
   hierarchy, a signal. Lists stay lists.
6. **A callout** for the single thing most often got wrong.
7. **A prediction** before the answer, where a student holds a wrong intuition
   worth surfacing.
8. **Worked examples** with a think-gate: the student commits before the
   working opens.
9. **An interactive component only where a judgement is being drilled.**
10. **Misconceptions + a memory hook** of ≤24 words carrying Nepali.
11. **Exam focus** — the unit's marks, what form questions take, and what is
    assessed internally instead.
12. **Practice questions** with revealed model answers.
13. **Key points** to revise.

### Where interaction is justified, and where it is not

| Unit | Interactive component | Why it earns its place |
|---:|---|---|
| Unit | Planned | Built | Why |
|---:|---|---|---|
| 1 | Decision drill — *which basis of classification?* | **As planned** — `cfclassify` | Five bases that students merge into one list. A judgement against a rule |
| 2 | Parts lab reusing `sim-parts.js` | **Changed** — decision drill `cfinput` | The parts lab is a Grade 10 component built around a motherboard photo and repair vocabulary. Reusing it here meant either showing Grade 9 students a component diagram the curriculum does not ask for, or gutting it. The same classification judgement — which unit does this device belong to — is what the drill asks, without the borrowed scaffolding |
| 3 | Decision drill — *system, application or utility?* | **As planned** — `cfsoftware` | The classic confusion of the unit, and its heaviest marks (9) |
| 4 | Memory-hierarchy explorer — press a level | **Changed** — `cfMemoryHierarchy` diagram + drill `cfmemory` | The explorer and the diagram would have carried the same four facts. The diagram shows the ordering at a glance; the drill makes the student commit to *which* level a described use belongs to, which is the exam task. An explorer would have been a third way of reading the same table |
| 5 | None beyond prediction | **Added** — drill `cfinternet` | The plan was wrong about this unit. Its three topics look definitional, but the marks (8) sit on telling connection types apart, and that is a judgement, not a recitation. The drill is six scenarios, no simulated browser |
| 6 | None | **Added** — drill `cfmultimedia` | Also a plan correction, with less force: the five components *are* a list, but the exam asks which component a described asset is, and six cases cost little. No media player was built, as the plan rightly warned |
| 7 | Decision drill — *which emerging technology?* | **As planned** — `cfemerging`, plus the cipher bench | Nine concepts that blur together; scenario-to-concept is exactly the exam task. Topic 7.7 added cryptography, where a shift cipher makes the key visible — `sim-cipher.js` |

**All seven units got an interactive component, against a plan of four.** The
plan's reasoning — that interaction everywhere produces decoration — still
holds, and is why Units 5 and 6 got six-case drills rather than simulations of
the thing itself. What the plan got wrong was treating "definitional topics" as
a reason for no interaction, when the marks on those units are awarded for
telling things apart. Two of the three additions are drills over the existing
`sim-drill.js` engine, so the cost of being wrong here was small.

### Diagrams planned

Five of the eight planned diagrams were built. Three were not, and the reason in
each case is that a table in the unit already carried the same information:

| Unit | Planned | Outcome |
|---:|---|---|
| 1 | `cfIpoCycle`, `cfClassify` | **Both built** (Phase 12) |
| 2 | A system block diagram, and a device-to-unit map | **The block diagram was reused, not drawn** — the unit injects Hardware's `hwSystemUnits`, which already shows input/process/output/storage as blocks. The device-to-unit map was not built: the unit's device table is that map, in a form that reads at 320px and needs no SVG |
| 3 | A software family tree, and a CUI/GUI comparison | **`cfSoftwareLayers` built** — hardware → OS → application, which is the family tree's useful half. The CUI/GUI comparison stayed a table, because it is a two-column comparison and that is what tables are |
| 4 | The memory hierarchy as a pyramid | **`cfMemoryHierarchy` built** |
| 5 | What an internet connection requires, as a chain | **`cfInternetChain` built** |
| 6 | The five components around one presentation | **Not built.** A hub-and-spoke diagram of a five-item list adds a shape, not a fact |
| 7 | None — nine concepts share no shape | **None built**, as planned |

Three diagrams added — `cfSoftwareLayers`, `cfMemoryHierarchy`,
`cfInternetChain` — bringing the site's total to 75, plus one reused from
Hardware. The decision rule applied throughout: a diagram earns its place when
it shows an *ordering* or a *flow* that prose states only in sequence. A diagram
of a list does not.

**The reuse had a consequence worth recording.** `hwSystemUnits` became the
first diagram used by two subjects, and the home page's roll-up added its
per-subject diagram counts together, so it began claiming 76 distinct diagrams
against a registry of 75. Every other figure in that roll-up — units, hours,
questions, simulators — belongs to exactly one subject, so summing was correct
for all of them and wrong only for this one. Fixed in `build/context.js` by
taking a union, and pinned by a test that checks the number against the lesson
files rather than against the context that generated the page. The existing
test had compared the page with the context object that produced it, so both
sides agreed on the same wrong number.

---

## 3 · Unit by unit

### Unit 1 — Introduction to computer · 8 th · 10 pr · 6 marks

**Prerequisite:** none. This is the entry point to the subject and to the
stream.

**Sequence:** what a computer *is* (defined by what it does to data) → what it
is good at → where it is used → how computers are classified. Definition before
vocabulary, vocabulary before classification.

**Objectives:** define a computer and name the four stages; distinguish data
from information; state the characteristics and identify which belong to the
machine rather than to the answer; give applications across six fields in
Nepal; name the five bases of classification and place any machine in all five.

**Theory:** 1.1 definition and the IPO cycle · 1.2 seven characteristics and
GIGO · 1.3 applications in Nepal · 1.4 five bases.

**Practical (10 hrs, internal):** chart of a computer and its parts;
presentation on features and application areas; speech on the role of computers
in education; chart of types by working principle; presentation on hybrid and
supercomputers; presentation on types by purpose, by size and data handling, and
by model and brand.

**Assessment:** 8 authored practice questions; 4 exam-style questions with model
answers; one drill; one prediction; two worked examples.

### Unit 2 — Computer Components · 10 th · 10 pr · 7 marks

**Prerequisite:** Unit 1's definition — input, process, output and storage are
the four units this unit names the hardware for.

**Sequence:** the system as a whole → input devices → output devices (softcopy,
then hardcopy) → memory unit in outline → processing unit.

**Objectives:** name the units of a computer system and what each does; identify
roughly twenty input and output devices and classify each; distinguish softcopy
from hardcopy output; explain what a microprocessor is and what clock speed and
word length mean.

**Theory:** 2.1 components overview · 2.2 input devices · 2.3 output devices,
both kinds · 2.4 memory unit (outline only; Unit 4 is the depth) · 2.5
microprocessor.

**Practical (10 hrs):** presentation on the computer system and its main units;
"CPU is the brain" presentation; survey of hardware in the computer lab; chart
of hardware types; a visit to a computer maintenance or sales centre to record
current devices.

**Interactive:** parts lab.

**Note for the author:** 2.3 is **one** topic with two halves. Teach softcopy
and hardcopy as two subsections under one anchor — do not re-split it. See
discrepancy D-1.

### Unit 3 — Computer software · 10 th · 8 pr · **9 marks** — heaviest unit

**Prerequisite:** Unit 2's hardware. Software is defined against it.

**Sequence:** what software is → its families → the operating system in depth →
how a user meets it (CUI/GUI) → open source.

**Objectives:** define software and distinguish it from hardware; classify
system, application and utility software with examples; state the functions of
an operating system; name the types of OS; compare CUI and GUI; explain what
open-source software is and name examples a Nepali student can actually use.

**Theory:** 3.1–3.2 software and its types · 3.3–3.5 the operating system, its
functions, characteristics and types · 3.6 CUI and GUI · 3.7 OSS.

**Practical (8 hrs):** collect names of software used in hospitals, hotels and
schools and discuss their purpose; presentation on system, application and
utility software in the lab; presentation on a familiar open-source program;
interviews with teachers, family and friends about the devices and operating
systems they use, written as a field report.

**Interactive:** decision drill — system, application or utility.

### Unit 4 — Memory/Storage Unit · 10 th · 6 pr · 8 marks

**Prerequisite:** Unit 2's memory unit in outline.

**Sequence:** what memory is → the two families → cache as the in-between →
primary in depth → secondary in depth.

**Objectives:** define memory and explain why a computer needs it; distinguish
primary from secondary and volatile from non-volatile; place cache in the
hierarchy; name the types of RAM and ROM; classify storage as magnetic, optical
or flash and give current examples.

**Theory:** 4.1–4.3 definition, types, cache · 4.4 primary memory, RAM and ROM
families · 4.5 secondary memory, three storage technologies.

**Practical (6 hrs):** presentation on memory and its main types; HDD versus
SSD; survey of storage hardware in the lab; chart of memory types; a visit to
collect current memory devices.

**Interactive:** memory-hierarchy explorer.

### Unit 5 — Internet and its Application · 10 th · **12 pr** · 8 marks

**Prerequisite:** Units 2 and 3 — the internet needs both hardware and software.

**Sequence:** what the internet is and what it gives you → what you need to
connect → what you can do with it.

**Objectives:** define the internet and state its advantages; list what an
internet connection requires; explain nine named applications, including the
ones a Nepali household meets — e-governance, e-commerce, email, search.

**Theory:** 5.1 internet and advantages · 5.2 requirements · 5.3 the nine
applications.

**Practical (12 hrs — the most in the subject):** collect the names of ISPs
operating locally; presentation on internet applications; a presentation on
current trends of internet use in Nepal.

**Interactive:** none beyond prediction. The doing is the practical work.

### Unit 6 — Multimedia · 8 th · 8 pr · 6 marks

**Prerequisite:** Unit 3's application software.

**Sequence:** what multimedia means → its five components → where it is used.

**Objectives:** define multimedia; name and describe its five components; give
applications in education, entertainment, business and training.

**Theory:** 6.1 definition · 6.2 text, audio, video, image, animation · 6.3
applications.

**Practical (8 hrs):** presentation on multimedia applications; presentation on
the elements of multimedia; **a multimedia presentation on a contemporary
topic** — the unit's own skill, demonstrated.

### Unit 7 — Emerging Technology · 8 th · 10 pr · 6 marks · **9 topics**

**Prerequisite:** Units 1–6. Each concept here rests on earlier vocabulary.

**Sequence:** what "emerging" means → eight concepts, each in one short section.
Nine topics in eight hours is the tightest ratio in the subject: roughly fifty
minutes each. Depth per concept must be deliberately shallow and the
connections between them explicit.

**Objectives:** explain in a sentence or two what each of AI, cloud and
distributed computing, IoT, big data, data mining, cryptography, VR and AR is,
with one example each — preferably one a student has met.

**Theory:** 7.1 introduction · 7.2–7.9 the eight concepts.

**Practical (10 hrs):** presentation on emerging technology; storing a file in
cloud storage, demonstrated; presentation on services over the cloud; a
presentation on the Sophia robot in Nepal; IoT with examples; e-governance.

**Interactive:** decision drill — scenario to concept.

---

## 4 · Hours and the risk the table shows

| Unit | Topics | Theory hrs | Hours per topic |
|---:|---:|---:|---:|
| 1 | 4 | 8 | 2.0 |
| 2 | 5 | 10 | 2.0 |
| 3 | 7 | 10 | 1.4 |
| 4 | 5 | 10 | 2.0 |
| 5 | 3 | 10 | 3.3 |
| 6 | 3 | 8 | 2.7 |
| 7 | **9** | 8 | **0.9** |

**Unit 7 has the least time per topic and Unit 5 the most.** That is the
curriculum's allocation, not ours, and it drives the plan: Unit 5 can afford
depth, Unit 7 must be nine tight sections with a drill tying them together.
Unit 3 carries 9 marks in 1.4 hours per topic and deserves the most careful
authoring.

## 5 · What this blueprint does not do

- It does not author Units 2–7. They are planned, not written.
- It does not transcribe the learning outcomes (folios 11–12).
  **The practical activity texts (folios 15–17) were transcribed in Phase
  12.1**, read visually as rendered pages as well as by two extractors, and
  all 32 of them for all seven units are in
  [the practical mapping](GRADE-9-COMPUTER-APPLICATION-PRACTICAL-MAPPING.md).
  Unit 1's six are on its page.
- It does not claim any of it has been reviewed by a teacher or tried with a
  student.
