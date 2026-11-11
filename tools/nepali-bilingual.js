/* ============================================================
   BILINGUAL PAIR EXTRACTION — the source-level half

   WHY THIS IS A SEPARATE FILE

   tools/nepali-review.js reads bilingual content out of places where
   the content is DATA: lesson HTML, question banks, a drill's exported
   SETS. Every one of those can be read by requiring a module or
   matching markup, and that is what it does.

   A runtime simulator is not like that. Its content lives inside the
   closure that renders it:

       (function (global){
         var SCENARIOS = { nodisplay: { title: { en: '…', ne: '…' } } };
         …
         module.exports = global.FaultTree;      // the API, not the data
       })(this);

   Requiring the module hands back the mount/reset API. The Nepali is
   unreachable from outside. The only way to read it without changing
   the runtime — which Phase 13.1 was explicitly told not to do — is to
   read the SOURCE.

   So this file parses, rather than matches. The difference matters:

     - a pair's Nepali half is often a concatenation, written as
       'यहाँ ' + n + ' प्रश्न बाँकी छ।', and a regex that wants one
       quoted run finds nothing at all;
     - `en:` and `ne:` appear inside comments throughout this codebase,
       and a regex happily extracts a pair from prose about pairs;
     - two of the three Nepali key spellings in the repository are
       `ne` and `np`, and a scanner that knows only `ne` silently
       drops trace.js, sim-dispatch.js and sim-stackqueue.js whole.

   All three of those were live defects in the previous extractor. They
   are the reason this is a parser with a reported failure mode rather
   than another pattern.

   WHAT IT GUARANTEES

   Nothing is skipped silently. Every Devanagari string literal in a
   scanned file is either part of an emitted pair or listed in
   `unsupported`, with its file, line and the reason. A caller that
   ignores `unsupported` still cannot be misled about coverage, because
   `audit()` in the generator counts literals, not pairs.
   ============================================================ */
'use strict';

const DEVA = /[ऀ-ॿ]/;

/* ------------------------------------------------------------------
   1 · BLANKING WHAT IS NOT CONTENT

   Comments and regular-expression literals both have to go before
   anything else reads this source, and for the same reason: each can
   contain a character that the next pass would mistake for the start
   of a string.

   The one that actually bit was a regex. `.replace(/"/g, '&quot;')`
   appears in nine runtime files, and a scanner that blanks comments
   but leaves regexes behind reads that bare double quote as an opening
   string delimiter. It then runs to the NEXT double quote — hundreds
   of lines later — and reports one enormous literal that swallows the
   file's real content. sim-sql.js lost all nineteen of its pairs that
   way, and reported them as one unsupported pattern.

   Offsets and line numbers have to survive this, because a reported
   line number is the only way a reviewer finds an unsupported pattern.
   So both are replaced by spaces of the same length rather than
   removed, and their newlines are kept.
   ------------------------------------------------------------------ */
function blankNoise(src){
  let out = '';
  let i = 0;
  const n = src.length;
  while (i < n){
    const c = src[i];
    if (c === '/' && src[i + 1] === '/'){
      let j = i;
      while (j < n && src[j] !== '\n') j++;
      out += ' '.repeat(j - i);
      i = j;
      continue;
    }
    if (c === '/' && src[i + 1] === '*'){
      let j = src.indexOf('*/', i + 2);
      if (j < 0) j = n; else j += 2;
      for (let k = i; k < j; k++) out += src[k] === '\n' ? '\n' : ' ';
      i = j;
      continue;
    }
    if (c === '\'' || c === '"' || c === '`'){
      const j = skipString(src, i);
      out += src.slice(i, j);
      i = j;
      continue;
    }
    /* Detected by what precedes the slash: a regex may not follow a
       value, so a slash after one is division. */
    if (c === '/' && isRegexStart(out)){
      const j = skipRegex(src, i);
      for (let k = i; k < j; k++) out += src[k] === '\n' ? '\n' : ' ';
      i = j;
      continue;
    }
    out += c;
    i++;
  }
  return out;
}

function isRegexStart(before){
  const m = /([^\s])\s*$/.exec(before);
  if (!m) return true;
  return !/[\w$)\]'"`]/.test(m[1]);
}

