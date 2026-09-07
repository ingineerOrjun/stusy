/* Build regression: the site must generate, completely and deterministically. */
const { test } = require('node:test');
const assert = require('node:assert');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const ROOT = path.resolve(__dirname, '..');
const BUILD = path.join(ROOT, '_source', 'build', 'index.js');
const SRC   = path.join(ROOT, '_source');

/* The 20 pages that must always exist. This list is the regression baseline
   recorded in docs/PHASE-1-BASELINE.md. */
const PAGES = [
  'index.html',
  'grade9/index.html',
  'grade9/c-programming/index.html',
  'grade9/computer-fundamentals/index.html',
  'grade9/electro-system/index.html',
  'grade9/website-design/index.html',
  'grade10/index.html',
  'grade10/dbms/index.html',
  'grade10/digital-design/index.html',
  'grade10/hardware/index.html',
  'grade10/oop-cpp/index.html',
  'grade10/oop-cpp/unit1.html',
  'grade10/oop-cpp/unit2.html',
  'grade10/oop-cpp/unit3.html',
  'grade10/oop-cpp/unit4.html',
  'grade10/oop-cpp/unit5.html',
  'grade10/oop-cpp/unit6.html',
  'grade10/oop-cpp/trace.html',
  'grade10/oop-cpp/tables.html',
  'grade10/oop-cpp/quiz.html'
];

const ASSETS = [
  'assets/css/style.css',
  'assets/css/style-digital.css',
  'assets/css/style-dbms.css',
  'assets/css/style-all.css',
  'assets/js/nav.js',
  'assets/js/code.js',
  'assets/js/snippets.js',
  'assets/js/sim-stackqueue.js',
  'assets/js/sim-dispatch.js',
  'assets/js/trace.js',
  'assets/js/quiz.js',
  'assets/js/services/progress.js'
];

function runBuild(){
  return execFileSync(process.execPath, [BUILD], { cwd: ROOT, encoding: 'utf8' });
}

/* Eight tests in this file each ran a full build, which is eight chances
   for a transient Windows file lock to fail the suite for environmental
   reasons — and it did, about once in fifteen runs. The output is
   deterministic (asserted below), so one build serves every test that
   only needs the site to exist. `buildAgain()` is for the two tests
   whose subject IS a second build. */
let cached = null;
function build(){
  if (cached === null) cached = runBuild();
  return cached;
}
function buildAgain(){
  cached = runBuild();
  return cached;
}

function hashTree(){
  const out = {};
  for (const rel of PAGES.concat(ASSETS)){
    const p = path.join(ROOT, rel);
    const body = fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
    out[rel] = crypto.createHash('sha256').update(body).digest('hex');
  }
  return out;
}

test('build completes without error', () => {
  const out = build();
  assert.match(out, /site written to/, 'build did not report completion');
});

test('content validation runs and passes as part of the build', () => {
  const out = build();
  assert.match(out, /content validation:.*OK/, 'validation gate did not run');
});

test('all 20 pages are generated', () => {
  build();
  for (const rel of PAGES){
    assert.ok(fs.existsSync(path.join(ROOT, rel)), 'missing page: ' + rel);
  }
});

test('all runtime assets are published', () => {
  build();
  for (const rel of ASSETS){
    const p = path.join(ROOT, rel);
    assert.ok(fs.existsSync(p), 'missing asset: ' + rel);
    assert.ok(fs.statSync(p).size > 0, 'empty asset: ' + rel);
  }
});

test('build is deterministic — rebuilding changes nothing', () => {
  /* The one test whose subject IS a second build, so it must not reuse
     the cached one. */
  build();
  const first = hashTree();
  buildAgain();
  const second = hashTree();
  for (const k of Object.keys(first)){
    assert.strictEqual(second[k], first[k], 'non-deterministic output: ' + k);
  }
});

test('every unit page carries its diagrams', () => {
  /* This used to hold a hardcoded figure count per OOP unit. That
     guarded almost nothing — it broke the moment a figure was added on
     purpose, and it never looked at the other two subjects at all.

     The real invariant is a relationship: every {{dia:name}} written in
     a source section must arrive in the built page as that diagram, and
     no placeholder may survive. Derived from the source, so it needs no
     maintenance and covers every subject automatically. */
  build();
  const DIA = require(path.join(SRC, 'diagrams.js'));
  const pages = require(path.join(SRC, 'config', 'pages.js'));

  const titleOf = name => {
    const svg = typeof DIA[name] === 'string' ? DIA[name] : (DIA[name] && DIA[name].svg) || '';
    return (svg.match(/<title[^>]*>([\s\S]*?)<\/title>/) || [, ''])[1].trim();
  };

  let checked = 0;
  for (const [key, subject] of Object.entries(pages)){
    for (const page of subject.pages){
      const built = fs.readFileSync(path.join(ROOT, key, page.file), 'utf8');

      const wanted = new Set();
      for (const sec of page.sec){
        for (const dir of ['lessons', 'sections']){
          const f = path.join(SRC, 'content', dir, sec + '.html');
          if (!fs.existsSync(f)) continue;
          const src = fs.readFileSync(f, 'utf8');
          for (const m of src.matchAll(/\{\{dia:([a-zA-Z0-9_]+)\}\}/g)) wanted.add(m[1]);
        }
      }

      for (const name of wanted){
        assert.ok(DIA[name], page.file + ' references diagram "' + name + '" which does not exist');
        const title = titleOf(name);
        assert.ok(title, 'diagram "' + name + '" has no <title>');
        assert.ok(built.includes(title),
          key + '/' + page.file + ' should carry diagram "' + name + '" but its title is not in the page');
        checked++;
      }

      assert.ok(!built.includes('{{dia:'), page.file + ' has an uninjected diagram placeholder');
      assert.ok(!built.includes('missing diagram'), page.file + ' references a missing diagram');
    }
  }
  assert.ok(checked >= 40, 'expected to verify many diagram injections, checked ' + checked);
});

test('the legacy artifact is no longer a build input', () => {
  const ctx = fs.readFileSync(path.join(ROOT, '_source/build/context.js'), 'utf8');
  const idx = fs.readFileSync(path.join(ROOT, '_source/build/index.js'), 'utf8');
  const reads = /readFileSync\([^)]*legacy/i;
  assert.ok(!reads.test(ctx) && !reads.test(idx), 'the build still reads the legacy artifact');
});

test('build output path is derived, not hard-coded to one machine', () => {
  const raw = fs.readFileSync(path.join(ROOT, '_source/build/context.js'), 'utf8');
  /* Strip comments first: the header legitimately quotes the old hard-coded
     path to document what this module replaced. Only live code matters. */
  const code = raw.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
  assert.ok(!/['"][A-Za-z]:[\\/]/.test(code), 'context.js hard-codes an absolute path');
  assert.match(code, /__dirname/, 'output root should be derived from __dirname');

  /* And prove it actually resolves to this repository. */
  const ctx = require(path.join(ROOT, '_source/build/context.js'));
  assert.strictEqual(path.resolve(ctx.ROOT), path.resolve(ROOT), 'ROOT should resolve to the repo');
});
