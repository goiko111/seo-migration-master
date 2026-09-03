# SEO / LLM production QA continuation - 2026-07-13

Agente 1: SEO/Search Console indirecto y produccion.

## Alcance y metodo

- Se leyeron antes de validar: `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- No se uso Search Console real.
- No se uso Chrome.
- No se edito codigo.
- Unico archivo escrito por este agente: `docs/agent_outputs/seo_llm_production_qa_2026-07-13_continuation.md`.
- Metodo: `curl` para cabeceras, estado, redirects, `X-Robots-Tag`, `x-worker-branch` y `x-prerendered`; `fetch` de Node para confirmar `title`, canonical, robots meta y `hreflang`.

## Hechos principales

### Rutas principales

Produccion responde correctamente para Googlebot y `OAI-SearchBot/1.0` en las rutas criticas:

| URL | Googlebot | OAI-SearchBot |
| --- | --- | --- |
| `/` | `200`, `x-worker-branch: bot-prerender`, `x-prerendered: true` | `200`, `bot-prerender`, `x-prerendered: true` |
| `/funcionalidades` | `200`, `bot-prerender`, `x-prerendered: true` | `200`, `bot-prerender`, `x-prerendered: true` |
| `/producto/cloudrim` | `200`, `worker-static-prerender`, `x-prerendered: true` | `200`, `worker-static-prerender`, `x-prerendered: true` |
| `/producto/savia` | `200`, `worker-static-prerender`, `x-prerendered: true` | `200`, `worker-static-prerender`, `x-prerendered: true` |
| `/blog` | `200`, `bot-prerender`, `x-prerendered: true` | `200`, `bot-prerender`, `x-prerendered: true` |
| `/en/blog`, `/it/blog`, `/fr/blog`, `/de/blog`, `/pt/blog` | `200`, `bot-prerender`, `x-prerendered: true` | `200`, `bot-prerender`, `x-prerendered: true` |

Confirmacion de contenido:

- Home contiene `Capacidades operativas`.
- `/funcionalidades` contiene `CloudRIM`, `SAVia` y `Wine Cellar`.
- CloudRIM contiene `CloudRIM`, `albaranes` y `facturas`.
- SAVia contiene `SAVia` y `decisiones`.
- Blogs ES/EN/IT/FR/DE/PT devuelven contenido localizado y no shell vacio.

### Canonical, robots y hreflang

Con `fetch` usando Googlebot:

- Home, funcionalidades, CloudRIM, SAVia, blogs por idioma y articulos publicados devuelven `robots_meta: index, follow`.
- Cada URL revisada tiene canonical propio correcto.
- Cada URL revisada tiene `hreflang_count=7` para los alternates esperados.

Ejemplos:

- `/funcionalidades`: canonical `https://winerim.wine/funcionalidades`, `index, follow`, 7 hreflang.
- `/producto/cloudrim`: canonical `https://winerim.wine/producto/cloudrim`, `index, follow`, 7 hreflang.
- `/article/recomendar-vino-por-estilos-restaurante`: canonical propio, `index, follow`, 7 hreflang.

### www redirect

- `https://www.winerim.wine/` devuelve `301` a `https://winerim.wine/`.
- `http://www.winerim.wine/` devuelve `301` a `https://winerim.wine/`.
- `https://www.winerim.wine/producto/cloudrim` devuelve `301` a `https://winerim.wine/producto/cloudrim`.
- Las respuestas incluyen `X-Worker-Branch: canonical-host-scheme-redirect`.
- No se observo `421 Project not found`.

### Articulo publicado el 2026-07-13

Se revalido el lote `learn-wine-recommend-by-style`:

- `https://winerim.wine/article/recomendar-vino-por-estilos-restaurante`: `200`, `bot-prerender`, `x-prerendered: true`, titulo correcto y contenido con `Resumen para IA`.
- `https://winerim.wine/en/article/recommend-wine-by-style-restaurant`: `200`, titulo correcto y contenido con `AI summary`.
- `https://winerim.wine/de/article/wein-nach-stil-empfehlen-restaurant`: `200`, titulo aleman correcto y contenido localizado.
- Las tres URLs estan presentes en `sitemap.xml`.

### Sitemap, llms y llms-full

- `https://winerim.wine/sitemap.xml`: `200`, `application/xml`, `x-worker-branch: sitemap-worker-detail-bridge`, `X-Robots-Tag: index, follow`.
- Conteo observado: `2377` bloques `<url>` y `13592` alternates `hreflang`.
- Estan presentes: home, funcionalidades, CloudRIM, SAVia, blogs ES/EN/IT/FR/DE/PT y articulos publicados del 2026-07-13.
- `https://winerim.wine/llms.txt`: `200`, `text/plain`, `120` lineas.
- `https://winerim.wine/llms-full.txt`: `200`, `text/plain`, `175` lineas.
- Ambos llms siguen con `Last updated: 2026-07-03`.

No aparecen en `sitemap.xml`, `llms.txt` ni `llms-full.txt` estos slugs/grupos futuros probados:

- `como-conservar-una-botella-de-vino-abierta`
- `how-to-preserve-an-open-bottle-of-wine`
- `mapa-sustituciones-vino-restaurante-biblioteca`
- `wein-substitutionskarte-restaurant-weinbibliothek`
- `temperatura-servicio-vino-restaurante`
- `wine-service-temperature-restaurant`
- `matriz-maridaje-textura-acidez-grasa-restaurante`
- `pairing-matrix-textur-saeure-fett-restaurant`
- `fugas-margen-carta-vinos-restaurante`
- `wine-list-margin-leaks-restaurant`
- `learn-wine-preserve-open-bottle`
- `wine-library-substitution-map-restaurant`
- `learn-wine-service-temperature-restaurant`
- `wine-library-pairing-matrix-texture-acidity-fat`

### Slugs futuros directos

Los slugs futuros conocidos devuelven `404`, `X-Robots-Tag: noindex, follow` y `x-worker-branch: future-article-not-found` para humano, Googlebot y OAI:

- `/article/como-conservar-una-botella-de-vino-abierta`
- `/en/article/how-to-preserve-an-open-bottle-of-wine`
- `/article/mapa-sustituciones-vino-restaurante-biblioteca`
- `/de/article/wein-substitutionskarte-restaurant-weinbibliothek`
- `/article/temperatura-servicio-vino-restaurante`
- `/en/article/wine-service-temperature-restaurant`
- `/article/matriz-maridaje-textura-acidez-grasa-restaurante`
- `/de/article/pairing-matrix-textur-saeure-fett-restaurant`
- `/article/fugas-margen-carta-vinos-restaurante`
- `/en/article/wine-list-margin-leaks-restaurant`

Un slug inexistente no incluido en gates (`/article/slug-futuro-inexistente-qa-2026-07-13`) devuelve:

- Humano: `200`, `x-worker-branch: spa`.
- Googlebot: `404`, `bot-prerender`, `x-prerendered: true`, `X-Robots-Tag: noindex, follow`.
- OAI: `404`, `bot-prerender`, `x-prerendered: true`, `X-Robots-Tag: noindex, follow`.

## Riesgos

1. `llms.txt` y `llms-full.txt` tienen fecha `Last updated: 2026-07-03`. No rompe indexacion, pero es una senal de frescura incoherente con el estado productivo del 2026-07-13.
2. Los articulos publicados el 2026-07-13 estan en sitemap, pero no en `llms.txt` ni `llms-full.txt`. Puede ser intencional si llms es una referencia de producto curada; si se espera que LLMs descubran tambien contenido editorial reciente, falta actualizacion.
3. Los slugs futuros conocidos responden `text/plain` en vez de HTML noindex localizado. SEO esta cubierto por `404` + `X-Robots-Tag`, pero hay diferencia con la decision documentada de pagina HTML noindex localizada.
4. Slugs `/article/...` inexistentes no conocidos siguen devolviendo `200` SPA para usuario humano/no bot. Googlebot y OAI reciben `404/noindex`, pero otros crawlers no cubiertos por el patron bot podrian ver shell `200`.

## Contradicciones

1. El informe anterior del 2026-07-13 indicaba que `OAI-SearchBot` caia a `bot-fallback` en home, funcionalidades y blogs. En esta revalidacion ya devuelve `bot-prerender` con `x-prerendered: true`; la incidencia esta cerrada en produccion.
2. `CURRENT_STATE.md` dice que articulos futuros directos responden `404` con `X-Robots-Tag: noindex, follow`; eso se confirma. Pero tambien habla de HTML noindex localizado para rutas no disponibles; los futuros conocidos observados responden `text/plain`.
3. `llms.txt` enumera CloudRIM/SAVia y capacidades operativas, pero conserva `Last updated: 2026-07-03`; la cobertura de producto esta actualizada en contenido, no en fecha declarada.

## Tareas pendientes concretas

1. En Search Console real, cuando proceda, solicitar revalidacion/indexacion de:
   - `https://winerim.wine/`
   - `https://winerim.wine/funcionalidades`
   - `https://winerim.wine/producto/cloudrim`
   - `https://winerim.wine/producto/savia`
   - `https://winerim.wine/blog`
   - `https://winerim.wine/en/blog`
   - `https://winerim.wine/it/blog`
   - `https://winerim.wine/fr/blog`
   - `https://winerim.wine/de/blog`
   - `https://winerim.wine/pt/blog`
   - articulos publicados del grupo `learn-wine-recommend-by-style`.
2. Actualizar la fecha `Last updated` de `llms.txt` y `llms-full.txt` o documentar que la fecha solo cambia en releases mayores de llms.
3. Decidir si `llms-full.txt` debe incluir articulos editoriales publicados recientes, empezando por `learn-wine-recommend-by-style`.
4. Unificar la respuesta de articulo futuro/no disponible: mantener `404/noindex`, pero decidir si debe ser `text/plain` o HTML localizado de forma consistente.
5. Para robustez fuera de Googlebot/OAI, valorar que rutas `/article/...` inexistentes devuelvan `404/noindex` tambien a usuario humano o a mas UAs crawler, no solo a bots reconocidos.
6. En cada fecha programada futura, repetir QA puntual:
   - 2026-08-03 `learn-wine-preserve-open-bottle`
   - 2026-08-10 `wine-library-substitution-map-restaurant`
   - 2026-08-17 `learn-wine-service-temperature-restaurant`
   - 2026-08-24 `wine-library-pairing-matrix-texture-acidity-fat`
   - 2026-08-31 `wine-list-margin-leaks-restaurant`
