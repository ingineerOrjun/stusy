/* ============================================================
   TEACHER-DIRECTED REVISION FOCUS

   WHAT THIS FILE IS FOR

   When a student scores badly, the quiz tells them where to go back to.
   There are two different answers to that question and they must not be
   confused:

     EXAMINATION PRIORITY   which units carry the most marks
                            Derived, not authored — build/context.js
                            computes it from config/pages.js. It is a
                            fact about the paper.

     TEACHER-DIRECTED       which units a student actually struggles with
                            A judgement. It lives HERE, and only here,
                            because nothing in this repository can derive
                            it and no amount of data will.

   WHY THE TWO ARE KEPT APART

   They answer different questions and they disagree. Grade 10 OOP Unit 3,
   Class and Object, carries 2 of that subject's 50 external marks — its
   lightest unit — and is, by most accounts, one a beginner stumbles on.
   Examination weight would never name it; a teacher might. Presenting
   either as the other tells a student something false: that a heavy unit
   is hard, or that a light unit is easy.

   WHY THIS FILE IS EMPTY

   The shared quiz engine carried `Re-read Units 3, 5 and 6` from 2026-09
   until Phase 12.3. It came from the legacy single-file prototype, in a
   commit called "Fix styling and update text", with **no recorded
   rationale anywhere** — no design note, no commit message, no teacher
   named. Phase 12.4 searched the repository and the history for one and
   found none.

   So it is not reinstated. A recommendation whose only provenance is
   that it used to be on the screen is not a teacher's judgement; it is a
   string. An empty file here is the honest state, and the quiz falls
   back to examination priority, clearly labelled as examination priority.

   HOW TO ADD ONE

   A subject's entry names units that exist, and says who decided and
   why. The `why` is not decoration: it is the thing whose absence
   emptied this file, and validate.js requires it.

       'grade10/oop-cpp': {
         source: 'R. Shrestha, HOD Computer, <school> — 2026-11-14',
         units: [
           { n: '3', why: 'Objects and classes are where beginners stall;
                           the marks are low and the dependency is total —
                           Units 4, 5 and 6 all assume it.' }
         ]
       }

   Unit titles are NOT written here. They are read from config/pages.js so
   that renaming a unit cannot leave this file quoting the old name in one
   language and the new one in the other.
   ============================================================ */

module.exports = {
  /* Intentionally empty. See the header: no verified teacher-directed
     revision recommendation exists for any subject yet. Adding a key
     here switches that subject's quiz from examination priority to the
     teacher's list, labelled as such. */
};
