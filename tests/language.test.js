/* ============================================================
   PHASE 3 — the three-language system.

   Covers the service, the build-time pairing that gives English prose a
   handle, and the guarantee the whole feature rests on: every page can
   actually reach all three modes.
   ============================================================ */
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { createEnvironment } = require('./helpers/dom.js');
const { pairEnglish } = require('../_source/build/bilingual.js');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, '_source');
const KEY = 'rgsc.lang.v1';

/* A localStorage double. `mode` reproduces the three ways real storage
   fails on a student's phone. */
function storage(mode, seed){
  const map = new Map();
  if (seed !== undefined) map.set(KEY, seed);
  if (mode === 'absent') return undefined;
  return {
    getItem(k){
      if (mode === 'throw-read') throw new Error('SecurityError');
      return map.has(k) ? map.get(k) : null;
    },
    setItem(k, v){
      if (mode === 'throw') { const e = new Error('QuotaExceededError'); e.name = 'QuotaExceededError'; throw e; }
      map.set(k, v);
    },
    removeItem(k){ map.delete(k); },
    _map: map
  };
}

function load(storeMode, seed){
  const env = createEnvironment([], { localStorage: storage(storeMode, seed) });
  const { LanguageService } = env.loadAndGet(['services/language.js'], ['LanguageService']);
  return { env, L: LanguageService };
}

/* ---------------------------------------------------------- the service */

test('with nothing stored, the mode is bilingual', () => {
  const { L } = load('ok');
  assert.strictEqual(L.get(), 'bi');
  assert.strictEqual(L.DEFAULT, 'bi');
});

test('a stored mode is restored on the next page', () => {
  for (const m of ['ne', 'en', 'bi']){
    const { L } = load('ok', m);
    assert.strictEqual(L.get(), m, m + ' should survive navigation');
  }
});

test('an unsupported stored value falls back to bilingual rather than breaking the lesson', () => {
  for (const bad of ['fr', 'NE', '', 'null', '{"mode":"ne"}', '../../etc', '1']){
    const { L } = load('ok', bad);
    assert.strictEqual(L.get(), 'bi', JSON.stringify(bad) + ' must not be accepted');
  }
});

test('a value stored by something other than this product is ignored', () => {
  /* another app on the same origin, or a future schema version */
  const { L } = load('ok', JSON.stringify({ v: 2, mode: 'ne' }));
  assert.strictEqual(L.get(), 'bi');
});

test('when storage is absent the mode still applies for the session', () => {
  const { env, L } = load('absent');
  assert.strictEqual(L.storage().name, 'memory');
  assert.strictEqual(L.storage().persistent, false);
  assert.strictEqual(L.set('ne'), 'ne');
  assert.strictEqual(env.doc.documentElement.getAttribute('data-lang'), 'ne',
    'a student in private browsing must still be able to switch language');
});

test('storage that throws on write degrades to memory instead of throwing at the student', () => {
  const { env, L } = load('throw');
  assert.strictEqual(L.storage().name, 'memory');
  assert.doesNotThrow(() => L.set('en'));
  assert.strictEqual(env.doc.documentElement.getAttribute('data-lang'), 'en');
});

test('storage that throws on read is treated as empty', () => {
  const { L } = load('throw-read');
  assert.strictEqual(L.get(), 'bi');
});

test('setting a mode writes it to <html> and persists it', () => {
  const { env, L } = load('ok');
  L.set('ne');
  assert.strictEqual(env.doc.documentElement.getAttribute('data-lang'), 'ne');
  assert.strictEqual(env.sandbox.localStorage._map.get(KEY), 'ne');
});

test('an invalid mode resolves to the default instead of an undefined state', () => {
  const { env, L } = load('ok');
  assert.strictEqual(L.set('klingon'), 'bi');
  assert.strictEqual(env.doc.documentElement.getAttribute('data-lang'), 'bi');
});

test('listeners fire on a real change only', () => {
  const { L } = load('ok');
  const seen = [];
  L.onChange(m => seen.push(m));
  L.set('ne'); L.set('ne'); L.set('en');
  assert.deepStrictEqual([...seen], ['ne', 'en'], 'setting the same mode twice must not re-notify');
});

