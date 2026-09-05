/* Behavioural regression for the shipped runtime: syntax, the program
   tracer, the quiz, and the two simulators. These outputs are the
   pedagogical contract — if they change, students are taught something
   different, so they are pinned exactly. */
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createEnvironment } = require('./helpers/dom.js');

const ROOT = path.resolve(__dirname, '..');

/* ---------------------------------------------------------------- syntax */

test('every published runtime module parses', () => {
  const dir = path.join(ROOT, 'assets', 'js');
  const files = [];
  (function walk(d){
    for (const e of fs.readdirSync(d, { withFileTypes: true })){
      const p = path.join(d, e.name);
      e.isDirectory() ? walk(p) : p.endsWith('.js') && files.push(p);
    }
  })(dir);
  assert.ok(files.length >= 8, 'expected at least 8 runtime modules, found ' + files.length);
  for (const f of files){
    const src = fs.readFileSync(f, 'utf8');
    assert.doesNotThrow(
      () => new vm.Script(src, { filename: f }),
      'syntax error in ' + path.relative(ROOT, f)
    );
  }
});

/* ---------------------------------------------------------------- tracer */

const TRACE_IDS = ['traceCode','traceCon','traceCapEn','traceCapNp','stepLbl','stepFill',
                   'btnPrev','btnNext','progTitle','progDesc','progDescNp',
                   'pgBtn0','pgBtn1','pgBtn2'];

function loadTracer(){
  const env = createEnvironment(TRACE_IDS);
  const api = env.loadAndGet(['core.js','trace.js'], ['loadProg','stepTrace','resetTrace','PROGS']);
  return { env, api };
}

/* The exact output of each program, verified against real C++ semantics. */
const EXPECTED = [
  ['Constructor called for Ram','Constructor called for Sita',
   'Name: Ram, Roll: 15','Name: Sita, Roll: 16',
   'Destructor called for Sita','Destructor called for Ram'],
  ['Animal constructor','Dog constructor','Puppy constructor',
   'I can eat','I can bark','I can weep'],
  ['Drawing a Circle','Drawing a Square']
];

test('the tracer ships exactly three programs', () => {
  const { api } = loadTracer();
  assert.strictEqual(api.PROGS.length, 3);
});

test('every tracer step references a real line and carries both languages', () => {
  const { api } = loadTracer();
  api.PROGS.forEach((p, i) => {
    assert.ok(p.title && p.desc && p.descNp, 'program ' + (i+1) + ' missing metadata');
    p.steps.forEach((s, j) => {
      const at = `program ${i+1} step ${j+1}`;
      assert.ok(s.line >= 1 && s.line <= p.code.length, at + ': line ' + s.line + ' is outside the program');
      assert.ok(s.en, at + ': missing English caption');
      assert.ok(s.np, at + ': missing Nepali caption');
    });
  });
});

test('each program produces its exact expected output', () => {
  const { env, api } = loadTracer();
  for (let i = 0; i < 3; i++){
    api.loadProg(i);
    let guard = 0;
    while (!env.el('btnNext').disabled && guard++ < 500) api.stepTrace(1);
    const printed = env.el('traceCon').innerHTML
      .split('\n').map(s => s.trim()).filter(Boolean)
      .filter(l => !l.startsWith('(console is empty'));
    assert.deepStrictEqual(printed, EXPECTED[i], 'program ' + (i+1) + ' output changed');
  }
});

test('stepping backwards rewinds the console', () => {
  const { env, api } = loadTracer();
  api.loadProg(0);
  let guard = 0;
  while (!env.el('btnNext').disabled && guard++ < 500) api.stepTrace(1);
  const atEnd = env.el('traceCon').innerHTML;
  api.stepTrace(-1); api.stepTrace(-1); api.stepTrace(-1); api.stepTrace(-1);
  const rewound = env.el('traceCon').innerHTML;
  assert.notStrictEqual(rewound, atEnd, 'Prev did not change the console');
  assert.ok(rewound.length < atEnd.length, 'Prev should remove already-printed output');
});

test('the tracer refuses to step past either end', () => {
  const { env, api } = loadTracer();
  api.loadProg(0);
  api.stepTrace(-1);
  assert.strictEqual(env.el('stepLbl').textContent, 'step 0 / ' + api.PROGS[0].steps.length);
  let guard = 0;
  while (!env.el('btnNext').disabled && guard++ < 500) api.stepTrace(1);
  const end = env.el('stepLbl').textContent;
  api.stepTrace(1);
  assert.strictEqual(env.el('stepLbl').textContent, end, 'stepped past the last step');
});

