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
      if (opts.shuffle) {
        for (var i = pool.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var t = pool[i]; pool[i] = pool[j]; pool[j] = t;
        }
      }
      if (typeof opts.limit === 'number' && opts.limit > 0) pool = pool.slice(0, opts.limit);
      return pool;
    },

    /* The shape the current quiz UI renders. Keeping this projection in
       one place is what lets the bank carry rich metadata while the UI
       stays simple. */
    toRenderModel: function (questions) {
      return questions.map(function (q) {
        return {
          id: q.id,
          q: q.prompt.en,
          o: q.options.map(function (o) { return o.en; }),
          a: q.answer,
          e: q.explanation.en,
          n: q.explanation.ne || ''
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
