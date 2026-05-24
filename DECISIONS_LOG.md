# Decisions Log

## 2026-05-23

### Hechos

- El usuario estableció un protocolo de documentación permanente para este proyecto.
- Los documentos exigidos por el protocolo no existían al revisar `/Users/GOIKO/seo-migration-master`.
- Se detectaron y corrigieron dos creaciones iniciales fuera del repo real.
- Se implementó soporte de biblioteca del vino para alemán (`de`) y portugués (`pt`).
- Se creó la rama `codex/wine-library-de-pt`.
- Se abrió el PR `https://github.com/goiko111/seo-migration-master/pull/1`.
- Al intentar fusionar el PR, `origin/main` había avanzado y hubo conflictos de merge.
- Los conflictos se resolvieron combinando el bloque de biblioteca multilingüe con los cambios más recientes de `main`.
- Se detectó que el sitemap había perdido rutas generales `de`/`pt` de `main` durante la resolución; se corrigió manteniendo esas rutas y añadiendo las rutas de biblioteca.
- Las verificaciones posteriores al merge resuelto pasan: tests, build, lint dirigido, `deno check` y `git diff --check`.
- Se fusionó el PR `https://github.com/goiko111/seo-migration-master/pull/1` en `main`.
- Merge commit: `30e9a95f592ba1c3607c0b385a2711e783bcc525`.
- La validación ligera de producción posterior al merge detectó que el código nuevo aún no está activo para sitemap/prerender de biblioteca: sitemap público sin rutas nuevas `de`/`pt` y bot dinámico cayendo en `bot-fallback`.
- Se detectó y corrigió una contradicción en documentación de despliegue: `TECH_INSTRUCTIONS.md` apuntaba a `cloudflare-worker-v2.1-improved-debug.js`, pero el código integrado y el worker observado usan la línea `cloudflare-worker-v3-hybrid.js`.
- Se intentó desplegar desde CLI, pero Supabase falló por falta de `SUPABASE_ACCESS_TOKEN` y Cloudflare no tenía sesión `wrangler`.
- El dry-run del worker con `wrangler@3.112.0` compila correctamente.
- Se añadieron scripts de despliegue en `package.json` para repetir el proceso cuando haya credenciales.

### Decisiones

- Usar `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md` como fuente de verdad desde este punto.
- Separar hechos, decisiones, hipótesis y tareas pendientes en los documentos de seguimiento.
- Implementar soporte `de`/`pt` con paridad de rutas localizadas para la biblioteca del vino.
- Usar localización genérica de rutas de la biblioteca en sitemap y prerender para evitar mantener manualmente todas las variantes dinámicas.
- Mover el resolver de entidades de la biblioteca a `src/data/wineLibraryLinks.ts` para reutilizar enlaces internos y evitar warnings de Fast Refresh.
- Ajustar Vitest para usar el plugin instalado `@vitejs/plugin-react`.
- Añadir resolución inversa de rutas localizadas para que el selector de idioma funcione en páginas dinámicas.
- Validar las funciones Edge con `npx --yes deno-bin check` en vez de depender de un Deno instalado globalmente.
- Separar `LanguageProvider` en `src/i18n/LanguageProvider.tsx` y dejar `LanguageContext.tsx` para contexto/hook.
- En el merge con `main`, conservar los overlays i18n más recientes de uvas en `de`/`pt` y adaptar los helpers locales que necesitaba la biblioteca.
- Restaurar rutas generales `de`/`pt` en el sitemap tras detectar la contradicción.
- Mantener la deuda de lint global como iniciativa separada.
- Cerrar el bloque técnico como integrado en `main` y mover el foco a despliegue, validación productiva y mejora editorial.
- Tratar despliegue/validación productiva como siguiente bloque operativo, porque no hay CLI/script de deploy disponible en este entorno.
- No incluir tokens privados en el repo; usar variables de entorno o login local para desplegar.

### Hipótesis

- La estrategia correcta para escalar la biblioteca es consolidar primero la infraestructura SEO multilingüe y después enriquecer contenido editorial por idioma.
- La deuda de lint global debe tratarse como una iniciativa separada para no mezclar riesgos.
- La validación final importante será la de producción después del despliegue, especialmente sitemap, canonical, hreflang y prerender.

### Tareas pendientes

