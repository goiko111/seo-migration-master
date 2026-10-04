# Diagnostico de rentabilidad de la carta - candidato local

Fecha: 2026-10-04

## Hechos

- Se consolida la ruta existente ES/EN; no hay nueva ruta duplicada.
- Modelo `2.0.0`: botella, copa, capital en stock lento y escenario PVP/volumen/reposicion.
- Resultado completo antes del contacto.
- Revision ampliada opcional con email minimo, consentimiento de respuesta obligatorio y marketing opcional.
- Las cifras del diagnostico no se envian en la captacion.
- Se corrige el estado BC `34,5 %`: `A revisar`, sin lectura ejecutiva contradictoria.
- Se eliminan claims de mejora media `5-15 %` sin evidencia.

## Validacion

- `npm test`: 25 archivos, 222 tests, todos verdes.
- `npm run build`: OK.
- `node --check cloudflare-worker-v3-hybrid.js`: OK.
- `node --check edge-router/winerim-pages-router.js`: OK.
- `npx --yes deno check supabase/functions/prerender/index.ts`: OK.
- Playwright desktop `1440x1000` y movil `390x844`: sin overflow horizontal, errores de consola ni errores de pagina.

## Evidencia visual

- `profitability_diagnostic_2026-10-04_desktop.png`
- `profitability_diagnostic_2026-10-04_mobile.png`

## Decision de release

- Estado: listo para revision, no publicado.
- Gate: publicar frontend, Worker/edge-router y prerender de forma coordinada; despues validar humano, Googlebot/OAI y analitica sin PII.
