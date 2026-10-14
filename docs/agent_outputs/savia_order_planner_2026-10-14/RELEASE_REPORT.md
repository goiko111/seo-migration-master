# Release: planificador de pedido alineado con SAVia

Fecha: 2026-10-14

## Resultado

- El planificador usa stock, ventas de 7 y 90 días, eventos, cobertura, cajas,
  coste, criterio de carta, distribuidor y disponibilidad conocida.
- Cada referencia recibe una recomendación y un motivo operativo.
- El CSV conserva proveedor, rotación, cobertura, decisión, cantidades y coste.
- SAVia se describe como capa de consulta y preparación sujeta a aprobación, no
  como comprador o emisor automático del pedido.

## Producción

- Página: `https://winerim.wine/herramientas/planificador-pedido-semanal-vino`
- Inglés: `https://winerim.wine/en/tools/weekly-wine-order-planner`
- Pages: `https://65742153.winerim-origin.pages.dev`
- Alias: `https://savia-order-planner-20261014.winerim-origin.pages.dev`
- Facade: `d41f4932-45c2-438a-96d7-8fdc870169fc`
- Backend sin cambios: `317e7c1c-09e4-41da-a0be-d63a8b4b12cb`

## Validación

- Suite: `276/276`.
- TypeScript, ESLint acotado, build y `git diff --check`: correctos.
- Playwright local y productivo ES/EN, escritorio/móvil, CSV, canonical,
  consola, colisiones y overflow: correcto.
- Producción: `34` checks HTTP y `10` URLs exactas de sitemap.

## Límites

- La fórmula pública no se presenta como algoritmo interno de SAVia.
- La disponibilidad del proveedor es introducida por el usuario.
- Ningún pedido se envía ni se aprueba desde la herramienta.

## Evidencia

- Capturas locales: `local/`.
- Capturas productivas: `production/`.
