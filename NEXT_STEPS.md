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
   - Hecho: resolver los 96 legacy shortcuts con redirects canónicos en Worker de producción.
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

## Actualización 2026-05-25: segunda tanda editorial lista para publish

## Hechos

- Hecho local: biblioteca del vino ampliada de 10 a 20 uvas prioritarias con inteligencia de servicio.
- Hecho local: nuevas uvas cubiertas:
  - `syrah`
  - `merlot`
  - `malbec`
  - `nebbiolo`
  - `sangiovese`
  - `monastrell`
  - `viura`
  - `chenin-blanc`
  - `xarello`
  - `touriga-nacional`
- Hecho local: React y `prerender` tienen paridad editorial para estas uvas.
- Hecho local: pruebas actualizadas para exigir 20 perfiles prioritarios y presencia de la segunda tanda en prerender.
- Verificación local completada:
  - `npm run test -- --run`: 17 tests.
  - `npm run build`.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`.
  - `git diff --check`.
  - QA navegador en `/biblioteca-vino/uvas/syrah`, `/de/weinbibliothek/rebsorten/syrah`, `/pt/biblioteca-vinho/castas/xarello` y `/en/wine-library/grapes/chenin-blanc`.
- Producción queda pendiente de publish desde Lovable.

## Decisiones

- Slug canónico de Xarel-lo: `xarello`.
- Esta tanda añade `monastrell` y `touriga-nacional` porque refuerzan la biblioteca en España/Portugal y `verdejo`/`godello` ya estaban cubiertas.
- No se crean nuevas rutas; se enriquecen rutas existentes.

## Hipótesis

- La segunda tanda mejora profundidad y autoridad temática de la biblioteca sin aumentar deuda de indexación.
- El siguiente salto debe venir de regiones, estilos y maridajes con enlazado cruzado y schema por entidad.

## Tareas pendientes listas para retomar

1. Hecho: commit y push de la segunda tanda editorial con `d03625a`.
2. Hecho: publish frontend desde Lovable.
3. Hecho: despliegue explícito de Edge Function `prerender` desde Lovable.
4. Hecho: revalidación producción como usuario real y Googlebot en:
   - `/biblioteca-vino/uvas/syrah`;
   - `/de/weinbibliothek/rebsorten/syrah`;
   - `/pt/biblioteca-vinho/castas/xarello`;
   - `/en/wine-library/grapes/chenin-blanc`.
5. Continuar biblioteca del vino al máximo nivel:
   - regiones: Rioja, Ribera del Duero, Rias Baixas, Rueda, Priorat, Borgoña, Burdeos, Champagne, Douro, Vinho Verde;
   - estilos: crianza, reserva, blanco con lias, espumoso metodo tradicional, rosado gastronomico;
   - maridajes: carnes rojas, pescado blanco, marisco, arroces, cocina asiatica, quesos;
   - schema y enlaces internos uva -> región -> estilo -> maridaje -> guía de servicio.

## Actualización 2026-05-25: siguiente bloque recomendado

## Hechos

- La segunda tanda editorial de uvas prioritarias está publicada y validada en producción.
- La biblioteca tiene ahora 20 uvas prioritarias con inteligencia de servicio visible para usuarios y bots.
- El flujo operativo confirmado para cambios de biblioteca con prerender es:
  - commit/push;
  - publish frontend en Lovable;
  - pedir despliegue explícito de Edge Function `prerender`;
  - validar producción como usuario y Googlebot.

## Decisiones

- No hace falta Cloudflare Worker para la segunda tanda.
- La siguiente ampliación debe salir del plano "uvas aisladas" y construir red temática: regiones, estilos, maridajes y enlaces internos.

## Hipótesis

- La autoridad temática crecerá más si cada uva prioritaria enlaza con regiones, estilos y maridajes relevantes.
- Crear alias visibles para grafías alternativas evitará perder intención de búsqueda sin duplicar slugs.

## Tareas pendientes listas para retomar

1. Regiones prioritarias:
   - Rioja;
   - Ribera del Duero;
   - Rias Baixas;
   - Rueda;
   - Priorat;
   - Borgoña;
   - Burdeos;
   - Champagne;
   - Douro;
   - Vinho Verde.
2. Estilos prioritarios:
   - tinto crianza;
   - tinto reserva;
   - blanco con lias;
   - espumoso metodo tradicional;
   - rosado gastronomico.
3. Maridajes prioritarios:
   - carnes rojas;
   - pescado blanco;
   - marisco;
   - arroces;
   - cocina asiatica;
   - quesos.
4. Schema/enlazado:
   - revisar `Article`, `FAQPage`, `BreadcrumbList` y posibles `DefinedTerm`/`ItemList`;
   - crear enlaces internos uva -> región -> estilo -> maridaje -> guía de servicio.
5. Alias y variantes:
   - `Xarel-lo`/`Xarel·lo` -> `xarello`;
   - revisar grafías con acentos y sin acentos para búsquedas internacionales.

## Actualización 2026-05-25: grafo estratégico listo localmente

## Hechos

- Bloque local implementado:
  - alias de grafías y consultas frecuentes;
  - resolver de enlaces separado por categoría;
  - grafo estratégico de enlaces internos para uvas, regiones, estilos y maridajes;
  - integración en React;
  - integración equivalente en `prerender`;
  - tests nuevos y contrato SEO actualizado.
- Verificación local completada:
  - `npm run test -- --run`: 21 tests.
  - `npm run build`.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`.
  - `git diff --check`.
  - QA navegador local en Xarel-lo, Champagne región, espumoso y carnes rojas.
- Producción aún no refleja este bloque hasta commit/push, publish Lovable y deploy explícito de `prerender`.

## Decisiones

- No duplicar URLs por alias.
- Mantener `xarello` como slug canónico.
- Usar hints por categoría para resolver colisiones de entidad.
- Hacer visible para bots el mismo grafo interno que ve React.

## Hipótesis

- Este bloque mejora más la arquitectura semántica que añadir otra tanda aislada de uvas.
- El siguiente salto vendrá de ampliar contenido específico en regiones, estilos y maridajes prioritarios ya conectados.

## Tareas pendientes listas para retomar

