# Biblioteca del vino - siguiente lote

Fecha de trabajo: 2026-07-13
Agente: AGENTE 3 - Biblioteca del vino, siguiente lote
Scope: migracion data-only nueva e informe. No se tocaron `prerender`, `sitemap`, Worker gates ni `llms`.

## Contexto revisado

- `PROJECT_CONTEXT.md`
- `CURRENT_STATE.md`
- `DECISIONS_LOG.md`
- `NEXT_STEPS.md`
- Migraciones previas de Biblioteca:
  - `20260713101000_add_wine_library_substitution_map.sql`
  - `20260713125000_add_wine_library_pairing_matrix_texture_acidity_fat.sql`
  - lotes relacionados de Aprender vino y blog para confirmar cadencia semanal.

## Hueco editorial elegido

El siguiente hueco editorial posterior a 2026-08-31 es el lunes 2026-09-07. El calendario permite usarlo para Biblioteca del vino porque:

- 2026-08-31 queda ocupado por blog operativo.
- La cadencia marcada es un unico tema semanal por lunes.
- 2026-09-07 aparecia como hueco de Biblioteca en los calendarios de trabajo.

## Migracion creada

`supabase/migrations/20260713131825_add_wine_library_list_architecture_style_country_price.sql`

## Tema y article_group

Tema: arquitectura de carta de vinos por estilo, pais y precio para restaurantes, conectada con stock, margen, sustituciones y SAVia.

`article_group`: `wine-library-list-architecture-style-country-price`

## Fechas programadas

- ES: `2026-09-07T09:00:00+02:00`
- EN: `2026-09-07T09:05:00+02:00`
- IT: `2026-09-07T09:10:00+02:00`
- FR: `2026-09-07T09:15:00+02:00`
- DE: `2026-09-07T09:20:00+02:00`
- PT: `2026-09-07T09:25:00+02:00`

Europe/Madrid esta en CEST el 2026-09-07, por eso el offset usado es `+02:00`.

## Slugs preparados

- ES: `arquitectura-carta-vinos-estilo-pais-precio-restaurante`
- EN: `restaurant-wine-list-architecture-style-country-price_en`
- IT: `architettura-carta-vini-stile-paese-prezzo-ristorante_it`
- FR: `architecture-carte-vins-style-pays-prix-restaurant_fr`
- DE: `weinkarten-architektur-stil-land-preis-restaurant_de`
- PT: `arquitetura-carta-vinhos-estilo-pais-preco-restaurante_pt`

## Notas de integracion

- La migracion es estrictamente data-only: no cambia schema, no crea funciones y no toca permisos; solo inserta/actualiza filas en `public.articles`.
- Sigue el patron editorial existente: `WITH rows`, seis idiomas, `author='Winerim'`, `published=true`, `published_at` futuro, `article_group` comun y `related_links` localizados.
- Los cuerpos son largos y adaptados por idioma, no una traduccion literal corta.
- `related_links` apunta a Biblioteca, estilos, regiones, uvas/castas, maridajes/harmonizaciones, analisis de carta, stock muerto, SAVia y demo en rutas localizadas.
- No se tocaron release gates. Si este lote se aplica con antelacion en produccion, queda pendiente coordinar la doble compuerta tecnica en `prerender`, `sitemap` y Worker antes de desplegar.
