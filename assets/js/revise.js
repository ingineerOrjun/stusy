/* =========================================================
   THE REVISION VIEW — what a student sees when they ask
   "what should I go back to?"

   WHY THIS PAGE EXISTS
   Phase 6 started recording a self-grade for every practice question and
   showed the student nothing. A record nobody can read is not a feature;
   it is a cost. This is the other half.

   THE ONE RULE THE TONE FOLLOWS
   Nothing here tells a student what they are. Every line describes a
   RECORD and names an action:

       not      "Needs another look"      →  Review the unit
       partly   "Almost there"            →  Practise it again
       got×1    "Right first time"        →  (nothing; leave it alone)
       got×2+   "Held after a miss"       →  (nothing; this is the goal)

   "Needs another look" is a fact about a question. "You don't know this"
   is a claim about a person, and a student who reads it is being taught
   something other than DBMS.

   WHY THE PREREQUISITE IS OFFERED ON A WEAK UNIT
   When a student keeps missing Normalisation, the problem is often not
   Normalisation — it is the key vocabulary from Unit 3 that Normalisation
   is defined in terms of. So a unit that needs review offers both doors:
   the unit itself, and the thing it assumes you already know. The reason
   text comes with it, so the second door is a diagnosis rather than a
   guess.

   WHAT IT DOES NOT DO
   No streaks, no points, no badges, no celebration. The strongest thing
   it says is that a question was held after an earlier miss, because
   that is the strongest thing the record actually knows.
   ========================================================= */
