# Next Steps

## Hechos

- La base técnica para `de` y `pt` de la biblioteca del vino está implementada, fusionada, desplegada y validada en producción.
- El cierre técnico previo quedó pusheado en `main` con `e009927`.
- El bloque editorial avanzado de biblioteca del vino quedó pusheado en `main` con `e3eab53 feat: enrich wine library editorial profiles`.
- El proyecto Lovable operativo es `https://lovable.dev/projects/2c4eed0e-6760-45f0-aeb3-ce44de8e91f1`.
- Las Edge Functions Supabase de este proyecto se gestionan desde Lovable.
- En esta sesión se añadió el primer bloque editorial avanzado:
  - 10 uvas prioritarias.
  - Seis idiomas: `es`, `en`, `it`, `fr`, `de`, `pt`.
  - Bloques de servicio/restauración, FAQs y maridajes.
  - Paridad entre frontend y prerender para bots.
  - Fallbacks localizados para evitar texto español en páginas internacionales.
- Verificaciones locales completadas:
  - `npm run test`: 15 tests.
  - `npm run build`.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`.
  - `git diff --check`.
  - Navegador local en rutas prioritarias `de`, `pt`, `it`, `fr`.
- El build mantiene avisos no bloqueantes de Browserslist y chunks grandes.
- El lint global y los avisos de seguridad Lovable siguen fuera del alcance de este bloque.
- Antes de seguir ampliando biblioteca del vino, se ejecutó auditoría SEO pública de producción como Googlebot.
- Informe de auditoría: `src/seo/SEO_PRODUCTION_AUDIT_2026-05-23.md`.
- Se ejecutó auditoría adicional de contenido, SEO semántico y posicionamiento en LLMs.
- Informe de auditoría: `src/seo/CONTENT_LLM_AUDIT_2026-05-23.md`.
- Resultados clave:
  - 2.989 URLs únicas en sitemap.
  - 534 URLs del sitemap devuelven 404.
  - 122 URLs HTTP 200 caen en `bot-fallback` con HTML genérico.
  - 156 URLs tienen hreflang esperado en sitemap ausente en HTML.
  - 276 URLs HTTP 200 canonicalizan a otra URL.
  - `robots.txt` anuncia `llms.txt` como sitemap aunque no es XML.
  - La biblioteca del vino nueva no tiene 404 en sitemap, pero hay 96 legacy shortcuts con título/H1 genérico.
- Hallazgos clave de contenido/LLM:
  - 128 rutas localizadas estáticas entregan a bots la home española.
  - 320 artículos internacionales declaran `html lang="es"`.
  - `llms.txt` existe, pero no es un mapa curado de páginas prioritarias y no hay `llms-full.txt`.
  - `robots.txt` permite crawlers de IA relevantes.
  - `analisis.winerim.wine` está indexable con señal SEO pobre.
  - Hay menciones externas positivas en TecnoVino y F6S.
- Search Console privada no se pudo auditar directamente sin acceso/exportación.
- Tras la auditoría se implementó localmente el primer bloque de correcciones SEO/LLM:
  - `robots.txt` ya no declara `llms.txt` como sitemap.
  - `llms.txt` se rehizo como mapa curado para IA.
  - Se creó `llms-full.txt`.
  - El sitemap filtra las familias de `seo_pages` no resolubles que causaban 534 URLs 404.
  - El sitemap excluye temporalmente 24 recursos/benchmarks/playbooks sin prerender específico.
  - El prerender ya genera rutas estáticas localizadas con idioma, canonical y hreflang propios.
  - Los artículos internacionales ya infieren idioma desde sufijos `_en`, `_it`, `_fr`, `_de` y `_pt`.
- Verificaciones locales posteriores al bloque:
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`.
  - `npm run build`.
  - `npm run test`: 15 tests.
  - `git diff --check`.
  - Prerender local como Googlebot validado en `/en/pricing`, `/de/preise` y `/precios`.
- Estas correcciones aún no están desplegadas ni validadas en producción.
- Se verificó la propiedad Search Console `https://winerim.wine/` con la cuenta `gugocreative@gmail.com`.
- Informe Search Console creado: `src/seo/SEARCH_CONSOLE_AUDIT_2026-05-23.md`.
- Datos Search Console principales:
  - 664 clics y 8,32 mil impresiones en 3 meses.
  - 73 páginas indexadas y 1.643 no indexadas.
  - 194 URLs 404.
  - 1.232 URLs descubiertas sin indexar.
  - 111 URLs rastreadas sin indexar.
  - `/sitemap.xml` correcto; `/sitemap_index.xml` sigue enviado desde 2022 aunque redirige a `/sitemap.xml`.
  - Home con grupo móvil de LCP pobre: 4,5 s.
  - 4 elementos FAQ no válidos por `FAQPage` duplicado.
  - Sin acciones manuales ni problemas de seguridad.
- Se desplegó Cloudflare Worker para:
  - servir `/google0be715f4ef205b3d.html`;
  - corregir redirects legacy de alta confianza detectados por Search Console.
- Worker desplegado para verificación y redirects legacy: `766e2cdd-da00-4157-8745-1f27c25a03e5`.
- Se corrigió localmente el `FAQPage` duplicado en `/software-carta-de-vinos`, `/como-vender-mas-vino-en-un-restaurante` y `/en/what-is-winerim`.
- `index.html` usa ahora IDs compatibles con `SEOHead` en los JSON-LD estáticos para evitar duplicados genéricos.
- Verificación local con navegador: las tres rutas anteriores tienen 1 solo `FAQPage` y 0 JSON-LD sin ID.
- Se añadió redirect directo `/estadisticas` y `/estadisticas/*` -> `/benchmarks-playbooks`.
- Worker final desplegado con redirect `/estadisticas/*`: `4f83ba4a-7994-4cf1-9ec6-d20368b5628b`.
- Producción verificada:
  - `/estadisticas/estadisticas-2024-01-28?codex=1` responde 301 a `/benchmarks-playbooks`.
  - `/google0be715f4ef205b3d.html?codex=1` responde 200.
  - `/clientes/canabota?codex=1` responde 301 a `/clientes`.
  - `/sitemap.xml?codex=1` responde 200.
- `npm run deploy:supabase:seo` no pudo desplegar Edge Functions por falta de `SUPABASE_ACCESS_TOKEN` o login Supabase CLI.
- Lovable en el navegador de Codex redirige a login; no se pudo publicar frontend ni Edge Functions desde esa vía.
- El bloque se commiteó y empujó a `origin/main` como `a98e8c6 fix: clean search console seo signals`.
- Antes del publish de Lovable, producción todavía no reflejaba `a98e8c6`:
  - `robots.txt` mantiene `llms.txt` como sitemap.
  - `llms-full.txt` responde 404.
  - `/en/pricing` como Googlebot sigue con `html lang="es"` y canonical a `/`.
