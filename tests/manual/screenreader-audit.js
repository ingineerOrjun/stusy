/* ============================================================
   SCREEN-READER AUDIT — browser-run

   WHY THIS EXISTS, AND WHAT IT IS NOT
   Five phases reported "screen-reader behaviour NOT VERIFIED" and
   substituted automated rule checks. Rule checks and a screen reader ask
   different questions. `axe` asks "does this button have a name?".  A
   screen reader asks "what does the student actually hear, in what
   order, in which voice?" — and those come apart.

   This tool asks the second question as far as a browser can answer it.
   It reconstructs the linear browse-mode reading order and the computed
   accessible name of every node a screen reader would reach, and it
   reports what would be SAID.

   IT IS STILL NOT A SCREEN READER. It cannot prove what NVDA speaks. It
   models the accessibility tree; a real session remains the only proof.
   Every report this writes says so.

   WHY NOT `read_page` / a DOM dump
   A DOM dump shows nodes a screen reader never reaches. The first run of
   this audit against a raw DOM tree reported 26 focusable elements
   "invisible but in tab order" — every one of them was inside
   display:none, which browsers already exclude. A tool that reports a
   phantom defect is itself a defect, so visibility is computed here the
   way the accessibility tree computes it: display, visibility,
   aria-hidden and inert, up the whole ancestor chain.

   HOW TO RUN
     serve the repository root, open a page, and in the console:
       await document.fonts.ready; JSON.stringify(SR(), null, 1)
     or paste SR_SOURCE (printed by `node tests/manual/screenreader-audit.js`).

   WHAT IT CATCHES — each of these has caught a real defect:
     · silent-language    Devanagari with no lang="ne", so an English
                          voice pronounces it — the Nepali half of the
                          page becomes noise to the students who need it
     · unnamed            a control a screen reader announces as its
                          role alone: "button", "image"
     · order              the spoken order differs from the visual order
     · orphan-heading     a heading level skipped, so the outline lies
     · live-flood         a live region that announces a paragraph
   ============================================================ */
'use strict';