(function (global) {
  'use strict';

  var doc = global.document;
  if (!doc) return;

  function ui(key, fallback){
    return (typeof global.UIStrings !== 'undefined' && global.UIStrings.get)
      ? global.UIStrings.get(key) : fallback;
  }

  function esc(s){
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function pair(p){
    if (!p) return '';
    var en = String(p.en || ''), ne = String(p.ne || '');
    if (!ne || ne.trim() === en.trim()) return esc(en);
    return '<span class="t-en">' + esc(en) + '</span>' +
           '<span class="np-cell" lang="ne">' + esc(ne) + '</span>';
  }

  /* Every state's wording, in one place, so the tone can be reviewed as
     language rather than hunted through a render function. */
  var STATE = {
    NEW:          { key: 'stateNew',        en: 'Not started',      tone: 'new'   },
    LEARNING:     { key: 'stateLearning',   en: 'Started',          tone: 'learn' },
    PRACTICING:   { key: 'statePracticing', en: 'Practising',       tone: 'learn' },
    NEEDS_REVIEW: { key: 'stateNeedsReview', en: 'Needs another look', tone: 'review' },
    MASTERED:     { key: 'stateMastered',   en: 'Held',             tone: 'held'  }
  };

  /* A page lives at grade10/dbms/revise.html and links to
     grade10/dbms/unit5.html, so the href is the target's last segment
     for a same-folder unit and a computed climb otherwise. Written
     generically because a cross-subject prerequisite is allowed by the
     model even though none exists yet. */
  function hrefTo(fromPage, toPage){
    var f = String(fromPage || '').split('/'); f.pop();
    var t = String(toPage || '').split('/');
    var i = 0;
    while (i < f.length && f[i] === t[i]) i++;
    var up = '';
    for (var k = i; k < f.length; k++) up += '../';
    return up + t.slice(i).join('/');
  }

  function progressBar(done, total, label){
    var pct = total ? Math.round(done / total * 100) : 0;
    return '<div class="rv-bar" role="img" aria-label="' + esc(label) + '">' +
           '<span class="rv-bar-fill" style="width:' + pct + '%"></span></div>';
  }

  function render(box, subject, here){
    var R = global.RevisionService;
    if (!R || !R.isLoaded()){
      box.innerHTML = '<p class="rv-empty">' +
        pair({ en: 'The revision map did not load, so this page cannot show your progress. ' +
                   'Your answers are still saved.',
               ne: 'दोहोर्‍याइको नक्सा लोड भएन, त्यसैले यहाँ प्रगति देखाउन सकिँदैन। ' +
                   'तपाईंका उत्तर भने सुरक्षित छन्।' }) + '</p>';
      return;
    }

    var rep = R.subjectReport(subject);
    var recs = R.recommendations().filter(function (r){
      return R.unit(r.unit) && R.unit(r.unit).subject === subject;
    });

    var head = doc.getElementById('rvHeadCount');
    if (head) head.textContent = rep.attempted + ' / ' + rep.total;

    var h = '';

    /* ---- nothing yet ---- */
    if (rep.attempted === 0){
      h += '<div class="rv-empty-box">';
      h += '<p class="rv-empty">' + pair({
        en: 'You have not answered any practice questions on this subject yet. Open any unit, ' +
            'scroll to a practice question, write your answer, and say how you did — this page ' +
            'fills itself from there.',
        ne: 'यस विषयमा तपाईंले अझै कुनै अभ्यास प्रश्न उत्तर दिनुभएको छैन। कुनै युनिट खोलेर ' +
            'अभ्यास प्रश्नसम्म जानुहोस्, उत्तर लेख्नुहोस्, र कस्तो भयो भन्नुहोस् — यो पृष्ठ ' +
            'त्यहीँबाट भरिन्छ।' }) + '</p>';
      h += '<ul class="rv-units">';
      rep.units.forEach(function (u){ h += unitRow(u, here, false); });
      h += '</ul></div>';
      box.innerHTML = h;
      return;
    }

    /* ---- the summary ---- */
    var totals = { NEEDS_REVIEW: 0, SHAKY: 0, FRESH: 0, SECURE: 0 };
    rep.units.forEach(function (u){
      totals.NEEDS_REVIEW += u.counts.NEEDS_REVIEW;
      totals.SHAKY        += u.counts.SHAKY;
      totals.FRESH        += u.counts.FRESH;
      totals.SECURE       += u.counts.SECURE;
    });

    h += '<div class="rv-summary">';
    h += '<p class="rv-sum-line">' + pair({
      en: 'You have answered ' + rep.attempted + ' of ' + rep.total +
          ' practice questions in this subject.',
      ne: 'यस विषयका ' + rep.total + ' मध्ये ' + rep.attempted +
          ' अभ्यास प्रश्न उत्तर दिनुभयो।' }) + '</p>';
    h += progressBar(rep.attempted, rep.total,
                     rep.attempted + ' of ' + rep.total + ' practice questions answered');
    h += '<ul class="rv-tally">';
    h += tally('review', totals.NEEDS_REVIEW, 'tallyReview', 'Needs another look');
    h += tally('shaky',  totals.SHAKY,        'tallyShaky',  'Almost there');
    h += tally('fresh',  totals.FRESH,        'tallyFresh',  'Right first time');
    h += tally('held',   totals.SECURE,       'tallyHeld',   'Held after a miss');
    h += '</ul></div>';

    /* ---- what to do next ---- */
    if (recs.length){
      h += '<h3 class="rv-h">' + pair({ en: 'Start here', ne: 'यहाँबाट सुरु गर्नुहोस्' }) + '</h3>';
      h += '<ul class="rv-recs">';
      recs.slice(0, 3).forEach(function (r){ h += recRow(r, here); });
      h += '</ul>';
    } else {
      h += '<p class="rv-allclear">' + pair({
        en: 'Nothing is waiting for a second look. Every question you have answered is either ' +
            'right or already revised.',
        ne: 'फेरि हेर्नुपर्ने केही छैन। तपाईंले उत्तर दिनुभएका सबै प्रश्न या त ठिक छन् या ' +
            'दोहोर्‍याइसकिएका छन्।' }) + '</p>';
    }

    /* ---- every unit ---- */
    h += '<h3 class="rv-h">' + pair({ en: 'Every unit', ne: 'सबै युनिट' }) + '</h3>';
    h += '<ul class="rv-units">';
    rep.units.forEach(function (u){ h += unitRow(u, here, true); });
    h += '</ul>';

    box.innerHTML = h;
    if (typeof global.UIStrings !== 'undefined' && global.UIStrings.apply){
      global.UIStrings.apply(box);
    }
  }

  function tally(tone, n, key, fallback){
    if (!n) return '';
    return '<li class="rv-t rv-t-' + tone + '"><b>' + n + '</b> ' +
           '<span data-ui="' + key + '">' + esc(fallback) + '</span></li>';
  }

  function unitRow(u, here, showCounts){
    var st = STATE[u.state] || STATE.NEW;
    var h = '<li class="rv-unit rv-' + st.tone + '">';
    h += '<a class="rv-unit-link" href="' + esc(hrefTo(here, u.page)) + '">' +
         '<span class="rv-unit-t">' + pair(u.title) + '</span></a>';
    h += '<span class="rv-state" data-ui="' + st.key + '">' + esc(st.en) + '</span>';
    if (showCounts && u.total){
      h += '<span class="rv-count">' + u.attempted + ' / ' + u.total + '</span>';
    }
    h += '</li>';
    return h;
  }

  function recRow(r, here){
    var R = global.RevisionService;
    var h = '<li class="rv-rec rv-rec-' + (r.worst === 'NEEDS_REVIEW' ? 'review' : 'shaky') + '">';
    h += '<p class="rv-rec-t">' + pair(r.title) + '</p>';

    /* Why it is being suggested — a count, not a verdict. */
    var why = r.needsReview
      ? { en: r.needsReview + (r.needsReview === 1 ? ' question' : ' questions') +
              ' here still needs another look.',
          ne: 'यहाँ ' + r.needsReview + ' प्रश्न अझै फेरि हेर्नुपर्ने छ।' }
      : { en: r.shaky + (r.shaky === 1 ? ' question' : ' questions') +
              ' here came out only partly right.',
          ne: 'यहाँ ' + r.shaky + ' प्रश्न आंशिक मात्र ठिक भयो।' };
    h += '<p class="rv-rec-why">' + pair(why) + '</p>';

    h += '<div class="rv-actions">';
    h += '<a class="rv-act rv-act-main" href="' + esc(hrefTo(here, r.page)) + '" ' +
         'data-ui="actReview">Review the unit</a>';

    /* The second door. Offered only when the unit has a prerequisite,
       and carrying the reason with it. */
    if (r.prereqs && r.prereqs.length){
      var p = r.prereqs[0];
      var to = R.unit(p.unit);
      if (to){
        h += '<a class="rv-act" href="' + esc(hrefTo(here, to.page)) + '" ' +
             'data-ui="actPrereq">Revise what it builds on</a>';
        h += '</div>';
        h += '<p class="rv-rec-prereq"><b>' + pair(to.title) + '</b> — ' + pair(p.why) + '</p>';
        return h + '</li>';
      }
    }
    h += '</div></li>';
    return h;
  }

  function mount(){
    var box = doc.getElementById('reviseBox');
    if (!box) return;
    var main = doc.querySelector('main[data-subject]');
    var subject = main ? main.getAttribute('data-subject') : null;
    if (!subject){
      box.innerHTML = '<p class="rv-empty">This page does not say which subject it belongs to.</p>';
      return;
    }
    var here = subject + '/revise.html';
    render(box, subject, here);

    /* A student can switch language while reading this page, and the
       counts are built into sentences rather than into [data-ui] labels,
       so the whole view is rebuilt. Nothing is lost: it holds no input. */
    doc.addEventListener('languagechange', function (){ render(box, subject, here); });
    /* And if they grade a question in another tab, the record changes
       under this one. */
    if (global.ProgressService && global.ProgressService.subscribe){
      global.ProgressService.subscribe(function (){ render(box, subject, here); });
    }
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', mount);
  else mount();

  global.ReviseView = { mount: mount, _hrefTo: hrefTo };

})(typeof window !== 'undefined' ? window : this);
