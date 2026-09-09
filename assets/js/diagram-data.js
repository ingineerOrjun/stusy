/* GENERATED from _source/diagrams.js — do not edit by hand. */
DiagramRuntime.register("ctorOrder", {
  "intro": {
    "en": "One Puppy object is about to be created. Press Next and watch the ORDER.",
    "ne": "एउटा Puppy अब्जेक्ट बन्न लागेको छ। Next थिच्नुहोस् र क्रम हेर्नुहोस्।"
  },
  "steps": [
    {
      "show": "#ctor-1",
      "focus": "#cls-animal",
      "en": "Animal() runs first — the top-most base class is always constructed first.",
      "ne": "पहिले Animal() चल्छ — सबैभन्दा माथिको base क्लास सधैं पहिले बन्छ।"
    },
    {
      "show": "#ctor-2",
      "focus": "#cls-dog",
      "hide": "#cls-animal",
      "en": "Dog() runs second, once its own base is ready.",
      "ne": "आफ्नो base तयार भएपछि दोस्रोमा Dog() चल्छ।"
    },
    {
      "show": "#ctor-3",
      "focus": "#cls-puppy",
      "hide": "#cls-dog",
      "en": "Puppy() runs last. The object is now completely built.",
      "ne": "अन्तिममा Puppy() चल्छ। अब अब्जेक्ट पूरै तयार भयो।"
    },
    {
      "show": "#dtor-1",
      "focus": "#cls-puppy",
      "en": "Now it is destroyed. ~Puppy() runs FIRST — the most derived class goes first.",
      "ne": "अब नष्ट हुँदैछ। पहिले ~Puppy() चल्छ — सबैभन्दा तलको derived क्लास पहिले जान्छ।"
    },
    {
      "show": "#dtor-2",
      "focus": "#cls-dog",
      "hide": "#cls-puppy",
      "en": "~Dog() runs second.",
      "ne": "दोस्रोमा ~Dog() चल्छ।"
    },
    {
      "show": [
        "#dtor-3",
        "#verdict"
      ],
      "focus": "#cls-animal",
      "hide": "#cls-dog",
      "en": "~Animal() runs last. Destruction is the exact reverse of construction — this is the exam answer.",
      "ne": "अन्तिममा ~Animal() चल्छ। नष्ट हुने क्रम बन्ने क्रमको ठ्याक्कै उल्टो हो — परीक्षाको उत्तर यही हो।"
    }
  ]
});

DiagramRuntime.register("dispatch", {
  "intro": {
    "en": "The same line p->draw() is about to run twice. Watch where it ends up.",
    "ne": "उही लाइन p->draw() दुई पटक चल्न लागेको छ। कहाँ पुग्छ हेर्नुहोस्।"
  },
  "steps": [
    {
      "focus": "#ptr",
      "en": "p is a Shape pointer. Its declared type never changes — only what it points at.",
      "ne": "p एउटा Shape पोइन्टर हो। यसको घोषित प्रकार बदलिँदैन — केवल यसले देखाउने वस्तु बदलिन्छ।"
    },
    {
      "show": "#link-c",
      "focus": [
        "#ptr",
        "#obj-c"
      ],
      "en": "p = &c — the pointer now holds the address of a Circle object.",
      "ne": "p = &c — अब पोइन्टरसँग Circle अब्जेक्टको ठेगाना छ।"
    },
    {
      "show": "#call-c",
      "hide": "#ptr",
      "en": "p->draw() runs. Because draw() is virtual, C++ looks at the OBJECT and calls Circle::draw().",
      "ne": "p->draw() चल्यो। draw() virtual भएकाले C++ ले अब्जेक्ट हेरेर Circle::draw() बोलायो।"
    },
    {
      "show": "#link-s",
      "hide": [
        "#obj-c",
        "#link-c",
        "#call-c"
      ],
      "focus": [
        "#ptr",
        "#obj-s"
      ],
      "en": "p = &s — the SAME pointer, now pointing at a Square.",
      "ne": "p = &s — उही पोइन्टर, अब Square तिर देखाइरहेको।"
    },
    {
      "show": "#call-s",
      "hide": "#ptr",
      "en": "The identical line p->draw() now calls Square::draw(). The line did not change — the object did.",
      "ne": "उही लाइन p->draw() ले अब Square::draw() बोलायो। लाइन बदलिएन — अब्जेक्ट बदलियो।"
    },
    {
      "show": "#rule",
      "en": "This only happens because draw() is virtual. Without it, C++ would decide from the pointer type at compile time.",
      "ne": "यो draw() virtual भएकाले मात्र हुन्छ। नभए C++ ले पोइन्टरको प्रकार हेरेर कम्पाइल गर्दै निर्णय गर्थ्यो।"
    }
  ]
});

