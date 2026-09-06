/* =========================================================
   COMBINATIONAL CIRCUIT WORKBENCH — Unit 4

   Half adder, full adder, half subtractor, multiplexer, decoder.

   WHY A SECOND COMPONENT RATHER THAN AN OPTION ON THE GATE LAB
   The gate workbench answers "what does THIS GATE do with these
   inputs". These circuits answer a different question: "what do
   SEVERAL outputs do at once, and which gate produced each one". A
   half adder has two outputs from two gates reading the same inputs —
   the gate lab's single lamp cannot express that, and stretching it to
   would make both worse.

   What IS shared is the vocabulary: the same gate outlines, the same
   wire states, the same truth-table-row highlight, the same explain
   line. A student who learned the gate lab already knows this one.

   MARKUP CONTRACT
     <div class="comblab" data-circuit="halfadder"></div>
     <div class="comblab" data-circuit="mux"></div>
   ========================================================= */
(function (global) {
  'use strict';

  /* Each circuit declares its inputs, its outputs, and how each output
     is computed. The truth table is generated from those functions, so
     the table and the diagram cannot disagree. */
  var CIRCUITS = {

    halfadder: {
      name: 'Half adder', ne: 'हाफ एडर',
      inputs: ['A', 'B'],
      outputs: [
        { id: 'S', label: 'SUM',   gate: 'XOR', f: function (a, b){ return a ^ b; },
          expr: 'S = A ⊕ B' },
        { id: 'C', label: 'CARRY', gate: 'AND', f: function (a, b){ return a & b; },
          expr: 'C = A · B' }
      ],
      why: {
        en: 'A half adder adds two bits. SUM is the answer in this column and CARRY is what moves to the next column. Only 1 + 1 produces a carry.',
        ne: 'Half adder ले दुई बिट जोड्छ। SUM यही स्तम्भको उत्तर हो र CARRY अर्को स्तम्भमा जाने। 1 + 1 हुँदा मात्र क्यारी बन्छ।'
      },
      note: {
        en: 'It is called HALF because it cannot accept a carry coming in from the column before it.',
        ne: 'यसलाई HALF भनिनुको कारण: यसले अघिल्लो स्तम्भबाट आउने क्यारी लिन सक्दैन।'
      }
    },

    fulladder: {
      name: 'Full adder', ne: 'फुल एडर',
      inputs: ['A', 'B', 'Cin'],
      outputs: [
        { id: 'S', label: 'SUM', gate: 'XOR',
          f: function (a, b, c){ return a ^ b ^ c; },
          expr: 'S = A ⊕ B ⊕ Cin' },
        { id: 'C', label: 'CARRY OUT', gate: 'OR',
          f: function (a, b, c){ return ((a & b) | (b & c) | (a & c)) ? 1 : 0; },
          expr: 'Cout = AB + BCin + ACin' }
      ],
      why: {
        en: 'A full adder adds three bits: the two you are adding plus the carry from the previous column. That third input is the whole difference from a half adder.',
        ne: 'Full adder ले तीन बिट जोड्छ: जोड्नुपर्ने दुई, र अघिल्लो स्तम्भबाट आएको क्यारी। half adder सँगको फरक यही तेस्रो इनपुट हो।'
      },
      note: {
        en: 'Chain n full adders together, each carry feeding the next, and you have an n-bit binary adder.',
        ne: 'n वटा full adder जोडेर, हरेकको क्यारी अर्कोमा पठाउँदा n-बिट binary adder बन्छ।'
      }
    },

    halfsub: {
      name: 'Half subtractor', ne: 'हाफ सब्ट्र्याक्टर',
      inputs: ['A', 'B'],
      outputs: [
        { id: 'D', label: 'DIFFERENCE', gate: 'XOR', f: function (a, b){ return a ^ b; },
          expr: 'D = A ⊕ B' },
        { id: 'Bo', label: 'BORROW', gate: 'AND', f: function (a, b){ return (~a & 1) & b; },
          expr: "Bo = A' · B" }
      ],
      why: {
        en: 'A half subtractor computes A − B. DIFFERENCE is the same XOR as a half adder’s SUM; only the second output changes. A borrow is needed exactly when A is 0 and B is 1.',
        ne: 'Half subtractor ले A − B गर्छ। DIFFERENCE half adder कै SUM जस्तै XOR हो; दोस्रो आउटपुट मात्र फरक। A = 0 र B = 1 हुँदा मात्र borrow चाहिन्छ।'
      },
      note: {
        en: 'Compare it with the half adder: same first output, different second. That is worth one mark on its own.',
        ne: 'Half adder सँग तुलना गर्नुहोस्: पहिलो आउटपुट उही, दोस्रो फरक। यो आफैंमा एक अंकको कुरा हो।'
      }
    },

    mux: {
      name: '4-to-1 Multiplexer', ne: '४-देखि-१ मल्टिप्लेक्सर',
      inputs: ['S1', 'S0', 'I0', 'I1', 'I2', 'I3'],
      selectFrom: 2,          /* the first two inputs are select lines */
      outputs: [
        { id: 'Y', label: 'OUTPUT', gate: 'OR',
          f: function (s1, s0, i0, i1, i2, i3){
            return [i0, i1, i2, i3][s1 * 2 + s0];
          },
          expr: 'Y = the input chosen by S1 S0' }
      ],
      why: {
        en: 'A multiplexer is a switch: the select lines choose which ONE of the data inputs reaches the output. Many in, one out.',
        ne: 'Multiplexer एउटा स्विच हो: select लाइनले कुन डाटा इनपुट आउटपुटसम्म पुग्ने भन्ने छान्छ। धेरै भित्र, एउटा बाहिर।'
      },
      note: {
        en: 'n select lines choose between 2ⁿ inputs. Two select lines therefore address four.',
        ne: 'n select लाइनले 2ⁿ इनपुटबीच छान्छ। त्यसैले दुई select लाइनले चार इनपुट सम्बोधन गर्छ।'
      }
    }
  };

  function esc(s){
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function Comb(root){
    this.root = root;
    var key = (root.getAttribute('data-circuit') || 'halfadder').toLowerCase();
    this.key = CIRCUITS[key] ? key : 'halfadder';
    this.c = CIRCUITS[this.key];
    this.v = this.c.inputs.map(function (){ return 0; });
    this.render();
  }

  Comb.prototype.compute = function (vals){
    var self = this;
    return this.c.outputs.map(function (o){ return o.f.apply(null, vals) & 1; });
  };

  /* Every input combination, generated rather than typed. */
  Comb.prototype.rows = function (){
    var n = this.c.inputs.length, out = [], self = this;
    /* A 6-input MUX would need 64 rows, which teaches nothing. For the
       multiplexer the table is over the select lines only, with the
       data inputs shown as symbols. */
    if (this.c.selectFrom){
      for (var s = 0; s < 4; s++){
        out.push({ sel: [s >> 1, s & 1], picks: 'I' + s });
      }
      return out;
    }
    for (var i = 0; i < (1 << n); i++){
      var vals = [];
      for (var b = n - 1; b >= 0; b--) vals.push((i >> b) & 1);
      out.push({ vals: vals, outs: self.compute(vals) });
    }
    return out;
  };

  Comb.prototype.render = function (){
    var c = this.c, self = this;

    var picker = '<div class="gl-pick" role="tablist" aria-label="Choose a circuit">' +
      Object.keys(CIRCUITS).map(function (k){
        return '<button type="button" role="tab" class="gl-gate" data-cb-circuit="' + k + '" ' +
               'aria-selected="' + (k === self.key) + '">' + esc(CIRCUITS[k].name) + '</button>';
      }).join('') + '</div>';

    var h = picker + '<div class="cb-main">';

    /* left: inputs and outputs */
    h += '<div class="cb-left"><div class="gl-title"><b>' + esc(c.name) + '</b>' +
         '<span class="np-cell" lang="ne">' + esc(c.ne) + '</span></div>';

    h += '<div class="cb-io"><div class="cb-col"><span class="cb-h"><span class="t-en">Inputs</span>' +
         '<span class="np-cell" lang="ne">इनपुट</span></span>';
    c.inputs.forEach(function (name, i){
      h += '<button type="button" class="gl-in" role="switch" data-cb-in="' + i + '" ' +
           'aria-checked="false" aria-label="Input ' + name + ', currently 0">' +
           '<span class="gl-in-n">' + esc(name) + '</span>' +
           '<span class="gl-in-v">0</span></button>';
    });
    h += '</div>';

    h += '<div class="cb-arrow" aria-hidden="true">&#10230;</div>';

    h += '<div class="cb-col"><span class="cb-h"><span class="t-en">Outputs</span>' +
         '<span class="np-cell" lang="ne">आउटपुट</span></span>';
    c.outputs.forEach(function (o, i){
      h += '<div class="cb-out" data-cb-out="' + i + '">' +
           '<span class="cb-out-n">' + esc(o.label) + '</span>' +
           '<span class="cb-out-v">0</span>' +
           '<span class="cb-out-e">' + esc(o.expr) + '</span></div>';
    });
    h += '</div></div></div>';

    /* right: the truth table */
    h += '<div class="cb-right">' + this.table() + '</div>';
    h += '</div>';

    h += '<div class="gl-say" role="status"><span class="gl-say-en t-en"></span>' +
         '<span class="gl-say-ne np-cell" lang="ne"></span></div>';

    this.root.innerHTML = h;
    this.update();
  };

  Comb.prototype.table = function (){
    var c = this.c, rows = this.rows();
    var h = '<table class="gl-tt"><caption class="gl-tt-cap">Truth table<span class="np-cell" lang="ne">ट्रुथ टेबल</span></caption><thead><tr>';

    if (c.selectFrom){
      h += '<th scope="col">S1</th><th scope="col">S0</th><th scope="col">Y is</th></tr></thead><tbody>';
      rows.forEach(function (r, i){
        h += '<tr data-cb-row="' + i + '"><td>' + r.sel[0] + '</td><td>' + r.sel[1] +
             '</td><td class="gl-y">' + r.picks + '</td></tr>';
      });
    } else {
      c.inputs.forEach(function (n){ h += '<th scope="col">' + esc(n) + '</th>'; });
      c.outputs.forEach(function (o){ h += '<th scope="col">' + esc(o.id) + '</th>'; });
      h += '</tr></thead><tbody>';
      rows.forEach(function (r, i){
        h += '<tr data-cb-row="' + i + '">';
        r.vals.forEach(function (v){ h += '<td>' + v + '</td>'; });
        r.outs.forEach(function (v){ h += '<td class="gl-y">' + v + '</td>'; });
        h += '</tr>';
      });
    }
    return h + '</tbody></table>';
  };

  Comb.prototype.rowIndex = function (){
    var c = this.c;
    if (c.selectFrom) return this.v[0] * 2 + this.v[1];
    var n = 0;
    for (var i = 0; i < this.v.length; i++) n = n * 2 + this.v[i];
    return n;
  };

  Comb.prototype.update = function (){
    var c = this.c, self = this, root = this.root;
    var outs = this.compute(this.v);

    var ins = root.querySelectorAll('[data-cb-in]');
    for (var i = 0; i < ins.length; i++){
      var idx = Number(ins[i].getAttribute('data-cb-in'));
      var on = this.v[idx] === 1;
      ins[i].classList.toggle('on', on);
      ins[i].setAttribute('aria-checked', on ? 'true' : 'false');
      ins[i].setAttribute('aria-label', 'Input ' + c.inputs[idx] + ', currently ' + this.v[idx]);
      ins[i].querySelector('.gl-in-v').textContent = String(this.v[idx]);
    }

    var outEls = root.querySelectorAll('[data-cb-out]');
    for (var j = 0; j < outEls.length; j++){
      var oi = Number(outEls[j].getAttribute('data-cb-out'));
      outEls[j].classList.toggle('on', outs[oi] === 1);
      outEls[j].querySelector('.cb-out-v').textContent = String(outs[oi]);
    }

    var rows = root.querySelectorAll('[data-cb-row]');
    var want = this.rowIndex();
    for (var r = 0; r < rows.length; r++){
      var active = Number(rows[r].getAttribute('data-cb-row')) === want;
      rows[r].classList.toggle('is-active', active);
      if (active) rows[r].setAttribute('aria-current', 'true');
      else rows[r].removeAttribute('aria-current');
    }

    var reading = c.inputs.map(function (n, k){ return n + ' = ' + self.v[k]; }).join(', ');
    var result = c.outputs.map(function (o, k){ return o.id + ' = ' + outs[k]; }).join(', ');
    var extra = '';
    if (c.selectFrom){
      var chosen = 'I' + (this.v[0] * 2 + this.v[1]);
      extra = ' The select lines are pointing at ' + chosen + ', so ' + chosen +
              ' is the input that reaches Y.';
    }
    var en = root.querySelector('.gl-say-en');
    var ne = root.querySelector('.gl-say-ne');
    if (en) en.textContent = reading + '  →  ' + result + '. ' + c.why.en + extra;
    if (ne) ne.textContent = reading + '  →  ' + result + '। ' + c.why.ne;
  };

  Comb.prototype.onClick = function (e){
    var t = e.target.closest ? e.target : null;
    if (!t) return;
    var pick = t.closest('[data-cb-circuit]');
    if (pick){
      this.key = pick.getAttribute('data-cb-circuit');
      this.c = CIRCUITS[this.key];
      this.v = this.c.inputs.map(function (){ return 0; });
      this.render();
      return;
    }
    var inp = t.closest('[data-cb-in]');
    if (inp){
      var i = Number(inp.getAttribute('data-cb-in'));
      this.v[i] = this.v[i] ? 0 : 1;
      this.update();
    }
  };

  Comb.prototype.reset = function (){
    this.v = this.c.inputs.map(function (){ return 0; });
    this.update();
  };

  function mountAll(){
    var nodes = document.querySelectorAll('.comblab');
    for (var i = 0; i < nodes.length; i++){
      (function (root, i){
        var lab = new Comb(root);
        root.addEventListener('click', function (e){ lab.onClick(e); });
        root.addEventListener('keydown', function (e){
          if ((e.key === ' ' || e.key === 'Enter') && e.target.closest('[data-cb-in]')){
            e.preventDefault(); lab.onClick(e);
          }
        });
        if (typeof SimulationService !== 'undefined'){
          SimulationService.register({
            id: 'comb:' + (root.id || ('comblab' + i)),
            subject: 'grade10/digital-design', unit: 'u4',
            title: { en: 'Combinational circuit workbench', ne: 'कम्बिनेसनल सर्किट प्रयोगशाला' },
            mounts: function (){ return !!root.parentNode; },
            reset: function (){ lab.reset(); },
            controls: [{ id: 'in', label: { en: 'Toggle an input', ne: 'इनपुट बदल्नुहोस्' } }]
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

  global.CombLab = { mount: mountAll, Comb: Comb, CIRCUITS: CIRCUITS };
  if (typeof module !== 'undefined' && module.exports) module.exports = global.CombLab;

})(typeof window !== 'undefined' ? window : globalThis);
