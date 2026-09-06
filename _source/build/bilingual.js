/* ============================================================
   BILINGUAL PAIRING — build-time

   Three language modes need to know which run of markup is English and
   which is Nepali. Nepali already says so: it is always inside .np,
   .np-cell, .np-line or .lead-np. English does not — in 186 places
   across the product it is simply the element's own content, sitting
   beside a Nepali gloss:

       <p class="wex-note">The user calls one simple function.
         <span class="np-cell">प्रयोगकर्ताले एउटै सजिलो फङ्सन बोलाउँछ।</span></p>

   Nepali mode cannot hide that English without a handle on it. Asking
   every author to wrap every English passage by hand would be a rule
   nobody remembers, and it would have to be retrofitted to six finished
   units. So the handle is derived here instead, once, at build time:

       <p class="wex-note"><span class="t-en">The user calls one simple
         function.</span> <span class="np-cell">प्रयोगकर्ता…</span></p>

   The content files keep one source of truth. Only the presentation
   layer gains the extra hook.

   SAFETY
   The transform inserts markers into the original token stream rather
   than re-serialising a parsed tree, so any page with nothing to wrap
   comes out byte-identical to its input. That property is asserted by a
   test, and it is what makes this safe to run over finished content.
   ============================================================ */
'use strict';

/* Nepali is always declared by class. `sec-sub` is the Nepali subtitle
   under a section heading — it carries no np- prefix for historical
   reasons, but it is Nepali and language.css already treats it as such. */
const NEPALI = /\b(np|np-cell|np-line|lead-np|sec-sub|t-ne|dia-cap-ne)\b/;

/* Already-explicit English containers. These have their own selectors,
   so wrapping them again would only add a node — and around .pair > .en
   it would insert a grid item and break the two-column layout. */
const EXPLICIT_EN = /\b(en|en-line|t-en|dia-cap-en)\b/;

/* Inside these, markup is not prose and must not be touched. */
const OPAQUE = new Set(['script', 'style', 'pre', 'code', 'svg', 'head', 'title', 'textarea']);

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
                      'link', 'meta', 'param', 'source', 'track', 'wbr']);

/* A run containing any of these cannot be wrapped in a <span>. */
const BLOCK = new Set(['address', 'article', 'aside', 'blockquote', 'div', 'dl', 'fieldset',
                       'figure', 'figcaption', 'footer', 'form', 'h1', 'h2', 'h3', 'h4',
                       'h5', 'h6', 'header', 'hr', 'li', 'main', 'nav', 'ol', 'p', 'pre',
                       'section', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'ul']);

/* Wrapping a direct child of one of these would insert a grid or flex
   item and change the layout. Those cases are covered by CSS rules on
   the existing classes instead. */
/* .outcomes and .keypoints were on this list defensively and do not
   belong on it — both are plain block boxes, so their English list can
   be hidden in favour of the Nepali summary beneath it. */
const LAYOUT = /\b(pair|simgrid|herogrid|cards|gcards|scards|ucards|pager|topbar-in|dia-controls|predict-options|sim-controls|meta|foot|nav|desknav|dropmenu|mobilepanel|crumb|outline)\b/;

/* Some things must survive every mode, even when they sit beside a
   Nepali passage and would otherwise be swallowed into an English run:

     · the page's own heading — a lesson with no title in Nepali mode is
       a bug, not a translation
     · metadata that is a number or a badge rather than prose — "12 hrs ·
       7 marks", a unit number, a mark weight. These read the same in any
       language, and hiding them costs the student navigation.

   They act as run BREAKERS: the prose either side of them is still
   wrapped, they themselves are left alone. */
const NEVER_WRAP_TAG = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);
const NEVER_WRAP_CLASS = /\b(eyebrow|badge|hrs|marks|mk|pill|meta|status|idx|sec-num|qn|wex-n|wex-lbl|dia-progress|cpu-addr)\b/;

function neverWrap(child){
  if (child.type !== 'el') return false;
  return NEVER_WRAP_TAG.has(child.tag) || NEVER_WRAP_CLASS.test(child.cls || '');
}

