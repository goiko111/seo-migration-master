# Technical release gates for next editorial batches

Fecha: 2026-07-13
Agente: 6 - Integracion tecnica y gates
Alcance: auditoria de `supabase/functions/prerender/index.ts`, `supabase/functions/sitemap/index.ts` y `cloudflare-worker-v3-hybrid.js`.

## Resumen ejecutivo

La arquitectura actual declara dos tipos de compuerta:

1. `published_at` en `public.articles`, filtrado por `published_at.is.null OR published_at <= now`.
2. Release gates hardcoded en Edge/Worker:
   - `supabase/functions/prerender/index.ts`
     - `LINK_RELEASES`: paths publicos que no deben enlazarse antes de fecha.
     - `ARTICLE_RELEASES`: slugs reales de BD que no deben prerenderizarse antes de fecha.
   - `supabase/functions/sitemap/index.ts`
     - `ARTICLE_RELEASES`: slugs reales de BD que no deben aparecer en sitemap antes de fecha.
   - `cloudflare-worker-v3-hybrid.js`
     - `WORKER_LINK_RELEASES`: paths publicos que el Worker bloquea como `404/noindex` antes de fecha y tambien retira del sitemap proxyficado.

Validacion local creada:

```bash
node docs/agent_outputs/validate_release_gates.mjs
```

Resultado actual:

```json
{
  "ok": true,
  "prerenderLinkReleases": 48,
  "prerenderArticleReleases": 48,
  "sitemapArticleReleases": 48,
  "workerLinkReleases": 48,
  "warnings": []
}
```

## Formato exacto que deben entregar agentes 3/4/5

Cada lote debe llegar como una tabla de seis idiomas, una fila por idioma, con estos campos exactos:

| Campo | Obligatorio | Formato esperado |
| --- | --- | --- |
| `article_group` | si | Un identificador comun del lote en kebab-case, por ejemplo `wine-library-structure-by-country-restaurant`. Igual para los seis idiomas. |
| `lang` | si | Uno de `es`, `en`, `it`, `fr`, `de`, `pt`. |
| `db_slug` | si | Slug que se inserta en `public.articles.slug`. Espanol sin sufijo. EN/IT/FR/DE/PT con sufijo `_<lang>`. |
| `public_path` | si | Path canonico publico. Espanol: `/article/<slug-es>`. Otros idiomas: `/<lang>/article/<slug-sin-sufijo>`. |
| `published_at` | si | Timestamp ISO con offset `+02:00`, normalmente lunes con offsets por idioma. |
| `expected_release_at` | si | Igual a `published_at` salvo excepcion aprobada. Es el valor que se copiara a las gates. |
| `title` | recomendado | Para QA humano y Search Console. |
| `migration_file` | recomendado | Ruta SQL que contiene el lote. |

Patron de slugs:

```text
ES db_slug:        como-ejemplo-restaurante
ES public_path:    /article/como-ejemplo-restaurante

EN db_slug:        example-restaurant_en
EN public_path:    /en/article/example-restaurant

IT db_slug:        esempio-ristorante_it
IT public_path:    /it/article/esempio-ristorante

FR db_slug:        exemple-restaurant_fr
FR public_path:    /fr/article/exemple-restaurant

DE db_slug:        beispiel-restaurant_de
DE public_path:    /de/article/beispiel-restaurant

PT db_slug:        exemplo-restaurante_pt
PT public_path:    /pt/article/exemplo-restaurante
```

Patron horario actual:

```text
es 09:00:00+02:00
en 09:05:00+02:00
it 09:10:00+02:00
fr 09:15:00+02:00
de 09:20:00+02:00
pt 09:25:00+02:00
```

Ejemplo de entrega minima:

```markdown
| article_group | lang | db_slug | public_path | published_at |
| --- | --- | --- | --- | --- |
| next-batch-example | es | ejemplo-carta-vinos-restaurante | /article/ejemplo-carta-vinos-restaurante | 2026-09-07T09:00:00+02:00 |
| next-batch-example | en | wine-list-example-restaurant_en | /en/article/wine-list-example-restaurant | 2026-09-07T09:05:00+02:00 |
| next-batch-example | it | esempio-carta-vini-ristorante_it | /it/article/esempio-carta-vini-ristorante | 2026-09-07T09:10:00+02:00 |
| next-batch-example | fr | exemple-carte-vins-restaurant_fr | /fr/article/exemple-carte-vins-restaurant | 2026-09-07T09:15:00+02:00 |
| next-batch-example | de | beispiel-weinkarte-restaurant_de | /de/article/beispiel-weinkarte-restaurant | 2026-09-07T09:20:00+02:00 |
| next-batch-example | pt | exemplo-carta-vinhos-restaurante_pt | /pt/article/exemplo-carta-vinhos-restaurante | 2026-09-07T09:25:00+02:00 |
```

## Checklist para anadir gates

Antes de tocar codigo:

1. Confirmar que el lote tiene seis filas, una por idioma.
2. Confirmar que `article_group` es identico en las seis filas.
3. Confirmar que `db_slug` coincide con la convencion:
   - ES sin sufijo.
   - EN/IT/FR/DE/PT con sufijo `_<lang>`.
4. Confirmar que `public_path` se deriva del `db_slug`:
   - ES: `/article/${db_slug}`.
   - Otros: `/${lang}/article/${db_slug sin _<lang>}`.
5. Confirmar que `published_at` y release gate usan el mismo timestamp.
6. Confirmar que el lote no se ha anadido a `llms.txt` ni `llms-full.txt` antes de publicacion.

Ediciones requeridas por lote:

1. En `supabase/functions/prerender/index.ts`, anadir los seis `public_path` a `LINK_RELEASES`.
2. En `supabase/functions/prerender/index.ts`, anadir los seis `db_slug` a `ARTICLE_RELEASES`.
3. En `supabase/functions/sitemap/index.ts`, anadir los seis `db_slug` a `ARTICLE_RELEASES`.
4. En `cloudflare-worker-v3-hybrid.js`, anadir los seis `public_path` a `WORKER_LINK_RELEASES`.
5. Ejecutar `node docs/agent_outputs/validate_release_gates.mjs`.
6. Ejecutar checks de sintaxis y tipo antes de deploy.

## Validaciones locales

Minimo tecnico:

```bash
node docs/agent_outputs/validate_release_gates.mjs
npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts
node --check cloudflare-worker-v3-hybrid.js
git diff --check -- supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts cloudflare-worker-v3-hybrid.js docs/agent_outputs/validate_release_gates.mjs
```

Si se han tocado frontend o rutas React:

```bash
./node_modules/.bin/tsc --noEmit --pretty false -p tsconfig.json
```

Dry-run Worker:

```bash
npm run deploy:worker:dry-run
```

Validaciones post-deploy recomendadas, sustituyendo `<future-path>` por una URL del siguiente lote futuro:

```bash
curl -I -A 'Googlebot/2.1' https://winerim.wine<future-path>
curl -I -A 'OAI-SearchBot/1.0' https://winerim.wine<future-path>
curl -s https://winerim.wine/sitemap.xml | grep '<future-slug>'
curl -s https://winerim.wine/llms.txt | grep '<future-slug>'
curl -s https://winerim.wine/llms-full.txt | grep '<future-slug>'
```

Resultado esperado antes de fecha:

```text
future article direct access: HTTP 404
X-Robots-Tag: noindex, follow
sitemap.xml: no contiene future-slug
llms.txt: no contiene future-slug
llms-full.txt: no contiene future-slug
```

Resultado esperado despues de fecha:

```text
article path: HTTP 200
X-Worker-Branch: bot-prerender para bots cuando venga de prerender
X-Prerendered: true para bots
canonical: path publico localizado correcto
hreflang: solo hermanos ya liberados/publicados
```

