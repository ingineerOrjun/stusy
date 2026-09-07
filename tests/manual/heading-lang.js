/* ============================================================
   HEADING LANGUAGE COVERAGE

   WHY HEADINGS AND NOT PROSE
   Prose is bilingual everywhere: every paragraph in the product carries
   both languages and the mode chooses. Headings do not, and headings are
   how a page is skimmed — by eye, and by a screen-reader user pressing H.
   A Nepali-medium student reading a Nepali page through an English
   outline is being given the body of the lesson and not its shape.

   WHAT COUNTS AS NEEDING NEPALI
   Not everything. A heading that is a technical term and nothing else —
   "SQL View", "Universal gates" — is already the word the exam uses, and
   translating it would replace a term the student must recognise with
   one they will never see again. What needs Nepali is INSTRUCTIONAL
   language: the sentence around the term, which is where the meaning is.

       4.1 The three families of SQL        instructional -> needs Nepali
       2.2.6 Universal gates                term only     -> leave
       Exam focus — what is asked here      instructional -> needs Nepali

   The classification below is a heuristic and says so: it flags
   candidates for a human to judge, it does not decide.

   RUN
     node tests/manual/heading-lang.js
     node tests/manual/heading-lang.js --todo    only what still needs it
   ============================================================ */
'use strict';

const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const LESSONS = path.join(ROOT, '_source', 'content', 'lessons');

const DEVA = /[ऀ-ॿ]/;

/* Words that make a heading instructional rather than a bare label. If a
   heading contains one of these it is a sentence about the subject, not
   the name of a thing. */
const INSTRUCTIONAL = /\b(the|a|an|what|which|why|how|when|and|or|of|in|to|from|with|that|this|by|for|is|are|can|you|your|between|using|write|draw|find|read|say|name|state|explain|identify|predict|compare|end|focus|asked|points|revise|mistakes|cost|marks|common|example|experiment|practise|practice)\b/i;

function analyse(file){
  const html = fs.readFileSync(path.join(LESSONS, file), 'utf8');
  const out = [];
  for (const m of html.matchAll(/<(h[1-6])([^>]*)>([\s\S]*?)<\/\1>/g)){
    const raw = m[3];
    const text = raw.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ')
                    .replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
    if (!text) continue;
    const hasNe = DEVA.test(raw);
    /* strip the numbering before judging: "4.1 The three families" is
       instructional because of the words, not the number */
    const words = text.replace(/^[\d.\s&]+/, '');
    const instructional = INSTRUCTIONAL.test(words) && words.split(/\s+/).length >= 2;
    out.push({ file, tag: m[1], text, hasNe, instructional });
  }
  return out;
}

function run(){
  const files = fs.readdirSync(LESSONS).filter(f => f.endsWith('.html')).sort();
  return files.flatMap(analyse);
}

module.exports = { run, analyse };

if (require.main === module){
  const rows = run();
  const todo = rows.filter(r => r.instructional && !r.hasNe);
  const onlyTodo = process.argv.includes('--todo');

  if (!onlyTodo){
    const byFile = {};
    for (const r of rows) (byFile[r.file] = byFile[r.file] || []).push(r);
    for (const [file, list] of Object.entries(byFile)){
      const need = list.filter(r => r.instructional);
      const have = need.filter(r => r.hasNe).length;
      console.log('\n' + file.replace('.html', '') + '  ' + have + ' / ' + need.length +
                  ' instructional headings carry Nepali');
      for (const r of list){
        const mark = !r.instructional ? '  term ' : (r.hasNe ? '  ok   ' : '  TODO ');
        console.log(mark + r.text.slice(0, 66));
      }
    }
  }

  const instructional = rows.filter(r => r.instructional);
  const withNe = instructional.filter(r => r.hasNe).length;
  console.log('\n---------------------------------------------');
  console.log('headings in lesson source        ' + rows.length);
  console.log('  bare technical terms           ' + (rows.length - instructional.length) +
              '  (leave in English)');
  console.log('  instructional                  ' + instructional.length);
  console.log('    carrying Nepali              ' + withNe +
              '  (' + Math.round(withNe / instructional.length * 100) + '%)');
  console.log('    still to do                  ' + todo.length);

  if (onlyTodo){
    console.log('\nstill to do:');
    for (const r of todo) console.log('  ' + r.file.replace('.html', '').padEnd(8) + r.text.slice(0, 70));
  }
  process.exitCode = todo.length ? 1 : 0;
}
