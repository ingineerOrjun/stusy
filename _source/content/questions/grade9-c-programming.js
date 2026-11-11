/* ============================================================
   QUESTION BANK — Grade 9 · Programming Principles and Concept in C

   AUTHORED PRACTICE QUESTIONS. These are written for Gyansetu. They
   follow the kinds of question this subject is examined with and the
   weighting of the CDC specification grid, but they are NOT past CDC or
   SEE papers and nothing in the product presents them as such.

   WEIGHTING. The external paper carries 50 marks split
   5·7·13·10·8·5·2 across the seven units, and the bank is weighted to
   that split rather than to the hours: Control Flow Statements is 16 of
   the 64 hours AND 13 of the 50 marks, so it gets the largest share
   either way, while Pointers is 4 hours and 2 marks and gets the
   smallest. See docs/GRADE-9-C-PROGRAMMING-CURRICULUM-MAP.md §5.

   A NOTE ON CODE IN A QUESTION. The quiz engine escapes every string it
   renders, so a prompt may contain C operators and they arrive as
   typed — but it does NOT render HTML, so no string here may contain a
   tag. Multi-line programs are written with real newline characters and
   the renderer preserves them.

   WHAT WAS AND WAS NOT CHECKED. Every answer here was worked out by
   hand against C semantics and cross-checked against the lesson that
   teaches it. No C compiler was available in the environment this bank
   was written in, so no program in it has been compiler-executed.

   Contract: docs/ASSESSMENT-ARCHITECTURE.md
   ============================================================ */
