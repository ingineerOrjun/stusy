/* ============================================================
   RGSC Study Board — site generator
   Reads the finished single-file Class 10 C++ simulation and
   splits it into a multi-page website, then generates outline
   pages for every other Grade 9 / Grade 10 subject.
   ============================================================ */
const fs = require('fs');
const path = require('path');

const SRC = require('path').join(__dirname, 'legacy-single-file.html');
const OUT = 'C:/Users/Acer/Desktop/rgsc-study';
const src = fs.readFileSync(SRC, 'utf8');

function w(rel, content){
  const p = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, 'utf8');
}

/* ---------- 1. pull CSS + JS out of the source file ---------- */
const styles = [...src.matchAll(/<style>([\s\S]*?)<\/style>/g)].map(m => m[1]);
if (styles.length !== 2) throw new Error('expected 2 style blocks, got ' + styles.length);
let baseCss = styles[0] + '\n' + styles[1];

const jsAll = src.match(/<script>([\s\S]*?)<\/script>/)[1];

/* split the script on its numbered banner comments */
const marks = [];
const bannerRe = /\/\* ={10,}\s*\n\s*([\w]+)\./g;
let mm;
while ((mm = bannerRe.exec(jsAll)) !== null) marks.push({ key: mm[1], at: mm.index });
if (!marks.length) throw new Error('no JS banners found');
const jsPart = {};
marks.forEach((m, i) => {
  jsPart[m.key] = jsAll.slice(m.at, i + 1 < marks.length ? marks[i + 1].at : jsAll.length);
});
['1','2','3','3b','4','5','6'].forEach(k => { if (!jsPart[k]) throw new Error('missing JS part ' + k); });

/* ---------- 2. pull the HTML sections out ---------- */
function section(id){
  const open = src.indexOf('<section id="' + id + '"');
  if (open < 0) throw new Error('section not found: ' + id);
  const close = src.indexOf('</section>', open);
  return src.slice(open, close + 10);
}
const SEC = {};
['u1','u2','u3','u4','u5','u6','trace','tables','terms','quiz'].forEach(id => { SEC[id] = section(id); });

/* hero + "how to use" block */
const heroStart = src.indexOf('<header class="hero">');
const heroEnd   = src.indexOf('<!-- ============================ UNIT 1');
if (heroStart < 0 || heroEnd < 0) throw new Error('hero block not found');
const HERO = src.slice(heroStart, heroEnd).trim();

/* ---------- 3. make the shared JS null-safe across pages ---------- */
function patch(s, find, repl, label){
  if (s.indexOf(find) < 0) throw new Error('patch target missing: ' + label);
  return s.split(find).join(repl);
}
jsPart['1'] = patch(jsPart['1'],
  'function conLine(el, text, cls){\n  var d',
  'function conLine(el, text, cls){\n  if (!el) return;\n  var d', 'conLine guard');
jsPart['1'] = patch(jsPart['1'],
  'function conClear(el){ el.innerHTML',
  'function conClear(el){ if (!el) return; el.innerHTML', 'conClear guard');
jsPart['1'] = patch(jsPart['1'],
  'function runSteps(codeElId, codeLines, steps, conEl, guard, onDone){\n  if (guard.busy) return;',
  'function runSteps(codeElId, codeLines, steps, conEl, guard, onDone){\n  if (guard.busy) return;\n  if (!document.getElementById(codeElId)) return;', 'runSteps guard');

jsPart['3'] = patch(jsPart['3'],
  "function stkRender(){\n  var v = document.getElementById('stackViz');",
  "function stkRender(){\n  var v = document.getElementById('stackViz');\n  if (!v) return;", 'stkRender guard');
jsPart['3b'] = patch(jsPart['3b'],
  "function qRender(){\n  var v = document.getElementById('queueViz');",
  "function qRender(){\n  var v = document.getElementById('queueViz');\n  if (!v) return;", 'qRender guard');
jsPart['3'] = patch(jsPart['3'],
  "document.getElementById('stackPtr').textContent",
  "(document.getElementById('stackPtr')||{}).textContent", 'stackPtr guard');
jsPart['3b'] = patch(jsPart['3b'],
  "document.getElementById('queuePtr').textContent",
  "(document.getElementById('queuePtr')||{}).textContent", 'queuePtr guard');

jsPart['4'] = patch(jsPart['4'],
  "  var cap = document.getElementById('dispCap');\n  if (dispGuard.busy) return;",
  "  var cap = document.getElementById('dispCap');\n  if (!con || !cap) return;\n  if (dispGuard.busy) return;", 'dispatch guard');

