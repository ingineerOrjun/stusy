/* ============================================================
   Gyansetu — page writer.
   Assembles every page from content, design and runtime sources.
   ============================================================ */
const ctx = require('./context.js');
const DIA = require('../diagrams.js');
const validate = require('./validate.js');

const w         = ctx.write;
const baseCss   = ctx.css;
const BRAND     = ctx.brand;
const SITE      = ctx.site;
const OUTLINE   = ctx.syllabus;
const AUTHORED  = ctx.pages;   /* subject key -> { hero, pages[] } */

/* Subject authoring status, derived in context.js from the syllabus and
   the pages that exist. Nothing below asks `s.done` any more: a boolean
   cannot describe a subject with one unit of seven written, and when one
   arrived the home page and the grade index each said something untrue.
   See the comment on `subjectStatus` in context.js. */
const STATUS = ctx.subjectStatus;
const SLABEL = ctx.STATUS_LABEL;
const statusOf = (gradeId, slug) => STATUS[gradeId + '/' + slug];

/* Fail the build on a content-contract violation before writing anything. */
validate({ site: SITE, syllabus: OUTLINE, pages: AUTHORED, diagrams: DIA, ctx: ctx });

/* ---------------------------------------------------------------
   Content pipeline.
   Content resolves through ctx.section(): an authored lesson wins over
   a shared page section, so deepening a page means adding a file.
   {{dia:name}} placeholders are replaced with inline SVG from the
   diagram library, and an unknown name fails the build.
   --------------------------------------------------------------- */
let diaUsed = 0, diaMissing = [], diaAnimated = new Set();

/* An animated diagram ships as a small component: the SVG, a control bar,
   and a bilingual caption region the runtime writes into. Authors still
   write only {{dia:name}} — whether it animates is a property of the
   diagram, not of the lesson. */
function animatedDiagram(name, cfg){
  diaAnimated.add(name);
  return `<div class="dia" data-dia="${name}">
  <div class="dia-stage">${cfg.svg}</div>
  <div class="dia-controls">
    <button type="button" data-dia-act="prev" data-ui="prev">&#9666; Prev</button>
    <button type="button" data-dia-act="play" data-ui="play" aria-pressed="false">&#9654; Play</button>
    <button type="button" data-dia-act="next" data-ui="next">Next &#9656;</button>
    <button type="button" data-dia-act="reset" data-ui="reset">Reset</button>
    <span class="dia-progress" aria-live="polite" data-dia-steps="${cfg.steps.length}">step 0 / ${cfg.steps.length}</span>
  </div>
  <div class="dia-caption" role="status">
    <span class="dia-cap-en"></span>
    <span class="dia-cap-ne np-cell"></span>
  </div>
</div>`;
}

function injectDiagrams(html, where){
  return html.replace(/\{\{dia:([A-Za-z0-9_]+)\}\}/g, function(_, name){
    const d = DIA[name];
    if (!d){ diaMissing.push(where + ' → ' + name); return '<!-- missing diagram: ' + name + ' -->'; }
    diaUsed++;
    if (typeof d === 'string') return d;                 // static figure
    return animatedDiagram(name, d);                     // animated component
  });
}

const deepUnits = [];
function sectionHtml(id){
  const s = ctx.section(id);
  if (s.authored && deepUnits.indexOf(id) < 0) deepUnits.push(id);
  return injectDiagrams(s.html, id);
}

/* ---------------- extra CSS: navbar, hamburger, cards ---------------- */
const siteCss = ctx.read('design/site.css');
/* Phase 2 learning-UX layer — loaded last so it can correct the layers above. */
const uxCss   = ctx.read('design/learning-ux.css');
/* Phase 2.5 motion layer — state language, educational transitions, diagram animation. */
const motionCss = ctx.read('design/motion.css');
/* Phase 3 Digital Design components — after motion so they can use the
   shared state language, before the language layer so a mode still wins. */
const digitalCss = ctx.read('design/digital.css');
const dbmsCss    = ctx.read('design/dbms.css');
/* The landing page's hero, bridge and counters. One page out of 40 uses
   them, so they ride on that page's sheet only — the same argument that
   split the subject layers out of the core. */
const homeCss    = ctx.read('design/home.css');
/* Phase 3 language layer — loaded last so a mode can hide anything above it. */
const langCss = ctx.read('design/language.css');

/* ---------------- which stylesheet a page gets ----------------
   Until Phase 5 every page loaded one 119 KB sheet, 45 KB of which was
   the two subject layers. A grade 9 stub with nine links carried the
   full K-map workbench and the whole ER notation. At three authored
   subjects that is 38% waste; at eight it stops being a rounding error.

   A COMPLETE SHEET PER VARIANT, NOT A SHEET PER LAYER.
   Splitting into core + subject + language would need three <link>s in
   a fixed order, and the order is load-bearing: language.css must come
   last or a mode cannot hide what the subject layer drew. One request
   per page, four files on disk, and the cascade is settled at build
   time where it can be reasoned about — rather than in a page's <head>
   where a future author can reorder it by accident.

   The subject layers were not actually separable when this was written.
   dbms.css styled the decision drill, which four OOP pages use, and
   digital.css held one rule for a shared control label. Both moved to
   the shared layer first; splitting before that would have quietly
   unstyled a component on pages that never mention its subject. */
const CORE = baseCss + siteCss + uxCss + motionCss;
const SHEETS = {
  'style.css':         CORE + langCss,
  'style-home.css':    CORE + homeCss + langCss,
  'style-digital.css': CORE + digitalCss + langCss,
  'style-dbms.css':    CORE + dbmsCss + langCss,
  'style-all.css':     CORE + digitalCss + dbmsCss + langCss
};

/* ---------------- "you should already know" ----------------
   Rendered at BUILD time, into the page, above the objectives. It is the
   first thing a student meets, so it must be there before any script
   runs: a student who opens Unit 5, does not follow it, and needs to be
   told to revise Unit 3 is exactly the student whose connection dropped
   half way through loading the page.

   Placed after the unit's rule line and before "By the end of this unit
   you can…", which puts the two halves of the contract next to each
   other — what you need first, then what you will be able to do.

   A unit with no prerequisites renders nothing at all rather than an
   empty panel saying "none": four units are genuine entry points and
   telling them so is noise. */