function skipString(src, i){
  const q = src[i];
  i++;
  while (i < src.length){
    if (src[i] === '\\'){ i += 2; continue; }
    if (src[i] === q) return i + 1;
    i++;
  }
  return i;
}

function skipRegex(src, i){
  i++;                                   /* the opening slash */
  let cls = false;
  while (i < src.length){
    const c = src[i];
    if (c === '\\'){ i += 2; continue; }
    if (c === '[') cls = true;
    else if (c === ']') cls = false;
    else if (c === '/' && !cls){ i++; break; }
    else if (c === '\n') break;
    i++;
  }
  while (i < src.length && /[a-z]/.test(src[i])) i++;
  return i;
}

/* ------------------------------------------------------------------
   2 · READING ONE VALUE

   From an offset, read to the end of a value expression: the next
   top-level comma, closing brace, bracket or paren. Strings are
   skipped wholesale so a comma inside Nepali prose does not end it.
   ------------------------------------------------------------------ */
/* A semicolon ends a value as surely as a comma does, and leaving it
   out was not a harmless omission. `msg = 'Perfect.'; msgNp = 'पूर्ण…'`
   read as ONE value running from the first quote to the closing brace
   of the if-block, so it was a concatenation of nothing and both halves
   of every quiz score message were dropped. */
function readValue(src, i){
  let depth = 0;
  for (; i < src.length; i++){
    const c = src[i];
    if (c === '\'' || c === '"' || c === '`'){ i = skipString(src, i) - 1; continue; }
    if (c === '(' || c === '[' || c === '{'){ depth++; continue; }
    if (c === ')' || c === ']' || c === '}'){
      if (depth === 0) return i;
      depth--;
      continue;
    }
    if ((c === ',' || c === ';') && depth === 0) return i;
  }
  return i;
}

/* Split a call's argument list on top-level commas. */
function splitArgs(code){
  const out = [];
  let start = 0, depth = 0, i = 0;
  for (; i < code.length; i++){
    const c = code[i];
    if (c === '\'' || c === '"' || c === '`'){ i = skipString(code, i) - 1; continue; }
    if (c === '(' || c === '[' || c === '{'){ depth++; continue; }
    if (c === ')' || c === ']' || c === '}'){ depth--; continue; }
    if (c === ',' && depth === 0){ out.push(code.slice(start, i)); start = i + 1; }
  }
  out.push(code.slice(start));
  return out;
}

/* ------------------------------------------------------------------
   3 · A CONCATENATION OF LITERALS

   The house idiom writes a runtime sentence as literal + value +
   literal:

       ne: 'यस विषयका ' + rep.total + ' मध्ये ' + rep.attempted + ' …'

   A reviewer needs the sentence, not the expression, and needs to see
   WHERE a number lands in it — Nepali and English put them in
   different places, and that is exactly the kind of thing a review
   catches. So an interpolated term becomes a visible placeholder.

   Returns null when the term holds no string literal at all — which is
   not a failure. `bi(t.label.en, t.label.ne)` is a call that renders a
   pair held in a data structure, and that pair is extracted from the
   data structure. Reporting it here would double-count it.
   ------------------------------------------------------------------ */
const PLACEHOLDER = '{…}';