const TOKEN = /<!--[\s\S]*?-->|<!\[[\s\S]*?\]>|<![^>]*>|<\/([a-zA-Z][\w-]*)\s*>|<([a-zA-Z][\w-]*)((?:"[^"]*"|'[^']*'|[^>])*?)(\/?)>/g;

function classOf(attrs){
  const m = attrs && attrs.match(/class\s*=\s*"([^"]*)"/i);
  return m ? m[1] : '';
}

/* ---------------------------------------------------------------
   Tokenise into a flat list. Every token keeps its exact source text,
   which is what makes lossless output possible.
   --------------------------------------------------------------- */
function tokenise(html){
  const out = [];
  let last = 0, m;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(html)) !== null){
    if (m.index > last) out.push({ kind: 'text', raw: html.slice(last, m.index) });
    if (m[1]){
      out.push({ kind: 'close', tag: m[1].toLowerCase(), raw: m[0] });
    } else if (m[2]){
      const tag = m[2].toLowerCase();
      const selfClosing = m[4] === '/' || VOID.has(tag);
      out.push({ kind: selfClosing ? 'void' : 'open', tag, cls: classOf(m[3]), raw: m[0] });
    } else {
      out.push({ kind: 'other', raw: m[0] });          // comment, doctype
    }
    last = m.index + m[0].length;
  }
  if (last < html.length) out.push({ kind: 'text', raw: html.slice(last) });
  return out;
}

/* ---------------------------------------------------------------
   Walk the token list, and for every element that holds an inline
   Nepali gloss, record where its English runs start and end.
   --------------------------------------------------------------- */