- Validar el despliegue en producción.
- Usar `cloudflare-worker-v3-hybrid.js` en el despliegue manual del worker.
- Ejecutar `npm run deploy:supabase:seo` y `npm run deploy:worker` cuando estén disponibles las credenciales.
- Revisar Search Console tras indexación.
- Definir el siguiente bloque editorial de la biblioteca del vino.

### Cierre de despliegue productivo

#### Hechos

- El usuario aclaró que Supabase vive dentro de Lovable para este proyecto y proporcionó el proyecto `https://lovable.dev/projects/2c4eed0e-6760-45f0-aeb3-ce44de8e91f1`.
- Se publicó el frontend desde Lovable; la UI mostró `Published` y `Up to date`.
- Se autenticó Cloudflare Wrangler como `gugocreative@gmail.com`.
- El primer despliegue CLI del Worker `winerim-proxy` (`170c5339-8938-45c9-8aaa-e8be84dac540`) dejó producción en HTTP 500 porque el script no preservaba las variables públicas del Worker.
- Se redeployó el Worker con `--keep-vars` y variables explícitas (`60c3b0e2-28ac-4785-8eb8-fd7750294823`), recuperando HTTP 200.
- Lovable desplegó las Edge Functions `sitemap` y `prerender` tras pedirlo explícitamente en el chat del proyecto.
- Se detectó que `prerender` devolvía HTML correcto con `Content-Type: text/plain`; el Worker lo rechazaba y caía en `bot-fallback`.
- Se parcheó `cloudflare-worker-v3-hybrid.js` para aceptar HTML prerenderizado por contenido real, aunque venga etiquetado como `text/plain`.
- Se desplegó el Worker final `ec6d2f24-f3f3-4739-8a56-ef6992fdf2a9`.
- Producción quedó validada:
  - Sitemap público con rutas `de` y `pt` de biblioteca.
  - Googlebot en Tempranillo alemán y portugués con `X-Prerendered: true`, `X-Worker-Branch: bot-prerender`, canonical y hreflang correctos.

#### Decisiones

- No usar Supabase externo como vía principal en este proyecto mientras Lovable gestione las Edge Functions.
- Desplegar el Worker desde el repo con `npm run deploy:worker`, no con comandos sueltos que puedan omitir variables.
- Mantener `--keep-vars` en los scripts del Worker para preservar secretos de Cloudflare.
- Tratar como válido el HTML prerenderizado si el cuerpo empieza por `<!doctype html` o `<html`, aunque el `Content-Type` no sea `text/html`.

#### Hipótesis

- El comportamiento `Content-Type: text/plain` de Supabase Edge Functions puede repetirse en otros prerenders; el sniffing de HTML evita una caída falsa a SPA para bots.
- El flujo Lovable puede requerir prompts explícitos para Edge Functions aunque la UI indique que publicar frontend es suficiente.

#### Tareas pendientes

- Commit y push de los ajustes finales.
- Revisar visualmente rutas `de`/`pt` en navegador y selector de idioma.
- Revisar avisos de seguridad de Lovable en una tarea separada.
- Monitorizar Search Console después de la indexación.

### Bloque editorial avanzado de biblioteca del vino

#### Hechos

- Se inició el siguiente bloque tras cerrar infraestructura y despliegue `de`/`pt`.
- Se implementó una nueva capa editorial para 10 uvas prioritarias.
- Las uvas incluidas son `tempranillo`, `garnacha`, `albarino`, `verdejo`, `godello`, `chardonnay`, `cabernet-sauvignon`, `pinot-noir`, `sauvignon-blanc` y `riesling`.
- El bloque añade inteligencia de servicio, rol en carta, guion de sala, palanca comercial, error a evitar, maridajes y FAQs.
- El contenido se localizó para `es`, `en`, `it`, `fr`, `de` y `pt`.
- Se integró el bloque en `GrapeDetail` para fichas completas y fichas de catálogo.
- Se corrigió `getLocalizedGrape` para aceptar `slug` y devolver la ficha completa localizada.
- Se detectó durante QA una fuga de narrativa española en fichas localizadas completas.
- Se añadió fallback narrativo localizado para evitar mezclar español en páginas internacionales cuando una ficha no tenga traducción profunda.
- Se extendió el prerender de bots para las mismas 10 uvas prioritarias y los seis idiomas.
- Verificaciones ejecutadas: `npm run test`, `npm run build`, `deno check`, `git diff --check` y navegador local en rutas `de`, `pt`, `it`, `fr`.

