#!/usr/bin/env node
/* ============================================================
   NEPALI REVIEW PACKAGE — generator

   WHY THIS IS A GENERATOR AND NOT A DOCUMENT

   A review package written by hand is a snapshot that starts drifting
   from the content the moment it is saved. The reviewer would then be
   correcting text the site no longer shows, which is worse than no
   review. This reads the content itself, every time, so the package and
   the pages cannot disagree.

   WHAT IT COLLECTS
   Every bilingual unit the platform ships, from the four places they
   live:

     lessons      .pair blocks, and any element carrying an .np-cell
                  gloss (callouts, figure captions, predictions,
                  misconception blocks, memory hooks, key points)
     questions    prompt, every option, and the explanation
     drills       title, lead, options and the reason for every case
     diagrams     figure captions that carry a gloss

   Each one is tagged NEW when its Nepali text was added or changed by
   Phase 9 — determined from the git diff against the phase baseline,
   not from a hand-kept list.

   WHAT A REVIEWER NEEDS AND GETS
     - the Nepali, and the English saying the same thing, side by side
     - where it appears: subject, unit, topic heading, kind
     - the technical terms left in Latin script inside the Nepali,
       listed, because those are the decisions most worth a second
       opinion
     - a field to write in, and a status to set

   USAGE
     node tools/nepali-review.js            writes both outputs
     node tools/nepali-review.js --stats    counts only, writes nothing

   OUTPUTS
     docs/NEPALI-REVIEW-PACKAGE.html   the thing a teacher opens
     docs/nepali-review-items.json     the same data, machine-readable,
                                       keyed by a stable item id so a
                                       returned review can be applied
   ============================================================ */
'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const BI = require('./nepali-bilingual.js');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, '_source');
const BASELINE = '72e8bc5';            /* the commit Phase 9 started from */

const DEVA = /[ऀ-ॿ]/;

/* ---------------------------------------------------------------- utils */

const norm = s => String(s || '').replace(/\s+/g, ' ').trim();

function stripTags(html){
  return norm(String(html || '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"'));
}