function plan(tokens){
  const inserts = [];           // { at: tokenIndex, before: string } / { after, text }
  const stack = [];             // open elements
  let opaqueDepth = 0;

  function frame(){ return stack.length ? stack[stack.length - 1] : null; }

  for (let i = 0; i < tokens.length; i++){
    const t = tokens[i];

    if (opaqueDepth){
      if (t.kind === 'open' && OPAQUE.has(t.tag)) opaqueDepth++;
      else if (t.kind === 'close' && OPAQUE.has(t.tag)) opaqueDepth--;
      continue;
    }

    if (t.kind === 'open' && OPAQUE.has(t.tag)){ opaqueDepth = 1; continue; }

    const f = frame();

    if (t.kind === 'open'){
      if (f) noteChild(f, i, t);
      stack.push({ tag: t.tag, cls: t.cls, children: [], start: i });
    } else if (t.kind === 'void'){
      if (f) noteChild(f, i, t);
    } else if (t.kind === 'text' || t.kind === 'other'){
      if (f) noteChild(f, i, t);
    } else if (t.kind === 'close'){
      /* Content is strictly nested (asserted by a build check), but be
         defensive: a stray close tag must not corrupt the stream. */
      let depth = stack.length - 1;
      while (depth >= 0 && stack[depth].tag !== t.tag) depth--;
      if (depth < 0) continue;
      while (stack.length > depth){
        const done = stack.pop();
        if (stack.length === depth) emit(done, i, inserts);
      }
    }
  }
  while (stack.length) emit(stack.pop(), tokens.length - 1, inserts);
  return inserts;

  function noteChild(f, i, t){
    if (t.kind === 'open'){
      /* record the element as one child spanning open..close; the close
         index is filled in when the element is popped */
      f.children.push({ type: 'el', tag: t.tag, cls: t.cls, from: i, to: -1, node: null });
      f.pending = f.children[f.children.length - 1];
    } else if (t.kind === 'void'){
      f.children.push({ type: 'el', tag: t.tag, cls: t.cls, from: i, to: i });
    } else {
      f.children.push({ type: 'raw', from: i, to: i, blank: t.kind === 'text' && !t.raw.trim() });
    }
  }

  function emit(node, closeIndex, out){
    /* attach this element's span to its parent's child record */
    const parent = stack.length ? stack[stack.length - 1] : null;
    if (parent){
      for (let k = parent.children.length - 1; k >= 0; k--){
        if (parent.children[k].type === 'el' && parent.children[k].from === node.start){
          parent.children[k].to = closeIndex;
          parent.children[k].children = node.children;
          break;
        }
      }
    }
    wrapRuns(node, out);
  }

  function wrapRuns(node, out){
    if (!node.children || !node.children.length) return;
    if (NEPALI.test(node.cls || '')) return;                 // inside Nepali already
    if (LAYOUT.test(node.cls || '')) return;                 // wrapping would add a grid item

    const kids = node.children;
    const hasNepali = kids.some(c => c.type === 'el' && NEPALI.test(c.cls || ''));
    if (!hasNepali) return;

    let run = [];
    const flush = () => {
      if (!run.length) { return; }
      const visible = run.some(c => c.type === 'el' || !c.blank);
      if (visible) wrapOne(run, out);
      run = [];
    };
    for (const c of kids){
      if (c.type === 'el' && NEPALI.test(c.cls || '')) flush();
      else if (neverWrap(c)) flush();          // breaks the run, and is skipped
      else run.push(c);
    }
    flush();
  }

  /* Does this subtree hold any Nepali? */
  function holdsNepali(c){
    if (c.type !== 'el') return false;
    if (NEPALI.test(c.cls || '')) return true;
    return !!(c.children && c.children.some(holdsNepali));
  }

  /* Does this subtree already carry an English handle? */
  function holdsExplicitEn(c){
    if (c.type !== 'el') return false;
    if (EXPLICIT_EN.test(c.cls || '')) return true;
    return !!(c.children && c.children.some(holdsExplicitEn));
  }

  function wrapOne(run, out){
    /* THE RULE THAT KEEPS RUNS LOCAL.

       A "run" is everything between two Nepali siblings, which at the
       top of a lesson can be most of the page — the section heading, the
       objectives, several topics. Wrapping that would hide the Nepali
       nested inside it as well, which is definitionally wrong: the
       handle exists to hide English, not to hide both languages.

       So a run is only a gloss pair if it contains no Nepali of its own.
       This is what keeps the transform to the local
       "English sentence + its Nepali gloss" case it was built for. */
    if (run.some(holdsNepali)) return;

    /* THE RULE THAT RESPECTS AN AUTHOR'S OWN SPLIT.

       Where a label pair sits inside a single heading —

         <h4>1.5.1 (a) <span class="t-en">Array</span>
                       <span class="t-ne"> — एरे</span></h4>

       — the author has already said which part is English. Wrapping the
       whole run again puts a second handle around "1.5.1 (a)" as well,
       and the section number disappears in Nepali mode along with the
       English. Measured on `oop-cpp/unit1.html`: the heading rendered
       as "एरे" with its number gone.

       An explicit handle anywhere in the run therefore means the run is
       already resolved, and nothing more is owed to it. */
    if (run.some(holdsExplicitEn)) return;

    /* A run that is exactly one already-explicit English container needs
       no wrapper — its own class is the handle. */
    if (run.length === 1 && run[0].type === 'el' && EXPLICIT_EN.test(run[0].cls || '')) return;
    const only = run.filter(c => c.type === 'el' || !c.blank);
    if (only.length === 1 && only[0].type === 'el' && EXPLICIT_EN.test(only[0].cls || '')) return;

    const from = run[0].from;
    const to   = run[run.length - 1].to;
    if (to < from) return;
    const block = run.some(c => c.type === 'el' && (BLOCK.has(c.tag) || hasBlock(c)));
    const tag = block ? 'div' : 'span';
    out.push({ index: from, side: 'before', text: '<' + tag + ' class="t-en">' });
    out.push({ index: to,   side: 'after',  text: '</' + tag + '>' });
  }

  function hasBlock(c){
    if (!c.children) return false;
    return c.children.some(k => k.type === 'el' && (BLOCK.has(k.tag) || hasBlock(k)));
  }
}

/* ---------------------------------------------------------------
   Apply. Insertions are placed into the original token stream, so
   with nothing to insert the output is the input.
   --------------------------------------------------------------- */
function pairEnglish(html){
  const tokens = tokenise(html);
  const inserts = plan(tokens);
  if (!inserts.length) return html;

  const before = new Map(), after = new Map();
  for (const ins of inserts){
    const map = ins.side === 'before' ? before : after;
    if (!map.has(ins.index)) map.set(ins.index, []);
    map.get(ins.index).push(ins.text);
  }

  let out = '';
  for (let i = 0; i < tokens.length; i++){
    if (before.has(i)) out += before.get(i).join('');
    out += tokens[i].raw;
    if (after.has(i)) out += after.get(i).reverse().join('');
  }
  return out;
}

module.exports = { pairEnglish, tokenise, NEPALI, EXPLICIT_EN };
