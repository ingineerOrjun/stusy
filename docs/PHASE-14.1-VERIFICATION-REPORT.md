# Phase 14.1 — C compiler verification and execution integrity

**Verdict: VERIFIED WITH LIMITATIONS.** Every C program the Grade 9 subject
teaches has been compiled and executed by a real compiler, and every claim the
lessons, the question bank, the guided practice and the interactive stepper make
about those programs has been checked against what the compiler actually did.
Five defects were found and corrected. The limitations are listed in §10 and
they are real: one toolchain, no AddressSanitizer, and no human has read a word
of the Nepali.

What this report does **not** say is that the website is correct because its
tests pass. The tests pass, and that is recorded in §9, but the verdict above
rests on compiler and execution evidence, not on the test suite.

---

## 1 · The compiler, and how it is known to be the real thing

No compiler was installed on this machine and none was installed globally. The
toolchain lives entirely in the session scratchpad and nothing from it was
copied into the repository.

| | |
|---|---|
| Package | `BrechtSanders.WinLibs.POSIX.UCRT` 16.2.0-14.0.0-r3 |
| Integrity oracle | the winget community manifest, Microsoft-curated, read at verification time |
| Archive | 276,414,382 bytes |
| Expected SHA256 | `3c69305081e4a647144339a936244fcf7d3d9e558319e1ad7be2cd2886d4b6a1` |
| Actual SHA256 | `3c69305081e4a647144339a936244fcf7d3d9e558319e1ad7be2cd2886d4b6a1` |
| Result | **MATCH** |

The complete expected hash was taken from the manifest itself. Nothing was
reconstructed or guessed, and the archive was not extracted until the two
hashes had been compared. The hash was computed twice by two independent
tools and agreed both times.

Authenticity is **not** claimed on the strength of the filename or the
publisher's name. It rests on the hash matching a value published in a
Microsoft-curated manifest, and on the compiler then behaving as GCC:

```
gcc.exe (MinGW-W64 x86_64-ucrt-posix-seh, built by Brecht Sanders, r3) 16.2.0
-dumpmachine         x86_64-w64-mingw32
mingw-w64 runtime    14.0.0
C runtime            UCRT (_UCRT defined)
default standard     __STDC_VERSION__ 202311L  (C23)
-std=c17             __STDC_VERSION__ 201710L  ← used for every check below
```

Everything in this report was compiled with
`gcc -std=c17 -Wall -Wextra -Wpedantic -O0 -g` unless a section says otherwise.
Where the question is "what does a student typing `gcc prog.c` see", the
default invocation was used instead and the section says so.

Raw evidence: `evidence/01-archive-integrity.txt`, `evidence/02-compiler.txt`.

---

## 2 · What was inventoried

Every piece of C in the subject was collected mechanically from the content
files, not by hand.

| | count | |
|---|---:|---|
| Stepper programs | 14 | all standalone, all compiled |
| Lesson listings, standalone | 16 | all compiled |
| Lesson listing, deliberately broken | 1 | compiled to capture the diagnostics it is meant to produce |
| Lesson listings that are fragments | 4 | a few lines inside a sentence |
| Guided-practice fragments | 12 | |
| Question-bank fragments | 25 | |
| **Total items** | **72** | |
| **Distinct standalone sources written and compiled** | **30** | |

The 41 fragments are prose, not programs: a student reads them inside a
sentence. They are **not** reported as compiled programs. Instead, 40
purpose-built programs were written to execute the claim each fragment makes,
and those are what §4 checks. A fragment compiled inside a harness is never
described in this report as an independently compiled standalone program.

---

## 3 · Compilation and execution

```
sources compiled       : 30 / 30
sources with warnings  : none
test cases executed    : 45
output mismatches      : none
```

All 30 compile **silently** under `-Wall -Wextra -Wpedantic`. That was not true
when this phase began — two sources carried format warnings, and both are among
the defects corrected in §7.

