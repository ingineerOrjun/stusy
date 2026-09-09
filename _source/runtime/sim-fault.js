/* =========================================================
   FAULT LAB — diagnosis as a sequence of decisions

   WHY THIS IS NOT A DRILL
   sim-drill.js asks "which of these is it?" and marks the answer. That
   is the right shape for a classification — P-type or N-type — and the
   wrong shape for a fault, because a fault is not identified in one
   step. It is narrowed. The student is shown a symptom, decides what to
   CHECK, learns what that check ruled in and ruled out, and decides
   again from the smaller set of possibilities.

   Unit 4 is twelve hours of exactly that skill and the practical exam
   asks for it directly, so it needed a component that can branch.

   THE THING THIS TEACHES THAT A QUIZ CANNOT
   A check can be correct and still be a bad move. Opening the case to
   reseat the RAM when you have not yet confirmed the monitor is plugged
   in is not WRONG — the RAM might well be the fault — it is expensive
   and out of order. So every choice carries a `quality`:

     good      — narrows the most for the least effort
     wasteful  — legitimate, but a later step; says what it cost
     unsafe    — never do this; says why, and does not advance

   A student who only ever hears "correct" and "incorrect" learns to
   guess. One who hears "that would have worked, but it costs twenty
   minutes and you had not ruled out the cable" learns the order.

   NOTHING IS REVEALED FOR FREE
   The diagnosis appears only when the branch reaches it. There is no
   "show answer" button, because the answer is not a fact — it is the
   path, and handing over the path teaches nothing.
   ========================================================= */
