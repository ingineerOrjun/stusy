/* GENERATED from _source/content/practice — do not edit by hand. */
GuidedPractice.register({
  "id": "dd.dec2bin",
  "subject": "grade10/digital-design",
  "unit": "dd-u1",
  "skill": {
    "en": "Decimal to binary by repeated division",
    "ne": "दशमलवबाट बाइनरी — पटक–पटक भाग गरेर"
  },
  "rule": {
    "en": "Divide by 2 and write the remainder. Repeat on the quotient until it is 0. Then read the remainders UPWARDS.",
    "ne": "२ ले भाग गर्नुहोस् र बाँकी लेख्नुहोस्। भागफल ० नहुन्जेल दोहोर्‍याउनुहोस्। अनि बाँकीहरू तलबाट माथि पढ्नुहोस्।"
  },
  "problems": [
    {
      "fade": "worked",
      "ask": {
        "en": "Convert 13 to binary.",
        "ne": "१३ लाई बाइनरीमा बदल्नुहोस्।"
      },
      "steps": [
        {
          "prompt": {
            "en": "13 ÷ 2 — write the remainder",
            "ne": "१३ ÷ २ — बाँकी लेख्नुहोस्"
          },
          "answer": "1",
          "accept": [
            "1"
          ],
          "why": {
            "en": "13 = 6 × 2 + 1, so the quotient is 6 and the remainder is 1.",
            "ne": "१३ = ६ × २ + १, त्यसैले भागफल ६ र बाँकी १।"
          }
        },
        {
          "prompt": {
            "en": "6 ÷ 2 — write the remainder",
            "ne": "६ ÷ २ — बाँकी लेख्नुहोस्"
          },
          "answer": "0",
          "accept": [
            "0"
          ],
          "why": {
            "en": "6 = 3 × 2 + 0. An even number always leaves 0.",
            "ne": "६ = ३ × २ + ०। जोर सङ्ख्याले सधैं ० बाँकी छोड्छ।"
          }
        },
        {
          "prompt": {
            "en": "3 ÷ 2 — write the remainder",
            "ne": "३ ÷ २ — बाँकी लेख्नुहोस्"
          },
          "answer": "1",
          "accept": [
            "1"
          ],
          "why": {
            "en": "3 = 1 × 2 + 1.",
            "ne": "३ = १ × २ + १।"
          }
        },
        {
          "prompt": {
            "en": "1 ÷ 2 — write the remainder",
            "ne": "१ ÷ २ — बाँकी लेख्नुहोस्"
          },
          "answer": "1",
          "accept": [
            "1"
          ],
          "why": {
            "en": "1 = 0 × 2 + 1. The quotient is now 0, so stop.",
            "ne": "१ = ० × २ + १। भागफल ० भयो, त्यसैले रोक्नुहोस्।"
          }
        }
      ],
      "result": "1101",
      "resultPrompt": {
        "en": "Read the remainders upwards",
        "ne": "बाँकीहरू तलबाट माथि पढ्नुहोस्"
      },
      "check": {
        "en": "Check with place values: 8 + 4 + 0 + 1 = 13. ✓",
        "ne": "स्थानीय मानले जाँच्नुहोस्: ८ + ४ + ० + १ = १३। ✓"
      }
    },
    {
      "fade": "partial",
      "ask": {
        "en": "Convert 22 to binary.",
        "ne": "२२ लाई बाइनरीमा बदल्नुहोस्।"
      },
      "steps": [
        {
          "prompt": {
            "en": "22 ÷ 2 — remainder?",
            "ne": "२२ ÷ २ — बाँकी?"
          },
          "answer": "0",
          "accept": [
            "0"
          ],
          "why": {
            "en": "22 is even, so the remainder is 0 and the quotient is 11.",
            "ne": "२२ जोर छ, त्यसैले बाँकी ० र भागफल ११।"
          }
        },
        {
          "prompt": {
            "en": "11 ÷ 2 — remainder?",
            "ne": "११ ÷ २ — बाँकी?"
          },
          "answer": "1",
          "accept": [
            "1"
          ],
          "why": {
            "en": "11 = 5 × 2 + 1.",
            "ne": "११ = ५ × २ + १।"
          }
        },
        {
          "prompt": {
            "en": "5 ÷ 2 — remainder?",
            "ne": "५ ÷ २ — बाँकी?"
          },
          "answer": "1",
          "accept": [
            "1"
          ],
          "why": {
            "en": "5 = 2 × 2 + 1.",
            "ne": "५ = २ × २ + १।"
          }
        },
        {
          "prompt": {
            "en": "2 ÷ 2 — remainder?",
            "ne": "२ ÷ २ — बाँकी?"
          },
          "answer": "0",
          "accept": [
            "0"
          ],
          "why": {
            "en": "2 = 1 × 2 + 0.",
            "ne": "२ = १ × २ + ०।"
          }
        },
        {
          "prompt": {
            "en": "1 ÷ 2 — remainder?",
            "ne": "१ ÷ २ — बाँकी?"
          },
          "answer": "1",
          "accept": [
            "1"
          ],
          "why": {
            "en": "1 = 0 × 2 + 1. Quotient 0 — stop here.",
            "ne": "१ = ० × २ + १। भागफल ० — यहीँ रोक्नुहोस्।"
          }
        }
      ],
      "result": "10110",
      "resultPrompt": {
        "en": "Now read them upwards",
        "ne": "अब तलबाट माथि पढ्नुहोस्"
      },
      "check": {
        "en": "Check: 16 + 0 + 4 + 2 + 0 = 22. ✓",
        "ne": "जाँच: १६ + ० + ४ + २ + ० = २२। ✓"
      }
    },
    {
      "fade": "guided",
      "ask": {
        "en": "Convert 25 to binary.",
        "ne": "२५ लाई बाइनरीमा बदल्नुहोस्।"
      },
      "steps": [
        {
          "prompt": {
            "en": "First remainder",
            "ne": "पहिलो बाँकी"
          },
          "answer": "1",
          "accept": [
            "1"
          ],
          "why": {
            "en": "25 is odd, so the first remainder is 1. Quotient 12.",
            "ne": "२५ बिजोर छ, त्यसैले पहिलो बाँकी १। भागफल १२।"
          }
        },
        {
          "prompt": {
            "en": "Second remainder",
            "ne": "दोस्रो बाँकी"
          },
          "answer": "0",
          "accept": [
            "0"
          ],
          "why": {
            "en": "12 is even → 0. Quotient 6.",
            "ne": "१२ जोर → ०। भागफल ६।"
          }
        },
        {
          "prompt": {
            "en": "Third remainder",
            "ne": "तेस्रो बाँकी"
          },
          "answer": "0",
          "accept": [
            "0"
          ],
          "why": {
            "en": "6 is even → 0. Quotient 3.",
            "ne": "६ जोर → ०। भागफल ३।"
          }
        },
        {
          "prompt": {
            "en": "Fourth remainder",
            "ne": "चौथो बाँकी"
          },
          "answer": "1",
          "accept": [
            "1"
          ],
          "why": {
            "en": "3 = 1 × 2 + 1. Quotient 1.",
            "ne": "३ = १ × २ + १। भागफल १।"
          }
        },
        {
          "prompt": {
            "en": "Fifth remainder",
            "ne": "पाँचौं बाँकी"
          },
          "answer": "1",
          "accept": [
            "1"
          ],
          "why": {
            "en": "1 = 0 × 2 + 1. Stop — the quotient is 0.",
            "ne": "१ = ० × २ + १। रोक्नुहोस् — भागफल ० भयो।"
          }
        }
      ],
      "result": "11001",
      "resultPrompt": {
        "en": "The answer, read upwards",
        "ne": "उत्तर, तलबाट माथि"
      },
      "check": {
        "en": "Check: 16 + 8 + 0 + 0 + 1 = 25. ✓",
        "ne": "जाँच: १६ + ८ + ० + ० + १ = २५। ✓"
      }
    },
    {
      "fade": "independent",
      "ask": {
        "en": "Convert 45 to binary. Work it out on paper, then enter the answer.",
        "ne": "४५ लाई बाइनरीमा बदल्नुहोस्। कागजमा गरेर उत्तर लेख्नुहोस्।"
      },
      "steps": [],
      "result": "101101",
      "resultPrompt": {
        "en": "45 in binary",
        "ne": "बाइनरीमा ४५"
      },
      "check": {
        "en": "Check: 32 + 0 + 8 + 4 + 0 + 1 = 45. ✓ If you got 101101 reversed, you read the remainders downwards — that is the one mistake this procedure punishes.",
        "ne": "जाँच: ३२ + ० + ८ + ४ + ० + १ = ४५। ✓ उल्टो आयो भने बाँकीहरू माथिबाट तल पढ्नुभयो — यही एउटै गल्ती यो विधिले दण्ड दिन्छ।"
      }
    }
  ]
});

