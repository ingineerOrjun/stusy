/* =========================================================
   3. SIMULATOR 1a — STACK
   ========================================================= */
var STACK_CODE = [
'int arr[5];',
'int top = -1;',
'',
'void push(int x) {',
'    if (top == 4)',
'        cout << "Overflow";',
'    else {',
'        top = top + 1;      // move top up',
'        arr[top] = x;       // store the value',
'    }',
'}',
'',
'int pop() {',
'    if (top == -1)',
'        cout << "Underflow";',
'    else {',
'        int v = arr[top];   // read the top value',
'        top = top - 1;      // move top down',
'        return v;',
'    }',
'}'
];

var stkArr = [], stkGuard = { busy:false }, stkNext = 10;

/* ---- shared reconciler --------------------------------------------
   The original render replaced the container's innerHTML on every
   operation, so every box became a new DOM node and every box replayed
   the enter animation. Measured in a browser: after three pushes, every
   surviving box reported currentTime 0 — all of them restarted.

   That motion said "everything moved". The concept being taught is that
   exactly ONE element moved, at ONE end. The animation was teaching the
   opposite of the lesson.

   These reconcile instead: untouched boxes are left alone, so only the
   element that actually entered or left animates. `atEnd` is what makes
   the same function serve both structures — a stack changes at the end,
   a queue at the front, and that difference is the whole point of the
   comparison. */
function reconcile(container, values, opts){
  if (!container) return;
  var atEnd = opts.atEnd;
  var exitMs = (typeof MotionService !== 'undefined') ? MotionService.ms('slow') : 320;

  var note = container.querySelector('.emptynote');
  if (note && values.length) note.parentNode.removeChild(note);

  var live = [].slice.call(container.querySelectorAll('.sbox:not(.out)'));

  /* remove the surplus, from whichever end this structure removes from */
  var surplus = live.length - values.length;
  for (var s = 0; s < surplus; s++){
    var victim = atEnd ? live[live.length - 1 - s] : live[s];
    exitBox(victim, exitMs, container, values, opts);
  }

  /* add the newcomers — only these carry the enter animation */
  for (var j = live.length; j < values.length; j++){
    var b = document.createElement('div');
    b.className = 'sbox';
    b.textContent = values[j];
    container.appendChild(b);
  }

  markActive(container, values, opts);
}

function exitBox(el, exitMs, container, values, opts){
  if (!el) return;
  el.classList.add('out');
  el.classList.remove('top');   /* a leaving element is no longer the active end */
  var finish = function(){
    if (el.parentNode) el.parentNode.removeChild(el);
    markActive(container, values, opts);
    if (!values.length && !container.querySelector('.sbox:not(.out)') &&
        !container.querySelector('.emptynote')){
      var n = document.createElement('div');
      n.className = 'emptynote';
      n.textContent = opts.emptyText;
      container.appendChild(n);
    }
  };
  if (exitMs === 0) finish();
  else setTimeout(finish, exitMs);
}

/* Only one box is the active end. Recomputed after every change so the
   highlight always tracks the real top/front. */
function markActive(container, values, opts){
  var now = container.querySelectorAll('.sbox:not(.out)');
  var activeIndex = opts.atEnd ? values.length - 1 : 0;
  for (var k = 0; k < now.length; k++){
    if (k === activeIndex) now[k].classList.add('top');
    else now[k].classList.remove('top');
  }
}

function stkRender(){
  var v = document.getElementById('stackViz');
  if (!v) return;
  reconcile(v, stkArr, { atEnd: true, emptyText: 'stack is empty' });
  if (!stkArr.length && !v.querySelector('.sbox') && !v.querySelector('.emptynote')){
    v.innerHTML = '<div class="emptynote">stack is empty</div>';
  }
  (document.getElementById('stackPtr')||{}).textContent =
    stkArr.length ? 'top = ' + (stkArr.length - 1) + '  →  value ' + stkArr[stkArr.length - 1]
                  : 'top = -1 (empty)';
}

