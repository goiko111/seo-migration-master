# Lovable / Supabase deploy package 2026-07-13

## Alcance

Este paquete es solo operativo. No modifica codigo, migraciones ni configuracion. Su objetivo es dar a Lovable Cloud una instruccion exacta para aplicar las tres migraciones pendientes, desplegar las Edge Functions `sitemap` y `prerender`, y publicar frontend solo si produccion aun no incluye las correcciones React locales.

Proyecto Supabase local declarado en `supabase/config.toml`: `pwkqbcgjrhoyxrsmcypw`.

## Hechos

- Se leyeron `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md` antes de preparar este paquete.
- `www.winerim.wine` ya esta resuelto por DNS proxied a `192.0.2.1` y redireccion canonica del Worker al apex.
- El Worker ya esta publicado y `OAI-SearchBot/1.0` recibe prerender en CloudRIM y SAVia.
- El pendiente SEO/LLM principal esta en Lovable/Supabase: Edge `prerender` publicada aun no reconoce `OAI-SearchBot` en home, funcionalidades y blogs.
- `supabase/functions/prerender/index.ts` local incluye `oai-searchbot` en `BOT_UA_PATTERNS`.
- `supabase/functions/prerender/index.ts` y `supabase/functions/sitemap/index.ts` locales incluyen release gates para los lotes futuros de 2026-08-03 y 2026-08-10.
- `supabase/config.toml` no define `verify_jwt = false` para `sitemap` ni `prerender`; por tanto se deben desplegar con el comportamiento configurado actual del proyecto, sin cambiar secrets.
- `npx --yes supabase@latest ... --help` se quedo sin salida util en este entorno y se interrumpio; no se ejecuto ningun deploy local.
- Se consulto el changelog oficial de Supabase del 2026-07-13. No se detecto un breaking change reciente especifico que cambie este paquete; el cambio de Data API para proyectos nuevos no bloquea estas migraciones porque actualizan `public.articles` existente.

## Migraciones inspeccionadas

### `supabase/migrations/20260711103000_add_learn_wine_preserve_open_bottle.sql`

- Data-only editorial migration para Aprender vino.
- Asegura columnas en `public.articles`: `lang`, `article_group`, `related_links`.
- Inserta o actualiza por `ON CONFLICT (slug)` seis articulos localizados del grupo `learn-wine-preserve-open-bottle`.
- Tema: conservacion de una botella de vino abierta en restaurante.
- `published = true`, con `published_at` escalonado el lunes 2026-08-03:
  - ES `como-conservar-una-botella-de-vino-abierta`: `2026-08-03T09:00:00+02:00`
  - EN `how-to-preserve-an-open-bottle-of-wine_en`: `2026-08-03T09:05:00+02:00`
  - IT `come-conservare-una-bottiglia-di-vino-aperta_it`: `2026-08-03T09:10:00+02:00`
  - FR `comment-conserver-une-bouteille-de-vin-ouverte_fr`: `2026-08-03T09:15:00+02:00`
  - DE `offene-weinflasche-aufbewahren_de`: `2026-08-03T09:20:00+02:00`
  - PT `como-conservar-uma-garrafa-de-vinho-aberta_pt`: `2026-08-03T09:25:00+02:00`

### `supabase/migrations/20260713101000_add_wine_library_substitution_map.sql`

- Data-only editorial migration para Biblioteca del vino.
- Asegura columnas en `public.articles`: `lang`, `article_group`, `related_links`.
- Inserta o actualiza por `ON CONFLICT (slug)` seis articulos localizados del grupo `wine-library-substitution-map-restaurant`.
- Tema: mapa de sustituciones de vino para restaurantes cuando cambian stock, gusto, presupuesto o margen.
- `published = true`, con `published_at` escalonado el lunes 2026-08-10:
  - ES `mapa-sustituciones-vino-restaurante-biblioteca`: `2026-08-10T09:00:00+02:00`
  - EN `wine-substitution-map-restaurant-wine-library_en`: `2026-08-10T09:05:00+02:00`
  - IT `mappa-sostituzioni-vino-ristorante-biblioteca_it`: `2026-08-10T09:10:00+02:00`
  - FR `carte-substitution-vin-restaurant-bibliotheque_fr`: `2026-08-10T09:15:00+02:00`
  - DE `wein-substitutionskarte-restaurant-weinbibliothek_de`: `2026-08-10T09:20:00+02:00`
  - PT `mapa-substituicoes-vinho-restaurante-biblioteca_pt`: `2026-08-10T09:25:00+02:00`