jsPart['5'] = patch(jsPart['5'],
  'function loadProg(i){\n  curProg = i; curStep = 0;',
  "function loadProg(i){\n  if (!document.getElementById('traceCode')) return;\n  curProg = i; curStep = 0;", 'loadProg guard');
jsPart['5'] = patch(jsPart['5'],
  'function resetTrace(){\n  curStep = 0;',
  "function resetTrace(){\n  if (!document.getElementById('traceCode')) return;\n  curStep = 0;", 'resetTrace guard');

jsPart['6'] = patch(jsPart['6'],
  "  var box = document.getElementById('quizBox');\n  var h = '';",
  "  var box = document.getElementById('quizBox');\n  if (!box) return;\n  var h = '';", 'buildQuiz guard');
jsPart['6'] = patch(jsPart['6'],
  'function showScore(){\n  var box',
  'function showScore(){\n  if (!document.getElementById("scoreBox")) return;\n  var box', 'showScore guard');

/* ---------- 4. site map ---------- */
const SITE = [
  { id:'grade9', label:'Grade 9', np:'कक्षा ९', status:'open', subjects:[
      { slug:'c-programming',        name:'Programming Principles & Concept in C Language', short:'C Language',            np:'सी भाषामा प्रोग्रामिङका सिद्धान्त' },
      { slug:'computer-fundamentals',name:'Fundamentals of Computer and Application',       short:'Computer Fundamentals',np:'कम्प्युटरका आधारभूत कुरा' },
      { slug:'electro-system',       name:'Fundamentals of Electro-System',                 short:'Electro-System',       np:'इलेक्ट्रो–सिस्टमका आधारभूत कुरा' },
      { slug:'website-design',       name:'Website Design',                                 short:'Website Design',       np:'वेबसाइट डिजाइन' }
  ]},
  { id:'grade10', label:'Grade 10', np:'कक्षा १०', status:'open', subjects:[
      { slug:'oop-cpp',        name:'Data Structure & OOP Concept using C++',              short:'DS & OOP with C++',   np:'डाटा स्ट्रक्चर र OOP (C++)', done:true },
      { slug:'hardware',       name:'Computer Hardware, Electronics Repair & Maintenance', short:'Hardware & Repair',   np:'कम्प्युटर हार्डवेयर र मर्मत' },
      { slug:'dbms',           name:'Database Management System',                          short:'DBMS',                np:'डाटाबेस व्यवस्थापन प्रणाली' },
      { slug:'digital-design', name:'Digital Design & Microprocessor',                     short:'Digital Design',      np:'डिजिटल डिजाइन र माइक्रोप्रोसेसर' }
  ]},
  { id:'grade11', label:'Grade 11', np:'कक्षा ११', status:'soon', subjects:[] },
  { id:'grade12', label:'Grade 12', np:'कक्षा १२', status:'soon', subjects:[] }
];

