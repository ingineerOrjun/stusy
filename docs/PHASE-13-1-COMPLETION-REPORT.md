# Phase 13.1 — Nepali review integrity and final content audit

**Verdict: READY WITH DOCUMENTED LIMITATIONS.** See §12.

Branch `phase-13-grade-9-units-2-7`, HEAD `e56fca9`. Nothing was committed,
staged, pushed, merged or deployed.

---

## 1 · Executive summary

Phase 13.1 was scoped to fix two defects the Phase 13 report had identified: six
Nepali strings in the cipher bench that the review extractor could not see, and
five Grade 10 items that a deduplication key had re-attributed to Grade 9.

Both were real. Both were also **much smaller than the defects behind them**,
and the brief's instruction to recalculate rather than inherit the numbers is
the reason this report says something different from the last one.

Measured against Devanagari string literals in the shipped source — a
denominator no collector can flatter, because it counts what exists rather than
what was found — the review package contained **1,505 of 2,582, or 58.3%**, of
the platform's Nepali. **1,077 strings reached no reviewer**, and nothing
anywhere recorded that. The six cipher pairs were 6 of the 1,077.

What was missing was not fragments. It was:

| Not in the package | Pairs | What it is |
|---|---:|---|
| 28 runtime modules | 707 | Every simulator's narration, the quiz's five score messages, the trace stepper's step-by-step commentary |
| `content/practice/*.js` | 257 | The four **guided practice banks** — taught content, each item already carrying its own subject and unit |
| `content/heading-ne.js` | 187 | Every Nepali section heading on every page |
| `diagrams.js` | 88 | The animated diagrams' intro and step narration |
| `content/prerequisites.js` | 23 | "What this unit assumes you already know" |
| `config/*.js`, `content/syllabus.js` | 48 | Subject and unit titles — the most-read Nepali on the platform |

The extractor read four places: lesson HTML, question banks, `sim-drill.js` and
`services/strings.js`. Everything above lives somewhere else, and the technique
could not have found it: a simulator keeps its content inside its closure and
exports only its mount API, so requiring the module returns functions. The
Nepali is reachable only by reading the source — which the brief was explicit
should be the fix, rather than changing the runtime.

Phase 13.1 replaced the one-regex scan with a parser
(`tools/nepali-bilingual.js`) that reads six shapes and **reports every
Devanagari string it cannot pair, with file and line**. Coverage is now
**2,526 of 2,582, or 97.8%**. The 56 that remain are named individually and held
by a test that fails if the number grows.

The attribution defect was also understated. The old key was `id + kind`, where
`id` hashes the Nepali alone. In the question banks it collapsed **40**
occurrences, **16 of them across a subject boundary**. Five moved in Phase 13 —
the five the last report called harmless re-attribution. **Eleven predate Phase
13 and nobody had noticed.** They were not re-attributed; they were deleted from
the package. A Digital Design reviewer could not see that question 406 offers
`१६` as an option, because an identical Grade 9 option had won the key.

**No Nepali was reviewed, authored, or changed.** The human-reviewed count is 0
and a test holds it there. Phase 13.1 wrote no content: all 1,311 added
occurrences were already in the product and already being read by students.

---

## 2 · Initial Git state, verified rather than assumed

```
git branch --show-current   phase-13-grade-9-units-2-7
git rev-parse HEAD          e56fca98a428cfc4874bda922f7a313aa80e3cb9
git log -1 --oneline        e56fca9 A subject is outline, partly written or
                                    complete — and the build derives which
modified files              82
untracked files             16
staged entries              0
commits ahead of origin/main 0
```

### The protected file

`tools/grade9-spec.js` was found exactly as the Phase 13 report described and
was not touched:

```
git diff --numstat -- tools/grade9-spec.js     17  2  tools/grade9-spec.js
git diff --cached --numstat -- tools/…          (empty — not staged)
node tools/grade9-spec.js --check              GRADE-9-CURRICULUM-SPECIFICATION.json is current.
```

Its diff is the line-ending normalisation in the `--check` path: `strip()` gains
`.replace(/\r\n/g, '\n')` before the generated-date substitution, with a comment
explaining that `core.autocrlf=true` with no `.gitattributes` makes a fresh
Windows checkout report drift on every line of a file that has not changed.
Unchanged, unstaged, uncommitted at the end of the phase.

### The ignored worktree

