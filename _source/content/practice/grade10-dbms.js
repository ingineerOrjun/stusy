/* ============================================================
   GRADE 10 · DBMS — faded guided practice

   THE SKILL
   Deciding which normal form a table is already in, and naming the
   dependency that stops it going further. That decision is the whole of
   the marks in a normalisation question: a student who can recite the
   definitions of 1NF, 2NF and 3NF and cannot look at a table and say
   which one it violates will not score.

   WHY THE ANSWERS ARE SHORT TOKENS
   "1NF", "2NF", "partial", "transitive" — each step is a decision with a
   small set of right answers, so it can be marked, and the feedback can
   name the specific reason at the step where the student chose wrongly.
   Anything needing a sentence belongs in an examq retrieval block.

   SYLLABUS
   CDC Grade 10 DBMS unit 5, Relational Database Design — normalisation
   to 3NF, partial and transitive dependency. Nothing beyond 3NF appears
   here; BCNF is not in the syllabus and is not introduced.
   ============================================================ */

module.exports = [

  {
    id: 'db.normalform',
    subject: 'grade10/dbms',
    unit: 'db-u5',
    skill: {
      en: 'Name the normal form, then name the dependency that blocks the next one',
      ne: 'नर्मल फर्म पहिचान गर्नुहोस्, अनि अर्को फर्ममा जान नदिने dependency नाम लिनुहोस्'
    },
    rule: {
      en: '1NF: no repeating groups — every cell holds one value. ' +
          '2NF: 1NF and no PARTIAL dependency — no non-key column depends on only part of a composite key. ' +
          '3NF: 2NF and no TRANSITIVE dependency — no non-key column depends on another non-key column.',
      ne: '1NF: दोहोरिने समूह छैन — हरेक कक्षमा एउटै मान। ' +
          '2NF: 1NF र PARTIAL dependency छैन — कुनै non-key स्तम्भ composite key को एक भागमा मात्र निर्भर छैन। ' +
          '3NF: 2NF र TRANSITIVE dependency छैन — कुनै non-key स्तम्भ अर्को non-key स्तम्भमा निर्भर छैन।'
    },
    problems: [
      {
        fade: 'worked',
        ask: {
          en: 'Student(roll, name, subject1, subject2, subject3). Which normal form is it in, ' +
              'and what must change?',
          ne: 'Student(roll, name, subject1, subject2, subject3)। यो कुन नर्मल फर्ममा छ, र के बदल्नुपर्छ?'
        },
        steps: [
          { prompt: { en: 'Does any column hold a repeating group? Answer yes or no',
                      ne: 'कुनै स्तम्भमा दोहोरिने समूह छ? yes वा no' },
            answer: 'yes', accept: ['y'],
            why: { en: 'subject1, subject2 and subject3 are the same fact repeated across three ' +
                       'columns. That is a repeating group.',
                   ne: 'subject1, subject2, subject3 एउटै तथ्य तीन स्तम्भमा दोहोरिएको हो। यो दोहोरिने समूह हो।' } },
          { prompt: { en: 'So which normal form is it in? Answer 0NF, 1NF, 2NF or 3NF',
                      ne: 'त्यसैले यो कुन फर्ममा छ? 0NF, 1NF, 2NF वा 3NF' },
            answer: '0NF', accept: ['0nf', 'none', 'unnormalised', 'unnormalized'],
            why: { en: 'A table with a repeating group has not reached 1NF yet.',
                   ne: 'दोहोरिने समूह भएको तालिका अझै 1NF मा पुगेको छैन।' } },
          { prompt: { en: 'Which form does splitting the repeated columns into rows reach?',
                      ne: 'दोहोरिएका स्तम्भलाई पङ्क्तिमा छुट्याउँदा कुन फर्म आइपुग्छ?' },
            answer: '1NF', accept: ['1nf'],
            why: { en: 'Student(roll, name, subject) with one subject per row holds one value in ' +
                       'every cell, which is exactly what 1NF asks.',
                   ne: 'Student(roll, name, subject) — प्रति पङ्क्ति एउटा subject राख्दा हरेक कक्षमा एउटै मान हुन्छ, ' +
                       'जुन 1NF ले माग्ने कुरा हो।' } }
        ],
        result: '1NF',
        resultPrompt: { en: 'After the fix, which form is the table in?',
                        ne: 'सच्याएपछि तालिका कुन फर्ममा हुन्छ?' },
        check: { en: 'The repeating group is what 1NF forbids. Nothing about keys has been ' +
                     'examined yet — that is the next question, not this one.',
                 ne: 'दोहोरिने समूह नै 1NF ले निषेध गर्ने कुरा हो। key बारे अझै केही हेरिएको छैन — त्यो अर्को प्रश्न हो।' }
      },

      {
        fade: 'partial',
        ask: {
          en: 'Marks(roll, subject, student_name, marks) — the key is (roll, subject). ' +
              'It is already in 1NF. Which form is it in, and why can it go no further?',
          ne: 'Marks(roll, subject, student_name, marks) — key (roll, subject) हो। ' +
              'यो 1NF मा छ। यो कुन फर्ममा छ, र किन अगाडि बढ्न सक्दैन?'
        },
        steps: [
          { prompt: { en: 'student_name depends on which part of the key? Answer roll, subject or both',
                      ne: 'student_name key को कुन भागमा निर्भर छ? roll, subject वा both' },
            answer: 'roll', accept: ['roll'],
            why: { en: 'A student\'s name is fixed by their roll number alone. The subject has ' +
                       'nothing to do with it.',
                   ne: 'विद्यार्थीको नाम roll ले मात्र निश्चित हुन्छ। subject को यसमा कुनै भूमिका छैन।' } },
          { prompt: { en: 'A non-key column depending on PART of a composite key is called what? ' +
                          'Answer partial or transitive',
                      ne: 'composite key को एक भागमा मात्र निर्भर non-key स्तम्भलाई के भनिन्छ? partial वा transitive' },
            answer: 'partial', accept: ['partial dependency'],
            why: { en: 'Part of the key, so partial. Transitive is the other one — a non-key ' +
                       'column depending on another NON-KEY column.',
                   ne: 'key को एक भाग, त्यसैले partial। transitive अर्को हो — non-key स्तम्भ अर्को NON-KEY स्तम्भमा निर्भर।' } },
          { prompt: { en: 'A partial dependency breaks which form? Answer 2NF or 3NF',
                      ne: 'partial dependency ले कुन फर्म भङ्ग गर्छ? 2NF वा 3NF' },
            answer: '2NF', accept: ['2nf'],
            why: { en: '2NF is exactly "1NF and no partial dependency". So the table stops at 1NF.',
                   ne: '2NF भनेकै "1NF र partial dependency छैन" हो। त्यसैले तालिका 1NF मै रोकिन्छ।' } }
        ],
        result: '1NF',
        resultPrompt: { en: 'Which form is this table in?', ne: 'यो तालिका कुन फर्ममा छ?' },
        check: { en: 'It reaches 1NF and stops there, because student_name depends on roll alone. ' +
                     'Splitting Student(roll, student_name) away takes it to 2NF.',
                 ne: 'यो 1NF सम्म पुगेर रोकिन्छ, किनभने student_name roll मा मात्र निर्भर छ। ' +
                     'Student(roll, student_name) छुट्याएपछि 2NF मा पुग्छ।' }
      },

      {
        fade: 'guided',
        ask: {
          en: 'Book(book_id, title, publisher_id, publisher_city) — the key is book_id alone. ' +
              'Which form is it in?',
          ne: 'Book(book_id, title, publisher_id, publisher_city) — key book_id मात्र हो। यो कुन फर्ममा छ?'
        },
        steps: [
          { prompt: { en: 'Repeating group? yes or no', ne: 'दोहोरिने समूह? yes वा no' },
            answer: 'no', accept: ['n'],
            why: { en: 'Every cell holds one value, so 1NF is satisfied.',
                   ne: 'हरेक कक्षमा एउटै मान छ, त्यसैले 1NF पुगेको छ।' } },
          { prompt: { en: 'Can there be a partial dependency here? yes or no',
                      ne: 'यहाँ partial dependency हुन सक्छ? yes वा no' },
            answer: 'no', accept: ['n'],
            why: { en: 'The key is a single column. A partial dependency needs a COMPOSITE key ' +
                       'to be partial to, so 2NF is automatic here.',
                   ne: 'key एउटै स्तम्भ हो। partial dependency हुन COMPOSITE key चाहिन्छ, त्यसैले यहाँ 2NF आफैं पुग्छ।' } },
          { prompt: { en: 'publisher_city depends on which column?', ne: 'publisher_city कुन स्तम्भमा निर्भर छ?' },
            answer: 'publisher_id', accept: ['publisher id', 'publisherid'],
            why: { en: 'The city belongs to the publisher, not to the book. And publisher_id is ' +
                       'not the key.',
                   ne: 'सहर प्रकाशकको हो, पुस्तकको होइन। र publisher_id key होइन।' } },
          { prompt: { en: 'A non-key column depending on another non-key column is called what?',
                      ne: 'non-key स्तम्भ अर्को non-key स्तम्भमा निर्भर हुनुलाई के भनिन्छ?' },
            answer: 'transitive', accept: ['transitive dependency'],
            why: { en: 'book_id → publisher_id → publisher_city. The dependency travels through a ' +
                       'middle column, so it is transitive, and 3NF forbids it.',
                   ne: 'book_id → publisher_id → publisher_city। निर्भरता बीचको स्तम्भबाट जान्छ, त्यसैले transitive, ' +
                       'र 3NF ले यसलाई निषेध गर्छ।' } }
        ],
        result: '2NF',
        resultPrompt: { en: 'So which form is Book in?', ne: 'त्यसैले Book कुन फर्ममा छ?' },
        check: { en: '1NF yes, 2NF yes (single-column key), 3NF no — the transitive dependency ' +
                     'stops it. Split Publisher(publisher_id, publisher_city) away to reach 3NF.',
                 ne: '1NF छ, 2NF छ (एउटै स्तम्भको key), 3NF छैन — transitive dependency ले रोक्छ। ' +
                     'Publisher(publisher_id, publisher_city) छुट्याएपछि 3NF मा पुगिन्छ।' }
      },

      {
        fade: 'independent',
        ask: {
          en: 'Order(order_id, product_id, quantity, product_name) — the key is ' +
              '(order_id, product_id). Which normal form is it in? Answer 1NF, 2NF or 3NF.',
          ne: 'Order(order_id, product_id, quantity, product_name) — key (order_id, product_id) हो। ' +
              'यो कुन नर्मल फर्ममा छ? 1NF, 2NF वा 3NF।'
        },
        steps: [],
        result: '1NF',
        resultPrompt: { en: 'Normal form', ne: 'नर्मल फर्म' },
        check: { en: 'product_name depends on product_id alone — part of the composite key. That ' +
                     'is a partial dependency, so 2NF fails and the table stops at 1NF. If you ' +
                     'answered 2NF, you probably checked for a transitive dependency and missed ' +
                     'the partial one: always test the key BEFORE the non-key columns.',
                 ne: 'product_name product_id मा मात्र निर्भर छ — composite key को एक भाग। ' +
                     'यो partial dependency हो, त्यसैले 2NF पुग्दैन र तालिका 1NF मै रोकिन्छ। ' +
                     '2NF भन्नुभयो भने सम्भवतः transitive खोज्दै partial छुटाउनुभयो: ' +
                     'सधैं non-key भन्दा पहिले key जाँच्नुहोस्।' }
      }
    ]
  }

];