function litChain(code){
  const terms = [];
  let start = 0, depth = 0, i = 0;
  for (; i < code.length; i++){
    const c = code[i];
    if (c === '\'' || c === '"' || c === '`'){ i = skipString(code, i) - 1; continue; }
    if (c === '(' || c === '[' || c === '{'){ depth++; continue; }
    if (c === ')' || c === ']' || c === '}'){ depth--; continue; }
    if (c === '+' && depth === 0){ terms.push(code.slice(start, i)); start = i + 1; }
  }
  terms.push(code.slice(start));

  let text = '';
  let literals = 0, exprs = 0, template = false;
  for (const raw of terms){
    const t = raw.trim();
    if (!t) continue;
    const m = /^(['"])((?:[^\\]|\\[\s\S])*?)\1$/.exec(t);
    if (m){
      literals++;
      text += unquote(m[2]);
      continue;
    }
    if (/^`[\s\S]*`$/.test(t)){ template = true; exprs++; text += PLACEHOLDER; continue; }
    exprs++;
    text += PLACEHOLDER;
  }
  if (!literals) return null;
  return { text, literals, exprs, template };
}

/* ONE LEFT-TO-RIGHT PASS, AND THAT IS THE WHOLE POINT.

   This used to be four chained replaces, and a chain reads the string
   four times without knowing where the previous pass stopped. `\\n` —
   an escaped backslash followed by the letter n, which is how a lesson
   writes the escape sequence a student sees as \n — has a `\n` inside
   it starting at the second character. The `\\n` pass matched that,
   turned it into a space, and left a stranded backslash behind.

   Found in Phase 14 by the audit, which reported a C question about
   escape sequences as unpaired when both halves were there: the loaded
   value kept its backslash-n and the scanned literal had lost it, so
   the two no longer matched. Any lesson teaching \n, \t or \\ would
   have hit it, which is why it surfaced in a C subject and not before.

   A single regex consumes each escape whole, so a backslash can never
   be read twice. */
function unquote(body){
  return body.replace(/\\(u[0-9a-fA-F]{4}|[\s\S])/g, (_, esc) => {
    if (esc.charAt(0) === 'u' && esc.length === 5){
      return String.fromCharCode(parseInt(esc.slice(1), 16));
    }
    if (esc === 'n' || esc === 't' || esc === 'r') return ' ';
    return esc;                       /* \\ \' \" \/ and anything else */
  });
}

const lineAt = (src, off) => src.slice(0, off).split('\n').length;

/* ------------------------------------------------------------------
   3b · THE LITERAL TAPE

   A fourth shape, and the one that hides the most: a runtime that
   builds its own bilingual markup.

       lab.innerHTML =
         '<span class="t-en" data-ui="attemptLabel">Write your answer ' +
         'first — it is not saved</span>' +
         '<span class="t-ne np-cell" lang="ne">पहिले आफ्नो उत्तर …</span>';

   That is one bilingual pair. It is not an object with `en` and `ne`
   keys, and it is not a bi() call. It is the same `.t-en` / `.np-cell`
   idiom the lesson HTML uses, written by hand across four string
   literals with the two halves in different ones.

   So the literals are laid end to end into a TAPE, in source order,
   and the tape is then read as HTML by the same rule the lessons use.
   What sits between two literals decides whether they join:

     only whitespace and `+`     join directly — one expression
     an interpolated expression  join through a {…} placeholder
     anything with ; { } = or ,  a separator: these are two statements,
                                 and running their markup together
                                 would pair an English label with the
                                 Nepali of the control after it

   Each chunk keeps the source range it came from, so a pair found on
   the tape can say which literals — and so which lines — it was built
   from, and those literals can be marked as accounted for.
   ------------------------------------------------------------------ */
const SEP = '\u0000';

function literalTape(code){
  const chunks = [];
  let i = 0, lastEnd = -1;
  while (i < code.length){
    const c = code[i];
    if (c === '\'' || c === '"' || c === '`'){
      const j = skipString(code, i);
      if (lastEnd >= 0){
        const gap = code.slice(lastEnd, i);
        if (/^[\s+]*$/.test(gap)) { /* nothing between them */ }
        else if (/[;{}=,]/.test(gap)) chunks.push({ text: SEP, at: lastEnd, end: i, lit: false });
        else chunks.push({ text: PLACEHOLDER, at: lastEnd, end: i, lit: false });
      }
      const body = c === '`' ? code.slice(i + 1, j - 1) : unquote(code.slice(i + 1, j - 1));
      chunks.push({ text: body, at: i, end: j, lit: true });
      lastEnd = j;
      i = j;
      continue;
    }
    i++;
  }
  /* cumulative tape offsets */
  let off = 0;
  for (const ch of chunks){ ch.tapeAt = off; off += ch.text.length; ch.tapeEnd = off; }
  return { chunks, tape: chunks.map(c => c.text).join('') };
}

/* The pairs a stretch of runtime-built markup contains. Deliberately
   the same two rules the lesson collector applies, because it is the
   same house idiom — an English half in .t-en, the Nepali half in a
   sibling .t-ne or .np-cell. */
const T_EN  = /<span class="t-en"[^>]*>([\s\S]*?)<\/span>\s*<span class="(?:t-ne|np-cell)[^"]*"[^>]*>([\s\S]*?)<\/span>/g;
const LONE  = /<span class="(?:t-ne|np-cell)[^"]*"[^>]*>([\s\S]*?)<\/span>/g;

