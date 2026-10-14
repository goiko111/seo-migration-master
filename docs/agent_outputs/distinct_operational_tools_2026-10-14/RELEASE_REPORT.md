# Release: herramientas operativas diferenciadas

Fecha: 2026-10-14

## Alcance

- Planificador de pedido semanal: manifiesto de compra, cobertura y cajas.
- Rentabilidad de maridaje: P&L, beverage cost y mapa de pases.
- Conciliador de stock: puente de inventario y cola de auditoría.
- Rotura de stock: cuenta atrás, demanda expuesta y compra de emergencia.
- Impacto TPV/multiestablecimiento: topología, antes/después, procesos y rollout.
- Exportación CSV específica para cada herramienta.

## Producción

- Pages: `https://81cb6c4b.winerim-origin.pages.dev`
- Pages alias: `https://distinct-operational-tools-2.winerim-origin.pages.dev`
- Facade `winerim-edge-router`: `46972403-8b7d-4e3f-aaaf-110eae45186f`
- Backend sin cambios: `317e7c1c-09e4-41da-a0be-d63a8b4b12cb`

## Validación

- TypeScript: OK.
- ESLint focalizado: OK.
- Build: OK.
- Suite completa: `273/273`.
- Playwright local y producción: ES/EN, escritorio/móvil, descargas CSV,
  selectores únicos, sin errores de consola ni overflow horizontal.
- Producción HTTP: `34` checks.
- Sitemap: `10` entradas exactas.

## Evidencia

- `local/`: capturas de contexto, entrada y resultado.
- `production/`: capturas equivalentes de la versión pública.

## Límites

- No se redeplegaron backend, sitemap, prerender ni Supabase/Lovable porque las
  rutas y el contenido para bots no cambiaron.
- Los ejemplos siguen siendo ficticios y las hipótesis editables; no son una
  garantía de ahorro o resultado.
