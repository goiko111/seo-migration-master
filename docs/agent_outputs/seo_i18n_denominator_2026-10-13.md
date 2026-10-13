# SEO/i18n denominator — 2026-10-13

## Scope

Indexable static routes declared multilang in the sitemap are crossed with 6 supported languages and the frontend, sitemap and two bot-rendering surfaces. Legal/noindex routes, dynamic articles and Wine Library routes use separate policies and validators and are not counted here. This is a source/package audit, not a Search Console report.

## Result

- Routes: **42**
- Route × language denominator: **252**
- Passing: **252**
- Failing: **0**
- Coverage: **100%**

## Failures

| ES route | Lang | Expected path | Maps agree | React | Sitemap | Supabase | Worker |
|---|---|---|---:|---:|---:|---:|---:|
| - | - | - | - | - | - | - | - |

## Interpretation

A passing row means the same localized path exists in the frontend, sitemap and Supabase prerender maps, React registers it, the sitemap emits it and at least one bot renderer has an applicable template. It does not prove production deployment, translation quality, indexing or Search Console status.
