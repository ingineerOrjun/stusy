/* ============================================================
   GRADE 9 · PROGRAMMING PRINCIPLES IN C — faded guided practice

   THE THREE SKILLS
   Each one is a DECISION a student makes on paper under examination
   conditions, with a small set of right answers, so it can be marked and
   the feedback can name the reason at the step where the student went
   wrong. Anything needing a sentence belongs in an examq retrieval block
   instead.

     c.traceloop   Unit 3 — run a loop in your head and say what each
                   variable holds. This is the skill behind every "what
                   is the output" question in the subject, and it is the
                   one students most often replace with guessing.
     c.callby      Unit 4 — decide whether the CALLER's variable changed.
                   Not what the function printed: what survived the call.
     c.arrayindex  Unit 5 — index arithmetic, where the whole unit's
                   marks are lost by one.

   WHY THESE THREE AND NOT ONE PER UNIT
   Units 3, 4 and 5 carry 31 of the subject's 50 external marks between
   them, and all three are examined by being made to work something out
   rather than by being asked what something is. Units 1, 2, 6 and 7 are
   examined mostly by definition and comparison, which the question bank
   and the examq blocks already cover; a faded ladder there would be
   scaffolding for a thing that needs none.

   WHY THE ANSWERS ARE SHORT TOKENS
   "10", "6", "yes", "4" — each step is a decision with one right answer,
   markable by comparison, and the marking normalises case and spacing.

   NO COMPILER RAN. Every value below was worked out by hand against C
   semantics and checked against the lesson that teaches it. See
   docs/GRADE-9-C-PROGRAMMING-CURRICULUM-MAP.md §6.
   ============================================================ */

