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
      "en": "Which data structure follows the LIFO (Last In, First Out) principle?"
    },
    "options": [
      {
        "en": "Queue"
      },
      {
        "en": "Stack"
      },
      {
        "en": "Tree"
      },
      {
        "en": "Graph"
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
      "en": "If no access specifier is written inside a C++ class, the members are by default:"
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
      "en": "Which of the following is NOT a linear data structure?"
    },
    "options": [
      {
        "en": "Array"
      },
      {
        "en": "Stack"
      },
      {
        "en": "Queue"
      },
      {
        "en": "Tree"
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
      "en": "A constructor in C++ has:"
    },
    "options": [
      {
        "en": "return type void"
      },
      {
        "en": "the same return type as the class"
      },
      {
        "en": "no return type at all"
      },
      {
        "en": "int as its return type"
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
      "en": "Which symbol is written before a destructor name?"
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
      "en": "Function overloading is an example of which type of polymorphism?"
    },
    "options": [
      {
        "en": "Run-time polymorphism"
      },
      {
        "en": "Compile-time polymorphism"
      },
      {
        "en": "Dynamic binding"
      },
      {
        "en": "Late binding"
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
      "en": "Function overriding is possible only when there is:"
    },
    "options": [
      {
        "en": "operator overloading"
      },
      {
        "en": "inheritance"
      },
      {
        "en": "a friend function"
      },
      {
        "en": "a static member"
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
      "en": "In multilevel inheritance Animal → Dog → Puppy, when a Puppy object is created, which constructor runs FIRST?"
    },
    "options": [
      {
        "en": "Puppy constructor"
      },
      {
        "en": "Dog constructor"
      },
      {
        "en": "Animal constructor"
      },
      {
        "en": "All three run at the same time"
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
      "en": "Which operator is used to define a member function outside its class?"
    },
    "options": [
      {
        "en": "Dot operator (.)"
      },
      {
        "en": "Arrow operator (->)"
      },
      {
        "en": "Scope resolution operator (::)"
      },
      {
        "en": "Insertion operator (<<)"
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
      "en": "A collection of related records of the same entity is called a:"
    },
    "options": [
      {
        "en": "Field"
      },
      {
        "en": "Record"
      },
      {
        "en": "File"
      },
      {
        "en": "Attribute"
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
      "en": "Which keyword makes run-time polymorphism possible in C++?"
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
      "en": "Which statement about a class and an object is TRUE?"
    },
    "options": [
      {
        "en": "A class takes memory, an object does not"
      },
      {
        "en": "An object takes memory, a class does not"
      },
      {
        "en": "Both take memory"
      },
      {
        "en": "Neither takes memory"
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
      "en": "In a queue, insertion and deletion are done at which ends?"
    },
    "options": [
      {
        "en": "Insert at front, delete at rear"
      },
      {
        "en": "Insert at rear, delete at front"
      },
      {
        "en": "Both at the front"
      },
      {
        "en": "Both at the rear"
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
      "en": "Binding data members and member functions together in one unit and hiding the data from outside is called:"
    },
    "options": [
      {
        "en": "Abstraction"
      },
      {
        "en": "Inheritance"
      },
      {
        "en": "Encapsulation"
      },
      {
        "en": "Polymorphism"
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
      "en": "What is the output of this program?<br><span class=\"mono\" style=\"color:var(--blue);font-size:.85rem\">class A { public: A(){cout&lt;&lt;\"A\";} ~A(){cout&lt;&lt;\"X\";} };<br>int main(){ A a1; A a2; return 0; }</span>"
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