function stkPush(){
  var con = document.getElementById('stackCon');
  if (stkGuard.busy) return;
  if (stkArr.length >= 5){
    conClear(con);
    runSteps('stackCode', STACK_CODE, [
      {line:5,  en:'Check: is top == 4 ? YES, the stack is full.', np:'जाँच: top == 4 ? हो, स्ट्याक भरियो।'},
      {line:6,  en:'OVERFLOW — cannot push into a full stack.',    np:'OVERFLOW — भरिएको स्ट्याकमा push गर्न मिल्दैन।'}
    ], con, stkGuard);
    return;
  }
  var x = stkNext; stkNext += 10;
  conClear(con);
  runSteps('stackCode', STACK_CODE, [
    {line:4, en:'push(' + x + ') is called.',                     np:'push(' + x + ') बोलाइयो।'},
    {line:5, en:'Check: is the stack full (top == 4)? No.',       np:'जाँच: स्ट्याक भरिएको छ? छैन।'},
    {line:8, en:'top moves up: top becomes ' + stkArr.length + '.', np:'top माथि सर्‍यो: top = ' + stkArr.length + '।'},
    {line:9, en:'Value ' + x + ' is stored at arr[' + stkArr.length + '] — the new TOP.',
             np:'मान ' + x + ' arr[' + stkArr.length + '] मा राखियो — यही नयाँ TOP हो।',
             act:function(){ stkArr.push(x); stkRender(); }},
    {line:11, en:'push() finished. LIFO: this value will come out FIRST.',
              np:'push() सकियो। LIFO: यही मान सबैभन्दा पहिले निस्कन्छ।'}
  ], con, stkGuard);
}

function stkPop(){
  var con = document.getElementById('stackCon');
  if (stkGuard.busy) return;
  conClear(con);
  if (!stkArr.length){
    runSteps('stackCode', STACK_CODE, [
      {line:13, en:'pop() is called.',                          np:'pop() बोलाइयो।'},
      {line:14, en:'Check: is top == -1 ? YES, the stack is empty.', np:'जाँच: top == -1 ? हो, स्ट्याक खाली छ।'},
      {line:15, en:'UNDERFLOW — nothing to remove.',            np:'UNDERFLOW — हटाउने केही छैन।'}
    ], con, stkGuard);
    return;
  }
  var v = stkArr[stkArr.length - 1];
  runSteps('stackCode', STACK_CODE, [
    {line:13, en:'pop() is called.',                                  np:'pop() बोलाइयो।'},
    {line:14, en:'Check: is the stack empty? No.',                    np:'जाँच: स्ट्याक खाली छ? छैन।'},
    {line:17, en:'Read the TOP value: ' + v + '.',                    np:'TOP को मान पढियो: ' + v + '।'},
    {line:18, en:'top moves down: top becomes ' + (stkArr.length - 2) + '.',
              np:'top तल सर्‍यो: top = ' + (stkArr.length - 2) + '।',
              act:function(){ stkArr.pop(); stkRender(); }},
    {line:19, en:'Return ' + v + '. The LAST value pushed came out FIRST — that is LIFO.',
              np:v + ' फर्कियो। अन्तिममा हालेको पहिले निस्कियो — यही LIFO हो।', out:'popped ' + v}
  ], con, stkGuard);
}

function stkPeek(){
  var con = document.getElementById('stackCon');
  if (stkGuard.busy) return;
  conClear(con);
  if (!stkArr.length){
    conLine(con, 'peek(): the stack is empty, there is no top value.');
    conLine(con, 'peek(): स्ट्याक खाली छ, top मान छैन।', 'np');
    return;
  }
  var v = stkArr[stkArr.length - 1];
  runSteps('stackCode', STACK_CODE, [
    {line:17, en:'peek() only READS the top value: ' + v + '.', np:'peek() ले top को मान ' + v + ' पढ्छ मात्र।'},
    {line:2,  en:'top does NOT change. Nothing is removed.',    np:'top बदलिँदैन। केही हट्दैन।', out:'top = ' + v}
  ], con, stkGuard);
}

