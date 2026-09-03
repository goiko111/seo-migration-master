# Calendario editorial bloqueado 2026-08 / 2026-09

Fecha: 2026-07-11

## Hechos

- El calendario vigente ya tiene lotes hasta 2026-07-27:
  - 2026-07-13: Aprender vino, recomendar por estilo.
  - 2026-07-20: Biblioteca del vino, vino por copa, stock y rotacion.
  - 2026-07-27: Aprender vino, leer etiqueta en restaurante.
- El lote completo preparado en esta sesion es:
  - 2026-08-03: Aprender vino, conservar botella abierta.
- Las propuestas de Biblioteca y Blog coincidian inicialmente en 2026-08-03, pero no deben publicarse ese mismo lunes.

## Decision

- Winerim publicara un solo tema editorial por lunes.
- Cada tema debe tener seis versiones: ES, EN, IT, FR, DE, PT.
- Offsets:
  - ES: 09:00 Europe/Madrid;
  - EN: 09:05;
  - IT: 09:10;
  - FR: 09:15;
  - DE: 09:20;
  - PT: 09:25.
- No se actualizan `llms.txt` ni `llms-full.txt` con articulos futuros.

## Calendario propuesto

| Fecha | Cluster | Article group | Estado |
|---|---|---|---|
| 2026-08-03 | Aprender vino | `learn-wine-preserve-open-bottle` | Migracion completa preparada |
| 2026-08-10 | Biblioteca del vino | `wine-library-substitution-map-restaurant` | Siguiente a redactar en migracion completa |
| 2026-08-17 | Aprender vino / Blog practico | `learn-wine-service-temperature-restaurant` | Reprogramado desde propuesta blog |
| 2026-08-24 | Biblioteca del vino | `wine-library-pairing-matrix-texture-acidity-fat` | Propuesta pendiente de redaccion |
| 2026-08-31 | Blog comercial/operativo | `wine-list-margin-leaks-restaurant` | Nuevo tema sugerido |
| 2026-09-07 | Biblioteca del vino | `wine-library-wine-list-role-taxonomy` | Propuesta pendiente de redaccion |
| 2026-09-14 | Aprender vino | `learn-wine-guest-questions-service-scripts` | Propuesta pendiente de redaccion |
| 2026-09-21 | Biblioteca del vino | `wine-library-slow-stock-service-activation` | Propuesta pendiente de redaccion |

## Criterios de calidad

- Minimo recomendado: 900 palabras por idioma.
- Objetivo: 1200-1600 palabras por idioma cuando el tema lo permita.
- No traduccion literal: adaptar ejemplos a ES, EN, IT, FR, DE y PT.
- Cada articulo debe incluir:
  - resumen para IA;
  - secciones con H2 claras;
  - ejemplos de restaurante;
  - relacion con Winerim;
  - FAQ;
  - `related_links` localizados;
  - `article_group` comun;
  - `published_at` con offsets.

## Tareas pendientes

- Crear migracion completa para `wine-library-substitution-map-restaurant` con fecha 2026-08-10.
- Anadir release gates del lote 2026-08-10 en `prerender`, `sitemap` y Worker.
- Crear migracion completa para `learn-wine-service-temperature-restaurant` con fecha 2026-08-17.
- Preparar un lote comercial/operativo de blog para 2026-08-31 sobre fugas de margen en carta de vinos.