`.claude/worktrees/keen-lamport-c73cfe/` exists, is gitignored, and holds its own
copy of the Grade 10 quiz pages. It was **not deleted and not modified**.

It is excluded from every count in this report. The exclusion is not cosmetic: a
repository-wide search for a Grade 10 string finds it twice, once in
`grade10/…` and once in the worktree, and any count built from such a search is
wrong by a factor that depends on which files the worktree happens to hold. Every
census here walks `_source/` or a named directory explicitly, and
`tests/nepali-review.test.js` walks `_source/` only.

---

## 3 · Root cause: the extraction gap

The old collector:

```js
function collectRuntimeStrings(){
  const f = path.join(SRC, 'runtime/services/strings.js');
  …
  for (const m of src.matchAll(/…ne\s*:\s*(['"])([\s\S]*?)\1…/g)){
```

One file, one regex. Four independent reasons it could not see the rest:

1. **The file list was one file.** 28 other runtime modules hold Nepali.
2. **The Nepali key is sometimes `np`.** `trace.js`, `sim-dispatch.js` and
   `sim-stackqueue.js` spell it that way — 112 pairs of C++ execution
   narration. A scanner that knows only `ne` reports those three files as
   holding no bilingual content at all. Not "some missing": none.
3. **The English key is not always `en`.** `sim-gates.js` writes
   `name: 'NOT (Inverter)', ne: '…'`, because the field is the gate's name.
4. **Half the pairs are not key-value at all.** They are arguments to a local
   two-argument helper (`bi`, `biBlock`, `row`, `A`, `conLine`), or two
   assignments named `msg`/`msgNp`, or markup the runtime concatenates by hand
   with the two halves in different string literals.

And one reason the gap was invisible rather than merely present: **the generator
reported what it found.** 2,603 was a true count of what it had collected and
told nobody what it had not.

### What the parser does

`tools/nepali-bilingual.js` blanks comments and regex literals — preserving
offsets and line numbers so a report can name a line — and then reads six
shapes:

| Shape | Example | Was found before |
|---|---|---|
| (a) a two-argument call | `bi('Play', 'चलाउनुहोस्')`, `row('Decimal', 'दशमलव', …)` | no |
| (a1) one call per language | `conLine(c, 'empty', 't-en'); conLine(c, 'खाली', 'np')` | no |
| (a2) paired assignments | `msg = '…'; msgNp = '…'` | no |
| (b) an English key beside a Nepali one | `{ en: …, ne: … }`, `{ name: …, ne: … }`, `{ t: …, np: … }` | `ne:` in one file only |
| (c) markup the runtime builds | `'<span class="t-en">…</span>' + '<span class="np-cell">…</span>'` | no |
| (d) a required module, walked | `content/practice/*.js`, `diagrams.js`, `heading-ne.js` | no |

A sentence assembled by concatenation keeps its shape, with the interpolated
value shown as `{…}` — so a reviewer can see *where* a number lands, which
differs between English and Nepali and is exactly what a review catches.

**Anything it cannot pair is reported**, with file, line and reason, and the
`--audit` mode counts literals rather than pairs. Those two together are why the
coverage figure in §5 is a measurement rather than a claim.

Three defects in the parser itself were found by its own census and are worth
recording, because each produced a silent loss:

- **An unblanked regex ate a file.** `.replace(/"/g, '&quot;')` appears in nine
  runtime files. A scanner that blanks comments but not regexes reads that bare
  quote as a string opener and runs to the next one hundreds of lines away.
  `sim-sql.js` lost all 19 of its pairs and reported them as *one* unsupported
  pattern — invisible in the count and nearly invisible in the report.
- **`readValue` did not stop at a semicolon.** `msg = 'Perfect.'; msgNp = 'पूर्ण…'`
  read as one value running to the closing brace of the `if` block, so both
  halves of every quiz score message were dropped.
- **Call-shaped scanning read inside strings.** `'peek(): the stack is empty'`
  contains `peek(`, which inserted a phantom call between the two real ones and
  broke the (a1) pairing for every console line in `sim-stackqueue.js`.

---

## 4 · Root cause: the attribution and deduplication defect

```js
const k = items[i].id + '|' + items[i].kind;
if (seen.has(k)) items.splice(i, 1); else seen.add(k);
```