1. Hecho: commit y push del bloque con `80895ac feat: connect wine library entities`.
2. Publicar frontend desde Lovable.
3. Pedir despliegue explícito de Edge Function `prerender` en Lovable.
4. Revalidar producción:
   - `/biblioteca-vino/uvas/xarello` muestra enlaces a Penedès, Cava, espumoso, marisco y arroces.
   - `/biblioteca-vino/regiones/francia/champagne` enlaza a Chardonnay, Pinot Noir, espumoso, marisco y quesos.
   - `/biblioteca-vino/estilos/espumoso` enlaza `Champagne` como región y `Cava` como estilo.
   - `/biblioteca-vino/maridajes/carnes-rojas` enlaza Tempranillo, Syrah, Cabernet Sauvignon, Rioja y tinto reserva.
   - Googlebot recibe los enlaces estratégicos desde `prerender`.
5. Siguiente bloque editorial:
   - profundizar fichas de regiones prioritarias;
   - profundizar estilos prioritarios;
   - profundizar maridajes prioritarios;
   - evaluar schema `DefinedTerm`/`ItemList` por tipo de entidad.

## Actualización 2026-05-25: listo para retomar desde deploy Lovable

## Hechos

- Hecho: commit y push del bloque de grafo estratégico.
- Commit en `origin/main`: `80895ac feat: connect wine library entities`.
- Lovable ve el commit nuevo, pero producción no muestra todavía el grafo estratégico en `prerender`.
- Verificación de producción como Googlebot:
  - `x-worker-branch: bot-prerender` está activo.
  - El HTML de `/biblioteca-vino/uvas/xarello` aún no muestra los enlaces estratégicos; solo hubs generales.
  - Espumoso y carnes rojas tampoco contienen los enlaces estratégicos esperados.
- La automatización no consiguió activar `Update` en Lovable.

## Decisiones

- Retomar por Lovable antes de hacer más código.
- No tocar Cloudflare Worker salvo fallo posterior del proxy.
- Cerrar el bloque solo cuando producción y Googlebot confirmen el grafo.

## Hipótesis

- Falta aplicar el `Update` de Lovable y desplegar la Edge Function `prerender`.
- El código ya subido debería ser suficiente para que producción quede correcta tras ese deploy.

## Tareas pendientes listas para retomar

1. Hecho: en Lovable, pulsar `Update` para el commit `feat: connect wine library entities`.
2. Hecho: en el chat de Lovable, pedir despliegue de la Supabase Edge Function `prerender`.
3. Hecho: validar como Googlebot:
   - `/biblioteca-vino/uvas/xarello`;
   - `/biblioteca-vino/regiones/francia/champagne`;
   - `/biblioteca-vino/estilos/espumoso`;
   - `/biblioteca-vino/maridajes/carnes-rojas`.
4. Hecho: validar usuario real en Chrome headless para `/biblioteca-vino/uvas/xarello`.
5. Continuar con la ampliación editorial profunda de regiones, estilos, maridajes y schema.

## Actualización 2026-05-25: siguiente sesión tras publicar grafo estratégico

## Hechos

- El grafo estratégico de biblioteca del vino está publicado y validado.
- Googlebot recibe los enlaces internos estratégicos desde `prerender`.
- Usuarios reales reciben el frontend actualizado desde `/assets/index-DAMK02nf.js`.
- No fue necesario tocar Cloudflare Worker.
- La Supabase CLI sigue sin token local; Lovable es la vía operativa para Edge Functions.

## Decisiones

- El siguiente trabajo ya no es despliegue, sino ampliación editorial profunda.
- Prioridad recomendada: regiones primero, porque conectan intención SEO geográfica con uvas, estilos y maridajes.
- Mantener cada bloque con paridad React/prerender y validación producción.

## Hipótesis

- Regiones prioritarias darán más crecimiento SEO que otra tanda de uvas aisladas porque atacan intención geográfica y gastronómica.
- Schema `DefinedTerm`/`ItemList` puede aportar claridad semántica si se aplica por entidad sin duplicar schema innecesario.

## Tareas pendientes listas para retomar

1. Profundizar regiones prioritarias:
   - Hecho local: primera tanda profunda implementada para Rioja, Ribera del Duero, Rias Baixas, Rueda, Priorat, Borgoña, Burdeos, Champagne, Douro y Vinho Verde.
   - Hecho local: perfiles regionales en seis idiomas.
   - Hecho local: React y `prerender` tienen paridad esencial.
   - Hecho local: fallbacks profundos localizados evitan narrativa española en regiones internacionales.
   - Pendiente: commit/push, publish Lovable, deploy explícito de `prerender` y validación productiva.
2. Profundizar estilos prioritarios:
   - tinto crianza;
   - tinto reserva;
   - blanco con lias;
   - espumoso metodo tradicional;
   - rosado gastronomico.
3. Profundizar maridajes prioritarios:
   - carnes rojas;
   - pescado blanco;
   - marisco;
   - arroces;
   - cocina asiatica;
   - quesos.
4. Revisar schema por entidad:
   - `DefinedTerm`;
   - `ItemList`;
   - `FAQPage`;
   - `BreadcrumbList`;
   - evitar duplicidades o schema decorativo.
5. Tras el siguiente bloque:
   - Hecho local: tests, build, `deno check` y `git diff --check`.
   - Pendiente: publish Lovable.
   - Pendiente: deploy explícito `prerender`.
   - Pendiente: validación usuario real y Googlebot.

## Actualización 2026-05-26: retomar desde publicación de regiones

## Hechos

- El bloque local de regiones prioritarias está implementado y verificado.
- Archivos principales:
  - `src/data/wineLibraryRegionEditorial.ts`;
  - `src/pages/RegionDetail.tsx`;
  - `src/data/regionsLibraryI18n.ts`;
  - `supabase/functions/prerender/index.ts`.
- Verificaciones locales completadas:
  - `npm run test -- --run`: 25 tests.
  - `npm run build`.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`.
  - `git diff --check`.
- El dev server local está disponible en `http://127.0.0.1:5173/` mientras la sesión siga activa.

## Decisiones

- Retomar por commit/push y Lovable antes de hacer más contenido.
- Pedir siempre despliegue explícito de `prerender` porque este bloque modifica HTML para bots.
- No tocar Cloudflare Worker salvo que producción sirva `bot-fallback` o HTML antiguo tras actualizar Lovable.

