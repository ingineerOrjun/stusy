/* ============================================================
   PREREQUISITE GRAPH — what a unit assumes you already know

   WHY THIS FILE HOLDS ONLY THE EDGES
   A unit's title, its page, its hours and its marks already live in
   config/pages.js, and its objectives already live in its lesson. None
   of that is repeated here. This file holds the one thing nothing else
   records: which unit depends on which, and WHY.

   WHY THE "WHY" IS NOT OPTIONAL
   "You should already know Unit 3" is a link. "You need the difference
   between a primary key and a foreign key from Unit 3, because a partial
   dependency is defined against part of a composite key" is a diagnosis.
   A student who has just failed a normalisation question needs the
   second: it tells them what to re-read, not just where.

   So the reason names the SPECIFIC piece of the earlier unit, and it is
   written for a student who is currently stuck — not as a summary of the
   earlier unit.

   THE SHAPE

       '<subject>/<unit>': [ { unit: '<subject>/<unit>', why: {en, ne} } ]

   Subject-qualified on both sides so that a future cross-subject
   prerequisite — Grade 11 DBMS assuming Grade 10 DBMS — needs no change
   to the model. Nothing here is specific to a subject; the build and the
   runtime never learn a subject's name.

   RULES ENFORCED BY THE BUILD
     · every unit named on either side must exist in config/pages.js
     · no unit may be its own prerequisite, directly or through a cycle
     · every reason carries both languages
   ============================================================ */

