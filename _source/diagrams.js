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
<svg viewBox="0 0 720 324" role="img" aria-labelledby="t-tree">
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
  <text class="f-lbl-y" x="60" y="312" text-anchor="start">D, E, F are LEAF nodes (no children). B is the PARENT of D and E. D and E are SIBLINGS.</text>
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
  <text class="f-val" x="365" y="62" style="font-size:14px">DATA STRUCTURE</text>

  <line class="f-ln" x1="365" y1="78" x2="365" y2="96"/>
  <line class="f-ln" x1="185" y1="96" x2="545" y2="96"/>
  <line class="f-ln" x1="185" y1="96" x2="185" y2="118"/>
  <line class="f-ln" x1="545" y1="96" x2="545" y2="118"/>

  <rect class="f-box" x="90" y="118" width="190" height="42" rx="8"/>
  <text class="f-val" x="185" y="144" style="font-size:13px">LINEAR</text>
  <rect class="f-box-c" x="450" y="118" width="190" height="42" rx="8"/>
  <text class="f-val" x="545" y="144" style="font-size:13px">NON-LINEAR</text>

  <text class="f-lbl" x="185" y="176">elements in a sequence</text>
  <text class="f-lbl" x="545" y="176">elements in a hierarchy</text>

  <line class="f-ln" x1="185" y1="186" x2="185" y2="200"/>
  <line class="f-ln" x1="60"  y1="200" x2="310" y2="200"/>
  <line class="f-ln" x1="60"  y1="200" x2="60"  y2="216"/>
  <line class="f-ln" x1="143" y1="200" x2="143" y2="216"/>
  <line class="f-ln" x1="226" y1="200" x2="226" y2="216"/>
  <line class="f-ln" x1="310" y1="200" x2="310" y2="216"/>

  <rect class="f-box-g" x="20"  y="216" width="80" height="36" rx="6"/><text class="f-val" x="60"  y="239" style="font-size:12px">Array</text>
  <rect class="f-box-g" x="106" y="216" width="80" height="36" rx="6"/><text class="f-val" x="146" y="239" style="font-size:11px">Linked List</text>
  <rect class="f-box-g" x="192" y="216" width="72" height="36" rx="6"/><text class="f-val" x="228" y="239" style="font-size:12px">Stack</text>
  <rect class="f-box-g" x="272" y="216" width="72" height="36" rx="6"/><text class="f-val" x="308" y="239" style="font-size:12px">Queue</text>

  <line class="f-ln" x1="545" y1="186" x2="545" y2="200"/>
  <line class="f-ln" x1="490" y1="200" x2="600" y2="200"/>
  <line class="f-ln" x1="490" y1="200" x2="490" y2="216"/>
  <line class="f-ln" x1="600" y1="200" x2="600" y2="216"/>
  <rect class="f-box-g" x="450" y="216" width="80" height="36" rx="6"/><text class="f-val" x="490" y="239" style="font-size:12px">Tree</text>
  <rect class="f-box-g" x="560" y="216" width="80" height="36" rx="6"/><text class="f-val" x="600" y="239" style="font-size:12px">Graph</text>

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
  <text class="f-val" x="130" y="130" style="font-size:13px">Ram Thapa</text>
  <text class="f-val" x="245" y="130" style="font-size:13px">15</text>
  <text class="f-val" x="350" y="130" style="font-size:13px">10</text>
  <text class="f-val" x="470" y="130" style="font-size:13px">78</text>

  <rect class="f-box" x="60" y="146" width="470" height="30" rx="4" opacity=".55"/>
  <text class="f-val" x="130" y="166" style="font-size:13px" opacity=".55">Sita Rai</text>
  <text class="f-val" x="245" y="166" style="font-size:13px" opacity=".55">16</text>
  <text class="f-val" x="350" y="166" style="font-size:13px" opacity=".55">10</text>
  <text class="f-val" x="470" y="166" style="font-size:13px" opacity=".55">85</text>

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
  <text class="f-val" x="185" y="152" style="font-size:13px">GLOBAL DATA</text>
  <text class="f-lbl" x="185" y="170">unprotected</text>

  <rect class="f-box" x="20"  y="60" width="90" height="34" rx="5"/><text class="f-val" x="65"  y="82" style="font-size:11px">func1()</text>
  <rect class="f-box" x="140" y="60" width="90" height="34" rx="5"/><text class="f-val" x="185" y="82" style="font-size:11px">func2()</text>
  <rect class="f-box" x="260" y="60" width="90" height="34" rx="5"/><text class="f-val" x="305" y="82" style="font-size:11px">func3()</text>
  <rect class="f-box" x="20"  y="212" width="90" height="34" rx="5"/><text class="f-val" x="65"  y="234" style="font-size:11px">func4()</text>
  <rect class="f-box" x="260" y="212" width="90" height="34" rx="5"/><text class="f-val" x="305" y="234" style="font-size:11px">func5()</text>

  <path class="f-arr" marker-end="url(#a-pvo)" style="stroke:#ff8f7a" d="M75,96 L140,126"/>
  <path class="f-arr" marker-end="url(#a-pvo)" style="stroke:#ff8f7a" d="M185,96 L185,124"/>
  <path class="f-arr" marker-end="url(#a-pvo)" style="stroke:#ff8f7a" d="M295,96 L230,126"/>
  <path class="f-arr" marker-end="url(#a-pvo)" style="stroke:#ff8f7a" d="M75,210 L140,182"/>
  <path class="f-arr" marker-end="url(#a-pvo)" style="stroke:#ff8f7a" d="M295,210 L230,182"/>
  <text class="f-lbl" x="185" y="272" fill="#ff8f7a">Any function can spoil the data. Hard to find who broke it.</text>

  <line class="f-ln" x1="380" y1="34" x2="380" y2="300" stroke-dasharray="5 5"/>

  <text class="f-lbl-y" x="382" y="46" text-anchor="start">OBJECT-ORIENTED (C++) — data is PRIVATE inside the object</text>

  <rect class="f-box-d" x="410" y="62" width="130" height="130" rx="10"/>
  <text class="f-lbl-y" x="475" y="80">Object: acc1</text>
  <rect class="f-box-c" x="432" y="112" width="86" height="40" rx="6"/>
  <text class="f-val" x="475" y="130" style="font-size:11px">balance</text>
  <text class="f-lbl" x="475" y="145">private</text>
  <rect class="f-box-g" x="424" y="160" width="102" height="24" rx="12"/>
  <text class="f-val" x="475" y="176" style="font-size:10px">deposit() public</text>

  <rect class="f-box-d" x="560" y="62" width="130" height="130" rx="10"/>
  <text class="f-lbl-y" x="625" y="80">Object: acc2</text>
  <rect class="f-box-c" x="582" y="112" width="86" height="40" rx="6"/>
  <text class="f-val" x="625" y="130" style="font-size:11px">balance</text>
  <text class="f-lbl" x="625" y="145">private</text>
  <rect class="f-box-g" x="574" y="160" width="102" height="24" rx="12"/>
  <text class="f-val" x="625" y="176" style="font-size:10px">deposit() public</text>

  <rect class="f-box" x="470" y="220" width="160" height="34" rx="5"/>
  <text class="f-val" x="550" y="242" style="font-size:11px">outside code</text>
  <path class="f-arr" marker-end="url(#a-pvo2)" style="stroke:#9ae6a0" d="M510,218 L480,190"/>
  <path class="f-arr" marker-end="url(#a-pvo2)" style="stroke:#9ae6a0" d="M590,218 L622,190"/>
  <text class="f-lbl" x="550" y="278" fill="#9ae6a0">Outside code can only knock on the public door.</text>
  <text class="f-lbl" x="550" y="296" fill="#9ae6a0">It can never touch balance directly.</text>