DiagramRuntime.register("deMorgan", {
  "intro": {
    "en": "De Morgan’s first law. Press Next to see a NAND turn into an OR with inverted inputs — and then check it against the truth table.",
    "ne": "डी–मर्गनको पहिलो नियम। NAND कसरी उल्टो इनपुट भएको OR बन्छ हेर्न Next थिच्नुहोस् — अनि ट्रुथ टेबलले जाँच्नुहोस्।"
  },
  "steps": [
    {
      "focus": "#dm-left",
      "en": "Start with NAND. The AND happens first, and the small circle on the nose inverts the answer afterwards.",
      "ne": "NAND बाट सुरु गरौं। पहिले AND हुन्छ, अनि नाकको सानो गोलोले उत्तर उल्टाइदिन्छ।"
    },
    {
      "show": "#dm-bar",
      "focus": "#dm-left",
      "en": "That circle is what the bar in (A · B)′ means: invert the whole result.",
      "ne": "त्यही गोलो नै (A · B)′ माथिको बारको अर्थ हो — पूरै नतिजा उल्टाउनु।"
    },
    {
      "show": [
        "#dm-bar",
        "#dm-rule"
      ],
      "en": "De Morgan says you may break the bar and move it onto each letter — but when the bar breaks, the sign flips: · becomes +.",
      "ne": "डी–मर्गनका अनुसार बारलाई फुटाएर हरेक अक्षरमाथि लैजान सकिन्छ — तर बार फुट्दा चिन्ह बदलिन्छ: · को साटो + हुन्छ।"
    },
    {
      "show": [
        "#dm-rule",
        "#dm-right"
      ],
      "focus": "#dm-right",
      "en": "So the same circuit can be drawn the other way round: invert A and B first, then OR them.",
      "ne": "त्यसैले उही सर्किट अर्को तरिकाले पनि बनाउन सकिन्छ: पहिले A र B लाई उल्टाउने, अनि OR गर्ने।"
    },
    {
      "show": [
        "#dm-rule",
        "#dm-right",
        "#dm-table"
      ],
      "focus": "#dm-table",
      "en": "Proof: for all four input combinations the two columns are identical. Equal truth tables mean equal circuits.",
      "ne": "प्रमाण: चारै इनपुट जोडीमा दुवै स्तम्भ उस्तै छन्। ट्रुथ टेबल उस्तै भयो भने सर्किट पनि उस्तै हो।"
    }
  ]
});

