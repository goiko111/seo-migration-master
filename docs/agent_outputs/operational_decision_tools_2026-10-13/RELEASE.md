# Cuatro herramientas operativas publicadas — 2026-10-13

## Hechos confirmados

- Se publicaron cuatro herramientas en español e inglés:
  - pedido semanal: `/herramientas/planificador-pedido-semanal-vino`;
  - rentabilidad de menú y maridaje: `/herramientas/calculadora-rentabilidad-menu-maridaje`;
  - conciliación de stock: `/herramientas/conciliador-stock-vino`;
  - riesgo de rotura: `/herramientas/simulador-rotura-stock-vino`.
- Las cuatro calculan en cliente, aceptan ejemplos ficticios, muestran fórmula y fuentes, permiten descargar el escenario y no transmiten las cifras introducidas a analítica.
- Sus pares ingleses están activos, con copy, canonical y resultados localizados.
- Las cuatro aparecen después de tiempo operativo, diagnóstico de rentabilidad, fuga de margen y mermas en `Empieza aquí` y en el listado de Herramientas.
- Pages activo: `b76fa304`.
- Worker SEO activo: `93718c13-7dcb-4e6d-b838-e57f98d63123`.
- Facade activo: `7dbf2ed3-9367-4539-af90-e458c16c6af5`.

## Validación

- `269/269` tests.
- TypeScript, ESLint, build, `git diff --check` y sintaxis de ambos Workers: OK.
- Dry-run de backend y facade: OK.
- Playwright local y productivo en desktop/móvil: flujo completo con ejemplo, cálculo, canonical, sin overflow horizontal ni errores de consola.
- Producción: `28` comprobaciones HTTP para humano, Googlebot y OAI; `8` canonical exactos y `8` entradas únicas en sitemap.
- Regresión básica: home y funcionalidades `200`; privacidad y términos `200/noindex`.
- Evidencia visual final en la carpeta `production-final/` de este directorio.

## Decisiones

- Mantener las magnitudes separadas: compra/coste, contribución, diferencia de stock y margen expuesto no se suman entre sí.
- Mostrar hipótesis y fórmulas editables y evitar promesas de resultado garantizado.
- No bloquear resultados con formulario ni popup.
- No añadir una quinta herramienta sin una hipótesis diferenciada y datos base defendibles.

## Hipótesis

- Los recorridos orientados a una decisión semanal concreta convertirán mejor que una calculadora genérica de ROI.
- El siguiente candidato con valor comercial distinto es un simulador de impacto de integración TPV/multiestablecimiento.

## Contradicciones y riesgos

- La fuente Supabase/Lovable quedó alineada para sitemap y prerender, pero no se desplegó mediante Lovable Cloud; la capa pública activa está cubierta por Cloudflare.
- Las hipótesis de ejemplo son ficticias y aún no están calibradas con datos agregados de clientes.
- Persisten avisos preexistentes no bloqueantes de `caniuse-lite`, chunks grandes, React Router y una `key` en `Precios`.

## Pendientes

- Medir eventos agregados de uso sin cifras ni PII.
- Contrastar las hipótesis con datos consentidos antes de presentarlas como benchmarks.
- Definir inputs y límites del simulador TPV/multiestablecimiento antes de construirlo.