test('one failing listener does not stop the others', () => {
  const { L } = load('ok');
  const seen = [];
  L.onChange(() => { throw new Error('subscriber blew up'); });
  L.onChange(m => seen.push(m));
  const errs = [];
  const realError = console.error;
  console.error = (...a) => errs.push(a);
  try { L.set('en'); } finally { console.error = realError; }
  assert.deepStrictEqual([...seen], ['en'], 'a broken subscriber must not leave the page half-switched');
  assert.strictEqual(errs.length, 1, 'the failure should still be reported');
});

test('unsubscribing works', () => {
  const { L } = load('ok');
  const seen = [];
  const off = L.onChange(m => seen.push(m));
  L.set('ne'); off(); L.set('en');
  assert.deepStrictEqual([...seen], ['ne']);
});

test('pick falls back to the language that exists', () => {
  const { L } = load('ok');
  const both = { en: 'Stack', ne: 'स्ट्याक' };
  const enOnly = { en: 'Multiplexer', ne: '' };
  L.set('ne');
  assert.strictEqual(L.pick(both), 'स्ट्याक');
  assert.strictEqual(L.pick(enOnly), 'Multiplexer',
    'an untranslated string must show in English, never blank');
  L.set('en');
  assert.strictEqual(L.pick(both), 'Stack');
  assert.strictEqual(L.pick({ en: '', ne: 'केवल नेपाली' }), 'केवल नेपाली');
  assert.strictEqual(L.pick(null), '');
});

test('shows() reports what each mode displays', () => {
  const { L } = load('ok');
  L.set('bi'); assert.ok(L.shows('en') && L.shows('ne'));
  L.set('ne'); assert.ok(L.shows('ne') && !L.shows('en'));
  L.set('en'); assert.ok(L.shows('en') && !L.shows('ne'));
});

/* ------------------------------------------------- the build-time pairing */

test('pairing leaves markup untouched when there is no Nepali', () => {
  const samples = [
    '<div class="a"><p>Hello <b>world</b></p></div>',
    '<section><h3 class="topic">4.1 Abstraction</h3><pre class="cpp">int a = 1;</pre></section>',
    '<figure class="fig"><svg viewBox="0 0 10 10"><text>A</text></svg></figure>'
  ];
  for (const s of samples){
    assert.strictEqual(pairEnglish(s), s, 'must be byte-identical: ' + s.slice(0, 40));
  }
});

test('pairing gives English prose beside a Nepali gloss a handle', () => {
  const out = pairEnglish('<p class="wex-note">The user calls it. <span class="np-cell">नेपाली</span></p>');
  assert.match(out, /<span class="t-en">The user calls it\. <\/span>/);
  assert.match(out, /<span class="np-cell">नेपाली<\/span>/);
});

test('pairing never inserts a node into a grid container', () => {
  /* .pair is a two-column grid; a wrapper here would become the grid
     item and break the bilingual layout everywhere. */
  const src = '<div class="pair"><div class="en"><p>E</p></div><div class="np"><p>न</p></div></div>';
  assert.strictEqual(pairEnglish(src), src);
});

test('pairing does not touch code, script or svg content', () => {
  const cases = [
    '<pre class="cpp">int a; <span class="np-cell">x</span></pre>',
    '<script>var a = 1; // <span class="np-cell">x</span></script>',
    '<svg><text class="np-cell">क</text><text>A</text></svg>'
  ];
  for (const s of cases) assert.strictEqual(pairEnglish(s), s, s.slice(0, 30));
});

test('pairing uses a block wrapper when the run contains block elements', () => {
  const out = pairEnglish('<div class="sim-why"><p>Because.</p><span class="np-cell">किन</span></div>');
  assert.match(out, /<div class="t-en"><p>Because\.<\/p><\/div>/,
    'a <span> may not wrap a <p>');
});

test('pairing does not wrap whitespace on its own', () => {
  const out = pairEnglish('<p>A <span class="np-cell">ब</span>\n</p>');
  assert.strictEqual((out.match(/t-en/g) || []).length, 1,
    'the newline after the Nepali is not an English passage');
});

/* --------------------------------------------------------- the built site */

const pages = (function walk(dir, acc = []){
  for (const e of fs.readdirSync(dir, { withFileTypes: true })){
    if (e.name === 'node_modules' || e.name === '_source' || e.name === 'docs' ||
        e.name === 'tests' || e.name.startsWith('.')) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name.endsWith('.html')) acc.push(p);
  }
  return acc;
})(ROOT);

