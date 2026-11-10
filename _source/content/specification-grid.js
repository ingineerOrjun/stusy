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

   IS THIS STILL THE APPLICABLE CURRICULUM?
   Investigated in full in docs/CURRICULUM-APPLICABILITY.md, with the
   evidence tiered. The summary:
   Checked at the source on 10 November 2026. The CDC's own listing page
   for this subject (moecdc.gov.np/content/553/) is dated 1 Mangsir 2082
   BS and links exactly ONE file — the 2078 PDF transcribed here. No
   later edition of the Computer Engineering curriculum is published
   there, and the site is plainly maintained: its notice column carries
   2083 BS items.

   What that establishes: the 2078 edition is the only edition the CDC
   publishes for this subject, as of today.

   What it does NOT establish, and this is a real limitation: which
   edition any particular year's SEE paper is set from. That is not
   stated in any document reachable from the listing, so the marks below
   should be read as "the published curriculum" and not as "the grid the
   2027 paper will be built from". If the two ever diverge, this file is
   the single place to change.

   PAGE NUMBERS — WHAT THE CITATIONS BELOW ARE, EXACTLY
   The page numbers are the position of each grid in the PDF's content
   streams, counted in order. They are NOT read off the printed folio:
   the text extraction used here recovers no reliable page markers, and
   the document is served through a canvas flipbook that cannot be read
   as text. They are accurate to a few pages and are given as a finding
   aid, not as a citation to quote.

   The verification that does hold is the numbers themselves. Every
   marks column below was re-extracted independently in the Phase 9
   continuation and compared: Hardware 7/7/9/10/11/6, DBMS
   2/10/6/14/6/6/6 and Digital Design 7/15/6/7/15 all came back
   unchanged. The subject and unit titles printed in each grid are the
   anchor a reviewer should search for.

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

   THESE 50 MARKS ARE HALF THE SUBJECT, NOT ALL OF IT
   The curriculum's §7 Student Evaluation is explicit:

     "Internal evaluation covers 50 Percent weightage. Internal
      evaluation consists of Practical Activities (Practical works and
      projects works) (35 Percent), (b) Marks from trimester
      examinations (10 Percent), and (c) Classroom participation
      (5 Percent)."

   So each subject is 100 marks: 50 external, set from the grid below,
   and 50 internal, which a school awards and which no study site can
   predict or replace. The unit marks here are shares of the EXTERNAL
   paper only.

   This matters on the page, not just in a comment. Three of the four
   subject heroes used to show a bare "50 marks" pill while the fourth
   showed "50 external marks" — so three of them let a student read the
   theory paper as the whole subject. All four now say external, and a
   test holds them together.

   A NOTE ON WHAT IS *NOT* HERE
   The grid also apportions each unit's marks across MCQ / short / long
   and across Bloom bands (knowledge-and-understanding, application,
   higher ability). Those columns are published only as column totals
   for the whole paper, not per unit, so they are not transcribed: a
   per-unit split would be invention.
   ============================================================ */

module.exports = {

  /* Specification Grid, approx. PDF p. 50 — "Data structure & OOP concept using C++" */
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

  /* Specification Grid, approx. PDF p. 59 — "Computer Hardware, Electronics Repair and Maintenance" */
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

  /* Specification Grid, approx. PDF p. 68 — "Database Management System" */
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

  /* Specification Grid, approx. PDF p. 76 — "Digital Design and Microprocessor" */
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
