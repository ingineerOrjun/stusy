/* ============================================================
   RGSC Study Board — SVG diagram library
   Every diagram is inline SVG: offline-safe, theme-aware,
   scales to any screen, and carries a <title> for screen readers.
   Referenced from content files as {{dia:name}}.
   ============================================================ */

/* arrow marker, unique id per diagram */
function ah(id, color){
  color = color || '#ffd76e';
  return `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5"
    markerWidth="6" markerHeight="6" orient="auto">
    <path d="M0,0 L10,5 L0,10 z" fill="${color}"/></marker></defs>`;
}

const D = {};

/* ---------------------------------------------------------------
   UNIT 1 — DATA STRUCTURES
   --------------------------------------------------------------- */

D.arrayMemory = `
<svg viewBox="0 0 720 210" role="img" aria-labelledby="t-arrmem">
  <title id="t-arrmem">An array of five integers stored in continuous memory locations</title>
  ${ah('a-arr')}
  <text class="f-ttl" x="10" y="20">int marks[5] = {75, 82, 60, 91, 48};</text>

  <g>
    <rect class="f-box" x="60"  y="42" width="110" height="52" rx="6"/>
    <rect class="f-box" x="180" y="42" width="110" height="52" rx="6"/>
    <rect class="f-box" x="300" y="42" width="110" height="52" rx="6"/>
    <rect class="f-box" x="420" y="42" width="110" height="52" rx="6"/>
    <rect class="f-box" x="540" y="42" width="110" height="52" rx="6"/>
    <text class="f-val" x="115" y="75">75</text>
    <text class="f-val" x="235" y="75">82</text>
    <text class="f-val" x="355" y="75">60</text>
    <text class="f-val" x="475" y="75">91</text>
    <text class="f-val" x="595" y="75">48</text>
  </g>

  <text class="f-lbl-y" x="115" y="113">marks[0]</text>
  <text class="f-lbl-y" x="235" y="113">marks[1]</text>
  <text class="f-lbl-y" x="355" y="113">marks[2]</text>
  <text class="f-lbl-y" x="475" y="113">marks[3]</text>
  <text class="f-lbl-y" x="595" y="113">marks[4]</text>

  <text class="f-addr" x="115" y="132">1000</text>
  <text class="f-addr" x="235" y="132">1004</text>
  <text class="f-addr" x="355" y="132">1008</text>
  <text class="f-addr" x="475" y="132">1012</text>
  <text class="f-addr" x="595" y="132">1016</text>

  <path class="f-ln" d="M60,148 L60,158 L650,158 L650,148"/>
  <text class="f-lbl" x="355" y="176">one block of continuous memory — each int takes 4 bytes</text>
  <text class="f-lbl" x="355" y="194">index always starts at 0, so the last index is size − 1 = 4</text>
</svg>`;

D.linkedList = `
<svg viewBox="0 0 720 230" role="img" aria-labelledby="t-ll">
  <title id="t-ll">A singly linked list of three nodes joined by pointers</title>
  ${ah('a-ll')}
  <text class="f-ttl" x="10" y="20">Linked list — each node stores DATA + the ADDRESS of the next node</text>

  <text class="f-lbl-y" x="42" y="62">head</text>
  <path class="f-arr" marker-end="url(#a-ll)" d="M42,72 L42,96 L74,96"/>

  <g>
    <rect class="f-box-g" x="80"  y="76" width="80" height="44" rx="6"/>
    <rect class="f-box-d" x="160" y="76" width="52" height="44" rx="6"/>
    <text class="f-val" x="120" y="104">75</text>
    <text class="f-lbl" x="186" y="103">next</text>
    <text class="f-addr" x="146" y="138">at 2400</text>
  </g>
  <path class="f-arr" marker-end="url(#a-ll)" d="M212,98 L268,98"/>

  <g>
    <rect class="f-box-g" x="274" y="76" width="80" height="44" rx="6"/>
    <rect class="f-box-d" x="354" y="76" width="52" height="44" rx="6"/>
    <text class="f-val" x="314" y="104">82</text>
    <text class="f-lbl" x="380" y="103">next</text>
    <text class="f-addr" x="340" y="138">at 7100</text>
  </g>
  <path class="f-arr" marker-end="url(#a-ll)" d="M406,98 L462,98"/>

  <g>
    <rect class="f-box-g" x="468" y="76" width="80" height="44" rx="6"/>
    <rect class="f-box-d" x="548" y="76" width="52" height="44" rx="6"/>
    <text class="f-val" x="508" y="104">60</text>
    <text class="f-lbl-y" x="574" y="103">NULL</text>
    <text class="f-addr" x="534" y="138">at 3900</text>
  </g>

  <text class="f-lbl" x="360" y="176">The addresses 2400, 7100, 3900 are NOT in order — memory is scattered.</text>
  <text class="f-lbl" x="360" y="196">Each node only knows where the NEXT node is. NULL means "the list ends here".</text>
  <text class="f-lbl" x="360" y="216">To reach node 3 you must start at head and walk through node 1 and node 2.</text>
</svg>`;

D.arrayVsList = `
<svg viewBox="0 0 720 300" role="img" aria-labelledby="t-avl">
  <title id="t-avl">Inserting a value in the middle of an array versus a linked list</title>
  ${ah('a-avl', '#ff8f7a')}
  ${ah('a-avl2', '#9ae6a0')}

  <text class="f-ttl" x="10" y="18">Insert 55 in the middle — why the two structures behave differently</text>

  <text class="f-lbl-y" x="10" y="46" text-anchor="start">ARRAY — every later element must SHIFT one place right</text>
  <g>
    <rect class="f-box" x="20"  y="58" width="70" height="42" rx="5"/>
    <rect class="f-box" x="95"  y="58" width="70" height="42" rx="5"/>
    <rect class="f-box-y" x="170" y="58" width="70" height="42" rx="5"/>
    <rect class="f-box" x="245" y="58" width="70" height="42" rx="5"/>
    <rect class="f-box" x="320" y="58" width="70" height="42" rx="5"/>
    <rect class="f-box-d" x="395" y="58" width="70" height="42" rx="5"/>
    <text class="f-val" x="55"  y="85">75</text>
    <text class="f-val" x="130" y="85">82</text>
    <text class="f-val" x="205" y="85">55</text>
    <text class="f-val" x="280" y="85">60</text>
    <text class="f-val" x="355" y="85">91</text>
  </g>
  <path class="f-arr" marker-end="url(#a-avl)" style="stroke:#ff8f7a" d="M280,116 L355,116"/>
  <path class="f-arr" marker-end="url(#a-avl)" style="stroke:#ff8f7a" d="M355,132 L430,132"/>
  <text class="f-lbl" x="480" y="88" text-anchor="start">3 elements had to move.</text>
  <text class="f-lbl" x="480" y="106" text-anchor="start">Big array = very slow.</text>
  <text class="f-lbl" x="230" y="152">shifting costs time — this is the array's weakness</text>

  <line class="f-ln" x1="10" y1="172" x2="710" y2="172" stroke-dasharray="5 5"/>

  <text class="f-lbl-y" x="10" y="196" text-anchor="start">LINKED LIST — only TWO pointers change, nothing moves</text>
  <g>
    <rect class="f-box-g" x="20"  y="208" width="60" height="38" rx="5"/>
    <rect class="f-box-d" x="80"  y="208" width="34" height="38" rx="5"/>
    <text class="f-val" x="50" y="233">75</text>
    <rect class="f-box-g" x="150" y="208" width="60" height="38" rx="5"/>
    <rect class="f-box-d" x="210" y="208" width="34" height="38" rx="5"/>
    <text class="f-val" x="180" y="233">82</text>
    <rect class="f-box-y" x="280" y="256" width="60" height="38" rx="5"/>
    <rect class="f-box-d" x="340" y="256" width="34" height="38" rx="5"/>
    <text class="f-val" x="310" y="281">55</text>
    <rect class="f-box-g" x="440" y="208" width="60" height="38" rx="5"/>
    <rect class="f-box-d" x="500" y="208" width="34" height="38" rx="5"/>
    <text class="f-val" x="470" y="233">60</text>
  </g>
  <path class="f-arr" marker-end="url(#a-avl2)" style="stroke:#9ae6a0" d="M114,227 L146,227"/>
  <path class="f-arr" marker-end="url(#a-avl2)" style="stroke:#ffd76e" d="M244,232 L276,268"/>
  <path class="f-arr" marker-end="url(#a-avl2)" style="stroke:#ffd76e" d="M374,270 L436,238"/>
  <text class="f-lbl" x="600" y="233" text-anchor="start">only 2 links</text>
  <text class="f-lbl" x="600" y="251" text-anchor="start">were re-pointed</text>
</svg>`;

