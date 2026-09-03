# Aprender vino batch: service temperature in restaurants

Agent: Aprender vino  
Date prepared: 2026-07-13  
Target publish Monday: 2026-08-17  
Article group: `learn-wine-service-temperature-restaurant`

## Hechos

- Se creo la migracion data-only `supabase/migrations/20260713124000_add_learn_wine_service_temperature_restaurant.sql`.
- La migracion inserta/actualiza seis filas en `public.articles` con `author='Winerim'`, `published=true`, `article_group='learn-wine-service-temperature-restaurant'` y `related_links` localizados.
- Fechas programadas con offsets Europe/Madrid:
  - ES: `2026-08-17T09:00:00+02:00`
  - EN: `2026-08-17T09:05:00+02:00`
  - IT: `2026-08-17T09:10:00+02:00`
  - FR: `2026-08-17T09:15:00+02:00`
  - DE: `2026-08-17T09:20:00+02:00`
  - PT: `2026-08-17T09:25:00+02:00`
- Slugs preparados:
  - ES: `/article/temperatura-servicio-vino-restaurante`
  - EN: `/en/article/wine-service-temperature-restaurant_en`
  - IT: `/it/article/temperatura-servizio-vino-ristorante_it`
  - FR: `/fr/article/temperature-service-vin-restaurant_fr`
  - DE: `/de/article/serviertemperatur-wein-restaurant_de`
  - PT: `/pt/article/temperatura-servico-vinho-restaurante_pt`
- El contenido cubre rangos por estilo, errores de sala, rapidez operativa, copas, cubitera/balde/secchiello/seau/Kuehler, cava/espumosos, tintos ligeros, blancos con madera, dulces y generosos/fortificados.
- No se tocaron sitemap, prerender, Worker, React, `llms.txt` ni `llms-full.txt`.

## Decisiones

- Mantener este lote dentro de `Aprender vino`, no como ficha de `Biblioteca del vino`, porque es una guia operativa de sala.
- Usar `public/blog/personal-recomiende-vino.jpg` como imagen existente y coherente con formacion de equipo.
- Mantener un solo tema editorial para el lunes 2026-08-17 y conservar los offsets ya documentados por idioma.
- Usar enlaces internos ya localizados hacia Aprender vino, guia de servicio, estilos, calculadora por copa, SAVia, analisis de carta y demo.

## Hipotesis

- Al aplicar la migracion junto con release gates, `published_at` y la compuerta de Worker/Edge deberian evitar exposicion prematura.
- La adaptacion por mercado deberia aumentar utilidad frente a una traduccion literal: ES enfatiza cava/generosos, IT Franciacorta/Trento/Marsala, FR Champagne/Crémant/VdN, DE Riesling/Sekt/Spätburgunder y PT Vinho Verde/Bairrada/Porto/Madeira.
- El lote reforzara la recuperabilidad por SEO/LLM para consultas practicas sobre temperatura de servicio, copas y errores de sala.

## Tareas pendientes

- Antes de aplicar en Lovable/Supabase, anadir release gates del 2026-08-17 sin tocar este lote de datos:
  - `supabase/functions/prerender/index.ts`
  - `supabase/functions/sitemap/index.ts`
  - `cloudflare-worker-v3-hybrid.js`
- Aplicar en Lovable/Supabase las migraciones editoriales pendientes en orden, incluida esta nueva.
- Desplegar Edge Functions `sitemap` y `prerender` tras actualizar gates.
- Confirmar que `public/llms.txt` y `public/llms-full.txt` no anuncian este lote antes del 2026-08-17.
- Revalidar en fecha: seis URLs humanas, Googlebot/OAI prerender, canonical propio, `hreflang` por `article_group`, sitemap sin URLs prematuras antes de release y enlaces internos localizados.
