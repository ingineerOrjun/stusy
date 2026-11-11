/* ============================================================
   BUILD CONTEXT — loads every input the page writer needs.

   Replaces the previous build.js, which reverse-engineered the CSS,
   the seven runtime modules and ten HTML sections out of
   legacy-single-file.html with regular expressions and then applied
   twelve string patches to the result.

   Everything below is now read from real source files. The legacy
   artifact is no longer an input to the build.

   Layer rules:
     - This module reads from disk and returns data. It writes nothing.
     - It must not know about HTML page structure — that is templates.js.
     - It must not import the diagram library — that is the page writer's job.
   ============================================================ */
const fs = require('fs');
const path = require('path');

/* Repository root, derived from this file's location.
   Previously this was one developer's absolute path,
   which meant the build ran on exactly one machine at one path. */
const SRC  = path.resolve(__dirname, '..');          // _source
const ROOT = path.resolve(SRC, '..');                // repository root

function read(rel){
  return fs.readFileSync(path.join(SRC, rel), 'utf8');
}

/* Writes retry briefly on transient locks.

   On Windows a file that was just written can still be held for a moment by
   an indexer or antivirus scanner, and the next open fails with EBUSY, EPERM
   or a bare UNKNOWN (errno -4094). This surfaced as an intermittent build
   failure when the test suite rebuilt the site straight after a build. It is
   environmental rather than a defect in the build, but an intermittent
   failure is still a failure, so the write backs off and tries again. */
const TRANSIENT = new Set(['EBUSY', 'EPERM', 'UNKNOWN', 'EACCES']);

/* A real synchronous sleep. The previous version busy-spun on Date.now(),
   which burns a core and never yields — the worst thing to do while
   waiting for another process to release a handle. Atomics.wait blocks
   the thread properly. */
const SLEEP_BUF = new Int32Array(new SharedArrayBuffer(4));
function sleepMs(ms){ Atomics.wait(SLEEP_BUF, 0, 0, ms); }

/* Retry budget. Phase 1 used 5 attempts totalling ~150ms; Phase 3.1
   measured a real failure at attempt 5 (`UNKNOWN` writing
   grade10/index.html) roughly once in fifteen full test runs. An
   antivirus or indexer can hold a freshly written file for a second or
   more, so the budget is now ~3.9s across 9 attempts. Waiting costs
   nothing on the overwhelmingly common path, where the first write
   succeeds. */
const WRITE_ATTEMPTS = 9;

function write(rel, content){
  const p = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  let lastErr;
  for (let attempt = 0; attempt < WRITE_ATTEMPTS; attempt++){
    try {
      fs.writeFileSync(p, content, 'utf8');
      return;
    } catch (err) {
      if (!TRANSIENT.has(err.code)) throw err;
      lastErr = err;
      /* 15, 30, 60, 120, 240, 480, 960, 1920 ms — ~3.9s in total */
      sleepMs(15 << attempt);
    }
  }
  throw new Error('could not write ' + rel + ' after ' + WRITE_ATTEMPTS +
                  ' attempts (' + lastErr.code + '). Another process may be ' +
                  'holding the file — an antivirus scanner or a file indexer ' +
                  'is the usual cause on Windows.');
}

/* ---------- design system ----------
   tokens.css is the contract every subject inherits; base.css is the
   component layer. site.css (nav, cards, lesson components) is supplied
   by the page writer and appended after these. */
const css = read('design/tokens.css') + read('design/base.css');

/* ---------- runtime modules ----------
   Key = the filename published under assets/js/. Values are read verbatim,
   so what ships is exactly what is in source control. */
/* published name: core.js ships as code.js, the name every page already links.
   This map is the single list of runtime modules — the set to read and the
   set to publish are the same set, so a module can never be registered for
   one and forgotten by the other. */
