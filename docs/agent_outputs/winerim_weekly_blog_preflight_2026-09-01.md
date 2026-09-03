# Winerim semanal: preflight editorial del 2026-09-07

Fecha de revisión: 2026-09-01 07:03 CEST

## Entrega seleccionada

- `article_group`: `wine-library-list-architecture-style-country-price`.
- Tema único editorial: arquitectura de carta de vinos por estilo, país y precio para restaurantes.
- Migración data-only existente: `supabase/migrations/20260713131825_add_wine_library_list_architecture_style_country_price.sql`.
- Categoría: Biblioteca del vino.
- Publicación programada: ES 2026-09-07 09:00, EN 09:05, IT 09:10, FR 09:15, DE 09:20 y PT 09:25, zona Europe/Madrid.
- ES: título `Arquitectura de carta de vinos por estilo, pais y precio para restaurantes`.
- ES excerpt: `Una guia de Biblioteca del vino para ordenar la carta sin perder criterio comercial: estilos, paises, franjas de precio, stock, margen, sustituciones y recomendaciones con SAVia.`
- El body completo y las cinco adaptaciones de mercado están en la migración citada; no se creó una publicación paralela.

## Mercados y calidad

- Seis cuerpos completos: ES 1181, EN 1107, IT 999, FR 1072, DE 942 y PT 1016 palabras aproximadas.
- Cada idioma tiene título, excerpt, body, slug, `published_at`, `article_group` y `related_links` localizados.
- Adaptaciones: España, mercado internacional anglófono, Italia, Francia/mercado francófono, DACH y Portugal.
- Enlaces internos cubren Biblioteca, estilos, regiones, uvas, maridajes, análisis de carta, calculadora de stock muerto, SAVia y demo, con rutas localizadas por mercado.
- El texto incluye definición directa, método operativo, FAQ y resumen para IA; satisface SEO convencional e identificación temática por LLMs.

## No duplicación y gates

- 2026-09-07 ya está reservado por este lote; crear otro artículo hoy duplicaría la cadencia.
- 2026-09-14 ya está reservado por `learn-wine-guest-questions-service-scripts`.
- 2026-09-28 ya está reservado por el Blog `slow-stock-pos-cloudrim-savia-rotation`.
- La propuesta de Biblioteca del 2026-09-21 sobre referencias lentas se congela: canibaliza el Blog del 2026-09-28 y no existe migración/gate implementado.
- Pre-release productivo del lote 2026-09-07: Googlebot y OAI devuelven `404`, `future-article-not-found` y `noindex, follow` en ES/EN/IT/FR/DE/PT.
- Las seis rutas están ausentes de sitemap, `llms.txt` y `llms-full.txt` antes de fecha.
- Los gates están presentes y alineados en Worker, `prerender` y `sitemap` con los seis offsets.
- QA post-release de los lotes 2026-08-24 y 2026-08-31: bots reciben `200`, prerender localizado, canonical propio y siete hreflang; sitemap contiene sus seis rutas.
- El supuesto marcador visible del shell humano era un falso positivo: aparece dentro del script limpiador, no en texto visible ni en nodos de contenido. `TELEGRAM_BOT_TOKEN` no aparece.

## Estado y límites

- Lote 2026-09-07 listo para revisión/aprobación editorial previa a publicación.
- No se aplicó migración, publicó, desplegó, modificó Worker/sitemap/prerender/`llms`, tocó credenciales ni usó Lovable.
- `llms.txt` y `llms-full.txt` siguen con `Last updated: 2026-07-03`; no deben anunciar el lote antes de la validación post-release.
