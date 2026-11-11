/* GENERATED from _source/content/questions — do not edit by hand. */
QuizService.registerBank("grade9/c-programming", [
  {
    "id": "g9.c.q01",
    "subject": "grade9/c-programming",
    "unit": "u1",
    "topic": "program-vs-software",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which statement correctly separates a program from software?",
      "ne": "Program र software लाई ठिक तरिकाले छुट्याउने कथन कुन हो?"
    },
    "options": [
      {
        "en": "They mean the same thing",
        "ne": "दुवैको अर्थ एउटै हो"
      },
      {
        "en": "A program is one set of instructions; software is programs together with their data and documentation",
        "ne": "Program भनेको एउटा निर्देशन समूह हो; software चाहिँ प्रोग्रामहरू, तिनका data र documentation सहित"
      },
      {
        "en": "A program runs on hardware; software runs on the internet",
        "ne": "Program hardware मा चल्छ; software इन्टरनेटमा चल्छ"
      },
      {
        "en": "Software is written by a programmer; a program is written by a user",
        "ne": "Software प्रोग्रामरले लेख्छ; program प्रयोगकर्ताले लेख्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The difference is scope. A program is a single ordered set of instructions for one task. Software is the whole package — one or more programs, the data files they need, and the documentation. Every program is software, but software is normally many programs: a browser is one, an operating system is hundreds.",
      "ne": "फरक दायराको हो। Program एउटै कामका लागि क्रमबद्ध निर्देशनको एउटा समूह हो। Software चाहिँ पूरै प्याकेज — एक वा धेरै program, तिनलाई चाहिने data फाइल, र documentation। हरेक program software हो, तर software प्रायः धेरै program हुन्छ: browser एउटा हो, operating system सयौं।"
    }
  },
  {
    "id": "g9.c.q02",
    "subject": "grade9/c-programming",
    "unit": "u1",
    "topic": "language-levels",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which of these is a LOW level language?",
      "ne": "यीमध्ये कुन LOW level भाषा हो?"
    },
    "options": [
      {
        "en": "C",
        "ne": "C"
      },
      {
        "en": "Java",
        "ne": "Java"
      },
      {
        "en": "Assembly language",
        "ne": "Assembly language"
      },
      {
        "en": "Python",
        "ne": "Python"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "Low level means close to the hardware, and only two categories qualify: machine language and assembly language. C, Java and Python are all high level. C is sometimes called a middle level language because it can reach memory addresses directly, but it is still translated by a compiler and it is still written in English-like words.",
      "ne": "Low level को अर्थ hardware सँग नजिक हुनु हो, र दुई श्रेणी मात्र यसमा पर्छन्: machine language र assembly language। C, Java र Python सबै high level हुन्। C लाई कहिलेकाहीं middle level भनिन्छ किनभने यसले मेमोरीको ठेगानासम्म सिधै पुग्न सक्छ, तर यो पनि compiler ले अनुवाद गर्छ र अङ्ग्रेजीजस्ता शब्दमै लेखिन्छ।"
    }
  },
  {
    "id": "g9.c.q03",
    "subject": "grade9/c-programming",
    "unit": "u1",
    "topic": "translator-choice",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A C program has one missing semicolon on line 20. What happens when the programmer tries to run it?",
      "ne": "C प्रोग्रामको लाइन २० मा एउटा semicolon छुटेको छ। प्रोग्रामरले चलाउन खोज्दा के हुन्छ?"
    },
    "options": [
      {
        "en": "Lines 1 to 19 run, then the program stops at line 20",
        "ne": "लाइन १ देखि १९ चल्छन्, अनि लाइन २० मा प्रोग्राम रोकिन्छ"
      },
      {
        "en": "Nothing runs at all — the compiler refuses and no executable is produced",
        "ne": "केही पनि चल्दैन — compiler ले इन्कार गर्छ र executable बन्दैन"
      },
      {
        "en": "The program runs and prints a warning at the end",
        "ne": "प्रोग्राम चल्छ र अन्त्यमा चेतावनी छाप्छ"
      },
      {
        "en": "The missing semicolon is added automatically",
        "ne": "छुटेको semicolon आफैं थपिन्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "C is compiled, not interpreted. The compiler reads the whole file before anything runs, so a grammar mistake anywhere means no executable file is created and nothing executes. Option A describes an interpreter, which runs line by line and therefore does stop part way. This is the practical difference between the two translators.",
      "ne": "C compile हुने भाषा हो, interpret हुने होइन। Compiler ले केही चल्नुअघि पूरै फाइल पढ्छ, त्यसैले जहाँसुकैको व्याकरण गल्तीले executable फाइल बन्दैन र केही चल्दैन। विकल्प (क) ले interpreter को वर्णन गर्छ, जसले एक–एक लाइन चलाउँछ र त्यसैले बीचमै रोकिन्छ। दुई अनुवादकबीचको व्यावहारिक फरक यही हो।"
    }
  },
  {
    "id": "g9.c.q04",
    "subject": "grade9/c-programming",
    "unit": "u1",
    "topic": "flowchart-symbols",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "In a flowchart, which symbol is used for the step \"Print the result on the screen\"?",
      "ne": "Flowchart मा \"नतिजा पर्दामा छाप्नुहोस्\" भन्ने चरणका लागि कुन चिन्ह प्रयोग हुन्छ?"
    },
    "options": [
      {
        "en": "Rectangle",
        "ne": "Rectangle"
      },
      {
        "en": "Parallelogram",
        "ne": "Parallelogram"
      },
      {
        "en": "Diamond",
        "ne": "Diamond"
      },
      {
        "en": "Oval",
        "ne": "Oval"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Printing sends something out of the program to the person, so it is output, and input and output share the same slanted parallelogram. The rectangle is for processing — a calculation or an assignment that happens inside the program where nobody sees it. Drawing a rectangle here is one of the commonest ways marks are lost on a flowchart question.",
      "ne": "छाप्नु भनेको प्रोग्रामबाट मान्छेसम्म केही पठाउनु हो, त्यसैले यो output हो, र input अनि output दुवैलाई उही छड्के parallelogram प्रयोग हुन्छ। Rectangle चाहिँ processing का लागि हो — प्रोग्रामभित्रै हुने गणना वा assignment, जुन कसैले देख्दैन। यहाँ rectangle कोर्नु flowchart को प्रश्नमा अंक गुमाउने सबैभन्दा सामान्य तरिकामध्ये एक हो।"
    }
  },
  {
    "id": "g9.c.q05",
    "subject": "grade9/c-programming",
    "unit": "u1",
    "topic": "algorithm-properties",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "An algorithm reads a number, prints it, and goes back to the printing step forever. Which property of an algorithm does it break?",
      "ne": "एउटा algorithm ले सङ्ख्या पढ्छ, छाप्छ, र छाप्ने चरणमै सधैं फर्किरहन्छ। यसले algorithm को कुन गुण भङ्ग गर्छ?"
    },
    "options": [
      {
        "en": "Input",
        "ne": "Input"
      },
      {
        "en": "Output",
        "ne": "Output"
      },
      {
        "en": "Finiteness",
        "ne": "Finiteness"
      },
      {
        "en": "Definiteness",
        "ne": "Definiteness"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "Finiteness says an algorithm must end after a limited number of steps. This one has an input and it certainly has output, and every step is clear enough to carry out, so those three properties hold. What it never does is stop, and a procedure that never stops has not solved the problem. Missing the Stop box in a flowchart is the drawn version of the same mistake.",
      "ne": "Finiteness ले algorithm सीमित चरणपछि सकिनै पर्छ भन्छ। यसमा input छ र output पक्कै छ, र हरेक चरण गर्न पुग्ने गरी स्पष्ट छ — त्यसैले ती तीन गुण पूरा भए। नहुने कुरा रोकिनु हो, र कहिल्यै नरोकिने विधिले समस्या समाधान गरेको हुँदैन। Flowchart मा Stop बाकस छुटाउनु यही गल्तीको कोरिएको रूप हो।"
    }
  },
  {
    "id": "g9.c.q06",
    "subject": "grade9/c-programming",
    "unit": "u1",
    "topic": "application-areas",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A program stores 40,000 customer records and prints a monthly statement for each, adding up the amounts. Which application area is this, and what does it mainly demand from the computer?",
      "ne": "एउटा प्रोग्रामले ४०,००० ग्राहकको विवरण राख्छ र हरेकको मासिक विवरण छाप्छ, रकम जोड्दै। यो कुन प्रयोग क्षेत्र हो, र यसले कम्प्युटरसँग मुख्यतः के माग्छ?"
    },
    "options": [
      {
        "en": "Scientific — it demands floating-point speed",
        "ne": "वैज्ञानिक — यसलाई floating-point को गति चाहिन्छ"
      },
      {
        "en": "Business — it demands storage, sorting and well-formatted reports",
        "ne": "व्यावसायिक — यसलाई भण्डारण, क्रम मिलाउने र राम्रो ढाँचाको प्रतिवेदन चाहिन्छ"
      },
      {
        "en": "Scientific — it demands a large number of calculations",
        "ne": "वैज्ञानिक — यसलाई ठूलो सङ्ख्यामा गणना चाहिन्छ"
      },
      {
        "en": "Business — it demands many decimal places of accuracy",
        "ne": "व्यावसायिक — यसलाई धेरै दशमलवसम्मको शुद्धता चाहिन्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The test is the ratio between data and calculation. Here there is a very large amount of data and the arithmetic is addition, so it is a business application, and what it needs is storage, retrieval, sorting and readable output. A scientific application is the opposite shape: a small amount of data and an enormous amount of calculation, which is why option A names floating-point speed for the wrong kind of job.",
      "ne": "जाँच data र गणनाको अनुपात हो। यहाँ data धेरै छ र गणना भनेको जोड मात्र, त्यसैले यो व्यावसायिक प्रयोग हो, र यसलाई भण्डारण, खोजी, क्रम मिलाउने र पढ्न मिल्ने output चाहिन्छ। वैज्ञानिक प्रयोगको आकार उल्टो हुन्छ: थोरै data र ठूलो गणना — त्यसैले विकल्प (क) ले गलत किसिमको कामलाई floating-point गति तोकेको छ।"
    }
  },
  {
    "id": "g9.c.q07",
    "subject": "grade9/c-programming",
    "unit": "u1",
    "topic": "portability",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which file should be carried to another computer so that the same C program can be used there?",
      "ne": "उही C प्रोग्राम अर्को कम्प्युटरमा प्रयोग गर्न कुन फाइल लैजानुपर्छ?"
    },
    "options": [
      {
        "en": "The .exe file, because it is ready to run",
        "ne": ".exe फाइल, किनभने त्यो चल्न तयार छ"
      },
      {
        "en": "The .c source file, because it can be compiled again on the other machine",
        "ne": ".c source फाइल, किनभने अर्को मेसिनमा त्यसलाई फेरि compile गर्न सकिन्छ"
      },
      {
        "en": "Either one — both work anywhere",
        "ne": "जुनसुकै — दुवै जताततै चल्छन्"
      },
      {
        "en": "Neither — a C program cannot be moved",
        "ne": "कुनै पनि होइन — C प्रोग्राम सार्नै मिल्दैन"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Portability in C belongs to the source, not to the executable. The .exe is machine code built for one processor and one operating system, so copying it to a different kind of machine gives a file that cannot run. The .c file is ordinary text: compile it again on the far side and the same program is available there. This is why \"C is portable\" and \"my .exe will not run on Linux\" are both true at once.",
      "ne": "C मा portability source को गुण हो, executable को होइन। .exe एउटा प्रोसेसर र एउटा operating system का लागि बनेको मेसिन कोड हो, त्यसैले फरक किसिमको मेसिनमा सार्दा नचल्ने फाइल मात्र पुग्छ। .c फाइल सामान्य पाठ हो: त्यहाँ पुगेर फेरि compile गरे उही प्रोग्राम त्यहाँ पनि चल्छ। त्यसैले \"C portable छ\" र \"मेरो .exe Linux मा चल्दैन\" दुवै एकैचोटि सत्य हुन्छन्।"
    }
  },
  {
    "id": "g9.c.q08",
    "subject": "grade9/c-programming",
    "unit": "u2",
    "topic": "identifier-rules",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which of these is a VALID identifier in C?",
      "ne": "यीमध्ये कुन C को मान्य identifier हो?"
    },
    "options": [
      {
        "en": "2marks",
        "ne": "2marks"
      },
      {
        "en": "total marks",
        "ne": "total marks"
      },
      {
        "en": "_total2",
        "ne": "_total2"
      },
      {
        "en": "float",
        "ne": "float"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "Check the four rules in order. \"2marks\" starts with a digit, which is not allowed. \"total marks\" contains a space. \"float\" is a keyword, so the compiler could not tell which meaning you intended. \"_total2\" begins with an underscore, contains only letters, digits and underscores, and is not a keyword, so it is valid.",
      "ne": "चारै नियम क्रमैसँग जाँच्नुहोस्। \"2marks\" अङ्कबाट सुरु भएको छ, जुन मिल्दैन। \"total marks\" मा खाली ठाउँ छ। \"float\" keyword हो, त्यसैले तपाईंले कुन अर्थ चाहनुभयो compiler ले छुट्याउन सक्दैनथ्यो। \"_total2\" underscore बाट सुरु भएको छ, अक्षर, अङ्क र underscore मात्र छन्, र keyword पनि होइन — त्यसैले मान्य छ।"
    }
  },
  {
    "id": "g9.c.q09",
    "subject": "grade9/c-programming",
    "unit": "u2",
    "topic": "c-origin",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Who developed the C language, and for what purpose?",
      "ne": "C भाषा कसले र कुन उद्देश्यले विकास गरे?"
    },
    "options": [
      {
        "en": "Bjarne Stroustrup, to add classes to C",
        "ne": "Bjarne Stroustrup ले, C मा class थप्न"
      },
      {
        "en": "Dennis Ritchie, to write the UNIX operating system",
        "ne": "Dennis Ritchie ले, UNIX operating system लेख्न"
      },
      {
        "en": "James Gosling, to make programs run on any machine",
        "ne": "James Gosling ले, प्रोग्राम जुनसुकै मेसिनमा चलाउन"
      },
      {
        "en": "Charles Babbage, to control the Analytical Engine",
        "ne": "Charles Babbage ले, Analytical Engine चलाउन"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "C was developed by Dennis Ritchie at Bell Laboratories in 1972, and UNIX was rewritten in it. That origin explains the language: an operating system needs direct access to memory and almost no overhead, which is why C has pointers and why it stays fast. Bjarne Stroustrup developed C++ from C, which is a different language and a later one.",
      "ne": "C लाई Dennis Ritchie ले Bell Laboratories मा १९७२ मा विकास गरे, र UNIX त्यसैमा फेरि लेखियो। त्यही उत्पत्तिले भाषा बुझाउँछ: operating system लाई मेमोरीमा सिधै पहुँच र झन्डै शून्य थप भार चाहिन्छ — त्यसैले C मा pointer छन् र यो छिटो रहन्छ। Bjarne Stroustrup ले C बाट C++ बनाए, जुन फरक र पछिको भाषा हो।"
    }
  },
  {
    "id": "g9.c.q10",
    "subject": "grade9/c-programming",
    "unit": "u2",
    "topic": "escape-sequence",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What does the escape sequence \\n do inside a printf string?",
      "ne": "printf को string भित्र escape sequence \\n ले के गर्छ?"
    },
    "options": [
      {
        "en": "It prints a backslash followed by the letter n",
        "ne": "यसले backslash र त्यसपछि n अक्षर छाप्छ"
      },
      {
        "en": "It moves the output to a new line",
        "ne": "यसले output लाई नयाँ लाइनमा सार्छ"
      },
      {
        "en": "It ends the program",
        "ne": "यसले प्रोग्राम सिध्याउँछ"
      },
      {
        "en": "It inserts a tab space",
        "ne": "यसले tab को खाली ठाउँ हाल्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "An escape sequence is a backslash and a letter that together stand for one character that cannot be typed directly. \\n is the newline character: two characters in the source file, one invisible character in the output. \\t is the tab, which is why option D is wrong. Without \\n, two printf calls run their text together on the same line.",
      "ne": "Escape sequence भनेको backslash र एउटा अक्षर मिलेर सिधै टाइप गर्न नमिल्ने एउटा अक्षर जनाउने कुरा हो। \\n newline अक्षर हो: source फाइलमा दुई अक्षर, output मा एउटा नदेखिने अक्षर। Tab चाहिँ \\t हो, त्यसैले विकल्प (घ) गलत छ। \\n नभए दुई printf को पाठ उही लाइनमा जोडिन्छ।"
    }
  },
  {
    "id": "g9.c.q11",
    "subject": "grade9/c-programming",
    "unit": "u2",
    "topic": "semicolon-rule",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which of these lines must NOT end with a semicolon?",
      "ne": "यीमध्ये कुन लाइन semicolon ले सकिनु हुँदैन?"
    },
    "options": [
      {
        "en": "int a, b, sum;",
        "ne": "int a, b, sum;"
      },
      {
        "en": "#include <stdio.h>",
        "ne": "#include <stdio.h>"
      },
      {
        "en": "sum = a + b;",
        "ne": "sum = a + b;"
      },
      {
        "en": "return 0;",
        "ne": "return 0;"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The semicolon is a statement terminator, so it belongs after every statement — a declaration, an assignment, a return. #include is not a statement at all: it is a preprocessor directive, handled before compiling begins, and it ends at the end of the line. A function heading and a closing brace are the other two places where no semicolon belongs.",
      "ne": "Semicolon statement terminator हो, त्यसैले हरेक statement पछि आउँछ — घोषणा, assignment, return। #include statement नै होइन: यो preprocessor directive हो, compile सुरु हुनुअघि नै चल्छ, र लाइनकै अन्त्यमा सकिन्छ। Function को शीर्षक र बन्द गर्ने brace अरू दुई ठाउँ हुन् जहाँ semicolon चाहिँदैन।"
    }
  },
  {
    "id": "g9.c.q12",
    "subject": "grade9/c-programming",
    "unit": "u2",
    "topic": "char-vs-string",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What is the difference between 'A' and \"A\" in C?",
      "ne": "C मा 'A' र \"A\" बीच के फरक छ?"
    },
    "options": [
      {
        "en": "There is no difference; both are the letter A",
        "ne": "कुनै फरक छैन; दुवै A अक्षर हुन्"
      },
      {
        "en": "'A' is a character constant of one byte; \"A\" is a string of two bytes, A and the null character",
        "ne": "'A' एक byte को character constant हो; \"A\" दुई byte को string हो — A र null अक्षर"
      },
      {
        "en": "'A' is a string and \"A\" is a character",
        "ne": "'A' string हो र \"A\" character हो"
      },
      {
        "en": "Double quotes are only used in comments",
        "ne": "दोहोरो उद्धरण comment मा मात्र चल्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Single quotes make a character constant, which occupies exactly one byte and is printed with %c. Double quotes make a string constant, which is an array of characters ending in the invisible null character \\0 — so even a one-letter string takes two bytes and is printed with %s. This is the difference that becomes the whole of Unit 5.",
      "ne": "एकल उद्धरणले character constant बनाउँछ, जुन ठ्याक्कै एक byte ओगट्छ र %c ले छापिन्छ। दोहोरो उद्धरणले string constant बनाउँछ, जुन नदेखिने null अक्षर \\0 ले सकिने character को array हो — त्यसैले एक अक्षरको string ले पनि दुई byte लिन्छ र %s ले छापिन्छ। यही फरक युनिट ५ को पूरै कुरा बन्छ।"
    }
  },
  {
    "id": "g9.c.q13",
    "subject": "grade9/c-programming",
    "unit": "u2",
    "topic": "scanf-address",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Why is the ampersand written in scanf(\"%d\", &n) but not in printf(\"%d\", n)?",
      "ne": "scanf(\"%d\", &n) मा ampersand लेखिन्छ तर printf(\"%d\", n) मा किन लेखिँदैन?"
    },
    "options": [
      {
        "en": "It is only a style convention and either form works",
        "ne": "यो शैलीको चलन मात्र हो र दुवै रूप चल्छन्"
      },
      {
        "en": "scanf must put a value INTO n, so it needs the address of n; printf only reads n, so the value is enough",
        "ne": "scanf ले n भित्र मान राख्नुपर्छ, त्यसैले n को ठेगाना चाहिन्छ; printf ले n पढ्ने मात्र हो, त्यसैले मान पुग्छ"
      },
      {
        "en": "Because %d requires an ampersand and %s does not",
        "ne": "किनभने %d लाई ampersand चाहिन्छ र %s लाई चाहिँदैन"
      },
      {
        "en": "Because printf is a library function and scanf is not",
        "ne": "किनभने printf library function हो र scanf होइन"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Arguments in C are passed by value, so a function receives copies. printf only needs to look at the value, and a copy is enough. scanf has to change n, and it cannot change a copy — it needs the address, which is what & supplies. This is call by reference meeting you in Unit 2, four units before it is named.",
      "ne": "C मा argument value बाट पठाइन्छन्, त्यसैले function ले प्रतिलिपि पाउँछ। printf लाई मान हेर्नु मात्र भएकाले प्रतिलिपि पुग्छ। scanf ले n बदल्नुपर्छ, र प्रतिलिपि बदल्न सक्दैन — ठेगाना चाहिन्छ, र & ले त्यही दिन्छ। नाम लिनुभन्दा चार युनिट अघि नै युनिट २ मा भेटिने call by reference यही हो।"
    }
  },
  {
    "id": "g9.c.q14",
    "subject": "grade9/c-programming",
    "unit": "u2",
    "topic": "operator-precedence",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What value is stored in a by: a = 10 + 4 * 2 % 3;",
      "ne": "a = 10 + 4 * 2 % 3; ले a मा कुन मान राख्छ?"
    },
    "options": [
      {
        "en": "12",
        "ne": "12"
      },
      {
        "en": "1",
        "ne": "1"
      },
      {
        "en": "11",
        "ne": "11"
      },
      {
        "en": "0",
        "ne": "0"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "* and % have the same precedence, which is higher than +, and they associate left to right. So 4 * 2 is worked out first giving 8, then 8 % 3 gives the remainder 2, then 10 + 2 gives 12. Reading the line left to right like a sentence would give 14 * 2 = 28, then 28 % 3 = 1, which is option B and is how this question is usually got wrong.",
      "ne": "* र % को precedence उस्तै छ, + भन्दा माथि, र यी बायाँबाट दायाँ जान्छन्। त्यसैले पहिले 4 * 2 = 8, अनि 8 % 3 को शेष 2, अनि 10 + 2 = 12। वाक्यजस्तै बायाँबाट दायाँ पढे 14 * 2 = 28, अनि 28 % 3 = 1 आउँथ्यो — त्यो विकल्प (ख) हो र यो प्रश्न प्रायः त्यसरी नै बिग्रन्छ।"
    }
  },
  {
    "id": "g9.c.q15",
    "subject": "grade9/c-programming",
    "unit": "u2",
    "topic": "integer-division",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "float x; x = 7 / 2; printf(\"%.1f\", x);  What is printed?",
      "ne": "float x; x = 7 / 2; printf(\"%.1f\", x);  के छापिन्छ?"
    },
    "options": [
      {
        "en": "3.5",
        "ne": "3.5"
      },
      {
        "en": "3.0",
        "ne": "3.0"
      },
      {
        "en": "4.0",
        "ne": "4.0"
      },
      {
        "en": "The program does not compile",
        "ne": "प्रोग्राम compile हुँदैन"
      }
    ],
    "explanation": {
      "en": "7 and 2 are both integers, so the division is integer division and the remainder is discarded before anything is stored: the result is 3, not 3.5 and not rounded to 4. Storing 3 in a float gives 3.0, and that is what prints. The variable being a float does not help, because the division finished before the float was involved. Writing 7.0 / 2 or (float) 7 / 2 gives 3.5.",
      "ne": "7 र 2 दुवै integer भएकाले भाग integer division हो र केही भण्डारण हुनुअघि नै शेष फालिन्छ: नतिजा 3 हो — 3.5 पनि होइन, round गरेर 4 पनि होइन। 3 लाई float मा राख्दा 3.0 हुन्छ र त्यही छापिन्छ। Variable float हुनुले सहयोग गर्दैन, किनभने float बीचमा आउनुअघि नै भाग सकियो। 7.0 / 2 वा (float) 7 / 2 लेखे 3.5 आउँछ।"
    },
    "answer": 1
  },
  {
    "id": "g9.c.q16",
    "subject": "grade9/c-programming",
    "unit": "u2",
    "topic": "increment-operator",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "int i = 5, j; j = i++; What are i and j afterwards?",
      "ne": "int i = 5, j; j = i++; पछि i र j को मान के हुन्छ?"
    },
    "options": [
      {
        "en": "i = 6 and j = 6",
        "ne": "i = 6 र j = 6"
      },
      {
        "en": "i = 6 and j = 5",
        "ne": "i = 6 र j = 5"
      },
      {
        "en": "i = 5 and j = 5",
        "ne": "i = 5 र j = 5"
      },
      {
        "en": "i = 5 and j = 6",
        "ne": "i = 5 र j = 6"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "i++ is the POST-increment: the old value of i is used in the expression first, and only then is i increased. So j receives 5 and i becomes 6. Writing j = ++i instead would increase i first and give j the new value, making both 6. On a line of its own, i++ and ++i do exactly the same thing, which is why the difference only shows up when the value is being used.",
      "ne": "i++ POST-increment हो: पहिले expression मा i को पुरानो मान प्रयोग हुन्छ, अनि मात्र i बढ्छ। त्यसैले j ले 5 पाउँछ र i 6 हुन्छ। बरु j = ++i लेखे पहिले i बढेर j ले नयाँ मान पाउँथ्यो र दुवै 6 हुन्थे। एक्लै लाइनमा i++ र ++i ले ठ्याक्कै उही काम गर्छन् — त्यसैले फरक मान प्रयोग हुँदा मात्र देखिन्छ।"
    }
  },
  {
    "id": "g9.c.q17",
    "subject": "grade9/c-programming",
    "unit": "u3",
    "topic": "loop-at-least-once",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which loop always executes its body at least once?",
      "ne": "कुन loop ले आफ्नो body कम्तीमा एक पटक सधैं चलाउँछ?"
    },
    "options": [
      {
        "en": "for loop",
        "ne": "for loop"
      },
      {
        "en": "while loop",
        "ne": "while loop"
      },
      {
        "en": "do-while loop",
        "ne": "do-while loop"
      },
      {
        "en": "All three do",
        "ne": "तीनै ले"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "A do-while runs the body first and tests the condition afterwards, so the body has already happened by the time the condition is looked at. for and while both test before each turn, so if the condition is false at the start the body runs zero times. This is the single difference between the loops and it is the most asked question from this unit.",
      "ne": "do-while ले पहिले body चलाउँछ र पछि सर्त जाँच्छ, त्यसैले सर्त हेरिने बेलासम्म body भइसकेको हुन्छ। for र while दुवैले हरेक पटकअघि जाँच्छन्, त्यसैले सुरुमै सर्त असत्य भए body शून्य पटक चल्छ। Loop बीचको एउटै फरक यही हो र यस युनिटबाट सबैभन्दा धेरै सोधिने प्रश्न पनि यही।"
    }
  },
  {
    "id": "g9.c.q18",
    "subject": "grade9/c-programming",
    "unit": "u3",
    "topic": "switch-fallthrough",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "int n = 2; switch (n) { case 1: printf(\"A\"); case 2: printf(\"B\"); case 3: printf(\"C\"); default: printf(\"D\"); }  What is printed?",
      "ne": "int n = 2; switch (n) { case 1: printf(\"A\"); case 2: printf(\"B\"); case 3: printf(\"C\"); default: printf(\"D\"); }  के छापिन्छ?"
    },
    "options": [
      {
        "en": "B",
        "ne": "B"
      },
      {
        "en": "BCD",
        "ne": "BCD"
      },
      {
        "en": "ABCD",
        "ne": "ABCD"
      },
      {
        "en": "BD",
        "ne": "BD"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "There is no break anywhere in this switch. Control enters at the matching label, case 2, and then FALLS THROUGH every case below it, including default, running each printf in turn: B, then C, then D. The case labels only decide where execution starts; break is what decides where it stops. Adding break after each case would print B alone.",
      "ne": "यो switch मा कतै break छैन। नियन्त्रण मिल्ने label — case 2 — मा छिर्छ र त्यसपछि default सहित तलका हरेक case मा FALL THROUGH गर्दै हरेक printf चलाउँछ: B, अनि C, अनि D। Case का label ले चल्न कहाँबाट सुरु हुने मात्र तय गर्छन्; कहाँ रोकिने break ले तय गर्छ। हरेक case पछि break थपे B मात्र छापिन्थ्यो।"
    }
  },
  {
    "id": "g9.c.q19",
    "subject": "grade9/c-programming",
    "unit": "u3",
    "topic": "for-iteration-count",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "How many times does the body run in: for (i = 0; i < 5; i++) ?",
      "ne": "for (i = 0; i < 5; i++) मा body कति पटक चल्छ?"
    },
    "options": [
      {
        "en": "4 times",
        "ne": "४ पटक"
      },
      {
        "en": "5 times",
        "ne": "५ पटक"
      },
      {
        "en": "6 times",
        "ne": "६ पटक"
      },
      {
        "en": "Forever",
        "ne": "सधैं"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "i takes the values 0, 1, 2, 3 and 4 — five turns — and then becomes 5, at which point 5 < 5 is false and the loop ends. Counting from zero with a strictly-less-than condition always gives exactly the number in the condition, which is why array loops are written this way. Changing the condition to i <= 5 would give six turns and, over an array of size 5, would read past the end.",
      "ne": "i ले 0, 1, 2, 3 र 4 मान लिन्छ — पाँच पटक — अनि 5 हुन्छ, र त्यहाँ 5 < 5 असत्य भएर loop सकिन्छ। शून्यबाट सुरु गरेर \"भन्दा सानो\" सर्त राख्दा सधैं सर्तमा लेखिएकै सङ्ख्या जति पटक चल्छ — त्यसैले array का loop यसरी लेखिन्छन्। सर्त i <= 5 बनाए छ पटक चल्थ्यो र पाँच आकारको array मा अन्त्यभन्दा पर पढ्थ्यो।"
    }
  },
  {
    "id": "g9.c.q20",
    "subject": "grade9/c-programming",
    "unit": "u3",
    "topic": "continue-output",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "for (i = 1; i <= 5; i++) { if (i == 3) continue; printf(\"%d\", i); }  What is printed?",
      "ne": "for (i = 1; i <= 5; i++) { if (i == 3) continue; printf(\"%d\", i); }  के छापिन्छ?"
    },
    "options": [
      {
        "en": "12",
        "ne": "12"
      },
      {
        "en": "1245",
        "ne": "1245"
      },
      {
        "en": "12345",
        "ne": "12345"
      },
      {
        "en": "345",
        "ne": "345"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "continue abandons only the rest of the current turn and jumps to i++, so when i is 3 the printf below it is skipped and the loop carries on. The output is therefore 1, 2, 4, 5 with 3 missing. If the statement had been break, the loop itself would have ended at i == 3 and the output would be 12 — which is option A, and telling the two apart is exactly what this question is for.",
      "ne": "continue ले यस पटकको बाँकी मात्र छाडेर i++ मा हाम फाल्छ, त्यसैले i 3 हुँदा तलको printf छुट्छ र loop चलिरहन्छ। त्यसैले output 1, 2, 4, 5 हुन्छ, 3 छुटेर। Statement break भएको भए i == 3 मै loop सकिन्थ्यो र output 12 हुन्थ्यो — त्यो विकल्प (क) हो, र यी दुई छुट्याउनु नै यो प्रश्नको उद्देश्य हो।"
    }
  },
  {
    "id": "g9.c.q21",
    "subject": "grade9/c-programming",
    "unit": "u3",
    "topic": "empty-body-semicolon",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "for (i = 1; i <= 3; i++);  printf(\"Hi\");   How many times is Hi printed?",
      "ne": "for (i = 1; i <= 3; i++);  printf(\"Hi\");   Hi कति पटक छापिन्छ?"
    },
    "options": [
      {
        "en": "Three times",
        "ne": "तीन पटक"
      },
      {
        "en": "Once",
        "ne": "एक पटक"
      },
      {
        "en": "Never — it is a compile error",
        "ne": "कहिल्यै होइन — यो compile त्रुटि हो"
      },
      {
        "en": "Four times",
        "ne": "चार पटक"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The semicolon straight after the for brackets is a complete, empty statement, and that empty statement is the loop body. So the loop runs three times doing nothing at all, and the printf is simply the next statement after the loop, which runs once. The program compiles without a single warning, which is what makes this mistake expensive: nothing tells you, and the output is one line where three were expected.",
      "ne": "For को कोष्ठकपछि सिधै आउने semicolon पूरै खाली statement हो, र त्यही खाली statement loop को body हो। त्यसैले loop तीन पटक केही नगरी चल्छ, र printf loop पछिको अर्को statement मात्र भएकाले एक पटक चल्छ। प्रोग्राम एउटै चेतावनीविना compile हुन्छ — यही गल्ती महँगो हुनुको कारण त्यही हो: कसैले भन्दैन, र तीन लाइनको अपेक्षामा एक लाइन आउँछ।"
    }
  },
  {
    "id": "g9.c.q22",
    "subject": "grade9/c-programming",
    "unit": "u3",
    "topic": "nested-loop-count",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "for (i = 1; i <= 3; i++) for (j = 1; j <= 4; j++) printf(\"*\");  How many stars are printed?",
      "ne": "for (i = 1; i <= 3; i++) for (j = 1; j <= 4; j++) printf(\"*\");  कति तारा छापिन्छन्?"
    },
    "options": [
      {
        "en": "7",
        "ne": "७"
      },
      {
        "en": "12",
        "ne": "१२"
      },
      {
        "en": "4",
        "ne": "४"
      },
      {
        "en": "3",
        "ne": "३"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The inner loop completes all of its turns for each single turn of the outer loop, so the counts multiply rather than add: 3 x 4 = 12. Adding them would give 7, which is option A and the usual wrong answer. In a pattern program the outer loop is the rows and the inner loop is the columns, so this is a rectangle of three rows and four columns.",
      "ne": "बाहिरी loop को हरेक एक पटकका लागि भित्री loop ले आफ्ना सबै पटक पूरा गर्छ, त्यसैले गन्ती जोडिँदैन, गुणन हुन्छ: 3 x 4 = 12। जोडे 7 आउँथ्यो — त्यो विकल्प (क) हो र सामान्य गलत उत्तर पनि। ढाँचाको प्रोग्राममा बाहिरी loop पङ्क्ति र भित्री loop स्तम्भ हो, त्यसैले यो तीन पङ्क्ति र चार स्तम्भको आयात हो।"
    }
  },
  {
    "id": "g9.c.q23",
    "subject": "grade9/c-programming",
    "unit": "u3",
    "topic": "ladder-order",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A grading program tests if (marks >= 40) first, then else if (marks >= 80). A student scores 95. What is reported?",
      "ne": "एउटा grading प्रोग्रामले पहिले if (marks >= 40) जाँच्छ, अनि else if (marks >= 80)। विद्यार्थीले ९५ ल्यायो। के भनिन्छ?"
    },
    "options": [
      {
        "en": "Distinction, because 95 is at least 80",
        "ne": "Distinction, किनभने ९५ कम्तीमा ८० छ"
      },
      {
        "en": "The grade for 40 and above, because the first true test wins and the rest are never reached",
        "ne": "४० माथिको grade, किनभने पहिलो सत्य जाँच जित्छ र बाँकीसम्म पुगिँदैन"
      },
      {
        "en": "Both branches run",
        "ne": "दुवै शाखा चल्छन्"
      },
      {
        "en": "Nothing — the conditions overlap so the program is invalid",
        "ne": "केही पनि होइन — सर्त बाझिएकाले प्रोग्राम अमान्य हुन्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "An if-else-if ladder tests its conditions in order and stops at the first one that is true. 95 is at least 40, so that branch runs and the else if below it is never even evaluated. The conditions overlap, which is legal and is exactly why order matters: a ladder on ranges must be written from the narrowest or highest condition downwards.",
      "ne": "if-else-if शृंखलाले सर्तहरू क्रमैसँग जाँच्छ र पहिलो सत्यमा रोकिन्छ। ९५ कम्तीमा ४० छ, त्यसैले त्यही शाखा चल्छ र तलको else if मूल्याङ्कन नै हुँदैन। सर्त बाझिनु मान्य छ, र क्रम महत्त्वपूर्ण हुनुको कारण पनि त्यही: दायराको शृंखला सबैभन्दा साँघुरो वा अग्लो सर्तबाट तलतिर लेख्नुपर्छ।"
    }
  },
  {
    "id": "g9.c.q24",
    "subject": "grade9/c-programming",
    "unit": "u3",
    "topic": "counter-after-loop",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "After for (i = 1; i <= 5; i++) { } finishes, what is the value of i?",
      "ne": "for (i = 1; i <= 5; i++) { } सकिएपछि i को मान कति हुन्छ?"
    },
    "options": [
      {
        "en": "5",
        "ne": "५"
      },
      {
        "en": "6",
        "ne": "६"
      },
      {
        "en": "0",
        "ne": "०"
      },
      {
        "en": "It is undefined after the loop",
        "ne": "Loop पछि यो अनिश्चित हुन्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The loop ends only when the condition becomes false, and that cannot happen until i has already been increased past 5. The last body turn runs with i = 5, then i++ makes it 6, then 6 <= 5 is false and the loop stops — so i is 6. The counter is an ordinary variable declared outside the loop, so it keeps that value afterwards, and output questions are regularly built on exactly this.",
      "ne": "Loop सर्त असत्य भएपछि मात्र सकिन्छ, र त्यो i ५ नाघेर नबढेसम्म हुन सक्दैन। अन्तिम पटक body i = 5 मा चल्छ, अनि i++ ले 6 बनाउँछ, अनि 6 <= 5 असत्य भएर loop रोकिन्छ — त्यसैले i 6 हुन्छ। Counter loop बाहिर घोषणा गरिएको सामान्य variable भएकाले पछि पनि त्यही मान राख्छ, र output का प्रश्न ठ्याक्कै यसैमा बनेका हुन्छन्।"
    }
  },
  {
    "id": "g9.c.q25",
    "subject": "grade9/c-programming",
    "unit": "u3",
    "topic": "while-zero-times",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "int n = 10; while (n < 5) { printf(\"Hello\"); }  What does this print?",
      "ne": "int n = 10; while (n < 5) { printf(\"Hello\"); }  यसले के छाप्छ?"
    },
    "options": [
      {
        "en": "Hello, once",
        "ne": "Hello, एक पटक"
      },
      {
        "en": "Nothing at all",
        "ne": "केही पनि होइन"
      },
      {
        "en": "Hello forever",
        "ne": "Hello सधैं"
      },
      {
        "en": "Hello five times",
        "ne": "Hello पाँच पटक"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A while loop tests its condition before every turn, including the first. 10 < 5 is false immediately, so the body never runs and nothing is printed. Note that this is not an infinite loop: it would be one if the condition were true and nothing inside changed n, which is a different mistake. The same code written as a do-while would print Hello once.",
      "ne": "While loop ले हरेक पटकअघि — पहिलो पटक पनि — सर्त जाँच्छ। 10 < 5 तुरुन्तै असत्य छ, त्यसैले body कहिल्यै चल्दैन र केही छापिँदैन। ध्यान दिनुहोस् — यो अनन्त loop होइन: सर्त सत्य भएर भित्र n नबदलिएको भए त्यो हुन्थ्यो, र त्यो अर्कै गल्ती हो। उही कोड do-while मा लेखे Hello एक पटक छापिन्थ्यो।"
    }
  },
  {
    "id": "g9.c.q26",
    "subject": "grade9/c-programming",
    "unit": "u3",
    "topic": "goto-statement",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What does the goto statement do?",
      "ne": "goto statement ले के गर्छ?"
    },
    "options": [
      {
        "en": "It ends the loop it is inside",
        "ne": "यो भएको loop सिध्याउँछ"
      },
      {
        "en": "It transfers control to a labelled statement elsewhere in the same function",
        "ne": "यसले नियन्त्रण उही function भित्र label लेखिएको statement मा सार्छ"
      },
      {
        "en": "It calls another function",
        "ne": "यसले अर्को function बोलाउँछ"
      },
      {
        "en": "It skips the current turn of a loop",
        "ne": "यसले loop को यस पटकको काम छाड्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "goto is written as goto label; with label: marking the destination somewhere in the same function. It is the only one of the four jump statements that names a destination — break ends a loop, continue skips a turn, and return ends a function. It is on the syllabus and examinable, and almost every real program is clearer without it, because a reader can no longer work out what reaches a line by reading downwards.",
      "ne": "goto लाई goto label; लेखिन्छ र उही function भित्र कतै label: ले गन्तव्य जनाउँछ। चार jump statement मध्ये गन्तव्यको नाम लिने एकमात्र यही हो — break ले loop सिध्याउँछ, continue ले एक पटक छाड्छ, return ले function सिध्याउँछ। यो पाठ्यक्रममा छ र सोधिन्छ, तर झन्डै हरेक वास्तविक प्रोग्राम यसविना स्पष्ट हुन्छ, किनभने कुन लाइनमा के पुग्छ तलतिर पढेर थाहा पाउन सकिँदैन।"
    }
  },
  {
    "id": "g9.c.q27",
    "subject": "grade9/c-programming",
    "unit": "u3",
    "topic": "switch-expression-type",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which of these can NOT be used in a switch statement?",
      "ne": "यीमध्ये कुन switch statement मा प्रयोग गर्न मिल्दैन?"
    },
    "options": [
      {
        "en": "An int variable",
        "ne": "int variable"
      },
      {
        "en": "A char variable",
        "ne": "char variable"
      },
      {
        "en": "A float variable, or a range such as case 40 to 59",
        "ne": "float variable, वा case 40 देखि 59 जस्तो दायरा"
      },
      {
        "en": "A default label",
        "ne": "default label"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "A switch tests one value against exact constant labels, so the expression must be an integer type — int or char — and each case must be a single constant. A float cannot be used, and a range cannot be written as a case at all. That is why grading from marks needs an if-else-if ladder: the ladder can test ranges and the switch cannot.",
      "ne": "Switch ले एउटा मानलाई ठ्याक्कै मिल्ने constant label सँग जाँच्छ, त्यसैले expression पूर्णाङ्क प्रकारको — int वा char — हुनुपर्छ र हरेक case एउटै constant। Float चल्दैन, र दायरा case मा लेख्नै मिल्दैन। अंकबाट grade निकाल्न if-else-if शृंखला चाहिनुको कारण त्यही हो: शृंखलाले दायरा जाँच्न सक्छ, switch ले सक्दैन।"
    }
  },
  {
    "id": "g9.c.q28",
    "subject": "grade9/c-programming",
    "unit": "u3",
    "topic": "dowhile-syntax",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which loop requires a semicolon after its closing condition?",
      "ne": "कुन loop लाई सर्तको कोष्ठकपछि semicolon चाहिन्छ?"
    },
    "options": [
      {
        "en": "for",
        "ne": "for"
      },
      {
        "en": "while",
        "ne": "while"
      },
      {
        "en": "do-while",
        "ne": "do-while"
      },
      {
        "en": "None of them",
        "ne": "कुनैलाई पनि होइन"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "A do-while ends with while (condition); and that semicolon is compulsory, because the whole do-while is one statement that finishes there. A for or a while heading is followed by the body, so a semicolon after it would end the statement early and leave an empty body — which compiles and silently changes the program.",
      "ne": "do-while while (condition); ले सकिन्छ र त्यो semicolon अनिवार्य छ, किनभने पूरै do-while एउटै statement हो जो त्यहीँ सकिन्छ। for वा while को शीर्षकपछि body आउँछ, त्यसैले त्यहाँ semicolon राखे statement चाँडै सकिन्छ र body खाली रहन्छ — जुन compile हुन्छ र प्रोग्राम चुपचाप बदल्छ।"
    }
  },
  {
    "id": "g9.c.q29",
    "subject": "grade9/c-programming",
    "unit": "u3",
    "topic": "infinite-loop-cause",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "i = 1; while (i <= 5) { printf(\"%d\", i); }  Why does this never stop?",
      "ne": "i = 1; while (i <= 5) { printf(\"%d\", i); }  यो किन कहिल्यै रोकिँदैन?"
    },
    "options": [
      {
        "en": "Because while loops cannot be stopped",
        "ne": "किनभने while loop रोक्नै मिल्दैन"
      },
      {
        "en": "Because nothing inside the loop changes i, so the condition stays true forever",
        "ne": "किनभने loop भित्र i लाई केहीले बदल्दैन, त्यसैले सर्त सधैं सत्य रहन्छ"
      },
      {
        "en": "Because i was initialised outside the loop",
        "ne": "किनभने i loop बाहिर initialise गरिएको थियो"
      },
      {
        "en": "Because printf resets i to 1 each time",
        "ne": "किनभने printf ले हरेक पटक i लाई १ बनाउँछ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Every loop needs three things: an initialisation, a condition and an UPDATE. A for loop puts all three on one line so the update is hard to forget; a while loop leaves the update inside the body, and here it is missing. i stays 1, the condition stays true, and the loop runs until the program is killed. Adding i++ inside the braces fixes it.",
      "ne": "हरेक loop लाई तीन कुरा चाहिन्छ: initialisation, सर्त र UPDATE। For loop ले तीनै एउटै लाइनमा राख्छ त्यसैले update बिर्सन गाह्रो हुन्छ; while ले update body भित्र छाड्छ, र यहाँ त्यही छुटेको छ। i १ मै रहन्छ, सर्त सत्य रहन्छ, र प्रोग्राम नमारेसम्म loop चल्छ। Brace भित्र i++ थपे ठिक हुन्छ।"
    }
  },
  {
    "id": "g9.c.q30",
    "subject": "grade9/c-programming",
    "unit": "u3",
    "topic": "break-nested-scope",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A break statement is placed inside the INNER of two nested loops. What does it leave?",
      "ne": "दुई nested loop मध्ये भित्रीमा break राखिएको छ। यसले के छाड्छ?"
    },
    "options": [
      {
        "en": "Both loops",
        "ne": "दुवै loop"
      },
      {
        "en": "Only the inner loop; the outer loop continues with its next turn",
        "ne": "भित्री loop मात्र; बाहिरी loop आफ्नो अर्को पटकबाट चलिरहन्छ"
      },
      {
        "en": "Only the outer loop",
        "ne": "बाहिरी loop मात्र"
      },
      {
        "en": "The whole function",
        "ne": "पूरै function"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "break leaves the single nearest enclosing loop and nothing more. Control resumes after the inner loop, still inside the outer one, which then carries on with its next turn. Leaving both needs a flag variable tested by the outer condition, or a return if the loops are alone in a function. Expecting one break to escape two loops is one of the standard wrong answers in this unit.",
      "ne": "break ले आफूलाई घेर्ने सबैभन्दा नजिकको एउटै loop छाड्छ, त्योभन्दा बढी होइन। नियन्त्रण भित्री loop पछि, तर बाहिरी loop भित्रै फर्कन्छ, र बाहिरी loop आफ्नो अर्को पटक सुरु गर्छ। दुवै छाड्न बाहिरी सर्तले जाँच्ने flag variable चाहिन्छ, वा loop हरू function मा एक्लै भए return। एउटा break ले दुई loop उम्कन्छ भन्ने अपेक्षा यस युनिटका मानक गलत उत्तरमध्ये एक हो।"
    }
  },
  {
    "id": "g9.c.q31",
    "subject": "grade9/c-programming",
    "unit": "u4",
    "topic": "prototype-identification",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which of these is a function DECLARATION (prototype)?",
      "ne": "यीमध्ये कुन function को DECLARATION (prototype) हो?"
    },
    "options": [
      {
        "en": "int add(int a, int b) { return a + b; }",
        "ne": "int add(int a, int b) { return a + b; }"
      },
      {
        "en": "int add(int a, int b);",
        "ne": "int add(int a, int b);"
      },
      {
        "en": "sum = add(5, 7);",
        "ne": "sum = add(5, 7);"
      },
      {
        "en": "add;",
        "ne": "add;"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A prototype gives the return type, the name and the parameter types, and ends with a semicolon. It promises the compiler that the function exists somewhere so a call can be checked before the body is read. Option A is the definition, with the body in braces and no semicolon after the closing brace. Option C is a call, with real values inside the brackets.",
      "ne": "Prototype ले return प्रकार, नाम र parameter का प्रकार दिन्छ र semicolon ले सकिन्छ। यसले compiler लाई function कतै छ भन्ने वाचा दिन्छ, ताकि body पढ्नुअघि call जाँच्न सकियोस्। विकल्प (क) definition हो — brace भित्र body र बन्द brace पछि semicolon छैन। विकल्प (ग) call हो, कोष्ठकभित्र वास्तविक मान सहित।"
    }
  },
  {
    "id": "g9.c.q32",
    "subject": "grade9/c-programming",
    "unit": "u4",
    "topic": "call-by-value-output",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "void change(int x) { x = 100; }  int main() { int n = 5; change(n); printf(\"%d\", n); }  What is printed?",
      "ne": "void change(int x) { x = 100; }  int main() { int n = 5; change(n); printf(\"%d\", n); }  के छापिन्छ?"
    },
    "options": [
      {
        "en": "100",
        "ne": "100"
      },
      {
        "en": "5",
        "ne": "5"
      },
      {
        "en": "0",
        "ne": "0"
      },
      {
        "en": "The program does not compile",
        "ne": "प्रोग्राम compile हुँदैन"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "change is called by value, so a copy of n is made and handed over as x. The function sets the copy to 100 and then ends, taking the copy with it. n in main was never touched and still holds 5. To change n the function would need its address: void change(int *x) with *x = 100; called as change(&n).",
      "ne": "change call by value बाट बोलाइएको छ, त्यसैले n को प्रतिलिपि बनेर x का रूपमा जान्छ। Function ले प्रतिलिपिलाई 100 बनाएर सकिन्छ, र प्रतिलिपि पनि सँगै जान्छ। main को n छोइएकै थिएन र अझै 5 छ। n बदल्न function लाई ठेगाना चाहिन्थ्यो: void change(int *x) र भित्र *x = 100;, change(&n) ले बोलाएर।"
    }
  },
  {
    "id": "g9.c.q33",
    "subject": "grade9/c-programming",
    "unit": "u4",
    "topic": "call-by-reference-output",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "void swap(int *x, int *y) { int t = *x; *x = *y; *y = t; }  int main() { int a = 5, b = 9; swap(&a, &b); printf(\"%d %d\", a, b); }  What is printed?",
      "ne": "void swap(int *x, int *y) { int t = *x; *x = *y; *y = t; }  int main() { int a = 5, b = 9; swap(&a, &b); printf(\"%d %d\", a, b); }  के छापिन्छ?"
    },
    "options": [
      {
        "en": "5 9",
        "ne": "5 9"
      },
      {
        "en": "9 5",
        "ne": "9 5"
      },
      {
        "en": "9 9",
        "ne": "9 9"
      },
      {
        "en": "Two addresses",
        "ne": "दुई ठेगाना"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The ampersands send the addresses of a and b, and the stars inside the function reach back to those addresses. t keeps the value at x, which is 5; then *x = *y writes 9 into a; then *y = t writes 5 into b. Nothing is returned and nothing needs to be, because the function wrote directly into main's memory. Remove the two ampersands and the two stars and the same program would print 5 9.",
      "ne": "Ampersand ले a र b का ठेगाना पठाउँछन्, र function भित्रका star ले ती ठेगानासम्म पुग्छन्। t ले x को ठेगानाको मान — 5 — राख्छ; अनि *x = *y ले a मा 9 लेख्छ; अनि *y = t ले b मा 5 लेख्छ। केही फर्काइँदैन र चाहिँदैन पनि, किनभने function ले सिधै main को मेमोरीमा लेख्यो। दुई ampersand र दुई star हटाए उही प्रोग्रामले 5 9 छाप्थ्यो।"
    }
  },
  {
    "id": "g9.c.q34",
    "subject": "grade9/c-programming",
    "unit": "u4",
    "topic": "library-function",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which of these is a library function, and which header does it need?",
      "ne": "यीमध्ये कुन library function हो, र यसलाई कुन header चाहिन्छ?"
    },
    "options": [
      {
        "en": "larger() — it needs stdio.h",
        "ne": "larger() — यसलाई stdio.h चाहिन्छ"
      },
      {
        "en": "strlen() — it needs string.h",
        "ne": "strlen() — यसलाई string.h चाहिन्छ"
      },
      {
        "en": "main() — it needs math.h",
        "ne": "main() — यसलाई math.h चाहिन्छ"
      },
      {
        "en": "swap() — it needs stdlib.h",
        "ne": "swap() — यसलाई stdlib.h चाहिन्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A library function comes with the compiler already written and already compiled; you include its header and call it. strlen lives in string.h, as strcpy, strcat and strcmp do. printf and scanf need stdio.h, and sqrt and pow need math.h. larger and swap are names a programmer chooses, which makes them user-defined, and main is the function the program starts from rather than a library one.",
      "ne": "Library function compiler सँगै पहिल्यै लेखिएर compile भइसकेको आउँछ; तपाईंले header include गरेर बोलाउनुहुन्छ। strlen string.h मा छ, strcpy, strcat र strcmp जस्तै। printf र scanf लाई stdio.h, sqrt र pow लाई math.h चाहिन्छ। larger र swap प्रोग्रामरले छानेका नाम हुन् — त्यसैले ती user-defined हुन् — र main प्रोग्राम सुरु हुने function हो, library को होइन।"
    }
  },
  {
    "id": "g9.c.q35",
    "subject": "grade9/c-programming",
    "unit": "u4",
    "topic": "base-case",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What happens if a recursive function is written without a base case?",
      "ne": "Base case नलेखी recursive function बनाए के हुन्छ?"
    },
    "options": [
      {
        "en": "It returns 0 automatically",
        "ne": "यसले आफैं ० फर्काउँछ"
      },
      {
        "en": "The calls never stop, the stack fills up and the program crashes",
        "ne": "Call कहिल्यै रोकिँदैनन्, stack भरिन्छ र प्रोग्राम crash हुन्छ"
      },
      {
        "en": "The compiler adds one for you",
        "ne": "Compiler ले आफैं एउटा थपिदिन्छ"
      },
      {
        "en": "It runs once and stops",
        "ne": "यो एक पटक चलेर रोकिन्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The base case is the condition under which the function returns an answer WITHOUT calling itself, and it is the only thing that ends the recursion. Without it every call makes another call. Each unfinished call occupies memory on the stack, so this is not a quiet infinite loop — the stack runs out and the program stops with a stack overflow. That is a different failure from an endless while loop, and knowing which one you get is the point of the question.",
      "ne": "Base case भनेको function ले आफैंलाई नबोलाई उत्तर फर्काउने सर्त हो, र recursion सिध्याउने एकमात्र कुरा त्यही हो। त्यो नभए हरेक call ले अर्को call गर्छ। हरेक अधुरो call ले stack मा मेमोरी ओगट्छ, त्यसैले यो चुपचापको अनन्त loop होइन — stack सकिन्छ र प्रोग्राम stack overflow भएर रोकिन्छ। अनन्त while loop भन्दा यो फरक असफलता हो, र कुन आउँछ थाहा पाउनु नै प्रश्नको उद्देश्य हो।"
    }
  },
  {
    "id": "g9.c.q36",
    "subject": "grade9/c-programming",
    "unit": "u4",
    "topic": "recursion-trace",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "int f(int n) { if (n == 1) return 1; return n * f(n - 1); }  What does f(4) return, and how many times is f called in total?",
      "ne": "int f(int n) { if (n == 1) return 1; return n * f(n - 1); }  f(4) ले के फर्काउँछ, र जम्मा कति पटक f बोलाइन्छ?"
    },
    "options": [
      {
        "en": "24, called 4 times",
        "ne": "२४, ४ पटक बोलाइन्छ"
      },
      {
        "en": "24, called 3 times",
        "ne": "२४, ३ पटक बोलाइन्छ"
      },
      {
        "en": "10, called 4 times",
        "ne": "१०, ४ पटक बोलाइन्छ"
      },
      {
        "en": "12, called 2 times",
        "ne": "१२, २ पटक बोलाइन्छ"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "This is factorial. f(4) calls f(3), which calls f(2), which calls f(1); f(1) hits the base case and returns 1 without calling again. That is four calls in all. The multiplications then happen on the way back: 2 x 1 = 2, 3 x 2 = 6, 4 x 6 = 24. Every multiplication waits until the innermost call has returned, which is why four unfinished calls exist on the stack at the same moment.",
      "ne": "यो factorial हो। f(4) ले f(3) बोलाउँछ, त्यसले f(2), त्यसले f(1); f(1) base case मा पुगेर फेरि नबोलाई 1 फर्काउँछ। जम्मा चार call भए। गुणन फर्कंदा हुन्छ: 2 x 1 = 2, 3 x 2 = 6, 4 x 6 = 24। हरेक गुणन सबैभन्दा भित्रको call नफर्कंदासम्म पर्खन्छ — त्यसैले एकै क्षणमा stack मा चार अधुरा call हुन्छन्।"
    }
  },
  {
    "id": "g9.c.q37",
    "subject": "grade9/c-programming",
    "unit": "u4",
    "topic": "void-meaning",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "In void show(void), what do the two uses of void mean?",
      "ne": "void show(void) मा void को दुई प्रयोगको अर्थ के हो?"
    },
    "options": [
      {
        "en": "The function is empty and does nothing",
        "ne": "Function खाली छ र केही गर्दैन"
      },
      {
        "en": "The first says no value is returned; the second says no argument is taken",
        "ne": "पहिलोले कुनै मान फर्कंदैन भन्छ; दोस्रोले कुनै argument लिँदैन भन्छ"
      },
      {
        "en": "The function may be called only once",
        "ne": "Function एक पटक मात्र बोलाउन मिल्छ"
      },
      {
        "en": "Both mean the function returns zero",
        "ne": "दुवैको अर्थ function ले शून्य फर्काउँछ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "void means \"nothing here\". In front of the name it is the return type, saying no value comes back — so the call cannot be used on the right of an assignment. Inside the brackets it is the parameter list, saying nothing goes in. A function that prints a line of stars is the usual example: it needs no input and produces no value, only an effect on the screen.",
      "ne": "void को अर्थ \"यहाँ केही छैन\" हो। नाम अगाडि यो return प्रकार हो — कुनै मान फर्कंदैन भन्छ, त्यसैले call लाई assignment को दायाँपट्टि राख्न मिल्दैन। कोष्ठकभित्र यो parameter सूची हो — केही भित्र जाँदैन भन्छ। ताराको लाइन छाप्ने function सामान्य उदाहरण हो: यसलाई input चाहिँदैन र मान दिँदैन, पर्दामा असर मात्र पार्छ।"
    }
  },
  {
    "id": "g9.c.q38",
    "subject": "grade9/c-programming",
    "unit": "u4",
    "topic": "return-count",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "How many values can a C function return to its caller through return?",
      "ne": "C को function ले return मार्फत बोलाउनेलाई कति मान फर्काउन सक्छ?"
    },
    "options": [
      {
        "en": "Any number, separated by commas",
        "ne": "जति पनि, comma ले छुट्याएर"
      },
      {
        "en": "At most one",
        "ne": "बढीमा एउटा"
      },
      {
        "en": "Exactly two",
        "ne": "ठ्याक्कै दुई"
      },
      {
        "en": "None — functions cannot return values",
        "ne": "एउटा पनि होइन — function ले मान फर्काउनै सक्दैन"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A function takes any number of arguments and returns at most one value. That asymmetry is not a detail of syntax — it is the whole reason call by reference exists. A function that must give back two answers, such as a swap, sends them out through pointers instead, by writing into the caller's memory rather than returning anything at all.",
      "ne": "Function ले जति पनि argument लिन्छ र बढीमा एउटा मान फर्काउँछ। यो असमानता syntax को सानो कुरा होइन — call by reference हुनुको पूरै कारण त्यही हो। swap जस्तो दुई उत्तर फर्काउनुपर्ने function ले केही नफर्काई बोलाउनेको मेमोरीमै लेखेर pointer मार्फत ती बाहिर पठाउँछ।"
    }
  },
  {
    "id": "g9.c.q39",
    "subject": "grade9/c-programming",
    "unit": "u4",
    "topic": "argument-vs-parameter",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "In int larger(int x, int y) called as larger(a, b), which are the arguments and which are the parameters?",
      "ne": "int larger(int x, int y) लाई larger(a, b) ले बोलाउँदा argument कुन हुन् र parameter कुन?"
    },
    "options": [
      {
        "en": "x and y are the arguments; a and b are the parameters",
        "ne": "x र y argument हुन्; a र b parameter हुन्"
      },
      {
        "en": "a and b are the arguments; x and y are the parameters",
        "ne": "a र b argument हुन्; x र y parameter हुन्"
      },
      {
        "en": "All four are arguments",
        "ne": "चारै argument हुन्"
      },
      {
        "en": "All four are parameters",
        "ne": "चारै parameter हुन्"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The argument is what you send at the call, so a and b are the arguments. The parameter is the variable in the function heading that receives it, so x and y are the parameters. The names do not have to match and usually do not — the connection is made by position, first argument into first parameter, which is also why passing them in the wrong order is a bug no compiler will catch.",
      "ne": "Argument भनेको call मा पठाइने कुरा हो, त्यसैले a र b argument हुन्। Parameter भनेको function को शीर्षकमा त्यो पाउने variable हो, त्यसैले x र y parameter हुन्। नाम मिल्नै पर्दैन र प्रायः मिल्दैन पनि — जोडाइ स्थानले हुन्छ, पहिलो argument पहिलो parameter मा। त्यसैले क्रम उल्टो पठाउनु compiler ले नसमात्ने गल्ती हो।"
    }
  },
  {
    "id": "g9.c.q40",
    "subject": "grade9/c-programming",
    "unit": "u4",
    "topic": "function-advantage",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A programmer copies the same ten lines into four places instead of writing a function. What is the main cost?",
      "ne": "प्रोग्रामरले function नलेखी उही दस लाइन चार ठाउँमा सार्छ। मुख्य लागत के हो?"
    },
    "options": [
      {
        "en": "The program runs four times slower",
        "ne": "प्रोग्राम चार गुणा ढिलो चल्छ"
      },
      {
        "en": "A mistake in those lines must be found and fixed in four places, and one will be missed",
        "ne": "ती लाइनको गल्ती चार ठाउँमा खोजेर सच्याउनुपर्छ, र एउटा छुट्छ"
      },
      {
        "en": "The compiler refuses duplicate code",
        "ne": "Compiler ले दोहोरिएको कोड अस्वीकार गर्छ"
      },
      {
        "en": "Nothing — it is exactly the same",
        "ne": "केही होइन — ठ्याक्कै उस्तै हो"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Reusability is the first advantage of functions, and the cost of not having it is maintenance rather than speed. Four copies means four places to change, and the one that gets missed is a bug that appears only in that part of the program. A function also makes the code shorter and easier to read and test, and its name documents what the ten lines were for — which a copy does not.",
      "ne": "Function को पहिलो फाइदा पुनःप्रयोग हो, र त्यो नहुँदाको लागत गति होइन, मर्मत हो। चार प्रतिलिपि भनेको सच्याउने चार ठाउँ, र छुट्ने त्यो एउटा प्रोग्रामको त्यही भागमा मात्र देखिने bug बन्छ। Function ले कोड छोटो, पढ्न र जाँच्न सजिलो पनि बनाउँछ, र यसको नामले ती दस लाइन केका लागि थिए भन्छ — प्रतिलिपिले भन्दैन।"
    }
  },
  {
    "id": "g9.c.q41",
    "subject": "grade9/c-programming",
    "unit": "u4",
    "topic": "array-as-argument",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A function sorts an array passed to it as fill(marks, 5), with no ampersand at the call. Is the caller's array changed?",
      "ne": "कुनै function ले fill(marks, 5) ले पठाइएको array क्रम मिलाउँछ, र call मा ampersand छैन। बोलाउनेको array बदलिन्छ?"
    },
    "options": [
      {
        "en": "No — without & it is call by value, so a copy is sorted",
        "ne": "बदलिँदैन — & नभएपछि call by value हो, त्यसैले प्रतिलिपि मिलाइन्छ"
      },
      {
        "en": "Yes — an array name is already an address, so the function receives the real array",
        "ne": "बदलिन्छ — array को नाम आफैं ठेगाना हो, त्यसैले function लाई साँच्चैको array पुग्छ"
      },
      {
        "en": "Only if the array is declared globally",
        "ne": "Array global घोषणा गरिएको भए मात्र"
      },
      {
        "en": "Only the first element is changed",
        "ne": "पहिलो element मात्र बदलिन्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "An array name used on its own is the address of its first element, so passing marks passes an address and the function works on the caller's array. No ampersand is written because none is needed — the array is already what & would have produced. This is the exception students find surprising, and it is the reason a sorting function changes the list in main without returning anything.",
      "ne": "Array को नाम एक्लै प्रयोग गर्दा त्यो पहिलो element को ठेगाना हो, त्यसैले marks पठाउनु ठेगाना पठाउनु हो र function ले बोलाउनेकै array मा काम गर्छ। Ampersand नलेखिनुको कारण चाहिँदैन भन्ने हो — & ले बनाउने कुरा array आफैं भइसक्यो। विद्यार्थीलाई अचम्म लाग्ने अपवाद यही हो, र क्रम मिलाउने function ले केही नफर्काई main को सूची बदल्नुको कारण पनि त्यही।"
    }
  },
  {
    "id": "g9.c.q42",
    "subject": "grade9/c-programming",
    "unit": "u5",
    "topic": "last-index",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "For int marks[10]; what is the index of the LAST element?",
      "ne": "int marks[10]; मा अन्तिम element को index कति हो?"
    },
    "options": [
      {
        "en": "10",
        "ne": "१०"
      },
      {
        "en": "9",
        "ne": "९"
      },
      {
        "en": "11",
        "ne": "११"
      },
      {
        "en": "1",
        "ne": "१"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Indexing starts at 0, so an array of size 10 has indices 0 to 9 and the last index is size minus one. There is no marks[10]: that is the eleventh box and it is not part of the array. C performs no bounds checking, so writing to it compiles and quietly damages whatever happens to be in that memory.",
      "ne": "Index ० बाट सुरु हुन्छ, त्यसैले १० आकारको array का index ० देखि ९ सम्म हुन्छन् र अन्तिम index आकार घटाउ एक हो। marks[10] भन्ने छैन: त्यो एघारौं बाकस हो र array को भाग होइन। C ले bound जाँच्दैन, त्यसैले त्यहाँ लेख्दा compile हुन्छ र त्यो मेमोरीमा जे छ त्यो चुपचाप बिग्रन्छ।"
    }
  },
  {
    "id": "g9.c.q43",
    "subject": "grade9/c-programming",
    "unit": "u5",
    "topic": "partial-initialisation",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "int a[5] = {7, 3}; What are a[2], a[3] and a[4]?",
      "ne": "int a[5] = {7, 3}; मा a[2], a[3] र a[4] के हुन्छन्?"
    },
    "options": [
      {
        "en": "Garbage — whatever was in that memory",
        "ne": "Garbage — त्यो मेमोरीमा जे थियो"
      },
      {
        "en": "All three are 0",
        "ne": "तीनै ० हुन्छन्"
      },
      {
        "en": "All three are 3",
        "ne": "तीनै ३ हुन्छन्"
      },
      {
        "en": "The program does not compile",
        "ne": "प्रोग्राम compile हुँदैन"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "When an array is given an initialiser list that is shorter than its size, the remaining elements are set to zero rather than left as garbage. That is a rule about initialisation, not about declaration: int a[5]; with no list at all leaves all five holding garbage. It is also why int a[100] = {0}; is the usual way of writing \"an array of a hundred zeros\".",
      "ne": "Array लाई आकारभन्दा छोटो initialiser सूची दिइँदा बाँकी element garbage नभई शून्य हुन्छन्। यो initialisation को नियम हो, घोषणाको होइन: सूची नै नभएको int a[5]; मा पाँचै मा garbage रहन्छ। \"सय शून्यको array\" लेख्ने चलनचल्तीको तरिका int a[100] = {0}; हुनुको कारण पनि त्यही।"
    }
  },
  {
    "id": "g9.c.q44",
    "subject": "grade9/c-programming",
    "unit": "u5",
    "topic": "string-array-size",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What is the smallest size that will safely hold the word \"KATHMANDU\" in a char array?",
      "ne": "\"KATHMANDU\" शब्द char array मा सुरक्षित रूपमा राख्न सबैभन्दा सानो आकार कति हुनुपर्छ?"
    },
    "options": [
      {
        "en": "9",
        "ne": "९"
      },
      {
        "en": "10",
        "ne": "१०"
      },
      {
        "en": "8",
        "ne": "८"
      },
      {
        "en": "20 — strings always need 20",
        "ne": "२० — string लाई सधैं २० चाहिन्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "KATHMANDU is nine letters, and every string in C ends with the null character, which needs a box of its own. So ten is the smallest safe size. Declaring char city[9] leaves no room for the terminator, so nothing marks the end of the string and printf carries on into whatever follows in memory. The rule is always: length plus one.",
      "ne": "KATHMANDU नौ अक्षरको हो, र C मा हरेक string null अक्षरले सकिन्छ जसलाई आफ्नै बाकस चाहिन्छ। त्यसैले सुरक्षित सबैभन्दा सानो आकार दस हो। char city[9] घोषणा गरे terminator का लागि ठाउँ रहँदैन, string को अन्त्य केहीले जनाउँदैन र printf मेमोरीमा पछि जे छ त्यतै बढ्छ। नियम सधैं यही हो: लम्बाइ जोड एक।"
    }
  },
  {
    "id": "g9.c.q45",
    "subject": "grade9/c-programming",
    "unit": "u5",
    "topic": "strlen-result",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "char s[20] = \"NEPAL\"; What does strlen(s) return?",
      "ne": "char s[20] = \"NEPAL\"; मा strlen(s) ले के फर्काउँछ?"
    },
    "options": [
      {
        "en": "20",
        "ne": "२०"
      },
      {
        "en": "5",
        "ne": "५"
      },
      {
        "en": "6",
        "ne": "६"
      },
      {
        "en": "19",
        "ne": "१९"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "strlen counts the characters up to the null terminator and does not count the null itself, so it returns 5. Three different numbers describe this one variable and all three are right: the length is 5, the characters stored are 6 including the null, and the array size is 20. Confusing the length with the size is the usual error, and sizeof(s) would give 20.",
      "ne": "strlen ले null terminator सम्मका अक्षर गन्छ र null आफैंलाई गन्दैन, त्यसैले ५ फर्काउँछ। यही एउटै variable लाई तीन फरक सङ्ख्याले वर्णन गर्छन् र तीनै ठिक छन्: लम्बाइ ५, null सहित भण्डारण भएका अक्षर ६, र array को आकार २०। लम्बाइ र आकार मिसाउनु सामान्य गल्ती हो, र sizeof(s) ले २० दिन्थ्यो।"
    }
  },
  {
    "id": "g9.c.q46",
    "subject": "grade9/c-programming",
    "unit": "u5",
    "topic": "strcmp-return",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What does strcmp(s1, s2) return when the two strings are identical?",
      "ne": "दुई string ठ्याक्कै उस्तै हुँदा strcmp(s1, s2) ले के फर्काउँछ?"
    },
    "options": [
      {
        "en": "1, meaning true",
        "ne": "१, अर्थात् सत्य"
      },
      {
        "en": "0",
        "ne": "०"
      },
      {
        "en": "The length of the strings",
        "ne": "String को लम्बाइ"
      },
      {
        "en": "It returns nothing",
        "ne": "यसले केही फर्काउँदैन"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "strcmp returns 0 when the strings match, a negative number when the first comes earlier alphabetically, and a positive number when it comes later. Zero meaning \"equal\" is the opposite of what most people expect, so the condition for \"the passwords are the same\" reads if (strcmp(a, b) == 0), which looks backwards and is correct. Writing if (strcmp(a, b)) tests for DIFFERENT, because any non-zero value is true in C.",
      "ne": "String मिल्दा strcmp ले ० फर्काउँछ, पहिलो वर्णक्रममा अघि भए ऋणात्मक, पछि भए धनात्मक। ० को अर्थ \"बराबर\" हुनु धेरैको अपेक्षाविपरीत छ, त्यसैले \"password मिल्यो\" भन्ने सर्त if (strcmp(a, b) == 0) हुन्छ — उल्टो देखिन्छ र ठिक छ। if (strcmp(a, b)) लेखे फरक छ कि भनेर जाँचिन्छ, किनभने C मा शून्य नभएको जुनसुकै मान सत्य हो।"
    }
  },
  {
    "id": "g9.c.q47",
    "subject": "grade9/c-programming",
    "unit": "u5",
    "topic": "string-comparison-operator",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Why can two strings not be compared with if (s1 == s2)?",
      "ne": "दुई string लाई if (s1 == s2) ले किन तुलना गर्न मिल्दैन?"
    },
    "options": [
      {
        "en": "Because == only works on numbers and the program will not compile",
        "ne": "किनभने == सङ्ख्यामा मात्र चल्छ र प्रोग्राम compile हुँदैन"
      },
      {
        "en": "Because s1 and s2 are addresses, so == compares where the two arrays are, not what they contain",
        "ne": "किनभने s1 र s2 ठेगाना हुन्, त्यसैले == ले दुई array कहाँ छन् तुलना गर्छ, भित्र के छ होइन"
      },
      {
        "en": "Because strings must always be compared letter by letter in a loop",
        "ne": "किनभने string सधैं loop मा अक्षर–अक्षर तुलना गर्नुपर्छ"
      },
      {
        "en": "It works perfectly well",
        "ne": "यो राम्ररी चल्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "An array name is the address of its first element, so s1 == s2 compares two addresses. Two separate arrays are always at different addresses, so the test is false even when both hold exactly the same word. It compiles and runs, which is what makes it dangerous. strcmp walks both strings character by character and is the only correct way — and it returns 0 for a match.",
      "ne": "Array को नाम पहिलो element को ठेगाना हो, त्यसैले s1 == s2 ले दुई ठेगाना तुलना गर्छ। छुट्टाछुट्टै दुई array सधैं फरक ठेगानामा हुन्छन्, त्यसैले दुवैमा ठ्याक्कै उही शब्द भए पनि जाँच असत्य हुन्छ। यो compile हुन्छ र चल्छ पनि — त्यसैले खतरनाक छ। strcmp ले दुवै string अक्षर–अक्षर हिँड्छ र सही तरिका त्यही हो — र मिल्दा ० फर्काउँछ।"
    }
  },
  {
    "id": "g9.c.q48",
    "subject": "grade9/c-programming",
    "unit": "u5",
    "topic": "scanf-string",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "char name[20]; Which scanf line is correct, and what happens if the user types \"Ram Bahadur\"?",
      "ne": "char name[20]; कुन scanf लाइन सही छ, र प्रयोगकर्ताले \"Ram Bahadur\" टाइप गरे के हुन्छ?"
    },
    "options": [
      {
        "en": "scanf(\"%s\", &name); and the whole name is read",
        "ne": "scanf(\"%s\", &name); र पूरै नाम पढिन्छ"
      },
      {
        "en": "scanf(\"%s\", name); and only \"Ram\" is read, because %s stops at the first space",
        "ne": "scanf(\"%s\", name); र \"Ram\" मात्र पढिन्छ, किनभने %s पहिलो खाली ठाउँमा रोकिन्छ"
      },
      {
        "en": "scanf(\"%c\", name); and the whole name is read",
        "ne": "scanf(\"%c\", name); र पूरै नाम पढिन्छ"
      },
      {
        "en": "scanf(\"%d\", &name); and the name is converted to a number",
        "ne": "scanf(\"%d\", &name); र नाम सङ्ख्यामा बदलिन्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "An array name is already an address, so %s takes no ampersand — this is the one scanf in the subject that does not need one. And %s stops reading at the first whitespace, so \"Ram Bahadur\" leaves \"Ram\" in name and \"Bahadur\" waiting in the input. Reading a whole line needs fgets, not scanf, and gets() is not an option because it was removed from the C standard.",
      "ne": "Array को नाम आफैं ठेगाना हो, त्यसैले %s लाई ampersand चाहिँदैन — विषयभरिमा ampersand नचाहिने scanf यही एक हो। अनि %s पहिलो खाली ठाउँमै पढ्न छाड्छ, त्यसैले \"Ram Bahadur\" मा name भित्र \"Ram\" रहन्छ र \"Bahadur\" input मै पर्खिरहन्छ। पूरै लाइन पढ्न scanf होइन fgets चाहिन्छ, र gets() विकल्प होइन किनभने त्यो C मानकबाट हटाइएको छ।"
    }
  },
  {
    "id": "g9.c.q49",
    "subject": "grade9/c-programming",
    "unit": "u5",
    "topic": "out-of-bounds",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A loop over int a[5] is written as for (i = 0; i <= 5; i++). What is the consequence?",
      "ne": "int a[5] मा loop लाई for (i = 0; i <= 5; i++) लेखियो। यसको परिणाम के हुन्छ?"
    },
    "options": [
      {
        "en": "The compiler reports an index error and refuses to build",
        "ne": "Compiler ले index त्रुटि देखाएर बनाउन मान्दैन"
      },
      {
        "en": "It compiles and the loop touches a[5], which is outside the array — giving a wrong result or a crash",
        "ne": "यो compile हुन्छ र loop ले array बाहिरको a[5] छुन्छ — गलत नतिजा वा crash आउँछ"
      },
      {
        "en": "The array automatically grows to six elements",
        "ne": "Array आफैं छ element को हुन्छ"
      },
      {
        "en": "The last element is simply read twice",
        "ne": "अन्तिम element दुई पटक पढिन्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The loop runs six times, with i taking 0 to 5, and a[5] is one box past the end of an array whose last valid index is 4. C does no bounds checking at compile time or at run time, so this builds cleanly. What is at that address is whatever came next in memory, so the program may print a strange number, may corrupt another variable, or may crash — possibly a different one of those on each run.",
      "ne": "Loop छ पटक चल्छ, i ले ० देखि ५ लिन्छ, र अन्तिम मान्य index ४ भएको array मा a[5] अन्त्यभन्दा एक बाकस पर हो। C ले compile गर्दा पनि, चल्दा पनि bound जाँच्दैन, त्यसैले यो सफा build हुन्छ। त्यो ठेगानामा मेमोरीमा पछि जे आयो त्यही हुन्छ, त्यसैले प्रोग्रामले अनौठो सङ्ख्या छाप्न सक्छ, अर्को variable बिगार्न सक्छ, वा crash हुन सक्छ — हरेक पटक फरक पनि हुन सक्छ।"
    }
  },
  {
    "id": "g9.c.q50",
    "subject": "grade9/c-programming",
    "unit": "u5",
    "topic": "array-sum-trace",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "int a[5] = {70, 85, 60, 90, 45}; int i, t = 0; for (i = 0; i < 5; i++) t = t + a[i];  What is t?",
      "ne": "int a[5] = {70, 85, 60, 90, 45}; int i, t = 0; for (i = 0; i < 5; i++) t = t + a[i];  t कति हुन्छ?"
    },
    "options": [
      {
        "en": "350",
        "ne": "३५०"
      },
      {
        "en": "280",
        "ne": "२८०"
      },
      {
        "en": "45",
        "ne": "४५"
      },
      {
        "en": "70",
        "ne": "७०"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "70 + 85 + 60 + 90 + 45 = 350. Two details make this work and both are examined. t is set to 0 before the loop, so the first addition has something known to add to; if t were left uninitialised the answer would be a different wrong number on every run. And the index runs 0 to 4, covering all five elements — option B is the total without the first element, which is what starting the loop at 1 would give.",
      "ne": "70 + 85 + 60 + 90 + 45 = 350। दुई कुराले यो चल्छ र दुवै सोधिन्छन्। Loop अघि t लाई ० राखिएको छ, त्यसैले पहिलो जोडसँग जोड्न थाहा भएको कुरा हुन्छ; t लाई मान नदिए हरेक पटक फरक गलत उत्तर आउँथ्यो। अनि index ० देखि ४ सम्म चल्छ र पाँचै element समेट्छ — विकल्प (ख) पहिलो element नगनेको जोड हो, जुन loop १ बाट सुरु गर्दा आउँथ्यो।"
    }
  },
  {
    "id": "g9.c.q51",
    "subject": "grade9/c-programming",
    "unit": "u5",
    "topic": "nonstandard-string-functions",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A program using strrev() compiles on DEV C++ at school and fails on a Linux machine with \"undefined reference\". Why?",
      "ne": "strrev() प्रयोग गरेको प्रोग्राम विद्यालयको DEV C++ मा compile हुन्छ र Linux मेसिनमा \"undefined reference\" भन्दै असफल हुन्छ। किन?"
    },
    "options": [
      {
        "en": "Because Linux cannot run C programs",
        "ne": "किनभने Linux ले C प्रोग्राम चलाउनै सक्दैन"
      },
      {
        "en": "Because strrev is not part of the standard C library — it is a Turbo C and Microsoft extension",
        "ne": "किनभने strrev मानक C library को भाग होइन — यो Turbo C र Microsoft को थप हो"
      },
      {
        "en": "Because string.h was not included",
        "ne": "किनभने string.h include गरिएको थिएन"
      },
      {
        "en": "Because strrev needs an array of at least 100 characters",
        "ne": "किनभने strrev लाई कम्तीमा १०० अक्षरको array चाहिन्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The syllabus names seven string functions and only four of them — strlen, strcpy, strcat and strcmp — are in the C standard. strrev, strlwr and strupr are compiler extensions, present in Turbo C and some Microsoft tools and absent from glibc, so the header declares nothing for them on Linux and the linker cannot find the code. They are examinable, so write them in an answer; but a program that must run anywhere should reverse a string with a loop instead.",
      "ne": "पाठ्यक्रमले सात string function नाम लिन्छ र तीमध्ये चार — strlen, strcpy, strcat र strcmp — मात्र C मानकमा छन्। strrev, strlwr र strupr compiler का थप हुन्, Turbo C र केही Microsoft साधनमा छन् र glibc मा छैनन् — त्यसैले Linux मा header ले तिनका लागि केही घोषणा गर्दैन र linker ले कोड भेट्दैन। यी सोधिन्छन्, त्यसैले उत्तरमा लेख्नुहोस्; तर जहाँ पनि चल्नुपर्ने प्रोग्रामले string loop ले नै उल्टाउनुपर्छ।"
    }
  },
  {
    "id": "g9.c.q52",
    "subject": "grade9/c-programming",
    "unit": "u6",
    "topic": "structure-definition",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What is a structure in C?",
      "ne": "C मा structure भनेको के हो?"
    },
    "options": [
      {
        "en": "A collection of elements of the same data type in continuous memory",
        "ne": "लगातार मेमोरीमा एउटै data type का element को समूह"
      },
      {
        "en": "A user-defined data type that groups variables of DIFFERENT data types under one name",
        "ne": "फरक data type का variable लाई एउटै नाममुनि राख्ने प्रयोगकर्ता-परिभाषित data type"
      },
      {
        "en": "A function that returns more than one value",
        "ne": "एकभन्दा बढी मान फर्काउने function"
      },
      {
        "en": "Another name for an array of characters",
        "ne": "Character array कै अर्को नाम"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Option A describes an array, which holds many values of ONE type. A structure is the opposite shape: several values of DIFFERENT types about one thing — a student with a name, a roll number and a percentage. Each variable inside it is called a member and each member has its own memory, which is what separates a structure from a union.",
      "ne": "विकल्प (क) ले array को वर्णन गर्छ, जसले एउटै प्रकारका धेरै मान राख्छ। Structure उल्टो आकारको हो: एउटै कुराबारे फरक प्रकारका धेरै मान — नाम, roll नम्बर र प्रतिशत भएको विद्यार्थी। भित्रका हरेक variable लाई member भनिन्छ र हरेकको आफ्नै मेमोरी हुन्छ — structure लाई union बाट छुट्याउने कुरा त्यही हो।"
    }
  },
  {
    "id": "g9.c.q53",
    "subject": "grade9/c-programming",
    "unit": "u6",
    "topic": "union-size",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "union Box { int n; char c; }; On a machine where int is 4 bytes and char is 1, what is sizeof(union Box)?",
      "ne": "union Box { int n; char c; }; int ४ byte र char १ byte भएको मेसिनमा sizeof(union Box) कति हुन्छ?"
    },
    "options": [
      {
        "en": "5 bytes — the total of the members",
        "ne": "५ byte — member को जोड"
      },
      {
        "en": "4 bytes — the size of the largest member",
        "ne": "४ byte — सबैभन्दा ठूलो member को आकार"
      },
      {
        "en": "1 byte — the size of the smallest member",
        "ne": "१ byte — सबैभन्दा सानो member को आकार"
      },
      {
        "en": "8 bytes — unions always use 8",
        "ne": "८ byte — union ले सधैं ८ लिन्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A union gives every member the same block of memory, so the block only has to be big enough for the largest member — 4 bytes here. A structure with the same two members would need space for both, so its size would be 5 plus any padding the compiler adds. Size is the clearest single difference between the two and it is the standard way the comparison question is marked.",
      "ne": "Union ले हरेक member लाई उही मेमोरी block दिन्छ, त्यसैले block सबैभन्दा ठूलो member अट्ने मात्र हुनुपर्छ — यहाँ ४ byte। उही दुई member भएको structure लाई दुवैका लागि ठाउँ चाहिन्थ्यो, त्यसैले आकार ५ र compiler ले थप्ने padding हुन्थ्यो। दुईबीचको सबैभन्दा स्पष्ट फरक आकार नै हो र तुलनात्मक प्रश्नको अंक पनि प्रायः यसैमा दिइन्छ।"
    }
  },
  {
    "id": "g9.c.q54",
    "subject": "grade9/c-programming",
    "unit": "u6",
    "topic": "union-overwrite",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "union Box b; b.n = 65; then b.c = 88; then printf(\"%d\", b.n);  What is printed?",
      "ne": "union Box b; b.n = 65; अनि b.c = 88; अनि printf(\"%d\", b.n);  के छापिन्छ?"
    },
    "options": [
      {
        "en": "65 — n was never written to again",
        "ne": "६५ — n मा फेरि लेखिएकै थिएन"
      },
      {
        "en": "88 — the two members share one block, so writing c overwrote n",
        "ne": "८८ — दुवै member ले एउटै block बाँड्छन्, त्यसैले c लेख्दा n मेटियो"
      },
      {
        "en": "153 — the two values are added",
        "ne": "१५३ — दुई मान जोडिन्छन्"
      },
      {
        "en": "0 — the union is cleared after each write",
        "ne": "० — हरेक पटक लेखेपछि union खाली हुन्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "There is only one block of memory and both members read it. Writing 88 into b.c put 88 into the first byte of the shared block, so reading b.n afterwards reads the changed bytes and gives 88. A line that named only c has changed what n reads — and that is a union's whole behaviour. In a STRUCTURE both members would keep their own values and the answer would be 65.",
      "ne": "मेमोरीको एउटै block छ र दुवै member ले त्यही पढ्छन्। b.c मा ८८ लेख्दा साझा block को पहिलो byte मा ८८ पुग्यो, त्यसैले पछि b.n पढ्दा बदलिएका byte पढिन्छन् र ८८ आउँछ। c को मात्र नाम लिने लाइनले n ले पढ्ने कुरा बदल्यो — union को पूरै व्यवहार त्यही हो। STRUCTURE मा दुवै member ले आफ्नो मान राख्थे र उत्तर ६५ हुन्थ्यो।"
    }
  },
  {
    "id": "g9.c.q55",
    "subject": "grade9/c-programming",
    "unit": "u6",
    "topic": "dot-operator",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "struct Student s1; How is the roll member of s1 accessed?",
      "ne": "struct Student s1; मा s1 को roll member मा कसरी पुगिन्छ?"
    },
    "options": [
      {
        "en": "Student.roll",
        "ne": "Student.roll"
      },
      {
        "en": "s1.roll",
        "ne": "s1.roll"
      },
      {
        "en": "roll.s1",
        "ne": "roll.s1"
      },
      {
        "en": "s1->roll",
        "ne": "s1->roll"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The dot operator joins a structure VARIABLE to one of its members, so it is s1.roll. Student is the type, and a type reserves no memory, so Student.roll names nothing that exists. The arrow -> is used when you hold a POINTER to a structure rather than the structure itself, which is Grade 10 work; for a plain variable the dot is the operator.",
      "ne": "Dot operator ले structure को VARIABLE लाई यसको member सँग जोड्छ, त्यसैले s1.roll हुन्छ। Student प्रकार हो, र प्रकारले मेमोरी छुट्याउँदैन — त्यसैले Student.roll ले अस्तित्वमा भएको केही जनाउँदैन। Arrow -> त्यतिबेला चलाइन्छ जब structure आफैं होइन, त्यसको POINTER हुन्छ — त्यो कक्षा १० को कुरा हो; सामान्य variable का लागि dot नै operator हो।"
    }
  },
  {
    "id": "g9.c.q56",
    "subject": "grade9/c-programming",
    "unit": "u6",
    "topic": "struct-semicolon",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Where is a semicolon required that students often leave out?",
      "ne": "विद्यार्थीले प्रायः छुटाउने semicolon कहाँ चाहिन्छ?"
    },
    "options": [
      {
        "en": "After the closing brace of a function definition",
        "ne": "Function definition को बन्द brace पछि"
      },
      {
        "en": "After the closing brace of a structure declaration",
        "ne": "Structure घोषणाको बन्द brace पछि"
      },
      {
        "en": "After #include <stdio.h>",
        "ne": "#include <stdio.h> पछि"
      },
      {
        "en": "After int main()",
        "ne": "int main() पछि"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A structure declaration is a statement, so it ends with a semicolon after the closing brace: struct Student { ... }; A function definition is not a statement and takes no semicolon there; #include is a preprocessor directive and takes none; and a semicolon after int main() would make an empty function and then leave the braces as a stray block. Leaving out the structure semicolon produces an error message pointing at the NEXT line, which is why it is hard to find.",
      "ne": "Structure को घोषणा statement हो, त्यसैले बन्द brace पछि semicolon ले सकिन्छ: struct Student { ... }; Function definition statement होइन र त्यहाँ semicolon लिँदैन; #include preprocessor directive हो र लिँदैन; अनि int main() पछि semicolon राखे खाली function बन्थ्यो र brace छुट्टै block बन्थ्यो। Structure को semicolon छुटाउँदा त्रुटि सन्देशले पछिल्लो लाइन देखाउँछ — त्यसैले भेट्न गाह्रो हुन्छ।"
    }
  },
  {
    "id": "g9.c.q57",
    "subject": "grade9/c-programming",
    "unit": "u6",
    "topic": "struct-keyword",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "After struct Student { ... }; which line correctly declares a variable in C?",
      "ne": "struct Student { ... }; पछि C मा variable घोषणा गर्ने सही लाइन कुन हो?"
    },
    "options": [
      {
        "en": "Student s1;",
        "ne": "Student s1;"
      },
      {
        "en": "struct Student s1;",
        "ne": "struct Student s1;"
      },
      {
        "en": "new Student s1;",
        "ne": "new Student s1;"
      },
      {
        "en": "Student s1 = new Student();",
        "ne": "Student s1 = new Student();"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "In C the keyword struct is part of the type name, so the declaration is struct Student s1;. Writing Student s1; alone does not compile unless a typedef has given the type a shorter name. The other two options are C++ and Java syntax: C has no new operator, and a structure variable is created by declaring it, exactly like an int.",
      "ne": "C मा struct keyword प्रकारकै नामको भाग हो, त्यसैले घोषणा struct Student s1; हुन्छ। typedef ले छोटो नाम नदिएसम्म Student s1; मात्रले compile हुँदैन। अरू दुई विकल्प C++ र Java का syntax हुन्: C मा new operator छैन, र structure को variable int जस्तै घोषणा गरेरै बन्छ।"
    }
  },
  {
    "id": "g9.c.q58",
    "subject": "grade9/c-programming",
    "unit": "u6",
    "topic": "choosing-union",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A sensor reading is sometimes a whole count and sometimes a decimal measurement, never both at once, and the device has very little memory. Which should be used, and why?",
      "ne": "Sensor को रिडिङ कहिले पूर्ण गन्ती र कहिले दशमलव नाप हुन्छ, एकैचोटि कहिल्यै दुवै हुँदैन, र यन्त्रमा मेमोरी निकै थोरै छ। कुन चलाउने र किन?"
    },
    "options": [
      {
        "en": "A structure, because it is safer and keeps both values",
        "ne": "Structure, किनभने यो सुरक्षित छ र दुवै मान राख्छ"
      },
      {
        "en": "A union, because only one member is ever in use, so sharing one block wastes nothing and saves the rest",
        "ne": "Union, किनभने एक पटकमा एउटै member प्रयोगमा हुन्छ — एउटै block बाँड्दा केही खेर जाँदैन र बाँकी बच्छ"
      },
      {
        "en": "An array, because readings are a list",
        "ne": "Array, किनभने रिडिङ सूची हो"
      },
      {
        "en": "Either one — the choice makes no difference",
        "ne": "जुनसुकै — छनोटले फरक पार्दैन"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The two conditions in the question are exactly the two a union needs: only one member is in use at any moment, and memory is scarce. Sharing one block then costs nothing, because the unused member had no value worth keeping. A structure would be safe but would reserve space for both members, which is the memory the device does not have. Saving memory is the only reason a union exists, and it is the reason to give in an answer.",
      "ne": "प्रश्नका दुई सर्त union लाई चाहिने ठ्याक्कै दुई सर्त हुन्: कुनै पनि क्षणमा एउटै member प्रयोगमा हुनु, र मेमोरी थोरै हुनु। तब एउटै block बाँड्दा केही लागत छैन, किनभने प्रयोगमा नभएको member सँग राख्नुपर्ने मान नै थिएन। Structure सुरक्षित त हुन्थ्यो तर दुवै member का लागि ठाउँ छुट्याउँथ्यो — र त्यही मेमोरी यन्त्रसँग छैन। Union हुनुको एकमात्र कारण मेमोरी बचत हो, र उत्तरमा दिनुपर्ने कारण पनि त्यही।"
    }
  },
  {
    "id": "g9.c.q59",
    "subject": "grade9/c-programming",
    "unit": "u7",
    "topic": "pointer-definition",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What does a pointer variable store?",
      "ne": "Pointer variable ले के राख्छ?"
    },
    "options": [
      {
        "en": "A copy of another variable's value",
        "ne": "अर्को variable को मानको प्रतिलिपि"
      },
      {
        "en": "The memory address of another variable",
        "ne": "अर्को variable को मेमोरी ठेगाना"
      },
      {
        "en": "The name of another variable",
        "ne": "अर्को variable को नाम"
      },
      {
        "en": "The data type of another variable",
        "ne": "अर्को variable को data type"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A pointer is an ordinary variable in every respect — it has a type, a name and an address of its own — and what it holds is a location rather than a quantity. int *p; p = &n; leaves p holding where n lives, not what n contains. *p is how you reach the value from there, and the two must not be confused: p is an address and *p is the number at it.",
      "ne": "Pointer हरेक हिसाबले सामान्य variable नै हो — यसको प्रकार, नाम र आफ्नै ठेगाना हुन्छ — र यसले राख्ने कुरा परिमाण नभई स्थान हो। int *p; p = &n; पछि p सँग n कहाँ बस्छ भन्ने हुन्छ, n मा के छ भन्ने होइन। त्यहाँबाट मानसम्म पुग्ने तरिका *p हो, र यी दुई मिसाउनु हुँदैन: p ठेगाना हो र *p त्यहाँको सङ्ख्या।"
    }
  },
  {
    "id": "g9.c.q60",
    "subject": "grade9/c-programming",
    "unit": "u7",
    "topic": "address-vs-dereference",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which statement about & and * is correct?",
      "ne": "& र * बारे कुन कथन सही छ?"
    },
    "options": [
      {
        "en": "& gives the value at an address; * gives the address of a variable",
        "ne": "& ले ठेगानाको मान दिन्छ; * ले variable को ठेगाना दिन्छ"
      },
      {
        "en": "& gives the address of a variable; * gives the value at an address",
        "ne": "& ले variable को ठेगाना दिन्छ; * ले ठेगानाको मान दिन्छ"
      },
      {
        "en": "Both do the same thing",
        "ne": "दुवैले उही काम गर्छन्"
      },
      {
        "en": "& works on pointers only and * works on integers only",
        "ne": "& pointer मा मात्र र * integer मा मात्र चल्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "& is the address-of operator: written before a variable, it gives where that variable lives. * is the value-at, or dereference, operator: written before a pointer, it gives what is stored at the address the pointer holds. They work in opposite directions and undo each other, so *(&n) is simply n. Option A is the two definitions swapped, which is the usual way this is got wrong.",
      "ne": "& address-of operator हो: variable अगाडि लेख्दा त्यो variable कहाँ बस्छ भन्ने दिन्छ। * value-at वा dereference operator हो: pointer अगाडि लेख्दा pointer ले बोकेको ठेगानामा भएको कुरा दिन्छ। यी उल्टा दिशामा चल्छन् र एकअर्कालाई उल्ट्याउँछन्, त्यसैले *(&n) भनेको n नै हो। विकल्प (क) मा दुई परिभाषा साटिएका छन्, र यो प्रायः त्यसरी नै बिग्रन्छ।"
    }
  },
  {
    "id": "g9.c.q61",
    "subject": "grade9/c-programming",
    "unit": "u7",
    "topic": "write-through-pointer",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "int n = 7; int *p = &n; *p = *p + 3; printf(\"%d\", n);  What is printed?",
      "ne": "int n = 7; int *p = &n; *p = *p + 3; printf(\"%d\", n);  के छापिन्छ?"
    },
    "options": [
      {
        "en": "7, because n was never assigned to",
        "ne": "७, किनभने n मा कहिल्यै मान राखिएन"
      },
      {
        "en": "10",
        "ne": "१०"
      },
      {
        "en": "3",
        "ne": "३"
      },
      {
        "en": "An address, because p was involved",
        "ne": "ठेगाना, किनभने p संलग्न थियो"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Read *p = *p + 3 as \"the value at p becomes the value at p plus three\". The value at p is n, so this line is n = n + 3 written another way, and n becomes 10. A variable can be changed by a line that never names it, provided something holds its address — which is not a trick but exactly what scanf(\"%d\", &n) has been doing since Unit 2. Printing p rather than n would show an address; one star is the whole difference.",
      "ne": "*p = *p + 3 लाई \"p को ठेगानाको मान बराबर p को ठेगानाको मान जोड तीन\" भनेर पढ्नुहोस्। P को ठेगानाको मान n हो, त्यसैले यो लाइन n = n + 3 कै अर्को लेखाइ हो र n १० हुन्छ। कसैसँग ठेगाना छ भने नाम नै नलिने लाइनले variable बदल्न सक्छ — यो जादू होइन, युनिट २ देखि scanf(\"%d\", &n) ले गरिरहेकै काम हो। n होइन p छापेको भए ठेगाना देखिन्थ्यो; पूरै फरक एउटा star को हो।"
    }
  },
  {
    "id": "g9.c.q62",
    "subject": "grade9/c-programming",
    "unit": "u7",
    "topic": "pointer-declaration",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which line correctly declares p as a pointer to an integer and points it at n?",
      "ne": "कुन लाइनले p लाई integer को pointer घोषणा गरेर n तिर तेर्स्याउँछ?"
    },
    "options": [
      {
        "en": "int p; p = n;",
        "ne": "int p; p = n;"
      },
      {
        "en": "int *p; p = &n;",
        "ne": "int *p; p = &n;"
      },
      {
        "en": "int *p; p = n;",
        "ne": "int *p; p = n;"
      },
      {
        "en": "int p; *p = &n;",
        "ne": "int p; *p = &n;"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "int *p; declares p as a pointer to an int — the star there is part of the type, not a dereference. p = &n; then stores n's address in it. Option C declares the pointer correctly and then puts a VALUE where an address belongs. Option A declares an ordinary int, and option D declares an ordinary int and then dereferences it, which is not something the compiler will accept.",
      "ne": "int *p; ले p लाई int को pointer घोषणा गर्छ — त्यहाँको star प्रकारको भाग हो, dereference होइन। अनि p = &n; ले यसमा n को ठेगाना राख्छ। विकल्प (ग) ले pointer त ठिकै घोषणा गर्छ तर ठेगाना चाहिने ठाउँमा मान राख्छ। विकल्प (क) ले सामान्य int घोषणा गर्छ, र (घ) ले सामान्य int घोषणा गरेर त्यसलाई dereference गर्छ, जुन compiler ले स्वीकार गर्दैन।"
    }
  },
  {
    "id": "g9.c.q63",
    "subject": "grade9/c-programming",
    "unit": "u7",
    "topic": "pointer-advantage",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which of these is a genuine advantage of pointers that you have already used in this subject?",
      "ne": "यीमध्ये कुन pointer को साँचो फाइदा हो, जुन तपाईंले यसै विषयमा चलाइसक्नुभएको छ?"
    },
    "options": [
      {
        "en": "They make a program compile faster",
        "ne": "यिनले प्रोग्राम छिटो compile गराउँछन्"
      },
      {
        "en": "They let a function change the caller's variables — call by reference, and the & in every scanf",
        "ne": "यिनले function लाई बोलाउनेका variable बदल्न दिन्छन् — call by reference, र हरेक scanf को &"
      },
      {
        "en": "They remove the need for data types",
        "ne": "यिनले data type को आवश्यकता हटाउँछन्"
      },
      {
        "en": "They check array bounds automatically",
        "ne": "यिनले array को bound आफैं जाँच्छन्"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Call by reference is the advantage this subject has already relied on twice: the ampersand in every scanf since Unit 2, and the swap function in Unit 4. The other advantages are passing an array without copying it, allocating memory while the program runs, and building data structures such as linked lists. Option D is the opposite of the truth — C checks no bounds at all, which is part of the same bargain that makes pointers powerful.",
      "ne": "Call by reference यस विषयले पहिल्यै दुई पटक भर परेको फाइदा हो: युनिट २ देखि हरेक scanf को ampersand, र युनिट ४ को swap function। अरू फाइदा हुन् — प्रतिलिपि नबनाई array पठाउनु, प्रोग्राम चल्दै गर्दा मेमोरी छुट्याउनु, र linked list जस्ता data structure बनाउनु। विकल्प (घ) सत्यको ठिक उल्टो हो — C ले bound जाँच्दै जाँच्दैन, र pointer लाई शक्तिशाली बनाउने सम्झौताकै भाग त्यो हो।"
    }
  }
]);

QuizService.registerBank("grade9/computer-fundamentals", [
  {
    "id": "g9.cf.q01",
    "subject": "grade9/computer-fundamentals",
    "unit": "u1",
    "topic": "computer-definition",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which feature separates a computer from a simple electronic calculator?",
      "ne": "कम्प्युटरलाई साधारण इलेक्ट्रोनिक क्यालकुलेटरबाट छुट्याउने विशेषता कुन हो?"
    },
    "options": [
      {
        "en": "It runs on electricity",
        "ne": "यो बिजुलीले चल्छ"
      },
      {
        "en": "It holds a set of stored instructions and follows them on its own",
        "ne": "यसले निर्देशनको सेट भण्डारण गरेर आफैं पछ्याउँछ"
      },
      {
        "en": "It can add and subtract numbers",
        "ne": "यसले संख्या जोड्न र घटाउन सक्छ"
      },
      {
        "en": "It has a screen",
        "ne": "यसमा पर्दा हुन्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A calculator is electronic, has a screen and does arithmetic, so none of those separates the two. What it cannot do is hold the whole list of steps — the program — and carry it out without a person pressing each key. That is why \"stored instructions\" is in the definition.",
      "ne": "क्यालकुलेटर पनि इलेक्ट्रोनिक छ, पर्दा छ र गणना गर्छ — त्यसैले ती कुनैले दुईलाई छुट्याउँदैनन्। उसले नसक्ने कुरा हो चरणहरूको पूरै सूची — प्रोग्राम — राखेर हरेक बटन मान्छेले नथिचिकनै चलाउनु। परिभाषामा \"भण्डारण गरिएका निर्देशन\" त्यसैले छ।"
    }
  },
  {
    "id": "g9.cf.q02",
    "subject": "grade9/computer-fundamentals",
    "unit": "u1",
    "topic": "data-vs-information",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A school enters the marks 72, 65 and 88, and the computer reports \"class average 75\". Which is the DATA and which is the INFORMATION?",
      "ne": "विद्यालयले ७२, ६५ र ८८ अंक भर्छ, र कम्प्युटरले \"कक्षाको औसत ७५\" भन्छ। DATA कुन हो र INFORMATION कुन?"
    },
    "options": [
      {
        "en": "72, 65, 88 are data; \"class average 75\" is information",
        "ne": "७२, ६५, ८८ data हुन्; \"कक्षाको औसत ७५\" information हो"
      },
      {
        "en": "72, 65, 88 are information; \"class average 75\" is data",
        "ne": "७२, ६५, ८८ information हुन्; \"कक्षाको औसत ७५\" data हो"
      },
      {
        "en": "Both are data",
        "ne": "दुवै data हुन्"
      },
      {
        "en": "Both are information",
        "ne": "दुवै information हुन्"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Data is the raw figures that mean little on their own. Information is what comes out after processing, in a form a person can use. The direction is always the same: data goes in, information comes out, and the processing in between is the computer's job.",
      "ne": "Data भनेको आफैंमा थोरै अर्थ राख्ने कच्चा अंक हो। Information भनेको प्रशोधनपछि निस्कने, मान्छेले काम लगाउन सक्ने रूप हो। दिशा सधैं उही: data भित्र, information बाहिर, र बीचको प्रशोधन कम्प्युटरको काम।"
    }
  },
  {
    "id": "g9.cf.q03",
    "subject": "grade9/computer-fundamentals",
    "unit": "u1",
    "topic": "gigo",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A clerk types a salary as 50000 instead of 5000. The computer calculates the totals perfectly and the payroll is wrong. What does this show?",
      "ne": "कर्मचारीले तलब ५००० का साटो ५०००० टाइप गर्छ। कम्प्युटरले जोड ठ्याक्कै सही निकाल्छ र तलब विवरण गलत हुन्छ। यसले के देखाउँछ?"
    },
    "options": [
      {
        "en": "The computer is not accurate",
        "ne": "कम्प्युटर शुद्ध छैन"
      },
      {
        "en": "The computer is not reliable",
        "ne": "कम्प्युटर भरपर्दो छैन"
      },
      {
        "en": "GIGO — the machine processed wrong data correctly",
        "ne": "GIGO — मेसिनले गलत data लाई सही रूपमा प्रशोधन गर्‍यो"
      },
      {
        "en": "The computer lacks diligence",
        "ne": "कम्प्युटरमा लगनशीलता छैन"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "Accuracy means the machine does not make arithmetic mistakes, and here it did not — it averaged exactly what it was given. Garbage In, Garbage Out: correctness of the answer depends on the data you supply. Writing \"the computer is not accurate\" is the usual way marks are lost on this question.",
      "ne": "शुद्धताको अर्थ मेसिनले गणनामा गल्ती गर्दैन भन्ने हो, र यहाँ गरेन — दिइएकै कुराको ठ्याक्कै औसत निकाल्यो। Garbage In, Garbage Out: उत्तर सही हुनु तपाईंले दिएको data मा भर पर्छ। \"कम्प्युटर शुद्ध छैन\" लेख्नु नै यस प्रश्नमा अंक गुमाउने सामान्य तरिका हो।"
    }
  },
  {
    "id": "g9.cf.q04",
    "subject": "grade9/computer-fundamentals",
    "unit": "u1",
    "topic": "classification-data-handling",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A petrol pump measures the fuel flowing out and prints a bill showing the exact amount in digits. Which type of computer is it, by data handling?",
      "ne": "पेट्रोल पम्पले बगेको इन्धन नाप्छ र ठ्याक्कै परिमाण अङ्कमा देखाउने बिल छाप्छ। डाटा ह्यान्डलिङका आधारमा यो कुन किसिमको कम्प्युटर हो?"
    },
    "options": [
      {
        "en": "Analog",
        "ne": "Analog"
      },
      {
        "en": "Digital",
        "ne": "Digital"
      },
      {
        "en": "Hybrid",
        "ne": "Hybrid"
      },
      {
        "en": "Special purpose",
        "ne": "Special purpose"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "It measures a continuously changing quantity, which is analog, and then works in counted digits, which is digital. A machine doing both is hybrid. \"Special purpose\" is true of the pump but answers a different basis of classification — the question names data handling.",
      "ne": "यसले निरन्तर बदलिने परिमाण नाप्छ — त्यो analog — अनि गनिने अङ्कमा काम गर्छ — त्यो digital। दुवै गर्ने मेसिन hybrid हो। \"Special purpose\" पम्पका लागि सही भए पनि वर्गीकरणको अर्कै आधारको उत्तर हो; प्रश्नले डाटा ह्यान्डलिङ भनेको छ।"
    }
  },
  {
    "id": "g9.cf.q05",
    "subject": "grade9/computer-fundamentals",
    "unit": "u1",
    "topic": "classification-bases",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "On how many different bases are computers classified in this unit, and what does \"by size\" ask?",
      "ne": "यस युनिटमा कम्प्युटरको वर्गीकरण कति फरक आधारमा हुन्छ, र \"आकार अनुसार\" ले के सोध्छ?"
    },
    "options": [
      {
        "en": "Five — how much work the machine can do at once",
        "ne": "पाँच — मेसिनले एकैपटक कति काम गर्न सक्छ"
      },
      {
        "en": "Three — the physical height and weight of the machine",
        "ne": "तीन — मेसिनको भौतिक उचाइ र तौल"
      },
      {
        "en": "Five — the physical height and weight of the machine",
        "ne": "पाँच — मेसिनको भौतिक उचाइ र तौल"
      },
      {
        "en": "Four — how much the machine costs",
        "ne": "चार — मेसिनको मूल्य कति"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Five bases: size, data handling, purpose, model and brand. \"By size\" is about capacity — how much work the machine handles at once — which is why a supercomputer is in that class even though a mainframe may take up more room. Physical shape is the MODEL basis, not size.",
      "ne": "पाँच आधार: आकार, डाटा ह्यान्डलिङ, प्रयोजन, मोडेल र ब्रान्ड। \"आकार अनुसार\" भनेको क्षमता हो — मेसिनले एकैपटक कति काम थाम्छ — त्यसैले ठाउँ बढी ओगट्ने mainframe भए पनि supercomputer त्यही वर्गमा पर्छ। भौतिक आकार भनेको MODEL को आधार हो, size को होइन।"
    }
  },
  {
    "id": "g9.cf.q06",
    "subject": "grade9/computer-fundamentals",
    "unit": "u1",
    "topic": "classification-purpose",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "The computer inside a washing machine runs one fixed job and cannot be loaded with new programs. By purpose, it is:",
      "ne": "वासिङ मेसिनभित्रको कम्प्युटरले एउटै निश्चित काम गर्छ र त्यसमा नयाँ प्रोग्राम हाल्न मिल्दैन। प्रयोजनका आधारमा यो हो:"
    },
    "options": [
      {
        "en": "General purpose",
        "ne": "General purpose"
      },
      {
        "en": "Special purpose",
        "ne": "Special purpose"
      },
      {
        "en": "Hybrid",
        "ne": "Hybrid"
      },
      {
        "en": "Mainframe",
        "ne": "Mainframe"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Built for one job and not reprogrammable is the definition of special purpose. It is also a microcomputer and a digital computer — every machine has an answer on all five bases at once, and the question tells you which basis it is asking about.",
      "ne": "एउटै कामका लागि बनेको र नयाँ प्रोग्राम हाल्न नमिल्ने — special purpose को परिभाषा यही हो। यो microcomputer र digital कम्प्युटर पनि हो; हरेक मेसिनसँग पाँचै आधारको उत्तर एकैचोटि हुन्छ, र प्रश्नले कुन आधार सोधेको हो भन्छ।"
    }
  },
  {
    "id": "g9.cf.q07",
    "subject": "grade9/computer-fundamentals",
    "unit": "u1",
    "topic": "characteristics",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which characteristic of a computer means it does the ten-thousandth calculation as carefully as the first?",
      "ne": "कम्प्युटरको कुन विशेषताले उसले दश हजारौं गणना पनि पहिलोजत्तिकै ध्यान दिएर गर्छ भन्ने जनाउँछ?"
    },
    "options": [
      {
        "en": "Speed",
        "ne": "गति"
      },
      {
        "en": "Versatility",
        "ne": "बहुउपयोगिता"
      },
      {
        "en": "Diligence",
        "ne": "लगनशीलता"
      },
      {
        "en": "Storage",
        "ne": "भण्डारण"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "Diligence is the absence of boredom and tiredness: a computer does not lose concentration over a long run of repeated work, which a person would. Speed is about how fast, not how consistently.",
      "ne": "लगनशीलता भनेको दिक्क नलाग्नु र नथाक्नु हो: लामो दोहोरिने कामले कम्प्युटरको ध्यान भंग हुँदैन, जुन मान्छेको हुन्छ। गति भनेको कति छिटो भन्ने हो, कति एकनासले भन्ने होइन।"
    }
  },
  {
    "id": "g9.cf.q08",
    "subject": "grade9/computer-fundamentals",
    "unit": "u1",
    "topic": "ipo-cycle",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "In the block diagram of a computer, which unit holds both the data and the program for later use?",
      "ne": "कम्प्युटरको ब्लक चित्रमा, data र प्रोग्राम दुवैलाई पछि प्रयोगका लागि राख्ने एकाइ कुन हो?"
    },
    "options": [
      {
        "en": "Input unit",
        "ne": "Input एकाइ"
      },
      {
        "en": "Output unit",
        "ne": "Output एकाइ"
      },
      {
        "en": "Storage",
        "ne": "Storage"
      },
      {
        "en": "The screen",
        "ne": "पर्दा"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "Input brings data in and output sends information out; neither keeps anything. Storage is the fourth stage of the definition, and it holds the stored program as well as the data — which is the feature that makes the machine a computer rather than a calculator.",
      "ne": "Input ले data भित्र ल्याउँछ, output ले information बाहिर पठाउँछ; दुवैले केही राख्दैनन्। Storage परिभाषाको चौथो चरण हो, र यसले data सँगै भण्डारण गरिएको प्रोग्राम पनि राख्छ — यही विशेषताले मेसिनलाई क्यालकुलेटर होइन कम्प्युटर बनाउँछ।"
    }
  },
  {
    "id": "g9.cf.q09",
    "subject": "grade9/computer-fundamentals",
    "unit": "u1",
    "topic": "modern-applications",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A hospital in Kathmandu keeps patient records, test results and billing on computers. Which application area of the computer is this?",
      "ne": "काठमाडौंको एउटा अस्पतालले बिरामीको रेकर्ड, जाँचको नतिजा र बिलिङ कम्प्युटरमा राख्छ। यो कम्प्युटरको कुन प्रयोग क्षेत्र हो?"
    },
    "options": [
      {
        "en": "Education",
        "ne": "शिक्षा"
      },
      {
        "en": "Health / medicine",
        "ne": "स्वास्थ्य / चिकित्सा"
      },
      {
        "en": "Entertainment",
        "ne": "मनोरञ्जन"
      },
      {
        "en": "Communication",
        "ne": "सञ्चार"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Record keeping, test results and billing inside a hospital are all the health application area. The exam usually gives you a setting and asks for the field, or gives the field and asks for two uses — so learn each area with one Nepali example you could defend.",
      "ne": "अस्पतालभित्रको रेकर्ड राख्ने काम, जाँचको नतिजा र बिलिङ — सबै स्वास्थ्य प्रयोग क्षेत्रका हुन्। परीक्षाले प्रायः ठाउँ दिएर क्षेत्र सोध्छ, वा क्षेत्र दिएर दुई प्रयोग सोध्छ — त्यसैले हरेक क्षेत्रसँग एउटा नेपाली उदाहरण सम्झनुहोस्।"
    }
  },
  {
    "id": "g9.cf.q10",
    "subject": "grade9/computer-fundamentals",
    "unit": "u1",
    "topic": "characteristics",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "One computer prints report cards all morning, then is used for typing a letter and watching a video. Which TWO characteristics does this best show?",
      "ne": "एउटै कम्प्युटरले बिहानभरि रिजल्ट छाप्छ, अनि चिठी टाइप गर्न र भिडियो हेर्न प्रयोग हुन्छ। यसले सबैभन्दा राम्रोसँग कुन दुई विशेषता देखाउँछ?"
    },
    "options": [
      {
        "en": "Accuracy and storage",
        "ne": "शुद्धता र भण्डारण"
      },
      {
        "en": "Diligence and versatility",
        "ne": "लगनशीलता र बहुउपयोगिता"
      },
      {
        "en": "Speed and accuracy",
        "ne": "गति र शुद्धता"
      },
      {
        "en": "Automation and accuracy",
        "ne": "स्वचालन र शुद्धता"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Working all morning without tiring or losing care is diligence. Doing three unlike jobs on one machine is versatility. Speed and accuracy are true of the machine too, but nothing in this situation demonstrates them — the question asks which the situation SHOWS, not which the computer has.",
      "ne": "बिहानभरि नथाकी, ध्यान नघटाई काम गर्नु लगनशीलता हो। एउटै मेसिनमा तीन फरक काम गर्नु बहुउपयोगिता। गति र शुद्धता पनि मेसिनमा छन्, तर यो परिस्थितिले ती देखाउँदैन — प्रश्नले परिस्थितिले के देखाउँछ भनेको छ, कम्प्युटरसँग के छ भनेको होइन।"
    }
  },
  {
    "id": "g9.cf.q11",
    "subject": "grade9/computer-fundamentals",
    "unit": "u1",
    "topic": "gigo",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A result sheet shows a student with 950 out of 500. The clerk typed 95 as 950. A friend says \"the computer made a mistake, so computers are not accurate.\" What is the correct reply?",
      "ne": "नतिजामा एक विद्यार्थीको ५०० मध्ये ९५० देखियो। क्लर्कले ९५ लाई ९५० टाइप गरेछन्। साथी भन्छ \"कम्प्युटरले गल्ती गर्‍यो, त्यसैले कम्प्युटर शुद्ध हुँदैन।\" ठिक जवाफ कुन?"
    },
    "options": [
      {
        "en": "The friend is right — a wrong output proves the computer is not accurate",
        "ne": "साथी ठिक छ — गलत आउटपुटले कम्प्युटर शुद्ध छैन भन्ने प्रमाणित गर्छ"
      },
      {
        "en": "The computer processed the data it was given exactly; the data was wrong, which is GIGO, and accuracy is untouched",
        "ne": "कम्प्युटरले दिइएकै data ठ्याक्कै प्रशोधन गर्‍यो; data नै गलत थियो — यो GIGO हो, र शुद्धतामा कुनै असर पर्दैन"
      },
      {
        "en": "The computer should have noticed that 950 is more than 500 and refused it",
        "ne": "कम्प्युटरले ९५० ५०० भन्दा बढी हो भनी चाल पाएर अस्वीकार गर्नुपर्थ्यो"
      },
      {
        "en": "This is a storage failure, not an accuracy question",
        "ne": "यो भण्डारणको असफलता हो, शुद्धताको प्रश्न होइन"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Accuracy is a claim about PROCESSING, not about the data. Given 950, the machine handled 950 correctly — which is exactly what accuracy means, and exactly why a wrong output does not disprove it. Option 3 is the tempting one: a program COULD be written to reject a mark above the full marks, but that is a check someone chose to add, not something a computer does because it is a computer. The characteristic being tested here is accuracy, and the principle is Garbage In, Garbage Out.",
      "ne": "शुद्धता भनेको प्रशोधन बारेको दाबी हो, data बारेको होइन। ९५० दिइएपछि मेसिनले ९५० लाई ठिकसँग चलायो — शुद्धताको अर्थ यही हो, र गलत आउटपुटले यसलाई गलत साबित नगर्ने कारण पनि यही। तेस्रो विकल्प लोभ्याउने छ: पूर्णाङ्कभन्दा बढी अंक अस्वीकार गर्ने प्रोग्राम लेख्न सकिन्छ, तर त्यो कसैले थपेको जाँच हो, कम्प्युटर भएकै कारण हुने कुरा होइन। यहाँ जाँचिएको विशेषता शुद्धता हो, र सिद्धान्त Garbage In, Garbage Out।"
    }
  },
  {
    "id": "g9.cf.q12",
    "subject": "grade9/computer-fundamentals",
    "unit": "u1",
    "topic": "classification-bases",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "An ECG machine in a clinic measures the smoothly changing electrical signal of a heartbeat and prints a numbered report. A question asks: \"classify it on the basis of working principle.\" Which answer is correct, and why is the other tempting one wrong?",
      "ne": "क्लिनिकको ECG मेसिनले मुटुको बिस्तारै बदलिने विद्युतीय सङ्केत नाप्छ र संख्या भएको रिपोर्ट छाप्छ। प्रश्न: \"working principle को आधारमा वर्गीकरण गर्नुहोस्।\" ठिक उत्तर कुन, र अर्को लोभ्याउने उत्तर किन गलत?"
    },
    "options": [
      {
        "en": "Microcomputer — because one person uses it at a time",
        "ne": "Microcomputer — किनभने एकपटक एक जनाले चलाउँछ"
      },
      {
        "en": "Hybrid — it measures an analog signal and gives digital output",
        "ne": "Hybrid — यसले analog सङ्केत नाप्छ र digital आउटपुट दिन्छ"
      },
      {
        "en": "Special purpose — because it is built for one job",
        "ne": "Special purpose — किनभने एउटै कामका लागि बनेको"
      },
      {
        "en": "Digital — because the report is printed in numbers",
        "ne": "Digital — किनभने रिपोर्ट संख्यामा छापिन्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "\"Working principle\" is the data-handling basis, so the answer must be analog, digital or hybrid — which rules out microcomputer (size) and special purpose (purpose) however true they are of the machine. Between the two that remain, digital is the trap: the machine does produce digital output, but it also MEASURES a smoothly changing signal, and doing both is the definition of hybrid. The general lesson is to read which basis the question names before looking at the machine at all.",
      "ne": "\"Working principle\" भनेको डाटा ह्यान्डलिङको आधार हो, त्यसैले उत्तर analog, digital वा hybrid मध्ये हुनैपर्छ — यसले microcomputer (आकार) र special purpose (प्रयोजन) लाई हटाइदिन्छ, ती मेसिनका लागि जति नै सत्य भए पनि। बाँकी दुईमध्ये digital पासो हो: मेसिनले digital आउटपुट त दिन्छ, तर बिस्तारै बदलिने सङ्केत नाप्छ पनि, र दुवै गर्नु नै hybrid को परिभाषा हो। पाठ यो हो — मेसिन हेर्नुअघि प्रश्नले कुन आधार तोकेको छ पढ्नुहोस्।"
    }
  },
  {
    "id": "g9.cf.q13",
    "subject": "grade9/computer-fundamentals",
    "unit": "u2",
    "topic": "system-units",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which unit of a computer system performs all the comparisons?",
      "ne": "कम्प्युटर प्रणालीको कुन एकाइले सबै तुलना गर्छ?"
    },
    "options": [
      {
        "en": "The control unit",
        "ne": "Control unit"
      },
      {
        "en": "The ALU",
        "ne": "ALU"
      },
      {
        "en": "The memory unit",
        "ne": "Memory unit"
      },
      {
        "en": "The input unit",
        "ne": "Input unit"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The ALU is the Arithmetic and LOGIC Unit, and comparison is a logical operation. The control unit decides what happens next and in what order, but it does not do the comparing itself. This pair is asked almost every year.",
      "ne": "ALU भनेको Arithmetic and LOGIC Unit हो, र तुलना तार्किक काम हो। Control unit ले अब के हुने र कुन क्रममा हुने तय गर्छ, तर तुलना आफैं गर्दैन। यो जोडी झन्डै हरेक वर्ष सोधिन्छ।"
    }
  },
  {
    "id": "g9.cf.q14",
    "subject": "grade9/computer-fundamentals",
    "unit": "u2",
    "topic": "input-readers",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "An entrance examination uses answer sheets on which candidates shade boxes with a pencil. Which device reads them?",
      "ne": "प्रवेश परीक्षामा विद्यार्थीले पेन्सिलले बाकस कालो पार्ने उत्तरपुस्तिका प्रयोग हुन्छ। ती कसले पढ्छ?"
    },
    "options": [
      {
        "en": "OCR",
        "ne": "OCR"
      },
      {
        "en": "OMR",
        "ne": "OMR"
      },
      {
        "en": "MICR",
        "ne": "MICR"
      },
      {
        "en": "Bar code reader",
        "ne": "Bar code reader"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "OMR is the Optical MARK Reader. It only needs to detect which box is filled — the position of the mark carries the meaning, so no letter has to be recognised. OCR would be the answer if the machine had to read what was written inside the boxes.",
      "ne": "OMR भनेको Optical MARK Reader हो। कुन बाकस भरिएको छ भेट्टाए पुग्छ — अर्थ चिन्हको ठाउँले बोक्छ, अक्षर चिन्नु पर्दैन। बाकसभित्र लेखिएको पढ्नुपर्ने भए OCR उत्तर हुन्थ्यो।"
    }
  },
  {
    "id": "g9.cf.q15",
    "subject": "grade9/computer-fundamentals",
    "unit": "u2",
    "topic": "input-readers",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Why do banks print cheque numbers in magnetic ink rather than ordinary ink?",
      "ne": "बैंकहरूले चेकको नम्बर साधारण मसीको साटो चुम्बकीय मसीमा किन छाप्छन्?"
    },
    "options": [
      {
        "en": "Magnetic ink is cheaper to produce",
        "ne": "चुम्बकीय मसी सस्तो पर्छ"
      },
      {
        "en": "A photocopy of the cheque cannot be read by the machine, so forgery is harder",
        "ne": "चेकको फोटोकपी मेसिनले पढ्न सक्दैन, त्यसैले नक्कल गर्न गाह्रो हुन्छ"
      },
      {
        "en": "Magnetic ink can be read in the dark",
        "ne": "चुम्बकीय मसी अँध्यारोमा पढ्न सकिन्छ"
      },
      {
        "en": "It allows the cheque to be scanned in colour",
        "ne": "चेक रङ्गीन स्क्यान गर्न मिल्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "MICR senses magnetism, not shape. A photocopy reproduces the appearance of the characters perfectly and none of the magnetism, so the reader rejects it. Security is the reason the technology survives even though it is old and expensive.",
      "ne": "MICR ले आकार होइन, चुम्बकत्व पहिचान गर्छ। फोटोकपीले अक्षरको रूप पूरै उतार्छ तर चुम्बकत्व पटक्कै उतार्दैन, त्यसैले reader ले अस्वीकार गर्छ। पुरानो र महँगो भए पनि यो प्रविधि टिकिरहनुको कारण सुरक्षा नै हो।"
    }
  },
  {
    "id": "g9.cf.q16",
    "subject": "grade9/computer-fundamentals",
    "unit": "u2",
    "topic": "input-readers",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A school scans a page of a printed book and wants to correct a spelling mistake in the text afterwards. A scanner alone is not enough. What else is needed, and why?",
      "ne": "विद्यालयले छापिएको पुस्तकको पाना स्क्यान गर्छ र पछि पाठको हिज्जे सच्याउन चाहन्छ। Scanner मात्रले पुग्दैन। अरू के चाहिन्छ, र किन?"
    },
    "options": [
      {
        "en": "A bar code reader, because the page has a code on it",
        "ne": "Bar code reader, किनभने पानामा कोड हुन्छ"
      },
      {
        "en": "OCR, because the scanner produces a picture and OCR turns the letter shapes in it into editable text",
        "ne": "OCR, किनभने scanner ले तस्बिर बनाउँछ र OCR ले त्यसभित्रका अक्षरको आकारलाई सम्पादनयोग्य पाठ बनाउँछ"
      },
      {
        "en": "A printer, because the text must be printed before it can be edited",
        "ne": "Printer, किनभने सम्पादन गर्नुअघि पाठ छाप्नुपर्छ"
      },
      {
        "en": "Nothing else — a scanner already produces editable text",
        "ne": "अरू केही चाहिँदैन — scanner ले नै सम्पादनयोग्य पाठ दिन्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A scanner captures an image of the page. To a computer that image is just coloured dots — you cannot place a cursor in it. OCR examines the shapes in the image, recognises them as characters, and produces text that can be edited. Scanner and OCR are often sold together, which is why students think they are one thing.",
      "ne": "Scanner ले पानाको तस्बिर खिच्छ। कम्प्युटरका लागि त्यो तस्बिर रङका थोप्ला मात्र हो — त्यसमा कर्सर राख्नै मिल्दैन। OCR ले तस्बिरभित्रका आकार केलाएर अक्षर चिन्छ र सम्पादन गर्न मिल्ने पाठ बनाउँछ। Scanner र OCR प्रायः सँगै बेचिने भएकाले विद्यार्थीले एउटै ठान्छन्।"
    }
  },
  {
    "id": "g9.cf.q17",
    "subject": "grade9/computer-fundamentals",
    "unit": "u2",
    "topic": "output-classification",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which of these is a hardcopy output device?",
      "ne": "यीमध्ये कुन hardcopy output device हो?"
    },
    "options": [
      {
        "en": "Monitor",
        "ne": "Monitor"
      },
      {
        "en": "Speaker",
        "ne": "Speaker"
      },
      {
        "en": "Graphic plotter",
        "ne": "Graphic plotter"
      },
      {
        "en": "Projector",
        "ne": "Projector"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "A plotter draws on paper, and paper output you can carry away is hardcopy. Monitor, speaker and projector all produce output that exists only while the device is running, which is softcopy. The plotter is the one students most often put on the wrong side.",
      "ne": "Plotter ले कागजमा कोर्छ, र बोकेर लैजान मिल्ने कागजको आउटपुट hardcopy हो। Monitor, speaker र projector को आउटपुट उपकरण चलेसम्म मात्र रहन्छ — त्यो softcopy। गलत पक्षमा सबैभन्दा धेरै राखिने यही plotter हो।"
    }
  },
  {
    "id": "g9.cf.q18",
    "subject": "grade9/computer-fundamentals",
    "unit": "u2",
    "topic": "output-printers",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A shop must print a bill in three copies in a single pass — customer, shop and tax file. Which printer, and what makes it possible?",
      "ne": "पसलले एकै पटकमा तीन प्रति बिल छाप्नुपर्छ — ग्राहक, पसल र कर फाइल। कुन प्रिन्टर, र यो सम्भव बनाउने कुरा के हो?"
    },
    "options": [
      {
        "en": "Laser printer — it is the fastest",
        "ne": "Laser printer — सबैभन्दा छिटो"
      },
      {
        "en": "Inkjet printer — the ink soaks through the paper",
        "ne": "Inkjet printer — मसी कागज छिचोल्छ"
      },
      {
        "en": "Dot-matrix printer — the print head strikes the paper, and the pressure carries through to the sheets below",
        "ne": "Dot-matrix printer — head ले कागजमा ठोक्छ, र त्यो दबाब तलका पानासम्म पुग्छ"
      },
      {
        "en": "3D printer — it can build several objects at once",
        "ne": "3D printer — एकैपटक धेरै वस्तु बनाउन सक्छ"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "This is the one job where the old noisy technology is the right answer. An IMPACT printer physically strikes the paper, and that pressure presses through carbon sheets underneath. Laser and inkjet are non-impact — nothing touches the page, so sheets two and three stay blank no matter how fast the printer is.",
      "ne": "हल्ला गर्ने पुरानो प्रविधि नै ठिक उत्तर हुने काम यही हो। IMPACT प्रिन्टरले कागजमा भौतिक रूपमै ठोक्छ, र त्यो दबाब तलका कार्बन पानासम्म पुग्छ। Laser र inkjet non-impact हुन् — कागज छुँदै छुँदैनन्, त्यसैले प्रिन्टर जतिसुकै छिटो भए पनि दोस्रो र तेस्रो पाना खाली रहन्छ।"
    }
  },
  {
    "id": "g9.cf.q19",
    "subject": "grade9/computer-fundamentals",
    "unit": "u2",
    "topic": "memory-unit",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "How many bytes are there in one kilobyte?",
      "ne": "एक kilobyte मा कति byte हुन्छन्?"
    },
    "options": [
      {
        "en": "1000",
        "ne": "१०००"
      },
      {
        "en": "1024",
        "ne": "१०२४"
      },
      {
        "en": "512",
        "ne": "५१२"
      },
      {
        "en": "8",
        "ne": "८"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "1 KB = 1024 bytes, because memory addresses are binary and 1024 is 2 to the power 10 — the nearest round number in a system that counts in twos. Writing 1000 is the single most common slip in this unit, and the marker is checking whether you know why it is not 1000.",
      "ne": "1 KB = 1024 byte, किनभने मेमोरीका ठेगाना binary मा हुन्छन् र १०२४ भनेको २ को घात १० हो — दुईमा गन्ने प्रणालीको नजिकको पूरा संख्या। यस युनिटमा सबैभन्दा धेरै हुने गल्ती १००० लेख्नु हो, र परीक्षकले १००० किन होइन भन्ने थाहा छ कि छैन जाँचिरहेका हुन्छन्।"
    }
  },
  {
    "id": "g9.cf.q20",
    "subject": "grade9/computer-fundamentals",
    "unit": "u2",
    "topic": "microprocessor",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Processor A runs at 2 GHz with a 64-bit word length. Processor B runs at 4 GHz with an 8-bit word length. Both must add eight bytes of data. Which needs fewer clock cycles, and why?",
      "ne": "प्रोसेसर A: 2 GHz, word length 64-bit। प्रोसेसर B: 4 GHz, word length 8-bit। दुवैले आठ byte data जोड्नुपर्छ। कसलाई कम clock cycle चाहिन्छ, र किन?"
    },
    "options": [
      {
        "en": "B, because its clock speed is twice as high",
        "ne": "B, किनभने यसको clock speed दोब्बर छ"
      },
      {
        "en": "A, because 64 bits is 8 bytes, so all eight arrive in one cycle while B needs eight",
        "ne": "A, किनभने ६४ bit = ८ byte, त्यसैले आठै byte एक चक्रमा पुग्छन् भने B लाई आठ चक्र चाहिन्छ"
      },
      {
        "en": "Both need the same number of cycles",
        "ne": "दुवैलाई उत्तिकै चक्र चाहिन्छ"
      },
      {
        "en": "It cannot be worked out without knowing the cache size",
        "ne": "Cache को आकार नजानी भन्न सकिँदैन"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Word length is how much data moves per cycle; clock speed is how many cycles per second. A 64-bit word is 8 bytes, so A finishes in one cycle. B handles one byte per cycle and needs eight. B does more cycles per second, but it needs eight times as many of them — which is exactly why both numbers are quoted and neither alone tells you how fast a processor is.",
      "ne": "Word length भनेको प्रति चक्र कति data सर्छ; clock speed भनेको प्रति सेकेन्ड कति चक्र। ६४-bit word = ८ byte, त्यसैले A एक चक्रमै सक्छ। B ले प्रति चक्र एक byte चलाउँछ, आठ चक्र चाहिन्छ। B ले सेकेन्डमा बढी चक्र चलाउँछ तर उसलाई आठ गुणा बढी चक्र चाहिन्छ — दुवै संख्या किन भनिन्छ र एक्लैले गति नबताउने कारण यही हो।"
    }
  },
  {
    "id": "g9.cf.q21",
    "subject": "grade9/computer-fundamentals",
    "unit": "u3",
    "topic": "software-types",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Antivirus software is best classified as:",
      "ne": "Antivirus सफ्टवेयरलाई कुन वर्गमा राख्नु सबैभन्दा ठिक हुन्छ?"
    },
    "options": [
      {
        "en": "Application software, because the user starts it",
        "ne": "Application software, किनभने प्रयोगकर्ताले खोल्छ"
      },
      {
        "en": "Utility software, because it maintains the computer rather than doing the user’s own task",
        "ne": "Utility software, किनभने यसले प्रयोगकर्ताको आफ्नो काम होइन, कम्प्युटरकै हेरचाह गर्छ"
      },
      {
        "en": "An operating system, because it controls the whole machine",
        "ne": "Operating system, किनभने पूरै मेसिन नियन्त्रण गर्छ"
      },
      {
        "en": "A device driver, because it works with the disk",
        "ne": "Device driver, किनभने डिस्कसँग काम गर्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The test is who the software serves. Nobody sits down to scan for viruses as a goal in itself — it is maintenance on the machine, which makes it a utility. You do start it like an application, and that is exactly why this question is asked.",
      "ne": "जाँच यही हो — सफ्टवेयरले कसको सेवा गर्छ। भाइरस खोज्नु आफैंमा कसैको उद्देश्य होइन — यो मेसिनकै मर्मत हो, त्यसैले utility। खोल्ने चाहिँ application जस्तै हो, र प्रश्न सोधिनुको कारण पनि त्यही हो।"
    }
  },
  {
    "id": "g9.cf.q22",
    "subject": "grade9/computer-fundamentals",
    "unit": "u3",
    "topic": "software-types",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A C compiler translates a student’s program into machine code. Which type of software is it?",
      "ne": "C compiler ले विद्यार्थीको प्रोग्राम machine code मा अनुवाद गर्छ। यो कुन किसिमको सफ्टवेयर हो?"
    },
    "options": [
      {
        "en": "Application software",
        "ne": "Application software"
      },
      {
        "en": "System software",
        "ne": "System software"
      },
      {
        "en": "Utility software",
        "ne": "Utility software"
      },
      {
        "en": "Firmware",
        "ne": "Firmware"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Language translators — compiler, interpreter and assembler — are system software. They serve the MACHINE: without the machine code a compiler produces, the processor cannot run the program at all. Being started by a programmer does not change who the software is working for.",
      "ne": "भाषा अनुवादक — compiler, interpreter, assembler — system software हुन्। यिनले मेसिनकै सेवा गर्छन्: compiler ले बनाउने machine code विना प्रोसेसरले प्रोग्राम चलाउनै सक्दैन। प्रोग्रामरले खोल्छ भन्दैमा सफ्टवेयर कसका लागि काम गर्दै छ भन्ने बदलिँदैन।"
    }
  },
  {
    "id": "g9.cf.q23",
    "subject": "grade9/computer-fundamentals",
    "unit": "u3",
    "topic": "os-definition",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which statement best defines an operating system?",
      "ne": "Operating system को सबैभन्दा राम्रो परिभाषा कुन हो?"
    },
    "options": [
      {
        "en": "Windows, Linux and macOS",
        "ne": "Windows, Linux र macOS"
      },
      {
        "en": "System software that controls the hardware, manages the computer’s resources and provides an interface between the user and the machine",
        "ne": "हार्डवेयर नियन्त्रण गर्ने, कम्प्युटरका स्रोत व्यवस्थापन गर्ने र प्रयोगकर्ता तथा मेसिनबीच इन्टरफेस दिने system software"
      },
      {
        "en": "A program that lets the user type documents",
        "ne": "प्रयोगकर्तालाई कागजात टाइप गर्न दिने प्रोग्राम"
      },
      {
        "en": "The physical parts that make the computer start",
        "ne": "कम्प्युटर सुरु गराउने भौतिक भाग"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Option A names three examples, and examples are not a definition — that is the mistake the question is testing. The definition has three parts worth stating: controls hardware, manages resources, provides an interface.",
      "ne": "विकल्प (क) ले तीन उदाहरण दिन्छ, र उदाहरण परिभाषा होइन — प्रश्नले जाँच्न खोजेको गल्ती त्यही हो। परिभाषाका तीन भाग छन्: हार्डवेयर नियन्त्रण, स्रोत व्यवस्थापन, इन्टरफेस।"
    }
  },
  {
    "id": "g9.cf.q24",
    "subject": "grade9/computer-fundamentals",
    "unit": "u3",
    "topic": "os-functions",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "On a computer with one processor, a student types a document while music plays. Which operating system function makes both appear to run at once?",
      "ne": "एउटै प्रोसेसर भएको कम्प्युटरमा विद्यार्थीले गीत बजाउँदै कागजात टाइप गर्छ। दुवै एकैचोटि चलेजस्तो कुन OS कार्यले बनाउँछ?"
    },
    "options": [
      {
        "en": "File management",
        "ne": "File management"
      },
      {
        "en": "Process management",
        "ne": "Process management"
      },
      {
        "en": "Device management",
        "ne": "Device management"
      },
      {
        "en": "Security",
        "ne": "Security"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "One processor runs one instruction at a time. Process management gives each program a slice of processor time and switches between them fast enough that both look continuous. The word for the effect is multitasking, and it is a scheduling job. Memory management is also running, but it is what keeps the two programs apart, not what makes them look simultaneous.",
      "ne": "एउटा प्रोसेसरले एकैपटक एउटै निर्देशन चलाउँछ। Process management ले हरेक प्रोग्रामलाई प्रोसेसरको समयको टुक्रा दिन्छ र यति छिटो फेरिदिन्छ कि दुवै निरन्तर देखिन्छन्। यसको नाम multitasking हो। Memory management पनि चलिरहेको हुन्छ, तर त्यसले दुई प्रोग्रामलाई छुट्याएर राख्छ, एकैचोटि चलेजस्तो बनाउँदैन।"
    }
  },
  {
    "id": "g9.cf.q25",
    "subject": "grade9/computer-fundamentals",
    "unit": "u3",
    "topic": "os-types",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "The computer in a hospital patient monitor must respond to a change in heartbeat within a guaranteed time, every time. Which type of operating system does it need?",
      "ne": "अस्पतालको बिरामी मोनिटरको कम्प्युटरले मुटुको धड्कनमा आएको परिवर्तनलाई हरेक पटक तोकिएकै समयभित्र जवाफ दिनुपर्छ। यसलाई कुन किसिमको OS चाहिन्छ?"
    },
    "options": [
      {
        "en": "Batch operating system",
        "ne": "Batch operating system"
      },
      {
        "en": "Multi-user operating system",
        "ne": "Multi-user operating system"
      },
      {
        "en": "Real-time operating system",
        "ne": "Real-time operating system"
      },
      {
        "en": "Single-user, single-tasking operating system",
        "ne": "Single-user, single-tasking operating system"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "A guaranteed deadline, every time, is the definition of real-time. In this kind of system being late is the same as being wrong — a correct reading delivered two seconds afterwards has not helped the patient. Batch is the opposite: jobs are collected and run when convenient, with nobody waiting.",
      "ne": "हरेक पटक तोकिएकै समयसीमा — यही real-time को परिभाषा हो। यस्तो प्रणालीमा ढिलो हुनु र गलत हुनु उस्तै हो; दुई सेकेन्डपछि आएको सही नतिजाले बिरामीलाई केही गरेन। Batch ठिक उल्टो हो: काम जम्मा गरेर सुविधाअनुसार चलाइन्छ, कोही पर्खेर बस्दैन।"
    }
  },
  {
    "id": "g9.cf.q26",
    "subject": "grade9/computer-fundamentals",
    "unit": "u3",
    "topic": "user-interface",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A school must rename 300 photographs, all in the same way. Why is a command-line interface the better choice here?",
      "ne": "विद्यालयले ३०० फोटोको नाम उही तरिकाले फेर्नुपर्छ। यहाँ command-line interface किन उपयुक्त हुन्छ?"
    },
    "options": [
      {
        "en": "Because a CUI looks more professional",
        "ne": "किनभने CUI बढी व्यावसायिक देखिन्छ"
      },
      {
        "en": "Because one command describes the whole pattern and runs once, while a GUI needs roughly four actions per file",
        "ne": "किनभने एउटै आदेशले पूरै बान्की बताउँछ र एक पटक चल्छ, GUI मा प्रति फाइल करिब चार कार्य चाहिन्छ"
      },
      {
        "en": "Because a GUI cannot rename files at all",
        "ne": "किनभने GUI ले फाइलको नाम फेर्नै सक्दैन"
      },
      {
        "en": "Because a CUI uses more memory and is therefore faster",
        "ne": "किनभने CUI ले बढी मेमोरी खान्छ र त्यसैले छिटो हुन्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Repetitive and identical work is exactly what a command describes well: about 1200 actions in a GUI against one command that can also be saved and reused next year. Note that a GUI wins for renaming ONE file — you can see it and nothing has to be remembered. Neither interface is simply better; they suit different work, which is why both still exist.",
      "ne": "दोहोरिने र उस्तै काम आदेशले राम्ररी बताउँछ: GUI मा करिब १२०० कार्य, CUI मा एउटै आदेश — जुन सुरक्षित गरेर अर्को वर्ष फेरि चलाउन पनि मिल्छ। एउटै फाइलको नाम फेर्न भने GUI जित्छ: देखिन्छ र केही सम्झनै पर्दैन। कुनै एउटा राम्रो होइन; फरक काममा फरक सुहाउँछ, त्यसैले दुवै अझै छन्।"
    }
  },
  {
    "id": "g9.cf.q27",
    "subject": "grade9/computer-fundamentals",
    "unit": "u3",
    "topic": "user-interface",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which is an advantage of a GUI over a CUI?",
      "ne": "CUI भन्दा GUI को फाइदा कुन हो?"
    },
    "options": [
      {
        "en": "It uses less memory",
        "ne": "यसले कम मेमोरी खान्छ"
      },
      {
        "en": "Commands can be saved in a file and repeated",
        "ne": "आदेश फाइलमा राखेर दोहोर्‍याउन मिल्छ"
      },
      {
        "en": "The user does not have to memorise commands, because the options are visible on screen",
        "ne": "प्रयोगकर्ताले आदेश सम्झनु पर्दैन, किनभने विकल्प पर्दामै देखिन्छन्"
      },
      {
        "en": "It works faster on very old computers",
        "ne": "धेरै पुराना कम्प्युटरमा छिटो चल्छ"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "Visibility is the GUI’s real advantage — everything available is on the screen, so nothing has to be recalled. The other three options are all advantages of the CUI, which is the half of this comparison students usually leave out.",
      "ne": "देखिनु नै GUI को साँचो फाइदा हो — उपलब्ध सबै पर्दामै हुन्छ, सम्झनै पर्दैन। बाँकी तीनै विकल्प CUI का फाइदा हुन्, र यही आधा भाग विद्यार्थीले प्रायः छुटाउँछन्।"
    }
  },
  {
    "id": "g9.cf.q28",
    "subject": "grade9/computer-fundamentals",
    "unit": "u3",
    "topic": "open-source",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What does it mean to say software is open source?",
      "ne": "सफ्टवेयर open source हो भन्नुको अर्थ के हो?"
    },
    "options": [
      {
        "en": "It is free of charge",
        "ne": "यो निःशुल्क हुन्छ"
      },
      {
        "en": "Its source code is published, so anyone may read, modify and redistribute it",
        "ne": "यसको source code सार्वजनिक हुन्छ, जोसुकैले पढ्न, बदल्न र पुनर्वितरण गर्न सक्छ"
      },
      {
        "en": "It can be downloaded from the Internet",
        "ne": "इन्टरनेटबाट डाउनलोड गर्न मिल्छ"
      },
      {
        "en": "It runs on any operating system",
        "ne": "जुनसुकै OS मा चल्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Open refers to the SOURCE CODE, not the price. Open source software is usually free of charge, but that is a consequence rather than the definition — it may legally be sold. What may not be done is withhold the code from the people who receive it.",
      "ne": "खुला भनेको source code हो, मूल्य होइन। Open source प्रायः निःशुल्क हुन्छ, तर त्यो परिभाषा होइन परिणाम हो — कानुनी रूपमा बेच्न पाइन्छ। नपाइने कुरा चाहिँ पाउनेबाट code लुकाउनु हो।"
    }
  },
  {
    "id": "g9.cf.q29",
    "subject": "grade9/computer-fundamentals",
    "unit": "u3",
    "topic": "open-source",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which of these is NOT open source software?",
      "ne": "यीमध्ये कुन open source सफ्टवेयर होइन?"
    },
    "options": [
      {
        "en": "Linux",
        "ne": "Linux"
      },
      {
        "en": "LibreOffice",
        "ne": "LibreOffice"
      },
      {
        "en": "Microsoft Office",
        "ne": "Microsoft Office"
      },
      {
        "en": "Firefox",
        "ne": "Firefox"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "Microsoft Office is proprietary: its source code is not published, whether or not you have paid for it. Linux, LibreOffice and Firefox all publish their code. A school choosing the open-source alternatives is not paying a licence fee per computer, and is not breaking the law to avoid one.",
      "ne": "Microsoft Office proprietary हो: पैसा तिरे पनि नतिरे पनि यसको source code सार्वजनिक हुँदैन। Linux, LibreOffice र Firefox ले code सार्वजनिक गर्छन्। Open source छान्ने विद्यालयले प्रति कम्प्युटर लाइसेन्स शुल्क तिर्नु पर्दैन, र त्यो बचाउन कानुन मिच्नु पनि पर्दैन।"
    }
  },
  {
    "id": "g9.cf.q30",
    "subject": "grade9/computer-fundamentals",
    "unit": "u3",
    "topic": "software-layers",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Why can a word processor not write directly to the hard disk itself?",
      "ne": "Word processor ले आफैं सिधै hard disk मा किन लेख्न सक्दैन?"
    },
    "options": [
      {
        "en": "Because the hard disk is too slow for application software",
        "ne": "किनभने hard disk application software का लागि धेरै ढिलो छ"
      },
      {
        "en": "Because the operating system is the layer that talks to the hardware, and applications ask it to do so on their behalf",
        "ne": "किनभने हार्डवेयरसँग बोल्ने तह OS हो, र application ले त्यही मार्फत अनुरोध गर्छ"
      },
      {
        "en": "Because only utility software may touch a disk",
        "ne": "किनभने डिस्क छुन utility software लाई मात्र पाइन्छ"
      },
      {
        "en": "It can — applications read and write disks directly",
        "ne": "सक्छ — application ले सिधै डिस्कमा पढ्छ र लेख्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The software stack runs user to application to operating system to hardware, and each layer talks only to the one below it. The operating system is the only software permitted to reach the hardware, which is what \"the OS provides an interface\" actually means. It also means one program cannot damage another’s files by accident.",
      "ne": "सफ्टवेयरको तह प्रयोगकर्ता → application → OS → हार्डवेयर क्रममा चल्छ, र हरेक तहले तलको एउटासँग मात्र कुरा गर्छ। हार्डवेयरसम्म पुग्न पाउने एक मात्र सफ्टवेयर OS हो — \"OS ले इन्टरफेस दिन्छ\" भन्नुको साँचो अर्थ यही हो। यसैले एउटा प्रोग्रामले अर्काको फाइल संयोगले बिगार्न पनि सक्दैन।"
    }
  },
  {
    "id": "g9.cf.q31",
    "subject": "grade9/computer-fundamentals",
    "unit": "u4",
    "topic": "volatility",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A student is typing an essay when the power fails before saving. The essay is lost but last year’s photographs are not. Why?",
      "ne": "विद्यार्थीले निबन्ध टाइप गर्दागर्दै सेभ नगरी बत्ती गयो। निबन्ध हरायो, तर गत वर्षका फोटा हराएनन्। किन?"
    },
    "options": [
      {
        "en": "The essay was too new to be stored properly",
        "ne": "निबन्ध नयाँ भएकाले राम्ररी राखिएको थिएन"
      },
      {
        "en": "The essay was in RAM, which is volatile, while the photographs were in secondary storage, which is not",
        "ne": "निबन्ध volatile RAM मा थियो, फोटा चाहिँ non-volatile secondary storage मा"
      },
      {
        "en": "Photographs are smaller files and so are safer",
        "ne": "फोटो साना फाइल भएकाले सुरक्षित हुन्छन्"
      },
      {
        "en": "The hard disk has its own battery",
        "ne": "Hard disk को आफ्नै ब्याट्री हुन्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "RAM stores each bit as an electrical charge that must be refreshed, so cutting the power empties it — volatile. A hard disk stores each bit as a direction of magnetism and an SSD as a trapped charge; neither needs power to stay put. \"Save\" is precisely the act of copying from the volatile place to the non-volatile one.",
      "ne": "RAM ले हरेक bit लाई ताजा पार्नुपर्ने विद्युतीय चार्जका रूपमा राख्छ, त्यसैले बत्ती गए रित्तिन्छ — volatile। Hard disk ले चुम्बकत्वको दिशाका रूपमा र SSD ले थुनिएको चार्जका रूपमा राख्छ; दुवैलाई रहन बिजुली चाहिँदैन। \"Save\" भनेकै volatile ठाउँबाट non-volatile ठाउँमा सार्ने काम हो।"
    }
  },
  {
    "id": "g9.cf.q32",
    "subject": "grade9/computer-fundamentals",
    "unit": "u4",
    "topic": "cache",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Why is cache memory used in a computer?",
      "ne": "कम्प्युटरमा cache memory किन प्रयोग गरिन्छ?"
    },
    "options": [
      {
        "en": "To store files permanently when the power is off",
        "ne": "बत्ती नहुँदा फाइल स्थायी रूपमा राख्न"
      },
      {
        "en": "Because the CPU is far faster than RAM, so a small fast memory holding recently used data reduces waiting",
        "ne": "किनभने CPU, RAM भन्दा धेरै छिटो छ — भर्खर चलाएको data राख्ने सानो छिटो मेमोरीले पर्खाइ घटाउँछ"
      },
      {
        "en": "To increase the total storage capacity of the computer",
        "ne": "कम्प्युटरको कुल भण्डारण क्षमता बढाउन"
      },
      {
        "en": "To hold the instructions that run when the computer starts",
        "ne": "कम्प्युटर सुरु हुँदा चल्ने निर्देशन राख्न"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Cache exists because of a speed mismatch: a CPU can execute an instruction in well under a nanosecond while fetching from RAM takes tens of nanoseconds. Without cache the processor would spend most of its time waiting. Option D describes ROM, not cache.",
      "ne": "Cache हुनुको कारण गतिको बेमेल हो: CPU ले एक निर्देशन नानोसेकेन्डभन्दा कममा सक्छ, तर RAM बाट ल्याउन दसौं नानोसेकेन्ड लाग्छ। Cache नभए प्रोसेसरको धेरैजसो समय पर्खाइमै जान्थ्यो। विकल्प (घ) ले ROM को वर्णन गर्छ, cache को होइन।"
    }
  },
  {
    "id": "g9.cf.q33",
    "subject": "grade9/computer-fundamentals",
    "unit": "u4",
    "topic": "ram-types",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What is the essential difference between SRAM and DRAM?",
      "ne": "SRAM र DRAM बीचको मूल फरक के हो?"
    },
    "options": [
      {
        "en": "SRAM is volatile and DRAM is not",
        "ne": "SRAM volatile छ, DRAM छैन"
      },
      {
        "en": "DRAM stores each bit as a charge in a capacitor that leaks, so it must be refreshed; SRAM holds each bit in a circuit and needs no refreshing",
        "ne": "DRAM ले हरेक bit लाई चुहिने capacitor मा चार्जका रूपमा राख्छ, त्यसैले refresh गर्नुपर्छ; SRAM ले सर्किटमा राख्छ र refresh चाहिँदैन"
      },
      {
        "en": "SRAM can be written to and DRAM can only be read",
        "ne": "SRAM मा लेख्न मिल्छ, DRAM पढ्न मात्र"
      },
      {
        "en": "DRAM is used for cache and SRAM for main memory",
        "ne": "DRAM cache मा र SRAM main memory मा चल्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Refreshing is the real difference, and everything else follows from it: DRAM is slower because of the refreshing and far cheaper because a capacitor is simpler than a circuit, which is why main memory is DRAM and the small, costly cache is SRAM. Option D has those two the wrong way round. Both are volatile.",
      "ne": "साँचो फरक refresh हो, र बाँकी सबै त्यसैबाट निस्कन्छ: refresh का कारण DRAM ढिलो हुन्छ, र capacitor सर्किटभन्दा सरल भएकाले निकै सस्तो — त्यसैले main memory DRAM र सानो, महँगो cache SRAM हुन्छ। विकल्प (घ) ले दुईलाई उल्टो पारेको छ। दुवै volatile हुन्।"
    }
  },
  {
    "id": "g9.cf.q34",
    "subject": "grade9/computer-fundamentals",
    "unit": "u4",
    "topic": "rom-types",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which type of ROM is erased using ultraviolet light?",
      "ne": "कुन किसिमको ROM पराबैजनी किरणले मेटिन्छ?"
    },
    "options": [
      {
        "en": "PROM",
        "ne": "PROM"
      },
      {
        "en": "EPROM",
        "ne": "EPROM"
      },
      {
        "en": "EEPROM",
        "ne": "EEPROM"
      },
      {
        "en": "DRAM",
        "ne": "DRAM"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "EPROM is Erasable Programmable ROM, and the chip carries a small quartz window for the ultraviolet light to reach the cells. PROM can be written once and never erased; EEPROM is erased electrically, with no window and without removing the chip — which is why flash memory, a development of EEPROM, can be rewritten in place.",
      "ne": "EPROM भनेको Erasable Programmable ROM हो, र पराबैजनी किरण कक्षसम्म पुग्न चिपमा सानो क्वार्ज झ्याल हुन्छ। PROM एक पटक लेखिन्छ, कहिल्यै मेटिँदैन; EEPROM विद्युतीय रूपमा मेटिन्छ — झ्याल नचाहिने, चिप नझिकी — त्यसैले EEPROM कै विकास flash memory ठाउँमै पुनर्लेखन गर्न मिल्छ।"
    }
  },
  {
    "id": "g9.cf.q35",
    "subject": "grade9/computer-fundamentals",
    "unit": "u4",
    "topic": "secondary-access",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A student double-clicks a large video stored on the hard disk and there is a short pause before it plays. What is the pause?",
      "ne": "विद्यार्थीले hard disk मा भएको ठूलो भिडियोमा डबल-क्लिक गर्छ र बज्नुअघि केही क्षण रोकिन्छ। त्यो रोकाइ के हो?"
    },
    "options": [
      {
        "en": "The CPU is decoding the whole video before starting",
        "ne": "CPU ले सुरु गर्नुअघि पूरै भिडियो decode गर्दै छ"
      },
      {
        "en": "The file is being copied from the disk into RAM, because the CPU cannot read secondary storage directly",
        "ne": "फाइल disk बाट RAM मा सारिँदै छ, किनभने CPU ले secondary storage सिधै पढ्न सक्दैन"
      },
      {
        "en": "The monitor is warming up",
        "ne": "Monitor तात्दै छ"
      },
      {
        "en": "The operating system is checking the file for viruses",
        "ne": "OS ले फाइलमा भाइरस जाँच्दै छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The CPU can only work on what is in primary memory, so part of the file must be copied from the slow mechanical disk into fast electronic RAM first. That copy is the slowest link in the chain and it is what you are waiting for. This is also why fitting an SSD makes an old computer feel new while a faster processor often does not — the wait was never the CPU.",
      "ne": "CPU ले primary memory मा भएको कुरामा मात्र काम गर्न सक्छ, त्यसैले फाइलको केही भाग ढिलो यान्त्रिक डिस्कबाट छिटो विद्युतीय RAM मा पहिले सार्नुपर्छ। त्यही सार्ने काम शृंखलाको सबैभन्दा ढिलो कडी हो र तपाईं त्यसैलाई पर्खिरहनुभएको हुन्छ। पुरानो कम्प्युटरमा SSD हाल्दा नयाँ जस्तो हुनु तर छिटो प्रोसेसरले प्रायः फरक नपर्नुको कारण पनि यही हो।"
    }
  },
  {
    "id": "g9.cf.q36",
    "subject": "grade9/computer-fundamentals",
    "unit": "u4",
    "topic": "storage-families",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A CD and a DVD store data by which physical method?",
      "ne": "CD र DVD ले कुन भौतिक तरिकाले data राख्छन्?"
    },
    "options": [
      {
        "en": "Direction of magnetism on a coated surface",
        "ne": "लेपित सतहमा चुम्बकत्वको दिशा"
      },
      {
        "en": "Pits and flat areas burned into a surface and read by a laser",
        "ne": "सतहमा पोलिएका खाल्डा र समथर भाग, लेजरले पढिने"
      },
      {
        "en": "Charge trapped in insulated cells",
        "ne": "इन्सुलेट कक्षमा थुनिएको चार्ज"
      },
      {
        "en": "Holes punched through card",
        "ne": "कार्डमा पारेका प्वाल"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Optical storage: a laser burns pits, and reading detects whether light reflects from a pit or a flat area. Magnetism is the hard disk, trapped charge is flash memory such as a pen drive. The three families are told apart by exactly this — how a single bit is physically held.",
      "ne": "Optical storage: लेजरले खाल्डा पोल्छ, र पढ्दा प्रकाश खाल्डाबाट फर्कियो कि समथर भागबाट भनेर थाहा पाइन्छ। चुम्बकत्व hard disk को, थुनिएको चार्ज pen drive जस्ता flash memory को। तीन परिवार छुट्याउने आधार यही हो — एउटा bit भौतिक रूपमा कसरी राखिन्छ।"
    }
  },
  {
    "id": "g9.cf.q37",
    "subject": "grade9/computer-fundamentals",
    "unit": "u4",
    "topic": "hierarchy",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Arrange these from fastest to slowest: RAM, registers, hard disk, cache.",
      "ne": "यिनलाई सबैभन्दा छिटोदेखि ढिलोसम्म मिलाउनुहोस्: RAM, register, hard disk, cache।"
    },
    "options": [
      {
        "en": "Registers, cache, RAM, hard disk",
        "ne": "Register, cache, RAM, hard disk"
      },
      {
        "en": "Cache, registers, RAM, hard disk",
        "ne": "Cache, register, RAM, hard disk"
      },
      {
        "en": "RAM, cache, registers, hard disk",
        "ne": "RAM, cache, register, hard disk"
      },
      {
        "en": "Registers, RAM, cache, hard disk",
        "ne": "Register, RAM, cache, hard disk"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "The hierarchy runs registers, cache, RAM, secondary storage — closest to the CPU is fastest, smallest and costliest per byte. The common error is placing cache below RAM; cache sits between the CPU and RAM precisely because it is faster than RAM.",
      "ne": "तह यसरी चल्छ: register, cache, RAM, secondary storage — CPU सँग जति नजिक, त्यति छिटो, सानो र प्रति byte महँगो। सामान्य गल्ती cache लाई RAM भन्दा तल राख्नु हो; cache, RAM भन्दा छिटो भएकैले CPU र RAM बीचमा बस्छ।"
    }
  },
  {
    "id": "g9.cf.q38",
    "subject": "grade9/computer-fundamentals",
    "unit": "u4",
    "topic": "rom-purpose",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Why must the instructions that run the moment a computer is switched on be stored in ROM rather than on the hard disk?",
      "ne": "कम्प्युटर खोल्ने बित्तिकै चल्ने निर्देशन hard disk मा होइन, ROM मा किन राख्नुपर्छ?"
    },
    "options": [
      {
        "en": "Because ROM is faster than a hard disk",
        "ne": "किनभने ROM, hard disk भन्दा छिटो छ"
      },
      {
        "en": "Because at that moment nothing yet knows how to read a disk, and ROM keeps its contents without power",
        "ne": "किनभने त्यो बेला डिस्क कसरी पढ्ने भन्नै कसैलाई थाहा हुँदैन, र ROM ले बत्तीविनै सामग्री राख्छ"
      },
      {
        "en": "Because the hard disk is always full",
        "ne": "किनभने hard disk सधैं भरिएको हुन्छ"
      },
      {
        "en": "Because ROM can be rewritten easily",
        "ne": "किनभने ROM सजिलै पुनर्लेखन गर्न मिल्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Two conditions must both hold at startup: the contents must have survived the power being off, which rules out RAM, and they must be reachable before any disk driver has loaded, which rules out the disk. Only non-volatile memory on the board itself satisfies both, and that is ROM holding the BIOS.",
      "ne": "सुरु हुँदा दुवै सर्त पूरा हुनुपर्छ: बत्ती बन्द हुँदा पनि सामग्री बाँचेको हुनुपर्‍यो — यसले RAM हटाउँछ; र कुनै disk driver लोड हुनुअघि नै पुग्न सकिनुपर्‍यो — यसले disk हटाउँछ। दुवै पूरा गर्ने भनेको बोर्डमै भएको non-volatile मेमोरी हो, अर्थात् BIOS बोक्ने ROM।"
    }
  },
  {
    "id": "g9.cf.q39",
    "subject": "grade9/computer-fundamentals",
    "unit": "u4",
    "topic": "units",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "How many bits are there in one byte?",
      "ne": "एक byte मा कति bit हुन्छन्?"
    },
    "options": [
      {
        "en": "4",
        "ne": "४"
      },
      {
        "en": "8",
        "ne": "८"
      },
      {
        "en": "16",
        "ne": "१६"
      },
      {
        "en": "1024",
        "ne": "१०२४"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "One byte is 8 bits, and one byte holds roughly one character. Do not confuse this with 1 KB = 1024 bytes — the 8 and the 1024 are different relationships and both are asked.",
      "ne": "एक byte = ८ bit, र एक byte ले लगभग एक अक्षर राख्छ। यसलाई 1 KB = 1024 byte सँग नमिसाउनुहोस् — ८ र १०२४ फरक सम्बन्ध हुन् र दुवै सोधिन्छन्।"
    }
  },
  {
    "id": "g9.cf.q40",
    "subject": "grade9/computer-fundamentals",
    "unit": "u5",
    "topic": "internet-vs-web",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which statement about the Internet and the World Wide Web is correct?",
      "ne": "इन्टरनेट र World Wide Web बारे कुन कथन ठिक छ?"
    },
    "options": [
      {
        "en": "They are two names for the same thing",
        "ne": "दुवै एउटै कुराका दुई नाम हुन्"
      },
      {
        "en": "The Internet is the network of networks; the Web is one service that runs on it",
        "ne": "इन्टरनेट नेटवर्कहरूको नेटवर्क हो; वेब त्यसमाथि चल्ने एउटा सेवा हो"
      },
      {
        "en": "The Web is the network and the Internet is the collection of websites",
        "ne": "वेब नेटवर्क हो र इन्टरनेट वेबसाइटहरूको संग्रह"
      },
      {
        "en": "E-mail is part of the Web",
        "ne": "इमेल वेबको भाग हो"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The Internet is the connection itself — cables, routers and the agreement on how a message is addressed. The Web is pages joined by links and read with a browser, and it is only one of the services the Internet carries; e-mail and file transfer are others. Defining the Internet as \"a collection of websites\" describes one service and calls it the whole network.",
      "ne": "इन्टरनेट भनेको जडान आफैं हो — तार, राउटर र सन्देशको ठेगाना कसरी लेख्ने भन्ने सहमति। वेब भनेको लिंकले जोडिएका र browser ले पढिने पृष्ठ, र यो इन्टरनेटले बोक्ने धेरै सेवामध्ये एउटा मात्र हो; इमेल र file transfer अरू हुन्। \"वेबसाइटहरूको संग्रह\" भन्नु एउटा सेवालाई पूरै नेटवर्क भन्नु हो।"
    }
  },
  {
    "id": "g9.cf.q41",
    "subject": "grade9/computer-fundamentals",
    "unit": "u5",
    "topic": "modem",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What does a modem do, and what does its name stand for?",
      "ne": "Modem ले के गर्छ, र यसको नामको अर्थ के हो?"
    },
    "options": [
      {
        "en": "Modern Memory — it stores the connection settings",
        "ne": "Modern Memory — जडानका सेटिङ राख्छ"
      },
      {
        "en": "MOdulator-DEModulator — it converts the computer’s digital signal for the line, and the arriving signal back to digital",
        "ne": "MOdulator-DEModulator — कम्प्युटरको digital सङ्केत लाइनका लागि बदल्छ र आउने सङ्केत फेरि digital बनाउँछ"
      },
      {
        "en": "Mobile Demand — it requests data from the ISP",
        "ne": "Mobile Demand — ISP सँग data माग्छ"
      },
      {
        "en": "It amplifies the signal so it can travel further",
        "ne": "सङ्केत टाढासम्म जान सकोस् भनेर बढाउँछ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The name is the answer. Modulating turns the computer’s digital output into something the line can carry; demodulating turns the arriving signal back into digital. It is a translator and it must work in both directions. Note that amplifying is a different job done by a different device.",
      "ne": "नाम नै उत्तर हो। Modulate गर्नु भनेको कम्प्युटरको digital आउटपुटलाई लाइनले बोक्न सक्ने रूपमा बदल्नु; demodulate भनेको आउने सङ्केतलाई फेरि digital बनाउनु। यो अनुवादक हो र दुवै दिशामा काम गर्नैपर्छ। सङ्केत बढाउने काम फरक हो र त्यो अर्कै उपकरणले गर्छ।"
    }
  },
  {
    "id": "g9.cf.q42",
    "subject": "grade9/computer-fundamentals",
    "unit": "u5",
    "topic": "requirements",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which of these is NOT required to connect a home computer to the Internet?",
      "ne": "घरको कम्प्युटरलाई इन्टरनेटमा जोड्न यीमध्ये कुन चाहिँदैन?"
    },
    "options": [
      {
        "en": "A modem or router",
        "ne": "Modem वा router"
      },
      {
        "en": "An account with an Internet Service Provider",
        "ne": "ISP को खाता"
      },
      {
        "en": "A printer",
        "ne": "Printer"
      },
      {
        "en": "A transmission line such as telephone, fibre or wireless",
        "ne": "टेलिफोन, फाइबर वा वायरलेस जस्तो प्रसारण लाइन"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "A printer is an output device and has nothing to do with connecting. The requirements group into hardware (device, modem or router, line), software (TCP/IP and a browser) and a service (the ISP account) — and every one of those is required, which is why the ISP is the item most often forgotten.",
      "ne": "Printer output device हो, जडानसँग कुनै सम्बन्ध छैन। आवश्यकता हार्डवेयर (उपकरण, modem/router, लाइन), सफ्टवेयर (TCP/IP र browser) र सेवा (ISP खाता) मा बाँडिन्छ — र हरेक अनिवार्य छ। सबैभन्दा धेरै छुट्ने ISP नै हो।"
    }
  },
  {
    "id": "g9.cf.q43",
    "subject": "grade9/computer-fundamentals",
    "unit": "u5",
    "topic": "services",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Paying your land revenue to the municipality through its website is an example of:",
      "ne": "नगरपालिकाको वेबसाइटबाट मालपोत तिर्नु कुनको उदाहरण हो?"
    },
    "options": [
      {
        "en": "E-commerce",
        "ne": "E-commerce"
      },
      {
        "en": "E-governance",
        "ne": "E-governance"
      },
      {
        "en": "Telnet",
        "ne": "Telnet"
      },
      {
        "en": "Newsgroup",
        "ne": "Newsgroup"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A government service delivered online is e-governance. Money changing hands makes e-commerce tempting, but e-commerce is buying and selling between a customer and a business — not paying the state what you owe it. Nepali examples of e-governance: online PAN registration, passport applications, result publication.",
      "ne": "सरकारी सेवा अनलाइन दिनु e-governance हो। पैसा सर्ने भएकाले e-commerce लोभ्याउँछ, तर e-commerce भनेको ग्राहक र व्यवसायबीचको किनबेच हो — राज्यलाई तिर्नुपर्ने तिर्नु होइन। नेपालका उदाहरण: अनलाइन PAN दर्ता, राहदानी आवेदन, नतिजा प्रकाशन।"
    }
  },
  {
    "id": "g9.cf.q44",
    "subject": "grade9/computer-fundamentals",
    "unit": "u5",
    "topic": "services",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A technician in Pokhara takes over the full desktop of a faulty computer in Butwal to repair it. Which service is this, and how does it differ from Telnet?",
      "ne": "पोखराको प्राविधिकले बुटवलको बिग्रेको कम्प्युटरको पूरै डेस्कटप नियन्त्रणमा लिएर मर्मत गर्छ। यो कुन सेवा हो, र Telnet भन्दा कसरी फरक छ?"
    },
    "options": [
      {
        "en": "Telnet — both give the same kind of access",
        "ne": "Telnet — दुवैले उस्तै पहुँच दिन्छन्"
      },
      {
        "en": "Remote control — it gives the whole desktop as a picture, whereas Telnet gives a text command line",
        "ne": "Remote control — यसले पूरै डेस्कटप तस्बिरका रूपमा दिन्छ, Telnet ले पाठको command line"
      },
      {
        "en": "E-mail — the screen is sent as an attachment",
        "ne": "E-mail — पर्दा attachment बनेर जान्छ"
      },
      {
        "en": "IRC — the two computers chat with each other",
        "ne": "IRC — दुई कम्प्युटर आपसमा कुरा गर्छन्"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Both let you use a distant machine, and that is why they are confused. The difference is what you get: Telnet gives a text command line on the far computer, remote control gives its whole graphical desktop. Telnet is also old and insecure, because it sends passwords without encryption.",
      "ne": "दुवैले टाढाको मेसिन चलाउन दिन्छन्, त्यसैले अलमल हुन्छ। फरक के पाइन्छ भन्नेमा छ: Telnet ले पारिको कम्प्युटरमा पाठको command line दिन्छ, remote control ले पूरै ग्राफिकल डेस्कटप। Telnet पुरानो र असुरक्षित पनि छ, किनभने पासवर्ड नलुकाई पठाउँछ।"
    }
  },
  {
    "id": "g9.cf.q45",
    "subject": "grade9/computer-fundamentals",
    "unit": "u5",
    "topic": "disadvantages",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A question asks for the advantages AND disadvantages of the Internet. Which of these is a genuine disadvantage?",
      "ne": "प्रश्नले इन्टरनेटका फाइदा र बेफाइदा दुवै सोध्छ। यीमध्ये कुन साँचो बेफाइदा हो?"
    },
    "options": [
      {
        "en": "It allows communication over long distances",
        "ne": "टाढासम्म सञ्चार गर्न दिन्छ"
      },
      {
        "en": "False information can be spread and presented as fact",
        "ne": "झूटो सूचना तथ्य जस्तो देखाएर फैलाउन सकिन्छ"
      },
      {
        "en": "It provides access to online learning",
        "ne": "अनलाइन सिकाइमा पहुँच दिन्छ"
      },
      {
        "en": "It makes government services available online",
        "ne": "सरकारी सेवा अनलाइन उपलब्ध गराउँछ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The other three are advantages. Real disadvantages include false information, fraud and theft of money or identity, viruses, loss of privacy, wasted time and content unsuitable for children. A four-mark answer that lists only advantages has answered half the question, and this is one of the commonest ways marks are lost in this unit.",
      "ne": "बाँकी तीन फाइदा हुन्। साँचो बेफाइदामा पर्छन्: झूटो सूचना, ठगी र पैसा/परिचयको चोरी, भाइरस, गोपनीयताको क्षति, समय खेर जानु, र बालबालिकालाई नसुहाउने सामग्री। फाइदा मात्र लेख्ने ४ अंकको उत्तरले आधा प्रश्नको जवाफ दिएको हुन्छ, र यस युनिटमा अंक गुम्ने सबैभन्दा सामान्य तरिका यही हो।"
    }
  },
  {
    "id": "g9.cf.q46",
    "subject": "grade9/computer-fundamentals",
    "unit": "u5",
    "topic": "services",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which service lets you send a written message to one person, who reads it whenever they next look, even if they are offline now?",
      "ne": "अहिले अफलाइन भए पनि पछि हेर्दा पढ्न मिल्ने गरी एक जनालाई लिखित सन्देश पठाउन कुन सेवाले दिन्छ?"
    },
    "options": [
      {
        "en": "IRC",
        "ne": "IRC"
      },
      {
        "en": "E-mail",
        "ne": "E-mail"
      },
      {
        "en": "Newsgroup",
        "ne": "Newsgroup"
      },
      {
        "en": "Search engine",
        "ne": "Search engine"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "E-mail is store-and-forward: the message waits at an address until the recipient looks. IRC is live typed conversation needing both people present at once; a newsgroup posts to everybody rather than to one named person. The giveaway here is \"one person\" plus \"even if they are offline\".",
      "ne": "E-mail store-and-forward हो: सन्देश ठेगानामा पर्खिरहन्छ, प्रापकले हेरेपछि पढिन्छ। IRC मा दुवै एकैपटक चाहिन्छ; newsgroup ले एक जनालाई होइन सबैलाई पठाउँछ। सुराक \"एक जना\" र \"अफलाइन भए पनि\" मा छ।"
    }
  },
  {
    "id": "g9.cf.q47",
    "subject": "grade9/computer-fundamentals",
    "unit": "u5",
    "topic": "services",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Without which service would the World Wide Web be almost unusable, because no one could find a page among billions?",
      "ne": "कुन सेवाविना अर्बौं पृष्ठमध्ये कुनै भेट्टाउनै नसकिने भएर World Wide Web झन्डै अनुपयोगी हुन्थ्यो?"
    },
    "options": [
      {
        "en": "Telnet",
        "ne": "Telnet"
      },
      {
        "en": "A search engine",
        "ne": "Search engine"
      },
      {
        "en": "E-commerce",
        "ne": "E-commerce"
      },
      {
        "en": "Remote control",
        "ne": "Remote control"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A search engine indexes pages and finds the ones matching your words. Without one you would have to know a page’s address before you could reach it, which makes a network of billions of pages useless to anybody who does not already know what is on it.",
      "ne": "Search engine ले पृष्ठको सूची बनाएर तपाईंका शब्दसँग मिल्ने खोज्छ। यो नभए पृष्ठको ठेगाना पहिल्यै थाहा हुनुपर्थ्यो, र अर्बौं पृष्ठको नेटवर्क त्यहाँ के छ थाहा नभएकाका लागि बेकामको हुन्थ्यो।"
    }
  },
  {
    "id": "g9.cf.q48",
    "subject": "grade9/computer-fundamentals",
    "unit": "u6",
    "topic": "definition",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which of these is multimedia?",
      "ne": "यीमध्ये कुन मल्टिमिडिया हो?"
    },
    "options": [
      {
        "en": "A page containing only printed text",
        "ne": "केवल छापिएको पाठ भएको पाना"
      },
      {
        "en": "A single photograph on its own",
        "ne": "एक्लै राखिएको एउटा फोटो"
      },
      {
        "en": "A lesson combining text, a diagram, narration and a clip you can replay",
        "ne": "पाठ, चित्र, स्वर र फेरि बजाउन मिल्ने क्लिप मिलेको पाठ"
      },
      {
        "en": "A recorded song with nothing else",
        "ne": "अरू केही नभएको रेकर्ड गरिएको गीत"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "Multi means more than one. A single medium — text alone, one photograph, one song — is not multimedia however good it is. Option C combines four media and adds interactivity through replay, which most definitions also require.",
      "ne": "Multi भनेको एकभन्दा बढी। एउटै माध्यम — केवल पाठ, एउटा फोटो, एउटा गीत — जतिसुकै राम्रो भए पनि मल्टिमिडिया होइन। विकल्प (ग) ले चार माध्यम मिलाउँछ र फेरि बजाउन दिएर अन्तरक्रिया पनि थप्छ, जुन धेरै परिभाषाले खोज्छन्।"
    }
  },
  {
    "id": "g9.cf.q49",
    "subject": "grade9/computer-fundamentals",
    "unit": "u6",
    "topic": "components",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A bar chart on a slide grows upward as the presenter clicks, drawn by the software itself. Which component of multimedia is it?",
      "ne": "स्लाइडको बार चार्ट प्रस्तुतकर्ताले क्लिक गर्दा माथितिर बढ्छ, र त्यो सफ्टवेयरले आफैं कोरेको हो। यो मल्टिमिडियाको कुन भाग हो?"
    },
    "options": [
      {
        "en": "Image, because a chart is a picture",
        "ne": "Image, किनभने चार्ट तस्बिर हो"
      },
      {
        "en": "Animation, because it changes over time and the frames are computer-generated",
        "ne": "Animation, किनभने यो समयसँगै बदलिन्छ र फ्रेम कम्प्युटरले बनाएका हुन्"
      },
      {
        "en": "Video, because it moves",
        "ne": "Video, किनभने यो चल्छ"
      },
      {
        "en": "Text, because it displays numbers",
        "ne": "Text, किनभने संख्या देखाउँछ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A static chart would be an image, but this one changes over time, and the frames are generated rather than filmed. Movement plus created equals animation. It is not video because nothing was recorded by a camera. This is the case most often answered \"image\".",
      "ne": "स्थिर चार्ट भए image हुन्थ्यो, तर यो समयसँगै बदलिन्छ र फ्रेम खिचिएका होइनन्, बनाइएका हुन्। चाल + बनाइएको = animation। क्यामेराले केही रेकर्ड नगरेकाले video होइन। \"image\" भनेर सबैभन्दा धेरै गलत हुने केस यही हो।"
    }
  },
  {
    "id": "g9.cf.q50",
    "subject": "grade9/computer-fundamentals",
    "unit": "u6",
    "topic": "components",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What is the essential difference between animation and video?",
      "ne": "Animation र video बीचको मूल फरक के हो?"
    },
    "options": [
      {
        "en": "Animation is in colour and video is not",
        "ne": "Animation रङ्गीन हुन्छ, video हुँदैन"
      },
      {
        "en": "Video is recorded from real events by a camera; animation is created frame by frame and never happened in front of a camera",
        "ne": "Video क्यामेराले वास्तविक घटनाबाट रेकर्ड गर्छ; animation फ्रेम–फ्रेम बनाइन्छ र क्यामेरा अगाडि कहिल्यै भएकै हुँदैन"
      },
      {
        "en": "Animation always has sound and video does not",
        "ne": "Animation मा सधैं आवाज हुन्छ, video मा हुँदैन"
      },
      {
        "en": "Video files are smaller than animation files",
        "ne": "Video फाइल animation भन्दा सानो हुन्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The difference is the source of the frames: recorded versus created. A cartoon is animation even though it moves convincingly; a film of a cartoonist at work is video. Colour and sound are not the test — both can have either.",
      "ne": "फरक फ्रेम कहाँबाट आयो भन्नेमा छ: रेकर्ड गरिएको कि बनाइएको। कार्टुन विश्वसनीय रूपमा चले पनि animation हो; कार्टुनिस्टले काम गरेको फिल्म video। रङ र आवाज जाँच होइनन् — दुवैमा दुवै हुन सक्छ।"
    }
  },
  {
    "id": "g9.cf.q51",
    "subject": "grade9/computer-fundamentals",
    "unit": "u6",
    "topic": "formats",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which file format is an audio format?",
      "ne": "कुन फाइल ढाँचा audio ढाँचा हो?"
    },
    "options": [
      {
        "en": ".mp4",
        "ne": ".mp4"
      },
      {
        "en": ".mp3",
        "ne": ".mp3"
      },
      {
        "en": ".jpg",
        "ne": ".jpg"
      },
      {
        "en": ".txt",
        "ne": ".txt"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": ".mp3 is audio and .mp4 is video — the digits are not decoration, and swapping them is a common slip. .jpg is an image and .txt is text.",
      "ne": ".mp3 audio र .mp4 video हो — अंक सजावट होइनन्, र यी साट्नु सामान्य गल्ती हो। .jpg image, .txt text।"
    }
  },
  {
    "id": "g9.cf.q52",
    "subject": "grade9/computer-fundamentals",
    "unit": "u6",
    "topic": "file-size",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Why is a one-minute video file thousands of times larger than a one-page essay on the same subject?",
      "ne": "उही विषयको एक पानाको निबन्धभन्दा एक मिनेटको भिडियो फाइल हजारौं गुणा किन ठूलो हुन्छ?"
    },
    "options": [
      {
        "en": "Because the video contains more information about the subject",
        "ne": "किनभने भिडियोमा विषयबारे बढी जानकारी हुन्छ"
      },
      {
        "en": "Because a minute of video is roughly 1,500 separate images plus sound, and one image already stores a colour value for every pixel",
        "ne": "किनभने एक मिनेट भिडियो झन्डै १,५०० छुट्टाछुट्टै तस्बिर र आवाज हो, र एउटै तस्बिरले हरेक pixel को रङ मान राख्छ"
      },
      {
        "en": "Because video files are stored inefficiently",
        "ne": "किनभने भिडियो फाइल अदक्ष तरिकाले राखिन्छ"
      },
      {
        "en": "Because video must be stored twice for safety",
        "ne": "किनभने सुरक्षाका लागि भिडियो दुई पटक राख्नुपर्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Video runs at around 25 to 30 frames per second. Text stores one byte per character; an image stores colour values for every pixel, which is already hundreds of times more. Option A is wrong in an interesting way: file size measures data, not meaning — a page of text can carry an idea an hour of video does not. This is also why multimedia needs compression, and why a school on a slow connection downloads notes easily and video with difficulty.",
      "ne": "भिडियो प्रति सेकेन्ड करिब २५–३० फ्रेममा चल्छ। पाठले प्रति अक्षर एक byte राख्छ; तस्बिरले हरेक pixel को रङ मान राख्छ, जुन पहिल्यै सयौं गुणा बढी हो। विकल्प (क) रोचक किसिमले गलत छ: फाइलको आकारले data नाप्छ, अर्थ होइन। त्यसैले मल्टिमिडियालाई compression चाहिन्छ, र ढिलो जडान भएको विद्यालयले नोट सजिलै तर भिडियो गाह्रोसँग डाउनलोड गर्छ।"
    }
  },
  {
    "id": "g9.cf.q53",
    "subject": "grade9/computer-fundamentals",
    "unit": "u6",
    "topic": "components",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which component of multimedia is most often left out when students list them?",
      "ne": "विद्यार्थीले सूची बनाउँदा मल्टिमिडियाको कुन भाग सबैभन्दा धेरै छुटाउँछन्?"
    },
    "options": [
      {
        "en": "Video",
        "ne": "Video"
      },
      {
        "en": "Text",
        "ne": "Text"
      },
      {
        "en": "Audio",
        "ne": "Audio"
      },
      {
        "en": "Animation",
        "ne": "Animation"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Text. It is the oldest component and the least exciting, so it is the one dropped — and the question asks for all five: text, audio, video, image and animation. Text is also the only component that carries an exact figure, such as a mountain’s height, without ambiguity.",
      "ne": "Text। सबैभन्दा पुरानो र कम आकर्षक भएकाले यही छुट्छ — तर प्रश्नले पाँचै खोज्छ: text, audio, video, image, animation। ठ्याक्कै संख्या, जस्तै हिमालको उचाइ, अन्योलबिना बोक्ने एक मात्र भाग पनि text नै हो।"
    }
  },
  {
    "id": "g9.cf.q54",
    "subject": "grade9/computer-fundamentals",
    "unit": "u6",
    "topic": "applications",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A surgeon practises an operation on a computer simulation before performing it on a patient. This is multimedia used in:",
      "ne": "शल्यचिकित्सकले बिरामीमा गर्नुअघि कम्प्युटर सिमुलेसनमा अभ्यास गर्छन्। यो मल्टिमिडियाको कुन क्षेत्रमा प्रयोग हो?"
    },
    "options": [
      {
        "en": "Entertainment",
        "ne": "मनोरञ्जन"
      },
      {
        "en": "Medicine",
        "ne": "चिकित्सा"
      },
      {
        "en": "Advertising",
        "ne": "विज्ञापन"
      },
      {
        "en": "E-governance",
        "ne": "E-governance"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Medicine — scan images, animated anatomy and surgical simulators are all standard multimedia applications in that field. The argument for multimedia here is the same as everywhere: a description alone would leave out the shape and the movement, which are exactly what the surgeon needs to rehearse.",
      "ne": "चिकित्सा — स्क्यानका तस्बिर, चल्ने शरीर रचना र शल्यक्रिया सिमुलेटर सबै त्यस क्षेत्रका मानक प्रयोग हुन्। यहाँ मल्टिमिडियाको तर्क अन्यत्रकै जस्तै हो: वर्णनले आकार र चाल छुटाउँछ, र शल्यचिकित्सकलाई अभ्यास चाहिने तिनै हुन्।"
    }
  },
  {
    "id": "g9.cf.q55",
    "subject": "grade9/computer-fundamentals",
    "unit": "u7",
    "topic": "cloud-vs-distributed",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A weather office splits one forecast calculation across forty of its own computers so it finishes by morning. This is:",
      "ne": "मौसम विभागले एउटै पूर्वानुमानको गणना आफ्नै चालीस कम्प्युटरमा बाँडेर बिहानसम्म सक्छ। यो हो:"
    },
    "options": [
      {
        "en": "Cloud computing, because many computers are involved",
        "ne": "Cloud computing, किनभने धेरै कम्प्युटर छन्"
      },
      {
        "en": "Distributed computing, because one task is shared among many computers working together",
        "ne": "Distributed computing, किनभने एउटै काम धेरै कम्प्युटरले सँगै बाँड्छन्"
      },
      {
        "en": "Big data, because the calculation is large",
        "ne": "Big data, किनभने गणना ठूलो छ"
      },
      {
        "en": "IoT, because the computers are networked",
        "ne": "IoT, किनभने कम्प्युटर नेटवर्कमा छन्"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Cloud computing is about WHOSE computer — renting someone else’s over the Internet. Distributed computing is about HOW MANY computers share one task. Here all forty belong to the weather office itself, so ownership is not the point; sharing the work is. They are not opposites, and a cloud service may well be distributed underneath.",
      "ne": "Cloud computing कम्प्युटर कसको भन्ने कुरा हो — इन्टरनेटमार्फत अर्कैको भाडामा लिनु। Distributed computing एउटै काम कतिवटा कम्प्युटरले बाँड्छन् भन्ने। यहाँ चालीसै मेसिन मौसम विभागकै हुन्, त्यसैले स्वामित्व होइन, काम बाँड्नु मुख्य कुरा हो। यी उल्टा होइनन्, र cloud सेवा भित्री रूपमा distributed हुन सक्छ।"
    }
  },
  {
    "id": "g9.cf.q56",
    "subject": "grade9/computer-fundamentals",
    "unit": "u7",
    "topic": "iot",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which of these is an Internet of Things device?",
      "ne": "यीमध्ये कुन Internet of Things उपकरण हो?"
    },
    "options": [
      {
        "en": "A laptop connected to Wi-Fi",
        "ne": "Wi-Fi मा जोडिएको ल्यापटप"
      },
      {
        "en": "A water tank with a level sensor that messages the owner when it runs low",
        "ne": "पानी घट्दा मालिकलाई सन्देश पठाउने लेभल सेन्सर भएको ट्यांकी"
      },
      {
        "en": "A desktop computer in a school lab",
        "ne": "विद्यालय ल्याबको डेस्कटप कम्प्युटर"
      },
      {
        "en": "A printer attached by cable to one computer",
        "ne": "एउटै कम्प्युटरमा तारले जोडिएको प्रिन्टर"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The test has two parts: it must be a thing that is NOT a computer, and it must be on the network. A water tank is not a computer, so adding a sensor and a connection makes it IoT. A laptop on Wi-Fi fails the first part — it was already a computer.",
      "ne": "जाँचका दुई भाग छन्: त्यो कम्प्युटर नभएको वस्तु हुनुपर्छ, र नेटवर्कमा हुनुपर्छ। पानीको ट्यांकी कम्प्युटर होइन, त्यसैले सेन्सर र जडान थपेपछि IoT बन्छ। Wi-Fi मा जोडिएको ल्यापटप पहिलो भागमै असफल हुन्छ — त्यो त पहिल्यै कम्प्युटर थियो।"
    }
  },
  {
    "id": "g9.cf.q57",
    "subject": "grade9/computer-fundamentals",
    "unit": "u7",
    "topic": "bigdata-vs-mining",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A telecom company examines years of call records and discovers which customers are likely to leave. Which term describes what the company DID?",
      "ne": "टेलिकम कम्पनीले वर्षौंका कल रेकर्ड केलाएर कुन ग्राहक छाड्न लागेका छन् पत्ता लगाउँछ। कम्पनीले गरेको कामलाई के भनिन्छ?"
    },
    "options": [
      {
        "en": "Big data",
        "ne": "Big data"
      },
      {
        "en": "Data mining",
        "ne": "Data mining"
      },
      {
        "en": "Cloud computing",
        "ne": "Cloud computing"
      },
      {
        "en": "Cryptography",
        "ne": "Cryptography"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The call records are big data — the material. Examining them to discover a pattern nobody asked for is the activity, and that activity is data mining. Big data is a noun you have; data mining is a verb you do to it. Writing \"big data is mining large data\" merges the two and loses the mark.",
      "ne": "कल रेकर्ड big data हुन् — सामग्री। कसैले नखोजेको बान्की भेट्न केलाउनु काम हो, र त्यो काम data mining। Big data तपाईंसँग भएको नाम हो; data mining त्यसमाथि गरिने क्रिया। \"Big data भनेको ठूलो data को mining हो\" लेख्नु दुईलाई मिसाउनु हो र अंक गुम्छ।"
    }
  },
  {
    "id": "g9.cf.q58",
    "subject": "grade9/computer-fundamentals",
    "unit": "u7",
    "topic": "vr-vs-ar",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A mechanic points a phone at an engine and sees the part names drawn over the real engine on the screen. This is:",
      "ne": "मेकानिकले इन्जिनतिर फोन तेर्स्याउँदा पर्दामा वास्तविक इन्जिनमाथि भागका नाम कोरिएको देख्छ। यो हो:"
    },
    "options": [
      {
        "en": "Virtual Reality",
        "ne": "Virtual Reality"
      },
      {
        "en": "Augmented Reality",
        "ne": "Augmented Reality"
      },
      {
        "en": "Artificial Intelligence",
        "ne": "Artificial Intelligence"
      },
      {
        "en": "Cloud computing",
        "ne": "Cloud computing"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The real engine is still visible and information has been ADDED on top — that is AR. VR would replace the surroundings entirely with a computer-generated world, and would need a headset that blocks the room out. The ordinary phone is the clue.",
      "ne": "वास्तविक इन्जिन देखिँदै छ र माथि सूचना थपिएको छ — यही AR। VR ले वरिपरिको संसार पूरै कम्प्युटरले बनाएको संसारले बदल्थ्यो र कोठा छेक्ने हेडसेट चाहिन्थ्यो। साधारण फोन नै सुराक हो।"
    }
  },
  {
    "id": "g9.cf.q59",
    "subject": "grade9/computer-fundamentals",
    "unit": "u7",
    "topic": "cryptography",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "In cryptography, what is kept secret — the algorithm or the key?",
      "ne": "Cryptography मा गोप्य के राखिन्छ — एल्गोरिदम कि key?"
    },
    "options": [
      {
        "en": "The algorithm, because if people knew the method they could read the message",
        "ne": "एल्गोरिदम, किनभने तरिका थाहा भए मानिसले सन्देश पढ्न सक्थे"
      },
      {
        "en": "The key — the algorithm is usually public, and security depends on the key being secret",
        "ne": "Key — एल्गोरिदम प्रायः सार्वजनिक हुन्छ, र सुरक्षा key गोप्य रहनुमा भर पर्छ"
      },
      {
        "en": "Both must be secret at all times",
        "ne": "दुवै सधैं गोप्य हुनुपर्छ"
      },
      {
        "en": "Neither — encryption does not rely on secrecy",
        "ne": "कुनै पनि होइन — encryption गोपनीयतामा भर पर्दैन"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Security that depends on hiding the method collapses as soon as somebody works the method out, and it cannot be repaired. Security that depends on a key survives: the algorithm can be published and studied, and if a key is exposed you change the key. This is why the same public algorithm protects millions of different conversations.",
      "ne": "तरिका लुकाएर पाइने सुरक्षा कसैले तरिका पत्ता लगाउने बित्तिकै ढल्छ, र त्यसलाई मर्मत गर्न मिल्दैन। Key मा अडेको सुरक्षा टिक्छ: एल्गोरिदम छापेर अध्ययन गर्न दिन सकिन्छ, र key चुहियो भने key फेरे पुग्छ। एउटै सार्वजनिक एल्गोरिदमले लाखौं फरक कुराकानी जोगाउनुको कारण यही हो।"
    }
  },
  {
    "id": "g9.cf.q60",
    "subject": "grade9/computer-fundamentals",
    "unit": "u7",
    "topic": "ai",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What distinguishes an artificial intelligence system from an ordinary computer program?",
      "ne": "Artificial intelligence प्रणालीलाई साधारण कम्प्युटर प्रोग्रामभन्दा छुट्याउने कुरा के हो?"
    },
    "options": [
      {
        "en": "It runs faster",
        "ne": "यो छिटो चल्छ"
      },
      {
        "en": "It can learn from examples and improve without being rewritten",
        "ne": "यसले उदाहरणबाट सिक्न र फेरि नलेखिकनै सुध्रन सक्छ"
      },
      {
        "en": "It needs an Internet connection",
        "ne": "यसलाई इन्टरनेट जडान चाहिन्छ"
      },
      {
        "en": "It is always written in a special language",
        "ne": "यो सधैं विशेष भाषामा लेखिन्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Learning from experience is the phrase that carries the mark. An ordinary program does exactly what it was told; an AI system is given examples and works out the rule itself, which is why it can improve without a programmer rewriting it. Speed, Internet and language are not part of the definition.",
      "ne": "अंक बोक्ने वाक्यांश \"अनुभवबाट सिक्ने\" हो। साधारण प्रोग्रामले भनेकै गर्छ; AI प्रणालीलाई उदाहरण दिइन्छ र नियम आफैं निकाल्छ, त्यसैले प्रोग्रामरले फेरि नलेखिकनै सुध्रन सक्छ। गति, इन्टरनेट र भाषा परिभाषाका भाग होइनन्।"
    }
  },
  {
    "id": "g9.cf.q61",
    "subject": "grade9/computer-fundamentals",
    "unit": "u7",
    "topic": "cloud",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which is a genuine disadvantage of cloud computing for a school in Nepal?",
      "ne": "नेपालको विद्यालयका लागि cloud computing को साँचो बेफाइदा कुन हो?"
    },
    "options": [
      {
        "en": "It requires buying expensive servers",
        "ne": "महँगो सर्भर किन्नुपर्छ"
      },
      {
        "en": "It needs a reliable Internet connection, and the data sits on someone else’s computer",
        "ne": "भरपर्दो इन्टरनेट चाहिन्छ, र data अर्कैको कम्प्युटरमा रहन्छ"
      },
      {
        "en": "It cannot be reached from more than one place",
        "ne": "एक ठाउँभन्दा बढीबाट पुग्न सकिँदैन"
      },
      {
        "en": "Capacity cannot be increased later",
        "ne": "पछि क्षमता बढाउन मिल्दैन"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Option A is backwards — not buying servers is cloud computing’s main advantage, and options C and D describe the opposite of what it offers. The real disadvantages are dependence on a working connection, data held by someone else, and a cost that never stops. All three matter in Nepal, where connections fail and electricity is not guaranteed.",
      "ne": "विकल्प (क) उल्टो छ — सर्भर नकिन्नु नै cloud को मुख्य फाइदा हो, र (ग) तथा (घ) ले यसले दिने कुराको ठिक उल्टो भन्छन्। साँचो बेफाइदा: चल्ने जडानमा निर्भरता, data अर्कैसँग रहनु, र कहिल्यै नसकिने खर्च। नेपालमा तीनै महत्त्वपूर्ण छन्।"
    }
  },
  {
    "id": "g9.cf.q62",
    "subject": "grade9/computer-fundamentals",
    "unit": "u7",
    "topic": "emerging-definition",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What makes a technology \"emerging\" rather than merely new?",
      "ne": "कुनै प्रविधि नयाँ मात्र नभई \"उदीयमान\" किन भनिन्छ?"
    },
    "options": [
      {
        "en": "It was invented this year",
        "ne": "यो यसै वर्ष आविष्कार भयो"
      },
      {
        "en": "It is still developing, is not yet in ordinary everyday use, and is expected to change how people live and work",
        "ne": "यो अझै विकसित हुँदै छ, दैनिक सामान्य प्रयोगमा आइसकेको छैन, र मानिसको जीवन तथा कामको तरिका बदल्ने अपेक्षा छ"
      },
      {
        "en": "It is expensive",
        "ne": "यो महँगो छ"
      },
      {
        "en": "It uses artificial intelligence",
        "ne": "यसले AI प्रयोग गर्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "New is not the test — a new model of phone is new and changes nothing. A technology is emerging when it is moving out of the laboratory into use fast enough that the rules and the jobs around it have not settled. That also means the list changes over time, which is what the word predicts.",
      "ne": "जाँच \"नयाँ\" होइन — फोनको नयाँ मोडेल नयाँ त हो, तर केही बदल्दैन। कुनै प्रविधि प्रयोगशालाबाट प्रयोगमा यति छिटो सर्दै छ कि वरिपरिका नियम र पेसा नै थामिइसकेका छैनन् भने त्यो उदीयमान हो। यसैले सूची समयसँगै बदलिन्छ — शब्दले भनेकै त्यही हो।"
    }
  }
]);

QuizService.registerBank("grade10/oop-cpp", [
  {
    "id": "g10.oop-cpp.q01",
    "subject": "grade10/oop-cpp",
    "unit": "u1",
    "topic": "stack-lifo",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which data structure follows the LIFO (Last In, First Out) principle?",
      "ne": "कुन डाटा स्ट्रक्चरले LIFO (Last In, First Out) सिद्धान्त पछ्याउँछ?"
    },
    "options": [
      {
        "en": "Queue",
        "ne": "Queue (क्यू)"
      },
      {
        "en": "Stack",
        "ne": "Stack (स्ट्याक)"
      },
      {
        "en": "Tree",
        "ne": "Tree (ट्री)"
      },
      {
        "en": "Graph",
        "ne": "Graph (ग्राफ)"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A stack inserts and deletes at only one end called the top, so the last value pushed is the first one popped.",
      "ne": "स्ट्याकले एउटै छेउ (top) बाट राख्छ र झिक्छ, त्यसैले अन्तिममा हालेको पहिले निस्कन्छ।"
    }
  },
  {
    "id": "g10.oop-cpp.q02",
    "subject": "grade10/oop-cpp",
    "unit": "u3",
    "topic": "access-specifiers",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "If no access specifier is written inside a C++ class, the members are by default:",
      "ne": "C++ क्लासभित्र कुनै access specifier नलेखिएमा मेम्बरहरू पूर्वनिर्धारित रूपमा के हुन्छन्?"
    },
    "options": [
      {
        "en": "public"
      },
      {
        "en": "protected"
      },
      {
        "en": "private"
      },
      {
        "en": "static"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "Members of a class are private by default. (In a struct they are public by default.)",
      "ne": "क्लासका मेम्बर पूर्वनिर्धारित रूपमा private हुन्छन्। (struct मा चाहिँ public हुन्छन्।)"
    }
  },
  {
    "id": "g10.oop-cpp.q03",
    "subject": "grade10/oop-cpp",
    "unit": "u1",
    "topic": "linear-vs-nonlinear",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which of the following is NOT a linear data structure?",
      "ne": "तलमध्ये कुन linear डाटा स्ट्रक्चर होइन?"
    },
    "options": [
      {
        "en": "Array",
        "ne": "Array (एरे)"
      },
      {
        "en": "Stack",
        "ne": "Stack (स्ट्याक)"
      },
      {
        "en": "Queue",
        "ne": "Queue (क्यू)"
      },
      {
        "en": "Tree",
        "ne": "Tree (ट्री)"
      }
    ],
    "answer": 3,
    "explanation": {
      "en": "A tree is non-linear because it is hierarchical — one node can connect to many child nodes.",
      "ne": "ट्री अरेखीय हो किनकि यो तह–तह मिलेको हुन्छ — एउटा नोड धेरै सन्तानसँग जोडिन सक्छ।"
    }
  },
  {
    "id": "g10.oop-cpp.q04",
    "subject": "grade10/oop-cpp",
    "unit": "u3",
    "topic": "constructor",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A constructor in C++ has:",
      "ne": "C++ मा constructor को के हुन्छ?"
    },
    "options": [
      {
        "en": "return type void",
        "ne": "return type void हुन्छ"
      },
      {
        "en": "the same return type as the class",
        "ne": "क्लासकै जस्तै return type हुन्छ"
      },
      {
        "en": "no return type at all",
        "ne": "कुनै return type नै हुँदैन"
      },
      {
        "en": "int as its return type",
        "ne": "return type int हुन्छ"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "A constructor has no return type — not even void. Its name must exactly match the class name.",
      "ne": "कन्स्ट्रक्टरको return type हुँदैन — void पनि होइन। नाम क्लासकै नामसँग ठ्याक्कै मिल्नुपर्छ।"
    }
  },
  {
    "id": "g10.oop-cpp.q05",
    "subject": "grade10/oop-cpp",
    "unit": "u3",
    "topic": "destructor",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which symbol is written before a destructor name?",
      "ne": "Destructor को नाम अगाडि कुन चिन्ह लेखिन्छ?"
    },
    "options": [
      {
        "en": "#"
      },
      {
        "en": "&"
      },
      {
        "en": "~"
      },
      {
        "en": "::"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "A destructor is written as ~ClassName(). The tilde (~) marks it as a destructor.",
      "ne": "डिस्ट्रक्टर ~ClassName() भनेर लेखिन्छ। टिल्ड (~) ले यो डिस्ट्रक्टर हो भन्ने जनाउँछ।"
    }
  },
  {
    "id": "g10.oop-cpp.q06",
    "subject": "grade10/oop-cpp",
    "unit": "u6",
    "topic": "compile-time-polymorphism",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Function overloading is an example of which type of polymorphism?",
      "ne": "Function overloading कुन किसिमको polymorphism को उदाहरण हो?"
    },
    "options": [
      {
        "en": "Run-time polymorphism",
        "ne": "Run-time polymorphism"
      },
      {
        "en": "Compile-time polymorphism",
        "ne": "Compile-time polymorphism"
      },
      {
        "en": "Dynamic binding",
        "ne": "Dynamic binding"
      },
      {
        "en": "Late binding",
        "ne": "Late binding"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "In overloading the compiler picks the correct function from the arguments before the program runs, so it is compile-time (static) polymorphism.",
      "ne": "Overloading मा कम्पाइलरले आर्गुमेन्ट हेरेर प्रोग्राम चल्नु अघि नै सही फङ्सन छान्छ, त्यसैले यो compile-time polymorphism हो।"
    }
  },
  {
    "id": "g10.oop-cpp.q07",
    "subject": "grade10/oop-cpp",
    "unit": "u6",
    "topic": "overriding",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Function overriding is possible only when there is:",
      "ne": "Function overriding कहिले मात्र सम्भव हुन्छ?"
    },
    "options": [
      {
        "en": "operator overloading",
        "ne": "operator overloading हुँदा"
      },
      {
        "en": "inheritance",
        "ne": "inheritance हुँदा"
      },
      {
        "en": "a friend function",
        "ne": "friend function हुँदा"
      },
      {
        "en": "a static member",
        "ne": "static member हुँदा"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Overriding means a derived class redefines a base class function, so a base and derived class — that is, inheritance — must exist.",
      "ne": "Overriding मा derived क्लासले base क्लासको फङ्सन पुनः लेख्छ, त्यसैले base र derived क्लास — अर्थात् inheritance — हुनैपर्छ।"
    }
  },
  {
    "id": "g10.oop-cpp.q08",
    "subject": "grade10/oop-cpp",
    "unit": "u5",
    "topic": "constructor-order",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "In multilevel inheritance Animal → Dog → Puppy, when a Puppy object is created, which constructor runs FIRST?",
      "ne": "Multilevel inheritance Animal → Dog → Puppy मा Puppy अब्जेक्ट बन्दा कुन constructor सबैभन्दा पहिले चल्छ?"
    },
    "options": [
      {
        "en": "Puppy constructor",
        "ne": "Puppy को constructor"
      },
      {
        "en": "Dog constructor",
        "ne": "Dog को constructor"
      },
      {
        "en": "Animal constructor",
        "ne": "Animal को constructor"
      },
      {
        "en": "All three run at the same time",
        "ne": "तीनै एकैचोटि चल्छन्"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "Base class constructors always run before derived ones, starting from the top-most base. So the order is Animal, then Dog, then Puppy.",
      "ne": "Base क्लासको कन्स्ट्रक्टर सधैं derived भन्दा पहिले चल्छ, सबैभन्दा माथिबाट सुरु हुँदै। क्रम: Animal → Dog → Puppy।"
    }
  },
  {
    "id": "g10.oop-cpp.q09",
    "subject": "grade10/oop-cpp",
    "unit": "u3",
    "topic": "scope-resolution",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which operator is used to define a member function outside its class?",
      "ne": "क्लास बाहिर member function परिभाषित गर्न कुन अपरेटर प्रयोग हुन्छ?"
    },
    "options": [
      {
        "en": "Dot operator (.)",
        "ne": "Dot अपरेटर (.)"
      },
      {
        "en": "Arrow operator (->)",
        "ne": "Arrow अपरेटर (->)"
      },
      {
        "en": "Scope resolution operator (::)",
        "ne": "Scope resolution अपरेटर (::)"
      },
      {
        "en": "Insertion operator (<<)",
        "ne": "Insertion अपरेटर (<<)"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "The scope resolution operator :: tells the compiler which class the function belongs to, e.g. void Student::display().",
      "ne": "Scope resolution operator :: ले फङ्सन कुन क्लासको हो भनेर कम्पाइलरलाई बताउँछ, जस्तै void Student::display()।"
    }
  },
  {
    "id": "g10.oop-cpp.q10",
    "subject": "grade10/oop-cpp",
    "unit": "u1",
    "topic": "ds-terms",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A collection of related records of the same entity is called a:",
      "ne": "एउटै entity का सम्बन्धित record हरूको सङ्ग्रहलाई के भनिन्छ?"
    },
    "options": [
      {
        "en": "Field",
        "ne": "Field (फिल्ड)"
      },
      {
        "en": "Record",
        "ne": "Record (रेकर्ड)"
      },
      {
        "en": "File",
        "ne": "File (फाइल)"
      },
      {
        "en": "Attribute",
        "ne": "Attribute (एट्रिब्युट)"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "Fields make a record, and many related records together make a file.",
      "ne": "फिल्डहरू मिलेर रेकर्ड बन्छ, र धेरै रेकर्ड मिलेर फाइल बन्छ।"
    }
  },
  {
    "id": "g10.oop-cpp.q11",
    "subject": "grade10/oop-cpp",
    "unit": "u6",
    "topic": "virtual",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which keyword makes run-time polymorphism possible in C++?",
      "ne": "C++ मा run-time polymorphism सम्भव बनाउने keyword कुन हो?"
    },
    "options": [
      {
        "en": "static"
      },
      {
        "en": "friend"
      },
      {
        "en": "virtual"
      },
      {
        "en": "inline"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "A virtual function tells C++ to decide at run time, by looking at the actual object the base pointer points to.",
      "ne": "virtual फङ्सनले C++ लाई चल्दै गर्दा, base पोइन्टरले देखाएको वास्तविक अब्जेक्ट हेरेर निर्णय गर्न लगाउँछ।"
    }
  },
  {
    "id": "g10.oop-cpp.q12",
    "subject": "grade10/oop-cpp",
    "unit": "u3",
    "topic": "class-vs-object",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which statement about a class and an object is TRUE?",
      "ne": "क्लास र अब्जेक्टबारे कुन भनाइ सही हो?"
    },
    "options": [
      {
        "en": "A class takes memory, an object does not",
        "ne": "क्लासले मेमोरी लिन्छ, अब्जेक्टले लिँदैन"
      },
      {
        "en": "An object takes memory, a class does not",
        "ne": "अब्जेक्टले मेमोरी लिन्छ, क्लासले लिँदैन"
      },
      {
        "en": "Both take memory",
        "ne": "दुवैले मेमोरी लिन्छन्"
      },
      {
        "en": "Neither takes memory",
        "ne": "दुवैले मेमोरी लिँदैनन्"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A class is only a blueprint and takes no memory. Memory is allocated when an object is created from it.",
      "ne": "क्लास केवल नक्सा हो, यसले मेमोरी लिँदैन। अब्जेक्ट बनेपछि मात्र मेमोरी छुट्याइन्छ।"
    }
  },
  {
    "id": "g10.oop-cpp.q13",
    "subject": "grade10/oop-cpp",
    "unit": "u1",
    "topic": "queue-fifo",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "In a queue, insertion and deletion are done at which ends?",
      "ne": "Queue मा राख्ने र झिक्ने काम कुन–कुन छेउबाट हुन्छ?"
    },
    "options": [
      {
        "en": "Insert at front, delete at rear",
        "ne": "front बाट राख्ने, rear बाट झिक्ने"
      },
      {
        "en": "Insert at rear, delete at front",
        "ne": "rear बाट राख्ने, front बाट झिक्ने"
      },
      {
        "en": "Both at the front",
        "ne": "दुवै front बाट"
      },
      {
        "en": "Both at the rear",
        "ne": "दुवै rear बाट"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A queue follows FIFO: new elements join at the rear and elements leave from the front, like a line at a counter.",
      "ne": "Queue ले FIFO मान्छ: नयाँ तत्त्व rear मा थपिन्छ र front बाट निस्कन्छ — काउन्टरको लाइन जस्तै।"
    }
  },
  {
    "id": "g10.oop-cpp.q14",
    "subject": "grade10/oop-cpp",
    "unit": "u4",
    "topic": "encapsulation",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Binding data members and member functions together in one unit and hiding the data from outside is called:",
      "ne": "डाटा मेम्बर र मेम्बर फङ्सनलाई एउटै एकाइमा बाँधेर बाहिरबाट डाटा लुकाउने कामलाई के भनिन्छ?"
    },
    "options": [
      {
        "en": "Abstraction",
        "ne": "Abstraction (एब्स्ट्र्याक्सन)"
      },
      {
        "en": "Inheritance",
        "ne": "Inheritance (इनहेरिटेन्स)"
      },
      {
        "en": "Encapsulation",
        "ne": "Encapsulation (इनक्याप्सुलेसन)"
      },
      {
        "en": "Polymorphism",
        "ne": "Polymorphism (पोलिमर्फिज्म)"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "That is encapsulation (data hiding). Abstraction instead hides the complexity of HOW the work is done.",
      "ne": "यो encapsulation (data hiding) हो। Abstraction ले चाहिँ काम \"कसरी\" हुन्छ भन्ने जटिलता लुकाउँछ।"
    }
  },
  {
    "id": "g10.oop-cpp.q15",
    "subject": "grade10/oop-cpp",
    "unit": "u3",
    "topic": "output-prediction",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What is the output of this program?<br><span class=\"mono\" style=\"color:var(--blue);font-size:.85rem\">class A { public: A(){cout&lt;&lt;\"A\";} ~A(){cout&lt;&lt;\"X\";} };<br>int main(){ A a1; A a2; return 0; }</span>",
      "ne": "यो प्रोग्रामको आउटपुट के हुन्छ?"
    },
    "options": [
      {
        "en": "AXAX"
      },
      {
        "en": "AAXX"
      },
      {
        "en": "AAX"
      },
      {
        "en": "XXAA"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Both constructors run first in creation order, printing AA. Then the destructors run in reverse order, printing XX. So the output is AAXX.",
      "ne": "दुवै कन्स्ट्रक्टर बनेको क्रममा पहिले चल्छन् — AA छाप्छन्। अनि डिस्ट्रक्टर उल्टो क्रममा चल्छन् — XX छाप्छन्। त्यसैले आउटपुट AAXX हो।"
    }
  },
  {
    "id": "g10.oop-cpp.q16",
    "subject": "grade10/oop-cpp",
    "unit": "u1",
    "topic": "array-vs-linked-list",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What is the main advantage of a linked list over an array?",
      "ne": "Array भन्दा linked list को मुख्य फाइदा के हो?"
    },
    "options": [
      {
        "en": "Elements can be accessed faster by index",
        "ne": "Index बाट तत्त्व छिटो पाइन्छ"
      },
      {
        "en": "Its size can grow or shrink while the program runs",
        "ne": "प्रोग्राम चल्दाचल्दै यसको आकार बढ्न वा घट्न सक्छ"
      },
      {
        "en": "It uses less memory per element",
        "ne": "प्रति तत्त्व कम मेमोरी खान्छ"
      },
      {
        "en": "Its elements are always stored next to each other",
        "ne": "यसका तत्त्व सधैं छेउछाउ राखिन्छन्"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A linked list is dynamic: nodes are allocated as needed, so it grows and shrinks at run time. An array is fixed once declared. The other three options describe an ARRAY — index access is O(1) in an array and requires walking the list in a linked list, and a linked list uses MORE memory per element because every node also stores a pointer.",
      "ne": "Linked list गतिशील हुन्छ: आवश्यकता अनुसार node बन्छन्, त्यसैले चल्दाचल्दै बढ्छ–घट्छ। Array घोषणा गरेपछि स्थिर हुन्छ। बाँकी तीन विकल्पले <b>array</b> लाई वर्णन गर्छन् — array मा index बाट पहुँच O(1) हो भने linked list मा हिँड्नुपर्छ, र linked list ले हरेक node मा pointer पनि राख्ने भएकाले प्रति तत्त्व <b>बढी</b> मेमोरी खान्छ।"
    }
  },
  {
    "id": "g10.oop-cpp.q17",
    "subject": "grade10/oop-cpp",
    "unit": "u1",
    "topic": "traversing",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Visiting every element of a data structure exactly once is called:",
      "ne": "डाटा स्ट्रक्चरका हरेक तत्त्वलाई ठ्याक्कै एक पटक हेर्ने कामलाई के भनिन्छ?"
    },
    "options": [
      {
        "en": "Searching",
        "ne": "Searching"
      },
      {
        "en": "Sorting",
        "ne": "Sorting"
      },
      {
        "en": "Traversing",
        "ne": "Traversing"
      },
      {
        "en": "Merging",
        "ne": "Merging"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "Traversing means visiting each element once, usually to process or display it. Searching looks for one particular element and may stop early; sorting rearranges elements into order. All three are listed in the syllabus as operations on data structures.",
      "ne": "Traversing भनेको हरेक तत्त्वलाई एक पटक हेर्नु — प्रायः प्रशोधन गर्न वा देखाउन। Searching ले कुनै एउटा तत्त्व खोज्छ र बीचैमा रोकिन सक्छ; sorting ले क्रममा मिलाउँछ। तीनै पाठ्यक्रममा डाटा स्ट्रक्चरका operation का रूपमा सूचीबद्ध छन्।"
    }
  },
  {
    "id": "g10.oop-cpp.q18",
    "subject": "grade10/oop-cpp",
    "unit": "u1",
    "topic": "non-linear",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which pair contains ONLY non-linear data structures?",
      "ne": "कुन जोडीमा <b>मात्र</b> non-linear डाटा स्ट्रक्चर छन्?"
    },
    "options": [
      {
        "en": "Stack and Queue",
        "ne": "Stack र Queue"
      },
      {
        "en": "Array and Linked List",
        "ne": "Array र Linked List"
      },
      {
        "en": "Tree and Graph",
        "ne": "Tree र Graph"
      },
      {
        "en": "Queue and Tree",
        "ne": "Queue र Tree"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "The syllabus names exactly two non-linear structures: trees and graphs. In a linear structure every element has one predecessor and one successor; in a non-linear one an element may connect to many. Option 4 is the trap — a tree is non-linear but a queue is linear, so the pair fails the word ONLY.",
      "ne": "पाठ्यक्रमले ठ्याक्कै दुई non-linear संरचना नाम लिन्छ: tree र graph। Linear संरचनामा हरेक तत्त्वको एक अघिल्लो र एक पछिल्लो हुन्छ; non-linear मा एउटै तत्त्व धेरैसँग जोडिन सक्छ। चौथो विकल्प पासो हो — tree non-linear हो तर queue linear, त्यसैले \"मात्र\" भन्ने शर्त पूरा हुँदैन।"
    }
  },
  {
    "id": "g10.oop-cpp.q19",
    "subject": "grade10/oop-cpp",
    "unit": "u1",
    "topic": "stack-application",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Values 10, 20, 30 are pushed onto a stack in that order. One value is popped, then 40 is pushed. Which value is now on top?",
      "ne": "Stack मा 10, 20, 30 यही क्रममा push गरियो। एउटा pop गरियो, अनि 40 push गरियो। अब टुप्पोमा कुन मान छ?"
    },
    "options": [
      {
        "en": "10",
        "ne": "10"
      },
      {
        "en": "20",
        "ne": "20"
      },
      {
        "en": "30",
        "ne": "30"
      },
      {
        "en": "40",
        "ne": "40"
      }
    ],
    "answer": 3,
    "explanation": {
      "en": "Work it through: after the three pushes the stack is 10, 20, 30 with 30 on top. A pop removes the TOP, so 30 goes and 20 is on top. Pushing 40 puts it above 20. The top is 40. The common slip is popping 10 — but LIFO removes the last one in, not the first.",
      "ne": "क्रमैसँग हेर्नुहोस्: तीन push पछि stack मा 10, 20, 30 हुन्छ र टुप्पोमा 30। Pop ले <b>टुप्पोको</b> हटाउँछ, त्यसैले 30 गयो र 20 टुप्पोमा आयो। 40 push गर्दा त्यो 20 माथि बस्छ। टुप्पोमा 40 छ। सामान्य गल्ती 10 हटाउनु हो — तर LIFO ले पहिलो होइन, अन्तिम छिरेको हटाउँछ।"
    }
  },
  {
    "id": "g10.oop-cpp.q20",
    "subject": "grade10/oop-cpp",
    "unit": "u1",
    "topic": "ds-need",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Why are data structures needed in a program?",
      "ne": "प्रोग्राममा डाटा स्ट्रक्चर किन चाहिन्छ?"
    },
    "options": [
      {
        "en": "To organise data so it can be stored and retrieved efficiently",
        "ne": "Data लाई व्यवस्थित गरेर छिटो राख्न र झिक्न सकियोस् भनेर"
      },
      {
        "en": "To make the program file smaller on disk",
        "ne": "प्रोग्राम फाइल डिस्कमा सानो बनाउन"
      },
      {
        "en": "To replace the need for an operating system",
        "ne": "अपरेटिङ सिस्टमको आवश्यकता हटाउन"
      },
      {
        "en": "To convert source code into machine code",
        "ne": "Source code लाई मेसिन कोडमा बदल्न"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "A data structure is a way of organising data in memory so a program can use it efficiently. The same data stored badly makes a program slow; stored well it makes it fast. Converting source to machine code is the compiler's job, not a data structure's.",
      "ne": "डाटा स्ट्रक्चर भनेको मेमोरीमा data मिलाएर राख्ने तरिका हो, जसले प्रोग्रामलाई छिटो काम गर्न दिन्छ। उही data नमिलाई राखे प्रोग्राम ढिलो हुन्छ; मिलाएर राखे छिटो। Source लाई मेसिन कोडमा बदल्ने काम compiler को हो, डाटा स्ट्रक्चरको होइन।"
    }
  },
  {
    "id": "g10.oop-cpp.q21",
    "subject": "grade10/oop-cpp",
    "unit": "u1",
    "topic": "ds-terms",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "In the terminology of data structures, a single named property of an entity — such as a student's roll number — is called a:",
      "ne": "डाटा स्ट्रक्चरको शब्दावलीमा कुनै entity को एउटा नामाकरण गरिएको गुण — जस्तै विद्यार्थीको roll number — लाई के भनिन्छ?"
    },
    "options": [
      {
        "en": "Record",
        "ne": "Record"
      },
      {
        "en": "Field (attribute)",
        "ne": "Field (attribute)"
      },
      {
        "en": "File",
        "ne": "File"
      },
      {
        "en": "Group item",
        "ne": "Group item"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A field, also called an attribute, is one property of an entity. A record is the whole collection of fields describing one entity (one student). A file is a collection of records. The three sit inside one another: field in record, record in file.",
      "ne": "Field — जसलाई attribute पनि भनिन्छ — entity को एउटा गुण हो। Record भनेको एउटै entity (एक विद्यार्थी) लाई वर्णन गर्ने सबै field को समूह। File भनेको record हरूको समूह। तीन एक–अर्काभित्र पर्छन्: field record भित्र, record file भित्र।"
    }
  },
  {
    "id": "g10.oop-cpp.q22",
    "subject": "grade10/oop-cpp",
    "unit": "u1",
    "topic": "queue-application",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which real situation is best modelled by a QUEUE?",
      "ne": "कुन वास्तविक अवस्थालाई <b>QUEUE</b> ले सबैभन्दा राम्ररी देखाउँछ?"
    },
    "options": [
      {
        "en": "Undoing the last action in a text editor",
        "ne": "Text editor मा अन्तिम काम undo गर्नु"
      },
      {
        "en": "Documents waiting to be printed",
        "ne": "छापिन पर्खिरहेका कागजात"
      },
      {
        "en": "Plates stacked one on top of another",
        "ne": "एकमाथि अर्को थुपारिएका थाल"
      },
      {
        "en": "Returning from a function to its caller",
        "ne": "Function बाट बोलाउनेकहाँ फर्किनु"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A print queue is FIFO — the document sent first is printed first, which is exactly what fairness requires. The other three are all LIFO and are modelled by a stack: undo reverses the most recent action, plates come off the top, and a function returns to the most recent caller.",
      "ne": "Print queue FIFO हो — पहिले पठाइएको कागजात पहिले छापिन्छ, र न्यायसंगत हुन त्यही चाहिन्छ। बाँकी तीनै LIFO हुन् र stack ले देखाउँछ: undo ले सबैभन्दा पछिल्लो काम उल्ट्याउँछ, थाल माथिबाट उठ्छ, र function सबैभन्दा पछिल्लो बोलाउनेकहाँ फर्कन्छ।"
    }
  },
  {
    "id": "g10.oop-cpp.q23",
    "subject": "grade10/oop-cpp",
    "unit": "u1",
    "topic": "ds-advantages",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which of these is NOT an advantage of using a suitable data structure?",
      "ne": "उपयुक्त डाटा स्ट्रक्चर प्रयोग गर्नुको फाइदा <b>होइन</b> कुन?"
    },
    "options": [
      {
        "en": "Efficient use of memory",
        "ne": "मेमोरीको प्रभावकारी प्रयोग"
      },
      {
        "en": "Faster searching and sorting",
        "ne": "छिटो searching र sorting"
      },
      {
        "en": "Data can be reused and managed easily",
        "ne": "Data पुनः प्रयोग र व्यवस्थापन सजिलो"
      },
      {
        "en": "The program automatically becomes free of logical errors",
        "ne": "प्रोग्राम आफैँ तार्किक त्रुटिबाट मुक्त हुन्छ"
      }
    ],
    "answer": 3,
    "explanation": {
      "en": "Choosing the right data structure makes a program faster and tidier; it does nothing about the correctness of your logic. A program with a perfect data structure and a wrong condition is still wrong. The first three are the advantages the syllabus lists.",
      "ne": "ठीक डाटा स्ट्रक्चर छान्दा प्रोग्राम छिटो र सफा हुन्छ; तपाईंको तर्क सही छ कि छैन भन्नेमा यसले केही गर्दैन। उत्कृष्ट डाटा स्ट्रक्चर भए पनि शर्त गलत भए प्रोग्राम गलत नै हुन्छ। पहिला तीन पाठ्यक्रमले लेखेका फाइदा हुन्।"
    }
  },
  {
    "id": "g10.oop-cpp.q24",
    "subject": "grade10/oop-cpp",
    "unit": "u1",
    "topic": "searching",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A list of 1000 names must be searched many times a day. Which single change would most improve search speed?",
      "ne": "हजार नामको सूची दिनमा धेरै पटक खोज्नुपर्छ। कुन एउटा परिवर्तनले खोजी गति सबैभन्दा बढी सुधार्छ?"
    },
    "options": [
      {
        "en": "Keep the list sorted so a binary search can be used",
        "ne": "सूची क्रममा राख्ने, ताकि binary search गर्न सकियोस्"
      },
      {
        "en": "Store the names in a stack instead",
        "ne": "नामहरू stack मा राख्ने"
      },
      {
        "en": "Rename the variables to shorter names",
        "ne": "Variable का नाम छोटा बनाउने"
      },
      {
        "en": "Add more comments to the program",
        "ne": "प्रोग्राममा थप टिप्पणी लेख्ने"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Sorting once lets every later search be a binary search, which halves the remaining list at each step — about 10 comparisons for 1000 names instead of up to 1000. A stack would make it worse, since you can only reach the top. Shorter names and comments change readability, not running speed.",
      "ne": "एक पटक क्रममा मिलाएपछि हरेक पछिल्लो खोजी binary search हुन सक्छ, जसले हरेक चरणमा बाँकी सूची आधा गर्छ — हजार नामका लागि हजारसम्म होइन, करिब १० तुलना। Stack ले झन् बिगार्छ, किनकि टुप्पो मात्र छुन पाइन्छ। छोटो नाम र टिप्पणीले पढ्न सजिलो बनाउँछ, गति होइन।"
    }
  },
  {
    "id": "g10.oop-cpp.q25",
    "subject": "grade10/oop-cpp",
    "unit": "u2",
    "topic": "oop-features",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which of these is NOT one of the features of object-oriented programming?",
      "ne": "यीमध्ये कुन object-oriented programming को विशेषता <b>होइन</b>?"
    },
    "options": [
      {
        "en": "Encapsulation",
        "ne": "Encapsulation"
      },
      {
        "en": "Inheritance",
        "ne": "Inheritance"
      },
      {
        "en": "Compilation",
        "ne": "Compilation"
      },
      {
        "en": "Polymorphism",
        "ne": "Polymorphism"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "Compilation is how any source program becomes machine code — it happens to C programs too and has nothing to do with objects. The features of OOP are class, object, encapsulation, abstraction, inheritance, polymorphism, data hiding and message passing.",
      "ne": "Compilation भनेको जुनसुकै source प्रोग्राम मेसिन कोड बन्ने तरिका हो — C प्रोग्राममा पनि हुन्छ र object सँग यसको सम्बन्ध छैन। OOP का विशेषता: class, object, encapsulation, abstraction, inheritance, polymorphism, data hiding र message passing।"
    }
  },
  {
    "id": "g10.oop-cpp.q26",
    "subject": "grade10/oop-cpp",
    "unit": "u2",
    "topic": "structured-vs-oop",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What is the main difference between structured programming and object-oriented programming?",
      "ne": "Structured programming र object-oriented programming बीचको मुख्य फरक के हो?"
    },
    "options": [
      {
        "en": "Structured programming cannot use loops",
        "ne": "Structured programming मा loop प्रयोग गर्न मिल्दैन"
      },
      {
        "en": "Structured programming gives importance to functions; OOP gives importance to data bound with its functions",
        "ne": "Structured programming ले function लाई महत्त्व दिन्छ; OOP ले data र त्यसका function सँगै बाँधेर"
      },
      {
        "en": "OOP programs do not need to be compiled",
        "ne": "OOP प्रोग्राम compile गर्नु पर्दैन"
      },
      {
        "en": "Structured programming cannot use variables",
        "ne": "Structured programming मा variable प्रयोग गर्न मिल्दैन"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Structured programming divides a problem into functions, and data is passed around between them. OOP divides it into objects, each holding its own data together with the functions allowed to touch that data. That binding is what makes data hiding possible. Both use loops, variables and a compiler.",
      "ne": "Structured programming ले समस्यालाई function मा बाँड्छ, र data तिनीहरूबीच पठाइन्छ। OOP ले object मा बाँड्छ, र हरेक object ले आफ्नो data सँगै त्यो data छुन पाउने function पनि राख्छ। यही बन्धनले data hiding सम्भव बनाउँछ। दुवैमा loop, variable र compiler चाहिन्छ।"
    }
  },
  {
    "id": "g10.oop-cpp.q27",
    "subject": "grade10/oop-cpp",
    "unit": "u2",
    "topic": "tokens",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "In C++, <code>int</code>, <code>while</code> and <code>return</code> are examples of:",
      "ne": "C++ मा <code>int</code>, <code>while</code> र <code>return</code> कसका उदाहरण हुन्?"
    },
    "options": [
      {
        "en": "Identifiers",
        "ne": "Identifier"
      },
      {
        "en": "Keywords",
        "ne": "Keyword"
      },
      {
        "en": "Operators",
        "ne": "Operator"
      },
      {
        "en": "Literals",
        "ne": "Literal"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Keywords are words reserved by the language with a fixed meaning, so they cannot be used as names. An identifier is a name YOU choose, such as a variable or function name. Both are kinds of token, along with constants, strings, operators and punctuators.",
      "ne": "Keyword भनेका भाषाले आफ्नै लागि सुरक्षित राखेका, निश्चित अर्थ भएका शब्द हुन्, त्यसैले तिनलाई नामका रूपमा प्रयोग गर्न मिल्दैन। Identifier भनेको <b>तपाईंले</b> छानेको नाम — जस्तै variable वा function को नाम। दुवै token का किसिम हुन्, constant, string, operator र punctuator सँगै।"
    }
  },
  {
    "id": "g10.oop-cpp.q28",
    "subject": "grade10/oop-cpp",
    "unit": "u2",
    "topic": "identifiers",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which of these is a VALID C++ identifier?",
      "ne": "यीमध्ये कुन C++ को <b>मान्य</b> identifier हो?"
    },
    "options": [
      {
        "en": "2ndMarks",
        "ne": "2ndMarks"
      },
      {
        "en": "total marks",
        "ne": "total marks"
      },
      {
        "en": "_totalMarks",
        "ne": "_totalMarks"
      },
      {
        "en": "float",
        "ne": "float"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "An identifier may contain letters, digits and the underscore, and must not START with a digit. <code>_totalMarks</code> is fine. <code>2ndMarks</code> begins with a digit; <code>total marks</code> contains a space; <code>float</code> is a reserved keyword, so it cannot be used as a name.",
      "ne": "Identifier मा अक्षर, अंक र underscore हुन सक्छन्, तर अंकबाट <b>सुरु</b> हुनु हुँदैन। <code>_totalMarks</code> ठीक छ। <code>2ndMarks</code> अंकबाट सुरु भयो; <code>total marks</code> मा खाली ठाउँ छ; <code>float</code> सुरक्षित keyword भएकाले नाम बनाउन मिल्दैन।"
    }
  },
  {
    "id": "g10.oop-cpp.q29",
    "subject": "grade10/oop-cpp",
    "unit": "u2",
    "topic": "basic-io",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which statement correctly reads a number typed by the user into the variable <code>n</code>?",
      "ne": "प्रयोगकर्ताले टाइप गरेको सङ्ख्या <code>n</code> मा पढ्ने सही कथन कुन हो?"
    },
    "options": [
      {
        "en": "cin &lt;&lt; n;",
        "ne": "cin &lt;&lt; n;"
      },
      {
        "en": "cin &gt;&gt; n;",
        "ne": "cin &gt;&gt; n;"
      },
      {
        "en": "cout &gt;&gt; n;",
        "ne": "cout &gt;&gt; n;"
      },
      {
        "en": "cout &lt;&lt; n;",
        "ne": "cout &lt;&lt; n;"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Read the arrows as the direction the data travels. <code>cin &gt;&gt; n</code> moves data FROM the input stream INTO n. <code>cout &lt;&lt; n</code> moves it OUT of n to the screen. Writing <code>cin &lt;&lt; n</code> is the most common beginner error in this unit — the arrows point the wrong way.",
      "ne": "तीरलाई data कता जान्छ भन्ने दिशा ठान्नुहोस्। <code>cin &gt;&gt; n</code> ले input बाट <b>n भित्र</b> data लैजान्छ। <code>cout &lt;&lt; n</code> ले n बाट <b>बाहिर</b> स्क्रिनमा। <code>cin &lt;&lt; n</code> लेख्नु यस युनिटको सबैभन्दा सामान्य गल्ती हो — तीर उल्टो छ।"
    }
  },
  {
    "id": "g10.oop-cpp.q30",
    "subject": "grade10/oop-cpp",
    "unit": "u2",
    "topic": "program-structure",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What is the purpose of <code>#include &lt;iostream&gt;</code> at the top of a C++ program?",
      "ne": "C++ प्रोग्रामको सुरुमा <code>#include &lt;iostream&gt;</code> किन लेखिन्छ?"
    },
    "options": [
      {
        "en": "It makes the input and output objects such as cin and cout available",
        "ne": "यसले cin र cout जस्ता input–output object उपलब्ध गराउँछ"
      },
      {
        "en": "It starts the execution of the program",
        "ne": "यसले प्रोग्राम चल्न सुरु गर्छ"
      },
      {
        "en": "It declares the main function",
        "ne": "यसले main function घोषणा गर्छ"
      },
      {
        "en": "It converts the program into machine code",
        "ne": "यसले प्रोग्रामलाई मेसिन कोडमा बदल्छ"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "It is a preprocessor directive that pastes in the iostream header, which declares cin, cout and the stream operators. Without it the compiler does not know what cout is. Execution always begins at main, whatever headers are included.",
      "ne": "यो preprocessor directive हो, जसले iostream header भित्र्याउँछ — र त्यसैले cin, cout तथा stream operator घोषणा गर्छ। यो नभए compiler लाई cout के हो थाहा हुँदैन। जुनसुकै header राखे पनि प्रोग्राम सधैं main बाट सुरु हुन्छ।"
    }
  },
  {
    "id": "g10.oop-cpp.q31",
    "subject": "grade10/oop-cpp",
    "unit": "u2",
    "topic": "control-statements",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What is printed?<br><code>int i = 5;<br>do { cout &lt;&lt; i &lt;&lt; \" \"; i++; } while (i &lt; 3);</code>",
      "ne": "के छापिन्छ?<br><code>int i = 5;<br>do { cout &lt;&lt; i &lt;&lt; \" \"; i++; } while (i &lt; 3);</code>"
    },
    "options": [
      {
        "en": "Nothing is printed",
        "ne": "केही छापिँदैन"
      },
      {
        "en": "5",
        "ne": "5"
      },
      {
        "en": "5 6 7",
        "ne": "5 6 7"
      },
      {
        "en": "It never stops",
        "ne": "कहिल्यै रोकिँदैन"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A do…while tests its condition AFTER the body, so the body always runs at least once. 5 is printed, i becomes 6, and only then is 6 &lt; 3 tested — false, so the loop ends. Output is just 5. If this had been a plain while loop, the condition would have been tested first and nothing would have printed.",
      "ne": "do…while ले शर्त <b>पछि</b> जाँच्छ, त्यसैले body कम्तीमा एक पटक चल्छ। 5 छापिन्छ, i 6 हुन्छ, अनि मात्र 6 &lt; 3 जाँचिन्छ — गलत, त्यसैले loop सकिन्छ। आउटपुट 5 मात्र। यदि साधारण while भएको भए शर्त पहिले जाँचिन्थ्यो र केही छापिँदैनथ्यो।"
    }
  },
  {
    "id": "g10.oop-cpp.q32",
    "subject": "grade10/oop-cpp",
    "unit": "u2",
    "topic": "control-statements",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "In a C++ <code>switch</code> statement, what happens if <code>break</code> is left out of a matching case?",
      "ne": "C++ को <code>switch</code> मा मिल्ने case बाट <code>break</code> छुट्यो भने के हुन्छ?"
    },
    "options": [
      {
        "en": "The program will not compile",
        "ne": "प्रोग्राम compile हुँदैन"
      },
      {
        "en": "Only that case runs, as usual",
        "ne": "सामान्य रूपमा त्यही case मात्र चल्छ"
      },
      {
        "en": "Execution continues into the following cases",
        "ne": "त्यसपछिका case मा पनि चल्दै जान्छ"
      },
      {
        "en": "The switch is skipped completely",
        "ne": "पूरै switch छोडिन्छ"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "This is called fall-through: once a case matches, statements keep executing until a break or the end of the switch. It compiles happily, which is what makes it dangerous — the program runs and quietly produces the wrong answer. Fall-through is occasionally useful on purpose, but a missing break is usually a bug.",
      "ne": "यसलाई fall-through भनिन्छ: एउटा case मिलेपछि break नआएसम्म वा switch नसकिएसम्म कथन चल्दै जान्छन्। यो सजिलै compile हुन्छ — त्यही नै खतरा हो, किनकि प्रोग्राम चल्छ र चुपचाप गलत उत्तर दिन्छ। कहिलेकाहीं जानाजान fall-through राखिन्छ, तर छुटेको break प्रायः बग हो।"
    }
  },
  {
    "id": "g10.oop-cpp.q33",
    "subject": "grade10/oop-cpp",
    "unit": "u2",
    "topic": "data-types",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which data type should store a student's percentage such as 72.45?",
      "ne": "72.45 जस्तो विद्यार्थीको प्रतिशत राख्न कुन data type प्रयोग गर्नुपर्छ?"
    },
    "options": [
      {
        "en": "int",
        "ne": "int"
      },
      {
        "en": "char",
        "ne": "char"
      },
      {
        "en": "float",
        "ne": "float"
      },
      {
        "en": "bool",
        "ne": "bool"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "float stores numbers with a fractional part. Storing 72.45 in an int does not round it — it truncates to 72 and the .45 is gone silently, which is why marks calculations written with int come out slightly wrong. char holds a single character and bool holds only true or false.",
      "ne": "float ले दशमलव भएको सङ्ख्या राख्छ। 72.45 लाई int मा राख्दा यो गोलो हुँदैन — काटिएर 72 हुन्छ र .45 चुपचाप हराउँछ; त्यसैले int ले लेखिएको अंक गणना अलिअलि गलत आउँछ। char ले एउटै अक्षर र bool ले true वा false मात्र राख्छ।"
    }
  },
  {
    "id": "g10.oop-cpp.q34",
    "subject": "grade10/oop-cpp",
    "unit": "u2",
    "topic": "oop-applications",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which is a typical application area of object-oriented programming?",
      "ne": "Object-oriented programming को सामान्य प्रयोग क्षेत्र कुन हो?"
    },
    "options": [
      {
        "en": "Designing graphical user interfaces",
        "ne": "ग्राफिकल प्रयोगकर्ता इन्टरफेस बनाउनु"
      },
      {
        "en": "Increasing the clock speed of a processor",
        "ne": "प्रोसेसरको clock speed बढाउनु"
      },
      {
        "en": "Adding more RAM to a computer",
        "ne": "कम्प्युटरमा थप RAM राख्नु"
      },
      {
        "en": "Cleaning dust from a heatsink",
        "ne": "Heatsink को धुलो सफा गर्नु"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "GUI design is a classic OOP application: every window, button and text box is an object with its own data and behaviour. Other areas the syllabus lists include simulation and modelling, real-time systems, office automation and CAD. The other three options are hardware tasks, not programming ones.",
      "ne": "GUI डिजाइन OOP को उत्कृष्ट प्रयोग हो: हरेक window, button र text box आफ्नै data र व्यवहार भएको object हो। पाठ्यक्रमले simulation र modelling, real-time प्रणाली, कार्यालय स्वचालन र CAD पनि लेख्छ। बाँकी तीन हार्डवेयरका काम हुन्, प्रोग्रामिङका होइनन्।"
    }
  },
  {
    "id": "g10.oop-cpp.q35",
    "subject": "grade10/oop-cpp",
    "unit": "u2",
    "topic": "error-identification",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Why does this fail to compile?<br><code>int main() {<br>&nbsp; cout &lt;&lt; \"Marks: \" &lt;&lt; marks;<br>&nbsp; int marks = 80;<br>&nbsp; return 0;<br>}</code>",
      "ne": "यो किन compile हुँदैन?<br><code>int main() {<br>&nbsp; cout &lt;&lt; \"Marks: \" &lt;&lt; marks;<br>&nbsp; int marks = 80;<br>&nbsp; return 0;<br>}</code>"
    },
    "options": [
      {
        "en": "marks is used before it is declared",
        "ne": "marks घोषणा हुनुअघि नै प्रयोग गरियो"
      },
      {
        "en": "main must return void",
        "ne": "main ले void फर्काउनुपर्छ"
      },
      {
        "en": "A semicolon is missing",
        "ne": "Semicolon छुटेको छ"
      },
      {
        "en": "80 is too large for an int",
        "ne": "80 int का लागि धेरै ठूलो छ"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "C++ reads a function top to bottom, and a name must be declared before it is used. On the cout line the compiler has not met <code>marks</code> yet, so it reports an undeclared identifier. Moving the declaration above the cout fixes it. Note the error is at COMPILE time — the program never runs at all.",
      "ne": "C++ ले function लाई माथिबाट तल पढ्छ, र नाम प्रयोग गर्नुअघि घोषणा भइसक्नुपर्छ। cout भएको लाइनमा compiler ले <code>marks</code> भेटेकै छैन, त्यसैले undeclared identifier भन्छ। घोषणालाई cout भन्दा माथि सारे मिल्छ। ध्यान दिनुहोस्, त्रुटि <b>compile</b> कै बेला हुन्छ — प्रोग्राम चल्नै पाउँदैन।"
    }
  },
  {
    "id": "g10.oop-cpp.q36",
    "subject": "grade10/oop-cpp",
    "unit": "u2",
    "topic": "output-prediction",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What is printed?<br><code>for (int i = 1; i &lt;= 3; i++)<br>&nbsp; cout &lt;&lt; i * i &lt;&lt; \" \";</code>",
      "ne": "के छापिन्छ?<br><code>for (int i = 1; i &lt;= 3; i++)<br>&nbsp; cout &lt;&lt; i * i &lt;&lt; \" \";</code>"
    },
    "options": [
      {
        "en": "1 2 3",
        "ne": "1 2 3"
      },
      {
        "en": "1 4 9",
        "ne": "1 4 9"
      },
      {
        "en": "2 4 6",
        "ne": "2 4 6"
      },
      {
        "en": "1 4 9 16",
        "ne": "1 4 9 16"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The loop runs with i = 1, 2, 3 and prints i × i each time: 1, 4, 9. It stops when i becomes 4 because 4 &lt;= 3 is false, so 16 is never printed. Choosing 1 4 9 16 is the off-by-one slip — count how many times the condition is TRUE, not how many values i takes.",
      "ne": "Loop i = 1, 2, 3 मा चल्छ र हरेक पटक i × i छाप्छ: 1, 4, 9। i 4 हुँदा 4 &lt;= 3 गलत हुने भएकाले रोकिन्छ, त्यसैले 16 कहिल्यै छापिँदैन। 1 4 9 16 छान्नु एक-ले-चुक्ने गल्ती हो — i कति मान लिन्छ होइन, शर्त कति पटक <b>सही</b> हुन्छ गन्नुहोस्।"
    }
  },
  {
    "id": "g10.oop-cpp.q37",
    "subject": "grade10/oop-cpp",
    "unit": "u2",
    "topic": "data-hiding",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which OOP feature means that an object's internal data cannot be changed directly from outside?",
      "ne": "कुन OOP विशेषताले object को भित्री data बाहिरबाट सीधै बदल्न नसकिने बनाउँछ?"
    },
    "options": [
      {
        "en": "Inheritance",
        "ne": "Inheritance"
      },
      {
        "en": "Polymorphism",
        "ne": "Polymorphism"
      },
      {
        "en": "Data hiding",
        "ne": "Data hiding"
      },
      {
        "en": "Message passing",
        "ne": "Message passing"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "Data hiding means the data is declared private, so only the class's own member functions can reach it. Encapsulation is the binding of data and functions together; data hiding is what that binding lets you enforce. Inheritance passes members to a derived class and polymorphism gives one name several forms.",
      "ne": "Data hiding भनेको data लाई private घोषणा गर्नु, ताकि class कै member function ले मात्र छुन सकून्। Encapsulation भनेको data र function सँगै बाँध्नु; त्यही बन्धनले data hiding लागू गर्न दिन्छ। Inheritance ले derived class लाई member दिन्छ र polymorphism ले एउटै नामलाई धेरै रूप।"
    }
  },
  {
    "id": "g10.oop-cpp.q38",
    "subject": "grade10/oop-cpp",
    "unit": "u4",
    "topic": "abstraction-vs-encapsulation",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which statement best separates abstraction from encapsulation?",
      "ne": "Abstraction र encapsulation लाई सबैभन्दा राम्ररी छुट्याउने कथन कुन हो?"
    },
    "options": [
      {
        "en": "Abstraction hides complexity and shows only what is needed; encapsulation binds data with its functions and keeps it protected",
        "ne": "Abstraction ले जटिलता लुकाएर चाहिने मात्र देखाउँछ; encapsulation ले data लाई यसका function सँग बाँधेर सुरक्षित राख्छ"
      },
      {
        "en": "Abstraction applies only to classes; encapsulation applies only to functions",
        "ne": "Abstraction class मा मात्र लाग्छ; encapsulation function मा मात्र"
      },
      {
        "en": "They are two names for the same thing",
        "ne": "दुवै एउटै कुराका दुई नाम हुन्"
      },
      {
        "en": "Encapsulation happens at compile time; abstraction at run time",
        "ne": "Encapsulation compile बेला हुन्छ; abstraction चल्ने बेला"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Abstraction is about DESIGN — deciding what to show. Encapsulation is about IMPLEMENTATION — wrapping the data with the functions that may touch it. A car pedal is abstraction: you press it without knowing the engine. The sealed engine casing is encapsulation. They work together but are not the same, and the exam asks you to tell them apart.",
      "ne": "Abstraction <b>डिजाइन</b> को कुरा हो — के देखाउने भन्ने निर्णय। Encapsulation <b>कार्यान्वयन</b> को — data लाई छुन पाउने function सँगै बेर्ने काम। गाडीको पेडल abstraction हो: इन्जिन नजानी थिच्नुहुन्छ। बन्द इन्जिन बाकस encapsulation हो। सँगै काम गर्छन् तर एउटै होइनन्, र परीक्षाले छुट्याउन भन्छ।"
    }
  },
  {
    "id": "g10.oop-cpp.q39",
    "subject": "grade10/oop-cpp",
    "unit": "u4",
    "topic": "access-control",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "To achieve encapsulation in C++, data members are usually declared:",
      "ne": "C++ मा encapsulation ल्याउन data member प्रायः कसरी घोषणा गरिन्छ?"
    },
    "options": [
      {
        "en": "private, with public member functions to use them",
        "ne": "private, र तिनलाई प्रयोग गर्न public member function"
      },
      {
        "en": "public, so any part of the program can change them",
        "ne": "public, ताकि प्रोग्रामको जुनसुकै भागले बदल्न सकोस्"
      },
      {
        "en": "as global variables outside the class",
        "ne": "class बाहिर global variable का रूपमा"
      },
      {
        "en": "inside the main function",
        "ne": "main function भित्र"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Private data with public functions is the standard shape: outside code must go through a function, which can check the value before storing it. Making data public defeats the purpose entirely — anything could set a student's marks to −5. Global variables are the opposite of encapsulation.",
      "ne": "Private data र public function मानक ढाँचा हो: बाहिरको कोड function हुँदै आउनुपर्छ, र त्यो function ले राख्नुअघि मान जाँच्न सक्छ। Data public बनाउँदा उद्देश्य नै सकिन्छ — जसले पनि विद्यार्थीको अंक −5 बनाइदिन सक्छ। Global variable त encapsulation को ठीक उल्टो हो।"
    }
  },
  {
    "id": "g10.oop-cpp.q40",
    "subject": "grade10/oop-cpp",
    "unit": "u4",
    "topic": "abstraction-example",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Using <code>cout</code> without knowing how characters reach the screen is an everyday example of:",
      "ne": "अक्षर स्क्रिनसम्म कसरी पुग्छ नजानी <code>cout</code> प्रयोग गर्नु कसको दैनिक उदाहरण हो?"
    },
    "options": [
      {
        "en": "Inheritance",
        "ne": "Inheritance"
      },
      {
        "en": "Abstraction",
        "ne": "Abstraction"
      },
      {
        "en": "Overloading",
        "ne": "Overloading"
      },
      {
        "en": "Recursion",
        "ne": "Recursion"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "You are given a simple interface — <code>cout &lt;&lt; x</code> — and everything underneath it is hidden. That is abstraction: showing only what is needed to use the thing. The C++ library is itself built on this idea, which is why you can write a program on day one.",
      "ne": "तपाईंलाई सरल इन्टरफेस दिइएको छ — <code>cout &lt;&lt; x</code> — र मुनिको सबै लुकाइएको छ। यही abstraction हो: प्रयोग गर्न चाहिने मात्र देखाउनु। C++ library आफैँ यही विचारमा बनेको छ, त्यसैले पहिलो दिनै प्रोग्राम लेख्न सकिन्छ।"
    }
  },
  {
    "id": "g10.oop-cpp.q41",
    "subject": "grade10/oop-cpp",
    "unit": "u4",
    "topic": "encapsulation-benefit",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A class stores <code>age</code> privately and provides <code>setAge(int)</code>. What does this arrangement make possible that a public <code>age</code> does not?",
      "ne": "कुनै class ले <code>age</code> लाई private राख्छ र <code>setAge(int)</code> दिन्छ। Public <code>age</code> ले नदिने कुन कुरा यसले सम्भव बनाउँछ?"
    },
    "options": [
      {
        "en": "The value can be checked before it is stored",
        "ne": "राख्नुअघि मान जाँच्न सकिन्छ"
      },
      {
        "en": "The program runs faster",
        "ne": "प्रोग्राम छिटो चल्छ"
      },
      {
        "en": "The class needs less memory",
        "ne": "Class लाई कम मेमोरी चाहिन्छ"
      },
      {
        "en": "Inheritance becomes possible",
        "ne": "Inheritance सम्भव हुन्छ"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "The setter is a gate. It can reject a negative age, clamp an impossible one, or record that a change happened — none of which is possible when outside code writes the variable directly. Speed and memory are unchanged, and inheritance does not depend on access specifiers at all.",
      "ne": "Setter एउटा ढोका हो। यसले ऋणात्मक उमेर अस्वीकार गर्न, असम्भव मान सीमित गर्न, वा परिवर्तन भएको अभिलेख राख्न सक्छ — बाहिरको कोडले सीधै variable लेख्दा यीमध्ये केही पनि सम्भव हुँदैन। गति र मेमोरी उस्तै रहन्छ, र inheritance access specifier मा भर पर्दैन।"
    }
  },
  {
    "id": "g10.oop-cpp.q42",
    "subject": "grade10/oop-cpp",
    "unit": "u5",
    "topic": "inheritance-types",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "One base class has three separate derived classes. Which type of inheritance is this?",
      "ne": "एउटै base class का तीन छुट्टाछुट्टै derived class छन्। यो कुन किसिमको inheritance हो?"
    },
    "options": [
      {
        "en": "Single",
        "ne": "Single"
      },
      {
        "en": "Multilevel",
        "ne": "Multilevel"
      },
      {
        "en": "Multiple",
        "ne": "Multiple"
      },
      {
        "en": "Hierarchical",
        "ne": "Hierarchical"
      }
    ],
    "answer": 3,
    "explanation": {
      "en": "Hierarchical inheritance is one parent with many children — the picture branches downward. Multiple inheritance is the reverse: one child with many parents. Multilevel is a chain, A to B to C. Reading the SHAPE of the diagram is the fastest way to answer this kind of question.",
      "ne": "Hierarchical inheritance भनेको एउटा बाबु, धेरै छोरा — चित्र तलतिर फैलिन्छ। Multiple यसको उल्टो हो: एउटा छोरा, धेरै बाबु। Multilevel शृंखला हो, A देखि B देखि C। चित्रको <b>आकार</b> पढ्नु यस्ता प्रश्नको सबैभन्दा छिटो उत्तर हो।"
    }
  },
  {
    "id": "g10.oop-cpp.q43",
    "subject": "grade10/oop-cpp",
    "unit": "u5",
    "topic": "inheritance-access",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which members of a base class can a derived class NOT access directly?",
      "ne": "Base class का कुन member लाई derived class ले सीधै छुन <b>सक्दैन</b>?"
    },
    "options": [
      {
        "en": "public members",
        "ne": "public member"
      },
      {
        "en": "protected members",
        "ne": "protected member"
      },
      {
        "en": "private members",
        "ne": "private member"
      },
      {
        "en": "All members are accessible",
        "ne": "सबै member छुन मिल्छ"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "A derived class inherits the private members — they exist in the object and take up space — but it cannot name them. It must go through a public or protected function of the base. This is exactly why <code>protected</code> exists: it means \"private to the outside world, visible to my children\".",
      "ne": "Derived class ले private member <b>पाउँछ</b> — ती object मा हुन्छन् र ठाउँ ओगट्छन् — तर नाम लिएर छुन सक्दैन। Base कै public वा protected function हुँदै जानुपर्छ। <code>protected</code> हुनुको कारण ठ्याक्कै यही हो: \"बाहिरका लागि private, मेरा छोराछोरीका लागि देखिने\"।"
    }
  },
  {
    "id": "g10.oop-cpp.q44",
    "subject": "grade10/oop-cpp",
    "unit": "u5",
    "topic": "inheritance-syntax",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which line correctly derives <code>Student</code> publicly from <code>Person</code>?",
      "ne": "<code>Person</code> बाट <code>Student</code> लाई public रूपमा derive गर्ने सही लाइन कुन हो?"
    },
    "options": [
      {
        "en": "class Student : public Person { };",
        "ne": "class Student : public Person { };"
      },
      {
        "en": "class Student inherits Person { };",
        "ne": "class Student inherits Person { };"
      },
      {
        "en": "class Student extends Person { };",
        "ne": "class Student extends Person { };"
      },
      {
        "en": "class Person : public Student { };",
        "ne": "class Person : public Student { };"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "C++ uses a colon, then the access specifier, then the base class name. <code>extends</code> is Java and <code>inherits</code> is not a C++ keyword at all. Option 4 has the syntax right but the direction backwards — it would make Person inherit from Student, which is the wrong way round.",
      "ne": "C++ मा कोलन, अनि access specifier, अनि base class को नाम लेखिन्छ। <code>extends</code> Java को हो र <code>inherits</code> C++ को keyword नै होइन। चौथो विकल्पको वाक्य-संरचना ठीक छ तर दिशा उल्टो — यसले Person लाई Student बाट inherit गराउँछ, जुन उल्टो हो।"
    }
  },
  {
    "id": "g10.oop-cpp.q45",
    "subject": "grade10/oop-cpp",
    "unit": "u5",
    "topic": "inheritance-advantage",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What is the chief advantage of inheritance?",
      "ne": "Inheritance को मुख्य फाइदा के हो?"
    },
    "options": [
      {
        "en": "Code written once in the base class is reused by every derived class",
        "ne": "Base class मा एक पटक लेखेको कोड हरेक derived class ले पुनः प्रयोग गर्छ"
      },
      {
        "en": "Programs compile faster",
        "ne": "प्रोग्राम छिटो compile हुन्छ"
      },
      {
        "en": "Private members become public",
        "ne": "Private member public हुन्छन्"
      },
      {
        "en": "Objects use less memory",
        "ne": "Object ले कम मेमोरी खान्छ"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Reusability is the point: common behaviour lives in one tested place and every child gets it. That also makes a program easier to extend — a new derived class needs only what is different. Inheritance does not change access rules, and a derived object is normally LARGER, not smaller, since it carries the base part too.",
      "ne": "पुनः प्रयोग नै मुख्य कुरा हो: साझा व्यवहार एउटै परीक्षित ठाउँमा रहन्छ र हरेक छोराले पाउँछ। यसले विस्तार पनि सजिलो बनाउँछ — नयाँ derived class लाई फरक भएको कुरा मात्र चाहिन्छ। Inheritance ले पहुँचका नियम बदल्दैन, र derived object सामान्यतया <b>ठूलो</b> हुन्छ, सानो होइन — किनकि base को भाग पनि बोक्छ।"
    }
  },
  {
    "id": "g10.oop-cpp.q46",
    "subject": "grade10/oop-cpp",
    "unit": "u5",
    "topic": "hybrid-inheritance",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Class B and class C each inherit from A, and class D inherits from both B and C. What is this combination called, and what problem can it cause?",
      "ne": "Class B र C दुवैले A बाट inherit गर्छन्, र class D ले B र C दुवैबाट। यो संयोजनलाई के भनिन्छ, र यसले कुन समस्या ल्याउन सक्छ?"
    },
    "options": [
      {
        "en": "Multilevel inheritance; it causes slow compilation",
        "ne": "Multilevel inheritance; यसले compile ढिलो बनाउँछ"
      },
      {
        "en": "Hybrid inheritance; D may receive two copies of A's members",
        "ne": "Hybrid inheritance; D ले A का member को दुई प्रति पाउन सक्छ"
      },
      {
        "en": "Single inheritance; it causes no problem",
        "ne": "Single inheritance; कुनै समस्या हुँदैन"
      },
      {
        "en": "Hierarchical inheritance; it prevents objects being created",
        "ne": "Hierarchical inheritance; यसले object बन्नै दिँदैन"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "This diamond shape mixes hierarchical and multiple inheritance, so it is hybrid. D inherits A through B and again through C, so A's members arrive twice and a reference to one becomes ambiguous. C++ solves it with a virtual base class, which makes the compiler keep only one copy of A.",
      "ne": "यो हीरा आकारले hierarchical र multiple inheritance मिसाउँछ, त्यसैले hybrid हो। D ले A लाई B हुँदै र फेरि C हुँदै पाउँछ, त्यसैले A का member दुई पटक आउँछन् र कुनै एउटालाई बोलाउँदा अन्योल हुन्छ। C++ ले virtual base class ले समाधान गर्छ, जसले compiler लाई A को एउटै प्रति राख्न लगाउँछ।"
    }
  },
  {
    "id": "g10.oop-cpp.q47",
    "subject": "grade10/oop-cpp",
    "unit": "u6",
    "topic": "overloading-rules",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which pair of functions is a VALID overload?",
      "ne": "कुन जोडी function <b>मान्य</b> overload हो?"
    },
    "options": [
      {
        "en": "int add(int a, int b); and float add(int a, int b);",
        "ne": "int add(int a, int b); र float add(int a, int b);"
      },
      {
        "en": "int add(int a, int b); and int add(float a, float b);",
        "ne": "int add(int a, int b); र int add(float a, float b);"
      },
      {
        "en": "int add(int a, int b); and int add(int x, int y);",
        "ne": "int add(int a, int b); र int add(int x, int y);"
      },
      {
        "en": "int add(int a, int b); and int sum(int a, int b);",
        "ne": "int add(int a, int b); र int sum(int a, int b);"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Overloading needs the same name with a DIFFERENT parameter list — different types, or a different number of parameters. Option 2 changes the types, so it is valid. Option 1 differs only in return type, which C++ rejects. Option 3 only renames the parameters, so the two are identical. Option 4 has two different names, so it is not overloading at all.",
      "ne": "Overloading लाई उही नाम तर <b>फरक</b> parameter सूची चाहिन्छ — फरक किसिम, वा फरक सङ्ख्या। दोस्रोले किसिम बदल्छ, त्यसैले मान्य छ। पहिलोमा return type मात्र फरक छ, जसलाई C++ ले अस्वीकार गर्छ। तेस्रोले parameter को नाम मात्र बदल्छ, त्यसैले दुवै उही हुन्। चौथोमा नाम नै फरक छ, त्यसैले overloading होइन।"
    }
  },
  {
    "id": "g10.oop-cpp.q48",
    "subject": "grade10/oop-cpp",
    "unit": "u6",
    "topic": "polymorphism-types",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Compile-time polymorphism is also known as:",
      "ne": "Compile-time polymorphism लाई अर्को के भनिन्छ?"
    },
    "options": [
      {
        "en": "Dynamic binding",
        "ne": "Dynamic binding"
      },
      {
        "en": "Late binding",
        "ne": "Late binding"
      },
      {
        "en": "Static binding or early binding",
        "ne": "Static binding वा early binding"
      },
      {
        "en": "Virtual binding",
        "ne": "Virtual binding"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "If the compiler can tell which function will run just by reading the code, the decision is made early — static or early binding. That is overloading. When the decision can only be made while the program runs, using a virtual function through a base pointer, it is dynamic or late binding.",
      "ne": "कोड पढेरै कुन function चल्छ भनी compiler ले भन्न सक्छ भने निर्णय चाँडै हुन्छ — static वा early binding। त्यो overloading हो। Base pointer हुँदै virtual function प्रयोग गर्दा निर्णय प्रोग्राम चल्दा मात्र हुन सक्छ भने त्यो dynamic वा late binding हो।"
    }
  },
  {
    "id": "g10.oop-cpp.q49",
    "subject": "grade10/oop-cpp",
    "unit": "u6",
    "topic": "virtual-output",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A base class <code>Shape</code> has <code>void draw()</code> (NOT virtual) and <code>Circle</code> overrides it. With <code>Shape* s = new Circle(); s-&gt;draw();</code> which runs?",
      "ne": "Base class <code>Shape</code> मा <code>void draw()</code> छ (virtual <b>होइन</b>) र <code>Circle</code> ले त्यसलाई override गर्छ। <code>Shape* s = new Circle(); s-&gt;draw();</code> मा कुन चल्छ?"
    },
    "options": [
      {
        "en": "Circle's draw(), because the object is a Circle",
        "ne": "Circle को draw(), किनकि object Circle हो"
      },
      {
        "en": "Shape's draw(), because the pointer is a Shape and the function is not virtual",
        "ne": "Shape को draw(), किनकि pointer Shape हो र function virtual छैन"
      },
      {
        "en": "Both run, one after the other",
        "ne": "दुवै एकपछि अर्को चल्छन्"
      },
      {
        "en": "The program will not compile",
        "ne": "प्रोग्राम compile हुँदैन"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Without <code>virtual</code> the compiler decides from the POINTER's type, not the object's, so Shape's version runs even though the object really is a Circle. Adding <code>virtual</code> to the base function is what defers the decision to run time and makes Circle's version run. This single keyword is the most examined point in the unit.",
      "ne": "<code>virtual</code> नभए compiler ले object होइन, <b>pointer</b> को किसिम हेरेर निर्णय गर्छ — त्यसैले object साँच्चै Circle भए पनि Shape कै संस्करण चल्छ। Base function मा <code>virtual</code> थप्दा निर्णय चल्ने बेलासम्म पर सर्छ र Circle कै संस्करण चल्छ। यस युनिटमा सबैभन्दा बढी सोधिने बिन्दु यही एउटा keyword हो।"
    }
  },
  {
    "id": "g10.oop-cpp.q50",
    "subject": "grade10/oop-cpp",
    "unit": "u2",
    "topic": "cin-extraction",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "This program will not compile. Which line is wrong, and why?<br><code>int n;<br>cout &lt;&lt; \"Enter n: \";<br>cin &lt;&lt; n;<br>cout &lt;&lt; n;</code>",
      "ne": "यो प्रोग्राम compile हुँदैन। कुन हरफ गलत छ, र किन?<br><code>int n;<br>cout &lt;&lt; \"Enter n: \";<br>cin &lt;&lt; n;<br>cout &lt;&lt; n;</code>"
    },
    "options": [
      {
        "en": "Line 3 — cin takes >> (extraction), not <<",
        "ne": "हरफ ३ — cin लाई >> (extraction) चाहिन्छ, << होइन"
      },
      {
        "en": "Line 1 — n must be given a value when it is declared",
        "ne": "हरफ १ — n घोषणा गर्दै मान दिनुपर्छ"
      },
      {
        "en": "Line 2 — a string cannot be sent to cout",
        "ne": "हरफ २ — cout मा string पठाउन मिल्दैन"
      },
      {
        "en": "Line 4 — the same variable cannot be printed twice",
        "ne": "हरफ ४ — उही variable दुई पटक छाप्न मिल्दैन"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "The arrows point the way the data travels. <code>cout &lt;&lt;</code> pushes a value OUT to the screen; <code>cin &gt;&gt;</code> pulls a value IN from the keyboard. Written as <code>cin &lt;&lt; n</code> the compiler looks for a way to insert into an input stream, finds none, and stops — so this is a compile error, not a wrong answer at run time. An uninitialised <code>int n;</code> is perfectly legal, which is why option 2 is the tempting wrong one.",
      "ne": "तीरले data कुन दिशामा जान्छ देखाउँछ। <code>cout &lt;&lt;</code> ले मान पर्दामा <b>बाहिर</b> पठाउँछ; <code>cin &gt;&gt;</code> ले किबोर्डबाट <b>भित्र</b> तान्छ। <code>cin &lt;&lt; n</code> लेख्दा compiler ले input stream भित्र हाल्ने उपाय खोज्छ, पाउँदैन, र रोकिन्छ — त्यसैले यो चल्दाको गलत उत्तर होइन, compile त्रुटि हो। <code>int n;</code> लाई मान नदिई छोड्नु पूर्ण रूपमा वैध छ, त्यसैले दोस्रो विकल्प आकर्षक गलत उत्तर हो।"
    }
  },
  {
    "id": "g10.oop-cpp.q51",
    "subject": "grade10/oop-cpp",
    "unit": "u2",
    "topic": "switch-fallthrough",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What exactly is printed?<br><code>int x = 2;<br>switch (x) {<br>&nbsp; case 1: cout &lt;&lt; \"A\";<br>&nbsp; case 2: cout &lt;&lt; \"B\";<br>&nbsp; case 3: cout &lt;&lt; \"C\";<br>&nbsp; default: cout &lt;&lt; \"D\";<br>}</code>",
      "ne": "ठ्याक्कै के छापिन्छ?<br><code>int x = 2;<br>switch (x) {<br>&nbsp; case 1: cout &lt;&lt; \"A\";<br>&nbsp; case 2: cout &lt;&lt; \"B\";<br>&nbsp; case 3: cout &lt;&lt; \"C\";<br>&nbsp; default: cout &lt;&lt; \"D\";<br>}</code>"
    },
    "options": [
      {
        "en": "BCD",
        "ne": "BCD"
      },
      {
        "en": "B",
        "ne": "B"
      },
      {
        "en": "BC",
        "ne": "BC"
      },
      {
        "en": "ABCD",
        "ne": "ABCD"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "A <code>switch</code> JUMPS to the matching label and then keeps running straight down — the later <code>case</code> labels are only labels, not barriers. There is no <code>break</code> anywhere, so after printing B it carries on into case 3 and then default, giving BCD. <code>default</code> is not skipped just because a case already matched. Add <code>break;</code> to each case and the answer becomes B.",
      "ne": "<code>switch</code> ले मिल्ने label मा <b>हाम फाल्छ</b> र त्यसपछि सिधै तल चलिरहन्छ — पछिका <code>case</code> label मात्र हुन्, बार होइनन्। कतै <code>break</code> छैन, त्यसैले B छापेपछि case 3 र त्यसपछि default मा पनि पस्छ, र BCD आउँछ। कुनै case मिलेकै कारण <code>default</code> छुट्दैन। हरेक case मा <code>break;</code> थपे उत्तर B बन्छ।"
    }
  },
  {
    "id": "g10.oop-cpp.q52",
    "subject": "grade10/oop-cpp",
    "unit": "u5",
    "topic": "private-base-access",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Why does the marked line fail to compile?<br><code>class A { private: int x; };<br>class B : public A {<br>public:<br>&nbsp; void show() { cout &lt;&lt; x; }&nbsp; // this line<br>};</code>",
      "ne": "चिन्ह लगाइएको हरफ किन compile हुँदैन?<br><code>class A { private: int x; };<br>class B : public A {<br>public:<br>&nbsp; void show() { cout &lt;&lt; x; }&nbsp; // यही हरफ<br>};</code>"
    },
    "options": [
      {
        "en": "A private base member is not accessible to a derived class — it would have to be protected",
        "ne": "Base को private मेम्बर derived class ले छुन पाउँदैन — त्यो protected हुनुपर्छ"
      },
      {
        "en": "public inheritance makes x public, so it cannot be printed",
        "ne": "public inheritance ले x लाई public बनाउँछ, त्यसैले छाप्न मिल्दैन"
      },
      {
        "en": "x must be given a value before it can be used",
        "ne": "प्रयोग गर्नुअघि x लाई मान दिनुपर्छ"
      },
      {
        "en": "B must declare its own x before using it",
        "ne": "B ले प्रयोग गर्नुअघि आफ्नै x घोषणा गर्नुपर्छ"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "<code>private</code> means \"this class only\", and inheriting does not loosen it — <code>x</code> is inherited by B but B is not allowed to touch it. <code>protected</code> is the specifier that exists for exactly this situation: visible to derived classes, still hidden from the outside world. Note that the inheritance mode (<code>public</code> here) changes what happens to the base's public and protected members; it never grants access to its private ones.",
      "ne": "<code>private</code> को अर्थ \"यही class मात्र\" हो, र inheritance ले यो खुकुलो बनाउँदैन — <code>x</code> B मा सर्छ तर B ले छुन पाउँदैन। यस्तै अवस्थाका लागि बनेको specifier <code>protected</code> हो: derived class ले देख्छ, बाहिरी संसारले देख्दैन। Inheritance mode (यहाँ <code>public</code>) ले base का public र protected मेम्बरको हैसियत बदल्छ; private मेम्बरमा पहुँच कहिल्यै दिँदैन।"
    }
  }
]);

QuizService.registerBank("grade10/digital-design", [
  {
    "id": "g10.dd.q001",
    "subject": "grade10/digital-design",
    "unit": "u2",
    "topic": "gate-definition",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A logic gate produces how many outputs?",
      "ne": "एउटा लजिक गेटले कति वटा आउटपुट दिन्छ?"
    },
    "options": [
      {
        "en": "One output only",
        "ne": "एउटा मात्र आउटपुट"
      },
      {
        "en": "Two outputs",
        "ne": "दुई आउटपुट"
      },
      {
        "en": "The same number as its inputs",
        "ne": "इनपुट जति नै"
      },
      {
        "en": "It depends on the gate",
        "ne": "गेटअनुसार फरक"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "A gate may take many inputs but always produces exactly one binary output, decided by its fixed rule.",
      "ne": "गेटले धेरै इनपुट लिन सक्छ तर आउटपुट सधैं एउटै हुन्छ, जुन त्यसको निश्चित नियमले तय गर्छ।"
    }
  },
  {
    "id": "g10.dd.q002",
    "subject": "grade10/digital-design",
    "unit": "u2",
    "topic": "and-gate",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "An AND gate gives output 1 when:",
      "ne": "AND गेटले कहिले आउटपुट 1 दिन्छ?"
    },
    "options": [
      {
        "en": "At least one input is 1",
        "ne": "कम्तीमा एउटा इनपुट 1 हुँदा"
      },
      {
        "en": "All inputs are 1",
        "ne": "सबै इनपुट 1 हुँदा"
      },
      {
        "en": "All inputs are 0",
        "ne": "सबै इनपुट 0 हुँदा"
      },
      {
        "en": "The inputs are different",
        "ne": "इनपुट फरक हुँदा"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "AND is strict: a single 0 on any input forces the output to 0. Only 1·1 gives 1.",
      "ne": "AND कडा हुन्छ: कुनै एउटा इनपुट 0 भयो भने आउटपुट 0 नै हुन्छ। 1·1 हुँदा मात्र 1 आउँछ।"
    }
  },
  {
    "id": "g10.dd.q003",
    "subject": "grade10/digital-design",
    "unit": "u2",
    "topic": "or-gate",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "For an OR gate with A = 0 and B = 0, the output Y is:",
      "ne": "OR गेटमा A = 0 र B = 0 हुँदा आउटपुट Y कति हुन्छ?"
    },
    "options": [
      {
        "en": "0",
        "ne": "0"
      },
      {
        "en": "1",
        "ne": "1"
      },
      {
        "en": "Undefined",
        "ne": "अनिश्चित"
      },
      {
        "en": "Depends on the voltage",
        "ne": "भोल्टेजमा भर पर्छ"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "OR needs at least one input to be 1. With every input 0 the output is 0 — this is the only row where OR gives 0.",
      "ne": "OR लाई कम्तीमा एउटा इनपुट 1 चाहिन्छ। सबै इनपुट 0 हुँदा आउटपुट 0 हुन्छ — OR ले 0 दिने एउटै पङ्क्ति यही हो।"
    }
  },
  {
    "id": "g10.dd.q004",
    "subject": "grade10/digital-design",
    "unit": "u2",
    "topic": "nand-gate",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A NAND gate has A = 1 and B = 1. The output is:",
      "ne": "NAND गेटमा A = 1 र B = 1 छ। आउटपुट कति हुन्छ?"
    },
    "options": [
      {
        "en": "1",
        "ne": "1"
      },
      {
        "en": "0",
        "ne": "0"
      },
      {
        "en": "Same as input A",
        "ne": "इनपुट A जस्तै"
      },
      {
        "en": "Cannot be determined",
        "ne": "निर्धारण गर्न सकिँदैन"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Do the AND first: 1 · 1 = 1. The circle on the nose then inverts it, so Y = 0. This is the only row where NAND gives 0.",
      "ne": "पहिले AND गर्नुहोस्: 1 · 1 = 1। अनि नाकको गोलोले उल्टाउँछ, त्यसैले Y = 0। NAND ले 0 दिने एउटै पङ्क्ति यही हो।"
    }
  },
  {
    "id": "g10.dd.q005",
    "subject": "grade10/digital-design",
    "unit": "u2",
    "topic": "nor-gate",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A NOR gate gives output 1 only when:",
      "ne": "NOR गेटले कहिले मात्र आउटपुट 1 दिन्छ?"
    },
    "options": [
      {
        "en": "All inputs are 0",
        "ne": "सबै इनपुट 0 हुँदा"
      },
      {
        "en": "All inputs are 1",
        "ne": "सबै इनपुट 1 हुँदा"
      },
      {
        "en": "Exactly one input is 1",
        "ne": "ठ्याक्कै एउटा इनपुट 1 हुँदा"
      },
      {
        "en": "The inputs are different",
        "ne": "इनपुट फरक हुँदा"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "NOR is OR followed by NOT. OR gives 0 only when every input is 0, so NOR gives 1 only in that row.",
      "ne": "NOR भनेको OR पछि NOT हो। सबै इनपुट 0 हुँदा मात्र OR ले 0 दिन्छ, त्यसैले त्यही पङ्क्तिमा मात्र NOR ले 1 दिन्छ।"
    }
  },
  {
    "id": "g10.dd.q006",
    "subject": "grade10/digital-design",
    "unit": "u2",
    "topic": "universal-gates",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which of the following pairs are the universal gates?",
      "ne": "तलमध्ये कुन जोडी universal गेट हुन्?"
    },
    "options": [
      {
        "en": "AND and OR",
        "ne": "AND र OR"
      },
      {
        "en": "NOT and AND",
        "ne": "NOT र AND"
      },
      {
        "en": "NAND and NOR",
        "ne": "NAND र NOR"
      },
      {
        "en": "XOR and NOT",
        "ne": "XOR र NOT"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "NAND and NOR are universal because every other gate can be built using only that one type of gate.",
      "ne": "अरू सबै गेट एउटै किसिमको गेटबाट बनाउन सकिने भएकाले NAND र NOR universal हुन्।"
    }
  },
  {
    "id": "g10.dd.q007",
    "subject": "grade10/digital-design",
    "unit": "u2",
    "topic": "universal-gates",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "How is a NOT gate made from a single NAND gate?",
      "ne": "एउटै NAND गेटबाट NOT गेट कसरी बनाइन्छ?"
    },
    "options": [
      {
        "en": "Join both inputs together and feed A into them",
        "ne": "दुवै इनपुट जोडेर A दिने"
      },
      {
        "en": "Connect one input to 0",
        "ne": "एउटा इनपुटलाई 0 मा जोड्ने"
      },
      {
        "en": "Connect the output back to the input",
        "ne": "आउटपुटलाई फेरि इनपुटमा जोड्ने"
      },
      {
        "en": "It cannot be done with one NAND",
        "ne": "एउटै NAND ले हुँदैन"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Joining the inputs makes both of them A, so the output is (A · A)' = A', which is NOT A.",
      "ne": "इनपुट जोड्दा दुवै A हुन्छन्, त्यसैले आउटपुट (A · A)' = A' हुन्छ, जुन NOT A नै हो।"
    }
  },
  {
    "id": "g10.dd.q008",
    "subject": "grade10/digital-design",
    "unit": "u2",
    "topic": "de-morgan",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "De Morgan's first theorem states that (A · B)' equals:",
      "ne": "डी–मर्गनको पहिलो नियमअनुसार (A · B)' बराबर के हुन्छ?"
    },
    "options": [
      {
        "en": "A' · B'",
        "ne": "A' · B'"
      },
      {
        "en": "A' + B'",
        "ne": "A' + B'"
      },
      {
        "en": "A + B",
        "ne": "A + B"
      },
      {
        "en": "A · B",
        "ne": "A · B"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Break the bar and change the sign: the dot becomes a plus. Check with A = 1, B = 0 — both sides give 1.",
      "ne": "बार फुटाउनुहोस् र चिन्ह बदल्नुहोस्: डट प्लस हुन्छ। A = 1, B = 0 राखेर जाँच्नुहोस् — दुवैतिर 1 आउँछ।"
    }
  },
  {
    "id": "g10.dd.q009",
    "subject": "grade10/digital-design",
    "unit": "u2",
    "topic": "de-morgan",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "De Morgan's second theorem states that (A + B)' equals:",
      "ne": "डी–मर्गनको दोस्रो नियमअनुसार (A + B)' बराबर के हुन्छ?"
    },
    "options": [
      {
        "en": "A' + B'",
        "ne": "A' + B'"
      },
      {
        "en": "A' · B'",
        "ne": "A' · B'"
      },
      {
        "en": "A · B",
        "ne": "A · B"
      },
      {
        "en": "(A · B)'",
        "ne": "(A · B)'"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Same rule the other way round: break the bar, and the plus becomes a dot.",
      "ne": "उही नियम उल्टो तर्फ: बार फुटाउने, र प्लस डट बन्छ।"
    }
  },
  {
    "id": "g10.dd.q010",
    "subject": "grade10/digital-design",
    "unit": "u2",
    "topic": "truth-table",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "How many rows does the truth table of a 3-input gate have?",
      "ne": "३ इनपुट भएको गेटको ट्रुथ टेबलमा कति पङ्क्ति हुन्छन्?"
    },
    "options": [
      {
        "en": "3",
        "ne": "३"
      },
      {
        "en": "6",
        "ne": "६"
      },
      {
        "en": "8",
        "ne": "८"
      },
      {
        "en": "9",
        "ne": "९"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "The number of rows is 2 to the power n, where n is the number of inputs. 2³ = 8.",
      "ne": "पङ्क्ति सङ्ख्या 2 को घात n हुन्छ, जहाँ n इनपुटको सङ्ख्या हो। 2³ = 8।"
    }
  },
  {
    "id": "g10.dd.q011",
    "subject": "grade10/digital-design",
    "unit": "u2",
    "topic": "xor-gate",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "An XOR gate gives output 1 when:",
      "ne": "XOR गेटले कहिले आउटपुट 1 दिन्छ?"
    },
    "options": [
      {
        "en": "Both inputs are the same",
        "ne": "दुवै इनपुट उस्तै हुँदा"
      },
      {
        "en": "The two inputs are different",
        "ne": "दुई इनपुट फरक हुँदा"
      },
      {
        "en": "Both inputs are 1",
        "ne": "दुवै इनपुट 1 हुँदा"
      },
      {
        "en": "Both inputs are 0",
        "ne": "दुवै इनपुट 0 हुँदा"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "XOR is the \"different\" gate: 0⊕1 and 1⊕0 give 1, while 0⊕0 and 1⊕1 give 0. This is the SUM output of a half adder.",
      "ne": "XOR \"फरक\" गेट हो: 0⊕1 र 1⊕0 ले 1 दिन्छन्, 0⊕0 र 1⊕1 ले 0। यही नै half adder को SUM आउटपुट हो।"
    }
  },
  {
    "id": "g10.dd.q012",
    "subject": "grade10/digital-design",
    "unit": "u2",
    "topic": "notation",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "The Boolean expression Y = A + B represents which gate?",
      "ne": "Y = A + B भन्ने बुलियन अभिव्यक्तिले कुन गेट जनाउँछ?"
    },
    "options": [
      {
        "en": "AND gate",
        "ne": "AND गेट"
      },
      {
        "en": "OR gate",
        "ne": "OR गेट"
      },
      {
        "en": "NOR gate",
        "ne": "NOR गेट"
      },
      {
        "en": "XOR gate",
        "ne": "XOR गेट"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "In Boolean algebra the plus sign means OR and the dot means AND. It is not ordinary addition — 1 + 1 = 1 here.",
      "ne": "बुलियन बीजगणितमा प्लसको अर्थ OR र डटको अर्थ AND हो। यो साधारण जोड होइन — यहाँ 1 + 1 = 1 हुन्छ।"
    }
  },
  {
    "id": "g10.dd.q013",
    "subject": "grade10/digital-design",
    "unit": "u2",
    "topic": "symbols",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What does a small circle drawn on the nose of a gate symbol mean?",
      "ne": "गेटको चिन्हको नाकमा कोरिएको सानो गोलोको अर्थ के हो?"
    },
    "options": [
      {
        "en": "The gate is faster",
        "ne": "गेट छिटो चल्छ"
      },
      {
        "en": "The output is inverted",
        "ne": "आउटपुट उल्टिन्छ"
      },
      {
        "en": "The gate has three inputs",
        "ne": "गेटमा तीन इनपुट छन्"
      },
      {
        "en": "The gate is universal",
        "ne": "गेट universal हो"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The circle means \"and then invert\". It is the only difference between AND and NAND, and between OR and NOR.",
      "ne": "गोलोको अर्थ \"अनि उल्टाउने\" हो। AND र NAND बीचको, अनि OR र NOR बीचको एउटै फरक यही हो।"
    }
  },
  {
    "id": "g10.dd.q014",
    "subject": "grade10/digital-design",
    "unit": "u2",
    "topic": "nand-gate",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "For how many of the four input combinations does a 2-input NAND gate output 1?",
      "ne": "२ इनपुट भएको NAND गेटले चारमध्ये कति इनपुट जोडीमा 1 दिन्छ?"
    },
    "options": [
      {
        "en": "1",
        "ne": "१"
      },
      {
        "en": "2",
        "ne": "२"
      },
      {
        "en": "3",
        "ne": "३"
      },
      {
        "en": "4",
        "ne": "४"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "NAND is 0 only for 1·1. The other three rows — 00, 01, 10 — all give 1.",
      "ne": "NAND ले 1·1 मा मात्र 0 दिन्छ। बाँकी तीन पङ्क्ति — 00, 01, 10 — मा 1 नै आउँछ।"
    }
  },
  {
    "id": "g10.dd.q015",
    "subject": "grade10/digital-design",
    "unit": "u2",
    "topic": "de-morgan",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A student writes (A · B)′ = A′ · B′. Why is this wrong?",
      "ne": "कुनै विद्यार्थीले (A · B)′ = A′ · B′ लेख्यो। यो किन गलत हो?"
    },
    "options": [
      {
        "en": "The bar cannot be broken at all",
        "ne": "बार फुटाउनै मिल्दैन"
      },
      {
        "en": "The sign must change when the bar is broken",
        "ne": "बार फुट्दा चिन्ह पनि बदलिनुपर्छ"
      },
      {
        "en": "De Morgan applies only to three variables",
        "ne": "डी–मर्गन तीन चलमा मात्र लागू हुन्छ"
      },
      {
        "en": "It is actually correct",
        "ne": "यो त सही नै हो"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Breaking the bar also flips the operator, so the dot must become a plus. Test it with A = 1, B = 0: the left side is 1 but the wrong right side gives 0.",
      "ne": "बार फुटाउँदा अपरेटर पनि बदलिन्छ, त्यसैले डट प्लस हुनुपर्छ। A = 1, B = 0 राखेर जाँच्नुहोस्: बायाँ 1 तर गलत दायाँ 0 आउँछ।"
    }
  },
  {
    "id": "g10.dd.q016",
    "subject": "grade10/digital-design",
    "unit": "u2",
    "topic": "gate-definition",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "In digital electronics, binary 1 usually represents:",
      "ne": "डिजिटल इलेक्ट्रोनिक्समा binary 1 ले प्रायः केलाई जनाउँछ?"
    },
    "options": [
      {
        "en": "Low voltage / false",
        "ne": "कम भोल्टेज / असत्य"
      },
      {
        "en": "High voltage / true",
        "ne": "बढी भोल्टेज / सत्य"
      },
      {
        "en": "No connection",
        "ne": "जोडिएको छैन"
      },
      {
        "en": "An error state",
        "ne": "त्रुटि अवस्था"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "1 stands for high voltage, true, or on; 0 stands for low voltage, false, or off. Gates work only with these two levels.",
      "ne": "1 ले बढी भोल्टेज, सत्य वा खुला जनाउँछ; 0 ले कम भोल्टेज, असत्य वा बन्द। गेट यी दुई स्तरमा मात्र चल्छन्।"
    }
  },
  {
    "id": "g10.dd.q017",
    "subject": "grade10/digital-design",
    "unit": "u2",
    "topic": "not-gate",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "How many inputs does a NOT gate have?",
      "ne": "NOT गेटमा कति इनपुट हुन्छन्?"
    },
    "options": [
      {
        "en": "One",
        "ne": "एक"
      },
      {
        "en": "Two",
        "ne": "दुई"
      },
      {
        "en": "Three",
        "ne": "तीन"
      },
      {
        "en": "Any number",
        "ne": "जति पनि"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "NOT, also called an inverter, takes exactly one input and gives its opposite. Its truth table has only 2 rows.",
      "ne": "NOT लाई inverter पनि भनिन्छ; यसले ठ्याक्कै एउटा इनपुट लिन्छ र त्यसको उल्टो दिन्छ। यसको ट्रुथ टेबलमा २ पङ्क्ति मात्र हुन्छन्।"
    }
  },
  {
    "id": "g10.dd.q018",
    "subject": "grade10/digital-design",
    "unit": "u2",
    "topic": "symbols",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which gate symbol has a flat back and a rounded nose?",
      "ne": "कुन गेटको चिन्हमा पछाडि सम्म र नाक गोलो हुन्छ?"
    },
    "options": [
      {
        "en": "OR",
        "ne": "OR"
      },
      {
        "en": "AND",
        "ne": "AND"
      },
      {
        "en": "NOT",
        "ne": "NOT"
      },
      {
        "en": "XOR",
        "ne": "XOR"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "AND is the D-shape: flat back, round nose. OR has a curved back and a pointed nose. NOT is a triangle.",
      "ne": "AND D आकारको हुन्छ: पछाडि सम्म, नाक गोलो। OR को पछाडि खुम्चिएको र नाक चुच्चो। NOT त्रिकोण हो।"
    }
  },
  {
    "id": "g10.dd.q101",
    "subject": "grade10/digital-design",
    "unit": "u1",
    "topic": "base",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "The base of the hexadecimal number system is:",
      "ne": "हेक्साडेसिमल संख्या प्रणालीको base कति हो?"
    },
    "options": [
      {
        "en": "8",
        "ne": "८"
      },
      {
        "en": "10",
        "ne": "१०"
      },
      {
        "en": "16",
        "ne": "१६"
      },
      {
        "en": "2",
        "ne": "२"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "Hexadecimal uses sixteen digits: 0 to 9 and then A to F. The base is the count of available digits.",
      "ne": "हेक्साडेसिमलले सोह्र अङ्क प्रयोग गर्छ: ० देखि ९ र त्यसपछि A देखि F। प्रयोग हुने अङ्कको सङ्ख्या नै base हो।"
    }
  },
  {
    "id": "g10.dd.q102",
    "subject": "grade10/digital-design",
    "unit": "u1",
    "topic": "conversion",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What is (1101)₂ in decimal?",
      "ne": "(1101)₂ लाई दशमलवमा लेख्दा कति हुन्छ?"
    },
    "options": [
      {
        "en": "11",
        "ne": "११"
      },
      {
        "en": "13",
        "ne": "१३"
      },
      {
        "en": "15",
        "ne": "१५"
      },
      {
        "en": "26",
        "ne": "२६"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Multiply each bit by its place value: 8 + 4 + 0 + 1 = 13.",
      "ne": "हरेक बिटलाई त्यसको स्थानीय मानले गुणा गर्नुहोस्: 8 + 4 + 0 + 1 = 13।"
    }
  },
  {
    "id": "g10.dd.q103",
    "subject": "grade10/digital-design",
    "unit": "u1",
    "topic": "conversion",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Converting decimal 25 to binary gives:",
      "ne": "दशमलव 25 लाई binary मा बदल्दा कति हुन्छ?"
    },
    "options": [
      {
        "en": "10011",
        "ne": "10011"
      },
      {
        "en": "11001",
        "ne": "11001"
      },
      {
        "en": "10101",
        "ne": "10101"
      },
      {
        "en": "11010",
        "ne": "11010"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Divide by 2 repeatedly and read the remainders upwards: 25 = 16 + 8 + 1 = 11001.",
      "ne": "बारम्बार 2 ले भाग गरेर बाँकीलाई तलबाट माथि पढ्नुहोस्: 25 = 16 + 8 + 1 = 11001।"
    }
  },
  {
    "id": "g10.dd.q104",
    "subject": "grade10/digital-design",
    "unit": "u1",
    "topic": "complement",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "The 1's complement of 1010 is:",
      "ne": "1010 को 1’s complement कति हो?"
    },
    "options": [
      {
        "en": "1011",
        "ne": "1011"
      },
      {
        "en": "0101",
        "ne": "0101"
      },
      {
        "en": "0110",
        "ne": "0110"
      },
      {
        "en": "1111",
        "ne": "1111"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The 1's complement flips every bit: each 1 becomes 0 and each 0 becomes 1. Nothing is added.",
      "ne": "1’s complement ले हरेक बिट उल्टाउँछ: 1 भए 0, 0 भए 1। केही जोडिँदैन।"
    }
  },
  {
    "id": "g10.dd.q105",
    "subject": "grade10/digital-design",
    "unit": "u1",
    "topic": "complement",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "The 2's complement of 0110 is:",
      "ne": "0110 को 2’s complement कति हो?"
    },
    "options": [
      {
        "en": "1001",
        "ne": "1001"
      },
      {
        "en": "1010",
        "ne": "1010"
      },
      {
        "en": "0111",
        "ne": "0111"
      },
      {
        "en": "1110",
        "ne": "1110"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Invert to get 1001, then add 1: 1001 + 1 = 1010. Forgetting the +1 is the usual mistake.",
      "ne": "उल्टाउँदा 1001 आउँछ, अनि 1 जोड्नुहोस्: 1001 + 1 = 1010। +1 बिर्सनु नै सामान्य गल्ती हो।"
    }
  },
  {
    "id": "g10.dd.q106",
    "subject": "grade10/digital-design",
    "unit": "u1",
    "topic": "arithmetic",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "In binary addition, 1 + 1 equals:",
      "ne": "Binary जोडमा 1 + 1 कति हुन्छ?"
    },
    "options": [
      {
        "en": "2",
        "ne": "2"
      },
      {
        "en": "10 — write 0 and carry 1",
        "ne": "10 — 0 लेख्ने र 1 क्यारी"
      },
      {
        "en": "11",
        "ne": "11"
      },
      {
        "en": "0 with no carry",
        "ne": "0, क्यारी बिना"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "There is no digit 2 in base 2. The answer is two, written 10: put 0 in this column and carry 1 to the next.",
      "ne": "base 2 मा 2 भन्ने अङ्कै छैन। उत्तर दुई हो, जुन 10 लेखिन्छ: यही स्तम्भमा 0 र अर्कोमा 1 क्यारी।"
    }
  },
  {
    "id": "g10.dd.q107",
    "subject": "grade10/digital-design",
    "unit": "u1",
    "topic": "arithmetic",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Why does a computer subtract by adding the 2’s complement?",
      "ne": "कम्प्युटरले 2’s complement जोडेर किन घटाउँछ?"
    },
    "options": [
      {
        "en": "It is faster to type",
        "ne": "लेख्न छिटो हुन्छ"
      },
      {
        "en": "So one adder circuit can do both addition and subtraction",
        "ne": "एउटै adder सर्किटले जोड र घटाउ दुवै गर्न सकोस् भनेर"
      },
      {
        "en": "Because subtraction is impossible in binary",
        "ne": "binary मा घटाउ असम्भव भएकाले"
      },
      {
        "en": "To avoid using the carry flag",
        "ne": "carry flag प्रयोग नगर्न"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A − B is computed as A + (2’s complement of B), so the hardware needs no separate subtractor — simpler and cheaper.",
      "ne": "A − B लाई A + (B को 2’s complement) भनेर गणना गरिन्छ, त्यसैले छुट्टै subtractor चाहिँदैन — सरल र सस्तो।"
    }
  },
  {
    "id": "g10.dd.q108",
    "subject": "grade10/digital-design",
    "unit": "u1",
    "topic": "conversion",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Octal 55 converted to decimal is:",
      "ne": "Octal 55 लाई दशमलवमा बदल्दा कति हुन्छ?"
    },
    "options": [
      {
        "en": "40",
        "ne": "४०"
      },
      {
        "en": "45",
        "ne": "४५"
      },
      {
        "en": "55",
        "ne": "५५"
      },
      {
        "en": "85",
        "ne": "८५"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Multiply by the place values 8¹ and 8⁰: (5 × 8) + (5 × 1) = 40 + 5 = 45.",
      "ne": "स्थानीय मान 8¹ र 8⁰ ले गुणा गर्नुहोस्: (5 × 8) + (5 × 1) = 45।"
    }
  },
  {
    "id": "g10.dd.q109",
    "subject": "grade10/digital-design",
    "unit": "u1",
    "topic": "conversion",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "To convert a decimal FRACTION to binary you repeatedly:",
      "ne": "दशमलव भिन्नलाई binary मा बदल्न बारम्बार के गर्नुपर्छ?"
    },
    "options": [
      {
        "en": "Divide by 2 and read the remainders",
        "ne": "2 ले भाग गरेर बाँकी पढ्ने"
      },
      {
        "en": "Multiply by 2 and collect the integer parts",
        "ne": "2 ले गुणा गरेर पूर्णाङ्क भाग टिप्ने"
      },
      {
        "en": "Divide by 10",
        "ne": "10 ले भाग गर्ने"
      },
      {
        "en": "Multiply by 8",
        "ne": "8 ले गुणा गर्ने"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The whole part is divided; the fraction is multiplied by 2, and the integer part of each result is read downwards.",
      "ne": "पूर्णाङ्क भागलाई भाग गरिन्छ; भिन्नलाई 2 ले गुणा गरेर हरेक परिणामको पूर्णाङ्क भाग माथिबाट तल पढिन्छ।"
    }
  },
  {
    "id": "g10.dd.q301",
    "subject": "grade10/digital-design",
    "unit": "u3",
    "topic": "boolean-ops",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "In Boolean algebra, 1 + 1 equals:",
      "ne": "बुलियन बीजगणितमा 1 + 1 कति हुन्छ?"
    },
    "options": [
      {
        "en": "2",
        "ne": "२"
      },
      {
        "en": "10",
        "ne": "१०"
      },
      {
        "en": "1",
        "ne": "१"
      },
      {
        "en": "0",
        "ne": "०"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "The plus sign means OR, not addition. OR asks \"is at least one of them 1?\", so 1 + 1 = 1.",
      "ne": "प्लस चिन्हको अर्थ OR हो, जोड होइन। OR ले \"कम्तीमा एउटा 1 छ?\" सोध्छ, त्यसैले 1 + 1 = 1।"
    }
  },
  {
    "id": "g10.dd.q302",
    "subject": "grade10/digital-design",
    "unit": "u3",
    "topic": "laws",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "The Boolean law A + A' = 1 is called the:",
      "ne": "A + A' = 1 भन्ने बुलियन नियमलाई के भनिन्छ?"
    },
    "options": [
      {
        "en": "Identity law",
        "ne": "Identity नियम"
      },
      {
        "en": "Complement law",
        "ne": "Complement नियम"
      },
      {
        "en": "Absorption law",
        "ne": "Absorption नियम"
      },
      {
        "en": "Null law",
        "ne": "Null नियम"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A variable ORed with its own complement is always 1 — one of them must be 1. This is the complement law, and it is how variables disappear during simplification.",
      "ne": "कुनै चललाई त्यसकै पूरकसँग OR गर्दा सधैं 1 आउँछ। यही complement नियम हो, र सरलीकरणमा चल यसैले हराउँछ।"
    }
  },
  {
    "id": "g10.dd.q303",
    "subject": "grade10/digital-design",
    "unit": "u3",
    "topic": "sop",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "SOP form is written from the truth table rows where the output is:",
      "ne": "ट्रुथ टेबलको कुन आउटपुट भएका पङ्क्तिबाट SOP लेखिन्छ?"
    },
    "options": [
      {
        "en": "1",
        "ne": "1"
      },
      {
        "en": "0",
        "ne": "0"
      },
      {
        "en": "Either one",
        "ne": "जुनसुकै"
      },
      {
        "en": "Undefined",
        "ne": "अनिश्चित"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "SOP takes the 1-rows and ORs the product terms together. POS takes the 0-rows instead.",
      "ne": "SOP ले 1 भएका पङ्क्ति लिन्छ र product पदहरूलाई OR ले जोड्छ। POS ले 0 भएका पङ्क्ति लिन्छ।"
    }
  },
  {
    "id": "g10.dd.q304",
    "subject": "grade10/digital-design",
    "unit": "u3",
    "topic": "kmap",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "The column headings of a Karnaugh map are written 00, 01, 11, 10 because:",
      "ne": "के–म्यापका स्तम्भ हेडिङ 00, 01, 11, 10 किन लेखिन्छन्?"
    },
    "options": [
      {
        "en": "It looks tidier",
        "ne": "हेर्दा राम्रो देखिन्छ"
      },
      {
        "en": "So neighbouring cells differ by exactly one variable",
        "ne": "छिमेकी कक्षमा ठ्याक्कै एउटा चल मात्र फरक होस् भनेर"
      },
      {
        "en": "It is the binary counting order",
        "ne": "binary गन्ने क्रम त्यही भएकाले"
      },
      {
        "en": "To make the map square",
        "ne": "म्याप वर्ग बनाउन"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "This is Gray code. Adjacency is what lets a group cancel a variable, and only Gray order guarantees that neighbours differ in one bit.",
      "ne": "यो Gray code हो। समूहले चल काट्न सक्नुको कारण adjacency हो, र छिमेकीमा एउटै बिट फरक हुने ग्यारेन्टी Gray क्रमले मात्र दिन्छ।"
    }
  },
  {
    "id": "g10.dd.q305",
    "subject": "grade10/digital-design",
    "unit": "u3",
    "topic": "kmap",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "How many cells may a single K-map group contain?",
      "ne": "के–म्यापको एउटा समूहमा कति कक्ष हुन सक्छन्?"
    },
    "options": [
      {
        "en": "Any number",
        "ne": "जति पनि"
      },
      {
        "en": "Only 2 or 4",
        "ne": "२ वा ४ मात्र"
      },
      {
        "en": "A power of two: 1, 2, 4, 8 …",
        "ne": "दुईको घात: 1, 2, 4, 8 …"
      },
      {
        "en": "An odd number",
        "ne": "बिजोर सङ्ख्या"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "A group must hold a power of two. A group of three is never legal, whatever shape it is drawn in.",
      "ne": "समूहमा दुईको घात जति कक्ष हुनुपर्छ। तीनको समूह जुनसुकै आकारमा भए पनि मान्य हुँदैन।"
    }
  },
  {
    "id": "g10.dd.q306",
    "subject": "grade10/digital-design",
    "unit": "u3",
    "topic": "kmap",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Two 1s in the leftmost and rightmost columns of a K-map row are:",
      "ne": "के–म्यापको एउटै पङ्क्तिमा सबैभन्दा बायाँ र दायाँ स्तम्भका दुई 1 लाई के भनिन्छ?"
    },
    "options": [
      {
        "en": "Not adjacent, so they cannot be grouped",
        "ne": "छिमेकी होइनन्, त्यसैले समूह बन्दैन"
      },
      {
        "en": "Adjacent, because the edges wrap around",
        "ne": "छिमेकी हुन्, किनभने किनारा वरिपरि जोडिन्छन्"
      },
      {
        "en": "Only groupable in a 4-variable map",
        "ne": "४ चलको म्यापमा मात्र समूह बन्छ"
      },
      {
        "en": "An error in the map",
        "ne": "म्यापकै त्रुटि"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The map wraps in both directions. The left and right edges are neighbours, and so are the top and bottom rows — which is what makes the four corners a legal group.",
      "ne": "म्याप दुवै दिशामा वरिपरि जोडिन्छ। बायाँ र दायाँ किनारा छिमेकी हुन्, त्यसै गरी माथि र तल्लो पङ्क्ति पनि — त्यसैले चार कुना पनि मान्य समूह हो।"
    }
  },
  {
    "id": "g10.dd.q307",
    "subject": "grade10/digital-design",
    "unit": "u3",
    "topic": "kmap",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Why should you always take the LARGEST possible K-map group?",
      "ne": "के–म्यापमा सधैं सक्ने जति ठूलो समूह किन लिनुपर्छ?"
    },
    "options": [
      {
        "en": "It is faster to draw",
        "ne": "कोर्न छिटो हुन्छ"
      },
      {
        "en": "A larger group removes more variables, giving a simpler term",
        "ne": "ठूलो समूहले बढी चल हटाउँछ, त्यसैले पद सरल हुन्छ"
      },
      {
        "en": "Small groups are against the rules",
        "ne": "सानो समूह नियमविरुद्ध हुन्छ"
      },
      {
        "en": "It changes the truth table",
        "ne": "यसले ट्रुथ टेबल बदल्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Doubling the group size removes one more variable. A group of 2 removes one variable, a group of 4 removes two, and so on — and the mark is for simplifying.",
      "ne": "समूह दोब्बर हुँदा एउटा थप चल हट्छ। 2 को समूहले एउटा, 4 को समूहले दुई चल हटाउँछ — र अंक सरलीकरणकै हो।"
    }
  },
  {
    "id": "g10.dd.q308",
    "subject": "grade10/digital-design",
    "unit": "u3",
    "topic": "pos",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "In POS form, a variable appearing as 1 in a 0-row is written:",
      "ne": "POS मा, 0 भएको पङ्क्तिमा 1 देखिने चल कसरी लेखिन्छ?"
    },
    "options": [
      {
        "en": "As it is",
        "ne": "जस्ताको तस्तै"
      },
      {
        "en": "Complemented",
        "ne": "पूरक बनाएर"
      },
      {
        "en": "It is left out",
        "ne": "छाडिन्छ"
      },
      {
        "en": "Doubled",
        "ne": "दोब्बर गरेर"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The rule reverses between the forms: in a 1-row (SOP) a 0 is complemented; in a 0-row (POS) a 1 is complemented.",
      "ne": "दुई रूपबीच नियम उल्टिन्छ: SOP मा 1 भएको पङ्क्तिमा 0 पूरक हुन्छ; POS मा 0 भएको पङ्क्तिमा 1 पूरक हुन्छ।"
    }
  },
  {
    "id": "g10.dd.q401",
    "subject": "grade10/digital-design",
    "unit": "u4",
    "topic": "half-adder",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which two gates make a half adder?",
      "ne": "Half adder बनाउन कुन दुई गेट चाहिन्छ?"
    },
    "options": [
      {
        "en": "AND and OR",
        "ne": "AND र OR"
      },
      {
        "en": "XOR and AND",
        "ne": "XOR र AND"
      },
      {
        "en": "NAND and NOR",
        "ne": "NAND र NOR"
      },
      {
        "en": "NOT and OR",
        "ne": "NOT र OR"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "SUM = A ⊕ B comes from an XOR gate and CARRY = A · B comes from an AND gate. Both read the same two inputs.",
      "ne": "SUM = A ⊕ B XOR गेटबाट र CARRY = A · B AND गेटबाट आउँछ। दुवैले उही दुई इनपुट पढ्छन्।"
    }
  },
  {
    "id": "g10.dd.q402",
    "subject": "grade10/digital-design",
    "unit": "u4",
    "topic": "half-adder",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "In a half adder with A = 1 and B = 1, the outputs are:",
      "ne": "A = 1 र B = 1 भएको half adder मा आउटपुट कति हुन्छन्?"
    },
    "options": [
      {
        "en": "SUM = 1, CARRY = 1",
        "ne": "SUM = 1, CARRY = 1"
      },
      {
        "en": "SUM = 0, CARRY = 1",
        "ne": "SUM = 0, CARRY = 1"
      },
      {
        "en": "SUM = 1, CARRY = 0",
        "ne": "SUM = 1, CARRY = 0"
      },
      {
        "en": "SUM = 0, CARRY = 0",
        "ne": "SUM = 0, CARRY = 0"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "1 + 1 = 10 in binary: write 0 in this column and carry 1 to the next. XOR of two 1s is 0; AND of two 1s is 1.",
      "ne": "binary मा 1 + 1 = 10: यही स्तम्भमा 0, अर्कोमा 1 क्यारी। दुई 1 को XOR 0 हुन्छ; AND 1 हुन्छ।"
    }
  },
  {
    "id": "g10.dd.q403",
    "subject": "grade10/digital-design",
    "unit": "u4",
    "topic": "full-adder",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "How many inputs does a full adder have?",
      "ne": "Full adder मा कति इनपुट हुन्छन्?"
    },
    "options": [
      {
        "en": "Two",
        "ne": "दुई"
      },
      {
        "en": "Three",
        "ne": "तीन"
      },
      {
        "en": "Four",
        "ne": "चार"
      },
      {
        "en": "One",
        "ne": "एक"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A full adder takes A, B and the carry coming in from the previous column. That third input is the whole difference from a half adder.",
      "ne": "Full adder ले A, B र अघिल्लो स्तम्भबाट आएको क्यारी लिन्छ। half adder सँगको फरक त्यही तेस्रो इनपुट हो।"
    }
  },
  {
    "id": "g10.dd.q404",
    "subject": "grade10/digital-design",
    "unit": "u4",
    "topic": "subtractor",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "The BORROW output of a half subtractor is given by:",
      "ne": "Half subtractor को BORROW आउटपुट कुन सूत्रले दिन्छ?"
    },
    "options": [
      {
        "en": "A · B",
        "ne": "A · B"
      },
      {
        "en": "A' · B",
        "ne": "A' · B"
      },
      {
        "en": "A ⊕ B",
        "ne": "A ⊕ B"
      },
      {
        "en": "A · B'",
        "ne": "A · B'"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A borrow is needed exactly when A is 0 and B is 1, which is A' · B. Compare with a half adder, where the second output is A · B instead.",
      "ne": "A = 0 र B = 1 हुँदा मात्र borrow चाहिन्छ, जुन A' · B हो। Half adder मा दोस्रो आउटपुट A · B हुन्छ।"
    }
  },
  {
    "id": "g10.dd.q405",
    "subject": "grade10/digital-design",
    "unit": "u4",
    "topic": "mux",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A multiplexer is best described as:",
      "ne": "Multiplexer लाई कसरी वर्णन गर्न मिल्छ?"
    },
    "options": [
      {
        "en": "Many inputs, one output",
        "ne": "धेरै इनपुट, एउटा आउटपुट"
      },
      {
        "en": "One input, many outputs",
        "ne": "एउटा इनपुट, धेरै आउटपुट"
      },
      {
        "en": "Equal inputs and outputs",
        "ne": "इनपुट र आउटपुट बराबर"
      },
      {
        "en": "No inputs at all",
        "ne": "कुनै इनपुट नै छैन"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "A MUX selects one of many inputs and routes it to a single output. A DEMUX does the opposite: one input, many outputs.",
      "ne": "MUX ले धेरै इनपुटमध्ये एउटा छानेर एउटै आउटपुटमा पठाउँछ। DEMUX ठीक उल्टो गर्छ।"
    }
  },
  {
    "id": "g10.dd.q406",
    "subject": "grade10/digital-design",
    "unit": "u4",
    "topic": "mux",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "How many select lines does a 16-to-1 multiplexer need?",
      "ne": "१६-देखि-१ multiplexer लाई कति select लाइन चाहिन्छ?"
    },
    "options": [
      {
        "en": "2",
        "ne": "२"
      },
      {
        "en": "3",
        "ne": "३"
      },
      {
        "en": "4",
        "ne": "४"
      },
      {
        "en": "16",
        "ne": "१६"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "n select lines address 2ⁿ inputs. 2⁴ = 16, so four select lines are needed.",
      "ne": "n select लाइनले 2ⁿ इनपुट सम्बोधन गर्छ। 2⁴ = 16, त्यसैले चार select लाइन चाहिन्छ।"
    }
  },
  {
    "id": "g10.dd.q407",
    "subject": "grade10/digital-design",
    "unit": "u4",
    "topic": "decoder",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A decoder takes n inputs and activates:",
      "ne": "Decoder ले n इनपुट लिएर के सक्रिय गर्छ?"
    },
    "options": [
      {
        "en": "All of its outputs",
        "ne": "आफ्ना सबै आउटपुट"
      },
      {
        "en": "Exactly one of its 2ⁿ outputs",
        "ne": "आफ्ना 2ⁿ मध्ये ठ्याक्कै एउटा आउटपुट"
      },
      {
        "en": "n outputs",
        "ne": "n वटा आउटपुट"
      },
      {
        "en": "No outputs",
        "ne": "कुनै आउटपुट होइन"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A decoder converts a binary code into a one-of-many selection: for each input combination exactly one output line goes high. An encoder does the reverse.",
      "ne": "Decoder ले binary कोडलाई धेरैमध्ये एउटाको छनोटमा बदल्छ: हरेक इनपुट जोडीका लागि ठ्याक्कै एउटा आउटपुट लाइन उच्च हुन्छ। Encoder ठीक उल्टो गर्छ।"
    }
  },
  {
    "id": "g10.dd.q408",
    "subject": "grade10/digital-design",
    "unit": "u4",
    "topic": "code-converter",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Decimal 47 written in BCD is:",
      "ne": "दशमलव 47 लाई BCD मा लेख्दा कति हुन्छ?"
    },
    "options": [
      {
        "en": "101111",
        "ne": "101111"
      },
      {
        "en": "0100 0111",
        "ne": "0100 0111"
      },
      {
        "en": "0100 1110",
        "ne": "0100 1110"
      },
      {
        "en": "0111 0100",
        "ne": "0111 0100"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "BCD converts each decimal DIGIT separately into four bits: 4 → 0100 and 7 → 0111. 101111 is 47 in plain binary, which is a different thing.",
      "ne": "BCD ले हरेक दशमलव अङ्कलाई छुट्टै चार बिटमा बदल्छ: 4 → 0100 र 7 → 0111। 101111 चाहिँ साधारण binary को 47 हो, जुन फरक कुरा हो।"
    }
  },
  {
    "id": "g10.dd.q409",
    "subject": "grade10/digital-design",
    "unit": "u4",
    "topic": "gray",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Gray code is useful because between consecutive values:",
      "ne": "Gray code किन उपयोगी छ — लगातार दुई मानबीच के हुन्छ?"
    },
    "options": [
      {
        "en": "All bits change",
        "ne": "सबै बिट फेरिन्छन्"
      },
      {
        "en": "Only one bit changes",
        "ne": "एउटै बिट मात्र फेरिन्छ"
      },
      {
        "en": "No bits change",
        "ne": "कुनै बिट फेरिँदैन"
      },
      {
        "en": "The number of bits changes",
        "ne": "बिटको सङ्ख्या फेरिन्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Only one bit changes at a time, so a reading taken while the value is changing can be wrong by at most one step. That matters in position sensors.",
      "ne": "एक पटकमा एउटै बिट फेरिने भएकाले, मान बदलिँदै गर्दा लिइएको पठन बढीमा एक चरण मात्र गलत हुन्छ। position sensor मा यो महत्त्वपूर्ण छ।"
    }
  },
  {
    "id": "g10.dd.q501",
    "subject": "grade10/digital-design",
    "unit": "u5",
    "topic": "definition",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A microprocessor contains which three main parts?",
      "ne": "माइक्रोप्रोसेसरभित्र कुन तीन मुख्य भाग हुन्छन्?"
    },
    "options": [
      {
        "en": "ALU, control unit and registers",
        "ne": "ALU, control unit र register"
      },
      {
        "en": "Keyboard, monitor and printer",
        "ne": "किबोर्ड, मनिटर र प्रिन्टर"
      },
      {
        "en": "RAM, ROM and hard disk",
        "ne": "RAM, ROM र हार्ड डिस्क"
      },
      {
        "en": "Address bus, data bus and power supply",
        "ne": "address bus, data bus र पावर सप्लाई"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "A microprocessor is the whole CPU on one chip: the ALU that calculates, the control unit that directs, and the registers that hold values.",
      "ne": "माइक्रोप्रोसेसर भनेको एउटै चिपमा पूरै CPU हो: गणना गर्ने ALU, निर्देशन दिने control unit, र मान राख्ने register।"
    }
  },
  {
    "id": "g10.dd.q502",
    "subject": "grade10/digital-design",
    "unit": "u5",
    "topic": "buses",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "The address bus of the 8085 is:",
      "ne": "8085 को address bus कस्तो हुन्छ?"
    },
    "options": [
      {
        "en": "8-bit and two way",
        "ne": "८-बिट र दुईतर्फी"
      },
      {
        "en": "16-bit and one way",
        "ne": "१६-बिट र एकतर्फी"
      },
      {
        "en": "16-bit and two way",
        "ne": "१६-बिट र दुईतर्फी"
      },
      {
        "en": "8-bit and one way",
        "ne": "८-बिट र एकतर्फी"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The address bus is 16 bits wide and unidirectional — the CPU always chooses the address, so memory never drives it. 16 lines reach 2¹⁶ = 64 KB.",
      "ne": "Address bus १६ बिट चौडा र एकतर्फी हुन्छ — ठेगाना सधैं CPU ले छान्छ। १६ लाइनले 2¹⁶ = ६४ KB सम्म पुग्छ।"
    }
  },
  {
    "id": "g10.dd.q503",
    "subject": "grade10/digital-design",
    "unit": "u5",
    "topic": "registers",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which register holds the address of the next instruction to be executed?",
      "ne": "चलाउनुपर्ने अर्को निर्देशनको ठेगाना कुन रजिस्टरमा हुन्छ?"
    },
    "options": [
      {
        "en": "Accumulator",
        "ne": "Accumulator"
      },
      {
        "en": "Instruction Register",
        "ne": "Instruction Register"
      },
      {
        "en": "Program Counter",
        "ne": "Program Counter"
      },
      {
        "en": "Stack Pointer",
        "ne": "Stack Pointer"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "The Program Counter holds the ADDRESS of the next instruction. The Instruction Register holds the instruction itself once it has been fetched.",
      "ne": "Program Counter ले अर्को निर्देशनको ठेगाना राख्छ। Instruction Register ले झिकिसकेको निर्देशन आफैं राख्छ।"
    }
  },
  {
    "id": "g10.dd.q504",
    "subject": "grade10/digital-design",
    "unit": "u5",
    "topic": "instruction-cycle",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "The correct order of the instruction cycle is:",
      "ne": "निर्देशन चक्रको सही क्रम कुन हो?"
    },
    "options": [
      {
        "en": "Decode, fetch, execute",
        "ne": "Decode, fetch, execute"
      },
      {
        "en": "Fetch, decode, execute",
        "ne": "Fetch, decode, execute"
      },
      {
        "en": "Execute, fetch, decode",
        "ne": "Execute, fetch, decode"
      },
      {
        "en": "Fetch, execute, decode",
        "ne": "Fetch, execute, decode"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The processor must first bring the instruction in (fetch), then work out what it means (decode), then carry it out (execute), storing any result.",
      "ne": "प्रोसेसरले पहिले निर्देशन भित्र्याउँछ (fetch), अनि त्यसको अर्थ निकाल्छ (decode), अनि चलाउँछ (execute), र नतिजा भए राख्छ।"
    }
  },
  {
    "id": "g10.dd.q505",
    "subject": "grade10/digital-design",
    "unit": "u5",
    "topic": "flags",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "The Zero flag of the 8085 is set when:",
      "ne": "8085 को Zero flag कहिले सेट हुन्छ?"
    },
    "options": [
      {
        "en": "The result of an operation is zero",
        "ne": "क्रियाको नतिजा शून्य हुँदा"
      },
      {
        "en": "The accumulator is empty",
        "ne": "Accumulator खाली हुँदा"
      },
      {
        "en": "A carry is produced",
        "ne": "क्यारी बन्दा"
      },
      {
        "en": "The program ends",
        "ne": "प्रोग्राम सकिँदा"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Flags record something about the last ALU result. Z is set to 1 when that result is exactly zero, so the program can act on it with a \"jump if zero\".",
      "ne": "Flag ले पछिल्लो ALU नतिजाबारे कुरा टिप्छ। नतिजा ठ्याक्कै शून्य हुँदा Z 1 हुन्छ, जसले \"शून्य भए जम्प गर\" गर्न दिन्छ।"
    }
  },
  {
    "id": "g10.dd.q506",
    "subject": "grade10/digital-design",
    "unit": "u5",
    "topic": "interrupts",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which 8085 interrupt has the highest priority?",
      "ne": "8085 को कुन interrupt को प्राथमिकता सर्वोच्च हो?"
    },
    "options": [
      {
        "en": "INTR",
        "ne": "INTR"
      },
      {
        "en": "RST 5.5",
        "ne": "RST 5.5"
      },
      {
        "en": "RST 7.5",
        "ne": "RST 7.5"
      },
      {
        "en": "TRAP",
        "ne": "TRAP"
      }
    ],
    "answer": 3,
    "explanation": {
      "en": "The order from highest to lowest is TRAP, RST 7.5, RST 6.5, RST 5.5, INTR. TRAP is also non-maskable — software cannot disable it.",
      "ne": "सर्वोच्चदेखि सबैभन्दा कम: TRAP, RST 7.5, RST 6.5, RST 5.5, INTR। TRAP लाई सफ्टवेयरले बन्द गर्न सक्दैन।"
    }
  },
  {
    "id": "g10.dd.q507",
    "subject": "grade10/digital-design",
    "unit": "u5",
    "topic": "addressing",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "The instruction MVI A, 05H uses which addressing mode?",
      "ne": "MVI A, 05H निर्देशनले कुन addressing mode प्रयोग गर्छ?"
    },
    "options": [
      {
        "en": "Direct",
        "ne": "Direct"
      },
      {
        "en": "Immediate",
        "ne": "Immediate"
      },
      {
        "en": "Register indirect",
        "ne": "Register indirect"
      },
      {
        "en": "Implicit",
        "ne": "Implicit"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The value 05H is written inside the instruction itself, so it is immediate addressing. Direct addressing would give a memory address instead.",
      "ne": "05H मान निर्देशनभित्रै लेखिएको छ, त्यसैले यो immediate addressing हो। Direct ले मेमोरीको ठेगाना दिन्थ्यो।"
    }
  },
  {
    "id": "g10.dd.q508",
    "subject": "grade10/digital-design",
    "unit": "u5",
    "topic": "architecture",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Why are the AD0–AD7 lines of the 8085 called multiplexed?",
      "ne": "8085 का AD0–AD7 लाइनलाई किन multiplexed भनिन्छ?"
    },
    "options": [
      {
        "en": "They carry an address at one moment and data at another",
        "ne": "एक क्षणमा ठेगाना र अर्को क्षणमा डाटा बोक्छन्"
      },
      {
        "en": "They are twice as fast as the other pins",
        "ne": "अरू pin भन्दा दोब्बर छिटो हुन्छन्"
      },
      {
        "en": "They can be disconnected",
        "ne": "तिनलाई छुट्याउन मिल्छ"
      },
      {
        "en": "They carry both power and signal",
        "ne": "बिजुली र सिग्नल दुवै बोक्छन्"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "The same eight lines carry the lower address byte first and then the data, which saves eight pins. The ALE signal goes high to say the lines currently hold an address.",
      "ne": "उही आठ लाइनले पहिले तल्लो ठेगाना बाइट र त्यसपछि डाटा बोक्छन्, जसले आठ pin बचाउँछ। अहिले ठेगाना छ भन्न ALE सङ्केत उच्च हुन्छ।"
    }
  },
  {
    "id": "g10.dd.q509",
    "subject": "grade10/digital-design",
    "unit": "u5",
    "topic": "memory",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "With a 16-bit address bus, how much memory can the 8085 address?",
      "ne": "१६-बिट address bus भएकाले 8085 ले कति मेमोरी सम्बोधन गर्न सक्छ?"
    },
    "options": [
      {
        "en": "16 KB",
        "ne": "१६ KB"
      },
      {
        "en": "32 KB",
        "ne": "३२ KB"
      },
      {
        "en": "64 KB",
        "ne": "६४ KB"
      },
      {
        "en": "1 MB",
        "ne": "१ MB"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "16 address lines give 2¹⁶ = 65,536 distinct locations. At one byte each that is 64 KB.",
      "ne": "१६ ठेगाना लाइनले 2¹⁶ = ६५,५३६ फरक ठाउँ दिन्छ। प्रति ठाउँ एक बाइट भएकाले त्यो ६४ KB हुन्छ।"
    }
  },
  {
    "id": "g10.dd.q510",
    "subject": "grade10/digital-design",
    "unit": "u5",
    "topic": "alu",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which block of the microprocessor performs addition and comparison?",
      "ne": "माइक्रोप्रोसेसरको कुन भागले जोड र तुलना गर्छ?"
    },
    "options": [
      {
        "en": "Control unit",
        "ne": "Control unit"
      },
      {
        "en": "ALU",
        "ne": "ALU"
      },
      {
        "en": "Program counter",
        "ne": "Program counter"
      },
      {
        "en": "Data bus",
        "ne": "Data bus"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The ALU is the only part that calculates. The control unit directs the other blocks but performs no arithmetic itself.",
      "ne": "गणना गर्ने एउटै भाग ALU हो। Control unit ले अरू ब्लकलाई निर्देशन दिन्छ तर आफैं गणित गर्दैन।"
    }
  }
]);

QuizService.registerBank("grade10/dbms", [
  {
    "id": "g10.db.q001",
    "subject": "grade10/dbms",
    "unit": "u1",
    "topic": "data-information",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which of these is DATA rather than information?",
      "ne": "यीमध्ये कुन INFORMATION होइन, DATA हो?"
    },
    "options": [
      {
        "en": "78",
        "ne": "७८"
      },
      {
        "en": "Ram scored 78 in class 10",
        "ne": "रामले कक्षा १० मा ७८ अंक ल्याए"
      },
      {
        "en": "The class average is 72",
        "ne": "कक्षाको औसत ७२ छ"
      },
      {
        "en": "Sita passed the examination",
        "ne": "सीता परीक्षामा उत्तीर्ण भइन्"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Data is a raw fact with no meaning attached. 78 on its own tells you nothing. The other three have been processed and given meaning, which makes them information.",
      "ne": "Data भनेको अर्थ नजोडिएको काँचो तथ्य हो। ७८ एक्लैले केही बताउँदैन। बाँकी तीनलाई प्रशोधन गरेर अर्थ दिइएको छ, त्यसैले ती information हुन्।"
    }
  },
  {
    "id": "g10.db.q002",
    "subject": "grade10/dbms",
    "unit": "u1",
    "topic": "dbms-definition",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What is MySQL?",
      "ne": "MySQL के हो?"
    },
    "options": [
      {
        "en": "A DBMS — software that manages a database",
        "ne": "एउटा DBMS — डाटाबेस व्यवस्थापन गर्ने सफ्टवेयर"
      },
      {
        "en": "A database",
        "ne": "एउटा डाटाबेस"
      },
      {
        "en": "A table",
        "ne": "एउटा तालिका"
      },
      {
        "en": "A programming language",
        "ne": "एउटा प्रोग्रामिङ भाषा"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "MySQL is a DBMS: the software. The database is the collection of data it manages. Calling the DBMS \"the database\" is the most common slip in this unit.",
      "ne": "MySQL एउटा DBMS हो — सफ्टवेयर। डाटाबेस भनेको त्यसले व्यवस्थापन गर्ने data को सङ्ग्रह हो। DBMS लाई \"डाटाबेस\" भन्नु यस युनिटको सबैभन्दा सामान्य गल्ती हो।"
    }
  },
  {
    "id": "g10.db.q003",
    "subject": "grade10/dbms",
    "unit": "u1",
    "topic": "file-system-limits",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A student's address is stored in three different files. The office updates one of them. What problem is this?",
      "ne": "एउटै विद्यार्थीको ठेगाना तीन फरक फाइलमा छ। कार्यालयले एउटा मात्र अद्यावधिक गर्‍यो। यो कुन समस्या हो?"
    },
    "options": [
      {
        "en": "Data inconsistency",
        "ne": "Data inconsistency"
      },
      {
        "en": "Data isolation",
        "ne": "Data isolation"
      },
      {
        "en": "Concurrency",
        "ne": "Concurrency"
      },
      {
        "en": "Data independence",
        "ne": "Data independence"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Storing the same fact three times is redundancy; the copies disagreeing after one is updated is inconsistency. The question asks about the result of the update, so the answer is inconsistency.",
      "ne": "उही तथ्य तीन पटक राख्नु redundancy हो; एउटा बदलेपछि प्रतिलिपिहरू बाझिनु inconsistency हो। प्रश्नले अद्यावधिकपछिको नतिजा सोधेकाले उत्तर inconsistency हो।"
    }
  },
  {
    "id": "g10.db.q004",
    "subject": "grade10/dbms",
    "unit": "u1",
    "topic": "architecture",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which level of the three-level architecture describes what a particular user is allowed to see?",
      "ne": "तीन तहको संरचनामा कुन तहले कुनै प्रयोगकर्ताले देख्न पाउने कुरा बताउँछ?"
    },
    "options": [
      {
        "en": "External level",
        "ne": "External level"
      },
      {
        "en": "Conceptual level",
        "ne": "Conceptual level"
      },
      {
        "en": "Internal level",
        "ne": "Internal level"
      },
      {
        "en": "Physical level",
        "ne": "Physical level"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "The external (or view) level is the top of the diagram, nearest the user. The conceptual level says what data exists overall; the internal level says how it is stored on disk.",
      "ne": "External (view) तह चित्रको सबैभन्दा माथि — प्रयोगकर्तानजिक। Conceptual तहले समग्रमा कुन data छ भन्छ; internal तहले डिस्कमा कसरी राखिएको छ भन्छ।"
    }
  },
  {
    "id": "g10.db.q005",
    "subject": "grade10/dbms",
    "unit": "u1",
    "topic": "schema-instance",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A new student is admitted and a row is inserted. What has changed?",
      "ne": "नयाँ विद्यार्थी भर्ना भए र एउटा पङ्क्ति थपियो। के बदलियो?"
    },
    "options": [
      {
        "en": "The instance only",
        "ne": "Instance मात्र"
      },
      {
        "en": "The schema only",
        "ne": "Schema मात्र"
      },
      {
        "en": "Both the schema and the instance",
        "ne": "Schema र instance दुवै"
      },
      {
        "en": "Neither",
        "ne": "कुनै पनि होइन"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "The instance is the data in the database right now, so inserting a row changes it. The schema is the structure — the table name, columns and keys — and adding a student does not change any of those.",
      "ne": "Instance भनेको अहिलेको data हो, त्यसैले पङ्क्ति थप्दा बदलिन्छ। Schema भनेको संरचना — तालिकाको नाम, स्तम्भ र कुञ्जी — र विद्यार्थी थप्दा ती बदलिँदैनन्।"
    }
  },
  {
    "id": "g10.db.q006",
    "subject": "grade10/dbms",
    "unit": "u1",
    "topic": "database-users",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Who grants and revokes permissions and takes backups?",
      "ne": "अधिकार दिने–खोस्ने र backup लिने काम कसले गर्छ?"
    },
    "options": [
      {
        "en": "The Database Administrator (DBA)",
        "ne": "Database Administrator (DBA)"
      },
      {
        "en": "The application programmer",
        "ne": "Application programmer"
      },
      {
        "en": "The end user",
        "ne": "End user"
      },
      {
        "en": "The database designer",
        "ne": "Database designer"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "The DBA has complete control of the database: creating it, controlling who may use it, taking backups and tuning performance.",
      "ne": "DBA सँग डाटाबेसको पूर्ण नियन्त्रण हुन्छ: बनाउने, कसले प्रयोग गर्न पाउने नियन्त्रण गर्ने, backup लिने र कार्यसम्पादन सुधार्ने।"
    }
  },
  {
    "id": "g10.db.q007",
    "subject": "grade10/dbms",
    "unit": "u1",
    "topic": "db-models",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "In which database model may a record have SEVERAL parent records?",
      "ne": "कुन डाटाबेस मोडेलमा एउटा रेकर्डका धेरै parent रेकर्ड हुन सक्छन्?"
    },
    "options": [
      {
        "en": "Network model",
        "ne": "Network model"
      },
      {
        "en": "Hierarchical model",
        "ne": "Hierarchical model"
      },
      {
        "en": "Relational model",
        "ne": "Relational model"
      },
      {
        "en": "Object-oriented model",
        "ne": "Object-oriented model"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "The hierarchical model is a tree, so a record has exactly one parent. The network model is a graph and allows several, which is the single examinable difference between the two.",
      "ne": "Hierarchical model रूख हो, त्यसैले रेकर्डको एउटै parent हुन्छ। Network model ग्राफ हो र धेरै हुन दिन्छ — दुईबीचको परीक्षामा सोधिने फरक यही एउटा हो।"
    }
  },
  {
    "id": "g10.db.q008",
    "subject": "grade10/dbms",
    "unit": "u1",
    "topic": "db-disadvantages",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which of these is a DISADVANTAGE of a database system?",
      "ne": "यीमध्ये कुन डाटाबेस प्रणालीको बेफाइदा हो?"
    },
    "options": [
      {
        "en": "A failure affects everything at once, because the data is centralised",
        "ne": "Data एकै ठाउँमा हुने भएकाले एउटै बिग्रँदा सबै प्रभावित हुन्छ"
      },
      {
        "en": "Data redundancy is controlled",
        "ne": "Data redundancy नियन्त्रण हुन्छ"
      },
      {
        "en": "Data can be shared between many users",
        "ne": "धेरै प्रयोगकर्ताबीच data साझा गर्न सकिन्छ"
      },
      {
        "en": "Security and access control are possible",
        "ne": "सुरक्षा र पहुँच नियन्त्रण सम्भव हुन्छ"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Centralisation is what makes a database powerful and also what makes it a single point of failure. The other three options are advantages. A question asking for both wants at least one of each.",
      "ne": "एकै ठाउँमा राख्नुले डाटाबेसलाई बलियो बनाउँछ र सँगै एउटै जोखिम बिन्दु पनि। बाँकी तीन फाइदा हुन्।"
    }
  },
  {
    "id": "g10.db.q009",
    "subject": "grade10/dbms",
    "unit": "u2",
    "topic": "er-symbols",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "In an ER diagram, what is drawn as a DIAMOND?",
      "ne": "ER चित्रमा चतुर्भुजले के जनाउँछ?"
    },
    "options": [
      {
        "en": "A relationship",
        "ne": "सम्बन्ध (relationship)"
      },
      {
        "en": "An entity",
        "ne": "इन्टिटी"
      },
      {
        "en": "An attribute",
        "ne": "एट्रिब्युट"
      },
      {
        "en": "A primary key",
        "ne": "Primary key"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "A diamond holds the relationship, written as a verb — ENROLS, TEACHES. Entities are rectangles and attributes are ellipses.",
      "ne": "चतुर्भुजभित्र सम्बन्ध हुन्छ, क्रियापदमा लेखिएको — ENROLS, TEACHES। इन्टिटी आयत हुन् र एट्रिब्युट दीर्घवृत्त।"
    }
  },
  {
    "id": "g10.db.q010",
    "subject": "grade10/dbms",
    "unit": "u2",
    "topic": "er-symbols",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A student's age is calculated from their date of birth and is not stored. How is it drawn?",
      "ne": "विद्यार्थीको उमेर जन्ममितिबाट निकालिन्छ र भण्डारण गरिँदैन। यसलाई कसरी कोरिन्छ?"
    },
    "options": [
      {
        "en": "A dashed ellipse",
        "ne": "धर्के दीर्घवृत्त"
      },
      {
        "en": "A double ellipse",
        "ne": "दोहोरो दीर्घवृत्त"
      },
      {
        "en": "An underlined ellipse",
        "ne": "मुनि रेखा भएको दीर्घवृत्त"
      },
      {
        "en": "A double rectangle",
        "ne": "दोहोरो आयत"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "A derived attribute is drawn with a dashed ellipse. A double ellipse means multivalued, an underline marks the key, and a double rectangle is a weak entity.",
      "ne": "व्युत्पन्न (derived) एट्रिब्युट धर्के दीर्घवृत्तले कोरिन्छ। दोहोरो दीर्घवृत्त = बहुमान, मुनि रेखा = कुञ्जी, दोहोरो आयत = कमजोर इन्टिटी।"
    }
  },
  {
    "id": "g10.db.q011",
    "subject": "grade10/dbms",
    "unit": "u2",
    "topic": "weak-entity",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What makes an entity WEAK?",
      "ne": "कुनै इन्टिटीलाई \"कमजोर\" के कुराले बनाउँछ?"
    },
    "options": [
      {
        "en": "It has no key of its own and depends on an owner entity",
        "ne": "यसको आफ्नै कुञ्जी हुँदैन र मालिक इन्टिटीमा निर्भर हुन्छ"
      },
      {
        "en": "It holds very little data",
        "ne": "यसमा थोरै data हुन्छ"
      },
      {
        "en": "It is less important than the others",
        "ne": "यो अरूभन्दा कम महत्त्वपूर्ण हुन्छ"
      },
      {
        "en": "It has no relationships",
        "ne": "यसको कुनै सम्बन्ध हुँदैन"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "\"Weak\" is about identification, not importance. A weak entity cannot be identified on its own and must borrow its owner's key. It is drawn with a double rectangle.",
      "ne": "\"कमजोर\" भनेको चिनारीको कुरा हो, महत्त्वको होइन। कमजोर इन्टिटी आफैंले चिनिँदैन र मालिकको कुञ्जी लिनुपर्छ। दोहोरो आयतले कोरिन्छ।"
    }
  },
  {
    "id": "g10.db.q012",
    "subject": "grade10/dbms",
    "unit": "u2",
    "topic": "cardinality",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A class contains many students, and each student belongs to exactly one class. What is the mapping cardinality?",
      "ne": "एउटा कक्षामा धेरै विद्यार्थी हुन्छन्, र हरेक विद्यार्थी ठ्याक्कै एउटै कक्षाको हुन्छ। Mapping cardinality कति हो?"
    },
    "options": [
      {
        "en": "One-to-many (1:M)",
        "ne": "एक–धेरै (1:M)"
      },
      {
        "en": "Many-to-many (M:N)",
        "ne": "धेरै–धेरै (M:N)"
      },
      {
        "en": "One-to-one (1:1)",
        "ne": "एक–एक (1:1)"
      },
      {
        "en": "Many-to-one only",
        "ne": "धेरै–एक मात्र"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Test both directions. Class → students is \"many\", but student → class is \"one\". Many one way and one the other way is 1:M. It would only be M:N if a student could also be in several classes.",
      "ne": "दुवै दिशा जाँच्नुहोस्। कक्षा → विद्यार्थी \"धेरै\" हो, तर विद्यार्थी → कक्षा \"एक\"। एकातिर धेरै र अर्कोतिर एक भए 1:M। विद्यार्थी धेरै कक्षामा हुन सक्ने भए मात्र M:N हुन्थ्यो।"
    }
  },
  {
    "id": "g10.db.q013",
    "subject": "grade10/dbms",
    "unit": "u2",
    "topic": "mn-junction-table",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A student takes many courses and a course is taken by many students. How many TABLES does this need?",
      "ne": "एउटा विद्यार्थीले धेरै विषय लिन्छन् र एउटा विषय धेरै विद्यार्थीले लिन्छन्। यसलाई कति तालिका चाहिन्छ?"
    },
    "options": [
      {
        "en": "Three — the two entities plus a junction table",
        "ne": "तीन — दुई इन्टिटी र एउटा junction तालिका"
      },
      {
        "en": "Two",
        "ne": "दुई"
      },
      {
        "en": "One",
        "ne": "एक"
      },
      {
        "en": "Four",
        "ne": "चार"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "A many-to-many relationship cannot be recorded by a foreign key, because a column holds one value and each side has many partners. It becomes a third table holding one row per link.",
      "ne": "धेरै–धेरै सम्बन्धलाई foreign key ले राख्न सक्दैन, किनभने स्तम्भले एउटै मान राख्छ र दुवैतर्फ धेरै जोडी छन्। यो तेस्रो तालिका बन्छ, हरेक जोडका लागि एक पङ्क्ति।"
    }
  },
  {
    "id": "g10.db.q014",
    "subject": "grade10/dbms",
    "unit": "u2",
    "topic": "keys",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which statement about a PRIMARY key is true?",
      "ne": "Primary key बारे कुन भनाइ सही हो?"
    },
    "options": [
      {
        "en": "It must be unique and can never be NULL",
        "ne": "यो अद्वितीय हुनुपर्छ र कहिल्यै NULL हुन पाउँदैन"
      },
      {
        "en": "It may be NULL if the value is unknown",
        "ne": "मान थाहा नभए NULL हुन सक्छ"
      },
      {
        "en": "It may repeat across rows",
        "ne": "पङ्क्तिहरूमा दोहोरिन सक्छ"
      },
      {
        "en": "It must point at another table",
        "ne": "यसले अर्को तालिका देखाउनुपर्छ"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Unique and NOT NULL are the two rules a primary key must obey — together they are what let a row be found reliably. Pointing at another table is a foreign key, which may be NULL and may repeat.",
      "ne": "अद्वितीय र NOT NULL — primary key ले पालना गर्नुपर्ने दुई नियम यिनै हुन्। अर्को तालिका देखाउने काम foreign key को हो, जुन NULL हुन र दोहोरिन सक्छ।"
    }
  },
  {
    "id": "g10.db.q015",
    "subject": "grade10/dbms",
    "unit": "u2",
    "topic": "keys",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A candidate key is best described as…",
      "ne": "Candidate key को उत्तम व्याख्या कुन हो?"
    },
    "options": [
      {
        "en": "a super key with no unnecessary attribute in it",
        "ne": "कुनै अनावश्यक एट्रिब्युट नभएको super key"
      },
      {
        "en": "any set of columns that identifies a row",
        "ne": "पङ्क्ति चिनाउने जुनसुकै स्तम्भ समूह"
      },
      {
        "en": "the key that was chosen as primary",
        "ne": "primary का रूपमा छानिएको कुञ्जी"
      },
      {
        "en": "a column pointing at another table",
        "ne": "अर्को तालिका देखाउने स्तम्भ"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Any identifying set is a super key. Strip out everything unnecessary and it becomes a candidate key. One candidate key is then chosen as the primary key; the rest are alternate keys.",
      "ne": "पङ्क्ति चिनाउने जुनसुकै समूह super key हो। अनावश्यक कुरा हटाएपछि candidate key बन्छ। तीमध्ये एउटा primary key छानिन्छ; बाँकी alternate key हुन्।"
    }
  },
  {
    "id": "g10.db.q016",
    "subject": "grade10/dbms",
    "unit": "u2",
    "topic": "degree-of-relationship",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "An EMPLOYEE manages another EMPLOYEE. What is the degree of this relationship?",
      "ne": "एउटा EMPLOYEE ले अर्को EMPLOYEE लाई व्यवस्थापन गर्छ। यो सम्बन्धको degree कति हो?"
    },
    "options": [
      {
        "en": "Unary — one entity takes part",
        "ne": "Unary — एउटै इन्टिटी सहभागी"
      },
      {
        "en": "Binary — two entities take part",
        "ne": "Binary — दुई इन्टिटी सहभागी"
      },
      {
        "en": "Ternary — three entities take part",
        "ne": "Ternary — तीन इन्टिटी सहभागी"
      },
      {
        "en": "It has no degree",
        "ne": "यसको degree हुँदैन"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "The degree of a relationship counts the entities in it, not the rows. Only EMPLOYEE takes part here, related to itself, so the degree is unary. Do not confuse degree with cardinality.",
      "ne": "सम्बन्धको degree ले त्यसमा सहभागी इन्टिटी गन्छ, पङ्क्ति होइन। यहाँ EMPLOYEE मात्र छ, आफैंसँग सम्बन्धित, त्यसैले degree unary हो। Degree लाई cardinality सँग नमिसाउनुहोस्।"
    }
  },
  {
    "id": "g10.db.q017",
    "subject": "grade10/dbms",
    "unit": "u3",
    "topic": "degree-cardinality",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A table has 5 columns and 200 rows. What is its DEGREE?",
      "ne": "एउटा तालिकामा ५ स्तम्भ र २०० पङ्क्ति छन्। यसको DEGREE कति हो?"
    },
    "options": [
      {
        "en": "5",
        "ne": "५"
      },
      {
        "en": "200",
        "ne": "२००"
      },
      {
        "en": "1000",
        "ne": "१०००"
      },
      {
        "en": "205",
        "ne": "२०५"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Degree is the number of columns; cardinality is the number of rows. Here the degree is 5 and the cardinality is 200. Swapping these two is the commonest error in this unit.",
      "ne": "Degree भनेको स्तम्भ सङ्ख्या; cardinality भनेको पङ्क्ति सङ्ख्या। यहाँ degree ५ र cardinality २००। यी दुई साट्नु यस युनिटको सबैभन्दा सामान्य गल्ती हो।"
    }
  },
  {
    "id": "g10.db.q018",
    "subject": "grade10/dbms",
    "unit": "u3",
    "topic": "relation-properties",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which of these is NOT allowed in a relation?",
      "ne": "रिलेसनमा यीमध्ये कुन मिल्दैन?"
    },
    "options": [
      {
        "en": "Two rows that are completely identical",
        "ne": "पूरै उस्तै दुई पङ्क्ति"
      },
      {
        "en": "Rows stored in no particular order",
        "ne": "कुनै निश्चित क्रम नभएका पङ्क्ति"
      },
      {
        "en": "A column that allows NULL",
        "ne": "NULL राख्न दिने स्तम्भ"
      },
      {
        "en": "Columns listed in a different order",
        "ne": "फरक क्रममा राखिएका स्तम्भ"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "A relation is a set of tuples, so no two rows may be identical — the primary key guarantees it. Order is not significant for rows or columns, and NULLs are permitted in non-key columns.",
      "ne": "रिलेसन ट्युपलहरूको सेट हो, त्यसैले दुई पङ्क्ति उस्तै हुन पाउँदैनन् — primary key ले सुनिश्चित गर्छ। पङ्क्ति र स्तम्भको क्रमको महत्त्व हुँदैन, र कुञ्जी नभएका स्तम्भमा NULL मिल्छ।"
    }
  },
  {
    "id": "g10.db.q019",
    "subject": "grade10/dbms",
    "unit": "u3",
    "topic": "domain",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What is a DOMAIN in the relational model?",
      "ne": "रिलेसनल मोडेलमा DOMAIN भनेको के हो?"
    },
    "options": [
      {
        "en": "The set of values an attribute is allowed to hold",
        "ne": "कुनै एट्रिब्युटले लिन पाउने मानहरूको समूह"
      },
      {
        "en": "The number of rows in a table",
        "ne": "तालिकाका पङ्क्तिको सङ्ख्या"
      },
      {
        "en": "The name of the database",
        "ne": "डाटाबेसको नाम"
      },
      {
        "en": "The primary key of a relation",
        "ne": "रिलेसनको primary key"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "A domain constrains what may appear in a column. The domain of \"marks\" might be whole numbers from 0 to 100, so the text \"Ram\" could never be stored there.",
      "ne": "Domain ले स्तम्भमा के आउन सक्छ भन्ने सीमित गर्छ। \"marks\" को domain ० देखि १०० सम्मका पूर्ण सङ्ख्या होला, त्यसैले त्यहाँ \"Ram\" राख्न मिल्दैन।"
    }
  },
  {
    "id": "g10.db.q020",
    "subject": "grade10/dbms",
    "unit": "u3",
    "topic": "foreign-key",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Student.class_id is a foreign key to Class.class_id. An attempt is made to insert a student with class_id = 15, but no class 15 exists. What happens?",
      "ne": "Student.class_id ले Class.class_id लाई देखाउने foreign key हो। class_id = 15 भएको विद्यार्थी थप्न खोजियो, तर कक्षा १५ छैन। के हुन्छ?"
    },
    "options": [
      {
        "en": "It is refused — referential integrity is violated",
        "ne": "अस्वीकार हुन्छ — referential integrity उल्लङ्घन हुन्छ"
      },
      {
        "en": "It is accepted and class 15 is created automatically",
        "ne": "स्वीकार हुन्छ र कक्षा १५ आफैं बन्छ"
      },
      {
        "en": "It is accepted and the value becomes NULL",
        "ne": "स्वीकार हुन्छ र मान NULL बन्छ"
      },
      {
        "en": "It is accepted with a warning",
        "ne": "चेतावनीसहित स्वीकार हुन्छ"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Referential integrity says a foreign key may only hold a value that already exists as a primary key in the table it points at. It may be NULL — meaning \"not assigned\" — but it may not be wrong.",
      "ne": "Referential integrity अनुसार foreign key ले देखाइएको तालिकाको primary key मा पहिले नै भएको मान मात्र राख्न पाउँछ। NULL हुन सक्छ — \"तोकिएको छैन\" भन्ने अर्थमा — तर गलत हुन पाउँदैन।"
    }
  },
  {
    "id": "g10.db.q021",
    "subject": "grade10/dbms",
    "unit": "u3",
    "topic": "er-to-relational",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "When a 1:M relationship is converted to tables, where does the foreign key go?",
      "ne": "1:M सम्बन्धलाई तालिकामा बदल्दा foreign key कहाँ जान्छ?"
    },
    "options": [
      {
        "en": "Into the table on the MANY side",
        "ne": "\"धेरै\" तर्फको तालिकामा"
      },
      {
        "en": "Into the table on the ONE side",
        "ne": "\"एक\" तर्फको तालिकामा"
      },
      {
        "en": "Into a new third table",
        "ne": "नयाँ तेस्रो तालिकामा"
      },
      {
        "en": "Into both tables",
        "ne": "दुवै तालिकामा"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "The primary key of the \"one\" side is copied into the \"many\" side. Each student stores the one class_id they belong to. Doing it the other way round cannot work — a column holds one value, and a class has many students.",
      "ne": "\"एक\" तर्फको primary key \"धेरै\" तर्फ सारिन्छ। हरेक विद्यार्थीले आफू भएको एउटा class_id राख्छ। उल्टो गर्दा हुँदैन — स्तम्भले एउटै मान राख्छ, र कक्षामा धेरै विद्यार्थी हुन्छन्।"
    }
  },
  {
    "id": "g10.db.q022",
    "subject": "grade10/dbms",
    "unit": "u3",
    "topic": "relational-model",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "In the relational model, how are two tables connected?",
      "ne": "रिलेसनल मोडेलमा दुई तालिका कसरी जोडिन्छन्?"
    },
    "options": [
      {
        "en": "By keys",
        "ne": "कुञ्जीले"
      },
      {
        "en": "By pointers",
        "ne": "Pointer ले"
      },
      {
        "en": "By their position in the file",
        "ne": "फाइलमा तिनको स्थानले"
      },
      {
        "en": "By the order the rows were inserted",
        "ne": "पङ्क्ति थपिएको क्रमले"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "The relational model links tables by matching values — a foreign key holding a value that exists as a primary key elsewhere. It deliberately avoids pointers, which is what made it simpler than the models before it.",
      "ne": "रिलेसनल मोडेलले मान मिलाएर तालिका जोड्छ — foreign key सँग अन्यत्र primary key भएको मान। यसले जानाजान pointer प्रयोग गर्दैन, र यही कारण यो अघिल्ला मोडेलभन्दा सरल भयो।"
    }
  },
  {
    "id": "g10.db.q023",
    "subject": "grade10/dbms",
    "unit": "u4",
    "topic": "sql-families",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "To which family of SQL does CREATE TABLE belong?",
      "ne": "CREATE TABLE कुन SQL परिवारको हो?"
    },
    "options": [
      {
        "en": "DDL — Data Definition Language",
        "ne": "DDL — Data Definition Language"
      },
      {
        "en": "DML — Data Manipulation Language",
        "ne": "DML — Data Manipulation Language"
      },
      {
        "en": "DCL — Data Control Language",
        "ne": "DCL — Data Control Language"
      },
      {
        "en": "None of these",
        "ne": "यीमध्ये कुनै पनि होइन"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Sort a statement by what it changes. CREATE TABLE changes the structure, so it is DDL. DML changes the data inside; DCL changes who is allowed to use it.",
      "ne": "कथनले के बदल्छ त्यसैअनुसार छुट्याउनुहोस्। CREATE TABLE ले संरचना बदल्छ, त्यसैले DDL। DML ले भित्रको data, DCL ले प्रयोग गर्न पाउने अधिकार बदल्छ।"
    }
  },
  {
    "id": "g10.db.q024",
    "subject": "grade10/dbms",
    "unit": "u4",
    "topic": "delete-vs-drop",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What is left after DELETE FROM Student; runs?",
      "ne": "DELETE FROM Student; चलेपछि के बाँकी रहन्छ?"
    },
    "options": [
      {
        "en": "The table, with its structure but no rows",
        "ne": "तालिका — संरचनासहित तर पङ्क्तिविहीन"
      },
      {
        "en": "Nothing — the table is gone",
        "ne": "केही होइन — तालिका नै गयो"
      },
      {
        "en": "The rows, but no structure",
        "ne": "पङ्क्ति, तर संरचना छैन"
      },
      {
        "en": "An error, because WHERE is missing",
        "ne": "त्रुटि, किनभने WHERE छैन"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "DELETE removes rows; the table and its columns remain, and you can insert into it again tomorrow. DROP TABLE removes the table itself. This is the difference examiners ask for most often.",
      "ne": "DELETE ले पङ्क्ति हटाउँछ; तालिका र यसका स्तम्भ रहन्छन्, र भोलि फेरि पङ्क्ति थप्न सकिन्छ। DROP TABLE ले तालिका नै हटाउँछ। परीक्षकले सबैभन्दा धेरै सोध्ने फरक यही हो।"
    }
  },
  {
    "id": "g10.db.q025",
    "subject": "grade10/dbms",
    "unit": "u4",
    "topic": "select-where",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A Student table has 4 rows and 4 columns. SELECT name FROM Student WHERE marks > 60; returns 3 students. What is the shape of the result?",
      "ne": "Student तालिकामा ४ पङ्क्ति र ४ स्तम्भ छन्। SELECT name FROM Student WHERE marks > 60; ले ३ विद्यार्थी दिन्छ। नतिजाको आकार कस्तो हुन्छ?"
    },
    "options": [
      {
        "en": "3 rows and 1 column",
        "ne": "३ पङ्क्ति र १ स्तम्भ"
      },
      {
        "en": "3 rows and 4 columns",
        "ne": "३ पङ्क्ति र ४ स्तम्भ"
      },
      {
        "en": "4 rows and 1 column",
        "ne": "४ पङ्क्ति र १ स्तम्भ"
      },
      {
        "en": "4 rows and 4 columns",
        "ne": "४ पङ्क्ति र ४ स्तम्भ"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Two independent cuts. WHERE chooses rows: 4 becomes 3. SELECT chooses columns: 4 becomes 1, because only \"name\" is listed. Neither clause does the other one's job.",
      "ne": "दुई छुट्टै कटाइ। WHERE ले पङ्क्ति छान्छ: ४ बाट ३। SELECT ले स्तम्भ छान्छ: ४ बाट १, किनभने \"name\" मात्र लेखिएको छ। एउटाले अर्कोको काम गर्दैन।"
    }
  },
  {
    "id": "g10.db.q026",
    "subject": "grade10/dbms",
    "unit": "u4",
    "topic": "order-by",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A query returns 5 rows. ORDER BY marks DESC is added. How many rows now?",
      "ne": "एउटा क्वेरीले ५ पङ्क्ति दिन्छ। ORDER BY marks DESC थपियो। अब कति पङ्क्ति?"
    },
    "options": [
      {
        "en": "5 — sorting never removes a row",
        "ne": "५ — क्रम मिलाउँदा पङ्क्ति कहिल्यै हट्दैन"
      },
      {
        "en": "Fewer than 5",
        "ne": "५ भन्दा कम"
      },
      {
        "en": "1 — only the highest",
        "ne": "१ — सबैभन्दा माथिको मात्र"
      },
      {
        "en": "It depends on the marks",
        "ne": "अंकमा भर पर्छ"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "ORDER BY only rearranges. Filtering is WHERE's job. The result still has 5 rows, now in a different order.",
      "ne": "ORDER BY ले क्रम मात्र मिलाउँछ। छान्ने काम WHERE को हो। नतिजामा अझै ५ पङ्क्ति छन्, क्रम मात्र फरक।"
    }
  },
  {
    "id": "g10.db.q027",
    "subject": "grade10/dbms",
    "unit": "u4",
    "topic": "joins",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A join of Student and Class returns every student, and a NULL in the room column for one of them. Which join was used?",
      "ne": "Student र Class को join ले हरेक विद्यार्थी दिन्छ, र एक जनाको room स्तम्भमा NULL छ। कुन join प्रयोग भयो?"
    },
    "options": [
      {
        "en": "LEFT OUTER JOIN",
        "ne": "LEFT OUTER JOIN"
      },
      {
        "en": "INNER JOIN",
        "ne": "INNER JOIN"
      },
      {
        "en": "RIGHT OUTER JOIN",
        "ne": "RIGHT OUTER JOIN"
      },
      {
        "en": "NATURAL JOIN",
        "ne": "NATURAL JOIN"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Work backwards from where the NULL is. Every left row survived and the missing value is on the right, so it is a left join. An inner join would have dropped that student entirely.",
      "ne": "NULL कता छ भन्नेबाट उल्टो सोच्नुहोस्। बायाँका सबै पङ्क्ति बाँचे र नभएको मान दायाँ छ, त्यसैले left join। Inner join ले त्यो विद्यार्थीलाई पूरै हटाइदिन्थ्यो।"
    }
  },
  {
    "id": "g10.db.q028",
    "subject": "grade10/dbms",
    "unit": "u4",
    "topic": "joins",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which join keeps ONLY the rows that match on both sides?",
      "ne": "कुन join ले दुवैतर्फ मिल्ने पङ्क्ति मात्र राख्छ?"
    },
    "options": [
      {
        "en": "Inner join",
        "ne": "Inner join"
      },
      {
        "en": "Left outer join",
        "ne": "Left outer join"
      },
      {
        "en": "Right outer join",
        "ne": "Right outer join"
      },
      {
        "en": "Full outer join",
        "ne": "Full outer join"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "All five joins share the same matching test; they differ only in what they do with rows that did not match. Inner throws them away; the outer joins keep one side or both.",
      "ne": "पाँचै join को मिलान जाँच उही हो; फरक केवल नमिलेका पङ्क्तिको के गर्ने भन्नेमा। Inner ले फालिदिन्छ; outer join हरूले एक वा दुवैतर्फ राख्छन्।"
    }
  },
  {
    "id": "g10.db.q029",
    "subject": "grade10/dbms",
    "unit": "u4",
    "topic": "update",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A table has 40 rows. UPDATE Student SET marks = 80; is run, with no WHERE clause. What happens?",
      "ne": "तालिकामा ४० पङ्क्ति छन्। WHERE नराखी UPDATE Student SET marks = 80; चलाइयो। के हुन्छ?"
    },
    "options": [
      {
        "en": "All 40 rows are changed",
        "ne": "सबै ४० पङ्क्ति बदलिन्छन्"
      },
      {
        "en": "An error, because WHERE is required",
        "ne": "त्रुटि, किनभने WHERE अनिवार्य छ"
      },
      {
        "en": "Only the first row is changed",
        "ne": "पहिलो पङ्क्ति मात्र बदलिन्छ"
      },
      {
        "en": "Nothing changes",
        "ne": "केही बदलिँदैन"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "The statement is perfectly legal, so nothing warns you — the WHERE clause is optional, and without it the change applies to every row. This is why the WHERE clause should be written before the SET.",
      "ne": "कथन पूर्णतः वैध हुने भएकाले चेतावनी आउँदैन — WHERE ऐच्छिक हो, र नभए परिवर्तन हरेक पङ्क्तिमा लाग्छ। त्यसैले SET भन्दा पहिले WHERE लेख्ने बानी राख्नुहोस्।"
    }
  },
  {
    "id": "g10.db.q030",
    "subject": "grade10/dbms",
    "unit": "u4",
    "topic": "view",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What is an SQL VIEW?",
      "ne": "SQL VIEW भनेको के हो?"
    },
    "options": [
      {
        "en": "A stored query that behaves like a table but holds no data of its own",
        "ne": "तालिकाजस्तै व्यवहार गर्ने संग्रहित क्वेरी, जसको आफ्नो data हुँदैन"
      },
      {
        "en": "A copy of a table saved on disk",
        "ne": "डिस्कमा राखिएको तालिकाको प्रतिलिपि"
      },
      {
        "en": "A backup of the database",
        "ne": "डाटाबेसको backup"
      },
      {
        "en": "A type of primary key",
        "ne": "Primary key को एक प्रकार"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "A view reads from the real tables every time it is used, so it is always current. Views hide complexity — a long join becomes one name — and restrict access, since a user can be granted the view without the whole table.",
      "ne": "View ले प्रयोग हुँदा हरेक पटक वास्तविक तालिकाबाटै पढ्छ, त्यसैले सधैं ताजा हुन्छ। यसले जटिलता लुकाउँछ र पहुँच सीमित गर्छ — पूरै तालिका नदिई view दिन सकिन्छ।"
    }
  },
  {
    "id": "g10.db.q031",
    "subject": "grade10/dbms",
    "unit": "u4",
    "topic": "dcl",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which statement takes a privilege away from a user?",
      "ne": "कुन कथनले प्रयोगकर्ताबाट अधिकार खोस्छ?"
    },
    "options": [
      {
        "en": "REVOKE",
        "ne": "REVOKE"
      },
      {
        "en": "DELETE",
        "ne": "DELETE"
      },
      {
        "en": "DROP",
        "ne": "DROP"
      },
      {
        "en": "ROLLBACK",
        "ne": "ROLLBACK"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "GRANT gives a privilege and REVOKE takes it back; both are DCL. DELETE removes rows and DROP removes a table — those change data and structure, not permission.",
      "ne": "GRANT ले अधिकार दिन्छ र REVOKE ले फिर्ता लिन्छ; दुवै DCL हुन्। DELETE ले पङ्क्ति र DROP ले तालिका हटाउँछ — ती data र संरचना बदल्छन्, अधिकार होइन।"
    }
  },
  {
    "id": "g10.db.q032",
    "subject": "grade10/dbms",
    "unit": "u4",
    "topic": "sql-syntax",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which condition correctly selects students named Ram?",
      "ne": "राम नाम गरेका विद्यार्थी छान्न कुन सर्त सही छ?"
    },
    "options": [
      {
        "en": "WHERE name = 'Ram'",
        "ne": "WHERE name = 'Ram'"
      },
      {
        "en": "WHERE name = Ram",
        "ne": "WHERE name = Ram"
      },
      {
        "en": "WHERE name == Ram",
        "ne": "WHERE name == Ram"
      },
      {
        "en": "WHERE name IS Ram",
        "ne": "WHERE name IS Ram"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Text values need single quotes. Without them the database looks for a COLUMN called Ram and reports that no such column exists. SQL uses a single = for comparison, not ==.",
      "ne": "पाठ मानलाई एकल उद्धरण चिन्ह चाहिन्छ। नभए डाटाबेसले Ram नामको स्तम्भ खोज्छ र त्यस्तो स्तम्भ छैन भन्छ। SQL मा तुलनाका लागि एउटै = हुन्छ, == होइन।"
    }
  },
  {
    "id": "g10.db.q033",
    "subject": "grade10/dbms",
    "unit": "u5",
    "topic": "normalization-purpose",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Why is normalization performed?",
      "ne": "Normalization किन गरिन्छ?"
    },
    "options": [
      {
        "en": "To remove insertion, deletion and update anomalies",
        "ne": "Insertion, deletion र update anomaly हटाउन"
      },
      {
        "en": "To make queries run faster",
        "ne": "क्वेरी छिटो चलाउन"
      },
      {
        "en": "To save disk space, which is its main purpose",
        "ne": "डिस्क ठाउँ बचाउन — यही मुख्य उद्देश्य हो"
      },
      {
        "en": "To encrypt the data",
        "ne": "Data encrypt गर्न"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Normalization removes the three anomalies caused by repeating a fact in many rows. Less space is a side effect, and queries often get slower, not faster, because more joins are needed.",
      "ne": "Normalization ले उही तथ्य धेरै पङ्क्तिमा दोहोरिँदा आउने तीन anomaly हटाउँछ। कम ठाउँ सहायक असर हो, र join बढ्ने भएकाले क्वेरी प्रायः छिटो होइन, ढिलो हुन्छ।"
    }
  },
  {
    "id": "g10.db.q034",
    "subject": "grade10/dbms",
    "unit": "u5",
    "topic": "1nf",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A cell holds the value \"Maths, Science\". Which normal form does this break?",
      "ne": "एउटा कक्षमा \"Maths, Science\" छ। यसले कुन normal form तोड्छ?"
    },
    "options": [
      {
        "en": "1NF",
        "ne": "1NF"
      },
      {
        "en": "2NF",
        "ne": "2NF"
      },
      {
        "en": "3NF",
        "ne": "3NF"
      },
      {
        "en": "None — it is allowed",
        "ne": "कुनै पनि होइन — यो मिल्छ"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "1NF requires every cell to hold a single atomic value. Two subjects in one cell is a repeating group, and splitting it into separate rows is the first step of normalising.",
      "ne": "1NF ले हरेक कक्षमा एउटै अविभाज्य मान माग्छ। एउटै कक्षमा दुई विषय दोहोरिने समूह हो, र यसलाई छुट्टै पङ्क्तिमा बाँड्नु normalise गर्ने पहिलो चरण हो।"
    }
  },
  {
    "id": "g10.db.q035",
    "subject": "grade10/dbms",
    "unit": "u5",
    "topic": "2nf",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A table has the composite key (student_id, subject) and holds the student's name, which depends on student_id alone. What is this called?",
      "ne": "एउटा तालिकाको composite कुञ्जी (student_id, subject) छ र त्यसमा विद्यार्थीको नाम छ, जुन student_id मा मात्र निर्भर छ। यसलाई के भनिन्छ?"
    },
    "options": [
      {
        "en": "A partial dependency",
        "ne": "Partial dependency"
      },
      {
        "en": "A transitive dependency",
        "ne": "Transitive dependency"
      },
      {
        "en": "A full dependency",
        "ne": "Full dependency"
      },
      {
        "en": "A referential dependency",
        "ne": "Referential dependency"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "The key is both columns together, but name depends on only part of it. That is a partial dependency, and removing it is exactly what 2NF does. It can only happen when the key is composite.",
      "ne": "कुञ्जी दुवै स्तम्भ मिलेर हो, तर name त्यसको एक भागमा मात्र निर्भर छ। यही partial dependency हो, र 2NF ले हटाउने पनि यही। कुञ्जी composite भएमा मात्र यो सम्भव हुन्छ।"
    }
  },
  {
    "id": "g10.db.q036",
    "subject": "grade10/dbms",
    "unit": "u5",
    "topic": "3nf",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "In Student(roll, name, class_id, class_room), class_room depends on class_id, which depends on roll. Which normal form does this break?",
      "ne": "Student(roll, name, class_id, class_room) मा class_room, class_id मा निर्भर छ र class_id, roll मा। यसले कुन normal form तोड्छ?"
    },
    "options": [
      {
        "en": "3NF — it is a transitive dependency",
        "ne": "3NF — यो transitive dependency हो"
      },
      {
        "en": "1NF — the values are not atomic",
        "ne": "1NF — मान अविभाज्य छैनन्"
      },
      {
        "en": "2NF — it is a partial dependency",
        "ne": "2NF — यो partial dependency हो"
      },
      {
        "en": "None of them",
        "ne": "कुनै पनि होइन"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "A non-key column depending on another non-key column is a transitive dependency, and 3NF forbids it. The fix is to move class_id and class_room into a Class table of their own.",
      "ne": "कुञ्जी नभएको स्तम्भ अर्को कुञ्जी नभएको स्तम्भमा निर्भर हुनु transitive dependency हो, र 3NF ले यसलाई निषेध गर्छ। समाधान: class_id र class_room लाई छुट्टै Class तालिकामा सार्ने।"
    }
  },
  {
    "id": "g10.db.q037",
    "subject": "grade10/dbms",
    "unit": "u5",
    "topic": "functional-dependency",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What does A → B mean?",
      "ne": "A → B को अर्थ के हो?"
    },
    "options": [
      {
        "en": "Each value of A determines exactly one value of B",
        "ne": "A को हरेक मानले B को ठ्याक्कै एउटा मान तय गर्छ"
      },
      {
        "en": "A and B are always equal",
        "ne": "A र B सधैं बराबर हुन्छन्"
      },
      {
        "en": "B is the primary key of A",
        "ne": "B, A को primary key हो"
      },
      {
        "en": "A points at B as a foreign key",
        "ne": "A ले B लाई foreign key का रूपमा देखाउँछ"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Read it as \"A determines B\". student_id → name holds, because one id gives one name. The reverse usually does not: two students may share a name.",
      "ne": "\"A ले B तय गर्छ\" भनेर पढ्नुहोस्। student_id → name मिल्छ, किनभने एउटा id ले एउटै नाम दिन्छ। उल्टो प्रायः मिल्दैन: दुई विद्यार्थीको नाम उही हुन सक्छ।"
    }
  },
  {
    "id": "g10.db.q038",
    "subject": "grade10/dbms",
    "unit": "u5",
    "topic": "anomalies",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A class's room number is stored on every student row. The last student in that class is deleted, and the room number is lost. What is this called?",
      "ne": "कक्षाको कोठा नम्बर हरेक विद्यार्थीको पङ्क्तिमा छ। त्यस कक्षाको अन्तिम विद्यार्थी हटाइयो र कोठा नम्बर हरायो। यसलाई के भनिन्छ?"
    },
    "options": [
      {
        "en": "A deletion anomaly",
        "ne": "Deletion anomaly"
      },
      {
        "en": "An update anomaly",
        "ne": "Update anomaly"
      },
      {
        "en": "An insertion anomaly",
        "ne": "Insertion anomaly"
      },
      {
        "en": "A referential anomaly",
        "ne": "Referential anomaly"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Deleting one thing has destroyed an unrelated fact — the room still exists, but the database no longer knows about it. That is a deletion anomaly, and normalising into a separate Class table prevents it.",
      "ne": "एउटा कुरा हटाउँदा असम्बन्धित तथ्य नष्ट भयो — कोठा अझै छ, तर डाटाबेसलाई थाहा छैन। यही deletion anomaly हो, र छुट्टै Class तालिका बनाए रोकिन्छ।"
    }
  },
  {
    "id": "g10.db.q039",
    "subject": "grade10/dbms",
    "unit": "u6",
    "topic": "transaction-definition",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What is a transaction?",
      "ne": "ट्रान्ज्याक्सन के हो?"
    },
    "options": [
      {
        "en": "A logical unit of work that must be done completely or not at all",
        "ne": "एउटा तार्किक काम, जुन पूरै हुनुपर्छ वा बिल्कुल हुनुहुँदैन"
      },
      {
        "en": "A single SQL statement",
        "ne": "एउटा मात्र SQL कथन"
      },
      {
        "en": "A backup of the database",
        "ne": "डाटाबेसको backup"
      },
      {
        "en": "A connection between two tables",
        "ne": "दुई तालिकाबीचको जोडाइ"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "A transaction is usually several statements, not one. What makes it a transaction is the all-or-nothing promise: a bank transfer is a debit and a credit, and neither may happen alone.",
      "ne": "ट्रान्ज्याक्सनमा प्रायः धेरै कथन हुन्छन्, एउटा होइन। यसलाई ट्रान्ज्याक्सन बनाउने कुरा \"पूरै वा बिल्कुल होइन\" भन्ने वचन हो।"
    }
  },
  {
    "id": "g10.db.q040",
    "subject": "grade10/dbms",
    "unit": "u6",
    "topic": "acid",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which ACID property guarantees that a committed transaction survives a power failure?",
      "ne": "Commit भइसकेको ट्रान्ज्याक्सन बिजुली गएपछि पनि रहन्छ भन्ने कुन ACID गुणले सुनिश्चित गर्छ?"
    },
    "options": [
      {
        "en": "Durability",
        "ne": "Durability"
      },
      {
        "en": "Atomicity",
        "ne": "Atomicity"
      },
      {
        "en": "Isolation",
        "ne": "Isolation"
      },
      {
        "en": "Consistency",
        "ne": "Consistency"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Durability protects work that has committed. Atomicity is the opposite promise — it undoes work that had NOT committed. The test is always whether a COMMIT happened.",
      "ne": "Durability ले commit भइसकेको काम जोगाउँछ। Atomicity उल्टो वचन हो — commit नभएको काम फिर्ता लैजान्छ। जाँच सधैं COMMIT भयो कि भएन भन्ने हो।"
    }
  },
  {
    "id": "g10.db.q041",
    "subject": "grade10/dbms",
    "unit": "u6",
    "topic": "acid",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A transfer debits Ram but crashes before crediting Sita. The transaction had not committed. What does the database do on restart?",
      "ne": "रकम सार्दा रामको खाताबाट कटियो तर सीतालाई जम्मा हुनुअघि crash भयो। ट्रान्ज्याक्सन commit भएको थिएन। पुनः सुरु हुँदा डाटाबेसले के गर्छ?"
    },
    "options": [
      {
        "en": "Rolls the debit back, so Ram's balance is unchanged",
        "ne": "कटौती फिर्ता लैजान्छ, रामको मौज्दात उस्तै रहन्छ"
      },
      {
        "en": "Completes the transfer automatically",
        "ne": "रकम सार्ने काम आफैं पूरा गर्छ"
      },
      {
        "en": "Leaves the debit in place and reports an error",
        "ne": "कटौती त्यसै छाडेर त्रुटि देखाउँछ"
      },
      {
        "en": "Deletes both accounts",
        "ne": "दुवै खाता हटाउँछ"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "With no COMMIT record in the log, recovery undoes everything the transaction did. That is atomicity: half a transfer may not survive. Had it committed, redo would have re-applied it instead.",
      "ne": "Log मा COMMIT रेकर्ड नभएकाले recovery ले ट्रान्ज्याक्सनले गरेका सबै काम उल्टाउँछ। यही atomicity हो: आधा रकम सारेको बाँच्न पाउँदैन। Commit भएको भए redo ले फेरि लागू गर्थ्यो।"
    }
  },
  {
    "id": "g10.db.q042",
    "subject": "grade10/dbms",
    "unit": "u6",
    "topic": "transaction-states",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which are the two FINAL states of a transaction?",
      "ne": "ट्रान्ज्याक्सनका दुई अन्तिम अवस्था कुन हुन्?"
    },
    "options": [
      {
        "en": "Committed and aborted",
        "ne": "Committed र aborted"
      },
      {
        "en": "Active and failed",
        "ne": "Active र failed"
      },
      {
        "en": "Partially committed and committed",
        "ne": "Partially committed र committed"
      },
      {
        "en": "Failed and partially committed",
        "ne": "Failed र partially committed"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Every transaction ends in exactly one of these two. Active, partially committed and failed are all states it passes through on the way.",
      "ne": "हरेक ट्रान्ज्याक्सन यी दुईमध्ये ठ्याक्कै एउटामा टुङ्गिन्छ। Active, partially committed र failed बाटोमा पर्ने अवस्था हुन्।"
    }
  },
  {
    "id": "g10.db.q043",
    "subject": "grade10/dbms",
    "unit": "u6",
    "topic": "concurrency",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Two clerks read a balance of 5000. One writes 4000, then the other writes 3000 using the value it read first. What problem is this?",
      "ne": "दुई कर्मचारीले ५००० मौज्दात पढे। एउटाले ४००० लेख्यो, अनि अर्कोले पहिले पढेको मानबाट ३००० लेख्यो। यो कुन समस्या हो?"
    },
    "options": [
      {
        "en": "The lost update problem",
        "ne": "Lost update समस्या"
      },
      {
        "en": "A deletion anomaly",
        "ne": "Deletion anomaly"
      },
      {
        "en": "A partial dependency",
        "ne": "Partial dependency"
      },
      {
        "en": "A referential integrity violation",
        "ne": "Referential integrity उल्लङ्घन"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "The first withdrawal has vanished. Neither clerk did anything wrong — each did correct arithmetic on a value that was correct when read. The fault is uncontrolled interleaving, which locks prevent.",
      "ne": "पहिलो निकासी हरायो। कसैले गलत गरेको होइन — दुवैले पढ्दाको सही मानमा सही गणित गरे। दोष अनियन्त्रित क्रम मिसिनुमा छ, जसलाई lock ले रोक्छ।"
    }
  },
  {
    "id": "g10.db.q044",
    "subject": "grade10/dbms",
    "unit": "u6",
    "topic": "commit-rollback",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What does ROLLBACK do?",
      "ne": "ROLLBACK ले के गर्छ?"
    },
    "options": [
      {
        "en": "Undoes every change the transaction made",
        "ne": "ट्रान्ज्याक्सनले गरेका सबै परिवर्तन फिर्ता लैजान्छ"
      },
      {
        "en": "Makes the changes permanent",
        "ne": "परिवर्तनलाई स्थायी बनाउँछ"
      },
      {
        "en": "Deletes the table",
        "ne": "तालिका हटाउँछ"
      },
      {
        "en": "Takes a backup",
        "ne": "Backup लिन्छ"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "ROLLBACK returns the database to the state it was in before the transaction began. COMMIT is the opposite — it makes the changes permanent. Exactly one of the two ends a transaction.",
      "ne": "ROLLBACK ले डाटाबेसलाई ट्रान्ज्याक्सन सुरु हुनुअघिकै अवस्थामा फर्काउँछ। COMMIT उल्टो हो — परिवर्तनलाई स्थायी बनाउँछ। ट्रान्ज्याक्सन यीमध्ये एउटाले टुङ्गिन्छ।"
    }
  },
  {
    "id": "g10.db.q045",
    "subject": "grade10/dbms",
    "unit": "u7",
    "topic": "backup-types",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A backup consists of the SQL statements needed to rebuild the database. What type is it?",
      "ne": "कुनै backup मा डाटाबेस पुनर्निर्माण गर्ने SQL कथनहरू छन्। यो कुन प्रकारको हो?"
    },
    "options": [
      {
        "en": "Logical backup",
        "ne": "Logical backup"
      },
      {
        "en": "Physical backup",
        "ne": "Physical backup"
      },
      {
        "en": "Incremental backup",
        "ne": "Incremental backup"
      },
      {
        "en": "Differential backup",
        "ne": "Differential backup"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "A logical backup stores the SQL that would recreate the data, so it is readable and can be restored onto a different system. A physical backup copies the database files themselves.",
      "ne": "Logical backup ले data पुनः बनाउने SQL राख्छ, त्यसैले पढ्न मिल्छ र फरक प्रणालीमा पनि फर्काउन सकिन्छ। Physical backup ले डाटाबेस फाइल नै प्रतिलिपि गर्छ।"
    }
  },
  {
    "id": "g10.db.q046",
    "subject": "grade10/dbms",
    "unit": "u7",
    "topic": "backup-methods",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A full backup runs Sunday, and INCREMENTAL backups run Monday to Friday. The disk fails on Friday night. What is needed to restore?",
      "ne": "आइतबार full backup, र सोमदेखि शुक्रसम्म INCREMENTAL backup चल्छ। शुक्रबार राति डिस्क बिग्रियो। फर्काउन के चाहिन्छ?"
    },
    "options": [
      {
        "en": "The full backup plus every incremental, in order",
        "ne": "Full backup र सबै incremental, क्रमैसँग"
      },
      {
        "en": "The full backup plus Friday's incremental only",
        "ne": "Full backup र शुक्रबारको incremental मात्र"
      },
      {
        "en": "Friday's incremental only",
        "ne": "शुक्रबारको incremental मात्र"
      },
      {
        "en": "The full backup only",
        "ne": "Full backup मात्र"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "An incremental backup holds only what changed since the LAST backup, so each day's changes exist in exactly one file and all are needed. A differential holds everything since the last FULL backup, so only the newest one would be required.",
      "ne": "Incremental ले अघिल्लो backup देखिको परिवर्तन मात्र राख्छ, त्यसैले हरेक दिनको परिवर्तन एउटै फाइलमा हुन्छ र सबै चाहिन्छ। Differential ले अघिल्लो FULL देखिका सबै राख्छ, त्यसैले पछिल्लो एउटै पुग्थ्यो।"
    }
  },
  {
    "id": "g10.db.q047",
    "subject": "grade10/dbms",
    "unit": "u7",
    "topic": "recovery",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "After a crash, the log shows T1 with a COMMIT record and T2 without one. What does recovery do?",
      "ne": "Crash पछि log मा T1 सँग COMMIT रेकर्ड छ र T2 सँग छैन। Recovery ले के गर्छ?"
    },
    "options": [
      {
        "en": "REDO T1 and UNDO T2",
        "ne": "T1 लाई REDO र T2 लाई UNDO"
      },
      {
        "en": "UNDO T1 and REDO T2",
        "ne": "T1 लाई UNDO र T2 लाई REDO"
      },
      {
        "en": "REDO both",
        "ne": "दुवैलाई REDO"
      },
      {
        "en": "UNDO both",
        "ne": "दुवैलाई UNDO"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "The COMMIT record is the only test. A committed transaction is redone so its work exists — durability. An uncommitted one is undone so no half-finished work survives — atomicity.",
      "ne": "COMMIT रेकर्ड नै एउटै जाँच हो। Commit भएकोलाई redo गरिन्छ ताकि काम रहोस् — durability। नभएकोलाई undo गरिन्छ ताकि आधा काम नबाँचोस् — atomicity।"
    }
  },
  {
    "id": "g10.db.q048",
    "subject": "grade10/dbms",
    "unit": "u7",
    "topic": "security",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A user logs in successfully but is refused permission to change marks. Which is at work?",
      "ne": "प्रयोगकर्ता सफलतापूर्वक लगइन गरे तर अंक बदल्ने अनुमति पाएनन्। यहाँ के लागू भइरहेको छ?"
    },
    "options": [
      {
        "en": "Authorisation",
        "ne": "Authorisation"
      },
      {
        "en": "Authentication",
        "ne": "Authentication"
      },
      {
        "en": "Encryption",
        "ne": "Encryption"
      },
      {
        "en": "Recovery",
        "ne": "Recovery"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Authentication proved WHO they are — the login succeeded. Authorisation decides WHAT they may do, and it is what refused the change. GRANT and REVOKE control it.",
      "ne": "Authentication ले उनी को हुन् भन्ने प्रमाणित गर्‍यो — लगइन सफल भयो। Authorisation ले के गर्न पाउने भन्ने तय गर्छ, र यसैले रोक्यो। GRANT र REVOKE ले नियन्त्रण गर्छन्।"
    }
  },
  {
    "id": "g10.db.q049",
    "subject": "grade10/dbms",
    "unit": "u7",
    "topic": "security-threats",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A user types SQL into a login box and the program runs it, exposing the whole table. What is this threat called?",
      "ne": "प्रयोगकर्ताले लगइन बाकसमा SQL टाइप गर्दा प्रोग्रामले चलाइदियो र पूरै तालिका देखियो। यो खतरालाई के भनिन्छ?"
    },
    "options": [
      {
        "en": "SQL injection",
        "ne": "SQL injection"
      },
      {
        "en": "A lost update",
        "ne": "Lost update"
      },
      {
        "en": "A deletion anomaly",
        "ne": "Deletion anomaly"
      },
      {
        "en": "Privilege abuse",
        "ne": "अधिकारको दुरुपयोग"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "SQL injection happens when user input is treated as SQL instead of as data. Privilege abuse is different — that is a legitimate user doing more than their job requires.",
      "ne": "प्रयोगकर्ताले लेखेको कुरालाई data होइन SQL मानेर चलाउँदा SQL injection हुन्छ। अधिकारको दुरुपयोग फरक हो — त्यो वैध प्रयोगकर्ताले काम भन्दा बढी गर्नु हो।"
    }
  },
  {
    "id": "g10.db.q050",
    "subject": "grade10/dbms",
    "unit": "u7",
    "topic": "backup-vs-recovery",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which statement is correct?",
      "ne": "कुन भनाइ सही हो?"
    },
    "options": [
      {
        "en": "Backup is the copy taken in advance; recovery is the process of using it after a failure",
        "ne": "Backup पहिले लिइने प्रतिलिपि हो; recovery असफलतापछि त्यो प्रयोग गर्ने प्रक्रिया"
      },
      {
        "en": "Backup and recovery are two names for the same process",
        "ne": "Backup र recovery एउटै प्रक्रियाका दुई नाम हुन्"
      },
      {
        "en": "Recovery is taken every night; backup runs after a crash",
        "ne": "Recovery हरेक रात लिइन्छ; backup crash पछि चल्छ"
      },
      {
        "en": "Backup is only needed if there is no log",
        "ne": "Log नभएमा मात्र backup चाहिन्छ"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "They are separate: the backup is prepared before anything goes wrong, and recovery is the process — using the backup and the log — that puts the database back into a consistent state afterwards.",
      "ne": "यी फरक हुन्: केही बिग्रनुअघि backup तयार गरिन्छ, र recovery भनेको त्यसपछि backup र log प्रयोग गरेर डाटाबेसलाई सङ्गत अवस्थामा फर्काउने प्रक्रिया हो।"
    }
  },
  {
    "id": "g10.db.q051",
    "subject": "grade10/dbms",
    "unit": "u7",
    "topic": "failure-reasons",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which of these is a HUMAN cause of database failure?",
      "ne": "यीमध्ये कुन डाटाबेस बिग्रनुको मानवीय कारण हो?"
    },
    "options": [
      {
        "en": "Running DELETE without a WHERE clause",
        "ne": "WHERE नराखी DELETE चलाउनु"
      },
      {
        "en": "A disk head crash",
        "ne": "डिस्क बिग्रनु"
      },
      {
        "en": "A power cut",
        "ne": "बिजुली जानु"
      },
      {
        "en": "An earthquake",
        "ne": "भूकम्प"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "A missing WHERE clause is human error, and it is one of the commonest causes of real data loss — precisely because the statement is legal and nothing warns you.",
      "ne": "WHERE छुटाउनु मानवीय गल्ती हो, र वास्तविक data हराउने सबैभन्दा सामान्य कारणमध्ये एक — किनभने कथन वैध हुन्छ र कुनै चेतावनी आउँदैन।"
    }
  },
  {
    "id": "g10.db.q052",
    "subject": "grade10/dbms",
    "unit": "u7",
    "topic": "encryption",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What does encryption protect against that a password does not?",
      "ne": "पासवर्डले नजोगाउने कुन कुराबाट encryption ले जोगाउँछ?"
    },
    "options": [
      {
        "en": "Someone who obtains the database file itself",
        "ne": "डाटाबेस फाइल नै हात पारेको व्यक्तिबाट"
      },
      {
        "en": "A user who forgets their password",
        "ne": "पासवर्ड बिर्सने प्रयोगकर्ताबाट"
      },
      {
        "en": "A power failure",
        "ne": "बिजुली जानुबाट"
      },
      {
        "en": "A disk crash",
        "ne": "डिस्क बिग्रनुबाट"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "A password stops someone logging in. It does nothing once the file has been copied — a stolen backup can simply be opened. Encryption makes the contents unreadable without the key, which is why unencrypted backups are a listed threat.",
      "ne": "पासवर्डले लगइन रोक्छ। फाइल नै प्रतिलिपि भइसकेपछि केही गर्दैन — चोरिएको backup खोल्न सकिन्छ। Encryption ले कुञ्जीविना सामग्री पढ्न नमिल्ने बनाउँछ, त्यसैले encrypt नगरिएको backup खतराको सूचीमा छ।"
    }
  }
]);

QuizService.registerBank("grade10/hardware", [
  {
    "id": "g10.hw.q001",
    "subject": "grade10/hardware",
    "unit": "u1",
    "topic": "matter-atom",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which subatomic particle carries a positive charge?",
      "ne": "कुन उप-आणविक कणले धनात्मक चार्ज बोक्छ?"
    },
    "options": [
      {
        "en": "Electron",
        "ne": "Electron"
      },
      {
        "en": "Proton",
        "ne": "Proton"
      },
      {
        "en": "Neutron",
        "ne": "Neutron"
      },
      {
        "en": "Molecule",
        "ne": "Molecule"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The proton is positive and sits in the nucleus. The neutron is also in the nucleus but has no charge; the electron is negative and orbits in shells. A molecule is not a subatomic particle at all — it is made of atoms.",
      "ne": "Proton धनात्मक हुन्छ र nucleus मा बस्छ। Neutron पनि nucleus मै हुन्छ तर चार्ज हुँदैन; electron ऋणात्मक हुन्छ र शेलमा घुम्छ। Molecule उप-आणविक कण नै होइन — यो atom हरूबाट बनेको हुन्छ।"
    }
  },
  {
    "id": "g10.hw.q002",
    "subject": "grade10/hardware",
    "unit": "u1",
    "topic": "kirchhoff",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "At a junction, currents of 6 A and 2 A flow in, and 3 A flows out on one branch. What flows out on the remaining branch?",
      "ne": "एउटा जोडमा ६ A र २ A भित्र आउँछन्, र एउटा शाखाबाट ३ A बाहिर जान्छ। बाँकी शाखाबाट कति बाहिर जान्छ?"
    },
    "options": [
      {
        "en": "5 A",
        "ne": "५ A"
      },
      {
        "en": "11 A",
        "ne": "११ A"
      },
      {
        "en": "3 A",
        "ne": "३ A"
      },
      {
        "en": "1 A",
        "ne": "१ A"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "KCL: total in equals total out. In = 6 + 2 = 8 A. Known out = 3 A, so the remaining branch carries 8 − 3 = 5 A. Choosing 11 A means the 3 A was added instead of subtracted — a sign error, not a knowledge gap.",
      "ne": "KCL: भित्र आउने कुल र बाहिर जाने कुल बराबर। भित्र = ६ + २ = ८ A। थाहा भएको बाहिर = ३ A, त्यसैले बाँकी शाखाले ८ − ३ = ५ A बोक्छ। ११ A छान्नु भनेको ३ A घटाउनुको साटो जोडिनु — ज्ञानको कमी होइन, चिन्हको गल्ती।"
    }
  },
  {
    "id": "g10.hw.q003",
    "subject": "grade10/hardware",
    "unit": "u1",
    "topic": "doping",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Silicon is doped with a trivalent impurity such as boron. What is produced?",
      "ne": "Silicon मा boron जस्तो trivalent अशुद्धि मिसाइयो। के बन्छ?"
    },
    "options": [
      {
        "en": "N-type, with electrons as the majority carrier",
        "ne": "N-type, electron बहुसंख्यक वाहक भएको"
      },
      {
        "en": "P-type, with holes as the majority carrier",
        "ne": "P-type, hole बहुसंख्यक वाहक भएको"
      },
      {
        "en": "P-type, which carries a negative charge",
        "ne": "P-type, जसमा ऋणात्मक चार्ज हुन्छ"
      },
      {
        "en": "Pure silicon with better conductivity",
        "ne": "शुद्ध silicon, राम्रो चालकता भएको"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Trivalent means three valence electrons, so one of silicon's four bonds is left unfilled — that gap is a hole, and holes dominating makes it P-type. Option 3 is the trap: P-type is NOT charged. Doping adds a carrier, not a charge, because the impurity atom brings its own protons.",
      "ne": "Trivalent भनेको तीन valence electron, त्यसैले silicon का चारमध्ये एउटा बन्धन खाली रहन्छ — त्यो खाली ठाउँ hole हो, र hole हावी हुँदा P-type बन्छ। तेस्रो विकल्प पासो हो: P-type मा चार्ज हुँदैन। Doping ले वाहक थप्छ, चार्ज होइन — किनकि अशुद्धिको atom आफ्नै proton सहित आउँछ।"
    }
  },
  {
    "id": "g10.hw.q004",
    "subject": "grade10/hardware",
    "unit": "u1",
    "topic": "pn-junction",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A silicon diode is connected in reverse bias. What happens?",
      "ne": "एउटा silicon diode reverse bias मा जोडियो। के हुन्छ?"
    },
    "options": [
      {
        "en": "The depletion region narrows and current flows freely",
        "ne": "Depletion region साँघुरो हुन्छ र current स्वतन्त्र बग्छ"
      },
      {
        "en": "The depletion region widens and only a small leakage current flows",
        "ne": "Depletion region चौडा हुन्छ र सानो leakage current मात्र बग्छ"
      },
      {
        "en": "The depletion region disappears completely",
        "ne": "Depletion region पूरै हराउँछ"
      },
      {
        "en": "The diode is destroyed immediately",
        "ne": "Diode तुरुन्तै नष्ट हुन्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Reverse bias pulls carriers away from the junction, so the region empty of carriers grows wider and the barrier increases. Note the wording: a small leakage current, carried by the minority carriers, does still flow — writing \"no current at all\" loses the mark that \"negligible leakage current\" earns.",
      "ne": "Reverse bias ले वाहकलाई जोडबाट टाढा तान्छ, त्यसैले वाहकविहीन क्षेत्र चौडा हुन्छ र barrier बढ्छ। शब्द ध्यान दिनुहोस्: अल्पसंख्यक वाहकले बोक्ने सानो leakage current भने बग्छ — \"बिल्कुलै current छैन\" लेख्दा अंक गुम्छ, \"नगण्य leakage current\" ले पाउँछ।"
    }
  },
  {
    "id": "g10.hw.q005",
    "subject": "grade10/hardware",
    "unit": "u2",
    "topic": "cpu-units",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which unit performs the comparison in the instruction \"IF marks > 40\"?",
      "ne": "\"IF marks > 40\" निर्देशनमा तुलना कुन एकाइले गर्छ?"
    },
    "options": [
      {
        "en": "The control unit",
        "ne": "Control unit"
      },
      {
        "en": "The ALU",
        "ne": "ALU"
      },
      {
        "en": "The memory unit",
        "ne": "Memory unit"
      },
      {
        "en": "The input unit",
        "ne": "Input unit"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A comparison is a LOGICAL operation, and every logical and arithmetic operation happens in the ALU. The control unit fetched and decoded the instruction and will act on the result, but it does not do the comparing itself. This is the most confused pair in the unit.",
      "ne": "तुलना <b>तार्किक</b> काम हो, र हरेक तार्किक तथा अंकगणितीय काम ALU मा हुन्छ। Control unit ले निर्देशन ल्यायो, बुझ्यो र नतिजामा काम गर्नेछ, तर तुलना आफैँ गर्दैन। यस युनिटमा सबैभन्दा बढी मिसिने जोडी यही हो।"
    }
  },
  {
    "id": "g10.hw.q006",
    "subject": "grade10/hardware",
    "unit": "u2",
    "topic": "input-devices",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "You scan a printed page. What do you have immediately afterwards?",
      "ne": "तपाईंले छापिएको पाना स्क्यान गर्नुभयो। लगत्तै तपाईंसँग के हुन्छ?"
    },
    "options": [
      {
        "en": "Editable text",
        "ne": "सम्पादन गर्न मिल्ने अक्षर"
      },
      {
        "en": "An image of the page",
        "ne": "पानाको चित्र"
      },
      {
        "en": "A printed copy",
        "ne": "छापिएको प्रतिलिपि"
      },
      {
        "en": "A compressed archive",
        "ne": "Compress गरिएको archive"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A scanner measures reflected light and produces a picture. The letters in it are dark pixels, not characters. OCR software must analyse that image before anything becomes editable text — which is why \"scan then edit\" always has a step in between.",
      "ne": "Scanner ले परावर्तित बत्ती नाप्छ र तस्बिर बनाउँछ। त्यसका अक्षर कालो पिक्सेल हुन्, अक्षर होइनन्। सम्पादन गर्न मिल्ने अक्षर बन्नुअघि OCR सफ्टवेयरले त्यो चित्र विश्लेषण गर्नैपर्छ — त्यसैले \"स्क्यान गरेर सम्पादन\" बीचमा सधैं एउटा चरण हुन्छ।"
    }
  },
  {
    "id": "g10.hw.q007",
    "subject": "grade10/hardware",
    "unit": "u2",
    "topic": "display",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A user says the screen flickers and their eyes hurt after an hour. Which setting should you change?",
      "ne": "प्रयोगकर्ताले स्क्रिन झिमझिम गर्छ र एक घण्टापछि आँखा दुख्छ भन्छ। कुन सेटिङ बदल्नुपर्छ?"
    },
    "options": [
      {
        "en": "Colour depth",
        "ne": "Colour depth"
      },
      {
        "en": "Resolution",
        "ne": "Resolution"
      },
      {
        "en": "Refresh rate",
        "ne": "Refresh rate"
      },
      {
        "en": "Brightness only",
        "ne": "Brightness मात्र"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "Flicker is the screen being redrawn too few times per second for the eye to blend the frames, which is exactly what refresh rate measures. Raise it to the highest the monitor supports. Resolution changes sharpness, not flicker; colour depth changes the number of shades.",
      "ne": "झिमझिम भनेको स्क्रिन सेकेन्डमा यति थोरै पटक कोरिनु कि आँखाले फ्रेम जोड्न नसक्नु — refresh rate ले नाप्ने ठ्याक्कै त्यही हो। Monitor ले सक्ने सबैभन्दा माथि बढाउनुहोस्। Resolution ले तीक्ष्णता बदल्छ, झिमझिम होइन; colour depth ले रङको सङ्ख्या।"
    }
  },
  {
    "id": "g10.hw.q008",
    "subject": "grade10/hardware",
    "unit": "u2",
    "topic": "display",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What is the essential difference between an LCD and an LED monitor?",
      "ne": "LCD र LED monitor बीचको मुख्य फरक के हो?"
    },
    "options": [
      {
        "en": "LED uses no liquid crystals at all",
        "ne": "LED मा liquid crystal हुँदै हुँदैन"
      },
      {
        "en": "They differ only in the backlight used",
        "ne": "फरक केवल प्रयोग गरिने backlight मा हो"
      },
      {
        "en": "LED fires electrons at a phosphor screen",
        "ne": "LED ले phosphor स्क्रिनमा electron हान्छ"
      },
      {
        "en": "LCD is thinner and uses less power",
        "ne": "LCD पातलो हुन्छ र कम बिजुली खान्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "An LED monitor IS an LCD — the same liquid crystals block or pass light. What changed is the light source behind them: LEDs instead of a CCFL lamp, which makes it thinner, gives better contrast and uses less power. Option 3 describes a CRT.",
      "ne": "LED monitor भनेकै LCD हो — उही liquid crystal ले बत्ती छेक्छ वा पास गर्छ। फरक तिनको पछाडिको बत्तीको स्रोतमा हो: CCFL लैम्पको साटो LED, जसले पातलो बनाउँछ, राम्रो contrast दिन्छ र कम बिजुली खान्छ। तेस्रो विकल्पले CRT वर्णन गर्छ।"
    }
  },
  {
    "id": "g10.hw.q009",
    "subject": "grade10/hardware",
    "unit": "u3",
    "topic": "bios",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Where is the BIOS stored?",
      "ne": "BIOS कहाँ राखिएको हुन्छ?"
    },
    "options": [
      {
        "en": "On the hard disk with the operating system",
        "ne": "अपरेटिङ सिस्टमसँगै hard disk मा"
      },
      {
        "en": "On a chip on the motherboard",
        "ne": "मदरबोर्डको चिपमा"
      },
      {
        "en": "In RAM",
        "ne": "RAM मा"
      },
      {
        "en": "On the processor itself",
        "ne": "प्रोसेसर आफैँमा"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The BIOS is firmware on a motherboard chip. It has to run before any disk is read — it is what finds and loads the operating system — so it cannot be stored on the disk. RAM is wrong because RAM is empty at power-on.",
      "ne": "BIOS मदरबोर्डको चिपमा रहेको firmware हो। कुनै disk पढिनुअघि नै यो चल्नुपर्छ — अपरेटिङ सिस्टम खोजेर लोड गर्ने यही हो — त्यसैले disk मा हुनै सक्दैन। RAM गलत हो किनकि बिजुली लाग्दा RAM खाली हुन्छ।"
    }
  },
  {
    "id": "g10.hw.q010",
    "subject": "grade10/hardware",
    "unit": "u3",
    "topic": "bios",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A computer shows the wrong date at every start-up and BIOS settings return to default. What should you replace?",
      "ne": "कम्प्युटरले हरेक पटक सुरु हुँदा गलत मिति देखाउँछ र BIOS सेटिङ पूर्वनिर्धारितमा फर्किन्छ। के साट्नुपर्छ?"
    },
    "options": [
      {
        "en": "The hard disk",
        "ne": "Hard disk"
      },
      {
        "en": "The CMOS battery",
        "ne": "CMOS ब्याट्री"
      },
      {
        "en": "The RAM",
        "ne": "RAM"
      },
      {
        "en": "The power supply",
        "ne": "पावर सप्लाई"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "CMOS memory holds the BIOS settings and runs the clock, and it needs power even when the machine is unplugged. That power comes from a coin battery on the board. When it dies, everything CMOS remembers is lost each time mains power goes — which is exactly this symptom.",
      "ne": "CMOS मेमोरीले BIOS सेटिङ राख्छ र घडी चलाउँछ, र मेसिन अनप्लग हुँदा पनि यसलाई बिजुली चाहिन्छ। त्यो बोर्डको सिक्का ब्याट्रीबाट आउँछ। त्यो सकिएपछि मुख्य बिजुली जाँदा CMOS ले सम्झेको सबै हराउँछ — लक्षण ठ्याक्कै यही हो।"
    }
  },
  {
    "id": "g10.hw.q011",
    "subject": "grade10/hardware",
    "unit": "u3",
    "topic": "hard-disk",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What is the smallest unit of a hard disk that can be read or written?",
      "ne": "Hard disk को पढ्न वा लेख्न मिल्ने सबैभन्दा सानो एकाइ कुन हो?"
    },
    "options": [
      {
        "en": "Track",
        "ne": "Track"
      },
      {
        "en": "Cylinder",
        "ne": "Cylinder"
      },
      {
        "en": "Sector",
        "ne": "Sector"
      },
      {
        "en": "Platter",
        "ne": "Platter"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "A sector is one slice of a track and is the smallest addressable unit. A track is a whole concentric ring, a cylinder is the same track across all platters, and a platter is the entire disk — all three are larger than a sector.",
      "ne": "Sector भनेको track को एउटा टुक्रा हो र ठेगाना दिन मिल्ने सबैभन्दा सानो एकाइ हो। Track पूरै केन्द्रित रिङ हो, cylinder सबै platter का उही track, र platter पूरै डिस्क — तीनै sector भन्दा ठूला छन्।"
    }
  },
  {
    "id": "g10.hw.q012",
    "subject": "grade10/hardware",
    "unit": "u3",
    "topic": "hard-disk",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Access time on a hard disk is made up of which three parts?",
      "ne": "Hard disk को access time कुन तीन भागबाट बन्छ?"
    },
    "options": [
      {
        "en": "Seek time, rotational delay and transfer time",
        "ne": "Seek time, rotational delay र transfer time"
      },
      {
        "en": "Read time, write time and idle time",
        "ne": "Read time, write time र idle time"
      },
      {
        "en": "Boot time, seek time and load time",
        "ne": "Boot time, seek time र load time"
      },
      {
        "en": "Spin-up time, seek time and cache time",
        "ne": "Spin-up time, seek time र cache time"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "Seek time is the arm moving to the correct track, rotational delay is waiting for the sector to come round under the head, and transfer time is reading or writing the data. The first two are mechanical, which is why they dominate and why a solid-state drive is so much faster.",
      "ne": "Seek time भनेको arm ठीक track मा जाने, rotational delay भनेको sector head मुनि आइपुग्न पर्खने, र transfer time भनेको data पढ्ने वा लेख्ने। पहिलो दुई यान्त्रिक हुन् — त्यसैले तिनकै बढी समय लाग्छ, र solid-state drive यति छिटो हुनुको कारण पनि त्यही हो।"
    }
  },
  {
    "id": "g10.hw.q013",
    "subject": "grade10/hardware",
    "unit": "u3",
    "topic": "formatting",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A disk is quick-formatted before being given away. Can the old data still be recovered?",
      "ne": "कसैलाई दिनुअघि डिस्क quick-format गरियो। पुरानो data अझै फर्काउन सकिन्छ?"
    },
    "options": [
      {
        "en": "No — a format erases everything permanently",
        "ne": "सकिँदैन — format ले सबै स्थायी रूपमा मेटाउँछ"
      },
      {
        "en": "Yes — only the index was cleared, the data remains until overwritten",
        "ne": "सकिन्छ — सूची मात्र सफा भयो, ओभरराइट नभएसम्म data रहन्छ"
      },
      {
        "en": "Only if the disk was never full",
        "ne": "डिस्क कहिल्यै भरिएको थिएन भने मात्र"
      },
      {
        "en": "Only with the original operating system",
        "ne": "मूल अपरेटिङ सिस्टमसँग मात्र"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A quick format rewrites the file system index only, so the drive reports itself as empty while the sectors still hold the data. Recovery software scans sectors directly instead of trusting the index. To remove data properly you need a full format or a wipe utility that overwrites every sector.",
      "ne": "Quick format ले file system को सूची मात्र फेरि लेख्छ, त्यसैले ड्राइभ खाली देखिन्छ तर sector मा data रहन्छ। Recovery सफ्टवेयरले सूचीमा भर नपरी sector सीधै स्क्यान गर्छ। Data ठीकसँग हटाउन full format वा हरेक sector ओभरराइट गर्ने wipe utility चाहिन्छ।"
    }
  },
  {
    "id": "g10.hw.q014",
    "subject": "grade10/hardware",
    "unit": "u3",
    "topic": "partitioning",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Which statement about an extended partition is correct?",
      "ne": "Extended partition बारे कुन कथन सही हो?"
    },
    "options": [
      {
        "en": "It gets its own drive letter",
        "ne": "यसले आफ्नै ड्राइभ अक्षर पाउँछ"
      },
      {
        "en": "It is a container that holds logical drives",
        "ne": "यो logical drive राख्ने भाँडो हो"
      },
      {
        "en": "A computer can boot directly from it",
        "ne": "कम्प्युटर सीधै यसैबाट boot हुन सक्छ"
      },
      {
        "en": "It can only exist on a second physical disk",
        "ne": "यो दोस्रो भौतिक डिस्कमा मात्र हुन सक्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "An extended partition exists to get round the limit on primary partitions: it holds logical drives, and those get the letters. The extended partition itself has none, and you boot from a primary partition, not from it.",
      "ne": "Primary partition को सीमा नाघ्न extended partition बनाइन्छ: यसले logical drive राख्छ, र अक्षर तिनैले पाउँछन्। Extended partition आफैँले पाउँदैन, र boot primary partition बाट हुन्छ, यसबाट होइन।"
    }
  },
  {
    "id": "g10.hw.q015",
    "subject": "grade10/hardware",
    "unit": "u4",
    "topic": "method",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Why must you change only one thing at a time when troubleshooting?",
      "ne": "Troubleshooting गर्दा एकपटकमा एउटा मात्र कुरा किन बदल्नुपर्छ?"
    },
    "options": [
      {
        "en": "It is faster than changing several",
        "ne": "धेरै बदल्नुभन्दा यो छिटो हुन्छ"
      },
      {
        "en": "Otherwise you cannot tell which change fixed it",
        "ne": "नत्र कुन परिवर्तनले मिलायो थाहा हुँदैन"
      },
      {
        "en": "The warranty requires it",
        "ne": "वारेन्टीले यसै भन्छ"
      },
      {
        "en": "Two changes may damage the board",
        "ne": "दुई परिवर्तनले बोर्ड बिगार्न सक्छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "If you change two things and the fault clears, you have no idea which one was responsible. You have not diagnosed anything, cannot document it, and cannot prevent the same fault returning. It is usually slower, not faster — the point is that the result means something.",
      "ne": "दुई कुरा बदल्दा खराबी हट्यो भने कुनले हटायो थाहै हुँदैन। तपाईंले केही निदान गर्नुभएन, अभिलेख राख्न सक्नुहुन्न, र उही खराबी फेरि आउन रोक्न सक्नुहुन्न। यो प्रायः छिटो होइन, ढिलो हुन्छ — कुरा नतिजाको अर्थ हुनु हो।"
    }
  },
  {
    "id": "g10.hw.q016",
    "subject": "grade10/hardware",
    "unit": "u4",
    "topic": "boot",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A machine powers on, fans run, and it beeps repeatedly with a black screen. What does this tell you?",
      "ne": "मेसिनमा बिजुली आउँछ, पंखा घुम्छ, र कालो स्क्रिनसहित बारम्बार बीप गर्छ। यसले के बताउँछ?"
    },
    "options": [
      {
        "en": "Power never reached the board",
        "ne": "बोर्डसम्म बिजुली पुगेन"
      },
      {
        "en": "POST is running and found a fault before video was ready",
        "ne": "POST चलिरहेको छ र video तयार हुनुअघि खराबी भेट्यो"
      },
      {
        "en": "The operating system is corrupted",
        "ne": "अपरेटिङ सिस्टम बिग्रिएको छ"
      },
      {
        "en": "The hard disk cable is loose",
        "ne": "Hard disk को केबल खुकुलो छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Beeping IS the POST reporting, so power reached the board and the BIOS started — the power path is already ruled out. It is beeping rather than displaying because the fault was found before video was initialised, which makes memory the first suspect. The OS and the disk are not read until much later.",
      "ne": "बीप गर्नु <b>नै</b> POST ले सुनाएको हो, त्यसैले बोर्डमा बिजुली पुग्यो र BIOS सुरु भयो — बिजुलीको बाटो पहिल्यै हट्यो। देखाउनुको साटो बीप गर्नुको कारण खराबी video सुरु हुनुअघि भेटियो, जसले मेमोरीलाई पहिलो शंका बनाउँछ। OS र disk धेरै पछि मात्र पढिन्छन्।"
    }
  },
  {
    "id": "g10.hw.q017",
    "subject": "grade10/hardware",
    "unit": "u4",
    "topic": "boot",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "The screen shows \"Operating system not found\". What has already been proved to work?",
      "ne": "स्क्रिनमा \"Operating system not found\" देखियो। के काम गरिरहेको छ भन्ने पहिल्यै प्रमाणित भइसक्यो?"
    },
    "options": [
      {
        "en": "Nothing — the machine has failed completely",
        "ne": "केही पनि होइन — मेसिन पूरै बिग्रियो"
      },
      {
        "en": "Power, memory and video — POST passed",
        "ne": "बिजुली, मेमोरी र video — POST पास भयो"
      },
      {
        "en": "The hard disk is confirmed healthy",
        "ne": "Hard disk स्वस्थ छ भनी पुष्टि भयो"
      },
      {
        "en": "The operating system files are intact",
        "ne": "अपरेटिङ सिस्टमका फाइल सग्लै छन्"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A readable message on screen proves video works, and the BIOS only reaches the point of looking for an operating system after POST has passed — so power, memory and video are all fine. What has NOT been proved is the disk: the message says the OS was not found, which is exactly what is still in question.",
      "ne": "स्क्रिनमा पढ्न मिल्ने सन्देश आउनुले video चलेको प्रमाणित गर्छ, र POST पास भएपछि मात्र BIOS अपरेटिङ सिस्टम खोज्ने चरणमा पुग्छ — त्यसैले बिजुली, मेमोरी र video ठीक छन्। प्रमाणित <b>नभएको</b> कुरा disk हो: सन्देशले OS भेटिएन भन्छ, र प्रश्न अझै त्यही हो।"
    }
  },
  {
    "id": "g10.hw.q018",
    "subject": "grade10/hardware",
    "unit": "u4",
    "topic": "slowdown",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A computer works normally when switched on but becomes slow after 25 minutes, sooner when a heavy program is running. What is the most likely cause?",
      "ne": "कम्प्युटर खोल्दा सामान्य चल्छ तर २५ मिनेटपछि ढिलो हुन्छ, भारी प्रोग्राम चलाए झन् चाँडो। सबैभन्दा सम्भावित कारण के हो?"
    },
    "options": [
      {
        "en": "Too many startup programs",
        "ne": "Startup मा धेरै प्रोग्राम"
      },
      {
        "en": "Overheating causing the processor to reduce speed",
        "ne": "तात्दा प्रोसेसरले गति घटाउनु"
      },
      {
        "en": "A failing hard disk",
        "ne": "बिग्रँदै गएको hard disk"
      },
      {
        "en": "Insufficient colour depth",
        "ne": "Colour depth अपुग"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The timing is the evidence. A fault present from the start would be slow immediately — too many startup programs is slow from boot. Something that only appears after the machine has warmed up, and appears sooner under load because load makes more heat, is thermal. The processor deliberately reduces its speed to protect itself.",
      "ne": "प्रमाण भनेको समय हो। सुरुदेखिको खराबी भए तुरुन्तै ढिलो हुन्थ्यो — startup मा धेरै प्रोग्राम भए boot देखि नै ढिलो हुन्छ। मेसिन तातेपछि मात्र देखिने, र भार पर्दा झन् चाँडो देखिने (किनकि भारले बढी ताप निकाल्छ) कुरा तापसम्बन्धी हो। प्रोसेसरले आफूलाई जोगाउन जानाजान गति घटाउँछ।"
    }
  },
  {
    "id": "g10.hw.q019",
    "subject": "grade10/hardware",
    "unit": "u4",
    "topic": "method",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "You test your theory of the cause and the test disproves it. What is the correct next step?",
      "ne": "तपाईंले कारणको अनुमान परीक्षण गर्नुभयो र परीक्षणले त्यो गलत साबित गर्‍यो। ठीक अर्को कदम के हो?"
    },
    "options": [
      {
        "en": "Start replacing components until it works",
        "ne": "चल्ने नभएसम्म पार्ट साट्न थाल्ने"
      },
      {
        "en": "Form a new theory of probable cause",
        "ne": "सम्भावित कारणको नयाँ अनुमान बनाउने"
      },
      {
        "en": "Reinstall the operating system",
        "ne": "अपरेटिङ सिस्टम फेरि इन्स्टल गर्ने"
      },
      {
        "en": "Document the failure and stop",
        "ne": "असफलताको अभिलेख राखेर रोकिने"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A disproved theory sends you back to step 3, not forward. That loop is the part students leave out of the answer, and it is what separates diagnosis from guessing — you now know one more thing that is NOT the cause, which is real progress.",
      "ne": "गलत साबित भएको अनुमानले तपाईंलाई अगाडि होइन, चरण ३ मा फर्काउँछ। उत्तरमा विद्यार्थीले छुटाउने भाग यही हो, र निदान र अनुमानबीचको भिन्नता पनि यही — अब तपाईंलाई कारण <b>होइन</b> भन्ने एउटा कुरा थप थाहा भयो, जुन साँचो प्रगति हो।"
    }
  },
  {
    "id": "g10.hw.q020",
    "subject": "grade10/hardware",
    "unit": "u5",
    "topic": "power-protection",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "An office has frequent complete power cuts and loses unsaved work. Which device solves this?",
      "ne": "एउटा कार्यालयमा बारम्बार बिजुली पूरै जान्छ र नबचाइएको काम हराउँछ। कुन उपकरणले समाधान गर्छ?"
    },
    "options": [
      {
        "en": "A surge protector",
        "ne": "Surge protector"
      },
      {
        "en": "A voltage stabiliser",
        "ne": "Voltage stabiliser"
      },
      {
        "en": "A UPS",
        "ne": "UPS"
      },
      {
        "en": "An earthing rod",
        "ne": "Earthing rod"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "The power disappears entirely. A surge protector handles voltage that is too high and a stabiliser handles voltage that is too low — neither can supply power that is not there. Only a UPS carries a battery, and its purpose is to give enough time to save work and shut down properly.",
      "ne": "बिजुली पूरै हराउँछ। Surge protector ले धेरै बढी भोल्टेज सम्हाल्छ र stabiliser ले धेरै कम — नभएको बिजुली दुवैले दिन सक्दैनन्। UPS सँग मात्र ब्याट्री हुन्छ, र यसको उद्देश्य काम बचाएर ठीकसँग बन्द गर्न पुग्ने समय दिनु हो।"
    }
  },
  {
    "id": "g10.hw.q021",
    "subject": "grade10/hardware",
    "unit": "u5",
    "topic": "cooling",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A computer shuts itself down when it gets hot. What is the fault?",
      "ne": "तातेपछि कम्प्युटर आफैँ बन्द हुन्छ। खराबी के हो?"
    },
    "options": [
      {
        "en": "The automatic shutdown feature is faulty",
        "ne": "स्वतः बन्द हुने सुविधा बिग्रेको छ"
      },
      {
        "en": "Whatever is stopping the heat from leaving",
        "ne": "ताप बाहिर जान नदिने जुनसुकै कुरा"
      },
      {
        "en": "The processor is producing too much heat and must be replaced",
        "ne": "प्रोसेसरले बढी ताप निकालेको छ र साट्नुपर्छ"
      },
      {
        "en": "The operating system is mismanaging power",
        "ne": "अपरेटिङ सिस्टमले बिजुली गलत व्यवस्थापन गरेको छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "The shutdown is the protection working correctly — it is stopping the processor being damaged. The fault is whatever prevents the heat escaping: dust in the heatsink fins, a stopped or slowed fan, dried thermal paste, or blocked vents. The processor is producing its normal amount of heat.",
      "ne": "बन्द हुनु सुरक्षा ठीकसँग चलेको हो — प्रोसेसर बिग्रिनबाट रोकिरहेको छ। खराबी भनेको ताप बाहिर जान नदिने कुरा हो: heatsink का पत्रमा धुलो, रोकिएको वा ढिलो भएको पंखा, सुकेको thermal paste, वा बन्द प्वाल। प्रोसेसरले सामान्य मात्रामै ताप निकालिरहेको छ।"
    }
  },
  {
    "id": "g10.hw.q022",
    "subject": "grade10/hardware",
    "unit": "u5",
    "topic": "virus",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "Why must antivirus software be kept updated?",
      "ne": "Antivirus सफ्टवेयर किन अपडेट गरिराख्नुपर्छ?"
    },
    "options": [
      {
        "en": "To make the computer run faster",
        "ne": "कम्प्युटर छिटो चलाउन"
      },
      {
        "en": "It cannot recognise viruses released after it was installed",
        "ne": "इन्स्टल भएपछि आएका भाइरस यसले चिन्न सक्दैन"
      },
      {
        "en": "To renew the software licence",
        "ne": "सफ्टवेयरको इजाजतपत्र नवीकरण गर्न"
      },
      {
        "en": "To free up disk space",
        "ne": "डिस्कको ठाउँ खाली गर्न"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "An antivirus recognises threats by comparing against what it knows. New malware appears constantly, so a scanner that is never updated is blind to everything released after installation. This is why \"install antivirus\" alone is a half answer — \"and keep it updated\" is the other half of the mark.",
      "ne": "Antivirus ले आफूलाई थाहा भएकोसँग मिलाएर खतरा चिन्छ। नयाँ malware निरन्तर आइरहन्छ, त्यसैले कहिल्यै अपडेट नगरिएको स्क्यानर इन्स्टलपछि आएका सबैप्रति अन्धो हुन्छ। त्यसैले \"antivirus राख्ने\" मात्र आधा उत्तर हो — \"र अपडेट गरिराख्ने\" ले बाँकी आधा अंक दिन्छ।"
    }
  },
  {
    "id": "g10.hw.q023",
    "subject": "grade10/hardware",
    "unit": "u5",
    "topic": "display-fault",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A flat monitor shows a blurry, slightly stretched picture. What is the most likely cause?",
      "ne": "Flat monitor मा धमिलो र अलि तानिएको तस्बिर देखिन्छ। सबैभन्दा सम्भावित कारण के हो?"
    },
    "options": [
      {
        "en": "The refresh rate is too low",
        "ne": "Refresh rate धेरै कम छ"
      },
      {
        "en": "The resolution is not set to the monitor's native value",
        "ne": "Resolution monitor को native मान मा सेट छैन"
      },
      {
        "en": "The video card is failing",
        "ne": "Video card बिग्रँदै छ"
      },
      {
        "en": "The colour depth is set to 24-bit",
        "ne": "Colour depth २४-bit मा छ"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "A flat panel has one native resolution and is sharp only at that setting; anything else is scaled to fit and goes soft, and a wrong aspect ratio also stretches the picture. Low refresh rate causes flicker, not blur. 24-bit colour depth is normal, not a fault.",
      "ne": "Flat panel को एउटै native resolution हुन्छ र त्यही सेटिङमा मात्र तीक्ष्ण हुन्छ; अरूमा अटाउन तानिन्छ र धमिलो हुन्छ, र गलत aspect ratio ले तस्बिर पनि तान्छ। कम refresh rate ले झिमझिम ल्याउँछ, धमिलोपन होइन। २४-bit colour depth सामान्य हो, खराबी होइन।"
    }
  },
  {
    "id": "g10.hw.q024",
    "subject": "grade10/hardware",
    "unit": "u5",
    "topic": "maintenance",
    "difficulty": "easy",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What should be used to remove dust from inside a computer case?",
      "ne": "कम्प्युटर केसभित्रको धुलो हटाउन के प्रयोग गर्नुपर्छ?"
    },
    "options": [
      {
        "en": "A damp cloth",
        "ne": "भिजेको कपडा"
      },
      {
        "en": "Dry compressed air",
        "ne": "सुक्खा कम्प्रेस्ड एयर"
      },
      {
        "en": "A household vacuum cleaner",
        "ne": "घरायसी भ्याकुम क्लिनर"
      },
      {
        "en": "Soapy water on a brush",
        "ne": "ब्रसमा साबुनपानी"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Dry compressed air removes dust without moisture and without generating static. A damp cloth or soapy water introduces moisture, which shorts and corrodes; a household vacuum builds a large static charge at its nozzle, which can destroy components outright.",
      "ne": "सुक्खा कम्प्रेस्ड एयरले चिस्यानबिना र static नबनाई धुलो हटाउँछ। भिजेको कपडा वा साबुनपानीले चिस्यान ल्याउँछ, जसले शर्ट र खिया गराउँछ; घरायसी भ्याकुमको नोजलमा ठूलो static चार्ज बन्छ, जसले पार्ट एकैचोटि नष्ट गर्न सक्छ।"
    }
  },
  {
    "id": "g10.hw.q025",
    "subject": "grade10/hardware",
    "unit": "u6",
    "topic": "backup-methods",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A differential backup copies everything that has changed since which point?",
      "ne": "Differential backup ले कुन बिन्दुपछि बदलिएको सबै कपी गर्छ?"
    },
    "options": [
      {
        "en": "The last backup of any kind",
        "ne": "जुनसुकै किसिमको अघिल्लो ब्याकअप"
      },
      {
        "en": "The last full backup",
        "ne": "अन्तिम full ब्याकअप"
      },
      {
        "en": "The start of the current month",
        "ne": "चालु महिनाको सुरु"
      },
      {
        "en": "The last successful restore",
        "ne": "अन्तिम सफल पुनर्स्थापना"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Differential = since the last FULL backup, which is why each one grows larger than the last but a restore needs only two sets. Option 1 describes an incremental backup. Swapping these two reverses every answer about restore time, so it is worth learning as a pair.",
      "ne": "Differential = अन्तिम <b>FULL</b> ब्याकअपपछि — त्यसैले हरेक अघिल्लो भन्दा ठूलो हुँदै जान्छ तर फर्काउन दुई सेट मात्र चाहिन्छ। पहिलो विकल्पले incremental वर्णन गर्छ। यी दुई साट्दा फर्काउने समयसम्बन्धी हरेक उत्तर उल्टिन्छ, त्यसैले जोडी बनाएरै सिक्नु राम्रो।"
    }
  },
  {
    "id": "g10.hw.q026",
    "subject": "grade10/hardware",
    "unit": "u6",
    "topic": "backup-methods",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A full backup runs Monday and incrementals run Tuesday to Friday. The disk fails Friday night. How many sets are needed to restore?",
      "ne": "सोमबार full ब्याकअप र मंगलबारदेखि शुक्रबारसम्म incremental चल्छ। शुक्रबार राति डिस्क बिग्रियो। फर्काउन कति सेट चाहिन्छ?"
    },
    "options": [
      {
        "en": "One — Friday's",
        "ne": "एउटा — शुक्रबारको"
      },
      {
        "en": "Two — Monday's and Friday's",
        "ne": "दुई — सोमबार र शुक्रबारको"
      },
      {
        "en": "Five — Monday's plus all four incrementals",
        "ne": "पाँच — सोमबारको र चारै incremental"
      },
      {
        "en": "Four — the incrementals only",
        "ne": "चार — incremental मात्र"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "Each incremental holds only what changed since the previous backup, so the chain must be replayed in order: Monday's full set, then Tuesday, Wednesday, Thursday and Friday. That is five. Option 2 would be right for a DIFFERENTIAL scheme — which is exactly the trade differential buys with its larger daily sets.",
      "ne": "हरेक incremental मा अघिल्लो ब्याकअपपछि बदलिएको मात्र हुन्छ, त्यसैले शृंखला क्रमैसँग लगाउनुपर्छ: सोमबारको full, अनि मंगल, बुध, बिहीबार र शुक्रबार। जम्मा पाँच। दोस्रो विकल्प <b>DIFFERENTIAL</b> योजनाका लागि सही हुन्थ्यो — differential ले ठूला दैनिक सेटको बदलामा किन्ने कुरा ठ्याक्कै त्यही हो।"
    }
  },
  {
    "id": "g10.hw.q027",
    "subject": "grade10/hardware",
    "unit": "u6",
    "topic": "raid",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "What is the minimum number of disks required for RAID 5?",
      "ne": "RAID 5 लाई न्यूनतम कति डिस्क चाहिन्छ?"
    },
    "options": [
      {
        "en": "Two",
        "ne": "दुई"
      },
      {
        "en": "Three",
        "ne": "तीन"
      },
      {
        "en": "Four",
        "ne": "चार"
      },
      {
        "en": "Five",
        "ne": "पाँच"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "RAID 5 stripes data with parity spread across the disks, and the parity has to live somewhere other than the data it protects — so three is the minimum. RAID 0 and RAID 1 both need two.",
      "ne": "RAID 5 ले parity सबै डिस्कमा फैलाएर striping गर्छ, र parity ले जोगाउने data भन्दा अन्तै बस्नुपर्छ — त्यसैले न्यूनतम तीन। RAID 0 र RAID 1 दुवैलाई दुई चाहिन्छ।"
    }
  },
  {
    "id": "g10.hw.q028",
    "subject": "grade10/hardware",
    "unit": "u6",
    "topic": "raid",
    "difficulty": "hard",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A server uses RAID 1. A user deletes an important folder by mistake. Can it be recovered from the array?",
      "ne": "सर्भरमा RAID 1 छ। प्रयोगकर्ताले भुलवश महत्त्वपूर्ण फोल्डर मेट्छ। के array बाट फर्काउन सकिन्छ?"
    },
    "options": [
      {
        "en": "Yes — the mirror disk still holds it",
        "ne": "सकिन्छ — mirror डिस्कमा अझै छ"
      },
      {
        "en": "No — the deletion was written to both disks at once",
        "ne": "सकिँदैन — मेटाइ एकैचोटि दुवै डिस्कमा लेखियो"
      },
      {
        "en": "Yes, if done within 24 hours",
        "ne": "सकिन्छ, २४ घण्टाभित्र गरे"
      },
      {
        "en": "Only by rebuilding the array",
        "ne": "Array पुनर्निर्माण गरेर मात्र"
      }
    ],
    "answer": 1,
    "explanation": {
      "en": "Mirroring copies every write to both disks, and a deletion is a write. Both lose the folder in the same instant. RAID protects against a DISK failing — a mechanical event. It gives no protection against deletion, corruption, a virus or ransomware, because to the array those are ordinary valid writes. Only a separate backup recovers this.",
      "ne": "Mirroring ले हरेक लेखाइ दुवै डिस्कमा सार्छ, र मेटाइ पनि लेखाइ हो। दुवैले एकै क्षणमा फोल्डर गुमाउँछन्। RAID ले <b>डिस्क</b> बिग्रिनु — यान्त्रिक घटना — बाट जोगाउँछ। मेटाइ, बिग्रिनु, भाइरस वा ransomware बाट जोगाउँदैन, किनकि array का लागि ती साधारण वैध लेखाइ हुन्। छुट्टै ब्याकअपले मात्र यो फर्काउँछ।"
    }
  },
  {
    "id": "g10.hw.q029",
    "subject": "grade10/hardware",
    "unit": "u6",
    "topic": "rotation",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "In grandfather–father–son rotation, what does \"son\" refer to?",
      "ne": "Grandfather–father–son rotation मा \"son\" ले केलाई जनाउँछ?"
    },
    "options": [
      {
        "en": "The monthly backup",
        "ne": "मासिक ब्याकअप"
      },
      {
        "en": "The weekly backup",
        "ne": "साप्ताहिक ब्याकअप"
      },
      {
        "en": "The daily backup",
        "ne": "दैनिक ब्याकअप"
      },
      {
        "en": "The off-site copy",
        "ne": "अर्को ठाउँको प्रतिलिपि"
      }
    ],
    "answer": 2,
    "explanation": {
      "en": "Son = daily, father = weekly, grandfather = monthly, oldest generation last. Keeping several generations is what protects against damage that is noticed late — if only one daily set existed and it were overwritten each day, every copy you hold would contain the same corruption.",
      "ne": "Son = दैनिक, father = साप्ताहिक, grandfather = मासिक — सबैभन्दा पुरानो पुस्ता अन्तिम। धेरै पुस्ता राख्नुले ढिलो थाहा हुने क्षतिबाट जोगाउँछ — दैनिक एउटै सेट भई हरेक दिन ओभरराइट भइरहे तपाईंसँग भएका सबै प्रतिलिपिमा उही बिग्रिने कुरा हुन्थ्यो।"
    }
  },
  {
    "id": "g10.hw.q030",
    "subject": "grade10/hardware",
    "unit": "u6",
    "topic": "recovery",
    "difficulty": "medium",
    "type": "single-choice",
    "examRelevant": true,
    "prompt": {
      "en": "A bad driver update has made Windows unstable, but no personal files are missing. Which recovery technique fits best?",
      "ne": "खराब driver अपडेटले Windows अस्थिर बनायो, तर कुनै व्यक्तिगत फाइल हराएको छैन। कुन recovery उपाय सबैभन्दा मिल्छ?"
    },
    "options": [
      {
        "en": "System restore point",
        "ne": "System restore point"
      },
      {
        "en": "Data recovery software",
        "ne": "Data recovery सफ्टवेयर"
      },
      {
        "en": "Professional clean-room recovery",
        "ne": "व्यावसायिक clean-room रिकभरी"
      },
      {
        "en": "Rebuilding the RAID array",
        "ne": "RAID array पुनर्निर्माण"
      }
    ],
    "answer": 0,
    "explanation": {
      "en": "A system restore point rolls the operating system's settings and drivers back to an earlier state, which is exactly the problem here. Data recovery software is for deleted files — none are missing. Clean-room recovery is for physical drive damage, and a RAID rebuild is for a failed disk; neither applies.",
      "ne": "System restore point ले अपरेटिङ सिस्टमका सेटिङ र driver अघिल्लो अवस्थामा फर्काउँछ — यहाँको समस्या ठ्याक्कै त्यही हो। Data recovery सफ्टवेयर मेटिएका फाइलका लागि हो — यहाँ केही हराएको छैन। Clean-room रिकभरी भौतिक क्षतिका लागि, र RAID rebuild बिग्रेको डिस्कका लागि; दुवै लागू हुँदैनन्।"
    }
  }
]);

/* Revision focus per subject, in two kinds that are never merged:
   exam    — derived from each unit's external marks (a fact about the paper)
   teacher — authored in _source/content/revision-focus.js (a judgement)
   The quiz labels whichever it shows. See docs/ASSESSMENT-ARCHITECTURE.md. */
QuizService.registerFocus("grade9/c-programming", {
  "exam": [
    {
      "n": "3",
      "marks": 13,
      "title": {
        "en": "Control Flow Statements",
        "ne": "नियन्त्रण प्रवाह कथन"
      },
      "page": "unit3.html"
    },
    {
      "n": "4",
      "marks": 10,
      "title": {
        "en": "Functions",
        "ne": "फङ्सन"
      },
      "page": "unit4.html"
    },
    {
      "n": "5",
      "marks": 8,
      "title": {
        "en": "Arrays & Strings",
        "ne": "एरे र स्ट्रिङ"
      },
      "page": "unit5.html"
    }
  ],
  "teacher": [],
  "source": null
});

QuizService.registerFocus("grade9/computer-fundamentals", {
  "exam": [
    {
      "n": "3",
      "marks": 9,
      "title": {
        "en": "Computer Software",
        "ne": "कम्प्युटर सफ्टवेयर"
      },
      "page": "unit3.html"
    },
    {
      "n": "4",
      "marks": 8,
      "title": {
        "en": "Memory / Storage Unit",
        "ne": "मेमोरी / भण्डारण एकाइ"
      },
      "page": "unit4.html"
    },
    {
      "n": "5",
      "marks": 8,
      "title": {
        "en": "Internet and its Application",
        "ne": "इन्टरनेट र यसको प्रयोग"
      },
      "page": "unit5.html"
    }
  ],
  "teacher": [],
  "source": null
});

QuizService.registerFocus("grade10/oop-cpp", {
  "exam": [
    {
      "n": "1",
      "marks": 15,
      "title": {
        "en": "Basic Introduction to Data Structure",
        "ne": "डाटा स्ट्रक्चरको आधारभूत परिचय"
      },
      "page": "unit1.html"
    },
    {
      "n": "2",
      "marks": 14,
      "title": {
        "en": "Concept of OOP using C++",
        "ne": "OOP को अवधारणा (C++)"
      },
      "page": "unit2.html"
    },
    {
      "n": "5",
      "marks": 7,
      "title": {
        "en": "Inheritance",
        "ne": "इनहेरिटेन्स"
      },
      "page": "unit5.html"
    }
  ],
  "teacher": [],
  "source": null
});

QuizService.registerFocus("grade10/digital-design", {
  "exam": [
    {
      "n": "1",
      "marks": 7,
      "title": {
        "en": "Number System and Binary Arithmetic",
        "ne": "संख्या प्रणाली र बाइनरी गणित"
      },
      "page": "unit1.html"
    },
    {
      "n": "2",
      "marks": 15,
      "title": {
        "en": "Concept of Logic Gates",
        "ne": "लजिक गेटको अवधारणा"
      },
      "page": "unit2.html"
    },
    {
      "n": "5",
      "marks": 15,
      "title": {
        "en": "Introduction to Microprocessor",
        "ne": "माइक्रोप्रोसेसर र यसका भाग"
      },
      "page": "unit5.html"
    }
  ],
  "teacher": [],
  "source": null
});

QuizService.registerFocus("grade10/dbms", {
  "exam": [
    {
      "n": "2",
      "marks": 10,
      "title": {
        "en": "Entity Relationship Model (ER-Model)",
        "ne": "ई–आर मोडेल"
      },
      "page": "unit2.html"
    },
    {
      "n": "3",
      "marks": 6,
      "title": {
        "en": "Relational Model",
        "ne": "रिलेसनल मोडेल"
      },
      "page": "unit3.html"
    },
    {
      "n": "4",
      "marks": 14,
      "title": {
        "en": "SQL — Structured Query Language",
        "ne": "एसक्युएल — संरचित क्वेरी भाषा"
      },
      "page": "unit4.html"
    }
  ],
  "teacher": [],
  "source": null
});

QuizService.registerFocus("grade10/hardware", {
  "exam": [
    {
      "n": "3",
      "marks": 9,
      "title": {
        "en": "Overview on System's Core",
        "ne": "प्रणालीको मुख्य भाग"
      },
      "page": "unit3.html"
    },
    {
      "n": "4",
      "marks": 10,
      "title": {
        "en": "Troubleshooting Techniques",
        "ne": "समस्या समाधानका तरिका"
      },
      "page": "unit4.html"
    },
    {
      "n": "5",
      "marks": 11,
      "title": {
        "en": "Repair and Maintenance",
        "ne": "मर्मत र सम्भार"
      },
      "page": "unit5.html"
    }
  ],
  "teacher": [],
  "source": null
});