#### Decisiones

- Tratar la paridad entre frontend y prerender como una regla de calidad SEO de la biblioteca del vino.
- Empezar la profundidad editorial máxima por 10 uvas prioritarias antes de ampliar a más entidades.
- Usar fallbacks narrativos localizados como solución intermedia segura, sin sustituir la escritura editorial completa futura.
- Mantener este bloque separado de lint global y avisos de seguridad Lovable.
- No desplegar Worker Cloudflare porque el cambio afecta a frontend y Edge Function `prerender`, no al proxy.

#### Hipótesis

- Las 10 uvas priorizadas concentran suficiente demanda SEO y utilidad de restaurante para justificar ser la primera tanda.
- El enriquecimiento de prerender mejorará la lectura de bots y AI crawlers en fichas de uva.
- La siguiente mejora de mayor impacto será ampliar entidad por entidad con contenido propio, schema más rico y enlaces internos por intención.

#### Tareas pendientes

- Commit y push del bloque editorial.
- Publicar frontend desde Lovable.
- Pedir despliegue explícito de `prerender` desde Lovable.
- Validar producción con usuario real y Googlebot.
- Escalar el patrón editorial a 30-50 uvas/regiones/estilos prioritarios.

### Auditoría SEO producción y Search Console

#### Hechos