function htmlPairs(tape){
  const out = [];
  const taken = [];
  let m;
  T_EN.lastIndex = 0;
  while ((m = T_EN.exec(tape))){
    out.push({ en: m[1], ne: m[2], at: m.index, end: m.index + m[0].length });
    taken.push([m.index, m.index + m[0].length]);
  }
  LONE.lastIndex = 0;
  while ((m = LONE.exec(tape))){
    if (taken.some(([a, b]) => m.index >= a && m.index < b)) continue;
    /* its English is the text just before it, inside the same stretch */
    const seg = tape.slice(0, m.index).split(SEP).pop();
    out.push({ en: seg.slice(-500), ne: m[1], at: m.index, end: m.index + m[0].length });
  }
  return out.filter(p => DEVA.test(p.ne)).sort((a, b) => a.at - b.at);
}

/* The nearest enclosing object keys, so a pair can be named rather
   than only numbered. `SCENARIOS.nodisplay.symptom` beats `line 274`
   for a reviewer who then has to find it. */
function keyPath(src, off){
  const names = [];
  let depth = 0;
  for (let i = off; i >= 0 && names.length < 3; i--){
    const c = src[i];
    if (c === '}') depth++;
    else if (c === '{'){
      if (depth > 0){ depth--; continue; }
      const m = /(?:([A-Za-z_$][\w$]*)|'([^']+)'|"([^"]+)")\s*[:=]\s*$/
        .exec(src.slice(Math.max(0, i - 120), i));
      if (m) names.unshift(m[1] || m[2] || m[3]);
      else names.unshift('{}');
    }
  }
  return names.join('.');
}

/* ------------------------------------------------------------------
   4 · THE SCAN

   Three shapes, in one pass over the blanked source:

     a) bi('English', 'नेपाली')  — and biBlock(), the block-level twin
     b) { en: <value>, ne: <value> }   the object pair
     c) { en: <value>, np: <value> }   the same thing, older spelling

   (c) is not a tidy-up waiting to happen. trace.js, sim-dispatch.js
   and sim-stackqueue.js use it for 112 pairs of step narration, which
   is the whole Nepali half of how C++ execution is explained in Grade
   10. A scanner that knows only `ne` reports those three files as
   holding no bilingual content at all, which is what the previous one
   did.
   ------------------------------------------------------------------ */
const NE_KEYS = ['ne', 'np'];