- Antes del publish, Lovable seguía abierto en login dentro del navegador de Codex.
- Después de publicar Lovable, producción ya refleja el bloque:
  - `robots.txt` solo declara `https://winerim.wine/sitemap.xml`.
  - `llms-full.txt` responde HTTP 200.
  - `sitemap.xml` contiene 2.431 URLs y excluye familias 404 conocidas.
  - Googlebot en `/en/pricing`, `/de/preise` y `/pt/precos` recibe idioma/canonical propios.
  - Googlebot en `/article/alex-pardo_en` recibe `html lang="en"` e `inLanguage: "en"`.
  - `/software-carta-de-vinos`, `/como-vender-mas-vino-en-un-restaurante` y `/en/what-is-winerim` renderizan 1 solo `FAQPage`.
- No hizo falta redeployar Cloudflare Worker: redirects legacy, verificación GSC y sitemap proxy respondieron correctamente.

## Decisiones

- Continuar usando Lovable para publicar frontend y Edge Functions.
- Supabase CLI directo queda bloqueado sin `SUPABASE_ACCESS_TOKEN`; usar Lovable autenticado o token explícito si hace falta desplegar Edge Functions desde CLI.
- Desplegar Worker Cloudflare cuando el cambio afecte a proxy, verificación o redirects y esté validado con dry-run.
- Tratar el bloque editorial como fase 1 de profundidad máxima, no como cierre definitivo de contenido.
- Mantener tareas de lint global, seguridad Lovable y Search Console como líneas separadas.
- Priorizar salud SEO técnica antes de seguir sumando URLs/contenido: sitemap, Worker, prerender, hreflang, canonical y robots.
- Cruzar la auditoría pública con Search Console cuando haya acceso o exportaciones.
- Priorizar consistencia semántica para LLMs: idioma correcto, contenido específico por URL, schema alineado, canonicals limpias y fuentes citables.
- Usar exclusión temporal de sitemap para URLs que hoy no tienen respuesta SEO válida, y devolverlas solo cuando exista prerender/canonical real.
- Tratar el prerender estático localizado actual como corrección técnica intermedia, no como versión editorial definitiva.
- Mantener `llms.txt` como archivo informativo y no como sitemap XML.
- Mantener Search Console verificado por archivo HTML.
- No validar los 404 en Search Console hasta corregir el conjunto completo o al menos una familia completa.
- No reenviar `/sitemap.xml` hasta desplegar en Lovable las correcciones locales de `sitemap` y `prerender`.
- Usar `FAQSection` como fuente única de `FAQPage` para páginas con FAQs visibles.
- Mantener los JSON-LD estáticos de `index.html` como fallback con IDs que `SEOHead` pueda actualizar.
- No pedir validación FAQ en Search Console hasta publicar el frontend corregido desde Lovable.
- Usar `a98e8c6` como referencia de publicación.
- No considerar resuelto el despliegue aunque GitHub esté actualizado: producción debe validarse por HTTP.

## Hipótesis

- Tras desplegar este bloque, las fichas de las 10 uvas prioritarias deberían mejorar calidad percibida, utilidad comercial y superficie SEO internacional.
- Search Console puede tardar días en reflejar cambios de prerender, canonical y contenido.
- La siguiente ampliación debería priorizar entidades por demanda SEO, valor comercial y capacidad de enlazado interno.
- Los 404 del sitemap y los `bot-fallback` están limitando más la indexabilidad inmediata que la falta de más contenido editorial.
- Search Console probablemente confirmará los hallazgos públicos como errores de cobertura, canonicals inesperadas y duplicados.
- La presencia en LLMs mejorará más al limpiar contradicciones de entidad/idioma que al publicar más páginas finas.
- Tras desplegar el bloque, la próxima auditoría pública debería mostrar menos URLs enviadas con 404 y menos rutas localizadas canonicalizando a `/`.
- Search Console confirma que el tráfico orgánico depende demasiado de marca.
- La caída de `/en/pricing` debería mejorar después del despliegue de `prerender` localizado.
- La baja detección de enlaces internos indica que hace falta reforzar navegación HTML y enlaces contextuales.
- Los errores FAQ deberían resolverse tras publicar frontend y esperar recrawl de Google.
- El redirect `/estadisticas/*` debería reducir una familia concreta de 404 legacy.
- Puede quedar una duplicación específica de `SoftwareApplication` en páginas con schema propio adicional, pero ya no viene de los JSON-LD genéricos sin ID de `index.html`.
- Lovable requería publish manual para llevar `origin/main` a producción.
- Search Console puede recibir ya el sitemap y validaciones porque producción está corregida.

## Tareas pendientes

1. Despliegue Lovable del bloque SEO/LLM:
   - Hecho: frontend, `sitemap` y `prerender` reflejan el bloque en producción.
   - Hecho: no hizo falta redeployar Worker.
2. QA de producción post-despliegue:
   - Hecho: `robots.txt`, `llms-full.txt`, sitemap, rutas localizadas, artículo internacional y FAQ schema validados.
2.1. Logos home/clientes:
   - Hecho local: 8 logos de hoteles añadidos a `src/assets/logos/hotels-white/`.
   - Hecho local: 589 logos de clientes añadidos a `src/assets/logos/clients-white/`.
   - Hecho local: home usa los nuevos logos de hoteles en `LogoStrip`.
   - Hecho local: `/clientes` usa la galería estática de logos optimizados.
   - Hecho: actualización base commiteada y pusheada con `c7adcfe`.
   - Hecho local: `/clientes` vuelve a mostrar nombre visible de cada cliente bajo el logo.
   - Hecho local: home muestra los logos hoteleros con mayor tamaño visual.
   - Hecho local: build, tests, `git diff --check` y navegador local validados tras el ajuste visual.
   - Pendiente: publicar desde Lovable.
   - Pendiente: validar en producción home y `/clientes` tras publish.
   - Pendiente: decidir si se crea un manifest editorial para normalizar nombres comerciales de clientes.
