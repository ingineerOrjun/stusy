# Phase 12 — Unit 1 implementation report

**Grade 9 · Fundamentals of Computer and Application · Unit 1, Introduction to
computer.** One unit of seven, authored to the standard the rest of the subject
will be held to.

**Curriculum verified ≠ lessons authored ≠ lessons educationally validated.**
This report covers the second. The first is in
[the verification](GRADE-9-COMPUTER-APPLICATION-CURRICULUM-VERIFICATION.md). The
third has not happened: no teacher and no student has seen any of this.

---

## 1 · Files

### Created

| File | What |
|---|---|
| `_source/content/lessons/cf-u1.html` | The lesson — four topic sections, two figures, one drill, one prediction, two worked examples, misconceptions, exam focus, four exam questions, key points |
| `_source/content/sections/cf-hero.html` | Subject landing hero |
| `_source/content/sections/cf-quiz.html` | Quiz page section |
| `_source/content/questions/grade9-computer-fundamentals.js` | 8 authored practice questions |
| `docs/GRADE-9-COMPUTER-APPLICATION-CURRICULUM-VERIFICATION.md` | All 36 topics verified |
| `docs/GRADE-9-COMPUTER-APPLICATION-CONTENT-BLUEPRINT.md` | Seven-unit plan |
| `docs/GRADE-9-COMPUTER-APPLICATION-ASSESSMENT-BLUEPRINT.md` | Internal/external split and bank targets |

### Modified

| File | Change |
|---|---|
| `_source/content/syllabus.js` | Discrepancy D-1 — topic 2.3 merged back to one topic |
| `_source/content/specification-grid.js` | `practicalHours` recorded for this subject |
| `_source/config/pages.js` | Subject entry: unit 1, revision, quiz |
| `_source/content/coverage.js` | Unit 1's four topics mapped |
| `_source/diagrams.js` | `cfIpoCycle`, `cfClassify` |
| `_source/runtime/sim-drill.js` | `cfclassify` drill set — a new set, not a new component |
| `_source/build/context.js` | Registers the Grade 9 question bank |
| `_source/build/validate.js` | Partial-authoring support (see §5) |
| `tests/curriculum.test.js`, `tests/content.test.js` | Guards, below |

**No Grade 10 lesson, question bank, diagram, stylesheet or runtime module was
modified.**

### Built output

`grade9/computer-fundamentals/` — `index.html`, `unit1.html`, `revise.html`,
`quiz.html`. Grade 10's 39 URLs unchanged.

---

## 2 · How it maps to the curriculum

Every official topic of Unit 1 has a section, and the coverage map points at it.
The build fails on a missing topic, a dangling anchor or a stale entry.

| Official | Section | Anchor |
|---|---|---|
| 1.1 Introduction to computer | What a computer is — definition, IPO cycle, data vs information | `cf-t11` |
| 1.2 Characteristics of computer | Seven characteristics, and GIGO | `cf-t12` |
| 1.3 Modern Applications of computer | Eight fields, Nepal-specific | `cf-t13` |
| 1.4 Classification of computers (five bases) | Five bases, figure, drill | `cf-t14` |

1.4's five sub-items — size, data handling, purpose, model, brand — are all
taught inside its one section, in the prose, the figure and the drill, which is
why they share its anchor rather than being split out.

### One content decision that needs a teacher's eye

The curriculum names "on the model" and "on the brand" as bases but **does not
enumerate their categories**. The lesson teaches the conventional Nepali
textbook treatment — *desktop / laptop / palmtop* for model, *IBM PC / IBM
compatible / Apple* for brand. That enumeration is **not** in the curriculum
document and is flagged here rather than presented as official. A teacher should
confirm it matches what is taught and examined locally.

> **Corrected in Phase 12.1, after re-reading folio 13.** The statement above
> is true but incomplete, and the incompleteness mattered. The curriculum
> enumerates **no categories under any of the five bases** — not under size or
> data handling either. Its whole text for 1.4 is *"Classification of
> computers: on the basis of size, on the data handling, on the purpose and on
> the model, on the brand"*.
>
> So the page was presenting five lists in one voice when the curriculum
> supplies none of them. Unit 1 now carries a note saying exactly that, and
> singling out model and brand as the two where textbooks genuinely disagree
> and the *IBM PC / IBM compatible / Apple* convention is dated. The student
> is told to follow their own textbook and teacher where those differ.

---

## 3 · Interactive and learning components

