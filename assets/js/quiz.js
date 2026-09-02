/* =========================================================
   6. QUIZ
   ========================================================= */
var QUIZ = [
{q:'Which data structure follows the LIFO (Last In, First Out) principle?',
 o:['Queue','Stack','Tree','Graph'], a:1,
 e:'A stack inserts and deletes at only one end called the top, so the last value pushed is the first one popped.',
 n:'स्ट्याकले एउटै छेउ (top) बाट राख्छ र झिक्छ, त्यसैले अन्तिममा हालेको पहिले निस्कन्छ।'},

{q:'If no access specifier is written inside a C++ class, the members are by default:',
 o:['public','protected','private','static'], a:2,
 e:'Members of a class are private by default. (In a struct they are public by default.)',
 n:'क्लासका मेम्बर पूर्वनिर्धारित रूपमा private हुन्छन्। (struct मा चाहिँ public हुन्छन्।)'},

{q:'Which of the following is NOT a linear data structure?',
 o:['Array','Stack','Queue','Tree'], a:3,
 e:'A tree is non-linear because it is hierarchical — one node can connect to many child nodes.',
 n:'ट्री अरेखीय हो किनकि यो तह–तह मिलेको हुन्छ — एउटा नोड धेरै सन्तानसँग जोडिन सक्छ।'},

{q:'A constructor in C++ has:',
 o:['return type void','the same return type as the class','no return type at all','int as its return type'], a:2,
 e:'A constructor has no return type — not even void. Its name must exactly match the class name.',
 n:'कन्स्ट्रक्टरको return type हुँदैन — void पनि होइन। नाम क्लासकै नामसँग ठ्याक्कै मिल्नुपर्छ।'},

{q:'Which symbol is written before a destructor name?',
 o:['#','&','~','::'], a:2,
 e:'A destructor is written as ~ClassName(). The tilde (~) marks it as a destructor.',
 n:'डिस्ट्रक्टर ~ClassName() भनेर लेखिन्छ। टिल्ड (~) ले यो डिस्ट्रक्टर हो भन्ने जनाउँछ।'},

{q:'Function overloading is an example of which type of polymorphism?',
 o:['Run-time polymorphism','Compile-time polymorphism','Dynamic binding','Late binding'], a:1,
 e:'In overloading the compiler picks the correct function from the arguments before the program runs, so it is compile-time (static) polymorphism.',
 n:'Overloading मा कम्पाइलरले आर्गुमेन्ट हेरेर प्रोग्राम चल्नु अघि नै सही फङ्सन छान्छ, त्यसैले यो compile-time polymorphism हो।'},

{q:'Function overriding is possible only when there is:',
 o:['operator overloading','inheritance','a friend function','a static member'], a:1,
 e:'Overriding means a derived class redefines a base class function, so a base and derived class — that is, inheritance — must exist.',
 n:'Overriding मा derived क्लासले base क्लासको फङ्सन पुनः लेख्छ, त्यसैले base र derived क्लास — अर्थात् inheritance — हुनैपर्छ।'},

{q:'In multilevel inheritance Animal → Dog → Puppy, when a Puppy object is created, which constructor runs FIRST?',
 o:['Puppy constructor','Dog constructor','Animal constructor','All three run at the same time'], a:2,
 e:'Base class constructors always run before derived ones, starting from the top-most base. So the order is Animal, then Dog, then Puppy.',
 n:'Base क्लासको कन्स्ट्रक्टर सधैं derived भन्दा पहिले चल्छ, सबैभन्दा माथिबाट सुरु हुँदै। क्रम: Animal → Dog → Puppy।'},

{q:'Which operator is used to define a member function outside its class?',
 o:['Dot operator (.)','Arrow operator (->)','Scope resolution operator (::)','Insertion operator (<<)'], a:2,
 e:'The scope resolution operator :: tells the compiler which class the function belongs to, e.g. void Student::display().',
 n:'Scope resolution operator :: ले फङ्सन कुन क्लासको हो भनेर कम्पाइलरलाई बताउँछ, जस्तै void Student::display()।'},

{q:'A collection of related records of the same entity is called a:',
 o:['Field','Record','File','Attribute'], a:2,
 e:'Fields make a record, and many related records together make a file.',
 n:'फिल्डहरू मिलेर रेकर्ड बन्छ, र धेरै रेकर्ड मिलेर फाइल बन्छ।'},

{q:'Which keyword makes run-time polymorphism possible in C++?',
 o:['static','friend','virtual','inline'], a:2,
 e:'A virtual function tells C++ to decide at run time, by looking at the actual object the base pointer points to.',
 n:'virtual फङ्सनले C++ लाई चल्दै गर्दा, base पोइन्टरले देखाएको वास्तविक अब्जेक्ट हेरेर निर्णय गर्न लगाउँछ।'},

{q:'Which statement about a class and an object is TRUE?',
 o:['A class takes memory, an object does not','An object takes memory, a class does not','Both take memory','Neither takes memory'], a:1,
 e:'A class is only a blueprint and takes no memory. Memory is allocated when an object is created from it.',
 n:'क्लास केवल नक्सा हो, यसले मेमोरी लिँदैन। अब्जेक्ट बनेपछि मात्र मेमोरी छुट्याइन्छ।'},

{q:'In a queue, insertion and deletion are done at which ends?',
 o:['Insert at front, delete at rear','Insert at rear, delete at front','Both at the front','Both at the rear'], a:1,
 e:'A queue follows FIFO: new elements join at the rear and elements leave from the front, like a line at a counter.',
 n:'Queue ले FIFO मान्छ: नयाँ तत्त्व rear मा थपिन्छ र front बाट निस्कन्छ — काउन्टरको लाइन जस्तै।'},

{q:'Binding data members and member functions together in one unit and hiding the data from outside is called:',
 o:['Abstraction','Inheritance','Encapsulation','Polymorphism'], a:2,
 e:'That is encapsulation (data hiding). Abstraction instead hides the complexity of HOW the work is done.',
 n:'यो encapsulation (data hiding) हो। Abstraction ले चाहिँ काम "कसरी" हुन्छ भन्ने जटिलता लुकाउँछ।'},

{q:'What is the output of this program?<br><span class="mono" style="color:var(--blue);font-size:.85rem">class A { public: A(){cout&lt;&lt;"A";} ~A(){cout&lt;&lt;"X";} };<br>int main(){ A a1; A a2; return 0; }</span>',
 o:['AXAX','AAXX','AAX','XXAA'], a:1,
 e:'Both constructors run first in creation order, printing AA. Then the destructors run in reverse order, printing XX. So the output is AAXX.',
 n:'दुवै कन्स्ट्रक्टर बनेको क्रममा पहिले चल्छन् — AA छाप्छन्। अनि डिस्ट्रक्टर उल्टो क्रममा चल्छन् — XX छाप्छन्। त्यसैले आउटपुट AAXX हो।'}
];

