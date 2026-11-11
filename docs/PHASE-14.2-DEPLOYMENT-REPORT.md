# Phase 14.2 — Controlled Commit, Merge & Production Deployment

**Verdict: DEPLOYED AND VERIFIED**

Executed 2026-11-12. The shared code-output formatting correction is
committed, merged to `main`, deployed to Vercel, and verified against the
live production site at **https://stusy.vercel.app**.

The two limitations recorded in the Phase 14.2 audit are unchanged and were
deliberately **not** addressed here, as the brief required: no
`.gitattributes` was added and no `out-prose` regression test was written.
Both remain separate maintenance tasks.

---

## 1 · Original branch and commit

Audited live rather than taken from the previous report.

```
branch        : claude/sad-sutherland-c22165
HEAD (before) : e56fca9  "A subject is outline, partly written or complete
                          — and the build derives which"
origin/main   : e56fca9   (confirmed by git fetch --prune before any write)
local main    : e56fca9
ahead/behind  : 0 behind, 0 ahead — origin/main had not moved
remote        : https://github.com/ingineerOrjun/stusy.git
```

`e56fca9` was still the correct base. `main` was not checked out in any
worktree, so updating it displaced no one's work:

| worktree | branch | at |
|---|---|---|
| `C:/Users/Acer/Desktop/rgsc-study` | `phase-13-grade-9-units-2-7` | e56fca9 |
| `.claude/worktrees/keen-lamport-c73cfe` | `claude/keen-lamport-c73cfe` | 49d20b7 |
| `.claude/worktrees/sad-sutherland-c22165` | `claude/sad-sutherland-c22165` | e56fca9 → 76edf4a |

Both other worktrees are untouched and still sit where they were.

### Working-tree state before committing

`git status` listed 70 modified paths, but `git diff` reported only **26**.
Each of the 45 remaining paths was compared byte-for-byte against its `HEAD`
blob after CRLF normalisation:

```
status-modified        : 70
real diffs             : 26
status-only (phantom)  : 45
phantoms that actually differ from HEAD: 0  (all identical — CRLF only)
```

There was **no unexplained user work** in the tree. The 45 are this
repository's familiar `core.autocrlf=true` stat-cache entries. The untracked
file was `docs/PHASE-14.2-COMPLETION-REPORT.md`, the audit report, which is
part of the verified scope.

---

## 2 · Scope verification, files committed, and commit hash

The change set matched the expected scope exactly — 26 tracked files plus
the report, 27 in all:

| group | count | expected |
|---|---|---|
| source CSS (`_source/design/site.css`) | 1 | 1 ✓ |
| generated CSS (`assets/css/style{,-home,-all,-dbms,-digital}.css`) | 5 | 5 ✓ |
| lesson sources (`dd-u1…u4`, `hw-u1…u6`) | 10 | 10 ✓ |
| generated lesson pages (`digital-design/unit1…4`, `hardware/unit1…6`) | 10 | 10 ✓ |
| completion report | 1 | 1 ✓ |

Nothing outside that set was staged; a pattern check for stray build
artifacts returned none.

### The CSS, unchanged from the audited implementation

```css
pre.out,div.out{
  background:#08110f;border:1.5px solid var(--line);border-left:4px solid var(--green);
  border-radius:10px;font-family:var(--mono);font-size:.85rem;line-height:1.7;
  color:var(--green);padding:12px 15px;margin:0;overflow-x:auto;white-space:pre}
div.out.out-prose{white-space:pre-wrap;overflow-x:visible}
```

`div.out` shares the existing `pre.out` declaration verbatim, so multiline
diagrams keep `white-space:pre` and scroll inside their own box when
constrained; `.out-prose` wraps. No whitespace was normalised anywhere.

### The 21 `out-prose` assignments

Every block was re-classified from the committed content, in both source and
built output:

```
SOURCE: out-prose=21  aligned=71  total=92
  every out-prose block is single-line; every aligned block is multi-line
BUILT : out-prose=21  aligned=71  total=92
  every out-prose block is single-line; every aligned block is multi-line
```

The assignment is exactly right in both directions: no multi-line block was
marked prose, and no single-line block was left unmarked.

### No educational content changed

Each of the 20 staged HTML files was compared against its `HEAD` blob with
the one permitted substitution reversed:

