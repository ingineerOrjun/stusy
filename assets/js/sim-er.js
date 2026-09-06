/* =========================================================
   ER MODEL VISUALISER — Unit 2

   WHAT A STATIC ER DIAGRAM CANNOT DO
   A drawn ER diagram shows the NOTATION for a cardinality: a 1, an M,
   a diamond. It does not show what the notation MEANS, and that is
   precisely where students go wrong. "One-to-many versus many-to-many"
   is the most-missed distinction in this unit, and it is missed because
   both look like two boxes and a diamond.

   The difference only becomes visible at the level of actual rows:

     1 : M   one class has many students,
             but each student has only one class

     M : N   one student takes many courses,
             AND one course has many students
             — and THAT is why it needs a third table

   So this component shows two things at once: the notation on top, and
   the actual occurrences underneath. Change the cardinality and both
   change together. The junction table appears when — and only when —
   the relationship becomes M:N, which is the consequence a student has
   to be able to state in the exam (topic 3.4).

   MOTION
   The only animated transition is the one that carries meaning: when
   the cardinality changes, the connecting lines redraw so a student
   sees links appear or collapse. Nothing else moves. Respects
   prefers-reduced-motion via the platform's motion service.

   MARKUP CONTRACT

     <div class="erlab" data-model="class-student"></div>
     <div class="erlab" data-model="student-course" data-mode="parts"></div>

   A future unit adds a model to MODELS, not a component.
   ========================================================= */
