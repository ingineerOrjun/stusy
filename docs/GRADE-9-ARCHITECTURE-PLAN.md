# Grade 9 — architecture plan

**Finding: the platform is already multi-grade. Grade 9 needs four small
changes, one of which is a naming rule, and no rewrite.**

This was not assumed from the previous reports — it was established by reading
`config/site.js`, `config/pages.js`, `build/index.js`, `build/validate.js`,
`content/syllabus.js`, `content/coverage.js`, the runtime services and the
generated output.

---

## 1 · What already works, and must not be touched

| Dimension | State | Evidence |
|---|---|---|
| **Grade selection** | Done | `config/site.js` is a list of grades. Grade 9 is `status: "open"` with four subjects; Grades 11 and 12 are `status: "soon"` with none |
| **Grade validation** | Done | `validate.js` requires every grade id to match `grade9\|grade10\|grade11\|grade12` |
| **Curriculum metadata** | Done | Every key is `<gradeId>/<subjectSlug>` in syllabus, coverage, pages, specification grid and question banks |
| **Lesson routing** | Done | Pages are written to `/<gradeId>/<slug>/<file>`. Grade 9 already generates `grade9/index.html` and four subject pages |
| **Navigation** | Done | The grade dropdown, breadcrumbs and subject lists are all generated from `site.js`. Grade 9 links already work |
| **Assessment ownership** | Done | `QuizService.registerBank("grade10/dbms", …)` — banks are registered under the grade-qualified key and filtered per page |
| **Revision / learning map** | Done | Unit ids are fully namespaced: `grade10/oop-cpp/u1` |
| **Retrieval records** | Done | Ids are globally unique and the build **throws** on a collision, because an id is the storage key for a student's self-grade |
| **Progress** | Done | `ProgressService` takes caller-supplied ids and knows nothing about the curriculum |
| **Language modes** | Done | Global, CSS-driven, independent of grade |
| **Shared components** | Done | Every simulator, drill and diagram is mounted by class and takes its content from data |
| **Grade 11 / 12 expansion** | Ready | Adding a grade is a `site.js` entry plus data under the same key shape |

**The namespacing is the architecture.** `<gradeId>/<subjectSlug>` is what keeps
two grades' syllabi, questions, progress and content apart, and a test now
asserts every key in every curriculum file matches that shape.

## 2 · The four changes Grade 9 needs

### 2.1 A lesson filename prefix — the only real collision risk · **rule, not code**

`_source/content/lessons/` is **flat**, and Grade 10 OOP owns the bare names
`u1.html` … `u6.html`. A Grade 9 C-programming lesson authored as `u1.html`
would not collide loudly — **it would overwrite a Grade 10 lesson.**

Reserved prefixes, one per Grade 9 subject:

| Subject | Prefix | Files |
|---|---|---|
| Programming Principles in C | `c-` | `c-u1.html` … `c-u7.html` |
| Fundamentals of Computer and Application | `cf-` | `cf-u1.html` … `cf-u7.html` |
| Fundamentals of electro-system | `es-` | `es-u1.html` … `es-u7.html` |
| Website Design | `wd-` | `wd-u1.html` … `wd-u7.html` |

Enforced by a test that fails on any lesson file outside the known schemes —
mutation-tested by creating `c-u1.html` and watching it fail.

**Why not subdirectories?** Moving 24 Grade 10 lessons into
`lessons/grade10/…` would touch every `sec:` entry in `pages.js` and the
section resolver, to fix a problem a prefix fixes for free. That is the rewrite
Rule 4 says to avoid. If Grade 11 and 12 make the flat directory genuinely
unwieldy — above roughly 60 files — the move is worth revisiting then, with
Grade 9 complete and the test in place to catch mistakes.

### 2.2 `validate.js` assumed every graded subject is taught · **done**

The grid rule errored on any subject in `specification-grid.js` without
authored pages. That was right while the grid held Grade 10 only, and wrong the
moment Grade 9's grid was transcribed ahead of its lessons — it turned
correctly recorded curriculum into a failed build.

Knowing a subject's marks *before* writing it is the right order to work in; it
is what Phase 9 had to reconstruct backwards. The rule now skips an untaught
subject, and what it was really protecting — grid, outline and site map agreeing
— is asserted for **every** grade, taught or not, in `tests/curriculum.test.js`.
The rule still catches a real disagreement: mutating DBMS unit 4 from 14 marks
to 13 fails the build with the unit named.

### 2.3 Grade 9 marks had never been recorded · **done**

`specification-grid.js` now carries all four Grade 9 subjects, 28 units.

### 2.4 Curriculum checks that run without a build · **done**

`tests/curriculum.test.js`, nine tests. The build can only check a subject that
has pages, so an outlined-but-unauthored grade was entirely unchecked. These
hold the curriculum to itself either way, and pin the Grade 10 surface.

## 3 · What Grade 9 will need when authoring starts, and does not need yet

| Needed | When | Note |
|---|---|---|
| `pages.js` entry per subject | First subject authored | Same shape as Grade 10 |
| `coverage.js` map per subject | With the first lesson | A test already fails if pages appear without one |
| `grade9-<slug>.js` question bank | With the first assessment | Naming asserted by test |
| `prerequisites.js` entries | When a second unit depends on a first | Cross-grade prerequisites are already allowed by the revision service |
| A hero section per subject | With the subject page | Four files, same shape as `db-hero.html` |

**Not needed:** a backend, a router, a build-time framework, a database, or any
new dependency. Grade 9 is more data in the shapes that already exist.

## 4 · Shared-component changes and their risk

Phase 11 changed exactly one shared file, `build/validate.js`, in the direction
of *less* strictness about a case that is now legitimate. Everything else added
is new data or new tests.

| Risk | Mitigation |
|---|---|
| A Grade 9 lesson overwrites a Grade 10 one | Filename-prefix test, mutation-proven |
| A Grade 10 URL stops building | All 39 pinned by name in a test |
| A Grade 10 question bank shrinks or merges | Per-subject counts pinned; banks asserted to be single-grade |
| Grade 10 coverage silently drops | 150/150 asserted independently of `validate.js` |
| The relaxed grid rule hides a real error | Mutation-tested: a wrong Grade 10 mark still fails the build |

## 5 · Grade 11 and 12

Nothing in this plan is Grade 9-specific except the four prefixes. A new grade
needs: a `site.js` entry with `status: "open"`, a `syllabus.js` outline, a
`specification-grid.js` entry, lesson prefixes of its own, and content. The
tests added here cover any grade that appears, not Grade 9 in particular —
`every open subject in the site map has an outline and a grid` will fail for
Grade 11 the day someone opens it without one.

The one thing worth deciding before Grade 11: whether the flat lessons
directory survives a fourth grade. See 2.1.
