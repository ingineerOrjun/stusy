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

/* ---- 4. runtime labels that carry Nepali ---- */
function collectRuntimeStrings(){
  const f = path.join(SRC, 'runtime/services/strings.js');
  if (!fs.existsSync(f)) return;
  const src = fs.readFileSync(f, 'utf8');
  for (const m of src.matchAll(
    /(['"]?)([A-Za-z0-9_.]+)\1\s*:\s*\{\s*en\s*:\s*(['"])([\s\S]*?)\3\s*,\s*ne\s*:\s*(['"])([\s\S]*?)\5/g)){
    if (!DEVA.test(m[6])) continue;
    add({ kind: 'interface label', file: 'runtime/services/strings.js',
          meta: { subject: '(shared across every page)', unitNo: '-', unitTitle: '', marks: 0 },
          topic: 'user interface', ref: m[2], en: m[4], ne: m[6] });
  }
}

/* -------------------------------------------------------------- compose */

collectLessons();
collectQuestions();
collectDrills();
collectRuntimeStrings();

/* de-duplicate: the same string may be matched by two patterns */
{
  const seen = new Set();
  for (let i = items.length - 1; i >= 0; i--){
    const k = items[i].id + '|' + items[i].kind;
    if (seen.has(k)) items.splice(i, 1); else seen.add(k);
  }
}

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

const stats = {
  total: items.length,
  phase9: items.filter(i => i.phase9).length,
  byKind: {},
  bySubject: {}
};
for (const it of items){
  stats.byKind[it.kind] = (stats.byKind[it.kind] || 0) + 1;
  const s = it.meta.subject;
  stats.bySubject[s] = stats.bySubject[s] || { total: 0, phase9: 0 };
  stats.bySubject[s].total++;
  if (it.phase9) stats.bySubject[s].phase9++;
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
  items: items.map(i => ({
    id: i.id, status: 'pending-review',
    subject: i.meta.subject, unit: i.meta.unitNo, unitTitle: i.meta.unitTitle,
    marks: i.meta.marks, topic: i.topic, kind: i.kind, ref: i.ref || null,
    file: i.file, anchor: i.anchor || null,
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
  return `
  <article class="item${it.phase9 ? ' is-new' : ''}" id="${esc(it.id)}">
    <header>
      <span class="id">${esc(it.id)}</span>
      <span class="kind">${esc(it.kind)}</span>
      ${it.phase9 ? '<span class="new">added in Phase 9</span>' : ''}
      ${it.ref ? '<span class="ref">' + esc(it.ref) + '</span>' : ''}
    </header>
    <p class="where">${esc(it.topic || '')} <span class="file">${esc(it.file)}</span></p>
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
  .map(([k, v]) => `<tr><td>${esc(SUBJECT_NAME[k] || k)}</td><td>${v.total}</td><td>${v.phase9}</td></tr>`).join('');

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
<code>tools/nepali-review.js</code>. ${stats.total} bilingual items,
${stats.phase9} of them added or changed in Phase 9.</p>

<div class="warn">
<b>No review has taken place.</b> This document is the request for one. Every item
below is <b>Pending review</b> until a Nepali-speaking Computer Engineering teacher
has read it and said otherwise. Nothing here has been checked by a human for natural
wording or reading level.
</div>

<div class="intro">
<b>What this is, and what we are asking.</b> Gyansetu teaches Nepal's CDC Grade 10
Computer Engineering curriculum in English and Nepali at the same time. Every item
below is one pair: an English text, and the Nepali meant to say the same thing to the
same student.
<ol>
  <li>Read the Nepali. Does it say what the English says?</li>
  <li>Would a Grade 10 student read it naturally — or does it read as translation?</li>
  <li>Is the technical terminology the wording a Nepali teacher would use in class?</li>
  <li>Items marked <b>added in Phase 9</b> are the newest and least reviewed. If time
      is short, start there.</li>
</ol>
Tick a box and write in the field under any item. The boxes and fields are for writing
in on screen or on paper; nothing is sent anywhere.
</div>

<h2>What is in the package <span class="count">${stats.total} items</span></h2>
<table><tr><th>Subject</th><th>Items</th><th>Added in Phase 9</th></tr>${subjRows}</table>
<table><tr><th>Kind</th><th>Items</th></tr>${kindRows}</table>

<h2>Where to start</h2>
<p>If you have an hour rather than a week, read the <b>${stats.phase9} items added in
Phase 9</b> — press the button below to hide everything else. They are the newest
Nepali on the site and the least looked at. Everything else has at least shipped and
been read by students.</p>

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
  <button type="button" data-filter="all" aria-pressed="true">Everything (${stats.total})</button>
  <button type="button" data-filter="new" aria-pressed="false">Added in Phase 9 (${stats.phase9})</button>
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
console.log('  items            : ' + stats.total);
console.log('  added in Phase 9 : ' + stats.phase9);
console.log('  wrote docs/NEPALI-REVIEW-PACKAGE.html');
console.log('  wrote docs/nepali-review-items.json');