3. Search Console:
   - Hecho: `/sitemap.xml` reenviado y leído el 24 may 2026, estado `Correcto`, 2.431 páginas descubiertas.
   - Hecho: validación de `FAQPage` duplicado iniciada el 24/5/26.
   - Hecho: inspección de `https://winerim.wine/software-carta-de-vinos` confirma URL indexada y 1 FAQ válido.
   - Bloqueado temporalmente: `Solicitar indexación` devolvió `Se ha producido un problema al enviar la solicitud de indexación. Vuelve a intentarlo más tarde.`
   - Exportar ejemplos completos de `Páginas`: 404, descubiertas sin indexar, rastreadas sin indexar, duplicadas y canónicas alternativas.
   - Cruzar los errores públicos con impresiones, clics, canónica elegida por Google y motivo de exclusión.
   - Monitorizar resultado de la validación FAQ.
   - Reintentar indexación manual más tarde para una tanda corta de URLs estratégicas, no para todo el sitemap.
   - Pedir validación de 404 cuando se completen familias de redirects/correcciones.
   - Revisar si se puede retirar `/sitemap_index.xml` desde la vista de detalle o configuración.
4. P0 destino definitivo de URLs excluidas:
   - Decidir si las familias `grape/uva/vitigno/rebsorte/cepage/casta`, cursos, regiones y `software-carta-vinhos-*` quedan fuera, redirigen o se convierten en páginas reales.
   - Decidir si los 24 recursos/benchmarks/playbooks vuelven al sitemap con prerender propio o permanecen fuera.
5. P0 redirects legacy Search Console:
   - Completar mapa de redirects para los 194 404.
   - `/estadisticas/*` ya redirige a `/benchmarks-playbooks`.
   - Priorizar antiguas URLs `/en/.../`, clientes antiguos y posts de WordPress con señales.
   - Mantener 410 solo para URLs sin equivalente útil.
6. P0 prerender de páginas programáticas:
   - Corregir 122 URLs en `bot-fallback`.
   - Revisar especialmente `wine-list-software-*` y `software-carta-de-vinos-*`.
   - Asegurar título, H1, canonical y contenido específicos para Googlebot, o retirar esas URLs del sitemap.
7. P1 hreflang/canonical:
   - Unificar `ROUTE_MAP`/`HREFLANG_MAP` para evitar duplicación entre sitemap y prerender.
   - Añadir `de`/`pt` solo donde haya rutas reales y mantenerlo sincronizado.
   - Corregir recursos, benchmarks/playbooks con canonical específico antes de devolverlos al sitemap.
8. P1 prerender e idioma:
   - Sustituir la plantilla genérica de rutas estáticas localizadas por contenido editorial más específico para home, pricing, blog, demo, contacto, recursos, herramientas y páginas core.
   - Definir si los artículos internacionales deben vivir en `/article/slug_lang` o en rutas localizadas `/en/article/slug`.
9. P1 Core Web Vitals:
   - Optimizar LCP móvil de la home.
   - Revisar imagen/hero inicial, JS crítico, preload y tamaño de bundles.
10. P1 schema:
   - Hecho: arreglo `FAQPage` publicado en producción y validación Search Console iniciada.
   - Monitorizar resultado de validación para `/software-carta-de-vinos` y `/como-vender-mas-vino-en-un-restaurante`.
   - Revisar si `WhatIsWinerim` debe conservar schema `SoftwareApplication` adicional o transformarlo en `AboutPage`/`WebPage` con `mainEntity`.
11. P1 LLMs:
   - Añadir páginas de evidencia, casos y comparativas con datos citables.
   - Reforzar enlaces internos desde `llms.txt`/`llms-full.txt` hacia las páginas más maduras.
12. P1 subdominios/legacy externos:
   - Revisar `analisis.winerim.wine`: añadir canonical/noindex o convertirlo en landing SEO válida.
   - Redirigir o resolver URLs antiguas que aparecen en búsqueda pública y hoy terminan en 404.
13. P2 biblioteca del vino:
   - Resolver los 96 legacy shortcuts con redirects canónicos o metadatos únicos.
   - Mantener las rutas nuevas de biblioteca como superficie principal.
14. Siguiente bloque editorial máximo nivel:
   - Priorizar 30-50 entidades por potencial SEO.
   - Ampliar uvas con más intención: Syrah, Merlot, Malbec, Nebbiolo, Sangiovese, Verdejo, Viura, Xarel-lo, Godello, Chenin Blanc.
   - Ampliar regiones: Rioja, Ribera del Duero, Rias Baixas, Rueda, Priorat, Borgoña, Burdeos, Champagne, Douro, Vinho Verde.
   - Añadir schema por entidad: `Article`, `FAQPage`, `BreadcrumbList`, `DefinedTerm`/`ItemList` donde encaje.
   - Crear enlaces internos por intención: uva -> región -> estilo -> maridaje -> guía de servicio.
15. Deuda separada:
   - Resolver lint global.
   - Revisar avisos de seguridad de Lovable.

## Actualización 2026-05-24: auditoría profunda web

## Hechos

- Informe nuevo: `src/seo/WEB_DEEP_AUDIT_2026-05-24.md`.
- Worker desplegado: `winerim-proxy` Version ID `4cc5425b-cc8d-4de4-a72f-d9370b355426`.
- Producción ya emite `X-Robots-Tag: noindex, follow` en `/privacidad` y `/en/privacy` para Googlebot.
- Cambios locales pendientes de Lovable:
  - Sitemap sin legales ni city pages fallback.
  - Prerender legal exacto con canonical propio en 6 idiomas.
  - Frontend legal con `noindex`.
  - Assets de logos renombrados para evitar espacios/caracteres especiales.
- Lighthouse mobile actual:
  - Home Performance 58, LCP 12,9 s.
  - `/clientes` Performance 57, LCP 12,1 s.
- 404 detectado pendiente: `https://winerim.wine/~api/analytics`.

## Decisiones

- Prioridad inmediata: publicar y revalidar los cambios SEO/UX ya implementados antes de seguir ampliando biblioteca del vino.
- Las city pages deben salir del sitemap mientras no tengan prerender real.
- Las legales quedan accesibles pero no indexables.
- La siguiente mejora transversal debe centrarse en Core Web Vitals y errores de consola.

## Hipótesis

- Publicar el sitemap limpio reducirá URLs descubiertas sin contenido útil y canonicals inesperadas.
- Reducir JS inicial y optimizar imágenes tendrá más impacto en LCP que tocar servidor.
- `/clientes` necesita estrategia de carga progresiva o paginación/virtualización si se mantienen cientos de logos visibles.

## Tareas pendientes inmediatas

1. Publicar desde Lovable:
   - Frontend.
   - Edge Function `sitemap`.
   - Edge Function `prerender`.
2. Revalidar tras Lovable:
   - `/sitemap.xml` sin legales ni city pages fallback.
   - `/en/privacy` como Googlebot con título `Privacy Policy`, canonical `/en/privacy` y `noindex, follow`.
   - `/clientes` sin 404 de logos.
