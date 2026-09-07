/* ============================================================
   LEARNING-QUALITY AUDIT — per unit, per concept

   WHAT THIS COUNTS AND WHY THE COUNTS ARE NOT THE POINT
   Phase 4.5 established that "more content = better" is false. So this
   does not rank units by word count or by how many components they
   carry. It reports the SHAPE of each unit against the learning
   contract, so a gap is visible as a gap rather than as a low score:

     a unit with 9 worked examples and no retrieval is not 90% done
     a unit with 2 worked examples and 3 retrievals may be finished

   THE ONE THING IT DOES JUDGE
   Whether a student can reach an answer without attempting it. A block
   whose answer is behind a "Show the answer" button is a REVEAL. A
   block that takes a commitment first is a RETRIEVAL. They look almost
   identical in markup and do opposite things to memory, and the
   difference is the single largest lever in this codebase.

   RUN
     node tests/manual/learning-audit.js          human readable
     node tests/manual/learning-audit.js --json   machine readable
   ============================================================ */
'use strict';

const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const LESSONS = path.join(ROOT, '_source', 'content', 'lessons');

/* Which file belongs to which subject and unit. */
function subjectOf(file){
  if (file.startsWith('dd-')) return 'Digital Design & Microprocessor';
  if (file.startsWith('db-')) return 'Database Management System';
  return 'DS & OOP with C++';
}

const DEVA = /[ऀ-ॿ]/;

/* Count elements carrying EXACTLY this class token.
   \b is the wrong tool here: `-` is a word boundary, so \bwex\b matches
   wex-note, wex-lbl and wex-out as well as wex, and the first run of
   this reported 331 worked examples where there are 50. Class tokens are
   split on whitespace, so split on whitespace. */
function countClass(html, name){
  let n = 0;
  for (const m of html.matchAll(/class="([^"]*)"/g)){
    if (m[1].split(/\s+/).indexOf(name) >= 0) n++;
  }
  return n;
}

/* WHERE THE RETRIEVAL GATE ACTUALLY LIVES.
   It is applied by retrieval.js at runtime, not authored into the
   lesson, so reading the source alone reports every practice question as
   reveal-only for ever — including after Phase 6 fixed exactly that.
   A measurement that cannot see the fix is worse than no measurement, so
   the built page is consulted for whether the gate is loaded. */
const BUILT = (() => {
  const map = {};
  const cfg = require(path.join(ROOT, '_source', 'config', 'pages.js'));
  for (const [key, subject] of Object.entries(cfg)){
    for (const page of subject.pages){
      const p = path.join(ROOT, key, page.file);
      if (!fs.existsSync(p)) continue;
      const html = fs.readFileSync(p, 'utf8');
      for (const id of page.sec || []) map[id] = html;
    }
  }
  return map;
})();

function analyse(file){
  const html = fs.readFileSync(path.join(LESSONS, file), 'utf8');
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
  const built = BUILT[file.replace('.html', '')] || '';
  const gated = built.indexOf('assets/js/retrieval.js') >= 0;

  /* headings carry the concept structure */
  const headings = [...html.matchAll(/<h[2-4][^>]*>([\s\S]*?)<\/h[2-4]>/g)]
    .map(m => m[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim());
  const topics = headings.filter(h => /^\d/.test(h));

  const examq = countClass(html, 'examq');
  const btnAns = countClass(html, 'btn-ans');

  return {
    file,
    subject: subjectOf(file),
    words: text.split(' ').filter(Boolean).length,
    headings: headings.length,
    topics: topics.length,

    /* the learning contract, component by component */
    objectives:   /By the end of this unit/i.test(html) ? 1 : 0,
    prerequisites: countClass(html, 'prereq'),
    diagrams:     (html.match(/\{\{dia:[A-Za-z0-9_]+\}\}/g) || []).length,
    workedExamples: countClass(html, 'wex'),
    guided:       countClass(html, 'guided'),
    predictions:  countClass(html, 'predict'),
    simulations:  countClass(html, 'sim'),
    misconceptions: countClass(html, 'mistake'),
    examConnect:  countClass(html, 'exam-connect'),
    examQuestions: examq,
    /* THE DISTINCTION THAT MATTERS.
       A question whose answer is behind a bare "Show the answer" is a
       REVEAL. The same question behind the retrieval gate takes a
       commitment first and asks for a self-grade after, which is a
       different thing done to memory. Both look identical in the lesson
       source; the difference is whether the page loads the gate. */
    revealOnly:   gated ? 0 : btnAns,
    retrieval:    gated ? examq : countClass(html, 'retrieval'),
    keypoints:    countClass(html, 'keypoints'),
    memoryHook:   countClass(html, 'hook'),

    tables:       (html.match(/<table/g) || []).length,
    codeBlocks:   (html.match(/class="code/g) || []).length,
    nepaliRuns:   (html.match(/np-cell|class="np"/g) || []).length,
    hasNepali:    DEVA.test(html)
  };
}

function run(){
  const files = fs.readdirSync(LESSONS).filter(f => f.endsWith('.html')).sort();
  return files.map(analyse);
}

module.exports = { run, analyse };

if (require.main === module){
  const rows = run();
  if (process.argv.includes('--json')){
    console.log(JSON.stringify(rows, null, 1));
  } else {
    const bySubject = {};
    for (const r of rows) (bySubject[r.subject] = bySubject[r.subject] || []).push(r);
    for (const [subj, list] of Object.entries(bySubject)){
      console.log('\n' + subj);
      console.log('unit     words  topics  dia  wex  pred  sim  misc  examQ  REVEAL  RETRIEVE  hook');
      for (const r of list){
        console.log(
          r.file.replace('.html', '').padEnd(8) +
          String(r.words).padStart(6) +
          String(r.topics).padStart(8) +
          String(r.diagrams).padStart(5) +
          String(r.workedExamples).padStart(5) +
          String(r.predictions).padStart(6) +
          String(r.simulations).padStart(5) +
          String(r.misconceptions).padStart(6) +
          String(r.examQuestions).padStart(7) +
          String(r.revealOnly).padStart(8) +
          String(r.retrieval).padStart(10) +
          String(r.memoryHook).padStart(6));
      }
    }
    const t = k => rows.reduce((a, r) => a + r[k], 0);
    console.log('\nACROSS ALL ' + rows.length + ' UNITS');
    console.log('  worked examples      ' + t('workedExamples'));
    console.log('  predictions          ' + t('predictions'));
    console.log('  simulations          ' + t('simulations'));
    console.log('  misconceptions       ' + t('misconceptions'));
    console.log('  exam questions       ' + t('examQuestions'));
    console.log('  of which REVEAL-only ' + t('revealOnly') + '  <- answer reachable without attempting');
    console.log('  RETRIEVAL blocks     ' + t('retrieval'));
    console.log('  prerequisite blocks  ' + t('prerequisites'));
    console.log('  memory hooks         ' + t('memoryHook'));
    console.log('  guided practice      ' + t('guided'));
  }
}