```
staged HTML content files compared to HEAD blobs : 20
byte-identical once the class attribute reverted : 20
out-prose class attributes added by this commit  : 42  (21 source + 21 built)
```

No curriculum content, lesson explanation, question, answer, learning
activity or curriculum mapping was altered.

### Commit

```
76edf4ac5c804c25655cb0282106f9fc7719016d
76edf4a  fix: improve shared code output formatting
27 files changed, 596 insertions(+), 48 deletions(-)
```

Working tree immediately after committing: 0 unstaged real diffs, 0 staged,
0 untracked.

---

## 3 · Test and build results

Run against the committed tree, before pushing.

```
npm run build   → content validation: 8 subjects, 8 outlines,
                  37 authored pages across 5 subjects, 72 diagrams — OK
                  (1 warning)
npm test        → tests 471 | pass 471 | fail 0
```

**471 of 471 pass. No test is failing, concealed or skipped.** The test
count is unchanged from the audit baseline — no test was added or removed,
consistent with the instruction not to introduce the `out-prose` regression
test in this deployment.

The single build warning is pre-existing and unrelated:
`grade9/computer-fundamentals` has 1 of 7 syllabus units authored, so the
build correctly reports the subject as incomplete.

**Build reproducibility:** `npm run build` was run twice in succession. The
diff set was 26 files after the first run and 26 after the second — the
build is idempotent with respect to these inputs, and the generated CSS and
lesson pages match their sources (all five generated stylesheets contain the
source rule verbatim; source and built block censuses agree at 71/21/92 and
17).

---

## 4 · Curriculum specification check

```
node tools/grade9-spec.js --check
→ GRADE-9-CURRICULUM-SPECIFICATION.json is current.   (exit 0)
```

The specification was **not regenerated**. No genuine mismatch was
established — the Phase 14.2 audit proved the file is byte-identical to what
the generator would write, and `docs/` contains no change in this commit.
The check was re-run after committing and after pushing, and passes both
times.

---

## 5 · Grade 10 protection results

Every gate was re-run against the committed tree before pushing.

| gate | required | observed |
|---|---|---|
| Official topics | 150 | **150** ✓ |
| Coverage map entries | 150 / 150 | **150 / 150** ✓ |
| Grade 10 lesson URLs | 39 resolve | **39 / 39**, 0 missing on disk ✓ |
| Question banks | byte-identical | **all 5 + built bundle identical to HEAD** ✓ |
| Grade 10 OOP `pre.out` pages | unmodified | **oop-cpp untouched** — absent from the diff ✓ |
| Grade 10 quiz / index / revise pages | unmodified | **none changed** ✓ |
| Grade 10 educational text | unchanged | **unchanged**, proven byte-level ✓ |

All 14 guards in `tests/curriculum.test.js` pass, including *"Grade 10 keeps
every URL a student may have bookmarked"*, *"Grade 10 coverage, questions
and marks have not shrunk"*, *"Grade 9 and Grade 10 never share a question
bank or a lesson file"* and *"every question bank is registered, and every
quiz page has one"*.

Question banks are **five**, not eight, as the Phase 14.2 audit established:
`grade10-dbms.js`, `grade10-digital-design.js`, `grade10-hardware.js`,
`grade10-oop-cpp.js`, `grade9-computer-fundamentals.js`. All five and the
generated `assets/js/question-bank.js` are absent from `git diff` entirely.

The 20 Grade 10 content files this phase touches (`dd-u1…u4`, `hw-u1…u6` and
their generated pages) differ from their previous content by the class
attribute alone — §2 above.

---

## 6 · Pre-commit browser verification

Repeated against the **actual current working tree**, not reused from the
earlier report. Gated `.wex-work`, `.ans` and `<details>` containers were
forced open before measuring, so no hidden block was skipped.

| | pages | blocks |
|---|---|---|
| `div.out` pages | 19 | 92 |
| `pre.out` pages (oop-cpp) | 6 | 17 |
| **total** | **25** | **109** |

**Result at 1280 px: 0 failures. Result at 320 px: 0 failures.**

- Every one of the 71 aligned blocks rendered its exact source line count at
  both widths — it never wrapped, so no column moved.
- All 21 prose blocks computed `pre-wrap` with no overflow of their own.
- All 17 `pre.out` blocks render unchanged, confirming the shared selector
  did not disturb them.
