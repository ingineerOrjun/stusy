/* =========================================================
   5. TRACE A FULL PROGRAM
   ========================================================= */
var PROGS = [
{
  title: 'Program 1 — Class, Object, Constructor and Destructor',
  desc: 'Two Student objects are created. Watch when the constructor runs, when display() runs, and the ORDER in which the destructors run at the end.',
  descNp: 'दुईवटा Student अब्जेक्ट बन्छन्। कन्स्ट्रक्टर कहिले चल्छ, display() कहिले चल्छ, र अन्त्यमा डिस्ट्रक्टर कुन क्रममा चल्छ — ध्यान दिनुहोस्।',
  code: [
'#include <iostream>',
'#include <string>',
'using namespace std;',
'',
'class Student {',
'private:',
'    string name;',
'    int roll;',
'public:',
'    Student(string n, int r) {          // constructor',
'        name = n;',
'        roll = r;',
'        cout << "Constructor called for " << name << endl;',
'    }',
'    void display() {',
'        cout << "Name: " << name << ", Roll: " << roll << endl;',
'    }',
'    ~Student() {                        // destructor',
'        cout << "Destructor called for " << name << endl;',
'    }',
'};',
'',
'int main() {',
'    Student s1("Ram", 15);',
'    Student s2("Sita", 16);',
'    s1.display();',
'    s2.display();',
'    return 0;',
'}'
  ],
  steps: [
{line:23, en:'The program starts. Execution always begins at main().',
          np:'प्रोग्राम सुरु भयो। सधैं main() बाटै चल्न थाल्छ।'},
{line:24, en:'Object s1 is being created with "Ram" and 15. Creating an object automatically calls the constructor.',
          np:'"Ram" र 15 सहित अब्जेक्ट s1 बन्दैछ। अब्जेक्ट बन्ने बित्तिकै कन्स्ट्रक्टर आफैं बोलिन्छ।'},
{line:10, en:'Jump into the constructor. Here n = "Ram" and r = 15.',
          np:'कन्स्ट्रक्टर भित्र पस्यो। यहाँ n = "Ram" र r = 15 छ।'},
{line:11, en:'The data member name gets the value "Ram".',
          np:'डाटा मेम्बर name ले "Ram" मान पायो।'},
{line:12, en:'The data member roll gets the value 15.',
          np:'डाटा मेम्बर roll ले 15 मान पायो।'},
{line:13, en:'This cout runs, so the first line of output appears now.',
          np:'यो cout चल्यो, त्यसैले पहिलो आउटपुट अहिले देखियो।',
          out:'Constructor called for Ram'},
{line:14, en:'The constructor is finished. Object s1 is now ready in memory. Control returns to main().',
          np:'कन्स्ट्रक्टर सकियो। अब्जेक्ट s1 मेमोरीमा तयार भयो। नियन्त्रण main() मा फर्कियो।'},
{line:25, en:'Object s2 is being created with "Sita" and 16. The constructor is called again.',
          np:'"Sita" र 16 सहित अब्जेक्ट s2 बन्दैछ। कन्स्ट्रक्टर फेरि बोलियो।'},
{line:10, en:'Inside the constructor again. This time n = "Sita" and r = 16.',
          np:'फेरि कन्स्ट्रक्टर भित्र। यस पटक n = "Sita" र r = 16।'},
{line:11, en:'s2 has its OWN separate copy of name. It becomes "Sita". s1 is not affected.',
          np:'s2 सँग आफ्नै छुट्टै name छ। यो "Sita" भयो। s1 मा कुनै असर पर्दैन।'},
{line:12, en:'roll of s2 becomes 16.',
          np:'s2 को roll 16 भयो।'},
{line:13, en:'The second line of output is printed.',
          np:'दोस्रो आउटपुट लाइन छापियो।',
          out:'Constructor called for Sita'},
{line:14, en:'Constructor finished. Both objects now exist.',
          np:'कन्स्ट्रक्टर सकियो। अब दुवै अब्जेक्ट अस्तित्वमा छन्।'},
{line:26, en:'s1.display() is called. The dot operator picks the object s1.',
          np:'s1.display() बोलाइयो। डट अपरेटरले s1 अब्जेक्ट छान्यो।'},
{line:16, en:'display() runs using s1 data, so it prints Ram and 15.',
          np:'display() ले s1 कै डाटा प्रयोग गर्‍यो, त्यसैले Ram र 15 छाप्यो।',
          out:'Name: Ram, Roll: 15'},
{line:17, en:'display() ends. Back in main().',
          np:'display() सकियो। फेरि main() मा।'},
{line:27, en:'s2.display() is called. The SAME function, but a different object.',
          np:'s2.display() बोलाइयो। उही फङ्सन, तर फरक अब्जेक्ट।'},
{line:16, en:'Now display() uses s2 data, so it prints Sita and 16.',
          np:'अब display() ले s2 को डाटा प्रयोग गर्‍यो, त्यसैले Sita र 16 छाप्यो।',
          out:'Name: Sita, Roll: 16'},
{line:17, en:'display() ends again.',
          np:'display() फेरि सकियो।'},
{line:28, en:'return 0; main() is ending, so every local object must now be destroyed.',
          np:'return 0; main() सकिँदैछ, त्यसैले सबै लोकल अब्जेक्ट अब नष्ट हुनुपर्छ।'},
{line:18, en:'IMPORTANT: objects are destroyed in REVERSE order of creation. s2 was made last, so s2 is destroyed FIRST.',
          np:'महत्त्वपूर्ण: अब्जेक्ट बनेको उल्टो क्रममा नष्ट हुन्छन्। s2 पछि बनेको थियो, त्यसैले s2 नै पहिले नष्ट हुन्छ।'},
{line:19, en:'The destructor of s2 prints its message.',
          np:'s2 को डिस्ट्रक्टरले आफ्नो सन्देश छाप्यो।',
          out:'Destructor called for Sita'},
{line:18, en:'Now the destructor of s1 runs — the object created first is destroyed last.',
          np:'अब s1 को डिस्ट्रक्टर चल्यो — पहिले बनेको अब्जेक्ट अन्तिममा नष्ट हुन्छ।'},
{line:19, en:'The destructor of s1 prints its message.',
          np:'s1 को डिस्ट्रक्टरले आफ्नो सन्देश छाप्यो।',
          out:'Destructor called for Ram'},
{line:29, en:'The program ends. Notice: you never called the constructor or destructor yourself — C++ called both automatically.',
          np:'प्रोग्राम सकियो। हेर्नुहोस्: तपाईंले कन्स्ट्रक्टर वा डिस्ट्रक्टर हातले बोलाउनु परेन — C++ ले आफैं बोलायो।'}
  ]
},
{
  title: 'Program 2 — Multilevel Inheritance (Animal → Dog → Puppy)',
  desc: 'Only ONE object is created, but THREE constructors run. Watch the order carefully — this exact question is asked very often.',
  descNp: 'एउटा मात्र अब्जेक्ट बन्छ, तर तीनवटा कन्स्ट्रक्टर चल्छन्। क्रम राम्ररी हेर्नुहोस् — यही प्रश्न परीक्षामा बारम्बार सोधिन्छ।',
  code: [
'#include <iostream>',
'using namespace std;',
'',
'class Animal {                      // base class',
'public:',
'    Animal() {',
'        cout << "Animal constructor" << endl;',
'    }',
'    void eat() {',
'        cout << "I can eat" << endl;',
'    }',
'};',
'',
'class Dog : public Animal {         // derived from Animal',
'public:',
'    Dog() {',
'        cout << "Dog constructor" << endl;',
'    }',
'    void bark() {',
'        cout << "I can bark" << endl;',
'    }',
'};',
'',
'class Puppy : public Dog {          // derived from Dog',
'public:',
'    Puppy() {',
'        cout << "Puppy constructor" << endl;',
'    }',
'    void weep() {',
'        cout << "I can weep" << endl;',
'    }',
'};',
'',
'int main() {',
'    Puppy p;',
'    p.eat();',
'    p.bark();',
'    p.weep();',
'    return 0;',
'}'
  ],
  steps: [
{line:34, en:'The program starts at main().',
          np:'प्रोग्राम main() बाट सुरु भयो।'},
{line:35, en:'ONE object p of class Puppy is created. But Puppy is built on top of Dog, and Dog is built on top of Animal.',
          np:'Puppy क्लासको एउटा अब्जेक्ट p बन्यो। तर Puppy, Dog माथि बनेको छ र Dog, Animal माथि बनेको छ।'},
{line:6,  en:'RULE: the constructor of the TOP-MOST base class runs first. So Animal() runs first.',
          np:'नियम: सबैभन्दा माथिको base क्लासको कन्स्ट्रक्टर पहिले चल्छ। त्यसैले Animal() पहिले चल्यो।'},
{line:7,  en:'Animal constructor prints its line.',
          np:'Animal कन्स्ट्रक्टरले आफ्नो लाइन छाप्यो।',
          out:'Animal constructor'},
{line:16, en:'Next the middle class constructor Dog() runs.',
          np:'त्यसपछि बीचको क्लास Dog() को कन्स्ट्रक्टर चल्यो।'},
{line:17, en:'Dog constructor prints its line.',
          np:'Dog कन्स्ट्रक्टरले आफ्नो लाइन छाप्यो।',
          out:'Dog constructor'},
{line:26, en:'Last of all, the constructor of the class we actually created — Puppy() — runs.',
          np:'सबैभन्दा अन्त्यमा, हामीले साँच्चै बनाएको क्लास Puppy() को कन्स्ट्रक्टर चल्यो।'},
{line:27, en:'Puppy constructor prints its line. The object p is now fully built.',
          np:'Puppy कन्स्ट्रक्टरले आफ्नो लाइन छाप्यो। अब अब्जेक्ट p पूरै तयार भयो।',
          out:'Puppy constructor'},
{line:36, en:'p.eat() is called. Puppy has no eat() of its own, so C++ looks up to Dog, then up to Animal.',
          np:'p.eat() बोलाइयो। Puppy सँग आफ्नै eat() छैन, त्यसैले C++ माथि Dog मा, अनि Animal मा खोज्छ।'},
{line:10, en:'eat() is found in Animal and runs. This is inheritance working — code reused without rewriting.',
          np:'eat() Animal मा भेटियो र चल्यो। यही इनहेरिटेन्सको काम हो — नलेखीकनै कोड पुनः प्रयोग।',
          out:'I can eat'},
{line:37, en:'p.bark() is called. It is not in Puppy, so C++ looks up to Dog.',
          np:'p.bark() बोलाइयो। Puppy मा छैन, त्यसैले C++ माथि Dog मा हेर्छ।'},
{line:20, en:'bark() is found in Dog and runs.',
          np:'bark() Dog मा भेटियो र चल्यो।',
          out:'I can bark'},
{line:38, en:'p.weep() is called. This one belongs to Puppy itself.',
          np:'p.weep() बोलाइयो। यो चाहिँ Puppy कै आफ्नो हो।'},
{line:30, en:'weep() runs from Puppy.',
          np:'Puppy बाट weep() चल्यो।',
          out:'I can weep'},
{line:39, en:'return 0; the program is ending. (Destructors, if written, would run in the reverse order: Puppy, then Dog, then Animal.)',
          np:'return 0; प्रोग्राम सकिँदैछ। (डिस्ट्रक्टर लेखिएको भए उल्टो क्रममा चल्थ्यो: Puppy, अनि Dog, अनि Animal।)'},
{line:40, en:'Program ends. One object, three constructors, and three functions coming from three different classes.',
          np:'प्रोग्राम सकियो। एउटा अब्जेक्ट, तीन कन्स्ट्रक्टर, र तीन फरक क्लासबाट आएका तीन फङ्सन।'}
  ]
},
{
  title: 'Program 3 — Run-time Polymorphism using a virtual function',
  desc: 'The SAME pointer and the SAME call p->draw() give two different outputs. Watch how C++ decides at run time by looking at the object, not the pointer.',
  descNp: 'उही पोइन्टर र उही कल p->draw() ले दुई फरक आउटपुट दिन्छ। C++ ले पोइन्टर होइन, अब्जेक्ट हेरेर चल्दै गर्दा कसरी निर्णय गर्छ — हेर्नुहोस्।',
  code: [
'#include <iostream>',
'using namespace std;',
'',
'class Shape {',
'public:',
'    virtual void draw() {           // virtual = late binding',
'        cout << "Drawing a Shape" << endl;',
'    }',
'};',
'',
'class Circle : public Shape {',
'public:',
'    void draw() {                   // overriding',
'        cout << "Drawing a Circle" << endl;',
'    }',
'};',
'',
'class Square : public Shape {',
'public:',
'    void draw() {                   // overriding',
'        cout << "Drawing a Square" << endl;',
'    }',
'};',
'',
'int main() {',
'    Shape *p;                       // base class pointer',
'    Circle c;',
'    Square s;',
'',
'    p = &c;',
'    p->draw();',
'',
'    p = &s;',
'    p->draw();',
'',
'    return 0;',
'}'
  ],
  steps: [
{line:25, en:'The program starts at main().',
          np:'प्रोग्राम main() बाट सुरु भयो।'},
{line:26, en:'p is declared as a pointer to Shape. It is empty right now — it points to nothing.',
          np:'p लाई Shape को पोइन्टरका रूपमा घोषणा गरियो। अहिले यो खाली छ — कतै देखाउँदैन।'},
{line:27, en:'A Circle object c is created in memory.',
          np:'मेमोरीमा Circle अब्जेक्ट c बन्यो।'},
{line:28, en:'A Square object s is created in memory.',
          np:'मेमोरीमा Square अब्जेक्ट s बन्यो।'},
{line:30, en:'p = &c;  The Shape pointer now stores the ADDRESS of the Circle object. This is allowed because Circle IS-A Shape.',
          np:'p = &c;  अब Shape पोइन्टरसँग Circle अब्जेक्टको ठेगाना छ। Circle पनि एक प्रकारको Shape भएकाले यो मिल्छ।'},
{line:31, en:'p->draw() is called. The arrow operator is used because p is a pointer.',
          np:'p->draw() बोलाइयो। p पोइन्टर भएकाले एरो अपरेटर प्रयोग गरियो।'},
{line:6,  en:'draw() is marked VIRTUAL in the base class. So C++ does NOT decide now — it waits and checks the real object at run time.',
          np:'base क्लासमा draw() लाई VIRTUAL लेखिएको छ। त्यसैले C++ ले अहिले निर्णय गर्दैन — चल्दै गर्दा वास्तविक अब्जेक्ट हेर्छ।'},
{line:13, en:'The real object is a Circle, so the OVERRIDDEN Circle::draw() is chosen — not the base one.',
          np:'वास्तविक अब्जेक्ट Circle हो, त्यसैले override गरिएको Circle::draw() छानियो — base को होइन।'},
{line:14, en:'Circle::draw() runs and prints its line.',
          np:'Circle::draw() चल्यो र आफ्नो लाइन छाप्यो।',
          out:'Drawing a Circle'},
{line:33, en:'p = &s;  The SAME pointer p now stores the address of the Square object instead.',
          np:'p = &s;  उही पोइन्टर p सँग अब Square अब्जेक्टको ठेगाना छ।'},
{line:34, en:'p->draw() is called again — exactly the same line of code as before.',
          np:'p->draw() फेरि बोलाइयो — ठ्याक्कै पहिलेकै लाइन।'},
{line:6,  en:'Again C++ checks at run time which object p is really pointing to.',
          np:'फेरि C++ ले चल्दै गर्दा p ले वास्तवमा कुन अब्जेक्ट देखाएको छ भनेर जाँच्यो।'},
{line:20, en:'This time the object is a Square, so Square::draw() is chosen.',
          np:'यस पटक अब्जेक्ट Square हो, त्यसैले Square::draw() छानियो।'},
{line:21, en:'Square::draw() runs and prints a DIFFERENT line — from the same call.',
          np:'Square::draw() चल्यो र उही कलबाट फरक लाइन छाप्यो।',
          out:'Drawing a Square'},
{line:35, en:'return 0; the program is ending.',
          np:'return 0; प्रोग्राम सकिँदैछ।'},
{line:6,  en:'EXAM POINT: if you delete the word "virtual" on this line, BOTH calls would print "Drawing a Shape", because C++ would then decide by the POINTER TYPE at compile time instead.',
          np:'परीक्षा बुँदा: यो लाइनबाट "virtual" शब्द हटाए दुवै कलले "Drawing a Shape" छाप्थ्यो, किनकि तब C++ ले पोइन्टरको प्रकार हेरेर कम्पाइल गर्दै निर्णय गर्थ्यो।'},
{line:36, en:'Program ends. One call, two outputs — that is run-time polymorphism.',
          np:'प्रोग्राम सकियो। एउटै कल, दुई आउटपुट — यही run-time polymorphism हो।'}
  ]
}
];

