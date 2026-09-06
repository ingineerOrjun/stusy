/* =========================================================
   SQL TEACHING ENGINE — Unit 4

   A hand-written tokeniser, parser and evaluator for the subset of SQL
   the CDC syllabus actually prescribes. No DOM, no globals beyond the
   one export, no dependencies. It is separated from the UI so it can be
   driven directly by tests: a student is told their query is wrong by
   this file, so this file has to be right.

   WHY NOT A REAL DATABASE
   Two reasons, and the second is the important one.

   1. A real engine (sql.js, an embedded WASM SQLite) is ~1 MB and
      violates the zero-dependency, offline-first architecture.

   2. A real engine answers the query. It cannot show a student WHY the
      answer is that. This engine returns a `trace` — the same query
      broken into the stages the syllabus teaches:

          FROM   →   WHERE   →   SELECT   →   ORDER BY
          which     which       which        in what
          table     rows        columns      order

      That trace is the lesson. Completeness is not.

   SCOPE — from docs/PHASE-4-DBMS-CURRICULUM-MAP.md §2, which checked
   the syllabus rather than assuming. Executed: SELECT (with WHERE,
   AND/OR, ORDER BY and the five joins), INSERT, UPDATE, DELETE, CREATE
   TABLE, DROP TABLE. Recognised but deliberately NOT executed: ALTER,
   RENAME, GRANT, REVOKE, WITH, CREATE VIEW — each answers with the
   reason it is not run, which is itself part of the teaching.

   NOT in the syllabus and therefore refused with an explanation rather
   than implemented: GROUP BY, HAVING, aggregate functions, DISTINCT,
   LIKE, BETWEEN, subqueries.

   SAFETY — the input is a student's typing, and is treated as hostile
   even though it never leaves the browser:
     - no eval, no Function, no template execution of any kind
     - the parser only ever produces a fixed set of node shapes
     - identifiers are resolved against the loaded schema; an unknown
       name is an error, never a property lookup on a live object
     - values are literals: numbers and single-quoted strings only
     - the engine returns data, never markup. Escaping is the UI's job
       and is done there.
   ========================================================= */