var answered = [], score = 0;

function buildQuiz(){
  var box = document.getElementById('quizBox');
  if (!box) return;
  var h = '';
  for (var i = 0; i < QUIZ.length; i++){
    var Q = QUIZ[i];
    h += '<div class="q" id="q' + i + '">';
    h += '<div class="qn">QUESTION ' + (i + 1) + ' OF ' + QUIZ.length + '</div>';
    h += '<h4>' + Q.q + '</h4>';
    for (var j = 0; j < Q.o.length; j++){
      h += '<button class="opt" id="o' + i + '_' + j + '" onclick="answer(' + i + ',' + j + ')">' +
           String.fromCharCode(65 + j) + '. ' + Q.o[j] + '</button>';
    }
    h += '<div class="expl" id="e' + i + '"></div>';
    h += '</div>';
  }
  box.innerHTML = h;
  answered = []; score = 0;
  document.getElementById('scoreBox').style.display = 'none';
}

function answer(i, j){
  if (answered[i] !== undefined) return;
  answered[i] = j;
  var Q = QUIZ[i];
  var correct = Q.a;
  for (var k = 0; k < Q.o.length; k++){
    var b = document.getElementById('o' + i + '_' + k);
    b.disabled = true;
    if (k === correct) b.className = 'opt right';
    else if (k === j)  b.className = 'opt wrong';
  }
  if (j === correct) score++;
  var e = document.getElementById('e' + i);
  e.innerHTML = '<b style="color:' + (j === correct ? 'var(--green)' : 'var(--coral)') + '">' +
                (j === correct ? 'Correct. ' : 'Not correct. The answer is ' + String.fromCharCode(65 + correct) + '. ') +
                '</b>' + Q.e + '<span class="np-cell">' + Q.n + '</span>';
  e.className = 'expl show';

  var done = 0;
  for (var m = 0; m < QUIZ.length; m++) if (answered[m] !== undefined) done++;
  if (done === QUIZ.length) showScore();
}

function showScore(){
  if (!document.getElementById("scoreBox")) return;
  var box = document.getElementById('scoreBox');
  document.getElementById('scoreNum').textContent = score + ' / ' + QUIZ.length;
  var msg, msgNp;
  var pct = score / QUIZ.length;
  if (pct === 1)        { msg = 'Perfect. You are ready for this subject.';            msgNp = 'पूर्ण अंक! यो विषयका लागि तपाईं तयार हुनुहुन्छ।'; }
  else if (pct >= 0.8)  { msg = 'Very good. Revise only the ones you missed.';          msgNp = 'धेरै राम्रो। गलत भएका मात्र फेरि हेर्नुहोस्।'; }
  else if (pct >= 0.6)  { msg = 'Good start. Read the comparison tables once more.';    msgNp = 'राम्रो सुरुवात। तुलनात्मक तालिका फेरि एक पटक पढ्नुहोस्।'; }
  else if (pct >= 0.4)  { msg = 'Keep going. Re-read Units 3, 5 and 6, then try again.';msgNp = 'हार नमान्नुहोस्। युनिट ३, ५ र ६ फेरि पढेर पुनः प्रयास गर्नुहोस्।'; }
  else                  { msg = 'Start again from Unit 1 and use the Trace section slowly.'; msgNp = 'युनिट १ बाट फेरि सुरु गर्नुहोस् र Trace सेक्सन बिस्तारै चलाउनुहोस्।'; }
  document.getElementById('scoreMsg').textContent   = msg;
  document.getElementById('scoreMsgNp').textContent = msgNp;
  box.style.display = 'block';
  box.scrollIntoView({behavior:'smooth', block:'center'});
}

function resetQuiz(){
  buildQuiz();
  document.getElementById('quiz').scrollIntoView({behavior:'smooth'});
}

buildQuiz();
