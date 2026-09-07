/* ============================================================
   Minimal DOM stub.

   The runtime modules are plain browser scripts that talk to the DOM
   directly. Rather than pull in a full DOM implementation as a
   dependency, this provides just enough surface to load them in Node
   and assert on their behaviour.

   It is deliberately small: if a module needs something this does not
   provide, the test fails loudly rather than silently passing.
   ============================================================ */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SRC = path.resolve(__dirname, '..', '..', '_source');

function Element(id){
  this.id = id || '';
  this._html = '';
  this.className = '';
  this.textContent = '';
  this.style = {};
  this.disabled = false;
  this.children = [];
  this.attrs = {};
  /* layout values the scroll helpers read */
  this.scrollTop = 0; this.scrollHeight = 100; this.clientHeight = 200;
  this.offsetTop = 0; this.offsetHeight = 20;
  this.classList = {
    _el: this,
    contains(c){ return this._el.className.split(/\s+/).includes(c); },
    add(c){ if (!this.contains(c)) this._el.className = (this._el.className + ' ' + c).trim(); },
    remove(c){ this._el.className = this._el.className.split(/\s+/).filter(x => x && x !== c).join(' '); },
    toggle(c, force){
      const has = this.contains(c);
      const want = force === undefined ? !has : !!force;
      if (want) this.add(c); else this.remove(c);
      return want;
    }
  };
}
Object.defineProperty(Element.prototype, 'innerHTML', {
  get(){ return this._html; },
  set(v){ this._html = String(v); this._register(); }
});
Element.prototype._register = function(){
  /* ids created via innerHTML must become findable, exactly as in a browser */
  for (const m of this._html.matchAll(/\sid="([^"]+)"/g)) doc._ensure(m[1]);
};
Element.prototype.appendChild = function(c){
  this.children.push(c);
  /* Appended console lines are block elements in a real DOM, so each one
     occupies its own line. Preserve that here or output runs together. */
  this._html += (c.textContent || '') + '\n';
  return c;
};
Element.prototype.setAttribute = function(k, v){ this.attrs[k] = String(v); };
Element.prototype.getAttribute = function(k){ return k in this.attrs ? this.attrs[k] : null; };
Element.prototype.hasAttribute = function(k){ return k in this.attrs; };
Element.prototype.removeAttribute = function(k){ delete this.attrs[k]; };
Element.prototype.addEventListener = function(){};
Element.prototype.scrollIntoView = function(){};
Element.prototype.querySelector = function(sel){
  if (/\.ln\.on/.test(sel)) return this._html.includes('class="ln on"') ? new Element('active') : null;
  return null;
};
Element.prototype.querySelectorAll = function(){ return []; };

const doc = {
  _els: Object.create(null),
  readyState: 'complete',
  _ensure(id){ return this._els[id] || (this._els[id] = new Element(id)); },
  getElementById(id){ return this._els[id] || null; },
  createElement(){ return new Element(''); },
  querySelector(){ return null; },
  querySelectorAll(){ return []; },
  addEventListener(){},
  body: new Element('body')
};

/* ------------------------------------------------------------------ */

function createEnvironment(ids = [], opts = {}){
  doc._els = Object.create(null);
  doc.body = new Element('body');
  /* The language mode is an attribute on <html>, so the stub needs a
     document element to carry it. */
  doc.documentElement = new Element('html');
  ids.forEach(id => doc._ensure(id));

  const timers = [];
  const listeners = {};
  const sandbox = {
    document: doc,
    setTimeout: (fn) => { timers.push(fn); return timers.length; },
    clearTimeout(){},
    /* window-level listeners: recorded so a test can fire them */
    addEventListener(type, fn){ (listeners[type] || (listeners[type] = [])).push(fn); },
    removeEventListener(type, fn){
      const l = listeners[type]; if (!l) return;
      const i = l.indexOf(fn); if (i > -1) l.splice(i, 1);
    },
    innerWidth: 1024,
    console,
    /* Storage is injectable so a test can reproduce the cases that
       actually happen to students: no storage at all, a private-mode
       object that throws on write, and a corrupted value. */
    localStorage: opts.localStorage
  };
  sandbox.__listeners = listeners;
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;

  return {
    doc, sandbox, timers,
    /* run every queued timer so animated step sequences complete */
    drain(limit = 2000){
      let n = 0;
      while (timers.length && n++ < limit) timers.shift()();
      return n;
    },
    el(id){ return doc._ensure(id); },
    /* Load modules the way a browser does.
       A real vm context is used rather than `new Function` because the
       runtime assigns globals as `window.X = ...`, and only a genuine
       global object makes those reachable afterwards as a bare `X` —
       which is exactly how the scripts reference each other on a page.

       Paths resolve against _source/runtime unless prefixed with "built:",
       which resolves against the generated site, so a test can exercise
       exactly what ships, generated files included. */
    loadAndGet(relPaths, wanted){
      const context = vm.createContext(sandbox);
      relPaths.forEach(p => {
        const file = p.startsWith('built:')
          ? path.join(SRC, '..', p.slice(6))
          : path.join(SRC, 'runtime', p);
        vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
      });
      const out = {};
      for (const name of wanted) out[name] = context[name];
      return out;
    }
  };
}

module.exports = { createEnvironment, SRC };