function esc(s){
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* A short stable id. Content-derived, so an item keeps its id across
   regenerations as long as its Nepali has not changed — which is what
   lets a reviewer's answers be matched back to it. */
function idOf(ne){
  let h = 5381;
  const s = norm(ne);
  for (let i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0;
  return 'ne-' + h.toString(36);
}

/* The Latin-script runs inside a Nepali string: the technical terms that
   were deliberately NOT translated. These are the judgement calls a
   reviewer should see collected rather than hunt for. */
function latinTerms(ne){
  const out = new Set();
  for (const m of String(ne).matchAll(/[A-Za-z][A-Za-z0-9_+#.()>&<=~:-]*/g)){
    const t = m[0].replace(/[.,;:)]+$/, '');
    if (t.length > 1) out.add(t);
  }
  return [...out];
}

/* ------------------------------------------------- what Phase 9 changed */

/* NOT read from the diff.

   The first version of this did read the diff, and got it wrong in a way
   worth recording: a diff is line-based, and a Nepali paragraph in a
   lesson is wrapped across six or seven source lines. Matching an item's
   text against added LINES therefore found only the items short enough
   to fit on one — 4 of DBMS's, when Phase 9 had added a whole bilingual
   block to three of its units.

   This reads the BASELINE TREE instead: every Nepali string that existed
   at the commit Phase 9 started from, flattened into one normalised
   blob. An item is new if its text is not in there. Line wrapping cannot
   affect it, because both sides are normalised the same way. */
function baselineNepaliText(){
  let files = [];
  try {
    files = execFileSync('git', ['ls-tree', '-r', '--name-only', BASELINE, '_source'],
      { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
      .split(/\r?\n/).filter(f => /\.(html|js)$/.test(f));
  } catch (e){
    console.error('! could not list the baseline tree; every item will be marked unknown');
    return null;
  }
  const parts = [];
  for (const f of files){
    let src = '';
    try {
      src = execFileSync('git', ['show', BASELINE + ':' + f],
        { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
    } catch (e){ continue; }
    if (!DEVA.test(src)) continue;
    parts.push(cmp(src));
  }
  return parts.join(' \u0000 ');
}

/* The normal form BOTH sides of the baseline comparison are put into.

   Tags and entities go, whitespace collapses — and so do backslashes,
   which is the third thing this got wrong before it was checked. A
   question's Nepali explanation containing a quotation mark is written
   \" in the JS source and " in the loaded value, so the raw source and
   the required() value differ by one character about forty characters
   in. That was enough to report an untouched Digital Design explanation
   as newly written. */
function cmp(s){
  return norm(stripTags(s)).replace(/\\/g, '');
}

/* ----------------------------------------------------- subject metadata */

const pages    = require(path.join(SRC, 'config/pages.js'));
const grid     = require(path.join(SRC, 'content/specification-grid.js'));

const SUBJECT_NAME = {
  'grade10/oop-cpp':        'Data Structure & OOP using C++',
  'grade10/dbms':           'Database Management System',
  'grade10/digital-design': 'Digital Design and Microprocessor',
  'grade10/hardware':       'Computer Hardware, Electronics Repair and Maintenance'
};

/* section id -> { subject, unitNo, unitTitle, marks } */
const SECTION = {};
for (const [subject, cfg] of Object.entries(pages)){
  for (const p of cfg.pages){
    if (typeof p.hrs !== 'number') continue;
    const g = (grid[subject] || { units: [] }).units.find(u => u.n === String(p.n));
    for (const sec of (p.sec || [])){
      SECTION[sec] = {
        subject, unitNo: p.n, unitTitle: p.title,
        marks: g ? g.marks : p.marks, hrs: p.hrs
      };
    }
  }
}

/* -------------------------------------------------------- the collector */

const items = [];
function add(it){
  if (!it.ne || !DEVA.test(it.ne)) return;
  items.push(Object.assign({ id: idOf(it.ne) }, it));
}

/* ---- 1. lessons ---- */
function collectLessons(){
  const dir = path.join(SRC, 'content/lessons');
  for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.html'))){
    const sec = file.replace(/\.html$/, '');
    const meta = SECTION[sec];
    if (!meta) continue;
    const html = fs.readFileSync(path.join(dir, file), 'utf8');

    /* index every topic heading by its offset, so any block can be told
       which topic it falls under */
    const heads = [];
    for (const m of html.matchAll(/<h[34][^>]*class="(?:topic|sub)"[^>]*>([\s\S]*?)<\/h[34]>/g)){
      heads.push({ at: m.index, title: stripTags(m[1]) });
    }
    for (const m of html.matchAll(/<h3 class="topic" id="([^"]+)">([\s\S]*?)<\/h3>/g)){
      heads.push({ at: m.index, title: stripTags(m[2]), anchor: m[1] });
    }
    heads.sort((a, b) => a.at - b.at);
    const topicAt = (off) => {
      let t = { title: '(unit opening)' };
      for (const h of heads){ if (h.at <= off) t = h; else break; }
      return t;
    };

    /* (a) .pair blocks — the main prose, English half and Nepali half */
    for (const m of html.matchAll(
      /<div class="pair">\s*<div class="en">([\s\S]*?)<\/div>\s*<div class="np">([\s\S]*?)<\/div>\s*<\/div>/g)){
      const t = topicAt(m.index);
      add({ kind: 'lesson prose', file, sec, meta, topic: t.title, anchor: t.anchor,
            en: stripTags(m[1]), ne: stripTags(m[2]) });
    }

    /* (b) every .np-cell gloss — callouts, captions, predictions,
       misconception blocks, hooks, key points, model answers, cells.

       Found by SCANNING rather than by one clever regex. The regex
       version required the gloss and its English to sit inside one
       element with no nested element of the same tag, and silently
       dropped every gloss in a <div> that happened to contain another
       <div> — the model answers that hold a <div class="out"> code
       block, among others. Measured: 9.2% of the distinct Nepali words
       in the lessons were in no item at all. Walking back to the
       nearest enclosing block start has no such blind spot. */
    const BLOCK = /<(p|div|figcaption|li|td|h4|h3|span)\b[^>]*>/g;
    for (const m of html.matchAll(/<span class="np-cell">([\s\S]*?)<\/span>/g)){
      const ne = stripTags(m[1]);
      if (!ne) continue;

      /* the last block tag that opens before this gloss */
      BLOCK.lastIndex = 0;
      let start = 0, b;
      while ((b = BLOCK.exec(html)) && b.index < m.index){
        if (/class="np-cell"/.test(b[0])) continue;
        start = b.index + b[0].length;
      }
      let en = stripTags(html.slice(start, m.index));
      /* a gloss that trails a long block picks up too much: keep the
         last sentence or two, which is what it is glossing */
      if (en.length > 900) en = '…' + en.slice(-900);
      if (!en) continue;

      const t = topicAt(m.index);
      const near = html.slice(Math.max(0, m.index - 400), m.index);
      let kind = 'gloss';
      if (/class="hook"/.test(near))             kind = 'memory hook';
      else if (/<figcaption/.test(near) && !/<\/figcaption>/.test(near.split('<figcaption').pop()))
                                                 kind = 'figure caption';
      else if (/class="callout"/.test(near))     kind = 'callout';
      else if (/predict-feedback/.test(near))    kind = 'prediction feedback';
      else if (/class="predict"/.test(near))     kind = 'prediction prompt';
      else if (/class="mistake"/.test(near))     kind = 'common mistake';
      else if (/class="keypoints"/.test(near))   kind = 'key point';
      else if (/class="ans"/.test(near))         kind = 'model answer';
      else if (/class="examq"/.test(near))       kind = 'practice question';
      else if (/class="sim-why"/.test(near))     kind = 'how to use this';
      else if (/class="sim-goal"/.test(near))    kind = 'what you will learn';
      else if (/class="outcomes"/.test(near))    kind = 'learning outcome';
      add({ kind, file, sec, meta, topic: t.title, anchor: t.anchor, en, ne });
    }

    /* (c) the unit's own Nepali subtitle, and any .np block that is not
       half of a .pair (u6's "छोटो सार" summary is one) */
    for (const m of html.matchAll(/<h2>([\s\S]*?)<\/h2>\s*<p class="sec-sub">([\s\S]*?)<\/p>/g)){
      add({ kind: 'unit title', file, sec, meta, topic: '(unit heading)',
            en: stripTags(m[1]), ne: stripTags(m[2]) });
    }
    /* (d) the inline bilingual kickers — "Interactive experiment ·
       अन्तरक्रियात्मक प्रयोग", "Key points to revise — दोहोर्‍याउनुपर्ने…". Repeated
       chrome rather than taught content, but a student reads them on
       every page, so they belong in a review. De-duplicated by add(). */
    /* The Nepali half nests an English separator inside itself —
       <span class="t-ne"><span class="t-en"> — </span>दोहोर्‍याउनुपर्ने…</span> —
       which is the house idiom for giving the two halves a separator
       that disappears in single-language mode. A lazy regex stops at
       the inner </span> and captures the separator instead of the
       Nepali, so this counts span depth. */
    for (const m of html.matchAll(/<span class="t-en">([\s\S]*?)<\/span>\s*(<span class="t-ne"[^>]*>)/g)){
      let i = m.index + m[0].length, depth = 1;
      const tag = /<\/?span\b[^>]*>/g;
      tag.lastIndex = i;
      let t, end = -1;
      while ((t = tag.exec(html))){
        depth += t[0][1] === '/' ? -1 : 1;
        if (depth === 0){ end = t.index; break; }
      }
      if (end < 0) continue;
      const ne = stripTags(html.slice(i, end));
      if (!DEVA.test(ne)) continue;
      add({ kind: 'section label', file, sec, meta, topic: '(page furniture)',
            en: stripTags(m[1]), ne });
    }

    for (const m of html.matchAll(/<div class="np">([\s\S]*?)<\/div>\s*<\/div>/g)){
      const prev = html.slice(Math.max(0, m.index - 2200), m.index);
      if (/<div class="pair">(?:(?!<\/div>\s*<\/div>)[\s\S])*$/.test(prev)) continue;
      const t = topicAt(m.index);
      /* its English counterpart is the block it summarises, just above */
      const en = stripTags(prev.slice(-700));
      add({ kind: 'Nepali summary', file, sec, meta, topic: t.title, anchor: t.anchor,
            en: '…' + en, ne: stripTags(m[1]) });
    }
  }
}

/* ---- 2. question banks ---- */
function collectQuestions(){
  const dir = path.join(SRC, 'content/questions');
  for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.js'))){
    const bank = require(path.join(dir, file));
    for (const q of bank){
      const unitNo = String(q.unit || '').replace(/^u/, '');
      const cfg = (pages[q.subject] || { pages: [] }).pages
        .find(p => String(p.n) === unitNo) || {};
      const g = (grid[q.subject] || { units: [] }).units.find(u => u.n === unitNo);
      const meta = { subject: q.subject, unitNo, unitTitle: cfg.title || '',
                     marks: g ? g.marks : cfg.marks, hrs: cfg.hrs };

      add({ kind: 'quiz question', file: 'questions/' + file, meta,
            topic: q.topic, ref: q.id + ' · ' + q.difficulty,
            en: stripTags(q.prompt.en), ne: stripTags(q.prompt.ne) });

      q.options.forEach((o, i) => {
        if (!o.ne || !DEVA.test(o.ne)) return;    /* a value, left in English on purpose */
        add({ kind: 'quiz option', file: 'questions/' + file, meta,
              topic: q.topic, ref: q.id + ' option ' + (i + 1) +
                                   (i === q.answer ? ' (the correct one)' : ''),
              en: stripTags(o.en), ne: stripTags(o.ne) });
      });

      add({ kind: 'answer explanation', file: 'questions/' + file, meta,
            topic: q.topic, ref: q.id,
            en: stripTags(q.explanation.en), ne: stripTags(q.explanation.ne) });
    }
  }
}

/* ---- 3. decision drills ---- */
function collectDrills(){
  const SETS = require(path.join(SRC, 'runtime/sim-drill.js')).SETS;

  /* which unit mounts each set, read from the lessons rather than guessed */
  const mount = {};
  const dir = path.join(SRC, 'content/lessons');
  for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.html'))){
    const html = fs.readFileSync(path.join(dir, file), 'utf8');
    for (const m of html.matchAll(/class="drill"[^>]*data-set="([^"]+)"/g)){
      mount[m[1]] = SECTION[file.replace(/\.html$/, '')];
    }
  }

  for (const [name, set] of Object.entries(SETS)){
    const meta = mount[name] || { subject: '(not mounted)', unitNo: '-', unitTitle: '', marks: 0 };
    const base = { kind: 'drill', file: 'runtime/sim-drill.js', meta, topic: 'drill: ' + name };
    add(Object.assign({}, base, { ref: name + ' · title',
      en: set.title.en, ne: set.title.ne }));
    add(Object.assign({}, base, { ref: name + ' · instructions',
      en: set.lead.en, ne: set.lead.ne }));
    set.options.forEach(o => {
      if (norm(o.label.ne) === norm(o.label.en)) return;   /* a value */
      add(Object.assign({}, base, { ref: name + ' · option "' + o.label.en + '"',
        en: o.label.en, ne: o.label.ne }));
    });
    set.cases.forEach((c, i) => {
      add(Object.assign({}, base, {
        kind: 'drill answer feedback',
        ref: name + ' · case ' + (i + 1) + ' (answer: ' + c.answer + ')',
        evidence: c.pre, en: c.why.en, ne: c.why.ne }));
    });
  }
}

/* ---- 4. the runtime, read as source ----

   WHAT THIS REPLACED, AND WHY

   The previous version of this function read ONE file,
   runtime/services/strings.js, with one regex:

       ne\s*:\s*(['"])([\s\S]*?)\1

   It found 54 of that file's 56 pairs and nothing at all in the other
   twenty-eight runtime files, which between them hold 707. Those files
   were not an oversight in the usual sense — they were invisible to
   the technique. A simulator keeps its content inside its closure and
   exports the mount API, so requiring it gives you functions; and its
   Nepali is written as a bi() argument, as an `np:` key, as a
   concatenation with a number in the middle, or as markup it builds
   itself. One regex sees none of that.

   tools/nepali-bilingual.js parses instead, and reports what it cannot
   parse. See its header for the five shapes and the failure mode.

   ATTRIBUTION comes from config/pages.js, which already records which
   runtime modules each page loads. That is better than guessing from
   file names and it is how sim-parts.js is correctly attributed to TWO
   subjects: Grade 9 Unit 2 and Grade 10 Hardware Unit 2 both mount its
   `systemunits` set, so its Nepali belongs to both reviews. */
const RUNTIME_SKIP = new Set(['sim-drill.js']);   /* has its own collector */

function runtimeMounts(){
  const by = {};
  for (const [subject, cfg] of Object.entries(pages)){
    for (const p of cfg.pages){
      for (const j of (p.js || [])){
        (by[j] = by[j] || []).push({ subject, p });
      }
    }
  }
  return by;
}

function collectInlineRuntime(){
  const mounts = runtimeMounts();
  const files = [];
  const add1 = (base, prefix) => (function walk(d, p){
    for (const e of fs.readdirSync(d, { withFileTypes: true })){
      if (e.isDirectory()) walk(path.join(d, e.name), p + e.name + '/');
      else if (e.name.endsWith('.js')) files.push({ rel: p + e.name, base, prefix });
    }
  })(base, '');
  add1(path.join(SRC, 'runtime'), 'runtime/');
  /* The BUILD writes Nepali too. index.js holds the homepage's Nepali
     paragraphs — "४ विषय पूरै लेखिएका छन्…" — inside template literals
     with the figures interpolated. It is the first Nepali a visitor
     reads and it had never been in a review package. */
  add1(path.join(SRC, 'build'), 'build/');
  files.sort((a, b) => (a.prefix + a.rel).localeCompare(b.prefix + b.rel));

  const unsupported = [];
  for (const entry of files){
    const rel = entry.rel;
    if (RUNTIME_SKIP.has(rel)) continue;
    const src = fs.readFileSync(path.join(entry.base, rel), 'utf8');
    if (!DEVA.test(src)) continue;
    const isBuild = entry.prefix === 'build/';
    const found = BI.scanSource(src, entry.prefix + rel);
    for (const u of found.unsupported) unsupported.push(u);
    if (!found.pairs.length) continue;

    /* who shows it */
    const where = isBuild ? [] : (mounts[rel] || []);
    const subjects = [...new Set(where.map(w => w.subject))];
    const shared = isBuild || rel.indexOf('services/') === 0 || subjects.length >= 3;
    const contexts = [];
    if (shared || !subjects.length){
      contexts.push({ subject: shared ? '(shared across every page)' : '(not mounted on any page)',
                      unitNo: '-', unitTitle: '', marks: 0, hrs: 0 });
    } else {
      for (const s of subjects){
        const ps = where.filter(w => w.subject === s).map(w => w.p);
        const units = ps.map(p => String(p.n)).filter(n => n && n !== 'undefined');
        contexts.push({
          subject: s,
          unitNo: units.length ? [...new Set(units)].join(', ') : '-',
          unitTitle: ps.map(p => p.title).filter(Boolean).join(' / '),
          marks: ps[0] && ps[0].marks, hrs: ps[0] && ps[0].hrs,
          mounts: ps.map(p => p.file)
        });
      }
    }

    for (const p of found.pairs){
      for (const meta of contexts){
        add({ kind: isBuild ? 'page furniture' : shared ? 'interface label' : 'simulator text',
              file: entry.prefix + rel, meta,
              topic: isBuild ? 'written by the build'
                   : shared ? 'user interface'
                   : 'simulator: ' + rel.replace(/\.js$/, ''),
              ref: p.ref, en: p.en, ne: p.ne,
              interpolated: p.interpolated || false });
      }
    }
  }
  return unsupported;
}

/* ---- 5. content that is exported, walked as data ----

   The practice banks, the prerequisite graph, the Nepali heading table
   and the animated diagrams' narration are all requireable. Reading
   the VALUE beats reading the source for those: no quoting to undo, no
   concatenation to rejoin, and the path through the object is a precise
   reference for a reviewer.

   `content/practice` is the largest single thing the previous package
   was missing — 305 Devanagari literals of guided practice, four
   files, every one of them carrying its own `subject` and `unit`. They
   were not hard to attribute. Nothing had ever looked. */
const DATA_MODULES = [
  { dir: 'content/practice', kind: 'guided practice', topic: 'guided practice' },
  /* Phase 14. The C program stepper's captions — two per step, fourteen
     programs — are content and live beside the practice banks, so they
     are collected the same way and attributed by the subject and unit
     each program declares. */
  { dir: 'content/programs', kind: 'program stepper', topic: 'stepping through a program' },
  { file: 'content/prerequisites.js', kind: 'prerequisite reason',
    topic: 'what this unit assumes', keyIsSubjectUnit: true },
  { file: 'content/heading-ne.js', kind: 'section heading',
    topic: 'heading', stringMap: true, byHeading: true },
  { file: 'diagrams.js', kind: 'diagram narration',
    topic: 'diagram', byDiagram: true },
  /* Titles. A student meets these in navigation, in the grade index and
     at the top of every page, which makes them the most-read Nepali on
     the platform and the last to be reviewed. The unit titles reach the
     package twice over — once from here and once from each lesson's own
     <h2> — and the occurrence key keeps both, correctly: the heading on
     the page and the label in the menu are two places the same
     translation is read. */
  { file: 'content/syllabus.js', kind: 'syllabus unit title',
    topic: 'syllabus', keyIsSubject: true },
  { file: 'config/pages.js', kind: 'unit title', topic: 'navigation',
    keyIsSubject: true },
  { file: 'config/site.js', kind: 'subject title', topic: 'navigation' },
  { file: 'config/brand.js', kind: 'brand name', topic: 'the product name' }
];

function collectDataModules(){
  /* which lesson uses which diagram, read from the placeholders */
  const lessonDir = path.join(SRC, 'content/lessons');
  const lessonSrc = {};
  for (const f of fs.readdirSync(lessonDir).filter(f => f.endsWith('.html'))){
    lessonSrc[f.replace(/\.html$/, '')] = fs.readFileSync(path.join(lessonDir, f), 'utf8');
  }
  const diaUse = {};
  const headingUse = {};
  for (const [sec, html] of Object.entries(lessonSrc)){
    for (const m of html.matchAll(/\{\{dia:([A-Za-z0-9_]+)\}\}/g)){
      (diaUse[m[1]] = diaUse[m[1]] || []).push(sec);
    }
  }
  const metaFor = secs => {
    const out = [];
    for (const s of [...new Set(secs)]){
      if (SECTION[s]) out.push(SECTION[s]);
    }
    return out.length ? out : [{ subject: '(not used by any lesson)', unitNo: '-', unitTitle: '', marks: 0 }];
  };

  for (const d of DATA_MODULES){
    const files = d.dir
      ? fs.readdirSync(path.join(SRC, d.dir)).filter(f => f.endsWith('.js')).map(f => d.dir + '/' + f)
      : [d.file];
    for (const rel of files){
      const abs = path.join(SRC, rel);
      if (!fs.existsSync(abs)) continue;
      let mod;
      try { mod = require(abs); } catch (e){ continue; }
      const found = BI.walkValue(mod, { stringMap: !!d.stringMap });
      for (const p of found){
        let metas;
        if (d.byDiagram){
          metas = metaFor(diaUse[String(p.ref).split('.')[0]] || []);
        } else if (d.byHeading){
          /* a heading's context is every lesson whose text contains it */
          if (!(p.en in headingUse)){
            headingUse[p.en] = Object.keys(lessonSrc)
              .filter(sec => lessonSrc[sec].indexOf(p.en) >= 0);
          }
          metas = metaFor(headingUse[p.en]);
        } else if (d.keyIsSubject){
          const key = String(p.ref).split('.')[0];
          metas = [{ subject: pages[key] ? key : (SUBJECT_NAME[key] ? key : key),
                     unitNo: '-', unitTitle: '', marks: 0 }];
        } else if (d.keyIsSubjectUnit){
          /* prerequisites.js keys a unit `u7` inside its subject, while a
             lesson section is `db-u7`. Resolve through pages.js on the
             unit NUMBER so the item lands on the unit's own row rather
             than inventing one called "u7". */
          const key = String(p.ref).split('.')[0];
          const subject = key.slice(0, key.lastIndexOf('/'));
          const n = key.split('/').pop().replace(/^u/, '');
          const page = ((pages[subject] || { pages: [] }).pages || [])
            .find(x => String(x.n) === n);
          metas = page && page.sec && SECTION[page.sec[0]]
            ? [SECTION[page.sec[0]]]
            : [{ subject, unitNo: n, unitTitle: page ? page.title : '', marks: 0 }];
        } else if (p.ctx && p.ctx.unit){
          metas = metaFor([p.ctx.unit]);
          if (metas[0].subject.indexOf('(') === 0 && p.ctx.subject){
            metas = [{ subject: p.ctx.subject, unitNo: p.ctx.unit,
                       unitTitle: '', marks: 0 }];
          }
        } else {
          metas = [{ subject: p.ctx && p.ctx.subject ? p.ctx.subject : '(shared across every page)',
                     unitNo: '-', unitTitle: '', marks: 0 }];
        }
        for (const meta of metas){
          add({ kind: d.kind, file: rel, meta, topic: d.topic,
                ref: p.ref, en: p.en, ne: p.ne });
        }
      }
    }
  }
}

/* -------------------------------------------------------------- compose */

collectLessons();
collectQuestions();
collectDrills();
const scanGaps = collectInlineRuntime();
collectDataModules();

/* ------------------------------------------------------- the dedup rule

   WHAT THE OLD KEY DID

       const k = items[i].id + '|' + items[i].kind;

   `id` is a hash of the NEPALI TEXT ALONE. `kind` is "quiz option" or
   "gloss". So two quiz options with the same Nepali collapsed into one
   item — whatever subject, unit or question they belonged to, and
   whichever English they were translating.

   For a repeated section label on six lesson pages that was right. For
   content it was not, and the cost is measurable:

     - 40 question-bank occurrences collapsed under that key;
     - 16 of the 40 crossed a SUBJECT boundary;
     - 5 of those 16 moved in Phase 13, which is the whole of the
       "Grade 10 lost five items" that the Phase 13 report recorded as
       harmless re-attribution. It was not harmless: a reviewer opening
       Digital Design Unit 4 could no longer see that its question 406
       offers "१६" as an option, because Grade 9's identical option had
       won the key.
     - the other 11 predate Phase 13 and nobody had noticed them.

   An option reading "चार" under a Hardware question about bus lines and
   the same "चार" under a DBMS question about cardinality are ONE
   translation and TWO things to review. Those are different counts and
   the package now reports both.

   THE KEY NOW is the occurrence: the pair, plus where it occurs. Two
   extraction patterns reaching the same text at the same place in the
   same file still collapse — that is the duplicate this is for. A
   second subject does not.

   The three functions that do it — occurrenceId, dedupeOccurrences and
   groupPairs — live in tools/nepali-bilingual.js, where they can be
   tested on plain objects without reading the repository. See
   tests/nepali-review.test.js.
   ------------------------------------------------------------------- */
const deduped = BI.dedupeOccurrences(items);
items.length = 0;
items.push(...deduped.items);
const duplicateOccurrences = deduped.duplicates;

/* Mark what Phase 9 added: present now, absent at the baseline.

   Both sides are tag-stripped and whitespace-normalised by the SAME
   function, which the first version of this did not do — the baseline
   blob was stripped and a drill's `why` string, which carries literal
   <b> markup inside a JS string, was not. Every such item compared
   unequal and was reported new. Three kinds of Nepali were wrong for
   that reason before this was caught.

   A string too short to be distinctive is reported UNKNOWN rather than
   new. "५ A" is a quiz option; whether it is "the same string" as some
   other "५ A" elsewhere is not a question this can answer, and guessing
   NEW would pad the count with items nobody changed. */
const before = baselineNepaliText();
for (const it of items){
  const probe = cmp(it.ne);
  it.phase9 = (before == null || probe.length < 8)
    ? null
    : !before.includes(probe.slice(0, 48));
  it.terms = latinTerms(it.ne);
}

items.sort((a, b) =>
  String(a.meta.subject).localeCompare(String(b.meta.subject)) ||
  String(a.meta.unitNo).localeCompare(String(b.meta.unitNo), undefined, { numeric: true }) ||
  String(a.kind).localeCompare(String(b.kind)));

/* ---------------------------------------------- pairs and occurrences

   A UNIQUE PAIR is one translation: one Nepali text, reviewed once.
   An OCCURRENCE is one place that translation is used: subject, unit,
   topic, file.

   These are not the same number and must never be printed as if they
   were. A reviewer's workload is the pair count. The platform's
   coverage is the occurrence count. "2,603 items" in the old package
   was neither — it was occurrences after some of them had been
   silently merged into each other.

   A pair whose occurrences disagree about the ENGLISH is flagged. That
   is not a bookkeeping nicety: one Nepali sentence standing in for two
   different English sentences is either a translation that fits
   neither, or two pieces of English that should have said the same
   thing. Both are findings for the reviewer, and neither is visible
   unless the contexts are kept. */
const pairs = BI.groupPairs(items);

const stats = {
  /* occurrences: every place a bilingual pair is used */
  occurrences: items.length,
  /* unique pairs: what a reviewer actually has to read */
  pairs: pairs.size,
  /* pairs used in more than one place at all */
  sharedPairs: [...pairs.values()].filter(p => p.occurrences.length > 1).length,
  /* pairs used by more than one SUBJECT — the attribution that the
     previous dedup key destroyed */
  pairsAcrossSubjects: [...pairs.values()].filter(p => p.subjects.length > 1).length,
  /* one Nepali text standing in for two different English texts */
  pairsWithEnglishVariants: [...pairs.values()].filter(p => p.enVariants.length).length,
  /* identical (pair, place, kind) reached by two extraction patterns */
  duplicateOccurrences,
  /* new since the review baseline commit */
  phase9: items.filter(i => i.phase9).length,
  phase9Pairs: [...pairs.values()].filter(p => p.phase9).length,
  /* Devanagari the scanner found but could not pair; see --audit */
  unsupportedPatterns: scanGaps.filter(u => !u.fragment).length,
  unsupportedFragments: scanGaps.filter(u => u.fragment).length,
  /* NOT A MEASURE OF QUALITY. It is zero, and it stays zero until a
     Nepali-speaking teacher has actually read an item and said so. No
     code path in this tool can raise it: it is counted from statuses
     carried forward out of the previous ledger file, which is where a
     returned review is recorded by hand. */
  humanReviewed: 0,
  /* kept for continuity with the previous ledger, which called the
     occurrence count `total` */
  total: items.length,
  byKind: {},
  bySubject: {}
};
for (const it of items){
  stats.byKind[it.kind] = (stats.byKind[it.kind] || 0) + 1;
  const s = it.meta.subject;
  stats.bySubject[s] = stats.bySubject[s] || { total: 0, pairs: 0, phase9: 0 };
  stats.bySubject[s].total++;
  if (it.phase9) stats.bySubject[s].phase9++;
}
for (const p of pairs.values()){
  for (const s of p.subjects) if (stats.bySubject[s]) stats.bySubject[s].pairs++;
}

/* ------------------------------------------- carry a review forward

   A reviewer's verdict is recorded in the ledger file by hand, keyed
   by occurrence id where one exists and by pair id otherwise. It must
   survive regeneration — losing it would mean asking for the review
   twice — so the previous ledger is read before this one replaces it.

   Only a status that is NOT the default is carried. Nothing in here
   can invent one. */
const PREV = path.join(ROOT, 'docs', 'nepali-review-items.json');
let prevItems = [];
if (fs.existsSync(PREV)){
  try {
    prevItems = JSON.parse(fs.readFileSync(PREV, 'utf8')).items || [];
  } catch (e){
    console.error('! the previous ledger could not be read; no review status is carried forward');
  }
}
const carried = BI.carryStatus(items, prevItems);
stats.humanReviewed = items.filter(i => i.status === 'human-reviewed').length;
void carried;
stats.withReviewerVerdict = items.filter(i => i.status !== 'pending-review').length;

/* ------------------------------------------------------------- audit

   The question this answers is not "how many pairs did we find" — a
   collector can always be asked how much it found and will always say
   "all of it". It is "how much Devanagari is in the shipped source,
   and how much of it is in the package".

   Literals are the denominator because they are countable without
   reference to any collector. A file's Nepali either reaches a
   reviewer or it does not. */
function audit(){
  const out = [];
  let total = 0, covered = 0;
  const blob = items.map(i => cmp(i.ne)).join(' \u0000 ');
  const walk = (d, pre) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })){
      if (e.name === 'archive') continue;
      if (e.isDirectory()) walk(path.join(d, e.name), pre + e.name + '/');
      else if (e.name.endsWith('.js')) files.push(pre + e.name);
    }
  };
  const files = [];
  walk(SRC, '');
  files.sort();
  for (const rel of files){
    const src = fs.readFileSync(path.join(SRC, rel), 'utf8');
    if (!DEVA.test(src)) continue;
    let n = 0, c = 0;
    const missing = [];
    for (const lit of BI.devaLiterals(BI.blankNoise(src))){
      const text = cmp(BI.stripMarkup(BI.unquote(lit.text)));
      const deva = (text.match(/[ऀ-ॿ]/g) || []).length;
      if (deva < 3) continue;                /* a fragment, not a sentence */
      n++;
      const probe = text.slice(0, 40);
      if (blob.includes(probe)) c++;
      else missing.push(BI.lineAt(src, lit.at) + ': ' + text.slice(0, 70));
    }
    if (!n) continue;
    total += n; covered += c;
    out.push({ file: rel, literals: n, inPackage: c, missing });
  }
  return { total, covered, files: out };
}