</svg>`;

D.programAnatomy = `
<svg viewBox="0 0 720 310" role="img" aria-labelledby="t-anat">
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
  <text class="f-lbl"   x="480" y="74" text-anchor="start">brings in cout and cin</text>

  <path class="f-arr" marker-end="url(#a-anat)" d="M470,92 L410,92"/>
  <text class="f-lbl-y" x="480" y="92" text-anchor="start">Namespace</text>
  <text class="f-lbl"   x="480" y="108" text-anchor="start">lets you write cout, not std::cout</text>

  <path class="f-arr" marker-end="url(#a-anat)" d="M470,134 L410,134"/>
  <text class="f-lbl-y" x="480" y="134" text-anchor="start">main() — the starting point</text>
  <text class="f-lbl"   x="480" y="154" text-anchor="start">execution ALWAYS begins here</text>

  <path class="f-arr" marker-end="url(#a-anat)" d="M470,174 L410,174"/>
  <text class="f-lbl-y" x="480" y="174" text-anchor="start">Statement — ends with ;</text>

  <path class="f-arr" marker-end="url(#a-anat)" d="M470,208 L410,208"/>
  <text class="f-lbl-y" x="480" y="208" text-anchor="start">return 0 — tells the OS</text>
  <text class="f-lbl"   x="480" y="228" text-anchor="start">the program ended successfully</text>

  <text class="f-lbl" x="360" y="294">The braces { } mark the body of the function. Every opening brace needs a closing brace.</text>
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
  <text class="f-lbl-y" x="130" y="84" style="font-size:12px">class Student</text>
  <text class="f-lbl" x="130" y="102">the design on paper</text>
  <line class="f-ln" x1="50" y1="112" x2="210" y2="112"/>
  <text class="f-code" x="50" y="136" style="font-size:11px">string name;</text>
  <text class="f-code" x="50" y="158" style="font-size:11px">int roll;</text>
  <line class="f-ln" x1="50" y1="170" x2="210" y2="170" stroke-dasharray="4 3"/>
  <text class="f-code" x="50" y="194" style="font-size:11px">void setData();</text>
  <text class="f-code" x="50" y="216" style="font-size:11px">void display();</text>
  <text class="f-lbl" x="130" y="252" fill="#ff8f7a">takes NO memory</text>

  <path class="f-arr" marker-end="url(#a-co)" d="M240,100 L300,90"/>
  <path class="f-arr" marker-end="url(#a-co)" d="M240,145 L300,160"/>
  <path class="f-arr" marker-end="url(#a-co)" d="M240,190 L300,230"/>

  <rect class="f-box" x="320" y="52" width="170" height="76" rx="8"/>
  <text class="f-lbl-y" x="405" y="72">object s1</text>
  <text class="f-code" x="340" y="94" style="font-size:11px">name = "Ram"</text>
  <text class="f-code" x="340" y="114" style="font-size:11px">roll = 15</text>

  <rect class="f-box" x="320" y="140" width="170" height="76" rx="8"/>
  <text class="f-lbl-y" x="405" y="160">object s2</text>
  <text class="f-code" x="340" y="182" style="font-size:11px">name = "Sita"</text>
  <text class="f-code" x="340" y="202" style="font-size:11px">roll = 16</text>

  <rect class="f-box" x="320" y="228" width="170" height="60" rx="8"/>
  <text class="f-lbl-y" x="405" y="248">object s3</text>
  <text class="f-code" x="340" y="272" style="font-size:11px">name = "Hari"</text>

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

  <text class="f-val" x="280" y="162" style="font-size:12px">private</text>
  <text class="f-lbl" x="280" y="180" style="font-size:10px">the secret core</text>
  <text class="f-lbl-y" x="280" y="118">protected</text>
  <text class="f-val" x="280" y="72" style="font-size:12px" fill="#9ae6a0">public</text>

  <text class="f-lbl" x="105" y="165" fill="#9ae6a0">outside</text>
  <path class="f-arr" marker-end="url(#a-acc)" style="stroke:#9ae6a0" d="M140,180 L192,180"/>
  <text class="f-lbl" x="120" y="212" style="font-size:10px" fill="#9ae6a0" text-anchor="middle">reaches public ✓</text>
  <path class="f-arr" marker-end="url(#a-accx)" style="stroke:#ff8f7a" d="M140,148 L228,148"/>
  <text class="f-lbl" x="112" y="108" style="font-size:10px" fill="#ff8f7a" text-anchor="middle">blocked from private ✗</text>

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
  <text class="f-lbl" x="655" y="176" text-anchor="start">time →</text>

  <circle class="f-box-g" cx="120" cy="150" r="12"/>
  <text class="f-lbl-y" x="120" y="120">Student s1;</text>
  <text class="f-lbl" x="120" y="102" style="font-size:10px">object created</text>
  <text class="f-val" x="120" y="196" style="font-size:11px" fill="#9ae6a0">Constructor</text>
  <text class="f-val" x="120" y="212" style="font-size:11px" fill="#9ae6a0">for Ram</text>

  <circle class="f-box-g" cx="270" cy="150" r="12"/>
  <text class="f-lbl-y" x="270" y="120">Student s2;</text>
  <text class="f-val" x="270" y="196" style="font-size:11px" fill="#9ae6a0">Constructor</text>
  <text class="f-val" x="270" y="212" style="font-size:11px" fill="#9ae6a0">for Sita</text>

  <circle class="f-box" cx="420" cy="150" r="12"/>
  <text class="f-lbl-y" x="420" y="120">work happens</text>
  <text class="f-lbl" x="420" y="196" style="font-size:11px">display() calls</text>

  <circle class="f-box-c" cx="540" cy="150" r="12"/>
  <text class="f-lbl-y" x="540" y="120">main() ends</text>
  <text class="f-val" x="540" y="196" style="font-size:11px" fill="#ff8f7a">Destructor</text>
  <text class="f-val" x="540" y="212" style="font-size:11px" fill="#ff8f7a">for Sita ← last in</text>

  <circle class="f-box-c" cx="650" cy="150" r="12"/>
  <text class="f-val" x="640" y="196" style="font-size:11px" fill="#ff8f7a">Destructor</text>
  <text class="f-val" x="640" y="212" style="font-size:11px" fill="#ff8f7a">for Ram</text>

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
  <text class="f-val" x="115" y="124" style="font-size:11px">start()</text>
  <rect class="f-box-g" x="62" y="144" width="106" height="30" rx="15"/>
  <text class="f-val" x="115" y="164" style="font-size:11px">stop()</text>
  <text class="f-lbl" x="115" y="196" style="font-size:10px">simple, safe buttons</text>

  <path class="f-arr" marker-end="url(#a-abs)" d="M200,135 L268,135"/>
  <text class="f-lbl-y" x="234" y="126" style="font-size:10px">calls</text>

  <rect class="f-box-d" x="280" y="52" width="200" height="166" rx="10"/>
  <text class="f-lbl-y" x="380" y="76">THE WALL</text>
  <text class="f-lbl" x="380" y="94" style="font-size:10px">interface / abstraction layer</text>
  <line class="f-ln" x1="300" y1="106" x2="460" y2="106" stroke-dasharray="4 3"/>
  <text class="f-lbl" x="380" y="132" style="font-size:10px">you cannot see past this</text>
  <text class="f-lbl" x="380" y="172" style="font-size:26px" fill="#ffd76e">🔒</text>

  <rect class="f-box-c" x="500" y="60" width="190" height="150" rx="10"/>
  <text class="f-lbl-y" x="595" y="86">HIDDEN INSIDE</text>
  <text class="f-lbl" x="595" y="112" style="font-size:10px">fuel injection logic</text>
  <text class="f-lbl" x="595" y="132" style="font-size:10px">spark timing</text>
  <text class="f-lbl" x="595" y="152" style="font-size:10px">temperature control</text>
  <text class="f-lbl" x="595" y="172" style="font-size:10px">400 lines of code</text>
  <text class="f-lbl" x="595" y="196" style="font-size:10px" fill="#ff8f7a">can change any time</text>

  <text class="f-lbl-y" x="360" y="246">Because the buttons never change, the hidden code CAN be rewritten without breaking your program.</text>
