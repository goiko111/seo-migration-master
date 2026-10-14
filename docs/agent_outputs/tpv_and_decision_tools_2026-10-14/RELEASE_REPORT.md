# Simulador TPV y mejora de herramientas operativas — 2026-10-14

## Hechos verificados

- Nueva herramienta ES: `https://winerim.wine/herramientas/simulador-impacto-integracion-tpv`.
- Nueva herramienta EN: `https://winerim.wine/en/tools/pos-integration-impact-calculator`.
- Pedido distingue faltante previo, necesidad sin redondear, exceso de caja y capital de redondeo.
- Maridaje compara coste objetivo, desviación mensual, botellas equivalentes y coste del sobrevertido.
- Conciliación separa faltantes y sobrantes, su coste y un neto que no se usa como cierre.
- Rotura separa déficit físico, sustitución, margen protegido, margen expuesto y días de riesgo.
- El simulador TPV separa carga manual, tiempo recuperable, incidencias evitables y costes comerciales opcionales. Sin coste introducido no calcula ROI ni payback.
- Las nueve herramientas de decisión encabezan `Empieza aquí` y el catálogo.
- Release: Pages `5c3f5899`, backend `317e7c1c-09e4-41da-a0be-d63a8b4b12cb`, facade `6dd4ab28-e546-4b10-95bf-f6169c0c3568`.

## Validaciones

- `273/273` tests; TypeScript; ESLint dirigido; build.
- Sintaxis de ambos Workers y dry-runs de backend/facade.
- Playwright local y producción: ES/EN, escritorio/móvil, canonicals, orden del hub, sin overflow, errores de consola ni lead gate.
- Producción: `34` checks humano/Googlebot/OAI y `10` entradas exactas en sitemap.
- Home y funcionalidades siguen `200`; términos y privacidad siguen `200/noindex`.

## Límites

- Los porcentajes del ejemplo TPV son hipótesis editables, no benchmarks ni garantías.
- La herramienta no afirma que una integración sustituya los recuentos físicos.
- Deno no estaba disponible en el shell final. La fuente Edge quedó alineada, pero no se publicó en Lovable/Supabase; la capa pública verificada es Cloudflare.

## Evidencia

- Capturas locales: `local/*.png`.
- Capturas productivas: `production/*.png`.
- Validadores: `scripts/test-operational-decision-tools-ui.mjs` y `scripts/validate-operational-decision-tools-production.mjs`.