const RUNTIME_PUBLISHED = {
  'nav.js': 'nav.js',
  'services/language.js': 'services/language.js',
  'services/strings.js': 'services/strings.js',
  'sim-gates.js': 'sim-gates.js',
  'sim-number.js': 'sim-number.js',
  'sim-kmap.js': 'sim-kmap.js',
  'sim-comb.js': 'sim-comb.js',
  'sim-8085.js': 'sim-8085.js',
  'sql-engine.js': 'sql-engine.js',
  'sim-table.js': 'sim-table.js',
  'sim-sql.js': 'sim-sql.js',
  'sim-er.js': 'sim-er.js',
  'sim-drill.js': 'sim-drill.js',
  'sim-concurrency.js': 'sim-concurrency.js',
  'services/motion.js': 'services/motion.js',
  'core.js': 'code.js',
  'diagram.js': 'diagram.js',
  'showcase.js': 'showcase.js',
  'snippets.js': 'snippets.js',
  'predict.js': 'predict.js',
  'retrieval.js': 'retrieval.js',
  'wexthink.js': 'wexthink.js',
  'guided.js': 'guided.js',
  'sim-stackqueue.js': 'sim-stackqueue.js',
  'sim-dispatch.js': 'sim-dispatch.js',
  'trace.js': 'trace.js',
  'quiz.js': 'quiz.js',
  'services/progress.js': 'services/progress.js',
  'practical.js': 'practical.js',
  'services/revision.js': 'services/revision.js',
  'revise.js': 'revise.js',
  'services/quiz.js': 'services/quiz.js',
  'services/simulation.js': 'services/simulation.js',
  'sim-parts.js': 'sim-parts.js',
  'sim-fault.js': 'sim-fault.js',
  'home.js': 'home.js'
};

const RUNTIME_FILES = Object.keys(RUNTIME_PUBLISHED);

const runtime = {};
for (const f of RUNTIME_FILES){
  const p = path.join(SRC, 'runtime', f);
  if (!fs.existsSync(p)) throw new Error('missing runtime module: runtime/' + f);
  runtime[f] = fs.readFileSync(p, 'utf8');
}

/* ---------- content ----------
   A section is either an authored lesson or a shared page section.
   Lessons win, so deepening a page is a matter of adding a file. */
function section(id){
  const lesson = path.join(SRC, 'content', 'lessons', id + '.html');
  if (fs.existsSync(lesson)) return { html: fs.readFileSync(lesson, 'utf8'), authored: true };
  const shared = path.join(SRC, 'content', 'sections', id + '.html');
  if (fs.existsSync(shared)) return { html: fs.readFileSync(shared, 'utf8'), authored: false };
  throw new Error('no content found for section "' + id + '" — expected ' +
                  'content/lessons/' + id + '.html or content/sections/' + id + '.html');
}

const hero = read('content/sections/hero.html');

const questionBanks = {
  'grade9/computer-fundamentals': require('../content/questions/grade9-computer-fundamentals.js'),
  'grade10/oop-cpp':        require('../content/questions/grade10-oop-cpp.js'),
  'grade10/digital-design': require('../content/questions/grade10-digital-design.js'),
  'grade10/dbms':           require('../content/questions/grade10-dbms.js'),
  'grade10/hardware':       require('../content/questions/grade10-hardware.js')
};

/* Faded guided practice. Same shape as the question banks: content lives
   in _source/content, the build generates a registration call, and the
   runtime that consumes it never learns a subject's name. Adding a
   subject's practice means adding a file here, not touching an engine. */
const practiceBanks = [
  require('../content/practice/grade10-digital-design.js'),
  require('../content/practice/grade10-dbms.js'),
  require('../content/practice/grade10-oop-cpp.js'),
  require('../content/practice/grade10-hardware.js')
].reduce((all, bank) => all.concat(bank), []);

