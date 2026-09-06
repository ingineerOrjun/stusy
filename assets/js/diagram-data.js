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
