# Wine Library + Learn Wine: next editorial expansion

Date: 2026-07-05

Scope: proposal only. Do not apply remote migrations from this file.

## Current Pending Migration

Pending local migration reviewed:

- `supabase/migrations/20260703141412_add_wine_library_learn_wine_editorial_expansion.sql`

It is a data-only article migration for `public.articles`. It ensures `lang`,
`article_group` and `related_links`, then upserts article rows by `slug`.

Content in the migration:

| Article group | Surface | Publish Monday | Rows | Intent |
|---|---|---:|---:|---|
| `wine-library-service-guide-floor-team` | Biblioteca del vino | 2026-07-06 | 6 | Turn the service guide into floor-team decisions: temperature, glassware, decanting, service order and service language. |
| `learn-wine-recommend-by-style` | Aprender vino | 2026-07-13 | 6 | Teach teams to recommend by style when the guest does not know grapes or regions. |

The migration contains 12 unique slugs, six languages per group:
`es`, `en`, `it`, `fr`, `de`, `pt`.

## Recommended Next Batch

Keep the same cadence: one topic group per Monday, with all six localized
variants on the same day and the existing 5-minute language offsets.

### 1. Biblioteca del vino: by-the-glass and stock rotation

Recommended group:

- `wine-library-by-the-glass-stock-rotation`

Recommended ES article:

- `como-usar-biblioteca-vino-para-vino-por-copa-y-rotacion`

Suggested publish date:

- 2026-07-20T09:00:00+02:00 for ES, then 5-minute offsets by language.

Why this is the next Biblioteca topic:

- It connects the reference layer with revenue, stock, open-bottle waste and
  margin.
- It does not duplicate the pending service-guide article; it moves from
  serving a bottle well to deciding what should be sold by the glass.
- It gives Winerim a natural bridge to stock, margin, rotation, SAVia and
  CloudRIM without turning the article into a product page.

Recommended structure:

1. Quick answer: wine-by-the-glass choices should combine style, demand, stock,
   margin and preservation risk.
2. Which wines deserve a by-the-glass slot.
3. How to use styles and pairings from the Wine Library.
4. How to avoid slow-moving open bottles.
5. How to rotate stock without confusing the guest.
6. Floor-team language for the glass list.
7. FAQ for margin, preservation and menu fit.

Primary internal links:

- `/biblioteca-vino`
- `/biblioteca-vino/estilos`
- `/biblioteca-vino/maridajes`
- `/biblioteca-vino/guia-servicio`
- `/aprender-vino`
- `/producto/savia`

### 2. Aprender vino: how to read a wine label

Recommended group:

- `learn-wine-read-label-restaurant`

Recommended ES article:

- `como-leer-etiqueta-vino-restaurante`

Suggested publish date:

- 2026-07-27T09:00:00+02:00 for ES, then 5-minute offsets by language.

Why this is the next Aprender topic:

- It was already in the original spoke plan and has not been covered by the
  pending migration.
- It is a clear beginner intent with high practical value for floor teams.
- It links naturally to grapes, regions, glossary, service guide and purchase
  decisions.

Recommended structure:

1. Quick answer: what a floor team should read first on a label.
2. Producer, region, appellation and vintage.
3. Grape, blend and style clues.
4. Alcohol, sweetness, ageing and bottle format.
5. What not to overpromise from the label alone.
6. How to translate the label into a guest-facing sentence.
7. FAQ for old vintages, unfamiliar regions and international labels.

Primary internal links:

- `/aprender-vino`
- `/biblioteca-vino/glosario`
- `/biblioteca-vino/regiones`
- `/biblioteca-vino/uvas`
- `/biblioteca-vino/guia-servicio`
- `/producto/cloudrim`

## Secondary Backlog

After the two recommended groups above, prioritize:

| Surface | Group idea | Reason |
|---|---|---|
| Aprender vino | `learn-wine-common-faults-restaurant` | Helps teams avoid bad service moments and links to quality control. |
| Biblioteca del vino | `wine-library-menu-pairing-by-dish` | Turns pairings into menu-specific recommendations and internal links. |
| Aprender vino | `learn-wine-preserve-open-bottle` | Strong operational bridge to waste, margin and by-the-glass service. |
| Biblioteca del vino | `wine-library-glossary-floor-language` | Converts glossary terms into usable guest language across markets. |

## Execution Notes

- Use a new Supabase migration only when ready to publish.
- Keep every topic as one shared `article_group` across six languages.
- Keep localized slugs with language suffixes for non-ES variants.
- Include `related_links` in every row, not only markdown links in the body.
- Do not update Cloudflare, DNS or Agora documents for this editorial batch.
- After remote publication, validate article routes, sitemap inclusion,
  Googlebot/prerender samples and Search Console only when the SEO layer is
  known to be serving canonical article pages.