- El usuario pidió auditar Search Console, la web y todo el contenido antes de seguir con biblioteca del vino.
- Al iniciar esta continuación se leyeron `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- Se detectó contradicción documental: `CURRENT_STATE.md` y `NEXT_STEPS.md` aún marcaban como pendiente el commit/push del bloque editorial, pero `main` ya estaba en `e3eab53 feat: enrich wine library editorial profiles`.
- Se auditó producción pública como Googlebot contra el sitemap completo.
- Se creó `src/seo/SEO_PRODUCTION_AUDIT_2026-05-23.md`.
- Resultados principales:
  - Sitemap con 2.989 URLs únicas.
  - 2.455 URLs HTTP 200.
  - 534 URLs HTTP 404 enviadas por sitemap.
  - 2.333 URLs con `bot-prerender`.
  - 122 URLs con `bot-fallback`.
  - 156 URLs con hreflang esperado en sitemap ausente en HTML.
  - 276 URLs HTTP 200 con canonical distinta a la URL enviada.
  - `robots.txt` anuncia `llms.txt` como `Sitemap` aunque es `text/plain`.
- Los 404 provienen principalmente de `seo_pages` publicadas en sitemap que el Worker no reconoce como rutas conocidas:
  - 222 slugs de familias uva/variedad.
  - 303 slugs de cursos.
  - 3 slugs de región.
  - 6 slugs portugueses con prefijo `software-carta-vinhos-*`.
- Las 122 URLs `bot-fallback` son páginas programáticas de ciudad, sobre todo `wine-list-software-*` y `software-carta-de-vinos-*`.
- La biblioteca del vino nueva no presentó 404 en sitemap: 1.470 URLs auditadas y 1.470 HTTP 200.
- Se detectaron 96 legacy shortcuts de biblioteca con título/H1 genérico, 16 por idioma.
- Search Console privada no se pudo auditar directamente porque no había acceso/exportación disponible en la sesión.

#### Decisiones

- Antes de seguir ampliando la biblioteca del vino, priorizar correcciones SEO técnicas de indexabilidad.
- Tratar sitemap, Worker y prerender como una sola fuente coordinada: no enviar en sitemap URLs que el Worker/prerender no puedan resolver.
- Cruzar la auditoría pública con Search Console cuando el usuario abra la propiedad o facilite exportaciones.
- Mantener `llms.txt` accesible, pero no declararlo como `Sitemap` en `robots.txt`.
- Resolver legacy shortcuts de biblioteca con redirects canónicos o metadatos únicos antes de ampliar mucho más la superficie indexable.

#### Hipótesis

- Search Console reflejará los hallazgos públicos como errores de cobertura, canonicals inesperadas, duplicados y posibles problemas hreflang.
- Corregir 404 del sitemap y `bot-fallback` tendrá más impacto inmediato que añadir nuevas entidades editoriales.
- La biblioteca del vino puede escalar mejor cuando la base sitemap/prerender/canonical esté saneada.

#### Tareas pendientes

- Conseguir acceso o exportaciones de Search Console.
- Corregir 534 URLs 404 enviadas en sitemap.
- Corregir 122 URLs `bot-fallback`.
- Unificar hreflang entre sitemap y prerender.
- Corregir canonicals de recursos, benchmarks/playbooks y páginas localizadas que caen a `/`.
- Retirar `llms.txt` como sitemap de `robots.txt`.
- Resolver legacy shortcuts de biblioteca del vino.
- Reenviar sitemap en Search Console y validar correcciones.

### Auditoría de contenido, SEO semántico y LLMs

#### Hechos

- El usuario pidió continuar con análisis de web a nivel contenido, SEO y posicionamiento en LLMs.
- Se creó `src/seo/CONTENT_LLM_AUDIT_2026-05-23.md`.
- Se confirmó que Winerim tiene una entidad clara: software de IA para carta de vinos, recomendaciones, maridajes, stock, pricing, margen y analítica para restaurantes/hoteles/grupos.
- Se detectó que 128 rutas localizadas estáticas entregan a bots la home española con canonical a `/`.
- Se detectó que 320 artículos internacionales con sufijos `_en`, `_it`, `_fr`, `_de` y `_pt` declaran `html lang="es"`.
- Se confirmó que `robots.txt` permite crawlers de IA: `GPTBot`, `ChatGPT-User`, `Google-Extended`, `ClaudeBot`, `PerplexityBot` y `Cohere-AI`.
- Se confirmó que `llms.txt` existe, pero no lista páginas prioritarias ni funciona como mapa semántico completo.
- No existe `llms-full.txt`.
- Se detectó que `analisis.winerim.wine` responde 200, está permitido por robots, tiene título `winerim-analisis`, no canonical visible y HTML inicial muy pobre.
- Búsqueda pública muestra menciones externas útiles en TecnoVino y F6S, además de competidores visibles para categoría.
- Búsqueda pública también muestra URLs antiguas de Winerim que hoy terminan en 404 o redirecciones incompletas.

#### Decisiones

- Tratar posicionamiento en LLMs como consistencia de entidad, no solo como archivo `llms.txt`.
- Priorizar idioma/canonical/prerender limpios antes de ampliar masivamente contenido.
- Rehacer `llms.txt` como mapa curado y crear `llms-full.txt`.
- Revisar subdominios indexables para evitar señales pobres de marca.
- No considerar la biblioteca del vino "máximo nivel" hasta resolver shortcuts legacy y profundidad media.

#### Hipótesis

- Winerim puede aparecer bien en respuestas LLM de marca o categoría muy específica.
- Para consultas genéricas competitivas, la señal actual puede ser superada por competidores con páginas más limpias y menos contradicciones.
- Corregir idioma y prerender de localizadas puede mejorar tanto SEO internacional como comprensión por LLMs.
- Las menciones externas existentes son una buena base para autoridad, pero conviene reforzarlas con páginas propias de evidencia/casos.

#### Tareas pendientes

- Implementar prerender específico para rutas localizadas estáticas.
- Corregir idioma e `inLanguage` de artículos internacionales.
- Decidir patrón canónico de artículos traducidos.
- Rehacer `llms.txt` y crear `llms-full.txt`.
- Revisar `analisis.winerim.wine`.
- Resolver URLs antiguas indexadas que terminan en 404.
- Crear páginas de evidencia y comparativas para reforzar autoridad en LLMs.

### Primer bloque de correcciones SEO/LLM tras auditoría

#### Hechos

- Tras la auditoría SEO y LLM se implementó un primer saneamiento en el repo.
- `public/robots.txt` ya no anuncia `llms.txt` como sitemap.
- `public/llms.txt` se rehizo como referencia curada para sistemas de IA.
- Se creó `public/llms-full.txt` como referencia extendida de entidad, producto, biblioteca del vino, herramientas y guías.
- `supabase/functions/sitemap/index.ts` filtra las familias de `seo_pages` no resolubles que causaban 534 URLs 404 en la auditoría pública.
- `supabase/functions/sitemap/index.ts` excluye temporalmente 24 rutas estáticas de recursos, benchmarks y playbooks que aún no tienen prerender/canonical específicos.
- `supabase/functions/prerender/index.ts` añade prerender técnico para rutas estáticas localizadas `en`, `it`, `fr`, `de` y `pt`.
- Las páginas estáticas españolas principales ahora pueden emitir hreflang completo con `de` y `pt`.
- `renderArticle` infiere idioma desde sufijos `_en`, `_it`, `_fr`, `_de` y `_pt`.
- Verificaciones locales completadas:
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`.
  - `npm run build`.
  - `npm run test`.
  - `git diff --check`.
  - Pruebas locales de prerender como Googlebot en `/en/pricing`, `/de/preise` y `/precios`.

