# Aprender vino next batch: service recommendation scripts

Date: 2026-07-13
Agent: AGENTE 4 - Aprender vino, siguiente lote

## Scope

Prepared one data-only Supabase migration for the next Aprender vino batch.

No gates were touched:

- `supabase/functions/prerender/index.ts`: unchanged.
- `supabase/functions/sitemap/index.ts`: unchanged.
- `cloudflare-worker-v3-hybrid.js`: unchanged.
- `public/llms.txt` and `public/llms-full.txt`: unchanged.

## Migration created

- `supabase/migrations/20260713131823_add_learn_wine_guest_questions_service_scripts.sql`

The file was created with `supabase migration new add_learn_wine_guest_questions_service_scripts`.

## Calendar decision

Existing coordination documents and local outputs reserve or apply:

- 2026-08-03: Aprender vino, `learn-wine-preserve-open-bottle`.
- 2026-08-10: Biblioteca del vino, `wine-library-substitution-map-restaurant`.
- 2026-08-17: Aprender vino, `learn-wine-service-temperature-restaurant`.
- 2026-08-24: Biblioteca del vino, `wine-library-pairing-matrix-texture-acidity-fat`.
- 2026-08-31: Blog, `wine-list-margin-leaks-restaurant`.
- 2026-09-07: Biblioteca del vino is documented as the next calendar slot.

To avoid colliding with Biblioteca/Blog and following the task instruction, this batch uses Monday `2026-09-14`.

## Article group

- `learn-wine-guest-questions-service-scripts`

## Slugs and publication offsets

| Lang | Public route | DB slug | published_at |
|---|---|---|---|
| ES | `/article/guiones-recomendacion-vino-sala` | `guiones-recomendacion-vino-sala` | `2026-09-14T09:00:00+02:00` |
| EN | `/en/article/wine-recommendation-scripts-restaurant-floor` | `wine-recommendation-scripts-restaurant-floor_en` | `2026-09-14T09:05:00+02:00` |
| IT | `/it/article/copioni-consigliare-vino-sala` | `copioni-consigliare-vino-sala_it` | `2026-09-14T09:10:00+02:00` |
| FR | `/fr/article/scripts-recommandation-vin-salle` | `scripts-recommandation-vin-salle_fr` | `2026-09-14T09:15:00+02:00` |
| DE | `/de/article/weinempfehlung-service-skripte` | `weinempfehlung-service-skripte_de` | `2026-09-14T09:20:00+02:00` |
| PT | `/pt/article/guioes-recomendacao-vinho-sala` | `guioes-recomendacao-vinho-sala_pt` | `2026-09-14T09:25:00+02:00` |

## Content structure

Each language contains a long localized body with:

1. Service-team introduction for restaurants without a sommelier.
2. AI summary paragraph.
3. Five-question recommendation method.
4. Scripts for common guest questions.
5. Fast pairing language.
6. Budget and upsell language.
7. Commercial vocabulary to use and avoid.
8. Weekly briefing template.
9. Winerim operational connection.
10. FAQ.
11. Localized internal links in body and `related_links`.

## Localized related links

The migration stores manual localized URLs for Aprender vino, wine glossary, styles, pairings, service guide, SAVia, wine-list analysis and demo in all six languages. DE/PT routes follow the corrected patterns from previous DE/PT link fixes, including:

- `/de/weinbibliothek/weinstile`
- `/de/weinbibliothek/weinbegleitung`
- `/pt/biblioteca-vinho/harmonizacoes`
- `/pt/biblioteca-vinho/guia-servico`

## Validation performed locally

- Inspected project coordination docs: `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md`, `NEXT_STEPS.md`.
- Reviewed prior Aprender vino migrations and reports.
- Checked local route maps for localized Aprender vino, Biblioteca del vino, tools, product, analysis and demo paths.
- Created exactly one new migration and one agent report.

## Follow-up

Before applying this future batch in production, add the corresponding release gates in `prerender`, `sitemap` and Worker as required by the project process. Keep the URLs out of sitemap/LLMs until the release date and post-release validation.