The 45 cases are not one run per program. Programs with input were exercised at
their boundaries: zero, negatives, equal values, the largest-first and
smallest-first orderings, an average that needs the `.0`, and a division by
zero. Each case's expected output was derived by hand from the C standard
*before* the program was run, and the compiler was the arbiter when the two
disagreed.

Raw evidence: `evidence/03-compile-execute.txt`, `evidence/06-runtime-cases.txt`.

---

## 4 · The claims the subject makes, executed

The lessons, the 63-question bank, the 15 guided-practice problems and the 14
stepper programs make assertions about what C does. Each checkable assertion was
turned into a program that prints the fact, and the program was compiled and run.

```
124 / 124 claims execution-verified
```

Including, among others:

- a `switch` with no `break` falls through to the end (`q18`)
- nested loop counts multiply rather than add (`q22`)
- a short initialiser list zero-fills the rest (`q43`)
- `==` on two `char` arrays compares addresses, not text (`q47`)
- `%s` stops at the first whitespace and takes no ampersand (`q48`)
- `Student s1;` without the `struct` keyword is **rejected** by a C compiler (`q57`) — the diagnostic is captured
- `sqrt` without `math.h` is **diagnosed**, not silently accepted (lesson 4.3) — the diagnostic is captured
- the loop with no update never changes its counter (`q29`)

`q29` is an infinite loop. It was executed under a hard iteration cap written
into the harness and marked in the source as not part of the lesson, so the
claim is demonstrated without running an unbounded loop. The harness reports
separately that the cap, and nothing else, ended it.

Raw evidence: `evidence/04-trace-claims.txt`.

---

## 5 · The deliberately broken example (Unit 2, Example 2)

This listing is wrong on purpose and is the question the student answers. It
was the one place where the lesson's explanation did **not** match what a
compiler does.

Compiled with default flags — what a student typing `gcc prog.c` actually sees:

```
L-u2-2-broken.c:1:19: warning: extra tokens at end of '#include' directive
L-u2-2-broken.c:6:5:  error:   expected '=', ',', ';', 'asm' or '__attribute__' before 'float'
L-u2-2-broken.c:9:23: error:   'b' undeclared (first use in this function)
L-u2-2-broken.c:11:5: error:   'avg' undeclared (first use in this function)
EXIT=1
```

Then the grammar faults alone were repaired, so the remaining faults could be
observed running. Each was isolated and executed:

| fault | lesson said | compiler and runtime actually | lesson accurate |
|---|---|---|---|
| L1 `#include <stdio.h>;` | COMPILE ERROR | **warning**, on by default, build continues | **no — corrected** |
| L5 missing `;` | COMPILE ERROR | error; the only fault that stops the build | yes |
| L8 `scanf` without `&` | RUN-TIME | compiles silently by default; crashed at `-O0` with `0xC0000005` | yes |
| L10 integer division | WRONG ANSWER | compiles; **never** diagnosed at any `-W` level; printed `7.00` for 7 and 8 | yes |
| L11 `%d` given a `float` | WRONG OUTPUT | compiles silently by default, `-Wall` warns; printed `0` | yes |

Two statements were corrected in the lesson, both of them countings rather than
explanations:

- the LINE 1 label, `COMPILE ERROR` → `WARNING`, with the compiler's own wording
- *"Two of the five stop the build and three do not"* → **one** of the five
  stops the build. The gate's *"Two stop the compiler and two do not"* was
  corrected the same way.

The correction makes the lesson's point sharper rather than weaker, so the new
note says what the evidence supports: one fault stops the build, `-Wall` will
mention two more if you ask, and nothing at any warning level mentions the
integer division.

Raw evidence: `evidence/05-broken-example.txt`.

---

## 6 · Undefined behaviour

The brief asked for AddressSanitizer and UndefinedBehaviorSanitizer. This
toolchain ships **no sanitizer runtime** — `-lasan` and `-lubsan` are both
absent and there are no sanitizer libraries in `lib/` — so `-fsanitize=address`
cannot link and ordinary `-fsanitize=undefined` cannot link either. There is no
clang in this build.

