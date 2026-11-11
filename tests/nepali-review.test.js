/* ============================================================
   THE NEPALI REVIEW PACKAGE — EXTRACTION AND ATTRIBUTION

   WHY THIS FILE EXISTS

   The review package is the only route by which a Nepali-speaking
   teacher's judgement reaches this product. Everything else about the
   Nepali — that it has lang="ne", that it survives a language switch,
   that a screen reader changes voice for it — is enforced elsewhere.
   Whether it SAYS the right thing is not a property any test can
   check, and the package is the request for someone who can.

   So the failure mode that matters here is not a wrong number. It is a
   silent omission: content the generator never looked at, which
   therefore never reaches a reviewer, and whose absence is invisible
   because the generator reports what it found rather than what exists.

   Phase 13.1 found 1,142 Devanagari string literals in the shipped
   source that were in no review item — 44% of the platform's Nepali,
   including every simulator's narration and the whole of the guided
   practice banks. None of it was marked missing anywhere. The package
   said "2,603 items" and that number was true and useless.

   The tests below are therefore of two kinds:

     - the extraction shapes, each one a pattern that was silently
       dropped before, pinned so it cannot be dropped again;
     - the ratchet, which counts Devanagari literals rather than items
       and fails if the unaccounted-for figure grows.

   And the attribution tests, which are about a different kind of loss:
   content that IS in the package but has had its context merged away.
   ============================================================ */
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, '_source');
const BI = require(path.join(ROOT, 'tools', 'nepali-bilingual.js'));

const LEDGER = JSON.parse(fs.readFileSync(
  path.join(ROOT, 'docs', 'nepali-review-items.json'), 'utf8'));

const scan = src => BI.scanSource(src, 'test.js');
const nes = src => scan(src).pairs.map(p => p.ne);

/* ========================================================== EXTRACTION */

test('an inline bi() call is a pair, not two unrelated strings', () => {
  const r = scan("head.innerHTML = bi('Press Next.', 'Next \\u0925\\u093f\\u091a\\u094d\\u0928\\u0941\\u0939\\u094b\\u0938\\u094d');");
  assert.equal(r.pairs.length, 1);
  assert.equal(r.pairs[0].en, 'Press Next.');
  assert.ok(BI.DEVA.test(r.pairs[0].ne));
  assert.equal(r.unsupported.length, 0);
});

/* The shape that cost the most. trace.js, sim-dispatch.js and
   sim-stackqueue.js spell the Nepali key `np`, and the old extractor
   looked only for `ne` — so those three files, 112 pairs of C++
   execution narration, were reported as holding no bilingual content
   whatsoever. Not "some missing": none. */
test('np: is read as the Nepali key, not only ne:', () => {
  const ne = nes("var S = [{line:3, en:'Constructor runs.', np:'\\u0915\\u0928\\u094d\\u0938\\u094d\\u091f\\u094d\\u0930\\u0915\\u094d\\u091f\\u0930 \\u091a\\u0932\\u094d\\u091b\\u0964'}];");
  assert.equal(ne.length, 1, 'an en:/np: pair must be found');
});

test('a Nepali key beside an English key that is not called en', () => {
  /* sim-gates writes `name: 'NOT (Inverter)', ne: '…'` because the
     field is the gate's name. An `en`-only scanner finds nothing. */
  const r = scan("var G = { NOT: { name: 'NOT (Inverter)', ne: '\\u0928\\u091f' } };");
  assert.equal(r.pairs.length, 1);
  assert.equal(r.pairs[0].en, 'NOT (Inverter)');
});

test('a sentence built by concatenation keeps its shape, with the gap marked', () => {
  const src = "msg = 'There are ' + n + ' left.'; msgNp = '\\u092f\\u0939\\u093e\\u0901 ' + n + ' \\u092c\\u093e\\u0901\\u0915\\u0940\\u0964';";
  const r = scan(src);
  assert.equal(r.pairs.length, 1, 'the two assignments are one pair');
  assert.ok(r.pairs[0].en.includes(BI.PLACEHOLDER),
    'the interpolated value must be visible to the reviewer: ' + r.pairs[0].en);
  assert.equal(r.pairs[0].interpolated, true);
});