| Component | Purpose | Reused or new |
|---|---|---|
| **`cfclassify` decision drill**, 6 cases, 5 options | The unit's real difficulty: five bases that students merge into one list. Each case names a category or describes a machine and asks which basis it answers | **Reused** — `sim-drill.js` took a new data set. No new component |
| **`cfIpoCycle`** figure | "Define a computer with a block diagram" is a standard question, and input→process→output with storage is a shape | New static SVG |
| **`cfClassify`** figure | Five bases as five rows, each with the question it answers | New static SVG |
| **Prediction** — is a calculator a computer? | Surfaces the intuition that "electronic + processes input" is enough, then shows that the stored program is the line | Reused pattern |
| **Worked example 1** — which characteristic? | Separates accuracy from GIGO, the unit's most-lost mark, behind a think-gate | Reused |
| **Worked example 2** — classify one machine five ways | Makes "all five at once" concrete rather than asserted | Reused |
| **Misconceptions + memory hook** | Four named errors; hook is 13 words with Nepali | Reused |
| **4 exam-style questions** with revealed model answers | 2, 2, 4 and 4 marks, matching the forms this unit is examined in | Reused |

**Nothing decorative was added.** Three of the four official topics have no
interactive component, because characteristics and applications are lists and a
list is already a list.

### Verified by operating it, not by its presence

The drill was walked through all six cases in a browser: each marked correctly,
counter advancing 1/6 → 6/6. The prediction marks its correct option and reveals
feedback. The quiz draws 8 of 8, marks right and wrong, and shows explanations.

---

## 4 · Language modes

All three verified on the built page by driving the real switcher:

| Mode | Pairs left empty | Stray Devanagari | Stray English | Controls without a label |
|---|---:|---:|---:|---:|
| Bilingual | 0 | — | — | 0 |
| English only | 0 | **0** | — | 0 |
| Nepali only | 0 | — | **0** | 0 |

**64 Devanagari blocks, all carrying `lang="ne"`** — zero without it.

The Nepali is written, not translated. Where the English says "Garbage In,
Garbage Out", the Nepali keeps the English term and explains it in Nepali,
because that is the term a Nepali teacher uses. Technical terms stay in Latin
script — `data`, `information`, `analog`, `digital`, `hybrid`, `IBM compatible`
— matching the rest of the platform and the way the subject is taught.

> **Not reviewed.** No Nepali-speaking teacher has read a word of this. These
> 64 blocks join the review package, which still has zero reviewed items. Two
> decisions worth a reviewer's attention: the characteristic names
> (लगनशीलता for diligence, बहुउपयोगिता for versatility) and whether GIGO should
> be glossed further for a Grade 9 reader.

---

## 5 · One architectural change, and why it was necessary

The build assumed a subject is either fully authored or not authored at all.
Authoring Unit 1 of seven produced **thirty-eight errors** for six units nobody
claimed to have written — the grid rule wanting seven units, and the coverage
rule wanting all 36 topics mapped.

Both now apply to **the units that have a page**, and the completeness
*warning* that already existed covers the rest. The build now says:

```
! pages["grade9/computer-fundamentals"]: 1 of 7 syllabus units authored
  — the subject is incomplete
content validation: ... OK (1 warning(s))
```

That is an accurate description of the state, which the previous behaviour was
not. The protection is undiminished: mutating a Grade 10 unit's marks still
fails the build and names the unit.

### Guards added

| Guard | Catches | Mutation-tested |
|---|---|---|
| Per-unit verified shape of this subject | A topic re-split or a unit's hours/marks edited | Re-split 2.3 → names the unit and both counts |
| Theory + practical = 128 working hours | Practical hours lost or wrong | Removed → fails |
| Lesson prefix per subject | A Grade 9 lesson named `u1.html` overwriting Grade 10 OOP | Created one → fails |
| Coverage map covers authored units only | Adding Unit 2 without mapping it | Covered by the existing rule |
| **Every question bank is registered** | **A bank file that exists but is never wired — the quiz renders an empty box and nothing fails** | Un-registered it → fails |

The last one is the most valuable, because it is the bug this phase actually
shipped for ten minutes: the Grade 9 bank existed, the quiz page built, all
tests passed, and the quiz was **empty**. Only opening it in a browser showed
it. `build/context.js` lists banks by hand and nothing checked the list.

---

## 6 · What Unit 1 is not

- **Not educationally validated.** No teacher has reviewed it; no student has
  used it.
- **Not practically complete.** The curriculum's 10 practical hours for this
  unit — charts, presentations, a speech competition — are summarised in the
  blueprint and have no home on the page yet.
- **Not hard-tested.** The bank has 4 easy and 4 medium questions and no hard
  ones, and it equals the draw, so a retake is the same eight questions
  reordered.
- **Not screen-reader tested.** Structure was checked — one `h1`, zero heading
  jumps, every control named, every Nepali block marked. No screen reader was
  run and no WCAG claim is made.
