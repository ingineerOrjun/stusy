/* ============================================================
   QUESTION BANK — HARDWARE & REPAIR (Grade 10)

   Coverage is deliberate rather than even: the bank is weighted the
   way the marks are. Units 3, 4 and 5 carry 27 of the 50 marks between
   them and get the most questions; Unit 6 carries 7 and gets fewest.

   The mix matters as much as the count. A hardware paper does not only
   ask for definitions — it asks what you would CHECK, given a symptom.
   So roughly a third of these present a situation and ask for the
   diagnosis rather than the term, which is the kind this subject is
   actually examined on and the kind a definition-only bank cannot test.

   Every distractor is a real student answer, not a filler. The
   explanations say why the wrong one is tempting, because "incorrect"
   teaches nothing.
   ============================================================ */

module.exports = [

  /* ---------------- Unit 1 — Electronic devices ---------------- */
  {
    id: 'g10.hw.q001', subject: 'grade10/hardware', unit: 'u1',
    topic: 'matter-atom', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: { en: 'Which subatomic particle carries a positive charge?',
              ne: 'कुन उप-आणविक कणले धनात्मक चार्ज बोक्छ?' },
    options: [
      { en: 'Electron', ne: 'Electron' },
      { en: 'Proton', ne: 'Proton' },
      { en: 'Neutron', ne: 'Neutron' },
      { en: 'Molecule', ne: 'Molecule' }
    ],
    answer: 1,
    explanation: {
      en: 'The proton is positive and sits in the nucleus. The neutron is also in the nucleus but has no charge; the electron is negative and orbits in shells. A molecule is not a subatomic particle at all — it is made of atoms.',
      ne: 'Proton धनात्मक हुन्छ र nucleus मा बस्छ। Neutron पनि nucleus मै हुन्छ तर चार्ज हुँदैन; electron ऋणात्मक हुन्छ र शेलमा घुम्छ। Molecule उप-आणविक कण नै होइन — यो atom हरूबाट बनेको हुन्छ।'
    }
  },
  {
    id: 'g10.hw.q002', subject: 'grade10/hardware', unit: 'u1',
    topic: 'kirchhoff', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: { en: 'At a junction, currents of 6 A and 2 A flow in, and 3 A flows out on one branch. What flows out on the remaining branch?',
              ne: 'एउटा जोडमा ६ A र २ A भित्र आउँछन्, र एउटा शाखाबाट ३ A बाहिर जान्छ। बाँकी शाखाबाट कति बाहिर जान्छ?' },
    options: [
      { en: '5 A', ne: '५ A' },
      { en: '11 A', ne: '११ A' },
      { en: '3 A', ne: '३ A' },
      { en: '1 A', ne: '१ A' }
    ],
    answer: 0,
    explanation: {
      en: 'KCL: total in equals total out. In = 6 + 2 = 8 A. Known out = 3 A, so the remaining branch carries 8 − 3 = 5 A. Choosing 11 A means the 3 A was added instead of subtracted — a sign error, not a knowledge gap.',
      ne: 'KCL: भित्र आउने कुल र बाहिर जाने कुल बराबर। भित्र = ६ + २ = ८ A। थाहा भएको बाहिर = ३ A, त्यसैले बाँकी शाखाले ८ − ३ = ५ A बोक्छ। ११ A छान्नु भनेको ३ A घटाउनुको साटो जोडिनु — ज्ञानको कमी होइन, चिन्हको गल्ती।'
    }
  },
  {
    id: 'g10.hw.q003', subject: 'grade10/hardware', unit: 'u1',
    topic: 'doping', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: { en: 'Silicon is doped with a trivalent impurity such as boron. What is produced?',
              ne: 'Silicon मा boron जस्तो trivalent अशुद्धि मिसाइयो। के बन्छ?' },
    options: [
      { en: 'N-type, with electrons as the majority carrier', ne: 'N-type, electron बहुसंख्यक वाहक भएको' },
      { en: 'P-type, with holes as the majority carrier', ne: 'P-type, hole बहुसंख्यक वाहक भएको' },
      { en: 'P-type, which carries a negative charge', ne: 'P-type, जसमा ऋणात्मक चार्ज हुन्छ' },
      { en: 'Pure silicon with better conductivity', ne: 'शुद्ध silicon, राम्रो चालकता भएको' }
    ],
    answer: 1,
    explanation: {
      en: 'Trivalent means three valence electrons, so one of silicon\'s four bonds is left unfilled — that gap is a hole, and holes dominating makes it P-type. Option 3 is the trap: P-type is NOT charged. Doping adds a carrier, not a charge, because the impurity atom brings its own protons.',
      ne: 'Trivalent भनेको तीन valence electron, त्यसैले silicon का चारमध्ये एउटा बन्धन खाली रहन्छ — त्यो खाली ठाउँ hole हो, र hole हावी हुँदा P-type बन्छ। तेस्रो विकल्प पासो हो: P-type मा चार्ज हुँदैन। Doping ले वाहक थप्छ, चार्ज होइन — किनकि अशुद्धिको atom आफ्नै proton सहित आउँछ।'
    }
  },
  {
    id: 'g10.hw.q004', subject: 'grade10/hardware', unit: 'u1',
    topic: 'pn-junction', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: { en: 'A silicon diode is connected in reverse bias. What happens?',
              ne: 'एउटा silicon diode reverse bias मा जोडियो। के हुन्छ?' },
    options: [
      { en: 'The depletion region narrows and current flows freely', ne: 'Depletion region साँघुरो हुन्छ र current स्वतन्त्र बग्छ' },
      { en: 'The depletion region widens and only a small leakage current flows', ne: 'Depletion region चौडा हुन्छ र सानो leakage current मात्र बग्छ' },
      { en: 'The depletion region disappears completely', ne: 'Depletion region पूरै हराउँछ' },
      { en: 'The diode is destroyed immediately', ne: 'Diode तुरुन्तै नष्ट हुन्छ' }
    ],
    answer: 1,
    explanation: {
      en: 'Reverse bias pulls carriers away from the junction, so the region empty of carriers grows wider and the barrier increases. Note the wording: a small leakage current, carried by the minority carriers, does still flow — writing "no current at all" loses the mark that "negligible leakage current" earns.',
      ne: 'Reverse bias ले वाहकलाई जोडबाट टाढा तान्छ, त्यसैले वाहकविहीन क्षेत्र चौडा हुन्छ र barrier बढ्छ। शब्द ध्यान दिनुहोस्: अल्पसंख्यक वाहकले बोक्ने सानो leakage current भने बग्छ — "बिल्कुलै current छैन" लेख्दा अंक गुम्छ, "नगण्य leakage current" ले पाउँछ।'
    }
  },

  /* ---------------- Unit 2 — Computer system ---------------- */
  {
    id: 'g10.hw.q005', subject: 'grade10/hardware', unit: 'u2',
    topic: 'cpu-units', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: { en: 'Which unit performs the comparison in the instruction "IF marks > 40"?',
              ne: '"IF marks > 40" निर्देशनमा तुलना कुन एकाइले गर्छ?' },
    options: [
      { en: 'The control unit', ne: 'Control unit' },
      { en: 'The ALU', ne: 'ALU' },
      { en: 'The memory unit', ne: 'Memory unit' },
      { en: 'The input unit', ne: 'Input unit' }
    ],
    answer: 1,
    explanation: {
      en: 'A comparison is a LOGICAL operation, and every logical and arithmetic operation happens in the ALU. The control unit fetched and decoded the instruction and will act on the result, but it does not do the comparing itself. This is the most confused pair in the unit.',
      ne: 'तुलना <b>तार्किक</b> काम हो, र हरेक तार्किक तथा अंकगणितीय काम ALU मा हुन्छ। Control unit ले निर्देशन ल्यायो, बुझ्यो र नतिजामा काम गर्नेछ, तर तुलना आफैँ गर्दैन। यस युनिटमा सबैभन्दा बढी मिसिने जोडी यही हो।'
    }
  },
  {
    id: 'g10.hw.q006', subject: 'grade10/hardware', unit: 'u2',
    topic: 'input-devices', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: { en: 'You scan a printed page. What do you have immediately afterwards?',
              ne: 'तपाईंले छापिएको पाना स्क्यान गर्नुभयो। लगत्तै तपाईंसँग के हुन्छ?' },
    options: [
      { en: 'Editable text', ne: 'सम्पादन गर्न मिल्ने अक्षर' },
      { en: 'An image of the page', ne: 'पानाको चित्र' },
      { en: 'A printed copy', ne: 'छापिएको प्रतिलिपि' },
      { en: 'A compressed archive', ne: 'Compress गरिएको archive' }
    ],
    answer: 1,
    explanation: {
      en: 'A scanner measures reflected light and produces a picture. The letters in it are dark pixels, not characters. OCR software must analyse that image before anything becomes editable text — which is why "scan then edit" always has a step in between.',
      ne: 'Scanner ले परावर्तित बत्ती नाप्छ र तस्बिर बनाउँछ। त्यसका अक्षर कालो पिक्सेल हुन्, अक्षर होइनन्। सम्पादन गर्न मिल्ने अक्षर बन्नुअघि OCR सफ्टवेयरले त्यो चित्र विश्लेषण गर्नैपर्छ — त्यसैले "स्क्यान गरेर सम्पादन" बीचमा सधैं एउटा चरण हुन्छ।'
    }
  },
  {
    id: 'g10.hw.q007', subject: 'grade10/hardware', unit: 'u2',
    topic: 'display', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: { en: 'A user says the screen flickers and their eyes hurt after an hour. Which setting should you change?',
              ne: 'प्रयोगकर्ताले स्क्रिन झिमझिम गर्छ र एक घण्टापछि आँखा दुख्छ भन्छ। कुन सेटिङ बदल्नुपर्छ?' },
    options: [
      { en: 'Colour depth', ne: 'Colour depth' },
      { en: 'Resolution', ne: 'Resolution' },
      { en: 'Refresh rate', ne: 'Refresh rate' },
      { en: 'Brightness only', ne: 'Brightness मात्र' }
    ],
    answer: 2,
    explanation: {
      en: 'Flicker is the screen being redrawn too few times per second for the eye to blend the frames, which is exactly what refresh rate measures. Raise it to the highest the monitor supports. Resolution changes sharpness, not flicker; colour depth changes the number of shades.',
      ne: 'झिमझिम भनेको स्क्रिन सेकेन्डमा यति थोरै पटक कोरिनु कि आँखाले फ्रेम जोड्न नसक्नु — refresh rate ले नाप्ने ठ्याक्कै त्यही हो। Monitor ले सक्ने सबैभन्दा माथि बढाउनुहोस्। Resolution ले तीक्ष्णता बदल्छ, झिमझिम होइन; colour depth ले रङको सङ्ख्या।'
    }
  },
  {
    id: 'g10.hw.q008', subject: 'grade10/hardware', unit: 'u2',
    topic: 'display', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: { en: 'What is the essential difference between an LCD and an LED monitor?',
              ne: 'LCD र LED monitor बीचको मुख्य फरक के हो?' },
    options: [
      { en: 'LED uses no liquid crystals at all', ne: 'LED मा liquid crystal हुँदै हुँदैन' },
      { en: 'They differ only in the backlight used', ne: 'फरक केवल प्रयोग गरिने backlight मा हो' },
      { en: 'LED fires electrons at a phosphor screen', ne: 'LED ले phosphor स्क्रिनमा electron हान्छ' },
      { en: 'LCD is thinner and uses less power', ne: 'LCD पातलो हुन्छ र कम बिजुली खान्छ' }
    ],
    answer: 1,
    explanation: {
      en: 'An LED monitor IS an LCD — the same liquid crystals block or pass light. What changed is the light source behind them: LEDs instead of a CCFL lamp, which makes it thinner, gives better contrast and uses less power. Option 3 describes a CRT.',
      ne: 'LED monitor भनेकै LCD हो — उही liquid crystal ले बत्ती छेक्छ वा पास गर्छ। फरक तिनको पछाडिको बत्तीको स्रोतमा हो: CCFL लैम्पको साटो LED, जसले पातलो बनाउँछ, राम्रो contrast दिन्छ र कम बिजुली खान्छ। तेस्रो विकल्पले CRT वर्णन गर्छ।'
    }
  },

  /* ---------------- Unit 3 — System's core ---------------- */
  {
    id: 'g10.hw.q009', subject: 'grade10/hardware', unit: 'u3',
    topic: 'bios', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: { en: 'Where is the BIOS stored?',
              ne: 'BIOS कहाँ राखिएको हुन्छ?' },
    options: [
      { en: 'On the hard disk with the operating system', ne: 'अपरेटिङ सिस्टमसँगै hard disk मा' },
      { en: 'On a chip on the motherboard', ne: 'मदरबोर्डको चिपमा' },
      { en: 'In RAM', ne: 'RAM मा' },
      { en: 'On the processor itself', ne: 'प्रोसेसर आफैँमा' }
    ],
    answer: 1,
    explanation: {
      en: 'The BIOS is firmware on a motherboard chip. It has to run before any disk is read — it is what finds and loads the operating system — so it cannot be stored on the disk. RAM is wrong because RAM is empty at power-on.',
      ne: 'BIOS मदरबोर्डको चिपमा रहेको firmware हो। कुनै disk पढिनुअघि नै यो चल्नुपर्छ — अपरेटिङ सिस्टम खोजेर लोड गर्ने यही हो — त्यसैले disk मा हुनै सक्दैन। RAM गलत हो किनकि बिजुली लाग्दा RAM खाली हुन्छ।'
    }
  },
  {
    id: 'g10.hw.q010', subject: 'grade10/hardware', unit: 'u3',
    topic: 'bios', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: { en: 'A computer shows the wrong date at every start-up and BIOS settings return to default. What should you replace?',
              ne: 'कम्प्युटरले हरेक पटक सुरु हुँदा गलत मिति देखाउँछ र BIOS सेटिङ पूर्वनिर्धारितमा फर्किन्छ। के साट्नुपर्छ?' },
    options: [
      { en: 'The hard disk', ne: 'Hard disk' },
      { en: 'The CMOS battery', ne: 'CMOS ब्याट्री' },
      { en: 'The RAM', ne: 'RAM' },
      { en: 'The power supply', ne: 'पावर सप्लाई' }
    ],
    answer: 1,
    explanation: {
      en: 'CMOS memory holds the BIOS settings and runs the clock, and it needs power even when the machine is unplugged. That power comes from a coin battery on the board. When it dies, everything CMOS remembers is lost each time mains power goes — which is exactly this symptom.',
      ne: 'CMOS मेमोरीले BIOS सेटिङ राख्छ र घडी चलाउँछ, र मेसिन अनप्लग हुँदा पनि यसलाई बिजुली चाहिन्छ। त्यो बोर्डको सिक्का ब्याट्रीबाट आउँछ। त्यो सकिएपछि मुख्य बिजुली जाँदा CMOS ले सम्झेको सबै हराउँछ — लक्षण ठ्याक्कै यही हो।'
    }
  },
  {
    id: 'g10.hw.q011', subject: 'grade10/hardware', unit: 'u3',
    topic: 'hard-disk', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: { en: 'What is the smallest unit of a hard disk that can be read or written?',
              ne: 'Hard disk को पढ्न वा लेख्न मिल्ने सबैभन्दा सानो एकाइ कुन हो?' },
    options: [
      { en: 'Track', ne: 'Track' },
      { en: 'Cylinder', ne: 'Cylinder' },
      { en: 'Sector', ne: 'Sector' },
      { en: 'Platter', ne: 'Platter' }
    ],
    answer: 2,
    explanation: {
      en: 'A sector is one slice of a track and is the smallest addressable unit. A track is a whole concentric ring, a cylinder is the same track across all platters, and a platter is the entire disk — all three are larger than a sector.',
      ne: 'Sector भनेको track को एउटा टुक्रा हो र ठेगाना दिन मिल्ने सबैभन्दा सानो एकाइ हो। Track पूरै केन्द्रित रिङ हो, cylinder सबै platter का उही track, र platter पूरै डिस्क — तीनै sector भन्दा ठूला छन्।'
    }
  },
  {
    id: 'g10.hw.q012', subject: 'grade10/hardware', unit: 'u3',
    topic: 'hard-disk', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: { en: 'Access time on a hard disk is made up of which three parts?',
              ne: 'Hard disk को access time कुन तीन भागबाट बन्छ?' },
    options: [
      { en: 'Seek time, rotational delay and transfer time', ne: 'Seek time, rotational delay र transfer time' },
      { en: 'Read time, write time and idle time', ne: 'Read time, write time र idle time' },
      { en: 'Boot time, seek time and load time', ne: 'Boot time, seek time र load time' },
      { en: 'Spin-up time, seek time and cache time', ne: 'Spin-up time, seek time र cache time' }
    ],
    answer: 0,
    explanation: {
      en: 'Seek time is the arm moving to the correct track, rotational delay is waiting for the sector to come round under the head, and transfer time is reading or writing the data. The first two are mechanical, which is why they dominate and why a solid-state drive is so much faster.',
      ne: 'Seek time भनेको arm ठीक track मा जाने, rotational delay भनेको sector head मुनि आइपुग्न पर्खने, र transfer time भनेको data पढ्ने वा लेख्ने। पहिलो दुई यान्त्रिक हुन् — त्यसैले तिनकै बढी समय लाग्छ, र solid-state drive यति छिटो हुनुको कारण पनि त्यही हो।'
    }
  },
  {
    id: 'g10.hw.q013', subject: 'grade10/hardware', unit: 'u3',
    topic: 'formatting', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: { en: 'A disk is quick-formatted before being given away. Can the old data still be recovered?',
              ne: 'कसैलाई दिनुअघि डिस्क quick-format गरियो। पुरानो data अझै फर्काउन सकिन्छ?' },
    options: [
      { en: 'No — a format erases everything permanently', ne: 'सकिँदैन — format ले सबै स्थायी रूपमा मेटाउँछ' },
      { en: 'Yes — only the index was cleared, the data remains until overwritten', ne: 'सकिन्छ — सूची मात्र सफा भयो, ओभरराइट नभएसम्म data रहन्छ' },
      { en: 'Only if the disk was never full', ne: 'डिस्क कहिल्यै भरिएको थिएन भने मात्र' },
      { en: 'Only with the original operating system', ne: 'मूल अपरेटिङ सिस्टमसँग मात्र' }
    ],
    answer: 1,
    explanation: {
      en: 'A quick format rewrites the file system index only, so the drive reports itself as empty while the sectors still hold the data. Recovery software scans sectors directly instead of trusting the index. To remove data properly you need a full format or a wipe utility that overwrites every sector.',
      ne: 'Quick format ले file system को सूची मात्र फेरि लेख्छ, त्यसैले ड्राइभ खाली देखिन्छ तर sector मा data रहन्छ। Recovery सफ्टवेयरले सूचीमा भर नपरी sector सीधै स्क्यान गर्छ। Data ठीकसँग हटाउन full format वा हरेक sector ओभरराइट गर्ने wipe utility चाहिन्छ।'
    }
  },
  {
    id: 'g10.hw.q014', subject: 'grade10/hardware', unit: 'u3',
    topic: 'partitioning', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: { en: 'Which statement about an extended partition is correct?',
              ne: 'Extended partition बारे कुन कथन सही हो?' },
    options: [
      { en: 'It gets its own drive letter', ne: 'यसले आफ्नै ड्राइभ अक्षर पाउँछ' },
      { en: 'It is a container that holds logical drives', ne: 'यो logical drive राख्ने भाँडो हो' },
      { en: 'A computer can boot directly from it', ne: 'कम्प्युटर सीधै यसैबाट boot हुन सक्छ' },
      { en: 'It can only exist on a second physical disk', ne: 'यो दोस्रो भौतिक डिस्कमा मात्र हुन सक्छ' }
    ],
    answer: 1,
    explanation: {
      en: 'An extended partition exists to get round the limit on primary partitions: it holds logical drives, and those get the letters. The extended partition itself has none, and you boot from a primary partition, not from it.',
      ne: 'Primary partition को सीमा नाघ्न extended partition बनाइन्छ: यसले logical drive राख्छ, र अक्षर तिनैले पाउँछन्। Extended partition आफैँले पाउँदैन, र boot primary partition बाट हुन्छ, यसबाट होइन।'
    }
  },

  /* ---------------- Unit 4 — Troubleshooting ---------------- */
  {
    id: 'g10.hw.q015', subject: 'grade10/hardware', unit: 'u4',
    topic: 'method', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: { en: 'Why must you change only one thing at a time when troubleshooting?',
              ne: 'Troubleshooting गर्दा एकपटकमा एउटा मात्र कुरा किन बदल्नुपर्छ?' },
    options: [
      { en: 'It is faster than changing several', ne: 'धेरै बदल्नुभन्दा यो छिटो हुन्छ' },
      { en: 'Otherwise you cannot tell which change fixed it', ne: 'नत्र कुन परिवर्तनले मिलायो थाहा हुँदैन' },
      { en: 'The warranty requires it', ne: 'वारेन्टीले यसै भन्छ' },
      { en: 'Two changes may damage the board', ne: 'दुई परिवर्तनले बोर्ड बिगार्न सक्छ' }
    ],
    answer: 1,
    explanation: {
      en: 'If you change two things and the fault clears, you have no idea which one was responsible. You have not diagnosed anything, cannot document it, and cannot prevent the same fault returning. It is usually slower, not faster — the point is that the result means something.',
      ne: 'दुई कुरा बदल्दा खराबी हट्यो भने कुनले हटायो थाहै हुँदैन। तपाईंले केही निदान गर्नुभएन, अभिलेख राख्न सक्नुहुन्न, र उही खराबी फेरि आउन रोक्न सक्नुहुन्न। यो प्रायः छिटो होइन, ढिलो हुन्छ — कुरा नतिजाको अर्थ हुनु हो।'
    }
  },
  {
    id: 'g10.hw.q016', subject: 'grade10/hardware', unit: 'u4',
    topic: 'boot', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: { en: 'A machine powers on, fans run, and it beeps repeatedly with a black screen. What does this tell you?',
              ne: 'मेसिनमा बिजुली आउँछ, पंखा घुम्छ, र कालो स्क्रिनसहित बारम्बार बीप गर्छ। यसले के बताउँछ?' },
    options: [
      { en: 'Power never reached the board', ne: 'बोर्डसम्म बिजुली पुगेन' },
      { en: 'POST is running and found a fault before video was ready', ne: 'POST चलिरहेको छ र video तयार हुनुअघि खराबी भेट्यो' },
      { en: 'The operating system is corrupted', ne: 'अपरेटिङ सिस्टम बिग्रिएको छ' },
      { en: 'The hard disk cable is loose', ne: 'Hard disk को केबल खुकुलो छ' }
    ],
    answer: 1,
    explanation: {
      en: 'Beeping IS the POST reporting, so power reached the board and the BIOS started — the power path is already ruled out. It is beeping rather than displaying because the fault was found before video was initialised, which makes memory the first suspect. The OS and the disk are not read until much later.',
      ne: 'बीप गर्नु <b>नै</b> POST ले सुनाएको हो, त्यसैले बोर्डमा बिजुली पुग्यो र BIOS सुरु भयो — बिजुलीको बाटो पहिल्यै हट्यो। देखाउनुको साटो बीप गर्नुको कारण खराबी video सुरु हुनुअघि भेटियो, जसले मेमोरीलाई पहिलो शंका बनाउँछ। OS र disk धेरै पछि मात्र पढिन्छन्।'
    }
  },
  {
    id: 'g10.hw.q017', subject: 'grade10/hardware', unit: 'u4',
    topic: 'boot', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: { en: 'The screen shows "Operating system not found". What has already been proved to work?',
              ne: 'स्क्रिनमा "Operating system not found" देखियो। के काम गरिरहेको छ भन्ने पहिल्यै प्रमाणित भइसक्यो?' },
    options: [
      { en: 'Nothing — the machine has failed completely', ne: 'केही पनि होइन — मेसिन पूरै बिग्रियो' },
      { en: 'Power, memory and video — POST passed', ne: 'बिजुली, मेमोरी र video — POST पास भयो' },
      { en: 'The hard disk is confirmed healthy', ne: 'Hard disk स्वस्थ छ भनी पुष्टि भयो' },
      { en: 'The operating system files are intact', ne: 'अपरेटिङ सिस्टमका फाइल सग्लै छन्' }
    ],
    answer: 1,
    explanation: {
      en: 'A readable message on screen proves video works, and the BIOS only reaches the point of looking for an operating system after POST has passed — so power, memory and video are all fine. What has NOT been proved is the disk: the message says the OS was not found, which is exactly what is still in question.',
      ne: 'स्क्रिनमा पढ्न मिल्ने सन्देश आउनुले video चलेको प्रमाणित गर्छ, र POST पास भएपछि मात्र BIOS अपरेटिङ सिस्टम खोज्ने चरणमा पुग्छ — त्यसैले बिजुली, मेमोरी र video ठीक छन्। प्रमाणित <b>नभएको</b> कुरा disk हो: सन्देशले OS भेटिएन भन्छ, र प्रश्न अझै त्यही हो।'
    }
  },
  {
    id: 'g10.hw.q018', subject: 'grade10/hardware', unit: 'u4',
    topic: 'slowdown', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: { en: 'A computer works normally when switched on but becomes slow after 25 minutes, sooner when a heavy program is running. What is the most likely cause?',
              ne: 'कम्प्युटर खोल्दा सामान्य चल्छ तर २५ मिनेटपछि ढिलो हुन्छ, भारी प्रोग्राम चलाए झन् चाँडो। सबैभन्दा सम्भावित कारण के हो?' },
    options: [
      { en: 'Too many startup programs', ne: 'Startup मा धेरै प्रोग्राम' },
      { en: 'Overheating causing the processor to reduce speed', ne: 'तात्दा प्रोसेसरले गति घटाउनु' },
      { en: 'A failing hard disk', ne: 'बिग्रँदै गएको hard disk' },
      { en: 'Insufficient colour depth', ne: 'Colour depth अपुग' }
    ],
    answer: 1,
    explanation: {
      en: 'The timing is the evidence. A fault present from the start would be slow immediately — too many startup programs is slow from boot. Something that only appears after the machine has warmed up, and appears sooner under load because load makes more heat, is thermal. The processor deliberately reduces its speed to protect itself.',
      ne: 'प्रमाण भनेको समय हो। सुरुदेखिको खराबी भए तुरुन्तै ढिलो हुन्थ्यो — startup मा धेरै प्रोग्राम भए boot देखि नै ढिलो हुन्छ। मेसिन तातेपछि मात्र देखिने, र भार पर्दा झन् चाँडो देखिने (किनकि भारले बढी ताप निकाल्छ) कुरा तापसम्बन्धी हो। प्रोसेसरले आफूलाई जोगाउन जानाजान गति घटाउँछ।'
    }
  },
  {
    id: 'g10.hw.q019', subject: 'grade10/hardware', unit: 'u4',
    topic: 'method', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: { en: 'You test your theory of the cause and the test disproves it. What is the correct next step?',
              ne: 'तपाईंले कारणको अनुमान परीक्षण गर्नुभयो र परीक्षणले त्यो गलत साबित गर्‍यो। ठीक अर्को कदम के हो?' },
    options: [
      { en: 'Start replacing components until it works', ne: 'चल्ने नभएसम्म पार्ट साट्न थाल्ने' },
      { en: 'Form a new theory of probable cause', ne: 'सम्भावित कारणको नयाँ अनुमान बनाउने' },
      { en: 'Reinstall the operating system', ne: 'अपरेटिङ सिस्टम फेरि इन्स्टल गर्ने' },
      { en: 'Document the failure and stop', ne: 'असफलताको अभिलेख राखेर रोकिने' }
    ],
    answer: 1,
    explanation: {
      en: 'A disproved theory sends you back to step 3, not forward. That loop is the part students leave out of the answer, and it is what separates diagnosis from guessing — you now know one more thing that is NOT the cause, which is real progress.',
      ne: 'गलत साबित भएको अनुमानले तपाईंलाई अगाडि होइन, चरण ३ मा फर्काउँछ। उत्तरमा विद्यार्थीले छुटाउने भाग यही हो, र निदान र अनुमानबीचको भिन्नता पनि यही — अब तपाईंलाई कारण <b>होइन</b> भन्ने एउटा कुरा थप थाहा भयो, जुन साँचो प्रगति हो।'
    }
  },

  /* ---------------- Unit 5 — Repair and maintenance ---------------- */
  {
    id: 'g10.hw.q020', subject: 'grade10/hardware', unit: 'u5',
    topic: 'power-protection', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: { en: 'An office has frequent complete power cuts and loses unsaved work. Which device solves this?',
              ne: 'एउटा कार्यालयमा बारम्बार बिजुली पूरै जान्छ र नबचाइएको काम हराउँछ। कुन उपकरणले समाधान गर्छ?' },
    options: [
      { en: 'A surge protector', ne: 'Surge protector' },
      { en: 'A voltage stabiliser', ne: 'Voltage stabiliser' },
      { en: 'A UPS', ne: 'UPS' },
      { en: 'An earthing rod', ne: 'Earthing rod' }
    ],
    answer: 2,
    explanation: {
      en: 'The power disappears entirely. A surge protector handles voltage that is too high and a stabiliser handles voltage that is too low — neither can supply power that is not there. Only a UPS carries a battery, and its purpose is to give enough time to save work and shut down properly.',
      ne: 'बिजुली पूरै हराउँछ। Surge protector ले धेरै बढी भोल्टेज सम्हाल्छ र stabiliser ले धेरै कम — नभएको बिजुली दुवैले दिन सक्दैनन्। UPS सँग मात्र ब्याट्री हुन्छ, र यसको उद्देश्य काम बचाएर ठीकसँग बन्द गर्न पुग्ने समय दिनु हो।'
    }
  },
  {
    id: 'g10.hw.q021', subject: 'grade10/hardware', unit: 'u5',
    topic: 'cooling', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: { en: 'A computer shuts itself down when it gets hot. What is the fault?',
              ne: 'तातेपछि कम्प्युटर आफैँ बन्द हुन्छ। खराबी के हो?' },
    options: [
      { en: 'The automatic shutdown feature is faulty', ne: 'स्वतः बन्द हुने सुविधा बिग्रेको छ' },
      { en: 'Whatever is stopping the heat from leaving', ne: 'ताप बाहिर जान नदिने जुनसुकै कुरा' },
      { en: 'The processor is producing too much heat and must be replaced', ne: 'प्रोसेसरले बढी ताप निकालेको छ र साट्नुपर्छ' },
      { en: 'The operating system is mismanaging power', ne: 'अपरेटिङ सिस्टमले बिजुली गलत व्यवस्थापन गरेको छ' }
    ],
    answer: 1,
    explanation: {
      en: 'The shutdown is the protection working correctly — it is stopping the processor being damaged. The fault is whatever prevents the heat escaping: dust in the heatsink fins, a stopped or slowed fan, dried thermal paste, or blocked vents. The processor is producing its normal amount of heat.',
      ne: 'बन्द हुनु सुरक्षा ठीकसँग चलेको हो — प्रोसेसर बिग्रिनबाट रोकिरहेको छ। खराबी भनेको ताप बाहिर जान नदिने कुरा हो: heatsink का पत्रमा धुलो, रोकिएको वा ढिलो भएको पंखा, सुकेको thermal paste, वा बन्द प्वाल। प्रोसेसरले सामान्य मात्रामै ताप निकालिरहेको छ।'
    }
  },
  {
    id: 'g10.hw.q022', subject: 'grade10/hardware', unit: 'u5',
    topic: 'virus', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: { en: 'Why must antivirus software be kept updated?',
              ne: 'Antivirus सफ्टवेयर किन अपडेट गरिराख्नुपर्छ?' },
    options: [
      { en: 'To make the computer run faster', ne: 'कम्प्युटर छिटो चलाउन' },
      { en: 'It cannot recognise viruses released after it was installed', ne: 'इन्स्टल भएपछि आएका भाइरस यसले चिन्न सक्दैन' },
      { en: 'To renew the software licence', ne: 'सफ्टवेयरको इजाजतपत्र नवीकरण गर्न' },
      { en: 'To free up disk space', ne: 'डिस्कको ठाउँ खाली गर्न' }
    ],
    answer: 1,
    explanation: {
      en: 'An antivirus recognises threats by comparing against what it knows. New malware appears constantly, so a scanner that is never updated is blind to everything released after installation. This is why "install antivirus" alone is a half answer — "and keep it updated" is the other half of the mark.',
      ne: 'Antivirus ले आफूलाई थाहा भएकोसँग मिलाएर खतरा चिन्छ। नयाँ malware निरन्तर आइरहन्छ, त्यसैले कहिल्यै अपडेट नगरिएको स्क्यानर इन्स्टलपछि आएका सबैप्रति अन्धो हुन्छ। त्यसैले "antivirus राख्ने" मात्र आधा उत्तर हो — "र अपडेट गरिराख्ने" ले बाँकी आधा अंक दिन्छ।'
    }
  },
  {
    id: 'g10.hw.q023', subject: 'grade10/hardware', unit: 'u5',
    topic: 'display-fault', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: { en: 'A flat monitor shows a blurry, slightly stretched picture. What is the most likely cause?',
              ne: 'Flat monitor मा धमिलो र अलि तानिएको तस्बिर देखिन्छ। सबैभन्दा सम्भावित कारण के हो?' },
    options: [
      { en: 'The refresh rate is too low', ne: 'Refresh rate धेरै कम छ' },
      { en: 'The resolution is not set to the monitor\'s native value', ne: 'Resolution monitor को native मान मा सेट छैन' },
      { en: 'The video card is failing', ne: 'Video card बिग्रँदै छ' },
      { en: 'The colour depth is set to 24-bit', ne: 'Colour depth २४-bit मा छ' }
    ],
    answer: 1,
    explanation: {
      en: 'A flat panel has one native resolution and is sharp only at that setting; anything else is scaled to fit and goes soft, and a wrong aspect ratio also stretches the picture. Low refresh rate causes flicker, not blur. 24-bit colour depth is normal, not a fault.',
      ne: 'Flat panel को एउटै native resolution हुन्छ र त्यही सेटिङमा मात्र तीक्ष्ण हुन्छ; अरूमा अटाउन तानिन्छ र धमिलो हुन्छ, र गलत aspect ratio ले तस्बिर पनि तान्छ। कम refresh rate ले झिमझिम ल्याउँछ, धमिलोपन होइन। २४-bit colour depth सामान्य हो, खराबी होइन।'
    }
  },
  {
    id: 'g10.hw.q024', subject: 'grade10/hardware', unit: 'u5',
    topic: 'maintenance', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: { en: 'What should be used to remove dust from inside a computer case?',
              ne: 'कम्प्युटर केसभित्रको धुलो हटाउन के प्रयोग गर्नुपर्छ?' },
    options: [
      { en: 'A damp cloth', ne: 'भिजेको कपडा' },
      { en: 'Dry compressed air', ne: 'सुक्खा कम्प्रेस्ड एयर' },
      { en: 'A household vacuum cleaner', ne: 'घरायसी भ्याकुम क्लिनर' },
      { en: 'Soapy water on a brush', ne: 'ब्रसमा साबुनपानी' }
    ],
    answer: 1,
    explanation: {
      en: 'Dry compressed air removes dust without moisture and without generating static. A damp cloth or soapy water introduces moisture, which shorts and corrodes; a household vacuum builds a large static charge at its nozzle, which can destroy components outright.',
      ne: 'सुक्खा कम्प्रेस्ड एयरले चिस्यानबिना र static नबनाई धुलो हटाउँछ। भिजेको कपडा वा साबुनपानीले चिस्यान ल्याउँछ, जसले शर्ट र खिया गराउँछ; घरायसी भ्याकुमको नोजलमा ठूलो static चार्ज बन्छ, जसले पार्ट एकैचोटि नष्ट गर्न सक्छ।'
    }
  },

  /* ---------------- Unit 6 — Backup and recovery ---------------- */
  {
    id: 'g10.hw.q025', subject: 'grade10/hardware', unit: 'u6',
    topic: 'backup-methods', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: { en: 'A differential backup copies everything that has changed since which point?',
              ne: 'Differential backup ले कुन बिन्दुपछि बदलिएको सबै कपी गर्छ?' },
    options: [
      { en: 'The last backup of any kind', ne: 'जुनसुकै किसिमको अघिल्लो ब्याकअप' },
      { en: 'The last full backup', ne: 'अन्तिम full ब्याकअप' },
      { en: 'The start of the current month', ne: 'चालु महिनाको सुरु' },
      { en: 'The last successful restore', ne: 'अन्तिम सफल पुनर्स्थापना' }
    ],
    answer: 1,
    explanation: {
      en: 'Differential = since the last FULL backup, which is why each one grows larger than the last but a restore needs only two sets. Option 1 describes an incremental backup. Swapping these two reverses every answer about restore time, so it is worth learning as a pair.',
      ne: 'Differential = अन्तिम <b>FULL</b> ब्याकअपपछि — त्यसैले हरेक अघिल्लो भन्दा ठूलो हुँदै जान्छ तर फर्काउन दुई सेट मात्र चाहिन्छ। पहिलो विकल्पले incremental वर्णन गर्छ। यी दुई साट्दा फर्काउने समयसम्बन्धी हरेक उत्तर उल्टिन्छ, त्यसैले जोडी बनाएरै सिक्नु राम्रो।'
    }
  },
  {
    id: 'g10.hw.q026', subject: 'grade10/hardware', unit: 'u6',
    topic: 'backup-methods', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: { en: 'A full backup runs Monday and incrementals run Tuesday to Friday. The disk fails Friday night. How many sets are needed to restore?',
              ne: 'सोमबार full ब्याकअप र मंगलबारदेखि शुक्रबारसम्म incremental चल्छ। शुक्रबार राति डिस्क बिग्रियो। फर्काउन कति सेट चाहिन्छ?' },
    options: [
      { en: 'One — Friday\'s', ne: 'एउटा — शुक्रबारको' },
      { en: 'Two — Monday\'s and Friday\'s', ne: 'दुई — सोमबार र शुक्रबारको' },
      { en: 'Five — Monday\'s plus all four incrementals', ne: 'पाँच — सोमबारको र चारै incremental' },
      { en: 'Four — the incrementals only', ne: 'चार — incremental मात्र' }
    ],
    answer: 2,
    explanation: {
      en: 'Each incremental holds only what changed since the previous backup, so the chain must be replayed in order: Monday\'s full set, then Tuesday, Wednesday, Thursday and Friday. That is five. Option 2 would be right for a DIFFERENTIAL scheme — which is exactly the trade differential buys with its larger daily sets.',
      ne: 'हरेक incremental मा अघिल्लो ब्याकअपपछि बदलिएको मात्र हुन्छ, त्यसैले शृंखला क्रमैसँग लगाउनुपर्छ: सोमबारको full, अनि मंगल, बुध, बिहीबार र शुक्रबार। जम्मा पाँच। दोस्रो विकल्प <b>DIFFERENTIAL</b> योजनाका लागि सही हुन्थ्यो — differential ले ठूला दैनिक सेटको बदलामा किन्ने कुरा ठ्याक्कै त्यही हो।'
    }
  },
  {
    id: 'g10.hw.q027', subject: 'grade10/hardware', unit: 'u6',
    topic: 'raid', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: { en: 'What is the minimum number of disks required for RAID 5?',
              ne: 'RAID 5 लाई न्यूनतम कति डिस्क चाहिन्छ?' },
    options: [
      { en: 'Two', ne: 'दुई' },
      { en: 'Three', ne: 'तीन' },
      { en: 'Four', ne: 'चार' },
      { en: 'Five', ne: 'पाँच' }
    ],
    answer: 1,
    explanation: {
      en: 'RAID 5 stripes data with parity spread across the disks, and the parity has to live somewhere other than the data it protects — so three is the minimum. RAID 0 and RAID 1 both need two.',
      ne: 'RAID 5 ले parity सबै डिस्कमा फैलाएर striping गर्छ, र parity ले जोगाउने data भन्दा अन्तै बस्नुपर्छ — त्यसैले न्यूनतम तीन। RAID 0 र RAID 1 दुवैलाई दुई चाहिन्छ।'
    }
  },
  {
    id: 'g10.hw.q028', subject: 'grade10/hardware', unit: 'u6',
    topic: 'raid', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: { en: 'A server uses RAID 1. A user deletes an important folder by mistake. Can it be recovered from the array?',
              ne: 'सर्भरमा RAID 1 छ। प्रयोगकर्ताले भुलवश महत्त्वपूर्ण फोल्डर मेट्छ। के array बाट फर्काउन सकिन्छ?' },
    options: [
      { en: 'Yes — the mirror disk still holds it', ne: 'सकिन्छ — mirror डिस्कमा अझै छ' },
      { en: 'No — the deletion was written to both disks at once', ne: 'सकिँदैन — मेटाइ एकैचोटि दुवै डिस्कमा लेखियो' },
      { en: 'Yes, if done within 24 hours', ne: 'सकिन्छ, २४ घण्टाभित्र गरे' },
      { en: 'Only by rebuilding the array', ne: 'Array पुनर्निर्माण गरेर मात्र' }
    ],
    answer: 1,
    explanation: {
      en: 'Mirroring copies every write to both disks, and a deletion is a write. Both lose the folder in the same instant. RAID protects against a DISK failing — a mechanical event. It gives no protection against deletion, corruption, a virus or ransomware, because to the array those are ordinary valid writes. Only a separate backup recovers this.',
      ne: 'Mirroring ले हरेक लेखाइ दुवै डिस्कमा सार्छ, र मेटाइ पनि लेखाइ हो। दुवैले एकै क्षणमा फोल्डर गुमाउँछन्। RAID ले <b>डिस्क</b> बिग्रिनु — यान्त्रिक घटना — बाट जोगाउँछ। मेटाइ, बिग्रिनु, भाइरस वा ransomware बाट जोगाउँदैन, किनकि array का लागि ती साधारण वैध लेखाइ हुन्। छुट्टै ब्याकअपले मात्र यो फर्काउँछ।'
    }
  },
  {
    id: 'g10.hw.q029', subject: 'grade10/hardware', unit: 'u6',
    topic: 'rotation', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: { en: 'In grandfather–father–son rotation, what does "son" refer to?',
              ne: 'Grandfather–father–son rotation मा "son" ले केलाई जनाउँछ?' },
    options: [
      { en: 'The monthly backup', ne: 'मासिक ब्याकअप' },
      { en: 'The weekly backup', ne: 'साप्ताहिक ब्याकअप' },
      { en: 'The daily backup', ne: 'दैनिक ब्याकअप' },
      { en: 'The off-site copy', ne: 'अर्को ठाउँको प्रतिलिपि' }
    ],
    answer: 2,
    explanation: {
      en: 'Son = daily, father = weekly, grandfather = monthly, oldest generation last. Keeping several generations is what protects against damage that is noticed late — if only one daily set existed and it were overwritten each day, every copy you hold would contain the same corruption.',
      ne: 'Son = दैनिक, father = साप्ताहिक, grandfather = मासिक — सबैभन्दा पुरानो पुस्ता अन्तिम। धेरै पुस्ता राख्नुले ढिलो थाहा हुने क्षतिबाट जोगाउँछ — दैनिक एउटै सेट भई हरेक दिन ओभरराइट भइरहे तपाईंसँग भएका सबै प्रतिलिपिमा उही बिग्रिने कुरा हुन्थ्यो।'
    }
  },
  {
    id: 'g10.hw.q030', subject: 'grade10/hardware', unit: 'u6',
    topic: 'recovery', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: { en: 'A bad driver update has made Windows unstable, but no personal files are missing. Which recovery technique fits best?',
              ne: 'खराब driver अपडेटले Windows अस्थिर बनायो, तर कुनै व्यक्तिगत फाइल हराएको छैन। कुन recovery उपाय सबैभन्दा मिल्छ?' },
    options: [
      { en: 'System restore point', ne: 'System restore point' },
      { en: 'Data recovery software', ne: 'Data recovery सफ्टवेयर' },
      { en: 'Professional clean-room recovery', ne: 'व्यावसायिक clean-room रिकभरी' },
      { en: 'Rebuilding the RAID array', ne: 'RAID array पुनर्निर्माण' }
    ],
    answer: 0,
    explanation: {
      en: 'A system restore point rolls the operating system\'s settings and drivers back to an earlier state, which is exactly the problem here. Data recovery software is for deleted files — none are missing. Clean-room recovery is for physical drive damage, and a RAID rebuild is for a failed disk; neither applies.',
      ne: 'System restore point ले अपरेटिङ सिस्टमका सेटिङ र driver अघिल्लो अवस्थामा फर्काउँछ — यहाँको समस्या ठ्याक्कै त्यही हो। Data recovery सफ्टवेयर मेटिएका फाइलका लागि हो — यहाँ केही हराएको छैन। Clean-room रिकभरी भौतिक क्षतिका लागि, र RAID rebuild बिग्रेको डिस्कका लागि; दुवै लागू हुँदैनन्।'
    }
  }
];
