/* ============================================================
   CONTENT VALIDATION — the build's integrity gate.

   Runs before a single page is written. Collects every violation and
   throws once with the full list, so a content author fixes everything
   in one pass instead of rebuilding after each error.

   This exists because the platform is heading for 60+ pages and hundreds
   of units. At that size a silently missing Nepali field or a duplicate
   slug is not noticed until a student hits the page.
   ============================================================ */
const fs = require('fs');
const path = require('path');

const GRADE_ID = /^grade(9|10|11|12)$/;
const SLUG     = /^[a-z0-9]+(-[a-z0-9]+)*$/;

module.exports = function validate({ site, syllabus, pages, diagrams, ctx }){
  const errors = [];
  const warn = [];
  const E = (where, msg) => errors.push(`${where}: ${msg}`);
  const W = (where, msg) => warn.push(`${where}: ${msg}`);

  /* ---------- 1. site map ---------- */
  if (!Array.isArray(site) || !site.length) E('site', 'must be a non-empty array');

  const seenGrade = new Set();
  const subjectKeys = new Set();

  site.forEach((g, i) => {
    const at = `site[${i}]`;
    if (!GRADE_ID.test(g.id || '')) E(at, `id "${g.id}" must match grade9|grade10|grade11|grade12`);
    if (seenGrade.has(g.id)) E(at, `duplicate grade id "${g.id}"`);
    seenGrade.add(g.id);

    if (!g.label) E(at, 'missing label (English)');
    if (!g.np)    E(at, `missing Nepali label for "${g.label || g.id}"`);
    if (!['open', 'soon'].includes(g.status)) E(at, `status "${g.status}" must be "open" or "soon"`);
    if (!Array.isArray(g.subjects)) { E(at, 'subjects must be an array'); return; }
    if (g.status === 'open' && !g.subjects.length) E(at, 'an open grade must have at least one subject');

    const seenSlug = new Set();
    g.subjects.forEach((s, j) => {
      const sat = `${at}.subjects[${j}]`;
      if (!SLUG.test(s.slug || '')) E(sat, `slug "${s.slug}" must be lower-case kebab-case`);
      if (seenSlug.has(s.slug)) E(sat, `duplicate slug "${s.slug}" within ${g.id}`);
      seenSlug.add(s.slug);
      subjectKeys.add(`${g.id}/${s.slug}`);

      if (!s.name)  E(sat, 'missing name (English)');
      if (!s.short) E(sat, 'missing short name (used in navigation)');
      if (!s.np)    E(sat, `missing Nepali name for "${s.name || s.slug}"`);
    });
  });

  /* ---------- 2. syllabus outlines ---------- */
  const HOURS_PER_SUBJECT = 64;   // fixed by the CDC curriculum
  const MARKS_PER_SUBJECT = 50;   // written external exam, per the specification grid
  Object.keys(syllabus || {}).forEach(key => {
    const units = syllabus[key];
    if (!subjectKeys.has(key)) {
      E(`syllabus["${key}"]`, 'no matching subject in the site map');
      return;
    }
    if (!Array.isArray(units) || !units.length) {
      E(`syllabus["${key}"]`, 'must be a non-empty array of units');
      return;
    }
    let hours = 0;
    const seenTitle = new Set();
    units.forEach((u, i) => {
      const at = `syllabus["${key}"][${i}]`;
      if (!u.t)  E(at, 'missing unit title (English)');
      if (!u.np) E(at, `missing Nepali title for "${u.t || i}"`);
      if (typeof u.h !== 'number' || u.h <= 0) E(at, `hours must be a positive number, got ${u.h}`);
      else hours += u.h;
      if (!Array.isArray(u.c) || !u.c.length) E(at, 'must list at least one topic');
      if (seenTitle.has(u.t)) E(at, `duplicate unit title "${u.t}"`);
      seenTitle.add(u.t);
    });
    if (hours !== HOURS_PER_SUBJECT) {
      E(`syllabus["${key}"]`, `hours total ${hours}, curriculum requires ${HOURS_PER_SUBJECT}`);
    }
  });

  /* every open subject should have either authored pages or an outline */
  subjectKeys.forEach(key => {
    const authored = !!(pages && pages[key]);
    if (!authored && !syllabus[key]) W(`subject "${key}"`, 'has neither authored pages nor a syllabus outline');
  });

  /* ---------- 3. page maps ----------
     One map per authored subject, keyed by the same `<grade>/<slug>` id
     the site map and the question banks use. Filenames only have to be
     unique within a subject — every subject has its own directory. */
  Object.entries(pages || {}).forEach(([key, subject]) => {
    if (!subjectKeys.has(key)){
      E(`pages["${key}"]`, 'is not a subject in the site map');
      return;
    }
    if (!subject || !Array.isArray(subject.pages) || !subject.pages.length){
      E(`pages["${key}"]`, 'must have a non-empty pages array');
      return;
    }
    if (!subject.hero) E(`pages["${key}"]`, 'missing hero section id for the subject overview');
    else {
      try { ctx.section(subject.hero); }
      catch (e) { E(`pages["${key}"].hero`, e.message); }
    }

    const seenFile = new Set();
    subject.pages.forEach((p, i) => {
      const at = `pages["${key}"][${i}]`;
      if (!/^[a-z0-9-]+\.html$/.test(p.file || '')) E(at, `file "${p.file}" is not a safe page filename`);
      if (seenFile.has(p.file)) E(at, `duplicate page file "${p.file}"`);
      seenFile.add(p.file);
      if (!p.title) E(at, 'missing title (English)');
      if (!p.np)    E(at, `missing Nepali title for "${p.title || p.file}"`);
      if (!Array.isArray(p.sec) || !p.sec.length) { E(at, 'must reference at least one content section'); return; }

      p.sec.forEach(id => {
        try { ctx.section(id); }
        catch (e) { E(at, e.message); }
      });

      (p.js || []).forEach(f => {
        /* The generated banks are content compiled into a list of
           register() calls, so they are not in RUNTIME_PUBLISHED and
           still have to be nameable from a page. Kept as an explicit
           list rather than a pattern, so a typo in a page's js array is
           still caught — which is the whole point of this check. */
        const GENERATED = ['question-bank.js', 'practice-bank.js', 'diagram-data.js',
                           'learning-map.js'];
        const published = Object.values(ctx.RUNTIME_PUBLISHED).concat(GENERATED);
        if (!published.includes(f)) E(at, `references runtime module "${f}" which the build does not publish`);
      });
    });

    /* A unit page claiming hours and marks is claiming to implement the
       syllabus. Check it against the outline rather than trusting it —
       a mistyped mark weight silently misleads a student about what to
       revise hardest. */
    const outline = syllabus[key];
    if (outline){
      const unitPages = subject.pages.filter(p => typeof p.hrs === 'number');
      const hrs = unitPages.reduce((a, p) => a + p.hrs, 0);
      const marks = subject.pages.reduce((a, p) => a + (p.marks || 0), 0);
      const outlineHrs = outline.reduce((a, u) => a + u.h, 0);

      if (unitPages.length > outline.length){
        E(`pages["${key}"]`, `has ${unitPages.length} unit pages for only ${outline.length} syllabus units`);
      } else if (unitPages.length < outline.length){
        /* A subject under construction is a legitimate state; silently
           shipping it as if it were finished is not. */
        W(`pages["${key}"]`, `${unitPages.length} of ${outline.length} syllabus units authored — ` +
          `the subject is incomplete`);
      } else {
        if (hrs !== outlineHrs){
          E(`pages["${key}"]`, `unit pages total ${hrs} hrs but the syllabus outline totals ${outlineHrs}`);
        }
        if (marks !== MARKS_PER_SUBJECT){
          E(`pages["${key}"]`, `unit marks total ${marks}, the specification grid gives ${MARKS_PER_SUBJECT}`);
        }
      }
    }
  });

  /* ---------- 4. diagrams ---------- */
  const defined = new Set(Object.keys(diagrams || {}));
  const used = new Set();
  const lessonDir = path.join(ctx.SRC, 'content', 'lessons');
  if (fs.existsSync(lessonDir)){
    for (const f of fs.readdirSync(lessonDir)){
      if (!f.endsWith('.html')) continue;
      const html = fs.readFileSync(path.join(lessonDir, f), 'utf8');
      for (const m of html.matchAll(/\{\{dia:([A-Za-z0-9_]+)\}\}/g)){
        used.add(m[1]);
        if (!defined.has(m[1])) E(`content/lessons/${f}`, `references unknown diagram "${m[1]}"`);
      }
    }
  }
  defined.forEach(d => { if (!used.has(d)) W('diagrams', `"${d}" is defined but never used`); });

  /* ---------- 4c. animated diagram configuration ----------
     A step that targets a selector the SVG does not contain does nothing
     at all, silently. That is the failure mode this catches. */
  Object.keys(diagrams || {}).forEach(name => {
    const d = diagrams[name];
    if (typeof d === 'string') return;                    // static figure
    const at = `diagram "${name}"`;

    if (d.type !== 'animated') E(at, `unknown visualization type "${d.type}"`);
    if (typeof d.svg !== 'string' || d.svg.indexOf('<svg') < 0){ E(at, 'has no svg'); return; }
    if (!Array.isArray(d.steps) || !d.steps.length){ E(at, 'has no steps'); return; }
    if (!d.intro || !d.intro.en || !d.intro.ne) E(at, 'intro must carry both languages');

    /* ids available inside this diagram's own SVG */
    const ids = new Set([...d.svg.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]));
    const dupes = [...d.svg.matchAll(/\sid="([^"]+)"/g)].map(m => m[1])
      .filter((v, i, a) => a.indexOf(v) !== i);
    if (dupes.length) E(at, `duplicate element id(s): ${[...new Set(dupes)].join(', ')}`);

    const check = (sel, where) => {
      const list = typeof sel === 'string' ? [sel] : (sel || []);
      list.forEach(s => {
        if (s.charAt(0) !== '#'){ E(at, `${where}: only id selectors are supported, got "${s}"`); return; }
        if (!ids.has(s.slice(1))) E(at, `${where}: targets "${s}" which does not exist in the SVG`);
      });
    };

    d.steps.forEach((s, i) => {
      const stepAt = `step ${i + 1}`;
      if (!s || typeof s !== 'object'){ E(at, `${stepAt} is not an object`); return; }
      if (!s.en) E(at, `${stepAt}: missing English caption`);
      if (!s.ne) E(at, `${stepAt}: missing Nepali caption`);
      check(s.show,  `${stepAt} show`);
      check(s.hide,  `${stepAt} hide`);
      check(s.focus, `${stepAt} focus`);
      if (s.state) Object.keys(s.state).forEach(k => check(k, `${stepAt} state`));
      if (s.move)  Object.keys(s.move).forEach(k => check(k, `${stepAt} move`));
    });

    /* an animated element the steps never touch is almost always a typo */
    const touched = new Set();
    d.steps.forEach(s => {
      [].concat(s.show || [], s.hide || [], s.focus || [],
                Object.keys(s.state || {}), Object.keys(s.move || {}))
        .forEach(x => touched.add(String(x).replace('#', '')));
    });
    [...d.svg.matchAll(/id="([^"]+)"[^>]*class="[^"]*dia-(step|focus|travel|draw)/g)]
      .map(m => m[1])
      .forEach(id => { if (!touched.has(id)) W(at, `"#${id}" is animatable but no step uses it`); });
  });

  /* ---------- 4b. learning components ----------
     These are authored by hand in lesson HTML, so the contract is checked
     here rather than trusted. A prediction whose answer matches no option
     can never be answered correctly, and would reach a student silently. */
  const lessonFiles = fs.existsSync(lessonDir) ? fs.readdirSync(lessonDir).filter(f => f.endsWith('.html')) : [];
  for (const f of lessonFiles){
    const html = fs.readFileSync(path.join(lessonDir, f), 'utf8');
    const at = `content/lessons/${f}`;

    /* --- prediction blocks --- */
    const blocks = html.split('<div class="predict"').slice(1);
    blocks.forEach((raw, i) => {
      const which = `${at}: predict block ${i + 1}`;
      const head = raw.slice(0, raw.indexOf('>') + 1);
      const answer = (head.match(/data-answer="([^"]*)"/) || [])[1];
      if (!answer){ E(which, 'missing data-answer'); return; }
      const body = raw.slice(0, raw.indexOf('</div>\n  </div>') + 1 || undefined);
      const values = [...body.matchAll(/class="predict-opt"[^>]*data-value="([^"]*)"/g)].map(m => m[1]);
      if (values.length < 2) E(which, `needs at least two options, found ${values.length}`);
      if (values.length && !values.includes(answer)){
        E(which, `data-answer "${answer}" matches no option (options: ${values.join(', ')})`);
      }
      const dupes = values.filter((v, j) => values.indexOf(v) !== j);
      if (dupes.length) E(which, `duplicate option value(s): ${[...new Set(dupes)].join(', ')}`);
      if (!/class="predict-feedback"/.test(body)) E(which, 'has no feedback explaining why');
      if (!/[ऀ-ॿ]/.test(body)) E(which, 'feedback has no Nepali — bilingual is required');
    });

    /* --- simulation containers --- */
    const sims = html.split('<div class="sim">').slice(1);
    sims.forEach((raw, i) => {
      const which = `${at}: simulation ${i + 1}`;
      if (!/class="sim-head"/.test(raw))     E(which, 'missing .sim-head (title and objective)');
      if (!/class="sim-goal"/.test(raw))     E(which, 'missing .sim-goal — the student must know what they will learn');
      /* Controls may be authored in the lesson or supplied by a component
         that renders its own (the gate workbench builds its input
         switches from the gate definition, so hand-authoring them would
         be a copy that could drift out of step with the circuit). */
      const SELF_CONTROLLED =
        /class="[^"]*\b(gatelab|comblab|kmap|cpu8085|numlab|sqllab|dbtable|erlab|drill|conclab)\b/;
      if (!/class="sim-controls"/.test(raw) && !SELF_CONTROLLED.test(raw)){
        E(which, 'missing .sim-controls');
      }
      if (!/class="sim-why"/.test(raw))      E(which, 'missing .sim-why — a simulation must explain why, not just show what');
    });

    /* --- every unit opens with objectives and closes with a recap --- */
    if (/^u\d+\.html$/.test(f)){
      if (!/class="outcomes"/.test(html))  E(at, 'missing .outcomes — every unit states its objectives');
      if (!/class="keypoints"/.test(html)) E(at, 'missing .keypoints — every unit ends with a recap');
      if (!/class="exam-connect"/.test(html)) W(at, 'has no SEE exam connection frame');
    }
  }

  /* ---------- 4d. diagram presentation attributes ----------
     A CSS declaration beats an SVG presentation attribute. The diagram
     classes (.f-val, .f-lbl, …) declare font-size and text-anchor, so any
     font-size="11" or text-anchor="start" written on an element was
     silently ignored.

     That single mistake produced every label collision and every
     off-canvas caption in the library: 137 labels rendered up to 45%
     larger than authored, and 53 left-aligned labels were centred on
     their anchor point, spilling half their width across nodes.

     font-size must therefore be an inline style. text-anchor is allowed
     as an attribute because motion.css restores it with a higher-specificity
     selector — but that rule has to exist for it to work. */
  const diaSvgOf = d => (typeof d === 'string' ? d : (d && d.svg) || '');
  Object.keys(diagrams || {}).forEach(name => {
    const svg = diaSvgOf(diagrams[name]);
    const badSize = (svg.match(/font-size="\d+"/g) || []).length;
    if (badSize){
      E(`diagram "${name}"`,
        `${badSize} font-size attribute(s) will be overridden by the CSS class — ` +
        `use style="font-size:Npx" instead`);
    }
  });

  const motionCss = (() => {
    try { return fs.readFileSync(path.join(ctx.SRC, 'design', 'motion.css'), 'utf8'); }
    catch (e) { return ''; }
  })();
  const usesAnchorAttr = Object.keys(diagrams || {})
    .some(n => /text-anchor="(start|end)"/.test(diaSvgOf(diagrams[n])));
  if (usesAnchorAttr && !/svg text\[text-anchor="start"\]/.test(motionCss)){
    E('design/motion.css',
      'diagrams use text-anchor="start"/"end" attributes, but the rule that ' +
      'restores them over the class declaration is missing — those labels ' +
      'would silently centre and spill off the canvas');
  }

  /* Approximate width check. Not a substitute for the browser geometry
     audit, but it catches the gross case: a long label anchored so far
     right that it cannot fit inside the viewBox. */
  Object.keys(diagrams || {}).forEach(name => {
    const svg = diaSvgOf(diagrams[name]);
    const vb = svg.match(/viewBox="0 0 (\d+) (\d+)"/);
    if (!vb) return;
    const width = Number(vb[1]);
    for (const m of svg.matchAll(/<text[^>]*\bx="(\d+)"[^>]*text-anchor="start"[^>]*>([^<]{25,})</g)){
      const x = Number(m[1]);
      const size = Number((m[0].match(/font-size:(\d+)px/) || [])[1] || 11);
      const est = m[2].replace(/&[a-z]+;/g, 'x').length * size * 0.52;   // proportional average
      if (x + est > width * 1.06){
        W(`diagram "${name}"`,
          `label "${m[2].slice(0, 28)}…" starts at x=${x} and is roughly ` +
          `${Math.round(est)} wide — it may not fit inside ${width}`);
      }
    }
  });

  /* ---------- 4e. shapes must stay inside rounded containers ----------
     The browser geometry audit compares bounding boxes, so it reported the
     encapsulation figure as clean while both public pills visibly hung out
     of the capsule. A bounding box does not know about a corner radius: the
     capsule's box did contain the pills' boxes, but at the pills' y band a
     96-unit stadium radius pulls the real wall 24 units inward, and the
     pills sat 10 units beyond it.

     So compare against the actual rounded outline, not the box. */
  const numAttr = (tag, attr) => {
    const m = tag.match(new RegExp('\\b' + attr + '="([0-9.\\-]+)"'));
    return m ? Number(m[1]) : null;
  };
  const rectsIn = svg => {
    const out = [];
    for (const m of svg.matchAll(/<rect\b[^>]*>/g)){
      const x = numAttr(m[0], 'x'), y = numAttr(m[0], 'y');
      const w = numAttr(m[0], 'width'), h = numAttr(m[0], 'height');
      if ([x, y, w, h].some(v => v === null)) continue;
      const rx = numAttr(m[0], 'rx') || 0;
      out.push({ x, y, w, h, rx, ry: numAttr(m[0], 'ry') || rx,
                 cls: (m[0].match(/class="([^"]*)"/) || [, ''])[1] });
    }
    return out;
  };
  /* A point is inside a rounded rect if it is inside one of the two straight
     bands, or inside the corner ellipse it falls into. */
  const insideRounded = (px, py, r) => {
    if (px < r.x || px > r.x + r.w || py < r.y || py > r.y + r.h) return false;
    const rx = Math.min(r.rx, r.w / 2), ry = Math.min(r.ry, r.h / 2);
    if (!rx || !ry) return true;
    const cx = px < r.x + rx ? r.x + rx
             : px > r.x + r.w - rx ? r.x + r.w - rx : null;
    const cy = py < r.y + ry ? r.y + ry
             : py > r.y + r.h - ry ? r.y + r.h - ry : null;
    if (cx === null || cy === null) return true;
    const dx = (px - cx) / rx, dy = (py - cy) / ry;
    return dx * dx + dy * dy <= 1.0001;
  };
  Object.keys(diagrams || {}).forEach(name => {
    const rects = rectsIn(diaSvgOf(diagrams[name]));
    rects.forEach(inner => {
      rects.forEach(outer => {
        if (outer === inner || !outer.rx) return;
        const boxed = inner.x >= outer.x && inner.y >= outer.y &&
                      inner.x + inner.w <= outer.x + outer.w &&
                      inner.y + inner.h <= outer.y + outer.h;
        if (!boxed) return;
        if (outer.w * outer.h <= inner.w * inner.h * 1.2) return;   // siblings, not nesting
        const corners = [
          [inner.x, inner.y], [inner.x + inner.w, inner.y],
          [inner.x, inner.y + inner.h], [inner.x + inner.w, inner.y + inner.h]
        ];
        const escaped = corners.filter(c => !insideRounded(c[0], c[1], outer)).length;
        if (escaped){
          E(`diagram "${name}"`,
            `${inner.cls || '<rect>'} at x=${inner.x},y=${inner.y} breaks out of the ` +
            `rounded container at x=${outer.x},y=${outer.y} (rx=${outer.rx}) — ` +
            `${escaped} of 4 corners fall outside the curve`);
        }
      });
    });
  });

  /* ---------- 4f. THE LANGUAGE CONTRACT ----------
     The product has three language modes. They work today because the
     content that exists was written for them. Nothing in the build
     stopped the NEXT subject, or the next component, from quietly
     breaking one — which is the failure this section exists to prevent:

         "Nepali mode works on the existing subject but breaks when
          the next developer adds a component."

     What is deliberately NOT enforced: that every English word has a
     Nepali equivalent. Technical terminology stays in English on
     purpose — see docs/LANGUAGE-SYSTEM.md §6. A validator that demanded
     a translation of "Multiplexer" would teach authors to invent one.
     ------------------------------------------------------------ */
  const LANG_MODES = ['bi', 'ne', 'en'];

  /* --- 4f.1 question banks carry both languages where they can --- */
  Object.entries(ctx.questionBanks || {}).forEach(([subject, bank]) => {
    if (!Array.isArray(bank)) { E(`questions["${subject}"]`, 'must be an array'); return; }
    const seen = new Set();
    bank.forEach((q, i) => {
      const at = `questions["${subject}"][${i}]`;
      if (!q || !q.id) { E(at, 'missing id'); return; }
      if (seen.has(q.id)) E(at, `duplicate question id "${q.id}"`);
      seen.add(q.id);

      /* English is required everywhere. It is the exam's language, and
         it is the fallback every mode can fall back to. */
      if (!q.prompt || typeof q.prompt.en !== 'string' || !q.prompt.en.trim()){
        E(at, `"${q.id}" has no English prompt`);
      }
      if (!q.explanation || typeof q.explanation.en !== 'string' || !q.explanation.en.trim()){
        E(at, `"${q.id}" has no English explanation`);
      }
      /* An explanation is prose, never terminology, so it must be
         bilingual — this is the field a Nepali-mode student relies on
         most, because it is where the teaching happens. */
      if (!q.explanation || typeof q.explanation.ne !== 'string' || !q.explanation.ne.trim()){
        E(at, `"${q.id}" has no Nepali explanation — an explanation is prose, not terminology`);
      }
      /* A present-but-empty language key is worse than an absent one:
         the fallback cannot see it and the student gets a blank. */
      for (const field of ['prompt', 'explanation']){
        const v = q[field];
        if (!v) continue;
        for (const k of Object.keys(v)){
          if (!['en', 'ne'].includes(k)) E(at, `"${q.id}".${field} has unknown language key "${k}"`);
          else if (typeof v[k] !== 'string') E(at, `"${q.id}".${field}.${k} is not a string`);
          else if (v[k] === '' && k === 'en') E(at, `"${q.id}".${field}.en is empty`);
        }
      }
      (q.options || []).forEach((o, j) => {
        if (!o || typeof o.en !== 'string' || !o.en.trim()){
          E(at, `"${q.id}" option ${j} has no English text`);
        }
        for (const k of Object.keys(o || {})){
          if (!['en', 'ne'].includes(k)) E(at, `"${q.id}" option ${j} has unknown language key "${k}"`);
        }
      });
    });
  });

  /* --- 4f.2 the runtime's language modes agree everywhere --- */
  const langSvc = ctx.runtime['services/language.js'] || '';
  const buildSrc = fs.readFileSync(path.join(ctx.SRC, 'build', 'index.js'), 'utf8');
  const svcModes = (langSvc.match(/var MODES = \[([^\]]*)\]/) || [, ''])[1];
  LANG_MODES.forEach(m => {
    if (!svcModes.includes("'" + m + "'")) E('services/language.js', `mode "${m}" is missing`);
    if (!buildSrc.includes('"' + m + '"')) E('build/index.js', `the pre-paint bootstrap does not accept mode "${m}"`);
  });
  const svcKey = (langSvc.match(/var KEY = '([^']+)'/) || [])[1];
  const buildKey = (buildSrc.match(/const LANG_KEY = '([^']+)'/) || [])[1];
  if (svcKey && buildKey && svcKey !== buildKey){
    E('language', `the service stores under "${svcKey}" but the bootstrap reads "${buildKey}" — ` +
      'every saved preference would be orphaned');
  }

  /* --- 4f.3 UI strings are bilingual and complete --- */
  const strings = ctx.runtime['services/strings.js'] || '';
  const tableSrc = strings.slice(strings.indexOf('var TABLE = {'), strings.indexOf('function mode()'));
  const keys = [...tableSrc.matchAll(/^\s{4}([a-zA-Z][\w]*):\s*\{/gm)].map(m => m[1]);
  if (!keys.length) E('services/strings.js', 'the UI string table is empty or unreadable');
  keys.forEach(k => {
    const entry = (tableSrc.match(new RegExp('\\b' + k + ':\\s*\\{([^}]*)\\}')) || [, ''])[1];
    if (!/\ben:\s*'[^']+'/.test(entry)) E('services/strings.js', `UI string "${k}" has no English`);
    if (!/\bne:\s*'[^']+'/.test(entry)) E('services/strings.js', `UI string "${k}" has no Nepali`);
  });

  /* --- 4f.4 a component may not ship a hard-coded control label ---
     Every interactive runtime module is checked for a <button> whose
     text is a bare English literal with no data-ui key. This is the
     rule that makes the language contract inherit: a new component
     either uses the string table or fails the build. */
  /* Authored content sections ship controls too — the program tracer's
     Prev/Next/Reset are in trace.html, not in a runtime module, and the
     first version of this check scanned only runtime modules and let
     them through. Found by looking at the tracer in Nepali mode. */
  const contentDir = path.join(ctx.SRC, 'content');
  const contentFiles = [];
  (function walkContent(dir){
    if (!fs.existsSync(dir)) return;
    for (const e of fs.readdirSync(dir, { withFileTypes: true })){
      const f = path.join(dir, e.name);
      if (e.isDirectory()) walkContent(f);
      else if (e.name.endsWith('.html')) contentFiles.push(f);
    }
  })(contentDir);

  /* Dev-only pages are not student-facing and may stay English. */
  const CONTENT_EXEMPT = /(animation-showcase|design-system)\.html$/;
  contentFiles.forEach(f => {
    if (CONTENT_EXEMPT.test(f)) return;
    const rel = path.relative(ctx.SRC, f).split(path.sep).join('/');
    const html = fs.readFileSync(f, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
    for (const m of html.matchAll(/<button\b([^>]*)>([^<]{2,40})</g)){
      const attrs = m[1], label = m[2].trim();
      if (!label || /data-ui=/.test(attrs)) continue;
      /* An explicit author decision that this label is content, not
         chrome — a program title, a worked example's name. Better than a
         standing warning, which teaches people to ignore warnings. */
      if (/data-ui-content/.test(attrs)) continue;
      if (/data-value=|class="opt|class="predict-opt|data-answer=/.test(attrs)) continue;
      if (/^(&#?\w+;|\s|[+\-·▸◂])+$/.test(label)) continue;
      /* A label that IS code is technical terminology, and the language
         contract keeps terminology in English on purpose — `push()`,
         `area(5)`, `p = &s; p->show()`. Translating a method name would
         make the simulation lie about the C++ the student is learning.
         See LANGUAGE-SYSTEM.md §5B. */
      if (/\(\)|\(\d|->|&gt;|&amp;|::|;|=/.test(label)) continue;
      /* A button whose label names specific CONTENT — "Program 2 ·
         Multilevel Inheritance" — is not chrome. Heuristic: it carries a
         separator and several words. Reported as a warning so an author
         can decide, rather than blocked. */
      if (/[·—–|]/.test(label) && label.split(/\s+/).length > 3){
        W(rel, `control labelled "${label}" is unlabelled for language — ` +
          'it looks like content rather than chrome, so this is a judgement call');
        continue;
      }
      E(rel, `a control is labelled "${label}" with no data-ui key — ` +
        'add one to services/strings.js so it follows the language mode');
    }
  });

  const UI_EXEMPT = new Set(['showcase.js']);      // internal dev page
  Object.entries(ctx.runtime).forEach(([name, src]) => {
    if (!/^sim-|^quiz\.js$|^trace\.js$|^predict\.js$/.test(name)) return;
    if (UI_EXEMPT.has(name)) return;
    /* Comments carry markup-contract examples, which are documentation
       rather than shipped controls. */
    const code = src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
    for (const m of code.matchAll(/<button\b([^>]*)>([^<'"]{2,40}?)(?=['"]|<)/g)){
      const attrs = m[1], label = m[2].trim();
      if (!label) continue;
      if (/data-ui=/.test(attrs)) continue;
      /* A prediction option or a quiz option is CONTENT — its text is the
         answer the student is choosing between, authored per lesson and
         already bilingual through the content pipeline. Only chrome
         belongs in the UI string table. */
      if (/data-value=|class="opt|class="predict-opt/.test(attrs)) continue;
      /* an entity-only label such as &#9666; carries no words */
      if (/^(&#?\w+;|\s|[+\-·▸◂])+$/.test(label)) continue;
      E(`runtime/${name}`,
        `a control is labelled "${label}" with no data-ui key — ` +
        'add one to services/strings.js so it follows the language mode');
    }
  });

  /* --- 4f.5 the pairing transform must not swallow structure --- */
  const bilingualSrc = fs.readFileSync(path.join(ctx.SRC, 'build', 'bilingual.js'), 'utf8');
  /* Read the protected set itself. Searching the whole file for "'h1'"
     would pass on the string appearing in any other list — which it
     does, in BLOCK — and a check that cannot fail is worse than none. */
  const neverWrap = (bilingualSrc.match(/const NEVER_WRAP_TAG = new Set\(\[([^\]]*)\]\)/) || [, ''])[1];
  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(h => {
    if (!neverWrap.includes("'" + h + "'")){
      E('build/bilingual.js', `"${h}" is not in NEVER_WRAP_TAG — ` +
        'a heading inside a .t-en wrapper disappears in Nepali mode');
    }
  });
  if (!/run\.some\(holdsNepali\)/.test(bilingualSrc)){
    E('build/bilingual.js',
      'the locality rule is missing — a run containing Nepali would be wrapped, ' +
      'hiding both languages at once');
  }

  /* ---------- 4c. every misconception ends in something portable ----------
     A misconception block explains a confusion at length, which is right
     while the student is reading the unit and useless in the exam hall.
     The memory hook is the one line they carry out — so a block without
     one has done the hard half of the work and stopped before the half
     that gets recalled.

     Checked at build time rather than left to review because it is
     exactly the kind of thing that is obvious when writing one unit and
     forgotten across eighteen. */
  (function checkHooks(){
    const fs2 = require('fs');
    const path2 = require('path');
    const dir = path2.join(ctx.SRC, 'content', 'lessons');
    if (!fs2.existsSync(dir)) return;
    for (const file of fs2.readdirSync(dir).filter(f => f.endsWith('.html'))){
      const html = fs2.readFileSync(path2.join(dir, file), 'utf8');
      const blocks = (html.match(/<div class="mistake">/g) || []).length;
      if (!blocks) continue;
      const hooks = (html.match(/<p class="hook">/g) || []).length;
      if (hooks < 1){
        E('content/lessons/' + file,
          'has ' + blocks + ' misconception block(s) and no memory hook — ' +
          'the explanation is there and the line a student carries into the exam is not');
      }
      /* A hook only works if it is short. One that runs to a paragraph
         is a summary wearing a hook's clothes. */
      for (const m of html.matchAll(/<p class="hook">([\s\S]*?)<\/p>/g)){
        const en = m[1].split(/<span class="np-cell">/)[0].replace(/<[^>]*>/g, '').trim();
        const words = en.split(/\s+/).filter(Boolean).length;
        if (words > 24){
          E('content/lessons/' + file,
            'a memory hook is ' + words + ' words long. It has to survive being recalled ' +
            'under exam pressure — keep it under 24: "' + en.slice(0, 50) + '…"');
        }
        if (!/[ऀ-ॿ]/.test(m[1])){
          E('content/lessons/' + file,
            'a memory hook has no Nepali. The students most likely to need a hook are the ' +
            'ones reading in Nepali: "' + en.slice(0, 50) + '…"');
        }
      }
    }
  })();

  /* ---------- 4c-bis. the worked-example think gate ----------
     The gate is a marker the author inserts, and a marker is the kind of
     thing that survives a bad edit while meaning nothing. Three ways it
     can be silently broken, all of them invisible on the page because
     the runtime simply declines to build a gate it cannot understand:

       1. a .wex-gate with nothing after it inside its .wex — the marker
          is at the end, so there is no working to hide and the student
          gets a prompt, a scratch box, and a button that reveals empty
          space;
       2. a prompt with no Nepali — the students most likely to skip
          straight to the answer are the ones reading in Nepali, and an
          English-only prompt is a gate that only gates half the audience;
       3. a .wex-gate that is not inside a .wex at all — a copy-paste
          landing, which the runtime ignores entirely.

     None of these throws. All three look fine in source. That is what
     makes them worth a build gate rather than a review pass. */
  (function checkThinkGates(){
    const fs2 = require('fs');
    const path2 = require('path');
    const dir = path2.join(ctx.SRC, 'content', 'lessons');
    if (!fs2.existsSync(dir)) return;

    /* balanced-depth extraction: a .wex contains nested divs, so a
       non-greedy match to the first </div> would cut it off at the
       header and every check below would pass on a fragment. */
    function blocks(h, cls){
      const open = '<div class="' + cls + '"';
      const out = [];
      let i = 0;
      while ((i = h.indexOf(open, i)) >= 0){
        let d = 0, j = i;
        for (;;){
          const o = h.indexOf('<div', j), c = h.indexOf('</div>', j);
          if (c < 0) break;
          if (o >= 0 && o < c){ d++; j = o + 4; }
          else { d--; j = c + 6; if (d === 0) break; }
        }
        out.push(h.slice(i, j));
        i = j;
      }
      return out;
    }

    let gated = 0, total = 0;
    for (const file of fs2.readdirSync(dir).filter(f => f.endsWith('.html'))){
      const html = fs2.readFileSync(path2.join(dir, file), 'utf8');
      const where = 'content/lessons/' + file;

      const examples = blocks(html, 'wex');
      total += examples.length;

      /* (3) every marker in the file has to be accounted for by one of
         the examples, or it is sitting somewhere the runtime never looks */
      const markersInFile = (html.match(/<div class="wex-gate">/g) || []).length;
      let markersInExamples = 0;

      for (const ex of examples){
        const at = ex.indexOf('<div class="wex-gate">');
        if (at < 0) continue;
        markersInExamples++;
        gated++;

        const gate = blocks(ex.slice(at), 'wex-gate')[0] || '';
        const after = ex.slice(at + gate.length).replace(/<\/div>\s*$/, '').trim();

        if (!after){
          E(where, 'a worked example has a think gate with no working after it. ' +
            'The student would be asked to commit, and then shown nothing.');
        }
        if (!/class="wex-think"/.test(gate)){
          E(where, 'a think gate has no <p class="wex-think"> prompt — ' +
            'the gate would ask the student to think without saying what about');
        }
        if (!/[ऀ-ॿ]/.test(gate)){
          E(where, 'a think gate prompt has no Nepali. A gate that only speaks ' +
            'English gates only half the students it was built for.');
        }
      }

      if (markersInFile !== markersInExamples){
        E(where, (markersInFile - markersInExamples) + ' .wex-gate marker(s) sit outside ' +
          'any .wex block. The runtime only looks inside worked examples, so these ' +
          'do nothing at all and nothing on the page says so.');
      }
    }

    /* Worked examples are referred to by number — in the unit's own
       prose, in the practice banks, and by a teacher saying "look at
       Example 3". db-u6 shipped two examples both called Example 1,
       which makes that reference ambiguous and is completely invisible
       unless the two happen to be read together. */
    for (const file of fs2.readdirSync(dir).filter(f => f.endsWith('.html'))){
      const html = fs2.readFileSync(path2.join(dir, file), 'utf8');
      const seen = new Set(), dupes = new Set();
      for (const m of html.matchAll(/<span class="wex-n">Example (\d+)<\/span>/g)){
        if (seen.has(m[1])) dupes.add(m[1]); else seen.add(m[1]);
      }
      if (dupes.size){
        E('content/lessons/' + file,
          'two worked examples share the number ' + [...dupes].join(', ') +
          '. "See Example ' + [...dupes][0] + '" now points at two different things.');
      }
    }

    /* The other half of the contract, and the one that matters most.
       Phase 8.1 measured 0 of 50 examples gating anything; the point of
       the work was to change that deliberately, per example, and the
       point of this line is that it cannot silently slide back to 0. */
    if (total && !gated){
      E('content/lessons',
        'not one of the ' + total + ' worked examples asks the student to commit ' +
        'before the solution appears. That was the state this component was built ' +
        'to fix, and nothing else in the build would notice the return to it.');
    }
  })();

  /* ---------- 4d. the prerequisite graph ----------
     A prerequisite that points at a unit which does not exist renders as
     a dead link on the page a struggling student was sent to, which is
     the worst possible moment for one. A CYCLE is worse still: "to
     understand Unit 5, first understand Unit 5" is advice that cannot be
     followed, and nothing in the UI would reveal it — the student would
     simply walk in a circle. */
  (function checkPrereqs(){
    const map = ctx.learningMap;
    const known = new Set(Object.keys(map));
    if (!known.size){ E('content/prerequisites.js', 'the learning map is empty'); return; }

    for (const [id, unit] of Object.entries(map)){
      for (const r of unit.prereqs){
        if (!known.has(r.unit)){
          E('content/prerequisites.js',
            id + ' requires "' + r.unit + '", which is not a unit. Known units: ' +
            [...known].slice(0, 4).join(', ') + '…');
          continue;
        }
        if (r.unit === id){
          E('content/prerequisites.js', id + ' is its own prerequisite');
        }
        if (!r.why || !String(r.why.en || '').trim() || !String(r.why.ne || '').trim()){
          E('content/prerequisites.js',
            id + ' → ' + r.unit + ' has no reason in both languages. A prerequisite ' +
            'without a reason is a link; with one it tells a stuck student what to re-read');
        } else if (!/[ऀ-ॿ]/.test(r.why.ne)){
          E('content/prerequisites.js',
            id + ' → ' + r.unit + ': the Nepali reason has no Devanagari in it');
        }
      }
    }

    /* Depth-first cycle detection over the whole graph, reporting the
       actual path rather than just "a cycle exists" — a five-unit cycle
       is not findable by inspection. */
    const WHITE = 0, GREY = 1, BLACK = 2;
    const colour = {};
    for (const id of known) colour[id] = WHITE;
    const stack = [];
    let reported = false;

    function visit(id){
      if (reported) return;
      colour[id] = GREY;
      stack.push(id);
      for (const r of (map[id] ? map[id].prereqs : [])){
        if (!known.has(r.unit)) continue;
        if (colour[r.unit] === GREY){
          const from = stack.indexOf(r.unit);
          E('content/prerequisites.js',
            'prerequisite cycle: ' + stack.slice(from).join(' → ') + ' → ' + r.unit +
            '. A student sent to revise this would walk in a circle.');
          reported = true;
          return;
        }
        if (colour[r.unit] === WHITE) visit(r.unit);
        if (reported) return;
      }
      stack.pop();
      colour[id] = BLACK;
    }
    for (const id of known) if (colour[id] === WHITE) visit(id);
  })();

  /* ---------- 5. runtime modules ---------- */
  Object.keys(ctx.RUNTIME_PUBLISHED).forEach(name => {
    if (!ctx.runtime[name]) E('runtime', `module "${name}" is empty or missing`);
  });

  /* ---------- report ---------- */
  if (warn.length){
    console.warn('content warnings (' + warn.length + '):');
    warn.forEach(x => console.warn('  ! ' + x));
  }
  if (errors.length){
    const msg = 'Content validation failed with ' + errors.length + ' error(s):\n' +
                errors.map(x => '  x ' + x).join('\n') +
                '\n\nNo pages were written. Fix the content and rebuild.';
    throw new Error(msg);
  }
  console.log('content validation: ' + subjectKeys.size + ' subjects, ' +
              Object.keys(syllabus || {}).length + ' outlines, ' +
              Object.values(pages || {}).reduce((a, x) => a + ((x && x.pages) || []).length, 0) +
              ' authored pages across ' + Object.keys(pages || {}).length + ' subjects, ' +
              defined.size + ' diagrams — OK' +
              (warn.length ? ' (' + warn.length + ' warning(s))' : ''));
};
