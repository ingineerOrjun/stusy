# Security

The current product has an unusually small attack surface: a static site, no
backend, no accounts, no user input, and **zero dependencies**. This documents
what that buys, what was hardened in Phase 1, what remains weak, and where the
boundary must go when a backend arrives.

---

## 1. Threat model today

| Asset | Exposure |
| --- | --- |
| Student data | **None collected.** No accounts, no analytics, no cookies, no network calls |
| Content integrity | Served as static files; tampering means compromising the host or the repo |
| Availability | Static files on a CDN |
| Credentials / secrets | **None exist** anywhere in the repository |

**There is no authenticated session to steal, no database to inject, and no
personal data to leak.** Most of the classic web risks are simply out of scope
until a backend exists.

## 2. Dependency risk — structurally eliminated

```json
"dependencies": {},
"devDependencies": {}
```

No `node_modules`, no lockfile, no transitive packages. The build and the test
suite use only Node's standard library.

This is a deliberate, defensible security property: the supply-chain attack
surface that dominates modern web CVEs does not exist here. It is worth
protecting — every future dependency should be weighed against it.

## 3. Hardened in Phase 1

### Content-Security-Policy

Every page now ships a restrictive CSP:

```
default-src 'none';
script-src  'self' 'unsafe-inline';
style-src   'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src    https://fonts.gstatic.com;
img-src     'self' data:;
connect-src 'none';
object-src  'none';
base-uri    'none';
form-action 'none';
```

`default-src 'none'` denies by default. The meaningful wins even with
`'unsafe-inline'` present:

- **`connect-src 'none'`** — injected script cannot exfiltrate anything. No
  `fetch`, no XHR, no WebSocket, no beacon. This is the single most valuable
  directive here.
- **`base-uri 'none'`** — blocks `<base>` injection redirecting every relative URL.
- **`form-action 'none'`** — nothing can post anywhere.
- **`object-src 'none'`** — no plugin embedding.
- **`script-src 'self'`** — no third-party script origin, even though inline is allowed.

Verified in a browser: **no CSP violations, no console errors, all interactive
features working.** Asserted per page by a test.

### Transport and framing headers

`vercel.json` sets what a `<meta>` CSP cannot:

| Header | Purpose |
| --- | --- |
| `X-Content-Type-Options: nosniff` | No MIME sniffing |
| `X-Frame-Options: DENY` | No clickjacking (`frame-ancestors` is ignored in meta CSP) |
| `Referrer-Policy: strict-origin-when-cross-origin` | Minimal referrer leakage |
| `Permissions-Policy` | Camera, microphone, geolocation, FLoC all denied |

### Build integrity

The build now **fails** on a content-contract violation instead of emitting a
broken page — an integrity control as much as a correctness one. It also no
longer reverse-engineers a 177 KB artifact with regular expressions, which
removed a class of silent-corruption failure.

## 4. `innerHTML` — assessed, currently safe

15 `innerHTML` assignments across five runtime modules.

**No live XSS risk today.** Every value written is author-controlled: lesson
HTML, diagram SVG, question text and generated captions, all from source
control. There is no user input anywhere on the site, and no content is fetched
at run time.

**This changes the moment any of these appear:**

| Future feature | Why `innerHTML` becomes dangerous |
| --- | --- |
| Student notes or answers | Free text rendered back into the page |
| Teacher-authored content | Content no longer reviewed in a pull request |
| Content loaded from an API | Trust boundary crosses the network |
| URL-driven state (`?q=`) | Attacker controls part of the page |

**Rule for Phase 2:** the moment content stops being author-controlled, every
sink must move to `textContent`, or through an escaping helper, or a sanitiser.
`hl()` in `core.js` already escapes correctly and is the pattern to follow.

## 5. The inline-handler problem

60 `onclick` attributes across the site force `script-src 'unsafe-inline'`,
which is what stops the CSP being genuinely strong. With it, an injected inline
`<script>` still executes.

**Not fixed in Phase 1** — it touches every simulator and several content files,
and the brief prioritises not breaking what works.

**The fix, concretely:**

1. Replace `onclick="stkPush()"` with `data-sim="ds.stack" data-action="push"`.
2. Bind once, by delegation, in `SimulationService` — the `controls[]` metadata
   in every descriptor already declares exactly which actions exist, so the
   registry has what it needs.
3. Do the same for `[data-answer]` toggles (already delegated) and quiz options.
4. Drop `'unsafe-inline'` from `script-src`.

This is a contained change with a clear finish line, and the registry added in
Phase 1 exists partly to make it possible.

## 6. Other findings

| Finding | Severity | Status |
| --- | --- | --- |
| No secrets in the repository | — | Verified |
| No `eval` / `new Function` in shipped runtime | — | Verified (the test harness uses `vm`, which does not ship) |
| External origins limited to two font hosts | Low | Asserted by test |
| Google Fonts leaks a request to a third party | Low | Accepted — optional, with local fallbacks. Self-host to remove entirely |
| No SRI on the font stylesheet | Low | Google Fonts serves varying CSS; SRI is impractical. `style-src` limits the damage |
| `localStorage` unused so far | — | When used, it holds only progress — no tokens, no PII |
| No rate limiting / abuse controls | — | Nothing to abuse without a backend |

## 7. The backend boundary

When a server is introduced, these are the rules — recorded now, before any code
makes them harder:

1. **Never trust the client.** Progress, scores and completion arrive from a
   browser a student controls. Validate server-side; a client-reported score is
   a claim, not a fact.
2. **Authentication belongs in a service**, beside `ProgressService`, never in
   page code. The UI asks "who is this?"; it never handles a credential.
3. **No tokens in `localStorage`.** Use `httpOnly`, `Secure`, `SameSite` cookies.
   The existing storage adapter must not become a token store.
4. **Re-check authorisation server-side.** Hiding a teacher control in the UI is
   not authorisation.
5. **Tighten the CSP** — remove `'unsafe-inline'` (see §5), add `connect-src` for
   the API origin only.
6. **Then, and only then, treat `innerHTML` as hostile** (see §4).
7. **Keep the offline site working.** The static build is the product for
   students with no connectivity; a backend must be an enhancement, never a
   requirement.

## 8. Reporting

There is no security contact yet. Before the site is publicly promoted, add one
to the README.
