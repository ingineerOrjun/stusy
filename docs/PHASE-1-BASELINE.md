# Phase 1 — Pre-Refactor Baseline

**Captured:** 5 September 2026, before any file was modified.
**Purpose:** the regression contract. Phase 1 is only complete when every result
below still holds.

All results are actual command output. Nothing here is asserted without running it.

---

## 1. Build

```
$ cd _source && node build2.js
site written to C:/Users/Acer/Desktop/rgsc-study
deep-authored units: u1, u2, u3, u4, u5, u6
diagrams injected: 22
```

**Determinism:** the build was run twice and the output hashed both times. The
hashes were identical, so the build is deterministic and safe to use as a
regression oracle.

## 2. Link integrity

```
$ node check-links.js
html files: 20 | local refs checked: 704 | broken: 0
chrome check done
```

- 20 HTML pages
- 704 internal `href`/`src` references, **0 broken**
- Every page carries nav, hamburger, mobile panel and stylesheet

## 3. JavaScript syntax

```
$ for f in assets/js/*.js; do node --check "$f"; done
valid: 7/7
```

`code.js` · `nav.js` · `quiz.js` · `sim-dispatch.js` · `sim-stackqueue.js` ·
`snippets.js` · `trace.js`

## 4. Generated-output fingerprint

29 files hashed with SHA-256 (line endings normalised so CRLF/LF cannot mask a
real change): 20 HTML pages, 1 stylesheet, 7 scripts, 1 README.

Stored as `baseline.json`. The post-refactor build is compared against it
file-by-file.

## 5. Browser verification

Served over HTTP and driven programmatically. Console checked on every page.

| Page | Result |
| --- | --- |
| `unit1.html` | 9 diagrams painted (all non-zero bounding boxes), 5 code blocks rendered, **0** `pre.cpp` left unconverted, 4 exam questions, 4 answer toggles, 11 bilingual pairs |
| `unit6.html` | 3 diagrams, 4 code blocks, 4 exam questions, dispatch simulator present |
| `trace.html` | 3 programs, 58 steps |
| `quiz.html` | 15 questions |
| `grade9/electro-system/` | Outline page renders |

**Console errors across all pages tested: none.**

### Interactive behaviour

| Feature | Verification | Result |
| --- | --- | --- |
| Answer toggle | Clicked; asserted class `ans` → `ans show`, label → "Hide the answer" | Pass |
| Dispatch simulator | Called `dispatch('rt2')` | Output `I am a Circle`, caption shown, line 17 highlighted |
| Program tracer | Ran all 3 programs to completion | See exact outputs below |
| Quiz | Answered all 15 correctly | `15 / 15`, message correct |

### Tracer reference outputs (the regression oracle)

```
Program 1 — Class, Constructor, Destructor
Constructor called for Ram
Constructor called for Sita
Name: Ram, Roll: 15
Name: Sita, Roll: 16
Destructor called for Sita
Destructor called for Ram

Program 2 — Multilevel Inheritance
Animal constructor
Dog constructor
Puppy constructor
I can eat
I can bark
I can weep

Program 3 — Run-time Polymorphism
Drawing a Circle
Drawing a Square
```

These match real C++ semantics, including reverse destruction order, base-first
constructor order, and virtual dispatch.

## 6. Content inventory

| Metric | Baseline |
| --- | --- |
| Pages | 20 |
| Words (Grade 10 C++ pages) | ~21,800 |
| Diagrams defined / used | 22 / 22 |
| Worked examples | 20 |
| Exam questions | 24 |
| Bilingual pairs | 32 |
| Common-mistake boxes | 7 |
| C++ code blocks | 21 |
| Quiz questions | 15 |
| Tracer programs / steps | 3 / 58 |
| Outline subjects | 7 (46 units, 284 topics) |

## 7. Environment

| | |
| --- | --- |
| Node | v24.16.0 (built-in test runner available) |
| npm | 11.13.0 |
| Dependencies | none |
| `package.json` | none |
| Git remote | `github.com/ingineerOrjun/stusy.git` |
| Working tree | clean (1 commit) |

---

## Regression contract

Phase 1 is complete only if, after refactoring:

1. `node build` succeeds
2. 20 pages generated
3. 704 links, 0 broken
4. 7/7 JS files valid
5. **Every one of the 29 generated files hashes identically to baseline**, or each
   difference is explained and justified
6. All 3 tracer programs produce the outputs above
7. Quiz scores 15/15
8. Simulators produce the outputs above
9. Zero console errors
