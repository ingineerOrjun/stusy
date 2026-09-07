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
  'guided.js': 'guided.js',
  'sim-stackqueue.js': 'sim-stackqueue.js',
  'sim-dispatch.js': 'sim-dispatch.js',
  'trace.js': 'trace.js',
  'quiz.js': 'quiz.js',
  'services/progress.js': 'services/progress.js',
  'services/quiz.js': 'services/quiz.js',
  'services/simulation.js': 'services/simulation.js'
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
  'grade10/oop-cpp':        require('../content/questions/grade10-oop-cpp.js'),
  'grade10/digital-design': require('../content/questions/grade10-digital-design.js'),
  'grade10/dbms':           require('../content/questions/grade10-dbms.js')
};

/* Faded guided practice. Same shape as the question banks: content lives
   in _source/content, the build generates a registration call, and the
   runtime that consumes it never learns a subject's name. Adding a
   subject's practice means adding a file here, not touching an engine. */
const practiceBanks = [
  require('../content/practice/grade10-digital-design.js')
].reduce((all, bank) => all.concat(bank), []);

module.exports = {
  questionBanks,
  practiceBanks,
  ROOT, SRC, write, read,
  css,
  runtime, RUNTIME_PUBLISHED,
  section, hero,
  site:     require('../config/site.js'),
  pages:    require('../config/pages.js'),
  syllabus: require('../content/syllabus.js')
};
