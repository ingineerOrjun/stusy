# Tests

```bash
npm test
```

73 tests, no dependencies, using Node's built-in runner.

| File | Covers |
| --- | --- |
| `build.test.js` | The build runs, validates, produces 20 pages and 9 assets, deterministically |
| `links.test.js` | 704 internal links, link casing, page chrome, offline safety, `lang="ne"`, CSP |
| `content.test.js` | The content contract — including that validation *rejects* bad content |
| `runtime.test.js` | Tracer output, quiz scoring, simulators, question bank, service registries |
| `progress.test.js` | The storage boundary and every one of its failure modes |
| `helpers/dom.js` | Minimal DOM stub; modules load in a real `vm` context |
| `helpers/serve.js` | `npm run serve` — static server for manual checking |

## Why `--test-concurrency=1`

`build.test.js` rewrites the generated site while `links.test.js` and
`runtime.test.js` read it. Run in parallel — Node's default — those suites race
and fail intermittently (reproduced at roughly 1 run in 5). The suites share the
generated site by design, because testing what actually ships is the point, so
they are run sequentially instead.

## Two things that will bite you

**Load modules in a `vm` context, not `new Function`.** The runtime assigns
globals as `window.X = …`. Only a real global object makes those reachable
afterwards as a bare `X`, which is how the scripts reference each other on a page.

**Values crossing the `vm` boundary are from another realm.** An array created
inside the context is not `deepStrictEqual` to a Node array, even when identical.
Copy it (`[...value]`) or compare fields before asserting.
