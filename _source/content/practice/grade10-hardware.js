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
    /* THE SECOND SKILL, AND WHY IT IS NOT MORE OF THE FIRST.
       hw.diagnose is qualitative — read a symptom, name an area.
       This one is arithmetic with a rule attached: given a schedule,
       COUNT what a restore depends on. Unit 6 is examined on exactly
       that ("how many sets are needed to restore?") and the previous
       phase left it with no practice at all, which its own completion
       report recorded as a gap. */
    id: 'hw.restore',
    subject: 'grade10/hardware',
    unit: 'hw-u6',
    skill: {
      en: 'Count the sets a restore depends on, and say what a missing one costs',
      ne: 'पुनर्स्थापनाले भर पर्ने सेट गन्नुहोस्, र एउटा हराए के गुम्छ भन्नुहोस्'
    },
    rule: {
      en: 'A restore needs the last FULL backup plus whatever holds the changes since. Incremental holds changes since the LAST BACKUP OF ANY KIND, so every one since the full backup is needed and they form a chain — break a link and everything after it is lost. Differential holds changes since the last FULL backup, so exactly two sets are ever needed and losing an older differential costs nothing.',
      ne: 'पुनर्स्थापनाका लागि अन्तिम FULL ब्याकअप र त्यसपछिका परिवर्तन बोक्ने जति चाहिन्छ। Incremental ले जुनसुकै किसिमको अघिल्लो ब्याकअपपछिको परिवर्तन बोक्छ, त्यसैले full पछिका सबै चाहिन्छन् र ती शृंखला बन्छन् — एउटा कडी टुट्यो भने त्यसपछिको सबै जान्छ। Differential ले अन्तिम FULL पछिको परिवर्तन बोक्छ, त्यसैले सधैं ठ्याक्कै दुई सेट चाहिन्छ र पुरानो differential हराए केही बिग्रँदैन।'
    },
    problems: [
      {
        fade: 'worked',
        ask: {
          en: 'Full backup on Monday. Incremental backups on Tuesday, Wednesday, Thursday and Friday. The disk fails on Friday night. How many sets does the restore need?',
          ne: 'सोमबार full ब्याकअप। मंगल, बुध, बिही र शुक्रबार incremental। शुक्रबार राति डिस्क बिग्रियो। पुनर्स्थापनाका लागि कति सेट चाहिन्छ?'
        },
        steps: [
          {
            prompt: { en: 'Does an incremental hold changes since the last FULL backup, or since the last backup of any kind? Answer full or any',
                      ne: 'Incremental ले अन्तिम FULL पछिको परिवर्तन बोक्छ कि जुनसुकै किसिमको अघिल्लो ब्याकअपपछिको? full वा any' },
            answer: 'any',
            accept: ['any kind', 'last backup'],
            why: { en: 'That is the whole definition. Tuesday holds Monday-to-Tuesday, Wednesday holds Tuesday-to-Wednesday, and so on — each one starts where the previous backup stopped, not where the full one did.',
                   ne: 'परिभाषा नै यही हो। मंगलबारले सोम–मंगलको, बुधबारले मंगल–बुधको बोक्छ — हरेकले अघिल्लो ब्याकअप रोकिएको ठाउँबाट सुरु गर्छ, full रोकिएको ठाउँबाट होइन।' }
          },
          {
            prompt: { en: 'How many incremental sets were taken between Monday and Friday? Answer a number',
                      ne: 'सोमबारदेखि शुक्रबारसम्म कति incremental सेट लिइए? सङ्ख्यामा उत्तर दिनुहोस्' },
            answer: '4',
            accept: ['four'],
            why: { en: 'Tuesday, Wednesday, Thursday and Friday — four.',
                   ne: 'मंगल, बुध, बिही र शुक्रबार — चार।' }
          },
          {
            prompt: { en: 'So how many sets in total does the restore need? Answer a number',
                      ne: 'त्यसैले पुनर्स्थापनाका लागि जम्मा कति सेट चाहिन्छ? सङ्ख्यामा उत्तर दिनुहोस्' },
            answer: '5',
            accept: ['five'],
            why: { en: 'The full set, then all four increments replayed in order. Five.',
                   ne: 'Full सेट, अनि चारै increment क्रमैसँग लगाउने। पाँच।' }
          }
        ],
        result: '5',
        resultPrompt: { en: 'Sets needed', ne: 'चाहिने सेट' },
        check: {
          en: 'Five. The chain has to be replayed in order, which is the price incremental pays for being the fastest to take. Notice the count is full + one per day since — not one per day of the week.',
          ne: 'पाँच। शृंखला क्रमैसँग लगाउनुपर्छ — लिन सबैभन्दा छिटो हुनुको मूल्य incremental ले यही तिर्छ। गन्ती full + त्यसपछिका हरेक दिनको एक हो, हप्ताको हरेक दिनको एक होइन।'
        }
      },
      {
        fade: 'partial',
        ask: {
          en: 'The same week, but the Tuesday-to-Friday backups are DIFFERENTIAL instead. The disk fails on Friday night. How many sets does the restore need?',
          ne: 'उही हप्ता, तर मंगलदेखि शुक्रसम्मका ब्याकअप DIFFERENTIAL छन्। शुक्रबार राति डिस्क बिग्रियो। पुनर्स्थापनाका लागि कति सेट चाहिन्छ?'
        },
        steps: [
          {
            prompt: { en: 'What does Friday\'s differential contain — changes since Thursday, or since Monday? Answer thursday or monday',
                      ne: 'शुक्रबारको differential मा के हुन्छ — बिहीबारपछिको परिवर्तन कि सोमबारपछिको? thursday वा monday' },
            answer: 'monday',
            accept: ['mon', 'full'],
            why: { en: 'A differential always measures from the last FULL backup, so Friday\'s already contains everything Tuesday, Wednesday and Thursday captured.',
                   ne: 'Differential सधैं अन्तिम FULL बाट नाप्छ, त्यसैले शुक्रबारकोमा मंगल, बुध र बिहीबारले टिपेको सबै पहिल्यै समेटिएको हुन्छ।' }
          },
          {
            prompt: { en: 'So how many sets does the restore need? Answer a number',
                      ne: 'त्यसैले पुनर्स्थापनाका लागि कति सेट चाहिन्छ? सङ्ख्यामा उत्तर दिनुहोस्' },
            answer: '2',
            accept: ['two'],
            why: { en: 'Monday\'s full set and Friday\'s differential. The ones in between are redundant the moment a newer differential exists.',
                   ne: 'सोमबारको full र शुक्रबारको differential। नयाँ differential बनेकै क्षणदेखि बीचका सबै बेकामे हुन्छन्।' }
          }
        ],
        result: '2',
        resultPrompt: { en: 'Sets needed', ne: 'चाहिने सेट' },
        check: {
          en: 'Two — always two, whatever day it fails on. That is what differential buys with its larger daily sets, and it is the comparison the exam asks for.',
          ne: 'दुई — जुन दिन बिग्रिए पनि सधैं दुई। ठूला दैनिक सेटको बदलामा differential ले किन्ने कुरा यही हो, र परीक्षाले खोज्ने तुलना पनि यही।'
        }
      },
      {
        fade: 'guided',
        ask: {
          en: 'Back to the incremental week: full on Monday, incrementals Tuesday to Friday. Wednesday\'s tape turns out to be unreadable. Up to which day can the data be trusted?',
          ne: 'फेरि incremental हप्तामा: सोमबार full, मंगलदेखि शुक्रसम्म incremental। बुधबारको टेप पढ्नै नमिल्ने निस्कियो। कुन दिनसम्मको data भरपर्दो छ?'
        },
        steps: [
          {
            prompt: { en: 'Does Thursday\'s increment contain the changes Wednesday\'s was holding? Answer yes or no',
                      ne: 'बिहीबारको increment मा बुधबारकोले बोकेको परिवर्तन छ? yes वा no' },
            answer: 'no',
            accept: ['n'],
            why: { en: 'Thursday only holds what changed after Wednesday\'s backup ran. Nothing later re-captures what Wednesday was carrying, so the gap cannot be filled from another set.',
                   ne: 'बिहीबारकोमा बुधबारको ब्याकअप चलेपछि बदलिएको मात्र हुन्छ। बुधबारले बोकेको कुरा पछिको कुनैले फेरि टिप्दैन, त्यसैले त्यो खाडल अर्को सेटबाट भरिँदैन।' }
          },
          {
            prompt: { en: 'So which day is the last one you can restore to? Answer monday, tuesday, wednesday or friday',
                      ne: 'त्यसैले कुन दिनसम्म फर्काउन सकिन्छ? monday, tuesday, wednesday वा friday' },
            answer: 'tuesday',
            accept: ['tue'],
            why: { en: 'Monday\'s full set plus Tuesday\'s increment replay cleanly. The chain breaks at Wednesday, and everything from there on is unrecoverable.',
                   ne: 'सोमबारको full र मंगलबारको increment सफासँग लाग्छन्। शृंखला बुधबार टुट्छ, र त्यसपछिको सबै फर्काउन सकिँदैन।' }
          }
        ],
        result: 'tuesday',
        resultPrompt: { en: 'Restorable up to', ne: 'यति दिनसम्म फर्काउन सकिने' },
        check: {
          en: 'Tuesday. One damaged tape cost three days of work — that fragility is the real argument against incremental, and it is why the same failure under a differential scheme would have cost nothing at all.',
          ne: 'मंगलबार। एउटा बिग्रेको टेपले तीन दिनको काम लियो — incremental विरुद्धको साँचो तर्क यही कमजोरी हो, र त्यसैले differential योजनामा उही असफलताले केही बिगार्दैनथ्यो।'
        }
      },
      {
        fade: 'independent',
        ask: {
          en: 'A full backup runs on the 1st of the month. Differential backups run every day after it. The disk fails on the 20th. How many sets does the restore need? Answer a number.',
          ne: 'महिनाको १ गते full ब्याकअप चल्छ। त्यसपछि हरेक दिन differential। २० गते डिस्क बिग्रियो। पुनर्स्थापनाका लागि कति सेट चाहिन्छ? सङ्ख्यामा उत्तर दिनुहोस्।'
        },
        steps: [],
        result: '2',
        resultPrompt: { en: 'Sets needed', ne: 'चाहिने सेट' },
        check: {
          en: 'Two, and the twenty days are a distraction. A differential restore never needs more than the full set and the latest differential, however long the month has run. If you answered 20 or 19, you counted the backups taken rather than the ones a restore depends on.',
          ne: 'दुई — र बीस दिन ध्यान भड्काउन राखिएको हो। महिना जति लामो भए पनि differential पुनर्स्थापनालाई full सेट र सबैभन्दा पछिल्लो differential भन्दा बढी कहिल्यै चाहिँदैन। २० वा १९ भन्नुभयो भने तपाईंले लिइएका ब्याकअप गन्नुभयो, पुनर्स्थापनाले भर पर्नेहरू होइन।'
        }
      },
      {
        fade: 'transfer',
        ask: {
          en: 'Different technology, same question. A RAID 5 array of four disks loses one disk. To rebuild the missing disk\'s contents, how many of the surviving disks must be readable? Answer a number.',
          ne: 'फरक प्रविधि, उही प्रश्न। चार डिस्कको RAID 5 array ले एउटा डिस्क गुमायो। हराएको डिस्कको सामग्री पुनर्निर्माण गर्न बाँकी कतिवटा डिस्क पढ्न मिल्नुपर्छ? सङ्ख्यामा उत्तर दिनुहोस्।'
        },
        steps: [],
        result: '3',
        resultPrompt: { en: 'Disks needed', ne: 'चाहिने डिस्क' },
        check: {
          en: 'All three. The rule transferred: a recovery depends on every source that holds part of the answer, and you count those rather than counting what exists. RAID 5 rebuilds the lost disk by combining the data and parity spread across ALL the remaining disks — so a second failure during the rebuild loses the array, which is exactly the chain-breaks-and-everything-after-is-gone problem, wearing different hardware.',
          ne: 'तीनै वटा। नियम सर्‍यो: पुनर्स्थापनाले उत्तरको अंश बोक्ने हरेक स्रोतमा भर पर्छ, र गन्नुपर्ने कुरा त्यही हो — के छ भन्ने होइन। RAID 5 ले बाँकी <b>सबै</b> डिस्कमा फैलिएको data र parity जोडेर हराएको डिस्क बनाउँछ — त्यसैले पुनर्निर्माणकै बीचमा दोस्रो डिस्क बिग्रिए array जान्छ, जुन ठ्याक्कै "कडी टुट्यो, त्यसपछिको सबै गयो" भन्ने समस्या हो, फरक हार्डवेयर लगाएर।'
        }
      }
    ]
  },
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