/* ---------------- the learning map ----------------
   One derived object joining what already exists rather than a new
   place to repeat it: titles, pages, hours and marks come from
   pages.js; the prerequisite edges come from content/prerequisites.js;
   nothing is written twice.

   A unit's canonical id is `<subject>/u<n>` — the same n the navigation
   badge shows and the same unit key the question banks already tag
   against, so the map, the quiz and the retrieval record all join
   without a translation table.

   A page is a UNIT when it declares hours. trace, tables and quiz pages
   are not units and have no place in a prerequisite graph. */
const prerequisites = require('../content/prerequisites.js');

const learningMap = (() => {
  const pages = require('../config/pages.js');
  const out = {};
  for (const [subject, cfg] of Object.entries(pages)){
    for (const p of cfg.pages){
      if (typeof p.hrs !== 'number') continue;
      const id = subject + '/u' + p.n;
      out[id] = {
        id,
        subject,
        n: p.n,
        page: subject + '/' + p.file,
        title: { en: p.title, ne: p.np },
        hrs: p.hrs,
        marks: p.marks,
        prereqs: (prerequisites[id] || []).map(r => ({ unit: r.unit, why: r.why }))
      };
    }
  }
  return out;
})();

/* ---------------- subject authoring status ----------------
   THE PROBLEM THIS SOLVES

   `site.js` carried a hand-maintained `done: true` flag, and six places
   in build/index.js asked it whether a subject was finished. A boolean
   can say "written" or "not written" and nothing else, so when Grade 9
   arrived with ONE unit of seven authored, the site said two false
   things at once:

     the home page   "4 subjects are written in full — … — across 25
                      units", crediting four complete Grade 10 subjects
                      with a Grade 9 unit, 2 of its diagrams, 1 of its
                      simulators, 4 of its questions and 8 of its hours

     the grade index  Computer and Application labelled "syllabus
                      outline", identical to the three Grade 9 subjects
                      with nothing written at all

   The same boolean also carried `s.done ? 6` for the unit count, which
   was right for OOP and Hardware and wrong for DBMS (7) and Digital
   Design (5) — a figure on a navigation page that no data supported.

   So status is now DERIVED, from the two things that already decide it:

     official units   syllabus.js — what the curriculum prescribes
     authored units   pages.js    — what has actually been written

   Three states, because three is what the content can be in:

     outline    0 authored units; the syllabus is published, nothing is taught
     partial    some but not all; the subject is open and incomplete
     complete   every official unit has a page

   `done` is left in site.js for anything outside the build that still
   reads it, and validate.js now fails if it disagrees with the derived
   state — so the two cannot drift. Nothing in the build consults it. */
const subjectStatus = (() => {
  const site     = require('../config/site.js');
  const syllabus = require('../content/syllabus.js');
  const pages    = require('../config/pages.js');
  const out = {};

  for (const g of site){
    for (const s of g.subjects){
      const key = g.id + '/' + s.slug;
      const official = (syllabus[key] || []).length;
      /* A UNIT page is one that declares hours — the same test the
         learning map uses. revise.html and quiz.html are pages of a
         subject and are not units of it. */
      const authored = ((pages[key] && pages[key].pages) || [])
        .filter(p => typeof p.hrs === 'number').length;

      out[key] = {
        key, grade: g.id, gradeLabel: g.label, slug: s.slug,
        short: s.short, name: s.name, np: s.np,
        officialUnits: official,
        authoredUnits: authored,
        state: authored === 0 ? 'outline'
             : authored < official ? 'partial'
             : 'complete',
        declaredDone: !!s.done
      };
    }
  }
  return out;
})();