3. Reenviar `/sitemap.xml` en Search Console tras validar producción.
4. Resolver `~api/analytics`.
5. Abrir bloque Core Web Vitals:
   - Home LCP.

## Actualización 2026-05-24: cierre parcial analytics y `/clientes`

## Hechos

- Hecho: `~api/analytics` ya no responde 404 en producción.
- Worker desplegado: `5e984988-b0c1-4fa2-b5f8-dc0e62fabe0f`.
- Producción verificada:
  - `GET /~api/analytics` -> HTTP 204.
  - `OPTIONS /~api/analytics` -> HTTP 204.
  - Header `X-Worker-Branch: analytics-noop`.
- Hecho local: `/clientes` ya no renderiza 589 logos de golpe.
- Hecho local: `/clientes` renderiza 120 logos iniciales y carga 120 más por click.
- Hecho local: el contador/botón de carga progresiva está traducido a `es`, `en`, `it`, `fr`, `de` y `pt`.
- QA local:
  - 120 logos iniciales.
  - 240 logos tras click en `Ver más clientes`.
  - Sin errores de consola.
- Validaciones:
  - `npm run build`: correcto.
  - `npm run test`: 15 tests correctos.
  - `git diff --check`: correcto.
  - `npm run deploy:worker:dry-run`: correcto.
- `npm run lint` falla por deuda global preexistente y no por el cambio de `/clientes`.
- Bloqueo actual: Lovable sigue sin sesión disponible en Codex, por lo que frontend, `sitemap` y `prerender` siguen requiriendo publish manual/autenticado.

## Decisiones

- Mantener `~api/analytics` como 204 noop en Worker.
- Mantener galería completa de clientes, pero con carga progresiva para reducir coste inicial.
- No reenviar sitemap ni pedir nuevas validaciones de Search Console hasta publicar y validar Lovable.

## Hipótesis

- `/clientes` debería mejorar en DOM inicial/LCP una vez publicado el frontend.
- Lighthouse debería dejar de reportar el 404 de analytics.
- Home sigue siendo el siguiente foco principal de Core Web Vitals.

## Tareas pendientes inmediatas

1. Publicar desde Lovable:
   - Hecho: frontend.
   - Hecho: Edge Function `sitemap`.
   - Hecho: Edge Function `prerender`.
2. Revalidar producción tras Lovable:
   - Hecho: `/sitemap.xml` tiene 2.072 URLs y no incluye legales ni city pages fallback comprobadas.
   - Hecho: legales en 6 idiomas como Googlebot con canonical propio y `noindex, follow`.
   - Hecho: `/clientes` con 120 logos iniciales, botón de carga progresiva y sin 404 same-origin de assets.
3. Reejecutar Lighthouse móvil:
   - Hecho: home Performance 59, LCP 11,2 s.
   - Hecho: `/clientes` Performance 57, LCP 12,3 s, DOM 1.255.
4. Reenviar `/sitemap.xml` en Search Console.
5. Reintentar indexación manual de una lista corta:
   - `https://winerim.wine/software-carta-de-vinos`
   - `https://winerim.wine/como-vender-mas-vino-en-un-restaurante`
   - `https://winerim.wine/en/pricing`
   - `https://winerim.wine/de/preise`
   - `https://winerim.wine/pt/precos`
   - `https://winerim.wine/biblioteca-vino`
   - `https://winerim.wine/en/wine-library`
   - `https://winerim.wine/de/weinbibliothek`
   - `https://winerim.wine/pt/biblioteca-vinho`
6. Siguiente bloque Core Web Vitals:
   - Home LCP.
   - `/clientes` LCP.
   - Imágenes responsive.
   - JS inicial no usado.
   - Chunks grandes.
   - Cache TTL de assets.

## Actualización 2026-05-24: cierre Search Console + Core Web Vitals home

## Hechos

- Search Console:
  - `/sitemap.xml` reenviado correctamente.
  - `https://winerim.wine/software-carta-de-vinos` añadida a cola prioritaria de rastreo.
  - `https://winerim.wine/de/weinbibliothek` sigue sin confirmación de indexación manual porque la UI quedó bloqueada probando la URL.
  - La tanda automatizada de URLs estratégicas quedó con resultado no verificable por timeout.
- Core Web Vitals home implementado localmente:
  - Home bajo el fold diferida tras `load`.
  - Footer y chat diferidos.
  - Navbar inicial sin `framer-motion`.
  - Preloads iniciales del build reducidos a `vendor-react`, `vendor-query` y `vendor-router`.
  - `fetchPriority` camelCase eliminado de `src`; se usa `fetchpriority` donde aplica.
- QA local:
  - `npm run test`: 5 archivos, 15 tests.
  - `npm run build`.
  - `git diff --check`.
  - Preview local home con H1 visible, chunks bajo el fold cargando después del delay, dropdown desktop y menú móvil correctos.

## Decisiones

- Siguiente acción operativa: commit/push y publish Lovable de este bloque.
- No repetir solicitudes masivas de indexación; usar tandas cortas y registrar solo confirmaciones explícitas.
- Medir Core Web Vitals en producción después del publish, no antes.

## Hipótesis

- Este bloque debería bajar presión de JS alrededor del primer viewport y mejorar LCP móvil cuando llegue a producción.
- Search Console tardará días en reflejar cambios de sitemap/indexación y semanas en estabilizar métricas Core Web Vitals de campo.

## Tareas pendientes listas para retomar

1. Commit y push del bloque Core Web Vitals.
2. Publicar desde Lovable.
3. Revalidar producción:
   - Home renderiza hero correctamente.
   - Preloads iniciales siguen sin vendors pesados.
   - Menú desktop/móvil funciona.
   - Chat carga diferido.
4. Reejecutar Lighthouse móvil en home tras publish.
5. Reintentar en Search Console `Solicitar indexación` para `https://winerim.wine/de/weinbibliothek`.
6. Continuar bloque máximo nivel de biblioteca del vino tras cerrar publicación y medición de este saneamiento.
7. Decidir destino definitivo de city pages.
8. Resolver contradicción de `src/seo/route-map.ts` frente al mapa real `de`/`pt`.

## Actualización 2026-05-25: siguiente retoma tras segundo bloque Core Web Vitals

## Hechos

- El bloque `553d17c` sí está publicado en producción, pero Lighthouse mobile de home sigue alrededor de Performance 60 y LCP 10,97 s.
- Se encontró que el entry publicado aún cargaba `vendor-motion` y `vendor-charts` de forma estática.
- Se implementó, commiteó y pusheó `7cccf3d fix: remove heavy vendors from home startup`.
- `7cccf3d` corrige:
  - `react/jsx-runtime` dentro de `vendor-react`.
  - utilidades UI en `vendor-ui-utils`.
  - eliminación del `TooltipProvider` lazy global.
  - diferido de chrome no crítico de aplicación tras `load`/idle.
