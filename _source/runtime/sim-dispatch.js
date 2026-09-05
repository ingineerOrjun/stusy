/* =========================================================
   4. SIMULATOR 2 — WHICH FUNCTION RUNS?
   ========================================================= */
var DISP_CODE = [
'class Shape {',
'public:',
'    void area(int s) {                  // version A - 1 argument',
'        cout << "Square area = " << s*s << endl;',
'    }',
'    void area(int l, int b) {           // version B - 2 arguments',
'        cout << "Rect area = " << l*b << endl;',
'    }',
'    virtual void show() {               // virtual = decide at RUN time',
'        cout << "I am a Shape" << endl;',
'    }',
'};',
'',
'class Circle : public Shape {',
'public:',
'    void show() {                       // overriding',
'        cout << "I am a Circle" << endl;',
'    }',
'};',
'',
'int main() {',
'    Shape s;   Circle c;',
'    Shape *p;                           // base class pointer',
'    // press a button above',
'}'
];

var dispGuard = { busy:false };

var DISP = {
  ol1: {
    steps: [
      {line:22, en:'The call s.area(5) has ONE argument.',                np:'s.area(5) मा एउटा मात्र आर्गुमेन्ट छ।'},
      {line:3,  en:'Compiler compares: version A takes 1 int. It MATCHES.', np:'कम्पाइलरले तुलना गर्‍यो: version A ले १ int लिन्छ। मिल्यो।'},
      {line:6,  en:'Version B takes 2 ints. It does not match — rejected.', np:'version B ले २ int लिन्छ। मिलेन — छाडियो।'},
      {line:4,  en:'Version A runs: 5 * 5 = 25.',                          np:'version A चल्यो: ५ × ५ = २५।', out:'Square area = 25'}
    ],
    en:'This is FUNCTION OVERLOADING. The compiler chose by counting the arguments, before the program ran. This is COMPILE-TIME (static) polymorphism.',
    np:'यो FUNCTION OVERLOADING हो। कम्पाइलरले आर्गुमेन्ट गनेर, प्रोग्राम चल्नु अघि नै छान्यो। यसैलाई COMPILE-TIME polymorphism भनिन्छ।'
  },
  ol2: {
    steps: [
      {line:22, en:'The call s.area(4, 6) has TWO arguments.',             np:'s.area(4, 6) मा दुई आर्गुमेन्ट छन्।'},
      {line:3,  en:'Version A takes 1 int. Does not match — rejected.',    np:'version A ले १ int लिन्छ। मिलेन — छाडियो।'},
      {line:6,  en:'Version B takes 2 ints. It MATCHES.',                  np:'version B ले २ int लिन्छ। मिल्यो।'},
      {line:7,  en:'Version B runs: 4 * 6 = 24.',                          np:'version B चल्यो: ४ × ६ = २४।', out:'Rect area = 24'}
    ],
    en:'Same function NAME area(), different WORK — chosen only by the arguments. Overloading needs no inheritance and no pointer.',
    np:'फङ्सनको नाम उही area(), तर काम फरक — आर्गुमेन्टले मात्र छान्छ। Overloading लाई inheritance वा pointer चाहिँदैन।'
  },
  rt1: {
    steps: [
      {line:23, en:'p is a Shape pointer.',                                       np:'p एउटा Shape पोइन्टर हो।'},
      {line:22, en:'p = &s;  →  p now holds the address of the Shape object s.',  np:'p = &s;  →  अब p सँग Shape अब्जेक्ट s को ठेगाना छ।'},
      {line:9,  en:'show() is VIRTUAL, so C++ waits until run time to decide.',   np:'show() virtual भएकाले C++ ले चल्दै गर्दा मात्र निर्णय गर्छ।'},
      {line:10, en:'p points to a Shape, so Shape::show() runs.',                 np:'p ले Shape देखाएकाले Shape::show() चल्यो।', out:'I am a Shape'}
    ],
    en:'The pointer type is Shape and the object is also a Shape, so the base version runs.',
    np:'पोइन्टर पनि Shape, अब्जेक्ट पनि Shape — त्यसैले base कै संस्करण चल्यो।'
  },
  rt2: {
    steps: [
      {line:22, en:'p = &c;  →  the SAME pointer now holds the address of the Circle object c.', np:'p = &c;  →  उही पोइन्टरसँग अब Circle अब्जेक्ट c को ठेगाना छ।'},
      {line:9,  en:'show() is VIRTUAL. C++ looks at the OBJECT, not the pointer type.',          np:'show() virtual छ। C++ ले पोइन्टरको प्रकार होइन, अब्जेक्ट हेर्छ।'},
      {line:16, en:'The object is a Circle, so the OVERRIDDEN Circle::show() is chosen.',        np:'अब्जेक्ट Circle भएकाले override गरिएको Circle::show() छानियो।'},
      {line:17, en:'Circle::show() runs.',                                                       np:'Circle::show() चल्यो।', out:'I am a Circle'}
    ],
    en:'This is RUN-TIME polymorphism. Same pointer, same call p->show(), different output — because virtual makes C++ look at the actual object. Remove "virtual" from line 9 and this would print "I am a Shape" instead.',
    np:'यो RUN-TIME polymorphism हो। पोइन्टर उही, कल उही p->show(), तर आउटपुट फरक — किनकि virtual ले C++ लाई वास्तविक अब्जेक्ट हेर्न लगाउँछ। लाइन ९ बाट "virtual" हटाए यसले "I am a Shape" छाप्थ्यो।'
  }
};

function dispatch(key){
  var con = document.getElementById('dispCon');
  var cap = document.getElementById('dispCap');
  if (!con || !cap) return;
  if (dispGuard.busy) return;
  conClear(con); cap.style.display = 'none';
  if (!key){
    renderCode(document.getElementById('dispCode'), DISP_CODE, 0);
    conLine(con, 'Reset. Click a call above to see how C++ decides which function runs.');
    conLine(con, 'रिसेट भयो। माथिको कुनै बटन थिच्नुहोस् — C++ ले कुन फङ्सन छान्छ हेर्न।', 'np');
    return;
  }
  var d = DISP[key];
  runSteps('dispCode', DISP_CODE, d.steps, con, dispGuard, function(){
    document.getElementById('dispCapEn').innerHTML = d.en;
    document.getElementById('dispCapNp').innerHTML = d.np;
    cap.style.display = 'block';
  });
}
dispatch(null);


/* ---- registration ---- (behaviour above unchanged) */
if (typeof SimulationService !== 'undefined') {
  SimulationService.register({
    id: 'oop.dispatch', subject: 'grade10/oop-cpp', unit: 'u6',
    title: { en: 'Which function runs?', ne: 'कुन फङ्सन चल्छ?' },
    mounts: function(){ return !!document.getElementById('dispCode'); },
    reset:  function(){ dispatch(null); },
    controls: [
      { id: 'ol1', label: { en: 'area(5)',        ne: 'area(5)' } },
      { id: 'ol2', label: { en: 'area(4, 6)',     ne: 'area(4, 6)' } },
      { id: 'rt1', label: { en: 'p = &s; show()', ne: 'p = &s; show()' } },
      { id: 'rt2', label: { en: 'p = &c; show()', ne: 'p = &c; show()' } }
    ]
  });
}