test('two calls, one per language, are one pair', () => {
  /* conLine(con, en, 't-en'); conLine(con, ne, 'np'); — sim-stackqueue
     writes every console line this way. */
  const src = "conLine(con, 'the stack is empty', 't-en');\n" +
              "conLine(con, '\\u0938\\u094d\\u091f\\u094d\\u092f\\u093e\\u0915 \\u0916\\u093e\\u0932\\u0940 \\u091b', 'np');";
  const r = scan(src);
  assert.equal(r.pairs.length, 1);
  assert.equal(r.pairs[0].en, 'the stack is empty');
});

test('markup a runtime builds itself is read as a pair', () => {
  const src = "lab.innerHTML =\n" +
    "  '<span class=\"t-en\">Write your answer first</span>' +\n" +
    "  '<span class=\"t-ne np-cell\" lang=\"ne\">\\u092a\\u0939\\u093f\\u0932\\u0947 \\u0932\\u0947\\u0916\\u094d\\u0928\\u0941\\u0939\\u094b\\u0938\\u094d</span>';";
  const r = scan(src);
  assert.equal(r.pairs.length, 1);
  assert.equal(r.pairs[0].en, 'Write your answer first');
  assert.ok(!/[<>]/.test(r.pairs[0].ne), 'the tags must not reach the reviewer');
});

test('en: and ne: inside a comment are prose about pairs, not a pair', () => {
  const src = "/* the shape is { en: 'x', ne: '\\u0916' } and nothing more */\nvar x = 1;";
  const r = scan(src);
  assert.equal(r.pairs.length, 0);
  assert.equal(r.unsupported.length, 0, 'a commented example is not a missing pair either');
});

/* The regex that ate a file. `.replace(/"/g, '&quot;')` appears in nine
   runtime files; a scanner that does not blank regex literals reads
   that bare quote as a string opener and runs to the next one hundreds
   of lines away. sim-sql.js lost all 19 of its pairs that way and
   reported them as one unsupported pattern, so the gap was invisible
   in the count AND in the report. */
test('a regex holding a quote does not swallow the rest of the file', () => {
  const src = "var esc = function (s){ return String(s).replace(/\"/g, '&quot;'); };\n" +
              "var P = { en: 'Add one row', ne: '\\u092a\\u0919\\u094d\\u0915\\u094d\\u0924\\u093f \\u0925\\u092a\\u094d\\u0928\\u0941' };";
  const r = scan(src);
  assert.equal(r.pairs.length, 1, 'the pair after the regex must still be found');
  assert.equal(r.pairs[0].en, 'Add one row');
});

test('Devanagari the scanner cannot pair is reported, never dropped', () => {
  const src = "someFn(buildIt(x), '\\u092f\\u094b \\u0915\\u0947 \\u0939\\u094b \\u0924\\u094d\\u092f\\u0938\\u094d\\u0924\\u094b \\u0915\\u0941\\u0930\\u093e \\u0939\\u094b');";
  const r = scan(src);
  const silent = r.pairs.length === 0 && r.unsupported.length === 0;
  assert.equal(silent, false,
    'an unpairable Devanagari string must appear in pairs OR in unsupported — ' +
    'silence is the one outcome that hides content from the reviewer');
  if (!r.pairs.length){
    assert.ok(r.unsupported[0].line > 0, 'and it must carry a line number');
  }
});

/* ======================================================= ATTRIBUTION */

const occ = (ne, over) => Object.assign({
  id: 'ne-' + BI.hash(ne), ne, en: 'the same English',
  kind: 'quiz option', file: 'questions/a.js', ref: 'q1 option 1',
  meta: { subject: 'grade10/dbms', unitNo: '2' }
}, over || {});