DiagramRuntime.register("twosComplement", {
  "intro": {
    "en": "Two stages, in order. Press Next to invert every bit, then add 1 — and see why a computer can subtract using an adder.",
    "ne": "क्रमैसँग दुई चरण। हरेक बिट उल्टाउन र त्यसपछि 1 जोड्न Next थिच्नुहोस् — अनि कम्प्युटरले adder ले नै किन घटाउन सक्छ बुझ्नुहोस्।"
  },
  "steps": [
    {
      "focus": "#tc-orig",
      "en": "Start with 0101, which is 5 in decimal. It has four bits, so every answer will have four bits too.",
      "ne": "0101 बाट सुरु गरौं, जुन दशमलवमा 5 हो। यसमा चार बिट भएकाले उत्तर पनि चार बिटकै हुनेछ।"
    },
    {
      "show": "#tc-ones",
      "focus": "#tc-ones",
      "en": "Step 1 is the 1's complement: flip every bit. Each 0 becomes 1 and each 1 becomes 0, which gives 1010. Nothing has been added yet.",
      "ne": "पहिलो चरण 1's complement हो: हरेक बिट उल्टाउने। 0 भए 1, 1 भए 0 — 1010 आयो। अहिलेसम्म केही जोडिएको छैन।"
    },
    {
      "show": [
        "#tc-ones",
        "#tc-add"
      ],
      "focus": "#tc-add",
      "en": "Step 2 adds 1 to that result: 1010 + 1 = 1011. That is the 2's complement of 0101. The whole rule is: invert, then add one.",
      "ne": "दोस्रो चरणमा त्यसमा 1 जोड्ने: 1010 + 1 = 1011। यही 0101 को 2's complement हो। पूरा नियम — उल्टाउने, अनि एक जोड्ने।"
    },
    {
      "show": [
        "#tc-ones",
        "#tc-add",
        "#tc-why"
      ],
      "focus": "#tc-why",
      "en": "This is why it is worth learning: a computer subtracts by adding the 2’s complement, so a single adder circuit performs both addition and subtraction.",
      "ne": "यही कारण यो सिक्नु महत्त्वपूर्ण छ: कम्प्युटरले 2’s complement जोडेर घटाउँछ, त्यसैले एउटै adder सर्किटले जोड र घटाउ दुवै गर्छ।"
    }
  ]
});

DiagramRuntime.register("simplify", {
  "intro": {
    "en": "Simplifying AB + AB′ + A′B one law at a time. Each step names the law it uses — that naming is what an exam answer must show.",
    "ne": "AB + AB′ + A′B लाई एक–एक नियम प्रयोग गरेर सरल बनाउँदै। हरेक चरणले प्रयोग गरेको नियमको नाम दिन्छ — परीक्षाको उत्तरमा त्यही देखाउनुपर्छ।"
  },
  "steps": [
    {
      "focus": "#sm-0",
      "en": "Start with F = AB + AB′ + A′B. Three product terms, each needing its own AND gate.",
      "ne": "F = AB + AB′ + A′B बाट सुरु। तीन product पद, हरेकलाई आफ्नै AND गेट चाहिन्छ।"
    },
    {
      "show": "#sm-1",
      "focus": "#sm-1",
      "en": "The first two terms both contain A, so take it outside the bracket. This is the distributive law, used backwards.",
      "ne": "पहिलो दुई पदमा A छ, त्यसैले A लाई कोष्ठक बाहिर निकाल्नुहोस्। यो distributive नियम उल्टो तरिकाले प्रयोग गरेको हो।"
    },
    {
      "show": [
        "#sm-1",
        "#sm-2"
      ],
      "focus": "#sm-2",
      "en": "B + B′ is 1 — a variable ORed with its own complement always is. That is the complement law.",
      "ne": "B + B′ सधैं 1 हुन्छ — कुनै चललाई त्यसकै पूरकसँग OR गर्दा सधैं 1 आउँछ। यही complement नियम हो।"
    },
    {
      "show": [
        "#sm-1",
        "#sm-2",
        "#sm-3"
      ],
      "focus": "#sm-3",
      "en": "A · 1 is just A (identity law), leaving A + A′B, which absorption reduces to A + B. Three terms became two variables.",
      "ne": "A · 1 भनेको A नै हो (identity नियम), बाँकी रह्यो A + A′B, जसलाई absorption ले A + B बनाइदिन्छ। तीन पद घटेर दुई चल भयो।"
    }
  ]
});