</svg>`;

D.encapsulation = `
<svg viewBox="0 0 640 304" role="img" aria-labelledby="t-enc">
  <title id="t-enc">Encapsulation puts private data inside a capsule guarded by public functions</title>
  <defs><marker id="a-enc" viewBox="0 0 10 10" refX="9" refY="5"
    markerWidth="6" markerHeight="6" orient="auto">
    <path d="M0,0 L10,5 L0,10 z" fill="#9ae6a0"/></marker></defs>
  <text class="f-ttl" x="10" y="20">ENCAPSULATION — private data wrapped in a capsule of public functions</text>

  <rect x="208" y="54" width="392" height="192" rx="96" fill="rgba(154,230,160,.05)" style="stroke:#9ae6a0;stroke-width:1.8"/>
  <text class="f-lbl-y" x="404" y="84" style="font-size:13px">class Account</text>

  <rect class="f-box-c" x="322" y="98" width="164" height="60" rx="10"/>
  <text class="f-val" x="404" y="123" style="font-size:14px">balance</text>
  <text class="f-lbl" x="404" y="144" style="font-size:10.5px">PRIVATE — hidden</text>

  <rect class="f-box-g" x="252" y="182" width="140" height="32" rx="16"/>
  <text class="f-val" x="322" y="203" style="font-size:11.5px">setBalance()</text>
  <rect class="f-box-g" x="416" y="182" width="140" height="32" rx="16"/>
  <text class="f-val" x="486" y="203" style="font-size:11.5px">getBalance()</text>
  <text class="f-lbl" x="404" y="234" style="font-size:10.5px;letter-spacing:.6px">PUBLIC — the only way in or out</text>

  <text class="f-lbl" x="16" y="72" text-anchor="start" style="font-size:10px;letter-spacing:1.2px">CODE OUTSIDE THE CLASS</text>
  <path d="M16,80 L120,80" style="stroke:#4c7368;stroke-width:1;stroke-dasharray:4 4;fill:none"/>

  <text class="f-lbl" x="16" y="118" text-anchor="start" fill="#ff8f7a" style="font-weight:700">BLOCKED</text>
  <text class="f-code" x="16" y="135" style="font-size:10.5px" fill="#ff8f7a">a.balance = -500</text>
  <path class="f-arr" style="stroke:#ff8f7a" d="M134,124 L196,124"/>
  <circle cx="208" cy="124" r="9.5" fill="rgba(255,143,122,.18)" style="stroke:#ff8f7a;stroke-width:1.6"/>
  <text x="208" y="128.5" text-anchor="middle" fill="#ff8f7a" style="font-size:11px;font-weight:700">✕</text>

  <text class="f-lbl" x="16" y="192" text-anchor="start" fill="#9ae6a0" style="font-weight:700">ALLOWED</text>
  <text class="f-code" x="16" y="209" style="font-size:10.5px" fill="#9ae6a0">a.setBalance(5000)</text>
  <path class="f-arr" marker-end="url(#a-enc)" style="stroke:#9ae6a0" d="M134,198 L246,198"/>

  <text class="f-lbl-y" x="320" y="272">The setter can REFUSE a bad value — a negative balance never gets in.</text>
  <text class="f-lbl" x="320" y="290">That is why data hiding protects the program.</text>
