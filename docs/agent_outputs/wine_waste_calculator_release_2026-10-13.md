# Calculadora de mermas de vino — release 2026-10-13

## URLs

- ES: `https://winerim.wine/herramientas/calculadora-mermas-vino`
- EN: `https://winerim.wine/en/tools/wine-waste-calculator`

## Alcance publicado

- Calculadora local de tres pasos: contexto, cifras y resultado.
- Separación explícita entre coste perdido y venta no cobrada.
- EUR, USD y GBP; fórmulas visibles; ejemplo ficticio; descarga del escenario.
- Integración en cabecera, pie, Herramientas, `Empieza aquí`, sitemap y prerender.
- Cuarta prioridad tras tiempo operativo, rentabilidad y fuga de margen.

## Infraestructura

- Pages: `https://5c395503.winerim-origin.pages.dev`.
- Backend SEO: `winerim-proxy` versión
  `3a8d56e1-822f-4f5a-8b04-3db90d2e6627`.
- Facade: `winerim-edge-router` versión
  `2bd98d46-51f7-4ef5-a58e-88ce8b34f67c`.
- No se utilizaron créditos de Lovable.

## Validación

- Vitest: `263/263`.
- TypeScript: correcto.
- Build Vite: correcto.
- Worker syntax y dry-runs: correctos.
- Deno check de sitemap/prerender: correcto.
- Playwright productivo: escritorio y móvil, tres pasos, sin errores de consola.
- Humano, Googlebot y OAI: `200` y canonical propio en ES/EN.
- Sitemap: un `loc` exacto por ruta.
- Regresión: home y Herramientas `200`; páginas legales `200/noindex`.

## Evidencia visual

Las capturas productivas están en
`docs/agent_outputs/wine_waste_calculator_2026-10-13/production-r2/`.

## Pendiente separado

- Medición agregada sin PII.
- Generalizar la metadata inicial del shell para herramientas anteriores.
- Las fuentes locales de Edge Functions están preparadas; no fue necesario
  desplegarlas para activar la ruta pública servida por Cloudflare.
