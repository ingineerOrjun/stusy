/* ============================================================
   RGSC Study Board — page writer.
   Assembles every page from content, design and runtime sources.
   ============================================================ */
const ctx = require('./context.js');
const DIA = require('../diagrams.js');
const validate = require('./validate.js');

const w         = ctx.write;
const baseCss   = ctx.css;
const SITE      = ctx.site;
const OUTLINE   = ctx.syllabus;
const AUTHORED  = ctx.pages;   /* subject key -> { hero, pages[] } */

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
      h += `<a href="${root}${g.id}/${s.slug}/index.html">${s.short}` +
           (s.done ? ' <span class="dn">· notes ready</span>' : '') +
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
      h += `<a href="${href}"${activeHref === `${g.id}/${s.slug}` ? ' class="on"' : ''}>${s.short}` +
           (s.done ? ' ✓' : '') + `<small>${s.np}</small></a>`;
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
      <span class="brand-mark">RG</span>
      <span class="brand-txt">RGSC Study Board<small>Computer Engineering · CDC Nepal 2078</small></span>
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
${normaliseHeadings(o.body)}
</main>
${o.pager || ''}
<footer>
  <b style="color:var(--chalk-dim)">RGSC Study Board</b> — Secondary Level (Technical &amp; Vocational),
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

w('assets/js/question-bank.js',
  '/* GENERATED from _source/content/questions — do not edit by hand. */\n' +
  Object.entries(ctx.questionBanks).map(([subject, qs]) =>
    'QuizService.registerBank(' + JSON.stringify(subject) + ', ' +
    JSON.stringify(qs, null, 2) + ');'
  ).join('\n\n') + '\n');

/* ---------------- home ---------------- */
(function(){
  let cards = '';
  SITE.forEach(g => {
    const soon = g.status === 'soon';
    const n = g.id.replace('grade','');
    cards += soon
      ? `<div class="gcard dis"><div class="num">${n}</div><h3>${g.label}<span class="np-cell">${g.np}</span></h3>
         <p><span class="status soon">next phase</span></p></div>`
      : `<a class="gcard" href="${g.id}/index.html"><div class="num">${n}</div>
         <h3>${g.label}<span class="np-cell">${g.np}</span></h3>
         <p>${g.subjects.length} subjects · 4 credit hrs each · 128 working hrs</p></a>`;
  });

  const body = `
<div class="pagehead">
  <div class="eyebrow">Secondary Level · Technical &amp; Vocational Stream</div>
  <h1>Computer Engineering <span style="color:var(--yellow)">Study Board</span></h1>
  <p class="lead">Learn and revise every subject of the Computer Engineering curriculum.
  Each topic is explained in <b>simple English first</b> — the exact wording the exam uses —
  with a <b>Nepali explanation beside it</b>, so you can match your Nepali understanding to the
  English exam terms.</p>
  <p class="np-line">कम्प्युटर इन्जिनियरिङका हरेक विषय सिक्नुहोस् र दोहोर्‍याउनुहोस्।
  हरेक कुरा पहिले <b>सजिलो अंग्रेजीमा</b> — जुन शब्द परीक्षामै आउँछ — अनि छेउमै
  <b>नेपालीमा</b> पनि। यसले नेपाली बुझाइलाई अंग्रेजी शब्दसँग जोड्न सजिलो बनाउँछ।</p>
  <div class="meta">
    <span class="pill y">Bilingual</span>
    <span class="pill b">Interactive simulators</span>
    <span class="pill c">Program tracing</span>
    <span class="pill">Works offline</span>
  </div>
</div>

<section style="margin-top:34px">
  <div class="sec-head"><div class="sec-num">›</div>
    <div><h2>Choose your grade</h2><p class="sec-sub">आफ्नो कक्षा छान्नुहोस्</p></div></div>
  <div class="rule"></div>
  <div class="gcards">${cards}</div>
</section>

<div class="pair">
  <div class="en"><span class="tag">What is ready right now</span>
    <p><b>Grade 10 — Data Structure &amp; OOP using C++</b> is complete: all 6 units, two
    interactive simulators, a step-by-step program tracer, comparison tables and a 15-question quiz.</p>
    <p>Every other subject currently shows its <b>full syllabus outline</b> taken from the CDC
    curriculum, so you can see exactly what you must study. Notes for those are being written next.</p>
  </div>
  <div class="np"><span class="tag">अहिले के तयार छ</span>
    <p><b>कक्षा १० — डाटा स्ट्रक्चर र OOP (C++)</b> पूरै तयार छ: सबै ६ युनिट, दुई इन्टरएक्टिभ
    सिमुलेटर, लाइन–लाइन प्रोग्राम ट्रेसर, तुलनात्मक तालिका र १५ प्रश्नको क्विज।</p>
    <p>अरू सबै विषयमा अहिले CDC पाठ्यक्रमबाट लिइएको <b>पूरा सिलेबस रूपरेखा</b> देखिन्छ, ताकि के–के
    पढ्नुपर्छ थाहा होस्। तिनका नोट्स क्रमशः लेखिँदैछन्।</p>
  </div>
</div>`;

  w('index.html', page({
    root:'', grade:'home',
    title:'RGSC Study Board — Computer Engineering, Grade 9 to 12',
    desc:'Bilingual (English + Nepali) study and revision site for the Nepal CDC Computer Engineering curriculum.',
    body
  }));
})();

/* ---------------- grade index pages ---------------- */
SITE.filter(g => g.status === 'open').forEach(g => {
  let cards = '';
  g.subjects.forEach((s, i) => {
    const key = g.id + '/' + s.slug;
    const units = s.done ? 6 : (OUTLINE[key] ? OUTLINE[key].length : 0);
    cards += `<a class="scard" href="${s.slug}/index.html">
      <div class="idx">SUBJECT ${i + 1}</div>
      <h3>${s.name}<span class="np-cell">${s.np}</span></h3>
      <div class="foot">
        <span class="status ${s.done ? 'done' : 'out'}">${s.done ? 'notes ready' : 'syllabus outline'}</span>
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
    title:`${g.label} — Computer Engineering | RGSC Study Board`,
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
    title:`${s.name} — ${g.label} | RGSC Study Board`,
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
    title:`${s.name} — ${g.label} | RGSC Study Board`,
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
      title:`${p.title} — ${label} | RGSC Study Board`,
      desc:`${p.title} explained in simple English with a Nepali explanation beside it.`,
      crumb: crumb([['Home', root + 'index.html'], [g.label, '../index.html'],
                    [label, 'index.html'], [p.title]]),
      body, pager,
      /* progress.js before retrieval.js: the gate records a self-grade,
         and a page that loaded the gate without somewhere to put the
         grade would silently drop it. retrieval.js degrades rather than
         throwing, which is exactly why the ordering has to be stated
         here rather than left to chance. */
      js: ['services/motion.js', 'code.js', 'services/progress.js', 'retrieval.js'].concat(p.js)
    }));
  });
});

/* ---------------- design-system reference (dev/QA only) ----------------
   Generated so a token change can be checked against every component at once.
   Deliberately NOT linked from any student-facing navigation. */
w('design-system.html', page({
  root: '', grade: null,
  title: 'Design System Reference — RGSC Study Board (internal)',
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
  title: 'Animation & Motion Reference — RGSC Study Board (internal)',
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
