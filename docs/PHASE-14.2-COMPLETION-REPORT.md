# Phase 14.2 — Shared Output-Block Formatting: Final Audit

**Verdict: COMPLETE WITH DOCUMENTED LIMITATIONS**

Audited 2026-11-12 on branch `claude/sad-sutherland-c22165`, HEAD `e56fca9`.
Nothing was committed, staged, pushed, merged or deployed.

The one limitation is environmental and is set out in §7: the Grade 9
specification guard fails on a Windows checkout with `core.autocrlf=true`
for reasons that have nothing to do with the curriculum, and the repository
carries no `.gitattributes` to stop it recurring. The specification itself
is current and was **not** regenerated.

---

## 1 · Root cause

`_source/design/site.css` styled `pre.out` and nothing else. Every worked
example and every retrieval answer in the site uses one of two elements for
its output block:

| element | count | was it styled? |
|---|---|---|
| `<pre class="out">` | 17 | yes — mono, `white-space:pre`, `overflow-x:auto` |
| `<div class="out">` | 92 | **no rule existed at all** |

With no rule, the 92 `div` blocks inherited the page defaults: the
proportional body font (`"Noto Sans"`) and `white-space:normal`. The browser
then did what `white-space:normal` instructs — it collapsed every run of
spaces to one space and discarded every newline. A four-line `SELECT`
statement rendered as two lines of prose; a three-line result table rendered
as one. Every column-aligned block in the site had its columns destroyed,
and the destruction was invisible in the HTML source, which was correct
throughout.

This was an authoring slip that had no visible guard: both elements sit in
identical markup (`.wex-out > .wex-lbl + out`), so the two kinds looked the
same to the author and completely different to the browser.

### Scope, as measured rather than assumed

`div.out` occurs **92 times across 19 pages**, not across 52:

| subject | pages | blocks |
|---|---|---|
| grade9 / computer-fundamentals | 1 (`unit1`) | 3 |
| grade10 / dbms | 7 | 46 |
| grade10 / digital-design | 5 | 31 |
| grade10 / hardware | 6 | 12 |
| **total** | **19** | **92** |

Three premises carried into this phase did not survive checking:

- **`grade9/c-programming` has no output blocks at all.** Those pages are
  outline-only (`class="outline"`). The string `COMPILE ERROR` does not
  occur anywhere in the repository, so the "Example 2 Working block" cited
  as evidence does not exist.
- **`grade10/oop-cpp` was never affected.** Its six units use
  `<pre class="out">` (17 blocks), which was already correct and is
  untouched by this change.
- **No indentation normalisation was required.** The file `c-u1.html` cited
  as carrying six-space leakage does not exist. All 92 blocks were audited
  for leaked source indentation, stray leading/trailing newlines and tabs:
  none was found. Six blocks do carry uniform continuation indent and all
  six are deliberate column alignment — SQL indented under `CREATE VIEW`,
  the carry row of a binary addition, the partial products of a long
  multiplication, the three-level ER architecture sketch. Stripping any of
  it would have broken the arithmetic it encodes.

A second home for the class was found during verification and is covered by
the fix: besides `.wex-out`, `div.out` also appears inside `.examq .ans`,
the retrieval answers that stay `display:none` until a student reveals them.
Six blocks per page are invisible on load, and an audit that does not open
them silently skips them.

---

## 2 · Exact implementation

One rule in `_source/design/site.css` (the source of truth; the build copies
it into five generated stylesheets), plus one class attribute on 21 blocks.

```css
pre.out,div.out{
  background:#08110f;border:1.5px solid var(--line);border-left:4px solid var(--green);
  border-radius:10px;font-family:var(--mono);font-size:.85rem;line-height:1.7;
  color:var(--green);padding:12px 15px;margin:0;overflow-x:auto;white-space:pre}
div.out.out-prose{white-space:pre-wrap;overflow-x:visible}
```

`div.out` now shares the existing `pre.out` declaration unchanged — the
`pre` blocks render exactly as before. The only addition is the `out-prose`
modifier.

Twenty-one blocks gained ` out-prose` in their class attribute across ten
lesson sources. That attribute is the **only** change made to any content
file: see §6 for the byte-level proof.

Nothing else was touched. No whitespace was normalised, no educational text
was rewritten, the `pre.out` behaviour is unchanged, and the existing
responsive rules are untouched.

---

## 3 · Why the prose / drawing distinction was necessary

Neither single value of `white-space` is correct for this class, because the
92 blocks are two different kinds of content wearing one name.

| kind | count | widest line | what it is |
|---|---|---|---|
| multi-line | 71 | 84 chars | SQL, truth tables, ER sketches, long multiplication, register traces |
| single-line | 21 | 147 chars | a sentence answering the worked example |

