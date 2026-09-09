/* GENERATED from _source/content/questions — do not edit by hand. */
QuizService.registerBank("grade10/oop-cpp", [
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
  }
]);

QuizService.registerBank("grade10/digital-design", [
  {
    "id": "g10.dd.q001",
    "subject": "grade10/digital-design",
    "unit": "u2",
    "topic": "gate-definition",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A logic gate produces how many outputs?",
      "ne": "एउटा लजिक गेटले कति वटा आउटपुट दिन्छ?"
    },
    "options": [
      {
        "en": "One output only",
        "ne": "एउटा मात्र आउटपुट"
      },
      {
        "en": "Two outputs",
        "ne": "दुई आउटपुट"
      },
      {
        "en": "The same number as its inputs",
        "ne": "इनपुट जति नै"
      },
      {
        "en": "It depends on the gate",
        "ne": "गेटअनुसार फरक"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "A gate may take many inputs but always produces exactly one binary output, decided by its fixed rule.",
      "ne": "गेटले धेरै इनपुट लिन सक्छ तर आउटपुट सधैं एउटै हुन्छ, जुन त्यसको निश्चित नियमले तय गर्छ।"
    }
  },
  {
    "id": "g10.dd.q002",
    "subject": "grade10/digital-design",
    "unit": "u2",
    "topic": "and-gate",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "An AND gate gives output 1 when:",
      "ne": "AND गेटले कहिले आउटपुट 1 दिन्छ?"
    },
    "options": [
      {
        "en": "At least one input is 1",
        "ne": "कम्तीमा एउटा इनपुट 1 हुँदा"
      },
      {
        "en": "All inputs are 1",
        "ne": "सबै इनपुट 1 हुँदा"
      },
      {
        "en": "All inputs are 0",
        "ne": "सबै इनपुट 0 हुँदा"
      },
      {
        "en": "The inputs are different",
        "ne": "इनपुट फरक हुँदा"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "AND is strict: a single 0 on any input forces the output to 0. Only 1·1 gives 1.",
      "ne": "AND कडा हुन्छ: कुनै एउटा इनपुट 0 भयो भने आउटपुट 0 नै हुन्छ। 1·1 हुँदा मात्र 1 आउँछ।"
    }
  },
  {
    "id": "g10.dd.q003",
    "subject": "grade10/digital-design",
    "unit": "u2",
    "topic": "or-gate",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "For an OR gate with A = 0 and B = 0, the output Y is:",
      "ne": "OR गेटमा A = 0 र B = 0 हुँदा आउटपुट Y कति हुन्छ?"
    },
    "options": [
      {
        "en": "0",
        "ne": "0"
      },
      {
        "en": "1",
        "ne": "1"
      },
      {
        "en": "Undefined",
        "ne": "अनिश्चित"
      },
      {
        "en": "Depends on the voltage",
        "ne": "भोल्टेजमा भर पर्छ"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "OR needs at least one input to be 1. With every input 0 the output is 0 — this is the only row where OR gives 0.",
      "ne": "OR लाई कम्तीमा एउटा इनपुट 1 चाहिन्छ। सबै इनपुट 0 हुँदा आउटपुट 0 हुन्छ — OR ले 0 दिने एउटै पङ्क्ति यही हो।"
    }
  },
  {
    "id": "g10.dd.q004",
    "subject": "grade10/digital-design",
    "unit": "u2",
    "topic": "nand-gate",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A NAND gate has A = 1 and B = 1. The output is:",
      "ne": "NAND गेटमा A = 1 र B = 1 छ। आउटपुट कति हुन्छ?"
    },
    "options": [
      {
        "en": "1",
        "ne": "1"
      },
      {
        "en": "0",
        "ne": "0"
      },
      {
        "en": "Same as input A",
        "ne": "इनपुट A जस्तै"
      },
      {
        "en": "Cannot be determined",
        "ne": "निर्धारण गर्न सकिँदैन"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Do the AND first: 1 · 1 = 1. The circle on the nose then inverts it, so Y = 0. This is the only row where NAND gives 0.",
      "ne": "पहिले AND गर्नुहोस्: 1 · 1 = 1। अनि नाकको गोलोले उल्टाउँछ, त्यसैले Y = 0। NAND ले 0 दिने एउटै पङ्क्ति यही हो।"
    }
  },
  {
    "id": "g10.dd.q005",
    "subject": "grade10/digital-design",
    "unit": "u2",
    "topic": "nor-gate",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A NOR gate gives output 1 only when:",
      "ne": "NOR गेटले कहिले मात्र आउटपुट 1 दिन्छ?"
    },
    "options": [
      {
        "en": "All inputs are 0",
        "ne": "सबै इनपुट 0 हुँदा"
      },
      {
        "en": "All inputs are 1",
        "ne": "सबै इनपुट 1 हुँदा"
      },
      {
        "en": "Exactly one input is 1",
        "ne": "ठ्याक्कै एउटा इनपुट 1 हुँदा"
      },
      {
        "en": "The inputs are different",
        "ne": "इनपुट फरक हुँदा"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "NOR is OR followed by NOT. OR gives 0 only when every input is 0, so NOR gives 1 only in that row.",
      "ne": "NOR भनेको OR पछि NOT हो। सबै इनपुट 0 हुँदा मात्र OR ले 0 दिन्छ, त्यसैले त्यही पङ्क्तिमा मात्र NOR ले 1 दिन्छ।"
    }
  },
  {
    "id": "g10.dd.q006",
    "subject": "grade10/digital-design",
    "unit": "u2",
    "topic": "universal-gates",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which of the following pairs are the universal gates?",
      "ne": "तलमध्ये कुन जोडी universal गेट हुन्?"
    },
    "options": [
      {
        "en": "AND and OR",
        "ne": "AND र OR"
      },
      {
        "en": "NOT and AND",
        "ne": "NOT र AND"
      },
      {
        "en": "NAND and NOR",
        "ne": "NAND र NOR"
      },
      {
        "en": "XOR and NOT",
        "ne": "XOR र NOT"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "NAND and NOR are universal because every other gate can be built using only that one type of gate.",
      "ne": "अरू सबै गेट एउटै किसिमको गेटबाट बनाउन सकिने भएकाले NAND र NOR universal हुन्।"
    }
  },
  {
    "id": "g10.dd.q007",
    "subject": "grade10/digital-design",
    "unit": "u2",
    "topic": "universal-gates",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "How is a NOT gate made from a single NAND gate?",
      "ne": "एउटै NAND गेटबाट NOT गेट कसरी बनाइन्छ?"
    },
    "options": [
      {
        "en": "Join both inputs together and feed A into them",
        "ne": "दुवै इनपुट जोडेर A दिने"
      },
      {
        "en": "Connect one input to 0",
        "ne": "एउटा इनपुटलाई 0 मा जोड्ने"
      },
      {
        "en": "Connect the output back to the input",
        "ne": "आउटपुटलाई फेरि इनपुटमा जोड्ने"
      },
      {
        "en": "It cannot be done with one NAND",
        "ne": "एउटै NAND ले हुँदैन"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Joining the inputs makes both of them A, so the output is (A · A)' = A', which is NOT A.",
      "ne": "इनपुट जोड्दा दुवै A हुन्छन्, त्यसैले आउटपुट (A · A)' = A' हुन्छ, जुन NOT A नै हो।"
    }
  },
  {
    "id": "g10.dd.q008",
    "subject": "grade10/digital-design",
    "unit": "u2",
    "topic": "de-morgan",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "De Morgan's first theorem states that (A · B)' equals:",
      "ne": "डी–मर्गनको पहिलो नियमअनुसार (A · B)' बराबर के हुन्छ?"
    },
    "options": [
      {
        "en": "A' · B'",
        "ne": "A' · B'"
      },
      {
        "en": "A' + B'",
        "ne": "A' + B'"
      },
      {
        "en": "A + B",
        "ne": "A + B"
      },
      {
        "en": "A · B",
        "ne": "A · B"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Break the bar and change the sign: the dot becomes a plus. Check with A = 1, B = 0 — both sides give 1.",
      "ne": "बार फुटाउनुहोस् र चिन्ह बदल्नुहोस्: डट प्लस हुन्छ। A = 1, B = 0 राखेर जाँच्नुहोस् — दुवैतिर 1 आउँछ।"
    }
  },
  {
    "id": "g10.dd.q009",
    "subject": "grade10/digital-design",
    "unit": "u2",
    "topic": "de-morgan",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "De Morgan's second theorem states that (A + B)' equals:",
      "ne": "डी–मर्गनको दोस्रो नियमअनुसार (A + B)' बराबर के हुन्छ?"
    },
    "options": [
      {
        "en": "A' + B'",
        "ne": "A' + B'"
      },
      {
        "en": "A' · B'",
        "ne": "A' · B'"
      },
      {
        "en": "A · B",
        "ne": "A · B"
      },
      {
        "en": "(A · B)'",
        "ne": "(A · B)'"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Same rule the other way round: break the bar, and the plus becomes a dot.",
      "ne": "उही नियम उल्टो तर्फ: बार फुटाउने, र प्लस डट बन्छ।"
    }
  },
  {
    "id": "g10.dd.q010",
    "subject": "grade10/digital-design",
    "unit": "u2",
    "topic": "truth-table",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "How many rows does the truth table of a 3-input gate have?",
      "ne": "३ इनपुट भएको गेटको ट्रुथ टेबलमा कति पङ्क्ति हुन्छन्?"
    },
    "options": [
      {
        "en": "3",
        "ne": "३"
      },
      {
        "en": "6",
        "ne": "६"
      },
      {
        "en": "8",
        "ne": "८"
      },
      {
        "en": "9",
        "ne": "९"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "The number of rows is 2 to the power n, where n is the number of inputs. 2³ = 8.",
      "ne": "पङ्क्ति सङ्ख्या 2 को घात n हुन्छ, जहाँ n इनपुटको सङ्ख्या हो। 2³ = 8।"
    }
  },
  {
    "id": "g10.dd.q011",
    "subject": "grade10/digital-design",
    "unit": "u2",
    "topic": "xor-gate",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "An XOR gate gives output 1 when:",
      "ne": "XOR गेटले कहिले आउटपुट 1 दिन्छ?"
    },
    "options": [
      {
        "en": "Both inputs are the same",
        "ne": "दुवै इनपुट उस्तै हुँदा"
      },
      {
        "en": "The two inputs are different",
        "ne": "दुई इनपुट फरक हुँदा"
      },
      {
        "en": "Both inputs are 1",
        "ne": "दुवै इनपुट 1 हुँदा"
      },
      {
        "en": "Both inputs are 0",
        "ne": "दुवै इनपुट 0 हुँदा"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "XOR is the \"different\" gate: 0⊕1 and 1⊕0 give 1, while 0⊕0 and 1⊕1 give 0. This is the SUM output of a half adder.",
      "ne": "XOR \"फरक\" गेट हो: 0⊕1 र 1⊕0 ले 1 दिन्छन्, 0⊕0 र 1⊕1 ले 0। यही नै half adder को SUM आउटपुट हो।"
    }
  },
  {
    "id": "g10.dd.q012",
    "subject": "grade10/digital-design",
    "unit": "u2",
    "topic": "notation",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "The Boolean expression Y = A + B represents which gate?",
      "ne": "Y = A + B भन्ने बुलियन अभिव्यक्तिले कुन गेट जनाउँछ?"
    },
    "options": [
      {
        "en": "AND gate",
        "ne": "AND गेट"
      },
      {
        "en": "OR gate",
        "ne": "OR गेट"
      },
      {
        "en": "NOR gate",
        "ne": "NOR गेट"
      },
      {
        "en": "XOR gate",
        "ne": "XOR गेट"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "In Boolean algebra the plus sign means OR and the dot means AND. It is not ordinary addition — 1 + 1 = 1 here.",
      "ne": "बुलियन बीजगणितमा प्लसको अर्थ OR र डटको अर्थ AND हो। यो साधारण जोड होइन — यहाँ 1 + 1 = 1 हुन्छ।"
    }
  },
  {
    "id": "g10.dd.q013",
    "subject": "grade10/digital-design",
    "unit": "u2",
    "topic": "symbols",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What does a small circle drawn on the nose of a gate symbol mean?",
      "ne": "गेटको चिन्हको नाकमा कोरिएको सानो गोलोको अर्थ के हो?"
    },
    "options": [
      {
        "en": "The gate is faster",
        "ne": "गेट छिटो चल्छ"
      },
      {
        "en": "The output is inverted",
        "ne": "आउटपुट उल्टिन्छ"
      },
      {
        "en": "The gate has three inputs",
        "ne": "गेटमा तीन इनपुट छन्"
      },
      {
        "en": "The gate is universal",
        "ne": "गेट universal हो"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The circle means \"and then invert\". It is the only difference between AND and NAND, and between OR and NOR.",
      "ne": "गोलोको अर्थ \"अनि उल्टाउने\" हो। AND र NAND बीचको, अनि OR र NOR बीचको एउटै फरक यही हो।"
    }
  },
  {
    "id": "g10.dd.q014",
    "subject": "grade10/digital-design",
    "unit": "u2",
    "topic": "nand-gate",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "For how many of the four input combinations does a 2-input NAND gate output 1?",
      "ne": "२ इनपुट भएको NAND गेटले चारमध्ये कति इनपुट जोडीमा 1 दिन्छ?"
    },
    "options": [
      {
        "en": "1",
        "ne": "१"
      },
      {
        "en": "2",
        "ne": "२"
      },
      {
        "en": "3",
        "ne": "३"
      },
      {
        "en": "4",
        "ne": "४"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "NAND is 0 only for 1·1. The other three rows — 00, 01, 10 — all give 1.",
      "ne": "NAND ले 1·1 मा मात्र 0 दिन्छ। बाँकी तीन पङ्क्ति — 00, 01, 10 — मा 1 नै आउँछ।"
    }
  },
  {
    "id": "g10.dd.q015",
    "subject": "grade10/digital-design",
    "unit": "u2",
    "topic": "de-morgan",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A student writes (A · B)′ = A′ · B′. Why is this wrong?",
      "ne": "कुनै विद्यार्थीले (A · B)′ = A′ · B′ लेख्यो। यो किन गलत हो?"
    },
    "options": [
      {
        "en": "The bar cannot be broken at all",
        "ne": "बार फुटाउनै मिल्दैन"
      },
      {
        "en": "The sign must change when the bar is broken",
        "ne": "बार फुट्दा चिन्ह पनि बदलिनुपर्छ"
      },
      {
        "en": "De Morgan applies only to three variables",
        "ne": "डी–मर्गन तीन चलमा मात्र लागू हुन्छ"
      },
      {
        "en": "It is actually correct",
        "ne": "यो त सही नै हो"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Breaking the bar also flips the operator, so the dot must become a plus. Test it with A = 1, B = 0: the left side is 1 but the wrong right side gives 0.",
      "ne": "बार फुटाउँदा अपरेटर पनि बदलिन्छ, त्यसैले डट प्लस हुनुपर्छ। A = 1, B = 0 राखेर जाँच्नुहोस्: बायाँ 1 तर गलत दायाँ 0 आउँछ।"
    }
  },
  {
    "id": "g10.dd.q016",
    "subject": "grade10/digital-design",
    "unit": "u2",
    "topic": "gate-definition",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "In digital electronics, binary 1 usually represents:",
      "ne": "डिजिटल इलेक्ट्रोनिक्समा binary 1 ले प्रायः केलाई जनाउँछ?"
    },
    "options": [
      {
        "en": "Low voltage / false",
        "ne": "कम भोल्टेज / असत्य"
      },
      {
        "en": "High voltage / true",
        "ne": "बढी भोल्टेज / सत्य"
      },
      {
        "en": "No connection",
        "ne": "जोडिएको छैन"
      },
      {
        "en": "An error state",
        "ne": "त्रुटि अवस्था"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "1 stands for high voltage, true, or on; 0 stands for low voltage, false, or off. Gates work only with these two levels.",
      "ne": "1 ले बढी भोल्टेज, सत्य वा खुला जनाउँछ; 0 ले कम भोल्टेज, असत्य वा बन्द। गेट यी दुई स्तरमा मात्र चल्छन्।"
    }
  },
  {
    "id": "g10.dd.q017",
    "subject": "grade10/digital-design",
    "unit": "u2",
    "topic": "not-gate",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "How many inputs does a NOT gate have?",
      "ne": "NOT गेटमा कति इनपुट हुन्छन्?"
    },
    "options": [
      {
        "en": "One",
        "ne": "एक"
      },
      {
        "en": "Two",
        "ne": "दुई"
      },
      {
        "en": "Three",
        "ne": "तीन"
      },
      {
        "en": "Any number",
        "ne": "जति पनि"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "NOT, also called an inverter, takes exactly one input and gives its opposite. Its truth table has only 2 rows.",
      "ne": "NOT लाई inverter पनि भनिन्छ; यसले ठ्याक्कै एउटा इनपुट लिन्छ र त्यसको उल्टो दिन्छ। यसको ट्रुथ टेबलमा २ पङ्क्ति मात्र हुन्छन्।"
    }
  },
  {
    "id": "g10.dd.q018",
    "subject": "grade10/digital-design",
    "unit": "u2",
    "topic": "symbols",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which gate symbol has a flat back and a rounded nose?",
      "ne": "कुन गेटको चिन्हमा पछाडि सम्म र नाक गोलो हुन्छ?"
    },
    "options": [
      {
        "en": "OR",
        "ne": "OR"
      },
      {
        "en": "AND",
        "ne": "AND"
      },
      {
        "en": "NOT",
        "ne": "NOT"
      },
      {
        "en": "XOR",
        "ne": "XOR"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "AND is the D-shape: flat back, round nose. OR has a curved back and a pointed nose. NOT is a triangle.",
      "ne": "AND D आकारको हुन्छ: पछाडि सम्म, नाक गोलो। OR को पछाडि खुम्चिएको र नाक चुच्चो। NOT त्रिकोण हो।"
    }
  },
  {
    "id": "g10.dd.q101",
    "subject": "grade10/digital-design",
    "unit": "u1",
    "topic": "base",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "The base of the hexadecimal number system is:",
      "ne": "हेक्साडेसिमल संख्या प्रणालीको base कति हो?"
    },
    "options": [
      {
        "en": "8",
        "ne": "८"
      },
      {
        "en": "10",
        "ne": "१०"
      },
      {
        "en": "16",
        "ne": "१६"
      },
      {
        "en": "2",
        "ne": "२"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "Hexadecimal uses sixteen digits: 0 to 9 and then A to F. The base is the count of available digits.",
      "ne": "हेक्साडेसिमलले सोह्र अङ्क प्रयोग गर्छ: ० देखि ९ र त्यसपछि A देखि F। प्रयोग हुने अङ्कको सङ्ख्या नै base हो।"
    }
  },
  {
    "id": "g10.dd.q102",
    "subject": "grade10/digital-design",
    "unit": "u1",
    "topic": "conversion",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What is (1101)₂ in decimal?",
      "ne": "(1101)₂ लाई दशमलवमा लेख्दा कति हुन्छ?"
    },
    "options": [
      {
        "en": "11",
        "ne": "११"
      },
      {
        "en": "13",
        "ne": "१३"
      },
      {
        "en": "15",
        "ne": "१५"
      },
      {
        "en": "26",
        "ne": "२६"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Multiply each bit by its place value: 8 + 4 + 0 + 1 = 13.",
      "ne": "हरेक बिटलाई त्यसको स्थानीय मानले गुणा गर्नुहोस्: 8 + 4 + 0 + 1 = 13।"
    }
  },
  {
    "id": "g10.dd.q103",
    "subject": "grade10/digital-design",
    "unit": "u1",
    "topic": "conversion",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Converting decimal 25 to binary gives:",
      "ne": "दशमलव 25 लाई binary मा बदल्दा कति हुन्छ?"
    },
    "options": [
      {
        "en": "10011",
        "ne": "10011"
      },
      {
        "en": "11001",
        "ne": "11001"
      },
      {
        "en": "10101",
        "ne": "10101"
      },
      {
        "en": "11010",
        "ne": "11010"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Divide by 2 repeatedly and read the remainders upwards: 25 = 16 + 8 + 1 = 11001.",
      "ne": "बारम्बार 2 ले भाग गरेर बाँकीलाई तलबाट माथि पढ्नुहोस्: 25 = 16 + 8 + 1 = 11001।"
    }
  },
  {
    "id": "g10.dd.q104",
    "subject": "grade10/digital-design",
    "unit": "u1",
    "topic": "complement",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "The 1's complement of 1010 is:",
      "ne": "1010 को 1’s complement कति हो?"
    },
    "options": [
      {
        "en": "1011",
        "ne": "1011"
      },
      {
        "en": "0101",
        "ne": "0101"
      },
      {
        "en": "0110",
        "ne": "0110"
      },
      {
        "en": "1111",
        "ne": "1111"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The 1's complement flips every bit: each 1 becomes 0 and each 0 becomes 1. Nothing is added.",
      "ne": "1’s complement ले हरेक बिट उल्टाउँछ: 1 भए 0, 0 भए 1। केही जोडिँदैन।"
    }
  },
  {
    "id": "g10.dd.q105",
    "subject": "grade10/digital-design",
    "unit": "u1",
    "topic": "complement",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "The 2's complement of 0110 is:",
      "ne": "0110 को 2’s complement कति हो?"
    },
    "options": [
      {
        "en": "1001",
        "ne": "1001"
      },
      {
        "en": "1010",
        "ne": "1010"
      },
      {
        "en": "0111",
        "ne": "0111"
      },
      {
        "en": "1110",
        "ne": "1110"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Invert to get 1001, then add 1: 1001 + 1 = 1010. Forgetting the +1 is the usual mistake.",
      "ne": "उल्टाउँदा 1001 आउँछ, अनि 1 जोड्नुहोस्: 1001 + 1 = 1010। +1 बिर्सनु नै सामान्य गल्ती हो।"
    }
  },
  {
    "id": "g10.dd.q106",
    "subject": "grade10/digital-design",
    "unit": "u1",
    "topic": "arithmetic",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "In binary addition, 1 + 1 equals:",
      "ne": "Binary जोडमा 1 + 1 कति हुन्छ?"
    },
    "options": [
      {
        "en": "2",
        "ne": "2"
      },
      {
        "en": "10 — write 0 and carry 1",
        "ne": "10 — 0 लेख्ने र 1 क्यारी"
      },
      {
        "en": "11",
        "ne": "11"
      },
      {
        "en": "0 with no carry",
        "ne": "0, क्यारी बिना"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "There is no digit 2 in base 2. The answer is two, written 10: put 0 in this column and carry 1 to the next.",
      "ne": "base 2 मा 2 भन्ने अङ्कै छैन। उत्तर दुई हो, जुन 10 लेखिन्छ: यही स्तम्भमा 0 र अर्कोमा 1 क्यारी।"
    }
  },
  {
    "id": "g10.dd.q107",
    "subject": "grade10/digital-design",
    "unit": "u1",
    "topic": "arithmetic",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Why does a computer subtract by adding the 2’s complement?",
      "ne": "कम्प्युटरले 2’s complement जोडेर किन घटाउँछ?"
    },
    "options": [
      {
        "en": "It is faster to type",
        "ne": "लेख्न छिटो हुन्छ"
      },
      {
        "en": "So one adder circuit can do both addition and subtraction",
        "ne": "एउटै adder सर्किटले जोड र घटाउ दुवै गर्न सकोस् भनेर"
      },
      {
        "en": "Because subtraction is impossible in binary",
        "ne": "binary मा घटाउ असम्भव भएकाले"
      },
      {
        "en": "To avoid using the carry flag",
        "ne": "carry flag प्रयोग नगर्न"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A − B is computed as A + (2’s complement of B), so the hardware needs no separate subtractor — simpler and cheaper.",
      "ne": "A − B लाई A + (B को 2’s complement) भनेर गणना गरिन्छ, त्यसैले छुट्टै subtractor चाहिँदैन — सरल र सस्तो।"
    }
  },
  {
    "id": "g10.dd.q108",
    "subject": "grade10/digital-design",
    "unit": "u1",
    "topic": "conversion",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Octal 55 converted to decimal is:",
      "ne": "Octal 55 लाई दशमलवमा बदल्दा कति हुन्छ?"
    },
    "options": [
      {
        "en": "40",
        "ne": "४०"
      },
      {
        "en": "45",
        "ne": "४५"
      },
      {
        "en": "55",
        "ne": "५५"
      },
      {
        "en": "85",
        "ne": "८५"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Multiply by the place values 8¹ and 8⁰: (5 × 8) + (5 × 1) = 40 + 5 = 45.",
      "ne": "स्थानीय मान 8¹ र 8⁰ ले गुणा गर्नुहोस्: (5 × 8) + (5 × 1) = 45।"
    }
  },
  {
    "id": "g10.dd.q109",
    "subject": "grade10/digital-design",
    "unit": "u1",
    "topic": "conversion",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "To convert a decimal FRACTION to binary you repeatedly:",
      "ne": "दशमलव भिन्नलाई binary मा बदल्न बारम्बार के गर्नुपर्छ?"
    },
    "options": [
      {
        "en": "Divide by 2 and read the remainders",
        "ne": "2 ले भाग गरेर बाँकी पढ्ने"
      },
      {
        "en": "Multiply by 2 and collect the integer parts",
        "ne": "2 ले गुणा गरेर पूर्णाङ्क भाग टिप्ने"
      },
      {
        "en": "Divide by 10",
        "ne": "10 ले भाग गर्ने"
      },
      {
        "en": "Multiply by 8",
        "ne": "8 ले गुणा गर्ने"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The whole part is divided; the fraction is multiplied by 2, and the integer part of each result is read downwards.",
      "ne": "पूर्णाङ्क भागलाई भाग गरिन्छ; भिन्नलाई 2 ले गुणा गरेर हरेक परिणामको पूर्णाङ्क भाग माथिबाट तल पढिन्छ।"
    }
  },
  {
    "id": "g10.dd.q301",
    "subject": "grade10/digital-design",
    "unit": "u3",
    "topic": "boolean-ops",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "In Boolean algebra, 1 + 1 equals:",
      "ne": "बुलियन बीजगणितमा 1 + 1 कति हुन्छ?"
    },
    "options": [
      {
        "en": "2",
        "ne": "२"
      },
      {
        "en": "10",
        "ne": "१०"
      },
      {
        "en": "1",
        "ne": "१"
      },
      {
        "en": "0",
        "ne": "०"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "The plus sign means OR, not addition. OR asks \"is at least one of them 1?\", so 1 + 1 = 1.",
      "ne": "प्लस चिन्हको अर्थ OR हो, जोड होइन। OR ले \"कम्तीमा एउटा 1 छ?\" सोध्छ, त्यसैले 1 + 1 = 1।"
    }
  },
  {
    "id": "g10.dd.q302",
    "subject": "grade10/digital-design",
    "unit": "u3",
    "topic": "laws",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "The Boolean law A + A' = 1 is called the:",
      "ne": "A + A' = 1 भन्ने बुलियन नियमलाई के भनिन्छ?"
    },
    "options": [
      {
        "en": "Identity law",
        "ne": "Identity नियम"
      },
      {
        "en": "Complement law",
        "ne": "Complement नियम"
      },
      {
        "en": "Absorption law",
        "ne": "Absorption नियम"
      },
      {
        "en": "Null law",
        "ne": "Null नियम"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A variable ORed with its own complement is always 1 — one of them must be 1. This is the complement law, and it is how variables disappear during simplification.",
      "ne": "कुनै चललाई त्यसकै पूरकसँग OR गर्दा सधैं 1 आउँछ। यही complement नियम हो, र सरलीकरणमा चल यसैले हराउँछ।"
    }
  },
  {
    "id": "g10.dd.q303",
    "subject": "grade10/digital-design",
    "unit": "u3",
    "topic": "sop",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "SOP form is written from the truth table rows where the output is:",
      "ne": "ट्रुथ टेबलको कुन आउटपुट भएका पङ्क्तिबाट SOP लेखिन्छ?"
    },
    "options": [
      {
        "en": "1",
        "ne": "1"
      },
      {
        "en": "0",
        "ne": "0"
      },
      {
        "en": "Either one",
        "ne": "जुनसुकै"
      },
      {
        "en": "Undefined",
        "ne": "अनिश्चित"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "SOP takes the 1-rows and ORs the product terms together. POS takes the 0-rows instead.",
      "ne": "SOP ले 1 भएका पङ्क्ति लिन्छ र product पदहरूलाई OR ले जोड्छ। POS ले 0 भएका पङ्क्ति लिन्छ।"
    }
  },
  {
    "id": "g10.dd.q304",
    "subject": "grade10/digital-design",
    "unit": "u3",
    "topic": "kmap",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "The column headings of a Karnaugh map are written 00, 01, 11, 10 because:",
      "ne": "के–म्यापका स्तम्भ हेडिङ 00, 01, 11, 10 किन लेखिन्छन्?"
    },
    "options": [
      {
        "en": "It looks tidier",
        "ne": "हेर्दा राम्रो देखिन्छ"
      },
      {
        "en": "So neighbouring cells differ by exactly one variable",
        "ne": "छिमेकी कक्षमा ठ्याक्कै एउटा चल मात्र फरक होस् भनेर"
      },
      {
        "en": "It is the binary counting order",
        "ne": "binary गन्ने क्रम त्यही भएकाले"
      },
      {
        "en": "To make the map square",
        "ne": "म्याप वर्ग बनाउन"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "This is Gray code. Adjacency is what lets a group cancel a variable, and only Gray order guarantees that neighbours differ in one bit.",
      "ne": "यो Gray code हो। समूहले चल काट्न सक्नुको कारण adjacency हो, र छिमेकीमा एउटै बिट फरक हुने ग्यारेन्टी Gray क्रमले मात्र दिन्छ।"
    }
  },
  {
    "id": "g10.dd.q305",
    "subject": "grade10/digital-design",
    "unit": "u3",
    "topic": "kmap",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "How many cells may a single K-map group contain?",
      "ne": "के–म्यापको एउटा समूहमा कति कक्ष हुन सक्छन्?"
    },
    "options": [
      {
        "en": "Any number",
        "ne": "जति पनि"
      },
      {
        "en": "Only 2 or 4",
        "ne": "२ वा ४ मात्र"
      },
      {
        "en": "A power of two: 1, 2, 4, 8 …",
        "ne": "दुईको घात: 1, 2, 4, 8 …"
      },
      {
        "en": "An odd number",
        "ne": "बिजोर सङ्ख्या"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "A group must hold a power of two. A group of three is never legal, whatever shape it is drawn in.",
      "ne": "समूहमा दुईको घात जति कक्ष हुनुपर्छ। तीनको समूह जुनसुकै आकारमा भए पनि मान्य हुँदैन।"
    }
  },
  {
    "id": "g10.dd.q306",
    "subject": "grade10/digital-design",
    "unit": "u3",
    "topic": "kmap",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Two 1s in the leftmost and rightmost columns of a K-map row are:",
      "ne": "के–म्यापको एउटै पङ्क्तिमा सबैभन्दा बायाँ र दायाँ स्तम्भका दुई 1 लाई के भनिन्छ?"
    },
    "options": [
      {
        "en": "Not adjacent, so they cannot be grouped",
        "ne": "छिमेकी होइनन्, त्यसैले समूह बन्दैन"
      },
      {
        "en": "Adjacent, because the edges wrap around",
        "ne": "छिमेकी हुन्, किनभने किनारा वरिपरि जोडिन्छन्"
      },
      {
        "en": "Only groupable in a 4-variable map",
        "ne": "४ चलको म्यापमा मात्र समूह बन्छ"
      },
      {
        "en": "An error in the map",
        "ne": "म्यापकै त्रुटि"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The map wraps in both directions. The left and right edges are neighbours, and so are the top and bottom rows — which is what makes the four corners a legal group.",
      "ne": "म्याप दुवै दिशामा वरिपरि जोडिन्छ। बायाँ र दायाँ किनारा छिमेकी हुन्, त्यसै गरी माथि र तल्लो पङ्क्ति पनि — त्यसैले चार कुना पनि मान्य समूह हो।"
    }
  },
  {
    "id": "g10.dd.q307",
    "subject": "grade10/digital-design",
    "unit": "u3",
    "topic": "kmap",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Why should you always take the LARGEST possible K-map group?",
      "ne": "के–म्यापमा सधैं सक्ने जति ठूलो समूह किन लिनुपर्छ?"
    },
    "options": [
      {
        "en": "It is faster to draw",
        "ne": "कोर्न छिटो हुन्छ"
      },
      {
        "en": "A larger group removes more variables, giving a simpler term",
        "ne": "ठूलो समूहले बढी चल हटाउँछ, त्यसैले पद सरल हुन्छ"
      },
      {
        "en": "Small groups are against the rules",
        "ne": "सानो समूह नियमविरुद्ध हुन्छ"
      },
      {
        "en": "It changes the truth table",
        "ne": "यसले ट्रुथ टेबल बदल्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Doubling the group size removes one more variable. A group of 2 removes one variable, a group of 4 removes two, and so on — and the mark is for simplifying.",
      "ne": "समूह दोब्बर हुँदा एउटा थप चल हट्छ। 2 को समूहले एउटा, 4 को समूहले दुई चल हटाउँछ — र अंक सरलीकरणकै हो।"
    }
  },
  {
    "id": "g10.dd.q308",
    "subject": "grade10/digital-design",
    "unit": "u3",
    "topic": "pos",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "In POS form, a variable appearing as 1 in a 0-row is written:",
      "ne": "POS मा, 0 भएको पङ्क्तिमा 1 देखिने चल कसरी लेखिन्छ?"
    },
    "options": [
      {
        "en": "As it is",
        "ne": "जस्ताको तस्तै"
      },
      {
        "en": "Complemented",
        "ne": "पूरक बनाएर"
      },
      {
        "en": "It is left out",
        "ne": "छाडिन्छ"
      },
      {
        "en": "Doubled",
        "ne": "दोब्बर गरेर"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The rule reverses between the forms: in a 1-row (SOP) a 0 is complemented; in a 0-row (POS) a 1 is complemented.",
      "ne": "दुई रूपबीच नियम उल्टिन्छ: SOP मा 1 भएको पङ्क्तिमा 0 पूरक हुन्छ; POS मा 0 भएको पङ्क्तिमा 1 पूरक हुन्छ।"
    }
  },
  {
    "id": "g10.dd.q401",
    "subject": "grade10/digital-design",
    "unit": "u4",
    "topic": "half-adder",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which two gates make a half adder?",
      "ne": "Half adder बनाउन कुन दुई गेट चाहिन्छ?"
    },
    "options": [
      {
        "en": "AND and OR",
        "ne": "AND र OR"
      },
      {
        "en": "XOR and AND",
        "ne": "XOR र AND"
      },
      {
        "en": "NAND and NOR",
        "ne": "NAND र NOR"
      },
      {
        "en": "NOT and OR",
        "ne": "NOT र OR"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "SUM = A ⊕ B comes from an XOR gate and CARRY = A · B comes from an AND gate. Both read the same two inputs.",
      "ne": "SUM = A ⊕ B XOR गेटबाट र CARRY = A · B AND गेटबाट आउँछ। दुवैले उही दुई इनपुट पढ्छन्।"
    }
  },
  {
    "id": "g10.dd.q402",
    "subject": "grade10/digital-design",
    "unit": "u4",
    "topic": "half-adder",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "In a half adder with A = 1 and B = 1, the outputs are:",
      "ne": "A = 1 र B = 1 भएको half adder मा आउटपुट कति हुन्छन्?"
    },
    "options": [
      {
        "en": "SUM = 1, CARRY = 1",
        "ne": "SUM = 1, CARRY = 1"
      },
      {
        "en": "SUM = 0, CARRY = 1",
        "ne": "SUM = 0, CARRY = 1"
      },
      {
        "en": "SUM = 1, CARRY = 0",
        "ne": "SUM = 1, CARRY = 0"
      },
      {
        "en": "SUM = 0, CARRY = 0",
        "ne": "SUM = 0, CARRY = 0"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "1 + 1 = 10 in binary: write 0 in this column and carry 1 to the next. XOR of two 1s is 0; AND of two 1s is 1.",
      "ne": "binary मा 1 + 1 = 10: यही स्तम्भमा 0, अर्कोमा 1 क्यारी। दुई 1 को XOR 0 हुन्छ; AND 1 हुन्छ।"
    }
  },
  {
    "id": "g10.dd.q403",
    "subject": "grade10/digital-design",
    "unit": "u4",
    "topic": "full-adder",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "How many inputs does a full adder have?",
      "ne": "Full adder मा कति इनपुट हुन्छन्?"
    },
    "options": [
      {
        "en": "Two",
        "ne": "दुई"
      },
      {
        "en": "Three",
        "ne": "तीन"
      },
      {
        "en": "Four",
        "ne": "चार"
      },
      {
        "en": "One",
        "ne": "एक"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A full adder takes A, B and the carry coming in from the previous column. That third input is the whole difference from a half adder.",
      "ne": "Full adder ले A, B र अघिल्लो स्तम्भबाट आएको क्यारी लिन्छ। half adder सँगको फरक त्यही तेस्रो इनपुट हो।"
    }
  },
  {
    "id": "g10.dd.q404",
    "subject": "grade10/digital-design",
    "unit": "u4",
    "topic": "subtractor",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "The BORROW output of a half subtractor is given by:",
      "ne": "Half subtractor को BORROW आउटपुट कुन सूत्रले दिन्छ?"
    },
    "options": [
      {
        "en": "A · B",
        "ne": "A · B"
      },
      {
        "en": "A' · B",
        "ne": "A' · B"
      },
      {
        "en": "A ⊕ B",
        "ne": "A ⊕ B"
      },
      {
        "en": "A · B'",
        "ne": "A · B'"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A borrow is needed exactly when A is 0 and B is 1, which is A' · B. Compare with a half adder, where the second output is A · B instead.",
      "ne": "A = 0 र B = 1 हुँदा मात्र borrow चाहिन्छ, जुन A' · B हो। Half adder मा दोस्रो आउटपुट A · B हुन्छ।"
    }
  },
  {
    "id": "g10.dd.q405",
    "subject": "grade10/digital-design",
    "unit": "u4",
    "topic": "mux",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A multiplexer is best described as:",
      "ne": "Multiplexer लाई कसरी वर्णन गर्न मिल्छ?"
    },
    "options": [
      {
        "en": "Many inputs, one output",
        "ne": "धेरै इनपुट, एउटा आउटपुट"
      },
      {
        "en": "One input, many outputs",
        "ne": "एउटा इनपुट, धेरै आउटपुट"
      },
      {
        "en": "Equal inputs and outputs",
        "ne": "इनपुट र आउटपुट बराबर"
      },
      {
        "en": "No inputs at all",
        "ne": "कुनै इनपुट नै छैन"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "A MUX selects one of many inputs and routes it to a single output. A DEMUX does the opposite: one input, many outputs.",
      "ne": "MUX ले धेरै इनपुटमध्ये एउटा छानेर एउटै आउटपुटमा पठाउँछ। DEMUX ठीक उल्टो गर्छ।"
    }
  },
  {
    "id": "g10.dd.q406",
    "subject": "grade10/digital-design",
    "unit": "u4",
    "topic": "mux",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "How many select lines does a 16-to-1 multiplexer need?",
      "ne": "१६-देखि-१ multiplexer लाई कति select लाइन चाहिन्छ?"
    },
    "options": [
      {
        "en": "2",
        "ne": "२"
      },
      {
        "en": "3",
        "ne": "३"
      },
      {
        "en": "4",
        "ne": "४"
      },
      {
        "en": "16",
        "ne": "१६"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "n select lines address 2ⁿ inputs. 2⁴ = 16, so four select lines are needed.",
      "ne": "n select लाइनले 2ⁿ इनपुट सम्बोधन गर्छ। 2⁴ = 16, त्यसैले चार select लाइन चाहिन्छ।"
    }
  },
  {
    "id": "g10.dd.q407",
    "subject": "grade10/digital-design",
    "unit": "u4",
    "topic": "decoder",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A decoder takes n inputs and activates:",
      "ne": "Decoder ले n इनपुट लिएर के सक्रिय गर्छ?"
    },
    "options": [
      {
        "en": "All of its outputs",
        "ne": "आफ्ना सबै आउटपुट"
      },
      {
        "en": "Exactly one of its 2ⁿ outputs",
        "ne": "आफ्ना 2ⁿ मध्ये ठ्याक्कै एउटा आउटपुट"
      },
      {
        "en": "n outputs",
        "ne": "n वटा आउटपुट"
      },
      {
        "en": "No outputs",
        "ne": "कुनै आउटपुट होइन"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A decoder converts a binary code into a one-of-many selection: for each input combination exactly one output line goes high. An encoder does the reverse.",
      "ne": "Decoder ले binary कोडलाई धेरैमध्ये एउटाको छनोटमा बदल्छ: हरेक इनपुट जोडीका लागि ठ्याक्कै एउटा आउटपुट लाइन उच्च हुन्छ। Encoder ठीक उल्टो गर्छ।"
    }
  },
  {
    "id": "g10.dd.q408",
    "subject": "grade10/digital-design",
    "unit": "u4",
    "topic": "code-converter",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Decimal 47 written in BCD is:",
      "ne": "दशमलव 47 लाई BCD मा लेख्दा कति हुन्छ?"
    },
    "options": [
      {
        "en": "101111",
        "ne": "101111"
      },
      {
        "en": "0100 0111",
        "ne": "0100 0111"
      },
      {
        "en": "0100 1110",
        "ne": "0100 1110"
      },
      {
        "en": "0111 0100",
        "ne": "0111 0100"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "BCD converts each decimal DIGIT separately into four bits: 4 → 0100 and 7 → 0111. 101111 is 47 in plain binary, which is a different thing.",
      "ne": "BCD ले हरेक दशमलव अङ्कलाई छुट्टै चार बिटमा बदल्छ: 4 → 0100 र 7 → 0111। 101111 चाहिँ साधारण binary को 47 हो, जुन फरक कुरा हो।"
    }
  },
  {
    "id": "g10.dd.q409",
    "subject": "grade10/digital-design",
    "unit": "u4",
    "topic": "gray",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Gray code is useful because between consecutive values:",
      "ne": "Gray code किन उपयोगी छ — लगातार दुई मानबीच के हुन्छ?"
    },
    "options": [
      {
        "en": "All bits change",
        "ne": "सबै बिट फेरिन्छन्"
      },
      {
        "en": "Only one bit changes",
        "ne": "एउटै बिट मात्र फेरिन्छ"
      },
      {
        "en": "No bits change",
        "ne": "कुनै बिट फेरिँदैन"
      },
      {
        "en": "The number of bits changes",
        "ne": "बिटको सङ्ख्या फेरिन्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Only one bit changes at a time, so a reading taken while the value is changing can be wrong by at most one step. That matters in position sensors.",
      "ne": "एक पटकमा एउटै बिट फेरिने भएकाले, मान बदलिँदै गर्दा लिइएको पठन बढीमा एक चरण मात्र गलत हुन्छ। position sensor मा यो महत्त्वपूर्ण छ।"
    }
  },
  {
    "id": "g10.dd.q501",
    "subject": "grade10/digital-design",
    "unit": "u5",
    "topic": "definition",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A microprocessor contains which three main parts?",
      "ne": "माइक्रोप्रोसेसरभित्र कुन तीन मुख्य भाग हुन्छन्?"
    },
    "options": [
      {
        "en": "ALU, control unit and registers",
        "ne": "ALU, control unit र register"
      },
      {
        "en": "Keyboard, monitor and printer",
        "ne": "किबोर्ड, मनिटर र प्रिन्टर"
      },
      {
        "en": "RAM, ROM and hard disk",
        "ne": "RAM, ROM र हार्ड डिस्क"
      },
      {
        "en": "Address bus, data bus and power supply",
        "ne": "address bus, data bus र पावर सप्लाई"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "A microprocessor is the whole CPU on one chip: the ALU that calculates, the control unit that directs, and the registers that hold values.",
      "ne": "माइक्रोप्रोसेसर भनेको एउटै चिपमा पूरै CPU हो: गणना गर्ने ALU, निर्देशन दिने control unit, र मान राख्ने register।"
    }
  },
  {
    "id": "g10.dd.q502",
    "subject": "grade10/digital-design",
    "unit": "u5",
    "topic": "buses",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "The address bus of the 8085 is:",
      "ne": "8085 को address bus कस्तो हुन्छ?"
    },
    "options": [
      {
        "en": "8-bit and two way",
        "ne": "८-बिट र दुईतर्फी"
      },
      {
        "en": "16-bit and one way",
        "ne": "१६-बिट र एकतर्फी"
      },
      {
        "en": "16-bit and two way",
        "ne": "१६-बिट र दुईतर्फी"
      },
      {
        "en": "8-bit and one way",
        "ne": "८-बिट र एकतर्फी"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The address bus is 16 bits wide and unidirectional — the CPU always chooses the address, so memory never drives it. 16 lines reach 2¹⁶ = 64 KB.",
      "ne": "Address bus १६ बिट चौडा र एकतर्फी हुन्छ — ठेगाना सधैं CPU ले छान्छ। १६ लाइनले 2¹⁶ = ६४ KB सम्म पुग्छ।"
    }
  },
  {
    "id": "g10.dd.q503",
    "subject": "grade10/digital-design",
    "unit": "u5",
    "topic": "registers",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which register holds the address of the next instruction to be executed?",
      "ne": "चलाउनुपर्ने अर्को निर्देशनको ठेगाना कुन रजिस्टरमा हुन्छ?"
    },
    "options": [
      {
        "en": "Accumulator",
        "ne": "Accumulator"
      },
      {
        "en": "Instruction Register",
        "ne": "Instruction Register"
      },
      {
        "en": "Program Counter",
        "ne": "Program Counter"
      },
      {
        "en": "Stack Pointer",
        "ne": "Stack Pointer"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "The Program Counter holds the ADDRESS of the next instruction. The Instruction Register holds the instruction itself once it has been fetched.",
      "ne": "Program Counter ले अर्को निर्देशनको ठेगाना राख्छ। Instruction Register ले झिकिसकेको निर्देशन आफैं राख्छ।"
    }
  },
  {
    "id": "g10.dd.q504",
    "subject": "grade10/digital-design",
    "unit": "u5",
    "topic": "instruction-cycle",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "The correct order of the instruction cycle is:",
      "ne": "निर्देशन चक्रको सही क्रम कुन हो?"
    },
    "options": [
      {
        "en": "Decode, fetch, execute",
        "ne": "Decode, fetch, execute"
      },
      {
        "en": "Fetch, decode, execute",
        "ne": "Fetch, decode, execute"
      },
      {
        "en": "Execute, fetch, decode",
        "ne": "Execute, fetch, decode"
      },
      {
        "en": "Fetch, execute, decode",
        "ne": "Fetch, execute, decode"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The processor must first bring the instruction in (fetch), then work out what it means (decode), then carry it out (execute), storing any result.",
      "ne": "प्रोसेसरले पहिले निर्देशन भित्र्याउँछ (fetch), अनि त्यसको अर्थ निकाल्छ (decode), अनि चलाउँछ (execute), र नतिजा भए राख्छ।"
    }
  },
  {
    "id": "g10.dd.q505",
    "subject": "grade10/digital-design",
    "unit": "u5",
    "topic": "flags",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "The Zero flag of the 8085 is set when:",
      "ne": "8085 को Zero flag कहिले सेट हुन्छ?"
    },
    "options": [
      {
        "en": "The result of an operation is zero",
        "ne": "क्रियाको नतिजा शून्य हुँदा"
      },
      {
        "en": "The accumulator is empty",
        "ne": "Accumulator खाली हुँदा"
      },
      {
        "en": "A carry is produced",
        "ne": "क्यारी बन्दा"
      },
      {
        "en": "The program ends",
        "ne": "प्रोग्राम सकिँदा"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Flags record something about the last ALU result. Z is set to 1 when that result is exactly zero, so the program can act on it with a \"jump if zero\".",
      "ne": "Flag ले पछिल्लो ALU नतिजाबारे कुरा टिप्छ। नतिजा ठ्याक्कै शून्य हुँदा Z 1 हुन्छ, जसले \"शून्य भए जम्प गर\" गर्न दिन्छ।"
    }
  },
  {
    "id": "g10.dd.q506",
    "subject": "grade10/digital-design",
    "unit": "u5",
    "topic": "interrupts",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which 8085 interrupt has the highest priority?",
      "ne": "8085 को कुन interrupt को प्राथमिकता सर्वोच्च हो?"
    },
    "options": [
      {
        "en": "INTR",
        "ne": "INTR"
      },
      {
        "en": "RST 5.5",
        "ne": "RST 5.5"
      },
      {
        "en": "RST 7.5",
        "ne": "RST 7.5"
      },
      {
        "en": "TRAP",
        "ne": "TRAP"
      }
    ],
    "answer": 3,
    "explanation": {
      "en": "The order from highest to lowest is TRAP, RST 7.5, RST 6.5, RST 5.5, INTR. TRAP is also non-maskable — software cannot disable it.",
      "ne": "सर्वोच्चदेखि सबैभन्दा कम: TRAP, RST 7.5, RST 6.5, RST 5.5, INTR। TRAP लाई सफ्टवेयरले बन्द गर्न सक्दैन।"
    }
  },
  {
    "id": "g10.dd.q507",
    "subject": "grade10/digital-design",
    "unit": "u5",
    "topic": "addressing",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "The instruction MVI A, 05H uses which addressing mode?",
      "ne": "MVI A, 05H निर्देशनले कुन addressing mode प्रयोग गर्छ?"
    },
    "options": [
      {
        "en": "Direct",
        "ne": "Direct"
      },
      {
        "en": "Immediate",
        "ne": "Immediate"
      },
      {
        "en": "Register indirect",
        "ne": "Register indirect"
      },
      {
        "en": "Implicit",
        "ne": "Implicit"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The value 05H is written inside the instruction itself, so it is immediate addressing. Direct addressing would give a memory address instead.",
      "ne": "05H मान निर्देशनभित्रै लेखिएको छ, त्यसैले यो immediate addressing हो। Direct ले मेमोरीको ठेगाना दिन्थ्यो।"
    }
  },
  {
    "id": "g10.dd.q508",
    "subject": "grade10/digital-design",
    "unit": "u5",
    "topic": "architecture",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Why are the AD0–AD7 lines of the 8085 called multiplexed?",
      "ne": "8085 का AD0–AD7 लाइनलाई किन multiplexed भनिन्छ?"
    },
    "options": [
      {
        "en": "They carry an address at one moment and data at another",
        "ne": "एक क्षणमा ठेगाना र अर्को क्षणमा डाटा बोक्छन्"
      },
      {
        "en": "They are twice as fast as the other pins",
        "ne": "अरू pin भन्दा दोब्बर छिटो हुन्छन्"
      },
      {
        "en": "They can be disconnected",
        "ne": "तिनलाई छुट्याउन मिल्छ"
      },
      {
        "en": "They carry both power and signal",
        "ne": "बिजुली र सिग्नल दुवै बोक्छन्"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "The same eight lines carry the lower address byte first and then the data, which saves eight pins. The ALE signal goes high to say the lines currently hold an address.",
      "ne": "उही आठ लाइनले पहिले तल्लो ठेगाना बाइट र त्यसपछि डाटा बोक्छन्, जसले आठ pin बचाउँछ। अहिले ठेगाना छ भन्न ALE सङ्केत उच्च हुन्छ।"
    }
  },
  {
    "id": "g10.dd.q509",
    "subject": "grade10/digital-design",
    "unit": "u5",
    "topic": "memory",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "With a 16-bit address bus, how much memory can the 8085 address?",
      "ne": "१६-बिट address bus भएकाले 8085 ले कति मेमोरी सम्बोधन गर्न सक्छ?"
    },
    "options": [
      {
        "en": "16 KB",
        "ne": "१६ KB"
      },
      {
        "en": "32 KB",
        "ne": "३२ KB"
      },
      {
        "en": "64 KB",
        "ne": "६४ KB"
      },
      {
        "en": "1 MB",
        "ne": "१ MB"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "16 address lines give 2¹⁶ = 65,536 distinct locations. At one byte each that is 64 KB.",
      "ne": "१६ ठेगाना लाइनले 2¹⁶ = ६५,५३६ फरक ठाउँ दिन्छ। प्रति ठाउँ एक बाइट भएकाले त्यो ६४ KB हुन्छ।"
    }
  },
  {
    "id": "g10.dd.q510",
    "subject": "grade10/digital-design",
    "unit": "u5",
    "topic": "alu",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which block of the microprocessor performs addition and comparison?",
      "ne": "माइक्रोप्रोसेसरको कुन भागले जोड र तुलना गर्छ?"
    },
    "options": [
      {
        "en": "Control unit",
        "ne": "Control unit"
      },
      {
        "en": "ALU",
        "ne": "ALU"
      },
      {
        "en": "Program counter",
        "ne": "Program counter"
      },
      {
        "en": "Data bus",
        "ne": "Data bus"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The ALU is the only part that calculates. The control unit directs the other blocks but performs no arithmetic itself.",
      "ne": "गणना गर्ने एउटै भाग ALU हो। Control unit ले अरू ब्लकलाई निर्देशन दिन्छ तर आफैं गणित गर्दैन।"
    }
  }
]);

