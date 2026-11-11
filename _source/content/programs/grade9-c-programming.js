/* ============================================================
   GRADE 9 · PROGRAMMING PRINCIPLES IN C — stepper programs

   THE DATA BEHIND runtime/sim-crun.js. Same shape as the question banks
   and the practice banks: content lives in _source/content, the build
   generates a registration call, and the runtime that consumes it never
   learns a subject's name.

   WHY IT IS HERE AND NOT IN THE COMPONENT
   Three reasons, and the first two are the ones that matter.

     · It is CONTENT. Fourteen C programs and a hundred and twenty
       bilingual captions are a curriculum artefact, and an author
       changing a caption should not be editing a runtime module.
     · Nepali written inside a runtime module reaches the review package
       by a different and weaker route than Nepali written in
       _source/content. Here, tools/nepali-review.js walks the exported
       value and attributes every caption to its unit.
     · And one practical reason: tests/language.test.js reconstructs the
       markup each runtime module emits by stitching its string
       literals together. A C listing is full of angle brackets, so
       `#include <stdio.h>` inside a runtime module was read as an HTML
       tag and the stitched stream became nonsense. Data has no such
       problem, because nothing tries to parse it as markup.

   THE SHAPE

     id      the key a lesson mounts with <div class="crun" data-program="…">
     title   bilingual, shown above the stepper
     code    the listing, one string per line, numbered from 1 on screen
     vars    the variables to show, in the order a student meets them
     stack   optional; true where a call stack is the thing being taught
     steps   line (1-based), set {var: value}, out (one console line),
             push / pop for the stack, and the bilingual caption
     output  what the finished program prints — declared SEPARATELY from
             the steps, so tests/grade9-c.test.js can compare the two

   A value in `set` is always a STRING, because what is being shown is
   what a student would write on paper: "garbage" and "?" are states a C
   variable genuinely has, and a number type could not hold them.

   NO COMPILER RAN. Every program here is complete and runnable C —
   headers, int main, return 0 — and every value in every step was
   worked out by hand against C semantics. No C compiler was available
   in the environment this was written in, so nothing below has been
   compiler-executed. See docs/GRADE-9-C-PROGRAMMING-CURRICULUM-MAP.md §6.
   ============================================================ */