var curProg = 0, curStep = 0;

function loadProg(i){
  if (!document.getElementById('traceCode')) return;
  curProg = i; curStep = 0;
  for (var k = 0; k < PROGS.length; k++){
    var b = document.getElementById('pgBtn' + k);
    if (b) b.className = (k === i ? 'primary' : '');
  }
  var P = PROGS[i];
  document.getElementById('progTitle').textContent  = P.title;
  document.getElementById('progDesc').textContent   = P.desc;
  document.getElementById('progDescNp').textContent = P.descNp;
  resetTrace();
}

function resetTrace(){
  if (!document.getElementById('traceCode')) return;
  curStep = 0;
  var P = PROGS[curProg];
  renderCode(document.getElementById('traceCode'), P.code, 0);
  conClear(document.getElementById('traceCon'));
  conLine(document.getElementById('traceCon'), '(console is empty — nothing has been printed yet)', 'muted');
  document.getElementById('traceCapEn').innerHTML = 'Press <b>Next &#9656;</b> to run the first line.';
  document.getElementById('traceCapNp').innerHTML = 'पहिलो लाइन चलाउन <b>Next &#9656;</b> थिच्नुहोस्।';
  updateBar();
}

function stepTrace(dir){
  var P = PROGS[curProg];
  var n = curStep + dir;
  if (n < 0 || n > P.steps.length) return;
  curStep = n;
  if (curStep === 0){ resetTrace(); return; }

  renderCode(document.getElementById('traceCode'), P.code, P.steps[curStep - 1].line);

  /* rebuild console from step 1 up to the current step (so Prev works correctly) */
  var con = document.getElementById('traceCon');
  conClear(con);
  var any = false;
  for (var i = 0; i < curStep; i++){
    if (P.steps[i].out){ conLine(con, P.steps[i].out); any = true; }
  }
  if (!any) conLine(con, '(console is empty — nothing has been printed yet)', 'muted');

  var s = P.steps[curStep - 1];
  document.getElementById('traceCapEn').innerHTML =
    '<b>Line ' + s.line + ':</b> ' + s.en + (s.out ? ' <span style="color:var(--green)">Output: ' + s.out + '</span>' : '');
  document.getElementById('traceCapNp').innerHTML =
    '<b>लाइन ' + s.line + ':</b> ' + s.np;
  updateBar();
}

function updateBar(){
  var P = PROGS[curProg];
  document.getElementById('stepLbl').textContent = 'step ' + curStep + ' / ' + P.steps.length;
  document.getElementById('stepFill').style.width = (curStep / P.steps.length * 100) + '%';
  document.getElementById('btnPrev').disabled = (curStep === 0);
  document.getElementById('btnNext').disabled = (curStep === P.steps.length);
}

loadProg(0);

