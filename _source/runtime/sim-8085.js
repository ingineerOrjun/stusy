/* =========================================================
   8085 INSTRUCTION CYCLE — Unit 5

       FETCH  →  DECODE  →  EXECUTE  →  STORE

   Stepped, not played. The instruction cycle is a sequence whose ORDER
   is the entire lesson — a student who can list the stages but not say
   which register holds what during each one has learned a list, not a
   machine. So every step shows the state of the buses, the registers
   and the flags at that moment, and the student advances it themselves.

   Why this earns a simulation rather than an animation: the syllabus
   asks for the blocks (5.5-5.9) and the addressing modes (5.10), and
   those only make sense as things that DO something during a cycle.
   Running one real instruction through the real blocks is what connects
   the block diagram to its purpose.

   The program is deliberately three instructions long and uses the ones
   an SEE paper actually names: MVI, ADD, STA.

   MARKUP CONTRACT
     <div class="cpu8085" id="cpu"></div>
   ========================================================= */
(function (global) {
  'use strict';

  /* A tiny, honest model. Only the registers the syllabus names, and
     only the flags a Grade 10 paper asks about. */
  function initialState(){
    return {
      pc: 0x2000,
      acc: 0x00,
      regB: 0x00,
      ir: '',
      addr: 0x0000,
      data: 0x00,
      flags: { S: 0, Z: 0, CY: 0 },
      memory: { 0x2050: 0x00 },
      stage: '',
      active: []          // which blocks are lit this step
    };
  }

  var PROGRAM = [
    { addr: 0x2000, text: 'MVI A, 05H', bytes: 2 },
    { addr: 0x2002, text: 'ADD B',      bytes: 1 },
    { addr: 0x2003, text: 'STA 2050H',  bytes: 3 }
  ];

  /* Every step is written out in full rather than computed by running
     the model forwards, so stepping backwards is exact and the captions
     can be authored rather than generated. */
  function buildSteps(){
    var S = [];

    function step(o){ S.push(o); return o; }

    /* ---- instruction 1: MVI A, 05H ---- */
    step({
      stage: 'FETCH', instr: 0, active: ['pc', 'addrbus', 'mem'],
      set: { addr: 0x2000, ir: '' },
      en: 'FETCH. The Program Counter holds 2000H — the address of the next instruction. That address is placed on the ADDRESS BUS and sent to memory.',
      ne: 'FETCH। Program Counter सँग 2000H छ — अर्को निर्देशनको ठेगाना। त्यो ठेगाना ADDRESS BUS मा राखेर मेमोरीमा पठाइन्छ।'
    });
    step({
      stage: 'FETCH', instr: 0, active: ['mem', 'databus', 'ir'],
      set: { data: 0x3E, ir: 'MVI A', pc: 0x2002 },
      en: 'Memory returns the instruction code on the DATA BUS. It is copied into the Instruction Register, and the Program Counter moves on to 2002H.',
      ne: 'मेमोरीले निर्देशन कोड DATA BUS मा फर्काउँछ। त्यो Instruction Register मा सारिन्छ, र Program Counter 2002H मा सर्छ।'
    });
    step({
      stage: 'DECODE', instr: 0, active: ['ir', 'cu'],
      set: {},
      en: 'DECODE. The Control Unit reads the Instruction Register and works out what the instruction wants: move an immediate value into the accumulator.',
      ne: 'DECODE। Control Unit ले Instruction Register पढेर निर्देशनले के चाहेको हो पत्ता लगाउँछ: तत्काल दिइएको मान accumulator मा सार्ने।'
    });
    step({
      stage: 'EXECUTE', instr: 0, active: ['databus', 'acc'],
      set: { data: 0x05, acc: 0x05 },
      en: 'EXECUTE. The second byte, 05H, is read and placed in the accumulator. A = 05H. No arithmetic happened, so no flag changes.',
      ne: 'EXECUTE। दोस्रो बाइट 05H पढेर accumulator मा राखिन्छ। A = 05H। कुनै गणित नभएकाले flag बदलिँदैन।'
    });

    /* ---- instruction 2: ADD B ---- */
    step({
      stage: 'FETCH', instr: 1, active: ['pc', 'addrbus', 'mem'],
      set: { addr: 0x2002, regB: 0x03 },
      en: 'FETCH the next instruction from 2002H. Register B has been loaded with 03H by an earlier part of the program.',
      ne: '2002H बाट अर्को निर्देशन FETCH गरिन्छ। रजिस्टर B मा प्रोग्रामको अघिल्लो भागले 03H राखिसकेको छ।'
    });
    step({
      stage: 'DECODE', instr: 1, active: ['ir', 'cu'],
      set: { ir: 'ADD B', pc: 0x2003 },
      en: 'DECODE. The Control Unit recognises ADD B: add the contents of register B to the accumulator.',
      ne: 'DECODE। Control Unit ले ADD B चिन्छ: रजिस्टर B को सामग्री accumulator मा जोड्ने।'
    });
    step({
      stage: 'EXECUTE', instr: 1, active: ['acc', 'regb', 'alu'],
      set: {},
      en: 'EXECUTE. Both operands travel to the ALU — 05H from the accumulator and 03H from register B. This is the only stage where the ALU does any work.',
      ne: 'EXECUTE। दुवै operand ALU मा जान्छन् — accumulator बाट 05H र रजिस्टर B बाट 03H। ALU ले काम गर्ने एउटै चरण यही हो।'
    });
    step({
      stage: 'EXECUTE', instr: 1, active: ['alu', 'acc', 'flags'],
      set: { acc: 0x08, flags: { S: 0, Z: 0, CY: 0 } },
      en: 'The ALU returns 08H to the accumulator and sets the flags from the result: it is not zero so Z = 0, not negative so S = 0, and there was no carry out so CY = 0.',
      ne: 'ALU ले 08H accumulator मा फर्काउँछ र नतिजाअनुसार flag सेट गर्छ: शून्य नभएकाले Z = 0, ऋणात्मक नभएकाले S = 0, र क्यारी नआएकाले CY = 0।'
    });

    /* ---- instruction 3: STA 2050H ---- */
    step({
      stage: 'FETCH', instr: 2, active: ['pc', 'addrbus', 'mem'],
      set: { addr: 0x2003, ir: 'STA' },
      en: 'FETCH the third instruction, STA 2050H, from 2003H. STA is three bytes long: the opcode plus a two-byte address.',
      ne: '2003H बाट तेस्रो निर्देशन STA 2050H FETCH गरिन्छ। STA तीन बाइटको हुन्छ: opcode र दुई बाइटको ठेगाना।'
    });
    step({
      stage: 'DECODE', instr: 2, active: ['ir', 'cu'],
      set: { pc: 0x2006 },
      en: 'DECODE. STA uses DIRECT addressing — the address to write to is written inside the instruction itself, so no further lookup is needed to find it.',
      ne: 'DECODE। STA ले DIRECT addressing प्रयोग गर्छ — लेख्नुपर्ने ठेगाना निर्देशनभित्रै लेखिएको हुन्छ, त्यसैले ठेगाना खोज्न थप काम गर्नुपर्दैन।'
    });
    step({
      stage: 'STORE', instr: 2, active: ['acc', 'databus', 'addrbus', 'mem'],
      set: { addr: 0x2050, data: 0x08, memory: { 0x2050: 0x08 } },
      en: 'STORE. 2050H goes onto the address bus and the accumulator contents, 08H, go onto the data bus. Memory location 2050H now holds 08H.',
      ne: 'STORE। 2050H address bus मा र accumulator को सामग्री 08H data bus मा जान्छ। अब मेमोरीको 2050H मा 08H छ।'
    });
    step({
      stage: 'DONE', instr: -1, active: [],
      set: {},
      en: 'The three instructions are complete. Every one of them passed through the same cycle: fetch, decode, execute — and this last one also stored. That cycle repeats for every instruction a processor ever runs.',
      ne: 'तीनै निर्देशन सकिए। हरेक उही चक्रबाट गयो: fetch, decode, execute — र अन्तिमले store पनि गर्‍यो। प्रोसेसरले चलाउने हरेक निर्देशनका लागि यही चक्र दोहोरिन्छ।'
    });

    return S;
  }

  var STEPS = buildSteps();

  function hex(n, w){
    var s = (n >>> 0).toString(16).toUpperCase();
    while (s.length < (w || 2)) s = '0' + s;
    return s + 'H';
  }
  function esc(s){
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function CPU(root){
    this.root = root;
    this.i = 0;                    // 0 = before the first step
    this.render();
  }

  /* Replay from the start rather than undoing, so Prev is exact. */
  CPU.prototype.stateAt = function (n){
    var st = initialState();
    for (var k = 0; k < n; k++){
      var s = STEPS[k];
      for (var key in s.set){
        if (!Object.prototype.hasOwnProperty.call(s.set, key)) continue;
        if (key === 'flags') st.flags = { S: s.set.flags.S, Z: s.set.flags.Z, CY: s.set.flags.CY };
        else if (key === 'memory'){
          for (var a in s.set.memory) st.memory[a] = s.set.memory[a];
        } else st[key] = s.set[key];
      }
      st.stage = s.stage;
      st.active = s.active;
      st.instr = s.instr;
    }
    if (n === 0){ st.stage = ''; st.active = []; st.instr = 0; }
    return st;
  };

  CPU.prototype.render = function (){
    var h = '';

    h += '<div class="cpu-prog"><span class="cpu-h"><span class="t-en">Program in memory</span>' +
         '<span class="np-cell" lang="ne">मेमोरीमा रहेको प्रोग्राम</span></span>';
    PROGRAM.forEach(function (p, i){
      h += '<div class="cpu-line" data-cpu-instr="' + i + '">' +
           '<span class="cpu-addr">' + hex(p.addr, 4) + '</span>' +
           '<span class="cpu-code">' + esc(p.text) + '</span></div>';
    });
    h += '</div>';

    h += '<div class="cpu-stages" role="list">';
    ['FETCH', 'DECODE', 'EXECUTE', 'STORE'].forEach(function (s){
      h += '<span class="cpu-stage" role="listitem" data-cpu-stage="' + s + '">' + s + '</span>';
    });
    h += '</div>';

    h += '<div class="cpu-grid">';
    h += block('cu', 'Control Unit', 'कन्ट्रोल युनिट', 'decodes and directs');
    h += block('alu', 'ALU', 'ए–एल–यू', 'adds, subtracts, compares');
    h += reg('acc', 'A (Accumulator)');
    h += reg('regb', 'B');
    h += reg('pc', 'PC');
    h += reg('ir', 'IR');
    h += bus('addrbus', 'Address bus', '16-bit, one way');
    h += bus('databus', 'Data bus', '8-bit, two way');
    h += block('mem', 'Memory', 'मेमोरी', 'holds the program and the data');
    h += '<div class="cpu-cell cpu-flags" data-cpu-el="flags"><span class="cpu-n">Flags</span>' +
         '<span class="cpu-flagset">' +
         '<span data-cpu-flag="S">S 0</span><span data-cpu-flag="Z">Z 0</span>' +
         '<span data-cpu-flag="CY">CY 0</span></span></div>';
    h += '</div>';

    h += '<div class="sim-controls">' +
         '<span class="sim-controls-label"><span class="t-en">Step through one instruction cycle at a time</span>' +
         '<span class="np-cell" lang="ne">एक पटकमा एउटा चरण अघि बढ्नुहोस्</span></span>' +
         '<button type="button" data-cpu-act="prev" data-ui="prev">&#9666; Prev</button>' +
         '<button type="button" class="primary" data-cpu-act="next" data-ui="next">Next &#9656;</button>' +
         '<button type="button" class="coral" data-cpu-act="reset" data-ui="reset">Reset</button>' +
         '<span class="cpu-progress" aria-live="polite"></span></div>';

    h += '<div class="cpu-say" role="status"><span class="cpu-say-en t-en"></span>' +
         '<span class="cpu-say-ne np-cell" lang="ne"></span></div>';

    this.root.innerHTML = h;
    this.apply();

    function block(id, en, ne, sub){
      return '<div class="cpu-cell cpu-block" data-cpu-el="' + id + '">' +
             '<span class="cpu-n">' + en + '<span class="np-cell" lang="ne">' + ne + '</span></span>' +
             '<span class="cpu-sub">' + sub + '</span></div>';
    }
    function reg(id, label){
      return '<div class="cpu-cell cpu-reg" data-cpu-el="' + id + '">' +
             '<span class="cpu-n">' + label + '</span>' +
             '<span class="cpu-v" data-cpu-val="' + id + '">00H</span></div>';
    }
    function bus(id, label, sub){
      return '<div class="cpu-cell cpu-bus" data-cpu-el="' + id + '">' +
             '<span class="cpu-n">' + label + '</span>' +
             '<span class="cpu-v" data-cpu-val="' + id + '">—</span>' +
             '<span class="cpu-sub">' + sub + '</span></div>';
    }
  };

  CPU.prototype.apply = function (){
    var st = this.stateAt(this.i);
    var root = this.root;
    var s = this.i > 0 ? STEPS[this.i - 1] : null;

    var set = function (id, text){
      var el = root.querySelector('[data-cpu-val="' + id + '"]');
      if (el) el.textContent = text;
    };
    set('acc', hex(st.acc));
    set('regb', hex(st.regB));
    set('pc', hex(st.pc, 4));
    set('ir', st.ir || '—');
    set('addrbus', st.addr ? hex(st.addr, 4) : '—');
    set('databus', this.i > 0 ? hex(st.data) : '—');

    var cells = root.querySelectorAll('[data-cpu-el]');
    for (var i = 0; i < cells.length; i++){
      var id = cells[i].getAttribute('data-cpu-el');
      cells[i].classList.toggle('is-active', st.active.indexOf(id) > -1);
    }

    var flags = root.querySelectorAll('[data-cpu-flag]');
    for (var f = 0; f < flags.length; f++){
      var name = flags[f].getAttribute('data-cpu-flag');
      flags[f].textContent = name + ' ' + st.flags[name];
      flags[f].classList.toggle('on', st.flags[name] === 1);
    }

    var stages = root.querySelectorAll('[data-cpu-stage]');
    for (var g = 0; g < stages.length; g++){
      stages[g].classList.toggle('is-active',
        stages[g].getAttribute('data-cpu-stage') === st.stage);
    }

    var lines = root.querySelectorAll('[data-cpu-instr]');
    for (var l = 0; l < lines.length; l++){
      lines[l].classList.toggle('is-active',
        Number(lines[l].getAttribute('data-cpu-instr')) === st.instr);
    }

    var prog = root.querySelector('.cpu-progress');
    if (prog){
      var word = (typeof UIStrings !== 'undefined') ? UIStrings.get('stepOf') : 'step';
      prog.textContent = word + ' ' + this.i + ' / ' + STEPS.length;
    }

    var prev = root.querySelector('[data-cpu-act="prev"]');
    var next = root.querySelector('[data-cpu-act="next"]');
    if (prev) prev.disabled = this.i === 0;
    if (next) next.disabled = this.i >= STEPS.length;

    var en = root.querySelector('.cpu-say-en');
    var ne = root.querySelector('.cpu-say-ne');
    if (en) en.textContent = s ? s.en
      : 'Press Next to run the first instruction. Watch which block lights up at each stage.';
    if (ne) ne.textContent = s ? s.ne
      : 'पहिलो निर्देशन चलाउन Next थिच्नुहोस्। हरेक चरणमा कुन भाग बल्छ हेर्नुहोस्।';
  };

  CPU.prototype.onClick = function (e){
    var b = e.target.closest ? e.target.closest('[data-cpu-act]') : null;
    if (!b) return;
    var a = b.getAttribute('data-cpu-act');
    if (a === 'next' && this.i < STEPS.length) this.i++;
    else if (a === 'prev' && this.i > 0) this.i--;
    else if (a === 'reset') this.i = 0;
    this.apply();
  };
  CPU.prototype.reset = function (){ this.i = 0; this.apply(); };

  function mountAll(){
    var nodes = document.querySelectorAll('.cpu8085');
    for (var i = 0; i < nodes.length; i++){
      (function (root, i){
        var cpu = new CPU(root);
        root.addEventListener('click', function (e){ cpu.onClick(e); });
        /* A composed string ("step 7 / 12") cannot be a plain data-ui
           key, so it is re-rendered on a language change. Safe because
           the render is state-driven: it reads the current step rather
           than advancing it, so nothing the student did is lost. */
        document.addEventListener('languagechange', function (){ cpu.apply(); });
        if (typeof SimulationService !== 'undefined'){
          SimulationService.register({
            id: 'cpu:' + (root.id || ('cpu8085' + i)),
            subject: 'grade10/digital-design', unit: 'u5',
            title: { en: '8085 instruction cycle', ne: '8085 निर्देशन चक्र' },
            mounts: function (){ return !!root.parentNode; },
            reset: function (){ cpu.reset(); },
            controls: [
              { id: 'next', label: { en: 'Next stage', ne: 'अर्को चरण' } },
              { id: 'prev', label: { en: 'Previous stage', ne: 'अघिल्लो चरण' } },
              { id: 'reset', label: { en: 'Start again', ne: 'फेरि सुरु' } }
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

  global.CPU8085 = { mount: mountAll, CPU: CPU, STEPS: STEPS, PROGRAM: PROGRAM };
  if (typeof module !== 'undefined' && module.exports) module.exports = global.CPU8085;

})(typeof window !== 'undefined' ? window : globalThis);