## Hipótesis

- Producción necesitará dos pasos: frontend Lovable y Edge Function `prerender`.
- Si Lovable despliega correctamente, Googlebot debería ver los perfiles de Rioja, Champagne y Vinho Verde sin cambios de Worker.

## Tareas pendientes listas para retomar

1. Commit y push del bloque regional.
2. Publicar frontend desde Lovable.
3. Pedir a Lovable: desplegar Edge Function `prerender`.
4. Validar producción como Googlebot:
   - `/biblioteca-vino/regiones/espana/rioja`;
   - `/de/weinbibliothek/regionen/francia/champagne`;
   - `/pt/biblioteca-vinho/regioes/portugal/vinho-verde`;
   - `/en/wine-library/regions/espana/rioja`.
5. Validar producción como usuario real:
   - `/pt/biblioteca-vinho/regioes/portugal/vinho-verde`;
   - `/de/weinbibliothek/regionen/francia/champagne`.
6. Después de validar, abrir bloque de estilos prioritarios:
   - tinto crianza;
   - tinto reserva;
   - blanco con lias;
   - espumoso metodo tradicional;
   - rosado gastronomico.

## Actualización 2026-05-26: regiones publicadas, siguiente bloque listo

## Hechos

- Hecho: commit y push del bloque regional con `6f6dcd8 feat: deepen priority wine regions`.
- Hecho: frontend publicado desde Lovable.
- Hecho: Edge Function `prerender` desplegada explícitamente desde Lovable.
- Hecho: producción validada como Googlebot:
  - `/biblioteca-vino/regiones/espana/rioja`;
  - `/de/weinbibliothek/regionen/francia/champagne`;
  - `/pt/biblioteca-vinho/regioes/portugal/vinho-verde`;
  - `/en/wine-library/regions/espana/rioja`.
- Hecho: producción validada como usuario real:
  - `/pt/biblioteca-vinho/regioes/portugal/vinho-verde`;
  - `/de/weinbibliothek/regionen/francia/champagne`.
- Hecho: no hizo falta desplegar Cloudflare Worker.
- Hecho: se corrigió la ruta documentada inglesa de Rioja a `/en/wine-library/regions/espana/rioja`, porque el sistema conserva slugs fuente de país.

## Decisiones

- La primera tanda profunda de regiones queda cerrada.
- Mantener el procedimiento:
  - commit/push;
  - Lovable `Update`;
  - despliegue explícito de `prerender`;
  - validación separada usuario real/Googlebot.
- Continuar con estilos antes que maridajes, porque los estilos son el siguiente nodo central entre región, uva y recomendación gastronómica.

## Hipótesis

- Estilos prioritarios reforzarán búsquedas de intención práctica y ayudarán a unir regiones/uvas con maridajes.
- Schema semántico conviene revisarlo después de tener regiones + estilos + maridajes profundos para no crear schema decorativo demasiado pronto.

## Tareas pendientes listas para retomar

1. Estilos prioritarios:
   - tinto crianza;
   - tinto reserva;
   - blanco con lias;
   - espumoso metodo tradicional;
   - rosado gastronomico.
2. Maridajes prioritarios:
   - carnes rojas;
   - pescado blanco;
   - marisco;
   - arroces;
   - cocina asiatica;
   - quesos.
3. Schema/enlazado:
   - evaluar `DefinedTerm`/`ItemList` tras ampliar estilos y maridajes;
   - mantener paridad React/prerender;
   - validar usuario real y Googlebot en producción.
4. Search Console:
   - monitorizar recrawl de biblioteca del vino;
   - observar cobertura e impresiones de rutas enriquecidas.

## Actualización 2026-05-26: estilos prioritarios implementados

## Hechos

- Hecho local: primera tanda profunda de estilos prioritarios implementada.
- Hecho: commit y push del bloque de estilos completados con `7198d3a feat: deepen priority wine styles`.
- Estilos cubiertos:
  - `tinto-crianza`;
  - `tinto-reserva`;
  - `blanco-crianza-lias`;
  - `espumoso`;
  - `rosado-cuerpo`.