</svg>`;

/* ---------------------------------------------------------------
   UNIT 5 — INHERITANCE
   --------------------------------------------------------------- */

/* width grows with the label so word names like "Animal" never overflow */
function inhBox(x, y, label, cls){
  const w = Math.max(52, label.length * 9 + 18);
  return `<rect class="${cls || 'f-box'}" x="${x - w / 2}" y="${y - 17}" width="${w}" height="34" rx="6"/>
          <text class="f-val" x="${x}" y="${y + 6}" style="font-size:13px">${label}</text>`;
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
  <text class="f-lbl" x="80" y="172" style="font-size:10px">one base → one derived</text>

  <!-- 2 multilevel -->
  <text class="f-lbl-y" x="240" y="38">2 · MULTILEVEL</text>
  <line class="f-ln" x1="240" y1="82" x2="240" y2="98"/>
  <line class="f-ln" x1="240" y1="132" x2="240" y2="148"/>
  ${inhBox(240, 65, 'A', 'f-box-y')}
  ${inhBox(240, 115, 'B')}
  ${inhBox(240, 165, 'C')}
  <text class="f-lbl" x="240" y="196" style="font-size:10px">a chain: B is derived,</text>
  <text class="f-lbl" x="240" y="210" style="font-size:10px">then becomes a base</text>

  <!-- 3 multiple -->
  <text class="f-lbl-y" x="430" y="38">3 · MULTIPLE</text>
  <line class="f-ln" x1="400" y1="82" x2="430" y2="118"/>
  <line class="f-ln" x1="460" y1="82" x2="430" y2="118"/>
  ${inhBox(400, 65, 'A', 'f-box-y')}
  ${inhBox(460, 65, 'B', 'f-box-y')}
  ${inhBox(430, 135, 'C')}
  <text class="f-lbl" x="430" y="172" style="font-size:10px">two bases → one derived</text>

  <!-- 4 hierarchical -->
  <text class="f-lbl-y" x="610" y="38">4 · HIERARCHICAL</text>
  <line class="f-ln" x1="610" y1="82" x2="570" y2="118"/>
  <line class="f-ln" x1="610" y1="82" x2="650" y2="118"/>
  ${inhBox(610, 65, 'A', 'f-box-y')}
  ${inhBox(570, 135, 'B')}
  ${inhBox(650, 135, 'C')}
  <text class="f-lbl" x="610" y="172" style="font-size:10px">one base → many derived</text>

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
  <text class="f-code" x="320" y="410" style="font-size:11px">class B : virtual public A { };</text>
</svg>`;

