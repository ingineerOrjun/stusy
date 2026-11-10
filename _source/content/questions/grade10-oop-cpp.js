/* ============================================================
   QUESTION BANK — Grade 10 · Data Structure & OOP using C++

   Every question is tagged with the unit and topic it examines, its
   difficulty, and its type, so a future quiz generator can select by
   any of them. The build projects this bank into the runtime shape the
   quiz engine consumes; the engine never sees this file directly.

   Contract: docs/ASSESSMENT-ARCHITECTURE.md
   ============================================================ */
module.exports = [
  {
    "id": "g10.oop-cpp.q01",
    "subject": "grade10/oop-cpp",
    "unit": "u1",
    "topic": "stack-lifo",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which data structure follows the LIFO (Last In, First Out) principle?",
      "ne": "कुन डाटा स्ट्रक्चरले LIFO (Last In, First Out) सिद्धान्त पछ्याउँछ?"
    },
    "options": [
      {
        "en": "Queue",
        "ne": "Queue (क्यू)"
      },
      {
        "en": "Stack",
        "ne": "Stack (स्ट्याक)"
      },
      {
        "en": "Tree",
        "ne": "Tree (ट्री)"
      },
      {
        "en": "Graph",
        "ne": "Graph (ग्राफ)"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A stack inserts and deletes at only one end called the top, so the last value pushed is the first one popped.",
      "ne": "स्ट्याकले एउटै छेउ (top) बाट राख्छ र झिक्छ, त्यसैले अन्तिममा हालेको पहिले निस्कन्छ।"
    }
  },
  {
    "id": "g10.oop-cpp.q02",
    "subject": "grade10/oop-cpp",
    "unit": "u3",
    "topic": "access-specifiers",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "If no access specifier is written inside a C++ class, the members are by default:",
      "ne": "C++ क्लासभित्र कुनै access specifier नलेखिएमा मेम्बरहरू पूर्वनिर्धारित रूपमा के हुन्छन्?"
    },
    "options": [
      {
        "en": "public"
      },
      {
        "en": "protected"
      },
      {
        "en": "private"
      },
      {
        "en": "static"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "Members of a class are private by default. (In a struct they are public by default.)",
      "ne": "क्लासका मेम्बर पूर्वनिर्धारित रूपमा private हुन्छन्। (struct मा चाहिँ public हुन्छन्।)"
    }
  },
  {
    "id": "g10.oop-cpp.q03",
    "subject": "grade10/oop-cpp",
    "unit": "u1",
    "topic": "linear-vs-nonlinear",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which of the following is NOT a linear data structure?",
      "ne": "तलमध्ये कुन linear डाटा स्ट्रक्चर होइन?"
    },
    "options": [
      {
        "en": "Array",
        "ne": "Array (एरे)"
      },
      {
        "en": "Stack",
        "ne": "Stack (स्ट्याक)"
      },
      {
        "en": "Queue",
        "ne": "Queue (क्यू)"
      },
      {
        "en": "Tree",
        "ne": "Tree (ट्री)"
      }
    ],
    "answer": 3,
    "explanation": {
      "en": "A tree is non-linear because it is hierarchical — one node can connect to many child nodes.",
      "ne": "ट्री अरेखीय हो किनकि यो तह–तह मिलेको हुन्छ — एउटा नोड धेरै सन्तानसँग जोडिन सक्छ।"
    }
  },
  {
    "id": "g10.oop-cpp.q04",
    "subject": "grade10/oop-cpp",
    "unit": "u3",
    "topic": "constructor",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A constructor in C++ has:",
      "ne": "C++ मा constructor को के हुन्छ?"
    },
    "options": [
      {
        "en": "return type void",
        "ne": "return type void हुन्छ"
      },
      {
        "en": "the same return type as the class",
        "ne": "क्लासकै जस्तै return type हुन्छ"
      },
      {
        "en": "no return type at all",
        "ne": "कुनै return type नै हुँदैन"
      },
      {
        "en": "int as its return type",
        "ne": "return type int हुन्छ"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "A constructor has no return type — not even void. Its name must exactly match the class name.",
      "ne": "कन्स्ट्रक्टरको return type हुँदैन — void पनि होइन। नाम क्लासकै नामसँग ठ्याक्कै मिल्नुपर्छ।"
    }
  },
  {
    "id": "g10.oop-cpp.q05",
    "subject": "grade10/oop-cpp",
    "unit": "u3",
    "topic": "destructor",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which symbol is written before a destructor name?",
      "ne": "Destructor को नाम अगाडि कुन चिन्ह लेखिन्छ?"
    },
    "options": [
      {
        "en": "#"
      },
      {
        "en": "&"
      },
      {
        "en": "~"
      },
      {
        "en": "::"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "A destructor is written as ~ClassName(). The tilde (~) marks it as a destructor.",
      "ne": "डिस्ट्रक्टर ~ClassName() भनेर लेखिन्छ। टिल्ड (~) ले यो डिस्ट्रक्टर हो भन्ने जनाउँछ।"
    }
  },
  {
    "id": "g10.oop-cpp.q06",
    "subject": "grade10/oop-cpp",
    "unit": "u6",
    "topic": "compile-time-polymorphism",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Function overloading is an example of which type of polymorphism?",
      "ne": "Function overloading कुन किसिमको polymorphism को उदाहरण हो?"
    },
    "options": [
      {
        "en": "Run-time polymorphism",
        "ne": "Run-time polymorphism"
      },
      {
        "en": "Compile-time polymorphism",
        "ne": "Compile-time polymorphism"
      },
      {
        "en": "Dynamic binding",
        "ne": "Dynamic binding"
      },
      {
        "en": "Late binding",
        "ne": "Late binding"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "In overloading the compiler picks the correct function from the arguments before the program runs, so it is compile-time (static) polymorphism.",
      "ne": "Overloading मा कम्पाइलरले आर्गुमेन्ट हेरेर प्रोग्राम चल्नु अघि नै सही फङ्सन छान्छ, त्यसैले यो compile-time polymorphism हो।"
    }
  },
  {
    "id": "g10.oop-cpp.q07",
    "subject": "grade10/oop-cpp",
    "unit": "u6",
    "topic": "overriding",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Function overriding is possible only when there is:",
      "ne": "Function overriding कहिले मात्र सम्भव हुन्छ?"
    },
    "options": [
      {
        "en": "operator overloading",
        "ne": "operator overloading हुँदा"
      },
      {
        "en": "inheritance",
        "ne": "inheritance हुँदा"
      },
      {
        "en": "a friend function",
        "ne": "friend function हुँदा"
      },
      {
        "en": "a static member",
        "ne": "static member हुँदा"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Overriding means a derived class redefines a base class function, so a base and derived class — that is, inheritance — must exist.",
      "ne": "Overriding मा derived क्लासले base क्लासको फङ्सन पुनः लेख्छ, त्यसैले base र derived क्लास — अर्थात् inheritance — हुनैपर्छ।"
    }
  },
  {
    "id": "g10.oop-cpp.q08",
    "subject": "grade10/oop-cpp",
    "unit": "u5",
    "topic": "constructor-order",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "In multilevel inheritance Animal → Dog → Puppy, when a Puppy object is created, which constructor runs FIRST?",
      "ne": "Multilevel inheritance Animal → Dog → Puppy मा Puppy अब्जेक्ट बन्दा कुन constructor सबैभन्दा पहिले चल्छ?"
    },
    "options": [
      {
        "en": "Puppy constructor",
        "ne": "Puppy को constructor"
      },
      {
        "en": "Dog constructor",
        "ne": "Dog को constructor"
      },
      {
        "en": "Animal constructor",
        "ne": "Animal को constructor"
      },
      {
        "en": "All three run at the same time",
        "ne": "तीनै एकैचोटि चल्छन्"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "Base class constructors always run before derived ones, starting from the top-most base. So the order is Animal, then Dog, then Puppy.",
      "ne": "Base क्लासको कन्स्ट्रक्टर सधैं derived भन्दा पहिले चल्छ, सबैभन्दा माथिबाट सुरु हुँदै। क्रम: Animal → Dog → Puppy।"
    }
  },
  {
    "id": "g10.oop-cpp.q09",
    "subject": "grade10/oop-cpp",
    "unit": "u3",
    "topic": "scope-resolution",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which operator is used to define a member function outside its class?",
      "ne": "क्लास बाहिर member function परिभाषित गर्न कुन अपरेटर प्रयोग हुन्छ?"
    },
    "options": [
      {
        "en": "Dot operator (.)",
        "ne": "Dot अपरेटर (.)"
      },
      {
        "en": "Arrow operator (->)",
        "ne": "Arrow अपरेटर (->)"
      },
      {
        "en": "Scope resolution operator (::)",
        "ne": "Scope resolution अपरेटर (::)"
      },
      {
        "en": "Insertion operator (<<)",
        "ne": "Insertion अपरेटर (<<)"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "The scope resolution operator :: tells the compiler which class the function belongs to, e.g. void Student::display().",
      "ne": "Scope resolution operator :: ले फङ्सन कुन क्लासको हो भनेर कम्पाइलरलाई बताउँछ, जस्तै void Student::display()।"
    }
  },
  {
    "id": "g10.oop-cpp.q10",
    "subject": "grade10/oop-cpp",
    "unit": "u1",
    "topic": "ds-terms",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A collection of related records of the same entity is called a:",
      "ne": "एउटै entity का सम्बन्धित record हरूको सङ्ग्रहलाई के भनिन्छ?"
    },
    "options": [
      {
        "en": "Field",
        "ne": "Field (फिल्ड)"
      },
      {
        "en": "Record",
        "ne": "Record (रेकर्ड)"
      },
      {
        "en": "File",
        "ne": "File (फाइल)"
      },
      {
        "en": "Attribute",
        "ne": "Attribute (एट्रिब्युट)"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "Fields make a record, and many related records together make a file.",
      "ne": "फिल्डहरू मिलेर रेकर्ड बन्छ, र धेरै रेकर्ड मिलेर फाइल बन्छ।"
    }
  },
  {
    "id": "g10.oop-cpp.q11",
    "subject": "grade10/oop-cpp",
    "unit": "u6",
    "topic": "virtual",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which keyword makes run-time polymorphism possible in C++?",
      "ne": "C++ मा run-time polymorphism सम्भव बनाउने keyword कुन हो?"
    },
    "options": [
      {
        "en": "static"
      },
      {
        "en": "friend"
      },
      {
        "en": "virtual"
      },
      {
        "en": "inline"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "A virtual function tells C++ to decide at run time, by looking at the actual object the base pointer points to.",
      "ne": "virtual फङ्सनले C++ लाई चल्दै गर्दा, base पोइन्टरले देखाएको वास्तविक अब्जेक्ट हेरेर निर्णय गर्न लगाउँछ।"
    }
  },
  {
    "id": "g10.oop-cpp.q12",
    "subject": "grade10/oop-cpp",
    "unit": "u3",
    "topic": "class-vs-object",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which statement about a class and an object is TRUE?",
      "ne": "क्लास र अब्जेक्टबारे कुन भनाइ सही हो?"
    },
    "options": [
      {
        "en": "A class takes memory, an object does not",
        "ne": "क्लासले मेमोरी लिन्छ, अब्जेक्टले लिँदैन"
      },
      {
        "en": "An object takes memory, a class does not",
        "ne": "अब्जेक्टले मेमोरी लिन्छ, क्लासले लिँदैन"
      },
      {
        "en": "Both take memory",
        "ne": "दुवैले मेमोरी लिन्छन्"
      },
      {
        "en": "Neither takes memory",
        "ne": "दुवैले मेमोरी लिँदैनन्"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A class is only a blueprint and takes no memory. Memory is allocated when an object is created from it.",
      "ne": "क्लास केवल नक्सा हो, यसले मेमोरी लिँदैन। अब्जेक्ट बनेपछि मात्र मेमोरी छुट्याइन्छ।"
    }
  },
  {
    "id": "g10.oop-cpp.q13",
    "subject": "grade10/oop-cpp",
    "unit": "u1",
    "topic": "queue-fifo",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "In a queue, insertion and deletion are done at which ends?",
      "ne": "Queue मा राख्ने र झिक्ने काम कुन–कुन छेउबाट हुन्छ?"
    },
    "options": [
      {
        "en": "Insert at front, delete at rear",
        "ne": "front बाट राख्ने, rear बाट झिक्ने"
      },
      {
        "en": "Insert at rear, delete at front",
        "ne": "rear बाट राख्ने, front बाट झिक्ने"
      },
      {
        "en": "Both at the front",
        "ne": "दुवै front बाट"
      },
      {
        "en": "Both at the rear",
        "ne": "दुवै rear बाट"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A queue follows FIFO: new elements join at the rear and elements leave from the front, like a line at a counter.",
      "ne": "Queue ले FIFO मान्छ: नयाँ तत्त्व rear मा थपिन्छ र front बाट निस्कन्छ — काउन्टरको लाइन जस्तै।"
    }
  },
  {
    "id": "g10.oop-cpp.q14",
    "subject": "grade10/oop-cpp",
    "unit": "u4",
    "topic": "encapsulation",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Binding data members and member functions together in one unit and hiding the data from outside is called:",
      "ne": "डाटा मेम्बर र मेम्बर फङ्सनलाई एउटै एकाइमा बाँधेर बाहिरबाट डाटा लुकाउने कामलाई के भनिन्छ?"
    },
    "options": [
      {
        "en": "Abstraction",
        "ne": "Abstraction (एब्स्ट्र्याक्सन)"
      },
      {
        "en": "Inheritance",
        "ne": "Inheritance (इनहेरिटेन्स)"
      },
      {
        "en": "Encapsulation",
        "ne": "Encapsulation (इनक्याप्सुलेसन)"
      },
      {
        "en": "Polymorphism",
        "ne": "Polymorphism (पोलिमर्फिज्म)"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "That is encapsulation (data hiding). Abstraction instead hides the complexity of HOW the work is done.",
      "ne": "यो encapsulation (data hiding) हो। Abstraction ले चाहिँ काम \"कसरी\" हुन्छ भन्ने जटिलता लुकाउँछ।"
    }
  },
  {
    "id": "g10.oop-cpp.q15",
    "subject": "grade10/oop-cpp",
    "unit": "u3",
    "topic": "output-prediction",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What is the output of this program?<br><span class=\"mono\" style=\"color:var(--blue);font-size:.85rem\">class A { public: A(){cout&lt;&lt;\"A\";} ~A(){cout&lt;&lt;\"X\";} };<br>int main(){ A a1; A a2; return 0; }</span>",
      "ne": "यो प्रोग्रामको आउटपुट के हुन्छ?"
    },
    "options": [
      {
        "en": "AXAX"
      },
      {
        "en": "AAXX"
      },
      {
        "en": "AAX"
      },
      {
        "en": "XXAA"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Both constructors run first in creation order, printing AA. Then the destructors run in reverse order, printing XX. So the output is AAXX.",
      "ne": "दुवै कन्स्ट्रक्टर बनेको क्रममा पहिले चल्छन् — AA छाप्छन्। अनि डिस्ट्रक्टर उल्टो क्रममा चल्छन् — XX छाप्छन्। त्यसैले आउटपुट AAXX हो।"
    }
  },

  /* ============================================================
     PHASE 9 EXPANSION — 34 questions, weighted to the official grid.

     THE PROBLEM THIS FIXES. The bank held 15 questions while the quiz
     draws 12, so a second attempt was very nearly the first paper. It
     was also weighted upside down against the CDC specification grid:

       unit   marks   questions   per mark
         1      15        4         0.27
         2      14        0         0.00     <- nothing at all
         3       2        6         3.00     <- the lightest unit
         4       5        1         0.20
         5       7        1         0.14
         6       7        3         0.43

     Unit 2 is the second-heaviest unit in the subject and had no
     questions. Unit 3 is the lightest and had the most. A student
     revising from this quiz was being pointed at the wrong units.

     The additions below bring every unit to roughly 0.8-0.9 questions
     per mark. Unit 3's six are kept — they are sound questions, and
     deleting good content to fix a ratio would be the wrong trade; it
     is now proportionate because the rest grew around it.

     VARIETY, not volume: definitions, code reading, output prediction,
     error identification and applied scenarios, so repeated attempts
     ask for different kinds of thinking rather than the same recall in
     new words.
     ============================================================ */

  /* ---------------- Unit 1 — Data Structures (15 marks) ---------------- */
  {
    id: 'g10.oop-cpp.q16', subject: 'grade10/oop-cpp', unit: 'u1',
    topic: 'array-vs-linked-list', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'What is the main advantage of a linked list over an array?',
      ne: 'Array भन्दा linked list को मुख्य फाइदा के हो?'
    },
    options: [
      { en: 'Elements can be accessed faster by index', ne: 'Index बाट तत्त्व छिटो पाइन्छ' },
      { en: 'Its size can grow or shrink while the program runs', ne: 'प्रोग्राम चल्दाचल्दै यसको आकार बढ्न वा घट्न सक्छ' },
      { en: 'It uses less memory per element', ne: 'प्रति तत्त्व कम मेमोरी खान्छ' },
      { en: 'Its elements are always stored next to each other', ne: 'यसका तत्त्व सधैं छेउछाउ राखिन्छन्' }
    ],
    answer: 1,
    explanation: {
      en: 'A linked list is dynamic: nodes are allocated as needed, so it grows and shrinks at run time. An array is fixed once declared. The other three options describe an ARRAY — index access is O(1) in an array and requires walking the list in a linked list, and a linked list uses MORE memory per element because every node also stores a pointer.',
      ne: 'Linked list गतिशील हुन्छ: आवश्यकता अनुसार node बन्छन्, त्यसैले चल्दाचल्दै बढ्छ–घट्छ। Array घोषणा गरेपछि स्थिर हुन्छ। बाँकी तीन विकल्पले <b>array</b> लाई वर्णन गर्छन् — array मा index बाट पहुँच O(1) हो भने linked list मा हिँड्नुपर्छ, र linked list ले हरेक node मा pointer पनि राख्ने भएकाले प्रति तत्त्व <b>बढी</b> मेमोरी खान्छ।'
    }
  },
  {
    id: 'g10.oop-cpp.q17', subject: 'grade10/oop-cpp', unit: 'u1',
    topic: 'traversing', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Visiting every element of a data structure exactly once is called:',
      ne: 'डाटा स्ट्रक्चरका हरेक तत्त्वलाई ठ्याक्कै एक पटक हेर्ने कामलाई के भनिन्छ?'
    },
    options: [
      { en: 'Searching', ne: 'Searching' },
      { en: 'Sorting', ne: 'Sorting' },
      { en: 'Traversing', ne: 'Traversing' },
      { en: 'Merging', ne: 'Merging' }
    ],
    answer: 2,
    explanation: {
      en: 'Traversing means visiting each element once, usually to process or display it. Searching looks for one particular element and may stop early; sorting rearranges elements into order. All three are listed in the syllabus as operations on data structures.',
      ne: 'Traversing भनेको हरेक तत्त्वलाई एक पटक हेर्नु — प्रायः प्रशोधन गर्न वा देखाउन। Searching ले कुनै एउटा तत्त्व खोज्छ र बीचैमा रोकिन सक्छ; sorting ले क्रममा मिलाउँछ। तीनै पाठ्यक्रममा डाटा स्ट्रक्चरका operation का रूपमा सूचीबद्ध छन्।'
    }
  },
  {
    id: 'g10.oop-cpp.q18', subject: 'grade10/oop-cpp', unit: 'u1',
    topic: 'non-linear', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which pair contains ONLY non-linear data structures?',
      ne: 'कुन जोडीमा <b>मात्र</b> non-linear डाटा स्ट्रक्चर छन्?'
    },
    options: [
      { en: 'Stack and Queue', ne: 'Stack र Queue' },
      { en: 'Array and Linked List', ne: 'Array र Linked List' },
      { en: 'Tree and Graph', ne: 'Tree र Graph' },
      { en: 'Queue and Tree', ne: 'Queue र Tree' }
    ],
    answer: 2,
    explanation: {
      en: 'The syllabus names exactly two non-linear structures: trees and graphs. In a linear structure every element has one predecessor and one successor; in a non-linear one an element may connect to many. Option 4 is the trap — a tree is non-linear but a queue is linear, so the pair fails the word ONLY.',
      ne: 'पाठ्यक्रमले ठ्याक्कै दुई non-linear संरचना नाम लिन्छ: tree र graph। Linear संरचनामा हरेक तत्त्वको एक अघिल्लो र एक पछिल्लो हुन्छ; non-linear मा एउटै तत्त्व धेरैसँग जोडिन सक्छ। चौथो विकल्प पासो हो — tree non-linear हो तर queue linear, त्यसैले "मात्र" भन्ने शर्त पूरा हुँदैन।'
    }
  },
  {
    id: 'g10.oop-cpp.q19', subject: 'grade10/oop-cpp', unit: 'u1',
    topic: 'stack-application', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Values 10, 20, 30 are pushed onto a stack in that order. One value is popped, then 40 is pushed. Which value is now on top?',
      ne: 'Stack मा 10, 20, 30 यही क्रममा push गरियो। एउटा pop गरियो, अनि 40 push गरियो। अब टुप्पोमा कुन मान छ?'
    },
    options: [
      { en: '10', ne: '10' },
      { en: '20', ne: '20' },
      { en: '30', ne: '30' },
      { en: '40', ne: '40' }
    ],
    answer: 3,
    explanation: {
      en: 'Work it through: after the three pushes the stack is 10, 20, 30 with 30 on top. A pop removes the TOP, so 30 goes and 20 is on top. Pushing 40 puts it above 20. The top is 40. The common slip is popping 10 — but LIFO removes the last one in, not the first.',
      ne: 'क्रमैसँग हेर्नुहोस्: तीन push पछि stack मा 10, 20, 30 हुन्छ र टुप्पोमा 30। Pop ले <b>टुप्पोको</b> हटाउँछ, त्यसैले 30 गयो र 20 टुप्पोमा आयो। 40 push गर्दा त्यो 20 माथि बस्छ। टुप्पोमा 40 छ। सामान्य गल्ती 10 हटाउनु हो — तर LIFO ले पहिलो होइन, अन्तिम छिरेको हटाउँछ।'
    }
  },
  {
    id: 'g10.oop-cpp.q20', subject: 'grade10/oop-cpp', unit: 'u1',
    topic: 'ds-need', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Why are data structures needed in a program?',
      ne: 'प्रोग्राममा डाटा स्ट्रक्चर किन चाहिन्छ?'
    },
    options: [
      { en: 'To organise data so it can be stored and retrieved efficiently', ne: 'Data लाई व्यवस्थित गरेर छिटो राख्न र झिक्न सकियोस् भनेर' },
      { en: 'To make the program file smaller on disk', ne: 'प्रोग्राम फाइल डिस्कमा सानो बनाउन' },
      { en: 'To replace the need for an operating system', ne: 'अपरेटिङ सिस्टमको आवश्यकता हटाउन' },
      { en: 'To convert source code into machine code', ne: 'Source code लाई मेसिन कोडमा बदल्न' }
    ],
    answer: 0,
    explanation: {
      en: 'A data structure is a way of organising data in memory so a program can use it efficiently. The same data stored badly makes a program slow; stored well it makes it fast. Converting source to machine code is the compiler\'s job, not a data structure\'s.',
      ne: 'डाटा स्ट्रक्चर भनेको मेमोरीमा data मिलाएर राख्ने तरिका हो, जसले प्रोग्रामलाई छिटो काम गर्न दिन्छ। उही data नमिलाई राखे प्रोग्राम ढिलो हुन्छ; मिलाएर राखे छिटो। Source लाई मेसिन कोडमा बदल्ने काम compiler को हो, डाटा स्ट्रक्चरको होइन।'
    }
  },
  {
    id: 'g10.oop-cpp.q21', subject: 'grade10/oop-cpp', unit: 'u1',
    topic: 'ds-terms', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'In the terminology of data structures, a single named property of an entity — such as a student\'s roll number — is called a:',
      ne: 'डाटा स्ट्रक्चरको शब्दावलीमा कुनै entity को एउटा नामाकरण गरिएको गुण — जस्तै विद्यार्थीको roll number — लाई के भनिन्छ?'
    },
    options: [
      { en: 'Record', ne: 'Record' },
      { en: 'Field (attribute)', ne: 'Field (attribute)' },
      { en: 'File', ne: 'File' },
      { en: 'Group item', ne: 'Group item' }
    ],
    answer: 1,
    explanation: {
      en: 'A field, also called an attribute, is one property of an entity. A record is the whole collection of fields describing one entity (one student). A file is a collection of records. The three sit inside one another: field in record, record in file.',
      ne: 'Field — जसलाई attribute पनि भनिन्छ — entity को एउटा गुण हो। Record भनेको एउटै entity (एक विद्यार्थी) लाई वर्णन गर्ने सबै field को समूह। File भनेको record हरूको समूह। तीन एक–अर्काभित्र पर्छन्: field record भित्र, record file भित्र।'
    }
  },
  {
    id: 'g10.oop-cpp.q22', subject: 'grade10/oop-cpp', unit: 'u1',
    topic: 'queue-application', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which real situation is best modelled by a QUEUE?',
      ne: 'कुन वास्तविक अवस्थालाई <b>QUEUE</b> ले सबैभन्दा राम्ररी देखाउँछ?'
    },
    options: [
      { en: 'Undoing the last action in a text editor', ne: 'Text editor मा अन्तिम काम undo गर्नु' },
      { en: 'Documents waiting to be printed', ne: 'छापिन पर्खिरहेका कागजात' },
      { en: 'Plates stacked one on top of another', ne: 'एकमाथि अर्को थुपारिएका थाल' },
      { en: 'Returning from a function to its caller', ne: 'Function बाट बोलाउनेकहाँ फर्किनु' }
    ],
    answer: 1,
    explanation: {
      en: 'A print queue is FIFO — the document sent first is printed first, which is exactly what fairness requires. The other three are all LIFO and are modelled by a stack: undo reverses the most recent action, plates come off the top, and a function returns to the most recent caller.',
      ne: 'Print queue FIFO हो — पहिले पठाइएको कागजात पहिले छापिन्छ, र न्यायसंगत हुन त्यही चाहिन्छ। बाँकी तीनै LIFO हुन् र stack ले देखाउँछ: undo ले सबैभन्दा पछिल्लो काम उल्ट्याउँछ, थाल माथिबाट उठ्छ, र function सबैभन्दा पछिल्लो बोलाउनेकहाँ फर्कन्छ।'
    }
  },
  {
    id: 'g10.oop-cpp.q23', subject: 'grade10/oop-cpp', unit: 'u1',
    topic: 'ds-advantages', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which of these is NOT an advantage of using a suitable data structure?',
      ne: 'उपयुक्त डाटा स्ट्रक्चर प्रयोग गर्नुको फाइदा <b>होइन</b> कुन?'
    },
    options: [
      { en: 'Efficient use of memory', ne: 'मेमोरीको प्रभावकारी प्रयोग' },
      { en: 'Faster searching and sorting', ne: 'छिटो searching र sorting' },
      { en: 'Data can be reused and managed easily', ne: 'Data पुनः प्रयोग र व्यवस्थापन सजिलो' },
      { en: 'The program automatically becomes free of logical errors', ne: 'प्रोग्राम आफैँ तार्किक त्रुटिबाट मुक्त हुन्छ' }
    ],
    answer: 3,
    explanation: {
      en: 'Choosing the right data structure makes a program faster and tidier; it does nothing about the correctness of your logic. A program with a perfect data structure and a wrong condition is still wrong. The first three are the advantages the syllabus lists.',
      ne: 'ठीक डाटा स्ट्रक्चर छान्दा प्रोग्राम छिटो र सफा हुन्छ; तपाईंको तर्क सही छ कि छैन भन्नेमा यसले केही गर्दैन। उत्कृष्ट डाटा स्ट्रक्चर भए पनि शर्त गलत भए प्रोग्राम गलत नै हुन्छ। पहिला तीन पाठ्यक्रमले लेखेका फाइदा हुन्।'
    }
  },
  {
    id: 'g10.oop-cpp.q24', subject: 'grade10/oop-cpp', unit: 'u1',
    topic: 'searching', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A list of 1000 names must be searched many times a day. Which single change would most improve search speed?',
      ne: 'हजार नामको सूची दिनमा धेरै पटक खोज्नुपर्छ। कुन एउटा परिवर्तनले खोजी गति सबैभन्दा बढी सुधार्छ?'
    },
    options: [
      { en: 'Keep the list sorted so a binary search can be used', ne: 'सूची क्रममा राख्ने, ताकि binary search गर्न सकियोस्' },
      { en: 'Store the names in a stack instead', ne: 'नामहरू stack मा राख्ने' },
      { en: 'Rename the variables to shorter names', ne: 'Variable का नाम छोटा बनाउने' },
      { en: 'Add more comments to the program', ne: 'प्रोग्राममा थप टिप्पणी लेख्ने' }
    ],
    answer: 0,
    explanation: {
      en: 'Sorting once lets every later search be a binary search, which halves the remaining list at each step — about 10 comparisons for 1000 names instead of up to 1000. A stack would make it worse, since you can only reach the top. Shorter names and comments change readability, not running speed.',
      ne: 'एक पटक क्रममा मिलाएपछि हरेक पछिल्लो खोजी binary search हुन सक्छ, जसले हरेक चरणमा बाँकी सूची आधा गर्छ — हजार नामका लागि हजारसम्म होइन, करिब १० तुलना। Stack ले झन् बिगार्छ, किनकि टुप्पो मात्र छुन पाइन्छ। छोटो नाम र टिप्पणीले पढ्न सजिलो बनाउँछ, गति होइन।'
    }
  },

  /* ---------------- Unit 2 — OOP concepts and C++ (14 marks) ----------------
     This unit had NO questions at all before Phase 9. */
  {
    id: 'g10.oop-cpp.q25', subject: 'grade10/oop-cpp', unit: 'u2',
    topic: 'oop-features', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which of these is NOT one of the features of object-oriented programming?',
      ne: 'यीमध्ये कुन object-oriented programming को विशेषता <b>होइन</b>?'
    },
    options: [
      { en: 'Encapsulation', ne: 'Encapsulation' },
      { en: 'Inheritance', ne: 'Inheritance' },
      { en: 'Compilation', ne: 'Compilation' },
      { en: 'Polymorphism', ne: 'Polymorphism' }
    ],
    answer: 2,
    explanation: {
      en: 'Compilation is how any source program becomes machine code — it happens to C programs too and has nothing to do with objects. The features of OOP are class, object, encapsulation, abstraction, inheritance, polymorphism, data hiding and message passing.',
      ne: 'Compilation भनेको जुनसुकै source प्रोग्राम मेसिन कोड बन्ने तरिका हो — C प्रोग्राममा पनि हुन्छ र object सँग यसको सम्बन्ध छैन। OOP का विशेषता: class, object, encapsulation, abstraction, inheritance, polymorphism, data hiding र message passing।'
    }
  },
  {
    id: 'g10.oop-cpp.q26', subject: 'grade10/oop-cpp', unit: 'u2',
    topic: 'structured-vs-oop', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'What is the main difference between structured programming and object-oriented programming?',
      ne: 'Structured programming र object-oriented programming बीचको मुख्य फरक के हो?'
    },
    options: [
      { en: 'Structured programming cannot use loops', ne: 'Structured programming मा loop प्रयोग गर्न मिल्दैन' },
      { en: 'Structured programming gives importance to functions; OOP gives importance to data bound with its functions', ne: 'Structured programming ले function लाई महत्त्व दिन्छ; OOP ले data र त्यसका function सँगै बाँधेर' },
      { en: 'OOP programs do not need to be compiled', ne: 'OOP प्रोग्राम compile गर्नु पर्दैन' },
      { en: 'Structured programming cannot use variables', ne: 'Structured programming मा variable प्रयोग गर्न मिल्दैन' }
    ],
    answer: 1,
    explanation: {
      en: 'Structured programming divides a problem into functions, and data is passed around between them. OOP divides it into objects, each holding its own data together with the functions allowed to touch that data. That binding is what makes data hiding possible. Both use loops, variables and a compiler.',
      ne: 'Structured programming ले समस्यालाई function मा बाँड्छ, र data तिनीहरूबीच पठाइन्छ। OOP ले object मा बाँड्छ, र हरेक object ले आफ्नो data सँगै त्यो data छुन पाउने function पनि राख्छ। यही बन्धनले data hiding सम्भव बनाउँछ। दुवैमा loop, variable र compiler चाहिन्छ।'
    }
  },
  {
    id: 'g10.oop-cpp.q27', subject: 'grade10/oop-cpp', unit: 'u2',
    topic: 'tokens', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'In C++, <code>int</code>, <code>while</code> and <code>return</code> are examples of:',
      ne: 'C++ मा <code>int</code>, <code>while</code> र <code>return</code> कसका उदाहरण हुन्?'
    },
    options: [
      { en: 'Identifiers', ne: 'Identifier' },
      { en: 'Keywords', ne: 'Keyword' },
      { en: 'Operators', ne: 'Operator' },
      { en: 'Literals', ne: 'Literal' }
    ],
    answer: 1,
    explanation: {
      en: 'Keywords are words reserved by the language with a fixed meaning, so they cannot be used as names. An identifier is a name YOU choose, such as a variable or function name. Both are kinds of token, along with constants, strings, operators and punctuators.',
      ne: 'Keyword भनेका भाषाले आफ्नै लागि सुरक्षित राखेका, निश्चित अर्थ भएका शब्द हुन्, त्यसैले तिनलाई नामका रूपमा प्रयोग गर्न मिल्दैन। Identifier भनेको <b>तपाईंले</b> छानेको नाम — जस्तै variable वा function को नाम। दुवै token का किसिम हुन्, constant, string, operator र punctuator सँगै।'
    }
  },
  {
    id: 'g10.oop-cpp.q28', subject: 'grade10/oop-cpp', unit: 'u2',
    topic: 'identifiers', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which of these is a VALID C++ identifier?',
      ne: 'यीमध्ये कुन C++ को <b>मान्य</b> identifier हो?'
    },
    options: [
      { en: '2ndMarks', ne: '2ndMarks' },
      { en: 'total marks', ne: 'total marks' },
      { en: '_totalMarks', ne: '_totalMarks' },
      { en: 'float', ne: 'float' }
    ],
    answer: 2,
    explanation: {
      en: 'An identifier may contain letters, digits and the underscore, and must not START with a digit. <code>_totalMarks</code> is fine. <code>2ndMarks</code> begins with a digit; <code>total marks</code> contains a space; <code>float</code> is a reserved keyword, so it cannot be used as a name.',
      ne: 'Identifier मा अक्षर, अंक र underscore हुन सक्छन्, तर अंकबाट <b>सुरु</b> हुनु हुँदैन। <code>_totalMarks</code> ठीक छ। <code>2ndMarks</code> अंकबाट सुरु भयो; <code>total marks</code> मा खाली ठाउँ छ; <code>float</code> सुरक्षित keyword भएकाले नाम बनाउन मिल्दैन।'
    }
  },
  {
    id: 'g10.oop-cpp.q29', subject: 'grade10/oop-cpp', unit: 'u2',
    topic: 'basic-io', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which statement correctly reads a number typed by the user into the variable <code>n</code>?',
      ne: 'प्रयोगकर्ताले टाइप गरेको सङ्ख्या <code>n</code> मा पढ्ने सही कथन कुन हो?'
    },
    options: [
      { en: 'cin &lt;&lt; n;', ne: 'cin &lt;&lt; n;' },
      { en: 'cin &gt;&gt; n;', ne: 'cin &gt;&gt; n;' },
      { en: 'cout &gt;&gt; n;', ne: 'cout &gt;&gt; n;' },
      { en: 'cout &lt;&lt; n;', ne: 'cout &lt;&lt; n;' }
    ],
    answer: 1,
    explanation: {
      en: 'Read the arrows as the direction the data travels. <code>cin &gt;&gt; n</code> moves data FROM the input stream INTO n. <code>cout &lt;&lt; n</code> moves it OUT of n to the screen. Writing <code>cin &lt;&lt; n</code> is the most common beginner error in this unit — the arrows point the wrong way.',
      ne: 'तीरलाई data कता जान्छ भन्ने दिशा ठान्नुहोस्। <code>cin &gt;&gt; n</code> ले input बाट <b>n भित्र</b> data लैजान्छ। <code>cout &lt;&lt; n</code> ले n बाट <b>बाहिर</b> स्क्रिनमा। <code>cin &lt;&lt; n</code> लेख्नु यस युनिटको सबैभन्दा सामान्य गल्ती हो — तीर उल्टो छ।'
    }
  },
  {
    id: 'g10.oop-cpp.q30', subject: 'grade10/oop-cpp', unit: 'u2',
    topic: 'program-structure', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'What is the purpose of <code>#include &lt;iostream&gt;</code> at the top of a C++ program?',
      ne: 'C++ प्रोग्रामको सुरुमा <code>#include &lt;iostream&gt;</code> किन लेखिन्छ?'
    },
    options: [
      { en: 'It makes the input and output objects such as cin and cout available', ne: 'यसले cin र cout जस्ता input–output object उपलब्ध गराउँछ' },
      { en: 'It starts the execution of the program', ne: 'यसले प्रोग्राम चल्न सुरु गर्छ' },
      { en: 'It declares the main function', ne: 'यसले main function घोषणा गर्छ' },
      { en: 'It converts the program into machine code', ne: 'यसले प्रोग्रामलाई मेसिन कोडमा बदल्छ' }
    ],
    answer: 0,
    explanation: {
      en: 'It is a preprocessor directive that pastes in the iostream header, which declares cin, cout and the stream operators. Without it the compiler does not know what cout is. Execution always begins at main, whatever headers are included.',
      ne: 'यो preprocessor directive हो, जसले iostream header भित्र्याउँछ — र त्यसैले cin, cout तथा stream operator घोषणा गर्छ। यो नभए compiler लाई cout के हो थाहा हुँदैन। जुनसुकै header राखे पनि प्रोग्राम सधैं main बाट सुरु हुन्छ।'
    }
  },
  {
    id: 'g10.oop-cpp.q31', subject: 'grade10/oop-cpp', unit: 'u2',
    topic: 'control-statements', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'What is printed?<br><code>int i = 5;<br>do { cout &lt;&lt; i &lt;&lt; " "; i++; } while (i &lt; 3);</code>',
      ne: 'के छापिन्छ?<br><code>int i = 5;<br>do { cout &lt;&lt; i &lt;&lt; " "; i++; } while (i &lt; 3);</code>'
    },
    options: [
      { en: 'Nothing is printed', ne: 'केही छापिँदैन' },
      { en: '5', ne: '5' },
      { en: '5 6 7', ne: '5 6 7' },
      { en: 'It never stops', ne: 'कहिल्यै रोकिँदैन' }
    ],
    answer: 1,
    explanation: {
      en: 'A do…while tests its condition AFTER the body, so the body always runs at least once. 5 is printed, i becomes 6, and only then is 6 &lt; 3 tested — false, so the loop ends. Output is just 5. If this had been a plain while loop, the condition would have been tested first and nothing would have printed.',
      ne: 'do…while ले शर्त <b>पछि</b> जाँच्छ, त्यसैले body कम्तीमा एक पटक चल्छ। 5 छापिन्छ, i 6 हुन्छ, अनि मात्र 6 &lt; 3 जाँचिन्छ — गलत, त्यसैले loop सकिन्छ। आउटपुट 5 मात्र। यदि साधारण while भएको भए शर्त पहिले जाँचिन्थ्यो र केही छापिँदैनथ्यो।'
    }
  },
  {
    id: 'g10.oop-cpp.q32', subject: 'grade10/oop-cpp', unit: 'u2',
    topic: 'control-statements', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'In a C++ <code>switch</code> statement, what happens if <code>break</code> is left out of a matching case?',
      ne: 'C++ को <code>switch</code> मा मिल्ने case बाट <code>break</code> छुट्यो भने के हुन्छ?'
    },
    options: [
      { en: 'The program will not compile', ne: 'प्रोग्राम compile हुँदैन' },
      { en: 'Only that case runs, as usual', ne: 'सामान्य रूपमा त्यही case मात्र चल्छ' },
      { en: 'Execution continues into the following cases', ne: 'त्यसपछिका case मा पनि चल्दै जान्छ' },
      { en: 'The switch is skipped completely', ne: 'पूरै switch छोडिन्छ' }
    ],
    answer: 2,
    explanation: {
      en: 'This is called fall-through: once a case matches, statements keep executing until a break or the end of the switch. It compiles happily, which is what makes it dangerous — the program runs and quietly produces the wrong answer. Fall-through is occasionally useful on purpose, but a missing break is usually a bug.',
      ne: 'यसलाई fall-through भनिन्छ: एउटा case मिलेपछि break नआएसम्म वा switch नसकिएसम्म कथन चल्दै जान्छन्। यो सजिलै compile हुन्छ — त्यही नै खतरा हो, किनकि प्रोग्राम चल्छ र चुपचाप गलत उत्तर दिन्छ। कहिलेकाहीं जानाजान fall-through राखिन्छ, तर छुटेको break प्रायः बग हो।'
    }
  },
  {
    id: 'g10.oop-cpp.q33', subject: 'grade10/oop-cpp', unit: 'u2',
    topic: 'data-types', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which data type should store a student\'s percentage such as 72.45?',
      ne: '72.45 जस्तो विद्यार्थीको प्रतिशत राख्न कुन data type प्रयोग गर्नुपर्छ?'
    },
    options: [
      { en: 'int', ne: 'int' },
      { en: 'char', ne: 'char' },
      { en: 'float', ne: 'float' },
      { en: 'bool', ne: 'bool' }
    ],
    answer: 2,
    explanation: {
      en: 'float stores numbers with a fractional part. Storing 72.45 in an int does not round it — it truncates to 72 and the .45 is gone silently, which is why marks calculations written with int come out slightly wrong. char holds a single character and bool holds only true or false.',
      ne: 'float ले दशमलव भएको सङ्ख्या राख्छ। 72.45 लाई int मा राख्दा यो गोलो हुँदैन — काटिएर 72 हुन्छ र .45 चुपचाप हराउँछ; त्यसैले int ले लेखिएको अंक गणना अलिअलि गलत आउँछ। char ले एउटै अक्षर र bool ले true वा false मात्र राख्छ।'
    }
  },
  {
    id: 'g10.oop-cpp.q34', subject: 'grade10/oop-cpp', unit: 'u2',
    topic: 'oop-applications', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which is a typical application area of object-oriented programming?',
      ne: 'Object-oriented programming को सामान्य प्रयोग क्षेत्र कुन हो?'
    },
    options: [
      { en: 'Designing graphical user interfaces', ne: 'ग्राफिकल प्रयोगकर्ता इन्टरफेस बनाउनु' },
      { en: 'Increasing the clock speed of a processor', ne: 'प्रोसेसरको clock speed बढाउनु' },
      { en: 'Adding more RAM to a computer', ne: 'कम्प्युटरमा थप RAM राख्नु' },
      { en: 'Cleaning dust from a heatsink', ne: 'Heatsink को धुलो सफा गर्नु' }
    ],
    answer: 0,
    explanation: {
      en: 'GUI design is a classic OOP application: every window, button and text box is an object with its own data and behaviour. Other areas the syllabus lists include simulation and modelling, real-time systems, office automation and CAD. The other three options are hardware tasks, not programming ones.',
      ne: 'GUI डिजाइन OOP को उत्कृष्ट प्रयोग हो: हरेक window, button र text box आफ्नै data र व्यवहार भएको object हो। पाठ्यक्रमले simulation र modelling, real-time प्रणाली, कार्यालय स्वचालन र CAD पनि लेख्छ। बाँकी तीन हार्डवेयरका काम हुन्, प्रोग्रामिङका होइनन्।'
    }
  },
  {
    id: 'g10.oop-cpp.q35', subject: 'grade10/oop-cpp', unit: 'u2',
    topic: 'error-identification', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Why does this fail to compile?<br><code>int main() {<br>&nbsp; cout &lt;&lt; "Marks: " &lt;&lt; marks;<br>&nbsp; int marks = 80;<br>&nbsp; return 0;<br>}</code>',
      ne: 'यो किन compile हुँदैन?<br><code>int main() {<br>&nbsp; cout &lt;&lt; "Marks: " &lt;&lt; marks;<br>&nbsp; int marks = 80;<br>&nbsp; return 0;<br>}</code>'
    },
    options: [
      { en: 'marks is used before it is declared', ne: 'marks घोषणा हुनुअघि नै प्रयोग गरियो' },
      { en: 'main must return void', ne: 'main ले void फर्काउनुपर्छ' },
      { en: 'A semicolon is missing', ne: 'Semicolon छुटेको छ' },
      { en: '80 is too large for an int', ne: '80 int का लागि धेरै ठूलो छ' }
    ],
    answer: 0,
    explanation: {
      en: 'C++ reads a function top to bottom, and a name must be declared before it is used. On the cout line the compiler has not met <code>marks</code> yet, so it reports an undeclared identifier. Moving the declaration above the cout fixes it. Note the error is at COMPILE time — the program never runs at all.',
      ne: 'C++ ले function लाई माथिबाट तल पढ्छ, र नाम प्रयोग गर्नुअघि घोषणा भइसक्नुपर्छ। cout भएको लाइनमा compiler ले <code>marks</code> भेटेकै छैन, त्यसैले undeclared identifier भन्छ। घोषणालाई cout भन्दा माथि सारे मिल्छ। ध्यान दिनुहोस्, त्रुटि <b>compile</b> कै बेला हुन्छ — प्रोग्राम चल्नै पाउँदैन।'
    }
  },
  {
    id: 'g10.oop-cpp.q36', subject: 'grade10/oop-cpp', unit: 'u2',
    topic: 'output-prediction', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'What is printed?<br><code>for (int i = 1; i &lt;= 3; i++)<br>&nbsp; cout &lt;&lt; i * i &lt;&lt; " ";</code>',
      ne: 'के छापिन्छ?<br><code>for (int i = 1; i &lt;= 3; i++)<br>&nbsp; cout &lt;&lt; i * i &lt;&lt; " ";</code>'
    },
    options: [
      { en: '1 2 3', ne: '1 2 3' },
      { en: '1 4 9', ne: '1 4 9' },
      { en: '2 4 6', ne: '2 4 6' },
      { en: '1 4 9 16', ne: '1 4 9 16' }
    ],
    answer: 1,
    explanation: {
      en: 'The loop runs with i = 1, 2, 3 and prints i × i each time: 1, 4, 9. It stops when i becomes 4 because 4 &lt;= 3 is false, so 16 is never printed. Choosing 1 4 9 16 is the off-by-one slip — count how many times the condition is TRUE, not how many values i takes.',
      ne: 'Loop i = 1, 2, 3 मा चल्छ र हरेक पटक i × i छाप्छ: 1, 4, 9। i 4 हुँदा 4 &lt;= 3 गलत हुने भएकाले रोकिन्छ, त्यसैले 16 कहिल्यै छापिँदैन। 1 4 9 16 छान्नु एक-ले-चुक्ने गल्ती हो — i कति मान लिन्छ होइन, शर्त कति पटक <b>सही</b> हुन्छ गन्नुहोस्।'
    }
  },
  {
    id: 'g10.oop-cpp.q37', subject: 'grade10/oop-cpp', unit: 'u2',
    topic: 'data-hiding', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which OOP feature means that an object\'s internal data cannot be changed directly from outside?',
      ne: 'कुन OOP विशेषताले object को भित्री data बाहिरबाट सीधै बदल्न नसकिने बनाउँछ?'
    },
    options: [
      { en: 'Inheritance', ne: 'Inheritance' },
      { en: 'Polymorphism', ne: 'Polymorphism' },
      { en: 'Data hiding', ne: 'Data hiding' },
      { en: 'Message passing', ne: 'Message passing' }
    ],
    answer: 2,
    explanation: {
      en: 'Data hiding means the data is declared private, so only the class\'s own member functions can reach it. Encapsulation is the binding of data and functions together; data hiding is what that binding lets you enforce. Inheritance passes members to a derived class and polymorphism gives one name several forms.',
      ne: 'Data hiding भनेको data लाई private घोषणा गर्नु, ताकि class कै member function ले मात्र छुन सकून्। Encapsulation भनेको data र function सँगै बाँध्नु; त्यही बन्धनले data hiding लागू गर्न दिन्छ। Inheritance ले derived class लाई member दिन्छ र polymorphism ले एउटै नामलाई धेरै रूप।'
    }
  },

  /* ---------------- Unit 4 — Abstraction and Encapsulation (5 marks) ---------------- */
  {
    id: 'g10.oop-cpp.q38', subject: 'grade10/oop-cpp', unit: 'u4',
    topic: 'abstraction-vs-encapsulation', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which statement best separates abstraction from encapsulation?',
      ne: 'Abstraction र encapsulation लाई सबैभन्दा राम्ररी छुट्याउने कथन कुन हो?'
    },
    options: [
      { en: 'Abstraction hides complexity and shows only what is needed; encapsulation binds data with its functions and keeps it protected', ne: 'Abstraction ले जटिलता लुकाएर चाहिने मात्र देखाउँछ; encapsulation ले data लाई यसका function सँग बाँधेर सुरक्षित राख्छ' },
      { en: 'Abstraction applies only to classes; encapsulation applies only to functions', ne: 'Abstraction class मा मात्र लाग्छ; encapsulation function मा मात्र' },
      { en: 'They are two names for the same thing', ne: 'दुवै एउटै कुराका दुई नाम हुन्' },
      { en: 'Encapsulation happens at compile time; abstraction at run time', ne: 'Encapsulation compile बेला हुन्छ; abstraction चल्ने बेला' }
    ],
    answer: 0,
    explanation: {
      en: 'Abstraction is about DESIGN — deciding what to show. Encapsulation is about IMPLEMENTATION — wrapping the data with the functions that may touch it. A car pedal is abstraction: you press it without knowing the engine. The sealed engine casing is encapsulation. They work together but are not the same, and the exam asks you to tell them apart.',
      ne: 'Abstraction <b>डिजाइन</b> को कुरा हो — के देखाउने भन्ने निर्णय। Encapsulation <b>कार्यान्वयन</b> को — data लाई छुन पाउने function सँगै बेर्ने काम। गाडीको पेडल abstraction हो: इन्जिन नजानी थिच्नुहुन्छ। बन्द इन्जिन बाकस encapsulation हो। सँगै काम गर्छन् तर एउटै होइनन्, र परीक्षाले छुट्याउन भन्छ।'
    }
  },
  {
    id: 'g10.oop-cpp.q39', subject: 'grade10/oop-cpp', unit: 'u4',
    topic: 'access-control', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'To achieve encapsulation in C++, data members are usually declared:',
      ne: 'C++ मा encapsulation ल्याउन data member प्रायः कसरी घोषणा गरिन्छ?'
    },
    options: [
      { en: 'private, with public member functions to use them', ne: 'private, र तिनलाई प्रयोग गर्न public member function' },
      { en: 'public, so any part of the program can change them', ne: 'public, ताकि प्रोग्रामको जुनसुकै भागले बदल्न सकोस्' },
      { en: 'as global variables outside the class', ne: 'class बाहिर global variable का रूपमा' },
      { en: 'inside the main function', ne: 'main function भित्र' }
    ],
    answer: 0,
    explanation: {
      en: 'Private data with public functions is the standard shape: outside code must go through a function, which can check the value before storing it. Making data public defeats the purpose entirely — anything could set a student\'s marks to −5. Global variables are the opposite of encapsulation.',
      ne: 'Private data र public function मानक ढाँचा हो: बाहिरको कोड function हुँदै आउनुपर्छ, र त्यो function ले राख्नुअघि मान जाँच्न सक्छ। Data public बनाउँदा उद्देश्य नै सकिन्छ — जसले पनि विद्यार्थीको अंक −5 बनाइदिन सक्छ। Global variable त encapsulation को ठीक उल्टो हो।'
    }
  },
  {
    id: 'g10.oop-cpp.q40', subject: 'grade10/oop-cpp', unit: 'u4',
    topic: 'abstraction-example', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Using <code>cout</code> without knowing how characters reach the screen is an everyday example of:',
      ne: 'अक्षर स्क्रिनसम्म कसरी पुग्छ नजानी <code>cout</code> प्रयोग गर्नु कसको दैनिक उदाहरण हो?'
    },
    options: [
      { en: 'Inheritance', ne: 'Inheritance' },
      { en: 'Abstraction', ne: 'Abstraction' },
      { en: 'Overloading', ne: 'Overloading' },
      { en: 'Recursion', ne: 'Recursion' }
    ],
    answer: 1,
    explanation: {
      en: 'You are given a simple interface — <code>cout &lt;&lt; x</code> — and everything underneath it is hidden. That is abstraction: showing only what is needed to use the thing. The C++ library is itself built on this idea, which is why you can write a program on day one.',
      ne: 'तपाईंलाई सरल इन्टरफेस दिइएको छ — <code>cout &lt;&lt; x</code> — र मुनिको सबै लुकाइएको छ। यही abstraction हो: प्रयोग गर्न चाहिने मात्र देखाउनु। C++ library आफैँ यही विचारमा बनेको छ, त्यसैले पहिलो दिनै प्रोग्राम लेख्न सकिन्छ।'
    }
  },
  {
    id: 'g10.oop-cpp.q41', subject: 'grade10/oop-cpp', unit: 'u4',
    topic: 'encapsulation-benefit', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A class stores <code>age</code> privately and provides <code>setAge(int)</code>. What does this arrangement make possible that a public <code>age</code> does not?',
      ne: 'कुनै class ले <code>age</code> लाई private राख्छ र <code>setAge(int)</code> दिन्छ। Public <code>age</code> ले नदिने कुन कुरा यसले सम्भव बनाउँछ?'
    },
    options: [
      { en: 'The value can be checked before it is stored', ne: 'राख्नुअघि मान जाँच्न सकिन्छ' },
      { en: 'The program runs faster', ne: 'प्रोग्राम छिटो चल्छ' },
      { en: 'The class needs less memory', ne: 'Class लाई कम मेमोरी चाहिन्छ' },
      { en: 'Inheritance becomes possible', ne: 'Inheritance सम्भव हुन्छ' }
    ],
    answer: 0,
    explanation: {
      en: 'The setter is a gate. It can reject a negative age, clamp an impossible one, or record that a change happened — none of which is possible when outside code writes the variable directly. Speed and memory are unchanged, and inheritance does not depend on access specifiers at all.',
      ne: 'Setter एउटा ढोका हो। यसले ऋणात्मक उमेर अस्वीकार गर्न, असम्भव मान सीमित गर्न, वा परिवर्तन भएको अभिलेख राख्न सक्छ — बाहिरको कोडले सीधै variable लेख्दा यीमध्ये केही पनि सम्भव हुँदैन। गति र मेमोरी उस्तै रहन्छ, र inheritance access specifier मा भर पर्दैन।'
    }
  },

  /* ---------------- Unit 5 — Inheritance (7 marks) ---------------- */
  {
    id: 'g10.oop-cpp.q42', subject: 'grade10/oop-cpp', unit: 'u5',
    topic: 'inheritance-types', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'One base class has three separate derived classes. Which type of inheritance is this?',
      ne: 'एउटै base class का तीन छुट्टाछुट्टै derived class छन्। यो कुन किसिमको inheritance हो?'
    },
    options: [
      { en: 'Single', ne: 'Single' },
      { en: 'Multilevel', ne: 'Multilevel' },
      { en: 'Multiple', ne: 'Multiple' },
      { en: 'Hierarchical', ne: 'Hierarchical' }
    ],
    answer: 3,
    explanation: {
      en: 'Hierarchical inheritance is one parent with many children — the picture branches downward. Multiple inheritance is the reverse: one child with many parents. Multilevel is a chain, A to B to C. Reading the SHAPE of the diagram is the fastest way to answer this kind of question.',
      ne: 'Hierarchical inheritance भनेको एउटा बाबु, धेरै छोरा — चित्र तलतिर फैलिन्छ। Multiple यसको उल्टो हो: एउटा छोरा, धेरै बाबु। Multilevel शृंखला हो, A देखि B देखि C। चित्रको <b>आकार</b> पढ्नु यस्ता प्रश्नको सबैभन्दा छिटो उत्तर हो।'
    }
  },
  {
    id: 'g10.oop-cpp.q43', subject: 'grade10/oop-cpp', unit: 'u5',
    topic: 'inheritance-access', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which members of a base class can a derived class NOT access directly?',
      ne: 'Base class का कुन member लाई derived class ले सीधै छुन <b>सक्दैन</b>?'
    },
    options: [
      { en: 'public members', ne: 'public member' },
      { en: 'protected members', ne: 'protected member' },
      { en: 'private members', ne: 'private member' },
      { en: 'All members are accessible', ne: 'सबै member छुन मिल्छ' }
    ],
    answer: 2,
    explanation: {
      en: 'A derived class inherits the private members — they exist in the object and take up space — but it cannot name them. It must go through a public or protected function of the base. This is exactly why <code>protected</code> exists: it means "private to the outside world, visible to my children".',
      ne: 'Derived class ले private member <b>पाउँछ</b> — ती object मा हुन्छन् र ठाउँ ओगट्छन् — तर नाम लिएर छुन सक्दैन। Base कै public वा protected function हुँदै जानुपर्छ। <code>protected</code> हुनुको कारण ठ्याक्कै यही हो: "बाहिरका लागि private, मेरा छोराछोरीका लागि देखिने"।'
    }
  },
  {
    id: 'g10.oop-cpp.q44', subject: 'grade10/oop-cpp', unit: 'u5',
    topic: 'inheritance-syntax', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which line correctly derives <code>Student</code> publicly from <code>Person</code>?',
      ne: '<code>Person</code> बाट <code>Student</code> लाई public रूपमा derive गर्ने सही लाइन कुन हो?'
    },
    options: [
      { en: 'class Student : public Person { };', ne: 'class Student : public Person { };' },
      { en: 'class Student inherits Person { };', ne: 'class Student inherits Person { };' },
      { en: 'class Student extends Person { };', ne: 'class Student extends Person { };' },
      { en: 'class Person : public Student { };', ne: 'class Person : public Student { };' }
    ],
    answer: 0,
    explanation: {
      en: 'C++ uses a colon, then the access specifier, then the base class name. <code>extends</code> is Java and <code>inherits</code> is not a C++ keyword at all. Option 4 has the syntax right but the direction backwards — it would make Person inherit from Student, which is the wrong way round.',
      ne: 'C++ मा कोलन, अनि access specifier, अनि base class को नाम लेखिन्छ। <code>extends</code> Java को हो र <code>inherits</code> C++ को keyword नै होइन। चौथो विकल्पको वाक्य-संरचना ठीक छ तर दिशा उल्टो — यसले Person लाई Student बाट inherit गराउँछ, जुन उल्टो हो।'
    }
  },
  {
    id: 'g10.oop-cpp.q45', subject: 'grade10/oop-cpp', unit: 'u5',
    topic: 'inheritance-advantage', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'What is the chief advantage of inheritance?',
      ne: 'Inheritance को मुख्य फाइदा के हो?'
    },
    options: [
      { en: 'Code written once in the base class is reused by every derived class', ne: 'Base class मा एक पटक लेखेको कोड हरेक derived class ले पुनः प्रयोग गर्छ' },
      { en: 'Programs compile faster', ne: 'प्रोग्राम छिटो compile हुन्छ' },
      { en: 'Private members become public', ne: 'Private member public हुन्छन्' },
      { en: 'Objects use less memory', ne: 'Object ले कम मेमोरी खान्छ' }
    ],
    answer: 0,
    explanation: {
      en: 'Reusability is the point: common behaviour lives in one tested place and every child gets it. That also makes a program easier to extend — a new derived class needs only what is different. Inheritance does not change access rules, and a derived object is normally LARGER, not smaller, since it carries the base part too.',
      ne: 'पुनः प्रयोग नै मुख्य कुरा हो: साझा व्यवहार एउटै परीक्षित ठाउँमा रहन्छ र हरेक छोराले पाउँछ। यसले विस्तार पनि सजिलो बनाउँछ — नयाँ derived class लाई फरक भएको कुरा मात्र चाहिन्छ। Inheritance ले पहुँचका नियम बदल्दैन, र derived object सामान्यतया <b>ठूलो</b> हुन्छ, सानो होइन — किनकि base को भाग पनि बोक्छ।'
    }
  },
  {
    id: 'g10.oop-cpp.q46', subject: 'grade10/oop-cpp', unit: 'u5',
    topic: 'hybrid-inheritance', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Class B and class C each inherit from A, and class D inherits from both B and C. What is this combination called, and what problem can it cause?',
      ne: 'Class B र C दुवैले A बाट inherit गर्छन्, र class D ले B र C दुवैबाट। यो संयोजनलाई के भनिन्छ, र यसले कुन समस्या ल्याउन सक्छ?'
    },
    options: [
      { en: 'Multilevel inheritance; it causes slow compilation', ne: 'Multilevel inheritance; यसले compile ढिलो बनाउँछ' },
      { en: 'Hybrid inheritance; D may receive two copies of A\'s members', ne: 'Hybrid inheritance; D ले A का member को दुई प्रति पाउन सक्छ' },
      { en: 'Single inheritance; it causes no problem', ne: 'Single inheritance; कुनै समस्या हुँदैन' },
      { en: 'Hierarchical inheritance; it prevents objects being created', ne: 'Hierarchical inheritance; यसले object बन्नै दिँदैन' }
    ],
    answer: 1,
    explanation: {
      en: 'This diamond shape mixes hierarchical and multiple inheritance, so it is hybrid. D inherits A through B and again through C, so A\'s members arrive twice and a reference to one becomes ambiguous. C++ solves it with a virtual base class, which makes the compiler keep only one copy of A.',
      ne: 'यो हीरा आकारले hierarchical र multiple inheritance मिसाउँछ, त्यसैले hybrid हो। D ले A लाई B हुँदै र फेरि C हुँदै पाउँछ, त्यसैले A का member दुई पटक आउँछन् र कुनै एउटालाई बोलाउँदा अन्योल हुन्छ। C++ ले virtual base class ले समाधान गर्छ, जसले compiler लाई A को एउटै प्रति राख्न लगाउँछ।'
    }
  },

  /* ---------------- Unit 6 — Polymorphism (7 marks) ---------------- */
  {
    id: 'g10.oop-cpp.q47', subject: 'grade10/oop-cpp', unit: 'u6',
    topic: 'overloading-rules', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which pair of functions is a VALID overload?',
      ne: 'कुन जोडी function <b>मान्य</b> overload हो?'
    },
    options: [
      { en: 'int add(int a, int b); and float add(int a, int b);', ne: 'int add(int a, int b); र float add(int a, int b);' },
      { en: 'int add(int a, int b); and int add(float a, float b);', ne: 'int add(int a, int b); र int add(float a, float b);' },
      { en: 'int add(int a, int b); and int add(int x, int y);', ne: 'int add(int a, int b); र int add(int x, int y);' },
      { en: 'int add(int a, int b); and int sum(int a, int b);', ne: 'int add(int a, int b); र int sum(int a, int b);' }
    ],
    answer: 1,
    explanation: {
      en: 'Overloading needs the same name with a DIFFERENT parameter list — different types, or a different number of parameters. Option 2 changes the types, so it is valid. Option 1 differs only in return type, which C++ rejects. Option 3 only renames the parameters, so the two are identical. Option 4 has two different names, so it is not overloading at all.',
      ne: 'Overloading लाई उही नाम तर <b>फरक</b> parameter सूची चाहिन्छ — फरक किसिम, वा फरक सङ्ख्या। दोस्रोले किसिम बदल्छ, त्यसैले मान्य छ। पहिलोमा return type मात्र फरक छ, जसलाई C++ ले अस्वीकार गर्छ। तेस्रोले parameter को नाम मात्र बदल्छ, त्यसैले दुवै उही हुन्। चौथोमा नाम नै फरक छ, त्यसैले overloading होइन।'
    }
  },
  {
    id: 'g10.oop-cpp.q48', subject: 'grade10/oop-cpp', unit: 'u6',
    topic: 'polymorphism-types', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Compile-time polymorphism is also known as:',
      ne: 'Compile-time polymorphism लाई अर्को के भनिन्छ?'
    },
    options: [
      { en: 'Dynamic binding', ne: 'Dynamic binding' },
      { en: 'Late binding', ne: 'Late binding' },
      { en: 'Static binding or early binding', ne: 'Static binding वा early binding' },
      { en: 'Virtual binding', ne: 'Virtual binding' }
    ],
    answer: 2,
    explanation: {
      en: 'If the compiler can tell which function will run just by reading the code, the decision is made early — static or early binding. That is overloading. When the decision can only be made while the program runs, using a virtual function through a base pointer, it is dynamic or late binding.',
      ne: 'कोड पढेरै कुन function चल्छ भनी compiler ले भन्न सक्छ भने निर्णय चाँडै हुन्छ — static वा early binding। त्यो overloading हो। Base pointer हुँदै virtual function प्रयोग गर्दा निर्णय प्रोग्राम चल्दा मात्र हुन सक्छ भने त्यो dynamic वा late binding हो।'
    }
  },
  {
    id: 'g10.oop-cpp.q49', subject: 'grade10/oop-cpp', unit: 'u6',
    topic: 'virtual-output', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A base class <code>Shape</code> has <code>void draw()</code> (NOT virtual) and <code>Circle</code> overrides it. With <code>Shape* s = new Circle(); s-&gt;draw();</code> which runs?',
      ne: 'Base class <code>Shape</code> मा <code>void draw()</code> छ (virtual <b>होइन</b>) र <code>Circle</code> ले त्यसलाई override गर्छ। <code>Shape* s = new Circle(); s-&gt;draw();</code> मा कुन चल्छ?'
    },
    options: [
      { en: "Circle's draw(), because the object is a Circle", ne: 'Circle को draw(), किनकि object Circle हो' },
      { en: "Shape's draw(), because the pointer is a Shape and the function is not virtual", ne: 'Shape को draw(), किनकि pointer Shape हो र function virtual छैन' },
      { en: 'Both run, one after the other', ne: 'दुवै एकपछि अर्को चल्छन्' },
      { en: 'The program will not compile', ne: 'प्रोग्राम compile हुँदैन' }
    ],
    answer: 1,
    explanation: {
      en: 'Without <code>virtual</code> the compiler decides from the POINTER\'s type, not the object\'s, so Shape\'s version runs even though the object really is a Circle. Adding <code>virtual</code> to the base function is what defers the decision to run time and makes Circle\'s version run. This single keyword is the most examined point in the unit.',
      ne: '<code>virtual</code> नभए compiler ले object होइन, <b>pointer</b> को किसिम हेरेर निर्णय गर्छ — त्यसैले object साँच्चै Circle भए पनि Shape कै संस्करण चल्छ। Base function मा <code>virtual</code> थप्दा निर्णय चल्ने बेलासम्म पर सर्छ र Circle कै संस्करण चल्छ। यस युनिटमा सबैभन्दा बढी सोधिने बिन्दु यही एउटा keyword हो।'
    }
  },

  /* ============================================================
     ADDED IN THE PHASE 9 CONTINUATION — cognitive variety, not volume.

     The Phase 9 report claimed the expanded bank covered "definitions,
     code reading, output prediction, error identification and applied
     scenarios". Counted by topic tag, that was one error-identification
     question and two output-prediction questions out of forty-nine. The
     claim was thin rather than false, and three questions is the right
     size of correction: all three ask the student to find a fault or
     trace an execution rather than recall a sentence.
     ============================================================ */
  {
    id: 'g10.oop-cpp.q50', subject: 'grade10/oop-cpp', unit: 'u2',
    topic: 'cin-extraction', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'This program will not compile. Which line is wrong, and why?<br><code>int n;<br>cout &lt;&lt; "Enter n: ";<br>cin &lt;&lt; n;<br>cout &lt;&lt; n;</code>',
      ne: 'यो प्रोग्राम compile हुँदैन। कुन हरफ गलत छ, र किन?<br><code>int n;<br>cout &lt;&lt; "Enter n: ";<br>cin &lt;&lt; n;<br>cout &lt;&lt; n;</code>'
    },
    options: [
      { en: 'Line 3 — cin takes >> (extraction), not <<', ne: 'हरफ ३ — cin लाई >> (extraction) चाहिन्छ, << होइन' },
      { en: 'Line 1 — n must be given a value when it is declared', ne: 'हरफ १ — n घोषणा गर्दै मान दिनुपर्छ' },
      { en: 'Line 2 — a string cannot be sent to cout', ne: 'हरफ २ — cout मा string पठाउन मिल्दैन' },
      { en: 'Line 4 — the same variable cannot be printed twice', ne: 'हरफ ४ — उही variable दुई पटक छाप्न मिल्दैन' }
    ],
    answer: 0,
    explanation: {
      en: 'The arrows point the way the data travels. <code>cout &lt;&lt;</code> pushes a value OUT to the screen; <code>cin &gt;&gt;</code> pulls a value IN from the keyboard. Written as <code>cin &lt;&lt; n</code> the compiler looks for a way to insert into an input stream, finds none, and stops — so this is a compile error, not a wrong answer at run time. An uninitialised <code>int n;</code> is perfectly legal, which is why option 2 is the tempting wrong one.',
      ne: 'तीरले data कुन दिशामा जान्छ देखाउँछ। <code>cout &lt;&lt;</code> ले मान पर्दामा <b>बाहिर</b> पठाउँछ; <code>cin &gt;&gt;</code> ले किबोर्डबाट <b>भित्र</b> तान्छ। <code>cin &lt;&lt; n</code> लेख्दा compiler ले input stream भित्र हाल्ने उपाय खोज्छ, पाउँदैन, र रोकिन्छ — त्यसैले यो चल्दाको गलत उत्तर होइन, compile त्रुटि हो। <code>int n;</code> लाई मान नदिई छोड्नु पूर्ण रूपमा वैध छ, त्यसैले दोस्रो विकल्प आकर्षक गलत उत्तर हो।'
    }
  },
  {
    id: 'g10.oop-cpp.q51', subject: 'grade10/oop-cpp', unit: 'u2',
    topic: 'switch-fallthrough', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'What exactly is printed?<br><code>int x = 2;<br>switch (x) {<br>&nbsp; case 1: cout &lt;&lt; "A";<br>&nbsp; case 2: cout &lt;&lt; "B";<br>&nbsp; case 3: cout &lt;&lt; "C";<br>&nbsp; default: cout &lt;&lt; "D";<br>}</code>',
      ne: 'ठ्याक्कै के छापिन्छ?<br><code>int x = 2;<br>switch (x) {<br>&nbsp; case 1: cout &lt;&lt; "A";<br>&nbsp; case 2: cout &lt;&lt; "B";<br>&nbsp; case 3: cout &lt;&lt; "C";<br>&nbsp; default: cout &lt;&lt; "D";<br>}</code>'
    },
    options: [
      { en: 'BCD', ne: 'BCD' },
      { en: 'B', ne: 'B' },
      { en: 'BC', ne: 'BC' },
      { en: 'ABCD', ne: 'ABCD' }
    ],
    answer: 0,
    explanation: {
      en: 'A <code>switch</code> JUMPS to the matching label and then keeps running straight down — the later <code>case</code> labels are only labels, not barriers. There is no <code>break</code> anywhere, so after printing B it carries on into case 3 and then default, giving BCD. <code>default</code> is not skipped just because a case already matched. Add <code>break;</code> to each case and the answer becomes B.',
      ne: '<code>switch</code> ले मिल्ने label मा <b>हाम फाल्छ</b> र त्यसपछि सिधै तल चलिरहन्छ — पछिका <code>case</code> label मात्र हुन्, बार होइनन्। कतै <code>break</code> छैन, त्यसैले B छापेपछि case 3 र त्यसपछि default मा पनि पस्छ, र BCD आउँछ। कुनै case मिलेकै कारण <code>default</code> छुट्दैन। हरेक case मा <code>break;</code> थपे उत्तर B बन्छ।'
    }
  },
  {
    id: 'g10.oop-cpp.q52', subject: 'grade10/oop-cpp', unit: 'u5',
    topic: 'private-base-access', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Why does the marked line fail to compile?<br><code>class A { private: int x; };<br>class B : public A {<br>public:<br>&nbsp; void show() { cout &lt;&lt; x; }&nbsp; // this line<br>};</code>',
      ne: 'चिन्ह लगाइएको हरफ किन compile हुँदैन?<br><code>class A { private: int x; };<br>class B : public A {<br>public:<br>&nbsp; void show() { cout &lt;&lt; x; }&nbsp; // यही हरफ<br>};</code>'
    },
    options: [
      { en: 'A private base member is not accessible to a derived class — it would have to be protected', ne: 'Base को private मेम्बर derived class ले छुन पाउँदैन — त्यो protected हुनुपर्छ' },
      { en: 'public inheritance makes x public, so it cannot be printed', ne: 'public inheritance ले x लाई public बनाउँछ, त्यसैले छाप्न मिल्दैन' },
      { en: 'x must be given a value before it can be used', ne: 'प्रयोग गर्नुअघि x लाई मान दिनुपर्छ' },
      { en: 'B must declare its own x before using it', ne: 'B ले प्रयोग गर्नुअघि आफ्नै x घोषणा गर्नुपर्छ' }
    ],
    answer: 0,
    explanation: {
      en: '<code>private</code> means "this class only", and inheriting does not loosen it — <code>x</code> is inherited by B but B is not allowed to touch it. <code>protected</code> is the specifier that exists for exactly this situation: visible to derived classes, still hidden from the outside world. Note that the inheritance mode (<code>public</code> here) changes what happens to the base\'s public and protected members; it never grants access to its private ones.',
      ne: '<code>private</code> को अर्थ "यही class मात्र" हो, र inheritance ले यो खुकुलो बनाउँदैन — <code>x</code> B मा सर्छ तर B ले छुन पाउँदैन। यस्तै अवस्थाका लागि बनेको specifier <code>protected</code> हो: derived class ले देख्छ, बाहिरी संसारले देख्दैन। Inheritance mode (यहाँ <code>public</code>) ले base का public र protected मेम्बरको हैसियत बदल्छ; private मेम्बरमा पहुँच कहिल्यै दिँदैन।'
    }
  }
];