`id` is a hash of the Nepali text alone. `kind` is `"quiz option"` or `"gloss"`.
So two quiz options with the same Nepali collapsed into one item whatever
subject, unit or question they belonged to — and the loop ran backwards, so the
surviving one was whichever came **last** in collection order. Question banks
are read in directory order, which puts `grade9-…` after every `grade10-…`.
That is the whole mechanism of "Grade 9 took five Grade 10 items".

Replayed over the question banks alone:

| | |
|---|---:|
| occurrences collected | 1,191 |
| collapsed by `id\|kind` | 40 |
| — same subject | 24 |
| — **across a subject boundary** | **16** |
| of those 16, moved in Phase 13 | 5 |
| of those 16, **predating Phase 13** | **11** |

The 11 are Grade-10-against-Grade-10: `दुई`, `तीन`, `चार`, `एक` as options under
Hardware Unit 6, Digital Design Units 2 and 4, and DBMS Unit 2. Each had been
collapsed since the bank was written.

An option reading `चार` under a Hardware question about bus lines and the same
`चार` under a DBMS question about cardinality are **one translation and two
things to review.** The old ledger reported one number and called it both.

### The model now

```
unique pair  (id = hash of the Nepali)
  ├── Nepali text
  ├── English text, plus englishVariants if the occurrences disagree
  ├── subjects[] · units[] · files[]
  └── occurrences[]  (occId = hash of pair + kind + subject + unit + file + ref)
        └── each with its own status and reviewer note
```

The occurrence key keeps the pair **and the place**. Two extraction patterns
reaching the same text at the same place in the same file still collapse — that
is the duplicate deduplication is for, and 6 of them exist. A second subject
does not collapse.

`englishVariants` is not bookkeeping. **22 translations stand in for more than
one English text**, which was unknowable while the contexts were merged. One
Nepali sentence doing two jobs usually fits neither; some are a repeated UI
label and are fine. The package marks each and shows the other English.

`occurrenceId`, `dedupeOccurrences`, `groupPairs` and `carryStatus` live in
`tools/nepali-bilingual.js` rather than in the generator, so they can be tested
on plain objects without reading the repository.

---

## 5 · Independently verified count reconciliation

### A · Phase 13 content counts

Every figure recomputed from source, not copied.

| Item | Previous report | Measured | |
|---|---:|---:|---|
| Grade 9 official topics | 168 | **168** | ✓ sum over `syllabus.js` |
| Grade 9 Fundamentals of Computer and Application topics mapped | 36 | **36** | ✓ `coverage.js` |
| Grade 9 subject units | 7 | **7** | ✓ `grade9/computer-fundamentals/unit*.html` |
| Grade 9 question bank | 62 | **62** | ✓ bank length |
| Grade 10 official topics | 150 | **150** | ✓ and 150 mapped |
| Combined Grade 9 + Grade 10 | 318 | **318** | ✓ |
| Grade 10 page URLs | 39 | **39** | ✓ 38 subject pages + `grade10/index.html` |

### B · Nepali review counts, and the arithmetic the brief asked about

| Item | Previous report | Measured |
|---|---:|---:|
| Ledger before Phase 13 (committed at HEAD) | 2,090 | **2,090** |
| Ledger after Phase 13 (working tree) | 2,603 | **2,603** |
| Net increase | 513 | **513** |

Per subject, HEAD against the Phase 13 working tree:

| Subject | HEAD | Phase 13 | Δ |
|---|---:|---:|---:|
| Shared interface | 54 | 54 | 0 |
| DBMS | 528 | 527 | **−1** |
| Digital Design | 453 | 450 | **−3** |
| Hardware | 432 | 432 | 0 |
| DS & OOP | 498 | 497 | **−1** |
| Computer Fundamentals (Grade 9) | 125 | 643 | **+518** |
| | | | **+513** |

**The arithmetic resolves, and not the way the previous report said.**
518 − 5 = 513 exactly. The missing figure is not 519 but **518**, and the
difference of 6 is not the cipher pairs — the cipher pairs were never in either
total, so they cannot appear in a difference between them. The 519 in the
previous report has no measurement behind it that this phase could reproduce.

**"Five Grade 10 rows lost one item each" is wrong in shape.** It is five items
across **three** subjects — DBMS −1, Digital Design −3, DS & OOP −1 — and
Hardware lost none. Digital Design lost three because it held three pairs of
internally-colliding options (`१६` in Units 1 and 4, `४` in Units 2 and 4, `८`
in Units 1 and 2) that had **already** been collapsed to one item each; Grade 9
then won all three keys.

Each of the five, by question:

