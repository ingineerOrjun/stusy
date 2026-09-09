/* ============================================================
   GUIDED PRACTICE — HARDWARE & REPAIR

   WHY THIS SKILL AND NOT ANOTHER
   Unit 4 is twelve hours on troubleshooting, and its whole content is
   one procedure: read the symptom, work out how far the machine got,
   and let that rule out everything after it. The unit explains that
   procedure well. Nothing in the subject asked a student to CARRY IT
   OUT with the working removed, which is the only way to find out
   whether they can.

   The fault lab in the same unit is a different exercise and neither
   replaces the other: the lab gives a fixed set of checks to choose
   between, so it teaches ORDER. This asks the student to produce the
   reasoning with no options on screen, which is what the written paper
   demands — "describe how you would find the fault" is answered in
   sentences, not by picking from a list.

   THE FADE
   worked -> partial -> guided -> independent -> transfer
   The transfer problem moves the SAME rule to a symptom the unit never
   discusses, so it cannot be answered by recognising a case.
   ============================================================ */

module.exports = [
  {
    id: 'hw.diagnose',
    subject: 'grade10/hardware',
    unit: 'hw-u4',
    skill: {
      en: 'Read a symptom, decide how far the boot reached, and name what that rules out',
      ne: 'लक्षण पढ्नुहोस्, boot कहाँसम्म पुग्यो निर्णय गर्नुहोस्, र त्यसले के हटाउँछ भन्नुहोस्'
    },
    rule: {
      en: 'A boot symptom tells you the last stage the machine completed, and everything AFTER that stage is ruled out. No power at all = power path. Fans but beeps and no video = POST is running, so power is fine and video was not ready — memory first. A message on screen = POST passed, so all the hardware POST checks are fine and the problem is finding or loading the operating system. The OS starting and then failing = hardware and boot sector are fine; the fault is software.',
      ne: 'Boot को लक्षणले मेसिनले पूरा गरेको अन्तिम चरण बताउँछ, र त्यस चरणपछिका सबै सम्भावना हट्छन्। बिजुली नै छैन = बिजुलीको बाटो। पंखा घुम्छ तर बीप र video छैन = POST चलिरहेको, त्यसैले बिजुली ठीक र video तयार थिएन — पहिले मेमोरी। स्क्रिनमा सन्देश = POST पास, त्यसैले POST ले जाँच्ने सबै हार्डवेयर ठीक र समस्या अपरेटिङ सिस्टम भेट्न वा लोड गर्नमा। OS सुरु भएर बिग्रिनु = हार्डवेयर र boot sector ठीक; खराबी सफ्टवेयरमा।'
    },
    problems: [
      {
        fade: 'worked',
        ask: {
          en: 'A computer shows no lights and no fan movement at all when the power button is pressed. How far did it get, and what does that rule out?',
          ne: 'पावर बटन थिच्दा कम्प्युटरमा कुनै बत्ती र पंखाको चाल देखिँदैन। यो कहाँसम्म पुग्यो, र त्यसले के हटाउँछ?'
        },
        steps: [
          {
            prompt: { en: 'Did the machine receive power at all? Answer yes or no',
                      ne: 'मेसिनमा बिजुली आयो कि आएन? yes वा no' },
            answer: 'no',
            accept: ['n'],
            why: { en: 'No lights and no fans means nothing electrical started. Power never reached the board.',
                   ne: 'बत्ती छैन, पंखा छैन भनेको कुनै विद्युतीय काम सुरु नै भएन। बोर्डसम्म बिजुली पुगेन।' }
          },
          {
            prompt: { en: 'Did POST run? Answer yes or no',
                      ne: 'POST चल्यो? yes वा no' },
            answer: 'no',
            accept: ['n'],
            why: { en: 'POST is a program on the board. With no power reaching the board, nothing can run — so POST is not a suspect and neither is memory.',
                   ne: 'POST बोर्डको प्रोग्राम हो। बोर्डमा बिजुली नै नपुगेपछि केही चल्न सक्दैन — त्यसैले POST पनि शंकास्पद होइन, मेमोरी पनि होइन।' }
          },
          {
            prompt: { en: 'So which single area do you check? Answer power, memory, disk or software',
                      ne: 'त्यसैले कुन एउटा क्षेत्र जाँच्नुहुन्छ? power, memory, disk वा software' },
            answer: 'power',
            accept: ['power supply', 'psu', 'mains'],
            why: { en: 'Everything after power is ruled out because nothing after power got a chance to happen. Check the wall socket, the cable, the switch at the back of the supply, and then the supply itself.',
                   ne: 'बिजुलीपछिका सबै कुरा हट्छन्, किनकि बिजुलीपछि केही हुने मौकै भएन। भित्ताको सकेट, केबल, सप्लाई पछाडिको स्विच, अनि सप्लाई आफैँ जाँच्नुहोस्।' }
          }
        ],
        result: 'power',
        resultPrompt: { en: 'Area to check', ne: 'जाँच्ने क्षेत्र' },
        check: {
          en: 'It reached nothing at all, so the fault is in the power path and every later stage is ruled out. Notice what this saves you: there is no point testing RAM, the disk or the operating system, because none of them was ever reached.',
          ne: 'यो कतै पुगेन, त्यसैले खराबी बिजुलीको बाटोमा छ र पछिका सबै चरण हट्छन्। यसले के बचायो हेर्नुहोस्: RAM, disk वा अपरेटिङ सिस्टम जाँच्नुको कुनै अर्थ छैन, किनकि तीमध्ये कुनैसम्म पुगिएकै थिएन।'
        }
      },
      {
        fade: 'partial',
        ask: {
          en: 'A computer powers on, the fans run, and it beeps in a repeating pattern with a black screen. How far did it get, and which area do you check?',
          ne: 'कम्प्युटरमा बिजुली आउँछ, पंखा घुम्छ, र कालो स्क्रिनसहित दोहोरिने ढाँचामा बीप गर्छ। यो कहाँसम्म पुग्यो, र कुन क्षेत्र जाँच्नुहुन्छ?'
        },
        steps: [
          {
            prompt: { en: 'Did POST run? Answer yes or no',
                      ne: 'POST चल्यो? yes वा no' },
            answer: 'yes',
            accept: ['y'],
            why: { en: 'The beeping IS the POST reporting. It can only beep if power reached the board and the BIOS started — so power is already ruled out.',
                   ne: 'बीप गर्नु <b>नै</b> POST ले सुनाएको हो। बोर्डमा बिजुली पुगेर BIOS सुरु भएमा मात्र बीप हुन्छ — त्यसैले बिजुली पहिल्यै हट्यो।' }
          },
          {
            prompt: { en: 'Which single area do you check first? Answer power, memory, disk or software',
                      ne: 'पहिले कुन एउटा क्षेत्र जाँच्नुहुन्छ? power, memory, disk वा software' },
            answer: 'memory',
            accept: ['ram'],
            why: { en: 'It is reporting by sound rather than on screen, which means the fault was found BEFORE video was initialised. Memory is tested that early in the POST, so it is the first suspect.',
                   ne: 'यसले स्क्रिनमा होइन आवाजमा सुनाइरहेको छ — अर्थात् खराबी video सुरु हुन<b>अघि</b> भेटियो। POST मा मेमोरी त्यति नै चाँडो जाँचिन्छ, त्यसैले पहिलो शंका त्यहीँ।' }
          }
        ],
        result: 'memory',
        resultPrompt: { en: 'Area to check', ne: 'जाँच्ने क्षेत्र' },
        check: {
          en: 'Beeps mean POST is running, so power is fine; a black screen at that moment means video was not ready yet, which puts memory first. If you answered "power", re-read the symptom — fans running is already proof that power arrived.',
          ne: 'बीप भनेको POST चलिरहेको, त्यसैले बिजुली ठीक छ; त्यही बेला कालो स्क्रिन भनेको video अझै तयार थिएन, जसले मेमोरीलाई पहिलो बनाउँछ। "power" भन्नुभयो भने लक्षण फेरि पढ्नुहोस् — पंखा घुम्नु नै बिजुली आइपुगेको प्रमाण हो।'
        }
      },
      {
        fade: 'guided',
        ask: {
          en: 'A computer shows the manufacturer logo, then the message "Operating system not found". How far did it get, and which area do you check?',
          ne: 'कम्प्युटरमा कम्पनीको लोगो देखिन्छ, अनि "Operating system not found" सन्देश आउँछ। यो कहाँसम्म पुग्यो, र कुन क्षेत्र जाँच्नुहुन्छ?'
        },
        steps: [
          {
            prompt: { en: 'Did POST pass? Answer yes or no',
                      ne: 'POST पास भयो? yes वा no' },
            answer: 'yes',
            accept: ['y'],
            why: { en: 'A logo and a readable message on screen mean video is working and the BIOS finished its checks. POST passed, so memory, video and the power path are all ruled out.',
                   ne: 'स्क्रिनमा लोगो र पढ्न मिल्ने सन्देश आउनुले video चलिरहेको र BIOS ले जाँच सकेको जनाउँछ। POST पास भयो, त्यसैले मेमोरी, video र बिजुलीको बाटो सबै हट्छन्।' }
          },
          {
            prompt: { en: 'Which single area do you check? Answer power, memory, disk or software',
                      ne: 'कुन एउटा क्षेत्र जाँच्नुहुन्छ? power, memory, disk वा software' },
            answer: 'disk',
            accept: ['hard disk', 'drive', 'storage'],
            why: { en: 'The BIOS got far enough to look for an operating system and could not find one. That points at the boot drive: the boot order in BIOS, the data cable, or a damaged boot sector.',
                   ne: 'BIOS अपरेटिङ सिस्टम खोज्ने चरणसम्म पुग्यो तर भेटेन। यसले boot ड्राइभतिर देखाउँछ: BIOS को boot order, data केबल, वा बिग्रेको boot sector।' }
          }
        ],
        result: 'disk',
        resultPrompt: { en: 'Area to check', ne: 'जाँच्ने क्षेत्र' },
        check: {
          en: 'A message ON the screen is proof POST passed, and that alone rules out most of the hardware. The fault is in finding or loading the operating system, which means the drive, its cable or the boot order.',
          ne: 'स्क्रिन<b>मा</b> सन्देश आउनु POST पास भएको प्रमाण हो, र त्यति एक्लैले धेरैजसो हार्डवेयर हटाउँछ। खराबी अपरेटिङ सिस्टम भेट्न वा लोड गर्नमा छ — अर्थात् ड्राइभ, यसको केबल वा boot order।'
        }
      },
      {
        fade: 'independent',
        ask: {
          en: 'A computer boots to the desktop normally, then freezes about a minute later. It does this every time. Which single area do you check — power, memory, disk or software?',
          ne: 'कम्प्युटर सामान्य रूपमा डेस्कटपसम्म आउँछ, अनि करिब एक मिनेटपछि अड्किन्छ। हरेक पटक यसै हुन्छ। कुन एउटा क्षेत्र जाँच्नुहुन्छ — power, memory, disk वा software?'
        },
        steps: [],
        result: 'software',
        resultPrompt: { en: 'Area to check', ne: 'जाँच्ने क्षेत्र' },
        check: {
          en: 'The machine completed every hardware stage, so the symptom itself rules the hardware out. Check startup programs, recently installed drivers and updates, and scan for malware — booting into safe mode is the standard test, because it loads almost none of them.',
          ne: 'मेसिनले हार्डवेयरका सबै चरण पूरा गर्‍यो, त्यसैले लक्षणले नै हार्डवेयर हटाउँछ। Startup प्रोग्राम, भर्खर राखिएका driver र अपडेट जाँच्नुहोस्, र malware स्क्यान गर्नुहोस् — safe mode मा boot गर्नु मानक परीक्षण हो, किनकि त्यसले तीमध्ये झन्डै कुनै पनि लोड गर्दैन।'
        }
      },
      {
        fade: 'transfer',
        ask: {
          en: 'A printer prints the first two pages of every job correctly and then stops, on any document. Apply the same reasoning: two good pages rule out the driver, the cable and the printer, because none of those could work twice and then fail. So what kind of cause is left — a capacity limit, a driver, or a cable? Answer in one word.',
          ne: 'एउटा प्रिन्टरले हरेक कामको पहिलो दुई पाना ठीकसँग छाप्छ अनि रोकिन्छ — जुनसुकै कागजातमा। उही तर्क लगाउनुहोस्: दुई पाना ठीक आउनुले driver, केबल र प्रिन्टरलाई हटाउँछ, किनकि तीमध्ये कुनै पनि दुई पटक चलेर अनि बिग्रिन सक्दैन। त्यसो भए कस्तो कारण बाँकी रह्यो — capacity, driver कि cable? एक शब्दमा उत्तर दिनुहोस्।'
        },
        steps: [],
        result: 'capacity',
        resultPrompt: { en: 'Kind of cause', ne: 'कारणको किसिम' },
        check: {
          en: 'The rule transferred: "how far did it get" is not about booting — it is about reading a partial success as evidence. Two good pages rule out the driver, the cable and the printer itself, because none of those could work twice and then fail. What is left is something that runs out: printer memory, or a spooler that cannot hold the rest of the job.',
          ne: 'नियम सर्‍यो: "कहाँसम्म पुग्यो" भन्नु boot कै कुरा होइन — आंशिक सफलतालाई प्रमाणका रूपमा पढ्नु हो। दुई पाना ठीक आउनुले driver, केबल र प्रिन्टर आफैँलाई हटाउँछ, किनकि तीमध्ये कुनै पनि दुई पटक चलेर अनि बिग्रिन सक्दैन। बाँकी रहन्छ — सकिने कुरा: प्रिन्टरको मेमोरी, वा बाँकी काम राख्न नसक्ने spooler।'
        }
      }
    ]
  }
];
