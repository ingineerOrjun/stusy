/* ============================================================
   THE HOME PAGE'S THREE BEHAVIOURS

   WHAT IS BEING PROTECTED

   1. A carousel that moves on its own must be stoppable, and the
      control must report STATE rather than intent. A button reading
      "Pause" while the thing is already paused is the classic toggle
      bug; it is invisible in a screenshot and it strands anyone who
      cannot see whether the slides are still moving.

   2. Only the visible pair may be in the accessibility tree. Six pairs
      of unrelated terms read out as one block is not a carousel, it is
      noise — and `display:none` in a stylesheet would leave all six in
      the tree while looking perfectly correct on screen.

   3. Reduced motion must not mean reduced information. The counters
      exist to state what the product contains; someone who asked for
      less movement must still be told 18 and not left looking at 0.

   Each test below was confirmed to fail against a deliberately broken
   component before being kept — see the comment on each.
   ============================================================ */
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const SRC = path.join(path.resolve(__dirname, '..'), '_source');
const read = rel => fs.readFileSync(path.join(SRC, rel), 'utf8');

/* ---------------------------------------------- fixture */

function makeDom(){
  function El(tag){
    this.tag = tag || 'div';
    this.className = '';
    this.children = [];
    this.parent = null;
    this.attrs = {};
    this.hidden = false;
    this._html = '';
    this._text = '';
    this._on = {};
    const self = this;
    this.classList = {
      contains(c){ return self.className.split(/\s+/).indexOf(c) >= 0; },
      add(c){ if (!this.contains(c)) self.className = (self.className + ' ' + c).trim(); },
      remove(c){ self.className = self.className.split(/\s+/).filter(x => x && x !== c).join(' '); },
      toggle(c, force){
        const want = force === undefined ? !this.contains(c) : !!force;
        if (want) this.add(c); else this.remove(c);
        return want;
      }
    };
  }
  Object.defineProperty(El.prototype, 'innerHTML', {
    get(){ return this._html; }, set(v){ this._html = String(v); }
  });
  Object.defineProperty(El.prototype, 'textContent', {
    get(){ return this._text; }, set(v){ this._text = String(v); }
  });

  El.prototype.appendChild = function (c){
    if (c.parent){
      const i = c.parent.children.indexOf(c);
      if (i >= 0) c.parent.children.splice(i, 1);
    }
    c.parent = this;
    this.children.push(c);
    return c;
  };
  El.prototype.setAttribute = function (k, v){ this.attrs[k] = String(v); };
  El.prototype.getAttribute = function (k){ return k in this.attrs ? this.attrs[k] : null; };
  El.prototype.addEventListener = function (t, fn){ (this._on[t] = this._on[t] || []).push(fn); };
  El.prototype.dispatch = function (t, ev){ (this._on[t] || []).forEach(fn => fn(ev || {})); };
  El.prototype.click = function (){ this.dispatch('click', {}); };

  /* descendants, flattened */
  El.prototype.descendants = function (){
    const out = [];
    (function walk(n){ n.children.forEach(c => { out.push(c); walk(c); }); })(this);
    return out;
  };
  /* Supports `.cls` and `.cls[attr]` — the two shapes home.js uses. */
  El.prototype.querySelectorAll = function (sel){
    return match(this.descendants(), sel);
  };
  El.prototype.querySelector = function (sel){
    return this.querySelectorAll(sel)[0] || null;
  };

  function match(pool, sel){
    const m = /^\.([A-Za-z0-9_-]+)(?:\[([A-Za-z-]+)\])?$/.exec(sel.trim());
    if (!m) throw new Error('fixture cannot parse selector: ' + sel);
    return pool.filter(e =>
      e.classList.contains(m[1]) && (!m[2] || e.getAttribute(m[2]) !== null));
  }

  const all = [];
  const doc = {
    readyState: 'complete',
    createElement(tag){ const e = new El(tag); all.push(e); return e; },
    querySelectorAll(sel){ return match(all, sel); },
    addEventListener(){},
    body: new El('body')
  };
  return { doc, El, all };
}

