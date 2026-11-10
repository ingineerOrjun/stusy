# Grade 9 — implementation roadmap

Subject by subject, in an order chosen by what a Grade 9 student needs first
and what Gyansetu can do well. **No content is authored yet.** This is the
plan, and the first task in every subject is the one Phase 11 could not finish:
verifying that subject's topic list against the PDF.

---

## 1 · The order, and why

| # | Subject | Hrs | Marks | Topics | Why here |
|---:|---|---:|---:|---:|---|
| 1 | **Fundamentals of Computer and Application** | 64 | 50 | 37 | The foundation subject, and the one that needs the least new machinery — explanation, diagrams and retrieval, all of which exist. The right place to prove the Grade 9 pattern before committing to it four times |
| 2 | **Programming Principles and Concept in C Language** | 64 | 50 | 35 | Gyansetu's strongest existing machinery is for code: the tracer, the snippet highlighter, worked-example think gates and the quiz engine were all built for C++. C is the nearest neighbour, and Grade 10's OOP course assumes this one |
| 3 | **Website Design** | 64 | 50 | 50 | Most topics, heaviest practical weighting, and the only subject where the student's work is itself a web page. Needs a component that does not exist yet — see §3 |
| 4 | **Fundamentals of electro-system** | 64 | 50 | 47 | Most physical and least served by what exists. Grade 10 Hardware Unit 1 already teaches charge, semiconductors and PN junctions, so some diagrams will transfer, but circuits need their own visual vocabulary |

Ordering is by **readiness of the machinery**, not by curriculum order. Doing
Electro-System first would mean inventing a circuit visualiser before knowing
whether the Grade 9 lesson shape works at all.

## 2 · Per-subject sequence

The same five steps each time. Step 0 is not optional.

**0 · Verify the topic list.** Read that subject's scope-and-sequence in the
PDF against `content/syllabus.js`, topic by topic, and record the result.
Phase 11 did this for C Language and found one topic in the wrong unit across a
7-mark/13-mark boundary. The other three subjects have not had this pass.
*Nothing else in the subject starts until this is done.*

**1 · Curriculum data.** Transcribe learning outcomes and practical activities
for the subject. Add its `pages.js` entry, its hero, and its lesson files under
the reserved prefix.

**2 · Author unit by unit.** For each unit: objectives, explanation in both
languages, the diagrams the concept needs, worked examples, misconception and
memory hook, exam-focus questions. Add the `coverage.js` entry for every
official topic as it is written, never afterwards — Grade 10 proved that
retrofitting a coverage map is archaeology.

**3 · Assessment.** A `grade9-<slug>.js` bank weighted to the specification
grid from the start. Grade 10's OOP bank was built without the grid and ended
up with the second-heaviest unit holding zero questions; the grid for every
Grade 9 subject is already on file, so there is no excuse for repeating it.

**4 · Verify and record.** Build, full suite, coverage gate, three language
modes, responsive sweep on the new pages, and a completion record that says
what was *not* done.

## 3 · What has to be built that does not exist

Each is justified by a specific topic, not by a wish for more features.

| Component | For | Why nothing existing serves |
|---|---|---|
| **A flowchart / algorithm visualiser** | C Language 1.4 *Program Design Tools (Algorithm and Flowchart)* | The existing tracer steps through code; a flowchart is a different representation, and the curriculum names it explicitly |
| **A live HTML/CSS pane** | Website Design 3–6, 43 of 64 hours | The student must see markup become a page. Must obey the offline-first and `default-src 'none'` constraints — a sandboxed static preview, not a network editor |
| **A circuit builder** | Electro-System 3 *Electric circuit*, 13 hrs / 10 marks | Series and parallel behaviour is a cause-and-effect relationship — exactly the case where animation earns its place |
| **A practical-activity block** | All four, and 18 of 50 internal marks | The curriculum has a practical table per subject that Gyansetu has no place to put. Needed before any subject can claim full coverage |

**Not to be built:** a decorative animation, a simulator for a topic that reads
fine as prose, or a Grade 9 copy of a Grade 10 component that only differs in
labels.

## 4 · Reusable as-is

Diagram runtime and both static and animated diagram formats · decision drills
(`sim-drill.js` takes a new set, not a new component) · faded practice ·
worked-example think gates · prediction blocks · the quiz engine and its
seeded-draw tests · retrieval records · the revision and prerequisite services ·
all three language modes · every accessibility and responsive guard.

## 5 · Rough shape of the work

Grade 10 took several phases per subject. Grade 9 should be faster per topic —
the machinery exists and the curriculum is already verified at unit level — and
slower where a new component is needed. A realistic sequence is one subject per
phase, with Website Design and Electro-System each likely needing a component
phase before the content phase.

| Phase | Work |
|---|---|
| 12 | Computer Fundamentals: topic verification, then all 7 units |
| 13 | C Language: topic verification, flowchart visualiser, 7 units |
| 14 | Website Design: topic verification, HTML/CSS pane, 7 units |
| 15 | Electro-System: topic verification, circuit builder, 7 units |
| 16 | Grade 9 integrity pass — the Phase 9 equivalent, done once rather than retrofitted |

**No dates.** Nothing here has been estimated against anybody's availability,
and a schedule invented now would be the least evidence-backed thing in this
document.

## 6 · What must stay true throughout

- Grade 10 does not regress. `tests/curriculum.test.js` pins its 39 URLs,
  150/150 coverage and per-subject question counts.
- Every Grade 9 topic is traced to content someone read, never to a heading.
- Nepali is written, not translated — and it joins the **same review package**,
  which still has zero reviewed items.
- The three limitations carried from Grade 10 stay stated: no teacher review,
  no screen-reader test, no established examination edition.

## 7 · The first thing to do next

**Verify Fundamentals of Computer and Application's topic list against pages
13–19 of the PDF**, and record the result the way the source audit records
`G9-D1`. It is bounded, it is the gate on everything else in that subject, and
Phase 11 found a real error the one time it was done.
