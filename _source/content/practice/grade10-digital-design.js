/* ============================================================
   GRADE 10 · DIGITAL DESIGN — faded guided practice

   WHY THIS EXISTS SEPARATELY FROM THE WORKED EXAMPLES
   The unit's worked examples are a progression of DIFFERENT sub-skills:
   decimal to binary, then binary to decimal, then fractions, then
   subtraction, then multiplication. Fading across them would be wrong —
   Example 2 is a new skill, not a repetition of Example 1, and hiding
   its working would remove the only demonstration a student gets.

   Fading needs the opposite shape: the SAME procedure, several times,
   with the scaffolding coming away. That is what this file holds.

       FULLY WORKED    every step shown, nothing asked
             |
       PARTIALLY       the routine steps shown, the decisions asked
             |
       GUIDED          every step asked, each with a prompt
             |
       INDEPENDENT     the question, and nothing else

   WHY THE STEPS ARE CHECKABLE
   A step whose answer is a number or a short token can be marked, so a
   student finds out they are wrong at the step where they went wrong
   rather than at the end. That is the whole value: the feedback names
   the misconception while the student still remembers the decision that
   caused it. Prose steps are not used here for that reason — the
   `examq` retrieval gate already handles written answers.

   SYLLABUS
   Number systems and conversion, CDC Grade 10 Digital Design unit 1
   ("1.3 Converting between bases"). Nothing here goes beyond it.
   ============================================================ */