/* ---------- 5. syllabus outlines for the not-yet-written subjects ---------- */
const OUTLINE = {
'grade9/c-programming':[
 {t:'Principles of Programming', np:'प्रोग्रामिङका सिद्धान्त', h:6, c:[
   'Introduction to Programming (Program, Programmer, Programming Language, Software)',
   'Categories of Programming Language',
   'Applications — Scientific Application, Business Application',
   'Program Design Tools (Algorithm and Flowchart)']},
 {t:'Fundamentals of C', np:'सी भाषाका आधारभूत कुरा', h:10, c:[
   'Introduction to C Programming',
   'Basic Program Structure (Preprocessor Directive, Header Files, Tokens, Semicolons, Comments, Identifiers, Whitespace, Escape Sequence)',
   'Variables and Keywords',
   'Character Sets, Constants and Variables',
   'Data Types and Format Specifiers',
   'Input / Output statements']},
 {t:'Control Flow Statements', np:'नियन्त्रण प्रवाह कथन', h:16, c:[
   'Operators in C (Arithmetic, Relational, Logical, Bitwise, Assignment)',
   'Decision Making Statements — if, if…else, switch',
   'Loop Statements — for, while, do-while, nested loops',
   'Jump Statements — break, continue, goto, return']},
 {t:'Functions', np:'फङ्सन', h:12, c:[
   'Introduction to Function',
   'Declaration, Definition and Calling of a Function',
   'Types of Functions — Library Function, User-Defined Function',
   'Types of Function Call — Call by Value, Call by Reference',
   'Concept of Recursive Functions',
   'Advantages of Functions']},
 {t:'Arrays & Strings', np:'एरे र स्ट्रिङ', h:10, c:[
   'Introduction to Array & String',
   'Declaration and Initialization of Array',
   'One-Dimensional Array',
   'Declaration of String',
   'String Functions — strlen(), strcpy(), strcat(), strcmp(), strrev(), strlwr(), strupr()']},
 {t:'Structure and Union', np:'स्ट्रक्चर र युनियन', h:6, c:[
   'Introduction to Structure',
   'Declaration of Structure and Structure Variable',
   'Accessing Member of Structure',
   'Introduction to Union',
   'Declaration of Union and Union Variable',
   'Accessing Member of Union']},
 {t:'Pointers', np:'पोइन्टर', h:4, c:[
   'Introduction to Pointer',
   'Declaring Pointer and Pointer Variable',
   'Referencing and Dereferencing',
   'Advantages of Pointer']}
],
'grade9/computer-fundamentals':[
 {t:'Introduction to Computer', np:'कम्प्युटरको परिचय', h:8, c:[
   'Introduction to computer', 'Characteristics of computer', 'Modern Applications of computer',
   'Classification of computers — by size, by data handling, by purpose, by model, by brand']},
 {t:'Computer Components', np:'कम्प्युटरका भागहरू', h:10, c:[
   'Introduction to Components of computer system',
   'Input Unit — Keyboard, Mouse, Joystick, OMR, OCR, BCR, MICR, Scanner, Touch Screen, Touchpad, Microphone, Digital Camera',
   'Output Unit (softcopy) — Monitors (CRT, LCD, LED/Plasma), Speaker, Projector, Headphone',
   'Output Unit (hardcopy) — Printers (impact, non-impact, 3D), Graphic plotter',
   'Concept of Memory unit',
   'Processing unit — Microprocessor: clock speed, word length, components and functions']},
 {t:'Computer Software', np:'कम्प्युटर सफ्टवेयर', h:10, c:[
   'Introduction to Computer software', 'Types of software and its features',
   'Introduction to Operating System', 'Functions and characteristics of Operating System',
   'Types of Operating System', 'User interface — CUI and GUI', 'OSS (Open Source Software)']},
 {t:'Memory / Storage Unit', np:'मेमोरी र भण्डारण', h:10, c:[
   'Memory definition', 'Types of Memory', 'Cache Memory',
   'Primary / Main memory — characteristics; RAM (SRAM, DRAM); ROM (PROM, EPROM, EEPROM)',
   'Secondary Memory — characteristics; Magnetic (Hard disk, SSD); Optical (CD/DVD, Blu-ray); Flash (Pen-drive)']},
 {t:'Internet and its Application', np:'इन्टरनेट र यसको प्रयोग', h:10, c:[
   'Introduction to Internet and its advantages', 'Requirements for Internet connection',
   'Applications — WWW, E-mail, Newsgroup, Telnet, IRC, E-commerce, Search engine, E-Governance, Remote Control']},
 {t:'Multimedia', np:'मल्टिमिडिया', h:8, c:[
   'Introduction to Multimedia', 'Components — Text, Audio, Video, Image, Animation', 'Application of Multimedia']},
 {t:'Emerging Technology', np:'उदीयमान प्रविधि', h:8, c:[
   'Introduction to Emerging Technology', 'Concept of AI',
   'Cloud Computing and distributed computing', 'Concept of IoT', 'Concept of Big data',
   'Concept of Data mining', 'Cryptography (Encryption and Decryption)',
   'Concept of VR (Virtual Reality)', 'Concept of AR (Augmented Reality)']}
],
'grade9/electro-system':[
 {t:'Introduction to Electrostatics', np:'स्थिर विद्युतको परिचय', h:9, c:[
   'Introduction to Electricity', 'History of Electricity', 'Types of Electricity — Dynamic, Static',
   'Application and Uses of electricity', 'Atom and its components (electron, proton, neutron)',
   'Atomic number, atomic weight, free electrons and electric charge',
   "Coulomb's law and its derivation", 'Electric field, potential and potential difference',
   'Electric Energy, voltage and its unit']},
 {t:'Electric Fundamentals', np:'विद्युतका आधारभूत कुरा', h:13, c:[
   'Basic electric terms — Voltage, Current, Resistance',
   'Movement of electrons in a conductor',
   'Sources of electricity — Hydro, Nuclear fission/fusion, Wind, Thermal, Solar',
   'Conventional direction of electric current and its uses',
   'Electrical resistance and its unit', 'Use and application of resistance in a circuit',
   'Classification of objects by resistance — Conductor, Semiconductor, Insulator',
   'Factors affecting the resistance']},
 {t:'Electric Circuit', np:'विद्युत परिपथ', h:13, c:[
   'Introduction to electric circuit',
   'Types — Open, Close, Leakage, Series, Parallel, Mixed circuit',
   'Resistance in series and parallel circuit', "Ohm's Law",
   "Kirchhoff's Current Law", "Kirchhoff's Voltage Law", 'Numericals']},
 {t:'Electrical Power and Theory', np:'विद्युत शक्ति र सिद्धान्त', h:6, c:[
   'Introduction to electrical power', 'Unit of electrical power and its practical concept',
   'Electrical energy, its unit and applications', 'Numericals']},
 {t:'Cell and Capacitor', np:'सेल र क्यापासिटर', h:10, c:[
   'Introduction to cell and battery', 'Types of cell — Primary, Secondary',
   'Series and Parallel connection of a cell', 'Capacitor, capacitance and its units',
   'Factors affecting capacitance', 'Characteristics of capacitance',
   'Series and parallel plate capacitor']},
 {t:'Magnetism and Electromagnetism', np:'चुम्बकत्व र विद्युत चुम्बकत्व', h:8, c:[
   'Introduction to magnet and magnetism', 'Types of Magnet — Temporary, Permanent',
   'Magnetic and non-magnetic materials',
   'Magnetic terminologies — magnetic field, field density, lines of magnetic flux, flux density',
   'Magnetic effect of current and its application', 'Principle of electromagnetism',
   "Faraday's law of electromagnetic induction"]},
 {t:'Fundamentals of Current and Phase Current', np:'करेन्ट र फेज करेन्टका आधारभूत कुरा', h:5, c:[
   'Introduction to AC and DC', 'Differences between AC and DC',
   'Frequency, Amplitude and Time', 'Difference between single phase and three phase system',
   'Uses and applications of three phase systems']}
],
'grade9/website-design':[
 {t:'Basics in Website Design', np:'वेबसाइट डिजाइनका आधारभूत कुरा', h:6, c:[
   'Brief History of Internet', 'World Wide Web (WWW)', 'Web Standards', 'Web Protocols',
   'Web Browser', 'Search Engine', 'Web Domain', 'Web Hosting']},
 {t:'Website Design Principles', np:'वेबसाइट डिजाइनका सिद्धान्त', h:4, c:[
   'Basic principles of website development', 'Phases of website development',
   'Importance of websites in the contemporary world']},
 {t:'HTML Basics', np:'HTML का आधारभूत कुरा', h:6, c:[
   'Introduction', 'HTML Documents', 'Basic Structure of an HTML document',
   'HTML Tags — Paired and Singular Tags, List of HTML Tags', 'HTML Attributes', 'HTML Comments']},
 {t:'HTML Elements', np:'HTML एलिमेन्ट', h:15, c:[
   'Headings', 'Paragraphs', 'Line Breaking', 'Horizontal Line', 'Text Formatting', 'Lists',
   'Tables and Frames', 'Hyperlinks', 'Multimedia (Image, Audio, Video)', 'Forms']},
 {t:'HTML5 Basics', np:'HTML5 का आधारभूत कुरा', h:5, c:[
   'Introduction', 'HTML5 Semantic Elements', 'HTML5 Audio and Video', 'HTML5 Canvas',
   'HTML5 SVG', 'HTML5 Drag and Drop', 'HTML5 Forms (new attributes for the input tag)']},
 {t:'Cascading Style Sheets (CSS)', np:'CSS', h:18, c:[
   'Introduction', 'Types of CSS', 'CSS Selectors',
   'Basic Properties — Font, Colors and Background, Borders, Margins and Paddings, Text, Height/Width, Position and Float, Overflow, Box Model, Navigation Bar',
   'Advanced Properties — Rounded Corners, Border Images, Text Effects, Gradients, Shadows',
   'CSS Measurement Units', 'CSS Website Layout']},
 {t:'JavaScript Fundamentals', np:'जाभास्क्रिप्टका आधारभूत कुरा', h:10, c:[
   'Introduction', 'JavaScript in Different Browsers', 'JavaScript in HTML Documents',
   'Variables and Data types',
   'HTML DOM — Introduction, Methods, Document, Elements, Node Lists',
   'Control Flow — if, if else, switch; for, while, do while',
   'Functions', 'Prompt, Confirm, Alert', 'Objects']}
],
'grade10/hardware':[
 {t:'Introduction to Electronic Devices', np:'इलेक्ट्रोनिक उपकरणको परिचय', h:10, c:[
   'Define matter, molecule and atom', 'Introduction to KCL and KVL',
   'Semiconductor Material — Doping, P-type, N-type, Majority and Minority charge carriers',
   'PN junction Formation, Forward biased and Reverse biased']},
 {t:'Introduction to Computer System', np:'कम्प्युटर प्रणालीको परिचय', h:10, c:[
   'Basic Components of a Computer System',
   'Input Unit — Keyboard, Mouse, Scanner, Digital Camera',
   'Processing unit — ALU and Control Unit',
   'Display unit — Monitor resolution, colour and refresh rate; CRT, LCD and LED']},
 {t:"Overview on System's Core", np:'प्रणालीको मुख्य भागको सिंहावलोकन', h:12, c:[
   'System BIOS — functions and operations', 'Introduction to Motherboard and form factors',
   'Peripheral Component Interconnect (PCI) local bus',
   'Power — the internal power supply and its parts',
   'Hard drives — construction and operation of a hard disk drive',
   'Partitioning, partition size and drive lettering', 'Formatting and its types']},
 {t:'Troubleshooting Techniques', np:'समस्या समाधानका तरिका', h:12, c:[
   'General troubleshooting techniques', 'Steps of troubleshooting',
   'Troubleshooting boot problems', 'Troubleshooting boot-time error messages',
   'Troubleshooting system slowdowns', 'Troubleshooting specific components']},
 {t:'Repair and Maintenance', np:'मर्मत र सम्भार', h:12, c:[
   'Preventive maintenance of the system', 'Fixing wireless network connection issues',
   'Power source and power protection', 'Failure or improper operation of video cards',
   'Image quality problems in monitors (resolution, layout)',
   'Input and output device connection issues', 'Processor power and voltage level',
   'Processor cooling', 'Cooling and ventilation',
   'Virus background', 'Virus detection, protection and prevention techniques']},
 {t:'Backup and Recovery', np:'ब्याकअप र रिकभरी', h:8, c:[
   'Introduction to Backup and Recovery', 'Backup methods, devices and media',
   'Backup scheduling and media rotation systems', 'Introduction to RAID', 'Recovery Techniques']}
],
'grade10/dbms':[
 {t:'Introduction to Database System', np:'डाटाबेस प्रणालीको परिचय', h:6, c:[
   'Concept of Data, Information, Database and Database Management System',
   'Limitations of the File System', 'Advantages and Disadvantages of a Database System',
   'Application of Database System', 'Types of Database Users',
   'DBMS Architecture', 'Database Model', 'Database Schema']},
 {t:'Entity Relationship Model (ER-Model)', np:'ई–आर मोडेल', h:10, c:[
   'Introduction to ER-Model',
   'Components — Entity, Weak Entity, Entity Set',
   'Attributes and Types of Attributes', 'Relationship and Types of Relationship',
   'Mapping Cardinalities', 'Keys in DBMS']},
 {t:'Relational Model', np:'रिलेसनल मोडेल', h:10, c:[
   'Introduction to Relational Model',
   'Key Concepts — Tables; Tuple, Cardinality and Column; Attribute, Degree and Domain; Relational Instance; Relational Schema; Relational Key',
   'Properties of Relations', 'Mapping ER-Model to Relational Model']},
 {t:'SQL (Structured Query Language) Overview', np:'SQL को सिंहावलोकन', h:14, c:[
   'Introduction',
   'DDL — CREATE, ALTER, DROP, RENAME',
   'DML — SELECT, INSERT, UPDATE, DELETE',
   'DCL — GRANT, REVOKE',
   'SQL Clauses — WHERE, AND, OR, WITH, ORDER BY',
   'SQL Joins — Inner, Natural, Left Outer, Right Outer, Full Outer',
   'SQL View']},
 {t:'Relational Database Design', np:'रिलेसनल डाटाबेस डिजाइन', h:8, c:[
   'Functional Dependency and its Types',
   'Normalization — definition', 'Normal Forms — 1NF, 2NF, 3NF']},
 {t:'Database Transaction', np:'डाटाबेस ट्रान्ज्याक्सन', h:8, c:[
   'Introduction to Transaction', 'Concurrency in Transaction',
   'ACID properties', 'States of a Transaction']},
 {t:'Database Backup, Recovery and Security', np:'ब्याकअप, रिकभरी र सुरक्षा', h:8, c:[
   'Introduction to Backup', 'Types of Backup — Physical, Logical',
   'Reasons for Database Failure', 'Methods of Database Backup',
   'Concept of Recovery, Redo / Undo',
   'Introduction to Database Security', 'Common Threats in a Database']}
],
'grade10/digital-design':[
 {t:'Number System and Binary Arithmetic Operations', np:'संख्या प्रणाली र बाइनरी गणित', h:12, c:[
   'Numbering concept',
   'Types of numbering system — Decimal, Binary, Octal, Hexadecimal',
   'Decimal integer to binary and binary to decimal conversion',
   'Decimal fractions to binary conversion',
   'Octal to decimal and decimal to octal conversion',
   "1's complement", "2's complement",
   'Binary addition', 'Binary subtraction', 'Binary multiplication']},
 {t:'Concept of Logic Gates', np:'लजिक गेटको अवधारणा', h:14, c:[
   'Notations', 'Concept of gate and truth table',
   'Inverter, OR gate, AND gate, NOR gate, NAND gate',
   'Universal gates', "De-Morgan's theorem"]},
 {t:'Boolean Algebra and Karnaugh Map', np:'बुलियन बीजगणित र के–म्याप', h:10, c:[
   'Boolean relationships and simplification',
   'Sum of Products (SOP)', 'Product of Sums (POS)', 'Algebraic simplification']},
 {t:'Binary Arithmetic and Combinational Logic', np:'बाइनरी गणित र कम्बिनेसनल लजिक', h:13, c:[
   'Half adder', 'Binary adder', 'Half subtractor', 'Full Adder', 'Full Subtractor',
   'Code converters', 'Decoder', 'Encoder', 'Multiplexer', 'Demultiplexer']},
 {t:'Introduction to Microprocessor and its Components', np:'माइक्रोप्रोसेसर र यसका भाग', h:15, c:[
   'Definition of Microprocessor and its applications', 'Types of Microprocessor',
   'Input / Output', 'Memory', 'Processing unit',
   'Arithmetic and logical unit, control unit, Registers',
   '8085 bus structure and internal architecture', 'Pin configuration of 8085',
   'Description of each block — Registers, flags, data and address bus, timing and control with interrupts',
   'Introduction to Addressing modes']}
]
};

