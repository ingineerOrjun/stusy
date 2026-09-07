/* ============================================================
   THE UI STRING CONTRACT

   Content is bilingual by construction — both languages sit in the DOM
   and CSS chooses. Controls cannot work that way: "Next  अर्को" on a
   60px button is the clutter the bilingual mode exists to avoid. So a
   control shows ONE label, and this is the table that decides which.

   The property that matters most for the platform is the last test:
   a component that ships a hard-coded English control fails the build.
   That is what makes the language contract inherit rather than being
   something the next developer has to remember.
   ============================================================ */
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, '_source');

function load(mode){
  const doc = {
    readyState: 'complete',
    addEventListener(){},
    documentElement: { getAttribute(){ return mode; }, setAttribute(){} },
    _els: [],
    querySelectorAll(sel){
      return sel === '[data-ui]' ? this._els : [];
    }
  };
  const sandbox = {
    document: doc,
    console,
    LanguageService: {
      get(){ return mode; },
      onChange(){ return function(){}; }
    }
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  const ctx = vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(SRC, 'runtime', 'services', 'strings.js'), 'utf8'), ctx);
  return { UIStrings: ctx.UIStrings, doc };
}

function fakeEl(key, aria){
  const attrs = { 'data-ui': key };
  if (aria !== undefined) attrs['data-ui-aria'] = '';
  return {
    textContent: '',
    attrs,
    getAttribute(k){ return k in this.attrs ? this.attrs[k] : null; },
    hasAttribute(k){ return k in this.attrs; },
    setAttribute(k, v){ this.attrs[k] = v; },
    removeAttribute(k){ delete this.attrs[k]; }
  };
}

/* ------------------------------------------------------- the table */

test('every UI string carries both languages', () => {
  const { UIStrings } = load('bi');
  const gaps = [];
  for (const [key, v] of Object.entries(UIStrings._table)){
    if (!v.en || !v.en.trim()) gaps.push(key + ': en');
    if (!v.ne || !v.ne.trim()) gaps.push(key + ': ne');
  }
  assert.deepStrictEqual(gaps, []);
});

test('Nepali mode gets the Nepali label', () => {
  const { UIStrings } = load('ne');
  assert.strictEqual(UIStrings.get('reset'), 'रिसेट');
  assert.strictEqual(UIStrings.get('tryAgain'), 'फेरि प्रयास गर्नुहोस्');
});

test('English mode gets the English label', () => {
  const { UIStrings } = load('en');
  assert.strictEqual(UIStrings.get('reset'), 'Reset');
});

test('bilingual mode gets ONE label, not both', () => {
  /* The deliberate exception to simultaneous presentation, and it
     applies to controls only. A button showing both languages is the
     clutter the bilingual mode is supposed to prevent. */
  const { UIStrings } = load('bi');
  const label = UIStrings.get('reset');
  assert.strictEqual(label, 'Reset');
  assert.ok(!/[ऀ-ॿ]/.test(label), 'a control label must not carry two languages');
});

test('an unknown key returns the key rather than a blank control', () => {
  const { UIStrings } = load('ne');
  assert.strictEqual(UIStrings.get('doesNotExist'), 'doesNotExist');
  assert.strictEqual(UIStrings.has('doesNotExist'), false);
});

/* --------------------------------------------------- applying them */

test('apply() writes the label without rebuilding anything', () => {
  /* This is why a language switch cannot lose a running simulation:
     only the text of an existing element changes. */
  const { UIStrings, doc } = load('ne');
  const btn = fakeEl('next');
  doc._els = [btn];
  UIStrings.apply(doc);
  assert.strictEqual(btn.textContent, 'अर्को ▸');
});

test('apply() sets aria-label instead of text when asked', () => {
  const { UIStrings, doc } = load('ne');
  const region = fakeEl('simOutput', true);
  doc._els = [region];
  UIStrings.apply(doc);
  assert.strictEqual(region.getAttribute('aria-label'), 'सिमुलेसनको आउटपुट');
  assert.strictEqual(region.textContent, '', 'a labelled region keeps its content');
});

test('apply() is idempotent', () => {
  const { UIStrings, doc } = load('en');
  const btn = fakeEl('reset');
  doc._els = [btn];
  UIStrings.apply(doc);
  const once = btn.textContent;
  UIStrings.apply(doc);
  assert.strictEqual(btn.textContent, once);
});

