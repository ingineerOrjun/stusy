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
