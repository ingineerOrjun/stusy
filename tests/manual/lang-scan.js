/* ============================================================
   SILENT-LANGUAGE SCAN — node, over the built pages

   THE DEFECT THIS FINDS
   The document is <html lang="en">. Devanagari that does not sit inside
   an element declaring lang="ne" is handed to an English speech
   synthesiser. A Nepali student hears the Nepali half of the page as
   noise — the exact half they came for.

   No rule checker reports this: every element has a name, the contrast
   passes, the markup validates. It only shows up when you ask what is
   SPOKEN rather than what is present.

   WHY A SCAN AND NOT A PARSER
   There is no DOM here and no dependency budget for one, so the scan
   tracks lang="..." with an explicit tag stack. That is enough to answer
   the one question asked — "is this text inside a lang element?" — and
   it is the same question `markNepali` in the build is trying to answer.
   ============================================================ */
'use strict';

const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');

const DEV = /[ऀ-ॿ]/;
const VOID = new Set(['area','base','br','col','embed','hr','img','input',
                      'link','meta','param','source','track','wbr']);

function scan(html){
  const stack = [];          /* [{ tag, lang }] */
  let langDepth = 0;         /* how many open ancestors declare a lang */
  const hits = [];
  const token = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][a-zA-Z0-9-]*)((?:"[^"]*"|'[^']*'|[^>])*?)(\/?)>|([^<]+)/g;
  let m;
  let skipUntil = null;      /* inside <script>/<style>, text is not speech */

  while ((m = token.exec(html))){
    const [whole, closing, tag, attrs, selfClose, text] = m;
    if (text !== undefined){
      if (skipUntil) continue;
      if (DEV.test(text) && text.trim() && !langDepth){
        const owner = stack.length ? stack[stack.length - 1] : { tag: '(root)', cls: '' };
        hits.push({
          text: text.trim().replace(/\s+/g, ' ').slice(0, 46),
          inside: owner.tag + (owner.cls ? '.' + owner.cls.split(/\s+/)[0] : ''),
          line: html.slice(0, m.index).split('\n').length
        });
      }
      continue;
    }
    if (whole.startsWith('<!--')) continue;
    const name = tag.toLowerCase();

    if (closing){
      if (skipUntil === name){ skipUntil = null; continue; }
      if (skipUntil) continue;
      /* unwind to the matching open tag; malformed markup must not
         desynchronise the lang counter for the rest of the file */
      for (let i = stack.length - 1; i >= 0; i--){
        if (stack[i].tag === name){
          for (let j = stack.length - 1; j >= i; j--){ if (stack[j].lang) langDepth--; }
          stack.length = i;
          break;
        }
      }
      continue;
    }
    if (skipUntil) continue;
    if (name === 'script' || name === 'style'){ skipUntil = name; continue; }
    if (VOID.has(name) || selfClose) continue;

    const langAttr = /\blang\s*=\s*["']?([^"'\s>]+)/i.exec(attrs || '');
    const clsAttr = /\bclass\s*=\s*"([^"]*)"/i.exec(attrs || '');
    /* the document lang is English; only a non-English declaration
       silences the finding */
    const declares = !!(langAttr && langAttr[1].toLowerCase() !== 'en' && name !== 'html');
    stack.push({ tag: name, lang: declares, cls: clsAttr ? clsAttr[1] : '' });
    if (declares) langDepth++;
  }
  return hits;
}

function walk(dir, out){
  for (const e of fs.readdirSync(dir, { withFileTypes: true })){
    if (e.name.startsWith('.') || e.name === 'node_modules' || e.name === '_source' ||
        e.name === 'tests' || e.name === 'docs') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

function run(){
  const files = walk(ROOT, []);
  const report = [];
  let total = 0;
  for (const f of files){
    const hits = scan(fs.readFileSync(f, 'utf8'));
    if (hits.length){
      total += hits.length;
      report.push({ page: path.relative(ROOT, f).replace(/\\/g, '/'), count: hits.length, hits });
    }
  }
  return { pages: files.length, pagesAffected: report.length, total, report };
}

module.exports = { scan, run };

if (require.main === module){
  const r = run();
  console.log('scanned ' + r.pages + ' built pages');
  console.log(r.total + ' Devanagari runs with no lang="ne", across ' + r.pagesAffected + ' pages\n');
  const byOwner = new Map();
  for (const p of r.report){
    console.log('  ' + p.page + '  (' + p.count + ')');
    for (const h of p.hits) byOwner.set(h.inside, (byOwner.get(h.inside) || 0) + 1);
  }
  console.log('\nby containing element:');
  for (const [k, v] of [...byOwner].sort((a, b) => b[1] - a[1])) console.log('  ' + String(v).padStart(4) + '  ' + k);
  process.exitCode = r.total ? 1 : 0;
}