module.exports = {

  /* ---------------------------------------------------------------
     DIGITAL DESIGN & MICROPROCESSOR
     Number systems is the entry point: everything else in the subject
     is expressed in binary sooner or later.
     --------------------------------------------------------------- */

  'grade10/digital-design/u1': [],

  'grade10/digital-design/u2': [
    { unit: 'grade10/digital-design/u1',
      why: { en: 'A gate\'s inputs and output are single binary digits. If 0 and 1 as ' +
                 'values — rather than as the characters "0" and "1" — are not yet solid, ' +
                 'a truth table looks like a table of symbols instead of a table of results.',
             ne: 'गेटका इनपुट र आउटपुट एक–एक बाइनरी अङ्क हुन्। 0 र 1 लाई अक्षर होइन मानका रूपमा ' +
                 'बुझिएको छैन भने truth table नतिजाको तालिका नभई चिन्हहरूको तालिका जस्तो देखिन्छ।' } }
  ],

  'grade10/digital-design/u3': [
    { unit: 'grade10/digital-design/u2',
      why: { en: 'Every Boolean law is a statement about gates, and SOP and POS are read ' +
                 'straight off a truth table. Without the truth table of AND, OR and NOT, ' +
                 'simplification is symbol-shuffling with nothing underneath it.',
             ne: 'हरेक Boolean नियम गेटकै कुरा हो, र SOP–POS सिधै truth table बाट पढिन्छ। ' +
                 'AND, OR, NOT को truth table नभई simplification तल केही नभएको चिन्ह सार्ने काम बन्छ।' } },
    { unit: 'grade10/digital-design/u1',
      why: { en: 'A K-map is labelled in Gray-code order — 00, 01, 11, 10 — and a minterm ' +
                 'number is a binary number. Both come from Unit 1.',
             ne: 'K-map लाई Gray-code क्रममा — 00, 01, 11, 10 — लेखिन्छ, र minterm नम्बर ' +
                 'बाइनरी सङ्ख्या हो। दुवै युनिट १ बाट आउँछन्।' } }
  ],

  'grade10/digital-design/u4': [
    { unit: 'grade10/digital-design/u2',
      why: { en: 'A half adder IS an XOR and an AND. Deriving an adder from its truth table ' +
                 'is the same skill as reading a gate\'s truth table, applied to two outputs ' +
                 'at once.',
             ne: 'Half adder भनेकै XOR र AND हो। truth table बाट adder निकाल्नु भनेको गेटको ' +
                 'truth table पढ्ने त्यही सीप हो, दुई आउटपुटमा एकैचोटि लगाइएको।' } },
    { unit: 'grade10/digital-design/u1',
      why: { en: 'Carry and borrow are binary addition and subtraction. The adder circuit is ' +
                 'built to do what you did on paper in Unit 1.',
             ne: 'Carry र borrow बाइनरी जोड–घटाउ नै हुन्। युनिट १ मा कागजमा गरेकै काम गर्न ' +
                 'adder सर्किट बनाइएको हो।' } }
  ],

  'grade10/digital-design/u5': [
    { unit: 'grade10/digital-design/u1',
      why: { en: 'Every address, opcode and register value in the 8085 is written in ' +
                 'hexadecimal. Reading 2000H as a place in memory needs hex from Unit 1.',
             ne: '8085 का हरेक ठेगाना, opcode र register मान hexadecimal मा लेखिन्छन्। ' +
                 '2000H लाई मेमोरीको ठाउँ भनेर पढ्न युनिट १ को hex चाहिन्छ।' } },
    { unit: 'grade10/digital-design/u4',
      why: { en: 'The ALU inside the processor is the adder you built in Unit 4. The flags it ' +
                 'sets — carry, zero — are that circuit reporting on its own result.',
             ne: 'प्रोसेसरभित्रको ALU युनिट ४ मा बनाएकै adder हो। यसले राख्ने flag — carry, ' +
                 'zero — त्यही सर्किटले आफ्नै नतिजा बताएको हो।' } }
  ],

  /* ---------------------------------------------------------------
     DATABASE MANAGEMENT SYSTEM
     A straight chain, because the subject is one: model the data, put it
     in tables, query it, fix the design, protect it.
     --------------------------------------------------------------- */

  'grade10/dbms/u1': [],

  'grade10/dbms/u2': [
    { unit: 'grade10/dbms/u1',
      why: { en: 'The ER model exists to design a database before it is built. If "database" ' +
                 'and "DBMS" are still the same word, it is not clear what an ER diagram is a ' +
                 'design OF.',
             ne: 'डाटाबेस बनाउनुअघि डिजाइन गर्न ER model छ। "database" र "DBMS" अझै एउटै शब्द ' +
                 'भए ER diagram केको डिजाइन हो भन्ने प्रस्ट हुँदैन।' } }
  ],

  'grade10/dbms/u3': [
    { unit: 'grade10/dbms/u2',
      why: { en: 'A table is what an entity becomes, and a foreign key is what a relationship ' +
                 'becomes. Converting ER to relational is the whole of topic 3.4, and it is ' +
                 'impossible without the ER half.',
             ne: 'Entity तालिका बन्छ, र relationship foreign key बन्छ। ER लाई relational मा ' +
                 'बदल्नु नै टपिक ३.४ हो, र ER पक्ष नभई त्यो सम्भव छैन।' } }
  ],

  'grade10/dbms/u4': [
    { unit: 'grade10/dbms/u3',
      why: { en: 'SELECT chooses columns and WHERE chooses rows. Those two words are the ' +
                 'relational vocabulary from Unit 3, and mixing up degree and cardinality ' +
                 'there becomes mixing up SELECT and WHERE here.',
             ne: 'SELECT ले स्तम्भ छान्छ, WHERE ले पङ्क्ति। यी दुई शब्द युनिट ३ कै relational ' +
                 'शब्दावली हुन्, र त्यहाँ degree–cardinality मिसिनु यहाँ SELECT–WHERE मिसिनु हो।' } }
  ],

  'grade10/dbms/u5': [
    { unit: 'grade10/dbms/u3',
      why: { en: 'A partial dependency is defined against PART of a composite key, and a ' +
                 'transitive one against a NON-KEY column. Neither definition can be applied ' +
                 'without the key vocabulary from Unit 3.',
             ne: 'Partial dependency composite key को एक भागविरुद्ध, र transitive चाहिँ ' +
                 'NON-KEY स्तम्भविरुद्ध परिभाषित हुन्छ। युनिट ३ को key शब्दावली नभई दुवै लागू गर्न सकिँदैन।' } },
    { unit: 'grade10/dbms/u2',
      why: { en: 'Normalisation splits one table into several and links them with foreign ' +
                 'keys — which is the M:N junction table from Unit 2, arrived at from the ' +
                 'other direction.',
             ne: 'Normalization ले एउटा तालिकालाई धेरैमा छुट्याएर foreign key ले जोड्छ — ' +
                 'त्यो युनिट २ कै M:N junction तालिका हो, अर्को बाटोबाट आइपुगेको।' } }
  ],

  'grade10/dbms/u6': [
    { unit: 'grade10/dbms/u4',
      why: { en: 'A transaction is a group of SQL statements treated as one. UPDATE, INSERT ' +
                 'and DELETE from Unit 4 are what a transaction commits or rolls back.',
             ne: 'Transaction भनेको एउटै मानिने SQL कथनहरूको समूह हो। युनिट ४ का UPDATE, ' +
                 'INSERT, DELETE नै transaction ले commit वा rollback गर्ने कुरा हुन्।' } }
  ],

  'grade10/dbms/u7': [
    { unit: 'grade10/dbms/u6',
      why: { en: 'Recovery uses the log to redo committed transactions and undo uncommitted ' +
                 'ones. "Committed" and "uncommitted" are Unit 6\'s transaction states.',
             ne: 'Recovery ले log प्रयोग गरी commit भएका transaction redo र नभएका undo गर्छ। ' +
                 '"Committed" र "uncommitted" युनिट ६ कै transaction अवस्था हुन्।' } }
  ],

  /* ---------------------------------------------------------------
     DS & OOP WITH C++
     Two entry points — data structures and the language itself — that
     converge at Class and Object and then run in a chain.
     --------------------------------------------------------------- */

  'grade10/oop-cpp/u1': [],

  'grade10/oop-cpp/u2': [],

  'grade10/oop-cpp/u3': [
    { unit: 'grade10/oop-cpp/u2',
      why: { en: 'A class is written in C++, so its declaration uses the tokens, data types ' +
                 'and program structure from Unit 2. Encapsulation is also one of the seven ' +
                 'features listed there — Unit 3 is where it stops being a word.',
             ne: 'Class C++ मै लेखिन्छ, त्यसैले यसको घोषणामा युनिट २ का token, data type र ' +
                 'प्रोग्राम संरचना चाहिन्छ। Encapsulation पनि त्यहीँका सात विशेषतामध्ये एक हो — ' +
                 'युनिट ३ मा त्यो शब्द मात्र रहँदैन।' } }
  ],

  'grade10/oop-cpp/u4': [
    { unit: 'grade10/oop-cpp/u3',
      why: { en: 'Encapsulation IS private data with public functions, and abstraction is ' +
                 'what the public half shows. Both are read off the access specifiers from ' +
                 'Unit 3; without them the two words stay interchangeable.',
             ne: 'Encapsulation भनेकै private data र public function हो, र abstraction भनेको ' +
                 'त्यो public पक्षले देखाउने कुरा। दुवै युनिट ३ का access specifier बाट पढिन्छन्; ' +
                 'ती नभई यी दुई शब्द साट्न मिल्ने जस्तै रहन्छन्।' } }
  ],

  'grade10/oop-cpp/u5': [
    { unit: 'grade10/oop-cpp/u3',
      why: { en: 'Inheritance is about which members a derived class can reach, so the answer ' +
                 'is always an access specifier from Unit 3. Constructor and destructor order ' +
                 'also assumes you know what a constructor does at all.',
             ne: 'Inheritance भनेको derived कक्षाले कुन member छुन पाउँछ भन्ने हो, त्यसैले ' +
                 'उत्तर सधैं युनिट ३ कै access specifier हुन्छ। Constructor–destructor क्रमले पनि ' +
                 'constructor के गर्छ भन्ने थाहा भएको मान्छ।' } }
  ],

  'grade10/oop-cpp/u6': [
    { unit: 'grade10/oop-cpp/u5',
      why: { en: 'Run-time polymorphism needs a base class pointer pointing at a derived ' +
                 'object, which only exists once there is inheritance. Overriding is a derived ' +
                 'class replacing a base class function.',
             ne: 'Run-time polymorphism लाई derived वस्तुतर्फ देखाउने base class pointer चाहिन्छ, ' +
                 'जुन inheritance भएपछि मात्र हुन्छ। Overriding भनेको derived कक्षाले base ' +
                 'कक्षाको function फेर्नु हो।' } },
    { unit: 'grade10/oop-cpp/u3',
      why: { en: 'Overloading is two member functions with the same name in one class, so the ' +
                 'class and its member functions from Unit 3 come first.',
             ne: 'Overloading भनेको एउटै कक्षामा एउटै नामका दुई member function हुनु हो, ' +
                 'त्यसैले युनिट ३ का class र member function पहिले चाहिन्छन्।' } }
  ]

};