GuidedPractice.register({
  "id": "dd.demorgan",
  "subject": "grade10/digital-design",
  "unit": "dd-u2",
  "skill": {
    "en": "Apply De Morgan's theorems to an expression",
    "ne": "अभिव्यक्तिमा De Morgan का नियम लागू गर्नुहोस्"
  },
  "rule": {
    "en": "Break the bar, and change the sign. A dot becomes a plus; a plus becomes a dot. Both, or neither — never one.",
    "ne": "बार फुटाउनुहोस्, अनि चिन्ह बदल्नुहोस्। डट भए प्लस, प्लस भए डट। दुवै, कि केही पनि होइन — एउटा मात्र कहिल्यै होइन।"
  },
  "problems": [
    {
      "fade": "worked",
      "ask": {
        "en": "Simplify (A · B)' using De Morgan's first theorem.",
        "ne": "De Morgan को पहिलो नियमले (A · B)' सरल बनाउनुहोस्।"
      },
      "steps": [
        {
          "prompt": {
            "en": "Break the bar. What happens to each variable? Answer: complemented or unchanged",
            "ne": "बार फुटाउनुहोस्। हरेक चरमा के हुन्छ? उत्तर: complemented वा unchanged"
          },
          "answer": "complemented",
          "accept": [
            "complement",
            "inverted",
            "negated"
          ],
          "why": {
            "en": "Breaking the bar puts a complement on each variable separately: A becomes A' and B becomes B'.",
            "ne": "बार फुटाउँदा हरेक चरमा छुट्टै complement लाग्छ: A को A' र B को B' हुन्छ।"
          }
        },
        {
          "prompt": {
            "en": "The sign between them was a dot. What does it become? Answer: + or ·",
            "ne": "बीचको चिन्ह डट थियो। के हुन्छ? उत्तर: + वा ·"
          },
          "answer": "+",
          "accept": [
            "plus",
            "or"
          ],
          "why": {
            "en": "A dot becomes a plus. This is the half students forget — the bar is broken and the sign is left alone, which gives the wrong answer A' · B'.",
            "ne": "डट प्लस हुन्छ। विद्यार्थीले बिर्सने यही आधा हो — बार फुटाएर चिन्ह त्यसै छोड्दा गलत उत्तर A' · B' आउँछ।"
          }
        }
      ],
      "result": "A'+B'",
      "resultPrompt": {
        "en": "Write the whole result",
        "ne": "पूरा नतिजा लेख्नुहोस्"
      },
      "check": {
        "en": "(A · B)' = A' + B'. Check it with A = 1, B = 0: the left side is (1 · 0)' = 0' = 1, and the right side is 0 + 1 = 1. ✓",
        "ne": "(A · B)' = A' + B'। A = 1, B = 0 ले जाँच्नुहोस्: बायाँ (1 · 0)' = 1, दायाँ 0 + 1 = 1। ✓"
      }
    },
    {
      "fade": "partial",
      "ask": {
        "en": "Simplify (A + B)' using De Morgan's second theorem.",
        "ne": "De Morgan को दोस्रो नियमले (A + B)' सरल बनाउनुहोस्।"
      },
      "steps": [
        {
          "prompt": {
            "en": "Each variable becomes what? Answer: A' or A",
            "ne": "हरेक चर के बन्छ? उत्तर: A' वा A"
          },
          "answer": "A'",
          "accept": [
            "a prime",
            "complement"
          ],
          "why": {
            "en": "The bar breaks onto each variable, so A becomes A' and B becomes B'.",
            "ne": "बार हरेक चरमा फुट्छ, त्यसैले A को A' र B को B' हुन्छ।"
          }
        },
        {
          "prompt": {
            "en": "The plus becomes what? Answer: + or ·",
            "ne": "प्लस के बन्छ? उत्तर: + वा ·"
          },
          "answer": "·",
          "accept": [
            ".",
            "*",
            "dot",
            "and"
          ],
          "why": {
            "en": "A plus becomes a dot. The two theorems are the same rule read in opposite directions.",
            "ne": "प्लस डट हुन्छ। दुवै नियम उही कुरा उल्टो दिशाबाट पढेको हो।"
          }
        }
      ],
      "result": "A'·B'",
      "resultPrompt": {
        "en": "The whole result",
        "ne": "पूरा नतिजा"
      },
      "check": {
        "en": "(A + B)' = A' · B'. Check with A = 1, B = 0: left is (1 + 0)' = 0, right is 0 · 1 = 0. ✓",
        "ne": "(A + B)' = A' · B'। A = 1, B = 0: बायाँ (1 + 0)' = 0, दायाँ 0 · 1 = 0। ✓"
      }
    },
    {
      "fade": "guided",
      "ask": {
        "en": "Simplify (A · B · C)' — three variables this time.",
        "ne": "(A · B · C)' सरल बनाउनुहोस् — यसपटक तीन चर।"
      },
      "steps": [
        {
          "prompt": {
            "en": "How many complements appear in the answer?",
            "ne": "उत्तरमा कति वटा complement देखिन्छन्?"
          },
          "answer": "3",
          "accept": [
            "three"
          ],
          "why": {
            "en": "One on each variable. The theorem does not care how many there are — the bar breaks onto every one of them.",
            "ne": "हरेक चरमा एउटा। नियमले कति छन् भन्ने हेर्दैन — बार सबैमा फुट्छ।"
          }
        },
        {
          "prompt": {
            "en": "What sign joins them? Answer: + or ·",
            "ne": "कुन चिन्हले जोड्छ? उत्तर: + वा ·"
          },
          "answer": "+",
          "accept": [
            "plus",
            "or"
          ],
          "why": {
            "en": "Every dot becomes a plus, however many there were.",
            "ne": "जति नै भए पनि हरेक डट प्लस हुन्छ।"
          }
        }
      ],
      "result": "A'+B'+C'",
      "resultPrompt": {
        "en": "The whole result",
        "ne": "पूरा नतिजा"
      },
      "check": {
        "en": "The theorem extends to any number of variables. Two, three or ten: break the bar onto each, and turn every sign.",
        "ne": "नियम जति चरमा पनि लागू हुन्छ। दुई, तीन वा दश: हरेकमा बार फुटाउनुहोस्, र हरेक चिन्ह बदल्नुहोस्।"
      }
    },
    {
      "fade": "independent",
      "ask": {
        "en": "Simplify (A' + B)' completely. Careful — one variable already carries a complement.",
        "ne": "(A' + B)' पूरै सरल बनाउनुहोस्। ध्यान दिनुहोस् — एउटा चरमा पहिले नै complement छ।"
      },
      "steps": [],
      "result": "A·B'",
      "resultPrompt": {
        "en": "The simplified expression",
        "ne": "सरल बनाइएको अभिव्यक्ति"
      },
      "check": {
        "en": "Break the bar: (A')' · B'. A double complement cancels — (A')' is just A — so the answer is A · B'. If you wrote A' · B', you broke the bar correctly and forgot that the complement already there cancels the new one.",
        "ne": "बार फुटाउनुहोस्: (A')' · B'। दोहोरो complement काटिन्छ — (A')' भनेको A नै हो — त्यसैले उत्तर A · B' हो। A' · B' लेख्नुभयो भने बार त ठिकै फुटाउनुभयो, तर पहिले नै भएको complement ले नयाँलाई काट्छ भन्ने बिर्सनुभयो।"
      }
    },
    {
      "fade": "transfer",
      "ask": {
        "en": "A NAND gate has inputs A and B. Its output is (A · B)'. Using De Morgan, write that same output as an OR of two inverted inputs.",
        "ne": "एउटा NAND गेटका इनपुट A र B छन्। यसको आउटपुट (A · B)' हो। De Morgan प्रयोग गरी उही आउटपुटलाई दुई उल्टाइएका इनपुटको OR रूपमा लेख्नुहोस्।"
      },
      "steps": [],
      "result": "A'+B'",
      "resultPrompt": {
        "en": "The equivalent OR expression",
        "ne": "बराबर हुने OR अभिव्यक्ति"
      },
      "check": {
        "en": "A NAND gate IS an OR gate with both inputs inverted — that is what the first theorem says, drawn instead of written. This is why the same gate has two symbols in the notation sheet, and why NAND can build anything.",
        "ne": "NAND गेट भनेकै दुवै इनपुट उल्टाइएको OR गेट हो — पहिलो नियमले भनेकै कुरा, लेखिएको होइन कोरिएको। त्यसैले notation मा एउटै गेटका दुई चिन्ह हुन्छन्, र त्यसैले NAND ले जे पनि बनाउन सक्छ।"
      }
    }
  ]
});

