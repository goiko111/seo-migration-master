# Auditoria editorial del blog Winerim

Fecha: 2026-07-11
Agente: Blog editorial Winerim
Alcance: revision de arquitectura de blog, articulos, `published_at`, `article_group`, i18n/rutas, migraciones editoriales y propuesta de calendario.

## Estado actual

- El blog React vive en `src/pages/Blog.tsx`. Primero consulta `public.articles` por `lang`, `published=true`, no entrevistas y `published_at <= now()` mediante `visiblePublishedAtFilter()`.
- `Blog.tsx` contiene un fallback explicito a articulos ES cuando `lang !== es` no devuelve filas. Ese fallback usa `localizedArticlePath(a.slug, lang)`, por lo que puede mostrar titulo/extracto ES y enlazar a una URL internacional que no tiene articulo real en ese idioma.
- El detalle vive en `src/pages/ArticlePage.tsx`. Primero busca el slug especifico del idioma (`foo_en`, `foo_it`, etc.); si no encuentra datos y `lang !== es`, hace fallback al slug ES base. Resultado: una URL como `/en/article/foo` puede mostrar cuerpo ES, UI parcialmente inglesa, `document.lang=es` y canonical ES.
- Las rutas de articulo siguen el patron de `src/lib/articleRoutes.ts`: DB con sufijo (`slug_en`), URL limpia por idioma (`/en/article/slug`), ES sin prefijo (`/article/slug`).
- `supabase/functions/sitemap/index.ts` y `supabase/functions/prerender/index.ts` ya filtran `published_at`, usan `article_group` para hreflang y evitan anunciar hermanos no publicados.
- `cloudflare-worker-v3-hybrid.js` tiene una segunda compuerta con `WORKER_LINK_RELEASES` para rutas futuras y elimina esas URLs del sitemap servido por Worker hasta la fecha.
- `public.articles` ya tiene columnas `lang`, `article_group` y `related_links`; RLS/politicas estan reforzadas en `20260705081417_harden_articles_editorial_permissions.sql`.

## Problemas detectados

1. El fallback ES en `Blog.tsx` es la causa mas directa de que el blog "caiga al espanol" al navegar en idiomas internacionales.
2. El fallback ES en `ArticlePage.tsx` amplifica el problema: si falta una traduccion, la ruta localizada no falla de forma visible, sino que renderiza contenido en otro idioma.
3. El sistema depende de lotes completos de 6 idiomas. Cuando un `article_group` no tiene ES/EN/IT/FR/DE/PT publicados, la UX internacional y el hreflang quedan fragiles.
4. Hay doble release gate: DB/RLS por `published_at` y mapas hardcoded en Edge/Worker. Esto es defensivo y coherente con incidentes anteriores, pero exige actualizar `ARTICLE_RELEASES`/`WORKER_LINK_RELEASES` por cada lote futuro.
5. Varias oleadas historicas se publicaron inicialmente en bloque el 2026-07-01; la migracion `20260702090000_schedule_blog_weekly_mondays.sql` corrige el patron editorial para un tema por lunes con offsets por idioma.

## Decision recomendada

Usar dos defensas simultaneas:

- Eliminar el fallback ES silencioso en frontend.
- Garantizar editorialmente lotes completos de 6 idiomas por `article_group`.

No recomiendo mantener el fallback ES. Tampoco recomiendo confiar solo en "siempre tendremos 6 idiomas", porque cualquier migracion parcial o fallo de Lovable volveria a producir mezcla de idiomas. El comportamiento correcto cuando falta un idioma es:

- En `/en/blog`, `/it/blog`, `/fr/blog`, `/de/blog`, `/pt/blog`: mostrar solo articulos de ese idioma. Si no hay articulos, empty state localizado con enlaces a recursos del mismo idioma.
- En `/en/article/foo` y equivalentes: si `foo_en` no existe o aun no esta liberado, mostrar 404 localizado/noindex o volver al blog del mismo idioma. No renderizar ES.
- En hreflang: listar solo hermanos existentes, publicados y liberados.

## Calendario actual consolidado

| Lunes | Article group | Categoria | Estado |
|---|---|---|---|
| 2026-05-04 | `biblioteca-vino-restaurante-vender-mas` | Biblioteca del vino | Historico reprogramado |
| 2026-05-11 | `uvas-regiones-equipo-sala-vender-vino` | Biblioteca del vino | Historico reprogramado |
| 2026-05-18 | `maridajes-carta-vinos-rentable` | Biblioteca del vino | Historico reprogramado |
| 2026-05-25 | `learn-wine-tasting-five-steps` | Aprender vino | Historico reprogramado |
| 2026-06-01 | `learn-wine-tasting-vocabulary` | Aprender vino | Historico reprogramado |
| 2026-06-08 | `learn-wine-basic-pairing-restaurants` | Aprender vino | Historico reprogramado |
| 2026-06-15 | `learn-wine-wine-types` | Aprender vino | Historico reprogramado |
| 2026-06-22 | `learn-wine-grapes-to-start` | Aprender vino | Historico reprogramado |
| 2026-06-29 | `learn-wine-regions-to-start` | Aprender vino | Historico reprogramado |
| 2026-07-06 | `wine-library-service-guide-floor-team` | Biblioteca del vino | Publicado/pasado |
| 2026-07-13 | `learn-wine-recommend-by-style` | Aprender vino | Futuro inmediato |
| 2026-07-20 | `wine-library-by-the-glass-stock-rotation` | Biblioteca del vino | Futuro |
| 2026-07-27 | `learn-wine-read-label-restaurant` | Aprender vino | Futuro |