if (process.argv.includes('--audit')){
  const a = audit();
  console.log('DEVANAGARI LITERAL AUDIT — _source/**/*.js');
  console.log('(lesson HTML is read directly by collectLessons and is not counted here)\n');
  for (const f of a.files.slice().sort((x, y) =>
      (y.literals - y.inPackage) - (x.literals - x.inPackage))){
    const gap = f.literals - f.inPackage;
    console.log(f.file.padEnd(46) + 'literals=' + String(f.literals).padStart(4) +
                '  in package=' + String(f.inPackage).padStart(4) +
                '  MISSING=' + String(gap).padStart(4));
    if (process.argv.includes('--detail')){
      for (const x of f.missing.slice(0, 8)) console.log('      ' + x);
      if (f.missing.length > 8) console.log('      … +' + (f.missing.length - 8) + ' more');
    }
  }
  console.log('\ntotal literals      : ' + a.total);
  console.log('in the package      : ' + a.covered);
  console.log('missing             : ' + (a.total - a.covered));
  console.log('\nshapes the scanner could not pair (reported, not dropped):');
  for (const u of scanGaps.filter(u => !u.fragment)){
    console.log('  ' + u.file + ':' + u.line + '  ' + u.snippet.slice(0, 70));
  }
  console.log('  ' + scanGaps.filter(u => u.fragment).length +
              ' further Devanagari fragments too short to review on their own');
  process.exit(0);
}

