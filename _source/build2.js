/* ============================================================
   RGSC Study Board — page writer (part 2)
   ============================================================ */
const B = require('./build.js');
const DIA = require('./diagrams.js');
const fsx = require('fs');
const pathx = require('path');
const { w, baseCss, jsPart, SEC, HERO, SITE, OUTLINE, CPP_PAGES } = B;

/* ---------------------------------------------------------------
   Content pipeline.
   A unit is authored as content/<id>.html when it has been written
   to full depth; otherwise we fall back to the section extracted
   from the original single-file build. {{dia:name}} placeholders
   are replaced with inline SVG from the diagram library.
   --------------------------------------------------------------- */
let diaUsed = 0, diaMissing = [];
function injectDiagrams(html, where){
  return html.replace(/\{\{dia:([A-Za-z0-9_]+)\}\}/g, function(_, name){
    if (!DIA[name]){ diaMissing.push(where + ' → ' + name); return '<!-- missing diagram: ' + name + ' -->'; }
    diaUsed++;
    return DIA[name];
  });
}

const deepUnits = [];
function sectionHtml(id){
  const file = pathx.join(__dirname, 'content', id + '.html');
  if (fsx.existsSync(file)){
    if (deepUnits.indexOf(id) < 0) deepUnits.push(id);
    return injectDiagrams(fsx.readFileSync(file, 'utf8'), id);
  }
  return SEC[id];
}

