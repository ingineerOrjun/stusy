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
   Only subjects listed here are checked. The three subjects written
   before this rule existed are not retro-fitted, because inventing
   their coverage map now would be recording a guess as a fact — see
   the completion report.
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
  }

};