DiagramRuntime.register("rippleCarry", {
  "intro": {
    "en": "A 4-bit adder is four full adders in a row. Press Next to follow the carry as it ripples from the rightmost column to the leftmost.",
    "ne": "४-बिट adder भनेको लहरै राखिएका चार full adder हुन्। क्यारी दायाँबाट बायाँ कसरी सर्दै जान्छ हेर्न Next थिच्नुहोस्।"
  },
  "steps": [
    {
      "focus": "#fa-0",
      "en": "The rightmost stage, FA 0, adds A0 and B0 with a carry-in of 0. It can start immediately — nothing is waiting on it.",
      "ne": "सबैभन्दा दायाँको FA 0 ले A0 र B0 लाई क्यारी-इन 0 सँग जोड्छ। यसले तुरुन्तै सुरु गर्न सक्छ — कसैलाई कुर्नु पर्दैन।"
    },
    {
      "show": "#carry-0",
      "focus": "#fa-1",
      "en": "FA 0 produces a carry, which becomes the carry-in of FA 1. Only now can FA 1 finish its own sum.",
      "ne": "FA 0 ले क्यारी बनायो, जुन FA 1 को क्यारी-इन बन्छ। अब मात्र FA 1 ले आफ्नो जोड टुङ्ग्याउन सक्छ।"
    },
    {
      "show": [
        "#carry-0",
        "#carry-1"
      ],
      "focus": "#fa-2",
      "en": "The same handover happens again into FA 2. Each stage adds its own small delay on top of the one before it.",
      "ne": "उही हस्तान्तरण FA 2 मा फेरि हुन्छ। हरेक चरणले अघिल्लोमाथि आफ्नै थोरै ढिलाइ थप्छ।"
    },
    {
      "show": [
        "#carry-0",
        "#carry-1",
        "#carry-2"
      ],
      "focus": "#fa-3",
      "en": "FA 3 is last, so it waits the longest. This accumulating wait is why the design is called a RIPPLE carry adder.",
      "ne": "FA 3 अन्तिम भएकाले सबैभन्दा बढी कुर्छ। यही थुप्रिने प्रतीक्षाकै कारण यसलाई RIPPLE carry adder भनिन्छ।"
    },
    {
      "show": [
        "#carry-0",
        "#carry-1",
        "#carry-2",
        "#carry-out"
      ],
      "focus": "#carry-out",
      "en": "The final carry leaves the adder as Cout. Four inputs bits plus four more produce five output bits in total.",
      "ne": "अन्तिम क्यारी Cout भएर बाहिर निस्कन्छ। चार-चार बिटका दुई इनपुटले जम्मा पाँच बिटको आउटपुट दिन्छन्।"
    }
  ]
});

DiagramRuntime.register("dbArchitecture", {
  "intro": {
    "en": "Three levels, and what each one hides.",
    "ne": "तीन तह, र हरेकले के लुकाउँछ।"
  },
  "steps": [
    {
      "show": "#arch-3",
      "focus": "#arch-3",
      "en": "Start at the bottom. The INTERNAL level is how the data physically sits on the disk — files, blocks, indexes.",
      "ne": "तलबाट सुरु। INTERNAL तह भनेको डिस्कमा डाटा भौतिक रूपमा कसरी बस्छ — फाइल, ब्लक, इन्डेक्स।"
    },
    {
      "show": "#arch-2",
      "focus": "#arch-2",
      "en": "Above it, the CONCEPTUAL level says WHAT data exists and how it relates — the tables and keys. It does not care how the disk stores them.",
      "ne": "माथि CONCEPTUAL तहले कुन डाटा छ र कसरी सम्बन्धित छ भन्छ — तालिका र कुञ्जी। डिस्कले कसरी राख्छ भन्ने वास्ता गर्दैन।"
    },
    {
      "show": "#arch-1",
      "focus": "#arch-1",
      "en": "At the top, the EXTERNAL level is what each user sees. A teacher sees marks; a clerk sees addresses. Neither sees the whole database.",
      "ne": "सबैभन्दा माथि EXTERNAL तह — हरेक प्रयोगकर्ताले देख्ने कुरा। शिक्षकले अंक, कर्मचारीले ठेगाना। कसैले पूरै डाटाबेस देख्दैन।"
    },
    {
      "show": "#arch-4",
      "focus": "#arch-4",
      "en": "The gaps between the levels are DATA INDEPENDENCE. Change the disk storage and the tables do not change; change a table and a user's view can stay the same.",
      "ne": "तहबीचका खाली ठाउँ नै DATA INDEPENDENCE हुन्। डिस्क भण्डारण बदल्दा तालिका बदलिँदैन; तालिका बदल्दा प्रयोगकर्ताको view उही रहन सक्छ।"
    }
  ]
});

