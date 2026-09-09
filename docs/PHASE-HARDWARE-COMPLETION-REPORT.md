# Phase — Hardware & Repair: Completion Report

Every number below was measured from the repository or from the running
pages. Nothing is estimated, and technical wrappers are not counted as
learning components.

---

## 1 · What was implemented

**Computer Hardware, Electronics Repair & Maintenance is complete
against the CDC syllabus.** It was the last Grade 10 subject with no
authored content; it now has the same architecture, interaction model
and validation coverage as the other three.

| | Before | After |
|---|---:|---:|
| Authored unit pages | 0 | **6** |
| Syllabus topics covered | 0 / 37 | **37 / 37** |
| Hours / marks registered | — | **64 hrs / 50 marks** |
| Diagrams | 0 | **13** (3 animated) |
| Simulations mounted | 0 | **9** |
| Worked examples | 0 | **12** |
| Predictions | 0 | **6** |
| Retrieval questions | 0 | **18** |
| Misconception blocks + memory hooks | 0 | **6 + 6** |
| Exam-connect blocks | 0 | **6** |
| Question bank | absent | **30 questions** |
| Guided practice | 0 | **1 skill, 5 rungs** |
| Prerequisite edges | 0 | **4** |

### Pages

`unit1` … `unit6`, plus `revise.html` and `quiz.html` — 8 pages, all
generated through the existing page writer with no special-casing.

### Per unit, as measured from source

| Unit | Words | Topics | Figures | Sims | Worked ex | Gates | Predict | Retrieval | Tables |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 Electronic Devices | 1919 | 5 | 4 | 1 | 2 | 1 | 1 | 3 | 0 |
| 2 Computer System | 1882 | 5 | 2 | 2 | 2 | 2 | 1 | 3 | 0 |
| 3 System's Core | 2310 | 7 | 3 | 1 | 2 | 0 | 1 | 3 | 0 |
| 4 Troubleshooting | 2229 | 6 | 1 | 2 | 2 | 1 | 1 | 3 | 1 |
| 5 Repair & Maintenance | 2444 | 7 | 1 | 2 | 2 | 1 | 1 | 3 | 1 |
| 6 Backup & Recovery | 2322 | 6 | 2 | 1 | 2 | 1 | 1 | 3 | 0 |
| **Total** | **13,106** | **36** | **13** | **9** | **12** | **6** | **6** | **18** | **2** |

---

## 2 · Diagrams added — 13, of which 3 animate

**Animated** (each earns motion; the reasoning is in the audit §5):

| Name | Steps | What moves |
|---|---:|---|
| `hwPnJunction` | 6 | The depletion region narrowing and widening under bias |
| `hwHddRead` | 7 | Seek → rotational delay → transfer, one read at a time |
| `hwBackupTypes` | 3 | What each method copies across one working week |

**Static** — `hwMatter`, `hwKirchhoff`, `hwDoping`, `hwSystemUnits`,
`hwDisplayTech`, `hwMotherboard`, `hwPartition`, `hwTroubleshootSteps`,
`hwCooling`, `hwRaid`.

All 13 carry a `<title>` for screen readers, use design tokens rather
than literal colours, and scale inside the platform's `is-scrollable`
figure wrapper.

---

## 3 · Two new runtime components, and why each was justified

The brief forbids duplicating existing functionality. Four existing
components were reused unchanged — `predict.js`, `retrieval.js`,
`wexthink.js`, `guided.js` — and `sim-drill.js` gained four new data
sets without a line of engine code changing.

Two things could not be expressed by anything that existed.

### `sim-parts.js` — the parts lab (183 lines)

*Used by Units 2 and 3.*

Two of the three things a hardware paper asks about a component cannot
be taught by text: **what it looks like and where it sits**. A drill
answers "P-type or N-type?" well and cannot answer "where is the CPU
socket", because that answer is a position.

