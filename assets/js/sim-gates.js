/* =========================================================
   GATE WORKBENCH — interactive logic gates

       toggle an input  →  the signal path changes colour
                        →  the output changes
                        →  the matching truth-table row lights up
                        →  a bilingual sentence says WHY

   This is the one idea Unit 2 is built on, and it is the reason the
   unit is interactive rather than animated: a truth table is not a
   process, it is a lookup, and a student learns a lookup by *querying*
   it. Playing an animation of all four rows would teach the order of
   the rows, which is not the lesson.

   The link between the circuit and the table is the point (syllabus
   2.2). Showing them side by side and letting one drive the other is
   what turns "AND gives 1 only when both are 1" from a sentence to be
   memorised into something the student has just watched happen.

   MARKUP CONTRACT — authored in the lesson, no JavaScript needed:

     <div class="gatelab" data-gates="AND,OR,NOT" data-gate="AND"></div>

   Everything else is rendered here, so a second lesson that needs a
   gate reuses the component instead of copying markup.

   The same component serves Unit 4: a half adder is two gates reading
   the same two inputs, so `data-mode="adder"` reuses the whole
   apparatus rather than growing a second one.
   ========================================================= */
(function (global) {
  'use strict';

  /* ---------------------------------------------------------------
     Gate definitions. `f` is the actual truth function — the truth
     table and the diagram are both computed from it, so they cannot
     disagree with each other. A hand-written table that drifts from
     the drawing is the classic bug in this kind of lesson.
     --------------------------------------------------------------- */
  var GATES = {
    NOT: {
      name: 'NOT (Inverter)', ne: 'नट (इन्भर्टर)',
      expr: 'Y = <span class="ovl">A</span>', inputs: 1,
      f: function (a) { return a ? 0 : 1; },
      why: {
        en: 'NOT reverses its input. Whatever goes in, the opposite comes out.',
        ne: 'NOT ले इनपुट उल्टाइदिन्छ। जे भित्र जान्छ, त्यसको उल्टो बाहिर आउँछ।'
      }
    },
    AND: {
      name: 'AND', ne: 'एन्ड',
      expr: 'Y = A · B', inputs: 2,
      f: function (a, b) { return a && b ? 1 : 0; },
      why: {
        en: 'AND gives 1 only when EVERY input is 1. One 0 anywhere forces the output to 0.',
        ne: 'AND ले सबै इनपुट 1 हुँदा मात्र 1 दिन्छ। कुनै एउटा 0 भयो भने आउटपुट 0 नै हुन्छ।'
      }
    },
    OR: {
      name: 'OR', ne: 'अर',
      expr: 'Y = A + B', inputs: 2,
      f: function (a, b) { return a || b ? 1 : 0; },
      why: {
        en: 'OR gives 1 when AT LEAST ONE input is 1. It is 0 only when every input is 0.',
        ne: 'OR ले कम्तीमा एउटा इनपुट 1 भए 1 दिन्छ। सबै 0 हुँदा मात्र 0 हुन्छ।'
      }
    },
    NAND: {
      name: 'NAND', ne: 'न्यान्ड',
      expr: 'Y = <span class="ovl">A · B</span>', inputs: 2,
      f: function (a, b) { return a && b ? 0 : 1; },
      why: {
        en: 'NAND is AND followed by NOT. Work out the AND answer first, then flip it.',
        ne: 'NAND भनेको AND पछि NOT हो। पहिले AND को उत्तर निकाल्नुहोस्, अनि उल्टाउनुहोस्।'
      }
    },
    NOR: {
      name: 'NOR', ne: 'नोर',
      expr: 'Y = <span class="ovl">A + B</span>', inputs: 2,
      f: function (a, b) { return a || b ? 0 : 1; },
      why: {
        en: 'NOR is OR followed by NOT. It gives 1 only when every input is 0.',
        ne: 'NOR भनेको OR पछि NOT हो। सबै इनपुट 0 हुँदा मात्र 1 दिन्छ।'
      }
    },
    XOR: {
      name: 'XOR (Exclusive OR)', ne: 'एक्स–अर',
      expr: 'Y = A ⊕ B', inputs: 2,
      f: function (a, b) { return a !== b ? 1 : 0; },
      why: {
        en: 'XOR gives 1 when the inputs are DIFFERENT. Equal inputs give 0. This is the SUM of a half adder.',
        ne: 'XOR ले इनपुट फरक भएमा 1 दिन्छ। दुवै उस्तै भए 0। यही नै half adder को SUM हो।'
      }
    }
  };

  /* Gate body outlines, drawn once. ANSI shapes, because those are the
     symbols the SEE paper asks students to draw. */
  var SHAPE = {
    AND:  '<path class="g-body" d="M70,30 L110,30 A30,30 0 0 1 110,90 L70,90 Z"/>',
    OR:   '<path class="g-body" d="M70,30 Q95,60 70,90 Q120,90 145,60 Q120,30 70,30 Z"/>',
    NOT:  '<path class="g-body" d="M72,30 L132,60 L72,90 Z"/>',
    XOR:  '<path class="g-body" d="M78,30 Q103,60 78,90 Q128,90 153,60 Q128,30 78,30 Z"/>' +
          '<path class="g-body g-open" d="M64,30 Q89,60 64,90"/>'
  };
  var NOSE = { AND: 140, OR: 145, NOT: 132, NAND: 140, NOR: 145, XOR: 153 };

  function shapeFor(key){
    if (key === 'NAND') return SHAPE.AND + bubble(NOSE.AND);
    if (key === 'NOR')  return SHAPE.OR  + bubble(NOSE.OR);
    if (key === 'NOT')  return SHAPE.NOT + bubble(NOSE.NOT);
    return SHAPE[key];
  }
  /* Where an input wire must reach to actually touch the body — an
     OR-family back is concave, so its left bound is not where the
     outline is at the input heights. */
  var ATTACH = { AND: 74, NAND: 74, NOT: 76, OR: 82, NOR: 82, XOR: 92 };

  function bubble(x){
    return '<circle class="g-body" cx="' + (x + 7) + '" cy="60" r="7"/>';
  }
  /* Where the output wire actually starts — after the bubble on an
     inverting gate, at the nose otherwise. */
  function outFrom(key){
    return NOSE[key] + (key === 'NAND' || key === 'NOR' || key === 'NOT' ? 14 : 0);
  }

  function esc(s){
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ---------------------------------------------------------------
     One workbench instance.
     --------------------------------------------------------------- */
  function Lab(root){
    this.root = root;
    var list = (root.getAttribute('data-gates') || 'AND,OR,NOT,NAND,NOR,XOR')
      .split(',').map(function (s){ return s.trim().toUpperCase(); })
      .filter(function (k){ return GATES[k]; });
    this.keys = list.length ? list : ['AND'];
    this.key = (root.getAttribute('data-gate') || '').toUpperCase();
    if (!GATES[this.key]) this.key = this.keys[0];
    this.a = 0; this.b = 0;
    this.render();
  }

  Lab.prototype.gate = function (){ return GATES[this.key]; };

  Lab.prototype.render = function (){
    var g = this.gate(), self = this;
    var picker = this.keys.length > 1
      ? '<div class="gl-pick" role="tablist" aria-label="Choose a gate">' +
        this.keys.map(function (k){
          return '<button type="button" role="tab" class="gl-gate" data-gl-gate="' + k + '" ' +
                 'aria-selected="' + (k === self.key) + '">' + k + '</button>';
        }).join('') + '</div>'
      : '';

    this.root.innerHTML =
      picker +
      '<div class="gl-main">' +
        '<div class="gl-left">' +
          '<div class="gl-title"><b>' + esc(g.name) + '</b>' +
            '<span class="np-cell" lang="ne">' + esc(g.ne) + '</span>' +
            '<code class="gl-expr">' + g.expr + '</code></div>' +
          this.svg() +
          '<div class="gl-toggles">' + this.toggles(g) + '</div>' +
        '</div>' +
        '<div class="gl-right">' + this.table(g) + '</div>' +
      '</div>' +
      '<div class="gl-say" role="status"><span class="gl-say-en t-en"></span>' +
        '<span class="gl-say-ne np-cell" lang="ne"></span></div>';

    this.svgEl = this.root.querySelector('.gl-svg');
    this.update();
  };

  Lab.prototype.toggles = function (g){
    var h = '<span class="sim-controls-label"><span class="t-en">Click an input to change it — </span>' +
            '<span class="np-cell" lang="ne">इनपुट बदल्न थिच्नुहोस्</span></span>';
    h += this.toggle('A', this.a);
    if (g.inputs === 2) h += this.toggle('B', this.b);
    return h;
  };
  Lab.prototype.toggle = function (name, val){
    return '<button type="button" class="gl-in" role="switch" data-gl-in="' + name + '" ' +
           'aria-checked="' + (val ? 'true' : 'false') + '" ' +
           'aria-label="Input ' + name + ', currently ' + val + '">' +
           '<span class="gl-in-n">' + name + '</span>' +
           '<span class="gl-in-v">' + val + '</span></button>';
  };

  Lab.prototype.svg = function (){
    var g = this.gate(), one = g.inputs === 1;
    var ax = one ? 60 : 45, bx = 75;
    var ox = outFrom(this.key);
    var h = '<svg class="gl-svg" viewBox="0 0 300 130" role="img" ' +
            'aria-label="' + esc(g.name) + ' gate circuit">';
    h += '<text class="gl-pin" x="14" y="' + (ax + 5) + '">A</text>';
    var into = ATTACH[this.key] || 74;
    h += '<path class="gl-wire" data-w="a" d="M28,' + ax + ' L' + (one ? 76 : into) + ',' + ax + '"/>';
    if (!one){
      h += '<text class="gl-pin" x="14" y="' + (bx + 5) + '">B</text>';
      h += '<path class="gl-wire" data-w="b" d="M28,' + bx + ' L' + into + ',' + bx + '"/>';
    }
    h += shapeFor(this.key);
    /* The lamp terminates the output wire. Floating it above the line
       made the output look like a separate object rather than the thing
       the wire is carrying. */
    h += '<path class="gl-wire" data-w="y" d="M' + ox + ',60 L233,60"/>';
    h += '<circle class="gl-lamp" cx="252" cy="60" r="17"/>';
    h += '<text class="gl-lampv" x="252" y="66" text-anchor="middle">0</text>';
    h += '<text class="gl-pin" x="252" y="98" text-anchor="middle">Y</text>';
    h += '</svg>';
    return h;
  };

  /* The table is generated from the gate's own function, so it can never
     contradict the circuit beside it. */
  Lab.prototype.rows = function (g){
    var out = [];
    if (g.inputs === 1){
      out.push([0, null, g.f(0)]);
      out.push([1, null, g.f(1)]);
    } else {
      for (var a = 0; a < 2; a++) for (var b = 0; b < 2; b++) out.push([a, b, g.f(a, b)]);
    }
    return out;
  };

  Lab.prototype.table = function (g){
    var rows = this.rows(g);
    var h = '<table class="gl-tt"><caption class="gl-tt-cap">Truth table <span class="np-cell" lang="ne">ट्रुथ टेबल</span></caption><thead><tr>' +
            '<th scope="col">A</th>' + (g.inputs === 2 ? '<th scope="col">B</th>' : '') +
            '<th scope="col">Y</th></tr></thead><tbody>';
    rows.forEach(function (r, i){
      h += '<tr data-gl-row="' + i + '"><td>' + r[0] + '</td>' +
           (g.inputs === 2 ? '<td>' + r[1] + '</td>' : '') +
           '<td class="gl-y">' + r[2] + '</td></tr>';
    });
    return h + '</tbody></table>';
  };

  Lab.prototype.rowIndex = function (g){
    return g.inputs === 1 ? this.a : (this.a * 2 + this.b);
  };

  Lab.prototype.update = function (){
    var g = this.gate();
    var y = g.inputs === 1 ? g.f(this.a) : g.f(this.a, this.b);
    var root = this.root;

    function wire(sel, on){
      var el = root.querySelector('[data-w="' + sel + '"]');
      if (el) el.classList.toggle('hi', !!on);
    }
    wire('a', this.a); wire('b', this.b); wire('y', y);

    var lamp = root.querySelector('.gl-lamp');
    if (lamp) lamp.classList.toggle('on', !!y);
    var lv = root.querySelector('.gl-lampv');
    if (lv) lv.textContent = String(y);

    var btns = root.querySelectorAll('.gl-in');
    for (var i = 0; i < btns.length; i++){
      var n = btns[i].getAttribute('data-gl-in');
      var v = n === 'A' ? this.a : this.b;
      btns[i].setAttribute('aria-checked', v ? 'true' : 'false');
      btns[i].setAttribute('aria-label', 'Input ' + n + ', currently ' + v);
      btns[i].classList.toggle('on', !!v);
      var vv = btns[i].querySelector('.gl-in-v');
      if (vv) vv.textContent = String(v);
    }

    /* Light the row the student's inputs actually select. This is the
       whole link between the two halves of the component. */
    var rows = root.querySelectorAll('[data-gl-row]');
    var want = this.rowIndex(g);
    for (var r = 0; r < rows.length; r++){
      var on = Number(rows[r].getAttribute('data-gl-row')) === want;
      rows[r].classList.toggle('is-active', on);
      if (on) rows[r].setAttribute('aria-current', 'true');
      else rows[r].removeAttribute('aria-current');
    }

    var reading = g.inputs === 1
      ? 'A = ' + this.a
      : 'A = ' + this.a + ', B = ' + this.b;
    var en = root.querySelector('.gl-say-en');
    var ne = root.querySelector('.gl-say-ne');
    if (en) en.textContent = reading + '  →  Y = ' + y + '. ' + g.why.en;
    if (ne) ne.textContent = reading + '  →  Y = ' + y + '। ' + g.why.ne;
  };

  Lab.prototype.onClick = function (e){
    var t = e.target.closest ? e.target : null;
    if (!t) return;
    var gsel = t.closest('[data-gl-gate]');
    if (gsel){
      this.key = gsel.getAttribute('data-gl-gate');
      /* Inputs are deliberately kept across a gate change: comparing two
         gates on the SAME inputs is how the difference becomes visible. */
      if (GATES[this.key].inputs === 1) this.b = 0;
      this.render();
      return;
    }
    var inp = t.closest('[data-gl-in]');
    if (inp){
      var n = inp.getAttribute('data-gl-in');
      if (n === 'A') this.a = this.a ? 0 : 1; else this.b = this.b ? 0 : 1;
      this.update();
    }
  };

  function mountAll(){
    var nodes = document.querySelectorAll('.gatelab');
    for (var i = 0; i < nodes.length; i++){
      (function (root){
        var lab = new Lab(root);
        root.addEventListener('click', function (e){ lab.onClick(e); });
        root.addEventListener('keydown', function (e){
          /* role="switch" must respond to Space and Enter */
          if ((e.key === ' ' || e.key === 'Enter') && e.target.closest('[data-gl-in]')){
            e.preventDefault();
            lab.onClick(e);
          }
        });
        if (typeof SimulationService !== 'undefined'){
          SimulationService.register({
            id: 'gates:' + (root.id || ('gatelab' + i)),
            subject: 'grade10/digital-design', unit: 'u2',
            title: { en: 'Logic gate workbench', ne: 'लजिक गेट प्रयोगशाला' },
            mounts: function (){ return !!root.parentNode; },
            reset: function (){ lab.a = 0; lab.b = 0; lab.update(); },
            controls: [
              { id: 'A', label: { en: 'Toggle input A', ne: 'इनपुट A बदल्नुहोस्' } },
              { id: 'B', label: { en: 'Toggle input B', ne: 'इनपुट B बदल्नुहोस्' } }
            ]
          });
        }
      })(nodes[i]);
    }
  }

  function ready(fn){
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }
  ready(mountAll);

  global.GateLab = { GATES: GATES, mount: mountAll, Lab: Lab };
  if (typeof module !== 'undefined' && module.exports) module.exports = global.GateLab;

})(typeof window !== 'undefined' ? window : globalThis);