module.exports = [

  {
    id: 'dd.dec2bin',
    subject: 'grade10/digital-design',
    unit: 'dd-u1',
    skill: {
      en: 'Decimal to binary by repeated division',
      ne: 'दशमलवबाट बाइनरी — पटक–पटक भाग गरेर'
    },
    /* The one rule the whole procedure depends on, stated once so the
       student has something to hold on to before the fading starts. */
    rule: {
      en: 'Divide by 2 and write the remainder. Repeat on the quotient until it is 0. ' +
          'Then read the remainders UPWARDS.',
      ne: '२ ले भाग गर्नुहोस् र बाँकी लेख्नुहोस्। भागफल ० नहुन्जेल दोहोर्‍याउनुहोस्। ' +
          'अनि बाँकीहरू तलबाट माथि पढ्नुहोस्।'
    },
    problems: [
      {
        fade: 'worked',
        ask: { en: 'Convert 13 to binary.', ne: '१३ लाई बाइनरीमा बदल्नुहोस्।' },
        steps: [
          { prompt: { en: '13 ÷ 2 — write the remainder', ne: '१३ ÷ २ — बाँकी लेख्नुहोस्' },
            answer: '1', accept: ['1'],
            why: { en: '13 = 6 × 2 + 1, so the quotient is 6 and the remainder is 1.',
                   ne: '१३ = ६ × २ + १, त्यसैले भागफल ६ र बाँकी १।' } },
          { prompt: { en: '6 ÷ 2 — write the remainder', ne: '६ ÷ २ — बाँकी लेख्नुहोस्' },
            answer: '0', accept: ['0'],
            why: { en: '6 = 3 × 2 + 0. An even number always leaves 0.',
                   ne: '६ = ३ × २ + ०। जोर सङ्ख्याले सधैं ० बाँकी छोड्छ।' } },
          { prompt: { en: '3 ÷ 2 — write the remainder', ne: '३ ÷ २ — बाँकी लेख्नुहोस्' },
            answer: '1', accept: ['1'],
            why: { en: '3 = 1 × 2 + 1.', ne: '३ = १ × २ + १।' } },
          { prompt: { en: '1 ÷ 2 — write the remainder', ne: '१ ÷ २ — बाँकी लेख्नुहोस्' },
            answer: '1', accept: ['1'],
            why: { en: '1 = 0 × 2 + 1. The quotient is now 0, so stop.',
                   ne: '१ = ० × २ + १। भागफल ० भयो, त्यसैले रोक्नुहोस्।' } }
        ],
        result: '1101',
        resultPrompt: { en: 'Read the remainders upwards', ne: 'बाँकीहरू तलबाट माथि पढ्नुहोस्' },
        check: { en: 'Check with place values: 8 + 4 + 0 + 1 = 13. ✓',
                 ne: 'स्थानीय मानले जाँच्नुहोस्: ८ + ४ + ० + १ = १३। ✓' }
      },

      {
        fade: 'partial',
        ask: { en: 'Convert 22 to binary.', ne: '२२ लाई बाइनरीमा बदल्नुहोस्।' },
        steps: [
          { prompt: { en: '22 ÷ 2 — remainder?', ne: '२२ ÷ २ — बाँकी?' },
            answer: '0', accept: ['0'],
            why: { en: '22 is even, so the remainder is 0 and the quotient is 11.',
                   ne: '२२ जोर छ, त्यसैले बाँकी ० र भागफल ११।' } },
          { prompt: { en: '11 ÷ 2 — remainder?', ne: '११ ÷ २ — बाँकी?' },
            answer: '1', accept: ['1'],
            why: { en: '11 = 5 × 2 + 1.', ne: '११ = ५ × २ + १।' } },
          { prompt: { en: '5 ÷ 2 — remainder?', ne: '५ ÷ २ — बाँकी?' },
            answer: '1', accept: ['1'],
            why: { en: '5 = 2 × 2 + 1.', ne: '५ = २ × २ + १।' } },
          { prompt: { en: '2 ÷ 2 — remainder?', ne: '२ ÷ २ — बाँकी?' },
            answer: '0', accept: ['0'],
            why: { en: '2 = 1 × 2 + 0.', ne: '२ = १ × २ + ०।' } },
          { prompt: { en: '1 ÷ 2 — remainder?', ne: '१ ÷ २ — बाँकी?' },
            answer: '1', accept: ['1'],
            why: { en: '1 = 0 × 2 + 1. Quotient 0 — stop here.',
                   ne: '१ = ० × २ + १। भागफल ० — यहीँ रोक्नुहोस्।' } }
        ],
        result: '10110',
        resultPrompt: { en: 'Now read them upwards', ne: 'अब तलबाट माथि पढ्नुहोस्' },
        check: { en: 'Check: 16 + 0 + 4 + 2 + 0 = 22. ✓',
                 ne: 'जाँच: १६ + ० + ४ + २ + ० = २२। ✓' }
      },

      {
        fade: 'guided',
        ask: { en: 'Convert 25 to binary.', ne: '२५ लाई बाइनरीमा बदल्नुहोस्।' },
        steps: [
          { prompt: { en: 'First remainder', ne: 'पहिलो बाँकी' }, answer: '1', accept: ['1'],
            why: { en: '25 is odd, so the first remainder is 1. Quotient 12.',
                   ne: '२५ बिजोर छ, त्यसैले पहिलो बाँकी १। भागफल १२।' } },
          { prompt: { en: 'Second remainder', ne: 'दोस्रो बाँकी' }, answer: '0', accept: ['0'],
            why: { en: '12 is even → 0. Quotient 6.', ne: '१२ जोर → ०। भागफल ६।' } },
          { prompt: { en: 'Third remainder', ne: 'तेस्रो बाँकी' }, answer: '0', accept: ['0'],
            why: { en: '6 is even → 0. Quotient 3.', ne: '६ जोर → ०। भागफल ३।' } },
          { prompt: { en: 'Fourth remainder', ne: 'चौथो बाँकी' }, answer: '1', accept: ['1'],
            why: { en: '3 = 1 × 2 + 1. Quotient 1.', ne: '३ = १ × २ + १। भागफल १।' } },
          { prompt: { en: 'Fifth remainder', ne: 'पाँचौं बाँकी' }, answer: '1', accept: ['1'],
            why: { en: '1 = 0 × 2 + 1. Stop — the quotient is 0.',
                   ne: '१ = ० × २ + १। रोक्नुहोस् — भागफल ० भयो।' } }
        ],
        result: '11001',
        resultPrompt: { en: 'The answer, read upwards', ne: 'उत्तर, तलबाट माथि' },
        check: { en: 'Check: 16 + 8 + 0 + 0 + 1 = 25. ✓',
                 ne: 'जाँच: १६ + ८ + ० + ० + १ = २५। ✓' }
      },

      {
        fade: 'independent',
        ask: { en: 'Convert 45 to binary. Work it out on paper, then enter the answer.',
               ne: '४५ लाई बाइनरीमा बदल्नुहोस्। कागजमा गरेर उत्तर लेख्नुहोस्।' },
        steps: [],
        result: '101101',
        resultPrompt: { en: '45 in binary', ne: 'बाइनरीमा ४५' },
        check: { en: 'Check: 32 + 0 + 8 + 4 + 0 + 1 = 45. ✓ ' +
                     'If you got 101101 reversed, you read the remainders downwards — ' +
                     'that is the one mistake this procedure punishes.',
                 ne: 'जाँच: ३२ + ० + ८ + ४ + ० + १ = ४५। ✓ ' +
                     'उल्टो आयो भने बाँकीहरू माथिबाट तल पढ्नुभयो — यही एउटै गल्ती यो विधिले दण्ड दिन्छ।' }
      }
    ]
  }

];
