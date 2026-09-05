/* =========================================================
   ProgressService — the only thing in the product that is
   allowed to know where student progress is stored.

       UI  ->  ProgressService  ->  storage adapter  ->  localStorage

   Later, without touching a single page:

       UI  ->  ProgressService  ->  storage adapter  ->  API  ->  database

   Nothing else may read or write progress directly. Pages call the
   service; the service owns persistence, validation and failure.

   Degrades gracefully and silently for the student when storage is
   unavailable (private mode, blocked cookies, quota exceeded, cleared
   or corrupted data). Progress is then kept in memory for the session
   so the interface still behaves correctly — it simply does not persist.
   ========================================================= */
(function (global) {
  'use strict';

  var KEY = 'rgsc.progress.v1';
  var SCHEMA_VERSION = 1;

  /* ---------- storage adapter ---------------------------------------
     Swap this object to move persistence elsewhere. The service above
     it does not change. ------------------------------------------- */

  function MemoryAdapter(reason) {
    this.name = 'memory';
    this.persistent = false;
    this.reason = reason || 'storage unavailable';
    this._v = null;
  }
  MemoryAdapter.prototype.get = function () { return this._v; };
  MemoryAdapter.prototype.set = function (s) { this._v = s; return true; };
  MemoryAdapter.prototype.clear = function () { this._v = null; };

  function LocalAdapter() {
    this.name = 'localStorage';
    this.persistent = true;
  }
  LocalAdapter.prototype.get = function () {
    try { return global.localStorage.getItem(KEY); } catch (e) { return null; }
  };
  LocalAdapter.prototype.set = function (s) {
    try { global.localStorage.setItem(KEY, s); return true; }
    catch (e) { return false; }          // quota exceeded, or blocked mid-session
  };
  LocalAdapter.prototype.clear = function () {
    try { global.localStorage.removeItem(KEY); } catch (e) { /* nothing to do */ }
  };

  /* Probe by actually writing — merely checking that the object exists is
     not enough, because some privacy modes expose it and throw on write. */
  function selectAdapter() {
    try {
      if (!global.localStorage) return new MemoryAdapter('no localStorage object');
      var probe = KEY + '.probe';
      global.localStorage.setItem(probe, '1');
      global.localStorage.removeItem(probe);
      return new LocalAdapter();
    } catch (e) {
      return new MemoryAdapter('localStorage threw on write: ' + (e && e.name));
    }
  }

  /* ---------- state ------------------------------------------------- */

  function emptyState() {
    return { version: SCHEMA_VERSION, units: {}, quiz: {} };
  }

  /* A corrupted or foreign payload must never throw into the UI.
     It is discarded and replaced with a clean state. */
  function parse(raw) {
    if (!raw) return emptyState();
    var data;
    try { data = JSON.parse(raw); } catch (e) { return emptyState(); }
    if (!data || typeof data !== 'object' || Array.isArray(data)) return emptyState();
    if (data.version !== SCHEMA_VERSION) return emptyState();   // future: migrate
    var s = emptyState();
    if (data.units && typeof data.units === 'object' && !Array.isArray(data.units)) {
      for (var k in data.units) {
        if (!Object.prototype.hasOwnProperty.call(data.units, k)) continue;
        var u = data.units[k];
        if (u && typeof u === 'object' && typeof u.completedAt === 'string') {
          s.units[k] = { completedAt: u.completedAt };
        }
      }
    }
    if (data.quiz && typeof data.quiz === 'object' && !Array.isArray(data.quiz)) {
      for (var q in data.quiz) {
        if (!Object.prototype.hasOwnProperty.call(data.quiz, q)) continue;
        var list = data.quiz[q];
        if (!Array.isArray(list)) continue;
        s.quiz[q] = list.filter(function (a) {
          return a && typeof a === 'object' &&
                 typeof a.score === 'number' && typeof a.total === 'number' &&
                 a.total > 0 && a.score >= 0 && a.score <= a.total;
        }).slice(-20);                    // bound growth; keep the most recent
      }
    }
    return s;
  }

  /* ---------- service ----------------------------------------------- */

  var adapter = selectAdapter();
  var state = parse(adapter.get());
  var degraded = !adapter.persistent;
  var listeners = [];

  function persist() {
    var ok = adapter.set(JSON.stringify(state));
    if (!ok && adapter.persistent) {
      // Ran out of quota or storage was revoked after we probed it.
      // Fall back to memory so the session still works.
      adapter = new MemoryAdapter('write failed after successful probe');
      adapter.set(JSON.stringify(state));
      degraded = true;
    }
    return ok;
  }

  function emit(type, detail) {
    for (var i = 0; i < listeners.length; i++) {
      try { listeners[i]({ type: type, detail: detail }); } catch (e) { /* isolate */ }
    }
  }

  function requireId(v, what) {
    if (typeof v !== 'string' || !v) throw new TypeError('ProgressService: ' + what + ' must be a non-empty string');
    return v;
  }

  var ProgressService = {
    /* Is progress actually being saved? Lets the UI tell the student
       honestly rather than silently pretending. */
    isPersistent: function () { return !degraded; },
    storageInfo:  function () { return { adapter: adapter.name, persistent: !degraded, reason: adapter.reason || null }; },

    markUnitComplete: function (unitId) {
      requireId(unitId, 'unitId');
      state.units[unitId] = { completedAt: new Date().toISOString() };
      persist();
      emit('unit:complete', { unitId: unitId });
      return true;
    },

    markUnitIncomplete: function (unitId) {
      requireId(unitId, 'unitId');
      delete state.units[unitId];
      persist();
      emit('unit:incomplete', { unitId: unitId });
      return true;
    },

    getUnitProgress: function (unitId) {
      requireId(unitId, 'unitId');
      var u = state.units[unitId];
      return { unitId: unitId, complete: !!u, completedAt: u ? u.completedAt : null };
    },

    /* unitIds is supplied by the caller (from the content model) so the
       service never needs to know the curriculum. */
    getSubjectProgress: function (subjectId, unitIds) {
      requireId(subjectId, 'subjectId');
      var ids = Array.isArray(unitIds) ? unitIds : [];
      var done = 0;
      for (var i = 0; i < ids.length; i++) if (state.units[ids[i]]) done++;
      return {
        subjectId: subjectId,
        total: ids.length,
        complete: done,
        percent: ids.length ? Math.round((done / ids.length) * 100) : 0
      };
    },

    recordQuizAttempt: function (quizId, score, total) {
      requireId(quizId, 'quizId');
      if (typeof score !== 'number' || typeof total !== 'number' || total <= 0 ||
          score < 0 || score > total) {
        throw new RangeError('ProgressService: invalid quiz attempt ' + score + '/' + total);
      }
      if (!state.quiz[quizId]) state.quiz[quizId] = [];
      state.quiz[quizId].push({ score: score, total: total, at: new Date().toISOString() });
      if (state.quiz[quizId].length > 20) state.quiz[quizId] = state.quiz[quizId].slice(-20);
      persist();
      emit('quiz:attempt', { quizId: quizId, score: score, total: total });
      return true;
    },

    getQuizHistory: function (quizId) {
      requireId(quizId, 'quizId');
      return (state.quiz[quizId] || []).slice();
    },

    getBestQuizScore: function (quizId) {
      var h = this.getQuizHistory(quizId), best = null;
      for (var i = 0; i < h.length; i++) {
        if (!best || h[i].score / h[i].total > best.score / best.total) best = h[i];
      }
      return best;
    },

    resetProgress: function () {
      state = emptyState();
      adapter.clear();
      persist();
      emit('reset', {});
      return true;
    },

    /* For debugging and for a future "export my data" feature. */
    exportState: function () { return JSON.parse(JSON.stringify(state)); },

    subscribe: function (fn) {
      if (typeof fn !== 'function') throw new TypeError('ProgressService.subscribe expects a function');
      listeners.push(fn);
      return function () {
        var i = listeners.indexOf(fn);
        if (i > -1) listeners.splice(i, 1);
      };
    }
  };

  global.ProgressService = ProgressService;
  if (typeof module !== 'undefined' && module.exports) module.exports = ProgressService;

})(typeof window !== 'undefined' ? window : globalThis);
