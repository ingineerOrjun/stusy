/* =========================================================
   KARNAUGH MAP — Unit 3

       set the cells  →  drag out a group  →  the tool JUDGES it
                      →  says why it is legal or not
                      →  names the term it produces
                      →  collects the terms into the simplified expression

   The brief for this component was explicit: not a click game. So the
   rules are not decoration around a scripted answer — every group the
   student draws is checked against the four real conditions:

     1. it contains only 1s
     2. its size is a power of two
     3. it is a rectangle (including wrap-around at the edges)
     4. it is as large as it can be

   and the tool says which one failed. A student who is told "that group
   of 3 is not allowed because a group must be 1, 2, 4 or 8 cells" has
   learned the rule. A tool that silently refuses has taught nothing.

   GRAY CODE
   The column and row headings run 00, 01, 11, 10 — not 00, 01, 10, 11.
   That single change is why adjacency works: neighbours differ by one
   variable, so a pair of adjacent 1s always cancels exactly one
   variable. The map is labelled with that fact rather than assuming it.

   MARKUP CONTRACT
     <div class="kmap" data-vars="3" data-minterms="0,1,2,5,7"></div>
   ========================================================= */
(function (global) {
  'use strict';

  var GRAY = ['00', '01', '11', '10'];

  /* ---------------------------------------------------------------
     Map geometry.
       2 vars: 2x2   rows = A        cols = B
       3 vars: 2x4   rows = A        cols = BC (gray)
       4 vars: 4x4   rows = AB(gray) cols = CD (gray)
     --------------------------------------------------------------- */
  function geometry(vars){
    if (vars === 2) return { rows: 2, cols: 2, rowBits: ['0', '1'], colBits: ['0', '1'],
                             rowVars: 'A', colVars: 'B' };
    if (vars === 3) return { rows: 2, cols: 4, rowBits: ['0', '1'], colBits: GRAY,
                             rowVars: 'A', colVars: 'BC' };
    return { rows: 4, cols: 4, rowBits: GRAY, colBits: GRAY, rowVars: 'AB', colVars: 'CD' };
  }

  /* The minterm number of a cell is its row bits followed by its column
     bits, read as a plain binary number — which is exactly why the
     headings must be in Gray code and the minterms must not be. */
  function mintermAt(g, r, c){
    return parseInt(g.rowBits[r] + g.colBits[c], 2);
  }

  function esc(s){
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function KMap(root){
    this.root = root;
    this.vars = Math.min(Math.max(parseInt(root.getAttribute('data-vars'), 10) || 3, 2), 4);
    this.g = geometry(this.vars);
    this.names = this.vars === 2 ? ['A', 'B']
               : this.vars === 3 ? ['A', 'B', 'C'] : ['A', 'B', 'C', 'D'];

    var seed = (root.getAttribute('data-minterms') || '').split(',')
      .map(function (s){ return parseInt(s.trim(), 10); })
      .filter(function (n){ return !isNaN(n) && n >= 0 && n < (1 << this.vars); }, this);
    this.ones = new Set(seed);

    this.sel = new Set();          // cell keys "r,c" currently selected
    this.groups = [];              // accepted groups
    this.render();
  }

  KMap.prototype.key = function (r, c){ return r + ',' + c; };

  KMap.prototype.render = function (){
    var g = this.g, r, c;
    var h = '<div class="km-head"><span class="km-vars t-en">' +
            this.vars + '-variable map &nbsp;·&nbsp; ' + this.names.join(', ') +
            '</span><span class="np-cell" lang="ne">' + this.vars +
            ' चल भएको के–म्याप</span></div>';

    h += '<div class="km-wrap"><table class="km-grid"><caption class="km-cap">' +
         '<span class="t-en">Columns are ' + g.colVars + ', rows are ' + g.rowVars +
         ' — headings run in Gray code so neighbours differ by one variable</span>' +
         '<span class="np-cell" lang="ne">स्तम्भ ' + g.colVars + ', पङ्क्ति ' + g.rowVars +
         ' — छिमेकी कक्षमा एउटै चल फरक होस् भनेर हेडिङ Gray code मा छन्</span></caption>';

    h += '<tr><th class="km-corner"><span>' + g.rowVars + '</span><span>' + g.colVars + '</span></th>';
    for (c = 0; c < g.cols; c++) h += '<th scope="col" class="km-h">' + g.colBits[c] + '</th>';
    h += '</tr>';

    for (r = 0; r < g.rows; r++){
      h += '<tr><th scope="row" class="km-h">' + g.rowBits[r] + '</th>';
      for (c = 0; c < g.cols; c++){
        var m = mintermAt(g, r, c);
        h += '<td class="km-cell" data-km-cell="' + this.key(r, c) + '" data-m="' + m + '">' +
             '<button type="button" class="km-btn" aria-pressed="false" ' +
             'aria-label="Cell for minterm ' + m + '">' +
             '<span class="km-v">0</span><span class="km-m">m' + m + '</span></button></td>';
      }
      h += '</tr>';
    }
    h += '</table></div>';

    h += '<div class="sim-controls">' +
         '<span class="sim-controls-label"><span class="t-en">Click a cell to set it to 1. Then select cells and check the group.</span>' +
         '<span class="np-cell" lang="ne">कक्ष थिचेर 1 बनाउनुहोस्। अनि कक्ष छानेर समूह जाँच्नुहोस्।</span></span>' +
         '<button type="button" data-km-act="mode" class="primary" data-ui="modeSet">Mode: set 1s</button>' +
         '<button type="button" data-km-act="check" data-ui="check">Check this group</button>' +
         '<button type="button" data-km-act="clearsel" data-ui="clear">Clear selection</button>' +
         '<button type="button" class="coral" data-km-act="reset" data-ui="reset">Reset</button></div>';

    h += '<div class="km-verdict" role="status"><span class="km-v-en t-en"></span>' +
         '<span class="km-v-ne np-cell" lang="ne"></span></div>';

    h += '<div class="km-result"><span class="km-r-lab"><span class="t-en">Simplified expression</span>' +
         '<span class="np-cell" lang="ne">सरलीकृत अभिव्यक्ति</span></span>' +
         '<output class="km-expr">—</output></div>';

    this.root.innerHTML = h;
    this.mode = 'set';
    this.update();
  };

  KMap.prototype.update = function (){
    var self = this, g = this.g;
    var cells = this.root.querySelectorAll('[data-km-cell]');
    for (var i = 0; i < cells.length; i++){
      var td = cells[i];
      var parts = td.getAttribute('data-km-cell').split(',');
      var r = Number(parts[0]), c = Number(parts[1]);
      var m = mintermAt(g, r, c);
      var one = this.ones.has(m);
      var selected = this.sel.has(this.key(r, c));
      td.classList.toggle('is-one', one);
      td.classList.toggle('is-selected', selected);
      td.classList.toggle('is-grouped', this.inGroup(r, c));
      var btn = td.querySelector('.km-btn');
      btn.querySelector('.km-v').textContent = one ? '1' : '0';
      btn.setAttribute('aria-pressed', one ? 'true' : 'false');
      btn.setAttribute('aria-label',
        'Minterm ' + m + ', value ' + (one ? 1 : 0) + (selected ? ', selected' : ''));
    }
    /* The label changes with the mode, so the key changes and the
       string service supplies the wording. */
    var modeBtn = this.root.querySelector('[data-km-act="mode"]');
    if (modeBtn){
      var key = this.mode === 'set' ? 'modeSet' : 'modeSelect';
      modeBtn.setAttribute('data-ui', key);
      modeBtn.textContent = (typeof UIStrings !== 'undefined')
        ? UIStrings.get(key)
        : (this.mode === 'set' ? 'Mode: set 1s' : 'Mode: select group');
    }

    var expr = this.root.querySelector('.km-expr');
    if (expr){
      expr.textContent = this.groups.length
        ? this.groups.map(function (x){ return x.term; }).join(' + ')
        : '—';
    }
    function noop(){ return self; }
    noop();
  };

  KMap.prototype.inGroup = function (r, c){
    var k = this.key(r, c);
    for (var i = 0; i < this.groups.length; i++){
      if (this.groups[i].cells.indexOf(k) > -1) return true;
    }
    return false;
  };

  /* ---------------------------------------------------------------
     The rules. Each returns a reason string when it fails, so the
     student is told which condition they broke rather than just "no".
     --------------------------------------------------------------- */
  KMap.prototype.judge = function (){
    var g = this.g, self = this;
    var keys = [...this.sel];
    if (!keys.length){
      return { ok: false,
        en: 'Nothing is selected. Switch to "select group" mode and click the cells you want to group.',
        ne: 'केही छानिएको छैन। "select group" मोडमा गएर समूह बनाउन चाहेका कक्ष थिच्नुहोस्।' };
    }

    /* rule 1 — only 1s */
    var zeros = keys.filter(function (k){
      var p = k.split(',');
      return !self.ones.has(mintermAt(g, Number(p[0]), Number(p[1])));
    });
    if (zeros.length){
      return { ok: false,
        en: 'Rule 1 broken: a group may contain only 1s. ' + zeros.length +
            ' of the selected cells hold 0.',
        ne: 'नियम १ भङ्ग: समूहमा 1 मात्र हुनुपर्छ। छानिएका ' + zeros.length + ' कक्षमा 0 छ।' };
    }

    /* rule 2 — size is a power of two */
    var n = keys.length;
    if ((n & (n - 1)) !== 0){
      return { ok: false,
        en: 'Rule 2 broken: a group must hold 1, 2, 4, 8 … cells — a power of two. ' +
            'You have selected ' + n + '.',
        ne: 'नियम २ भङ्ग: समूहमा 1, 2, 4, 8 … अर्थात् दुईको घात जति कक्ष हुनुपर्छ। तपाईंले ' +
            n + ' छान्नुभयो।' };
    }

    /* rule 3 — rectangular, wrap-around allowed */
    var rect = this.rectangleOf(keys);
    if (!rect){
      return { ok: false,
        en: 'Rule 3 broken: a group must be a rectangle of adjacent cells. ' +
            'Diagonals and L-shapes are not allowed. Edges do wrap around.',
        ne: 'नियम ३ भङ्ग: समूह छेउछाउका कक्षको आयत हुनुपर्छ। विकर्ण र L आकार मिल्दैन। ' +
            'किनाराहरू भने वरिपरि जोडिन्छन्।' };
    }

    /* rule 4 — maximal */
    var bigger = this.canGrow(rect);
    if (bigger){
      return { ok: false,
        en: 'Rule 4 broken: this group is legal but not as large as it could be. A bigger ' +
            'group removes more variables, so always take the largest one available.',
        ne: 'नियम ४ भङ्ग: यो समूह नियमसम्मत छ तर सक्ने जति ठूलो छैन। ठूलो समूहले बढी चल हटाउँछ, ' +
            'त्यसैले सधैं सबैभन्दा ठूलो समूह लिनुहोस्।' };
    }

    var term = this.termOf(keys);
    return { ok: true, term: term, cells: keys,
      en: 'Valid group of ' + n + '. ' + this.explain(keys, term),
      ne: n + ' कक्षको मान्य समूह। ' + this.explainNe(keys, term) };
  };

  /* A set of cells is a rectangle when its distinct rows and columns
     each form a contiguous run (allowing wrap) and every combination of
     those rows and columns is present. */
  KMap.prototype.rectangleOf = function (keys){
    var g = this.g;
    var rows = [...new Set(keys.map(function (k){ return Number(k.split(',')[0]); }))].sort(function (a,b){ return a-b; });
    var cols = [...new Set(keys.map(function (k){ return Number(k.split(',')[1]); }))].sort(function (a,b){ return a-b; });
    if (rows.length * cols.length !== keys.length) return null;
    if (!contiguous(rows, g.rows) || !contiguous(cols, g.cols)) return null;
    var have = new Set(keys);
    for (var i = 0; i < rows.length; i++){
      for (var j = 0; j < cols.length; j++){
        if (!have.has(rows[i] + ',' + cols[j])) return null;
      }
    }
    return { rows: rows, cols: cols };

    /* Contiguous straight, or contiguous once the axis is treated as a
       ring — which is what makes the left and right edges neighbours. */
    function contiguous(list, size){
      if (list.length === size) return true;
      var straight = list.every(function (v, i){ return i === 0 || v === list[i - 1] + 1; });
      if (straight) return true;
      var shifted = list.map(function (v){ return (v + 1) % size; }).sort(function (a,b){ return a-b; });
      return shifted.every(function (v, i){ return i === 0 || v === shifted[i - 1] + 1; });
    }
  };

  /* Can the rectangle be doubled in either direction and still hold
     only 1s? If so the student's group is not maximal. */
  KMap.prototype.canGrow = function (rect){
    var g = this.g, self = this;
    return grow('rows') || grow('cols');

    function grow(axis){
      var size = axis === 'rows' ? g.rows : g.cols;
      var cur = rect[axis];
      if (cur.length * 2 > size) return false;
      /* try extending forwards and backwards by the current length */
      return [1, -1].some(function (dir){
        var extra = [];
        for (var i = 1; i <= cur.length; i++){
          var base = dir === 1 ? cur[cur.length - 1] : cur[0];
          extra.push(((base + dir * i) % size + size) % size);
        }
        var rows = axis === 'rows' ? cur.concat(extra) : rect.rows;
        var cols = axis === 'cols' ? cur.concat(extra) : rect.cols;
        return rows.every(function (r){
          return cols.every(function (c){ return self.ones.has(mintermAt(g, r, c)); });
        });
      });
    }
  };

  /* The product term: keep the variables that are the same in every
     cell of the group, drop the ones that change. */
  KMap.prototype.termOf = function (keys){
    var g = this.g, self = this;
    var bits = keys.map(function (k){
      var p = k.split(',');
      return g.rowBits[Number(p[0])] + g.colBits[Number(p[1])];
    });
    var out = '';
    for (var i = 0; i < this.vars; i++){
      var first = bits[0][i];
      var same = bits.every(function (b){ return b[i] === first; });
      if (same) out += self.names[i] + (first === '1' ? '' : "'");
    }
    return out || '1';
  };

  KMap.prototype.dropped = function (keys){
    var g = this.g, self = this;
    var bits = keys.map(function (k){
      var p = k.split(',');
      return g.rowBits[Number(p[0])] + g.colBits[Number(p[1])];
    });
    var gone = [];
    for (var i = 0; i < this.vars; i++){
      var first = bits[0][i];
      if (!bits.every(function (b){ return b[i] === first; })) gone.push(self.names[i]);
    }
    return gone;
  };

  KMap.prototype.explain = function (keys, term){
    var gone = this.dropped(keys);
    if (!gone.length) return 'It covers a single cell, so no variable can be removed. The term is ' + term + '.';
    return 'Across these cells ' + gone.join(' and ') + ' change value while the rest stay the same, ' +
           'so ' + gone.join(' and ') + ' cancel out. The term is ' + term + '.';
  };
  KMap.prototype.explainNe = function (keys, term){
    var gone = this.dropped(keys);
    if (!gone.length) return 'एउटै कक्ष भएकाले कुनै चल हट्दैन। पद ' + term + ' हो।';
    return 'यी कक्षहरूमा ' + gone.join(' र ') + ' को मान फेरिन्छ, अरू उस्तै रहन्छन्, ' +
           'त्यसैले ' + gone.join(' र ') + ' कटेर जान्छ। पद ' + term + ' हो।';
  };

  /* ---------------------------------------------------------------- */
  KMap.prototype.onClick = function (e){
    var t = e.target.closest ? e.target : null;
    if (!t) return;

    var act = t.closest('[data-km-act]');
    if (act){
      var a = act.getAttribute('data-km-act');
      if (a === 'mode'){ this.mode = this.mode === 'set' ? 'select' : 'set'; this.sel.clear(); }
      else if (a === 'clearsel'){ this.sel.clear(); this.say('', ''); }
      else if (a === 'reset'){ this.sel.clear(); this.groups = []; this.say('', ''); }
      else if (a === 'check'){
        var v = this.judge();
        if (v.ok){
          this.groups.push({ term: v.term, cells: v.cells });
          this.sel.clear();
        }
        this.say(v.en, v.ne, v.ok);
      }
      this.update();
      return;
    }

    var cell = t.closest('[data-km-cell]');
    if (!cell) return;
    var k = cell.getAttribute('data-km-cell');
    var p = k.split(',');
    var m = mintermAt(this.g, Number(p[0]), Number(p[1]));
    if (this.mode === 'set'){
      if (this.ones.has(m)) this.ones.delete(m); else this.ones.add(m);
      /* changing the map invalidates any groups drawn on the old one */
      this.groups = [];
      this.sel.clear();
    } else {
      if (this.sel.has(k)) this.sel.delete(k); else this.sel.add(k);
    }
    this.update();
  };

  KMap.prototype.say = function (en, ne, ok){
    var e = this.root.querySelector('.km-v-en');
    var n = this.root.querySelector('.km-v-ne');
    var box = this.root.querySelector('.km-verdict');
    if (e) e.textContent = en;
    if (n) n.textContent = ne;
    if (box){
      box.classList.toggle('is-success', ok === true);
      box.classList.toggle('is-error', ok === false && !!en);
    }
  };

  KMap.prototype.reset = function (){
    this.sel.clear(); this.groups = []; this.say('', ''); this.update();
  };

  function mountAll(){
    var nodes = document.querySelectorAll('.kmap');
    for (var i = 0; i < nodes.length; i++){
      (function (root, i){
        var map = new KMap(root);
        root.addEventListener('click', function (e){ map.onClick(e); });
        if (typeof SimulationService !== 'undefined'){
          SimulationService.register({
            id: 'kmap:' + (root.id || ('kmap' + i)),
            subject: 'grade10/digital-design', unit: 'u3',
            title: { en: 'Karnaugh map grouping', ne: 'के–म्याप समूहीकरण' },
            mounts: function (){ return !!root.parentNode; },
            reset: function (){ map.reset(); },
            controls: [
              { id: 'set', label: { en: 'Set a cell to 1', ne: 'कक्षलाई 1 बनाउनुहोस्' } },
              { id: 'check', label: { en: 'Check the group', ne: 'समूह जाँच्नुहोस्' } }
            ]
          });
        }
      })(nodes[i], i);
    }
  }

  function ready(fn){
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }
  ready(mountAll);

  global.KMapLab = { mount: mountAll, KMap: KMap, geometry: geometry, mintermAt: mintermAt };
  if (typeof module !== 'undefined' && module.exports) module.exports = global.KMapLab;

})(typeof window !== 'undefined' ? window : globalThis);