test('the same Nepali in two subjects is one translation and two things to review', () => {
  /* The defect this replaced: a key of (Nepali, kind) merged these and
     deleted one. A Digital Design reviewer could no longer see that
     their question offers "१६" as an option, because Grade 9's
     identical option had won the key. */
  const items = [
    occ('१६', { meta: { subject: 'grade10/digital-design', unitNo: '4' }, ref: 'dd406 opt4' }),
    occ('१६', { meta: { subject: 'grade9/computer-fundamentals', unitNo: '4' }, ref: 'cf39 opt3' })
  ];
  const d = BI.dedupeOccurrences(items);
  assert.equal(d.items.length, 2, 'both occurrences must survive');
  assert.equal(d.duplicates, 0);
  const pairs = BI.groupPairs(d.items);
  assert.equal(pairs.size, 1, 'it is one translation');
  const p = [...pairs.values()][0];
  assert.deepEqual(p.subjects.slice().sort(),
    ['grade10/digital-design', 'grade9/computer-fundamentals']);
  assert.equal(p.occurrences.length, 2);
});

test('two occurrences that differ ONLY by subject are still two', () => {
  /* Not a contrived case. sim-parts.js's `systemunits` set is mounted
     by Grade 9 Unit 2 and Grade 10 Hardware Unit 2 — the same file, the
     same key path inside it, and the same unit NUMBER. Subject is the
     only field that tells its 28 pairs apart, so a key that drops it
     silently halves them.

     The cross-subject test above cannot catch that on its own: its two
     items differ in unit and reference too, so they stay distinct even
     with subject removed from the key. This one isolates it. */
  const same = { kind: 'simulator text', file: 'runtime/sim-parts.js',
                 ref: 'SETS.systemunits.parts.[0].does', en: 'Accepts data' };
  const d = BI.dedupeOccurrences([
    occ('डाटा लिन्छ', Object.assign({}, same,
      { meta: { subject: 'grade9/computer-fundamentals', unitNo: '2' } })),
    occ('डाटा लिन्छ', Object.assign({}, same,
      { meta: { subject: 'grade10/hardware', unitNo: '2' } }))
  ]);
  assert.equal(d.items.length, 2,
    'the subject must be part of what makes an occurrence distinct');
  assert.equal(d.duplicates, 0);
});

test('the same Nepali in two units of one subject keeps both units', () => {
  const d = BI.dedupeOccurrences([
    occ('चार', { meta: { subject: 'grade10/hardware', unitNo: '6' }, ref: 'hw027 opt3' }),
    occ('चार', { meta: { subject: 'grade10/hardware', unitNo: '2' }, ref: 'hw011 opt3' })
  ]);
  assert.equal(d.items.length, 2);
  const p = [...BI.groupPairs(d.items).values()][0];
  assert.equal(p.units.length, 2, 'both units must be recorded: ' + p.units.join(', '));
  assert.equal(p.subjects.length, 1);
});

test('the same Nepali in two source files keeps both files', () => {
  const d = BI.dedupeOccurrences([
    occ('तीन', { file: 'runtime/sim-table.js', ref: 'a' }),
    occ('तीन', { file: 'runtime/sim-er.js', ref: 'a' })
  ]);
  assert.equal(d.items.length, 2);
  assert.equal([...BI.groupPairs(d.items).values()][0].files.length, 2);
});

test('the SAME source occurrence reached twice is one occurrence', () => {
  /* This is the duplicate that deduplication is actually for: two
     extraction patterns matching the same text at the same place. */
  const d = BI.dedupeOccurrences([occ('दुई'), occ('दुई')]);
  assert.equal(d.items.length, 1);
  assert.equal(d.duplicates, 1);
});

test('a genuinely different translation is a different pair', () => {
  const d = BI.dedupeOccurrences([
    occ('दुई', { ref: 'a' }),
    occ('दुई वटा', { ref: 'b' })
  ]);
  assert.equal(BI.groupPairs(d.items).size, 2);
});

test('one Nepali standing in for two Englishes is flagged, not averaged', () => {
  const d = BI.dedupeOccurrences([
    occ('दुई', { en: 'Two', ref: 'a' }),
    occ('दुई', { en: 'A pair of them', ref: 'b' })
  ]);
  const p = [...BI.groupPairs(d.items).values()][0];
  assert.equal(p.enVariants.length, 1,
    'the second English must be recorded as a variant, not silently discarded');
});