function prereqBlock(unitId){
  const unit = ctx.learningMap[unitId];
  if (!unit || !unit.prereqs.length) return '';
  const map = ctx.learningMap;

  let h = '<aside class="prereq" aria-labelledby="prereq-h">';
  h += '<h2 class="prereq-h" id="prereq-h">' +
       '<span class="t-en">You should already know</span>' +
       '<span class="t-ne"><span class="t-en"> · </span>तपाईंलाई पहिले यति आउनुपर्छ</span></h2>';
  h += '<ul class="prereq-list">';
  for (const r of unit.prereqs){
    const to = map[r.unit];
    if (!to) continue;
    /* Both units live under the same subject folder in every case the
       graph currently has, but the href is computed from the paths so a
       future cross-subject prerequisite needs no change here. */
    const from = unit.page.split('/').slice(0, -1);
    const target = to.page.split('/');
    let up = '';
    let i = 0;
    while (i < from.length && from[i] === target[i]) i++;
    for (let k = i; k < from.length; k++) up += '../';
    const href = up + target.slice(i).join('/');

    h += '<li class="prereq-item">';
    h += '<a class="prereq-link" href="' + href + '">' +
         '<span class="prereq-n">' + to.n + '</span>' +
         '<span class="prereq-t">' + to.title.en +
         '<span class="np-cell">' + to.title.ne + '</span></span></a>';
    h += '<p class="prereq-why">' + r.why.en +
         '<span class="np-cell">' + r.why.ne + '</span></p>';
    h += '</li>';
  }
  h += '</ul></aside>';
  return h;
}

/* A page declares its subject; the dev reference pages show everything. */
function sheetFor(o){
  if (o.allSubjects) return 'style-all.css';
  if (o.grade === 'home') return 'style-home.css';
  const s = o.subject || '';
  if (s.indexOf('digital-design') >= 0) return 'style-digital.css';
  if (s.indexOf('dbms') >= 0) return 'style-dbms.css';
  return 'style.css';
}

/* ---------------- nav builders ---------------- */
function deskNav(root, activeGrade){
  let h = '<nav class="desknav">';
  h += `<a href="${root}index.html"${activeGrade === 'home' ? ' class="on"' : ''}>Home</a>`;
  SITE.forEach(g => {
    if (g.status === 'soon'){
      h += `<span class="soonchip">${g.label} · soon</span>`;
      return;
    }
    h += `<div class="drop${activeGrade === g.id ? ' on' : ''}">`;
    h += `<button class="droptop" type="button">${g.label} <span class="car">&#9662;</span></button>`;
    h += '<div class="dropmenu">';
    h += `<a class="all" href="${root}${g.id}/index.html">All ${g.label} subjects</a>`;
    g.subjects.forEach(s => {
      const st = statusOf(g.id, s.slug);
      /* An outline-only subject says nothing here, as before. A partly
         written one says how far it goes rather than borrowing the
         finished subjects' words. */
      const note = st.state === 'complete'
        ? ` <span class="dn">· ${SLABEL.complete.en}</span>`
        : st.state === 'partial'
          ? ` <span class="dn">· ${st.authoredUnits} of ${st.officialUnits} units</span>`
          : '';
      h += `<a href="${root}${g.id}/${s.slug}/index.html">${s.short}` + note +
           `<small>${s.np}</small></a>`;
    });
    h += '</div></div>';
  });
  h += '</nav>';
  return h;
}

function mobileNav(root, activeGrade, activeHref){
  let h = '<div class="mobilepanel" id="mobilePanel">';
  h += `<a href="${root}index.html"${activeGrade === 'home' ? ' class="on"' : ''}>Home <small>गृहपृष्ठ</small></a>`;
  SITE.forEach(g => {
    h += `<p class="mobilepanel-label">${g.label} · ${g.np}</p>`;
    if (g.status === 'soon'){
      h += '<a class="dis" href="#" onclick="return false">Coming in the next phase <small>अर्को चरणमा आउँदैछ</small></a>';
      return;
    }
    h += `<a href="${root}${g.id}/index.html">All ${g.label} subjects <small>सबै विषय</small></a>`;
    g.subjects.forEach(s => {
      const href = `${root}${g.id}/${s.slug}/index.html`;
      const st = statusOf(g.id, s.slug);
      /* ✓ means finished. A half-written subject gets its fraction, not
         a tick it has not earned and not the silence of an empty one. */
      const mark = st.state === 'complete' ? ' ✓'
                 : st.state === 'partial'  ? ` · ${st.authoredUnits}/${st.officialUnits}`
                 : '';
      h += `<a href="${href}"${activeHref === `${g.id}/${s.slug}` ? ' class="on"' : ''}>${s.short}` +
           mark + `<small>${s.np}</small></a>`;
    });
  });
  h += '</div>';
  return h;
}

/* ---------------- page shell ---------------- */
const FAVICON = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">📘</text></svg>');

/* ---------------- bilingual markup ----------------
   The document is lang="en". Nepali passages must say so, or a screen
   reader pronounces Devanagari with an English voice — which makes the
   Nepali half of the page useless to exactly the students who need it.

   Applied centrally at build time so every current and future content
   file inherits it without the author having to remember.

   `t-ne` was missing from this list until Phase 5, and the fallback that
   should have caught it cannot: the text test below only sees the run
   immediately after an opening tag, and the house idiom for a Nepali
   passage opens with a nested separator —

       <span class="t-ne"><span class="t-en"> · </span>अन्तरक्रियात्मक…</span>

   so the captured run was empty and the Devanagari after the inner
   </span> was never examined. 82 Nepali passages across 20 pages were
   being handed to an English synthesiser. Naming the class is the fix;
   the text test stays as a net for content that does not use a class. */
const NEPALI_CONTAINERS = /\b(np|np-cell|np-line|lead-np|t-ne)\b/;
const DEVANAGARI = /[ऀ-ॿ]/;

/* ---------------- language modes (Phase 3) ----------------
   English prose that sits beside an inline Nepali gloss gets a .t-en
   handle so Nepali mode can hide it. Derived here rather than authored,
   because it applies to 186 places across finished content. */
const { pairEnglish } = require('./bilingual.js');

/* The mode has to be on <html> before the first paint, or the page
   renders bilingual and then visibly collapses to the chosen mode. That
   means a tiny inline script — it cannot wait for an external file.

   The storage key and the valid modes are duplicated from
   LanguageService here, and a test asserts the two copies agree, because
   a silent divergence would strand every student's saved preference. */
const LANG_KEY = 'rgsc.lang.v1';
const LANG_BOOTSTRAP =
  `<script>(function(d){var m="bi";try{var v=localStorage.getItem(${JSON.stringify(LANG_KEY)});` +
  `if(v==="ne"||v==="en"||v==="bi")m=v;}catch(e){}` +
  `d.documentElement.setAttribute("data-lang",m);})(document);</script>`;

