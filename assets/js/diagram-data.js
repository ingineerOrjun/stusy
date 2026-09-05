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
