/* =========================================================
   RevisionService — deciding what a student should revise next

   WHAT THIS IS NOT
   It is not an adaptive-learning engine, and it does not pretend to be
   one. Every decision here is a rule that can be written on one line,
   read by a teacher, and disagreed with. That is deliberate: a
   recommendation a student cannot understand is a recommendation they
   cannot trust, and an opaque scoring function would be a worse product
   dressed as a better one.

   WHERE THE DATA COMES FROM
   Phase 6 started recording a self-grade for every practice question a
   student attempts — got / partly / not — through ProgressService.
   Nothing was ever shown back to them. This is the half that was
   missing.

   THE PRIORITY RULES, IN FULL

     NEEDS_REVIEW   graded `not`.        The student judged their own
                                         answer wrong. Highest priority,
                                         always.
     SHAKY          graded `partly`.     Half an answer is the state
                                         that turns into a lost mark
                                         under time pressure.
     FRESH          graded `got`, once.  Right, but on one attempt. Worth
                                         seeing again before the exam,
                                         not worth revising now.
     SECURE         graded `got` after
                    an earlier miss.     Recovered and held. This is the
                                         strongest evidence the record
                                         can carry.
     UNSEEN         never attempted.

   WHY THERE IS NO SEPARATE CONFIDENCE AXIS
   A four-box model — right/wrong × confident/uncertain — is the standard
   one, and it needs two questions per item. This product asks one, and
   its three answers already blend correctness with confidence: a student
   who chooses `partly` is telling you both that they were incomplete and
   that they know it. Adding a second question would double the cost of
   every retrieval to sharpen a distinction the first question mostly
   already makes. The mapping above is stated so the trade-off is
   visible rather than hidden.

   THE UNIT MASTERY STATES

     NEW            nothing in this unit attempted
     LEARNING       started, less than half attempted
     PRACTICING     half or more attempted, nothing outstanding
     NEEDS_REVIEW   anything graded `not` still standing
     MASTERED       every question attempted, every one `got`

   NEEDS_REVIEW deliberately wins over everything except NEW. A unit
   where one question is still wrong is not "practicing", whatever the
   other counts say.

   TONE
   Nothing here returns a judgement of the student. The states are
   descriptions of a record, and the wording that reaches the screen —
   "needs another look", "almost there" — lives in UIStrings where it can
   be reviewed as language rather than buried in a scoring function.
   ========================================================= */
