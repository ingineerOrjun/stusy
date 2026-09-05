/* =========================================================
   SimulationService — the registry every interactive
   simulation plugs into.

   The reusable execution core already exists: runSteps() in core.js
   plays a list of {line, en, np, out, act} steps against a code block
   and a bilingual console. Both shipped simulations use it.

   What was missing was everything around that core — identity,
   metadata, lifecycle, discovery. Without it, a third simulation
   (logic gates, K-map, SQL) has nothing to attach to and becomes
   another bespoke system with its own globals.

   A simulation registers a descriptor:

       {
         id, subject, unit,                 identity
         title: {en, ne},                   metadata
         mounts()  -> boolean               is its DOM on this page?
         reset()   -> void                  return to initial state
         controls: [{ id, label:{en,ne} }]  what a student can do
       }

   The service does not run simulations. It knows which exist, whether
   they are present on the page, and how to reset them.
   ========================================================= */
(function (global) {
  'use strict';

  var registry = Object.create(null);

  function assertDescriptor(d) {
    if (!d || typeof d !== 'object') throw new TypeError('SimulationService: descriptor must be an object');
    if (typeof d.id !== 'string' || !d.id) throw new TypeError('SimulationService: id must be a non-empty string');
    if (!d.title || typeof d.title.en !== 'string') throw new TypeError('SimulationService(' + d.id + '): title.en is required');
    if (typeof d.mounts !== 'function') throw new TypeError('SimulationService(' + d.id + '): mounts() is required');
    if (typeof d.reset !== 'function') throw new TypeError('SimulationService(' + d.id + '): reset() is required');
  }

  var SimulationService = {
    register: function (descriptor) {
      assertDescriptor(descriptor);
      if (registry[descriptor.id]) {
        throw new Error('SimulationService: duplicate simulation id "' + descriptor.id + '"');
      }
      registry[descriptor.id] = descriptor;
      return descriptor.id;
    },

    get: function (id) { return registry[id] || null; },

    list: function () {
      return Object.keys(registry).map(function (id) {
        var d = registry[id];
        return {
          id: d.id, subject: d.subject || null, unit: d.unit || null,
          title: d.title,
          controls: (d.controls || []).map(function (c) { return c.id; })
        };
      });
    },

    /* Which registered simulations actually have their DOM on this page.
       A simulation whose markup is absent must never be treated as active. */
    active: function () {
      var out = [];
      for (var id in registry) {
        var d = registry[id];
        try { if (d.mounts()) out.push(id); } catch (e) { /* a broken probe is not active */ }
      }
      return out;
    },

    reset: function (id) {
      var d = registry[id];
      if (!d) throw new Error('SimulationService: unknown simulation "' + id + '"');
      if (!d.mounts()) return false;      // nothing to reset on this page
      d.reset();
      return true;
    },

    resetAll: function () {
      var n = 0;
      this.active().forEach(function (id) { if (SimulationService.reset(id)) n++; });
      return n;
    },

    /* Test seam and a guard against duplicate-id errors on re-registration. */
    _clear: function () { registry = Object.create(null); }
  };

  global.SimulationService = SimulationService;
  if (typeof module !== 'undefined' && module.exports) module.exports = SimulationService;

})(typeof window !== 'undefined' ? window : globalThis);
