/* ============================================================
   SYLLABUS COVERAGE MAP

   WHY THIS FILE EXISTS
   Every other content rule in validate.js protects the SHAPE of a page:
   that a unit has objectives, that a simulation says what it teaches,
   that a misconception carries a hook. None of them can notice the one
   failure that matters most to a student sitting the exam — a syllabus
   topic that was simply never written.

   The build knew the official topic list and knew what had been
   authored, and never compared the two. This is that comparison.

   HOW IT WORKS
   Each entry maps an EXACT topic string from content/syllabus.js to the
   anchor in the lesson that teaches it. The validator then checks three
   things, and each one fails the build:

     1. every syllabus topic for a mapped subject has an entry here
     2. every anchor named here actually exists in the built lesson
     3. no entry names a topic the syllabus no longer contains

   Rule 3 is the one that earns this file's keep over time. When a
   curriculum is revised, a topic's wording changes and the old content
   silently becomes an answer to a question nobody is asking any more.
   Matching on the exact string means the build stops and a human
   decides, rather than the drift going unnoticed for a year.

   WHY EXACT STRINGS AND NOT INDEXES
   An index map survives a topic being reworded, which sounds convenient
   and is precisely the failure above. It also silently reassigns every
   later topic when one is inserted. The string is the contract.

   OPT-IN PER SUBJECT
   Only subjects listed here are checked. As of the Phase 9 continuation
   all four Grade 10 subjects are mapped, so every Grade 10 topic on the
   official list is now gated. The four Grade 9 subjects have outlines
   but no authored lessons, so there is nothing yet to map them to.

   ONE TOPIC MAY NAME SEVERAL ANCHORS
   A value may be a single anchor or an array of them. The official list
   folds sub-items together in one unit and splits them in another, so an
   official topic is sometimes taught across two sections. An array says
   so in data the validator checks, rather than in a comment it cannot.
   ============================================================ */

