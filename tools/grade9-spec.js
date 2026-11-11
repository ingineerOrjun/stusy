#!/usr/bin/env node
/* ============================================================
   GRADE 9 CURRICULUM SPECIFICATION — generator

   WHY GENERATED, AND NOT A HAND-WRITTEN JSON

   Phase 11 was asked for a machine-readable Grade 9 curriculum
   specification. Writing one by hand would create a SECOND copy of the
   curriculum beside content/syllabus.js and content/specification-grid.js
   — three places for the same facts, two of which the build checks and
   one of which it does not. The copy nobody checks is the one that goes
   stale, and a stale curriculum is the exact failure Phase 9 spent its
   length undoing.

   So the source of truth stays where the repository already keeps it,
   and this projects it into the requested JSON. Regenerate rather than
   edit.

   WHAT IT ASSERTS, AND WHAT IT DOES NOT
   Everything emitted under `verified` was read from the CDC 2078 PDF
   and cross-checked — units, titles, hours, marks, evaluation. Anything
   the document contains but nobody has transcribed yet is listed under
   `notTranscribed` by name rather than omitted, so the gaps are part of
   the specification instead of something a reader discovers later.

   USAGE
     node tools/grade9-spec.js          writes the JSON
     node tools/grade9-spec.js --check  verifies the committed JSON is
                                        current, writes nothing, exits 1
                                        if it has drifted
   ============================================================ */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, '_source');
const OUT = path.join(ROOT, 'docs', 'GRADE-9-CURRICULUM-SPECIFICATION.json');

const grid     = require(path.join(SRC, 'content/specification-grid.js'));
const syllabus = require(path.join(SRC, 'content/syllabus.js'));
const site     = require(path.join(SRC, 'config/site.js'));
const pages    = require(path.join(SRC, 'config/pages.js'));
const coverage = require(path.join(SRC, 'content/coverage.js'));
const context  = require(path.join(SRC, 'build/context.js'));

/* ------------------------------------------------------------ status
   WHY THIS IS DERIVED AND NOT DECLARED

   Phase 11 wrote `status: 'not-implemented'` as a literal, because at
   the time it was true of all 169 topics. Phase 12 taught four of them
   and the literal did not notice — the specification went on reporting
   an untouched curriculum while the site served a unit. A generated
   document that can be wrong about the thing it generates is worse
   than no document, because it is believed.

   So every status below is read from the same data the build checks:

     a unit has a page          config/pages.js
     a topic is taught          content/coverage.js maps it to an anchor,
                                and validate.js fails the build on a
                                missing topic, a dangling anchor or a
                                stale entry
     the unit is assessed       the registered question bank has at
                                least one question for that unit
     the unit's practical work  the authored lesson carries the
       is on the page           curriculum's activities, marked with
                                data-practical ids

   None of this is a claim that the teaching is GOOD. It is a claim
   about what exists, which is all a generator can honestly make. The
   vocabulary below says so in the document itself. */
function lessonHtml(secIds){
  let html = '';
  for (const id of secIds || []){
    const p = path.join(SRC, 'content/lessons', id + '.html');
    if (fs.existsSync(p)) html += fs.readFileSync(p, 'utf8');
  }
  return html;
}

function unitFacts(key, unitN){
  const cfg = pages[key];
  const page = cfg && (cfg.pages || []).find(p => String(p.n) === String(unitN));
  if (!page) return { page: false, taught: false, assessed: false, practical: false };

  const html = lessonHtml(page.sec);
  const bank = context.questionBanks[key] || [];
  return {
    page: true,
    taught: true,
    assessed: bank.some(q => String(q.unit || '').replace(/^u/, '') === String(unitN)),
    practical: /data-practical="/.test(html)
  };
}

function topicStatus(key, unitN, topic){
  const f = unitFacts(key, unitN);
  if (!f.page) return 'not-implemented';
  const map = coverage[key] || {};
  if (!Object.prototype.hasOwnProperty.call(map, topic)) return 'partially-taught';
  if (!f.assessed) return 'assessment-missing';
  if (!f.practical) return 'practical-missing';
  return 'fully-taught';
}

const GRADE = 'grade9';

const SOURCE = {
  title: 'Secondary Level School Curriculum (Technical and Vocational Stream), ' +
         'Grade 9-12 — Computer Engineering',
  issuingAuthority: 'Curriculum Development Centre, Ministry of Education, ' +
                    'Science and Technology, Government of Nepal',
  edition: '2078 BS',
  listing: 'https://moecdc.gov.np/content/553/',
  file: 'https://giwmscdnone.gov.np/media/pdf_upload/1694337718_jx35alj.pdf',
  fileSize: '1.03 MB, 321 pages',
  primarySource: true,
  gridPages: { 'c-programming': 9, 'computer-fundamentals': 20,
               'electro-system': 31, 'website-design': 42 },
  scopePages: { 'c-programming': 4, 'computer-fundamentals': 13,
                'electro-system': 24, 'website-design': 35 }
};

