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
  assert.strictEqual(Object.keys(syllabus).length, 7, 'expected 7 outlined subjects');
  assert.strictEqual(units, 46,  'expected 46 outlined units');
  assert.strictEqual(topics, 284, 'expected 284 outlined topics');
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