module.exports = {

  /* ---------------------------------------------------------------
     DS & OOP using C++ — mapped in Phase 9.

     This subject was authored first and had no syllabus outline at all
     until Phase 9, so nothing could check it. Several official topics
     are taught INSIDE a parent section rather than under their own
     heading, and share that section's anchor — the content was read
     and confirmed present in each case, not inferred from the heading.
     Where that happens it is noted.
     --------------------------------------------------------------- */
  'grade10/oop-cpp': {

    /* ---- Unit 1 ---- */
    'Introduction to Data Structures': 't11',
    'Advantages of Data Structures': 't12',
    'Terms Used in Data Structures (Data, Group Item, Record, Entity, Attribute or Field, File)': 't13',
    'Need of Data Structures': 't14',
    /* 1.5 also carries operations, which the lesson splits out at t16 */
    'Classification of Data Structures — Linear (Array, Linked List, Stack, Queue), Non-Linear (Trees, Graphs), and Operations (Searching, Sorting, Insertion, Deletion, Traversing)': 't15',

    /* ---- Unit 2 — the one unit where the lesson numbering matches
       the official numbering one for one ---- */
    'Introduction to Object Oriented Programming': 't21',
    'Features': 't22',
    'Application': 't23',
    'Structured Vs Object Oriented Programming': 't24',
    'Tokens and Character Sets': 't25',
    'Data Type and Format Specific': 't26',
    'Basic Input/ Output': 't27',
    'Basic Program Structure': 't28',
    'Control Statements': 't29',

    /* ---- Unit 3 ---- */
    'Introduction to class and object': 't31',
    'Access Specific': 't32',
    'Declaration of class and object': 't33',
    /* 3.4 has no heading of its own: data members and member functions
       are taught inside 3.3, where declaring a class is demonstrated. */
    'Class Methods and Data Members': 't33',
    'Concept of Constructor and Destructor': 't35',

    /* ---- Unit 4 — the lesson has two headings for six official
       topics; advantages and the C++ demonstration sit inside each. ---- */
    'Introduction to Abstraction': 't41',
    'Advantages of Abstraction': 't41',
    'Achieve Abstraction using C++ Program': 't41',
    'Introduction to Encapsulation': 't44',
    'Advantages of Encapsulation': 't44',
    'Achieve Encapsulation using C++ Program': 't44',

    /* ---- Unit 5 ---- */
    'Introduction to Inheritance': 't51',
    'Advantages of Inheritance': 't51',
    'Base Class and Derived Class': 't51',
    'Syntax of Inheritance': 't54',
    'Types of Inheritance — Single, Multilevel, Multiple, Hierarchical, Hybrid': 't55',

    /* ---- Unit 6 ---- */
    'Introduction to Polymorphism': 't61',
    /* taught in the comparison section at the end of the unit */
    'Advantages of Polymorphism': 't6c',
    /* shown in the overloading section, where the first example is */
    'Syntax of Polymorphism': 't62',
    'Types of Polymorphism': 't64',
    'Function overriding': 't65'
  },

  'grade10/hardware': {

    /* ---- Unit 1 — Introduction to Electronic Devices ---- */
    'Define matter, molecule and atom': 'hw-t11',
    'Introduction to KCL and KVL': 'hw-t12',
    'Semiconductor Material — Doping, P-type, N-type, Majority and Minority charge carriers': 'hw-t13',
    'PN junction Formation, Forward biased and Reverse biased': 'hw-t14',

    /* ---- Unit 2 — Introduction to Computer System ---- */
    'Basic Components of a Computer System': 'hw-t21',
    'Input Unit — Keyboard, Mouse, Scanner, Digital Camera': 'hw-t22',
    'Processing unit — ALU and Control Unit': 'hw-t23',
    'Display unit — Monitor resolution, colour and refresh rate; CRT, LCD and LED': 'hw-t24',

    /* ---- Unit 3 — Overview on System's Core ---- */
    'System BIOS — functions and operations': 'hw-t31',
    'Introduction to Motherboard and form factors': 'hw-t32',
    'Peripheral Component Interconnect (PCI) local bus': 'hw-t33',
    'Power — the internal power supply and its parts': 'hw-t34',
    'Hard drives — construction and operation of a hard disk drive': 'hw-t35',
    /* Partitioning and formatting are taught together in 3.6 because the
       distinction between them is the thing being examined, and 3.6 is
       where both are compared. Two topics may share an anchor. */
    'Partitioning, partition size and drive lettering': 'hw-t36',
    'Formatting and its types': 'hw-t36',

    /* ---- Unit 4 — Troubleshooting Techniques ---- */
    'General troubleshooting techniques': 'hw-t41',
    'Steps of troubleshooting': 'hw-t42',
    'Troubleshooting boot problems': 'hw-t43',
    'Troubleshooting boot-time error messages': 'hw-t44',
    'Troubleshooting system slowdowns': 'hw-t45',
    /* "Specific components" is the same method applied to one part, and
       it is where the faded practice sits rather than a separate
       explanation — the skill IS the application. */
    'Troubleshooting specific components': 'hw-t45',

    /* ---- Unit 5 — Repair and Maintenance ---- */
    'Preventive maintenance of the system': 'hw-t51',
    'Fixing wireless network connection issues': 'hw-t55',
    'Power source and power protection': 'hw-t52',
    'Failure or improper operation of video cards': 'hw-t54',
    'Image quality problems in monitors (resolution, layout)': 'hw-t54',
    'Input and output device connection issues': 'hw-t54',
    'Processor power and voltage level': 'hw-t53',
    'Processor cooling': 'hw-t53',
    'Cooling and ventilation': 'hw-t53',
    'Virus background': 'hw-t56',
    'Virus detection, protection and prevention techniques': 'hw-t56',

    /* ---- Unit 6 — Backup and Recovery ---- */
    'Introduction to Backup and Recovery': 'hw-t61',
    'Backup methods, devices and media': 'hw-t62',
    'Backup scheduling and media rotation systems': 'hw-t63',
    'Introduction to RAID': 'hw-t64',
    'Recovery Techniques': 'hw-t65'
  },

  /* ---------------------------------------------------------------
     DATABASE MANAGEMENT SYSTEM — mapped in the Phase 9 continuation.

     Every entry below was checked by reading the content it points at,
     not by matching a heading. Where the official topic turned out to
     be taught in a callout inside a parent section rather than under a
     heading of its own, the callout is named in a comment so the next
     reader can find it without searching.

     TWO GAPS WERE FOUND BY DOING THIS, and both were filled before the
     map was written, because a map that points at nothing is worse than
     no map:

       2.2 "Entity Set" — the unit's own learning outcome promised it
            and no section taught it. Added to db-t22.
       4.3 "WITH"       — one of the five clauses the official list
            names, absent from a 14-mark unit. Added to db-t43.

     A NOTE ON THE LESSON NUMBERING. The official document folds
     sub-items together in some units and the lessons flatten them, so
     a lesson heading reads "2.6 Keys in DBMS" where the official list
     numbers it 2.4. The topic NAMES match, which is what a student
     searches by, and renumbering six files carries risk with no
     learning gain — so the divergence is recorded here and in
     docs/PHASE-9-CONTINUATION.md rather than papered over.
     --------------------------------------------------------------- */
  'grade10/dbms': {

    /* ---- Unit 1 — Introduction to Database System (6 hrs, 2 marks) ---- */
    'Concept of Data, Information, Database and Database Management System': 'db-t11',
    'Limitations of the File System': 'db-t12',
    'Advantages and Disadvantages of a Database System': 'db-t12',
    /* taught in the callout headed "1.4 — Where database systems are used",
       inside the 1.2 & 1.3 section: seven domains, bilingual */
    'Application of Database System': 'db-t12',
    'Types of Database Users': 'db-t15',
    'DBMS Architecture': 'db-t16',
    'Database Model': 'db-t17',
    'Database Schema': 'db-t17',

    /* ---- Unit 2 — ER-Model (10 hrs, 10 marks) ---- */
    'Introduction to ER-Model': 'db-t21',
    /* entity, weak entity and entity set: the first two in the ER parts
       lab, the third added as prose because nothing taught it */
    'Components — Entity, Weak Entity, Entity Set': 'db-t22',
    /* the six attribute symbols are taught in the parts lab, one press
       each, with the shape a student has to draw */
    'Attributes and Types of Attributes': 'db-t22',
    /* the relationship symbol in the lab; its TYPES in the callout on
       degree — unary, binary, ternary */
    'Relationship and Types of Relationship': 'db-t22',
    'Mapping Cardinalities': 'db-t25',
    'Keys in DBMS': 'db-t26',

    /* ---- Unit 3 — Relational Model (10 hrs, 6 marks) ---- */
    'Introduction to Relational Model': 'db-t31',
    /* all nine concepts are pressable in the table visualiser:
       relation, tuple, attribute, degree, cardinality, domain,
       primary key, relational schema, relational instance */
    'Key Concepts — Tables; Tuple, Cardinality and Column; Attribute, Degree and Domain; Relational Instance; Relational Schema; Relational Key': 'db-t32',
    /* the callout headed "3.3 — The properties of a relation", plus the
       prediction that tests the order-does-not-matter property */
    'Properties of Relations': 'db-t32',
    'Mapping ER-Model to Relational Model': 'db-t34',

    /* ---- Unit 4 — SQL (14 hrs, 14 marks) ---- */
    'Introduction': 'db-t41',
    'DDL — CREATE, ALTER, DROP, RENAME': 'db-t42',
    /* SELECT has its own section; INSERT, UPDATE and DELETE are taught
       in the SQL lab that sits inside the DDL section, where DELETE is
       contrasted with DROP. Two anchors, because the topic is genuinely
       in two places. */
    'DML — SELECT, INSERT, UPDATE, DELETE': ['db-t43', 'db-t42'],
    'DCL — GRANT, REVOKE': 'db-t44',
    'SQL Clauses — WHERE, AND, OR, WITH, ORDER BY': 'db-t43',
    'SQL Joins — Inner, Natural, Left Outer, Right Outer, Full Outer': 'db-t46',
    'SQL View': 'db-t47',

    /* ---- Unit 5 — Relational Database Design (8 hrs, 6 marks) ---- */
    'Functional Dependency and its Types': 'db-t51',
    'Normalization — definition': 'db-t53',
    'Normal Forms — 1NF, 2NF, 3NF': 'db-t53',

    /* ---- Unit 6 — Database Transaction (8 hrs, 6 marks) ---- */
    'Introduction to Transaction': 'db-t61',
    'Concurrency in Transaction': 'db-t62',
    'ACID properties': 'db-t63',
    'States of a Transaction': 'db-t64',

    /* ---- Unit 7 — Backup, Recovery and Security (8 hrs, 6 marks) ---- */
    'Introduction to Backup': 'db-t71',
    'Types of Backup — Physical, Logical': 'db-t71',
    /* the callout headed "7.3 — Why a database fails": hardware,
       software, power, and the rest */
    'Reasons for Database Failure': 'db-t71',
    'Methods of Database Backup': 'db-t74',
    'Concept of Recovery, Redo / Undo': 'db-t75',
    'Introduction to Database Security': 'db-t76',
    /* the callout headed "7.7 — Common threats" */
    'Common Threats in a Database': 'db-t76'
  },

  /* ---------------------------------------------------------------
     DIGITAL DESIGN AND MICROPROCESSOR — mapped in the Phase 9
     continuation, by the same method.

     ONE GAP WAS FOUND AND FILLED. Topics 4.7 to 4.10 — decoder,
     encoder, multiplexer, demultiplexer — were defined only inside a
     static SVG, whose text is English by house convention
     (LANGUAGE-SYSTEM §10). The figure's caption carried the mnemonic
     ("learn them in opposite pairs") but not the definitions, so a
     student reading in Nepali had no definition of a decoder anywhere
     in the unit. A bilingual block now carries all four.

     AN OFFICIAL INCONSISTENCY, RECORDED NOT FIXED. Unit 3 is titled
     "Boolean algebra and Karnaugh Map" and its official content list
     names no Karnaugh map at all. The repo teaches one anyway, at
     #t35, because the title and the SEE paper both demand it. That
     section is therefore NOT in this map: it answers no official topic
     string, and claiming otherwise would be inventing curriculum.
     --------------------------------------------------------------- */
  'grade10/digital-design': {

    /* ---- Unit 1 — Number system and binary arithmetic (12 hrs, 7 marks) ---- */
    'Numbering concept': 't11',
    'Types of numbering system — Decimal, Binary, Octal, Hexadecimal': 't12',
    /* all three official conversions are taught in 1.3, each with its
       own worked example and the number lab to try it in */
    'Decimal integer to binary and binary to decimal conversion': 't13',
    'Decimal fractions to binary conversion': 't13',
    'Octal to decimal and decimal to octal conversion': 't13',
    "1's complement": 't14',
    "2's complement": 't14',
    'Binary addition': 't16',
    'Binary subtraction': 't16',
    'Binary multiplication': 't16',

    /* ---- Unit 2 — Concept of logic gates (14 hrs, 15 marks) ---- */
    'Notations': 't21',
    'Concept of gate and truth table': 't22',
    /* the five basic gates: symbol, expression and truth table each,
       plus the gate workbench to toggle inputs on */
    'Inverter, OR gate, AND gate, NOR gate, NAND gate': 't22',
    'Universal gates': 't226',
    /* the official document numbers this one "3.1" inside Unit 2 — a
       numbering slip in the source; the lesson numbers it 2.3 */
    "De-Morgan's theorem": 't23',

    /* ---- Unit 3 — Boolean algebra and Karnaugh Map (10 hrs, 6 marks) ---- */
    'Boolean relationships and simplification': 't31',
    'Sum of Products (SOP)': 't32',
    'Product of Sums (POS)': 't32',
    'Algebraic simplification': 't34',

    /* ---- Unit 4 — Binary arithmetic and combinational logic (13 hrs, 7 marks) ---- */
    'Half adder': 't41',
    'Binary adder': 't44',
    'Half subtractor': 't43',
    'Full Adder': 't44',
    'Full Subtractor': 't43',
    'Code converters': 't46',
    /* the four block-level circuits share one section, one block
       diagram and one bilingual definition block; the multiplexer also
       has the combinational workbench to drive */
    'Decoder': 't47',
    'Encoder': 't47',
    'Multiplexer': 't47',
    'Demultiplexer': 't47',

    /* ---- Unit 5 — Microprocessor (15 hrs, 15 marks) ---- */
    'Definition of Microprocessor and its applications': 't51',
    'Types of Microprocessor': 't51',
    'Input / Output': 't53',
    'Memory': 't53',
    'Processing unit': 't53',
    'Arithmetic and logical unit, control unit, Registers': 't53',
    /* the CPU block diagram with the three buses and their widths, and
       the callout that gives each bus one line */
    '8085 bus structure and internal architecture': 't53',
    'Pin configuration of 8085': 't58',
    /* flags and interrupts have their own section with the flag-register
       diagram; the registers and the two buses are in 5.3 – 5.6 */
    'Description of each block — Registers, flags, data and address bus, timing and control with interrupts': ['t59', 't53'],
    'Introduction to Addressing modes': 't510'
  }

};
