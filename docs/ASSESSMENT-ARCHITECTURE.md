# Assessment Architecture

How questions are stored, selected, rendered and scored — and how the current
fixed 15-question quiz becomes a question-bank-driven system without rewriting
the engine.

---

## 1. Target pipeline

```
Question Bank  ──►  QuizService  ──►  Quiz UI  ──►  Attempt  ──►  ProgressService
   content            selection        render       score          history
```

Phase 1 built the first three stages and prepared the last two.

| Stage | State |
| --- | --- |
| Question Bank | **Built** — tagged, validated, per subject |
| QuizService | **Built** — selection, projection, scoring |
| Quiz UI | **Built** — renders from the service, unchanged behaviour |
| Attempt | Prepared — `ProgressService.recordQuizAttempt()` exists and is tested |
| Performance | Not built — needs attempt data first |

## 2. Question schema

```js
{
  id:         'g10.oop-cpp.q01',       // stable, unique, human-readable
  subject:    'grade10/oop-cpp',       // matches the site-map key
  unit:       'u1',                    // which unit examines this
  topic:      'stack-lifo',            // finer than unit
  difficulty: 'easy' | 'medium' | 'hard',
  type:       'single-choice',         // extension point
  examRelevant: true,                  // appears in the written exam
  prompt:      { en: 'Which data structure follows LIFO?' },
  options:     [ { en: 'Queue' }, { en: 'Stack' }, … ],
  answer:      1,                      // index into options
  explanation: { en: 'A stack inserts…', ne: 'स्ट्याकले एउटै छेउ…' }
}
```

Design notes:

- **`prompt` and `options` are English-only, deliberately.** The exam is in
  English; translating questions would train students on the wrong wording. The
  **explanation** is bilingual, because that is where understanding happens.
- **`id` is stable.** It is what a future attempt record, per-question analytics
  and "questions you keep getting wrong" all key on. Ids must never be reused.
- **`answer` is an index**, validated to be in range at registration and by tests.
- **`type` exists with one value.** `multi-choice`, `true-false`, `fill-blank`
  and `match` extend the enum without changing the container.

Storage: `_source/content/questions/<subject>.js` — one module per subject, so a
new subject's questions never touch another's.

## 3. QuizService

The boundary between question storage and the interface.

```js
QuizService.registerBank(subjectId, questions)   // generated code calls this
QuizService.getQuiz({ subject, unit, topic, difficulty, limit, shuffle })
QuizService.toRenderModel(questions)             // rich schema → UI shape
QuizService.score(questions, answers)            // → { score, total }
QuizService.isCorrect(question, index)
QuizService.listSubjects()
```

`registerBank` **validates and throws** on a malformed question — a bad answer
index or a missing prompt fails loudly at load, not silently in front of a
student.

`getQuiz` already supports every filter a generated quiz needs. Today the quiz
page calls it with no filters:

```js
var QUIZ = QuizService.toRenderModel(
  QuizService.getQuiz({ subject: 'grade10/oop-cpp' })
);
```

A per-unit quiz is that one call with `unit: 'u3'`. **The engine does not
change.** That is the whole point of the refactor.

### toRenderModel

The bank carries metadata the UI does not need. The projection flattens it:

```js
{ id, q, o: ['…'], a, e, n }
```

Keeping the projection in the service means the bank can grow richer without the
renderer noticing.

## 4. Generation and load order

Banks are content, so they are **generated**, not hand-written:

```
_source/content/questions/grade10-oop-cpp.js
        │  build
        ▼
assets/js/question-bank.js
        QuizService.registerBank("grade10/oop-cpp", [ … ]);
```

The quiz page loads, in order:

```html
<script src="../../assets/js/code.js"></script>
<script src="../../assets/js/services/quiz.js"></script>   <!-- service first -->
<script src="../../assets/js/question-bank.js"></script>   <!-- then banks -->
<script src="../../assets/js/quiz.js"></script>            <!-- then the UI -->
```

Order is enforced by `config/pages.js` and asserted by a test.

## 5. Scoring and feedback

Current behaviour, preserved exactly:

- One attempt per question; answering locks all options for that question
- Immediate feedback — correct option green, chosen wrong option coral
- A bilingual explanation appears either way
- On the last answer, a score and a banded message
- **Retry rebuilds the quiz and resets the score**

`QuizService.score()` computes a score with no DOM involvement at all, which is
what makes scoring testable independently of rendering — and is how a future
server-side scoring path would work.

## 6. Progress integration — prepared, not wired

```js
ProgressService.recordQuizAttempt(quizId, score, total);
ProgressService.getQuizHistory(quizId);   // last 20 attempts
ProgressService.getBestQuizScore(quizId);
```

These are implemented and tested, including rejection of impossible scores and
bounding of history growth. **Nothing calls them yet**, because there is no
progress UI. Wiring is a two-line change in `showScore()` once that UI exists.

This is deliberate: the service exists *before* pages need it, so no page ever
learns to write to storage directly.

## 7. Current coverage

15 questions across the six units of `grade10/oop-cpp`:

| Unit | Questions | Difficulty spread |
| --- | --- | --- |
| u1 Data Structure | 4 | 4 easy |
| u3 Class & Object | 6 | 4 easy, 2 medium |
| u4 Abstraction/Encapsulation | 1 | 1 easy |
| u5 Inheritance | 1 | 1 medium |
| u6 Polymorphism | 3 | 1 easy, 2 medium |

**This distribution is wrong for exam preparation** and is recorded as content
debt: u1 carries 15 of 50 marks but only 4 questions; u2 has none at all. The
architecture makes it visible — before the bank was tagged, nobody could tell.

Target: roughly 20 questions per unit, ~120 for the subject, weighted by marks.

## 8. Not built in Phase 1

| Not built | Why | Needs |
| --- | --- | --- |
| Quiz generator UI | Selection exists; no interface asks for it | A "practise this unit" entry point |
| Shuffling | `getQuiz({shuffle})` works; the page does not use it | A decision on whether recall order aids revision |
| Timed mock exam | Different product surface | Exam blueprint per subject |
| Per-question analytics | Needs attempt persistence at scale | Backend |
| Adaptive difficulty | Needs analytics | Backend + data |
| Non-single-choice types | No content needs them yet | Renderer per type |

Each is additive. None requires changing what exists.
