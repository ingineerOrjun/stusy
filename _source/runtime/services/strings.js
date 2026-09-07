/* =========================================================
   UIStrings — the language contract for CONTROLS.

   Lesson content, quiz content and diagram captions are bilingual by
   construction: both languages sit in the DOM and language.css chooses.
   Control labels cannot work that way. "Next  अर्को" on a 60px button is
   clutter, and the bilingual mode's whole point is that it must not be
   cluttered. So a control shows ONE label, chosen here.

   THE CONTRACT — a component marks a control and stops thinking about it:

       <button data-ui="next">Next ▸</button>

   The literal text is the English fallback, so the control is still
   correct if this module never loads. On load and on every language
   change, apply() rewrites the label from the table below.

   WHY textContent AND NOT A RE-RENDER
   Re-rendering a component to change its language throws away whatever
   the student was doing. This only ever writes the label of an element
   that already exists, so a running simulation, a part-finished K-map
   grouping and an answered prediction all survive a language switch.
   That property is asserted by a test.

   WHICH LANGUAGE EACH MODE GETS

       bilingual   English  — short, and it is the exam's language
       नेपाली       Nepali
       English     English

   Bilingual showing English rather than both is a deliberate exception
   to the product's simultaneous-presentation rule, and it applies to
   controls only. See docs/LANGUAGE-SYSTEM.md §7.

   ADDING A STRING
   Add it here with both languages. A key with no Nepali fails the build.
   ========================================================= */
(function (global) {
  'use strict';

  /* Keys are behaviour, not wording: "next" not "next-step-button", so
     two components asking for the same idea get the same word. */
  var TABLE = {
    /* stepping through anything */
    prev:        { en: '◂ Prev',   ne: '◂ अघिल्लो' },
    next:        { en: 'Next ▸',   ne: 'अर्को ▸' },
    play:        { en: '▶ Play',   ne: '▶ चलाउनुहोस्' },
    pause:       { en: '⏸ Pause',  ne: '⏸ रोक्नुहोस्' },
    reset:       { en: 'Reset',         ne: 'रिसेट' },
    run:         { en: 'Run the query', ne: 'क्वेरी चलाउनुहोस्' },
    restart:     { en: 'Start again',   ne: 'फेरि सुरु' },

    /* answering */
    showAnswer:  { en: 'Show the answer', ne: 'उत्तर हेर्नुहोस्' },
    hideAnswer:  { en: 'Hide the answer', ne: 'उत्तर लुकाउनुहोस्' },

    /* RETRIEVAL — the gate, and the self-assessment after it.
       "I have attempted it" is longer than "Show the answer" on purpose:
       the label is the gate. A student who reads it and presses anyway
       has at least been asked, and the wording is what does the asking. */
    revealAfterAttempt: { en: 'I have attempted it — show the answer',
                          ne: 'मैले प्रयास गरेँ — उत्तर देखाउनुहोस्' },
    attemptLabel:       { en: 'Write your answer first — it is not saved',
                          ne: 'पहिले आफ्नो उत्तर लेख्नुहोस् — यो सुरक्षित गरिँदैन' },
    gotIt:              { en: 'Got it',   ne: 'आयो' },
    partly:             { en: 'Partly',   ne: 'आंशिक' },
    notYet:             { en: 'Not yet',  ne: 'अझै आएन' },
    tryAgain:    { en: 'Try again',       ne: 'फेरि प्रयास गर्नुहोस्' },
    check:       { en: 'Check this group', ne: 'यो समूह जाँच्नुहोस्' },
    clear:       { en: 'Clear selection',  ne: 'छनोट हटाउनुहोस्' },

    /* K-map modes */
    modeSet:     { en: 'Mode: set 1s',      ne: 'मोड: 1 राख्ने' },
    modeSelect:  { en: 'Mode: select group', ne: 'मोड: समूह छान्ने' },

    /* announced to assistive technology, never displayed */
    queryResult: { en: 'Query result and the stages that produced it',
                   ne: 'क्वेरीको नतिजा र त्यो बनाउने चरणहरू' },
    simOutput:   { en: 'Simulation output', ne: 'सिमुलेसनको आउटपुट' },
    stepOf:      { en: 'step',              ne: 'चरण' }
  };

  function mode(){
    if (typeof LanguageService === 'undefined') return 'en';
    var m = LanguageService.get();
    /* Bilingual takes the English label — see the header. */
    return m === 'ne' ? 'ne' : 'en';
  }

  var UIStrings = {
    KEYS: Object.keys(TABLE),

    /* The string for a key in the current mode. Falls back to English if
       a key is somehow missing a Nepali half, and returns the key itself
       rather than empty if the key is unknown — a visible wrong label is
       easier to spot and fix than a blank control. */
    get: function (key){
      var e = TABLE[key];
      if (!e) return key;
      return (mode() === 'ne' && e.ne) ? e.ne : e.en;
    },

    has: function (key){ return Object.prototype.hasOwnProperty.call(TABLE, key); },

    /* Label every [data-ui] element under `root`. Idempotent. */
    apply: function (root){
      var scope = root || (typeof document !== 'undefined' ? document : null);
      if (!scope || !scope.querySelectorAll) return 0;
      var els = scope.querySelectorAll('[data-ui]');
      for (var i = 0; i < els.length; i++){
        var key = els[i].getAttribute('data-ui');
        if (!this.has(key)) continue;
        /* aria-label carries the accessible name where the visible text
           is a symbol or where there is no visible text at all. */
        if (els[i].hasAttribute('data-ui-aria')) els[i].setAttribute('aria-label', this.get(key));
        else els[i].textContent = this.get(key);
      }
      return els.length;
    },

    /* Exposed for the table's own tests and for the build validator. */
    _table: TABLE
  };

  function ready(fn){
    if (typeof document === 'undefined') return;
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  ready(function (){
    UIStrings.apply(document);
    if (typeof LanguageService !== 'undefined'){
      /* Relabel in place. Nothing is rebuilt, so nothing is lost. */
      LanguageService.onChange(function (){ UIStrings.apply(document); });
    }
  });

  global.UIStrings = UIStrings;
  if (typeof module !== 'undefined' && module.exports) module.exports = UIStrings;

})(typeof window !== 'undefined' ? window : globalThis);
