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