### `supabase/migrations/20260713112000_fix_learn_wine_localized_pairing_links.sql`

- Migracion correctiva idempotente sobre filas ya publicadas de Aprender vino.
- Corrige enlaces markdown y `related_links` que apuntaban a `/wine-pairing-generator` sin localizar.
- Corrige ruta alemana antigua `/de/weinbibliothek/stile` hacia `/de/weinbibliothek/weinstile`.
- Actualiza especificamente:
  - `grundlagen-weinbegleitung-restaurants_de`
  - `harmonizacoes-basicas-para-restaurantes_pt`
- Tambien aplica reemplazos generales para filas `lang in ('en','it','fr','de','pt')` que aun contengan rutas no localizadas.

## Edge Functions inspeccionadas

### `supabase/functions/prerender/index.ts`

- Sirve HTML prerenderizado a bots y crawlers AI; humanos reciben respuesta de no-prerender o SPA normal aguas arriba.
- Reconoce `OAI-SearchBot` localmente mediante `BOT_UA_PATTERNS`.
- Renderiza paginas estaticas, paginas localizadas, Biblioteca del vino, recursos, benchmarks, `seo_pages` y articulos dinamicos desde `public.articles`.
- Filtra articulos por `published = true`, `published_at <= now` y release gates locales (`ARTICLE_RELEASES` / `LINK_RELEASES`).
- Para articulos con `article_group`, genera hreflang solo con siblings publicados y liberados por fecha.
- Responde HTML con cabeceras `X-Prerender: true` y `X-Prerender-Resolved-Path`; en produccion el Worker puede exponer tambien `x-prerendered: true`.

### `supabase/functions/sitemap/index.ts`

- Genera `sitemap.xml` desde rutas estaticas, rutas localizadas, entidades de Biblioteca, articulos y `seo_pages`.
- Consulta `public.articles` con `published = true` y filtro `published_at` no futuro.
- Excluye slugs no liberados por `ARTICLE_RELEASES`, por lo que los lotes 2026-08-03 y 2026-08-10 no deben aparecer antes de su fecha.
- Agrupa articulos por `article_group` para generar hreflang entre idiomas disponibles y publicados.

## Decisiones

- Aplicar las migraciones en orden cronologico exacto:
  1. `20260711103000_add_learn_wine_preserve_open_bottle.sql`
  2. `20260713101000_add_wine_library_substitution_map.sql`
  3. `20260713112000_fix_learn_wine_localized_pairing_links.sql`
- Desplegar Edge Functions `sitemap` y `prerender` despues de las migraciones.
- Publicar frontend solo si Lovable aun no tiene las correcciones React locales de blog/articulo/Biblioteca/related links.
- No tocar Cloudflare Worker salvo que haya un cambio posterior fuera de este paquete.
- No anadir articulos futuros a `llms.txt` ni `llms-full.txt` antes de su fecha de publicacion.

## Hipotesis

- Al desplegar Edge `prerender`, `OAI-SearchBot/1.0` dejara de caer a `bot-fallback` en home, `/funcionalidades` y blogs.
- Las dos migraciones de contenido quedaran ocultas hasta fecha por la doble compuerta `published_at` + release gates.
- La migracion correctiva de enlaces localizados basta para corregir filas ya aplicadas sin editar datos manualmente en dashboard.

## Prompt para Lovable Cloud

Usa este prompt como instruccion directa para el agente de Lovable. No pide credenciales, no usa dashboard y no delega pasos al usuario.