/* The switcher itself. A radiogroup, because the three modes are one
   mutually exclusive choice; nav.js adds the keyboard behaviour and the
   active state is driven from the <html> attribute so it is correct
   before any script has run. Flags are deliberately not used — a
   language is not a country. */
const LANG_SWITCH = `<div class="langbar" role="radiogroup" aria-label="Language mode — भाषा छान्नुहोस्">
      <button class="lang-opt" type="button" role="radio" data-lang-set="ne" aria-checked="false" title="Nepali"><span class="ll-full">नेपाली</span><span class="ll-mini">ने</span></button>
      <button class="lang-opt" type="button" role="radio" data-lang-set="bi" aria-checked="true" title="Both languages"><span class="ll-full">Bilingual</span><span class="ll-mini">दुवै</span></button>
      <button class="lang-opt" type="button" role="radio" data-lang-set="en" aria-checked="false" title="English"><span class="ll-full">English</span><span class="ll-mini">EN</span></button>
    </div>`;

/* HEADING LEVELS
   Lesson pages had no <h1> and skipped levels (h1 -> h3), so navigating by
   heading — the normal way a screen-reader user skims a long page — gave a
   misleading outline.

   Rather than ask every content author to track levels across a 5,000-word
   file, levels are derived from the document's own nesting: each heading
   becomes one level deeper than the nearest heading it sits under. The first
   heading always becomes the <h1>.

   Appearance is unaffected: .topic and .sub carry the styling, not the tag. */
function normaliseHeadings(html){
  const stack = [];
  let current = null;
  let seenFirst = false;
  return html.replace(/<(\/)?h([1-6])(\s[^>]*)?>/gi, (m, closing, lvl, attrs) => {
    if (closing){
      const out = current || lvl;
      current = null;
      return '</h' + out + '>';
    }
    const src = Number(lvl);
    while (stack.length && stack[stack.length - 1] >= src) stack.pop();
    stack.push(src);
    /* The first heading is the page title. Everything after it is a section
       of that page, so it can never be another h1 — otherwise two sibling
       top-level headings would both claim to be the document title. */
    const depth = stack.length;
    current = seenFirst ? Math.min(Math.max(depth, 2), 6) : 1;
    seenFirst = true;
    return '<h' + current + (attrs || '') + '>';
  });
}

/* WHY <main> CARRIES tabindex="-1"
   It is what makes the skip link work. Measured in Chrome: activating
   "Skip to content" set location.hash to #main and then dropped
   document.activeElement to <body>. The page scrolled and the keyboard
   user's position was lost — the next Tab started over from the top,
   which is the one thing the link exists to prevent. A fragment target
   that cannot hold focus does not receive it.

   -1 keeps it out of the Tab sequence: focusable, never tabbed to. No
   visual change either, because :focus-visible does not match focus
   moved by a fragment navigation, so no ring is painted.

   This note lives here rather than beside the tag: an HTML comment in
   the template ships to all 36 built pages, and this one mentioned
   <main> in its prose, which made every page look like it had two. */

/* ---------------- Nepali headings ----------------
   Applied at build time rather than authored inline, for the reason
   every other central pass exists: the same four headings appear in
   eighteen files, and a translation table is one place to be right
   instead of 151.

   THE SHAPE IT PRODUCES is the one the existing bilingual headings
   already use:

     <h3>1.3 &nbsp;<span class="t-en">Converting between bases</span
        ><span class="t-ne"><span class="t-en"> — </span>एक base बाट
        अर्कोमा बदल्ने</span></h3>

   English mode shows the English; Nepali mode shows the Nepali; only
   bilingual mode shows the em dash, because it is inside a nested .t-en.
   Phase 3.1 recorded that a heading mixing both languages in ONE element
   cannot be split by the mode — this is how it is avoided.

   Leading numbering stays OUTSIDE both halves. "1.3" is the same in
   every language and belongs to the outline, not to the sentence. */
const HEADING_NE = require('../content/heading-ne.js');

function markNepaliHeadings(html){
  return html.replace(/<(h[1-6])([^>]*)>([\s\S]*?)<\/\1>/g, (whole, tag, attrs, inner) => {
    /* Already bilingual, or carrying markup this pass must not disturb. */
    if (/[ऀ-ॿ]/.test(inner)) return whole;
    if (/class="t-en"|class="np-cell"/.test(inner)) return whole;

    /* SPLIT THE OUTLINE NUMBER OFF, AT THE &nbsp; THAT ALWAYS SEPARATES IT.
       "1.3 &nbsp;Converting between bases" must keep its 1.3 visible in
       every language: the number is the unit's outline position, the
       same in Nepali as in English, and a Nepali-mode heading reading
       "एक base बाट अर्कोमा बदल्ने" with no number has lost its place in
       the lesson.

       Split on the entity rather than on a character class. The first
       version of this used an alternation containing a bare `&`, which
       matched the ampersand INSIDE &nbsp; and produced
       `1.3 &<span class="t-en">nbsp;Converting…`. It also would have
       eaten the leading 1 of "1's complement". The entity is an
       unambiguous marker and every numbered heading in the product uses
       one. */
    let prefix = '';
    let rest = inner;
    const nb = inner.indexOf('&nbsp;');
    /* Entities are stripped before looking for letters: "1.4 &amp; 1.5 "
       is a number prefix, and the "amp" inside the entity is not a word. */
    if (nb >= 0 && !/[A-Za-z]/.test(inner.slice(0, nb).replace(/&[a-z]+;/g, ''))){
      prefix = inner.slice(0, nb + 6);
      rest = inner.slice(nb + 6);
    }

    const flatten = s => s.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ')
                          .replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
    /* The table may key on either form — with the outline number, as the
       topic headings read, or without, as the sub-headings do. */
    const ne = HEADING_NE[flatten(inner)] || HEADING_NE[flatten(rest)];
    if (!ne) return whole;

    return '<' + tag + attrs + '>' + prefix +
           '<span class="t-en">' + rest.trim() + '</span>' +
           '<span class="t-ne"><span class="t-en"> — </span>' + ne + '</span>' +
           '</' + tag + '>';
  });
}

/* HEADER SCOPE
   All 25 content tables are column-header-only, the one shape every
   screen reader infers correctly, so nothing is announced wrongly today.
   `scope` is added anyway because the inference is the reader's guess,
   not a declaration: the first content table that adds a row header
   turns a latent risk into a wrong announcement, silently, and no test
   would catch it. Declaring the association costs nothing visual.

   Only <th> already inside a table gets it, and only if the author has
   not said otherwise. */
