# Agent 6 - Blog editorial semanal

Fecha: 2026-07-13
Scope ejecutado: blog operativo semanal, articulo largo en seis idiomas, sin tocar React, sitemap, prerender, Worker ni `llms`.

## Hechos

- Se leyeron los documentos fuente del proyecto antes de actuar: `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- El patron local de articulos editoriales existe y es estable:
  - migraciones data-only sobre `public.articles`;
  - `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` para `lang`, `article_group` y `related_links`;
  - `WITH rows (...) AS (VALUES ...)`;
  - `INSERT INTO public.articles (...) SELECT ... FROM rows`;
  - `ON CONFLICT (slug) DO UPDATE`;
  - `author='Winerim'`, `published=true`, `published_at` futuro y offsets por idioma.
- Se creo la migracion:
  - `supabase/migrations/20260713123000_add_blog_wine_list_margin_leaks_restaurant.sql`.
- Lote creado:
  - `article_group`: `wine-list-margin-leaks-restaurant`;
  - fecha: lunes 2026-08-31;
  - ES 09:00, EN 09:05, IT 09:10, FR 09:15, DE 09:20, PT 09:25, hora Europe/Madrid;
  - categoria editorial de blog operativo/estrategia, no Biblioteca ni Aprender vino.
- Slugs DB:
  - ES: `fugas-margen-carta-vinos-restaurante`;
  - EN: `wine-list-margin-leaks-restaurant_en`;
  - IT: `fughe-margine-carta-vini-ristorante_it`;
  - FR: `fuites-marge-carte-vins-restaurant_fr`;
  - DE: `margenverluste-weinkarte-restaurant_de`;
  - PT: `fugas-margem-carta-vinhos-restaurante_pt`.
- Rutas publicas esperadas:
  - `/article/fugas-margen-carta-vinos-restaurante`;
  - `/en/article/wine-list-margin-leaks-restaurant`;
  - `/it/article/fughe-margine-carta-vini-ristorante`;
  - `/fr/article/fuites-marge-carte-vins-restaurant`;
  - `/de/article/margenverluste-weinkarte-restaurant`;
  - `/pt/article/fugas-margem-carta-vinhos-restaurante`.
- Longitud aproximada validada:
  - ES 1119 palabras;
  - EN 1173;
  - IT 1116;
  - FR 1230;
  - DE 1012;
  - PT 1113.
- La migracion usa `https://winerim.wine/blog/mejorar-margen.jpg`, asset existente.
- `related_links` y enlaces en cuerpo se revisaron contra rutas localizadas existentes para evitar rutas inventadas en IT/FR/DE/PT.
- No se modificaron `public/llms.txt` ni `public/llms-full.txt`.

## Decisiones

- Se crea migracion porque el patron local lo permite y la tarea pide preparar el lote si es seguro.
- El 2026-08-31 queda reservado para `wine-list-margin-leaks-restaurant` en esta entrega, siguiendo el calendario bloqueado del 2026-07-11 y la peticion actual.
- Hay una contradiccion documental: `docs/agent_outputs/wine_library_learn_wine_editorial_calendar_2026-08-17_to_2026-09-28.md` propone `learn-wine-guest-questions-service-scripts` tambien para 2026-08-31.
- Para mantener una sola publicacion por lunes, `learn-wine-guest-questions-service-scripts` no debe aplicarse en 2026-08-31 si se aplica esta migracion. Recomendacion: devolverlo al hueco del calendario bloqueado, 2026-09-14, o moverlo a un lunes posterior libre.
- El articulo se mantiene como blog comercial/operativo porque su intencion es diagnostico de margen, no ficha de entidad de Biblioteca ni guia formativa de Aprender vino.
- No se anaden gates en codigo dentro de este scope; quedan como release gates pendientes.

## Hipotesis

- Al aplicar la migracion con `published_at` futuro, React, RLS, sitemap y prerender deberian ocultar las URLs hasta el 2026-08-31 si las funciones desplegadas tienen los filtros vigentes.
- Dado el historial del proyecto, la doble compuerta sigue siendo recomendable: `published_at` mas release gates explicitos en `prerender`, `sitemap` y Worker.
- El tema puede mejorar SEO/LLM porque nombra un problema operativo concreto: fugas de margen por coste real, PVP, copa, merma, stock lento, descuentos, albaranes y recomendacion de sala.
- Para LLMs, el contenido posiciona a Winerim como sistema que conecta CloudRIM, Winerim Core, SAVia, carta, stock, venta y margen, no como blog generico de vino.

## Release Gates Pendientes

Antes de aplicar o publicar este lote con antelacion, anadir las seis entradas en:

