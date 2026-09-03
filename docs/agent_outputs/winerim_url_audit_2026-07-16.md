# Winerim URL audit 2026-07-16

## Hechos

- `https://winerim.wine/precios-modulos-integraciones` devuelve en produccion:
  - HTTP 404;
  - body `Not Found`;
  - `x-worker-branch: not-found`;
  - `x-robots-tag: noindex`.
- La causa inmediata es que el Worker publicado aun no reconoce la ruta.
- La URL tampoco aparece todavia en el sitemap de produccion.
- El sitemap de produccion contiene 2377 URLs.
- Auditoria del sitemap:
  - 2372 URLs respondieron 200 en la primera pasada;
  - 5 URLs dieron timeout puntual;
  - las 5 URLs con timeout respondieron 200 al reintento individual;
  - no se detectaron 404 dentro del sitemap publicado.
- Comparacion de rutas exactas de `App.tsx` contra produccion:
  - 130 rutas exactas revisadas;
  - 6 rutas devolvian 404 por `x-worker-branch: not-found`:
    - `/precios-modulos-integraciones`;
    - `/empleo`;
    - `/sobre-nosotros`;
    - `/en/thank-you`;
    - `/it/grazie`;
    - `/fr/merci`.
- `/de/danke`, `/pt/obrigado` y `/gracias` responden 200 en produccion.
- `/sobre-winerim` esta en el sitemap de produccion y responde 200, pero React solo declaraba `/sobre-nosotros`.
- Los alias cortos de Biblioteca del vino que no aparecen como `loc` exacto en sitemap no estan rotos: responden 301 a URLs canonicas.

## Cambios aplicados localmente

- `cloudflare-worker-v3-hybrid.js`:
  - se anadio alias 301 `/sobre-nosotros` -> `/sobre-winerim`;
  - se anadieron a `NOINDEX_ROUTES`:
    - `/en/thank-you`;
    - `/it/grazie`;
    - `/fr/merci`;
    - `/de/danke`;
    - `/pt/obrigado`;
    - `/empleo`;
  - se anadieron a `SPA_EXACT`:
    - `/en/thank-you`;
    - `/it/grazie`;
    - `/fr/merci`;
    - `/de/danke`;
    - `/pt/obrigado`;
    - `/empleo`.
- `src/App.tsx`:
  - se anadio la ruta `/sobre-winerim` apuntando a `SobreWinerim`.

## Validaciones

- `node --check cloudflare-worker-v3-hybrid.js`: OK.
- `./node_modules/.bin/tsc --noEmit --pretty false -p tsconfig.json`: OK.
- `git diff --check` en archivos tocados: OK.
- `npm run build` quedo sin salida durante mas de un minuto y fue interrumpido para no dejar procesos vivos.
- `npm run deploy:worker` y `npx --yes wrangler@3.112.0 --version` quedaron sin salida; no hay variables Cloudflare visibles en el entorno. No se pudo confirmar deploy de Worker desde CLI local.

## Decisiones

- `/sobre-winerim` queda como URL canonica porque ya esta en sitemap.
- `/sobre-nosotros` debe redirigir a `/sobre-winerim`.
- Las paginas de gracias y `/empleo` deben servirse pero con `noindex`.

## Tareas pendientes

- Desplegar Worker actualizado.
- Publicar frontend en Lovable para que `/precios-modulos-integraciones` renderice la pagina React en navegador humano.
- Desplegar Edge Functions `sitemap` y `prerender` para que la URL entre en sitemap y tenga prerender bot.
- Revalidar produccion:
  - `/precios-modulos-integraciones`;
  - `/empleo`;
  - `/sobre-nosotros`;
  - `/sobre-winerim`;
  - `/en/thank-you`;
  - `/it/grazie`;
  - `/fr/merci`;
  - sitemap;
  - Googlebot y `OAI-SearchBot/1.0`.