## Comandos de deploy

Supabase Edge Functions:

```bash
npx --yes supabase@latest functions deploy sitemap --project-ref pwkqbcgjrhoyxrsmcypw
npx --yes supabase@latest functions deploy prerender --project-ref pwkqbcgjrhoyxrsmcypw
```

Equivalente package script:

```bash
npm run deploy:supabase:seo
```

Worker:

```bash
npm run deploy:worker:dry-run
npm run deploy:worker
```

Orden recomendado para lotes futuros:

1. Anadir y desplegar gates.
2. Aplicar migracion de articulos con `published_at` futuro.
3. Desplegar `sitemap` y `prerender`.
4. Desplegar Worker.
5. Revalidar sitemap/llms/acceso directo futuro.

Si el lote ya se aplico en base de datos antes de gates, desplegar gates y Worker antes de cualquier publicacion frontend adicional.

## Riesgos y observaciones

1. Doble fuente de verdad manual: `ARTICLE_RELEASES` existe en `prerender` y `sitemap`; `LINK_RELEASES` existe en `prerender` y `WORKER_LINK_RELEASES` en Worker. El script nuevo reduce el riesgo, pero no elimina la duplicacion.
2. `published_at` y gate deben coincidir. Si uno libera antes que el otro, puede haber diferencias entre DB, prerender, sitemap y Worker.
3. Las rutas localizadas dependen de que el slug de BD tenga sufijo `_<lang>` y el path publico no lo tenga. Un sufijo mal puesto rompe prerender, sitemap o hreflang.
4. El Worker tiene una red de seguridad fuerte: bloquea `public_path` futuro antes de llegar a prerender y limpia el sitemap proxyficado. Si falta un path en `WORKER_LINK_RELEASES`, esa proteccion se pierde para acceso directo.
5. `llms.txt` y `llms-full.txt` no forman parte de estas gates. Hay que mantenerlos fuera del lote futuro manualmente hasta publicacion.
6. Cache: `prerender` usa cache publica y el Worker tambien. Tras publicar un lote, puede haber ventanas cortas donde caches mantengan estado anterior. Validar con `curl -I` y repetir tras unos minutos si hay discrepancia.
7. Fallback localizado: `prerender` intenta `dbSlug` y, para rutas no ES, tambien `baseSlug`. Hoy no produce divergencia en las gates existentes, pero conviene vigilarlo en slugs mal localizados o legacy para evitar contenido ES en una ruta internacional.
8. Zona horaria: las gates actuales usan `+02:00`. Si un lote cae fuera de horario de verano de Madrid, decidir expresamente si se mantiene `+02:00` operativo o se cambia a `+01:00`; no mezclar sin documentarlo.

## Auditoria de estado actual

- `supabase/functions/prerender/index.ts`
  - `LINK_RELEASES`: 48 paths.
  - `ARTICLE_RELEASES`: 48 slugs.
  - Articulos no liberados o no existentes devuelven HTML localizado `noindex, follow` con status `404`.
  - `OAI-SearchBot` esta incluido en `BOT_UA_PATTERNS`.
- `supabase/functions/sitemap/index.ts`
  - `ARTICLE_RELEASES`: 48 slugs.
  - Filtra `published_at` en la consulta y vuelve a filtrar por `ARTICLE_RELEASES` antes de escribir URLs.
  - Hreflang de articulos solo incluye hermanos liberados y con `published_at` visible.
- `cloudflare-worker-v3-hybrid.js`
  - `WORKER_LINK_RELEASES`: 48 paths.
  - Acceso directo a path futuro devuelve `404`, `X-Robots-Tag: noindex, follow`, `X-Worker-Branch: future-article-not-found`.
  - El sitemap servido por Worker pasa por `stripUnreleasedSitemapUrls`.
  - El Worker propaga status del `prerender` para articulos no disponibles y mantiene `X-Robots-Tag: noindex, follow`.

No se han editado archivos de producto en esta tarea.