/* ---------------- where a struggling student should go back to ----------
   TWO DIFFERENT QUESTIONS, KEPT APART

   The quiz engine serves five subjects from one file. Two of its five
   score bands used to carry advice written for one of them — "Re-read
   Units 3, 5 and 6" and "use the Trace section slowly" — so a Grade 9
   student who scored 45% was sent to three units that do not exist in
   their subject. Phase 12.1 replaced both with advice that named
   nothing: true everywhere, useful nowhere. Phase 12.3 named units
   again, from marks.

   Phase 12.4 separated what Phase 12.3 had merged. "Where should I go
   back to?" has two answers, and they are not the same answer:

     examFocus     which units carry the most EXAMINATION MARKS.
                   Derived here from config/pages.js. A fact about the
                   paper, and nothing more: a 15-mark unit is not hard
                   because it is heavy, and a 2-mark unit is not easy
                   because it is light.

     teacherFocus  which units a student actually STRUGGLES with.
                   A judgement, authored in content/revision-focus.js,
                   which no amount of data in this repository can
                   derive. It is currently empty, and the header of that
                   file explains why: the old OOP list came from a
                   prototype commit called "Fix styling and update text"
                   with no rationale recorded anywhere.

   They disagree, which is the point. OOP Unit 3 carries 2 of 50 marks
   and is where beginners stall. Examination weight will never name it;
   a teacher might. Presenting either as the other tells a student
   something false.

   Neither claims to know which question THIS student got wrong. The
   explanation under each wrong answer already says that, specifically,
   because it was written beside the question. */
const examFocus = (() => {
  const pages = require('../config/pages.js');
  const out = {};
  for (const [key, cfg] of Object.entries(pages)){
    const units = cfg.pages.filter(p => typeof p.hrs === 'number' &&
                                        typeof p.marks === 'number');
    if (!units.length) continue;
    /* At most three, and never more than half the subject — "four of
       your seven units" is not a focus, it is the syllabus. */
    const cap = Math.max(1, Math.min(3, Math.ceil(units.length / 2)));
    const top = [...units]
      .sort((a, b) => (b.marks - a.marks) || (Number(a.n) - Number(b.n)))
      .slice(0, cap)
      .sort((a, b) => Number(a.n) - Number(b.n));
    out[key] = top.map(u => ({
      n: String(u.n),
      marks: u.marks,
      title: { en: u.title, ne: u.np },
      page: u.file
    }));
  }
  return out;
})();

/* The authored half. Titles are NOT taken from revision-focus.js — they
   are joined from pages.js by unit number, so a renamed unit cannot
   leave the override quoting the old name, and an override naming a
   unit that does not exist produces no entry here and a build error in
   validate.js rather than a silent omission. */
const teacherFocus = (() => {
  const authored = require('../content/revision-focus.js');
  const pages = require('../config/pages.js');
  const out = {};
  for (const [key, entry] of Object.entries(authored)){
    const cfg = pages[key];
    const byN = {};
    for (const p of ((cfg && cfg.pages) || [])){
      if (typeof p.hrs === 'number') byN[String(p.n)] = p;
    }
    out[key] = {
      source: entry && entry.source,
      units: ((entry && entry.units) || []).map(u => {
        const p = byN[String(u.n)];
        return {
          n: String(u.n),
          why: u.why,
          title: p ? { en: p.title, ne: p.np } : null,
          page: p ? p.file : null
        };
      })
    };
  }
  return out;
})();

/* The words the pages use, in both languages, in one place — so a
   subject's status reads the same in the navigation, on the grade index
   and on the home page, and a fourth state cannot be invented by a
   template. */
const STATUS_LABEL = {
  outline:  { en: 'syllabus outline', ne: 'सिलेबस रूपरेखा' },
  partial:  { en: 'partly written',   ne: 'आंशिक लेखिएको' },
  complete: { en: 'notes ready',      ne: 'नोट्स तयार' }
};

/* ---------------- content statistics ----------------
   The home page states what the product contains. Those numbers are
   COUNTED here, from the same lesson sources the pages are built from,
   so a claim on the landing page cannot drift from the content — and
   cannot be inflated by editing a template. If a number looks wrong,
   the content is wrong.

   Counted from source rather than from the written pages because the
   home page is written before the unit pages are, and a statistic that
   depends on build order is a statistic that silently reads zero.

   SITE-WIDE IS NOT THE SAME AS FINISHED. These totals used to be the
   only ones that existed, and the home page spent them on a sentence
   about finished subjects. Every figure is now also available per
   subject and summed per status, so a sentence about complete subjects
   can be given complete subjects' numbers. */