- Hecho local: nueva capa `src/data/wineLibraryStyleEditorial.ts` en seis idiomas.
- Hecho local: `StyleDetail` renderiza inteligencia de servicio, rol en carta, guion de sala, palancas comerciales, errores a evitar, maridajes y FAQs.
- Hecho local: `blanco-crianza-lias` ya tiene ficha completa en `stylesLibrary`.
- Hecho local: `stylesLibraryI18n` evita fugas de narrativa española en campos profundos de estilos internacionales.
- Hecho local: `prerender` tiene perfiles prioritarios equivalentes para bots.
- Hecho local: el widget de chat usa el idioma detectado por ruta en `de` y `pt`.
- Hecho: Lovable no pudo publicarse desde esta sesión porque la pestaña accesible está en login.
- Hecho: no hay `SUPABASE_ACCESS_TOKEN`, por lo que el despliegue directo de `prerender` por CLI sigue bloqueado.
- Verificaciones locales completadas:
  - `npm run test -- --run`: 29 tests.
  - `npm run build`.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`.
  - `git diff --check`.
  - Browser QA local en `/de/weinbibliothek/weinstile/espumoso`.
  - Browser QA local en `/pt/biblioteca-vinho/estilos/blanco-crianza-lias`.

## Decisiones

- Retomar por Lovable antes de añadir más contenido.
- Pedir despliegue explícito de `prerender` porque el bloque modifica HTML para bots.
- No tocar Cloudflare Worker salvo que producción sirva `bot-fallback` o HTML antiguo tras actualizar Lovable.
- Después de validar estilos, continuar con maridajes prioritarios antes de schema final.

## Hipótesis

- Producción necesitará dos pasos: frontend Lovable y Edge Function `prerender`.
- Si Lovable despliega correctamente, Googlebot debería ver los perfiles de tinto crianza, espumoso, blanco sobre lías y rosado gastronómico sin cambios de Worker.
- El siguiente bloque natural son maridajes porque completan el triángulo región/uva/estilo/intención gastronómica.

## Tareas pendientes listas para retomar

1. Publicar frontend desde Lovable.
2. Pedir a Lovable: desplegar Edge Function `prerender`.
3. Validar producción como Googlebot:
   - `/biblioteca-vino/estilos/tinto-crianza`;
   - `/de/weinbibliothek/weinstile/espumoso`;
   - `/pt/biblioteca-vinho/estilos/blanco-crianza-lias`;
   - `/en/wine-library/styles/rosado-cuerpo`.
4. Validar producción como usuario real:
   - `/de/weinbibliothek/weinstile/espumoso`;
   - `/pt/biblioteca-vinho/estilos/blanco-crianza-lias`.
5. Maridajes prioritarios:
   - carnes rojas;
   - pescado blanco;
   - marisco;
   - arroces;
   - cocina asiatica;
   - quesos.
6. Schema/enlazado tras maridajes:
   - evaluar `DefinedTerm`/`ItemList`;
   - mantener `FAQPage` único;
   - validar usuario real y Googlebot en producción.

## Actualización 2026-05-26: maridajes/schema implementados, pusheados y validados en producción

## Hechos

- Hecho local: primera tanda profunda de maridajes prioritarios implementada.
- Hecho: commit y push completados con `fe4d10b feat: deepen priority wine pairings`.
- Hecho local: nueva capa `src/data/wineLibraryPairingEditorial.ts` en seis idiomas.
- Maridajes cubiertos:
  - `carnes-rojas`;
  - `lubina-dorada` como pescado blanco;
  - `pescados-y-mariscos` como marisco;
  - `pasta-arroces-y-legumbres` como arroces;
  - `cocina-asiatica-y-fusion`;
  - `quesos`.
- Hecho local: `PairingDetail` renderiza inteligencia de maridaje, etiquetas localizadas, FAQs combinadas y CTA localizado.
- Hecho local: `pairingsLibraryI18n` genera narrativa localizada profunda para maridajes internacionales y evita términos de estilo españoles en texto narrativo.
- Hecho local: `prerender` tiene perfiles prioritarios equivalentes para los 6 maridajes.
- Hecho local: `GrapeDetail`, `RegionDetail`, `StyleDetail` y `PairingDetail` emiten `Article` + `DefinedTerm`.
- Verificaciones locales completadas:
  - `npx tsc --noEmit --pretty false`.
  - `npm run test -- --run`: 33 tests.
  - `npm run build`.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`.
  - `git diff --check`.
  - Browser QA local en `/de/weinbibliothek/weinbegleitung/cocina-asiatica-y-fusion`.
  - Browser QA local en `/pt/biblioteca-vinho/harmonizacoes/lubina-dorada`.
- Hecho: producción sigue pendiente porque Lovable estaba en login y no hay `SUPABASE_ACCESS_TOKEN`.
- Hecho: tras el push de `fe4d10b`, Lovable sigue redirigiendo a login en `https://lovable.dev/projects/2c4eed0e-6760-45f0-aeb3-ce44de8e91f1`.
- Hecho: revalidación productiva posterior al push confirma que Googlebot recibe `bot-prerender`, pero todavía sin los nuevos bloques profundos de estilos/maridajes.
- Hecho posterior: el usuario confirmó publish completo en producción.
- Hecho posterior: Googlebot ya recibe la capa esencial profunda de estilos y maridajes con `bot-prerender`.
- Hecho posterior: usuario real en navegador ya ve bloques avanzados, `DefinedTerm` y un solo `FAQPage` en rutas representativas `de` y `pt`.

## Decisiones

- Cerrar estilos y maridajes como publicados y validados en producción.
- Mantener publish + despliegue explícito de `prerender` como protocolo para futuras tandas.
- No tocar Cloudflare Worker salvo que producción sirva `bot-fallback` o HTML antiguo tras actualizar Lovable.

## Hipótesis

- La biblioteca queda cerrada en su bloque principal actual: uvas, regiones, estilos, maridajes, grafo interno, FAQs y schema semántico en frontend.
- El siguiente trabajo de máximo nivel debería ser:
  - mantener monitorización de legacy shortcuts ya resueltos;
  - ampliar más entidades por demanda SEO;
  - monitorizar Search Console.

## Tareas pendientes listas para retomar

1. Legacy shortcuts de biblioteca:
   - Hecho: 96 redirects canónicos en producción vía Worker.
   - Hecho: matriz productiva 96/96 validada sin fallos.
   - Hecho: commit y push `d37044e fix: redirect legacy wine library shortcuts`.
   - Hecho: Worker desplegado con Version ID `c4d375bb-5280-41fe-b793-549be14f17c4`.
   - Pendiente: monitorizar Search Console tras recrawl.
   - Pendiente: publicar bundle React desde Lovable en el siguiente ciclo general para incluir la defensa secundaria de SPA.
2. Siguiente expansión máxima:
   - ampliar más regiones, estilos secundarios y platos concretos;
   - reforzar enlaces internos desde hubs;
   - monitorizar Search Console tras recrawl.
3. Refinamiento futuro:
   - mejorar títulos/H1 del prerender compacto con alias localizados de entidad;
   - mantener paridad de contenido esencial entre frontend y prerender;
   - comprobar evolución en Search Console.

## Actualización 2026-05-26: lista para retomar tras legacy shortcuts

## Hechos

- El bloque de legacy shortcuts queda resuelto en producción a nivel Worker.
- Las URLs antiguas de una sola parte de biblioteca ya no deben competir con las rutas nuevas de uvas, regiones, estilos y maridajes.
- La siguiente línea documentada es expansión editorial masiva y monitorización de Search Console.

## Decisiones

- Continuar con contenido nuevo solo sobre rutas canónicas nuevas.
- Mantener los shortcuts antiguos como redirects permanentes.
- No reabrir arquitectura base de biblioteca salvo que producción o Search Console muestren una contradicción concreta.

## Hipótesis

- El siguiente mayor retorno vendrá de ampliar entidades y enlazado interno, no de crear más rutas técnicas.
- Search Console tardará días o semanas en consolidar la señal de redirects.

## Tareas pendientes listas para retomar