| Dropped | Nepali | Winner |
|---|---|---|
| `g10.oop-cpp.q38` option 3 | दुवै एउटै कुराका दुई नाम हुन् | `g9.cf.q40` option 1 |
| `g10.dd.q406` option 4 / `g10.dd.q101` option 3 | १६ | `g9.cf.q39` option 3 |
| `g10.dd.q406` option 3 / `g10.dd.q014` option 4 | ४ | `g9.cf.q39` option 1 |
| `g10.dd.q101` option 1 / `g10.dd.q010` option 3 | ८ | `g9.cf.q39` option 2 |
| `g10.db.q017` option 3 | १००० | `g9.cf.q19` option 1 |

All are restored, and `tests/nepali-review.test.js` asserts each by question id.

### C · The package, in the categories the brief requires

Never interchangeable, and never printed as one number again.

| | |
|---|---:|
| **Unique bilingual pairs** (translations) | **3,554** |
| **Contextual occurrences** of them | **3,914** |
| — pairs used in more than one place | 132 |
| — pairs shared **between subjects** | **53** |
| — pairs standing in for more than one English | 22 |
| **Duplicate occurrences** collapsed (same pair, same place, same kind) | 6 |
| **Newly captured** by Phase 13.1 (pre-existing content, newly visible) | 1,311 occurrences |
| **Newly authored** by Phase 13.1 | **0** |
| New since the baseline commit `72e8bc5` (Phases 9–13.1) | 1,017 pairs / 1,030 occurrences |
| **Extracted inline pairs** (runtime source, shapes a–c) | 707 |
| **Missing** — Devanagari that reaches no reviewer | **56** |
| — further fragments excluded as unreviewable | 16 |
| **Human-reviewed** | **0** |
| Machine-generated / unreviewed | **3,914 — all of it** |

### D · Coverage, one census, two extractors, the same content

The Phase 13 extractor was re-run against today's source, to a scratch location,
so that the before and after figures are comparable rather than merely adjacent.

| | Devanagari literals | In the package | Missing | Covered |
|---|---:|---:|---:|---:|
| Phase 13 extractor | 2,582 | 1,505 | 1,077 | **58.3%** |
| Phase 13.1 extractor | 2,582 | 2,526 | **56** | **97.8%** |

A literal with fewer than three Devanagari characters is excluded from the
census: `'०'`…`'९'` is `practical.js`'s digit table and `'र'` is the word "and"
waiting to be concatenated. Counting those as missing content would overstate
the gap, which is the opposite of the error this phase exists to correct.

---

## 6 · Extractor and ledger changes

| File | | What |
|---|---|---|
| `tools/nepali-bilingual.js` | **new**, 660 lines | The parser: comment and regex blanking, the six shapes, the literal tape, the occurrence/pair model, the review-status carry |
| `tools/nepali-review.js` | modified | `collectRuntimeStrings` (one file, one regex) replaced by `collectInlineRuntime` (29 runtime files + the build layer, attributed from `pages.js`) and `collectDataModules` (the eight requireable content modules); dedup delegated to the shared functions; `--audit` mode added; JSON gains a `pairs` array and per-occurrence ids, statuses and reuse information; HTML shows reuse, cross-subject sharing, English variants and interpolation |
| `tests/nepali-review.test.js` | **new**, 23 tests | §8 |
| `tests/language.test.js` | modified | The existing ledger guard read the Total row by cell **position**; Phase 13.1 added a Translations column and it then compared the wrong figure. It now finds its columns **by heading**, which is strictly less fragile and still mutation-verified (§9) |
| `docs/NEPALI-REVIEW-STATUS.md` | rewritten | New figures, both counts, the per-unit table regenerated from the JSON, a corrected §2 note, and a §7 that lists the real residue instead of four modules |
| `docs/NEPALI-REVIEW-PACKAGE.html`, `docs/nepali-review-items.json` | regenerated | Generator output |
| `docs/README.md` | modified | One history row |

### Schema change, and why it is the smallest one that works

`items[]` is unchanged in meaning — one entry per occurrence — and gains
`occId`, `pairId`, `status`, `reviewNote`, `sharedWith`, `alsoIn` and
`interpolated`. A new top-level `pairs[]` holds one entry per translation with
its `occurrences`, `subjects` and `englishVariants`.

The pair `id` is unchanged and still a hash of the Nepali, which is what lets a
review returned against the old ledger still be applied: `carryStatus()` keys on
`occId` and falls back to `id`.