GuidedPractice.register({
  "id": "dd.addressing",
  "subject": "grade10/digital-design",
  "unit": "dd-u5",
  "skill": {
    "en": "Identify the addressing mode of an 8085 instruction",
    "ne": "8085 निर्देशनको addressing mode पहिचान गर्नुहोस्"
  },
  "rule": {
    "en": "The mode says WHERE the operand is found, not what the instruction does. Written inside the instruction → immediate. A full address given → direct. Both operands are registers → register. The address is held in a register pair → register indirect. Nothing written at all → implicit.",
    "ne": "Mode ले operand कहाँ भेटिन्छ भन्ने बताउँछ, निर्देशनले के गर्छ भन्ने होइन। निर्देशनभित्रै लेखिएको → immediate। पूरा ठेगाना दिइएको → direct। दुवै operand register → register। ठेगाना register pair मा → register indirect। केही नलेखिएको → implicit।"
  },
  "problems": [
    {
      "fade": "worked",
      "ask": {
        "en": "MVI B, 20H — identify the addressing mode.",
        "ne": "MVI B, 20H — addressing mode पहिचान गर्नुहोस्।"
      },
      "steps": [
        {
          "prompt": {
            "en": "Where is the value 20H written? Answer: instruction or memory",
            "ne": "20H कहाँ लेखिएको छ? उत्तर: instruction वा memory"
          },
          "answer": "instruction",
          "accept": [
            "in the instruction",
            "inside"
          ],
          "why": {
            "en": "20H is written in the instruction itself. Nothing has to be fetched from anywhere to find it.",
            "ne": "20H निर्देशनमै लेखिएको छ। यो भेट्न कतैबाट केही ल्याउनु पर्दैन।"
          }
        },
        {
          "prompt": {
            "en": "So which mode is that?",
            "ne": "त्यसैले यो कुन mode भयो?"
          },
          "answer": "immediate",
          "accept": [
            "immediate addressing"
          ],
          "why": {
            "en": "Immediate: the operand is immediately available, in the instruction.",
            "ne": "Immediate: operand निर्देशनमै, तुरुन्तै उपलब्ध।"
          }
        }
      ],
      "result": "immediate",
      "resultPrompt": {
        "en": "The addressing mode",
        "ne": "कुन addressing mode"
      },
      "check": {
        "en": "MVI stands for \"move immediate\", so the name of the instruction tells you the mode. Not every instruction is that generous.",
        "ne": "MVI भनेको \"move immediate\" हो, त्यसैले निर्देशनकै नामले mode बताउँछ। हरेक निर्देशन यति उदार हुँदैन।"
      }
    },
    {
      "fade": "partial",
      "ask": {
        "en": "LDA 2050H — identify the addressing mode.",
        "ne": "LDA 2050H — addressing mode पहिचान गर्नुहोस्।"
      },
      "steps": [
        {
          "prompt": {
            "en": "Is 2050H a value to use, or an address to look in? Answer: value or address",
            "ne": "2050H प्रयोग गर्ने मान हो कि हेर्ने ठेगाना? उत्तर: value वा address"
          },
          "answer": "address",
          "accept": [
            "an address",
            "memory address"
          ],
          "why": {
            "en": "2050H is a memory address. The instruction loads whatever is stored there, not the number 2050H itself.",
            "ne": "2050H मेमोरी ठेगाना हो। निर्देशनले त्यहाँ राखिएको कुरा लोड गर्छ, 2050H सङ्ख्या आफैं होइन।"
          }
        },
        {
          "prompt": {
            "en": "Is that address written in full, or held in a register pair? Answer: written or register",
            "ne": "त्यो ठेगाना पूरै लेखिएको छ कि register pair मा छ? उत्तर: written वा register"
          },
          "answer": "written",
          "accept": [
            "in full",
            "in the instruction"
          ],
          "why": {
            "en": "The full address appears in the instruction, so nothing has to be looked up first.",
            "ne": "पूरा ठेगाना निर्देशनमै छ, त्यसैले पहिले कतै हेर्नु पर्दैन।"
          }
        }
      ],
      "result": "direct",
      "resultPrompt": {
        "en": "The addressing mode",
        "ne": "कुन addressing mode"
      },
      "check": {
        "en": "Direct: the address is given directly. Compare it with immediate — there, the VALUE was given directly; here, the ADDRESS is.",
        "ne": "Direct: ठेगाना सिधै दिइएको। immediate सँग तुलना गर्नुहोस् — त्यहाँ MAN सिधै दिइएको थियो; यहाँ ठेगाना।"
      }
    },
    {
      "fade": "guided",
      "ask": {
        "en": "MOV A, C — identify the addressing mode.",
        "ne": "MOV A, C — addressing mode पहिचान गर्नुहोस्।"
      },
      "steps": [
        {
          "prompt": {
            "en": "How many memory locations does this instruction touch?",
            "ne": "यो निर्देशनले कति मेमोरी ठाउँ छुन्छ?"
          },
          "answer": "0",
          "accept": [
            "zero",
            "none"
          ],
          "why": {
            "en": "A and C are both registers, inside the processor. Memory is not involved at all, which is why register-mode instructions are the fastest.",
            "ne": "A र C दुवै प्रोसेसरभित्रका register हुन्। मेमोरी संलग्नै छैन, त्यसैले register mode का निर्देशन सबैभन्दा छिटो हुन्छन्।"
          }
        }
      ],
      "result": "register",
      "resultPrompt": {
        "en": "The addressing mode",
        "ne": "कुन addressing mode"
      },
      "check": {
        "en": "Register mode: both operands are named registers.",
        "ne": "Register mode: दुवै operand नाम गरिएका register हुन्।"
      }
    },
    {
      "fade": "independent",
      "ask": {
        "en": "MOV A, M — identify the addressing mode. M means \"the memory location whose address is in the HL pair\".",
        "ne": "MOV A, M — addressing mode पहिचान गर्नुहोस्। M भनेको \"HL pair मा ठेगाना भएको मेमोरी ठाउँ\" हो।"
      },
      "steps": [],
      "result": "register indirect",
      "resultPrompt": {
        "en": "The addressing mode",
        "ne": "कुन addressing mode"
      },
      "check": {
        "en": "Register indirect. It looks like MOV A, C — two register names — but M is not a register holding the value; it is memory, and the ADDRESS of that memory is in HL. If you answered \"register\", that is the exact confusion this unit warns about: direct writes the address in the instruction, indirect keeps it in a register pair, so you have to look there first.",
        "ne": "Register indirect। MOV A, C जस्तै — दुई register नाम — देखिन्छ, तर M मान बोक्ने register होइन; त्यो मेमोरी हो, र त्यसको ठेगाना HL मा छ। \"register\" भन्नुभयो भने यही युनिटले चेतावनी दिएको ठ्याक्कै अन्योल हो: direct ले ठेगाना निर्देशनमै लेख्छ, indirect ले register pair मा राख्छ।"
      }
    },
    {
      "fade": "transfer",
      "ask": {
        "en": "An instruction operates on the accumulator, and the accumulator is not written anywhere in the instruction — CMA is one. Which addressing mode is that?",
        "ne": "एउटा निर्देशनले accumulator मा काम गर्छ, तर निर्देशनमा accumulator कतै लेखिएको छैन — CMA त्यस्तै हो। यो कुन addressing mode हो?"
      },
      "steps": [],
      "result": "implicit",
      "resultPrompt": {
        "en": "The addressing mode",
        "ne": "कुन addressing mode"
      },
      "check": {
        "en": "Implicit — the operand is understood without being written. This question gave you a description rather than an instruction, which is the form the exam uses when it wants to know whether you learned the rule or the list.",
        "ne": "Implicit — operand नलेखिकनै बुझिन्छ। यो प्रश्नले निर्देशन होइन विवरण दियो, र परीक्षाले नियम सिक्नुभयो कि सूची भन्ने जाँच्न यही रूप प्रयोग गर्छ।"
      }
    }
  ]
});