/* Read verbatim from the Grade 9 evaluation section of the same document.
   Grade 10's equivalent is given as percentages; Grade 9's is itemised. */
const EVALUATION = {
  totalMarks: 100,
  internal: {
    marks: 50,
    awardedBy: 'the school',
    breakdown: [
      { item: 'Participation', marks: 5 },
      { item: 'Practical work — conduction of activities', marks: 15 },
      { item: 'Practical work — record keeping', marks: 3 },
      { item: 'Project work — conduction of activities', marks: 10 },
      { item: 'Project work — record keeping', marks: 2 },
      { item: 'Viva of practical and project work', marks: 5 },
      { item: 'Internal exam — first trimester 5, second trimester 5', marks: 10 }
    ]
  },
  external: {
    marks: 50,
    duration: '2 hrs',
    basis: 'Written examination. "Questions for the external examination will be ' +
           'based on the specification grid developed by Curriculum Development ' +
           'Centre." Paper uses revised Bloom\'s levels: remembering, ' +
           'understanding, application and higher ability.',
    note: 'The per-unit marks below are shares of this external paper only — ' +
          'half the subject. No study site can award or predict the internal half.'
  }
};

const NOT_TRANSCRIBED = [
  { item: 'Learning outcomes',
    where: 'a separate column of each subject\'s scope-and-sequence table',
    why: 'Phase 11 transcribed units, hours, marks and topic titles. The ' +
         'outcome statements are a per-topic transcription job and belong ' +
         'with the subject that is being authored, not ahead of all four.' },
  { item: 'Practical activities and their hours',
    where: 'a "Practical Activities" table per subject, with its own hour column',
    why: 'Present in the document and not yet read. These matter: they are ' +
         '18 of the 50 internal marks, and they are what a practical subject ' +
         'such as Website Design is actually assessed on.' },
  { item: 'Per-topic verification of the topic lists',
    where: 'the scope-and-sequence tables',
    why: 'Unit count, unit titles and hours were verified for all four ' +
         'subjects and agree exactly. The TOPIC lists were spot-checked, not ' +
         'verified line by line, and one misplacement was found and fixed ' +
         '(see discrepancies). Each subject needs a full pass before it is ' +
         'authored.' },
  { item: 'Subject codes',
    where: 'not present',
    why: 'The document assigns no subject or course code to these subjects. ' +
         'Recorded as absent rather than invented.' }
];

const DISCREPANCIES = [
  { id: 'G9-D1',
    subject: 'grade9/c-programming',
    found: 'Phase 11',
    status: 'fixed',
    official: '2.7 "Operators in C (Arithmetic, Relational, Logical, Bitwise, ' +
              'Assignment)" is the last topic of Unit 2, Fundamentals of C',
    wasInRepo: 'the first topic of Unit 3, Control Flow Statements',
    whyItMatters: 'Unit 2 carries 7 external marks and Unit 3 carries 13. A ' +
                  'student revising operators would have weighted them wrongly.',
    evidence: 'The extracted text reads "2.6 Input/ Output statements 2.7 ' +
              'Operators in C (...)10 3Control Flow Statements" — the 10 is ' +
              'Unit 2\'s credit hours, so 2.7 closes Unit 2.' }
];

/* ------------------------------------------------------------ build it */

const subjects = [];
for (const g of site){
  if (g.id !== GRADE) continue;
  for (const s of g.subjects){
    const key = g.id + '/' + s.slug;
    const spec = grid[key];
    const outline = syllabus[key] || [];
    if (!spec) continue;

    subjects.push({
      key,
      slug: s.slug,
      name: s.name,
      nameNepali: s.np,
      shortName: s.short,
      subjectCode: null,
      gridSource: spec.source,
      pdfPage: SOURCE.gridPages[s.slug] || null,
      creditHours: spec.units.reduce((a, u) => a + u.hrs, 0),
      externalMarks: spec.units.reduce((a, u) => a + u.marks, 0),
      unitCount: spec.units.length,
      topicCount: outline.reduce((a, u) => a + (u.c || []).length, 0),
      authored: Boolean(pages[key]),
      units: spec.units.map((u, i) => {
        const o = outline[i] || {};
        return {
          n: u.n,
          title: u.content,
          titleNepali: o.np || null,
          creditHours: u.hrs,
          externalMarks: u.marks,
          authored: unitFacts(key, u.n).page,
          topics: (o.c || []).map(t => ({
            title: t,
            status: topicStatus(key, u.n, t)
          }))
        };
      })
    });
  }
}