(function (global) {
  'use strict';

  var esc = (global.DbTable && global.DbTable.esc) || function (s){
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };

  /* ---------------------------------------------------------------
     MODELS — the data a lesson configures the component with.
     `occ` are the actual occurrences the instance view draws.
     --------------------------------------------------------------- */
  var MODELS = {
    'class-student': {
      left:  { name: 'CLASS', pk: 'class_id', occ: ['10', '11'] },
      right: { name: 'STUDENT', pk: 'id', occ: ['Ram', 'Sita', 'Hari'] },
      verb:  { en: 'contains', ne: 'समावेश गर्छ' },
      rel:   'CONTAINS',
      /* which right-occurrences each left-occurrence links to, per mode */
      links: {
        '1:1': [[0], [1]],
        '1:M': [[0, 1], [2]],
        'M:N': [[0, 1], [1, 2]]
      },
      natural: '1:M'
    },
    'student-course': {
      left:  { name: 'STUDENT', pk: 'id', occ: ['Ram', 'Sita'] },
      right: { name: 'COURSE', pk: 'course_id', occ: ['Maths', 'Science', 'Nepali'] },
      verb:  { en: 'enrols in', ne: 'भर्ना हुन्छ' },
      rel:   'ENROLS',
      links: {
        '1:1': [[0], [1]],
        '1:M': [[0, 1], [2]],
        'M:N': [[0, 1], [0, 2]]
      },
      natural: 'M:N'
    }
  };

  var CARDS = [
    { id: '1:1', label: { en: 'One-to-one', ne: 'एक–एक' },
      mark: ['1', '1'],
      say: { en: 'Each row on the left is joined to at most ONE row on the right, and the other way round too. Both directions are "one".',
             ne: 'बायाँको हरेक पङ्क्ति दायाँको बढीमा एउटासँग जोडिन्छ, र उल्टो पनि त्यस्तै। दुवैतर्फ "एक"।' },
      table: { en: 'Two tables. The foreign key can sit in either one.',
               ne: 'दुई तालिका। Foreign key जुनसुकैमा राख्न सकिन्छ।' } },
    { id: '1:M', label: { en: 'One-to-many', ne: 'एक–धेरै' },
      mark: ['1', 'M'],
      say: { en: 'One row on the left joins to MANY on the right — but each right row goes back to only ONE left row. The "many" side is one direction only.',
             ne: 'बायाँको एउटा पङ्क्ति दायाँका धेरैसँग जोडिन्छ — तर दायाँको हरेक पङ्क्ति बायाँको एउटैसँग फर्किन्छ। "धेरै" एकतर्फी मात्र हो।' },
      table: { en: 'Two tables. The foreign key goes in the MANY side. This is the most common relationship in real databases.',
               ne: 'दुई तालिका। Foreign key "धेरै" तर्फ जान्छ। वास्तविक डाटाबेसमा सबैभन्दा धेरै आउने सम्बन्ध यही हो।' } },
    { id: 'M:N', label: { en: 'Many-to-many', ne: 'धेरै–धेरै' },
      mark: ['M', 'N'],
      say: { en: 'Many on the left join to many on the right, BOTH ways. Look at the lines: they cross. No single foreign key can record that.',
             ne: 'बायाँका धेरै दायाँका धेरैसँग, दुवैतर्फ। रेखाहरू हेर्नुहोस् — काटिन्छन्। यसलाई एउटै foreign key ले राख्न सक्दैन।' },
      table: { en: 'THREE tables. A third — a junction table — is needed, holding one row per link. This is the consequence you must be able to state.',
               ne: 'तीन तालिका। बीचमा एउटा junction तालिका चाहिन्छ, हरेक जोडका लागि एक पङ्क्ति। परीक्षामा भन्न सक्नुपर्ने नतिजा यही हो।' } }
  ];

  /* The components of an ER diagram — topics 2.2, 2.3, 2.4. Each is a
     shape a student must recognise and be able to draw. */
  var PARTS = [
    { id: 'entity', shape: 'rectangle',
      label: { en: 'Entity', ne: 'इन्टिटी' },
      say: { en: 'A rectangle. A real thing the database stores — a student, a course, a book. It becomes a TABLE.',
             ne: 'आयत। डाटाबेसले राख्ने वास्तविक वस्तु — विद्यार्थी, विषय, पुस्तक। यो तालिका बन्छ।' } },
    { id: 'weak', shape: 'double rectangle',
      label: { en: 'Weak entity', ne: 'कमजोर इन्टिटी' },
      say: { en: 'A double rectangle. It cannot be identified on its own — it needs its owner\'s key. Not "unimportant": it has no key of its own.',
             ne: 'दोहोरो आयत। यो आफैंले चिनिन सक्दैन — मालिकको कुञ्जी चाहिन्छ। "महत्त्वहीन" होइन: आफ्नै कुञ्जी नभएको।' } },
    { id: 'attribute', shape: 'ellipse',
      label: { en: 'Attribute', ne: 'एट्रिब्युट' },
      say: { en: 'An ellipse. A property of an entity — name, marks. It becomes a COLUMN.',
             ne: 'दीर्घवृत्त। इन्टिटीको गुण — नाम, अंक। यो स्तम्भ बन्छ।' } },
    { id: 'key', shape: 'underlined ellipse',
      label: { en: 'Key attribute', ne: 'कुञ्जी एट्रिब्युट' },
      say: { en: 'An ellipse with the name UNDERLINED. It identifies each occurrence uniquely and becomes the PRIMARY KEY.',
             ne: 'नाममुनि रेखा भएको दीर्घवृत्त। हरेकलाई अद्वितीय चिनाउँछ र प्राथमिक कुञ्जी बन्छ।' } },
    { id: 'multi', shape: 'double ellipse',
      label: { en: 'Multivalued attribute', ne: 'बहुमान एट्रिब्युट' },
      say: { en: 'A double ellipse. One occurrence can hold several values — a student with two phone numbers.',
             ne: 'दोहोरो दीर्घवृत्त। एउटैले धेरै मान राख्न सक्छ — दुई फोन नम्बर भएको विद्यार्थी।' } },
    { id: 'derived', shape: 'dashed ellipse',
      label: { en: 'Derived attribute', ne: 'व्युत्पन्न एट्रिब्युट' },
      say: { en: 'A dashed ellipse. Not stored — worked out from something that is. Age is derived from date of birth.',
             ne: 'धर्के दीर्घवृत्त। भण्डारण गरिँदैन — अरूबाट निकालिन्छ। उमेर जन्ममितिबाट निस्कन्छ।' } },
    { id: 'relationship', shape: 'diamond',
      label: { en: 'Relationship', ne: 'सम्बन्ध' },
      say: { en: 'A diamond. How two entities are connected — a student ENROLS IN a course. Written as a verb.',
             ne: 'चतुर्भुज। दुई इन्टिटी कसरी जोडिन्छन् — विद्यार्थी विषयमा भर्ना हुन्छ। क्रियापदमा लेखिन्छ।' } }
  ];

  /* ---------------------------------------------------------------
     THE NOTATION — one SVG, redrawn when the cardinality changes.

     Entity and relationship names stay in English in every mode: they
     are ER notation the SEE paper prints in English (LANGUAGE-SYSTEM
     §8). The meaning is carried by the bilingual sentence below, which
     is where a Nepali-mode student reads it.
     --------------------------------------------------------------- */
  function notation(model, card, focus){
    var marks = null;
    for (var i = 0; i < CARDS.length; i++) if (CARDS[i].id === card) marks = CARDS[i].mark;
    marks = marks || ['1', 'M'];

    var f = function (id){ return focus === id ? ' is-focus' : ''; };

    return '' +
    '<svg viewBox="0 0 640 200" class="er-svg" role="img" aria-label="' +
      esc(model.left.name + ' ' + model.rel + ' ' + model.right.name + ', ' + card) + '">' +
      /* connecting lines first, so the shapes sit on top of them */
      '<line class="er-line" x1="150" y1="100" x2="255" y2="100"/>' +
      '<line class="er-line" x1="385" y1="100" x2="490" y2="100"/>' +

      '<text class="er-card" x="200" y="88">' + esc(marks[0]) + '</text>' +
      '<text class="er-card" x="440" y="88">' + esc(marks[1]) + '</text>' +

      /* left entity */
      '<rect class="er-entity' + f('entity') + '" x="30" y="70" width="120" height="60" rx="3"/>' +
      '<text class="er-name" x="90" y="105">' + esc(model.left.name) + '</text>' +

      /* relationship diamond */
      '<path class="er-rel' + f('relationship') + '" d="M320,60 L385,100 L320,140 L255,100 Z"/>' +
      '<text class="er-name er-rel-name" x="320" y="105">' + esc(model.rel) + '</text>' +

      /* right entity */
      '<rect class="er-entity' + f('entity') + '" x="490" y="70" width="120" height="60" rx="3"/>' +
      '<text class="er-name" x="550" y="105">' + esc(model.right.name) + '</text>' +

      /* the key attribute of each entity — underlined, per notation */
      '<line class="er-line" x1="90" y1="70" x2="90" y2="42"/>' +
      '<ellipse class="er-attr' + f('key') + '" cx="90" cy="28" rx="58" ry="17"/>' +
      '<text class="er-attr-name er-key" x="90" y="33">' + esc(model.left.pk) + '</text>' +

      '<line class="er-line" x1="550" y1="70" x2="550" y2="42"/>' +
      '<ellipse class="er-attr' + f('key') + '" cx="550" cy="28" rx="58" ry="17"/>' +
      '<text class="er-attr-name er-key" x="550" y="33">' + esc(model.right.pk) + '</text>' +
    '</svg>';
  }

  /* ---------------------------------------------------------------
     THE OCCURRENCES — the half a static diagram cannot show.
     Plain HTML rather than SVG so it reflows on a 320px phone.
     --------------------------------------------------------------- */
  function occurrences(model, card){
    var links = model.links[card] || model.links['1:M'];
    var h = '<div class="er-occ">';

    h += '<div class="er-occ-head"><span class="t-en">What that means row by row</span>' +
         '<span class="np-cell" lang="ne">पङ्क्ति–पङ्क्तिमा त्यसको अर्थ</span></div>';

    h += '<ul class="er-occ-list">';
    for (var i = 0; i < model.left.occ.length; i++){
      var to = (links[i] || []).map(function (k){ return model.right.occ[k]; });
      h += '<li class="er-occ-row' + (to.length > 1 ? ' is-many' : '') + '">' +
           '<span class="er-occ-l">' + esc(model.left.occ[i]) + '</span>' +
           '<span class="er-occ-arrow" aria-hidden="true">→</span>' +
           '<span class="er-occ-r">' +
             (to.length ? to.map(function (x){ return '<b>' + esc(x) + '</b>'; }).join(', ')
                        : '<span class="dt-null">none</span>') +
           '</span></li>';
    }
    h += '</ul>';

    /* How many left-rows point at each right-row: the number that makes
       M:N different from 1:M, and the one students never look at. */
    var back = {};
    for (var a = 0; a < links.length; a++){
      (links[a] || []).forEach(function (k){ back[k] = (back[k] || 0) + 1; });
    }
    var shared = Object.keys(back).filter(function (k){ return back[k] > 1; });
    h += '<p class="er-occ-note">';
    if (shared.length){
      h += '<span class="t-en">Now look back the other way: <b>' +
           esc(model.right.occ[shared[0]]) + '</b> is linked from ' + back[shared[0]] +
           ' rows of ' + esc(model.left.name) + '. Both directions are "many" — that is what makes this M:N.</span>' +
           '<span class="np-cell" lang="ne">अब उल्टो हेर्नुहोस्: <b>' + esc(model.right.occ[shared[0]]) +
           '</b> लाई ' + esc(model.left.name) + ' का ' + back[shared[0]] +
           ' पङ्क्तिले जोडेका छन्। दुवैतर्फ "धेरै" — यसैले यो M:N हो।</span>';
    } else {
      h += '<span class="t-en">Look back the other way: every ' + esc(model.right.name) +
           ' row points at exactly one ' + esc(model.left.name) +
           ' row. That is why this is not many-to-many.</span>' +
           '<span class="np-cell" lang="ne">उल्टो हेर्नुहोस्: ' + esc(model.right.name) +
           ' को हरेक पङ्क्तिले ' + esc(model.left.name) +
           ' को ठ्याक्कै एउटा पङ्क्ति देखाउँछ। त्यसैले यो धेरै–धेरै होइन।</span>';
    }
    h += '</p></div>';
    return h;
  }

  /* The junction table, shown only for M:N — because that is the point:
     it exists only when the relationship forces it. */
  function junction(model){
    var links = model.links['M:N'];
    var cols = [model.left.name.toLowerCase() + '_ref', model.right.name.toLowerCase() + '_ref'];
    var rows = [];
    for (var i = 0; i < links.length; i++){
      (links[i] || []).forEach(function (k){
        rows.push([model.left.occ[i], model.right.occ[k]]);
      });
    }
    var name = model.left.name.charAt(0) + model.left.name.slice(1).toLowerCase() + '_' +
               model.right.name.charAt(0) + model.right.name.slice(1).toLowerCase();
    return '<div class="er-junction">' +
      '<p class="er-junction-h"><span class="t-en">M:N forces a third table — one row per link</span>' +
      '<span class="np-cell" lang="ne">M:N ले तेस्रो तालिका बनाउन बाध्य पार्छ — हरेक जोडका लागि एक पङ्क्ति</span></p>' +
      (global.DbTable ? global.DbTable.render(name, cols, rows, { counts: false }) : '') +
      '</div>';
  }

  /* ---------------------------------------------------------------
     ONE MOUNTED VISUALISER
     --------------------------------------------------------------- */
  function ErLab(root){
    this.root = root;
    var key = root.getAttribute('data-model') || 'class-student';
    this.model = MODELS[key] || MODELS['class-student'];
    this.mode = root.getAttribute('data-mode') || 'cardinality';
    this.card = root.getAttribute('data-card') || this.model.natural;
    this.part = null;
    this.render();
  }

  ErLab.prototype.card_ = function (){
    for (var i = 0; i < CARDS.length; i++) if (CARDS[i].id === this.card) return CARDS[i];
    return CARDS[1];
  };
  ErLab.prototype.part_ = function (){
    for (var i = 0; i < PARTS.length; i++) if (PARTS[i].id === this.part) return PARTS[i];
    return null;
  };

  ErLab.prototype.render = function (){
    var self = this, h = '';

    if (this.mode === 'parts'){
      h += '<div class="er-picker" role="group" aria-label="Choose an ER component">';
      h += PARTS.map(function (p){
        return '<button type="button" class="er-pick" data-er-part="' + p.id + '"' +
               ' aria-pressed="' + (self.part === p.id) + '">' +
               '<span class="t-en">' + esc(p.label.en) + '</span>' +
               '<span class="t-ne"><span class="t-en"> · </span>' + esc(p.label.ne) + '</span></button>';
      }).join('');
      h += '</div>';
    } else {
      h += '<div class="er-picker" role="group" aria-label="Choose a mapping cardinality">';
      h += CARDS.map(function (c){
        return '<button type="button" class="er-pick' + (self.card === c.id ? ' primary' : '') +
               '" data-er-card="' + c.id + '" aria-pressed="' + (self.card === c.id) + '">' +
               '<code>' + esc(c.id) + '</code> ' +
               '<span class="t-en">' + esc(c.label.en) + '</span>' +
               '<span class="t-ne"><span class="t-en"> · </span>' + esc(c.label.ne) + '</span></button>';
      }).join('');
      h += '</div>';
    }

    h += '<div class="er-figure">' + notation(this.model, this.card, this.part) + '</div>';

    if (this.mode === 'parts'){
      var p = this.part_();
      h += '<div class="er-say" role="status">';
      if (p){
        h += '<span class="er-shape"><span class="t-en">Drawn as: ' + esc(p.shape) + '</span>' +
             '<span class="np-cell" lang="ne">आकार: ' + esc(p.shape) + '</span></span>' +
             '<span class="t-en">' + esc(p.say.en) + '</span>' +
             '<span class="np-cell" lang="ne">' + esc(p.say.ne) + '</span>';
      } else {
        h += '<span class="t-en">Choose a component above to see its shape and what it means.</span>' +
             '<span class="np-cell" lang="ne">माथिबाट एउटा भाग छान्नुहोस् — त्यसको आकार र अर्थ देखिनेछ।</span>';
      }
      h += '</div>';
    } else {
      var c = this.card_();
      h += occurrences(this.model, this.card);
      h += '<div class="er-say" role="status">' +
           '<span class="t-en">' + esc(c.say.en) + '</span>' +
           '<span class="np-cell" lang="ne">' + esc(c.say.ne) + '</span></div>';
      h += '<div class="er-tables"><span class="er-tables-h">' +
           '<span class="t-en">How many tables this needs</span>' +
           '<span class="np-cell" lang="ne">यसलाई कति तालिका चाहिन्छ</span></span>' +
           '<span class="t-en">' + esc(c.table.en) + '</span>' +
           '<span class="np-cell" lang="ne">' + esc(c.table.ne) + '</span></div>';
      if (this.card === 'M:N') h += junction(this.model);
    }

    this.root.innerHTML = h;
    this.wire();
  };

  ErLab.prototype.wire = function (){
    var self = this, i;

    var cards = this.root.querySelectorAll('[data-er-card]');
    for (i = 0; i < cards.length; i++){
      cards[i].addEventListener('click', function (){
        self.card = this.getAttribute('data-er-card');
        self.render();
        var again = self.root.querySelector('[data-er-card="' + self.card + '"]');
        if (again) again.focus();
      });
    }

    var parts = this.root.querySelectorAll('[data-er-part]');
    for (i = 0; i < parts.length; i++){
      parts[i].addEventListener('click', function (){
        var id = this.getAttribute('data-er-part');
        self.part = (self.part === id) ? null : id;
        self.render();
        var again = self.root.querySelector('[data-er-part="' + id + '"]');
        if (again) again.focus();
      });
    }
  };

  ErLab.prototype.reset = function (){
    this.card = this.model.natural;
    this.part = null;
    this.render();
  };

  /* ---------------------------------------------------------------
     MOUNT
     --------------------------------------------------------------- */
  function mountAll(){
    if (typeof document === 'undefined') return;
    var nodes = document.querySelectorAll('.erlab');
    for (var i = 0; i < nodes.length; i++){
      (function (root, n){
        if (root.getAttribute('data-mounted')) return;
        root.setAttribute('data-mounted', '1');
        var lab = new ErLab(root);
        root._lab = lab;
        if (global.SimulationService){
          global.SimulationService.register({
            id: 'er:' + (root.id || ('erlab' + n)),
            subject: 'grade10/dbms', unit: 'u2',
            title: { en: 'ER model visualiser', ne: 'ER मोडेल भिजुअलाइजर' },
            mounts: function (){ return !!root.parentNode; },
            reset: function (){ lab.reset(); },
            controls: CARDS.map(function (c){
              return { id: c.id, label: { en: 'Show ' + c.label.en, ne: c.label.ne + ' देखाउनुहोस्' } };
            })
          });
        }
      })(nodes[i], i);
    }
  }

  function ready(fn){
    if (typeof document === 'undefined') return;
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }
  ready(mountAll);

  global.ErLab = { MODELS: MODELS, CARDS: CARDS, PARTS: PARTS, mount: mountAll, Lab: ErLab };
  if (typeof module !== 'undefined' && module.exports) module.exports = global.ErLab;

})(typeof window !== 'undefined' ? window : globalThis);
