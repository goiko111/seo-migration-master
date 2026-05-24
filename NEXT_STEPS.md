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
   - `/clientes` LCP y DOM.
   - Imágenes responsive.
   - JS inicial no usado.
6. Decidir destino definitivo de city pages:
   - Landing real por ciudad/idioma.
   - Redirect a página canónica superior.
   - `noindex`.
7. Resolver contradicción de `src/seo/route-map.ts` frente al mapa real `de`/`pt`.

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
   - Frontend.
   - Edge Function `sitemap`.
   - Edge Function `prerender`.
2. Revalidar producción tras Lovable:
   - `/sitemap.xml` sin legales ni city pages fallback.
   - `/en/privacy` como Googlebot con canonical propio y `noindex, follow`.
   - `/clientes` con 120 logos iniciales, botón de carga progresiva y sin 404 de logos.
3. Reejecutar Lighthouse móvil:
   - Home.
   - `/clientes`.
4. Reenviar `/sitemap.xml` en Search Console solo después de que producción esté validada.
5. Siguiente bloque Core Web Vitals:
   - Home LCP.
   - Imágenes responsive.
   - JS inicial no usado.
   - Chunks grandes.
