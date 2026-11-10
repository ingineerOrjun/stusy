/* ============================================================
   THE OFFICIAL SPECIFICATION GRID

   SOURCE
   Curriculum Development Centre, Ministry of Education, Science and
   Technology, Government of Nepal.
   "Secondary Level School Curriculum (Technical and Vocational Stream),
   Grade 9-12 — Computer Engineering", 2078 BS.
   Published PDF: https://moecdc.gov.np/content/553/
   File read: giwmscdnone.gov.np/media/pdf_upload/1694337718_jx35alj.pdf

   Each Grade 10 subject carries a "Specification Grid" table giving the
   credit hours and the total marks per unit. Those two numbers are
   transcribed below, verbatim.

   WHY THIS FILE EXISTS
   Two subjects shipped with marks that were DERIVED from hours because
   the phases that built them recorded the grid as unavailable:

     docs/PHASE-4-DBMS-CURRICULUM-MAP.md  "Marks are DERIVED, not
                                           transcribed - and that is a
                                           real gap." (ambiguity A1)
     the Hardware phase                    same reasoning, 8/8/9/9/9/7

   The grid turned out to be in the same PDF as the syllabus the repo
   had already transcribed. Nine of twenty-four units were wrong:

     DBMS      U1  5 -> 2    U2  8 -> 10   U3  8 -> 6    U4 11 -> 14
     Hardware  U1  8 -> 7    U2  8 -> 7    U4  9 -> 10   U5  9 -> 11
               U6  7 -> 6

   Marks are not decoration. A student allocating revision time reads
   them directly: DBMS Unit 4 was understated by 3 marks and Unit 1
   overstated by 3, so the subject's heaviest unit looked lighter than
   its lightest-but-one.

   HOW IT IS ENFORCED
   build/validate.js compares config/pages.js against this file, unit by
   unit, and fails the build on any disagreement. Changing a mark now
   requires changing the transcription, which is the place a reviewer
   can check against the PDF.

   A NOTE ON WHAT IS *NOT* HERE
   The grid also apportions each unit's marks across MCQ / short / long
   and across Bloom bands (knowledge-and-understanding, application,
   higher ability). Those columns are published only as column totals
   for the whole paper, not per unit, so they are not transcribed: a
   per-unit split would be invention.
   ============================================================ */

module.exports = {

  /* PDF p. 50 — "Data structure & OOP concept using C++" */
  'grade10/oop-cpp': {
    source: 'CDC 2078, Specification Grid, Grade 10, Data structure & OOP concept using C++',
    units: [
      { n: '1', hrs: 20, marks: 15, content: 'Basic Introduction to Data Structure' },
      { n: '2', hrs: 10, marks: 14, content: 'Concept Of Object Oriented Programming (OOP) using C++' },
      { n: '3', hrs:  7, marks:  2, content: 'Class and Object' },
      { n: '4', hrs:  7, marks:  5, content: 'Abstraction and Encapsulation' },
      { n: '5', hrs: 10, marks:  7, content: 'Inheritance' },
      { n: '6', hrs: 10, marks:  7, content: 'Polymorphism' }
    ]
  },

  /* PDF p. 59 — "Computer Hardware, Electronics Repair and Maintenance" */
  'grade10/hardware': {
    source: 'CDC 2078, Specification Grid, Grade 10, Computer Hardware, Electronics Repair and Maintenance',
    units: [
      { n: '1', hrs: 10, marks:  7, content: 'Introduction to Electronic Devices' },
      { n: '2', hrs: 10, marks:  7, content: 'Introduction to Computer System' },
      { n: '3', hrs: 12, marks:  9, content: 'Overview on Systems Core' },
      { n: '4', hrs: 12, marks: 10, content: 'Troubleshooting Techniques' },
      { n: '5', hrs: 12, marks: 11, content: 'Repair and Maintenance' },
      { n: '6', hrs:  8, marks:  6, content: 'Backup and Recovery' }
    ]
  },

  /* PDF p. 68 — "Database Management System" */
  'grade10/dbms': {
    source: 'CDC 2078, Specification Grid, Grade 10, Database Management System',
    units: [
      { n: '1', hrs:  6, marks:  2, content: 'Introduction to Database System' },
      { n: '2', hrs: 10, marks: 10, content: 'Entity Relationship Model (ER-Model)' },
      { n: '3', hrs: 10, marks:  6, content: 'Relational Model' },
      { n: '4', hrs: 14, marks: 14, content: 'SQL (Structured Query Language) Overview' },
      { n: '5', hrs:  8, marks:  6, content: 'Relational Database Design' },
      { n: '6', hrs:  8, marks:  6, content: 'Database Transaction' },
      { n: '7', hrs:  8, marks:  6, content: 'Database Backup Recovery, and Security' }
    ]
  },

  /* PDF p. 76 — "Digital Design and Microprocessor" */
  'grade10/digital-design': {
    source: 'CDC 2078, Specification Grid, Grade 10, Digital Design and Microprocessor',
    units: [
      { n: '1', hrs: 12, marks:  7, content: 'Number system and Binary arithmetic operations' },
      { n: '2', hrs: 14, marks: 15, content: 'Concept of logic gates' },
      { n: '3', hrs: 10, marks:  6, content: 'Boolean algebra and Karnaugh Map' },
      { n: '4', hrs: 13, marks:  7, content: 'Binary arithmetic and Combinational Logic' },
      { n: '5', hrs: 15, marks: 15, content: 'Introduction to Microprocessor and its components' }
    ]
  }

};