test('an element with an unknown key is left alone', () => {
  const { UIStrings, doc } = load('ne');
  const btn = fakeEl('nonsense');
  btn.textContent = 'Original';
  doc._els = [btn];
  UIStrings.apply(doc);
  assert.strictEqual(btn.textContent, 'Original');
});

/* ------------------------------------------- the inheritance rule */

test('no shipped component hard-codes a control label', () => {
  /* The rule that makes this contract inherit. The build enforces it
     too; this asserts it from the other side so a validator regression
     cannot hide a content regression. */
  const runtimeDir = path.join(SRC, 'runtime');
  const files = fs.readdirSync(runtimeDir).filter(f => /^sim-|^quiz\.js$|^trace\.js$/.test(f));
  assert.ok(files.length >= 6, 'expected the interactive modules, found ' + files.length);
  const offenders = [];
  for (const f of files){
    const src = fs.readFileSync(path.join(runtimeDir, f), 'utf8')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/^\s*\/\/.*$/gm, '');
    for (const m of src.matchAll(/<button\b([^>]*)>([^<'"]{2,40}?)(?=['"]|<)/g)){
      const attrs = m[1], label = m[2].trim();
      if (!label || /data-ui=/.test(attrs)) continue;
      if (/data-value=|class="opt|class="predict-opt/.test(attrs)) continue;   // content, not chrome
      if (/^(&#?\w+;|\s|[+\-·▸◂])+$/.test(label)) continue;                    // symbols only
      offenders.push(f + ': "' + label + '"');
    }
  }
  assert.deepStrictEqual(offenders, []);
});

test('the animated diagram controls carry keys', () => {
  const build = fs.readFileSync(path.join(SRC, 'build', 'index.js'), 'utf8');
  for (const key of ['prev', 'play', 'next', 'reset']){
    assert.match(build, new RegExp('data-dia-act="' + key + '"[^>]*data-ui="' + key + '"'),
      'the diagram ' + key + ' control has no data-ui key');
  }
});

test('every data-ui key used anywhere exists in the table', () => {
  /* A typo in a key would silently leave the English fallback in place
     in Nepali mode — visible only to someone who reads Nepali. */
  const { UIStrings } = load('bi');
  const used = new Set();
  const scan = dir => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })){
      const f = path.join(dir, e.name);
      if (e.isDirectory()) scan(f);
      else if (/\.(js|html)$/.test(e.name)){
        for (const m of fs.readFileSync(f, 'utf8').matchAll(/data-ui="([a-zA-Z]\w*)"/g)) used.add(m[1]);
      }
    }
  };
  scan(path.join(SRC, 'runtime'));
  scan(path.join(SRC, 'build'));
  scan(path.join(SRC, 'content'));
  assert.ok(used.size > 0, 'no data-ui keys found at all');
  const unknown = [...used].filter(k => !UIStrings.has(k));
  assert.deepStrictEqual(unknown, [], 'these keys are not in services/strings.js');
});

/* A control's Nepali does not exist in the markup — it arrives from the
   table at runtime — so the build's Nepali tagging pass never sees it.
   Measured in Nepali mode before this was fixed: 12 control labels on a
   single page inheriting lang="en", handed to an English synthesiser.
   Phase 5 fixed 82 such runs in the content and could not have reached
   these. */
test('a Nepali label declares that it is Nepali', () => {
  const { UIStrings, doc } = load('ne');
  const btn = fakeEl('reset');
  doc._els = [btn];
  UIStrings.apply(doc);
  assert.strictEqual(btn.textContent, 'रिसेट');
  assert.strictEqual(btn.getAttribute('lang'), 'ne',
    'a Nepali control label with no lang is read by an English voice');
});

test('an English label does not claim to be Nepali', () => {
  const { UIStrings, doc } = load('en');
  const btn = fakeEl('reset');
  btn.setAttribute('lang', 'ne');          /* left over from Nepali mode */
  doc._els = [btn];
  UIStrings.apply(doc);
  assert.strictEqual(btn.textContent, 'Reset');
  assert.strictEqual(btn.getAttribute('lang'), null,
    'switching back to English left lang="ne" behind, so English is read with a Nepali voice');
});

test('bilingual mode takes the English label and no lang', () => {
  const { UIStrings, doc } = load('bi');
  const btn = fakeEl('reset');
  doc._els = [btn];
  UIStrings.apply(doc);
  assert.strictEqual(btn.textContent, 'Reset');
  assert.strictEqual(btn.getAttribute('lang'), null);
});