- Validación local de `7cccf3d`:
  - `npm run build`: correcto.
  - `npm run test`: 15 tests.
  - `git diff --check`: correcto.
  - QA navegador preview: H1, dropdown desktop y consola correctos.
  - Lighthouse mobile preview: Performance 96 y LCP 2,26 s.
- Producción aún no refleja el cambio de código `7cccf3d`; sigue sirviendo `/assets/index-D4-5gxc6.js`.
- Publicar `main` incluye el cambio de código `7cccf3d`, aunque puede haber commits posteriores solo de documentación.

## Decisiones

- La prioridad inmediata es publicar `main` desde Lovable y medir producción.
- No seguir ampliando biblioteca del vino hasta validar este segundo bloque de rendimiento o dejarlo explícitamente aparcado.
- Si producción no mejora tras `7cccf3d`, el siguiente bloque debe centrarse en third-party JS y CSS render-blocking.

## Hipótesis

- `7cccf3d` debería ser el salto real para LCP sintético de home.
- Los datos de Search Console/Core Web Vitals no cambiarán en tiempo real aunque Lighthouse mejore tras publish.

## Tareas pendientes listas para retomar

1. Publicar `main` desde Lovable; contiene el cambio de código `7cccf3d`.
2. Verificar producción tras publish:
   - Entry nuevo distinto de `/assets/index-D4-5gxc6.js`.
   - Sin imports estáticos de `vendor-motion`, `vendor-charts`, `vendor-radix` ni `vendor-supabase`.
   - Preloads iniciales ligeros con `vendor-ui-utils`.
   - Home, dropdown desktop y menú móvil funcionando.
3. Ejecutar Lighthouse mobile en producción para home.
4. Si el resultado es bueno, volver a Search Console:
   - Reintentar indexación de `https://winerim.wine/de/weinbibliothek`.
   - Monitorizar validación FAQ.
   - Vigilar lectura del sitemap limpio.
5. Si el resultado sigue flojo, abrir bloque third-party:
   - GTM.
   - Google Ads.
   - Meta Pixel.
   - Chat.
   - CSS render-blocking.
6. Después de cerrar rendimiento, retomar biblioteca del vino al máximo nivel.

## Actualización 2026-05-25: retoma tras revalidar producción publicada

## Hechos

- El deploy de `main` ya está activo en producción.
- Producción sirve entry nuevo `/assets/index-Fu3lyPiF.js`.
- El entry publicado ya no importa estáticamente `vendor-motion`, `vendor-charts`, `vendor-radix` ni `vendor-supabase`.
- Modulepreloads iniciales ligeros confirmados: `vendor-react`, `vendor-query`, `vendor-router`, `vendor-ui-utils`.
- Home y dropdown desktop funcionan; no se detectaron errores de consola.
- Lighthouse mobile de home sigue mal:
  - Performance 60.
  - LCP 11,38 s.
  - FCP 5,14 s.
  - TBT 110,5 ms.
  - CLS 0,002.
- El LCP es el H1 y el 93% del tiempo es render delay.
- Bloquear terceros en Lighthouse no mejoró el LCP, así que terceros no son la única causa.

## Decisiones

- Siguiente prioridad: `Core Web Vitals home: render delay H1`.
- No seguir con biblioteca del vino hasta cerrar o aparcar explícitamente este punto de rendimiento.
- Terceros siguen siendo importantes, pero pasan detrás del diagnóstico del H1.

## Hipótesis

- El H1 se contabiliza tarde por CSS/fuentes/animación/gradient en throttling móvil.
- El siguiente cambio con mayor probabilidad de impacto es estabilizar el primer paint del H1:
  - sin animación;
  - color sólido inicial;
  - fuente crítica local/preload o fuente del sistema para hero;
  - CSS crítico above-the-fold.

## Tareas pendientes listas para retomar

1. Crear una variante local del hero sin `animate-fade-in-up` en el H1.
2. Medir Lighthouse preview y, si mejora, aplicar el cambio.
3. Si no mejora, probar H1 con color sólido inicial en vez de gradient text.
4. Si no mejora, probar fuentes críticas self-host/preload o fuente del sistema para el H1.
5. Después, volver a production Lighthouse.
6. Solo cuando LCP esté controlado, abordar terceros:
   - GTM/Ads.
   - Meta Pixel.
   - Clarity.
   - Leadfeeder.
   - Chat.
7. Retomar biblioteca del vino al máximo nivel cuando el bloque de rendimiento quede cerrado o aparcado.

## Actualización 2026-05-25: cierre variante H1 sin animación

## Hechos

- Se aplicó la primera variante del bloque `Core Web Vitals home: render delay H1`.
- Cambio realizado: el H1 de `src/components/landing/HeroSection.tsx` ya no tiene `animate-fade-in-up`.
- Se mantuvieron intactos:
  - `text-gradient-wine`.
  - `font-heading` / Playfair Display.
  - Google Fonts.
  - CSS crítico.
- Verificación local completada:
  - `npm run build`: correcto.
  - `npm run test`: 15 tests correctos.
  - `git diff --check`: correcto.
  - Preview local: H1 visible, `animationName: none`, `opacity: 1`.
  - Lighthouse mobile local: Performance 96, FCP 2,0 s, LCP 2,3 s, TBT 110 ms, CLS 0,007.
- Commit y push realizados: `b86d06d fix: remove hero h1 entrance animation`.
- Lovable sigue redirigiendo a login en el navegador de Codex; el publish requiere sesión Lovable activa o publicación manual/autenticada.

## Decisiones

- Publicar y medir esta variante antes de añadir más cambios.
- No mezclar todavía gradiente, fuentes ni CSS crítico para conservar una lectura limpia de Lighthouse.

## Hipótesis

- Si la animación era la causa del LCP tardío, producción debería mostrar menor `render delay`.
- Si no mejora, la causa más probable se desplaza a gradiente/fuente/CSS crítico.

## Tareas pendientes listas para retomar

1. Publicar `main` desde Lovable; contiene `b86d06d`.
2. Avisar cuando esté publicado para revalidar producción.
3. Revalidar producción:
   - Confirmar H1 sin `animate-fade-in-up`.
   - Ejecutar Lighthouse mobile home.
   - Comparar LCP y `render delay` contra la medición anterior: LCP 11,38 s y render delay 10,57 s.