if (process.argv.includes('--stats')){
  console.log(JSON.stringify(stats, null, 2));
  process.exit(0);
}

/* ------------------------------------------------------------ the JSON */

const json = {
  generated: new Date().toISOString().slice(0, 10),
  baseline: BASELINE,
  note: 'Generated by tools/nepali-review.js. Do not edit by hand — regenerate. ' +
        'Reviewer answers belong in docs/NEPALI-REVIEW-STATUS.md, keyed by item id.',
  stats,
  /* ONE ENTRY PER UNIQUE PAIR — what a reviewer reads, and the thing a
     returned verdict is really about. `occurrences` names every place
     it is used, so ticking it once cannot lose a context. */
  pairs: [...pairs.values()].map(p => ({
    id: p.id, ne: p.ne, en: p.en,
    englishVariants: p.enVariants,
    subjects: p.subjects,
    occurrences: p.occurrences,
    occurrenceCount: p.occurrences.length,
    phase9: p.phase9, terms: p.terms
  })),
  /* ONE ENTRY PER OCCURRENCE — where each pair appears. `status` is
     per occurrence so a translation can be right in one unit and wrong
     in another, which is the commonest real review outcome for a
     string that was reused. */
  items: items.map(i => ({
    occId: i.occId, id: i.id, pairId: i.pairId, status: i.status,
    reviewNote: i.reviewNote || null,
    subject: i.meta.subject, unit: i.meta.unitNo, unitTitle: i.meta.unitTitle,
    marks: i.meta.marks, topic: i.topic, kind: i.kind, ref: i.ref || null,
    file: i.file, anchor: i.anchor || null,
    sharedWith: i.sharedWith, alsoIn: i.alsoIn,
    interpolated: i.interpolated || false,
    phase9: i.phase9, terms: i.terms, en: i.en, ne: i.ne
  }))
};
fs.writeFileSync(path.join(ROOT, 'docs', 'nepali-review-items.json'),
  JSON.stringify(json, null, 1) + '\n', 'utf8');