/* ------------------------------------------------------------------ quiz */

const QUIZ_IDS = ['quizBox','scoreBox','scoreNum','scoreMsg','scoreMsgNp'];

/* Loads the shipped chain: engine + service + generated bank, in page order.
   This tests what a student actually receives, generated files included. */
function loadQuiz(){
  const env = createEnvironment(QUIZ_IDS);
  const api = env.loadAndGet(
    ['core.js', 'services/quiz.js', 'built:assets/js/question-bank.js', 'quiz.js'],
    ['QUIZ','answer','buildQuiz','resetQuiz','QuizService']);
  return { env, api };
}

test('the question bank is internally consistent', () => {
  const { api } = loadQuiz();
  assert.strictEqual(api.QUIZ.length, 15, 'expected 15 questions');
  api.QUIZ.forEach((q, i) => {
    const at = 'question ' + (i + 1);
    assert.ok(q.q, at + ': missing text');
    assert.ok(Array.isArray(q.o) && q.o.length >= 2, at + ': needs at least two options');
    assert.strictEqual(new Set(q.o).size, q.o.length, at + ': duplicate options');
    assert.ok(Number.isInteger(q.a) && q.a >= 0 && q.a < q.o.length, at + ': answer index out of range');
    assert.ok(q.e, at + ': missing English explanation');
    assert.ok(q.n, at + ': missing Nepali explanation');
  });
});

test('answering everything correctly scores full marks', () => {
  const { env, api } = loadQuiz();
  api.QUIZ.forEach((q, i) => api.answer(i, q.a));
  assert.strictEqual(env.el('scoreNum').textContent, '15 / 15');
  assert.strictEqual(env.el('scoreBox').style.display, 'block');
});

test('answering everything wrongly scores zero', () => {
  const { env, api } = loadQuiz();
  api.QUIZ.forEach((q, i) => api.answer(i, (q.a + 1) % q.o.length));
  assert.strictEqual(env.el('scoreNum').textContent, '0 / 15');
});

test('a question cannot be answered twice', () => {
  const { env, api } = loadQuiz();
  api.answer(0, api.QUIZ[0].a);          // correct
  api.answer(0, (api.QUIZ[0].a + 1) % 4); // ignored
  api.QUIZ.slice(1).forEach((q, i) => api.answer(i + 1, (q.a + 1) % q.o.length));
  assert.strictEqual(env.el('scoreNum').textContent, '1 / 15', 'double-answering changed the score');
});

test('feedback names the right answer when the student is wrong', () => {
  const { env, api } = loadQuiz();
  api.answer(0, (api.QUIZ[0].a + 1) % api.QUIZ[0].o.length);
  const expl = env.el('e0').innerHTML;
  assert.match(expl, /Not correct/, 'no wrong-answer feedback');
  assert.match(expl, /The answer is/, 'feedback does not reveal the correct answer');
});

/* ------------------------------------------------------------- simulators */

const SIM_IDS = ['stackViz','stackPtr','stackCon','stackCode',
                 'queueViz','queuePtr','queueCon','queueCode'];

function loadSims(){
  const env = createEnvironment(SIM_IDS);
  const api = env.loadAndGet(['core.js','sim-stackqueue.js'],
    ['stkPush','stkPop','stkReset','qEnq','qDeq','qReset']);
  return { env, api };
}

test('the stack simulator is LIFO', () => {
  const { env, api } = loadSims();
  api.stkReset();
  for (let i = 0; i < 3; i++){ api.stkPush(); env.drain(); }
  assert.match(env.el('stackPtr').textContent, /top = 2/, 'top did not advance to 2');
  api.stkPop(); env.drain();
  assert.match(env.el('stackCon').innerHTML, /popped 30/, 'last value pushed was not the first popped');
});

test('the stack simulator reports overflow and underflow', () => {
  const { env, api } = loadSims();
  api.stkReset();
  for (let i = 0; i < 5; i++){ api.stkPush(); env.drain(); }
  api.stkPush(); env.drain();
  assert.match(env.el('stackCon').innerHTML, /OVERFLOW/i, 'pushing onto a full stack should overflow');

  api.stkReset();
  api.stkPop(); env.drain();
  assert.match(env.el('stackCon').innerHTML, /UNDERFLOW/i, 'popping an empty stack should underflow');
});

