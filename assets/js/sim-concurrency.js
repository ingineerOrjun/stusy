/* =========================================================
   CONCURRENCY STEPPER — Unit 6.2, the lost update

   THE MISCONCEPTION
   Students are told "two users at once can corrupt the data" and
   picture something violent — a crash, a garbled row. The truth is much
   harder to accept: **nobody does anything wrong.** Two clerks each
   read a correct balance, each subtract correctly, and each write
   correctly. One withdrawal simply vanishes.

   That is impossible to believe from a sentence, and obvious once you
   have stepped through it and watched the second write overwrite a
   value the first clerk had already changed.

   WHY THIS IS NOT THE REJECTED "CONCURRENCY SIMULATOR"
   The Phase 4 spec rejected a general concurrency simulator as beyond
   the syllabus, and that still holds. This is not one. It plays exactly
   two fixed schedules of the same two transactions — interleaved, and
   then serialised — because 6.2 asks for the lost-update problem by
   name and for what prevents it. There is nothing to configure and no
   scheduling to explore.

   MARKUP CONTRACT

     <div class="conclab" id="cc-lost"></div>

   ========================================================= */
(function (global) {
  'use strict';

  var esc = (global.DbTable && global.DbTable.esc) || function (s){
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };

  /* Each step: who acts, what they do, and how the world changes.
     `local` is what that transaction is holding in memory — the thing a
     student cannot see in a textbook and the whole reason the bug is
     invisible. */
  var SCHEDULES = {
    interleaved: {
      label: { en: 'Both at once — no locking', ne: 'दुवै एकैचोटि — lock छैन' },
      steps: [
        { who: 'T1', act: 'read balance', t1: 5000, bal: 5000,
          en: 'Clerk 1 reads the balance and holds 5000.',
          ne: 'कर्मचारी १ ले मौज्दात पढे — ५००० सम्हालेका छन्।' },
        { who: 'T2', act: 'read balance', t2: 5000, bal: 5000,
          en: 'Clerk 2 reads the SAME balance and also holds 5000. Neither has changed anything yet.',
          ne: 'कर्मचारी २ ले पनि उही मौज्दात पढे — उनी पनि ५००० सम्हालेका छन्। अझै कसैले केही बदलेको छैन।' },
        { who: 'T1', act: 'subtract 1000', t1: 4000, bal: 5000,
          en: 'Clerk 1 works out 5000 − 1000 = 4000. Correct arithmetic, in their own memory.',
          ne: 'कर्मचारी १ ले ५००० − १००० = ४००० निकाले। आफ्नै मेमोरीमा, सही गणित।' },
        { who: 'T2', act: 'subtract 2000', t2: 3000, bal: 5000,
          en: 'Clerk 2 works out 5000 − 2000 = 3000. Also correct — from the value they read, which is now stale.',
          ne: 'कर्मचारी २ ले ५००० − २००० = ३००० निकाले। यो पनि सही — तर उनले पढेको मान अब पुरानो भइसक्यो।' },
        { who: 'T1', act: 'write 4000', t1: 4000, bal: 4000, wrote: 'T1',
          en: 'Clerk 1 writes 4000. The database is correct at this instant.',
          ne: 'कर्मचारी १ ले ४००० लेखे। यही क्षणसम्म डाटाबेस सही छ।' },
        { who: 'T2', act: 'write 3000', t2: 3000, bal: 3000, wrote: 'T2', lost: true,
          en: 'Clerk 2 writes 3000, on top of it. The first withdrawal of 1000 has vanished — the balance should be 2000.',
          ne: 'कर्मचारी २ ले त्यसमाथि ३००० लेखे। पहिलो १००० को निकासी हरायो — मौज्दात २००० हुनुपर्थ्यो।' }
      ]
    },
    locked: {
      label: { en: 'One at a time — with locking', ne: 'एक–एक गरी — lock सहित' },
      steps: [
        { who: 'T1', act: 'lock + read', t1: 5000, bal: 5000,
          en: 'Clerk 1 locks the row and reads 5000. Clerk 2 must now wait.',
          ne: 'कर्मचारी १ ले पङ्क्ति lock गरेर ५००० पढे। कर्मचारी २ अब पर्खनुपर्छ।' },
        { who: 'T1', act: 'subtract 1000', t1: 4000, bal: 5000,
          en: 'Clerk 1 works out 4000, still holding the lock.',
          ne: 'कर्मचारी १ ले ४००० निकाले, lock अझै आफैंसँग।' },
        { who: 'T1', act: 'write + unlock', t1: 4000, bal: 4000, wrote: 'T1',
          en: 'Clerk 1 writes 4000 and releases the lock. Only now can clerk 2 proceed.',
          ne: 'कर्मचारी १ ले ४००० लेखेर lock छोडे। अब मात्र कर्मचारी २ अघि बढ्न पाउँछन्।' },
        { who: 'T2', act: 'lock + read', t2: 4000, bal: 4000,
          en: 'Clerk 2 reads 4000 — the CURRENT value, not the stale one.',
          ne: 'कर्मचारी २ ले ४००० पढे — अहिलेको मान, पुरानो होइन।' },
        { who: 'T2', act: 'subtract 2000', t2: 2000, bal: 4000,
          en: 'Clerk 2 works out 4000 − 2000 = 2000.',
          ne: 'कर्मचारी २ ले ४००० − २००० = २००० निकाले।' },
        { who: 'T2', act: 'write + unlock', t2: 2000, bal: 2000, wrote: 'T2',
          en: 'Clerk 2 writes 2000. Both withdrawals are recorded. This is what isolation buys.',
          ne: 'कर्मचारी २ ले २००० लेखे। दुवै निकासी दर्ता भए। Isolation ले दिने कुरा यही हो।' }
      ]
    }
  };

  function ConcLab(root){
    this.root = root;
    this.mode = 'interleaved';
    this.step = 0;
    this.render();
  }

  ConcLab.prototype.sched = function (){ return SCHEDULES[this.mode]; };

  ConcLab.prototype.render = function (){
    var self = this, s = this.sched(), h = '';
    var shown = s.steps.slice(0, this.step);
    var last = shown.length ? shown[shown.length - 1] : null;

    /* which schedule */
    h += '<div class="cc-modes" role="group" aria-label="Choose a schedule">';
    h += Object.keys(SCHEDULES).map(function (k){
      return '<button type="button" class="cc-mode' + (self.mode === k ? ' primary' : '') +
             '" data-cc-mode="' + k + '" aria-pressed="' + (self.mode === k) + '">' +
             '<span class="t-en">' + esc(SCHEDULES[k].label.en) + '</span>' +
             '<span class="t-ne">' + esc(SCHEDULES[k].label.ne) + '</span></button>';
    }).join('');
    h += '</div>';

    /* the three values that matter: what each clerk holds, and the truth */
    var t1 = last && last.t1 !== undefined ? last.t1 : null;
    var t2 = last && last.t2 !== undefined ? last.t2 : null;
    /* carry values forward — a clerk keeps holding what they last worked out */
    for (var i = shown.length - 1; i >= 0; i--){
      if (t1 === null && shown[i].t1 !== undefined) t1 = shown[i].t1;
      if (t2 === null && shown[i].t2 !== undefined) t2 = shown[i].t2;
    }
    var bal = last ? last.bal : 5000;

    h += '<div class="cc-state">' +
         cell('T1', 'Clerk 1 holds', 'कर्मचारी १ सँग', t1, last && last.who === 'T1') +
         cell('DB', 'Balance in the database', 'डाटाबेसको मौज्दात', bal, !!(last && last.wrote)) +
         cell('T2', 'Clerk 2 holds', 'कर्मचारी २ सँग', t2, last && last.who === 'T2') +
         '</div>';

    /* the schedule itself */
    h += '<ol class="cc-steps">';
    for (var k = 0; k < s.steps.length; k++){
      var st = s.steps[k], done = k < this.step, now = k === this.step - 1;
      h += '<li class="cc-step' + (done ? ' is-done' : '') + (now ? ' is-now' : '') +
           (st.lost ? ' is-lost' : '') + '">' +
           '<span class="cc-who cc-' + st.who.toLowerCase() + '">' + st.who + '</span>' +
           '<span class="cc-act">' + esc(st.act) + '</span></li>';
    }
    h += '</ol>';

    h += '<div class="sim-controls">' +
         '<button type="button" class="primary" data-cc-act="next" data-ui="next"' +
           (this.step >= s.steps.length ? ' disabled' : '') + '>Next &#9656;</button>' +
         '<button type="button" class="coral" data-cc-act="reset" data-ui="reset">Reset</button>' +
         '<span class="cc-progress" aria-live="polite">step ' + this.step + ' / ' + s.steps.length + '</span>' +
         '</div>';

    h += '<div class="cc-say" role="status">' +
         (last ? '<span class="t-en">' + esc(last.en) + '</span>' +
                 '<span class="np-cell" lang="ne">' + esc(last.ne) + '</span>'
               : '<span class="t-en">Press Next and watch the three values. Nobody makes a mistake.</span>' +
                 '<span class="np-cell" lang="ne">Next थिच्दै तीन मान हेर्नुहोस्। कसैले गल्ती गर्दैन।</span>') +
         '</div>';

    if (this.step >= s.steps.length){
      var lost = this.mode === 'interleaved';
      h += '<div class="cc-out' + (lost ? ' is-lost' : ' is-ok') + '">' +
           '<span class="t-en">' + (lost
             ? 'Final balance 3000. It should be 2000 — the LOST UPDATE problem. Neither clerk did anything wrong; the fault is that their steps interleaved.'
             : 'Final balance 2000. Both withdrawals survived, because the lock made the two transactions run one after the other.') + '</span>' +
           '<span class="np-cell" lang="ne">' + (lost
             ? 'अन्तिम मौज्दात ३०००। २००० हुनुपर्थ्यो — यही LOST UPDATE समस्या हो। कसैले गल्ती गरेनन्; दोष चरणहरू मिसिनुमा छ।'
             : 'अन्तिम मौज्दात २०००। दुवै निकासी बाँचे, किनभने lock ले दुई ट्रान्ज्याक्सनलाई एकपछि अर्को चलायो।') + '</span>' +
           '</div>';
    }

    this.root.innerHTML = h;
    if (global.UIStrings && global.UIStrings.apply) global.UIStrings.apply(this.root);
    this.wire();

    function cell(id, en, ne, v, active){
      return '<div class="cc-cell cc-cell-' + id.toLowerCase() + (active ? ' is-active' : '') + '">' +
             '<span class="cc-cell-h"><span class="t-en">' + en + '</span>' +
             '<span class="np-cell" lang="ne">' + ne + '</span></span>' +
             '<span class="cc-val">' + (v === null || v === undefined ? '—' : v) + '</span></div>';
    }
  };

  ConcLab.prototype.wire = function (){
    var self = this, i;
    var modes = this.root.querySelectorAll('[data-cc-mode]');
    for (i = 0; i < modes.length; i++){
      modes[i].addEventListener('click', function (){
        self.mode = this.getAttribute('data-cc-mode');
        self.step = 0;
        self.render();
        var again = self.root.querySelector('[data-cc-mode="' + self.mode + '"]');
        if (again) again.focus();
      });
    }
    var nx = this.root.querySelector('[data-cc-act="next"]');
    if (nx) nx.addEventListener('click', function (){
      if (self.step < self.sched().steps.length){ self.step++; self.render();
        var b = self.root.querySelector('[data-cc-act="next"]');
        if (b && !b.disabled) b.focus();
      }
    });
    var rs = this.root.querySelector('[data-cc-act="reset"]');
    if (rs) rs.addEventListener('click', function (){ self.step = 0; self.render(); });
  };

  ConcLab.prototype.reset = function (){ this.step = 0; this.mode = 'interleaved'; this.render(); };

  function mountAll(){
    if (typeof document === 'undefined') return;
    var nodes = document.querySelectorAll('.conclab');
    for (var i = 0; i < nodes.length; i++){
      (function (root, n){
        if (root.getAttribute('data-mounted')) return;
        root.setAttribute('data-mounted', '1');
        var lab = new ConcLab(root);
        root._lab = lab;
        if (global.SimulationService){
          global.SimulationService.register({
            id: 'conc:' + (root.id || ('conclab' + n)),
            subject: 'grade10/dbms', unit: 'u6',
            title: { en: 'Concurrency stepper', ne: 'Concurrency स्टेपर' },
            mounts: function (){ return !!root.parentNode; },
            reset: function (){ lab.reset(); },
            controls: [
              { id: 'next',  label: { en: 'Next step', ne: 'अर्को चरण' } },
              { id: 'mode',  label: { en: 'Change the schedule', ne: 'तालिका बदल्नुहोस्' } }
            ]
          });
        }
      })(nodes[i], i);
    }
  }

  function ready(fn){
    if (typeof document === 'undefined') return;
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }
  ready(mountAll);

  global.ConcLab = { SCHEDULES: SCHEDULES, mount: mountAll, Lab: ConcLab };
  if (typeof module !== 'undefined' && module.exports) module.exports = global.ConcLab;

})(typeof window !== 'undefined' ? window : globalThis);