**The accessibility decision that shaped it:** the obvious build is
clickable hotspots on the SVG. That locks out every student not using a
mouse — SVG shapes are not focusable, take no accessible name, and hand
a screen reader a picture with nothing in it. So the control surface is
a row of real `<button>`s, and selecting one highlights the matching
region *in* the diagram. The student still learns the position; they are
just not required to find it with a pointer first.

It refuses to mount if a highlight target is missing, rather than
silently dropping a button and teaching the wrong position.

### `sim-fault.js` — the fault lab (267 lines)

*Used by Units 4 and 5.*

Unit 4 is twelve hours of diagnostic reasoning and the practical exam
tests it directly. A fault is **narrowed**, not classified: the student
sees a symptom, decides what to check, learns what that ruled in and
out, and decides again. `sim-drill.js` marks one answer and stops; it
cannot branch.

**What it teaches that a quiz cannot.** Every choice carries a quality:

- `good` — narrows the most for the least effort
- `wasteful` — legitimate, but a later step; the verdict says what it cost
- `unsafe` — never do this; **it is recorded and explained but does not advance the diagnosis**

That last rule is the component's whole point. Letting an unsafe choice
move things forward would teach that order does not matter, which is the
opposite of the lesson. A student who only hears "correct" and
"incorrect" learns to guess; one who hears *"that would have worked, but
it costs twenty minutes and you had not ruled out the cable"* learns the
order.

There is no "show answer" button, because the answer is not a fact — it
is the path.

---

## 4 · Question bank — 30 questions

| Unit | Questions | | Difficulty | Count |
|---|---:|---|---|---:|
| 1 Electronic Devices | 4 | | easy | 6 |
| 2 Computer System | 4 | | medium | 18 |
| 3 System's Core | 6 | | hard | 6 |
| 4 Troubleshooting | 5 | | | |
| 5 Repair & Maintenance | 5 | | | |
| 6 Backup & Recovery | 6 | | | |

Weighted toward Units 3–5, which carry 27 of the 50 marks.

**Ten of the thirty present a situation and ask for the diagnosis**
rather than asking for a term — the kind this subject is actually
examined on, and the kind a definition-only bank cannot test. Every
distractor is a real student answer; the explanations say why the wrong
one is tempting, because "incorrect" teaches nothing.

The quiz page draws 12 from the bank per attempt, verified rendering
against `data-subject="grade10/hardware"`.

---

## 5 · Guided practice — `hw.diagnose`

Five rungs: `worked → partial → guided → independent → transfer`.

The skill is *"read a symptom, decide how far the boot reached, and name
what that rules out"*. The transfer problem moves the same rule to a
**printer that prints two pages and stops** — a symptom the unit never
discusses, so it cannot be answered by recognising a case.

This does not duplicate the fault lab in the same unit. The lab offers a
fixed set of checks, so it teaches **order**. This asks the student to
produce the reasoning with nothing on screen, which is what the written
paper demands — *"describe how you would find the fault"* is answered in
sentences, not by picking from a list.

---

## 6 · Verification

### Build

```
content validation: 8 subjects, 7 outlines, 34 authored pages
                    across 4 subjects, 68 diagrams — OK
learning map: 24 units, 23 prerequisite edges, 82 retrieval questions
```

Deterministic: the build reproduces committed output byte-identically.

### Tests — 374 passing, 0 failing

The existing suite caught **four real contract violations** in this work,
each fixed rather than worked around:

| Failure | What it caught |
|---|---|
| *no authored unit is read-only* | 5 of 6 units had fewer than 2 worked examples. **7 were added**, each a real procedure. |
| *the independent problem shows no steps* | The `independent` **and** `transfer` rungs were still scaffolded. Steps removed; reasoning folded into the question. |
| *every step can be marked* | A practice answer was too long to mark by comparison. Shortened to one word. |
| *components use semantic tokens* | New CSS used a raw hex. Replaced with `--color-text-muted`. |

### Functional — driven in a browser, not inferred