- All 109 computed a monospace family; none measured zero height.
- No page overflowed horizontally at either width.
- Horizontal scrolling stays confined to the output block: at 320 px it is
  the block's own `overflow-x`, never the page.
- **No console errors on any page.**

---

## 7 · Push and merge details

`git fetch --prune` was run again immediately before the merge; `origin/main`
was still `e56fca9`, so no newer production work existed to overwrite.

```
git merge-base --is-ancestor origin/main HEAD → YES (fast-forward safe)
commits landing on main                       → 76edf4a (exactly one)
```

1. **Branch pushed** — `claude/sad-sutherland-c22165 → origin`, new branch.
2. **Merged into main** — fast-forward `e56fca9..76edf4a`, via
   `git fetch . claude/sad-sutherland-c22165:main`, which refuses a
   non-fast-forward. The repository has a linear history with no merge
   commits, so a fast-forward is its established style and no merge commit
   was manufactured.
3. **main pushed** — `e56fca9..76edf4a  main -> main`.
4. No conflicts arose. **No force-push was used.** Nothing was reset,
   stashed, dropped or cleaned.

```
origin/main                            : 76edf4ac5c804c25655cb0282106f9fc7719016d
origin/claude/sad-sutherland-c22165    : 76edf4ac5c804c25655cb0282106f9fc7719016d
local main                             : 76edf4ac5c804c25655cb0282106f9fc7719016d
```

`origin/main` points at the expected commit, and that commit carries the
full Phase 14.2 implementation.

---

## 8 · Production deployment

**Method:** Vercel's Git integration, the project's established path. The
repository has no `.github/workflows`, and `vercel.json` sets
`installCommand` and `buildCommand` to `""` with `outputDirectory` `"."` —
the site is committed pre-built, so a deploy runs no install and no build.
A push to `main` is what triggers production. No deployment command was run
locally: the Vercel CLI is present (65.14.0 via `npx`) but the repository
has no `.vercel` project link, so a CLI deploy was neither needed nor
appropriate.

| | |
|---|---|
| Production URL | **https://stusy.vercel.app** |
| Deployed commit | `76edf4a` |
| Trigger | push to `origin/main` |
| Homepage | **HTTP 200**, 0.86 s |
| Edge trace | `X-Vercel-Id: bom1::h4h6t-1794428689759-025aa5071d89` |
| Cache | `X-Vercel-Cache: MISS`, `Age: 0` — freshly built, not a stale edge copy |
| Serving traffic | **yes** |

The push was not assumed to mean success. Deployment was confirmed by
fetching production and checking that it serves the new code:

```
style.css          HTTP 200   pre.out,div.out=1   out-prose=1
style-digital.css  HTTP 200   pre.out,div.out=1   out-prose=1
style-dbms.css     HTTP 200   pre.out,div.out=1   out-prose=1
style-home.css     HTTP 200   pre.out,div.out=1   out-prose=1
style-all.css      HTTP 200   pre.out,div.out=1   out-prose=1
```

**Commit association:** Vercel does not expose a deployment ID in response
headers, and without a linked project the Vercel API could not be queried,
so no deployment ID is claimed here. The association to `76edf4a` is
established by content instead, which is stronger: all 25 affected pages
fetched from production are **byte-identical to the committed build**.

```
pages fetched from production      : 25
byte-identical to committed build  : 25
=> production serves exactly the committed build

live div.out blocks   : 92  (expect 92)
live out-prose blocks : 21  (expect 21)
live pre.out blocks   : 17  (expect 17)
```

---

## 9 · Live website verification

All checks below ran against **https://stusy.vercel.app**, not a local build
or preview. (This project's deploys are verified over HTTP rather than
through the in-app preview browser, which has blocked asset requests on this
host before and can show a stale page as if it were live. Here the live
browser was additionally checked for exactly that failure mode first — CSS
was confirmed applied, `white-space: pre` and JetBrains Mono computed at the
production origin — so its results below are trustworthy.)

