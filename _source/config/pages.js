/* ============================================================
   PAGE MAPS — one entry per fully authored subject.

   Keyed by the subject id used everywhere else (`<grade>/<slug>`), so
   the site map, the syllabus, the question banks and the pages all join
   on the same key. Adding a third authored subject is a new entry here
   plus its lesson files; no build code changes.

     hero   section id used for the subject overview page
     quiz   subject key the quiz engine queries (defaults to the map key)
     pages  ordered list of the subject's pages

   Page fields:
     file   output filename            n      badge shown in navigation
     title  English title              np     Nepali title
     chip   short label for the chip bar (falls back to title)
     hrs    prescribed hours           marks  exam weight
     sec    content section ids        js     runtime modules to load
   ============================================================ */

module.exports = {

  /* ---------------------------------------------------------------
     Grade 10 · Data Structure & OOP using C++
     --------------------------------------------------------------- */
  'grade10/oop-cpp': {
    hero: 'hero',
    pages: [
      { file: 'unit1.html', n: '1',
        title: 'Basic Introduction to Data Structure', np: 'डाटा स्ट्रक्चरको आधारभूत परिचय',
        chip: 'Data Structure', hrs: 20, marks: 15,
        sec: ['u1'], js: ['services/simulation.js', 'predict.js', 'sim-stackqueue.js'] },

      { file: 'unit2.html', n: '2',
        title: 'Concept of OOP using C++', np: 'OOP को अवधारणा (C++)',
        chip: 'OOP + C++', hrs: 10, marks: 14,
        sec: ['u2'], js: ['snippets.js', 'services/simulation.js', 'predict.js', 'sim-drill.js'] },

      { file: 'unit3.html', n: '3',
        title: 'Class and Object', np: 'क्लास र अब्जेक्ट',
        chip: 'Class and Object', hrs: 7, marks: 2,
        sec: ['u3'], js: ['snippets.js', 'services/simulation.js', 'predict.js', 'sim-drill.js'] },

      { file: 'unit4.html', n: '4',
        title: 'Abstraction and Encapsulation', np: 'एब्स्ट्र्याक्सन र इनक्याप्सुलेसन',
        chip: 'Abstraction / Encapsulation', hrs: 7, marks: 5,
        sec: ['u4'], js: ['snippets.js', 'services/simulation.js', 'predict.js', 'sim-drill.js'] },

      { file: 'unit5.html', n: '5',
        title: 'Inheritance', np: 'इनहेरिटेन्स',
        chip: 'Inheritance', hrs: 10, marks: 7,
        sec: ['u5'], js: ['snippets.js', 'services/simulation.js', 'predict.js', 'sim-drill.js',
                             'guided.js', 'practice-bank.js'] },

      { file: 'unit6.html', n: '6',
        title: 'Polymorphism', np: 'पोलिमर्फिज्म',
        chip: 'Polymorphism', hrs: 10, marks: 7,
        sec: ['u6'], js: ['snippets.js', 'services/simulation.js', 'predict.js', 'sim-dispatch.js'] },

      { file: 'trace.html', n: '▶',
        title: 'Trace a Full Program', np: 'पूरा प्रोग्राम ट्रेस गर्नुहोस्',
        chip: 'Trace a Program',
        sec: ['trace'], js: ['trace.js'] },

      { file: 'tables.html', n: '≠',
        title: 'Comparison Tables & Exam Terms', np: 'तुलनात्मक तालिका र परीक्षा शब्दावली',
        chip: 'Tables & Terms',
        sec: ['tables', 'terms'], js: [] },

      { file: 'quiz.html', n: '?',
        title: 'Self-Check Quiz', np: 'आफैं जाँच्ने क्विज',
        chip: 'Quiz',
        sec: ['quiz'], js: ['services/quiz.js', 'question-bank.js', 'quiz.js'] }
    ]
  },

  /* ---------------------------------------------------------------
     Grade 10 · Digital Design and Microprocessor
     Unit hours and marks are from the CDC specification grid — see
     docs/PHASE-3-CURRICULUM-MAP.md. They total 64 hrs and 50 marks.
     --------------------------------------------------------------- */
  'grade10/digital-design': {
    hero: 'dd-hero',
    pages: [
      { file: 'unit1.html', n: '1',
        title: 'Number System and Binary Arithmetic', np: 'संख्या प्रणाली र बाइनरी गणित',
        chip: 'Number Systems', hrs: 12, marks: 7,
        /* guided.js before practice-bank.js: the bank is a list of
           register() calls, so the registry has to exist first. */
        sec: ['dd-u1'], js: ['services/simulation.js', 'predict.js', 'sim-number.js',
                             'guided.js', 'practice-bank.js'] },

      { file: 'unit2.html', n: '2',
        title: 'Concept of Logic Gates', np: 'लजिक गेटको अवधारणा',
        chip: 'Logic Gates', hrs: 14, marks: 15,
        sec: ['dd-u2'], js: ['services/simulation.js', 'predict.js', 'sim-gates.js'] },

      { file: 'unit3.html', n: '3',
        title: 'Boolean Algebra and Karnaugh Map', np: 'बुलियन बीजगणित र के–म्याप',
        chip: 'Boolean / K-map', hrs: 10, marks: 6,
        sec: ['dd-u3'], js: ['services/simulation.js', 'predict.js', 'sim-kmap.js'] },

      { file: 'unit4.html', n: '4',
        title: 'Binary Arithmetic and Combinational Logic', np: 'बाइनरी गणित र कम्बिनेसनल लजिक',
        chip: 'Combinational Logic', hrs: 13, marks: 7,
        sec: ['dd-u4'], js: ['services/simulation.js', 'predict.js', 'sim-comb.js'] },

      { file: 'unit5.html', n: '5',
        title: 'Introduction to Microprocessor', np: 'माइक्रोप्रोसेसर र यसका भाग',
        chip: 'Microprocessor', hrs: 15, marks: 15,
        sec: ['dd-u5'], js: ['services/simulation.js', 'predict.js', 'sim-8085.js'] },

      { file: 'quiz.html', n: '?',
        title: 'Self-Check Quiz', np: 'आफैं जाँच्ने क्विज',
        chip: 'Quiz',
        sec: ['dd-quiz'], js: ['services/quiz.js', 'question-bank.js', 'quiz.js'] }
    ]
  },

  /* ---------------------------------------------------------------
     Grade 10 · Database Management System
     Unit hours are transcribed from the CDC scope-and-sequence list and
     total 64. Marks are DERIVED, not transcribed — no DBMS
     specification grid is available. See
     docs/PHASE-4-DBMS-CURRICULUM-MAP.md ambiguity A1.
     --------------------------------------------------------------- */
  'grade10/dbms': {
    hero: 'db-hero',
    pages: [
      { file: 'unit1.html', n: '1',
        title: 'Introduction to Database System', np: 'डाटाबेस प्रणालीको परिचय',
        chip: 'Introduction', hrs: 6, marks: 5,
        sec: ['db-u1'], js: ['services/simulation.js', 'predict.js', 'sim-drill.js'] },

      { file: 'unit2.html', n: '2',
        title: 'Entity Relationship Model (ER-Model)', np: 'ई–आर मोडेल',
        chip: 'ER Model', hrs: 10, marks: 8,
        sec: ['db-u2'], js: ['services/simulation.js', 'predict.js', 'sim-table.js', 'sim-er.js', 'sim-drill.js'] },

      { file: 'unit3.html', n: '3',
        title: 'Relational Model', np: 'रिलेसनल मोडेल',
        chip: 'Relational Model', hrs: 10, marks: 8,
        sec: ['db-u3'], js: ['services/simulation.js', 'predict.js', 'sim-table.js'] },

      { file: 'unit4.html', n: '4',
        title: 'SQL — Structured Query Language', np: 'एसक्युएल — संरचित क्वेरी भाषा',
        chip: 'SQL', hrs: 14, marks: 11,
        sec: ['db-u4'], js: ['services/simulation.js', 'predict.js', 'sql-engine.js', 'sim-table.js', 'sim-sql.js'] },

      { file: 'unit5.html', n: '5',
        title: 'Relational Database Design', np: 'रिलेसनल डाटाबेस डिजाइन',
        chip: 'Normalization', hrs: 8, marks: 6,
        sec: ['db-u5'], js: ['services/simulation.js', 'predict.js', 'sim-drill.js',
                                'guided.js', 'practice-bank.js'] },

      { file: 'unit6.html', n: '6',
        title: 'Database Transaction', np: 'डाटाबेस ट्रान्ज्याक्सन',
        chip: 'Transaction', hrs: 8, marks: 6,
        sec: ['db-u6'], js: ['services/simulation.js', 'predict.js', 'sim-concurrency.js'] },

      { file: 'unit7.html', n: '7',
        title: 'Database Backup, Recovery and Security', np: 'ब्याकअप, रिकभरी र सुरक्षा',
        chip: 'Backup & Security', hrs: 8, marks: 6,
        sec: ['db-u7'], js: ['services/simulation.js', 'predict.js', 'sim-drill.js'] },

      { file: 'quiz.html', n: '?',
        title: 'Self-Check Quiz', np: 'आफैं जाँच्ने क्विज',
        chip: 'Quiz',
        sec: ['db-quiz'], js: ['services/quiz.js', 'question-bank.js', 'quiz.js'] }
    ]
  }

};