function stkReset(){
  if (stkGuard.busy) return;
  stkArr = []; stkNext = 10; stkRender();
  conClear(document.getElementById('stackCon'));
  renderCode(document.getElementById('stackCode'), STACK_CODE, 0);
  conLine(document.getElementById('stackCon'), 'Stack reset. top = -1 (empty).');
  conLine(document.getElementById('stackCon'), 'स्ट्याक रिसेट भयो। top = -1 (खाली)।', 'np');
}


/* =========================================================
   3b. SIMULATOR 1b — QUEUE
   ========================================================= */
var QUEUE_CODE = [
'int arr[5];',
'int front = 0, rear = -1;',
'',
'void enqueue(int x) {',
'    if (rear == 4)',
'        cout << "Queue is full";',
'    else {',
'        rear = rear + 1;    // rear moves right',
'        arr[rear] = x;      // insert at the REAR',
'    }',
'}',
'',
'int dequeue() {',
'    if (front > rear)',
'        cout << "Queue is empty";',
'    else {',
'        int v = arr[front]; // read from the FRONT',
'        front = front + 1;  // front moves right',
'        return v;',
'    }',
'}'
];

var qArr = [], qGuard = { busy:false }, qNext = 11, qFrontIdx = 0, qRearIdx = -1;

function qRender(){
  var v = document.getElementById('queueViz');
  if (!v) return;
  /* atEnd:false — a queue leaves from the FRONT. The exit animation
     therefore plays on the opposite end from the stack, which is exactly
     the difference the side-by-side comparison exists to teach. */
  reconcile(v, qArr, { atEnd: false, emptyText: 'queue is empty' });
  if (!qArr.length && !v.querySelector('.sbox') && !v.querySelector('.emptynote')){
    v.innerHTML = '<div class="emptynote">queue is empty</div>';
  }
  (document.getElementById('queuePtr')||{}).textContent =
    qArr.length ? 'front → ' + qArr[0] + '   ·   rear → ' + qArr[qArr.length - 1]
                : 'front = 0 · rear = -1 (empty)';
}

function qEnq(){
  var con = document.getElementById('queueCon');
  if (qGuard.busy) return;
  conClear(con);
  if (qArr.length >= 5){
    runSteps('queueCode', QUEUE_CODE, [
      {line:5, en:'Check: is rear == 4 ? YES, the queue is full.', np:'जाँच: rear == 4 ? हो, लाइन भरियो।'},
      {line:6, en:'Cannot insert any more elements.',             np:'अब थप्न मिल्दैन।'}
    ], con, qGuard);
    return;
  }
  var x = qNext; qNext += 11;
  runSteps('queueCode', QUEUE_CODE, [
    {line:4, en:'enqueue(' + x + ') is called.',                np:'enqueue(' + x + ') बोलाइयो।'},
    {line:5, en:'Check: is the queue full? No.',                np:'जाँच: लाइन भरिएको छ? छैन।'},
    {line:8, en:'rear moves right to ' + qArr.length + '.',     np:'rear दायाँ सर्‍यो: ' + qArr.length + '।'},
    {line:9, en:'Value ' + x + ' joins at the REAR (the back of the line).',
             np:'मान ' + x + ' REAR (लाइनको पछाडि) मा थपियो।',
             act:function(){ qArr.push(x); qRender(); }},
    {line:11, en:'enqueue() finished. FIFO: it must wait for everyone in front.',
              np:'enqueue() सकियो। FIFO: अगाडिका सबै नसकिँदासम्म पर्खनुपर्छ।'}
  ], con, qGuard);
}