test('every page ships the language switcher', () => {
  assert.ok(pages.length >= 20, 'expected the full site, found ' + pages.length + ' pages');
  const missing = pages.filter(p => !fs.readFileSync(p, 'utf8').includes('class="langbar"'));
  assert.deepStrictEqual(missing.map(p => path.relative(ROOT, p)), [],
    'a page without the switcher is a page a student cannot get out of');
});

test('every page sets the mode before first paint', () => {
  const missing = pages.filter(p => {
    const h = fs.readFileSync(p, 'utf8');
    const head = h.slice(0, h.indexOf('</head>'));
    return !head.includes(KEY);
  });
  assert.deepStrictEqual(missing.map(p => path.relative(ROOT, p)), [],
    'without the bootstrap in <head> the page renders bilingual then visibly collapses');
});

test('the bootstrap and the service agree on the storage key and the modes', () => {
  /* The key is written in two places by necessity — the bootstrap cannot
     wait for an external file. If they ever diverge, every saved
     preference is silently orphaned. */
  const svc = fs.readFileSync(path.join(SRC, 'runtime', 'services', 'language.js'), 'utf8');
  const build = fs.readFileSync(path.join(SRC, 'build', 'index.js'), 'utf8');
  const svcKey = (svc.match(/var KEY = '([^']+)'/) || [])[1];
  const buildKey = (build.match(/const LANG_KEY = '([^']+)'/) || [])[1];
  assert.strictEqual(svcKey, KEY);
  assert.strictEqual(buildKey, svcKey, 'the inline bootstrap uses a different storage key');

  const svcModes = (svc.match(/var MODES = \[([^\]]+)\]/) || [])[1];
  for (const m of ['bi', 'ne', 'en']){
    assert.ok(svcModes.includes("'" + m + "'"), 'service is missing mode ' + m);
    assert.ok(build.includes('"' + m + '"'), 'bootstrap does not accept mode ' + m);
  }
});

test('the switcher is a labelled radiogroup, not three loose buttons', () => {
  const h = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const bar = h.slice(h.indexOf('class="langbar"'), h.indexOf('</div>', h.indexOf('class="langbar"')));
  assert.match(bar, /role="radiogroup"/);
  assert.match(bar, /aria-label="[^"]+"/);
  assert.strictEqual((bar.match(/role="radio"/g) || []).length, 3);
  assert.strictEqual((bar.match(/aria-checked=/g) || []).length, 3);
  for (const m of ['ne', 'bi', 'en']) assert.ok(bar.includes('data-lang-set="' + m + '"'));
  assert.ok(!/🇳🇵|🇬🇧|flag/i.test(bar), 'a language is not a country');
});

test('the language layer can override every display rule above it', () => {
  const css = fs.readFileSync(path.join(ROOT, 'assets', 'css', 'style.css'), 'utf8');
  const at = css.indexOf('LANGUAGE LAYER');
  assert.ok(at > -1, 'language.css is not in the bundle');
  assert.ok(at > css.indexOf('MOTION'), 'the language layer must load after the motion layer');
  const layer = css.slice(at);
  assert.match(layer, /\[data-lang="en"\][\s\S]*\.np-cell/);
  assert.match(layer, /\[data-lang="ne"\][\s\S]*\.t-en/);
  assert.match(layer, /\[data-lang="en"\] \.pair,\s*\n?\[data-lang="ne"\] \.pair\{ grid-template-columns: 1fr; \}/,
    'a hidden column must not leave a half-empty lesson');
});

test('no Nepali gloss is left without an English counterpart to hide', () => {
  /* The point of the build-time pairing. If a page has Nepali glosses but
     no .t-en handles at all, Nepali mode on that page would show English
     prose with a Nepali translation under it — which is bilingual mode
     wearing the wrong label. */
  const bad = [];
  for (const p of pages){
    const h = fs.readFileSync(p, 'utf8');
    const glosses = (h.match(/class="[^"]*\bnp-cell\b/g) || []).length;
    const handles = (h.match(/class="t-en"/g) || []).length +
                    (h.match(/class="[^"]*\ben\b[^"]*"/g) || []).length;
    if (glosses >= 3 && handles === 0) bad.push(path.relative(ROOT, p) + ' (' + glosses + ' glosses, 0 handles)');
  }
  assert.deepStrictEqual(bad, []);
});