module.exports = [

  /* ================= UNIT 1 — Principles of Programming ================= */

  {
    id: 'g9.c.q01', subject: 'grade9/c-programming', unit: 'u1',
    topic: 'program-vs-software', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which statement correctly separates a program from software?',
      ne: 'Program र software लाई ठिक तरिकाले छुट्याउने कथन कुन हो?'
    },
    options: [
      { en: 'They mean the same thing', ne: 'दुवैको अर्थ एउटै हो' },
      { en: 'A program is one set of instructions; software is programs together with their data and documentation',
        ne: 'Program भनेको एउटा निर्देशन समूह हो; software चाहिँ प्रोग्रामहरू, तिनका data र documentation सहित' },
      { en: 'A program runs on hardware; software runs on the internet',
        ne: 'Program hardware मा चल्छ; software इन्टरनेटमा चल्छ' },
      { en: 'Software is written by a programmer; a program is written by a user',
        ne: 'Software प्रोग्रामरले लेख्छ; program प्रयोगकर्ताले लेख्छ' }
    ],
    answer: 1,
    explanation: {
      en: 'The difference is scope. A program is a single ordered set of instructions for one task. Software is the whole package — one or more programs, the data files they need, and the documentation. Every program is software, but software is normally many programs: a browser is one, an operating system is hundreds.',
      ne: 'फरक दायराको हो। Program एउटै कामका लागि क्रमबद्ध निर्देशनको एउटा समूह हो। Software चाहिँ पूरै प्याकेज — एक वा धेरै program, तिनलाई चाहिने data फाइल, र documentation। हरेक program software हो, तर software प्रायः धेरै program हुन्छ: browser एउटा हो, operating system सयौं।'
    }
  },

  {
    id: 'g9.c.q02', subject: 'grade9/c-programming', unit: 'u1',
    topic: 'language-levels', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which of these is a LOW level language?',
      ne: 'यीमध्ये कुन LOW level भाषा हो?'
    },
    options: [
      { en: 'C', ne: 'C' },
      { en: 'Java', ne: 'Java' },
      { en: 'Assembly language', ne: 'Assembly language' },
      { en: 'Python', ne: 'Python' }
    ],
    answer: 2,
    explanation: {
      en: 'Low level means close to the hardware, and only two categories qualify: machine language and assembly language. C, Java and Python are all high level. C is sometimes called a middle level language because it can reach memory addresses directly, but it is still translated by a compiler and it is still written in English-like words.',
      ne: 'Low level को अर्थ hardware सँग नजिक हुनु हो, र दुई श्रेणी मात्र यसमा पर्छन्: machine language र assembly language। C, Java र Python सबै high level हुन्। C लाई कहिलेकाहीं middle level भनिन्छ किनभने यसले मेमोरीको ठेगानासम्म सिधै पुग्न सक्छ, तर यो पनि compiler ले अनुवाद गर्छ र अङ्ग्रेजीजस्ता शब्दमै लेखिन्छ।'
    }
  },

  {
    id: 'g9.c.q03', subject: 'grade9/c-programming', unit: 'u1',
    topic: 'translator-choice', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A C program has one missing semicolon on line 20. What happens when the programmer tries to run it?',
      ne: 'C प्रोग्रामको लाइन २० मा एउटा semicolon छुटेको छ। प्रोग्रामरले चलाउन खोज्दा के हुन्छ?'
    },
    options: [
      { en: 'Lines 1 to 19 run, then the program stops at line 20',
        ne: 'लाइन १ देखि १९ चल्छन्, अनि लाइन २० मा प्रोग्राम रोकिन्छ' },
      { en: 'Nothing runs at all — the compiler refuses and no executable is produced',
        ne: 'केही पनि चल्दैन — compiler ले इन्कार गर्छ र executable बन्दैन' },
      { en: 'The program runs and prints a warning at the end',
        ne: 'प्रोग्राम चल्छ र अन्त्यमा चेतावनी छाप्छ' },
      { en: 'The missing semicolon is added automatically', ne: 'छुटेको semicolon आफैं थपिन्छ' }
    ],
    answer: 1,
    explanation: {
      en: 'C is compiled, not interpreted. The compiler reads the whole file before anything runs, so a grammar mistake anywhere means no executable file is created and nothing executes. Option A describes an interpreter, which runs line by line and therefore does stop part way. This is the practical difference between the two translators.',
      ne: 'C compile हुने भाषा हो, interpret हुने होइन। Compiler ले केही चल्नुअघि पूरै फाइल पढ्छ, त्यसैले जहाँसुकैको व्याकरण गल्तीले executable फाइल बन्दैन र केही चल्दैन। विकल्प (क) ले interpreter को वर्णन गर्छ, जसले एक–एक लाइन चलाउँछ र त्यसैले बीचमै रोकिन्छ। दुई अनुवादकबीचको व्यावहारिक फरक यही हो।'
    }
  },

  {
    id: 'g9.c.q04', subject: 'grade9/c-programming', unit: 'u1',
    topic: 'flowchart-symbols', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'In a flowchart, which symbol is used for the step "Print the result on the screen"?',
      ne: 'Flowchart मा "नतिजा पर्दामा छाप्नुहोस्" भन्ने चरणका लागि कुन चिन्ह प्रयोग हुन्छ?'
    },
    options: [
      { en: 'Rectangle', ne: 'Rectangle' },
      { en: 'Parallelogram', ne: 'Parallelogram' },
      { en: 'Diamond', ne: 'Diamond' },
      { en: 'Oval', ne: 'Oval' }
    ],
    answer: 1,
    explanation: {
      en: 'Printing sends something out of the program to the person, so it is output, and input and output share the same slanted parallelogram. The rectangle is for processing — a calculation or an assignment that happens inside the program where nobody sees it. Drawing a rectangle here is one of the commonest ways marks are lost on a flowchart question.',
      ne: 'छाप्नु भनेको प्रोग्रामबाट मान्छेसम्म केही पठाउनु हो, त्यसैले यो output हो, र input अनि output दुवैलाई उही छड्के parallelogram प्रयोग हुन्छ। Rectangle चाहिँ processing का लागि हो — प्रोग्रामभित्रै हुने गणना वा assignment, जुन कसैले देख्दैन। यहाँ rectangle कोर्नु flowchart को प्रश्नमा अंक गुमाउने सबैभन्दा सामान्य तरिकामध्ये एक हो।'
    }
  },

  {
    id: 'g9.c.q05', subject: 'grade9/c-programming', unit: 'u1',
    topic: 'algorithm-properties', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'An algorithm reads a number, prints it, and goes back to the printing step forever. Which property of an algorithm does it break?',
      ne: 'एउटा algorithm ले सङ्ख्या पढ्छ, छाप्छ, र छाप्ने चरणमै सधैं फर्किरहन्छ। यसले algorithm को कुन गुण भङ्ग गर्छ?'
    },
    options: [
      { en: 'Input', ne: 'Input' },
      { en: 'Output', ne: 'Output' },
      { en: 'Finiteness', ne: 'Finiteness' },
      { en: 'Definiteness', ne: 'Definiteness' }
    ],
    answer: 2,
    explanation: {
      en: 'Finiteness says an algorithm must end after a limited number of steps. This one has an input and it certainly has output, and every step is clear enough to carry out, so those three properties hold. What it never does is stop, and a procedure that never stops has not solved the problem. Missing the Stop box in a flowchart is the drawn version of the same mistake.',
      ne: 'Finiteness ले algorithm सीमित चरणपछि सकिनै पर्छ भन्छ। यसमा input छ र output पक्कै छ, र हरेक चरण गर्न पुग्ने गरी स्पष्ट छ — त्यसैले ती तीन गुण पूरा भए। नहुने कुरा रोकिनु हो, र कहिल्यै नरोकिने विधिले समस्या समाधान गरेको हुँदैन। Flowchart मा Stop बाकस छुटाउनु यही गल्तीको कोरिएको रूप हो।'
    }
  },

  {
    id: 'g9.c.q06', subject: 'grade9/c-programming', unit: 'u1',
    topic: 'application-areas', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A program stores 40,000 customer records and prints a monthly statement for each, adding up the amounts. Which application area is this, and what does it mainly demand from the computer?',
      ne: 'एउटा प्रोग्रामले ४०,००० ग्राहकको विवरण राख्छ र हरेकको मासिक विवरण छाप्छ, रकम जोड्दै। यो कुन प्रयोग क्षेत्र हो, र यसले कम्प्युटरसँग मुख्यतः के माग्छ?'
    },
    options: [
      { en: 'Scientific — it demands floating-point speed',
        ne: 'वैज्ञानिक — यसलाई floating-point को गति चाहिन्छ' },
      { en: 'Business — it demands storage, sorting and well-formatted reports',
        ne: 'व्यावसायिक — यसलाई भण्डारण, क्रम मिलाउने र राम्रो ढाँचाको प्रतिवेदन चाहिन्छ' },
      { en: 'Scientific — it demands a large number of calculations',
        ne: 'वैज्ञानिक — यसलाई ठूलो सङ्ख्यामा गणना चाहिन्छ' },
      { en: 'Business — it demands many decimal places of accuracy',
        ne: 'व्यावसायिक — यसलाई धेरै दशमलवसम्मको शुद्धता चाहिन्छ' }
    ],
    answer: 1,
    explanation: {
      en: 'The test is the ratio between data and calculation. Here there is a very large amount of data and the arithmetic is addition, so it is a business application, and what it needs is storage, retrieval, sorting and readable output. A scientific application is the opposite shape: a small amount of data and an enormous amount of calculation, which is why option A names floating-point speed for the wrong kind of job.',
      ne: 'जाँच data र गणनाको अनुपात हो। यहाँ data धेरै छ र गणना भनेको जोड मात्र, त्यसैले यो व्यावसायिक प्रयोग हो, र यसलाई भण्डारण, खोजी, क्रम मिलाउने र पढ्न मिल्ने output चाहिन्छ। वैज्ञानिक प्रयोगको आकार उल्टो हुन्छ: थोरै data र ठूलो गणना — त्यसैले विकल्प (क) ले गलत किसिमको कामलाई floating-point गति तोकेको छ।'
    }
  },

  {
    id: 'g9.c.q07', subject: 'grade9/c-programming', unit: 'u1',
    topic: 'portability', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which file should be carried to another computer so that the same C program can be used there?',
      ne: 'उही C प्रोग्राम अर्को कम्प्युटरमा प्रयोग गर्न कुन फाइल लैजानुपर्छ?'
    },
    options: [
      { en: 'The .exe file, because it is ready to run',
        ne: '.exe फाइल, किनभने त्यो चल्न तयार छ' },
      { en: 'The .c source file, because it can be compiled again on the other machine',
        ne: '.c source फाइल, किनभने अर्को मेसिनमा त्यसलाई फेरि compile गर्न सकिन्छ' },
      { en: 'Either one — both work anywhere', ne: 'जुनसुकै — दुवै जताततै चल्छन्' },
      { en: 'Neither — a C program cannot be moved',
        ne: 'कुनै पनि होइन — C प्रोग्राम सार्नै मिल्दैन' }
    ],
    answer: 1,
    explanation: {
      en: 'Portability in C belongs to the source, not to the executable. The .exe is machine code built for one processor and one operating system, so copying it to a different kind of machine gives a file that cannot run. The .c file is ordinary text: compile it again on the far side and the same program is available there. This is why "C is portable" and "my .exe will not run on Linux" are both true at once.',
      ne: 'C मा portability source को गुण हो, executable को होइन। .exe एउटा प्रोसेसर र एउटा operating system का लागि बनेको मेसिन कोड हो, त्यसैले फरक किसिमको मेसिनमा सार्दा नचल्ने फाइल मात्र पुग्छ। .c फाइल सामान्य पाठ हो: त्यहाँ पुगेर फेरि compile गरे उही प्रोग्राम त्यहाँ पनि चल्छ। त्यसैले "C portable छ" र "मेरो .exe Linux मा चल्दैन" दुवै एकैचोटि सत्य हुन्छन्।'
    }
  },

  /* ================= UNIT 2 — Fundamentals of C ================= */

  {
    id: 'g9.c.q08', subject: 'grade9/c-programming', unit: 'u2',
    topic: 'identifier-rules', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which of these is a VALID identifier in C?',
      ne: 'यीमध्ये कुन C को मान्य identifier हो?'
    },
    options: [
      { en: '2marks', ne: '2marks' },
      { en: 'total marks', ne: 'total marks' },
      { en: '_total2', ne: '_total2' },
      { en: 'float', ne: 'float' }
    ],
    answer: 2,
    explanation: {
      en: 'Check the four rules in order. "2marks" starts with a digit, which is not allowed. "total marks" contains a space. "float" is a keyword, so the compiler could not tell which meaning you intended. "_total2" begins with an underscore, contains only letters, digits and underscores, and is not a keyword, so it is valid.',
      ne: 'चारै नियम क्रमैसँग जाँच्नुहोस्। "2marks" अङ्कबाट सुरु भएको छ, जुन मिल्दैन। "total marks" मा खाली ठाउँ छ। "float" keyword हो, त्यसैले तपाईंले कुन अर्थ चाहनुभयो compiler ले छुट्याउन सक्दैनथ्यो। "_total2" underscore बाट सुरु भएको छ, अक्षर, अङ्क र underscore मात्र छन्, र keyword पनि होइन — त्यसैले मान्य छ।'
    }
  },

  {
    id: 'g9.c.q09', subject: 'grade9/c-programming', unit: 'u2',
    topic: 'c-origin', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Who developed the C language, and for what purpose?',
      ne: 'C भाषा कसले र कुन उद्देश्यले विकास गरे?'
    },
    options: [
      { en: 'Bjarne Stroustrup, to add classes to C', ne: 'Bjarne Stroustrup ले, C मा class थप्न' },
      { en: 'Dennis Ritchie, to write the UNIX operating system',
        ne: 'Dennis Ritchie ले, UNIX operating system लेख्न' },
      { en: 'James Gosling, to make programs run on any machine',
        ne: 'James Gosling ले, प्रोग्राम जुनसुकै मेसिनमा चलाउन' },
      { en: 'Charles Babbage, to control the Analytical Engine',
        ne: 'Charles Babbage ले, Analytical Engine चलाउन' }
    ],
    answer: 1,
    explanation: {
      en: 'C was developed by Dennis Ritchie at Bell Laboratories in 1972, and UNIX was rewritten in it. That origin explains the language: an operating system needs direct access to memory and almost no overhead, which is why C has pointers and why it stays fast. Bjarne Stroustrup developed C++ from C, which is a different language and a later one.',
      ne: 'C लाई Dennis Ritchie ले Bell Laboratories मा १९७२ मा विकास गरे, र UNIX त्यसैमा फेरि लेखियो। त्यही उत्पत्तिले भाषा बुझाउँछ: operating system लाई मेमोरीमा सिधै पहुँच र झन्डै शून्य थप भार चाहिन्छ — त्यसैले C मा pointer छन् र यो छिटो रहन्छ। Bjarne Stroustrup ले C बाट C++ बनाए, जुन फरक र पछिको भाषा हो।'
    }
  },

  {
    id: 'g9.c.q10', subject: 'grade9/c-programming', unit: 'u2',
    topic: 'escape-sequence', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'What does the escape sequence \\n do inside a printf string?',
      ne: 'printf को string भित्र escape sequence \\n ले के गर्छ?'
    },
    options: [
      { en: 'It prints a backslash followed by the letter n',
        ne: 'यसले backslash र त्यसपछि n अक्षर छाप्छ' },
      { en: 'It moves the output to a new line', ne: 'यसले output लाई नयाँ लाइनमा सार्छ' },
      { en: 'It ends the program', ne: 'यसले प्रोग्राम सिध्याउँछ' },
      { en: 'It inserts a tab space', ne: 'यसले tab को खाली ठाउँ हाल्छ' }
    ],
    answer: 1,
    explanation: {
      en: 'An escape sequence is a backslash and a letter that together stand for one character that cannot be typed directly. \\n is the newline character: two characters in the source file, one invisible character in the output. \\t is the tab, which is why option D is wrong. Without \\n, two printf calls run their text together on the same line.',
      ne: 'Escape sequence भनेको backslash र एउटा अक्षर मिलेर सिधै टाइप गर्न नमिल्ने एउटा अक्षर जनाउने कुरा हो। \\n newline अक्षर हो: source फाइलमा दुई अक्षर, output मा एउटा नदेखिने अक्षर। Tab चाहिँ \\t हो, त्यसैले विकल्प (घ) गलत छ। \\n नभए दुई printf को पाठ उही लाइनमा जोडिन्छ।'
    }
  },

  {
    id: 'g9.c.q11', subject: 'grade9/c-programming', unit: 'u2',
    topic: 'semicolon-rule', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which of these lines must NOT end with a semicolon?',
      ne: 'यीमध्ये कुन लाइन semicolon ले सकिनु हुँदैन?'
    },
    options: [
      { en: 'int a, b, sum;', ne: 'int a, b, sum;' },
      { en: '#include <stdio.h>', ne: '#include <stdio.h>' },
      { en: 'sum = a + b;', ne: 'sum = a + b;' },
      { en: 'return 0;', ne: 'return 0;' }
    ],
    answer: 1,
    explanation: {
      en: 'The semicolon is a statement terminator, so it belongs after every statement — a declaration, an assignment, a return. #include is not a statement at all: it is a preprocessor directive, handled before compiling begins, and it ends at the end of the line. A function heading and a closing brace are the other two places where no semicolon belongs.',
      ne: 'Semicolon statement terminator हो, त्यसैले हरेक statement पछि आउँछ — घोषणा, assignment, return। #include statement नै होइन: यो preprocessor directive हो, compile सुरु हुनुअघि नै चल्छ, र लाइनकै अन्त्यमा सकिन्छ। Function को शीर्षक र बन्द गर्ने brace अरू दुई ठाउँ हुन् जहाँ semicolon चाहिँदैन।'
    }
  },

  {
    id: 'g9.c.q12', subject: 'grade9/c-programming', unit: 'u2',
    topic: 'char-vs-string', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: "What is the difference between 'A' and \"A\" in C?",
      ne: "C मा 'A' र \"A\" बीच के फरक छ?"
    },
    options: [
      { en: 'There is no difference; both are the letter A',
        ne: 'कुनै फरक छैन; दुवै A अक्षर हुन्' },
      { en: "'A' is a character constant of one byte; \"A\" is a string of two bytes, A and the null character",
        ne: "'A' एक byte को character constant हो; \"A\" दुई byte को string हो — A र null अक्षर" },
      { en: "'A' is a string and \"A\" is a character", ne: "'A' string हो र \"A\" character हो" },
      { en: 'Double quotes are only used in comments', ne: 'दोहोरो उद्धरण comment मा मात्र चल्छ' }
    ],
    answer: 1,
    explanation: {
      en: 'Single quotes make a character constant, which occupies exactly one byte and is printed with %c. Double quotes make a string constant, which is an array of characters ending in the invisible null character \\0 — so even a one-letter string takes two bytes and is printed with %s. This is the difference that becomes the whole of Unit 5.',
      ne: 'एकल उद्धरणले character constant बनाउँछ, जुन ठ्याक्कै एक byte ओगट्छ र %c ले छापिन्छ। दोहोरो उद्धरणले string constant बनाउँछ, जुन नदेखिने null अक्षर \\0 ले सकिने character को array हो — त्यसैले एक अक्षरको string ले पनि दुई byte लिन्छ र %s ले छापिन्छ। यही फरक युनिट ५ को पूरै कुरा बन्छ।'
    }
  },

  {
    id: 'g9.c.q13', subject: 'grade9/c-programming', unit: 'u2',
    topic: 'scanf-address', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Why is the ampersand written in scanf("%d", &n) but not in printf("%d", n)?',
      ne: 'scanf("%d", &n) मा ampersand लेखिन्छ तर printf("%d", n) मा किन लेखिँदैन?'
    },
    options: [
      { en: 'It is only a style convention and either form works',
        ne: 'यो शैलीको चलन मात्र हो र दुवै रूप चल्छन्' },
      { en: 'scanf must put a value INTO n, so it needs the address of n; printf only reads n, so the value is enough',
        ne: 'scanf ले n भित्र मान राख्नुपर्छ, त्यसैले n को ठेगाना चाहिन्छ; printf ले n पढ्ने मात्र हो, त्यसैले मान पुग्छ' },
      { en: 'Because %d requires an ampersand and %s does not',
        ne: 'किनभने %d लाई ampersand चाहिन्छ र %s लाई चाहिँदैन' },
      { en: 'Because printf is a library function and scanf is not',
        ne: 'किनभने printf library function हो र scanf होइन' }
    ],
    answer: 1,
    explanation: {
      en: 'Arguments in C are passed by value, so a function receives copies. printf only needs to look at the value, and a copy is enough. scanf has to change n, and it cannot change a copy — it needs the address, which is what & supplies. This is call by reference meeting you in Unit 2, four units before it is named.',
      ne: 'C मा argument value बाट पठाइन्छन्, त्यसैले function ले प्रतिलिपि पाउँछ। printf लाई मान हेर्नु मात्र भएकाले प्रतिलिपि पुग्छ। scanf ले n बदल्नुपर्छ, र प्रतिलिपि बदल्न सक्दैन — ठेगाना चाहिन्छ, र & ले त्यही दिन्छ। नाम लिनुभन्दा चार युनिट अघि नै युनिट २ मा भेटिने call by reference यही हो।'
    }
  },

  {
    id: 'g9.c.q14', subject: 'grade9/c-programming', unit: 'u2',
    topic: 'operator-precedence', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'What value is stored in a by: a = 10 + 4 * 2 % 3;',
      ne: 'a = 10 + 4 * 2 % 3; ले a मा कुन मान राख्छ?'
    },
    options: [
      { en: '12', ne: '12' },
      { en: '1', ne: '1' },
      { en: '11', ne: '11' },
      { en: '0', ne: '0' }
    ],
    answer: 0,
    explanation: {
      en: '* and % have the same precedence, which is higher than +, and they associate left to right. So 4 * 2 is worked out first giving 8, then 8 % 3 gives the remainder 2, then 10 + 2 gives 12. Reading the line left to right like a sentence would give 14 * 2 = 28, then 28 % 3 = 1, which is option B and is how this question is usually got wrong.',
      ne: '* र % को precedence उस्तै छ, + भन्दा माथि, र यी बायाँबाट दायाँ जान्छन्। त्यसैले पहिले 4 * 2 = 8, अनि 8 % 3 को शेष 2, अनि 10 + 2 = 12। वाक्यजस्तै बायाँबाट दायाँ पढे 14 * 2 = 28, अनि 28 % 3 = 1 आउँथ्यो — त्यो विकल्प (ख) हो र यो प्रश्न प्रायः त्यसरी नै बिग्रन्छ।'
    }
  },

  {
    id: 'g9.c.q15', subject: 'grade9/c-programming', unit: 'u2',
    topic: 'integer-division', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'float x; x = 7 / 2; printf("%.1f", x);  What is printed?',
      ne: 'float x; x = 7 / 2; printf("%.1f", x);  के छापिन्छ?'
    },
    options: [
      { en: '3.5', ne: '3.5' },
      { en: '3.0', ne: '3.0' },
      { en: '4.0', ne: '4.0' },
      { en: 'The program does not compile', ne: 'प्रोग्राम compile हुँदैन' }
    ],
    explanation: {
      en: '7 and 2 are both integers, so the division is integer division and the remainder is discarded before anything is stored: the result is 3, not 3.5 and not rounded to 4. Storing 3 in a float gives 3.0, and that is what prints. The variable being a float does not help, because the division finished before the float was involved. Writing 7.0 / 2 or (float) 7 / 2 gives 3.5.',
      ne: '7 र 2 दुवै integer भएकाले भाग integer division हो र केही भण्डारण हुनुअघि नै शेष फालिन्छ: नतिजा 3 हो — 3.5 पनि होइन, round गरेर 4 पनि होइन। 3 लाई float मा राख्दा 3.0 हुन्छ र त्यही छापिन्छ। Variable float हुनुले सहयोग गर्दैन, किनभने float बीचमा आउनुअघि नै भाग सकियो। 7.0 / 2 वा (float) 7 / 2 लेखे 3.5 आउँछ।'
    },
    answer: 1
  },

  {
    id: 'g9.c.q16', subject: 'grade9/c-programming', unit: 'u2',
    topic: 'increment-operator', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'int i = 5, j; j = i++; What are i and j afterwards?',
      ne: 'int i = 5, j; j = i++; पछि i र j को मान के हुन्छ?'
    },
    options: [
      { en: 'i = 6 and j = 6', ne: 'i = 6 र j = 6' },
      { en: 'i = 6 and j = 5', ne: 'i = 6 र j = 5' },
      { en: 'i = 5 and j = 5', ne: 'i = 5 र j = 5' },
      { en: 'i = 5 and j = 6', ne: 'i = 5 र j = 6' }
    ],
    answer: 1,
    explanation: {
      en: 'i++ is the POST-increment: the old value of i is used in the expression first, and only then is i increased. So j receives 5 and i becomes 6. Writing j = ++i instead would increase i first and give j the new value, making both 6. On a line of its own, i++ and ++i do exactly the same thing, which is why the difference only shows up when the value is being used.',
      ne: 'i++ POST-increment हो: पहिले expression मा i को पुरानो मान प्रयोग हुन्छ, अनि मात्र i बढ्छ। त्यसैले j ले 5 पाउँछ र i 6 हुन्छ। बरु j = ++i लेखे पहिले i बढेर j ले नयाँ मान पाउँथ्यो र दुवै 6 हुन्थे। एक्लै लाइनमा i++ र ++i ले ठ्याक्कै उही काम गर्छन् — त्यसैले फरक मान प्रयोग हुँदा मात्र देखिन्छ।'
    }
  },

  /* ================= UNIT 3 — Control Flow Statements ================= */

  {
    id: 'g9.c.q17', subject: 'grade9/c-programming', unit: 'u3',
    topic: 'loop-at-least-once', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which loop always executes its body at least once?',
      ne: 'कुन loop ले आफ्नो body कम्तीमा एक पटक सधैं चलाउँछ?'
    },
    options: [
      { en: 'for loop', ne: 'for loop' },
      { en: 'while loop', ne: 'while loop' },
      { en: 'do-while loop', ne: 'do-while loop' },
      { en: 'All three do', ne: 'तीनै ले' }
    ],
    answer: 2,
    explanation: {
      en: 'A do-while runs the body first and tests the condition afterwards, so the body has already happened by the time the condition is looked at. for and while both test before each turn, so if the condition is false at the start the body runs zero times. This is the single difference between the loops and it is the most asked question from this unit.',
      ne: 'do-while ले पहिले body चलाउँछ र पछि सर्त जाँच्छ, त्यसैले सर्त हेरिने बेलासम्म body भइसकेको हुन्छ। for र while दुवैले हरेक पटकअघि जाँच्छन्, त्यसैले सुरुमै सर्त असत्य भए body शून्य पटक चल्छ। Loop बीचको एउटै फरक यही हो र यस युनिटबाट सबैभन्दा धेरै सोधिने प्रश्न पनि यही।'
    }
  },

  {
    id: 'g9.c.q18', subject: 'grade9/c-programming', unit: 'u3',
    topic: 'switch-fallthrough', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'int n = 2; switch (n) { case 1: printf("A"); case 2: printf("B"); case 3: printf("C"); default: printf("D"); }  What is printed?',
      ne: 'int n = 2; switch (n) { case 1: printf("A"); case 2: printf("B"); case 3: printf("C"); default: printf("D"); }  के छापिन्छ?'
    },
    options: [
      { en: 'B', ne: 'B' },
      { en: 'BCD', ne: 'BCD' },
      { en: 'ABCD', ne: 'ABCD' },
      { en: 'BD', ne: 'BD' }
    ],
    answer: 1,
    explanation: {
      en: 'There is no break anywhere in this switch. Control enters at the matching label, case 2, and then FALLS THROUGH every case below it, including default, running each printf in turn: B, then C, then D. The case labels only decide where execution starts; break is what decides where it stops. Adding break after each case would print B alone.',
      ne: 'यो switch मा कतै break छैन। नियन्त्रण मिल्ने label — case 2 — मा छिर्छ र त्यसपछि default सहित तलका हरेक case मा FALL THROUGH गर्दै हरेक printf चलाउँछ: B, अनि C, अनि D। Case का label ले चल्न कहाँबाट सुरु हुने मात्र तय गर्छन्; कहाँ रोकिने break ले तय गर्छ। हरेक case पछि break थपे B मात्र छापिन्थ्यो।'
    }
  },

  {
    id: 'g9.c.q19', subject: 'grade9/c-programming', unit: 'u3',
    topic: 'for-iteration-count', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'How many times does the body run in: for (i = 0; i < 5; i++) ?',
      ne: 'for (i = 0; i < 5; i++) मा body कति पटक चल्छ?'
    },
    options: [
      { en: '4 times', ne: '४ पटक' },
      { en: '5 times', ne: '५ पटक' },
      { en: '6 times', ne: '६ पटक' },
      { en: 'Forever', ne: 'सधैं' }
    ],
    answer: 1,
    explanation: {
      en: 'i takes the values 0, 1, 2, 3 and 4 — five turns — and then becomes 5, at which point 5 < 5 is false and the loop ends. Counting from zero with a strictly-less-than condition always gives exactly the number in the condition, which is why array loops are written this way. Changing the condition to i <= 5 would give six turns and, over an array of size 5, would read past the end.',
      ne: 'i ले 0, 1, 2, 3 र 4 मान लिन्छ — पाँच पटक — अनि 5 हुन्छ, र त्यहाँ 5 < 5 असत्य भएर loop सकिन्छ। शून्यबाट सुरु गरेर "भन्दा सानो" सर्त राख्दा सधैं सर्तमा लेखिएकै सङ्ख्या जति पटक चल्छ — त्यसैले array का loop यसरी लेखिन्छन्। सर्त i <= 5 बनाए छ पटक चल्थ्यो र पाँच आकारको array मा अन्त्यभन्दा पर पढ्थ्यो।'
    }
  },

  {
    id: 'g9.c.q20', subject: 'grade9/c-programming', unit: 'u3',
    topic: 'continue-output', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'for (i = 1; i <= 5; i++) { if (i == 3) continue; printf("%d", i); }  What is printed?',
      ne: 'for (i = 1; i <= 5; i++) { if (i == 3) continue; printf("%d", i); }  के छापिन्छ?'
    },
    options: [
      { en: '12', ne: '12' },
      { en: '1245', ne: '1245' },
      { en: '12345', ne: '12345' },
      { en: '345', ne: '345' }
    ],
    answer: 1,
    explanation: {
      en: 'continue abandons only the rest of the current turn and jumps to i++, so when i is 3 the printf below it is skipped and the loop carries on. The output is therefore 1, 2, 4, 5 with 3 missing. If the statement had been break, the loop itself would have ended at i == 3 and the output would be 12 — which is option A, and telling the two apart is exactly what this question is for.',
      ne: 'continue ले यस पटकको बाँकी मात्र छाडेर i++ मा हाम फाल्छ, त्यसैले i 3 हुँदा तलको printf छुट्छ र loop चलिरहन्छ। त्यसैले output 1, 2, 4, 5 हुन्छ, 3 छुटेर। Statement break भएको भए i == 3 मै loop सकिन्थ्यो र output 12 हुन्थ्यो — त्यो विकल्प (क) हो, र यी दुई छुट्याउनु नै यो प्रश्नको उद्देश्य हो।'
    }
  },

  {
    id: 'g9.c.q21', subject: 'grade9/c-programming', unit: 'u3',
    topic: 'empty-body-semicolon', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'for (i = 1; i <= 3; i++);  printf("Hi");   How many times is Hi printed?',
      ne: 'for (i = 1; i <= 3; i++);  printf("Hi");   Hi कति पटक छापिन्छ?'
    },
    options: [
      { en: 'Three times', ne: 'तीन पटक' },
      { en: 'Once', ne: 'एक पटक' },
      { en: 'Never — it is a compile error', ne: 'कहिल्यै होइन — यो compile त्रुटि हो' },
      { en: 'Four times', ne: 'चार पटक' }
    ],
    answer: 1,
    explanation: {
      en: 'The semicolon straight after the for brackets is a complete, empty statement, and that empty statement is the loop body. So the loop runs three times doing nothing at all, and the printf is simply the next statement after the loop, which runs once. The program compiles without a single warning, which is what makes this mistake expensive: nothing tells you, and the output is one line where three were expected.',
      ne: 'For को कोष्ठकपछि सिधै आउने semicolon पूरै खाली statement हो, र त्यही खाली statement loop को body हो। त्यसैले loop तीन पटक केही नगरी चल्छ, र printf loop पछिको अर्को statement मात्र भएकाले एक पटक चल्छ। प्रोग्राम एउटै चेतावनीविना compile हुन्छ — यही गल्ती महँगो हुनुको कारण त्यही हो: कसैले भन्दैन, र तीन लाइनको अपेक्षामा एक लाइन आउँछ।'
    }
  },

  {
    id: 'g9.c.q22', subject: 'grade9/c-programming', unit: 'u3',
    topic: 'nested-loop-count', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'for (i = 1; i <= 3; i++) for (j = 1; j <= 4; j++) printf("*");  How many stars are printed?',
      ne: 'for (i = 1; i <= 3; i++) for (j = 1; j <= 4; j++) printf("*");  कति तारा छापिन्छन्?'
    },
    options: [
      { en: '7', ne: '७' },
      { en: '12', ne: '१२' },
      { en: '4', ne: '४' },
      { en: '3', ne: '३' }
    ],
    answer: 1,
    explanation: {
      en: 'The inner loop completes all of its turns for each single turn of the outer loop, so the counts multiply rather than add: 3 x 4 = 12. Adding them would give 7, which is option A and the usual wrong answer. In a pattern program the outer loop is the rows and the inner loop is the columns, so this is a rectangle of three rows and four columns.',
      ne: 'बाहिरी loop को हरेक एक पटकका लागि भित्री loop ले आफ्ना सबै पटक पूरा गर्छ, त्यसैले गन्ती जोडिँदैन, गुणन हुन्छ: 3 x 4 = 12। जोडे 7 आउँथ्यो — त्यो विकल्प (क) हो र सामान्य गलत उत्तर पनि। ढाँचाको प्रोग्राममा बाहिरी loop पङ्क्ति र भित्री loop स्तम्भ हो, त्यसैले यो तीन पङ्क्ति र चार स्तम्भको आयात हो।'
    }
  },

  {
    id: 'g9.c.q23', subject: 'grade9/c-programming', unit: 'u3',
    topic: 'ladder-order', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A grading program tests if (marks >= 40) first, then else if (marks >= 80). A student scores 95. What is reported?',
      ne: 'एउटा grading प्रोग्रामले पहिले if (marks >= 40) जाँच्छ, अनि else if (marks >= 80)। विद्यार्थीले ९५ ल्यायो। के भनिन्छ?'
    },
    options: [
      { en: 'Distinction, because 95 is at least 80',
        ne: 'Distinction, किनभने ९५ कम्तीमा ८० छ' },
      { en: 'The grade for 40 and above, because the first true test wins and the rest are never reached',
        ne: '४० माथिको grade, किनभने पहिलो सत्य जाँच जित्छ र बाँकीसम्म पुगिँदैन' },
      { en: 'Both branches run', ne: 'दुवै शाखा चल्छन्' },
      { en: 'Nothing — the conditions overlap so the program is invalid',
        ne: 'केही पनि होइन — सर्त बाझिएकाले प्रोग्राम अमान्य हुन्छ' }
    ],
    answer: 1,
    explanation: {
      en: 'An if-else-if ladder tests its conditions in order and stops at the first one that is true. 95 is at least 40, so that branch runs and the else if below it is never even evaluated. The conditions overlap, which is legal and is exactly why order matters: a ladder on ranges must be written from the narrowest or highest condition downwards.',
      ne: 'if-else-if शृंखलाले सर्तहरू क्रमैसँग जाँच्छ र पहिलो सत्यमा रोकिन्छ। ९५ कम्तीमा ४० छ, त्यसैले त्यही शाखा चल्छ र तलको else if मूल्याङ्कन नै हुँदैन। सर्त बाझिनु मान्य छ, र क्रम महत्त्वपूर्ण हुनुको कारण पनि त्यही: दायराको शृंखला सबैभन्दा साँघुरो वा अग्लो सर्तबाट तलतिर लेख्नुपर्छ।'
    }
  },

  {
    id: 'g9.c.q24', subject: 'grade9/c-programming', unit: 'u3',
    topic: 'counter-after-loop', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'After for (i = 1; i <= 5; i++) { } finishes, what is the value of i?',
      ne: 'for (i = 1; i <= 5; i++) { } सकिएपछि i को मान कति हुन्छ?'
    },
    options: [
      { en: '5', ne: '५' },
      { en: '6', ne: '६' },
      { en: '0', ne: '०' },
      { en: 'It is undefined after the loop', ne: 'Loop पछि यो अनिश्चित हुन्छ' }
    ],
    answer: 1,
    explanation: {
      en: 'The loop ends only when the condition becomes false, and that cannot happen until i has already been increased past 5. The last body turn runs with i = 5, then i++ makes it 6, then 6 <= 5 is false and the loop stops — so i is 6. The counter is an ordinary variable declared outside the loop, so it keeps that value afterwards, and output questions are regularly built on exactly this.',
      ne: 'Loop सर्त असत्य भएपछि मात्र सकिन्छ, र त्यो i ५ नाघेर नबढेसम्म हुन सक्दैन। अन्तिम पटक body i = 5 मा चल्छ, अनि i++ ले 6 बनाउँछ, अनि 6 <= 5 असत्य भएर loop रोकिन्छ — त्यसैले i 6 हुन्छ। Counter loop बाहिर घोषणा गरिएको सामान्य variable भएकाले पछि पनि त्यही मान राख्छ, र output का प्रश्न ठ्याक्कै यसैमा बनेका हुन्छन्।'
    }
  },

  {
    id: 'g9.c.q25', subject: 'grade9/c-programming', unit: 'u3',
    topic: 'while-zero-times', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'int n = 10; while (n < 5) { printf("Hello"); }  What does this print?',
      ne: 'int n = 10; while (n < 5) { printf("Hello"); }  यसले के छाप्छ?'
    },
    options: [
      { en: 'Hello, once', ne: 'Hello, एक पटक' },
      { en: 'Nothing at all', ne: 'केही पनि होइन' },
      { en: 'Hello forever', ne: 'Hello सधैं' },
      { en: 'Hello five times', ne: 'Hello पाँच पटक' }
    ],
    answer: 1,
    explanation: {
      en: 'A while loop tests its condition before every turn, including the first. 10 < 5 is false immediately, so the body never runs and nothing is printed. Note that this is not an infinite loop: it would be one if the condition were true and nothing inside changed n, which is a different mistake. The same code written as a do-while would print Hello once.',
      ne: 'While loop ले हरेक पटकअघि — पहिलो पटक पनि — सर्त जाँच्छ। 10 < 5 तुरुन्तै असत्य छ, त्यसैले body कहिल्यै चल्दैन र केही छापिँदैन। ध्यान दिनुहोस् — यो अनन्त loop होइन: सर्त सत्य भएर भित्र n नबदलिएको भए त्यो हुन्थ्यो, र त्यो अर्कै गल्ती हो। उही कोड do-while मा लेखे Hello एक पटक छापिन्थ्यो।'
    }
  },

  {
    id: 'g9.c.q26', subject: 'grade9/c-programming', unit: 'u3',
    topic: 'goto-statement', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'What does the goto statement do?',
      ne: 'goto statement ले के गर्छ?'
    },
    options: [
      { en: 'It ends the loop it is inside', ne: 'यो भएको loop सिध्याउँछ' },
      { en: 'It transfers control to a labelled statement elsewhere in the same function',
        ne: 'यसले नियन्त्रण उही function भित्र label लेखिएको statement मा सार्छ' },
      { en: 'It calls another function', ne: 'यसले अर्को function बोलाउँछ' },
      { en: 'It skips the current turn of a loop', ne: 'यसले loop को यस पटकको काम छाड्छ' }
    ],
    answer: 1,
    explanation: {
      en: 'goto is written as goto label; with label: marking the destination somewhere in the same function. It is the only one of the four jump statements that names a destination — break ends a loop, continue skips a turn, and return ends a function. It is on the syllabus and examinable, and almost every real program is clearer without it, because a reader can no longer work out what reaches a line by reading downwards.',
      ne: 'goto लाई goto label; लेखिन्छ र उही function भित्र कतै label: ले गन्तव्य जनाउँछ। चार jump statement मध्ये गन्तव्यको नाम लिने एकमात्र यही हो — break ले loop सिध्याउँछ, continue ले एक पटक छाड्छ, return ले function सिध्याउँछ। यो पाठ्यक्रममा छ र सोधिन्छ, तर झन्डै हरेक वास्तविक प्रोग्राम यसविना स्पष्ट हुन्छ, किनभने कुन लाइनमा के पुग्छ तलतिर पढेर थाहा पाउन सकिँदैन।'
    }
  },

  {
    id: 'g9.c.q27', subject: 'grade9/c-programming', unit: 'u3',
    topic: 'switch-expression-type', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which of these can NOT be used in a switch statement?',
      ne: 'यीमध्ये कुन switch statement मा प्रयोग गर्न मिल्दैन?'
    },
    options: [
      { en: 'An int variable', ne: 'int variable' },
      { en: 'A char variable', ne: 'char variable' },
      { en: 'A float variable, or a range such as case 40 to 59',
        ne: 'float variable, वा case 40 देखि 59 जस्तो दायरा' },
      { en: 'A default label', ne: 'default label' }
    ],
    answer: 2,
    explanation: {
      en: 'A switch tests one value against exact constant labels, so the expression must be an integer type — int or char — and each case must be a single constant. A float cannot be used, and a range cannot be written as a case at all. That is why grading from marks needs an if-else-if ladder: the ladder can test ranges and the switch cannot.',
      ne: 'Switch ले एउटा मानलाई ठ्याक्कै मिल्ने constant label सँग जाँच्छ, त्यसैले expression पूर्णाङ्क प्रकारको — int वा char — हुनुपर्छ र हरेक case एउटै constant। Float चल्दैन, र दायरा case मा लेख्नै मिल्दैन। अंकबाट grade निकाल्न if-else-if शृंखला चाहिनुको कारण त्यही हो: शृंखलाले दायरा जाँच्न सक्छ, switch ले सक्दैन।'
    }
  },

  {
    id: 'g9.c.q28', subject: 'grade9/c-programming', unit: 'u3',
    topic: 'dowhile-syntax', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which loop requires a semicolon after its closing condition?',
      ne: 'कुन loop लाई सर्तको कोष्ठकपछि semicolon चाहिन्छ?'
    },
    options: [
      { en: 'for', ne: 'for' },
      { en: 'while', ne: 'while' },
      { en: 'do-while', ne: 'do-while' },
      { en: 'None of them', ne: 'कुनैलाई पनि होइन' }
    ],
    answer: 2,
    explanation: {
      en: 'A do-while ends with while (condition); and that semicolon is compulsory, because the whole do-while is one statement that finishes there. A for or a while heading is followed by the body, so a semicolon after it would end the statement early and leave an empty body — which compiles and silently changes the program.',
      ne: 'do-while while (condition); ले सकिन्छ र त्यो semicolon अनिवार्य छ, किनभने पूरै do-while एउटै statement हो जो त्यहीँ सकिन्छ। for वा while को शीर्षकपछि body आउँछ, त्यसैले त्यहाँ semicolon राखे statement चाँडै सकिन्छ र body खाली रहन्छ — जुन compile हुन्छ र प्रोग्राम चुपचाप बदल्छ।'
    }
  },

  {
    id: 'g9.c.q29', subject: 'grade9/c-programming', unit: 'u3',
    topic: 'infinite-loop-cause', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'i = 1; while (i <= 5) { printf("%d", i); }  Why does this never stop?',
      ne: 'i = 1; while (i <= 5) { printf("%d", i); }  यो किन कहिल्यै रोकिँदैन?'
    },
    options: [
      { en: 'Because while loops cannot be stopped', ne: 'किनभने while loop रोक्नै मिल्दैन' },
      { en: 'Because nothing inside the loop changes i, so the condition stays true forever',
        ne: 'किनभने loop भित्र i लाई केहीले बदल्दैन, त्यसैले सर्त सधैं सत्य रहन्छ' },
      { en: 'Because i was initialised outside the loop',
        ne: 'किनभने i loop बाहिर initialise गरिएको थियो' },
      { en: 'Because printf resets i to 1 each time',
        ne: 'किनभने printf ले हरेक पटक i लाई १ बनाउँछ' }
    ],
    answer: 1,
    explanation: {
      en: 'Every loop needs three things: an initialisation, a condition and an UPDATE. A for loop puts all three on one line so the update is hard to forget; a while loop leaves the update inside the body, and here it is missing. i stays 1, the condition stays true, and the loop runs until the program is killed. Adding i++ inside the braces fixes it.',
      ne: 'हरेक loop लाई तीन कुरा चाहिन्छ: initialisation, सर्त र UPDATE। For loop ले तीनै एउटै लाइनमा राख्छ त्यसैले update बिर्सन गाह्रो हुन्छ; while ले update body भित्र छाड्छ, र यहाँ त्यही छुटेको छ। i १ मै रहन्छ, सर्त सत्य रहन्छ, र प्रोग्राम नमारेसम्म loop चल्छ। Brace भित्र i++ थपे ठिक हुन्छ।'
    }
  },

  {
    id: 'g9.c.q30', subject: 'grade9/c-programming', unit: 'u3',
    topic: 'break-nested-scope', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A break statement is placed inside the INNER of two nested loops. What does it leave?',
      ne: 'दुई nested loop मध्ये भित्रीमा break राखिएको छ। यसले के छाड्छ?'
    },
    options: [
      { en: 'Both loops', ne: 'दुवै loop' },
      { en: 'Only the inner loop; the outer loop continues with its next turn',
        ne: 'भित्री loop मात्र; बाहिरी loop आफ्नो अर्को पटकबाट चलिरहन्छ' },
      { en: 'Only the outer loop', ne: 'बाहिरी loop मात्र' },
      { en: 'The whole function', ne: 'पूरै function' }
    ],
    answer: 1,
    explanation: {
      en: 'break leaves the single nearest enclosing loop and nothing more. Control resumes after the inner loop, still inside the outer one, which then carries on with its next turn. Leaving both needs a flag variable tested by the outer condition, or a return if the loops are alone in a function. Expecting one break to escape two loops is one of the standard wrong answers in this unit.',
      ne: 'break ले आफूलाई घेर्ने सबैभन्दा नजिकको एउटै loop छाड्छ, त्योभन्दा बढी होइन। नियन्त्रण भित्री loop पछि, तर बाहिरी loop भित्रै फर्कन्छ, र बाहिरी loop आफ्नो अर्को पटक सुरु गर्छ। दुवै छाड्न बाहिरी सर्तले जाँच्ने flag variable चाहिन्छ, वा loop हरू function मा एक्लै भए return। एउटा break ले दुई loop उम्कन्छ भन्ने अपेक्षा यस युनिटका मानक गलत उत्तरमध्ये एक हो।'
    }
  },

  /* ================= UNIT 4 — Functions ================= */

  {
    id: 'g9.c.q31', subject: 'grade9/c-programming', unit: 'u4',
    topic: 'prototype-identification', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which of these is a function DECLARATION (prototype)?',
      ne: 'यीमध्ये कुन function को DECLARATION (prototype) हो?'
    },
    options: [
      { en: 'int add(int a, int b) { return a + b; }', ne: 'int add(int a, int b) { return a + b; }' },
      { en: 'int add(int a, int b);', ne: 'int add(int a, int b);' },
      { en: 'sum = add(5, 7);', ne: 'sum = add(5, 7);' },
      { en: 'add;', ne: 'add;' }
    ],
    answer: 1,
    explanation: {
      en: 'A prototype gives the return type, the name and the parameter types, and ends with a semicolon. It promises the compiler that the function exists somewhere so a call can be checked before the body is read. Option A is the definition, with the body in braces and no semicolon after the closing brace. Option C is a call, with real values inside the brackets.',
      ne: 'Prototype ले return प्रकार, नाम र parameter का प्रकार दिन्छ र semicolon ले सकिन्छ। यसले compiler लाई function कतै छ भन्ने वाचा दिन्छ, ताकि body पढ्नुअघि call जाँच्न सकियोस्। विकल्प (क) definition हो — brace भित्र body र बन्द brace पछि semicolon छैन। विकल्प (ग) call हो, कोष्ठकभित्र वास्तविक मान सहित।'
    }
  },

  {
    id: 'g9.c.q32', subject: 'grade9/c-programming', unit: 'u4',
    topic: 'call-by-value-output', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'void change(int x) { x = 100; }  int main() { int n = 5; change(n); printf("%d", n); }  What is printed?',
      ne: 'void change(int x) { x = 100; }  int main() { int n = 5; change(n); printf("%d", n); }  के छापिन्छ?'
    },
    options: [
      { en: '100', ne: '100' },
      { en: '5', ne: '5' },
      { en: '0', ne: '0' },
      { en: 'The program does not compile', ne: 'प्रोग्राम compile हुँदैन' }
    ],
    answer: 1,
    explanation: {
      en: 'change is called by value, so a copy of n is made and handed over as x. The function sets the copy to 100 and then ends, taking the copy with it. n in main was never touched and still holds 5. To change n the function would need its address: void change(int *x) with *x = 100; called as change(&n).',
      ne: 'change call by value बाट बोलाइएको छ, त्यसैले n को प्रतिलिपि बनेर x का रूपमा जान्छ। Function ले प्रतिलिपिलाई 100 बनाएर सकिन्छ, र प्रतिलिपि पनि सँगै जान्छ। main को n छोइएकै थिएन र अझै 5 छ। n बदल्न function लाई ठेगाना चाहिन्थ्यो: void change(int *x) र भित्र *x = 100;, change(&n) ले बोलाएर।'
    }
  },

  {
    id: 'g9.c.q33', subject: 'grade9/c-programming', unit: 'u4',
    topic: 'call-by-reference-output', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'void swap(int *x, int *y) { int t = *x; *x = *y; *y = t; }  int main() { int a = 5, b = 9; swap(&a, &b); printf("%d %d", a, b); }  What is printed?',
      ne: 'void swap(int *x, int *y) { int t = *x; *x = *y; *y = t; }  int main() { int a = 5, b = 9; swap(&a, &b); printf("%d %d", a, b); }  के छापिन्छ?'
    },
    options: [
      { en: '5 9', ne: '5 9' },
      { en: '9 5', ne: '9 5' },
      { en: '9 9', ne: '9 9' },
      { en: 'Two addresses', ne: 'दुई ठेगाना' }
    ],
    answer: 1,
    explanation: {
      en: 'The ampersands send the addresses of a and b, and the stars inside the function reach back to those addresses. t keeps the value at x, which is 5; then *x = *y writes 9 into a; then *y = t writes 5 into b. Nothing is returned and nothing needs to be, because the function wrote directly into main\'s memory. Remove the two ampersands and the two stars and the same program would print 5 9.',
      ne: 'Ampersand ले a र b का ठेगाना पठाउँछन्, र function भित्रका star ले ती ठेगानासम्म पुग्छन्। t ले x को ठेगानाको मान — 5 — राख्छ; अनि *x = *y ले a मा 9 लेख्छ; अनि *y = t ले b मा 5 लेख्छ। केही फर्काइँदैन र चाहिँदैन पनि, किनभने function ले सिधै main को मेमोरीमा लेख्यो। दुई ampersand र दुई star हटाए उही प्रोग्रामले 5 9 छाप्थ्यो।'
    }
  },

  {
    id: 'g9.c.q34', subject: 'grade9/c-programming', unit: 'u4',
    topic: 'library-function', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which of these is a library function, and which header does it need?',
      ne: 'यीमध्ये कुन library function हो, र यसलाई कुन header चाहिन्छ?'
    },
    options: [
      { en: 'larger() — it needs stdio.h', ne: 'larger() — यसलाई stdio.h चाहिन्छ' },
      { en: 'strlen() — it needs string.h', ne: 'strlen() — यसलाई string.h चाहिन्छ' },
      { en: 'main() — it needs math.h', ne: 'main() — यसलाई math.h चाहिन्छ' },
      { en: 'swap() — it needs stdlib.h', ne: 'swap() — यसलाई stdlib.h चाहिन्छ' }
    ],
    answer: 1,
    explanation: {
      en: 'A library function comes with the compiler already written and already compiled; you include its header and call it. strlen lives in string.h, as strcpy, strcat and strcmp do. printf and scanf need stdio.h, and sqrt and pow need math.h. larger and swap are names a programmer chooses, which makes them user-defined, and main is the function the program starts from rather than a library one.',
      ne: 'Library function compiler सँगै पहिल्यै लेखिएर compile भइसकेको आउँछ; तपाईंले header include गरेर बोलाउनुहुन्छ। strlen string.h मा छ, strcpy, strcat र strcmp जस्तै। printf र scanf लाई stdio.h, sqrt र pow लाई math.h चाहिन्छ। larger र swap प्रोग्रामरले छानेका नाम हुन् — त्यसैले ती user-defined हुन् — र main प्रोग्राम सुरु हुने function हो, library को होइन।'
    }
  },

  {
    id: 'g9.c.q35', subject: 'grade9/c-programming', unit: 'u4',
    topic: 'base-case', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'What happens if a recursive function is written without a base case?',
      ne: 'Base case नलेखी recursive function बनाए के हुन्छ?'
    },
    options: [
      { en: 'It returns 0 automatically', ne: 'यसले आफैं ० फर्काउँछ' },
      { en: 'The calls never stop, the stack fills up and the program crashes',
        ne: 'Call कहिल्यै रोकिँदैनन्, stack भरिन्छ र प्रोग्राम crash हुन्छ' },
      { en: 'The compiler adds one for you', ne: 'Compiler ले आफैं एउटा थपिदिन्छ' },
      { en: 'It runs once and stops', ne: 'यो एक पटक चलेर रोकिन्छ' }
    ],
    answer: 1,
    explanation: {
      en: 'The base case is the condition under which the function returns an answer WITHOUT calling itself, and it is the only thing that ends the recursion. Without it every call makes another call. Each unfinished call occupies memory on the stack, so this is not a quiet infinite loop — the stack runs out and the program stops with a stack overflow. That is a different failure from an endless while loop, and knowing which one you get is the point of the question.',
      ne: 'Base case भनेको function ले आफैंलाई नबोलाई उत्तर फर्काउने सर्त हो, र recursion सिध्याउने एकमात्र कुरा त्यही हो। त्यो नभए हरेक call ले अर्को call गर्छ। हरेक अधुरो call ले stack मा मेमोरी ओगट्छ, त्यसैले यो चुपचापको अनन्त loop होइन — stack सकिन्छ र प्रोग्राम stack overflow भएर रोकिन्छ। अनन्त while loop भन्दा यो फरक असफलता हो, र कुन आउँछ थाहा पाउनु नै प्रश्नको उद्देश्य हो।'
    }
  },

  {
    id: 'g9.c.q36', subject: 'grade9/c-programming', unit: 'u4',
    topic: 'recursion-trace', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'int f(int n) { if (n == 1) return 1; return n * f(n - 1); }  What does f(4) return, and how many times is f called in total?',
      ne: 'int f(int n) { if (n == 1) return 1; return n * f(n - 1); }  f(4) ले के फर्काउँछ, र जम्मा कति पटक f बोलाइन्छ?'
    },
    options: [
      { en: '24, called 4 times', ne: '२४, ४ पटक बोलाइन्छ' },
      { en: '24, called 3 times', ne: '२४, ३ पटक बोलाइन्छ' },
      { en: '10, called 4 times', ne: '१०, ४ पटक बोलाइन्छ' },
      { en: '12, called 2 times', ne: '१२, २ पटक बोलाइन्छ' }
    ],
    answer: 0,
    explanation: {
      en: 'This is factorial. f(4) calls f(3), which calls f(2), which calls f(1); f(1) hits the base case and returns 1 without calling again. That is four calls in all. The multiplications then happen on the way back: 2 x 1 = 2, 3 x 2 = 6, 4 x 6 = 24. Every multiplication waits until the innermost call has returned, which is why four unfinished calls exist on the stack at the same moment.',
      ne: 'यो factorial हो। f(4) ले f(3) बोलाउँछ, त्यसले f(2), त्यसले f(1); f(1) base case मा पुगेर फेरि नबोलाई 1 फर्काउँछ। जम्मा चार call भए। गुणन फर्कंदा हुन्छ: 2 x 1 = 2, 3 x 2 = 6, 4 x 6 = 24। हरेक गुणन सबैभन्दा भित्रको call नफर्कंदासम्म पर्खन्छ — त्यसैले एकै क्षणमा stack मा चार अधुरा call हुन्छन्।'
    }
  },

  {
    id: 'g9.c.q37', subject: 'grade9/c-programming', unit: 'u4',
    topic: 'void-meaning', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'In void show(void), what do the two uses of void mean?',
      ne: 'void show(void) मा void को दुई प्रयोगको अर्थ के हो?'
    },
    options: [
      { en: 'The function is empty and does nothing', ne: 'Function खाली छ र केही गर्दैन' },
      { en: 'The first says no value is returned; the second says no argument is taken',
        ne: 'पहिलोले कुनै मान फर्कंदैन भन्छ; दोस्रोले कुनै argument लिँदैन भन्छ' },
      { en: 'The function may be called only once', ne: 'Function एक पटक मात्र बोलाउन मिल्छ' },
      { en: 'Both mean the function returns zero', ne: 'दुवैको अर्थ function ले शून्य फर्काउँछ' }
    ],
    answer: 1,
    explanation: {
      en: 'void means "nothing here". In front of the name it is the return type, saying no value comes back — so the call cannot be used on the right of an assignment. Inside the brackets it is the parameter list, saying nothing goes in. A function that prints a line of stars is the usual example: it needs no input and produces no value, only an effect on the screen.',
      ne: 'void को अर्थ "यहाँ केही छैन" हो। नाम अगाडि यो return प्रकार हो — कुनै मान फर्कंदैन भन्छ, त्यसैले call लाई assignment को दायाँपट्टि राख्न मिल्दैन। कोष्ठकभित्र यो parameter सूची हो — केही भित्र जाँदैन भन्छ। ताराको लाइन छाप्ने function सामान्य उदाहरण हो: यसलाई input चाहिँदैन र मान दिँदैन, पर्दामा असर मात्र पार्छ।'
    }
  },

  {
    id: 'g9.c.q38', subject: 'grade9/c-programming', unit: 'u4',
    topic: 'return-count', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'How many values can a C function return to its caller through return?',
      ne: 'C को function ले return मार्फत बोलाउनेलाई कति मान फर्काउन सक्छ?'
    },
    options: [
      { en: 'Any number, separated by commas', ne: 'जति पनि, comma ले छुट्याएर' },
      { en: 'At most one', ne: 'बढीमा एउटा' },
      { en: 'Exactly two', ne: 'ठ्याक्कै दुई' },
      { en: 'None — functions cannot return values', ne: 'एउटा पनि होइन — function ले मान फर्काउनै सक्दैन' }
    ],
    answer: 1,
    explanation: {
      en: 'A function takes any number of arguments and returns at most one value. That asymmetry is not a detail of syntax — it is the whole reason call by reference exists. A function that must give back two answers, such as a swap, sends them out through pointers instead, by writing into the caller\'s memory rather than returning anything at all.',
      ne: 'Function ले जति पनि argument लिन्छ र बढीमा एउटा मान फर्काउँछ। यो असमानता syntax को सानो कुरा होइन — call by reference हुनुको पूरै कारण त्यही हो। swap जस्तो दुई उत्तर फर्काउनुपर्ने function ले केही नफर्काई बोलाउनेको मेमोरीमै लेखेर pointer मार्फत ती बाहिर पठाउँछ।'
    }
  },

  {
    id: 'g9.c.q39', subject: 'grade9/c-programming', unit: 'u4',
    topic: 'argument-vs-parameter', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'In int larger(int x, int y) called as larger(a, b), which are the arguments and which are the parameters?',
      ne: 'int larger(int x, int y) लाई larger(a, b) ले बोलाउँदा argument कुन हुन् र parameter कुन?'
    },
    options: [
      { en: 'x and y are the arguments; a and b are the parameters',
        ne: 'x र y argument हुन्; a र b parameter हुन्' },
      { en: 'a and b are the arguments; x and y are the parameters',
        ne: 'a र b argument हुन्; x र y parameter हुन्' },
      { en: 'All four are arguments', ne: 'चारै argument हुन्' },
      { en: 'All four are parameters', ne: 'चारै parameter हुन्' }
    ],
    answer: 1,
    explanation: {
      en: 'The argument is what you send at the call, so a and b are the arguments. The parameter is the variable in the function heading that receives it, so x and y are the parameters. The names do not have to match and usually do not — the connection is made by position, first argument into first parameter, which is also why passing them in the wrong order is a bug no compiler will catch.',
      ne: 'Argument भनेको call मा पठाइने कुरा हो, त्यसैले a र b argument हुन्। Parameter भनेको function को शीर्षकमा त्यो पाउने variable हो, त्यसैले x र y parameter हुन्। नाम मिल्नै पर्दैन र प्रायः मिल्दैन पनि — जोडाइ स्थानले हुन्छ, पहिलो argument पहिलो parameter मा। त्यसैले क्रम उल्टो पठाउनु compiler ले नसमात्ने गल्ती हो।'
    }
  },

  {
    id: 'g9.c.q40', subject: 'grade9/c-programming', unit: 'u4',
    topic: 'function-advantage', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A programmer copies the same ten lines into four places instead of writing a function. What is the main cost?',
      ne: 'प्रोग्रामरले function नलेखी उही दस लाइन चार ठाउँमा सार्छ। मुख्य लागत के हो?'
    },
    options: [
      { en: 'The program runs four times slower', ne: 'प्रोग्राम चार गुणा ढिलो चल्छ' },
      { en: 'A mistake in those lines must be found and fixed in four places, and one will be missed',
        ne: 'ती लाइनको गल्ती चार ठाउँमा खोजेर सच्याउनुपर्छ, र एउटा छुट्छ' },
      { en: 'The compiler refuses duplicate code', ne: 'Compiler ले दोहोरिएको कोड अस्वीकार गर्छ' },
      { en: 'Nothing — it is exactly the same', ne: 'केही होइन — ठ्याक्कै उस्तै हो' }
    ],
    answer: 1,
    explanation: {
      en: 'Reusability is the first advantage of functions, and the cost of not having it is maintenance rather than speed. Four copies means four places to change, and the one that gets missed is a bug that appears only in that part of the program. A function also makes the code shorter and easier to read and test, and its name documents what the ten lines were for — which a copy does not.',
      ne: 'Function को पहिलो फाइदा पुनःप्रयोग हो, र त्यो नहुँदाको लागत गति होइन, मर्मत हो। चार प्रतिलिपि भनेको सच्याउने चार ठाउँ, र छुट्ने त्यो एउटा प्रोग्रामको त्यही भागमा मात्र देखिने bug बन्छ। Function ले कोड छोटो, पढ्न र जाँच्न सजिलो पनि बनाउँछ, र यसको नामले ती दस लाइन केका लागि थिए भन्छ — प्रतिलिपिले भन्दैन।'
    }
  },

  {
    id: 'g9.c.q41', subject: 'grade9/c-programming', unit: 'u4',
    topic: 'array-as-argument', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A function sorts an array passed to it as fill(marks, 5), with no ampersand at the call. Is the caller\'s array changed?',
      ne: 'कुनै function ले fill(marks, 5) ले पठाइएको array क्रम मिलाउँछ, र call मा ampersand छैन। बोलाउनेको array बदलिन्छ?'
    },
    options: [
      { en: 'No — without & it is call by value, so a copy is sorted',
        ne: 'बदलिँदैन — & नभएपछि call by value हो, त्यसैले प्रतिलिपि मिलाइन्छ' },
      { en: 'Yes — an array name is already an address, so the function receives the real array',
        ne: 'बदलिन्छ — array को नाम आफैं ठेगाना हो, त्यसैले function लाई साँच्चैको array पुग्छ' },
      { en: 'Only if the array is declared globally', ne: 'Array global घोषणा गरिएको भए मात्र' },
      { en: 'Only the first element is changed', ne: 'पहिलो element मात्र बदलिन्छ' }
    ],
    answer: 1,
    explanation: {
      en: 'An array name used on its own is the address of its first element, so passing marks passes an address and the function works on the caller\'s array. No ampersand is written because none is needed — the array is already what & would have produced. This is the exception students find surprising, and it is the reason a sorting function changes the list in main without returning anything.',
      ne: 'Array को नाम एक्लै प्रयोग गर्दा त्यो पहिलो element को ठेगाना हो, त्यसैले marks पठाउनु ठेगाना पठाउनु हो र function ले बोलाउनेकै array मा काम गर्छ। Ampersand नलेखिनुको कारण चाहिँदैन भन्ने हो — & ले बनाउने कुरा array आफैं भइसक्यो। विद्यार्थीलाई अचम्म लाग्ने अपवाद यही हो, र क्रम मिलाउने function ले केही नफर्काई main को सूची बदल्नुको कारण पनि त्यही।'
    }
  },

  /* ================= UNIT 5 — Arrays & Strings ================= */

  {
    id: 'g9.c.q42', subject: 'grade9/c-programming', unit: 'u5',
    topic: 'last-index', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'For int marks[10]; what is the index of the LAST element?',
      ne: 'int marks[10]; मा अन्तिम element को index कति हो?'
    },
    options: [
      { en: '10', ne: '१०' },
      { en: '9', ne: '९' },
      { en: '11', ne: '११' },
      { en: '1', ne: '१' }
    ],
    answer: 1,
    explanation: {
      en: 'Indexing starts at 0, so an array of size 10 has indices 0 to 9 and the last index is size minus one. There is no marks[10]: that is the eleventh box and it is not part of the array. C performs no bounds checking, so writing to it compiles and quietly damages whatever happens to be in that memory.',
      ne: 'Index ० बाट सुरु हुन्छ, त्यसैले १० आकारको array का index ० देखि ९ सम्म हुन्छन् र अन्तिम index आकार घटाउ एक हो। marks[10] भन्ने छैन: त्यो एघारौं बाकस हो र array को भाग होइन। C ले bound जाँच्दैन, त्यसैले त्यहाँ लेख्दा compile हुन्छ र त्यो मेमोरीमा जे छ त्यो चुपचाप बिग्रन्छ।'
    }
  },

  {
    id: 'g9.c.q43', subject: 'grade9/c-programming', unit: 'u5',
    topic: 'partial-initialisation', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'int a[5] = {7, 3}; What are a[2], a[3] and a[4]?',
      ne: 'int a[5] = {7, 3}; मा a[2], a[3] र a[4] के हुन्छन्?'
    },
    options: [
      { en: 'Garbage — whatever was in that memory', ne: 'Garbage — त्यो मेमोरीमा जे थियो' },
      { en: 'All three are 0', ne: 'तीनै ० हुन्छन्' },
      { en: 'All three are 3', ne: 'तीनै ३ हुन्छन्' },
      { en: 'The program does not compile', ne: 'प्रोग्राम compile हुँदैन' }
    ],
    answer: 1,
    explanation: {
      en: 'When an array is given an initialiser list that is shorter than its size, the remaining elements are set to zero rather than left as garbage. That is a rule about initialisation, not about declaration: int a[5]; with no list at all leaves all five holding garbage. It is also why int a[100] = {0}; is the usual way of writing "an array of a hundred zeros".',
      ne: 'Array लाई आकारभन्दा छोटो initialiser सूची दिइँदा बाँकी element garbage नभई शून्य हुन्छन्। यो initialisation को नियम हो, घोषणाको होइन: सूची नै नभएको int a[5]; मा पाँचै मा garbage रहन्छ। "सय शून्यको array" लेख्ने चलनचल्तीको तरिका int a[100] = {0}; हुनुको कारण पनि त्यही।'
    }
  },

  {
    id: 'g9.c.q44', subject: 'grade9/c-programming', unit: 'u5',
    topic: 'string-array-size', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'What is the smallest size that will safely hold the word "KATHMANDU" in a char array?',
      ne: '"KATHMANDU" शब्द char array मा सुरक्षित रूपमा राख्न सबैभन्दा सानो आकार कति हुनुपर्छ?'
    },
    options: [
      { en: '9', ne: '९' },
      { en: '10', ne: '१०' },
      { en: '8', ne: '८' },
      { en: '20 — strings always need 20', ne: '२० — string लाई सधैं २० चाहिन्छ' }
    ],
    answer: 1,
    explanation: {
      en: 'KATHMANDU is nine letters, and every string in C ends with the null character, which needs a box of its own. So ten is the smallest safe size. Declaring char city[9] leaves no room for the terminator, so nothing marks the end of the string and printf carries on into whatever follows in memory. The rule is always: length plus one.',
      ne: 'KATHMANDU नौ अक्षरको हो, र C मा हरेक string null अक्षरले सकिन्छ जसलाई आफ्नै बाकस चाहिन्छ। त्यसैले सुरक्षित सबैभन्दा सानो आकार दस हो। char city[9] घोषणा गरे terminator का लागि ठाउँ रहँदैन, string को अन्त्य केहीले जनाउँदैन र printf मेमोरीमा पछि जे छ त्यतै बढ्छ। नियम सधैं यही हो: लम्बाइ जोड एक।'
    }
  },

  {
    id: 'g9.c.q45', subject: 'grade9/c-programming', unit: 'u5',
    topic: 'strlen-result', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'char s[20] = "NEPAL"; What does strlen(s) return?',
      ne: 'char s[20] = "NEPAL"; मा strlen(s) ले के फर्काउँछ?'
    },
    options: [
      { en: '20', ne: '२०' },
      { en: '5', ne: '५' },
      { en: '6', ne: '६' },
      { en: '19', ne: '१९' }
    ],
    answer: 1,
    explanation: {
      en: 'strlen counts the characters up to the null terminator and does not count the null itself, so it returns 5. Three different numbers describe this one variable and all three are right: the length is 5, the characters stored are 6 including the null, and the array size is 20. Confusing the length with the size is the usual error, and sizeof(s) would give 20.',
      ne: 'strlen ले null terminator सम्मका अक्षर गन्छ र null आफैंलाई गन्दैन, त्यसैले ५ फर्काउँछ। यही एउटै variable लाई तीन फरक सङ्ख्याले वर्णन गर्छन् र तीनै ठिक छन्: लम्बाइ ५, null सहित भण्डारण भएका अक्षर ६, र array को आकार २०। लम्बाइ र आकार मिसाउनु सामान्य गल्ती हो, र sizeof(s) ले २० दिन्थ्यो।'
    }
  },

  {
    id: 'g9.c.q46', subject: 'grade9/c-programming', unit: 'u5',
    topic: 'strcmp-return', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'What does strcmp(s1, s2) return when the two strings are identical?',
      ne: 'दुई string ठ्याक्कै उस्तै हुँदा strcmp(s1, s2) ले के फर्काउँछ?'
    },
    options: [
      { en: '1, meaning true', ne: '१, अर्थात् सत्य' },
      { en: '0', ne: '०' },
      { en: 'The length of the strings', ne: 'String को लम्बाइ' },
      { en: 'It returns nothing', ne: 'यसले केही फर्काउँदैन' }
    ],
    answer: 1,
    explanation: {
      en: 'strcmp returns 0 when the strings match, a negative number when the first comes earlier alphabetically, and a positive number when it comes later. Zero meaning "equal" is the opposite of what most people expect, so the condition for "the passwords are the same" reads if (strcmp(a, b) == 0), which looks backwards and is correct. Writing if (strcmp(a, b)) tests for DIFFERENT, because any non-zero value is true in C.',
      ne: 'String मिल्दा strcmp ले ० फर्काउँछ, पहिलो वर्णक्रममा अघि भए ऋणात्मक, पछि भए धनात्मक। ० को अर्थ "बराबर" हुनु धेरैको अपेक्षाविपरीत छ, त्यसैले "password मिल्यो" भन्ने सर्त if (strcmp(a, b) == 0) हुन्छ — उल्टो देखिन्छ र ठिक छ। if (strcmp(a, b)) लेखे फरक छ कि भनेर जाँचिन्छ, किनभने C मा शून्य नभएको जुनसुकै मान सत्य हो।'
    }
  },

  {
    id: 'g9.c.q47', subject: 'grade9/c-programming', unit: 'u5',
    topic: 'string-comparison-operator', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Why can two strings not be compared with if (s1 == s2)?',
      ne: 'दुई string लाई if (s1 == s2) ले किन तुलना गर्न मिल्दैन?'
    },
    options: [
      { en: 'Because == only works on numbers and the program will not compile',
        ne: 'किनभने == सङ्ख्यामा मात्र चल्छ र प्रोग्राम compile हुँदैन' },
      { en: 'Because s1 and s2 are addresses, so == compares where the two arrays are, not what they contain',
        ne: 'किनभने s1 र s2 ठेगाना हुन्, त्यसैले == ले दुई array कहाँ छन् तुलना गर्छ, भित्र के छ होइन' },
      { en: 'Because strings must always be compared letter by letter in a loop',
        ne: 'किनभने string सधैं loop मा अक्षर–अक्षर तुलना गर्नुपर्छ' },
      { en: 'It works perfectly well', ne: 'यो राम्ररी चल्छ' }
    ],
    answer: 1,
    explanation: {
      en: 'An array name is the address of its first element, so s1 == s2 compares two addresses. Two separate arrays are always at different addresses, so the test is false even when both hold exactly the same word. It compiles and runs, which is what makes it dangerous. strcmp walks both strings character by character and is the only correct way — and it returns 0 for a match.',
      ne: 'Array को नाम पहिलो element को ठेगाना हो, त्यसैले s1 == s2 ले दुई ठेगाना तुलना गर्छ। छुट्टाछुट्टै दुई array सधैं फरक ठेगानामा हुन्छन्, त्यसैले दुवैमा ठ्याक्कै उही शब्द भए पनि जाँच असत्य हुन्छ। यो compile हुन्छ र चल्छ पनि — त्यसैले खतरनाक छ। strcmp ले दुवै string अक्षर–अक्षर हिँड्छ र सही तरिका त्यही हो — र मिल्दा ० फर्काउँछ।'
    }
  },

  {
    id: 'g9.c.q48', subject: 'grade9/c-programming', unit: 'u5',
    topic: 'scanf-string', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'char name[20]; Which scanf line is correct, and what happens if the user types "Ram Bahadur"?',
      ne: 'char name[20]; कुन scanf लाइन सही छ, र प्रयोगकर्ताले "Ram Bahadur" टाइप गरे के हुन्छ?'
    },
    options: [
      { en: 'scanf("%s", &name); and the whole name is read',
        ne: 'scanf("%s", &name); र पूरै नाम पढिन्छ' },
      { en: 'scanf("%s", name); and only "Ram" is read, because %s stops at the first space',
        ne: 'scanf("%s", name); र "Ram" मात्र पढिन्छ, किनभने %s पहिलो खाली ठाउँमा रोकिन्छ' },
      { en: 'scanf("%c", name); and the whole name is read',
        ne: 'scanf("%c", name); र पूरै नाम पढिन्छ' },
      { en: 'scanf("%d", &name); and the name is converted to a number',
        ne: 'scanf("%d", &name); र नाम सङ्ख्यामा बदलिन्छ' }
    ],
    answer: 1,
    explanation: {
      en: 'An array name is already an address, so %s takes no ampersand — this is the one scanf in the subject that does not need one. And %s stops reading at the first whitespace, so "Ram Bahadur" leaves "Ram" in name and "Bahadur" waiting in the input. Reading a whole line needs fgets, not scanf, and gets() is not an option because it was removed from the C standard.',
      ne: 'Array को नाम आफैं ठेगाना हो, त्यसैले %s लाई ampersand चाहिँदैन — विषयभरिमा ampersand नचाहिने scanf यही एक हो। अनि %s पहिलो खाली ठाउँमै पढ्न छाड्छ, त्यसैले "Ram Bahadur" मा name भित्र "Ram" रहन्छ र "Bahadur" input मै पर्खिरहन्छ। पूरै लाइन पढ्न scanf होइन fgets चाहिन्छ, र gets() विकल्प होइन किनभने त्यो C मानकबाट हटाइएको छ।'
    }
  },

  {
    id: 'g9.c.q49', subject: 'grade9/c-programming', unit: 'u5',
    topic: 'out-of-bounds', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A loop over int a[5] is written as for (i = 0; i <= 5; i++). What is the consequence?',
      ne: 'int a[5] मा loop लाई for (i = 0; i <= 5; i++) लेखियो। यसको परिणाम के हुन्छ?'
    },
    options: [
      { en: 'The compiler reports an index error and refuses to build',
        ne: 'Compiler ले index त्रुटि देखाएर बनाउन मान्दैन' },
      { en: 'It compiles and the loop touches a[5], which is outside the array — giving a wrong result or a crash',
        ne: 'यो compile हुन्छ र loop ले array बाहिरको a[5] छुन्छ — गलत नतिजा वा crash आउँछ' },
      { en: 'The array automatically grows to six elements',
        ne: 'Array आफैं छ element को हुन्छ' },
      { en: 'The last element is simply read twice', ne: 'अन्तिम element दुई पटक पढिन्छ' }
    ],
    answer: 1,
    explanation: {
      en: 'The loop runs six times, with i taking 0 to 5, and a[5] is one box past the end of an array whose last valid index is 4. C does no bounds checking at compile time or at run time, so this builds cleanly. What is at that address is whatever came next in memory, so the program may print a strange number, may corrupt another variable, or may crash — possibly a different one of those on each run.',
      ne: 'Loop छ पटक चल्छ, i ले ० देखि ५ लिन्छ, र अन्तिम मान्य index ४ भएको array मा a[5] अन्त्यभन्दा एक बाकस पर हो। C ले compile गर्दा पनि, चल्दा पनि bound जाँच्दैन, त्यसैले यो सफा build हुन्छ। त्यो ठेगानामा मेमोरीमा पछि जे आयो त्यही हुन्छ, त्यसैले प्रोग्रामले अनौठो सङ्ख्या छाप्न सक्छ, अर्को variable बिगार्न सक्छ, वा crash हुन सक्छ — हरेक पटक फरक पनि हुन सक्छ।'
    }
  },

  {
    id: 'g9.c.q50', subject: 'grade9/c-programming', unit: 'u5',
    topic: 'array-sum-trace', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'int a[5] = {70, 85, 60, 90, 45}; int i, t = 0; for (i = 0; i < 5; i++) t = t + a[i];  What is t?',
      ne: 'int a[5] = {70, 85, 60, 90, 45}; int i, t = 0; for (i = 0; i < 5; i++) t = t + a[i];  t कति हुन्छ?'
    },
    options: [
      { en: '350', ne: '३५०' },
      { en: '280', ne: '२८०' },
      { en: '45', ne: '४५' },
      { en: '70', ne: '७०' }
    ],
    answer: 0,
    explanation: {
      en: '70 + 85 + 60 + 90 + 45 = 350. Two details make this work and both are examined. t is set to 0 before the loop, so the first addition has something known to add to; if t were left uninitialised the answer would be a different wrong number on every run. And the index runs 0 to 4, covering all five elements — option B is the total without the first element, which is what starting the loop at 1 would give.',
      ne: '70 + 85 + 60 + 90 + 45 = 350। दुई कुराले यो चल्छ र दुवै सोधिन्छन्। Loop अघि t लाई ० राखिएको छ, त्यसैले पहिलो जोडसँग जोड्न थाहा भएको कुरा हुन्छ; t लाई मान नदिए हरेक पटक फरक गलत उत्तर आउँथ्यो। अनि index ० देखि ४ सम्म चल्छ र पाँचै element समेट्छ — विकल्प (ख) पहिलो element नगनेको जोड हो, जुन loop १ बाट सुरु गर्दा आउँथ्यो।'
    }
  },

  {
    id: 'g9.c.q51', subject: 'grade9/c-programming', unit: 'u5',
    topic: 'nonstandard-string-functions', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A program using strrev() compiles on DEV C++ at school and fails on a Linux machine with "undefined reference". Why?',
      ne: 'strrev() प्रयोग गरेको प्रोग्राम विद्यालयको DEV C++ मा compile हुन्छ र Linux मेसिनमा "undefined reference" भन्दै असफल हुन्छ। किन?'
    },
    options: [
      { en: 'Because Linux cannot run C programs', ne: 'किनभने Linux ले C प्रोग्राम चलाउनै सक्दैन' },
      { en: 'Because strrev is not part of the standard C library — it is a Turbo C and Microsoft extension',
        ne: 'किनभने strrev मानक C library को भाग होइन — यो Turbo C र Microsoft को थप हो' },
      { en: 'Because string.h was not included', ne: 'किनभने string.h include गरिएको थिएन' },
      { en: 'Because strrev needs an array of at least 100 characters',
        ne: 'किनभने strrev लाई कम्तीमा १०० अक्षरको array चाहिन्छ' }
    ],
    answer: 1,
    explanation: {
      en: 'The syllabus names seven string functions and only four of them — strlen, strcpy, strcat and strcmp — are in the C standard. strrev, strlwr and strupr are compiler extensions, present in Turbo C and some Microsoft tools and absent from glibc, so the header declares nothing for them on Linux and the linker cannot find the code. They are examinable, so write them in an answer; but a program that must run anywhere should reverse a string with a loop instead.',
      ne: 'पाठ्यक्रमले सात string function नाम लिन्छ र तीमध्ये चार — strlen, strcpy, strcat र strcmp — मात्र C मानकमा छन्। strrev, strlwr र strupr compiler का थप हुन्, Turbo C र केही Microsoft साधनमा छन् र glibc मा छैनन् — त्यसैले Linux मा header ले तिनका लागि केही घोषणा गर्दैन र linker ले कोड भेट्दैन। यी सोधिन्छन्, त्यसैले उत्तरमा लेख्नुहोस्; तर जहाँ पनि चल्नुपर्ने प्रोग्रामले string loop ले नै उल्टाउनुपर्छ।'
    }
  },

  /* ================= UNIT 6 — Structure and Union ================= */

  {
    id: 'g9.c.q52', subject: 'grade9/c-programming', unit: 'u6',
    topic: 'structure-definition', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'What is a structure in C?',
      ne: 'C मा structure भनेको के हो?'
    },
    options: [
      { en: 'A collection of elements of the same data type in continuous memory',
        ne: 'लगातार मेमोरीमा एउटै data type का element को समूह' },
      { en: 'A user-defined data type that groups variables of DIFFERENT data types under one name',
        ne: 'फरक data type का variable लाई एउटै नाममुनि राख्ने प्रयोगकर्ता-परिभाषित data type' },
      { en: 'A function that returns more than one value',
        ne: 'एकभन्दा बढी मान फर्काउने function' },
      { en: 'Another name for an array of characters', ne: 'Character array कै अर्को नाम' }
    ],
    answer: 1,
    explanation: {
      en: 'Option A describes an array, which holds many values of ONE type. A structure is the opposite shape: several values of DIFFERENT types about one thing — a student with a name, a roll number and a percentage. Each variable inside it is called a member and each member has its own memory, which is what separates a structure from a union.',
      ne: 'विकल्प (क) ले array को वर्णन गर्छ, जसले एउटै प्रकारका धेरै मान राख्छ। Structure उल्टो आकारको हो: एउटै कुराबारे फरक प्रकारका धेरै मान — नाम, roll नम्बर र प्रतिशत भएको विद्यार्थी। भित्रका हरेक variable लाई member भनिन्छ र हरेकको आफ्नै मेमोरी हुन्छ — structure लाई union बाट छुट्याउने कुरा त्यही हो।'
    }
  },

  {
    id: 'g9.c.q53', subject: 'grade9/c-programming', unit: 'u6',
    topic: 'union-size', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'union Box { int n; char c; }; On a machine where int is 4 bytes and char is 1, what is sizeof(union Box)?',
      ne: 'union Box { int n; char c; }; int ४ byte र char १ byte भएको मेसिनमा sizeof(union Box) कति हुन्छ?'
    },
    options: [
      { en: '5 bytes — the total of the members', ne: '५ byte — member को जोड' },
      { en: '4 bytes — the size of the largest member', ne: '४ byte — सबैभन्दा ठूलो member को आकार' },
      { en: '1 byte — the size of the smallest member', ne: '१ byte — सबैभन्दा सानो member को आकार' },
      { en: '8 bytes — unions always use 8', ne: '८ byte — union ले सधैं ८ लिन्छ' }
    ],
    answer: 1,
    explanation: {
      en: 'A union gives every member the same block of memory, so the block only has to be big enough for the largest member — 4 bytes here. A structure with the same two members would need space for both, so its size would be 5 plus any padding the compiler adds. Size is the clearest single difference between the two and it is the standard way the comparison question is marked.',
      ne: 'Union ले हरेक member लाई उही मेमोरी block दिन्छ, त्यसैले block सबैभन्दा ठूलो member अट्ने मात्र हुनुपर्छ — यहाँ ४ byte। उही दुई member भएको structure लाई दुवैका लागि ठाउँ चाहिन्थ्यो, त्यसैले आकार ५ र compiler ले थप्ने padding हुन्थ्यो। दुईबीचको सबैभन्दा स्पष्ट फरक आकार नै हो र तुलनात्मक प्रश्नको अंक पनि प्रायः यसैमा दिइन्छ।'
    }
  },

  {
    id: 'g9.c.q54', subject: 'grade9/c-programming', unit: 'u6',
    topic: 'union-overwrite', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'union Box b; b.n = 65; then b.c = 88; then printf("%d", b.n);  What is printed?',
      ne: 'union Box b; b.n = 65; अनि b.c = 88; अनि printf("%d", b.n);  के छापिन्छ?'
    },
    options: [
      { en: '65 — n was never written to again', ne: '६५ — n मा फेरि लेखिएकै थिएन' },
      { en: '88 — the two members share one block, so writing c overwrote n',
        ne: '८८ — दुवै member ले एउटै block बाँड्छन्, त्यसैले c लेख्दा n मेटियो' },
      { en: '153 — the two values are added', ne: '१५३ — दुई मान जोडिन्छन्' },
      { en: '0 — the union is cleared after each write', ne: '० — हरेक पटक लेखेपछि union खाली हुन्छ' }
    ],
    answer: 1,
    explanation: {
      en: 'There is only one block of memory and both members read it. Writing 88 into b.c put 88 into the first byte of the shared block, so reading b.n afterwards reads the changed bytes and gives 88. A line that named only c has changed what n reads — and that is a union\'s whole behaviour. In a STRUCTURE both members would keep their own values and the answer would be 65.',
      ne: 'मेमोरीको एउटै block छ र दुवै member ले त्यही पढ्छन्। b.c मा ८८ लेख्दा साझा block को पहिलो byte मा ८८ पुग्यो, त्यसैले पछि b.n पढ्दा बदलिएका byte पढिन्छन् र ८८ आउँछ। c को मात्र नाम लिने लाइनले n ले पढ्ने कुरा बदल्यो — union को पूरै व्यवहार त्यही हो। STRUCTURE मा दुवै member ले आफ्नो मान राख्थे र उत्तर ६५ हुन्थ्यो।'
    }
  },

  {
    id: 'g9.c.q55', subject: 'grade9/c-programming', unit: 'u6',
    topic: 'dot-operator', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'struct Student s1; How is the roll member of s1 accessed?',
      ne: 'struct Student s1; मा s1 को roll member मा कसरी पुगिन्छ?'
    },
    options: [
      { en: 'Student.roll', ne: 'Student.roll' },
      { en: 's1.roll', ne: 's1.roll' },
      { en: 'roll.s1', ne: 'roll.s1' },
      { en: 's1->roll', ne: 's1->roll' }
    ],
    answer: 1,
    explanation: {
      en: 'The dot operator joins a structure VARIABLE to one of its members, so it is s1.roll. Student is the type, and a type reserves no memory, so Student.roll names nothing that exists. The arrow -> is used when you hold a POINTER to a structure rather than the structure itself, which is Grade 10 work; for a plain variable the dot is the operator.',
      ne: 'Dot operator ले structure को VARIABLE लाई यसको member सँग जोड्छ, त्यसैले s1.roll हुन्छ। Student प्रकार हो, र प्रकारले मेमोरी छुट्याउँदैन — त्यसैले Student.roll ले अस्तित्वमा भएको केही जनाउँदैन। Arrow -> त्यतिबेला चलाइन्छ जब structure आफैं होइन, त्यसको POINTER हुन्छ — त्यो कक्षा १० को कुरा हो; सामान्य variable का लागि dot नै operator हो।'
    }
  },

  {
    id: 'g9.c.q56', subject: 'grade9/c-programming', unit: 'u6',
    topic: 'struct-semicolon', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Where is a semicolon required that students often leave out?',
      ne: 'विद्यार्थीले प्रायः छुटाउने semicolon कहाँ चाहिन्छ?'
    },
    options: [
      { en: 'After the closing brace of a function definition',
        ne: 'Function definition को बन्द brace पछि' },
      { en: 'After the closing brace of a structure declaration',
        ne: 'Structure घोषणाको बन्द brace पछि' },
      { en: 'After #include <stdio.h>', ne: '#include <stdio.h> पछि' },
      { en: 'After int main()', ne: 'int main() पछि' }
    ],
    answer: 1,
    explanation: {
      en: 'A structure declaration is a statement, so it ends with a semicolon after the closing brace: struct Student { ... }; A function definition is not a statement and takes no semicolon there; #include is a preprocessor directive and takes none; and a semicolon after int main() would make an empty function and then leave the braces as a stray block. Leaving out the structure semicolon produces an error message pointing at the NEXT line, which is why it is hard to find.',
      ne: 'Structure को घोषणा statement हो, त्यसैले बन्द brace पछि semicolon ले सकिन्छ: struct Student { ... }; Function definition statement होइन र त्यहाँ semicolon लिँदैन; #include preprocessor directive हो र लिँदैन; अनि int main() पछि semicolon राखे खाली function बन्थ्यो र brace छुट्टै block बन्थ्यो। Structure को semicolon छुटाउँदा त्रुटि सन्देशले पछिल्लो लाइन देखाउँछ — त्यसैले भेट्न गाह्रो हुन्छ।'
    }
  },

  {
    id: 'g9.c.q57', subject: 'grade9/c-programming', unit: 'u6',
    topic: 'struct-keyword', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'After struct Student { ... }; which line correctly declares a variable in C?',
      ne: 'struct Student { ... }; पछि C मा variable घोषणा गर्ने सही लाइन कुन हो?'
    },
    options: [
      { en: 'Student s1;', ne: 'Student s1;' },
      { en: 'struct Student s1;', ne: 'struct Student s1;' },
      { en: 'new Student s1;', ne: 'new Student s1;' },
      { en: 'Student s1 = new Student();', ne: 'Student s1 = new Student();' }
    ],
    answer: 1,
    explanation: {
      en: 'In C the keyword struct is part of the type name, so the declaration is struct Student s1;. Writing Student s1; alone does not compile unless a typedef has given the type a shorter name. The other two options are C++ and Java syntax: C has no new operator, and a structure variable is created by declaring it, exactly like an int.',
      ne: 'C मा struct keyword प्रकारकै नामको भाग हो, त्यसैले घोषणा struct Student s1; हुन्छ। typedef ले छोटो नाम नदिएसम्म Student s1; मात्रले compile हुँदैन। अरू दुई विकल्प C++ र Java का syntax हुन्: C मा new operator छैन, र structure को variable int जस्तै घोषणा गरेरै बन्छ।'
    }
  },

  {
    id: 'g9.c.q58', subject: 'grade9/c-programming', unit: 'u6',
    topic: 'choosing-union', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A sensor reading is sometimes a whole count and sometimes a decimal measurement, never both at once, and the device has very little memory. Which should be used, and why?',
      ne: 'Sensor को रिडिङ कहिले पूर्ण गन्ती र कहिले दशमलव नाप हुन्छ, एकैचोटि कहिल्यै दुवै हुँदैन, र यन्त्रमा मेमोरी निकै थोरै छ। कुन चलाउने र किन?'
    },
    options: [
      { en: 'A structure, because it is safer and keeps both values',
        ne: 'Structure, किनभने यो सुरक्षित छ र दुवै मान राख्छ' },
      { en: 'A union, because only one member is ever in use, so sharing one block wastes nothing and saves the rest',
        ne: 'Union, किनभने एक पटकमा एउटै member प्रयोगमा हुन्छ — एउटै block बाँड्दा केही खेर जाँदैन र बाँकी बच्छ' },
      { en: 'An array, because readings are a list', ne: 'Array, किनभने रिडिङ सूची हो' },
      { en: 'Either one — the choice makes no difference',
        ne: 'जुनसुकै — छनोटले फरक पार्दैन' }
    ],
    answer: 1,
    explanation: {
      en: 'The two conditions in the question are exactly the two a union needs: only one member is in use at any moment, and memory is scarce. Sharing one block then costs nothing, because the unused member had no value worth keeping. A structure would be safe but would reserve space for both members, which is the memory the device does not have. Saving memory is the only reason a union exists, and it is the reason to give in an answer.',
      ne: 'प्रश्नका दुई सर्त union लाई चाहिने ठ्याक्कै दुई सर्त हुन्: कुनै पनि क्षणमा एउटै member प्रयोगमा हुनु, र मेमोरी थोरै हुनु। तब एउटै block बाँड्दा केही लागत छैन, किनभने प्रयोगमा नभएको member सँग राख्नुपर्ने मान नै थिएन। Structure सुरक्षित त हुन्थ्यो तर दुवै member का लागि ठाउँ छुट्याउँथ्यो — र त्यही मेमोरी यन्त्रसँग छैन। Union हुनुको एकमात्र कारण मेमोरी बचत हो, र उत्तरमा दिनुपर्ने कारण पनि त्यही।'
    }
  },

  /* ================= UNIT 7 — Pointers ================= */

  {
    id: 'g9.c.q59', subject: 'grade9/c-programming', unit: 'u7',
    topic: 'pointer-definition', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'What does a pointer variable store?',
      ne: 'Pointer variable ले के राख्छ?'
    },
    options: [
      { en: 'A copy of another variable\'s value', ne: 'अर्को variable को मानको प्रतिलिपि' },
      { en: 'The memory address of another variable', ne: 'अर्को variable को मेमोरी ठेगाना' },
      { en: 'The name of another variable', ne: 'अर्को variable को नाम' },
      { en: 'The data type of another variable', ne: 'अर्को variable को data type' }
    ],
    answer: 1,
    explanation: {
      en: 'A pointer is an ordinary variable in every respect — it has a type, a name and an address of its own — and what it holds is a location rather than a quantity. int *p; p = &n; leaves p holding where n lives, not what n contains. *p is how you reach the value from there, and the two must not be confused: p is an address and *p is the number at it.',
      ne: 'Pointer हरेक हिसाबले सामान्य variable नै हो — यसको प्रकार, नाम र आफ्नै ठेगाना हुन्छ — र यसले राख्ने कुरा परिमाण नभई स्थान हो। int *p; p = &n; पछि p सँग n कहाँ बस्छ भन्ने हुन्छ, n मा के छ भन्ने होइन। त्यहाँबाट मानसम्म पुग्ने तरिका *p हो, र यी दुई मिसाउनु हुँदैन: p ठेगाना हो र *p त्यहाँको सङ्ख्या।'
    }
  },

  {
    id: 'g9.c.q60', subject: 'grade9/c-programming', unit: 'u7',
    topic: 'address-vs-dereference', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which statement about & and * is correct?',
      ne: '& र * बारे कुन कथन सही छ?'
    },
    options: [
      { en: '& gives the value at an address; * gives the address of a variable',
        ne: '& ले ठेगानाको मान दिन्छ; * ले variable को ठेगाना दिन्छ' },
      { en: '& gives the address of a variable; * gives the value at an address',
        ne: '& ले variable को ठेगाना दिन्छ; * ले ठेगानाको मान दिन्छ' },
      { en: 'Both do the same thing', ne: 'दुवैले उही काम गर्छन्' },
      { en: '& works on pointers only and * works on integers only',
        ne: '& pointer मा मात्र र * integer मा मात्र चल्छ' }
    ],
    answer: 1,
    explanation: {
      en: '& is the address-of operator: written before a variable, it gives where that variable lives. * is the value-at, or dereference, operator: written before a pointer, it gives what is stored at the address the pointer holds. They work in opposite directions and undo each other, so *(&n) is simply n. Option A is the two definitions swapped, which is the usual way this is got wrong.',
      ne: '& address-of operator हो: variable अगाडि लेख्दा त्यो variable कहाँ बस्छ भन्ने दिन्छ। * value-at वा dereference operator हो: pointer अगाडि लेख्दा pointer ले बोकेको ठेगानामा भएको कुरा दिन्छ। यी उल्टा दिशामा चल्छन् र एकअर्कालाई उल्ट्याउँछन्, त्यसैले *(&n) भनेको n नै हो। विकल्प (क) मा दुई परिभाषा साटिएका छन्, र यो प्रायः त्यसरी नै बिग्रन्छ।'
    }
  },

  {
    id: 'g9.c.q61', subject: 'grade9/c-programming', unit: 'u7',
    topic: 'write-through-pointer', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'int n = 7; int *p = &n; *p = *p + 3; printf("%d", n);  What is printed?',
      ne: 'int n = 7; int *p = &n; *p = *p + 3; printf("%d", n);  के छापिन्छ?'
    },
    options: [
      { en: '7, because n was never assigned to', ne: '७, किनभने n मा कहिल्यै मान राखिएन' },
      { en: '10', ne: '१०' },
      { en: '3', ne: '३' },
      { en: 'An address, because p was involved', ne: 'ठेगाना, किनभने p संलग्न थियो' }
    ],
    answer: 1,
    explanation: {
      en: 'Read *p = *p + 3 as "the value at p becomes the value at p plus three". The value at p is n, so this line is n = n + 3 written another way, and n becomes 10. A variable can be changed by a line that never names it, provided something holds its address — which is not a trick but exactly what scanf("%d", &n) has been doing since Unit 2. Printing p rather than n would show an address; one star is the whole difference.',
      ne: '*p = *p + 3 लाई "p को ठेगानाको मान बराबर p को ठेगानाको मान जोड तीन" भनेर पढ्नुहोस्। P को ठेगानाको मान n हो, त्यसैले यो लाइन n = n + 3 कै अर्को लेखाइ हो र n १० हुन्छ। कसैसँग ठेगाना छ भने नाम नै नलिने लाइनले variable बदल्न सक्छ — यो जादू होइन, युनिट २ देखि scanf("%d", &n) ले गरिरहेकै काम हो। n होइन p छापेको भए ठेगाना देखिन्थ्यो; पूरै फरक एउटा star को हो।'
    }
  },

  {
    id: 'g9.c.q62', subject: 'grade9/c-programming', unit: 'u7',
    topic: 'pointer-declaration', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which line correctly declares p as a pointer to an integer and points it at n?',
      ne: 'कुन लाइनले p लाई integer को pointer घोषणा गरेर n तिर तेर्स्याउँछ?'
    },
    options: [
      { en: 'int p; p = n;', ne: 'int p; p = n;' },
      { en: 'int *p; p = &n;', ne: 'int *p; p = &n;' },
      { en: 'int *p; p = n;', ne: 'int *p; p = n;' },
      { en: 'int p; *p = &n;', ne: 'int p; *p = &n;' }
    ],
    answer: 1,
    explanation: {
      en: 'int *p; declares p as a pointer to an int — the star there is part of the type, not a dereference. p = &n; then stores n\'s address in it. Option C declares the pointer correctly and then puts a VALUE where an address belongs. Option A declares an ordinary int, and option D declares an ordinary int and then dereferences it, which is not something the compiler will accept.',
      ne: 'int *p; ले p लाई int को pointer घोषणा गर्छ — त्यहाँको star प्रकारको भाग हो, dereference होइन। अनि p = &n; ले यसमा n को ठेगाना राख्छ। विकल्प (ग) ले pointer त ठिकै घोषणा गर्छ तर ठेगाना चाहिने ठाउँमा मान राख्छ। विकल्प (क) ले सामान्य int घोषणा गर्छ, र (घ) ले सामान्य int घोषणा गरेर त्यसलाई dereference गर्छ, जुन compiler ले स्वीकार गर्दैन।'
    }
  },

  {
    id: 'g9.c.q63', subject: 'grade9/c-programming', unit: 'u7',
    topic: 'pointer-advantage', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which of these is a genuine advantage of pointers that you have already used in this subject?',
      ne: 'यीमध्ये कुन pointer को साँचो फाइदा हो, जुन तपाईंले यसै विषयमा चलाइसक्नुभएको छ?'
    },
    options: [
      { en: 'They make a program compile faster', ne: 'यिनले प्रोग्राम छिटो compile गराउँछन्' },
      { en: 'They let a function change the caller\'s variables — call by reference, and the & in every scanf',
        ne: 'यिनले function लाई बोलाउनेका variable बदल्न दिन्छन् — call by reference, र हरेक scanf को &' },
      { en: 'They remove the need for data types', ne: 'यिनले data type को आवश्यकता हटाउँछन्' },
      { en: 'They check array bounds automatically', ne: 'यिनले array को bound आफैं जाँच्छन्' }
    ],
    answer: 1,
    explanation: {
      en: 'Call by reference is the advantage this subject has already relied on twice: the ampersand in every scanf since Unit 2, and the swap function in Unit 4. The other advantages are passing an array without copying it, allocating memory while the program runs, and building data structures such as linked lists. Option D is the opposite of the truth — C checks no bounds at all, which is part of the same bargain that makes pointers powerful.',
      ne: 'Call by reference यस विषयले पहिल्यै दुई पटक भर परेको फाइदा हो: युनिट २ देखि हरेक scanf को ampersand, र युनिट ४ को swap function। अरू फाइदा हुन् — प्रतिलिपि नबनाई array पठाउनु, प्रोग्राम चल्दै गर्दा मेमोरी छुट्याउनु, र linked list जस्ता data structure बनाउनु। विकल्प (घ) सत्यको ठिक उल्टो हो — C ले bound जाँच्दै जाँच्दैन, र pointer लाई शक्तिशाली बनाउने सम्झौताकै भाग त्यो हो।'
    }
  }

];