GuidedPractice.register({
  "id": "db.normalform",
  "subject": "grade10/dbms",
  "unit": "db-u5",
  "skill": {
    "en": "Name the normal form, then name the dependency that blocks the next one",
    "ne": "नर्मल फर्म पहिचान गर्नुहोस्, अनि अर्को फर्ममा जान नदिने dependency नाम लिनुहोस्"
  },
  "rule": {
    "en": "1NF: no repeating groups — every cell holds one value. 2NF: 1NF and no PARTIAL dependency — no non-key column depends on only part of a composite key. 3NF: 2NF and no TRANSITIVE dependency — no non-key column depends on another non-key column.",
    "ne": "1NF: दोहोरिने समूह छैन — हरेक कक्षमा एउटै मान। 2NF: 1NF र PARTIAL dependency छैन — कुनै non-key स्तम्भ composite key को एक भागमा मात्र निर्भर छैन। 3NF: 2NF र TRANSITIVE dependency छैन — कुनै non-key स्तम्भ अर्को non-key स्तम्भमा निर्भर छैन।"
  },
  "problems": [
    {
      "fade": "worked",
      "ask": {
        "en": "Student(roll, name, subject1, subject2, subject3). Which normal form is it in, and what must change?",
        "ne": "Student(roll, name, subject1, subject2, subject3)। यो कुन नर्मल फर्ममा छ, र के बदल्नुपर्छ?"
      },
      "steps": [
        {
          "prompt": {
            "en": "Does any column hold a repeating group? Answer yes or no",
            "ne": "कुनै स्तम्भमा दोहोरिने समूह छ? yes वा no"
          },
          "answer": "yes",
          "accept": [
            "y"
          ],
          "why": {
            "en": "subject1, subject2 and subject3 are the same fact repeated across three columns. That is a repeating group.",
            "ne": "subject1, subject2, subject3 एउटै तथ्य तीन स्तम्भमा दोहोरिएको हो। यो दोहोरिने समूह हो।"
          }
        },
        {
          "prompt": {
            "en": "So which normal form is it in? Answer 0NF, 1NF, 2NF or 3NF",
            "ne": "त्यसैले यो कुन फर्ममा छ? 0NF, 1NF, 2NF वा 3NF"
          },
          "answer": "0NF",
          "accept": [
            "0nf",
            "none",
            "unnormalised",
            "unnormalized"
          ],
          "why": {
            "en": "A table with a repeating group has not reached 1NF yet.",
            "ne": "दोहोरिने समूह भएको तालिका अझै 1NF मा पुगेको छैन।"
          }
        },
        {
          "prompt": {
            "en": "Which form does splitting the repeated columns into rows reach?",
            "ne": "दोहोरिएका स्तम्भलाई पङ्क्तिमा छुट्याउँदा कुन फर्म आइपुग्छ?"
          },
          "answer": "1NF",
          "accept": [
            "1nf"
          ],
          "why": {
            "en": "Student(roll, name, subject) with one subject per row holds one value in every cell, which is exactly what 1NF asks.",
            "ne": "Student(roll, name, subject) — प्रति पङ्क्ति एउटा subject राख्दा हरेक कक्षमा एउटै मान हुन्छ, जुन 1NF ले माग्ने कुरा हो।"
          }
        }
      ],
      "result": "1NF",
      "resultPrompt": {
        "en": "After the fix, which form is the table in?",
        "ne": "सच्याएपछि तालिका कुन फर्ममा हुन्छ?"
      },
      "check": {
        "en": "The repeating group is what 1NF forbids. Nothing about keys has been examined yet — that is the next question, not this one.",
        "ne": "दोहोरिने समूह नै 1NF ले निषेध गर्ने कुरा हो। key बारे अझै केही हेरिएको छैन — त्यो अर्को प्रश्न हो।"
      }
    },
    {
      "fade": "partial",
      "ask": {
        "en": "Marks(roll, subject, student_name, marks) — the key is (roll, subject). It is already in 1NF. Which form is it in, and why can it go no further?",
        "ne": "Marks(roll, subject, student_name, marks) — key (roll, subject) हो। यो 1NF मा छ। यो कुन फर्ममा छ, र किन अगाडि बढ्न सक्दैन?"
      },
      "steps": [
        {
          "prompt": {
            "en": "student_name depends on which part of the key? Answer roll, subject or both",
            "ne": "student_name key को कुन भागमा निर्भर छ? roll, subject वा both"
          },
          "answer": "roll",
          "accept": [
            "roll"
          ],
          "why": {
            "en": "A student's name is fixed by their roll number alone. The subject has nothing to do with it.",
            "ne": "विद्यार्थीको नाम roll ले मात्र निश्चित हुन्छ। subject को यसमा कुनै भूमिका छैन।"
          }
        },
        {
          "prompt": {
            "en": "A non-key column depending on PART of a composite key is called what? Answer partial or transitive",
            "ne": "composite key को एक भागमा मात्र निर्भर non-key स्तम्भलाई के भनिन्छ? partial वा transitive"
          },
          "answer": "partial",
          "accept": [
            "partial dependency"
          ],
          "why": {
            "en": "Part of the key, so partial. Transitive is the other one — a non-key column depending on another NON-KEY column.",
            "ne": "key को एक भाग, त्यसैले partial। transitive अर्को हो — non-key स्तम्भ अर्को NON-KEY स्तम्भमा निर्भर।"
          }
        },
        {
          "prompt": {
            "en": "A partial dependency breaks which form? Answer 2NF or 3NF",
            "ne": "partial dependency ले कुन फर्म भङ्ग गर्छ? 2NF वा 3NF"
          },
          "answer": "2NF",
          "accept": [
            "2nf"
          ],
          "why": {
            "en": "2NF is exactly \"1NF and no partial dependency\". So the table stops at 1NF.",
            "ne": "2NF भनेकै \"1NF र partial dependency छैन\" हो। त्यसैले तालिका 1NF मै रोकिन्छ।"
          }
        }
      ],
      "result": "1NF",
      "resultPrompt": {
        "en": "Which form is this table in?",
        "ne": "यो तालिका कुन फर्ममा छ?"
      },
      "check": {
        "en": "It reaches 1NF and stops there, because student_name depends on roll alone. Splitting Student(roll, student_name) away takes it to 2NF.",
        "ne": "यो 1NF सम्म पुगेर रोकिन्छ, किनभने student_name roll मा मात्र निर्भर छ। Student(roll, student_name) छुट्याएपछि 2NF मा पुग्छ।"
      }
    },
    {
      "fade": "guided",
      "ask": {
        "en": "Book(book_id, title, publisher_id, publisher_city) — the key is book_id alone. Which form is it in?",
        "ne": "Book(book_id, title, publisher_id, publisher_city) — key book_id मात्र हो। यो कुन फर्ममा छ?"
      },
      "steps": [
        {
          "prompt": {
            "en": "Repeating group? yes or no",
            "ne": "दोहोरिने समूह? yes वा no"
          },
          "answer": "no",
          "accept": [
            "n"
          ],
          "why": {
            "en": "Every cell holds one value, so 1NF is satisfied.",
            "ne": "हरेक कक्षमा एउटै मान छ, त्यसैले 1NF पुगेको छ।"
          }
        },
        {
          "prompt": {
            "en": "Can there be a partial dependency here? yes or no",
            "ne": "यहाँ partial dependency हुन सक्छ? yes वा no"
          },
          "answer": "no",
          "accept": [
            "n"
          ],
          "why": {
            "en": "The key is a single column. A partial dependency needs a COMPOSITE key to be partial to, so 2NF is automatic here.",
            "ne": "key एउटै स्तम्भ हो। partial dependency हुन COMPOSITE key चाहिन्छ, त्यसैले यहाँ 2NF आफैं पुग्छ।"
          }
        },
        {
          "prompt": {
            "en": "publisher_city depends on which column?",
            "ne": "publisher_city कुन स्तम्भमा निर्भर छ?"
          },
          "answer": "publisher_id",
          "accept": [
            "publisher id",
            "publisherid"
          ],
          "why": {
            "en": "The city belongs to the publisher, not to the book. And publisher_id is not the key.",
            "ne": "सहर प्रकाशकको हो, पुस्तकको होइन। र publisher_id key होइन।"
          }
        },
        {
          "prompt": {
            "en": "A non-key column depending on another non-key column is called what?",
            "ne": "non-key स्तम्भ अर्को non-key स्तम्भमा निर्भर हुनुलाई के भनिन्छ?"
          },
          "answer": "transitive",
          "accept": [
            "transitive dependency"
          ],
          "why": {
            "en": "book_id → publisher_id → publisher_city. The dependency travels through a middle column, so it is transitive, and 3NF forbids it.",
            "ne": "book_id → publisher_id → publisher_city। निर्भरता बीचको स्तम्भबाट जान्छ, त्यसैले transitive, र 3NF ले यसलाई निषेध गर्छ।"
          }
        }
      ],
      "result": "2NF",
      "resultPrompt": {
        "en": "So which form is Book in?",
        "ne": "त्यसैले Book कुन फर्ममा छ?"
      },
      "check": {
        "en": "1NF yes, 2NF yes (single-column key), 3NF no — the transitive dependency stops it. Split Publisher(publisher_id, publisher_city) away to reach 3NF.",
        "ne": "1NF छ, 2NF छ (एउटै स्तम्भको key), 3NF छैन — transitive dependency ले रोक्छ। Publisher(publisher_id, publisher_city) छुट्याएपछि 3NF मा पुगिन्छ।"
      }
    },
    {
      "fade": "independent",
      "ask": {
        "en": "Order(order_id, product_id, quantity, product_name) — the key is (order_id, product_id). Which normal form is it in? Answer 1NF, 2NF or 3NF.",
        "ne": "Order(order_id, product_id, quantity, product_name) — key (order_id, product_id) हो। यो कुन नर्मल फर्ममा छ? 1NF, 2NF वा 3NF।"
      },
      "steps": [],
      "result": "1NF",
      "resultPrompt": {
        "en": "Normal form",
        "ne": "नर्मल फर्म"
      },
      "check": {
        "en": "product_name depends on product_id alone — part of the composite key. That is a partial dependency, so 2NF fails and the table stops at 1NF. If you answered 2NF, you probably checked for a transitive dependency and missed the partial one: always test the key BEFORE the non-key columns.",
        "ne": "product_name product_id मा मात्र निर्भर छ — composite key को एक भाग। यो partial dependency हो, त्यसैले 2NF पुग्दैन र तालिका 1NF मै रोकिन्छ। 2NF भन्नुभयो भने सम्भवतः transitive खोज्दै partial छुटाउनुभयो: सधैं non-key भन्दा पहिले key जाँच्नुहोस्।"
      }
    }
  ]
});