module.exports = [

  /* ================================================================
     UNIT 3 — tracing a loop
     ================================================================ */
  {
    id: 'c.traceloop',
    subject: 'grade9/c-programming',
    unit: 'c-u3',
    skill: {
      en: 'Trace a loop on paper and give the value of every variable at every turn',
      ne: 'कागजमै loop ट्रेस गरेर हरेक पटक हरेक variable को मान भन्नुहोस्'
    },
    rule: {
      en: 'Write one column per variable and one row per turn. Fill a row in this order: ' +
          'test the condition, run the body, then apply the update. The loop ends when the ' +
          'condition is false — and the counter has ALREADY been updated past the last value ' +
          'it was used with.',
      ne: 'हरेक variable को एउटा स्तम्भ र हरेक पटकको एउटा पङ्क्ति लेख्नुहोस्। पङ्क्ति यही क्रममा ' +
          'भर्नुहोस्: सर्त जाँच्ने, body चलाउने, अनि update लगाउने। सर्त असत्य भएपछि loop सकिन्छ — ' +
          'र counter अन्तिम पटक प्रयोग भएको मानभन्दा पहिल्यै नाघिसकेको हुन्छ।'
    },
    problems: [
      {
        fade: 'worked',
        ask: {
          en: 'int i, sum = 0; for (i = 1; i <= 4; i++) sum = sum + i;  What is sum at the end, ' +
              'and what is i?',
          ne: 'int i, sum = 0; for (i = 1; i <= 4; i++) sum = sum + i;  अन्त्यमा sum कति हुन्छ, ' +
              'र i कति?'
        },
        steps: [
          { prompt: { en: 'After the FIRST turn (i = 1), what is sum?',
                      ne: 'पहिलो पटक (i = 1) पछि sum कति हुन्छ?' },
            answer: '1',
            why: { en: 'sum started at 0, and the body adds i, which is 1. So sum = 0 + 1 = 1.',
                   ne: 'sum ० बाट सुरु भयो, र body ले i — अर्थात् १ — जोड्छ। त्यसैले sum = 0 + 1 = 1।' } },
          { prompt: { en: 'After the SECOND turn (i = 2), what is sum?',
                      ne: 'दोस्रो पटक (i = 2) पछि sum कति हुन्छ?' },
            answer: '3',
            why: { en: 'sum was 1 and i is now 2, so sum = 1 + 2 = 3. Each turn adds the current ' +
                       'i to whatever sum already held.',
                   ne: 'sum १ थियो र i अब २ छ, त्यसैले sum = 1 + 2 = 3। हरेक पटक अहिलेको i लाई ' +
                       'sum मा पहिल्यै भएको मानमा जोडिन्छ।' } },
          { prompt: { en: 'The last turn uses i = 4. What is i when the loop STOPS?',
                      ne: 'अन्तिम पटक i = 4 मा चल्छ। Loop रोकिँदा i कति हुन्छ?' },
            answer: '5',
            why: { en: 'After the body runs with i = 4, i++ makes i 5, and only then is the ' +
                       'condition tested: 5 <= 4 is false, so the loop ends with i holding 5.',
                   ne: 'i = 4 मा body चलेपछि i++ ले i लाई ५ बनाउँछ, अनि मात्र सर्त जाँचिन्छ: ' +
                       '5 <= 4 असत्य, त्यसैले loop सकिँदा i मा ५ हुन्छ।' } }
        ],
        result: '10',
        resultPrompt: { en: 'So what is the final value of sum?',
                        ne: 'त्यसो भए sum को अन्तिम मान कति हुन्छ?' },
        check: {
          en: '1 + 2 + 3 + 4 = 10, and i is 5 rather than 4. Those two answers come from the ' +
              'same table and students get the first right and the second wrong, because the ' +
              'update runs after the last useful turn.',
          ne: '1 + 2 + 3 + 4 = 10, र i ४ नभई ५ हुन्छ। दुवै उत्तर उही तालिकाबाट आउँछन् र ' +
              'विद्यार्थीले पहिलो ठिक अनि दोस्रो गलत पार्छन्, किनभने अन्तिम काम लाग्ने पटकपछि ' +
              'पनि update चल्छ।'
        }
      },

      {
        fade: 'partial',
        ask: {
          en: 'int i, c = 0; for (i = 2; i <= 10; i = i + 2) c++;  How many times does the ' +
              'body run?',
          ne: 'int i, c = 0; for (i = 2; i <= 10; i = i + 2) c++;  body कति पटक चल्छ?'
        },
        steps: [
          { prompt: { en: 'List the values i takes. What is the LAST one the body runs with?',
                      ne: 'i ले लिने मान सोच्नुहोस्। body अन्तिम पटक कुन मानमा चल्छ?' },
            answer: '10',
            why: { en: 'The update adds 2 each time, so i is 2, 4, 6, 8, 10. The condition is ' +
                       'i <= 10, so 10 passes and the body runs with it.',
                   ne: 'Update ले हरेक पटक २ जोड्छ, त्यसैले i २, ४, ६, ८, १० हुन्छ। सर्त i <= 10 ' +
                       'भएकाले १० पास हुन्छ र body त्यसमै चल्छ।' } },
          { prompt: { en: 'What is i when the condition first fails?',
                      ne: 'सर्त पहिलो पटक असफल हुँदा i कति हुन्छ?' },
            answer: '12',
            why: { en: 'After the turn with i = 10 the update makes i 12, and 12 <= 10 is false. ' +
                       'The step is 2, so the counter overshoots by 2 rather than by 1.',
                   ne: 'i = 10 को पटकपछि update ले i लाई १२ बनाउँछ, र 12 <= 10 असत्य हुन्छ। ' +
                       'पाइला २ भएकाले counter १ होइन २ ले नाघ्छ।' } }
        ],
        result: '5',
        resultPrompt: { en: 'So how many times did the body run?',
                        ne: 'त्यसो भए body कति पटक चल्यो?' },
        check: {
          en: 'Five turns: 2, 4, 6, 8, 10. Counting is not (10 - 2) = 8 and not 10: with a step ' +
              'of 2 the number of turns is the number of values the counter actually takes.',
          ne: 'पाँच पटक: २, ४, ६, ८, १०। गन्ती (10 - 2) = 8 पनि होइन, १० पनि होइन: पाइला २ ' +
              'हुँदा पटकको सङ्ख्या counter ले साँच्चै लिने मानको सङ्ख्या हो।'
        }
      },

      {
        fade: 'guided',
        ask: {
          en: 'int i = 5, total = 0; while (i > 0) { total = total + i; i--; }  What is total?',
          ne: 'int i = 5, total = 0; while (i > 0) { total = total + i; i--; }  total कति हुन्छ?'
        },
        steps: [
          { prompt: { en: 'This loop counts DOWN. What is the first value added to total?',
                      ne: 'यो loop घट्दो छ। total मा पहिलो पटक कुन मान जोडिन्छ?' },
            answer: '5',
            why: { en: 'i starts at 5 and the condition 5 > 0 is true, so the body runs with ' +
                       'i still 5 and adds 5 before i-- reduces it.',
                   ne: 'i ५ बाट सुरु हुन्छ र सर्त 5 > 0 सत्य छ, त्यसैले i अझै ५ हुँदै body चल्छ ' +
                       'र i-- ले घटाउनुअघि ५ जोडिन्छ।' } },
          { prompt: { en: 'What is i when the loop stops?',
                      ne: 'Loop रोकिँदा i कति हुन्छ?' },
            answer: '0',
            why: { en: 'The last useful turn runs with i = 1, then i-- makes i 0, and 0 > 0 is ' +
                       'false. A down-counting loop overshoots below the limit, not above it.',
                   ne: 'अन्तिम काम लाग्ने पटक i = 1 मा चल्छ, अनि i-- ले i लाई ० बनाउँछ, र ' +
                       '0 > 0 असत्य हुन्छ। घट्दो loop सीमाभन्दा माथि होइन, तल नाघ्छ।' } }
        ],
        result: '15',
        resultPrompt: { en: 'What is the final value of total?',
                        ne: 'total को अन्तिम मान कति हुन्छ?' },
        check: {
          en: '5 + 4 + 3 + 2 + 1 = 15. The same total as counting up, because addition does not ' +
              'care about order — but the trace table is read in the opposite direction.',
          ne: '5 + 4 + 3 + 2 + 1 = 15। बढ्दो गन्तीकै जोड, किनभने जोडलाई क्रमको वास्ता छैन — तर ' +
              'ट्रेस तालिका उल्टो दिशामा पढिन्छ।'
        }
      },

      {
        fade: 'independent',
        ask: {
          en: 'for (i = 1; i <= 5; i++) { if (i == 3) continue; printf("%d", i); }  Write the ' +
              'exact output, with no spaces.',
          ne: 'for (i = 1; i <= 5; i++) { if (i == 3) continue; printf("%d", i); }  ठ्याक्कै ' +
              'output लेख्नुहोस्, खाली ठाउँ नराखी।'
        },
        steps: [],
        result: '1245',
        resultPrompt: { en: 'What is printed?', ne: 'के छापिन्छ?' },
        check: {
          en: 'continue abandons the rest of that turn only, so when i is 3 the printf below it ' +
              'is skipped and the loop carries on. 3 is missing from the output and nothing ' +
              'else is. Had the statement been break, the output would have been 12.',
          ne: 'continue ले त्यस पटकको बाँकी मात्र छाड्छ, त्यसैले i ३ हुँदा तलको printf छुट्छ र ' +
              'loop चलिरहन्छ। Output बाट ३ मात्र छुट्छ, अरू केही छुट्दैन। Statement break ' +
              'भएको भए output 12 हुन्थ्यो।'
        }
      },

      {
        fade: 'transfer',
        ask: {
          en: 'A menu is shown, a choice is read, and this repeats until the user picks Exit. ' +
              'Written with do-while and a condition that is already false at the start, how ' +
              'many times does the menu appear?',
          ne: 'Menu देखाइन्छ, छनोट पढिन्छ, र प्रयोगकर्ताले Exit नछानेसम्म दोहोरिन्छ। सुरुमै ' +
              'असत्य भइसकेको सर्तसहित do-while मा लेखिँदा menu कति पटक देखिन्छ?'
        },
        steps: [],
        result: '1',
        resultPrompt: { en: 'How many times does the menu appear?',
                        ne: 'Menu कति पटक देखिन्छ?' },
        check: {
          en: 'Once. A do-while runs its body before it tests anything, so a condition that is ' +
              'false from the beginning still lets the body happen exactly one time. Nothing ' +
              'has been traced here: the question moved from counting turns in a table to ' +
              'knowing where the test sits relative to the body, and that single structural ' +
              'fact decides the answer without any arithmetic at all.',
          ne: 'एक पटक। do-while ले केही जाँच्नुअघि body चलाउँछ, त्यसैले सुरुदेखि असत्य सर्त भए ' +
              'पनि body ठ्याक्कै एक पटक हुन्छ। यहाँ केही ट्रेस गरिएको छैन: प्रश्न तालिकामा पटक ' +
              'गन्नेबाट body र जाँच कुन क्रममा छन् भन्ने तिर सर्‍यो, र त्यही एउटा संरचनागत ' +
              'तथ्यले कुनै गणनाविनै उत्तर तय गर्छ।'
        }
      }
    ]
  },

  /* ================================================================
     UNIT 4 — did the caller's variable change?
     ================================================================ */
  {
    id: 'c.callby',
    subject: 'grade9/c-programming',
    unit: 'c-u4',
    skill: {
      en: 'Decide whether a function changed the CALLER\'s variable, not what it printed',
      ne: 'Function ले के छाप्यो होइन, बोलाउनेको variable बदल्यो कि बदलेन निर्णय गर्नुहोस्'
    },
    rule: {
      en: 'Look for TWO things together: an & at the call, and a * in the parameter list. ' +
          'Both present means the function holds the caller\'s address and can write there. ' +
          'Either one missing means a copy was passed and the original is safe. An array is ' +
          'the exception: its name is already an address, so no & is written and the real ' +
          'array still goes in.',
      ne: 'दुई कुरा सँगै खोज्नुहोस्: call मा &, र parameter सूचीमा *। दुवै भए function सँग ' +
          'बोलाउनेको ठेगाना छ र त्यहाँ लेख्न सक्छ। एउटा छुटे प्रतिलिपि गएको हो र मूल variable ' +
          'सुरक्षित छ। Array अपवाद हो: यसको नाम आफैं ठेगाना भएकाले & नलेखे पनि साँच्चैको array ' +
          'नै भित्र जान्छ।'
    },
    problems: [
      {
        fade: 'worked',
        ask: {
          en: 'void swap(int x, int y) { int t = x; x = y; y = t; }  int a = 5, b = 9; ' +
              'swap(a, b);  What is a afterwards?',
          ne: 'void swap(int x, int y) { int t = x; x = y; y = t; }  int a = 5, b = 9; ' +
              'swap(a, b);  पछि a कति हुन्छ?'
        },
        steps: [
          { prompt: { en: 'Is there an & at the call? Answer yes or no',
                      ne: 'Call मा & छ? yes वा no' },
            answer: 'no', accept: ['n'],
            why: { en: 'swap(a, b) sends the values 5 and 9, not addresses. So C makes copies ' +
                       'and the function is given the copies.',
                   ne: 'swap(a, b) ले ठेगाना होइन, ५ र ९ मान पठाउँछ। त्यसैले C ले प्रतिलिपि ' +
                       'बनाएर function लाई ती दिन्छ।' } },
          { prompt: { en: 'Inside the function, what is x after the three lines run?',
                      ne: 'Function भित्र तीन लाइन चलेपछि x कति हुन्छ?' },
            answer: '9',
            why: { en: 'The swap works perfectly — on the copies. t holds 5, x takes y which is ' +
                       '9, y takes t. Everything inside the function is correct.',
                   ne: 'Swap ठिकै चल्छ — प्रतिलिपिमा। t सँग ५, x ले y अर्थात् ९ लिन्छ, y ले t। ' +
                       'Function भित्रको सबै कुरा सही छ।' } }
        ],
        result: '5',
        resultPrompt: { en: 'So what is a in main after the call?',
                        ne: 'त्यसो भए call पछि main को a कति हुन्छ?' },
        check: {
          en: 'a is still 5. The copies were swapped and then destroyed when the function ended. ' +
              'Nothing was returned and nothing in main was ever reached.',
          ne: 'a अझै ५ छ। प्रतिलिपि साटिए र function सकिँदा नष्ट भए। केही फर्काइएन र main को ' +
              'केहीसम्म पुगिएन।'
        }
      },

      {
        fade: 'partial',
        ask: {
          en: 'void swap(int *x, int *y) { int t = *x; *x = *y; *y = t; }  int a = 5, b = 9; ' +
              'swap(&a, &b);  What is a afterwards?',
          ne: 'void swap(int *x, int *y) { int t = *x; *x = *y; *y = t; }  int a = 5, b = 9; ' +
              'swap(&a, &b);  पछि a कति हुन्छ?'
        },
        steps: [
          { prompt: { en: 'What does &a send into the function — a value or an address?',
                      ne: '&a ले function भित्र के पठाउँछ — मान कि ठेगाना?' },
            answer: 'address', accept: ['addr', 'ठेगाना'],
            why: { en: 'The ampersand is the address-of operator, so what is copied into x is ' +
                       'a\'s address rather than a\'s value. A copy of an address still points ' +
                       'at the original.',
                   ne: '& address-of operator हो, त्यसैले x मा a को मान होइन, a को ठेगाना सर्छ। ' +
                       'ठेगानाको प्रतिलिपिले पनि मूल ठाउँ नै देखाउँछ।' } },
          { prompt: { en: 'The line *x = *y writes into which variable in main?',
                      ne: '*x = *y लाइनले main को कुन variable मा लेख्छ?' },
            answer: 'a',
            why: { en: 'x holds a\'s address, so *x means "the value at a\'s address", which is ' +
                       'a itself. The function is writing into main\'s memory.',
                   ne: 'x सँग a को ठेगाना छ, त्यसैले *x को अर्थ "a को ठेगानाको मान" — अर्थात् a ' +
                       'आफैं। Function ले main कै मेमोरीमा लेखिरहेको छ।' } }
        ],
        result: '9',
        resultPrompt: { en: 'So what is a in main after the call?',
                        ne: 'त्यसो भए call पछि main को a कति हुन्छ?' },
        check: {
          en: 'a is 9 and b is 5. Two ampersands at the call and two stars in the function are ' +
              'the whole difference from the previous program, which changed nothing.',
          ne: 'a ९ र b ५ हुन्छ। call का दुई ampersand र function का दुई star — केही नबदल्ने ' +
              'अघिल्लो प्रोग्रामसँगको पूरै फरक यति नै हो।'
        }
      },

      {
        fade: 'guided',
        ask: {
          en: 'void twice(int *x) { *x = *x * 2; }  int n = 6; twice(&n);  What is n afterwards?',
          ne: 'void twice(int *x) { *x = *x * 2; }  int n = 6; twice(&n);  पछि n कति हुन्छ?'
        },
        steps: [
          { prompt: { en: 'What does *x stand for on the right-hand side? Answer 6 or 12',
                      ne: 'दायाँपट्टि *x ले केलाई जनाउँछ? ६ कि १२?' },
            answer: '6',
            why: { en: 'The right side is worked out first, using the value n holds at that ' +
                       'moment, which is 6. Only then is the result stored back.',
                   ne: 'पहिले दायाँको गणना हुन्छ, र त्यति बेला n मा भएको मान — ६ — प्रयोग ' +
                       'हुन्छ। नतिजा त्यसपछि मात्र फर्केर भण्डारण हुन्छ।' } }
        ],
        result: '12',
        resultPrompt: { en: 'What is n after the call?', ne: 'Call पछि n कति हुन्छ?' },
        check: {
          en: '*x = *x * 2 is n = n * 2 written through a pointer, so n becomes 12. No value ' +
              'was returned and none was needed.',
          ne: '*x = *x * 2 भनेको pointer मार्फत लेखिएको n = n * 2 हो, त्यसैले n १२ हुन्छ। ' +
              'कुनै मान फर्काइएन र चाहिएन पनि।'
        }
      },

      {
        fade: 'independent',
        ask: {
          en: 'void add(int x) { x = x + 1; }  int n = 7; add(n); printf("%d", n);  What is ' +
              'printed?',
          ne: 'void add(int x) { x = x + 1; }  int n = 7; add(n); printf("%d", n);  के छापिन्छ?'
        },
        steps: [],
        result: '7',
        resultPrompt: { en: 'What is printed?', ne: 'के छापिन्छ?' },
        check: {
          en: 'No ampersand at the call and no star in the parameter list, so a copy was passed. ' +
              'The copy became 8 and was then destroyed; n never changed and 7 is printed.',
          ne: 'Call मा ampersand छैन र parameter सूचीमा star छैन, त्यसैले प्रतिलिपि पठाइयो। ' +
              'प्रतिलिपि ८ भएर नष्ट भयो; n कहिल्यै बदलिएन र ७ छापिन्छ।'
        }
      },

      {
        fade: 'transfer',
        ask: {
          en: 'A sorting function receives a list of marks written as fill(marks, 5), with no ' +
              'ampersand anywhere. Back in main, is the list now in order? Answer yes or no.',
          ne: 'क्रम मिलाउने function लाई अंकको सूची fill(marks, 5) ले पठाइएको छ, कतै ampersand ' +
              'छैन। main मा फर्कंदा सूची मिलेको हुन्छ? yes वा no।'
        },
        steps: [],
        result: 'yes',
        resultPrompt: { en: 'Is the caller\'s list sorted? yes or no',
                        ne: 'बोलाउनेको सूची मिलेको हुन्छ? yes कि no' },
        check: {
          en: 'Yes, and the rule about looking for an ampersand is what has moved. An array ' +
              'name used on its own already IS the address of its first element, so no ' +
              'ampersand is written because none is needed, and the function receives the real ' +
              'array rather than a copy of it. This is the one exception to everything above, ' +
              'and it is why a sorting function changes the caller\'s list without returning ' +
              'anything at all.',
          ne: 'हुन्छ, र ampersand खोज्ने नियम नै यहाँ सरेको छ। Array को नाम एक्लै प्रयोग गर्दा ' +
              'त्यो पहिलो element को ठेगाना नै हो, त्यसैले ampersand नचाहिने भएर नलेखिएको हो, र ' +
              'function लाई प्रतिलिपि होइन साँच्चैको array पुग्छ। माथिका सबै कुराको एकमात्र ' +
              'अपवाद यही हो, र क्रम मिलाउने function ले केही नफर्काई बोलाउनेको सूची बदल्नुको ' +
              'कारण पनि त्यही।'
        }
      }
    ]
  },

  /* ================================================================
     UNIT 5 — index arithmetic
     ================================================================ */
  {
    id: 'c.arrayindex',
    subject: 'grade9/c-programming',
    unit: 'c-u5',
    skill: {
      en: 'Work out which box an index names, and where an array or a string actually ends',
      ne: 'कुन index ले कुन बाकस जनाउँछ, र array वा string साँच्चै कहाँ सकिन्छ पत्ता लगाउनुहोस्'
    },
    rule: {
      en: 'Indexing starts at 0, so for a size of n the valid indices are 0 to n - 1 and the ' +
          'last index is n - 1. A string stores one extra character, the null, after its ' +
          'letters — so strlen counts the letters and sizeof counts the whole array, and the ' +
          'two numbers are different on purpose.',
      ne: 'Index ० बाट सुरु हुन्छ, त्यसैले n आकारमा मान्य index ० देखि n − 1 सम्म हुन्छन् र ' +
          'अन्तिम index n − 1 हो। String ले अक्षरपछि null भन्ने एउटा थप अक्षर राख्छ — त्यसैले ' +
          'strlen ले अक्षर गन्छ र sizeof ले पूरै array, र दुई सङ्ख्या जानीजानी फरक हुन्छन्।'
    },
    problems: [
      {
        fade: 'worked',
        ask: {
          en: 'int a[5] = {10, 20, 30, 40, 50};  Which box does a[0] name, and what is the ' +
              'last valid index?',
          ne: 'int a[5] = {10, 20, 30, 40, 50};  a[0] ले कुन बाकस जनाउँछ, र अन्तिम मान्य index ' +
              'कति हो?'
        },
        steps: [
          { prompt: { en: 'What is the value of a[0]?', ne: 'a[0] को मान कति हो?' },
            answer: '10',
            why: { en: 'Index 0 is the FIRST element, not the zeroth of six. The five values ' +
                       'sit at indices 0, 1, 2, 3 and 4.',
                   ne: 'Index ० पहिलो element हो, छ मध्येको शून्यौं होइन। पाँच मान index ०, १, ' +
                       '२, ३ र ४ मा बस्छन्।' } },
          { prompt: { en: 'What is the value of a[4]?', ne: 'a[4] को मान कति हो?' },
            answer: '50',
            why: { en: 'a[4] is the fifth and last element. Counting from zero, the fifth ' +
                       'element carries index 4 — one less than you would say out loud.',
                   ne: 'a[4] पाँचौं र अन्तिम element हो। शून्यबाट गन्दा पाँचौं element को index ' +
                       '४ हुन्छ — बोल्दा भनिनेभन्दा एक कम।' } }
        ],
        result: '4',
        resultPrompt: { en: 'So what is the last valid index?',
                        ne: 'त्यसो भए अन्तिम मान्य index कति हो?' },
        check: {
          en: 'Size 5, indices 0 to 4, last index 4. There is no a[5], and C will not stop you ' +
              'writing one — it has no bounds checking at all.',
          ne: 'आकार ५, index ० देखि ४, अन्तिम index ४। a[5] भन्ने छैन, र C ले त्यो लेख्नबाट ' +
              'रोक्दैन — यसमा bound जाँच्ने व्यवस्थै छैन।'
        }
      },

      {
        fade: 'partial',
        ask: {
          en: 'int b[4] = {7, 3};  What is b[2]?',
          ne: 'int b[4] = {7, 3};  b[2] कति हुन्छ?'
        },
        steps: [
          { prompt: { en: 'How many values were given in the list?',
                      ne: 'सूचीमा कति मान दिइएका छन्?' },
            answer: '2',
            why: { en: 'Only 7 and 3 were written, so indices 0 and 1 are filled and 2 and 3 ' +
                       'were not given anything.',
                   ne: 'केवल ७ र ३ लेखिएका छन्, त्यसैले index ० र १ भरिए र २ अनि ३ लाई केही ' +
                       'दिइएन।' } }
        ],
        result: '0',
        resultPrompt: { en: 'So what is b[2]?', ne: 'त्यसो भए b[2] कति हुन्छ?' },
        check: {
          en: 'An initialiser list shorter than the array sets the remaining elements to zero, ' +
              'not to garbage. That is a rule about initialisation: int b[4]; with no list at ' +
              'all would leave all four holding garbage.',
          ne: 'Array भन्दा छोटो initialiser सूचीले बाँकी element लाई garbage नभई शून्य बनाउँछ। ' +
              'यो initialisation को नियम हो: सूची नै नभएको int b[4]; मा चारै मा garbage ' +
              'रहन्थ्यो।'
        }
      },

      {
        fade: 'guided',
        ask: {
          en: 'char s[10] = "NEPAL";  What does strlen(s) return, and at which index does the ' +
              'null character sit?',
          ne: 'char s[10] = "NEPAL";  strlen(s) ले के फर्काउँछ, र null अक्षर कुन index मा बस्छ?'
        },
        steps: [
          { prompt: { en: 'How many boxes does the compiler actually fill?',
                      ne: 'Compiler ले साँच्चै कति बाकस भर्छ?' },
            answer: '6',
            why: { en: 'Five letters and the null character after them. The null is written ' +
                       'automatically; nobody types it.',
                   ne: 'पाँच अक्षर र तिनपछि null अक्षर। Null आफैं लेखिन्छ; कसैले टाइप गर्दैन।' } },
          { prompt: { en: 'At which index does the null character sit?',
                      ne: 'Null अक्षर कुन index मा बस्छ?' },
            answer: '5',
            why: { en: 'The letters occupy 0 to 4, so the null is at index 5 — the sixth box, ' +
                       'and the first one you never wrote to.',
                   ne: 'अक्षरले ० देखि ४ ओगट्छन्, त्यसैले null index ५ मा — छैटौं बाकस, र ' +
                       'तपाईंले कहिल्यै नलेखेको पहिलो बाकस।' } }
        ],
        result: '5',
        resultPrompt: { en: 'What does strlen(s) return?', ne: 'strlen(s) ले के फर्काउँछ?' },
        check: {
          en: 'strlen gives 5 because it counts up to the null and does not count it. Three ' +
              'numbers describe this one variable and all three are right: length 5, characters ' +
              'stored 6, array size 10.',
          ne: 'strlen ले ५ दिन्छ, किनभने यसले null सम्म गन्छ र त्यसलाई गन्दैन। यही एउटै ' +
              'variable लाई तीन सङ्ख्याले वर्णन गर्छन् र तीनै ठिक छन्: लम्बाइ ५, भण्डारण भएका ' +
              'अक्षर ६, array को आकार १०।'
        }
      },

      {
        fade: 'independent',
        ask: {
          en: 'int a[5] = {10, 20, 30, 40, 50};  What is a[1] + a[3]?',
          ne: 'int a[5] = {10, 20, 30, 40, 50};  a[1] + a[3] कति हुन्छ?'
        },
        steps: [],
        result: '60',
        resultPrompt: { en: 'What is a[1] + a[3]?', ne: 'a[1] + a[3] कति हुन्छ?' },
        check: {
          en: 'a[1] is 20, the second element, and a[3] is 40, the fourth. 20 + 40 = 60. ' +
              'Reading a[1] as the first element and a[3] as the third would give 10 + 30 = 40.',
          ne: 'a[1] दोस्रो element — २०, र a[3] चौथो — ४०। 20 + 40 = 60। a[1] लाई पहिलो र ' +
              'a[3] लाई तेस्रो पढे 10 + 30 = 40 आउँथ्यो।'
        }
      },

      {
        fade: 'transfer',
        ask: {
          en: 'Somebody writes the condition as i <= 5 instead of i < 5 while adding up the ' +
              'same five marks. Give the one index their loop reaches that does not belong to ' +
              'the array.',
          ne: 'उही पाँच अंक जोड्दा कसैले सर्त i < 5 को साटो i <= 5 लेख्छ। तिनको loop ले पुग्ने ' +
              'तर array को नभएको एउटा index भन्नुहोस्।'
        },
        steps: [],
        result: '5',
        resultPrompt: { en: 'Which index is outside the array?',
                        ne: 'कुन index array बाहिर छ?' },
        check: {
          en: 'Index 5. The loop now runs six times and the sixth reaches a box one past the ' +
              'end of an array whose last valid index is 4. Nothing moved in the data and ' +
              'nothing moved in the array — only the comparison operator — and that single ' +
              'character turns a correct total into a number that may be wrong, may corrupt ' +
              'another variable, or may crash the program, differently on each run.',
          ne: 'Index ५। अब loop छ पटक चल्छ र छैटौंले अन्तिम मान्य index ४ भएको array को ' +
              'अन्त्यभन्दा एक बाकस पर पुग्छ। Data मा केही सरेन, array मा पनि केही सरेन — तुलना ' +
              'गर्ने operator मात्र सर्‍यो — र त्यही एउटा अक्षरले सही जोडलाई गलत हुन सक्ने, ' +
              'अर्को variable बिगार्न सक्ने, वा प्रोग्राम crash गराउन सक्ने सङ्ख्यामा बदल्छ, ' +
              'र हरेक पटक फरक नतिजा दिन सक्छ।'
        }
      }
    ]
  }

];