D.inhAccess = `
<svg viewBox="0 0 720 300" role="img" aria-labelledby="t-inha">
  <title id="t-inha">What happens to base class members under each inheritance mode</title>
  ${ah('a-inha')}
  <text class="f-ttl" x="10" y="18">What the derived class actually receives — the most-asked table, drawn</text>

  <rect class="f-box-y" x="30" y="44" width="150" height="140" rx="8"/>
  <text class="f-lbl-y" x="105" y="66">BASE class</text>
  <rect class="f-box-g" x="48" y="80" width="114" height="26" rx="5"/><text class="f-val" x="105" y="98" style="font-size:11px">public</text>
  <rect class="f-box-y" x="48" y="112" width="114" height="26" rx="5"/><text class="f-val" x="105" y="130" style="font-size:11px">protected</text>
  <rect class="f-box-c" x="48" y="144" width="114" height="26" rx="5"/><text class="f-val" x="105" y="162" style="font-size:11px">private</text>

  <path class="f-arr" marker-end="url(#a-inha)" d="M190,92 L250,80"/>
  <path class="f-arr" marker-end="url(#a-inha)" d="M190,124 L250,150"/>
  <path class="f-arr" marker-end="url(#a-inha)" d="M190,156 L250,222"/>

  <rect class="f-box-d" x="260" y="44" width="130" height="80" rx="8"/>
  <text class="f-lbl-y" x="325" y="64" style="font-size:11px">: public</text>
  <text class="f-lbl" x="325" y="86" style="font-size:10px" fill="#9ae6a0">public stays public</text>
  <text class="f-lbl" x="325" y="104" style="font-size:10px" fill="#ffd76e">protected stays protected</text>

  <rect class="f-box-d" x="260" y="134" width="130" height="80" rx="8"/>
  <text class="f-lbl-y" x="325" y="154" style="font-size:11px">: protected</text>
  <text class="f-lbl" x="325" y="176" style="font-size:10px" fill="#ffd76e">public → protected</text>
  <text class="f-lbl" x="325" y="194" style="font-size:10px" fill="#ffd76e">protected stays</text>

  <rect class="f-box-d" x="260" y="224" width="130" height="66" rx="8"/>
  <text class="f-lbl-y" x="325" y="244" style="font-size:11px">: private</text>
  <text class="f-lbl" x="325" y="266" style="font-size:10px" fill="#ff8f7a">both become private</text>

  <rect class="f-box-c" x="430" y="120" width="260" height="110" rx="8"/>
  <text class="f-lbl-y" x="560" y="146">The one rule that never changes</text>
  <text class="f-val" x="560" y="176" style="font-size:13px" fill="#ff8f7a">private members are</text>
  <text class="f-val" x="560" y="196" style="font-size:13px" fill="#ff8f7a">NEVER inherited</text>
  <text class="f-lbl" x="560" y="216" style="font-size:10px">in any mode — they exist, but the child cannot touch them</text>
</svg>`;

