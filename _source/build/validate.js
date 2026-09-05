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
    const authored = key === 'grade10/oop-cpp';
    if (!authored && !syllabus[key]) W(`subject "${key}"`, 'has neither authored pages nor a syllabus outline');
  });

  /* ---------- 3. page map ---------- */
  const seenFile = new Set();
  (pages || []).forEach((p, i) => {
    const at = `pages[${i}]`;
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
      const published = Object.values(ctx.RUNTIME_PUBLISHED).concat(['question-bank.js']);
      if (!published.includes(f)) E(at, `references runtime module "${f}" which the build does not publish`);
    });
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
      if (!/class="sim-controls"/.test(raw)) E(which, 'missing .sim-controls');
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
              (pages || []).length + ' authored pages, ' +
              defined.size + ' diagrams — OK' +
              (warn.length ? ' (' + warn.length + ' warning(s))' : ''));
};