function qDeq(){
  var con = document.getElementById('queueCon');
  if (qGuard.busy) return;
  conClear(con);
  if (!qArr.length){
    runSteps('queueCode', QUEUE_CODE, [
      {line:13, en:'dequeue() is called.',                              np:'dequeue() बोलाइयो।'},
      {line:14, en:'Check: is front > rear ? YES, the queue is empty.', np:'जाँच: front > rear ? हो, लाइन खाली छ।'},
      {line:15, en:'Nothing to remove.',                                np:'हटाउने केही छैन।'}
    ], con, qGuard);
    return;
  }
  var v = qArr[0];
  runSteps('queueCode', QUEUE_CODE, [
    {line:13, en:'dequeue() is called.',                        np:'dequeue() बोलाइयो।'},
    {line:14, en:'Check: is the queue empty? No.',              np:'जाँच: लाइन खाली छ? छैन।'},
    {line:17, en:'Read the FRONT value: ' + v + '.',            np:'FRONT को मान पढियो: ' + v + '।'},
    {line:18, en:'front moves right — the next person is now first.',
              np:'front दायाँ सर्‍यो — अब पछिल्लो व्यक्ति पहिलो भयो।',
              act:function(){ qArr.shift(); qRender(); }},
    {line:19, en:'Return ' + v + '. The FIRST value inserted came out FIRST — that is FIFO.',
              np:v + ' फर्कियो। पहिले हालेको पहिले निस्कियो — यही FIFO हो।', out:'dequeued ' + v}
  ], con, qGuard);
}

function qFront(){
  var con = document.getElementById('queueCon');
  if (qGuard.busy) return;
  conClear(con);
  if (!qArr.length){
    conLine(con, 'front(): the queue is empty.');
    conLine(con, 'front(): लाइन खाली छ।', 'np');
    return;
  }
  runSteps('queueCode', QUEUE_CODE, [
    {line:17, en:'front() only READS the first value: ' + qArr[0] + '.', np:'front() ले पहिलो मान ' + qArr[0] + ' पढ्छ मात्र।'},
    {line:2,  en:'Nothing is removed, front does not move.',             np:'केही हट्दैन, front सर्दैन।', out:'front = ' + qArr[0]}
  ], con, qGuard);
}

function qReset(){
  if (qGuard.busy) return;
  qArr = []; qNext = 11; qRender();
  conClear(document.getElementById('queueCon'));
  renderCode(document.getElementById('queueCode'), QUEUE_CODE, 0);
  conLine(document.getElementById('queueCon'), 'Queue reset. front = 0, rear = -1 (empty).');
  conLine(document.getElementById('queueCon'), 'लाइन रिसेट भयो। front = 0, rear = -1 (खाली)।', 'np');
}

renderCode(document.getElementById('stackCode'), STACK_CODE, 0);
renderCode(document.getElementById('queueCode'), QUEUE_CODE, 0);
stkRender(); qRender();


/* ---- registration ----
   Behaviour above is unchanged; this only makes the two simulations
   discoverable through SimulationService. */
if (typeof SimulationService !== 'undefined') {
  SimulationService.register({
    id: 'ds.stack', subject: 'grade10/oop-cpp', unit: 'u1',
    title: { en: 'Stack (LIFO)', ne: 'स्ट्याक (LIFO)' },
    mounts: function(){ return !!document.getElementById('stackViz'); },
    reset:  function(){ stkReset(); },
    controls: [
      { id: 'push', label: { en: 'push()',  ne: 'push() — थप्ने' } },
      { id: 'pop',  label: { en: 'pop()',   ne: 'pop() — झिक्ने' } },
      { id: 'peek', label: { en: 'peek()',  ne: 'peek() — हेर्ने' } }
    ]
  });
  SimulationService.register({
    id: 'ds.queue', subject: 'grade10/oop-cpp', unit: 'u1',
    title: { en: 'Queue (FIFO)', ne: 'क्यू (FIFO)' },
    mounts: function(){ return !!document.getElementById('queueViz'); },
    reset:  function(){ qReset(); },
    controls: [
      { id: 'enqueue', label: { en: 'enqueue()', ne: 'enqueue() — थप्ने' } },
      { id: 'dequeue', label: { en: 'dequeue()', ne: 'dequeue() — झिक्ने' } },
      { id: 'front',   label: { en: 'front()',   ne: 'front() — हेर्ने' } }
    ]
  });
}