**`pre-wrap` alone fails the drawings.** These blocks sit inside nested
padded containers, so at a 320 px viewport a block is only ~212 px wide —
about 25 monospace characters. Measured at that width, the `db-u2` ER
diagram wrapped from 9 source lines to 21 rendered lines and its
box-drawing characters scattered into unreadable fragments. A diagram
squeezed below its own width stops being a diagram.

**`pre` alone fails the sentences.** A 147-character single-line answer has
no newline to wrap at, so under `white-space:pre` it becomes one long line
the reader must swipe sideways to finish. Eight of the 21 run past 86
characters. Asking a student to drag a sentence horizontally is worse than
letting it fold.

The split follows the content, and it matches a bargain this stylesheet
already strikes: `.fig` sets `overflow-x:auto` with `min-width:520px` on its
SVG, deliberately letting a wide diagram overflow and be swiped rather than
be crushed. Output drawings now behave the same way; output sentences wrap
like the prose they are.

The discriminator is mechanical, which is what makes it safe to apply and
to teach: **a block with a newline in it is a drawing; a block without one
is a sentence.** That rule is written into the CSS comment so the next
author inherits it.

It is recorded honestly as a limitation that this rule is a convention, not
an enforced invariant — see §9.

---

## 4 · 92-block verification

Every block on every affected page was measured in a real browser, at both
widths, with `.wex-work`, `.ans` and `<details>` forced open so that no
gated block was skipped. For each block the audit compared **rendered line
count against source line count**, read the computed `white-space` and
`font-family`, and checked the block's own and the page's horizontal
overflow.

| page | blocks | aligned | prose |
|---|---|---|---|
| grade9/computer-fundamentals/unit1 | 3 | 3 | 0 |
| grade10/dbms/unit1 | 4 | 4 | 0 |
| grade10/dbms/unit2 | 5 | 5 | 0 |
| grade10/dbms/unit3 | 5 | 5 | 0 |
| grade10/dbms/unit4 | 12 | 12 | 0 |
| grade10/dbms/unit5 | 8 | 8 | 0 |
| grade10/dbms/unit6 | 6 | 6 | 0 |
| grade10/dbms/unit7 | 6 | 6 | 0 |
| grade10/digital-design/unit1 | 10 | 9 | 1 |
| grade10/digital-design/unit2 | 4 | 2 | 2 |
| grade10/digital-design/unit3 | 8 | 3 | 5 |
| grade10/digital-design/unit4 | 5 | 4 | 1 |
| grade10/digital-design/unit5 | 4 | 4 | 0 |
| grade10/hardware/unit1–unit6 | 2 each | 0 | 2 each |
| **total** | **92** | **71** | **21** |

**Result: 0 failures at 1280 px and 0 failures at 320 px.**

- Every one of the 71 aligned blocks rendered exactly its source line count
  at both widths — it never wrapped, so no column moved.
- Every one of the 21 prose blocks computed `white-space:pre-wrap` and had
  no horizontal overflow of its own at either width.
- All 92 computed a monospace family (`"JetBrains Mono"`, 13.6 px).
- No page overflowed horizontally at either width (`documentElement.scrollWidth ≤ innerWidth`) on any of the 19 pages.
- No block measured zero height, confirming the gated containers were open
  and all 92 were genuinely measured.

---

## 5 · Desktop and mobile evidence

**Desktop, 1280 × 900.** No aligned block scrolls horizontally. The blocks
measure 1028–1057 px and the widest aligned content is 84 characters
(≈ 690 px). All 11 aligned blocks wider than 60 characters — the only ones
that could possibly overflow — were individually re-measured on their 9
host pages: `scrollingAtDesktop = 0` on every one.

Binary addition, `digital-design/unit1`, `white-space:pre`, 5 source lines →
5 rendered lines:

```
carry  1 1 1 1
        1 1 0 1
      + 1 0 1 1
      ---------
      1 1 0 0 0
```

The carry row, the right-aligned operands, the rule and the sum all hold
their columns. The four-line `SELECT … FROM … WHERE … ORDER BY` on
`dbms/unit4` — the block originally reported as collapsing to two lines —
renders as four.

**Mobile, 320 × 760.** The page never scrolls sideways. 59 of the 71
aligned blocks exceed their ~212 px container and scroll **within their own
box**, preserving alignment; the remaining 12 fit outright, the binary
addition above among them (212 px content in a 212 px box, 5 lines, nothing
to swipe). The `db-u2` ER diagram keeps `white-space:pre` and offers 479 px
of content in a 212 px box: the MEMBER and BOOK rectangles render with
straight unbroken borders and the student swipes to see the rest — the same
behaviour `.fig` already gives wide SVG diagrams. All 21 prose blocks wrap
and none scrolls.

