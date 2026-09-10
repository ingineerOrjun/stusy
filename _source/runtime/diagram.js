/* =========================================================
   DiagramRuntime — step-driven animated diagrams.

       Initial state → action → transition → new state → explanation

   The model is STATE-DRIVEN, not a chain of DOM mutations. Showing
   step N means: reset every animatable element to its base state, then
   apply steps 0…N in order. Two consequences that matter:

     - stepping backwards is exact, not an "undo" guess
     - a diagram can be jumped to any step, replayed, or reset, and
       always looks identical for a given step number

   A diagram author writes SVG with ids plus a list of steps. They write
   no JavaScript and no CSS.

   Controls are delegated from the document, so any number of diagrams on
   a page cost one listener and no inline handlers (keeping the CSP path
   open — see docs/SECURITY.md).
   ========================================================= */
(function (global) {
  'use strict';

  var configs = Object.create(null);
  var instances = Object.create(null);

  /* ---------- registration (called by generated diagram-data.js) ---- */

  function register(name, cfg){
    if (typeof name !== 'string' || !name) throw new TypeError('DiagramRuntime: name required');
    if (!cfg || !Array.isArray(cfg.steps) || !cfg.steps.length){
      throw new TypeError('DiagramRuntime(' + name + '): steps must be a non-empty array');
    }
    for (var i = 0; i < cfg.steps.length; i++){
      var s = cfg.steps[i];
      if (!s || typeof s.en !== 'string' || !s.en){
        throw new TypeError('DiagramRuntime(' + name + '): step ' + (i + 1) + ' has no English caption');
      }
      if (typeof s.ne !== 'string' || !s.ne){
        throw new TypeError('DiagramRuntime(' + name + '): step ' + (i + 1) + ' has no Nepali caption');
      }
    }
    configs[name] = cfg;
    return cfg.steps.length;
  }

  /* ---------- one mounted diagram ---------------------------------- */

  function Diagram(root, name, cfg){
    this.root = root;
    this.name = name;
    this.cfg = cfg;
    this.svg = root.querySelector('svg');
    this.capEn = root.querySelector('.dia-cap-en');
    this.capNe = root.querySelector('.dia-cap-ne');
    this.progress = root.querySelector('.dia-progress');
    this.step = 0;                      // 0 = initial state, before step 1
    this.seq = null;
    this.applyTo(0);
  }

  Diagram.prototype.$ = function(sel){
    return this.svg ? this.svg.querySelectorAll(sel) : [];
  };

  /* Every selector this diagram's steps can touch, collected once.

     WHY THIS EXISTS. reset() used to clear only elements carrying an
     animation class — .dia-step and friends. Every animated diagram in
     the product marks its stages as plain `<g id="...">` with no class
     at all, so _applyStep could add `.on` to them and reset could never
     take it off.

     Forward stepping only ever adds, which is why this survived from
     Phase 2 to here unnoticed: Next looked perfect. Prev and Reset were
     visually inert on all fifteen animated diagrams — the caption and
     the counter moved back while the picture stayed fully revealed, so
     a student stepping back read "POST is running" over a finished
     boot, and Reset handed the next student the answer labelled
     "step 0".

     Collecting the step selectors is narrower than clearing every `.on`
     in the SVG: it touches exactly what the steps themselves target and
     nothing an author lit deliberately in the base markup. */
  Diagram.prototype._targets = function(){
    if (this._targetSel) return this._targetSel;
    var seen = {};
    var add = function(list){
      if (!list) return;
      var arr = typeof list === 'string' ? [list] : list;
      for (var i = 0; i < arr.length; i++) seen[arr[i]] = true;
    };
    var steps = (this.cfg && this.cfg.steps) || [];
    for (var i = 0; i < steps.length; i++){
      var s = steps[i];
      add(s.show); add(s.hide); add(s.focus);
      if (s.state) for (var k in s.state) if (Object.prototype.hasOwnProperty.call(s.state, k)) seen[k] = true;
      if (s.move)  for (var m in s.move)  if (Object.prototype.hasOwnProperty.call(s.move, m))  seen[m] = true;
    }
    var out = [];
    for (var sel in seen) if (Object.prototype.hasOwnProperty.call(seen, sel)) out.push(sel);
    this._targetSel = out;
    return out;
  };

  /* Return every animatable element to its base state. */
  Diagram.prototype.reset = function(){
    var self = this;
    var clear = function(el){
      el.classList.remove('on');
      el.removeAttribute('transform');
      if (global.MotionService) MotionService.setState(el, null);
    };

    var marked = this.$('.dia-step, .dia-dim, .dia-focus, .dia-draw, .dia-travel');
    for (var i = 0; i < marked.length; i++) clear(marked[i]);

    var sels = this._targets();
    for (var j = 0; j < sels.length; j++){
      var els = self.$(sels[j]);
      for (var k = 0; k < els.length; k++) clear(els[k]);
    }
    return this;
  };

  Diagram.prototype._applyStep = function(s){
    var self = this;
    function each(list, fn){
      if (!list) return;
      var arr = typeof list === 'string' ? [list] : list;
      for (var i = 0; i < arr.length; i++){
        var els = self.$(arr[i]);
        for (var j = 0; j < els.length; j++) fn(els[j]);
      }
    }
    each(s.show,  function(el){ el.classList.add('on'); });
    each(s.hide,  function(el){ el.classList.remove('on'); });
    each(s.focus, function(el){ el.classList.add('on'); });
    if (s.state){
      for (var sel in s.state){
        if (!Object.prototype.hasOwnProperty.call(s.state, sel)) continue;
        (function(v){
          each(sel, function(el){
            if (global.MotionService) MotionService.setState(el, v);
            else el.classList.add('is-' + v);
          });
        })(s.state[sel]);
      }
    }
    /* move an element along the diagram's own coordinate system */
    if (s.move){
      for (var msel in s.move){
        if (!Object.prototype.hasOwnProperty.call(s.move, msel)) continue;
        (function(to){
          each(msel, function(el){
            el.classList.add('on');
            el.setAttribute('transform', 'translate(' + to[0] + ',' + to[1] + ')');
          });
        })(s.move[msel]);
      }
    }
  };

  /* Show state as of step n (1-based; 0 = initial). */
  Diagram.prototype.applyTo = function(n){
    n = Math.max(0, Math.min(n, this.cfg.steps.length));
    this.step = n;
    this.reset();
    for (var i = 0; i < n; i++) this._applyStep(this.cfg.steps[i]);

    var s = n > 0 ? this.cfg.steps[n - 1] : null;
    if (this.capEn) this.capEn.textContent = s ? s.en : (this.cfg.intro ? this.cfg.intro.en : '');
    if (this.capNe) this.capNe.textContent = s ? s.ne : (this.cfg.intro ? this.cfg.intro.ne : '');
    if (this.progress){
      var word = (typeof UIStrings !== 'undefined') ? UIStrings.get('stepOf') : 'step';
      var line = word + ' ' + n + ' / ' + this.cfg.steps.length;
      /* write() rather than textContent: in Nepali mode this reads
         "चरण 3 / 4", and without a lang an English voice speaks it. */
      if (typeof UIStrings !== 'undefined' && UIStrings.write) UIStrings.write(this.progress, line);
      else this.progress.textContent = line;
    }

    var prev = this.root.querySelector('[data-dia-act="prev"]');
    var next = this.root.querySelector('[data-dia-act="next"]');
    if (prev) prev.disabled = n === 0;
    if (next) next.disabled = n === this.cfg.steps.length;
    return this;
  };

  Diagram.prototype.next  = function(){ this.stop(); return this.applyTo(this.step + 1); };
  Diagram.prototype.prev  = function(){ this.stop(); return this.applyTo(this.step - 1); };
  Diagram.prototype.reboot = function(){ this.stop(); return this.applyTo(0); };

  Diagram.prototype.play = function(){
    if (!global.MotionService) { this.applyTo(this.cfg.steps.length); return this; }
    var self = this;
    this.stop();
    if (this.step >= this.cfg.steps.length) this.applyTo(0);
    this.seq = MotionService.sequence({
      steps: this.cfg.steps.slice(this.step),
      pace: 'step',
      onStep: function(){ self.applyTo(self.step + 1); },
      onDone: function(){ self.seq = null; self._syncPlayButton(); }
    });
    /* pause when scrolled away or the tab is hidden */
    this._unregister = MotionService.register(this.seq, this.root);
    this.seq.play();
    this._syncPlayButton();
    return this;
  };

  Diagram.prototype.stop = function(){
    if (this.seq){ this.seq.destroy(); this.seq = null; }
    if (this._unregister){ this._unregister(); this._unregister = null; }
    this._syncPlayButton();
    return this;
  };

  Diagram.prototype._syncPlayButton = function(){
    var b = this.root.querySelector('[data-dia-act="play"]');
    if (!b) return;
    var playing = !!this.seq;
    b.textContent = playing ? '❙❙ Pause' : '▶ Play';
    b.setAttribute('aria-pressed', playing ? 'true' : 'false');
  };

  /* ---------- mounting + delegated controls ------------------------ */

  function mount(){
    var roots = document.querySelectorAll('[data-dia]');
    for (var i = 0; i < roots.length; i++){
      var root = roots[i];
      var name = root.getAttribute('data-dia');
      var cfg = configs[name];
      if (!cfg){
        if (global.console && console.warn) console.warn('DiagramRuntime: no config registered for "' + name + '"');
        continue;
      }
      if (!instances[name]) instances[name] = [];
      instances[name].push(new Diagram(root, name, cfg));
    }
  }

  function find(el){
    var root = el.closest ? el.closest('[data-dia]') : null;
    if (!root) return null;
    var list = instances[root.getAttribute('data-dia')] || [];
    for (var i = 0; i < list.length; i++) if (list[i].root === root) return list[i];
    return null;
  }

  function onClick(e){
    var btn = e.target && e.target.closest ? e.target.closest('[data-dia-act]') : null;
    if (!btn) return;
    var d = find(btn);
    if (!d) return;
    var act = btn.getAttribute('data-dia-act');
    if (act === 'next') d.next();
    else if (act === 'prev') d.prev();
    else if (act === 'reset') d.reboot();
    else if (act === 'play'){ if (d.seq) d.stop(); else d.play(); }
  }

  function ready(fn){
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  ready(function(){
    mount();
    document.addEventListener('click', onClick);
    /* The step counter composes a word with numbers ("step 3 / 5"), so it
       cannot be a plain data-ui key. Re-apply the CURRENT step on a
       language change — state-driven, so the student stays where they
       were and only the wording changes. */
    document.addEventListener('languagechange', function(){
      for (var name in instances){
        if (!Object.prototype.hasOwnProperty.call(instances, name)) continue;
        instances[name].forEach(function(d){ d.applyTo(d.step); });
      }
    });
  });

  global.DiagramRuntime = {
    register: register,
    mount: mount,
    get: function(name){ return (instances[name] || [])[0] || null; },
    config: function(name){ return configs[name] || null; },
    names: function(){ return Object.keys(configs); }
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = global.DiagramRuntime;

})(typeof window !== 'undefined' ? window : globalThis);
