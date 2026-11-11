/* =========================================================
   QuizService — selection and scoring, independent of any page.

       Question Bank  ->  QuizService  ->  Quiz UI  ->  ProgressService

   The UI asks for a quiz and reports an attempt. It does not know how
   questions are stored, filtered or scored. That keeps the current
   fixed 15-question quiz and a future generated, per-unit, shuffled
   quiz behind the same call.

   Banks are registered by generated code (assets/js/question-bank.js),
   so adding a subject's questions never means editing this file.
   ========================================================= */
(function (global) {
  'use strict';

  var banks = Object.create(null);
  var focus = Object.create(null);

  function isValidQuestion(q) {
    return q && typeof q === 'object' &&
           q.id && q.prompt && typeof q.prompt.en === 'string' &&
           Array.isArray(q.options) && q.options.length >= 2 &&
           Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length &&
           q.explanation && typeof q.explanation.en === 'string';
  }

  var QuizService = {
    /* Called by generated bank files. Rejects malformed questions loudly at
       load time rather than letting a broken question reach a student. */
    registerBank: function (subjectId, questions) {
      if (typeof subjectId !== 'string' || !subjectId) {
        throw new TypeError('QuizService.registerBank: subjectId must be a non-empty string');
      }
      if (!Array.isArray(questions)) {
        throw new TypeError('QuizService.registerBank: questions must be an array');
      }
      var bad = [];
      for (var i = 0; i < questions.length; i++) {
        if (!isValidQuestion(questions[i])) bad.push(questions[i] && questions[i].id || '#' + i);
      }
      if (bad.length) {
        throw new Error('QuizService.registerBank(' + subjectId + '): invalid question(s): ' + bad.join(', '));
      }
      banks[subjectId] = questions.slice();
      return questions.length;
    },

    listSubjects: function () { return Object.keys(banks); },

    /* ---- where to go back to, per subject, in two kinds ----
       Registered by the generated bank file alongside the questions. The
       engine serves five subjects from one file, so advice that names a
       unit has to arrive as data; the alternative is what used to be
       here — one subject's unit numbers hardcoded into a shared score
       message, read by students of four other subjects.

       TWO KINDS, NEVER MERGED.

         exam     units carrying the most examination marks. Derived at
                  build time. A fact about the paper, not about
                  difficulty: a heavy unit is not hard and a light one is
                  not easy, and the label the student reads says so.

         teacher  units a teacher has judged students should revisit.
                  Authored, with a recorded source. Currently empty for
                  every subject — see content/revision-focus.js.

       They are stored apart and returned apart. A caller that wants one
       sentence must choose which kind it is showing and label it; it
       cannot accidentally present marks as a difficulty judgement by
       reading the wrong key.

       An unregistered subject returns empty lists and the caller says
       something that names nothing, which is the right failure: a
       missing registration must cost specificity, never correctness. */
    registerFocus: function (subjectId, kinds) {
      if (typeof subjectId !== 'string' || !subjectId) {
        throw new TypeError('QuizService.registerFocus: subjectId must be a non-empty string');
      }
      if (!kinds || typeof kinds !== 'object' || Array.isArray(kinds)) {
        throw new TypeError('QuizService.registerFocus: expects { exam: [], teacher: [] }');
      }
      var slot = { exam: [], teacher: [], source: kinds.source || null };
      var names = ['exam', 'teacher'];
      for (var k = 0; k < names.length; k++) {
        var kind = names[k];
        var units = kinds[kind];
        if (units === undefined) continue;
        if (!Array.isArray(units)) {
          throw new TypeError('QuizService.registerFocus: ' + kind + ' must be an array');
        }
        for (var i = 0; i < units.length; i++) {
          var u = units[i];
          if (!u || typeof u !== 'object' || !u.n ||
              !u.title || typeof u.title.en !== 'string') {
            throw new Error('QuizService.registerFocus(' + subjectId + ', ' + kind +
                            '): unit ' + i + ' has no number or no English title');
          }
        }
        slot[kind] = units.slice();
      }
      focus[subjectId] = slot;
      return slot.exam.length + slot.teacher.length;
    },

    /* `kind` is required, and an unknown one returns nothing rather than
       quietly falling back to the other — the whole purpose of this pair
       is that a caller cannot get marks when it asked for judgement. */
    getFocus: function (subjectId, kind) {
      var slot = focus[subjectId];
      if (!slot) return [];
      if (kind !== 'exam' && kind !== 'teacher') return [];
      return slot[kind].slice();
    },

    /* Which kind this subject can actually offer, so a caller picks the
       label before it picks the units. */
    focusKind: function (subjectId) {
      var slot = focus[subjectId];
      if (!slot) return null;
      if (slot.teacher.length) return 'teacher';
      if (slot.exam.length) return 'exam';
      return null;
    },

    focusSource: function (subjectId) {
      var slot = focus[subjectId];
      return (slot && slot.source) || null;
    },

    /* Select a quiz. Today every caller takes the whole bank in order,
       which is exactly the current behaviour. The filters exist so a
       per-unit or difficulty-scoped quiz needs no engine change. */
    getQuiz: function (opts) {
      opts = opts || {};
      var pool = banks[opts.subject] || [];
      if (opts.unit)       pool = pool.filter(function (q) { return q.unit === opts.unit; });
      if (opts.difficulty) pool = pool.filter(function (q) { return q.difficulty === opts.difficulty; });
      if (opts.topic)      pool = pool.filter(function (q) { return q.topic === opts.topic; });
      pool = pool.slice();

      /* WHY `rand` IS INJECTABLE.
         Shuffling called Math.random directly, which made the one
         property that matters about a shuffled draw untestable: that it
         is a permutation of the pool and loses nothing. A test could
         assert the COUNT, and did, and a shuffle that dropped a question
         or served one twice would have passed it.

         A seeded generator makes the draw reproducible, so a test can
         name the exact paper it expects. Production passes nothing and
         gets Math.random, so page behaviour is unchanged. */
      var rand = typeof opts.rand === 'function' ? opts.rand : Math.random;

      if (opts.shuffle) {
        for (var i = pool.length - 1; i > 0; i--) {
          var j = Math.floor(rand() * (i + 1));
          var t = pool[i]; pool[i] = pool[j]; pool[j] = t;
        }
      }
      if (typeof opts.limit === 'number' && opts.limit > 0) pool = pool.slice(0, opts.limit);
      return pool;
    },

    /* The shape the current quiz UI renders. Keeping this projection in
       one place is what lets the bank carry rich metadata while the UI
       stays simple.

       Every field is projected as a bilingual pair so one engine can
       serve all three language modes. The UI renders both halves and the
       language layer hides one; it never decides which language a
       student is in, and it never re-renders when the mode changes —
       which is why switching language mid-quiz cannot lose an answer.

       A question with no Nepali yet projects an empty ne. That is a
       content gap, not an engine failure: the empty half renders as
       nothing in bilingual mode, and Nepali mode falls back to the
       English so the student still gets a readable question. */
    toRenderModel: function (questions) {
      function pair(o) { return { en: (o && o.en) || '', ne: (o && o.ne) || '' }; }
      return questions.map(function (q) {
        return {
          id: q.id,
          q:  pair(q.prompt),
          o:  q.options.map(pair),
          a:  q.answer,
          e:  pair(q.explanation),
          /* kept so an older caller reading .n still gets the Nepali
             explanation rather than undefined */
          n:  (q.explanation && q.explanation.ne) || ''
        };
      });
    },

    isCorrect: function (question, chosenIndex) {
      return !!question && question.a === chosenIndex;
    },

    score: function (questions, answers) {
      var n = 0;
      for (var i = 0; i < questions.length; i++) {
        if (answers[i] !== undefined && answers[i] === questions[i].a) n++;
      }
      return { score: n, total: questions.length };
    }
  };

  global.QuizService = QuizService;
  if (typeof module !== 'undefined' && module.exports) module.exports = QuizService;

})(typeof window !== 'undefined' ? window : globalThis);