/* ---------------- extra CSS: navbar, hamburger, cards ---------------- */
const siteCss = `

/* ============================================================
   SITE CHROME — top bar, hamburger, cards, breadcrumb
   ============================================================ */
.skip{position:absolute;left:-9999px;top:0;background:var(--yellow);color:#12241f;
  padding:10px 16px;border-radius:0 0 8px 0;z-index:100;font-weight:700}
.skip:focus{left:0}

.topbar{position:sticky;top:0;z-index:60;background:rgba(11,21,18,.94);
  backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
.topbar-in{max-width:1140px;margin:0 auto;padding:0 18px;height:58px;
  display:flex;align-items:center;gap:18px}

.brand{display:flex;align-items:center;gap:10px;text-decoration:none;flex:none}
.brand-mark{width:34px;height:34px;border-radius:9px;display:grid;place-items:center;
  font-family:var(--mono);font-weight:700;font-size:.82rem;color:#12241f;
  background:linear-gradient(150deg,var(--yellow),#e0a93f);flex:none}
.brand-txt{display:flex;flex-direction:column;line-height:1.15;color:var(--chalk-white);
  font-weight:700;font-size:.95rem;white-space:nowrap}
.brand-txt small{font-weight:400;font-size:.66rem;color:var(--chalk-faint);letter-spacing:.3px}

.desknav{display:flex;align-items:center;gap:4px;margin-left:auto}
.desknav > a,.droptop{
  font-family:var(--sans);font-size:.86rem;font-weight:600;color:var(--chalk-dim);
  text-decoration:none;padding:8px 13px;border-radius:9px;border:1px solid transparent;
  background:none;cursor:pointer;white-space:nowrap;line-height:1.4}
.desknav > a:hover,.droptop:hover{color:var(--yellow);border-color:var(--line);transform:none}
.desknav > a.on,.drop.on .droptop{color:var(--yellow);border-color:rgba(255,215,110,.45);
  background:rgba(255,215,110,.08)}
.droptop .car{font-size:.7rem;opacity:.7;margin-left:3px}
.soonchip{font-family:var(--mono);font-size:.7rem;color:var(--chalk-faint);
  border:1px dashed var(--line);border-radius:99px;padding:4px 10px;white-space:nowrap}

.drop{position:relative}
.dropmenu{position:absolute;top:calc(100% + 8px);right:0;min-width:270px;
  background:var(--board-2);border:1.5px solid var(--line);border-radius:12px;
  box-shadow:var(--shadow);padding:7px;opacity:0;visibility:hidden;transform:translateY(-6px);
  transition:.16s;z-index:70}
.drop:hover .dropmenu,.drop:focus-within .dropmenu{opacity:1;visibility:visible;transform:none}
.dropmenu a{display:block;text-decoration:none;color:var(--chalk-white);font-size:.86rem;
  padding:8px 11px;border-radius:8px;line-height:1.35}
.dropmenu a:hover{background:rgba(127,209,255,.1);color:var(--blue)}
.dropmenu a.all{color:var(--yellow);font-weight:600;border-bottom:1px dashed var(--line);
  border-radius:8px 8px 0 0;margin-bottom:4px;padding-bottom:9px}
.dropmenu a small{display:block;font-family:var(--deva);color:var(--chalk-faint);font-size:.72rem}
.dropmenu a .dn{font-family:var(--mono);font-size:.64rem;color:var(--green);letter-spacing:.6px}

.hamburger{display:none;margin-left:auto;width:42px;height:38px;padding:0;
  background:none;border:1.5px solid var(--line);border-radius:10px;position:relative}
.hamburger span{position:absolute;left:11px;width:18px;height:2px;background:var(--yellow);
  border-radius:2px;transition:.22s}
.hamburger span:nth-child(1){top:12px}
.hamburger span:nth-child(2){top:18px}
.hamburger span:nth-child(3){top:24px}
.hamburger.is-open span:nth-child(1){top:18px;transform:rotate(45deg)}
.hamburger.is-open span:nth-child(2){opacity:0}
.hamburger.is-open span:nth-child(3){top:18px;transform:rotate(-45deg)}

.mobilepanel{position:fixed;inset:58px 0 0;z-index:55;background:var(--bg);
  overflow-y:auto;padding:18px 18px 60px;display:none}
.mobilepanel.open{display:block;animation:fade .2s ease both}
.mobilepanel h4{font-family:var(--mono);font-size:.72rem;letter-spacing:1.6px;
  text-transform:uppercase;color:var(--coral);margin:20px 0 8px}
.mobilepanel h4:first-child{margin-top:4px}
.mobilepanel a{display:block;text-decoration:none;color:var(--chalk-white);font-size:.98rem;
  padding:12px 14px;border:1.5px solid var(--line);border-radius:11px;margin-bottom:8px;
  background:var(--panel)}
.mobilepanel a small{display:block;font-family:var(--deva);color:var(--chalk-faint);font-size:.78rem}
.mobilepanel a.on{border-color:rgba(255,215,110,.5);color:var(--yellow)}
.mobilepanel .dis{opacity:.45;border-style:dashed;background:none}

@media (max-width:940px){
  .desknav{display:none}
  .hamburger{display:block}
  .brand-txt small{display:none}
}

/* ---------------- breadcrumb + page head ---------------- */
.crumb{display:flex;gap:8px;flex-wrap:wrap;align-items:center;font-family:var(--mono);
  font-size:.74rem;color:var(--chalk-faint);margin:20px 0 0}
.crumb a{color:var(--chalk-dim);text-decoration:none}
.crumb a:hover{color:var(--yellow)}
.crumb .sep{opacity:.5}

.pagehead{margin:16px 0 0;border:1.5px solid var(--line);border-radius:18px;
  background:linear-gradient(165deg,#1a322b,#122421);padding:24px 26px;box-shadow:var(--shadow)}
.pagehead .eyebrow{font-family:var(--mono);font-size:.72rem;letter-spacing:2px;
  color:var(--coral);text-transform:uppercase}
.pagehead h1{font-size:1.85rem;margin:.3em 0 .2em}
.pagehead .np-line{font-family:var(--deva);color:#f6ecd2;
  border-left:3px dashed rgba(255,215,110,.5);padding-left:12px;margin-top:8px;max-width:70ch}
.pagehead .meta{margin-top:14px;display:flex;gap:8px;flex-wrap:wrap}

/* ---------------- cards ---------------- */
.gcards{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:16px;margin:22px 0}
.gcard{display:block;text-decoration:none;background:var(--panel);border:1.5px solid var(--line);
  border-radius:16px;padding:20px 22px;transition:.16s;color:var(--chalk-white)}
.gcard:hover{border-color:var(--yellow);transform:translateY(-3px);box-shadow:var(--shadow)}
.gcard .num{font-family:var(--mono);font-size:2.1rem;font-weight:700;color:var(--yellow);line-height:1}
.gcard h3{margin:10px 0 4px;font-size:1.15rem;color:var(--chalk-white)}
.gcard .np-cell{display:block;font-family:var(--deva);color:#e7d9b4;font-size:.9rem}
.gcard p{margin:10px 0 0;font-size:.86rem;color:var(--chalk-dim)}
.gcard.dis{opacity:.5;border-style:dashed;pointer-events:none;background:none}

.scards{display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:16px;margin:22px 0}
.scard{display:block;text-decoration:none;background:var(--panel);border:1.5px solid var(--line);
  border-radius:16px;padding:18px 20px;transition:.16s;color:var(--chalk-white);position:relative}
.scard:hover{border-color:var(--blue);transform:translateY(-3px);box-shadow:var(--shadow)}
.scard .idx{font-family:var(--mono);font-size:.72rem;color:var(--chalk-faint);letter-spacing:1.4px}
.scard h3{margin:6px 0 4px;font-size:1.05rem;color:var(--chalk-white);line-height:1.35}
.scard .np-cell{display:block;font-family:var(--deva);color:#e7d9b4;font-size:.88rem;margin-top:2px}
.scard .foot{margin-top:12px;display:flex;gap:7px;flex-wrap:wrap;align-items:center}

.ucards{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px;margin:18px 0}
.ucard{display:block;text-decoration:none;background:var(--board-2);border:1.5px solid var(--line);
  border-radius:13px;padding:15px 17px;transition:.16s;color:var(--chalk-white)}
.ucard:hover{border-color:var(--yellow);transform:translateY(-2px)}
.ucard .top{display:flex;align-items:center;gap:11px}
.ucard .badge{flex:none;width:34px;height:34px;border-radius:9px;display:grid;place-items:center;
  font-family:var(--mono);font-weight:700;font-size:.9rem;color:var(--yellow);
  background:linear-gradient(160deg,#25453c,#1a322c);border:1px solid var(--line)}
.ucard h4{margin:0;font-size:.99rem;color:var(--chalk-white);line-height:1.3}
.ucard .np-cell{display:block;font-family:var(--deva);color:#e7d9b4;font-size:.85rem;margin-top:8px}
.ucard .hrs{font-family:var(--mono);font-size:.68rem;color:var(--chalk-faint);margin-top:8px;display:block}

.status{font-family:var(--mono);font-size:.64rem;letter-spacing:.9px;text-transform:uppercase;
  padding:3px 9px;border-radius:99px;border:1px solid;white-space:nowrap}
.status.done{color:var(--green);border-color:rgba(154,230,160,.5);background:rgba(154,230,160,.08)}
.status.out{color:var(--blue);border-color:rgba(127,209,255,.45);background:rgba(127,209,255,.07)}
.status.soon{color:var(--chalk-faint);border-color:var(--line);border-style:dashed}

/* ---------------- syllabus outline list ---------------- */
.outline{background:var(--panel);border:1.5px solid var(--line);border-radius:14px;
  padding:16px 20px;margin:14px 0}
.outline .oh{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.outline .badge{flex:none;width:34px;height:34px;border-radius:9px;display:grid;place-items:center;
  font-family:var(--mono);font-weight:700;color:var(--yellow);
  background:linear-gradient(160deg,#25453c,#1a322c);border:1px solid var(--line)}
.outline h3{margin:0;font-size:1.08rem;color:var(--chalk-white)}
.outline .np-cell{display:block;font-family:var(--deva);color:#e7d9b4;font-size:.88rem}
.outline ul{margin:12px 0 0;padding-left:20px}
.outline li{margin:.34em 0;font-size:.92rem;color:var(--chalk-white)}
.outline li::marker{color:var(--blue)}

/* ---------------- prev / next pager ---------------- */
.pager{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:40px 0 0}
.pager a{display:block;text-decoration:none;background:var(--panel);border:1.5px solid var(--line);
  border-radius:13px;padding:14px 18px;color:var(--chalk-white);transition:.16s}
.pager a:hover{border-color:var(--yellow)}
.pager .lab{font-family:var(--mono);font-size:.68rem;letter-spacing:1.4px;color:var(--chalk-faint);
  text-transform:uppercase}
.pager .ttl{display:block;margin-top:4px;font-weight:600;font-size:.95rem}
.pager .nx{text-align:right}
.pager .sp{visibility:hidden}
@media (max-width:640px){.pager{grid-template-columns:1fr}.pager .sp{display:none}}

/* in-subject chip bar sits below the sticky top bar */
.nav{top:58px}

/* ============================================================
   LESSON COMPONENTS — figures, worked examples, exam boxes
   ============================================================ */

/* ---- headings inside a unit ---- */
h3.topic{
  font-size:1.32rem;color:var(--yellow);margin:46px 0 6px;padding-top:16px;
  border-top:1px solid var(--line-soft);scroll-margin-top:74px}
h4.sub{font-size:1.06rem;color:var(--blue);margin:30px 0 8px;scroll-margin-top:74px}
.lead-sub{color:var(--chalk-dim);font-size:.92rem;margin:0 0 12px}

/* ---- learning outcomes ---- */
.outcomes{
  border:1.5px solid rgba(154,230,160,.4);background:rgba(154,230,160,.06);
  border-radius:14px;padding:16px 22px;margin:18px 0}
.outcomes h4{margin:0 0 8px;color:var(--green);font-size:.98rem}
.outcomes ol{margin:0;padding-left:20px}
.outcomes li{margin:.3em 0;font-size:.93rem}
.outcomes li::marker{color:var(--green);font-family:var(--mono)}
.outcomes .np-cell{display:block;font-family:var(--deva);color:#dcefdc;font-size:.9rem;
  margin-top:12px;border-top:1px dashed rgba(154,230,160,.35);padding-top:10px}

/* ---- figures ---- */
.fig{
  background:#0b1613;border:1.5px solid var(--line);border-radius:16px;
  padding:18px 18px 6px;margin:20px 0;overflow-x:auto}
.fig svg{width:100%;min-width:520px;height:auto;display:block}
.fig figcaption{
  margin:12px 0 12px;padding-top:11px;border-top:1px dashed var(--line);
  color:var(--chalk-dim);font-size:.87rem;text-align:center}
.fig figcaption .np-cell{
  display:block;font-family:var(--deva);color:#e7d9b4;font-size:.85rem;margin-top:5px}

/* svg building blocks — shared by every diagram */
.fig svg text{font-family:var(--mono)}
.f-box{fill:rgba(127,209,255,.10);stroke:#7fd1ff;stroke-width:1.6}
.f-box-y{fill:rgba(255,215,110,.12);stroke:#ffd76e;stroke-width:1.6}
.f-box-c{fill:rgba(255,143,122,.12);stroke:#ff8f7a;stroke-width:1.6}
.f-box-g{fill:rgba(154,230,160,.12);stroke:#9ae6a0;stroke-width:1.6}
.f-box-d{fill:none;stroke:#4c7368;stroke-width:1.4;stroke-dasharray:5 4}
.f-val{fill:#eef5f2;font-size:16px;font-weight:700;text-anchor:middle}
.f-lbl{fill:#a1b8b1;font-size:11px;text-anchor:middle}
.f-lbl-y{fill:#ffd76e;font-size:11px;text-anchor:middle}
.f-addr{fill:#5f7a73;font-size:10px;text-anchor:middle}
.f-code{fill:#7fd1ff;font-size:13px}
.f-ln{stroke:#5c8579;stroke-width:1.5;fill:none}
.f-arr{stroke:#ffd76e;stroke-width:1.8;fill:none}
.f-ttl{fill:#ffd76e;font-size:12px;font-weight:700}

/* ---- worked example ---- */
.wex{border:1.5px solid var(--line);border-radius:14px;background:var(--panel);
  padding:16px 20px;margin:20px 0}
.wex-h{display:flex;align-items:center;gap:11px;font-weight:600;font-size:1rem;
  color:var(--chalk-white);margin-bottom:4px;flex-wrap:wrap}
.wex-n{font-family:var(--mono);font-size:.66rem;letter-spacing:1.2px;text-transform:uppercase;
  color:#12241f;background:var(--yellow);padding:3px 9px;border-radius:99px;flex:none}
.wex-out{margin-top:4px}
.wex-lbl{font-family:var(--mono);font-size:.66rem;letter-spacing:1.4px;text-transform:uppercase;
  color:var(--green);display:block;margin-bottom:5px}
pre.out{
  background:#08110f;border:1.5px solid var(--line);border-left:4px solid var(--green);
  border-radius:10px;font-family:var(--mono);font-size:.85rem;line-height:1.7;
  color:var(--green);padding:12px 15px;margin:0;overflow-x:auto;white-space:pre}
.wex-note{font-size:.9rem;color:var(--chalk-dim);margin:12px 0 0}
.wex-note .np-cell{display:block;font-family:var(--deva);color:#e7d9b4;margin-top:5px}
.code.nonum .ln .n{display:none}

/* ---- common-mistake callout ---- */
.mistake{
  border:1.5px solid rgba(255,143,122,.5);background:rgba(255,143,122,.08);
  border-left:5px solid var(--coral);border-radius:0 12px 12px 0;padding:13px 18px;margin:18px 0;
  font-size:.93rem}
.mistake .h{color:var(--coral);font-weight:700;font-size:.88rem;letter-spacing:.4px;margin-bottom:4px}
.mistake .np-cell{display:block;font-family:var(--deva);color:#f7e0d8;margin-top:7px;font-size:.9rem}

/* analogy variant of the standard callout */
.callout.an{border-color:rgba(127,209,255,.45);background:rgba(127,209,255,.07)}
.callout.an .h{color:var(--blue)}
.callout p{margin:0 0 .6em}
.callout p:last-of-type{margin-bottom:0}

/* ---- exam question + hidden model answer ---- */
.examq{border:1.5px solid var(--line);border-radius:13px;background:var(--board-2);
  padding:14px 18px;margin:14px 0}
.examq .q-h{font-weight:600;font-size:.97rem;color:var(--chalk-white);
  display:flex;gap:10px;justify-content:space-between;align-items:baseline;flex-wrap:wrap}
.examq .mk{font-family:var(--mono);font-size:.7rem;color:var(--coral);flex:none}
.btn-ans{margin-top:11px;font-size:.82rem;padding:6px 13px;
  border-color:rgba(127,209,255,.45);color:var(--blue)}
.examq .ans{display:none;margin-top:12px;padding:12px 15px;border-radius:10px;
  background:rgba(255,215,110,.06);border-left:3px solid var(--yellow);font-size:.92rem}
.examq .ans.show{display:block;animation:fade .22s ease both}
.examq .ans .np-cell{display:block;font-family:var(--deva);color:#f6ecd2;margin-top:8px;
  padding-top:8px;border-top:1px dashed rgba(255,215,110,.3);font-size:.89rem}

/* ---- key points recap ---- */
.keypoints{
  border:2px dashed rgba(255,215,110,.45);border-radius:16px;
  background:rgba(255,215,110,.05);padding:18px 24px;margin:36px 0 0}
.keypoints h4{margin:0 0 10px;color:var(--yellow);font-size:1.02rem}
.keypoints ul{margin:0;padding-left:20px}
.keypoints li{margin:.36em 0;font-size:.93rem}
.keypoints li::marker{color:var(--yellow)}
.keypoints .np-cell{display:block;font-family:var(--deva);color:#f6ecd2;font-size:.89rem;
  margin-top:12px;border-top:1px dashed rgba(255,215,110,.3);padding-top:9px}

/* ---- print: students print these notes ---- */
@media print{
  .topbar,.mobilepanel,.nav,.pager,.btns,.skip,.btn-ans{display:none !important}
  body{background:#fff;color:#000}
  .en,.np,.fig,.wex,.examq,.keypoints,.outcomes,.tablewrap{
    break-inside:avoid;page-break-inside:avoid}
  .examq .ans{display:block !important}
}
`;

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
    h += `<h4>${g.label} · ${g.np}</h4>`;
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