UBSan's **trap mode** does work and was used:
`-fsanitize=undefined -fsanitize-trap=undefined` needs no runtime library,
because each check becomes a `ud2` instruction. A violation kills the process
with an illegal-instruction fault instead of printing a diagnostic. It detects
but does not name the fault; which check fired was then found by arming the
checks one at a time, counting only a `ud2` trap as a hit.

```
29 / 30 taught programs ran with every UBSan check armed and none fired
```

The one that trapped is `L-u2-3` on its *"b is zero"* case — the lesson's own
division-by-zero demonstration, narrowed to `integer-divide-by-zero`. That is
the behaviour the lesson teaches.

**No observed output is reported as guaranteed.** Where the content says a
program is undefined, that was demonstrated rather than asserted:

| | |
|---|---|
| `scanf` without `&`, input `12 8` | `-O0`: crash, exit 139. `-O1`, `-O2`, `-O3`, `-Os`: exits 0 and prints `Average = 0`. Same source, same input. |
| `q49`, reading `a[5]` of an `int[5]` | 150 — the correct total, by luck — at `-O0`, `-O1`, `-O2`. At `-O3`, 855 on one run and 709 on the next. Traps under UBSan. |
| `char name[5] = "NEPAL"` | `sizeof` 5 as it must be; `strlen` returned **10**, having walked five characters past the array; `printf("%s")` printed garbage after `NEPAL`. Diagnosed only at `-Wextra`. |

`q49`'s answer already said the program *"may print a strange number, may
corrupt another variable, or may crash — possibly a different one of those on
each run"*. That is exactly what was observed, so no correction was needed; the
Unit 5 answer about the missing terminator gained one sentence recording the
observed `strlen` of 10.

Raw evidence: `evidence/08-undefined-behaviour.txt`.

---

## 7 · Four dimensions, recorded separately

A program can pass one dimension and fail another, so each was recorded on its
own: **A** compilation, **B** runtime, **C** the lesson's own documented output,
**D** the interactive stepper.

```
A compilation : 30 PASS (silent)   ·  1 fails by design (the broken listing)
B runtime     : 30 PASS            ·  1 n/a            (45 cases in total)
C lesson      : 7 PASS  ·  1 PASS (documented)  ·  1 corrected  ·  8 have no output block  ·  14 n/a
D stepper     : 13 PASS ·  1 PASS (terminal echo)                ·  17 n/a
```

Two entries are not plain passes and both are explained rather than hidden:

- **`L-u7-1`, dimension C.** The lesson's transcript prints addresses in the
  glibc shape `0x7ffd1a2b3c4c`; this toolchain prints the same kind of address
  as `000000F7EBBFF74C`. `%p`'s format is implementation-defined, so neither is
  wrong. The lesson now states both shapes, says the addresses are
  illustrative, and notes that whether `p` sits above or below `n` is the
  compiler's business — on the run used to check the listing, `p` was twelve
  bytes *below* `n`.
- **`P-readAdd`, dimension D.** The stepper's console shows `12 8`, the
  characters the user types, which a real terminal echoes and a piped run
  cannot. The step that prints it says so in words. The stepper is the accurate
  one here; the piped run is the lossy one.

### The five defects found and corrected

| # | where | defect | correction |
|---|---|---|---|
| 1 | my own expectation for `L-u2-1` at radius 2.5 | I derived 19.63 by hand; the program printed 19.64 | **the expectation was wrong, not the program.** `3.1416f × 6.25 = 19.6350008…`, above the midpoint, so `%.2f` rounds up. The expectation file carries the correction and the reason. |
| 2 | `P-stringLen` | `printf("%d\n", strlen(name))` passes a `size_t` where `%d` requires an `int` — a constraint violation, warned at `-Wall`, and a contradiction of what Unit 2 teaches about specifiers | the length is now kept in `int len` and printed with `%d`. The new step says why, and points back at Unit 2. |
| 3 | `L-u7-1` | three `%p` arguments of type `int *` and `int **` where `void *` is required | `(void *)` casts added, with one sentence in the note explaining that most textbooks omit them and `gcc -Wall` will mention it |
| 4 | `L-u7-1` and the §7.2 prose | an implementation-specific address format presented as typical; `"%d often works"` for an address | both corrected against the evidence. `%d` on an address compiled with **no** message at all and printed `830470604` for an address whose value was `0x9B659FF94C` — not a failure, a truncation. |
| 5 | `L-u2-2` | a warning labelled COMPILE ERROR, and a wrong count of which faults stop the build | §5 |

