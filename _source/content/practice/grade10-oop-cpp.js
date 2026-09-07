/* ============================================================
   GRADE 10 · DS & OOP WITH C++ — faded guided practice

   THE SKILL
   Working out the order in which constructors and destructors run for an
   inheritance chain. It is worth marks directly ("write the output of
   this program") and it is the reasoning behind several other answers,
   so a student who has it can derive rather than memorise.

   WHY THIS SKILL AND NOT ANOTHER
   Unit 5 already animates the order and gives four worked examples of
   DIFFERENT sub-skills — basic syntax, multiple inheritance, virtual
   base, and a predict-the-output. What it has never offered is the same
   decision made several times with the help coming away, which is what
   turns a rule a student has read into one they can apply under exam
   pressure.

   WHY THE ANSWERS ARE CLASS NAMES
   Each step asks which constructor runs next. The answer is one
   identifier, so it can be marked, and the feedback can name the rule
   that decides it at the moment the student got it wrong.

   SYLLABUS
   CDC Grade 10, DS & OOP with C++ unit 5 — Inheritance: single,
   multilevel and multiple, and the order of constructor and destructor
   invocation. Nothing here goes beyond it.
   ============================================================ */

module.exports = [

  {
    id: 'oop.ctororder',
    subject: 'grade10/oop-cpp',
    unit: 'u5',
    skill: {
      en: 'Work out the order constructors and destructors run in',
      ne: 'constructor र destructor कुन क्रममा चल्छन् भन्ने पत्ता लगाउनुहोस्'
    },
    rule: {
      en: 'Construction goes BASE FIRST, down to the most derived class. ' +
          'Destruction is the exact reverse: the most derived class is destroyed first. ' +
          'For multiple inheritance, bases run in the order they are LISTED after the colon.',
      ne: 'निर्माण BASE बाट सुरु भई सबैभन्दा derived कक्षासम्म जान्छ। ' +
          'विनाश ठ्याक्कै उल्टो: सबैभन्दा derived कक्षा पहिले नष्ट हुन्छ। ' +
          'multiple inheritance मा base हरू colon पछि जुन क्रममा लेखिएका छन् त्यही क्रममा चल्छन्।'
    },
    problems: [
      {
        fade: 'worked',
        ask: {
          en: 'class Animal { }; class Dog : public Animal { }; ' +
              'You write: Dog d; — which constructor runs first?',
          ne: 'class Animal { }; class Dog : public Animal { }; ' +
              'तपाईं लेख्नुहुन्छ: Dog d; — कुन constructor पहिले चल्छ?'
        },
        steps: [
          { prompt: { en: 'Which constructor runs first?', ne: 'कुन constructor पहिले चल्छ?' },
            answer: 'Animal', accept: ['animal()'],
            why: { en: 'The base is built first. A derived object cannot exist until the part it ' +
                       'inherits already does.',
                   ne: 'base पहिले बन्छ। derived वस्तु त्यतिन्जेल हुनै सक्दैन जब सम्म आफूले पाएको भाग बनेको हुँदैन।' } },
          { prompt: { en: 'Which constructor runs second?', ne: 'कुन constructor दोस्रोमा चल्छ?' },
            answer: 'Dog', accept: ['dog()'],
            why: { en: 'Dog is the most derived class, so it is built last — on top of a finished Animal.',
                   ne: 'Dog सबैभन्दा derived हो, त्यसैले अन्तिममा — तयार भइसकेको Animal माथि बन्छ।' } },
          { prompt: { en: 'When d goes out of scope, which destructor runs FIRST?',
                      ne: 'd को scope सकिँदा कुन destructor पहिले चल्छ?' },
            answer: '~Dog', accept: ['dog', '~dog()', '~dog'],
            why: { en: 'Destruction is the exact reverse of construction, so the most derived ' +
                       'class goes first.',
                   ne: 'विनाश निर्माणको ठ्याक्कै उल्टो हो, त्यसैले सबैभन्दा derived पहिले जान्छ।' } }
        ],
        result: 'Animal Dog ~Dog ~Animal',
        resultPrompt: { en: 'Write the whole order, separated by spaces',
                        ne: 'पूरा क्रम लेख्नुहोस्, खाली ठाउँले छुट्याएर' },
        check: { en: 'Down the chain to build, back up the chain to destroy. That one sentence ' +
                     'answers every question of this shape.',
                 ne: 'बनाउन तल, नष्ट गर्न माथि। यही एउटा वाक्यले यस्तै आकारका सबै प्रश्नको उत्तर दिन्छ।' }
      },

      {
        fade: 'partial',
        ask: {
          en: 'class A { }; class B : public A { }; class C : public B { }; ' +
              'You write: C obj; — multilevel inheritance. Give the construction order.',
          ne: 'class A { }; class B : public A { }; class C : public B { }; ' +
              'तपाईं लेख्नुहुन्छ: C obj; — multilevel inheritance। निर्माणको क्रम दिनुहोस्।'
        },
        steps: [
          { prompt: { en: 'First constructor', ne: 'पहिलो constructor' },
            answer: 'A', accept: ['a()'],
            why: { en: 'A is at the top of the chain, so it is built first — even though the ' +
                       'object you declared is a C.',
                   ne: 'A शृङ्खलाको सबैभन्दा माथि छ, त्यसैले पहिले बन्छ — तपाईंले घोषणा गरेको वस्तु C भए पनि।' } },
          { prompt: { en: 'Second constructor', ne: 'दोस्रो constructor' },
            answer: 'B', accept: ['b()'],
            why: { en: 'B sits between A and C, so it is built once A is finished.',
                   ne: 'B, A र C को बीचमा छ, त्यसैले A सकिएपछि बन्छ।' } },
          { prompt: { en: 'Third constructor', ne: 'तेस्रो constructor' },
            answer: 'C', accept: ['c()'],
            why: { en: 'C is the most derived, so it is built last.',
                   ne: 'C सबैभन्दा derived हो, त्यसैले अन्तिममा बन्छ।' } },
          { prompt: { en: 'First destructor', ne: 'पहिलो destructor' },
            answer: '~C', accept: ['c', '~c()', '~c'],
            why: { en: 'Reverse of construction: the last one built is the first one destroyed.',
                   ne: 'निर्माणको उल्टो: अन्तिममा बनेको पहिले नष्ट हुन्छ।' } }
        ],
        result: 'A B C ~C ~B ~A',
        resultPrompt: { en: 'The whole order', ne: 'पूरा क्रम' },
        check: { en: 'Multilevel changes nothing about the rule — it just makes the chain longer. ' +
                     'A B C going down, ~C ~B ~A coming back.',
                 ne: 'multilevel ले नियम बदल्दैन — शृङ्खला मात्र लामो बनाउँछ। तल जाँदा A B C, फर्किँदा ~C ~B ~A।' }
      },

      {
        fade: 'guided',
        ask: {
          en: 'class Father { }; class Mother { }; class Child : public Father, public Mother { }; ' +
              'You write: Child c; — multiple inheritance. Give the construction order.',
          ne: 'class Father { }; class Mother { }; class Child : public Father, public Mother { }; ' +
              'तपाईं लेख्नुहुन्छ: Child c; — multiple inheritance। निर्माणको क्रम दिनुहोस्।'
        },
        steps: [
          { prompt: { en: 'First', ne: 'पहिलो' },
            answer: 'Father', accept: ['father()'],
            why: { en: 'With two bases, the one written FIRST after the colon is constructed ' +
                       'first. Father is listed before Mother.',
                   ne: 'दुई base हुँदा colon पछि पहिले लेखिएको पहिले बन्छ। Father, Mother भन्दा अगाडि लेखिएको छ।' } },
          { prompt: { en: 'Second', ne: 'दोस्रो' },
            answer: 'Mother', accept: ['mother()'],
            why: { en: 'Second in the list, second to be constructed. Note this has nothing to do ' +
                       'with alphabetical order — swap the list and the order swaps.',
                   ne: 'सूचीमा दोस्रो, बन्नमा पनि दोस्रो। यो वर्णक्रमसँग सम्बन्धित छैन — सूची बदल्नुहोस्, क्रम बदलिन्छ।' } },
          { prompt: { en: 'Third', ne: 'तेस्रो' },
            answer: 'Child', accept: ['child()'],
            why: { en: 'Both bases are ready, so the derived class is built on top of them.',
                   ne: 'दुवै base तयार भए, त्यसैले derived कक्षा तीमाथि बन्छ।' } },
          { prompt: { en: 'First destructor', ne: 'पहिलो destructor' },
            answer: '~Child', accept: ['child', '~child()', '~child'],
            why: { en: 'Reverse again. The derived class goes first, then Mother, then Father.',
                   ne: 'फेरि उल्टो। derived पहिले, अनि Mother, अनि Father।' } }
        ],
        result: 'Father Mother Child ~Child ~Mother ~Father',
        resultPrompt: { en: 'The whole order', ne: 'पूरा क्रम' },
        check: { en: 'The order of the bases comes from the class header, not from anything else. ' +
                     'That is the single fact this question is testing.',
                 ne: 'base हरूको क्रम class header बाट आउँछ, अरू कतैबाट होइन। यही एउटै तथ्य यो प्रश्नले जाँच्छ।' }
      },

      {
        fade: 'independent',
        ask: {
          en: 'class X { }; class Y { }; class Z : public Y, public X { }; ' +
              'You write: Z z; — write the full construction and destruction order, ' +
              'separated by spaces, using ~ for destructors.',
          ne: 'class X { }; class Y { }; class Z : public Y, public X { }; ' +
              'तपाईं लेख्नुहुन्छ: Z z; — निर्माण र विनाशको पूरा क्रम लेख्नुहोस्, ' +
              'खाली ठाउँले छुट्याएर, destructor लाई ~ राखेर।'
        },
        steps: [],
        result: 'Y X Z ~Z ~X ~Y',
        resultPrompt: { en: 'Full order', ne: 'पूरा क्रम' },
        check: { en: 'Y comes before X because the header says "public Y, public X" — the names ' +
                     'are deliberately out of alphabetical order to catch exactly that. If you ' +
                     'answered X Y Z, you sorted the names instead of reading the header.',
                 ne: 'header मा "public Y, public X" लेखिएकाले Y, X भन्दा पहिले आउँछ — नाम जानीजानी ' +
                     'वर्णक्रम बाहिर राखिएका छन्, यही समात्न। X Y Z भन्नुभयो भने header पढ्नुको सट्टा नाम क्रमबद्ध गर्नुभयो।' }
      }
    ]
  }

];