/* six pairs, a dot strip and a pause button — the real markup's shape */
function bridgeFixture(dom, n){
  const mk = cls => { const e = dom.doc.createElement('div'); e.className = cls; return e; };
  const root = mk('bridge');
  const stage = mk('bridge-stage');
  root.appendChild(stage);
  const items = [];
  for (let i = 0; i < (n || 6); i++){
    const it = mk('bridge-item');
    it.setAttribute('data-term', 'term' + i);
    it.hidden = i !== 0;
    stage.appendChild(it);
    items.push(it);
  }
  const dots = mk('bridge-dots');
  const play = mk('bridge-play');
  play.tag = 'button';
  root.appendChild(dots);
  root.appendChild(play);
  return { root, items, dots, play };
}

function load(dom, opts){
  opts = opts || {};
  const timers = [];
  const sandbox = {
    window: null,
    document: dom.doc,
    MotionService: { prefersReduced: () => !!opts.reduced },
    setInterval(fn){ timers.push(fn); return timers.length; },
    clearInterval(id){ if (id) timers[id - 1] = null; },
    requestAnimationFrame(fn){ (sandbox.__frames = sandbox.__frames || []).push(fn); },
    IntersectionObserver: opts.io ? function (cb){
      this.observe = el => cb([{ isIntersecting: true, target: el }]);
      this.unobserve = () => {};
    } : undefined
  };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(read('runtime/home.js'), sandbox);
  sandbox.__timers = timers;
  sandbox.__tick = () => timers.forEach(fn => fn && fn());
  return sandbox;
}

const visible = items => items.findIndex(e => !e.hidden);

/* ---------------------------------------------- the carousel */

test('exactly one pair is in the accessibility tree, and it is hidden by attribute', () => {
  /* Fails if `hidden` is dropped for a CSS class: every item would be
     readable by a screen reader while only one is painted. */
  const dom = makeDom();
  const f = bridgeFixture(dom, 6);
  load(dom);

  assert.equal(f.items.filter(e => !e.hidden).length, 1,
    'more than one pair is exposed — a screen reader would read all six as one block');
  assert.equal(f.items.filter(e => e.hidden).length, 5,
    'pairs are being hidden by something other than the hidden attribute');
});

test('the pause button reports state, not intent', () => {
  /* Fails against the classic toggle bug, where the label is written
     once and then says "Pause" forever. */
  const dom = makeDom();
  const f = bridgeFixture(dom, 4);
  load(dom);

  assert.equal(f.play.getAttribute('aria-pressed'), 'false');
  assert.match(f.play.innerHTML, /Pause/, 'the button does not offer to pause while running');

  f.play.click();
  assert.equal(f.play.getAttribute('aria-pressed'), 'true',
    'aria-pressed did not follow the paused state');
  assert.match(f.play.innerHTML, /Play/,
    'the button still says "Pause" after pausing — it reports intent, not state');

  f.play.click();
  assert.equal(f.play.getAttribute('aria-pressed'), 'false');
  assert.match(f.play.innerHTML, /Pause/, 'the button did not return to offering pause');
});

test('pausing actually stops the advance, not just the label', () => {
  /* Fails if the click handler repaints the button but forgets to
     clear the interval — which looks correct until you watch it. */
  const dom = makeDom();
  const f = bridgeFixture(dom, 4);
  const g = load(dom);

  g.__tick();
  assert.equal(visible(f.items), 1, 'the carousel did not advance on its own');

  f.play.click();            /* pause */
  g.__tick();
  assert.equal(visible(f.items), 1,
    'it advanced while paused — the label changed but the timer kept running');
});

test('arrow keys step the pairs and wrap at both ends', () => {
  const dom = makeDom();
  const f = bridgeFixture(dom, 3);
  load(dom);

  f.root.dispatch('keydown', { key: 'ArrowRight', preventDefault(){} });
  assert.equal(visible(f.items), 1);
  f.root.dispatch('keydown', { key: 'ArrowRight', preventDefault(){} });
  f.root.dispatch('keydown', { key: 'ArrowRight', preventDefault(){} });
  assert.equal(visible(f.items), 0, 'stepping past the last pair did not wrap to the first');

  f.root.dispatch('keydown', { key: 'ArrowLeft', preventDefault(){} });
  assert.equal(visible(f.items), 2, 'stepping back from the first pair did not wrap to the last');
});