/* ------------------------------------------------------------ the quiz */

test('the quiz projects every field as a bilingual pair', () => {
  const env = createEnvironment([]);
  const { QuizService } = env.loadAndGet(
    ['services/quiz.js', 'built:assets/js/question-bank.js'], ['QuizService']);
  const model = QuizService.toRenderModel(QuizService.getQuiz({ subject: 'grade10/oop-cpp' }));
  assert.ok(model.length > 0);
  for (const q of model){
    assert.strictEqual(typeof q.q.en, 'string', q.id + ' prompt.en');
    assert.strictEqual(typeof q.q.ne, 'string', q.id + ' prompt.ne');
    assert.ok(Array.isArray(q.o) && q.o.length >= 2);
    for (const o of q.o){
      assert.strictEqual(typeof o.en, 'string');
      assert.strictEqual(typeof o.ne, 'string');
    }
    assert.strictEqual(typeof q.e.en, 'string');
    assert.strictEqual(typeof q.e.ne, 'string');
  }
});

test('an untranslated question stays readable in Nepali mode', () => {
  /* The failure this guards: tagging the English half as hideable when
     there is no Nepali half to replace it blanks the question. */
  const src = fs.readFileSync(path.join(SRC, 'runtime', 'quiz.js'), 'utf8');
  const fn = src.slice(src.indexOf('function bilingual'), src.indexOf('function buildQuiz'));
  assert.match(fn, /hasNe \? enClass : enClass\.replace/,
    'quiz.js must drop the t-en handle when there is no Nepali to fall back to');
});

/* ------------------------------- the Digital Design bank is complete */

test('every Digital Design question is fully bilingual', () => {
  /* The older OOP bank has English-only prompts, which the quiz handles
     by falling back. New content has no excuse for that, and this is
     what stops the gap spreading into the next subject. */
  const bank = require('../_source/content/questions/grade10-digital-design.js');
  assert.ok(bank.length >= 40, 'expected a bank larger than one quiz, found ' + bank.length);
  const gaps = [];
  for (const q of bank){
    if (!q.prompt.en || !q.prompt.ne) gaps.push(q.id + ': prompt');
    if (!q.explanation.en || !q.explanation.ne) gaps.push(q.id + ': explanation');
    q.options.forEach((o, i) => {
      if (!o.en || !o.ne) gaps.push(q.id + ': option ' + i);
    });
  }
  assert.deepStrictEqual(gaps, []);
});

test('the question bank covers every unit of the subject', () => {
  const bank = require('../_source/content/questions/grade10-digital-design.js');
  const syllabus = require('../_source/content/syllabus.js')['grade10/digital-design'];
  const units = new Set(bank.map(q => q.unit));
  for (let i = 1; i <= syllabus.length; i++){
    assert.ok(units.has('u' + i), 'no questions tagged for unit ' + i);
  }
  /* and enough of them that a re-take is a different paper */
  assert.ok(bank.length >= 2 * 12, 'the bank must be at least twice the quiz length');
});

test('every question is answerable and uniquely identified', () => {
  const bank = require('../_source/content/questions/grade10-digital-design.js');
  const seen = new Set();
  for (const q of bank){
    assert.ok(!seen.has(q.id), 'duplicate question id ' + q.id);
    seen.add(q.id);
    assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length,
      q.id + ': answer index is out of range');
    assert.ok(['easy', 'medium', 'hard'].includes(q.difficulty), q.id + ': bad difficulty');
    assert.ok(q.topic && q.unit, q.id + ': missing tags');
  }
});

test('the Digital Design quiz page draws a varied selection', () => {
  const fs2 = require('fs');
  const html = fs2.readFileSync(path.join(ROOT, 'grade10', 'digital-design', 'quiz.html'), 'utf8');
  assert.match(html, /id="quizBox"[^>]*data-limit="12"/, 'quiz length not configured on the page');
  assert.match(html, /id="quizBox"[^>]*data-shuffle="true"/, 'a retake would be the same paper');
  assert.match(html, /<main id="main" data-subject="grade10\/digital-design">/,
    'the page must tell the engine which bank to use');
});

/* --------------------------- structure survives every language mode */

