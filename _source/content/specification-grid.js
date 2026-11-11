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

   PAGE NUMBERS — CONFIRMED IN PHASE 11, HAVING BEEN INFERRED BEFORE
   Phase 9 derived these from the order of the PDF's content streams and
   Phase 9.5 labelled them "approx." because the printed folio could not
   be recovered. It can: each grid's text block OPENS with its own page
   number, which is why the extraction reads "50Specification GridGrade:
   10" and "9Specification GridGrade: 9". Every citation below is that
   leading number, and all four Grade 10 pages came back exactly as
   Phase 9 had guessed — 50, 59, 68, 76.

   The numbers themselves were also re-extracted independently in the
   Phase 9 continuation and compared: Hardware 7/7/9/10/11/6, DBMS
   2/10/6/14/6/6/6 and Digital Design 7/15/6/7/15 all came back
   unchanged.

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

  /* ============================================================
     GRADE 9 — transcribed in Phase 11.

     The same document, the same table, four pages earlier in it. Each
     Grade 9 subject carries a grid headed "Specification Grid / Grade: 9"
     and each totals 64 credit hours and 50 external marks, like Grade 10.

     HOW THE NUMBERS WERE READ, since the extraction interleaves columns.
     Units 2..7 come out cleanly as hours then marks. Unit 1's row is
     merged with the whole-paper column totals, so its marks are the
     digits after the shared run. The method was calibrated against the
     Grade 10 DBMS grid, whose values were already known and verified:
     it reproduced 6/10/10/14/8/8/8 hours and 2/10/6/14/6/6/6 marks
     exactly. Each subject below is then checked by arithmetic — unit 1
     must equal 50 minus the rest — and every one agrees.

     CROSS-CHECKED AGAINST THE REPO. The Grade 9 outlines in
     content/syllabus.js were transcribed from the scope-and-sequence
     before this grid was read. Comparing the two found ZERO
     disagreements on unit count, unit title or hours across all four
     subjects, which is the opposite of what the same comparison found
     for Grade 10 in Phase 9.
     ============================================================ */

  /* PDF p. 9 — "Programming Principles and Concept in C Language" */
  'grade9/c-programming': {
    source: 'CDC 2078, Specification Grid, Grade 9, Programming Principles and Concept in C Language',

    /* THE OTHER HALF, read in Phase 14 from "Suggested Practical and
       Project Works" on printed p.6 of the same document. Like Computer
       and Application, this subject's header reads "Credit hrs: 4 /
       Working hrs: 128": 64 theory hours in the scope and sequence and a
       separate 64 practical hours here.

       The distribution is NOT the same as the other subject's, which is
       why it is read per subject rather than assumed — 2 and 3 hours for
       the first two units, then 15 each for control flow, functions and
       arrays, where the curriculum expects students to be writing
       programs rather than reading about them.

       Every one of this subject's ten activities needs a C compiler on a
       real machine. See docs/GRADE-9-C-PROGRAMMING-CURRICULUM-MAP.md §4. */
    practicalHours: { '1': 2, '2': 3, '3': 15, '4': 15, '5': 15, '6': 7, '7': 7 },

    units: [
      { n: '1', hrs:  6, marks:  5, content: 'Principles of Programming' },
      { n: '2', hrs: 10, marks:  7, content: 'Fundamentals of C' },
      { n: '3', hrs: 16, marks: 13, content: 'Control Flow Statements' },
      { n: '4', hrs: 12, marks: 10, content: 'Functions' },
      { n: '5', hrs: 10, marks:  8, content: 'Arrays & Strings' },
      { n: '6', hrs:  6, marks:  5, content: 'Structure and Union' },
      { n: '7', hrs:  4, marks:  2, content: 'Pointers' }
    ]
  },

  /* PDF p. 20 — "Fundamentals of Computer and Application" */
  'grade9/computer-fundamentals': {
    source: 'CDC 2078, Specification Grid, Grade 9, Fundamentals of Computer and Application',

    /* THE OTHER HALF OF THE COURSE.

       The subject header on p.10 reads "Credit hrs: 4 / Working hrs:
       128". The hours in `units` below are the THEORY hours — what the
       scope-and-sequence table counts and what the specification grid
       weighs. A second table, "Suggested Practical and Project Works"
       on pp.16-17, gives a separate hour budget per unit which also
       totals 64. 64 + 64 = the 128 working hours.

       Recorded here because reporting this subject as "64 hours"
       describes half of it, and because the practical half is where 30
       of the 50 internal marks are earned (practical 18, project 12).
       Verified in Phase 12 by two independent extractions. */
    practicalHours: { '1': 10, '2': 10, '3': 8, '4': 6, '5': 12, '6': 8, '7': 10 },

    units: [
      { n: '1', hrs:  8, marks:  6, content: 'Introduction to computer' },
      { n: '2', hrs: 10, marks:  7, content: 'Computer Components' },
      { n: '3', hrs: 10, marks:  9, content: 'Computer software' },
      { n: '4', hrs: 10, marks:  8, content: 'Memory/Storage Unit' },
      { n: '5', hrs: 10, marks:  8, content: 'Internet and its Application' },
      { n: '6', hrs:  8, marks:  6, content: 'Multimedia' },
      { n: '7', hrs:  8, marks:  6, content: 'Emerging Technology' }
    ]
  },

  /* PDF p. 31 — "Fundamentals of electro-system" */
  'grade9/electro-system': {
    source: 'CDC 2078, Specification Grid, Grade 9, Fundamentals of electro-system',
    units: [
      { n: '1', hrs:  9, marks:  6, content: 'Introduction to Electrostatics' },
      { n: '2', hrs: 13, marks: 10, content: 'Electric Fundamentals' },
      { n: '3', hrs: 13, marks: 10, content: 'Electric circuit' },
      { n: '4', hrs:  6, marks:  6, content: 'Electrical Power and Theory' },
      { n: '5', hrs: 10, marks:  7, content: 'Cell and capacitor' },
      { n: '6', hrs:  8, marks:  6, content: 'Magnetism and Electromagnetism' },
      { n: '7', hrs:  5, marks:  5, content: 'Fundamentals of Current and phase current' }
    ]
  },

  /* PDF p. 42 — "Website Design" */
  'grade9/website-design': {
    source: 'CDC 2078, Specification Grid, Grade 9, Website Design',
    units: [
      { n: '1', hrs:  6, marks:  6, content: 'Basics in Website Design' },
      { n: '2', hrs:  4, marks:  3, content: 'Website Design Principles' },
      { n: '3', hrs:  6, marks:  6, content: 'HTML Basics' },
      { n: '4', hrs: 15, marks:  9, content: 'HTML Elements' },
      { n: '5', hrs:  5, marks:  5, content: 'HTML5 Basics' },
      { n: '6', hrs: 18, marks: 15, content: 'Cascading Style Sheets (CSS)' },
      { n: '7', hrs: 10, marks:  6, content: 'JavaScript Fundamentals' }
    ]
  },

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
