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
     GRADE 9 · FUNDAMENTALS OF COMPUTER AND APPLICATION — Phase 12.

     THE FIRST PARTIALLY MAPPED SUBJECT. Grade 10 subjects arrived
     complete and were mapped in one go. This one is being written a
     unit at a time, so this map holds Unit 1's four topics and nothing
     else: the other six units have no lessons, and an entry pointing at
     an anchor that does not exist is worse than no entry.

     The validator's three failure modes still apply to what IS here —
     a missing Unit 1 topic, a dangling anchor, a stale entry — and
     tests/curriculum.test.js checks that the map covers exactly the
     units that have pages, so adding Unit 2 without mapping it fails.

     All four topic strings below were verified against CDC 2078
     pp.13-15 by two independent extractions in Phase 12.
     --------------------------------------------------------------- */
  /* ---------------------------------------------------------------
     PROGRAMMING PRINCIPLES IN C — mapped in Phase 14, as each unit was
     written rather than afterwards.

     The official list is unusually coarse in Unit 3, where three
     numbered topics carry sixteen hours and thirteen marks between
     them. The lesson splits each into sub-sections a student can
     navigate; the map keeps ONE entry per official string, because the
     string is the contract and inventing finer entries would be
     inventing curriculum.

     Where an official topic names several things that are genuinely
     taught in two places — 5.5's seven string functions, 4.2's three
     function stages — the entry names both anchors rather than hiding
     half the evidence.
     --------------------------------------------------------------- */
  'grade9/c-programming': {

    /* ---- Unit 1 — Principles of Programming (6 hrs, 5 marks) ---- */
    'Introduction to Programming (Program, Programmer, Programming Language, Software)': 'c-t11',
    'Categories of Programming Language': 'c-t12',
    'Applications — Scientific Application, Business Application': 'c-t13',
    /* 1.4 names two tools. Both are taught in this one section — the
       algorithm in prose with its five properties, the flowchart in the
       symbol figure — and the two worked examples each produce both, so
       they share the anchor rather than being split. */
    'Program Design Tools (Algorithm and Flowchart)': 'c-t14',

    /* ---- Unit 2 — Fundamentals of C (10 hrs, 7 marks) ---- */
    'Introduction to C Programming': 'c-t21',
    /* 2.2 names eight parts of a program. All eight are taught in this
       one section — each with what it is for rather than only what it
       is called — and the program stepper under it shows the order they
       actually happen in, which is the part a list cannot carry. */
    'Basic Program Structure (Preprocessor Directive, Header Files, Tokens, Semicolons, Comments, Identifiers, Whitespace, Escape Sequence)': 'c-t22',
    'Variables and Keywords': 'c-t23',
    'Character Sets, Constants and Variables': 'c-t24',
    'Data Types and Format Specifiers': 'c-t25',
    'Input / Output statements': 'c-t26',
    'Operators in C (Arithmetic, Relational, Logical, Bitwise, Assignment)': 'c-t27',

    /* ---- Unit 3 — Control Flow Statements (16 hrs, 13 marks) ----
       Three official topics for the heaviest unit in the subject. The
       official list folds every sub-item in: 3.1 covers if, if-else and
       switch; 3.2 covers for, while, do-while and nested; 3.3 covers
       break, continue, goto and return. Each is taught across several
       sections of the lesson and the map keeps one entry per official
       string, because the string is the contract. */
    'Decision Making Statements — if, if…else, switch': 'c-t31',
    'Loop Statements — for, while, do-while, nested loops': 'c-t32',
    'Jump Statements — break, continue, goto, return': 'c-t33',

    /* ---- Unit 4 — Functions (12 hrs, 10 marks) ---- */
    'Introduction to Function': 'c-t41',
    /* 4.2 folds three sub-items — declaration, definition, calling. All
       three are taught in this section and named in the drill under it,
       and the worked example labels all three in one program. */
    'Declaration, Definition and Calling of a Function': 'c-t42',
    'Types of Functions — Library Function, User-Defined Function': 'c-t43',
    'Types of Function Call — Call by Value, Call by Reference': 'c-t44',
    'Concept of Recursive Functions': 'c-t45',
    'Advantages of Functions': 'c-t46',

    /* ---- Unit 5 — Arrays & Strings (10 hrs, 8 marks) ---- */
    'Introduction to Array & String': 'c-t51',
    'Declaration and Initialization of Array': 'c-t52',
    'One-Dimensional Array': 'c-t53',
    'Declaration of String': 'c-t54',
    /* 5.5 names seven functions. Four are taught in the section with
       what each returns, and the three that are NOT standard C are
       separated into the callout inside the same section — which is the
       distinction the official list does not draw and a student needs. */
    'String Functions — strlen(), strcpy(), strcat(), strcmp(), strrev(), strlwr(), strupr()': 'c-t55',

    /* ---- Unit 6 — Structure and Union (6 hrs, 5 marks) ----
       6.5 and 6.6 are taught in the section that introduces the union,
       because the declaration and the member access are IDENTICAL to a
       structure's and teaching them apart would imply a difference that
       does not exist. The section says so in those words. */
    'Introduction to Structure': 'c-t61',
    'Declaration of Structure and Structure Variable': 'c-t62',
    'Accessing Member of Structure': 'c-t63',
    'Introduction to Union': 'c-t64',
    'Declaration of Union and Union Variable': 'c-t64',
    'Accessing Member of Union': 'c-t64',

    /* ---- Unit 7 — Pointers (4 hrs, 2 marks) ---- */
    'Introduction to Pointer': 'c-t71',
    'Declaring Pointer and Pointer Variable': 'c-t72',
    'Referencing and Dereferencing': 'c-t73',
    'Advantages of Pointer': 'c-t74'
  },

  'grade9/computer-fundamentals': {

    /* ---- Unit 1 — Introduction to computer (8 hrs, 6 marks) ---- */
    'Introduction to computer': 'cf-t11',
    'Characteristics of computer': 'cf-t12',
    'Modern Applications of computer': 'cf-t13',
    /* 1.4 carries five sub-items — by size, data handling, purpose,
       model and brand. All five are taught in this one section, in the
       prose, the figure and the drill, which is why they share its
       anchor rather than being split out. */
    'Classification of computers — by size, by data handling, by purpose, by model, by brand': 'cf-t14',

    /* ---- Unit 2 — Computer Components (10 hrs, 7 marks) ---- */
    'Introduction to Components of computer system': 'cf-t21',
    /* 2.2 names twelve devices. They are taught in one section — grouped
       by what they do rather than listed — plus the callout that
       separates OMR, OCR, BCR and MICR and the drill that tests the
       separation. One anchor, because splitting twelve devices into
       twelve headings would teach the list and not the grouping. */
    'Input Unit — Keyboard, Mouse, Joystick, OMR, OCR, BCR, MICR, Scanner, Touch Screen, Touchpad, Microphone, Digital Camera': 'cf-t22',
    'Output Unit — softcopy: Monitors (CRT, LCD, LED/Plasma), Speaker, Projector, Headphone; hardcopy: Printers (impact, non-impact, 3D), Graphic plotter': 'cf-t23',
    'Concept of Memory unit': 'cf-t24',
    'Processing unit — Microprocessor: clock speed, word length, components and functions': 'cf-t25',

    /* ---- Unit 3 — Computer Software (10 hrs, 9 marks) ---- */
    'Introduction to Computer software': 'cf-t31',
    'Types of software and its features': 'cf-t32',
    'Introduction to Operating System': 'cf-t33',
    'Functions and characteristics of Operating System': 'cf-t34',
    'Types of Operating System': 'cf-t35',
    'User interface — CUI and GUI': 'cf-t36',
    'OSS (Open Source Software)': 'cf-t37',

    /* ---- Unit 4 — Memory / Storage Unit (10 hrs, 8 marks) ---- */
    'Memory definition': 'cf-t41',
    'Types of Memory': 'cf-t42',
    'Cache Memory': 'cf-t43',
    /* 4.4 and 4.5 each carry a characteristics sub-item and a types
       sub-item. Both are taught inside the one section — the callout
       under 4.4 holds the RAM/ROM families, and 4.5's three storage
       families are in its own prose — so each official topic keeps one
       anchor rather than being split by sub-item. */
    'Primary / Main memory — characteristics; RAM (SRAM, DRAM); ROM (PROM, EPROM, EEPROM)': 'cf-t44',
    'Secondary Memory — characteristics; Magnetic (Hard disk, SSD); Optical (CD/DVD, Blu-ray); Flash (Pen-drive)': 'cf-t45',

    /* ---- Unit 5 — Internet and its Application (10 hrs, 8 marks) ---- */
    'Introduction to Internet and its advantages': 'cf-t51',
    'Requirements for Internet connection': 'cf-t52',
    /* 5.3 names nine services as sub-items. All nine are taught in this
       one section, each with the problem it solved, and the drill tests
       six of them against real tasks — so they share the anchor. */
    'Applications — WWW, E-mail, Newsgroup, Telnet, IRC, E-commerce, Search engine, E-Governance, Remote Control': 'cf-t53',

    /* ---- Unit 6 — Multimedia (8 hrs, 6 marks) ---- */
    'Introduction to Multimedia': 'cf-t61',
    'Components — Text, Audio, Video, Image, Animation': 'cf-t62',
    'Application of Multimedia': 'cf-t63',

    /* ---- Unit 7 — Emerging Technology (8 hrs, 6 marks) ----
       Nine official topics for six marks, so each is taught briefly and
       each has its own section. 7.3 is one numbered topic naming two
       ideas, and they are taught together because the examination asks
       students to tell them apart. */
    'Introduction to Emerging Technology': 'cf-t71',
    'Concept of AI': 'cf-t72',
    'Cloud Computing and distributed computing': 'cf-t73',
    'Concept of IoT': 'cf-t74',
    'Concept of Big data': 'cf-t75',
    'Concept of Data mining': 'cf-t76',
    'Cryptography (Encryption and Decryption)': 'cf-t77',
    'Concept of VR (Virtual Reality)': 'cf-t78',
    'Concept of AR (Augmented Reality)': 'cf-t79'
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