test('a page heading is never swallowed into an English run', () => {
  /* Found in the browser: the hero's <h1> sat before a .lead-np, so the
     whole run — eyebrow, title and lead — was wrapped and Nepali mode
     rendered the page with no title at all. */
  const hero = '<div><div class="eyebrow">Grade 10</div><h1>Digital Design</h1>' +
               '<p class="lead">English lead.</p><p class="lead-np">नेपाली</p>' +
               '<div class="meta"><span class="pill">5 units</span></div></div>';
  const out = pairEnglish(hero);
  assert.ok(!/t-en[^>]*>\s*<div class="eyebrow"/.test(out), 'the eyebrow must not be wrapped');
  assert.ok(!/t-en[^>]*>\s*<h1/.test(out), 'the page title must not be wrapped');
  assert.ok(!/t-en[^>]*>\s*<div class="meta"/.test(out), 'metadata must not be wrapped');
  assert.match(out, /<div class="t-en"><p class="lead">English lead\.<\/p><\/div>/,
    'the prose that does have a Nepali counterpart still gets a handle');
});

test('numeric metadata stays readable in every mode', () => {
  /* "12 hrs · 7 marks" and a unit badge read the same in any language;
     hiding them costs the student navigation for no gain. */
  const card = '<a class="ucard"><div class="top"><div class="badge">1</div>' +
               '<h4>Number Systems<span class="np-cell">संख्या</span></h4></div>' +
               '<span class="hrs">12 hrs</span></a>';
  const out = pairEnglish(card);
  assert.ok(!/t-en[^>]*>\s*<div class="badge"/.test(out), 'the unit badge must survive');
  assert.ok(!/t-en[^>]*>\s*<span class="hrs"/.test(out), 'hours and marks must survive');
  assert.match(out, /<h4><span class="t-en">Number Systems<\/span>/,
    'the title itself does have a Nepali counterpart, so it is hidden');
});

test('no heading anywhere is inside a language wrapper', () => {
  /* The regression this guards is invisible in bilingual mode: a heading
     swallowed into a .t-en run disappears in Nepali mode.

     The first version of this test matched
       /<div class="t-en">[\s\S]{0,400}?<h1[ >]/
     which generates false positives — a regex cannot tell whether the
     wrapper was still open when the heading appeared, and the same
     pattern reported 8 pages that were in fact clean. It also could not
     fail if a heading sat more than 400 characters in. Walk the tag
     stream and track wrapper depth instead. */
  const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
                        'link', 'meta', 'param', 'source', 'track', 'wbr']);
  const bad = [];
  for (const file of pages){
    const html = fs.readFileSync(file, 'utf8');
    const stack = [];
    let depth = 0;
    const re = /<(\/)?([a-zA-Z][\w-]*)((?:"[^"]*"|'[^']*'|[^>])*?)(\/?)>/g;
    let m;
    while ((m = re.exec(html)) !== null){
      const closing = !!m[1], tag = m[2].toLowerCase(), attrs = m[3], self = m[4] === '/';
      if (closing){
        for (let i = stack.length - 1; i >= 0; i--){
          if (stack[i].tag === tag){
            if (stack[i].wrapper) depth--;
            stack.length = i;
            break;
          }
        }
        continue;
      }
      if (VOID.has(tag) || self) continue;
      const wrapper = /class="t-en"/.test(attrs);
      if (wrapper) depth++;
      stack.push({ tag, wrapper });
      if (/^h[1-6]$/.test(tag) && depth > 0){
        bad.push(path.relative(ROOT, file) + ' <' + tag + '>');
      }
    }
  }
  assert.deepStrictEqual(bad, [], 'these headings would disappear in Nepali mode');
});

