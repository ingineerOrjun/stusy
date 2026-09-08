/* ============================================================
   BRAND — the product's name, in one place.

   WHY THIS FILE EXISTS
   The name was written out ten times inside build/index.js: the top
   bar, the footer, and eight <title> templates. Renaming meant finding
   all ten, and missing one showed the old name on a page nobody
   thought to check. It is one fact, so it lives in one place.

   THE NAME
   Gyansetu — ज्ञानसेतु — is ज्ञान (knowledge) + सेतु (bridge).

   That is not decoration; it is what the product actually does. A
   student here understands the subject in Nepali and is examined on it
   in English, and every page is built to carry them across that gap:
   the English wording the exam uses, with the Nepali meaning beside it.
   The name says the thesis, so the home page can show it rather than
   claim it.

   THE MARK
   ज्ञ — the first glyph of ज्ञानसेतु. It needs var(--deva); the mono
   stack the mark used for "RG" has no Devanagari and would fall back
   to whatever the system offers, which is different on every machine.
   ============================================================ */

module.exports = {
  name: 'Gyansetu',
  np:   'ज्ञानसेतु',
  mark: 'ज्ञ',

  tagline: 'Computer Engineering · CDC Nepal 2078',

  meaning: {
    en: 'knowledge bridge',
    ne: 'ज्ञानको सेतु'
  },

  /* The one-line promise, used on the home page. Bilingual because the
     student it is addressed to reads both. */
  promise: {
    en: 'The bridge between what you understand in Nepali and what the exam asks in English.',
    ne: 'नेपालीमा बुझेको कुरा र अंग्रेजीमा सोधिने प्रश्नबीचको सेतु।'
  }
};
