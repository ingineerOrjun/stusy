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
  },

  /* ================= UNIT 2 — Computer Components (7 marks) =================
     Weighted to where the marks are lost rather than to topic count: four of
     the eight are about the input unit, because OMR/OCR/BCR/MICR is this
     unit's reliable question and its reliable confusion. */
  {
    id: 'g9.cf.q13', subject: 'grade9/computer-fundamentals', unit: 'u2',
    topic: 'system-units', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which unit of a computer system performs all the comparisons?',
      ne: 'कम्प्युटर प्रणालीको कुन एकाइले सबै तुलना गर्छ?'
    },
    options: [
      { en: 'The control unit', ne: 'Control unit' },
      { en: 'The ALU', ne: 'ALU' },
      { en: 'The memory unit', ne: 'Memory unit' },
      { en: 'The input unit', ne: 'Input unit' }
    ],
    answer: 1,
    explanation: {
      en: 'The ALU is the Arithmetic and LOGIC Unit, and comparison is a logical operation. The control unit decides what happens next and in what order, but it does not do the comparing itself. This pair is asked almost every year.',
      ne: 'ALU भनेको Arithmetic and LOGIC Unit हो, र तुलना तार्किक काम हो। Control unit ले अब के हुने र कुन क्रममा हुने तय गर्छ, तर तुलना आफैं गर्दैन। यो जोडी झन्डै हरेक वर्ष सोधिन्छ।'
    }
  },
  {
    id: 'g9.cf.q14', subject: 'grade9/computer-fundamentals', unit: 'u2',
    topic: 'input-readers', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'An entrance examination uses answer sheets on which candidates shade boxes with a pencil. Which device reads them?',
      ne: 'प्रवेश परीक्षामा विद्यार्थीले पेन्सिलले बाकस कालो पार्ने उत्तरपुस्तिका प्रयोग हुन्छ। ती कसले पढ्छ?'
    },
    options: [
      { en: 'OCR', ne: 'OCR' },
      { en: 'OMR', ne: 'OMR' },
      { en: 'MICR', ne: 'MICR' },
      { en: 'Bar code reader', ne: 'Bar code reader' }
    ],
    answer: 1,
    explanation: {
      en: 'OMR is the Optical MARK Reader. It only needs to detect which box is filled — the position of the mark carries the meaning, so no letter has to be recognised. OCR would be the answer if the machine had to read what was written inside the boxes.',
      ne: 'OMR भनेको Optical MARK Reader हो। कुन बाकस भरिएको छ भेट्टाए पुग्छ — अर्थ चिन्हको ठाउँले बोक्छ, अक्षर चिन्नु पर्दैन। बाकसभित्र लेखिएको पढ्नुपर्ने भए OCR उत्तर हुन्थ्यो।'
    }
  },
  {
    id: 'g9.cf.q15', subject: 'grade9/computer-fundamentals', unit: 'u2',
    topic: 'input-readers', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Why do banks print cheque numbers in magnetic ink rather than ordinary ink?',
      ne: 'बैंकहरूले चेकको नम्बर साधारण मसीको साटो चुम्बकीय मसीमा किन छाप्छन्?'
    },
    options: [
      { en: 'Magnetic ink is cheaper to produce', ne: 'चुम्बकीय मसी सस्तो पर्छ' },
      { en: 'A photocopy of the cheque cannot be read by the machine, so forgery is harder',
        ne: 'चेकको फोटोकपी मेसिनले पढ्न सक्दैन, त्यसैले नक्कल गर्न गाह्रो हुन्छ' },
      { en: 'Magnetic ink can be read in the dark', ne: 'चुम्बकीय मसी अँध्यारोमा पढ्न सकिन्छ' },
      { en: 'It allows the cheque to be scanned in colour', ne: 'चेक रङ्गीन स्क्यान गर्न मिल्छ' }
    ],
    answer: 1,
    explanation: {
      en: 'MICR senses magnetism, not shape. A photocopy reproduces the appearance of the characters perfectly and none of the magnetism, so the reader rejects it. Security is the reason the technology survives even though it is old and expensive.',
      ne: 'MICR ले आकार होइन, चुम्बकत्व पहिचान गर्छ। फोटोकपीले अक्षरको रूप पूरै उतार्छ तर चुम्बकत्व पटक्कै उतार्दैन, त्यसैले reader ले अस्वीकार गर्छ। पुरानो र महँगो भए पनि यो प्रविधि टिकिरहनुको कारण सुरक्षा नै हो।'
    }
  },
  {
    id: 'g9.cf.q16', subject: 'grade9/computer-fundamentals', unit: 'u2',
    topic: 'input-readers', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A school scans a page of a printed book and wants to correct a spelling mistake in the text afterwards. A scanner alone is not enough. What else is needed, and why?',
      ne: 'विद्यालयले छापिएको पुस्तकको पाना स्क्यान गर्छ र पछि पाठको हिज्जे सच्याउन चाहन्छ। Scanner मात्रले पुग्दैन। अरू के चाहिन्छ, र किन?'
    },
    options: [
      { en: 'A bar code reader, because the page has a code on it',
        ne: 'Bar code reader, किनभने पानामा कोड हुन्छ' },
      { en: 'OCR, because the scanner produces a picture and OCR turns the letter shapes in it into editable text',
        ne: 'OCR, किनभने scanner ले तस्बिर बनाउँछ र OCR ले त्यसभित्रका अक्षरको आकारलाई सम्पादनयोग्य पाठ बनाउँछ' },
      { en: 'A printer, because the text must be printed before it can be edited',
        ne: 'Printer, किनभने सम्पादन गर्नुअघि पाठ छाप्नुपर्छ' },
      { en: 'Nothing else — a scanner already produces editable text',
        ne: 'अरू केही चाहिँदैन — scanner ले नै सम्पादनयोग्य पाठ दिन्छ' }
    ],
    answer: 1,
    explanation: {
      en: 'A scanner captures an image of the page. To a computer that image is just coloured dots — you cannot place a cursor in it. OCR examines the shapes in the image, recognises them as characters, and produces text that can be edited. Scanner and OCR are often sold together, which is why students think they are one thing.',
      ne: 'Scanner ले पानाको तस्बिर खिच्छ। कम्प्युटरका लागि त्यो तस्बिर रङका थोप्ला मात्र हो — त्यसमा कर्सर राख्नै मिल्दैन। OCR ले तस्बिरभित्रका आकार केलाएर अक्षर चिन्छ र सम्पादन गर्न मिल्ने पाठ बनाउँछ। Scanner र OCR प्रायः सँगै बेचिने भएकाले विद्यार्थीले एउटै ठान्छन्।'
    }
  },
  {
    id: 'g9.cf.q17', subject: 'grade9/computer-fundamentals', unit: 'u2',
    topic: 'output-classification', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which of these is a hardcopy output device?',
      ne: 'यीमध्ये कुन hardcopy output device हो?'
    },
    options: [
      { en: 'Monitor', ne: 'Monitor' },
      { en: 'Speaker', ne: 'Speaker' },
      { en: 'Graphic plotter', ne: 'Graphic plotter' },
      { en: 'Projector', ne: 'Projector' }
    ],
    answer: 2,
    explanation: {
      en: 'A plotter draws on paper, and paper output you can carry away is hardcopy. Monitor, speaker and projector all produce output that exists only while the device is running, which is softcopy. The plotter is the one students most often put on the wrong side.',
      ne: 'Plotter ले कागजमा कोर्छ, र बोकेर लैजान मिल्ने कागजको आउटपुट hardcopy हो। Monitor, speaker र projector को आउटपुट उपकरण चलेसम्म मात्र रहन्छ — त्यो softcopy। गलत पक्षमा सबैभन्दा धेरै राखिने यही plotter हो।'
    }
  },
  {
    id: 'g9.cf.q18', subject: 'grade9/computer-fundamentals', unit: 'u2',
    topic: 'output-printers', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A shop must print a bill in three copies in a single pass — customer, shop and tax file. Which printer, and what makes it possible?',
      ne: 'पसलले एकै पटकमा तीन प्रति बिल छाप्नुपर्छ — ग्राहक, पसल र कर फाइल। कुन प्रिन्टर, र यो सम्भव बनाउने कुरा के हो?'
    },
    options: [
      { en: 'Laser printer — it is the fastest', ne: 'Laser printer — सबैभन्दा छिटो' },
      { en: 'Inkjet printer — the ink soaks through the paper', ne: 'Inkjet printer — मसी कागज छिचोल्छ' },
      { en: 'Dot-matrix printer — the print head strikes the paper, and the pressure carries through to the sheets below',
        ne: 'Dot-matrix printer — head ले कागजमा ठोक्छ, र त्यो दबाब तलका पानासम्म पुग्छ' },
      { en: '3D printer — it can build several objects at once', ne: '3D printer — एकैपटक धेरै वस्तु बनाउन सक्छ' }
    ],
    answer: 2,
    explanation: {
      en: 'This is the one job where the old noisy technology is the right answer. An IMPACT printer physically strikes the paper, and that pressure presses through carbon sheets underneath. Laser and inkjet are non-impact — nothing touches the page, so sheets two and three stay blank no matter how fast the printer is.',
      ne: 'हल्ला गर्ने पुरानो प्रविधि नै ठिक उत्तर हुने काम यही हो। IMPACT प्रिन्टरले कागजमा भौतिक रूपमै ठोक्छ, र त्यो दबाब तलका कार्बन पानासम्म पुग्छ। Laser र inkjet non-impact हुन् — कागज छुँदै छुँदैनन्, त्यसैले प्रिन्टर जतिसुकै छिटो भए पनि दोस्रो र तेस्रो पाना खाली रहन्छ।'
    }
  },
  {
    id: 'g9.cf.q19', subject: 'grade9/computer-fundamentals', unit: 'u2',
    topic: 'memory-unit', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'How many bytes are there in one kilobyte?',
      ne: 'एक kilobyte मा कति byte हुन्छन्?'
    },
    options: [
      { en: '1000', ne: '१०००' },
      { en: '1024', ne: '१०२४' },
      { en: '512', ne: '५१२' },
      { en: '8', ne: '८' }
    ],
    answer: 1,
    explanation: {
      en: '1 KB = 1024 bytes, because memory addresses are binary and 1024 is 2 to the power 10 — the nearest round number in a system that counts in twos. Writing 1000 is the single most common slip in this unit, and the marker is checking whether you know why it is not 1000.',
      ne: '1 KB = 1024 byte, किनभने मेमोरीका ठेगाना binary मा हुन्छन् र १०२४ भनेको २ को घात १० हो — दुईमा गन्ने प्रणालीको नजिकको पूरा संख्या। यस युनिटमा सबैभन्दा धेरै हुने गल्ती १००० लेख्नु हो, र परीक्षकले १००० किन होइन भन्ने थाहा छ कि छैन जाँचिरहेका हुन्छन्।'
    }
  },
  {
    id: 'g9.cf.q20', subject: 'grade9/computer-fundamentals', unit: 'u2',
    topic: 'microprocessor', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Processor A runs at 2 GHz with a 64-bit word length. Processor B runs at 4 GHz with an 8-bit word length. Both must add eight bytes of data. Which needs fewer clock cycles, and why?',
      ne: 'प्रोसेसर A: 2 GHz, word length 64-bit। प्रोसेसर B: 4 GHz, word length 8-bit। दुवैले आठ byte data जोड्नुपर्छ। कसलाई कम clock cycle चाहिन्छ, र किन?'
    },
    options: [
      { en: 'B, because its clock speed is twice as high', ne: 'B, किनभने यसको clock speed दोब्बर छ' },
      { en: 'A, because 64 bits is 8 bytes, so all eight arrive in one cycle while B needs eight',
        ne: 'A, किनभने ६४ bit = ८ byte, त्यसैले आठै byte एक चक्रमा पुग्छन् भने B लाई आठ चक्र चाहिन्छ' },
      { en: 'Both need the same number of cycles', ne: 'दुवैलाई उत्तिकै चक्र चाहिन्छ' },
      { en: 'It cannot be worked out without knowing the cache size', ne: 'Cache को आकार नजानी भन्न सकिँदैन' }
    ],
    answer: 1,
    explanation: {
      en: 'Word length is how much data moves per cycle; clock speed is how many cycles per second. A 64-bit word is 8 bytes, so A finishes in one cycle. B handles one byte per cycle and needs eight. B does more cycles per second, but it needs eight times as many of them — which is exactly why both numbers are quoted and neither alone tells you how fast a processor is.',
      ne: 'Word length भनेको प्रति चक्र कति data सर्छ; clock speed भनेको प्रति सेकेन्ड कति चक्र। ६४-bit word = ८ byte, त्यसैले A एक चक्रमै सक्छ। B ले प्रति चक्र एक byte चलाउँछ, आठ चक्र चाहिन्छ। B ले सेकेन्डमा बढी चक्र चलाउँछ तर उसलाई आठ गुणा बढी चक्र चाहिन्छ — दुवै संख्या किन भनिन्छ र एक्लैले गति नबताउने कारण यही हो।'
    }
  },

  /* ================= UNIT 3 — Computer Software (9 marks) =================
     The heaviest unit in the subject, so the largest share of the bank. Three
     of the ten are about classifying software, because the antivirus and the
     compiler are where this unit's marks actually go. */
  {
    id: 'g9.cf.q21', subject: 'grade9/computer-fundamentals', unit: 'u3',
    topic: 'software-types', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Antivirus software is best classified as:',
      ne: 'Antivirus सफ्टवेयरलाई कुन वर्गमा राख्नु सबैभन्दा ठिक हुन्छ?'
    },
    options: [
      { en: 'Application software, because the user starts it', ne: 'Application software, किनभने प्रयोगकर्ताले खोल्छ' },
      { en: 'Utility software, because it maintains the computer rather than doing the user’s own task',
        ne: 'Utility software, किनभने यसले प्रयोगकर्ताको आफ्नो काम होइन, कम्प्युटरकै हेरचाह गर्छ' },
      { en: 'An operating system, because it controls the whole machine', ne: 'Operating system, किनभने पूरै मेसिन नियन्त्रण गर्छ' },
      { en: 'A device driver, because it works with the disk', ne: 'Device driver, किनभने डिस्कसँग काम गर्छ' }
    ],
    answer: 1,
    explanation: {
      en: 'The test is who the software serves. Nobody sits down to scan for viruses as a goal in itself — it is maintenance on the machine, which makes it a utility. You do start it like an application, and that is exactly why this question is asked.',
      ne: 'जाँच यही हो — सफ्टवेयरले कसको सेवा गर्छ। भाइरस खोज्नु आफैंमा कसैको उद्देश्य होइन — यो मेसिनकै मर्मत हो, त्यसैले utility। खोल्ने चाहिँ application जस्तै हो, र प्रश्न सोधिनुको कारण पनि त्यही हो।'
    }
  },
  {
    id: 'g9.cf.q22', subject: 'grade9/computer-fundamentals', unit: 'u3',
    topic: 'software-types', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A C compiler translates a student’s program into machine code. Which type of software is it?',
      ne: 'C compiler ले विद्यार्थीको प्रोग्राम machine code मा अनुवाद गर्छ। यो कुन किसिमको सफ्टवेयर हो?'
    },
    options: [
      { en: 'Application software', ne: 'Application software' },
      { en: 'System software', ne: 'System software' },
      { en: 'Utility software', ne: 'Utility software' },
      { en: 'Firmware', ne: 'Firmware' }
    ],
    answer: 1,
    explanation: {
      en: 'Language translators — compiler, interpreter and assembler — are system software. They serve the MACHINE: without the machine code a compiler produces, the processor cannot run the program at all. Being started by a programmer does not change who the software is working for.',
      ne: 'भाषा अनुवादक — compiler, interpreter, assembler — system software हुन्। यिनले मेसिनकै सेवा गर्छन्: compiler ले बनाउने machine code विना प्रोसेसरले प्रोग्राम चलाउनै सक्दैन। प्रोग्रामरले खोल्छ भन्दैमा सफ्टवेयर कसका लागि काम गर्दै छ भन्ने बदलिँदैन।'
    }
  },
  {
    id: 'g9.cf.q23', subject: 'grade9/computer-fundamentals', unit: 'u3',
    topic: 'os-definition', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which statement best defines an operating system?',
      ne: 'Operating system को सबैभन्दा राम्रो परिभाषा कुन हो?'
    },
    options: [
      { en: 'Windows, Linux and macOS', ne: 'Windows, Linux र macOS' },
      { en: 'System software that controls the hardware, manages the computer’s resources and provides an interface between the user and the machine',
        ne: 'हार्डवेयर नियन्त्रण गर्ने, कम्प्युटरका स्रोत व्यवस्थापन गर्ने र प्रयोगकर्ता तथा मेसिनबीच इन्टरफेस दिने system software' },
      { en: 'A program that lets the user type documents', ne: 'प्रयोगकर्तालाई कागजात टाइप गर्न दिने प्रोग्राम' },
      { en: 'The physical parts that make the computer start', ne: 'कम्प्युटर सुरु गराउने भौतिक भाग' }
    ],
    answer: 1,
    explanation: {
      en: 'Option A names three examples, and examples are not a definition — that is the mistake the question is testing. The definition has three parts worth stating: controls hardware, manages resources, provides an interface.',
      ne: 'विकल्प (क) ले तीन उदाहरण दिन्छ, र उदाहरण परिभाषा होइन — प्रश्नले जाँच्न खोजेको गल्ती त्यही हो। परिभाषाका तीन भाग छन्: हार्डवेयर नियन्त्रण, स्रोत व्यवस्थापन, इन्टरफेस।'
    }
  },
  {
    id: 'g9.cf.q24', subject: 'grade9/computer-fundamentals', unit: 'u3',
    topic: 'os-functions', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'On a computer with one processor, a student types a document while music plays. Which operating system function makes both appear to run at once?',
      ne: 'एउटै प्रोसेसर भएको कम्प्युटरमा विद्यार्थीले गीत बजाउँदै कागजात टाइप गर्छ। दुवै एकैचोटि चलेजस्तो कुन OS कार्यले बनाउँछ?'
    },
    options: [
      { en: 'File management', ne: 'File management' },
      { en: 'Process management', ne: 'Process management' },
      { en: 'Device management', ne: 'Device management' },
      { en: 'Security', ne: 'Security' }
    ],
    answer: 1,
    explanation: {
      en: 'One processor runs one instruction at a time. Process management gives each program a slice of processor time and switches between them fast enough that both look continuous. The word for the effect is multitasking, and it is a scheduling job. Memory management is also running, but it is what keeps the two programs apart, not what makes them look simultaneous.',
      ne: 'एउटा प्रोसेसरले एकैपटक एउटै निर्देशन चलाउँछ। Process management ले हरेक प्रोग्रामलाई प्रोसेसरको समयको टुक्रा दिन्छ र यति छिटो फेरिदिन्छ कि दुवै निरन्तर देखिन्छन्। यसको नाम multitasking हो। Memory management पनि चलिरहेको हुन्छ, तर त्यसले दुई प्रोग्रामलाई छुट्याएर राख्छ, एकैचोटि चलेजस्तो बनाउँदैन।'
    }
  },
  {
    id: 'g9.cf.q25', subject: 'grade9/computer-fundamentals', unit: 'u3',
    topic: 'os-types', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'The computer in a hospital patient monitor must respond to a change in heartbeat within a guaranteed time, every time. Which type of operating system does it need?',
      ne: 'अस्पतालको बिरामी मोनिटरको कम्प्युटरले मुटुको धड्कनमा आएको परिवर्तनलाई हरेक पटक तोकिएकै समयभित्र जवाफ दिनुपर्छ। यसलाई कुन किसिमको OS चाहिन्छ?'
    },
    options: [
      { en: 'Batch operating system', ne: 'Batch operating system' },
      { en: 'Multi-user operating system', ne: 'Multi-user operating system' },
      { en: 'Real-time operating system', ne: 'Real-time operating system' },
      { en: 'Single-user, single-tasking operating system', ne: 'Single-user, single-tasking operating system' }
    ],
    answer: 2,
    explanation: {
      en: 'A guaranteed deadline, every time, is the definition of real-time. In this kind of system being late is the same as being wrong — a correct reading delivered two seconds afterwards has not helped the patient. Batch is the opposite: jobs are collected and run when convenient, with nobody waiting.',
      ne: 'हरेक पटक तोकिएकै समयसीमा — यही real-time को परिभाषा हो। यस्तो प्रणालीमा ढिलो हुनु र गलत हुनु उस्तै हो; दुई सेकेन्डपछि आएको सही नतिजाले बिरामीलाई केही गरेन। Batch ठिक उल्टो हो: काम जम्मा गरेर सुविधाअनुसार चलाइन्छ, कोही पर्खेर बस्दैन।'
    }
  },
  {
    id: 'g9.cf.q26', subject: 'grade9/computer-fundamentals', unit: 'u3',
    topic: 'user-interface', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A school must rename 300 photographs, all in the same way. Why is a command-line interface the better choice here?',
      ne: 'विद्यालयले ३०० फोटोको नाम उही तरिकाले फेर्नुपर्छ। यहाँ command-line interface किन उपयुक्त हुन्छ?'
    },
    options: [
      { en: 'Because a CUI looks more professional', ne: 'किनभने CUI बढी व्यावसायिक देखिन्छ' },
      { en: 'Because one command describes the whole pattern and runs once, while a GUI needs roughly four actions per file',
        ne: 'किनभने एउटै आदेशले पूरै बान्की बताउँछ र एक पटक चल्छ, GUI मा प्रति फाइल करिब चार कार्य चाहिन्छ' },
      { en: 'Because a GUI cannot rename files at all', ne: 'किनभने GUI ले फाइलको नाम फेर्नै सक्दैन' },
      { en: 'Because a CUI uses more memory and is therefore faster', ne: 'किनभने CUI ले बढी मेमोरी खान्छ र त्यसैले छिटो हुन्छ' }
    ],
    answer: 1,
    explanation: {
      en: 'Repetitive and identical work is exactly what a command describes well: about 1200 actions in a GUI against one command that can also be saved and reused next year. Note that a GUI wins for renaming ONE file — you can see it and nothing has to be remembered. Neither interface is simply better; they suit different work, which is why both still exist.',
      ne: 'दोहोरिने र उस्तै काम आदेशले राम्ररी बताउँछ: GUI मा करिब १२०० कार्य, CUI मा एउटै आदेश — जुन सुरक्षित गरेर अर्को वर्ष फेरि चलाउन पनि मिल्छ। एउटै फाइलको नाम फेर्न भने GUI जित्छ: देखिन्छ र केही सम्झनै पर्दैन। कुनै एउटा राम्रो होइन; फरक काममा फरक सुहाउँछ, त्यसैले दुवै अझै छन्।'
    }
  },
  {
    id: 'g9.cf.q27', subject: 'grade9/computer-fundamentals', unit: 'u3',
    topic: 'user-interface', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which is an advantage of a GUI over a CUI?',
      ne: 'CUI भन्दा GUI को फाइदा कुन हो?'
    },
    options: [
      { en: 'It uses less memory', ne: 'यसले कम मेमोरी खान्छ' },
      { en: 'Commands can be saved in a file and repeated', ne: 'आदेश फाइलमा राखेर दोहोर्‍याउन मिल्छ' },
      { en: 'The user does not have to memorise commands, because the options are visible on screen',
        ne: 'प्रयोगकर्ताले आदेश सम्झनु पर्दैन, किनभने विकल्प पर्दामै देखिन्छन्' },
      { en: 'It works faster on very old computers', ne: 'धेरै पुराना कम्प्युटरमा छिटो चल्छ' }
    ],
    answer: 2,
    explanation: {
      en: 'Visibility is the GUI’s real advantage — everything available is on the screen, so nothing has to be recalled. The other three options are all advantages of the CUI, which is the half of this comparison students usually leave out.',
      ne: 'देखिनु नै GUI को साँचो फाइदा हो — उपलब्ध सबै पर्दामै हुन्छ, सम्झनै पर्दैन। बाँकी तीनै विकल्प CUI का फाइदा हुन्, र यही आधा भाग विद्यार्थीले प्रायः छुटाउँछन्।'
    }
  },
  {
    id: 'g9.cf.q28', subject: 'grade9/computer-fundamentals', unit: 'u3',
    topic: 'open-source', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'What does it mean to say software is open source?',
      ne: 'सफ्टवेयर open source हो भन्नुको अर्थ के हो?'
    },
    options: [
      { en: 'It is free of charge', ne: 'यो निःशुल्क हुन्छ' },
      { en: 'Its source code is published, so anyone may read, modify and redistribute it',
        ne: 'यसको source code सार्वजनिक हुन्छ, जोसुकैले पढ्न, बदल्न र पुनर्वितरण गर्न सक्छ' },
      { en: 'It can be downloaded from the Internet', ne: 'इन्टरनेटबाट डाउनलोड गर्न मिल्छ' },
      { en: 'It runs on any operating system', ne: 'जुनसुकै OS मा चल्छ' }
    ],
    answer: 1,
    explanation: {
      en: 'Open refers to the SOURCE CODE, not the price. Open source software is usually free of charge, but that is a consequence rather than the definition — it may legally be sold. What may not be done is withhold the code from the people who receive it.',
      ne: 'खुला भनेको source code हो, मूल्य होइन। Open source प्रायः निःशुल्क हुन्छ, तर त्यो परिभाषा होइन परिणाम हो — कानुनी रूपमा बेच्न पाइन्छ। नपाइने कुरा चाहिँ पाउनेबाट code लुकाउनु हो।'
    }
  },
  {
    id: 'g9.cf.q29', subject: 'grade9/computer-fundamentals', unit: 'u3',
    topic: 'open-source', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which of these is NOT open source software?',
      ne: 'यीमध्ये कुन open source सफ्टवेयर होइन?'
    },
    options: [
      { en: 'Linux', ne: 'Linux' },
      { en: 'LibreOffice', ne: 'LibreOffice' },
      { en: 'Microsoft Office', ne: 'Microsoft Office' },
      { en: 'Firefox', ne: 'Firefox' }
    ],
    answer: 2,
    explanation: {
      en: 'Microsoft Office is proprietary: its source code is not published, whether or not you have paid for it. Linux, LibreOffice and Firefox all publish their code. A school choosing the open-source alternatives is not paying a licence fee per computer, and is not breaking the law to avoid one.',
      ne: 'Microsoft Office proprietary हो: पैसा तिरे पनि नतिरे पनि यसको source code सार्वजनिक हुँदैन। Linux, LibreOffice र Firefox ले code सार्वजनिक गर्छन्। Open source छान्ने विद्यालयले प्रति कम्प्युटर लाइसेन्स शुल्क तिर्नु पर्दैन, र त्यो बचाउन कानुन मिच्नु पनि पर्दैन।'
    }
  },
  {
    id: 'g9.cf.q30', subject: 'grade9/computer-fundamentals', unit: 'u3',
    topic: 'software-layers', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Why can a word processor not write directly to the hard disk itself?',
      ne: 'Word processor ले आफैं सिधै hard disk मा किन लेख्न सक्दैन?'
    },
    options: [
      { en: 'Because the hard disk is too slow for application software',
        ne: 'किनभने hard disk application software का लागि धेरै ढिलो छ' },
      { en: 'Because the operating system is the layer that talks to the hardware, and applications ask it to do so on their behalf',
        ne: 'किनभने हार्डवेयरसँग बोल्ने तह OS हो, र application ले त्यही मार्फत अनुरोध गर्छ' },
      { en: 'Because only utility software may touch a disk', ne: 'किनभने डिस्क छुन utility software लाई मात्र पाइन्छ' },
      { en: 'It can — applications read and write disks directly', ne: 'सक्छ — application ले सिधै डिस्कमा पढ्छ र लेख्छ' }
    ],
    answer: 1,
    explanation: {
      en: 'The software stack runs user to application to operating system to hardware, and each layer talks only to the one below it. The operating system is the only software permitted to reach the hardware, which is what "the OS provides an interface" actually means. It also means one program cannot damage another’s files by accident.',
      ne: 'सफ्टवेयरको तह प्रयोगकर्ता → application → OS → हार्डवेयर क्रममा चल्छ, र हरेक तहले तलको एउटासँग मात्र कुरा गर्छ। हार्डवेयरसम्म पुग्न पाउने एक मात्र सफ्टवेयर OS हो — "OS ले इन्टरफेस दिन्छ" भन्नुको साँचो अर्थ यही हो। यसैले एउटा प्रोग्रामले अर्काको फाइल संयोगले बिगार्न पनि सक्दैन।'
    }
  },

  /* ================= UNIT 4 — Memory / Storage (8 marks) ================= */
  {
    id: 'g9.cf.q31', subject: 'grade9/computer-fundamentals', unit: 'u4',
    topic: 'volatility', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A student is typing an essay when the power fails before saving. The essay is lost but last year’s photographs are not. Why?',
      ne: 'विद्यार्थीले निबन्ध टाइप गर्दागर्दै सेभ नगरी बत्ती गयो। निबन्ध हरायो, तर गत वर्षका फोटा हराएनन्। किन?'
    },
    options: [
      { en: 'The essay was too new to be stored properly', ne: 'निबन्ध नयाँ भएकाले राम्ररी राखिएको थिएन' },
      { en: 'The essay was in RAM, which is volatile, while the photographs were in secondary storage, which is not',
        ne: 'निबन्ध volatile RAM मा थियो, फोटा चाहिँ non-volatile secondary storage मा' },
      { en: 'Photographs are smaller files and so are safer', ne: 'फोटो साना फाइल भएकाले सुरक्षित हुन्छन्' },
      { en: 'The hard disk has its own battery', ne: 'Hard disk को आफ्नै ब्याट्री हुन्छ' }
    ],
    answer: 1,
    explanation: {
      en: 'RAM stores each bit as an electrical charge that must be refreshed, so cutting the power empties it — volatile. A hard disk stores each bit as a direction of magnetism and an SSD as a trapped charge; neither needs power to stay put. "Save" is precisely the act of copying from the volatile place to the non-volatile one.',
      ne: 'RAM ले हरेक bit लाई ताजा पार्नुपर्ने विद्युतीय चार्जका रूपमा राख्छ, त्यसैले बत्ती गए रित्तिन्छ — volatile। Hard disk ले चुम्बकत्वको दिशाका रूपमा र SSD ले थुनिएको चार्जका रूपमा राख्छ; दुवैलाई रहन बिजुली चाहिँदैन। "Save" भनेकै volatile ठाउँबाट non-volatile ठाउँमा सार्ने काम हो।'
    }
  },
  {
    id: 'g9.cf.q32', subject: 'grade9/computer-fundamentals', unit: 'u4',
    topic: 'cache', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Why is cache memory used in a computer?',
      ne: 'कम्प्युटरमा cache memory किन प्रयोग गरिन्छ?'
    },
    options: [
      { en: 'To store files permanently when the power is off', ne: 'बत्ती नहुँदा फाइल स्थायी रूपमा राख्न' },
      { en: 'Because the CPU is far faster than RAM, so a small fast memory holding recently used data reduces waiting',
        ne: 'किनभने CPU, RAM भन्दा धेरै छिटो छ — भर्खर चलाएको data राख्ने सानो छिटो मेमोरीले पर्खाइ घटाउँछ' },
      { en: 'To increase the total storage capacity of the computer', ne: 'कम्प्युटरको कुल भण्डारण क्षमता बढाउन' },
      { en: 'To hold the instructions that run when the computer starts', ne: 'कम्प्युटर सुरु हुँदा चल्ने निर्देशन राख्न' }
    ],
    answer: 1,
    explanation: {
      en: 'Cache exists because of a speed mismatch: a CPU can execute an instruction in well under a nanosecond while fetching from RAM takes tens of nanoseconds. Without cache the processor would spend most of its time waiting. Option D describes ROM, not cache.',
      ne: 'Cache हुनुको कारण गतिको बेमेल हो: CPU ले एक निर्देशन नानोसेकेन्डभन्दा कममा सक्छ, तर RAM बाट ल्याउन दसौं नानोसेकेन्ड लाग्छ। Cache नभए प्रोसेसरको धेरैजसो समय पर्खाइमै जान्थ्यो। विकल्प (घ) ले ROM को वर्णन गर्छ, cache को होइन।'
    }
  },
  {
    id: 'g9.cf.q33', subject: 'grade9/computer-fundamentals', unit: 'u4',
    topic: 'ram-types', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'What is the essential difference between SRAM and DRAM?',
      ne: 'SRAM र DRAM बीचको मूल फरक के हो?'
    },
    options: [
      { en: 'SRAM is volatile and DRAM is not', ne: 'SRAM volatile छ, DRAM छैन' },
      { en: 'DRAM stores each bit as a charge in a capacitor that leaks, so it must be refreshed; SRAM holds each bit in a circuit and needs no refreshing',
        ne: 'DRAM ले हरेक bit लाई चुहिने capacitor मा चार्जका रूपमा राख्छ, त्यसैले refresh गर्नुपर्छ; SRAM ले सर्किटमा राख्छ र refresh चाहिँदैन' },
      { en: 'SRAM can be written to and DRAM can only be read', ne: 'SRAM मा लेख्न मिल्छ, DRAM पढ्न मात्र' },
      { en: 'DRAM is used for cache and SRAM for main memory', ne: 'DRAM cache मा र SRAM main memory मा चल्छ' }
    ],
    answer: 1,
    explanation: {
      en: 'Refreshing is the real difference, and everything else follows from it: DRAM is slower because of the refreshing and far cheaper because a capacitor is simpler than a circuit, which is why main memory is DRAM and the small, costly cache is SRAM. Option D has those two the wrong way round. Both are volatile.',
      ne: 'साँचो फरक refresh हो, र बाँकी सबै त्यसैबाट निस्कन्छ: refresh का कारण DRAM ढिलो हुन्छ, र capacitor सर्किटभन्दा सरल भएकाले निकै सस्तो — त्यसैले main memory DRAM र सानो, महँगो cache SRAM हुन्छ। विकल्प (घ) ले दुईलाई उल्टो पारेको छ। दुवै volatile हुन्।'
    }
  },
  {
    id: 'g9.cf.q34', subject: 'grade9/computer-fundamentals', unit: 'u4',
    topic: 'rom-types', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which type of ROM is erased using ultraviolet light?',
      ne: 'कुन किसिमको ROM पराबैजनी किरणले मेटिन्छ?'
    },
    options: [
      { en: 'PROM', ne: 'PROM' },
      { en: 'EPROM', ne: 'EPROM' },
      { en: 'EEPROM', ne: 'EEPROM' },
      { en: 'DRAM', ne: 'DRAM' }
    ],
    answer: 1,
    explanation: {
      en: 'EPROM is Erasable Programmable ROM, and the chip carries a small quartz window for the ultraviolet light to reach the cells. PROM can be written once and never erased; EEPROM is erased electrically, with no window and without removing the chip — which is why flash memory, a development of EEPROM, can be rewritten in place.',
      ne: 'EPROM भनेको Erasable Programmable ROM हो, र पराबैजनी किरण कक्षसम्म पुग्न चिपमा सानो क्वार्ज झ्याल हुन्छ। PROM एक पटक लेखिन्छ, कहिल्यै मेटिँदैन; EEPROM विद्युतीय रूपमा मेटिन्छ — झ्याल नचाहिने, चिप नझिकी — त्यसैले EEPROM कै विकास flash memory ठाउँमै पुनर्लेखन गर्न मिल्छ।'
    }
  },
  {
    id: 'g9.cf.q35', subject: 'grade9/computer-fundamentals', unit: 'u4',
    topic: 'secondary-access', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A student double-clicks a large video stored on the hard disk and there is a short pause before it plays. What is the pause?',
      ne: 'विद्यार्थीले hard disk मा भएको ठूलो भिडियोमा डबल-क्लिक गर्छ र बज्नुअघि केही क्षण रोकिन्छ। त्यो रोकाइ के हो?'
    },
    options: [
      { en: 'The CPU is decoding the whole video before starting', ne: 'CPU ले सुरु गर्नुअघि पूरै भिडियो decode गर्दै छ' },
      { en: 'The file is being copied from the disk into RAM, because the CPU cannot read secondary storage directly',
        ne: 'फाइल disk बाट RAM मा सारिँदै छ, किनभने CPU ले secondary storage सिधै पढ्न सक्दैन' },
      { en: 'The monitor is warming up', ne: 'Monitor तात्दै छ' },
      { en: 'The operating system is checking the file for viruses', ne: 'OS ले फाइलमा भाइरस जाँच्दै छ' }
    ],
    answer: 1,
    explanation: {
      en: 'The CPU can only work on what is in primary memory, so part of the file must be copied from the slow mechanical disk into fast electronic RAM first. That copy is the slowest link in the chain and it is what you are waiting for. This is also why fitting an SSD makes an old computer feel new while a faster processor often does not — the wait was never the CPU.',
      ne: 'CPU ले primary memory मा भएको कुरामा मात्र काम गर्न सक्छ, त्यसैले फाइलको केही भाग ढिलो यान्त्रिक डिस्कबाट छिटो विद्युतीय RAM मा पहिले सार्नुपर्छ। त्यही सार्ने काम शृंखलाको सबैभन्दा ढिलो कडी हो र तपाईं त्यसैलाई पर्खिरहनुभएको हुन्छ। पुरानो कम्प्युटरमा SSD हाल्दा नयाँ जस्तो हुनु तर छिटो प्रोसेसरले प्रायः फरक नपर्नुको कारण पनि यही हो।'
    }
  },
  {
    id: 'g9.cf.q36', subject: 'grade9/computer-fundamentals', unit: 'u4',
    topic: 'storage-families', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A CD and a DVD store data by which physical method?',
      ne: 'CD र DVD ले कुन भौतिक तरिकाले data राख्छन्?'
    },
    options: [
      { en: 'Direction of magnetism on a coated surface', ne: 'लेपित सतहमा चुम्बकत्वको दिशा' },
      { en: 'Pits and flat areas burned into a surface and read by a laser',
        ne: 'सतहमा पोलिएका खाल्डा र समथर भाग, लेजरले पढिने' },
      { en: 'Charge trapped in insulated cells', ne: 'इन्सुलेट कक्षमा थुनिएको चार्ज' },
      { en: 'Holes punched through card', ne: 'कार्डमा पारेका प्वाल' }
    ],
    answer: 1,
    explanation: {
      en: 'Optical storage: a laser burns pits, and reading detects whether light reflects from a pit or a flat area. Magnetism is the hard disk, trapped charge is flash memory such as a pen drive. The three families are told apart by exactly this — how a single bit is physically held.',
      ne: 'Optical storage: लेजरले खाल्डा पोल्छ, र पढ्दा प्रकाश खाल्डाबाट फर्कियो कि समथर भागबाट भनेर थाहा पाइन्छ। चुम्बकत्व hard disk को, थुनिएको चार्ज pen drive जस्ता flash memory को। तीन परिवार छुट्याउने आधार यही हो — एउटा bit भौतिक रूपमा कसरी राखिन्छ।'
    }
  },
  {
    id: 'g9.cf.q37', subject: 'grade9/computer-fundamentals', unit: 'u4',
    topic: 'hierarchy', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Arrange these from fastest to slowest: RAM, registers, hard disk, cache.',
      ne: 'यिनलाई सबैभन्दा छिटोदेखि ढिलोसम्म मिलाउनुहोस्: RAM, register, hard disk, cache।'
    },
    options: [
      { en: 'Registers, cache, RAM, hard disk', ne: 'Register, cache, RAM, hard disk' },
      { en: 'Cache, registers, RAM, hard disk', ne: 'Cache, register, RAM, hard disk' },
      { en: 'RAM, cache, registers, hard disk', ne: 'RAM, cache, register, hard disk' },
      { en: 'Registers, RAM, cache, hard disk', ne: 'Register, RAM, cache, hard disk' }
    ],
    answer: 0,
    explanation: {
      en: 'The hierarchy runs registers, cache, RAM, secondary storage — closest to the CPU is fastest, smallest and costliest per byte. The common error is placing cache below RAM; cache sits between the CPU and RAM precisely because it is faster than RAM.',
      ne: 'तह यसरी चल्छ: register, cache, RAM, secondary storage — CPU सँग जति नजिक, त्यति छिटो, सानो र प्रति byte महँगो। सामान्य गल्ती cache लाई RAM भन्दा तल राख्नु हो; cache, RAM भन्दा छिटो भएकैले CPU र RAM बीचमा बस्छ।'
    }
  },
  {
    id: 'g9.cf.q38', subject: 'grade9/computer-fundamentals', unit: 'u4',
    topic: 'rom-purpose', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Why must the instructions that run the moment a computer is switched on be stored in ROM rather than on the hard disk?',
      ne: 'कम्प्युटर खोल्ने बित्तिकै चल्ने निर्देशन hard disk मा होइन, ROM मा किन राख्नुपर्छ?'
    },
    options: [
      { en: 'Because ROM is faster than a hard disk', ne: 'किनभने ROM, hard disk भन्दा छिटो छ' },
      { en: 'Because at that moment nothing yet knows how to read a disk, and ROM keeps its contents without power',
        ne: 'किनभने त्यो बेला डिस्क कसरी पढ्ने भन्नै कसैलाई थाहा हुँदैन, र ROM ले बत्तीविनै सामग्री राख्छ' },
      { en: 'Because the hard disk is always full', ne: 'किनभने hard disk सधैं भरिएको हुन्छ' },
      { en: 'Because ROM can be rewritten easily', ne: 'किनभने ROM सजिलै पुनर्लेखन गर्न मिल्छ' }
    ],
    answer: 1,
    explanation: {
      en: 'Two conditions must both hold at startup: the contents must have survived the power being off, which rules out RAM, and they must be reachable before any disk driver has loaded, which rules out the disk. Only non-volatile memory on the board itself satisfies both, and that is ROM holding the BIOS.',
      ne: 'सुरु हुँदा दुवै सर्त पूरा हुनुपर्छ: बत्ती बन्द हुँदा पनि सामग्री बाँचेको हुनुपर्‍यो — यसले RAM हटाउँछ; र कुनै disk driver लोड हुनुअघि नै पुग्न सकिनुपर्‍यो — यसले disk हटाउँछ। दुवै पूरा गर्ने भनेको बोर्डमै भएको non-volatile मेमोरी हो, अर्थात् BIOS बोक्ने ROM।'
    }
  },
  {
    id: 'g9.cf.q39', subject: 'grade9/computer-fundamentals', unit: 'u4',
    topic: 'units', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'How many bits are there in one byte?',
      ne: 'एक byte मा कति bit हुन्छन्?'
    },
    options: [
      { en: '4', ne: '४' },
      { en: '8', ne: '८' },
      { en: '16', ne: '१६' },
      { en: '1024', ne: '१०२४' }
    ],
    answer: 1,
    explanation: {
      en: 'One byte is 8 bits, and one byte holds roughly one character. Do not confuse this with 1 KB = 1024 bytes — the 8 and the 1024 are different relationships and both are asked.',
      ne: 'एक byte = ८ bit, र एक byte ले लगभग एक अक्षर राख्छ। यसलाई 1 KB = 1024 byte सँग नमिसाउनुहोस् — ८ र १०२४ फरक सम्बन्ध हुन् र दुवै सोधिन्छन्।'
    }
  },

  /* ================= UNIT 5 — Internet and its Application (8 marks) ======= */
  {
    id: 'g9.cf.q40', subject: 'grade9/computer-fundamentals', unit: 'u5',
    topic: 'internet-vs-web', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which statement about the Internet and the World Wide Web is correct?',
      ne: 'इन्टरनेट र World Wide Web बारे कुन कथन ठिक छ?'
    },
    options: [
      { en: 'They are two names for the same thing', ne: 'दुवै एउटै कुराका दुई नाम हुन्' },
      { en: 'The Internet is the network of networks; the Web is one service that runs on it',
        ne: 'इन्टरनेट नेटवर्कहरूको नेटवर्क हो; वेब त्यसमाथि चल्ने एउटा सेवा हो' },
      { en: 'The Web is the network and the Internet is the collection of websites',
        ne: 'वेब नेटवर्क हो र इन्टरनेट वेबसाइटहरूको संग्रह' },
      { en: 'E-mail is part of the Web', ne: 'इमेल वेबको भाग हो' }
    ],
    answer: 1,
    explanation: {
      en: 'The Internet is the connection itself — cables, routers and the agreement on how a message is addressed. The Web is pages joined by links and read with a browser, and it is only one of the services the Internet carries; e-mail and file transfer are others. Defining the Internet as "a collection of websites" describes one service and calls it the whole network.',
      ne: 'इन्टरनेट भनेको जडान आफैं हो — तार, राउटर र सन्देशको ठेगाना कसरी लेख्ने भन्ने सहमति। वेब भनेको लिंकले जोडिएका र browser ले पढिने पृष्ठ, र यो इन्टरनेटले बोक्ने धेरै सेवामध्ये एउटा मात्र हो; इमेल र file transfer अरू हुन्। "वेबसाइटहरूको संग्रह" भन्नु एउटा सेवालाई पूरै नेटवर्क भन्नु हो।'
    }
  },
  {
    id: 'g9.cf.q41', subject: 'grade9/computer-fundamentals', unit: 'u5',
    topic: 'modem', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'What does a modem do, and what does its name stand for?',
      ne: 'Modem ले के गर्छ, र यसको नामको अर्थ के हो?'
    },
    options: [
      { en: 'Modern Memory — it stores the connection settings', ne: 'Modern Memory — जडानका सेटिङ राख्छ' },
      { en: 'MOdulator-DEModulator — it converts the computer’s digital signal for the line, and the arriving signal back to digital',
        ne: 'MOdulator-DEModulator — कम्प्युटरको digital सङ्केत लाइनका लागि बदल्छ र आउने सङ्केत फेरि digital बनाउँछ' },
      { en: 'Mobile Demand — it requests data from the ISP', ne: 'Mobile Demand — ISP सँग data माग्छ' },
      { en: 'It amplifies the signal so it can travel further', ne: 'सङ्केत टाढासम्म जान सकोस् भनेर बढाउँछ' }
    ],
    answer: 1,
    explanation: {
      en: 'The name is the answer. Modulating turns the computer’s digital output into something the line can carry; demodulating turns the arriving signal back into digital. It is a translator and it must work in both directions. Note that amplifying is a different job done by a different device.',
      ne: 'नाम नै उत्तर हो। Modulate गर्नु भनेको कम्प्युटरको digital आउटपुटलाई लाइनले बोक्न सक्ने रूपमा बदल्नु; demodulate भनेको आउने सङ्केतलाई फेरि digital बनाउनु। यो अनुवादक हो र दुवै दिशामा काम गर्नैपर्छ। सङ्केत बढाउने काम फरक हो र त्यो अर्कै उपकरणले गर्छ।'
    }
  },
  {
    id: 'g9.cf.q42', subject: 'grade9/computer-fundamentals', unit: 'u5',
    topic: 'requirements', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which of these is NOT required to connect a home computer to the Internet?',
      ne: 'घरको कम्प्युटरलाई इन्टरनेटमा जोड्न यीमध्ये कुन चाहिँदैन?'
    },
    options: [
      { en: 'A modem or router', ne: 'Modem वा router' },
      { en: 'An account with an Internet Service Provider', ne: 'ISP को खाता' },
      { en: 'A printer', ne: 'Printer' },
      { en: 'A transmission line such as telephone, fibre or wireless',
        ne: 'टेलिफोन, फाइबर वा वायरलेस जस्तो प्रसारण लाइन' }
    ],
    answer: 2,
    explanation: {
      en: 'A printer is an output device and has nothing to do with connecting. The requirements group into hardware (device, modem or router, line), software (TCP/IP and a browser) and a service (the ISP account) — and every one of those is required, which is why the ISP is the item most often forgotten.',
      ne: 'Printer output device हो, जडानसँग कुनै सम्बन्ध छैन। आवश्यकता हार्डवेयर (उपकरण, modem/router, लाइन), सफ्टवेयर (TCP/IP र browser) र सेवा (ISP खाता) मा बाँडिन्छ — र हरेक अनिवार्य छ। सबैभन्दा धेरै छुट्ने ISP नै हो।'
    }
  },
  {
    id: 'g9.cf.q43', subject: 'grade9/computer-fundamentals', unit: 'u5',
    topic: 'services', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Paying your land revenue to the municipality through its website is an example of:',
      ne: 'नगरपालिकाको वेबसाइटबाट मालपोत तिर्नु कुनको उदाहरण हो?'
    },
    options: [
      { en: 'E-commerce', ne: 'E-commerce' },
      { en: 'E-governance', ne: 'E-governance' },
      { en: 'Telnet', ne: 'Telnet' },
      { en: 'Newsgroup', ne: 'Newsgroup' }
    ],
    answer: 1,
    explanation: {
      en: 'A government service delivered online is e-governance. Money changing hands makes e-commerce tempting, but e-commerce is buying and selling between a customer and a business — not paying the state what you owe it. Nepali examples of e-governance: online PAN registration, passport applications, result publication.',
      ne: 'सरकारी सेवा अनलाइन दिनु e-governance हो। पैसा सर्ने भएकाले e-commerce लोभ्याउँछ, तर e-commerce भनेको ग्राहक र व्यवसायबीचको किनबेच हो — राज्यलाई तिर्नुपर्ने तिर्नु होइन। नेपालका उदाहरण: अनलाइन PAN दर्ता, राहदानी आवेदन, नतिजा प्रकाशन।'
    }
  },
  {
    id: 'g9.cf.q44', subject: 'grade9/computer-fundamentals', unit: 'u5',
    topic: 'services', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A technician in Pokhara takes over the full desktop of a faulty computer in Butwal to repair it. Which service is this, and how does it differ from Telnet?',
      ne: 'पोखराको प्राविधिकले बुटवलको बिग्रेको कम्प्युटरको पूरै डेस्कटप नियन्त्रणमा लिएर मर्मत गर्छ। यो कुन सेवा हो, र Telnet भन्दा कसरी फरक छ?'
    },
    options: [
      { en: 'Telnet — both give the same kind of access', ne: 'Telnet — दुवैले उस्तै पहुँच दिन्छन्' },
      { en: 'Remote control — it gives the whole desktop as a picture, whereas Telnet gives a text command line',
        ne: 'Remote control — यसले पूरै डेस्कटप तस्बिरका रूपमा दिन्छ, Telnet ले पाठको command line' },
      { en: 'E-mail — the screen is sent as an attachment', ne: 'E-mail — पर्दा attachment बनेर जान्छ' },
      { en: 'IRC — the two computers chat with each other', ne: 'IRC — दुई कम्प्युटर आपसमा कुरा गर्छन्' }
    ],
    answer: 1,
    explanation: {
      en: 'Both let you use a distant machine, and that is why they are confused. The difference is what you get: Telnet gives a text command line on the far computer, remote control gives its whole graphical desktop. Telnet is also old and insecure, because it sends passwords without encryption.',
      ne: 'दुवैले टाढाको मेसिन चलाउन दिन्छन्, त्यसैले अलमल हुन्छ। फरक के पाइन्छ भन्नेमा छ: Telnet ले पारिको कम्प्युटरमा पाठको command line दिन्छ, remote control ले पूरै ग्राफिकल डेस्कटप। Telnet पुरानो र असुरक्षित पनि छ, किनभने पासवर्ड नलुकाई पठाउँछ।'
    }
  },
  {
    id: 'g9.cf.q45', subject: 'grade9/computer-fundamentals', unit: 'u5',
    topic: 'disadvantages', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A question asks for the advantages AND disadvantages of the Internet. Which of these is a genuine disadvantage?',
      ne: 'प्रश्नले इन्टरनेटका फाइदा र बेफाइदा दुवै सोध्छ। यीमध्ये कुन साँचो बेफाइदा हो?'
    },
    options: [
      { en: 'It allows communication over long distances', ne: 'टाढासम्म सञ्चार गर्न दिन्छ' },
      { en: 'False information can be spread and presented as fact', ne: 'झूटो सूचना तथ्य जस्तो देखाएर फैलाउन सकिन्छ' },
      { en: 'It provides access to online learning', ne: 'अनलाइन सिकाइमा पहुँच दिन्छ' },
      { en: 'It makes government services available online', ne: 'सरकारी सेवा अनलाइन उपलब्ध गराउँछ' }
    ],
    answer: 1,
    explanation: {
      en: 'The other three are advantages. Real disadvantages include false information, fraud and theft of money or identity, viruses, loss of privacy, wasted time and content unsuitable for children. A four-mark answer that lists only advantages has answered half the question, and this is one of the commonest ways marks are lost in this unit.',
      ne: 'बाँकी तीन फाइदा हुन्। साँचो बेफाइदामा पर्छन्: झूटो सूचना, ठगी र पैसा/परिचयको चोरी, भाइरस, गोपनीयताको क्षति, समय खेर जानु, र बालबालिकालाई नसुहाउने सामग्री। फाइदा मात्र लेख्ने ४ अंकको उत्तरले आधा प्रश्नको जवाफ दिएको हुन्छ, र यस युनिटमा अंक गुम्ने सबैभन्दा सामान्य तरिका यही हो।'
    }
  },
  {
    id: 'g9.cf.q46', subject: 'grade9/computer-fundamentals', unit: 'u5',
    topic: 'services', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which service lets you send a written message to one person, who reads it whenever they next look, even if they are offline now?',
      ne: 'अहिले अफलाइन भए पनि पछि हेर्दा पढ्न मिल्ने गरी एक जनालाई लिखित सन्देश पठाउन कुन सेवाले दिन्छ?'
    },
    options: [
      { en: 'IRC', ne: 'IRC' },
      { en: 'E-mail', ne: 'E-mail' },
      { en: 'Newsgroup', ne: 'Newsgroup' },
      { en: 'Search engine', ne: 'Search engine' }
    ],
    answer: 1,
    explanation: {
      en: 'E-mail is store-and-forward: the message waits at an address until the recipient looks. IRC is live typed conversation needing both people present at once; a newsgroup posts to everybody rather than to one named person. The giveaway here is "one person" plus "even if they are offline".',
      ne: 'E-mail store-and-forward हो: सन्देश ठेगानामा पर्खिरहन्छ, प्रापकले हेरेपछि पढिन्छ। IRC मा दुवै एकैपटक चाहिन्छ; newsgroup ले एक जनालाई होइन सबैलाई पठाउँछ। सुराक "एक जना" र "अफलाइन भए पनि" मा छ।'
    }
  },
  {
    id: 'g9.cf.q47', subject: 'grade9/computer-fundamentals', unit: 'u5',
    topic: 'services', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Without which service would the World Wide Web be almost unusable, because no one could find a page among billions?',
      ne: 'कुन सेवाविना अर्बौं पृष्ठमध्ये कुनै भेट्टाउनै नसकिने भएर World Wide Web झन्डै अनुपयोगी हुन्थ्यो?'
    },
    options: [
      { en: 'Telnet', ne: 'Telnet' },
      { en: 'A search engine', ne: 'Search engine' },
      { en: 'E-commerce', ne: 'E-commerce' },
      { en: 'Remote control', ne: 'Remote control' }
    ],
    answer: 1,
    explanation: {
      en: 'A search engine indexes pages and finds the ones matching your words. Without one you would have to know a page’s address before you could reach it, which makes a network of billions of pages useless to anybody who does not already know what is on it.',
      ne: 'Search engine ले पृष्ठको सूची बनाएर तपाईंका शब्दसँग मिल्ने खोज्छ। यो नभए पृष्ठको ठेगाना पहिल्यै थाहा हुनुपर्थ्यो, र अर्बौं पृष्ठको नेटवर्क त्यहाँ के छ थाहा नभएकाका लागि बेकामको हुन्थ्यो।'
    }
  },

  /* ================= UNIT 6 — Multimedia (6 marks) ================= */
  {
    id: 'g9.cf.q48', subject: 'grade9/computer-fundamentals', unit: 'u6',
    topic: 'definition', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which of these is multimedia?',
      ne: 'यीमध्ये कुन मल्टिमिडिया हो?'
    },
    options: [
      { en: 'A page containing only printed text', ne: 'केवल छापिएको पाठ भएको पाना' },
      { en: 'A single photograph on its own', ne: 'एक्लै राखिएको एउटा फोटो' },
      { en: 'A lesson combining text, a diagram, narration and a clip you can replay',
        ne: 'पाठ, चित्र, स्वर र फेरि बजाउन मिल्ने क्लिप मिलेको पाठ' },
      { en: 'A recorded song with nothing else', ne: 'अरू केही नभएको रेकर्ड गरिएको गीत' }
    ],
    answer: 2,
    explanation: {
      en: 'Multi means more than one. A single medium — text alone, one photograph, one song — is not multimedia however good it is. Option C combines four media and adds interactivity through replay, which most definitions also require.',
      ne: 'Multi भनेको एकभन्दा बढी। एउटै माध्यम — केवल पाठ, एउटा फोटो, एउटा गीत — जतिसुकै राम्रो भए पनि मल्टिमिडिया होइन। विकल्प (ग) ले चार माध्यम मिलाउँछ र फेरि बजाउन दिएर अन्तरक्रिया पनि थप्छ, जुन धेरै परिभाषाले खोज्छन्।'
    }
  },
  {
    id: 'g9.cf.q49', subject: 'grade9/computer-fundamentals', unit: 'u6',
    topic: 'components', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A bar chart on a slide grows upward as the presenter clicks, drawn by the software itself. Which component of multimedia is it?',
      ne: 'स्लाइडको बार चार्ट प्रस्तुतकर्ताले क्लिक गर्दा माथितिर बढ्छ, र त्यो सफ्टवेयरले आफैं कोरेको हो। यो मल्टिमिडियाको कुन भाग हो?'
    },
    options: [
      { en: 'Image, because a chart is a picture', ne: 'Image, किनभने चार्ट तस्बिर हो' },
      { en: 'Animation, because it changes over time and the frames are computer-generated',
        ne: 'Animation, किनभने यो समयसँगै बदलिन्छ र फ्रेम कम्प्युटरले बनाएका हुन्' },
      { en: 'Video, because it moves', ne: 'Video, किनभने यो चल्छ' },
      { en: 'Text, because it displays numbers', ne: 'Text, किनभने संख्या देखाउँछ' }
    ],
    answer: 1,
    explanation: {
      en: 'A static chart would be an image, but this one changes over time, and the frames are generated rather than filmed. Movement plus created equals animation. It is not video because nothing was recorded by a camera. This is the case most often answered "image".',
      ne: 'स्थिर चार्ट भए image हुन्थ्यो, तर यो समयसँगै बदलिन्छ र फ्रेम खिचिएका होइनन्, बनाइएका हुन्। चाल + बनाइएको = animation। क्यामेराले केही रेकर्ड नगरेकाले video होइन। "image" भनेर सबैभन्दा धेरै गलत हुने केस यही हो।'
    }
  },
  {
    id: 'g9.cf.q50', subject: 'grade9/computer-fundamentals', unit: 'u6',
    topic: 'components', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'What is the essential difference between animation and video?',
      ne: 'Animation र video बीचको मूल फरक के हो?'
    },
    options: [
      { en: 'Animation is in colour and video is not', ne: 'Animation रङ्गीन हुन्छ, video हुँदैन' },
      { en: 'Video is recorded from real events by a camera; animation is created frame by frame and never happened in front of a camera',
        ne: 'Video क्यामेराले वास्तविक घटनाबाट रेकर्ड गर्छ; animation फ्रेम–फ्रेम बनाइन्छ र क्यामेरा अगाडि कहिल्यै भएकै हुँदैन' },
      { en: 'Animation always has sound and video does not', ne: 'Animation मा सधैं आवाज हुन्छ, video मा हुँदैन' },
      { en: 'Video files are smaller than animation files', ne: 'Video फाइल animation भन्दा सानो हुन्छ' }
    ],
    answer: 1,
    explanation: {
      en: 'The difference is the source of the frames: recorded versus created. A cartoon is animation even though it moves convincingly; a film of a cartoonist at work is video. Colour and sound are not the test — both can have either.',
      ne: 'फरक फ्रेम कहाँबाट आयो भन्नेमा छ: रेकर्ड गरिएको कि बनाइएको। कार्टुन विश्वसनीय रूपमा चले पनि animation हो; कार्टुनिस्टले काम गरेको फिल्म video। रङ र आवाज जाँच होइनन् — दुवैमा दुवै हुन सक्छ।'
    }
  },
  {
    id: 'g9.cf.q51', subject: 'grade9/computer-fundamentals', unit: 'u6',
    topic: 'formats', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which file format is an audio format?',
      ne: 'कुन फाइल ढाँचा audio ढाँचा हो?'
    },
    options: [
      { en: '.mp4', ne: '.mp4' },
      { en: '.mp3', ne: '.mp3' },
      { en: '.jpg', ne: '.jpg' },
      { en: '.txt', ne: '.txt' }
    ],
    answer: 1,
    explanation: {
      en: '.mp3 is audio and .mp4 is video — the digits are not decoration, and swapping them is a common slip. .jpg is an image and .txt is text.',
      ne: '.mp3 audio र .mp4 video हो — अंक सजावट होइनन्, र यी साट्नु सामान्य गल्ती हो। .jpg image, .txt text।'
    }
  },
  {
    id: 'g9.cf.q52', subject: 'grade9/computer-fundamentals', unit: 'u6',
    topic: 'file-size', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Why is a one-minute video file thousands of times larger than a one-page essay on the same subject?',
      ne: 'उही विषयको एक पानाको निबन्धभन्दा एक मिनेटको भिडियो फाइल हजारौं गुणा किन ठूलो हुन्छ?'
    },
    options: [
      { en: 'Because the video contains more information about the subject',
        ne: 'किनभने भिडियोमा विषयबारे बढी जानकारी हुन्छ' },
      { en: 'Because a minute of video is roughly 1,500 separate images plus sound, and one image already stores a colour value for every pixel',
        ne: 'किनभने एक मिनेट भिडियो झन्डै १,५०० छुट्टाछुट्टै तस्बिर र आवाज हो, र एउटै तस्बिरले हरेक pixel को रङ मान राख्छ' },
      { en: 'Because video files are stored inefficiently', ne: 'किनभने भिडियो फाइल अदक्ष तरिकाले राखिन्छ' },
      { en: 'Because video must be stored twice for safety', ne: 'किनभने सुरक्षाका लागि भिडियो दुई पटक राख्नुपर्छ' }
    ],
    answer: 1,
    explanation: {
      en: 'Video runs at around 25 to 30 frames per second. Text stores one byte per character; an image stores colour values for every pixel, which is already hundreds of times more. Option A is wrong in an interesting way: file size measures data, not meaning — a page of text can carry an idea an hour of video does not. This is also why multimedia needs compression, and why a school on a slow connection downloads notes easily and video with difficulty.',
      ne: 'भिडियो प्रति सेकेन्ड करिब २५–३० फ्रेममा चल्छ। पाठले प्रति अक्षर एक byte राख्छ; तस्बिरले हरेक pixel को रङ मान राख्छ, जुन पहिल्यै सयौं गुणा बढी हो। विकल्प (क) रोचक किसिमले गलत छ: फाइलको आकारले data नाप्छ, अर्थ होइन। त्यसैले मल्टिमिडियालाई compression चाहिन्छ, र ढिलो जडान भएको विद्यालयले नोट सजिलै तर भिडियो गाह्रोसँग डाउनलोड गर्छ।'
    }
  },
  {
    id: 'g9.cf.q53', subject: 'grade9/computer-fundamentals', unit: 'u6',
    topic: 'components', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which component of multimedia is most often left out when students list them?',
      ne: 'विद्यार्थीले सूची बनाउँदा मल्टिमिडियाको कुन भाग सबैभन्दा धेरै छुटाउँछन्?'
    },
    options: [
      { en: 'Video', ne: 'Video' },
      { en: 'Text', ne: 'Text' },
      { en: 'Audio', ne: 'Audio' },
      { en: 'Animation', ne: 'Animation' }
    ],
    answer: 1,
    explanation: {
      en: 'Text. It is the oldest component and the least exciting, so it is the one dropped — and the question asks for all five: text, audio, video, image and animation. Text is also the only component that carries an exact figure, such as a mountain’s height, without ambiguity.',
      ne: 'Text। सबैभन्दा पुरानो र कम आकर्षक भएकाले यही छुट्छ — तर प्रश्नले पाँचै खोज्छ: text, audio, video, image, animation। ठ्याक्कै संख्या, जस्तै हिमालको उचाइ, अन्योलबिना बोक्ने एक मात्र भाग पनि text नै हो।'
    }
  },
  {
    id: 'g9.cf.q54', subject: 'grade9/computer-fundamentals', unit: 'u6',
    topic: 'applications', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A surgeon practises an operation on a computer simulation before performing it on a patient. This is multimedia used in:',
      ne: 'शल्यचिकित्सकले बिरामीमा गर्नुअघि कम्प्युटर सिमुलेसनमा अभ्यास गर्छन्। यो मल्टिमिडियाको कुन क्षेत्रमा प्रयोग हो?'
    },
    options: [
      { en: 'Entertainment', ne: 'मनोरञ्जन' },
      { en: 'Medicine', ne: 'चिकित्सा' },
      { en: 'Advertising', ne: 'विज्ञापन' },
      { en: 'E-governance', ne: 'E-governance' }
    ],
    answer: 1,
    explanation: {
      en: 'Medicine — scan images, animated anatomy and surgical simulators are all standard multimedia applications in that field. The argument for multimedia here is the same as everywhere: a description alone would leave out the shape and the movement, which are exactly what the surgeon needs to rehearse.',
      ne: 'चिकित्सा — स्क्यानका तस्बिर, चल्ने शरीर रचना र शल्यक्रिया सिमुलेटर सबै त्यस क्षेत्रका मानक प्रयोग हुन्। यहाँ मल्टिमिडियाको तर्क अन्यत्रकै जस्तै हो: वर्णनले आकार र चाल छुटाउँछ, र शल्यचिकित्सकलाई अभ्यास चाहिने तिनै हुन्।'
    }
  },

  /* ================= UNIT 7 — Emerging Technology (6 marks) ================= */
  {
    id: 'g9.cf.q55', subject: 'grade9/computer-fundamentals', unit: 'u7',
    topic: 'cloud-vs-distributed', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A weather office splits one forecast calculation across forty of its own computers so it finishes by morning. This is:',
      ne: 'मौसम विभागले एउटै पूर्वानुमानको गणना आफ्नै चालीस कम्प्युटरमा बाँडेर बिहानसम्म सक्छ। यो हो:'
    },
    options: [
      { en: 'Cloud computing, because many computers are involved', ne: 'Cloud computing, किनभने धेरै कम्प्युटर छन्' },
      { en: 'Distributed computing, because one task is shared among many computers working together',
        ne: 'Distributed computing, किनभने एउटै काम धेरै कम्प्युटरले सँगै बाँड्छन्' },
      { en: 'Big data, because the calculation is large', ne: 'Big data, किनभने गणना ठूलो छ' },
      { en: 'IoT, because the computers are networked', ne: 'IoT, किनभने कम्प्युटर नेटवर्कमा छन्' }
    ],
    answer: 1,
    explanation: {
      en: 'Cloud computing is about WHOSE computer — renting someone else’s over the Internet. Distributed computing is about HOW MANY computers share one task. Here all forty belong to the weather office itself, so ownership is not the point; sharing the work is. They are not opposites, and a cloud service may well be distributed underneath.',
      ne: 'Cloud computing कम्प्युटर कसको भन्ने कुरा हो — इन्टरनेटमार्फत अर्कैको भाडामा लिनु। Distributed computing एउटै काम कतिवटा कम्प्युटरले बाँड्छन् भन्ने। यहाँ चालीसै मेसिन मौसम विभागकै हुन्, त्यसैले स्वामित्व होइन, काम बाँड्नु मुख्य कुरा हो। यी उल्टा होइनन्, र cloud सेवा भित्री रूपमा distributed हुन सक्छ।'
    }
  },
  {
    id: 'g9.cf.q56', subject: 'grade9/computer-fundamentals', unit: 'u7',
    topic: 'iot', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which of these is an Internet of Things device?',
      ne: 'यीमध्ये कुन Internet of Things उपकरण हो?'
    },
    options: [
      { en: 'A laptop connected to Wi-Fi', ne: 'Wi-Fi मा जोडिएको ल्यापटप' },
      { en: 'A water tank with a level sensor that messages the owner when it runs low',
        ne: 'पानी घट्दा मालिकलाई सन्देश पठाउने लेभल सेन्सर भएको ट्यांकी' },
      { en: 'A desktop computer in a school lab', ne: 'विद्यालय ल्याबको डेस्कटप कम्प्युटर' },
      { en: 'A printer attached by cable to one computer', ne: 'एउटै कम्प्युटरमा तारले जोडिएको प्रिन्टर' }
    ],
    answer: 1,
    explanation: {
      en: 'The test has two parts: it must be a thing that is NOT a computer, and it must be on the network. A water tank is not a computer, so adding a sensor and a connection makes it IoT. A laptop on Wi-Fi fails the first part — it was already a computer.',
      ne: 'जाँचका दुई भाग छन्: त्यो कम्प्युटर नभएको वस्तु हुनुपर्छ, र नेटवर्कमा हुनुपर्छ। पानीको ट्यांकी कम्प्युटर होइन, त्यसैले सेन्सर र जडान थपेपछि IoT बन्छ। Wi-Fi मा जोडिएको ल्यापटप पहिलो भागमै असफल हुन्छ — त्यो त पहिल्यै कम्प्युटर थियो।'
    }
  },
  {
    id: 'g9.cf.q57', subject: 'grade9/computer-fundamentals', unit: 'u7',
    topic: 'bigdata-vs-mining', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A telecom company examines years of call records and discovers which customers are likely to leave. Which term describes what the company DID?',
      ne: 'टेलिकम कम्पनीले वर्षौंका कल रेकर्ड केलाएर कुन ग्राहक छाड्न लागेका छन् पत्ता लगाउँछ। कम्पनीले गरेको कामलाई के भनिन्छ?'
    },
    options: [
      { en: 'Big data', ne: 'Big data' },
      { en: 'Data mining', ne: 'Data mining' },
      { en: 'Cloud computing', ne: 'Cloud computing' },
      { en: 'Cryptography', ne: 'Cryptography' }
    ],
    answer: 1,
    explanation: {
      en: 'The call records are big data — the material. Examining them to discover a pattern nobody asked for is the activity, and that activity is data mining. Big data is a noun you have; data mining is a verb you do to it. Writing "big data is mining large data" merges the two and loses the mark.',
      ne: 'कल रेकर्ड big data हुन् — सामग्री। कसैले नखोजेको बान्की भेट्न केलाउनु काम हो, र त्यो काम data mining। Big data तपाईंसँग भएको नाम हो; data mining त्यसमाथि गरिने क्रिया। "Big data भनेको ठूलो data को mining हो" लेख्नु दुईलाई मिसाउनु हो र अंक गुम्छ।'
    }
  },
  {
    id: 'g9.cf.q58', subject: 'grade9/computer-fundamentals', unit: 'u7',
    topic: 'vr-vs-ar', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A mechanic points a phone at an engine and sees the part names drawn over the real engine on the screen. This is:',
      ne: 'मेकानिकले इन्जिनतिर फोन तेर्स्याउँदा पर्दामा वास्तविक इन्जिनमाथि भागका नाम कोरिएको देख्छ। यो हो:'
    },
    options: [
      { en: 'Virtual Reality', ne: 'Virtual Reality' },
      { en: 'Augmented Reality', ne: 'Augmented Reality' },
      { en: 'Artificial Intelligence', ne: 'Artificial Intelligence' },
      { en: 'Cloud computing', ne: 'Cloud computing' }
    ],
    answer: 1,
    explanation: {
      en: 'The real engine is still visible and information has been ADDED on top — that is AR. VR would replace the surroundings entirely with a computer-generated world, and would need a headset that blocks the room out. The ordinary phone is the clue.',
      ne: 'वास्तविक इन्जिन देखिँदै छ र माथि सूचना थपिएको छ — यही AR। VR ले वरिपरिको संसार पूरै कम्प्युटरले बनाएको संसारले बदल्थ्यो र कोठा छेक्ने हेडसेट चाहिन्थ्यो। साधारण फोन नै सुराक हो।'
    }
  },
  {
    id: 'g9.cf.q59', subject: 'grade9/computer-fundamentals', unit: 'u7',
    topic: 'cryptography', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'In cryptography, what is kept secret — the algorithm or the key?',
      ne: 'Cryptography मा गोप्य के राखिन्छ — एल्गोरिदम कि key?'
    },
    options: [
      { en: 'The algorithm, because if people knew the method they could read the message',
        ne: 'एल्गोरिदम, किनभने तरिका थाहा भए मानिसले सन्देश पढ्न सक्थे' },
      { en: 'The key — the algorithm is usually public, and security depends on the key being secret',
        ne: 'Key — एल्गोरिदम प्रायः सार्वजनिक हुन्छ, र सुरक्षा key गोप्य रहनुमा भर पर्छ' },
      { en: 'Both must be secret at all times', ne: 'दुवै सधैं गोप्य हुनुपर्छ' },
      { en: 'Neither — encryption does not rely on secrecy', ne: 'कुनै पनि होइन — encryption गोपनीयतामा भर पर्दैन' }
    ],
    answer: 1,
    explanation: {
      en: 'Security that depends on hiding the method collapses as soon as somebody works the method out, and it cannot be repaired. Security that depends on a key survives: the algorithm can be published and studied, and if a key is exposed you change the key. This is why the same public algorithm protects millions of different conversations.',
      ne: 'तरिका लुकाएर पाइने सुरक्षा कसैले तरिका पत्ता लगाउने बित्तिकै ढल्छ, र त्यसलाई मर्मत गर्न मिल्दैन। Key मा अडेको सुरक्षा टिक्छ: एल्गोरिदम छापेर अध्ययन गर्न दिन सकिन्छ, र key चुहियो भने key फेरे पुग्छ। एउटै सार्वजनिक एल्गोरिदमले लाखौं फरक कुराकानी जोगाउनुको कारण यही हो।'
    }
  },
  {
    id: 'g9.cf.q60', subject: 'grade9/computer-fundamentals', unit: 'u7',
    topic: 'ai', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'What distinguishes an artificial intelligence system from an ordinary computer program?',
      ne: 'Artificial intelligence प्रणालीलाई साधारण कम्प्युटर प्रोग्रामभन्दा छुट्याउने कुरा के हो?'
    },
    options: [
      { en: 'It runs faster', ne: 'यो छिटो चल्छ' },
      { en: 'It can learn from examples and improve without being rewritten',
        ne: 'यसले उदाहरणबाट सिक्न र फेरि नलेखिकनै सुध्रन सक्छ' },
      { en: 'It needs an Internet connection', ne: 'यसलाई इन्टरनेट जडान चाहिन्छ' },
      { en: 'It is always written in a special language', ne: 'यो सधैं विशेष भाषामा लेखिन्छ' }
    ],
    answer: 1,
    explanation: {
      en: 'Learning from experience is the phrase that carries the mark. An ordinary program does exactly what it was told; an AI system is given examples and works out the rule itself, which is why it can improve without a programmer rewriting it. Speed, Internet and language are not part of the definition.',
      ne: 'अंक बोक्ने वाक्यांश "अनुभवबाट सिक्ने" हो। साधारण प्रोग्रामले भनेकै गर्छ; AI प्रणालीलाई उदाहरण दिइन्छ र नियम आफैं निकाल्छ, त्यसैले प्रोग्रामरले फेरि नलेखिकनै सुध्रन सक्छ। गति, इन्टरनेट र भाषा परिभाषाका भाग होइनन्।'
    }
  },
  {
    id: 'g9.cf.q61', subject: 'grade9/computer-fundamentals', unit: 'u7',
    topic: 'cloud', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which is a genuine disadvantage of cloud computing for a school in Nepal?',
      ne: 'नेपालको विद्यालयका लागि cloud computing को साँचो बेफाइदा कुन हो?'
    },
    options: [
      { en: 'It requires buying expensive servers', ne: 'महँगो सर्भर किन्नुपर्छ' },
      { en: 'It needs a reliable Internet connection, and the data sits on someone else’s computer',
        ne: 'भरपर्दो इन्टरनेट चाहिन्छ, र data अर्कैको कम्प्युटरमा रहन्छ' },
      { en: 'It cannot be reached from more than one place', ne: 'एक ठाउँभन्दा बढीबाट पुग्न सकिँदैन' },
      { en: 'Capacity cannot be increased later', ne: 'पछि क्षमता बढाउन मिल्दैन' }
    ],
    answer: 1,
    explanation: {
      en: 'Option A is backwards — not buying servers is cloud computing’s main advantage, and options C and D describe the opposite of what it offers. The real disadvantages are dependence on a working connection, data held by someone else, and a cost that never stops. All three matter in Nepal, where connections fail and electricity is not guaranteed.',
      ne: 'विकल्प (क) उल्टो छ — सर्भर नकिन्नु नै cloud को मुख्य फाइदा हो, र (ग) तथा (घ) ले यसले दिने कुराको ठिक उल्टो भन्छन्। साँचो बेफाइदा: चल्ने जडानमा निर्भरता, data अर्कैसँग रहनु, र कहिल्यै नसकिने खर्च। नेपालमा तीनै महत्त्वपूर्ण छन्।'
    }
  },
  {
    id: 'g9.cf.q62', subject: 'grade9/computer-fundamentals', unit: 'u7',
    topic: 'emerging-definition', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'What makes a technology "emerging" rather than merely new?',
      ne: 'कुनै प्रविधि नयाँ मात्र नभई "उदीयमान" किन भनिन्छ?'
    },
    options: [
      { en: 'It was invented this year', ne: 'यो यसै वर्ष आविष्कार भयो' },
      { en: 'It is still developing, is not yet in ordinary everyday use, and is expected to change how people live and work',
        ne: 'यो अझै विकसित हुँदै छ, दैनिक सामान्य प्रयोगमा आइसकेको छैन, र मानिसको जीवन तथा कामको तरिका बदल्ने अपेक्षा छ' },
      { en: 'It is expensive', ne: 'यो महँगो छ' },
      { en: 'It uses artificial intelligence', ne: 'यसले AI प्रयोग गर्छ' }
    ],
    answer: 1,
    explanation: {
      en: 'New is not the test — a new model of phone is new and changes nothing. A technology is emerging when it is moving out of the laboratory into use fast enough that the rules and the jobs around it have not settled. That also means the list changes over time, which is what the word predicts.',
      ne: 'जाँच "नयाँ" होइन — फोनको नयाँ मोडेल नयाँ त हो, तर केही बदल्दैन। कुनै प्रविधि प्रयोगशालाबाट प्रयोगमा यति छिटो सर्दै छ कि वरिपरिका नियम र पेसा नै थामिइसकेका छैनन् भने त्यो उदीयमान हो। यसैले सूची समयसँगै बदलिन्छ — शब्दले भनेकै त्यही हो।'
    }
  }

];
