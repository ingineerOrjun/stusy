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
   Previously this was the absolute string 'C:/Users/Acer/Desktop/rgsc-study',
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

function write(rel, content){
  const p = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  let lastErr;
  for (let attempt = 0; attempt < 5; attempt++){
    try {
      fs.writeFileSync(p, content, 'utf8');
      return;
    } catch (err) {
      if (!TRANSIENT.has(err.code)) throw err;
      lastErr = err;
      /* short synchronous back-off: 10ms, 20ms, 40ms, 80ms */
      const until = Date.now() + (10 << attempt);
      while (Date.now() < until) { /* spin briefly */ }
    }
  }
  throw new Error('could not write ' + rel + ' after 5 attempts (' +
                  lastErr.code + '). Another process may be holding the file.');
}

/* ---------- design system ----------
   tokens.css is the contract every subject inherits; base.css is the
   component layer. site.css (nav, cards, lesson components) is supplied
   by the page writer and appended after these. */
const css = read('design/tokens.css') + read('design/base.css');

/* ---------- runtime modules ----------
   Key = the filename published under assets/js/. Values are read verbatim,
   so what ships is exactly what is in source control. */
const RUNTIME_FILES = [
  'nav.js', 'services/motion.js', 'core.js', 'diagram.js', 'showcase.js', 'snippets.js', 'predict.js',
  'sim-stackqueue.js', 'sim-dispatch.js', 'trace.js', 'quiz.js',
  'services/progress.js', 'services/quiz.js', 'services/simulation.js'
];

const runtime = {};
for (const f of RUNTIME_FILES){
  const p = path.join(SRC, 'runtime', f);
  if (!fs.existsSync(p)) throw new Error('missing runtime module: runtime/' + f);
  runtime[f] = fs.readFileSync(p, 'utf8');
}
/* published name: core.js ships as code.js, the name every page already links */
const RUNTIME_PUBLISHED = {
  'nav.js': 'nav.js',
  'services/motion.js': 'services/motion.js',
  'core.js': 'code.js',
  'diagram.js': 'diagram.js',
  'showcase.js': 'showcase.js',
  'snippets.js': 'snippets.js',
  'predict.js': 'predict.js',
  'sim-stackqueue.js': 'sim-stackqueue.js',
  'sim-dispatch.js': 'sim-dispatch.js',
  'trace.js': 'trace.js',
  'quiz.js': 'quiz.js',
  'services/progress.js': 'services/progress.js',
  'services/quiz.js': 'services/quiz.js',
  'services/simulation.js': 'services/simulation.js'
};

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
  'grade10/oop-cpp': require('../content/questions/grade10-oop-cpp.js')
};

module.exports = {
  questionBanks,
  ROOT, SRC, write, read,
  css,
  runtime, RUNTIME_PUBLISHED,
  section, hero,
  site:     require('../config/site.js'),
  pages:    require('../config/pages.js'),
  syllabus: require('../content/syllabus.js')
};
