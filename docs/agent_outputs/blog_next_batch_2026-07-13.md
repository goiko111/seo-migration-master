# Agente 5 - Blog semanal comercial

Fecha: 2026-07-13

Scope ejecutado: migracion data-only para el siguiente lote comercial de blog semanal, sin tocar gates, Worker, sitemap, prerender, frontend ni `llms`.

## Hechos

- Se leyeron los documentos de coordinacion antes de actuar:
  - `PROJECT_CONTEXT.md`;
  - `CURRENT_STATE.md`;
  - `DECISIONS_LOG.md`;
  - `NEXT_STEPS.md`.
- Se revisaron migraciones y outputs editoriales de blog/Biblioteca/Aprender.
- Se reviso el changelog actual de Supabase antes de actuar; no se detecto ningun breaking change relevante para una migracion data-only sobre filas existentes de `public.articles`.
- El calendario bloqueado indica:
  - 2026-09-07 reservado para Biblioteca: `wine-library-wine-list-role-taxonomy`;
  - 2026-09-14 reservado para Aprender vino: `learn-wine-guest-questions-service-scripts`;
  - 2026-09-21 reservado para Biblioteca: `wine-library-slow-stock-service-activation`.
- Correccion aplicada por instruccion posterior del usuario:
  - el lote de blog no usa 2026-09-21;
  - se programa en lunes 2026-09-28 para mantener un solo tema editorial por lunes.
- Se creo la migracion con `supabase migration new` y se movio a timestamp unico al detectar otro archivo no trackeado con el mismo prefijo `20260713131823`:
  - `supabase/migrations/20260713152451_add_blog_slow_stock_rotation_restaurant.sql`.

## Lote creado

- `article_group`: `slow-stock-pos-cloudrim-savia-rotation`.
- Tema: stock dormido en bodega y como convertirlo en rotacion con TPV/POS, CloudRIM, Winerim Core, SAVia, vino por copa y recomendaciones de sala.
- Fecha: lunes 2026-09-28.
- Offsets Europe/Madrid:
  - ES: `2026-09-28T09:00:00+02:00`;
  - EN: `2026-09-28T09:05:00+02:00`;
  - IT: `2026-09-28T09:10:00+02:00`;
  - FR: `2026-09-28T09:15:00+02:00`;
  - DE: `2026-09-28T09:20:00+02:00`;
  - PT: `2026-09-28T09:25:00+02:00`.
- Categoria: estrategia/comercial.
- Imagen existente reutilizada:
  - `https://winerim.wine/blog/vinos-muertos-carta.jpg`.

## Slugs y rutas esperadas

- ES:
  - DB slug: `stock-dormido-bodega-rotacion-tpv-cloudrim-savia`;
  - ruta: `/article/stock-dormido-bodega-rotacion-tpv-cloudrim-savia`.
- EN:
  - DB slug: `sleeping-cellar-stock-pos-cloudrim-savia-rotation_en`;
  - ruta: `/en/article/sleeping-cellar-stock-pos-cloudrim-savia-rotation`.
- IT:
  - DB slug: `stock-dormiente-cantina-rotazione-tpv-cloudrim-savia_it`;
  - ruta: `/it/article/stock-dormiente-cantina-rotazione-tpv-cloudrim-savia`.
- FR:
  - DB slug: `stock-dormant-cave-rotation-tpv-cloudrim-savia_fr`;
  - ruta: `/fr/article/stock-dormant-cave-rotation-tpv-cloudrim-savia`.
- DE:
  - DB slug: `schlafender-kellerbestand-rotation-pos-cloudrim-savia_de`;
  - ruta: `/de/article/schlafender-kellerbestand-rotation-pos-cloudrim-savia`.
- PT:
  - DB slug: `stock-adormecido-adega-rotacao-pos-cloudrim-savia_pt`;
  - ruta: `/pt/article/stock-adormecido-adega-rotacao-pos-cloudrim-savia`.

## Enlaces localizados

Cada idioma incluye `related_links` localizados hacia:

- calculadora de stock muerto;
- diagnostico de vino por copa;
- guia para conectar carta, stock, ventas y margen;
- CloudRIM;
- SAVia;
- integraciones TPV/POS;
- demo.

Los enlaces del cuerpo usan las mismas rutas localizadas para evitar depender de fallback de idioma.

## Decisiones

- No se tocan gates porque la tarea lo pidio expresamente.
- No se actualizan `llms.txt` ni `llms-full.txt` porque las URLs son futuras.
- Se mantiene el lote como blog comercial/operativo, no Biblioteca ni Aprender vino.
- Se evita 2026-09-21 para no contradecir el calendario bloqueado de Biblioteca.

## QA ejecutado

- Pendiente de aplicar en base de datos real desde Lovable/Supabase.
- Validacion Node de estructura:
  - 6 slugs;
  - 6 cuerpos;
  - 6 bloques `related_links`;
  - idiomas en orden `es,en,it,fr,de,pt`;
  - offsets exactos `09:00`, `09:05`, `09:10`, `09:15`, `09:20`, `09:25` el 2026-09-28.
- Recuento aproximado de palabras por cuerpo:
  - ES: 1305;
  - EN: 1301;
  - IT: 1176;
  - FR: 1339;
  - DE: 1130;
  - PT: 1238.
- `git diff --no-index --check` sobre la migracion nueva y este informe: sin advertencias de whitespace.
- `supabase migration list --local` no pudo completarse porque no hay Postgres local escuchando en `127.0.0.1:54322`.
- Se verifico que esta entrega no edita gates, Worker, sitemap, prerender, frontend ni `llms`.

## Riesgos y siguientes pasos

- Como no se tocaron release gates por instruccion expresa, antes de aplicar/publicar con antelacion conviene coordinar si las compuertas actuales ya cubren suficientemente este lote futuro.
- No solicitar indexacion ni anadir a `llms` antes del 2026-09-28 y antes de validar URL humana, prerender, canonical y hreflang.
