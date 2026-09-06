/* Link integrity, page chrome, and deployment safety. */
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const SKIP = new Set(['.git', '_source', 'docs', 'tests', 'node_modules']);

function walk(d, acc = []){
  for (const e of fs.readdirSync(d, { withFileTypes: true })){
    if (SKIP.has(e.name)) continue;
    const p = path.join(d, e.name);
    e.isDirectory() ? walk(p, acc) : acc.push(p);
  }
  return acc;
}

const allHtml = walk(ROOT).filter(f => f.endsWith('.html'));
/* design-system.html is an internal QA page, generated but never linked from
   student navigation. It is held to the same chrome and safety rules, but it
   is not part of the student-facing page count. */
const DEV_PAGES = new Set(['design-system.html', 'animation-showcase.html']);
const htmlFiles = allHtml.filter(f => !DEV_PAGES.has(path.relative(ROOT, f).split(path.sep).join('/')));
const refsOf = html => [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map(m => m[1]);
const isLocal = r => !/^(https?:|data:|#|mailto:)/.test(r);

test('the expected number of pages exists', () => {
  /* Derived from the config rather than hard-coded, so authoring a unit
     does not mean editing this test:
       1 home + 1 page per open grade + 1 per subject + 1 per authored page  */
  const site = require('../_source/config/site.js');
  const pages = require('../_source/config/pages.js');
  const openGrades = site.filter(g => g.status === 'open');
  const subjects = openGrades.reduce((a, g) => a + g.subjects.length, 0);
  const authored = Object.values(pages).reduce((a, s) => a + s.pages.length, 0);
  const expected = 1 + openGrades.length + subjects + authored;
  assert.strictEqual(htmlFiles.length, expected,
    'expected ' + expected + ' student pages, found ' + htmlFiles.length);
  assert.strictEqual(allHtml.length, expected + 2, 'plus the two dev-only pages');
});

test('every internal link resolves', () => {
  const broken = [];
  let checked = 0;
  for (const f of htmlFiles){
    const dir = path.dirname(f);
    for (const r of refsOf(fs.readFileSync(f, 'utf8')).filter(isLocal)){
      checked++;
      const target = path.resolve(dir, r.split('#')[0]);
      if (!fs.existsSync(target)) broken.push(path.relative(ROOT, f) + ' -> ' + r);
    }
  }
  assert.ok(checked > 600, 'suspiciously few links checked: ' + checked);
  assert.deepStrictEqual(broken, [], 'broken links found');
});

test('link casing matches disk exactly (Linux hosting is case-sensitive)', () => {
  const bad = [];
  for (const f of htmlFiles){
    const dir = path.dirname(f);
    for (const r of refsOf(fs.readFileSync(f, 'utf8')).filter(isLocal)){
      const target = path.resolve(dir, r.split('#')[0]);
      const parent = path.dirname(target), base = path.basename(target);
      if (fs.existsSync(parent) && !fs.readdirSync(parent).includes(base)){
        bad.push(path.relative(ROOT, f) + ' -> ' + r);
      }
    }
  }
  assert.deepStrictEqual(bad, [], 'links whose casing differs from disk');
});

test('every page carries the shared navigation chrome', () => {
  for (const f of htmlFiles){
    const html = fs.readFileSync(f, 'utf8');
    const rel = path.relative(ROOT, f);
    assert.match(html, /assets\/css\/style\.css/, rel + ': no stylesheet');
    assert.match(html, /assets\/js\/nav\.js/,     rel + ': no nav script');
    assert.match(html, /id="hamBtn"/,             rel + ': no hamburger button');
    assert.match(html, /id="mobilePanel"/,        rel + ': no mobile panel');
    assert.match(html, /class="skip"/,            rel + ': no skip-to-content link');
    assert.match(html, /<main id="main"[ >]/,     rel + ': no main landmark');
  }
});

test('no page contains an absolute local path or a dev-server URL', () => {
  for (const f of htmlFiles){
    const html = fs.readFileSync(f, 'utf8');
    const rel = path.relative(ROOT, f);
    assert.ok(!/[A-Z]:\//.test(html),      rel + ': absolute Windows path');
    assert.ok(!/localhost:/.test(html),    rel + ': localhost reference');
    assert.ok(!/file:\/\//.test(html),     rel + ': file:// reference');
    assert.ok(!/(?:href|src)="\//.test(html), rel + ': root-relative path breaks offline use');
  }
});

test('nothing in the shipped runtime breaks offline use', () => {
  const js = walk(path.join(ROOT, 'assets')).filter(f => f.endsWith('.js'));
  assert.ok(js.length >= 7, 'expected the runtime modules to be published');
  for (const f of js){
    const src = fs.readFileSync(f, 'utf8');
    const rel = path.relative(ROOT, f);
    assert.ok(!/\bfetch\s*\(/.test(src),          rel + ': uses fetch');
    assert.ok(!/XMLHttpRequest/.test(src),        rel + ': uses XMLHttpRequest');
    assert.ok(!/^\s*import\s/m.test(src),         rel + ': uses ES module import');
  }
});

test('the only external origins are the optional font hosts', () => {
  const allowed = new Set(['https://fonts.googleapis.com', 'https://fonts.gstatic.com']);
  const found = new Set();
  for (const f of htmlFiles){
    /* trailing ; and , appear inside the CSP header value */
    for (const m of fs.readFileSync(f, 'utf8').matchAll(/https?:\/\/[^"'/\s;,)]+/g)) found.add(m[0]);
  }
  for (const origin of found){
    assert.ok(allowed.has(origin), 'unexpected external origin: ' + origin);
  }
});

test('every Nepali passage declares lang="ne"', () => {
  for (const f of htmlFiles){
    const html = fs.readFileSync(f, 'utf8');
    const rel = path.relative(ROOT, f);
    let unmarked = 0;
    for (const m of html.matchAll(/<([a-z][a-z0-9]*)\b([^>]*)>([^<]*)/gi)){
      if (!/[ऀ-ॿ]/.test(m[3])) continue;
      if (!/lang="ne"/.test(m[2])) unmarked++;
    }
    assert.strictEqual(unmarked, 0,
      rel + ' has ' + unmarked + ' Devanagari passage(s) not marked lang="ne"');
  }
});

test('the document language is English with Nepali marked inline', () => {
  for (const f of htmlFiles){
    const html = fs.readFileSync(f, 'utf8');
    assert.match(html, /<html lang="en">/, path.relative(ROOT, f) + ': missing document language');
    assert.ok(html.includes('lang="ne"'), path.relative(ROOT, f) + ': no Nepali marked');
  }
});

test('every page ships a Content-Security-Policy', () => {
  for (const f of htmlFiles){
    const html = fs.readFileSync(f, 'utf8');
    const rel = path.relative(ROOT, f);
    assert.match(html, /http-equiv="Content-Security-Policy"/, rel + ': no CSP');
    assert.match(html, /default-src 'none'/,  rel + ': CSP should deny by default');
    assert.match(html, /connect-src 'none'/,  rel + ': CSP should block network exfiltration');
    assert.match(html, /object-src 'none'/,   rel + ': CSP should block plugins');
    assert.match(html, /base-uri 'none'/,     rel + ': CSP should block base-tag injection');
  }
});

test('dev pages are generated but never linked from student pages', () => {
  for (const p of DEV_PAGES) assert.ok(fs.existsSync(path.join(ROOT, p)), p + ' should be generated for QA');
  for (const f of htmlFiles){
    const html = fs.readFileSync(f, 'utf8');
    for (const p of DEV_PAGES){
      assert.ok(html.indexOf('href="' + p + '"') < 0,
        path.relative(ROOT, f) + ' links to the internal page ' + p);
    }
  }
});

test('dev pages hold to the same chrome and safety rules as student pages', () => {
  for (const p of DEV_PAGES){
    const html = fs.readFileSync(path.join(ROOT, p), 'utf8');
    assert.match(html, /assets\/css\/style\.css/, p + ': no stylesheet');
    assert.match(html, /http-equiv="Content-Security-Policy"/, p + ': no CSP');
    assert.match(html, /<main id="main">/, p + ': no main landmark');
    assert.ok(!/(?:href|src)="\//.test(html), p + ': root-relative path breaks offline use');
  }
});