```text
Contexto: proyecto Winerim. Ejecuta la publicacion Lovable/Supabase pendiente usando las herramientas internas ya conectadas al proyecto. No pidas credenciales, no abras ni indiques pasos de dashboard, no modifiques codigo ni migraciones. Aplica exactamente los artefactos locales ya preparados.

Objetivo:
1. Aplicar en Supabase, en este orden exacto:
   - supabase/migrations/20260711103000_add_learn_wine_preserve_open_bottle.sql
   - supabase/migrations/20260713101000_add_wine_library_substitution_map.sql
   - supabase/migrations/20260713112000_fix_learn_wine_localized_pairing_links.sql
2. Desplegar Edge Functions:
   - sitemap
   - prerender
3. Publicar frontend solo si produccion aun no incluye las correcciones React locales:
   - sin fallback silencioso a ES en Blog/ArticlePage
   - contador de Biblioteca localizado
   - labels/enlaces relacionados automaticos localizados

Restricciones:
- No tocar Cloudflare Worker.
- No cambiar DNS ni custom domains.
- No crear nuevas migraciones.
- No editar datos desde dashboard.
- No anadir articulos futuros a llms.txt ni llms-full.txt.
- Mantener project_ref Supabase local: pwkqbcgjrhoyxrsmcypw.

Tool-call style esperado:
- supabase.apply_migration(file="supabase/migrations/20260711103000_add_learn_wine_preserve_open_bottle.sql", project_ref="pwkqbcgjrhoyxrsmcypw")
- supabase.apply_migration(file="supabase/migrations/20260713101000_add_wine_library_substitution_map.sql", project_ref="pwkqbcgjrhoyxrsmcypw")
- supabase.apply_migration(file="supabase/migrations/20260713112000_fix_learn_wine_localized_pairing_links.sql", project_ref="pwkqbcgjrhoyxrsmcypw")
- supabase.deploy_function(name="sitemap", project_ref="pwkqbcgjrhoyxrsmcypw")
- supabase.deploy_function(name="prerender", project_ref="pwkqbcgjrhoyxrsmcypw")
- lovable.publish_frontend(project="Winerim") only if frontend changes are not already live

Post-deploy, report:
- migration result for each SQL file
- deployed Edge Function versions/status for sitemap and prerender
- whether frontend was published or skipped, with reason
- any errors or warnings
```

## CLI fallback for an environment that is already authenticated

No ejecutar desde este repo si no hay token/link local. Esto es solo una forma equivalente para un entorno Lovable/Supabase ya autenticado.

```bash
npx --yes supabase@latest functions deploy sitemap --project-ref pwkqbcgjrhoyxrsmcypw
npx --yes supabase@latest functions deploy prerender --project-ref pwkqbcgjrhoyxrsmcypw
```

Para migraciones, usar la herramienta gestionada de Lovable/Supabase que registre/aplique los archivos SQL en orden. Evitar pegar SQL manual en dashboard.

## Checklist QA post-publish

Ejecutar despues de que Lovable confirme migraciones, Edge Functions y publish si procede.

### Cabeceras bot y ramas Worker

```bash
curl -sS -I -A 'OAI-SearchBot/1.0' https://winerim.wine/
curl -sS -I -A 'OAI-SearchBot/1.0' https://winerim.wine/funcionalidades
curl -sS -I -A 'OAI-SearchBot/1.0' https://winerim.wine/blog
curl -sS -I -A 'OAI-SearchBot/1.0' https://winerim.wine/en/blog
curl -sS -I -A 'OAI-SearchBot/1.0' https://winerim.wine/it/blog
curl -sS -I -A 'OAI-SearchBot/1.0' https://winerim.wine/fr/blog
curl -sS -I -A 'OAI-SearchBot/1.0' https://winerim.wine/de/blog
curl -sS -I -A 'OAI-SearchBot/1.0' https://winerim.wine/pt/blog
```

Esperado: HTTP 200, senal de prerender (`x-prerendered: true` o equivalente) y no `x-worker-branch: bot-fallback`.

```bash
curl -sS -I -A 'Googlebot/2.1 (+http://www.google.com/bot.html)' https://winerim.wine/
curl -sS -I -A 'Googlebot/2.1 (+http://www.google.com/bot.html)' https://winerim.wine/funcionalidades
curl -sS -I -A 'Googlebot/2.1 (+http://www.google.com/bot.html)' https://winerim.wine/producto/cloudrim
curl -sS -I -A 'Googlebot/2.1 (+http://www.google.com/bot.html)' https://winerim.wine/producto/savia
```

Esperado: mantener HTTP 200 y prerender para Googlebot.

### Contenido HTML bot

```bash
curl -sS -A 'OAI-SearchBot/1.0' https://winerim.wine/ | rg -i 'Capacidades operativas conectadas|CloudRIM|SAVia|Wine Cellar|Wine Lockers'
curl -sS -A 'OAI-SearchBot/1.0' https://winerim.wine/funcionalidades | rg -i 'CloudRIM|SAVia|Wine Cellar|Wine Lockers'
curl -sS -A 'OAI-SearchBot/1.0' https://winerim.wine/blog | rg -i 'Winerim|article|blog'
```

Esperado: HTML semanticamente rico, no shell SPA vacio.

### Sitemap y futuros

```bash
curl -sS https://winerim.wine/sitemap.xml | rg -n 'como-conservar-una-botella-de-vino-abierta|how-to-preserve-an-open-bottle|mapa-sustituciones-vino-restaurante-biblioteca|wine-substitution-map-restaurant-wine-library' || true
curl -sS https://winerim.wine/sitemap.xml | rg -n '<url>|xhtml:link' | head
```