A sixth, smaller one: `L-u3-2`'s documented output showed a trailing space on
the last row only, when `printf("* ")` puts one on every row. The block is now
consistent and a note states the fact, rather than leaning on whitespace a
reader cannot see.

Nothing was silently rewritten to make a check pass. Each correction above
names the original defect.

Raw evidence: `evidence/07-four-dimensions.txt`.

---

## 8 · The guard that found a defect before the compiler arrived

Before the toolchain finished downloading, a mechanical check found that
several stepper programs attributed a `for` loop counter's change to a body
line rather than to the `for` line. That is a misrepresentation of C execution
in a component whose whole purpose is to represent C execution.

It was corrected, and `tests/grade9-c.test.js` now carries a guard that fails if
a counter named in a `for` header is ever set on any line but that header. The
guard was mutation-tested: moving a single `set` to a neighbouring line makes
it fail.

---

## 9 · Full regression

```
npm test                       527 tests, 527 pass, 0 fail
npm run build                  8 subjects, 52 authored pages, 82 diagrams — OK
tools/grade9-spec.js --check   GRADE-9-CURRICULUM-SPECIFICATION.json is current

Grade 9 topic coverage         c-programming           35 / 35 anchored
                               computer-fundamentals   36 / 36 anchored
                                                       71 Grade 9 topics

Grade 10 protection            39 / 39 URLs present
                               39 identical or nav-only, 0 changed beyond nav
                               32 / 32 Grade 10 source files identical to HEAD
                               8 / 8 Grade 10 content banks identical to HEAD
                               188 questions, unchanged
                               150 / 150 official topics mapped

Protected change               tools/grade9-spec.js  +17 -2   (as required)
Staged files                   0
```

The Grade 10 page diffs are the shared navigation only: the C Language entry
gained its "notes ready" marker because the subject is now written, which the
build derives rather than declares. No Grade 10 educational text, question or
answer was touched.

### Visual verification — actually performed

All ten C Programming pages were loaded in a browser against the built site.

- **Console:** zero messages — no errors, no warnings — across index, all seven
  units, quiz and revise.
- **Three language modes:** checked on the corrected blocks in Units 2, 3 and 7
  by measuring rendered heights, not by assuming. In `en` the Nepali half
  measures 0; in `ne` the English half measures 0; in `bi` both are present.
- **320 px:** no horizontal page scroll on Units 3 or 5. The stepper mounts,
  its variable table does not overflow, and the code blocks scroll within
  themselves rather than pushing the page sideways.
- **The corrected stepper, stepped through at 320 px:** line 10
  `len = strlen(name);` sets `len` to 5 and prints nothing; line 11
  `printf("%d\n", len);` prints `5`; the console ends at `NEPAL / 5 / N`, which
  is exactly what the compiled program printed.

Raw evidence: `evidence/09-regression.txt`.

### One defect found during visual verification, not fixed

`div.out` blocks render their line breaks and column alignment as collapsed
prose. `_source/design/site.css` styles `pre.out` with `white-space:pre` and a
monospace font but has no rule for `div.out`, whose computed style is
`white-space: normal` in the proportional body font.

This is **platform-wide and predates this phase**. On `grade10/dbms/unit4.html`
a four-line `SELECT` statement renders on two lines and a three-line result
table renders on one. `div.out` is used in every authored subject — all of
Computer Fundamentals, DBMS, Digital Design and Hardware, and six blocks in the
C lessons.