DiagramRuntime.register("erToRelational", {
  "intro": {
    "en": "Turning an ER diagram into tables, one rule at a time.",
    "ne": "ER चित्रलाई तालिकामा बदल्ने — एक पटकमा एउटा नियम।"
  },
  "steps": [
    {
      "show": "#e2r-1",
      "focus": "#e2r-1",
      "en": "Start from the ER diagram: two entities and one relationship, many-to-many.",
      "ne": "ER चित्रबाट सुरु: दुई इन्टिटी र एउटा सम्बन्ध, धेरै–धेरै।"
    },
    {
      "show": "#e2r-2",
      "focus": "#e2r-2",
      "en": "Rule 1: every entity becomes a table. STUDENT becomes Student, and its key attribute becomes the primary key.",
      "ne": "नियम १: हरेक इन्टिटी तालिका बन्छ। STUDENT बाट Student, र यसको कुञ्जी एट्रिब्युट प्राथमिक कुञ्जी बन्छ।"
    },
    {
      "show": "#e2r-3",
      "focus": "#e2r-3",
      "en": "The same rule again for COURSE. Every attribute becomes a column.",
      "ne": "COURSE लाई पनि उही नियम। हरेक एट्रिब्युट स्तम्भ बन्छ।"
    },
    {
      "show": "#e2r-4",
      "focus": "#e2r-4",
      "en": "Rule 2: a MANY-TO-MANY relationship becomes a table of its own, holding the primary key of each side as a foreign key. This third table is the one students forget.",
      "ne": "नियम २: धेरै–धेरै सम्बन्ध आफैं एउटा तालिका बन्छ, जसमा दुवैतर्फको प्राथमिक कुञ्जी foreign key भएर बस्छ। विद्यार्थीले बिर्सने तेस्रो तालिका यही हो।"
    }
  ]
});

DiagramRuntime.register("normalForms", {
  "intro": {
    "en": "One badly designed table, normalised to 3NF step by step.",
    "ne": "नराम्रो डिजाइनको एउटा तालिकालाई चरण–चरणमा 3NF सम्म।"
  },
  "steps": [
    {
      "show": "#nf-0",
      "focus": "#nf-0",
      "en": "The starting table has two faults: one cell holds two subjects, and class_room is repeated on every row of the same class.",
      "ne": "सुरुको तालिकामा दुई दोष छन्: एउटै कक्षमा दुई विषय, र उही कक्षाका हरेक पङ्क्तिमा class_room दोहोरिन्छ।"
    },
    {
      "show": "#nf-1",
      "focus": "#nf-1",
      "en": "1NF: make every cell hold ONE value. Split the subject list into separate rows. The repeating group is gone.",
      "ne": "1NF: हरेक कक्षमा एउटै मान राख्नुहोस्। विषयको सूचीलाई छुट्टै पङ्क्तिमा बाँड्नुहोस्। दोहोरिने समूह हट्यो।"
    },
    {
      "show": "#nf-2",
      "focus": "#nf-2",
      "en": "2NF: the key is now (id, subject), but name depends on id alone — a PARTIAL dependency. Split it out into two tables.",
      "ne": "2NF: कुञ्जी अब (id, subject) हो, तर name id मा मात्र निर्भर छ — PARTIAL निर्भरता। दुई तालिकामा छुट्याउनुहोस्।"
    },
    {
      "show": "#nf-3",
      "focus": "#nf-3",
      "en": "3NF: class_room depends on class_id, which depends on id — a TRANSITIVE dependency. Move it to its own Class table. Now every column depends on the key, the whole key, and nothing but the key.",
      "ne": "3NF: class_room, class_id मा निर्भर छ र class_id, id मा — TRANSITIVE निर्भरता। छुट्टै Class तालिकामा सार्नुहोस्। अब हरेक स्तम्भ कुञ्जीमा मात्र निर्भर हुन्छ।"
    }
  ]
});

