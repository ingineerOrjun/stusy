# Grade 10 — regression baseline

Measured at the start of Phase 11, on `main` at `49d20b7`, before any Grade 9
work. **Grade 10 is finished, deployed and in use; Phase 11 opens a second
grade beside it.** The risk of that is not a dramatic break — it is erosion.

These numbers are the line. Most are now asserted by
`tests/curriculum.test.js`, so a loss fails a test rather than waiting to be
noticed.

---

## 1 · The baseline

| | Value | Pinned by a test? |
|---|---:|---|
| Automated tests | **397** (403 after Phase 11's six) | the suite itself |
| Production build | passes | the suite |
| Built Grade 10 URLs | **39** | **yes**, each by name |
| Subjects | 4 | yes |
| Authored pages in `pages.js` | 34 | yes |
| Units | 24 | yes, per subject |
| Official topics | **150** | **yes** |
| Topics with a coverage map entry | **150 / 150** | **yes**, independently of `validate.js` |
| Questions across four banks | **188** | **yes**, per subject, as a floor |
| Credit hours per subject | 64 | yes |
| External marks per subject | 50 | yes |
| Diagrams | 70 | build output |
| Animated diagrams | 15 | build output |
| Retrieval questions | 82 | build output |

### Per subject

| Subject | Pages | Units | Topics | Mapped | Questions | Hrs | Marks |
|---|---:|---:|---:|---:|---:|---:|---:|
| DS & OOP using C++ | 10 | 6 | 35 | 35 | 52 | 64 | 50 |
| Database Management System | 9 | 7 | 39 | 39 | 52 | 64 | 50 |
| Digital Design & Microprocessor | 7 | 5 | 39 | 39 | 54 | 64 | 50 |
| Hardware, Repair & Maintenance | 8 | 6 | 37 | 37 | 30 | 64 | 50 |
| **Total** | **34** | **24** | **150** | **150** | **188** | | |

## 2 · The 39 URLs

Each is asserted by name. An existing link to any of them must not become a 404.

```
grade10/index.html
grade10/oop-cpp/         index quiz revise tables trace unit1..unit6   (11)
grade10/dbms/            index quiz revise unit1..unit7               (10)
grade10/digital-design/  index quiz revise unit1..unit5                (8)
grade10/hardware/        index quiz revise unit1..unit6                (9)
```

## 3 · What the protections catch

Each was introduced deliberately and reverted.

| Mutation | Result |
|---|---|
| A Grade 9 lesson named `c-u1.html` appears, i.e. a file outside the Grade 10 naming scheme | **fails** — names the file and the reserved prefixes |
| A Grade 10 question bank loses one question (30 → 29) | **fails** — names the subject and both counts |
| A Grade 10 unit's marks disagree with the grid (DBMS u4, 14 → 13) | **fails the build**, names the unit and cites the grid |
| A Grade 9 outline disagrees with the Grade 9 grid on hours (16 → 15) | **fails** — names subject, unit, both values |
| A Grade 9 mark mistyped so the subject no longer totals 50 | **fails** |
| A site-map subject with no curriculum behind it | **fails** |

## 4 · Phase 11's effect on Grade 10

| Change | Grade 10 impact |
|---|---|
| Grade 9 added to `specification-grid.js` | None — new keys |
| `syllabus.js`: `Operators in C` moved to its official unit | None — Grade 9 data |
| `validate.js`: grid rule skips a subject with no pages | **Checked.** The rule still fails on a real Grade 10 disagreement; verified by mutation |
| `tests/curriculum.test.js` added | Adds protection, removes none |
| Grade 10 page citations confirmed, "approx." dropped | Comment only |

**No Grade 10 source file, lesson, question bank, diagram, stylesheet or runtime
module was modified.**

## 5 · After Phase 11

| | Before | After |
|---|---:|---:|
| Tests | 397 | **403** |
| Failing | 0 | **0** |
| Build | passes | passes |
| Grade 10 coverage | 150 / 150 | **150 / 150** |
| Grade 10 URLs | 39 | **39** |
| Grade 10 questions | 188 | **188** |

No test was skipped, weakened or removed.

## 6 · Limitations this does not address

Carried unchanged from Phase 9.5, for Grade 10 and now Grade 9 alike:

- **No Nepali teacher has reviewed any content.** 0 of 1,956 items.
- **No screen reader has been run.** No WCAG 2.1 AA claim.
- **The applicable examination curriculum edition is unestablished.**

These are not resolved by anything in Phase 11.
