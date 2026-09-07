/* ============================================================
   DIAGRAM GEOMETRY AUDIT — browser-run

   WHY THIS IS NOT IN `npm test`
   Every check here needs real layout: text measured in the font that
   actually loaded, elements measured through their transforms. Node has
   none of that. Running it against a fake DOM would produce numbers that
   look like measurements and are not, which is worse than no check.

   HOW TO RUN
     1. node tests/manual/diagram-audit.js        → writes an audit page
     2. serve the repository root
     3. open /__diagram-audit.html and paste AUDIT (printed below) into
        the console, or run it through a browser automation tool

   WHAT IT CATCHES — each of these has caught a real defect:
     · text over text            two labels sharing space
     · out of frame              a caption clipped by the viewBox
     · breaks out                a shape crossing a rounded container's
                                 curve, which bounding boxes cannot see
                                 (the encapsulation pills)
     · text over geometry        a heading sitting on a drawn outline
                                 (the NAND row-3 heading), and edges
                                 running through vertex labels (graph)

   MEASUREMENT NOTE
   Everything is compared in SCREEN space. getBBox() reports an
   element's own coordinate system, so a shape inside
   <g transform="translate(...)"> appears to sit at the origin and
   collides with whatever is drawn there. The first version of the
   text-over-geometry check did exactly that and reported 44 false
   positives across 9 figures.

   A <line> is compared as an actual segment, not as its bounding box:
   a diagonal line's box covers a large rectangle it does not draw in.
   ============================================================ */
'use strict';