1. Exportar o revisar en Search Console ejemplos de URLs legacy de biblioteca después del recrawl.
2. Preparar la siguiente tanda editorial:
   - regiones: Ribera del Duero, Rias Baixas, Rueda, Priorat, Burdeos, Douro, Vinho Verde;
   - uvas: Syrah, Merlot, Malbec, Nebbiolo, Sangiovese, Viura, Xarel-lo, Chenin Blanc;
   - maridajes/platos: carnes blancas, verduras, pasta, setas, chocolate, postres, aperitivos;
   - estilos: joven, roble, blanco aromatico, dulce, generoso, naranja.
3. Reforzar enlaces internos desde hubs hacia entidades enriquecidas.
4. Publicar bundle React desde Lovable en el siguiente ciclo general.

## Actualización 2026-05-26: expansión masiva local lista para publicar

## Hechos

- Hecho local: expansión editorial masiva implementada.
- Hecho local: cobertura de biblioteca ampliada a 30 uvas, 22 regiones, 15 estilos y 18 maridajes/platos prioritarios.
- Hecho local: nueva capa `src/data/wineLibraryEditorialExpansion.ts`.
- Hecho local: `prerender` tiene perfiles compactos equivalentes para la nueva tanda.
- Hecho local: `sitemap` deja de enviar los shortcuts legacy españoles que ya redirigen a rutas canónicas.
- Hecho local: QA navegador correcto en:
  - `/de/weinbibliothek/weinstile/fino-manzanilla`;
  - `/pt/biblioteca-vinho/harmonizacoes/ostras`;
  - `/fr/bibliotheque-vin/regions/francia/sancerre`.
- Hecho local: TypeScript, tests, build, Deno check y `git diff --check` correctos.
- Hecho: commit y push de código completados con `78135cd feat: expand wine library editorial coverage`.
- Hecho: Lovable no está accesible desde esta sesión porque redirige a login.
- Hecho: no hay `SUPABASE_ACCESS_TOKEN` local.
- Hecho: producción todavía tiene `sitemap.xml` antiguo para esta tanda y sigue listando shortcuts legacy.

## Decisiones

- Siguiente paso operativo: commit/push y publicación Lovable.
- No tocar Cloudflare Worker para esta tanda.
- Desplegar explícitamente `sitemap` y `prerender` porque ambos han cambiado.
- No marcar esta expansión como cerrada en producción hasta validar usuario real y Googlebot.

## Hipótesis

- Lovable necesitará frontend publish y deploy explícito de Edge Functions.
- Si Lovable publica correctamente, la producción debería reflejar la expansión sin cambios de Worker.
- Search Console tardará en reflejar la consolidación de shortcuts y la nueva profundidad editorial.

## Tareas pendientes listas para retomar

1. Commit y push:
   - Hecho: expansión editorial.
   - Hecho: actualización de documentación de cierre previa.
   - Hecho: ajuste final de sitemap subido con `9f99fa7`.
2. Publicar desde Lovable:
   - Hecho: commit `9f99fa7`;
   - Hecho: Edge Function `sitemap`.
3. Validar producción como usuario real:
   - Hecho: `/de/weinbibliothek/weinstile/fino-manzanilla`;
   - Hecho: `/pt/biblioteca-vinho/harmonizacoes/ostras`;
   - Hecho: `/fr/bibliotheque-vin/regions/francia/sancerre`.
4. Validar producción como Googlebot:
   - Hecho: las tres rutas anteriores.
   - Hecho: `/sitemap.xml` sin shortcuts legacy españoles.
   - Hecho: `/sitemap.xml` con `/biblioteca-vino/maridajes/ostras` y `/biblioteca-vino/regiones/francia/sancerre`.
5. Search Console:
   - monitorizar shortcuts legacy como redirigidas/canónicas alternativas;
   - revisar recrawl de rutas enriquecidas;
   - preparar siguiente ola con datos reales de impresiones y cobertura.

## Actualización 2026-05-26: expansión cerrada, siguiente paso Search Console

## Hechos

- Hecho: commit `9f99fa7` publicado.
- Hecho: Edge Function `sitemap` desplegada.
- Hecho: sitemap público contiene rutas nuevas de expansión:
  - `ostras`;
  - `solomillo-de-ternera`;
  - `sancerre`;
  - `mendoza`;
  - `mosel`;
  - `willamette-valley`;
  - `barolo`.
- Hecho: sitemap público mantiene fuera los shortcuts legacy españoles.
- Hecho: Googlebot recibe prerender correcto en `ostras` portugués y `mencia` alemán.

## Decisiones

- La expansión editorial masiva de biblioteca queda cerrada en producción.
- El siguiente bloque no debe añadir más entidades a ciegas; debe partir de Search Console.
- Mantener monitorización SEO como siguiente frente.

## Hipótesis

- Google tardará en descubrir/indexar la nueva profundidad aunque el sitemap ya esté correcto.
- Las primeras señales útiles serán cobertura, canónica elegida, impresiones y consultas long-tail.

## Tareas pendientes listas para retomar

1. Search Console:
   - Hecho: reenviar `/sitemap.xml`.
   - Pendiente: revisar si el sitemap muestra fecha de última lectura posterior al despliegue;
   - pedir indexación manual solo para una tanda corta si la UI lo permite.
2. Tanda corta sugerida para inspección/indexación:
   - `/biblioteca-vino/maridajes/ostras`;
   - `/biblioteca-vino/regiones/francia/sancerre`;
   - `/de/weinbibliothek/rebsorten/mencia`.
3. Monitorizar:
   - shortcuts legacy como redirigidas;
   - rutas nuevas como descubiertas/indexadas;
   - impresiones no branded de biblioteca del vino.
4. Próxima ola editorial:
   - esperar datos de Search Console;
   - priorizar entidades con impresiones y baja posición;
   - reforzar enlazado interno desde hubs si Google no descubre rápido las nuevas rutas.

## Actualización 2026-05-26: Search Console listo para monitorizar

## Hechos

- `/sitemap.xml` reenviado en Search Console.
- Confirmación recibida: `Se ha enviado el sitemap correctamente`.
- Estado actual de la fila:
  - Enviado: `26 may 2026`;
  - Última lectura: `24 may 2026`;
  - Estado: `Correcto`;
  - Páginas descubiertas: `2.072`.

## Decisiones

- No pedir indexación masiva.
- Próximo paso: esperar lectura nueva o inspeccionar una tanda corta estratégica.

