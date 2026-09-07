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
,

  /* ============================================================
     UNIT 2 — APPLYING DE MORGAN'S THEOREMS

     15 marks, the heaviest unit in the subject. The lesson proves the
     second theorem by truth table, which is one of the two things the
     exam asks. The other — APPLYING a theorem to an expression under
     time pressure — had no practice at all, and the unit names the
     mistake students make while doing it: "breaking the bar but
     forgetting to change the sign".

     So the trap is built into the sequence rather than mentioned after
     it. Level 4 is a double negation, which is where the rule stops
     being mechanical.

     Answers are compared after whitespace and case are removed, and the
     `accept` lists carry the commuted order: A'+B' and B'+A' are the
     same expression, and a checker that rejected one would teach the
     student to distrust it.
     ============================================================ */
  {
    id: 'dd.demorgan',
    subject: 'grade10/digital-design',
    unit: 'dd-u2',
    skill: {
      en: 'Apply De Morgan\'s theorems to an expression',
      ne: 'अभिव्यक्तिमा De Morgan का नियम लागू गर्नुहोस्'
    },
    rule: {
      en: 'Break the bar, and change the sign. A dot becomes a plus; a plus becomes a dot. ' +
          'Both, or neither — never one.',
      ne: 'बार फुटाउनुहोस्, अनि चिन्ह बदल्नुहोस्। डट भए प्लस, प्लस भए डट। ' +
          'दुवै, कि केही पनि होइन — एउटा मात्र कहिल्यै होइन।'
    },
    problems: [
      {
        fade: 'worked',
        ask: { en: 'Simplify (A · B)\' using De Morgan\'s first theorem.',
               ne: 'De Morgan को पहिलो नियमले (A · B)\' सरल बनाउनुहोस्।' },
        steps: [
          { prompt: { en: 'Break the bar. What happens to each variable? Answer: complemented or unchanged',
                      ne: 'बार फुटाउनुहोस्। हरेक चरमा के हुन्छ? उत्तर: complemented वा unchanged' },
            answer: 'complemented', accept: ['complement', 'inverted', 'negated'],
            why: { en: 'Breaking the bar puts a complement on each variable separately: A becomes ' +
                       'A\' and B becomes B\'.',
                   ne: 'बार फुटाउँदा हरेक चरमा छुट्टै complement लाग्छ: A को A\' र B को B\' हुन्छ।' } },
          { prompt: { en: 'The sign between them was a dot. What does it become? Answer: + or ·',
                      ne: 'बीचको चिन्ह डट थियो। के हुन्छ? उत्तर: + वा ·' },
            answer: '+', accept: ['plus', 'or'],
            why: { en: 'A dot becomes a plus. This is the half students forget — the bar is ' +
                       'broken and the sign is left alone, which gives the wrong answer A\' · B\'.',
                   ne: 'डट प्लस हुन्छ। विद्यार्थीले बिर्सने यही आधा हो — बार फुटाएर चिन्ह त्यसै ' +
                       'छोड्दा गलत उत्तर A\' · B\' आउँछ।' } }
        ],
        result: "A'+B'",
        resultPrompt: { en: 'Write the whole result', ne: 'पूरा नतिजा लेख्नुहोस्' },
        check: { en: '(A · B)\' = A\' + B\'. Check it with A = 1, B = 0: the left side is ' +
                     '(1 · 0)\' = 0\' = 1, and the right side is 0 + 1 = 1. ✓',
                 ne: '(A · B)\' = A\' + B\'। A = 1, B = 0 ले जाँच्नुहोस्: बायाँ (1 · 0)\' = 1, ' +
                     'दायाँ 0 + 1 = 1। ✓' }
      },

      {
        fade: 'partial',
        ask: { en: 'Simplify (A + B)\' using De Morgan\'s second theorem.',
               ne: 'De Morgan को दोस्रो नियमले (A + B)\' सरल बनाउनुहोस्।' },
        steps: [
          { prompt: { en: 'Each variable becomes what? Answer: A\' or A',
                      ne: 'हरेक चर के बन्छ? उत्तर: A\' वा A' },
            answer: "A'", accept: ['a prime', 'complement'],
            why: { en: 'The bar breaks onto each variable, so A becomes A\' and B becomes B\'.',
                   ne: 'बार हरेक चरमा फुट्छ, त्यसैले A को A\' र B को B\' हुन्छ।' } },
          { prompt: { en: 'The plus becomes what? Answer: + or ·',
                      ne: 'प्लस के बन्छ? उत्तर: + वा ·' },
            answer: '·', accept: ['.', '*', 'dot', 'and'],
            why: { en: 'A plus becomes a dot. The two theorems are the same rule read in ' +
                       'opposite directions.',
                   ne: 'प्लस डट हुन्छ। दुवै नियम उही कुरा उल्टो दिशाबाट पढेको हो।' } }
        ],
        result: "A'·B'",
        resultPrompt: { en: 'The whole result', ne: 'पूरा नतिजा' },
        check: { en: '(A + B)\' = A\' · B\'. Check with A = 1, B = 0: left is (1 + 0)\' = 0, ' +
                     'right is 0 · 1 = 0. ✓',
                 ne: '(A + B)\' = A\' · B\'। A = 1, B = 0: बायाँ (1 + 0)\' = 0, दायाँ 0 · 1 = 0। ✓' }
      },

      {
        fade: 'guided',
        ask: { en: 'Simplify (A · B · C)\' — three variables this time.',
               ne: '(A · B · C)\' सरल बनाउनुहोस् — यसपटक तीन चर।' },
        steps: [
          { prompt: { en: 'How many complements appear in the answer?',
                      ne: 'उत्तरमा कति वटा complement देखिन्छन्?' },
            answer: '3', accept: ['three'],
            why: { en: 'One on each variable. The theorem does not care how many there are — ' +
                       'the bar breaks onto every one of them.',
                   ne: 'हरेक चरमा एउटा। नियमले कति छन् भन्ने हेर्दैन — बार सबैमा फुट्छ।' } },
          { prompt: { en: 'What sign joins them? Answer: + or ·',
                      ne: 'कुन चिन्हले जोड्छ? उत्तर: + वा ·' },
            answer: '+', accept: ['plus', 'or'],
            why: { en: 'Every dot becomes a plus, however many there were.',
                   ne: 'जति नै भए पनि हरेक डट प्लस हुन्छ।' } }
        ],
        result: "A'+B'+C'",
        resultPrompt: { en: 'The whole result', ne: 'पूरा नतिजा' },
        check: { en: 'The theorem extends to any number of variables. Two, three or ten: break ' +
                     'the bar onto each, and turn every sign.',
                 ne: 'नियम जति चरमा पनि लागू हुन्छ। दुई, तीन वा दश: हरेकमा बार फुटाउनुहोस्, ' +
                     'र हरेक चिन्ह बदल्नुहोस्।' }
      },

      {
        fade: 'independent',
        ask: { en: 'Simplify (A\' + B)\' completely. Careful — one variable already carries ' +
                   'a complement.',
               ne: '(A\' + B)\' पूरै सरल बनाउनुहोस्। ध्यान दिनुहोस् — एउटा चरमा पहिले नै ' +
                   'complement छ।' },
        steps: [],
        result: "A·B'",
        resultPrompt: { en: 'The simplified expression', ne: 'सरल बनाइएको अभिव्यक्ति' },
        check: { en: 'Break the bar: (A\')\' · B\'. A double complement cancels — (A\')\' is ' +
                     'just A — so the answer is A · B\'. If you wrote A\' · B\', you broke the ' +
                     'bar correctly and forgot that the complement already there cancels the ' +
                     'new one.',
                 ne: 'बार फुटाउनुहोस्: (A\')\' · B\'। दोहोरो complement काटिन्छ — (A\')\' भनेको ' +
                     'A नै हो — त्यसैले उत्तर A · B\' हो। A\' · B\' लेख्नुभयो भने बार त ठिकै ' +
                     'फुटाउनुभयो, तर पहिले नै भएको complement ले नयाँलाई काट्छ भन्ने बिर्सनुभयो।' }
      },

      {
        /* TRANSFER — the representation moves. The rule is the same and
           the question no longer looks like an algebra exercise: it is a
           gate. A student who can only do this when it is written as an
           expression has the procedure, not the idea. */
        fade: 'transfer',
        ask: { en: 'A NAND gate has inputs A and B. Its output is (A · B)\'. Using De Morgan, ' +
                   'write that same output as an OR of two inverted inputs.',
               ne: 'एउटा NAND गेटका इनपुट A र B छन्। यसको आउटपुट (A · B)\' हो। De Morgan ' +
                   'प्रयोग गरी उही आउटपुटलाई दुई उल्टाइएका इनपुटको OR रूपमा लेख्नुहोस्।' },
        steps: [],
        result: "A'+B'",
        resultPrompt: { en: 'The equivalent OR expression', ne: 'बराबर हुने OR अभिव्यक्ति' },
        check: { en: 'A NAND gate IS an OR gate with both inputs inverted — that is what the ' +
                     'first theorem says, drawn instead of written. This is why the same gate ' +
                     'has two symbols in the notation sheet, and why NAND can build anything.',
                 ne: 'NAND गेट भनेकै दुवै इनपुट उल्टाइएको OR गेट हो — पहिलो नियमले भनेकै कुरा, ' +
                     'लेखिएको होइन कोरिएको। त्यसैले notation मा एउटै गेटका दुई चिन्ह हुन्छन्, ' +
                     'र त्यसैले NAND ले जे पनि बनाउन सक्छ।' }
      }
    ]
  },

  /* ============================================================
     UNIT 5 — IDENTIFYING THE ADDRESSING MODE

     15 marks, joint-heaviest in the subject. The lesson's worked example
     lists five instructions with their modes, which is a lookup table
     rather than practice: a student reads it, agrees, and cannot do it
     on an instruction they have not seen.

     The unit itself names the confusion this sequence is built around —
     direct against register indirect — so that is level 4.
     ============================================================ */
  {
    id: 'dd.addressing',
    subject: 'grade10/digital-design',
    unit: 'dd-u5',
    skill: {
      en: 'Identify the addressing mode of an 8085 instruction',
      ne: '8085 निर्देशनको addressing mode पहिचान गर्नुहोस्'
    },
    rule: {
      en: 'The mode says WHERE the operand is found, not what the instruction does. ' +
          'Written inside the instruction → immediate. A full address given → direct. ' +
          'Both operands are registers → register. The address is held in a register pair → ' +
          'register indirect. Nothing written at all → implicit.',
      ne: 'Mode ले operand कहाँ भेटिन्छ भन्ने बताउँछ, निर्देशनले के गर्छ भन्ने होइन। ' +
          'निर्देशनभित्रै लेखिएको → immediate। पूरा ठेगाना दिइएको → direct। ' +
          'दुवै operand register → register। ठेगाना register pair मा → register indirect। ' +
          'केही नलेखिएको → implicit।'
    },
    problems: [
      {
        fade: 'worked',
        ask: { en: 'MVI B, 20H — identify the addressing mode.',
               ne: 'MVI B, 20H — addressing mode पहिचान गर्नुहोस्।' },
        steps: [
          { prompt: { en: 'Where is the value 20H written? Answer: instruction or memory',
                      ne: '20H कहाँ लेखिएको छ? उत्तर: instruction वा memory' },
            answer: 'instruction', accept: ['in the instruction', 'inside'],
            why: { en: '20H is written in the instruction itself. Nothing has to be fetched from ' +
                       'anywhere to find it.',
                   ne: '20H निर्देशनमै लेखिएको छ। यो भेट्न कतैबाट केही ल्याउनु पर्दैन।' } },
          { prompt: { en: 'So which mode is that?', ne: 'त्यसैले यो कुन mode भयो?' },
            answer: 'immediate', accept: ['immediate addressing'],
            why: { en: 'Immediate: the operand is immediately available, in the instruction.',
                   ne: 'Immediate: operand निर्देशनमै, तुरुन्तै उपलब्ध।' } }
        ],
        result: 'immediate',
        resultPrompt: { en: 'The addressing mode', ne: 'कुन addressing mode' },
        check: { en: 'MVI stands for "move immediate", so the name of the instruction tells you ' +
                     'the mode. Not every instruction is that generous.',
                 ne: 'MVI भनेको "move immediate" हो, त्यसैले निर्देशनकै नामले mode बताउँछ। ' +
                     'हरेक निर्देशन यति उदार हुँदैन।' }
      },

      {
        fade: 'partial',
        ask: { en: 'LDA 2050H — identify the addressing mode.',
               ne: 'LDA 2050H — addressing mode पहिचान गर्नुहोस्।' },
        steps: [
          { prompt: { en: 'Is 2050H a value to use, or an address to look in? Answer: value or address',
                      ne: '2050H प्रयोग गर्ने मान हो कि हेर्ने ठेगाना? उत्तर: value वा address' },
            answer: 'address', accept: ['an address', 'memory address'],
            why: { en: '2050H is a memory address. The instruction loads whatever is stored ' +
                       'there, not the number 2050H itself.',
                   ne: '2050H मेमोरी ठेगाना हो। निर्देशनले त्यहाँ राखिएको कुरा लोड गर्छ, ' +
                       '2050H सङ्ख्या आफैं होइन।' } },
          { prompt: { en: 'Is that address written in full, or held in a register pair? ' +
                          'Answer: written or register',
                      ne: 'त्यो ठेगाना पूरै लेखिएको छ कि register pair मा छ? उत्तर: written वा register' },
            answer: 'written', accept: ['in full', 'in the instruction'],
            why: { en: 'The full address appears in the instruction, so nothing has to be looked ' +
                       'up first.',
                   ne: 'पूरा ठेगाना निर्देशनमै छ, त्यसैले पहिले कतै हेर्नु पर्दैन।' } }
        ],
        result: 'direct',
        resultPrompt: { en: 'The addressing mode', ne: 'कुन addressing mode' },
        check: { en: 'Direct: the address is given directly. Compare it with immediate — there, ' +
                     'the VALUE was given directly; here, the ADDRESS is.',
                 ne: 'Direct: ठेगाना सिधै दिइएको। immediate सँग तुलना गर्नुहोस् — त्यहाँ MAN ' +
                     'सिधै दिइएको थियो; यहाँ ठेगाना।' }
      },

      {
        fade: 'guided',
        ask: { en: 'MOV A, C — identify the addressing mode.',
               ne: 'MOV A, C — addressing mode पहिचान गर्नुहोस्।' },
        steps: [
          { prompt: { en: 'How many memory locations does this instruction touch?',
                      ne: 'यो निर्देशनले कति मेमोरी ठाउँ छुन्छ?' },
            answer: '0', accept: ['zero', 'none'],
            why: { en: 'A and C are both registers, inside the processor. Memory is not involved ' +
                       'at all, which is why register-mode instructions are the fastest.',
                   ne: 'A र C दुवै प्रोसेसरभित्रका register हुन्। मेमोरी संलग्नै छैन, त्यसैले ' +
                       'register mode का निर्देशन सबैभन्दा छिटो हुन्छन्।' } }
        ],
        result: 'register',
        resultPrompt: { en: 'The addressing mode', ne: 'कुन addressing mode' },
        check: { en: 'Register mode: both operands are named registers.',
                 ne: 'Register mode: दुवै operand नाम गरिएका register हुन्।' }
      },

      {
        fade: 'independent',
        ask: { en: 'MOV A, M — identify the addressing mode. M means "the memory location whose ' +
                   'address is in the HL pair".',
               ne: 'MOV A, M — addressing mode पहिचान गर्नुहोस्। M भनेको "HL pair मा ठेगाना ' +
                   'भएको मेमोरी ठाउँ" हो।' },
        steps: [],
        result: 'register indirect',
        resultPrompt: { en: 'The addressing mode', ne: 'कुन addressing mode' },
        check: { en: 'Register indirect. It looks like MOV A, C — two register names — but M is ' +
                     'not a register holding the value; it is memory, and the ADDRESS of that ' +
                     'memory is in HL. If you answered "register", that is the exact confusion ' +
                     'this unit warns about: direct writes the address in the instruction, ' +
                     'indirect keeps it in a register pair, so you have to look there first.',
                 ne: 'Register indirect। MOV A, C जस्तै — दुई register नाम — देखिन्छ, तर M मान ' +
                     'बोक्ने register होइन; त्यो मेमोरी हो, र त्यसको ठेगाना HL मा छ। ' +
                     '"register" भन्नुभयो भने यही युनिटले चेतावनी दिएको ठ्याक्कै अन्योल हो: ' +
                     'direct ले ठेगाना निर्देशनमै लेख्छ, indirect ले register pair मा राख्छ।' }
      },

      {
        /* TRANSFER — the direction of the question reverses. Instead of
           an instruction to classify, a description to name. A student
           who has memorised five instructions cannot do this; one who
           has the rule can. */
        fade: 'transfer',
        ask: { en: 'An instruction operates on the accumulator, and the accumulator is not ' +
                   'written anywhere in the instruction — CMA is one. Which addressing mode is ' +
                   'that?',
               ne: 'एउटा निर्देशनले accumulator मा काम गर्छ, तर निर्देशनमा accumulator कतै ' +
                   'लेखिएको छैन — CMA त्यस्तै हो। यो कुन addressing mode हो?' },
        steps: [],
        result: 'implicit',
        resultPrompt: { en: 'The addressing mode', ne: 'कुन addressing mode' },
        check: { en: 'Implicit — the operand is understood without being written. This question ' +
                     'gave you a description rather than an instruction, which is the form the ' +
                     'exam uses when it wants to know whether you learned the rule or the list.',
                 ne: 'Implicit — operand नलेखिकनै बुझिन्छ। यो प्रश्नले निर्देशन होइन विवरण ' +
                     'दियो, र परीक्षाले नियम सिक्नुभयो कि सूची भन्ने जाँच्न यही रूप प्रयोग गर्छ।' }
      }
    ]
  }

];
