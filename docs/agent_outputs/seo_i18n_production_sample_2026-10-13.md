# SEO/i18n production sample — 2026-10-13

Read-only comparison made on 2026-10-13. No deployment, Search Console action or production mutation was performed.

## HTTP sample

| Route | Human | Googlebot | OAI | Production observation |
|---|---:|---:|---:|---|
| `/afiliate` | 200 | 200 | 200 | Hydrated human canonical is self-referential but the visible landing is the previous version. Bot HTML still contains the old affiliate proposition. |
| `/de/partner` | 200 | 200 | 200 | Bot canonical is self-referential, but content is the previous generic partner page. |
| `/herramientas/calculadora-tiempo-operativo` | 404 | 404 | 404 | `x-worker-branch: not-found`; absent from production sitemap. |
| `/en/tools/operational-time-calculator` | 404 | 404 | 404 | `x-worker-branch: not-found`; absent from production sitemap. |

Googlebot and `OAI-SearchBot/1.0` returned the same status and canonical behavior in this sample.

## Initial HTML shell

For human user agents, `/afiliate` and `/de/partner` initially return the home title/H1/canonical before React hydrates. The hydrated `/afiliate` page corrects its canonical to `https://winerim.wine/afiliate`. This confirms the already known shell-metadata mismatch remains in production.

## Sitemap sample

- Present: `/afiliate`, `/de/partner`, `/en/wine-list-simulator`, `/de/weinkarten-simulator`.
- Absent: `/herramientas/calculadora-tiempo-operativo`, `/en/tools/operational-time-calculator`.

## Interpretation

The local candidate is ahead of production. A coordinated frontend + Worker/edge-router + prerender/sitemap release is required before any indexing request. This sample does not represent Search Console coverage or an exhaustive crawl.