## Hipótesis

- Search Console actualizará `Última lectura` cuando Google procese el sitemap reenviado.
- Las nuevas entidades pueden aparecer primero como descubiertas antes de indexarse.

## Tareas pendientes listas para retomar

1. Volver a Search Console y comprobar:
   - Hecho: `/sitemap.xml` ya muestra `Última lectura: 26 may 2026`;
   - Hecho: `/sitemap.xml` mantiene estado `Correcto`;
   - Hecho: `/sitemap.xml` muestra `2.054` páginas descubiertas.
2. Inspeccionar manualmente, si procede:
   - Hecho: `/biblioteca-vino/maridajes/ostras` no está en Google, pero la prueba en vivo indica que está disponible y se puede indexar;
   - Hecho: `/biblioteca-vino/regiones/francia/sancerre` está descubierta pero sin indexar; la prueba en vivo indica que está disponible y se puede indexar;
   - Hecho: `/de/weinbibliothek/rebsorten/mencia` está descubierta pero sin indexar; la prueba en vivo indica que está disponible y se puede indexar.
3. Preparar siguiente ola solo con datos de:
   - impresiones;
   - posición media;
   - estado de indexación;
   - consultas long-tail.

## Actualización 2026-05-27: siguiente paso inmediato

## Hechos

- Google ya releyó `/sitemap.xml`.
- Las tres URLs estratégicas probadas son técnicamente indexables según la prueba en vivo de Search Console.
- Ninguna de las tres URLs está indexada todavía.
- `sancerre` y `mencia` ya están descubiertas sin indexar.
- `ostras` aún aparece como URL no reconocida por Google.
- No se ha pulsado `Solicitar indexación`.

## Decisiones

- No pedir indexación manual masiva.
- Pedir confirmación explícita antes de solicitar indexación de la tanda corta.
- No abrir otra expansión de biblioteca hasta tener señales de indexación y rendimiento.

## Hipótesis

- Solicitar indexación de tres URLs estratégicas puede acelerar el primer rastreo sin saturar el proceso.
- Si Google no indexa estas URLs tras la solicitud, el siguiente foco será enlazado interno desde hubs y señales de calidad por entidad.

## Tareas pendientes listas para retomar

1. Si el usuario confirma, pulsar `Solicitar indexación` en Search Console para:
   - Hecho: `https://winerim.wine/biblioteca-vino/maridajes/ostras`;
   - Hecho: `https://winerim.wine/biblioteca-vino/regiones/francia/sancerre`;
   - Hecho: `https://winerim.wine/de/weinbibliothek/rebsorten/mencia`.
2. Tras pedir indexación, documentar el resultado exacto de Search Console:
   - Hecho: las tres URLs muestran `Se ha solicitado la indexación`.
   - Hecho: Search Console indica que quedaron añadidas a cola de rastreo prioritaria.
3. En la próxima revisión, comprobar si pasan a indexadas o si quedan como descubiertas/rastreadas sin indexar.
4. Revisar el sitemap antiguo `/sitemap_index.xml` solo como tarea secundaria; no bloquea la biblioteca porque `/sitemap.xml` ya está correcto.

## Actualización 2026-05-27: listo para próxima revisión

## Hechos

- Solicitud manual de indexación completada para las tres URLs estratégicas.
- No se solicitaron más URLs.
- El siguiente dato útil no será inmediato: dependerá de Search Console tras recrawl.

## Decisiones

- Esperar datos antes de abrir otra tanda editorial o pedir más indexaciones manuales.
- Priorizar monitorización de cobertura y consultas long-tail de biblioteca.

## Hipótesis

- Si Google indexa estas tres URLs, la expansión empieza a entrar correctamente por sitemap e inspección manual.
- Si Google no las indexa, el foco no debe ser más contenido a ciegas, sino enlaces internos, autoridad y calidad percibida por URL.

## Tareas pendientes listas para retomar

1. Revisar en Search Console las tres URLs:
   - `/biblioteca-vino/maridajes/ostras`;
   - `/biblioteca-vino/regiones/francia/sancerre`;
   - `/de/weinbibliothek/rebsorten/mencia`.
2. Comprobar para cada una:
   - estado de indexación;
   - último rastreo;
   - sitemaps detectados;
   - canónica declarada y canónica elegida por Google;
   - mejoras detectadas como `FAQPage` y breadcrumbs.
3. Revisar rendimiento de biblioteca del vino cuando haya datos:
   - impresiones;
   - clics;
   - CTR;
   - posición media;
   - consultas long-tail.
4. Si alguna queda sin indexar:
   - reforzar enlazado desde hubs;
   - comprobar si aparece como canónica alternativa;
   - revisar profundidad diferencial de contenido frente a competidores.

## Actualización 2026-05-27: 404 y sitemap antiguo

## Hechos

- Se revisó Search Console después de la solicitud manual de indexación.
- Cobertura observada:
  - 67 páginas indexadas.
  - 197 URLs en `No se ha encontrado (404)`.
  - 1.758 URLs en `Descubierta: actualmente sin indexar`.
  - 133 URLs en `Rastreada: actualmente sin indexar`.
- `/sitemap_index.xml` sigue enviado en Search Console, pero en producción redirige a `/sitemap.xml`.
- Search Console permite `Quitar sitemap` para `/sitemap_index.xml`; no se ejecutó.
- Se corrigieron dos 404 reales visibles en ejemplos de Search Console:
  - `/corso-vino-cata-mw-examen-practico` -> `/decision-center/cursos`;
  - `/winerim-sommelier-magazine` -> `/sommelier-corner`.
- Worker desplegado: `b32cd9a2-63fe-40d5-97a4-5087a179f0b6`.
- Los 10 ejemplos visibles revisados del grupo 404 terminan ahora en HTTP 200 tras redirects.

## Decisiones

- No quitar `/sitemap_index.xml` sin confirmación explícita.
- No validar aún el grupo 404 completo hasta revisar si hay más ejemplos activos.
- Mantener prioridad en Search Console: cobertura, redirects legacy y descubrimiento de biblioteca del vino.

## Hipótesis