D.stackOps = `
<svg viewBox="0 0 720 280" role="img" aria-labelledby="t-stk">
  <title id="t-stk">Stack push and pop happen at the same end, called the top</title>
  ${ah('a-stk')}
  ${ah('a-stk2', '#ff8f7a')}
  <text class="f-ttl" x="10" y="18">STACK — LIFO (Last In, First Out) · both push and pop use the TOP</text>

  <rect class="f-box-d" x="230" y="60" width="150" height="200" rx="6"/>

  <rect class="f-box"   x="245" y="215" width="120" height="38" rx="5"/>
  <rect class="f-box"   x="245" y="173" width="120" height="38" rx="5"/>
  <rect class="f-box-y" x="245" y="131" width="120" height="38" rx="5"/>
  <text class="f-val" x="305" y="240">10</text>
  <text class="f-val" x="305" y="198">20</text>
  <text class="f-val" x="305" y="156">30</text>

  <text class="f-lbl-y" x="440" y="155" text-anchor="start">← top (index 2)</text>
  <text class="f-lbl"   x="440" y="200" text-anchor="start">← pushed 2nd</text>
  <text class="f-lbl"   x="440" y="242" text-anchor="start">← pushed 1st (bottom)</text>

  <path class="f-arr" marker-end="url(#a-stk)" d="M150,120 L150,145 L238,145"/>
  <text class="f-lbl-y" x="120" y="112" text-anchor="middle">push(30)</text>
  <path class="f-arr" marker-end="url(#a-stk2)" style="stroke:#ff8f7a" d="M238,110 L150,110 L150,86"/>
  <text class="f-lbl" x="120" y="78" text-anchor="middle" fill="#ff8f7a">pop() → 30</text>

  <text class="f-lbl" x="360" y="276">The plate you put on LAST is the plate you take off FIRST. The bottom plate leaves last.</text>
</svg>`;

D.queueOps = `
<svg viewBox="0 0 720 220" role="img" aria-labelledby="t-que">
  <title id="t-que">Queue insertion at the rear and deletion at the front</title>
  ${ah('a-que')}
  ${ah('a-que2', '#ff8f7a')}
  <text class="f-ttl" x="10" y="18">QUEUE — FIFO (First In, First Out) · two different ends are used</text>

  <rect class="f-box-d" x="150" y="70" width="420" height="70" rx="6"/>
  <rect class="f-box-y" x="165" y="82" width="90" height="46" rx="5"/>
  <rect class="f-box"   x="265" y="82" width="90" height="46" rx="5"/>
  <rect class="f-box"   x="365" y="82" width="90" height="46" rx="5"/>
  <rect class="f-box"   x="465" y="82" width="90" height="46" rx="5"/>
  <text class="f-val" x="210" y="112">11</text>
  <text class="f-val" x="310" y="112">22</text>
  <text class="f-val" x="410" y="112">33</text>
  <text class="f-val" x="510" y="112">44</text>

  <text class="f-lbl-y" x="210" y="160">FRONT</text>
  <text class="f-lbl-y" x="510" y="160">REAR</text>
  <text class="f-lbl" x="210" y="177">leaves first</text>
  <text class="f-lbl" x="510" y="177">joined last</text>

  <path class="f-arr" marker-end="url(#a-que2)" style="stroke:#ff8f7a" d="M158,105 L92,105"/>
  <text class="f-lbl" x="60" y="98" fill="#ff8f7a">dequeue()</text>
  <path class="f-arr" marker-end="url(#a-que)" d="M638,105 L568,105"/>
  <text class="f-lbl-y" x="666" y="98">enqueue()</text>

  <text class="f-lbl" x="360" y="208">Exactly like a queue at a ticket counter: you join at the back, you are served from the front.</text>
</svg>`;

D.tree = `
<svg viewBox="0 0 720 300" role="img" aria-labelledby="t-tree">
  <title id="t-tree">A tree showing root, parent, child, sibling and leaf nodes</title>
  <text class="f-ttl" x="10" y="18">TREE — a hierarchical (non-linear) structure. No cycles.</text>

  <line class="f-ln" x1="360" y1="72" x2="220" y2="132"/>
  <line class="f-ln" x1="360" y1="72" x2="500" y2="132"/>
  <line class="f-ln" x1="220" y1="172" x2="150" y2="232"/>
  <line class="f-ln" x1="220" y1="172" x2="290" y2="232"/>
  <line class="f-ln" x1="500" y1="172" x2="500" y2="232"/>

  <circle class="f-box-y" cx="360" cy="52" r="26"/><text class="f-val" x="360" y="58">A</text>
  <circle class="f-box"   cx="220" cy="152" r="26"/><text class="f-val" x="220" y="158">B</text>
  <circle class="f-box"   cx="500" cy="152" r="26"/><text class="f-val" x="500" y="158">C</text>
  <circle class="f-box-g" cx="150" cy="252" r="26"/><text class="f-val" x="150" y="258">D</text>
  <circle class="f-box-g" cx="290" cy="252" r="26"/><text class="f-val" x="290" y="258">E</text>
  <circle class="f-box-g" cx="500" cy="252" r="26"/><text class="f-val" x="500" y="258">F</text>

  <text class="f-lbl-y" x="360" y="22" opacity="0"></text>
  <text class="f-lbl-y" x="440" y="50" text-anchor="start">ROOT — the only node with no parent</text>
  <text class="f-lbl"   x="590" y="152" text-anchor="start">level 1</text>
  <text class="f-lbl"   x="590" y="252" text-anchor="start">level 2</text>
  <text class="f-lbl-y" x="60" y="290" text-anchor="start">D, E, F are LEAF nodes (no children). B is the PARENT of D and E. D and E are SIBLINGS.</text>
</svg>`;

