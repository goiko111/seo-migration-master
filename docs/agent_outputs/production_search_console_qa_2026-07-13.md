# QA produccion / Search Console indirecto - 2026-07-13

Agente 2: QA produccion, Search Console indirecto, sitemap/llms/bots.

## Alcance

- Se leyeron antes de actuar: `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- No se edito codigo.
- Unico archivo creado/editado por este agente: `docs/agent_outputs/production_search_console_qa_2026-07-13.md`.
- Metodo principal: `curl -A '<ua>' -D - -o /dev/null` sin seguir redirects, para conservar `status`, `location`, `x-worker-branch`, `x-prerendered` y `content-type`.

## Hechos

### Cabeceras principales

| URL | Humano | Googlebot | OAI-SearchBot |
| --- | --- | --- | --- |
| `https://winerim.wine/` | `200`, `spa`, `text/html` | `200`, `bot-prerender`, `x-prerendered=true`, `text/html` | `200`, `bot-fallback`, sin `x-prerendered`, `text/html` |
| `https://www.winerim.wine/` | `301` -> `https://winerim.wine/`, `canonical-host-scheme-redirect` | `301` -> `https://winerim.wine/`, `canonical-host-scheme-redirect` | `301` -> `https://winerim.wine/`, `canonical-host-scheme-redirect` |
| `https://www.winerim.wine/producto/cloudrim` | `301` -> `https://winerim.wine/producto/cloudrim`, `canonical-host-scheme-redirect` | `301` -> `https://winerim.wine/producto/cloudrim`, `canonical-host-scheme-redirect` | `301` -> `https://winerim.wine/producto/cloudrim`, `canonical-host-scheme-redirect` |
| `https://winerim.wine/funcionalidades` | `200`, `spa`, `text/html` | `200`, `bot-prerender`, `x-prerendered=true`, `text/html` | `200`, `bot-fallback`, sin `x-prerendered`, `text/html` |
| `https://winerim.wine/blog` | `200`, `spa`, `text/html` | `200`, `bot-prerender`, `x-prerendered=true`, `text/html` | `200`, `bot-fallback`, sin `x-prerendered`, `text/html` |
| `https://winerim.wine/en/blog` | `200`, `spa`, `text/html` | `200`, `bot-prerender`, `x-prerendered=true`, `text/html` | `200`, `bot-fallback`, sin `x-prerendered`, `text/html` |
| `https://winerim.wine/it/blog` | `200`, `spa`, `text/html` | `200`, `bot-prerender`, `x-prerendered=true`, `text/html` | `200`, `bot-fallback`, sin `x-prerendered`, `text/html` |
| `https://winerim.wine/fr/blog` | `200`, `spa`, `text/html` | `200`, `bot-prerender`, `x-prerendered=true`, `text/html` | `200`, `bot-fallback`, sin `x-prerendered`, `text/html` |
| `https://winerim.wine/de/blog` | `200`, `spa`, `text/html` | `200`, `bot-prerender`, `x-prerendered=true`, `text/html` | `200`, `bot-fallback`, sin `x-prerendered`, `text/html` |
| `https://winerim.wine/pt/blog` | `200`, `spa`, `text/html` | `200`, `bot-prerender`, `x-prerendered=true`, `text/html` | `200`, `bot-fallback`, sin `x-prerendered`, `text/html` |
| `https://winerim.wine/producto/cloudrim` | `200`, `spa`, `text/html` | `200`, `worker-static-prerender`, `x-prerendered=true`, `text/html` | `200`, `worker-static-prerender`, `x-prerendered=true`, `text/html` |
| `https://winerim.wine/producto/savia` | `200`, `spa`, `text/html` | `200`, `worker-static-prerender`, `x-prerendered=true`, `text/html` | `200`, `worker-static-prerender`, `x-prerendered=true`, `text/html` |
| `https://winerim.wine/sitemap.xml` | `200`, `sitemap-worker-detail-bridge`, `application/xml` | `200`, `sitemap-worker-detail-bridge`, `application/xml` | `200`, `sitemap-worker-detail-bridge`, `application/xml` |
| `https://winerim.wine/llms.txt` | `200`, `static`, `text/plain` | `200`, `static`, `text/plain` | `200`, `static`, `text/plain` |
| `https://winerim.wine/llms-full.txt` | `200`, `static`, `text/plain` | `200`, `static`, `text/plain` | `200`, `static`, `text/plain` |

