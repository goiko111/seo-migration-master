# Current State

## Hechos

- Fecha de actualización: 2026-05-23.
- Repositorio de trabajo: `/Users/GOIKO/seo-migration-master`.
- Rama activa: `main`.
- PR `https://github.com/goiko111/seo-migration-master/pull/1` fusionado el 2026-05-23.
- Merge commit base de la ampliación `de`/`pt`: `30e9a95f592ba1c3607c0b385a2711e783bcc525`.
- El cierre técnico de despliegue previo quedó committeado y pusheado en `main` con `e009927`.
- Producción quedó validada en el bloque anterior:
  - `https://winerim.wine/de/weinbibliothek` responde HTTP 200.
  - `https://winerim.wine/pt/biblioteca-vinho` responde HTTP 200.
  - `https://winerim.wine/sitemap.xml` lista rutas `de` y `pt` de biblioteca.
  - Googlebot en Tempranillo alemán y portugués recibe HTML prerenderizado con canonical/hreflang correctos.
- Proyecto Lovable operativo: `https://lovable.dev/projects/2c4eed0e-6760-45f0-aeb3-ce44de8e91f1`.
- Para este proyecto, Supabase Edge Functions viven dentro de Lovable y no deben tratarse como despliegue externo por CLI salvo instrucción explícita nueva.
- En esta sesión se implementó el primer bloque editorial avanzado de biblioteca del vino:
  - Nueva capa `src/data/wineLibraryEditorial.ts`.
  - 10 uvas prioritarias con inteligencia de servicio: `tempranillo`, `garnacha`, `albarino`, `verdejo`, `godello`, `chardonnay`, `cabernet-sauvignon`, `pinot-noir`, `sauvignon-blanc`, `riesling`.
  - Contenido localizado para `es`, `en`, `it`, `fr`, `de` y `pt`.
  - Bloques de temperatura, copa, aireación, rol en carta, guion de sala, palanca comercial, error a evitar, maridajes y FAQs.
- `src/pages/GrapeDetail.tsx` ahora muestra el bloque de inteligencia de servicio en fichas completas y fichas de catálogo cuando existe perfil editorial.
- `src/data/grapesLibraryI18n.ts` se corrigió para resolver uvas completas por `slug`; antes podía recibir un string y devolver datos rotos en páginas de detalle.
- `src/data/grapesLibraryI18n.ts` ahora evita fugas de narrativa española en fichas localizadas:
  - Si falta traducción profunda, genera fallback narrativo localizado.
  - Traduce países principales.
  - Añade SEO fallback para fichas de catálogo.
- `src/pages/GrapeDetail.tsx` localiza etiquetas y tooltips de rol en carta.
- `supabase/functions/prerender/index.ts` ahora incluye contenido editorial enriquecido para bots en las mismas 10 uvas prioritarias y en los seis idiomas de la biblioteca.
- Verificaciones locales de esta sesión:
  - `npm run test`: 5 archivos, 15 tests.
  - `npm run build`.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`.
  - `git diff --check`.
  - Navegador local en `/de/weinbibliothek/rebsorten/tempranillo`: bloque `Service-Intelligenz` presente y sin fuga de texto español.
  - Navegador local en `/pt/biblioteca-vinho/castas/albarino`, `/it/biblioteca-vino/vitigni/chardonnay` y `/fr/bibliotheque-vin/cepages/riesling`: bloque editorial presente y sin fuga de texto español detectada.
- Avisos no bloqueantes durante build:
  - `caniuse-lite`/Browserslist desactualizado.
  - Chunks grandes por encima de 200 kB.
- `npm run lint -- --quiet` sigue teniendo deuda global fuera del alcance directo de la biblioteca del vino.
- Lovable sigue mostrando avisos de seguridad/uso que deben revisarse como bloque separado.

## Decisiones

- Mantener Lovable como vía operativa para publicar frontend y Edge Functions Supabase de este proyecto.
- Tratar la paridad frontend/prerender como requisito para biblioteca del vino: lo importante para usuarios también debe estar disponible para bots.
- Priorizar una primera tanda editorial de 10 uvas por impacto SEO y utilidad comercial antes de escalar a 30-50 entidades.
- Añadir fallbacks narrativos localizados cuando una ficha completa no tenga traducción profunda, para no mezclar español en páginas internacionales.
- No mezclar en este bloque la deuda global de lint ni los avisos de seguridad de Lovable.
- No redesplegar Cloudflare Worker para este bloque porque no se modificó la lógica del Worker.

## Hipótesis

- La primera tanda de 10 uvas cubre una parte alta de demanda informacional y comercial de la biblioteca.
- El mayor salto SEO siguiente vendrá de ampliar esta profundidad a más uvas, regiones y estilos, no de reabrir rutas/hreflang.
- Los fallbacks localizados mejoran calidad internacional y reducen riesgo de páginas mixtas mientras se escriben traducciones editoriales humanas completas.
- Producción necesitará publicación desde Lovable y despliegue explícito de la Edge Function `prerender` para que los bots vean este bloque nuevo.

## Tareas pendientes

- Commit y push del bloque editorial avanzado de esta sesión.
- Publicar frontend desde Lovable.
- Pedir explícitamente en Lovable el despliegue de la Edge Function `prerender`.
- Validar producción después del despliegue:
  - Rutas humanas de las 10 uvas prioritarias en `de`, `pt`, `it` y `fr`.
  - Googlebot en al menos Tempranillo, Chardonnay y Riesling con HTML prerenderizado enriquecido.
  - Canonical/hreflang tras el despliegue.
- Revisar Search Console después de indexación: sitemap, cobertura, canonical seleccionada y hreflang.
- Separar una tarea para deuda global de lint.
- Separar una tarea para avisos de seguridad de Lovable.