D.graph = `
<svg viewBox="0 0 720 260" role="img" aria-labelledby="t-graph">
  <title id="t-graph">A graph of five vertices joined by edges, containing a cycle</title>
  <text class="f-ttl" x="10" y="18">GRAPH — vertices joined by edges. Cycles ARE allowed. No root, no parent.</text>

  <line class="f-ln" x1="160" y1="90"  x2="330" y2="60"  style="stroke:#7fd1ff"/>
  <line class="f-ln" x1="330" y1="60"  x2="470" y2="130" style="stroke:#ffd76e;stroke-width:2.4"/>
  <line class="f-ln" x1="470" y1="130" x2="300" y2="190" style="stroke:#ffd76e;stroke-width:2.4"/>
  <line class="f-ln" x1="300" y1="190" x2="330" y2="60"  style="stroke:#ffd76e;stroke-width:2.4"/>
  <line class="f-ln" x1="160" y1="90"  x2="300" y2="190" style="stroke:#7fd1ff"/>
  <line class="f-ln" x1="470" y1="130" x2="600" y2="200" style="stroke:#7fd1ff"/>

  <circle class="f-box" cx="160" cy="90"  r="24"/><text class="f-val" x="160" y="96">A</text>
  <circle class="f-box" cx="330" cy="60"  r="24"/><text class="f-val" x="330" y="66">B</text>
  <circle class="f-box" cx="470" cy="130" r="24"/><text class="f-val" x="470" y="136">C</text>
  <circle class="f-box" cx="300" cy="190" r="24"/><text class="f-val" x="300" y="196">D</text>
  <circle class="f-box" cx="600" cy="200" r="24"/><text class="f-val" x="600" y="206">E</text>

  <text class="f-lbl-y" x="360" y="240">The yellow path B → C → D → B is a CYCLE. A tree can never have one.</text>
</svg>`;

D.dsClass = `
<svg viewBox="0 0 720 330" role="img" aria-labelledby="t-dscls">
  <title id="t-dscls">Classification of data structures into linear and non-linear types</title>
  <text class="f-ttl" x="10" y="18">Classification of Data Structures — डाटा स्ट्रक्चरको वर्गीकरण</text>

  <rect class="f-box-y" x="280" y="36" width="170" height="42" rx="8"/>
  <text class="f-val" x="365" y="62" font-size="14">DATA STRUCTURE</text>

  <line class="f-ln" x1="365" y1="78" x2="365" y2="96"/>
  <line class="f-ln" x1="185" y1="96" x2="545" y2="96"/>
  <line class="f-ln" x1="185" y1="96" x2="185" y2="118"/>
  <line class="f-ln" x1="545" y1="96" x2="545" y2="118"/>

  <rect class="f-box" x="90" y="118" width="190" height="42" rx="8"/>
  <text class="f-val" x="185" y="144" font-size="13">LINEAR</text>
  <rect class="f-box-c" x="450" y="118" width="190" height="42" rx="8"/>
  <text class="f-val" x="545" y="144" font-size="13">NON-LINEAR</text>

  <text class="f-lbl" x="185" y="176">elements in a sequence</text>
  <text class="f-lbl" x="545" y="176">elements in a hierarchy</text>

  <line class="f-ln" x1="185" y1="186" x2="185" y2="200"/>
  <line class="f-ln" x1="60"  y1="200" x2="310" y2="200"/>
  <line class="f-ln" x1="60"  y1="200" x2="60"  y2="216"/>
  <line class="f-ln" x1="143" y1="200" x2="143" y2="216"/>
  <line class="f-ln" x1="226" y1="200" x2="226" y2="216"/>
  <line class="f-ln" x1="310" y1="200" x2="310" y2="216"/>

  <rect class="f-box-g" x="20"  y="216" width="80" height="36" rx="6"/><text class="f-val" x="60"  y="239" font-size="12">Array</text>
  <rect class="f-box-g" x="106" y="216" width="80" height="36" rx="6"/><text class="f-val" x="146" y="239" font-size="11">Linked List</text>
  <rect class="f-box-g" x="192" y="216" width="72" height="36" rx="6"/><text class="f-val" x="228" y="239" font-size="12">Stack</text>
  <rect class="f-box-g" x="272" y="216" width="72" height="36" rx="6"/><text class="f-val" x="308" y="239" font-size="12">Queue</text>

  <line class="f-ln" x1="545" y1="186" x2="545" y2="200"/>
  <line class="f-ln" x1="490" y1="200" x2="600" y2="200"/>
  <line class="f-ln" x1="490" y1="200" x2="490" y2="216"/>
  <line class="f-ln" x1="600" y1="200" x2="600" y2="216"/>
  <rect class="f-box-g" x="450" y="216" width="80" height="36" rx="6"/><text class="f-val" x="490" y="239" font-size="12">Tree</text>
  <rect class="f-box-g" x="560" y="216" width="80" height="36" rx="6"/><text class="f-val" x="600" y="239" font-size="12">Graph</text>

  <text class="f-lbl" x="185" y="286">can be traversed completely in ONE run</text>
  <text class="f-lbl" x="545" y="286">CANNOT be traversed in one straight run</text>
  <text class="f-lbl-y" x="360" y="316">Exam tip: if it has levels or branches, it is NON-LINEAR.</text>
</svg>`;

D.dataHierarchy = `
<svg viewBox="0 0 720 300" role="img" aria-labelledby="t-dh">
  <title id="t-dh">How fields build records and records build a file</title>
  ${ah('a-dh')}
  <text class="f-ttl" x="10" y="18">Field → Record → File · the ladder you must be able to name in the exam</text>

  <rect class="f-box-d" x="40" y="40" width="640" height="150" rx="8"/>
  <text class="f-lbl-y" x="60" y="60" text-anchor="start">FILE — all the student records kept together</text>

  <rect class="f-box"   x="60" y="72" width="140" height="34" rx="4"/>
  <rect class="f-box"   x="200" y="72" width="90"  height="34" rx="4"/>
  <rect class="f-box"   x="290" y="72" width="120" height="34" rx="4"/>
  <rect class="f-box"   x="410" y="72" width="120" height="34" rx="4"/>
  <text class="f-lbl-y" x="130" y="94">Name</text>
  <text class="f-lbl-y" x="245" y="94">Roll</text>
  <text class="f-lbl-y" x="350" y="94">Class</text>
  <text class="f-lbl-y" x="470" y="94">Marks</text>

  <rect class="f-box-y" x="60" y="108" width="470" height="34" rx="4" fill="rgba(255,215,110,.10)"/>
  <text class="f-val" x="130" y="130" font-size="13">Ram Thapa</text>
  <text class="f-val" x="245" y="130" font-size="13">15</text>
  <text class="f-val" x="350" y="130" font-size="13">10</text>
  <text class="f-val" x="470" y="130" font-size="13">78</text>

  <rect class="f-box" x="60" y="146" width="470" height="30" rx="4" opacity=".55"/>
  <text class="f-val" x="130" y="166" font-size="13" opacity=".55">Sita Rai</text>
  <text class="f-val" x="245" y="166" font-size="13" opacity=".55">16</text>
  <text class="f-val" x="350" y="166" font-size="13" opacity=".55">10</text>
  <text class="f-val" x="470" y="166" font-size="13" opacity=".55">85</text>

  <path class="f-arr" marker-end="url(#a-dh)" d="M600,89 L545,89"/>
  <text class="f-lbl-y" x="610" y="84" text-anchor="start">ATTRIBUTE</text>
  <text class="f-lbl"   x="610" y="100" text-anchor="start">(field)</text>

  <path class="f-arr" marker-end="url(#a-dh)" d="M600,125 L545,125"/>
  <text class="f-lbl-y" x="610" y="128" text-anchor="start">RECORD</text>

  <text class="f-lbl-y" x="360" y="222">ENTITY = "Student" — the real-world thing all of this describes</text>
  <text class="f-lbl" x="360" y="248">"Ram Thapa" is a GROUP ITEM — it can be split into first name + last name.</text>
  <text class="f-lbl" x="360" y="268">15 is an ELEMENTARY ITEM — it cannot be split any further.</text>
  <text class="f-lbl" x="360" y="288">One row = one RECORD. All rows together = one FILE.</text>
</svg>`;

