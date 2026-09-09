/* GENERATED from config/pages.js and content/prerequisites.js — do not edit by hand. */
RevisionService.load({
 "units": {
  "grade10/oop-cpp/u1": {
   "id": "grade10/oop-cpp/u1",
   "subject": "grade10/oop-cpp",
   "n": "1",
   "page": "grade10/oop-cpp/unit1.html",
   "title": {
    "en": "Basic Introduction to Data Structure",
    "ne": "डाटा स्ट्रक्चरको आधारभूत परिचय"
   },
   "hrs": 20,
   "marks": 15,
   "prereqs": []
  },
  "grade10/oop-cpp/u2": {
   "id": "grade10/oop-cpp/u2",
   "subject": "grade10/oop-cpp",
   "n": "2",
   "page": "grade10/oop-cpp/unit2.html",
   "title": {
    "en": "Concept of OOP using C++",
    "ne": "OOP को अवधारणा (C++)"
   },
   "hrs": 10,
   "marks": 14,
   "prereqs": []
  },
  "grade10/oop-cpp/u3": {
   "id": "grade10/oop-cpp/u3",
   "subject": "grade10/oop-cpp",
   "n": "3",
   "page": "grade10/oop-cpp/unit3.html",
   "title": {
    "en": "Class and Object",
    "ne": "क्लास र अब्जेक्ट"
   },
   "hrs": 7,
   "marks": 2,
   "prereqs": [
    {
     "unit": "grade10/oop-cpp/u2",
     "why": {
      "en": "A class is written in C++, so its declaration uses the tokens, data types and program structure from Unit 2. Encapsulation is also one of the seven features listed there — Unit 3 is where it stops being a word.",
      "ne": "Class C++ मै लेखिन्छ, त्यसैले यसको घोषणामा युनिट २ का token, data type र प्रोग्राम संरचना चाहिन्छ। Encapsulation पनि त्यहीँका सात विशेषतामध्ये एक हो — युनिट ३ मा त्यो शब्द मात्र रहँदैन।"
     }
    }
   ]
  },
  "grade10/oop-cpp/u4": {
   "id": "grade10/oop-cpp/u4",
   "subject": "grade10/oop-cpp",
   "n": "4",
   "page": "grade10/oop-cpp/unit4.html",
   "title": {
    "en": "Abstraction and Encapsulation",
    "ne": "एब्स्ट्र्याक्सन र इनक्याप्सुलेसन"
   },
   "hrs": 7,
   "marks": 5,
   "prereqs": [
    {
     "unit": "grade10/oop-cpp/u3",
     "why": {
      "en": "Encapsulation IS private data with public functions, and abstraction is what the public half shows. Both are read off the access specifiers from Unit 3; without them the two words stay interchangeable.",
      "ne": "Encapsulation भनेकै private data र public function हो, र abstraction भनेको त्यो public पक्षले देखाउने कुरा। दुवै युनिट ३ का access specifier बाट पढिन्छन्; ती नभई यी दुई शब्द साट्न मिल्ने जस्तै रहन्छन्।"
     }
    }
   ]
  },
  "grade10/oop-cpp/u5": {
   "id": "grade10/oop-cpp/u5",
   "subject": "grade10/oop-cpp",
   "n": "5",
   "page": "grade10/oop-cpp/unit5.html",
   "title": {
    "en": "Inheritance",
    "ne": "इनहेरिटेन्स"
   },
   "hrs": 10,
   "marks": 7,
   "prereqs": [
    {
     "unit": "grade10/oop-cpp/u3",
     "why": {
      "en": "Inheritance is about which members a derived class can reach, so the answer is always an access specifier from Unit 3. Constructor and destructor order also assumes you know what a constructor does at all.",
      "ne": "Inheritance भनेको derived कक्षाले कुन member छुन पाउँछ भन्ने हो, त्यसैले उत्तर सधैं युनिट ३ कै access specifier हुन्छ। Constructor–destructor क्रमले पनि constructor के गर्छ भन्ने थाहा भएको मान्छ।"
     }
    }
   ]
  },
  "grade10/oop-cpp/u6": {
   "id": "grade10/oop-cpp/u6",
   "subject": "grade10/oop-cpp",
   "n": "6",
   "page": "grade10/oop-cpp/unit6.html",
   "title": {
    "en": "Polymorphism",
    "ne": "पोलिमर्फिज्म"
   },
   "hrs": 10,
   "marks": 7,
   "prereqs": [
    {
     "unit": "grade10/oop-cpp/u5",
     "why": {
      "en": "Run-time polymorphism needs a base class pointer pointing at a derived object, which only exists once there is inheritance. Overriding is a derived class replacing a base class function.",
      "ne": "Run-time polymorphism लाई derived वस्तुतर्फ देखाउने base class pointer चाहिन्छ, जुन inheritance भएपछि मात्र हुन्छ। Overriding भनेको derived कक्षाले base कक्षाको function फेर्नु हो।"
     }
    },
    {
     "unit": "grade10/oop-cpp/u3",
     "why": {
      "en": "Overloading is two member functions with the same name in one class, so the class and its member functions from Unit 3 come first.",
      "ne": "Overloading भनेको एउटै कक्षामा एउटै नामका दुई member function हुनु हो, त्यसैले युनिट ३ का class र member function पहिले चाहिन्छन्।"
     }
    }
   ]
  },
  "grade10/digital-design/u1": {
   "id": "grade10/digital-design/u1",
   "subject": "grade10/digital-design",
   "n": "1",
   "page": "grade10/digital-design/unit1.html",
   "title": {
    "en": "Number System and Binary Arithmetic",
    "ne": "संख्या प्रणाली र बाइनरी गणित"
   },
   "hrs": 12,
   "marks": 7,
   "prereqs": []
  },
  "grade10/digital-design/u2": {
   "id": "grade10/digital-design/u2",
   "subject": "grade10/digital-design",
   "n": "2",
   "page": "grade10/digital-design/unit2.html",
   "title": {
    "en": "Concept of Logic Gates",
    "ne": "लजिक गेटको अवधारणा"
   },
   "hrs": 14,
   "marks": 15,
   "prereqs": [
    {
     "unit": "grade10/digital-design/u1",
     "why": {
      "en": "A gate's inputs and output are single binary digits. If 0 and 1 as values — rather than as the characters \"0\" and \"1\" — are not yet solid, a truth table looks like a table of symbols instead of a table of results.",
      "ne": "गेटका इनपुट र आउटपुट एक–एक बाइनरी अङ्क हुन्। 0 र 1 लाई अक्षर होइन मानका रूपमा बुझिएको छैन भने truth table नतिजाको तालिका नभई चिन्हहरूको तालिका जस्तो देखिन्छ।"
     }
    }
   ]
  },
  "grade10/digital-design/u3": {
   "id": "grade10/digital-design/u3",
   "subject": "grade10/digital-design",
   "n": "3",
   "page": "grade10/digital-design/unit3.html",
   "title": {
    "en": "Boolean Algebra and Karnaugh Map",
    "ne": "बुलियन बीजगणित र के–म्याप"
   },
   "hrs": 10,
   "marks": 6,
   "prereqs": [
    {
     "unit": "grade10/digital-design/u2",
     "why": {
      "en": "Every Boolean law is a statement about gates, and SOP and POS are read straight off a truth table. Without the truth table of AND, OR and NOT, simplification is symbol-shuffling with nothing underneath it.",
      "ne": "हरेक Boolean नियम गेटकै कुरा हो, र SOP–POS सिधै truth table बाट पढिन्छ। AND, OR, NOT को truth table नभई simplification तल केही नभएको चिन्ह सार्ने काम बन्छ।"
     }
    },
    {
     "unit": "grade10/digital-design/u1",
     "why": {
      "en": "A K-map is labelled in Gray-code order — 00, 01, 11, 10 — and a minterm number is a binary number. Both come from Unit 1.",
      "ne": "K-map लाई Gray-code क्रममा — 00, 01, 11, 10 — लेखिन्छ, र minterm नम्बर बाइनरी सङ्ख्या हो। दुवै युनिट १ बाट आउँछन्।"
     }
    }
   ]
  },
  "grade10/digital-design/u4": {
   "id": "grade10/digital-design/u4",
   "subject": "grade10/digital-design",
   "n": "4",
   "page": "grade10/digital-design/unit4.html",
   "title": {
    "en": "Binary Arithmetic and Combinational Logic",
    "ne": "बाइनरी गणित र कम्बिनेसनल लजिक"
   },
   "hrs": 13,
   "marks": 7,
   "prereqs": [
    {
     "unit": "grade10/digital-design/u2",
     "why": {
      "en": "A half adder IS an XOR and an AND. Deriving an adder from its truth table is the same skill as reading a gate's truth table, applied to two outputs at once.",
      "ne": "Half adder भनेकै XOR र AND हो। truth table बाट adder निकाल्नु भनेको गेटको truth table पढ्ने त्यही सीप हो, दुई आउटपुटमा एकैचोटि लगाइएको।"
     }
    },
    {
     "unit": "grade10/digital-design/u1",
     "why": {
      "en": "Carry and borrow are binary addition and subtraction. The adder circuit is built to do what you did on paper in Unit 1.",
      "ne": "Carry र borrow बाइनरी जोड–घटाउ नै हुन्। युनिट १ मा कागजमा गरेकै काम गर्न adder सर्किट बनाइएको हो।"
     }
    }
   ]
  },
  "grade10/digital-design/u5": {
   "id": "grade10/digital-design/u5",
   "subject": "grade10/digital-design",
   "n": "5",
   "page": "grade10/digital-design/unit5.html",
   "title": {
    "en": "Introduction to Microprocessor",
    "ne": "माइक्रोप्रोसेसर र यसका भाग"
   },
   "hrs": 15,
   "marks": 15,
   "prereqs": [
    {
     "unit": "grade10/digital-design/u1",
     "why": {
      "en": "Every address, opcode and register value in the 8085 is written in hexadecimal. Reading 2000H as a place in memory needs hex from Unit 1.",
      "ne": "8085 का हरेक ठेगाना, opcode र register मान hexadecimal मा लेखिन्छन्। 2000H लाई मेमोरीको ठाउँ भनेर पढ्न युनिट १ को hex चाहिन्छ।"
     }
    },
    {
     "unit": "grade10/digital-design/u4",
     "why": {
      "en": "The ALU inside the processor is the adder you built in Unit 4. The flags it sets — carry, zero — are that circuit reporting on its own result.",
      "ne": "प्रोसेसरभित्रको ALU युनिट ४ मा बनाएकै adder हो। यसले राख्ने flag — carry, zero — त्यही सर्किटले आफ्नै नतिजा बताएको हो।"
     }
    }
   ]
  },
  "grade10/dbms/u1": {
   "id": "grade10/dbms/u1",
   "subject": "grade10/dbms",
   "n": "1",
   "page": "grade10/dbms/unit1.html",
   "title": {
    "en": "Introduction to Database System",
    "ne": "डाटाबेस प्रणालीको परिचय"
   },
   "hrs": 6,
   "marks": 5,
   "prereqs": []
  },
  "grade10/dbms/u2": {
   "id": "grade10/dbms/u2",
   "subject": "grade10/dbms",
   "n": "2",
   "page": "grade10/dbms/unit2.html",
   "title": {
    "en": "Entity Relationship Model (ER-Model)",
    "ne": "ई–आर मोडेल"
   },
   "hrs": 10,
   "marks": 8,
   "prereqs": [
    {
     "unit": "grade10/dbms/u1",
     "why": {
      "en": "The ER model exists to design a database before it is built. If \"database\" and \"DBMS\" are still the same word, it is not clear what an ER diagram is a design OF.",
      "ne": "डाटाबेस बनाउनुअघि डिजाइन गर्न ER model छ। \"database\" र \"DBMS\" अझै एउटै शब्द भए ER diagram केको डिजाइन हो भन्ने प्रस्ट हुँदैन।"
     }
    }
   ]
  },
  "grade10/dbms/u3": {
   "id": "grade10/dbms/u3",
   "subject": "grade10/dbms",
   "n": "3",
   "page": "grade10/dbms/unit3.html",
   "title": {
    "en": "Relational Model",
    "ne": "रिलेसनल मोडेल"
   },
   "hrs": 10,
   "marks": 8,
   "prereqs": [
    {
     "unit": "grade10/dbms/u2",
     "why": {
      "en": "A table is what an entity becomes, and a foreign key is what a relationship becomes. Converting ER to relational is the whole of topic 3.4, and it is impossible without the ER half.",
      "ne": "Entity तालिका बन्छ, र relationship foreign key बन्छ। ER लाई relational मा बदल्नु नै टपिक ३.४ हो, र ER पक्ष नभई त्यो सम्भव छैन।"
     }
    }
   ]
  },
  "grade10/dbms/u4": {
   "id": "grade10/dbms/u4",
   "subject": "grade10/dbms",
   "n": "4",
   "page": "grade10/dbms/unit4.html",
   "title": {
    "en": "SQL — Structured Query Language",
    "ne": "एसक्युएल — संरचित क्वेरी भाषा"
   },
   "hrs": 14,
   "marks": 11,
   "prereqs": [
    {
     "unit": "grade10/dbms/u3",
     "why": {
      "en": "SELECT chooses columns and WHERE chooses rows. Those two words are the relational vocabulary from Unit 3, and mixing up degree and cardinality there becomes mixing up SELECT and WHERE here.",
      "ne": "SELECT ले स्तम्भ छान्छ, WHERE ले पङ्क्ति। यी दुई शब्द युनिट ३ कै relational शब्दावली हुन्, र त्यहाँ degree–cardinality मिसिनु यहाँ SELECT–WHERE मिसिनु हो।"
     }
    }
   ]
  },
  "grade10/dbms/u5": {
   "id": "grade10/dbms/u5",
   "subject": "grade10/dbms",
   "n": "5",
   "page": "grade10/dbms/unit5.html",
   "title": {
    "en": "Relational Database Design",
    "ne": "रिलेसनल डाटाबेस डिजाइन"
   },
   "hrs": 8,
   "marks": 6,
   "prereqs": [
    {
     "unit": "grade10/dbms/u3",
     "why": {
      "en": "A partial dependency is defined against PART of a composite key, and a transitive one against a NON-KEY column. Neither definition can be applied without the key vocabulary from Unit 3.",
      "ne": "Partial dependency composite key को एक भागविरुद्ध, र transitive चाहिँ NON-KEY स्तम्भविरुद्ध परिभाषित हुन्छ। युनिट ३ को key शब्दावली नभई दुवै लागू गर्न सकिँदैन।"
     }
    },
    {
     "unit": "grade10/dbms/u2",
     "why": {
      "en": "Normalisation splits one table into several and links them with foreign keys — which is the M:N junction table from Unit 2, arrived at from the other direction.",
      "ne": "Normalization ले एउटा तालिकालाई धेरैमा छुट्याएर foreign key ले जोड्छ — त्यो युनिट २ कै M:N junction तालिका हो, अर्को बाटोबाट आइपुगेको।"
     }
    }
   ]
  },
  "grade10/dbms/u6": {
   "id": "grade10/dbms/u6",
   "subject": "grade10/dbms",
   "n": "6",
   "page": "grade10/dbms/unit6.html",
   "title": {
    "en": "Database Transaction",
    "ne": "डाटाबेस ट्रान्ज्याक्सन"
   },
   "hrs": 8,
   "marks": 6,
   "prereqs": [
    {
     "unit": "grade10/dbms/u4",
     "why": {
      "en": "A transaction is a group of SQL statements treated as one. UPDATE, INSERT and DELETE from Unit 4 are what a transaction commits or rolls back.",
      "ne": "Transaction भनेको एउटै मानिने SQL कथनहरूको समूह हो। युनिट ४ का UPDATE, INSERT, DELETE नै transaction ले commit वा rollback गर्ने कुरा हुन्।"
     }
    }
   ]
  },
  "grade10/dbms/u7": {
   "id": "grade10/dbms/u7",
   "subject": "grade10/dbms",
   "n": "7",
   "page": "grade10/dbms/unit7.html",
   "title": {
    "en": "Database Backup, Recovery and Security",
    "ne": "ब्याकअप, रिकभरी र सुरक्षा"
   },
   "hrs": 8,
   "marks": 6,
   "prereqs": [
    {
     "unit": "grade10/dbms/u6",
     "why": {
      "en": "Recovery uses the log to redo committed transactions and undo uncommitted ones. \"Committed\" and \"uncommitted\" are Unit 6's transaction states.",
      "ne": "Recovery ले log प्रयोग गरी commit भएका transaction redo र नभएका undo गर्छ। \"Committed\" र \"uncommitted\" युनिट ६ कै transaction अवस्था हुन्।"
     }
    }
   ]
  },
  "grade10/hardware/u1": {
   "id": "grade10/hardware/u1",
   "subject": "grade10/hardware",
   "n": "1",
   "page": "grade10/hardware/unit1.html",
   "title": {
    "en": "Introduction to Electronic Devices",
    "ne": "इलेक्ट्रोनिक उपकरणको परिचय"
   },
   "hrs": 10,
   "marks": 8,
   "prereqs": []
  },
  "grade10/hardware/u2": {
   "id": "grade10/hardware/u2",
   "subject": "grade10/hardware",
   "n": "2",
   "page": "grade10/hardware/unit2.html",
   "title": {
    "en": "Introduction to Computer System",
    "ne": "कम्प्युटर प्रणालीको परिचय"
   },
   "hrs": 10,
   "marks": 8,
   "prereqs": []
  },
  "grade10/hardware/u3": {
   "id": "grade10/hardware/u3",
   "subject": "grade10/hardware",
   "n": "3",
   "page": "grade10/hardware/unit3.html",
   "title": {
    "en": "Overview on System's Core",
    "ne": "प्रणालीको मुख्य भाग"
   },
   "hrs": 12,
   "marks": 9,
   "prereqs": [
    {
     "unit": "grade10/hardware/u2",
     "why": {
      "en": "Unit 3 identifies the parts ON the board and what each one connects. That only means something once you know the five units of a system and which of them the CPU is made of.",
      "ne": "युनिट ३ ले बोर्डमा भएका भाग र हरेकले के जोड्छ चिनाउँछ। प्रणालीका पाँच एकाइ र तीमध्ये CPU कुन-कुनबाट बन्छ थाहा भएपछि मात्र त्यसको अर्थ हुन्छ।"
     }
    }
   ]
  },
  "grade10/hardware/u4": {
   "id": "grade10/hardware/u4",
   "subject": "grade10/hardware",
   "n": "4",
   "page": "grade10/hardware/unit4.html",
   "title": {
    "en": "Troubleshooting Techniques",
    "ne": "समस्या समाधानका तरिका"
   },
   "hrs": 12,
   "marks": 9,
   "prereqs": [
    {
     "unit": "grade10/hardware/u3",
     "why": {
      "en": "Every boot symptom is read against what the BIOS does and in what order — POST before video, video before the disk. Without 3.1 the beeps and the boot messages are noise rather than evidence.",
      "ne": "हरेक boot लक्षण BIOS ले के गर्छ र कुन क्रममा गर्छ भन्ने आधारमा पढिन्छ — video अघि POST, disk अघि video। ३.१ बिना बीप र boot सन्देश प्रमाण होइन, हल्ला मात्र हुन्।"
     }
    }
   ]
  },
  "grade10/hardware/u5": {
   "id": "grade10/hardware/u5",
   "subject": "grade10/hardware",
   "n": "5",
   "page": "grade10/hardware/unit5.html",
   "title": {
    "en": "Repair and Maintenance",
    "ne": "मर्मत र सम्भार"
   },
   "hrs": 12,
   "marks": 9,
   "prereqs": [
    {
     "unit": "grade10/hardware/u4",
     "why": {
      "en": "Unit 5 is troubleshooting applied to specific parts, so it assumes the method from Unit 4: cheapest check first, one change at a time, and reading the timing of a fault as evidence.",
      "ne": "युनिट ५ भनेको निश्चित भागमा लगाइएको troubleshooting हो, त्यसैले युनिट ४ को विधि थाहा भएको मान्छ: सस्तो जाँच पहिले, एकपटकमा एउटा परिवर्तन, र खराबीको समयलाई प्रमाणका रूपमा पढ्ने।"
     }
    }
   ]
  },
  "grade10/hardware/u6": {
   "id": "grade10/hardware/u6",
   "subject": "grade10/hardware",
   "n": "6",
   "page": "grade10/hardware/unit6.html",
   "title": {
    "en": "Backup and Recovery",
    "ne": "ब्याकअप र रिकभरी"
   },
   "hrs": 8,
   "marks": 7,
   "prereqs": [
    {
     "unit": "grade10/hardware/u3",
     "why": {
      "en": "RAID combines physical disks and a restore writes to a formatted partition, so the hard disk, partitioning and formatting from Unit 3 are what Unit 6 is built on.",
      "ne": "RAID ले भौतिक डिस्क जोड्छ र पुनर्स्थापनाले format गरिएको partition मा लेख्छ, त्यसैले युनिट ३ का hard disk, partitioning र formatting माथि नै युनिट ६ अडेको छ।"
     }
    }
   ]
  }
 },
 "questions": {
  "a1": {
   "unit": "grade10/oop-cpp/u1",
   "page": "grade10/oop-cpp/unit1.html"
  },
  "a2": {
   "unit": "grade10/oop-cpp/u1",
   "page": "grade10/oop-cpp/unit1.html"
  },
  "a3": {
   "unit": "grade10/oop-cpp/u1",
   "page": "grade10/oop-cpp/unit1.html"
  },
  "a4": {
   "unit": "grade10/oop-cpp/u1",
   "page": "grade10/oop-cpp/unit1.html"
  },
  "b1": {
   "unit": "grade10/oop-cpp/u2",
   "page": "grade10/oop-cpp/unit2.html"
  },
  "b2": {
   "unit": "grade10/oop-cpp/u2",
   "page": "grade10/oop-cpp/unit2.html"
  },
  "b3": {
   "unit": "grade10/oop-cpp/u2",
   "page": "grade10/oop-cpp/unit2.html"
  },
  "b4": {
   "unit": "grade10/oop-cpp/u2",
   "page": "grade10/oop-cpp/unit2.html"
  },
  "c1": {
   "unit": "grade10/oop-cpp/u3",
   "page": "grade10/oop-cpp/unit3.html"
  },
  "c2": {
   "unit": "grade10/oop-cpp/u3",
   "page": "grade10/oop-cpp/unit3.html"
  },
  "c3": {
   "unit": "grade10/oop-cpp/u3",
   "page": "grade10/oop-cpp/unit3.html"
  },
  "c4": {
   "unit": "grade10/oop-cpp/u3",
   "page": "grade10/oop-cpp/unit3.html"
  },
  "d1": {
   "unit": "grade10/oop-cpp/u4",
   "page": "grade10/oop-cpp/unit4.html"
  },
  "d2": {
   "unit": "grade10/oop-cpp/u4",
   "page": "grade10/oop-cpp/unit4.html"
  },
  "d3": {
   "unit": "grade10/oop-cpp/u4",
   "page": "grade10/oop-cpp/unit4.html"
  },
  "d4": {
   "unit": "grade10/oop-cpp/u4",
   "page": "grade10/oop-cpp/unit4.html"
  },
  "e1": {
   "unit": "grade10/oop-cpp/u5",
   "page": "grade10/oop-cpp/unit5.html"
  },
  "e2": {
   "unit": "grade10/oop-cpp/u5",
   "page": "grade10/oop-cpp/unit5.html"
  },
  "e3": {
   "unit": "grade10/oop-cpp/u5",
   "page": "grade10/oop-cpp/unit5.html"
  },
  "e4": {
   "unit": "grade10/oop-cpp/u5",
   "page": "grade10/oop-cpp/unit5.html"
  },
  "f1": {
   "unit": "grade10/oop-cpp/u6",
   "page": "grade10/oop-cpp/unit6.html"
  },
  "f2": {
   "unit": "grade10/oop-cpp/u6",
   "page": "grade10/oop-cpp/unit6.html"
  },
  "f3": {
   "unit": "grade10/oop-cpp/u6",
   "page": "grade10/oop-cpp/unit6.html"
  },
  "f4": {
   "unit": "grade10/oop-cpp/u6",
   "page": "grade10/oop-cpp/unit6.html"
  },
  "a11": {
   "unit": "grade10/digital-design/u1",
   "page": "grade10/digital-design/unit1.html"
  },
  "a12": {
   "unit": "grade10/digital-design/u1",
   "page": "grade10/digital-design/unit1.html"
  },
  "a13": {
   "unit": "grade10/digital-design/u1",
   "page": "grade10/digital-design/unit1.html"
  },
  "a14": {
   "unit": "grade10/digital-design/u1",
   "page": "grade10/digital-design/unit1.html"
  },
  "a21": {
   "unit": "grade10/digital-design/u2",
   "page": "grade10/digital-design/unit2.html"
  },
  "a22": {
   "unit": "grade10/digital-design/u2",
   "page": "grade10/digital-design/unit2.html"
  },
  "a23": {
   "unit": "grade10/digital-design/u2",
   "page": "grade10/digital-design/unit2.html"
  },
  "a24": {
   "unit": "grade10/digital-design/u2",
   "page": "grade10/digital-design/unit2.html"
  },
  "a31": {
   "unit": "grade10/digital-design/u3",
   "page": "grade10/digital-design/unit3.html"
  },
  "a32": {
   "unit": "grade10/digital-design/u3",
   "page": "grade10/digital-design/unit3.html"
  },
  "a33": {
   "unit": "grade10/digital-design/u3",
   "page": "grade10/digital-design/unit3.html"
  },
  "a41": {
   "unit": "grade10/digital-design/u4",
   "page": "grade10/digital-design/unit4.html"
  },
  "a42": {
   "unit": "grade10/digital-design/u4",
   "page": "grade10/digital-design/unit4.html"
  },
  "a43": {
   "unit": "grade10/digital-design/u4",
   "page": "grade10/digital-design/unit4.html"
  },
  "a51": {
   "unit": "grade10/digital-design/u5",
   "page": "grade10/digital-design/unit5.html"
  },
  "a52": {
   "unit": "grade10/digital-design/u5",
   "page": "grade10/digital-design/unit5.html"
  },
  "a53": {
   "unit": "grade10/digital-design/u5",
   "page": "grade10/digital-design/unit5.html"
  },
  "a54": {
   "unit": "grade10/digital-design/u5",
   "page": "grade10/digital-design/unit5.html"
  },
  "dba11": {
   "unit": "grade10/dbms/u1",
   "page": "grade10/dbms/unit1.html"
  },
  "dba12": {
   "unit": "grade10/dbms/u1",
   "page": "grade10/dbms/unit1.html"
  },
  "dba13": {
   "unit": "grade10/dbms/u1",
   "page": "grade10/dbms/unit1.html"
  },
  "dba21": {
   "unit": "grade10/dbms/u2",
   "page": "grade10/dbms/unit2.html"
  },
  "dba22": {
   "unit": "grade10/dbms/u2",
   "page": "grade10/dbms/unit2.html"
  },
  "dba23": {
   "unit": "grade10/dbms/u2",
   "page": "grade10/dbms/unit2.html"
  },
  "dba31": {
   "unit": "grade10/dbms/u3",
   "page": "grade10/dbms/unit3.html"
  },
  "dba32": {
   "unit": "grade10/dbms/u3",
   "page": "grade10/dbms/unit3.html"
  },
  "dba33": {
   "unit": "grade10/dbms/u3",
   "page": "grade10/dbms/unit3.html"
  },
  "dba41": {
   "unit": "grade10/dbms/u4",
   "page": "grade10/dbms/unit4.html"
  },
  "dba42": {
   "unit": "grade10/dbms/u4",
   "page": "grade10/dbms/unit4.html"
  },
  "dba43": {
   "unit": "grade10/dbms/u4",
   "page": "grade10/dbms/unit4.html"
  },
  "dba44": {
   "unit": "grade10/dbms/u4",
   "page": "grade10/dbms/unit4.html"
  },
  "dba51": {
   "unit": "grade10/dbms/u5",
   "page": "grade10/dbms/unit5.html"
  },
  "dba52": {
   "unit": "grade10/dbms/u5",
   "page": "grade10/dbms/unit5.html"
  },
  "dba53": {
   "unit": "grade10/dbms/u5",
   "page": "grade10/dbms/unit5.html"
  },
  "dba61": {
   "unit": "grade10/dbms/u6",
   "page": "grade10/dbms/unit6.html"
  },
  "dba62": {
   "unit": "grade10/dbms/u6",
   "page": "grade10/dbms/unit6.html"
  },
  "dba63": {
   "unit": "grade10/dbms/u6",
   "page": "grade10/dbms/unit6.html"
  },
  "dba71": {
   "unit": "grade10/dbms/u7",
   "page": "grade10/dbms/unit7.html"
  },
  "dba72": {
   "unit": "grade10/dbms/u7",
   "page": "grade10/dbms/unit7.html"
  },
  "dba73": {
   "unit": "grade10/dbms/u7",
   "page": "grade10/dbms/unit7.html"
  },
  "hw-a11": {
   "unit": "grade10/hardware/u1",
   "page": "grade10/hardware/unit1.html"
  },
  "hw-a12": {
   "unit": "grade10/hardware/u1",
   "page": "grade10/hardware/unit1.html"
  },
  "hw-a13": {
   "unit": "grade10/hardware/u1",
   "page": "grade10/hardware/unit1.html"
  },
  "hw-a21": {
   "unit": "grade10/hardware/u2",
   "page": "grade10/hardware/unit2.html"
  },
  "hw-a22": {
   "unit": "grade10/hardware/u2",
   "page": "grade10/hardware/unit2.html"
  },
  "hw-a23": {
   "unit": "grade10/hardware/u2",
   "page": "grade10/hardware/unit2.html"
  },
  "hw-a31": {
   "unit": "grade10/hardware/u3",
   "page": "grade10/hardware/unit3.html"
  },
  "hw-a32": {
   "unit": "grade10/hardware/u3",
   "page": "grade10/hardware/unit3.html"
  },
  "hw-a33": {
   "unit": "grade10/hardware/u3",
   "page": "grade10/hardware/unit3.html"
  },
  "hw-a41": {
   "unit": "grade10/hardware/u4",
   "page": "grade10/hardware/unit4.html"
  },
  "hw-a42": {
   "unit": "grade10/hardware/u4",
   "page": "grade10/hardware/unit4.html"
  },
  "hw-a43": {
   "unit": "grade10/hardware/u4",
   "page": "grade10/hardware/unit4.html"
  },
  "hw-a51": {
   "unit": "grade10/hardware/u5",
   "page": "grade10/hardware/unit5.html"
  },
  "hw-a52": {
   "unit": "grade10/hardware/u5",
   "page": "grade10/hardware/unit5.html"
  },
  "hw-a53": {
   "unit": "grade10/hardware/u5",
   "page": "grade10/hardware/unit5.html"
  },
  "hw-a61": {
   "unit": "grade10/hardware/u6",
   "page": "grade10/hardware/unit6.html"
  },
  "hw-a62": {
   "unit": "grade10/hardware/u6",
   "page": "grade10/hardware/unit6.html"
  },
  "hw-a63": {
   "unit": "grade10/hardware/u6",
   "page": "grade10/hardware/unit6.html"
  }
 }
});