### Runtime attribution

From `config/pages.js`, which already records which runtime modules each page
loads — better than inferring from file names, and the reason `sim-parts.js` is
correctly attributed to **two** subjects. Grade 9 Unit 2 and Grade 10 Hardware
Unit 2 both mount its `systemunits` set, so its 28 pairs appear in both reviews.
Those two contexts differ only by subject: same file, same key path, same unit
*number*. A key without subject in it silently halves them, which is the
mutation in §9.

A module loaded by three or more subjects, or living under `runtime/services/`,
is attributed to the shared row rather than to every page, because a count of
"this label occurs 31 times" tells a reviewer nothing they can act on.

---

## 7 · Grade 10 preservation evidence

Phase 13.1 changed no file under `_source/`, `grade9/`, `grade10/` or `assets/`.
Its entire footprint is `tools/`, `tests/` and `docs/` (§11).

**Question and practice banks.** All eight are content-identical to HEAD:

```
for f in questions/grade10-{oop-cpp,dbms,digital-design,hardware}.js \
         practice/grade10-{oop-cpp,dbms,digital-design,hardware}.js
  git show HEAD:$f | tr -d '\r' | sha256sum   ==   tr -d '\r' < $f | sha256sum
→ all eight IDENTICAL
```

A raw byte comparison reports four of them as differing. That is **line endings
only**: this repository runs `core.autocrlf=true` with no `.gitattributes`, so
`git show` emits LF while the working copy holds CRLF. `git diff --numstat` is
authoritative and lists neither:

```
git diff --numstat -- _source/content/questions/ _source/content/practice/ _source/runtime/
  1006   0   _source/content/questions/grade9-computer-fundamentals.js
   422   0   _source/runtime/sim-drill.js
```

**Runtime.** One file changed, by Phase 13, and it is a pure addition: +422 / −0,
adding six Grade 9 drill sets (`cfemerging`, `cfinput`, `cfinternet`, `cfmemory`,
`cfmultimedia`, `cfsoftware`). No removed line, no Grade 10 set touched.

**Lesson sources.** `git diff --numstat` over all 24 Grade 10 lesson files in
`_source/content/lessons/`: empty.

**Shared navigation, which Phase 13 was allowed to change, is intact.** All 39
Grade 10 pages differ by exactly two lines each, +78 / −78 in total, and both
are the `desknav` and `mobilepanel` lines. The change within them is the derived
subject status: `Computer Fundamentals · 1 of 7 units` → `· notes ready`. Every
one of the 78 changed lines is one of those two.

**Counts.**

| | |
|---|---|
| Grade 10 official topics | **150 of 150** mapped in `coverage.js` |
| Grade 10 page URLs | **39** |
| Grade 10 subjects | **4** |
| Build | `8 subjects, 8 outlines, 43 authored pages across 5 subjects, 75 diagrams — OK` |

**Limitation on this evidence.** The baseline is HEAD, `e56fca9`, which is the
commit Phase 13 started from and the only baseline this repository has for
uncommitted work. It establishes that neither Phase 13 nor Phase 13.1 changed
Grade 10 educational content. It cannot establish anything about commits before
`e56fca9`, and this report does not claim to.

---

## 8 · Tests and build

```
npm run build
  content validation: 8 subjects, 8 outlines, 43 authored pages across
  5 subjects, 75 diagrams — OK
  site written
  learning map: 31 units, 23 prerequisite edges, 109 retrieval questions
  diagrams injected: 83

npm test
  ℹ tests 507
  ℹ pass  507
  ℹ fail  0
```

507 tests, up from 484. The 23 new ones are `tests/nepali-review.test.js`:

| | Test |
|---|---|
| **Extraction** | an inline `bi()` call is a pair, not two unrelated strings |
| | `np:` is read as the Nepali key, not only `ne:` |
| | a Nepali key beside an English key that is not called `en` |
| | a sentence built by concatenation keeps its shape, with the gap marked |
| | two calls, one per language, are one pair |
| | markup a runtime builds itself is read as a pair |
| | `en:` and `ne:` inside a comment are prose about pairs, not a pair |
| | a regex holding a quote does not swallow the rest of the file |
| | Devanagari the scanner cannot pair is reported, never dropped |
| **Attribution** | the same Nepali in two subjects is one translation and two things to review |
| | two occurrences that differ ONLY by subject are still two |
| | the same Nepali in two units of one subject keeps both units |
| | the same Nepali in two source files keeps both files |
| | the SAME source occurrence reached twice is one occurrence |
| | a genuinely different translation is a different pair |
| | one Nepali standing in for two Englishes is flagged, not averaged |
| | a reviewer verdict survives regeneration, and nothing can invent one |
| **The real ledger** | every occurrence is distinct, and the pairs account for all of them |
| | the Grade 10 quiz options a shared translation used to hide are all present (12 named by question id) |
| | a simulator mounted by two subjects is attributed to both |
| | the Grade 9 cipher bench is in the package |
| | nothing in the package claims to have been reviewed by a human |
| **Ratchet** | the Nepali that reaches no reviewer does not grow |

The ratchet is the one that matters most. It walks `_source/`, counts
Devanagari string literals, and fails if more than 56 of them are absent from
the ledger or if coverage drops below 97%. New Nepali written somewhere the
extractor cannot read now fails `npm test` instead of being discovered by a
reviewer's silence.

Also run: the Grade 9 specification check (`node tools/grade9-spec.js --check`
→ current), the build's own content validation (the three coverage rules), and
the full existing suite including the homepage statistics, link, language,
a11y, contrast and curriculum tests.

---

## 9 · Mutation results

Each mutation was applied to a file, the named guard run, and the file restored
and verified byte-identical by SHA-256. No mutation artifact remains; `npm test`
and the build pass at the end of the phase.

| # | Mutation | Guard that failed | |
|---|---|---|---|
| 1 | `NE_KEYS` loses `'np'` — an inline bilingual pair is omitted | `np: is read as the Nepali key` | **caught** |
| 2 | regex blanking removed | `a regex holding a quote does not swallow the rest of the file` | **caught** |
| 3 | subject removed from the occurrence key | `two occurrences that differ ONLY by subject are still two` | **caught** |
| 4 | occurrence key reverted to `id\|kind` — a contextual occurrence removed | `the same Nepali in two subjects…` | **caught** |
| 5 | duplicate collapse disabled — a duplicate source occurrence counted twice | `the SAME source occurrence reached twice is one occurrence` | **caught** |
| 6 | `carryStatus` defaults to `human-reviewed` | `a reviewer verdict survives regeneration, and nothing can invent one` | **caught** |
| 7 | a Grade 10 question's Nepali rewritten | `the Nepali that reaches no reviewer does not grow` | **caught** |
| 8 | a Grade 10 topic removed from `coverage.js` | the build's content validation | **caught** |
| 9 | a Grade 10 question's **answer index** moved (`answer: 0` → `answer: 3`) | — | **NOT CAUGHT** |
| 10 | the ledger's Pending column changed in the status document | `the Nepali review ledger reports the real number of items` | **caught** |

**Mutation 3 is worth recording as a method note.** It was *missed* on the first
run. The cross-subject test existed and passed, because its two items also
differ in unit and reference — so they stayed distinct even with subject removed
from the key. The test was asserting the right outcome for the wrong reason. The
isolating test (same file, same reference, same unit number, different subject)
was added, and it is the real case: `sim-parts.js` under Grade 9 Unit 2 and
Hardware Unit 2.

**Mutation 9 is a finding, not a pass.** Changing the correct answer of a Grade
10 DBMS question passes the build and all 507 tests:

```
answer: 0 → answer: 3  in _source/content/questions/grade10-dbms.js
  build: passed
  npm test: 507 tests, 507 pass, 0 fail
```

Nothing in this repository would notice a Grade 10 answer key being silently
corrupted. Phase 13.1 changed no bank, and §7 proves all eight are
content-identical to HEAD — so this is not a regression. It is a protection the
brief assumed exists and which does not. Documented, per the brief's
instruction, rather than fixed: closing it means a content-hash baseline test,
which is a decision about Grade 10 that this phase was not scoped to take.

An earlier run of this harness reported mutation 9 as caught. It was not: the
suite was failing at that moment for an unrelated reason — the ledger guard in
`tests/language.test.js` reading the Total row by cell position — and the
harness could not tell the two failures apart. The result above was taken from a
clean suite.

---

## 10 · The review package as a reviewer receives it

`docs/NEPALI-REVIEW-PACKAGE.html`, 6.2 MB, opens offline in any browser.

It now states **two numbers** in its own header — 3,554 translations used in
3,914 places — with a paragraph saying why both. Each item shows:

- the Nepali, and the English meant to say the same thing;
- subject, unit, marks, topic heading, kind, source file and the reference
  inside it;
- **whether the same Nepali is used elsewhere**, how many times, and which
  other subjects — so ticking it once cannot lose a context;
- **whether a number or name is interpolated at run time**, shown as `{…}`;
- **whether this one Nepali stands in for more than one English**, with the
  others quoted;
- the technical terms left in Latin script;
- a status and a field to write in.

Its standing warning is unchanged and still true: *"No review has taken place.
This document is the request for one."*

**Human-reviewed is 0.** Nothing in the generator can raise it. `carryStatus()`
only ever copies a status already recorded by hand in the ledger file, and
mutation 6 demonstrates that a code path trying to invent one fails a test.

---

## 11 · Final diff and change-scope audit

```
git status --short      104 entries
  modified               85
  untracked              19
  staged                  0
```

Phase 13.1's own footprint, classified:

| Classification | File |
|---|---|
| **Extractor** | `tools/nepali-bilingual.js` (new) |
| **Review-ledger generator** | `tools/nepali-review.js` |
| **Review-ledger data** | `docs/nepali-review-items.json`, `docs/NEPALI-REVIEW-PACKAGE.html` |
| **Tests** | `tests/nepali-review.test.js` (new), `tests/language.test.js` |
| **Documentation** | `docs/NEPALI-REVIEW-STATUS.md`, `docs/README.md`, `docs/GRADE-10-REGRESSION-BASELINE.md` (one stale ledger figure), `docs/PHASE-13-COMPLETION-REPORT.md` (a correction notice pointing here, its text otherwise left as the record of what it claimed), `docs/PHASE-13-1-COMPLETION-REPORT.md` (new) |
| **Other** | none |

Everything else in the 104 is Phase 13's, unchanged by this phase: the six Grade
9 lesson sources and unit pages, `sim-cipher.js`, the Grade 9 question bank,
`sim-drill.js`, the 39 nav-only Grade 10 pages, the regenerated CSS and JS
bundles, and the four Grade 9 documents.

Verified:

- the preserved `tools/grade9-spec.js` fix is intact, unstaged, and `--check` passes;
- no Grade 10 educational content or question bank changed (§7);
- no unrelated cleanup;
- **no dependency added** — `package.json` is untouched and there is still no
  `node_modules`;
- the ignored worktree was neither modified nor deleted;
- no generated output omitted: build re-run, package regenerated, both after the
  last source change;
- **nothing staged, committed, pushed, merged or deployed.**

`git diff --check` reports trailing whitespace in two files. 15,831 of the
complaints are in `docs/NEPALI-REVIEW-PACKAGE.html`, which is generator output
and had 5,475 such lines at HEAD — the same pattern, proportionally more of it
because the package is larger. The other two are in `index.html` at lines 138
and 147, blank-but-indented lines left by a conditional template expression in
`_source/build/index.js` that collapses to an empty string. Those are **Phase
13's**, in build output, and fixing them means editing the build — outside this
phase's scope. Recorded rather than touched.

---

## 12 · Remaining limitations

**1 · No human has reviewed any Nepali.** 3,914 occurrences, 3,554
translations, every one `pending-review`. No reviewer has been engaged, named or
approached. This is the limitation; everything else on this list is smaller.

**2 · 56 Devanagari strings still reach no reviewer**, 2.2% of the source
Nepali. Each is listed by `node tools/nepali-review.js --audit` with its file and
line, and `tests/nepali-review.test.js` fails if the number grows. The
concentrations: `build/index.js` 13 (the homepage's Nepali paragraphs, written
in template literals whose two halves are sibling `<div>` blocks rather than a
pair), `sql-engine.js` 9 and `sim-number.js` 7 (sentences assembled from more
than two fragments, with the English in a different order from the Nepali),
`sim-kmap.js` 4, `trace.js` 4, and 19 across nine other files.

**3 · A Grade 10 answer key could be corrupted silently** (mutation 9). No
guard holds the question banks' correctness.

**4 · 16 Devanagari fragments are excluded from the census** as unreviewable —
digit tables and single conjunctions waiting to be concatenated. The exclusion
is defensible and it is still an exclusion.

**5 · The "new since the baseline" label covers Phases 9 to 13.1**, not Phase 9.
The package's filter button and the JSON field are both named for the baseline
commit now rather than for a phase, but 1,017 translations behind one label is a
poor way to prioritise. Per-phase provenance would need a per-phase baseline the
repository does not keep.