/* ---------------------------------------------------------------
   UNIT 2 — OOP vs POP
   --------------------------------------------------------------- */

D.popVsOop = `
<svg viewBox="0 0 720 320" role="img" aria-labelledby="t-pvo">
  <title id="t-pvo">Procedural programming with global data compared with objects that hide their data</title>
  ${ah('a-pvo', '#ff8f7a')}
  ${ah('a-pvo2', '#9ae6a0')}

  <text class="f-ttl" x="10" y="18">Why OOP was invented — the data-security problem</text>

  <text class="f-lbl-y" x="20" y="46" text-anchor="start">PROCEDURAL (C) — data is GLOBAL, every function can change it</text>
  <rect class="f-box-c" x="110" y="128" width="150" height="52" rx="8"/>
  <text class="f-val" x="185" y="152" font-size="13">GLOBAL DATA</text>
  <text class="f-lbl" x="185" y="170">unprotected</text>

  <rect class="f-box" x="20"  y="60" width="90" height="34" rx="5"/><text class="f-val" x="65"  y="82" font-size="11">func1()</text>
  <rect class="f-box" x="140" y="60" width="90" height="34" rx="5"/><text class="f-val" x="185" y="82" font-size="11">func2()</text>
  <rect class="f-box" x="260" y="60" width="90" height="34" rx="5"/><text class="f-val" x="305" y="82" font-size="11">func3()</text>
  <rect class="f-box" x="20"  y="212" width="90" height="34" rx="5"/><text class="f-val" x="65"  y="234" font-size="11">func4()</text>
  <rect class="f-box" x="260" y="212" width="90" height="34" rx="5"/><text class="f-val" x="305" y="234" font-size="11">func5()</text>

  <path class="f-arr" marker-end="url(#a-pvo)" style="stroke:#ff8f7a" d="M75,96 L140,126"/>
  <path class="f-arr" marker-end="url(#a-pvo)" style="stroke:#ff8f7a" d="M185,96 L185,124"/>
  <path class="f-arr" marker-end="url(#a-pvo)" style="stroke:#ff8f7a" d="M295,96 L230,126"/>
  <path class="f-arr" marker-end="url(#a-pvo)" style="stroke:#ff8f7a" d="M75,210 L140,182"/>
  <path class="f-arr" marker-end="url(#a-pvo)" style="stroke:#ff8f7a" d="M295,210 L230,182"/>
  <text class="f-lbl" x="185" y="272" fill="#ff8f7a">Any function can spoil the data. Hard to find who broke it.</text>

  <line class="f-ln" x1="380" y1="34" x2="380" y2="300" stroke-dasharray="5 5"/>

  <text class="f-lbl-y" x="410" y="46" text-anchor="start">OBJECT-ORIENTED (C++) — data is PRIVATE inside each object</text>

  <rect class="f-box-d" x="410" y="62" width="130" height="130" rx="10"/>
  <text class="f-lbl-y" x="475" y="80">Object: acc1</text>
  <rect class="f-box-c" x="432" y="112" width="86" height="40" rx="6"/>
  <text class="f-val" x="475" y="130" font-size="11">balance</text>
  <text class="f-lbl" x="475" y="145">private</text>
  <rect class="f-box-g" x="424" y="160" width="102" height="24" rx="12"/>
  <text class="f-val" x="475" y="176" font-size="10">deposit() public</text>

  <rect class="f-box-d" x="560" y="62" width="130" height="130" rx="10"/>
  <text class="f-lbl-y" x="625" y="80">Object: acc2</text>
  <rect class="f-box-c" x="582" y="112" width="86" height="40" rx="6"/>
  <text class="f-val" x="625" y="130" font-size="11">balance</text>
  <text class="f-lbl" x="625" y="145">private</text>
  <rect class="f-box-g" x="574" y="160" width="102" height="24" rx="12"/>
  <text class="f-val" x="625" y="176" font-size="10">deposit() public</text>

  <rect class="f-box" x="470" y="220" width="160" height="34" rx="5"/>
  <text class="f-val" x="550" y="242" font-size="11">outside code</text>
  <path class="f-arr" marker-end="url(#a-pvo2)" style="stroke:#9ae6a0" d="M510,218 L480,190"/>
  <path class="f-arr" marker-end="url(#a-pvo2)" style="stroke:#9ae6a0" d="M590,218 L622,190"/>
  <text class="f-lbl" x="550" y="278" fill="#9ae6a0">Outside code can only knock on the public door.</text>
  <text class="f-lbl" x="550" y="296" fill="#9ae6a0">It can never touch balance directly.</text>
</svg>`;

D.programAnatomy = `
<svg viewBox="0 0 720 290" role="img" aria-labelledby="t-anat">
  <title id="t-anat">The parts of a basic C++ program labelled</title>
  ${ah('a-anat')}
  <text class="f-ttl" x="10" y="18">Anatomy of every C++ program you will ever write</text>

  <rect class="f-box-d" x="20" y="34" width="380" height="212" rx="8"/>
  <text class="f-code" x="40" y="62">#include &lt;iostream&gt;</text>
  <text class="f-code" x="40" y="92">using namespace std;</text>
  <text class="f-code" x="40" y="130">int main() {</text>
  <text class="f-code" x="60" y="158">cout &lt;&lt; "Hello RGSC";</text>
  <text class="f-code" x="60" y="186">return 0;</text>
  <text class="f-code" x="40" y="214">}</text>

  <path class="f-arr" marker-end="url(#a-anat)" d="M470,58 L410,58"/>
  <text class="f-lbl-y" x="480" y="54" text-anchor="start">Preprocessor directive</text>
  <text class="f-lbl"   x="480" y="70" text-anchor="start">brings in cout and cin</text>

  <path class="f-arr" marker-end="url(#a-anat)" d="M470,88 L410,88"/>
  <text class="f-lbl-y" x="480" y="84" text-anchor="start">Namespace</text>
  <text class="f-lbl"   x="480" y="100" text-anchor="start">lets you write cout, not std::cout</text>

  <path class="f-arr" marker-end="url(#a-anat)" d="M470,126 L410,126"/>
  <text class="f-lbl-y" x="480" y="122" text-anchor="start">main() — the starting point</text>
  <text class="f-lbl"   x="480" y="138" text-anchor="start">execution ALWAYS begins here</text>

  <path class="f-arr" marker-end="url(#a-anat)" d="M470,156 L410,156"/>
  <text class="f-lbl-y" x="480" y="152" text-anchor="start">Statement — ends with ;</text>

  <path class="f-arr" marker-end="url(#a-anat)" d="M470,184 L410,184"/>
  <text class="f-lbl-y" x="480" y="180" text-anchor="start">return 0 — tells the OS</text>
  <text class="f-lbl"   x="480" y="196" text-anchor="start">the program ended successfully</text>

  <text class="f-lbl" x="360" y="272">The braces { } mark the body of the function. Every opening brace needs a closing brace.</text>
</svg>`;

/* ---------------------------------------------------------------
   UNIT 3 — CLASS & OBJECT
   --------------------------------------------------------------- */