D.ctorOrder = {
  type: 'animated',
  intro: {
    en: 'One Puppy object is about to be created. Press Next and watch the ORDER.',
    ne: 'एउटा Puppy अब्जेक्ट बन्न लागेको छ। Next थिच्नुहोस् र क्रम हेर्नुहोस्।'
  },
  svg: `
<svg viewBox="0 0 720 300" role="img" aria-labelledby="t-cord">
  <title id="t-cord">Constructor and destructor order in multilevel inheritance</title>
  ${ah('a-cord', '#9ae6a0')}
  ${ah('a-cordr', '#ff8f7a')}
  <text class="f-ttl" x="10" y="18">Creating ONE Puppy object runs THREE constructors — and destroys them in reverse</text>

  <text class="f-lbl-y" x="150" y="42" style="font-size:10px">CONSTRUCTORS — base first</text>
  <text class="f-lbl-y" x="570" y="42" style="font-size:10px">DESTRUCTORS — derived first</text>

  <g id="cls-animal" class="dia-focus">
    <rect class="f-box-y" x="290" y="54" width="140" height="40" rx="6"/>
    <text class="f-val" x="360" y="79" style="font-size:13px">Animal</text>
  </g>
  <g id="cls-dog" class="dia-focus">
    <rect class="f-box" x="290" y="128" width="140" height="40" rx="6"/>
    <text class="f-val" x="360" y="153" style="font-size:13px">Dog</text>
  </g>
  <g id="cls-puppy" class="dia-focus">
    <rect class="f-box" x="290" y="202" width="140" height="40" rx="6"/>
    <text class="f-val" x="360" y="227" style="font-size:13px">Puppy</text>
  </g>
  <line class="f-ln" x1="360" y1="94"  x2="360" y2="128"/>
  <line class="f-ln" x1="360" y1="168" x2="360" y2="202"/>

  <g id="ctor-1" class="dia-step">
    <path class="f-arr" marker-end="url(#a-cord)" style="stroke:#9ae6a0" d="M250,80 L284,80"/>
    <text class="f-val" x="240" y="84" style="font-size:11px" fill="#9ae6a0" text-anchor="end">1 · Animal()</text>
  </g>
  <g id="ctor-2" class="dia-step">
    <path class="f-arr" marker-end="url(#a-cord)" style="stroke:#9ae6a0" d="M250,154 L284,154"/>
    <text class="f-val" x="240" y="158" style="font-size:11px" fill="#9ae6a0" text-anchor="end">2 · Dog()</text>
  </g>
  <g id="ctor-3" class="dia-step">
    <path class="f-arr" marker-end="url(#a-cord)" style="stroke:#9ae6a0" d="M250,228 L284,228"/>
    <text class="f-val" x="240" y="232" style="font-size:11px" fill="#9ae6a0" text-anchor="end">3 · Puppy()</text>
  </g>

  <g id="dtor-1" class="dia-step">
    <path class="f-arr" marker-end="url(#a-cordr)" style="stroke:#ff8f7a" d="M470,228 L436,228"/>
    <text class="f-val" x="480" y="232" style="font-size:11px" fill="#ff8f7a" text-anchor="start">1 · ~Puppy()</text>
  </g>
  <g id="dtor-2" class="dia-step">
    <path class="f-arr" marker-end="url(#a-cordr)" style="stroke:#ff8f7a" d="M470,154 L436,154"/>
    <text class="f-val" x="480" y="158" style="font-size:11px" fill="#ff8f7a" text-anchor="start">2 · ~Dog()</text>
  </g>
  <g id="dtor-3" class="dia-step">
    <path class="f-arr" marker-end="url(#a-cordr)" style="stroke:#ff8f7a" d="M470,80 L436,80"/>
    <text class="f-val" x="480" y="84" style="font-size:11px" fill="#ff8f7a" text-anchor="start">3 · ~Animal()</text>
  </g>

  <g id="verdict" class="dia-step">
    <rect class="f-box-c" x="130" y="262" width="460" height="30" rx="6"/>
    <text class="f-lbl-y" x="360" y="282" style="font-size:11px">Destruction is the EXACT REVERSE of construction.</text>
  </g>
</svg>`,
  steps: [
    { show: '#ctor-1', focus: '#cls-animal',
      en: 'Animal() runs first — the top-most base class is always constructed first.',
      ne: 'पहिले Animal() चल्छ — सबैभन्दा माथिको base क्लास सधैं पहिले बन्छ।' },
    { show: '#ctor-2', focus: '#cls-dog', hide: '#cls-animal',
      en: 'Dog() runs second, once its own base is ready.',
      ne: 'आफ्नो base तयार भएपछि दोस्रोमा Dog() चल्छ।' },
    { show: '#ctor-3', focus: '#cls-puppy', hide: '#cls-dog',
      en: 'Puppy() runs last. The object is now completely built.',
      ne: 'अन्तिममा Puppy() चल्छ। अब अब्जेक्ट पूरै तयार भयो।' },
    { show: '#dtor-1', focus: '#cls-puppy',
      en: 'Now it is destroyed. ~Puppy() runs FIRST — the most derived class goes first.',
      ne: 'अब नष्ट हुँदैछ। पहिले ~Puppy() चल्छ — सबैभन्दा तलको derived क्लास पहिले जान्छ।' },
    { show: '#dtor-2', focus: '#cls-dog', hide: '#cls-puppy',
      en: '~Dog() runs second.',
      ne: 'दोस्रोमा ~Dog() चल्छ।' },
    { show: ['#dtor-3', '#verdict'], focus: '#cls-animal', hide: '#cls-dog',
      en: '~Animal() runs last. Destruction is the exact reverse of construction — this is the exam answer.',
      ne: 'अन्तिममा ~Animal() चल्छ। नष्ट हुने क्रम बन्ने क्रमको ठ्याक्कै उल्टो हो — परीक्षाको उत्तर यही हो।' }
  ]
};

/* ---------------------------------------------------------------
   UNIT 6 — POLYMORPHISM
   --------------------------------------------------------------- */

