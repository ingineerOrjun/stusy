/* =========================================================
   SQL LEARNING SIMULATOR — Unit 4

   The engine (sql-engine.js) answers the query. This file is about the
   thing the engine cannot do on its own: showing the student WHY.

   THE INTERFACE IS THE PIPELINE
   A query runs as four stages, and the syllabus teaches them in that
   order. So the simulator lays them out in that order and shows the row
   count falling as it goes:

       FROM 4 rows  →  WHERE 3 rows  →  SELECT 1 column  →  ORDER BY

   A student who has watched `marks > 60` take four rows down to three
   has understood WHERE in a way a definition does not deliver. The
   result table alone would not have taught it.

   WHY THE STUDENT PREDICTS FIRST
   Where the lesson asks for it, the run button is preceded by a
   prediction: how many rows will come back? Committing to a number
   before seeing the answer is the difference between reading a result
   and learning from it — the same reasoning as the platform's existing
   prediction component, applied to a query.

   MARKUP CONTRACT

     <div class="sqllab"
          data-tables="Student,Class"
          data-query="SELECT name FROM Student WHERE marks > 60;"
          data-examples="basic"></div>

   Everything else is rendered here. A second lesson needing SQL reuses
   this component with a different query and a different example set.

   SAFETY
   Student text reaches three places and no others: the engine (which
   has no eval and no network), `textContent`, and `DbTable.esc()`
   before it is ever put in markup. There is no path from typing to
   execution.
   ========================================================= */
