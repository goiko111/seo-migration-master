# Operational cost + partner landing candidate — 2026-10-13

## Scope and state

- Repository: `winerim-web-next-20260929`
- Branch: `codex/winerim-web-next-20260929`
- Baseline: `554b95c53a747acd239f1341567c33de69fc501f`
- State: local release candidate, not published.
- Production, Cloudflare, Supabase, Search Console and Lovable were not changed.

## Delivered

### Operational time calculator

- Seven editable weekly tasks: POS items, delivery notes, bottle count, stock reconciliation, order preparation, buying decisions and distributor communication.
- Current and scenario minutes, frequency, role and optional hourly cost per task.
- Signed weekly, monthly and annual results. A slower scenario remains negative instead of being clipped to zero.
- Clear separation between time, opportunity-cost value and unverified business outcomes.
- Full result before any contact action; no operational inputs are transmitted.
- ES/EN routes, local report download and aligned Worker/edge/prerender copy.

### Partner landing

- Replaced unsupported commission, exclusivity, conversion and income framing with a written-terms disclaimer.
- Added two input-led calculations: customer operational time/value and portfolio reach/available conversation capacity.
- The second calculation does not estimate sales, revenue, commission or closed deals.
- Added fit/no-fit criteria, support boundary, proposed process, preparation checklist and FAQ in ES/EN/IT/FR/DE/PT.

### SEO/i18n denominator

- Added `npm run audit:seo-i18n`.
- Crosses 42 indexable static routes × 6 languages across frontend map, React router, sitemap and both bot-rendering paths.
- Result: `252/252` coherent rows.
- Reconciled the five localized `/simulador-carta` entries missing from the central frontend route map.
- Wine Library and dynamic articles remain under their dedicated validators and are not double-counted.

## Emil-style design review

| Before | After | Why |
|---|---|---|
| One aggregated time estimate | Seven task-level rows with stable numeric controls | Makes assumptions inspectable and correction cheap. |
| Positive savings framing | Signed time and value deltas | Avoids hiding cases where a proposed workflow takes longer. |
| Partner page led with programme claims | Customer problem and measurable capacity come first | Gives cold traffic a useful decision before a sales request. |
| Repetitive promotional cards | Flat sections, two genuine calculation panels and concise result bands | Improves hierarchy and keeps framed surfaces for actual tools. |
| Desktop-only confidence | QA at 1440 px and 390 px with stable widths | Confirms controls and copy do not overlap or overflow. |

## Validation

- `npm test`: `28` files, `239/239` tests passed.
- `npm run build`: passed.
- Focused ESLint: passed.
- `node --check cloudflare-worker-v3-hybrid.js`: passed.
- `node --check edge-router/winerim-pages-router.js`: passed.
- `npm run audit:seo-i18n -- --date 2026-10-13`: `252/252`, passed.
- Interactive browser QA: calculator ES/EN and partner ES/DE; desktop/mobile; no horizontal overflow; no console errors in the checked routes.
- Deno check: not executable because `deno` is not installed in this environment.

Known non-blocking warnings: React Router v7 future flags, stale Browserslist data, an existing missing-key warning in `Precios`, and large production chunks.

## Production delta

- The partner routes are live but still show the previous content to humans and bots.
- Both operational-time routes are `404` for human, Googlebot and OAI and are absent from the production sitemap.
- The raw human SPA shell still starts with home metadata on sampled partner routes before hydration.
- Evidence: `seo_i18n_production_sample_2026-10-13.md`.

## Source traceability

- Coordinator brief SHA-256: `3f12f635cc6c1fc10e45bcde715e7f2e572a5b4a1325f8af159061809f6d232c`.
- Ten ASR text files reviewed read-only. Hashes were captured locally; no private transcript text is reproduced in this artifact.

## Release gate

Do not request indexing yet. Release must coordinate frontend, Worker/edge-router and Supabase prerender/sitemap, then re-run human, Googlebot and OAI checks plus sitemap/canonical/hreflang validation. Public partner terms must remain subject to an approved written agreement.