const contentStats = (() => {
  const dir = path.join(SRC, 'content', 'lessons');
  const files = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter(f => f.endsWith('.html'))
    : [];
  const read1 = f => fs.readFileSync(path.join(dir, f), 'utf8');
  const all = files.map(read1).join('\n');
  const count = (hay, re) => (hay.match(re) || []).length;

  const diagrams = require('../diagrams.js');
  const pages = require('../config/pages.js');
  const isAnimated = n => typeof diagrams[n] !== 'string';

  /* ---- per subject, from that subject's own lesson files ----
     A subject's lessons are the sections its unit pages name, so the
     attribution is the same join the build itself uses — no second list
     of which file belongs to whom. */
  const bySubject = {};
  for (const key of Object.keys(subjectStatus)){
    const cfg = pages[key];
    const secs = [];
    if (cfg) for (const p of cfg.pages){
      if (typeof p.hrs !== 'number') continue;
      for (const id of (p.sec || [])) secs.push(id);
    }
    const text = secs
      .map(id => (files.includes(id + '.html') ? read1(id + '.html') : ''))
      .join('\n');

    /* Diagrams are counted by what the lessons ACTUALLY INJECT, not by
       the size of the registry. The registry is shared; a diagram only
       belongs to a subject once a lesson of that subject uses it. */
    const used = new Set([...text.matchAll(/\{\{dia:([A-Za-z0-9_]+)\}\}/g)].map(m => m[1]));
    const units = Object.values(learningMap).filter(u => u.subject === key);

    bySubject[key] = {
      state:       subjectStatus[key].state,
      units:       units.length,
      hours:       units.reduce((n, u) => n + (u.hrs || 0), 0),
      diagrams:    used.size,
      animations:  [...used].filter(isAnimated).length,
      simulators:  count(text, /class="sim"/g),
      retrieval:   count(text, /class="examq"/g),
      predictions: count(text, /class="predict"/g),
      questions:   (questionBanks[key] || []).length
    };
  }

  const FIELDS = ['units','hours','diagrams','animations','simulators',
                  'retrieval','predictions','questions'];
  const sumWhere = test => {
    const out = { subjects: 0 };
    for (const f of FIELDS) out[f] = 0;
    for (const key of Object.keys(bySubject)){
      if (!test(bySubject[key])) continue;
      out.subjects++;
      for (const f of FIELDS) out[f] += bySubject[key][f];
    }
    return out;
  };

  return {
    /* site-wide, unchanged in meaning — what the product contains */
    units:       Object.keys(learningMap).length,
    subjects:    sumWhere(s => s.state === 'complete').subjects,
    diagrams:    Object.keys(diagrams).length,
    animations:  Object.keys(diagrams).filter(isAnimated).length,
    simulators:  count(all, /class="sim"/g),
    retrieval:   count(all, /class="examq"/g),
    practice:    practiceBanks.length,
    predictions: count(all, /class="predict"/g),
    hours:       Object.values(learningMap).reduce((n, u) => n + (u.hrs || 0), 0),

    /* and the same figures split by how finished the subject is, so a
       claim about finished subjects can be given finished subjects' numbers */
    bySubject,
    complete: sumWhere(s => s.state === 'complete'),
    partial:  sumWhere(s => s.state === 'partial'),
    outline:  sumWhere(s => s.state === 'outline')
  };
})();

module.exports = {
  questionBanks,
  practiceBanks,
  prerequisites,
  learningMap,
  contentStats,
  subjectStatus,
  examFocus,
  teacherFocus,
  STATUS_LABEL,
  ROOT, SRC, write, read,
  css,
  runtime, RUNTIME_PUBLISHED,
  section, hero,
  site:     require('../config/site.js'),
  pages:    require('../config/pages.js'),
  brand:    require('../config/brand.js'),
  syllabus: require('../content/syllabus.js')
};