---

## 6 · Source-to-build reproducibility

`npm run build` was run and then run again; the second build produced no
further change, so the output is idempotent with respect to these inputs.

| artefact | expected | observed |
|---|---|---|
| `_source/design/site.css` | rule present | `pre.out,div.out` ×1, `div.out.out-prose` ×1 |
| `assets/css/style.css` | rule propagated | ✓ |
| `assets/css/style-home.css` | rule propagated | ✓ |
| `assets/css/style-all.css` | rule propagated | ✓ |
| `assets/css/style-dbms.css` | rule propagated | ✓ |
| `assets/css/style-digital.css` | rule propagated | ✓ |
| `out-prose` blocks in source | 21 | 21 |
| `out-prose` blocks in built pages | 21 | 21 |
| `div.out` total, source vs built | 92 / 92 | 71 plain + 21 prose, both sides |
| `pre.out` total, source vs built | 17 / 17 | unchanged |

Each changed lesson source pairs with its generated page line for line:
`dd-u1 → digital-design/unit1` (2 lines), `dd-u2 → unit2` (4),
`dd-u3 → unit3` (10), `dd-u4 → unit4` (2), `hw-u1…u6 → hardware/unit1…6`
(4 each).

**Byte-level proof that nothing else moved.** For all 20 changed content
files (10 lesson sources and their 10 generated pages), the working copy was
compared against the `HEAD` blob after reverting the single permitted
substitution `class="out out-prose"` → `class="out"`:

```
content files with real diffs checked              : 20
identical to HEAD once the class attribute reverted: 20
NO content file differs beyond the class attribute — zero educational text changed
```

---

## 7 · Test results, and the failure that was investigated

### Final run

```
npm run build   → content validation: 8 subjects, 8 outlines,
                  37 authored pages across 5 subjects, 72 diagrams — OK
                  (1 warning: grade9/computer-fundamentals, 1 of 7 units
                   authored — pre-existing, expected, unrelated)
npm test        → tests 471 | pass 471 | fail 0
node tools/grade9-spec.js --check
                → GRADE-9-CURRICULUM-SPECIFICATION.json is current. (exit 0)
```

**471 of 471 pass.** No test is failing as this report is written.

### Investigation of the reported failure

The failing test was `tests/curriculum.test.js:416`,
*"the generated Grade 9 specification is current"*. It shells out to
`node tools/grade9-spec.js --check`, which rebuilds the document in memory
and compares it with the committed file as **raw strings**, normalising only
the `"generated"` date.

Answering the five questions put to this audit:

1. **Which test fails** — the one named above, and only that one.
2. **What data differs** — **none.** Not one topic, mark, hour, status or
   mapping. The two strings differed only in line endings.
3. **Is the generated specification stale** — **no.**
4. **Does the drift predate Phase 14.2** — it is not drift at all, and it
   is independent of any commit. `docs/` and the curriculum data the
   generator reads were untouched by Phase 14.2 throughout.
5. **Does the source of truth agree with the generated file** — **yes,
   exactly.**

The mechanism: this repository sets `core.autocrlf=true` and has **no
`.gitattributes`**. Git therefore rewrites the file to CRLF on checkout. The
working copy held 1148 CR and 1148 LF — every line CRLF — while the
committed blob is pure LF and the generator writes pure LF. A raw string
comparison fails on all 1148 lines while the data is identical.

Procedure followed, in the order required:

- The generated file was **preserved first**, to
  `…/scratchpad/SPEC-PRESERVED-e56fca9.json`, sha256
  `a9cf8a3b…82ba` (the CRLF working copy).
- It was **not regenerated.** Instead the working copy's line endings were
  normalised to LF, changing no other byte.
- `--check` then passed, and the file became byte-identical to the
  committed blob: both sha256 `251c2e4e2c220f50c3ce1b3a60b5b1861390de98c388208b961474242522088a`.
  `git diff` reports no change to it whatsoever.

Because the file already equals what the generator would write, regeneration
would have been a no-op at best and would have rewritten the `"generated"`
date for no reason. It was correctly avoided.

### The documented limitation

The LF normalisation lives only in the working tree and is **not committed**.
The next time Git rewrites that file — a fresh clone, a checkout, a branch
switch — `core.autocrlf=true` will restore CRLF and this test will fail
again on Windows, while continuing to pass on Linux and in CI. It is a
false negative, not a content defect, and it will recur.

The durable fix is a `.gitattributes` pinning the generated document (and
ideally the whole tree) to LF, for example:

```
docs/GRADE-9-CURRICULUM-SPECIFICATION.json text eol=lf
```

That is a repository-wide decision beyond the scope of Phase 14.2, so it was
**not** applied here. The same `core.autocrlf` behaviour is what produces
this repository's long-standing cosmetic "modified with an empty diff"
entries in `git status`.

