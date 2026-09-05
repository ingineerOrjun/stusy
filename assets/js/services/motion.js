/* =========================================================
   MotionService — the one place that decides how fast
   anything in the product moves, and whether it moves at all.

       component  ->  MotionService  ->  timing + reduced-motion + lifecycle

   Why this exists: the CSS `prefers-reduced-motion` rule can zero a
   transition, but it cannot touch a JavaScript-paced sequence. The step
   players run on setTimeout, so a student who asked their operating
   system for reduced motion still waited 760ms per step through a
   25-step trace. Timing has to go through code that knows the setting.

   It also owns the lifecycle rules the brief requires: nothing keeps
   animating while off-screen or while the tab is hidden.
   ========================================================= */
(function (global) {
  'use strict';

  var doc = global.document;

  /* ---------- reduced motion -------------------------------------- */

  var mq = (global.matchMedia)
    ? global.matchMedia('(prefers-reduced-motion: reduce)')
    : null;

  function prefersReduced(){ return !!(mq && mq.matches); }

  /* ---------- durations -------------------------------------------
     Names mirror the CSS tokens so the two never drift. When reduced
     motion is on, every duration collapses to zero EXCEPT the step
     pause: a narrated sequence still needs time to be read, and
     removing that would destroy the explanation rather than the
     animation. Reduced motion means less movement, not less teaching. */

  var DUR = {
    instant: 0,
    fast: 120,
    base: 200,
    slow: 320,
    deliberate: 520,
    step: 760
  };

  function ms(name){
    var v = DUR[name];
    if (v === undefined) throw new RangeError('MotionService: unknown duration "' + name + '"');
    if (!prefersReduced()) return v;
    return name === 'step' ? v : 0;      // keep reading time, drop movement
  }

  /* ---------- sequence player -------------------------------------
     The educational step engine. Callers supply steps and a renderer;
     this owns pacing, cancellation, and pause/resume. */

  function Sequence(opts){
    this.steps = opts.steps || [];
    this.onStep = opts.onStep || function(){};
    this.onDone = opts.onDone || function(){};
    this.pace = opts.pace || 'step';
    this.i = 0;
    this.timer = null;
    this.state = 'idle';                 // idle | playing | paused | done
  }

  Sequence.prototype._schedule = function(){
    var self = this;
    this.timer = global.setTimeout(function(){
      self.timer = null;
      self._advance();
    }, ms(this.pace));
  };

  Sequence.prototype._advance = function(){
    if (this.state !== 'playing') return;
    if (this.i >= this.steps.length){
      this.state = 'done';
      this.onDone();
      return;
    }
    this.onStep(this.steps[this.i], this.i);
    this.i++;
    this._schedule();
  };

  Sequence.prototype.play = function(){
    if (this.state === 'playing' || this.state === 'done') return this;
    this.state = 'playing';
    this._advance();
    return this;
  };

  Sequence.prototype.pause = function(){
    if (this.state !== 'playing') return this;
    this.state = 'paused';
    if (this.timer){ global.clearTimeout(this.timer); this.timer = null; }
    return this;
  };

  Sequence.prototype.resume = function(){
    if (this.state !== 'paused') return this;
    this.state = 'playing';
    this._schedule();
    return this;
  };

  /* Move to a specific step without playing — this is what makes a
     sequence steppable backwards, which autoplay alone cannot do. */
  Sequence.prototype.goTo = function(n){
    this.pause();
    this.i = Math.max(0, Math.min(n, this.steps.length));
    this.state = this.i >= this.steps.length ? 'done' : 'idle';
    return this;
  };

  Sequence.prototype.reset = function(){
    this.pause();
    this.i = 0;
    this.state = 'idle';
    return this;
  };

  Sequence.prototype.destroy = function(){
    this.pause();
    this.steps = [];
    this.state = 'done';
  };

  /* ---------- lifecycle -------------------------------------------
     Nothing animates while it cannot be seen. Registered sequences are
     paused when the tab is hidden and when their element scrolls out of
     view, and resumed only if they were playing when they were parked. */

  var registry = [];

  function register(seq, el){
    var entry = { seq: seq, el: el, parked: false };
    registry.push(entry);

    if (el && global.IntersectionObserver){
      entry.io = new global.IntersectionObserver(function(entries){
        for (var i = 0; i < entries.length; i++){
          if (entries[i].isIntersecting) unpark(entry);
          else park(entry);
        }
      }, { threshold: 0.01 });
      entry.io.observe(el);
    }
    return function unregister(){
      if (entry.io) entry.io.disconnect();
      var k = registry.indexOf(entry);
      if (k > -1) registry.splice(k, 1);
    };
  }

  function park(entry){
    if (entry.seq.state === 'playing'){ entry.parked = true; entry.seq.pause(); }
  }
  function unpark(entry){
    if (entry.parked){ entry.parked = false; entry.seq.resume(); }
  }

  if (doc && doc.addEventListener){
    doc.addEventListener('visibilitychange', function(){
      for (var i = 0; i < registry.length; i++){
        if (doc.hidden) park(registry[i]); else unpark(registry[i]);
      }
    });
  }

  /* ---------- primitives -------------------------------------------
     Small, composable behaviours rather than a component per effect.
     Each returns the element so calls can chain, and each is a no-op
     under reduced motion where the movement carries no extra meaning.

     State classes are shared with the design system, so a "success" in
     a diagram looks like a "success" in the quiz. */

  var STATE = ['is-idle','is-active','is-selected','is-processing',
               'is-success','is-error','is-complete','is-disabled'];

  function setState(el, state){
    if (!el) return el;
    for (var i = 0; i < STATE.length; i++) el.classList.remove(STATE[i]);
    if (state) el.classList.add('is-' + state);
    return el;
  }

  function activate(el){ return setState(el, 'active'); }
  function deactivate(el){ return setState(el, null); }

  /* A one-shot attention pulse. Deliberately finite: an element that
     pulses forever is decoration, and the brief forbids it. */
  function pulse(el){
    if (!el || prefersReduced()) return el;
    el.classList.remove('fx-pulse');
    void el.getBoundingClientRect();          // restart the animation
    el.classList.add('fx-pulse');
    global.setTimeout(function(){ el.classList.remove('fx-pulse'); }, DUR.deliberate);
    return el;
  }

  /* Connect an old value to a new one so the student sees WHY it changed,
     rather than the number simply being different. */
  function changeValue(el, next){
    if (!el) return el;
    if (prefersReduced()){ el.textContent = next; return el; }
    el.classList.add('fx-value-out');
    global.setTimeout(function(){
      el.textContent = next;
      el.classList.remove('fx-value-out');
      el.classList.add('fx-value-in');
      global.setTimeout(function(){ el.classList.remove('fx-value-in'); }, DUR.base);
    }, DUR.fast);
    return el;
  }

  var MotionService = {
    prefersReduced: prefersReduced,
    ms: ms,
    durations: function(){ var o = {}; for (var k in DUR) o[k] = DUR[k]; return o; },

    sequence: function(opts){ return new Sequence(opts); },
    register: register,

    setState: setState,
    activate: activate,
    deactivate: deactivate,
    pulse: pulse,
    changeValue: changeValue,

    /* test seam */
    _registry: function(){ return registry.length; }
  };

  global.MotionService = MotionService;
  if (typeof module !== 'undefined' && module.exports) module.exports = MotionService;

})(typeof window !== 'undefined' ? window : globalThis);