test('the queue simulator is FIFO', () => {
  const { env, api } = loadSims();
  api.qReset();
  for (let i = 0; i < 3; i++){ api.qEnq(); env.drain(); }
  api.qDeq(); env.drain();
  assert.match(env.el('queueCon').innerHTML, /dequeued 11/, 'first value enqueued was not the first dequeued');
});

test('the dispatch simulator resolves overloading and virtual calls', () => {
  const env = createEnvironment(['dispCode','dispCon','dispCap','dispCapEn','dispCapNp']);
  const api = env.loadAndGet(['core.js','sim-dispatch.js'], ['dispatch','DISP']);

  const cases = {
    ol1: 'Square area = 25',
    ol2: 'Rect area = 24',
    rt1: 'I am a Shape',
    rt2: 'I am a Circle'
  };
  for (const [key, expected] of Object.entries(cases)){
    env.el('dispCon').innerHTML = '';
    api.dispatch(key);
    env.drain();
    assert.match(env.el('dispCon').innerHTML, new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
      'dispatch(' + key + ') should output "' + expected + '"');
  }
});

test('every dispatch case carries a bilingual explanation', () => {
  const env = createEnvironment(['dispCode','dispCon','dispCap','dispCapEn','dispCapNp']);
  const api = env.loadAndGet(['core.js','sim-dispatch.js'], ['DISP']);
  for (const [key, d] of Object.entries(api.DISP)){
    assert.ok(d.en, key + ': missing English explanation');
    assert.ok(d.np, key + ': missing Nepali explanation');
    assert.ok(d.steps.length, key + ': has no steps');
    d.steps.forEach((s, i) => {
      assert.ok(s.en && s.np, key + ' step ' + (i+1) + ': missing a language');
    });
  }
});

/* ---------------------------------------------------- assessment service */

test('the question bank is tagged for future per-unit selection', () => {
  const bank = require(path.join(ROOT, '_source/content/questions/grade10-oop-cpp.js'));
  assert.strictEqual(bank.length, 15);
  const ids = new Set();
  for (const q of bank){
    assert.match(q.id, /^g10\.oop-cpp\.q\d{2}$/, 'bad question id: ' + q.id);
    assert.ok(!ids.has(q.id), 'duplicate question id: ' + q.id);
    ids.add(q.id);
    assert.strictEqual(q.subject, 'grade10/oop-cpp');
    assert.match(q.unit, /^u[1-6]$/, q.id + ': bad unit tag');
    assert.ok(q.topic, q.id + ': missing topic');
    assert.ok(['easy','medium','hard'].includes(q.difficulty), q.id + ': bad difficulty');
    assert.strictEqual(q.type, 'single-choice');
    assert.ok(q.prompt.en, q.id + ': missing English prompt');
    assert.ok(q.explanation.en && q.explanation.ne, q.id + ': explanation missing a language');
    assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length,
      q.id + ': answer index out of range');
  }
});

test('QuizService filters by unit and difficulty without touching the engine', () => {
  const { api } = loadQuiz();
  const all = api.QuizService.getQuiz({ subject: 'grade10/oop-cpp' });
  assert.strictEqual(all.length, 15);

  const u3 = api.QuizService.getQuiz({ subject: 'grade10/oop-cpp', unit: 'u3' });
  assert.ok(u3.length > 0 && u3.length < 15, 'unit filter returned everything or nothing');
  assert.ok(u3.every(q => q.unit === 'u3'), 'unit filter leaked other units');

  const hard = api.QuizService.getQuiz({ subject: 'grade10/oop-cpp', difficulty: 'hard' });
  assert.ok(hard.every(q => q.difficulty === 'hard'), 'difficulty filter leaked');

  assert.strictEqual(api.QuizService.getQuiz({ subject: 'grade10/oop-cpp', limit: 5 }).length, 5);
  /* values cross a vm realm boundary, so compare structurally, not by prototype */
  assert.strictEqual(api.QuizService.getQuiz({ subject: 'nope' }).length, 0, 'unknown subject should be empty');
});