- El bloque 404 debería mejorar gradualmente tras recrawl, pero puede contener más URLs antiguas no visibles en la primera página.
- El mayor cuello de botella actual sigue siendo `Descubierta: actualmente sin indexar`, no solo 404.

## Tareas pendientes listas para retomar

1. Revisar más ejemplos del grupo `No se ha encontrado (404)`.
2. Si la mayoría ya redirigen o tienen destino claro, pedir confirmación para iniciar `Validar corrección`.
3. Pedir confirmación explícita si se quiere quitar `/sitemap_index.xml` de Search Console.
4. Monitorizar las tres URLs de biblioteca con indexación solicitada:
   - `/biblioteca-vino/maridajes/ostras`;
   - `/biblioteca-vino/regiones/francia/sancerre`;
   - `/de/weinbibliothek/rebsorten/mencia`.
5. Abrir bloque de enlazado interno si las nuevas URLs siguen como descubiertas/rastreadas sin indexar.

## Actualización 2026-06-01: listo para retomar

## Hechos

- Search Console muestra `/sitemap.xml` correcto, última lectura `30 may 2026`, `2.054` páginas descubiertas.
- `/sitemap_index.xml` sigue enviado y correcto, última lectura `28 may 2026`, `2.054` páginas descubiertas.
- Cobertura actual según Search Console, actualizado `29/5/26`:
  - 102 indexadas.
  - 2.331 sin indexar.
  - 189 en 404.
  - 1.930 descubiertas sin indexar.
  - 153 rastreadas sin indexar.
- Las tres URLs estratégicas de biblioteca ya están indexadas:
  - `/de/weinbibliothek/rebsorten/mencia`;
  - `/biblioteca-vino/regiones/francia/sancerre`;
  - `/biblioteca-vino/maridajes/ostras`.
- Las tres tienen rastreo correcto por Googlebot smartphone el `27 may 2026`, canónica inspeccionada, HTTPS válido, breadcrumbs válidos y FAQ válido.
- Se revisaron 100 ejemplos visibles del grupo 404:
  - 47 acaban en HTTP 200 siguiendo redirects.
  - 51 acaban en HTTP 404 siguiendo redirects.
  - 2 acaban en HTTP 410.
- Cambios locales listos en `cloudflare-worker-v3-hybrid.js`:
  - normalización de `/https:/winerim.wine/...`;
  - redirects directos para legacy de alta confianza.
- Verificaciones locales:
  - `npm run deploy:worker:dry-run`: correcto.
  - `git diff --check`: correcto.
  - prueba local del Worker con ejemplos críticos: correcta.
- Bloqueo actual:
  - `npm run deploy:worker` falla por Cloudflare `Authentication error [code: 10000]`.

## Decisiones

- La tanda corta de indexación manual de biblioteca se considera exitosa.
- La biblioteca del vino puede seguir creciendo, pero con prioridad en enlazado interno y señales de calidad para reducir `Descubierta: actualmente sin indexar`.
- No pedir más indexación manual masiva.
- No quitar `/sitemap_index.xml` ni iniciar `Validar corrección` 404 sin confirmación explícita.
- Antes de cualquier validación GSC de 404, desplegar y verificar el Worker pendiente.

## Hipótesis

- Google está aceptando las páginas nuevas de biblioteca porque la base técnica quedó limpia.
- El gran cuello de botella actual es descubrimiento/indexación por escala y autoridad, no bloqueo técnico de las tres URLs probadas.
- Los redirects pendientes del Worker reducirán 404 visibles cuando Google recrawlee.

## Tareas pendientes listas para retomar

1. Resolver autenticación Cloudflare:
   - Hecho: login OAuth renovado con `gugocreative@gmail.com`.
2. Desplegar Worker pendiente:
   - Hecho: Worker `winerim-proxy` desplegado con Version ID `fda7c63b-ae88-4e3f-98c4-9d48ee39edc2`.
3. Validar producción tras deploy:
   - Hecho: `/https:/winerim.wine/fr/integrations` -> `/fr/integrations` -> 200;
   - Hecho: `/analiza-tu-carta` -> `/analisis-carta` -> 200;
   - Hecho: `/simone-monese` -> `/article/simone-monese` -> 200;
   - Hecho: `/carta-vinos-digital` -> `/software-carta-de-vinos` -> 200.
4. Recalcular los 100 ejemplos visibles de 404.
   - Hecho: 95 terminan en 200, 3 en 404 y 2 en 410.
5. Si producción queda saneada, pedir confirmación explícita para:
   - retirar `/sitemap_index.xml`; o
   - iniciar `Validar corrección` del grupo 404.
6. Siguiente mejora de biblioteca del vino:
   - reforzar enlaces internos desde hubs hacia entidades nuevas ya indexadas;
   - revisar rendimiento/consultas cuando haya datos;
   - priorizar la próxima expansión por impresiones, intención y baja posición.

## Próximo arranque recomendado

## Hechos

- El Worker ya está desplegado y validado.
- La muestra visible de 404 está mayoritariamente saneada: 95/100 terminan en 200.
- Quedan 3 404 visibles sin equivalencia clara:
  - `/los-mejores-restaurantes-de-cataluna-para-disfrutar-del-vino/`;
  - `/kit-digital/`;
  - `/facturacion-y-contratos/`.
- Quedan 2 URLs antiguas que terminan en 410, lo cual es aceptable si no hay equivalente útil.
- Las tres URLs estratégicas de biblioteca del vino ya están indexadas.

## Decisiones

- No hacer más redirects de baja confianza.
- No validar corrección 404 ni retirar `/sitemap_index.xml` sin confirmación explícita.
- La siguiente mejora de biblioteca debe ser enlazado interno y monitorización de consultas, no indexación manual masiva.

## Hipótesis

- El próximo recrawl de Google debería bajar el grupo 404.
- Si `Descubierta: actualmente sin indexar` sigue alto, el siguiente cuello será autoridad/enlazado interno y profundidad diferencial por entidad.

## Tareas pendientes listas para retomar

1. Reabrir Search Console en unos días y comprobar:
   - evolución de `No se ha encontrado (404)`;
   - evolución de `Descubierta: actualmente sin indexar`;
   - rendimiento de biblioteca del vino.
2. Si el usuario confirma explícitamente:
   - iniciar `Validar corrección` del grupo 404;
   - o retirar `/sitemap_index.xml`.