function markTableScope(html){
  return html.replace(/<th\b([^>]*)>/gi, (whole, attrs) => {
    if (/\bscope\s*=/i.test(attrs)) return whole;
    return `<th${attrs} scope="col">`;
  });
}

function markNepali(html){
  return html.replace(/<([a-z][a-z0-9]*)\b([^>]*)>([^<]*)/gi, (whole, tag, attrs, text) => {
    if (/\blang\s*=/i.test(attrs)) return whole;              // already declared
    const classMatch = attrs.match(/class="([^"]*)"/i);
    const isContainer = classMatch && NEPALI_CONTAINERS.test(classMatch[1]);
    if (!isContainer && !DEVANAGARI.test(text)) return whole;
    const selfClosing = attrs.endsWith('/');
    const cleaned = selfClosing ? attrs.slice(0, -1) : attrs;
    return `<${tag}${cleaned} lang="ne"${selfClosing ? ' /' : ''}>${text}`;
  });
}

function page(o){
  const root = o.root;
  /* A page containing an animated diagram gets the runtime automatically.
     Content authors never wire scripts — they write {{dia:name}} and the
     build works out what that page needs. */
  const needed = (o.js || []).slice();
  if (/data-dia="/.test(o.body || '')){
    /* Order matters: the runtime must define DiagramRuntime before the
       generated data file calls DiagramRuntime.register(). */
    if (needed.indexOf('diagram.js') < 0) needed.push('diagram.js');
    if (needed.indexOf('diagram-data.js') < 0) needed.push('diagram-data.js');
  }
  const js = needed.map(f => `<script src="${root}assets/js/${f}"></script>`).join('\n');
  return markTableScope(markNepali(pairEnglish(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'">
<title>${o.title}</title>
<meta name="description" content="${o.desc || ''}">
<link rel="icon" href="${FAVICON}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Noto+Sans:wght@400;600;700&family=Noto+Sans+Devanagari:wght@400;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${root}assets/css/${sheetFor(o)}">
${LANG_BOOTSTRAP}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="topbar">
  <div class="topbar-in">
    <a class="brand" href="${root}index.html">
      <span class="brand-mark">${BRAND.mark}</span>
      <span class="brand-txt">${BRAND.name}<small>${BRAND.tagline}</small></span>
    </a>
    ${deskNav(root, o.grade)}
    ${LANG_SWITCH}
    <button class="hamburger" id="hamBtn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobilePanel">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>
${mobileNav(root, o.grade, o.activeHref)}

<div class="wrap">
${o.crumb ? `<nav class="crumb" aria-label="Breadcrumb">${o.crumb}</nav>` : ''}
<main id="main" tabindex="-1"${o.subject ? ` data-subject="${o.subject}"` : ""}>
${normaliseHeadings(markNepaliHeadings(o.body))}
</main>
${o.pager || ''}
<footer>
  <b style="color:var(--chalk-dim)">${BRAND.name}</b> — Secondary Level (Technical &amp; Vocational),
  Computer Engineering, Curriculum Development Centre Nepal, 2078.<br>
  Works fully offline. No login, no server, no internet needed (web fonts are optional).
  <span class="np-cell">इन्टरनेट नभए पनि पूरै चल्छ। लगइन चाहिँदैन।</span>
</footer>
</div>
<script src="${root}assets/js/services/language.js"></script>
<script src="${root}assets/js/services/strings.js"></script>
<script src="${root}assets/js/nav.js"></script>
${js}
</body>
</html>
`)));
}

function crumb(parts){
  return parts.map((p, i) => {
    const last = i === parts.length - 1;
    const sep = i ? '<span class="sep">/</span> ' : '';
    return sep + (last || !p[1] ? `<span>${p[0]}</span>` : `<a href="${p[1]}">${p[0]}</a>`);
  }).join(' ');
}

/* ---------------- assets ---------------- */
for (const [name, css] of Object.entries(SHEETS)) w('assets/css/' + name, css);

/* Runtime modules ship verbatim from _source/runtime — what is in source
   control is exactly what the browser receives. */
for (const [srcName, outName] of Object.entries(ctx.RUNTIME_PUBLISHED)){
  w('assets/js/' + outName, ctx.runtime[srcName]);
}

/* Question banks are content, so they are generated rather than hand-written.
   Each bank registers itself with QuizService, which the quiz engine then
   queries — adding a subject's questions never touches the engine. */
/* Animated diagram configuration. Generated like the question bank, so a
   diagram's steps live with the diagram rather than inside a page. */
w('assets/js/diagram-data.js',
  '/* GENERATED from _source/diagrams.js — do not edit by hand. */\n' +
  Object.keys(DIA).filter(n => typeof DIA[n] !== 'string').map(n =>
    'DiagramRuntime.register(' + JSON.stringify(n) + ', ' +
    JSON.stringify({ intro: DIA[n].intro, steps: DIA[n].steps }, null, 2) + ');'
  ).join('\n\n') + '\n');

/* ---------------- the revision index ----------------
   A retrieval record is keyed by the answer id its author wrote —
   `dba41` — which tells the revision view nothing about where that
   question lives. This is the join: id → unit → page.

   Collected while the pages are written rather than by re-reading them
   afterwards, so it cannot drift from what actually shipped. `retrieval`
   is filled by the page loop below; the file is written after it. */
const retrievalIndex = {};

w('assets/js/practice-bank.js',
  '/* GENERATED from _source/content/practice — do not edit by hand. */\n' +
  ctx.practiceBanks.map(skill =>
    'GuidedPractice.register(' + JSON.stringify(skill, null, 2) + ');'
  ).join('\n\n') + '\n');

/* Stepper programs, written the same way and for the same reason. The
   mount() at the end matters: sim-crun.js loads before this file, so the
   registry is empty when it first looks, and a page that only mounted on
   DOMContentLoaded would be relying on script order rather than stating
   it. mount() is idempotent — a mounted container carries a marker. */
w('assets/js/program-bank.js',
  '/* GENERATED from _source/content/programs — do not edit by hand. */\n' +
  ctx.programBanks.map(prog =>
    'CRun.register(' + JSON.stringify(prog, null, 2) + ');'
  ).join('\n\n') + '\n\nCRun.mount();\n');

w('assets/js/question-bank.js',
  '/* GENERATED from _source/content/questions — do not edit by hand. */\n' +
  Object.entries(ctx.questionBanks).map(([subject, qs]) =>
    'QuizService.registerBank(' + JSON.stringify(subject) + ', ' +
    JSON.stringify(qs, null, 2) + ');'
  ).join('\n\n') + '\n\n' +
  /* The units a low score should send a student back to, derived from
     each unit's external marks in pages.js. Registered here, beside the
     bank, because the engine is shared by five subjects and advice that
     names a unit must arrive as that subject's data rather than be
     typed into a message every subject reads. */
  '/* Revision focus per subject, in two kinds that are never merged:\n' +
  '   exam    — derived from each unit\'s external marks (a fact about the paper)\n' +
  '   teacher — authored in _source/content/revision-focus.js (a judgement)\n' +
  '   The quiz labels whichever it shows. See docs/ASSESSMENT-ARCHITECTURE.md. */\n' +
  Object.keys(ctx.examFocus).map(subject => {
    const teacher = ctx.teacherFocus[subject];
    return 'QuizService.registerFocus(' + JSON.stringify(subject) + ', ' +
      JSON.stringify({
        exam: ctx.examFocus[subject],
        teacher: (teacher && teacher.units) || [],
        source: (teacher && teacher.source) || null
      }, null, 2) + ');';
  }).join('\n\n') + '\n');

/* ---------------- home ----------------
   THE LANDING PAGE MAKES ONE ARGUMENT AND THEN PROVES IT.

   The old page opened with "Computer Engineering Study Board" and a
   paragraph explaining that topics are given in English with Nepali
   beside them. That is the product's whole thesis, stated in prose that
   a visitor skims.

   It is now the name — Gyansetu, ज्ञानसेतु, knowledge bridge — and the
   first thing on the page is six real terms out of the real curriculum
   making that crossing. Nothing is claimed that is not shown.

   Every number below is counted from the lesson sources by
   ctx.contentStats, so the page cannot overstate what has been built. */
(function(){
  const S = ctx.contentStats;

  /* --- the bridge: real exam terms, real Nepali meanings ---
     Chosen for being the terms students actually lose marks on, one
     pair per completed subject area, not the easiest six to translate.

     THE ONE PLACE THAT IGNORES THE LANGUAGE MODE, DELIBERATELY.
     .bridge-en and .bridge-ne are NOT .t-en / .t-ne, so both halves
     survive English mode and Nepali mode alike. Everywhere else that
     would be a bug; here it is the component. A visitor in English mode
     shown "Inheritance →" and an empty box has been shown the product
     failing to do the one thing it is named after.

     The Nepali still carries lang="ne" — the build's markNepali pass
     adds it — so a screen reader changes voice rather than reading
     Devanagari through an English one. */
  const BRIDGE = [
    { term:'Inheritance', sub:'DS &amp; OOP with C++',
      ne:'एउटा class ले अर्को class का data र function सित्तैमा पाउनु — फेरि लेख्नु नपर्ने।' },
    { term:'Encapsulation', sub:'DS &amp; OOP with C++',
      ne:'डाटा र त्यही डाटामाथि काम गर्ने function लाई एउटै object भित्र बाँधेर बाहिरबाट छोप्नु।' },
    { term:'Normalization', sub:'DBMS',
      ne:'एउटै तालिकामा दोहोरिएको डाटा हटाउन सानो–साना तालिकामा बाँड्ने तरिका।' },
    { term:'Primary key', sub:'DBMS',
      ne:'तालिकाको हरेक row लाई छुट्याउने अद्वितीय column — दोहोरिन पनि नहुने, खाली हुन पनि नहुने।' },
    { term:'Universal gate', sub:'Digital Design',
      ne:'जुन गेटबाट अरू सबै गेट बनाउन सकिन्छ — NAND र NOR, यी दुई मात्र।' },
    { term:'Instruction cycle', sub:'Digital Design',
      ne:'fetch → decode → execute — प्रोसेसरले हरेक instruction मा दोहोर्‍याउने तीन चरण।' }
  ];

  const bridgeItems = BRIDGE.map((b, i) => `
      <div class="bridge-item${i ? '' : ' on'}" data-term="${b.term}"${i ? ' hidden' : ''}>
        <div class="bridge-en"><b>${b.term}</b><small>${b.sub}</small></div>
        <div class="bridge-span" aria-hidden="true">&#10230;</div>
        <div class="bridge-ne"><p>${b.ne}</p><small>अर्थ</small></div>
      </div>`).join('');

  /* --- grade cards --- */
  let cards = '';
  SITE.forEach(g => {
    const soon = g.status === 'soon';
    const n = g.id.replace('grade','');
    if (soon){
      cards += `<div class="gcard dis"><div class="num">${n}</div>
         <h3>${g.label}<span class="np-cell">${g.np}</span></h3>
         <p><span class="status soon">next phase</span></p></div>`;
      return;
    }
    /* Readiness is shown per subject rather than as one number, because
       "4 subjects" beside three outlines and one finished subject is
       true and misleading at the same time. */
    const chips = g.subjects.map(s => {
      const st = statusOf(g.id, s.slug);
      /* Three states, three looks. A half-written subject used to look
         exactly like an empty one here, so a student had no way to see
         from the home page that Grade 9 had anything to read at all. */
      const cls = st.state === 'complete' ? 'on' : st.state === 'partial' ? 'part' : '';
      const title = st.state === 'partial'
        ? ` title="${st.authoredUnits} of ${st.officialUnits} units written"` : '';
      return `<span class="${cls}"${title}>${s.short}</span>`;
    }).join('');
    cards += `<a class="gcard" href="${g.id}/index.html"><div class="num">${n}</div>
       <h3>${g.label}<span class="np-cell">${g.np}</span></h3>
       <p>${g.subjects.length} subjects · 4 credit hrs each · 128 working hrs</p>
       <div class="ready">${chips}</div>
       <span class="go">Open</span></a>`;
  });

  /* --- what is actually finished, derived rather than typed ---
     This paragraph said "Grade 10 OOP is complete" for four phases
     after DBMS and Digital Design were finished too, so it was rebuilt
     from the status flags the cards use.

     That was only half the lesson. The sentence then took the four
     FINISHED subjects and gave them the SITE-WIDE totals — and when
     Grade 9 Unit 1 arrived it read "4 subjects are written in full …
     across 25 units", crediting them with a fifth subject's unit, two
     of its diagrams, one of its simulators, four of its questions and
     eight of its hours. The four have 24 units.

     Both halves now come from `contentStats.complete`, which sums only
     subjects whose every official unit has a page, and the partly
     written subject is named separately in its own sentence. A number
     here cannot describe a subject the sentence beside it excludes. */
  const ready = Object.values(STATUS).filter(s => s.state === 'complete');
  const part  = Object.values(STATUS).filter(s => s.state === 'partial');
  const readyEn = ready.map(s => `<b>${s.short}</b>`).join(', ');
  const readyNe = ready.map(s => `<b>${s.np}</b>`).join(', ');
  const C = S.complete;

  /* One sentence per partly written subject, in both languages. Written
     as a list rather than a fixed string so the second one does not
     need a code change — and so it disappears entirely when there are
     none, rather than leaving "0 subjects are partly written". */
  const partEn = part.map(s =>
    `<b>${s.short}</b> (${s.gradeLabel}) is <b>partly written</b> — ` +
    `${s.authoredUnits} of its ${s.officialUnits} units.`).join(' ');
  const partNe = part.map(s =>
    `<b>${s.np}</b> (${s.gradeLabel === 'Grade 9' ? 'कक्षा ९' : s.gradeLabel}) ` +
    `<b>आंशिक लेखिएको</b> छ — ${s.officialUnits} मध्ये ${s.authoredUnits} युनिट।`).join(' ');

  const stat = (n, en, ne) =>
    `<div class="stat"><span class="stat-n" data-to="${n}">${n}</span>
       <span class="stat-l">${en}<span class="np-cell">${ne}</span></span></div>`;

  const body = `
<div class="homehero">
  <p class="hero-eyebrow">Secondary Level · Technical &amp; Vocational Stream</p>
  <div class="hero-brand">
    <h1>${BRAND.name}</h1>
    <span class="hero-np">${BRAND.np}</span>
    <span class="hero-mean">${BRAND.meaning.en}</span>
  </div>
  <p class="hero-promise">${BRAND.promise.en}
    <span class="np-cell">${BRAND.promise.ne}</span></p>
  <div class="hero-meta">
    <span class="pill y">Bilingual</span>
    <span class="pill b">Interactive simulators</span>
    <span class="pill c">Program tracing</span>
    <span class="pill">Works offline</span>
  </div>

  <div class="bridge" aria-labelledby="bridge-h">
    <div class="bridge-head">
      <p class="bridge-kicker" id="bridge-h">The same idea, both ways</p>
      <button class="bridge-play" type="button" aria-pressed="false">Pause</button>
    </div>
    <div class="bridge-stage">${bridgeItems}
    </div>
    <div class="bridge-dots"></div>
  </div>
</div>

<div class="stats reveal">
  ${stat(S.units,      'units written',      'युनिट लेखिएका')}
  ${stat(S.diagrams,   'diagrams',           'चित्र')}
  ${stat(S.animations, 'animated',           'चलायमान')}
  ${stat(S.simulators, 'things to try',      'चलाएर हेर्ने')}
  ${stat(S.retrieval,  'practice questions', 'अभ्यास प्रश्न')}
  ${stat(S.hours,      'course hours',       'पाठ्य घण्टा')}
</div>

<section style="margin-top:34px" class="reveal">
  <div class="sec-head"><div class="sec-num">›</div>
    <div><h2>Choose your grade</h2><p class="sec-sub">आफ्नो कक्षा छान्नुहोस्</p></div></div>
  <div class="rule"></div>
  <div class="gcards">${cards}</div>
</section>

<div class="pair reveal">
  <div class="en"><span class="tag">What is ready right now</span>
    <p>${C.subjects} subjects are written in full — ${readyEn} —
    across ${C.units} units: ${C.diagrams} diagrams, ${C.animations} of them animated,
    ${C.simulators} things you can actually operate, and ${C.retrieval} practice questions
    that ask you to answer before they show you anything.</p>
    ${partEn ? `<p>${partEn} Its finished units read exactly like the rest; the others
    are being written.</p>` : ''}
    <p>Every other subject shows its <b>full syllabus outline</b> taken from the CDC
    curriculum, so you can see exactly what you must study. Notes for those are being
    written next.</p>
  </div>
  <div class="np"><span class="tag">अहिले के तयार छ</span>
    <p>${C.subjects} विषय पूरै लेखिएका छन् — ${readyNe} — जम्मा ${C.units} युनिटमा:
    ${C.diagrams} चित्र, तीमध्ये ${C.animations} चलायमान, ${C.simulators} वटा आफैँ चलाएर हेर्न मिल्ने,
    र ${C.retrieval} अभ्यास प्रश्न — जसले उत्तर देखाउनुअघि तपाईंलाई नै सोध्छ।</p>
    ${partNe ? `<p>${partNe} लेखिसकिएका युनिट अरूकै जस्तै छन्; बाँकी लेखिँदैछन्।</p>` : ''}
    <p>अरू सबै विषयमा अहिले CDC पाठ्यक्रमबाट लिइएको <b>पूरा सिलेबस रूपरेखा</b> देखिन्छ, ताकि
    के–के पढ्नुपर्छ थाहा होस्। तिनका नोट्स क्रमशः लेखिँदैछन्।</p>
  </div>
</div>`;

  w('index.html', page({
    root:'', grade:'home',
    title:`${BRAND.name} — Computer Engineering, Grade 9 to 12`,
    desc:`${BRAND.name} (${BRAND.np}) — bilingual English and Nepali study and revision site for the Nepal CDC Computer Engineering curriculum.`,
    js:['services/motion.js','home.js'],
    body
  }));
})();

/* ---------------- grade index pages ---------------- */
SITE.filter(g => g.status === 'open').forEach(g => {
  let cards = '';
  g.subjects.forEach((s, i) => {
    const st = statusOf(g.id, s.slug);
    /* THE UNIT COUNT USED TO BE `s.done ? 6`.
       Right for OOP and Hardware, wrong for DBMS (7) and Digital Design
       (5) — a figure on a navigation page that no data supported, telling
       a DBMS student their subject was a unit shorter than it is. It is
       now the subject's own official unit count, which is also what the
       outline-only cards were already using, so the two cases stopped
       needing different code. */
    const units = st.officialUnits;
    const cls = { complete: 'done', partial: 'part', outline: 'out' }[st.state];
    /* A partly written subject says how far it goes. It used to read
       "syllabus outline", exactly like the three Grade 9 subjects with
       nothing written, so the one subject with a unit to read looked
       identical to the ones without. */
    const label = st.state === 'partial'
      ? `${st.authoredUnits} of ${st.officialUnits} units written`
      : SLABEL[st.state].en;
    cards += `<a class="scard" href="${s.slug}/index.html">
      <div class="idx">SUBJECT ${i + 1}</div>
      <h3>${s.name}<span class="np-cell">${s.np}</span></h3>
      <div class="foot">
        <span class="status ${cls}">${label}<span class="np-cell">${
          st.state === 'partial'
            ? `${st.officialUnits} मध्ये ${st.authoredUnits} युनिट लेखिएको`
            : SLABEL[st.state].ne}</span></span>
        <span class="pill">${units} units</span><span class="pill">64 theory hrs</span>
      </div></a>`;
  });

  const body = `
<div class="pagehead">
  <div class="eyebrow">Computer Engineering · CDC Nepal 2078</div>
  <h1>${g.label}</h1>
  <p class="np-line">${g.np} — कम्प्युटर इन्जिनियरिङ</p>
  <div class="meta"><span class="pill y">${g.subjects.length} subjects</span>
    <span class="pill b">4 credit hrs each</span><span class="pill">128 working hrs each</span></div>
</div>

<section style="margin-top:30px">
  <div class="sec-head"><div class="sec-num">›</div>
    <div><h2>Subjects</h2><p class="sec-sub">विषयहरू</p></div></div>
  <div class="rule"></div>
  <div class="scards">${cards}</div>
</section>`;

  w(`${g.id}/index.html`, page({
    root:'../', grade:g.id,
    title:`${g.label} — Computer Engineering | `,
    desc:`All ${g.label} Computer Engineering subjects.`,
    crumb: crumb([['Home','../index.html'], [g.label]]),
    body
  }));
});

/* ---------------- outline subject pages ---------------- */
Object.keys(OUTLINE).forEach(key => {
  const [gid, slug] = key.split('/');
  const g = SITE.find(x => x.id === gid);
  const s = g.subjects.find(x => x.slug === slug);
  const units = OUTLINE[key];
  const totalHrs = units.reduce((a, u) => a + u.h, 0);

  let list = '';
  units.forEach((u, i) => {
    list += `<div class="outline">
      <div class="oh"><div class="badge">${i + 1}</div>
        <div><h3>${u.t}</h3><span class="np-cell">${u.np}</span></div>
        <span class="marks" style="margin-left:auto">${u.h} hrs</span></div>
      <ul>${u.c.map(c => `<li>${c}</li>`).join('')}</ul>
    </div>`;
  });

  const body = `
<div class="pagehead">
  <div class="eyebrow">${g.label} · Subject outline</div>
  <h1>${s.name}</h1>
  <p class="np-line">${s.np}</p>
  <div class="meta"><span class="status out">syllabus outline</span>
    <span class="pill y">${units.length} units</span>
    <span class="pill b">${totalHrs} theory hrs</span>
    <span class="pill">4 credit hrs · 128 working hrs</span></div>
</div>

<div class="pair">
  <div class="en"><span class="tag">What this page is</span>
    <p>This is the <b>complete official syllabus</b> for this subject, taken straight from the
    CDC Computer Engineering curriculum (2078). Use it as your revision checklist — everything the
    written exam can ask comes from this list.</p>
    <p>Full bilingual notes, simulators and a quiz for this subject are being written next, in the
    same style as <a href="../../grade10/oop-cpp/index.html">Data Structure &amp; OOP using C++</a>.</p>
  </div>
  <div class="np"><span class="tag">यो पेज के हो</span>
    <p>यो CDC कम्प्युटर इन्जिनियरिङ पाठ्यक्रम (२०७८) बाट सिधै लिइएको यस विषयको
    <b>पूरा आधिकारिक सिलेबस</b> हो। यसैलाई दोहोर्‍याउने चेकलिस्ट बनाउनुहोस् — लिखित परीक्षामा
    सोधिने सबै कुरा यही सूचीबाट आउँछ।</p>
    <p>यस विषयका पूरा द्विभाषिक नोट्स, सिमुलेटर र क्विज क्रमशः लेखिँदैछन् —
    <a href="../../grade10/oop-cpp/index.html">डाटा स्ट्रक्चर र OOP (C++)</a> कै शैलीमा।</p>
  </div>
</div>

<section style="margin-top:26px">
  <div class="sec-head"><div class="sec-num">≡</div>
    <div><h2>Units and contents</h2><p class="sec-sub">युनिट र विषयवस्तु</p></div>
    <span class="marks">${totalHrs} hrs total</span></div>
  <div class="rule"></div>
  ${list}
</section>`;

  w(`${key}/index.html`, page({
    root:'../../', grade:gid, activeHref:key,
    title:`${s.name} — ${g.label} | `,
    desc:`Full CDC syllabus outline for ${s.name}, ${g.label}.`,
    crumb: crumb([['Home','../../index.html'], [g.label,'../index.html'], [s.short]]),
    body
  }));
});

/* ---------------- fully authored subjects ----------------
   One pass per subject in the page map. Nothing here names a subject:
   the hero, the chip labels, the totals and the crumb all come from the
   subject's own entry, so a third authored subject is a config change
   and a folder of lessons. */
Object.entries(AUTHORED).forEach(([key, subject]) => {
  const root = '../../';
  const [gid, slug] = key.split('/');
  const g = SITE.find(x => x.id === gid);
  const s = g.subjects.find(x => x.slug === slug);
  const PAGES = subject.pages;
  const label = s.short;

  const unitPages = PAGES.filter(p => typeof p.hrs === 'number');
  const totalHrs = unitPages.reduce((a, p) => a + p.hrs, 0);
  const totalMarks = PAGES.reduce((a, p) => a + (p.marks || 0), 0);

  function chipBar(current){
    let h = '<nav class="nav" style="margin-top:0">';
    h += `<a href="index.html"${current === 'index' ? ' style="color:var(--yellow);border-color:var(--yellow)"' : ''}>Overview</a>`;
    PAGES.forEach(p => {
      const on = current === p.file;
      h += `<a href="${p.file}"${on ? ' style="color:var(--yellow);border-color:var(--yellow)"' : ''}>${p.n} · ${p.chip || p.title}</a>`;
    });
    h += '</nav>';
    return h;
  }

  /* subject overview */
  let ucards = '';
  PAGES.forEach(p => {
    ucards += `<a class="ucard" href="${p.file}">
      <div class="top"><div class="badge">${p.n}</div>
        <h4>${p.title}<span class="np-cell">${p.np}</span></h4></div>
      <span class="hrs">${p.hrs ? p.hrs + ' hrs · ' + p.marks + ' marks' : 'practice &amp; revision'}</span></a>`;
  });

  const overviewBody = `
${sectionHtml(subject.hero)}

<section style="margin-top:34px">
  <div class="sec-head"><div class="sec-num">≡</div>
    <div><h2>Units and sections</h2><p class="sec-sub">युनिट र सेक्सनहरू</p></div>
    <span class="marks">${unitPages.length} units · ${totalHrs} hrs · ${totalMarks} marks</span></div>
  <div class="rule"></div>
  <div class="ucards">${ucards}</div>
</section>`;

  w(`${gid}/${slug}/index.html`, page({
    root, grade:gid, activeHref:`${gid}/${slug}`, subject:key,
    title:`${s.name} — ${g.label} | `,
    desc:`Bilingual Class 10 notes, interactive simulations and a quiz for ${s.name}.`,
    crumb: crumb([['Home', root + 'index.html'], [g.label, '../index.html'], [label]]),
    body: overviewBody
  }));

  /* one page per unit / section */
  const order = [{ file:'index.html', title:'Overview' }].concat(PAGES);
  PAGES.forEach((p, i) => {
    const prev = order[i];               // because order is shifted by the overview entry
    const next = order[i + 2];
    let pager = '<div class="pager">';
    pager += prev
      ? `<a href="${prev.file}"><span class="lab">◂ Previous</span><span class="ttl">${prev.title}</span></a>`
      : '<span class="sp"></span>';
    pager += next
      ? `<a class="nx" href="${next.file}"><span class="lab">Next ▸</span><span class="ttl">${next.title}</span></a>`
      : `<a class="nx" href="index.html"><span class="lab">Back ▸</span><span class="ttl">Subject overview</span></a>`;
    pager += '</div>';

    /* The prerequisite block goes inside the lesson section, after its
       rule line — not before the section — so it sits under the unit
       heading it belongs to rather than above it. */
    let body = chipBar(p.file) + '\n' + p.sec.map(sectionHtml).join('\n\n');
    if (typeof p.hrs === 'number'){
      const block = prereqBlock(key + '/u' + p.n);
      if (block){
        const anchor = '<div class="rule"></div>';
        const at = body.indexOf(anchor);
        if (at < 0) throw new Error(
          key + '/' + p.file + ': no rule line to place the prerequisite block after. ' +
          'Every unit lesson opens with sec-head then <div class="rule"></div>.');
        body = body.slice(0, at + anchor.length) + '\n\n  ' + block + body.slice(at + anchor.length);
      }
    }

    if (typeof p.hrs === 'number'){
      const unitId = key + '/u' + p.n;
      for (const m of body.matchAll(/<button class="btn-ans" data-answer="([^"]+)"/g)){
        if (retrievalIndex[m[1]]) throw new Error(
          'two retrieval questions share the id "' + m[1] + '": ' +
          retrievalIndex[m[1]].unit + ' and ' + unitId +
          '. Ids are the storage key for a student\'s self-grade, so a collision ' +
          'would silently merge two questions\' history.');
        retrievalIndex[m[1]] = { unit: unitId, page: `${gid}/${slug}/${p.file}` };
      }
    }

    w(`${gid}/${slug}/${p.file}`, page({
      root, grade:gid, activeHref:`${gid}/${slug}`, subject:key,
      title:`${p.title} — ${label} | `,
      desc:`${p.title} explained in simple English with a Nepali explanation beside it.`,
      crumb: crumb([['Home', root + 'index.html'], [g.label, '../index.html'],
                    [label, 'index.html'], [p.title]]),
      body, pager,
      /* progress.js before retrieval.js: the gate records a self-grade,
         and a page that loaded the gate without somewhere to put the
         grade would silently drop it. retrieval.js degrades rather than
         throwing, which is exactly why the ordering has to be stated
         here rather than left to chance.

         wexthink.js has no such dependency — it records nothing — but it
         ships on every unit page for the same reason retrieval.js does:
         all 18 units carry at least one gated worked example, and a
         per-page list would be one more thing to forget when an author
         adds the nineteenth. */
      js: ['services/motion.js', 'code.js', 'services/progress.js',
           'retrieval.js', 'wexthink.js'].concat(p.js)
    }));
  });
});

/* ---------------- design-system reference (dev/QA only) ----------------
   Generated so a token change can be checked against every component at once.
   Deliberately NOT linked from any student-facing navigation. */
w('design-system.html', page({
  root: '', grade: null,
  title: 'Design System Reference —  (internal)',
  desc: 'Internal QA reference for the design system. Not student-facing.',
  crumb: crumb([['Home', 'index.html'], ['Design System (internal)']]),
  allSubjects: true,   /* a reference page must show every subject's components */
  body: sectionHtml('design-system'),
  js: ['code.js', 'predict.js']
}));

/* ---------------- animation showcase (dev/QA only) ----------------
   Every motion pattern on one page so timing and quality can be judged
   together. Generated by the real build with the real stylesheet, or it
   would drift. Not linked from any student-facing navigation. */
w('animation-showcase.html', page({
  root: '', grade: null,
  title: 'Animation & Motion Reference —  (internal)',
  desc: 'Internal QA reference for the motion system. Not student-facing.',
  crumb: crumb([['Home', 'index.html'], ['Animation Reference (internal)']]),
  allSubjects: true,
  body: sectionHtml('animation-showcase'),
  js: ['services/motion.js', 'code.js', 'showcase.js']
}));

/* Written after the page loop, because retrievalIndex is filled by it.
   One file carries both halves of what the revision view needs: the unit
   graph (titles, pages, prerequisites) and the question join. */
w('assets/js/learning-map.js',
  '/* GENERATED from config/pages.js and content/prerequisites.js — do not edit by hand. */\n' +
  'RevisionService.load(' +
  JSON.stringify({ units: ctx.learningMap, questions: retrievalIndex }, null, 1) + ');\n');

console.log('site written to ' + ctx.ROOT);
console.log('learning map: ' + Object.keys(ctx.learningMap).length + ' units, ' +
            Object.values(ctx.learningMap).reduce((a, u) => a + u.prereqs.length, 0) +
            ' prerequisite edges, ' + Object.keys(retrievalIndex).length + ' retrieval questions');
console.log('animated diagrams: ' + (diaAnimated.size ? [...diaAnimated].join(', ') : 'none'));
console.log('deep-authored units: ' + (deepUnits.length ? deepUnits.join(', ') : 'none'));
console.log('diagrams injected: ' + diaUsed);
if (diaMissing.length) { console.log('MISSING DIAGRAMS: ' + diaMissing.join(', ')); process.exit(1); }
