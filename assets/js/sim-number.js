/* =========================================================
   NUMBER WORKBENCH — Unit 1

   Two components, both driven by the same idea: a number does not
   change when you write it in another base. Only the notation changes.

   1. PLACE-VALUE CONVERTER   data-mode="convert"
      Eight bit switches. Toggling one shows, at the same moment, the
      place value it contributes and the new decimal, binary, octal and
      hexadecimal readings.

      Why interactive rather than animated: base conversion is a rule to
      *apply*, not a process to watch. A student who has switched bit 5
      on and seen 32 appear has learned the place value; a student who
      watched an animation of it has seen a number move.

   2. BINARY COLUMN ADDER     data-mode="add"
      Adds two binary numbers one column at a time, right to left, with
      the carry visible before it is used. Stepped, because the carry is
      the whole difficulty and it only exists between two columns.

   MARKUP CONTRACT
      <div class="numlab" data-mode="convert" data-bits="8"></div>
      <div class="numlab" data-mode="add" data-a="1011" data-b="0110"></div>
   ========================================================= */
(function (global) {
  'use strict';

  function esc(s){
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function pad(s, n){ while (s.length < n) s = '0' + s; return s; }

  /* ---------------------------------------------------------------
     1. PLACE-VALUE CONVERTER
     --------------------------------------------------------------- */
  function Converter(root){
    this.root = root;
    this.bits = Math.min(Math.max(parseInt(root.getAttribute('data-bits'), 10) || 8, 4), 8);
    this.v = new Array(this.bits).fill(0);
    this.render();
  }

  Converter.prototype.value = function (){
    var n = 0;
    for (var i = 0; i < this.bits; i++) n = n * 2 + this.v[i];
    return n;
  };

  Converter.prototype.render = function (){
    var h = '<div class="nl-bits" role="group" aria-label="Binary place values — click a bit to change it">';
    for (var i = 0; i < this.bits; i++){
      var power = this.bits - 1 - i;
      h += '<button type="button" class="nl-bit" role="switch" aria-checked="false" ' +
           'data-nl-bit="' + i + '" aria-label="Bit with place value ' + Math.pow(2, power) + '">' +
           '<span class="nl-pow">2<sup>' + power + '</sup></span>' +
           '<span class="nl-val">0</span>' +
           '<span class="nl-place">' + Math.pow(2, power) + '</span></button>';
    }
    h += '</div>';

    h += '<div class="nl-sum" role="status"><span class="nl-sum-en t-en"></span>' +
         '<span class="nl-sum-ne np-cell" lang="ne"></span></div>';

    h += '<div class="nl-out">' +
         row('Decimal', 'दशमलव', 'dec', 'base 10') +
         row('Binary', 'बाइनरी', 'bin', 'base 2') +
         row('Octal', 'अक्टल', 'oct', 'base 8') +
         row('Hexadecimal', 'हेक्साडेसिमल', 'hex', 'base 16') +
         '</div>';

    this.root.innerHTML = h;
    this.update();

    function row(en, ne, id, base){
      return '<div class="nl-row"><span class="nl-name">' + en +
             '<span class="np-cell" lang="ne">' + ne + '</span></span>' +
             '<span class="nl-base">' + base + '</span>' +
             '<output class="nl-num" data-nl-out="' + id + '">0</output></div>';
    }
  };

  Converter.prototype.update = function (){
    var n = this.value(), i;
    var btns = this.root.querySelectorAll('[data-nl-bit]');
    for (i = 0; i < btns.length; i++){
      var on = this.v[Number(btns[i].getAttribute('data-nl-bit'))] === 1;
      btns[i].classList.toggle('on', on);
      btns[i].setAttribute('aria-checked', on ? 'true' : 'false');
      btns[i].querySelector('.nl-val').textContent = on ? '1' : '0';
    }
    var set = function (root, id, text){
      var el = root.querySelector('[data-nl-out="' + id + '"]');
      if (el) el.textContent = text;
    };
    set(this.root, 'dec', String(n));
    set(this.root, 'bin', pad(n.toString(2), this.bits));
    set(this.root, 'oct', n.toString(8));
    set(this.root, 'hex', n.toString(16).toUpperCase());

    /* Spell out the addition the student has just built. This is the
       whole lesson of positional notation in one line. */
    var terms = [];
    for (i = 0; i < this.bits; i++){
      if (this.v[i]) terms.push(String(Math.pow(2, this.bits - 1 - i)));
    }
    var en = this.root.querySelector('.nl-sum-en');
    var ne = this.root.querySelector('.nl-sum-ne');
    if (terms.length){
      if (en) en.textContent = 'Every 1 adds its place value:  ' + terms.join(' + ') + '  =  ' + n;
      if (ne) ne.textContent = 'हरेक 1 ले आफ्नो स्थानीय मान जोड्छ:  ' + terms.join(' + ') + '  =  ' + n;
    } else {
      if (en) en.textContent = 'All bits are 0, so the value is 0. Switch a bit on to add its place value.';
      if (ne) ne.textContent = 'सबै बिट 0 छन्, त्यसैले मान 0 हो। कुनै बिट खोलेर त्यसको स्थानीय मान जोड्नुहोस्।';
    }
  };

  Converter.prototype.onClick = function (e){
    var b = e.target.closest ? e.target.closest('[data-nl-bit]') : null;
    if (!b) return;
    var i = Number(b.getAttribute('data-nl-bit'));
    this.v[i] = this.v[i] ? 0 : 1;
    this.update();
  };

  Converter.prototype.reset = function (){
    this.v = new Array(this.bits).fill(0);
    this.update();
  };

  /* ---------------------------------------------------------------
     2. BINARY COLUMN ADDER
     --------------------------------------------------------------- */
  function Adder(root){
    this.root = root;
    var a = (root.getAttribute('data-a') || '1011').replace(/[^01]/g, '');
    var b = (root.getAttribute('data-b') || '0110').replace(/[^01]/g, '');
    this.w = Math.max(a.length, b.length);
    this.a = pad(a, this.w).split('').map(Number);
    this.b = pad(b, this.w).split('').map(Number);
    this.step = 0;                       // 0 = nothing done yet
    this.compute();
    this.render();
  }

  /* Worked out in full up front so stepping forwards and backwards are
     the same operation — reading state, not undoing it. */
  Adder.prototype.compute = function (){
    this.carry = new Array(this.w + 1).fill(0);
    this.sum = new Array(this.w).fill(0);
    for (var i = this.w - 1; i >= 0; i--){
      var t = this.a[i] + this.b[i] + this.carry[i + 1];
      this.sum[i] = t % 2;
      this.carry[i] = t > 1 ? 1 : 0;
    }
  };

  Adder.prototype.render = function (){
    var i, h = '<div class="nl-add">';
    h += '<div class="nl-add-grid" style="--cols:' + (this.w + 1) + '">';

    h += '<span class="nl-lab">carry</span>';
    for (i = 0; i <= this.w; i++){
      h += '<span class="nl-cell nl-carry" data-nl-carry="' + i + '"></span>';
    }
    h += '<span class="nl-lab">A</span><span class="nl-cell nl-blank"></span>';
    for (i = 0; i < this.w; i++) h += '<span class="nl-cell nl-a" data-nl-col="' + i + '">' + this.a[i] + '</span>';

    h += '<span class="nl-lab">+ B</span><span class="nl-cell nl-blank"></span>';
    for (i = 0; i < this.w; i++) h += '<span class="nl-cell nl-b" data-nl-col="' + i + '">' + this.b[i] + '</span>';

    h += '<span class="nl-lab nl-lab-sum">sum</span>';
    h += '<span class="nl-cell nl-sumc" data-nl-sum="carryout"></span>';
    for (i = 0; i < this.w; i++) h += '<span class="nl-cell nl-sumc" data-nl-sum="' + i + '"></span>';
    h += '</div>';

    h += '<div class="sim-controls">' +
         '<span class="sim-controls-label"><span class="t-en">Add one column at a time — </span>' +
         '<span class="np-cell" lang="ne">एक–एक स्तम्भ जोड्दै जानुहोस्</span></span>' +
         '<button type="button" data-nl-act="prev" data-ui="prev">&#9666; Prev</button>' +
         '<button type="button" class="primary" data-nl-act="next" data-ui="next">Next &#9656;</button>' +
         '<button type="button" class="coral" data-nl-act="reset" data-ui="reset">Reset</button>' +
         '<span class="nl-progress" aria-live="polite"></span></div>';

    h += '<div class="nl-say" role="status"><span class="nl-say-en t-en"></span>' +
         '<span class="nl-say-ne np-cell" lang="ne"></span></div>';
    h += '</div>';

    this.root.innerHTML = h;
    this.apply();
  };

  /* Show the state after `step` columns have been added. Rebuilt from
     scratch each time rather than mutated, so Prev is exact. */
  Adder.prototype.apply = function (){
    var i, self = this;
    var done = this.step;                       // columns completed, from the right
    var $ = function (s){ return self.root.querySelectorAll(s); };

    var cells = $('[data-nl-sum]');
    for (i = 0; i < cells.length; i++){
      var key = cells[i].getAttribute('data-nl-sum');
      var idx = key === 'carryout' ? -1 : Number(key);
      var shown = idx === -1
        ? (done > this.w ? (this.carry[0] ? '1' : '') : '')
        : (idx >= this.w - done ? String(this.sum[idx]) : '');
      cells[i].textContent = shown;
      cells[i].classList.toggle('is-active', idx === this.w - done && done > 0 && done <= this.w);
    }

    var carries = $('[data-nl-carry]');
    for (i = 0; i < carries.length; i++){
      var ci = Number(carries[i].getAttribute('data-nl-carry'));
      /* carry[ci] is produced by column ci and used by column ci-1 */
      var visible = ci >= this.w - done && ci <= this.w;
      carries[i].textContent = visible && this.carry[ci] ? '1' : '';
      carries[i].classList.toggle('is-active', visible && ci === this.w - done && this.carry[ci] === 1);
    }

    var cols = $('[data-nl-col]');
    for (i = 0; i < cols.length; i++){
      var on = Number(cols[i].getAttribute('data-nl-col')) === this.w - done && done > 0 && done <= this.w;
      cols[i].classList.toggle('is-active', on);
    }

    var prog = this.root.querySelector('.nl-progress');
    if (prog){
      var word = (typeof UIStrings !== 'undefined' && LanguageService && LanguageService.get() === 'ne')
        ? 'स्तम्भ' : 'column';
      prog.textContent = word + ' ' + Math.min(this.step, this.w) + ' / ' + this.w;
    }

    var prev = this.root.querySelector('[data-nl-act="prev"]');
    var next = this.root.querySelector('[data-nl-act="next"]');
    if (prev) prev.disabled = this.step === 0;
    if (next) next.disabled = this.step > this.w;

    this.say();
  };

  Adder.prototype.say = function (){
    var en = this.root.querySelector('.nl-say-en');
    var ne = this.root.querySelector('.nl-say-ne');
    var i = this.w - this.step;
    var msgEn, msgNe;

    if (this.step === 0){
      msgEn = 'Start at the RIGHTMOST column, exactly as in decimal addition. Press Next.';
      msgNe = 'दशमलव जोडमा झैं सबैभन्दा दायाँको स्तम्भबाट सुरु गर्नुहोस्। Next थिच्नुहोस्।';
    } else if (this.step > this.w){
      var total = parseInt(this.sum.join(''), 2) + (this.carry[0] ? Math.pow(2, this.w) : 0);
      msgEn = 'Done. ' + (this.carry[0]
        ? 'The last carry has nowhere to go inside ' + this.w + ' bits, so it becomes an extra digit on the left. '
        : '') + 'The answer is ' + (this.carry[0] ? '1' : '') + this.sum.join('') +
        ' in binary, which is ' + total + ' in decimal.';
      msgNe = 'सकियो। ' + (this.carry[0]
        ? 'अन्तिम क्यारीलाई ' + this.w + ' बिटभित्र ठाउँ नभएकाले बायाँतिर थप अङ्क बन्छ। '
        : '') + 'उत्तर बाइनरीमा ' + (this.carry[0] ? '1' : '') + this.sum.join('') +
        ' हो, जुन दशमलवमा ' + total + ' हुन्छ।';
    } else {
      /* Phrased from the actual operands. A canned rule string would say
         "1 + 1 = 10" while the column on screen reads 0 + 1 + carry 1,
         which teaches the student to distrust the caption. */
      var carryIn = this.carry[i + 1];
      var t = this.a[i] + this.b[i] + carryIn;
      var sumEn = this.a[i] + ' + ' + this.b[i] + (carryIn ? ' + carry ' + carryIn : '');
      var sumNe = this.a[i] + ' + ' + this.b[i] + (carryIn ? ' + क्यारी ' + carryIn : '');
      var inBinary = t < 2 ? String(t) : (t === 2 ? '10' : '11');

      msgEn = 'Column ' + this.step + ': ' + sumEn + ' = ' + t +
              (t < 2
                ? '. Write ' + this.sum[i] + '.'
                : ', which is ' + inBinary + ' in binary — too big for one column. ' +
                  'Write ' + this.sum[i] + ' here and carry 1 into the next column.');
      msgNe = 'स्तम्भ ' + this.step + ': ' + sumNe + ' = ' + t +
              (t < 2
                ? '। ' + this.sum[i] + ' लेख्नुहोस्।'
                : ', जुन बाइनरीमा ' + inBinary + ' हो — एउटै स्तम्भमा अट्दैन। ' +
                  'यहाँ ' + this.sum[i] + ' लेख्नुहोस् र 1 क्यारी अर्को स्तम्भमा लैजानुहोस्।');
    }
    if (en) en.textContent = msgEn;
    if (ne) ne.textContent = msgNe;
  };

  Adder.prototype.onClick = function (e){
    var b = e.target.closest ? e.target.closest('[data-nl-act]') : null;
    if (!b) return;
    var act = b.getAttribute('data-nl-act');
    if (act === 'next' && this.step <= this.w) this.step++;
    else if (act === 'prev' && this.step > 0) this.step--;
    else if (act === 'reset') this.step = 0;
    this.apply();
  };
  Adder.prototype.reset = function (){ this.step = 0; this.apply(); };

  /* ---------------------------------------------------------------
     mounting
     --------------------------------------------------------------- */
  function mountAll(){
    var nodes = document.querySelectorAll('.numlab');
    for (var i = 0; i < nodes.length; i++){
      (function (root, i){
        var mode = root.getAttribute('data-mode') || 'convert';
        var inst = mode === 'add' ? new Adder(root) : new Converter(root);
        root.addEventListener('click', function (e){ inst.onClick(e); });
        /* A composed string ("step 7 / 12") cannot be a plain data-ui
           key, so it is re-rendered on a language change. Safe because
           the render is state-driven: it reads the current step rather
           than advancing it, so nothing the student did is lost. */
        document.addEventListener('languagechange', function (){
          if (inst.apply) inst.apply(); else inst.update();
        });
        root.addEventListener('keydown', function (e){
          if ((e.key === ' ' || e.key === 'Enter') && e.target.closest('[data-nl-bit]')){
            e.preventDefault(); inst.onClick(e);
          }
        });
        if (typeof SimulationService !== 'undefined'){
          SimulationService.register({
            id: 'number:' + (root.id || ('numlab' + i)),
            subject: 'grade10/digital-design', unit: 'u1',
            title: mode === 'add'
              ? { en: 'Binary column adder', ne: 'बाइनरी स्तम्भ जोड' }
              : { en: 'Place-value converter', ne: 'स्थानीय मान परिवर्तक' },
            mounts: function (){ return !!root.parentNode; },
            reset: function (){ inst.reset(); },
            controls: mode === 'add'
              ? [{ id: 'next', label: { en: 'Next column', ne: 'अर्को स्तम्भ' } },
                 { id: 'prev', label: { en: 'Previous column', ne: 'अघिल्लो स्तम्भ' } },
                 { id: 'reset', label: { en: 'Start again', ne: 'फेरि सुरु' } }]
              : [{ id: 'bit', label: { en: 'Toggle a bit', ne: 'बिट बदल्नुहोस्' } }]
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

  global.NumberLab = { mount: mountAll, Converter: Converter, Adder: Adder };
  if (typeof module !== 'undefined' && module.exports) module.exports = global.NumberLab;

})(typeof window !== 'undefined' ? window : globalThis);
