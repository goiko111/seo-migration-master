# Release: arquitectura del catálogo de herramientas

Fecha: 2026-10-14

## Cambios

- Cuatro accesos guiados en `Empieza por el problema`.
- Catálogo sin repetir esas rutas.
- Seis categorías: Diagnóstico, Margen y precios, Operaciones y stock, Compras y
  Supply, Sala y venta, y Grupos e integraciones.
- Filtros localizados en seis idiomas.
- Comprobación explícita de unicidad de URLs en escritorio y móvil.

## Producción

- Pages: `https://a8673cc8.winerim-origin.pages.dev`
- Alias: `https://tools-catalog-architecture-2.winerim-origin.pages.dev`
- Facade: `9903d9b7-6029-474c-a8fa-23ddb134f614`
- Backend sin cambios: `317e7c1c-09e4-41da-a0be-d63a8b4b12cb`

## Validación

- Suite: `273/273`.
- TypeScript, ESLint, build y `git diff --check`: OK.
- Playwright local y producción: catálogo único, orden de grupos, filtros,
  calculadora por copa en Margen y precios, responsive y consola: OK.
- Producción: `34` checks HTTP y `10` entradas exactas de sitemap.