GuidedPractice.register({
  "id": "oop.ctororder",
  "subject": "grade10/oop-cpp",
  "unit": "u5",
  "skill": {
    "en": "Work out the order constructors and destructors run in",
    "ne": "constructor र destructor कुन क्रममा चल्छन् भन्ने पत्ता लगाउनुहोस्"
  },
  "rule": {
    "en": "Construction goes BASE FIRST, down to the most derived class. Destruction is the exact reverse: the most derived class is destroyed first. For multiple inheritance, bases run in the order they are LISTED after the colon.",
    "ne": "निर्माण BASE बाट सुरु भई सबैभन्दा derived कक्षासम्म जान्छ। विनाश ठ्याक्कै उल्टो: सबैभन्दा derived कक्षा पहिले नष्ट हुन्छ। multiple inheritance मा base हरू colon पछि जुन क्रममा लेखिएका छन् त्यही क्रममा चल्छन्।"
  },
  "problems": [
    {
      "fade": "worked",
      "ask": {
        "en": "class Animal { }; class Dog : public Animal { }; You write: Dog d; — which constructor runs first?",
        "ne": "class Animal { }; class Dog : public Animal { }; तपाईं लेख्नुहुन्छ: Dog d; — कुन constructor पहिले चल्छ?"
      },
      "steps": [
        {
          "prompt": {
            "en": "Which constructor runs first?",
            "ne": "कुन constructor पहिले चल्छ?"
          },
          "answer": "Animal",
          "accept": [
            "animal()"
          ],
          "why": {
            "en": "The base is built first. A derived object cannot exist until the part it inherits already does.",
            "ne": "base पहिले बन्छ। derived वस्तु त्यतिन्जेल हुनै सक्दैन जब सम्म आफूले पाएको भाग बनेको हुँदैन।"
          }
        },
        {
          "prompt": {
            "en": "Which constructor runs second?",
            "ne": "कुन constructor दोस्रोमा चल्छ?"
          },
          "answer": "Dog",
          "accept": [
            "dog()"
          ],
          "why": {
            "en": "Dog is the most derived class, so it is built last — on top of a finished Animal.",
            "ne": "Dog सबैभन्दा derived हो, त्यसैले अन्तिममा — तयार भइसकेको Animal माथि बन्छ।"
          }
        },
        {
          "prompt": {
            "en": "When d goes out of scope, which destructor runs FIRST?",
            "ne": "d को scope सकिँदा कुन destructor पहिले चल्छ?"
          },
          "answer": "~Dog",
          "accept": [
            "dog",
            "~dog()",
            "~dog"
          ],
          "why": {
            "en": "Destruction is the exact reverse of construction, so the most derived class goes first.",
            "ne": "विनाश निर्माणको ठ्याक्कै उल्टो हो, त्यसैले सबैभन्दा derived पहिले जान्छ।"
          }
        }
      ],
      "result": "Animal Dog ~Dog ~Animal",
      "resultPrompt": {
        "en": "Write the whole order, separated by spaces",
        "ne": "पूरा क्रम लेख्नुहोस्, खाली ठाउँले छुट्याएर"
      },
      "check": {
        "en": "Down the chain to build, back up the chain to destroy. That one sentence answers every question of this shape.",
        "ne": "बनाउन तल, नष्ट गर्न माथि। यही एउटा वाक्यले यस्तै आकारका सबै प्रश्नको उत्तर दिन्छ।"
      }
    },
    {
      "fade": "partial",
      "ask": {
        "en": "class A { }; class B : public A { }; class C : public B { }; You write: C obj; — multilevel inheritance. Give the construction order.",
        "ne": "class A { }; class B : public A { }; class C : public B { }; तपाईं लेख्नुहुन्छ: C obj; — multilevel inheritance। निर्माणको क्रम दिनुहोस्।"
      },
      "steps": [
        {
          "prompt": {
            "en": "First constructor",
            "ne": "पहिलो constructor"
          },
          "answer": "A",
          "accept": [
            "a()"
          ],
          "why": {
            "en": "A is at the top of the chain, so it is built first — even though the object you declared is a C.",
            "ne": "A शृङ्खलाको सबैभन्दा माथि छ, त्यसैले पहिले बन्छ — तपाईंले घोषणा गरेको वस्तु C भए पनि।"
          }
        },
        {
          "prompt": {
            "en": "Second constructor",
            "ne": "दोस्रो constructor"
          },
          "answer": "B",
          "accept": [
            "b()"
          ],
          "why": {
            "en": "B sits between A and C, so it is built once A is finished.",
            "ne": "B, A र C को बीचमा छ, त्यसैले A सकिएपछि बन्छ।"
          }
        },
        {
          "prompt": {
            "en": "Third constructor",
            "ne": "तेस्रो constructor"
          },
          "answer": "C",
          "accept": [
            "c()"
          ],
          "why": {
            "en": "C is the most derived, so it is built last.",
            "ne": "C सबैभन्दा derived हो, त्यसैले अन्तिममा बन्छ।"
          }
        },
        {
          "prompt": {
            "en": "First destructor",
            "ne": "पहिलो destructor"
          },
          "answer": "~C",
          "accept": [
            "c",
            "~c()",
            "~c"
          ],
          "why": {
            "en": "Reverse of construction: the last one built is the first one destroyed.",
            "ne": "निर्माणको उल्टो: अन्तिममा बनेको पहिले नष्ट हुन्छ।"
          }
        }
      ],
      "result": "A B C ~C ~B ~A",
      "resultPrompt": {
        "en": "The whole order",
        "ne": "पूरा क्रम"
      },
      "check": {
        "en": "Multilevel changes nothing about the rule — it just makes the chain longer. A B C going down, ~C ~B ~A coming back.",
        "ne": "multilevel ले नियम बदल्दैन — शृङ्खला मात्र लामो बनाउँछ। तल जाँदा A B C, फर्किँदा ~C ~B ~A।"
      }
    },
    {
      "fade": "guided",
      "ask": {
        "en": "class Father { }; class Mother { }; class Child : public Father, public Mother { }; You write: Child c; — multiple inheritance. Give the construction order.",
        "ne": "class Father { }; class Mother { }; class Child : public Father, public Mother { }; तपाईं लेख्नुहुन्छ: Child c; — multiple inheritance। निर्माणको क्रम दिनुहोस्।"
      },
      "steps": [
        {
          "prompt": {
            "en": "First",
            "ne": "पहिलो"
          },
          "answer": "Father",
          "accept": [
            "father()"
          ],
          "why": {
            "en": "With two bases, the one written FIRST after the colon is constructed first. Father is listed before Mother.",
            "ne": "दुई base हुँदा colon पछि पहिले लेखिएको पहिले बन्छ। Father, Mother भन्दा अगाडि लेखिएको छ।"
          }
        },
        {
          "prompt": {
            "en": "Second",
            "ne": "दोस्रो"
          },
          "answer": "Mother",
          "accept": [
            "mother()"
          ],
          "why": {
            "en": "Second in the list, second to be constructed. Note this has nothing to do with alphabetical order — swap the list and the order swaps.",
            "ne": "सूचीमा दोस्रो, बन्नमा पनि दोस्रो। यो वर्णक्रमसँग सम्बन्धित छैन — सूची बदल्नुहोस्, क्रम बदलिन्छ।"
          }
        },
        {
          "prompt": {
            "en": "Third",
            "ne": "तेस्रो"
          },
          "answer": "Child",
          "accept": [
            "child()"
          ],
          "why": {
            "en": "Both bases are ready, so the derived class is built on top of them.",
            "ne": "दुवै base तयार भए, त्यसैले derived कक्षा तीमाथि बन्छ।"
          }
        },
        {
          "prompt": {
            "en": "First destructor",
            "ne": "पहिलो destructor"
          },
          "answer": "~Child",
          "accept": [
            "child",
            "~child()",
            "~child"
          ],
          "why": {
            "en": "Reverse again. The derived class goes first, then Mother, then Father.",
            "ne": "फेरि उल्टो। derived पहिले, अनि Mother, अनि Father।"
          }
        }
      ],
      "result": "Father Mother Child ~Child ~Mother ~Father",
      "resultPrompt": {
        "en": "The whole order",
        "ne": "पूरा क्रम"
      },
      "check": {
        "en": "The order of the bases comes from the class header, not from anything else. That is the single fact this question is testing.",
        "ne": "base हरूको क्रम class header बाट आउँछ, अरू कतैबाट होइन। यही एउटै तथ्य यो प्रश्नले जाँच्छ।"
      }
    },
    {
      "fade": "independent",
      "ask": {
        "en": "class X { }; class Y { }; class Z : public Y, public X { }; You write: Z z; — write the full construction and destruction order, separated by spaces, using ~ for destructors.",
        "ne": "class X { }; class Y { }; class Z : public Y, public X { }; तपाईं लेख्नुहुन्छ: Z z; — निर्माण र विनाशको पूरा क्रम लेख्नुहोस्, खाली ठाउँले छुट्याएर, destructor लाई ~ राखेर।"
      },
      "steps": [],
      "result": "Y X Z ~Z ~X ~Y",
      "resultPrompt": {
        "en": "Full order",
        "ne": "पूरा क्रम"
      },
      "check": {
        "en": "Y comes before X because the header says \"public Y, public X\" — the names are deliberately out of alphabetical order to catch exactly that. If you answered X Y Z, you sorted the names instead of reading the header.",
        "ne": "header मा \"public Y, public X\" लेखिएकाले Y, X भन्दा पहिले आउँछ — नाम जानीजानी वर्णक्रम बाहिर राखिएका छन्, यही समात्न। X Y Z भन्नुभयो भने header पढ्नुको सट्टा नाम क्रमबद्ध गर्नुभयो।"
      }
    }
  ]
});

GuidedPractice.register({
  "id": "oop.controlflow",
  "subject": "grade10/oop-cpp",
  "unit": "u2",
  "skill": {
    "en": "Predict how many times a control statement runs",
    "ne": "control statement कति पटक चल्छ भनी अनुमान गर्नुहोस्"
  },
  "rule": {
    "en": "An if…else ladder is checked from the TOP and stops at the first true condition. A while loop checks BEFORE it acts, so it can run zero times. A do…while acts BEFORE it checks, so it always runs at least once.",
    "ne": "if…else ladder माथिबाट जाँचिन्छ र पहिलो सत्य सर्तमै रोकिन्छ। while ले काम गर्नुअघि जाँच्छ, त्यसैले शून्य पटक पनि चल्न सक्छ। do…while ले जाँच्नुअघि काम गर्छ, त्यसैले कम्तीमा एक पटक चल्छ नै।"
  },
  "problems": [
    {
      "fade": "worked",
      "ask": {
        "en": "int i = 0; while (i < 3) { cout << \"x\"; i++; } — how many times does the body run?",
        "ne": "int i = 0; while (i < 3) { cout << \"x\"; i++; } — body कति पटक चल्छ?"
      },
      "steps": [
        {
          "prompt": {
            "en": "Is the condition true before the first pass? Answer yes or no",
            "ne": "पहिलो पटकअघि सर्त सत्य छ? yes वा no"
          },
          "answer": "yes",
          "accept": [
            "y",
            "true"
          ],
          "why": {
            "en": "i is 0 and 0 < 3 is true, so the body runs. A while loop checks first, and this check passed.",
            "ne": "i = 0 र 0 < 3 सत्य छ, त्यसैले body चल्छ। while ले पहिले जाँच्छ, र यो जाँच पास भयो।"
          }
        },
        {
          "prompt": {
            "en": "What is i when the condition finally fails?",
            "ne": "सर्त असफल हुँदा i कति हुन्छ?"
          },
          "answer": "3",
          "accept": [
            "three"
          ],
          "why": {
            "en": "i goes 0, 1, 2, and after the third pass it is 3. 3 < 3 is false, so the loop stops there.",
            "ne": "i ० , १ , २ हुँदै तेस्रो पटकपछि ३ हुन्छ। 3 < 3 असत्य, त्यसैले लूप रोकिन्छ।"
          }
        }
      ],
      "result": "3",
      "resultPrompt": {
        "en": "Number of times the body runs",
        "ne": "body चल्ने पटक"
      },
      "check": {
        "en": "Three: i was 0, 1 and 2. The value that FAILS the test is not a run — that is the off-by-one everyone meets once.",
        "ne": "तीन पटक: i ० , १ र २ थियो। जाँच असफल गर्ने मान चलेको गनिँदैन — यही एक-कमी गल्ती सबैले एक पटक गर्छन्।"
      }
    },
    {
      "fade": "partial",
      "ask": {
        "en": "int marks = 78; if (marks >= 90) cout << \"A+\"; else if (marks >= 75) cout << \"A\"; else if (marks >= 60) cout << \"B\"; — what is printed?",
        "ne": "int marks = 78; if (marks >= 90) cout << \"A+\"; else if (marks >= 75) cout << \"A\"; else if (marks >= 60) cout << \"B\"; — के छापिन्छ?"
      },
      "steps": [
        {
          "prompt": {
            "en": "Does 78 pass the first test (marks >= 90)? yes or no",
            "ne": "७८ पहिलो जाँच (marks >= 90) पास गर्छ? yes वा no"
          },
          "answer": "no",
          "accept": [
            "n",
            "false"
          ],
          "why": {
            "en": "78 >= 90 is false, so the ladder moves to the next condition.",
            "ne": "78 >= 90 असत्य, त्यसैले ladder अर्को सर्तमा जान्छ।"
          }
        },
        {
          "prompt": {
            "en": "Does it pass the second (marks >= 75)? yes or no",
            "ne": "दोस्रो (marks >= 75) पास गर्छ? yes वा no"
          },
          "answer": "yes",
          "accept": [
            "y",
            "true"
          ],
          "why": {
            "en": "78 >= 75 is true. The ladder stops at the FIRST true condition — the third is never even checked.",
            "ne": "78 >= 75 सत्य। ladder पहिलो सत्य सर्तमै रोकिन्छ — तेस्रो जाँचिँदै जाँचिँदैन।"
          }
        }
      ],
      "result": "A",
      "resultPrompt": {
        "en": "What is printed",
        "ne": "के छापिन्छ"
      },
      "check": {
        "en": "78 is also >= 60, but that line never runs. An else-if ladder is not a list of independent tests — it is one decision with several branches.",
        "ne": "७८ चाहिँ >= 60 पनि हो, तर त्यो लाइन कहिल्यै चल्दैन। else-if ladder छुट्टाछुट्टै जाँचको सूची होइन — धेरै हाँगा भएको एउटै निर्णय हो।"
      }
    },
    {
      "fade": "guided",
      "ask": {
        "en": "int n = 5; while (n > 0) { cout << n; n = n - 2; } — how many times does the body run?",
        "ne": "int n = 5; while (n > 0) { cout << n; n = n - 2; } — body कति पटक चल्छ?"
      },
      "steps": [
        {
          "prompt": {
            "en": "List the values n takes while the loop is running, separated by spaces",
            "ne": "लूप चल्दा n ले लिने मानहरू खाली ठाउँले छुट्याएर लेख्नुहोस्"
          },
          "answer": "5 3 1",
          "accept": [
            "531"
          ],
          "why": {
            "en": "n starts at 5 and drops by 2: 5, then 3, then 1. After 1 it becomes -1, and -1 > 0 is false.",
            "ne": "n ५ बाट सुरु भई २ ले घट्छ: ५, ३, १। १ पछि -१ हुन्छ, र -1 > 0 असत्य।"
          }
        }
      ],
      "result": "3",
      "resultPrompt": {
        "en": "Number of times the body runs",
        "ne": "body चल्ने पटक"
      },
      "check": {
        "en": "Three. Counting a loop that does not step by 1 is where guessing stops working — write the values down.",
        "ne": "तीन। १-१ गरी नबढ्ने लूप गन्दा अनुमान काम लाग्दैन — मानहरू लेखेर हेर्नुहोस्।"
      }
    },
    {
      "fade": "independent",
      "ask": {
        "en": "int j = 10; do { cout << \"run\"; } while (j < 5); — how many times does the body run?",
        "ne": "int j = 10; do { cout << \"run\"; } while (j < 5); — body कति पटक चल्छ?"
      },
      "steps": [],
      "result": "1",
      "resultPrompt": {
        "en": "Number of times the body runs",
        "ne": "body चल्ने पटक"
      },
      "check": {
        "en": "Once. The condition 10 < 5 is false from the start — but a do…while ACTS before it CHECKS, so the body has already run by the time the condition is tested. If you answered 0, you read it as a while loop: that is the exact difference this unit says gets tested.",
        "ne": "एक पटक। सर्त 10 < 5 सुरुदेखि नै असत्य छ — तर do…while ले जाँच्नुअघि काम गर्छ, त्यसैले सर्त जाँच्दा body चलिसकेको हुन्छ। ० भन्नुभयो भने यसलाई while ठान्नुभयो: युनिटले \"यही जाँचिन्छ\" भनेको ठ्याक्कै यही फरक हो।"
      }
    },
    {
      "fade": "transfer",
      "ask": {
        "en": "for (int k = 10; k < 5; k++) { cout << \"run\"; } — how many times does the body run?",
        "ne": "for (int k = 10; k < 5; k++) { cout << \"run\"; } — body कति पटक चल्छ?"
      },
      "steps": [],
      "result": "0",
      "resultPrompt": {
        "en": "Number of times the body runs",
        "ne": "body चल्ने पटक"
      },
      "check": {
        "en": "Zero. A for loop checks its condition BEFORE the first pass, exactly like a while — so with k starting at 10 and the test k < 5, the body never runs. Same numbers as the do…while above and the opposite answer: the construct decides, not the values.",
        "ne": "शून्य। for ले पहिलो पटकअघि नै सर्त जाँच्छ, ठ्याक्कै while जस्तै — त्यसैले k = 10 र जाँच k < 5 हुँदा body कहिल्यै चल्दैन। माथिको do…while सँग उही सङ्ख्या, उल्टो उत्तर: मानले होइन, construct ले निर्णय गर्छ।"
      }
    }
  ]
});