QuizService.registerBank("grade10/dbms", [
  {
    "id": "g10.db.q001",
    "subject": "grade10/dbms",
    "unit": "u1",
    "topic": "data-information",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which of these is DATA rather than information?",
      "ne": "यीमध्ये कुन INFORMATION होइन, DATA हो?"
    },
    "options": [
      {
        "en": "78",
        "ne": "७८"
      },
      {
        "en": "Ram scored 78 in class 10",
        "ne": "रामले कक्षा १० मा ७८ अंक ल्याए"
      },
      {
        "en": "The class average is 72",
        "ne": "कक्षाको औसत ७२ छ"
      },
      {
        "en": "Sita passed the examination",
        "ne": "सीता परीक्षामा उत्तीर्ण भइन्"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Data is a raw fact with no meaning attached. 78 on its own tells you nothing. The other three have been processed and given meaning, which makes them information.",
      "ne": "Data भनेको अर्थ नजोडिएको काँचो तथ्य हो। ७८ एक्लैले केही बताउँदैन। बाँकी तीनलाई प्रशोधन गरेर अर्थ दिइएको छ, त्यसैले ती information हुन्।"
    }
  },
  {
    "id": "g10.db.q002",
    "subject": "grade10/dbms",
    "unit": "u1",
    "topic": "dbms-definition",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What is MySQL?",
      "ne": "MySQL के हो?"
    },
    "options": [
      {
        "en": "A DBMS — software that manages a database",
        "ne": "एउटा DBMS — डाटाबेस व्यवस्थापन गर्ने सफ्टवेयर"
      },
      {
        "en": "A database",
        "ne": "एउटा डाटाबेस"
      },
      {
        "en": "A table",
        "ne": "एउटा तालिका"
      },
      {
        "en": "A programming language",
        "ne": "एउटा प्रोग्रामिङ भाषा"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "MySQL is a DBMS: the software. The database is the collection of data it manages. Calling the DBMS \"the database\" is the most common slip in this unit.",
      "ne": "MySQL एउटा DBMS हो — सफ्टवेयर। डाटाबेस भनेको त्यसले व्यवस्थापन गर्ने data को सङ्ग्रह हो। DBMS लाई \"डाटाबेस\" भन्नु यस युनिटको सबैभन्दा सामान्य गल्ती हो।"
    }
  },
  {
    "id": "g10.db.q003",
    "subject": "grade10/dbms",
    "unit": "u1",
    "topic": "file-system-limits",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A student's address is stored in three different files. The office updates one of them. What problem is this?",
      "ne": "एउटै विद्यार्थीको ठेगाना तीन फरक फाइलमा छ। कार्यालयले एउटा मात्र अद्यावधिक गर्‍यो। यो कुन समस्या हो?"
    },
    "options": [
      {
        "en": "Data inconsistency",
        "ne": "Data inconsistency"
      },
      {
        "en": "Data isolation",
        "ne": "Data isolation"
      },
      {
        "en": "Concurrency",
        "ne": "Concurrency"
      },
      {
        "en": "Data independence",
        "ne": "Data independence"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Storing the same fact three times is redundancy; the copies disagreeing after one is updated is inconsistency. The question asks about the result of the update, so the answer is inconsistency.",
      "ne": "उही तथ्य तीन पटक राख्नु redundancy हो; एउटा बदलेपछि प्रतिलिपिहरू बाझिनु inconsistency हो। प्रश्नले अद्यावधिकपछिको नतिजा सोधेकाले उत्तर inconsistency हो।"
    }
  },
  {
    "id": "g10.db.q004",
    "subject": "grade10/dbms",
    "unit": "u1",
    "topic": "architecture",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which level of the three-level architecture describes what a particular user is allowed to see?",
      "ne": "तीन तहको संरचनामा कुन तहले कुनै प्रयोगकर्ताले देख्न पाउने कुरा बताउँछ?"
    },
    "options": [
      {
        "en": "External level",
        "ne": "External level"
      },
      {
        "en": "Conceptual level",
        "ne": "Conceptual level"
      },
      {
        "en": "Internal level",
        "ne": "Internal level"
      },
      {
        "en": "Physical level",
        "ne": "Physical level"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "The external (or view) level is the top of the diagram, nearest the user. The conceptual level says what data exists overall; the internal level says how it is stored on disk.",
      "ne": "External (view) तह चित्रको सबैभन्दा माथि — प्रयोगकर्तानजिक। Conceptual तहले समग्रमा कुन data छ भन्छ; internal तहले डिस्कमा कसरी राखिएको छ भन्छ।"
    }
  },
  {
    "id": "g10.db.q005",
    "subject": "grade10/dbms",
    "unit": "u1",
    "topic": "schema-instance",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A new student is admitted and a row is inserted. What has changed?",
      "ne": "नयाँ विद्यार्थी भर्ना भए र एउटा पङ्क्ति थपियो। के बदलियो?"
    },
    "options": [
      {
        "en": "The instance only",
        "ne": "Instance मात्र"
      },
      {
        "en": "The schema only",
        "ne": "Schema मात्र"
      },
      {
        "en": "Both the schema and the instance",
        "ne": "Schema र instance दुवै"
      },
      {
        "en": "Neither",
        "ne": "कुनै पनि होइन"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "The instance is the data in the database right now, so inserting a row changes it. The schema is the structure — the table name, columns and keys — and adding a student does not change any of those.",
      "ne": "Instance भनेको अहिलेको data हो, त्यसैले पङ्क्ति थप्दा बदलिन्छ। Schema भनेको संरचना — तालिकाको नाम, स्तम्भ र कुञ्जी — र विद्यार्थी थप्दा ती बदलिँदैनन्।"
    }
  },
  {
    "id": "g10.db.q006",
    "subject": "grade10/dbms",
    "unit": "u1",
    "topic": "database-users",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Who grants and revokes permissions and takes backups?",
      "ne": "अधिकार दिने–खोस्ने र backup लिने काम कसले गर्छ?"
    },
    "options": [
      {
        "en": "The Database Administrator (DBA)",
        "ne": "Database Administrator (DBA)"
      },
      {
        "en": "The application programmer",
        "ne": "Application programmer"
      },
      {
        "en": "The end user",
        "ne": "End user"
      },
      {
        "en": "The database designer",
        "ne": "Database designer"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "The DBA has complete control of the database: creating it, controlling who may use it, taking backups and tuning performance.",
      "ne": "DBA सँग डाटाबेसको पूर्ण नियन्त्रण हुन्छ: बनाउने, कसले प्रयोग गर्न पाउने नियन्त्रण गर्ने, backup लिने र कार्यसम्पादन सुधार्ने।"
    }
  },
  {
    "id": "g10.db.q007",
    "subject": "grade10/dbms",
    "unit": "u1",
    "topic": "db-models",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "In which database model may a record have SEVERAL parent records?",
      "ne": "कुन डाटाबेस मोडेलमा एउटा रेकर्डका धेरै parent रेकर्ड हुन सक्छन्?"
    },
    "options": [
      {
        "en": "Network model",
        "ne": "Network model"
      },
      {
        "en": "Hierarchical model",
        "ne": "Hierarchical model"
      },
      {
        "en": "Relational model",
        "ne": "Relational model"
      },
      {
        "en": "Object-oriented model",
        "ne": "Object-oriented model"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "The hierarchical model is a tree, so a record has exactly one parent. The network model is a graph and allows several, which is the single examinable difference between the two.",
      "ne": "Hierarchical model रूख हो, त्यसैले रेकर्डको एउटै parent हुन्छ। Network model ग्राफ हो र धेरै हुन दिन्छ — दुईबीचको परीक्षामा सोधिने फरक यही एउटा हो।"
    }
  },
  {
    "id": "g10.db.q008",
    "subject": "grade10/dbms",
    "unit": "u1",
    "topic": "db-disadvantages",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which of these is a DISADVANTAGE of a database system?",
      "ne": "यीमध्ये कुन डाटाबेस प्रणालीको बेफाइदा हो?"
    },
    "options": [
      {
        "en": "A failure affects everything at once, because the data is centralised",
        "ne": "Data एकै ठाउँमा हुने भएकाले एउटै बिग्रँदा सबै प्रभावित हुन्छ"
      },
      {
        "en": "Data redundancy is controlled",
        "ne": "Data redundancy नियन्त्रण हुन्छ"
      },
      {
        "en": "Data can be shared between many users",
        "ne": "धेरै प्रयोगकर्ताबीच data साझा गर्न सकिन्छ"
      },
      {
        "en": "Security and access control are possible",
        "ne": "सुरक्षा र पहुँच नियन्त्रण सम्भव हुन्छ"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Centralisation is what makes a database powerful and also what makes it a single point of failure. The other three options are advantages. A question asking for both wants at least one of each.",
      "ne": "एकै ठाउँमा राख्नुले डाटाबेसलाई बलियो बनाउँछ र सँगै एउटै जोखिम बिन्दु पनि। बाँकी तीन फाइदा हुन्।"
    }
  },
  {
    "id": "g10.db.q009",
    "subject": "grade10/dbms",
    "unit": "u2",
    "topic": "er-symbols",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "In an ER diagram, what is drawn as a DIAMOND?",
      "ne": "ER चित्रमा चतुर्भुजले के जनाउँछ?"
    },
    "options": [
      {
        "en": "A relationship",
        "ne": "सम्बन्ध (relationship)"
      },
      {
        "en": "An entity",
        "ne": "इन्टिटी"
      },
      {
        "en": "An attribute",
        "ne": "एट्रिब्युट"
      },
      {
        "en": "A primary key",
        "ne": "Primary key"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "A diamond holds the relationship, written as a verb — ENROLS, TEACHES. Entities are rectangles and attributes are ellipses.",
      "ne": "चतुर्भुजभित्र सम्बन्ध हुन्छ, क्रियापदमा लेखिएको — ENROLS, TEACHES। इन्टिटी आयत हुन् र एट्रिब्युट दीर्घवृत्त।"
    }
  },
  {
    "id": "g10.db.q010",
    "subject": "grade10/dbms",
    "unit": "u2",
    "topic": "er-symbols",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A student's age is calculated from their date of birth and is not stored. How is it drawn?",
      "ne": "विद्यार्थीको उमेर जन्ममितिबाट निकालिन्छ र भण्डारण गरिँदैन। यसलाई कसरी कोरिन्छ?"
    },
    "options": [
      {
        "en": "A dashed ellipse",
        "ne": "धर्के दीर्घवृत्त"
      },
      {
        "en": "A double ellipse",
        "ne": "दोहोरो दीर्घवृत्त"
      },
      {
        "en": "An underlined ellipse",
        "ne": "मुनि रेखा भएको दीर्घवृत्त"
      },
      {
        "en": "A double rectangle",
        "ne": "दोहोरो आयत"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "A derived attribute is drawn with a dashed ellipse. A double ellipse means multivalued, an underline marks the key, and a double rectangle is a weak entity.",
      "ne": "व्युत्पन्न (derived) एट्रिब्युट धर्के दीर्घवृत्तले कोरिन्छ। दोहोरो दीर्घवृत्त = बहुमान, मुनि रेखा = कुञ्जी, दोहोरो आयत = कमजोर इन्टिटी।"
    }
  },
  {
    "id": "g10.db.q011",
    "subject": "grade10/dbms",
    "unit": "u2",
    "topic": "weak-entity",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What makes an entity WEAK?",
      "ne": "कुनै इन्टिटीलाई \"कमजोर\" के कुराले बनाउँछ?"
    },
    "options": [
      {
        "en": "It has no key of its own and depends on an owner entity",
        "ne": "यसको आफ्नै कुञ्जी हुँदैन र मालिक इन्टिटीमा निर्भर हुन्छ"
      },
      {
        "en": "It holds very little data",
        "ne": "यसमा थोरै data हुन्छ"
      },
      {
        "en": "It is less important than the others",
        "ne": "यो अरूभन्दा कम महत्त्वपूर्ण हुन्छ"
      },
      {
        "en": "It has no relationships",
        "ne": "यसको कुनै सम्बन्ध हुँदैन"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "\"Weak\" is about identification, not importance. A weak entity cannot be identified on its own and must borrow its owner's key. It is drawn with a double rectangle.",
      "ne": "\"कमजोर\" भनेको चिनारीको कुरा हो, महत्त्वको होइन। कमजोर इन्टिटी आफैंले चिनिँदैन र मालिकको कुञ्जी लिनुपर्छ। दोहोरो आयतले कोरिन्छ।"
    }
  },
  {
    "id": "g10.db.q012",
    "subject": "grade10/dbms",
    "unit": "u2",
    "topic": "cardinality",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A class contains many students, and each student belongs to exactly one class. What is the mapping cardinality?",
      "ne": "एउटा कक्षामा धेरै विद्यार्थी हुन्छन्, र हरेक विद्यार्थी ठ्याक्कै एउटै कक्षाको हुन्छ। Mapping cardinality कति हो?"
    },
    "options": [
      {
        "en": "One-to-many (1:M)",
        "ne": "एक–धेरै (1:M)"
      },
      {
        "en": "Many-to-many (M:N)",
        "ne": "धेरै–धेरै (M:N)"
      },
      {
        "en": "One-to-one (1:1)",
        "ne": "एक–एक (1:1)"
      },
      {
        "en": "Many-to-one only",
        "ne": "धेरै–एक मात्र"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Test both directions. Class → students is \"many\", but student → class is \"one\". Many one way and one the other way is 1:M. It would only be M:N if a student could also be in several classes.",
      "ne": "दुवै दिशा जाँच्नुहोस्। कक्षा → विद्यार्थी \"धेरै\" हो, तर विद्यार्थी → कक्षा \"एक\"। एकातिर धेरै र अर्कोतिर एक भए 1:M। विद्यार्थी धेरै कक्षामा हुन सक्ने भए मात्र M:N हुन्थ्यो।"
    }
  },
  {
    "id": "g10.db.q013",
    "subject": "grade10/dbms",
    "unit": "u2",
    "topic": "mn-junction-table",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A student takes many courses and a course is taken by many students. How many TABLES does this need?",
      "ne": "एउटा विद्यार्थीले धेरै विषय लिन्छन् र एउटा विषय धेरै विद्यार्थीले लिन्छन्। यसलाई कति तालिका चाहिन्छ?"
    },
    "options": [
      {
        "en": "Three — the two entities plus a junction table",
        "ne": "तीन — दुई इन्टिटी र एउटा junction तालिका"
      },
      {
        "en": "Two",
        "ne": "दुई"
      },
      {
        "en": "One",
        "ne": "एक"
      },
      {
        "en": "Four",
        "ne": "चार"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "A many-to-many relationship cannot be recorded by a foreign key, because a column holds one value and each side has many partners. It becomes a third table holding one row per link.",
      "ne": "धेरै–धेरै सम्बन्धलाई foreign key ले राख्न सक्दैन, किनभने स्तम्भले एउटै मान राख्छ र दुवैतर्फ धेरै जोडी छन्। यो तेस्रो तालिका बन्छ, हरेक जोडका लागि एक पङ्क्ति।"
    }
  },
  {
    "id": "g10.db.q014",
    "subject": "grade10/dbms",
    "unit": "u2",
    "topic": "keys",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which statement about a PRIMARY key is true?",
      "ne": "Primary key बारे कुन भनाइ सही हो?"
    },
    "options": [
      {
        "en": "It must be unique and can never be NULL",
        "ne": "यो अद्वितीय हुनुपर्छ र कहिल्यै NULL हुन पाउँदैन"
      },
      {
        "en": "It may be NULL if the value is unknown",
        "ne": "मान थाहा नभए NULL हुन सक्छ"
      },
      {
        "en": "It may repeat across rows",
        "ne": "पङ्क्तिहरूमा दोहोरिन सक्छ"
      },
      {
        "en": "It must point at another table",
        "ne": "यसले अर्को तालिका देखाउनुपर्छ"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Unique and NOT NULL are the two rules a primary key must obey — together they are what let a row be found reliably. Pointing at another table is a foreign key, which may be NULL and may repeat.",
      "ne": "अद्वितीय र NOT NULL — primary key ले पालना गर्नुपर्ने दुई नियम यिनै हुन्। अर्को तालिका देखाउने काम foreign key को हो, जुन NULL हुन र दोहोरिन सक्छ।"
    }
  },
  {
    "id": "g10.db.q015",
    "subject": "grade10/dbms",
    "unit": "u2",
    "topic": "keys",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A candidate key is best described as…",
      "ne": "Candidate key को उत्तम व्याख्या कुन हो?"
    },
    "options": [
      {
        "en": "a super key with no unnecessary attribute in it",
        "ne": "कुनै अनावश्यक एट्रिब्युट नभएको super key"
      },
      {
        "en": "any set of columns that identifies a row",
        "ne": "पङ्क्ति चिनाउने जुनसुकै स्तम्भ समूह"
      },
      {
        "en": "the key that was chosen as primary",
        "ne": "primary का रूपमा छानिएको कुञ्जी"
      },
      {
        "en": "a column pointing at another table",
        "ne": "अर्को तालिका देखाउने स्तम्भ"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Any identifying set is a super key. Strip out everything unnecessary and it becomes a candidate key. One candidate key is then chosen as the primary key; the rest are alternate keys.",
      "ne": "पङ्क्ति चिनाउने जुनसुकै समूह super key हो। अनावश्यक कुरा हटाएपछि candidate key बन्छ। तीमध्ये एउटा primary key छानिन्छ; बाँकी alternate key हुन्।"
    }
  },
  {
    "id": "g10.db.q016",
    "subject": "grade10/dbms",
    "unit": "u2",
    "topic": "degree-of-relationship",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "An EMPLOYEE manages another EMPLOYEE. What is the degree of this relationship?",
      "ne": "एउटा EMPLOYEE ले अर्को EMPLOYEE लाई व्यवस्थापन गर्छ। यो सम्बन्धको degree कति हो?"
    },
    "options": [
      {
        "en": "Unary — one entity takes part",
        "ne": "Unary — एउटै इन्टिटी सहभागी"
      },
      {
        "en": "Binary — two entities take part",
        "ne": "Binary — दुई इन्टिटी सहभागी"
      },
      {
        "en": "Ternary — three entities take part",
        "ne": "Ternary — तीन इन्टिटी सहभागी"
      },
      {
        "en": "It has no degree",
        "ne": "यसको degree हुँदैन"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "The degree of a relationship counts the entities in it, not the rows. Only EMPLOYEE takes part here, related to itself, so the degree is unary. Do not confuse degree with cardinality.",
      "ne": "सम्बन्धको degree ले त्यसमा सहभागी इन्टिटी गन्छ, पङ्क्ति होइन। यहाँ EMPLOYEE मात्र छ, आफैंसँग सम्बन्धित, त्यसैले degree unary हो। Degree लाई cardinality सँग नमिसाउनुहोस्।"
    }
  },
  {
    "id": "g10.db.q017",
    "subject": "grade10/dbms",
    "unit": "u3",
    "topic": "degree-cardinality",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A table has 5 columns and 200 rows. What is its DEGREE?",
      "ne": "एउटा तालिकामा ५ स्तम्भ र २०० पङ्क्ति छन्। यसको DEGREE कति हो?"
    },
    "options": [
      {
        "en": "5",
        "ne": "५"
      },
      {
        "en": "200",
        "ne": "२००"
      },
      {
        "en": "1000",
        "ne": "१०००"
      },
      {
        "en": "205",
        "ne": "२०५"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Degree is the number of columns; cardinality is the number of rows. Here the degree is 5 and the cardinality is 200. Swapping these two is the commonest error in this unit.",
      "ne": "Degree भनेको स्तम्भ सङ्ख्या; cardinality भनेको पङ्क्ति सङ्ख्या। यहाँ degree ५ र cardinality २००। यी दुई साट्नु यस युनिटको सबैभन्दा सामान्य गल्ती हो।"
    }
  },
  {
    "id": "g10.db.q018",
    "subject": "grade10/dbms",
    "unit": "u3",
    "topic": "relation-properties",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which of these is NOT allowed in a relation?",
      "ne": "रिलेसनमा यीमध्ये कुन मिल्दैन?"
    },
    "options": [
      {
        "en": "Two rows that are completely identical",
        "ne": "पूरै उस्तै दुई पङ्क्ति"
      },
      {
        "en": "Rows stored in no particular order",
        "ne": "कुनै निश्चित क्रम नभएका पङ्क्ति"
      },
      {
        "en": "A column that allows NULL",
        "ne": "NULL राख्न दिने स्तम्भ"
      },
      {
        "en": "Columns listed in a different order",
        "ne": "फरक क्रममा राखिएका स्तम्भ"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "A relation is a set of tuples, so no two rows may be identical — the primary key guarantees it. Order is not significant for rows or columns, and NULLs are permitted in non-key columns.",
      "ne": "रिलेसन ट्युपलहरूको सेट हो, त्यसैले दुई पङ्क्ति उस्तै हुन पाउँदैनन् — primary key ले सुनिश्चित गर्छ। पङ्क्ति र स्तम्भको क्रमको महत्त्व हुँदैन, र कुञ्जी नभएका स्तम्भमा NULL मिल्छ।"
    }
  },
  {
    "id": "g10.db.q019",
    "subject": "grade10/dbms",
    "unit": "u3",
    "topic": "domain",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What is a DOMAIN in the relational model?",
      "ne": "रिलेसनल मोडेलमा DOMAIN भनेको के हो?"
    },
    "options": [
      {
        "en": "The set of values an attribute is allowed to hold",
        "ne": "कुनै एट्रिब्युटले लिन पाउने मानहरूको समूह"
      },
      {
        "en": "The number of rows in a table",
        "ne": "तालिकाका पङ्क्तिको सङ्ख्या"
      },
      {
        "en": "The name of the database",
        "ne": "डाटाबेसको नाम"
      },
      {
        "en": "The primary key of a relation",
        "ne": "रिलेसनको primary key"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "A domain constrains what may appear in a column. The domain of \"marks\" might be whole numbers from 0 to 100, so the text \"Ram\" could never be stored there.",
      "ne": "Domain ले स्तम्भमा के आउन सक्छ भन्ने सीमित गर्छ। \"marks\" को domain ० देखि १०० सम्मका पूर्ण सङ्ख्या होला, त्यसैले त्यहाँ \"Ram\" राख्न मिल्दैन।"
    }
  },
  {
    "id": "g10.db.q020",
    "subject": "grade10/dbms",
    "unit": "u3",
    "topic": "foreign-key",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Student.class_id is a foreign key to Class.class_id. An attempt is made to insert a student with class_id = 15, but no class 15 exists. What happens?",
      "ne": "Student.class_id ले Class.class_id लाई देखाउने foreign key हो। class_id = 15 भएको विद्यार्थी थप्न खोजियो, तर कक्षा १५ छैन। के हुन्छ?"
    },
    "options": [
      {
        "en": "It is refused — referential integrity is violated",
        "ne": "अस्वीकार हुन्छ — referential integrity उल्लङ्घन हुन्छ"
      },
      {
        "en": "It is accepted and class 15 is created automatically",
        "ne": "स्वीकार हुन्छ र कक्षा १५ आफैं बन्छ"
      },
      {
        "en": "It is accepted and the value becomes NULL",
        "ne": "स्वीकार हुन्छ र मान NULL बन्छ"
      },
      {
        "en": "It is accepted with a warning",
        "ne": "चेतावनीसहित स्वीकार हुन्छ"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Referential integrity says a foreign key may only hold a value that already exists as a primary key in the table it points at. It may be NULL — meaning \"not assigned\" — but it may not be wrong.",
      "ne": "Referential integrity अनुसार foreign key ले देखाइएको तालिकाको primary key मा पहिले नै भएको मान मात्र राख्न पाउँछ। NULL हुन सक्छ — \"तोकिएको छैन\" भन्ने अर्थमा — तर गलत हुन पाउँदैन।"
    }
  },
  {
    "id": "g10.db.q021",
    "subject": "grade10/dbms",
    "unit": "u3",
    "topic": "er-to-relational",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "When a 1:M relationship is converted to tables, where does the foreign key go?",
      "ne": "1:M सम्बन्धलाई तालिकामा बदल्दा foreign key कहाँ जान्छ?"
    },
    "options": [
      {
        "en": "Into the table on the MANY side",
        "ne": "\"धेरै\" तर्फको तालिकामा"
      },
      {
        "en": "Into the table on the ONE side",
        "ne": "\"एक\" तर्फको तालिकामा"
      },
      {
        "en": "Into a new third table",
        "ne": "नयाँ तेस्रो तालिकामा"
      },
      {
        "en": "Into both tables",
        "ne": "दुवै तालिकामा"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "The primary key of the \"one\" side is copied into the \"many\" side. Each student stores the one class_id they belong to. Doing it the other way round cannot work — a column holds one value, and a class has many students.",
      "ne": "\"एक\" तर्फको primary key \"धेरै\" तर्फ सारिन्छ। हरेक विद्यार्थीले आफू भएको एउटा class_id राख्छ। उल्टो गर्दा हुँदैन — स्तम्भले एउटै मान राख्छ, र कक्षामा धेरै विद्यार्थी हुन्छन्।"
    }
  },
  {
    "id": "g10.db.q022",
    "subject": "grade10/dbms",
    "unit": "u3",
    "topic": "relational-model",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "In the relational model, how are two tables connected?",
      "ne": "रिलेसनल मोडेलमा दुई तालिका कसरी जोडिन्छन्?"
    },
    "options": [
      {
        "en": "By keys",
        "ne": "कुञ्जीले"
      },
      {
        "en": "By pointers",
        "ne": "Pointer ले"
      },
      {
        "en": "By their position in the file",
        "ne": "फाइलमा तिनको स्थानले"
      },
      {
        "en": "By the order the rows were inserted",
        "ne": "पङ्क्ति थपिएको क्रमले"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "The relational model links tables by matching values — a foreign key holding a value that exists as a primary key elsewhere. It deliberately avoids pointers, which is what made it simpler than the models before it.",
      "ne": "रिलेसनल मोडेलले मान मिलाएर तालिका जोड्छ — foreign key सँग अन्यत्र primary key भएको मान। यसले जानाजान pointer प्रयोग गर्दैन, र यही कारण यो अघिल्ला मोडेलभन्दा सरल भयो।"
    }
  },
  {
    "id": "g10.db.q023",
    "subject": "grade10/dbms",
    "unit": "u4",
    "topic": "sql-families",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "To which family of SQL does CREATE TABLE belong?",
      "ne": "CREATE TABLE कुन SQL परिवारको हो?"
    },
    "options": [
      {
        "en": "DDL — Data Definition Language",
        "ne": "DDL — Data Definition Language"
      },
      {
        "en": "DML — Data Manipulation Language",
        "ne": "DML — Data Manipulation Language"
      },
      {
        "en": "DCL — Data Control Language",
        "ne": "DCL — Data Control Language"
      },
      {
        "en": "None of these",
        "ne": "यीमध्ये कुनै पनि होइन"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Sort a statement by what it changes. CREATE TABLE changes the structure, so it is DDL. DML changes the data inside; DCL changes who is allowed to use it.",
      "ne": "कथनले के बदल्छ त्यसैअनुसार छुट्याउनुहोस्। CREATE TABLE ले संरचना बदल्छ, त्यसैले DDL। DML ले भित्रको data, DCL ले प्रयोग गर्न पाउने अधिकार बदल्छ।"
    }
  },
  {
    "id": "g10.db.q024",
    "subject": "grade10/dbms",
    "unit": "u4",
    "topic": "delete-vs-drop",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What is left after DELETE FROM Student; runs?",
      "ne": "DELETE FROM Student; चलेपछि के बाँकी रहन्छ?"
    },
    "options": [
      {
        "en": "The table, with its structure but no rows",
        "ne": "तालिका — संरचनासहित तर पङ्क्तिविहीन"
      },
      {
        "en": "Nothing — the table is gone",
        "ne": "केही होइन — तालिका नै गयो"
      },
      {
        "en": "The rows, but no structure",
        "ne": "पङ्क्ति, तर संरचना छैन"
      },
      {
        "en": "An error, because WHERE is missing",
        "ne": "त्रुटि, किनभने WHERE छैन"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "DELETE removes rows; the table and its columns remain, and you can insert into it again tomorrow. DROP TABLE removes the table itself. This is the difference examiners ask for most often.",
      "ne": "DELETE ले पङ्क्ति हटाउँछ; तालिका र यसका स्तम्भ रहन्छन्, र भोलि फेरि पङ्क्ति थप्न सकिन्छ। DROP TABLE ले तालिका नै हटाउँछ। परीक्षकले सबैभन्दा धेरै सोध्ने फरक यही हो।"
    }
  },
  {
    "id": "g10.db.q025",
    "subject": "grade10/dbms",
    "unit": "u4",
    "topic": "select-where",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A Student table has 4 rows and 4 columns. SELECT name FROM Student WHERE marks > 60; returns 3 students. What is the shape of the result?",
      "ne": "Student तालिकामा ४ पङ्क्ति र ४ स्तम्भ छन्। SELECT name FROM Student WHERE marks > 60; ले ३ विद्यार्थी दिन्छ। नतिजाको आकार कस्तो हुन्छ?"
    },
    "options": [
      {
        "en": "3 rows and 1 column",
        "ne": "३ पङ्क्ति र १ स्तम्भ"
      },
      {
        "en": "3 rows and 4 columns",
        "ne": "३ पङ्क्ति र ४ स्तम्भ"
      },
      {
        "en": "4 rows and 1 column",
        "ne": "४ पङ्क्ति र १ स्तम्भ"
      },
      {
        "en": "4 rows and 4 columns",
        "ne": "४ पङ्क्ति र ४ स्तम्भ"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Two independent cuts. WHERE chooses rows: 4 becomes 3. SELECT chooses columns: 4 becomes 1, because only \"name\" is listed. Neither clause does the other one's job.",
      "ne": "दुई छुट्टै कटाइ। WHERE ले पङ्क्ति छान्छ: ४ बाट ३। SELECT ले स्तम्भ छान्छ: ४ बाट १, किनभने \"name\" मात्र लेखिएको छ। एउटाले अर्कोको काम गर्दैन।"
    }
  },
  {
    "id": "g10.db.q026",
    "subject": "grade10/dbms",
    "unit": "u4",
    "topic": "order-by",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A query returns 5 rows. ORDER BY marks DESC is added. How many rows now?",
      "ne": "एउटा क्वेरीले ५ पङ्क्ति दिन्छ। ORDER BY marks DESC थपियो। अब कति पङ्क्ति?"
    },
    "options": [
      {
        "en": "5 — sorting never removes a row",
        "ne": "५ — क्रम मिलाउँदा पङ्क्ति कहिल्यै हट्दैन"
      },
      {
        "en": "Fewer than 5",
        "ne": "५ भन्दा कम"
      },
      {
        "en": "1 — only the highest",
        "ne": "१ — सबैभन्दा माथिको मात्र"
      },
      {
        "en": "It depends on the marks",
        "ne": "अंकमा भर पर्छ"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "ORDER BY only rearranges. Filtering is WHERE's job. The result still has 5 rows, now in a different order.",
      "ne": "ORDER BY ले क्रम मात्र मिलाउँछ। छान्ने काम WHERE को हो। नतिजामा अझै ५ पङ्क्ति छन्, क्रम मात्र फरक।"
    }
  },
  {
    "id": "g10.db.q027",
    "subject": "grade10/dbms",
    "unit": "u4",
    "topic": "joins",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A join of Student and Class returns every student, and a NULL in the room column for one of them. Which join was used?",
      "ne": "Student र Class को join ले हरेक विद्यार्थी दिन्छ, र एक जनाको room स्तम्भमा NULL छ। कुन join प्रयोग भयो?"
    },
    "options": [
      {
        "en": "LEFT OUTER JOIN",
        "ne": "LEFT OUTER JOIN"
      },
      {
        "en": "INNER JOIN",
        "ne": "INNER JOIN"
      },
      {
        "en": "RIGHT OUTER JOIN",
        "ne": "RIGHT OUTER JOIN"
      },
      {
        "en": "NATURAL JOIN",
        "ne": "NATURAL JOIN"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Work backwards from where the NULL is. Every left row survived and the missing value is on the right, so it is a left join. An inner join would have dropped that student entirely.",
      "ne": "NULL कता छ भन्नेबाट उल्टो सोच्नुहोस्। बायाँका सबै पङ्क्ति बाँचे र नभएको मान दायाँ छ, त्यसैले left join। Inner join ले त्यो विद्यार्थीलाई पूरै हटाइदिन्थ्यो।"
    }
  },
  {
    "id": "g10.db.q028",
    "subject": "grade10/dbms",
    "unit": "u4",
    "topic": "joins",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which join keeps ONLY the rows that match on both sides?",
      "ne": "कुन join ले दुवैतर्फ मिल्ने पङ्क्ति मात्र राख्छ?"
    },
    "options": [
      {
        "en": "Inner join",
        "ne": "Inner join"
      },
      {
        "en": "Left outer join",
        "ne": "Left outer join"
      },
      {
        "en": "Right outer join",
        "ne": "Right outer join"
      },
      {
        "en": "Full outer join",
        "ne": "Full outer join"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "All five joins share the same matching test; they differ only in what they do with rows that did not match. Inner throws them away; the outer joins keep one side or both.",
      "ne": "पाँचै join को मिलान जाँच उही हो; फरक केवल नमिलेका पङ्क्तिको के गर्ने भन्नेमा। Inner ले फालिदिन्छ; outer join हरूले एक वा दुवैतर्फ राख्छन्।"
    }
  },
  {
    "id": "g10.db.q029",
    "subject": "grade10/dbms",
    "unit": "u4",
    "topic": "update",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A table has 40 rows. UPDATE Student SET marks = 80; is run, with no WHERE clause. What happens?",
      "ne": "तालिकामा ४० पङ्क्ति छन्। WHERE नराखी UPDATE Student SET marks = 80; चलाइयो। के हुन्छ?"
    },
    "options": [
      {
        "en": "All 40 rows are changed",
        "ne": "सबै ४० पङ्क्ति बदलिन्छन्"
      },
      {
        "en": "An error, because WHERE is required",
        "ne": "त्रुटि, किनभने WHERE अनिवार्य छ"
      },
      {
        "en": "Only the first row is changed",
        "ne": "पहिलो पङ्क्ति मात्र बदलिन्छ"
      },
      {
        "en": "Nothing changes",
        "ne": "केही बदलिँदैन"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "The statement is perfectly legal, so nothing warns you — the WHERE clause is optional, and without it the change applies to every row. This is why the WHERE clause should be written before the SET.",
      "ne": "कथन पूर्णतः वैध हुने भएकाले चेतावनी आउँदैन — WHERE ऐच्छिक हो, र नभए परिवर्तन हरेक पङ्क्तिमा लाग्छ। त्यसैले SET भन्दा पहिले WHERE लेख्ने बानी राख्नुहोस्।"
    }
  },
  {
    "id": "g10.db.q030",
    "subject": "grade10/dbms",
    "unit": "u4",
    "topic": "view",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What is an SQL VIEW?",
      "ne": "SQL VIEW भनेको के हो?"
    },
    "options": [
      {
        "en": "A stored query that behaves like a table but holds no data of its own",
        "ne": "तालिकाजस्तै व्यवहार गर्ने संग्रहित क्वेरी, जसको आफ्नो data हुँदैन"
      },
      {
        "en": "A copy of a table saved on disk",
        "ne": "डिस्कमा राखिएको तालिकाको प्रतिलिपि"
      },
      {
        "en": "A backup of the database",
        "ne": "डाटाबेसको backup"
      },
      {
        "en": "A type of primary key",
        "ne": "Primary key को एक प्रकार"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "A view reads from the real tables every time it is used, so it is always current. Views hide complexity — a long join becomes one name — and restrict access, since a user can be granted the view without the whole table.",
      "ne": "View ले प्रयोग हुँदा हरेक पटक वास्तविक तालिकाबाटै पढ्छ, त्यसैले सधैं ताजा हुन्छ। यसले जटिलता लुकाउँछ र पहुँच सीमित गर्छ — पूरै तालिका नदिई view दिन सकिन्छ।"
    }
  },
  {
    "id": "g10.db.q031",
    "subject": "grade10/dbms",
    "unit": "u4",
    "topic": "dcl",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which statement takes a privilege away from a user?",
      "ne": "कुन कथनले प्रयोगकर्ताबाट अधिकार खोस्छ?"
    },
    "options": [
      {
        "en": "REVOKE",
        "ne": "REVOKE"
      },
      {
        "en": "DELETE",
        "ne": "DELETE"
      },
      {
        "en": "DROP",
        "ne": "DROP"
      },
      {
        "en": "ROLLBACK",
        "ne": "ROLLBACK"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "GRANT gives a privilege and REVOKE takes it back; both are DCL. DELETE removes rows and DROP removes a table — those change data and structure, not permission.",
      "ne": "GRANT ले अधिकार दिन्छ र REVOKE ले फिर्ता लिन्छ; दुवै DCL हुन्। DELETE ले पङ्क्ति र DROP ले तालिका हटाउँछ — ती data र संरचना बदल्छन्, अधिकार होइन।"
    }
  },
  {
    "id": "g10.db.q032",
    "subject": "grade10/dbms",
    "unit": "u4",
    "topic": "sql-syntax",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which condition correctly selects students named Ram?",
      "ne": "राम नाम गरेका विद्यार्थी छान्न कुन सर्त सही छ?"
    },
    "options": [
      {
        "en": "WHERE name = 'Ram'",
        "ne": "WHERE name = 'Ram'"
      },
      {
        "en": "WHERE name = Ram",
        "ne": "WHERE name = Ram"
      },
      {
        "en": "WHERE name == Ram",
        "ne": "WHERE name == Ram"
      },
      {
        "en": "WHERE name IS Ram",
        "ne": "WHERE name IS Ram"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Text values need single quotes. Without them the database looks for a COLUMN called Ram and reports that no such column exists. SQL uses a single = for comparison, not ==.",
      "ne": "पाठ मानलाई एकल उद्धरण चिन्ह चाहिन्छ। नभए डाटाबेसले Ram नामको स्तम्भ खोज्छ र त्यस्तो स्तम्भ छैन भन्छ। SQL मा तुलनाका लागि एउटै = हुन्छ, == होइन।"
    }
  },
  {
    "id": "g10.db.q033",
    "subject": "grade10/dbms",
    "unit": "u5",
    "topic": "normalization-purpose",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Why is normalization performed?",
      "ne": "Normalization किन गरिन्छ?"
    },
    "options": [
      {
        "en": "To remove insertion, deletion and update anomalies",
        "ne": "Insertion, deletion र update anomaly हटाउन"
      },
      {
        "en": "To make queries run faster",
        "ne": "क्वेरी छिटो चलाउन"
      },
      {
        "en": "To save disk space, which is its main purpose",
        "ne": "डिस्क ठाउँ बचाउन — यही मुख्य उद्देश्य हो"
      },
      {
        "en": "To encrypt the data",
        "ne": "Data encrypt गर्न"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Normalization removes the three anomalies caused by repeating a fact in many rows. Less space is a side effect, and queries often get slower, not faster, because more joins are needed.",
      "ne": "Normalization ले उही तथ्य धेरै पङ्क्तिमा दोहोरिँदा आउने तीन anomaly हटाउँछ। कम ठाउँ सहायक असर हो, र join बढ्ने भएकाले क्वेरी प्रायः छिटो होइन, ढिलो हुन्छ।"
    }
  },
  {
    "id": "g10.db.q034",
    "subject": "grade10/dbms",
    "unit": "u5",
    "topic": "1nf",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A cell holds the value \"Maths, Science\". Which normal form does this break?",
      "ne": "एउटा कक्षमा \"Maths, Science\" छ। यसले कुन normal form तोड्छ?"
    },
    "options": [
      {
        "en": "1NF",
        "ne": "1NF"
      },
      {
        "en": "2NF",
        "ne": "2NF"
      },
      {
        "en": "3NF",
        "ne": "3NF"
      },
      {
        "en": "None — it is allowed",
        "ne": "कुनै पनि होइन — यो मिल्छ"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "1NF requires every cell to hold a single atomic value. Two subjects in one cell is a repeating group, and splitting it into separate rows is the first step of normalising.",
      "ne": "1NF ले हरेक कक्षमा एउटै अविभाज्य मान माग्छ। एउटै कक्षमा दुई विषय दोहोरिने समूह हो, र यसलाई छुट्टै पङ्क्तिमा बाँड्नु normalise गर्ने पहिलो चरण हो।"
    }
  },
  {
    "id": "g10.db.q035",
    "subject": "grade10/dbms",
    "unit": "u5",
    "topic": "2nf",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A table has the composite key (student_id, subject) and holds the student's name, which depends on student_id alone. What is this called?",
      "ne": "एउटा तालिकाको composite कुञ्जी (student_id, subject) छ र त्यसमा विद्यार्थीको नाम छ, जुन student_id मा मात्र निर्भर छ। यसलाई के भनिन्छ?"
    },
    "options": [
      {
        "en": "A partial dependency",
        "ne": "Partial dependency"
      },
      {
        "en": "A transitive dependency",
        "ne": "Transitive dependency"
      },
      {
        "en": "A full dependency",
        "ne": "Full dependency"
      },
      {
        "en": "A referential dependency",
        "ne": "Referential dependency"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "The key is both columns together, but name depends on only part of it. That is a partial dependency, and removing it is exactly what 2NF does. It can only happen when the key is composite.",
      "ne": "कुञ्जी दुवै स्तम्भ मिलेर हो, तर name त्यसको एक भागमा मात्र निर्भर छ। यही partial dependency हो, र 2NF ले हटाउने पनि यही। कुञ्जी composite भएमा मात्र यो सम्भव हुन्छ।"
    }
  },
  {
    "id": "g10.db.q036",
    "subject": "grade10/dbms",
    "unit": "u5",
    "topic": "3nf",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "In Student(roll, name, class_id, class_room), class_room depends on class_id, which depends on roll. Which normal form does this break?",
      "ne": "Student(roll, name, class_id, class_room) मा class_room, class_id मा निर्भर छ र class_id, roll मा। यसले कुन normal form तोड्छ?"
    },
    "options": [
      {
        "en": "3NF — it is a transitive dependency",
        "ne": "3NF — यो transitive dependency हो"
      },
      {
        "en": "1NF — the values are not atomic",
        "ne": "1NF — मान अविभाज्य छैनन्"
      },
      {
        "en": "2NF — it is a partial dependency",
        "ne": "2NF — यो partial dependency हो"
      },
      {
        "en": "None of them",
        "ne": "कुनै पनि होइन"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "A non-key column depending on another non-key column is a transitive dependency, and 3NF forbids it. The fix is to move class_id and class_room into a Class table of their own.",
      "ne": "कुञ्जी नभएको स्तम्भ अर्को कुञ्जी नभएको स्तम्भमा निर्भर हुनु transitive dependency हो, र 3NF ले यसलाई निषेध गर्छ। समाधान: class_id र class_room लाई छुट्टै Class तालिकामा सार्ने।"
    }
  },
  {
    "id": "g10.db.q037",
    "subject": "grade10/dbms",
    "unit": "u5",
    "topic": "functional-dependency",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What does A → B mean?",
      "ne": "A → B को अर्थ के हो?"
    },
    "options": [
      {
        "en": "Each value of A determines exactly one value of B",
        "ne": "A को हरेक मानले B को ठ्याक्कै एउटा मान तय गर्छ"
      },
      {
        "en": "A and B are always equal",
        "ne": "A र B सधैं बराबर हुन्छन्"
      },
      {
        "en": "B is the primary key of A",
        "ne": "B, A को primary key हो"
      },
      {
        "en": "A points at B as a foreign key",
        "ne": "A ले B लाई foreign key का रूपमा देखाउँछ"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Read it as \"A determines B\". student_id → name holds, because one id gives one name. The reverse usually does not: two students may share a name.",
      "ne": "\"A ले B तय गर्छ\" भनेर पढ्नुहोस्। student_id → name मिल्छ, किनभने एउटा id ले एउटै नाम दिन्छ। उल्टो प्रायः मिल्दैन: दुई विद्यार्थीको नाम उही हुन सक्छ।"
    }
  },
  {
    "id": "g10.db.q038",
    "subject": "grade10/dbms",
    "unit": "u5",
    "topic": "anomalies",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A class's room number is stored on every student row. The last student in that class is deleted, and the room number is lost. What is this called?",
      "ne": "कक्षाको कोठा नम्बर हरेक विद्यार्थीको पङ्क्तिमा छ। त्यस कक्षाको अन्तिम विद्यार्थी हटाइयो र कोठा नम्बर हरायो। यसलाई के भनिन्छ?"
    },
    "options": [
      {
        "en": "A deletion anomaly",
        "ne": "Deletion anomaly"
      },
      {
        "en": "An update anomaly",
        "ne": "Update anomaly"
      },
      {
        "en": "An insertion anomaly",
        "ne": "Insertion anomaly"
      },
      {
        "en": "A referential anomaly",
        "ne": "Referential anomaly"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Deleting one thing has destroyed an unrelated fact — the room still exists, but the database no longer knows about it. That is a deletion anomaly, and normalising into a separate Class table prevents it.",
      "ne": "एउटा कुरा हटाउँदा असम्बन्धित तथ्य नष्ट भयो — कोठा अझै छ, तर डाटाबेसलाई थाहा छैन। यही deletion anomaly हो, र छुट्टै Class तालिका बनाए रोकिन्छ।"
    }
  },
  {
    "id": "g10.db.q039",
    "subject": "grade10/dbms",
    "unit": "u6",
    "topic": "transaction-definition",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What is a transaction?",
      "ne": "ट्रान्ज्याक्सन के हो?"
    },
    "options": [
      {
        "en": "A logical unit of work that must be done completely or not at all",
        "ne": "एउटा तार्किक काम, जुन पूरै हुनुपर्छ वा बिल्कुल हुनुहुँदैन"
      },
      {
        "en": "A single SQL statement",
        "ne": "एउटा मात्र SQL कथन"
      },
      {
        "en": "A backup of the database",
        "ne": "डाटाबेसको backup"
      },
      {
        "en": "A connection between two tables",
        "ne": "दुई तालिकाबीचको जोडाइ"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "A transaction is usually several statements, not one. What makes it a transaction is the all-or-nothing promise: a bank transfer is a debit and a credit, and neither may happen alone.",
      "ne": "ट्रान्ज्याक्सनमा प्रायः धेरै कथन हुन्छन्, एउटा होइन। यसलाई ट्रान्ज्याक्सन बनाउने कुरा \"पूरै वा बिल्कुल होइन\" भन्ने वचन हो।"
    }
  },
  {
    "id": "g10.db.q040",
    "subject": "grade10/dbms",
    "unit": "u6",
    "topic": "acid",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which ACID property guarantees that a committed transaction survives a power failure?",
      "ne": "Commit भइसकेको ट्रान्ज्याक्सन बिजुली गएपछि पनि रहन्छ भन्ने कुन ACID गुणले सुनिश्चित गर्छ?"
    },
    "options": [
      {
        "en": "Durability",
        "ne": "Durability"
      },
      {
        "en": "Atomicity",
        "ne": "Atomicity"
      },
      {
        "en": "Isolation",
        "ne": "Isolation"
      },
      {
        "en": "Consistency",
        "ne": "Consistency"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Durability protects work that has committed. Atomicity is the opposite promise — it undoes work that had NOT committed. The test is always whether a COMMIT happened.",
      "ne": "Durability ले commit भइसकेको काम जोगाउँछ। Atomicity उल्टो वचन हो — commit नभएको काम फिर्ता लैजान्छ। जाँच सधैं COMMIT भयो कि भएन भन्ने हो।"
    }
  },
  {
    "id": "g10.db.q041",
    "subject": "grade10/dbms",
    "unit": "u6",
    "topic": "acid",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A transfer debits Ram but crashes before crediting Sita. The transaction had not committed. What does the database do on restart?",
      "ne": "रकम सार्दा रामको खाताबाट कटियो तर सीतालाई जम्मा हुनुअघि crash भयो। ट्रान्ज्याक्सन commit भएको थिएन। पुनः सुरु हुँदा डाटाबेसले के गर्छ?"
    },
    "options": [
      {
        "en": "Rolls the debit back, so Ram's balance is unchanged",
        "ne": "कटौती फिर्ता लैजान्छ, रामको मौज्दात उस्तै रहन्छ"
      },
      {
        "en": "Completes the transfer automatically",
        "ne": "रकम सार्ने काम आफैं पूरा गर्छ"
      },
      {
        "en": "Leaves the debit in place and reports an error",
        "ne": "कटौती त्यसै छाडेर त्रुटि देखाउँछ"
      },
      {
        "en": "Deletes both accounts",
        "ne": "दुवै खाता हटाउँछ"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "With no COMMIT record in the log, recovery undoes everything the transaction did. That is atomicity: half a transfer may not survive. Had it committed, redo would have re-applied it instead.",
      "ne": "Log मा COMMIT रेकर्ड नभएकाले recovery ले ट्रान्ज्याक्सनले गरेका सबै काम उल्टाउँछ। यही atomicity हो: आधा रकम सारेको बाँच्न पाउँदैन। Commit भएको भए redo ले फेरि लागू गर्थ्यो।"
    }
  },
  {
    "id": "g10.db.q042",
    "subject": "grade10/dbms",
    "unit": "u6",
    "topic": "transaction-states",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which are the two FINAL states of a transaction?",
      "ne": "ट्रान्ज्याक्सनका दुई अन्तिम अवस्था कुन हुन्?"
    },
    "options": [
      {
        "en": "Committed and aborted",
        "ne": "Committed र aborted"
      },
      {
        "en": "Active and failed",
        "ne": "Active र failed"
      },
      {
        "en": "Partially committed and committed",
        "ne": "Partially committed र committed"
      },
      {
        "en": "Failed and partially committed",
        "ne": "Failed र partially committed"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Every transaction ends in exactly one of these two. Active, partially committed and failed are all states it passes through on the way.",
      "ne": "हरेक ट्रान्ज्याक्सन यी दुईमध्ये ठ्याक्कै एउटामा टुङ्गिन्छ। Active, partially committed र failed बाटोमा पर्ने अवस्था हुन्।"
    }
  },
  {
    "id": "g10.db.q043",
    "subject": "grade10/dbms",
    "unit": "u6",
    "topic": "concurrency",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Two clerks read a balance of 5000. One writes 4000, then the other writes 3000 using the value it read first. What problem is this?",
      "ne": "दुई कर्मचारीले ५००० मौज्दात पढे। एउटाले ४००० लेख्यो, अनि अर्कोले पहिले पढेको मानबाट ३००० लेख्यो। यो कुन समस्या हो?"
    },
    "options": [
      {
        "en": "The lost update problem",
        "ne": "Lost update समस्या"
      },
      {
        "en": "A deletion anomaly",
        "ne": "Deletion anomaly"
      },
      {
        "en": "A partial dependency",
        "ne": "Partial dependency"
      },
      {
        "en": "A referential integrity violation",
        "ne": "Referential integrity उल्लङ्घन"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "The first withdrawal has vanished. Neither clerk did anything wrong — each did correct arithmetic on a value that was correct when read. The fault is uncontrolled interleaving, which locks prevent.",
      "ne": "पहिलो निकासी हरायो। कसैले गलत गरेको होइन — दुवैले पढ्दाको सही मानमा सही गणित गरे। दोष अनियन्त्रित क्रम मिसिनुमा छ, जसलाई lock ले रोक्छ।"
    }
  },
  {
    "id": "g10.db.q044",
    "subject": "grade10/dbms",
    "unit": "u6",
    "topic": "commit-rollback",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What does ROLLBACK do?",
      "ne": "ROLLBACK ले के गर्छ?"
    },
    "options": [
      {
        "en": "Undoes every change the transaction made",
        "ne": "ट्रान्ज्याक्सनले गरेका सबै परिवर्तन फिर्ता लैजान्छ"
      },
      {
        "en": "Makes the changes permanent",
        "ne": "परिवर्तनलाई स्थायी बनाउँछ"
      },
      {
        "en": "Deletes the table",
        "ne": "तालिका हटाउँछ"
      },
      {
        "en": "Takes a backup",
        "ne": "Backup लिन्छ"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "ROLLBACK returns the database to the state it was in before the transaction began. COMMIT is the opposite — it makes the changes permanent. Exactly one of the two ends a transaction.",
      "ne": "ROLLBACK ले डाटाबेसलाई ट्रान्ज्याक्सन सुरु हुनुअघिकै अवस्थामा फर्काउँछ। COMMIT उल्टो हो — परिवर्तनलाई स्थायी बनाउँछ। ट्रान्ज्याक्सन यीमध्ये एउटाले टुङ्गिन्छ।"
    }
  },
  {
    "id": "g10.db.q045",
    "subject": "grade10/dbms",
    "unit": "u7",
    "topic": "backup-types",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A backup consists of the SQL statements needed to rebuild the database. What type is it?",
      "ne": "कुनै backup मा डाटाबेस पुनर्निर्माण गर्ने SQL कथनहरू छन्। यो कुन प्रकारको हो?"
    },
    "options": [
      {
        "en": "Logical backup",
        "ne": "Logical backup"
      },
      {
        "en": "Physical backup",
        "ne": "Physical backup"
      },
      {
        "en": "Incremental backup",
        "ne": "Incremental backup"
      },
      {
        "en": "Differential backup",
        "ne": "Differential backup"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "A logical backup stores the SQL that would recreate the data, so it is readable and can be restored onto a different system. A physical backup copies the database files themselves.",
      "ne": "Logical backup ले data पुनः बनाउने SQL राख्छ, त्यसैले पढ्न मिल्छ र फरक प्रणालीमा पनि फर्काउन सकिन्छ। Physical backup ले डाटाबेस फाइल नै प्रतिलिपि गर्छ।"
    }
  },
  {
    "id": "g10.db.q046",
    "subject": "grade10/dbms",
    "unit": "u7",
    "topic": "backup-methods",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A full backup runs Sunday, and INCREMENTAL backups run Monday to Friday. The disk fails on Friday night. What is needed to restore?",
      "ne": "आइतबार full backup, र सोमदेखि शुक्रसम्म INCREMENTAL backup चल्छ। शुक्रबार राति डिस्क बिग्रियो। फर्काउन के चाहिन्छ?"
    },
    "options": [
      {
        "en": "The full backup plus every incremental, in order",
        "ne": "Full backup र सबै incremental, क्रमैसँग"
      },
      {
        "en": "The full backup plus Friday's incremental only",
        "ne": "Full backup र शुक्रबारको incremental मात्र"
      },
      {
        "en": "Friday's incremental only",
        "ne": "शुक्रबारको incremental मात्र"
      },
      {
        "en": "The full backup only",
        "ne": "Full backup मात्र"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "An incremental backup holds only what changed since the LAST backup, so each day's changes exist in exactly one file and all are needed. A differential holds everything since the last FULL backup, so only the newest one would be required.",
      "ne": "Incremental ले अघिल्लो backup देखिको परिवर्तन मात्र राख्छ, त्यसैले हरेक दिनको परिवर्तन एउटै फाइलमा हुन्छ र सबै चाहिन्छ। Differential ले अघिल्लो FULL देखिका सबै राख्छ, त्यसैले पछिल्लो एउटै पुग्थ्यो।"
    }
  },
  {
    "id": "g10.db.q047",
    "subject": "grade10/dbms",
    "unit": "u7",
    "topic": "recovery",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "After a crash, the log shows T1 with a COMMIT record and T2 without one. What does recovery do?",
      "ne": "Crash पछि log मा T1 सँग COMMIT रेकर्ड छ र T2 सँग छैन। Recovery ले के गर्छ?"
    },
    "options": [
      {
        "en": "REDO T1 and UNDO T2",
        "ne": "T1 लाई REDO र T2 लाई UNDO"
      },
      {
        "en": "UNDO T1 and REDO T2",
        "ne": "T1 लाई UNDO र T2 लाई REDO"
      },
      {
        "en": "REDO both",
        "ne": "दुवैलाई REDO"
      },
      {
        "en": "UNDO both",
        "ne": "दुवैलाई UNDO"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "The COMMIT record is the only test. A committed transaction is redone so its work exists — durability. An uncommitted one is undone so no half-finished work survives — atomicity.",
      "ne": "COMMIT रेकर्ड नै एउटै जाँच हो। Commit भएकोलाई redo गरिन्छ ताकि काम रहोस् — durability। नभएकोलाई undo गरिन्छ ताकि आधा काम नबाँचोस् — atomicity।"
    }
  },
  {
    "id": "g10.db.q048",
    "subject": "grade10/dbms",
    "unit": "u7",
    "topic": "security",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A user logs in successfully but is refused permission to change marks. Which is at work?",
      "ne": "प्रयोगकर्ता सफलतापूर्वक लगइन गरे तर अंक बदल्ने अनुमति पाएनन्। यहाँ के लागू भइरहेको छ?"
    },
    "options": [
      {
        "en": "Authorisation",
        "ne": "Authorisation"
      },
      {
        "en": "Authentication",
        "ne": "Authentication"
      },
      {
        "en": "Encryption",
        "ne": "Encryption"
      },
      {
        "en": "Recovery",
        "ne": "Recovery"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Authentication proved WHO they are — the login succeeded. Authorisation decides WHAT they may do, and it is what refused the change. GRANT and REVOKE control it.",
      "ne": "Authentication ले उनी को हुन् भन्ने प्रमाणित गर्‍यो — लगइन सफल भयो। Authorisation ले के गर्न पाउने भन्ने तय गर्छ, र यसैले रोक्यो। GRANT र REVOKE ले नियन्त्रण गर्छन्।"
    }
  },
  {
    "id": "g10.db.q049",
    "subject": "grade10/dbms",
    "unit": "u7",
    "topic": "security-threats",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A user types SQL into a login box and the program runs it, exposing the whole table. What is this threat called?",
      "ne": "प्रयोगकर्ताले लगइन बाकसमा SQL टाइप गर्दा प्रोग्रामले चलाइदियो र पूरै तालिका देखियो। यो खतरालाई के भनिन्छ?"
    },
    "options": [
      {
        "en": "SQL injection",
        "ne": "SQL injection"
      },
      {
        "en": "A lost update",
        "ne": "Lost update"
      },
      {
        "en": "A deletion anomaly",
        "ne": "Deletion anomaly"
      },
      {
        "en": "Privilege abuse",
        "ne": "अधिकारको दुरुपयोग"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "SQL injection happens when user input is treated as SQL instead of as data. Privilege abuse is different — that is a legitimate user doing more than their job requires.",
      "ne": "प्रयोगकर्ताले लेखेको कुरालाई data होइन SQL मानेर चलाउँदा SQL injection हुन्छ। अधिकारको दुरुपयोग फरक हो — त्यो वैध प्रयोगकर्ताले काम भन्दा बढी गर्नु हो।"
    }
  },
  {
    "id": "g10.db.q050",
    "subject": "grade10/dbms",
    "unit": "u7",
    "topic": "backup-vs-recovery",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which statement is correct?",
      "ne": "कुन भनाइ सही हो?"
    },
    "options": [
      {
        "en": "Backup is the copy taken in advance; recovery is the process of using it after a failure",
        "ne": "Backup पहिले लिइने प्रतिलिपि हो; recovery असफलतापछि त्यो प्रयोग गर्ने प्रक्रिया"
      },
      {
        "en": "Backup and recovery are two names for the same process",
        "ne": "Backup र recovery एउटै प्रक्रियाका दुई नाम हुन्"
      },
      {
        "en": "Recovery is taken every night; backup runs after a crash",
        "ne": "Recovery हरेक रात लिइन्छ; backup crash पछि चल्छ"
      },
      {
        "en": "Backup is only needed if there is no log",
        "ne": "Log नभएमा मात्र backup चाहिन्छ"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "They are separate: the backup is prepared before anything goes wrong, and recovery is the process — using the backup and the log — that puts the database back into a consistent state afterwards.",
      "ne": "यी फरक हुन्: केही बिग्रनुअघि backup तयार गरिन्छ, र recovery भनेको त्यसपछि backup र log प्रयोग गरेर डाटाबेसलाई सङ्गत अवस्थामा फर्काउने प्रक्रिया हो।"
    }
  },
  {
    "id": "g10.db.q051",
    "subject": "grade10/dbms",
    "unit": "u7",
    "topic": "failure-reasons",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which of these is a HUMAN cause of database failure?",
      "ne": "यीमध्ये कुन डाटाबेस बिग्रनुको मानवीय कारण हो?"
    },
    "options": [
      {
        "en": "Running DELETE without a WHERE clause",
        "ne": "WHERE नराखी DELETE चलाउनु"
      },
      {
        "en": "A disk head crash",
        "ne": "डिस्क बिग्रनु"
      },
      {
        "en": "A power cut",
        "ne": "बिजुली जानु"
      },
      {
        "en": "An earthquake",
        "ne": "भूकम्प"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "A missing WHERE clause is human error, and it is one of the commonest causes of real data loss — precisely because the statement is legal and nothing warns you.",
      "ne": "WHERE छुटाउनु मानवीय गल्ती हो, र वास्तविक data हराउने सबैभन्दा सामान्य कारणमध्ये एक — किनभने कथन वैध हुन्छ र कुनै चेतावनी आउँदैन।"
    }
  },
  {
    "id": "g10.db.q052",
    "subject": "grade10/dbms",
    "unit": "u7",
    "topic": "encryption",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What does encryption protect against that a password does not?",
      "ne": "पासवर्डले नजोगाउने कुन कुराबाट encryption ले जोगाउँछ?"
    },
    "options": [
      {
        "en": "Someone who obtains the database file itself",
        "ne": "डाटाबेस फाइल नै हात पारेको व्यक्तिबाट"
      },
      {
        "en": "A user who forgets their password",
        "ne": "पासवर्ड बिर्सने प्रयोगकर्ताबाट"
      },
      {
        "en": "A power failure",
        "ne": "बिजुली जानुबाट"
      },
      {
        "en": "A disk crash",
        "ne": "डिस्क बिग्रनुबाट"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "A password stops someone logging in. It does nothing once the file has been copied — a stolen backup can simply be opened. Encryption makes the contents unreadable without the key, which is why unencrypted backups are a listed threat.",
      "ne": "पासवर्डले लगइन रोक्छ। फाइल नै प्रतिलिपि भइसकेपछि केही गर्दैन — चोरिएको backup खोल्न सकिन्छ। Encryption ले कुञ्जीविना सामग्री पढ्न नमिल्ने बनाउँछ, त्यसैले encrypt नगरिएको backup खतराको सूचीमा छ।"
    }
  }
]);

