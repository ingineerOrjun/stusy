/* ============================================================
   Gyansetu — SVG diagram library
   Every diagram is inline SVG: offline-safe, theme-aware,
   scales to any screen, and carries a <title> for screen readers.
   Referenced from content files as {{dia:name}}.
   ============================================================ */

/* arrow marker, unique id per diagram */
function ah(id, color){
  color = color || 'var(--color-primary)';
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
  ${ah('a-avl', 'var(--color-error)')}
  ${ah('a-avl2', 'var(--color-success)')}

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
  <path class="f-arr" marker-end="url(#a-avl)" style="stroke:var(--color-error)" d="M280,116 L355,116"/>
  <path class="f-arr" marker-end="url(#a-avl)" style="stroke:var(--color-error)" d="M355,132 L430,132"/>
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
  <path class="f-arr" marker-end="url(#a-avl2)" style="stroke:var(--color-success)" d="M114,227 L146,227"/>
  <path class="f-arr" marker-end="url(#a-avl2)" style="stroke:var(--color-primary)" d="M244,232 L276,268"/>
  <path class="f-arr" marker-end="url(#a-avl2)" style="stroke:var(--color-primary)" d="M374,270 L436,238"/>
  <text class="f-lbl" x="600" y="233" text-anchor="start">only 2 links</text>
  <text class="f-lbl" x="600" y="251" text-anchor="start">were re-pointed</text>
</svg>`;

D.stackOps = `
<svg viewBox="0 0 720 280" role="img" aria-labelledby="t-stk">
  <title id="t-stk">Stack push and pop happen at the same end, called the top</title>
  ${ah('a-stk')}
  ${ah('a-stk2', 'var(--color-error)')}
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
  <path class="f-arr" marker-end="url(#a-stk2)" style="stroke:var(--color-error)" d="M238,110 L150,110 L150,86"/>
  <text class="f-lbl" x="120" y="78" text-anchor="middle" style="fill:var(--color-error)">pop() → 30</text>

  <text class="f-lbl" x="360" y="276">The plate you put on LAST is the plate you take off FIRST. The bottom plate leaves last.</text>
</svg>`;

D.queueOps = `
<svg viewBox="0 0 720 220" role="img" aria-labelledby="t-que">
  <title id="t-que">Queue insertion at the rear and deletion at the front</title>
  ${ah('a-que')}
  ${ah('a-que2', 'var(--color-error)')}
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

  <path class="f-arr" marker-end="url(#a-que2)" style="stroke:var(--color-error)" d="M158,105 L92,105"/>
  <text class="f-lbl" x="60" y="98" style="fill:var(--color-error)">dequeue()</text>
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

  <line class="f-ln" x1="183.6" y1="85.8" x2="306.4" y2="64.2" style="stroke:var(--color-secondary)"/>
  <line class="f-ln" x1="351.5" y1="70.7" x2="448.5" y2="119.3" style="stroke:var(--color-primary);stroke-width:2.4"/>
  <line class="f-ln" x1="447.4" y1="138" x2="322.6" y2="182" style="stroke:var(--color-primary);stroke-width:2.4"/>
  <line class="f-ln" x1="305.4" y1="166.6" x2="324.6" y2="83.4" style="stroke:var(--color-primary);stroke-width:2.4"/>
  <line class="f-ln" x1="179.5" y1="103.9" x2="280.5" y2="176.1" style="stroke:var(--color-secondary)"/>
  <line class="f-ln" x1="491.1" y1="141.4" x2="578.9" y2="188.6" style="stroke:var(--color-secondary)"/>

  <circle class="f-node-bg" cx="160" cy="90"  r="24"/>
  <circle class="f-node-bg" cx="330" cy="60"  r="24"/>
  <circle class="f-node-bg" cx="470" cy="130" r="24"/>
  <circle class="f-node-bg" cx="300" cy="190" r="24"/>
  <circle class="f-node-bg" cx="600" cy="200" r="24"/>

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
  <text class="f-ttl" x="10" y="18"><tspan class="t-en">Classification of Data Structures</tspan><tspan class="t-ne"><tspan class="t-en"> — </tspan>डाटा स्ट्रक्चरको वर्गीकरण</tspan></text>

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

  <rect class="f-box-y" x="60" y="108" width="470" height="34" rx="4"/>
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
  ${ah('a-pvo', 'var(--color-error)')}
  ${ah('a-pvo2', 'var(--color-success)')}

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

  <path class="f-arr" marker-end="url(#a-pvo)" style="stroke:var(--color-error)" d="M75,96 L140,126"/>
  <path class="f-arr" marker-end="url(#a-pvo)" style="stroke:var(--color-error)" d="M185,96 L185,124"/>
  <path class="f-arr" marker-end="url(#a-pvo)" style="stroke:var(--color-error)" d="M295,96 L230,126"/>
  <path class="f-arr" marker-end="url(#a-pvo)" style="stroke:var(--color-error)" d="M75,210 L140,182"/>
  <path class="f-arr" marker-end="url(#a-pvo)" style="stroke:var(--color-error)" d="M295,210 L230,182"/>
  <text class="f-lbl" x="185" y="272" style="fill:var(--color-error)">Any function can spoil the data. Hard to find who broke it.</text>

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
  <path class="f-arr" marker-end="url(#a-pvo2)" style="stroke:var(--color-success)" d="M510,218 L480,190"/>
  <path class="f-arr" marker-end="url(#a-pvo2)" style="stroke:var(--color-success)" d="M590,218 L622,190"/>
  <text class="f-lbl" x="550" y="278" style="fill:var(--color-success)">Outside code can only knock on the public door.</text>
  <text class="f-lbl" x="550" y="296" style="fill:var(--color-success)">It can never touch balance directly.</text>
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
  <text class="f-code" x="60" y="158">cout &lt;&lt; "Hello Gyansetu";</text>
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
  <text class="f-lbl" x="130" y="252" style="fill:var(--color-error)">takes NO memory</text>

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
  ${ah('a-acc', 'var(--color-success)')}
  ${ah('a-accx', 'var(--color-error)')}
  <text class="f-ttl" x="10" y="18">Access specifiers — who is allowed to reach inside the class?</text>

  <circle cx="280" cy="165" r="115" fill="rgba(154,230,160,.06)" style="stroke:var(--color-success);stroke-width:1.6"/>
  <circle cx="280" cy="165" r="80"  fill="rgba(255,215,110,.07)" style="stroke:var(--color-primary);stroke-width:1.6"/>
  <circle cx="280" cy="165" r="44"  fill="rgba(255,143,122,.12)" style="stroke:var(--color-error);stroke-width:1.8"/>

  <text class="f-val" x="280" y="162" style="font-size:12px">private</text>
  <text class="f-lbl" x="280" y="180" style="font-size:10px">the secret core</text>
  <text class="f-lbl-y" x="280" y="118">protected</text>
  <text class="f-val" x="280" y="72" style="font-size:12px;fill:var(--color-success)">public</text>

  <text class="f-lbl" x="105" y="165" style="fill:var(--color-success)">outside</text>
  <path class="f-arr" marker-end="url(#a-acc)" style="stroke:var(--color-success)" d="M140,180 L192,180"/>
  <text class="f-lbl" x="120" y="212" style="font-size:10px;fill:var(--color-success)" text-anchor="middle">reaches public ✓</text>
  <path class="f-arr" marker-end="url(#a-accx)" style="stroke:var(--color-error)" d="M140,148 L228,148"/>
  <text class="f-lbl" x="112" y="108" style="font-size:10px;fill:var(--color-error)" text-anchor="middle">blocked from private ✗</text>

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

  <line class="f-ln" x1="40" y1="150" x2="680" y2="150" style="stroke:var(--color-border);stroke-width:2"/>
  <path class="f-arr" marker-end="url(#a-cd)" d="M660,150 L690,150"/>
  <text class="f-lbl" x="655" y="176" text-anchor="start">time →</text>

  <circle class="f-box-g" cx="120" cy="150" r="12"/>
  <text class="f-lbl-y" x="120" y="120">Student s1;</text>
  <text class="f-lbl" x="120" y="102" style="font-size:10px">object created</text>
  <text class="f-val" x="120" y="196" style="font-size:11px;fill:var(--color-success)">Constructor</text>
  <text class="f-val" x="120" y="212" style="font-size:11px;fill:var(--color-success)">for Ram</text>

  <circle class="f-box-g" cx="270" cy="150" r="12"/>
  <text class="f-lbl-y" x="270" y="120">Student s2;</text>
  <text class="f-val" x="270" y="196" style="font-size:11px;fill:var(--color-success)">Constructor</text>
  <text class="f-val" x="270" y="212" style="font-size:11px;fill:var(--color-success)">for Sita</text>

  <circle class="f-box" cx="420" cy="150" r="12"/>
  <text class="f-lbl-y" x="420" y="120">work happens</text>
  <text class="f-lbl" x="420" y="196" style="font-size:11px">display() calls</text>

  <circle class="f-box-c" cx="540" cy="150" r="12"/>
  <text class="f-lbl-y" x="540" y="120">main() ends</text>
  <text class="f-val" x="540" y="196" style="font-size:11px;fill:var(--color-error)">Destructor</text>
  <text class="f-val" x="540" y="212" style="font-size:11px;fill:var(--color-error)">for Sita ← last in</text>

  <circle class="f-box-c" cx="650" cy="150" r="12"/>
  <text class="f-val" x="640" y="196" style="font-size:11px;fill:var(--color-error)">Destructor</text>
  <text class="f-val" x="640" y="212" style="font-size:11px;fill:var(--color-error)">for Ram</text>

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
  <text class="f-lbl" x="380" y="172" style="font-size:26px;fill:var(--color-primary)">🔒</text>

  <rect class="f-box-c" x="500" y="60" width="190" height="150" rx="10"/>
  <text class="f-lbl-y" x="595" y="86">HIDDEN INSIDE</text>
  <text class="f-lbl" x="595" y="112" style="font-size:10px">fuel injection logic</text>
  <text class="f-lbl" x="595" y="132" style="font-size:10px">spark timing</text>
  <text class="f-lbl" x="595" y="152" style="font-size:10px">temperature control</text>
  <text class="f-lbl" x="595" y="172" style="font-size:10px">400 lines of code</text>
  <text class="f-lbl" x="595" y="196" style="font-size:10px;fill:var(--color-error)">can change any time</text>

  <text class="f-lbl-y" x="360" y="246">Because the buttons never change, the hidden code CAN be rewritten without breaking your program.</text>
</svg>`;

D.encapsulation = `
<svg viewBox="0 0 640 304" role="img" aria-labelledby="t-enc">
  <title id="t-enc">Encapsulation puts private data inside a capsule guarded by public functions</title>
  <defs><marker id="a-enc" viewBox="0 0 10 10" refX="9" refY="5"
    markerWidth="6" markerHeight="6" orient="auto">
    <path d="M0,0 L10,5 L0,10 z"/ style="fill:var(--color-success)"></marker></defs>
  <text class="f-ttl" x="10" y="20">ENCAPSULATION — private data wrapped in a capsule of public functions</text>

  <rect x="208" y="54" width="392" height="192" rx="96" fill="rgba(154,230,160,.05)" style="stroke:var(--color-success);stroke-width:1.8"/>
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
  <path d="M16,80 L120,80" style="stroke:var(--color-border-strong);stroke-width:1;stroke-dasharray:4 4;fill:none"/>

  <text class="f-lbl" x="16" y="118" text-anchor="start" style="font-weight:700;fill:var(--color-error)">BLOCKED</text>
  <text class="f-code" x="16" y="135" style="font-size:10.5px;fill:var(--color-error)">a.balance = -500</text>
  <path class="f-arr" style="stroke:var(--color-error)" d="M134,124 L196,124"/>
  <circle cx="208" cy="124" r="9.5" fill="rgba(255,143,122,.18)" style="stroke:var(--color-error);stroke-width:1.6"/>
  <text x="208" y="128.5" text-anchor="middle" style="font-size:11px;font-weight:700;fill:var(--color-error)">✕</text>

  <text class="f-lbl" x="16" y="192" text-anchor="start" style="font-weight:700;fill:var(--color-success)">ALLOWED</text>
  <text class="f-code" x="16" y="209" style="font-size:10.5px;fill:var(--color-success)">a.setBalance(5000)</text>
  <path class="f-arr" marker-end="url(#a-enc)" style="stroke:var(--color-success)" d="M134,198 L246,198"/>

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
  <text class="f-lbl" x="325" y="86" style="font-size:10px;fill:var(--color-success)">public stays public</text>
  <text class="f-lbl" x="325" y="104" style="font-size:10px;fill:var(--color-primary)">protected stays protected</text>

  <rect class="f-box-d" x="260" y="134" width="130" height="80" rx="8"/>
  <text class="f-lbl-y" x="325" y="154" style="font-size:11px">: protected</text>
  <text class="f-lbl" x="325" y="176" style="font-size:10px;fill:var(--color-primary)">public → protected</text>
  <text class="f-lbl" x="325" y="194" style="font-size:10px;fill:var(--color-primary)">protected stays</text>

  <rect class="f-box-d" x="260" y="224" width="130" height="66" rx="8"/>
  <text class="f-lbl-y" x="325" y="244" style="font-size:11px">: private</text>
  <text class="f-lbl" x="325" y="266" style="font-size:10px;fill:var(--color-error)">both become private</text>

  <rect class="f-box-c" x="430" y="120" width="260" height="110" rx="8"/>
  <text class="f-lbl-y" x="560" y="146">The one rule that never changes</text>
  <text class="f-val" x="560" y="176" style="font-size:13px;fill:var(--color-error)">private members are</text>
  <text class="f-val" x="560" y="196" style="font-size:13px;fill:var(--color-error)">NEVER inherited</text>
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
  ${ah('a-cord', 'var(--color-success)')}
  ${ah('a-cordr', 'var(--color-error)')}
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
    <path class="f-arr" marker-end="url(#a-cord)" style="stroke:var(--color-success)" d="M250,80 L284,80"/>
    <text class="f-val" x="240" y="84" style="font-size:11px;fill:var(--color-success)" text-anchor="end">1 · Animal()</text>
  </g>
  <g id="ctor-2" class="dia-step">
    <path class="f-arr" marker-end="url(#a-cord)" style="stroke:var(--color-success)" d="M250,154 L284,154"/>
    <text class="f-val" x="240" y="158" style="font-size:11px;fill:var(--color-success)" text-anchor="end">2 · Dog()</text>
  </g>
  <g id="ctor-3" class="dia-step">
    <path class="f-arr" marker-end="url(#a-cord)" style="stroke:var(--color-success)" d="M250,228 L284,228"/>
    <text class="f-val" x="240" y="232" style="font-size:11px;fill:var(--color-success)" text-anchor="end">3 · Puppy()</text>
  </g>

  <g id="dtor-1" class="dia-step">
    <path class="f-arr" marker-end="url(#a-cordr)" style="stroke:var(--color-error)" d="M470,228 L436,228"/>
    <text class="f-val" x="480" y="232" style="font-size:11px;fill:var(--color-error)" text-anchor="start">1 · ~Puppy()</text>
  </g>
  <g id="dtor-2" class="dia-step">
    <path class="f-arr" marker-end="url(#a-cordr)" style="stroke:var(--color-error)" d="M470,154 L436,154"/>
    <text class="f-val" x="480" y="158" style="font-size:11px;fill:var(--color-error)" text-anchor="start">2 · ~Dog()</text>
  </g>
  <g id="dtor-3" class="dia-step">
    <path class="f-arr" marker-end="url(#a-cordr)" style="stroke:var(--color-error)" d="M470,80 L436,80"/>
    <text class="f-val" x="480" y="84" style="font-size:11px;fill:var(--color-error)" text-anchor="start">3 · ~Animal()</text>
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
  ${ah('a-disp2', 'var(--color-success)')}
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
    <path class="f-arr" marker-end="url(#a-disp2)" style="stroke:var(--color-success)" d="M406,86 L486,86"/>
    <rect class="f-box-g" x="490" y="60" width="200" height="52" rx="8"/>
    <text class="f-val" x="590" y="82" style="font-size:12px">Circle::draw()</text>
    <text class="f-lbl" x="590" y="100" style="font-size:10px">"Drawing a Circle"</text>
  </g>
  <g id="call-s" class="dia-step">
    <path class="f-arr" marker-end="url(#a-disp2)" style="stroke:var(--color-success)" d="M406,232 L486,232"/>
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
  ${ah('a-ovr', 'var(--color-success)')}
  ${ah('a-ovrx', 'var(--color-error)')}
  <text class="f-ttl" x="10" y="18">Overload resolution — the compiler matches by ARGUMENTS, before the program runs</text>

  <rect class="f-box-y" x="250" y="40" width="220" height="44" rx="8"/>
  <text class="f-code" x="360" y="68" text-anchor="middle" style="font-size:13px">area(4, 6);</text>
  <text class="f-lbl" x="360" y="100" style="font-size:10px">two int arguments</text>

  <path class="f-arr" marker-end="url(#a-ovrx)" style="stroke:var(--color-error)" d="M300,110 L180,150"/>
  <path class="f-arr" marker-end="url(#a-ovr)"  style="stroke:var(--color-success)" d="M420,110 L540,150"/>

  <rect class="f-box-c" x="40" y="158" width="280" height="66" rx="8"/>
  <text class="f-code" x="180" y="184" text-anchor="middle" style="font-size:12px">void area(int s)</text>
  <text class="f-lbl" x="180" y="206" style="font-size:10px;fill:var(--color-error)">needs 1 argument — REJECTED ✗</text>

  <rect class="f-box-g" x="400" y="158" width="280" height="66" rx="8"/>
  <text class="f-code" x="540" y="184" text-anchor="middle" style="font-size:12px">void area(int l, int b)</text>
  <text class="f-lbl" x="540" y="206" style="font-size:10px;fill:var(--color-success)">needs 2 arguments — MATCHED ✓</text>
</svg>`;

/* ---------------------------------------------------------------
   GRADE 10 · DIGITAL DESIGN AND MICROPROCESSOR
   --------------------------------------------------------------- */

/* Gate outlines live in one place so a symbol drawn in a figure is the
   same symbol the student toggles in the workbench, and both are the
   ANSI shapes the SEE paper asks them to draw. Local box: 0..nose wide,
   0..60 tall, inputs at y=15 and y=45, output at y=30. */
const GATE_BODY = {
  AND: 'M0,0 L40,0 A30,30 0 0 1 40,60 L0,60 Z',
  OR:  'M0,0 Q25,30 0,60 Q50,60 75,30 Q50,0 0,0 Z',
  NOT: 'M0,0 L60,30 L0,60 Z',
  XOR: 'M8,0 Q33,30 8,60 Q58,60 83,30 Q58,0 8,0 Z'
};
const GATE_NOSE = { AND: 70, OR: 75, NOT: 60, XOR: 83 };
const INVERTING = { NAND: 'AND', NOR: 'OR', NOT: 'NOT' };

function gateBase(kind){ return INVERTING[kind] && kind !== 'NOT' ? INVERTING[kind] : kind; }

/* x,y is the top-left of the gate's 60-tall box. */
function gate(kind, x, y){
  const base = gateBase(kind);
  const inv  = !!INVERTING[kind];
  let g = `<g transform="translate(${x},${y})">`;
  g += `<path class="f-gate" d="${GATE_BODY[base]}"/>`;
  if (kind === 'XOR') g += '<path class="f-gate f-gate-open" d="M0,0 Q25,30 0,60"/>';
  if (inv) g += `<circle class="f-gate" cx="${GATE_NOSE[base] + 6.5}" cy="30" r="6.5"/>`;
  return g + '</g>';
}
/* Where the output wire leaves — past the bubble on an inverting gate. */
function gateOut(kind){
  const base = gateBase(kind);
  return GATE_NOSE[base] + (INVERTING[kind] ? 13 : 0);
}
/* Input wires; NOT takes one, entering at the middle. */
const ATTACH = { AND: 4, NOT: 4, OR: 12, XOR: 20 };
function gateIn(kind, x, y, fromX, labels){
  const one = kind === 'NOT';
  const into = ATTACH[gateBase(kind)];
  let h = '';
  const ys = one ? [y + 30] : [y + 15, y + 45];
  ys.forEach((wy, i) => {
    h += `<path class="f-wire" d="M${fromX},${wy} L${x + into},${wy}"/>`;
    if (labels) h += `<text class="f-pin" x="${fromX - 8}" y="${wy + 4.5}" text-anchor="end">${labels[i]}</text>`;
  });
  return h;
}

/* ---- 2.1 / 2.2 the symbol chart students must be able to redraw ---- */
D.gateSymbols = `
<svg viewBox="0 0 700 366" role="img" aria-labelledby="t-gsym">
  <title id="t-gsym">The six logic gate symbols with their Boolean expressions</title>
  <text class="f-ttl" x="10" y="20">LOGIC GATE SYMBOLS — the shapes and expressions to memorise</text>
  ${[['NOT', 'NOT (Inverter)', "Y = A'"],
     ['AND', 'AND',  'Y = A · B'],
     ['OR',  'OR',   'Y = A + B'],
     ['NAND','NAND', "Y = (A · B)'"],
     ['NOR', 'NOR',  "Y = (A + B)'"],
     ['XOR', 'XOR',  'Y = A \u2295 B']].map((cell, i) => {
    const col = i % 3, row = (i / 3) | 0;
    const cx = 16 + col * 230, cy = 44 + row * 156;
    const gx = cx + 62, gy = cy + 34;
    const out = gx + gateOut(cell[0]);
    return `
  <g>
    <rect class="f-box-d" x="${cx}" y="${cy}" width="212" height="140" rx="10"/>
    <text class="f-lbl-y" x="${cx + 106}" y="${cy + 22}" style="font-size:12.5px">${cell[1]}</text>
    ${gateIn(cell[0], gx, gy, cx + 30, ['A', 'B'])}
    ${gate(cell[0], gx, gy)}
    <path class="f-wire" d="M${out},${gy + 30} L${cx + 182},${gy + 30}"/>
    <text class="f-pin" x="${cx + 190}" y="${gy + 34.5}">Y</text>
    <text class="f-code" x="${cx + 106}" y="${cy + 128}" text-anchor="middle" style="font-size:12px">${cell[2]}</text>
  </g>`;
  }).join('')}
</svg>`;

/* ---- 2.2.6 universal gates ---- */
D.nandUniversal = `
<svg viewBox="0 0 700 500" role="img" aria-labelledby="t-nandu">
  <title id="t-nandu">NOT, AND and OR each built from NAND gates only</title>
  <text class="f-ttl" x="10" y="20">WHY NAND IS CALLED UNIVERSAL — every other gate can be built from it</text>

  <g>
    <text class="f-lbl-y" x="16" y="58" text-anchor="start">1 &nbsp;NOT — join both inputs of one NAND</text>
    <text class="f-pin" x="42" y="110.5" text-anchor="end">A</text>
    <path class="f-wire" d="M50,106 L74,106"/>
    <path class="f-wire" d="M74,91 L74,121"/>
    <path class="f-wire" d="M74,91 L104,91"/>
    <path class="f-wire" d="M74,121 L104,121"/>
    ${gate('NAND', 100, 76)}
    <path class="f-wire" d="M183,106 L233,106"/>
    <text class="f-code" x="241" y="110" style="font-size:12px">(A · A)' = A'</text>
  </g>

  <g>
    <text class="f-lbl-y" x="16" y="188" text-anchor="start">2 &nbsp;AND — a NAND, then a second NAND used as a NOT</text>
    <text class="f-pin" x="42" y="225.5" text-anchor="end">A</text>
    <text class="f-pin" x="42" y="255.5" text-anchor="end">B</text>
    <path class="f-wire" d="M50,221 L104,221"/>
    <path class="f-wire" d="M50,251 L104,251"/>
    ${gate('NAND', 100, 206)}
    <path class="f-wire" d="M183,236 L206,236"/>
    <path class="f-wire" d="M206,221 L206,251"/>
    <path class="f-wire" d="M206,221 L244,221"/>
    <path class="f-wire" d="M206,251 L244,251"/>
    ${gate('NAND', 240, 206)}
    <path class="f-wire" d="M323,236 L373,236"/>
    <text class="f-code" x="381" y="240" style="font-size:12px">((A · B)')' = A · B</text>
  </g>

  <g>
    <text class="f-lbl-y" x="16" y="302" text-anchor="start">3 &nbsp;OR — invert each input first, then NAND them (De Morgan)</text>
    <text class="f-pin" x="42" y="354.5" text-anchor="end">A</text>
    <path class="f-wire" d="M50,350 L70,350"/>
    <path class="f-wire" d="M70,335 L70,365"/>
    <path class="f-wire" d="M70,335 L104,335"/>
    <path class="f-wire" d="M70,365 L104,365"/>
    ${gate('NAND', 100, 320)}
    <text class="f-pin" x="42" y="434.5" text-anchor="end">B</text>
    <path class="f-wire" d="M50,430 L70,430"/>
    <path class="f-wire" d="M70,415 L70,445"/>
    <path class="f-wire" d="M70,415 L104,415"/>
    <path class="f-wire" d="M70,445 L104,445"/>
    ${gate('NAND', 100, 400)}
    <path class="f-wire" d="M183,350 L226,350"/>
    <path class="f-wire" d="M226,350 L226,375"/>
    <path class="f-wire" d="M226,375 L254,375"/>
    <path class="f-wire" d="M183,430 L226,430"/>
    <path class="f-wire" d="M226,430 L226,405"/>
    <path class="f-wire" d="M226,405 L254,405"/>
    ${gate('NAND', 250, 360)}
    <path class="f-wire" d="M333,390 L383,390"/>
    <text class="f-code" x="391" y="394" style="font-size:12px">(A' · B')' = A + B</text>
    <text class="f-lbl" x="391" y="414" text-anchor="start">NOR is universal in exactly the same way.</text>
  </g>
</svg>`;


D.deMorgan = {
  type: 'animated',
  intro: {
    en: 'De Morgan’s first law. Press Next to see a NAND turn into an OR with inverted inputs — and then check it against the truth table.',
    ne: 'डी–मर्गनको पहिलो नियम। NAND कसरी उल्टो इनपुट भएको OR बन्छ हेर्न Next थिच्नुहोस् — अनि ट्रुथ टेबलले जाँच्नुहोस्।'
  },
  svg: `<svg viewBox="0 0 700 430" role="img" aria-labelledby="t-dm">
  <title id="t-dm">De Morgan's first law: NOT (A AND B) equals NOT A OR NOT B</title>
  <text class="f-ttl" x="10" y="20">DE MORGAN'S FIRST LAW &nbsp;&nbsp; (A · B)' = A' + B'</text>

  <g id="dm-left" class="dia-focus">
    <text class="f-lbl-y" x="120" y="52" style="font-size:12px">NAND — invert AFTER the AND</text>
    <text class="f-pin" x="34" y="90.5" text-anchor="end">A</text>
    <text class="f-pin" x="34" y="120.5" text-anchor="end">B</text>
    <path class="f-wire" d="M42,86 L96,86"/>
    <path class="f-wire" d="M42,116 L96,116"/>
    ${gate('NAND', 92, 71)}
    <path class="f-wire" d="M175,101 L215,101"/>
    <text class="f-code" x="223" y="105" style="font-size:12px">(A · B)'</text>
  </g>

  <g id="dm-bar" class="dia-step">
    <path class="f-arr" style="stroke:var(--color-error)" d="M181,84 L181,68 L268,68"/>
    <text class="f-lbl" x="276" y="72" text-anchor="start" style="font-size:11px;fill:var(--color-error)">this bubble is the bar over (A · B)</text>
  </g>

  <g id="dm-rule" class="dia-step">
    <rect class="f-box-y" x="40" y="152" width="620" height="56" rx="10"/>
    <text class="f-lbl-y" x="350" y="176" style="font-size:12.5px">THE RULE — break the bar, and change the sign</text>
    <text class="f-code" x="350" y="196" text-anchor="middle" style="font-size:12.5px">(A · B)'  →  A' + B'&nbsp;&nbsp;&nbsp;·  becomes  +</text>
  </g>

  <g id="dm-right" class="dia-step">
    <text class="f-lbl-y" x="150" y="248" style="font-size:12px">OR with inverted inputs — invert BEFORE the OR</text>
    <text class="f-pin" x="34" y="286.5" text-anchor="end">A</text>
    <text class="f-pin" x="34" y="336.5" text-anchor="end">B</text>
    <path class="f-wire" d="M42,282 L54,282"/>
    ${gate('NOT', 54, 252)}
    <path class="f-wire" d="M127,282 L166,282"/>
    <path class="f-wire" d="M42,332 L54,332"/>
    ${gate('NOT', 54, 302)}
    <path class="f-wire" d="M127,332 L166,332"/>
    <path class="f-wire" d="M166,282 L166,292 L170,292"/>
    <path class="f-wire" d="M166,332 L166,322 L170,322"/>
    ${gate('OR', 166, 277)}
    <path class="f-wire" d="M241,307 L281,307"/>
    <text class="f-code" x="289" y="311" style="font-size:12px">A' + B'</text>
  </g>

  <g id="dm-table" class="dia-step">
    <text class="f-lbl-y" x="530" y="248" style="font-size:12px">Both columns match — the law holds</text>
    <rect class="f-box-d" x="410" y="258" width="272" height="140" rx="8"/>
    <text class="f-lbl" x="440" y="278" style="font-size:11px">A</text>
    <text class="f-lbl" x="480" y="278" style="font-size:11px">B</text>
    <text class="f-lbl-y" x="560" y="278" style="font-size:11px">(A · B)'</text>
    <text class="f-lbl-y" x="645" y="278" style="font-size:11px">A' + B'</text>
    <path class="f-wire" d="M418,286 L674,286"/>
    <text class="f-val" x="440" y="306" style="font-size:12px">0</text>
    <text class="f-val" x="480" y="306" style="font-size:12px">0</text>
    <text class="f-val" x="560" y="306" style="font-size:12px">1</text>
    <text class="f-val" x="645" y="306" style="font-size:12px">1</text>
    <text class="f-val" x="440" y="330" style="font-size:12px">0</text>
    <text class="f-val" x="480" y="330" style="font-size:12px">1</text>
    <text class="f-val" x="560" y="330" style="font-size:12px">1</text>
    <text class="f-val" x="645" y="330" style="font-size:12px">1</text>
    <text class="f-val" x="440" y="354" style="font-size:12px">1</text>
    <text class="f-val" x="480" y="354" style="font-size:12px">0</text>
    <text class="f-val" x="560" y="354" style="font-size:12px">1</text>
    <text class="f-val" x="645" y="354" style="font-size:12px">1</text>
    <text class="f-val" x="440" y="378" style="font-size:12px">1</text>
    <text class="f-val" x="480" y="378" style="font-size:12px">1</text>
    <text class="f-val" x="560" y="378" style="font-size:12px">0</text>
    <text class="f-val" x="645" y="378" style="font-size:12px">0</text>
  </g>

  <text class="f-lbl" x="350" y="420">The second law is the mirror image: (A + B)' = A' · B'</text>
</svg>`,
  steps: [
    { focus: '#dm-left',
      en: 'Start with NAND. The AND happens first, and the small circle on the nose inverts the answer afterwards.',
      ne: 'NAND बाट सुरु गरौं। पहिले AND हुन्छ, अनि नाकको सानो गोलोले उत्तर उल्टाइदिन्छ।' },
    { show: '#dm-bar', focus: '#dm-left',
      en: 'That circle is what the bar in (A · B)′ means: invert the whole result.',
      ne: 'त्यही गोलो नै (A · B)′ माथिको बारको अर्थ हो — पूरै नतिजा उल्टाउनु।' },
    { show: ['#dm-bar', '#dm-rule'],
      en: 'De Morgan says you may break the bar and move it onto each letter — but when the bar breaks, the sign flips: · becomes +.',
      ne: 'डी–मर्गनका अनुसार बारलाई फुटाएर हरेक अक्षरमाथि लैजान सकिन्छ — तर बार फुट्दा चिन्ह बदलिन्छ: · को साटो + हुन्छ।' },
    { show: ['#dm-rule', '#dm-right'], focus: '#dm-right',
      en: 'So the same circuit can be drawn the other way round: invert A and B first, then OR them.',
      ne: 'त्यसैले उही सर्किट अर्को तरिकाले पनि बनाउन सकिन्छ: पहिले A र B लाई उल्टाउने, अनि OR गर्ने।' },
    { show: ['#dm-rule', '#dm-right', '#dm-table'], focus: '#dm-table',
      en: 'Proof: for all four input combinations the two columns are identical. Equal truth tables mean equal circuits.',
      ne: 'प्रमाण: चारै इनपुट जोडीमा दुवै स्तम्भ उस्तै छन्। ट्रुथ टेबल उस्तै भयो भने सर्किट पनि उस्तै हो।' }
  ]
};


/* ---- 1.1 positional value: the idea every base shares ---- */
D.placeValue = `
<svg viewBox="0 0 700 262" role="img" aria-labelledby="t-place">
  <title id="t-place">The same digits mean different amounts depending on their position</title>
  <text class="f-ttl" x="10" y="20">POSITIONAL VALUE — a digit's worth depends on WHERE it sits</text>

  <text class="f-lbl-y" x="90" y="52" text-anchor="start">Decimal 3 4 7 &nbsp;(base 10)</text>
  <g>
    <rect class="f-box-y" x="90" y="64" width="120" height="72" rx="8"/>
    <text class="f-val" x="150" y="96" style="font-size:22px">3</text>
    <text class="f-lbl" x="150" y="120" style="font-size:10.5px">10²  =  100</text>
    <text class="f-lbl-y" x="150" y="154" style="font-size:12px">300</text>
  </g><g>
    <rect class="f-box-y" x="240" y="64" width="120" height="72" rx="8"/>
    <text class="f-val" x="300" y="96" style="font-size:22px">4</text>
    <text class="f-lbl" x="300" y="120" style="font-size:10.5px">10¹  =  10</text>
    <text class="f-lbl-y" x="300" y="154" style="font-size:12px">40</text>
  </g><g>
    <rect class="f-box-y" x="390" y="64" width="120" height="72" rx="8"/>
    <text class="f-val" x="450" y="96" style="font-size:22px">7</text>
    <text class="f-lbl" x="450" y="120" style="font-size:10.5px">10⁰  =  1</text>
    <text class="f-lbl-y" x="450" y="154" style="font-size:12px">7</text>
  </g>
  <text class="f-code" x="556" y="104" text-anchor="start" style="font-size:13px">= 347</text>

  <text class="f-lbl-y" x="90" y="192" text-anchor="start">Binary 1 0 1 &nbsp;(base 2) — same idea, different base</text>
  <g>
    <rect class="f-box" x="90" y="204" width="120" height="48" rx="8"/>
    <text class="f-val" x="150" y="226" style="font-size:16px">1</text>
    <text class="f-lbl" x="150" y="244" style="font-size:10px">2²  =  4  →  4</text>
  </g><g>
    <rect class="f-box" x="240" y="204" width="120" height="48" rx="8"/>
    <text class="f-val" x="300" y="226" style="font-size:16px">0</text>
    <text class="f-lbl" x="300" y="244" style="font-size:10px">2¹  =  2  →  0</text>
  </g><g>
    <rect class="f-box" x="390" y="204" width="120" height="48" rx="8"/>
    <text class="f-val" x="450" y="226" style="font-size:16px">1</text>
    <text class="f-lbl" x="450" y="244" style="font-size:10px">2⁰  =  1  →  1</text>
  </g>
  <text class="f-code" x="556" y="232" text-anchor="start" style="font-size:13px">= 5</text>
</svg>`;

/* ---- 1.2 the four bases side by side ---- */
D.baseTable = `
<svg viewBox="0 0 700 254" role="img" aria-labelledby="t-bases">
  <title id="t-bases">The four number systems: decimal, binary, octal and hexadecimal</title>
  <text class="f-ttl" x="10" y="20">THE FOUR NUMBER SYSTEMS — base, digits, and what each is for</text>
  <g>
    <rect class="f-box-d" x="16" y="40" width="668" height="42" rx="8"/>
    <rect x="18" y="49" width="4" height="24" rx="2" style="fill:var(--color-primary)"/>
    <text class="f-lbl-y" x="36" y="58" text-anchor="start" style="font-size:12px">DECIMAL</text>
    <text class="f-lbl" x="36" y="74" text-anchor="start" style="font-size:10.5px">base 10</text>
    <text class="f-code" x="208" y="67" text-anchor="start" style="font-size:12.5px">digits: 0 – 9</text>
    <text class="f-lbl" x="384" y="67" text-anchor="start" style="font-size:11.5px">what people count in</text>
  </g><g>
    <rect class="f-box-d" x="16" y="90" width="668" height="42" rx="8"/>
    <rect x="18" y="99" width="4" height="24" rx="2" style="fill:var(--color-success)"/>
    <text class="f-lbl-y" x="36" y="108" text-anchor="start" style="font-size:12px">BINARY</text>
    <text class="f-lbl" x="36" y="124" text-anchor="start" style="font-size:10.5px">base 2</text>
    <text class="f-code" x="208" y="117" text-anchor="start" style="font-size:12.5px">digits: 0, 1</text>
    <text class="f-lbl" x="384" y="117" text-anchor="start" style="font-size:11.5px">what the machine actually stores</text>
  </g><g>
    <rect class="f-box-d" x="16" y="140" width="668" height="42" rx="8"/>
    <rect x="18" y="149" width="4" height="24" rx="2" style="fill:var(--color-secondary)"/>
    <text class="f-lbl-y" x="36" y="158" text-anchor="start" style="font-size:12px">OCTAL</text>
    <text class="f-lbl" x="36" y="174" text-anchor="start" style="font-size:10.5px">base 8</text>
    <text class="f-code" x="208" y="167" text-anchor="start" style="font-size:12.5px">digits: 0 – 7</text>
    <text class="f-lbl" x="384" y="167" text-anchor="start" style="font-size:11.5px">a short way to write groups of 3 bits</text>
  </g><g>
    <rect class="f-box-d" x="16" y="190" width="668" height="42" rx="8"/>
    <rect x="18" y="199" width="4" height="24" rx="2" style="fill:var(--color-error)"/>
    <text class="f-lbl-y" x="36" y="208" text-anchor="start" style="font-size:12px">HEXADECIMAL</text>
    <text class="f-lbl" x="36" y="224" text-anchor="start" style="font-size:10.5px">base 16</text>
    <text class="f-code" x="208" y="217" text-anchor="start" style="font-size:12.5px">digits: 0 – 9, A – F</text>
    <text class="f-lbl" x="384" y="217" text-anchor="start" style="font-size:11.5px">a short way to write groups of 4 bits</text>
  </g>
  <text class="f-lbl-y" x="350" y="244" style="font-size:11.5px">A number does not change value when you rewrite it in another base — only the notation changes.</text>
</svg>`;

/* ---- 1.4 / 1.5 complements: a two-stage process, so it is animated ---- */
D.twosComplement = {
  type: 'animated',
  intro: {
    en: 'Two stages, in order. Press Next to invert every bit, then add 1 — and see why a computer can subtract using an adder.',
    ne: 'क्रमैसँग दुई चरण। हरेक बिट उल्टाउन र त्यसपछि 1 जोड्न Next थिच्नुहोस् — अनि कम्प्युटरले adder ले नै किन घटाउन सक्छ बुझ्नुहोस्।'
  },
  svg: `<svg viewBox="0 0 700 320" role="img" aria-labelledby="t-2c">
  <title id="t-2c">Finding the 2's complement of 0101 by inverting the bits and adding one</title>
  <text class="f-ttl" x="10" y="20">FINDING THE 2'S COMPLEMENT OF &nbsp;0 1 0 1</text>

  <g id="tc-orig" class="dia-focus">
    <text class="f-lbl-y" x="34" y="56" text-anchor="start" style="font-size:12px">Step 0 — the original number</text>
    <rect class="f-box" x="34" y="68" width="48" height="46" rx="6"/>
    <text class="f-val" x="58" y="98" style="font-size:18px">0</text><rect class="f-box" x="94" y="68" width="48" height="46" rx="6"/>
    <text class="f-val" x="118" y="98" style="font-size:18px">1</text><rect class="f-box" x="154" y="68" width="48" height="46" rx="6"/>
    <text class="f-val" x="178" y="98" style="font-size:18px">0</text><rect class="f-box" x="214" y="68" width="48" height="46" rx="6"/>
    <text class="f-val" x="238" y="98" style="font-size:18px">1</text>
    <text class="f-code" x="286" y="98" text-anchor="start" style="font-size:12.5px">= 5 in decimal</text>
  </g>

  <g id="tc-ones" class="dia-step">
    <text class="f-lbl-y" x="34" y="150" text-anchor="start" style="font-size:12px">Step 1 — 1's complement: flip every bit</text>
    <rect class="f-box-c" x="34" y="162" width="48" height="46" rx="6"/>
    <text class="f-val" x="58" y="192" style="font-size:18px">1</text><rect class="f-box-c" x="94" y="162" width="48" height="46" rx="6"/>
    <text class="f-val" x="118" y="192" style="font-size:18px">0</text><rect class="f-box-c" x="154" y="162" width="48" height="46" rx="6"/>
    <text class="f-val" x="178" y="192" style="font-size:18px">1</text><rect class="f-box-c" x="214" y="162" width="48" height="46" rx="6"/>
    <text class="f-val" x="238" y="192" style="font-size:18px">0</text>
    <text class="f-code" x="286" y="192" text-anchor="start" style="font-size:12.5px">1 becomes 0, 0 becomes 1</text>
  </g>

  <g id="tc-add" class="dia-step">
    <text class="f-lbl-y" x="34" y="244" text-anchor="start" style="font-size:12px">Step 2 — add 1 to that result</text>
    <rect class="f-box-g" x="34" y="256" width="48" height="46" rx="6"/>
    <text class="f-val" x="58" y="286" style="font-size:18px">1</text><rect class="f-box-g" x="94" y="256" width="48" height="46" rx="6"/>
    <text class="f-val" x="118" y="286" style="font-size:18px">0</text><rect class="f-box-g" x="154" y="256" width="48" height="46" rx="6"/>
    <text class="f-val" x="178" y="286" style="font-size:18px">1</text><rect class="f-box-g" x="214" y="256" width="48" height="46" rx="6"/>
    <text class="f-val" x="238" y="286" style="font-size:18px">1</text>
    <text class="f-code" x="286" y="280" text-anchor="start" style="font-size:12.5px">1010 + 1 = 1011</text>
    <text class="f-lbl" x="286" y="298" text-anchor="start" style="font-size:10.5px">the 2's complement of 0101</text>
  </g>

  <g id="tc-why" class="dia-step">
    <rect class="f-box-y" x="470" y="56" width="214" height="164" rx="10"/>
    <text class="f-lbl-y" x="577" y="82" style="font-size:12px">WHY IT MATTERS</text>
    <text class="f-lbl" x="577" y="108" style="font-size:11px">To work out A − B the machine</text>
    <text class="f-lbl" x="577" y="126" style="font-size:11px">needs no subtractor at all.</text>
    <text class="f-lbl-y" x="577" y="154" style="font-size:11.5px">A − B  =  A + (2's comp of B)</text>
    <text class="f-lbl" x="577" y="182" style="font-size:11px">One adder circuit does both</text>
    <text class="f-lbl" x="577" y="200" style="font-size:11px">jobs — simpler, cheaper.</text>
  </g>
</svg>`,
  steps: [
    { focus: '#tc-orig',
      en: 'Start with 0101, which is 5 in decimal. It has four bits, so every answer will have four bits too.',
      ne: '0101 बाट सुरु गरौं, जुन दशमलवमा 5 हो। यसमा चार बिट भएकाले उत्तर पनि चार बिटकै हुनेछ।' },
    { show: '#tc-ones', focus: '#tc-ones',
      en: "Step 1 is the 1's complement: flip every bit. Each 0 becomes 1 and each 1 becomes 0, which gives 1010. Nothing has been added yet.",
      ne: "पहिलो चरण 1's complement हो: हरेक बिट उल्टाउने। 0 भए 1, 1 भए 0 — 1010 आयो। अहिलेसम्म केही जोडिएको छैन।" },
    { show: ['#tc-ones', '#tc-add'], focus: '#tc-add',
      en: "Step 2 adds 1 to that result: 1010 + 1 = 1011. That is the 2's complement of 0101. The whole rule is: invert, then add one.",
      ne: "दोस्रो चरणमा त्यसमा 1 जोड्ने: 1010 + 1 = 1011। यही 0101 को 2's complement हो। पूरा नियम — उल्टाउने, अनि एक जोड्ने।" },
    { show: ['#tc-ones', '#tc-add', '#tc-why'], focus: '#tc-why',
      en: 'This is why it is worth learning: a computer subtracts by adding the 2\u2019s complement, so a single adder circuit performs both addition and subtraction.',
      ne: 'यही कारण यो सिक्नु महत्त्वपूर्ण छ: कम्प्युटरले 2\u2019s complement जोडेर घटाउँछ, त्यसैले एउटै adder सर्किटले जोड र घटाउ दुवै गर्छ।' }
  ]
};


/* ---- 3.1 the law table: a reference to look up, so it stays static ---- */
D.boolLaws = `
<svg viewBox="0 0 700 268" role="img" aria-labelledby="t-blaws">
  <title id="t-blaws">The Boolean laws used for algebraic simplification</title>
  <text class="f-ttl" x="10" y="20">BOOLEAN LAWS — each one in its OR form and its AND form</text>
  <text class="f-lbl" x="200" y="38" text-anchor="start" style="font-size:10px">OR form</text>
  <text class="f-lbl" x="430" y="38" text-anchor="start" style="font-size:10px">AND form</text>
    <rect class="f-box-d" x="16" y="46" width="668" height="28" rx="6"/>
    <text class="f-lbl-y" x="34" y="65" text-anchor="start" style="font-size:11.5px">Identity</text>
    <text class="f-code" x="200" y="65" text-anchor="start" style="font-size:12px">A + 0 = A</text>
    <text class="f-code" x="430" y="65" text-anchor="start" style="font-size:12px">A · 1 = A</text>
    <rect class="f-box-d" x="16" y="80" width="668" height="28" rx="6"/>
    <text class="f-lbl-y" x="34" y="99" text-anchor="start" style="font-size:11.5px">Null</text>
    <text class="f-code" x="200" y="99" text-anchor="start" style="font-size:12px">A + 1 = 1</text>
    <text class="f-code" x="430" y="99" text-anchor="start" style="font-size:12px">A · 0 = 0</text>
    <rect class="f-box-d" x="16" y="114" width="668" height="28" rx="6"/>
    <text class="f-lbl-y" x="34" y="133" text-anchor="start" style="font-size:11.5px">Idempotent</text>
    <text class="f-code" x="200" y="133" text-anchor="start" style="font-size:12px">A + A = A</text>
    <text class="f-code" x="430" y="133" text-anchor="start" style="font-size:12px">A · A = A</text>
    <rect class="f-box-d" x="16" y="148" width="668" height="28" rx="6"/>
    <text class="f-lbl-y" x="34" y="167" text-anchor="start" style="font-size:11.5px">Complement</text>
    <text class="f-code" x="200" y="167" text-anchor="start" style="font-size:12px">A + A' = 1</text>
    <text class="f-code" x="430" y="167" text-anchor="start" style="font-size:12px">A · A' = 0</text>
    <rect class="f-box-d" x="16" y="182" width="668" height="28" rx="6"/>
    <text class="f-lbl-y" x="34" y="201" text-anchor="start" style="font-size:11.5px">Commutative</text>
    <text class="f-code" x="200" y="201" text-anchor="start" style="font-size:12px">A + B = B + A</text>
    <text class="f-code" x="430" y="201" text-anchor="start" style="font-size:12px">A · B = B · A</text>
    <rect class="f-box-d" x="16" y="216" width="668" height="28" rx="6"/>
    <text class="f-lbl-y" x="34" y="235" text-anchor="start" style="font-size:11.5px">Absorption</text>
    <text class="f-code" x="200" y="235" text-anchor="start" style="font-size:12px">A + AB = A</text>
    <text class="f-code" x="430" y="235" text-anchor="start" style="font-size:12px">A(A + B) = A</text>
  <text class="f-lbl-y" x="350" y="262" style="font-size:11.5px">Every law comes in a pair. Learn one side and swap + with · to get the other.</text>
</svg>`;

/* ---- 3.4 algebraic simplification: one law per step, named ---- */
D.simplify = {
  type: 'animated',
  intro: {
    en: 'Simplifying AB + AB\u2032 + A\u2032B one law at a time. Each step names the law it uses — that naming is what an exam answer must show.',
    ne: 'AB + AB\u2032 + A\u2032B लाई एक–एक नियम प्रयोग गरेर सरल बनाउँदै। हरेक चरणले प्रयोग गरेको नियमको नाम दिन्छ — परीक्षाको उत्तरमा त्यही देखाउनुपर्छ।'
  },
  svg: `<svg viewBox="0 0 700 300" role="img" aria-labelledby="t-simp">
  <title id="t-simp">Simplifying a Boolean expression step by step, naming the law at each step</title>
  <text class="f-ttl" x="10" y="20">ALGEBRAIC SIMPLIFICATION — name the law at every step</text>

  <g id="sm-0" class="dia-focus">
    <rect class="f-box-y" x="60" y="40" width="580" height="42" rx="8"/>
    <text class="f-code" x="350" y="60" text-anchor="middle" style="font-size:14px">F = AB + AB' + A'B</text>
    <text class="f-lbl" x="350" y="76" style="font-size:10.5px">the expression we start with</text>
  </g>

  <g id="sm-1" class="dia-step">
    <path class="f-arr" d="M350,86 L350,100"/>
    <rect class="f-box" x="60" y="104" width="580" height="42" rx="8"/>
    <text class="f-code" x="350" y="124" text-anchor="middle" style="font-size:14px">F = A(B + B') + A'B</text>
    <text class="f-lbl-y" x="350" y="140" style="font-size:10.5px">Distributive law — take the common A out of the first two terms</text>
  </g>

  <g id="sm-2" class="dia-step">
    <path class="f-arr" d="M350,150 L350,164"/>
    <rect class="f-box" x="60" y="168" width="580" height="42" rx="8"/>
    <text class="f-code" x="350" y="188" text-anchor="middle" style="font-size:14px">F = A · 1 + A'B</text>
    <text class="f-lbl-y" x="350" y="204" style="font-size:10.5px">Complement law — B + B' is always 1</text>
  </g>

  <g id="sm-3" class="dia-step">
    <path class="f-arr" d="M350,214 L350,228"/>
    <rect class="f-box-g" x="60" y="232" width="580" height="46" rx="8"/>
    <text class="f-code" x="350" y="254" text-anchor="middle" style="font-size:14px">F = A + B</text>
    <text class="f-lbl-y" x="350" y="270" style="font-size:10.5px">Identity law A · 1 = A, then absorption A + A'B = A + B</text>
  </g>

  <text class="f-lbl" x="350" y="294" style="font-size:10.5px">Three terms became two variables. Fewer terms means fewer gates.</text>
</svg>`,
  steps: [
    { focus: '#sm-0',
      en: 'Start with F = AB + AB\u2032 + A\u2032B. Three product terms, each needing its own AND gate.',
      ne: 'F = AB + AB\u2032 + A\u2032B बाट सुरु। तीन product पद, हरेकलाई आफ्नै AND गेट चाहिन्छ।' },
    { show: '#sm-1', focus: '#sm-1',
      en: 'The first two terms both contain A, so take it outside the bracket. This is the distributive law, used backwards.',
      ne: 'पहिलो दुई पदमा A छ, त्यसैले A लाई कोष्ठक बाहिर निकाल्नुहोस्। यो distributive नियम उल्टो तरिकाले प्रयोग गरेको हो।' },
    { show: ['#sm-1', '#sm-2'], focus: '#sm-2',
      en: 'B + B\u2032 is 1 — a variable ORed with its own complement always is. That is the complement law.',
      ne: 'B + B\u2032 सधैं 1 हुन्छ — कुनै चललाई त्यसकै पूरकसँग OR गर्दा सधैं 1 आउँछ। यही complement नियम हो।' },
    { show: ['#sm-1', '#sm-2', '#sm-3'], focus: '#sm-3',
      en: 'A · 1 is just A (identity law), leaving A + A\u2032B, which absorption reduces to A + B. Three terms became two variables.',
      ne: 'A · 1 भनेको A नै हो (identity नियम), बाँकी रह्यो A + A\u2032B, जसलाई absorption ले A + B बनाइदिन्छ। तीन पद घटेर दुई चल भयो।' }
  ]
};

/* ---- 3.2 / 3.3 SOP and POS come from the same table, read two ways ---- */
D.sopPos = `
<svg viewBox="0 0 700 300" role="img" aria-labelledby="t-sop">
  <title id="t-sop">Reading SOP from the rows where the output is 1 and POS from the rows where it is 0</title>
  <text class="f-ttl" x="10" y="20">SOP AND POS — one truth table, read two different ways</text>

  <rect class="f-box-d" x="16" y="36" width="230" height="180" rx="8"/>
  <text class="f-lbl-y" x="131" y="56" style="font-size:11.5px">the truth table</text>
  <text class="f-lbl" x="52"  y="76" style="font-size:11px">A</text>
  <text class="f-lbl" x="102" y="76" style="font-size:11px">B</text>
  <text class="f-lbl-y" x="170" y="76" style="font-size:11px">F</text>
  <path class="f-wire" d="M28,84 L234,84"/>
  <text class="f-val" x="52"  y="106" style="font-size:12px">0</text>
  <text class="f-val" x="102" y="106" style="font-size:12px">0</text>
  <text class="f-val" x="170" y="106" style="font-size:12px">0</text>
  <text class="f-val" x="52"  y="134" style="font-size:12px">0</text>
  <text class="f-val" x="102" y="134" style="font-size:12px">1</text>
  <text class="f-val" x="170" y="134" style="font-size:12px">1</text>
  <text class="f-val" x="52"  y="162" style="font-size:12px">1</text>
  <text class="f-val" x="102" y="162" style="font-size:12px">0</text>
  <text class="f-val" x="170" y="162" style="font-size:12px">0</text>
  <text class="f-val" x="52"  y="190" style="font-size:12px">1</text>
  <text class="f-val" x="102" y="190" style="font-size:12px">1</text>
  <text class="f-val" x="170" y="190" style="font-size:12px">1</text>

  <rect class="f-box-g" x="272" y="36" width="412" height="120" rx="8"/>
  <text class="f-lbl-y" x="478" y="58" style="font-size:12px">SOP — read the rows where F = 1</text>
  <text class="f-lbl" x="478" y="80" style="font-size:11px">In a 1-row, a 0 means the variable is complemented.</text>
  <text class="f-code" x="478" y="106" text-anchor="middle" style="font-size:13px">F = A'B + AB</text>
  <text class="f-lbl" x="478" y="130" style="font-size:10.5px">row 01 gives A'B &nbsp;·&nbsp; row 11 gives AB</text>
  <text class="f-lbl" x="478" y="148" style="font-size:10.5px">Sum OF Products: terms are ANDed, then ORed together.</text>

  <rect class="f-box-c" x="272" y="172" width="412" height="120" rx="8"/>
  <text class="f-lbl-y" x="478" y="194" style="font-size:12px">POS — read the rows where F = 0</text>
  <text class="f-lbl" x="478" y="216" style="font-size:11px">In a 0-row, a 1 means the variable is complemented.</text>
  <text class="f-code" x="478" y="242" text-anchor="middle" style="font-size:13px">F = (A + B)(A' + B)</text>
  <text class="f-lbl" x="478" y="266" style="font-size:10.5px">row 00 gives (A + B) &nbsp;·&nbsp; row 10 gives (A' + B)</text>
  <text class="f-lbl" x="478" y="284" style="font-size:10.5px">Product OF Sums: terms are ORed, then ANDed together.</text>
</svg>`;


/* ---- 4.1 half adder circuit ---- */
D.halfAdder = `
<svg viewBox="0 0 700 260" role="img" aria-labelledby="t-ha">
  <title id="t-ha">Half adder: an XOR gate gives SUM and an AND gate gives CARRY</title>
  <text class="f-ttl" x="10" y="20">HALF ADDER — two gates reading the SAME two inputs</text>

  <text class="f-pin" x="44" y="84.5" text-anchor="end">A</text>
  <text class="f-pin" x="44" y="174.5" text-anchor="end">B</text>

  <path class="f-wire" d="M52,80 L120,80"/>
  <path class="f-wire" d="M52,170 L120,170"/>
  <circle class="f-node-bg" cx="86" cy="80" r="4"/>
  <circle class="f-node-bg" cx="86" cy="170" r="4"/>
  <path class="f-wire" d="M86,80 L86,125"/>
  <path class="f-wire" d="M86,170 L86,155"/>

  ${gate('XOR', 200, 50)}
  <path class="f-wire" d="M120,80 L220,65"/>
  <path class="f-wire" d="M86,125 L220,95"/>
  <path class="f-wire" d="M283,80 L400,80"/>
  <rect class="f-box-g" x="400" y="58" width="150" height="44" rx="8"/>
  <text class="f-val" x="475" y="80" style="font-size:13px">SUM</text>
  <text class="f-lbl" x="475" y="96" style="font-size:10px">S = A &#8853; B</text>

  ${gate('AND', 200, 140)}
  <path class="f-wire" d="M120,170 L204,155"/>
  <path class="f-wire" d="M86,155 L204,185"/>
  <path class="f-wire" d="M270,170 L400,170"/>
  <rect class="f-box-y" x="400" y="148" width="150" height="44" rx="8"/>
  <text class="f-val" x="475" y="170" style="font-size:13px">CARRY</text>
  <text class="f-lbl" x="475" y="186" style="font-size:10px">C = A &#183; B</text>

  <text class="f-lbl" x="350" y="232" style="font-size:11.5px">Both gates see the same A and B. SUM is this column's answer; CARRY moves to the next column.</text>
  <text class="f-lbl" x="350" y="250" style="font-size:10.5px">It is called HALF because it has no input for a carry coming IN.</text>
</svg>`;

/* ---- 4.2 ripple carry: the carry moving is the lesson, so animate it ---- */
D.rippleCarry = {
  type: 'animated',
  intro: {
    en: 'A 4-bit adder is four full adders in a row. Press Next to follow the carry as it ripples from the rightmost column to the leftmost.',
    ne: '४-बिट adder भनेको लहरै राखिएका चार full adder हुन्। क्यारी दायाँबाट बायाँ कसरी सर्दै जान्छ हेर्न Next थिच्नुहोस्।'
  },
  svg: `<svg viewBox="0 0 700 300" role="img" aria-labelledby="t-rc">
  <title id="t-rc">A four bit ripple carry adder, with the carry passing from each stage to the next</title>
  <text class="f-ttl" x="10" y="20">4-BIT BINARY ADDER — the carry ripples from right to left</text>

  ${[3,2,1,0].map(function(k){
    const x = 60 + (3-k)*150;
    return `
  <g id="fa-${k}">
    <rect class="f-box" x="${x}" y="90" width="110" height="86" rx="8"/>
    <text class="f-lbl-y" x="${x+55}" y="120" style="font-size:12px">FA ${k}</text>
    <text class="f-lbl" x="${x+55}" y="140" style="font-size:10px">full adder</text>
    <text class="f-pin" x="${x+22}" y="80" text-anchor="middle" style="font-size:11px">A${k}</text>
    <text class="f-pin" x="${x+88}" y="80" text-anchor="middle" style="font-size:11px">B${k}</text>
    <path class="f-wire" d="M${x+22},84 L${x+22},90"/>
    <path class="f-wire" d="M${x+88},84 L${x+88},90"/>
    <path class="f-wire" d="M${x+55},176 L${x+55},196"/>
    <text class="f-pin" x="${x+55}" y="212" text-anchor="middle" style="font-size:11px">S${k}</text>
  </g>`;}).join('')}

  ${[0,1,2].map(function(i){
    const from = 60 + i*150 + 110;
    return `<g id="carry-${i}" class="dia-step">
    <path class="f-arr" style="stroke:var(--color-error)" d="M${from},133 L${from+40},133"/>
    <text class="f-lbl" x="${from+20}" y="126" style="font-size:9.5px;fill:var(--color-error)">carry</text>
  </g>`;}).join('')}

  <text class="f-lbl" x="30" y="137" text-anchor="start" style="font-size:10.5px">Cin = 0</text>
  <path class="f-wire" d="M20,148 L60,148"/>

  <g id="carry-out" class="dia-step">
    <path class="f-arr" style="stroke:var(--color-error)" d="M610,133 L660,133"/>
    <text class="f-lbl-y" x="668" y="137" text-anchor="end" style="font-size:10.5px">Cout</text>
  </g>

  <text class="f-lbl" x="350" y="252" style="font-size:11.5px">Each stage must wait for the carry from the stage on its right — that waiting is the delay of a ripple adder.</text>
  <text class="f-lbl" x="350" y="272" style="font-size:10.5px">The rightmost stage has no carry coming in, so a half adder could be used there instead.</text>
</svg>`,
  steps: [
    { focus: '#fa-0',
      en: 'The rightmost stage, FA 0, adds A0 and B0 with a carry-in of 0. It can start immediately — nothing is waiting on it.',
      ne: 'सबैभन्दा दायाँको FA 0 ले A0 र B0 लाई क्यारी-इन 0 सँग जोड्छ। यसले तुरुन्तै सुरु गर्न सक्छ — कसैलाई कुर्नु पर्दैन।' },
    { show: '#carry-0', focus: '#fa-1',
      en: 'FA 0 produces a carry, which becomes the carry-in of FA 1. Only now can FA 1 finish its own sum.',
      ne: 'FA 0 ले क्यारी बनायो, जुन FA 1 को क्यारी-इन बन्छ। अब मात्र FA 1 ले आफ्नो जोड टुङ्ग्याउन सक्छ।' },
    { show: ['#carry-0', '#carry-1'], focus: '#fa-2',
      en: 'The same handover happens again into FA 2. Each stage adds its own small delay on top of the one before it.',
      ne: 'उही हस्तान्तरण FA 2 मा फेरि हुन्छ। हरेक चरणले अघिल्लोमाथि आफ्नै थोरै ढिलाइ थप्छ।' },
    { show: ['#carry-0', '#carry-1', '#carry-2'], focus: '#fa-3',
      en: 'FA 3 is last, so it waits the longest. This accumulating wait is why the design is called a RIPPLE carry adder.',
      ne: 'FA 3 अन्तिम भएकाले सबैभन्दा बढी कुर्छ। यही थुप्रिने प्रतीक्षाकै कारण यसलाई RIPPLE carry adder भनिन्छ।' },
    { show: ['#carry-0', '#carry-1', '#carry-2', '#carry-out'], focus: '#carry-out',
      en: 'The final carry leaves the adder as Cout. Four inputs bits plus four more produce five output bits in total.',
      ne: 'अन्तिम क्यारी Cout भएर बाहिर निस्कन्छ। चार-चार बिटका दुई इनपुटले जम्मा पाँच बिटको आउटपुट दिन्छन्।' }
  ]
};

/* ---- 4.7 - 4.10 the four block-level circuits, side by side ---- */
D.combBlocks = `
<svg viewBox="0 0 700 320" role="img" aria-labelledby="t-cb">
  <title id="t-cb">Decoder, encoder, multiplexer and demultiplexer compared as blocks</title>
  <text class="f-ttl" x="10" y="20">DECODER · ENCODER · MULTIPLEXER · DEMULTIPLEXER</text>
  ${[['DECODER','n in','2\u207f out','one output line goes high','few \u2192 many','var(--color-secondary)'],
      ['ENCODER','2\u207f in','n out','reports WHICH line is high','many \u2192 few','var(--color-success)'],
      ['MULTIPLEXER','many in','1 out','select lines choose one input','many \u2192 one','var(--color-primary)'],
      ['DEMULTIPLEXER','1 in','many out','select lines choose one output','one \u2192 many','var(--color-error)']
     ].map(function(r,i){
    const x = 16 + (i % 2) * 344;
    const y = 40 + ((i/2)|0) * 138;
    return `<g>
    <rect class="f-box-d" x="${x}" y="${y}" width="324" height="124" rx="10"/>
    <text class="f-lbl-y" x="${x+20}" y="${y+26}" text-anchor="start" style="font-size:12.5px">${r[0]}</text>
    <text class="f-code" x="${x+20}" y="${y+50}" text-anchor="start" style="font-size:11.5px">${r[1]}  \u2192  ${r[2]}</text>
    <text class="f-lbl" x="${x+20}" y="${y+74}" text-anchor="start" style="font-size:11px">${r[3]}</text>
    <rect x="${x+20}" y="${y+90}" width="152" height="22" rx="11" style="fill:none;stroke:${r[5]};stroke-width:1.4"/>
    <text class="f-lbl" x="${x+96}" y="${y+105}" style="font-size:10.5px;fill:${r[5]}">${r[4]}</text>
  </g>`;}).join('')}
  <text class="f-lbl-y" x="350" y="312" style="font-size:11.5px">A MUX and a DEMUX are opposites, and so are an encoder and a decoder. Learn them in pairs.</text>
</svg>`;

/* ---- 4.6 code converters ---- */
D.grayCode = `
<svg viewBox="0 0 700 250" role="img" aria-labelledby="t-gray">
  <title id="t-gray">Converting binary to Gray code and back again</title>
  <text class="f-ttl" x="10" y="20">BINARY &#8596; GRAY CODE — only one bit changes between neighbours</text>

  <text class="f-lbl-y" x="30" y="52" text-anchor="start" style="font-size:12px">Binary &#8594; Gray: keep the first bit, then XOR each pair</text>
  ${['1','0','1','1'].map(function(b,i){
    return `<rect class="f-box" x="${`${60+i*70}`}" y="64" width="52" height="40" rx="6"/>
    <text class="f-val" x="${86+i*70}" y="90" style="font-size:15px">${b}</text>`;}).join('')}
  ${['1','1','1','0'].map(function(b,i){
    return `<rect class="f-box-g" x="${`${60+i*70}`}" y="136" width="52" height="40" rx="6"/>
    <text class="f-val" x="${86+i*70}" y="162" style="font-size:15px">${b}</text>`;}).join('')}
  <path class="f-arr" style="stroke:var(--color-success)" d="M86,108 L86,132"/>
  <text class="f-lbl" x="80" y="124"
        style="font-size:9px;fill:var(--color-success);text-anchor:end">copy</text>
  ${[0,1,2].map(function(i){
    const a = 86 + i*70, b = 86 + (i+1)*70;
    return `<path class="f-arr" style="stroke:var(--color-primary)" d="M${a+6},110 L${b-6},128"/>
    <text class="f-lbl" x="${(a+b)/2}" y="124" style="font-size:9px;fill:var(--color-primary)">&#8853;</text>`;}).join('')}

  <text class="f-lbl" x="350" y="204" style="font-size:11px">Binary 1011 becomes Gray 1110. Copy the leading 1, then XOR each neighbouring pair.</text>
  <text class="f-lbl-y" x="350" y="228" style="font-size:11.5px">Gray code is used where a wrong reading matters: only one bit changes between consecutive values.</text>
</svg>`;


/* ---- 5.5 / 5.7 the block diagram the exam asks students to redraw ---- */
D.cpuBlocks = `
<svg viewBox="0 0 700 360" role="img" aria-labelledby="t-cpub">
  <title id="t-cpub">Block diagram of a microprocessor system: CPU, memory and input output joined by buses</title>
  ${ah('a-cpu-addr', 'var(--color-secondary)')}${ah('a-cpu-data', 'var(--color-primary)')}${ah('a-cpu-ctrl', 'var(--color-error)')}
  <text class="f-ttl" x="10" y="20">MICROPROCESSOR SYSTEM — the block diagram to redraw in the exam</text>

  <rect class="f-box-y" x="30" y="42" width="270" height="182" rx="12"/>
  <text class="f-lbl-y" x="165" y="66" style="font-size:12.5px">CPU (the microprocessor)</text>

  <rect class="f-box" x="50" y="80" width="110" height="56" rx="8"/>
  <text class="f-val" x="105" y="104" style="font-size:12px">ALU</text>
  <text class="f-lbl" x="105" y="122" style="font-size:9.5px">arithmetic + logic</text>

  <rect class="f-box" x="172" y="80" width="110" height="56" rx="8"/>
  <text class="f-val" x="227" y="104" style="font-size:12px">Control Unit</text>
  <text class="f-lbl" x="227" y="122" style="font-size:9.5px">decodes, directs</text>

  <rect class="f-box" x="50" y="150" width="232" height="56" rx="8"/>
  <text class="f-val" x="166" y="174" style="font-size:12px">Registers</text>
  <text class="f-lbl" x="166" y="192" style="font-size:9.5px">A (accumulator) · B C D E H L · PC · SP · IR · flags</text>

  <rect class="f-box-g" x="430" y="42" width="240" height="76" rx="10"/>
  <text class="f-val" x="550" y="72" style="font-size:12px">MEMORY</text>
  <text class="f-lbl" x="550" y="92" style="font-size:9.5px">program and data, one byte per address</text>

  <rect class="f-box-c" x="430" y="148" width="240" height="76" rx="10"/>
  <text class="f-val" x="550" y="178" style="font-size:12px">INPUT / OUTPUT</text>
  <text class="f-lbl" x="550" y="198" style="font-size:9.5px">keyboard, display, ports</text>

  <path class="f-arr" marker-end="url(#a-cpu-addr)" style="stroke:var(--color-secondary)" d="M302,86 L426,86"/>
  <text class="f-lbl" x="364" y="76" style="font-size:10px;fill:var(--color-secondary)">ADDRESS</text>

  <path class="f-arr" marker-end="url(#a-cpu-data)" style="stroke:var(--color-primary)" d="M302,124 L426,124"/>
  <path class="f-arr" marker-end="url(#a-cpu-data)" style="stroke:var(--color-primary)" d="M426,144 L302,144"/>
  <text class="f-lbl" x="364" y="114" style="font-size:10px;fill:var(--color-primary)">DATA</text>

  <path class="f-arr" marker-end="url(#a-cpu-ctrl)" style="stroke:var(--color-error)" d="M302,192 L426,192"/>
  <text class="f-lbl" x="364" y="182" style="font-size:10px;fill:var(--color-error)">CONTROL</text>

  <text class="f-lbl-y" x="350" y="256" style="font-size:11.5px">The address bus says WHERE. The data bus carries WHAT. The control bus says WHEN and WHICH WAY.</text>
  <text class="f-lbl" x="350" y="282" style="font-size:11px">16 address lines reach 2&#185;&#8310; = 65,536 locations, which is 64 KB — the 8085's whole memory range.</text>
  <text class="f-lbl" x="350" y="306" style="font-size:11px">The data bus is 8 bits wide, which is what makes the 8085 an 8-bit microprocessor.</text>
  <text class="f-lbl" x="350" y="330" style="font-size:11px">Only the address bus is one-way: the CPU always chooses the address, never the memory.</text>
</svg>`;

/* ---- 5.8 pin configuration, grouped by function rather than listed flat ---- */
D.pins8085 = `
<svg viewBox="0 0 700 300" role="img" aria-labelledby="t-pins">
  <title id="t-pins">The 40 pins of the 8085 grouped by function</title>
  <text class="f-ttl" x="10" y="20">8085 PIN CONFIGURATION — 40 pins, learned in six groups</text>
  <text class="f-lbl" x="350" y="40" style="font-size:11px">Nobody memorises 40 separate pins. Learn the six groups and what each group is for.</text>
  ${[['Address bus','A8 – A15','8 pins — the upper half of the address','var(--color-secondary)'],
      ['Address / data','AD0 – AD7','8 pins — shared, hence multiplexed','var(--color-primary)'],
      ['Control and status','ALE, RD, WR, IO/M, S0, S1','tell memory what to do and when','var(--color-error)'],
      ['Interrupts','TRAP, RST 7.5, 6.5, 5.5, INTR, INTA','ask the CPU to stop and attend','var(--color-success)'],
      ['Power and clock','Vcc, Vss, X1, X2, CLK OUT','5 V supply and the timing crystal','var(--color-accent)'],
      ['Serial and reset','SID, SOD, RESET IN/OUT, READY, HOLD','one bit at a time, and restart','var(--color-secondary)']
     ].map(function(r,i){
    const y = 54 + i*38;
    return `<g>
    <rect class="f-box-d" x="16" y="${y}" width="668" height="32" rx="7"/>
    <rect x="18" y="${y+7}" width="4" height="18" rx="2" style="fill:${r[3]}"/>
    <text class="f-lbl-y" x="38" y="${y+21}" text-anchor="start" style="font-size:11.5px">${r[0]}</text>
    <text class="f-code" x="184" y="${y+21}" text-anchor="start" style="font-size:11px">${r[1]}</text>
    <text class="f-lbl" x="430" y="${y+21}" text-anchor="start" style="font-size:10.5px">${r[2]}</text>
  </g>`;}).join('')}
  <text class="f-lbl-y" x="350" y="296" style="font-size:11.5px">AD0–AD7 carry an address first and then data, which is why the 8085 needs the ALE pin to say which.</text>
</svg>`;

/* ---- 5.10 addressing modes ---- */
D.addressModes = `
<svg viewBox="0 0 700 280" role="img" aria-labelledby="t-addr">
  <title id="t-addr">The five addressing modes of the 8085 with an example of each</title>
  <text class="f-ttl" x="10" y="20">ADDRESSING MODES — where the instruction finds its operand</text>
  ${[['Immediate','MVI A, 05H','the value is inside the instruction itself'],
      ['Direct','LDA 2050H','the instruction gives the memory address'],
      ['Register','MOV A, B','the operand is in a named register'],
      ['Register indirect','MOV A, M','a register PAIR holds the address'],
      ['Implicit','CMA','the operand is understood, not written']
     ].map(function(r,i){
    const y = 44 + i*44;
    return `<g>
    <rect class="f-box-d" x="16" y="${y}" width="668" height="38" rx="8"/>
    <text class="f-lbl-y" x="36" y="${y+24}" text-anchor="start" style="font-size:12px">${r[0]}</text>
    <text class="f-code" x="200" y="${y+24}" text-anchor="start" style="font-size:12px">${r[1]}</text>
    <text class="f-lbl" x="360" y="${y+24}" text-anchor="start" style="font-size:11px">${r[2]}</text>
  </g>`;}).join('')}
  <text class="f-lbl-y" x="350" y="272" style="font-size:11.5px">The mode is not about what the instruction does — it is about WHERE the data it needs is found.</text>
</svg>`;


/* ---------------------------------------------------------------
   DBMS UNIT 4 — SQL
   --------------------------------------------------------------- */

/* 4.1 — the three families. A student is asked to CLASSIFY a statement
   far more often than to write one, so the classification is the
   figure: three columns, and what each family is allowed to touch. */
D.sqlFamilies = `
<svg viewBox="0 0 700 232" role="img" aria-labelledby="t-sqlfam">
  <title id="t-sqlfam">The three families of SQL statements: DDL changes structure, DML changes data, DCL changes permission</title>
  <text class="f-ttl" x="10" y="20">THE THREE FAMILIES OF SQL — sort a statement by WHAT IT CHANGES</text>
${[
  ['DDL', 'Data Definition', 'the STRUCTURE', ['CREATE', 'ALTER', 'DROP', 'RENAME'], '--color-primary'],
  ['DML', 'Data Manipulation', 'the DATA inside', ['SELECT', 'INSERT', 'UPDATE', 'DELETE'], '--color-success'],
  ['DCL', 'Data Control', 'WHO may use it', ['GRANT', 'REVOKE'], '--color-secondary']
].map(function (f, i){
  const x = 16 + i * 230;
  return `<g>
    <rect class="f-box-d" x="${x}" y="40" width="216" height="150" rx="8"/>
    <rect x="${x + 2}" y="52" width="4" height="26" rx="2" style="fill:var(${f[4]})"/>
    <text class="f-lbl-y" x="${x + 20}" y="64" text-anchor="start" style="font-size:14px">${f[0]}</text>
    <text class="f-lbl" x="${x + 20}" y="80" text-anchor="start" style="font-size:11px">${f[1]}</text>
    <text class="f-lbl" x="${x + 20}" y="102" text-anchor="start" style="font-size:11.5px">changes ${f[2]}</text>
    ${f[3].map(function (s, k){
      return `<text class="f-code" x="${x + 20}" y="${126 + k * 20}" text-anchor="start" style="font-size:12.5px">${s}</text>`;
    }).join('')}
  </g>`;
}).join('')}
  <text class="f-lbl-y" x="350" y="212">DROP removes the table. DELETE removes rows FROM the table. Different families, and only one is reversible by inserting again.</text>
</svg>`;

/* 4.3 and 4.5 — the pipeline. This is the figure the SQL simulator
   animates: the same four stages, and the row count falling. Learning
   the ORDER is what lets a student predict a result instead of
   guessing it. */
D.sqlPipeline = `
<svg viewBox="0 0 700 208" role="img" aria-labelledby="t-sqlpipe">
  <title id="t-sqlpipe">A SELECT query runs in four stages: FROM chooses the table, WHERE chooses rows, SELECT chooses columns, ORDER BY sorts</title>
  ${ah('a-sqlpipe')}
  <text class="f-ttl" x="10" y="20">HOW A SELECT ACTUALLY RUNS — four stages, in this order</text>
${[
  ['FROM', 'which TABLE', '4 rows', '--color-secondary'],
  ['WHERE', 'which ROWS', '3 rows', '--color-primary'],
  ['SELECT', 'which COLUMNS', '3 rows', '--color-success'],
  ['ORDER BY', 'in what ORDER', '3 rows', '--color-secondary']
].map(function (s, i){
  const x = 16 + i * 174;
  return `<g>
    <rect class="f-box-d" x="${x}" y="48" width="146" height="88" rx="8"/>
    <rect x="${x + 2}" y="60" width="4" height="24" rx="2" style="fill:var(${s[3]})"/>
    <text class="f-lbl-y" x="${x + 73}" y="74" style="font-size:13px">${s[0]}</text>
    <text class="f-lbl" x="${x + 73}" y="94" style="font-size:11.5px">${s[1]}</text>
    <text class="f-code" x="${x + 73}" y="120" text-anchor="middle" style="font-size:13px">${s[2]}</text>
    ${i < 3 ? `<line class="f-arr" x1="${x + 148}" y1="92" x2="${x + 172}" y2="92" marker-end="url(#a-sqlpipe)"/>` : ''}
  </g>`;
}).join('')}
  <text class="f-code" x="350" y="164" text-anchor="middle" style="font-size:12px">SELECT name FROM Student WHERE marks &gt; 60 ORDER BY marks DESC;</text>
  <text class="f-lbl-y" x="350" y="188">WHERE removes rows. SELECT removes columns. ORDER BY removes nothing — it only rearranges.</text>
</svg>`;

/* 4.6 — the five joins. The shaded region is the answer to "which rows
   survive", which is the only thing that separates them. */
D.joinTypes = `
<svg viewBox="0 0 700 216" role="img" aria-labelledby="t-joins">
  <title id="t-joins">The five join types and which rows each one keeps: inner and natural keep only matches, left and right keep one whole side, full outer keeps everything</title>
  <text class="f-ttl" x="10" y="20">THE FIVE JOINS — the shaded part is what survives</text>
${[
  ['INNER', 'lens', 'matches only'],
  ['NATURAL', 'lens', 'matches, on the shared column'],
  ['LEFT', 'left', 'all of A, plus matches'],
  ['RIGHT', 'right', 'all of B, plus matches'],
  ['FULL OUTER', 'both', 'everything from both']
].map(function (j, i){
  const x = 6 + i * 138;
  const c1 = x + 48, c2 = x + 90, mid = x + 69, cy = 112, r = 34;
  const top = cy - 27, bot = cy + 27;
  let fill = '';
  if (j[1] === 'lens'){
    fill = `<path d="M${mid},${top} A${r},${r} 0 0 1 ${mid},${bot} A${r},${r} 0 0 1 ${mid},${top} Z" style="fill:var(--color-primary);opacity:.45"/>`;
  } else if (j[1] === 'left'){
    fill = `<circle cx="${c1}" cy="${cy}" r="${r}" style="fill:var(--color-primary);opacity:.45"/>`;
  } else if (j[1] === 'right'){
    fill = `<circle cx="${c2}" cy="${cy}" r="${r}" style="fill:var(--color-primary);opacity:.45"/>`;
  } else {
    fill = `<circle cx="${c1}" cy="${cy}" r="${r}" style="fill:var(--color-primary);opacity:.45"/>
            <circle cx="${c2}" cy="${cy}" r="${r}" style="fill:var(--color-primary);opacity:.45"/>`;
  }
  return `<g>
    <text class="f-lbl-y" x="${mid}" y="52" style="font-size:11.5px">${j[0]}</text>
    ${fill}
    <circle cx="${c1}" cy="${cy}" r="${r}" style="fill:none;stroke:var(--color-border-strong);stroke-width:1.5"/>
    <circle cx="${c2}" cy="${cy}" r="${r}" style="fill:none;stroke:var(--color-border-strong);stroke-width:1.5"/>
    <text class="f-lbl" x="${c1 - 14}" y="${cy + 4}" style="font-size:11px">A</text>
    <text class="f-lbl" x="${c2 + 14}" y="${cy + 4}" style="font-size:11px">B</text>
    <text class="f-lbl" x="${mid}" y="172" style="font-size:10.5px">${j[2]}</text>
  </g>`;
}).join('')}
  <text class="f-lbl-y" x="350" y="200">Every join starts from the same matching test. They differ only in what they do with the rows that DID NOT match.</text>
</svg>`;


/* ---------------------------------------------------------------
   DBMS UNIT 1 — INTRODUCTION
   --------------------------------------------------------------- */

/* 1.1 — the four words students are asked to distinguish, arranged as
   a ladder so the ORDER of the definitions carries the meaning. */
D.dbLadder = `
<svg viewBox="0 0 700 226" role="img" aria-labelledby="t-dbladder">
  <title id="t-dbladder">Data becomes information, information is stored in a database, and a DBMS is the software that manages it</title>
  ${ah('a-dbladder')}
  <text class="f-ttl" x="10" y="20">FOUR WORDS, IN ORDER — each one is built on the one before it</text>
${[
  ['DATA', 'raw facts, no meaning yet', '78, Ram, 10', '--color-secondary'],
  ['INFORMATION', 'data given meaning', 'Ram scored 78 in class 10', '--color-success'],
  ['DATABASE', 'that information, stored and organised', 'the Student table', '--color-primary'],
  ['DBMS', 'the SOFTWARE that manages the database', 'MySQL, Oracle, MS Access', '--color-error']
].map(function (r, i){
  const y = 40 + i * 40;
  return `<g>
    <rect class="f-box-d" x="16" y="${y}" width="668" height="34" rx="7"/>
    <rect x="18" y="${y + 7}" width="4" height="20" rx="2" style="fill:var(${r[3]})"/>
    <text class="f-lbl-y" x="36" y="${y + 22}" text-anchor="start" style="font-size:12.5px">${r[0]}</text>
    <text class="f-lbl" x="150" y="${y + 22}" text-anchor="start" style="font-size:11.5px">${r[1]}</text>
    <text class="f-code" x="440" y="${y + 22}" text-anchor="start" style="font-size:12px">${r[2]}</text>
    ${i < 3 ? `<line class="f-arr" x1="26" y1="${y + 34}" x2="26" y2="${y + 38}" marker-end="url(#a-dbladder)"/>` : ''}
  </g>`;
}).join('')}
  <text class="f-lbl-y" x="350" y="214">The commonest slip: calling the DBMS "the database". The database is the data; the DBMS is the program that looks after it.</text>
</svg>`;

/* 1.2 and 1.3 — the file system's four problems, each paired with the
   database answer. This comparison IS the exam question. */
D.fileVsDb = `
<svg viewBox="0 0 700 246" role="img" aria-labelledby="t-filevsdb">
  <title id="t-filevsdb">Four limitations of the file system and how a database system answers each one</title>
  <text class="f-ttl" x="10" y="20">WHY THE DATABASE REPLACED THE FILE SYSTEM</text>
  <text class="f-lbl-y" x="180" y="42" style="font-size:12px">FILE SYSTEM — the problem</text>
  <text class="f-lbl-y" x="520" y="42" style="font-size:12px">DATABASE SYSTEM — the answer</text>
${[
  ['Data redundancy', 'the same address stored in three files', 'stored once, referenced everywhere'],
  ['Data inconsistency', 'one copy updated, two left stale', 'one copy, so it cannot disagree'],
  ['Data isolation', 'files in different formats, hard to combine', 'one structure, queried together'],
  ['No concurrent control', 'two people writing at once corrupts it', 'transactions keep it correct']
].map(function (r, i){
  const y = 54 + i * 44;
  return `<g>
    <rect class="f-box-d" x="16" y="${y}" width="332" height="38" rx="7"/>
    <rect class="f-box-d" x="356" y="${y}" width="328" height="38" rx="7"/>
    <rect x="18" y="${y + 8}" width="4" height="22" rx="2" style="fill:var(--color-error)"/>
    <rect x="358" y="${y + 8}" width="4" height="22" rx="2" style="fill:var(--color-success)"/>
    <text class="f-lbl-y" x="36" y="${y + 17}" text-anchor="start" style="font-size:11.5px">${r[0]}</text>
    <text class="f-lbl" x="36" y="${y + 31}" text-anchor="start" style="font-size:10.5px">${r[1]}</text>
    <text class="f-lbl" x="376" y="${y + 24}" text-anchor="start" style="font-size:11.5px">${r[2]}</text>
  </g>`;
}).join('')}
  <text class="f-lbl-y" x="350" y="240">Learn them as PAIRS. A question asking for limitations is really asking you to show you know what a database fixes.</text>
</svg>`;

/* 1.6 — the three-level architecture. ANIMATED, because the lesson is
   what each level HIDES from the one above it, and hiding is a
   sequence, not a picture. */
D.dbArchitecture = {
  type: 'animated',
  intro: { en: 'Three levels, and what each one hides.',
           ne: 'तीन तह, र हरेकले के लुकाउँछ।' },
  svg: `
<svg viewBox="0 0 700 300" role="img" aria-labelledby="t-dbarch">
  <title id="t-dbarch">The three-level DBMS architecture: external, conceptual and internal, with data independence between them</title>
  <text class="f-ttl" x="10" y="20">THE THREE-LEVEL ARCHITECTURE</text>

  <g id="arch-1">
    <rect class="f-box-d" x="120" y="40" width="460" height="56" rx="8"/>
    <text class="f-lbl-y" x="350" y="62" style="font-size:13px">EXTERNAL LEVEL (View level)</text>
    <text class="f-lbl" x="350" y="82" style="font-size:11.5px">what each user is allowed to see — a teacher's view, a clerk's view</text>
  </g>
  <g id="arch-2">
    <rect class="f-box-d" x="120" y="122" width="460" height="56" rx="8"/>
    <text class="f-lbl-y" x="350" y="144" style="font-size:13px">CONCEPTUAL LEVEL (Logical level)</text>
    <text class="f-lbl" x="350" y="164" style="font-size:11.5px">what data exists and how it relates — tables, columns, keys</text>
  </g>
  <g id="arch-3">
    <rect class="f-box-d" x="120" y="204" width="460" height="56" rx="8"/>
    <text class="f-lbl-y" x="350" y="226" style="font-size:13px">INTERNAL LEVEL (Physical level)</text>
    <text class="f-lbl" x="350" y="246" style="font-size:11.5px">how the bytes are actually stored on the disk</text>
  </g>
  <g id="arch-4">
    <text class="f-lbl-y" x="350" y="112" style="font-size:11px">logical data independence</text>
    <text class="f-lbl-y" x="350" y="194" style="font-size:11px">physical data independence</text>
  </g>
  <text class="f-lbl" x="350" y="284" style="font-size:11px">A change at one level does not force a change at the level above. That is the whole purpose.</text>
</svg>`,
  steps: [
    { show: '#arch-3', focus: '#arch-3',
      en: 'Start at the bottom. The INTERNAL level is how the data physically sits on the disk — files, blocks, indexes.',
      ne: 'तलबाट सुरु। INTERNAL तह भनेको डिस्कमा डाटा भौतिक रूपमा कसरी बस्छ — फाइल, ब्लक, इन्डेक्स।' },
    { show: '#arch-2', focus: '#arch-2',
      en: 'Above it, the CONCEPTUAL level says WHAT data exists and how it relates — the tables and keys. It does not care how the disk stores them.',
      ne: 'माथि CONCEPTUAL तहले कुन डाटा छ र कसरी सम्बन्धित छ भन्छ — तालिका र कुञ्जी। डिस्कले कसरी राख्छ भन्ने वास्ता गर्दैन।' },
    { show: '#arch-1', focus: '#arch-1',
      en: 'At the top, the EXTERNAL level is what each user sees. A teacher sees marks; a clerk sees addresses. Neither sees the whole database.',
      ne: 'सबैभन्दा माथि EXTERNAL तह — हरेक प्रयोगकर्ताले देख्ने कुरा। शिक्षकले अंक, कर्मचारीले ठेगाना। कसैले पूरै डाटाबेस देख्दैन।' },
    { show: '#arch-4', focus: '#arch-4',
      en: 'The gaps between the levels are DATA INDEPENDENCE. Change the disk storage and the tables do not change; change a table and a user\'s view can stay the same.',
      ne: 'तहबीचका खाली ठाउँ नै DATA INDEPENDENCE हुन्। डिस्क भण्डारण बदल्दा तालिका बदलिँदैन; तालिका बदल्दा प्रयोगकर्ताको view उही रहन सक्छ।' }
  ]
};

/* 1.7 — the four database models, in the order they appeared. */
D.dbModels = `
<svg viewBox="0 0 700 200" role="img" aria-labelledby="t-dbmodels">
  <title id="t-dbmodels">Four database models: hierarchical, network, relational and object-oriented</title>
  <text class="f-ttl" x="10" y="20">FOUR DATABASE MODELS — how the data is arranged</text>
${[
  ['HIERARCHICAL', 'a tree — one parent, many children', 'a child has ONE parent only'],
  ['NETWORK', 'a graph — many-to-many allowed', 'a child may have SEVERAL parents'],
  ['RELATIONAL', 'tables linked by keys', 'the model this syllabus teaches'],
  ['OBJECT-ORIENTED', 'objects with data and methods', 'used where data is complex']
].map(function (r, i){
  const y = 38 + i * 38;
  return `<g>
    <rect class="f-box-d" x="16" y="${y}" width="668" height="32" rx="7"/>
    <rect x="18" y="${y + 6}" width="4" height="20" rx="2" style="fill:var(${i === 2 ? '--color-primary' : '--color-border-strong'})"/>
    <text class="f-lbl-y" x="36" y="${y + 21}" text-anchor="start" style="font-size:12px">${r[0]}</text>
    <text class="f-lbl" x="215" y="${y + 21}" text-anchor="start" style="font-size:11.5px">${r[1]}</text>
    <text class="f-lbl" x="450" y="${y + 21}" text-anchor="start" style="font-size:11px">${r[2]}</text>
  </g>`;
}).join('')}
  <text class="f-lbl-y" x="350" y="196">Hierarchical and network differ on ONE point: how many parents a record may have. That is the examinable difference.</text>
</svg>`;

/* ---------------------------------------------------------------
   DBMS UNIT 2 — ER MODEL
   --------------------------------------------------------------- */

/* 2.2–2.4 — the notation a student must be able to draw from memory. */
D.erSymbols = `
<svg viewBox="0 0 700 268" role="img" aria-labelledby="t-ersym">
  <title id="t-ersym">The ER diagram symbols: rectangle for entity, double rectangle for weak entity, ellipse for attribute, underlined for key, double for multivalued, dashed for derived, diamond for relationship</title>
  <text class="f-ttl" x="10" y="20">ER SYMBOLS — learn to draw these from memory</text>

  <g>
    <rect x="40" y="44" width="112" height="44" rx="3" style="fill:var(--color-surface);stroke:var(--color-secondary);stroke-width:2"/>
    <text class="f-lbl-y" x="96" y="70" style="font-size:12px">STUDENT</text>
    <text class="f-lbl" x="96" y="106" style="font-size:11px">Entity — a real thing</text>
    <text class="f-lbl" x="96" y="120" style="font-size:10.5px">becomes a TABLE</text>
  </g>
  <g>
    <rect x="212" y="44" width="112" height="44" rx="3" style="fill:none;stroke:var(--color-secondary);stroke-width:2"/>
    <rect x="217" y="49" width="102" height="34" rx="2" style="fill:var(--color-surface);stroke:var(--color-secondary);stroke-width:1.5"/>
    <text class="f-lbl-y" x="268" y="70" style="font-size:12px">DEPENDENT</text>
    <text class="f-lbl" x="268" y="106" style="font-size:11px">Weak entity</text>
    <text class="f-lbl" x="268" y="120" style="font-size:10.5px">no key of its own</text>
  </g>
  <g>
    <path d="M440,44 L516,66 L440,88 L364,66 Z" style="fill:var(--color-surface);stroke:var(--color-primary);stroke-width:2"/>
    <text class="f-lbl-y" x="440" y="70" style="font-size:11px">ENROLS</text>
    <text class="f-lbl" x="440" y="106" style="font-size:11px">Relationship</text>
    <text class="f-lbl" x="440" y="120" style="font-size:10.5px">written as a verb</text>
  </g>
  <g>
    <ellipse cx="608" cy="66" rx="58" ry="22" style="fill:var(--color-surface);stroke:var(--color-border-strong);stroke-width:1.5"/>
    <text class="f-lbl-y" x="608" y="70" style="font-size:11px">name</text>
    <text class="f-lbl" x="608" y="106" style="font-size:11px">Attribute</text>
    <text class="f-lbl" x="608" y="120" style="font-size:10.5px">becomes a COLUMN</text>
  </g>

  <g>
    <ellipse cx="96" cy="164" rx="58" ry="22" style="fill:var(--color-surface);stroke:var(--color-border-strong);stroke-width:1.5"/>
    <text class="f-lbl-y" x="96" y="168" style="font-size:11px" text-decoration="underline">student_id</text>
    <text class="f-lbl" x="96" y="204" style="font-size:11px">Key attribute</text>
    <text class="f-lbl" x="96" y="218" style="font-size:10.5px">underlined — PRIMARY KEY</text>
  </g>
  <g>
    <ellipse cx="268" cy="164" rx="60" ry="24" style="fill:none;stroke:var(--color-border-strong);stroke-width:1.5"/>
    <ellipse cx="268" cy="164" rx="53" ry="18" style="fill:var(--color-surface);stroke:var(--color-border-strong);stroke-width:1.5"/>
    <text class="f-lbl-y" x="268" y="168" style="font-size:11px">phone</text>
    <text class="f-lbl" x="268" y="204" style="font-size:11px">Multivalued</text>
    <text class="f-lbl" x="268" y="218" style="font-size:10.5px">can hold several values</text>
  </g>
  <g>
    <ellipse cx="440" cy="164" rx="58" ry="22" style="fill:var(--color-surface);stroke:var(--color-border-strong);stroke-width:1.5;stroke-dasharray:5 4"/>
    <text class="f-lbl-y" x="440" y="168" style="font-size:11px">age</text>
    <text class="f-lbl" x="440" y="204" style="font-size:11px">Derived</text>
    <text class="f-lbl" x="440" y="218" style="font-size:10.5px">worked out, not stored</text>
  </g>
  <g>
    <ellipse cx="608" cy="164" rx="58" ry="22" style="fill:var(--color-surface);stroke:var(--color-border-strong);stroke-width:1.5"/>
    <text class="f-lbl-y" x="608" y="160" style="font-size:10.5px">address</text>
    <text class="f-lbl" x="608" y="174" style="font-size:9.5px">city + ward</text>
    <text class="f-lbl" x="608" y="204" style="font-size:11px">Composite</text>
    <text class="f-lbl" x="608" y="218" style="font-size:10.5px">splits into smaller parts</text>
  </g>

  <text class="f-lbl-y" x="350" y="252">A drawing question is marked on the SHAPES. A rectangle where an ellipse belongs loses the mark even if the word is right.</text>
</svg>`;

/* 2.6 — the key family. Students are asked to distinguish these far
   more often than to use them. */
D.keyTypes = `
<svg viewBox="0 0 700 220" role="img" aria-labelledby="t-keytypes">
  <title id="t-keytypes">Types of keys in DBMS: super key, candidate key, primary key, alternate key, foreign key and composite key</title>
  <text class="f-ttl" x="10" y="20">KEYS — each one is a narrowing of the one before</text>
${[
  ['SUPER KEY', 'ANY set of columns that identifies a row uniquely', '{id}, {id, name}, {id, name, marks}'],
  ['CANDIDATE KEY', 'a super key with nothing spare in it', '{id}, {roll_no}'],
  ['PRIMARY KEY', 'the ONE candidate key actually chosen', '{id}'],
  ['ALTERNATE KEY', 'the candidate keys that were not chosen', '{roll_no}'],
  ['FOREIGN KEY', 'a column pointing at another table’s primary key', 'Student.class_id → Class.class_id'],
  ['COMPOSITE KEY', 'a key made of two or more columns together', '{student_id, course_id}']
].map(function (r, i){
  const y = 38 + i * 28;
  return `<g>
    <rect class="f-box-d" x="16" y="${y}" width="668" height="24" rx="6"/>
    <rect x="18" y="${y + 4}" width="4" height="16" rx="2" style="fill:var(${i === 2 ? '--color-primary' : i === 4 ? '--color-secondary' : '--color-border-strong'})"/>
    <text class="f-lbl-y" x="36" y="${y + 17}" text-anchor="start" style="font-size:11.5px">${r[0]}</text>
    <text class="f-lbl" x="166" y="${y + 17}" text-anchor="start" style="font-size:11px">${r[1]}</text>
    <text class="f-code" x="452" y="${y + 17}" text-anchor="start" style="font-size:11px">${r[2]}</text>
  </g>`;
}).join('')}
  <text class="f-lbl-y" x="350" y="214">Every primary key is a candidate key, and every candidate key is a super key. The reverse is not true.</text>
</svg>`;

/* ---------------------------------------------------------------
   DBMS UNIT 3 — RELATIONAL MODEL
   --------------------------------------------------------------- */

/* 3.4 — ER to tables. ANIMATED, because it is a procedure with an
   order, and because the junction table appearing is the moment the
   whole M:N rule becomes visible. */
D.erToRelational = {
  type: 'animated',
  intro: { en: 'Turning an ER diagram into tables, one rule at a time.',
           ne: 'ER चित्रलाई तालिकामा बदल्ने — एक पटकमा एउटा नियम।' },
  svg: `
<svg viewBox="0 0 700 300" role="img" aria-labelledby="t-er2rel">
  <title id="t-er2rel">Mapping an ER model to a relational model: each entity becomes a table, each attribute a column, and a many-to-many relationship becomes a third table</title>
  <text class="f-ttl" x="10" y="20">ER MODEL → RELATIONAL MODEL</text>

  <g id="e2r-1">
    <rect x="40" y="40" width="120" height="44" rx="3" style="fill:var(--color-surface);stroke:var(--color-secondary);stroke-width:2"/>
    <text class="f-lbl-y" x="100" y="66" style="font-size:12px">STUDENT</text>
    <path d="M350,40 L410,62 L350,84 L290,62 Z" style="fill:var(--color-surface);stroke:var(--color-primary);stroke-width:2"/>
    <text class="f-lbl-y" x="350" y="66" style="font-size:10.5px">ENROLS</text>
    <rect x="540" y="40" width="120" height="44" rx="3" style="fill:var(--color-surface);stroke:var(--color-secondary);stroke-width:2"/>
    <text class="f-lbl-y" x="600" y="66" style="font-size:12px">COURSE</text>
    <line class="f-ln" x1="160" y1="62" x2="290" y2="62"/>
    <line class="f-ln" x1="410" y1="62" x2="540" y2="62"/>
    <text class="f-card" x="225" y="54" style="fill:var(--color-primary);font-size:14px;text-anchor:middle;font-weight:700">M</text>
    <text class="f-card" x="475" y="54" style="fill:var(--color-primary);font-size:14px;text-anchor:middle;font-weight:700">N</text>
  </g>

  <g id="e2r-2">
    <rect class="f-box-d" x="40" y="122" width="200" height="58" rx="7"/>
    <text class="f-lbl-y" x="140" y="142" style="font-size:11.5px">Student</text>
    <text class="f-code" x="140" y="160" style="font-size:11px">student_id (PK)</text>
    <text class="f-code" x="140" y="174" style="font-size:11px">name</text>
  </g>
  <g id="e2r-3">
    <rect class="f-box-d" x="460" y="122" width="200" height="58" rx="7"/>
    <text class="f-lbl-y" x="560" y="142" style="font-size:11.5px">Course</text>
    <text class="f-code" x="560" y="160" style="font-size:11px">course_id (PK)</text>
    <text class="f-code" x="560" y="174" style="font-size:11px">title</text>
  </g>
  <g id="e2r-4">
    <rect class="f-box-d" x="250" y="200" width="200" height="66" rx="7"/>
    <rect x="252" y="208" width="4" height="50" rx="2" style="fill:var(--color-primary)"/>
    <text class="f-lbl-y" x="350" y="222" style="font-size:11.5px">Enrolment</text>
    <text class="f-code" x="350" y="240" style="font-size:11px">student_id (FK)</text>
    <text class="f-code" x="350" y="254" style="font-size:11px">course_id (FK)</text>
  </g>
  <text class="f-lbl" x="350" y="288" style="font-size:11px">Two entities and one M:N relationship give THREE tables, not two.</text>
</svg>`,
  steps: [
    { show: '#e2r-1', focus: '#e2r-1',
      en: 'Start from the ER diagram: two entities and one relationship, many-to-many.',
      ne: 'ER चित्रबाट सुरु: दुई इन्टिटी र एउटा सम्बन्ध, धेरै–धेरै।' },
    { show: '#e2r-2', focus: '#e2r-2',
      en: 'Rule 1: every entity becomes a table. STUDENT becomes Student, and its key attribute becomes the primary key.',
      ne: 'नियम १: हरेक इन्टिटी तालिका बन्छ। STUDENT बाट Student, र यसको कुञ्जी एट्रिब्युट प्राथमिक कुञ्जी बन्छ।' },
    { show: '#e2r-3', focus: '#e2r-3',
      en: 'The same rule again for COURSE. Every attribute becomes a column.',
      ne: 'COURSE लाई पनि उही नियम। हरेक एट्रिब्युट स्तम्भ बन्छ।' },
    { show: '#e2r-4', focus: '#e2r-4',
      en: 'Rule 2: a MANY-TO-MANY relationship becomes a table of its own, holding the primary key of each side as a foreign key. This third table is the one students forget.',
      ne: 'नियम २: धेरै–धेरै सम्बन्ध आफैं एउटा तालिका बन्छ, जसमा दुवैतर्फको प्राथमिक कुञ्जी foreign key भएर बस्छ। विद्यार्थीले बिर्सने तेस्रो तालिका यही हो।' }
  ]
};

/* ---------------------------------------------------------------
   DBMS UNIT 5 — RELATIONAL DATABASE DESIGN
   --------------------------------------------------------------- */

/* 5.3 — normalization. ANIMATED, because it is a sequence of
   decompositions and each step removes a NAMED anomaly. Seeing the
   table split is the lesson; a final answer is not. */
D.normalForms = {
  type: 'animated',
  intro: { en: 'One badly designed table, normalised to 3NF step by step.',
           ne: 'नराम्रो डिजाइनको एउटा तालिकालाई चरण–चरणमा 3NF सम्म।' },
  svg: `
<svg viewBox="0 0 700 320" role="img" aria-labelledby="t-nf">
  <title id="t-nf">Normalising a table: 1NF removes repeating groups, 2NF removes partial dependency, 3NF removes transitive dependency</title>
  <text class="f-ttl" x="10" y="20">NORMALISATION — each step removes ONE named problem</text>

  <g id="nf-0">
    <rect class="f-box-d" x="16" y="36" width="668" height="58" rx="7"/>
    <rect x="18" y="44" width="4" height="42" rx="2" style="fill:var(--color-error)"/>
    <text class="f-lbl-y" x="36" y="54" text-anchor="start" style="font-size:11.5px">UNNORMALISED</text>
    <text class="f-code" x="36" y="72" text-anchor="start" style="font-size:11px">Student( id, name, class_id, class_room, subjects: "Maths, Science" )</text>
    <text class="f-lbl" x="36" y="88" text-anchor="start" style="font-size:10.5px">one cell holds two subjects, and the room repeats on every row of that class</text>
  </g>

  <g id="nf-1">
    <rect class="f-box-d" x="16" y="100" width="668" height="46" rx="7"/>
    <rect x="18" y="108" width="4" height="30" rx="2" style="fill:var(--color-primary)"/>
    <text class="f-lbl-y" x="36" y="118" text-anchor="start" style="font-size:11.5px">1NF — every cell holds ONE value</text>
    <text class="f-code" x="36" y="136" text-anchor="start" style="font-size:11px">Student( id, name, subject, class_id, class_room )  ← one row per subject</text>
  </g>

  <g id="nf-2">
    <rect class="f-box-d" x="16" y="158" width="668" height="62" rx="7"/>
    <rect x="18" y="166" width="4" height="46" rx="2" style="fill:var(--color-primary)"/>
    <text class="f-lbl-y" x="36" y="176" text-anchor="start" style="font-size:11.5px">2NF — no PARTIAL dependency on part of a composite key</text>
    <text class="f-code" x="36" y="194" text-anchor="start" style="font-size:11px">Student( id, name, class_id, class_room )</text>
    <text class="f-code" x="36" y="210" text-anchor="start" style="font-size:11px">Takes( id, subject )</text>
  </g>

  <g id="nf-3">
    <rect class="f-box-d" x="16" y="232" width="668" height="62" rx="7"/>
    <rect x="18" y="240" width="4" height="46" rx="2" style="fill:var(--color-success)"/>
    <text class="f-lbl-y" x="36" y="250" text-anchor="start" style="font-size:11.5px">3NF — no TRANSITIVE dependency through a non-key column</text>
    <text class="f-code" x="36" y="268" text-anchor="start" style="font-size:11px">Student( id, name, class_id )   Takes( id, subject )</text>
    <text class="f-code" x="36" y="284" text-anchor="start" style="font-size:11px">Class( class_id, class_room )</text>
  </g>

  <text class="f-lbl" x="350" y="312" style="font-size:11px">Three steps, three named problems. Name the problem in your answer and the marks follow.</text>
</svg>`,
  steps: [
    { show: '#nf-0', focus: '#nf-0',
      en: 'The starting table has two faults: one cell holds two subjects, and class_room is repeated on every row of the same class.',
      ne: 'सुरुको तालिकामा दुई दोष छन्: एउटै कक्षमा दुई विषय, र उही कक्षाका हरेक पङ्क्तिमा class_room दोहोरिन्छ।' },
    { show: '#nf-1', focus: '#nf-1',
      en: '1NF: make every cell hold ONE value. Split the subject list into separate rows. The repeating group is gone.',
      ne: '1NF: हरेक कक्षमा एउटै मान राख्नुहोस्। विषयको सूचीलाई छुट्टै पङ्क्तिमा बाँड्नुहोस्। दोहोरिने समूह हट्यो।' },
    { show: '#nf-2', focus: '#nf-2',
      en: '2NF: the key is now (id, subject), but name depends on id alone — a PARTIAL dependency. Split it out into two tables.',
      ne: '2NF: कुञ्जी अब (id, subject) हो, तर name id मा मात्र निर्भर छ — PARTIAL निर्भरता। दुई तालिकामा छुट्याउनुहोस्।' },
    { show: '#nf-3', focus: '#nf-3',
      en: '3NF: class_room depends on class_id, which depends on id — a TRANSITIVE dependency. Move it to its own Class table. Now every column depends on the key, the whole key, and nothing but the key.',
      ne: '3NF: class_room, class_id मा निर्भर छ र class_id, id मा — TRANSITIVE निर्भरता। छुट्टै Class तालिकामा सार्नुहोस्। अब हरेक स्तम्भ कुञ्जीमा मात्र निर्भर हुन्छ।' }
  ]
};

/* ---------------------------------------------------------------
   DBMS UNIT 6 — TRANSACTION
   --------------------------------------------------------------- */

/* 6.3 — ACID. Each property is shown by the failure it prevents,
   because that is how a student remembers which is which. */
D.acidProps = `
<svg viewBox="0 0 700 216" role="img" aria-labelledby="t-acid">
  <title id="t-acid">The four ACID properties of a transaction: atomicity, consistency, isolation and durability, each shown by the failure it prevents</title>
  <text class="f-ttl" x="10" y="20">ACID — learn each one by the DISASTER it prevents</text>
  <text class="f-lbl-y" x="120" y="42" style="font-size:11.5px">PROPERTY</text>
  <text class="f-lbl-y" x="330" y="42" style="font-size:11.5px">PROMISE</text>
  <text class="f-lbl-y" x="560" y="42" style="font-size:11.5px">WITHOUT IT</text>
${[
  /* Three columns share 668px. Each string is kept inside the width its
     column actually has — the first version ran the middle column into
     the third, which the geometry audit caught as text over text. */
  ['ATOMICITY', 'all of it happens, or none of it', 'money leaves an account, arrives nowhere'],
  ['CONSISTENCY', 'the rules hold before and after', 'a row points at a class that is not there'],
  ['ISOLATION', 'no transaction sees another mid-way', 'two clerks subtract from one balance'],
  ['DURABILITY', 'once committed, it survives a crash', 'a power cut erases confirmed work']
].map(function (r, i){
  const y = 54 + i * 38;
  return `<g>
    <rect class="f-box-d" x="16" y="${y}" width="668" height="32" rx="7"/>
    <rect x="18" y="${y + 6}" width="4" height="20" rx="2" style="fill:var(--color-primary)"/>
    <text class="f-lbl-y" x="36" y="${y + 21}" text-anchor="start" style="font-size:11.5px">${r[0]}</text>
    <text class="f-lbl" x="216" y="${y + 21}" text-anchor="start" style="font-size:11px">${r[1]}</text>
    <text class="f-lbl" x="448" y="${y + 21}" text-anchor="start" style="font-size:10.5px">${r[2]}</text>
  </g>`;
}).join('')}
  <text class="f-lbl-y" x="350" y="210">A transaction is not "a change". It is a change that carries all four of these promises.</text>
</svg>`;

/* 6.4 — the states. ANIMATED, because the states are a PATH and the
   abort branch is the half students leave out of the diagram. */
D.txnStates = {
  type: 'animated',
  intro: { en: 'A transaction from start to finish, including the path that fails.',
           ne: 'ट्रान्ज्याक्सन सुरुदेखि अन्त्यसम्म, असफल हुने बाटोसहित।' },
  svg: `
<svg viewBox="0 0 700 250" role="img" aria-labelledby="t-txn">
  <title id="t-txn">The states of a transaction: active, partially committed, committed, failed and aborted</title>
  ${ah('a-txn')}
  <text class="f-ttl" x="10" y="20">STATES OF A TRANSACTION</text>

  <g id="tx-1">
    <rect class="f-box-d" x="20" y="90" width="120" height="42" rx="7"/>
    <text class="f-lbl-y" x="80" y="116" style="font-size:12px">ACTIVE</text>
  </g>
  <g id="tx-2">
    <rect class="f-box-d" x="190" y="90" width="150" height="42" rx="7"/>
    <text class="f-lbl-y" x="265" y="106" style="font-size:11.5px">PARTIALLY</text>
    <text class="f-lbl-y" x="265" y="124" style="font-size:11.5px">COMMITTED</text>
    <line class="f-arr" x1="142" y1="111" x2="186" y2="111" marker-end="url(#a-txn)"/>
  </g>
  <g id="tx-3">
    <rect class="f-box-d" x="392" y="90" width="130" height="42" rx="7"/>
    <rect x="394" y="98" width="4" height="26" rx="2" style="fill:var(--color-success)"/>
    <text class="f-lbl-y" x="460" y="116" style="font-size:12px">COMMITTED</text>
    <line class="f-arr" x1="342" y1="111" x2="388" y2="111" marker-end="url(#a-txn)"/>
  </g>
  <g id="tx-4">
    <rect class="f-box-d" x="190" y="176" width="150" height="42" rx="7"/>
    <rect x="192" y="184" width="4" height="26" rx="2" style="fill:var(--color-error)"/>
    <text class="f-lbl-y" x="265" y="202" style="font-size:12px">FAILED</text>
    <line class="f-arr" x1="80" y1="134" x2="80" y2="197" marker-end="url(#a-txn)"/>
    <line class="f-ln" x1="80" y1="197" x2="186" y2="197"/>
  </g>
  <g id="tx-5">
    <rect class="f-box-d" x="392" y="176" width="130" height="42" rx="7"/>
    <rect x="394" y="184" width="4" height="26" rx="2" style="fill:var(--color-error)"/>
    <text class="f-lbl-y" x="460" y="202" style="font-size:12px">ABORTED</text>
    <line class="f-arr" x1="342" y1="197" x2="388" y2="197" marker-end="url(#a-txn)"/>
    <text class="f-lbl" x="600" y="192" style="font-size:10.5px">rolled back —</text>
    <text class="f-lbl" x="600" y="206" style="font-size:10.5px">as if it never ran</text>
  </g>
  <text class="f-lbl" x="350" y="66" style="font-size:11px">Only ONE of the two bottom-right boxes can be reached, and which one is decided the moment something goes wrong.</text>
</svg>`,
  steps: [
    { show: '#tx-1', focus: '#tx-1',
      en: 'ACTIVE — the transaction has started and its statements are running.',
      ne: 'ACTIVE — ट्रान्ज्याक्सन सुरु भयो र यसका कथन चलिरहेका छन्।' },
    { show: '#tx-2', focus: '#tx-2',
      en: 'PARTIALLY COMMITTED — the last statement has run, but the changes are not yet safely on disk.',
      ne: 'PARTIALLY COMMITTED — अन्तिम कथन चल्यो, तर परिवर्तन अझै डिस्कमा सुरक्षित छैन।' },
    { show: '#tx-3', focus: '#tx-3',
      en: 'COMMITTED — the changes are permanent. This is the only state that keeps the work, and durability is the promise that a crash now cannot undo it.',
      ne: 'COMMITTED — परिवर्तन स्थायी भयो। काम बाँच्ने एउटै अवस्था यही हो, र अब crash भए पनि नहराओस् भन्ने वचन नै durability हो।' },
    { show: '#tx-4', focus: '#tx-4',
      en: 'FAILED — something went wrong, at any point. A transaction can fail from ACTIVE or from PARTIALLY COMMITTED.',
      ne: 'FAILED — जुनसुकै बेला केही बिग्रियो। ACTIVE वा PARTIALLY COMMITTED दुवैबाट असफल हुन सक्छ।' },
    { show: '#tx-5', focus: '#tx-5',
      en: 'ABORTED — the database rolls back every change the transaction made, so it is as if it never ran. That is atomicity doing its job.',
      ne: 'ABORTED — डाटाबेसले ट्रान्ज्याक्सनले गरेका सबै परिवर्तन फिर्ता लैजान्छ, चलेकै थिएन जस्तो। atomicity ले गर्ने काम यही हो।' }
  ]
};

/* ---------------------------------------------------------------
   DBMS UNIT 7 — BACKUP, RECOVERY AND SECURITY
   --------------------------------------------------------------- */

D.backupTypes = `
<svg viewBox="0 0 700 242" role="img" aria-labelledby="t-backup">
  <title id="t-backup">Types and methods of database backup: physical and logical, full, incremental and differential</title>
  <text class="f-ttl" x="10" y="20">BACKUP — two TYPES, three METHODS</text>
  <text class="f-lbl-y" x="175" y="44" style="font-size:12px">TYPES — what is copied</text>
  <text class="f-lbl-y" x="520" y="44" style="font-size:12px">METHODS — how much is copied</text>

  <g>
    <rect class="f-box-d" x="16" y="56" width="332" height="40" rx="7"/>
    <rect x="18" y="64" width="4" height="24" rx="2" style="fill:var(--color-secondary)"/>
    <text class="f-lbl-y" x="36" y="74" text-anchor="start" style="font-size:11.5px">PHYSICAL</text>
    <text class="f-lbl" x="36" y="88" text-anchor="start" style="font-size:10.5px">a copy of the actual database files on disk</text>
  </g>
  <g>
    <rect class="f-box-d" x="16" y="104" width="332" height="40" rx="7"/>
    <rect x="18" y="112" width="4" height="24" rx="2" style="fill:var(--color-secondary)"/>
    <text class="f-lbl-y" x="36" y="122" text-anchor="start" style="font-size:11.5px">LOGICAL</text>
    <text class="f-lbl" x="36" y="136" text-anchor="start" style="font-size:10.5px">a copy of the SQL that would rebuild it</text>
  </g>

${[
  ['FULL', 'everything, every time — slow but simple'],
  ['INCREMENTAL', 'only what changed since the LAST backup'],
  ['DIFFERENTIAL', 'everything changed since the last FULL backup']
].map(function (r, i){
  const y = 56 + i * 44;
  return `<g>
    <rect class="f-box-d" x="356" y="${y}" width="328" height="38" rx="7"/>
    <rect x="358" y="${y + 7}" width="4" height="24" rx="2" style="fill:var(--color-primary)"/>
    <text class="f-lbl-y" x="376" y="${y + 15}" text-anchor="start" style="font-size:11.5px">${r[0]}</text>
    <text class="f-lbl" x="376" y="${y + 31}" text-anchor="start" style="font-size:10.5px">${r[1]}</text>
  </g>`;
}).join('')}

  <text class="f-lbl-y" x="350" y="212">Incremental and differential differ on ONE word: since the last BACKUP, or since the last FULL backup.</text>
  <text class="f-lbl" x="350" y="230" style="font-size:11px">That one word is the whole exam question.</text>
</svg>`;

/* 7.5 — redo and undo. ANIMATED, because they run in opposite
   directions on the same log, and direction is exactly what a static
   picture cannot show. */
D.recoveryLog = {
  type: 'animated',
  intro: { en: 'The log, and the two directions recovery runs in.',
           ne: 'लग, र रिकभरी चल्ने दुई दिशा।' },
  svg: `
<svg viewBox="0 0 700 250" role="img" aria-labelledby="t-recov">
  <title id="t-recov">Database recovery using the log: redo reapplies committed transactions, undo rolls back uncommitted ones</title>
  ${ah('a-recov')}
  <text class="f-ttl" x="10" y="20">RECOVERY — one log, read in two directions</text>

  <g id="rc-1">
    <text class="f-lbl-y" x="80" y="52" style="font-size:11px">THE LOG</text>
    ${['T1 start', 'T1 write', 'T1 COMMIT', 'T2 start', 'T2 write', '— CRASH —'].map(function (e, i){
      const y = 62 + i * 26;
      return `<g>
        <rect class="f-box-d" x="16" y="${y}" width="240" height="22" rx="5"/>
        <rect x="18" y="${y + 4}" width="4" height="14" rx="2" style="fill:var(${i === 2 ? '--color-success' : i === 5 ? '--color-error' : '--color-border-strong'})"/>
        <text class="f-code" x="34" y="${y + 15}" text-anchor="start" style="font-size:11px">${e}</text>
      </g>`;
    }).join('')}
  </g>

  <g id="rc-2">
    <rect class="f-box-d" x="300" y="70" width="384" height="62" rx="7"/>
    <rect x="302" y="80" width="4" height="42" rx="2" style="fill:var(--color-success)"/>
    <text class="f-lbl-y" x="320" y="92" text-anchor="start" style="font-size:12px">REDO — forwards</text>
    <text class="f-lbl" x="320" y="110" text-anchor="start" style="font-size:11px">T1 committed before the crash, so its work must exist.</text>
    <text class="f-lbl" x="320" y="124" text-anchor="start" style="font-size:11px">Replay it from the log. This is DURABILITY.</text>
  </g>

  <g id="rc-3">
    <rect class="f-box-d" x="300" y="148" width="384" height="62" rx="7"/>
    <rect x="302" y="158" width="4" height="42" rx="2" style="fill:var(--color-error)"/>
    <text class="f-lbl-y" x="320" y="170" text-anchor="start" style="font-size:12px">UNDO — backwards</text>
    <text class="f-lbl" x="320" y="188" text-anchor="start" style="font-size:11px">T2 never committed, so its half-done work must vanish.</text>
    <text class="f-lbl" x="320" y="202" text-anchor="start" style="font-size:11px">Roll it back from the log. This is ATOMICITY.</text>
  </g>

  <text class="f-lbl-y" x="350" y="238">The COMMIT record decides which of the two a transaction gets. Nothing else does.</text>
</svg>`,
  steps: [
    { show: '#rc-1', focus: '#rc-1',
      en: 'The log records every action in order. T1 committed; T2 had written but not committed when the crash came.',
      ne: 'लगले हरेक काम क्रमैसँग लेख्छ। T1 commit भयो; T2 ले लेखेको थियो तर commit हुनुअघि नै crash भयो।' },
    { show: '#rc-2', focus: '#rc-2',
      en: 'REDO reads forwards and replays every transaction that has a COMMIT record. T1 promised durability, so its work is put back.',
      ne: 'REDO ले अगाडि पढ्दै COMMIT भएका सबै ट्रान्ज्याक्सन फेरि चलाउँछ। T1 ले durability को वचन दिएको थियो, त्यसैले काम फर्किन्छ।' },
    { show: '#rc-3', focus: '#rc-3',
      en: 'UNDO reads backwards and rolls back every transaction with no COMMIT record. T2 is erased completely — atomicity means half of it may not survive.',
      ne: 'UNDO ले पछाडि पढ्दै COMMIT नभएका सबै फिर्ता लैजान्छ। T2 पूरै मेटिन्छ — atomicity को अर्थ आधा काम बाँच्न पाउँदैन भन्ने हो।' }
  ]
};


/* ---------------------------------------------------------------
   PHASE 4.5 — figures for two concepts that had only prose
   --------------------------------------------------------------- */

/* u5 5.1 — inheritance introduced by 417 words with no figure. The unit
   states in a callout that a derived class does NOT get everything, and
   never draws it. That omission IS the misconception: students answer
   "the child gets all the members of the parent". So the figure is
   built around the line the private member cannot cross. */
D.inheritWhat = `
<svg viewBox="0 0 700 300" role="img" aria-labelledby="t-inhwhat">
  <title id="t-inhwhat">What a derived class inherits from its base class, and what it does not: public and protected members are reachable, private members exist in the object but cannot be used by the derived class</title>
  ${ah('a-inhwhat')}
  <text class="f-ttl" x="10" y="20">WHAT IS INHERITED — and the one thing that is not</text>

  <!-- base class -->
  <rect class="f-box-d" x="30" y="46" width="270" height="156" rx="8"/>
  <text class="f-lbl-y" x="165" y="68" style="font-size:13px">BASE CLASS — Animal</text>

  <rect class="f-box-g" x="46" y="80" width="238" height="30" rx="5"/>
  <text class="f-code" x="60" y="100" text-anchor="start" style="font-size:12px">public:    eat()</text>
  <text class="f-lbl" x="272" y="100" text-anchor="end" style="font-size:10.5px">inherited</text>

  <rect class="f-box-g" x="46" y="116" width="238" height="30" rx="5"/>
  <text class="f-code" x="60" y="136" text-anchor="start" style="font-size:12px">protected: age</text>
  <text class="f-lbl" x="272" y="136" text-anchor="end" style="font-size:10.5px">inherited</text>

  <rect class="f-box-d" x="46" y="152" width="238" height="30" rx="5"
        style="stroke:var(--color-error);stroke-dasharray:4 3"/>
  <text class="f-code" x="60" y="172" text-anchor="start" style="font-size:12px;fill:var(--color-error)">private:   secret</text>
  <text class="f-lbl" x="272" y="172" text-anchor="end" style="font-size:10.5px;fill:var(--color-error)">NOT usable</text>

  <!-- two arrows through, one blocked -->
  <line class="f-arr" x1="304" y1="95" x2="392" y2="95" marker-end="url(#a-inhwhat)"/>
  <line class="f-arr" x1="304" y1="131" x2="392" y2="131" marker-end="url(#a-inhwhat)"/>
  <line x1="304" y1="167" x2="360" y2="167"
        style="stroke:var(--color-error);stroke-width:2;stroke-dasharray:5 4"/>
  <line x1="352" y1="159" x2="368" y2="175" style="stroke:var(--color-error);stroke-width:2.5"/>
  <line x1="368" y1="159" x2="352" y2="175" style="stroke:var(--color-error);stroke-width:2.5"/>

  <!-- derived class -->
  <rect class="f-box-d" x="396" y="46" width="270" height="156" rx="8"/>
  <text class="f-lbl-y" x="531" y="68" style="font-size:13px">DERIVED CLASS — Dog</text>

  <rect class="f-box-g" x="412" y="80" width="238" height="30" rx="5"/>
  <text class="f-code" x="426" y="100" text-anchor="start" style="font-size:12px">eat()      — reused</text>

  <rect class="f-box-g" x="412" y="116" width="238" height="30" rx="5"/>
  <text class="f-code" x="426" y="136" text-anchor="start" style="font-size:12px">age        — reused</text>

  <rect class="f-box-g" x="412" y="152" width="238" height="30" rx="5"
        style="stroke:var(--color-secondary)"/>
  <text class="f-code" x="426" y="172" text-anchor="start" style="font-size:12px;fill:var(--color-secondary)">bark()     — its own</text>

  <text class="f-lbl-y" x="350" y="228">The private member still EXISTS inside every Dog object. The derived class simply cannot reach it directly.</text>
  <text class="f-lbl" x="350" y="252" style="font-size:11.5px">That is the whole difference between private and protected — and the only reason protected exists.</text>
  <text class="f-code" x="350" y="278" style="font-size:12px" text-anchor="middle">Dog IS-A Animal  ·  if you cannot say "IS-A", inheritance is the wrong tool</text>
</svg>`;

/* dd-u5 5.9 — the flag register is examinable as a drawing and was
   described only in prose. Five flags in one 8-bit register, with the
   three bits that are not used, because "why are there only five" is
   the question a student asks and the prose did not answer. */
D.flagRegister = `
<svg viewBox="0 0 700 258" role="img" aria-labelledby="t-flagreg">
  <title id="t-flagreg">The 8085 flag register: five flags — sign, zero, auxiliary carry, parity and carry — held in an eight bit register with three unused bits</title>
  <text class="f-ttl" x="10" y="20">THE 8085 FLAG REGISTER — five flags in eight bits</text>

${[
  ['S',  'D7', 'Sign',      '1 if the result is negative',        '--color-primary'],
  ['Z',  'D6', 'Zero',      '1 if the result is exactly zero',    '--color-success'],
  ['',   'D5', '—',         'not used',                            ''],
  ['AC', 'D4', 'Aux Carry', 'carry out of bit 3, used by DAA',    '--color-secondary'],
  ['',   'D3', '—',         'not used',                            ''],
  ['P',  'D2', 'Parity',    '1 if the result has an EVEN number of 1s', '--color-primary'],
  ['',   'D1', '—',         'not used',                            ''],
  ['CY', 'D0', 'Carry',     '1 if the result carried out of bit 7', '--color-error']
].map(function (f, i){
  const x = 16 + i * 84;
  const used = !!f[0];
  return `<g>
    <rect class="${used ? 'f-box-g' : 'f-box-d'}" x="${x}" y="40" width="76" height="54" rx="6"
          ${used ? '' : 'style="opacity:.5;stroke-dasharray:4 3"'}/>
    <text class="f-lbl-y" x="${x + 38}" y="66" style="font-size:15px${used ? ';fill:var(' + f[4] + ')' : ';opacity:.5'}">${f[0] || '·'}</text>
    <text class="f-lbl" x="${x + 38}" y="85" style="font-size:10.5px${used ? '' : ';opacity:.5'}">${f[1]}</text>
  </g>`;
}).join('')}

  <text class="f-lbl" x="350" y="112" style="font-size:11px">D7 is the most significant bit, D0 the least — the same order you write any 8-bit number in</text>

${[
  ['S — Sign',       'set to 1 when the result is negative (D7 of the result is 1)'],
  ['Z — Zero',       'set to 1 when the result is exactly 00H'],
  ['AC — Aux Carry', 'set when a carry leaves bit 3 — used only by the DAA instruction'],
  ['P — Parity',     'set to 1 when the result contains an EVEN number of 1s'],
  ['CY — Carry',     'set when the result carries out of bit 7, or borrows into it']
].map(function (r, i){
  const y = 130 + i * 22;
  return `<g>
    <text class="f-lbl-y" x="30" y="${y}" text-anchor="start" style="font-size:11.5px">${r[0]}</text>
    <text class="f-lbl" x="176" y="${y}" text-anchor="start" style="font-size:11px">${r[1]}</text>
  </g>`;
}).join('')}

  <text class="f-lbl-y" x="350" y="248">Three bits are unused. A flag is SET by the result of the last arithmetic or logic instruction — not by a data transfer.</text>
</svg>`;

/* ===============================================================
   HARDWARE & REPAIR — UNIT 1: ELECTRONIC DEVICES
   =============================================================== */

/* Matter → molecule → atom → subatomic particles. A ladder, because
   the exam question is "define matter, molecule and atom" and the
   marks are in getting the containment order right. */
D.hwMatter = `
<svg viewBox="0 0 700 240" role="img" aria-labelledby="t-hwmatter">
  <title id="t-hwmatter">Matter is made of molecules, a molecule is made of atoms, and an atom contains protons and neutrons in a nucleus with electrons in shells around it</title>
  ${ah('a-hwmatter')}
  <text class="f-ttl" x="10" y="20">FROM MATTER DOWN TO THE ELECTRON — each one is inside the one before</text>

  <rect class="f-box" x="16" y="36" width="150" height="74" rx="8"/>
  <text class="f-val" x="91" y="62">MATTER</text>
  <text class="f-lbl" x="91" y="80">anything with mass</text>
  <text class="f-lbl" x="91" y="95">and volume</text>

  <path class="f-arr" d="M170 73 L200 73" marker-end="url(#a-hwmatter)"/>

  <rect class="f-box" x="204" y="36" width="150" height="74" rx="8"/>
  <text class="f-val" x="279" y="62">MOLECULE</text>
  <text class="f-lbl" x="279" y="80">smallest part that</text>
  <text class="f-lbl" x="279" y="95">still is that substance</text>

  <path class="f-arr" d="M358 73 L388 73" marker-end="url(#a-hwmatter)"/>

  <rect class="f-box-y" x="392" y="36" width="150" height="74" rx="8"/>
  <text class="f-val" x="467" y="62">ATOM</text>
  <text class="f-lbl" x="467" y="80">smallest part of an</text>
  <text class="f-lbl" x="467" y="95">element</text>

  <path class="f-arr" d="M546 73 L576 73" marker-end="url(#a-hwmatter)"/>

  <rect class="f-box-g" x="580" y="36" width="104" height="74" rx="8"/>
  <text class="f-val" x="632" y="62">PARTICLES</text>
  <text class="f-lbl" x="632" y="80">proton, neutron,</text>
  <text class="f-lbl" x="632" y="95">electron</text>

  <text class="f-ttl" x="10" y="146">INSIDE THE ATOM</text>

  <circle cx="150" cy="186" r="46" class="f-box-d"/>
  <circle cx="150" cy="186" r="26" class="f-box-d"/>
  <circle cx="150" cy="186" r="11" style="fill:rgba(255,143,122,.35);stroke:var(--color-error);stroke-width:1.4"/>
  <text class="f-lbl-y" x="150" y="190" style="font-size:9px">p n</text>
  <circle cx="176" cy="186" r="4.5" style="fill:var(--color-secondary)"/>
  <circle cx="150" cy="140" r="4.5" style="fill:var(--color-secondary)"/>
  <circle cx="112" cy="210" r="4.5" style="fill:var(--color-secondary)"/>

  <text class="f-lbl-y" x="150" y="235">atom</text>

  <rect class="f-box-d" x="232" y="152" width="452" height="70" rx="8"/>
  <circle cx="256" cy="172" r="5" style="fill:var(--color-error)"/>
  <text class="f-lbl" x="356" y="176" text-anchor="start">PROTON — positive charge, sits in the nucleus</text>
  <circle cx="256" cy="192" r="5" style="fill:var(--color-text-muted)"/>
  <text class="f-lbl" x="356" y="196" text-anchor="start">NEUTRON — no charge, sits in the nucleus</text>
  <circle cx="256" cy="212" r="5" style="fill:var(--color-secondary)"/>
  <text class="f-lbl" x="356" y="216" text-anchor="start">ELECTRON — negative charge, orbits in shells</text>
</svg>`;

/* KCL at a node and KVL round a loop, side by side with real numbers
   already filled in — the two laws are only ever asked as "state and
   apply", and applying them is arithmetic once the sign rule is right. */
D.hwKirchhoff = `
<svg viewBox="0 0 700 250" role="img" aria-labelledby="t-hwkcl">
  <title id="t-hwkcl">Kirchhoff's current law at a junction: current in equals current out. Kirchhoff's voltage law around a loop: the supply voltage equals the sum of the voltage drops</title>
  ${ah('a-hwkcl')}
  <text class="f-ttl" x="10" y="20">KCL — AT A JUNCTION</text>

  <path class="f-arr" d="M30 96 L120 96" marker-end="url(#a-hwkcl)"/>
  <text class="f-lbl-y" x="72" y="86">I₁ = 5A</text>
  <path class="f-arr" d="M30 150 L120 122" marker-end="url(#a-hwkcl)"/>
  <text class="f-lbl-y" x="66" y="152">I₂ = 3A</text>

  <circle cx="126" cy="108" r="6" style="fill:var(--color-primary)"/>
  <text class="f-lbl" x="126" y="132">node</text>

  <path class="f-arr" d="M134 100 L226 76" marker-end="url(#a-hwkcl)"/>
  <text class="f-lbl-y" x="188" y="66">I₃ = 6A</text>
  <path class="f-arr" d="M134 116 L226 140" marker-end="url(#a-hwkcl)"/>
  <text class="f-lbl-y" x="192" y="158">I₄ = ?</text>

  <rect class="f-box-g" x="24" y="182" width="300" height="52" rx="8"/>
  <text class="f-lbl" x="174" y="203">IN = OUT  →  5 + 3 = 6 + I₄</text>
  <text class="f-lbl-y" x="174" y="221">I₄ = 2 A</text>

  <line class="f-ln" x1="350" y1="30" x2="350" y2="240"/>

  <text class="f-ttl" x="378" y="20">KVL — ROUND A LOOP</text>

  <rect class="f-box-d" x="392" y="46" width="268" height="112" rx="6"/>
  <rect class="f-box-y" x="378" y="86" width="28" height="34" rx="4"/>
  <text class="f-lbl-y" x="392" y="107" style="font-size:9px">12V</text>
  <text class="f-lbl" x="392" y="136">supply</text>

  <rect class="f-box" x="452" y="32" width="60" height="26" rx="4"/>
  <text class="f-lbl" x="482" y="49">R₁ 5V</text>
  <rect class="f-box" x="556" y="32" width="60" height="26" rx="4"/>
  <text class="f-lbl" x="586" y="49">R₂ 4V</text>
  <rect class="f-box" x="504" y="146" width="60" height="26" rx="4"/>
  <text class="f-lbl" x="534" y="163">R₃ ?</text>

  <rect class="f-box-g" x="376" y="182" width="300" height="52" rx="8"/>
  <text class="f-lbl" x="526" y="203">SUPPLY = SUM OF DROPS  →  12 = 5 + 4 + R₃</text>
  <text class="f-lbl-y" x="526" y="221">R₃ drops 3 V</text>
</svg>`;

/* Intrinsic, N-type and P-type lattices side by side. The whole point
   of the picture is that all three are electrically NEUTRAL — the
   misconception this unit has to kill. */
D.hwDoping = `
<svg viewBox="0 0 700 250" role="img" aria-labelledby="t-hwdope">
  <title id="t-hwdope">Pure silicon has four valence electrons. Adding a pentavalent impurity gives a spare electron and makes N-type. Adding a trivalent impurity gives a hole and makes P-type. All three are electrically neutral</title>
  <text class="f-ttl" x="10" y="20">DOPING — ADDING AN IMPURITY ON PURPOSE</text>

  <rect class="f-box-d" x="16" y="32" width="212" height="150" rx="8"/>
  <text class="f-lbl-y" x="122" y="52">PURE (INTRINSIC) SILICON</text>
  <circle cx="80" cy="96" r="15" class="f-box"/><text class="f-lbl" x="80" y="100" style="font-size:9px">Si</text>
  <circle cx="164" cy="96" r="15" class="f-box"/><text class="f-lbl" x="164" y="100" style="font-size:9px">Si</text>
  <circle cx="80" cy="146" r="15" class="f-box"/><text class="f-lbl" x="80" y="150" style="font-size:9px">Si</text>
  <circle cx="164" cy="146" r="15" class="f-box"/><text class="f-lbl" x="164" y="150" style="font-size:9px">Si</text>
  <line class="f-ln" x1="95" y1="96" x2="149" y2="96"/>
  <line class="f-ln" x1="95" y1="146" x2="149" y2="146"/>
  <line class="f-ln" x1="80" y1="111" x2="80" y2="131"/>
  <line class="f-ln" x1="164" y1="111" x2="164" y2="131"/>
  <text class="f-lbl" x="122" y="174">4 valence electrons, all shared</text>

  <rect class="f-box-g" x="242" y="32" width="212" height="150" rx="8"/>
  <text class="f-lbl-y" x="348" y="52">N-TYPE — pentavalent added</text>
  <circle cx="306" cy="96" r="15" class="f-box"/><text class="f-lbl" x="306" y="100" style="font-size:9px">Si</text>
  <circle cx="390" cy="96" r="15" style="fill:rgba(154,230,160,.3);stroke:var(--color-success);stroke-width:1.6"/>
  <text class="f-lbl" x="390" y="100" style="font-size:9px">P</text>
  <circle cx="306" cy="146" r="15" class="f-box"/><text class="f-lbl" x="306" y="150" style="font-size:9px">Si</text>
  <circle cx="390" cy="146" r="15" class="f-box"/><text class="f-lbl" x="390" y="150" style="font-size:9px">Si</text>
  <line class="f-ln" x1="321" y1="96" x2="375" y2="96"/>
  <line class="f-ln" x1="321" y1="146" x2="375" y2="146"/>
  <circle cx="414" cy="76" r="5" style="fill:var(--color-secondary)"/>
  <text class="f-lbl" x="348" y="174">spare ELECTRON — majority carrier</text>

  <rect class="f-box-c" x="468" y="32" width="216" height="150" rx="8"/>
  <text class="f-lbl-y" x="576" y="52">P-TYPE — trivalent added</text>
  <circle cx="534" cy="96" r="15" class="f-box"/><text class="f-lbl" x="534" y="100" style="font-size:9px">Si</text>
  <circle cx="618" cy="96" r="15" style="fill:rgba(255,143,122,.3);stroke:var(--color-error);stroke-width:1.6"/>
  <text class="f-lbl" x="618" y="100" style="font-size:9px">B</text>
  <circle cx="534" cy="146" r="15" class="f-box"/><text class="f-lbl" x="534" y="150" style="font-size:9px">Si</text>
  <circle cx="618" cy="146" r="15" class="f-box"/><text class="f-lbl" x="618" y="150" style="font-size:9px">Si</text>
  <line class="f-ln" x1="549" y1="96" x2="603" y2="96"/>
  <line class="f-ln" x1="549" y1="146" x2="603" y2="146"/>
  <circle cx="642" cy="76" r="5.5" style="fill:none;stroke:var(--color-error);stroke-width:1.6"/>
  <text class="f-lbl" x="576" y="174">missing electron = HOLE — majority carrier</text>

  <rect class="f-box-y" x="16" y="196" width="668" height="42" rx="8"/>
  <text class="f-lbl-y" x="350" y="213">ALL THREE ARE ELECTRICALLY NEUTRAL</text>
  <text class="f-lbl" x="350" y="230">Doping adds a carrier, not a charge — the impurity atom brings its own protons with it</text>
</svg>`;

/* THE ONE UNIT-1 CONCEPT THAT EARNS ANIMATION.
   A PN junction is not a static object — the depletion region is a
   width that CHANGES, and forward vs reverse bias is the same picture
   with that width moving in opposite directions. A student who has seen
   it narrow and widen can answer "why does a diode conduct one way"
   without memorising a sentence; a pair of still pictures cannot show
   that the two cases are the same mechanism. */
D.hwPnJunction = {
  type: 'animated',
  intro: { en: 'A PN junction forming, then the same junction under forward and reverse bias.',
           ne: 'PN junction बन्ने क्रम, अनि उही junction लाई forward र reverse bias मा।' },
  svg: `
<svg viewBox="0 0 700 260" role="img" aria-labelledby="t-hwpn">
  <title id="t-hwpn">A P-type and an N-type block joined to form a PN junction, the depletion region that appears at the join, and how forward bias narrows it while reverse bias widens it</title>
  ${ah('a-hwpn')}
  <text class="f-ttl" x="10" y="20">THE PN JUNCTION</text>

  <g id="pn-p">
    <rect class="f-box-c" x="120" y="60" width="180" height="86" rx="6"/>
    <text class="f-lbl-y" x="210" y="82">P-TYPE</text>
    <circle cx="160" cy="106" r="5.5" style="fill:none;stroke:var(--color-error);stroke-width:1.5"/>
    <circle cx="196" cy="122" r="5.5" style="fill:none;stroke:var(--color-error);stroke-width:1.5"/>
    <circle cx="232" cy="102" r="5.5" style="fill:none;stroke:var(--color-error);stroke-width:1.5"/>
    <circle cx="266" cy="126" r="5.5" style="fill:none;stroke:var(--color-error);stroke-width:1.5"/>
    <text class="f-lbl" x="210" y="162">holes are the majority carrier</text>
  </g>

  <g id="pn-n">
    <rect class="f-box-g" x="400" y="60" width="180" height="86" rx="6"/>
    <text class="f-lbl-y" x="490" y="82">N-TYPE</text>
    <circle cx="434" cy="106" r="5" style="fill:var(--color-secondary)"/>
    <circle cx="470" cy="124" r="5" style="fill:var(--color-secondary)"/>
    <circle cx="508" cy="102" r="5" style="fill:var(--color-secondary)"/>
    <circle cx="546" cy="126" r="5" style="fill:var(--color-secondary)"/>
    <text class="f-lbl" x="490" y="162">free electrons are the majority carrier</text>
  </g>

  <g id="pn-dep">
    <rect x="300" y="60" width="100" height="86" style="fill:rgba(255,215,110,.16);stroke:var(--color-primary);stroke-width:1.4;stroke-dasharray:4 3"/>
    <text class="f-lbl-y" x="350" y="46" style="font-size:10.5px">DEPLETION REGION</text>
    <text class="f-lbl" x="350" y="180">no free carriers left here</text>
  </g>

  <g id="pn-barrier">
    <text class="f-lbl-y" x="350" y="106" style="font-size:11px">barrier</text>
    <text class="f-lbl-y" x="350" y="122" style="font-size:11px">0.7 V</text>
    <text class="f-lbl" x="350" y="200">no current flows on its own</text>
  </g>

  <g id="pn-fwd">
    <rect class="f-box-y" x="316" y="66" width="68" height="74" style="fill:rgba(255,215,110,.16)"/>
    <rect class="f-box-g" x="20" y="212" width="660" height="38" rx="7"/>
    <text class="f-lbl-y" x="350" y="228">FORWARD BIAS — P to +, N to −</text>
    <text class="f-lbl" x="350" y="243">the depletion region NARROWS, the barrier is overcome, and current flows</text>
    <path class="f-arr" d="M120 190 L580 190" marker-end="url(#a-hwpn)"/>
  </g>

  <g id="pn-rev">
    <rect x="286" y="60" width="128" height="86" style="fill:rgba(255,143,122,.14);stroke:var(--color-error);stroke-width:1.4;stroke-dasharray:4 3"/>
    <rect class="f-box-c" x="20" y="212" width="660" height="38" rx="7"/>
    <text class="f-lbl-y" x="350" y="228">REVERSE BIAS — P to −, N to +</text>
    <text class="f-lbl" x="350" y="243">the depletion region WIDENS, the barrier grows, and current stops</text>
  </g>
</svg>`,
  steps: [
    { show: '#pn-p', focus: '#pn-p',
      en: 'Start apart. The P-type block has holes as its majority carrier — and it is electrically neutral.',
      ne: 'छुट्टै सुरु गरौं। P-type खण्डको बहुसंख्यक वाहक hole हो — र यो विद्युतीय रूपमा उदासीन छ।' },
    { show: '#pn-n', focus: '#pn-n',
      en: 'The N-type block has free electrons as its majority carrier, and it is neutral too.',
      ne: 'N-type खण्डको बहुसंख्यक वाहक स्वतन्त्र electron हो, र यो पनि उदासीन छ।' },
    { show: '#pn-dep', focus: '#pn-dep',
      en: 'Join them. Electrons cross over and fill holes near the join, so that strip is left with no free carriers — the depletion region.',
      ne: 'जोड्नुहोस्। Electron पारि गएर जोडनेर का hole भर्छन्, त्यसैले त्यो पट्टीमा स्वतन्त्र वाहक बाँकी रहँदैन — यही depletion region हो।' },
    { show: '#pn-barrier', focus: '#pn-barrier',
      en: 'The exposed ions set up a barrier potential — about 0.7 V in silicon. It stops further crossing, so no current flows by itself.',
      ne: 'खुला भएका ion ले barrier potential बनाउँछन् — silicon मा करिब ०.७ V। यसले थप पार गर्न रोक्छ, त्यसैले आफैँ कुनै current बग्दैन।' },
    { show: '#pn-fwd', hide: '#pn-rev', focus: '#pn-fwd',
      en: 'FORWARD BIAS: P to positive, N to negative. The supply pushes carriers toward the join, the depletion region narrows, and above 0.7 V current flows.',
      ne: 'FORWARD BIAS: P मा धनात्मक, N मा ऋणात्मक। सप्लाईले वाहकलाई जोडतिर धकेल्छ, depletion region साँघुरो हुन्छ, र ०.७ V माथि current बग्छ।' },
    { show: '#pn-rev', hide: '#pn-fwd', focus: '#pn-rev',
      en: 'REVERSE BIAS: the connections swap. Carriers are pulled AWAY from the join, the depletion region widens, the barrier grows — and current stops. Same mechanism, opposite direction.',
      ne: 'REVERSE BIAS: जडान उल्टिन्छ। वाहकहरू जोडबाट टाढा तानिन्छन्, depletion region चौडा हुन्छ, barrier बढ्छ — र current रोकिन्छ। उही प्रक्रिया, उल्टो दिशा।' }
  ]
};

/* ===============================================================
   HARDWARE — UNITS 2 AND 3
   The ids on the groups below (su-*, mb-*) are the highlight targets
   sim-parts.js drives. Renaming one silently breaks the parts lab,
   which is why that component refuses to mount if a target is gone
   rather than quietly dropping a button.
   =============================================================== */

D.hwSystemUnits = `
<svg viewBox="0 0 700 250" role="img" aria-labelledby="t-hwsys">
  <title id="t-hwsys">The units of a computer system: an input unit feeds the CPU, which contains the control unit, the arithmetic and logic unit and memory, and the CPU feeds the output unit</title>
  ${ah('a-hwsys')}
  <text class="f-ttl" x="10" y="20">THE UNITS OF A COMPUTER SYSTEM</text>

  <g id="su-in">
    <rect class="f-box" x="16" y="92" width="112" height="66" rx="8"/>
    <text class="f-val" x="72" y="118" style="font-size:13px">INPUT</text>
    <text class="f-lbl" x="72" y="136" style="font-size:10px">keyboard, mouse,</text>
    <text class="f-lbl" x="72" y="149" style="font-size:10px">scanner, camera</text>
  </g>

  <path class="f-arr" d="M132 125 L166 125" marker-end="url(#a-hwsys)"/>

  <rect class="f-box-d" x="172" y="46" width="356" height="164" rx="10"/>
  <text class="f-lbl-y" x="350" y="66">CPU — CENTRAL PROCESSING UNIT</text>

  <g id="su-cu">
    <rect class="f-box-y" x="190" y="78" width="150" height="52" rx="7"/>
    <text class="f-val" x="265" y="100" style="font-size:12px">CONTROL UNIT</text>
    <text class="f-lbl" x="265" y="118" style="font-size:10px">fetch, decode, direct</text>
  </g>

  <g id="su-alu">
    <rect class="f-box-y" x="360" y="78" width="150" height="52" rx="7"/>
    <text class="f-val" x="435" y="100" style="font-size:12px">ALU</text>
    <text class="f-lbl" x="435" y="118" style="font-size:10px">calculate and compare</text>
  </g>

  <g id="su-mem">
    <rect class="f-box-g" x="190" y="144" width="320" height="50" rx="7"/>
    <text class="f-val" x="350" y="166" style="font-size:12px">MEMORY UNIT</text>
    <text class="f-lbl" x="350" y="184" style="font-size:10px">holds what is being worked on, and the result</text>
  </g>

  <line class="f-ln" x1="265" y1="130" x2="265" y2="144"/>
  <line class="f-ln" x1="435" y1="130" x2="435" y2="144"/>

  <path class="f-arr" d="M534 125 L568 125" marker-end="url(#a-hwsys)"/>

  <g id="su-out">
    <rect class="f-box" x="572" y="92" width="112" height="66" rx="8"/>
    <text class="f-val" x="628" y="118" style="font-size:13px">OUTPUT</text>
    <text class="f-lbl" x="628" y="136" style="font-size:10px">monitor, printer,</text>
    <text class="f-lbl" x="628" y="149" style="font-size:10px">speaker</text>
  </g>

  <text class="f-lbl" x="350" y="232">Control unit DIRECTS · ALU CALCULATES — the single most confused pair in this unit</text>
</svg>`;

D.hwDisplayTech = `
<svg viewBox="0 0 700 250" role="img" aria-labelledby="t-hwdisp">
  <title id="t-hwdisp">A comparison of CRT, LCD and LED monitors by how they make light, their size and their power use, with definitions of resolution, colour depth and refresh rate</title>
  <text class="f-ttl" x="10" y="20">THREE DISPLAY TECHNOLOGIES</text>

  <rect class="f-box-c" x="16" y="32" width="212" height="112" rx="8"/>
  <text class="f-lbl-y" x="122" y="52">CRT</text>
  <text class="f-lbl" x="122" y="70" style="font-size:10px">Cathode Ray Tube</text>
  <text class="f-lbl" x="122" y="90" style="font-size:10px">electron gun fires at</text>
  <text class="f-lbl" x="122" y="103" style="font-size:10px">a phosphor screen</text>
  <text class="f-lbl" x="122" y="123" style="font-size:10px">bulky · heavy · hot</text>
  <text class="f-lbl" x="122" y="136" style="font-size:10px">highest power use</text>

  <rect class="f-box" x="242" y="32" width="212" height="112" rx="8"/>
  <text class="f-lbl-y" x="348" y="52">LCD</text>
  <text class="f-lbl" x="348" y="70" style="font-size:10px">Liquid Crystal Display</text>
  <text class="f-lbl" x="348" y="90" style="font-size:10px">crystals block or pass</text>
  <text class="f-lbl" x="348" y="103" style="font-size:10px">light from a CCFL lamp</text>
  <text class="f-lbl" x="348" y="123" style="font-size:10px">flat · light · cool</text>
  <text class="f-lbl" x="348" y="136" style="font-size:10px">much less power</text>

  <rect class="f-box-g" x="468" y="32" width="216" height="112" rx="8"/>
  <text class="f-lbl-y" x="576" y="52">LED</text>
  <text class="f-lbl" x="576" y="70" style="font-size:10px">an LCD, backlit by LEDs</text>
  <text class="f-lbl" x="576" y="90" style="font-size:10px">same crystals — only the</text>
  <text class="f-lbl" x="576" y="103" style="font-size:10px">light source changed</text>
  <text class="f-lbl" x="576" y="123" style="font-size:10px">thinnest · best contrast</text>
  <text class="f-lbl" x="576" y="136" style="font-size:10px">lowest power use</text>

  <rect class="f-box-d" x="16" y="158" width="668" height="80" rx="8"/>
  <text class="f-lbl-y" x="120" y="180">RESOLUTION</text>
  <text class="f-lbl" x="120" y="198" style="font-size:10px">pixels across × down</text>
  <text class="f-lbl" x="120" y="211" style="font-size:10px">1366 × 768</text>
  <text class="f-lbl" x="120" y="228" style="font-size:10px">more pixels = sharper</text>

  <text class="f-lbl-y" x="350" y="180">COLOUR DEPTH</text>
  <text class="f-lbl" x="350" y="198" style="font-size:10px">bits used per pixel</text>
  <text class="f-lbl" x="350" y="211" style="font-size:10px">24-bit = 16.7M colours</text>
  <text class="f-lbl" x="350" y="228" style="font-size:10px">more bits = smoother shades</text>

  <text class="f-lbl-y" x="580" y="180">REFRESH RATE</text>
  <text class="f-lbl" x="580" y="198" style="font-size:10px">redraws per second, in Hz</text>
  <text class="f-lbl" x="580" y="211" style="font-size:10px">60 Hz = 60 times a second</text>
  <text class="f-lbl" x="580" y="228" style="font-size:10px">too low = visible flicker</text>
</svg>`;

D.hwMotherboard = `
<svg viewBox="0 0 700 300" role="img" aria-labelledby="t-hwmb">
  <title id="t-hwmb">A motherboard layout showing the CPU socket, RAM slots, chipset, PCI expansion slots, BIOS chip with CMOS battery, the main power connector and the drive connectors</title>
  <text class="f-ttl" x="10" y="20">A MOTHERBOARD, LAID OUT</text>

  <rect class="f-box-d" x="16" y="30" width="668" height="256" rx="10"/>

  <g id="mb-cpu">
    <rect class="f-box-y" x="60" y="58" width="118" height="88" rx="6"/>
    <rect x="78" y="76" width="82" height="52" rx="4" style="fill:rgba(255,215,110,.22);stroke:var(--color-primary);stroke-width:1.2"/>
    <text class="f-lbl-y" x="119" y="106" style="font-size:11px">CPU</text>
    <text class="f-lbl" x="119" y="122" style="font-size:9px">socket</text>
    <text class="f-lbl" x="119" y="160" style="font-size:9.5px">under the heatsink</text>
  </g>

  <g id="mb-ram">
    <rect class="f-box" x="212" y="52" width="20" height="120" rx="3"/>
    <rect class="f-box" x="240" y="52" width="20" height="120" rx="3"/>
    <rect class="f-box" x="268" y="52" width="20" height="120" rx="3"/>
    <rect class="f-box" x="296" y="52" width="20" height="120" rx="3"/>
    <text class="f-lbl-y" x="264" y="188" style="font-size:10.5px">RAM slots</text>
  </g>

  <g id="mb-chip">
    <rect class="f-box-g" x="352" y="86" width="76" height="66" rx="6"/>
    <text class="f-lbl-y" x="390" y="116" style="font-size:10px">CHIPSET</text>
    <text class="f-lbl" x="390" y="132" style="font-size:9px">traffic</text>
  </g>

  <g id="mb-pci">
    <rect class="f-box" x="60" y="204" width="230" height="16" rx="3"/>
    <rect class="f-box" x="60" y="230" width="230" height="16" rx="3"/>
    <rect class="f-box" x="60" y="256" width="160" height="16" rx="3"/>
    <text class="f-lbl-y" x="175" y="196" style="font-size:10.5px">PCI / expansion slots</text>
  </g>

  <g id="mb-bios">
    <rect class="f-box-c" x="352" y="196" width="70" height="42" rx="5"/>
    <text class="f-lbl-y" x="387" y="216" style="font-size:9.5px">BIOS</text>
    <text class="f-lbl" x="387" y="230" style="font-size:9px">chip</text>
    <circle cx="452" cy="217" r="17" class="f-box-c"/>
    <text class="f-lbl" x="452" y="221" style="font-size:8.5px">CMOS</text>
  </g>

  <g id="mb-pwr">
    <rect class="f-box-y" x="556" y="52" width="110" height="46" rx="5"/>
    <text class="f-lbl-y" x="611" y="72" style="font-size:10px">POWER</text>
    <text class="f-lbl" x="611" y="88" style="font-size:9px">24-pin main</text>
  </g>

  <g id="mb-sata">
    <rect class="f-box" x="556" y="196" width="110" height="20" rx="3"/>
    <rect class="f-box" x="556" y="224" width="110" height="20" rx="3"/>
    <text class="f-lbl-y" x="611" y="264" style="font-size:10px">drive connectors</text>
  </g>

  <line class="f-ln" x1="178" y1="102" x2="212" y2="102"/>
  <line class="f-ln" x1="316" y1="112" x2="352" y2="112"/>
  <line class="f-ln" x1="390" y1="152" x2="390" y2="196"/>
  <line class="f-ln" x1="428" y1="119" x2="556" y2="90"/>
</svg>`;

/* ===============================================================
   HARDWARE — UNITS 3 TO 6
   =============================================================== */

/* A hard disk read is a SEQUENCE with moving parts, and the exam asks
   "explain the operation of a hard disk drive" — which is that
   sequence. Still pictures of a platter teach the vocabulary and not
   the operation, so this one animates. */
D.hwHddRead = {
  type: 'animated',
  intro: { en: 'How a hard disk finds and reads one block of data.',
           ne: 'Hard disk ले data को एउटा ब्लक कसरी खोजेर पढ्छ।' },
  svg: `
<svg viewBox="0 0 700 260" role="img" aria-labelledby="t-hwhdd">
  <title id="t-hwhdd">A hard disk drive with platters, tracks, sectors and a read-write head on an actuator arm, showing seek time, rotational delay and data transfer</title>
  ${ah('a-hwhdd')}
  <text class="f-ttl" x="10" y="20">READING ONE BLOCK FROM A HARD DISK</text>

  <g id="hd-platter">
    <circle cx="200" cy="140" r="96" class="f-box-d"/>
    <circle cx="200" cy="140" r="72" class="f-box-d"/>
    <circle cx="200" cy="140" r="48" class="f-box-d"/>
    <circle cx="200" cy="140" r="12" style="fill:var(--color-text-muted)"/>
    <text class="f-lbl-y" x="200" y="256">PLATTER — spins constantly</text>
  </g>

  <g id="hd-track">
    <circle cx="200" cy="140" r="72" style="fill:none;stroke:var(--color-primary);stroke-width:2.4"/>
    <text class="f-lbl-y" x="330" y="70" style="font-size:10.5px">TRACK — one ring</text>
    <line class="f-ln" x1="256" y1="92" x2="320" y2="76"/>
  </g>

  <g id="hd-sector">
    <path d="M200 140 L268 116 A72 72 0 0 1 262 168 Z"
          style="fill:rgba(255,143,122,.3);stroke:var(--color-error);stroke-width:1.6"/>
    <text class="f-lbl-y" x="340" y="112" style="font-size:10.5px">SECTOR — one slice of a track</text>
    <line class="f-ln" x1="272" y1="140" x2="332" y2="118"/>
  </g>

  <g id="hd-seek">
    <line class="f-arr" x1="430" y1="196" x2="252" y2="150" marker-end="url(#a-hwhdd)"/>
    <rect class="f-box-y" x="428" y="180" width="120" height="34" rx="5"/>
    <text class="f-lbl-y" x="488" y="201" style="font-size:10px">SEEK TIME</text>
    <text class="f-lbl" x="596" y="201" style="font-size:9.5px">arm moves</text>
  </g>

  <g id="hd-rot">
    <rect class="f-box-y" x="428" y="222" width="120" height="34" rx="5"/>
    <text class="f-lbl-y" x="488" y="243" style="font-size:10px">ROTATIONAL DELAY</text>
    <text class="f-lbl" x="608" y="243" style="font-size:9.5px">disk turns</text>
  </g>

  <g id="hd-head">
    <rect class="f-box-g" x="428" y="60" width="180" height="46" rx="6"/>
    <text class="f-lbl-y" x="518" y="80" style="font-size:10.5px">READ / WRITE HEAD</text>
    <text class="f-lbl" x="518" y="96" style="font-size:9.5px">floats on a cushion of air</text>
  </g>

  <g id="hd-xfer">
    <rect class="f-box-g" x="428" y="120" width="240" height="44" rx="6"/>
    <text class="f-lbl-y" x="548" y="140" style="font-size:10.5px">DATA TRANSFER</text>
    <text class="f-lbl" x="548" y="156" style="font-size:9.5px">the block is read into memory</text>
  </g>
</svg>`,
  steps: [
    { show: '#hd-platter', focus: '#hd-platter',
      en: 'The platter is a rigid magnetic disk, and it spins the whole time the drive is powered — typically 5400 or 7200 revolutions per minute.',
      ne: 'Platter एउटा कडा चुम्बकीय डिस्क हो, र ड्राइभमा बिजुली भएसम्म यो निरन्तर घुमिरहन्छ — सामान्यतया मिनेटमा ५४०० वा ७२०० पटक।' },
    { show: '#hd-track', focus: '#hd-track',
      en: 'The surface is divided into concentric rings called TRACKS. The same track on every platter, stacked, is called a cylinder.',
      ne: 'सतहलाई TRACK भनिने केन्द्रित रिङमा बाँडिएको हुन्छ। हरेक platter को उही track माथिमाथि राखिएको समूहलाई cylinder भनिन्छ।' },
    { show: '#hd-sector', focus: '#hd-sector',
      en: 'Each track is cut into SECTORS. A sector is the smallest unit the drive can read or write — traditionally 512 bytes.',
      ne: 'हरेक track लाई SECTOR मा काटिन्छ। ड्राइभले पढ्न वा लेख्न सक्ने सबैभन्दा सानो एकाइ sector हो — परम्परागत रूपमा ५१२ बाइट।' },
    { show: '#hd-head', focus: '#hd-head',
      en: 'The read-write head sits on an actuator arm and floats microns above the surface on a cushion of air. It never touches the platter — if it does, that is a head crash.',
      ne: 'Read-write head actuator arm मा हुन्छ र हावाको तकियामा सतहभन्दा माइक्रोन मात्र माथि तैरिन्छ। यसले platter छुँदैन — छोयो भने त्यो head crash हो।' },
    { show: '#hd-seek', focus: '#hd-seek',
      en: 'SEEK TIME: the arm swings the head to the right track. This is mechanical movement, which is why it is the slowest part of a read.',
      ne: 'SEEK TIME: arm ले head लाई ठीक track मा पुर्‍याउँछ। यो यान्त्रिक चाल हो — त्यसैले पढाइको सबैभन्दा ढिलो भाग यही हो।' },
    { show: '#hd-rot', focus: '#hd-rot',
      en: 'ROTATIONAL DELAY: the head is on the right track but the sector it wants has not come round yet, so it waits for the disk to bring it.',
      ne: 'ROTATIONAL DELAY: head ठीक track मा छ तर चाहिएको sector अझै आइपुगेको छैन, त्यसैले डिस्कले ल्याउन्जेल पर्खिन्छ।' },
    { show: '#hd-xfer', focus: '#hd-xfer',
      en: 'DATA TRANSFER: the sector passes under the head and the block is read into memory. Access time is all three added together — seek, rotation, transfer.',
      ne: 'DATA TRANSFER: sector head मुनिबाट जान्छ र ब्लक मेमोरीमा पढिन्छ। Access time भनेको तीनै वटाको योग हो — seek, rotation, transfer।' }
  ]
};

D.hwPartition = `
<svg viewBox="0 0 700 240" role="img" aria-labelledby="t-hwpart">
  <title id="t-hwpart">One physical hard disk divided into a primary partition and an extended partition holding logical drives, each given a drive letter, and the difference between formatting types</title>
  <text class="f-ttl" x="10" y="20">ONE PHYSICAL DISK, SEVERAL DRIVES</text>

  <rect class="f-box-d" x="16" y="32" width="668" height="72" rx="8"/>
  <text class="f-lbl-y" x="60" y="52" style="font-size:10px">ONE DISK</text>

  <rect class="f-box-y" x="30" y="60" width="180" height="34" rx="5"/>
  <text class="f-lbl-y" x="120" y="82" style="font-size:10px">PRIMARY — C:</text>

  <rect class="f-box" x="222" y="60" width="448" height="34" rx="5"/>
  <text class="f-lbl" x="446" y="82" style="font-size:10px">EXTENDED PARTITION — holds logical drives, gets no letter of its own</text>

  <rect class="f-box-g" x="234" y="112" width="136" height="30" rx="5"/>
  <text class="f-lbl-y" x="302" y="132" style="font-size:10px">LOGICAL — D:</text>
  <rect class="f-box-g" x="382" y="112" width="136" height="30" rx="5"/>
  <text class="f-lbl-y" x="450" y="132" style="font-size:10px">LOGICAL — E:</text>
  <rect class="f-box-g" x="530" y="112" width="136" height="30" rx="5"/>
  <text class="f-lbl-y" x="598" y="132" style="font-size:10px">LOGICAL — F:</text>

  <rect class="f-box-d" x="16" y="158" width="326" height="70" rx="8"/>
  <text class="f-lbl-y" x="179" y="178">PARTITIONING</text>
  <text class="f-lbl" x="179" y="196" style="font-size:10px">dividing one physical disk into</text>
  <text class="f-lbl" x="179" y="210" style="font-size:10px">separate areas the OS sees as</text>
  <text class="f-lbl" x="179" y="222" style="font-size:10px">independent drives</text>

  <rect class="f-box-d" x="358" y="158" width="326" height="70" rx="8"/>
  <text class="f-lbl-y" x="521" y="178">FORMATTING</text>
  <text class="f-lbl" x="521" y="196" style="font-size:10px">writing a file system onto a partition</text>
  <text class="f-lbl" x="521" y="210" style="font-size:10px">QUICK — clears the index only</text>
  <text class="f-lbl" x="521" y="222" style="font-size:10px">FULL — also scans every sector</text>
</svg>`;

D.hwTroubleshootSteps = `
<svg viewBox="0 0 700 260" role="img" aria-labelledby="t-hwts">
  <title id="t-hwts">The six steps of troubleshooting: identify the problem, gather information, form a theory of probable cause, test the theory, apply the fix and verify, then document what was done</title>
  ${ah('a-hwts')}
  <text class="f-ttl" x="10" y="20">THE STEPS OF TROUBLESHOOTING — in this order, every time</text>

  <rect class="f-box-y" x="16" y="36" width="200" height="52" rx="7"/>
  <text class="f-lbl-y" x="116" y="58" style="font-size:11px">1 · IDENTIFY THE PROBLEM</text>
  <text class="f-lbl" x="116" y="76" style="font-size:9.5px">what exactly does it do, and when?</text>

  <path class="f-arr" d="M220 62 L246 62" marker-end="url(#a-hwts)"/>

  <rect class="f-box-y" x="250" y="36" width="200" height="52" rx="7"/>
  <text class="f-lbl-y" x="350" y="58" style="font-size:11px">2 · GATHER INFORMATION</text>
  <text class="f-lbl" x="350" y="76" style="font-size:9.5px">ask the user what changed</text>

  <path class="f-arr" d="M454 62 L480 62" marker-end="url(#a-hwts)"/>

  <rect class="f-box-y" x="484" y="36" width="200" height="52" rx="7"/>
  <text class="f-lbl-y" x="584" y="58" style="font-size:11px">3 · FORM A THEORY</text>
  <text class="f-lbl" x="584" y="76" style="font-size:9.5px">the most probable cause first</text>

  <path class="f-arr" d="M584 92 L584 118" marker-end="url(#a-hwts)"/>

  <rect class="f-box" x="484" y="122" width="200" height="52" rx="7"/>
  <text class="f-lbl-y" x="584" y="144" style="font-size:11px">4 · TEST THE THEORY</text>
  <text class="f-lbl" x="584" y="162" style="font-size:9.5px">one change at a time</text>

  <path class="f-arr" d="M480 148 L454 148" marker-end="url(#a-hwts)"/>

  <rect class="f-box" x="250" y="122" width="200" height="52" rx="7"/>
  <text class="f-lbl-y" x="350" y="144" style="font-size:11px">5 · FIX AND VERIFY</text>
  <text class="f-lbl" x="350" y="162" style="font-size:9.5px">confirm the symptom is gone</text>

  <path class="f-arr" d="M246 148 L220 148" marker-end="url(#a-hwts)"/>

  <rect class="f-box-g" x="16" y="122" width="200" height="52" rx="7"/>
  <text class="f-lbl-y" x="116" y="144" style="font-size:11px">6 · DOCUMENT</text>
  <text class="f-lbl" x="116" y="162" style="font-size:9.5px">what it was, what fixed it</text>

  <rect class="f-box-c" x="16" y="192" width="668" height="52" rx="8"/>
  <text class="f-lbl-y" x="350" y="212">IF THE TEST DISPROVES THE THEORY, GO BACK TO STEP 3 — DO NOT GUESS AGAIN AT STEP 4</text>
  <text class="f-lbl" x="350" y="230">Change one thing at a time. Two changes at once and you no longer know which one worked.</text>
</svg>`;

D.hwCooling = `
<svg viewBox="0 0 700 240" role="img" aria-labelledby="t-hwcool">
  <title id="t-hwcool">Airflow through a computer case: cool air enters at the front, passes over the processor heatsink and the components, and warm air leaves at the rear, with dust blocking the path when vents are not cleaned</title>
  ${ah('a-hwcool')}
  <text class="f-ttl" x="10" y="20">HOW A CASE STAYS COOL — one path, front to back</text>

  <rect class="f-box-d" x="120" y="40" width="460" height="140" rx="8"/>

  <path class="f-arr" d="M28 110 L118 110" marker-end="url(#a-hwcool)"/>
  <text class="f-lbl-y" x="72" y="98" style="font-size:10px">COOL AIR IN</text>
  <text class="f-lbl" x="72" y="130" style="font-size:9.5px">front intake</text>

  <rect class="f-box-y" x="270" y="70" width="120" height="58" rx="6"/>
  <line class="f-ln" x1="280" y1="78" x2="280" y2="120"/>
  <line class="f-ln" x1="292" y1="78" x2="292" y2="120"/>
  <line class="f-ln" x1="304" y1="78" x2="304" y2="120"/>
  <line class="f-ln" x1="316" y1="78" x2="316" y2="120"/>
  <line class="f-ln" x1="328" y1="78" x2="328" y2="120"/>
  <text class="f-lbl-y" x="360" y="104" style="font-size:9.5px">HEATSINK</text>
  <text class="f-lbl" x="330" y="146" style="font-size:9.5px">fins carry heat away from the CPU</text>

  <circle cx="200" cy="99" r="26" class="f-box"/>
  <text class="f-lbl" x="200" y="103" style="font-size:9px">fan</text>

  <path class="f-arr" d="M582 110 L672 110" marker-end="url(#a-hwcool)"/>
  <text class="f-lbl-y" x="628" y="98" style="font-size:10px">WARM AIR OUT</text>
  <text class="f-lbl" x="628" y="130" style="font-size:9.5px">rear exhaust</text>

  <rect class="f-box-c" x="16" y="194" width="668" height="40" rx="8"/>
  <text class="f-lbl" x="350" y="211">DUST ON THE FINS IS AN INSULATOR. The CPU makes its normal heat and can no longer get rid of it,</text>
  <text class="f-lbl" x="350" y="227">so the board shuts down to protect it — which the user reports as "it restarts by itself".</text>
</svg>`;

D.hwRaid = `
<svg viewBox="0 0 700 250" role="img" aria-labelledby="t-hwraid">
  <title id="t-hwraid">RAID 0 stripes data across two disks for speed with no redundancy, RAID 1 mirrors the same data onto two disks for safety, and RAID 5 stripes data with parity across three disks so one can fail</title>
  <text class="f-ttl" x="10" y="20">RAID — SEVERAL DISKS BEHAVING AS ONE</text>

  <rect class="f-box-c" x="16" y="32" width="212" height="164" rx="8"/>
  <text class="f-lbl-y" x="122" y="52">RAID 0 — STRIPING</text>
  <rect class="f-box" x="36" y="66" width="80" height="60" rx="5"/>
  <text class="f-lbl" x="76" y="88" style="font-size:9px">A1</text>
  <text class="f-lbl" x="76" y="106" style="font-size:9px">A3</text>
  <rect class="f-box" x="130" y="66" width="80" height="60" rx="5"/>
  <text class="f-lbl" x="170" y="88" style="font-size:9px">A2</text>
  <text class="f-lbl" x="170" y="106" style="font-size:9px">A4</text>
  <text class="f-lbl" x="122" y="148" style="font-size:9.5px">fastest · full capacity</text>
  <text class="f-lbl" x="122" y="164" style="font-size:9.5px">NO redundancy at all</text>
  <text class="f-lbl-y" x="122" y="184" style="font-size:9.5px">one disk fails = everything lost</text>

  <rect class="f-box-g" x="242" y="32" width="212" height="164" rx="8"/>
  <text class="f-lbl-y" x="348" y="52">RAID 1 — MIRRORING</text>
  <rect class="f-box" x="262" y="66" width="80" height="60" rx="5"/>
  <text class="f-lbl" x="302" y="88" style="font-size:9px">A1</text>
  <text class="f-lbl" x="302" y="106" style="font-size:9px">A2</text>
  <rect class="f-box" x="356" y="66" width="80" height="60" rx="5"/>
  <text class="f-lbl" x="396" y="88" style="font-size:9px">A1</text>
  <text class="f-lbl" x="396" y="106" style="font-size:9px">A2</text>
  <text class="f-lbl" x="348" y="148" style="font-size:9.5px">an exact copy on both</text>
  <text class="f-lbl" x="348" y="164" style="font-size:9.5px">half the capacity is usable</text>
  <text class="f-lbl-y" x="348" y="184" style="font-size:9.5px">one disk fails = still running</text>

  <rect class="f-box" x="468" y="32" width="216" height="164" rx="8"/>
  <text class="f-lbl-y" x="576" y="52">RAID 5 — STRIPING + PARITY</text>
  <rect class="f-box" x="484" y="66" width="60" height="60" rx="5"/>
  <text class="f-lbl" x="514" y="88" style="font-size:9px">A1</text>
  <text class="f-lbl-y" x="514" y="106" style="font-size:9px">Bp</text>
  <rect class="f-box" x="550" y="66" width="60" height="60" rx="5"/>
  <text class="f-lbl" x="580" y="88" style="font-size:9px">A2</text>
  <text class="f-lbl" x="580" y="106" style="font-size:9px">B1</text>
  <rect class="f-box" x="616" y="66" width="60" height="60" rx="5"/>
  <text class="f-lbl-y" x="646" y="88" style="font-size:9px">Ap</text>
  <text class="f-lbl" x="646" y="106" style="font-size:9px">B2</text>
  <text class="f-lbl" x="576" y="148" style="font-size:9.5px">minimum THREE disks</text>
  <text class="f-lbl" x="576" y="164" style="font-size:9.5px">one disk of capacity goes to parity</text>
  <text class="f-lbl-y" x="576" y="184" style="font-size:9.5px">one disk fails = rebuilt from parity</text>

  <rect class="f-box-y" x="16" y="208" width="668" height="34" rx="8"/>
  <text class="f-lbl" x="350" y="230">RAID IS NOT A BACKUP. It survives a DISK failing. It does not survive a file being deleted, overwritten or encrypted — that change is mirrored too.</text>
</svg>`;

/* Full, incremental and differential differ only in WHAT GETS COPIED on
   each successive day — which is a change over time, and therefore the
   one thing a still table shows badly and a sequence shows well. */
D.hwBackupTypes = {
  type: 'animated',
  intro: { en: 'Full, incremental and differential backups across one working week.',
           ne: 'एउटा कार्य-हप्ताभरि full, incremental र differential backup।' },
  svg: `
<svg viewBox="0 0 700 250" role="img" aria-labelledby="t-hwbk">
  <title id="t-hwbk">A week of backups comparing full, incremental and differential methods, showing how much each copies each day and how many sets are needed to restore</title>
  <text class="f-ttl" x="10" y="20">ONE WEEK OF BACKUPS</text>

  <text class="f-lbl" x="120" y="46" style="font-size:10px">MON</text>
  <text class="f-lbl" x="234" y="46" style="font-size:10px">TUE</text>
  <text class="f-lbl" x="348" y="46" style="font-size:10px">WED</text>
  <text class="f-lbl" x="462" y="46" style="font-size:10px">THU</text>
  <text class="f-lbl" x="576" y="46" style="font-size:10px">FRI</text>

  <g id="bk-full">
    <text class="f-lbl-y" x="46" y="82" style="font-size:10px">FULL</text>
    <rect class="f-box-y" x="80" y="60" width="80" height="30" rx="4"/>
    <text class="f-lbl" x="120" y="80" style="font-size:9px">everything</text>
    <rect class="f-box-y" x="194" y="60" width="80" height="30" rx="4"/>
    <text class="f-lbl" x="234" y="80" style="font-size:9px">everything</text>
    <rect class="f-box-y" x="308" y="60" width="80" height="30" rx="4"/>
    <text class="f-lbl" x="348" y="80" style="font-size:9px">everything</text>
    <rect class="f-box-y" x="422" y="60" width="80" height="30" rx="4"/>
    <text class="f-lbl" x="462" y="80" style="font-size:9px">everything</text>
    <rect class="f-box-y" x="536" y="60" width="80" height="30" rx="4"/>
    <text class="f-lbl" x="576" y="80" style="font-size:9px">everything</text>
    <text class="f-lbl" x="350" y="106" style="font-size:9.5px">slowest to back up · fastest to restore · needs 1 set</text>
  </g>

  <g id="bk-inc">
    <text class="f-lbl-y" x="46" y="146" style="font-size:10px">INCREMENTAL</text>
    <rect class="f-box-y" x="80" y="124" width="80" height="30" rx="4"/>
    <text class="f-lbl" x="120" y="144" style="font-size:9px">full</text>
    <rect class="f-box-g" x="194" y="124" width="80" height="30" rx="4"/>
    <text class="f-lbl" x="234" y="144" style="font-size:9px">since MON</text>
    <rect class="f-box-g" x="308" y="124" width="80" height="30" rx="4"/>
    <text class="f-lbl" x="348" y="144" style="font-size:9px">since TUE</text>
    <rect class="f-box-g" x="422" y="124" width="80" height="30" rx="4"/>
    <text class="f-lbl" x="462" y="144" style="font-size:9px">since WED</text>
    <rect class="f-box-g" x="536" y="124" width="80" height="30" rx="4"/>
    <text class="f-lbl" x="576" y="144" style="font-size:9px">since THU</text>
    <text class="f-lbl" x="350" y="170" style="font-size:9.5px">fastest to back up · slowest to restore · needs the full set AND every increment</text>
  </g>

  <g id="bk-diff">
    <text class="f-lbl-y" x="46" y="210" style="font-size:10px">DIFFERENTIAL</text>
    <rect class="f-box-y" x="80" y="188" width="80" height="30" rx="4"/>
    <text class="f-lbl" x="120" y="208" style="font-size:9px">full</text>
    <rect class="f-box" x="194" y="188" width="80" height="30" rx="4"/>
    <text class="f-lbl" x="234" y="208" style="font-size:9px">since MON</text>
    <rect class="f-box" x="308" y="188" width="80" height="30" rx="4"/>
    <text class="f-lbl" x="348" y="208" style="font-size:9px">since MON</text>
    <rect class="f-box" x="422" y="188" width="80" height="30" rx="4"/>
    <text class="f-lbl" x="462" y="208" style="font-size:9px">since MON</text>
    <rect class="f-box" x="536" y="188" width="80" height="30" rx="4"/>
    <text class="f-lbl" x="576" y="208" style="font-size:9px">since MON</text>
    <text class="f-lbl" x="350" y="234" style="font-size:9.5px">grows each day · restore needs exactly TWO sets — the full one and the latest differential</text>
  </g>
</svg>`,
  steps: [
    { show: '#bk-full', focus: '#bk-full',
      en: 'A FULL backup copies everything, every time. Restoring is simple — you need one set — but it takes the longest and uses the most media.',
      ne: 'FULL backup ले हरेक पटक सबै कुरा कपी गर्छ। पुनर्स्थापना सजिलो — एउटै सेट चाहिन्छ — तर समय सबैभन्दा बढी लाग्छ र मिडिया पनि धेरै खपत हुन्छ।' },
    { show: '#bk-inc', focus: '#bk-inc',
      en: 'INCREMENTAL copies only what changed since the LAST backup of any kind. Each day is small and quick. But to restore Friday you need Monday\'s full set plus every increment in between — miss one and the chain is broken.',
      ne: 'INCREMENTAL ले जुनसुकै किसिमको <b>अघिल्लो</b> backup पछि बदलिएको मात्र कपी गर्छ। हरेक दिनको सानो र छिटो हुन्छ। तर शुक्रबार फर्काउन सोमबारको full सेट र बीचका सबै increment चाहिन्छन् — एउटा छुट्यो भने शृंखला टुट्छ।' },
    { show: '#bk-diff', focus: '#bk-diff',
      en: 'DIFFERENTIAL copies everything changed since the last FULL backup. Each day is bigger than the one before, but a restore needs exactly two sets: the full one and the most recent differential. That is the trade — more media for a simpler recovery.',
      ne: 'DIFFERENTIAL ले अन्तिम <b>FULL</b> backup पछि बदलिएको सबै कपी गर्छ। हरेक दिनको अघिल्लो भन्दा ठूलो हुन्छ, तर पुनर्स्थापनाका लागि ठ्याक्कै दुई सेट चाहिन्छ: full र सबैभन्दा पछिल्लो differential। सौदा यही हो — सजिलो रिकभरीका लागि बढी मिडिया।' }
  ]
};

module.exports = D;