test('the heading check can actually fail', () => {
  /* A test that cannot fail is worse than no test — which is exactly
     what the regex version was. Prove this one detects the defect by
     running it against markup that has it. */
  const broken = '<div class="t-en"><div><h2>Swallowed</h2></div></div>';
  const VOID = new Set(['br', 'img', 'input', 'meta', 'link', 'hr']);
  const stack = [];
  let depth = 0, found = 0;
  const re = /<(\/)?([a-zA-Z][\w-]*)((?:"[^"]*"|'[^']*'|[^>])*?)(\/?)>/g;
  let m;
  while ((m = re.exec(broken)) !== null){
    const closing = !!m[1], tag = m[2].toLowerCase(), attrs = m[3];
    if (closing){
      for (let i = stack.length - 1; i >= 0; i--){
        if (stack[i].tag === tag){ if (stack[i].wrapper) depth--; stack.length = i; break; }
      }
      continue;
    }
    if (VOID.has(tag) || m[4] === '/') continue;
    const wrapper = /class="t-en"/.test(attrs);
    if (wrapper) depth++;
    stack.push({ tag, wrapper });
    if (/^h[1-6]$/.test(tag) && depth > 0) found++;
  }
  assert.strictEqual(found, 1, 'the walk must detect a heading nested inside a wrapper');
});

test('Nepali written by a runtime module declares its language', () => {
  /* The build marks Nepali passages with lang="ne" so a screen reader
     does not pronounce Devanagari with an English voice. Anything a
     component renders AFTER the build has to declare it itself — found
     in the browser: two gate names were being announced in English. */
  const dir = path.join(SRC, 'runtime');
  const offenders = [];
  const scan = d => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })){
      const f = path.join(d, e.name);
      if (e.isDirectory()){ scan(f); continue; }
      if (!e.name.endsWith('.js')) continue;
      const src = fs.readFileSync(f, 'utf8');
      src.split('\n').forEach((line, i) => {
        if (!/class="[^"]*\bnp-cell\b/.test(line)) return;
        if (/lang="ne"/.test(line)) return;
        offenders.push(path.relative(SRC, f).split(path.sep).join('/') + ':' + (i + 1));
      });
    }
  };
  scan(dir);
  assert.deepStrictEqual(offenders, [],
    'these emit Nepali without declaring lang="ne"');
});

test('the English-panel rule is scoped to actual bilingual pairs', () => {
  /* THE BUG THIS GUARDS.

     `.en` means "the English half of a bilingual pair". It is also used
     in seven places purely for its solid-panel styling — and one of
     those is the container that wraps the ENTIRE program tracer. The
     unqualified rule `[data-lang="ne"] .en { display: none }` therefore
     hid the whole tracer in Nepali mode: code, console, buttons and
     program title.

     Found by measuring the heading count in each mode and noticing it
     dropped by one on that page. */
  const css = fs.readFileSync(path.join(ROOT, 'assets', 'css', 'style.css'), 'utf8');
  assert.ok(css.includes('[data-lang="ne"] .pair .en'),
    'the Nepali rule must be scoped to .pair, or a panel that reuses .en disappears');
  assert.ok(!/\[data-lang="ne"\] \.en\s*,/.test(css),
    'an unscoped [data-lang="ne"] .en rule is back');
});

test('no student-facing page hides a whole component in a language mode', () => {
  /* A container that carries a language class hides everything inside
     it. Check that no element which contains interactive machinery is
     itself a language container. */
  const LANG_CLASS = /\bclass="[^"]*\b(en|np)\b[^"]*"/;
  const MACHINERY = /id="(traceCode|traceCon|quizBox|cpu-main|gl-main|km-main|nl-add|nl-convert|cb-main)"/;
  const bad = [];
  for (const p of pages){
    const html = fs.readFileSync(p, 'utf8');
    /* find each element that opens a language container and see whether
       machinery appears before its matching close */
    const re = /<div class="(?:en|np)"[^>]*>/g;
    let m;
    while ((m = re.exec(html)) !== null){
      let depth = 1, i = m.index + m[0].length;
      const tag = /<\/?div\b/g;
      tag.lastIndex = i;
      let t, end = html.length;
      while ((t = tag.exec(html)) !== null){
        depth += t[0] === '</div' ? -1 : 1;
        if (depth === 0){ end = t.index; break; }
      }
      const inner = html.slice(i, end);
      const hit = inner.match(MACHINERY);
      if (hit) bad.push(path.relative(ROOT, p) + ': ' + hit[0]);
    }
  }
  assert.deepStrictEqual(bad, [],
    'these components sit inside a language container and vanish in one mode');
});