QuizService.registerBank("grade10/hardware", [
  {
    "id": "g10.hw.q001",
    "subject": "grade10/hardware",
    "unit": "u1",
    "topic": "matter-atom",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which subatomic particle carries a positive charge?",
      "ne": "कुन उप-आणविक कणले धनात्मक चार्ज बोक्छ?"
    },
    "options": [
      {
        "en": "Electron",
        "ne": "Electron"
      },
      {
        "en": "Proton",
        "ne": "Proton"
      },
      {
        "en": "Neutron",
        "ne": "Neutron"
      },
      {
        "en": "Molecule",
        "ne": "Molecule"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The proton is positive and sits in the nucleus. The neutron is also in the nucleus but has no charge; the electron is negative and orbits in shells. A molecule is not a subatomic particle at all — it is made of atoms.",
      "ne": "Proton धनात्मक हुन्छ र nucleus मा बस्छ। Neutron पनि nucleus मै हुन्छ तर चार्ज हुँदैन; electron ऋणात्मक हुन्छ र शेलमा घुम्छ। Molecule उप-आणविक कण नै होइन — यो atom हरूबाट बनेको हुन्छ।"
    }
  },
  {
    "id": "g10.hw.q002",
    "subject": "grade10/hardware",
    "unit": "u1",
    "topic": "kirchhoff",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "At a junction, currents of 6 A and 2 A flow in, and 3 A flows out on one branch. What flows out on the remaining branch?",
      "ne": "एउटा जोडमा ६ A र २ A भित्र आउँछन्, र एउटा शाखाबाट ३ A बाहिर जान्छ। बाँकी शाखाबाट कति बाहिर जान्छ?"
    },
    "options": [
      {
        "en": "5 A",
        "ne": "५ A"
      },
      {
        "en": "11 A",
        "ne": "११ A"
      },
      {
        "en": "3 A",
        "ne": "३ A"
      },
      {
        "en": "1 A",
        "ne": "१ A"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "KCL: total in equals total out. In = 6 + 2 = 8 A. Known out = 3 A, so the remaining branch carries 8 − 3 = 5 A. Choosing 11 A means the 3 A was added instead of subtracted — a sign error, not a knowledge gap.",
      "ne": "KCL: भित्र आउने कुल र बाहिर जाने कुल बराबर। भित्र = ६ + २ = ८ A। थाहा भएको बाहिर = ३ A, त्यसैले बाँकी शाखाले ८ − ३ = ५ A बोक्छ। ११ A छान्नु भनेको ३ A घटाउनुको साटो जोडिनु — ज्ञानको कमी होइन, चिन्हको गल्ती।"
    }
  },
  {
    "id": "g10.hw.q003",
    "subject": "grade10/hardware",
    "unit": "u1",
    "topic": "doping",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Silicon is doped with a trivalent impurity such as boron. What is produced?",
      "ne": "Silicon मा boron जस्तो trivalent अशुद्धि मिसाइयो। के बन्छ?"
    },
    "options": [
      {
        "en": "N-type, with electrons as the majority carrier",
        "ne": "N-type, electron बहुसंख्यक वाहक भएको"
      },
      {
        "en": "P-type, with holes as the majority carrier",
        "ne": "P-type, hole बहुसंख्यक वाहक भएको"
      },
      {
        "en": "P-type, which carries a negative charge",
        "ne": "P-type, जसमा ऋणात्मक चार्ज हुन्छ"
      },
      {
        "en": "Pure silicon with better conductivity",
        "ne": "शुद्ध silicon, राम्रो चालकता भएको"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Trivalent means three valence electrons, so one of silicon's four bonds is left unfilled — that gap is a hole, and holes dominating makes it P-type. Option 3 is the trap: P-type is NOT charged. Doping adds a carrier, not a charge, because the impurity atom brings its own protons.",
      "ne": "Trivalent भनेको तीन valence electron, त्यसैले silicon का चारमध्ये एउटा बन्धन खाली रहन्छ — त्यो खाली ठाउँ hole हो, र hole हावी हुँदा P-type बन्छ। तेस्रो विकल्प पासो हो: P-type मा चार्ज हुँदैन। Doping ले वाहक थप्छ, चार्ज होइन — किनकि अशुद्धिको atom आफ्नै proton सहित आउँछ।"
    }
  },
  {
    "id": "g10.hw.q004",
    "subject": "grade10/hardware",
    "unit": "u1",
    "topic": "pn-junction",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A silicon diode is connected in reverse bias. What happens?",
      "ne": "एउटा silicon diode reverse bias मा जोडियो। के हुन्छ?"
    },
    "options": [
      {
        "en": "The depletion region narrows and current flows freely",
        "ne": "Depletion region साँघुरो हुन्छ र current स्वतन्त्र बग्छ"
      },
      {
        "en": "The depletion region widens and only a small leakage current flows",
        "ne": "Depletion region चौडा हुन्छ र सानो leakage current मात्र बग्छ"
      },
      {
        "en": "The depletion region disappears completely",
        "ne": "Depletion region पूरै हराउँछ"
      },
      {
        "en": "The diode is destroyed immediately",
        "ne": "Diode तुरुन्तै नष्ट हुन्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Reverse bias pulls carriers away from the junction, so the region empty of carriers grows wider and the barrier increases. Note the wording: a small leakage current, carried by the minority carriers, does still flow — writing \"no current at all\" loses the mark that \"negligible leakage current\" earns.",
      "ne": "Reverse bias ले वाहकलाई जोडबाट टाढा तान्छ, त्यसैले वाहकविहीन क्षेत्र चौडा हुन्छ र barrier बढ्छ। शब्द ध्यान दिनुहोस्: अल्पसंख्यक वाहकले बोक्ने सानो leakage current भने बग्छ — \"बिल्कुलै current छैन\" लेख्दा अंक गुम्छ, \"नगण्य leakage current\" ले पाउँछ।"
    }
  },
  {
    "id": "g10.hw.q005",
    "subject": "grade10/hardware",
    "unit": "u2",
    "topic": "cpu-units",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which unit performs the comparison in the instruction \"IF marks > 40\"?",
      "ne": "\"IF marks > 40\" निर्देशनमा तुलना कुन एकाइले गर्छ?"
    },
    "options": [
      {
        "en": "The control unit",
        "ne": "Control unit"
      },
      {
        "en": "The ALU",
        "ne": "ALU"
      },
      {
        "en": "The memory unit",
        "ne": "Memory unit"
      },
      {
        "en": "The input unit",
        "ne": "Input unit"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A comparison is a LOGICAL operation, and every logical and arithmetic operation happens in the ALU. The control unit fetched and decoded the instruction and will act on the result, but it does not do the comparing itself. This is the most confused pair in the unit.",
      "ne": "तुलना <b>तार्किक</b> काम हो, र हरेक तार्किक तथा अंकगणितीय काम ALU मा हुन्छ। Control unit ले निर्देशन ल्यायो, बुझ्यो र नतिजामा काम गर्नेछ, तर तुलना आफैँ गर्दैन। यस युनिटमा सबैभन्दा बढी मिसिने जोडी यही हो।"
    }
  },
  {
    "id": "g10.hw.q006",
    "subject": "grade10/hardware",
    "unit": "u2",
    "topic": "input-devices",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "You scan a printed page. What do you have immediately afterwards?",
      "ne": "तपाईंले छापिएको पाना स्क्यान गर्नुभयो। लगत्तै तपाईंसँग के हुन्छ?"
    },
    "options": [
      {
        "en": "Editable text",
        "ne": "सम्पादन गर्न मिल्ने अक्षर"
      },
      {
        "en": "An image of the page",
        "ne": "पानाको चित्र"
      },
      {
        "en": "A printed copy",
        "ne": "छापिएको प्रतिलिपि"
      },
      {
        "en": "A compressed archive",
        "ne": "Compress गरिएको archive"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A scanner measures reflected light and produces a picture. The letters in it are dark pixels, not characters. OCR software must analyse that image before anything becomes editable text — which is why \"scan then edit\" always has a step in between.",
      "ne": "Scanner ले परावर्तित बत्ती नाप्छ र तस्बिर बनाउँछ। त्यसका अक्षर कालो पिक्सेल हुन्, अक्षर होइनन्। सम्पादन गर्न मिल्ने अक्षर बन्नुअघि OCR सफ्टवेयरले त्यो चित्र विश्लेषण गर्नैपर्छ — त्यसैले \"स्क्यान गरेर सम्पादन\" बीचमा सधैं एउटा चरण हुन्छ।"
    }
  },
  {
    "id": "g10.hw.q007",
    "subject": "grade10/hardware",
    "unit": "u2",
    "topic": "display",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A user says the screen flickers and their eyes hurt after an hour. Which setting should you change?",
      "ne": "प्रयोगकर्ताले स्क्रिन झिमझिम गर्छ र एक घण्टापछि आँखा दुख्छ भन्छ। कुन सेटिङ बदल्नुपर्छ?"
    },
    "options": [
      {
        "en": "Colour depth",
        "ne": "Colour depth"
      },
      {
        "en": "Resolution",
        "ne": "Resolution"
      },
      {
        "en": "Refresh rate",
        "ne": "Refresh rate"
      },
      {
        "en": "Brightness only",
        "ne": "Brightness मात्र"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "Flicker is the screen being redrawn too few times per second for the eye to blend the frames, which is exactly what refresh rate measures. Raise it to the highest the monitor supports. Resolution changes sharpness, not flicker; colour depth changes the number of shades.",
      "ne": "झिमझिम भनेको स्क्रिन सेकेन्डमा यति थोरै पटक कोरिनु कि आँखाले फ्रेम जोड्न नसक्नु — refresh rate ले नाप्ने ठ्याक्कै त्यही हो। Monitor ले सक्ने सबैभन्दा माथि बढाउनुहोस्। Resolution ले तीक्ष्णता बदल्छ, झिमझिम होइन; colour depth ले रङको सङ्ख्या।"
    }
  },
  {
    "id": "g10.hw.q008",
    "subject": "grade10/hardware",
    "unit": "u2",
    "topic": "display",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What is the essential difference between an LCD and an LED monitor?",
      "ne": "LCD र LED monitor बीचको मुख्य फरक के हो?"
    },
    "options": [
      {
        "en": "LED uses no liquid crystals at all",
        "ne": "LED मा liquid crystal हुँदै हुँदैन"
      },
      {
        "en": "They differ only in the backlight used",
        "ne": "फरक केवल प्रयोग गरिने backlight मा हो"
      },
      {
        "en": "LED fires electrons at a phosphor screen",
        "ne": "LED ले phosphor स्क्रिनमा electron हान्छ"
      },
      {
        "en": "LCD is thinner and uses less power",
        "ne": "LCD पातलो हुन्छ र कम बिजुली खान्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "An LED monitor IS an LCD — the same liquid crystals block or pass light. What changed is the light source behind them: LEDs instead of a CCFL lamp, which makes it thinner, gives better contrast and uses less power. Option 3 describes a CRT.",
      "ne": "LED monitor भनेकै LCD हो — उही liquid crystal ले बत्ती छेक्छ वा पास गर्छ। फरक तिनको पछाडिको बत्तीको स्रोतमा हो: CCFL लैम्पको साटो LED, जसले पातलो बनाउँछ, राम्रो contrast दिन्छ र कम बिजुली खान्छ। तेस्रो विकल्पले CRT वर्णन गर्छ।"
    }
  },
  {
    "id": "g10.hw.q009",
    "subject": "grade10/hardware",
    "unit": "u3",
    "topic": "bios",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Where is the BIOS stored?",
      "ne": "BIOS कहाँ राखिएको हुन्छ?"
    },
    "options": [
      {
        "en": "On the hard disk with the operating system",
        "ne": "अपरेटिङ सिस्टमसँगै hard disk मा"
      },
      {
        "en": "On a chip on the motherboard",
        "ne": "मदरबोर्डको चिपमा"
      },
      {
        "en": "In RAM",
        "ne": "RAM मा"
      },
      {
        "en": "On the processor itself",
        "ne": "प्रोसेसर आफैँमा"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The BIOS is firmware on a motherboard chip. It has to run before any disk is read — it is what finds and loads the operating system — so it cannot be stored on the disk. RAM is wrong because RAM is empty at power-on.",
      "ne": "BIOS मदरबोर्डको चिपमा रहेको firmware हो। कुनै disk पढिनुअघि नै यो चल्नुपर्छ — अपरेटिङ सिस्टम खोजेर लोड गर्ने यही हो — त्यसैले disk मा हुनै सक्दैन। RAM गलत हो किनकि बिजुली लाग्दा RAM खाली हुन्छ।"
    }
  },
  {
    "id": "g10.hw.q010",
    "subject": "grade10/hardware",
    "unit": "u3",
    "topic": "bios",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A computer shows the wrong date at every start-up and BIOS settings return to default. What should you replace?",
      "ne": "कम्प्युटरले हरेक पटक सुरु हुँदा गलत मिति देखाउँछ र BIOS सेटिङ पूर्वनिर्धारितमा फर्किन्छ। के साट्नुपर्छ?"
    },
    "options": [
      {
        "en": "The hard disk",
        "ne": "Hard disk"
      },
      {
        "en": "The CMOS battery",
        "ne": "CMOS ब्याट्री"
      },
      {
        "en": "The RAM",
        "ne": "RAM"
      },
      {
        "en": "The power supply",
        "ne": "पावर सप्लाई"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "CMOS memory holds the BIOS settings and runs the clock, and it needs power even when the machine is unplugged. That power comes from a coin battery on the board. When it dies, everything CMOS remembers is lost each time mains power goes — which is exactly this symptom.",
      "ne": "CMOS मेमोरीले BIOS सेटिङ राख्छ र घडी चलाउँछ, र मेसिन अनप्लग हुँदा पनि यसलाई बिजुली चाहिन्छ। त्यो बोर्डको सिक्का ब्याट्रीबाट आउँछ। त्यो सकिएपछि मुख्य बिजुली जाँदा CMOS ले सम्झेको सबै हराउँछ — लक्षण ठ्याक्कै यही हो।"
    }
  },
  {
    "id": "g10.hw.q011",
    "subject": "grade10/hardware",
    "unit": "u3",
    "topic": "hard-disk",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What is the smallest unit of a hard disk that can be read or written?",
      "ne": "Hard disk को पढ्न वा लेख्न मिल्ने सबैभन्दा सानो एकाइ कुन हो?"
    },
    "options": [
      {
        "en": "Track",
        "ne": "Track"
      },
      {
        "en": "Cylinder",
        "ne": "Cylinder"
      },
      {
        "en": "Sector",
        "ne": "Sector"
      },
      {
        "en": "Platter",
        "ne": "Platter"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "A sector is one slice of a track and is the smallest addressable unit. A track is a whole concentric ring, a cylinder is the same track across all platters, and a platter is the entire disk — all three are larger than a sector.",
      "ne": "Sector भनेको track को एउटा टुक्रा हो र ठेगाना दिन मिल्ने सबैभन्दा सानो एकाइ हो। Track पूरै केन्द्रित रिङ हो, cylinder सबै platter का उही track, र platter पूरै डिस्क — तीनै sector भन्दा ठूला छन्।"
    }
  },
  {
    "id": "g10.hw.q012",
    "subject": "grade10/hardware",
    "unit": "u3",
    "topic": "hard-disk",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Access time on a hard disk is made up of which three parts?",
      "ne": "Hard disk को access time कुन तीन भागबाट बन्छ?"
    },
    "options": [
      {
        "en": "Seek time, rotational delay and transfer time",
        "ne": "Seek time, rotational delay र transfer time"
      },
      {
        "en": "Read time, write time and idle time",
        "ne": "Read time, write time र idle time"
      },
      {
        "en": "Boot time, seek time and load time",
        "ne": "Boot time, seek time र load time"
      },
      {
        "en": "Spin-up time, seek time and cache time",
        "ne": "Spin-up time, seek time र cache time"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Seek time is the arm moving to the correct track, rotational delay is waiting for the sector to come round under the head, and transfer time is reading or writing the data. The first two are mechanical, which is why they dominate and why a solid-state drive is so much faster.",
      "ne": "Seek time भनेको arm ठीक track मा जाने, rotational delay भनेको sector head मुनि आइपुग्न पर्खने, र transfer time भनेको data पढ्ने वा लेख्ने। पहिलो दुई यान्त्रिक हुन् — त्यसैले तिनकै बढी समय लाग्छ, र solid-state drive यति छिटो हुनुको कारण पनि त्यही हो।"
    }
  },
  {
    "id": "g10.hw.q013",
    "subject": "grade10/hardware",
    "unit": "u3",
    "topic": "formatting",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A disk is quick-formatted before being given away. Can the old data still be recovered?",
      "ne": "कसैलाई दिनुअघि डिस्क quick-format गरियो। पुरानो data अझै फर्काउन सकिन्छ?"
    },
    "options": [
      {
        "en": "No — a format erases everything permanently",
        "ne": "सकिँदैन — format ले सबै स्थायी रूपमा मेटाउँछ"
      },
      {
        "en": "Yes — only the index was cleared, the data remains until overwritten",
        "ne": "सकिन्छ — सूची मात्र सफा भयो, ओभरराइट नभएसम्म data रहन्छ"
      },
      {
        "en": "Only if the disk was never full",
        "ne": "डिस्क कहिल्यै भरिएको थिएन भने मात्र"
      },
      {
        "en": "Only with the original operating system",
        "ne": "मूल अपरेटिङ सिस्टमसँग मात्र"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A quick format rewrites the file system index only, so the drive reports itself as empty while the sectors still hold the data. Recovery software scans sectors directly instead of trusting the index. To remove data properly you need a full format or a wipe utility that overwrites every sector.",
      "ne": "Quick format ले file system को सूची मात्र फेरि लेख्छ, त्यसैले ड्राइभ खाली देखिन्छ तर sector मा data रहन्छ। Recovery सफ्टवेयरले सूचीमा भर नपरी sector सीधै स्क्यान गर्छ। Data ठीकसँग हटाउन full format वा हरेक sector ओभरराइट गर्ने wipe utility चाहिन्छ।"
    }
  },
  {
    "id": "g10.hw.q014",
    "subject": "grade10/hardware",
    "unit": "u3",
    "topic": "partitioning",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which statement about an extended partition is correct?",
      "ne": "Extended partition बारे कुन कथन सही हो?"
    },
    "options": [
      {
        "en": "It gets its own drive letter",
        "ne": "यसले आफ्नै ड्राइभ अक्षर पाउँछ"
      },
      {
        "en": "It is a container that holds logical drives",
        "ne": "यो logical drive राख्ने भाँडो हो"
      },
      {
        "en": "A computer can boot directly from it",
        "ne": "कम्प्युटर सीधै यसैबाट boot हुन सक्छ"
      },
      {
        "en": "It can only exist on a second physical disk",
        "ne": "यो दोस्रो भौतिक डिस्कमा मात्र हुन सक्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "An extended partition exists to get round the limit on primary partitions: it holds logical drives, and those get the letters. The extended partition itself has none, and you boot from a primary partition, not from it.",
      "ne": "Primary partition को सीमा नाघ्न extended partition बनाइन्छ: यसले logical drive राख्छ, र अक्षर तिनैले पाउँछन्। Extended partition आफैँले पाउँदैन, र boot primary partition बाट हुन्छ, यसबाट होइन।"
    }
  },
  {
    "id": "g10.hw.q015",
    "subject": "grade10/hardware",
    "unit": "u4",
    "topic": "method",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Why must you change only one thing at a time when troubleshooting?",
      "ne": "Troubleshooting गर्दा एकपटकमा एउटा मात्र कुरा किन बदल्नुपर्छ?"
    },
    "options": [
      {
        "en": "It is faster than changing several",
        "ne": "धेरै बदल्नुभन्दा यो छिटो हुन्छ"
      },
      {
        "en": "Otherwise you cannot tell which change fixed it",
        "ne": "नत्र कुन परिवर्तनले मिलायो थाहा हुँदैन"
      },
      {
        "en": "The warranty requires it",
        "ne": "वारेन्टीले यसै भन्छ"
      },
      {
        "en": "Two changes may damage the board",
        "ne": "दुई परिवर्तनले बोर्ड बिगार्न सक्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "If you change two things and the fault clears, you have no idea which one was responsible. You have not diagnosed anything, cannot document it, and cannot prevent the same fault returning. It is usually slower, not faster — the point is that the result means something.",
      "ne": "दुई कुरा बदल्दा खराबी हट्यो भने कुनले हटायो थाहै हुँदैन। तपाईंले केही निदान गर्नुभएन, अभिलेख राख्न सक्नुहुन्न, र उही खराबी फेरि आउन रोक्न सक्नुहुन्न। यो प्रायः छिटो होइन, ढिलो हुन्छ — कुरा नतिजाको अर्थ हुनु हो।"
    }
  },
  {
    "id": "g10.hw.q016",
    "subject": "grade10/hardware",
    "unit": "u4",
    "topic": "boot",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A machine powers on, fans run, and it beeps repeatedly with a black screen. What does this tell you?",
      "ne": "मेसिनमा बिजुली आउँछ, पंखा घुम्छ, र कालो स्क्रिनसहित बारम्बार बीप गर्छ। यसले के बताउँछ?"
    },
    "options": [
      {
        "en": "Power never reached the board",
        "ne": "बोर्डसम्म बिजुली पुगेन"
      },
      {
        "en": "POST is running and found a fault before video was ready",
        "ne": "POST चलिरहेको छ र video तयार हुनुअघि खराबी भेट्यो"
      },
      {
        "en": "The operating system is corrupted",
        "ne": "अपरेटिङ सिस्टम बिग्रिएको छ"
      },
      {
        "en": "The hard disk cable is loose",
        "ne": "Hard disk को केबल खुकुलो छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Beeping IS the POST reporting, so power reached the board and the BIOS started — the power path is already ruled out. It is beeping rather than displaying because the fault was found before video was initialised, which makes memory the first suspect. The OS and the disk are not read until much later.",
      "ne": "बीप गर्नु <b>नै</b> POST ले सुनाएको हो, त्यसैले बोर्डमा बिजुली पुग्यो र BIOS सुरु भयो — बिजुलीको बाटो पहिल्यै हट्यो। देखाउनुको साटो बीप गर्नुको कारण खराबी video सुरु हुनुअघि भेटियो, जसले मेमोरीलाई पहिलो शंका बनाउँछ। OS र disk धेरै पछि मात्र पढिन्छन्।"
    }
  },
  {
    "id": "g10.hw.q017",
    "subject": "grade10/hardware",
    "unit": "u4",
    "topic": "boot",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "The screen shows \"Operating system not found\". What has already been proved to work?",
      "ne": "स्क्रिनमा \"Operating system not found\" देखियो। के काम गरिरहेको छ भन्ने पहिल्यै प्रमाणित भइसक्यो?"
    },
    "options": [
      {
        "en": "Nothing — the machine has failed completely",
        "ne": "केही पनि होइन — मेसिन पूरै बिग्रियो"
      },
      {
        "en": "Power, memory and video — POST passed",
        "ne": "बिजुली, मेमोरी र video — POST पास भयो"
      },
      {
        "en": "The hard disk is confirmed healthy",
        "ne": "Hard disk स्वस्थ छ भनी पुष्टि भयो"
      },
      {
        "en": "The operating system files are intact",
        "ne": "अपरेटिङ सिस्टमका फाइल सग्लै छन्"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A readable message on screen proves video works, and the BIOS only reaches the point of looking for an operating system after POST has passed — so power, memory and video are all fine. What has NOT been proved is the disk: the message says the OS was not found, which is exactly what is still in question.",
      "ne": "स्क्रिनमा पढ्न मिल्ने सन्देश आउनुले video चलेको प्रमाणित गर्छ, र POST पास भएपछि मात्र BIOS अपरेटिङ सिस्टम खोज्ने चरणमा पुग्छ — त्यसैले बिजुली, मेमोरी र video ठीक छन्। प्रमाणित <b>नभएको</b> कुरा disk हो: सन्देशले OS भेटिएन भन्छ, र प्रश्न अझै त्यही हो।"
    }
  },
  {
    "id": "g10.hw.q018",
    "subject": "grade10/hardware",
    "unit": "u4",
    "topic": "slowdown",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A computer works normally when switched on but becomes slow after 25 minutes, sooner when a heavy program is running. What is the most likely cause?",
      "ne": "कम्प्युटर खोल्दा सामान्य चल्छ तर २५ मिनेटपछि ढिलो हुन्छ, भारी प्रोग्राम चलाए झन् चाँडो। सबैभन्दा सम्भावित कारण के हो?"
    },
    "options": [
      {
        "en": "Too many startup programs",
        "ne": "Startup मा धेरै प्रोग्राम"
      },
      {
        "en": "Overheating causing the processor to reduce speed",
        "ne": "तात्दा प्रोसेसरले गति घटाउनु"
      },
      {
        "en": "A failing hard disk",
        "ne": "बिग्रँदै गएको hard disk"
      },
      {
        "en": "Insufficient colour depth",
        "ne": "Colour depth अपुग"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The timing is the evidence. A fault present from the start would be slow immediately — too many startup programs is slow from boot. Something that only appears after the machine has warmed up, and appears sooner under load because load makes more heat, is thermal. The processor deliberately reduces its speed to protect itself.",
      "ne": "प्रमाण भनेको समय हो। सुरुदेखिको खराबी भए तुरुन्तै ढिलो हुन्थ्यो — startup मा धेरै प्रोग्राम भए boot देखि नै ढिलो हुन्छ। मेसिन तातेपछि मात्र देखिने, र भार पर्दा झन् चाँडो देखिने (किनकि भारले बढी ताप निकाल्छ) कुरा तापसम्बन्धी हो। प्रोसेसरले आफूलाई जोगाउन जानाजान गति घटाउँछ।"
    }
  },
  {
    "id": "g10.hw.q019",
    "subject": "grade10/hardware",
    "unit": "u4",
    "topic": "method",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "You test your theory of the cause and the test disproves it. What is the correct next step?",
      "ne": "तपाईंले कारणको अनुमान परीक्षण गर्नुभयो र परीक्षणले त्यो गलत साबित गर्‍यो। ठीक अर्को कदम के हो?"
    },
    "options": [
      {
        "en": "Start replacing components until it works",
        "ne": "चल्ने नभएसम्म पार्ट साट्न थाल्ने"
      },
      {
        "en": "Form a new theory of probable cause",
        "ne": "सम्भावित कारणको नयाँ अनुमान बनाउने"
      },
      {
        "en": "Reinstall the operating system",
        "ne": "अपरेटिङ सिस्टम फेरि इन्स्टल गर्ने"
      },
      {
        "en": "Document the failure and stop",
        "ne": "असफलताको अभिलेख राखेर रोकिने"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A disproved theory sends you back to step 3, not forward. That loop is the part students leave out of the answer, and it is what separates diagnosis from guessing — you now know one more thing that is NOT the cause, which is real progress.",
      "ne": "गलत साबित भएको अनुमानले तपाईंलाई अगाडि होइन, चरण ३ मा फर्काउँछ। उत्तरमा विद्यार्थीले छुटाउने भाग यही हो, र निदान र अनुमानबीचको भिन्नता पनि यही — अब तपाईंलाई कारण <b>होइन</b> भन्ने एउटा कुरा थप थाहा भयो, जुन साँचो प्रगति हो।"
    }
  },
  {
    "id": "g10.hw.q020",
    "subject": "grade10/hardware",
    "unit": "u5",
    "topic": "power-protection",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "An office has frequent complete power cuts and loses unsaved work. Which device solves this?",
      "ne": "एउटा कार्यालयमा बारम्बार बिजुली पूरै जान्छ र नबचाइएको काम हराउँछ। कुन उपकरणले समाधान गर्छ?"
    },
    "options": [
      {
        "en": "A surge protector",
        "ne": "Surge protector"
      },
      {
        "en": "A voltage stabiliser",
        "ne": "Voltage stabiliser"
      },
      {
        "en": "A UPS",
        "ne": "UPS"
      },
      {
        "en": "An earthing rod",
        "ne": "Earthing rod"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "The power disappears entirely. A surge protector handles voltage that is too high and a stabiliser handles voltage that is too low — neither can supply power that is not there. Only a UPS carries a battery, and its purpose is to give enough time to save work and shut down properly.",
      "ne": "बिजुली पूरै हराउँछ। Surge protector ले धेरै बढी भोल्टेज सम्हाल्छ र stabiliser ले धेरै कम — नभएको बिजुली दुवैले दिन सक्दैनन्। UPS सँग मात्र ब्याट्री हुन्छ, र यसको उद्देश्य काम बचाएर ठीकसँग बन्द गर्न पुग्ने समय दिनु हो।"
    }
  },
  {
    "id": "g10.hw.q021",
    "subject": "grade10/hardware",
    "unit": "u5",
    "topic": "cooling",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A computer shuts itself down when it gets hot. What is the fault?",
      "ne": "तातेपछि कम्प्युटर आफैँ बन्द हुन्छ। खराबी के हो?"
    },
    "options": [
      {
        "en": "The automatic shutdown feature is faulty",
        "ne": "स्वतः बन्द हुने सुविधा बिग्रेको छ"
      },
      {
        "en": "Whatever is stopping the heat from leaving",
        "ne": "ताप बाहिर जान नदिने जुनसुकै कुरा"
      },
      {
        "en": "The processor is producing too much heat and must be replaced",
        "ne": "प्रोसेसरले बढी ताप निकालेको छ र साट्नुपर्छ"
      },
      {
        "en": "The operating system is mismanaging power",
        "ne": "अपरेटिङ सिस्टमले बिजुली गलत व्यवस्थापन गरेको छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The shutdown is the protection working correctly — it is stopping the processor being damaged. The fault is whatever prevents the heat escaping: dust in the heatsink fins, a stopped or slowed fan, dried thermal paste, or blocked vents. The processor is producing its normal amount of heat.",
      "ne": "बन्द हुनु सुरक्षा ठीकसँग चलेको हो — प्रोसेसर बिग्रिनबाट रोकिरहेको छ। खराबी भनेको ताप बाहिर जान नदिने कुरा हो: heatsink का पत्रमा धुलो, रोकिएको वा ढिलो भएको पंखा, सुकेको thermal paste, वा बन्द प्वाल। प्रोसेसरले सामान्य मात्रामै ताप निकालिरहेको छ।"
    }
  },
  {
    "id": "g10.hw.q022",
    "subject": "grade10/hardware",
    "unit": "u5",
    "topic": "virus",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Why must antivirus software be kept updated?",
      "ne": "Antivirus सफ्टवेयर किन अपडेट गरिराख्नुपर्छ?"
    },
    "options": [
      {
        "en": "To make the computer run faster",
        "ne": "कम्प्युटर छिटो चलाउन"
      },
      {
        "en": "It cannot recognise viruses released after it was installed",
        "ne": "इन्स्टल भएपछि आएका भाइरस यसले चिन्न सक्दैन"
      },
      {
        "en": "To renew the software licence",
        "ne": "सफ्टवेयरको इजाजतपत्र नवीकरण गर्न"
      },
      {
        "en": "To free up disk space",
        "ne": "डिस्कको ठाउँ खाली गर्न"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "An antivirus recognises threats by comparing against what it knows. New malware appears constantly, so a scanner that is never updated is blind to everything released after installation. This is why \"install antivirus\" alone is a half answer — \"and keep it updated\" is the other half of the mark.",
      "ne": "Antivirus ले आफूलाई थाहा भएकोसँग मिलाएर खतरा चिन्छ। नयाँ malware निरन्तर आइरहन्छ, त्यसैले कहिल्यै अपडेट नगरिएको स्क्यानर इन्स्टलपछि आएका सबैप्रति अन्धो हुन्छ। त्यसैले \"antivirus राख्ने\" मात्र आधा उत्तर हो — \"र अपडेट गरिराख्ने\" ले बाँकी आधा अंक दिन्छ।"
    }
  },
  {
    "id": "g10.hw.q023",
    "subject": "grade10/hardware",
    "unit": "u5",
    "topic": "display-fault",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A flat monitor shows a blurry, slightly stretched picture. What is the most likely cause?",
      "ne": "Flat monitor मा धमिलो र अलि तानिएको तस्बिर देखिन्छ। सबैभन्दा सम्भावित कारण के हो?"
    },
    "options": [
      {
        "en": "The refresh rate is too low",
        "ne": "Refresh rate धेरै कम छ"
      },
      {
        "en": "The resolution is not set to the monitor's native value",
        "ne": "Resolution monitor को native मान मा सेट छैन"
      },
      {
        "en": "The video card is failing",
        "ne": "Video card बिग्रँदै छ"
      },
      {
        "en": "The colour depth is set to 24-bit",
        "ne": "Colour depth २४-bit मा छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A flat panel has one native resolution and is sharp only at that setting; anything else is scaled to fit and goes soft, and a wrong aspect ratio also stretches the picture. Low refresh rate causes flicker, not blur. 24-bit colour depth is normal, not a fault.",
      "ne": "Flat panel को एउटै native resolution हुन्छ र त्यही सेटिङमा मात्र तीक्ष्ण हुन्छ; अरूमा अटाउन तानिन्छ र धमिलो हुन्छ, र गलत aspect ratio ले तस्बिर पनि तान्छ। कम refresh rate ले झिमझिम ल्याउँछ, धमिलोपन होइन। २४-bit colour depth सामान्य हो, खराबी होइन।"
    }
  },
  {
    "id": "g10.hw.q024",
    "subject": "grade10/hardware",
    "unit": "u5",
    "topic": "maintenance",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What should be used to remove dust from inside a computer case?",
      "ne": "कम्प्युटर केसभित्रको धुलो हटाउन के प्रयोग गर्नुपर्छ?"
    },
    "options": [
      {
        "en": "A damp cloth",
        "ne": "भिजेको कपडा"
      },
      {
        "en": "Dry compressed air",
        "ne": "सुक्खा कम्प्रेस्ड एयर"
      },
      {
        "en": "A household vacuum cleaner",
        "ne": "घरायसी भ्याकुम क्लिनर"
      },
      {
        "en": "Soapy water on a brush",
        "ne": "ब्रसमा साबुनपानी"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Dry compressed air removes dust without moisture and without generating static. A damp cloth or soapy water introduces moisture, which shorts and corrodes; a household vacuum builds a large static charge at its nozzle, which can destroy components outright.",
      "ne": "सुक्खा कम्प्रेस्ड एयरले चिस्यानबिना र static नबनाई धुलो हटाउँछ। भिजेको कपडा वा साबुनपानीले चिस्यान ल्याउँछ, जसले शर्ट र खिया गराउँछ; घरायसी भ्याकुमको नोजलमा ठूलो static चार्ज बन्छ, जसले पार्ट एकैचोटि नष्ट गर्न सक्छ।"
    }
  },
  {
    "id": "g10.hw.q025",
    "subject": "grade10/hardware",
    "unit": "u6",
    "topic": "backup-methods",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A differential backup copies everything that has changed since which point?",
      "ne": "Differential backup ले कुन बिन्दुपछि बदलिएको सबै कपी गर्छ?"
    },
    "options": [
      {
        "en": "The last backup of any kind",
        "ne": "जुनसुकै किसिमको अघिल्लो ब्याकअप"
      },
      {
        "en": "The last full backup",
        "ne": "अन्तिम full ब्याकअप"
      },
      {
        "en": "The start of the current month",
        "ne": "चालु महिनाको सुरु"
      },
      {
        "en": "The last successful restore",
        "ne": "अन्तिम सफल पुनर्स्थापना"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Differential = since the last FULL backup, which is why each one grows larger than the last but a restore needs only two sets. Option 1 describes an incremental backup. Swapping these two reverses every answer about restore time, so it is worth learning as a pair.",
      "ne": "Differential = अन्तिम <b>FULL</b> ब्याकअपपछि — त्यसैले हरेक अघिल्लो भन्दा ठूलो हुँदै जान्छ तर फर्काउन दुई सेट मात्र चाहिन्छ। पहिलो विकल्पले incremental वर्णन गर्छ। यी दुई साट्दा फर्काउने समयसम्बन्धी हरेक उत्तर उल्टिन्छ, त्यसैले जोडी बनाएरै सिक्नु राम्रो।"
    }
  },
  {
    "id": "g10.hw.q026",
    "subject": "grade10/hardware",
    "unit": "u6",
    "topic": "backup-methods",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A full backup runs Monday and incrementals run Tuesday to Friday. The disk fails Friday night. How many sets are needed to restore?",
      "ne": "सोमबार full ब्याकअप र मंगलबारदेखि शुक्रबारसम्म incremental चल्छ। शुक्रबार राति डिस्क बिग्रियो। फर्काउन कति सेट चाहिन्छ?"
    },
    "options": [
      {
        "en": "One — Friday's",
        "ne": "एउटा — शुक्रबारको"
      },
      {
        "en": "Two — Monday's and Friday's",
        "ne": "दुई — सोमबार र शुक्रबारको"
      },
      {
        "en": "Five — Monday's plus all four incrementals",
        "ne": "पाँच — सोमबारको र चारै incremental"
      },
      {
        "en": "Four — the incrementals only",
        "ne": "चार — incremental मात्र"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "Each incremental holds only what changed since the previous backup, so the chain must be replayed in order: Monday's full set, then Tuesday, Wednesday, Thursday and Friday. That is five. Option 2 would be right for a DIFFERENTIAL scheme — which is exactly the trade differential buys with its larger daily sets.",
      "ne": "हरेक incremental मा अघिल्लो ब्याकअपपछि बदलिएको मात्र हुन्छ, त्यसैले शृंखला क्रमैसँग लगाउनुपर्छ: सोमबारको full, अनि मंगल, बुध, बिहीबार र शुक्रबार। जम्मा पाँच। दोस्रो विकल्प <b>DIFFERENTIAL</b> योजनाका लागि सही हुन्थ्यो — differential ले ठूला दैनिक सेटको बदलामा किन्ने कुरा ठ्याक्कै त्यही हो।"
    }
  },
  {
    "id": "g10.hw.q027",
    "subject": "grade10/hardware",
    "unit": "u6",
    "topic": "raid",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What is the minimum number of disks required for RAID 5?",
      "ne": "RAID 5 लाई न्यूनतम कति डिस्क चाहिन्छ?"
    },
    "options": [
      {
        "en": "Two",
        "ne": "दुई"
      },
      {
        "en": "Three",
        "ne": "तीन"
      },
      {
        "en": "Four",
        "ne": "चार"
      },
      {
        "en": "Five",
        "ne": "पाँच"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "RAID 5 stripes data with parity spread across the disks, and the parity has to live somewhere other than the data it protects — so three is the minimum. RAID 0 and RAID 1 both need two.",
      "ne": "RAID 5 ले parity सबै डिस्कमा फैलाएर striping गर्छ, र parity ले जोगाउने data भन्दा अन्तै बस्नुपर्छ — त्यसैले न्यूनतम तीन। RAID 0 र RAID 1 दुवैलाई दुई चाहिन्छ।"
    }
  },
  {
    "id": "g10.hw.q028",
    "subject": "grade10/hardware",
    "unit": "u6",
    "topic": "raid",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A server uses RAID 1. A user deletes an important folder by mistake. Can it be recovered from the array?",
      "ne": "सर्भरमा RAID 1 छ। प्रयोगकर्ताले भुलवश महत्त्वपूर्ण फोल्डर मेट्छ। के array बाट फर्काउन सकिन्छ?"
    },
    "options": [
      {
        "en": "Yes — the mirror disk still holds it",
        "ne": "सकिन्छ — mirror डिस्कमा अझै छ"
      },
      {
        "en": "No — the deletion was written to both disks at once",
        "ne": "सकिँदैन — मेटाइ एकैचोटि दुवै डिस्कमा लेखियो"
      },
      {
        "en": "Yes, if done within 24 hours",
        "ne": "सकिन्छ, २४ घण्टाभित्र गरे"
      },
      {
        "en": "Only by rebuilding the array",
        "ne": "Array पुनर्निर्माण गरेर मात्र"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Mirroring copies every write to both disks, and a deletion is a write. Both lose the folder in the same instant. RAID protects against a DISK failing — a mechanical event. It gives no protection against deletion, corruption, a virus or ransomware, because to the array those are ordinary valid writes. Only a separate backup recovers this.",
      "ne": "Mirroring ले हरेक लेखाइ दुवै डिस्कमा सार्छ, र मेटाइ पनि लेखाइ हो। दुवैले एकै क्षणमा फोल्डर गुमाउँछन्। RAID ले <b>डिस्क</b> बिग्रिनु — यान्त्रिक घटना — बाट जोगाउँछ। मेटाइ, बिग्रिनु, भाइरस वा ransomware बाट जोगाउँदैन, किनकि array का लागि ती साधारण वैध लेखाइ हुन्। छुट्टै ब्याकअपले मात्र यो फर्काउँछ।"
    }
  },
  {
    "id": "g10.hw.q029",
    "subject": "grade10/hardware",
    "unit": "u6",
    "topic": "rotation",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "In grandfather–father–son rotation, what does \"son\" refer to?",
      "ne": "Grandfather–father–son rotation मा \"son\" ले केलाई जनाउँछ?"
    },
    "options": [
      {
        "en": "The monthly backup",
        "ne": "मासिक ब्याकअप"
      },
      {
        "en": "The weekly backup",
        "ne": "साप्ताहिक ब्याकअप"
      },
      {
        "en": "The daily backup",
        "ne": "दैनिक ब्याकअप"
      },
      {
        "en": "The off-site copy",
        "ne": "अर्को ठाउँको प्रतिलिपि"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "Son = daily, father = weekly, grandfather = monthly, oldest generation last. Keeping several generations is what protects against damage that is noticed late — if only one daily set existed and it were overwritten each day, every copy you hold would contain the same corruption.",
      "ne": "Son = दैनिक, father = साप्ताहिक, grandfather = मासिक — सबैभन्दा पुरानो पुस्ता अन्तिम। धेरै पुस्ता राख्नुले ढिलो थाहा हुने क्षतिबाट जोगाउँछ — दैनिक एउटै सेट भई हरेक दिन ओभरराइट भइरहे तपाईंसँग भएका सबै प्रतिलिपिमा उही बिग्रिने कुरा हुन्थ्यो।"
    }
  },
  {
    "id": "g10.hw.q030",
    "subject": "grade10/hardware",
    "unit": "u6",
    "topic": "recovery",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A bad driver update has made Windows unstable, but no personal files are missing. Which recovery technique fits best?",
      "ne": "खराब driver अपडेटले Windows अस्थिर बनायो, तर कुनै व्यक्तिगत फाइल हराएको छैन। कुन recovery उपाय सबैभन्दा मिल्छ?"
    },
    "options": [
      {
        "en": "System restore point",
        "ne": "System restore point"
      },
      {
        "en": "Data recovery software",
        "ne": "Data recovery सफ्टवेयर"
      },
      {
        "en": "Professional clean-room recovery",
        "ne": "व्यावसायिक clean-room रिकभरी"
      },
      {
        "en": "Rebuilding the RAID array",
        "ne": "RAID array पुनर्निर्माण"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "A system restore point rolls the operating system's settings and drivers back to an earlier state, which is exactly the problem here. Data recovery software is for deleted files — none are missing. Clean-room recovery is for physical drive damage, and a RAID rebuild is for a failed disk; neither applies.",
      "ne": "System restore point ले अपरेटिङ सिस्टमका सेटिङ र driver अघिल्लो अवस्थामा फर्काउँछ — यहाँको समस्या ठ्याक्कै त्यही हो। Data recovery सफ्टवेयर मेटिएका फाइलका लागि हो — यहाँ केही हराएको छैन। Clean-room रिकभरी भौतिक क्षतिका लागि, र RAID rebuild बिग्रेको डिस्कका लागि; दुवै लागू हुँदैनन्।"
    }
  }
]);
