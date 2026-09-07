/* ============================================================
   NEPALI HEADINGS

   WHY THIS FILE EXISTS
   Every paragraph in the product is bilingual. Headings were not, and a
   heading is how a page gets skimmed — by eye, and by a screen-reader
   user pressing H. Phase 5 measured the outline at 20% Nepali and Phase
   7 noted that the prerequisite work made it MORE visible, not less: a
   student now reads a fully bilingual diagnosis and then meets an
   English heading.

   THE RULE FOLLOWED FOR EVERY LINE BELOW
   Technical terms stay in English. That is not laziness — it is the
   vocabulary of the exam paper, and a student who learns "सम्बन्धात्मक
   बीजगणित" instead of "relational algebra" has been given a word they
   will never see again. What gets translated is the instructional
   language AROUND the term, which is where the meaning is:

       4.1 The three families of SQL   ->  SQL का तीन परिवार
       5.4 Syntax of Inheritance       ->  Inheritance को syntax
       2.2.6 Universal gates           ->  (left alone: it is a term)

   So a Nepali-mode heading reads as Nepali carrying English nouns,
   which is how the subject is actually taught and spoken in a Nepali
   classroom.

   WHAT IS NOT HERE
   Headings that are a bare technical term with no instructional
   language. tests/manual/heading-lang.js classifies those and they are
   deliberately left in English.

   HOW IT IS APPLIED
   The build wraps the English half in .t-en and appends the Nepali half
   in .t-ne, which is the pattern the existing bilingual headings already
   use — so English mode shows English, Nepali mode shows Nepali, and
   bilingual mode shows both separated by an em dash.
   ============================================================ */