/* ------------------------------------------------------------ the HTML */

const BY_SUBJECT = {};
for (const it of items){
  const s = it.meta.subject;
  (BY_SUBJECT[s] = BY_SUBJECT[s] || {});
  const u = it.meta.unitNo;
  (BY_SUBJECT[s][u] = BY_SUBJECT[s][u] || { title: it.meta.unitTitle, marks: it.meta.marks, items: [] })
    .items.push(it);
}

function itemHTML(it){
  const p = pairs.get(it.id);
  const alsoHere = p.occurrences.length - 1;
  return `
  <article class="item${it.phase9 ? ' is-new' : ''}" id="${esc(it.occId)}">
    <header>
      <span class="id">${esc(it.occId)}</span>
      <span class="kind">${esc(it.kind)}</span>
      ${it.phase9 ? '<span class="new">new since the baseline</span>' : ''}
      ${it.ref ? '<span class="ref">' + esc(it.ref) + '</span>' : ''}
      ${it.status !== 'pending-review' ? '<span class="new">' + esc(it.status) + '</span>' : ''}
    </header>
    <p class="where">${esc(it.topic || '')} <span class="file">${esc(it.file)}</span></p>
    ${alsoHere ? '<p class="reuse"><b>This same Nepali is used in ' + alsoHere +
      ' other place' + (alsoHere === 1 ? '' : 's') + '</b>' +
      (it.alsoIn.length ? ', including ' + it.alsoIn.map(s => esc(SUBJECT_NAME[s] || s)).join(' and ') : ' in this subject') +
      '. Translation id <code>' + esc(it.id) + '</code>' +
      (it.interpolated ? ' · a number or name is filled in where <code>' + esc(BI.PLACEHOLDER) + '</code> stands' : '') +
      '</p>' : (it.interpolated ? '<p class="reuse">A number or name is filled in at run time where <code>' +
        esc(BI.PLACEHOLDER) + '</code> stands.</p>' : '')}
    ${p.enVariants.length ? '<p class="reuse"><b>This one Nepali text stands in for ' +
      (p.enVariants.length + 1) + ' different English texts.</b> The others read: ' +
      p.enVariants.slice(0, 3).map(v => '“' + esc(v.slice(0, 120)) + '”').join('; ') + '</p>' : ''}
    ${it.evidence ? '<pre class="evidence">' + esc(it.evidence) + '</pre>' : ''}
    <div class="texts">
      <div class="en"><span class="lbl">English — what it is meant to say</span>
        <p>${esc(it.en)}</p></div>
      <div class="ne"><span class="lbl">नेपाली — the text under review</span>
        <p lang="ne">${esc(it.ne)}</p></div>
    </div>
    ${it.terms.length ? '<p class="terms"><span class="lbl">Technical terms left in English:</span> ' +
      it.terms.map(t => '<code>' + esc(t) + '</code>').join(' ') + '</p>' : ''}
    <div class="review">
      <span class="lbl">Reviewer</span>
      <div class="status">
        <label><input type="checkbox"> Accepted</label>
        <label><input type="checkbox"> Correction required</label>
      </div>
      <div class="field" contenteditable="true" data-ph="Correction, or a note on why this is wrong…"></div>
    </div>
  </article>`;
}