(function (global) {
  'use strict';

  /* Priority order, worst first. The array IS the ordering — anything
     that sorts revision items sorts by index into this. */
  var PRIORITY = ['NEEDS_REVIEW', 'SHAKY', 'FRESH', 'SECURE', 'UNSEEN'];

  var STATES = ['NEW', 'LEARNING', 'PRACTICING', 'NEEDS_REVIEW', 'MASTERED'];

  var MAP = { units: {}, questions: {} };
  var loaded = false;

  function progress(){
    return (typeof global.ProgressService !== 'undefined') ? global.ProgressService : null;
  }

  /* ---------- one question ---------- */

  function priorityOf(record){
    if (!record) return 'UNSEEN';
    if (record.grade === 'not') return 'NEEDS_REVIEW';
    if (record.grade === 'partly') return 'SHAKY';
    /* got. One attempt is a first-time pass; more than one means the
       student came back after missing it, which is better evidence. */
    return (record.attempts > 1) ? 'SECURE' : 'FRESH';
  }

  /* ---------- one unit ---------- */

  function questionsOf(unitId){
    var out = [];
    for (var id in MAP.questions){
      if (!Object.prototype.hasOwnProperty.call(MAP.questions, id)) continue;
      if (MAP.questions[id].unit === unitId) out.push(id);
    }
    return out.sort();
  }

  function unitReport(unitId){
    var unit = MAP.units[unitId];
    var ids = questionsOf(unitId);
    var P = progress();
    var counts = { NEEDS_REVIEW: 0, SHAKY: 0, FRESH: 0, SECURE: 0, UNSEEN: 0 };
    var items = [];

    for (var i = 0; i < ids.length; i++){
      var rec = null;
      if (P){ try { rec = P.getRetrieval(ids[i]); } catch (e){ rec = null; } }
      var pr = priorityOf(rec);
      counts[pr]++;
      items.push({ id: ids[i], priority: pr,
                   grade: rec ? rec.grade : null,
                   attempts: rec ? rec.attempts : 0,
                   page: MAP.questions[ids[i]].page });
    }

    var total = ids.length;
    var attempted = total - counts.UNSEEN;
    var state;
    if (!total) state = 'NEW';
    else if (attempted === 0) state = 'NEW';
    else if (counts.NEEDS_REVIEW > 0) state = 'NEEDS_REVIEW';
    else if (attempted === total && counts.SHAKY === 0) state = 'MASTERED';
    else if (attempted * 2 >= total) state = 'PRACTICING';
    else state = 'LEARNING';

    return {
      unit: unitId,
      title: unit ? unit.title : null,
      page: unit ? unit.page : null,
      subject: unit ? unit.subject : null,
      marks: unit ? unit.marks : null,
      prereqs: unit ? unit.prereqs : [],
      total: total,
      attempted: attempted,
      counts: counts,
      state: state,
      items: items
    };
  }

  /* ---------- the whole picture ---------- */

  function allUnits(){
    var out = [];
    for (var id in MAP.units){
      if (Object.prototype.hasOwnProperty.call(MAP.units, id)) out.push(id);
    }
    return out.sort();
  }

  function subjectReport(subjectId){
    var reports = allUnits()
      .filter(function (id){ return MAP.units[id].subject === subjectId; })
      .map(unitReport);
    var t = { NEW: 0, LEARNING: 0, PRACTICING: 0, NEEDS_REVIEW: 0, MASTERED: 0 };
    var total = 0, attempted = 0;
    reports.forEach(function (r){
      t[r.state]++; total += r.total; attempted += r.attempted;
    });
    return {
      subject: subjectId,
      units: reports,
      states: t,
      total: total,
      attempted: attempted,
      percentAttempted: total ? Math.round(attempted / total * 100) : 0
    };
  }

  /* WHAT TO DO NEXT.
     Ordered by priority first and by exam marks second, so that two
     units both needing review are offered weightiest first. A unit
     nobody has opened is never "recommended revision" — there is
     nothing to revise yet, and telling a student to revise something
     they have not read is how a recommendation loses its credibility. */
  function recommendations(limit){
    var out = [];
    allUnits().forEach(function (id){
      var r = unitReport(id);
      /* NOTHING WRONG IS NOT SOMETHING TO REVISE.
         A part-finished unit where every answer so far was right is a
         unit to CONTINUE, which is a different action and belongs on a
         different list. Recommending it would put "0 questions came out
         only partly right" on the screen, and one recommendation a
         student can see is empty costs the credibility of the rest. */
      if (r.counts.NEEDS_REVIEW === 0 && r.counts.SHAKY === 0) return;
      var worst = r.counts.NEEDS_REVIEW > 0 ? 'NEEDS_REVIEW' : 'SHAKY';
      out.push({
        unit: id,
        title: r.title,
        page: r.page,
        state: r.state,
        worst: worst,
        needsReview: r.counts.NEEDS_REVIEW,
        shaky: r.counts.SHAKY,
        marks: r.marks || 0,
        /* the prerequisite is the escape hatch when the unit itself is
           not the problem */
        prereqs: r.prereqs
      });
    });
    out.sort(function (a, b){
      var d = PRIORITY.indexOf(a.worst) - PRIORITY.indexOf(b.worst);
      if (d) return d;
      return b.marks - a.marks;
    });
    return (typeof limit === 'number') ? out.slice(0, limit) : out;
  }

  var RevisionService = {
    PRIORITY: PRIORITY,
    STATES: STATES,

    /* The generated learning map calls this. Kept separate from the
       module so the service is testable without a build. */
    load: function (map){
      MAP = { units: (map && map.units) || {}, questions: (map && map.questions) || {} };
      loaded = true;
      return true;
    },
    isLoaded: function (){ return loaded; },
    map: function (){ return MAP; },

    unit: function (id){ return MAP.units[id] || null; },
    units: allUnits,
    questionsOf: questionsOf,

    priorityOf: priorityOf,
    unitReport: unitReport,
    subjectReport: subjectReport,
    recommendations: recommendations,

    /* Every subject the map knows, in a stable order. */
    subjects: function (){
      var seen = {}, out = [];
      allUnits().forEach(function (id){
        var s = MAP.units[id].subject;
        if (!seen[s]){ seen[s] = 1; out.push(s); }
      });
      return out;
    }
  };

  global.RevisionService = RevisionService;
  if (typeof module !== 'undefined' && module.exports) module.exports = RevisionService;

})(typeof window !== 'undefined' ? window : this);
