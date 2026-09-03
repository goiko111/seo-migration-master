# Aprender vino batch: open-bottle preservation

Date: 2026-07-11
Agent: Aprender vino

## Scope

Prepared a data-only Aprender vino editorial batch for `public.articles`.
No React, sitemap, prerender, Worker, `llms.txt` or shared SEO files were changed.

## Architecture inspected

- `src/pages/AprenderVino.tsx`: Aprender vino is a separate hub from Biblioteca del vino and links only published article routes.
- `src/pages/ArticlePage.tsx`: dynamic article pages read `public.articles`, require `published = true`, and use `published_at` gating.
- `src/lib/articleRoutes.ts`: non-ES article DB slugs use `_{lang}` suffix, while public routes strip the suffix.
- `supabase/functions/sitemap/index.ts`: article URLs and hreflang are generated from released `public.articles` rows and `article_group`.
- `supabase/functions/prerender/index.ts`: Googlebot article rendering also checks `published_at` and article release status.
- `public/llms.txt` and `public/llms-full.txt`: current static files do not announce future article URLs.
- Existing migrations:
  - `20260707090000_add_learn_wine_read_label_restaurant.sql`
  - `20260707103000_add_wine_library_by_the_glass_stock_rotation.sql`

## New migration

File:

- `supabase/migrations/20260711103000_add_learn_wine_preserve_open_bottle.sql`

Notes:

- Data-only migration.
- Upserts six localized rows into `public.articles`.
- Shared `article_group`: `learn-wine-preserve-open-bottle`.
- Uses `published = true` with future `published_at`, relying on existing release gating.
- Keeps the topic in Aprender vino: practical service protocol, not a Biblioteca entity page.
- `supabase migration new` could not be used because the local Supabase CLI call did not return in this environment.

## Slugs and publication calendar

| Lang | Public route | DB slug | published_at |
|---|---|---|---|
| ES | `/article/como-conservar-una-botella-de-vino-abierta` | `como-conservar-una-botella-de-vino-abierta` | `2026-08-03T09:00:00+02:00` |
| EN | `/en/article/how-to-preserve-an-open-bottle-of-wine` | `how-to-preserve-an-open-bottle-of-wine_en` | `2026-08-03T09:05:00+02:00` |
| IT | `/it/article/come-conservare-una-bottiglia-di-vino-aperta` | `come-conservare-una-bottiglia-di-vino-aperta_it` | `2026-08-03T09:10:00+02:00` |
| FR | `/fr/article/comment-conserver-une-bouteille-de-vin-ouverte` | `comment-conserver-une-bouteille-de-vin-ouverte_fr` | `2026-08-03T09:15:00+02:00` |
| DE | `/de/article/offene-weinflasche-aufbewahren` | `offene-weinflasche-aufbewahren_de` | `2026-08-03T09:20:00+02:00` |
| PT | `/pt/article/como-conservar-uma-garrafa-de-vinho-aberta` | `como-conservar-uma-garrafa-de-vinho-aberta_pt` | `2026-08-03T09:25:00+02:00` |

## Content structure

Each localized article contains:

1. Practical introduction for restaurant floor teams.
2. AI summary paragraph.
3. What happens when a bottle is opened.
4. Practical ranges by wine style.
5. Oxygen, temperature and bottle fill level.
6. Preservation systems and when they make economic sense.
7. Daily by-the-glass protocol.
8. Sellability checklist.
9. Common mistakes.
10. How Winerim connects learning with data.
11. FAQ.
12. Internal links to Aprender vino, service guide, styles, by-the-glass pricing, dead-stock tools, SAVia, analysis and demo.

## Integration notes

- Apply the migration in Lovable/Supabase when ready.
- Do not add the future URLs manually to sitemap or `llms`; existing dynamic release gating should expose them after `2026-08-03`.
- After the publication date, validate:
  - article route HTTP 200 for each language;
  - canonical URL and `hreflang` siblings by `article_group`;
  - sitemap includes the six URLs only after release;
  - Googlebot/prerender renders article-specific HTML;
  - Aprender vino hub links the article if/when hub copy is updated.

## Risks

- Local `git status` failed due `.git/packed-refs` read timeout/cancel, so worktree state could not be fully trusted from Git.
- Supabase CLI did not return, so the migration filename was created manually following repo convention.
- No remote DB query was executed; SQL was prepared locally only.
- Future visibility depends on the already deployed `published_at` filters in React, sitemap, prerender and policies.