D.polyTypes = `
<svg viewBox="0 0 720 300" role="img" aria-labelledby="t-poly">
  <title id="t-poly">Polymorphism split into compile-time and run-time types</title>
  <text class="f-ttl" x="10" y="18">Types of Polymorphism — this tree is worth full marks on its own</text>

  <rect class="f-box-y" x="270" y="36" width="180" height="44" rx="8"/>
  <text class="f-val" x="360" y="58" style="font-size:13px">POLYMORPHISM</text>
  <text class="f-lbl" x="360" y="73" style="font-size:9px">one name, many forms</text>

  <line class="f-ln" x1="360" y1="80" x2="360" y2="98"/>
  <line class="f-ln" x1="180" y1="98" x2="540" y2="98"/>
  <line class="f-ln" x1="180" y1="98" x2="180" y2="118"/>
  <line class="f-ln" x1="540" y1="98" x2="540" y2="118"/>

  <rect class="f-box" x="70" y="118" width="220" height="56" rx="8"/>
  <text class="f-val" x="180" y="140" style="font-size:12px">COMPILE-TIME</text>
  <text class="f-lbl" x="180" y="158" style="font-size:10px">static · early binding</text>

  <rect class="f-box-c" x="430" y="118" width="220" height="56" rx="8"/>
  <text class="f-val" x="540" y="140" style="font-size:12px">RUN-TIME</text>
  <text class="f-lbl" x="540" y="158" style="font-size:10px">dynamic · late binding</text>

  <line class="f-ln" x1="180" y1="174" x2="180" y2="192"/>
  <line class="f-ln" x1="110" y1="192" x2="250" y2="192"/>
  <line class="f-ln" x1="110" y1="192" x2="110" y2="210"/>
  <line class="f-ln" x1="250" y1="192" x2="250" y2="210"/>
  <rect class="f-box-g" x="40" y="210" width="140" height="44" rx="6"/>
  <text class="f-val" x="110" y="230" style="font-size:11px">Function</text>
  <text class="f-val" x="110" y="246" style="font-size:11px">Overloading</text>
  <rect class="f-box-g" x="190" y="210" width="140" height="44" rx="6"/>
  <text class="f-val" x="260" y="230" style="font-size:11px">Operator</text>
  <text class="f-val" x="260" y="246" style="font-size:11px">Overloading</text>

  <line class="f-ln" x1="540" y1="174" x2="540" y2="192"/>
  <line class="f-ln" x1="470" y1="192" x2="610" y2="192"/>
  <line class="f-ln" x1="470" y1="192" x2="470" y2="210"/>
  <line class="f-ln" x1="610" y1="192" x2="610" y2="210"/>
  <rect class="f-box-g" x="400" y="210" width="140" height="44" rx="6"/>
  <text class="f-val" x="470" y="230" style="font-size:11px">Function</text>
  <text class="f-val" x="470" y="246" style="font-size:11px">Overriding</text>
  <rect class="f-box-g" x="550" y="210" width="140" height="44" rx="6"/>
  <text class="f-val" x="620" y="230" style="font-size:11px">Virtual</text>
  <text class="f-val" x="620" y="246" style="font-size:11px">Functions</text>

  <text class="f-lbl-y" x="180" y="284">decided BEFORE the program runs</text>
  <text class="f-lbl-y" x="540" y="284">decided WHILE the program runs</text>
</svg>`;