const AUDIT = String(function audit(){
  /* MEASURE AFTER THE FONT HAS LOADED, OR MEASURE THE WRONG TEXT.

     Every check here compares text boxes against geometry, and a text
     box is a different size in the fallback font than in the loaded
     one. Phase 4.1 ran this behind a fixed 900 ms wait and reported 53
     figures clean; run again after `document.fonts.ready`, the same
     tree reported a real overlap in `grayCode` that had been there all
     along.

     A fixed delay is a guess about font loading. This is the fact. */
  if (document.fonts && document.fonts.status !== 'loaded'){
    return { error: 'fonts not ready — await document.fonts.ready, then run AUDIT() again',
             fontStatus: document.fonts.status };
  }

  const figs = [...document.querySelectorAll('figure.fig')];
  const report = [];

  const R = el => el.getBoundingClientRect();

  /* Shortest distance from a point to a line segment, in screen pixels. */
  function segDist(px, py, x1, y1, x2, y2){
    const dx = x2 - x1, dy = y2 - y1;
    const len2 = dx * dx + dy * dy;
    let t = len2 ? ((px - x1) * dx + (py - y1) * dy) / len2 : 0;
    t = Math.max(0, Math.min(1, t));
    const cx = x1 + t * dx, cy = y1 + t * dy;
    return Math.hypot(px - cx, py - cy);
  }

  /* A <line> in screen coordinates. */
  function lineScreen(el){
    const m = el.getScreenCTM();
    if (!m) return null;
    const p = (x, y) => {
      const pt = el.ownerSVGElement.createSVGPoint();
      pt.x = Number(x); pt.y = Number(y);
      const o = pt.matrixTransform(m);
      return [o.x, o.y];
    };
    const a = p(el.getAttribute('x1'), el.getAttribute('y1'));
    const b = p(el.getAttribute('x2'), el.getAttribute('y2'));
    return { x1: a[0], y1: a[1], x2: b[0], y2: b[1] };
  }

  for (const fig of figs){
    const name = fig.dataset.name || '(unnamed)';
    const svg = fig.querySelector('svg');
    if (!svg) continue;
    const vb = (svg.getAttribute('viewBox') || '').split(' ').map(Number);
    const scale = R(svg).width / (vb[2] || 1);
    const issues = [];

    const texts = [...svg.querySelectorAll('text')].filter(t => (t.textContent || '').trim());

    /* 1. text over text */
    for (let i = 0; i < texts.length; i++){
      for (let j = i + 1; j < texts.length; j++){
        const a = R(texts[i]), b = R(texts[j]);
        const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left);
        const oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        if (ox > scale && oy > scale){
          issues.push('TEXT-OVER-TEXT: "' + texts[i].textContent.trim().slice(0, 24) +
                      '" x "' + texts[j].textContent.trim().slice(0, 24) + '"');
        }
      }
    }

    /* 2. anything outside the declared frame */
    for (const el of svg.querySelectorAll('text,rect,circle,ellipse')){
      const b = el.getBBox();
      if (b.x < -1 || b.y < -1 || b.x + b.width > vb[2] + 1 || b.y + b.height > vb[3] + 1){
        issues.push('OUT-OF-FRAME: ' + el.tagName + ' "' +
                    (el.textContent || '').trim().slice(0, 24) + '"');
      }
    }

    /* 3. a shape crossing a rounded container's actual curve */
    const shapes = [...svg.querySelectorAll('rect,circle,ellipse')];
    for (const inner of shapes){
      const ib = inner.getBBox();
      if (ib.width < 4 || ib.height < 4) continue;
      for (const outer of shapes){
        if (outer === inner) continue;
        const ob = outer.getBBox();
        const boxed = ib.x >= ob.x - 0.5 && ib.y >= ob.y - 0.5 &&
                      ib.x + ib.width <= ob.x + ob.width + 0.5 &&
                      ib.y + ib.height <= ob.y + ob.height + 0.5;
        if (!boxed) continue;
        if (ob.width * ob.height <= ib.width * ib.height * 1.2) continue;

        /* CORNERS ARE THE WRONG PROBE FOR A CURVED INNER SHAPE.

           A double ellipse — the notation for a multivalued attribute —
           is two concentric ellipses. The inner one is entirely inside
           the outer, but the corners of its BOUNDING BOX are not: for
           rx 53 inside rx 60, the corner lands at 1.34 on the outer
           ellipse's containment scale while the ellipse itself peaks at
           0.78. Probing corners reported that as escaping at 4/4
           corners, which was a defect in this audit rather than in the
           figure.

           So a curved inner shape is probed around its own outline
           instead of at the corners of a box it never touches. */
        const curved = inner.tagName === 'circle' || inner.tagName === 'ellipse';
        let probes;
        if (curved){
          const cx = ib.x + ib.width / 2, cy = ib.y + ib.height / 2;
          const rx = ib.width / 2, ry = ib.height / 2;
          probes = [];
          for (let d = 0; d < 360; d += 15){
            const t = d * Math.PI / 180;
            probes.push([cx + rx * Math.cos(t), cy + ry * Math.sin(t)]);
          }
        } else {
          probes = [[ib.x, ib.y], [ib.x + ib.width, ib.y],
                    [ib.x, ib.y + ib.height], [ib.x + ib.width, ib.y + ib.height]];
        }

        let escaped = 0;
        for (const [px, py] of probes){
          try { if (!outer.isPointInFill(new DOMPoint(px, py))) escaped++; } catch (e) { /* not fillable */ }
        }
        if (escaped){
          issues.push('BREAKS-OUT: ' + inner.tagName + '.' + (inner.getAttribute('class') || '-') +
                      ' escapes ' + outer.tagName + '.' + (outer.getAttribute('class') || '-') +
                      ' at ' + escaped + '/' + probes.length +
                      (curved ? ' points on its outline' : ' corners'));
        }
      }
    }

    /* 4. text sitting on drawn geometry */
    const geo = [...svg.querySelectorAll('path,circle,ellipse,polygon')];
    const lines = [...svg.querySelectorAll('line')];
    for (const t of texts){
      const tb = R(t);
      const area = tb.width * tb.height;
      if (!area) continue;
      const cx = (tb.left + tb.right) / 2, cy = (tb.top + tb.bottom) / 2;

      for (const g of geo){
        const gb = R(g);
        const ox = Math.min(tb.right, gb.right) - Math.max(tb.left, gb.left);
        const oy = Math.min(tb.bottom, gb.bottom) - Math.max(tb.top, gb.top);
        if (ox <= 0 || oy <= 0) continue;
        /* a shape that fully contains the label is a panel, not a collision */
        if (gb.left <= tb.left + 0.5 && gb.top <= tb.top + 0.5 &&
            gb.right >= tb.right - 0.5 && gb.bottom >= tb.bottom - 0.5) continue;
        const cover = (ox * oy) / area;
        if (cover > 0.12 && ox > 4 * scale && oy > 4 * scale){
          issues.push('TEXT-OVER-SHAPE: "' + t.textContent.trim().slice(0, 24) + '" x ' +
                      g.tagName + '.' + (g.getAttribute('class') || '-') +
                      ' covers ' + (cover * 100).toFixed(0) + '%');
        }
      }

      /* A diagonal line's bounding box covers a rectangle it does not
         draw in, so compare against the segment itself. */
      for (const l of lines){
        const s = lineScreen(l);
        if (!s) continue;
        const halfH = tb.height / 2;
        if (segDist(cx, cy, s.x1, s.y1, s.x2, s.y2) < halfH * 0.6){
          issues.push('LINE-THROUGH-TEXT: "' + t.textContent.trim().slice(0, 24) +
                      '" crossed by line.' + (l.getAttribute('class') || '-'));
        }
      }
    }

    if (issues.length) report.push({ name, count: issues.length, issues: issues.slice(0, 8) });
  }

  return { figures: figs.length, withProblems: report.length, report };
});

/* ---- page generator (node) ---- */
if (require.main === module){
  const fs = require('fs');
  const path = require('path');
  const ROOT = path.resolve(__dirname, '..', '..');
  const D = require(path.join(ROOT, '_source', 'diagrams.js'));
  let body = '';
  for (const [n, d] of Object.entries(D)){
    body += '<figure class="fig" data-name="' + n + '">' +
            (typeof d === 'string' ? d : d.svg) + '</figure>\n';
  }
  const html = '<!doctype html><html lang="en"><head><meta charset="utf-8">' +
    '<link rel="stylesheet" href="/assets/css/style.css"><title>Diagram geometry audit</title>' +
    '</head><body class="page"><main>' + body + '</main><script>window.AUDIT = ' + AUDIT +
    ';<\/script></body></html>';
  const out = path.join(ROOT, '__diagram-audit.html');
  fs.writeFileSync(out, html, 'utf8');
  console.log('wrote ' + path.relative(ROOT, out) + ' with ' + Object.keys(D).length + ' figures');
  console.log('serve the repo root, open it, and run:');
  console.log('  await document.fonts.ready; JSON.stringify(AUDIT(), null, 1)');
  console.log('  (AUDIT refuses to measure before the font has loaded — it would measure the wrong text)');
  console.log('DELETE the page when finished — a stray file in the site root fails the page-count test.');
}

module.exports = { AUDIT_SOURCE: AUDIT };