#### Decisiones

- Corregir primero la indexabilidad básica antes de ampliar de nuevo la biblioteca del vino.
- Sacar del sitemap las URLs que el sistema no puede resolver ahora, en vez de seguir enviando 404.
- Mantener fuera del sitemap de forma temporal los recursos/benchmarks/playbooks sin prerender propio.
- Usar una plantilla localizada genérica para cortar el fallo crítico de rutas localizadas que caían a la home española.
- Tratar esa plantilla localizada como solución técnica intermedia, no como traducción editorial final.
- Mantener `llms.txt` y `llms-full.txt` como archivos informativos para IA, no como sitemaps.
- No tocar Cloudflare Worker en este bloque porque no cambia la lógica del proxy.

#### Hipótesis

- Al desplegar en Lovable, el sitemap público debería dejar de enviar las 534 URLs 404 detectadas en la auditoría.
- Las rutas localizadas estáticas deberían dejar de canonicalizar a `/` para bots cuando se despliegue `prerender`.
- La mejora de `llms.txt`/`llms-full.txt` ayuda a LLMs y agentes, pero su efecto depende de que el sitio siga teniendo contenido indexable limpio.
- La siguiente mejora con mayor impacto será resolver los `bot-fallback` restantes y convertir las páginas excluidas temporalmente en contenido real o redirecciones canónicas.

#### Tareas pendientes

- Publicar frontend desde Lovable.
- Pedir despliegue explícito de Edge Function `sitemap` desde Lovable.
- Pedir despliegue explícito de Edge Function `prerender` desde Lovable.
- Revalidar producción con Googlebot y sitemap público.
- Reenviar sitemap en Search Console y validar correcciones.
- Decidir destino definitivo de las URLs excluidas: mantener fuera, redirigir o crear páginas reales.

### Search Console: verificación, auditoría y redirects legacy

#### Hechos

- Se intentó acceder a `sc-domain:winerim.wine` y a `https://winerim.wine/` en Search Console.
- La cuenta `gugocreative@gmail.com` no tenía acceso inicial.
- Search Console ofreció verificación por archivo HTML `google0be715f4ef205b3d.html`.
- El flujo automático de verificación con Cloudflare quedó bloqueado por popup.
- Se añadió el archivo `public/google0be715f4ef205b3d.html`.
- Se añadió una ruta en `cloudflare-worker-v3-hybrid.js` para servir `/google0be715f4ef205b3d.html`.
- Se desplegó Cloudflare Worker `winerim-proxy`.
- Search Console verificó la propiedad `https://winerim.wine/` correctamente mediante archivo HTML.
- Se auditó Search Console y se creó `src/seo/SEARCH_CONSOLE_AUDIT_2026-05-23.md`.
- Hallazgos principales:
  - 664 clics y 8,32 mil impresiones en 3 meses.
  - 73 páginas indexadas y 1.643 no indexadas.
  - 194 URLs 404.
  - 1.232 URLs descubiertas sin indexar.
  - 111 URLs rastreadas sin indexar.
  - `/sitemap.xml` correcto y `/sitemap_index.xml` todavía enviado desde 2022.
  - LCP móvil pobre en grupo de 7 URLs, con home como ejemplo y LCP 4,5 s.
  - 4 elementos FAQ no válidos por `FAQPage` duplicado.
  - Sin acciones manuales ni problemas de seguridad.
  - 48 enlaces externos y 87 enlaces internos detectados.
- Se añadieron redirects directos de alta confianza en el Worker para ejemplos de Search Console.
- Se desplegó Worker final con redirects: `766e2cdd-da00-4157-8745-1f27c25a03e5`.

#### Decisiones

- Verificar la propiedad URL-prefix `https://winerim.wine/` como primer paso práctico, aunque la propiedad de dominio siga pendiente.
- Usar método de archivo HTML por estabilidad y rapidez.
- Servir la verificación tanto desde Worker como desde `public/` para mantener continuidad.
- Corregir redirects legacy de alta confianza cuando Search Console mostró ejemplos concretos y existía destino canónico claro.
- No validar corrección de 404 en Search Console todavía porque no están corregidos todos los casos.
- No reenviar sitemap todavía porque `sitemap` y `prerender` saneados aún no están desplegados desde Lovable.

