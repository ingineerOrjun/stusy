/* =========================================================
   PARTS LAB — "which one is that, and where is it?"

   THE PROBLEM THIS SOLVES
   Two of the three things a hardware paper asks about a component
   cannot be taught by text: what it looks like, and where it sits.
   The decision drill in sim-drill.js is the right tool for "P-type or
   N-type?" — a judgement between named options — and the wrong tool
   here, because the answer to "where is the northbridge" is a position
   on a board, not a word.

   WHY BUTTONS AND NOT A CLICKABLE SVG
   The obvious build is hotspots on the diagram. It is also the one that
   locks out every student who does not use a mouse: SVG shapes are not
   focusable, they take no accessible name, and a screen reader is handed
   a picture with nothing in it. So the control surface is a row of real
   <button>s — keyboard reachable, properly named, announced — and
   selecting one highlights the matching region IN the diagram.

   The student still learns the position. They just are not required to
   find it with a pointer first.

   THE DIAGRAM IS NOT DUPLICATED HERE
   The SVG comes from the diagram library via {{dia:...}} like every
   other figure, so it stays validated, themed and screen-reader titled.
   This component only adds behaviour on top of it, and refuses to mount
   if the highlight targets are missing rather than silently doing half
   a job.
   ========================================================= */
(function (global) {
  'use strict';

  var doc = global.document;
  if (!doc) return;

  function esc(s){
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* The house bilingual idiom. lang="ne" sits on the .t-ne span itself —
     markup a runtime writes never passes through the build's markNepali
     step, and without it an English voice reads the Devanagari. */
  function bi(en, ne){
    return '<span class="t-en">' + esc(en) + '</span>' +
           '<span class="t-ne" lang="ne">' + esc(ne) + '</span>';
  }
  function biBlock(en, ne){
    return '<span class="t-en">' + esc(en) + '</span>' +
           '<span class="np-cell" lang="ne">' + esc(ne) + '</span>';
  }

  var SETS = {

    /* ---- Unit 2: the four units of a computer system ---- */
    systemunits: {
      parts: [
        { id: 'su-in', name: { en: 'Input unit', ne: 'Input unit' },
          does: { en: 'Accepts data and instructions from outside and converts them into a form the computer can process.',
                  ne: 'बाहिरबाट data र निर्देशन लिन्छ र कम्प्युटरले प्रशोधन गर्न सक्ने रूपमा बदल्छ।' },
          exam: { en: 'Keyboard, mouse, scanner, digital camera. Naming four is a standard 2-mark answer.',
                  ne: 'Keyboard, mouse, scanner, digital camera। चार वटा नाम लेख्नु मानक २ अंकको उत्तर हो।' } },
        { id: 'su-alu', name: { en: 'ALU', ne: 'ALU' },
          does: { en: 'Arithmetic and Logic Unit — performs every calculation and every comparison. Nothing is decided anywhere else.',
                  ne: 'Arithmetic and Logic Unit — हरेक गणना र हरेक तुलना यहीँ हुन्छ। निर्णय अरू कतै हुँदैन।' },
          exam: { en: 'Arithmetic: + − × ÷. Logic: greater than, less than, equal to, AND/OR/NOT.',
                  ne: 'Arithmetic: + − × ÷। Logic: ठूलो, सानो, बराबर, AND/OR/NOT।' } },
        { id: 'su-cu', name: { en: 'Control unit', ne: 'Control unit' },
          does: { en: 'Directs the whole system: fetches each instruction, decodes it, and tells every other unit what to do and when.',
                  ne: 'पूरै प्रणाली निर्देशित गर्छ: हरेक निर्देशन ल्याउँछ, बुझ्छ, र अरू हरेक एकाइलाई कहिले के गर्ने भन्छ।' },
          exam: { en: 'It does NOT perform calculations — that is the ALU. Saying the CU calculates is the most common slip in this unit.',
                  ne: 'यसले गणना गर्दैन — त्यो ALU को काम हो। CU ले गणना गर्छ भन्नु यस युनिटको सबैभन्दा सामान्य गल्ती हो।' } },
        { id: 'su-mem', name: { en: 'Memory unit', ne: 'Memory unit' },
          does: { en: 'Holds the data and instructions being worked on now, and the results until they are sent out.',
                  ne: 'अहिले काम भइरहेको data र निर्देशन, र नतिजा बाहिर नपठाएसम्म राख्छ।' },
          exam: { en: 'ALU + Control unit + Memory together are the CPU. The examiner expects that grouping named.',
                  ne: 'ALU + Control unit + Memory मिलेर CPU बन्छ। परीक्षकले यही समूह नाम लिइएको खोज्छ।' } },
        { id: 'su-out', name: { en: 'Output unit', ne: 'Output unit' },
          does: { en: 'Converts processed results into a form a person can understand and presents them.',
                  ne: 'प्रशोधित नतिजालाई मान्छेले बुझ्ने रूपमा बदलेर देखाउँछ।' },
          exam: { en: 'Monitor, printer, speaker. A monitor is output only — a touchscreen is both.',
                  ne: 'Monitor, printer, speaker। Monitor आउटपुट मात्र हो — touchscreen भने दुवै हो।' } }
      ]
    },

    /* ---- Unit 3: what is on the motherboard ---- */
    motherboard: {
      parts: [
        { id: 'mb-cpu', name: { en: 'CPU socket', ne: 'CPU socket' },
          does: { en: 'Holds the processor and connects it to the board. The socket type must match the processor exactly.',
                  ne: 'प्रोसेसर राख्छ र बोर्डसँग जोड्छ। Socket को प्रकार प्रोसेसरसँग ठ्याक्कै मिल्नुपर्छ।' },
          exam: { en: 'Always under the heatsink and fan. A processor cannot be moved to a board with a different socket.',
                  ne: 'सधैं heatsink र पंखा मुनि हुन्छ। फरक socket भएको बोर्डमा प्रोसेसर सार्न मिल्दैन।' } },
        { id: 'mb-ram', name: { en: 'RAM slots', ne: 'RAM slot' },
          does: { en: 'Long slots holding the memory modules. Clips at both ends lock a module in place.',
                  ne: 'मेमोरी मोड्युल राख्ने लामा slot। दुवै छेउका क्लिपले मोड्युल अड्काउँछन्।' },
          exam: { en: 'A module that is not fully seated is the classic cause of "powers on, no display, repeated beeps".',
                  ne: 'राम्ररी नबसेको मोड्युल नै "चल्छ, स्क्रिन आउँदैन, बारम्बार बीप" को उत्कृष्ट उदाहरण हो।' } },
        { id: 'mb-pci', name: { en: 'PCI / expansion slots', ne: 'PCI / expansion slot' },
          does: { en: 'Take add-on cards — graphics, sound, network — extending what the board can do.',
                  ne: 'थप कार्ड लिन्छन् — graphics, sound, network — बोर्डको क्षमता बढाउँछन्।' },
          exam: { en: 'PCI is a local bus: it connects expansion cards close to the processor at high speed.',
                  ne: 'PCI एउटा local bus हो: यसले expansion कार्डलाई प्रोसेसरको नजिक उच्च गतिमा जोड्छ।' } },
        { id: 'mb-chip', name: { en: 'Chipset', ne: 'Chipset' },
          does: { en: 'Routes traffic between the processor, memory, expansion slots and the ports.',
                  ne: 'प्रोसेसर, मेमोरी, expansion slot र पोर्टबीचको ट्राफिक व्यवस्थापन गर्छ।' },
          exam: { en: 'Think of it as the board\'s traffic controller — it decides what talks to what.',
                  ne: 'यसलाई बोर्डको ट्राफिक नियन्त्रक ठान्नुहोस् — कसले कोसँग कुरा गर्ने यसैले तय गर्छ।' } },
        { id: 'mb-bios', name: { en: 'BIOS chip and CMOS battery', ne: 'BIOS चिप र CMOS ब्याट्री' },
          does: { en: 'The BIOS chip holds the firmware that starts the machine. The battery keeps the settings and clock alive when the power is off.',
                  ne: 'BIOS चिपमा मेसिन सुरु गर्ने firmware हुन्छ। ब्याट्रीले बिजुली नहुँदा सेटिङ र घडी जीवित राख्छ।' },
          exam: { en: 'A clock that resets to a wrong date on every boot is the standard symptom of a dead CMOS battery.',
                  ne: 'हरेक पटक बुट हुँदा घडी गलत मितिमा फर्किनु मरेको CMOS ब्याट्रीको मानक लक्षण हो।' } },
        { id: 'mb-pwr', name: { en: 'Power connector', ne: 'Power connector' },
          does: { en: 'Where the power supply feeds the board. A separate smaller connector feeds the processor.',
                  ne: 'पावर सप्लाईले बोर्डलाई बिजुली दिने ठाउँ। प्रोसेसरका लागि छुट्टै सानो connector हुन्छ।' },
          exam: { en: 'Forgetting the separate CPU power connector gives a machine with fans spinning and no display.',
                  ne: 'छुट्टै CPU power connector बिर्सिँदा पंखा घुम्छ तर स्क्रिन आउँदैन।' } },
        { id: 'mb-sata', name: { en: 'Drive connectors', ne: 'ड्राइभ connector' },
          does: { en: 'Connect the hard disk and optical drive to the board for data.',
                  ne: 'Hard disk र optical drive लाई data का लागि बोर्डसँग जोड्छन्।' },
          exam: { en: 'Data and power are two separate cables. A drive with only power connected spins but is never detected.',
                  ne: 'Data र power छुट्टाछुट्टै केबल हुन्। पावर मात्र जोडिएको ड्राइभ घुम्छ तर कहिल्यै पत्ता लाग्दैन।' } }
      ]
    }
  };

  /* ---------------------------------------------------------------
     ONE MOUNTED LAB
     --------------------------------------------------------------- */
  function Lab(root){
    this.root = root;
    var key = root.getAttribute('data-set') || '';
    this.set = SETS[key];
    this.svg = root.querySelector('svg');
    this.panel = root.querySelector('.parts-panel');
    this.i = -1;

    /* Refuse rather than half-mount. A lab whose highlight targets are
       missing looks like it works and teaches the one thing it exists
       to teach — position — incorrectly. */
    if (!this.set || !this.svg || !this.panel) return;
    var svg = this.svg;
    this.parts = this.set.parts.filter(function (p){
      return !!svg.querySelector('#' + p.id);
    });
    if (this.parts.length !== this.set.parts.length) return;

    this.render();
    this.wire();
    this.mounted = true;
  }

  Lab.prototype.render = function (){
    var h = '<div class="parts-btns" role="group" aria-label="Choose a component to locate">';
    h += this.parts.map(function (p, k){
      return '<button type="button" class="parts-btn" data-parts-i="' + k + '" ' +
             'aria-pressed="false">' + bi(p.name.en, p.name.ne) + '</button>';
    }).join('');
    h += '</div>';
    h += '<div class="parts-info" role="status"></div>';
    this.panel.innerHTML = h;
    this.info = this.panel.querySelector('.parts-info');
    this.btns = [].slice.call(this.panel.querySelectorAll('.parts-btn'));
    this.paintInfo();
  };

  Lab.prototype.paintInfo = function (){
    if (this.i < 0){
      this.info.innerHTML = '<p class="parts-hint">' +
        biBlock('Choose a component and it will be highlighted on the diagram.',
                'कुनै भाग छान्नुहोस्, चित्रमा त्यही ठाउँ उज्यालो हुनेछ।') + '</p>';
      return;
    }
    var p = this.parts[this.i];
    this.info.innerHTML =
      '<h5 class="parts-name">' + bi(p.name.en, p.name.ne) + '</h5>' +
      '<p class="parts-does">' + biBlock(p.does.en, p.does.ne) + '</p>' +
      '<p class="parts-exam"><span class="parts-tag">' +
        bi('In the exam', 'परीक्षामा') + '</span> ' +
        biBlock(p.exam.en, p.exam.ne) + '</p>';
  };

  Lab.prototype.select = function (k){
    this.i = k;
    var svg = this.svg;
    this.parts.forEach(function (p, j){
      var el = svg.querySelector('#' + p.id);
      if (el) el.classList.toggle('lit', j === k);
    });
    this.btns.forEach(function (b, j){
      b.setAttribute('aria-pressed', j === k ? 'true' : 'false');
    });
    this.paintInfo();
  };

  Lab.prototype.wire = function (){
    var self = this;
    this.panel.addEventListener('click', function (e){
      var b = e.target.closest ? e.target.closest('.parts-btn') : null;
      if (!b || !self.panel.contains(b)) return;
      self.select(parseInt(b.getAttribute('data-parts-i'), 10));
    });
  };

  function mount(){
    var labs = doc.querySelectorAll('.parts-lab');
    for (var i = 0; i < labs.length; i++){
      if (labs[i].getAttribute('data-parts-mounted')) continue;
      var lab = new Lab(labs[i]);
      if (lab.mounted) labs[i].setAttribute('data-parts-mounted', '1');
    }
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', mount);
  else mount();

  global.PartsLab = { mount: mount, sets: function (){ return Object.keys(SETS); } };

})(typeof window !== 'undefined' ? window : this);