GuidedPractice.register({
  "id": "hw.restore",
  "subject": "grade10/hardware",
  "unit": "hw-u6",
  "skill": {
    "en": "Count the sets a restore depends on, and say what a missing one costs",
    "ne": "पुनर्स्थापनाले भर पर्ने सेट गन्नुहोस्, र एउटा हराए के गुम्छ भन्नुहोस्"
  },
  "rule": {
    "en": "A restore needs the last FULL backup plus whatever holds the changes since. Incremental holds changes since the LAST BACKUP OF ANY KIND, so every one since the full backup is needed and they form a chain — break a link and everything after it is lost. Differential holds changes since the last FULL backup, so exactly two sets are ever needed and losing an older differential costs nothing.",
    "ne": "पुनर्स्थापनाका लागि अन्तिम FULL ब्याकअप र त्यसपछिका परिवर्तन बोक्ने जति चाहिन्छ। Incremental ले जुनसुकै किसिमको अघिल्लो ब्याकअपपछिको परिवर्तन बोक्छ, त्यसैले full पछिका सबै चाहिन्छन् र ती शृंखला बन्छन् — एउटा कडी टुट्यो भने त्यसपछिको सबै जान्छ। Differential ले अन्तिम FULL पछिको परिवर्तन बोक्छ, त्यसैले सधैं ठ्याक्कै दुई सेट चाहिन्छ र पुरानो differential हराए केही बिग्रँदैन।"
  },
  "problems": [
    {
      "fade": "worked",
      "ask": {
        "en": "Full backup on Monday. Incremental backups on Tuesday, Wednesday, Thursday and Friday. The disk fails on Friday night. How many sets does the restore need?",
        "ne": "सोमबार full ब्याकअप। मंगल, बुध, बिही र शुक्रबार incremental। शुक्रबार राति डिस्क बिग्रियो। पुनर्स्थापनाका लागि कति सेट चाहिन्छ?"
      },
      "steps": [
        {
          "prompt": {
            "en": "Does an incremental hold changes since the last FULL backup, or since the last backup of any kind? Answer full or any",
            "ne": "Incremental ले अन्तिम FULL पछिको परिवर्तन बोक्छ कि जुनसुकै किसिमको अघिल्लो ब्याकअपपछिको? full वा any"
          },
          "answer": "any",
          "accept": [
            "any kind",
            "last backup"
          ],
          "why": {
            "en": "That is the whole definition. Tuesday holds Monday-to-Tuesday, Wednesday holds Tuesday-to-Wednesday, and so on — each one starts where the previous backup stopped, not where the full one did.",
            "ne": "परिभाषा नै यही हो। मंगलबारले सोम–मंगलको, बुधबारले मंगल–बुधको बोक्छ — हरेकले अघिल्लो ब्याकअप रोकिएको ठाउँबाट सुरु गर्छ, full रोकिएको ठाउँबाट होइन।"
          }
        },
        {
          "prompt": {
            "en": "How many incremental sets were taken between Monday and Friday? Answer a number",
            "ne": "सोमबारदेखि शुक्रबारसम्म कति incremental सेट लिइए? सङ्ख्यामा उत्तर दिनुहोस्"
          },
          "answer": "4",
          "accept": [
            "four"
          ],
          "why": {
            "en": "Tuesday, Wednesday, Thursday and Friday — four.",
            "ne": "मंगल, बुध, बिही र शुक्रबार — चार।"
          }
        },
        {
          "prompt": {
            "en": "So how many sets in total does the restore need? Answer a number",
            "ne": "त्यसैले पुनर्स्थापनाका लागि जम्मा कति सेट चाहिन्छ? सङ्ख्यामा उत्तर दिनुहोस्"
          },
          "answer": "5",
          "accept": [
            "five"
          ],
          "why": {
            "en": "The full set, then all four increments replayed in order. Five.",
            "ne": "Full सेट, अनि चारै increment क्रमैसँग लगाउने। पाँच।"
          }
        }
      ],
      "result": "5",
      "resultPrompt": {
        "en": "Sets needed",
        "ne": "चाहिने सेट"
      },
      "check": {
        "en": "Five. The chain has to be replayed in order, which is the price incremental pays for being the fastest to take. Notice the count is full + one per day since — not one per day of the week.",
        "ne": "पाँच। शृंखला क्रमैसँग लगाउनुपर्छ — लिन सबैभन्दा छिटो हुनुको मूल्य incremental ले यही तिर्छ। गन्ती full + त्यसपछिका हरेक दिनको एक हो, हप्ताको हरेक दिनको एक होइन।"
      }
    },
    {
      "fade": "partial",
      "ask": {
        "en": "The same week, but the Tuesday-to-Friday backups are DIFFERENTIAL instead. The disk fails on Friday night. How many sets does the restore need?",
        "ne": "उही हप्ता, तर मंगलदेखि शुक्रसम्मका ब्याकअप DIFFERENTIAL छन्। शुक्रबार राति डिस्क बिग्रियो। पुनर्स्थापनाका लागि कति सेट चाहिन्छ?"
      },
      "steps": [
        {
          "prompt": {
            "en": "What does Friday's differential contain — changes since Thursday, or since Monday? Answer thursday or monday",
            "ne": "शुक्रबारको differential मा के हुन्छ — बिहीबारपछिको परिवर्तन कि सोमबारपछिको? thursday वा monday"
          },
          "answer": "monday",
          "accept": [
            "mon",
            "full"
          ],
          "why": {
            "en": "A differential always measures from the last FULL backup, so Friday's already contains everything Tuesday, Wednesday and Thursday captured.",
            "ne": "Differential सधैं अन्तिम FULL बाट नाप्छ, त्यसैले शुक्रबारकोमा मंगल, बुध र बिहीबारले टिपेको सबै पहिल्यै समेटिएको हुन्छ।"
          }
        },
        {
          "prompt": {
            "en": "So how many sets does the restore need? Answer a number",
            "ne": "त्यसैले पुनर्स्थापनाका लागि कति सेट चाहिन्छ? सङ्ख्यामा उत्तर दिनुहोस्"
          },
          "answer": "2",
          "accept": [
            "two"
          ],
          "why": {
            "en": "Monday's full set and Friday's differential. The ones in between are redundant the moment a newer differential exists.",
            "ne": "सोमबारको full र शुक्रबारको differential। नयाँ differential बनेकै क्षणदेखि बीचका सबै बेकामे हुन्छन्।"
          }
        }
      ],
      "result": "2",
      "resultPrompt": {
        "en": "Sets needed",
        "ne": "चाहिने सेट"
      },
      "check": {
        "en": "Two — always two, whatever day it fails on. That is what differential buys with its larger daily sets, and it is the comparison the exam asks for.",
        "ne": "दुई — जुन दिन बिग्रिए पनि सधैं दुई। ठूला दैनिक सेटको बदलामा differential ले किन्ने कुरा यही हो, र परीक्षाले खोज्ने तुलना पनि यही।"
      }
    },
    {
      "fade": "guided",
      "ask": {
        "en": "Back to the incremental week: full on Monday, incrementals Tuesday to Friday. Wednesday's tape turns out to be unreadable. Up to which day can the data be trusted?",
        "ne": "फेरि incremental हप्तामा: सोमबार full, मंगलदेखि शुक्रसम्म incremental। बुधबारको टेप पढ्नै नमिल्ने निस्कियो। कुन दिनसम्मको data भरपर्दो छ?"
      },
      "steps": [
        {
          "prompt": {
            "en": "Does Thursday's increment contain the changes Wednesday's was holding? Answer yes or no",
            "ne": "बिहीबारको increment मा बुधबारकोले बोकेको परिवर्तन छ? yes वा no"
          },
          "answer": "no",
          "accept": [
            "n"
          ],
          "why": {
            "en": "Thursday only holds what changed after Wednesday's backup ran. Nothing later re-captures what Wednesday was carrying, so the gap cannot be filled from another set.",
            "ne": "बिहीबारकोमा बुधबारको ब्याकअप चलेपछि बदलिएको मात्र हुन्छ। बुधबारले बोकेको कुरा पछिको कुनैले फेरि टिप्दैन, त्यसैले त्यो खाडल अर्को सेटबाट भरिँदैन।"
          }
        },
        {
          "prompt": {
            "en": "So which day is the last one you can restore to? Answer monday, tuesday, wednesday or friday",
            "ne": "त्यसैले कुन दिनसम्म फर्काउन सकिन्छ? monday, tuesday, wednesday वा friday"
          },
          "answer": "tuesday",
          "accept": [
            "tue"
          ],
          "why": {
            "en": "Monday's full set plus Tuesday's increment replay cleanly. The chain breaks at Wednesday, and everything from there on is unrecoverable.",
            "ne": "सोमबारको full र मंगलबारको increment सफासँग लाग्छन्। शृंखला बुधबार टुट्छ, र त्यसपछिको सबै फर्काउन सकिँदैन।"
          }
        }
      ],
      "result": "tuesday",
      "resultPrompt": {
        "en": "Restorable up to",
        "ne": "यति दिनसम्म फर्काउन सकिने"
      },
      "check": {
        "en": "Tuesday. One damaged tape cost three days of work — that fragility is the real argument against incremental, and it is why the same failure under a differential scheme would have cost nothing at all.",
        "ne": "मंगलबार। एउटा बिग्रेको टेपले तीन दिनको काम लियो — incremental विरुद्धको साँचो तर्क यही कमजोरी हो, र त्यसैले differential योजनामा उही असफलताले केही बिगार्दैनथ्यो।"
      }
    },
    {
      "fade": "independent",
      "ask": {
        "en": "A full backup runs on the 1st of the month. Differential backups run every day after it. The disk fails on the 20th. How many sets does the restore need? Answer a number.",
        "ne": "महिनाको १ गते full ब्याकअप चल्छ। त्यसपछि हरेक दिन differential। २० गते डिस्क बिग्रियो। पुनर्स्थापनाका लागि कति सेट चाहिन्छ? सङ्ख्यामा उत्तर दिनुहोस्।"
      },
      "steps": [],
      "result": "2",
      "resultPrompt": {
        "en": "Sets needed",
        "ne": "चाहिने सेट"
      },
      "check": {
        "en": "Two, and the twenty days are a distraction. A differential restore never needs more than the full set and the latest differential, however long the month has run. If you answered 20 or 19, you counted the backups taken rather than the ones a restore depends on.",
        "ne": "दुई — र बीस दिन ध्यान भड्काउन राखिएको हो। महिना जति लामो भए पनि differential पुनर्स्थापनालाई full सेट र सबैभन्दा पछिल्लो differential भन्दा बढी कहिल्यै चाहिँदैन। २० वा १९ भन्नुभयो भने तपाईंले लिइएका ब्याकअप गन्नुभयो, पुनर्स्थापनाले भर पर्नेहरू होइन।"
      }
    },
    {
      "fade": "transfer",
      "ask": {
        "en": "Different technology, same question. A RAID 5 array of four disks loses one disk. To rebuild the missing disk's contents, how many of the surviving disks must be readable? Answer a number.",
        "ne": "फरक प्रविधि, उही प्रश्न। चार डिस्कको RAID 5 array ले एउटा डिस्क गुमायो। हराएको डिस्कको सामग्री पुनर्निर्माण गर्न बाँकी कतिवटा डिस्क पढ्न मिल्नुपर्छ? सङ्ख्यामा उत्तर दिनुहोस्।"
      },
      "steps": [],
      "result": "3",
      "resultPrompt": {
        "en": "Disks needed",
        "ne": "चाहिने डिस्क"
      },
      "check": {
        "en": "All three. The rule transferred: a recovery depends on every source that holds part of the answer, and you count those rather than counting what exists. RAID 5 rebuilds the lost disk by combining the data and parity spread across ALL the remaining disks — so a second failure during the rebuild loses the array, which is exactly the chain-breaks-and-everything-after-is-gone problem, wearing different hardware.",
        "ne": "तीनै वटा। नियम सर्‍यो: पुनर्स्थापनाले उत्तरको अंश बोक्ने हरेक स्रोतमा भर पर्छ, र गन्नुपर्ने कुरा त्यही हो — के छ भन्ने होइन। RAID 5 ले बाँकी <b>सबै</b> डिस्कमा फैलिएको data र parity जोडेर हराएको डिस्क बनाउँछ — त्यसैले पुनर्निर्माणकै बीचमा दोस्रो डिस्क बिग्रिए array जान्छ, जुन ठ्याक्कै \"कडी टुट्यो, त्यसपछिको सबै गयो\" भन्ने समस्या हो, फरक हार्डवेयर लगाएर।"
      }
    }
  ]
});