DiagramRuntime.register("txnStates", {
  "intro": {
    "en": "A transaction from start to finish, including the path that fails.",
    "ne": "ट्रान्ज्याक्सन सुरुदेखि अन्त्यसम्म, असफल हुने बाटोसहित।"
  },
  "steps": [
    {
      "show": "#tx-1",
      "focus": "#tx-1",
      "en": "ACTIVE — the transaction has started and its statements are running.",
      "ne": "ACTIVE — ट्रान्ज्याक्सन सुरु भयो र यसका कथन चलिरहेका छन्।"
    },
    {
      "show": "#tx-2",
      "focus": "#tx-2",
      "en": "PARTIALLY COMMITTED — the last statement has run, but the changes are not yet safely on disk.",
      "ne": "PARTIALLY COMMITTED — अन्तिम कथन चल्यो, तर परिवर्तन अझै डिस्कमा सुरक्षित छैन।"
    },
    {
      "show": "#tx-3",
      "focus": "#tx-3",
      "en": "COMMITTED — the changes are permanent. This is the only state that keeps the work, and durability is the promise that a crash now cannot undo it.",
      "ne": "COMMITTED — परिवर्तन स्थायी भयो। काम बाँच्ने एउटै अवस्था यही हो, र अब crash भए पनि नहराओस् भन्ने वचन नै durability हो।"
    },
    {
      "show": "#tx-4",
      "focus": "#tx-4",
      "en": "FAILED — something went wrong, at any point. A transaction can fail from ACTIVE or from PARTIALLY COMMITTED.",
      "ne": "FAILED — जुनसुकै बेला केही बिग्रियो। ACTIVE वा PARTIALLY COMMITTED दुवैबाट असफल हुन सक्छ।"
    },
    {
      "show": "#tx-5",
      "focus": "#tx-5",
      "en": "ABORTED — the database rolls back every change the transaction made, so it is as if it never ran. That is atomicity doing its job.",
      "ne": "ABORTED — डाटाबेसले ट्रान्ज्याक्सनले गरेका सबै परिवर्तन फिर्ता लैजान्छ, चलेकै थिएन जस्तो। atomicity ले गर्ने काम यही हो।"
    }
  ]
});

DiagramRuntime.register("recoveryLog", {
  "intro": {
    "en": "The log, and the two directions recovery runs in.",
    "ne": "लग, र रिकभरी चल्ने दुई दिशा।"
  },
  "steps": [
    {
      "show": "#rc-1",
      "focus": "#rc-1",
      "en": "The log records every action in order. T1 committed; T2 had written but not committed when the crash came.",
      "ne": "लगले हरेक काम क्रमैसँग लेख्छ। T1 commit भयो; T2 ले लेखेको थियो तर commit हुनुअघि नै crash भयो।"
    },
    {
      "show": "#rc-2",
      "focus": "#rc-2",
      "en": "REDO reads forwards and replays every transaction that has a COMMIT record. T1 promised durability, so its work is put back.",
      "ne": "REDO ले अगाडि पढ्दै COMMIT भएका सबै ट्रान्ज्याक्सन फेरि चलाउँछ। T1 ले durability को वचन दिएको थियो, त्यसैले काम फर्किन्छ।"
    },
    {
      "show": "#rc-3",
      "focus": "#rc-3",
      "en": "UNDO reads backwards and rolls back every transaction with no COMMIT record. T2 is erased completely — atomicity means half of it may not survive.",
      "ne": "UNDO ले पछाडि पढ्दै COMMIT नभएका सबै फिर्ता लैजान्छ। T2 पूरै मेटिन्छ — atomicity को अर्थ आधा काम बाँच्न पाउँदैन भन्ने हो।"
    }
  ]
});