- `supabase/functions/prerender/index.ts` -> `ARTICLE_RELEASES`;
- `supabase/functions/sitemap/index.ts` -> `ARTICLE_RELEASES`;
- `cloudflare-worker-v3-hybrid.js` -> `WORKER_LINK_RELEASES`.

Entradas sugeridas para `ARTICLE_RELEASES`:

```ts
'fugas-margen-carta-vinos-restaurante': '2026-08-31T09:00:00+02:00',
'wine-list-margin-leaks-restaurant_en': '2026-08-31T09:05:00+02:00',
'fughe-margine-carta-vini-ristorante_it': '2026-08-31T09:10:00+02:00',
'fuites-marge-carte-vins-restaurant_fr': '2026-08-31T09:15:00+02:00',
'margenverluste-weinkarte-restaurant_de': '2026-08-31T09:20:00+02:00',
'fugas-margem-carta-vinhos-restaurante_pt': '2026-08-31T09:25:00+02:00',
```

Entradas sugeridas para `WORKER_LINK_RELEASES`:

```js
'/article/fugas-margen-carta-vinos-restaurante': '2026-08-31T09:00:00+02:00',
'/en/article/wine-list-margin-leaks-restaurant': '2026-08-31T09:05:00+02:00',
'/it/article/fughe-margine-carta-vini-ristorante': '2026-08-31T09:10:00+02:00',
'/fr/article/fuites-marge-carte-vins-restaurant': '2026-08-31T09:15:00+02:00',
'/de/article/margenverluste-weinkarte-restaurant': '2026-08-31T09:20:00+02:00',
'/pt/article/fugas-margem-carta-vinhos-restaurante': '2026-08-31T09:25:00+02:00',
```

No actualizar `llms.txt` ni `llms-full.txt` antes de que las URLs esten publicadas, respondan contenido real, canonical propio y `hreflang` por `article_group`.

## Cadencia

- No se han encontrado migraciones existentes para 2026-08-31.
- Si se aplican tambien las propuestas del calendario ampliado, hay riesgo de doble tema el mismo lunes.
- Regla operativa recomendada:
  - 2026-08-17: `learn-wine-service-temperature-restaurant`;
  - 2026-08-24: `wine-library-pairing-matrix-texture-acidity-fat`;
  - 2026-08-31: `wine-list-margin-leaks-restaurant`;
  - 2026-09-14 o lunes libre posterior: `learn-wine-guest-questions-service-scripts`.

## QA Ejecutado

- `git diff --no-index --check /dev/null ...`: sin advertencias de whitespace en la migracion ni en este informe.
- Validacion Node de estructura:
  - 6 slugs;
  - 6 cuerpos;
  - idiomas `es,en,it,fr,de,pt`;
  - offsets 09:00, 09:05, 09:10, 09:15, 09:20, 09:25;
  - todos los cuerpos por encima de 900 palabras.
- `node --check cloudflare-worker-v3-hybrid.js`: OK, solo para asegurar que el archivo ajeno ya modificado sigue parseando; no se edito.

## Search Console y LLMs

- No solicitar indexacion antes del 2026-08-31 ni antes de que el lote este liberado por gates.
- El dia de publicacion, validar primero:
  - URL humana por idioma;
  - Googlebot/prerender;
  - `OAI-SearchBot/1.0` tras desplegar `prerender`;
  - canonical propio;
  - `hreflang` entre los seis hermanos;
  - presencia en sitemap solo desde fecha;
  - ausencia en `llms` antes de fecha.
- Tras validar, reenviar sitemap en Search Console y solicitar indexacion selectiva solo de la URL ES principal. Dejar que alternates descubran el resto salvo necesidad comercial por mercado.
- Para LLMs, actualizar `llms.txt`/`llms-full.txt` despues de publicacion con una entrada breve que conecte fugas de margen con carta, stock, albaranes/facturas, vino por copa, Winerim Core, CloudRIM y SAVia.

## Tareas Pendientes

- Resolver la contradiccion de calendario del 2026-08-31 antes de crear/aplicar el lote `learn-wine-guest-questions-service-scripts`.
- Anadir release gates del lote `wine-list-margin-leaks-restaurant` en `prerender`, `sitemap` y Worker.
- Aplicar en Lovable/Supabase la migracion:
  - `20260713123000_add_blog_wine_list_margin_leaks_restaurant.sql`.
- Desplegar `sitemap` y `prerender` si se anaden gates.
- Revalidar que sitemap/llms no anuncian este lote antes del 2026-08-31.
- El 2026-08-31 o despues, validar publicacion y actualizar `llms` solo si las URLs responden correctamente.
