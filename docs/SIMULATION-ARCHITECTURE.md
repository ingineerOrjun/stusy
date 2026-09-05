# Simulation Architecture

Interactive simulations are the product's main pedagogical advantage over a
textbook. This describes the shared foundation they are built on, so the next
simulation is a plug-in rather than a new system.

---

## 1. What a simulation is here

A simulation lets a student **press something and watch the machine think**. It
is not an animation: the student chooses, and the system shows the consequence
step by step, in both languages.

Shipping today:

| Id | Unit | Teaches |
| --- | --- | --- |
| `ds.stack` | u1 | LIFO — push, pop, peek, overflow, underflow |
| `ds.queue` | u1 | FIFO — enqueue, dequeue, front |
| `oop.dispatch` | u6 | Compile-time overload resolution vs. run-time virtual dispatch |

## 2. The two-part architecture

```
      SimulationService          registry: identity, metadata, lifecycle
              │
              │ registers
              ▼
      a simulation module        its own state and rendering
              │
              │ uses
              ▼
      runSteps() in core.js      the shared execution core
```

### The execution core — `runSteps()`

Already existed and is genuinely reusable; Phase 1 kept it untouched. It plays a
list of steps against a code block and a bilingual console:

```js
runSteps(codeElementId, codeLines, steps, consoleEl, guard, onDone)
```

Each step:

```js
{
  line: 8,                            // highlight this source line
  en:   'top moves up: top becomes 0.',   // English commentary
  np:   'top माथि सर्‍यो: top = 0।',        // Nepali commentary
  out:  'popped 30',                  // optional console output
  act:  function(){ … }               // optional state mutation
}
```

`guard` is a `{busy}` object that prevents overlapping runs — a student
double-clicking cannot interleave two animations.

**This step shape is the reusable contract.** Any process that can be expressed
as "highlight a line, say what happened in two languages, maybe print
something" reuses the whole player: a logic-gate evaluation, an SQL query plan,
a binary addition, an instruction cycle.

### The registry — `SimulationService`

Added in Phase 1. It supplies what the core did not: identity, metadata,
discovery and lifecycle.

```js
SimulationService.register({
  id: 'ds.stack',                       // unique
  subject: 'grade10/oop-cpp',
  unit: 'u1',
  title:  { en: 'Stack (LIFO)', ne: 'स्ट्याक (LIFO)' },
  mounts: () => !!document.getElementById('stackViz'),   // is it on this page?
  reset:  () => stkReset(),
  controls: [ { id: 'push', label: { en: 'push()', ne: 'push() — थप्ने' } }, … ]
});
```

API: `register` · `get` · `list` · `active` · `reset` · `resetAll`.

`mounts()` matters because the same script may load on a page without its
markup. A simulation whose DOM is absent must never report as active, and
`reset()` on it must be a no-op rather than an exception.

## 3. Why a registry rather than a base class

A base class would force the two existing simulations to be rewritten to inherit
from it — a rewrite with no behavioural gain, against Rule 2. Registration is
additive: both modules kept their internals exactly as they were and gained
~20 lines at the end declaring themselves.

The result is that `SimulationService.list()` can drive a future "all
simulations in this subject" index, a reset-all control, or per-simulation
progress, without any simulation knowing those features exist.

## 4. Building a new simulation

1. **Model it as steps.** If it can be a `{line, en, np, out, act}` list, the
   core does the animation, the highlighting and the bilingual console.
2. **Write the module** in `_source/runtime/sim-<name>.js`. Own your state;
   guard every DOM read with a null check so the module is inert elsewhere.
3. **Register it** with a descriptor.
4. **Add the markup** to the lesson.
5. **Load it** by adding `services/simulation.js` and your module to the page's
   `js` list in `config/pages.js`.
6. **Test it** — assert the outputs, exactly as the existing simulator tests do.

Nothing in steps 1–6 touches another simulation.

## 5. Fit for the planned simulations

| Planned | Fits `runSteps` | Additional need |
| --- | --- | --- |
| Number-system conversion | Yes — each division is a step | None |
| Binary addition | Yes — column by column | None |
| Logic gates / truth tables | Yes — evaluate each row | An SVG gate renderer |
| Half / full adder | Yes | Reuses the gate renderer |
| K-map simplification | Partly | Grid interaction + grouping visual |
| CPU / 8085 instruction cycle | Yes — fetch/decode/execute are steps | Register-file visual |
| SQL query execution | Yes — clause by clause | Table renderer |
| Memory / pointers | Yes | Reuses the existing memory-cell components |

The step player covers most of it. The recurring gap is **domain renderers**
(gates, grids, tables) — the natural Phase 2 extraction, once two simulations
need the same one. Extracting a gate renderer before any gate simulation exists
would be speculation.

## 6. Constraints any simulation must respect

| Constraint | Why |
| --- | --- |
| Bilingual commentary on **every** step | Both languages always visible is the product |
| Deterministic | Tests assert exact output; a student must be able to repeat what they saw |
| No network | Must work offline from `file://` |
| Null-guarded DOM access | One bundle may load on pages without the markup |
| `reset()` returns to the initial state | Students explore by trying and starting over |
| Reasonable step pace | Currently 760 ms — fast enough to hold attention, slow enough to read |

## 7. Known gaps

- **Controls are inline `onclick` handlers**, so `controls[]` metadata describes
  them but does not yet wire them. Making the registry own control binding is
  the change that would also allow a strict CSP — see [SECURITY.md](SECURITY.md).
- No pause/resume or speed control; a fast reader waits, a slow one may fall behind.
- No progress integration — completing a simulation records nothing yet.
  `SimulationService` and `ProgressService` exist; nothing connects them.
- Console output is not announced to screen readers.
