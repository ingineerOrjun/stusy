/* The content contract. These tests are what let a new subject be added
   with confidence: violate the contract and the suite fails here, not in
   a student's browser. */
const { test } = require('node:test');
const assert = require('node:assert');
const path = require('node:path');

const SRC = path.resolve(__dirname, '..', '_source');
const ctx      = require(path.join(SRC, 'build', 'context.js'));
const validate = require(path.join(SRC, 'build', 'validate.js'));
const diagrams = require(path.join(SRC, 'diagrams.js'));

const site = ctx.site, syllabus = ctx.syllabus, pages = ctx.pages;

test('the current content passes validation', () => {
  assert.doesNotThrow(() => validate({ site, syllabus, pages, diagrams, ctx }));
});

test('validation rejects a subject missing its Nepali name', () => {
  const broken = JSON.parse(JSON.stringify(site));
  delete broken[0].subjects[0].np;
  assert.throws(
    () => validate({ site: broken, syllabus, pages, diagrams, ctx }),
    /missing Nepali name/,
    'a missing bilingual field must fail the build'
  );
});

test('validation rejects a duplicate subject slug', () => {
  const broken = JSON.parse(JSON.stringify(site));
  broken[0].subjects[1].slug = broken[0].subjects[0].slug;
  assert.throws(
    () => validate({ site: broken, syllabus, pages, diagrams, ctx }),
    /duplicate slug/
  );
});

test('validation rejects a syllabus whose hours do not total 64', () => {
  const broken = JSON.parse(JSON.stringify(syllabus));
  broken['grade9/c-programming'][0].h += 5;
  assert.throws(
    () => validate({ site, syllabus: broken, pages, diagrams, ctx }),
    /hours total 69, curriculum requires 64/
  );
});

test('validation rejects an unknown diagram reference', () => {
  assert.throws(
    () => validate({ site, syllabus, pages, diagrams: { onlyOne: '<svg/>' }, ctx }),
    /references unknown diagram/
  );
});

test('validation rejects a page pointing at content that does not exist', () => {
  const broken = JSON.parse(JSON.stringify(pages));
  broken['grade10/oop-cpp'].pages[0].sec = ['does-not-exist'];
  assert.throws(
    () => validate({ site, syllabus, pages: broken, diagrams, ctx }),
    /no content found for section/
  );
});

test('every grade and subject carries both languages', () => {
  for (const g of site){
    assert.ok(g.label && g.np, 'grade ' + g.id + ' is missing a language');
    for (const s of g.subjects){
      assert.ok(s.name && s.short && s.np, 'subject ' + g.id + '/' + s.slug + ' is missing a language');
    }
  }
});

test('every syllabus unit carries both languages and at least one topic', () => {
  for (const [key, units] of Object.entries(syllabus)){
    for (const u of units){
      assert.ok(u.t,  key + ': unit missing English title');
      assert.ok(u.np, key + ': unit "' + u.t + '" missing Nepali title');
      assert.ok(Array.isArray(u.c) && u.c.length, key + ': unit "' + u.t + '" has no topics');
    }
  }
});

test('syllabus totals match the curriculum', () => {
  const units = Object.values(syllabus).reduce((a, u) => a + u.length, 0);
  const topics = Object.values(syllabus).reduce((a, u) => a + u.reduce((b, x) => b + x.c.length, 0), 0);
  /* Phase 9 added the DS & OOP outline (6 units, 35 topics), which had
     been missing since the subject was written: 7 -> 8 subjects,
     46 -> 52 units, 284 -> 319 topics. Every authored Grade 10 subject
     now has an outline, so every one can be coverage-checked.

     Phase 12: 319 -> 318. Not a loss of curriculum — a correction to it.
     Verifying Grade 9 Fundamentals of Computer and Application against
     the CDC scope and sequence, by two independent extractions, showed
     that official topic 2.3 is ONE topic carrying two bullets, softcopy
     and hardcopy output devices. The outline had promoted the second
     bullet to a numbered topic of its own, which pushed 2.4 and 2.5 out
     of step with the numbering a student reads in the curriculum.
     Merged back: that subject 37 -> 36, Grade 9 169 -> 168, total 318.

     This test failing is the system working. A total that moves without
     a reason beside it is how a curriculum drifts. */
  assert.strictEqual(Object.keys(syllabus).length, 8, 'expected 8 outlined subjects');
  assert.strictEqual(units, 52,  'expected 52 outlined units');
  assert.strictEqual(topics, 318, 'expected 318 outlined topics');
});