(function (global) {
  'use strict';

  var esc = (global.DbTable && global.DbTable.esc) || function (s){
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };

  /* Worked queries, grouped so a lesson can offer the set it needs.
     Each is one teaching point, in the syllabus's own order. */
  var EXAMPLES = {
    basic: [
      { sql: 'SELECT * FROM Student;',
        en: 'Every row, every column', ne: 'सबै पङ्क्ति, सबै स्तम्भ' },
      { sql: 'SELECT name, marks FROM Student;',
        en: 'Choose columns — projection', ne: 'स्तम्भ छान्नु — प्रोजेक्सन' },
      { sql: 'SELECT name FROM Student WHERE marks > 60;',
        en: 'Choose rows — selection', ne: 'पङ्क्ति छान्नु — सिलेक्सन' },
      { sql: 'SELECT name FROM Student WHERE marks > 60 AND class_id = 10;',
        en: 'AND narrows the result', ne: 'AND ले नतिजा साँघुरो बनाउँछ' },
      { sql: "SELECT name FROM Student WHERE name = 'Ram' OR marks < 60;",
        en: 'OR widens it', ne: 'OR ले फराकिलो बनाउँछ' },
      { sql: 'SELECT name, marks FROM Student ORDER BY marks DESC;',
        en: 'ORDER BY sorts — it never filters', ne: 'ORDER BY ले क्रम मिलाउँछ — छान्दैन' }
    ],
    write: [
      { sql: "INSERT INTO Student (id, name, marks, class_id) VALUES (5, 'Mina', 88, 11);",
        en: 'Add one row', ne: 'एउटा पङ्क्ति थप्नु' },
      { sql: 'UPDATE Student SET marks = 80 WHERE id = 3;',
        en: 'Change one row', ne: 'एउटा पङ्क्ति बदल्नु' },
      { sql: 'UPDATE Student SET marks = 80;',
        en: 'No WHERE — every row changes', ne: 'WHERE छैन — सबै पङ्क्ति बदलिन्छ' },
      { sql: 'DELETE FROM Student WHERE marks < 60;',
        en: 'Remove rows, keep the table', ne: 'पङ्क्ति हटाउनु, तालिका राख्नु' },
      { sql: 'DROP TABLE Student;',
        en: 'Remove the table itself', ne: 'तालिका नै हटाउनु' }
    ],
    joins: [
      { sql: 'SELECT name, room FROM Student JOIN Class ON Student.class_id = Class.class_id;',
        en: 'Inner — only matches', ne: 'Inner — मिल्ने मात्र' },
      { sql: 'SELECT name, room FROM Student LEFT JOIN Class ON Student.class_id = Class.class_id;',
        en: 'Left — Gita appears with NULL', ne: 'Left — गीता NULL सहित देखिन्छिन्' },
      { sql: 'SELECT name, room FROM Student RIGHT JOIN Class ON Student.class_id = Class.class_id;',
        en: 'Right — room C-3 appears', ne: 'Right — कोठा C-3 देखिन्छ' },
      { sql: 'SELECT name, room FROM Student FULL OUTER JOIN Class ON Student.class_id = Class.class_id;',
        en: 'Full — both gaps appear', ne: 'Full — दुवै खाली ठाउँ देखिन्छन्' },
      { sql: 'SELECT name, room FROM Student NATURAL JOIN Class;',
        en: 'Natural — matches on the shared column by itself', ne: 'Natural — साझा स्तम्भमा आफैं मिलाउँछ' }
    ]
  };

  /* Every refusal the student can meet, written as teaching rather than
     as an error. The pattern is the same each time: what happened, why,
     and what to do — because "syntax error" teaches nothing. */
  function explain(err){
    var i = err.info || {};
    var A = function (en, ne){ return { en: en, ne: ne }; };

    switch (err.code){
      case 'empty':
        return A('Type a query, or choose one of the examples above.',
                 'एउटा क्वेरी लेख्नुहोस्, वा माथिका उदाहरणबाट छान्नुहोस्।');

      case 'unknown-table':
        return A('There is no table called "' + i.name + '". This database has: ' + (i.available || []).join(', ') + '.',
                 '"' + i.name + '" नामको तालिका छैन। यो डाटाबेसमा छन्: ' + (i.available || []).join(', ') + '।');

      case 'unknown-column':
        return A('There is no column called "' + i.name + '". Available: ' + (i.available || []).join(', ') + '.',
                 '"' + i.name + '" नामको स्तम्भ छैन। उपलब्ध: ' + (i.available || []).join(', ') + '।');

      case 'duplicate-primary-key':
        return A('A row with ' + i.key + ' = ' + i.value + ' already exists. A primary key must be unique — that is exactly what it promises.',
                 i.key + ' = ' + i.value + ' भएको पङ्क्ति पहिले नै छ। प्राथमिक कुञ्जी अद्वितीय हुनैपर्छ — त्यही नै यसको वचन हो।');

      case 'insert-count-mismatch':
        return A('You listed ' + i.cols + ' columns but gave ' + i.vals + ' values. Every column named needs exactly one value.',
                 i.cols + ' स्तम्भ लेख्नुभयो तर ' + i.vals + ' मान दिनुभयो। हरेक स्तम्भलाई ठ्याक्कै एउटा मान चाहिन्छ।');

      case 'table-exists':
        return A('A table called "' + i.name + '" already exists. CREATE TABLE makes a new one; it cannot replace one.',
                 '"' + i.name + '" नामको तालिका पहिले नै छ। CREATE TABLE ले नयाँ बनाउँछ, भएकोलाई फेर्न सक्दैन।');

      case 'join-needs-on':
        return A('A join needs an ON condition saying which columns must match — for example ON Student.class_id = Class.class_id. Without it every row would pair with every row.',
                 'Join लाई कुन स्तम्भ मिल्नुपर्ने भन्ने ON सर्त चाहिन्छ — जस्तै ON Student.class_id = Class.class_id। नभए हरेक पङ्क्ति हरेकसँग जोडिन्छ।');

      case 'join-on-equality':
        return A('ON compares two columns with = . The joins in this syllabus all match on equality.',
                 'ON ले दुई स्तम्भलाई = ले तुलना गर्छ। यस पाठ्यक्रमका सबै join बराबरीमा मिल्छन्।');

      case 'natural-join-no-shared-column':
        return A('A NATURAL JOIN matches on a column both tables share, and ' + i.a + ' and ' + i.b + ' share none. Use JOIN ... ON instead.',
                 'NATURAL JOIN लाई दुवै तालिकामा साझा स्तम्भ चाहिन्छ, तर ' + i.a + ' र ' + i.b + ' मा छैन। JOIN ... ON प्रयोग गर्नुहोस्।');

      case 'not-executed': {
        var st = i.statement, key = i.why && i.why.key, topic = i.why && i.why.topic;
        var m = {
          alter:  A('ALTER is on your syllabus (' + topic + ') and you should know its syntax — but this simulator keeps one fixed teaching schema, so changing the structure is not run here. Read the worked example above instead.',
                    'ALTER तपाईंको पाठ्यक्रममा (' + topic + ') छ र यसको वाक्यविन्यास जान्नुपर्छ — तर यो सिमुलेटरले एउटै निश्चित स्किमा राख्छ, त्यसैले संरचना बदल्ने काम यहाँ चल्दैन। माथिको उदाहरण हेर्नुहोस्।'),
          rename: A('RENAME is on your syllabus (' + topic + '), but this simulator keeps one fixed teaching schema, so it is not run here.',
                    'RENAME पाठ्यक्रममा (' + topic + ') छ, तर यो सिमुलेटरले एउटै निश्चित स्किमा राख्ने भएकाले यहाँ चल्दैन।'),
          dcl:    A(st + ' is a DCL statement (' + topic + '). It changes who is ALLOWED to use the data — and this site has no users and no server, so there is nothing here for it to change. Learn its syntax and purpose; it is examined by definition, not by running it.',
                    st + ' एउटा DCL कथन हो (' + topic + ')। यसले डाटा प्रयोग गर्न पाउने अधिकार बदल्छ — यो साइटमा प्रयोगकर्ता र सर्भर नभएकाले बदल्ने केही छैन। वाक्यविन्यास र उद्देश्य सिक्नुहोस्; परीक्षामा परिभाषाबाटै सोधिन्छ।'),
          with:   A('WITH is named in your syllabus (' + topic + ') among the clauses. You should recognise it; you are not expected to write one at this level, and it is not run here.',
                    'WITH पाठ्यक्रमका clause मा (' + topic + ') नाम छ। चिन्न सक्नुपर्छ; यो तहमा लेख्न अपेक्षा गरिँदैन, र यहाँ चल्दैन।'),
          view:   A('A VIEW (' + topic + ') is a stored query that behaves like a table. It is examined by definition and syntax; this simulator runs the query itself instead.',
                    'VIEW (' + topic + ') भनेको तालिकाजस्तै व्यवहार गर्ने संग्रहित क्वेरी हो। परीक्षामा परिभाषा र वाक्यविन्यासबाट सोधिन्छ; यहाँ क्वेरी आफैं चलाउनुहोस्।')
        };
        return m[key] || A(st + ' is not run by this simulator.', st + ' यो सिमुलेटरले चलाउँदैन।');
      }

      case 'out-of-syllabus-function':
        return A(i.name.toUpperCase() + '() is an aggregate function. Aggregate functions and GROUP BY are NOT part of your syllabus — you will not be asked about them. Everything you need is SELECT, WHERE, ORDER BY and joins.',
                 i.name.toUpperCase() + '() एउटा aggregate फङ्सन हो। Aggregate फङ्सन र GROUP BY तपाईंको पाठ्यक्रममा छैनन् — सोधिँदैन। चाहिने कुरा SELECT, WHERE, ORDER BY र join मात्र हुन्।');

      case 'out-of-syllabus':
      case 'out-of-syllabus-clause':
        return A('That is real SQL, but it is not part of your syllabus, so it is not taught or run here.',
                 'त्यो साँच्चै SQL हो, तर तपाईंको पाठ्यक्रममा नपर्ने भएकाले यहाँ पढाइँदैन र चल्दैन।');

      case 'unterminated-string':
        return A('A text value opened with a quote but never closed it. Text needs a quote at both ends: \'Ram\'.',
                 'पाठ मान उद्धरण चिन्हले सुरु भयो तर बन्द भएन। दुवैतिर चिन्ह चाहिन्छ: \'Ram\'।');

      case 'expected-value':
        return A('The query stops before the value it is comparing against. WHERE needs a complete comparison, like WHERE marks > 60.',
                 'तुलना गर्ने मान नआउँदै क्वेरी रोकियो। WHERE लाई पूरा तुलना चाहिन्छ, जस्तै WHERE marks > 60।');

      case 'expected-name':
        return A('A table or column name is missing here. Check that FROM is followed by a table name and SELECT by a column name or *.',
                 'यहाँ तालिका वा स्तम्भको नाम छुटेको छ। FROM पछि तालिका र SELECT पछि स्तम्भ वा * छ कि हेर्नुहोस्।');

      case 'expected-keyword':
        return A('Expected ' + i.expected + ' here. The order is SELECT ... FROM ... WHERE ... ORDER BY ...',
                 'यहाँ ' + i.expected + ' चाहिन्थ्यो। क्रम यस्तो हुन्छ: SELECT ... FROM ... WHERE ... ORDER BY ...');

      case 'expected-operator':
        return A('A comparison needs an operator: = , <> , < , <= , > or >= .',
                 'तुलनालाई एउटा चिन्ह चाहिन्छ: = , <> , < , <= , > वा >= ।');

      case 'expected-punct':
        return A('Expected "' + i.expected + '" here. Check the brackets and commas.',
                 'यहाँ "' + i.expected + '" चाहिन्थ्यो। कोष्ठक र अल्पविराम जाँच्नुहोस्।');

      case 'trailing-input':
        return A('There is extra text after the end of the query. One statement at a time.',
                 'क्वेरी सकिएपछि थप पाठ छ। एक पटकमा एउटै कथन।');

      case 'unknown-statement':
        return A('This simulator runs SELECT, INSERT, UPDATE, DELETE, CREATE TABLE and DROP TABLE.',
                 'यो सिमुलेटरले SELECT, INSERT, UPDATE, DELETE, CREATE TABLE र DROP TABLE चलाउँछ।');

      case 'bad-character':
        return A('The character "' + i.char + '" cannot appear in SQL here.',
                 '"' + i.char + '" अक्षर यहाँ SQL मा आउन मिल्दैन।');
    }
    return A('That query could not be read.', 'त्यो क्वेरी पढ्न सकिएन।');
  }

  /* ---------------------------------------------------------------
     ONE MOUNTED SIMULATOR
     --------------------------------------------------------------- */
  function SqlLab(root){
    this.root = root;
    var schemas = (global.DbTable && global.DbTable.SCHEMAS) || {};
    this.schema = schemas[root.getAttribute('data-schema') || 'school'] || schemas.school;

    var want = (root.getAttribute('data-tables') || 'Student,Class').split(',')
      .map(function (s){ return s.trim(); });
    this.names = want.filter(function (n){ return this.schema && this.schema.tables[n]; }, this);

    this.examples = EXAMPLES[root.getAttribute('data-examples') || 'basic'] || EXAMPLES.basic;
    this.startQuery = root.getAttribute('data-query') || this.examples[0].sql;

    this.reset(true);
  }

  /* A pristine copy so Reset is exact, and so a DROP in one experiment
     does not ruin the next one. */
  SqlLab.prototype.freshDb = function (){
    var db = {}, self = this;
    this.names.forEach(function (n){
      var t = self.schema.tables[n];
      db[n] = {
        columns: t.columns.slice(), types: t.types ? t.types.slice() : null,
        pk: t.pk, fk: t.fk,
        rows: t.rows.map(function (r){ return r.slice(); })
      };
    });
    return db;
  };

  SqlLab.prototype.reset = function (first){
    this.db = this.freshDb();
    this.out = null;
    this.error = null;
    this.trace = [];
    this.query = this.startQuery;
    this.render();
    if (!first){
      var ta = this.root.querySelector('.sq-input');
      if (ta) ta.focus();
    }
  };

  SqlLab.prototype.render = function (){
    var self = this, h = '';

    /* the database the query runs against, always on screen — a query
       you cannot see the tables for is a guessing game */
    h += '<div class="sq-db"><span class="sq-h"><span class="t-en">The database</span>' +
         '<span class="np-cell" lang="ne">डाटाबेस</span></span><div class="sq-db-tables">';
    this.names.forEach(function (n){
      var t = self.db[n];
      if (!t){
        h += '<div class="sq-gone"><span class="t-en">' + esc(n) + ' — dropped</span>' +
             '<span class="np-cell" lang="ne">' + esc(n) + ' — हटाइयो</span></div>';
        return;
      }
      h += global.DbTable.render(n, t.columns, t.rows, { pk: t.pk, fk: t.fk });
    });
    h += '</div></div>';

    /* examples */
    h += '<div class="sq-examples" role="group" aria-label="Example queries">';
    h += this.examples.map(function (e, i){
      return '<button type="button" class="sq-eg" data-sq-eg="' + i + '">' +
             '<span class="t-en">' + esc(e.en) + '</span>' +
             '<span class="t-ne"><span class="t-en"> · </span>' + esc(e.ne) + '</span></button>';
    }).join('');
    h += '</div>';

    /* the editor */
    h += '<div class="sq-editor">' +
         '<label class="sq-lab" for="' + this.id('q') + '">' +
           '<span class="t-en">Your query</span>' +
           '<span class="np-cell" lang="ne">तपाईंको क्वेरी</span></label>' +
         '<textarea class="sq-input" id="' + this.id('q') + '" rows="3" spellcheck="false" ' +
           'autocapitalize="off" autocorrect="off" ' +
           'aria-describedby="' + this.id('scope') + '">' + esc(this.query) + '</textarea>' +
         '<p class="sq-scope" id="' + this.id('scope') + '">' +
           '<span class="t-en">Runs SELECT, INSERT, UPDATE, DELETE, CREATE TABLE and DROP TABLE — the statements your syllabus asks you to write.</span>' +
           '<span class="np-cell" lang="ne">SELECT, INSERT, UPDATE, DELETE, CREATE TABLE र DROP TABLE चल्छन् — पाठ्यक्रमले लेख्न भनेका कथनहरू।</span></p>' +
         '</div>';

    h += '<div class="sim-controls">' +
         '<button type="button" class="primary" data-sq-act="run" data-ui="run">Run the query</button>' +
         '<button type="button" class="coral" data-sq-act="reset" data-ui="reset">Reset</button>' +
         '</div>';

    /* WHAT A SCREEN READER HEARS AFTER A RUN
       The pipeline plus the result table is 44 words in one language
       and 73 in bilingual mode. Announcing all of that on every run
       gives a listener something they cannot stop, cannot re-read a
       part of, and hear again on the next run. Measured with
       tests/manual/a11y-tree.js, which is how it was found at all.

       So the announcement is a one-line outcome, and the detail is a
       named region the listener navigates to when they want it. */
    h += '<p class="sq-summary" role="status"></p>';
    h += '<div class="sq-out" role="region" data-ui="queryResult" data-ui-aria>' +
         this.outputHtml() + '</div>';

    this.root.innerHTML = h;
    if (global.UIStrings && global.UIStrings.apply) global.UIStrings.apply(this.root);
    this.wire();
  };

  SqlLab.prototype.id = function (s){
    if (!this._id) this._id = this.root.id || ('sq' + Math.floor(Math.random() * 1e6));
    return this._id + '-' + s;
  };

  /* The one line that is actually announced. Short enough to hear on
     every run, and specific enough to be worth hearing. */
  SqlLab.prototype.summaryHtml = function (){
    if (this.error){
      return '<span class="t-en">Query not run. ' + esc(this.error.en) + '</span>' +
             '<span class="np-cell" lang="ne">क्वेरी चलेन। ' + esc(this.error.ne) + '</span>';
    }
    if (!this.out) return '';

    if (this.out.kind === 'result'){
      var r = this.out.rows.length, c = this.out.columns.length;
      return '<span class="t-en">' + r + (r === 1 ? ' row' : ' rows') + ', ' +
                 c + (c === 1 ? ' column' : ' columns') + ' returned.</span>' +
             '<span class="np-cell" lang="ne">' + r + ' पङ्क्ति, ' + c + ' स्तम्भ फर्कियो।</span>';
    }
    if (this.out.kind === 'dropped'){
      return '<span class="t-en">Table ' + esc(this.out.table) + ' removed.</span>' +
             '<span class="np-cell" lang="ne">' + esc(this.out.table) + ' तालिका हट्यो।</span>';
    }
    var n = this.out.affected;
    return '<span class="t-en">' + n + (n === 1 ? ' row' : ' rows') + ' changed in ' +
               esc(this.out.table) + '.</span>' +
           '<span class="np-cell" lang="ne">' + esc(this.out.table) + ' मा ' + n + ' पङ्क्ति बदलियो।</span>';
  };

  SqlLab.prototype.outputHtml = function (){
    if (this.error){
      return '<div class="sq-err">' +
             '<span class="sq-err-h"><span class="t-en">Not run — here is why</span>' +
             '<span class="np-cell" lang="ne">चलेन — कारण यो हो</span></span>' +
             '<span class="sq-err-en t-en">' + esc(this.error.en) + '</span>' +
             '<span class="sq-err-ne np-cell" lang="ne">' + esc(this.error.ne) + '</span></div>';
    }
    if (!this.out) return '';

    /* The stage label is the SQL keyword a student will meet in the
       exam, not the engine's internal name — "ORDER BY", not "ORDER". */
    var STAGE = {
      from: 'FROM', where: 'WHERE', select: 'SELECT', order: 'ORDER BY',
      join: 'JOIN', insert: 'INSERT', update: 'UPDATE', delete: 'DELETE',
      create: 'CREATE', drop: 'DROP'
    };

    var h = '<ol class="sq-pipe">';
    for (var i = 0; i < this.trace.length; i++){
      var s = this.trace[i];
      h += '<li class="sq-step' + (s.warnAll ? ' is-warn' : '') + '" data-sq-stage="' + esc(s.stage) + '">' +
           '<span class="sq-stage">' + esc(STAGE[s.stage] || s.stage.toUpperCase()) + '</span>' +
           '<span class="sq-step-say"><span class="t-en">' + esc(s.en) + '</span>' +
           '<span class="np-cell" lang="ne">' + esc(s.ne) + '</span></span>' +
           '<span class="sq-count">' + s.rows + '</span></li>';
    }
    h += '</ol>';

    if (this.out.kind === 'result'){
      h += '<div class="sq-result"><span class="sq-h">' +
           '<span class="t-en">Result</span><span class="np-cell" lang="ne">नतिजा</span></span>' +
           global.DbTable.render(null, this.out.columns, this.out.rows, { counts: true }) + '</div>';
    } else if (this.out.kind === 'dropped'){
      h += '<div class="sq-result sq-dropped"><span class="t-en">The table ' + esc(this.out.table) +
           ' no longer exists. Press Reset to bring the database back.</span>' +
           '<span class="np-cell" lang="ne">' + esc(this.out.table) +
           ' तालिका अब छैन। डाटाबेस फर्काउन Reset थिच्नुहोस्।</span></div>';
    } else {
      var t = this.db[this.out.table];
      h += '<div class="sq-result"><span class="sq-h">' +
           '<span class="t-en">' + esc(this.out.table) + ' after the change</span>' +
           '<span class="np-cell" lang="ne">' + esc(this.out.table) + ' — परिवर्तनपछि</span></span>' +
           (t ? global.DbTable.render(this.out.table, t.columns, t.rows, { pk: t.pk, fk: t.fk, counts: true }) : '') +
           '</div>';
    }
    return h;
  };

  SqlLab.prototype.run = function (){
    var ta = this.root.querySelector('.sq-input');
    this.query = ta ? ta.value : this.query;

    var r = global.SQLEngine.execute(this.query, this.db);
    if (!r.ok){
      this.error = explain(r.error);
      this.out = null; this.trace = [];
    } else {
      this.error = null;
      this.out = r.result;
      this.trace = r.trace;
      if (r.result.changed) this.db = r.db;      /* writes persist until Reset */
    }
    /* Only the output region is rebuilt, so the student's typing, the
       caret and the scroll position all survive a run. */
    var out = this.root.querySelector('.sq-out');
    if (out) out.innerHTML = this.outputHtml();

    /* The summary is written last and separately, so the announcement
       fires once, after the detail is already in place for a listener
       who then navigates to it. */
    var sum = this.root.querySelector('.sq-summary');
    if (sum) sum.innerHTML = this.summaryHtml();

    if (r.ok && r.result.changed) this.refreshDbView();
  };

  SqlLab.prototype.refreshDbView = function (){
    var host = this.root.querySelector('.sq-db-tables');
    if (!host) return;
    var self = this, h = '';
    this.names.forEach(function (n){
      var t = self.db[n];
      if (!t){
        h += '<div class="sq-gone"><span class="t-en">' + esc(n) + ' — dropped</span>' +
             '<span class="np-cell" lang="ne">' + esc(n) + ' — हटाइयो</span></div>';
        return;
      }
      h += global.DbTable.render(n, t.columns, t.rows, { pk: t.pk, fk: t.fk });
    });
    host.innerHTML = h;
  };

  SqlLab.prototype.wire = function (){
    var self = this;
    var run = this.root.querySelector('[data-sq-act="run"]');
    if (run) run.addEventListener('click', function (){ self.run(); });

    var rst = this.root.querySelector('[data-sq-act="reset"]');
    if (rst) rst.addEventListener('click', function (){ self.reset(); });

    var ta = this.root.querySelector('.sq-input');
    if (ta){
      /* Ctrl/Cmd+Enter runs, as every SQL tool does. Plain Enter still
         makes a newline — a query is often three lines. */
      ta.addEventListener('keydown', function (e){
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter'){ e.preventDefault(); self.run(); }
      });
    }

    var egs = this.root.querySelectorAll('[data-sq-eg]');
    for (var i = 0; i < egs.length; i++){
      egs[i].addEventListener('click', function (){
        var e = self.examples[parseInt(this.getAttribute('data-sq-eg'), 10)];
        if (!e) return;
        self.query = e.sql;
        var box = self.root.querySelector('.sq-input');
        if (box){ box.value = e.sql; box.focus(); }
        self.run();
      });
    }
  };

  /* ---------------------------------------------------------------
     MOUNT
     --------------------------------------------------------------- */
  function mountAll(){
    if (typeof document === 'undefined') return;
    if (!global.SQLEngine || !global.DbTable) return;   /* load order is set by the page map */
    var nodes = document.querySelectorAll('.sqllab');
    for (var i = 0; i < nodes.length; i++){
      (function (root, n){
        if (root.getAttribute('data-mounted')) return;
        root.setAttribute('data-mounted', '1');
        var lab = new SqlLab(root);
        root._lab = lab;
        if (global.SimulationService){
          global.SimulationService.register({
            id: 'sql:' + (root.id || ('sqllab' + n)),
            subject: 'grade10/dbms', unit: 'u4',
            title: { en: 'SQL learning simulator', ne: 'SQL सिकाइ सिमुलेटर' },
            mounts: function (){ return !!root.parentNode; },
            reset: function (){ lab.reset(); },
            controls: [
              { id: 'run',   label: { en: 'Run the query', ne: 'क्वेरी चलाउनुहोस्' } },
              { id: 'reset', label: { en: 'Reset the database', ne: 'डाटाबेस रिसेट गर्नुहोस्' } }
            ]
          });
        }
      })(nodes[i], i);
    }
  }

  function ready(fn){
    if (typeof document === 'undefined') return;
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }
  ready(mountAll);

  global.SqlLab = { EXAMPLES: EXAMPLES, explain: explain, mount: mountAll, Lab: SqlLab };
  if (typeof module !== 'undefined' && module.exports) module.exports = global.SqlLab;

})(typeof window !== 'undefined' ? window : globalThis);