Offsets por idioma: ES 09:00, EN 09:05, IT 09:10, FR 09:15, DE 09:20, PT 09:25 en hora Europe/Madrid.

## Lote propuesto

Cada lunes debe ser un solo tema, 6 versiones adaptadas, no traducciones literales. Requisitos recomendados: 1200-1600 palabras por idioma, minimo 900; `author='Winerim'`; `published=true`; `published_at` con offsets; `article_group` comun; `related_links` localizados; enlaces a Biblioteca/Aprender y conversion.

| Lunes | Article group propuesto | Enfoque |
|---|---|---|
| 2026-08-03 | `learn-wine-service-temperature-restaurant` | Temperatura de servicio para sala: rangos, errores, carta digital y verano/invierno por mercado. |
| 2026-08-10 | `wine-library-glassware-decanting-service` | Copas, decantacion y servicio desde Biblioteca: cuando mejora la venta y cuando complica la operacion. |
| 2026-08-17 | `learn-wine-open-bottle-preservation-by-glass` | Botella abierta, vino por copa, merma y control de rotacion para equipos sin sumiller. |
| 2026-08-24 | `wine-library-list-architecture-styles-regions` | Como ordenar carta por estilos, regiones y momentos de consumo sin saturar al cliente. |
| 2026-08-31 | `learn-wine-guest-questions-service-scripts` | Preguntas frecuentes de clientes y guiones de sala: "algo suave", "no entiendo vino", "que va con esto". |
| 2026-09-07 | `wine-library-slow-stock-service-activation` | Activar referencias lentas con argumentos de servicio, maridaje, copa y alternativa rentable. |
| 2026-09-14 | `learn-wine-menu-pairing-service-basics` | Maridaje de menu y carta diaria para restaurantes: reglas utiles, excepciones y lenguaje simple. |
| 2026-09-21 | `wine-library-glossary-floor-training` | Usar el glosario para formar sala: palabras tecnicas convertidas en frases de venta. |

Adaptacion por idioma/pais:

- ES: ejemplos de Espana; Rioja, Ribera, Rias Baixas, Jerez, terrazas y menu del dia cuando encaje.
- EN: enfoque internacional/UK-US; lenguaje de hospitality, by-the-glass, guests, staff training.
- IT: contexto Italia; Chianti, Barolo, Soave, Prosecco, trattoria/enoteca y carta regional.
- FR: contexto Francia/Belgica; Bourgogne, Bordeaux, Loire, Champagne y servicio gastronomique.
- DE: DACH; Riesling, Spatburgunder, trocken/halbtrocken, Sekt, precision de servicio.
- PT: Portugal; Vinho Verde, Douro, Dao, Alentejo, vinho a copo y lenguaje pt-PT.

## SQL preparado

Archivo complementario: `docs/agent_outputs/winerim_blog_editorial_guardrails_2026-07-11.sql`.

Incluye:

- auditoria de `article_group` incompletos;
- auditoria de articulos por debajo de 900 palabras;
- auditoria de lunes y offsets por idioma;
- listado de filas futuras para sincronizar release gates;
- normalizador seguro del calendario conocido hasta 2026-07-27 con `BEGIN` + `ROLLBACK`.

No inserta articulos nuevos porque el contenido largo debe redactarse/revisarse antes. Para crear la oleada de agosto, preparar una migracion data-only siguiendo el patron de `20260707103000_add_wine_library_by_the_glass_stock_rotation.sql` y `20260707090000_add_learn_wine_read_label_restaurant.sql`.

## Pasos de integracion/publicacion

1. Frontend: modificar `Blog.tsx` para eliminar la consulta `fallbackData` a ES en idiomas no ES; anadir empty state localizado.
2. Frontend: modificar `ArticlePage.tsx` para eliminar el fallback a slug ES cuando la ruta solicitada es internacional; si falta traduccion, 404 localizado/noindex.
3. Tests: anadir guardrail para que `Blog.tsx` no contenga fallback ES y `ArticlePage.tsx` no contenga "Fallback to Spanish base slug".
4. Contenido: redactar lote completo de 6 idiomas por `article_group` con 1200-1600 palabras y enlaces localizados.
5. SQL/Lovable: aplicar migracion data-only de nuevos articulos con `published_at` futuro en lunes + offsets.
6. Edge/Worker: actualizar `ARTICLE_RELEASES` en `sitemap` y `prerender`, y `WORKER_LINK_RELEASES` en Worker para cada slug futuro si se mantiene la doble compuerta.
7. Publicar desde Lovable frontend + Edge Functions `sitemap` y `prerender`; desplegar Worker solo con `wrangler.winerim.toml` y dry-run previo.
8. QA: validar `/blog`, `/en/blog`, `/it/blog`, `/fr/blog`, `/de/blog`, `/pt/blog`; validar una URL futura antes/despues de fecha; validar sitemap sin futuros antes de fecha y hreflang tras fecha.

## Nota de alcance

En esta pasada no se han tocado archivos compartidos de React, Edge, Worker ni migraciones reales. Solo se crean artefactos bajo `docs/agent_outputs/` para que la integracion se apruebe y se ejecute de forma coordinada.
