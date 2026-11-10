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
  }
];
