/* =========================================================
   DECISION DRILL — a reusable "judge this case" component

   WHY THIS EXISTS, AND WHY IT IS NOT A QUIZ

   Several SEE questions are not recall and not calculation. They are
   JUDGEMENTS made against a rule:

       this table — which normal form does it break?
       this log   — redo or undo?
       this pair  — one-to-many or many-to-many?

   A student who knows the rule can still get these wrong, because the
   skill is applying it to a case they have not seen. That skill comes
   from doing it several times with immediate reasons, which is exactly
   what a quiz does not give: a quiz asks once, scores, and moves on.

   So a drill is a short sequence of cases on ONE rule, with the reason
   shown the moment the student commits — and the reason names the rule,
   so a wrong answer teaches rather than just deducts.

   WHY IT IS ONE COMPONENT AND NOT THREE
   The three units above need the same interaction and differ only in
   their cases. Building three would be three places for the same bug.
   A lesson picks a set; a future unit adds a set, not a component.

   MARKUP CONTRACT

     <div class="drill" data-set="normalforms"></div>
     <div class="drill" data-set="recovery"></div>

   ========================================================= */
(function (global) {
  'use strict';

  var esc = (global.DbTable && global.DbTable.esc) || function (s){
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };

  /* Many option labels are the same in both languages — "1NF", "1:1",
     "DBMS" are terminology, not prose. Rendering both halves gives
     "1:11:1", which is the collision Phase 3.1 fixed on the gate
     workbench and the quiz. Identical halves are a VALUE, not a
     translation, so they collapse to one unwrapped label that shows in
     every mode. */
  function pair(p){
    var en = String(p.en || ''), ne = String(p.ne || '');
    if (!ne || ne.trim() === en.trim()) return esc(en);
    return '<span class="t-en">' + esc(en) + '</span>' +
           '<span class="t-ne">' + esc(ne) + '</span>';
  }

  /* Each set is one rule, drilled. `pre` is monospaced evidence — a
     table definition, a log — shown above the question. */
  var SETS = {

    /* ---- Unit 5: which normal form does this break? ---- */
    normalforms: {
      title: { en: 'Which normal form does this break?', ne: 'यसले कुन normal form तोड्छ?' },
      lead: {
        en: 'Read the table, decide which rule it breaks first, and commit before you check. Work down the forms in order — a table that breaks 1NF is not yet worth testing against 2NF.',
        ne: 'तालिका पढ्नुहोस्, पहिले कुन नियम तोड्छ छान्नुहोस्, अनि जाँच्नुहोस्। क्रमैसँग हेर्नुहोस् — 1NF नै नतोडेको तालिकालाई मात्र 2NF मा जाँच्ने हो।'
      },
      options: [
        { id: '1nf', label: { en: '1NF', ne: '1NF' } },
        { id: '2nf', label: { en: '2NF', ne: '2NF' } },
        { id: '3nf', label: { en: '3NF', ne: '3NF' } },
        { id: 'ok', label: { en: 'Already in 3NF', ne: 'पहिले नै 3NF मा' } }
      ],
      cases: [
        {
          pre: 'Student( roll, name, subjects )\n\n1  Ram   "Maths, Science"\n2  Sita  "Maths"',
          answer: '1nf',
          why: {
            en: 'One cell holds two values. 1NF requires every cell to be atomic, so this fails at the first form — split it into one row per subject before testing anything else.',
            ne: 'एउटै कक्षमा दुई मान छन्। 1NF ले हरेक कक्ष अविभाज्य हुनुपर्ने माग्छ, त्यसैले पहिलो रूपमै असफल — अरू जाँच्नुअघि हरेक विषयलाई छुट्टै पङ्क्तिमा बाँड्नुहोस्।'
          }
        },
        {
          pre: 'Takes( roll, subject, student_name )\n\nkey = ( roll, subject )\nstudent_name depends on roll only',
          answer: '2nf',
          why: {
            en: 'The key is both columns together, but student_name depends on roll alone — a PARTIAL dependency, which is exactly what 2NF forbids. Every cell is atomic, so 1NF is satisfied.',
            ne: 'कुञ्जी दुवै स्तम्भ मिलेर हो, तर student_name roll मा मात्र निर्भर छ — PARTIAL निर्भरता, जुन 2NF ले निषेध गर्छ। हरेक कक्ष अविभाज्य भएकाले 1NF पूरा भएको छ।'
          }
        },
        {
          pre: 'Student( roll, name, class_id, class_room )\n\nkey = ( roll )\nclass_room depends on class_id\nclass_id  depends on roll',
          answer: '3nf',
          why: {
            en: 'class_room depends on class_id, which is not a key — a TRANSITIVE dependency. The key is a single column so there is no part of it to depend on, which is why 2NF is already satisfied.',
            ne: 'class_room, class_id मा निर्भर छ र class_id कुञ्जी होइन — TRANSITIVE निर्भरता। कुञ्जी एउटै स्तम्भ भएकाले त्यसको "भाग" हुँदैन, त्यसैले 2NF पहिले नै पूरा छ।'
          }
        },
        {
          pre: 'Class( class_id, room )\n\nkey = ( class_id )\nroom depends on class_id and nothing else',
          answer: 'ok',
          why: {
            en: 'Atomic values, a single-column key so no partial dependency is possible, and the one non-key column depends on the key directly. Nothing left to remove — this is 3NF.',
            ne: 'अविभाज्य मान, एउटै स्तम्भको कुञ्जी भएकाले partial निर्भरता सम्भव छैन, र कुञ्जी नभएको एउटै स्तम्भ सिधै कुञ्जीमा निर्भर छ। हटाउनुपर्ने केही छैन — यो 3NF हो।'
          }
        },
        {
          pre: 'Order( order_id, item, customer_id, customer_city )\n\nkey = ( order_id, item )',
          answer: '2nf',
          why: {
            en: 'customer_id and customer_city both depend on order_id alone, not on the whole key — partial dependency, so 2NF fails first. A transitive dependency is also present, but you fix the earlier form first.',
            ne: 'customer_id र customer_city दुवै order_id मा मात्र निर्भर छन्, पूरै कुञ्जीमा होइन — partial निर्भरता, त्यसैले पहिले 2NF असफल। Transitive निर्भरता पनि छ, तर पहिलेको रूप पहिले सुधार्ने।'
          }
        }
      ]
    },

    /* ---- Unit 7: redo or undo? ---- */
    recovery: {
      title: { en: 'Redo or undo?', ne: 'Redo कि undo?' },
      lead: {
        en: 'The system has crashed and this is what the log holds. Decide what recovery does with the transaction. There is only ONE test, and it is not how much work was done.',
        ne: 'प्रणाली crash भयो र log मा यति छ। Recovery ले त्यो ट्रान्ज्याक्सनलाई के गर्छ छान्नुहोस्। जाँच एउटै हो, र त्यो "कति काम भयो" भन्ने होइन।'
      },
      options: [
        { id: 'redo', label: { en: 'REDO it', ne: 'REDO गर्ने' } },
        { id: 'undo', label: { en: 'UNDO it', ne: 'UNDO गर्ने' } }
      ],
      cases: [
        {
          pre: 'T1 start\nT1 write A = 50\nT1 COMMIT\n-- CRASH --',
          answer: 'redo',
          why: {
            en: 'There is a COMMIT record, so the transaction promised durability and its work must exist. Recovery reads the log forwards and applies the change again.',
            ne: 'COMMIT रेकर्ड छ, त्यसैले ट्रान्ज्याक्सनले durability को वचन दिइसकेको छ र काम रहनुपर्छ। Recovery ले log अगाडिबाट पढेर परिवर्तन फेरि लागू गर्छ।'
          }
        },
        {
          pre: 'T2 start\nT2 write B = 10\nT2 write C = 20\n-- CRASH --',
          answer: 'undo',
          why: {
            en: 'No COMMIT record. It does not matter that TWO writes had already happened — atomicity says half a transaction may not survive, so the log is read backwards and both are reversed.',
            ne: 'COMMIT रेकर्ड छैन। दुई पटक लेखिसकेको थियो भन्नेले फरक पार्दैन — atomicity अनुसार आधा ट्रान्ज्याक्सन बाँच्न पाउँदैन, त्यसैले log पछाडिबाट पढेर दुवै उल्टाइन्छ।'
          }
        },
        {
          pre: 'T3 start\nT3 COMMIT\n-- CRASH --',
          answer: 'redo',
          why: {
            en: 'It committed, so it is redone — even though it wrote almost nothing. The amount of work is never the test; the COMMIT record is.',
            ne: 'Commit भएको छ, त्यसैले redo — झन्डै केही नलेखेको भए पनि। कति काम भयो भन्ने कहिल्यै जाँच होइन; COMMIT रेकर्ड नै जाँच हो।'
          }
        },
        {
          pre: 'T4 start\nT4 write D = 5\nT4 ROLLBACK\n-- CRASH --',
          answer: 'undo',
          why: {
            en: 'It rolled back deliberately, so there is no COMMIT record and its changes must not survive. A rollback and a crash without commit end in the same place: aborted.',
            ne: 'यसले जानाजान rollback गर्‍यो, त्यसैले COMMIT रेकर्ड छैन र परिवर्तन बाँच्नु हुँदैन। Rollback र commit नभई crash — दुवैको अन्त्य उही हो: aborted।'
          }
        }
      ]
    },

    /* ---- Unit 1: data, information, database or DBMS? ---- */
    dbterms: {
      title: { en: 'Data, information, database or DBMS?', ne: 'Data, information, database कि DBMS?' },
      lead: {
        en: 'The four words of 1.1, drilled on real cases. The one students lose a mark on is calling the software "the database" — so decide carefully which of those two you are looking at.',
        ne: '१.१ का चार शब्द, वास्तविक उदाहरणमा। विद्यार्थीले अंक गुमाउने ठाउँ एउटै हो — सफ्टवेयरलाई "डाटाबेस" भन्नु। त्यसैले ती दुईमध्ये कुन हो ध्यान दिएर छान्नुहोस्।'
      },
      options: [
        { id: 'data', label: { en: 'Data', ne: 'Data' } },
        { id: 'info', label: { en: 'Information', ne: 'Information' } },
        { id: 'db', label: { en: 'Database', ne: 'Database' } },
        { id: 'dbms', label: { en: 'DBMS', ne: 'DBMS' } }
      ],
      cases: [
        {
          pre: 'MySQL',
          answer: 'dbms',
          why: {
            en: 'MySQL is software — it creates, manages and controls access to a database. The database is the data it looks after. This is the single most common slip in the unit.',
            ne: 'MySQL सफ्टवेयर हो — यसले डाटाबेस बनाउँछ, व्यवस्थापन गर्छ र पहुँच नियन्त्रण गर्छ। डाटाबेस भनेको यसले हेर्ने data हो। युनिटको सबैभन्दा सामान्य गल्ती यही हो।'
          }
        },
        {
          pre: '78',
          answer: 'data',
          why: {
            en: 'A raw fact with no meaning attached. 78 what? Of whom? Until those are answered it is data, not information.',
            ne: 'अर्थ नजोडिएको काँचो तथ्य। ७८ के को? कसको? यी उत्तर नआएसम्म यो data हो, information होइन।'
          }
        },
        {
          pre: '"Ram scored 78 in class 10"',
          answer: 'info',
          why: {
            en: 'The same fact, processed and given meaning. Information is what data becomes once you can act on it.',
            ne: 'उही तथ्य, प्रशोधन गरेर अर्थ दिइएको। Data मा काम गर्न सकिने भएपछि त्यो information बन्छ।'
          }
        },
        {
          pre: 'The Student table, holding 400 rows\nof student records at this school',
          answer: 'db',
          why: {
            en: 'An organised collection of related data. Note that the software managing it is a separate thing — that separation is the whole point of the question.',
            ne: 'सम्बन्धित data को व्यवस्थित सङ्ग्रह। यसलाई व्यवस्थापन गर्ने सफ्टवेयर छुट्टै कुरा हो — यही छुट्याइ नै प्रश्नको सार हो।'
          }
        },
        {
          pre: 'Oracle',
          answer: 'dbms',
          why: {
            en: 'Another DBMS, like MySQL and MS Access. If you can install it, it is software; if it holds your rows, it is the database.',
            ne: 'MySQL र MS Access जस्तै अर्को DBMS। install गर्न मिल्ने भए सफ्टवेयर; तपाईंका पङ्क्ति राख्ने भए डाटाबेस।'
          }
        }
      ]
    },

    /* ---- Unit 2: which cardinality? ---- */
    cardinality: {
      title: { en: 'Which mapping cardinality?', ne: 'कुन mapping cardinality?' },
      lead: {
        en: 'Read both directions before you answer. A sentence that only tells you one direction has not told you the cardinality.',
        ne: 'उत्तर दिनुअघि दुवै दिशा पढ्नुहोस्। एउटा दिशा मात्र बताउने वाक्यले cardinality बताएकै हुँदैन।'
      },
      options: [
        { id: '1:1', label: { en: '1:1', ne: '1:1' } },
        { id: '1:M', label: { en: '1:M', ne: '1:M' } },
        { id: 'M:N', label: { en: 'M:N', ne: 'M:N' } }
      ],
      cases: [
        {
          pre: 'A CLASS contains many STUDENTS.\nEach STUDENT is in exactly one CLASS.',
          answer: '1:M',
          why: {
            en: 'Many one way, one the other. The second sentence is what settles it — without it this could equally have been many-to-many.',
            ne: 'एकातिर धेरै, अर्कोतिर एक। दोस्रो वाक्यले नै तय गर्छ — त्यो नभए यो धेरै–धेरै पनि हुन सक्थ्यो।'
          }
        },
        {
          pre: 'A STUDENT takes many COURSES.\nA COURSE is taken by many STUDENTS.',
          answer: 'M:N',
          why: {
            en: 'Many in both directions, so no single foreign key can record it. This is the one that forces a third table.',
            ne: 'दुवै दिशामा धेरै, त्यसैले एउटै foreign key ले राख्न सक्दैन। तेस्रो तालिका बाध्य पार्ने यही हो।'
          }
        },
        {
          pre: 'A CITIZEN has one CITIZENSHIP NUMBER.\nA CITIZENSHIP NUMBER belongs to one CITIZEN.',
          answer: '1:1',
          why: {
            en: 'One in both directions. Two tables still, and the foreign key may sit in either one.',
            ne: 'दुवै दिशामा एक। तालिका दुई नै हुन्छन्, र foreign key जुनसुकैमा राख्न सकिन्छ।'
          }
        },
        {
          pre: 'A DOCTOR treats many PATIENTS.\nA PATIENT may be treated by several DOCTORS.',
          answer: 'M:N',
          why: {
            en: '"May be treated by several" is the second "many". Read carefully — the wording is softer than in the course example, but the cardinality is the same.',
            ne: '"धेरै डाक्टरले उपचार गर्न सक्छन्" भन्नु नै दोस्रो "धेरै" हो। शब्द नरम छ, तर cardinality उही।'
          }
        },
        {
          pre: 'A DEPARTMENT is headed by one TEACHER.\nA TEACHER heads at most one DEPARTMENT.',
          answer: '1:1',
          why: {
            en: 'Both directions are "at most one". A teacher works in a department alongside others, but HEADS only one — the relationship named is what you judge, not the entities.',
            ne: 'दुवै दिशा "बढीमा एक"। शिक्षक विभागमा अरूसँगै काम गर्छन्, तर नेतृत्व एउटैको गर्छन् — इन्टिटी होइन, नाम दिइएको सम्बन्ध हेर्ने हो।'
          }
        }
      ]
    }
  };

  /* ---------------------------------------------------------------
     ONE MOUNTED DRILL
     --------------------------------------------------------------- */
  function Drill(root){
    this.root = root;
    var key = root.getAttribute('data-set') || 'normalforms';
    this.set = SETS[key] || SETS.normalforms;
    this.reset(true);
  }

  Drill.prototype.reset = function (first){
    this.i = 0;
    this.chosen = null;
    this.right = 0;
    this.done = 0;
    this.render();
    if (!first){
      var b = this.root.querySelector('.drill-opt');
      if (b) b.focus();
    }
  };

  Drill.prototype.current = function (){ return this.set.cases[this.i]; };

  /* A stable id per instance, so aria-labelledby survives a re-render
     and two drills on one page cannot collide. */
  Drill.prototype.id = function (s){
    if (!this._id) this._id = this.root.id || ('drill' + Math.floor(Math.random() * 1e6));
    return this._id + '-' + s;
  };

  Drill.prototype.render = function (){
    var self = this, c = this.current(), h = '';

    var titleId = this.id('title');

    h += '<div class="drill-head">' +
         '<span class="drill-title" id="' + titleId + '">' +
         '<span class="t-en">' + esc(this.set.title.en) + '</span>' +
         '<span class="np-cell" lang="ne">' + esc(this.set.title.ne) + '</span></span>' +
         '<span class="drill-count">' + (this.i + 1) + ' / ' + this.set.cases.length + '</span>' +
         '</div>';

    h += '<p class="drill-lead"><span class="t-en">' + esc(this.set.lead.en) + '</span>' +
         '<span class="np-cell" lang="ne">' + esc(this.set.lead.ne) + '</span></p>';

    h += '<pre class="drill-pre">' + esc(c.pre) + '</pre>';

    /* Named by the drill's own question rather than by a generic label.
       Several option sets are bare values — "1:1", "1NF" — and read
       aloud in isolation they say nothing. Pointing at the title means
       a listener entering the group hears what is being asked, and it
       stays bilingual because the title element already is. */
    h += '<div class="drill-opts" role="group" aria-labelledby="' + titleId + '">';
    h += this.set.options.map(function (o){
      var state = '';
      if (self.chosen){
        if (o.id === c.answer) state = ' is-right';
        else if (o.id === self.chosen) state = ' is-wrong';
      }
      return '<button type="button" class="drill-opt' + state + '" data-drill-opt="' + esc(o.id) + '"' +
             (self.chosen ? ' disabled' : '') +
             ' aria-pressed="' + (self.chosen === o.id) + '">' +
             pair(o.label) + '</button>';
    }).join('');
    h += '</div>';

    /* The verdict is short, so it is safe to announce; the reason sits
       beside it and is read when the student wants it. */
    h += '<p class="drill-verdict" role="status">' + this.verdictHtml() + '</p>';

    if (this.chosen){
      h += '<div class="drill-why"><span class="t-en">' + esc(c.why.en) + '</span>' +
           '<span class="np-cell" lang="ne">' + esc(c.why.ne) + '</span></div>';
      h += '<div class="sim-controls">';
      if (this.i < this.set.cases.length - 1){
        h += '<button type="button" class="primary" data-drill-act="next" data-ui="next">Next &#9656;</button>';
      }
      h += '<button type="button" class="coral" data-drill-act="reset" data-ui="restart">Start again</button></div>';
    }

    this.root.innerHTML = h;
    if (global.UIStrings && global.UIStrings.apply) global.UIStrings.apply(this.root);
    this.wire();
  };

  Drill.prototype.verdictHtml = function (){
    if (!this.chosen) return '';
    var right = this.chosen === this.current().answer;
    var last = this.i === this.set.cases.length - 1;
    var score = last ? ' ' + this.right + ' of ' + this.set.cases.length + ' correct.' : '';
    var scoreNe = last ? ' ' + this.set.cases.length + ' मध्ये ' + this.right + ' सही।' : '';
    return '<span class="t-en">' + (right ? 'Correct.' : 'Not this one.') + score + '</span>' +
           '<span class="np-cell" lang="ne">' + (right ? 'ठिक भयो।' : 'यो होइन।') + scoreNe + '</span>';
  };

  Drill.prototype.choose = function (id){
    if (this.chosen) return;
    this.chosen = id;
    this.done++;
    if (id === this.current().answer) this.right++;
    this.render();
  };

  Drill.prototype.next = function (){
    if (this.i >= this.set.cases.length - 1) return;
    this.i++;
    this.chosen = null;
    this.render();
    var b = this.root.querySelector('.drill-opt');
    if (b) b.focus();
  };

  Drill.prototype.wire = function (){
    var self = this, i;
    var opts = this.root.querySelectorAll('[data-drill-opt]');
    for (i = 0; i < opts.length; i++){
      opts[i].addEventListener('click', function (){
        self.choose(this.getAttribute('data-drill-opt'));
      });
    }
    var nx = this.root.querySelector('[data-drill-act="next"]');
    if (nx) nx.addEventListener('click', function (){ self.next(); });
    var rs = this.root.querySelector('[data-drill-act="reset"]');
    if (rs) rs.addEventListener('click', function (){ self.reset(); });
  };

  /* ---------------------------------------------------------------
     MOUNT
     --------------------------------------------------------------- */
  function mountAll(){
    if (typeof document === 'undefined') return;
    var nodes = document.querySelectorAll('.drill');
    for (var i = 0; i < nodes.length; i++){
      (function (root, n){
        if (root.getAttribute('data-mounted')) return;
        root.setAttribute('data-mounted', '1');
        var d = new Drill(root);
        root._drill = d;
        if (global.SimulationService){
          global.SimulationService.register({
            id: 'drill:' + (root.id || ('drill' + n)),
            subject: 'grade10/dbms', unit: root.getAttribute('data-set') || 'drill',
            title: { en: 'Decision drill', ne: 'निर्णय अभ्यास' },
            mounts: function (){ return !!root.parentNode; },
            reset: function (){ d.reset(); },
            controls: [
              { id: 'choose', label: { en: 'Choose an answer', ne: 'उत्तर छान्नुहोस्' } },
              { id: 'next',   label: { en: 'Next case', ne: 'अर्को केस' } }
            ]
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

  global.Drill = { SETS: SETS, mount: mountAll, Drill: Drill };
  if (typeof module !== 'undefined' && module.exports) module.exports = global.Drill;

})(typeof window !== 'undefined' ? window : globalThis);