3. Abrir bloque de enlazado interno de biblioteca:
   - Hecho: hubs principales -> entidades estratégicas nuevas y ya indexadas;
   - Hecho: rutas uva -> región -> estilo -> maridaje desde biblioteca principal, uvas, regiones, estilos y maridajes;
   - Pendiente: CTAs suaves hacia análisis/carta en páginas de intención comercial, si se decide abrir ese bloque.

## Actualización 2026-06-01: listo para retomar tras enlazado interno

## Hechos

- Se añadió enlazado interno estratégico en la home de biblioteca y en los hubs de:
  - uvas;
  - regiones;
  - estilos;
  - maridajes.
- El componente nuevo es `src/components/biblioteca/StrategicWineLibraryRoutes.tsx`.
- Los enlaces usan nombres localizados y rutas localizadas en seis idiomas.
- La validación local confirmó rutas en español, alemán y portugués.
- `npm run test`, `npm run build`, `git diff --check` y ESLint limitado a archivos tocados pasan.
- `npm run lint` completo sigue fallando por errores preexistentes no relacionados.
- En esa sesión aún no se había desplegado el cambio de frontend desde Lovable; quedó resuelto en el cierre posterior de prerender del 2026-06-01.

## Decisiones

- Tratar el bloque de enlazado interno como la mejora principal inmediata para reducir el cuello de `Descubierta: actualmente sin indexar`.
- No abrir otra tanda de indexación manual hasta ver señales posteriores al deploy y recrawl.
- Mantener cualquier acción sobre Search Console 404 o `/sitemap_index.xml` bajo confirmación explícita.

## Hipótesis

- Los hubs reforzados deberían acelerar descubrimiento y mejorar contexto semántico de entidades prioritarias.
- La mejora no tendrá efecto en Search Console hasta que Lovable publique el frontend y Google recrawlee.
- La siguiente mejora de máximo nivel será una mezcla de datos GSC, expansión editorial selectiva y enlaces desde páginas comerciales relacionadas.

## Tareas pendientes listas para retomar

1. Publicar el frontend actualizado desde Lovable.
   - Hecho en el cierre posterior del 2026-06-01.
2. Validar en producción:
   - `/biblioteca-vino`;
   - `/biblioteca-vino/uvas`;
   - `/biblioteca-vino/regiones`;
   - `/biblioteca-vino/estilos`;
   - `/biblioteca-vino/maridajes`;
   - `/de/weinbibliothek`;
   - `/pt/biblioteca-vinho`.
   - Hecho en el cierre posterior del 2026-06-01 con Googlebot.
3. Validar que el bloque aparece en HTML/prerender para bots, no solo tras hidratación cliente.
   - Hecho en el cierre posterior del 2026-06-01.
4. Revisar Search Console tras recrawl:
   - evolución de `Descubierta: actualmente sin indexar`;
   - nuevas URLs indexadas de biblioteca;
   - impresiones y consultas long-tail por entidad.
5. Siguiente ampliación de biblioteca al máximo nivel:
   - completar overlays de nombres/platos en de y pt si aparecen cadenas residuales poco naturales;
   - añadir clusters por intención comercial desde páginas de análisis/carta hacia entidades de biblioteca;
   - ampliar contenido diferencial en entidades que GSC muestre con impresiones y baja posición;
   - reforzar schema y `llms.txt` solo después de validar que el HTML/prerender y el enlazado están limpios.

## Actualización 2026-06-01: cierre prerender rutas estratégicas biblioteca

## Hechos

- El frontend productivo ya mostraba el nuevo bloque de rutas estratégicas de biblioteca, pero Googlebot no lo recibía en HTML prerenderizado.
- Se corrigió `supabase/functions/prerender/index.ts`.
- Commit publicado en `main`: `0c44042 fix: mirror wine library hub links in prerender`.
- Lovable desplegó la Edge Function `prerender`.
- Producción validada como Googlebot:
  - `es`: `/biblioteca-vino`, `/biblioteca-vino/uvas`, `/biblioteca-vino/regiones`, `/biblioteca-vino/estilos`, `/biblioteca-vino/maridajes`.
  - `en`: `/en/wine-library`, `/en/wine-library/grapes`.
  - `it`: `/it/biblioteca-vino`, `/it/biblioteca-vino/vitigni`.
  - `fr`: `/fr/bibliotheque-vin`, `/fr/bibliotheque-vin/cepages`.
  - `de`: `/de/weinbibliothek`, `/de/weinbibliothek/rebsorten`.
  - `pt`: `/pt/biblioteca-vinho`, `/pt/biblioteca-vinho/castas`.
- Todas las rutas probadas responden 200, `X-Worker-Branch: bot-prerender`, `X-Prerendered: true`, canonical propio, texto estratégico y enlace estratégico esperado.

## Decisiones

- Cerrar como resuelta la brecha frontend/prerender de rutas estratégicas de hubs.
- No tocar Worker ni publicar frontend adicional para este cierre porque producción ya sirve el cambio desde `prerender`.
- Mantener como tarea futura la extracción de la matriz estratégica a una fuente compartida.

## Hipótesis

- El impacto debería verse en mejor rastreo de entidades prioritarias y señales internas más claras para Googlebot y crawlers de IA.
- La medición real dependerá del recrawl de Google y de los informes de Search Console.

## Tareas pendientes inmediatas

1. Monitorizar Search Console para `/biblioteca-vino` y hubs tras recrawl.
2. Reintentar indexación manual de una tanda corta de URLs estratégicas si Search Console lo permite:
   - `/biblioteca-vino`
   - `/biblioteca-vino/uvas`
   - `/biblioteca-vino/regiones`
   - `/biblioteca-vino/estilos`
   - `/biblioteca-vino/maridajes`
   - `/de/weinbibliothek`
   - `/pt/biblioteca-vinho`
3. Siguiente bloque biblioteca máximo nivel:
   - Añadir schema por entidad y por hub.
   - Profundizar fichas prioritarias con intención de compra, servicio, maridaje, regiones y FAQs.
   - Crear una fuente compartida para rutas estratégicas frontend/prerender.
   - Medir qué entidades están descubiertas sin indexar antes de añadir nuevas tandas masivas.
