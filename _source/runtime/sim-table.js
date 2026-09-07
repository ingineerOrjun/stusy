/* =========================================================
   RELATIONAL TABLE VISUALISER — Unit 3, and the renderer the
   SQL simulator draws its results with.

   WHY THIS EXISTS
   Unit 3.2 is a vocabulary list: tuple, cardinality, column, attribute,
   degree, domain, relational instance, relational schema, relational
   key. Nine words for six things, and a student meeting them as a list
   of definitions confuses them in the exam — reliably. The two that go
   wrong most are DEGREE and CARDINALITY, which sound interchangeable
   and are not.

   A list of definitions cannot fix that. One table that you point at
   can: click "degree" and the columns light up with the count; click
   "cardinality" and the rows do. The word is attached to the thing.

   WHY IT IS ALSO THE SQL RESULT RENDERER
   A SELECT returns a relation. Rendering it with a second, different
   table component would be the platform quietly teaching that a query
   result is a different kind of object from a table. It is not — and
   the syllabus (3.3) makes a point of it.

   MARKUP CONTRACT — authored in the lesson, no JavaScript needed:

     <div class="dbtable" data-table="Student"></div>
     <div class="dbtable" data-table="Student" data-mode="vocab"></div>
     <div class="dbtable" data-tables="Student,Class" data-mode="keys"></div>

   `data-schema` selects the teaching database; it defaults to the one
   below, which the SQL simulator shares. A future unit adds a schema
   rather than a component.
   ========================================================= */