D.classObject = `
<svg viewBox="0 0 720 300" role="img" aria-labelledby="t-co">
  <title id="t-co">One class acts as a blueprint for many objects, each with its own memory</title>
  ${ah('a-co')}
  <text class="f-ttl" x="10" y="18">ONE class (blueprint) → MANY objects (each with its own memory)</text>

  <rect class="f-box-y" x="30" y="60" width="200" height="170" rx="10"/>
  <text class="f-lbl-y" x="130" y="84" font-size="12">class Student</text>
  <text class="f-lbl" x="130" y="102">the design on paper</text>
  <line class="f-ln" x1="50" y1="112" x2="210" y2="112"/>
  <text class="f-code" x="50" y="136" font-size="11">string name;</text>
  <text class="f-code" x="50" y="158" font-size="11">int roll;</text>
  <line class="f-ln" x1="50" y1="170" x2="210" y2="170" stroke-dasharray="4 3"/>
  <text class="f-code" x="50" y="194" font-size="11">void setData();</text>
  <text class="f-code" x="50" y="216" font-size="11">void display();</text>
  <text class="f-lbl" x="130" y="252" fill="#ff8f7a">takes NO memory</text>

  <path class="f-arr" marker-end="url(#a-co)" d="M240,100 L300,90"/>
  <path class="f-arr" marker-end="url(#a-co)" d="M240,145 L300,160"/>
  <path class="f-arr" marker-end="url(#a-co)" d="M240,190 L300,230"/>

  <rect class="f-box" x="320" y="52" width="170" height="76" rx="8"/>
  <text class="f-lbl-y" x="405" y="72">object s1</text>
  <text class="f-code" x="340" y="94" font-size="11">name = "Ram"</text>
  <text class="f-code" x="340" y="114" font-size="11">roll = 15</text>

  <rect class="f-box" x="320" y="140" width="170" height="76" rx="8"/>
  <text class="f-lbl-y" x="405" y="160">object s2</text>
  <text class="f-code" x="340" y="182" font-size="11">name = "Sita"</text>
  <text class="f-code" x="340" y="202" font-size="11">roll = 16</text>

  <rect class="f-box" x="320" y="228" width="170" height="60" rx="8"/>
  <text class="f-lbl-y" x="405" y="248">object s3</text>
  <text class="f-code" x="340" y="272" font-size="11">name = "Hari"</text>

  <text class="f-lbl-y" x="530" y="90" text-anchor="start">Each object gets its</text>
  <text class="f-lbl-y" x="530" y="108" text-anchor="start">OWN copy of the data.</text>
  <text class="f-lbl"   x="530" y="140" text-anchor="start">Changing s1.name does</text>
  <text class="f-lbl"   x="530" y="158" text-anchor="start">NOT change s2.name.</text>
  <text class="f-lbl"   x="530" y="196" text-anchor="start">But all objects SHARE</text>
  <text class="f-lbl"   x="530" y="214" text-anchor="start">one copy of the member</text>
  <text class="f-lbl"   x="530" y="232" text-anchor="start">functions — that saves</text>
  <text class="f-lbl"   x="530" y="250" text-anchor="start">memory.</text>
</svg>`;

D.accessSpecifiers = `
<svg viewBox="0 0 720 300" role="img" aria-labelledby="t-acc">
  <title id="t-acc">Private, protected and public access shown as three rings around a class</title>
  ${ah('a-acc', '#9ae6a0')}
  ${ah('a-accx', '#ff8f7a')}
  <text class="f-ttl" x="10" y="18">Access specifiers — who is allowed to reach inside the class?</text>

  <circle cx="280" cy="165" r="115" fill="rgba(154,230,160,.06)" style="stroke:#9ae6a0;stroke-width:1.6"/>
  <circle cx="280" cy="165" r="80"  fill="rgba(255,215,110,.07)" style="stroke:#ffd76e;stroke-width:1.6"/>
  <circle cx="280" cy="165" r="44"  fill="rgba(255,143,122,.12)" style="stroke:#ff8f7a;stroke-width:1.8"/>

  <text class="f-val" x="280" y="162" font-size="12">private</text>
  <text class="f-lbl" x="280" y="180" font-size="10">the secret core</text>
  <text class="f-lbl-y" x="280" y="118">protected</text>
  <text class="f-val" x="280" y="72" font-size="12" fill="#9ae6a0">public</text>

  <text class="f-lbl" x="105" y="165" fill="#9ae6a0">outside</text>
  <path class="f-arr" marker-end="url(#a-acc)" style="stroke:#9ae6a0" d="M140,180 L192,180"/>
  <text class="f-lbl" x="150" y="205" font-size="10" fill="#9ae6a0">reaches public ✓</text>
  <path class="f-arr" marker-end="url(#a-accx)" style="stroke:#ff8f7a" d="M140,148 L228,148"/>
  <text class="f-lbl" x="150" y="130" font-size="10" fill="#ff8f7a">blocked from private ✗</text>

  <rect class="f-box-d" x="450" y="52" width="250" height="216" rx="8"/>
  <text class="f-lbl-y" x="575" y="76">Quick rule</text>
  <text class="f-lbl" x="470" y="106" text-anchor="start">private → same class ONLY</text>
  <text class="f-lbl" x="470" y="132" text-anchor="start">protected → same class</text>
  <text class="f-lbl" x="470" y="150" text-anchor="start">&#160;&#160;&#160;+ its derived classes</text>
  <text class="f-lbl" x="470" y="176" text-anchor="start">public → anywhere</text>
  <line class="f-ln" x1="470" y1="196" x2="680" y2="196" stroke-dasharray="4 3"/>
  <text class="f-lbl-y" x="470" y="222" text-anchor="start">Default in a class = private</text>
  <text class="f-lbl-y" x="470" y="246" text-anchor="start">Default in a struct = public</text>
</svg>`;

D.ctorDtor = `
<svg viewBox="0 0 720 290" role="img" aria-labelledby="t-cd">
  <title id="t-cd">Timeline showing constructors running in order and destructors in reverse order</title>
  ${ah('a-cd')}
  <text class="f-ttl" x="10" y="18">Object lifetime — constructors run in order, destructors run in REVERSE</text>

  <line class="f-ln" x1="40" y1="150" x2="680" y2="150" style="stroke:#2c4a41;stroke-width:2"/>
  <path class="f-arr" marker-end="url(#a-cd)" d="M660,150 L690,150"/>
  <text class="f-lbl" x="640" y="172" text-anchor="start">time →</text>

  <circle class="f-box-g" cx="120" cy="150" r="12"/>
  <text class="f-lbl-y" x="120" y="120">Student s1;</text>
  <text class="f-lbl" x="120" y="102" font-size="10">object created</text>
  <text class="f-val" x="120" y="196" font-size="11" fill="#9ae6a0">Constructor</text>
  <text class="f-val" x="120" y="212" font-size="11" fill="#9ae6a0">for Ram</text>

  <circle class="f-box-g" cx="270" cy="150" r="12"/>
  <text class="f-lbl-y" x="270" y="120">Student s2;</text>
  <text class="f-val" x="270" y="196" font-size="11" fill="#9ae6a0">Constructor</text>
  <text class="f-val" x="270" y="212" font-size="11" fill="#9ae6a0">for Sita</text>

  <circle class="f-box" cx="420" cy="150" r="12"/>
  <text class="f-lbl-y" x="420" y="120">work happens</text>
  <text class="f-lbl" x="420" y="196" font-size="11">display() calls</text>

  <circle class="f-box-c" cx="540" cy="150" r="12"/>
  <text class="f-lbl-y" x="540" y="120">main() ends</text>
  <text class="f-val" x="540" y="196" font-size="11" fill="#ff8f7a">Destructor</text>
  <text class="f-val" x="540" y="212" font-size="11" fill="#ff8f7a">for Sita ← last in</text>

  <circle class="f-box-c" cx="650" cy="150" r="12"/>
  <text class="f-val" x="640" y="196" font-size="11" fill="#ff8f7a">Destructor</text>
  <text class="f-val" x="640" y="212" font-size="11" fill="#ff8f7a">for Ram</text>

  <text class="f-lbl-y" x="360" y="256">Sita was created LAST, so Sita is destroyed FIRST — exactly like plates on a stack.</text>
  <text class="f-lbl" x="360" y="278">You never call either of them yourself. C++ calls both automatically.</text>
</svg>`;

