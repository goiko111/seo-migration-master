# Release: claridad hostelera y maquetación de herramientas

Fecha: 2026-10-14

## Hechos

- Se revisaron las cinco herramientas operativas publicadas: pedido semanal,
  rentabilidad de maridaje, conciliación de stock, rotura de stock e impacto de
  integración TPV/multiestablecimiento.
- El distintivo de cálculo local se solapaba con la introducción en determinados
  anchos y el panel no tenía separación interior propia.
- Los formularios usaban etiquetas breves y jerga sin explicar el origen del
  dato ni cómo interpretar el resultado.

## Cambios

- Cada campo explica qué introducir, dónde obtenerlo y en qué unidad.
- Los pasos y resultados usan lenguaje de restauración: botellas disponibles,
  ventas de siete días, coste máximo por persona, botellas que faltan y margen
  que podría perderse.
- Se sustituyeron expresiones aisladas como `P&L`, `contribución` y `demanda
  sustituible` por explicaciones operativas.
- Se corrigieron el solapamiento del hero, el espaciado del panel, el ancho de
  campos y el responsive intermedio del simulador TPV.
- El test visual comprueba overflow y colisiones entre introducción, distintivo,
  etiquetas, controles y ayudas.

## Producción

- Pages: `https://bf21695a.winerim-origin.pages.dev`
- Alias: `https://hostelier-tool-clarity-20261.winerim-origin.pages.dev`
- Facade: `cdc296db-c48c-4bc5-ba68-d621c649cd66`
- Backend sin cambios: `317e7c1c-09e4-41da-a0be-d63a8b4b12cb`

## Validación

- TypeScript y ESLint acotado a los dos componentes: OK.
- Suite: `273/273`.
- Build de producción: OK.
- Playwright local y productivo en escritorio/móvil: flujos completos, CSV,
  canonical, consola, overflow y colisiones: OK.
- Producción: `34` checks HTTP y `10` entradas exactas de sitemap.

## Contradicciones / límites

- `npm run lint` global sigue rojo por deuda previa fuera de estos archivos:
  `112` errores y `28` avisos. El lint acotado a los archivos modificados está
  verde.
- Los ejemplos continúan siendo ficticios y los porcentajes editables no se
  presentan como resultados medidos de clientes.

## Evidencia

- Capturas locales: `local/`.
- Capturas de producción: `production/`.
