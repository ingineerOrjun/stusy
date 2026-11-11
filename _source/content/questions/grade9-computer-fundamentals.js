/* ============================================================
   QUESTION BANK — Grade 9 · Fundamentals of Computer and Application

   AUTHORED PRACTICE QUESTIONS. These are written for Gyansetu. They
   follow the kinds of question this subject is examined with and the
   weighting of the CDC specification grid, but they are NOT past CDC or
   SEE papers and nothing in the product presents them as such.

   SCOPE: Unit 1 only, because Unit 1 is the only unit authored. A bank
   that asked about Unit 4 before Unit 4 existed would be testing a
   student on something this site has not taught, which is worse than a
   short bank.

   WEIGHTING: Unit 1 carries 6 of the subject's 50 external marks. Eight
   questions for one unit is deliberately generous — the quiz draws 8,
   so the bank must exceed the draw for a retake to differ, and it will
   be rebalanced across units as the subject grows.

   Contract: docs/ASSESSMENT-ARCHITECTURE.md
   ============================================================ */
module.exports = [
  {
    id: 'g9.cf.q01', subject: 'grade9/computer-fundamentals', unit: 'u1',
    topic: 'computer-definition', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which feature separates a computer from a simple electronic calculator?',
      ne: 'कम्प्युटरलाई साधारण इलेक्ट्रोनिक क्यालकुलेटरबाट छुट्याउने विशेषता कुन हो?'
    },
    options: [
      { en: 'It runs on electricity', ne: 'यो बिजुलीले चल्छ' },
      { en: 'It holds a set of stored instructions and follows them on its own',
        ne: 'यसले निर्देशनको सेट भण्डारण गरेर आफैं पछ्याउँछ' },
      { en: 'It can add and subtract numbers', ne: 'यसले संख्या जोड्न र घटाउन सक्छ' },
      { en: 'It has a screen', ne: 'यसमा पर्दा हुन्छ' }
    ],
    answer: 1,
    explanation: {
      en: 'A calculator is electronic, has a screen and does arithmetic, so none of those separates the two. What it cannot do is hold the whole list of steps — the program — and carry it out without a person pressing each key. That is why "stored instructions" is in the definition.',
      ne: 'क्यालकुलेटर पनि इलेक्ट्रोनिक छ, पर्दा छ र गणना गर्छ — त्यसैले ती कुनैले दुईलाई छुट्याउँदैनन्। उसले नसक्ने कुरा हो चरणहरूको पूरै सूची — प्रोग्राम — राखेर हरेक बटन मान्छेले नथिचिकनै चलाउनु। परिभाषामा "भण्डारण गरिएका निर्देशन" त्यसैले छ।'
    }
  },
  {
    id: 'g9.cf.q02', subject: 'grade9/computer-fundamentals', unit: 'u1',
    topic: 'data-vs-information', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A school enters the marks 72, 65 and 88, and the computer reports "class average 75". Which is the DATA and which is the INFORMATION?',
      ne: 'विद्यालयले ७२, ६५ र ८८ अंक भर्छ, र कम्प्युटरले "कक्षाको औसत ७५" भन्छ। DATA कुन हो र INFORMATION कुन?'
    },
    options: [
      { en: '72, 65, 88 are data; "class average 75" is information',
        ne: '७२, ६५, ८८ data हुन्; "कक्षाको औसत ७५" information हो' },
      { en: '72, 65, 88 are information; "class average 75" is data',
        ne: '७२, ६५, ८८ information हुन्; "कक्षाको औसत ७५" data हो' },
      { en: 'Both are data', ne: 'दुवै data हुन्' },
      { en: 'Both are information', ne: 'दुवै information हुन्' }
    ],
    answer: 0,
    explanation: {
      en: 'Data is the raw figures that mean little on their own. Information is what comes out after processing, in a form a person can use. The direction is always the same: data goes in, information comes out, and the processing in between is the computer\'s job.',
      ne: 'Data भनेको आफैंमा थोरै अर्थ राख्ने कच्चा अंक हो। Information भनेको प्रशोधनपछि निस्कने, मान्छेले काम लगाउन सक्ने रूप हो। दिशा सधैं उही: data भित्र, information बाहिर, र बीचको प्रशोधन कम्प्युटरको काम।'
    }
  },
  {
    id: 'g9.cf.q03', subject: 'grade9/computer-fundamentals', unit: 'u1',
    topic: 'gigo', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A clerk types a salary as 50000 instead of 5000. The computer calculates the totals perfectly and the payroll is wrong. What does this show?',
      ne: 'कर्मचारीले तलब ५००० का साटो ५०००० टाइप गर्छ। कम्प्युटरले जोड ठ्याक्कै सही निकाल्छ र तलब विवरण गलत हुन्छ। यसले के देखाउँछ?'
    },
    options: [
      { en: 'The computer is not accurate', ne: 'कम्प्युटर शुद्ध छैन' },
      { en: 'The computer is not reliable', ne: 'कम्प्युटर भरपर्दो छैन' },
      { en: 'GIGO — the machine processed wrong data correctly',
        ne: 'GIGO — मेसिनले गलत data लाई सही रूपमा प्रशोधन गर्‍यो' },
      { en: 'The computer lacks diligence', ne: 'कम्प्युटरमा लगनशीलता छैन' }
    ],
    answer: 2,
    explanation: {
      en: 'Accuracy means the machine does not make arithmetic mistakes, and here it did not — it averaged exactly what it was given. Garbage In, Garbage Out: correctness of the answer depends on the data you supply. Writing "the computer is not accurate" is the usual way marks are lost on this question.',
      ne: 'शुद्धताको अर्थ मेसिनले गणनामा गल्ती गर्दैन भन्ने हो, र यहाँ गरेन — दिइएकै कुराको ठ्याक्कै औसत निकाल्यो। Garbage In, Garbage Out: उत्तर सही हुनु तपाईंले दिएको data मा भर पर्छ। "कम्प्युटर शुद्ध छैन" लेख्नु नै यस प्रश्नमा अंक गुमाउने सामान्य तरिका हो।'
    }
  },
  {
    id: 'g9.cf.q04', subject: 'grade9/computer-fundamentals', unit: 'u1',
    topic: 'classification-data-handling', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A petrol pump measures the fuel flowing out and prints a bill showing the exact amount in digits. Which type of computer is it, by data handling?',
      ne: 'पेट्रोल पम्पले बगेको इन्धन नाप्छ र ठ्याक्कै परिमाण अङ्कमा देखाउने बिल छाप्छ। डाटा ह्यान्डलिङका आधारमा यो कुन किसिमको कम्प्युटर हो?'
    },
    options: [
      { en: 'Analog', ne: 'Analog' },
      { en: 'Digital', ne: 'Digital' },
      { en: 'Hybrid', ne: 'Hybrid' },
      { en: 'Special purpose', ne: 'Special purpose' }
    ],
    answer: 2,
    explanation: {
      en: 'It measures a continuously changing quantity, which is analog, and then works in counted digits, which is digital. A machine doing both is hybrid. "Special purpose" is true of the pump but answers a different basis of classification — the question names data handling.',
      ne: 'यसले निरन्तर बदलिने परिमाण नाप्छ — त्यो analog — अनि गनिने अङ्कमा काम गर्छ — त्यो digital। दुवै गर्ने मेसिन hybrid हो। "Special purpose" पम्पका लागि सही भए पनि वर्गीकरणको अर्कै आधारको उत्तर हो; प्रश्नले डाटा ह्यान्डलिङ भनेको छ।'
    }
  },
  {
    id: 'g9.cf.q05', subject: 'grade9/computer-fundamentals', unit: 'u1',
    topic: 'classification-bases', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'On how many different bases are computers classified in this unit, and what does "by size" ask?',
      ne: 'यस युनिटमा कम्प्युटरको वर्गीकरण कति फरक आधारमा हुन्छ, र "आकार अनुसार" ले के सोध्छ?'
    },
    options: [
      { en: 'Five — how much work the machine can do at once',
        ne: 'पाँच — मेसिनले एकैपटक कति काम गर्न सक्छ' },
      { en: 'Three — the physical height and weight of the machine',
        ne: 'तीन — मेसिनको भौतिक उचाइ र तौल' },
      { en: 'Five — the physical height and weight of the machine',
        ne: 'पाँच — मेसिनको भौतिक उचाइ र तौल' },
      { en: 'Four — how much the machine costs', ne: 'चार — मेसिनको मूल्य कति' }
    ],
    answer: 0,
    explanation: {
      en: 'Five bases: size, data handling, purpose, model and brand. "By size" is about capacity — how much work the machine handles at once — which is why a supercomputer is in that class even though a mainframe may take up more room. Physical shape is the MODEL basis, not size.',
      ne: 'पाँच आधार: आकार, डाटा ह्यान्डलिङ, प्रयोजन, मोडेल र ब्रान्ड। "आकार अनुसार" भनेको क्षमता हो — मेसिनले एकैपटक कति काम थाम्छ — त्यसैले ठाउँ बढी ओगट्ने mainframe भए पनि supercomputer त्यही वर्गमा पर्छ। भौतिक आकार भनेको MODEL को आधार हो, size को होइन।'
    }
  },
  {
    id: 'g9.cf.q06', subject: 'grade9/computer-fundamentals', unit: 'u1',
    topic: 'classification-purpose', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'The computer inside a washing machine runs one fixed job and cannot be loaded with new programs. By purpose, it is:',
      ne: 'वासिङ मेसिनभित्रको कम्प्युटरले एउटै निश्चित काम गर्छ र त्यसमा नयाँ प्रोग्राम हाल्न मिल्दैन। प्रयोजनका आधारमा यो हो:'
    },
    options: [
      { en: 'General purpose', ne: 'General purpose' },
      { en: 'Special purpose', ne: 'Special purpose' },
      { en: 'Hybrid', ne: 'Hybrid' },
      { en: 'Mainframe', ne: 'Mainframe' }
    ],
    answer: 1,
    explanation: {
      en: 'Built for one job and not reprogrammable is the definition of special purpose. It is also a microcomputer and a digital computer — every machine has an answer on all five bases at once, and the question tells you which basis it is asking about.',
      ne: 'एउटै कामका लागि बनेको र नयाँ प्रोग्राम हाल्न नमिल्ने — special purpose को परिभाषा यही हो। यो microcomputer र digital कम्प्युटर पनि हो; हरेक मेसिनसँग पाँचै आधारको उत्तर एकैचोटि हुन्छ, र प्रश्नले कुन आधार सोधेको हो भन्छ।'
    }
  },
  {
    id: 'g9.cf.q07', subject: 'grade9/computer-fundamentals', unit: 'u1',
    topic: 'characteristics', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which characteristic of a computer means it does the ten-thousandth calculation as carefully as the first?',
      ne: 'कम्प्युटरको कुन विशेषताले उसले दश हजारौं गणना पनि पहिलोजत्तिकै ध्यान दिएर गर्छ भन्ने जनाउँछ?'
    },
    options: [
      { en: 'Speed', ne: 'गति' },
      { en: 'Versatility', ne: 'बहुउपयोगिता' },
      { en: 'Diligence', ne: 'लगनशीलता' },
      { en: 'Storage', ne: 'भण्डारण' }
    ],
    answer: 2,
    explanation: {
      en: 'Diligence is the absence of boredom and tiredness: a computer does not lose concentration over a long run of repeated work, which a person would. Speed is about how fast, not how consistently.',
      ne: 'लगनशीलता भनेको दिक्क नलाग्नु र नथाक्नु हो: लामो दोहोरिने कामले कम्प्युटरको ध्यान भंग हुँदैन, जुन मान्छेको हुन्छ। गति भनेको कति छिटो भन्ने हो, कति एकनासले भन्ने होइन।'
    }
  },
  {
    id: 'g9.cf.q08', subject: 'grade9/computer-fundamentals', unit: 'u1',
    topic: 'ipo-cycle', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'In the block diagram of a computer, which unit holds both the data and the program for later use?',
      ne: 'कम्प्युटरको ब्लक चित्रमा, data र प्रोग्राम दुवैलाई पछि प्रयोगका लागि राख्ने एकाइ कुन हो?'
    },
    options: [
      { en: 'Input unit', ne: 'Input एकाइ' },
      { en: 'Output unit', ne: 'Output एकाइ' },
      { en: 'Storage', ne: 'Storage' },
      { en: 'The screen', ne: 'पर्दा' }
    ],
    answer: 2,
    explanation: {
      en: 'Input brings data in and output sends information out; neither keeps anything. Storage is the fourth stage of the definition, and it holds the stored program as well as the data — which is the feature that makes the machine a computer rather than a calculator.',
      ne: 'Input ले data भित्र ल्याउँछ, output ले information बाहिर पठाउँछ; दुवैले केही राख्दैनन्। Storage परिभाषाको चौथो चरण हो, र यसले data सँगै भण्डारण गरिएको प्रोग्राम पनि राख्छ — यही विशेषताले मेसिनलाई क्यालकुलेटर होइन कम्प्युटर बनाउँछ।'
    }
  },

  /* ---- added in Phase 12.1 --------------------------------------------
     The first eight left official topic 1.3, Modern Applications of
     computer, with NO question at all — the same gap that left Grade 10's
     second-heaviest OOP unit unexamined, found here by listing topics
     against questions rather than by counting the bank.

     They also had no hard question, and eight questions against a draw of
     eight meant a retake was the same eight reordered. Twelve against a
     draw of eight fixes both. */
  {
    id: 'g9.cf.q09', subject: 'grade9/computer-fundamentals', unit: 'u1',
    topic: 'modern-applications', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A hospital in Kathmandu keeps patient records, test results and billing on computers. Which application area of the computer is this?',
      ne: 'काठमाडौंको एउटा अस्पतालले बिरामीको रेकर्ड, जाँचको नतिजा र बिलिङ कम्प्युटरमा राख्छ। यो कम्प्युटरको कुन प्रयोग क्षेत्र हो?'
    },
    options: [
      { en: 'Education', ne: 'शिक्षा' },
      { en: 'Health / medicine', ne: 'स्वास्थ्य / चिकित्सा' },
      { en: 'Entertainment', ne: 'मनोरञ्जन' },
      { en: 'Communication', ne: 'सञ्चार' }
    ],
    answer: 1,
    explanation: {
      en: 'Record keeping, test results and billing inside a hospital are all the health application area. The exam usually gives you a setting and asks for the field, or gives the field and asks for two uses — so learn each area with one Nepali example you could defend.',
      ne: 'अस्पतालभित्रको रेकर्ड राख्ने काम, जाँचको नतिजा र बिलिङ — सबै स्वास्थ्य प्रयोग क्षेत्रका हुन्। परीक्षाले प्रायः ठाउँ दिएर क्षेत्र सोध्छ, वा क्षेत्र दिएर दुई प्रयोग सोध्छ — त्यसैले हरेक क्षेत्रसँग एउटा नेपाली उदाहरण सम्झनुहोस्।'
    }
  },
  {
    id: 'g9.cf.q10', subject: 'grade9/computer-fundamentals', unit: 'u1',
    topic: 'characteristics', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'One computer prints report cards all morning, then is used for typing a letter and watching a video. Which TWO characteristics does this best show?',
      ne: 'एउटै कम्प्युटरले बिहानभरि रिजल्ट छाप्छ, अनि चिठी टाइप गर्न र भिडियो हेर्न प्रयोग हुन्छ। यसले सबैभन्दा राम्रोसँग कुन दुई विशेषता देखाउँछ?'
    },
    options: [
      { en: 'Accuracy and storage', ne: 'शुद्धता र भण्डारण' },
      { en: 'Diligence and versatility', ne: 'लगनशीलता र बहुउपयोगिता' },
      { en: 'Speed and accuracy', ne: 'गति र शुद्धता' },
      { en: 'Automation and accuracy', ne: 'स्वचालन र शुद्धता' }
    ],
    answer: 1,
    explanation: {
      en: 'Working all morning without tiring or losing care is diligence. Doing three unlike jobs on one machine is versatility. Speed and accuracy are true of the machine too, but nothing in this situation demonstrates them — the question asks which the situation SHOWS, not which the computer has.',
      ne: 'बिहानभरि नथाकी, ध्यान नघटाई काम गर्नु लगनशीलता हो। एउटै मेसिनमा तीन फरक काम गर्नु बहुउपयोगिता। गति र शुद्धता पनि मेसिनमा छन्, तर यो परिस्थितिले ती देखाउँदैन — प्रश्नले परिस्थितिले के देखाउँछ भनेको छ, कम्प्युटरसँग के छ भनेको होइन।'
    }
  },
  {
    id: 'g9.cf.q11', subject: 'grade9/computer-fundamentals', unit: 'u1',
    topic: 'gigo', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A result sheet shows a student with 950 out of 500. The clerk typed 95 as 950. A friend says "the computer made a mistake, so computers are not accurate." What is the correct reply?',
      ne: 'नतिजामा एक विद्यार्थीको ५०० मध्ये ९५० देखियो। क्लर्कले ९५ लाई ९५० टाइप गरेछन्। साथी भन्छ "कम्प्युटरले गल्ती गर्‍यो, त्यसैले कम्प्युटर शुद्ध हुँदैन।" ठिक जवाफ कुन?'
    },
    options: [
      { en: 'The friend is right — a wrong output proves the computer is not accurate',
        ne: 'साथी ठिक छ — गलत आउटपुटले कम्प्युटर शुद्ध छैन भन्ने प्रमाणित गर्छ' },
      { en: 'The computer processed the data it was given exactly; the data was wrong, which is GIGO, and accuracy is untouched',
        ne: 'कम्प्युटरले दिइएकै data ठ्याक्कै प्रशोधन गर्‍यो; data नै गलत थियो — यो GIGO हो, र शुद्धतामा कुनै असर पर्दैन' },
      { en: 'The computer should have noticed that 950 is more than 500 and refused it',
        ne: 'कम्प्युटरले ९५० ५०० भन्दा बढी हो भनी चाल पाएर अस्वीकार गर्नुपर्थ्यो' },
      { en: 'This is a storage failure, not an accuracy question',
        ne: 'यो भण्डारणको असफलता हो, शुद्धताको प्रश्न होइन' }
    ],
    answer: 1,
    explanation: {
      en: 'Accuracy is a claim about PROCESSING, not about the data. Given 950, the machine handled 950 correctly — which is exactly what accuracy means, and exactly why a wrong output does not disprove it. Option 3 is the tempting one: a program COULD be written to reject a mark above the full marks, but that is a check someone chose to add, not something a computer does because it is a computer. The characteristic being tested here is accuracy, and the principle is Garbage In, Garbage Out.',
      ne: 'शुद्धता भनेको प्रशोधन बारेको दाबी हो, data बारेको होइन। ९५० दिइएपछि मेसिनले ९५० लाई ठिकसँग चलायो — शुद्धताको अर्थ यही हो, र गलत आउटपुटले यसलाई गलत साबित नगर्ने कारण पनि यही। तेस्रो विकल्प लोभ्याउने छ: पूर्णाङ्कभन्दा बढी अंक अस्वीकार गर्ने प्रोग्राम लेख्न सकिन्छ, तर त्यो कसैले थपेको जाँच हो, कम्प्युटर भएकै कारण हुने कुरा होइन। यहाँ जाँचिएको विशेषता शुद्धता हो, र सिद्धान्त Garbage In, Garbage Out।'
    }
  },
  {
    id: 'g9.cf.q12', subject: 'grade9/computer-fundamentals', unit: 'u1',
    topic: 'classification-bases', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'An ECG machine in a clinic measures the smoothly changing electrical signal of a heartbeat and prints a numbered report. A question asks: "classify it on the basis of working principle." Which answer is correct, and why is the other tempting one wrong?',
      ne: 'क्लिनिकको ECG मेसिनले मुटुको बिस्तारै बदलिने विद्युतीय सङ्केत नाप्छ र संख्या भएको रिपोर्ट छाप्छ। प्रश्न: "working principle को आधारमा वर्गीकरण गर्नुहोस्।" ठिक उत्तर कुन, र अर्को लोभ्याउने उत्तर किन गलत?'
    },
    options: [
      { en: 'Microcomputer — because one person uses it at a time',
        ne: 'Microcomputer — किनभने एकपटक एक जनाले चलाउँछ' },
      { en: 'Hybrid — it measures an analog signal and gives digital output',
        ne: 'Hybrid — यसले analog सङ्केत नाप्छ र digital आउटपुट दिन्छ' },
      { en: 'Special purpose — because it is built for one job',
        ne: 'Special purpose — किनभने एउटै कामका लागि बनेको' },
      { en: 'Digital — because the report is printed in numbers',
        ne: 'Digital — किनभने रिपोर्ट संख्यामा छापिन्छ' }
    ],
    answer: 1,
    explanation: {
      en: '"Working principle" is the data-handling basis, so the answer must be analog, digital or hybrid — which rules out microcomputer (size) and special purpose (purpose) however true they are of the machine. Between the two that remain, digital is the trap: the machine does produce digital output, but it also MEASURES a smoothly changing signal, and doing both is the definition of hybrid. The general lesson is to read which basis the question names before looking at the machine at all.',
      ne: '"Working principle" भनेको डाटा ह्यान्डलिङको आधार हो, त्यसैले उत्तर analog, digital वा hybrid मध्ये हुनैपर्छ — यसले microcomputer (आकार) र special purpose (प्रयोजन) लाई हटाइदिन्छ, ती मेसिनका लागि जति नै सत्य भए पनि। बाँकी दुईमध्ये digital पासो हो: मेसिनले digital आउटपुट त दिन्छ, तर बिस्तारै बदलिने सङ्केत नाप्छ पनि, र दुवै गर्नु नै hybrid को परिभाषा हो। पाठ यो हो — मेसिन हेर्नुअघि प्रश्नले कुन आधार तोकेको छ पढ्नुहोस्।'
    }
  }
];
