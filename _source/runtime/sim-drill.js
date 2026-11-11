/* =========================================================
   DECISION DRILL — a reusable "judge this case" component

   WHY THIS EXISTS, AND WHY IT IS NOT A QUIZ

   Several SEE questions are not recall and not calculation. They are
   JUDGEMENTS made against a rule:

       this table — which normal form does it break?
       this log   — redo or undo?
       this pair  — one-to-many or many-to-many?

   A student who knows the rule can still get these wrong, because the
   skill is applying it to a case they have not seen. That skill comes
   from doing it several times with immediate reasons, which is exactly
   what a quiz does not give: a quiz asks once, scores, and moves on.

   So a drill is a short sequence of cases on ONE rule, with the reason
   shown the moment the student commits — and the reason names the rule,
   so a wrong answer teaches rather than just deducts.

   WHY IT IS ONE COMPONENT AND NOT THREE
   The three units above need the same interaction and differ only in
   their cases. Building three would be three places for the same bug.
   A lesson picks a set; a future unit adds a set, not a component.

   MARKUP CONTRACT

     <div class="drill" data-set="normalforms"></div>
     <div class="drill" data-set="recovery"></div>

   ========================================================= */
(function (global) {
  'use strict';

  var esc = (global.DbTable && global.DbTable.esc) || function (s){
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };

  /* Many option labels are the same in both languages — "1NF", "1:1",
     "DBMS" are terminology, not prose. Rendering both halves gives
     "1:11:1", which is the collision Phase 3.1 fixed on the gate
     workbench and the quiz. Identical halves are a VALUE, not a
     translation, so they collapse to one unwrapped label that shows in
     every mode. */
  function pair(p){
    var en = String(p.en || ''), ne = String(p.ne || '');
    if (!ne || ne.trim() === en.trim()) return esc(en);
    return '<span class="t-en">' + esc(en) + '</span>' +
           '<span class="t-ne" lang="ne">' + esc(ne) + '</span>';
  }

  /* Each set is one rule, drilled. `pre` is monospaced evidence — a
     table definition, a log — shown above the question. */
  var SETS = {

    /* ---- Unit 5: which normal form does this break? ---- */
    normalforms: {
      title: { en: 'Which normal form does this break?', ne: 'यसले कुन normal form तोड्छ?' },
      lead: {
        en: 'Read the table, decide which rule it breaks first, and commit before you check. Work down the forms in order — a table that breaks 1NF is not yet worth testing against 2NF.',
        ne: 'तालिका पढ्नुहोस्, पहिले कुन नियम तोड्छ छान्नुहोस्, अनि जाँच्नुहोस्। क्रमैसँग हेर्नुहोस् — 1NF नै नतोडेको तालिकालाई मात्र 2NF मा जाँच्ने हो।'
      },
      options: [
        { id: '1nf', label: { en: '1NF', ne: '1NF' } },
        { id: '2nf', label: { en: '2NF', ne: '2NF' } },
        { id: '3nf', label: { en: '3NF', ne: '3NF' } },
        { id: 'ok', label: { en: 'Already in 3NF', ne: 'पहिले नै 3NF मा' } }
      ],
      cases: [
        {
          pre: 'Student( roll, name, subjects )\n\n1  Ram   "Maths, Science"\n2  Sita  "Maths"',
          answer: '1nf',
          why: {
            en: 'One cell holds two values. 1NF requires every cell to be atomic, so this fails at the first form — split it into one row per subject before testing anything else.',
            ne: 'एउटै कक्षमा दुई मान छन्। 1NF ले हरेक कक्ष अविभाज्य हुनुपर्ने माग्छ, त्यसैले पहिलो रूपमै असफल — अरू जाँच्नुअघि हरेक विषयलाई छुट्टै पङ्क्तिमा बाँड्नुहोस्।'
          }
        },
        {
          pre: 'Takes( roll, subject, student_name )\n\nkey = ( roll, subject )\nstudent_name depends on roll only',
          answer: '2nf',
          why: {
            en: 'The key is both columns together, but student_name depends on roll alone — a PARTIAL dependency, which is exactly what 2NF forbids. Every cell is atomic, so 1NF is satisfied.',
            ne: 'कुञ्जी दुवै स्तम्भ मिलेर हो, तर student_name roll मा मात्र निर्भर छ — PARTIAL निर्भरता, जुन 2NF ले निषेध गर्छ। हरेक कक्ष अविभाज्य भएकाले 1NF पूरा भएको छ।'
          }
        },
        {
          pre: 'Student( roll, name, class_id, class_room )\n\nkey = ( roll )\nclass_room depends on class_id\nclass_id  depends on roll',
          answer: '3nf',
          why: {
            en: 'class_room depends on class_id, which is not a key — a TRANSITIVE dependency. The key is a single column so there is no part of it to depend on, which is why 2NF is already satisfied.',
            ne: 'class_room, class_id मा निर्भर छ र class_id कुञ्जी होइन — TRANSITIVE निर्भरता। कुञ्जी एउटै स्तम्भ भएकाले त्यसको "भाग" हुँदैन, त्यसैले 2NF पहिले नै पूरा छ।'
          }
        },
        {
          pre: 'Class( class_id, room )\n\nkey = ( class_id )\nroom depends on class_id and nothing else',
          answer: 'ok',
          why: {
            en: 'Atomic values, a single-column key so no partial dependency is possible, and the one non-key column depends on the key directly. Nothing left to remove — this is 3NF.',
            ne: 'अविभाज्य मान, एउटै स्तम्भको कुञ्जी भएकाले partial निर्भरता सम्भव छैन, र कुञ्जी नभएको एउटै स्तम्भ सिधै कुञ्जीमा निर्भर छ। हटाउनुपर्ने केही छैन — यो 3NF हो।'
          }
        },
        {
          pre: 'Order( order_id, item, customer_id, customer_city )\n\nkey = ( order_id, item )',
          answer: '2nf',
          why: {
            en: 'customer_id and customer_city both depend on order_id alone, not on the whole key — partial dependency, so 2NF fails first. A transitive dependency is also present, but you fix the earlier form first.',
            ne: 'customer_id र customer_city दुवै order_id मा मात्र निर्भर छन्, पूरै कुञ्जीमा होइन — partial निर्भरता, त्यसैले पहिले 2NF असफल। Transitive निर्भरता पनि छ, तर पहिलेको रूप पहिले सुधार्ने।'
          }
        }
      ]
    },

    /* ---- Unit 7: redo or undo? ---- */
    recovery: {
      title: { en: 'Redo or undo?', ne: 'Redo कि undo?' },
      lead: {
        en: 'The system has crashed and this is what the log holds. Decide what recovery does with the transaction. There is only ONE test, and it is not how much work was done.',
        ne: 'प्रणाली crash भयो र log मा यति छ। Recovery ले त्यो ट्रान्ज्याक्सनलाई के गर्छ छान्नुहोस्। जाँच एउटै हो, र त्यो "कति काम भयो" भन्ने होइन।'
      },
      options: [
        { id: 'redo', label: { en: 'REDO it', ne: 'REDO गर्ने' } },
        { id: 'undo', label: { en: 'UNDO it', ne: 'UNDO गर्ने' } }
      ],
      cases: [
        {
          pre: 'T1 start\nT1 write A = 50\nT1 COMMIT\n-- CRASH --',
          answer: 'redo',
          why: {
            en: 'There is a COMMIT record, so the transaction promised durability and its work must exist. Recovery reads the log forwards and applies the change again.',
            ne: 'COMMIT रेकर्ड छ, त्यसैले ट्रान्ज्याक्सनले durability को वचन दिइसकेको छ र काम रहनुपर्छ। Recovery ले log अगाडिबाट पढेर परिवर्तन फेरि लागू गर्छ।'
          }
        },
        {
          pre: 'T2 start\nT2 write B = 10\nT2 write C = 20\n-- CRASH --',
          answer: 'undo',
          why: {
            en: 'No COMMIT record. It does not matter that TWO writes had already happened — atomicity says half a transaction may not survive, so the log is read backwards and both are reversed.',
            ne: 'COMMIT रेकर्ड छैन। दुई पटक लेखिसकेको थियो भन्नेले फरक पार्दैन — atomicity अनुसार आधा ट्रान्ज्याक्सन बाँच्न पाउँदैन, त्यसैले log पछाडिबाट पढेर दुवै उल्टाइन्छ।'
          }
        },
        {
          pre: 'T3 start\nT3 COMMIT\n-- CRASH --',
          answer: 'redo',
          why: {
            en: 'It committed, so it is redone — even though it wrote almost nothing. The amount of work is never the test; the COMMIT record is.',
            ne: 'Commit भएको छ, त्यसैले redo — झन्डै केही नलेखेको भए पनि। कति काम भयो भन्ने कहिल्यै जाँच होइन; COMMIT रेकर्ड नै जाँच हो।'
          }
        },
        {
          pre: 'T4 start\nT4 write D = 5\nT4 ROLLBACK\n-- CRASH --',
          answer: 'undo',
          why: {
            en: 'It rolled back deliberately, so there is no COMMIT record and its changes must not survive. A rollback and a crash without commit end in the same place: aborted.',
            ne: 'यसले जानाजान rollback गर्‍यो, त्यसैले COMMIT रेकर्ड छैन र परिवर्तन बाँच्नु हुँदैन। Rollback र commit नभई crash — दुवैको अन्त्य उही हो: aborted।'
          }
        }
      ]
    },

    /* ---- OOP u2: which feature of OOP is this? ----
       2.2 lists the features and 2.4 compares structured with OOP. Both
       are recall-and-apply questions in the paper: a scenario is
       described and the student names the feature. Naming it from a
       description is the skill; reading the list is not. */
    oopfeature: {
      title: { en: 'Which feature of OOP is this?', ne: 'यो OOP को कुन विशेषता हो?' },
      lead: {
        en: 'Each case describes something a program does. Name the OOP feature responsible. Two of them are the pair students swap most often — read what is being HIDDEN and what is being IGNORED.',
        ne: 'हरेक केसले प्रोग्रामले गर्ने कुरा वर्णन गर्छ। जिम्मेवार OOP विशेषताको नाम दिनुहोस्। दुईवटा त्यस्ता छन् जुन विद्यार्थीले सबैभन्दा बढी साट्छन् — के लुकाइँदै छ र के बेवास्ता गरिँदै छ, त्यो पढ्नुहोस्।'
      },
      options: [
        { id: 'encap', label: { en: 'Encapsulation', ne: 'Encapsulation' } },
        { id: 'abstr', label: { en: 'Abstraction', ne: 'Abstraction' } },
        { id: 'inher', label: { en: 'Inheritance', ne: 'Inheritance' } },
        { id: 'poly', label: { en: 'Polymorphism', ne: 'Polymorphism' } }
      ],
      cases: [
        {
          pre: 'A class keeps marks as a private member and\nprovides setMarks() and getMarks() to reach it.',
          answer: 'encap',
          why: {
            en: 'Data and the functions that work on it are wrapped together in one class, and the data is protected from direct access. That wrapping is encapsulation. The private keyword is its usual sign.',
            ne: 'डाटा र त्यसमा काम गर्ने फङ्सन एउटै क्लासमा बाँधिएका छन्, र डाटा सिधै पहुँचबाट जोगिएको छ। यही बाँधाइ नै encapsulation हो। private शब्द यसको सामान्य सङ्केत हो।'
          }
        },
        {
          pre: 'A driver uses the steering wheel and brake\nwithout knowing how the engine works.',
          answer: 'abstr',
          why: {
            en: 'Only the necessary detail is shown and the internal working is hidden. That is abstraction — it hides COMPLEXITY. Encapsulation hides DATA. This pair is the one students swap.',
            ne: 'आवश्यक कुरा मात्र देखाइएको छ र भित्रको काम लुकाइएको छ। यही abstraction हो — यसले जटिलता लुकाउँछ। Encapsulation ले डाटा लुकाउँछ। विद्यार्थीले साट्ने जोडी यही हो।'
          }
        },
        {
          pre: 'class Dog : public Animal { ... };\nDog reuses eat() and sleep() written in Animal.',
          answer: 'inher',
          why: {
            en: 'One class acquires the members of another, so common code is written once and reused. The IS-A test confirms it: a Dog IS-A Animal.',
            ne: 'एउटा क्लासले अर्कोका मेम्बर प्राप्त गर्छ, त्यसैले साझा कोड एक पटक लेखेर पुनः प्रयोग हुन्छ। IS-A जाँचले पुष्टि गर्छ: Dog एक प्रकारको Animal हो।'
          }
        },
        {
          pre: 'area(int) and area(int, int) both exist.\nThe compiler picks one from the arguments given.',
          answer: 'poly',
          why: {
            en: 'One name behaving in more than one form. This is compile-time polymorphism (function overloading) — the compiler decides which to call from the argument list.',
            ne: 'एउटै नाम एकभन्दा बढी रूपमा चल्नु। यो compile-time polymorphism (function overloading) हो — कुन चलाउने भन्ने compiler ले आर्गुमेन्ट हेरेर तय गर्छ।'
          }
        },
        {
          pre: 'A base class pointer calls speak().\nAt run time the DERIVED version executes.',
          answer: 'poly',
          why: {
            en: 'Also polymorphism, but run-time — function overriding with a virtual function. Same name, form chosen while the program runs rather than while it compiles.',
            ne: 'यो पनि polymorphism, तर run-time — virtual फङ्सनसहितको function overriding। उही नाम, तर रूप compile गर्दा होइन, चल्दै गर्दा छानिन्छ।'
          }
        },
        {
          pre: 'A Circle class and a Square class both\ninherit draw() from a Shape class.',
          answer: 'inher',
          why: {
            en: 'Two classes acquiring members from one base is hierarchical inheritance. If the question had asked which draw() runs through a Shape pointer, the answer would have been polymorphism instead.',
            ne: 'दुई क्लासले एउटै base बाट मेम्बर लिनु hierarchical inheritance हो। Shape pointer बाट कुन draw() चल्छ भनी सोधेको भए उत्तर polymorphism हुन्थ्यो।'
          }
        }
      ]
    },

    /* ---- OOP u3: is this member reachable here? ----
       3.2 gives the access table. A table is a lookup; the exam asks the
       student to APPLY it, usually inside a derived class where
       protected and private differ. */
    accessspec: {
      title: { en: 'Can this line reach that member?', ne: 'यो हरफले त्यो मेम्बरमा पुग्न सक्छ?' },
      lead: {
        en: 'A member is declared in a base class and used somewhere. Decide whether the line compiles. The place students lose the mark is inside a derived class, where private and protected behave differently.',
        ne: 'Base क्लासमा घोषित मेम्बर कतै प्रयोग भएको छ। त्यो हरफ compile हुन्छ कि हुँदैन छान्नुहोस्। अंक गुम्ने ठाउँ derived क्लासभित्र हो, जहाँ private र protected फरक व्यवहार गर्छन्।'
      },
      options: [
        { id: 'yes', label: { en: 'Yes — it compiles', ne: 'हुन्छ — compile हुन्छ' } },
        { id: 'no', label: { en: 'No — error', ne: 'हुँदैन — त्रुटि' } }
      ],
      cases: [
        {
          pre: 'class A { private: int x; };\n\nint main(){ A a;  a.x = 5; }',
          answer: 'no',
          why: {
            en: 'A private member is reachable only from inside its own class. main() is outside, so this is an error. Private is the default for a class, which is why forgetting to write public is such a common mistake.',
            ne: 'Private मेम्बरमा आफ्नै क्लासभित्रबाट मात्र पुग्न सकिन्छ। main() बाहिर छ, त्यसैले त्रुटि हो। क्लासमा default नै private हुने भएकाले public लेख्न बिर्सनु सामान्य गल्ती हो।'
          }
        },
        {
          pre: 'class A { protected: int x; };\nclass B : public A { void f(){ x = 5; } };',
          answer: 'yes',
          why: {
            en: 'Protected is reachable from a derived class. This is the ONLY difference between protected and private, and it is what protected exists for.',
            ne: 'Protected मा derived क्लासबाट पुग्न सकिन्छ। Protected र private बीचको एउटै फरक यही हो, र protected हुनुको कारण पनि यही हो।'
          }
        },
        {
          pre: 'class A { private: int x; };\nclass B : public A { void f(){ x = 5; } };',
          answer: 'no',
          why: {
            en: 'A derived class does NOT inherit access to a private member. It exists inside the object, but B cannot touch it directly — the callout in 5.1 calls it the parent\'s personal diary. Change private to protected and it compiles.',
            ne: 'Derived क्लासले private मेम्बरमा पहुँच पाउँदैन। त्यो अब्जेक्टभित्र छ, तर B ले सिधै छुन सक्दैन — ५.१ को उदाहरणमा यसलाई बाबुको व्यक्तिगत डायरी भनिएको छ। private लाई protected बनाए compile हुन्छ।'
          }
        },
        {
          pre: 'class A { protected: int x; };\n\nint main(){ A a;  a.x = 5; }',
          answer: 'no',
          why: {
            en: 'Protected helps a DERIVED class, not the outside world. From main() it behaves exactly like private. Students who learn "protected is less strict" often miss this.',
            ne: 'Protected ले derived क्लासलाई सहयोग गर्छ, बाहिरी संसारलाई होइन। main() बाट यो ठ्याक्कै private जस्तै हुन्छ। "Protected कम कडा हो" भनेर सिकेकाहरू यहीँ चुक्छन्।'
          }
        },
        {
          pre: 'class A { public: int x; };\n\nint main(){ A a;  a.x = 5; }',
          answer: 'yes',
          why: {
            en: 'Public is reachable from anywhere. This is the case that makes the other four meaningful — without it the table would just say "no".',
            ne: 'Public मा जहाँबाट पनि पुग्न सकिन्छ। यही केसले बाँकी चारलाई अर्थपूर्ण बनाउँछ — नत्र तालिकाले "हुँदैन" मात्र भन्थ्यो।'
          }
        }
      ]
    },

    /* ---- OOP u4: abstraction or encapsulation? ----
       The unit names this as the misconception and has a callout for it,
       but nothing that makes the student decide. */
    absencap: {
      title: { en: 'Abstraction or encapsulation?', ne: 'Abstraction कि encapsulation?' },
      lead: {
        en: 'The pair the paper asks you to differentiate almost every year. One test settles every case: is complexity being hidden, or is data being protected?',
        ne: 'परीक्षामा झन्डै हरेक वर्ष फरक छुट्याउन भनिने जोडी। एउटै जाँचले सबै केस मिलाउँछ: जटिलता लुकाइँदै छ, कि डाटा जोगाइँदै छ?'
      },
      options: [
        { id: 'abstr', label: { en: 'Abstraction', ne: 'Abstraction' } },
        { id: 'encap', label: { en: 'Encapsulation', ne: 'Encapsulation' } }
      ],
      cases: [
        {
          pre: 'You press a mobile phone\'s power button.\nYou do not know what the circuit does.',
          answer: 'abstr',
          why: {
            en: 'Complexity is hidden and only the necessary interface is shown. Abstraction answers "what does it do?" and hides "how".',
            ne: 'जटिलता लुकाइएको छ र आवश्यक अन्तरमुख मात्र देखाइएको छ। Abstraction ले "के गर्छ?" भन्छ र "कसरी" लुकाउँछ।'
          }
        },
        {
          pre: 'int balance is private.\nGetters and setters control every change to it.',
          answer: 'encap',
          why: {
            en: 'Data is bound with its functions and protected from direct access. Encapsulation answers "who may touch this?" The private keyword is its usual sign.',
            ne: 'डाटा आफ्ना फङ्सनसँग बाँधिएको र सिधै पहुँचबाट जोगिएको छ। Encapsulation ले "यसलाई कसले छुन पाउँछ?" भन्छ। private शब्द यसको सङ्केत हो।'
          }
        },
        {
          pre: 'An abstract class declares draw() = 0 and\nleaves every derived class to implement it.',
          answer: 'abstr',
          why: {
            en: 'The class states WHAT must exist without saying HOW. A pure virtual function is abstraction in its strongest form.',
            ne: 'क्लासले के हुनुपर्छ भन्छ, कसरी भन्दैन। Pure virtual फङ्सन abstraction को सबैभन्दा बलियो रूप हो।'
          }
        },
        {
          pre: 'All the data and functions of a Student are\nplaced together inside one class.',
          answer: 'encap',
          why: {
            en: 'Binding data and functions into a single unit IS the definition of encapsulation — the wrapping itself, before any hiding.',
            ne: 'डाटा र फङ्सनलाई एउटै इकाइमा बाँध्नु नै encapsulation को परिभाषा हो — लुकाउनुभन्दा अघि, बाँध्ने काम आफैंमा।'
          }
        },
        {
          pre: 'A car\'s dashboard shows speed but not how\nthe speedometer measures it.',
          answer: 'abstr',
          why: {
            en: 'Necessary information shown, mechanism hidden. If instead the question said the speed value could not be changed from outside, that would be encapsulation.',
            ne: 'आवश्यक जानकारी देखाइएको, संयन्त्र लुकाइएको। बरु "गति बाहिरबाट बदल्न मिल्दैन" भनेको भए त्यो encapsulation हुन्थ्यो।'
          }
        }
      ]
    },

    /* ---- OOP u5: which type of inheritance? ----
       5.5 draws the five types. The paper asks the student to IDENTIFY
       one from a description or to draw it — practice, not reading. */
    inhertype: {
      title: { en: 'Which type of inheritance?', ne: 'यो कुन प्रकारको inheritance हो?' },
      lead: {
        en: 'Count the classes and count the arrows. One base with many children is not the same as one child with many parents, and multilevel is not multiple.',
        ne: 'क्लास गन्नुहोस् र तीर गन्नुहोस्। एउटा base का धेरै छोरा र एउटा छोराका धेरै बाबु फरक कुरा हुन्, र multilevel भनेको multiple होइन।'
      },
      options: [
        { id: 'single', label: { en: 'Single', ne: 'Single' } },
        { id: 'multiple', label: { en: 'Multiple', ne: 'Multiple' } },
        { id: 'multilevel', label: { en: 'Multilevel', ne: 'Multilevel' } },
        { id: 'hier', label: { en: 'Hierarchical', ne: 'Hierarchical' } }
      ],
      cases: [
        {
          pre: 'class B : public A { };\nclass C : public B { };\n\n    A  →  B  →  C',
          answer: 'multilevel',
          why: {
            en: 'A chain: C derives from B, and B derives from A. Each class has ONE parent, but the chain has more than one level. Students call this "multiple" — it is not, because no class here has two parents.',
            ne: 'एउटा शृंखला: C, B बाट र B, A बाट आउँछ। हरेक क्लासको एउटै बाबु छ, तर शृंखलामा एकभन्दा बढी तह छन्। विद्यार्थीले यसलाई "multiple" भन्छन् — होइन, किनभने कुनै क्लासका दुई बाबु छैनन्।'
          }
        },
        {
          pre: 'class C : public A, public B { };\n\n    A     B\n     \\   /\n       C',
          answer: 'multiple',
          why: {
            en: 'ONE class with TWO base classes. This is the only type where a single class has more than one parent, and it is the one C++ allows while Java does not.',
            ne: 'एउटै क्लासका दुई base क्लास। एउटै क्लासका एकभन्दा बढी बाबु हुने प्रकार यही मात्र हो, र C++ ले दिने तर Java ले नदिने पनि यही हो।'
          }
        },
        {
          pre: 'class Dog : public Animal { };\nclass Cat : public Animal { };\n\n      Animal\n      /    \\\n    Dog    Cat',
          answer: 'hier',
          why: {
            en: 'ONE base with MANY derived classes — the branches go downwards from a single parent. Compare with multiple, where the arrows converge upwards into one child.',
            ne: 'एउटै base बाट धेरै derived क्लास — हाँगा एउटै बाबुबाट तल जान्छन्। Multiple सँग तुलना गर्नुहोस्, जहाँ तीर माथितिर एउटै छोरामा मिल्छन्।'
          }
        },
        {
          pre: 'class Dog : public Animal { };\n\n    Animal  →  Dog',
          answer: 'single',
          why: {
            en: 'One base, one derived, one arrow. Every other type is built from this one, which is why it is worth being able to name it quickly.',
            ne: 'एउटा base, एउटा derived, एउटा तीर। बाँकी सबै प्रकार यसैबाट बन्छन्, त्यसैले छिटो नाम दिन सक्नु काम लाग्छ।'
          }
        },
        {
          pre: 'class B : public A { };\nclass C : public A { };\nclass D : public B { };',
          answer: 'hier',
          why: {
            en: 'Read the widest shape first. A has two children (B and C), which makes the diagram hierarchical; D hanging under B adds a level but does not change what the whole picture is called. A paper asking for ONE name wants the dominant shape — and a hybrid is what you call it if the question allows.',
            ne: 'पहिले सबैभन्दा फराकिलो आकार हेर्नुहोस्। A का दुई छोरा (B र C) छन्, त्यसैले चित्र hierarchical हो; B मुनिको D ले तह थप्छ तर पूरै चित्रको नाम बदल्दैन। एउटै नाम मागिएमा प्रमुख आकार भन्नुहोस् — प्रश्नले दिए hybrid पनि भन्न सकिन्छ।'
          }
        }
      ]
    },

    /* ---- OOP Unit 1: which data structure does this situation need? ----
       Added in the Phase 9 continuation. Unit 1 is the heaviest unit in
       its subject — 20 hrs, 15 marks — and it was the only one of the
       twenty-four with no decision drill at all. It has the stack/queue
       simulator, which teaches HOW each structure operates, and classifying
       a situation is a different skill: topic 1.5 asks for linear against
       non-linear, and the SEE asks it as "which would you use, and why". */
    dsclassify: {
      title: { en: 'Which data structure does this need?', ne: 'यसलाई कुन डाटा स्ट्रक्चर चाहिन्छ?' },
      lead: {
        en: 'Two questions settle every case. Is the shape a LINE or does it BRANCH? If it is a line, which end do things leave from — the end they went in at, or the other one? Commit before you check.',
        ne: 'दुई प्रश्नले हरेक केस मिलाउँछ। आकार रेखा हो कि हाँगा फैलिन्छ? रेखा भए चीज कुन छेउबाट निस्कन्छ — भित्र गएकै छेउबाट कि अर्कोबाट? जाँच्नुअघि छान्नुहोस्।'
      },
      options: [
        { id: 'stack', label: { en: 'Stack', ne: 'Stack' } },
        { id: 'queue', label: { en: 'Queue', ne: 'Queue' } },
        { id: 'tree',  label: { en: 'Tree',  ne: 'Tree'  } },
        { id: 'graph', label: { en: 'Graph', ne: 'Graph' } }
      ],
      cases: [
        {
          pre: 'BROWSER HISTORY\n\nvisited   A  ->  B  ->  C\nnow press  Back',
          answer: 'stack',
          why: {
            en: 'Back returns to B, the page visited most recently — last in, first out. Pages go in and come out at the same end, and a stack is the only structure that behaves that way.',
            ne: 'Back ले सबैभन्दा पछिल्लो पृष्ठ B मा फर्काउँछ — पछि आएको पहिले जाने। पृष्ठहरू उही छेउबाट भित्र–बाहिर हुन्छन्, र यस्तो व्यवहार stack ले मात्र गर्छ।'
          }
        },
        {
          pre: 'PRINTER\n\njobs arrive   report, essay, marksheet\nwhich one prints first?',
          answer: 'queue',
          why: {
            en: 'The report arrived first and prints first — first in, first out. Things enter at the rear and leave from the front, which is two different ends, and that is what makes it a queue rather than a stack.',
            ne: 'report पहिले आयो र पहिले छापिन्छ — पहिले आएको पहिले जाने। चीज पछाडिबाट भित्र र अगाडिबाट बाहिर जान्छ — दुई फरक छेउ, र यही फरकले यसलाई stack होइन queue बनाउँछ।'
          }
        },
        {
          pre: 'FOLDERS ON A DISK\n\nSchool/\n  Class10/\n    Science/\n    Maths/',
          answer: 'tree',
          why: {
            en: 'Every folder sits inside exactly one parent folder and may hold many children, and no path ever leads back to where it started. One parent, many children, no cycle — that is a tree, and it is non-linear.',
            ne: 'हरेक फोल्डर ठ्याक्कै एउटै अभिभावक फोल्डरभित्र हुन्छ र धेरै छोरा राख्न सक्छ, र कुनै बाटो सुरुको ठाउँमा फर्किंदैन। एउटै अभिभावक, धेरै छोरा, चक्र छैन — यही tree हो, र यो non-linear हो।'
          }
        },
        {
          pre: 'BUS ROUTES\n\nKathmandu -- Pokhara\nPokhara   -- Chitwan\nChitwan   -- Kathmandu',
          answer: 'graph',
          why: {
            en: 'The three routes close into a loop, so you can leave Kathmandu and arrive back at it. A tree can never do that, and no city is the parent of another — any node may connect to any node, which is a graph.',
            ne: 'तीन मार्ग मिलेर चक्र बन्छ, त्यसैले काठमाडौंबाट निस्केर काठमाडौं फर्कन सकिन्छ। Tree ले यो कहिल्यै गर्न सक्दैन, र कुनै सहर अर्कोको अभिभावक होइन — कुनै पनि बिन्दु कुनै पनि बिन्दुसँग जोडिन सक्छ, यही graph हो।'
          }
        },
        {
          pre: 'TEXT EDITOR\n\ntyped   "Gyan" , "setu" , "!"\nnow press  Ctrl+Z',
          answer: 'stack',
          why: {
            en: 'Undo removes the exclamation mark, the most recent change, and a second undo removes "setu". The order is the reverse of the order things were done in, so the structure holding them is a stack.',
            ne: 'Undo ले सबैभन्दा पछिल्लो परिवर्तन "!" हटाउँछ, र दोस्रो undo ले "setu"। क्रम काम गरेको क्रमको ठ्याक्कै उल्टो हुन्छ, त्यसैले यिनलाई राख्ने संरचना stack हो।'
          }
        },
        {
          pre: 'TICKET COUNTER\n\n5 people standing in line\none more person arrives',
          answer: 'queue',
          why: {
            en: 'The new person joins at the back and is served sixth, while the person at the front is served next. Insertion at one end and deletion at the other is the definition of a queue.',
            ne: 'नयाँ मान्छे पछाडि उभिन्छ र छैटौं पालो पाउँछ, अगाडिकोले भर्खरको पालो पाउँछ। एक छेउबाट राख्ने र अर्को छेउबाट हटाउने — queue को परिभाषा यही हो।'
          }
        }
      ]
    },

    /* ---- OOP Unit 6: overloading, overriding, or neither? ----
       The unit already states the rule in a nine-row comparison table.
       This is the table APPLIED, which is the part the paper tests: the
       third option exists because a redefinition without `virtual` looks
       exactly like overriding and does not behave like it. */
    polykind: {
      title: { en: 'Overloading, overriding, or neither?', ne: 'Overloading, overriding, कि दुवै होइन?' },
      lead: {
        en: 'Three checks, in order. Are the functions in ONE class or in a base and a derived class? Are the parameter lists the same or different? And if they are the same, is the base function virtual? Only the last one decides run-time behaviour.',
        ne: 'तीन जाँच, क्रमैसँग। फङ्सनहरू एउटै क्लासमा छन् कि base र derived मा? प्यारामिटर सूची उही छ कि फरक? र उही भए base को फङ्सन virtual छ? run-time व्यवहार अन्तिमले मात्र तय गर्छ।'
      },
      options: [
        { id: 'overload', label: { en: 'Overloading — compile-time', ne: 'Overloading — compile-time' } },
        { id: 'override', label: { en: 'Overriding — run-time', ne: 'Overriding — run-time' } },
        { id: 'neither',  label: { en: 'Neither — the base version runs', ne: 'दुवै होइन — base कै संस्करण चल्छ' } }
      ],
      cases: [
        {
          pre: 'class Area {\npublic:\n    void find(int s);\n    void find(int l, int b);\n};',
          answer: 'overload',
          why: {
            en: 'One class, one name, two different parameter lists — one argument against two. There is no inheritance here at all, and the compiler can pick the right function from the call itself, so this is compile-time polymorphism.',
            ne: 'एउटै क्लास, एउटै नाम, दुई फरक प्यारामिटर सूची — एक र दुई। यहाँ inheritance नै छैन, र compiler ले call आफैंबाट सही फङ्सन छान्न सक्छ, त्यसैले यो compile-time polymorphism हो।'
          }
        },
        {
          pre: 'class Shape {\npublic:\n    virtual void draw();\n};\nclass Circle : public Shape {\npublic:\n    void draw();\n};\n\nShape* p = new Circle;\np->draw();',
          answer: 'override',
          why: {
            en: 'Base and derived, the same name and the same empty parameter list, and the base function is virtual. The call goes through a base pointer, so the decision waits until the program runs and Circle::draw is what executes.',
            ne: 'Base र derived, उही नाम र उही खाली प्यारामिटर सूची, र base को फङ्सन virtual छ। Call base pointer मार्फत जाने भएकाले निर्णय प्रोग्राम चल्दासम्म कुर्छ र Circle::draw चल्छ।'
          }
        },
        {
          pre: 'class Shape {\npublic:\n    void draw();          // no virtual\n};\nclass Circle : public Shape {\npublic:\n    void draw();\n};\n\nShape* p = new Circle;\np->draw();',
          answer: 'neither',
          why: {
            en: 'It looks like the case above with one word removed, and that word is the whole mechanism. Without virtual the compiler decides from the POINTER type, which is Shape, so Shape::draw runs even though the object is a Circle. This is function hiding, not overriding.',
            ne: 'यो माथिको केसबाट एउटा शब्द हटाएको जस्तै देखिन्छ, र त्यो शब्द नै पूरै प्रविधि हो। virtual नभए compiler ले POINTER को प्रकार — अर्थात् Shape — बाट निर्णय गर्छ, त्यसैले वस्तु Circle भए पनि Shape::draw चल्छ। यो function hiding हो, overriding होइन।'
          }
        },
        {
          pre: 'class Box {\npublic:\n    int  size();\n    void size();          // only the return type differs\n};',
          answer: 'neither',
          why: {
            en: 'The parameter lists are identical and only the return type differs, which C++ does not accept — the compiler cannot tell from a call which one you meant. This will not compile, so it is not overloading, and with no derived class it cannot be overriding either.',
            ne: 'प्यारामिटर सूची ठ्याक्कै उही छ, फरक रिटर्न टाइपमा मात्र — C++ ले यो स्वीकार गर्दैन, किनभने call हेरेर compiler ले कुन चाहिएको भन्न सक्दैन। यो compile हुँदैन, त्यसैले overloading होइन, र derived क्लास नै नभएकाले overriding पनि होइन।'
          }
        },
        {
          pre: 'class Animal {\npublic:\n    virtual void speak();\n};\nclass Dog : public Animal {\npublic:\n    void speak();\n};\n\nDog d;\nd.speak();',
          answer: 'override',
          why: {
            en: 'Dog::speak replaces Animal::speak with the same signature, so it is overriding and the derived version runs. Note that it runs here because the object type is known exactly, not because of virtual — virtual only changes what happens through a base pointer or reference.',
            ne: 'Dog::speak ले उही हस्ताक्षरसहित Animal::speak लाई प्रतिस्थापन गर्छ, त्यसैले यो overriding हो र derived कै संस्करण चल्छ। तर यहाँ चल्नुको कारण virtual होइन, वस्तुको प्रकार ठ्याक्कै थाहा हुनु हो — virtual ले base pointer वा reference मार्फत मात्र फरक पार्छ।'
          }
        },
        {
          pre: 'class Print {\npublic:\n    void show(int x);\n    void show(char c);\n    void show(double d);\n};',
          answer: 'overload',
          why: {
            en: 'Three functions, one name, parameter TYPES different each time. Overloading does not require a different number of parameters — a different type, or even a different order, is enough for the compiler to tell them apart.',
            ne: 'तीन फङ्सन, एउटै नाम, हरेक पटक प्यारामिटरको प्रकार फरक। Overloading लाई प्यारामिटरको सङ्ख्या फरक हुनु जरुरी छैन — प्रकार फरक, वा क्रम मात्र फरक भए पनि compiler ले छुट्याउन सक्छ।'
          }
        }
      ]
    },

    /* ---- GRADE 9 · Computer Fundamentals Unit 1: which BASIS of
       classification is this? Added in Phase 12.

       The unit lists five bases, and the paper does not ask a student to
       recite them — it names a category and asks which basis it belongs
       to, or describes a machine and asks where it sits. Those are
       judgements against one rule, which is what this component is for.

       The trap it drills: "supercomputer" and "digital" sound like the
       same kind of word and answer two different questions. ---- */
    /* ---- Grade 9 Unit 2: the four readers, and the rest of the input unit.
       OMR, OCR, BCR and MICR are the most-confused group in this subject,
       and the confusion is specific: students know all four names and
       attach them to the wrong paper. So every case here describes what is
       PHYSICALLY ON THE PAGE and asks for the device, which is the order
       the exam question comes in. Two cases differ only in that detail. */
    cfinput: {
      title: { en: 'Which input device does this job need?', ne: 'यो कामलाई कुन input device चाहिन्छ?' },
      lead: {
        en: 'Each case describes what has to be read or captured. Decide which device the job needs. Ask what is physically there — a filled box, a letter shape, a stripe pattern, magnetic ink, a sound, or a movement.',
        ne: 'हरेक केसमा के पढ्नु वा कैद गर्नुपर्ने हो लेखिएको छ। कामलाई कुन उपकरण चाहिन्छ छान्नुहोस्। त्यहाँ भौतिक रूपमा के छ सोध्नुहोस् — भरिएको बाकस, अक्षरको आकार, धर्काको बान्की, चुम्बकीय मसी, आवाज, कि चाल।'
      },
      options: [
        { id: 'omr',  label: { en: 'OMR', ne: 'OMR' } },
        { id: 'ocr',  label: { en: 'OCR', ne: 'OCR' } },
        { id: 'bcr',  label: { en: 'Bar code reader', ne: 'Bar code reader' } },
        { id: 'micr', label: { en: 'MICR', ne: 'MICR' } },
        { id: 'mic',  label: { en: 'Microphone', ne: 'Microphone' } }
      ],
      cases: [
        {
          pre: 'An entrance examination answer sheet where\ncandidates shaded boxes with a pencil.',
          answer: 'omr',
          why: {
            en: 'The machine only has to find out WHICH BOX IS FILLED. It does not read a letter or a number — the position of the mark carries the meaning. That is Optical Mark Reader.',
            ne: 'मेसिनले कुन बाकस भरिएको छ मात्र पत्ता लगाउनुपर्छ। अक्षर वा अंक पढ्नुपर्दैन — चिन्हको ठाउँले नै अर्थ बोक्छ। त्यही Optical Mark Reader हो।'
          }
        },
        {
          pre: 'A printed page from a book is to be turned\ninto a document that can be edited.',
          answer: 'ocr',
          why: {
            en: 'Editable text means the SHAPES OF THE LETTERS have to be recognised, not photographed. A scanner alone gives a picture; OCR is what reads characters out of it. Optical Character Reader.',
            ne: 'सम्पादन गर्न मिल्ने पाठ भनेको अक्षरको आकार चिन्नुपर्छ, फोटो खिचे पुग्दैन। Scanner ले तस्बिर मात्र दिन्छ; त्यसबाट अक्षर पढ्ने काम OCR को हो।'
          }
        },
        {
          pre: 'A shop counter must look up the price of a\npacket from the striped label on it.',
          answer: 'bcr',
          why: {
            en: 'The stripes are a number in disguise. The reader turns the pattern back into that number, and the shop computer looks the price up. The price is not on the label — only the code is.',
            ne: 'धर्का भनेको लुकेको संख्या हो। Reader ले बान्कीलाई संख्यामा फर्काउँछ र पसलको कम्प्युटरले मूल्य खोज्छ। लेबलमा मूल्य हुँदैन — कोड मात्र हुन्छ।'
          }
        },
        {
          pre: 'A bank must read the account number printed\nalong the bottom edge of a cheque.',
          answer: 'micr',
          why: {
            en: 'Cheques are printed in magnetic ink precisely so that a photocopy cannot be read by the machine. The reader senses MAGNETISM, not shape — which is why a photocopied cheque is rejected.',
            ne: 'चेक चुम्बकीय मसीमा छापिनुको कारण नै यही हो — फोटोकपी मेसिनले पढ्न सक्दैन। Reader ले आकार होइन, चुम्बकत्व पहिचान गर्छ।'
          }
        },
        {
          pre: 'A student records a Nepali song to add to a\nmultimedia presentation.',
          answer: 'mic',
          why: {
            en: 'Sound is a wave in the air, and nothing on this list except the microphone converts a wave into binary. The other four all read something printed on paper.',
            ne: 'आवाज हावामा चल्ने तरंग हो, र यो सूचीमा microphone बाहेक कसैले तरंगलाई binary मा बदल्दैन। अरू चारैले कागजमा छापिएको कुरा पढ्छन्।'
          }
        },
        {
          pre: 'A school wants a handwritten attendance\nregister turned into typed records.',
          answer: 'ocr',
          why: {
            en: 'Handwritten still means CHARACTERS, so it is OCR again — modern OCR reads handwriting as well as print. OMR is the tempting wrong answer: a register has boxes, but here the names inside them have to be read, not just counted as filled.',
            ne: 'हस्तलिखित भए पनि अक्षर नै हो, त्यसैले फेरि OCR — आजको OCR ले छापा र हस्तलेखन दुवै पढ्छ। OMR लोभ्याउने गलत उत्तर हो: रजिस्टरमा बाकस त छन्, तर यहाँ भित्रका नाम पढ्नुपर्छ, भरिएको गन्नु मात्र होइन।'
          }
        }
      ]
    },

    /* ---- Grade 9 Unit 3: who is the software working for?
       Students classify software by familiarity — "I have heard of it, so
       it is an application" — which puts the antivirus and the compiler
       on the wrong side. Every case here is settled by one question the
       lead states explicitly, so the drill teaches the test and not the
       six answers. */
    cfsoftware: {
      title: { en: 'System, application or utility?', ne: 'System, application कि utility?' },
      lead: {
        en: 'Decide which kind of software each one is. The test: would the computer still work without it? If no, it is system software. If yes but it still looks after the machine, it is a utility. If yes and it does a job for you, it is an application.',
        ne: 'हरेक कुन किसिमको सफ्टवेयर हो छान्नुहोस्। जाँच: यो नभए पनि कम्प्युटर चल्छ? चल्दैन भने system software। चल्छ तर मेसिनकै हेरचाह गर्छ भने utility। चल्छ र तपाईंको काम गर्छ भने application।'
      },
      options: [
        { id: 'system', label: { en: 'System', ne: 'System' } },
        { id: 'app',    label: { en: 'Application', ne: 'Application' } },
        { id: 'util',   label: { en: 'Utility', ne: 'Utility' } }
      ],
      cases: [
        {
          pre: 'WINDOWS — loads first when the machine starts\nand runs everything else.',
          answer: 'system',
          why: {
            en: 'An operating system is the clearest case of system software: without it the hardware has nothing to obey, and every other program is started by it.',
            ne: 'Operating system नै system software को सबैभन्दा स्पष्ट उदाहरण हो: यो नभए हार्डवेयरसँग मान्ने निर्देशन हुँदैन, र अरू हरेक प्रोग्राम यसैले सुरु गर्छ।'
          }
        },
        {
          pre: 'MS-WORD — used to type a letter.',
          answer: 'app',
          why: {
            en: 'It does a job the USER wanted done. Remove it and the computer still starts and runs perfectly; you simply cannot type that letter.',
            ne: 'यसले प्रयोगकर्ताले चाहेको काम गर्छ। हटाए पनि कम्प्युटर सुरु हुन्छ र राम्रै चल्छ; चिठी टाइप गर्न मात्र पाइँदैन।'
          }
        },
        {
          pre: 'ANTIVIRUS — scans the disk for infected files.',
          answer: 'util',
          why: {
            en: 'The one students get wrong. It is not doing YOUR job — nobody sits down to scan for viruses as an end in itself. It looks after the machine, so it is a utility, even though you start it like an application.',
            ne: 'विद्यार्थीले बिगार्ने केस यही हो। यसले तपाईंको काम गर्दैन — भाइरस खोज्नु आफैंमा कसैको उद्देश्य होइन। मेसिनकै हेरचाह गर्छ, त्यसैले utility — application जस्तै खोल्ने भए पनि।'
          }
        },
        {
          pre: 'A C COMPILER — turns a program a student wrote\ninto instructions the processor understands.',
          answer: 'system',
          why: {
            en: 'The other case students miss. A language translator serves the MACHINE: it produces the machine code without which the processor cannot run the program at all. Compiler, interpreter and assembler are all system software.',
            ne: 'विद्यार्थीले छुटाउने अर्को केस। भाषा अनुवादकले मेसिनकै सेवा गर्छ: यसले बनाउने machine code विना प्रोसेसरले प्रोग्राम चलाउनै सक्दैन। Compiler, interpreter र assembler — सबै system software।'
          }
        },
        {
          pre: 'A FILE COMPRESSION TOOL — makes a folder\nsmaller so it can be emailed.',
          answer: 'util',
          why: {
            en: 'Compressing is maintenance on files, not the task you set out to do. Backup tools, disk cleaners and compressors are the standard utility examples.',
            ne: 'थिच्नु भनेको फाइलको मर्मत हो, तपाईंले गर्न खोजेको काम होइन। Backup, disk cleaner र compressor — मानक utility उदाहरण।'
          }
        },
        {
          pre: 'A SCHOOL RESULT SYSTEM — enters marks and\nprints report cards.',
          answer: 'app',
          why: {
            en: 'Written for one organisation and one job, which is what application software is. Being custom-made does not make it system software — who it serves is what decides, not who wrote it.',
            ne: 'एउटै संस्था र एउटै कामका लागि लेखिएको — application software भनेकै यही हो। बनाइएको आफ्नै हो भन्दैमा system software हुँदैन; कसले लेख्यो होइन, कसको सेवा गर्छ भन्नेले तय गर्छ।'
          }
        }
      ]
    },

    /* ---- Grade 9 Unit 4: identify a memory from a property.
       The exam never says "what is DRAM" — it describes a behaviour and
       asks which memory behaves that way. So every case here is a
       property, and the lead gives the two questions that sort them:
       does it survive a power cut, and can the CPU reach it directly. */
    cfmemory: {
      title: { en: 'Which memory is being described?', ne: 'कुन मेमोरीको वर्णन हो?' },
      lead: {
        en: 'Each case describes a behaviour, not a name. Ask two questions in order: does it survive the power going off, and can the CPU read it directly? Those two answers place almost every memory in this subject.',
        ne: 'हरेक केसमा नाम होइन, व्यवहार लेखिएको छ। क्रमैसँग दुई प्रश्न सोध्नुहोस्: बत्ती गएपछि बाँच्छ? CPU ले सिधै पढ्न सक्छ? यी दुई उत्तरले यस विषयका झन्डै सबै मेमोरी ठाउँमा राख्छन्।'
      },
      options: [
        { id: 'ram',   label: { en: 'RAM', ne: 'RAM' } },
        { id: 'rom',   label: { en: 'ROM', ne: 'ROM' } },
        { id: 'cache', label: { en: 'Cache', ne: 'Cache' } },
        { id: 'sec',   label: { en: 'Secondary storage', ne: 'Secondary storage' } }
      ],
      cases: [
        {
          pre: 'Holds the instructions that run the moment the\npower is switched on, before any disk is read.',
          answer: 'rom',
          why: {
            en: 'Before any disk is read is the clue. The startup instructions cannot be on the disk, because nothing yet knows how to read a disk. They are in ROM, which is non-volatile and therefore still there.',
            ne: 'सुराक "कुनै डिस्क पढिनुअघि" भन्नेमा छ। सुरुवाती निर्देशन डिस्कमा हुनै सक्दैन, किनभने डिस्क कसरी पढ्ने भन्नै कसैलाई थाहा छैन। ती ROM मा हुन्छन्, जुन non-volatile छ।'
          }
        },
        {
          pre: 'The essay being typed right now lives here,\nand vanishes if the power is cut.',
          answer: 'ram',
          why: {
            en: 'Work in progress plus lost on power cut is RAM. It is read-write and volatile, which is exactly why "save" means copying it somewhere that is not.',
            ne: 'चलिरहेको काम र बत्ती गएपछि हराउने — यो RAM हो। पढ्न–लेख्न मिल्ने र volatile; "save" भनेको नहराउने ठाउँमा सार्नु भनेकै त्यसैले हो।'
          }
        },
        {
          pre: 'Very small, very fast, sits between the processor\nand main memory, built onto the CPU chip.',
          answer: 'cache',
          why: {
            en: 'Between the CPU and main memory is the definition of cache. It exists only because the CPU is much faster than RAM, and it is made of SRAM, which needs no refreshing.',
            ne: 'CPU र main memory बीचमा हुनु नै cache को परिभाषा हो। CPU, RAM भन्दा धेरै छिटो भएकाले मात्र यो छ, र यो SRAM मा बनेको हुन्छ — refresh चाहिँदैन।'
          }
        },
        {
          pre: 'Keeps last year’s photographs safely for a year\nwith the computer switched off.',
          answer: 'sec',
          why: {
            en: 'Permanent keeping with the power off is secondary storage — hard disk, SSD, optical disc or pen drive. All non-volatile, and none of them readable by the CPU without being copied into RAM first.',
            ne: 'बत्ती बन्द अवस्थामै स्थायी रूपमा राख्नु भनेको secondary storage हो — hard disk, SSD, optical disc वा pen drive। सबै non-volatile, र RAM मा नसारी CPU ले कुनै पनि पढ्न सक्दैन।'
          }
        },
        {
          pre: 'Each bit is a charge in a tiny capacitor that leaks,\nso it must be refreshed thousands of times a second.',
          answer: 'ram',
          why: {
            en: 'Refreshing is DRAM, and DRAM is what main memory is made of — so the answer is RAM. Cache is SRAM, which holds each bit in a circuit and never needs refreshing. Refresh is the word that separates the two.',
            ne: 'Refresh भनेको DRAM हो, र main memory DRAM कै बनेको हुन्छ — त्यसैले उत्तर RAM। Cache चाहिँ SRAM हो, जसले bit सर्किटमा राख्छ र refresh चाहिँदैन। दुईलाई छुट्याउने शब्द refresh नै हो।'
          }
        },
        {
          pre: 'A technician erases it with ultraviolet light\nthrough a small window on the chip.',
          answer: 'rom',
          why: {
            en: 'That is EPROM — Erasable Programmable ROM — and EPROM is a kind of ROM. Being erasable does not make it RAM: ROM is read-only in NORMAL USE, and erasing it needs a special process outside the running computer.',
            ne: 'यो EPROM — Erasable Programmable ROM — हो, र EPROM, ROM कै एक किसिम हो। मेटिन सक्ने भयो भन्दैमा RAM हुँदैन: ROM भनेको सामान्य प्रयोगमा पढ्न मात्र मिल्ने हो, र मेट्न चलिरहेको कम्प्युटरबाहिरको विशेष प्रक्रिया चाहिन्छ।'
          }
        }
      ]
    },

    /* ---- Grade 9 Unit 5: match a task to the Internet service built for it.
       Nine services learned as nine definitions stay separate from the
       nine jobs they do. Telnet and remote control are deliberately
       adjacent here: they are the pair students swap, and the difference
       — a command line versus a whole desktop — only becomes memorable
       when both appear in the same six cases. */
    cfinternet: {
      title: { en: 'Which Internet service does this need?', ne: 'यसलाई कुन इन्टरनेट सेवा चाहिन्छ?' },
      lead: {
        en: 'Each case is a real task. Pick the service built for it. Ask who the message is for: one named person, everybody, a machine you are operating, or a shop you are paying.',
        ne: 'हरेक केस वास्तविक काम हो। त्यसैका लागि बनेको सेवा छान्नुहोस्। सन्देश कसका लागि हो सोध्नुहोस्: एक जना तोकिएको व्यक्ति, सबै, तपाईंले चलाइरहेको मेसिन, कि तिर्न लागेको पसल।'
      },
      options: [
        { id: 'email',  label: { en: 'E-mail', ne: 'E-mail' } },
        { id: 'www',    label: { en: 'WWW', ne: 'WWW' } },
        { id: 'ecom',   label: { en: 'E-commerce', ne: 'E-commerce' } },
        { id: 'egov',   label: { en: 'E-governance', ne: 'E-governance' } },
        { id: 'remote', label: { en: 'Remote control', ne: 'Remote control' } },
        { id: 'telnet', label: { en: 'Telnet', ne: 'Telnet' } }
      ],
      cases: [
        {
          pre: 'Sending your completed assignment to one\nteacher, who will read it tomorrow.',
          answer: 'email',
          why: {
            en: 'One named recipient, and it waits until they look — that is store-and-forward, which is what e-mail is. The teacher does not have to be online when you send it.',
            ne: 'एक जना तोकिएको प्रापक, र उहाँले हेरेपछि मात्र पढिने — यही store-and-forward हो, र इमेल भनेकै त्यही। पठाउँदा शिक्षक अनलाइन हुनै पर्दैन।'
          }
        },
        {
          pre: 'Paying your land revenue to the municipality\nwithout travelling to the office.',
          answer: 'egov',
          why: {
            en: 'A GOVERNMENT service delivered online is e-governance. Money changes hands, which makes e-commerce tempting — but e-commerce is buying and selling between a customer and a business, not paying the state what you owe it.',
            ne: 'सरकारी सेवा अनलाइन दिनु भनेको e-governance हो। पैसा सर्ने भएकाले e-commerce लोभ्याउँछ — तर e-commerce भनेको ग्राहक र व्यवसायबीचको किनबेच हो, राज्यलाई तिर्नुपर्ने तिर्नु होइन।'
          }
        },
        {
          pre: 'A technician in Pokhara takes over the screen of\na sick computer in Butwal to repair it.',
          answer: 'remote',
          why: {
            en: 'Taking over the SCREEN — the whole desktop as a picture — is remote control. Telnet is the near-miss: it would give the technician a text command line on that machine, not its desktop.',
            ne: 'पर्दा नै — पूरै डेस्कटप तस्बिरका रूपमा — नियन्त्रणमा लिनु remote control हो। Telnet नजिकैको गलत उत्तर: त्यसले त्यो मेसिनमा पाठको command line दिन्थ्यो, डेस्कटप होइन।'
          }
        },
        {
          pre: 'Ordering a pair of shoes from Daraz and paying\nwith eSewa.',
          answer: 'ecom',
          why: {
            en: 'Buying goods from a business over the Internet, payment included. That is e-commerce by definition, and Daraz plus eSewa is the Nepali example an examiner is looking for.',
            ne: 'व्यवसायबाट इन्टरनेटमार्फत सामान किन्नु, भुक्तानीसहित — परिभाषाअनुसारै e-commerce। Daraz र eSewa नै परीक्षकले खोज्ने नेपाली उदाहरण हो।'
          }
        },
        {
          pre: 'Reading linked pages about the Himalayas in a\nbrowser, following one link to the next.',
          answer: 'www',
          why: {
            en: 'Pages joined by links and read in a browser is the World Wide Web — one service on the Internet, not the Internet itself.',
            ne: 'लिंकले जोडिएका पृष्ठ browser मा पढ्नु भनेको World Wide Web हो — इन्टरनेटमाथिको एउटा सेवा, इन्टरनेट आफैं होइन।'
          }
        },
        {
          pre: 'A student logs in to a university computer and\ntypes commands at its text prompt.',
          answer: 'telnet',
          why: {
            en: 'A TEXT PROMPT on a distant machine is Telnet. The task is almost the same as the technician case, and the word that separates them is what you get: a command line here, a desktop there.',
            ne: 'टाढाको मेसिनमा पाठको prompt पाउनु Telnet हो। काम प्राविधिकको केससँग झन्डै उस्तै छ; छुट्याउने शब्द के पाइन्छ भन्ने हो — यहाँ command line, त्यहाँ डेस्कटप।'
          }
        }
      ]
    },

    /* ---- Grade 9 Unit 6: identify the multimedia component.
       Five components, and only one pair is ever confused: animation and
       video, because both move. Three of the six cases below are about
       that pair, approached from different sides, because the rest of
       the set is not where the marks are lost. */
    cfmultimedia: {
      title: { en: 'Which component of multimedia?', ne: 'मल्टिमिडियाको कुन भाग?' },
      lead: {
        en: 'Each case describes something in a presentation. Name the component. Ask two questions: does it move, and was it recorded from something real or created frame by frame?',
        ne: 'हरेक केसमा प्रस्तुतीकरणको कुनै वस्तुको वर्णन छ। भागको नाम भन्नुहोस्। दुई प्रश्न सोध्नुहोस्: यो चल्छ? र वास्तविक कुराबाट रेकर्ड गरिएको हो कि फ्रेम–फ्रेम बनाइएको?'
      },
      options: [
        { id: 'text',  label: { en: 'Text', ne: 'Text' } },
        { id: 'audio', label: { en: 'Audio', ne: 'Audio' } },
        { id: 'video', label: { en: 'Video', ne: 'Video' } },
        { id: 'image', label: { en: 'Image', ne: 'Image' } },
        { id: 'anim',  label: { en: 'Animation', ne: 'Animation' } }
      ],
      cases: [
        {
          pre: 'A cartoon of a water cycle, drawn by hand and\nplayed so the drops appear to fall.',
          answer: 'anim',
          why: {
            en: 'It moves, and the frames were DRAWN — nobody filmed these raindrops. Created frame by frame is animation, however realistic it looks.',
            ne: 'चल्छ, र फ्रेम कोरिएका हुन् — यी थोपा कसैले खिचेको होइन। फ्रेम–फ्रेम बनाइएको भए जतिसुकै वास्तविक देखिए पनि animation।'
          }
        },
        {
          pre: 'A clip of last year’s school sports day,\nfilmed on a phone.',
          answer: 'video',
          why: {
            en: 'It moves and it was RECORDED from something that really happened. Filmed on a phone is the giveaway — a camera was pointed at reality.',
            ne: 'चल्छ र साँच्चै भएको कुराबाट रेकर्ड गरिएको। फोनमा खिचिएको भन्ने सुराक हो — क्यामेरा वास्तविकतातिर तेर्सिएको थियो।'
          }
        },
        {
          pre: 'A photograph of Machhapuchhre on the title\nslide. It does not move.',
          answer: 'image',
          why: {
            en: 'A single still picture is an image, whether it is a photograph, a drawing, a chart or a diagram. The test is that nothing changes over time.',
            ne: 'एउटै स्थिर तस्बिर image हो — फोटो, चित्र, चार्ट वा रेखाचित्र जे भए पनि। जाँच यही हो: समयसँगै केही बदलिँदैन।'
          }
        },
        {
          pre: 'The narrator’s recorded voice explaining the\nslide while you look at it.',
          answer: 'audio',
          why: {
            en: 'Sound is audio whether it is speech, music or an effect. Note that a video usually CONTAINS audio — here there is no picture track at all, only the voice.',
            ne: 'आवाज भनेपछि audio — बोली, सङ्गीत वा प्रभाव जे भए पनि। भिडियोभित्र पनि audio हुन्छ, तर यहाँ तस्बिरको भाग नै छैन, स्वर मात्र छ।'
          }
        },
        {
          pre: 'The caption under the photograph, giving the\nmountain’s height in metres.',
          answer: 'text',
          why: {
            en: 'The component students forget to list. Letters, numbers and symbols are text, and text is the only component that carries an exact figure like 6,993 metres without ambiguity.',
            ne: 'विद्यार्थीले सूचीमा छुटाउने भाग यही हो। अक्षर, अंक र चिन्ह text हुन्, र ६,९९३ मिटर जस्तो ठ्याक्कै संख्या अन्योलबिना बोक्ने एक मात्र भाग text नै हो।'
          }
        },
        {
          pre: 'A bar chart that grows upward as the presenter\nclicks, built by the software itself.',
          answer: 'anim',
          why: {
            en: 'A chart alone would be an image — but this one CHANGES OVER TIME, and the frames are generated by the computer rather than filmed. Movement plus created equals animation. This is the case most often answered "image".',
            ne: 'एक्लो चार्ट भए image हुन्थ्यो — तर यो समयसँगै बदलिन्छ, र फ्रेम कम्प्युटरले आफैं बनाउँछ, खिचिएको होइन। चाल + बनाइएको = animation। "image" भनेर सबैभन्दा धेरै गलत हुने केस यही हो।'
          }
        }
      ]
    },

    /* ---- Grade 9 Unit 7: identify the emerging technology from a situation.
       Nine topics for six marks means each is asked briefly, and briefly
       means "which one is this?" rather than "define it". The three pairs
       that get swapped — cloud/distributed, big data/data mining, VR/AR —
       are each represented by the member students pick wrongly. */
    cfemerging: {
      title: { en: 'Which emerging technology is this?', ne: 'यो कुन उदीयमान प्रविधि हो?' },
      lead: {
        en: 'Each case is a real situation. Name the technology. Three questions settle most of them: whose computer is it, can the user still see the room, and is this the data or the digging?',
        ne: 'हरेक केस वास्तविक परिस्थिति हो। प्रविधिको नाम भन्नुहोस्। तीन प्रश्नले धेरैजसो टुङ्ग्याउँछन्: कम्प्युटर कसको हो, प्रयोगकर्ताले कोठा अझै देख्छ कि देख्दैन, र यो data हो कि खोतल्ने काम?'
      },
      options: [
        { id: 'cloud', label: { en: 'Cloud computing', ne: 'Cloud computing' } },
        { id: 'dist',  label: { en: 'Distributed computing', ne: 'Distributed computing' } },
        { id: 'iot',   label: { en: 'IoT', ne: 'IoT' } },
        { id: 'mining',label: { en: 'Data mining', ne: 'Data mining' } },
        { id: 'vr',    label: { en: 'VR', ne: 'VR' } },
        { id: 'ar',    label: { en: 'AR', ne: 'AR' } }
      ],
      cases: [
        {
          pre: 'A school keeps its student records on Google Drive\ninstead of buying a server.',
          answer: 'cloud',
          why: {
            en: 'The question is WHOSE COMPUTER. The school is renting storage on somebody else’s machine over the Internet — that is cloud computing. Distributed is the near-miss, and it would be about how many computers share one task, which is not what is happening here.',
            ne: 'प्रश्न कम्प्युटर कसको हो भन्ने हो। विद्यालयले अर्कैको मेसिनमा इन्टरनेटमार्फत भण्डारण भाडामा लिएको छ — यही cloud computing। Distributed नजिकैको गलत उत्तर हो; त्यो एउटै काम कतिवटा कम्प्युटरले बाँड्छन् भन्ने कुरा हो।'
          }
        },
        {
          pre: 'A weather office splits one forecast calculation\nacross forty computers so it finishes by morning.',
          answer: 'dist',
          why: {
            en: 'ONE task, MANY computers, working together to finish sooner — that is distributed computing. All forty may belong to the weather office itself, which is why this is not about ownership and not cloud.',
            ne: 'एउटै काम, धेरै कम्प्युटर, छिटो सक्न सँगै — यही distributed computing। चालीसै मेसिन मौसम विभागकै हुन सक्छन्, त्यसैले यो स्वामित्वको कुरा होइन र cloud होइन।'
          }
        },
        {
          pre: 'A water tank sends a message to the owner’s phone\nwhen the level drops below a quarter.',
          answer: 'iot',
          why: {
            en: 'A water tank is NOT a computer, and it is on the network — which is exactly the test for IoT. A laptop doing the same thing would not be IoT, because a laptop is already a computer.',
            ne: 'पानीको ट्यांकी कम्प्युटर होइन, र नेटवर्कमा छ — IoT को जाँच ठ्याक्कै यही हो। उही काम ल्यापटपले गरे IoT हुँदैन, किनभने ल्यापटप त कम्प्युटरै हो।'
          }
        },
        {
          pre: 'A telecom company examines years of call records\nand discovers which customers are about to leave.',
          answer: 'mining',
          why: {
            en: 'The records are big data — the material. EXAMINING them to discover a pattern nobody asked for is the activity, and the activity is data mining. "Discovers" is the word that decides it.',
            ne: 'रेकर्ड भनेको big data — सामग्री। कसैले नखोजेको बान्की भेट्न केलाउनु चाहिँ काम हो, र त्यो काम data mining। निर्णय गर्ने शब्द "भेट्छ" हो।'
          }
        },
        {
          pre: 'A trainee surgeon wears a headset and operates\ninside a world that is entirely computer-generated.',
          answer: 'vr',
          why: {
            en: 'Entirely computer-generated and a headset over the eyes: the real room is gone, so this is VR. If the trainee could still see the real operating theatre with labels drawn on it, it would be AR.',
            ne: 'पूरै कम्प्युटरले बनाएको र आँखामा हेडसेट: वास्तविक कोठा हराउँछ, त्यसैले VR। वास्तविक अपरेसन कक्ष देख्दै माथि नाम कोरिएको भए AR हुन्थ्यो।'
          }
        },
        {
          pre: 'A mechanic points a phone at an engine and sees\nthe part names drawn over the real engine.',
          answer: 'ar',
          why: {
            en: 'The real engine is still visible and information has been ADDED on top. That is AR, and the ordinary phone is the clue — VR needs a headset that blocks the world out.',
            ne: 'वास्तविक इन्जिन देखिँदै छ र माथि सूचना थपिएको छ — यही AR, र साधारण फोन नै सुराक हो; VR लाई संसार छेक्ने हेडसेट चाहिन्छ।'
          }
        }
      ]
    },

    cfclassify: {
      title: { en: 'Which basis of classification?', ne: 'कुन आधारको वर्गीकरण हो?' },
      lead: {
        en: 'Each case names a category, or describes a machine. Decide which of the five bases it answers. Ask what QUESTION the word is answering — how big, what signal, how many jobs, what shape, or who made it.',
        ne: 'हरेक केसमा कि एउटा वर्गको नाम छ, कि मेसिनको वर्णन। ती पाँच आधारमध्ये कुनको उत्तर हो छान्नुहोस्। त्यो शब्दले कुन प्रश्नको जवाफ दिँदै छ सोध्नुहोस् — कति ठूलो, कस्तो सङ्केत, कति काम, कस्तो आकार, कि कसले बनायो।'
      },
      options: [
        { id: 'size',    label: { en: 'Size', ne: 'आकार' } },
        { id: 'data',    label: { en: 'Data handling', ne: 'डाटा ह्यान्डलिङ' } },
        { id: 'purpose', label: { en: 'Purpose', ne: 'प्रयोजन' } },
        { id: 'model',   label: { en: 'Model', ne: 'मोडेल' } },
        { id: 'brand',   label: { en: 'Brand', ne: 'ब्रान्ड' } }
      ],
      cases: [
        {
          pre: 'A weather office in Kathmandu runs a\nSUPERCOMPUTER to forecast the monsoon.',
          answer: 'size',
          why: {
            en: 'Supercomputer, mainframe, mini and micro all answer one question: how much work can it do at once. That is the size and power class — not the kind of signal, and not how many different jobs it was built for.',
            ne: 'Supercomputer, mainframe, mini र micro — चारैले एउटै प्रश्नको उत्तर दिन्छन्: एकैपटक कति काम गर्न सक्छ। यो आकार र क्षमताको वर्ग हो — सङ्केतको किसिम होइन, र कति फरक काम गर्न बनेको हो भन्ने पनि होइन।'
          }
        },
        {
          pre: "A hospital machine reads a patient's heartbeat\nas a continuously changing voltage.",
          answer: 'data',
          why: {
            en: 'Continuously changing means an ANALOG signal, and analog, digital and hybrid are the data-handling classes. The clue is always the signal: a measured quantity that slides smoothly is analog, counted 0s and 1s are digital.',
            ne: 'निरन्तर बदलिने भनेको ANALOG सङ्केत हो, र analog, digital, hybrid नै डाटा ह्यान्डलिङका वर्ग हुन्। सुराक सधैं सङ्केत नै हो: बिस्तारै सर्ने नापिने मान analog, गनिने ० र १ digital।'
          }
        },
        {
          pre: 'The computer inside a washing machine does\none job and cannot run anything else.',
          answer: 'purpose',
          why: {
            en: 'One job only makes it special purpose; a machine you can load new programs onto is general purpose. It is also micro and digital — a computer sits in all five lists at once, and the question names which list it is asking about.',
            ne: 'एउटै काम गर्ने भएकाले special purpose; नयाँ प्रोग्राम हाल्न मिल्ने भए general purpose। यो micro र digital पनि हो — एउटै कम्प्युटर पाँचै सूचीमा एकैचोटि पर्छ, र प्रश्नले कुन सूची सोधेको हो त्यही नाम लिन्छ।'
          }
        },
        {
          pre: 'A student carries a LAPTOP to class instead\nof using the desktop at home.',
          answer: 'model',
          why: {
            en: 'Desktop, laptop and palmtop describe the physical form the machine is built in. A laptop is still a microcomputer, so answering size here would be true of the machine and still not answer the question that was asked.',
            ne: 'Desktop, laptop र palmtop ले मेसिन कस्तो भौतिक आकारमा बनेको छ भन्छन्। Laptop पनि microcomputer नै हो, त्यसैले यहाँ आकार भन्नु मेसिनका लागि सही भए पनि सोधिएको प्रश्नको उत्तर हुँदैन।'
          }
        },
        {
          pre: 'A shop sells machines it calls\n"IBM compatible", beside Apple machines.',
          answer: 'brand',
          why: {
            en: 'IBM PC, IBM compatible and Apple say who built the machine or whose design it follows. Nothing about a brand tells you the size, the signal or the purpose, which is exactly why it is counted as a separate basis.',
            ne: 'IBM PC, IBM compatible र Apple ले मेसिन कसले बनायो वा कसको डिजाइन पछ्याउँछ भन्छन्। ब्रान्डले आकार, सङ्केत वा प्रयोजनबारे केही भन्दैन — त्यसैले यो छुट्टै आधार मानिन्छ।'
          }
        },
        {
          pre: 'A fuel pump measures flowing petrol and\nprints a digital bill for the amount.',
          answer: 'data',
          why: {
            en: 'It measures a continuous quantity and then works with counted digits, which is the definition of a HYBRID computer. Hybrid is the third data-handling class, and a question describing both kinds of signal in one machine is asking for it.',
            ne: 'यसले निरन्तर बग्ने परिमाण नाप्छ, अनि गनिने अङ्कसँग काम गर्छ — HYBRID कम्प्युटरको परिभाषा यही हो। Hybrid डाटा ह्यान्डलिङको तेस्रो वर्ग हो, र एउटै मेसिनमा दुवै किसिमको सङ्केत वर्णन गर्ने प्रश्नले यही खोज्दै छ।'
          }
        }
      ]
    },

    /* ---- Unit 1: data, information, database or DBMS? ---- */
    dbterms: {
      title: { en: 'Data, information, database or DBMS?', ne: 'Data, information, database कि DBMS?' },
      lead: {
        en: 'The four words of 1.1, drilled on real cases. The one students lose a mark on is calling the software "the database" — so decide carefully which of those two you are looking at.',
        ne: '१.१ का चार शब्द, वास्तविक उदाहरणमा। विद्यार्थीले अंक गुमाउने ठाउँ एउटै हो — सफ्टवेयरलाई "डाटाबेस" भन्नु। त्यसैले ती दुईमध्ये कुन हो ध्यान दिएर छान्नुहोस्।'
      },
      options: [
        { id: 'data', label: { en: 'Data', ne: 'Data' } },
        { id: 'info', label: { en: 'Information', ne: 'Information' } },
        { id: 'db', label: { en: 'Database', ne: 'Database' } },
        { id: 'dbms', label: { en: 'DBMS', ne: 'DBMS' } }
      ],
      cases: [
        {
          pre: 'MySQL',
          answer: 'dbms',
          why: {
            en: 'MySQL is software — it creates, manages and controls access to a database. The database is the data it looks after. This is the single most common slip in the unit.',
            ne: 'MySQL सफ्टवेयर हो — यसले डाटाबेस बनाउँछ, व्यवस्थापन गर्छ र पहुँच नियन्त्रण गर्छ। डाटाबेस भनेको यसले हेर्ने data हो। युनिटको सबैभन्दा सामान्य गल्ती यही हो।'
          }
        },
        {
          pre: '78',
          answer: 'data',
          why: {
            en: 'A raw fact with no meaning attached. 78 what? Of whom? Until those are answered it is data, not information.',
            ne: 'अर्थ नजोडिएको काँचो तथ्य। ७८ के को? कसको? यी उत्तर नआएसम्म यो data हो, information होइन।'
          }
        },
        {
          pre: '"Ram scored 78 in class 10"',
          answer: 'info',
          why: {
            en: 'The same fact, processed and given meaning. Information is what data becomes once you can act on it.',
            ne: 'उही तथ्य, प्रशोधन गरेर अर्थ दिइएको। Data मा काम गर्न सकिने भएपछि त्यो information बन्छ।'
          }
        },
        {
          pre: 'The Student table, holding 400 rows\nof student records at this school',
          answer: 'db',
          why: {
            en: 'An organised collection of related data. Note that the software managing it is a separate thing — that separation is the whole point of the question.',
            ne: 'सम्बन्धित data को व्यवस्थित सङ्ग्रह। यसलाई व्यवस्थापन गर्ने सफ्टवेयर छुट्टै कुरा हो — यही छुट्याइ नै प्रश्नको सार हो।'
          }
        },
        {
          pre: 'Oracle',
          answer: 'dbms',
          why: {
            en: 'Another DBMS, like MySQL and MS Access. If you can install it, it is software; if it holds your rows, it is the database.',
            ne: 'MySQL र MS Access जस्तै अर्को DBMS। install गर्न मिल्ने भए सफ्टवेयर; तपाईंका पङ्क्ति राख्ने भए डाटाबेस।'
          }
        }
      ]
    },

    /* ---- Unit 2: which cardinality? ---- */
    cardinality: {
      title: { en: 'Which mapping cardinality?', ne: 'कुन mapping cardinality?' },
      lead: {
        en: 'Read both directions before you answer. A sentence that only tells you one direction has not told you the cardinality.',
        ne: 'उत्तर दिनुअघि दुवै दिशा पढ्नुहोस्। एउटा दिशा मात्र बताउने वाक्यले cardinality बताएकै हुँदैन।'
      },
      options: [
        { id: '1:1', label: { en: '1:1', ne: '1:1' } },
        { id: '1:M', label: { en: '1:M', ne: '1:M' } },
        { id: 'M:N', label: { en: 'M:N', ne: 'M:N' } }
      ],
      cases: [
        {
          pre: 'A CLASS contains many STUDENTS.\nEach STUDENT is in exactly one CLASS.',
          answer: '1:M',
          why: {
            en: 'Many one way, one the other. The second sentence is what settles it — without it this could equally have been many-to-many.',
            ne: 'एकातिर धेरै, अर्कोतिर एक। दोस्रो वाक्यले नै तय गर्छ — त्यो नभए यो धेरै–धेरै पनि हुन सक्थ्यो।'
          }
        },
        {
          pre: 'A STUDENT takes many COURSES.\nA COURSE is taken by many STUDENTS.',
          answer: 'M:N',
          why: {
            en: 'Many in both directions, so no single foreign key can record it. This is the one that forces a third table.',
            ne: 'दुवै दिशामा धेरै, त्यसैले एउटै foreign key ले राख्न सक्दैन। तेस्रो तालिका बाध्य पार्ने यही हो।'
          }
        },
        {
          pre: 'A CITIZEN has one CITIZENSHIP NUMBER.\nA CITIZENSHIP NUMBER belongs to one CITIZEN.',
          answer: '1:1',
          why: {
            en: 'One in both directions. Two tables still, and the foreign key may sit in either one.',
            ne: 'दुवै दिशामा एक। तालिका दुई नै हुन्छन्, र foreign key जुनसुकैमा राख्न सकिन्छ।'
          }
        },
        {
          pre: 'A DOCTOR treats many PATIENTS.\nA PATIENT may be treated by several DOCTORS.',
          answer: 'M:N',
          why: {
            en: '"May be treated by several" is the second "many". Read carefully — the wording is softer than in the course example, but the cardinality is the same.',
            ne: '"धेरै डाक्टरले उपचार गर्न सक्छन्" भन्नु नै दोस्रो "धेरै" हो। शब्द नरम छ, तर cardinality उही।'
          }
        },
        {
          pre: 'A DEPARTMENT is headed by one TEACHER.\nA TEACHER heads at most one DEPARTMENT.',
          answer: '1:1',
          why: {
            en: 'Both directions are "at most one". A teacher works in a department alongside others, but HEADS only one — the relationship named is what you judge, not the entities.',
            ne: 'दुवै दिशा "बढीमा एक"। शिक्षक विभागमा अरूसँगै काम गर्छन्, तर नेतृत्व एउटैको गर्छन् — इन्टिटी होइन, नाम दिइएको सम्बन्ध हेर्ने हो।'
          }
        }
      ]
    },

    /* ---- Hardware Unit 1: which doped material is described? ---- */
    dopetype: {
      title: { en: 'P-type or N-type?', ne: 'P-type कि N-type?' },
      lead: {
        en: 'Each case describes a doped semiconductor from a different angle — the impurity, the carrier, or what the exam calls it. Decide which material it is. The trap is the last one: neither type is charged.',
        ne: 'हरेक केसले doped semiconductor लाई फरक कोणबाट वर्णन गर्छ — अशुद्धि, वाहक, वा परीक्षाको शब्द। कुन पदार्थ हो छान्नुहोस्। अन्तिममा पासो छ: कुनै पनि प्रकार चार्ज भएको हुँदैन।'
      },
      options: [
        { id: 'p', label: { en: 'P-type', ne: 'P-type' } },
        { id: 'n', label: { en: 'N-type', ne: 'N-type' } },
        { id: 'both', label: { en: 'True of both', ne: 'दुवैमा सही' } }
      ],
      cases: [
        {
          pre: 'Silicon doped with phosphorus\n(5 valence electrons)',
          answer: 'n',
          why: {
            en: 'Phosphorus is pentavalent. Four of its electrons bond with the silicon; the fifth is spare and free to move. A spare electron means N-type — N for negative carrier.',
            ne: 'Phosphorus pentavalent हो। यसका चारवटा electron silicon सँग बन्धन बनाउँछन्; पाँचौं फाल्तु रहन्छ र चल्न स्वतन्त्र हुन्छ। फाल्तु electron भनेको N-type — N भनेको ऋणात्मक वाहक।'
          }
        },
        {
          pre: 'The majority carrier is the hole.',
          answer: 'p',
          why: {
            en: 'A hole is the gap left where a bond could not be completed, and it behaves like a positive carrier. Holes dominating means P-type — P for positive carrier.',
            ne: 'Hole भनेको बन्धन पूरा हुन नसकेको खाली ठाउँ हो, र यो धनात्मक वाहकजस्तै व्यवहार गर्छ। Hole हावी हुनु भनेको P-type — P भनेको धनात्मक वाहक।'
          }
        },
        {
          pre: 'Silicon doped with boron\n(3 valence electrons)',
          answer: 'p',
          why: {
            en: 'Boron is trivalent — it can fill only three of the four bonds silicon offers. The fourth is left empty, and that empty bond is a hole. Trivalent gives P-type.',
            ne: 'Boron trivalent हो — silicon ले दिने चारमध्ये तीन बन्धन मात्र भर्न सक्छ। चौथो खाली रहन्छ, र त्यही खाली बन्धन hole हो। Trivalent ले P-type दिन्छ।'
          }
        },
        {
          pre: 'The minority carrier is the hole.',
          answer: 'n',
          why: {
            en: 'Read which carrier is in the MINORITY, not which is named. If holes are the minority then electrons are the majority, so this is N-type. Half the marks lost on this topic go to reading "minority" as "majority".',
            ne: 'कुन वाहक <b>अल्पसंख्यक</b> हो पढ्नुहोस्, नाम लिइएको होइन। Hole अल्पसंख्यक भए electron बहुसंख्यक हुन्छ, त्यसैले यो N-type हो। यस विषयमा गुम्ने आधा अंक "अल्पसंख्यक" लाई "बहुसंख्यक" पढ्दा जान्छ।'
          }
        },
        {
          pre: 'The material is electrically neutral.',
          answer: 'both',
          why: {
            en: 'This is the trap, and it is worth a mark on its own. Doping adds a CARRIER, not a CHARGE — the impurity atom arrives with its own protons, so the total charge is unchanged. Neither P-type nor N-type is charged.',
            ne: 'यही पासो हो, र यसैको छुट्टै अंक हुन्छ। Doping ले <b>वाहक</b> थप्छ, <b>चार्ज</b> होइन — अशुद्धिको atom आफ्नै proton सहित आउँछ, त्यसैले कुल चार्ज उस्तै रहन्छ। P-type र N-type कुनै पनि चार्ज भएको हुँदैन।'
          }
        }
      ]
    },

    /* ---- Hardware Unit 2: which display property is this? ---- */
    displayprop: {
      title: { en: 'Which display property is being described?', ne: 'कुन display गुणको कुरा हो?' },
      lead: {
        en: 'These three are never asked as bare definitions in a practical paper — they arrive as a user complaint or a setting. Decide which property each one is about.',
        ne: 'व्यावहारिक प्रश्नपत्रमा यी तीन कुरा खाली परिभाषाका रूपमा सोधिँदैनन् — प्रयोगकर्ताको गुनासो वा सेटिङ बनेर आउँछन्। हरेक कुन गुणसँग सम्बन्धित हो छान्नुहोस्।'
      },
      options: [
        { id: 'res', label: { en: 'Resolution', ne: 'Resolution' } },
        { id: 'depth', label: { en: 'Colour depth', ne: 'Colour depth' } },
        { id: 'refresh', label: { en: 'Refresh rate', ne: 'Refresh rate' } }
      ],
      cases: [
        {
          pre: '1366 × 768',
          answer: 'res',
          why: {
            en: 'Two numbers multiplied like this are always pixels across by pixels down. That is resolution, and nothing else on a display is written in that form.',
            ne: 'यसरी लेखिएका दुई सङ्ख्या सधैं चौडाइका पिक्सेल × उचाइका पिक्सेल हुन्। त्यो resolution हो, र display को अरू कुनै गुण यसरी लेखिँदैन।'
          }
        },
        {
          pre: '"The screen flickers and my eyes hurt\nafter an hour."',
          answer: 'refresh',
          why: {
            en: 'Flicker is the screen being redrawn too few times a second for the eye to blend the frames. Raise the refresh rate to the highest the monitor supports and the flicker goes.',
            ne: 'झिमझिम भनेको स्क्रिन सेकेन्डमा यति थोरै पटक कोरिनु कि आँखाले फ्रेम जोड्नै नसक्नु। Monitor ले सक्ने सबैभन्दा माथिको refresh rate राखेपछि झिमझिम हट्छ।'
          }
        },
        {
          pre: '24-bit — about 16.7 million colours',
          answer: 'depth',
          why: {
            en: 'Bits per pixel is colour depth. More bits means more distinguishable shades, which is why a low setting shows visible bands in a smooth gradient instead of a gradual change.',
            ne: 'प्रति पिक्सेल bit भनेको colour depth हो। बढी bit भनेको बढी छुट्याउन सकिने रङ — त्यसैले कम सेटिङमा बिस्तारै बदलिनुको साटो पट्टी–पट्टी देखिन्छ।'
          }
        },
        {
          pre: '"Everything looks blurry and slightly\nstretched sideways."',
          answer: 'res',
          why: {
            en: 'A flat panel has one native resolution and looks sharp only at that. Set to anything else, the picture is scaled to fit and goes soft — stretched sideways means the aspect ratio is wrong too.',
            ne: 'Flat panel को एउटै native resolution हुन्छ र त्यहीँ मात्र तीक्ष्ण देखिन्छ। अरू राखे तस्बिर अटाउन तानिन्छ र धमिलो हुन्छ — छेउतिर तानिनुले aspect ratio पनि बिग्रेको जनाउँछ।'
          }
        }
      ]
    },

    /* ---- Hardware Unit 5: which power problem, and what protects? ---- */
    powerprotect: {
      title: { en: 'Which power problem is this?', ne: 'यो कुन बिजुली समस्या हो?' },
      lead: {
        en: 'Each case describes what the power actually did. Name the problem — the protective device follows from it, and choosing the wrong one is the expensive mistake this topic exists to prevent.',
        ne: 'हरेक केसले बिजुलीले साँच्चै के गर्‍यो बताउँछ। समस्याको नाम भन्नुहोस् — सुरक्षा उपकरण त्यसैबाट आउँछ, र गलत छान्नु नै यो विषयले रोक्न खोजेको महँगो गल्ती हो।'
      },
      options: [
        { id: 'surge', label: { en: 'Surge — needs a surge protector', ne: 'Surge — surge protector चाहिन्छ' } },
        { id: 'sag', label: { en: 'Sag — needs a stabiliser', ne: 'Sag — stabiliser चाहिन्छ' } },
        { id: 'black', label: { en: 'Blackout — needs a UPS', ne: 'Blackout — UPS चाहिन्छ' } }
      ],
      cases: [
        {
          pre: 'Lightning strikes nearby. The voltage\njumps enormously for a few milliseconds.',
          answer: 'surge',
          why: {
            en: 'A brief, very large rise in voltage is a surge or spike. A surge protector diverts the excess energy away from the equipment before it reaches the power supply.',
            ne: 'छोटो तर धेरै ठूलो भोल्टेज बढाइ नै surge वा spike हो। Surge protector ले बढी ऊर्जा पावर सप्लाईसम्म पुग्नुअघि नै अन्तै पठाउँछ।'
          }
        },
        {
          pre: 'The power fails completely for twenty\nminutes. Unsaved work is lost each time.',
          answer: 'black',
          why: {
            en: 'The supply is gone, so nothing that conditions incoming power can help — there is none to condition. Only a UPS carries a battery, which is why it is the only answer to a blackout.',
            ne: 'सप्लाई नै गयो, त्यसैले आउने बिजुली मिलाउने कुनै उपकरणले काम गर्दैन — मिलाउने बिजुली नै छैन। ब्याट्री UPS मा मात्र हुन्छ, त्यसैले blackout को एक मात्र उत्तर यही हो।'
          }
        },
        {
          pre: 'At peak hours the mains drops well below\nnormal. Lights dim and the PC restarts.',
          answer: 'sag',
          why: {
            en: 'Voltage that falls below normal without disappearing is a sag or brownout. A voltage stabiliser holds the output steady while the incoming supply moves around.',
            ne: 'नहराई सामान्यभन्दा तल झर्ने भोल्टेज नै sag वा brownout हो। Voltage stabiliser ले आउने सप्लाई तलमाथि हुँदा पनि आउटपुट स्थिर राख्छ।'
          }
        },
        {
          pre: 'A large motor in the next room switches\noff. The PC dies instantly, once.',
          answer: 'surge',
          why: {
            en: 'Switching a large inductive load OFF throws energy back into the supply as a spike. Read the event, not the outcome — the machine dying looks like a blackout, but the cause was a moment of far too much voltage, not too little.',
            ne: 'ठूलो inductive भार बन्द गर्दा ऊर्जा spike बनेर सप्लाईमै फर्किन्छ। नतिजा होइन, घटना पढ्नुहोस् — मेसिन मर्नु blackout जस्तो देखिन्छ, तर कारण एक क्षणको अत्यधिक भोल्टेज हो, कमी होइन।'
          }
        }
      ]
    },

    /* ---- Hardware Unit 6: which method fits the situation? ---- */
    backupchoice: {
      title: { en: 'Which method fits this situation?', ne: 'यो अवस्थामा कुन विधि मिल्छ?' },
      lead: {
        en: 'Every option here is the right answer to something. The marks go to matching the method to the problem actually described — read what is being protected against.',
        ne: 'यहाँका हरेक विकल्प कुनै न कुनै कुराको सही उत्तर हुन्। अंक विधिलाई वर्णन गरिएकै समस्यासँग मिलाउनुमा छ — केबाट जोगाउन खोजिएको हो पढ्नुहोस्।'
      },
      options: [
        { id: 'raid1', label: { en: 'RAID 1', ne: 'RAID 1' } },
        { id: 'inc', label: { en: 'Incremental backup', ne: 'Incremental backup' } },
        { id: 'diff', label: { en: 'Differential backup', ne: 'Differential backup' } },
        { id: 'offsite', label: { en: 'Off-site backup', ne: 'अर्को ठाउँको ब्याकअप' } }
      ],
      cases: [
        {
          pre: 'A user deletes an important folder by\nmistake and needs it back.',
          answer: 'diff',
          why: {
            en: 'A deletion needs a BACKUP, because RAID would have mirrored the deletion onto every disk instantly. Any backup would do here; differential is chosen because a restore needs only two sets, so recovering one folder is quick.',
            ne: 'मेटाइका लागि <b>ब्याकअप</b> चाहिन्छ, किनकि RAID ले मेटाइलाई तुरुन्तै हरेक डिस्कमा सारिसक्थ्यो। यहाँ जुनसुकै ब्याकअपले काम गर्थ्यो; differential छानिनुको कारण फर्काउन दुई सेट मात्र चाहिनु हो, त्यसैले एउटा फोल्डर फर्काउन छिटो हुन्छ।'
          }
        },
        {
          pre: 'A server disk fails at 11 a.m. The service\nmust keep running with no interruption.',
          answer: 'raid1',
          why: {
            en: 'The requirement is CONTINUITY, not recovery — no interruption is allowed, so there is no time to restore anything. Mirroring means the second disk carries on alone the moment the first fails.',
            ne: 'आवश्यकता <b>निरन्तरता</b> हो, पुनर्स्थापना होइन — रोकिन नपाउने भएकाले केही फर्काउने समयै हुँदैन। Mirroring भएकाले पहिलो बिग्रेकै क्षणदेखि दोस्रो डिस्कले एक्लै चलाइरहन्छ।'
          }
        },
        {
          pre: 'The nightly backup window is very short.\nOnly minutes are available.',
          answer: 'inc',
          why: {
            en: 'The constraint is on BACKUP time, not restore time. Incremental copies only what changed since the previous backup of any kind, which makes it the smallest and fastest each night — accepting a slower, more fragile restore in exchange.',
            ne: 'बाधा <b>ब्याकअप</b> समयमा छ, फर्काउने समयमा होइन। Incremental ले जुनसुकै किसिमको अघिल्लो ब्याकअपपछि बदलिएको मात्र कपी गर्छ, त्यसैले हरेक रात सबैभन्दा सानो र छिटो — बदलामा ढिलो र कमजोर पुनर्स्थापना स्वीकार गरेर।'
          }
        },
        {
          pre: 'A fire destroys the office, including the\nserver and the backup drive beside it.',
          answer: 'offsite',
          why: {
            en: 'No RAID level and no backup schedule helps when both copies burn together. The property that matters here is not the method but the LOCATION — a copy held somewhere else, or in the cloud.',
            ne: 'दुवै प्रतिलिपि सँगै जल्दा कुनै RAID स्तर र कुनै ब्याकअप तालिकाले काम गर्दैन। यहाँ महत्त्वपूर्ण कुरा विधि होइन, <b>स्थान</b> हो — अर्को ठाउँमा वा cloud मा राखिएको प्रतिलिपि।'
          }
        }
      ]
    },

    /* ---- Hardware Unit 5: which port does this device use? ----
       Syllabus topic 5.6, "input and output device connection issues".
       Built as a drill rather than a new component because a drill is
       already exactly this shape: one case, named options, and a reason
       attached to the answer. A bespoke port-matching widget would have
       been a second engine doing the same job. */
    portmatch: {
      title: { en: 'Which port does this connect to?', ne: 'यो कुन पोर्टमा जोडिन्छ?' },
      lead: {
        en: 'A device that will not work is very often a device in the wrong socket. Read what is being connected and choose the port — the reasoning matters more than the shape, because several connectors physically fit where they do not belong.',
        ne: 'नचल्ने उपकरण प्रायः गलत सकेटमा जोडिएको हुन्छ। के जोड्दै हुनुहुन्छ पढेर पोर्ट छान्नुहोस् — आकारभन्दा कारण महत्त्वपूर्ण छ, किनकि धेरै connector नमिल्ने ठाउँमा पनि भौतिक रूपमा अटाउँछन्।'
      },
      options: [
        { id: 'usb', label: { en: 'USB', ne: 'USB' } },
        { id: 'hdmi', label: { en: 'HDMI / VGA', ne: 'HDMI / VGA' } },
        { id: 'eth', label: { en: 'Ethernet (RJ-45)', ne: 'Ethernet (RJ-45)' } },
        { id: 'audio', label: { en: '3.5 mm audio', ne: '३.५ mm audio' } }
      ],
      cases: [
        {
          pre: 'A wired network cable from the router',
          answer: 'eth',
          why: {
            en: 'A network cable ends in an RJ-45 plug and goes to the Ethernet port. The trap is that an RJ-11 telephone plug is narrower and will slide into an RJ-45 socket without clicking — it fits, and it will never carry a network.',
            ne: 'नेटवर्क केबलको टुप्पोमा RJ-45 प्लग हुन्छ र त्यो Ethernet पोर्टमा जान्छ। पासो यो हो: RJ-11 टेलिफोन प्लग साँघुरो हुन्छ र क्लिक नगरी RJ-45 सकेटभित्र पस्छ — अटाउँछ, तर कहिल्यै नेटवर्क बोक्दैन।'
          }
        },
        {
          pre: 'A monitor cable carrying picture and sound',
          answer: 'hdmi',
          why: {
            en: 'Picture AND sound over one cable means HDMI — VGA is analogue and carries video only. If a user complains there is no sound from the monitor, check which of the two they used before suspecting the speakers.',
            ne: 'एउटै केबलमा तस्बिर <b>र</b> आवाज भनेको HDMI हो — VGA analogue हो र video मात्र बोक्छ। Monitor बाट आवाज आएन भन्ने गुनासो आए स्पिकरमा शंका गर्नुअघि कुन केबल प्रयोग भयो हेर्नुहोस्।'
          }
        },
        {
          pre: 'A printer, a keyboard, a mouse and a flash drive',
          answer: 'usb',
          why: {
            en: 'All four are USB, which is why USB replaced the separate parallel, PS/2 and serial ports it succeeded. One port type, one connector, and the system detects what was plugged in.',
            ne: 'चारै USB हुन् — त्यसैले USB ले पहिलेका छुट्टाछुट्टै parallel, PS/2 र serial पोर्ट हटायो। एउटै किसिमको पोर्ट, एउटै connector, र के जोडियो प्रणालीले आफैँ पत्ता लगाउँछ।'
          }
        },
        {
          pre: 'Headphones, into a socket that is\nthe same size as the microphone one',
          answer: 'audio',
          why: {
            en: 'Both are 3.5 mm and physically identical, so the plug fits either way and nothing warns you. Go by the colour and the icon: green with a headphone symbol is output, pink with a microphone symbol is input. "It fits" is not evidence.',
            ne: 'दुवै ३.५ mm र भौतिक रूपमा एउटै हुन्, त्यसैले प्लग जतासुकै अटाउँछ र केही चेतावनी आउँदैन। रङ र चिन्ह हेर्नुहोस्: हेडफोन चिन्हसहितको हरियो output, माइक्रोफोन चिन्हसहितको गुलाबी input। "अटायो" भन्नु प्रमाण होइन।'
          }
        }
      ]
    },

    /* =============================================================
       GRADE 9 · PROGRAMMING PRINCIPLES IN C

       Every set below asks the one question the examination asks and
       a listing cannot: given this situation, WHICH ONE. Reciting the
       four jump statements is a different skill from knowing that a
       `break` inside a `switch` and a `break` inside a loop leave
       different things, and only the second is worth marks.
       ============================================================= */

    /* ---- 1.2 categories of programming language ---- */
    clangcat: {
      title: { en: 'Which category of programming language?',
               ne: 'प्रोग्रामिङ भाषाको कुन श्रेणी?' },
      lead: {
        en: 'Each case describes how the instructions are written. Decide whether it is machine level, assembly level or high level. The test is who can read it without help: the processor, a person with a manual, or anybody.',
        ne: 'हरेक केसमा निर्देशन कसरी लेखिएको छ भनिएको छ। यो machine level, assembly level कि high level हो छुट्याउनुहोस्। जाँच यही हो: सहायताविना कसले पढ्न सक्छ — प्रोसेसरले, म्यानुअल भएको मान्छेले, कि जोसुकैले?'
      },
      options: [
        { id: 'machine',  label: { en: 'Machine level', ne: 'Machine level' } },
        { id: 'assembly', label: { en: 'Assembly level', ne: 'Assembly level' } },
        { id: 'high',     label: { en: 'High level', ne: 'High level' } }
      ],
      cases: [
        {
          pre: 'The whole program is written as\n10110000 01100001',
          answer: 'machine',
          why: {
            en: 'Only 0s and 1s, which is the one form the processor reads directly with no translation at all. It is also the only level that is different on every make of processor, and the reason nobody writes it by hand today.',
            ne: 'केवल ० र १, जुन प्रोसेसरले कुनै अनुवादविनै सिधै पढ्ने एकमात्र रूप हो। हरेक बनोटको प्रोसेसरमा फरक हुने तह पनि यही हो, र आजकल कसैले हातले नलेख्ने कारण त्यही।'
          }
        },
        {
          pre: 'MOV AL, 61h\nADD AL, 02h',
          answer: 'assembly',
          why: {
            en: 'Short word-like codes such as MOV and ADD stand one-for-one for machine instructions. It is readable by a person who knows the processor, and it still needs an assembler before it can run.',
            ne: 'MOV र ADD जस्ता छोटा सङ्केत एक–एक गरी मेसिन निर्देशनका ठाउँमा आउँछन्। प्रोसेसर जान्ने मान्छेले पढ्न सक्छ, र चल्नुअघि assembler चाहिन्छ नै।'
          }
        },
        {
          pre: 'printf("Total = %d", sum);',
          answer: 'high',
          why: {
            en: 'English-like words and ordinary arithmetic, with nothing in it that names a register or an address. That is what high level means: written for the person, then translated by a compiler for the machine.',
            ne: 'अङ्ग्रेजीजस्ता शब्द र सामान्य गणित, र यसमा कुनै register वा ठेगानाको नाम छैन। High level को अर्थ यही हो: मान्छेका लागि लेखिने, अनि compiler ले मेसिनका लागि अनुवाद गर्ने।'
          }
        },
        {
          pre: 'The source runs unchanged on a Windows\nlaptop and on a Linux desktop after\nbeing compiled on each.',
          answer: 'high',
          why: {
            en: 'Portability is the property high level languages have and the other two do not. Machine and assembly code are tied to one processor family, so the same file could not be moved between two different machines.',
            ne: 'एउटै source दुई ठाउँमा चल्नु — portability — high level भाषाको गुण हो, अरू दुईको होइन। Machine र assembly कोड एउटै प्रोसेसर परिवारसँग बाँधिन्छ, त्यसैले उही फाइल सार्न मिल्दैन।'
          }
        },
        {
          pre: 'A programmer must remember which\nregister holds which value, because\nthe language has no variable names.',
          answer: 'assembly',
          why: {
            en: 'Registers appear by name in assembly and nowhere else that a Grade 9 student meets. Machine level has registers too but no names at all, and a high level language hides registers completely behind variables.',
            ne: 'Register को नाम assembly मा मात्र देखिन्छ। Machine level मा register त छन् तर नाम नै हुँदैन, र high level भाषाले register लाई variable पछाडि पूरै लुकाउँछ।'
          }
        }
      ]
    },

    /* ---- 1.4 flowchart symbols ---- */
    cflowsym: {
      title: { en: 'Which flowchart symbol does this step need?',
               ne: 'यो चरणलाई कुन flowchart चिन्ह चाहिन्छ?' },
      lead: {
        en: 'Each case is one step of a flowchart. Choose the shape you would draw for it. The question to ask is not what the step says but what KIND of thing it is: a boundary, a crossing, a calculation or a question.',
        ne: 'हरेक केस flowchart को एउटा चरण हो। त्यसका लागि कुन आकार कोर्ने छान्नुहोस्। सोध्नुपर्ने प्रश्न चरणले के भन्यो होइन, यो कुन किसिमको कुरा हो भन्ने हो: सिमाना, पार गर्ने, गणना, कि प्रश्न?'
      },
      options: [
        { id: 'oval',  label: { en: 'Oval', ne: 'Oval' } },
        { id: 'para',  label: { en: 'Parallelogram', ne: 'Parallelogram' } },
        { id: 'rect',  label: { en: 'Rectangle', ne: 'Rectangle' } },
        { id: 'dia',   label: { en: 'Diamond', ne: 'Diamond' } }
      ],
      cases: [
        {
          pre: 'Read the two numbers a and b\nfrom the user.',
          answer: 'para',
          why: {
            en: 'Anything that crosses the boundary between the program and the person is input or output, and both use the parallelogram. Reading from a keyboard and printing to a screen are drawn with the same shape.',
            ne: 'प्रोग्राम र मान्छेबीचको सिमाना नाघ्ने जुनसुकै कुरा input वा output हो, र दुवैलाई parallelogram नै। Keyboard बाट पढ्नु र पर्दामा छाप्नु एउटै आकारले कोरिन्छ।'
          }
        },
        {
          pre: 'sum = a + b',
          answer: 'rect',
          why: {
            en: 'A calculation or an assignment changes a value inside the program and nobody outside sees it happen. That is processing, and processing is the rectangle — the commonest box in any flowchart.',
            ne: 'गणना वा assignment ले प्रोग्रामभित्रको मान बदल्छ र बाहिर कसैले देख्दैन। त्यो processing हो, र processing भनेको rectangle — कुनै पनि flowchart मा सबैभन्दा धेरै आउने बाकस।'
          }
        },
        {
          pre: 'Is a greater than b?',
          answer: 'dia',
          why: {
            en: 'A question with a yes and a no is a decision, drawn as a diamond. It is the only symbol with two arrows leaving it, and leaving one of those two branches unlabelled is where marks are usually lost.',
            ne: 'हो र होइन भएको प्रश्न decision हो, र त्यो diamond ले कोरिन्छ। दुई तीर बाहिर जाने एकमात्र चिन्ह यही हो, र ती दुई शाखामध्ये एउटामा नाम नलेख्दा प्रायः अंक जान्छ।'
          }
        },
        {
          pre: 'Stop',
          answer: 'oval',
          why: {
            en: 'Start and Stop are terminals and both are ovals. Every flowchart needs one start, and a chart whose path can finish without reaching a stop is incomplete however correct the middle is.',
            ne: 'Start र Stop दुवै terminal हुन् र दुवै oval। हरेक flowchart मा एउटा start चाहिन्छ, र बीचको भाग जतिसुकै ठिक भए पनि stop नपुगी सकिने chart अपूरो हो।'
          }
        },
        {
          pre: 'Display "The largest number is",\nfollowed by the value of max.',
          answer: 'para',
          why: {
            en: 'Display is output, so it takes the same parallelogram as the read step did. Students who draw a rectangle here have confused what the program computes with what the person is shown.',
            ne: 'Display भनेको output हो, त्यसैले read कै जस्तो parallelogram नै। यहाँ rectangle कोर्ने विद्यार्थीले प्रोग्रामले गणना गरेको कुरा र मान्छेलाई देखाइएको कुरा मिसाएका हुन्।'
          }
        }
      ]
    },

    /* ---- 2.5 / 2.6 format specifiers ---- */
    cformat: {
      title: { en: 'Which format specifier does this need?',
               ne: 'यसलाई कुन format specifier चाहिन्छ?' },
      lead: {
        en: 'printf and scanf do not inspect the variable — they believe the specifier. Choose the one that matches the type. Getting this wrong does not usually stop the program: it prints something, and the something is wrong.',
        ne: 'printf र scanf ले variable जाँच्दैनन् — specifier लाई नै पत्याउँछन्। प्रकारसँग मिल्ने छान्नुहोस्। यो गलत हुँदा प्रायः प्रोग्राम रोकिँदैन: केही छाप्छ, र त्यो केही गलत हुन्छ।'
      },
      options: [
        { id: 'd', label: { en: '%d', ne: '%d' } },
        { id: 'f', label: { en: '%f', ne: '%f' } },
        { id: 'c', label: { en: '%c', ne: '%c' } },
        { id: 's', label: { en: '%s', ne: '%s' } }
      ],
      cases: [
        {
          pre: 'int marks = 87;\nprintf("Marks: ___", marks);',
          answer: 'd',
          why: {
            en: 'An int is printed with %d, where the d stands for decimal integer. This is the specifier used more often than all the others together, and it is the one to reach for whenever a whole number is being shown.',
            ne: 'int लाई %d ले छापिन्छ, जहाँ d को अर्थ decimal integer हो। अरू सबै मिलेर जतिभन्दा पनि यही बढी प्रयोग हुन्छ, र पूर्ण सङ्ख्या देखाउँदा सधैं यही सम्झनुपर्छ।'
          }
        },
        {
          pre: 'float height = 5.4;\nprintf("Height: ___", height);',
          answer: 'f',
          why: {
            en: 'A float needs %f, and by default it prints six digits after the point — 5.400000, not 5.4. Writing %.2f asks for two, which is how a neat answer is produced in an examination program.',
            ne: 'float लाई %f चाहिन्छ, र पूर्वनिर्धारित रूपमा दशमलवपछि छ अङ्क छाप्छ — 5.400000, 5.4 होइन। %.2f लेखे दुई अङ्क आउँछ, र परीक्षाको प्रोग्राममा सफा उत्तर यसरी निकालिन्छ।'
          }
        },
        {
          pre: "char grade = 'A';\nprintf(\"Grade: ___\", grade);",
          answer: 'c',
          why: {
            en: 'A single character variable takes %c. Using %d here would print 65 instead of A, because that is the code number stored for the letter, and the program would still compile without any complaint.',
            ne: 'एउटै अक्षरको variable लाई %c। यहाँ %d प्रयोग गरे A का साटो 65 छाप्छ, किनभने अक्षरका लागि भण्डारण गरिएको सङ्ख्या त्यही हो — र प्रोग्राम कुनै गुनासोविना compile पनि हुन्छ।'
          }
        },
        {
          pre: 'char name[20] = "Sita";\nprintf("Name: ___", name);',
          answer: 's',
          why: {
            en: 'A string is a character array and takes %s, which keeps printing until it meets the null character. %c would print only the first letter, because it expects one character and not an array.',
            ne: 'String character array हो र यसलाई %s चाहिन्छ, जसले null अक्षर नभेटेसम्म छापिरहन्छ। %c ले पहिलो अक्षर मात्र छाप्थ्यो, किनभने त्यसले array होइन एउटै अक्षर खोज्छ।'
          }
        },
        {
          pre: 'int n;\nscanf("___", &n);',
          answer: 'd',
          why: {
            en: 'scanf uses the same specifiers as printf, so reading an integer is %d. The difference is the ampersand on the variable: scanf needs the address of n, because it has to put the value somewhere.',
            ne: 'scanf ले printf कै specifier प्रयोग गर्छ, त्यसैले पूर्णाङ्क पढ्न %d। फरक variable अगाडिको ampersand हो: scanf लाई n को ठेगाना चाहिन्छ, किनभने मान कतै राख्नुपर्छ।'
          }
        }
      ]
    },

    /* ---- 2.7 operator families ---- */
    coperator: {
      title: { en: 'Which family does this operator belong to?',
               ne: 'यो operator कुन परिवारको हो?' },
      lead: {
        en: 'The syllabus names five families and the examination asks you to classify, not just to use. Look at what the operator PRODUCES: a number, a true-or-false, a stored value, or a changed bit pattern.',
        ne: 'पाठ्यक्रमले पाँच परिवारको नाम लिन्छ र परीक्षाले प्रयोग मात्र होइन वर्गीकरण सोध्छ। Operator ले के निकाल्छ हेर्नुहोस्: सङ्ख्या, सत्य–असत्य, भण्डारण भएको मान, कि बदलिएको bit बनोट?'
      },
      options: [
        { id: 'arith',  label: { en: 'Arithmetic', ne: 'Arithmetic' } },
        { id: 'rel',    label: { en: 'Relational', ne: 'Relational' } },
        { id: 'log',    label: { en: 'Logical', ne: 'Logical' } },
        { id: 'bit',    label: { en: 'Bitwise', ne: 'Bitwise' } },
        { id: 'assign', label: { en: 'Assignment', ne: 'Assignment' } }
      ],
      cases: [
        {
          pre: 'r = 17 % 5;',
          answer: 'arith',
          why: {
            en: 'The modulus operator gives the remainder after division, which is a number, so it is arithmetic. It works only on integers in C, and it is the standard way a program decides whether a number is even.',
            ne: 'Modulus ले भाग गरेपछिको शेष दिन्छ, र त्यो सङ्ख्या हो — त्यसैले arithmetic। C मा यो पूर्णाङ्कमा मात्र चल्छ, र सङ्ख्या जोर छ कि छैन भन्ने निर्णय प्रोग्रामले यसैले गर्छ।'
          }
        },
        {
          pre: 'if (a == b)',
          answer: 'rel',
          why: {
            en: 'A comparison answers a question with true or false rather than producing a value, which makes it relational. The doubled equals sign is the one that compares; a single one would assign and change a.',
            ne: 'तुलना गर्दा मान होइन सत्य वा असत्य निस्कन्छ, त्यसैले यो relational हो। दोहोरो बराबर चिन्हले तुलना गर्छ; एउटै भए assign भएर a नै बदलिन्थ्यो।'
          }
        },
        {
          pre: 'if (age > 15 && marks > 40)',
          answer: 'log',
          why: {
            en: 'The double ampersand joins two conditions that are each already true or false, which is what a logical operator does. The two comparisons inside it are relational; the operator combining them is not.',
            ne: 'दोहोरो ampersand ले सत्य–असत्य भइसकेका दुई सर्त जोड्छ, र logical operator ले गर्ने काम त्यही हो। भित्रका दुई तुलना relational हुन्; तिनलाई जोड्ने operator चाहिँ होइन।'
          }
        },
        {
          pre: 'x = x & 1;',
          answer: 'bit',
          why: {
            en: 'A single ampersand works on each bit of the number separately rather than on the number as a whole. Here it keeps only the last bit, which is a quick way of testing whether x is odd.',
            ne: 'एउटै ampersand ले सङ्ख्यालाई सिङ्गो नभई हरेक bit लाई छुट्टाछुट्टै हेर्छ। यहाँ यसले अन्तिम bit मात्र राख्छ, र x बिजोर छ कि छैन जाँच्ने छिटो तरिका त्यही हो।'
          }
        },
        {
          pre: 'total += marks;',
          answer: 'assign',
          why: {
            en: 'A compound assignment stores a value into the variable on the left, and that storing is what makes it assignment. It is shorthand for total = total + marks and does exactly the same thing.',
            ne: 'Compound assignment ले बायाँको variable मा मान राख्छ, र त्यही राख्ने कामले यसलाई assignment बनाउँछ। यो total = total + marks कै छोटो रूप हो र ठ्याक्कै उही काम गर्छ।'
          }
        }
      ]
    },

    /* ---- 3.2 which loop ---- */
    cloop: {
      title: { en: 'Which loop fits this job best?', ne: 'यो कामलाई कुन loop ठिक हुन्छ?' },
      lead: {
        en: 'All three loops can be made to do all three jobs. The question is which one states the intention most clearly, and the deciding fact is whether the number of repetitions is known before the loop starts.',
        ne: 'तीनै loop ले तीनै काम गर्न सक्छन्। प्रश्न कुनले नियत सबैभन्दा स्पष्ट देखाउँछ भन्ने हो, र निर्णय गर्ने कुरा loop सुरु हुनुअघि नै कति पटक दोहोरिने थाहा छ कि छैन भन्ने हो।'
      },
      options: [
        { id: 'for',   label: { en: 'for loop', ne: 'for loop' } },
        { id: 'while', label: { en: 'while loop', ne: 'while loop' } },
        { id: 'do',    label: { en: 'do-while loop', ne: 'do-while loop' } }
      ],
      cases: [
        {
          pre: 'Print the multiplication table\nof 7, from 1 to 10.',
          answer: 'for',
          why: {
            en: 'Exactly ten repetitions, known before the loop begins. A for loop puts the start, the stop and the step on one line, so a reader sees the whole count at a glance instead of hunting for it.',
            ne: 'ठ्याक्कै दस पटक, र त्यो loop सुरु हुनुअघि नै थाहा छ। for loop ले सुरु, अन्त्य र पाइला एउटै लाइनमा राख्छ, त्यसैले पाठकले पूरै गणना एकै नजरमा देख्छ।'
          }
        },
        {
          pre: 'Keep reading numbers from the user\nuntil they type zero.',
          answer: 'while',
          why: {
            en: 'Nobody knows how many numbers will be typed, so the count cannot go on a for line. A while loop tests the condition before each pass, which is right here because zero could be the very first entry.',
            ne: 'कति सङ्ख्या टाइप हुन्छन् कसैलाई थाहा छैन, त्यसैले गणना for लाइनमा राख्न मिल्दैन। while ले हरेक पटकअघि सर्त जाँच्छ, र यहाँ त्यही ठिक छ किनभने पहिलो प्रविष्टि नै शून्य हुन सक्छ।'
          }
        },
        {
          pre: 'Show a menu, take the choice, and\nshow it again until the user picks Exit.',
          answer: 'do',
          why: {
            en: 'The menu has to appear at least once before anyone can choose to exit. A do-while runs the body first and tests afterwards, which is exactly the shape of that requirement and the reason the loop exists.',
            ne: 'कसैले Exit छान्नुअघि menu कम्तीमा एक पटक देखिनै पर्छ। do-while ले पहिले body चलाएर पछि जाँच्छ, र आवश्यकताको आकार ठ्याक्कै त्यही हो — यो loop हुनुको कारण पनि त्यही।'
          }
        },
        {
          pre: 'Add up the 40 marks already stored\nin an array.',
          answer: 'for',
          why: {
            en: 'The array has a fixed size, so the number of passes is known and an index is needed anyway. A for loop supplies the index and the count together, which is why array work is almost always written with one.',
            ne: 'Array को आकार तय छ, त्यसैले कति पटक चल्ने थाहा छ र index पनि चाहिन्छ नै। for loop ले index र गणना सँगै दिन्छ, त्यसैले array को काम झन्डै सधैं यसैले लेखिन्छ।'
          }
        },
        {
          pre: 'Ask for a password and ask again\nevery time it is wrong.',
          answer: 'do',
          why: {
            en: 'The password must be asked for once before it can be judged wrong, so the body comes before the test. Written as a while loop this needs the question duplicated above the loop, which is the clue to use do-while.',
            ne: 'Password गलत हो भन्न पहिले एक पटक सोध्नै पर्छ, त्यसैले body जाँचभन्दा अगाडि आउँछ। while ले लेख्दा प्रश्न loop माथि दोहोर्‍याउनुपर्छ, र त्यही सुराकले do-while रोज्न भन्छ।'
          }
        }
      ]
    },

    /* ---- 3.3 jump statements ---- */
    cjump: {
      title: { en: 'Which jump statement does this describe?',
               ne: 'यो वर्णन कुन jump statement को हो?' },
      lead: {
        en: 'Four statements change the normal order of execution, and the examination asks you to tell them apart by effect. Ask what each one abandons: the rest of this pass, the whole loop, or the whole function.',
        ne: 'चारवटा statement ले चल्ने सामान्य क्रम बदल्छन्, र परीक्षाले असरका आधारमा छुट्याउन भन्छ। हरेकले के छाड्छ सोध्नुहोस्: यस पटकको बाँकी, पूरै loop, कि पूरै function?'
      },
      options: [
        { id: 'break',    label: { en: 'break', ne: 'break' } },
        { id: 'continue', label: { en: 'continue', ne: 'continue' } },
        { id: 'goto',     label: { en: 'goto', ne: 'goto' } },
        { id: 'return',   label: { en: 'return', ne: 'return' } }
      ],
      cases: [
        {
          pre: 'The loop is searching an array. The\nvalue is found, and there is no reason\nto look at the rest.',
          answer: 'break',
          why: {
            en: 'break leaves the loop entirely and carries on with the statement after it. Searching is the clearest use of it, because continuing after a successful find costs time and gains nothing at all.',
            ne: 'break ले पूरै loop छाडेर त्यसपछिको statement बाट अघि बढ्छ। खोजीमा यसको प्रयोग सबैभन्दा स्पष्ट छ, किनभने भेटिसकेपछि पनि चलिरहनुले समय मात्र खान्छ, केही दिँदैन।'
          }
        },
        {
          pre: 'A loop adds up marks but must ignore\nany entry that is negative, and go on\nto the next entry.',
          answer: 'continue',
          why: {
            en: 'continue abandons only the rest of the current pass and starts the next one, so the loop is not left. This is the difference that is asked for again and again: one skips a turn, the other ends the game.',
            ne: 'continue ले यस पटकको बाँकी मात्र छाड्छ र अर्को पटक सुरु गर्छ, loop छाड्दैन। बारम्बार सोधिने फरक यही हो: एउटाले एक पटक छाड्छ, अर्कोले खेलै सिध्याउँछ।'
          }
        },
        {
          pre: 'A function has worked out the answer\nand sends it back to whoever called it.',
          answer: 'return',
          why: {
            en: 'return ends the function, not just a loop, and hands a value back to the caller. Reaching it inside a loop leaves the loop too, because the whole function has finished at that point.',
            ne: 'return ले loop मात्र होइन पूरै function सिध्याउँछ र बोलाउनेलाई मान फर्काउँछ। Loop भित्र यो भेटिए loop पनि छुट्छ, किनभने त्यहीँ पूरै function सकिइसकेको हुन्छ।'
          }
        },
        {
          pre: 'Control is sent straight to a line\nmarked with a label somewhere else\nin the same function.',
          answer: 'goto',
          why: {
            en: 'goto is the only one that names a destination label, and it is the only one of the four that most programmers avoid. It is examinable, and in real programs a loop or a function reads better almost every time.',
            ne: 'गन्तव्यको label नाम लिने एकमात्र यही हो, र चारमध्ये धेरै प्रोग्रामरले बच्ने पनि यही हो। परीक्षामा सोधिन्छ, तर वास्तविक प्रोग्राममा loop वा function झन्डै सधैं राम्रो पढिन्छ।'
          }
        },
        {
          pre: 'Inside a switch, it stops the program\nfrom falling through into the next case.',
          answer: 'break',
          why: {
            en: 'The same keyword does a second job inside a switch, where leaving it out makes every later case run as well. That fall-through is the commonest switch mistake and the reason break is written after every case.',
            ne: 'उही keyword ले switch भित्र दोस्रो काम गर्छ; नलेखे पछिका सबै case पनि चल्छन्। त्यही fall-through switch को सबैभन्दा सामान्य गल्ती हो, र हरेक case पछि break लेखिनुको कारण पनि त्यही।'
          }
        }
      ]
    },

    /* ---- 4.2 declaration, definition, call ---- */
    cfuncpart: {
      title: { en: 'Declaration, definition or call?', ne: 'Declaration, definition कि call?' },
      lead: {
        en: 'A function appears three times in a well-written C program and each appearance has its own name and its own job. The punctuation at the end is the quickest clue: a semicolon, a brace, or a result being used.',
        ne: 'राम्ररी लेखिएको C प्रोग्राममा function तीन पटक देखिन्छ र हरेक पटकको आफ्नै नाम र आफ्नै काम हुन्छ। अन्त्यको चिन्ह सबैभन्दा छिटो सुराक हो: semicolon, brace, कि नतिजा प्रयोग भएको।'
      },
      options: [
        { id: 'decl', label: { en: 'Declaration (prototype)', ne: 'Declaration (prototype)' } },
        { id: 'def',  label: { en: 'Definition', ne: 'Definition' } },
        { id: 'call', label: { en: 'Call', ne: 'Call' } }
      ],
      cases: [
        {
          pre: 'int add(int a, int b);',
          answer: 'decl',
          why: {
            en: 'A line that names the return type and the parameters and then ends in a semicolon is a prototype. It promises the compiler that this function exists somewhere, so a call can be checked before the body is read.',
            ne: 'Return type र parameter को नाम लिएर semicolon मा सकिने लाइन prototype हो। यसले compiler लाई यो function कतै छ भन्ने वाचा दिन्छ, त्यसैले body पढ्नुअघि नै call जाँच्न मिल्छ।'
          }
        },
        {
          pre: 'int add(int a, int b) {\n    return a + b;\n}',
          answer: 'def',
          why: {
            en: 'The same heading with a body in braces is the definition, and it is where the work actually happens. There is no semicolon after the closing brace, which is the detail most often got wrong in a written answer.',
            ne: 'उही शीर्षकसँग brace भित्र body भए definition हो, र काम वास्तवमा यहीँ हुन्छ। बन्द गर्ने brace पछि semicolon हुँदैन, र लिखित उत्तरमा प्रायः यही कुरा बिग्रन्छ।'
          }
        },
        {
          pre: 'total = add(15, 27);',
          answer: 'call',
          why: {
            en: 'Arguments with real values inside the brackets, and a result being stored, means the function is being used rather than described. This is the only one of the three that actually makes the body run.',
            ne: 'कोष्ठकभित्र वास्तविक मान र नतिजा कतै भण्डारण भएको देखिए function वर्णन होइन प्रयोग भइरहेको छ। तीनमध्ये body साँच्चै चलाउने एकमात्र यही हो।'
          }
        },
        {
          pre: 'printf("Hello");',
          answer: 'call',
          why: {
            en: 'A library function is used exactly as your own is, so this is a call. Its declaration is in stdio.h and its definition is already compiled inside the library, which is why neither one appears in your file.',
            ne: 'Library function आफ्नै जस्तै प्रयोग हुन्छ, त्यसैले यो call हो। यसको declaration stdio.h मा छ र definition पहिल्यै library भित्र compile भइसकेको छ — त्यसैले दुवै तपाईंको फाइलमा देखिँदैनन्।'
          }
        },
        {
          pre: 'void showMenu(void) {\n    printf("1. Add\\n");\n}',
          answer: 'def',
          why: {
            en: 'Braces with statements inside make it a definition even though it takes nothing and returns nothing. void in front says no value comes back, and void inside the brackets says no argument goes in.',
            ne: 'केही नलिने र केही नफर्काउने भए पनि brace भित्र statement भएकाले यो definition हो। अगाडिको void ले मान फर्किँदैन भन्छ, कोष्ठकभित्रको void ले कुनै argument जाँदैन भन्छ।'
          }
        }
      ]
    },

    /* ---- 4.4 call by value vs call by reference ---- */
    ccallby: {
      title: { en: 'Call by value or call by reference?',
               ne: 'Call by value कि call by reference?' },
      lead: {
        en: 'The question is never what the function prints — it is whether the ORIGINAL variable in main has changed after the call returns. Look for the ampersand at the call and the star in the parameter list.',
        ne: 'प्रश्न function ले के छाप्यो भन्ने होइन — call फर्केपछि main को मूल variable बदलियो कि बदलिएन भन्ने हो। Call मा ampersand र parameter सूचीमा star खोज्नुहोस्।'
      },
      options: [
        { id: 'value', label: { en: 'Call by value', ne: 'Call by value' } },
        { id: 'ref',   label: { en: 'Call by reference', ne: 'Call by reference' } }
      ],
      cases: [
        {
          pre: 'void change(int x) { x = 100; }\n\nchange(n);',
          answer: 'value',
          why: {
            en: 'A copy of n is made and the function changes the copy, so n in main still holds whatever it held before. This is the default in C and the reason a swap function written this way does nothing at all.',
            ne: 'n को प्रतिलिपि बन्छ र function ले प्रतिलिपि मात्र बदल्छ, त्यसैले main को n जस्ताको तस्तै रहन्छ। C मा पूर्वनिर्धारित यही हो, र यसरी लेखिएको swap function ले केही नगर्नुको कारण पनि त्यही।'
          }
        },
        {
          pre: 'void change(int *x) { *x = 100; }\n\nchange(&n);',
          answer: 'ref',
          why: {
            en: 'The ampersand sends the address of n and the star inside reaches back to that address, so the original really changes. Both halves are needed: an address passed in, and a dereference used on it.',
            ne: 'Ampersand ले n को ठेगाना पठाउँछ र भित्रको star ले त्यही ठेगानासम्म पुग्छ, त्यसैले मूल variable साँच्चै बदलिन्छ। दुवै भाग चाहिन्छ: ठेगाना पठाउनु, र त्यसमाथि dereference गर्नु।'
          }
        },
        {
          pre: 'int square(int n) { return n * n; }\n\nresult = square(5);',
          answer: 'value',
          why: {
            en: 'A value goes in, a value comes back through return, and nothing in main is modified in place. Returning a result is the ordinary way to get an answer out, and it does not make the call by reference.',
            ne: 'मान भित्र जान्छ, return मार्फत मान फर्कन्छ, र main मा कुनै variable ठाउँमै बदलिँदैन। नतिजा return गर्नु उत्तर बाहिर ल्याउने सामान्य तरिका हो, र यसले call लाई by reference बनाउँदैन।'
          }
        },
        {
          pre: 'void fill(int list[], int size);\n\nfill(marks, 5);',
          answer: 'ref',
          why: {
            en: 'An array name is already an address, so no ampersand is written and the function still changes the caller array. This is the exception students find surprising, and it is why arrays are never copied into a function.',
            ne: 'Array को नाम आफैंमा ठेगाना हो, त्यसैले ampersand नलेखे पनि function ले बोलाउनेको array बदल्छ। विद्यार्थीलाई अचम्म लाग्ने अपवाद यही हो, र array कहिल्यै function भित्र प्रतिलिपि नहुनुको कारण पनि यही।'
          }
        }
      ]
    },

    /* ---- 5.5 string functions ---- */
    cstrfunc: {
      title: { en: 'Which string function does this job?',
               ne: 'यो काम कुन string function ले गर्छ?' },
      lead: {
        en: 'Five of the seven in the syllabus do jobs that are easy to confuse, and three of them are not standard C at all. Choose by what comes back: a number, a changed string, or a comparison result.',
        ne: 'पाठ्यक्रमका सातमध्ये पाँचका काम मिल्दाजुल्दा छन्, र तीनवटा त मानक C मै छैनन्। के फर्कन्छ हेरेर छान्नुहोस्: सङ्ख्या, बदलिएको string, कि तुलनाको नतिजा?'
      },
      options: [
        { id: 'strlen', label: { en: 'strlen()', ne: 'strlen()' } },
        { id: 'strcpy', label: { en: 'strcpy()', ne: 'strcpy()' } },
        { id: 'strcat', label: { en: 'strcat()', ne: 'strcat()' } },
        { id: 'strcmp', label: { en: 'strcmp()', ne: 'strcmp()' } }
      ],
      cases: [
        {
          pre: 'char s[20] = "Nepal";\nn = ______(s);     /* n becomes 5 */',
          answer: 'strlen',
          why: {
            en: 'strlen counts the characters up to the null terminator and returns that number, so it gives 5 for Nepal. It does not count the null itself, which is why the array still needs one more byte than the length.',
            ne: 'strlen ले null सम्मका अक्षर गन्छ र त्यो सङ्ख्या फर्काउँछ, त्यसैले Nepal को ५ आउँछ। यसले null आफैंलाई गन्दैन, र त्यसैले array मा लम्बाइभन्दा एक byte बढी चाहिन्छ।'
          }
        },
        {
          pre: 'char a[20], b[20] = "Kathmandu";\n______(a, b);     /* a becomes Kathmandu */',
          answer: 'strcpy',
          why: {
            en: 'Copying one string into another needs strcpy, because the assignment operator cannot be used on arrays in C. Writing a = b would not compile, and that failed attempt is the usual route to this function.',
            ne: 'एउटा string अर्कोमा सार्न strcpy चाहिन्छ, किनभने C मा array मा assignment operator चल्दैन। a = b लेखे compile नै हुँदैन, र त्यही असफल प्रयासले यो function सम्म पुर्‍याउँछ।'
          }
        },
        {
          pre: 'char a[30] = "Good ", b[10] = "day";\n______(a, b);     /* a becomes Good day */',
          answer: 'strcat',
          why: {
            en: 'strcat joins the second string onto the end of the first, so the first array must be big enough to hold both. Declaring a as 30 and not 10 is what makes this safe, and the exam often tests that detail.',
            ne: 'strcat ले दोस्रो string लाई पहिलोको अन्त्यमा जोड्छ, त्यसैले पहिलो array दुवै अट्ने ठूलो हुनुपर्छ। a लाई 10 होइन 30 राख्नुले यसलाई सुरक्षित बनाउँछ, र परीक्षाले प्रायः त्यही कुरा जाँच्छ।'
          }
        },
        {
          pre: 'if (______(pass, "open123") == 0)\n    printf("Correct");',
          answer: 'strcmp',
          why: {
            en: 'Two strings cannot be compared with the double equals sign, so strcmp is used and it returns zero when they match. Zero meaning equal is the opposite of what students expect, and it costs marks every year.',
            ne: 'दुई string लाई दोहोरो बराबर चिन्हले तुलना गर्न मिल्दैन, त्यसैले strcmp प्रयोग हुन्छ र मिले शून्य फर्काउँछ। शून्यको अर्थ बराबर हुनु विद्यार्थीको अपेक्षाविपरीत छ, र हरेक वर्ष अंक खान्छ।'
          }
        },
        {
          pre: 'An empty box must be made to hold\nexactly the same text that is already\nin another box.',
          answer: 'strcpy',
          why: {
            en: 'Making one string equal to another is a copy and nothing else, so strcpy is the answer even when the task is described in words. strcat would join the two instead and leave the original text in place.',
            ne: 'एउटा string अर्कोसरह बनाउनु प्रतिलिपि नै हो, त्यसैले शब्दमा वर्णन गरिए पनि उत्तर strcpy हो। strcat ले त दुवैलाई जोडिदिन्थ्यो र पहिलेको पाठ त्यहीँ रहन्थ्यो।'
          }
        }
      ]
    },

    /* ---- 6 structure vs union ---- */
    cstructunion: {
      title: { en: 'Structure or union?', ne: 'Structure कि union?' },
      lead: {
        en: 'They are declared almost identically and they behave completely differently, because a structure gives every member its own memory and a union makes them share one space. Decide from what the program needs.',
        ne: 'घोषणा झन्डै उस्तै र व्यवहार पूरै फरक — structure ले हरेक member लाई आफ्नै मेमोरी दिन्छ, union ले सबैलाई एउटै ठाउँ बाँड्न लगाउँछ। प्रोग्रामलाई के चाहिन्छ हेरेर निर्णय गर्नुहोस्।'
      },
      options: [
        { id: 'struct', label: { en: 'Structure', ne: 'Structure' } },
        { id: 'union',  label: { en: 'Union', ne: 'Union' } }
      ],
      cases: [
        {
          pre: 'A student record holding a name, a roll\nnumber and three subject marks, all of\nwhich must be available at once.',
          answer: 'struct',
          why: {
            en: 'Every member has to hold its own value at the same time, which is precisely what a structure gives and a union cannot. A record of several facts about one thing is the standard use of a structure.',
            ne: 'हरेक member ले एकैचोटि आफ्नै मान राख्नुपर्छ, र त्यही structure ले दिन्छ, union ले दिँदैन। एउटै कुराबारे धेरै तथ्यको record राख्नु structure को मानक प्रयोग हो।'
          }
        },
        {
          pre: 'A value that is sometimes an integer and\nsometimes a float, never both, and memory\nis very short.',
          answer: 'union',
          why: {
            en: 'Only one member is in use at any moment, so sharing one block of memory wastes nothing and saves the rest. Saving memory is the only reason a union exists, and it is the reason to give in an answer.',
            ne: 'कुनै पनि क्षणमा एउटा member मात्र प्रयोगमा हुन्छ, त्यसैले एउटै मेमोरी बाँड्दा केही खेर जाँदैन। Union हुनुको एकमात्र कारण मेमोरी बचाउनु हो, र उत्तरमा दिनुपर्ने कारण पनि त्यही।'
          }
        },
        {
          pre: 'After storing 65 in the first member,\nreading the second member gives\nnonsense.',
          answer: 'union',
          why: {
            en: 'Writing one member overwrites the shared space and the others become meaningless, which only happens in a union. In a structure each member keeps its own bytes and reading another is perfectly safe.',
            ne: 'एउटा member लेख्दा साझा ठाउँ मेटिन्छ र अरूको अर्थ रहँदैन — यो union मा मात्र हुन्छ। Structure मा हरेक member का आफ्नै byte हुन्छन् र अर्को पढ्नु पूरै सुरक्षित हुन्छ।'
          }
        },
        {
          pre: 'Its total size equals the size of its\nlargest member, not the sum of all\nthe members.',
          answer: 'union',
          why: {
            en: 'One shared space has to be big enough for the biggest member and no bigger, so the size is the largest and not the total. A structure adds its members up, which is the standard comparison question.',
            ne: 'एउटै साझा ठाउँ सबैभन्दा ठूलो member अट्ने हुनुपर्छ, अरू होइन — त्यसैले आकार सबैभन्दा ठूलोको हुन्छ, जोड होइन। Structure ले सबै जोड्छ, र मानक तुलनात्मक प्रश्न त्यही हो।'
          }
        }
      ]
    },

    /* ---- 7.3 referencing and dereferencing ---- */
    cpointerop: {
      title: { en: 'Which pointer operator is needed here?',
               ne: 'यहाँ कुन pointer operator चाहिन्छ?' },
      lead: {
        en: 'Two operators, opposite directions. The ampersand takes an address out of a variable; the star takes a value out of an address. Decide which direction the line is travelling.',
        ne: 'दुई operator, उल्टा दिशा। Ampersand ले variable बाट ठेगाना निकाल्छ; star ले ठेगानाबाट मान निकाल्छ। लाइन कुन दिशामा गइरहेको छ, त्यही निर्णय गर्नुहोस्।'
      },
      options: [
        { id: 'amp',  label: { en: '& — address of', ne: '& — ठेगाना लिने' } },
        { id: 'star', label: { en: '* — value at', ne: '* — ठेगानाको मान' } },
        { id: 'none', label: { en: 'Neither', ne: 'दुवै होइन' } }
      ],
      cases: [
        {
          pre: 'int n = 10, *p;\np = ___n;',
          answer: 'amp',
          why: {
            en: 'A pointer stores an address, so the address of n has to be taken out of n before it can be stored. The ampersand is the only operator that produces an address, and this line is the standard way to aim a pointer.',
            ne: 'Pointer ले ठेगाना राख्छ, त्यसैले भण्डारण गर्नुअघि n बाट n को ठेगाना निकाल्नुपर्छ। ठेगाना निकाल्ने एकमात्र operator ampersand हो, र pointer लाई तेर्स्याउने मानक तरिका यही लाइन हो।'
          }
        },
        {
          pre: 'printf("%d", ___p);   /* must print 10,\n                         not an address */',
          answer: 'star',
          why: {
            en: 'The pointer holds an address, and printing the value stored there means following the pointer first. The star does that following, which is what dereferencing means and why it is read as value at.',
            ne: 'Pointer सँग ठेगाना छ, र त्यहाँको मान छाप्न पहिले pointer पछ्याउनुपर्छ। Star ले त्यही पछ्याउँछ — dereference को अर्थ त्यही हो, र यसलाई "ठेगानाको मान" भनेर पढिन्छ।'
          }
        },
        {
          pre: 'int marks[5];\nscanf("%d", ___marks[0]);',
          answer: 'amp',
          why: {
            en: 'One element of an array is an ordinary int variable, so scanf still needs its address. The array name alone is already an address, but a single element written with brackets is not, and this trips students.',
            ne: 'Array को एउटा element सामान्य int variable जस्तै हो, त्यसैले scanf लाई यसको ठेगाना चाहिन्छ। Array को नाम मात्र भए ठेगाना हुन्छ, तर कोष्ठकसहितको एउटा element हुँदैन — यहीँ विद्यार्थी अल्झिन्छन्।'
          }
        },
        {
          pre: 'char name[20];\nscanf("%s", ___name);',
          answer: 'none',
          why: {
            en: 'An array name already is the address of its first element, so writing an ampersand in front of it is unnecessary here. This is the one scanf in the subject that takes no ampersand, and it is asked about often.',
            ne: 'Array को नाम आफैंमा पहिलो element को ठेगाना हो, त्यसैले यहाँ अगाडि ampersand लेख्नु आवश्यक छैन। विषयभरिमा ampersand नचाहिने scanf यही हो, र यसबारे बारम्बार सोधिन्छ।'
          }
        },
        {
          pre: 'void swap(int *a, int *b) {\n    int t = ___a;   /* copy out the value */',
          answer: 'star',
          why: {
            en: 'Inside the function a holds an address, so the value living at that address is reached with the star. Writing t = a would copy the address into an int instead, and the swap would then exchange nothing.',
            ne: 'Function भित्र a सँग ठेगाना छ, त्यसैले त्यो ठेगानामा भएको मानसम्म star ले पुगिन्छ। t = a लेखे ठेगाना नै int मा सर्थ्यो, र swap ले केही साट्दैनथ्यो।'
          }
        }
      ]
    }
  };

  /* ---------------------------------------------------------------
     ONE MOUNTED DRILL
     --------------------------------------------------------------- */
  function Drill(root){
    this.root = root;
    var key = root.getAttribute('data-set') || 'normalforms';
    this.set = SETS[key] || SETS.normalforms;
    this.reset(true);
  }

  Drill.prototype.reset = function (first){
    this.i = 0;
    this.chosen = null;
    this.right = 0;
    this.done = 0;
    this.render();
    if (!first){
      var b = this.root.querySelector('.drill-opt');
      if (b) b.focus();
    }
  };

  Drill.prototype.current = function (){ return this.set.cases[this.i]; };

  /* A stable id per instance, so aria-labelledby survives a re-render
     and two drills on one page cannot collide. */
  Drill.prototype.id = function (s){
    if (!this._id) this._id = this.root.id || ('drill' + Math.floor(Math.random() * 1e6));
    return this._id + '-' + s;
  };

  Drill.prototype.render = function (){
    var self = this, c = this.current(), h = '';

    var titleId = this.id('title');

    h += '<div class="drill-head">' +
         '<span class="drill-title" id="' + titleId + '">' +
         '<span class="t-en">' + esc(this.set.title.en) + '</span>' +
         '<span class="np-cell" lang="ne">' + esc(this.set.title.ne) + '</span></span>' +
         '<span class="drill-count">' + (this.i + 1) + ' / ' + this.set.cases.length + '</span>' +
         '</div>';

    h += '<p class="drill-lead"><span class="t-en">' + esc(this.set.lead.en) + '</span>' +
         '<span class="np-cell" lang="ne">' + esc(this.set.lead.ne) + '</span></p>';

    h += '<pre class="drill-pre">' + esc(c.pre) + '</pre>';

    /* Named by the drill's own question rather than by a generic label.
       Several option sets are bare values — "1:1", "1NF" — and read
       aloud in isolation they say nothing. Pointing at the title means
       a listener entering the group hears what is being asked, and it
       stays bilingual because the title element already is. */
    h += '<div class="drill-opts" role="group" aria-labelledby="' + titleId + '">';
    h += this.set.options.map(function (o){
      var state = '';
      if (self.chosen){
        if (o.id === c.answer) state = ' is-right';
        else if (o.id === self.chosen) state = ' is-wrong';
      }
      return '<button type="button" class="drill-opt' + state + '" data-drill-opt="' + esc(o.id) + '"' +
             (self.chosen ? ' disabled' : '') +
             ' aria-pressed="' + (self.chosen === o.id) + '">' +
             pair(o.label) + '</button>';
    }).join('');
    h += '</div>';

    /* The verdict is short, so it is safe to announce; the reason sits
       beside it and is read when the student wants it. */
    h += '<p class="drill-verdict" role="status">' + this.verdictHtml() + '</p>';

    if (this.chosen){
      h += '<div class="drill-why"><span class="t-en">' + esc(c.why.en) + '</span>' +
           '<span class="np-cell" lang="ne">' + esc(c.why.ne) + '</span></div>';
      h += '<div class="sim-controls">';
      if (this.i < this.set.cases.length - 1){
        h += '<button type="button" class="primary" data-drill-act="next" data-ui="next">Next &#9656;</button>';
      }
      h += '<button type="button" class="coral" data-drill-act="reset" data-ui="restart">Start again</button></div>';
    }

    this.root.innerHTML = h;
    if (global.UIStrings && global.UIStrings.apply) global.UIStrings.apply(this.root);
    this.wire();
  };

  Drill.prototype.verdictHtml = function (){
    if (!this.chosen) return '';
    var right = this.chosen === this.current().answer;
    var last = this.i === this.set.cases.length - 1;
    var score = last ? ' ' + this.right + ' of ' + this.set.cases.length + ' correct.' : '';
    var scoreNe = last ? ' ' + this.set.cases.length + ' मध्ये ' + this.right + ' सही।' : '';
    return '<span class="t-en">' + (right ? 'Correct.' : 'Not this one.') + score + '</span>' +
           '<span class="np-cell" lang="ne">' + (right ? 'ठिक भयो।' : 'यो होइन।') + scoreNe + '</span>';
  };

  Drill.prototype.choose = function (id){
    if (this.chosen) return;
    this.chosen = id;
    this.done++;
    if (id === this.current().answer) this.right++;
    this.render();
  };

  Drill.prototype.next = function (){
    if (this.i >= this.set.cases.length - 1) return;
    this.i++;
    this.chosen = null;
    this.render();
    var b = this.root.querySelector('.drill-opt');
    if (b) b.focus();
  };

  Drill.prototype.wire = function (){
    var self = this, i;
    var opts = this.root.querySelectorAll('[data-drill-opt]');
    for (i = 0; i < opts.length; i++){
      opts[i].addEventListener('click', function (){
        self.choose(this.getAttribute('data-drill-opt'));
      });
    }
    var nx = this.root.querySelector('[data-drill-act="next"]');
    if (nx) nx.addEventListener('click', function (){ self.next(); });
    var rs = this.root.querySelector('[data-drill-act="reset"]');
    if (rs) rs.addEventListener('click', function (){ self.reset(); });
  };

  /* ---------------------------------------------------------------
     MOUNT
     --------------------------------------------------------------- */
  function mountAll(){
    if (typeof document === 'undefined') return;
    var nodes = document.querySelectorAll('.drill');
    for (var i = 0; i < nodes.length; i++){
      (function (root, n){
        if (root.getAttribute('data-mounted')) return;
        root.setAttribute('data-mounted', '1');
        var d = new Drill(root);
        root._drill = d;
        if (global.SimulationService){
          global.SimulationService.register({
            id: 'drill:' + (root.id || ('drill' + n)),
            /* The component is subject-agnostic: it drills a rule, and a
               rule belongs to whatever subject declared it. The page
               says which, so a second subject reuses this rather than
               registering everything under the one it was written for. */
            subject: (document.querySelector('main[data-subject]') || { getAttribute: function (){ return null; } })
                       .getAttribute('data-subject') || 'grade10/dbms',
            unit: root.getAttribute('data-set') || 'drill',
            title: { en: 'Decision drill', ne: 'निर्णय अभ्यास' },
            mounts: function (){ return !!root.parentNode; },
            reset: function (){ d.reset(); },
            controls: [
              { id: 'choose', label: { en: 'Choose an answer', ne: 'उत्तर छान्नुहोस्' } },
              { id: 'next',   label: { en: 'Next case', ne: 'अर्को केस' } }
            ]
          });
        }
      })(nodes[i], i);
    }
  }

  function ready(fn){
    if (typeof document === 'undefined') return;
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }
  ready(mountAll);

  global.Drill = { SETS: SETS, mount: mountAll, Drill: Drill };
  if (typeof module !== 'undefined' && module.exports) module.exports = global.Drill;

})(typeof window !== 'undefined' ? window : globalThis);
