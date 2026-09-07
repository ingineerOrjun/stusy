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

    /* THE WORKED-EXAMPLE THINK GATE.
       "Show the working" and not "Show the answer": what is behind this
       gate is the method, and the method is what the marks are for. A
       student who has already worked the answer out still has a reason
       to open it — to check their route, not just their result. */
    showWorking:  { en: 'Show the working', ne: 'काम गरेको देखाउनुहोस्' },
    hideWorking:  { en: 'Hide the working', ne: 'काम गरेको लुकाउनुहोस्' },
    thinkAttempt: { en: 'Jot your answer down first — it is not saved',
                    ne: 'पहिले आफ्नो जवाफ लेख्नुहोस् — यो सुरक्षित गरिँदैन' },

    /* GUIDED PRACTICE — the level is named in words, so a student knows
       help is being withdrawn on purpose rather than wondering where it
       went. */
    levelWorked:      { en: 'Worked for you',        ne: 'तपाईंका लागि गरिएको' },
    levelPartial:     { en: 'Some steps hidden',     ne: 'केही चरण लुकाइएका' },
    levelGuided:      { en: 'Your turn, with prompts', ne: 'तपाईंको पालो, सङ्केतसहित' },
    levelIndependent: { en: 'On your own',           ne: 'आफैंले' },
    levelTransfer:    { en: 'Somewhere new',         ne: 'नयाँ ठाउँमा' },
    checkStep:        { en: 'Check',                 ne: 'जाँच्नुहोस्' },
    checkAnswer:      { en: 'Check the answer',      ne: 'उत्तर जाँच्नुहोस्' },
    nextProblem:      { en: 'Next problem ▸',        ne: 'अर्को प्रश्न ▸' },
    prevProblem:      { en: '◂ Previous',            ne: '◂ अघिल्लो' },
    right:            { en: 'Right.',                ne: 'ठिक।' },
    notRight:         { en: 'Not that.',             ne: 'त्यो होइन।' },

    /* REVISION — every one of these describes a RECORD, never a student.
       "Needs another look" is a fact about a question; "you don't know
       this" is a claim about a person, and a student who reads the second
       is being taught something other than the subject. */
    stateNew:         { en: 'Not started',        ne: 'सुरु भएको छैन' },
    stateLearning:    { en: 'Started',            ne: 'सुरु भयो' },
    statePracticing:  { en: 'Practising',         ne: 'अभ्यास हुँदैछ' },
    stateNeedsReview: { en: 'Needs another look', ne: 'फेरि हेर्नुपर्ने' },
    stateMastered:    { en: 'Held',               ne: 'पक्का भयो' },
    tallyReview:      { en: 'need another look',  ne: 'फेरि हेर्नुपर्ने' },
    tallyShaky:       { en: 'almost there',       ne: 'लगभग पुग्यो' },
    tallyFresh:       { en: 'right first time',   ne: 'पहिलो पटकमै ठिक' },
    tallyHeld:        { en: 'held after a miss',  ne: 'छुटेपछि पक्का भयो' },
    actReview:        { en: 'Review the unit',    ne: 'युनिट फेरि हेर्नुहोस्' },
    actPrereq:        { en: 'Revise what it builds on', ne: 'आधार बनेको कुरा दोहोर्‍याउनुहोस्' },
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

    /* WRITE TEXT AND SAY WHAT LANGUAGE IT IS IN.
       apply() handles controls marked with data-ui, but a component that
       COMPOSES a label — "चरण 3 / 4", a play/pause toggle, a gate that
       changes its own wording — writes textContent itself and skips all
       of that. Six such labels were still inheriting lang="en" in Nepali
       mode after apply() was fixed.

       This is the primitive those components should use instead. The
       language is decided by the mode rather than by inspecting the
       string, because that is what is actually true: in Nepali mode a
       label built from this table is Nepali, digits and all. */
    write: function (el, text){
      if (!el) return;
      el.textContent = text;
      if (mode() === 'ne') el.setAttribute('lang', 'ne');
      else if (el.removeAttribute) el.removeAttribute('lang');
    },

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
        /* DECLARE THE LANGUAGE THIS LABEL IS ACTUALLY IN.
           The document is lang="en". Every Nepali label written here —
           रिसेट, अर्को ▸, चरण 0 / 4 — inherited that and was handed to an
           English synthesiser. Phase 5 fixed 82 such runs in the CONTENT
           and never reached the controls, because a control's Nepali is
           not in the markup: it arrives from this table at runtime.

           Measured in Nepali mode: 12 control labels on one page. Set
           here rather than at every call site, so a component marks a
           control with data-ui and still does not have to think about
           it — which is the whole contract of this module. */
        var lang = mode();
        if (lang === 'ne') els[i].setAttribute('lang', 'ne');
        else els[i].removeAttribute('lang');
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
