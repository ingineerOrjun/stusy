/* =========================================================
   2. BASIC STRUCTURE / DECLARATION SNIPPETS (static)
   ========================================================= */
var BASIC_STRUCT = [
'#include <iostream>          // preprocessor directive',
'using namespace std;         // use the standard namespace',
'',
'int main() {                 // execution starts here',
'    cout << "Hello Gyansetu" << endl;',
'    return 0;                // 0 means success',
'}'
];

var CLASS_DECL = [
'class Student {              // class = blueprint',
'private:                     // hidden from outside',
'    string name;             // data member',
'    int roll;                // data member',
'public:                      // usable from outside',
'    void setData(string n, int r) {   // member function',
'        name = n;',
'        roll = r;',
'    }',
'    void display() {         // member function',
'        cout << name << " - " << roll << endl;',
'    }',
'};                           // semicolon is compulsory',
'',
'int main() {',
'    Student s1;              // s1 is an OBJECT',
'    s1.setData("Ram", 15);   // dot operator',
'    s1.display();            // output: Ram - 15',
'    return 0;',
'}'
];

var ENCAP_CODE = [
'class Account {',
'private:',
'    double balance;                 // hidden data (encapsulation)',
'public:',
'    void setBalance(double b) {     // setter - can check the value',
'        if (b >= 0) balance = b;',
'    }',
'    double getBalance() {           // getter - safe read only',
'        return balance;',
'    }',
'};',
'',
'int main() {',
'    Account a;',
'    // a.balance = -500;            // ERROR: balance is private',
'    a.setBalance(5000);             // allowed, and checked',
'    cout << a.getBalance();         // output: 5000',
'    return 0;',
'}'
];

var INH_SYNTAX = [
'class Base {                 // base / parent class',
'public:',
'    void greet() { cout << "Hello from Base"; }',
'};',
'',
'class Derived : public Base {   // <-- mode : base class name',
'public:',
'    void hi() { cout << "Hello from Derived"; }',
'};',
'',
'int main() {',
'    Derived d;',
'    d.greet();               // inherited from Base',
'    d.hi();                  // its own function',
'    return 0;',
'}'
];

var POLY_SYNTAX = [
'// (a) COMPILE-TIME : function overloading',
'int add(int a, int b) { return a + b; }',
'int add(int a, int b, int c) { return a + b + c; }',
'',
'// (b) RUN-TIME : function overriding with virtual',
'class Base {',
'public:',
'    virtual void show() { cout << "Base show" << endl; }',
'};',
'class Derived : public Base {',
'public:',
'    void show() { cout << "Derived show" << endl; }   // overriding',
'};',
'',
'int main() {',
'    Base *p;  Derived d;',
'    p = &d;',
'    p->show();               // run-time: prints "Derived show"',
'    return 0;',
'}'
];

renderCode(document.getElementById('basicStruct'), BASIC_STRUCT, 0);
renderCode(document.getElementById('classDecl'),   CLASS_DECL,   0);
renderCode(document.getElementById('encapCode'),   ENCAP_CODE,   0);
renderCode(document.getElementById('inhSyntax'),   INH_SYNTAX,   0);
renderCode(document.getElementById('polySyntax'),  POLY_SYNTAX,  0);