4. Si sigue alto, probar H1 con color sólido inicial en vez de `text-gradient-wine`.
5. Si sigue alto, probar fuente crítica self-host/preload o fuente del sistema solo para el hero.
6. Después de cerrar o aparcar este bloque, retomar biblioteca del vino al máximo nivel.

## Actualización 2026-05-25: siguiente retoma tras revalidar H1 sin animación

## Hechos

- El deploy de Lovable sí publicó la variante sin animación.
- Producción sirve deployment `05d29c6a-1f11-4a80-8af5-c913bfa8d990`.
- Entry publicado: `/assets/index-B3ya-SL1.js`.
- H1 publicado:
  - Sin `animate-fade-in-up`.
  - `animationName: none`.
  - `opacity: 1`.
- Lighthouse mobile producción de esta variante:
  - Performance 58.
  - FCP 6,2 s.
  - LCP 11,1 s.
  - Render Delay 10,3 s.
  - LCP sigue siendo el H1.
- Se aplicó localmente la siguiente variante:
  - Primer tramo del H1 con `text-wine-light`.
  - Se eliminó `text-gradient-wine` solo en el H1 de home.
- Validación local:
  - `npm run build`: correcto.
  - `npm run test`: 15 tests correctos.
  - `git diff --check`: correcto.
  - QA navegador: primer tramo sin background/gradient, H1 visible y sin animación.
  - Lighthouse local: Performance 96, FCP 2,0 s, LCP 2,3 s.

## Decisiones

- La animación no explica el LCP alto de producción.
- Publicar y medir la variante de color sólido antes de pasar a fuentes/CSS crítico.

## Hipótesis

- Si `text-gradient-wine`/background-clip era parte del problema, producción debe bajar el render delay.
- Si no baja, el siguiente foco será fuente crítica o CSS render-blocking.

## Tareas pendientes listas para retomar

1. Commit y push de la variante color sólido.
2. Publicar `main` desde Lovable.
3. Revalidar producción:
   - Entry nuevo distinto de `/assets/index-B3ya-SL1.js`.
   - H1 con `text-wine-light` y sin `text-gradient-wine`.
   - Lighthouse mobile home.
   - Comparar contra LCP 11,1 s y render delay 10,3 s.
4. Si sigue alto, probar fuente del sistema solo para el H1/hero o self-host/preload de Playfair crítica.
5. Después, abordar CSS crítico/terceros si sigue pendiente.

## Actualización 2026-05-25: siguiente retoma tras color sólido

## Hechos

- El deploy de Lovable publicó la variante de H1 con color sólido.
- Producción sirve deployment `9d5642ab-6d1f-4806-b6c3-26c1b330db23`.
- Entry publicado: `/assets/index-QyK9ToNR.js`.
- H1 publicado:
  - Sin `animate-fade-in-up`.
  - Primer tramo con `text-wine-light`.
  - Sin `text-gradient-wine` en el H1.
  - `backgroundImage: none`.
- Lighthouse mobile producción de esta variante:
  - Performance 63.
  - FCP 5,1 s.
  - LCP 7,0 s.
  - Render Delay 6,19 s.
  - LCP sigue siendo el H1.
- La variante color sólido mejoró de forma material frente a:
  - H1 sin animación: LCP 11,1 s, render delay 10,3 s.
  - Bundle optimizado previo: LCP 11,38 s, render delay 10,57 s.
- Se aplicó localmente la siguiente variante:
  - H1 con `font-serif lg:font-heading`.
  - Móvil/tablet usan fuente serif del sistema.
  - Desktop `lg` mantiene Playfair Display.
- Validación local:
  - `npm run build`: correcto.
  - `npm run test`: 15 tests correctos.
  - `git diff --check`: correcto.
  - QA navegador desktop: Playfair se conserva en 1280 px.
  - Lighthouse local: Performance 96, FCP 1,9 s, LCP 2,2 s.

## Decisiones

- Mantener color sólido del H1.
- Probar fuente del sistema solo para móvil/tablet antes de tocar CSS crítico.
- Conservar Playfair en desktop para mantener identidad visual.

## Hipótesis

- La fuente externa Playfair aún puede estar retrasando el LCP móvil.
- Si la variante no mejora producción, el siguiente bloque debe ir a CSS crítico/inline above-the-fold.

## Tareas pendientes listas para retomar

1. Commit y push de la variante `font-serif lg:font-heading`.
2. Publicar `main` desde Lovable.
3. Revalidar producción:
   - Entry nuevo distinto de `/assets/index-QyK9ToNR.js`.
   - H1 con `font-serif lg:font-heading`.
   - Lighthouse mobile home.
   - Comparar contra LCP 7,0 s y render delay 6,19 s.
4. Si mejora pero sigue por encima de objetivo, abrir bloque CSS crítico.
5. Si no mejora, valorar revertir fuente móvil y centrar el bloque en CSS/terceros.

## Actualización 2026-05-25: cierre local de arranque ligero y ficha humana de biblioteca

## Hechos

- Hecho: la variante `font-serif lg:font-heading` ya está publicada en producción con deployment `25c70cc4-cb78-4036-b43a-73bd41ee085a` y entry `/assets/index-howILT12.js`.
- Hecho: producción conserva `vendor-query` en el preload inicial.
- Hecho: Lighthouse mobile producción de la variante fuente móvil es inestable:
  - Run favorable: Performance 85, LCP 3,5 s.
  - Run posterior: Performance 63, LCP 7,9 s.
- Hecho local: se extrajo `src/data/wineLibraryRoutes.ts` para que el selector de idioma no cargue la capa editorial completa de biblioteca.
- Hecho local: `App` ya no usa `QueryClientProvider` y `usePageContent` usa caché manual.
- Hecho local: el build deja preloads iniciales en `vendor-react`, `vendor-router` y `vendor-ui-utils`; ya no aparece `vendor-query`.
- Hecho producción actual: `/de/weinbibliothek/rebsorten/tempranillo` como usuario humano no muestra H1 ni bloque `Service-Intelligenz`.
- Hecho local: `GrapeDetail` añade `TooltipProvider` local y la ruta alemana de Tempranillo renderiza H1 y bloque editorial.
- Hecho: el bloque quedó commiteado y pusheado a `origin/main` con `f26443a fix: slim startup and restore grape detail render`.
- Verificación local completada:
  - `npm run test`: 16 tests.
  - `npm run build`.
  - `git diff --check`.
  - QA navegador local de home y ficha alemana.
  - Lighthouse mobile local home: Performance 98, FCP 1,7 s, LCP 2,1 s.

## Decisiones

- Mantener la variante H1 actual, pero no declarar resuelto Core Web Vitals hasta validar el nuevo arranque sin `vendor-query`.
- Mantener providers de UI pesados localizados por ruta.
- Mantener biblioteca del vino como superficie prioritaria, pero corregir primero el bug humano de fichas de uva antes de escalar más contenido.