test('a runtime label with a Nepali twin hides its English half in Nepali mode', () => {
  /* The simulations build their own markup, so the build's bilingual
     pass never sees it — `_source/build/bilingual.js` rewrites authored
     HTML only. An English label emitted next to a `.np-cell` with no
     `.t-en` wrapper therefore stays on screen in Nepali mode, and the
     student reads both languages in the mode that exists to spare them
     exactly that.

     Found by opening the number lab in Nepali mode: the control read
     the English sentence and its Nepali twin, one after the other.

     TERMINOLOGY is the deliberate exception (LANGUAGE-SYSTEM.md §8):
     gate names, CPU block names, "Truth table" and the base names are
     what the SEE paper prints, so they stay English in every mode and
     are glossed rather than replaced.

     The markup is assembled from string literals, so the literals are
     stitched back into an approximate HTML stream first. Interpolated
     expressions drop out, which is right: a value is not a label. */
  const TERMINOLOGY = /\b(gl-title|cpu-n|nl-name|gl-tt-cap)\b/;
  const dir = path.join(SRC, 'runtime');
  const bad = [];

  for (const f of fs.readdirSync(dir).filter(n => n.endsWith('.js'))){
    const js = fs.readFileSync(path.join(dir, f), 'utf8');
    const html = (js.match(/'(?:[^'\\\n]|\\.)*'/g) || [])
      .map(s => s.slice(1, -1).replace(/\\'/g, "'"))
      .join(' ');                       // a boundary a tag cannot span

    /* Walk the stream keeping the element stack, so each gloss is
       attributed to the element that actually owns it. */
    const stack = [{ cls: '', en: '' }];
    const tok = /<\/?([a-zA-Z][\w-]*)((?:"[^"]*"|[^>])*?)\/?>|([^<]+)/g;
    let m;
    while ((m = tok.exec(html)) !== null){
      if (m[3] !== undefined){ stack[stack.length - 1].en += m[3]; continue; }
      const closing = m[0][1] === '/';
      if (closing){
        if (stack.length < 2) continue;
        const node = stack.pop();
        const parent = stack[stack.length - 1];
        if (node.isNe){
          /* Only a real element parent means anything. The stream is
             stitched from string literals, so a gloss that lands at the
             root has no DOM parent to be beside — its "English" is just
             everything the stitching swept up on the way. Reporting
             that is reporting a defect that is not there, which Phase
             3.1 established is itself a defect. Every gloss in a real
             page has an element parent. */
          const en = parent.en.replace(/[^A-Za-z ]/g, ' ').replace(/\s+/g, ' ').trim();
          if (parent.tag && en.length >= 3 && !TERMINOLOGY.test(parent.cls)){
            bad.push(f + ' <' + (parent.cls || parent.tag) + '>: ' + en.slice(0, 46));
          }
        } else if (!/\bt-en\b/.test(node.cls)){
          parent.en += node.en;              // hidden runs contribute nothing
        }
        continue;
      }
      if (m[0].endsWith('/>') || /^(br|img|input|hr)$/i.test(m[1])) continue;
      const cls = (m[2].match(/class="([^"]*)"/) || [, ''])[1];
      stack.push({ tag: m[1].toLowerCase(), cls, en: '',
                   isNe: /\b(np-cell|np-line|t-ne)\b/.test(cls) });
    }
  }

  assert.deepStrictEqual(bad, [],
    'these runtime labels show English and Nepali at once in Nepali mode');
});

test('pairing leaves a run alone when the author already split it', () => {
  /* A label pair inside one heading is split by hand, because the
     heading itself must never be wrapped:

       <h4>1.5.1 (a) <span class="t-en">Array</span>
                     <span class="t-ne"> — एरे</span></h4>

     Wrapping the run again would put a second handle around the section
     number too, and "1.5.1 (a)" would vanish in Nepali mode with the
     English. Measured on oop-cpp/unit1.html before the rule existed:
     the heading rendered as the Nepali word alone. */
  const src = '<h4 class="sub">1.5.1 (a) <span class="t-en">Array</span>' +
              '<span class="t-ne"> — एरे</span></h4>';
  assert.strictEqual(pairEnglish(src), src,
    'an explicit handle in the run means the run is already resolved');

  /* The same run without the author's handle is still paired, so the
     rule narrows nothing it should not. */
  const plain = '<p>1.5.1 (a) Array<span class="t-ne"> — एरे</span></p>';
  assert.match(pairEnglish(plain), /<span class="t-en">1\.5\.1 \(a\) Array<\/span>/);
});
