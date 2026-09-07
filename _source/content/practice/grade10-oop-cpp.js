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
,

  /* ============================================================
     UNIT 2 — PREDICTING WHAT A CONTROL STATEMENT PRINTS

     14 marks and the broadest unit in the product: sixteen topics, from
     the seven features of OOP through tokens and data types to the
     control statements. Most of it is recall, and recall is already well
     served — four worked examples, four comparison tables, a drill.

     What is NOT served is the one procedural thing the unit teaches:
     working out what a program prints. Example 4 is titled "while vs
     do…while — the difference that gets tested", which is the unit
     telling you where the marks are, and it is a worked example nobody
     practises.

     WHY OUTPUT AND NOT DEFINITIONS
     A "choose the definition" exercise tests whether a sentence was
     read. Predicting output tests whether the rule behind it was
     understood, and it is the form the exam actually uses.

     WHY NOT THE PROGRAM TRACER
     The tracer walks one complete program step by step, which is a
     different thing: it shows HOW execution proceeds. This asks the
     student to predict WHERE it ends up, without stepping. Both are
     useful; neither replaces the other.

     SYLLABUS
     CDC Grade 10, DS & OOP with C++ unit 2 — 2.9 Control Statements.
     Nothing here uses a construct the unit has not introduced.
     ============================================================ */
  {
    id: 'oop.controlflow',
    subject: 'grade10/oop-cpp',
    unit: 'u2',
    skill: {
      en: 'Predict how many times a control statement runs',
      ne: 'control statement कति पटक चल्छ भनी अनुमान गर्नुहोस्'
    },
    rule: {
      en: 'An if…else ladder is checked from the TOP and stops at the first true condition. ' +
          'A while loop checks BEFORE it acts, so it can run zero times. ' +
          'A do…while acts BEFORE it checks, so it always runs at least once.',
      ne: 'if…else ladder माथिबाट जाँचिन्छ र पहिलो सत्य सर्तमै रोकिन्छ। ' +
          'while ले काम गर्नुअघि जाँच्छ, त्यसैले शून्य पटक पनि चल्न सक्छ। ' +
          'do…while ले जाँच्नुअघि काम गर्छ, त्यसैले कम्तीमा एक पटक चल्छ नै।'
    },
    problems: [
      {
        fade: 'worked',
        ask: {
          en: 'int i = 0; while (i < 3) { cout << "x"; i++; } — how many times does the body run?',
          ne: 'int i = 0; while (i < 3) { cout << "x"; i++; } — body कति पटक चल्छ?'
        },
        steps: [
          { prompt: { en: 'Is the condition true before the first pass? Answer yes or no',
                      ne: 'पहिलो पटकअघि सर्त सत्य छ? yes वा no' },
            answer: 'yes', accept: ['y', 'true'],
            why: { en: 'i is 0 and 0 < 3 is true, so the body runs. A while loop checks first, ' +
                       'and this check passed.',
                   ne: 'i = 0 र 0 < 3 सत्य छ, त्यसैले body चल्छ। while ले पहिले जाँच्छ, र यो जाँच पास भयो।' } },
          { prompt: { en: 'What is i when the condition finally fails?',
                      ne: 'सर्त असफल हुँदा i कति हुन्छ?' },
            answer: '3', accept: ['three'],
            why: { en: 'i goes 0, 1, 2, and after the third pass it is 3. 3 < 3 is false, so the ' +
                       'loop stops there.',
                   ne: 'i ० , १ , २ हुँदै तेस्रो पटकपछि ३ हुन्छ। 3 < 3 असत्य, त्यसैले लूप रोकिन्छ।' } }
        ],
        result: '3',
        resultPrompt: { en: 'Number of times the body runs', ne: 'body चल्ने पटक' },
        check: { en: 'Three: i was 0, 1 and 2. The value that FAILS the test is not a run — that ' +
                     'is the off-by-one everyone meets once.',
                 ne: 'तीन पटक: i ० , १ र २ थियो। जाँच असफल गर्ने मान चलेको गनिँदैन — यही एक-कमी ' +
                     'गल्ती सबैले एक पटक गर्छन्।' }
      },

      {
        fade: 'partial',
        ask: {
          en: 'int marks = 78; if (marks >= 90) cout << "A+"; else if (marks >= 75) cout << "A"; ' +
              'else if (marks >= 60) cout << "B"; — what is printed?',
          ne: 'int marks = 78; if (marks >= 90) cout << "A+"; else if (marks >= 75) cout << "A"; ' +
              'else if (marks >= 60) cout << "B"; — के छापिन्छ?'
        },
        steps: [
          { prompt: { en: 'Does 78 pass the first test (marks >= 90)? yes or no',
                      ne: '७८ पहिलो जाँच (marks >= 90) पास गर्छ? yes वा no' },
            answer: 'no', accept: ['n', 'false'],
            why: { en: '78 >= 90 is false, so the ladder moves to the next condition.',
                   ne: '78 >= 90 असत्य, त्यसैले ladder अर्को सर्तमा जान्छ।' } },
          { prompt: { en: 'Does it pass the second (marks >= 75)? yes or no',
                      ne: 'दोस्रो (marks >= 75) पास गर्छ? yes वा no' },
            answer: 'yes', accept: ['y', 'true'],
            why: { en: '78 >= 75 is true. The ladder stops at the FIRST true condition — the ' +
                       'third is never even checked.',
                   ne: '78 >= 75 सत्य। ladder पहिलो सत्य सर्तमै रोकिन्छ — तेस्रो जाँचिँदै जाँचिँदैन।' } }
        ],
        result: 'A',
        resultPrompt: { en: 'What is printed', ne: 'के छापिन्छ' },
        check: { en: '78 is also >= 60, but that line never runs. An else-if ladder is not a list ' +
                     'of independent tests — it is one decision with several branches.',
                 ne: '७८ चाहिँ >= 60 पनि हो, तर त्यो लाइन कहिल्यै चल्दैन। else-if ladder छुट्टाछुट्टै ' +
                     'जाँचको सूची होइन — धेरै हाँगा भएको एउटै निर्णय हो।' }
      },

      {
        fade: 'guided',
        ask: {
          en: 'int n = 5; while (n > 0) { cout << n; n = n - 2; } — how many times does the body run?',
          ne: 'int n = 5; while (n > 0) { cout << n; n = n - 2; } — body कति पटक चल्छ?'
        },
        steps: [
          { prompt: { en: 'List the values n takes while the loop is running, separated by spaces',
                      ne: 'लूप चल्दा n ले लिने मानहरू खाली ठाउँले छुट्याएर लेख्नुहोस्' },
            answer: '5 3 1', accept: ['531'],
            why: { en: 'n starts at 5 and drops by 2: 5, then 3, then 1. After 1 it becomes -1, ' +
                       'and -1 > 0 is false.',
                   ne: 'n ५ बाट सुरु भई २ ले घट्छ: ५, ३, १। १ पछि -१ हुन्छ, र -1 > 0 असत्य।' } }
        ],
        result: '3',
        resultPrompt: { en: 'Number of times the body runs', ne: 'body चल्ने पटक' },
        check: { en: 'Three. Counting a loop that does not step by 1 is where guessing stops ' +
                     'working — write the values down.',
                 ne: 'तीन। १-१ गरी नबढ्ने लूप गन्दा अनुमान काम लाग्दैन — मानहरू लेखेर हेर्नुहोस्।' }
      },

      {
        fade: 'independent',
        ask: {
          en: 'int j = 10; do { cout << "run"; } while (j < 5); — how many times does the body run?',
          ne: 'int j = 10; do { cout << "run"; } while (j < 5); — body कति पटक चल्छ?'
        },
        steps: [],
        result: '1',
        resultPrompt: { en: 'Number of times the body runs', ne: 'body चल्ने पटक' },
        check: { en: 'Once. The condition 10 < 5 is false from the start — but a do…while ACTS ' +
                     'before it CHECKS, so the body has already run by the time the condition is ' +
                     'tested. If you answered 0, you read it as a while loop: that is the exact ' +
                     'difference this unit says gets tested.',
                 ne: 'एक पटक। सर्त 10 < 5 सुरुदेखि नै असत्य छ — तर do…while ले जाँच्नुअघि काम ' +
                     'गर्छ, त्यसैले सर्त जाँच्दा body चलिसकेको हुन्छ। ० भन्नुभयो भने यसलाई while ' +
                     'ठान्नुभयो: युनिटले "यही जाँचिन्छ" भनेको ठ्याक्कै यही फरक हो।' }
      },

      {
        /* TRANSFER — same rule, different construct. A for loop is the
           third form of the same idea, and a student who answered the
           do…while correctly by memorising "at least once" cannot do
           this one; a student who understands check-before-act can. */
        fade: 'transfer',
        ask: {
          en: 'for (int k = 10; k < 5; k++) { cout << "run"; } — how many times does the body run?',
          ne: 'for (int k = 10; k < 5; k++) { cout << "run"; } — body कति पटक चल्छ?'
        },
        steps: [],
        result: '0',
        resultPrompt: { en: 'Number of times the body runs', ne: 'body चल्ने पटक' },
        check: { en: 'Zero. A for loop checks its condition BEFORE the first pass, exactly like a ' +
                     'while — so with k starting at 10 and the test k < 5, the body never runs. ' +
                     'Same numbers as the do…while above and the opposite answer: the construct ' +
                     'decides, not the values.',
                 ne: 'शून्य। for ले पहिलो पटकअघि नै सर्त जाँच्छ, ठ्याक्कै while जस्तै — त्यसैले ' +
                     'k = 10 र जाँच k < 5 हुँदा body कहिल्यै चल्दैन। माथिको do…while सँग उही ' +
                     'सङ्ख्या, उल्टो उत्तर: मानले होइन, construct ले निर्णय गर्छ।' }
      }
    ]
  }

];