/* ---------------------------------------------------------------
   UNIT 4 — ABSTRACTION & ENCAPSULATION
   --------------------------------------------------------------- */

D.abstraction = `
<svg viewBox="0 0 720 270" role="img" aria-labelledby="t-abs">
  <title id="t-abs">Abstraction hides how something works behind a simple interface</title>
  ${ah('a-abs')}
  <text class="f-ttl" x="10" y="18">ABSTRACTION — you see the buttons, not the circuit</text>

  <rect class="f-box" x="40" y="60" width="150" height="150" rx="10"/>
  <text class="f-lbl-y" x="115" y="86">YOU (the user)</text>
  <rect class="f-box-g" x="62" y="104" width="106" height="30" rx="15"/>
  <text class="f-val" x="115" y="124" font-size="11">start()</text>
  <rect class="f-box-g" x="62" y="144" width="106" height="30" rx="15"/>
  <text class="f-val" x="115" y="164" font-size="11">stop()</text>
  <text class="f-lbl" x="115" y="196" font-size="10">simple, safe buttons</text>

  <path class="f-arr" marker-end="url(#a-abs)" d="M200,135 L268,135"/>
  <text class="f-lbl-y" x="234" y="126" font-size="10">calls</text>

  <rect class="f-box-d" x="280" y="52" width="200" height="166" rx="10"/>
  <text class="f-lbl-y" x="380" y="76">THE WALL</text>
  <text class="f-lbl" x="380" y="94" font-size="10">interface / abstraction layer</text>
  <line class="f-ln" x1="300" y1="106" x2="460" y2="106" stroke-dasharray="4 3"/>
  <text class="f-lbl" x="380" y="132" font-size="10">you cannot see past this</text>
  <text class="f-lbl" x="380" y="160" font-size="26" fill="#ffd76e">🔒</text>

  <rect class="f-box-c" x="500" y="60" width="190" height="150" rx="10"/>
  <text class="f-lbl-y" x="595" y="86">HIDDEN INSIDE</text>
  <text class="f-lbl" x="595" y="112" font-size="10">fuel injection logic</text>
  <text class="f-lbl" x="595" y="132" font-size="10">spark timing</text>
  <text class="f-lbl" x="595" y="152" font-size="10">temperature control</text>
  <text class="f-lbl" x="595" y="172" font-size="10">400 lines of code</text>
  <text class="f-lbl" x="595" y="196" font-size="10" fill="#ff8f7a">can change any time</text>

  <text class="f-lbl-y" x="360" y="246">Because the buttons never change, the hidden code CAN be rewritten without breaking your program.</text>
</svg>`;

D.encapsulation = `
<svg viewBox="0 0 720 280" role="img" aria-labelledby="t-enc">
  <title id="t-enc">Encapsulation puts private data inside a capsule guarded by public functions</title>
  ${ah('a-enc', '#9ae6a0')}
  ${ah('a-encx', '#ff8f7a')}
  <text class="f-ttl" x="10" y="18">ENCAPSULATION — private data wrapped in a capsule of public functions</text>

  <rect x="200" y="52" width="320" height="180" rx="90" fill="rgba(154,230,160,.05)" style="stroke:#9ae6a0;stroke-width:1.8"/>
  <text class="f-lbl-y" x="360" y="78">class Account</text>

  <rect class="f-box-c" x="290" y="112" width="140" height="58" rx="8"/>
  <text class="f-val" x="360" y="136" font-size="12">balance</text>
  <text class="f-lbl" x="360" y="156" font-size="10">PRIVATE — hidden</text>

  <rect class="f-box-g" x="212" y="186" width="130" height="30" rx="15"/>
  <text class="f-val" x="277" y="206" font-size="10">setBalance()</text>
  <rect class="f-box-g" x="378" y="186" width="130" height="30" rx="15"/>
  <text class="f-val" x="443" y="206" font-size="10">getBalance()</text>

  <path class="f-arr" marker-end="url(#a-enc)" style="stroke:#9ae6a0" d="M110,200 L206,200"/>
  <text class="f-lbl" x="70" y="196" fill="#9ae6a0">allowed</text>
  <text class="f-lbl" x="70" y="212" font-size="10" fill="#9ae6a0">a.setBalance(5000)</text>

  <path class="f-arr" marker-end="url(#a-encx)" style="stroke:#ff8f7a" d="M110,140 L284,140"/>
  <text class="f-lbl" x="66" y="128" fill="#ff8f7a">BLOCKED</text>
  <text class="f-lbl" x="60" y="112" font-size="10" fill="#ff8f7a">a.balance = -500</text>

  <text class="f-lbl-y" x="360" y="256">The setter can REFUSE bad values (like a negative balance). That is why data hiding protects the program.</text>
</svg>`;

/* ---------------------------------------------------------------
   UNIT 5 — INHERITANCE
   --------------------------------------------------------------- */

/* width grows with the label so word names like "Animal" never overflow */
function inhBox(x, y, label, cls){
  const w = Math.max(52, label.length * 9 + 18);
  return `<rect class="${cls || 'f-box'}" x="${x - w / 2}" y="${y - 17}" width="${w}" height="34" rx="6"/>
          <text class="f-val" x="${x}" y="${y + 6}" font-size="13">${label}</text>`;
}

D.inhTypes = `
<svg viewBox="0 0 720 440" role="img" aria-labelledby="t-inh">
  <title id="t-inh">The five types of inheritance drawn as class diagrams</title>
  <text class="f-ttl" x="10" y="18">The 5 types of inheritance — learn to DRAW each of these</text>

  <!-- 1 single -->
  <text class="f-lbl-y" x="80" y="38">1 · SINGLE</text>
  <line class="f-ln" x1="80" y1="82" x2="80" y2="118"/>
  ${inhBox(80, 65, 'A', 'f-box-y')}
  ${inhBox(80, 135, 'B')}
  <text class="f-lbl" x="80" y="172" font-size="10">one base → one derived</text>

  <!-- 2 multilevel -->
  <text class="f-lbl-y" x="240" y="38">2 · MULTILEVEL</text>
  <line class="f-ln" x1="240" y1="82" x2="240" y2="98"/>
  <line class="f-ln" x1="240" y1="132" x2="240" y2="148"/>
  ${inhBox(240, 65, 'A', 'f-box-y')}
  ${inhBox(240, 115, 'B')}
  ${inhBox(240, 165, 'C')}
  <text class="f-lbl" x="240" y="196" font-size="10">a chain: B is derived,</text>
  <text class="f-lbl" x="240" y="210" font-size="10">then becomes a base</text>

  <!-- 3 multiple -->
  <text class="f-lbl-y" x="430" y="38">3 · MULTIPLE</text>
  <line class="f-ln" x1="400" y1="82" x2="430" y2="118"/>
  <line class="f-ln" x1="460" y1="82" x2="430" y2="118"/>
  ${inhBox(400, 65, 'A', 'f-box-y')}
  ${inhBox(460, 65, 'B', 'f-box-y')}
  ${inhBox(430, 135, 'C')}
  <text class="f-lbl" x="430" y="172" font-size="10">two bases → one derived</text>

  <!-- 4 hierarchical -->
  <text class="f-lbl-y" x="610" y="38">4 · HIERARCHICAL</text>
  <line class="f-ln" x1="610" y1="82" x2="570" y2="118"/>
  <line class="f-ln" x1="610" y1="82" x2="650" y2="118"/>
  ${inhBox(610, 65, 'A', 'f-box-y')}
  ${inhBox(570, 135, 'B')}
  ${inhBox(650, 135, 'C')}
  <text class="f-lbl" x="610" y="172" font-size="10">one base → many derived</text>

  <line class="f-ln" x1="20" y1="240" x2="700" y2="240" stroke-dasharray="5 5"/>

  <!-- 5 hybrid -->
  <text class="f-lbl-y" x="150" y="264">5 · HYBRID (a mix — here hierarchical + multiple)</text>
  <line class="f-ln" x1="150" y1="306" x2="100" y2="336"/>
  <line class="f-ln" x1="150" y1="306" x2="200" y2="336"/>
  <line class="f-ln" x1="100" y1="370" x2="150" y2="400"/>
  <line class="f-ln" x1="200" y1="370" x2="150" y2="400"/>
  ${inhBox(150, 289, 'A', 'f-box-y')}
  ${inhBox(100, 353, 'B')}
  ${inhBox(200, 353, 'C')}
  ${inhBox(150, 417, 'D', 'f-box-c')}

  <rect class="f-box-d" x="300" y="262" width="400" height="164" rx="8"/>
  <text class="f-lbl-y" x="500" y="288">The DIAMOND PROBLEM</text>
  <text class="f-lbl" x="320" y="316" text-anchor="start">D inherits from B and C. Both B and C inherit</text>
  <text class="f-lbl" x="320" y="336" text-anchor="start">from A — so D would receive TWO copies of A.</text>
  <text class="f-lbl" x="320" y="356" text-anchor="start">The compiler cannot decide which one to use.</text>
  <text class="f-lbl-y" x="320" y="386" text-anchor="start">Solution: make A a VIRTUAL BASE CLASS</text>
  <text class="f-code" x="320" y="410" font-size="11">class B : virtual public A { };</text>
</svg>`;