D.dispatch = {
  type: 'animated',
  intro: {
    en: 'The same line p->draw() is about to run twice. Watch where it ends up.',
    ne: 'उही लाइन p->draw() दुई पटक चल्न लागेको छ। कहाँ पुग्छ हेर्नुहोस्।'
  },
  svg: `
<svg viewBox="0 0 720 330" role="img" aria-labelledby="t-disp">
  <title id="t-disp">How a base class pointer chooses the derived version of a virtual function</title>
  ${ah('a-disp')}
  ${ah('a-disp2', '#9ae6a0')}
  <text class="f-ttl" x="10" y="18">Run-time dispatch — the same line p-&gt;draw() gives two different answers</text>

  <g id="ptr" class="dia-focus">
    <rect class="f-box-y" x="30" y="130" width="120" height="50" rx="8"/>
    <text class="f-val" x="90" y="152" style="font-size:12px">Shape *p</text>
    <text class="f-lbl" x="90" y="169" style="font-size:10px">base pointer</text>
  </g>

  <g id="obj-c" class="dia-focus">
    <rect class="f-box" x="250" y="52" width="150" height="70" rx="8"/>
    <text class="f-lbl-y" x="325" y="74">object c</text>
    <text class="f-lbl" x="325" y="92" style="font-size:10px">real type: Circle</text>
    <text class="f-lbl" x="325" y="110" style="font-size:10px">has its own draw()</text>
  </g>
  <g id="obj-s" class="dia-focus">
    <rect class="f-box" x="250" y="198" width="150" height="70" rx="8"/>
    <text class="f-lbl-y" x="325" y="220">object s</text>
    <text class="f-lbl" x="325" y="238" style="font-size:10px">real type: Square</text>
    <text class="f-lbl" x="325" y="256" style="font-size:10px">has its own draw()</text>
  </g>

  <g id="link-c" class="dia-step">
    <path class="f-arr" marker-end="url(#a-disp)" d="M156,144 L246,86"/>
    <text class="f-lbl-y" x="196" y="106" style="font-size:10px">p = &amp;c</text>
  </g>
  <g id="link-s" class="dia-step">
    <path class="f-arr" marker-end="url(#a-disp)" d="M156,168 L246,232"/>
    <text class="f-lbl-y" x="196" y="216" style="font-size:10px">p = &amp;s</text>
  </g>

  <g id="call-c" class="dia-step">
    <path class="f-arr" marker-end="url(#a-disp2)" style="stroke:#9ae6a0" d="M406,86 L486,86"/>
    <rect class="f-box-g" x="490" y="60" width="200" height="52" rx="8"/>
    <text class="f-val" x="590" y="82" style="font-size:12px">Circle::draw()</text>
    <text class="f-lbl" x="590" y="100" style="font-size:10px">"Drawing a Circle"</text>
  </g>
  <g id="call-s" class="dia-step">
    <path class="f-arr" marker-end="url(#a-disp2)" style="stroke:#9ae6a0" d="M406,232 L486,232"/>
    <rect class="f-box-g" x="490" y="206" width="200" height="52" rx="8"/>
    <text class="f-val" x="590" y="228" style="font-size:12px">Square::draw()</text>
    <text class="f-lbl" x="590" y="246" style="font-size:10px">"Drawing a Square"</text>
  </g>

  <g id="rule" class="dia-step">
    <rect class="f-box-c" x="120" y="288" width="480" height="34" rx="6"/>
    <text class="f-lbl-y" x="360" y="310" style="font-size:11px">Delete the word "virtual" and BOTH calls print "Drawing a Shape".</text>
  </g>
</svg>`,
  steps: [
    { focus: '#ptr',
      en: 'p is a Shape pointer. Its declared type never changes — only what it points at.',
      ne: 'p एउटा Shape पोइन्टर हो। यसको घोषित प्रकार बदलिँदैन — केवल यसले देखाउने वस्तु बदलिन्छ।' },
    { show: '#link-c', focus: ['#ptr', '#obj-c'],
      en: 'p = &c — the pointer now holds the address of a Circle object.',
      ne: 'p = &c — अब पोइन्टरसँग Circle अब्जेक्टको ठेगाना छ।' },
    { show: '#call-c', hide: '#ptr',
      en: 'p->draw() runs. Because draw() is virtual, C++ looks at the OBJECT and calls Circle::draw().',
      ne: 'p->draw() चल्यो। draw() virtual भएकाले C++ ले अब्जेक्ट हेरेर Circle::draw() बोलायो।' },
    { show: '#link-s', hide: ['#obj-c', '#link-c', '#call-c'], focus: ['#ptr', '#obj-s'],
      en: 'p = &s — the SAME pointer, now pointing at a Square.',
      ne: 'p = &s — उही पोइन्टर, अब Square तिर देखाइरहेको।' },
    { show: '#call-s', hide: '#ptr',
      en: 'The identical line p->draw() now calls Square::draw(). The line did not change — the object did.',
      ne: 'उही लाइन p->draw() ले अब Square::draw() बोलायो। लाइन बदलिएन — अब्जेक्ट बदलियो।' },
    { show: '#rule',
      en: 'This only happens because draw() is virtual. Without it, C++ would decide from the pointer type at compile time.',
      ne: 'यो draw() virtual भएकाले मात्र हुन्छ। नभए C++ ले पोइन्टरको प्रकार हेरेर कम्पाइल गर्दै निर्णय गर्थ्यो।' }
  ]
};

D.overloadResolve = `
<svg viewBox="0 0 720 250" role="img" aria-labelledby="t-ovr">
  <title id="t-ovr">The compiler picks an overloaded function by matching the arguments</title>
  ${ah('a-ovr', '#9ae6a0')}
  ${ah('a-ovrx', '#ff8f7a')}
  <text class="f-ttl" x="10" y="18">Overload resolution — the compiler matches by ARGUMENTS, before the program runs</text>

  <rect class="f-box-y" x="250" y="40" width="220" height="44" rx="8"/>
  <text class="f-code" x="360" y="68" text-anchor="middle" style="font-size:13px">area(4, 6);</text>
  <text class="f-lbl" x="360" y="100" style="font-size:10px">two int arguments</text>

  <path class="f-arr" marker-end="url(#a-ovrx)" style="stroke:#ff8f7a" d="M300,110 L180,150"/>
  <path class="f-arr" marker-end="url(#a-ovr)"  style="stroke:#9ae6a0" d="M420,110 L540,150"/>

  <rect class="f-box-c" x="40" y="158" width="280" height="66" rx="8"/>
  <text class="f-code" x="180" y="184" text-anchor="middle" style="font-size:12px">void area(int s)</text>
  <text class="f-lbl" x="180" y="206" style="font-size:10px" fill="#ff8f7a">needs 1 argument — REJECTED ✗</text>

  <rect class="f-box-g" x="400" y="158" width="280" height="66" rx="8"/>
  <text class="f-code" x="540" y="184" text-anchor="middle" style="font-size:12px">void area(int l, int b)</text>
  <text class="f-lbl" x="540" y="206" style="font-size:10px" fill="#9ae6a0">needs 2 arguments — MATCHED ✓</text>
</svg>`;

module.exports = D;