test('a reviewer verdict survives regeneration, and nothing can invent one', () => {
  const items = BI.dedupeOccurrences([occ('दुई'), occ('चार', { ref: 'b' })]).items;
  BI.groupPairs(items);
  const prev = [{ occId: items[0].occId, status: 'human-reviewed', reviewNote: 'reads well' }];
  const carried = BI.carryStatus(items, prev);
  assert.equal(carried, 1);
  assert.equal(items[0].status, 'human-reviewed');
  assert.equal(items[0].reviewNote, 'reads well');
  assert.equal(items[1].status, 'pending-review',
    'an item with no recorded verdict must stay pending');

  /* keyed by pair id when the previous ledger predates occurrence ids */
  const again = BI.dedupeOccurrences([occ('दुई')]).items;
  BI.groupPairs(again);
  BI.carryStatus(again, [{ id: again[0].id, status: 'correction-required' }]);
  assert.equal(again[0].status, 'correction-required');

  /* and an empty history cannot produce a verdict */
  const fresh = BI.dedupeOccurrences([occ('दुई')]).items;
  BI.groupPairs(fresh);
  assert.equal(BI.carryStatus(fresh, []), 0);
  assert.equal(fresh[0].status, 'pending-review');
});

/* ================================================== THE REAL LEDGER */

test('every occurrence in the ledger is distinct, and the pairs account for all of them', () => {
  const ids = new Set(LEDGER.items.map(i => i.occId));
  assert.equal(ids.size, LEDGER.items.length, 'duplicate occurrence ids in the ledger');
  assert.equal(LEDGER.stats.occurrences, LEDGER.items.length);
  assert.equal(LEDGER.stats.pairs, LEDGER.pairs.length);
  assert.equal(LEDGER.pairs.reduce((a, p) => a + p.occurrenceCount, 0), LEDGER.items.length,
    'the per-pair occurrence counts must add up to every occurrence');
  assert.ok(LEDGER.stats.pairs < LEDGER.stats.occurrences,
    'pairs and occurrences are different counts and must not be reported as one');
});

test('the Grade 10 quiz options a shared translation used to hide are all present', () => {
  /* Phase 13 recorded five Grade 10 items as lost to "re-attribution".
     They were lost to the dedup key, and so were eleven more that
     predate Phase 13. Each of these is a real option on a real Grade 10
     question that a reviewer could not see. */
  const want = [
    ['grade10/oop-cpp',        'g10.oop-cpp.q38 option 3'],
    ['grade10/digital-design', 'g10.dd.q406 option 3'],
    ['grade10/digital-design', 'g10.dd.q406 option 4'],
    ['grade10/digital-design', 'g10.dd.q101 option 1'],
    ['grade10/digital-design', 'g10.dd.q101 option 3'],
    ['grade10/digital-design', 'g10.dd.q014 option 4'],
    ['grade10/digital-design', 'g10.dd.q010 option 3'],
    ['grade10/dbms',           'g10.db.q017 option 3'],
    ['grade10/digital-design', 'g10.dd.q403 option 2'],
    ['grade10/digital-design', 'g10.dd.q403 option 3'],
    ['grade10/dbms',           'g10.db.q013 option 2'],
    ['grade10/dbms',           'g10.db.q013 option 4']
  ];
  for (const [subject, ref] of want){
    const hits = LEDGER.items.filter(i => i.subject === subject &&
      i.kind === 'quiz option' && String(i.ref).indexOf(ref) === 0);
    assert.equal(hits.length, 1,
      subject + ' is missing the option at ' + ref + '. Its Nepali is identical to ' +
      'an option elsewhere, and a deduplication key that ignores where an item ' +
      'occurs has taken its context away again.');
  }
});

test('a simulator mounted by two subjects is attributed to both', () => {
  /* sim-parts.js systemunits is the one genuine cross-subject
     simulator: Grade 9 Unit 2 and Grade 10 Hardware Unit 2 both mount
     it. If it were attributed to one, the other subject's reviewer
     would never see 28 pairs of text their students read. */
  const parts = LEDGER.items.filter(i => i.file === 'runtime/sim-parts.js');
  const subs = [...new Set(parts.map(i => i.subject))].sort();
  assert.deepEqual(subs, ['grade10/hardware', 'grade9/computer-fundamentals'],
    'sim-parts.js must be attributed to both subjects that mount it, got: ' + subs.join(', '));
  const shared = LEDGER.pairs.filter(p => p.subjects.length > 1 &&
    parts.some(i => i.id === p.id));
  assert.ok(shared.length >= 20,
    'most of its pairs should span both subjects, got ' + shared.length);
});