(function (global) {
  'use strict';

  /* ---------------------------------------------------------------
     1. TOKENISER
     --------------------------------------------------------------- */

  var KEYWORDS = [
    'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'NOT', 'ORDER', 'BY', 'ASC', 'DESC',
    'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE',
    'CREATE', 'TABLE', 'DROP', 'ALTER', 'RENAME', 'VIEW', 'AS',
    'GRANT', 'REVOKE', 'ON', 'TO', 'WITH',
    'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'OUTER', 'NATURAL',
    'PRIMARY', 'KEY', 'INT', 'INTEGER', 'VARCHAR', 'CHAR', 'TEXT', 'DATE', 'NULL'
  ];
  var KEYSET = {};
  for (var ki = 0; ki < KEYWORDS.length; ki++) KEYSET[KEYWORDS[ki]] = true;

  /* Longest first, so `<=` is never read as `<` then `=`. */
  var OPERATORS = ['<=', '>=', '<>', '!=', '=', '<', '>'];

  function tokenize(sql){
    var out = [], i = 0, n = sql.length;

    while (i < n){
      var ch = sql.charAt(i);

      if (ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r'){ i++; continue; }

      /* -- comment to end of line */
      if (ch === '-' && sql.charAt(i + 1) === '-'){
        while (i < n && sql.charAt(i) !== '\n') i++;
        continue;
      }

      if (ch === ';'){ out.push({ t: 'semi', v: ';', at: i }); i++; continue; }
      if (ch === ',' || ch === '(' || ch === ')' || ch === '*' || ch === '.'){
        out.push({ t: 'punct', v: ch, at: i }); i++; continue;
      }

      /* string literal — doubled quote is an escaped quote */
      if (ch === "'"){
        var s = '', j = i + 1, closed = false;
        while (j < n){
          if (sql.charAt(j) === "'"){
            if (sql.charAt(j + 1) === "'"){ s += "'"; j += 2; continue; }
            closed = true; j++; break;
          }
          s += sql.charAt(j); j++;
        }
        if (!closed) return { error: { code: 'unterminated-string', at: i } };
        out.push({ t: 'string', v: s, at: i });
        i = j; continue;
      }

      if (ch >= '0' && ch <= '9'){
        var num = '';
        while (i < n && ((sql.charAt(i) >= '0' && sql.charAt(i) <= '9') || sql.charAt(i) === '.')){
          num += sql.charAt(i); i++;
        }
        out.push({ t: 'number', v: parseFloat(num), at: i });
        continue;
      }

      var op = null;
      for (var o = 0; o < OPERATORS.length; o++){
        if (sql.substr(i, OPERATORS[o].length) === OPERATORS[o]){ op = OPERATORS[o]; break; }
      }
      if (op){ out.push({ t: 'op', v: op, at: i }); i += op.length; continue; }

      if (/[A-Za-z_]/.test(ch)){
        var w = '';
        while (i < n && /[A-Za-z0-9_]/.test(sql.charAt(i))){ w += sql.charAt(i); i++; }
        var up = w.toUpperCase();
        out.push(KEYSET[up] ? { t: 'kw', v: up, at: i - w.length }
                            : { t: 'name', v: w, at: i - w.length });
        continue;
      }

      return { error: { code: 'bad-character', char: ch, at: i } };
    }

    out.push({ t: 'eof', v: '', at: n });
    return { tokens: out };
  }

  /* ---------------------------------------------------------------
     2. PARSER

     Recursive descent. Every production returns a plain object with a
     fixed shape; nothing is constructed from student text except
     identifier and literal VALUES, which are resolved against the
     schema before they are ever used.
     --------------------------------------------------------------- */

  /* Statements the syllabus names but this engine deliberately does not
     execute. Each carries the reason, because "not supported" teaches
     nothing and the reason teaches the topic. */
  var EXPLAINED = {
    ALTER:  { topic: '4.2', key: 'alter' },
    RENAME: { topic: '4.2', key: 'rename' },
    GRANT:  { topic: '4.4', key: 'dcl' },
    REVOKE: { topic: '4.4', key: 'dcl' },
    WITH:   { topic: '4.5', key: 'with' }
  };

  /* Standard SQL the syllabus does not include. Refused with the reason,
     so a student who has seen it elsewhere is not left confused. */
  var OUT_OF_SYLLABUS = {
    'GROUP': 'group-by', 'HAVING': 'having', 'DISTINCT': 'distinct',
    'LIKE': 'like', 'BETWEEN': 'between', 'UNION': 'union'
  };

  function Parser(tokens){ this.k = tokens; this.p = 0; }

  Parser.prototype.peek = function (){ return this.k[this.p]; };
  Parser.prototype.next = function (){ return this.k[this.p++]; };
  Parser.prototype.isKw = function (v){ var t = this.peek(); return t.t === 'kw' && t.v === v; };
  Parser.prototype.isPunct = function (v){ var t = this.peek(); return t.t === 'punct' && t.v === v; };

  Parser.prototype.eatKw = function (v){
    if (this.isKw(v)){ this.p++; return true; }
    return false;
  };
  Parser.prototype.expectKw = function (v){
    if (!this.eatKw(v)) throw parseError('expected-keyword', { expected: v, got: this.peek() });
    return true;
  };
  Parser.prototype.expectPunct = function (v){
    if (this.isPunct(v)){ this.p++; return true; }
    throw parseError('expected-punct', { expected: v, got: this.peek() });
  };
  Parser.prototype.expectName = function (what){
    var t = this.peek();
    if (t.t === 'name'){ this.p++; return t.v; }
    throw parseError('expected-name', { what: what, got: t });
  };

  function parseError(code, info){
    var e = new Error(code);
    e.sqlCode = code;
    e.info = info || {};
    return e;
  }

  /* A column reference: `name` or `table.name`. */
  Parser.prototype.columnRef = function (){
    var first = this.expectName('a column name');
    if (this.isPunct('.')){
      this.p++;
      var col = this.expectName('a column name');
      return { table: first, col: col };
    }
    return { table: null, col: first };
  };

  Parser.prototype.value = function (){
    var t = this.peek();
    if (t.t === 'number'){ this.p++; return { kind: 'num', v: t.v }; }
    if (t.t === 'string'){ this.p++; return { kind: 'str', v: t.v }; }
    if (t.t === 'kw' && t.v === 'NULL'){ this.p++; return { kind: 'null', v: null }; }
    throw parseError('expected-value', { got: t });
  };

  /* condition := term (AND|OR term)*    term := '(' condition ')' | comparison
     Left-associative, AND binding tighter than OR — the standard
     precedence, and the one a student's reading of the query assumes. */
  Parser.prototype.condition = function (){
    var left = this.conjunction();
    while (this.isKw('OR')){
      this.p++;
      var right = this.conjunction();
      left = { kind: 'or', left: left, right: right };
    }
    return left;
  };
  Parser.prototype.conjunction = function (){
    var left = this.comparison();
    while (this.isKw('AND')){
      this.p++;
      var right = this.comparison();
      left = { kind: 'and', left: left, right: right };
    }
    return left;
  };
  Parser.prototype.comparison = function (){
    if (this.isPunct('(')){
      this.p++;
      var inner = this.condition();
      this.expectPunct(')');
      return inner;
    }
    var col = this.columnRef();
    var t = this.peek();
    if (t.t !== 'op') throw parseError('expected-operator', { got: t });
    this.p++;
    var val = this.value();
    return { kind: 'cmp', col: col, op: t.v, val: val };
  };

  /* Function-call shape in a select list. The syllabus has no aggregate
     functions (curriculum map §2), so `COUNT(*)` must say so plainly —
     a student who has seen it elsewhere deserves the reason, not a
     parser complaining that it expected FROM. */
  var AGGREGATES = { COUNT: 1, SUM: 1, AVG: 1, MIN: 1, MAX: 1 };

  Parser.prototype.selectList = function (){
    if (this.isPunct('*')){ this.p++; return { all: true, cols: [] }; }
    var cols = [];
    do {
      var ahead = this.peek();
      if (ahead.t === 'name' && this.k[this.p + 1] &&
          this.k[this.p + 1].t === 'punct' && this.k[this.p + 1].v === '('){
        var fn = ahead.v.toUpperCase();
        throw parseError('out-of-syllabus-function', {
          key: AGGREGATES[fn] ? 'aggregate' : 'function', name: ahead.v
        });
      }
      cols.push(this.columnRef());
    } while (this.isPunct(',') && (this.p++, true));
    return { all: false, cols: cols };
  };

  Parser.prototype.fromClause = function (){
    var base = this.expectName('a table name');
    var joins = [];
    for (;;){
      var type = null;
      if (this.isKw('NATURAL')){ this.p++; this.expectKw('JOIN'); type = 'natural'; }
      else if (this.isKw('INNER')){ this.p++; this.expectKw('JOIN'); type = 'inner'; }
      else if (this.isKw('LEFT')){ this.p++; this.eatKw('OUTER'); this.expectKw('JOIN'); type = 'left'; }
      else if (this.isKw('RIGHT')){ this.p++; this.eatKw('OUTER'); this.expectKw('JOIN'); type = 'right'; }
      else if (this.isKw('FULL')){ this.p++; this.eatKw('OUTER'); this.expectKw('JOIN'); type = 'full'; }
      else if (this.isKw('JOIN')){ this.p++; type = 'inner'; }
      else break;

      var table = this.expectName('a table name');
      var on = null;
      if (this.eatKw('ON')){
        var l = this.columnRef();
        var t = this.peek();
        if (t.t !== 'op' || t.v !== '=') throw parseError('join-on-equality', { got: t });
        this.p++;
        var r = this.columnRef();
        on = { left: l, right: r };
      } else if (type !== 'natural'){
        throw parseError('join-needs-on', { table: table });
      }
      joins.push({ type: type, table: table, on: on });
    }
    return { base: base, joins: joins };
  };

  Parser.prototype.orderBy = function (){
    this.expectKw('BY');
    var col = this.columnRef();
    var dir = 'asc';
    if (this.eatKw('DESC')) dir = 'desc';
    else this.eatKw('ASC');
    return { col: col, dir: dir };
  };

  Parser.prototype.statement = function (){
    var t = this.peek();

    if (t.t === 'kw' && EXPLAINED[t.v]) return { kind: 'explained', statement: t.v, why: EXPLAINED[t.v] };
    if (t.t === 'kw' && OUT_OF_SYLLABUS[t.v]) return { kind: 'out-of-syllabus', statement: t.v, key: OUT_OF_SYLLABUS[t.v] };

    if (this.eatKw('SELECT')){
      var sel = this.selectList();
      this.expectKw('FROM');
      var from = this.fromClause();
      var where = null, order = null;
      if (this.eatKw('WHERE')) where = this.condition();
      if (this.eatKw('ORDER')) order = this.orderBy();
      this.finish();
      return { kind: 'select', select: sel, from: from, where: where, order: order };
    }

    if (this.eatKw('INSERT')){
      this.expectKw('INTO');
      var itable = this.expectName('a table name');
      var icols = null;
      if (this.isPunct('(')){
        this.p++; icols = [];
        do { icols.push(this.expectName('a column name')); } while (this.isPunct(',') && (this.p++, true));
        this.expectPunct(')');
      }
      this.expectKw('VALUES');
      this.expectPunct('(');
      var vals = [];
      do { vals.push(this.value()); } while (this.isPunct(',') && (this.p++, true));
      this.expectPunct(')');
      this.finish();
      return { kind: 'insert', table: itable, cols: icols, vals: vals };
    }

    if (this.eatKw('UPDATE')){
      var utable = this.expectName('a table name');
      this.expectKw('SET');
      var sets = [];
      do {
        var c = this.expectName('a column name');
        var eq = this.peek();
        if (eq.t !== 'op' || eq.v !== '=') throw parseError('expected-operator', { got: eq });
        this.p++;
        sets.push({ col: c, val: this.value() });
      } while (this.isPunct(',') && (this.p++, true));
      var uwhere = null;
      if (this.eatKw('WHERE')) uwhere = this.condition();
      this.finish();
      return { kind: 'update', table: utable, sets: sets, where: uwhere };
    }

    if (this.eatKw('DELETE')){
      this.expectKw('FROM');
      var dtable = this.expectName('a table name');
      var dwhere = null;
      if (this.eatKw('WHERE')) dwhere = this.condition();
      this.finish();
      return { kind: 'delete', table: dtable, where: dwhere };
    }

    if (this.eatKw('CREATE')){
      if (this.isKw('VIEW')) return { kind: 'explained', statement: 'CREATE VIEW', why: { topic: '4.7', key: 'view' } };
      this.expectKw('TABLE');
      var ctable = this.expectName('a table name');
      this.expectPunct('(');
      var defs = [];
      do {
        var cname = this.expectName('a column name');
        var ty = this.peek();
        var typeName = 'TEXT';
        if (ty.t === 'kw'){ typeName = ty.v; this.p++; }
        else if (ty.t === 'name'){ typeName = ty.v.toUpperCase(); this.p++; }
        if (this.isPunct('(')){                       /* VARCHAR(30) */
          this.p++;
          if (this.peek().t === 'number') this.p++;
          this.expectPunct(')');
        }
        var pk = false;
        if (this.eatKw('PRIMARY')){ this.expectKw('KEY'); pk = true; }
        defs.push({ col: cname, type: typeName, pk: pk });
      } while (this.isPunct(',') && (this.p++, true));
      this.expectPunct(')');
      this.finish();
      return { kind: 'create', table: ctable, defs: defs };
    }

    if (this.eatKw('DROP')){
      this.expectKw('TABLE');
      var dropped = this.expectName('a table name');
      this.finish();
      return { kind: 'drop', table: dropped };
    }

    throw parseError('unknown-statement', { got: t });
  };

  Parser.prototype.finish = function (){
    if (this.isPunct(';') || this.peek().t === 'semi') this.p++;
    var t = this.peek();
    if (t.t !== 'eof'){
      if (t.t === 'kw' && OUT_OF_SYLLABUS[t.v]) throw parseError('out-of-syllabus-clause', { key: OUT_OF_SYLLABUS[t.v], word: t.v });
      throw parseError('trailing-input', { got: t });
    }
  };

  /* ---------------------------------------------------------------
     3. EVALUATOR
     --------------------------------------------------------------- */

  function cloneDb(db){
    var out = Object.create(null);
    for (var name in db){
      if (!Object.prototype.hasOwnProperty.call(db, name)) continue;
      var t = db[name];
      out[name] = {
        columns: t.columns.slice(),
        pk: t.pk || null,
        fk: t.fk ? JSON.parse(JSON.stringify(t.fk)) : null,
        rows: t.rows.map(function (r){ return r.slice(); })
      };
    }
    return out;
  }

  /* A row during evaluation is a flat map of qualified and bare names,
     so `s.id` and `id` both resolve while a join is in progress.

     Object.create(null), not {}: a plain object inherits from
     Object.prototype, so `'constructor' in map` is true and
     `SELECT constructor FROM Student` would resolve to a function
     rather than being rejected. Found by a test that tried it. */
  function rowMap(table, tableName, row){
    var m = Object.create(null);
    for (var i = 0; i < table.columns.length; i++){
      m[tableName + '.' + table.columns[i]] = row[i];
      if (!(table.columns[i] in m)) m[table.columns[i]] = row[i];
    }
    return m;
  }

  function lookup(map, ref, avail){
    var key = ref.table ? ref.table + '.' + ref.col : ref.col;
    if (key in map) return map[key];
    throw evalError('unknown-column', { name: key, available: avail });
  }

  function evalError(code, info){
    var e = new Error(code);
    e.sqlCode = code;
    e.info = info || {};
    return e;
  }

  function compare(a, b, op){
    if (a === null || b === null) return false;      /* SQL: NULL compares to nothing */
    var x = a, y = b;
    if (typeof x === 'string' && typeof y === 'number') y = String(y);
    if (typeof x === 'number' && typeof y === 'string') x = String(x);
    switch (op){
      case '=':  return x === y;
      case '<>': case '!=': return x !== y;
      case '<':  return x < y;
      case '<=': return x <= y;
      case '>':  return x > y;
      case '>=': return x >= y;
    }
    return false;
  }

  function testCond(cond, map, avail){
    if (!cond) return true;
    if (cond.kind === 'and') return testCond(cond.left, map, avail) && testCond(cond.right, map, avail);
    if (cond.kind === 'or')  return testCond(cond.left, map, avail) || testCond(cond.right, map, avail);
    return compare(lookup(map, cond.col, avail), cond.val.v, cond.op);
  }

  function condText(cond){
    if (!cond) return '';
    if (cond.kind === 'and') return condText(cond.left) + ' AND ' + condText(cond.right);
    if (cond.kind === 'or')  return '(' + condText(cond.left) + ' OR ' + condText(cond.right) + ')';
    var ref = cond.col.table ? cond.col.table + '.' + cond.col.col : cond.col.col;
    var v = cond.val.kind === 'str' ? "'" + cond.val.v + "'" : String(cond.val.v);
    return ref + ' ' + cond.op + ' ' + v;
  }

  function needTable(db, name){
    if (!Object.prototype.hasOwnProperty.call(db, name) || !db[name]){
      throw evalError('unknown-table', { name: name, available: Object.keys(db) });
    }
    return db[name];
  }

  /* Build the working set the query reads from: one table, or a join.
     Returns { columns, rows, note } where columns are qualified. */
  function buildSource(db, from, trace){
    var base = needTable(db, from.base);
    var cols = base.columns.map(function (c){ return { table: from.base, col: c }; });
    var rows = base.rows.map(function (r){ return r.slice(); });

    trace.push({
      stage: 'from', table: from.base,
      en: 'Start with every row of ' + from.base + '.',
      ne: from.base + ' का सबै पङ्क्तिबाट सुरु गर्नुहोस्।',
      rows: rows.length
    });

    for (var j = 0; j < from.joins.length; j++){
      var jo = from.joins[j];
      var right = needTable(db, jo.table);
      var rightCols = right.columns.map(function (c){ return { table: jo.table, col: c }; });

      var on = jo.on;
      if (jo.type === 'natural'){
        /* A natural join matches on every column the two tables share.
           If they share none, it degenerates to a cross product — which
           is the thing worth showing a student, not hiding. */
        var shared = base.columns.filter(function (c){ return right.columns.indexOf(c) !== -1; });
        if (!shared.length) throw evalError('natural-join-no-shared-column', { a: from.base, b: jo.table });
        on = { left: { table: from.base, col: shared[0] }, right: { table: jo.table, col: shared[0] } };
      }

      var merged = [], matchedRight = {};
      var li = indexOfCol(cols, on.left), ri = indexOfCol(rightCols, on.right);
      if (li < 0) throw evalError('unknown-column', { name: on.left.table + '.' + on.left.col, available: cols.map(qual) });
      if (ri < 0) throw evalError('unknown-column', { name: on.right.table + '.' + on.right.col, available: rightCols.map(qual) });

      for (var a = 0; a < rows.length; a++){
        var hit = false;
        for (var b = 0; b < right.rows.length; b++){
          if (compare(rows[a][li], right.rows[b][ri], '=')){
            merged.push(rows[a].concat(right.rows[b]));
            hit = true; matchedRight[b] = true;
          }
        }
        if (!hit && (jo.type === 'left' || jo.type === 'full')){
          merged.push(rows[a].concat(right.columns.map(function (){ return null; })));
        }
      }
      if (jo.type === 'right' || jo.type === 'full'){
        for (var c2 = 0; c2 < right.rows.length; c2++){
          if (!matchedRight[c2]){
            merged.push(cols.map(function (){ return null; }).concat(right.rows[c2]));
          }
        }
      }

      trace.push({
        stage: 'join', type: jo.type, table: jo.table,
        en: joinSentenceEn(jo.type, from.base, jo.table),
        ne: joinSentenceNe(jo.type, from.base, jo.table),
        rows: merged.length
      });

      cols = cols.concat(rightCols);
      rows = merged;
    }

    return { columns: cols, rows: rows };
  }

  function qual(c){ return c.table + '.' + c.col; }
  function indexOfCol(cols, ref){
    for (var i = 0; i < cols.length; i++){
      if (cols[i].col === ref.col && (!ref.table || cols[i].table === ref.table)) return i;
    }
    return -1;
  }

  function joinSentenceEn(type, a, b){
    if (type === 'inner')   return 'Keep only rows where a ' + a + ' row and a ' + b + ' row match.';
    if (type === 'left')    return 'Keep every ' + a + ' row; where ' + b + ' has no match, fill with NULL.';
    if (type === 'right')   return 'Keep every ' + b + ' row; where ' + a + ' has no match, fill with NULL.';
    if (type === 'full')    return 'Keep every row from both tables, filling the missing side with NULL.';
    return 'Match on the column both tables share.';
  }
  function joinSentenceNe(type, a, b){
    if (type === 'inner')   return a + ' र ' + b + ' दुवैमा मिल्ने पङ्क्ति मात्र राख्नुहोस्।';
    if (type === 'left')    return a + ' का सबै पङ्क्ति राख्नुहोस्; ' + b + ' मा नमिले NULL राख्नुहोस्।';
    if (type === 'right')   return b + ' का सबै पङ्क्ति राख्नुहोस्; ' + a + ' मा नमिले NULL राख्नुहोस्।';
    if (type === 'full')    return 'दुवै तालिकाका सबै पङ्क्ति राख्नुहोस्, नभएको तर्फ NULL।';
    return 'दुवै तालिकामा साझा भएको स्तम्भमा मिलाउनुहोस्।';
  }

  function run(ast, db, trace){
    var i, t;

    if (ast.kind === 'select'){
      var src = buildSource(db, ast.from, trace);
      var joined = ast.from.joins.length > 0;
      var avail = src.columns.map(qual);

      /* WHERE — filter rows */
      var kept = src.rows, filteredOut = 0;
      if (ast.where){
        kept = [];
        for (i = 0; i < src.rows.length; i++){
          var m = Object.create(null);
          for (var c = 0; c < src.columns.length; c++){
            m[qual(src.columns[c])] = src.rows[i][c];
            if (!(src.columns[c].col in m)) m[src.columns[c].col] = src.rows[i][c];
          }
          if (testCond(ast.where, m, avail)) kept.push(src.rows[i]);
        }
        filteredOut = src.rows.length - kept.length;
        trace.push({
          stage: 'where', text: condText(ast.where),
          en: 'Keep only the rows where ' + condText(ast.where) + '. ' +
              filteredOut + ' of ' + src.rows.length + ' rows are dropped.',
          ne: condText(ast.where) + ' हुने पङ्क्ति मात्र राख्नुहोस्। ' +
              src.rows.length + ' मध्ये ' + filteredOut + ' हट्छन्।',
          rows: kept.length
        });
      }

      /* SELECT — choose columns */
      var outCols, idx;
      if (ast.select.all){
        outCols = src.columns.map(function (x){ return joined ? qual(x) : x.col; });
        idx = src.columns.map(function (_, k){ return k; });
      } else {
        outCols = []; idx = [];
        for (i = 0; i < ast.select.cols.length; i++){
          var k2 = indexOfCol(src.columns, ast.select.cols[i]);
          if (k2 < 0) throw evalError('unknown-column', {
            name: ast.select.cols[i].table ? qual(ast.select.cols[i]) : ast.select.cols[i].col,
            available: avail
          });
          idx.push(k2);
          outCols.push(joined ? qual(src.columns[k2]) : src.columns[k2].col);
        }
      }
      trace.push({
        stage: 'select', columns: outCols.slice(),
        en: ast.select.all ? 'Keep every column.' : 'Keep only these columns: ' + outCols.join(', ') + '.',
        ne: ast.select.all ? 'सबै स्तम्भ राख्नुहोस्।' : 'यी स्तम्भ मात्र राख्नुहोस्: ' + outCols.join(', ') + '।',
        rows: kept.length
      });

      /* ORDER BY is applied to the rows BEFORE projection, so a query
         may sort by a column it does not display —
         `SELECT name FROM Student ORDER BY marks` is legal SQL, and an
         engine that refused it would teach a rule that does not exist.
         The trace still reports it last, because that is the order the
         syllabus teaches the pipeline in. */
      var ordered = kept;
      if (ast.order){
        var si = indexOfCol(src.columns, ast.order.col);
        if (si < 0) throw evalError('unknown-column', {
          name: ast.order.col.col, available: avail
        });
        var dir = ast.order.dir === 'desc' ? -1 : 1;
        ordered = kept.slice().sort(function (x, y){
          var a2 = x[si], b2 = y[si];
          if (a2 === null) return 1;
          if (b2 === null) return -1;
          if (a2 === b2) return 0;
          return (a2 < b2 ? -1 : 1) * dir;
        });
      }

      var projected = ordered.map(function (r){ return idx.map(function (k){ return r[k]; }); });

      if (ast.order){
        trace.push({
          stage: 'order', column: ast.order.col.col, dir: ast.order.dir,
          en: 'Sort the result by ' + ast.order.col.col + ', ' +
              (ast.order.dir === 'desc' ? 'largest first' : 'smallest first') + '.',
          ne: ast.order.col.col + ' अनुसार ' +
              (ast.order.dir === 'desc' ? 'ठूलोदेखि सानो' : 'सानोदेखि ठूलो') + ' क्रममा लगाउनुहोस्।',
          rows: projected.length
        });
      }

      return { kind: 'result', columns: outCols, rows: projected, changed: false };
    }

    if (ast.kind === 'insert'){
      t = needTable(db, ast.table);
      var order = ast.cols || t.columns;
      for (i = 0; i < order.length; i++){
        if (t.columns.indexOf(order[i]) < 0){
          throw evalError('unknown-column', { name: order[i], available: t.columns });
        }
      }
      if (order.length !== ast.vals.length){
        throw evalError('insert-count-mismatch', { cols: order.length, vals: ast.vals.length });
      }
      var newRow = t.columns.map(function (){ return null; });
      for (i = 0; i < order.length; i++) newRow[t.columns.indexOf(order[i])] = ast.vals[i].v;

      if (t.pk){
        var pkIdx = t.columns.indexOf(t.pk);
        for (i = 0; i < t.rows.length; i++){
          if (t.rows[i][pkIdx] === newRow[pkIdx]){
            throw evalError('duplicate-primary-key', { key: t.pk, value: newRow[pkIdx] });
          }
        }
      }
      t.rows.push(newRow);
      trace.push({
        stage: 'insert', table: ast.table,
        en: 'Add one row to ' + ast.table + '. It now has ' + t.rows.length + ' rows.',
        ne: ast.table + ' मा एउटा पङ्क्ति थपियो। अब ' + t.rows.length + ' पङ्क्ति छन्।',
        rows: t.rows.length
      });
      return { kind: 'table', table: ast.table, affected: 1, changed: true };
    }

    if (ast.kind === 'update'){
      t = needTable(db, ast.table);
      var n = 0;
      for (i = 0; i < t.rows.length; i++){
        var mm = rowMap(t, ast.table, t.rows[i]);
        if (testCond(ast.where, mm, t.columns)){
          for (var s = 0; s < ast.sets.length; s++){
            var ci = t.columns.indexOf(ast.sets[s].col);
            if (ci < 0) throw evalError('unknown-column', { name: ast.sets[s].col, available: t.columns });
            t.rows[i][ci] = ast.sets[s].val.v;
          }
          n++;
        }
      }
      trace.push({
        stage: 'update', table: ast.table,
        en: ast.where ? 'Change only the rows where ' + condText(ast.where) + '. ' + n + ' rows changed.'
                      : 'No WHERE clause, so EVERY row changed — ' + n + ' of them.',
        ne: ast.where ? condText(ast.where) + ' हुने पङ्क्ति मात्र बदलियो — ' + n + ' वटा।'
                      : 'WHERE नभएकाले सबै पङ्क्ति बदलिए — ' + n + ' वटा।',
        rows: n, warnAll: !ast.where
      });
      return { kind: 'table', table: ast.table, affected: n, changed: true };
    }

    if (ast.kind === 'delete'){
      t = needTable(db, ast.table);
      var before = t.rows.length;
      t.rows = t.rows.filter(function (r){
        return !testCond(ast.where, rowMap(t, ast.table, r), t.columns);
      });
      var removed = before - t.rows.length;
      trace.push({
        stage: 'delete', table: ast.table,
        en: ast.where ? 'Remove the rows where ' + condText(ast.where) + '. ' + removed + ' rows removed, the table still exists.'
                      : 'No WHERE clause, so every row is removed — but the TABLE still exists. That is the difference from DROP.',
        ne: ast.where ? condText(ast.where) + ' हुने पङ्क्ति हटाइयो — ' + removed + ' वटा। तालिका भने रहन्छ।'
                      : 'WHERE नभएकाले सबै पङ्क्ति हट्यो — तर तालिका रहन्छ। DROP सँगको फरक यही हो।',
        rows: removed, warnAll: !ast.where
      });
      return { kind: 'table', table: ast.table, affected: removed, changed: true };
    }

    if (ast.kind === 'create'){
      if (db[ast.table]) throw evalError('table-exists', { name: ast.table });
      var pkCol = null;
      for (i = 0; i < ast.defs.length; i++) if (ast.defs[i].pk) pkCol = ast.defs[i].col;
      db[ast.table] = {
        columns: ast.defs.map(function (d){ return d.col; }),
        types: ast.defs.map(function (d){ return d.type; }),
        pk: pkCol, fk: null, rows: []
      };
      trace.push({
        stage: 'create', table: ast.table,
        en: 'Create an empty table ' + ast.table + ' with ' + ast.defs.length + ' columns. Structure only — no rows yet.',
        ne: ast.table + ' नामको खाली तालिका बन्यो, ' + ast.defs.length + ' स्तम्भसहित। संरचना मात्र — पङ्क्ति छैनन्।',
        rows: 0
      });
      return { kind: 'table', table: ast.table, affected: 0, changed: true };
    }

    if (ast.kind === 'drop'){
      needTable(db, ast.table);
      delete db[ast.table];
      trace.push({
        stage: 'drop', table: ast.table,
        en: 'Remove the table ' + ast.table + ' completely — its rows AND its structure. DELETE would have left the structure.',
        ne: ast.table + ' तालिका पूरै हट्यो — पङ्क्ति र संरचना दुवै। DELETE ले संरचना छाड्थ्यो।',
        rows: 0, warnAll: true
      });
      return { kind: 'dropped', table: ast.table, affected: 0, changed: true };
    }

    throw evalError('unknown-statement', {});
  }

  /* ---------------------------------------------------------------
     4. PUBLIC ENTRY POINT

     Never throws. A student's typo is a normal outcome, not an
     exception, and the message is part of the lesson.
     --------------------------------------------------------------- */
  function execute(sql, db){
    var text = String(sql == null ? '' : sql);
    if (!text.trim()) return { ok: false, error: { code: 'empty' } };

    var lex = tokenize(text);
    if (lex.error) return { ok: false, error: lex.error };

    var ast;
    try {
      ast = new Parser(lex.tokens).statement();
    } catch (e){
      if (!e.sqlCode) throw e;
      return { ok: false, error: { code: e.sqlCode, info: e.info } };
    }

    if (ast.kind === 'explained')       return { ok: false, error: { code: 'not-executed', info: ast } };
    if (ast.kind === 'out-of-syllabus') return { ok: false, error: { code: 'out-of-syllabus', info: ast } };

    var working = cloneDb(db);        /* never mutate the caller's database */
    var trace = [];
    try {
      var res = run(ast, working, trace);
      return { ok: true, kind: ast.kind, result: res, trace: trace, db: working };
    } catch (e2){
      if (!e2.sqlCode) throw e2;
      return { ok: false, error: { code: e2.sqlCode, info: e2.info }, trace: trace };
    }
  }

  var SQLEngine = {
    execute: execute,
    tokenize: tokenize,
    parse: function (sql){
      var lex = tokenize(sql);
      if (lex.error) return { ok: false, error: lex.error };
      try { return { ok: true, ast: new Parser(lex.tokens).statement() }; }
      catch (e){ if (!e.sqlCode) throw e; return { ok: false, error: { code: e.sqlCode, info: e.info } }; }
    },
    /* Declared so the UI and the tests read the same list. */
    SUPPORTED: ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'CREATE TABLE', 'DROP TABLE'],
    EXPLAINED: EXPLAINED,
    OUT_OF_SYLLABUS: OUT_OF_SYLLABUS
  };

  global.SQLEngine = SQLEngine;
  if (typeof module !== 'undefined' && module.exports) module.exports = SQLEngine;

})(typeof window !== 'undefined' ? window : globalThis);