let body = '';
for (const [subject, units] of Object.entries(BY_SUBJECT)){
  const n = Object.values(units).reduce((a, u) => a + u.items.length, 0);
  body += `<section class="subject"><h2>${esc(SUBJECT_NAME[subject] || subject)}
    <span class="count">${n} items</span></h2>`;
  const keys = Object.keys(units).sort((a, b) =>
    String(a).localeCompare(String(b), undefined, { numeric: true }));
  for (const u of keys){
    const unit = units[u];
    body += `<section class="unit" id="s-${esc(subject.replace(/\W+/g, '-'))}-${esc(String(u))}">
      <h3>${u === '-' ? '' : 'Unit ' + esc(u) + ' — '}${esc(unit.title || subject)}
      ${unit.marks ? '<span class="marks">' + unit.marks + ' marks</span>' : ''}
      <span class="count">${unit.items.length} items</span></h3>`;
    body += unit.items.map(itemHTML).join('');
    body += '</section>';
  }
  body += '</section>';
}

const kindRows = Object.entries(stats.byKind).sort((a, b) => b[1] - a[1])
  .map(([k, v]) => `<tr><td>${esc(k)}</td><td>${v}</td></tr>`).join('');
const subjRows = Object.entries(stats.bySubject)
  .map(([k, v]) => `<tr><td>${esc(SUBJECT_NAME[k] || k)}</td><td>${v.total}</td><td>${v.pairs}</td><td>${v.phase9}</td></tr>`).join('');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Gyansetu — Nepali review package</title>