D.inhAccess = `
<svg viewBox="0 0 720 300" role="img" aria-labelledby="t-inha">
  <title id="t-inha">What happens to base class members under each inheritance mode</title>
  ${ah('a-inha')}
  <text class="f-ttl" x="10" y="18">What the derived class actually receives — the most-asked table, drawn</text>

  <rect class="f-box-y" x="30" y="44" width="150" height="140" rx="8"/>
  <text class="f-lbl-y" x="105" y="66">BASE class</text>
  <rect class="f-box-g" x="48" y="80" width="114" height="26" rx="5"/><text class="f-val" x="105" y="98" font-size="11">public</text>
  <rect class="f-box-y" x="48" y="112" width="114" height="26" rx="5"/><text class="f-val" x="105" y="130" font-size="11">protected</text>
  <rect class="f-box-c" x="48" y="144" width="114" height="26" rx="5"/><text class="f-val" x="105" y="162" font-size="11">private</text>

  <path class="f-arr" marker-end="url(#a-inha)" d="M190,92 L250,80"/>
  <path class="f-arr" marker-end="url(#a-inha)" d="M190,124 L250,150"/>
  <path class="f-arr" marker-end="url(#a-inha)" d="M190,156 L250,222"/>

  <rect class="f-box-d" x="260" y="44" width="130" height="80" rx="8"/>
  <text class="f-lbl-y" x="325" y="64" font-size="11">: public</text>
  <text class="f-lbl" x="325" y="86" font-size="10" fill="#9ae6a0">public stays public</text>
  <text class="f-lbl" x="325" y="104" font-size="10" fill="#ffd76e">protected stays protected</text>

  <rect class="f-box-d" x="260" y="134" width="130" height="80" rx="8"/>
  <text class="f-lbl-y" x="325" y="154" font-size="11">: protected</text>
  <text class="f-lbl" x="325" y="176" font-size="10" fill="#ffd76e">public → protected</text>
  <text class="f-lbl" x="325" y="194" font-size="10" fill="#ffd76e">protected stays</text>

  <rect class="f-box-d" x="260" y="224" width="130" height="66" rx="8"/>
  <text class="f-lbl-y" x="325" y="244" font-size="11">: private</text>
  <text class="f-lbl" x="325" y="266" font-size="10" fill="#ff8f7a">both become private</text>

  <rect class="f-box-c" x="430" y="120" width="260" height="110" rx="8"/>
  <text class="f-lbl-y" x="560" y="146">The one rule that never changes</text>
  <text class="f-val" x="560" y="176" font-size="13" fill="#ff8f7a">private members are</text>
  <text class="f-val" x="560" y="196" font-size="13" fill="#ff8f7a">NEVER inherited</text>
  <text class="f-lbl" x="560" y="216" font-size="10">in any mode — they exist, but the child cannot touch them</text>
</svg>`;

D.ctorOrder = `
<svg viewBox="0 0 720 250" role="img" aria-labelledby="t-cord">
  <title id="t-cord">Constructor and destructor order in multilevel inheritance</title>
  ${ah('a-cord', '#9ae6a0')}
  ${ah('a-cordr', '#ff8f7a')}
  <text class="f-ttl" x="10" y="18">Creating ONE Puppy object runs THREE constructors — in this order</text>

  ${inhBox(150, 60, 'Animal', 'f-box-y')}
  ${inhBox(150, 130, 'Dog')}
  ${inhBox(150, 200, 'Puppy')}
  <line class="f-ln" x1="150" y1="77" x2="150" y2="113"/>
  <line class="f-ln" x1="150" y1="147" x2="150" y2="183"/>

  <path class="f-arr" marker-end="url(#a-cord)" style="stroke:#9ae6a0" d="M300,200 L300,80"/>
  <text class="f-val" x="330" y="70" font-size="11" fill="#9ae6a0" text-anchor="start">1st — Animal()</text>
  <text class="f-val" x="330" y="140" font-size="11" fill="#9ae6a0" text-anchor="start">2nd — Dog()</text>
  <text class="f-val" x="330" y="210" font-size="11" fill="#9ae6a0" text-anchor="start">3rd — Puppy()</text>
  <text class="f-lbl-y" x="300" y="228" font-size="10">CONSTRUCTORS</text>
  <text class="f-lbl" x="300" y="44" font-size="10" fill="#9ae6a0">top-most base first ↑</text>

  <path class="f-arr" marker-end="url(#a-cordr)" style="stroke:#ff8f7a" d="M560,80 L560,200"/>
  <text class="f-val" x="530" y="70" font-size="11" fill="#ff8f7a" text-anchor="end">3rd — ~Animal()</text>
  <text class="f-val" x="530" y="140" font-size="11" fill="#ff8f7a" text-anchor="end">2nd — ~Dog()</text>
  <text class="f-val" x="530" y="210" font-size="11" fill="#ff8f7a" text-anchor="end">1st — ~Puppy()</text>
  <text class="f-lbl-y" x="560" y="228" font-size="10">DESTRUCTORS</text>
  <text class="f-lbl" x="560" y="44" font-size="10" fill="#ff8f7a">exact reverse ↓</text>
</svg>`;

/* ---------------------------------------------------------------
   UNIT 6 — POLYMORPHISM
   --------------------------------------------------------------- */