**6 · Attribution for `heading-ne.js` is by substring search** — a heading is
attributed to every lesson whose HTML contains its English text. That is
correct for the headings in use and would silently attribute nothing to a
heading that exists in the table but on no page.

**7 · 52 diagram narrations are attributed to no lesson** and 8 simulator
strings to no page. Both are shown as such in the ledger rather than hidden.
They are diagrams and sets that exist in the library but are not currently
placed — content a reviewer can still judge, with no unit to judge it against.

**8 · Nothing here is evidence about Nepali.** No teacher validation, no student
testing, no screen-reader verification and no WCAG claim is made by this phase.
The extraction tests passing means the package is complete, not that the
translations are good.

---

## 13 · Final Git state

```
branch                        phase-13-grade-9-units-2-7
HEAD                          e56fca98a428cfc4874bda922f7a313aa80e3cb9
modified files                85
untracked files               19
staged entries                0
commits ahead of origin/main  0
tools/grade9-spec.js          +17 −2, unstaged, uncommitted, --check passes
ignored worktree              present, untouched
build                         OK
tests                         507 / 507
```

**No commit, no push, no merge, no rebase, no deploy, and no history rewrite
took place during Phase 13.1.** No destructive Git command was run. The working
tree contains Phase 13's uncommitted work exactly as it was found, plus Phase
13.1's four source files and three documents.

---

## 14 · Verdict

**READY WITH DOCUMENTED LIMITATIONS.**

Not READY FOR REVIEW, and the reason is specific rather than cautious. The
brief's completion criteria require that "inline bilingual pairs are extracted
reliably" and that discrepancies be accounted for. They are: 97.8% coverage,
measured against literals rather than against the extractor's own output, with
every one of the 56 exceptions named and a test that stops the number growing.
The attribution model distinguishes translations from occurrences, keeps every
subject, unit and file context, preserves a reviewer's verdict across
regeneration, and cannot invent one. Grade 10 is byte-for-byte unchanged in
content, 150/150, 39 URLs. Build and 507 tests pass. Ten mutations were run and
nine were caught.

The tenth was not, and it is why this verdict is qualified: **a Grade 10
question's answer key can be changed without any guard noticing.** That is
pre-existing, it is outside this phase's scope to fix, and it is the kind of
thing a completion report should not round down.

The second qualification is the 56 strings. 2.2% is small and it is not zero,
and a package handed to a teacher as "complete" should say which 56.

What this phase did not do, and could not: **review any Nepali.** The package is
now worth a reviewer's time, which it was not before — 42% of the platform's
Nepali was absent from it, including every simulator's narration and all four
guided practice banks. Making the request honest is as far as code goes. The
rest needs a Nepali-speaking Computer Engineering teacher.

---

## 15 · Recommendation

**Phase 13 can be frozen and the next Grade 9 subject can begin**, with two
things done first and one decision taken.

Before the next subject:

1. **Commit this work.** 102 entries of uncommitted work, two phases deep, with
   a protected file that must stay out of the commit, is a state that gets
   harder to reason about every day. The split is clean: Phase 13's content,
   then Phase 13.1's extractor and tests, with `tools/grade9-spec.js` excluded
   from both.
2. **Decide about `tools/grade9-spec.js`.** It has survived two phases as a
   deliberate exception. It is a correct fix to a real Windows-checkout defect
   and it is not getting more correct by waiting.

The decision: **the 56-string residue and the Grade 10 answer-key gap are both
worth a small phase of their own**, and neither should be bolted onto a content
phase. Closing the residue means teaching the parser one more shape — a
fragment chain longer than two arguments — plus applying the lesson collector's
logic to the build's template literals. Closing the answer-key gap means a
content-hash baseline for the four Grade 10 banks. Together that is a day, and
it is the kind of work that is cheap now and expensive once Grade 9 has three
more subjects in it.

For the next subject itself, the pattern that generalises from this phase is
narrow and worth stating: **a collector that reports what it found cannot tell
you what it missed.** The three Grade 9 subjects still to write will add
Nepali to new places — a C tracer, a circuit simulator, an HTML sandbox — and
each will invent its own way of holding a bilingual pair. The ratchet test is
what makes that visible on the day it happens rather than when a reviewer
does not comment on text they were never shown.