---

## 8 · Grade 10 regression

| guard | required | observed |
|---|---|---|
| Official topics | 150 | **150** |
| Topics with a coverage map entry | 150 / 150 | **150 / 150** |
| Grade 10 URLs | 39 | **39**, all present on disk |
| Question banks | content-identical | **identical** |
| Grade 10 educational text | unchanged | **unchanged** |
| CSS behaviour on Grade 10 pages | correct | **correct** |

All 14 guards in `tests/curriculum.test.js` pass, including
*"Grade 10 keeps every URL a student may have bookmarked"*,
*"Grade 10 coverage, questions and marks have not shrunk"* and
*"Grade 9 and Grade 10 never share a question bank or a lesson file"*.

The 39 URLs listed in the test were each resolved against the filesystem:
0 missing.

Question banks: the repository contains **five**, not eight —
`grade10-dbms.js`, `grade10-digital-design.js`, `grade10-hardware.js`,
`grade10-oop-cpp.js` and `grade9-computer-fundamentals.js`, with exactly
those five registered in the built `assets/js/question-bank.js`. (Eight is
the number of *subjects* the build reports; only five of them have a quiz
page and therefore a bank.) All five sources and the generated bundle are
byte-identical to `HEAD` — they do not appear in `git diff` at all.

Grade 10 text: proven unchanged at byte level in §6. The only Grade 10
source files touched are `dd-u1…u4` and `hw-u1…u6`, and in each the sole
difference is ` out-prose` inside a class attribute.

Grade 10 rendering was verified on all 18 affected Grade 10 pages at both
widths as part of the 92-block sweep in §4, with zero failures.

---

## 9 · Residual risks

1. **The CRLF false negative will recur** on Windows checkouts until a
   `.gitattributes` exists (§7).
2. **No automated test guards `.out` formatting.** A future author who adds
   a single-line `div.out` without ` out-prose` gets a sentence that scrolls
   sideways, and nothing fails. A guard asserting "every `div.out` whose
   content has no newline carries `out-prose`" would close this, and would
   be about ten lines in `tests/`. It was not added, because Phase 14.2 was
   scoped to preserve the implementation rather than extend it.
3. **`grade9/computer-fundamentals` remains 1 of 7 units authored**, which
   the build reports as a warning. Pre-existing and unrelated.

---

## 10 · Exact Git state

```
branch        : claude/sad-sutherland-c22165
HEAD          : e56fca9  "A subject is outline, partly written or complete
                          — and the build derives which"
staged        : 0 files
untracked     : 1 file — docs/PHASE-14.2-COMPLETION-REPORT.md (this report)
committed     : nothing — no commit, stage, push, merge or deploy occurred
```

`git diff` reports **26 files with real content changes**:

| group | files | lines |
|---|---|---|
| `_source/design/site.css` | 1 | 20 |
| `assets/css/style*.css` (generated) | 5 | 20 each |
| `_source/content/lessons/{dd-u1…u4, hw-u1…u6}.html` | 10 | 2–10 each |
| `grade10/{digital-design/unit1…4, hardware/unit1…6}.html` (generated) | 10 | 2–10 each |

`git status --porcelain` lists 71 paths. The 45 beyond the 26 above produce
**empty diffs** — they are the repository's familiar `core.autocrlf`
stat-cache entries, touched by the build but identical in content. They
include every Grade 10 and Grade 9 page not in the table above,
`assets/js/question-bank.js`, and
`docs/GRADE-9-CURRICULUM-SPECIFICATION.json`, which `git diff` confirms is
unchanged.

**On `tools/grade9-spec.js`:** no uncommitted change to this file exists in
the working tree, and none was made or removed by this audit. The file is
clean against `HEAD`. The `+17/-2` change this phase was asked to preserve
does not appear as working-tree state; `e56fca9` modified the file by
`+103/-15`, already committed. Whatever that change was, it is intact in
the commit and nothing here disturbed it.

---

## Verdict

**COMPLETE WITH DOCUMENTED LIMITATIONS**

The correction is implemented, reproducible from source, and verified block
by block: all 92 output blocks on all 19 affected pages render correctly at
1280 px and at 320 px, with the gated containers opened, and zero
educational text changed anywhere in the repository. The full suite passes
471 of 471, the production build is clean, and the Grade 9 specification
guard passes.

The limitations are: the specification guard will report a false failure
again on any Windows checkout until a `.gitattributes` is added (§7), and
the prose/drawing convention is documented in the stylesheet but not
enforced by a test (§9.2). Neither affects the shipped behaviour of the
site, and both are recorded here rather than silently resolved.

Phase 14.2 ends here. Phase 15 was not started.