DiagramRuntime.register("hwPnJunction", {
  "intro": {
    "en": "A PN junction forming, then the same junction under forward and reverse bias.",
    "ne": "PN junction बन्ने क्रम, अनि उही junction लाई forward र reverse bias मा।"
  },
  "steps": [
    {
      "show": "#pn-p",
      "focus": "#pn-p",
      "en": "Start apart. The P-type block has holes as its majority carrier — and it is electrically neutral.",
      "ne": "छुट्टै सुरु गरौं। P-type खण्डको बहुसंख्यक वाहक hole हो — र यो विद्युतीय रूपमा उदासीन छ।"
    },
    {
      "show": "#pn-n",
      "focus": "#pn-n",
      "en": "The N-type block has free electrons as its majority carrier, and it is neutral too.",
      "ne": "N-type खण्डको बहुसंख्यक वाहक स्वतन्त्र electron हो, र यो पनि उदासीन छ।"
    },
    {
      "show": "#pn-dep",
      "focus": "#pn-dep",
      "en": "Join them. Electrons cross over and fill holes near the join, so that strip is left with no free carriers — the depletion region.",
      "ne": "जोड्नुहोस्। Electron पारि गएर जोडनेर का hole भर्छन्, त्यसैले त्यो पट्टीमा स्वतन्त्र वाहक बाँकी रहँदैन — यही depletion region हो।"
    },
    {
      "show": "#pn-barrier",
      "focus": "#pn-barrier",
      "en": "The exposed ions set up a barrier potential — about 0.7 V in silicon. It stops further crossing, so no current flows by itself.",
      "ne": "खुला भएका ion ले barrier potential बनाउँछन् — silicon मा करिब ०.७ V। यसले थप पार गर्न रोक्छ, त्यसैले आफैँ कुनै current बग्दैन।"
    },
    {
      "show": "#pn-fwd",
      "hide": "#pn-rev",
      "focus": "#pn-fwd",
      "en": "FORWARD BIAS: P to positive, N to negative. The supply pushes carriers toward the join, the depletion region narrows, and above 0.7 V current flows.",
      "ne": "FORWARD BIAS: P मा धनात्मक, N मा ऋणात्मक। सप्लाईले वाहकलाई जोडतिर धकेल्छ, depletion region साँघुरो हुन्छ, र ०.७ V माथि current बग्छ।"
    },
    {
      "show": "#pn-rev",
      "hide": "#pn-fwd",
      "focus": "#pn-rev",
      "en": "REVERSE BIAS: the connections swap. Carriers are pulled AWAY from the join, the depletion region widens, the barrier grows — and current stops. Same mechanism, opposite direction.",
      "ne": "REVERSE BIAS: जडान उल्टिन्छ। वाहकहरू जोडबाट टाढा तानिन्छन्, depletion region चौडा हुन्छ, barrier बढ्छ — र current रोकिन्छ। उही प्रक्रिया, उल्टो दिशा।"
    }
  ]
});