function scanSource(src, file){
  const code = blankNoise(src);
  const pairs = [];
  const unsupported = [];
  const claimed = [];          /* offset ranges a pair accounts for */

  /* (a) ANY call whose first two arguments are an English literal and a
     Devanagari one.

     This started as `bi|biBlock` by name and that was too narrow by
     exactly the amount that matters. Every simulator grows its own
     two-argument bilingual helper and names it for what it builds:

         row('Decimal', 'दशमलव', 'dec', 'base 10')     sim-number
         A('There is no table called …', '… तालिका छैन…')  sim-sql
         bi('Play', 'चलाउनुहोस्')                        home

     Naming them is a list that goes stale the next time someone writes
     a simulator. The SHAPE does not: first argument a string with no
     Devanagari in it, second a string with Devanagari. Nothing else in
     this codebase looks like that, and a helper that takes an English
     string and a Nepali one is a bilingual pair whatever it is called. */
  /* Every scan below must ignore what is INSIDE a string, because the
     content itself talks about code. `'peek(): the stack is empty'` is
     a sentence a student reads, and a call-shaped scan reads `peek(`
     in it as a call — which inserted a phantom call between the two
     real ones and broke the (a1) pairing for every console line in
     sim-stackqueue.js. */
  const strings = stringRanges(code);
  const inString = off => strings.some(([a, b]) => off > a && off < b);

  const CALL = /\b([A-Za-z_$][\w$]*)\s*\(/g;
  let m;
  const calls = [];
  while ((m = CALL.exec(code))){
    if (inString(m.index)) continue;
    if (/^(?:if|for|while|switch|catch|return|function|typeof|new)$/.test(m[1])) continue;
    const open = m.index + m[0].length - 1;
    const close = matchParen(code, open);
    if (close < 0) continue;
    const args = splitArgs(code.slice(open + 1, close)).map(litChain);
    calls.push({ name: m[1], at: m.index, open, close, args });
    if (args.length < 2) continue;
    const en = args[0], ne = args[1];
    /* f(x.label.en, x.label.ne) — the pair is in the data structure,
       and the data structure is scanned by (b). Not an omission. */
    if (!en || !ne) continue;
    if (!DEVA.test(ne.text) || DEVA.test(en.text)) continue;
    pairs.push({ en: en.text, ne: ne.text,
                 ref: m[1] + '() line ' + lineAt(code, m.index),
                 line: lineAt(code, m.index), interpolated: !!(en.exprs || ne.exprs) });
    claimed.push([open, close]);
  }

  /* (a1) the same call, twice, once per language.

         conLine(con, 'peek(): the stack is empty…',  't-en');
         conLine(con, 'peek(): स्ट्याक खाली छ…',       'np');

     The two halves are never in one call here, because each writes its
     own element with its own language class. What ties them together
     is that they are consecutive calls to the same function with the
     same arity, differing in one argument. That is the rule used — not
     the function's name, which differs in every simulator. */
  for (let i = 1; i < calls.length; i++){
    const cur = calls[i], prev = calls[i - 1];
    if (cur.name !== prev.name) continue;
    if (cur.args.length !== prev.args.length) continue;
    if (cur.at - prev.close > 400) continue;
    for (let a = 0; a < cur.args.length; a++){
      const ne = cur.args[a], en = prev.args[a];
      if (!ne || !en) continue;
      if (!DEVA.test(ne.text) || DEVA.test(en.text)) continue;
      if (claimed.some(([x, y]) => cur.open >= x && cur.close <= y)) continue;
      pairs.push({ en: en.text, ne: ne.text,
                   ref: cur.name + '() pair, line ' + lineAt(code, prev.at),
                   line: lineAt(code, prev.at),
                   interpolated: !!(en.exprs || ne.exprs) });
      claimed.push([prev.open, prev.close]);
      claimed.push([cur.open, cur.close]);
      break;
    }
  }

  /* (a2) two assignments that are halves of one message.

     quiz.js scores a paper into `msg` and `msgNp`, one statement each,
     because the two are chosen together by the same if/else ladder and
     written into two different elements. There is no object and no
     call — just a naming convention, and it carries five of the six
     sentences a student sees at the end of a quiz. */
  const ASSIGN = /\b([A-Za-z_$][\w$]*)\s*=\s*(?=['"])/g;
  const assigned = new Map();
  while ((m = ASSIGN.exec(code))){
    if (inString(m.index)) continue;
    const vEnd = readValue(code, m.index + m[0].length);
    const lit = litChain(code.slice(m.index + m[0].length, vEnd));
    if (!lit) continue;
    const name = m[1];
    const base = /^(.*?)(?:Np|Ne|NP|NE|_np|_ne)$/.exec(name);
    if (base && DEVA.test(lit.text)){
      /* the English half is `msg` beside `msgNp` in quiz.js and
         `msgEn` beside `msgNe` in sim-number.js — both conventions are
         in use, so both are looked for */
      const partner = ['', 'En', 'EN', '_en']
        .map(sfx => assigned.get(base[1] + sfx))
        .find(p => p && !DEVA.test(p.text));
      if (partner){
        pairs.push({ en: partner.text, ne: lit.text,
                     ref: base[1] + ' / ' + name + ' line ' + lineAt(code, m.index),
                     line: lineAt(code, m.index),
                     interpolated: !!(partner.exprs || lit.exprs) });
        claimed.push([partner.at, partner.end]);
        claimed.push([m.index, vEnd]);
      }
      continue;
    }
    assigned.set(name, Object.assign({ at: m.index + m[0].length, end: vEnd }, lit));
  }

  /* (b)(c) an English key immediately followed by a Nepali one.

     The English half is not always called `en`. sim-gates writes
     `name: 'NOT (Inverter)', ne: 'नट (इन्भर्टर)'` because the field is
     the gate's name and `en` would have been a worse name for it. The
     Nepali half is `ne` or `np`; see NE_KEYS. */
  const EN = /(?:^|[{,[(\s])(?:(en|name|title|label|short|text)|'(en|name|title|label|short|text)'|"(en|name|title|label|short|text)")\s*:/g;
  while ((m = EN.exec(code))){
    if (inString(m.index)) continue;
    const vStart = m.index + m[0].length;
    const vEnd = readValue(code, vStart);
    let j = vEnd;
    if (code[j] !== ',') continue;
    j++;
    const after = /^\s*(?:([A-Za-z_$][\w$]*)|'([A-Za-z_$][\w$]*)'|"([A-Za-z_$][\w$]*)")\s*:/
      .exec(code.slice(j, j + 40));
    if (!after) continue;
    const key = after[1] || after[2] || after[3];
    if (NE_KEYS.indexOf(key) < 0) continue;
    const nStart = j + after[0].length;
    const nEnd = readValue(code, nStart);

    const en = litChain(code.slice(vStart, vEnd));
    const ne = litChain(code.slice(nStart, nEnd));
    if (!ne || !DEVA.test(ne.text)){
      /* No Devanagari: an English-only value pair, or a value left
         untranslated on purpose. Neither needs review. */
      EN.lastIndex = nEnd;
      continue;
    }
    if (!en){
      unsupported.push({ file, line: lineAt(code, m.index), why:
        'the ' + key + ' half is a Devanagari literal but the en half is an expression',
        snippet: oneLine(code.slice(m.index, Math.min(nEnd, m.index + 160))) });
      EN.lastIndex = nEnd;
      continue;
    }
    pairs.push({ en: en.text, ne: ne.text,
                 ref: (keyPath(code, m.index) || 'line ' + lineAt(code, m.index)) +
                      (key === 'np' ? ' (np:)' : ''),
                 line: lineAt(code, m.index),
                 interpolated: !!(en.exprs || ne.exprs) });
    claimed.push([vStart, nEnd]);
    EN.lastIndex = nEnd;
  }

  /* (d) markup the runtime builds itself, read off the literal tape */
  const { chunks, tape } = literalTape(code);
  const chunkAt = tapeOff => chunks.filter(c => c.lit && c.tapeEnd > tapeOff);
  for (const p of htmlPairs(tape)){
    const inside = chunks.filter(c => c.lit && c.tapeAt < p.end && c.tapeEnd > p.at);
    if (!inside.length) continue;
    /* already accounted for by (a) or (b)? then this is the same text
       reached a second way, not a second occurrence of it */
    if (inside.some(c => claimed.some(([a, b]) => c.at >= a && c.end <= b + 1))) continue;
    const en = stripMarkup(p.en), ne = stripMarkup(p.ne);
    if (!ne || !DEVA.test(ne)) continue;
    pairs.push({ en: en || '(no English found beside it)', ne,
                 ref: 'runtime markup, line ' + lineAt(code, inside[0].at),
                 line: lineAt(code, inside[0].at),
                 interpolated: p.en.indexOf(PLACEHOLDER) >= 0 || p.ne.indexOf(PLACEHOLDER) >= 0,
                 markup: true });
    for (const c of inside) claimed.push([c.at, c.end]);
  }
  void chunkAt;

  /* Anything Devanagari left over is a shape this does not know. Say
     so, with a line number, rather than let it disappear. A one- or
     two-character run is reported separately: `'०'`…`'९'` is
     practical.js's Devanagari digit table and `'र'` is the word "and"
     waiting to be concatenated into a sentence. Neither is a sentence
     a reviewer can judge, and counting them as missing content would
     make the gap figure wrong in the flattering direction. */
  for (const lit of devaLiterals(code)){
    if (claimed.some(([a, b]) => lit.at >= a && lit.at <= b)) continue;
    const text = oneLine(stripMarkup(unquote(lit.text)));
    const deva = (text.match(/[ऀ-ॿ]/g) || []).length;
    unsupported.push({ file, line: lineAt(code, lit.at),
      fragment: deva < 3,
      why: deva < 3
        ? 'a Devanagari fragment too short to review on its own'
        : 'a Devanagari string literal that is not half of a recognised pair',
      snippet: text.slice(0, 120) });
  }

  return { pairs, unsupported };
}

/* Tags out, entities decoded — the tape holds markup, and a reviewer
   reads sentences. */
function stripMarkup(html){
  return String(html == null ? '' : html)
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ').trim();
}

function matchParen(src, open){
  let depth = 0;
  for (let i = open; i < src.length; i++){
    const c = src[i];
    if (c === '\'' || c === '"' || c === '`'){ i = skipString(src, i) - 1; continue; }
    if (c === '(') depth++;
    else if (c === ')'){ depth--; if (!depth) return i; }
  }
  return -1;
}

/* Every Devanagari-bearing string literal, with its offset. Template
   literals count: build/index.js writes the homepage's Nepali prose in
   them, and leaving them out of the denominator would have made this
   file's own coverage figure flattering and wrong. */
function stringRanges(code){
  const out = [];
  let i = 0;
  while (i < code.length){
    const c = code[i];
    if (c === '\'' || c === '"' || c === '`'){
      const j = skipString(code, i);
      out.push([i, j - 1]);
      i = j;
      continue;
    }
    i++;
  }
  return out;
}

function devaLiterals(code){
  const out = [];
  let i = 0;
  while (i < code.length){
    const c = code[i];
    if (c === '\'' || c === '"' || c === '`'){
      const j = skipString(code, i);
      const body = code.slice(i + 1, j - 1);
      /* Tested AFTER unescaping, so that a literal written
         'ने' counts as Devanagari. Nothing in this
         repository is written that way today; a census that could be
         fooled by writing it that way tomorrow is not a census. */
      if (DEVA.test(body) || DEVA.test(unquote(body))){
        out.push({ at: i, end: j, text: body, quote: c });
      }
      i = j;
      continue;
    }
    i++;
  }
  return out;
}

const oneLine = s => String(s).replace(/\s+/g, ' ').trim();

/* ------------------------------------------------------------------
   5 · WALKING A REQUIRED MODULE

   For content that IS exported — the practice banks, the prerequisite
   graph, the diagram library, the heading table — reading the value is
   better than reading the source: no quoting, no concatenation, and
   the path through the object is a precise reference.

   Two shapes are recognised:

     { en: 'x', ne: 'य' }           the pair, at any depth
     { 'English heading': 'नेपाली' } the heading table's string map

   The second needs a rule, because a map of English keys to Nepali
   values and a map of ids to Nepali values look identical from here.
   The rule: the key must itself read as English prose — a space and a
   lower-case letter in it. `'By the end of this unit you can…'` passes;
   `'stateMastered'` does not.
   ------------------------------------------------------------------ */
function walkValue(node, opts, path, out, inherited){
  opts = opts || {};
  path = path || [];
  out = out || [];
  inherited = inherited || {};
  if (node == null) return out;

  if (typeof node === 'string') return out;

  if (Array.isArray(node)){
    node.forEach((v, i) => walkValue(v, opts, path.concat('[' + i + ']'), out, inherited));
    return out;
  }
  if (typeof node !== 'object') return out;

  /* carry the nearest subject / unit downward */
  const ctx = Object.assign({}, inherited);
  if (typeof node.subject === 'string') ctx.subject = node.subject;
  if (typeof node.unit === 'string') ctx.unit = node.unit;

  const en = node.en;
  for (const k of NE_KEYS){
    if (typeof en === 'string' && typeof node[k] === 'string' && DEVA.test(node[k])){
      out.push({ en, ne: node[k], ref: path.join('.') || '(root)', ctx,
                 npKey: k === 'np' });
      break;
    }
  }
  /* the title/np shape config/pages.js, config/site.js and
     content/syllabus.js use. `t` is syllabus.js's name for a unit
     title — terse because that file is a table, and invisible to any
     scanner looking for `en` or `title`. */
  for (const titleKey of ['title', 'label', 'name', 'short', 't']){
    if (typeof node[titleKey] === 'string' && typeof node.np === 'string' &&
        DEVA.test(node.np) && typeof node.en !== 'string'){
      out.push({ en: node[titleKey], ne: node.np,
                 ref: (path.join('.') || '(root)') + '.' + titleKey, ctx, npKey: true });
      break;
    }
  }

  for (const [k, v] of Object.entries(node)){
    if (typeof v === 'string'){
      if (opts.stringMap && DEVA.test(v) && /\s/.test(k) && /[a-z]/.test(k)){
        out.push({ en: k, ne: v, ref: path.join('.') || '(map)', ctx, npKey: false });
      }
      continue;
    }
    walkValue(v, opts, path.concat(k), out, ctx);
  }
  return out;
}

/* ------------------------------------------------------------------
   6 · OCCURRENCES, PAIRS, AND THE DIFFERENCE

   These three functions are the whole of the attribution fix, and they
   are here rather than in the generator so that they can be tested
   without reading the repository. Each takes plain objects.

   The shape an item must have: { id, kind, file, ref|anchor|topic,
   meta: { subject, unitNo } }.
   ------------------------------------------------------------------ */

function hash(s){
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0;
  return h.toString(36);
}

/* WHAT MAKES TWO OCCURRENCES THE SAME OCCURRENCE

   The pair, and the place. Not the pair alone — that was the bug: a
   key of (Nepali, kind) merged a Digital Design quiz option with the
   identical Grade 9 one and threw one of them away.

   The place is subject, unit, file and the item's own reference, which
   for a question is its id and option number and for a lesson gloss is
   its anchor. Two extraction patterns reaching the same text at the
   same place produce the same key and collapse, which is the only
   duplicate worth removing. */
function occurrenceId(it){
  const m = it.meta || {};
  return 'oc-' + hash([it.id, it.kind, m.subject, m.unitNo, it.file,
                       it.ref || it.anchor || it.topic || ''].join('\u0001'));
}

function dedupeOccurrences(items){
  const seen = new Set();
  const kept = [];
  let duplicates = 0;
  for (const it of items){
    it.occId = occurrenceId(it);
    if (seen.has(it.occId)){ duplicates++; continue; }
    seen.add(it.occId);
    kept.push(it);
  }
  return { items: kept, duplicates };
}

/* One entry per unique translation, carrying every context it is used
   in. `enVariants` holds the other English texts the same Nepali is
   standing in for, which is a review finding rather than bookkeeping:
   one sentence cannot usually translate two. */
function groupPairs(items){
  const norm = s => String(s || '').replace(/\s+/g, ' ').trim();
  const pairs = new Map();
  for (const it of items){
    let p = pairs.get(it.id);
    if (!p){
      p = { id: it.id, ne: it.ne, en: it.en, enVariants: [],
            occurrences: [], subjects: [], units: [], files: [],
            phase9: it.phase9, terms: it.terms || [] };
      pairs.set(it.id, p);
    }
    p.occurrences.push(it.occId);
    const subject = (it.meta || {}).subject;
    const unit = subject + '/' + (it.meta || {}).unitNo;
    if (p.subjects.indexOf(subject) < 0) p.subjects.push(subject);
    if (p.units.indexOf(unit) < 0) p.units.push(unit);
    if (p.files.indexOf(it.file) < 0) p.files.push(it.file);
    const en = norm(it.en);
    if (en && en !== norm(p.en) && p.enVariants.indexOf(en) < 0) p.enVariants.push(en);
  }
  for (const it of items){
    const p = pairs.get(it.id);
    it.pairId = p.id;
    it.sharedWith = p.occurrences.length - 1;
    it.alsoIn = p.subjects.filter(s => s !== (it.meta || {}).subject);
  }
  return pairs;
}

/* A reviewer's verdict outlives a regeneration, or the review has to be
   asked for twice. Keyed by occurrence where the previous ledger
   recorded one and by pair otherwise, so a ledger written before the
   occurrence model existed still carries forward.

   It can only ever COPY a status. There is no argument that makes this
   produce 'human-reviewed' for an item that did not already have it. */
function carryStatus(items, prevItems){
  const prev = new Map();
  for (const i of (prevItems || [])){
    if (!i.status || i.status === 'pending-review') continue;
    prev.set(i.occId || i.id, { status: i.status, note: i.reviewNote || null });
  }
  let carried = 0;
  for (const it of items){
    const hit = prev.get(it.occId) || prev.get(it.pairId || it.id);
    if (hit){
      it.status = hit.status;
      if (hit.note) it.reviewNote = hit.note;
      carried++;
    } else {
      it.status = 'pending-review';
    }
  }
  return carried;
}

module.exports = {
  DEVA, PLACEHOLDER, SEP,
  hash, occurrenceId, dedupeOccurrences, groupPairs, carryStatus,
  blankNoise, skipString, readValue, splitArgs, litChain, unquote,
  keyPath, scanSource, devaLiterals, walkValue, lineAt, matchParen,
  literalTape, htmlPairs, stripMarkup, stringRanges
};
