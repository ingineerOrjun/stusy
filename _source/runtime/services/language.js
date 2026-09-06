/* =========================================================
   LanguageService — the only thing allowed to know which
   language mode the student is in, or where that is stored.

       UI  ->  LanguageService  ->  storage adapter  ->  localStorage

   THREE MODES, ONE SOURCE OF TRUTH

   Both languages are always present in the DOM. A mode changes what is
   shown, never what exists. Nothing is fetched, re-rendered or
   navigated when the mode changes, which is what makes a switch safe
   halfway through a simulation: a half-finished trace, an answered
   prediction and a part-completed quiz all survive it, because none of
   them is touched.

       bi   English and Nepali together   (default — the product's thesis)
       ne   Nepali-led
       en   English only

   Nepali-led is deliberately not "Nepali only". Exam terminology stays
   in English inside Nepali prose — a student who never meets the word
   "Multiplexer" in Nepali mode is worse off in the exam hall, not
   better. See docs/LANGUAGE-SYSTEM.md.

   FAILURE
   A language preference must never break a lesson. Missing, corrupted,
   unsupported and unavailable storage all resolve to bilingual, and
   the mode still applies for the session when it cannot be persisted.
   ========================================================= */
(function (global) {
  'use strict';

  var KEY = 'rgsc.lang.v1';
  var DEFAULT = 'bi';
  var MODES = ['bi', 'ne', 'en'];

  var LABELS = {
    bi: { short: 'Both',    full: 'Bilingual — English and Nepali' },
    ne: { short: 'नेपाली',   full: 'नेपाली — Nepali led' },
    en: { short: 'English',  full: 'English only' }
  };

  /* ---------- storage adapter ---------------------------------------
     Same shape as ProgressService's, for the same reason: persistence
     can move without the service above it changing. --------------- */

  function MemoryAdapter(reason) {
    this.name = 'memory';
    this.persistent = false;
    this.reason = reason || 'storage unavailable';
    this._v = null;
  }
  MemoryAdapter.prototype.get = function () { return this._v; };
  MemoryAdapter.prototype.set = function (s) { this._v = s; return true; };

  function LocalAdapter() {
    this.name = 'localStorage';
    this.persistent = true;
  }
  LocalAdapter.prototype.get = function () {
    try { return global.localStorage.getItem(KEY); } catch (e) { return null; }
  };
  LocalAdapter.prototype.set = function (s) {
    try { global.localStorage.setItem(KEY, s); return true; } catch (e) { return false; }
  };

  /* Probe by writing. Some privacy modes expose localStorage and throw
     only when it is used. */
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

  var adapter = selectAdapter();
  var listeners = [];
  var current = null;

  function isMode(v) { return MODES.indexOf(v) > -1; }

  /* Anything that is not one of the three modes is treated as absent.
     That covers a missing key, a value from a future version, a value
     from another product on the same origin, and a corrupted string. */
  function read() {
    var raw = adapter.get();
    if (typeof raw !== 'string') return DEFAULT;
    var v = raw.trim();
    return isMode(v) ? v : DEFAULT;
  }

  function applyTo(doc, mode) {
    if (!doc || !doc.documentElement) return;
    doc.documentElement.setAttribute('data-lang', mode);
  }

  var LanguageService = {
    MODES: MODES.slice(),
    DEFAULT: DEFAULT,
    labels: function (mode) { return LABELS[mode] || LABELS[DEFAULT]; },

    /* Where the preference actually ended up, for diagnostics and tests. */
    storage: function () {
      return { name: adapter.name, persistent: adapter.persistent, reason: adapter.reason || null };
    },

    get: function () {
      if (current === null) current = read();
      return current;
    },

    /* Returns the mode actually in force, which is the requested one when
       valid and the default otherwise — so a caller can never leave the
       student in an undefined state by passing rubbish. */
    set: function (mode) {
      var next = isMode(mode) ? mode : DEFAULT;
      var changed = next !== this.get();
      current = next;
      adapter.set(next);                       // may fail; the mode still applies
      applyTo(global.document, next);
      if (changed) notify(next);
      return next;
    },

    /* Called by the page bootstrap. Idempotent. */
    apply: function () {
      var mode = this.get();
      applyTo(global.document, mode);
      return mode;
    },

    /* For JavaScript-rendered strings: give it a bilingual pair, get back
       what this mode should show. Falls back to whichever half exists, so
       content that has not been translated yet degrades to visible
       English rather than to nothing. */
    pick: function (pair) {
      if (!pair) return '';
      if (typeof pair === 'string') return pair;
      var mode = this.get();
      var en = pair.en || '';
      var ne = pair.ne || '';
      if (mode === 'en') return en || ne;
      if (mode === 'ne') return ne || en;
      return en;                               // bilingual renders both halves separately
    },

    shows: function (lang) {
      var mode = this.get();
      if (mode === 'bi') return true;
      return mode === lang;
    },

    onChange: function (fn) {
      if (typeof fn === 'function') listeners.push(fn);
      return function () {
        var i = listeners.indexOf(fn);
        if (i > -1) listeners.splice(i, 1);
      };
    },

    /* test seam */
    _reset: function () { current = null; listeners.length = 0; adapter = selectAdapter(); }
  };

  function notify(mode) {
    for (var i = 0; i < listeners.length; i++) {
      try { listeners[i](mode); }
      catch (e) {
        /* One bad subscriber must not stop the others, and must not
           leave the page in a half-switched state. */
        if (global.console && console.error) console.error('LanguageService listener failed', e);
      }
    }
    if (global.document && typeof global.CustomEvent === 'function') {
      global.document.dispatchEvent(new CustomEvent('languagechange', { detail: { mode: mode } }));
    }
  }

  global.LanguageService = LanguageService;
  if (typeof module !== 'undefined' && module.exports) module.exports = LanguageService;

})(typeof window !== 'undefined' ? window : globalThis);