#### Hipótesis

- La caída de `/en/pricing` que muestra Search Console está relacionada con el problema de rutas localizadas que entregaban home española/canonical `/`.
- La dependencia de tráfico branded es alta; la biblioteca del vino y las páginas informacionales aún no están aportando volumen significativo.
- El número bajo de enlaces internos detectados por Search Console indica que Google no está entendiendo todavía la arquitectura completa.
- Resolver legacy redirects y sitemaps reducirá ruido antes de pedir validaciones.

#### Tareas pendientes

- Exportar ejemplos completos de 404, descubiertas sin indexar y rastreadas sin indexar.
- Completar mapa de redirects legacy por familias.
- Retirar o dejar inactivo `/sitemap_index.xml` en Search Console si la UI lo permite.
- Desplegar `sitemap` y `prerender` saneados desde Lovable.
- Reenviar `/sitemap.xml` cuando producción ya refleje esos cambios.
- Corregir FAQPage duplicado.
- Optimizar LCP móvil de la home.

### Continuación Search Console: FAQ duplicado, redirects y despliegue

#### Hechos

- Se corrigió localmente el `FAQPage` duplicado en `SoftwareCartaVinos`, `VenderMasVino` y `WhatIsWinerim`.
- `FAQSection` añade ahora títulos por defecto para `de` y `pt`.
- `index.html` usa ahora `id="seo-jsonld"` y `id="seo-org-jsonld"` para que `SEOHead` actualice los JSON-LD estáticos en vez de duplicarlos.
- La verificación local con navegador confirmó 1 solo `FAQPage` en:
  - `/software-carta-de-vinos`.
  - `/como-vender-mas-vino-en-un-restaurante`.
  - `/en/what-is-winerim`.
- Se añadió redirect directo para `/estadisticas` y `/estadisticas/*` hacia `/benchmarks-playbooks`.
- Se desplegó Cloudflare Worker `winerim-proxy` con Version ID `4f83ba4a-7994-4cf1-9ec6-d20368b5628b`.
- `npm run deploy:supabase:seo` falló por ausencia de `SUPABASE_ACCESS_TOKEN` o login Supabase CLI.
- Lovable desde el navegador de Codex pide login; no se pudo publicar frontend ni Edge Functions desde esa vía.

#### Decisiones

- Usar `FAQSection` como fuente única de schema `FAQPage` cuando una página ya muestra FAQs.
- Mantener schema de producto/artículo/breadcrumb separado, pero evitar duplicar tipos de schema equivalentes.
- Mantener JSON-LD estático en `index.html` solo como fallback actualizable por `SEOHead`.
- Redirigir `/estadisticas/*` a `/benchmarks-playbooks` porque es el destino actual más cercano a los contenidos antiguos de estadísticas.
- Tratar la falta de credenciales Supabase/Lovable como bloqueo real de despliegue para frontend y Edge Functions.
- Mantener Worker desplegable por CLI cuando el cambio sea del proxy y exista verificación local previa.

#### Hipótesis

- La corrección de FAQ reducirá los 4 elementos no válidos cuando Lovable publique el frontend y Google recrawlee.
- El nuevo redirect de `/estadisticas/*` reducirá ruido en el grupo 404 de Search Console.
- La duplicación genérica causada por `index.html` sin IDs queda corregida localmente; puede quedar una duplicación específica en páginas con schema propio adicional.

#### Tareas pendientes

- Publicar frontend desde Lovable para llevar el arreglo FAQ a producción.
- Desplegar `sitemap` y `prerender` desde Lovable o con `SUPABASE_ACCESS_TOKEN`.
- Confirmar en producción que las páginas afectadas tienen un solo `FAQPage`.
- Pedir validación FAQ en Search Console tras el despliegue frontend.
- Revisar si `WhatIsWinerim` debe conservar schema `SoftwareApplication` propio adicional o transformarlo en un tipo semántico más específico.

### Commit/push del bloque SEO y bloqueo Lovable

#### Hechos