/* the finished C++ subject, page by page */
const CPP_PAGES = [
  { file:'unit1.html', n:'1', title:'Basic Introduction to Data Structure', np:'डाटा स्ट्रक्चरको आधारभूत परिचय', hrs:20, marks:15, sec:['u1'], js:['sim-stackqueue.js'] },
  { file:'unit2.html', n:'2', title:'Concept of OOP using C++',            np:'OOP को अवधारणा (C++)',              hrs:10, marks:14, sec:['u2'], js:['snippets.js'] },
  { file:'unit3.html', n:'3', title:'Class and Object',                    np:'क्लास र अब्जेक्ट',                   hrs:7,  marks:2,  sec:['u3'], js:['snippets.js'] },
  { file:'unit4.html', n:'4', title:'Abstraction and Encapsulation',       np:'एब्स्ट्र्याक्सन र इनक्याप्सुलेसन',      hrs:7,  marks:5,  sec:['u4'], js:['snippets.js'] },
  { file:'unit5.html', n:'5', title:'Inheritance',                         np:'इनहेरिटेन्स',                        hrs:10, marks:7,  sec:['u5'], js:['snippets.js'] },
  { file:'unit6.html', n:'6', title:'Polymorphism',                        np:'पोलिमर्फिज्म',                       hrs:10, marks:7,  sec:['u6'], js:['snippets.js','sim-dispatch.js'] },
  { file:'trace.html', n:'▶', title:'Trace a Full Program',                np:'पूरा प्रोग्राम ट्रेस गर्नुहोस्',        sec:['trace'], js:['trace.js'] },
  { file:'tables.html',n:'≠', title:'Comparison Tables & Exam Terms',      np:'तुलनात्मक तालिका र परीक्षा शब्दावली', sec:['tables','terms'], js:[] },
  { file:'quiz.html',  n:'?', title:'Self-Check Quiz',                     np:'आफैं जाँच्ने क्विज',                  sec:['quiz'], js:['quiz.js'] }
];

module.exports = { OUT, w, baseCss, jsPart, SEC, HERO, SITE, OUTLINE, CPP_PAGES };
