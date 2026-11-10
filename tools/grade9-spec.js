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
          topics: (o.c || []).map(t => ({
            title: t,
            /* Nothing is taught yet, so every topic is in the same state.
               The vocabulary matches the Grade 10 coverage model so the
               two can be reported together later. */
            status: 'not-implemented'
          }))
        };
      })
    });
  }
}

const totals = {
  subjects: subjects.length,
  units: subjects.reduce((a, s) => a + s.unitCount, 0),
  topics: subjects.reduce((a, s) => a + s.topicCount, 0),
  creditHours: subjects.reduce((a, s) => a + s.creditHours, 0),
  externalMarks: subjects.reduce((a, s) => a + s.externalMarks, 0),
  topicsFullyTaught: 0,
  topicsPartiallyTaught: 0,
  topicsNotImplemented: subjects.reduce((a, s) => a + s.topicCount, 0)
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
    'No Grade 9 lesson has been authored. Every one of the ' + totals.topics +
    ' topics is "not-implemented". The curriculum structure around them — ' +
    'units, titles, hours and marks — is verified against the CDC document ' +
    'and held by tests/curriculum.test.js.',
  statusVocabulary: {
    'fully-taught': 'explanation, worked example and assessment all present and read',
    'partially-taught': 'some content present; named gaps recorded',
    'practical-missing': 'taught, but the curriculum\'s practical activity is absent',
    'assessment-missing': 'taught, but no question in the bank examines it',
    'not-implemented': 'nothing has been written'
  },
  discrepancies: DISCREPANCIES,
  notTranscribed: NOT_TRANSCRIBED,
  subjects
};

const json = JSON.stringify(doc, null, 2) + '\n';

if (process.argv.includes('--check')){
  const have = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
  /* the generation date is expected to differ; compare everything else */
  const strip = s => s.replace(/"generated": "[^"]*"/, '"generated": "-"');
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
console.log('  topics   : ' + totals.topics + '  (all not-implemented)');
console.log('  hours    : ' + totals.creditHours + '   external marks: ' + totals.externalMarks);
console.log('  wrote docs/GRADE-9-CURRICULUM-SPECIFICATION.json');