module.exports = [

  /* ---- Unit 2 ---- */
  { id: 'helloWorld', subject: 'grade9/c-programming', unit: 'c-u2',
    title: { en: 'The smallest complete C program',
             ne: 'सबैभन्दा सानो पूरा C प्रोग्राम' },
    code: [
      '#include <stdio.h>',
      '',
      'int main()',
      '{',
      '    printf("HELLO WORLD!");',
      '    return 0;',
      '}'
    ],
    vars: [],
    output: ['HELLO WORLD!'],
    steps: [
      { line: 1,
        en: 'The preprocessor runs FIRST, before compiling. It copies the contents of stdio.h into this file, which is where printf is declared.',
        ne: 'Preprocessor compile हुनुअघि नै सबैभन्दा पहिले चल्छ। यसले stdio.h को सामग्री यही फाइलमा सार्छ, र printf त्यहीँ घोषित छ।' },
      { line: 3,
        en: 'Execution always begins at main, wherever main is written in the file. int in front says main will hand a number back to the operating system.',
        ne: 'फाइलमा main जहाँ लेखिए पनि चल्न सुरु main बाटै हुन्छ। अगाडिको int ले main ले operating system लाई एउटा सङ्ख्या फर्काउँछ भन्छ।' },
      { line: 5,
        out: 'HELLO WORLD!',
        en: 'printf sends the text between the quotes to the screen. There is no newline in it, so the next thing printed would continue on the same line.',
        ne: 'printf ले उद्धरणभित्रको पाठ पर्दामा पठाउँछ। यसमा newline छैन, त्यसैले अर्को कुरा छापिए उही लाइनमै जोडिन्थ्यो।' },
      { line: 6,
        en: 'return 0 ends main and reports success. Zero means the program finished normally; any other number would mean it did not.',
        ne: 'return 0 ले main सिध्याउँछ र सफलता जनाउँछ। शून्यको अर्थ प्रोग्राम सामान्य रूपमा सकियो; अरू कुनै सङ्ख्याको अर्थ सकिएन।' }
    ]
  },

  { id: 'readAdd', subject: 'grade9/c-programming', unit: 'c-u2',
    title: { en: 'Reading two numbers and adding them',
             ne: 'दुई सङ्ख्या पढेर जोड्ने' },
    code: [
      '#include <stdio.h>',
      '',
      'int main()',
      '{',
      '    int a, b, sum;',
      '',
      '    printf("Enter two numbers: ");',
      '    scanf("%d %d", &a, &b);',
      '',
      '    sum = a + b;',
      '    printf("Sum = %d", sum);',
      '    return 0;',
      '}'
    ],
    vars: ['a', 'b', 'sum'],
    output: ['Enter two numbers: ', '12 8', 'Sum = 20'],
    steps: [
      { line: 5, set: { a: 'garbage', b: 'garbage', sum: 'garbage' },
        en: 'Three integer variables are created. Declaring them does NOT give them a value — whatever was in that memory is still there, which is why it is shown as garbage.',
        ne: 'तीन integer variable बन्छन्। घोषणा गर्दैमा मान मिल्दैन — त्यो मेमोरीमा जे थियो त्यही रहन्छ, त्यसैले यहाँ garbage देखाइएको छ।' },
      { line: 7, out: 'Enter two numbers: ',
        en: 'A prompt is printed first. Without it the program waits with a blank screen and the user has no idea what is wanted.',
        ne: 'पहिले सङ्केत छापिन्छ। यो नभए प्रोग्राम खाली पर्दामा पर्खिरहन्छ र प्रयोगकर्तालाई के चाहिएको हो थाहै हुँदैन।' },
      { line: 8, set: { a: '12', b: '8' }, out: '12 8',
        en: 'scanf waits for the user. They type 12 and 8. The ampersands matter: scanf is given the ADDRESS of a and of b, because it has to put the values into them.',
        ne: 'scanf ले प्रयोगकर्ता कुर्छ। उसले 12 र 8 टाइप गर्छ। Ampersand महत्त्वपूर्ण छ: scanf लाई a र b का ठेगाना दिइन्छ, किनभने मान तिनैभित्र राख्नुपर्छ।' },
      { line: 10, set: { sum: '20' },
        en: 'The right side is worked out first and the result is stored in sum. The equals sign here is assignment, not equality.',
        ne: 'पहिले दायाँपट्टिको गणना हुन्छ र नतिजा sum मा राखिन्छ। यहाँको बराबर चिन्ह assignment हो, बराबर भन्ने होइन।' },
      { line: 11, out: 'Sum = 20',
        en: '%d is replaced by the value of sum. printf does not look at the variable to decide the format — it believes the specifier, which is why a wrong one prints nonsense rather than an error.',
        ne: '%d को ठाउँमा sum को मान आउँछ। printf ले ढाँचा तय गर्न variable हेर्दैन — specifier लाई नै पत्याउँछ, त्यसैले गलत specifier ले त्रुटि होइन बेकारको कुरा छाप्छ।' },
      { line: 12,
        en: 'main returns 0 and the program ends.',
        ne: 'main ले 0 फर्काउँछ र प्रोग्राम सकिन्छ।' }
    ]
  },

  { id: 'intDivide', subject: 'grade9/c-programming', unit: 'c-u2',
    title: { en: 'Integer division — the trap in / and %',
             ne: 'Integer division — / र % को पासो' },
    code: [
      '#include <stdio.h>',
      '',
      'int main()',
      '{',
      '    int total = 7, parts = 2;',
      '    int whole;',
      '    float share;',
      '',
      '    whole = total / parts;',
      '    share = total / parts;',
      '    printf("whole = %d\\n", whole);',
      '    printf("share = %.1f\\n", share);',
      '    printf("left over = %d\\n", total % parts);',
      '    return 0;',
      '}'
    ],
    vars: ['total', 'parts', 'whole', 'share'],
    output: ['whole = 3', 'share = 3.0', 'left over = 1'],
    steps: [
      { line: 5, set: { total: '7', parts: '2' },
        en: 'Two integers are declared and given values on the same line. Initialising at the point of declaration is normal C and avoids the garbage state entirely.',
        ne: 'दुई integer एउटै लाइनमा घोषणा गरेर मान पनि दिइयो। घोषणा गर्दै मान दिनु सामान्य C हो र garbage अवस्था नै आउँदैन।' },
      { line: 9, set: { whole: '3' },
        en: '7 / 2 between two integers is INTEGER division. The answer is 3 and the remainder is simply thrown away — it is not rounded, so 7/2 is 3 and not 4.',
        ne: 'दुई integer बीचको 7 / 2 integer division हो। उत्तर 3 आउँछ र शेष फालिन्छ — round हुँदैन, त्यसैले 7/2 को 3 हो, 4 होइन।' },
      { line: 10, set: { share: '3.0' },
        en: 'This is the line that surprises everybody. share is a float, but the DIVISION happened between two integers before the result reached it, so 3 is what gets stored. Making a float of the answer afterwards cannot bring back a remainder that was already discarded.',
        ne: 'सबैलाई अचम्म लाग्ने लाइन यही हो। share float हो, तर नतिजा त्यहाँ पुग्नुअघि नै भाग दुई integer बीच भइसक्यो, त्यसैले 3 नै भण्डारण हुन्छ। पछि float बनाएर पहिल्यै फालिएको शेष फिर्ता आउँदैन।' },
      { line: 11, out: 'whole = 3',
        en: 'The backslash-n inside the quotes is an escape sequence. It is two characters in the source and one newline on the screen.',
        ne: 'उद्धरणभित्रको backslash-n escape sequence हो। Source मा दुई अक्षर, पर्दामा एउटा नयाँ लाइन।' },
      { line: 12, out: 'share = 3.0',
        en: '%.1f asks for one digit after the point. Plain %f would have printed 3.000000, which is the same value shown less tidily.',
        ne: '%.1f ले दशमलवपछि एक अङ्क माग्छ। सादा %f ले 3.000000 छाप्थ्यो — उही मान, कम सफा।' },
      { line: 13, out: 'left over = 1',
        en: 'The modulus operator gives what division threw away: 7 = 2 x 3 + 1. Together, / and % tell you everything about an integer division.',
        ne: 'Modulus ले भागले फालेको कुरा दिन्छ: 7 = 2 x 3 + 1। / र % सँगै भए integer division बारे सबै थाहा हुन्छ।' }
    ]
  },

  /* ---- Unit 3 ---- */
  { id: 'ifElseGrade', subject: 'grade9/c-programming', unit: 'c-u3',
    title: { en: 'if, else if, else — only one branch runs',
             ne: 'if, else if, else — एउटै शाखा मात्र चल्छ' },
    code: [
      '#include <stdio.h>',
      '',
      'int main()',
      '{',
      '    int marks = 72;',
      '',
      '    if (marks >= 80)',
      '        printf("Distinction");',
      '    else if (marks >= 60)',
      '        printf("First division");',
      '    else',
      '        printf("Pass or fail");',
      '',
      '    return 0;',
      '}'
    ],
    vars: ['marks'],
    output: ['First division'],
    steps: [
      { line: 5, set: { marks: '72' },
        en: 'marks is set to 72. Changing this one value is how you test every branch of the chain, which is what a practical exercise on this unit asks you to do.',
        ne: 'marks लाई 72 राखियो। यही एउटा मान बदलेर शृंखलाका सबै शाखा जाँच्न सकिन्छ, र यस युनिटको प्रयोगात्मक अभ्यासले त्यही गर्न भन्छ।' },
      { line: 7,
        en: 'The first condition is tested: is 72 greater than or equal to 80? It is false, so the printf under it is skipped completely.',
        ne: 'पहिलो सर्त जाँचियो: 72 ले 80 भन्दा ठूलो वा बराबर हो? होइन, त्यसैले तलको printf पूरै छाडिन्छ।' },
      { line: 9,
        en: 'Because the first was false, the else if is tested next: is 72 at least 60? Yes. Note that the chain is only reached because the earlier test failed.',
        ne: 'पहिलो असत्य भएकाले अब else if जाँचिन्छ: 72 कम्तीमा 60 छ? छ। ध्यान दिनुहोस् — अघिल्लो जाँच असफल भएकैले यहाँसम्म आइपुगेको हो।' },
      { line: 10, out: 'First division',
        en: 'This branch runs and prints. The important part is what happens next: not the else, and not any further test.',
        ne: 'यो शाखा चल्छ र छाप्छ। मुख्य कुरा त्यसपछि के हुन्छ भन्ने हो: else होइन, र अरू कुनै जाँच पनि होइन।' },
      { line: 14,
        en: 'Control jumps straight past the else to the statement after the whole chain. Exactly ONE branch of an if-else chain ever runs, which is why a student who writes three separate ifs gets a different program.',
        ne: 'नियन्त्रण else नाघेर सिधै पूरै शृंखलापछिको statement मा पुग्छ। if-else शृंखलामा सधैं ठ्याक्कै एउटै शाखा चल्छ — त्यसैले तीन छुट्टाछुट्टै if लेख्ने विद्यार्थीको प्रोग्राम फरक हुन्छ।' }
    ]
  },

  { id: 'forSum', subject: 'grade9/c-programming', unit: 'c-u3',
    title: { en: 'A for loop, one turn at a time', ne: 'For loop, एक–एक पटक' },
    code: [
      '#include <stdio.h>',
      '',
      'int main()',
      '{',
      '    int i, sum = 0;',
      '',
      '    for (i = 1; i <= 5; i++)',
      '    {',
      '        sum = sum + i;',
      '    }',
      '',
      '    printf("Sum = %d", sum);',
      '    return 0;',
      '}'
    ],
    vars: ['i', 'sum'],
    output: ['Sum = 15'],
    steps: [
      { line: 5, set: { i: '?', sum: '0' },
        en: 'sum starts at 0. This is not decoration: if sum is left uninitialised, every addition below is adding to a value nobody knows.',
        ne: 'sum 0 बाट सुरु हुन्छ। यो सजावट होइन: sum लाई मान नदिए तलका हरेक जोडले कसैलाई थाहा नभएको मानमा जोडिरहेको हुन्छ।' },
      { line: 7, set: { i: '1' },
        en: 'The for line has three parts separated by semicolons. The FIRST part runs once only, right now: i becomes 1.',
        ne: 'For लाइनका तीन भाग semicolon ले छुट्याइएका छन्। पहिलो भाग एक पटक मात्र, अहिले चल्छ: i 1 हुन्छ।' },
      { line: 7,
        en: 'The SECOND part is the condition and it is tested before every turn: is 1 less than or equal to 5? True, so the body runs.',
        ne: 'दोस्रो भाग सर्त हो र हरेक पटकअघि जाँचिन्छ: 1 ले 5 भन्दा सानो वा बराबर हो? सत्य, त्यसैले body चल्छ।' },
      { line: 9, set: { sum: '1' },
        en: 'Turn 1: sum = 0 + 1 = 1. Read the line right to left — work out the right side, then store it on the left.',
        ne: 'पहिलो पटक: sum = 0 + 1 = 1। लाइन दायाँबाट बायाँ पढ्नुहोस् — पहिले दायाँको गणना, अनि बायाँमा भण्डारण।' },
      { line: 7, set: { i: '2' },
        en: 'The THIRD part runs at the end of every turn: i++ makes i 2. Then the condition is tested again — 2 is still at most 5.',
        ne: 'तेस्रो भाग हरेक पटकको अन्त्यमा चल्छ: i++ ले i लाई 2 बनाउँछ। अनि सर्त फेरि जाँचिन्छ — 2 अझै 5 भित्रै छ।' },
      { line: 9, set: { sum: '3' },
        en: 'Turn 2: sum = 1 + 2 = 3. Notice that sum is holding the running total, and i is holding the position. Two different jobs, two different variables.',
        ne: 'दोस्रो पटक: sum = 1 + 2 = 3। ध्यान दिनुहोस् — sum ले चल्दै गरेको जोड राख्छ, i ले स्थान। दुई फरक काम, दुई फरक variable।' },
      /* PHASE 14.1. Turns 3, 4 and 5 used to be one step each, which set
         i AND sum while line 9 was lit. The increment happens on line 7,
         and this program's whole job is to show WHERE each of the three
         parts of a for line runs — so on three of the five turns the
         stepper was contradicting its own step 5. Split, one step per
         thing that actually happens. */
      { line: 7, set: { i: '3' },
        en: 'i++ makes i 3. The condition is tested again and 3 is still at most 5, so the body runs once more.',
        ne: 'i++ ले i लाई 3 बनाउँछ। सर्त फेरि जाँचिन्छ र 3 अझै 5 भित्रै छ, त्यसैले body फेरि चल्छ।' },
      { line: 9, set: { sum: '6' },
        en: 'Turn 3: sum = 3 + 3 = 6.',
        ne: 'तेस्रो पटक: sum = 3 + 3 = 6।' },
      { line: 7, set: { i: '4' },
        en: 'i++ makes i 4, and 4 is at most 5.',
        ne: 'i++ ले i लाई 4 बनाउँछ, र 4 पनि 5 भित्रै छ।' },
      { line: 9, set: { sum: '10' },
        en: 'Turn 4: sum = 6 + 4 = 10.',
        ne: 'चौथो पटक: sum = 6 + 4 = 10।' },
      { line: 7, set: { i: '5' },
        en: 'i++ makes i 5. The condition still holds, and this will turn out to be the last time it does.',
        ne: 'i++ ले i लाई 5 बनाउँछ। सर्त अझै सत्य छ, र यो नै अन्तिम पटक हुने देखिन्छ।' },
      { line: 9, set: { sum: '15' },
        en: 'Turn 5: sum = 10 + 5 = 15. This is the last turn, and nothing on screen says so yet.',
        ne: 'पाँचौं पटक: sum = 10 + 5 = 15। यो अन्तिम पटक हो, र पर्दामा अहिलेसम्म त्यसो भनिएको छैन।' },
      { line: 7, set: { i: '6' },
        en: 'i++ makes i 6, the condition 6 <= 5 is FALSE, and the loop ends. i is 6 when the loop finishes, not 5 — that is the detail output-prediction questions are built on.',
        ne: 'i++ ले i लाई 6 बनाउँछ, सर्त 6 <= 5 असत्य हुन्छ, र loop सकिन्छ। Loop सकिँदा i 6 हुन्छ, 5 होइन — output अनुमान गर्ने प्रश्न त्यही कुरामा बनेका हुन्छन्।' },
      { line: 12, out: 'Sum = 15',
        en: 'The printf is OUTSIDE the loop, so it runs once. Move it inside the braces and the program would print five lines instead of one.',
        ne: 'printf loop भन्दा बाहिर छ, त्यसैले एक पटक चल्छ। यसलाई brace भित्र सारे प्रोग्रामले एक होइन पाँच लाइन छाप्थ्यो।' }
    ]
  },

  { id: 'doWhileOnce', subject: 'grade9/c-programming', unit: 'c-u3',
    title: { en: 'do-while runs its body before it tests',
             ne: 'do-while ले जाँच्नुअघि body चलाउँछ' },
    code: [
      '#include <stdio.h>',
      '',
      'int main()',
      '{',
      '    int n = 10;',
      '',
      '    while (n < 5)',
      '        printf("while ran\\n");',
      '',
      '    do',
      '        printf("do-while ran\\n");',
      '    while (n < 5);',
      '',
      '    return 0;',
      '}'
    ],
    vars: ['n'],
    output: ['do-while ran'],
    steps: [
      { line: 5, set: { n: '10' },
        en: 'n is 10, so the condition n < 5 is false from the very beginning. Both loops below are given the same false condition on purpose.',
        ne: 'n 10 छ, त्यसैले n < 5 सुरुदेखि नै असत्य छ। तलका दुवै loop लाई जानीजानी उही असत्य सर्त दिइएको छ।' },
      { line: 7,
        en: 'The while loop tests FIRST. 10 < 5 is false, so the body never runs even once and nothing is printed.',
        ne: 'while ले पहिले जाँच्छ। 10 < 5 असत्य छ, त्यसैले body एक पटक पनि चल्दैन र केही छापिँदैन।' },
      { line: 10,
        en: 'The do-while begins by running the body. There is no test here at all — the word do is a promise that the body will happen.',
        ne: 'do-while ले body चलाएरै सुरु गर्छ। यहाँ जाँच नै छैन — do शब्द नै body हुन्छ भन्ने वाचा हो।' },
      { line: 11, out: 'do-while ran',
        en: 'So this prints, even though the condition was already false. A do-while always runs at least once; that is the entire difference between the two loops.',
        ne: 'त्यसैले सर्त पहिल्यै असत्य भए पनि यो छापिन्छ। do-while कम्तीमा एक पटक सधैं चल्छ; दुई loop बीचको पूरै फरक त्यही हो।' },
      { line: 12,
        en: 'Only NOW is the condition tested. It is false, so the loop ends after exactly one pass. Note the semicolon after the closing bracket — a do-while needs it and a while does not.',
        ne: 'सर्त अब मात्र जाँचिन्छ। असत्य छ, त्यसैले ठ्याक्कै एक पटकपछि loop सकिन्छ। कोष्ठकपछिको semicolon हेर्नुहोस् — do-while लाई चाहिन्छ, while लाई चाहिँदैन।' },
      { line: 14,
        en: 'The program ends having printed one line. An examination question that gives both loops and asks for the output is asking exactly this.',
        ne: 'प्रोग्राम एउटा लाइन छापेर सकिन्छ। दुवै loop दिएर output सोध्ने परीक्षाको प्रश्नले ठ्याक्कै यही सोधेको हुन्छ।' }
    ]
  },

  { id: 'breakContinue', subject: 'grade9/c-programming', unit: 'c-u3',
    title: { en: 'break leaves the loop, continue skips a turn',
             ne: 'break ले loop छाड्छ, continue ले एक पटक छाड्छ' },
    code: [
      '#include <stdio.h>',
      '',
      'int main()',
      '{',
      '    int i;',
      '',
      '    for (i = 1; i <= 6; i++)',
      '    {',
      '        if (i == 3)',
      '            continue;',
      '        if (i == 5)',
      '            break;',
      '        printf("%d ", i);',
      '    }',
      '    return 0;',
      '}'
    ],
    vars: ['i'],
    output: ['1 2 4 '],
    steps: [
      { line: 7, set: { i: '1' },
        en: 'i starts at 1 and the condition 1 <= 6 is true, so the body runs.',
        ne: 'i 1 बाट सुरु हुन्छ र सर्त 1 <= 6 सत्य छ, त्यसैले body चल्छ।' },
      { line: 13, out: '1 ',
        en: 'Neither if matches, so the printf at the bottom runs and 1 is printed. The space inside the quotes is what keeps the numbers apart.',
        ne: 'कुनै पनि if मिलेन, त्यसैले तलको printf चल्छ र 1 छापिन्छ। उद्धरणभित्रको खाली ठाउँले सङ्ख्याहरू छुट्याउँछ।' },
      /* PHASE 14.1. Every one of these i changes used to be attached to
         the line the turn ENDED on — the printf, the continue, the
         break. i changes on line 7 and nowhere else, and in a program
         whose subject is where control goes, showing it anywhere else
         is the defect. */
      { line: 7, set: { i: '2' },
        en: 'i++ makes i 2 and the condition still holds, so the body runs again.',
        ne: 'i++ ले i लाई 2 बनाउँछ र सर्त अझै सत्य छ, त्यसैले body फेरि चल्छ।' },
      { line: 13, out: '2 ',
        en: 'Both tests fail again, so 2 is printed.',
        ne: 'दुवै जाँच फेरि असफल भए, त्यसैले 2 छापिन्छ।' },
      { line: 7, set: { i: '3' },
        en: 'i++ makes i 3.',
        ne: 'i++ ले i लाई 3 बनाउँछ।' },
      { line: 10,
        en: 'The first if matches, so continue runs. It jumps straight to i++ and skips everything below it — including the printf.',
        ne: 'पहिलो if मिल्यो, त्यसैले continue चल्छ। यो सिधै i++ मा हाम फाल्छ र तलको सबै — printf सहित — छाड्छ।' },
      { line: 7, set: { i: '4' },
        en: 'continue landed here: i++ makes i 4. Note that the loop was never left — only the rest of that one turn.',
        ne: 'continue यहीँ आइपुग्यो: i++ ले i लाई 4 बनाउँछ। ध्यान दिनुहोस् — loop छाडिएकै थिएन, त्यो एक पटकको बाँकी मात्र।' },
      { line: 13, out: '4 ',
        en: '3 was never printed, which is why the output jumps from 2 to 4.',
        ne: '3 कहिल्यै छापिएन, त्यसैले output 2 बाट सिधै 4 मा जान्छ।' },
      { line: 7, set: { i: '5' },
        en: 'i++ makes i 5 and the condition still holds, so the body runs once more.',
        ne: 'i++ ले i लाई 5 बनाउँछ र सर्त अझै सत्य छ, त्यसैले body फेरि एक पटक चल्छ।' },
      { line: 12,
        en: 'The second if matches, so break runs. This leaves the loop entirely — i will never reach 6.',
        ne: 'दोस्रो if मिल्यो, त्यसैले break चल्छ। यसले पूरै loop छाड्छ — i कहिल्यै 6 सम्म पुग्दैन।' },
      { line: 15,
        en: 'Control is now after the loop. Output was 1 2 4: 3 was skipped by continue, and 5 and 6 never happened because of break. One statement skipped a turn, the other ended the loop.',
        ne: 'नियन्त्रण अब loop पछाडि छ। Output 1 2 4 भयो: 3 लाई continue ले छाड्यो, र 5 अनि 6 break का कारण भएनन्। एउटाले एक पटक छाड्यो, अर्कोले loop नै सिध्यायो।' }
    ]
  },

  /* ---- Unit 4 ---- */
  { id: 'swapValue', subject: 'grade9/c-programming', unit: 'c-u4',
    title: { en: 'Call by value — the swap that does nothing',
             ne: 'Call by value — केही नगर्ने swap' },
    code: [
      '#include <stdio.h>',
      '',
      'void swap(int x, int y)',
      '{',
      '    int t = x;',
      '    x = y;',
      '    y = t;',
      '}',
      '',
      'int main()',
      '{',
      '    int a = 5, b = 9;',
      '    swap(a, b);',
      '    printf("a = %d, b = %d", a, b);',
      '    return 0;',
      '}'
    ],
    vars: ['a (main)', 'b (main)', 'x (swap)', 'y (swap)', 't (swap)'],
    stack: true,
    output: ['a = 5, b = 9'],
    steps: [
      { line: 12, set: { 'a (main)': '5', 'b (main)': '9' }, push: 'main()',
        en: 'main starts with a = 5 and b = 9. Keep your eye on these two rows: the whole question is whether they change.',
        ne: 'main सुरु हुँदा a = 5 र b = 9 छ। यी दुई पङ्क्तिमा नजर राख्नुहोस्: पूरै प्रश्न यी बदलिन्छन् कि बदलिँदैनन् भन्ने हो।' },
      { line: 13, push: 'swap(5, 9)',
        en: 'swap is called. C makes COPIES of a and b and hands the copies over. The originals are not sent anywhere.',
        ne: 'swap बोलाइयो। C ले a र b का प्रतिलिपि बनाएर ती पठाउँछ। मूल variable कतै पठाइँदैनन्।' },
      { line: 3, set: { 'x (swap)': '5', 'y (swap)': '9' },
        en: 'x and y are brand new variables inside swap. They happen to hold the same values, and they live at different memory addresses from a and b.',
        ne: 'x र y swap भित्रका बिलकुल नयाँ variable हुन्। संयोगले मान उही छन्, तर तिनको मेमोरी ठेगाना a र b भन्दा फरक छ।' },
      { line: 5, set: { 't (swap)': '5' },
        en: 't keeps a copy of x, because the next line is about to overwrite x and the value would otherwise be lost.',
        ne: 't ले x को प्रतिलिपि राख्छ, किनभने अर्को लाइनले x मेट्न लागेको छ र नत्र त्यो मान हराउँथ्यो।' },
      { line: 6, set: { 'x (swap)': '9' },
        en: 'x takes y. Inside this function the swap is working perfectly.',
        ne: 'x ले y को मान लिन्छ। यस function भित्र swap ठिकै चलिरहेको छ।' },
      { line: 7, set: { 'y (swap)': '5' },
        en: 'y takes the saved value from t. x and y are now swapped — and a and b have not moved at all.',
        ne: 'y ले t मा राखिएको मान लिन्छ। x र y अब साटिए — र a अनि b टसमस भएका छैनन्।' },
      { line: 8, pop: true, set: { 'x (swap)': '—', 'y (swap)': '—', 't (swap)': '—' },
        en: 'swap ends. x, y and t are destroyed, taking the swapped values with them. Nothing was returned and nothing in main was touched.',
        ne: 'swap सकियो। x, y र t नष्ट हुन्छन् र साटिएका मान पनि सँगै जान्छन्। केही फर्काइएन र main को केही छोइएन।' },
      { line: 14, out: 'a = 5, b = 9',
        en: 'The output proves it: a is still 5 and b is still 9. This is the single most common surprise in Unit 4, and the reason the next program exists.',
        ne: 'Output ले प्रमाणित गर्‍यो: a अझै 5 र b अझै 9 छ। युनिट ४ को सबैभन्दा ठूलो अचम्म यही हो, र अर्को प्रोग्राम हुनुको कारण पनि त्यही।' }
    ]
  },

  { id: 'swapRef', subject: 'grade9/c-programming', unit: 'c-u4',
    title: { en: 'Call by reference — the swap that works',
             ne: 'Call by reference — काम गर्ने swap' },
    code: [
      '#include <stdio.h>',
      '',
      'void swap(int *x, int *y)',
      '{',
      '    int t = *x;',
      '    *x = *y;',
      '    *y = t;',
      '}',
      '',
      'int main()',
      '{',
      '    int a = 5, b = 9;',
      '    swap(&a, &b);',
      '    printf("a = %d, b = %d", a, b);',
      '    return 0;',
      '}'
    ],
    vars: ['a (main)', 'b (main)', 'x (swap)', 'y (swap)', 't (swap)'],
    stack: true,
    output: ['a = 9, b = 5'],
    steps: [
      { line: 12, set: { 'a (main)': '5', 'b (main)': '9' }, push: 'main()',
        en: 'The same starting point as before: a = 5, b = 9. Only two characters in this program are different from the one that failed.',
        ne: 'अघिकै सुरुवात: a = 5, b = 9। असफल भएको प्रोग्रामसँग यसको फरक दुई अक्षरको मात्र छ।' },
      { line: 13, push: 'swap(&a, &b)',
        en: 'The ampersand means "the address of". What is handed over is not the value 5 but the place where 5 lives.',
        ne: 'Ampersand को अर्थ "को ठेगाना" हो। पठाइएको 5 भन्ने मान होइन, 5 बसेको ठाउँ हो।' },
      { line: 3, set: { 'x (swap)': 'address of a', 'y (swap)': 'address of b' },
        en: 'x and y are pointers. They are still copies — but they are copies of ADDRESSES, and a copy of an address still points at the original.',
        ne: 'x र y pointer हुन्। यी अझै प्रतिलिपि नै हुन् — तर ठेगानाका प्रतिलिपि, र ठेगानाको प्रतिलिपिले पनि मूल ठाउँ नै देखाउँछ।' },
      { line: 5, set: { 't (swap)': '5' },
        en: '*x means "the value at the address in x", which is a in main. So t gets 5 — read out of main, not out of a local copy.',
        ne: '*x को अर्थ "x मा भएको ठेगानाको मान" हो, र त्यो main को a हो। त्यसैले t ले 5 पाउँछ — स्थानीय प्रतिलिपिबाट होइन, main बाटै।' },
      { line: 6, set: { 'a (main)': '9' },
        en: 'Watch the a row. *x = *y writes into main\'s a, from inside swap. This is the moment the program does what the previous one could not.',
        ne: 'a को पङ्क्ति हेर्नुहोस्। *x = *y ले swap भित्रबाटै main को a मा लेख्छ। अघिल्लो प्रोग्रामले गर्न नसकेको काम यहीँ भयो।' },
      { line: 7, set: { 'b (main)': '5' },
        en: '*y = t writes 5 into main\'s b. Both originals have now changed, and nothing has been returned.',
        ne: '*y = t ले main को b मा 5 लेख्छ। दुवै मूल variable बदलिए, र केही फर्काइएको छैन।' },
      { line: 8, pop: true, set: { 'x (swap)': '—', 'y (swap)': '—', 't (swap)': '—' },
        en: 'swap ends and its own variables disappear, exactly as before. The difference is that the work was done somewhere that outlives the function.',
        ne: 'swap सकिन्छ र यसका आफ्नै variable अघिझैं हराउँछन्। फरक यति हो — काम function भन्दा लामो बाँच्ने ठाउँमा भएको थियो।' },
      { line: 14, out: 'a = 9, b = 5',
        en: 'Swapped. Two ampersands at the call and two stars in the function are the whole difference between this program and the last one.',
        ne: 'साटियो। Call मा दुई ampersand र function मा दुई star — अघिल्लो प्रोग्रामसँगको पूरै फरक यति नै हो।' }
    ]
  },

  { id: 'factorialRec', subject: 'grade9/c-programming', unit: 'c-u4',
    title: { en: 'Recursion — a function that calls itself',
             ne: 'Recursion — आफैंलाई बोलाउने function' },
    code: [
      '#include <stdio.h>',
      '',
      'int fact(int n)',
      '{',
      '    if (n == 1)',
      '        return 1;',
      '    return n * fact(n - 1);',
      '}',
      '',
      'int main()',
      '{',
      '    printf("%d", fact(4));',
      '    return 0;',
      '}'
    ],
    vars: ['n in the current call', 'value being returned'],
    stack: true,
    output: ['24'],
    steps: [
      { line: 12, push: 'main()',
        en: 'main calls fact(4). Nothing can be printed until that call finishes, and it is about to take a while.',
        ne: 'main ले fact(4) बोलाउँछ। त्यो call नसकिएसम्म केही छाप्न सकिँदैन, र त्यसलाई केही समय लाग्नेछ।' },
      { line: 5, set: { 'n in the current call': '4' }, push: 'fact(4)',
        en: 'n is 4. The base case asks: is n equal to 1? No, so the function must call itself.',
        ne: 'n 4 छ। Base case सोध्छ: n बराबर 1 हो? होइन, त्यसैले function ले आफैंलाई बोलाउनुपर्छ।' },
      { line: 7, set: { 'n in the current call': '3' }, push: 'fact(3)',
        en: 'fact(4) pauses at this line and calls fact(3). The multiplication by 4 has NOT happened yet — it is waiting for an answer.',
        ne: 'fact(4) यहीँ रोकिएर fact(3) बोलाउँछ। 4 ले गुणन अझै भएकै छैन — उत्तर कुरिरहेको छ।' },
      { line: 7, set: { 'n in the current call': '2' }, push: 'fact(2)',
        en: 'The same thing again: fact(3) pauses and calls fact(2). Three calls are now stacked up, none of them finished.',
        ne: 'फेरि उही: fact(3) रोकिएर fact(2) बोलाउँछ। अब तीन call थुप्रिएका छन्, कुनै पनि सकिएको छैन।' },
      { line: 7, set: { 'n in the current call': '1' }, push: 'fact(1)',
        en: 'fact(2) calls fact(1). This is as deep as it goes, because of the test on line 5.',
        ne: 'fact(2) ले fact(1) बोलाउँछ। लाइन ५ को जाँचका कारण यही सबैभन्दा गहिरो हो।' },
      { line: 6, set: { 'value being returned': '1' }, pop: true,
        en: 'n is 1, so the BASE CASE returns 1 without calling anything. Remove this test and the calls never stop — that is what infinite recursion means.',
        ne: 'n 1 छ, त्यसैले BASE CASE ले कसैलाई नबोलाई 1 फर्काउँछ। यो जाँच हटाए call कहिल्यै रोकिँदैनन् — infinite recursion भनेको त्यही हो।' },
      { line: 7, set: { 'value being returned': '2' }, pop: true,
        en: 'fact(2) was waiting at line 7. It now computes 2 * 1 = 2 and returns. The pile starts to unwind, innermost first.',
        ne: 'fact(2) लाइन ७ मा कुरिरहेको थियो। अब 2 * 1 = 2 गणना गरेर फर्काउँछ। थुप्रो भित्रैबाट खुल्न थाल्छ।' },
      { line: 7, set: { 'value being returned': '6' }, pop: true,
        en: 'fact(3) resumes: 3 * 2 = 6.',
        ne: 'fact(3) फेरि चल्छ: 3 * 2 = 6।' },
      { line: 7, set: { 'value being returned': '24' }, pop: true,
        en: 'fact(4) resumes: 4 * 6 = 24. Every multiplication happened on the way back, not on the way down.',
        ne: 'fact(4) फेरि चल्छ: 4 * 6 = 24। हरेक गुणन फर्कंदा भयो, तल जाँदा होइन।' },
      { line: 12, out: '24',
        en: 'Only now does main get its answer and print it. Four calls went down and four returns came back — which is why recursion uses more memory than a loop doing the same job.',
        ne: 'अब मात्र main ले उत्तर पाएर छाप्छ। चार call तल गए र चार return फर्के — त्यसैले उही काम गर्ने loop भन्दा recursion ले बढी मेमोरी खान्छ।' }
    ]
  },

  /* ---- Unit 5 ---- */
  { id: 'arraySum', subject: 'grade9/c-programming', unit: 'c-u5',
    title: { en: 'An array, an index, and a running total',
             ne: 'Array, index, र चल्दै गरेको जोड' },
    code: [
      '#include <stdio.h>',
      '',
      'int main()',
      '{',
      '    int marks[5] = {70, 85, 60, 90, 45};',
      '    int i, total = 0;',
      '',
      '    for (i = 0; i < 5; i++)',
      '        total = total + marks[i];',
      '',
      '    printf("Total = %d", total);',
      '    return 0;',
      '}'
    ],
    vars: ['i', 'marks[i]', 'total'],
    output: ['Total = 350'],
    steps: [
      { line: 5, set: { 'marks[i]': '—' },
        en: 'Five integers are stored side by side in memory. The positions are numbered 0, 1, 2, 3, 4 — not 1 to 5. The size in the brackets is 5; the last valid index is 4.',
        ne: 'पाँच integer मेमोरीमा छेउछाउ राखिन्छन्। स्थानको गन्ती 0, 1, 2, 3, 4 हो — 1 देखि 5 होइन। कोष्ठकभित्रको आकार 5 हो; अन्तिम मान्य index 4।' },
      { line: 6, set: { i: '?', total: '0' },
        en: 'total starts at 0 for the same reason sum did in Unit 3: it is about to be added to.',
        ne: 'युनिट ३ को sum जस्तै कारणले total 0 बाट सुरु हुन्छ: यसमा जोड्न लागिएको छ।' },
      { line: 8, set: { i: '0', 'marks[i]': '70' },
        en: 'i starts at ZERO, which is the single most important habit in this unit. marks[0] is the first element, 70.',
        ne: 'i शून्यबाट सुरु हुन्छ, र यस युनिटको सबैभन्दा महत्त्वपूर्ण बानी त्यही हो। marks[0] पहिलो element हो, 70।' },
      { line: 9, set: { total: '70' },
        en: 'total = 0 + 70. The index inside the brackets is a variable, which is what lets one line of code reach every element in turn.',
        ne: 'total = 0 + 70। कोष्ठकभित्रको index variable हो, र त्यसैले एउटै लाइनले पालैपालो हरेक element सम्म पुग्छ।' },
      /* PHASE 14.1, same correction as forSum. Turns 2 to 5 set i and
         marks[i] while line 9 was lit; i changes on line 8. In a unit
         whose marks are lost to index arithmetic, showing the index
         change on the wrong line is the one thing this component must
         not do. */
      { line: 8, set: { i: '1', 'marks[i]': '85' },
        en: 'i++ makes i 1, so marks[i] is now marks[1] — the SECOND element, 85.',
        ne: 'i++ ले i लाई 1 बनाउँछ, त्यसैले marks[i] अब marks[1] हो — दोस्रो element, 85।' },
      { line: 9, set: { total: '155' },
        en: 'total = 70 + 85 = 155.',
        ne: 'total = 70 + 85 = 155।' },
      { line: 8, set: { i: '2', 'marks[i]': '60' },
        en: 'i is 2 and marks[2] is 60.',
        ne: 'i 2 छ र marks[2] 60 हो।' },
      { line: 9, set: { total: '215' },
        en: 'total = 155 + 60 = 215.',
        ne: 'total = 155 + 60 = 215।' },
      { line: 8, set: { i: '3', 'marks[i]': '90' },
        en: 'i is 3 and marks[3] is 90.',
        ne: 'i 3 छ र marks[3] 90 हो।' },
      { line: 9, set: { total: '305' },
        en: 'total = 215 + 90 = 305.',
        ne: 'total = 215 + 90 = 305।' },
      { line: 8, set: { i: '4', 'marks[i]': '45' },
        en: 'i is 4 and marks[4] is 45. This is the LAST element, and the index is one less than the size.',
        ne: 'i 4 छ र marks[4] 45 हो। यो अन्तिम element हो, र index आकारभन्दा एक कम छ।' },
      { line: 9, set: { total: '350' },
        en: 'total = 305 + 45 = 350.',
        ne: 'total = 305 + 45 = 350।' },
      { line: 8, set: { i: '5', 'marks[i]': 'does not exist' },
        en: 'i becomes 5 and the condition 5 < 5 is false, so the loop stops. Had the condition been i <= 5, the program would have read marks[5], which is not part of the array — C does not check, and the result is a wrong total or a crash.',
        ne: 'i 5 हुन्छ र सर्त 5 < 5 असत्य भएकाले loop रोकिन्छ। सर्त i <= 5 भएको भए प्रोग्रामले marks[5] पढ्थ्यो, जुन array को भाग होइन — C ले जाँच्दैन, र नतिजा गलत जोड वा crash हुन्छ।' },
      { line: 11, out: 'Total = 350',
        en: '70 + 85 + 60 + 90 + 45 = 350. One loop, one index, five elements.',
        ne: '70 + 85 + 60 + 90 + 45 = 350। एउटा loop, एउटा index, पाँच element।' }
    ]
  },

  { id: 'stringLen', subject: 'grade9/c-programming', unit: 'c-u5',
    title: { en: 'A string is an array with a hidden last character',
             ne: 'String भनेको लुकेको अन्तिम अक्षर भएको array हो' },
    code: [
      '#include <stdio.h>',
      '#include <string.h>',
      '',
      'int main()',
      '{',
      '    char name[10] = "NEPAL";',
      '    int len;',
      '',
      '    printf("%s\\n", name);',
      '    len = strlen(name);',
      '    printf("%d\\n", len);',
      '    printf("%c\\n", name[0]);',
      '    return 0;',
      '}'
    ],
    vars: ['name[0]', 'name[4]', 'name[5]', 'len'],
    output: ['NEPAL', '5', 'N'],
    steps: [
      { line: 2,
        en: 'string.h is a second header, needed because strlen lives there. stdio.h alone would leave strlen undeclared.',
        ne: 'string.h दोस्रो header हो, र strlen त्यहीँ भएकाले चाहिन्छ। stdio.h मात्रले strlen लाई अघोषित छाड्थ्यो।' },
      { line: 6, set: { 'name[0]': 'N', 'name[4]': 'L', 'name[5]': '\\0' },
        en: 'Five letters are stored — and a sixth character you never typed. The null character \\0 is put at the end automatically, which is how every C function knows where the string stops.',
        ne: 'पाँच अक्षर भण्डारण भए — र तपाईंले कहिल्यै नटाइप गरेको छैठौं अक्षर पनि। अन्त्यमा null अक्षर \\0 आफैं राखिन्छ, र त्यसैले हरेक C function ले string कहाँ सकिन्छ थाहा पाउँछ।' },
      { line: 6,
        en: 'This is why the array was declared as 10 and not 5. A char array holding a five-letter word needs at least six places, and a size of exactly 5 would leave no room for the terminator.',
        ne: 'त्यसैले array लाई 5 होइन 10 घोषणा गरिएको हो। पाँच अक्षरको शब्द राख्ने char array लाई कम्तीमा छ ठाउँ चाहिन्छ, र ठ्याक्कै 5 भए terminator का लागि ठाउँ बाँकी रहँदैन।' },
      { line: 9, out: 'NEPAL',
        en: '%s prints characters one after another and stops the moment it meets \\0. The null is the instruction to stop, and it is never printed.',
        ne: '%s ले एक–एक गरी अक्षर छाप्छ र \\0 भेट्नेबित्तिकै रोकिन्छ। Null रोकिने निर्देशन हो, र त्यो कहिल्यै छापिँदैन।' },
      { line: 10, set: { 'len': '5' },
        en: 'strlen counts up to the null and does not count the null itself, so a five-letter word gives 5 even though six places are used. The length and the storage are two different numbers. The answer is kept in an int so that the next line can print it with %d.',
        ne: 'strlen ले null सम्म गन्छ र null आफैंलाई गन्दैन, त्यसैले छ ठाउँ ओगटे पनि पाँच अक्षरको शब्दको 5 आउँछ। लम्बाइ र भण्डारण दुई फरक सङ्ख्या हुन्। उत्तर int मा राखिएको छ, जसले अर्को लाइनमा %d ले छाप्न मिल्छ।' },
      { line: 11, out: '5',
        en: 'len is an int, and %d is the specifier for an int. Matching the two is not a formality — Unit 2 showed what printf does when the specifier and the value disagree.',
        ne: 'len int हो, र %d int कै specifier हो। दुईलाई मिलाउनु औपचारिकता मात्र होइन — specifier र मान बाझिए printf के गर्छ, युनिट २ ले देखाएको छ।' },
      { line: 12, out: 'N',
        en: 'name[0] is one character, not a string, so it is printed with %c. Using %s here would be a mistake the compiler may not stop.',
        ne: 'name[0] एउटा अक्षर हो, string होइन, त्यसैले %c ले छापिन्छ। यहाँ %s प्रयोग गर्नु त्यस्तो गल्ती हो जुन compiler ले नरोक्न सक्छ।' }
    ]
  },

  /* ---- Unit 6 ---- */
  { id: 'unionShare', subject: 'grade9/c-programming', unit: 'c-u6',
    title: { en: 'A union gives its members one space to share',
             ne: 'Union ले सबै member लाई बाँड्न एउटै ठाउँ दिन्छ' },
    code: [
      '#include <stdio.h>',
      '',
      'union Box',
      '{',
      '    int n;',
      '    char c;',
      '};',
      '',
      'int main()',
      '{',
      '    union Box b;',
      '',
      '    b.n = 65;',
      '    printf("n = %d\\n", b.n);',
      '',
      '    b.c = \'X\';',
      '    printf("c = %c\\n", b.c);',
      '    printf("n = %d\\n", b.n);',
      '    return 0;',
      '}'
    ],
    vars: ['the shared memory', 'b.n reads', 'b.c reads'],
    output: ['n = 65', 'c = X', 'n = 88'],
    steps: [
      { line: 3,
        en: 'A union is DECLARED exactly like a structure — only the keyword differs. That similarity is why the two are confused and why the examination asks you to differentiate them.',
        ne: 'Union को घोषणा structure कै जस्तो हुन्छ — keyword मात्र फरक। त्यही मिल्दोपनले दुईलाई अलमल्याउँछ, र परीक्षाले फरक सोध्नुको कारण पनि त्यही हो।' },
      { line: 11, set: { 'the shared memory': 'one block', 'b.n reads': 'garbage', 'b.c reads': 'garbage' },
        en: 'b is created. A structure with these members would reserve space for BOTH; a union reserves one block, big enough for the largest member, and that is the whole saving.',
        ne: 'b बन्यो। यी member भएको structure ले दुवैका लागि ठाउँ छुट्याउँथ्यो; union ले सबैभन्दा ठूलो member अट्ने एउटै block छुट्याउँछ, र पूरै बचत त्यही हो।' },
      { line: 13, set: { 'the shared memory': '65', 'b.n reads': '65', 'b.c reads': 'A' },
        en: 'Writing 65 into b.n fills the shared block. b.c is now reading the same bytes as a character, and 65 is the code for the letter A — nobody asked for that, it simply follows.',
        ne: 'b.n मा 65 लेख्दा साझा block भरिन्छ। b.c ले अब उही byte लाई अक्षरका रूपमा पढ्छ, र 65 भनेको A अक्षरको सङ्केत हो — कसैले मागेको होइन, आफैं हुन्छ।' },
      { line: 14, out: 'n = 65',
        en: 'Reading back the member that was last written gives the expected answer. A union is perfectly reliable as long as you read the member you wrote.',
        ne: 'अन्तिम पटक लेखिएकै member पढ्दा अपेक्षित उत्तर आउँछ। लेखेकै member पढ्ने हो भने union पूरै भरपर्दो हुन्छ।' },
      { line: 16, set: { 'the shared memory': '88', 'b.n reads': '88', 'b.c reads': 'X' },
        en: 'Now X is written into b.c. X has the code 88, and it goes into the SAME block — so b.n has just been changed by a line that never mentioned n.',
        ne: 'अब b.c मा X लेखियो। X को सङ्केत 88 हो, र त्यो उही block मा जान्छ — त्यसैले n को नाम नै नलिएको लाइनले b.n बदलिदियो।' },
      { line: 17, out: 'c = X',
        en: 'b.c is read and gives X, as expected.',
        ne: 'b.c पढ्दा अपेक्षाअनुसार X आउँछ।' },
      { line: 18, out: 'n = 88',
        en: 'And b.n is now 88, not 65. The first value is gone. In a STRUCTURE both members would still hold their own values, and that single difference is the answer to the standard comparison question.',
        ne: 'अनि b.n अब 88 छ, 65 होइन। पहिलो मान गयो। STRUCTURE मा दुवै member का आफ्नै मान रहन्थे, र मानक तुलनात्मक प्रश्नको उत्तर त्यही एउटा फरक हो।' }
    ]
  },

  /* ---- Unit 7 ---- */
  { id: 'pointerBasics', subject: 'grade9/c-programming', unit: 'c-u7',
    title: { en: 'A pointer holds an address, not a value',
             ne: 'Pointer ले मान होइन ठेगाना राख्छ' },
    code: [
      '#include <stdio.h>',
      '',
      'int main()',
      '{',
      '    int n = 25;',
      '    int *p;',
      '',
      '    p = &n;',
      '',
      '    printf("n  = %d\\n", n);',
      '    printf("*p = %d\\n", *p);',
      '',
      '    *p = 50;',
      '    printf("n  = %d\\n", n);',
      '    return 0;',
      '}'
    ],
    vars: ['n (value)', 'n (its address)', 'p (holds)', '*p (value at p)'],
    output: ['n  = 25', '*p = 25', 'n  = 50'],
    steps: [
      { line: 5, set: { 'n (value)': '25', 'n (its address)': '1000' },
        en: 'n holds 25 and lives somewhere in memory. The address 1000 is made up for this illustration — a real one changes every run, which is exactly why a program must never depend on the number.',
        ne: 'n सँग 25 छ र यो मेमोरीमा कतै बस्छ। यहाँ देखाइएको ठेगाना 1000 उदाहरणका लागि बनाइएको हो — वास्तविक ठेगाना हरेक पटक फरक हुन्छ, त्यसैले प्रोग्रामले त्यो सङ्ख्यामा भर पर्नु हुँदैन।' },
      { line: 6, set: { 'p (holds)': 'garbage' },
        en: 'p is declared. The star here is part of the TYPE: it says p is a pointer to an int, not that p is an int. It is empty until it is aimed at something.',
        ne: 'p घोषणा भयो। यहाँको star TYPE को भाग हो: यसले p int को pointer हो भन्छ, p आफैं int हो भन्दैन। कतै नतेर्स्याएसम्म यो खाली छ।' },
      { line: 8, set: { 'p (holds)': '1000', '*p (value at p)': '25' },
        en: '&n gives the address of n, and p stores it. p does not contain 25 — it contains where 25 is kept. Those are two different facts and the examination asks for both.',
        ne: '&n ले n को ठेगाना दिन्छ र p ले त्यो राख्छ। p भित्र 25 छैन — 25 कहाँ छ भन्ने छ। यी दुई फरक तथ्य हुन् र परीक्षाले दुवै सोध्छ।' },
      { line: 10, out: 'n  = 25',
        en: 'Reading n directly gives 25, as always.',
        ne: 'n लाई सिधै पढ्दा सधैंझैं 25 आउँछ।' },
      { line: 11, out: '*p = 25',
        en: '*p means "go to the address in p and bring back what is there". The same 25, reached by a different route. This is dereferencing.',
        ne: '*p को अर्थ "p मा भएको ठेगानामा गएर त्यहाँको कुरा ल्याउनु" हो। उही 25, अर्कै बाटोबाट। यही dereferencing हो।' },
      { line: 13, set: { 'n (value)': '50', '*p (value at p)': '50' },
        en: 'Writing through the pointer changes n itself. The star works in both directions: read a value out, or put a value in. This one line is why call by reference works.',
        ne: 'Pointer मार्फत लेख्दा n आफैं बदलिन्छ। Star दुवै दिशामा चल्छ: मान निकाल्न, वा मान राख्न। Call by reference चल्नुको कारण यही एउटा लाइन हो।' },
      { line: 14, out: 'n  = 50',
        en: 'n is 50 although no line ever said n = 50. That is the power and the danger of pointers in one sentence.',
        ne: 'कुनै लाइनले n = 50 नभने पनि n 50 भयो। Pointer को शक्ति र खतरा एउटै वाक्यमा यही हो।' }
    ]
  }
];