- **Fault lab:** clicked an `unsafe` option → recorded in the trail with the `fault-unsafe` class, options unchanged, **diagnosis did not advance**. Then three good checks → diagnosis and fix shown, "reached it in 4 checks". Reset restored the start state.
- **Parts lab:** 7 buttons, **7/7 highlight targets present**, selecting one sets `aria-pressed="true"` and lights exactly one SVG region; selecting another clears the first.
- **All 6 units:** drills mounted (3–4 options each), animated diagrams expose 4 controls, **18/18 retrieval questions gated**, worked-example gates create their `.wex-work` container.
- **Quiz:** renders 12 questions, subject resolved as `grade10/hardware`.
- **Revision page:** loads, no blank container.

### Language modes — verified on the built pages

| Mode | English prose | Nepali prose | `.np-cell` | Parts-lab button EN | button NE |
|---|---|---|---|---|---|
| Bilingual | visible | visible | visible | visible | visible |
| English | visible | **hidden** | **hidden** | visible | **hidden** |
| Nepali | **hidden** | visible | visible | **hidden** | visible |

**Runtime-emitted Nepali: 9 elements, 0 untagged.** Both new components
put `lang="ne"` on the `.t-ne` span itself — markup a runtime writes
never passes through the build's `markNepali` step, which is how Phase 6
found 82 Devanagari runs being read by an English voice.

### Responsive — measured, page with the widest content

| Width | Horizontal overflow |
|---|---|
| 320 px | **0** |
| 390 px | **0** |
| 430 px | **0** |
| 768 px | **0** |
| 1280 px | **0** |

At 320 px a 520 px diagram sits inside a 288 px figure with
`overflow-x: auto` and is **not clipped** — the platform's existing
`is-scrollable` wrapper. Fault-lab option buttons measure 77–104 px tall.

### Accessibility — checked, not claimed

| Check | Result |
|---|---|
| One `<h1>` per page | ✅ |
| One `<main>` per page | ✅ |
| `<th>` without `scope` | **0** |
| Buttons with no accessible name | **0** |
| `svg[role="img"]` without `<title>` | **0** |
| Touch targets under 24 px | **0** (parts buttons `min-height: 44px`) |
| Fault-quality signalled by colour alone | **No** — each state also appends a word (*"good call"*, *"costly, and out of order"*, *"do not do this"*) |
| Reduced motion | Honoured; hover transforms and SVG transitions disabled |

**No WCAG conformance is claimed.** These are the checks that were run,
and they are DOM-level. See limitations.

---

## 7 · Known limitations

1. **No screen reader was heard.** Structure, names, language attributes
   and roles were verified in the DOM. What Narrator or NVDA actually
   *speaks* on these pages remains unverified, as in every prior phase.

2. **The fault lab has two scenarios.** They cover the two most examined
   symptoms (no display; restarts when hot). A third — "no boot device"
   — is handled as a worked example instead, which is honest but less
   interactive.

3. **One guided-practice skill for the subject.** Unit 4's core procedure
   is covered; Unit 6's restore-set counting would justify a second.

4. **Marks were derived, not given.** The syllabus supplies hours only.
   The 8/8/9/9/9/7 split follows the hours and the 50-mark grid every
   other subject uses, and is documented at the point of use. If the
   official grid differs, that one line is where to change it.

5. **Unit 5 covers eleven topics in 9 marks.** Its treatment of each is
   short by design. The alternative was padding.

---

## 8 · Recommendations

| | |
|---|---|
| **Next, if this subject is revisited** | A second guided-practice skill for Unit 6, and a third fault scenario for "no boot device". |
| **Platform-wide** | `sim-parts.js` and `sim-fault.js` live in the shared learning layer and carry no hardware-specific assumptions. A second subject can use either by adding a data set. |
| **Still outstanding across the product** | The Phase 8.1 audit found gaps that this phase did not address: the per-diagram classification of all 55 (now 68), and `db-u3` having no diagrams. |

**Grade 10 is now complete: four subjects, 24 units, 256 hours,
200 marks.** The one remaining subject in the site map with no authored
content is Grade 9 Programming in C, which this phase deliberately did
not start.