It is not fixed here. The fix is a change to shared CSS plus normalised source
indentation, and it changes how all 39 Grade 10 pages render — which needs its
own visual regression pass, not a line added at the end of a verification
phase. It is recorded as a separate task with the measurements above.

---

## 10 · Limitations

Each of these is a real limit on what the verdict means.

1. **One toolchain.** GCC 16.2.0, MinGW-W64, UCRT, x86-64 Windows. Nothing was
   checked against glibc on Linux, against clang, against MSVC, or against the
   Turbo C that some Nepali school labs still run. Where behaviour is
   implementation-defined — `%p`'s format, `sizeof(int)`, structure padding —
   this report records one implementation and the content says so.
2. **No AddressSanitizer.** The runtime is absent from this build. Out-of-bounds
   *writes* and use-after-free were therefore not detected by tooling; only
   UBSan's trap-mode checks were armed. Trap mode detects without naming.
3. **The 41 prose fragments were not compiled as standalone programs**, because
   they are not programs. Their claims were verified by 40 purpose-built
   programs instead, and this report does not describe a fragment-in-harness as
   an independently compiled program.
4. **Zero human Nepali review.** See §11. No Nepali content is marked
   human-reviewed, and none should be.
5. **52 Devanagari strings in the source reach no reviewer.** They are
   enumerated by `node tools/nepali-review.js --audit` and are held by a
   ratchet test that lets the number fall and not rise.
6. **The `L-u7-1` output transcript is illustrative, not captured.** The
   addresses shown were not produced by a run; the lesson now says so and gives
   the shape this toolchain actually printed.
7. **`div.out` rendering** — §9.

---

## 11 · Nepali

| | |
|---|---|
| Distinct translations | **4,438** |
| Occurrences of them | **4,905** |
| **Human-reviewed** | **0** |
| Nepali in the source that reaches no reviewer | **52 strings** |

No human has read any of it. Nothing in this phase is marked as reviewed and no
claim of human review is made anywhere. The Nepali written during this phase's
corrections — in Units 2, 3, 5 and 7, and in the two new stepper steps — is
machine-written like the rest and is in the review package awaiting a reader.

The review package was regenerated after the corrections
(`node tools/nepali-review.js`) and `docs/NEPALI-REVIEW-STATUS.md` now states
the real figures.

---

## 12 · Evidence

Every file below is raw tool output, kept outside the repository in the session
scratchpad, at:

```
C:\Users\Acer\AppData\Local\Temp\claude\f163420483dd0207\a1027d72-6aa3-4b31-8a20-a57e3a20a010\scratchpad\evidence\
```

| file | contents |
|---|---|
| `01-archive-integrity.txt` | the manifest's URL, size and SHA256, and the hash actually computed |
| `02-compiler.txt` | version, target, runtime, standard, and the sanitizer probe |
| `03-compile-execute.txt` | 30 / 30 compiled, per-source warning status |
| `04-trace-claims.txt` | all 124 execution-verified claims |
| `05-broken-example.txt` | the broken listing at every warning level, each fault isolated and run |
| `06-runtime-cases.txt` | all 45 execution cases with inputs, exit codes and output |
| `07-four-dimensions.txt` | the A/B/C/D ledger, item by item |
| `08-undefined-behaviour.txt` | the UBSan sweep and the optimisation-level comparisons |
| `09-regression.txt` | tests, build, spec check, coverage, Grade 10 protection, git audit |

No compiler, binary or build artefact was added to the repository. The
toolchain, the generated sources and every executable live in the scratchpad.

---

## 13 · Git

Nothing was committed, staged, pushed, merged or deployed, and no such
operation was authorised on anyone's behalf. The protected uncommitted change
to `tools/grade9-spec.js` is untouched at +17 / −2. Nothing was reset,
discarded or stashed.

Phase 14.1 ends here. Phase 15 was not started.