- Se creó y empujó a `origin/main` el commit `a98e8c6 fix: clean search console seo signals`.
- El commit contiene auditorías, `llms.txt`, `llms-full.txt`, correcciones `robots.txt`, sitemap/prerender, FAQ/schema, verificación GSC, redirects Worker y documentos de estado.
- Producción no refleja todavía el commit:
  - `robots.txt` mantiene `llms.txt` como sitemap.
  - `llms-full.txt` responde 404.
  - `/en/pricing` como Googlebot sigue entregando home/canonical española.
- `SUPABASE_ACCESS_TOKEN` sigue ausente y Supabase CLI no puede desplegar Edge Functions.
- Lovable en el navegador de Codex sigue en login.

#### Decisiones

- Tomar `a98e8c6` como referencia para publicar desde Lovable.
- No reenviar sitemap ni pedir validaciones en Search Console hasta que producción refleje el commit.
- Continuar por Lovable autenticado o por Supabase CLI con token explícito.

#### Hipótesis

- Lovable requiere sync/publish manual aunque `origin/main` esté actualizado.
- El despliegue frontend y el despliegue de Edge Functions pueden ser acciones separadas dentro de Lovable.

#### Tareas pendientes

- Iniciar sesión en Lovable en la ventana de Codex.
- Publicar/sincronizar el commit `a98e8c6`.
- Desplegar `sitemap` y `prerender`.
- Repetir QA público antes de tocar Search Console.

### Producción validada tras publicación Lovable

#### Hechos

- Lovable publicó el bloque SEO/LLM.
- `robots.txt` ya no declara `llms.txt` como sitemap.
- `llms-full.txt` responde HTTP 200 en producción.
- `sitemap.xml` en producción contiene 2.431 URLs y ya no incluye familias excluidas como `grape/`, `uva/`, `llms.txt` ni el ejemplo `/benchmarks-playbooks/playbook-mejorar-rotacion`.
- Googlebot recibe idioma/canonical propios en `/en/pricing`, `/de/preise` y `/pt/precos`.
- Googlebot recibe `html lang="en"` e `inLanguage: "en"` en `/article/alex-pardo_en`.
- Las páginas con error FAQ previo renderizan 1 solo `FAQPage` en navegador.
- Worker no se redesplegó porque producción ya servía correctamente redirects y verificación GSC.

#### Decisiones

- Dar por publicado el bloque técnico SEO/LLM en producción.
- No redeployar Worker sin cambio efectivo o fallo de QA.
- Pasar el foco a Search Console: reenviar sitemap y pedir validaciones.

#### Hipótesis

- Search Console mantendrá el estado antiguo hasta recrawl, pero las condiciones técnicas para validar ya están.
- La limpieza del sitemap debería reducir errores detectados en próximos rastreos.

#### Tareas pendientes

- Reenviar sitemap en Search Console.
- Pedir validación FAQ.
- Seguir exportando y corrigiendo familias 404 restantes.
- Abrir bloque separado para LCP móvil y enlaces internos.

### Acciones Search Console post-despliegue

#### Hechos

- Se releyeron los documentos fuente de verdad antes de continuar.
- Search Console muestra `/sitemap.xml` enviado y leído el 24 may 2026, estado `Correcto`, 2.431 páginas descubiertas y 0 vídeos.
- Search Console mantiene `/sitemap_index.xml` listado desde 2022, leído por última vez el 18 may 2026, estado `Correcto`, 1.358 páginas descubiertas.
- Se inició la validación del error `El campo "FAQPage" está duplicado`.
- La validación FAQ quedó con resultado `Iniciada` y fecha de inicio 24/5/26.
- La inspección de URL de `https://winerim.wine/software-carta-de-vinos` confirma:
  - URL en Google.
  - Página indexada.
  - HTTPS válido.
  - 1 breadcrumb válido.
  - 1 FAQ válido.
- Se intentó solicitar reindexación de `https://winerim.wine/software-carta-de-vinos`.
- Search Console rechazó temporalmente la solicitud con el mensaje `Se ha producido un problema al enviar la solicitud de indexación. Vuelve a intentarlo más tarde.`

#### Decisiones

- Reenviar sitemap y validar FAQ son acciones suficientes para esta primera pasada post-despliegue.
- La indexación manual debe limitarse a URLs estratégicas, no a todo el sitemap.
- No repetir solicitudes de indexación mientras Search Console devuelva error temporal.
- No retirar `/sitemap_index.xml` sin confirmar una acción de retirada clara en Search Console.

#### Hipótesis