(function (global) {
  'use strict';

  var doc = global.document;
  if (!doc) return;

  function esc(s){
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  function bi(en, ne){
    return '<span class="t-en">' + esc(en) + '</span>' +
           '<span class="t-ne" lang="ne">' + esc(ne) + '</span>';
  }
  function biBlock(en, ne){
    return '<span class="t-en">' + esc(en) + '</span>' +
           '<span class="np-cell" lang="ne">' + esc(ne) + '</span>';
  }

  var SCENARIOS = {

    /* ---- Unit 4: the classic. Powers on, nothing on screen. ---- */
    nodisplay: {
      title: { en: 'It powers on, but there is no display',
               ne: 'बिजुली आउँछ, तर स्क्रिनमा केही देखिँदैन' },
      symptom: { en: 'You press the power button. The fans spin and the power light is on. The screen stays completely black — no logo, no text, no error.',
                 ne: 'पावर बटन थिच्नुहुन्छ। पंखा घुम्छ, पावर बत्ती बल्छ। स्क्रिन पूरै कालो रहन्छ — कुनै लोगो छैन, अक्षर छैन, त्रुटि छैन।' },
      start: 'n1',
      nodes: {
        n1: {
          ask: { en: 'The machine has power. What do you check first?',
                 ne: 'मेसिनमा बिजुली छ। पहिले के जाँच्नुहुन्छ?' },
          checks: [
            { label: { en: 'Monitor power and the video cable at both ends',
                       ne: 'Monitor को पावर र दुवै छेउको video केबल' },
              quality: 'good', next: 'n2',
              verdict: { en: 'Right call — cheapest check first. The monitor light is on and the cable is firm at both ends, so the display path is not simply disconnected. Ruled out: monitor off, cable loose.',
                         ne: 'ठीक निर्णय — सबैभन्दा सस्तो जाँच पहिले। Monitor को बत्ती बलेको छ र केबल दुवै छेउमा कसिएको छ, त्यसैले display को बाटो केवल छुटेको होइन। हट्यो: monitor बन्द, केबल खुकुलो।' } },
            { label: { en: 'Open the case and reseat the RAM',
                       ne: 'केस खोलेर RAM फेरि बसाल्ने' },
              quality: 'wasteful', next: 'n2',
              verdict: { en: 'This may well be the fault, and you will come to it — but not yet. You have just opened a case, handled a static-sensitive component and spent fifteen minutes without ruling out a cable that takes five seconds. Do the outside before the inside.',
                         ne: 'खराबी यही हुन सक्छ, र तपाईं यहाँ आइपुग्नुहुनेछ — तर अहिले होइन। तपाईंले केस खोल्नुभयो, static ले बिगार्न सक्ने पार्ट छुनुभयो, र पाँच सेकेन्डमा जाँचिने केबल नहेरी पन्ध्र मिनेट खर्चनुभयो। भित्र भन्दा पहिले बाहिर हेर्नुहोस्।' } },
            { label: { en: 'Replace the power supply',
                       ne: 'पावर सप्लाई साट्ने' },
              quality: 'unsafe',
              verdict: { en: 'Stop. Replacing a part is not a diagnostic step — it is what you do AFTER a diagnosis. The fans are spinning, so the supply is delivering power. You would have spent money and still not known the cause.',
                         ne: 'रोकिनुहोस्। पार्ट साट्नु निदानको चरण होइन — निदान <b>पछि</b> गरिने काम हो। पंखा घुमिरहेको छ, त्यसैले सप्लाईले बिजुली दिइरहेको छ। पैसा खर्च हुन्थ्यो र कारण अझै थाहा हुँदैनथ्यो।' } }
          ]
        },
        n2: {
          ask: { en: 'The display path is connected. Now what does the machine itself tell you?',
                 ne: 'Display को बाटो जोडिएको छ। अब मेसिन आफैँले के भन्छ?' },
          checks: [
            { label: { en: 'Listen for beep codes at power-on',
                       ne: 'पावर लाग्दा बीप कोड सुन्ने' },
              quality: 'good', next: 'n3',
              verdict: { en: 'The POST is talking to you. You hear a repeating pattern of beeps. That is the BIOS reporting a fault it found before it could use the screen — which is exactly why the screen is blank.',
                         ne: 'POST ले तपाईंसँग कुरा गरिरहेको छ। दोहोरिने बीपको ढाँचा सुनिन्छ। यो BIOS ले स्क्रिन प्रयोग गर्न सक्नुअघि नै भेट्टाएको खराबी सुनाइरहेको हो — स्क्रिन खाली हुनुको कारण यही हो।' } },
            { label: { en: 'Try a different monitor you know works',
                       ne: 'चल्ने भनेर थाहा भएको अर्को monitor जोडेर हेर्ने' },
              quality: 'good', next: 'n3',
              verdict: { en: 'Good substitution test — swapping in a known-good part is a legitimate way to rule one out. The second monitor is also blank, so the monitor is not the fault. The problem is inside the system unit.',
                         ne: 'राम्रो प्रतिस्थापन परीक्षण — चल्ने भनेर थाहा भएको पार्ट राखेर हेर्नु कुनै एउटा सम्भावना हटाउने वैध तरिका हो। दोस्रो monitor पनि खाली छ, त्यसैले monitor खराबी होइन। समस्या सिस्टम युनिट भित्र छ।' } },
            { label: { en: 'Reinstall the operating system',
                       ne: 'अपरेटिङ सिस्टम फेरि इन्स्टल गर्ने' },
              quality: 'unsafe',
              verdict: { en: 'No. The screen is blank before any operating system would load — you are not even reaching the boot stage. Reinstalling would destroy the user\'s data to fix something the OS is not responsible for.',
                         ne: 'होइन। कुनै पनि अपरेटिङ सिस्टम लोड हुनुअघि नै स्क्रिन खाली छ — तपाईं boot चरणसम्म पुग्नु पनि भएको छैन। फेरि इन्स्टल गर्दा OS को दोष नभएको कुरा मिलाउन प्रयोगकर्ताको data नष्ट हुन्थ्यो।' } }
          ]
        },
        n3: {
          ask: { en: 'The POST beeps before video is available. Which component does that point to?',
                 ne: 'Video उपलब्ध हुनुअघि नै POST ले बीप गर्छ। यसले कुन भागतिर सङ्केत गर्छ?' },
          checks: [
            { label: { en: 'Reseat the RAM modules, one at a time',
                       ne: 'RAM मोड्युल एक–एक गरी फेरि बसाल्ने' },
              quality: 'good', next: 'done',
              verdict: { en: 'Now it is the right move, and it is confirmed rather than guessed. Memory is checked so early in the POST that a failure there happens before the BIOS can put anything on screen. One module was not fully seated; the clips were not down.',
                         ne: 'अब यो सही कदम हो, र अनुमान होइन — पुष्टि गरिएको हो। POST मा मेमोरी यति चाँडो जाँचिन्छ कि त्यहाँ असफल भएमा BIOS ले स्क्रिनमा केही देखाउनै पाउँदैन। एउटा मोड्युल पूरै बसेको थिएन; क्लिप तल परेका थिएनन्।' } },
            { label: { en: 'Check the hard disk cable',
                       ne: 'Hard disk को केबल जाँच्ने' },
              quality: 'wasteful',
              verdict: { en: 'Reasonable instinct, wrong stage. The hard disk is not read until well after the POST has finished and video is working. A disk fault gives you an error message ON the screen — it cannot give you a blank one.',
                         ne: 'सोचाइ ठीकै, तर चरण गलत। POST सकिएर video चलेपछि मात्र hard disk पढिन्छ। Disk को खराबीले स्क्रिन<b>मा</b> त्रुटि सन्देश देखाउँछ — खाली स्क्रिन दिन सक्दैन।' } }
          ]
        },
        done: {
          diagnosis: { en: 'Improperly seated RAM. The POST tests memory before it initialises video, so the machine reports the fault with beeps and never reaches the point where it could display anything.',
                       ne: 'RAM राम्ररी नबसेको। POST ले video सुरु गर्नुअघि मेमोरी जाँच्छ, त्यसैले मेसिनले बीपले खराबी सुनाउँछ र स्क्रिनमा केही देखाउन सक्ने अवस्थासम्म पुग्दैन।' },
          fix: { en: 'Power off and unplug. Press each module down until both clips close by themselves. Boot with one module to confirm, then add the rest. If the beeps continue with a known-good module, the slot itself is faulty.',
                 ne: 'बिजुली बन्द गरी प्लग निकाल्नुहोस्। दुवै क्लिप आफैँ बन्द नहुन्जेल हरेक मोड्युल थिच्नुहोस्। पुष्टिका लागि एउटा मोड्युल राखेर बुट गर्नुहोस्, अनि बाँकी थप्नुहोस्। चल्ने मोड्युल राख्दा पनि बीप जारी रहे slot नै बिग्रिएको हो।' }
        }
      }
    },

    /* ---- Unit 5: a maintenance fault with a misleading symptom ---- */
    overheat: {
      title: { en: 'It restarts by itself after a while',
               ne: 'केही बेरपछि आफैँ रिस्टार्ट हुन्छ' },
      symptom: { en: 'The computer starts normally and works fine. After twenty to thirty minutes — sooner if a heavy program is open — it shuts down or restarts with no warning and no error message.',
                 ne: 'कम्प्युटर सामान्य रूपमा सुरु हुन्छ र राम्रै चल्छ। बीस–तीस मिनेटपछि — भारी प्रोग्राम खोलेको भए अझ चाँडो — कुनै चेतावनी र त्रुटि सन्देशबिनै बन्द वा रिस्टार्ट हुन्छ।' },
      start: 'm1',
      nodes: {
        m1: {
          ask: { en: 'It works and then stops. What does the TIMING tell you?',
                 ne: 'चल्छ अनि रोकिन्छ। यो <b>समय</b> ले के बताउँछ?' },
          checks: [
            { label: { en: 'Note that it fails only after it has been running a while',
                       ne: 'केही बेर चलेपछि मात्र बिग्रिन्छ भन्ने कुरा टिप्ने' },
              quality: 'good', next: 'm2',
              verdict: { en: 'That is the whole clue. A fault present from the start is usually a connection or a component; a fault that appears only after the machine warms up is almost always thermal. Heavy programs making it sooner confirms it — they make more heat.',
                         ne: 'सङ्केत यही हो। सुरुदेखि रहेको खराबी प्रायः जडान वा पार्टको हुन्छ; मेसिन तातेपछि मात्र देखिने खराबी झन्डै सधैं तापसम्बन्धी हुन्छ। भारी प्रोग्रामले चाँडो बनाउनुले पुष्टि गर्छ — तिनले बढी ताप निकाल्छन्।' } },
            { label: { en: 'Scan for a virus',
                       ne: 'भाइरस स्क्यान गर्ने' },
              quality: 'wasteful', next: 'm2',
              verdict: { en: 'Worth doing eventually, and it comes back clean. But a virus does not usually wait for the machine to warm up, and it does not shut the power off — it is software, and a sudden power-off is not something software normally does.',
                         ne: 'पछि गर्नु लायक छ, र केही भेटिँदैन। तर भाइरसले मेसिन तात्ने कुर्दैन, र बिजुली नै काट्दैन — त्यो सफ्टवेयर हो, र अचानक बिजुली जानु सफ्टवेयरले सामान्यतया गर्ने काम होइन।' } }
          ]
        },
        m2: {
          ask: { en: 'You suspect heat. How do you confirm it before opening anything?',
                 ne: 'ताप हो कि भन्ने शंका छ। केही नखोली कसरी पुष्टि गर्नुहुन्छ?' },
          checks: [
            { label: { en: 'Read the temperatures in the BIOS setup screen',
                       ne: 'BIOS सेटअप स्क्रिनमा तापक्रम पढ्ने' },
              quality: 'good', next: 'm3',
              verdict: { en: 'The BIOS reports the processor temperature without loading the operating system, so nothing else is competing for the machine. It reads far above normal and is still climbing while you watch.',
                         ne: 'BIOS ले अपरेटिङ सिस्टम लोड नगरी प्रोसेसरको तापक्रम देखाउँछ, त्यसैले अरू केहीले मेसिन ओगटेको हुँदैन। यो सामान्यभन्दा धेरै माथि छ र हेर्दाहेर्दै बढिरहेको छ।' } },
            { label: { en: 'Feel whether air is coming out of the exhaust vent',
                       ne: 'निकास प्वालबाट हावा आइरहेको छ कि छैन छाम्ने' },
              quality: 'good', next: 'm3',
              verdict: { en: 'A quick and genuinely useful check. Almost no warm air is leaving, which means either a fan has stopped or the airflow path is blocked. You have narrowed it to cooling without any tools at all.',
                         ne: 'छिटो र साँच्चै काम लाग्ने जाँच। न्यानो हावा झन्डै निस्किरहेको छैन — अर्थात् या त पंखा रोकिएको छ, या हावाको बाटो बन्द छ। कुनै औजारबिनै तपाईंले cooling मा सीमित गर्नुभयो।' } }
          ]
        },
        m3: {
          ask: { en: 'It is overheating. What is the actual cause inside?',
                 ne: 'तात्ने पक्का भयो। भित्र वास्तविक कारण के हो?' },
          checks: [
            { label: { en: 'Open the case and inspect the heatsink, fan and vents',
                       ne: 'केस खोलेर heatsink, पंखा र प्वाल हेर्ने' },
              quality: 'good', next: 'done',
              verdict: { en: 'Now opening the case is justified — you know what you are looking for. The heatsink fins are packed with dust and the fan is turning slowly against it. The processor is making heat normally; it simply cannot get rid of it.',
                         ne: 'अब केस खोल्नु जायज छ — के खोज्ने हो थाहा छ। Heatsink का पत्रहरू धुलोले भरिएका छन् र पंखा त्यसैको प्रतिरोधमा बिस्तारै घुमिरहेको छ। प्रोसेसरले सामान्य रूपमै ताप निकालिरहेको छ; त्यो बाहिर जान मात्र सकेको छैन।' } },
            { label: { en: 'Replace the processor',
                       ne: 'प्रोसेसर साट्ने' },
              quality: 'unsafe',
              verdict: { en: 'Stop. The processor is doing nothing wrong — it is producing the heat it always produces. Replacing the most expensive component on the board would leave the blocked cooling in place, and the new processor would overheat exactly the same way.',
                         ne: 'रोकिनुहोस्। प्रोसेसरले केही गलत गरेको छैन — यसले सधैं निकाल्ने ताप नै निकालिरहेको छ। बोर्डकै सबैभन्दा महँगो पार्ट साट्दा बन्द भएको cooling त्यसै रहन्थ्यो, र नयाँ प्रोसेसर पनि ठ्याक्कै त्यसरी नै तात्थ्यो।' } }
          ]
        },
        done: {
          diagnosis: { en: 'Overheating caused by blocked cooling — dust in the heatsink fins and a fan slowed by it. The automatic thermal shutdown is not the fault; it is the protection working correctly to stop the processor being damaged.',
                       ne: 'Cooling बन्द भएर तात्नु — heatsink का पत्रमा धुलो, र त्यसैले ढिलो भएको पंखा। स्वतः बन्द हुनु खराबी होइन; प्रोसेसर बिग्रिनबाट जोगाउन सुरक्षा ठीकसँग काम गरेको हो।' },
          fix: { en: 'Power off and unplug. Clear the dust from the fins and fan with dry compressed air, never a wet cloth. Check the fan spins freely. Reapply thermal paste if the heatsink was removed. Then prevent the repeat: clean vents on a schedule and keep the case clear of the wall.',
                 ne: 'बिजुली बन्द गरी प्लग निकाल्नुहोस्। सुक्खा कम्प्रेस्ड एयरले पत्र र पंखाको धुलो हटाउनुहोस् — भिजेको कपडा कहिल्यै प्रयोग नगर्नुहोस्। पंखा स्वतन्त्र घुम्छ कि हेर्नुहोस्। Heatsink निकालेको भए thermal paste फेरि लगाउनुहोस्। अनि दोहोरिन नदिनुहोस्: तालिका बनाएर प्वाल सफा गर्नुहोस् र केस भित्ताबाट अलग राख्नुहोस्।' }
        }
      }
    }
  };

  /* ---------------------------------------------------------------
     ONE MOUNTED SCENARIO
     --------------------------------------------------------------- */
  function Fault(root){
    this.root = root;
    var key = root.getAttribute('data-scenario') || '';
    this.sc = SCENARIOS[key];
    if (!this.sc) return;
    this.reset(true);
    this.wire();
    this.mounted = true;
  }

  Fault.prototype.reset = function (first){
    this.at = this.sc.start;
    this.trail = [];
    this.checks = 0;
    this.render();
    if (!first && this.root.querySelector('.fault-ask')){
      /* Moving focus back to the question is what tells a keyboard or
         screen-reader user that the scenario actually restarted. */
      var h = this.root.querySelector('.fault-ask');
      h.setAttribute('tabindex', '-1');
      h.focus();
    }
  };

  Fault.prototype.render = function (){
    var sc = this.sc, node = sc.nodes[this.at];
    var h = '';

    h += '<p class="fault-symptom"><span class="fault-tag">' +
         bi('Symptom', 'लक्षण') + '</span> ' +
         biBlock(sc.symptom.en, sc.symptom.ne) + '</p>';

    if (this.trail.length){
      h += '<ol class="fault-trail">';
      h += this.trail.map(function (t){
        return '<li class="fault-step fault-' + t.quality + '">' +
               '<b>' + bi(t.label.en, t.label.ne) + '</b>' +
               '<span class="fault-verdict">' + biBlock(t.verdict.en, t.verdict.ne) + '</span></li>';
      }).join('');
      h += '</ol>';
    }

    if (this.at === 'done'){
      var d = sc.nodes.done;
      h += '<div class="fault-done">';
      h += '<h5>' + bi('Diagnosis', 'निदान') + '</h5>';
      h += '<p>' + biBlock(d.diagnosis.en, d.diagnosis.ne) + '</p>';
      h += '<h5>' + bi('Fix', 'समाधान') + '</h5>';
      h += '<p>' + biBlock(d.fix.en, d.fix.ne) + '</p>';
      h += '<p class="fault-count">' +
           biBlock('You reached it in ' + this.checks + ' checks.',
                   'तपाईंले ' + this.checks + ' जाँचमा पुग्नुभयो।') + '</p>';
      h += '</div>';
      h += '<div class="fault-opts"><button type="button" class="primary" data-fault-act="reset">' +
           bi('Start again', 'फेरि सुरु गर्नुहोस्') + '</button></div>';
    } else {
      h += '<h5 class="fault-ask">' + bi(node.ask.en, node.ask.ne) + '</h5>';
      h += '<div class="fault-opts" role="group">';
      h += node.checks.map(function (c, k){
        return '<button type="button" class="fault-opt" data-fault-i="' + k + '">' +
               bi(c.label.en, c.label.ne) + '</button>';
      }).join('');
      h += '</div>';
    }

    this.root.innerHTML = h;
  };

  Fault.prototype.choose = function (k){
    var node = this.sc.nodes[this.at];
    var c = node.checks[k];
    if (!c) return;
    this.checks++;
    this.trail.push({ label: c.label, verdict: c.verdict, quality: c.quality });
    /* An unsafe choice is recorded and explained but does NOT advance.
       Letting it move the diagnosis forward would teach that the order
       does not matter, which is the opposite of the lesson. */
    if (c.quality !== 'unsafe' && c.next) this.at = c.next;
    this.render();
  };

  Fault.prototype.wire = function (){
    var self = this;
    this.root.addEventListener('click', function (e){
      var t = e.target.closest ? e.target : null;
      if (!t) return;
      var opt = t.closest('.fault-opt');
      if (opt){ self.choose(parseInt(opt.getAttribute('data-fault-i'), 10)); return; }
      var act = t.closest('[data-fault-act]');
      if (act && act.getAttribute('data-fault-act') === 'reset') self.reset(false);
    });
  };

  function mount(){
    var els = doc.querySelectorAll('.fault');
    for (var i = 0; i < els.length; i++){
      if (els[i].getAttribute('data-fault-mounted')) continue;
      var f = new Fault(els[i]);
      if (f.mounted) els[i].setAttribute('data-fault-mounted', '1');
    }
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', mount);
  else mount();

  global.FaultLab = { mount: mount, scenarios: function (){ return Object.keys(SCENARIOS); } };

})(typeof window !== 'undefined' ? window : this);