Esperado antes del 2026-08-03: no aparecen slugs de `learn-wine-preserve-open-bottle` ni `wine-library-substitution-map-restaurant`. Entre 2026-08-03 y 2026-08-10 deben aparecer solo los de 2026-08-03 liberados por fecha. Desde 2026-08-10 deben aparecer ambos lotes segun idioma y hora.

### `llms.txt` y `llms-full.txt`

```bash
curl -sS https://winerim.wine/llms.txt | rg -n 'conservar.*botella|preserve.*open bottle|sustituciones|substitution map' || true
curl -sS https://winerim.wine/llms-full.txt | rg -n 'conservar.*botella|preserve.*open bottle|sustituciones|substitution map' || true
```

Esperado antes de las fechas de publicacion: sin articulos futuros. La regla del proyecto es no actualizar `llms` con articulos futuros.

### Migraciones visibles por datos publicados/futuros

```bash
curl -sS -A 'Googlebot/2.1 (+http://www.google.com/bot.html)' https://winerim.wine/article/como-conservar-una-botella-de-vino-abierta | rg -i 'conservar una botella|noindex|404|not found' || true
curl -sS -A 'Googlebot/2.1 (+http://www.google.com/bot.html)' https://winerim.wine/article/mapa-sustituciones-vino-restaurante-biblioteca | rg -i 'sustituciones|noindex|404|not found' || true
```

Esperado antes de fecha: no deben indexarse como contenido publicado. Despues de fecha/hora, deben renderizar contenido del articulo correspondiente.

### Correcciones DE/PT

```bash
curl -sS https://winerim.wine/de/weinbibliothek/weinstile | rg -i 'Weinstile|weinbibliothek'
curl -sS https://winerim.wine/de/weinbibliothek/weinbegleitung | rg -i 'Weinbegleitung|Pairing'
curl -sS https://winerim.wine/de/weinbegleitung-generator | rg -i 'Weinbegleitung|Generator'
curl -sS https://winerim.wine/pt/gerador-harmonizacoes-ia | rg -i 'harmoniza|gerador'
curl -sS -A 'Googlebot/2.1 (+http://www.google.com/bot.html)' https://winerim.wine/de/article/grundlagen-weinbegleitung-restaurants | rg -n '/de/weinbegleitung-generator|/de/weinbibliothek/weinstile'
curl -sS -A 'Googlebot/2.1 (+http://www.google.com/bot.html)' https://winerim.wine/pt/article/harmonizacoes-basicas-para-restaurantes | rg -n '/pt/gerador-harmonizacoes-ia'
```

Esperado: rutas localizadas correctas, sin `/wine-pairing-generator` generico ni `/de/weinbibliothek/stile`.

### Canonical `www`

```bash
curl -sS -I https://www.winerim.wine/
curl -sS -I http://www.winerim.wine/
curl -sS -I https://www.winerim.wine/producto/cloudrim
```

Esperado: 301 hacia apex y `x-worker-branch: canonical-host-scheme-redirect`.

## Contradicciones / riesgos

- Contradiccion historica ya resuelta: `www` se habia tratado como incidencia de custom domain/Lovable tras deploy Worker, pero la solucion efectiva fue DNS de Cloudflare: `www` cambio de A `185.158.133.1` a A `192.0.2.1`, proxied.
- Contradiccion tecnica detectada en el estado: el Worker ya tenia `OAI-SearchBot`, pero la Edge Function `prerender` publicada no. Por eso CloudRIM/SAVia funcionaban para OAI por rama estatica del Worker, mientras home/funcionalidades/blogs seguian cayendo a fallback.
- Riesgo operativo: aplicar las migraciones sin desplegar `sitemap` y `prerender` deja datos futuros en base pero no actualiza las compuertas Edge locales; hacer ambas cosas juntas reduce exposicion prematura y mantiene paridad bot.
- Riesgo de validacion: `npx supabase@latest --help` se queda sin salida en esta maquina, por lo que el deploy debe hacerse desde Lovable Cloud o entorno ya autenticado, no desde este workspace local.

## Tareas pendientes tras Lovable

- Guardar el resultado de migraciones y deploy de Edge Functions en el handoff/proximo estado del proyecto.
- Ejecutar la checklist QA completa.
- Si OAI sigue en fallback despues del deploy, revisar si el Worker esta invocando la Edge Function publicada correcta y si hay cache que purgar.
- Si los articulos futuros aparecen en sitemap o llms antes de fecha, revertir publicacion de esos enlaces en Edge/llms, no borrar las filas migradas salvo decision explicita.