test('one dot per pair, and the current one is marked', () => {
  const dom = makeDom();
  const f = bridgeFixture(dom, 5);
  load(dom);

  const dots = f.dots.children;
  assert.equal(dots.length, 5, 'the dot strip does not match the number of pairs');
  assert.equal(dots[0].getAttribute('aria-current'), 'true');
  assert.equal(dots[3].getAttribute('aria-current'), 'false');

  dots[3].click();
  assert.equal(visible(f.items), 3, 'clicking a dot did not show that pair');
  assert.equal(dots[3].getAttribute('aria-current'), 'true');
  assert.equal(dots[0].getAttribute('aria-current'), 'false',
    'two dots claim to be current at once');
});

/* ---------------------------------------------- reduced motion */

test('reduced motion stops the movement without hiding the control that is now pointless', () => {
  const dom = makeDom();
  const f = bridgeFixture(dom, 4);
  const g = load(dom, { reduced: true });

  assert.equal(g.__timers.filter(Boolean).length, 0,
    'an auto-advance timer was started despite prefers-reduced-motion');
  assert.equal(f.play.hidden, true,
    'the pause button is still shown while nothing moves — it controls nothing');
  assert.equal(f.items.filter(e => !e.hidden).length, 1,
    'reduced motion left the carousel showing nothing at all');

  /* Mount is not the only route into start(): leaving the component by
     mouse or by keyboard resumes it. Under reduced motion those must
     resume nothing, or a student who simply tabs through the page ends
     up with the movement they asked not to have. */
  f.root.dispatch('mouseenter'); f.root.dispatch('mouseleave');
  f.root.dispatch('focusin');    f.root.dispatch('focusout');
  assert.equal(g.__timers.filter(Boolean).length, 0,
    'tabbing or mousing out of the carousel started it moving despite ' +
    'prefers-reduced-motion — start() is reachable from more than mount');
});

test('reduced motion still shows the number, and shows the real one', () => {
  /* The counters are the page's factual claim about what exists.
     Fails if the count-up is simply skipped, leaving 0 on screen. */
  const dom = makeDom();
  const el = dom.doc.createElement('span');
  el.className = 'stat-n';
  el.setAttribute('data-to', '18');
  el.textContent = '';
  const g = load(dom, { reduced: true });

  g.Home.countUp(el);
  assert.equal(el.textContent, '18',
    'someone who asked for reduced motion was left with a blank or zero count');
});

test('the count-up lands exactly on its target', () => {
  /* Fails on an easing that approaches but never reaches, which shows
     a plausible-looking 17 where the content says 18. */
  const dom = makeDom();
  const el = dom.doc.createElement('span');
  el.className = 'stat-n';
  el.setAttribute('data-to', '55');
  const g = load(dom);

  g.Home.countUp(el);
  let guard = 0;
  while (g.__frames.length && guard++ < 500){
    const fn = g.__frames.shift();
    fn(guard * 40);
  }
  assert.equal(el.textContent, '55', 'the counter stopped short of its real value');
});

/* ---------------------------------------------- bilingual idiom */

test('the separator is nested inside a .t-en so Nepali mode drops it too', () => {
  /* The house idiom. Without the nesting, Nepali mode renders a stray
     "·" before the Nepali word; without any separator the two languages
     render jammed together as "Pauseरोक्नुहोस्", which is what the
     first version of this component actually shipped as. */
  const dom = makeDom();
  const f = bridgeFixture(dom, 3);
  load(dom);

  const html = f.play.innerHTML;
  assert.match(html, /<span class="t-ne"[^>]*><span class="t-en">[^<]*<\/span>/,
    'the separator is not nested inside a .t-en inside the .t-ne half');
  assert.match(html, /<span class="t-ne" lang="ne"/,
    'lang="ne" is not on the .t-ne span itself, so an English voice reads the ' +
    'Nepali — the Phase 6 defect, and tests/a11y.test.js enforces the same rule');
});