### `www`

- `https://www.winerim.wine/` ya no devuelve `421`; devuelve `301` a `https://winerim.wine/`.
- La redireccion incluye `x-worker-branch: canonical-host-scheme-redirect`.
- Tambien se valido `https://www.winerim.wine/producto/cloudrim`; devuelve `301` conservando el path hacia el apex.

### Sitemap y llms

- `https://winerim.wine/sitemap.xml` devuelve `200`, `content-type: application/xml; charset=utf-8`, `x-worker-branch: sitemap-worker-detail-bridge`.
- Conteo observado en produccion: `2377` bloques `<url>`.
- `https://winerim.wine/llms.txt` devuelve `200`, `content-type: text/plain; charset=utf-8`, `120` lineas.
- `https://winerim.wine/llms-full.txt` devuelve `200`, `content-type: text/plain; charset=utf-8`, `175` lineas.
- Busqueda contra `sitemap.xml`, `llms.txt` y `llms-full.txt`: sin coincidencias para fechas `2026-08-03`, `2026-08-10`, `2026-08-17`, `2026-08-24`, `2026-08-31`.
- Busqueda contra los grupos futuros documentados: sin coincidencias para `learn-wine-preserve-open-bottle`, `wine-library-substitution-map-restaurant`, `learn-wine-service-temperature-restaurant`, `wine-library-pairing-matrix-texture-acidity-fat`, `wine-list-margin-leaks-restaurant` ni `learn-wine-guest-questions-service-scripts`.
- Busqueda contra los slugs ya definidos localmente para 2026-08-03 y 2026-08-10: sin coincidencias en `sitemap.xml`, `llms.txt` ni `llms-full.txt`.

## Decisiones

- No se realizaron cambios de codigo ni despliegues desde este agente.
- `www` se puede considerar validado en produccion en esta pasada: no hay `421` en root ni en la ruta extra de CloudRIM.
- La validacion para Googlebot esta lista para Search Console en las rutas principales revisadas.
- La paridad para `OAI-SearchBot` no esta cerrada en home, `/funcionalidades` ni blogs; debe esperar al publish de Edge `prerender` que incluya `oai-searchbot`.

## Hipotesis

- La rama `bot-fallback` para `OAI-SearchBot` en home, funcionalidades y blogs coincide con el estado documentado: el Worker reconoce suficiente para productos estaticos, pero la Edge Function `prerender` publicada aun no cubre `OAI-SearchBot`.
- La ausencia de URLs futuras en sitemap/llms indica que las compuertas de publicacion y la decision de no actualizar `llms` con lotes futuros siguen funcionando en produccion.
- Si `www` vuelve a `421`, la causa probable sera recidiva de configuracion DNS/custom domain/Lovable, no una regresion observada ahora en Worker.

## Tareas para el main

1. Tras aplicar migraciones y desplegar Edge Functions `sitemap`/`prerender`, repetir la matriz de `curl` para `OAI-SearchBot/1.0` en:
   - `https://winerim.wine/`;
   - `https://winerim.wine/funcionalidades`;
   - `https://winerim.wine/blog`;
   - `https://winerim.wine/en/blog`;
   - `https://winerim.wine/it/blog`;
   - `https://winerim.wine/fr/blog`;
   - `https://winerim.wine/de/blog`;
   - `https://winerim.wine/pt/blog`.
2. Reenviar `https://winerim.wine/sitemap.xml` en Search Console tras el publish.
3. Solicitar inspeccion/indexacion o revalidacion prioritaria de:
   - `https://winerim.wine/`;
   - `https://winerim.wine/funcionalidades`;
   - `https://winerim.wine/producto/cloudrim`;
   - `https://winerim.wine/producto/savia`;
   - `https://winerim.wine/blog`;
   - `https://winerim.wine/en/blog`;
   - `https://winerim.wine/de/blog`;
   - `https://winerim.wine/pt/blog`;
   - `https://winerim.wine/aprender-vino`;
   - `https://winerim.wine/biblioteca-vino`.
4. Si hay cuota limitada en Search Console, priorizar en este orden: home, `/funcionalidades`, CloudRIM, SAVia, `/blog`.
5. Mantener monitorizado `www` durante el proximo publish para confirmar que no reaparece el `421`.