test('the Grade 9 cipher bench is in the package', () => {
  /* The six pairs Phase 13 authored and then reported as missing. They
     were missing because the extractor read one runtime file and this
     was not it. */
  const cip = LEDGER.items.filter(i => i.file === 'runtime/sim-cipher.js');
  assert.ok(cip.length >= 6, 'expected at least 6 cipher pairs, got ' + cip.length);
  for (const c of cip){
    assert.equal(c.subject, 'grade9/computer-fundamentals');
    assert.equal(String(c.unit), '7');
  }
});

test('nothing in the package claims to have been reviewed by a human', () => {
  /* The assertion to edit DELIBERATELY, by whoever has the evidence.
     Extraction tests passing is not evidence about Nepali. */
  assert.equal(LEDGER.stats.humanReviewed, 0);
  const odd = LEDGER.items.filter(i => i.status !== 'pending-review');
  assert.equal(odd.length, 0,
    odd.length + ' items carry a review status with no recorded human review');
});

/* ============================================================ RATCHET

   The denominator a collector cannot flatter. Every Devanagari string
   literal in the shipped source either reaches a reviewer or it does
   not, and this counts which.

   The allowance is not a target. It is the measured residue at the end
   of Phase 13.1, recorded so that it can be reduced and cannot grow:
   the homepage prose the build writes in template literals, and the
   runtime strings whose English half is assembled in a shape the
   scanner does not parse. Every one of them is listed by
   `node tools/nepali-review.js --audit`.
   ============================================================ */
const UNACCOUNTED_ALLOWANCE = 56;

test('the Nepali that reaches no reviewer does not grow', () => {
  const norm = s => String(s || '').replace(/\s+/g, ' ').trim();
  const cmp = s => norm(BI.stripMarkup(s)).replace(/\\/g, '');
  const blob = LEDGER.items.map(i => cmp(i.ne)).join(' \u0000 ');

  const files = [];
  (function walk(d, pre){
    for (const e of fs.readdirSync(d, { withFileTypes: true })){
      if (e.name === 'archive') continue;
      if (e.isDirectory()) walk(path.join(d, e.name), pre + e.name + '/');
      else if (e.name.endsWith('.js')) files.push(pre + e.name);
    }
  })(SRC, '');

  let total = 0;
  const missing = [];
  for (const rel of files.sort()){
    const src = fs.readFileSync(path.join(SRC, rel), 'utf8');
    if (!BI.DEVA.test(src)) continue;
    for (const lit of BI.devaLiterals(BI.blankNoise(src))){
      const text = cmp(BI.unquote(lit.text));
      if ((text.match(/[ऀ-ॿ]/g) || []).length < 3) continue;
      total++;
      if (!blob.includes(text.slice(0, 40))){
        missing.push(rel + ':' + BI.lineAt(src, lit.at));
      }
    }
  }

  assert.ok(total > 2000, 'the census found only ' + total + ' literals; it has stopped working');
  assert.ok(missing.length <= UNACCOUNTED_ALLOWANCE,
    missing.length + ' Devanagari strings reach no reviewer, above the recorded ' +
    UNACCOUNTED_ALLOWANCE + '. New Nepali has been written somewhere the extractor ' +
    'does not read. Run: node tools/nepali-review.js --audit --detail\nFirst few: ' +
    missing.slice(0, 8).join(', '));

  /* And the coverage is not nominal: the overwhelming majority of the
     platform's Nepali must actually be in the package. Before Phase
     13.1 this was 58%. */
  const covered = (total - missing.length) / total;
  assert.ok(covered > 0.97,
    'only ' + (covered * 100).toFixed(1) + '% of the source Nepali is in the package');
});