test('every authored subject has a coverage map, and it is complete', () => {
  /* The build gate is opt-in per subject: a subject with no entry in
     coverage.js is simply not checked. That is the right default for an
     unauthored outline and the wrong one for an authored subject, where
     silence looks exactly like success.

     This asserts the opt-in itself. Before the Phase 9 continuation, two
     of the four authored Grade 10 subjects — DBMS and Digital Design,
     twenty-seven marks of the paper between them — had outlines, had
     lessons, and were not checked against either. */
  const coverage = require(path.join(SRC, 'content', 'coverage.js'));
  const pages = require(path.join(SRC, 'config', 'pages.js'));

  const authored = Object.keys(pages).filter(k => (pages[k].pages || [])
    .some(p => typeof p.hrs === 'number'));
  assert.ok(authored.length >= 4, 'expected at least 4 authored subjects');

  for (const subject of authored){
    assert.ok(coverage[subject],
      subject + ' has authored lessons and no coverage map, so nothing checks ' +
      'whether its official topics were ever written');

    /* And the map must account for every topic of every unit that HAS a
       page — not merely exist.

       Phase 12: "every topic" became "every topic of an authored unit".
       Grade 9 Fundamentals is being written one unit at a time, and
       requiring a map entry for Unit 4 while Unit 4 is unwritten asserts
       that content is missing when nobody claimed to have written it.
       For a finished subject the two are the same set, so Grade 10 is
       checked exactly as strictly as before. */
    const outline = syllabus[subject] || [];
    const authoredUnits = new Set(pages[subject].pages
      .filter(p => typeof p.hrs === 'number').map(p => String(p.n)));
    const official = outline.flatMap((u, i) =>
      authoredUnits.has(String(i + 1)) ? (u.c || []) : []);
    assert.ok(official.length, subject + ': no authored unit to check against');
    const missing = official.filter(t => !(t in coverage[subject]));
    assert.deepStrictEqual(missing, [],
      subject + ': topics in an authored unit with no entry in the coverage map');
  }
});

test('every syllabus key maps to a real subject in the site map', () => {
  const known = new Set();
  site.forEach(g => g.subjects.forEach(s => known.add(g.id + '/' + s.slug)));
  for (const key of Object.keys(syllabus)){
    assert.ok(known.has(key), 'orphan syllabus entry: ' + key);
  }
});

test('every diagram in the library is used by some lesson', () => {
  const fs = require('node:fs');
  const dir = path.join(SRC, 'content', 'lessons');
  const used = new Set();
  for (const f of fs.readdirSync(dir)){
    const html = fs.readFileSync(path.join(dir, f), 'utf8');
    for (const m of html.matchAll(/\{\{dia:([A-Za-z0-9_]+)\}\}/g)) used.add(m[1]);
  }
  const orphans = Object.keys(diagrams).filter(d => !used.has(d));
  assert.deepStrictEqual(orphans, [], 'diagrams defined but never used');
  assert.ok(Object.keys(diagrams).length >= 22,
    'the library should only grow, found ' + Object.keys(diagrams).length);
});

test('every authored lesson resolves through the content layer', () => {
  for (const id of ['u1','u2','u3','u4','u5','u6']){
    const s = ctx.section(id);
    assert.ok(s.authored, id + ' should resolve as an authored lesson');
    assert.match(s.html, /<section/, id + ' should contain a section element');
  }
});

test('shared page sections resolve and are not marked authored', () => {
  for (const id of ['trace','tables','terms','quiz']){
    const s = ctx.section(id);
    assert.strictEqual(s.authored, false, id + ' should be a shared section');
    assert.ok(s.html.length > 100, id + ' section looks empty');
  }
});

test('a subject never shows its external paper as if it were the whole subject', () => {
  /* The CDC curriculum, §7 Student Evaluation: "Internal evaluation
     covers 50 Percent weightage." Each subject is 100 marks — 50 from
     the theory paper the specification grid describes, and 50 awarded
     by the school for practical work, trimester tests and
     participation.

     Three of the four subject heroes used to show a bare "50 marks"
     pill and the fourth showed "50 external marks". A student reading
     any of those three had no way to know the number was half the
     subject, and the inconsistency between the four is what made it
     visible at all. */
  const fs = require('node:fs');
  const dir = path.join(SRC, 'content', 'sections');
  const offenders = [];
  for (const f of fs.readdirSync(dir).filter(n => /hero\.html$/.test(n))){
    const html = fs.readFileSync(path.join(dir, f), 'utf8');
    for (const m of html.matchAll(/>\s*(50[^<]*marks?)\s*</gi)){
      if (!/external/i.test(m[1])) offenders.push(f + ': "' + m[1].trim() + '"');
    }
  }
  assert.deepStrictEqual(offenders, [],
    'these show the 50-mark theory paper without saying it is the external half: ' +
    offenders.join('; '));
});