## Hipótesis

- Publicar este bloque debería:
  - Reducir el entry/preloads iniciales de home.
  - Arreglar fichas humanas de uva localizadas.
  - Dar una base más limpia para decidir si el siguiente foco es CSS crítico.

## Tareas pendientes listas para retomar

1. Publicar `main` desde Lovable; debe incluir `f26443a`.
2. Revalidar producción:
   - Entry nuevo distinto de `/assets/index-howILT12.js`.
   - Modulepreloads sin `vendor-query`.
   - Home sin errores y H1 correcto.
   - `/de/weinbibliothek/rebsorten/tempranillo` con H1 `Tempranillo` y bloque `Service-Intelligenz`.
   - Lighthouse mobile home con dos muestras.
3. Si LCP sigue inestable, abrir bloque CSS crítico/above-the-fold.
4. Después de cerrar o aparcar Core Web Vitals, retomar ampliación máxima de biblioteca del vino:
   - 30-50 uvas/regiones/estilos por demanda SEO.
   - Enlazado interno por intención.
   - Schema por entidad.
   - Contenido editorial profundo por idioma.

## Actualización 2026-05-25: producción validada tras `f26443a`

## Hechos

- Hecho: el publish de Lovable ya está activo en producción.
- Hecho: producción sirve deployment `baa85387-7e8f-4f71-a058-0633f8767465`.
- Hecho: home sirve entry `/assets/index-BRCyx101.js`, distinto de `/assets/index-howILT12.js`.
- Hecho: modulepreloads iniciales ya no incluyen `vendor-query`; quedan `vendor-react`, `vendor-router` y `vendor-ui-utils`.
- Hecho: el entry publicado no contiene imports estáticos de `vendor-motion`, `vendor-charts`, `vendor-radix` ni `vendor-supabase`.
- Hecho: home mantiene H1 correcto, sin animación, con color sólido y fuente del sistema en móvil.
- Hecho: `/de/weinbibliothek/rebsorten/tempranillo` renderiza H1 `Tempranillo` y bloque `Service-Intelligenz` como usuario humano.
- Hecho: Lighthouse mobile producción sigue variable:
  - Mejor muestra: Performance 85, LCP 3,4 s.
  - Segunda muestra: Performance 68, LCP 7,9 s.

## Decisiones

- El bloque de publish `f26443a` queda cerrado.
- El bug humano de la ficha alemana de Tempranillo queda corregido en producción.
- Core Web Vitals sigue abierto por inestabilidad de LCP.

## Hipótesis

- El siguiente cuello de rendimiento está probablemente en CSS crítico/render-blocking, fuentes o condiciones externas de medición, no en React Query ni en vendors pesados iniciales.
- La biblioteca del vino ya puede retomarse sobre una base más limpia, siempre que no se reintroduzca carga editorial en el arranque global.

## Tareas pendientes listas para retomar

1. Elegir siguiente bloque:
   - Opción A: CSS crítico/above-the-fold para estabilizar LCP móvil.
   - Opción B: retomar ampliación máxima de biblioteca del vino.
2. Si seguimos performance:
   - Auditar CSS render-blocking.
   - Probar inline crítico del hero/navbar.
   - Medir Lighthouse con varias muestras.
3. Si retomamos biblioteca:
   - Priorizar 30-50 uvas/regiones/estilos.
   - Ampliar contenido por idioma.
   - Añadir schema por entidad.
   - Reforzar enlaces internos uva -> región -> estilo -> maridaje -> guía de servicio.

## Actualización 2026-05-25: CSS crítico listo para publish

## Hechos

- Hecho local: se implementó CSS crítico above-the-fold en `index.html`.
- Hecho local: `vite.config.ts` convierte el CSS de build en no bloqueante:
  - preload;
  - stylesheet `media="print"` con `onload`;
  - fallback `noscript`.
- Hecho local: Lighthouse mobile preview muestra 0 recursos render-blocking.
- Hecho local: Lighthouse mobile preview:
  - Run 1: Performance 98, LCP 2,0 s.
  - Run 2: Performance 97, LCP 2,1 s.
- Hecho local: home móvil/desktop y ficha alemana de Tempranillo pasan QA de Chrome sin errores.
- Hecho local: `npm run build`, `npm run test` y `git diff --check` correctos.
- Commit técnico: `6627bda fix: load build css non-blocking`.

## Decisiones

- Continuar por publish Lovable y medición productiva antes de tocar terceros o ampliar biblioteca.
- Mantener el CSS crítico limitado a navbar/hero para no convertir `index.html` en una segunda hoja de estilos completa.

## Hipótesis

- Al publicar, Lighthouse debería dejar de marcar el CSS principal como render-blocking.
- Si LCP sigue variable en producción, habrá que mirar terceros/orden de hidratación/caché, porque CSS bloqueante quedaría descartado.

## Tareas pendientes listas para retomar

1. Pushear `main` si aún no está subido.
2. Publicar `main` desde Lovable.
3. Revalidar producción:
   - HTML contiene `critical-above-fold-css`.
   - CSS principal carga no bloqueante.
   - Lighthouse mobile no lista recursos render-blocking.
   - Home móvil/desktop correcta.
   - `/de/weinbibliothek/rebsorten/tempranillo` correcta.
4. Si mejora y queda estable, retomar biblioteca del vino al máximo nivel.
5. Si sigue variable, auditar terceros/orden de hidratación.

## Actualización 2026-05-25: CSS crítico validado en producción

## Hechos

- Hecho: el publish de Lovable está activo.
- Hecho: producción sirve deployment `0e7c5ea6-8b8a-4638-a5f7-01e2335d8106`.
- Hecho: el HTML de home contiene `critical-above-fold-css`.
- Hecho: el CSS principal carga no bloqueante y conserva fallback `noscript`.
- Hecho: Lighthouse mobile producción ya no lista recursos render-blocking.
- Hecho: métricas Lighthouse mobile:
  - Run 1: Performance 73, LCP 6,6 s.
  - Run 2: Performance 71, LCP 6,7 s.
- Hecho: home móvil/desktop y Tempranillo alemán pasan QA de Chrome sin errores.

## Decisiones

- El bloque CSS crítico queda cerrado.
- Core Web Vitals sigue abierto porque el LCP todavía no está en objetivo.
- El siguiente bloque de performance debe mirar terceros/hidratación, no CSS render-blocking.

## Hipótesis