GuidedPractice.register({
  "id": "hw.diagnose",
  "subject": "grade10/hardware",
  "unit": "hw-u4",
  "skill": {
    "en": "Read a symptom, decide how far the boot reached, and name what that rules out",
    "ne": "लक्षण पढ्नुहोस्, boot कहाँसम्म पुग्यो निर्णय गर्नुहोस्, र त्यसले के हटाउँछ भन्नुहोस्"
  },
  "rule": {
    "en": "A boot symptom tells you the last stage the machine completed, and everything AFTER that stage is ruled out. No power at all = power path. Fans but beeps and no video = POST is running, so power is fine and video was not ready — memory first. A message on screen = POST passed, so all the hardware POST checks are fine and the problem is finding or loading the operating system. The OS starting and then failing = hardware and boot sector are fine; the fault is software.",
    "ne": "Boot को लक्षणले मेसिनले पूरा गरेको अन्तिम चरण बताउँछ, र त्यस चरणपछिका सबै सम्भावना हट्छन्। बिजुली नै छैन = बिजुलीको बाटो। पंखा घुम्छ तर बीप र video छैन = POST चलिरहेको, त्यसैले बिजुली ठीक र video तयार थिएन — पहिले मेमोरी। स्क्रिनमा सन्देश = POST पास, त्यसैले POST ले जाँच्ने सबै हार्डवेयर ठीक र समस्या अपरेटिङ सिस्टम भेट्न वा लोड गर्नमा। OS सुरु भएर बिग्रिनु = हार्डवेयर र boot sector ठीक; खराबी सफ्टवेयरमा।"
  },
  "problems": [
    {
      "fade": "worked",
      "ask": {
        "en": "A computer shows no lights and no fan movement at all when the power button is pressed. How far did it get, and what does that rule out?",
        "ne": "पावर बटन थिच्दा कम्प्युटरमा कुनै बत्ती र पंखाको चाल देखिँदैन। यो कहाँसम्म पुग्यो, र त्यसले के हटाउँछ?"
      },
      "steps": [
        {
          "prompt": {
            "en": "Did the machine receive power at all? Answer yes or no",
            "ne": "मेसिनमा बिजुली आयो कि आएन? yes वा no"
          },
          "answer": "no",
          "accept": [
            "n"
          ],
          "why": {
            "en": "No lights and no fans means nothing electrical started. Power never reached the board.",
            "ne": "बत्ती छैन, पंखा छैन भनेको कुनै विद्युतीय काम सुरु नै भएन। बोर्डसम्म बिजुली पुगेन।"
          }
        },
        {
          "prompt": {
            "en": "Did POST run? Answer yes or no",
            "ne": "POST चल्यो? yes वा no"
          },
          "answer": "no",
          "accept": [
            "n"
          ],
          "why": {
            "en": "POST is a program on the board. With no power reaching the board, nothing can run — so POST is not a suspect and neither is memory.",
            "ne": "POST बोर्डको प्रोग्राम हो। बोर्डमा बिजुली नै नपुगेपछि केही चल्न सक्दैन — त्यसैले POST पनि शंकास्पद होइन, मेमोरी पनि होइन।"
          }
        },
        {
          "prompt": {
            "en": "So which single area do you check? Answer power, memory, disk or software",
            "ne": "त्यसैले कुन एउटा क्षेत्र जाँच्नुहुन्छ? power, memory, disk वा software"
          },
          "answer": "power",
          "accept": [
            "power supply",
            "psu",
            "mains"
          ],
          "why": {
            "en": "Everything after power is ruled out because nothing after power got a chance to happen. Check the wall socket, the cable, the switch at the back of the supply, and then the supply itself.",
            "ne": "बिजुलीपछिका सबै कुरा हट्छन्, किनकि बिजुलीपछि केही हुने मौकै भएन। भित्ताको सकेट, केबल, सप्लाई पछाडिको स्विच, अनि सप्लाई आफैँ जाँच्नुहोस्।"
          }
        }
      ],
      "result": "power",
      "resultPrompt": {
        "en": "Area to check",
        "ne": "जाँच्ने क्षेत्र"
      },
      "check": {
        "en": "It reached nothing at all, so the fault is in the power path and every later stage is ruled out. Notice what this saves you: there is no point testing RAM, the disk or the operating system, because none of them was ever reached.",
        "ne": "यो कतै पुगेन, त्यसैले खराबी बिजुलीको बाटोमा छ र पछिका सबै चरण हट्छन्। यसले के बचायो हेर्नुहोस्: RAM, disk वा अपरेटिङ सिस्टम जाँच्नुको कुनै अर्थ छैन, किनकि तीमध्ये कुनैसम्म पुगिएकै थिएन।"
      }
    },
    {
      "fade": "partial",
      "ask": {
        "en": "A computer powers on, the fans run, and it beeps in a repeating pattern with a black screen. How far did it get, and which area do you check?",
        "ne": "कम्प्युटरमा बिजुली आउँछ, पंखा घुम्छ, र कालो स्क्रिनसहित दोहोरिने ढाँचामा बीप गर्छ। यो कहाँसम्म पुग्यो, र कुन क्षेत्र जाँच्नुहुन्छ?"
      },
      "steps": [
        {
          "prompt": {
            "en": "Did POST run? Answer yes or no",
            "ne": "POST चल्यो? yes वा no"
          },
          "answer": "yes",
          "accept": [
            "y"
          ],
          "why": {
            "en": "The beeping IS the POST reporting. It can only beep if power reached the board and the BIOS started — so power is already ruled out.",
            "ne": "बीप गर्नु <b>नै</b> POST ले सुनाएको हो। बोर्डमा बिजुली पुगेर BIOS सुरु भएमा मात्र बीप हुन्छ — त्यसैले बिजुली पहिल्यै हट्यो।"
          }
        },
        {
          "prompt": {
            "en": "Which single area do you check first? Answer power, memory, disk or software",
            "ne": "पहिले कुन एउटा क्षेत्र जाँच्नुहुन्छ? power, memory, disk वा software"
          },
          "answer": "memory",
          "accept": [
            "ram"
          ],
          "why": {
            "en": "It is reporting by sound rather than on screen, which means the fault was found BEFORE video was initialised. Memory is tested that early in the POST, so it is the first suspect.",
            "ne": "यसले स्क्रिनमा होइन आवाजमा सुनाइरहेको छ — अर्थात् खराबी video सुरु हुन<b>अघि</b> भेटियो। POST मा मेमोरी त्यति नै चाँडो जाँचिन्छ, त्यसैले पहिलो शंका त्यहीँ।"
          }
        }
      ],
      "result": "memory",
      "resultPrompt": {
        "en": "Area to check",
        "ne": "जाँच्ने क्षेत्र"
      },
      "check": {
        "en": "Beeps mean POST is running, so power is fine; a black screen at that moment means video was not ready yet, which puts memory first. If you answered \"power\", re-read the symptom — fans running is already proof that power arrived.",
        "ne": "बीप भनेको POST चलिरहेको, त्यसैले बिजुली ठीक छ; त्यही बेला कालो स्क्रिन भनेको video अझै तयार थिएन, जसले मेमोरीलाई पहिलो बनाउँछ। \"power\" भन्नुभयो भने लक्षण फेरि पढ्नुहोस् — पंखा घुम्नु नै बिजुली आइपुगेको प्रमाण हो।"
      }
    },
    {
      "fade": "guided",
      "ask": {
        "en": "A computer shows the manufacturer logo, then the message \"Operating system not found\". How far did it get, and which area do you check?",
        "ne": "कम्प्युटरमा कम्पनीको लोगो देखिन्छ, अनि \"Operating system not found\" सन्देश आउँछ। यो कहाँसम्म पुग्यो, र कुन क्षेत्र जाँच्नुहुन्छ?"
      },
      "steps": [
        {
          "prompt": {
            "en": "Did POST pass? Answer yes or no",
            "ne": "POST पास भयो? yes वा no"
          },
          "answer": "yes",
          "accept": [
            "y"
          ],
          "why": {
            "en": "A logo and a readable message on screen mean video is working and the BIOS finished its checks. POST passed, so memory, video and the power path are all ruled out.",
            "ne": "स्क्रिनमा लोगो र पढ्न मिल्ने सन्देश आउनुले video चलिरहेको र BIOS ले जाँच सकेको जनाउँछ। POST पास भयो, त्यसैले मेमोरी, video र बिजुलीको बाटो सबै हट्छन्।"
          }
        },
        {
          "prompt": {
            "en": "Which single area do you check? Answer power, memory, disk or software",
            "ne": "कुन एउटा क्षेत्र जाँच्नुहुन्छ? power, memory, disk वा software"
          },
          "answer": "disk",
          "accept": [
            "hard disk",
            "drive",
            "storage"
          ],
          "why": {
            "en": "The BIOS got far enough to look for an operating system and could not find one. That points at the boot drive: the boot order in BIOS, the data cable, or a damaged boot sector.",
            "ne": "BIOS अपरेटिङ सिस्टम खोज्ने चरणसम्म पुग्यो तर भेटेन। यसले boot ड्राइभतिर देखाउँछ: BIOS को boot order, data केबल, वा बिग्रेको boot sector।"
          }
        }
      ],
      "result": "disk",
      "resultPrompt": {
        "en": "Area to check",
        "ne": "जाँच्ने क्षेत्र"
      },
      "check": {
        "en": "A message ON the screen is proof POST passed, and that alone rules out most of the hardware. The fault is in finding or loading the operating system, which means the drive, its cable or the boot order.",
        "ne": "स्क्रिन<b>मा</b> सन्देश आउनु POST पास भएको प्रमाण हो, र त्यति एक्लैले धेरैजसो हार्डवेयर हटाउँछ। खराबी अपरेटिङ सिस्टम भेट्न वा लोड गर्नमा छ — अर्थात् ड्राइभ, यसको केबल वा boot order।"
      }
    },
    {
      "fade": "independent",
      "ask": {
        "en": "A computer boots to the desktop normally, then freezes about a minute later. It does this every time. Which single area do you check — power, memory, disk or software?",
        "ne": "कम्प्युटर सामान्य रूपमा डेस्कटपसम्म आउँछ, अनि करिब एक मिनेटपछि अड्किन्छ। हरेक पटक यसै हुन्छ। कुन एउटा क्षेत्र जाँच्नुहुन्छ — power, memory, disk वा software?"
      },
      "steps": [],
      "result": "software",
      "resultPrompt": {
        "en": "Area to check",
        "ne": "जाँच्ने क्षेत्र"
      },
      "check": {
        "en": "The machine completed every hardware stage, so the symptom itself rules the hardware out. Check startup programs, recently installed drivers and updates, and scan for malware — booting into safe mode is the standard test, because it loads almost none of them.",
        "ne": "मेसिनले हार्डवेयरका सबै चरण पूरा गर्‍यो, त्यसैले लक्षणले नै हार्डवेयर हटाउँछ। Startup प्रोग्राम, भर्खर राखिएका driver र अपडेट जाँच्नुहोस्, र malware स्क्यान गर्नुहोस् — safe mode मा boot गर्नु मानक परीक्षण हो, किनकि त्यसले तीमध्ये झन्डै कुनै पनि लोड गर्दैन।"
      }
    },
    {
      "fade": "transfer",
      "ask": {
        "en": "A printer prints the first two pages of every job correctly and then stops, on any document. Apply the same reasoning: two good pages rule out the driver, the cable and the printer, because none of those could work twice and then fail. So what kind of cause is left — a capacity limit, a driver, or a cable? Answer in one word.",
        "ne": "एउटा प्रिन्टरले हरेक कामको पहिलो दुई पाना ठीकसँग छाप्छ अनि रोकिन्छ — जुनसुकै कागजातमा। उही तर्क लगाउनुहोस्: दुई पाना ठीक आउनुले driver, केबल र प्रिन्टरलाई हटाउँछ, किनकि तीमध्ये कुनै पनि दुई पटक चलेर अनि बिग्रिन सक्दैन। त्यसो भए कस्तो कारण बाँकी रह्यो — capacity, driver कि cable? एक शब्दमा उत्तर दिनुहोस्।"
      },
      "steps": [],
      "result": "capacity",
      "resultPrompt": {
        "en": "Kind of cause",
        "ne": "कारणको किसिम"
      },
      "check": {
        "en": "The rule transferred: \"how far did it get\" is not about booting — it is about reading a partial success as evidence. Two good pages rule out the driver, the cable and the printer itself, because none of those could work twice and then fail. What is left is something that runs out: printer memory, or a spooler that cannot hold the rest of the job.",
        "ne": "नियम सर्‍यो: \"कहाँसम्म पुग्यो\" भन्नु boot कै कुरा होइन — आंशिक सफलतालाई प्रमाणका रूपमा पढ्नु हो। दुई पाना ठीक आउनुले driver, केबल र प्रिन्टर आफैँलाई हटाउँछ, किनकि तीमध्ये कुनै पनि दुई पटक चलेर अनि बिग्रिन सक्दैन। बाँकी रहन्छ — सकिने कुरा: प्रिन्टरको मेमोरी, वा बाँकी काम राख्न नसक्ने spooler।"
      }
    }
  ]
});