| check | result |
|---|---|
| Homepage | **HTTP 200** ✓ |
| Grade 9 navigation (`/grade9/`, `/grade9/computer-fundamentals/`) | **200** ✓ |
| Grade 10 navigation (`/grade10/` + all four subject indexes) | **200** ✓ |
| All 39 Grade 10 lesson URLs | **39/39 → 200**, 0 failures ✓ |
| Output-heavy page per subject | all load correctly ✓ |
| Prose wraps naturally | ✓ — hardware/unit5's 114- and 147-character answers wrap to 6 and 7 lines at 320 px, no sideways scroll |
| Diagrams retain alignment, scroll in container on mobile | ✓ — ER sketch scrolls inside its own box; binary addition renders 5 source lines as 5 lines, 212 px content in a 212 px box |
| No horizontal page overflow at 320 px | ✓ on every page tested |
| No new browser console errors | ✓ none, at either width, on any page |
| Grade 10 functional | ✓ — DBMS quiz loads 12 question elements, no error text, no console errors |
| Three language modes available | ✓ — `data-lang-set="ne"`, `"bi"`, `"en"` present and rendered (ने / दुवै / EN) |

Live rendering was measured on one page from each of the five subjects at
both 1280 px and 320 px, with gated containers opened: **zero failures at
both widths.**

---

## 10 · Remaining limitations

1. **The CRLF false negative persists.** `core.autocrlf=true` with no
   `.gitattributes` means the Grade 9 specification guard can report a
   failure on a fresh Windows checkout while passing in CI and on Linux. It
   is a line-ending artifact, not a content defect. The fix —
   `docs/GRADE-9-CURRICULUM-SPECIFICATION.json text eol=lf` — was
   **deliberately not applied**, as instructed.
2. **No automated test guards `.out` formatting.** An author who adds a
   single-line `div.out` without ` out-prose` gets a sentence that scrolls
   sideways, and nothing fails. The guard was **deliberately not added**, as
   instructed.
3. **No Vercel deployment ID is recorded** (§8). No linked project, so the
   API could not be queried; the commit association rests on byte-identical
   content, which is verified evidence rather than an identifier.
4. **`grade9/computer-fundamentals` remains 1 of 7 units authored**, which
   the build reports as a warning. Pre-existing and unrelated.

Nothing was discarded, reset, force-pushed or cleaned at any point. No
unrelated change was merged. Phase 15 was not started.

---

## 11 · Final Git status

At the moment the implementation commit landed:

```
branch                              : claude/sad-sutherland-c22165
HEAD                                : 76edf4ac5c804c25655cb0282106f9fc7719016d
local main                          : 76edf4ac5c804c25655cb0282106f9fc7719016d
origin/main                         : 76edf4ac5c804c25655cb0282106f9fc7719016d
origin/claude/sad-sutherland-c22165 : 76edf4ac5c804c25655cb0282106f9fc7719016d

unstaged real diffs : 0
staged              : 0
untracked           : docs/PHASE-14.2-DEPLOYMENT-REPORT.md  (this report)
```

`git status --porcelain` lists 45 further paths; every one produces an empty
diff and is a `core.autocrlf` stat-cache entry, verified byte-identical to
`HEAD`.

This report was written after `76edf4a` and so could not be part of it. It
is committed separately, on the author's instruction, as a docs-only
follow-up on top of `76edf4a` — it adds one Markdown file under `docs/` and
changes no site content, no stylesheet and no lesson page. Everything
verified in §§1–9 was verified against `76edf4a`, which is the commit this
report describes and the one production was serving when those checks ran.

Both sibling worktrees are untouched: the primary checkout remains on
`phase-13-grade-9-units-2-7` at `e56fca9`, and
`.claude/worktrees/keen-lamport-c73cfe` remains on
`claude/keen-lamport-c73cfe` at `49d20b7`.

---

## Verdict

**DEPLOYED AND VERIFIED**

`76edf4a` is committed, merged fast-forward into `main`, pushed, deployed by
Vercel, and confirmed live at https://stusy.vercel.app. Production serves
byte-identical content to the committed build across all 25 affected pages,
with 92 `div.out`, 21 `out-prose` and 17 `pre.out` blocks accounted for. All
39 Grade 10 URLs return 200, Grade 10 is 150/150 with its question banks
untouched, the quiz works, all three language modes are present, and no
console errors appear at desktop or at 320 px. Tests are 471/471, the build
is clean and idempotent, and the Grade 9 specification check passes.

Phase 14.2 ends here. Phase 15 was not started.