D.polyTypes = `
<svg viewBox="0 0 720 300" role="img" aria-labelledby="t-poly">
  <title id="t-poly">Polymorphism split into compile-time and run-time types</title>
  <text class="f-ttl" x="10" y="18">Types of Polymorphism — this tree is worth full marks on its own</text>

  <rect class="f-box-y" x="270" y="36" width="180" height="44" rx="8"/>
  <text class="f-val" x="360" y="58" font-size="13">POLYMORPHISM</text>
  <text class="f-lbl" x="360" y="73" font-size="9">one name, many forms</text>

  <line class="f-ln" x1="360" y1="80" x2="360" y2="98"/>
  <line class="f-ln" x1="180" y1="98" x2="540" y2="98"/>
  <line class="f-ln" x1="180" y1="98" x2="180" y2="118"/>
  <line class="f-ln" x1="540" y1="98" x2="540" y2="118"/>

  <rect class="f-box" x="70" y="118" width="220" height="56" rx="8"/>
  <text class="f-val" x="180" y="140" font-size="12">COMPILE-TIME</text>
  <text class="f-lbl" x="180" y="158" font-size="10">static · early binding</text>

  <rect class="f-box-c" x="430" y="118" width="220" height="56" rx="8"/>
  <text class="f-val" x="540" y="140" font-size="12">RUN-TIME</text>
  <text class="f-lbl" x="540" y="158" font-size="10">dynamic · late binding</text>

  <line class="f-ln" x1="180" y1="174" x2="180" y2="192"/>
  <line class="f-ln" x1="110" y1="192" x2="250" y2="192"/>
  <line class="f-ln" x1="110" y1="192" x2="110" y2="210"/>
  <line class="f-ln" x1="250" y1="192" x2="250" y2="210"/>
  <rect class="f-box-g" x="40" y="210" width="140" height="44" rx="6"/>
  <text class="f-val" x="110" y="230" font-size="11">Function</text>
  <text class="f-val" x="110" y="246" font-size="11">Overloading</text>
  <rect class="f-box-g" x="190" y="210" width="140" height="44" rx="6"/>
  <text class="f-val" x="260" y="230" font-size="11">Operator</text>
  <text class="f-val" x="260" y="246" font-size="11">Overloading</text>

  <line class="f-ln" x1="540" y1="174" x2="540" y2="192"/>
  <line class="f-ln" x1="470" y1="192" x2="610" y2="192"/>
  <line class="f-ln" x1="470" y1="192" x2="470" y2="210"/>
  <line class="f-ln" x1="610" y1="192" x2="610" y2="210"/>
  <rect class="f-box-g" x="400" y="210" width="140" height="44" rx="6"/>
  <text class="f-val" x="470" y="230" font-size="11">Function</text>
  <text class="f-val" x="470" y="246" font-size="11">Overriding</text>
  <rect class="f-box-g" x="550" y="210" width="140" height="44" rx="6"/>
  <text class="f-val" x="620" y="230" font-size="11">Virtual</text>
  <text class="f-val" x="620" y="246" font-size="11">Functions</text>

  <text class="f-lbl-y" x="180" y="284">decided BEFORE the program runs</text>
  <text class="f-lbl-y" x="540" y="284">decided WHILE the program runs</text>
</svg>`;

D.dispatch = `
<svg viewBox="0 0 720 320" role="img" aria-labelledby="t-disp">
  <title id="t-disp">How a base class pointer chooses the derived version of a virtual function</title>
  ${ah('a-disp')}
  ${ah('a-disp2', '#9ae6a0')}
  <text class="f-ttl" x="10" y="18">Run-time dispatch — the same line p-&gt;draw() gives two different answers</text>

  <rect class="f-box-y" x="30" y="130" width="120" height="50" rx="8"/>
  <text class="f-val" x="90" y="152" font-size="12">Shape *p</text>
  <text class="f-lbl" x="90" y="169" font-size="10">base pointer</text>

  <path class="f-arr" marker-end="url(#a-disp)" d="M156,144 L246,86"/>
  <text class="f-lbl-y" x="196" y="106" font-size="10">p = &amp;c</text>
  <path class="f-arr" marker-end="url(#a-disp)" d="M156,168 L246,232" opacity=".45"/>
  <text class="f-lbl" x="196" y="216" font-size="10" opacity=".6">p = &amp;s</text>

  <rect class="f-box" x="250" y="52" width="150" height="70" rx="8"/>
  <text class="f-lbl-y" x="325" y="74">object c</text>
  <text class="f-lbl" x="325" y="92" font-size="10">real type: Circle</text>
  <text class="f-lbl" x="325" y="110" font-size="10">has its own draw()</text>

  <rect class="f-box" x="250" y="198" width="150" height="70" rx="8" opacity=".55"/>
  <text class="f-lbl-y" x="325" y="220" opacity=".7">object s</text>
  <text class="f-lbl" x="325" y="238" font-size="10" opacity=".7">real type: Square</text>

  <path class="f-arr" marker-end="url(#a-disp2)" style="stroke:#9ae6a0" d="M406,86 L486,86"/>
  <text class="f-lbl" x="446" y="76" font-size="9" fill="#9ae6a0">C++ checks the</text>
  <text class="f-lbl" x="446" y="66" font-size="9" fill="#9ae6a0">OBJECT, not the pointer</text>

  <rect class="f-box-g" x="490" y="60" width="200" height="52" rx="8"/>
  <text class="f-val" x="590" y="82" font-size="12">Circle::draw()</text>
  <text class="f-lbl" x="590" y="100" font-size="10">"Drawing a Circle"</text>

  <path class="f-arr" marker-end="url(#a-disp2)" style="stroke:#9ae6a0" d="M406,232 L486,232" opacity=".55"/>
  <rect class="f-box-g" x="490" y="206" width="200" height="52" rx="8" opacity=".55"/>
  <text class="f-val" x="590" y="228" font-size="12">Square::draw()</text>
  <text class="f-lbl" x="590" y="246" font-size="10">"Drawing a Square"</text>

  <rect class="f-box-c" x="120" y="278" width="480" height="34" rx="6"/>
  <text class="f-lbl-y" x="360" y="300" font-size="11">Delete the word "virtual" and BOTH calls print "Drawing a Shape" instead.</text>
</svg>`;

D.overloadResolve = `
<svg viewBox="0 0 720 250" role="img" aria-labelledby="t-ovr">
  <title id="t-ovr">The compiler picks an overloaded function by matching the arguments</title>
  ${ah('a-ovr', '#9ae6a0')}
  ${ah('a-ovrx', '#ff8f7a')}
  <text class="f-ttl" x="10" y="18">Overload resolution — the compiler matches by ARGUMENTS, before the program runs</text>

  <rect class="f-box-y" x="250" y="40" width="220" height="44" rx="8"/>
  <text class="f-code" x="360" y="68" text-anchor="middle" font-size="13">area(4, 6);</text>
  <text class="f-lbl" x="360" y="100" font-size="10">two int arguments</text>

  <path class="f-arr" marker-end="url(#a-ovrx)" style="stroke:#ff8f7a" d="M300,110 L180,150"/>
  <path class="f-arr" marker-end="url(#a-ovr)"  style="stroke:#9ae6a0" d="M420,110 L540,150"/>

  <rect class="f-box-c" x="40" y="158" width="280" height="66" rx="8"/>
  <text class="f-code" x="180" y="184" text-anchor="middle" font-size="12">void area(int s)</text>
  <text class="f-lbl" x="180" y="206" font-size="10" fill="#ff8f7a">needs 1 argument — REJECTED ✗</text>

  <rect class="f-box-g" x="400" y="158" width="280" height="66" rx="8"/>
  <text class="f-code" x="540" y="184" text-anchor="middle" font-size="12">void area(int l, int b)</text>
  <text class="f-lbl" x="540" y="206" font-size="10" fill="#9ae6a0">needs 2 arguments — MATCHED ✓</text>
</svg>`;

module.exports = D;