- Google puede tardar varios días en procesar la validación FAQ y actualizar los informes de cobertura.
- El error de solicitud de indexación no indica problema técnico de la página inspeccionada, porque Search Console la muestra indexada y con datos estructurados válidos.
- El sitemap nuevo ya está técnicamente aceptado por Search Console; el efecto en páginas no indexadas será gradual.

#### Tareas pendientes

- Monitorizar la validación FAQ iniciada.
- Reintentar indexación manual más tarde solo para una lista corta de URLs core e internacionales.
- Seguir corrigiendo 404 por familias antes de pedir validación global.
- Abrir bloque separado para Core Web Vitals móvil y enlaces internos.

### Actualización de logos home/clientes

#### Hechos

- El usuario pidió actualizar logos antes de continuar con Search Console o biblioteca del vino.
- Se usó `Hoteles_Blancos_1024.zip` para la sección de hoteles de la home.
- Se usó `Logos_Blancos_white_1024.zip` para la página `/clientes`.
- Se añadieron 8 logos de hoteles en `src/assets/logos/hotels-white/`.
- Se añadieron 589 logos de clientes en `src/assets/logos/clients-white/`.
- Los PNG se redujeron a 360 px para controlar peso.
- `LogoStrip` importa ahora los logos de hoteles blancos desde `hotels-white`.
- `Clientes` usa `import.meta.glob` para construir la galería estática desde `clients-white`.
- `/clientes` ya no depende de la tabla `restaurants` de Supabase para mostrar la galería pública de logos.
- Verificaciones ejecutadas:
  - `npm run build`.
  - `npm run test`.
  - `git diff --check`.
  - Navegador local en home y `/clientes`.

#### Decisiones

- Priorizar assets estáticos versionados para la prueba social pública.
- Tras feedback posterior del usuario, mantener nombres visibles de clientes bajo cada logo y conservar ubicación como apoyo/metadato accesible.
- Ordenar la galería con logos de España primero.
- No mezclar este bloque con SEO técnico, Search Console, Worker ni biblioteca del vino.

#### Hipótesis

- La nueva galería aumenta credibilidad comercial sin afectar al flujo SEO técnico.
- El lazy-loading reduce el impacto de incluir 589 logos en `/clientes`.
- En el futuro puede merecer la pena generar un manifest curado de nombres comerciales y ubicaciones.

#### Tareas pendientes

- Hecho: commit y push base de logos con `c7adcfe feat: update hotel and client logos`.
- Publicar desde Lovable.
- Validar home y `/clientes` en producción.
- Evaluar conversión WebP/AVIF dedicada si se quiere reducir aún más peso.

### Ajuste visual posterior de logos

#### Hechos

- El usuario pidió mantener el nombre escrito de los clientes y hacer más grandes los logos de hoteles.
- Se detectó y corrigió una contradicción documental: el commit/push base de logos ya estaba hecho en `c7adcfe`, aunque `CURRENT_STATE.md` aún lo marcaba pendiente.
- `Clientes` muestra ahora nombre visible y ubicación secundaria en cada tarjeta de cliente.
- La galería de `/clientes` baja su densidad máxima de 8 a 6 columnas para que logo y nombre respiren mejor.
- `LogoStrip` aumenta el tamaño de los logos hoteleros en home de `h-8 sm:h-14 md:h-16` a `h-16 sm:h-20 md:h-24`.
- Verificaciones ejecutadas:
  - `npm run build`.
  - `npm run test`.
  - `git diff --check`.
  - Navegador local en home y `/clientes`.

#### Decisiones

- Mostrar nombre visible de clientes bajo el logo como criterio de diseño para `/clientes`.
- Mantener ubicación visible de forma secundaria, limitada a una línea.
- Dar más presencia a los logos de hoteles sin añadir copy visible nuevo en la home.
- No mezclar el ajuste visual con cambios SEO, Worker, Search Console ni biblioteca del vino.

#### Hipótesis

- La página `/clientes` gana claridad comercial al combinar logo y nombre.
- Los hoteles en home necesitan mayor peso visual para que la sección de grupos hoteleros no quede débil frente a Michelin/Repsol.
- En un bloque posterior convendrá normalizar nombres desde un manifest editorial, porque algunos filenames no reflejan perfectamente el nombre comercial.

#### Tareas pendientes

- Publicar el ajuste desde Lovable.
- Validar en producción home y `/clientes`.
- Decidir si se crea un manifest editorial de clientes con nombres comerciales revisados.