test('QuizService rejects a malformed question at registration', () => {
  const { api } = loadQuiz();
  assert.throws(() => api.QuizService.registerBank('bad', [{ id: 'x' }]), /invalid question/);
  assert.throws(() => api.QuizService.registerBank('bad', [
    { id: 'y', prompt: { en: 'q' }, options: [{ en: 'a' }, { en: 'b' }], answer: 5,
      explanation: { en: 'e' } }
  ]), /invalid question/, 'an out-of-range answer index must be rejected');
  assert.throws(() => api.QuizService.registerBank('', []), /non-empty string/);
});

test('QuizService scores an attempt independently of the DOM', () => {
  const { api } = loadQuiz();
  const qs = api.QuizService.toRenderModel(api.QuizService.getQuiz({ subject: 'grade10/oop-cpp' }));
  const perfect = qs.map(q => q.a);
  const full = api.QuizService.score(qs, perfect);
  assert.strictEqual(full.score, 15); assert.strictEqual(full.total, 15);
  const none = qs.map(q => (q.a + 1) % q.o.length);
  const zero = api.QuizService.score(qs, none);
  assert.strictEqual(zero.score, 0); assert.strictEqual(zero.total, 15);
});

/* ---------------------------------------------------- simulation registry */

test('both simulations register themselves with metadata', () => {
  const env = createEnvironment(SIM_IDS);
  const api = env.loadAndGet(['core.js','services/simulation.js','sim-stackqueue.js'],
    ['SimulationService']);
  const list = api.SimulationService.list();
  /* copy out of the vm realm before comparing by structure */
  const ids = [...list].map(s => s.id).sort();
  assert.deepStrictEqual(ids, ['ds.queue','ds.stack']);
  for (const s of list){
    assert.ok(s.title.en && s.title.ne, s.id + ': title missing a language');
    assert.strictEqual(s.subject, 'grade10/oop-cpp');
    assert.ok(s.unit, s.id + ': missing unit tag');
    assert.ok(s.controls.length >= 3, s.id + ': controls not described');
  }
});

test('the registry knows which simulations are on the page', () => {
  const env = createEnvironment(SIM_IDS);          // stack + queue markup present
  const api = env.loadAndGet(['core.js','services/simulation.js','sim-stackqueue.js'],
    ['SimulationService']);
  assert.deepStrictEqual([...api.SimulationService.active()].sort(), ['ds.queue','ds.stack']);

  const bare = createEnvironment([]);              // no simulation markup at all
  const api2 = bare.loadAndGet(['core.js','services/simulation.js','sim-stackqueue.js'],
    ['SimulationService']);
  assert.deepStrictEqual([...api2.SimulationService.active()], [],
    'a simulation with no markup must not report as active');
});

test('resetting through the registry actually resets the simulation', () => {
  const env = createEnvironment(SIM_IDS);
  const api = env.loadAndGet(['core.js','services/simulation.js','sim-stackqueue.js'],
    ['SimulationService','stkPush']);
  api.stkPush(); env.drain();
  assert.match(env.el('stackPtr').textContent, /top = 0/);
  assert.strictEqual(api.SimulationService.reset('ds.stack'), true);
  assert.match(env.el('stackPtr').textContent, /top = -1/, 'reset did not clear the stack');
  assert.strictEqual(api.SimulationService.resetAll(), 2, 'resetAll should reset both simulations');
});

test('the registry rejects a malformed or duplicate simulation', () => {
  const env = createEnvironment(SIM_IDS);
  const api = env.loadAndGet(['core.js','services/simulation.js','sim-stackqueue.js'],
    ['SimulationService']);
  assert.throws(() => api.SimulationService.register({ id: 'x' }), /title\.en is required/);
  assert.throws(() => api.SimulationService.register({
    id: 'ds.stack', title: { en: 'dup' }, mounts(){ return false; }, reset(){}
  }), /duplicate simulation id/);
  assert.throws(() => api.SimulationService.reset('nope'), /unknown simulation/);
});

test('the dispatch simulation registers too', () => {
  const env = createEnvironment(['dispCode','dispCon','dispCap','dispCapEn','dispCapNp']);
  const api = env.loadAndGet(['core.js','services/simulation.js','sim-dispatch.js'],
    ['SimulationService']);
  const sim = api.SimulationService.get('oop.dispatch');
  assert.ok(sim, 'oop.dispatch not registered');
  assert.strictEqual(sim.unit, 'u6');
  assert.strictEqual(api.SimulationService.active().length, 1);
});