- El LCP restante puede depender de scripts de terceros, orden de ejecución inicial o cuándo se estabiliza el H1 tras hidratación.
- Si se decide priorizar crecimiento de contenido, ya podemos retomar biblioteca del vino con una base técnica bastante más limpia.

## Tareas pendientes listas para retomar

1. Elegir siguiente dirección:
   - Performance: terceros/hidratación.
   - Contenido: biblioteca del vino al máximo nivel.
2. Si seguimos performance:
   - Auditar GTM, Ads, Meta, Clarity, Leadfeeder y chat.
   - Probar carga por consentimiento/idle.
   - Medir LCP en 2-3 runs por variante.
3. Si retomamos biblioteca:
   - Priorizar 30-50 entidades.
   - Crear contenido profundo por idioma.
   - Añadir schema y enlaces internos por intención.

## Actualización 2026-05-25: GTM diferido listo para publish

## Hechos

- Hecho local: se auditó la carga de terceros del primer viewport.
- Hecho local: Consent Mode v2 sigue inicializado antes de GTM.
- Hecho local: GTM dejó de cargarse inmediatamente en el `head`.
- Hecho local: el nuevo snippet carga GTM después de `load` + `requestIdleCallback`, con fallback `setTimeout`.
- Hecho local: el chat ya estaba diferido y no se cambió.
- Hecho local: el iframe `noscript` de GTM se conserva.
- Commit técnico creado: `e164294 fix: defer gtm until after load`.
- Push completado a `origin/main`; el commit técnico del cambio es `e164294 fix: defer gtm until after load`.
- Producción revisada después del push todavía no refleja el cambio:
  - Deployment activo: `94aea691-4fe9-4a08-84c0-135f46fa300f`.
  - Entry activo: `/assets/index-BRCyx101.js`.
  - No contiene `__winerimLoadGtm`.
  - Todavía contiene el snippet inmediato antiguo de GTM.
- Falta publish desde Lovable.
- Verificación local:
  - `npm run build`: correcto.
  - `npm run test`: 16 tests correctos.
  - `git diff --check`: correcto.
  - Lighthouse mobile preview:
    - Run 1: Performance 98, FCP 1,8 s, LCP 2,1 s, TBT 90 ms, CLS 0,006.
    - Run 2: Performance 97, FCP 1,7 s, LCP 2,1 s, TBT 110 ms, CLS 0,006.
  - Home y Tempranillo alemán pasan QA local sin errores de consola.

## Decisiones

- Mantener Consent Mode temprano.
- Diferir GTM antes de tocar configuración interna del contenedor.
- No tocar Worker ni Supabase en este bloque.
- Medir producción antes de seguir con biblioteca del vino.

## Hipótesis

- Este cambio puede reducir competencia de terceros antes del LCP en producción.
- Si no hay mejora clara, el cuello estará probablemente en hidratación/render del H1 o en coste del entry inicial.
- Las métricas de Search Console/Core Web Vitals tardarán en reflejar cambios aunque Lighthouse responda antes.

## Tareas pendientes listas para retomar

1. Hecho: pushear `main` con `e164294` y documentación.
2. Pendiente: publicar `main` desde Lovable.
3. Revalidar producción:
   - HTML contiene `__winerimLoadGtm`.
   - Consent Mode sigue antes de GTM.
   - GTM no usa el snippet inmediato antiguo.
   - Home móvil/desktop correcta.
   - `/de/weinbibliothek/rebsorten/tempranillo` correcta.
   - Lighthouse mobile home con 2-3 muestras.
4. Si LCP mejora y queda estable, retomar biblioteca del vino al máximo nivel.
5. Si LCP sigue alto, auditar hidratación/render del H1 y coste del entry inicial.

## Actualización 2026-05-25: siguiente paso inmediato

## Hechos

- GitHub `main` está limpio y sincronizado con `origin/main`.
- Producción sigue sin el cambio de GTM diferido.
- Lovable está abierto y autenticado en Chrome.
- `Publish` está visible.
- La UI Lovable no muestra explícitamente `e164294` tras recarga.

## Decisiones

- Antes de pulsar `Publish`, pedir confirmación explícita al usuario.

## Hipótesis

- Publicar puede bastar si Lovable usa el último estado sincronizado aunque la UI no muestre el commit.
- Si no basta, habrá que forzar la sincronización GitHub -> Lovable.

## Tareas pendientes listas para retomar

1. Confirmación del usuario para pulsar `Publish` en Lovable.
2. Pulsar `Publish`.
3. Esperar despliegue.
4. Revalidar producción:
   - `__winerimLoadGtm`.
   - ausencia del snippet inmediato antiguo de GTM.
   - QA home y Tempranillo alemán.
   - Lighthouse mobile 2-3 muestras.
5. Actualizar documentos con el resultado real.

## Actualización 2026-05-25: GTM diferido cerrado, siguiente bloque

## Hechos

- Hecho: el usuario confirmó publicar.
- Hecho: Lovable publicó el frontend y quedó `Up to date`.
- Hecho: producción sirve deployment `11e48c49-19d5-4d37-884c-d58b7de5387a`.
- Hecho: producción contiene `__winerimLoadGtm` y ya no contiene el snippet inmediato antiguo de GTM.
- Hecho: Consent Mode sigue antes de GTM.
- Hecho: QA producción de home móvil, home desktop y Tempranillo alemán sin errores.
- Hecho: Lighthouse mobile producción:
  - Run 1: Performance 89, LCP 2,7 s.
  - Run 2: Performance 89, LCP 2,6 s.
  - Run 3: Performance 93, LCP 2,5 s.
  - 0 recursos render-blocking.

## Decisiones

- Bloque GTM diferido cerrado.
- Core Web Vitals sintético de home queda en rango operativo para retomar contenido.
- No declarar aún mejora de campo hasta que Search Console lo refleje.

## Hipótesis

- El principal bloqueo de LCP era GTM/tags asociados compitiendo al inicio.
- La deuda residual de JS no usado puede abordarse después, pero no bloquea ahora la biblioteca.

## Tareas pendientes listas para retomar

1. Retomar biblioteca del vino al máximo nivel:
   - priorizar 30-50 entidades por demanda SEO y valor comercial;
   - ampliar uvas, regiones, estilos y maridajes;
   - crear contenido profundo por idioma;
   - añadir/validar schema por entidad;
   - reforzar enlaces internos uva -> región -> estilo -> maridaje -> guía de servicio.
2. Monitorizar Search Console:
   - Core Web Vitals móvil home;
   - indexación de rutas de biblioteca;
   - validaciones FAQ/sitemap ya iniciadas.
3. Rendimiento residual opcional:
   - auditar JS no usado;
   - revisar carga de tags dentro del contenedor GTM si vuelve la variabilidad.