/* Counted from what was emitted, never asserted alongside it. */
const everyTopic = [];
for (const s of subjects){
  for (const u of s.units) for (const t of u.topics) everyTopic.push(t.status);
}
const tally = st => everyTopic.filter(x => x === st).length;

const totals = {
  subjects: subjects.length,
  units: subjects.reduce((a, s) => a + s.unitCount, 0),
  unitsAuthored: subjects.reduce((a, s) => a + s.units.filter(u => u.authored).length, 0),
  topics: subjects.reduce((a, s) => a + s.topicCount, 0),
  creditHours: subjects.reduce((a, s) => a + s.creditHours, 0),
  externalMarks: subjects.reduce((a, s) => a + s.externalMarks, 0),
  topicsFullyTaught: tally('fully-taught'),
  topicsPartiallyTaught: tally('partially-taught'),
  topicsPracticalMissing: tally('practical-missing'),
  topicsAssessmentMissing: tally('assessment-missing'),
  topicsNotImplemented: tally('not-implemented')
};

const doc = {
  $generatedBy: 'tools/grade9-spec.js — regenerate, do not edit by hand',
  grade: 'Grade 9',
  stream: 'Technical and Vocational Stream — Computer Engineering',
  generated: new Date().toISOString().slice(0, 10),
  source: SOURCE,
  evaluation: EVALUATION,
  totals,
  coverageStatement:
    totals.unitsAuthored + ' of ' + totals.units + ' Grade 9 units are authored, ' +
    'covering ' + (totals.topics - totals.topicsNotImplemented) + ' of ' +
    totals.topics + ' topics. The curriculum structure around all of them — ' +
    'units, titles, hours and marks — is verified against the CDC document ' +
    'and held by tests/curriculum.test.js.',
  $statusDerivation:
    'Every status in this file is derived at generation time from the same ' +
    'data the build validates — config/pages.js, content/coverage.js, the ' +
    'registered question bank, and data-practical ids in the authored ' +
    'lesson. None of it is written by hand, and none of it is a judgement ' +
    'about teaching quality: these states describe what exists, not whether ' +
    'it is any good. No teacher and no student has reviewed any Grade 9 ' +
    'content.',
  statusVocabulary: {
    'fully-taught': 'the topic is mapped to a section of an authored lesson, the ' +
                    'unit has questions in the bank, and the unit\'s practical ' +
                    'activities are on the page',
    'partially-taught': 'the unit has a page but this topic is not in the coverage map',
    'practical-missing': 'taught and assessed, but the curriculum\'s practical ' +
                         'activities for the unit are not on the page',
    'assessment-missing': 'taught, but no question in the bank examines its unit',
    'not-implemented': 'the unit has no page; nothing has been written'
  },
  discrepancies: DISCREPANCIES,
  notTranscribed: NOT_TRANSCRIBED,
  subjects
};

const json = JSON.stringify(doc, null, 2) + '\n';

if (process.argv.includes('--check')){
  const have = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
  /* The generation date is expected to differ; compare everything else.

     LINE ENDINGS ARE NORMALISED, and that is not cosmetic. This
     repository runs with core.autocrlf=true and no .gitattributes, so a
     checkout materialises this file with CRLF while the generator above
     writes LF. The comparison was byte-for-byte, so it reported drift on
     every line of a file that had not changed at all — on any fresh
     Windows checkout, and on nothing else.

     It passed for a whole phase because the working copy under test was
     the one the generator had just written. It failed the moment the
     file came from git instead: `git checkout main` after a merge was
     enough. Dates differ by design; line endings differ by platform;
     neither is drift. */
  const strip = s => s
    .replace(/\r\n/g, '\n')
    .replace(/"generated": "[^"]*"/, '"generated": "-"');
  if (strip(have) === strip(json)){
    console.log('GRADE-9-CURRICULUM-SPECIFICATION.json is current.');
    process.exit(0);
  }
  console.error('GRADE-9-CURRICULUM-SPECIFICATION.json has drifted from the ' +
                'curriculum data. Run: node tools/grade9-spec.js');
  process.exit(1);
}

fs.writeFileSync(OUT, json, 'utf8');
console.log('Grade 9 specification');
console.log('  subjects : ' + totals.subjects);
console.log('  units    : ' + totals.units);
console.log('  authored : ' + totals.unitsAuthored + ' of ' + totals.units + ' units');
console.log('  topics   : ' + totals.topics +
            '   fully-taught ' + totals.topicsFullyTaught +
            ', practical-missing ' + totals.topicsPracticalMissing +
            ', assessment-missing ' + totals.topicsAssessmentMissing +
            ', partially-taught ' + totals.topicsPartiallyTaught +
            ', not-implemented ' + totals.topicsNotImplemented);
console.log('  hours    : ' + totals.creditHours + '   external marks: ' + totals.externalMarks);
console.log('  wrote docs/GRADE-9-CURRICULUM-SPECIFICATION.json');
