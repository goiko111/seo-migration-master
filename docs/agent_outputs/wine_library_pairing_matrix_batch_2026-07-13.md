# Agente 4 - Biblioteca del vino: matriz de maridaje 2026-08-24

## Hechos

- Se leyeron `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md` antes de actuar.
- El calendario bloqueado reserva el lunes `2026-08-24` para `wine-library-pairing-matrix-texture-acidity-fat`.
- Las migraciones recientes de Biblioteca del vino usan `public.articles`, no crean tablas nuevas y hacen `INSERT ... ON CONFLICT (slug) DO UPDATE`.
- El patron local anade de forma defensiva `lang`, `article_group` y `related_links` si faltan.
- El patron local publica con `published = true` y `published_at` futuro, con offsets por idioma: ES 09:00, EN 09:05, IT 09:10, FR 09:15, DE 09:20 y PT 09:25.
- Las rutas publicas internacionales retiran el sufijo DB `_{lang}`. Ejemplo: `pairing-matrix-texture-acidity-fat-restaurant_en` se sirve como `/en/article/pairing-matrix-texture-acidity-fat-restaurant`.
- Se creo la migracion data-only `supabase/migrations/20260713125000_add_wine_library_pairing_matrix_texture_acidity_fat.sql`.
- No se tocaron sitemap, prerender, Worker ni componentes React.

## Decisiones

- Fecha definitiva del lote: `2026-08-24`, no la fecha antigua `2026-08-10` que aparecia en la propuesta previa.
- `article_group`: `wine-library-pairing-matrix-texture-acidity-fat`.
- Imagen reutilizada segun patron de Biblioteca: `https://winerim.wine/blog/carta-vinos-perfecta.jpg`.
- No se incluyeron GRANT/RLS porque el lote es un upsert sobre `public.articles`; las politicas ya viven en migraciones de hardening existentes.
- El contenido se redacto como piezas largas adaptadas por mercado/idioma, con ejemplos locales y cierre hacia Biblioteca, maridajes, estilos, guia de servicio, generador de maridajes, analisis de carta, SAVia y demo.

## Lote creado

| Idioma | DB slug | Ruta publica | published_at |
| --- | --- | --- | --- |
| ES | `matriz-maridaje-textura-acidez-grasa-restaurante` | `/article/matriz-maridaje-textura-acidez-grasa-restaurante` | `2026-08-24T09:00:00+02:00` |
| EN | `pairing-matrix-texture-acidity-fat-restaurant_en` | `/en/article/pairing-matrix-texture-acidity-fat-restaurant` | `2026-08-24T09:05:00+02:00` |
| IT | `matrice-abbinamenti-texture-acidita-grasso-ristorante_it` | `/it/article/matrice-abbinamenti-texture-acidita-grasso-ristorante` | `2026-08-24T09:10:00+02:00` |
| FR | `matrice-accords-texture-acidite-gras-restaurant_fr` | `/fr/article/matrice-accords-texture-acidite-gras-restaurant` | `2026-08-24T09:15:00+02:00` |
| DE | `pairing-matrix-textur-saeure-fett-restaurant_de` | `/de/article/pairing-matrix-textur-saeure-fett-restaurant` | `2026-08-24T09:20:00+02:00` |
| PT | `matriz-harmonizacao-textura-acidez-gordura-restaurante_pt` | `/pt/article/matriz-harmonizacao-textura-acidez-gordura-restaurante` | `2026-08-24T09:25:00+02:00` |

## Release gates pendientes

Anadir en una tarea posterior, fuera del scope de este agente:

1. `supabase/functions/prerender/index.ts`
   - `LINK_RELEASES` con las seis rutas publicas.
   - `ARTICLE_RELEASES` con los seis slugs DB.
2. `supabase/functions/sitemap/index.ts`
   - `ARTICLE_RELEASES` con los seis slugs DB.
3. `cloudflare-worker-v3-hybrid.js`
   - `WORKER_LINK_RELEASES` con las seis rutas publicas.

Entradas previstas para rutas publicas:

```ts
'/article/matriz-maridaje-textura-acidez-grasa-restaurante': '2026-08-24T09:00:00+02:00',
'/en/article/pairing-matrix-texture-acidity-fat-restaurant': '2026-08-24T09:05:00+02:00',
'/it/article/matrice-abbinamenti-texture-acidita-grasso-ristorante': '2026-08-24T09:10:00+02:00',
'/fr/article/matrice-accords-texture-acidite-gras-restaurant': '2026-08-24T09:15:00+02:00',
'/de/article/pairing-matrix-textur-saeure-fett-restaurant': '2026-08-24T09:20:00+02:00',
'/pt/article/matriz-harmonizacao-textura-acidez-gordura-restaurante': '2026-08-24T09:25:00+02:00',
```

Entradas previstas para slugs DB:

```ts
'matriz-maridaje-textura-acidez-grasa-restaurante': '2026-08-24T09:00:00+02:00',
'pairing-matrix-texture-acidity-fat-restaurant_en': '2026-08-24T09:05:00+02:00',
'matrice-abbinamenti-texture-acidita-grasso-ristorante_it': '2026-08-24T09:10:00+02:00',
'matrice-accords-texture-acidite-gras-restaurant_fr': '2026-08-24T09:15:00+02:00',
'pairing-matrix-textur-saeure-fett-restaurant_de': '2026-08-24T09:20:00+02:00',
'matriz-harmonizacao-textura-acidez-gordura-restaurante_pt': '2026-08-24T09:25:00+02:00',
```

## Hipotesis

- Con `published_at` futuro mas sin release gates, React, prerender y sitemap deberian ocultar el lote hasta fecha si el codigo desplegado tiene los filtros actuales.
- La doble compuerta sigue siendo preferible porque el proyecto ya usa mapas hardcoded para impedir exposicion prematura.
- Los enlaces internos localizados ayudan a que `article_group` y `hreflang` se comporten bien cuando se active el lote.

## Tareas pendientes

- Aplicar la migracion en Lovable/Supabase cuando corresponda.
- Anadir los release gates anteriores antes de publicar o desplegar el lote.
- Validar tras publish:
  - URLs humanas por idioma;
  - Googlebot y `OAI-SearchBot` en las seis rutas;
  - canonical y `hreflang` por `article_group`;
  - sitemap sin URLs futuras antes de `2026-08-24`;
  - ausencia de fallback silencioso a ES en rutas internacionales.