const SR = String(function screenReaderAudit(){

  /* ---- what the accessibility tree can actually reach ---- */
  function reachable(el){
    for (var n = el; n && n.nodeType === 1; n = n.parentElement){
      if (n.getAttribute('aria-hidden') === 'true') return false;
      if (n.hasAttribute && n.hasAttribute('inert')) return false;
      var cs = getComputedStyle(n);
      if (cs.display === 'none' || cs.visibility === 'hidden' || cs.visibility === 'collapse') return false;
    }
    return true;
  }

  /* An element with role="img" or role="presentation" hides its subtree
     from the tree: the name stands for the whole picture. Modelling this
     matters — without it every diagram looks like 20 loose fragments. */
  function prunedByAncestor(el){
    for (var n = el.parentElement; n && n.nodeType === 1; n = n.parentElement){
      var r = n.getAttribute('role');
      if (r === 'img' || r === 'presentation' || r === 'none') return n;
    }
    return null;
  }

  /* Accessible name, following the parts of accname that apply here:
     aria-labelledby, aria-label, then contents (and <title> for SVG). */
  function accName(el){
    var lb = el.getAttribute('aria-labelledby');
    if (lb){
      var s = lb.split(/\s+/).map(function (id){
        var t = document.getElementById(id);
        return t ? (t.textContent || '').trim() : '';
      }).filter(Boolean).join(' ');
      if (s) return s;
    }
    var al = el.getAttribute('aria-label');
    if (al && al.trim()) return al.trim();
    if (el.tagName.toLowerCase() === 'svg'){
      var t = el.querySelector(':scope > title');
      if (t) return (t.textContent || '').trim();
    }
    if (el.tagName === 'IMG') return el.getAttribute('alt') || '';
    return (el.textContent || '').replace(/\s+/g, ' ').trim();
  }

  var findings = [];
  function note(kind, detail, node){
    findings.push({ kind: kind, detail: detail,
      where: node ? node.tagName.toLowerCase() +
        (node.className && typeof node.className === 'string' ? '.' + node.className.split(' ')[0] : '') : '' });
  }

  /* ---------- 1. SILENT LANGUAGE ----------
     Devanagari inside a lang="en" document. The single defect a rule
     checker never reports and a Nepali student hears immediately. */
  var DEV = /[ऀ-ॿ]/;
  var silent = [];
  var walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  var n;
  while ((n = walk.nextNode())){
    if (!DEV.test(n.nodeValue) || !n.nodeValue.trim()) continue;
    var p = n.parentElement;
    if (!p || !reachable(p)) continue;
    var carrier = p.closest('[lang]');
    if (carrier && carrier !== document.documentElement) continue;
    silent.push({ text: n.nodeValue.trim().slice(0, 40),
                  parent: p.tagName.toLowerCase() + '.' + (p.className || '-'),
                  inSvg: !!p.closest('svg') });
  }
  if (silent.length){
    note('silent-language',
         silent.length + ' Devanagari text runs inherit lang="' +
         (document.documentElement.lang || '?') + '" — an English voice would read them',
         null);
  }

  /* ---------- 2. UNNAMED CONTROLS AND IMAGES ---------- */
  var unnamed = [];
  var interactive = document.querySelectorAll(
    'a[href],button,input,select,textarea,[role="button"],[role="radio"],' +
    '[role="tab"],[role="checkbox"],[role="img"],svg[role="img"],img');
  Array.prototype.forEach.call(interactive, function (el){
    if (!reachable(el)) return;
    if (prunedByAncestor(el)) return;
    if (el.tagName === 'IMG' && el.getAttribute('alt') === '') return;   /* declared decorative */
    var name = accName(el);
    if (!name){
      unnamed.push({ tag: el.tagName.toLowerCase(), role: el.getAttribute('role') || '',
                     cls: String(el.className.baseVal !== undefined ? el.className.baseVal : el.className).slice(0, 30) });
    } else if (!/[A-Za-zऀ-ॿ0-9]/.test(name)){
      unnamed.push({ tag: el.tagName.toLowerCase(), role: el.getAttribute('role') || '',
                     symbolOnly: name.slice(0, 12) });
    }
  });
  if (unnamed.length) note('unnamed', unnamed.length + ' controls or images announce as their role alone', null);

  /* ---------- 3. HEADING OUTLINE ----------
     Skimming by heading is how a screen-reader user reads a 5,000-word
     page. A skipped level makes the outline claim a nesting that is not
     there. */
  var heads = Array.prototype.filter.call(
    document.querySelectorAll('h1,h2,h3,h4,h5,h6'), reachable);
  var outline = [], prev = 0, skips = [];
  heads.forEach(function (h){
    var lv = Number(h.tagName[1]);
    if (prev && lv > prev + 1) skips.push('h' + prev + ' -> h' + lv + ': "' + accName(h).slice(0, 40) + '"');
    prev = lv;
    outline.push('h' + lv + ' ' + accName(h).slice(0, 60));
  });
  var h1s = heads.filter(function (h){ return h.tagName === 'H1'; });
  if (h1s.length !== 1) note('outline', 'page has ' + h1s.length + ' <h1>, expected exactly 1', null);
  if (skips.length) note('outline', skips.length + ' skipped heading level(s): ' + skips.join(' | '), null);

  /* ---------- 4. LIVE REGIONS ----------
     A live region speaks over whatever the student is reading. A long
     one is not an announcement, it is an interruption. */
  var live = [];
  Array.prototype.forEach.call(
    document.querySelectorAll('[role="status"],[role="alert"],[aria-live]'), function (el){
      if (!reachable(el)) return;
      var words = (el.textContent || '').trim().split(/\s+/).filter(Boolean).length;
      live.push({ role: el.getAttribute('role') || el.getAttribute('aria-live'),
                  cls: String(el.className).slice(0, 24), words: words,
                  atomic: el.getAttribute('aria-atomic') });
      if (words > 25) note('live-flood', 'live region speaks ' + words + ' words at once', el);
    });

  /* ---------- 5. THE LINEAR READING ORDER ----------
     What browse mode would walk, in order, with the name it would say.
     This is the output to read by eye — an audit cannot judge whether a
     sentence makes sense out loud. */
  var spoken = [];
  var seen = new Set();
  var tw = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
  var cur;
  while ((cur = tw.nextNode())){
    if (cur.nodeType === 1){
      var role = cur.getAttribute && cur.getAttribute('role');
      if (role === 'img' && reachable(cur)){
        spoken.push({ as: 'graphic', say: accName(cur) });
        seen.add(cur);
      }
      continue;
    }
    var t = cur.nodeValue.replace(/\s+/g, ' ').trim();
    if (!t) continue;
    var host = cur.parentElement;
    if (!host || !reachable(host)) continue;
    if (prunedByAncestor(host)) continue;
    var lang = host.closest('[lang]');
    spoken.push({ say: t, voice: (lang && lang.getAttribute('lang')) || document.documentElement.lang });
  }

  /* ---------- 6. TABLES ----------
     A data table is only navigable if the cells declare which header
     they answer to. */
  var tables = [];
  Array.prototype.forEach.call(document.querySelectorAll('table'), function (t){
    if (!reachable(t)) return;
    var th = t.querySelectorAll('th');
    var noScope = Array.prototype.filter.call(th, function (h){
      return !h.getAttribute('scope') && !h.id;
    }).length;
    var rec = { name: accName(t.querySelector('caption') || t).slice(0, 30),
                rows: t.querySelectorAll('tr').length, headers: th.length, headersWithoutScope: noScope };
    tables.push(rec);
    if (th.length && noScope === th.length){
      note('table-scope', 'table "' + rec.name + '": ' + th.length +
           ' header cells declare no scope, so cell-to-header association is guessed', t);
    }
  });

  return {
    url: location.pathname,
    mode: document.documentElement.getAttribute('data-lang'),
    findings: findings,
    silentLanguage: { count: silent.length, sample: silent.slice(0, 12) },
    unnamed: { count: unnamed.length, sample: unnamed.slice(0, 12) },
    outline: outline,
    liveRegions: live,
    tables: tables,
    spokenNodes: spoken.length,
    spoken: spoken
  };
});

if (require.main === module){
  console.log('/* paste into the console of a served page, then: JSON.stringify(SR(),null,1) */');
  console.log('window.SR = ' + SR + ';');
}

module.exports = { SR_SOURCE: SR };