<style>
 :root{ --ink:#1a1a1a; --dim:#5a5a5a; --line:#d8d4cc; --paper:#fdfcf9;
        --ne:#1d3557; --new:#8a5a00; --newbg:#fff8e6; }
 *{ box-sizing:border-box }
 body{ margin:0; padding:0 20px 80px; background:var(--paper); color:var(--ink);
       font:16px/1.65 Georgia,"Noto Serif",serif; }
 .wrap{ max-width:900px; margin:0 auto }
 h1{ font-size:1.9rem; margin:32px 0 6px }
 .sub{ color:var(--dim); margin:0 0 24px }
 h2{ font-size:1.35rem; border-bottom:2px solid var(--ink); padding-bottom:6px; margin:48px 0 4px }
 h3{ font-size:1.05rem; margin:28px 0 10px; color:var(--dim); font-weight:normal }
 .count,.marks{ font-size:.75rem; color:var(--dim); font-family:system-ui,sans-serif;
                border:1px solid var(--line); padding:1px 7px; border-radius:10px; margin-left:8px }
 .intro{ border:1px solid var(--line); background:#fff; padding:18px 20px; border-radius:8px }
 .intro ol{ margin:10px 0 0; padding-left:20px }
 .item{ border:1px solid var(--line); border-radius:8px; background:#fff;
        padding:14px 16px; margin:14px 0; page-break-inside:avoid }
 .item.is-new{ border-color:#e3c37a; background:var(--newbg) }
 .item header{ display:flex; flex-wrap:wrap; gap:8px; align-items:center;
               font-family:system-ui,sans-serif; font-size:.72rem; margin-bottom:4px }
 .id{ font-family:ui-monospace,monospace; color:var(--dim) }
 .kind{ text-transform:uppercase; letter-spacing:.06em; color:var(--dim) }
 .new{ color:var(--new); font-weight:600 }
 .ref{ color:var(--dim); font-family:ui-monospace,monospace }
 .where{ margin:0 0 10px; font-size:.82rem; color:var(--dim) }
 .reuse{ margin:0 0 10px; font-size:.8rem; color:var(--new); background:var(--newbg);
         border-left:3px solid #e3c37a; padding:6px 10px; border-radius:0 4px 4px 0 }
 .reuse code{ font-family:ui-monospace,monospace; font-size:.75rem }
 .file{ font-family:ui-monospace,monospace; font-size:.75rem; margin-left:8px }
 .evidence{ font-family:ui-monospace,monospace; font-size:.78rem; background:#f4f2ec;
            border:1px solid var(--line); border-radius:6px; padding:8px 10px; overflow-x:auto }
 .texts{ display:grid; grid-template-columns:1fr 1fr; gap:14px }
 @media (max-width:760px){ .texts{ grid-template-columns:1fr } }
 .lbl{ display:block; font-family:system-ui,sans-serif; font-size:.68rem;
       text-transform:uppercase; letter-spacing:.06em; color:var(--dim); margin-bottom:3px }
 .texts p{ margin:0 }
 .ne p{ color:var(--ne); font-family:"Noto Sans Devanagari","Mangal",sans-serif; line-height:1.9 }
 .terms{ margin:10px 0 0; font-size:.8rem }
 .terms code{ background:#f0eee8; padding:1px 5px; border-radius:3px; font-size:.78rem }
 .review{ margin-top:12px; border-top:1px dashed var(--line); padding-top:10px }
 .status{ display:flex; gap:18px; font-family:system-ui,sans-serif; font-size:.82rem; margin:4px 0 8px }
 .field{ min-height:52px; border:1px solid var(--line); border-radius:6px; padding:8px 10px;
         background:#fffef9; font-size:.9rem }
 .field:empty::before{ content:attr(data-ph); color:#aaa }
 table{ border-collapse:collapse; margin:14px 0; font-size:.85rem;
        font-family:system-ui,sans-serif }
 td,th{ border:1px solid var(--line); padding:4px 10px; text-align:left }
 .warn{ border-left:4px solid #b4541f; background:#fff4ee; padding:12px 16px; margin:18px 0;
        border-radius:0 6px 6px 0 }
 .bar{ position:sticky; top:0; z-index:5; background:var(--paper); border-bottom:1px solid var(--line);
       padding:10px 0; margin-bottom:8px; font-family:system-ui,sans-serif; font-size:.82rem;
       display:flex; flex-wrap:wrap; gap:8px; align-items:center }
 .bar button{ font:inherit; padding:5px 12px; border:1px solid var(--line); background:#fff;
              border-radius:14px; cursor:pointer; color:var(--ink) }
 .bar button[aria-pressed="true"]{ background:var(--ink); color:#fff; border-color:var(--ink) }
 .bar .note{ color:var(--dim) }
 .toc{ font-family:system-ui,sans-serif; font-size:.85rem; columns:2; column-gap:30px }
 .toc a{ color:var(--ne) }
 @media (max-width:700px){ .toc{ columns:1 } .bar{ font-size:.78rem } }
 .hidden{ display:none !important }
 @media print{ body{ background:#fff } .item{ break-inside:avoid } .field{ min-height:60px }
                .bar{ position:static } }
</style>
</head>
<body><div class="wrap">

<h1>Gyansetu — Nepali review package</h1>
<p class="sub">Generated ${json.generated} from the content itself, by
<code>tools/nepali-review.js</code>. <b>${stats.pairs} distinct translations</b>,
used in <b>${stats.occurrences} places</b> across the platform.
${stats.phase9Pairs} of the translations are new since the review baseline
(commit ${BASELINE}).</p>

<div class="warn">
<b>No review has taken place.</b> This document is the request for one. Every item
below is <b>Pending review</b> until a Nepali-speaking Computer Engineering teacher
has read it and said otherwise. Nothing here has been checked by a human for natural
wording or reading level.
${stats.humanReviewed ? '<p><b>' + stats.humanReviewed + '</b> occurrences carry a recorded human verdict.</p>' : ''}
</div>

<div class="intro">
<b>What this is, and what we are asking.</b> Gyansetu teaches Nepal's CDC Computer
Engineering curriculum for Grades 9 and 10 in English and Nepali at the same time.
Every item below is one pair: an English text, and the Nepali meant to say the same
thing to the same student.
<ol>
  <li>Read the Nepali. Does it say what the English says?</li>
  <li>Would a Grade 9 or 10 student read it naturally — or does it read as translation?</li>
  <li>Is the technical terminology the wording a Nepali teacher would use in class?</li>
  <li>Items marked <b>new since the baseline</b> are the newest and least reviewed. If
      time is short, start there.</li>
</ol>
<b>Two numbers, not one.</b> ${stats.pairs} translations are used in
${stats.occurrences} places: ${stats.sharedPairs} of them appear more than once, and
${stats.pairsAcrossSubjects} are shared between <i>different subjects</i>. An item
that is reused says so, and lists the other places — because a sentence that reads
well in one unit can read wrongly in another, and that is worth saying separately.
${stats.pairsWithEnglishVariants ? '<p><b>' + stats.pairsWithEnglishVariants +
  ' translations stand in for more than one English text.</b> Those are marked, and are' +
  ' worth a second look: one Nepali sentence doing two jobs usually fits neither.</p>' : ''}
<p>Tick a box and write in the field under any item. The boxes and fields are for
writing in on screen or on paper; nothing is sent anywhere.</p>
</div>

<h2>What is in the package
  <span class="count">${stats.pairs} translations</span>
  <span class="count">${stats.occurrences} occurrences</span></h2>
<table><tr><th>Subject</th><th>Occurrences</th><th>Translations</th><th>New since baseline</th></tr>${subjRows}</table>
<table><tr><th>Kind</th><th>Occurrences</th></tr>${kindRows}</table>

<h2>Where to start</h2>
<p>If you have an hour rather than a week, read the <b>${stats.phase9} occurrences new
since the baseline</b> — press the button below to hide everything else. They are the
newest Nepali on the site and the least looked at. Everything else has at least
shipped and been read by students.</p>

<div class="toc">${
  Object.entries(BY_SUBJECT).map(([s, units]) => {
    const keys = Object.keys(units).sort((a, b) =>
      String(a).localeCompare(String(b), undefined, { numeric: true }));
    return '<p><b>' + esc(SUBJECT_NAME[s] || s) + '</b><br>' +
      keys.map(u => '<a href="#s-' + esc(s.replace(/\W+/g, '-')) + '-' + esc(String(u)) + '">' +
        (u === '-' ? 'shared' : 'Unit ' + esc(String(u))) + '</a> <span class="count">' +
        units[u].items.length + '</span>').join(' · ') + '</p>';
  }).join('')
}</div>

<div class="bar">
  <span class="note">Show:</span>
  <button type="button" data-filter="all" aria-pressed="true">Everything (${stats.occurrences})</button>
  <button type="button" data-filter="new" aria-pressed="false">New since the baseline (${stats.phase9})</button>
  <span class="note" id="shown"></span>
</div>

${body}

<script>
(function(){
  var items = document.querySelectorAll('.item');
  var shown = document.getElementById('shown');
  function apply(mode){
    var n = 0;
    for (var i = 0; i < items.length; i++){
      var keep = mode === 'all' || items[i].classList.contains('is-new');
      items[i].classList.toggle('hidden', !keep);
      if (keep) n++;
    }
    /* a unit whose every item is hidden is noise, so hide its heading too */
    var units = document.querySelectorAll('section.unit');
    for (var u = 0; u < units.length; u++){
      units[u].classList.toggle('hidden', !units[u].querySelector('.item:not(.hidden)'));
    }
    var subs = document.querySelectorAll('section.subject');
    for (var s = 0; s < subs.length; s++){
      subs[s].classList.toggle('hidden', !subs[s].querySelector('.item:not(.hidden)'));
    }
    shown.textContent = n + ' showing';
  }
  var btns = document.querySelectorAll('.bar button');
  for (var b = 0; b < btns.length; b++){
    btns[b].addEventListener('click', function(){
      for (var k = 0; k < btns.length; k++) btns[k].setAttribute('aria-pressed', 'false');
      this.setAttribute('aria-pressed', 'true');
      apply(this.getAttribute('data-filter'));
    });
  }
  apply('all');
})();
</script>

</div></body></html>
`;

fs.writeFileSync(path.join(ROOT, 'docs', 'NEPALI-REVIEW-PACKAGE.html'), html, 'utf8');

console.log('Nepali review package');
console.log('  distinct translations    : ' + stats.pairs);
console.log('  occurrences of them      : ' + stats.occurrences);
console.log('    reused somewhere       : ' + stats.sharedPairs);
console.log('    reused across subjects : ' + stats.pairsAcrossSubjects);
console.log('    one Nepali, two English: ' + stats.pairsWithEnglishVariants);
console.log('  duplicate occurrences    : ' + stats.duplicateOccurrences + ' (collapsed)');
console.log('  new since baseline       : ' + stats.phase9Pairs + ' translations, ' +
            stats.phase9 + ' occurrences');
console.log('  human-reviewed           : ' + stats.humanReviewed +
            (stats.humanReviewed ? '' : '   (no review has taken place)'));
console.log('  unpaired Devanagari      : ' + stats.unsupportedPatterns +
            ' strings, ' + stats.unsupportedFragments + ' fragments — see --audit');
console.log('  wrote docs/NEPALI-REVIEW-PACKAGE.html');
console.log('  wrote docs/nepali-review-items.json');