function page(o){
  const root = o.root;
  const js = (o.js || []).map(f => `<script src="${root}assets/js/${f}"></script>`).join('\n');
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${o.title}</title>
<meta name="description" content="${o.desc || ''}">
<link rel="icon" href="${FAVICON}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Noto+Sans:wght@400;600;700&family=Noto+Sans+Devanagari:wght@400;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${root}assets/css/style.css">
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
    <button class="hamburger" id="hamBtn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobilePanel">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>
${mobileNav(root, o.grade, o.activeHref)}

<div class="wrap">
${o.crumb ? `<nav class="crumb" aria-label="Breadcrumb">${o.crumb}</nav>` : ''}
<main id="main">
${o.body}
</main>
${o.pager || ''}
<footer>
  <b style="color:var(--chalk-dim)">RGSC Study Board</b> — Secondary Level (Technical &amp; Vocational),
  Computer Engineering, Curriculum Development Centre Nepal, 2078.<br>
  Works fully offline. No login, no server, no internet needed (web fonts are optional).
  <span class="np-cell">इन्टरनेट नभए पनि पूरै चल्छ। लगइन चाहिँदैन।</span>
</footer>
</div>
<script src="${root}assets/js/nav.js"></script>
${js}
</body>
</html>
`;
}

function crumb(parts){
  return parts.map((p, i) => {
    const last = i === parts.length - 1;
    const sep = i ? '<span class="sep">/</span> ' : '';
    return sep + (last || !p[1] ? `<span>${p[0]}</span>` : `<a href="${p[1]}">${p[0]}</a>`);
  }).join(' ');
}

/* ---------------- assets ---------------- */
w('assets/css/style.css', baseCss + siteCss);

w('assets/js/nav.js', `/* RGSC Study Board — top bar behaviour */
(function(){
  var btn = document.getElementById('hamBtn');
  var panel = document.getElementById('mobilePanel');
  if (!btn || !panel) return;
  function close(){
    panel.classList.remove('open');
    btn.classList.remove('is-open');
    btn.setAttribute('aria-expanded','false');
    document.body.style.overflow='';
  }
  btn.addEventListener('click', function(){
    var open = !panel.classList.contains('open');
    panel.classList.toggle('open', open);
    btn.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  });
  panel.addEventListener('click', function(e){ if (e.target.closest('a')) close(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') close(); });
  window.addEventListener('resize', function(){ if (window.innerWidth > 940) close(); });
})();
`);

w('assets/js/code.js',           jsPart['1'] + '\n' +
                                 fsx.readFileSync(pathx.join(__dirname, 'enhance.js'), 'utf8'));
w('assets/js/snippets.js',       jsPart['2']);
w('assets/js/sim-stackqueue.js', jsPart['3'] + '\n' + jsPart['3b']);
w('assets/js/sim-dispatch.js',   jsPart['4']);
w('assets/js/trace.js',          jsPart['5']);
w('assets/js/quiz.js',           jsPart['6']);

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

/* ---------------- the finished C++ subject ---------------- */
(function(){
  const root = '../../';
  const gid = 'grade10', slug = 'oop-cpp';
  const g = SITE.find(x => x.id === gid);
  const s = g.subjects.find(x => x.slug === slug);

  function chipBar(current){
    let h = '<nav class="nav" style="margin-top:0">';
    h += `<a href="index.html"${current === 'index' ? ' style="color:var(--yellow);border-color:var(--yellow)"' : ''}>Overview</a>`;
    CPP_PAGES.forEach(p => {
      const on = current === p.file;
      h += `<a href="${p.file}"${on ? ' style="color:var(--yellow);border-color:var(--yellow)"' : ''}>${p.n} · ${
        p.file.startsWith('unit') ? p.title.replace('Concept of OOP using C++','OOP + C++')
                                          .replace('Basic Introduction to Data Structure','Data Structure')
                                          .replace('Abstraction and Encapsulation','Abstraction / Encapsulation')
              : p.title.replace('Trace a Full Program','Trace a Program')
                       .replace('Comparison Tables & Exam Terms','Tables & Terms')
                       .replace('Self-Check Quiz','Quiz')}</a>`;
    });
    h += '</nav>';
    return h;
  }

  /* subject overview */
  let ucards = '';
  CPP_PAGES.forEach(p => {
    ucards += `<a class="ucard" href="${p.file}">
      <div class="top"><div class="badge">${p.n}</div><h4>${p.title}</h4></div>
      <span class="np-cell">${p.np}</span>
      <span class="hrs">${p.hrs ? p.hrs + ' hrs · ' + p.marks + ' marks' : 'practice &amp; revision'}</span></a>`;
  });

  const overviewBody = `
${HERO}

<section style="margin-top:34px">
  <div class="sec-head"><div class="sec-num">≡</div>
    <div><h2>Units and sections</h2><p class="sec-sub">युनिट र सेक्सनहरू</p></div>
    <span class="marks">6 units · 64 hrs · 50 marks</span></div>
  <div class="rule"></div>
  <div class="ucards">${ucards}</div>
</section>`;

  w(`${gid}/${slug}/index.html`, page({
    root, grade:gid, activeHref:`${gid}/${slug}`,
    title:`${s.name} — ${g.label} | RGSC Study Board`,
    desc:'Bilingual Class 10 notes, simulators, program tracer and quiz for Data Structure and OOP using C++.',
    crumb: crumb([['Home', root + 'index.html'], [g.label, '../index.html'], ['DS &amp; OOP with C++']]),
    body: overviewBody
  }));

  /* one page per unit / section */
  const order = [{ file:'index.html', title:'Overview' }].concat(CPP_PAGES);
  CPP_PAGES.forEach((p, i) => {
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

    const body = chipBar(p.file) + '\n' + p.sec.map(sectionHtml).join('\n\n');

    w(`${gid}/${slug}/${p.file}`, page({
      root, grade:gid, activeHref:`${gid}/${slug}`,
      title:`${p.title} — DS &amp; OOP with C++ | RGSC Study Board`,
      desc:`${p.title} explained in simple English with a Nepali explanation beside it.`,
      crumb: crumb([['Home', root + 'index.html'], [g.label, '../index.html'],
                    ['DS &amp; OOP with C++', 'index.html'], [p.title]]),
      body, pager,
      js: ['code.js'].concat(p.js)
    }));
  });
})();

console.log('site written to ' + B.OUT);
console.log('deep-authored units: ' + (deepUnits.length ? deepUnits.join(', ') : 'none'));
console.log('diagrams injected: ' + diaUsed);
if (diaMissing.length) { console.log('MISSING DIAGRAMS: ' + diaMissing.join(', ')); process.exit(1); }