(function (global) {
  'use strict';

  /* ---------------------------------------------------------------
     THE TEACHING SCHEMA

     Deliberately small, and deliberately imperfect: Gita has no class,
     and class 12 has no student. Those two gaps are what make an outer
     join show something an inner join does not — without them, every
     join in Unit 4 would produce the same answer and the lesson would
     be invisible. Nepali names, because the student is in Nepal.
     --------------------------------------------------------------- */
  var SCHEMAS = {
    school: {
      title: { en: 'School database', ne: 'विद्यालय डाटाबेस' },
      tables: {
        Student: {
          columns: ['id', 'name', 'marks', 'class_id'],
          types: ['INT', 'VARCHAR(30)', 'INT', 'INT'],
          domains: {
            id: { en: 'a whole number, unique', ne: 'पूर्ण संख्या, अद्वितीय' },
            name: { en: 'text, up to 30 characters', ne: 'पाठ, बढीमा ३० अक्षर' },
            marks: { en: 'a whole number 0–100', ne: 'पूर्ण संख्या ०–१००' },
            class_id: { en: 'must exist in Class', ne: 'Class मा हुनैपर्छ' }
          },
          pk: 'id',
          fk: [{ col: 'class_id', refTable: 'Class', refCol: 'class_id' }],
          rows: [
            [1, 'Ram', 78, 10],
            [2, 'Sita', 91, 10],
            [3, 'Hari', 55, 11],
            [4, 'Gita', 64, null]
          ]
        },
        Class: {
          columns: ['class_id', 'room'],
          types: ['INT', 'VARCHAR(10)'],
          domains: {
            class_id: { en: 'a whole number, unique', ne: 'पूर्ण संख्या, अद्वितीय' },
            room: { en: 'text, up to 10 characters', ne: 'पाठ, बढीमा १० अक्षर' }
          },
          pk: 'class_id',
          fk: null,
          rows: [[10, 'A-1'], [11, 'B-2'], [12, 'C-3']]
        }
      }
    }
  };

  /* The nine words of 3.2, each tied to what it actually points at.
     `hit` says what lights up; the sentence says what the word means
     in terms of what the student can now see. */
  var TERMS = [
    { id: 'relation', hit: 'all',
      label: { en: 'Relation', ne: 'रिलेसन' },
      say: { en: 'The whole table is one relation. In the relational model, everything is a table.',
             ne: 'पूरै तालिका नै एउटा रिलेसन हो। रिलेसनल मोडेलमा सबै कुरा तालिका हो।' } },
    { id: 'tuple', hit: 'row',
      label: { en: 'Tuple (row)', ne: 'ट्युपल (पङ्क्ति)' },
      say: { en: 'One tuple is one row — one complete record about one student.',
             ne: 'एउटा ट्युपल भनेको एउटा पङ्क्ति — एउटै विद्यार्थीको पूरा रेकर्ड।' } },
    { id: 'attribute', hit: 'col',
      label: { en: 'Attribute (column)', ne: 'एट्रिब्युट (स्तम्भ)' },
      say: { en: 'One attribute is one column — one property recorded for every row.',
             ne: 'एउटा एट्रिब्युट भनेको एउटा स्तम्भ — हरेक पङ्क्तिका लागि राखिने एउटा गुण।' } },
    { id: 'degree', hit: 'cols',
      label: { en: 'Degree', ne: 'डिग्री' },
      say: { en: 'Degree is the number of COLUMNS. Count sideways.',
             ne: 'डिग्री भनेको स्तम्भको सङ्ख्या। तेर्सो गरी गन्नुहोस्।' } },
    { id: 'cardinality', hit: 'rows',
      label: { en: 'Cardinality', ne: 'कार्डिनालिटी' },
      say: { en: 'Cardinality is the number of ROWS. Count downwards. This is the one students swap with degree — and it costs a mark every year.',
             ne: 'कार्डिनालिटी भनेको पङ्क्तिको सङ्ख्या। ठाडो गरी गन्नुहोस्। विद्यार्थीले डिग्रीसँग साट्ने ठाउँ यही हो।' } },
    { id: 'domain', hit: 'domain',
      label: { en: 'Domain', ne: 'डोमेन' },
      say: { en: 'A domain is the set of values a column is allowed to hold. marks cannot hold "Ram".',
             ne: 'डोमेन भनेको कुनै स्तम्भले लिन पाउने मानहरूको समूह। marks मा "Ram" राख्न मिल्दैन।' } },
    { id: 'key', hit: 'pk',
      label: { en: 'Primary key', ne: 'प्राथमिक कुञ्जी' },
      say: { en: 'The primary key identifies each row uniquely. No two rows may share it, and it can never be empty.',
             ne: 'प्राथमिक कुञ्जीले हरेक पङ्क्तिलाई अद्वितीय रूपमा चिनाउँछ। दुई पङ्क्तिको उही हुन सक्दैन, र खाली हुन पाउँदैन।' } },
    { id: 'schema', hit: 'head',
      label: { en: 'Relational schema', ne: 'रिलेसनल स्किमा' },
      say: { en: 'The schema is the STRUCTURE — the table name and its columns. It does not change when rows are added.',
             ne: 'स्किमा भनेको संरचना — तालिकाको नाम र स्तम्भहरू। पङ्क्ति थप्दा यो बदलिँदैन।' } },
    { id: 'instance', hit: 'body',
      label: { en: 'Relational instance', ne: 'रिलेसनल इन्स्ट्यान्स' },
      say: { en: 'The instance is the DATA in the table right now. It changes every time a row is inserted or deleted.',
             ne: 'इन्स्ट्यान्स भनेको अहिले तालिकामा भएको डाटा। पङ्क्ति थपिँदा वा हट्दा यो बदलिन्छ।' } }
  ];

  function esc(s){
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* NULL is a value a student must learn to read, not an empty cell.
     Showing it blank is how "NULL means zero" gets learned. */
  function cell(v){
    if (v === null || v === undefined) return '<span class="dt-null">NULL</span>';
    return esc(v);
  }

  /* ---------------------------------------------------------------
     THE RENDERER — shared with the SQL simulator.

     `opts.mark` marks cells the caller wants picked out:
       { cols:[i], rows:[i], cells:[[r,c]] }
     --------------------------------------------------------------- */
  function renderTable(name, columns, rows, opts){
    opts = opts || {};
    var mark = opts.mark || {};
    var markCols = mark.cols || [], markRows = mark.rows || [];
    var h = '';

    h += '<div class="dt-wrap"><table class="dt"' +
         (opts.caption ? ' aria-describedby="' + esc(opts.captionId || '') + '"' : '') + '>';
    if (name){
      h += '<caption class="dt-name"><span class="t-en">' + esc(name) + '</span>' +
           (opts.nameNe ? '<span class="np-cell" lang="ne">' + esc(opts.nameNe) + '</span>' : '') +
           '</caption>';
    }

    h += '<thead><tr>';
    for (var c = 0; c < columns.length; c++){
      var isPk = opts.pk && columns[c] === opts.pk;
      var isFk = opts.fk && opts.fk.some(function (f){ return f.col === columns[c]; });
      h += '<th scope="col" data-dt-col="' + c + '"' +
           ' class="' + (markCols.indexOf(c) >= 0 ? 'is-mark ' : '') +
                       (isPk ? 'is-pk ' : '') + (isFk ? 'is-fk' : '') + '">' +
           esc(columns[c]);
      if (isPk) h += '<span class="dt-badge dt-pk" title="Primary key">PK</span>';
      if (isFk) h += '<span class="dt-badge dt-fk" title="Foreign key">FK</span>';
      if (opts.types && opts.types[c]) h += '<span class="dt-type">' + esc(opts.types[c]) + '</span>';
      h += '</th>';
    }
    h += '</tr></thead><tbody>';

    if (!rows.length){
      h += '<tr class="dt-empty"><td colspan="' + columns.length + '">' +
           '<span class="t-en">No rows</span>' +
           '<span class="np-cell" lang="ne">कुनै पङ्क्ति छैन</span></td></tr>';
    }
    for (var r = 0; r < rows.length; r++){
      h += '<tr data-dt-row="' + r + '" class="' + (markRows.indexOf(r) >= 0 ? 'is-mark' : '') + '">';
      for (var k = 0; k < columns.length; k++){
        h += '<td data-dt-col="' + k + '" class="' + (markCols.indexOf(k) >= 0 ? 'is-mark' : '') + '">' +
             cell(rows[r][k]) + '</td>';
      }
      h += '</tr>';
    }
    h += '</tbody></table></div>';

    /* The two counts, always visible, because the whole point of the
       unit is that they are different numbers. */
    if (opts.counts){
      h += '<p class="dt-counts">' +
           '<span class="dt-count" data-dt-count="cols"><b>' + columns.length + '</b> ' +
             '<span class="t-en">columns — degree</span>' +
             '<span class="np-cell" lang="ne">स्तम्भ — डिग्री</span></span>' +
           '<span class="dt-count" data-dt-count="rows"><b>' + rows.length + '</b> ' +
             '<span class="t-en">rows — cardinality</span>' +
             '<span class="np-cell" lang="ne">पङ्क्ति — कार्डिनालिटी</span></span>' +
           '</p>';
    }
    return h;
  }

  /* ---------------------------------------------------------------
     ONE MOUNTED VISUALISER
     --------------------------------------------------------------- */
  function TableViz(root){
    this.root = root;
    var schemaName = root.getAttribute('data-schema') || 'school';
    this.schema = SCHEMAS[schemaName] || SCHEMAS.school;

    var names = (root.getAttribute('data-tables') || root.getAttribute('data-table') || 'Student')
      .split(',').map(function (s){ return s.trim(); })
      .filter(function (n){ return !!this.schema.tables[n]; }, this);
    this.names = names.length ? names : ['Student'];

    this.mode = root.getAttribute('data-mode') || 'plain';
    this.term = null;
    this.render();
  }

  TableViz.prototype.table = function (n){ return this.schema.tables[n]; };

  TableViz.prototype.render = function (){
    var self = this, h = '';

    if (this.mode === 'vocab'){
      h += '<div class="dt-terms" role="group" aria-label="Choose a term to see what it points at">';
      h += TERMS.map(function (t){
        return '<button type="button" class="dt-term" data-dt-term="' + t.id + '"' +
               ' aria-pressed="' + (self.term === t.id) + '">' +
               '<span class="t-en">' + esc(t.label.en) + '</span>' +
               '<span class="t-ne" lang="ne"><span class="t-en"> · </span>' + esc(t.label.ne) + '</span>' +
               '</button>';
      }).join('');
      h += '</div>';
    }

    h += '<div class="dt-tables">';
    for (var i = 0; i < this.names.length; i++){
      var t = this.table(this.names[i]);
      h += renderTable(this.names[i], t.columns, t.rows, {
        pk: t.pk, fk: t.fk, types: this.mode === 'plain' ? null : t.types,
        counts: this.mode === 'vocab',
        mark: this.marksFor(this.names[i])
      });
    }
    h += '</div>';

    if (this.mode === 'keys') h += this.keyNotes();

    h += '<div class="dt-say" role="status">' +
         '<span class="dt-say-en t-en"></span>' +
         '<span class="dt-say-ne np-cell" lang="ne"></span></div>';

    this.root.innerHTML = h;
    this.wire();
    this.say();
  };

  /* What lights up for the selected term. */
  TableViz.prototype.marksFor = function (name){
    if (this.mode !== 'vocab' || !this.term) return {};
    var t = this.table(name), term = null;
    for (var i = 0; i < TERMS.length; i++) if (TERMS[i].id === this.term) term = TERMS[i];
    if (!term) return {};

    var allCols = t.columns.map(function (_, i){ return i; });
    var allRows = t.rows.map(function (_, i){ return i; });

    switch (term.hit){
      case 'all':    return { cols: allCols, rows: allRows };
      case 'row':    return { rows: [0] };
      case 'col':    return { cols: [1] };
      case 'cols':   return { cols: allCols };
      case 'rows':   return { rows: allRows };
      case 'domain': return { cols: [t.columns.indexOf('marks') >= 0 ? t.columns.indexOf('marks') : 0] };
      case 'pk':     return { cols: [t.columns.indexOf(t.pk)] };
      case 'head':   return { cols: allCols };
      case 'body':   return { rows: allRows };
    }
    return {};
  };

  TableViz.prototype.keyNotes = function (){
    var h = '<ul class="dt-keys">', self = this;
    this.names.forEach(function (n){
      var t = self.table(n);
      if (t.pk){
        h += '<li><span class="dt-badge dt-pk">PK</span> ' +
             '<span class="t-en"><code>' + esc(n) + '.' + esc(t.pk) + '</code> identifies each row of ' + esc(n) + ' uniquely.</span>' +
             '<span class="np-cell" lang="ne"><code>' + esc(n) + '.' + esc(t.pk) + '</code> ले ' + esc(n) +
             ' का हरेक पङ्क्तिलाई अद्वितीय चिनाउँछ।</span></li>';
      }
      (t.fk || []).forEach(function (f){
        h += '<li><span class="dt-badge dt-fk">FK</span> ' +
             '<span class="t-en"><code>' + esc(n) + '.' + esc(f.col) + '</code> must already exist in <code>' +
             esc(f.refTable) + '.' + esc(f.refCol) + '</code>. That rule is what links the two tables.</span>' +
             '<span class="np-cell" lang="ne"><code>' + esc(n) + '.' + esc(f.col) + '</code> को मान <code>' +
             esc(f.refTable) + '.' + esc(f.refCol) + '</code> मा पहिले नै हुनुपर्छ। यही नियमले दुई तालिका जोड्छ।</span></li>';
      });
    });
    return h + '</ul>';
  };

  TableViz.prototype.say = function (){
    var en = this.root.querySelector('.dt-say-en');
    var ne = this.root.querySelector('.dt-say-ne');
    if (!en) return;
    var term = null;
    for (var i = 0; i < TERMS.length; i++) if (TERMS[i].id === this.term) term = TERMS[i];

    if (!term){
      en.textContent = this.mode === 'vocab'
        ? 'Choose a term above. The table will show you what it points at.' : '';
      ne.textContent = this.mode === 'vocab'
        ? 'माथिबाट एउटा शब्द छान्नुहोस्। त्यसले तालिकामा के जनाउँछ देखिनेछ।' : '';
      return;
    }
    var t = this.table(this.names[0]);
    var extra = '', extraNe = '';
    if (term.id === 'degree'){ extra = ' Here the degree is ' + t.columns.length + '.'; extraNe = ' यहाँ डिग्री ' + t.columns.length + ' हो।'; }
    if (term.id === 'cardinality'){ extra = ' Here the cardinality is ' + t.rows.length + '.'; extraNe = ' यहाँ कार्डिनालिटी ' + t.rows.length + ' हो।'; }
    en.textContent = term.say.en + extra;
    ne.textContent = term.say.ne + extraNe;
  };

  TableViz.prototype.wire = function (){
    var self = this;
    var btns = this.root.querySelectorAll('[data-dt-term]');
    for (var i = 0; i < btns.length; i++){
      btns[i].addEventListener('click', function (){
        var id = this.getAttribute('data-dt-term');
        self.term = (self.term === id) ? null : id;   /* click again to clear */
        self.render();
        var again = self.root.querySelector('[data-dt-term="' + id + '"]');
        if (again) again.focus();
      });
    }
  };

  TableViz.prototype.reset = function (){ this.term = null; this.render(); };

  /* ---------------------------------------------------------------
     MOUNT
     --------------------------------------------------------------- */
  function mountAll(){
    if (typeof document === 'undefined') return;
    var nodes = document.querySelectorAll('.dbtable');
    for (var i = 0; i < nodes.length; i++){
      (function (root, n){
        if (root.getAttribute('data-mounted')) return;
        root.setAttribute('data-mounted', '1');
        var viz = new TableViz(root);
        root._viz = viz;
        if (global.SimulationService){
          global.SimulationService.register({
            id: 'dbtable:' + (root.id || ('dbtable' + n)),
            subject: 'grade10/dbms', unit: 'u3',
            title: { en: 'Relational table visualiser', ne: 'रिलेसनल तालिका भिजुअलाइजर' },
            mounts: function (){ return !!root.parentNode; },
            reset: function (){ viz.reset(); },
            controls: TERMS.map(function (t){
              return { id: t.id, label: { en: 'Show ' + t.label.en, ne: t.label.ne + ' देखाउनुहोस्' } };
            })
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

  global.DbTable = {
    SCHEMAS: SCHEMAS, TERMS: TERMS,
    render: renderTable, esc: esc, mount: mountAll, TableViz: TableViz
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = global.DbTable;

})(typeof window !== 'undefined' ? window : globalThis);