module.exports = {

  /* ---- repeated across units: four lines, forty-eight headings ---- */
  'By the end of this unit you can…':          'यो युनिट सकिँदा तपाईं यी कुरा गर्न सक्नुहुनेछ',
  'Mistakes that cost marks here':             'यहाँ अङ्क गुमाउने गल्तीहरू',
  'Exam focus — what is asked from this unit': 'परीक्षा केन्द्रबिन्दु — यो युनिटबाट के सोधिन्छ',
  'Exam focus — questions asked from this unit': 'परीक्षा केन्द्रबिन्दु — यो युनिटबाट सोधिने प्रश्न',

  /* ---- DBMS ---- */
  'Introduction to Database System':            'डाटाबेस प्रणालीको परिचय',
  'Sort each one: data, information, database or DBMS?':
    'हरेकलाई छुट्याउनुहोस्: data, information, database कि DBMS?',
  '1.2 & 1.3 Why the file system was not enough': 'file system किन पुगेन',
  '1.5 Types of database user':                 'database प्रयोगकर्ताका प्रकार',
  '1.7 & 1.8 Database models, schema and instance': 'Database model, schema र instance',

  '2.2 – 2.4 The components of an ER diagram':  'ER diagram का अङ्गहरू',
  'Every ER component, one at a time':          'हरेक ER अङ्ग, एक–एक गरी',
  'The ER visualiser — what a cardinality actually means':
    'ER भिजुअलाइजर — cardinality ले साँच्चै के जनाउँछ',
  'Read the sentence, name the cardinality':    'वाक्य पढेर cardinality भन्नुहोस्',
  '2.6 Keys in DBMS':                           'DBMS मा key हरू',

  '3.2 The vocabulary, on one table':           'एउटै तालिकामा सबै शब्दावली',
  'The relational table visualiser':            'Relational तालिका भिजुअलाइजर',
  '3.4 Mapping the ER model to the relational model':
    'ER model लाई relational model मा बदल्ने',
  'Keys, and the rule that links two tables':   'Key हरू, र दुई तालिका जोड्ने नियम',

  '4.1 The three families of SQL':              'SQL का तीन परिवार',
  '4.3 & 4.5 SELECT — asking the database a question':
    'SELECT — डाटाबेससँग प्रश्न सोध्नु',
  'The SQL simulator':                          'SQL सिमुलेटर',
  '4.2 DDL — building and removing the structure':
    'DDL — संरचना बनाउने र हटाउने',
  'Changing the data — and the difference that costs marks':
    'डाटा बदल्नु — र अङ्क गुमाउने फरक',
  'The same query, five joins':                 'उही query, पाँच join',
  '4.4 DCL — who is allowed to use the data':   'DCL — डाटा कसले प्रयोग गर्न पाउँछ',

  '5.2 & 5.3 Normalization to 3NF':             '3NF सम्म normalization',
  'Which normal form does this table break?':   'यो तालिकाले कुन normal form भङ्ग गर्छ?',

  '6.1 What a transaction is':                  'Transaction भनेको के हो',
  'Watch a withdrawal disappear':               'एउटा निकासी हराएको हेर्नुहोस्',
  '6.4 States of a transaction':                'Transaction का अवस्थाहरू',

  'Database Backup, Recovery and Security':     'डाटाबेस Backup, Recovery र Security',
  '7.1 – 7.3 Backup, and what it protects against':
    'Backup, र यसले केबाट जोगाउँछ',
  '7.4 Methods of backup':                      'Backup का तरिका',
  '7.5 Recovery — redo and undo':               'Recovery — redo र undo',
  'Redo or undo? Decide from the log':          'Redo कि undo? Log हेरेर निर्णय गर्नुहोस्',

  /* ---- Digital Design ---- */
  'Number System and Binary Arithmetic':        'संख्या प्रणाली र बाइनरी गणित',
  '1.1 The numbering concept':                  'सङ्ख्या लेख्ने अवधारणा',
  '1.2 The four number systems':                'चार वटा संख्या प्रणाली',
  'The place-value converter':                  'स्थानीय मान परिवर्तक',
  '1.3 Converting between bases':               'एक base बाट अर्कोमा बदल्ने',
  '1.3.2 Decimal fractions to binary':          'दशमलव भिन्नलाई binary मा',
  "1.4 & 1.5 1's complement and 2's complement": "1's complement र 2's complement",
  'Binary addition, one column at a time':      'Binary जोड, एक–एक स्तम्भ गरी',

  'Concept of Logic Gates':                     'लजिक गेटको अवधारणा',
  '2.1 Notations — three ways to write the same gate':
    'Notation — उही गेट लेख्ने तीन तरिका',
  '2.2 The concept of a gate and its truth table':
    'गेटको अवधारणा र यसको truth table',
  'The gate workbench':                         'गेट कार्यशाला',
  'Reading each gate in one sentence':          'हरेक गेटलाई एउटै वाक्यमा पढ्नु',
  'Does NAND with both inputs joined really behave like NOT?':
    'दुवै input जोडिएको NAND साँच्चै NOT जस्तै हुन्छ?',

  'Boolean Algebra and Karnaugh Map':           'बुलियन बीजगणित र Karnaugh map',
  '3.1 Boolean relationships and laws':         'Boolean सम्बन्ध र नियम',
  '3.2 & 3.3 Sum of Products and Product of Sums':
    'Sum of Products र Product of Sums',
  'Karnaugh map — simplifying by picture':      'Karnaugh map — चित्रबाट सरल बनाउने',
  'The Karnaugh map workbench':                 'Karnaugh map कार्यशाला',

  'Binary Arithmetic and Combinational Logic':  'बाइनरी गणित र combinational logic',
  'The combinational circuit workbench':        'Combinational सर्किट कार्यशाला',
  '4.4 Full adder, and the binary adder':       'Full adder, र binary adder',
  'Which input does the multiplexer let through?':
    'Multiplexer ले कुन input पास गर्छ?',

  'Introduction to Microprocessor':             'माइक्रोप्रोसेसरको परिचय',
  '5.1 & 5.2 What a microprocessor is':         'माइक्रोप्रोसेसर भनेको के हो',
  '5.3 – 5.6 The blocks of a microprocessor system':
    'माइक्रोप्रोसेसर प्रणालीका खण्डहरू',
  '5.7 The instruction cycle':                  'Instruction cycle',
  'Run three instructions through the 8085':    '8085 मा तीन instruction चलाउनुहोस्',
  '5.9 Flags and interrupts':                   'Flag र interrupt',
  '5.8 Pin configuration of the 8085':          '8085 को pin configuration',

  /* ---- DS & OOP with C++ ---- */
  'Basic Introduction to Data Structure':       'डाटा स्ट्रक्चरको आधारभूत परिचय',
  '1.1 What is a Data Structure?':              'Data structure भनेको के हो?',
  '1.2 Advantages of Data Structures':          'Data structure का फाइदा',
  '1.3 Terms Used in Data Structures':          'Data structure मा प्रयोग हुने शब्द',
  '1.4 Need of Data Structures':                'Data structure किन चाहिन्छ',
  '1.5 Classification of Data Structures':      'Data structure को वर्गीकरण',
  'Why this difference matters — array vs linked list in action':
    'यो फरक किन महत्त्वपूर्ण छ — array र linked list व्यवहारमा',
  '▶ Experiment — Stack (LIFO) vs Queue (FIFO)':
    '▶ प्रयोग — Stack (LIFO) र Queue (FIFO)',
  'Stack and Queue, side by side':              'Stack र Queue, सँगसँगै',

  'Concept of Object Oriented Programming (OOP) using C++':
    'C++ मा Object Oriented Programming (OOP) को अवधारणा',
  '2.1 What is Object Oriented Programming?':   'Object Oriented Programming भनेको के हो?',
  'Why OOP was invented — the problem it solves':
    'OOP किन आयो — यसले कुन समस्या हल गर्छ',
  '2.2 Features of OOP':                        'OOP का विशेषता',
  '2.3 Applications of OOP':                    'OOP का प्रयोग',
  'Name the feature from what the program does':
    'प्रोग्रामले गर्ने कामबाट विशेषता चिन्नुहोस्',
  '2.5 Tokens and Character Set':               'Token र character set',
  '2.6 Data Types and Format':                  'Data type र format',
  '2.7 Basic Input and Output':                 'आधारभूत input र output',

  'Class and Object':                           'Class र Object',
  '3.1 Class and Object':                       'Class र Object',
  'Does this line compile?':                    'यो लाइन compile हुन्छ?',
  '3.3 Declaring a Class and its Objects':      'Class र यसका object घोषणा गर्ने',
  'Defining a member function outside the class':
    'Class बाहिर member function परिभाषित गर्ने',
  '3.5 Constructor and Destructor':             'Constructor र Destructor',

  'Abstraction and Encapsulation':              'Abstraction र Encapsulation',
  'Abstract class and pure virtual function':   'Abstract class र pure virtual function',
  'The difference students always get wrong':   'विद्यार्थीले सधैं गल्ती गर्ने फरक',
  'Abstraction or encapsulation? Decide, then check':
    'Abstraction कि encapsulation? निर्णय गरेर जाँच्नुहोस्',

  '5.1 What is Inheritance?':                   'Inheritance भनेको के हो?',
  '5.4 Syntax of Inheritance':                  'Inheritance को syntax',
  'What the derived class actually receives':   'Derived class ले साँच्चै के पाउँछ',
  '5.5 Types of Inheritance':                   'Inheritance का प्रकार',
  'The diamond problem and virtual base class': 'Diamond problem र virtual base class',
  'Name the type of inheritance from the code': 'कोड हेरेर inheritance को प्रकार भन्नुहोस्',
  'Constructor and destructor order — asked very often':
    'Constructor र destructor को क्रम — धेरै सोधिन्छ',

  '6.1 What is Polymorphism?':                  'Polymorphism भनेको के हो?',
  '6.4 Types of Polymorphism':                  'Polymorphism का प्रकार',
  'A. Compile-time Polymorphism':               'क. Compile-time polymorphism',
  '▶ Experiment — Which function actually runs?':
    '▶ प्रयोग — साँच्चै कुन function चल्छ?',
  'Overloading vs Overriding — the key table':  'Overloading र Overriding — मुख्य तालिका'

};
