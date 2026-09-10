# Phase 8 — Class 10 Hardware & Repair: Completion Report

**Read this first.** The bulk of this subject — six units, 37 syllabus
topics, 13 diagrams, the parts lab, the fault lab, 30 questions — was
authored in the phase immediately before this one and is documented in
[PHASE-HARDWARE-CONTENT-AUDIT.md](PHASE-HARDWARE-CONTENT-AUDIT.md) and
[PHASE-HARDWARE-COMPLETION-REPORT.md](PHASE-HARDWARE-COMPLETION-REPORT.md).
That work was not redone.

This document records what **this** brief asked for that the previous
phase did not deliver, and it is short because most of the brief was
already satisfied. Every number was measured.

---

## 1 · What this phase added

| | |
|---|---|
| **Boot-sequence animation** | `hwBootSequence`, 7 steps — §8 named it explicitly and it did not exist |
| **Port-matching simulation** | `portmatch` drill set, 4 cases — §9B; the previous phase refused this, and that refusal was wrong |
| **Second guided-practice skill** | `hw.restore`, 5 rungs to transfer — §11, and a gap the previous report flagged itself |
| **Syllabus-coverage validator** | §27 — the build now fails if a syllabus topic has no content |
| **A platform defect fixed** | Prev and Reset were visually inert on **all 15 animated diagrams** since Phase 2 |
| **Regression guard** | `tests/diagram-reset.test.js`, 5 tests |

Subject totals after this phase: **14 diagrams (4 animated)**,
**2 guided-practice skills**, **8 drill sets used**, **2 fault
scenarios**, **2 parts labs**, **30 questions**, **12 worked examples**,
**6 think gates**.

---

## 2 · The boot animation — why it was the biggest miss

Unit 4 teaches diagnosis as *"read how far the boot reached, and let
that rule out everything after it."* That rule is the spine of the
subject, and the previous phase shipped it with **no picture of the
boot**. §8 named the sequence directly.

`hwBootSequence` walks Power ON → POST → BIOS/CMOS → find boot device →
load OS → desktop, and each stage carries **the symptom you see if the
machine stops there**. Stepping through it is stepping through the
diagnostic map forwards, which is why it teaches rather than decorates:
a student who has watched where *beeping* lives can answer "fans spin,
screen black, beeping" without being told.

The final step states the rule the whole unit rests on.

---

## 3 · The refusal I reversed

The previous phase declined a port-matching simulation, arguing the
syllabus covers connection issues as a *fault* topic rather than as port
identification. Re-reading topic 5.6 — *"Input and output device
connection issues"* — that was too strict. §9B asked for it directly and
the syllabus supports it.

It was built as a **`sim-drill` data set, not a new component**. A drill
is already exactly this shape: one case, named options, a reason on the
answer. A bespoke port widget would have been a second engine doing the
same job.

Two of its four cases are faults that *"fit"* and still fail — an RJ-11
plug loose in an RJ-45 socket, and headphones in the microphone jack.
Neither gives an error message, which is the point.

---

## 4 · The syllabus-coverage validator (§27)

Every other content rule in `validate.js` protects the **shape** of a
page. None could notice the one failure that matters most: a syllabus
topic that was never written. The build knew the official topic list and
knew what had been authored, and never compared the two.

`_source/content/coverage.js` maps each **exact** topic string to the
lesson anchor teaching it. Three ways to fail:

| Rule | The real event it catches |
|---|---|
| **missing** | a topic on the official list with no content |
| **dangling** | content claiming an anchor that no longer exists — what a refactor leaves behind |
| **stale** | an entry for a topic the syllabus no longer lists — what a curriculum revision leaves behind |

Exact strings rather than indexes, deliberately: an index map survives a
topic being reworded, which sounds convenient and is precisely the
silent-drift failure.

**Proven by mutation — 3/3 caught**, each failing the build:

```
CAUGHT  a syllabus topic with nothing covering it
        -> the syllabus lists "Introduction to RAID" and nothing covers it
CAUGHT  content claiming an anchor that no longer exists
        -> "Hard drives — construction and operation..." claims #hw-t35, which does not exist
CAUGHT  a map entry the syllabus no longer lists
        -> "Introduction to Blockchain Storage" is not a topic in the current syllabus
clean build after restore: ok
```

**Opt-in per subject.** Only `grade10/hardware` has a map. Retro-fitting
one for the three subjects written before this rule existed would mean
recording a guess as a fact.

---

## 5 · The defect this phase found — and it was not mine

§28 says to actually drive the animations rather than infer. Doing that
on the new boot diagram showed:

```
4 next: step 4 / 7  on=4
prev:   step 3 / 7  on=4   <-- counter moved, picture did not
reset:  step 0 / 7  on=7   <-- "step 0" with everything revealed
```

I checked whether I had caused it. **`txnStates`, a Phase 4 DBMS
diagram, behaved identically** — so this was platform-wide and roughly
three phases old.

**The cause.** `reset()` cleared `.on` only from elements carrying an
animation class:

```js
this.$('.dia-step, .dia-dim, .dia-focus, .dia-draw, .dia-travel')
```

Every animated diagram in the library marks its stages as plain
`<g id="...">` with **no class**. `_applyStep` added `.on` to them;
`reset()` could never find them to take it off. Forward stepping only
ever adds, so **Next looked perfect** — which is how it survived five
subjects unnoticed.

**What a student experienced:** stepping back showed the caption
*"POST is running"* over a fully-booted diagram, and Reset handed the
next student the finished answer labelled "step 0".

**The fix** collects the selectors the steps themselves target and
clears those too — narrower than clearing every `.on` in the SVG, so it
cannot wipe something an author lit deliberately in the base markup.
Verified on the new diagram **and** on the Phase 4 one:

```
Hardware hwBootSequence:  prev -> on=3 FIXED   reset -> on=0 FIXED
DBMS     txnStates:       prev -> on=2         reset -> on=0
```

**All 15 animated diagrams across four subjects are repaired.**

**Regression guard:** `tests/diagram-reset.test.js`. Reverting the fix
makes **3 of its 5 tests fail**; the 2 that still pass are the ones that
legitimately should, since forward stepping was never broken. Its fifth
test asserts every animated diagram in the library targets id
selectors — because a future diagram using a class selector would make
Prev go quiet again for that one diagram, which is exactly how the
original hid.

---

## 6 · Verification

### Tests — 379 passing (374 + 5 new), run three times

```
run 1: tests 374  pass 374  fail 0
run 2: tests 374  pass 374  fail 0
run 3: tests 374  pass 374  fail 0        (before the 5 new guards)
final: tests 379  pass 379  fail 0
```

No flakiness across consecutive runs.

### Build — deterministic

Two consecutive full rebuilds, checksummed across every generated file:

```
b8515880d4b0f784728f7fa2871345d8
b8515880d4b0f784728f7fa2871345d8
```

### Interaction — driven, not inferred

| Component | Result |
|---|---|
| Boot animation | next ×4 → 4 stages; **prev → 3**; **reset → 0**; final step reached; play `aria-pressed=false` |
| Fault lab | unsafe choice recorded, options unchanged, **diagnosis did not advance**; 3 good checks → fix; reset restored start |
| Parts lab | 7/7 targets, one region lit at a time, `aria-pressed` follows |
| Port drill | mounted, 4 options |
| `hw.restore` guided | mounted with the worked problem and its 3 steps |
| Quiz | 12 drawn from the 30-question bank |

### Viewports — every width §21 lists

| 320 | 390 | 430 | 768 | 1024 | 1280 | 1440 |
|---|---|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 0 | 0 | 0 |

Horizontal overflow, in pixels. At 320 px a 520 px diagram scrolls
inside its own `is-scrollable` figure and is not clipped.

### Console

**No errors** on the Hardware pages.

### Language modes

Bilingual / English / Nepali all correct on built pages; **9
runtime-emitted Nepali elements, 0 untagged**. Reduced-motion media
rules present in the served sheet and `MotionService` loaded.

### Regression

Existing subjects unaffected — the DBMS diagram check above is a direct
verification that the shared-runtime change helped rather than broke
them. No new dependencies; the project still has zero.

---

## 7 · Remaining issues — stated plainly

1. **No screen reader was heard.** Structure, names, roles and language
   attributes were checked in the DOM. What Narrator or NVDA *speaks*
   remains unverified, as in every prior phase. **No WCAG conformance is
   claimed.**

2. **Coverage validation is opt-in and covers one subject.** OOP, DBMS
   and Digital Design have no coverage map, so a missing topic in those
   would still pass. Writing their maps is real work and should be a
   phase, not a footnote.

3. **The coverage map allows two topics to share an anchor** (three do).
   That is honest where topics are genuinely taught together, and it
   also means a thin treatment of one of them would not be detected. The
   validator checks presence, not depth — and depth is not mechanically
   checkable.

4. **Unit 3 still has no worked-example think gate.** Deliberate: its
   two examples are a capacity calculation and a format comparison, both
   demonstrations rather than predictions.

5. **§9D component compatibility and §9E repair-procedure sequencing
   were not built.** Neither is a syllabus topic — the outline covers
   maintenance as a checklist and never mentions compatibility rules.
   Building them would be inventing curriculum, which §3 forbids.

6. **The `hwCooling` and `hwSystemUnits` diagrams remain static** despite
   §8 listing airflow and data movement as candidates. Airflow is one
   path with no state change, and the system-units diagram is already
   interactive through the parts lab — animating either would add motion
   without adding meaning.

---

## 8 · Recommended next phase

**Coverage maps for the other three Grade 10 subjects.** The validator
exists and is proven; the gap is now that it protects one subject out of
four. That is a contained, high-value phase with a clear finish line.

Secondary: the Phase 8.1 audit's outstanding items — the per-diagram
classification of all 69, and `db-u3` having no diagrams at all.

**Programming in C was not started.**
