/* ============================================================
   GRADE 10 · DATABASE MANAGEMENT SYSTEM — question bank

   Every question is tagged with the unit and topic it comes from, so
   the bank can be filtered later without re-reading it, and so a gap in
   coverage is visible rather than assumed.

   THE RULE FOLLOWED WHILE WRITING
   No two questions test the same fact with different wording. Where a
   fact matters enough for two questions, the second tests it at a
   different cognitive level — recall, then application.

   Difficulty is about the THINKING required, not about obscurity:
     easy    one definition, recalled
     medium  two ideas held together, or a rule applied once
     hard    a rule applied to a scenario, or a result worked out

   Bilingual throughout. Technical terms stay in English inside Nepali
   prose, per docs/LANGUAGE-SYSTEM.md §5B — a translated "foreign key"
   would not help a student who meets it in English in the exam.
   ============================================================ */

module.exports = [

  /* ---------------------------------------------------------------
     UNIT 1 — Introduction to Database System
     --------------------------------------------------------------- */
  {
    id: 'g10.db.q001', subject: 'grade10/dbms', unit: 'u1',
    topic: 'data-information', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which of these is DATA rather than information?',
      ne: 'यीमध्ये कुन INFORMATION होइन, DATA हो?'
    },
    options: [
      { en: '78', ne: '७८' },
      { en: 'Ram scored 78 in class 10', ne: 'रामले कक्षा १० मा ७८ अंक ल्याए' },
      { en: 'The class average is 72', ne: 'कक्षाको औसत ७२ छ' },
      { en: 'Sita passed the examination', ne: 'सीता परीक्षामा उत्तीर्ण भइन्' }
    ],
    answer: 0,
    explanation: {
      en: 'Data is a raw fact with no meaning attached. 78 on its own tells you nothing. The other three have been processed and given meaning, which makes them information.',
      ne: 'Data भनेको अर्थ नजोडिएको काँचो तथ्य हो। ७८ एक्लैले केही बताउँदैन। बाँकी तीनलाई प्रशोधन गरेर अर्थ दिइएको छ, त्यसैले ती information हुन्।'
    }
  },
  {
    id: 'g10.db.q002', subject: 'grade10/dbms', unit: 'u1',
    topic: 'dbms-definition', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: { en: 'What is MySQL?', ne: 'MySQL के हो?' },
    options: [
      { en: 'A DBMS — software that manages a database', ne: 'एउटा DBMS — डाटाबेस व्यवस्थापन गर्ने सफ्टवेयर' },
      { en: 'A database', ne: 'एउटा डाटाबेस' },
      { en: 'A table', ne: 'एउटा तालिका' },
      { en: 'A programming language', ne: 'एउटा प्रोग्रामिङ भाषा' }
    ],
    answer: 0,
    explanation: {
      en: 'MySQL is a DBMS: the software. The database is the collection of data it manages. Calling the DBMS "the database" is the most common slip in this unit.',
      ne: 'MySQL एउटा DBMS हो — सफ्टवेयर। डाटाबेस भनेको त्यसले व्यवस्थापन गर्ने data को सङ्ग्रह हो। DBMS लाई "डाटाबेस" भन्नु यस युनिटको सबैभन्दा सामान्य गल्ती हो।'
    }
  },
  {
    id: 'g10.db.q003', subject: 'grade10/dbms', unit: 'u1',
    topic: 'file-system-limits', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A student\'s address is stored in three different files. The office updates one of them. What problem is this?',
      ne: 'एउटै विद्यार्थीको ठेगाना तीन फरक फाइलमा छ। कार्यालयले एउटा मात्र अद्यावधिक गर्‍यो। यो कुन समस्या हो?'
    },
    options: [
      { en: 'Data inconsistency', ne: 'Data inconsistency' },
      { en: 'Data isolation', ne: 'Data isolation' },
      { en: 'Concurrency', ne: 'Concurrency' },
      { en: 'Data independence', ne: 'Data independence' }
    ],
    answer: 0,
    explanation: {
      en: 'Storing the same fact three times is redundancy; the copies disagreeing after one is updated is inconsistency. The question asks about the result of the update, so the answer is inconsistency.',
      ne: 'उही तथ्य तीन पटक राख्नु redundancy हो; एउटा बदलेपछि प्रतिलिपिहरू बाझिनु inconsistency हो। प्रश्नले अद्यावधिकपछिको नतिजा सोधेकाले उत्तर inconsistency हो।'
    }
  },
  {
    id: 'g10.db.q004', subject: 'grade10/dbms', unit: 'u1',
    topic: 'architecture', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which level of the three-level architecture describes what a particular user is allowed to see?',
      ne: 'तीन तहको संरचनामा कुन तहले कुनै प्रयोगकर्ताले देख्न पाउने कुरा बताउँछ?'
    },
    options: [
      { en: 'External level', ne: 'External level' },
      { en: 'Conceptual level', ne: 'Conceptual level' },
      { en: 'Internal level', ne: 'Internal level' },
      { en: 'Physical level', ne: 'Physical level' }
    ],
    answer: 0,
    explanation: {
      en: 'The external (or view) level is the top of the diagram, nearest the user. The conceptual level says what data exists overall; the internal level says how it is stored on disk.',
      ne: 'External (view) तह चित्रको सबैभन्दा माथि — प्रयोगकर्तानजिक। Conceptual तहले समग्रमा कुन data छ भन्छ; internal तहले डिस्कमा कसरी राखिएको छ भन्छ।'
    }
  },
  {
    id: 'g10.db.q005', subject: 'grade10/dbms', unit: 'u1',
    topic: 'schema-instance', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A new student is admitted and a row is inserted. What has changed?',
      ne: 'नयाँ विद्यार्थी भर्ना भए र एउटा पङ्क्ति थपियो। के बदलियो?'
    },
    options: [
      { en: 'The instance only', ne: 'Instance मात्र' },
      { en: 'The schema only', ne: 'Schema मात्र' },
      { en: 'Both the schema and the instance', ne: 'Schema र instance दुवै' },
      { en: 'Neither', ne: 'कुनै पनि होइन' }
    ],
    answer: 0,
    explanation: {
      en: 'The instance is the data in the database right now, so inserting a row changes it. The schema is the structure — the table name, columns and keys — and adding a student does not change any of those.',
      ne: 'Instance भनेको अहिलेको data हो, त्यसैले पङ्क्ति थप्दा बदलिन्छ। Schema भनेको संरचना — तालिकाको नाम, स्तम्भ र कुञ्जी — र विद्यार्थी थप्दा ती बदलिँदैनन्।'
    }
  },
  {
    id: 'g10.db.q006', subject: 'grade10/dbms', unit: 'u1',
    topic: 'database-users', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Who grants and revokes permissions and takes backups?',
      ne: 'अधिकार दिने–खोस्ने र backup लिने काम कसले गर्छ?'
    },
    options: [
      { en: 'The Database Administrator (DBA)', ne: 'Database Administrator (DBA)' },
      { en: 'The application programmer', ne: 'Application programmer' },
      { en: 'The end user', ne: 'End user' },
      { en: 'The database designer', ne: 'Database designer' }
    ],
    answer: 0,
    explanation: {
      en: 'The DBA has complete control of the database: creating it, controlling who may use it, taking backups and tuning performance.',
      ne: 'DBA सँग डाटाबेसको पूर्ण नियन्त्रण हुन्छ: बनाउने, कसले प्रयोग गर्न पाउने नियन्त्रण गर्ने, backup लिने र कार्यसम्पादन सुधार्ने।'
    }
  },
  {
    id: 'g10.db.q007', subject: 'grade10/dbms', unit: 'u1',
    topic: 'db-models', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'In which database model may a record have SEVERAL parent records?',
      ne: 'कुन डाटाबेस मोडेलमा एउटा रेकर्डका धेरै parent रेकर्ड हुन सक्छन्?'
    },
    options: [
      { en: 'Network model', ne: 'Network model' },
      { en: 'Hierarchical model', ne: 'Hierarchical model' },
      { en: 'Relational model', ne: 'Relational model' },
      { en: 'Object-oriented model', ne: 'Object-oriented model' }
    ],
    answer: 0,
    explanation: {
      en: 'The hierarchical model is a tree, so a record has exactly one parent. The network model is a graph and allows several, which is the single examinable difference between the two.',
      ne: 'Hierarchical model रूख हो, त्यसैले रेकर्डको एउटै parent हुन्छ। Network model ग्राफ हो र धेरै हुन दिन्छ — दुईबीचको परीक्षामा सोधिने फरक यही एउटा हो।'
    }
  },
  {
    id: 'g10.db.q008', subject: 'grade10/dbms', unit: 'u1',
    topic: 'db-disadvantages', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which of these is a DISADVANTAGE of a database system?',
      ne: 'यीमध्ये कुन डाटाबेस प्रणालीको बेफाइदा हो?'
    },
    options: [
      { en: 'A failure affects everything at once, because the data is centralised', ne: 'Data एकै ठाउँमा हुने भएकाले एउटै बिग्रँदा सबै प्रभावित हुन्छ' },
      { en: 'Data redundancy is controlled', ne: 'Data redundancy नियन्त्रण हुन्छ' },
      { en: 'Data can be shared between many users', ne: 'धेरै प्रयोगकर्ताबीच data साझा गर्न सकिन्छ' },
      { en: 'Security and access control are possible', ne: 'सुरक्षा र पहुँच नियन्त्रण सम्भव हुन्छ' }
    ],
    answer: 0,
    explanation: {
      en: 'Centralisation is what makes a database powerful and also what makes it a single point of failure. The other three options are advantages. A question asking for both wants at least one of each.',
      ne: 'एकै ठाउँमा राख्नुले डाटाबेसलाई बलियो बनाउँछ र सँगै एउटै जोखिम बिन्दु पनि। बाँकी तीन फाइदा हुन्।'
    }
  },

  /* ---------------------------------------------------------------
     UNIT 2 — ER Model
     --------------------------------------------------------------- */
  {
    id: 'g10.db.q009', subject: 'grade10/dbms', unit: 'u2',
    topic: 'er-symbols', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'In an ER diagram, what is drawn as a DIAMOND?',
      ne: 'ER चित्रमा चतुर्भुजले के जनाउँछ?'
    },
    options: [
      { en: 'A relationship', ne: 'सम्बन्ध (relationship)' },
      { en: 'An entity', ne: 'इन्टिटी' },
      { en: 'An attribute', ne: 'एट्रिब्युट' },
      { en: 'A primary key', ne: 'Primary key' }
    ],
    answer: 0,
    explanation: {
      en: 'A diamond holds the relationship, written as a verb — ENROLS, TEACHES. Entities are rectangles and attributes are ellipses.',
      ne: 'चतुर्भुजभित्र सम्बन्ध हुन्छ, क्रियापदमा लेखिएको — ENROLS, TEACHES। इन्टिटी आयत हुन् र एट्रिब्युट दीर्घवृत्त।'
    }
  },
  {
    id: 'g10.db.q010', subject: 'grade10/dbms', unit: 'u2',
    topic: 'er-symbols', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A student\'s age is calculated from their date of birth and is not stored. How is it drawn?',
      ne: 'विद्यार्थीको उमेर जन्ममितिबाट निकालिन्छ र भण्डारण गरिँदैन। यसलाई कसरी कोरिन्छ?'
    },
    options: [
      { en: 'A dashed ellipse', ne: 'धर्के दीर्घवृत्त' },
      { en: 'A double ellipse', ne: 'दोहोरो दीर्घवृत्त' },
      { en: 'An underlined ellipse', ne: 'मुनि रेखा भएको दीर्घवृत्त' },
      { en: 'A double rectangle', ne: 'दोहोरो आयत' }
    ],
    answer: 0,
    explanation: {
      en: 'A derived attribute is drawn with a dashed ellipse. A double ellipse means multivalued, an underline marks the key, and a double rectangle is a weak entity.',
      ne: 'व्युत्पन्न (derived) एट्रिब्युट धर्के दीर्घवृत्तले कोरिन्छ। दोहोरो दीर्घवृत्त = बहुमान, मुनि रेखा = कुञ्जी, दोहोरो आयत = कमजोर इन्टिटी।'
    }
  },
  {
    id: 'g10.db.q011', subject: 'grade10/dbms', unit: 'u2',
    topic: 'weak-entity', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: { en: 'What makes an entity WEAK?', ne: 'कुनै इन्टिटीलाई "कमजोर" के कुराले बनाउँछ?' },
    options: [
      { en: 'It has no key of its own and depends on an owner entity', ne: 'यसको आफ्नै कुञ्जी हुँदैन र मालिक इन्टिटीमा निर्भर हुन्छ' },
      { en: 'It holds very little data', ne: 'यसमा थोरै data हुन्छ' },
      { en: 'It is less important than the others', ne: 'यो अरूभन्दा कम महत्त्वपूर्ण हुन्छ' },
      { en: 'It has no relationships', ne: 'यसको कुनै सम्बन्ध हुँदैन' }
    ],
    answer: 0,
    explanation: {
      en: '"Weak" is about identification, not importance. A weak entity cannot be identified on its own and must borrow its owner\'s key. It is drawn with a double rectangle.',
      ne: '"कमजोर" भनेको चिनारीको कुरा हो, महत्त्वको होइन। कमजोर इन्टिटी आफैंले चिनिँदैन र मालिकको कुञ्जी लिनुपर्छ। दोहोरो आयतले कोरिन्छ।'
    }
  },
  {
    id: 'g10.db.q012', subject: 'grade10/dbms', unit: 'u2',
    topic: 'cardinality', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A class contains many students, and each student belongs to exactly one class. What is the mapping cardinality?',
      ne: 'एउटा कक्षामा धेरै विद्यार्थी हुन्छन्, र हरेक विद्यार्थी ठ्याक्कै एउटै कक्षाको हुन्छ। Mapping cardinality कति हो?'
    },
    options: [
      { en: 'One-to-many (1:M)', ne: 'एक–धेरै (1:M)' },
      { en: 'Many-to-many (M:N)', ne: 'धेरै–धेरै (M:N)' },
      { en: 'One-to-one (1:1)', ne: 'एक–एक (1:1)' },
      { en: 'Many-to-one only', ne: 'धेरै–एक मात्र' }
    ],
    answer: 0,
    explanation: {
      en: 'Test both directions. Class → students is "many", but student → class is "one". Many one way and one the other way is 1:M. It would only be M:N if a student could also be in several classes.',
      ne: 'दुवै दिशा जाँच्नुहोस्। कक्षा → विद्यार्थी "धेरै" हो, तर विद्यार्थी → कक्षा "एक"। एकातिर धेरै र अर्कोतिर एक भए 1:M। विद्यार्थी धेरै कक्षामा हुन सक्ने भए मात्र M:N हुन्थ्यो।'
    }
  },
  {
    id: 'g10.db.q013', subject: 'grade10/dbms', unit: 'u2',
    topic: 'mn-junction-table', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A student takes many courses and a course is taken by many students. How many TABLES does this need?',
      ne: 'एउटा विद्यार्थीले धेरै विषय लिन्छन् र एउटा विषय धेरै विद्यार्थीले लिन्छन्। यसलाई कति तालिका चाहिन्छ?'
    },
    options: [
      { en: 'Three — the two entities plus a junction table', ne: 'तीन — दुई इन्टिटी र एउटा junction तालिका' },
      { en: 'Two', ne: 'दुई' },
      { en: 'One', ne: 'एक' },
      { en: 'Four', ne: 'चार' }
    ],
    answer: 0,
    explanation: {
      en: 'A many-to-many relationship cannot be recorded by a foreign key, because a column holds one value and each side has many partners. It becomes a third table holding one row per link.',
      ne: 'धेरै–धेरै सम्बन्धलाई foreign key ले राख्न सक्दैन, किनभने स्तम्भले एउटै मान राख्छ र दुवैतर्फ धेरै जोडी छन्। यो तेस्रो तालिका बन्छ, हरेक जोडका लागि एक पङ्क्ति।'
    }
  },
  {
    id: 'g10.db.q014', subject: 'grade10/dbms', unit: 'u2',
    topic: 'keys', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which statement about a PRIMARY key is true?',
      ne: 'Primary key बारे कुन भनाइ सही हो?'
    },
    options: [
      { en: 'It must be unique and can never be NULL', ne: 'यो अद्वितीय हुनुपर्छ र कहिल्यै NULL हुन पाउँदैन' },
      { en: 'It may be NULL if the value is unknown', ne: 'मान थाहा नभए NULL हुन सक्छ' },
      { en: 'It may repeat across rows', ne: 'पङ्क्तिहरूमा दोहोरिन सक्छ' },
      { en: 'It must point at another table', ne: 'यसले अर्को तालिका देखाउनुपर्छ' }
    ],
    answer: 0,
    explanation: {
      en: 'Unique and NOT NULL are the two rules a primary key must obey — together they are what let a row be found reliably. Pointing at another table is a foreign key, which may be NULL and may repeat.',
      ne: 'अद्वितीय र NOT NULL — primary key ले पालना गर्नुपर्ने दुई नियम यिनै हुन्। अर्को तालिका देखाउने काम foreign key को हो, जुन NULL हुन र दोहोरिन सक्छ।'
    }
  },
  {
    id: 'g10.db.q015', subject: 'grade10/dbms', unit: 'u2',
    topic: 'keys', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A candidate key is best described as…',
      ne: 'Candidate key को उत्तम व्याख्या कुन हो?'
    },
    options: [
      { en: 'a super key with no unnecessary attribute in it', ne: 'कुनै अनावश्यक एट्रिब्युट नभएको super key' },
      { en: 'any set of columns that identifies a row', ne: 'पङ्क्ति चिनाउने जुनसुकै स्तम्भ समूह' },
      { en: 'the key that was chosen as primary', ne: 'primary का रूपमा छानिएको कुञ्जी' },
      { en: 'a column pointing at another table', ne: 'अर्को तालिका देखाउने स्तम्भ' }
    ],
    answer: 0,
    explanation: {
      en: 'Any identifying set is a super key. Strip out everything unnecessary and it becomes a candidate key. One candidate key is then chosen as the primary key; the rest are alternate keys.',
      ne: 'पङ्क्ति चिनाउने जुनसुकै समूह super key हो। अनावश्यक कुरा हटाएपछि candidate key बन्छ। तीमध्ये एउटा primary key छानिन्छ; बाँकी alternate key हुन्।'
    }
  },
  {
    id: 'g10.db.q016', subject: 'grade10/dbms', unit: 'u2',
    topic: 'degree-of-relationship', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'An EMPLOYEE manages another EMPLOYEE. What is the degree of this relationship?',
      ne: 'एउटा EMPLOYEE ले अर्को EMPLOYEE लाई व्यवस्थापन गर्छ। यो सम्बन्धको degree कति हो?'
    },
    options: [
      { en: 'Unary — one entity takes part', ne: 'Unary — एउटै इन्टिटी सहभागी' },
      { en: 'Binary — two entities take part', ne: 'Binary — दुई इन्टिटी सहभागी' },
      { en: 'Ternary — three entities take part', ne: 'Ternary — तीन इन्टिटी सहभागी' },
      { en: 'It has no degree', ne: 'यसको degree हुँदैन' }
    ],
    answer: 0,
    explanation: {
      en: 'The degree of a relationship counts the entities in it, not the rows. Only EMPLOYEE takes part here, related to itself, so the degree is unary. Do not confuse degree with cardinality.',
      ne: 'सम्बन्धको degree ले त्यसमा सहभागी इन्टिटी गन्छ, पङ्क्ति होइन। यहाँ EMPLOYEE मात्र छ, आफैंसँग सम्बन्धित, त्यसैले degree unary हो। Degree लाई cardinality सँग नमिसाउनुहोस्।'
    }
  },

  /* ---------------------------------------------------------------
     UNIT 3 — Relational Model
     --------------------------------------------------------------- */
  {
    id: 'g10.db.q017', subject: 'grade10/dbms', unit: 'u3',
    topic: 'degree-cardinality', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A table has 5 columns and 200 rows. What is its DEGREE?',
      ne: 'एउटा तालिकामा ५ स्तम्भ र २०० पङ्क्ति छन्। यसको DEGREE कति हो?'
    },
    options: [
      { en: '5', ne: '५' },
      { en: '200', ne: '२००' },
      { en: '1000', ne: '१०००' },
      { en: '205', ne: '२०५' }
    ],
    answer: 0,
    explanation: {
      en: 'Degree is the number of columns; cardinality is the number of rows. Here the degree is 5 and the cardinality is 200. Swapping these two is the commonest error in this unit.',
      ne: 'Degree भनेको स्तम्भ सङ्ख्या; cardinality भनेको पङ्क्ति सङ्ख्या। यहाँ degree ५ र cardinality २००। यी दुई साट्नु यस युनिटको सबैभन्दा सामान्य गल्ती हो।'
    }
  },
  {
    id: 'g10.db.q018', subject: 'grade10/dbms', unit: 'u3',
    topic: 'relation-properties', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which of these is NOT allowed in a relation?',
      ne: 'रिलेसनमा यीमध्ये कुन मिल्दैन?'
    },
    options: [
      { en: 'Two rows that are completely identical', ne: 'पूरै उस्तै दुई पङ्क्ति' },
      { en: 'Rows stored in no particular order', ne: 'कुनै निश्चित क्रम नभएका पङ्क्ति' },
      { en: 'A column that allows NULL', ne: 'NULL राख्न दिने स्तम्भ' },
      { en: 'Columns listed in a different order', ne: 'फरक क्रममा राखिएका स्तम्भ' }
    ],
    answer: 0,
    explanation: {
      en: 'A relation is a set of tuples, so no two rows may be identical — the primary key guarantees it. Order is not significant for rows or columns, and NULLs are permitted in non-key columns.',
      ne: 'रिलेसन ट्युपलहरूको सेट हो, त्यसैले दुई पङ्क्ति उस्तै हुन पाउँदैनन् — primary key ले सुनिश्चित गर्छ। पङ्क्ति र स्तम्भको क्रमको महत्त्व हुँदैन, र कुञ्जी नभएका स्तम्भमा NULL मिल्छ।'
    }
  },
  {
    id: 'g10.db.q019', subject: 'grade10/dbms', unit: 'u3',
    topic: 'domain', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: { en: 'What is a DOMAIN in the relational model?', ne: 'रिलेसनल मोडेलमा DOMAIN भनेको के हो?' },
    options: [
      { en: 'The set of values an attribute is allowed to hold', ne: 'कुनै एट्रिब्युटले लिन पाउने मानहरूको समूह' },
      { en: 'The number of rows in a table', ne: 'तालिकाका पङ्क्तिको सङ्ख्या' },
      { en: 'The name of the database', ne: 'डाटाबेसको नाम' },
      { en: 'The primary key of a relation', ne: 'रिलेसनको primary key' }
    ],
    answer: 0,
    explanation: {
      en: 'A domain constrains what may appear in a column. The domain of "marks" might be whole numbers from 0 to 100, so the text "Ram" could never be stored there.',
      ne: 'Domain ले स्तम्भमा के आउन सक्छ भन्ने सीमित गर्छ। "marks" को domain ० देखि १०० सम्मका पूर्ण सङ्ख्या होला, त्यसैले त्यहाँ "Ram" राख्न मिल्दैन।'
    }
  },
  {
    id: 'g10.db.q020', subject: 'grade10/dbms', unit: 'u3',
    topic: 'foreign-key', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Student.class_id is a foreign key to Class.class_id. An attempt is made to insert a student with class_id = 15, but no class 15 exists. What happens?',
      ne: 'Student.class_id ले Class.class_id लाई देखाउने foreign key हो। class_id = 15 भएको विद्यार्थी थप्न खोजियो, तर कक्षा १५ छैन। के हुन्छ?'
    },
    options: [
      { en: 'It is refused — referential integrity is violated', ne: 'अस्वीकार हुन्छ — referential integrity उल्लङ्घन हुन्छ' },
      { en: 'It is accepted and class 15 is created automatically', ne: 'स्वीकार हुन्छ र कक्षा १५ आफैं बन्छ' },
      { en: 'It is accepted and the value becomes NULL', ne: 'स्वीकार हुन्छ र मान NULL बन्छ' },
      { en: 'It is accepted with a warning', ne: 'चेतावनीसहित स्वीकार हुन्छ' }
    ],
    answer: 0,
    explanation: {
      en: 'Referential integrity says a foreign key may only hold a value that already exists as a primary key in the table it points at. It may be NULL — meaning "not assigned" — but it may not be wrong.',
      ne: 'Referential integrity अनुसार foreign key ले देखाइएको तालिकाको primary key मा पहिले नै भएको मान मात्र राख्न पाउँछ। NULL हुन सक्छ — "तोकिएको छैन" भन्ने अर्थमा — तर गलत हुन पाउँदैन।'
    }
  },
  {
    id: 'g10.db.q021', subject: 'grade10/dbms', unit: 'u3',
    topic: 'er-to-relational', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'When a 1:M relationship is converted to tables, where does the foreign key go?',
      ne: '1:M सम्बन्धलाई तालिकामा बदल्दा foreign key कहाँ जान्छ?'
    },
    options: [
      { en: 'Into the table on the MANY side', ne: '"धेरै" तर्फको तालिकामा' },
      { en: 'Into the table on the ONE side', ne: '"एक" तर्फको तालिकामा' },
      { en: 'Into a new third table', ne: 'नयाँ तेस्रो तालिकामा' },
      { en: 'Into both tables', ne: 'दुवै तालिकामा' }
    ],
    answer: 0,
    explanation: {
      en: 'The primary key of the "one" side is copied into the "many" side. Each student stores the one class_id they belong to. Doing it the other way round cannot work — a column holds one value, and a class has many students.',
      ne: '"एक" तर्फको primary key "धेरै" तर्फ सारिन्छ। हरेक विद्यार्थीले आफू भएको एउटा class_id राख्छ। उल्टो गर्दा हुँदैन — स्तम्भले एउटै मान राख्छ, र कक्षामा धेरै विद्यार्थी हुन्छन्।'
    }
  },
  {
    id: 'g10.db.q022', subject: 'grade10/dbms', unit: 'u3',
    topic: 'relational-model', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'In the relational model, how are two tables connected?',
      ne: 'रिलेसनल मोडेलमा दुई तालिका कसरी जोडिन्छन्?'
    },
    options: [
      { en: 'By keys', ne: 'कुञ्जीले' },
      { en: 'By pointers', ne: 'Pointer ले' },
      { en: 'By their position in the file', ne: 'फाइलमा तिनको स्थानले' },
      { en: 'By the order the rows were inserted', ne: 'पङ्क्ति थपिएको क्रमले' }
    ],
    answer: 0,
    explanation: {
      en: 'The relational model links tables by matching values — a foreign key holding a value that exists as a primary key elsewhere. It deliberately avoids pointers, which is what made it simpler than the models before it.',
      ne: 'रिलेसनल मोडेलले मान मिलाएर तालिका जोड्छ — foreign key सँग अन्यत्र primary key भएको मान। यसले जानाजान pointer प्रयोग गर्दैन, र यही कारण यो अघिल्ला मोडेलभन्दा सरल भयो।'
    }
  },

  /* ---------------------------------------------------------------
     UNIT 4 — SQL
     --------------------------------------------------------------- */
  {
    id: 'g10.db.q023', subject: 'grade10/dbms', unit: 'u4',
    topic: 'sql-families', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: { en: 'To which family of SQL does CREATE TABLE belong?', ne: 'CREATE TABLE कुन SQL परिवारको हो?' },
    options: [
      { en: 'DDL — Data Definition Language', ne: 'DDL — Data Definition Language' },
      { en: 'DML — Data Manipulation Language', ne: 'DML — Data Manipulation Language' },
      { en: 'DCL — Data Control Language', ne: 'DCL — Data Control Language' },
      { en: 'None of these', ne: 'यीमध्ये कुनै पनि होइन' }
    ],
    answer: 0,
    explanation: {
      en: 'Sort a statement by what it changes. CREATE TABLE changes the structure, so it is DDL. DML changes the data inside; DCL changes who is allowed to use it.',
      ne: 'कथनले के बदल्छ त्यसैअनुसार छुट्याउनुहोस्। CREATE TABLE ले संरचना बदल्छ, त्यसैले DDL। DML ले भित्रको data, DCL ले प्रयोग गर्न पाउने अधिकार बदल्छ।'
    }
  },
  {
    id: 'g10.db.q024', subject: 'grade10/dbms', unit: 'u4',
    topic: 'delete-vs-drop', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'What is left after DELETE FROM Student; runs?',
      ne: 'DELETE FROM Student; चलेपछि के बाँकी रहन्छ?'
    },
    options: [
      { en: 'The table, with its structure but no rows', ne: 'तालिका — संरचनासहित तर पङ्क्तिविहीन' },
      { en: 'Nothing — the table is gone', ne: 'केही होइन — तालिका नै गयो' },
      { en: 'The rows, but no structure', ne: 'पङ्क्ति, तर संरचना छैन' },
      { en: 'An error, because WHERE is missing', ne: 'त्रुटि, किनभने WHERE छैन' }
    ],
    answer: 0,
    explanation: {
      en: 'DELETE removes rows; the table and its columns remain, and you can insert into it again tomorrow. DROP TABLE removes the table itself. This is the difference examiners ask for most often.',
      ne: 'DELETE ले पङ्क्ति हटाउँछ; तालिका र यसका स्तम्भ रहन्छन्, र भोलि फेरि पङ्क्ति थप्न सकिन्छ। DROP TABLE ले तालिका नै हटाउँछ। परीक्षकले सबैभन्दा धेरै सोध्ने फरक यही हो।'
    }
  },
  {
    id: 'g10.db.q025', subject: 'grade10/dbms', unit: 'u4',
    topic: 'select-where', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A Student table has 4 rows and 4 columns. SELECT name FROM Student WHERE marks > 60; returns 3 students. What is the shape of the result?',
      ne: 'Student तालिकामा ४ पङ्क्ति र ४ स्तम्भ छन्। SELECT name FROM Student WHERE marks > 60; ले ३ विद्यार्थी दिन्छ। नतिजाको आकार कस्तो हुन्छ?'
    },
    options: [
      { en: '3 rows and 1 column', ne: '३ पङ्क्ति र १ स्तम्भ' },
      { en: '3 rows and 4 columns', ne: '३ पङ्क्ति र ४ स्तम्भ' },
      { en: '4 rows and 1 column', ne: '४ पङ्क्ति र १ स्तम्भ' },
      { en: '4 rows and 4 columns', ne: '४ पङ्क्ति र ४ स्तम्भ' }
    ],
    answer: 0,
    explanation: {
      en: 'Two independent cuts. WHERE chooses rows: 4 becomes 3. SELECT chooses columns: 4 becomes 1, because only "name" is listed. Neither clause does the other one\'s job.',
      ne: 'दुई छुट्टै कटाइ। WHERE ले पङ्क्ति छान्छ: ४ बाट ३। SELECT ले स्तम्भ छान्छ: ४ बाट १, किनभने "name" मात्र लेखिएको छ। एउटाले अर्कोको काम गर्दैन।'
    }
  },
  {
    id: 'g10.db.q026', subject: 'grade10/dbms', unit: 'u4',
    topic: 'order-by', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A query returns 5 rows. ORDER BY marks DESC is added. How many rows now?',
      ne: 'एउटा क्वेरीले ५ पङ्क्ति दिन्छ। ORDER BY marks DESC थपियो। अब कति पङ्क्ति?'
    },
    options: [
      { en: '5 — sorting never removes a row', ne: '५ — क्रम मिलाउँदा पङ्क्ति कहिल्यै हट्दैन' },
      { en: 'Fewer than 5', ne: '५ भन्दा कम' },
      { en: '1 — only the highest', ne: '१ — सबैभन्दा माथिको मात्र' },
      { en: 'It depends on the marks', ne: 'अंकमा भर पर्छ' }
    ],
    answer: 0,
    explanation: {
      en: 'ORDER BY only rearranges. Filtering is WHERE\'s job. The result still has 5 rows, now in a different order.',
      ne: 'ORDER BY ले क्रम मात्र मिलाउँछ। छान्ने काम WHERE को हो। नतिजामा अझै ५ पङ्क्ति छन्, क्रम मात्र फरक।'
    }
  },
  {
    id: 'g10.db.q027', subject: 'grade10/dbms', unit: 'u4',
    topic: 'joins', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A join of Student and Class returns every student, and a NULL in the room column for one of them. Which join was used?',
      ne: 'Student र Class को join ले हरेक विद्यार्थी दिन्छ, र एक जनाको room स्तम्भमा NULL छ। कुन join प्रयोग भयो?'
    },
    options: [
      { en: 'LEFT OUTER JOIN', ne: 'LEFT OUTER JOIN' },
      { en: 'INNER JOIN', ne: 'INNER JOIN' },
      { en: 'RIGHT OUTER JOIN', ne: 'RIGHT OUTER JOIN' },
      { en: 'NATURAL JOIN', ne: 'NATURAL JOIN' }
    ],
    answer: 0,
    explanation: {
      en: 'Work backwards from where the NULL is. Every left row survived and the missing value is on the right, so it is a left join. An inner join would have dropped that student entirely.',
      ne: 'NULL कता छ भन्नेबाट उल्टो सोच्नुहोस्। बायाँका सबै पङ्क्ति बाँचे र नभएको मान दायाँ छ, त्यसैले left join। Inner join ले त्यो विद्यार्थीलाई पूरै हटाइदिन्थ्यो।'
    }
  },
  {
    id: 'g10.db.q028', subject: 'grade10/dbms', unit: 'u4',
    topic: 'joins', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which join keeps ONLY the rows that match on both sides?',
      ne: 'कुन join ले दुवैतर्फ मिल्ने पङ्क्ति मात्र राख्छ?'
    },
    options: [
      { en: 'Inner join', ne: 'Inner join' },
      { en: 'Left outer join', ne: 'Left outer join' },
      { en: 'Right outer join', ne: 'Right outer join' },
      { en: 'Full outer join', ne: 'Full outer join' }
    ],
    answer: 0,
    explanation: {
      en: 'All five joins share the same matching test; they differ only in what they do with rows that did not match. Inner throws them away; the outer joins keep one side or both.',
      ne: 'पाँचै join को मिलान जाँच उही हो; फरक केवल नमिलेका पङ्क्तिको के गर्ने भन्नेमा। Inner ले फालिदिन्छ; outer join हरूले एक वा दुवैतर्फ राख्छन्।'
    }
  },
  {
    id: 'g10.db.q029', subject: 'grade10/dbms', unit: 'u4',
    topic: 'update', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A table has 40 rows. UPDATE Student SET marks = 80; is run, with no WHERE clause. What happens?',
      ne: 'तालिकामा ४० पङ्क्ति छन्। WHERE नराखी UPDATE Student SET marks = 80; चलाइयो। के हुन्छ?'
    },
    options: [
      { en: 'All 40 rows are changed', ne: 'सबै ४० पङ्क्ति बदलिन्छन्' },
      { en: 'An error, because WHERE is required', ne: 'त्रुटि, किनभने WHERE अनिवार्य छ' },
      { en: 'Only the first row is changed', ne: 'पहिलो पङ्क्ति मात्र बदलिन्छ' },
      { en: 'Nothing changes', ne: 'केही बदलिँदैन' }
    ],
    answer: 0,
    explanation: {
      en: 'The statement is perfectly legal, so nothing warns you — the WHERE clause is optional, and without it the change applies to every row. This is why the WHERE clause should be written before the SET.',
      ne: 'कथन पूर्णतः वैध हुने भएकाले चेतावनी आउँदैन — WHERE ऐच्छिक हो, र नभए परिवर्तन हरेक पङ्क्तिमा लाग्छ। त्यसैले SET भन्दा पहिले WHERE लेख्ने बानी राख्नुहोस्।'
    }
  },
  {
    id: 'g10.db.q030', subject: 'grade10/dbms', unit: 'u4',
    topic: 'view', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: { en: 'What is an SQL VIEW?', ne: 'SQL VIEW भनेको के हो?' },
    options: [
      { en: 'A stored query that behaves like a table but holds no data of its own', ne: 'तालिकाजस्तै व्यवहार गर्ने संग्रहित क्वेरी, जसको आफ्नो data हुँदैन' },
      { en: 'A copy of a table saved on disk', ne: 'डिस्कमा राखिएको तालिकाको प्रतिलिपि' },
      { en: 'A backup of the database', ne: 'डाटाबेसको backup' },
      { en: 'A type of primary key', ne: 'Primary key को एक प्रकार' }
    ],
    answer: 0,
    explanation: {
      en: 'A view reads from the real tables every time it is used, so it is always current. Views hide complexity — a long join becomes one name — and restrict access, since a user can be granted the view without the whole table.',
      ne: 'View ले प्रयोग हुँदा हरेक पटक वास्तविक तालिकाबाटै पढ्छ, त्यसैले सधैं ताजा हुन्छ। यसले जटिलता लुकाउँछ र पहुँच सीमित गर्छ — पूरै तालिका नदिई view दिन सकिन्छ।'
    }
  },
  {
    id: 'g10.db.q031', subject: 'grade10/dbms', unit: 'u4',
    topic: 'dcl', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: { en: 'Which statement takes a privilege away from a user?', ne: 'कुन कथनले प्रयोगकर्ताबाट अधिकार खोस्छ?' },
    options: [
      { en: 'REVOKE', ne: 'REVOKE' },
      { en: 'DELETE', ne: 'DELETE' },
      { en: 'DROP', ne: 'DROP' },
      { en: 'ROLLBACK', ne: 'ROLLBACK' }
    ],
    answer: 0,
    explanation: {
      en: 'GRANT gives a privilege and REVOKE takes it back; both are DCL. DELETE removes rows and DROP removes a table — those change data and structure, not permission.',
      ne: 'GRANT ले अधिकार दिन्छ र REVOKE ले फिर्ता लिन्छ; दुवै DCL हुन्। DELETE ले पङ्क्ति र DROP ले तालिका हटाउँछ — ती data र संरचना बदल्छन्, अधिकार होइन।'
    }
  },
  {
    id: 'g10.db.q032', subject: 'grade10/dbms', unit: 'u4',
    topic: 'sql-syntax', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which condition correctly selects students named Ram?',
      ne: 'राम नाम गरेका विद्यार्थी छान्न कुन सर्त सही छ?'
    },
    options: [
      { en: "WHERE name = 'Ram'", ne: "WHERE name = 'Ram'" },
      { en: 'WHERE name = Ram', ne: 'WHERE name = Ram' },
      { en: 'WHERE name == Ram', ne: 'WHERE name == Ram' },
      { en: 'WHERE name IS Ram', ne: 'WHERE name IS Ram' }
    ],
    answer: 0,
    explanation: {
      en: 'Text values need single quotes. Without them the database looks for a COLUMN called Ram and reports that no such column exists. SQL uses a single = for comparison, not ==.',
      ne: 'पाठ मानलाई एकल उद्धरण चिन्ह चाहिन्छ। नभए डाटाबेसले Ram नामको स्तम्भ खोज्छ र त्यस्तो स्तम्भ छैन भन्छ। SQL मा तुलनाका लागि एउटै = हुन्छ, == होइन।'
    }
  },

  /* ---------------------------------------------------------------
     UNIT 5 — Relational Database Design
     --------------------------------------------------------------- */
  {
    id: 'g10.db.q033', subject: 'grade10/dbms', unit: 'u5',
    topic: 'normalization-purpose', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: { en: 'Why is normalization performed?', ne: 'Normalization किन गरिन्छ?' },
    options: [
      { en: 'To remove insertion, deletion and update anomalies', ne: 'Insertion, deletion र update anomaly हटाउन' },
      { en: 'To make queries run faster', ne: 'क्वेरी छिटो चलाउन' },
      { en: 'To save disk space, which is its main purpose', ne: 'डिस्क ठाउँ बचाउन — यही मुख्य उद्देश्य हो' },
      { en: 'To encrypt the data', ne: 'Data encrypt गर्न' }
    ],
    answer: 0,
    explanation: {
      en: 'Normalization removes the three anomalies caused by repeating a fact in many rows. Less space is a side effect, and queries often get slower, not faster, because more joins are needed.',
      ne: 'Normalization ले उही तथ्य धेरै पङ्क्तिमा दोहोरिँदा आउने तीन anomaly हटाउँछ। कम ठाउँ सहायक असर हो, र join बढ्ने भएकाले क्वेरी प्रायः छिटो होइन, ढिलो हुन्छ।'
    }
  },
  {
    id: 'g10.db.q034', subject: 'grade10/dbms', unit: 'u5',
    topic: '1nf', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A cell holds the value "Maths, Science". Which normal form does this break?',
      ne: 'एउटा कक्षमा "Maths, Science" छ। यसले कुन normal form तोड्छ?'
    },
    options: [
      { en: '1NF', ne: '1NF' },
      { en: '2NF', ne: '2NF' },
      { en: '3NF', ne: '3NF' },
      { en: 'None — it is allowed', ne: 'कुनै पनि होइन — यो मिल्छ' }
    ],
    answer: 0,
    explanation: {
      en: '1NF requires every cell to hold a single atomic value. Two subjects in one cell is a repeating group, and splitting it into separate rows is the first step of normalising.',
      ne: '1NF ले हरेक कक्षमा एउटै अविभाज्य मान माग्छ। एउटै कक्षमा दुई विषय दोहोरिने समूह हो, र यसलाई छुट्टै पङ्क्तिमा बाँड्नु normalise गर्ने पहिलो चरण हो।'
    }
  },
  {
    id: 'g10.db.q035', subject: 'grade10/dbms', unit: 'u5',
    topic: '2nf', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A table has the composite key (student_id, subject) and holds the student\'s name, which depends on student_id alone. What is this called?',
      ne: 'एउटा तालिकाको composite कुञ्जी (student_id, subject) छ र त्यसमा विद्यार्थीको नाम छ, जुन student_id मा मात्र निर्भर छ। यसलाई के भनिन्छ?'
    },
    options: [
      { en: 'A partial dependency', ne: 'Partial dependency' },
      { en: 'A transitive dependency', ne: 'Transitive dependency' },
      { en: 'A full dependency', ne: 'Full dependency' },
      { en: 'A referential dependency', ne: 'Referential dependency' }
    ],
    answer: 0,
    explanation: {
      en: 'The key is both columns together, but name depends on only part of it. That is a partial dependency, and removing it is exactly what 2NF does. It can only happen when the key is composite.',
      ne: 'कुञ्जी दुवै स्तम्भ मिलेर हो, तर name त्यसको एक भागमा मात्र निर्भर छ। यही partial dependency हो, र 2NF ले हटाउने पनि यही। कुञ्जी composite भएमा मात्र यो सम्भव हुन्छ।'
    }
  },
  {
    id: 'g10.db.q036', subject: 'grade10/dbms', unit: 'u5',
    topic: '3nf', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'In Student(roll, name, class_id, class_room), class_room depends on class_id, which depends on roll. Which normal form does this break?',
      ne: 'Student(roll, name, class_id, class_room) मा class_room, class_id मा निर्भर छ र class_id, roll मा। यसले कुन normal form तोड्छ?'
    },
    options: [
      { en: '3NF — it is a transitive dependency', ne: '3NF — यो transitive dependency हो' },
      { en: '1NF — the values are not atomic', ne: '1NF — मान अविभाज्य छैनन्' },
      { en: '2NF — it is a partial dependency', ne: '2NF — यो partial dependency हो' },
      { en: 'None of them', ne: 'कुनै पनि होइन' }
    ],
    answer: 0,
    explanation: {
      en: 'A non-key column depending on another non-key column is a transitive dependency, and 3NF forbids it. The fix is to move class_id and class_room into a Class table of their own.',
      ne: 'कुञ्जी नभएको स्तम्भ अर्को कुञ्जी नभएको स्तम्भमा निर्भर हुनु transitive dependency हो, र 3NF ले यसलाई निषेध गर्छ। समाधान: class_id र class_room लाई छुट्टै Class तालिकामा सार्ने।'
    }
  },
  {
    id: 'g10.db.q037', subject: 'grade10/dbms', unit: 'u5',
    topic: 'functional-dependency', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: { en: 'What does A → B mean?', ne: 'A → B को अर्थ के हो?' },
    options: [
      { en: 'Each value of A determines exactly one value of B', ne: 'A को हरेक मानले B को ठ्याक्कै एउटा मान तय गर्छ' },
      { en: 'A and B are always equal', ne: 'A र B सधैं बराबर हुन्छन्' },
      { en: 'B is the primary key of A', ne: 'B, A को primary key हो' },
      { en: 'A points at B as a foreign key', ne: 'A ले B लाई foreign key का रूपमा देखाउँछ' }
    ],
    answer: 0,
    explanation: {
      en: 'Read it as "A determines B". student_id → name holds, because one id gives one name. The reverse usually does not: two students may share a name.',
      ne: '"A ले B तय गर्छ" भनेर पढ्नुहोस्। student_id → name मिल्छ, किनभने एउटा id ले एउटै नाम दिन्छ। उल्टो प्रायः मिल्दैन: दुई विद्यार्थीको नाम उही हुन सक्छ।'
    }
  },
  {
    id: 'g10.db.q038', subject: 'grade10/dbms', unit: 'u5',
    topic: 'anomalies', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A class\'s room number is stored on every student row. The last student in that class is deleted, and the room number is lost. What is this called?',
      ne: 'कक्षाको कोठा नम्बर हरेक विद्यार्थीको पङ्क्तिमा छ। त्यस कक्षाको अन्तिम विद्यार्थी हटाइयो र कोठा नम्बर हरायो। यसलाई के भनिन्छ?'
    },
    options: [
      { en: 'A deletion anomaly', ne: 'Deletion anomaly' },
      { en: 'An update anomaly', ne: 'Update anomaly' },
      { en: 'An insertion anomaly', ne: 'Insertion anomaly' },
      { en: 'A referential anomaly', ne: 'Referential anomaly' }
    ],
    answer: 0,
    explanation: {
      en: 'Deleting one thing has destroyed an unrelated fact — the room still exists, but the database no longer knows about it. That is a deletion anomaly, and normalising into a separate Class table prevents it.',
      ne: 'एउटा कुरा हटाउँदा असम्बन्धित तथ्य नष्ट भयो — कोठा अझै छ, तर डाटाबेसलाई थाहा छैन। यही deletion anomaly हो, र छुट्टै Class तालिका बनाए रोकिन्छ।'
    }
  },

  /* ---------------------------------------------------------------
     UNIT 6 — Transaction
     --------------------------------------------------------------- */
  {
    id: 'g10.db.q039', subject: 'grade10/dbms', unit: 'u6',
    topic: 'transaction-definition', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: { en: 'What is a transaction?', ne: 'ट्रान्ज्याक्सन के हो?' },
    options: [
      { en: 'A logical unit of work that must be done completely or not at all', ne: 'एउटा तार्किक काम, जुन पूरै हुनुपर्छ वा बिल्कुल हुनुहुँदैन' },
      { en: 'A single SQL statement', ne: 'एउटा मात्र SQL कथन' },
      { en: 'A backup of the database', ne: 'डाटाबेसको backup' },
      { en: 'A connection between two tables', ne: 'दुई तालिकाबीचको जोडाइ' }
    ],
    answer: 0,
    explanation: {
      en: 'A transaction is usually several statements, not one. What makes it a transaction is the all-or-nothing promise: a bank transfer is a debit and a credit, and neither may happen alone.',
      ne: 'ट्रान्ज्याक्सनमा प्रायः धेरै कथन हुन्छन्, एउटा होइन। यसलाई ट्रान्ज्याक्सन बनाउने कुरा "पूरै वा बिल्कुल होइन" भन्ने वचन हो।'
    }
  },
  {
    id: 'g10.db.q040', subject: 'grade10/dbms', unit: 'u6',
    topic: 'acid', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which ACID property guarantees that a committed transaction survives a power failure?',
      ne: 'Commit भइसकेको ट्रान्ज्याक्सन बिजुली गएपछि पनि रहन्छ भन्ने कुन ACID गुणले सुनिश्चित गर्छ?'
    },
    options: [
      { en: 'Durability', ne: 'Durability' },
      { en: 'Atomicity', ne: 'Atomicity' },
      { en: 'Isolation', ne: 'Isolation' },
      { en: 'Consistency', ne: 'Consistency' }
    ],
    answer: 0,
    explanation: {
      en: 'Durability protects work that has committed. Atomicity is the opposite promise — it undoes work that had NOT committed. The test is always whether a COMMIT happened.',
      ne: 'Durability ले commit भइसकेको काम जोगाउँछ। Atomicity उल्टो वचन हो — commit नभएको काम फिर्ता लैजान्छ। जाँच सधैं COMMIT भयो कि भएन भन्ने हो।'
    }
  },
  {
    id: 'g10.db.q041', subject: 'grade10/dbms', unit: 'u6',
    topic: 'acid', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A transfer debits Ram but crashes before crediting Sita. The transaction had not committed. What does the database do on restart?',
      ne: 'रकम सार्दा रामको खाताबाट कटियो तर सीतालाई जम्मा हुनुअघि crash भयो। ट्रान्ज्याक्सन commit भएको थिएन। पुनः सुरु हुँदा डाटाबेसले के गर्छ?'
    },
    options: [
      { en: 'Rolls the debit back, so Ram\'s balance is unchanged', ne: 'कटौती फिर्ता लैजान्छ, रामको मौज्दात उस्तै रहन्छ' },
      { en: 'Completes the transfer automatically', ne: 'रकम सार्ने काम आफैं पूरा गर्छ' },
      { en: 'Leaves the debit in place and reports an error', ne: 'कटौती त्यसै छाडेर त्रुटि देखाउँछ' },
      { en: 'Deletes both accounts', ne: 'दुवै खाता हटाउँछ' }
    ],
    answer: 0,
    explanation: {
      en: 'With no COMMIT record in the log, recovery undoes everything the transaction did. That is atomicity: half a transfer may not survive. Had it committed, redo would have re-applied it instead.',
      ne: 'Log मा COMMIT रेकर्ड नभएकाले recovery ले ट्रान्ज्याक्सनले गरेका सबै काम उल्टाउँछ। यही atomicity हो: आधा रकम सारेको बाँच्न पाउँदैन। Commit भएको भए redo ले फेरि लागू गर्थ्यो।'
    }
  },
  {
    id: 'g10.db.q042', subject: 'grade10/dbms', unit: 'u6',
    topic: 'transaction-states', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which are the two FINAL states of a transaction?',
      ne: 'ट्रान्ज्याक्सनका दुई अन्तिम अवस्था कुन हुन्?'
    },
    options: [
      { en: 'Committed and aborted', ne: 'Committed र aborted' },
      { en: 'Active and failed', ne: 'Active र failed' },
      { en: 'Partially committed and committed', ne: 'Partially committed र committed' },
      { en: 'Failed and partially committed', ne: 'Failed र partially committed' }
    ],
    answer: 0,
    explanation: {
      en: 'Every transaction ends in exactly one of these two. Active, partially committed and failed are all states it passes through on the way.',
      ne: 'हरेक ट्रान्ज्याक्सन यी दुईमध्ये ठ्याक्कै एउटामा टुङ्गिन्छ। Active, partially committed र failed बाटोमा पर्ने अवस्था हुन्।'
    }
  },
  {
    id: 'g10.db.q043', subject: 'grade10/dbms', unit: 'u6',
    topic: 'concurrency', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Two clerks read a balance of 5000. One writes 4000, then the other writes 3000 using the value it read first. What problem is this?',
      ne: 'दुई कर्मचारीले ५००० मौज्दात पढे। एउटाले ४००० लेख्यो, अनि अर्कोले पहिले पढेको मानबाट ३००० लेख्यो। यो कुन समस्या हो?'
    },
    options: [
      { en: 'The lost update problem', ne: 'Lost update समस्या' },
      { en: 'A deletion anomaly', ne: 'Deletion anomaly' },
      { en: 'A partial dependency', ne: 'Partial dependency' },
      { en: 'A referential integrity violation', ne: 'Referential integrity उल्लङ्घन' }
    ],
    answer: 0,
    explanation: {
      en: 'The first withdrawal has vanished. Neither clerk did anything wrong — each did correct arithmetic on a value that was correct when read. The fault is uncontrolled interleaving, which locks prevent.',
      ne: 'पहिलो निकासी हरायो। कसैले गलत गरेको होइन — दुवैले पढ्दाको सही मानमा सही गणित गरे। दोष अनियन्त्रित क्रम मिसिनुमा छ, जसलाई lock ले रोक्छ।'
    }
  },
  {
    id: 'g10.db.q044', subject: 'grade10/dbms', unit: 'u6',
    topic: 'commit-rollback', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: { en: 'What does ROLLBACK do?', ne: 'ROLLBACK ले के गर्छ?' },
    options: [
      { en: 'Undoes every change the transaction made', ne: 'ट्रान्ज्याक्सनले गरेका सबै परिवर्तन फिर्ता लैजान्छ' },
      { en: 'Makes the changes permanent', ne: 'परिवर्तनलाई स्थायी बनाउँछ' },
      { en: 'Deletes the table', ne: 'तालिका हटाउँछ' },
      { en: 'Takes a backup', ne: 'Backup लिन्छ' }
    ],
    answer: 0,
    explanation: {
      en: 'ROLLBACK returns the database to the state it was in before the transaction began. COMMIT is the opposite — it makes the changes permanent. Exactly one of the two ends a transaction.',
      ne: 'ROLLBACK ले डाटाबेसलाई ट्रान्ज्याक्सन सुरु हुनुअघिकै अवस्थामा फर्काउँछ। COMMIT उल्टो हो — परिवर्तनलाई स्थायी बनाउँछ। ट्रान्ज्याक्सन यीमध्ये एउटाले टुङ्गिन्छ।'
    }
  },

  /* ---------------------------------------------------------------
     UNIT 7 — Backup, Recovery and Security
     --------------------------------------------------------------- */
  {
    id: 'g10.db.q045', subject: 'grade10/dbms', unit: 'u7',
    topic: 'backup-types', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A backup consists of the SQL statements needed to rebuild the database. What type is it?',
      ne: 'कुनै backup मा डाटाबेस पुनर्निर्माण गर्ने SQL कथनहरू छन्। यो कुन प्रकारको हो?'
    },
    options: [
      { en: 'Logical backup', ne: 'Logical backup' },
      { en: 'Physical backup', ne: 'Physical backup' },
      { en: 'Incremental backup', ne: 'Incremental backup' },
      { en: 'Differential backup', ne: 'Differential backup' }
    ],
    answer: 0,
    explanation: {
      en: 'A logical backup stores the SQL that would recreate the data, so it is readable and can be restored onto a different system. A physical backup copies the database files themselves.',
      ne: 'Logical backup ले data पुनः बनाउने SQL राख्छ, त्यसैले पढ्न मिल्छ र फरक प्रणालीमा पनि फर्काउन सकिन्छ। Physical backup ले डाटाबेस फाइल नै प्रतिलिपि गर्छ।'
    }
  },
  {
    id: 'g10.db.q046', subject: 'grade10/dbms', unit: 'u7',
    topic: 'backup-methods', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A full backup runs Sunday, and INCREMENTAL backups run Monday to Friday. The disk fails on Friday night. What is needed to restore?',
      ne: 'आइतबार full backup, र सोमदेखि शुक्रसम्म INCREMENTAL backup चल्छ। शुक्रबार राति डिस्क बिग्रियो। फर्काउन के चाहिन्छ?'
    },
    options: [
      { en: 'The full backup plus every incremental, in order', ne: 'Full backup र सबै incremental, क्रमैसँग' },
      { en: 'The full backup plus Friday\'s incremental only', ne: 'Full backup र शुक्रबारको incremental मात्र' },
      { en: 'Friday\'s incremental only', ne: 'शुक्रबारको incremental मात्र' },
      { en: 'The full backup only', ne: 'Full backup मात्र' }
    ],
    answer: 0,
    explanation: {
      en: 'An incremental backup holds only what changed since the LAST backup, so each day\'s changes exist in exactly one file and all are needed. A differential holds everything since the last FULL backup, so only the newest one would be required.',
      ne: 'Incremental ले अघिल्लो backup देखिको परिवर्तन मात्र राख्छ, त्यसैले हरेक दिनको परिवर्तन एउटै फाइलमा हुन्छ र सबै चाहिन्छ। Differential ले अघिल्लो FULL देखिका सबै राख्छ, त्यसैले पछिल्लो एउटै पुग्थ्यो।'
    }
  },
  {
    id: 'g10.db.q047', subject: 'grade10/dbms', unit: 'u7',
    topic: 'recovery', difficulty: 'hard', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'After a crash, the log shows T1 with a COMMIT record and T2 without one. What does recovery do?',
      ne: 'Crash पछि log मा T1 सँग COMMIT रेकर्ड छ र T2 सँग छैन। Recovery ले के गर्छ?'
    },
    options: [
      { en: 'REDO T1 and UNDO T2', ne: 'T1 लाई REDO र T2 लाई UNDO' },
      { en: 'UNDO T1 and REDO T2', ne: 'T1 लाई UNDO र T2 लाई REDO' },
      { en: 'REDO both', ne: 'दुवैलाई REDO' },
      { en: 'UNDO both', ne: 'दुवैलाई UNDO' }
    ],
    answer: 0,
    explanation: {
      en: 'The COMMIT record is the only test. A committed transaction is redone so its work exists — durability. An uncommitted one is undone so no half-finished work survives — atomicity.',
      ne: 'COMMIT रेकर्ड नै एउटै जाँच हो। Commit भएकोलाई redo गरिन्छ ताकि काम रहोस् — durability। नभएकोलाई undo गरिन्छ ताकि आधा काम नबाँचोस् — atomicity।'
    }
  },
  {
    id: 'g10.db.q048', subject: 'grade10/dbms', unit: 'u7',
    topic: 'security', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A user logs in successfully but is refused permission to change marks. Which is at work?',
      ne: 'प्रयोगकर्ता सफलतापूर्वक लगइन गरे तर अंक बदल्ने अनुमति पाएनन्। यहाँ के लागू भइरहेको छ?'
    },
    options: [
      { en: 'Authorisation', ne: 'Authorisation' },
      { en: 'Authentication', ne: 'Authentication' },
      { en: 'Encryption', ne: 'Encryption' },
      { en: 'Recovery', ne: 'Recovery' }
    ],
    answer: 0,
    explanation: {
      en: 'Authentication proved WHO they are — the login succeeded. Authorisation decides WHAT they may do, and it is what refused the change. GRANT and REVOKE control it.',
      ne: 'Authentication ले उनी को हुन् भन्ने प्रमाणित गर्‍यो — लगइन सफल भयो। Authorisation ले के गर्न पाउने भन्ने तय गर्छ, र यसैले रोक्यो। GRANT र REVOKE ले नियन्त्रण गर्छन्।'
    }
  },
  {
    id: 'g10.db.q049', subject: 'grade10/dbms', unit: 'u7',
    topic: 'security-threats', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'A user types SQL into a login box and the program runs it, exposing the whole table. What is this threat called?',
      ne: 'प्रयोगकर्ताले लगइन बाकसमा SQL टाइप गर्दा प्रोग्रामले चलाइदियो र पूरै तालिका देखियो। यो खतरालाई के भनिन्छ?'
    },
    options: [
      { en: 'SQL injection', ne: 'SQL injection' },
      { en: 'A lost update', ne: 'Lost update' },
      { en: 'A deletion anomaly', ne: 'Deletion anomaly' },
      { en: 'Privilege abuse', ne: 'अधिकारको दुरुपयोग' }
    ],
    answer: 0,
    explanation: {
      en: 'SQL injection happens when user input is treated as SQL instead of as data. Privilege abuse is different — that is a legitimate user doing more than their job requires.',
      ne: 'प्रयोगकर्ताले लेखेको कुरालाई data होइन SQL मानेर चलाउँदा SQL injection हुन्छ। अधिकारको दुरुपयोग फरक हो — त्यो वैध प्रयोगकर्ताले काम भन्दा बढी गर्नु हो।'
    }
  },
  {
    id: 'g10.db.q050', subject: 'grade10/dbms', unit: 'u7',
    topic: 'backup-vs-recovery', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which statement is correct?',
      ne: 'कुन भनाइ सही हो?'
    },
    options: [
      { en: 'Backup is the copy taken in advance; recovery is the process of using it after a failure', ne: 'Backup पहिले लिइने प्रतिलिपि हो; recovery असफलतापछि त्यो प्रयोग गर्ने प्रक्रिया' },
      { en: 'Backup and recovery are two names for the same process', ne: 'Backup र recovery एउटै प्रक्रियाका दुई नाम हुन्' },
      { en: 'Recovery is taken every night; backup runs after a crash', ne: 'Recovery हरेक रात लिइन्छ; backup crash पछि चल्छ' },
      { en: 'Backup is only needed if there is no log', ne: 'Log नभएमा मात्र backup चाहिन्छ' }
    ],
    answer: 0,
    explanation: {
      en: 'They are separate: the backup is prepared before anything goes wrong, and recovery is the process — using the backup and the log — that puts the database back into a consistent state afterwards.',
      ne: 'यी फरक हुन्: केही बिग्रनुअघि backup तयार गरिन्छ, र recovery भनेको त्यसपछि backup र log प्रयोग गरेर डाटाबेसलाई सङ्गत अवस्थामा फर्काउने प्रक्रिया हो।'
    }
  },
  {
    id: 'g10.db.q051', subject: 'grade10/dbms', unit: 'u7',
    topic: 'failure-reasons', difficulty: 'easy', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'Which of these is a HUMAN cause of database failure?',
      ne: 'यीमध्ये कुन डाटाबेस बिग्रनुको मानवीय कारण हो?'
    },
    options: [
      { en: 'Running DELETE without a WHERE clause', ne: 'WHERE नराखी DELETE चलाउनु' },
      { en: 'A disk head crash', ne: 'डिस्क बिग्रनु' },
      { en: 'A power cut', ne: 'बिजुली जानु' },
      { en: 'An earthquake', ne: 'भूकम्प' }
    ],
    answer: 0,
    explanation: {
      en: 'A missing WHERE clause is human error, and it is one of the commonest causes of real data loss — precisely because the statement is legal and nothing warns you.',
      ne: 'WHERE छुटाउनु मानवीय गल्ती हो, र वास्तविक data हराउने सबैभन्दा सामान्य कारणमध्ये एक — किनभने कथन वैध हुन्छ र कुनै चेतावनी आउँदैन।'
    }
  },
  {
    id: 'g10.db.q052', subject: 'grade10/dbms', unit: 'u7',
    topic: 'encryption', difficulty: 'medium', type: 'single-choice', examRelevant: true,
    prompt: {
      en: 'What does encryption protect against that a password does not?',
      ne: 'पासवर्डले नजोगाउने कुन कुराबाट encryption ले जोगाउँछ?'
    },
    options: [
      { en: 'Someone who obtains the database file itself', ne: 'डाटाबेस फाइल नै हात पारेको व्यक्तिबाट' },
      { en: 'A user who forgets their password', ne: 'पासवर्ड बिर्सने प्रयोगकर्ताबाट' },
      { en: 'A power failure', ne: 'बिजुली जानुबाट' },
      { en: 'A disk crash', ne: 'डिस्क बिग्रनुबाट' }
    ],
    answer: 0,
    explanation: {
      en: 'A password stops someone logging in. It does nothing once the file has been copied — a stolen backup can simply be opened. Encryption makes the contents unreadable without the key, which is why unencrypted backups are a listed threat.',
      ne: 'पासवर्डले लगइन रोक्छ। फाइल नै प्रतिलिपि भइसकेपछि केही गर्दैन — चोरिएको backup खोल्न सकिन्छ। Encryption ले कुञ्जीविना सामग्री पढ्न नमिल्ने बनाउँछ, त्यसैले encrypt नगरिएको backup खतराको सूचीमा छ।'
    }
  }

];