DiagramRuntime.register("hwHddRead", {
  "intro": {
    "en": "How a hard disk finds and reads one block of data.",
    "ne": "Hard disk ले data को एउटा ब्लक कसरी खोजेर पढ्छ।"
  },
  "steps": [
    {
      "show": "#hd-platter",
      "focus": "#hd-platter",
      "en": "The platter is a rigid magnetic disk, and it spins the whole time the drive is powered — typically 5400 or 7200 revolutions per minute.",
      "ne": "Platter एउटा कडा चुम्बकीय डिस्क हो, र ड्राइभमा बिजुली भएसम्म यो निरन्तर घुमिरहन्छ — सामान्यतया मिनेटमा ५४०० वा ७२०० पटक।"
    },
    {
      "show": "#hd-track",
      "focus": "#hd-track",
      "en": "The surface is divided into concentric rings called TRACKS. The same track on every platter, stacked, is called a cylinder.",
      "ne": "सतहलाई TRACK भनिने केन्द्रित रिङमा बाँडिएको हुन्छ। हरेक platter को उही track माथिमाथि राखिएको समूहलाई cylinder भनिन्छ।"
    },
    {
      "show": "#hd-sector",
      "focus": "#hd-sector",
      "en": "Each track is cut into SECTORS. A sector is the smallest unit the drive can read or write — traditionally 512 bytes.",
      "ne": "हरेक track लाई SECTOR मा काटिन्छ। ड्राइभले पढ्न वा लेख्न सक्ने सबैभन्दा सानो एकाइ sector हो — परम्परागत रूपमा ५१२ बाइट।"
    },
    {
      "show": "#hd-head",
      "focus": "#hd-head",
      "en": "The read-write head sits on an actuator arm and floats microns above the surface on a cushion of air. It never touches the platter — if it does, that is a head crash.",
      "ne": "Read-write head actuator arm मा हुन्छ र हावाको तकियामा सतहभन्दा माइक्रोन मात्र माथि तैरिन्छ। यसले platter छुँदैन — छोयो भने त्यो head crash हो।"
    },
    {
      "show": "#hd-seek",
      "focus": "#hd-seek",
      "en": "SEEK TIME: the arm swings the head to the right track. This is mechanical movement, which is why it is the slowest part of a read.",
      "ne": "SEEK TIME: arm ले head लाई ठीक track मा पुर्‍याउँछ। यो यान्त्रिक चाल हो — त्यसैले पढाइको सबैभन्दा ढिलो भाग यही हो।"
    },
    {
      "show": "#hd-rot",
      "focus": "#hd-rot",
      "en": "ROTATIONAL DELAY: the head is on the right track but the sector it wants has not come round yet, so it waits for the disk to bring it.",
      "ne": "ROTATIONAL DELAY: head ठीक track मा छ तर चाहिएको sector अझै आइपुगेको छैन, त्यसैले डिस्कले ल्याउन्जेल पर्खिन्छ।"
    },
    {
      "show": "#hd-xfer",
      "focus": "#hd-xfer",
      "en": "DATA TRANSFER: the sector passes under the head and the block is read into memory. Access time is all three added together — seek, rotation, transfer.",
      "ne": "DATA TRANSFER: sector head मुनिबाट जान्छ र ब्लक मेमोरीमा पढिन्छ। Access time भनेको तीनै वटाको योग हो — seek, rotation, transfer।"
    }
  ]
});

DiagramRuntime.register("hwBackupTypes", {
  "intro": {
    "en": "Full, incremental and differential backups across one working week.",
    "ne": "एउटा कार्य-हप्ताभरि full, incremental र differential backup।"
  },
  "steps": [
    {
      "show": "#bk-full",
      "focus": "#bk-full",
      "en": "A FULL backup copies everything, every time. Restoring is simple — you need one set — but it takes the longest and uses the most media.",
      "ne": "FULL backup ले हरेक पटक सबै कुरा कपी गर्छ। पुनर्स्थापना सजिलो — एउटै सेट चाहिन्छ — तर समय सबैभन्दा बढी लाग्छ र मिडिया पनि धेरै खपत हुन्छ।"
    },
    {
      "show": "#bk-inc",
      "focus": "#bk-inc",
      "en": "INCREMENTAL copies only what changed since the LAST backup of any kind. Each day is small and quick. But to restore Friday you need Monday's full set plus every increment in between — miss one and the chain is broken.",
      "ne": "INCREMENTAL ले जुनसुकै किसिमको <b>अघिल्लो</b> backup पछि बदलिएको मात्र कपी गर्छ। हरेक दिनको सानो र छिटो हुन्छ। तर शुक्रबार फर्काउन सोमबारको full सेट र बीचका सबै increment चाहिन्छन् — एउटा छुट्यो भने शृंखला टुट्छ।"
    },
    {
      "show": "#bk-diff",
      "focus": "#bk-diff",
      "en": "DIFFERENTIAL copies everything changed since the last FULL backup. Each day is bigger than the one before, but a restore needs exactly two sets: the full one and the most recent differential. That is the trade — more media for a simpler recovery.",
      "ne": "DIFFERENTIAL ले अन्तिम <b>FULL</b> backup पछि बदलिएको सबै कपी गर्छ। हरेक दिनको अघिल्लो भन्दा ठूलो हुन्छ, तर पुनर्स्थापनाका लागि ठ्याक्कै दुई सेट चाहिन्छ: full र सबैभन्दा पछिल्लो differential। सौदा यही हो — सजिलो रिकभरीका लागि बढी मिडिया।"
    }
  ]
});
