# Current State

## Hechos

- Fecha de actualización: 2026-06-01.
- Repositorio de trabajo: `/Users/GOIKO/seo-migration-master`.
- Rama activa: `main`.
- PR `https://github.com/goiko111/seo-migration-master/pull/1` fusionado el 2026-05-23.
- Merge commit base de la ampliación `de`/`pt`: `30e9a95f592ba1c3607c0b385a2711e783bcc525`.
- El cierre técnico de despliegue previo quedó committeado y pusheado en `main` con `e009927`.
- El bloque editorial avanzado de biblioteca del vino quedó committeado y pusheado en `main` con `e3eab53 feat: enrich wine library editorial profiles`.
- Producción quedó validada en el bloque anterior:
  - `https://winerim.wine/de/weinbibliothek` responde HTTP 200.
  - `https://winerim.wine/pt/biblioteca-vinho` responde HTTP 200.
  - `https://winerim.wine/sitemap.xml` lista rutas `de` y `pt` de biblioteca.
  - Googlebot en Tempranillo alemán y portugués recibe HTML prerenderizado con canonical/hreflang correctos.
- Producción ya muestra el bloque editorial enriquecido para Googlebot en fichas prioritarias probadas:
  - `/de/weinbibliothek/rebsorten/tempranillo` contiene secciones de rol en carta, servicio recomendado, guion de sala y errores a evitar.
  - `/pt/biblioteca-vinho/castas/albarino` responde con prerender específico de ficha.
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
- En esta sesión se realizó una auditoría SEO pública de producción como Googlebot antes de seguir ampliando biblioteca del vino.
- Informe creado: `src/seo/SEO_PRODUCTION_AUDIT_2026-05-23.md`.
- Se realizó una segunda auditoría de contenido, SEO semántico y posicionamiento en LLMs.
- Informe creado: `src/seo/CONTENT_LLM_AUDIT_2026-05-23.md`.
- Resultados de la auditoría pública:
  - Sitemap con 2.989 URLs únicas.
  - 2.455 URLs HTTP 200.
  - 534 URLs del sitemap devuelven HTTP 404.
  - 2.333 URLs reciben `bot-prerender`.
  - 122 URLs reciben `bot-fallback` y HTML genérico.
  - 156 URLs tienen hreflang esperado en sitemap ausente en HTML prerenderizado.
  - 276 URLs HTTP 200 canonicalizan a una URL distinta de la enviada en sitemap.
  - `robots.txt` anuncia `llms.txt` como `Sitemap`, aunque `llms.txt` es `text/plain` y no XML.
- La biblioteca del vino en rutas nuevas no presenta 404 en sitemap: 1.470 URLs auditadas y 1.470 HTTP 200.
- Se detectaron 96 legacy shortcuts de biblioteca con títulos/H1 genéricos, 16 por idioma, por ejemplo `/biblioteca-vino/borgona` y `/en/wine-library/borgona`.
- Hallazgos de contenido/LLM:
  - 128 rutas localizadas estáticas entregan a bots la home española con canonical a `/`, por ejemplo `/en/pricing`, `/de/preise` y `/pt/precos`.
  - 320 artículos internacionales con sufijos `_en`, `_it`, `_fr`, `_de` y `_pt` declaran `html lang="es"` porque el prerender de artículos fija `lang: 'es'`.
  - La biblioteca nueva está limpia técnicamente, pero aún es poco profunda para máxima competencia informacional: media de 185 palabras y 27 páginas por debajo de 120 palabras.
  - `llms.txt` existe, pero es demasiado superficial: no lista páginas prioritarias, no agrupa contenido por intención y no existe `llms-full.txt`.
  - `robots.txt` permite crawlers de IA relevantes: `GPTBot`, `ChatGPT-User`, `Google-Extended`, `ClaudeBot`, `PerplexityBot` y `Cohere-AI`.
  - El subdominio `https://analisis.winerim.wine/` está indexable, tiene título `winerim-analisis`, no canonical visible y HTML inicial muy pobre.
  - Búsqueda pública muestra menciones externas útiles de Winerim en TecnoVino y F6S.
- Se detectó una contradicción documental: `CURRENT_STATE.md` y `NEXT_STEPS.md` seguían marcando como pendiente el commit/push del bloque editorial, pero el repo ya estaba en `e3eab53`.
- Tras las auditorías, se implementó en el repo el primer bloque de correcciones SEO/LLM:
  - `public/robots.txt` ya no declara `https://winerim.wine/llms.txt` como `Sitemap`.
  - `public/llms.txt` se rehizo como mapa curado para IA/LLMs con páginas prioritarias, temas principales y biblioteca del vino.
  - Se creó `public/llms-full.txt` con referencia extendida de entidad, producto, audiencia, hubs de contenido, herramientas y guías.
  - `supabase/functions/sitemap/index.ts` excluye del sitemap familias de `seo_pages` no resolubles que producían 534 URLs 404 en la auditoría pública.
  - `supabase/functions/sitemap/index.ts` excluye temporalmente 24 recursos/benchmarks/playbooks que hoy no tienen prerender específico y canonicalizan como contenido genérico.
  - `supabase/functions/prerender/index.ts` renderiza rutas estáticas localizadas `en`, `it`, `fr`, `de` y `pt` con idioma, canonical y hreflang propios en vez de caer a la home española.
  - Las páginas estáticas españolas principales ahora emiten hreflang completo incluyendo `de` y `pt` cuando tienen ruta localizada.
  - `renderArticle` infiere idioma desde sufijos `_en`, `_it`, `_fr`, `_de` y `_pt` y deja de marcar todos los artículos internacionales como `html lang="es"`.
- Verificación local del bloque SEO/LLM:
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`.
  - `npm run build`.
  - `npm run test`: 5 archivos, 15 tests.
  - `git diff --check`.
  - Prueba local como Googlebot: `/en/pricing` entrega `html lang="en"`, canonical `https://winerim.wine/en/pricing` y hreflang.
  - Prueba local como Googlebot: `/de/preise` entrega `html lang="de"` y canonical `https://winerim.wine/de/preise`.
  - Prueba local como Googlebot: `/precios` conserva contenido español y ahora incluye alternates `de` y `pt`.
- Estas correcciones SEO/LLM están implementadas localmente, pero aún no se han desplegado ni revalidado en producción.
- En esta sesión se avanzó con Search Console:
  - Se verificó la propiedad URL-prefix `https://winerim.wine/` con la cuenta `gugocreative@gmail.com`.
  - La propiedad de dominio `sc-domain:winerim.wine` seguía sin acceso con esa cuenta.
  - Se creó `public/google0be715f4ef205b3d.html`.
  - Se añadió una ruta de verificación al Cloudflare Worker para `/google0be715f4ef205b3d.html`.
  - Se desplegó Cloudflare Worker `winerim-proxy` para servir la verificación y redirects legacy.
  - Version ID final desplegada: `766e2cdd-da00-4157-8745-1f27c25a03e5`.
  - Informe creado: `src/seo/SEARCH_CONSOLE_AUDIT_2026-05-23.md`.
- Datos reales vistos en Search Console:
  - Rendimiento 3 meses: 664 clics, 8,32 mil impresiones, CTR 8 %, posición media 9,5.
  - 73 páginas indexadas y 1.643 no indexadas.
  - 194 URLs 404, 1.232 descubiertas sin indexar y 111 rastreadas sin indexar.
  - `/sitemap.xml` enviado y correcto con 1.886 páginas descubiertas.
  - `/sitemap_index.xml` sigue enviado desde 2022 y correcto, aunque en producción redirige a `/sitemap.xml`.
  - Core Web Vitals móvil: 7 URLs malas por LCP > 4 s; grupo representativo home con LCP 4,5 s.
  - FAQ schema: 4 elementos no válidos por `FAQPage` duplicado en `/software-carta-de-vinos` y `/como-vender-mas-vino-en-un-restaurante`.
  - Acciones manuales y problemas de seguridad: sin problemas detectados.
  - Enlaces externos totales: 48; enlaces internos totales: 87.
- Correcciones ejecutadas desde Search Console:
  - `/privacy-policy` -> `/privacidad`
  - `/home` -> `/`
  - `/homepage` -> `/`
  - `/alex-pardo` -> `/article/alex-pardo`
  - `/aumenta-la-venta-de-vinos-en-tu-restaurante-mejores-estrategias` -> `/como-vender-mas-vino-en-un-restaurante`
  - `/winerim-vs-wineadvisor-2` -> `/comparativas`
  - `/en/the-importance-of-choosing-the-wine-that-goes-best-with-food` -> `/en/blog`
  - `/clientes/*` -> `/clientes`
  - `/?p=*` -> `/blog`
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
- Antes de seguir escalando contenido, priorizar correcciones SEO técnicas que afectan a indexabilidad: sitemap vs Worker, `bot-fallback`, hreflang/canonical y `robots.txt`.
- Tratar Search Console privada como fuente pendiente de cruce: hace falta acceso a la propiedad o exportaciones para auditar datos internos.
- Tratar el posicionamiento en LLMs como una capa de consistencia de entidad: robots, prerender, idioma, schema, canonicals, contenido citable y menciones externas.
- No escalar masivamente la biblioteca hasta corregir señales que confunden a bots/LLMs.
- Para el primer saneamiento del sitemap, excluir URLs no resolubles es preferible a seguir enviando 404 a Google.
- La exclusión de recursos/benchmarks/playbooks es temporal: esas URLs deben volver al sitemap cuando tengan prerender y canonical propios.
- El prerender estático localizado añadido ahora es una mitigación técnica: corrige idioma/canonical/hreflang, pero no sustituye traducciones editoriales humanas completas por página.
- `llms.txt` debe mantenerse como archivo informativo para IA, no como sitemap XML.
- En el primer bloque SEO/LLM previo no se modificó Cloudflare Worker porque esos cambios afectaban a frontend estático y Edge Functions gestionadas por Lovable.
- Para Search Console se permitió una excepción a la regla de no tocar Worker: era necesario para verificar la propiedad y corregir redirects legacy de alta confianza detectados en GSC.
- No validar corrección de 404 en Search Console todavía, porque solo se corrigió una tanda de ejemplos y no los 194 casos completos.
- No reenviar sitemap todavía, porque los cambios locales de `sitemap` y `prerender` siguen pendientes de despliegue desde Lovable.

## Hipótesis

- La primera tanda de 10 uvas cubre una parte alta de demanda informacional y comercial de la biblioteca.
- El mayor salto SEO siguiente vendrá de ampliar esta profundidad a más uvas, regiones y estilos, no de reabrir rutas/hreflang.
- Los fallbacks localizados mejoran calidad internacional y reducen riesgo de páginas mixtas mientras se escriben traducciones editoriales humanas completas.
- Search Console probablemente reflejará los problemas públicos detectados como URLs enviadas con 404, canónicas inesperadas, páginas duplicadas y posibles incoherencias hreflang.
- El mayor salto inmediato de indexabilidad vendrá de limpiar el sitemap y asegurar prerender específico antes de añadir más URLs.
- Winerim puede estar bien posicionado para consultas de marca y categoría específica, pero las incoherencias de idioma/canonical reducen la probabilidad de ser citado correctamente por LLMs en consultas genéricas.
- Un `llms.txt` curado y un `llms-full.txt` ayudarían a orientar mejor a agentes, aunque no sustituyen robots, schema ni contenido indexable limpio.
- Al desplegar el sitemap corregido deberían desaparecer del sitemap público las 534 URLs 404 detectadas y las 24 URLs estáticas con canonical genérico excluidas temporalmente.
- Corregir idioma/canonical/hreflang en rutas localizadas estáticas debería mejorar comprensión internacional para Googlebot y LLM crawlers, aunque el contenido genérico aún limita la profundidad semántica.
- La caída de impresiones de `/en/pricing` señalada por Search Console probablemente está relacionada con el problema de prerender/canonical localizado ya corregido en local pero pendiente de despliegue.
- El bloque de 1.232 páginas descubiertas sin indexar parece venir de demasiadas URLs internacionales/artículos traducidos con señales débiles o inconsistentes.
- El tráfico orgánico actual depende mucho de marca; el crecimiento no branded exige limpiar indexación, mejorar profundidad, enlazado interno y autoridad externa.

## Tareas pendientes

- Desplegar desde Lovable:
  - Publicar frontend para `robots.txt`, `llms.txt` y `llms-full.txt`.
  - Pedir despliegue explícito de Edge Function `sitemap`.
  - Pedir despliegue explícito de Edge Function `prerender`.
- Revalidar producción tras despliegue:
  - `https://winerim.wine/robots.txt` debe listar solo `https://winerim.wine/sitemap.xml` como sitemap.
  - `https://winerim.wine/llms.txt` y `https://winerim.wine/llms-full.txt` deben responder 200.
  - `https://winerim.wine/sitemap.xml` debe dejar de enviar las familias 404 excluidas.
  - Googlebot en `/en/pricing`, `/de/preise`, `/pt/precos` debe recibir idioma/canonical propios.
  - Googlebot en un artículo con sufijo internacional debe declarar `html lang` correcto.
- Conseguir acceso directo a Search Console o exportaciones de indexación, rendimiento, sitemaps, inspección de URLs y experiencia.
- Reenviar sitemap y validar correcciones en Search Console cuando esté disponible.
- Exportar desde Search Console los ejemplos completos de:
  - 194 URLs 404.
  - 1.232 URLs descubiertas sin indexar.
  - 111 URLs rastreadas sin indexar.
- Completar mapa de redirects legacy por familias, especialmente `/estadisticas/*`, antiguas URLs `/en/.../` y antiguas URLs de clientes.
- Revisar si Search Console permite retirar `/sitemap_index.xml` desde detalle o configuración.
- Corregir `FAQPage` duplicado.
- Optimizar LCP móvil de la home.
- Fortalecer enlaces internos detectables por Google.
- Decidir si las 534 URLs excluidas del sitemap deben:
  - Permanecer fuera del sitemap de forma permanente.
  - Redirigirse a URLs canónicas existentes.
  - Convertirse en páginas reales con routing/prerender propio.
- Corregir 122 URLs `bot-fallback`, especialmente city pages `wine-list-software-*` y `software-carta-de-vinos-*`.
- Crear prerender/canonical específico para recursos, benchmarks y playbooks antes de devolverlos al sitemap.
- Refinar contenido humano de rutas estáticas localizadas: el prerender genérico actual es una capa técnica, no la versión editorial final.
- Definir patrón canónico definitivo para artículos traducidos (`/article/slug_lang` vs rutas localizadas `/en/article/slug`).
- Revisar o noindex/canonicalizar `analisis.winerim.wine` para que no compita con la home ni transmita una señal pobre.
- Hecho: resolver legacy shortcuts de biblioteca del vino con redirects canónicos en Worker de producción.
- Separar una tarea para deuda global de lint.
- Separar una tarea para avisos de seguridad de Lovable.

## Actualización 2026-05-24: continuación Search Console

## Hechos

- Se corrigió localmente el error de Search Console `FAQPage` duplicado:
  - `src/pages/SoftwareCartaVinos.tsx` ya no inyecta un `FAQPage` manual adicional.
  - `src/pages/VenderMasVino.tsx` ya no inyecta un `FAQPage` manual adicional.
  - `src/pages/WhatIsWinerim.tsx` conserva su schema `SoftwareApplication`, pero deja el `FAQPage` únicamente en `FAQSection`.
  - `src/components/seo/FAQSection.tsx` añade títulos por defecto para `de` y `pt`.
- `index.html` usa ahora los IDs `seo-jsonld` y `seo-org-jsonld` en sus JSON-LD estáticos para que `SEOHead` los actualice en vez de crear duplicados.
- Verificación local del arreglo FAQ:
  - `/software-carta-de-vinos`: 1 `FAQPage`, 0 JSON-LD sin ID.
  - `/como-vender-mas-vino-en-un-restaurante`: 1 `FAQPage`, 0 JSON-LD sin ID.
  - `/en/what-is-winerim`: 1 `FAQPage`, 0 JSON-LD sin ID.
- Se añadió redirect directo en `cloudflare-worker-v3-hybrid.js`:
  - `/estadisticas` -> `/benchmarks-playbooks`.
  - `/estadisticas/*` -> `/benchmarks-playbooks`.
- Se ejecutó `npm run build` correctamente.
- Se ejecutó `npm run deploy:worker:dry-run` correctamente.
- Se desplegó Cloudflare Worker `winerim-proxy` con Version ID `4f83ba4a-7994-4cf1-9ec6-d20368b5628b`.
- Verificaciones de producción posteriores al despliegue Worker:
  - `https://winerim.wine/estadisticas/estadisticas-2024-01-28?codex=1` responde 301 a `https://winerim.wine/benchmarks-playbooks`.
  - `https://winerim.wine/google0be715f4ef205b3d.html?codex=1` responde 200 con `X-Worker-Branch: gsc-verification`.
  - `https://winerim.wine/clientes/canabota?codex=1` responde 301 a `https://winerim.wine/clientes`.
  - `https://winerim.wine/sitemap.xml?codex=1` responde 200 con `X-Worker-Branch: sitemap`.
- `npm run deploy:supabase:seo` quedó bloqueado: falta `SUPABASE_ACCESS_TOKEN` o login de Supabase CLI.
- Lovable abierto desde el navegador de Codex redirige a login, por lo que no se pudo publicar frontend ni Edge Functions desde Lovable en esta sesión.
- Las correcciones frontend/SEO de FAQ duplicado, `robots.txt`, `llms.txt`, `llms-full.txt`, `sitemap` y `prerender` siguen pendientes de publicación desde Lovable o de credenciales Supabase.

## Decisiones

- `FAQSection` queda como fuente única de `FAQPage` para páginas que renderizan una sección FAQ visible.
- Las páginas que necesiten schema adicional pueden mantener `SoftwareApplication`, `Article`, `BreadcrumbList` u otros tipos, pero no deben duplicar `FAQPage`.
- Los JSON-LD estáticos de `index.html` deben conservar IDs compatibles con `SEOHead` para funcionar como fallback y no como duplicado.
- La familia legacy `/estadisticas/*` se redirige a `/benchmarks-playbooks` por equivalencia semántica y por aparecer en ejemplos 404 de Search Console.
- No se puede usar Supabase CLI directo sin token/login; el despliegue de `sitemap` y `prerender` debe hacerse desde Lovable autenticado o con `SUPABASE_ACCESS_TOKEN`.
- No pedir validación de FAQ en Search Console hasta que el frontend corregido esté publicado.

## Hipótesis

- Los 4 elementos FAQ inválidos de Search Console deberían desaparecer tras publicar el frontend corregido y esperar recrawl.
- El redirect `/estadisticas/*` reducirá una familia concreta de los 194 404 detectados en Search Console.
- Puede quedar duplicación específica de `SoftwareApplication` en páginas con schema propio adicional, como `WhatIsWinerim`; ya no viene de los JSON-LD genéricos sin ID de `index.html`.

## Tareas pendientes

- Publicar desde Lovable el frontend corregido para que el arreglo de `FAQPage` llegue a producción.
- Desplegar desde Lovable o con token las Edge Functions `sitemap` y `prerender`.
- Revalidar en producción:
  - `FAQPage` único en `/software-carta-de-vinos`.
  - `FAQPage` único en `/como-vender-mas-vino-en-un-restaurante`.
  - `FAQPage` único en `/en/what-is-winerim`.
- Pedir validación en Search Console de FAQ solo tras confirmar producción.
- Continuar mapa de redirects legacy para el resto de 404.
- Revisar si `WhatIsWinerim` debe mantener un `SoftwareApplication` adicional o convertirlo a otro tipo semántico como `AboutPage`.

## Actualización 2026-05-24: commit/push y comprobación de producción

## Hechos

- Se comprobó que `SUPABASE_ACCESS_TOKEN` sigue ausente en el entorno.
- `npm run deploy:supabase:seo` sigue fallando por falta de token o login Supabase CLI.
- Se verificó de nuevo:
  - `npm run test`: 5 archivos, 15 tests.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`.
  - `git diff --check`.
- Se creó el commit `a98e8c6 fix: clean search console seo signals`.
- Se hizo push de `a98e8c6` a `origin/main`.
- Producción todavía no refleja el commit:
  - `https://winerim.wine/robots.txt?codex=a98e8c6` sigue anunciando `Sitemap: https://winerim.wine/llms.txt`.
  - `https://winerim.wine/llms-full.txt?codex=a98e8c6` responde 404.

## Actualización 2026-05-24: auditoría profunda de web

## Hechos

- Antes de continuar con biblioteca del vino se ejecutó una revisión profunda de la web a nivel SEO técnico, contenido, LLMs, UX y rendimiento.
- Informe creado: `src/seo/WEB_DEEP_AUDIT_2026-05-24.md`.
- Producción auditada con Googlebot mantiene bien las rutas core ya saneadas: home, `/clientes`, `/biblioteca-vino`, `/en/pricing`, `/de/preise`, `/pt/precos`, `/software-carta-de-vinos`, `/recursos` y `/benchmarks-playbooks`.
- Sitemap público actual: 2.431 URLs.
- Quedan 122 URLs programáticas de ciudad en `bot-fallback`, sobre todo `wine-list-software-*` y `software-carta-de-vinos-*`.
- Las páginas legales localizadas aparecían con contenido/canonical de home para Googlebot, por ejemplo `/en/privacy`.
- Lighthouse mobile medido el 2026-05-24:
  - Home: Performance 58, Accessibility 96, Best Practices 71, SEO 92; LCP 12,9 s, FCP 6,6 s, CLS 0.
  - `/clientes`: Performance 57, Accessibility 93, Best Practices 71, SEO 92; LCP 12,1 s, FCP 7,4 s, CLS 0.
- Lighthouse detectó 404 de red en `https://winerim.wine/~api/analytics`.
- Lighthouse detectó un 404 de logo en producción causado por assets con espacios en el nombre generado, por ejemplo `Mabe%20Jamoneria-*.png`.
- Se implementaron correcciones locales:
  - Las páginas legales tienen `noindex` en frontend.
  - `SEOHead` emite `noindex, follow` cuando el `noindex` es explícito.
  - `prerender` renderiza páginas legales exactas en `es`, `en`, `it`, `fr`, `de` y `pt` con canonical propio y `noindex, follow`.
  - `sitemap` excluye legales y familias programáticas de ciudad sin prerender real.
  - Se sanearon nombres de archivo de logos con espacios/caracteres especiales.
  - `LogoStrip` usa `em-hotels.png`.
- Se desplegó Cloudflare Worker `winerim-proxy` para activar `X-Robots-Tag: noindex, follow` en legales.
- Version ID Worker desplegada: `4cc5425b-cc8d-4de4-a72f-d9370b355426`.
- Producción validada tras Worker:
  - `/en/privacy?codex=legal-noindex` como Googlebot responde 200 con `X-Robots-Tag: noindex, follow`.
  - `/privacidad?codex=legal-noindex` como Googlebot responde 200 con `X-Robots-Tag: noindex, follow`.
- Las correcciones de frontend, sitemap y prerender siguen pendientes de publicación desde Lovable.
- Verificaciones locales completadas:
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`.
  - `npm run build`.
  - `npm run test`: 5 archivos, 15 tests.
  - `git diff --check`.
  - QA local en `/clientes`: 591 imágenes renderizadas.
  - QA local en `/en/privacy`: `Privacy Policy`, canonical `https://winerim.wine/en/privacy`, robots `noindex, follow`.
- Se detectó una contradicción/deuda documental: `src/seo/route-map.ts` sigue sin reflejar plenamente `de`/`pt` y no debe tratarse como fuente única frente a los mapas reales de i18n, sitemap y prerender.

## Decisiones

- Las páginas legales deben estar disponibles para usuarios, pero fuera del sitemap y fuera del índice orgánico.
- Las páginas legales deben ser `noindex, follow`, no `noindex, nofollow`, para no cortar el rastreo de enlaces internos.
- Las city pages programáticas sin prerender específico no deben enviarse a Google hasta tener contenido/canonical/H1 propios.
- Los assets públicos de logos no deben tener espacios ni caracteres especiales en el basename.
- Mantener Lighthouse y Search Console como fuente de priorización para el siguiente bloque de performance.

## Hipótesis

- El problema principal de rendimiento móvil viene de JavaScript inicial, imágenes sobredimensionadas y DOM grande, no del tiempo de respuesta del documento.
- Al publicar desde Lovable el sitemap saneado, Search Console debería recibir menos URLs con canonical inesperada o contenido genérico.
- Resolver `~api/analytics` debería limpiar errores de consola y mejorar Best Practices.
- Las city pages pueden ser útiles como landings reales por mercado, pero hoy son riesgo de contenido fino/duplicado.

## Tareas pendientes

- Publicar desde Lovable frontend y Edge Functions `sitemap`/`prerender`.
- Revalidar producción tras Lovable:
  - `/sitemap.xml` no debe listar legales ni city pages fallback.
  - Googlebot en `/en/privacy` debe recibir `Privacy Policy`, canonical propio y `noindex, follow`.
  - `/clientes` no debe generar 404 por assets con espacios.
- Resolver o desactivar la llamada a `~api/analytics`.
- Abrir bloque P1 de Core Web Vitals: LCP home y `/clientes`, JS inicial, imágenes responsivas y DOM de logos.
- Decidir destino final de city pages: contenido real, redirect o noindex.
- Unificar o degradar explícitamente `src/seo/route-map.ts` para evitar contradicciones futuras.
  - Googlebot en `https://winerim.wine/en/pricing?codex=a98e8c6` sigue recibiendo `html lang="es"` y canonical `https://winerim.wine`.
- Lovable sigue redirigiendo a login en el navegador de Codex: `https://lovable.dev/login?redirect=%2Fprojects%2F2c4eed0e-6760-45f0-aeb3-ce44de8e91f1`.

## Decisiones

- Mantener `a98e8c6` como commit de referencia del bloque Search Console/SEO.
- No considerar desplegadas las correcciones frontend/Edge Functions hasta que producción cambie en las verificaciones públicas.
- Para continuar sin token Supabase, hace falta iniciar sesión en Lovable dentro del navegador de Codex o publicar manualmente desde Lovable.

## Hipótesis

- Lovable no está auto-publicando desde `origin/main`, o todavía requiere una acción manual de sync/publish.
- Una vez Lovable publique el commit, `robots.txt`, `llms-full.txt` y el arreglo FAQ deberían aparecer en producción; `sitemap`/`prerender` requerirán además despliegue de Edge Functions.

## Tareas pendientes

- Iniciar sesión en Lovable en la ventana de Codex y publicar el proyecto.
- Confirmar si Lovable permite desplegar explícitamente las Edge Functions `sitemap` y `prerender`.
- Revalidar producción tras publish:
  - `robots.txt` sin `llms.txt` como sitemap.
  - `llms-full.txt` con HTTP 200.
  - `/en/pricing`, `/de/preise` y `/pt/precos` como Googlebot con idioma/canonical propios.
  - `FAQPage` único en las páginas afectadas.

## Actualización 2026-05-24: producción validada tras Lovable

## Hechos

- El usuario publicó desde Lovable.
- No se redesplegó Cloudflare Worker porque las rutas dependientes del Worker ya respondían correctamente.
- Producción refleja el frontend publicado:
  - `https://winerim.wine/robots.txt?codex=postlovable` ya solo declara `Sitemap: https://winerim.wine/sitemap.xml`.
  - `https://winerim.wine/llms-full.txt?codex=postlovable` responde HTTP 200.
- Producción refleja `prerender` localizado:
  - Googlebot en `/en/pricing` recibe `html lang="en"`, canonical `https://winerim.wine/en/pricing` y hreflang `es/en/de/pt/x-default`.
  - Googlebot en `/de/preise` recibe `html lang="de"` y canonical `https://winerim.wine/de/preise`.
  - Googlebot en `/pt/precos` recibe `html lang="pt"` y canonical `https://winerim.wine/pt/precos`.
  - Googlebot en `/article/alex-pardo_en` recibe `html lang="en"` e `inLanguage: "en"`.
- Producción refleja el sitemap saneado:
  - `https://winerim.wine/sitemap.xml?codex=postlovable2` contiene 2.431 URLs.
  - El sitemap ya no incluye `llms.txt`.
  - El sitemap ya no incluye las familias `grape/` ni `uva/`.
  - El sitemap ya no incluye el ejemplo temporalmente excluido `/benchmarks-playbooks/playbook-mejorar-rotacion`.
  - El sitemap sí incluye `/en/pricing` y `/de/preise`.
- Producción mantiene Worker correcto:
  - `/estadisticas/estadisticas-2024-01-28?codex=postlovable` responde 301 a `/benchmarks-playbooks`.
  - `/google0be715f4ef205b3d.html?codex=postlovable2` responde 200 con `X-Worker-Branch: gsc-verification`.
- Producción renderizada en navegador confirma `FAQPage` único:
  - `/software-carta-de-vinos`: 1 `FAQPage`, 0 JSON-LD sin ID.
  - `/como-vender-mas-vino-en-un-restaurante`: 1 `FAQPage`, 0 JSON-LD sin ID.
  - `/en/what-is-winerim`: 1 `FAQPage`, 0 JSON-LD sin ID.

## Decisiones

- No desplegar Worker cuando la lógica desplegada ya coincide con las verificaciones públicas.
- Considerar cerrado el despliegue técnico del bloque `robots`/`llms`/`sitemap`/`prerender`/FAQ.
- El siguiente paso en Search Console ya puede ser reenviar `/sitemap.xml` y pedir validaciones de corrección.

## Hipótesis

- Google tardará días en reflejar la reducción de URLs no indexadas y la corrección de FAQ.
- La bajada del sitemap de 2.989 a 2.431 URLs debería reducir ruido de 404 y páginas débiles enviadas.
- Las páginas localizadas estáticas deberían empezar a recuperar señales internacionales al dejar de canonicalizar a la home española.

## Tareas pendientes

- Reenviar `https://winerim.wine/sitemap.xml` en Search Console.
- Pedir validación de corrección para FAQ duplicado en Search Console.
- Pedir validación o seguimiento de 404 tras corregir familias completas.
- Exportar ejemplos completos restantes de 404, descubiertas sin indexar y rastreadas sin indexar.
- Continuar con Core Web Vitals móvil, LCP home y fortalecimiento de enlaces internos.

## Actualización 2026-05-24: acciones Search Console post-despliegue

## Hechos

- Al iniciar esta continuación se releyeron `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- En Search Console, `/sitemap.xml` aparece enviado el 24 may 2026, leído el 24 may 2026, con estado `Correcto`, 2.431 páginas descubiertas y 0 vídeos.
- En Search Console, `/sitemap_index.xml` sigue listado desde el 22 dic 2022, leído por última vez el 18 may 2026, con estado `Correcto` y 1.358 páginas descubiertas.
- Se pidió la validación de corrección del problema `El campo "FAQPage" está duplicado`.
- Search Console dejó la validación FAQ en estado `Iniciada`, con fecha de inicio 24/5/26.
- Se inspeccionó `https://winerim.wine/software-carta-de-vinos` en Search Console:
  - Estado: `La URL está en Google`.
  - Indexación de páginas: `La página está indexada`.
  - HTTPS: válido.
  - Rutas de exploración: 1 elemento válido.
  - Preguntas frecuentes: 1 elemento válido.
- Se intentó solicitar indexación/reindexación de `https://winerim.wine/software-carta-de-vinos`.
- Search Console devolvió error al enviar la solicitud de indexación: `Se ha producido un problema al enviar la solicitud de indexación. Vuelve a intentarlo más tarde.`

## Decisiones

- No hacer indexación manual masiva: usar la herramienta de inspección solo para una tanda corta de URLs estratégicas.
- No insistir repetidamente con `Solicitar indexación` mientras Search Console devuelva error temporal.
- Mantener `/sitemap_index.xml` como pendiente de revisión, sin retirarlo a ciegas mientras la UI no ofrezca una acción clara.
- Considerar que el paso manual prioritario de Search Console para FAQ ya está hecho: la validación quedó iniciada.

## Hipótesis

- La validación FAQ puede tardar días en completarse aunque la inspección de URL ya detecte 1 FAQ válido.
- El error de solicitud de indexación parece temporal o propio de Search Console, no un bloqueo técnico de Winerim, porque la URL inspeccionada está indexada y con mejoras válidas.
- El nuevo sitemap de 2.431 URLs debería empezar a sustituir la lectura antigua del sitemap cuando Google recalcule cobertura.

## Tareas pendientes

- Monitorizar la validación FAQ iniciada el 24/5/26.
- Reintentar solicitud de indexación más tarde solo para URLs estratégicas:
  - `https://winerim.wine/software-carta-de-vinos`
  - `https://winerim.wine/como-vender-mas-vino-en-un-restaurante`
  - `https://winerim.wine/en/pricing`
  - `https://winerim.wine/de/preise`
  - `https://winerim.wine/pt/precos`
  - `https://winerim.wine/biblioteca-vino`
  - `https://winerim.wine/en/wine-library`
  - `https://winerim.wine/de/weinbibliothek`
  - `https://winerim.wine/pt/biblioteca-vinho`
- Revisar más adelante si Search Console permite retirar `/sitemap_index.xml` sin afectar al sitemap activo.
- No validar 404 todavía hasta completar familias de redirects o destinos canónicos.

## Actualización 2026-05-24: actualización de logos home/clientes

## Hechos

- Al iniciar este bloque se releyeron `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- El usuario pidió actualizar logos antes de continuar con Search Console/biblioteca del vino.
- Se recibieron dos paquetes de assets:
  - `Hoteles_Blancos_1024.zip` con 8 logos de grupos hoteleros.
  - `Logos_Blancos_white_1024.zip` con 589 logos de clientes.
- Los assets se incorporaron al repo en:
  - `src/assets/logos/hotels-white/`
  - `src/assets/logos/clients-white/`
- Los PNG originales de 1024 px se redujeron a 360 px de lado para limitar peso:
  - Hoteles: 228 KB.
  - Clientes: 18 MB.
- `src/components/LogoStrip.tsx` usa ahora los 8 logos blancos de hoteles para la sección de home.
- `src/pages/Clientes.tsx` deja de depender de la tabla `restaurants` de Supabase para pintar la galería principal y usa los 589 logos estáticos optimizados.
- En `/clientes`, la galería prioriza logos de España primero y mantiene nombre/ubicación como `aria-label`/`title`.
- Verificación local:
  - `npm run build` completado correctamente.
  - `npm run test`: 5 archivos, 15 tests.
  - `git diff --check` sin errores.
  - Navegador local en home: los 8 logos de hoteles cargan con dimensiones válidas.
  - Navegador local en `/clientes`: 589 logos detectados y sin imágenes rotas en la muestra cargada.
- El bloque base de logos quedó commiteado y pusheado en `main` con `c7adcfe feat: update hotel and client logos`.
- Avisos no bloqueantes:
  - Browserslist/caniuse-lite sigue desactualizado.
  - Persisten avisos de chunks grandes durante build.

## Decisiones

- Usar assets estáticos versionados para la galería pública de `/clientes`, evitando que la página dependa de datos incompletos o antiguos de Supabase.
- Mantener los logos de clientes como PNG optimizados porque el entorno local no soporta conversión WebP vía `sips`.
- Tras feedback del usuario, mostrar nombres visibles de clientes bajo cada logo en `/clientes`; mantener ubicación como apoyo visual y metadata accesible.
- No tocar SEO técnico, Worker, sitemap, prerender ni Search Console en este bloque.

## Hipótesis

- El peso añadido de 18 MB queda contenido porque las imágenes son lazy-loaded y la ruta `/clientes` no está en la home.
- La galería estática dará una señal de prueba social más completa y fiable que la dependencia actual de Supabase.
- Puede convenir en un bloque posterior crear un manifest editorial con nombres comerciales normalizados si se quieren mostrar textos visibles por cliente.

## Tareas pendientes

- Hecho: commit y push de la actualización base de logos con `c7adcfe`.
- Publicar desde Lovable para que home y `/clientes` reflejen los nuevos assets.
- Revalidar producción:
  - Home: sección `Grupos hoteleros` con los 8 logos nuevos.
  - `/clientes`: galería de 589 logos cargando sin rotos.
- Valorar más adelante si conviene convertir los logos a WebP/AVIF con una herramienta de imagen dedicada.

## Actualización 2026-05-24: ajuste visual de logos

## Hechos

- Al iniciar este ajuste se releyeron `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- Se detectó una contradicción documental: `CURRENT_STATE.md` aún marcaba como pendiente el commit/push del bloque base de logos, aunque `c7adcfe` ya estaba pusheado.
- El usuario pidió mantener el nombre escrito de los clientes y hacer más grandes los logos de hoteles en la home.
- `src/pages/Clientes.tsx` vuelve a mostrar texto visible por cliente bajo cada logo.
- `src/pages/Clientes.tsx` muestra también la ubicación como apoyo secundario, limitada en una línea.
- `src/components/LogoStrip.tsx` aumenta el tamaño visual de los logos de hoteles:
  - Antes: imagen `h-8 sm:h-14 md:h-16`.
  - Ahora: imagen `h-16 sm:h-20 md:h-24`.
- No se añadieron nuevos assets.
- Verificación local:
  - `npm run build` completado correctamente.
  - `npm run test`: 5 archivos, 15 tests.
  - `git diff --check` sin errores.
  - Navegador local en `/clientes`: aparecen nombres visibles junto a los logos.
  - Navegador local en home: los 8 logos de hoteles cargan y miden 96 px de alto en viewport desktop local.
- Avisos no bloqueantes:
  - Browserslist/caniuse-lite sigue desactualizado.
  - Persisten avisos de chunks grandes durante build.

## Decisiones

- Mantener nombres visibles de clientes en `/clientes` porque el usuario lo prefiere y mejora reconocimiento comercial.
- Reducir densidad de la galería de clientes de 8 columnas máximas a 6 columnas máximas para dar aire al logo y al nombre.
- Mantener los logos de hoteles sin nombre escrito visible en home, pero con mayor presencia visual.
- No tocar SEO técnico, Worker, sitemap, prerender ni Search Console en este ajuste.

## Hipótesis

- Los nombres visibles debajo de cada logo harán más reconocible la prueba social, aunque algunos nombres generados desde filename puedan requerir normalización editorial futura.
- Aumentar los logos de hoteles mejora la percepción de credibilidad en la home sin cambiar arquitectura ni contenido SEO.

## Tareas pendientes

- Publicar desde Lovable el ajuste visual de logos.
- Revalidar producción:
  - Home: logos de hoteles más grandes.
  - `/clientes`: logos con nombre visible.
- Valorar un manifest editorial de clientes para normalizar nombres comerciales, grupos y ubicaciones.

## Actualización 2026-05-24: rendimiento `/clientes` y analytics noop

## Hechos

- Al retomar se confirmó que producción aún no refleja todo el bloque pendiente de Lovable:
  - `https://winerim.wine/sitemap.xml?codex=01fc2b1` sigue con 2.431 URLs e incluye legales y city pages fallback.
  - `https://winerim.wine/en/privacy?codex=01fc2b1` como Googlebot ya recibe `X-Robots-Tag: noindex, follow` desde Worker, pero el HTML del origen sigue siendo la home/canonical `/`.
- Lovable en el navegador de Codex sigue redirigiendo a login, por lo que no se pudo publicar frontend ni Edge Functions desde esa vía.
- `SUPABASE_ACCESS_TOKEN` sigue ausente en el entorno.
- Se corrigió en Cloudflare Worker el 404 de producción `https://winerim.wine/~api/analytics`.
- Worker desplegado: `winerim-proxy` Version ID `5e984988-b0c1-4fa2-b5f8-dc0e62fabe0f`.
- Verificación de producción:
  - `GET https://winerim.wine/~api/analytics` responde HTTP 204.
  - `OPTIONS https://winerim.wine/~api/analytics` responde HTTP 204.
  - La respuesta incluye `X-Worker-Branch: analytics-noop`, `Cache-Control: no-store` y `X-Robots-Tag: noindex`.
- `src/pages/Clientes.tsx` ahora carga la galería de clientes por tandas:
  - 120 logos iniciales.
  - Botón para cargar 120 logos adicionales por click.
  - Contador localizado en `es`, `en`, `it`, `fr`, `de` y `pt`.
- QA local en `/clientes` móvil:
  - Estado inicial: 120 imágenes de logo.
  - Tras click en `Ver más clientes`: 240 imágenes.
  - Texto inicial: `Mostrando 120 de 589`.
  - Sin errores de consola en la prueba.
- Verificaciones ejecutadas:
  - `npm run build` correcto.
  - `npm run test`: 5 archivos, 15 tests.
  - `git diff --check` correcto.
  - `npm run deploy:worker:dry-run` correcto.
- `npm run lint` falla por deuda global preexistente fuera de los archivos modificados; `src/pages/Clientes.tsx` no aparece entre los errores.

## Decisiones

- Resolver `~api/analytics` en Worker como endpoint noop 204 para eliminar ruido de consola/Lighthouse sin depender del origen Lovable.
- Cambiar `/clientes` de carga total de 589 logos visibles a carga progresiva por tandas para reducir DOM inicial, imágenes iniciales y presión sobre LCP.
- Mantener nombre escrito y ubicación secundaria en cada cliente, respetando la preferencia visual ya fijada por el usuario.
- No mezclar este bloque con corrección global de lint, porque los errores vienen de deuda previa y no del cambio actual.

## Hipótesis

- Reducir la carga inicial de `/clientes` de 589 a 120 logos debería mejorar DOM inicial, coste de layout y LCP móvil.
- El endpoint noop de analytics debería eliminar el 404 detectado por Lighthouse sin afectar SEO ni indexación.
- El mayor salto pendiente sigue dependiendo de publicar desde Lovable los cambios de frontend, `sitemap` y `prerender` ya implementados.

## Tareas pendientes

- Publicar desde Lovable los cambios pendientes de frontend y Edge Functions.
- Tras publish Lovable, revalidar:
  - `/sitemap.xml` sin legales ni city pages fallback.
  - `/en/privacy` como Googlebot con título/canonical propios y `noindex, follow`.
  - `/clientes` en producción con galería progresiva y sin 404 de logos.
- Reenviar `/sitemap.xml` en Search Console solo después de validar producción.
- Reejecutar Lighthouse móvil en home y `/clientes` tras publish para medir el impacto real.
- Abrir bloque específico para Core Web Vitals de home: hero/LCP, JS inicial, bundles e imágenes responsive.

## Actualización 2026-05-24: validación post-deploy Lovable

## Hechos

- El usuario confirmó que hizo el deploy desde Lovable.
- Producción ya refleja el bloque pendiente de frontend, `sitemap` y `prerender`.
- `https://winerim.wine/sitemap.xml?codex=f778db3` contiene 2.072 URLs.
- El sitemap ya no incluye las legales:
  - `/privacidad`
  - `/en/privacy`
  - `/it/privacy`
  - `/fr/confidentialite`
  - `/de/datenschutz`
  - `/pt/privacidade`
- El sitemap ya no incluye las familias fallback de city pages comprobadas:
  - `wine-list-software-*`
  - `software-carta-de-vinos-*`
  - `software-carta-vinhos-*`
- Googlebot recibe prerender legal exacto en los seis idiomas, con `X-Worker-Branch: bot-prerender`, `X-Robots-Tag: noindex, follow`, `meta robots: noindex, follow`, canonical propio e idioma correcto:
  - `/privacidad`: `lang="es"`, canonical `/privacidad`.
  - `/en/privacy`: `lang="en"`, canonical `/en/privacy`.
  - `/it/privacy`: `lang="it"`, canonical `/it/privacy`.
  - `/fr/confidentialite`: `lang="fr"`, canonical `/fr/confidentialite`.
  - `/de/datenschutz`: `lang="de"`, canonical `/de/datenschutz`.
  - `/pt/privacidade`: `lang="pt"`, canonical `/pt/privacidade`.
- `/clientes` en producción ya usa carga progresiva:
  - 120 logos iniciales.
  - Botón `Ver más clientes`.
  - 240 logos tras un click.
  - Texto `Mostrando 120 de 589` y `Mostrando 240 de 589`.
  - Sin errores de consola en QA Playwright.
  - Sin 404 same-origin de assets en la muestra comprobada.
- Home en producción muestra los 8 logos hoteleros nuevos con altura visual de 96 px en viewport desktop y sin fallos same-origin.
- `https://winerim.wine/~api/analytics?codex=f778db3` sigue respondiendo HTTP 204 con `X-Worker-Branch: analytics-noop`.
- Lighthouse mobile post-deploy:
  - Home: Performance 59, Accessibility 96, Best Practices 75, SEO 92, FCP 5,4 s, LCP 11,2 s, Speed Index 6,5 s, TBT 70 ms, DOM 1.370 elementos.
  - `/clientes`: Performance 57, Accessibility 93, Best Practices 75, SEO 85, FCP 5,6 s, LCP 12,3 s, Speed Index 8,6 s, TBT 110 ms, DOM 1.255 elementos.
- Comparado con la auditoría previa, `/clientes` baja de 2.177 a 1.255 elementos DOM y el ahorro potencial por imágenes responsive baja de 927 KB a 240 KB.
- Un run de Lighthouse en `/clientes` marcó `robots.txt is not valid` sin detalles, pero `robots.txt` responde 200, home Lighthouse lo marca válido y el contenido directo es válido con un único sitemap XML.

## Decisiones

- Considerar completado el bloqueo de deploy Lovable para este bloque: sitemap, legales, logos y `/clientes` ya están activos en producción.
- Mantener `~api/analytics` resuelto en Worker como 204.
- No considerar resuelto Core Web Vitals: aunque `/clientes` redujo DOM/peso de imágenes, LCP sigue por encima del objetivo.
- Tratar el aviso puntual de Lighthouse sobre `robots.txt` en `/clientes` como anomalía a vigilar, no como fallo confirmado.

## Hipótesis

- El nuevo sitemap de 2.072 URLs debería reducir ruido de cobertura y URLs descubiertas sin contenido útil en Search Console.
- El noindex legal exacto en seis idiomas debería evitar indexación accidental de páginas legales sin mezclar canonicals con home.
- El cuello de rendimiento ya no está principalmente en los 589 logos de `/clientes`, sino en FCP/LCP inicial, JS no usado, entrega de imágenes, cache TTL y render del primer viewport.

## Tareas pendientes

- Reenviar `/sitemap.xml` en Search Console.
- Reintentar inspección/indexación manual solo para una tanda corta de URLs estratégicas.
- Monitorizar la validación FAQ ya iniciada.
- Abrir bloque Core Web Vitals:
  - Identificar LCP element real en home y `/clientes`.
  - Optimizar JS inicial/no usado.
  - Revisar imágenes responsive y formatos next-gen.
  - Revisar cache TTL de assets.
  - Corregir contraste/enlace sin texto si se aborda accesibilidad.

## Actualización 2026-05-24: Search Console y Core Web Vitals home

## Hechos

- Se continuó la sesión leyendo primero `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- Search Console estaba autenticado con `gugocreative@gmail.com` para la propiedad URL-prefix `https://winerim.wine/`.
- En Search Console se reenvió `https://winerim.wine/sitemap.xml`.
- Search Console mostró el modal `Se ha enviado el sitemap correctamente`.
- Tras cerrar el modal, la tabla seguía mostrando 2.431 páginas descubiertas para `/sitemap.xml`; se espera que cambie solo cuando Google recrawlee.
- Se inspeccionó `https://winerim.wine/software-carta-de-vinos`.
- La solicitud manual de indexación para `https://winerim.wine/software-carta-de-vinos` quedó confirmada por Search Console con el mensaje de cola prioritaria.
- Se intentó una tanda automatizada de inspecciones/indexación para URLs estratégicas, pero el proceso expiró sin salida verificable; no se considera confirmado qué URLs de esa tanda quedaron en cola.
- La inspección de `https://winerim.wine/de/weinbibliothek` mostró `La URL no está en Google`.
- Al solicitar indexación de `https://winerim.wine/de/weinbibliothek`, Search Console quedó bloqueado en `Estamos probando si se puede indexar la URL publicada`; no se considera confirmada la solicitud.
- Se implementó un bloque local de Core Web Vitals para la home:
  - `src/pages/Index.tsx` monta la home bajo el fold después del primer `load`.
  - `src/components/landing/HomeBelowFold.tsx` separa las secciones secundarias de home y su `PageContentProvider`.
  - `src/components/Navbar.tsx` deja de importar `framer-motion` en la navegación inicial.
  - `vite.config.ts` filtra modulepreloads pesados de vendors diferidos.
  - `index.html` carga el widget de chat después del `load` y en idle/fallback diferido.
  - `fetchPriority` camelCase se sustituyó por `fetchpriority` en imágenes hero para evitar avisos React.
- Build local posterior:
  - `dist/index.html` solo pre-carga inicialmente `vendor-react`, `vendor-query` y `vendor-router`.
  - Ya no aparecen como modulepreload inicial `vendor-motion`, `vendor-supabase`, `vendor-charts`, `vendor-radix` ni `vendor-markdown`.
  - El entry local de home queda en torno a 268 kB, frente a unos 300 kB observados antes de este saneamiento.
- Verificaciones ejecutadas:
  - `npm run test`: 5 archivos, 15 tests.
  - `npm run build`.
  - `git diff --check`.
- Commit y push completados:
  - `78135cd feat: expand wine library editorial coverage`.
- Publicación productiva no completada desde esta sesión:
  - Lovable redirige a `https://lovable.dev/login?redirect=%2Fprojects%2F2c4eed0e-6760-45f0-aeb3-ce44de8e91f1`.
  - `SUPABASE_ACCESS_TOKEN` no existe en el entorno local.
  - No se pudo desplegar por CLI ni desde Lovable.
- Revalidación productiva posterior al push:
  - `https://winerim.wine/sitemap.xml` sigue listando shortcuts legacy como `/biblioteca-vino/tempranillo` y `/biblioteca-vino/napa-valley`.
  - Por tanto, la Edge Function `sitemap` nueva aún no está desplegada en producción.
  - La expansión editorial local no debe marcarse como cerrada en producción hasta publicar Lovable y desplegar `sitemap`/`prerender`.
  - Preview local `http://127.0.0.1:4177/`.
  - QA local: H1 de home visible, chunks bajo el fold cargan después del delay, dropdown desktop funciona, menú móvil funciona y submenu móvil de Producto funciona.
- Avisos no bloqueantes durante build:
  - Browserslist/caniuse-lite desactualizado.
  - Chunks grandes por encima de 200 kB.

## Decisiones

- Priorizar Core Web Vitals de home sin cambiar la propuesta visual ni el copy principal.
- Diferir secciones bajo el fold, Footer y chat para reducir competencia con FCP/LCP.
- Mantener `framer-motion` fuera del navbar inicial; las animaciones simples de menú usan clases CSS existentes.
- Normalizar `fetchpriority` en imágenes hero para conservar prioridad de imagen sin avisos React.
- No afirmar que toda la tanda de URLs estratégicas quedó enviada a indexación si Search Console no devolvió confirmación verificable.
- Tratar la indexación manual como refuerzo puntual: el sitemap limpio y el enlazado interno siguen siendo la vía principal.

## Hipótesis

- El grupo móvil de LCP malo de Search Console debería mejorar tras publicar este bloque y esperar datos de CrUX/Search Console.
- La mayor mejora inicial viene de reducir competencia de JS y terceros alrededor del hero, no de cambiar contenido.
- Las URLs de biblioteca alemana/portuguesa pueden tardar más en entrar en índice aunque respondan 200 y estén en sitemap.

## Tareas pendientes

- Commit y push del bloque Core Web Vitals.
- Publicar desde Lovable para que los cambios lleguen a producción.
- Revalidar producción tras publish:
  - `dist` publicado debe conservar preloads iniciales ligeros.
  - Home debe renderizar hero y navegación sin errores.
  - Menú móvil y dropdown desktop deben seguir funcionando.
  - Widget de chat debe aparecer tras carga diferida.
- Reintentar más tarde en Search Console la solicitud de indexación de `https://winerim.wine/de/weinbibliothek`.
- No validar mejora LCP en Search Console hasta que el bloque esté publicado y haya nuevos datos de campo.

## Actualización 2026-05-25: publish previo validado y segundo bloque Core Web Vitals

## Hechos

- Se releyeron los documentos fuente de verdad antes de continuar.
- El usuario confirmó que el bloque anterior ya estaba publicado.
- Producción refleja el commit `553d17c fix: improve home core web vitals`:
  - `https://winerim.wine/` responde 200.
  - Deployment activo: `20fa0919-eb4c-4738-a25d-5bf87c5c1cff`.
  - Entry activo: `/assets/index-D4-5gxc6.js`.
  - Modulepreloads iniciales: `vendor-react`, `vendor-query` y `vendor-router`.
  - No hay preloads iniciales de `vendor-motion`, `vendor-charts`, `vendor-radix` ni `vendor-supabase`.
  - `https://winerim.wine/sitemap.xml` responde 200 con 2.072 URLs y `X-Worker-Branch: sitemap`.
- QA de producción del bloque `553d17c`:
  - Home renderiza 1 H1: `Vende más vino. Mejora márgenes. Controla tu bodega.`
  - Dropdown desktop `Producto` funciona.
  - No se detectaron errores de consola en la prueba de navegador.
- Lighthouse mobile sobre producción publicada seguía sin mejorar de forma material:
  - Performance 60.
  - FCP 5,65 s.
  - LCP 10,97 s.
  - TBT 82 ms.
  - CLS 0,002.
  - DOM 1.371 elementos.
- Se detectó la causa principal de que el primer bloque no bastara:
  - El entry publicado seguía importando estáticamente `vendor-motion` y `vendor-charts`.
  - La causa local era el particionado manual: `react/jsx-runtime` quedaba dentro de `vendor-motion` y utilidades UI (`clsx`, `tailwind-merge`, `class-variance-authority`) podían quedar dentro de chunks pesados como `vendor-charts`.
  - `App.tsx` también envolvía toda la app en un `TooltipProvider` lazy, capaz de suspender el render inicial de la home.
- Se implementó y pusheó el segundo bloque Core Web Vitals:
  - Commit `7cccf3d fix: remove heavy vendors from home startup`.
  - `vite.config.ts` mueve `react/jsx-runtime` y `react/jsx-dev-runtime` a `vendor-react`.
  - `vite.config.ts` crea `vendor-ui-utils` para utilidades UI pequeñas.
  - `src/App.tsx` elimina el `TooltipProvider` lazy global.
  - `src/App.tsx` retrasa toasts, cookie consent, back-to-top, intent tracker y popups hasta después de `load`/idle.
- Verificación local del segundo bloque:
  - `npm run build`: correcto.
  - `npm run test`: 5 archivos, 15 tests.
  - `git diff --check`: correcto.
  - QA navegador en preview local: H1 correcto, dropdown `Producto` correcto y sin errores de consola.
  - Bundle local: entry `/assets/index-DZSHSGuS.js`, sin imports estáticos de `vendor-motion`, `vendor-charts`, `vendor-radix` ni `vendor-supabase`.
  - Preloads locales: `vendor-react`, `vendor-query`, `vendor-router`, `vendor-ui-utils`.
  - Lighthouse mobile local en preview: Performance 96, FCP 1,96 s, LCP 2,26 s, TBT 119,5 ms, CLS 0,005.
- Producción todavía no refleja el cambio de código `7cccf3d`:
  - Sigue sirviendo `/assets/index-D4-5gxc6.js`.
  - Sigue en deployment `20fa0919-eb4c-4738-a25d-5bf87c5c1cff`.
- Desplegar la rama `main` desde Lovable incluye el cambio de código `7cccf3d`, aunque puede haber commits posteriores solo de documentación.

## Decisiones

- Dar por publicado y validado el primer bloque `553d17c`, pero no dar por resuelto Core Web Vitals porque Lighthouse de producción sigue con LCP cercano a 11 s.
- Tratar `7cccf3d` como el bloque real de corrección del arranque pesado de home.
- Mantener `framer-motion`, Recharts, Radix y Supabase fuera del arranque inicial de la home.
- Retrasar chrome no crítico de aplicación hasta después de `load`/idle para proteger FCP/LCP.

## Hipótesis

- Al publicar `7cccf3d` desde Lovable, Lighthouse mobile de home debería acercarse mucho más al resultado local, aunque producción seguirá condicionada por red, Cloudflare, terceros y caché.
- Search Console/Core Web Vitals tardará días o semanas en reflejar datos de campo aunque Lighthouse mejore inmediatamente.
- El siguiente cuello de botella, tras publicar `7cccf3d`, probablemente serán scripts de terceros y CSS render-blocking, no los chunks `motion/charts`.

## Tareas pendientes

- Publicar `main` desde Lovable; el cambio de código relevante es `7cccf3d`.
- Revalidar producción tras publish:
  - Entry debe cambiar desde `/assets/index-D4-5gxc6.js`.
  - No debe haber imports estáticos de `vendor-motion`, `vendor-charts`, `vendor-radix` ni `vendor-supabase` en el entry.
  - Modulepreloads iniciales deben incluir solo vendors esenciales y `vendor-ui-utils`.
  - Dropdown desktop y menú móvil deben seguir funcionando.
  - Lighthouse mobile home debe repetirse en producción.
- Si Lighthouse producción mejora pero sigue insuficiente, abrir bloque específico para terceros: GTM, Google Ads, Meta Pixel y chat.

## Actualización 2026-05-25: revalidación producción tras publish de main

## Hechos

- El usuario confirmó que el deploy de `main` ya estaba hecho desde Lovable.
- Producción ya refleja el bloque de código `7cccf3d`:
  - Deployment activo: `19fcf663-9531-4993-a3a9-4ae480002433`.
  - Entry activo: `/assets/index-Fu3lyPiF.js`.
  - El entry anterior `/assets/index-D4-5gxc6.js` ya no está activo en home.
  - Modulepreloads iniciales: `vendor-react-Dq-5nJUb.js`, `vendor-query-Bp82qg4E.js`, `vendor-router-B4emm9GY.js` y `vendor-ui-utils--BulIq_u.js`.
  - No hay modulepreloads pesados de `vendor-motion`, `vendor-charts`, `vendor-radix`, `vendor-supabase` ni `vendor-markdown`.
  - El entry publicado no contiene imports estáticos de `vendor-motion`, `vendor-charts`, `vendor-radix` ni `vendor-supabase`.
  - El entry publicado mantiene referencias a `vendor-ui-utils`, como se esperaba.
- Sitemap de producción sigue correcto:
  - `https://winerim.wine/sitemap.xml` responde 200.
  - `X-Worker-Branch: sitemap`.
  - 2.072 URLs.
- QA de navegación en producción:
  - Home renderiza el H1 `Vende más vino. Mejora márgenes. Controla tu bodega.`
  - Dropdown desktop `Producto` funciona.
  - No se detectaron errores de consola en la prueba de navegador.
- Lighthouse mobile de producción tras publish:
  - Performance 60.
  - Accessibility 96.
  - Best Practices 75.
  - SEO 92.
  - FCP 5,14 s.
  - LCP 11,38 s.
  - Speed Index 5,91 s.
  - TBT 110,5 ms.
  - CLS 0,002.
  - DOM 1.371 elementos.
- El LCP de producción sigue siendo el H1 de la home.
- Desglose LCP:
  - TTFB 808 ms.
  - Load Delay 0 ms.
  - Load Time 0 ms.
  - Render Delay 10,57 s, 93% del LCP.
- La cadena crítica propia ya es corta:
  - HTML -> `/assets/index-B8X_G7Tz.css`.
  - HTML -> `/assets/index-Fu3lyPiF.js`.
  - Longest chain aprox. 791 ms.
- El CSS `/assets/index-B8X_G7Tz.css` sigue marcado como render-blocking con ahorro estimado de 170 ms.
- Un Lighthouse alternativo bloqueando terceros no mejoró el LCP:
  - Performance 58.
  - FCP 6,72 s.
  - LCP 12,33 s.
  - TBT 26,5 ms.
  - Render Delay 11,50 s.
- Por tanto, los terceros contribuyen a JS no usado/TBT, pero no explican por sí solos el LCP de 11 s tras este deploy.
- Terceros detectados en navegación/Lighthouse: GTM, Google Ads, Meta Pixel, Clarity, Leadfeeder y chat.

## Decisiones

- Dar por correctamente publicado el bloque de bundle `7cccf3d`: el problema de imports estáticos pesados está resuelto en producción.
- No dar por resuelto Core Web Vitals: Lighthouse mobile de producción sigue con LCP alto.
- No volver a atacar `vendor-motion`/`vendor-charts` como causa principal del LCP de home, porque ya no están en el arranque estático.
- El siguiente bloque debe aislar el render delay del H1, especialmente CSS crítico, carga de fuentes, animación/gradient del hero y comportamiento bajo throttling móvil.
- Mantener el bloque de terceros como P1, pero no asumir que por sí solo arreglará el LCP porque la prueba bloqueándolos no mejoró.

## Hipótesis

- El resultado local de Lighthouse 96 vs producción 60 indica que queda una diferencia de entorno/red/throttling y render del primer viewport, no un problema de chunk pesado propio.
- El H1 puede estar recalculando LCP tarde por combinación de fuente externa, `font-heading`, texto con gradient/clip y animación `animate-fade-in-up`.
- Reducir o eliminar animación del H1, precargar/self-hostear fuentes críticas o usar una fuente del sistema para el hero podría mejorar el render delay.
- CSS crítico inline o reducción del CSS render-blocking puede aportar, aunque el ahorro estimado actual es menor que el render delay total.

## Tareas pendientes

- Abrir bloque específico `Core Web Vitals home: render delay H1`.
- Probar en local y preview variantes controladas:
  - H1 sin `animate-fade-in-up`.
  - H1 sin `text-gradient-wine` o con color sólido en primer paint.
  - Hero con fuente del sistema o fuente crítica self-host/preload real de WOFF2.
  - CSS crítico mínimo para above-the-fold.
- Repetir Lighthouse production-like tras cada variante.
- Mantener como bloque posterior:
  - Defer de GTM/Ads/Meta/Clarity/Leadfeeder.
  - Revisión del chat.
  - Cache/headers de assets.

## Actualización 2026-05-25: variante H1 sin animación

## Hechos

- Se continuó la sesión leyendo primero `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- No se detectaron contradicciones nuevas entre los documentos y el estado del repo.
- Se abrió el bloque específico `Core Web Vitals home: render delay H1`.
- Se aplicó la primera variante controlada en `src/components/landing/HeroSection.tsx`:
  - El H1 de la home ya no usa `animate-fade-in-up`.
  - No se tocaron todavía `text-gradient-wine`, `font-heading`, carga de fuentes ni CSS crítico.
- Verificación local:
  - `npm run build`: correcto.
  - `npm run test`: 5 archivos, 15 tests correctos.
  - `git diff --check`: correcto.
  - Preview local `http://127.0.0.1:4177/`: H1 visible con el texto `Vende más vino. Mejora márgenes. Controla tu bodega.`
  - QA navegador: el H1 tiene `animationName: none` y `opacity: 1`.
  - Lighthouse mobile local en preview: Performance 96, FCP 2,0 s, LCP 2,3 s, TBT 110 ms, CLS 0,007.
- Se creó y pusheó a `origin/main` el commit `b86d06d fix: remove hero h1 entrance animation`.
- Tras el push se intentó abrir Lovable desde el navegador de Codex, pero redirige a `https://lovable.dev/login?redirect=%2Fprojects%2F2c4eed0e-6760-45f0-aeb3-ce44de8e91f1`; no se pudo publicar desde esta sesión.
- Avisos no bloqueantes durante build:
  - Browserslist/caniuse-lite desactualizado.
  - Chunks grandes por encima de 200 kB.

## Decisiones

- Probar el render delay del H1 con cambios de una sola variable para que la medición sea atribuible.
- Mantener por ahora el gradiente del primer fragmento del H1 y la fuente `Playfair Display`, porque la primera prueba documentada era retirar la animación.
- No considerar resuelto Core Web Vitals hasta publicar esta variante y revalidar Lighthouse mobile en producción.

## Hipótesis

- Si el H1 se contabilizaba tarde por la animación CSS, esta variante debería reducir el render delay de producción.
- Si producción sigue con LCP alto tras publicar, la siguiente causa probable será el gradiente de texto, la fuente externa crítica o CSS render-blocking.

## Tareas pendientes

- Publicar `main` desde Lovable; el cambio pendiente es `b86d06d`.
- Revalidar producción tras publish:
  - Confirmar que el H1 publicado ya no tiene `animate-fade-in-up`.
  - Repetir Lighthouse mobile home.
  - Revisar desglose LCP y confirmar si baja el `render delay`.
- Si no mejora lo suficiente, probar la siguiente variante: H1 con color sólido inicial en vez de `text-gradient-wine`.

## Actualización 2026-05-25: producción H1 sin animación y variante color sólido

## Hechos

- El usuario confirmó que el cambio H1 sin animación ya estaba publicado desde Lovable.
- Producción refleja el deploy nuevo:
  - Deployment activo: `05d29c6a-1f11-4a80-8af5-c913bfa8d990`.
  - Entry activo: `/assets/index-B3ya-SL1.js`.
  - Modulepreloads iniciales: `vendor-react`, `vendor-query`, `vendor-router` y `vendor-ui-utils`.
  - El entry publicado no contiene imports estáticos de `vendor-motion`, `vendor-charts`, `vendor-radix`, `vendor-supabase` ni `vendor-markdown`.
  - El entry publicado contiene el H1 sin `animate-fade-in-up`.
- QA navegador en producción:
  - H1: `Vende más vino. Mejora márgenes. Controla tu bodega.`
  - Clase H1: `font-heading text-4xl md:text-5xl lg:text-[3.4rem] xl:text-6xl font-bold leading-[1.1] mb-5`.
  - `animationName: none`.
  - `opacity: 1`.
  - `fontFamily: "Playfair Display", serif`.
- Lighthouse mobile producción tras quitar animación:
  - Performance 58.
  - Accessibility 96.
  - Best Practices 75.
  - SEO 92.
  - FCP 6,2 s.
  - LCP 11,1 s.
  - Speed Index 7,1 s.
  - TBT 100 ms.
  - CLS 0,007.
  - LCP element sigue siendo el H1.
  - Desglose LCP: TTFB 785 ms, Load Delay 0 ms, Load Time 0 ms, Render Delay 10.300 ms, 93%.
- Conclusión factual: quitar `animate-fade-in-up` del H1 no resuelve el LCP alto de producción.
- Se aplicó localmente la siguiente variante controlada:
  - En `src/components/landing/HeroSection.tsx`, el primer fragmento del H1 pasa de `text-gradient-wine` a `text-wine-light`.
  - No se tocaron fuente, tamaños, estructura, copy ni CSS crítico.
- Verificación local de la variante color sólido:
  - `npm run build`: correcto.
  - `npm run test`: 5 archivos, 15 tests correctos.
  - `git diff --check`: correcto.
  - QA navegador local: primer tramo del H1 con `text-wine-light`, `backgroundImage: none`, color `rgb(207, 23, 35)`, H1 sin animación y opacidad 1.
  - Lighthouse mobile local: Performance 96, FCP 2,0 s, LCP 2,3 s, TBT 100 ms, CLS 0,007.
- Avisos no bloqueantes durante build:
  - Browserslist/caniuse-lite desactualizado.
  - Chunks grandes por encima de 200 kB.

## Decisiones

- Descartar la animación del H1 como causa suficiente del LCP alto.
- Mantener el H1 sin animación porque evita una espera innecesaria y no rompe la experiencia.
- Probar ahora color sólido en el primer tramo del H1 para aislar si `background-clip/text-gradient` retrasa el LCP.
- No tocar todavía fuente crítica ni CSS inline hasta publicar y medir esta variante.

## Hipótesis

- Si el gradiente de texto estaba retrasando el paint final del H1, la variante `text-wine-light` debería reducir el render delay en producción.
- Si producción sigue con LCP alto, el foco pasa a fuente crítica externa (`Playfair Display`), CSS render-blocking y posible orden de hidratación/primer paint.

## Tareas pendientes

- Commit y push de la variante color sólido.
- Publicar `main` desde Lovable.
- Revalidar producción tras publish:
  - Confirmar entry nuevo distinto de `/assets/index-B3ya-SL1.js`.
  - Confirmar H1 con `text-wine-light`, sin `text-gradient-wine`.
  - Repetir Lighthouse mobile home.
  - Comparar contra LCP 11,1 s y render delay 10,3 s de la variante sin animación.
- Si no mejora, probar fuente crítica self-host/preload o fuente del sistema solo para el hero.

## Actualización 2026-05-25: producción color sólido y variante fuente móvil

## Hechos

- El usuario confirmó que el cambio de H1 con color sólido ya estaba publicado desde Lovable.
- Producción refleja el deploy nuevo:
  - Deployment activo: `9d5642ab-6d1f-4806-b6c3-26c1b330db23`.
  - Entry activo: `/assets/index-QyK9ToNR.js`.
  - Modulepreloads iniciales: `vendor-react`, `vendor-query`, `vendor-router` y `vendor-ui-utils`.
  - El entry publicado no contiene imports estáticos de `vendor-motion`, `vendor-charts`, `vendor-radix`, `vendor-supabase` ni `vendor-markdown`.
  - El entry contiene `text-wine-light` para el H1 y no conserva el snippet del H1 con `text-gradient-wine`.
- QA navegador en producción:
  - H1: `Vende más vino. Mejora márgenes. Controla tu bodega.`
  - H1 sin animación: `animationName: none`, `opacity: 1`.
  - Primer tramo del H1: `text-wine-light`, `backgroundImage: none`, color `rgb(207, 23, 35)`.
  - Fuente del H1 todavía era `"Playfair Display", serif`.
- Lighthouse mobile producción tras color sólido:
  - Performance 63.
  - Accessibility 96.
  - Best Practices 75.
  - SEO 92.
  - FCP 5,1 s.
  - LCP 7,0 s.
  - Speed Index 5,1 s.
  - TBT 70 ms.
  - CLS 0,007.
  - LCP element sigue siendo el H1.
  - Desglose LCP: TTFB 801 ms, Load Delay 0 ms, Load Time 0 ms, Render Delay 6.187 ms, 89%.
- Conclusión factual: quitar `text-gradient-wine` mejora producción de forma material, pero LCP sigue por encima del objetivo.
- Se aplicó localmente la siguiente variante controlada:
  - El H1 pasa de `font-heading` a `font-serif lg:font-heading`.
  - En móvil/tablet usa fuente serif del sistema.
  - En escritorio `lg` conserva `Playfair Display` para no degradar la primera impresión desktop.
  - Se mantienen H1 sin animación y primer tramo con `text-wine-light`.
- Verificación local de la variante fuente móvil:
  - `npm run build`: correcto.
  - `npm run test`: 5 archivos, 15 tests correctos.
  - `git diff --check`: correcto.
  - QA navegador local desktop 1280 px: H1 conserva `"Playfair Display", serif`.
  - Lighthouse mobile local: Performance 96, FCP 1,9 s, LCP 2,2 s, TBT 120 ms, CLS 0,006.
- Avisos no bloqueantes durante build:
  - Browserslist/caniuse-lite desactualizado.
  - Chunks grandes por encima de 200 kB.

## Decisiones

- Mantener la eliminación del gradiente del H1 porque redujo LCP de producción de 11,1 s a 7,0 s.
- Probar fuente del sistema solo bajo `lg` para atacar Core Web Vitals móvil sin sacrificar la identidad visual desktop.
- No tocar todavía CSS crítico ni terceros hasta medir esta variante publicada.

## Hipótesis

- Si Playfair Display es parte del render delay móvil, `font-serif lg:font-heading` debería reducir el LCP de producción por debajo de la variante de color sólido.
- Si LCP sigue alto, el siguiente foco será CSS crítico above-the-fold y orden de carga del CSS/JS inicial, más que estética del H1.

## Tareas pendientes

- Commit y push de la variante fuente móvil.
- Publicar `main` desde Lovable.
- Revalidar producción tras publish:
  - Confirmar entry nuevo distinto de `/assets/index-QyK9ToNR.js`.
  - Confirmar H1 con `font-serif lg:font-heading`.
  - En viewport móvil, confirmar fuente del sistema para el H1.
  - Repetir Lighthouse mobile home.
  - Comparar contra LCP 7,0 s y render delay 6,19 s de la variante color sólido.
- Si no mejora lo suficiente, pasar a CSS crítico/inline above-the-fold y revisión de carga del CSS.

## Actualización 2026-05-25: fuente móvil publicada y saneamiento de arranque/biblioteca humana

## Hechos

- La variante `font-serif lg:font-heading` del H1 quedó commiteada previamente en `main` con `1a3a1c3 fix: use system serif for mobile hero h1`.
- Producción refleja esa variante:
  - Deployment activo observado: `25c70cc4-cb78-4036-b43a-73bd41ee085a`.
  - Entry activo: `/assets/index-howILT12.js`.
  - En navegador desktop, el H1 mantiene `font-serif lg:font-heading`, sin animación y con opacidad 1.
  - El entry publicado contiene `font-serif lg:font-heading` y `text-wine-light`.
- Producción todavía conserva `vendor-query` en modulepreload inicial y en el entry publicado.
- Lighthouse mobile de producción para esta variante sigue siendo variable:
  - Run favorable: Performance 85, FCP 2,6 s, LCP 3,5 s, TBT 100 ms, CLS 0,006.
  - Run posterior: Performance 63, FCP 4,8 s, LCP 7,9 s, TBT 30 ms, CLS 0.
- Conclusión factual: la variante de fuente móvil puede mejorar el mejor caso, pero no permite declarar resuelto el LCP móvil de forma estable.
- Se detectó que `LanguageSwitcher` arrastraba helpers desde `wineLibraryI18n`, dejando código de biblioteca del vino en el arranque global.
- Se creó `src/data/wineLibraryRoutes.ts` con helpers ligeros de rutas, idiomas, canonical y hreflang de biblioteca.
- `src/components/LanguageSwitcher.tsx` usa ahora `wineLibraryRoutes` en vez de importar la capa editorial completa.
- `src/data/wineLibraryI18n.ts` reexporta los helpers de rutas desde el nuevo módulo para mantener compatibilidad.
- Se eliminó React Query del arranque de `App`:
  - `src/App.tsx` ya no envuelve toda la app en `QueryClientProvider`.
  - `src/hooks/usePageContent.ts` usa caché manual con TTL de 5 minutos y deduplicación de peticiones.
- Build local tras el saneamiento:
  - Entry local: `/assets/index-BpRdM0S8.js`.
  - Modulepreloads iniciales: `vendor-react`, `vendor-router` y `vendor-ui-utils`.
  - Ya no aparece `vendor-query` como preload inicial.
  - El entry local no contiene `QueryClient` ni imports estáticos de `vendor-motion`, `vendor-charts`, `vendor-radix` o `vendor-supabase`.
- Se detectó un bug importante en experiencia humana de biblioteca:
  - En producción, `/de/weinbibliothek/rebsorten/tempranillo` carga sin H1 ni bloque `Service-Intelligenz` para usuario humano.
  - El origen probable era la retirada previa del `TooltipProvider` global sin proveedor local en `GrapeDetail`.
- Se corrigió `src/pages/GrapeDetail.tsx` añadiendo `TooltipProvider` local solo alrededor de fichas completas.
- Se añadió test de regresión `src/test/grape-detail-render.test.tsx` para asegurar que `/de/weinbibliothek/rebsorten/tempranillo` renderiza H1 `Tempranillo` y el bloque `Service-Intelligenz`.
- `src/test/setup.ts` añade mock de `IntersectionObserver` para jsdom.
- El bloque quedó commiteado y pusheado a `origin/main` con `f26443a fix: slim startup and restore grape detail render`.
- Verificaciones locales completadas:
  - `npm run test`: 6 archivos, 16 tests correctos.
  - `npm run build`: correcto.
  - `git diff --check`: correcto.
  - QA navegador local home: H1 visible, sin animación, con `font-serif lg:font-heading`.
  - QA navegador local `/de/weinbibliothek/rebsorten/tempranillo`: H1 `Tempranillo`, bloque `Service-Intelligenz`, root no vacío y sin errores de consola.
  - Lighthouse mobile local home: Performance 98, FCP 1,7 s, LCP 2,1 s, TBT 60 ms, CLS 0,006.

## Decisiones

- Mantener por ahora H1 sin animación, con color sólido y `font-serif lg:font-heading`, pero no marcar Core Web Vitals como cerrado.
- No restaurar un `TooltipProvider` global: los componentes que lo necesiten deben proveerlo localmente para no cargar Radix en el arranque de home.
- Mantener los datos editoriales de biblioteca del vino fuera del chrome global y del selector de idioma.
- Sustituir React Query en `usePageContent` por caché manual, porque ese contenido se usa en superficies diferidas y no justifica un provider global en el primer render.

## Hipótesis

- Al publicar este bloque, el entry de home debería perder `vendor-query` y reducir presión de arranque.
- La corrección local de `TooltipProvider` debería arreglar las fichas humanas de uva que hoy quedan sin contenido principal en producción.
- Search Console/Core Web Vitals tardará en reflejar cambios aunque Lighthouse mejore inmediatamente.
- Si Lighthouse de producción sigue inestable tras publicar este bloque, el siguiente cuello estará probablemente en CSS crítico/render-blocking y orden de primer render.

## Tareas pendientes

- Publicar `main` desde Lovable; el commit de código relevante es `f26443a`.
- Revalidar producción tras publish:
  - Entry nuevo distinto de `/assets/index-howILT12.js`.
  - Modulepreloads iniciales sin `vendor-query`.
  - Home sin imports estáticos de vendors pesados.
  - `/de/weinbibliothek/rebsorten/tempranillo` como usuario humano con H1 `Tempranillo` y bloque `Service-Intelligenz`.
  - Lighthouse mobile home con al menos dos runs para medir estabilidad.
- Si producción mejora pero sigue fuera de objetivo, abrir bloque CSS crítico/above-the-fold.

## Actualización 2026-05-25: producción validada tras publish de arranque ligero

## Hechos

- El usuario confirmó la publicación desde Lovable.
- Producción ya refleja el bloque `f26443a`:
  - Deployment activo observado: `baa85387-7e8f-4f71-a058-0633f8767465`.
  - Entry activo: `/assets/index-BRCyx101.js`.
  - Entry anterior `/assets/index-howILT12.js` ya no está activo en home.
  - Modulepreloads iniciales: `vendor-react`, `vendor-router` y `vendor-ui-utils`.
  - `vendor-query` ya no aparece en modulepreload inicial ni en el entry publicado.
  - El entry publicado no contiene referencias estáticas a `vendor-motion`, `vendor-charts`, `vendor-radix` ni `vendor-supabase`.
  - El entry conserva `font-serif lg:font-heading` y `text-wine-light`.
- QA de home en producción:
  - H1 visible: `Vende más vino. Mejora márgenes. Controla tu bodega.`
  - H1 sin animación: `animationName: none`, `opacity: 1`.
  - Primer tramo sin gradiente: `backgroundImage: none`.
  - En viewport móvil 390 px, el H1 usa fuente del sistema: `ui-serif, Georgia, Cambria, "Times New Roman", Times, serif`.
  - En desktop conserva Playfair por `lg:font-heading`.
- QA de biblioteca humana en producción:
  - `/de/weinbibliothek/rebsorten/tempranillo` renderiza H1 `Tempranillo`.
  - La página muestra bloque `Service-Intelligenz`.
  - Título observado: `Tempranillo | Rebsortenführer — Winerim | Winerim`.
  - No se detectaron errores de consola en la prueba.
- Matiz de QA: la ficha de uva requiere esperar a que cargue el chunk lazy; tras `load` inmediato puede no estar lista, pero tras unos segundos renderiza correctamente.
- Lighthouse mobile de producción tras el publish:
  - Run 1: Performance 85, FCP 2,4 s, LCP 3,4 s, Speed Index 5,1 s, TBT 60 ms, CLS 0,006.
  - Run 2: Performance 68, FCP 3,1 s, LCP 7,9 s, Speed Index 4,3 s, TBT 60 ms, CLS 0,006.
- Conclusión factual: el arranque ligero está publicado y mejora claramente el mejor caso de Lighthouse, pero el LCP móvil sigue inestable y no se puede cerrar Core Web Vitals todavía.

## Decisiones

- Considerar cerrado el bloqueo de publish del bloque `f26443a`.
- Considerar arreglado el bug humano de ficha alemana de Tempranillo en producción.
- Mantener `vendor-query` fuera del arranque inicial.
- No declarar Core Web Vitals resuelto por la variabilidad de Lighthouse; el siguiente bloque será CSS crítico/above-the-fold si seguimos rendimiento.

## Hipótesis

- La variabilidad restante parece menos ligada a JS propio inicial y más a CSS/render-blocking, orden de primer paint o condiciones externas de Lighthouse.
- Search Console tardará días o semanas en reflejar la mejora de campo aunque el bundle ya esté saneado.
- La ficha humana de uva puede beneficiarse de prefetch o skeleton específico si se quiere reducir la espera del chunk lazy, pero ya no está rota.

## Tareas pendientes

- Si seguimos Core Web Vitals:
  - Abrir bloque CSS crítico/above-the-fold.
  - Revisar render-blocking CSS y fuentes críticas.
  - Medir Lighthouse con varias muestras tras cada cambio.
- Si aparcamos rendimiento:
  - Retomar ampliación máxima de biblioteca del vino.
  - Priorizar 30-50 entidades por demanda SEO y valor comercial.
  - Añadir schema por entidad y enlazado interno por intención.

## Actualización 2026-05-25: CSS crítico above-the-fold local

## Hechos

- Se abrió el bloque `CSS crítico/above-the-fold` tras validar que producción seguía con LCP móvil variable.
- Se añadió `critical-above-fold-css` en `index.html` con estilos mínimos para:
  - variables de color base;
  - body;
  - navbar;
  - hero;
  - tipografías críticas;
  - botones y utilidades above-the-fold usadas por home.
- Se añadió en `vite.config.ts` el plugin `winerim-non-blocking-build-css`.
- En build de producción, el CSS generado por Vite pasa de stylesheet bloqueante a:
  - `rel="preload" as="style"`;
  - stylesheet `media="print"` con `onload`;
  - fallback `noscript`.
- Build local posterior:
  - `dist/index.html`: 21,07 KB, gzip 6,35 KB.
  - El HTML contiene `critical-above-fold-css`.
  - El CSS de build aparece como preload + stylesheet no bloqueante + fallback `noscript`.
  - Modulepreloads iniciales se mantienen en `vendor-react`, `vendor-router` y `vendor-ui-utils`.
- Lighthouse mobile local en preview:
  - Run 1: Performance 98, FCP 1,7 s, LCP 2,0 s, TBT 90 ms, CLS 0,006.
  - Run 2: Performance 97, FCP 1,7 s, LCP 2,1 s, TBT 110 ms, CLS 0,006.
  - `render-blocking resources`: 0.
- QA local con Chrome:
  - Home móvil: H1 visible, fuente serif del sistema, header fixed, fondo correcto y sin errores de consola.
  - Home desktop: H1 visible, Playfair en desktop, nav visible y tablet hero visible.
  - `/de/weinbibliothek/rebsorten/tempranillo`: H1 `Tempranillo`, bloque `Service-Intelligenz` y sin errores de consola.
- Verificaciones completadas:
  - `npm run build`: correcto.
  - `npm run test`: 6 archivos, 16 tests correctos.
  - `git diff --check`: correcto.
- Commit técnico creado: `6627bda fix: load build css non-blocking`.

## Decisiones

- Aceptar un aumento pequeño de HTML inicial para eliminar el stylesheet bloqueante del primer viewport.
- Mantener fallback `noscript` para que usuarios sin JS reciban el CSS completo.
- No tocar todavía GTM/terceros ni rediseñar hero; este bloque aísla la variable CSS render-blocking.

## Hipótesis

- Al publicar `6627bda`, Lighthouse de producción debería dejar de listar el CSS principal como recurso render-blocking.
- Si producción sigue con LCP variable, el siguiente foco será orden de ejecución/hidratación, terceros o caché/red, no el stylesheet principal.
- El CSS crítico inline debe vigilarse si cambia el hero o navbar, porque puede quedarse desalineado con clases futuras.

## Tareas pendientes

- Push de `6627bda` y documentación de cierre.
- Publicar `main` desde Lovable.
- Revalidar producción tras publish:
  - Entry/HTML nuevo con `critical-above-fold-css`.
  - CSS completo cargando como preload + stylesheet `media="print"`.
  - Lighthouse mobile con `render-blocking resources` en 0.
  - Home móvil/desktop sin FOUC visible ni errores.
  - Ficha alemana de Tempranillo sigue renderizando.

## Actualización 2026-05-25: producción validada tras CSS crítico

## Hechos

- El usuario confirmó que el publish de Lovable parecía estar hecho.
- Producción ya refleja el bloque CSS crítico:
  - Deployment activo observado: `0e7c5ea6-8b8a-4638-a5f7-01e2335d8106`.
  - Entry activo: `/assets/index-BRCyx101.js`.
  - El HTML contiene `critical-above-fold-css`.
  - El CSS principal `/assets/index-Dh6dOxG-.css` carga como `preload` + stylesheet `media="print"` con `onload`.
  - El HTML mantiene fallback `noscript` para el CSS completo.
  - No hay stylesheet principal bloqueante fuera del fallback `noscript`.
  - Modulepreloads iniciales: `vendor-react`, `vendor-router` y `vendor-ui-utils`.
  - `vendor-query` sigue fuera del preload inicial y del entry publicado.
- Lighthouse mobile producción tras el publish:
  - Run 1: Performance 73, FCP 2,4 s, LCP 6,6 s, Speed Index 3,0 s, TBT 90 ms, CLS 0,006.
  - Run 2: Performance 71, FCP 2,4 s, LCP 6,7 s, Speed Index 2,8 s, TBT 190 ms, CLS 0,006.
  - `render-blocking resources`: 0 en ambos runs.
- QA Chrome producción:
  - Home móvil: H1 correcto, fuente serif del sistema, header fixed, CTA con gradiente y fondo correcto.
  - Home desktop: H1 correcto, Playfair Display en desktop, nav visible y tablet hero visible.
  - `/de/weinbibliothek/rebsorten/tempranillo`: H1 `Tempranillo`, título localizado y bloque `Service-Intelligenz`.
  - No se detectaron errores de consola en la prueba.
- Conclusión factual: el bloqueo por CSS render-blocking queda eliminado en producción, pero el LCP móvil sigue por encima de objetivo.

## Decisiones

- Considerar publicado y validado el bloque CSS crítico.
- Considerar resuelto el punto específico `render-blocking resources`.
- No declarar cerrado Core Web Vitals porque LCP sigue alrededor de 6,6-6,7 s en las dos muestras de producción.
- El siguiente bloque de rendimiento, si se continúa, debe centrarse en orden de hidratación/primer render y terceros, no en CSS render-blocking principal.

## Hipótesis

- La mejora de FCP/Speed Index indica que el CSS crítico ayudó al primer render, aunque el LCP del H1 sigue contabilizándose tarde.
- La causa restante puede estar en hidratación, tareas de terceros, scripts iniciales de tracking, fuentes/estilos aplicados después o variabilidad de entorno Lighthouse.
- El CSS crítico inline debe mantenerse sincronizado con cambios futuros de hero/navbar.

## Tareas pendientes

- Si seguimos rendimiento:
  - Auditar orden de hidratación y scripts de terceros.
  - Probar diferir GTM/Ads/Meta/Clarity/Leadfeeder con consentimiento/idle.
  - Medir si el LCP del H1 mejora al reducir scripts antes de interacción.
- Si aparcamos rendimiento:
  - Retomar biblioteca del vino al máximo nivel sobre la base saneada.
  - Priorizar 30-50 entidades y enlazado interno.

## Actualización 2026-05-25: GTM diferido localmente

## Hechos

- Se auditó la carga de terceros en el arranque.
- En `index.html`, Consent Mode v2 ya se inicializaba antes de GTM y se mantiene en el `head`.
- GTM era el único tercero de tracking que se insertaba inmediatamente durante el parseo del `head`.
- El chat de Winerim ya estaba diferido tras `load` + `requestIdleCallback`.
- Se cambió el snippet de GTM para definir `window.__winerimLoadGtm` y cargar `https://www.googletagmanager.com/gtm.js?id=GTM-NDNQP955` solo después de `load` y en idle, con fallback `setTimeout`.
- Se mantiene el iframe `noscript` de GTM.
- Commit técnico creado: `e164294 fix: defer gtm until after load`.
- Push completado a `origin/main`; el commit técnico del cambio es `e164294 fix: defer gtm until after load`.
- Comprobación de producción tras el push:
  - Deployment observado: `94aea691-4fe9-4a08-84c0-135f46fa300f`.
  - Entry activo: `/assets/index-BRCyx101.js`.
  - Producción todavía no contiene `__winerimLoadGtm`.
  - Producción todavía contiene el snippet inmediato antiguo de GTM.
  - Conclusión factual: falta publish desde Lovable para llevar `origin/main` a producción.
- Verificaciones locales:
  - `npm run build`: correcto.
  - `npm run test`: 6 archivos, 16 tests correctos.
  - `git diff --check`: correcto.
  - `dist/index.html` contiene `__winerimLoadGtm`, `requestIdleCallback`, `GTM-NDNQP955`, Consent Mode y fallback `noscript`.
  - El CSS principal sigue cargando como preload + stylesheet no bloqueante + fallback `noscript`.
  - Lighthouse mobile local:
    - Run 1: Performance 98, FCP 1,8 s, LCP 2,1 s, TBT 90 ms, CLS 0,006.
    - Run 2: Performance 97, FCP 1,7 s, LCP 2,1 s, TBT 110 ms, CLS 0,006.
  - QA navegador local:
    - Home renderiza H1 `Vende más vino. Mejora márgenes. Controla tu bodega.`
    - `/de/weinbibliothek/rebsorten/tempranillo` renderiza H1 `Tempranillo`, canonical y JSON-LD.
    - No se detectaron errores de consola.

## Decisiones

- Mantener Consent Mode temprano para conservar el contrato de consentimiento antes de cualquier tag.
- Diferir el contenedor GTM para reducir competencia de red/main thread antes del primer render relevante.
- Aceptar que las etiquetas gestionadas dentro de GTM pueden dispararse unos segundos más tarde.
- No tocar todavía configuración interna de GTM, Google Ads, Meta, Clarity o Leadfeeder porque viven dentro del contenedor.
- No tocar Cloudflare Worker en este bloque.

## Hipótesis

- Si GTM o tags internos estaban compitiendo con el primer render, producción debería mostrar menos variabilidad de LCP tras publicar `e164294`.
- Si producción sigue con LCP alto, el siguiente sospechoso será hidratación/orden de render del H1 o coste del bundle inicial, no CSS render-blocking ni GTM inmediato.
- Search Console y Core Web Vitals de campo no reflejarán este cambio en tiempo real aunque Lighthouse sintético mejore.

## Tareas pendientes

- Hecho: pushear `e164294` y documentación de cierre a `origin/main`.
- Pendiente: publicar `main` desde Lovable.
- Revalidar producción tras publish:
  - HTML contiene `__winerimLoadGtm`.
  - GTM no aparece como snippet inmediato antiguo.
  - Consent Mode sigue antes de GTM.
  - Home móvil/desktop correcta.
  - `/de/weinbibliothek/rebsorten/tempranillo` correcta.
  - Lighthouse mobile home con 2-3 muestras.
- Si LCP mejora y queda estable, retomar biblioteca del vino al máximo nivel.
- Si LCP sigue alto, auditar hidratación/render del H1 y coste del entry inicial.

## Actualización 2026-05-25: Lovable disponible, publish pendiente de confirmación

## Hechos

- Relectura de documentos operativos completada al iniciar la retoma.
- `git status`: `main...origin/main`, árbol limpio.
- Producción revisada de nuevo:
  - Deployment activo: `94aea691-4fe9-4a08-84c0-135f46fa300f`.
  - Entry activo: `/assets/index-BRCyx101.js`.
  - Todavía no contiene `__winerimLoadGtm`.
  - Todavía contiene el snippet inmediato antiguo de GTM.
- El navegador integrado de Codex no está disponible (`iab`).
- Chrome sí tiene sesión Lovable activa para `https://lovable.dev/projects/2c4eed0e-6760-45f0-aeb3-ce44de8e91f1`.
- En Lovable el botón `Publish` está visible.
- Tras recargar Lovable, el DOM no muestra `e164294` ni texto relacionado con GTM diferido.
- Brecha detectada: GitHub `main` contiene el cambio, pero la UI de Lovable no evidencia explícitamente que el commit esté incorporado antes de pulsar `Publish`.

## Decisiones

- No pulsar `Publish` sin confirmación explícita porque cambia la web pública.
- Tratar la ausencia de `e164294` en la UI Lovable como una incertidumbre, no como prueba definitiva de que Lovable no haya sincronizado.

## Hipótesis

- Lovable puede tener la UI de historial incompleta o no mostrar commits recientes aunque el publish use el estado sincronizado.
- Si se pulsa `Publish` y producción sigue sin `__winerimLoadGtm`, habrá que forzar sincronización desde Lovable o publicar por otra vía.

## Tareas pendientes

- Confirmar si se debe pulsar `Publish` en Lovable ahora.
- Tras publicar:
  - Revalidar HTML de producción.
  - Si aparece `__winerimLoadGtm`, ejecutar QA y Lighthouse.
  - Si no aparece, investigar sincronización GitHub -> Lovable.

## Actualización 2026-05-25: GTM diferido publicado y validado en producción

## Hechos

- El usuario confirmó publicar desde Lovable.
- Se pulsó `Publish` y después `Update` en el panel `Published` de Lovable.
- Lovable terminó en estado `Up to date`.
- Lovable sigue mostrando aviso de balance Cloud & AI pausado, pero no bloqueó la actualización del frontend.
- Producción refleja el cambio:
  - Deployment activo: `11e48c49-19d5-4d37-884c-d58b7de5387a`.
  - Entry activo: `/assets/index-BRCyx101.js`.
  - HTML contiene `__winerimLoadGtm`.
  - HTML contiene `requestIdleCallback`.
  - HTML mantiene Consent Mode antes de GTM.
  - HTML mantiene fallback `noscript` de GTM.
  - HTML ya no contiene el snippet inmediato antiguo `w[l].push({'gtm.start'...`.
  - HTML mantiene `critical-above-fold-css`.
  - CSS principal sigue como preload + stylesheet no bloqueante + fallback `noscript`.
- QA producción:
  - Home móvil: H1 `Vende más vino. Mejora márgenes. Controla tu bodega.`, canonical `/`, JSON-LD y sin errores de consola.
  - Home desktop: H1 correcto, canonical `/`, JSON-LD y sin errores de consola.
  - `/de/weinbibliothek/rebsorten/tempranillo`: `lang=de`, H1 `Tempranillo`, canonical alemán, JSON-LD y sin errores de consola.
  - GTM cargó en QA como recurso diferido y `window.__winerimGtmLoaded` quedó en `true`.
- Lighthouse mobile producción tras GTM diferido:
  - Run 1: Performance 89, FCP 2,6 s, LCP 2,7 s, Speed Index 4,6 s, TBT 110 ms, CLS 0,006.
  - Run 2: Performance 89, FCP 2,6 s, LCP 2,6 s, Speed Index 4,9 s, TBT 110 ms, CLS 0,006.
  - Run 3: Performance 93, FCP 2,4 s, LCP 2,5 s, Speed Index 2,5 s, TBT 160 ms, CLS 0,006.
  - `render-blocking resources`: 0 en las tres muestras.
- Resultado frente a medición anterior tras CSS crítico:
  - Antes: Performance 73/71, LCP 6,6/6,7 s.
  - Ahora: Performance 89/89/93, LCP 2,7/2,6/2,5 s.

## Decisiones

- Cerrar el bloque GTM diferido como publicado y validado.
- Considerar Core Web Vitals sintético de home en estado aceptable para retomar biblioteca del vino, sin declarar aún mejora de campo en Search Console.
- Mantener Consent Mode temprano y GTM diferido.
- No tocar Cloudflare Worker ni Supabase para este bloque.

## Hipótesis

- La variabilidad previa de LCP estaba muy probablemente influida por GTM/tags asociados o por competencia inicial que GTM provocaba.
- Search Console/Core Web Vitals de campo tardará días o semanas en reflejar el cambio.
- Queda deuda residual de JS no usado, pero ya no parece ser el bloqueo principal de LCP home.

## Tareas pendientes

- Monitorizar Search Console/Core Web Vitals de campo.
- Retomar biblioteca del vino al máximo nivel:
  - priorizar 30-50 entidades;
  - ampliar contenido profundo por idioma;
  - reforzar schema y enlaces internos por intención.
- Como mejora secundaria de rendimiento, auditar JS no usado si vuelve a ser prioritario.

## Actualización 2026-05-25: segunda tanda editorial de biblioteca del vino

## Hechos

- Se retomó la biblioteca del vino tras cerrar GTM diferido y Core Web Vitals sintético de home.
- Se amplió la capa editorial avanzada de uvas prioritarias de 10 a 20 perfiles.
- Nuevas uvas añadidas a `src/data/wineLibraryEditorial.ts`:
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
- Las nuevas fichas incluyen temperatura, copa, aireación, rol en carta, guion de sala, palanca comercial, error a evitar, maridajes y FAQs localizadas mediante la capa existente.
- Se añadió la misma segunda tanda a `supabase/functions/prerender/index.ts` para mantener paridad entre experiencia humana y HTML prerenderizado para bots.
- Se actualizó el contrato de pruebas:
  - `src/test/wine-library-editorial.test.ts` exige 20 perfiles prioritarios y cubre segunda tanda en `de` y `pt`.
  - `src/test/wine-library-seo-surface.test.ts` exige que el prerender contenga las nuevas uvas prioritarias.
- Verificaciones completadas:
  - `npm run test -- --run`: 6 archivos, 17 tests.
  - `npm run build`: correcto.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`: correcto.
  - `git diff --check`: correcto.
  - QA local en navegador: `/biblioteca-vino/uvas/syrah`, `/de/weinbibliothek/rebsorten/syrah`, `/pt/biblioteca-vinho/castas/xarello` y `/en/wine-library/grapes/chenin-blanc` muestran inteligencia de servicio, rol en carta y maridajes sin errores de consola.
- No se detectó fuga de texto español en las rutas `de` y `pt` probadas.
- Producción aún no refleja esta tanda hasta publicar desde Lovable.

## Decisiones

- Usar `xarello` como slug canónico porque es el slug real del catálogo; no crear `xarel-lo`.
- Añadir `monastrell` y `touriga-nacional` para reforzar intención ibérica/portuguesa, ya que `verdejo` y `godello` ya estaban en la primera tanda.
- Mantener la segunda tanda dentro del mismo patrón editorial de servicio para evitar crear una abstracción nueva innecesaria.
- Mantener paridad frontend/prerender como requisito de calidad SEO y LLM.

## Hipótesis

- Pasar de 10 a 20 uvas prioritarias aumenta la profundidad semántica de la biblioteca sin añadir URLs nuevas ni riesgo de indexación.
- Las nuevas uvas cubren demanda internacional e ibérica relevante para restaurantes: tintos globales, tintos italianos, blancos de valor y Portugal.
- El impacto SEO real dependerá de publicar desde Lovable y de que Google recrawlee las rutas.

## Tareas pendientes

- Hecho: commit y push de la segunda tanda editorial con `d03625a feat: expand priority wine grape profiles`.
- Hecho: frontend publicado desde Lovable.
- Hecho: Edge Function `prerender` desplegada explícitamente desde Lovable tras detectar que el publish del frontend no actualizaba bots.
- Hecho: producción revalidada en `/biblioteca-vino/uvas/syrah`, `/de/weinbibliothek/rebsorten/syrah`, `/pt/biblioteca-vinho/castas/xarello` y `/en/wine-library/grapes/chenin-blanc`.
- Siguiente ampliación: regiones, estilos, maridajes y schema/enlazado interno por intención.

## Actualización 2026-05-25: segunda tanda editorial publicada y validada

## Hechos

- Commit publicado en GitHub: `d03625a feat: expand priority wine grape profiles`.
- Lovable detectó el commit `feat: expand priority wine grape profiles`.
- Se pulsó `Publish` en Lovable.
- Producción pasó a deployment frontend `d80a4e7c-1f42-4cfe-8414-b247ae5ccd75`.
- Tras el publish frontend, Googlebot todavía recibía la versión genérica de Syrah/Xarello porque `prerender` no se había actualizado.
- Se pidió en Lovable el despliegue explícito de Supabase Edge Function `prerender`.
- Lovable confirmó el despliegue de `prerender`.
- Producción validada como Googlebot:
  - `/biblioteca-vino/uvas/syrah` contiene `Rol en carta`, contenido editorial de Syrah y `x-worker-branch: bot-prerender`.
  - `/de/weinbibliothek/rebsorten/syrah` contiene el perfil enriquecido de Syrah y `x-worker-branch: bot-prerender`.
  - `/pt/biblioteca-vinho/castas/xarello` contiene `Papel na carta`, `marisco` y `x-worker-branch: bot-prerender`.
  - `/en/wine-library/grapes/chenin-blanc` contiene perfil enriquecido de Chenin Blanc.
- Producción validada como usuario real en navegador:
  - `/biblioteca-vino/uvas/syrah` muestra H1 `Syrah`, inteligencia de servicio, rol en carta y maridajes.
  - `/de/weinbibliothek/rebsorten/syrah` muestra H1 `Syrah`, inteligencia de servicio, rol en carta y maridajes.
  - `/pt/biblioteca-vinho/castas/xarello` muestra H1 `Xarel·lo`, inteligencia de servicio, rol en carta y maridajes.
  - `/en/wine-library/grapes/chenin-blanc` muestra H1 `Chenin Blanc`, inteligencia de servicio, rol en carta y maridajes.
  - No se detectaron errores de consola en las rutas revalidadas.
- No hizo falta modificar ni redeployar Cloudflare Worker.

## Decisiones

- Considerar cerrada la segunda tanda editorial de uvas prioritarias solo tras validar frontend y prerender en producción.
- Mantener como procedimiento: cuando se toque `supabase/functions/prerender`, pedir despliegue explícito de esa Edge Function en Lovable aunque el frontend marque `Published/Up to date`.
- No publicar Worker Cloudflare para este bloque porque la ruta `bot-prerender` funcionó correctamente tras actualizar Edge Function.

## Hipótesis

- Las nuevas 10 uvas prioritarias ya son visibles para Googlebot y crawlers de IA, por lo que pueden empezar a consolidar señales tras recrawl.
- Search Console tardará en reflejar cualquier mejora de cobertura o contenido.
- El siguiente mayor incremento de autoridad temática vendrá de regiones, estilos y maridajes con enlaces internos cruzados.

## Tareas pendientes

- Continuar biblioteca del vino al máximo nivel:
  - ampliar regiones prioritarias;
  - ampliar estilos prioritarios;
  - ampliar maridajes prioritarios;
  - añadir alias visibles para grafías como `Xarel-lo`/`Xarel·lo`;
  - reforzar schema y enlaces internos por intención.
- Monitorizar Search Console para indexación de rutas nuevas/enriquecidas.

## Actualización 2026-05-25: grafo estratégico de biblioteca del vino

## Hechos

- Se inició el siguiente bloque de biblioteca del vino tras la segunda tanda editorial publicada.
- Se añadieron alias de resolución en `src/data/wineLibraryLinks.ts` para capturar variantes sin duplicar URLs:
  - `Xarel-lo`, `Xarel·lo` y `Xarello` -> `xarello`.
  - `Borgoña`/`Borgona` -> `bourgogne`.
  - `Burdeos` -> `bordeaux`.
  - `blanco con lías`, `espumoso método tradicional`, `rosado gastronómico`.
  - `pescado blanco`, `marisco`, `arroces`, `cocina asiática`.
- El resolver de enlaces de biblioteca ahora separa lookup por categoría (`grape`, `region`, `style`, `pairing`) para respetar hints y evitar colisiones como `Champagne` región vs `Champagne` estilo.
- Se creó un grafo estratégico de enlaces internos para conectar uvas, regiones, estilos y maridajes prioritarios.
- Las páginas React de detalle de uva, región, estilo y maridaje ahora anteponen enlaces estratégicos al bloque `RelatedWineLibraryLinks`.
- `supabase/functions/prerender/index.ts` incluye `WINE_LIBRARY_STRATEGIC_LINKS` para que Googlebot y crawlers de IA reciban enlaces internos estratégicos en HTML prerenderizado.
- Verificaciones locales completadas:
  - `npm run test -- --run`: 7 archivos, 21 tests.
  - `npm run build`: correcto.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`: correcto.
  - `git diff --check`: correcto.
  - QA navegador local en `/biblioteca-vino/uvas/xarello`, `/biblioteca-vino/regiones/francia/champagne`, `/biblioteca-vino/estilos/espumoso` y `/biblioteca-vino/maridajes/carnes-rojas`.
- QA local confirmó enlaces estratégicos visibles y resolubles, incluyendo `Champagne` como región en la ficha de espumoso.
- No se detectaron errores de consola en las rutas probadas.
- Este bloque aún no está publicado en producción.

## Decisiones

- No crear slugs duplicados para grafías alternativas: se resuelven mediante alias hacia el slug canónico.
- Mantener `xarello` como slug canónico y cubrir variantes editoriales con alias.
- Resolver colisiones de entidades por categoría, no por prioridad global de strings.
- Priorizar red semántica interna antes de añadir más URLs nuevas.
- Mantener paridad frontend/prerender como requisito: los enlaces estratégicos deben existir también para bots.

## Hipótesis

- El enlazado estratégico aumentará la comprensión temática de la biblioteca al conectar entidades por intención real de restaurante.
- Resolver alias evitará perder búsquedas con grafías frecuentes sin generar canibalización ni duplicados.
- La mejora será visible para Googlebot y LLM crawlers tras desplegar `prerender` desde Lovable.

## Tareas pendientes

- Hecho: commit y push del bloque de grafo estratégico con `80895ac feat: connect wine library entities`.
- Publicar frontend desde Lovable.
- Desplegar explícitamente la Edge Function `prerender` desde Lovable.
- Revalidar producción como usuario real y Googlebot en rutas de uva, región, estilo y maridaje.
- Siguiente ampliación: contenido más profundo para regiones, estilos y maridajes prioritarios, y revisar schema `DefinedTerm`/`ItemList` donde aporte valor.

## Actualización 2026-05-25: grafo estratégico pusheado, deploy Lovable pendiente

## Hechos

- El bloque de grafo estratégico ya está commiteado y subido a `origin/main`.
- Commit publicado en GitHub: `80895ac feat: connect wine library entities`.
- Lovable muestra el commit `feat: connect wine library entities` en el proyecto `Web Winerim`.
- Producción aún no refleja el grafo estratégico en el HTML prerenderizado de bots:
  - `/biblioteca-vino/uvas/xarello` responde con `x-worker-branch: bot-prerender`, pero el bloque `Enlaces relacionados` sigue limitado a hubs generales.
  - `/biblioteca-vino/estilos/espumoso` responde con `x-worker-branch: bot-prerender`, pero todavía no incluye enlaces estratégicos como `Champagne`, `Cava`, `Chardonnay`, `marisco` o `quesos`.
  - `/biblioteca-vino/maridajes/carnes-rojas` responde `200`, pero no contiene los enlaces estratégicos esperados en el prerender.
- Se intentó activar `Update` desde la pestaña autenticada de Lovable, pero la interacción automatizada no cambió el estado del panel.
- macOS mostró un permiso amplio para que Codex controle Finder durante la automatización; no se concedió ese permiso desde la sesión.
- No se ha desplegado Cloudflare Worker para este bloque.

## Decisiones

- Tratar este bloque como completado en código y GitHub, pero no como publicado en producción.
- No afirmar publicación hasta validar que Googlebot recibe los enlaces estratégicos desde `prerender`.
- Mantener el siguiente paso en Lovable: pulsar `Update` y pedir despliegue explícito de la Edge Function `prerender`.
- No desplegar Cloudflare Worker salvo que la validación posterior demuestre que el proxy impide servir el HTML actualizado.

## Hipótesis

- El frontend de Lovable y/o la Edge Function `prerender` siguen sirviendo la versión anterior pese a que GitHub ya tiene el commit nuevo.
- Una vez Lovable aplique el `Update` y despliegue `prerender`, las rutas de biblioteca deberían mostrar el grafo estratégico sin tocar Cloudflare.

## Tareas pendientes

- Hecho: en Lovable, publicar el commit `80895ac feat: connect wine library entities`.
- Hecho: en Lovable, desplegar explícitamente la Supabase Edge Function `prerender`.
- Hecho: revalidar producción como Googlebot:
  - `/biblioteca-vino/uvas/xarello` enlaza a Penedes, Cava, espumoso, marisco y arroces.
  - `/biblioteca-vino/regiones/francia/champagne` enlaza a Chardonnay, Pinot Noir, espumoso, marisco y quesos.
  - `/biblioteca-vino/estilos/espumoso` enlaza `Champagne` como región y `Cava` como estilo.
  - `/biblioteca-vino/maridajes/carnes-rojas` enlaza Tempranillo, Syrah, Cabernet Sauvignon, Rioja y tinto reserva.
- Tras validar producción, retomar ampliación editorial profunda de regiones, estilos, maridajes y schema por entidad.

## Actualización 2026-05-25: grafo estratégico publicado y validado

## Hechos

- Se intentó desplegar `prerender` por CLI, pero falló por ausencia de `SUPABASE_ACCESS_TOKEN`.
- Se envió a Lovable el pedido operativo para desplegar el commit `feat: connect wine library entities` y la Edge Function `prerender`.
- Lovable confirmó `Edge Function prerender desplegada`.
- Se pulsó `Update` en el panel de publicación de Lovable.
- Lovable quedó en estado `Up to date`.
- Producción sirve nuevo asset frontend para usuarios reales: `/assets/index-DAMK02nf.js`.
- Producción como Googlebot quedó validada con enlaces estratégicos en:
  - `/biblioteca-vino/uvas/xarello`;
  - `/biblioteca-vino/regiones/francia/champagne`;
  - `/biblioteca-vino/estilos/espumoso`;
  - `/biblioteca-vino/maridajes/carnes-rojas`.
- Producción como usuario real quedó validada con Chrome headless en `/biblioteca-vino/uvas/xarello`; el DOM renderizado contiene:
  - `/biblioteca-vino/regiones/espana/penedes`;
  - `/biblioteca-vino/estilos/cava`;
  - `/biblioteca-vino/estilos/espumoso`;
  - `/biblioteca-vino/maridajes/pescados-y-mariscos`;
  - `/biblioteca-vino/maridajes/pasta-arroces-y-legumbres`.
- La ruta humana responde con `x-worker-branch: spa`; la ruta bot responde con `x-worker-branch: bot-prerender`.
- No se desplegó Cloudflare Worker.

## Decisiones

- Cerrar el bloque de grafo estratégico como publicado y validado.
- Mantener el procedimiento operativo confirmado:
  - GitHub commit/push;
  - Lovable `Update` para frontend;
  - petición explícita de despliegue de Edge Function `prerender`;
  - validación separada de usuario real y Googlebot.
- No tocar Cloudflare Worker cuando `bot-prerender` funciona y el cambio está en frontend/Edge Function.

## Hipótesis

- El nuevo grafo interno debería mejorar rastreo, comprensión semántica y lectura por LLM crawlers tras recrawl.
- El impacto en Search Console tardará en aparecer y debe medirse por cobertura, impresiones y consultas de biblioteca.

## Tareas pendientes

- Retomar ampliación editorial profunda:
  - regiones prioritarias;
  - estilos prioritarios;
  - maridajes prioritarios;
  - schema `DefinedTerm`/`ItemList` donde aporte valor.
- Monitorizar Search Console tras recrawl.

## Actualización 2026-05-26: primera tanda profunda de regiones prioritarias

## Hechos

- Se implementó localmente la primera tanda editorial profunda de regiones prioritarias de biblioteca del vino.
- Regiones incluidas:
  - `rioja`
  - `ribera-del-duero`
  - `rias-baixas`
  - `rueda`
  - `priorat`
  - `bourgogne`
  - `bordeaux`
  - `champagne`
  - `douro`
  - `vinho-verde`
- Nueva capa creada: `src/data/wineLibraryRegionEditorial.ts`.
- La capa regional incluye servicio, copa, uso por copa, rol en carta, guion de sala, palanca comercial, error a evitar, maridajes y FAQs.
- El contenido está localizado para `es`, `en`, `it`, `fr`, `de` y `pt`.
- `src/pages/RegionDetail.tsx` integra la sección editorial regional cuando existe perfil prioritario.
- `src/pages/RegionDetail.tsx` usa ahora etiquetas principales multilingües de la biblioteca para breadcrumbs, datos clave, secciones, CTA y roles.
- `src/data/regionsLibraryI18n.ts` añade fallbacks localizados para campos profundos de región en idiomas no españoles:
  - estilos;
  - lectura en carta;
  - cuándo destacar;
  - perfil de cliente;
  - estrategia de venta;
  - errores comunes;
  - maridajes;
  - FAQs.
- `supabase/functions/prerender/index.ts` incluye perfiles equivalentes para las 10 regiones prioritarias, manteniendo paridad para Googlebot y crawlers de IA.
- Verificaciones locales completadas:
  - `npm run test -- --run`: 7 archivos, 25 tests.
  - `npm run build`: correcto.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`: correcto.
  - `git diff --check`: correcto.
  - Render test humano en región prioritaria portuguesa: `/pt/biblioteca-vinho/regioes/portugal/vinho-verde`.
- Chrome headless externo con `--dump-dom` se quedó colgado en el entorno local; se cortaron los procesos temporales y se sustituyó esa comprobación por test de render controlado con React Testing Library.
- Producción aún no refleja esta tanda hasta commit/push, publish Lovable y despliegue explícito de `prerender`.

## Decisiones

- Priorizar regiones antes que estilos y maridajes porque conectan intención geográfica, uvas, estilos, maridajes y criterio comercial.
- Mantener las 10 regiones documentadas como primera tanda regional.
- No crear URLs nuevas; el bloque aumenta profundidad editorial sobre rutas existentes.
- Añadir fallbacks localizados profundos para regiones en idiomas internacionales, porque dejar textos españoles en páginas localizadas reduce calidad SEO/LLM.
- Mantener paridad React/prerender como requisito para considerar cerrado el bloque.
- No tocar Cloudflare Worker para este bloque salvo que la validación productiva demuestre un problema de proxy.

## Hipótesis

- La profundidad regional aumentará autoridad temática porque cubre intención geográfica y refuerza enlaces internos ya publicados.
- Evitar mezcla de español en rutas internacionales mejorará la comprensión por Googlebot y crawlers de IA.
- El impacto real dependerá de publicar frontend y `prerender` desde Lovable y de que Google recrawlee las fichas.

## Tareas pendientes

- Commit y push de la primera tanda profunda de regiones prioritarias.
- Publicar frontend desde Lovable.
- Desplegar explícitamente la Edge Function `prerender` desde Lovable.
- Revalidar producción como Googlebot y usuario real en rutas representativas:
  - `/biblioteca-vino/regiones/espana/rioja`;
  - `/de/weinbibliothek/regionen/francia/champagne`;
  - `/pt/biblioteca-vinho/regioes/portugal/vinho-verde`;
  - `/en/wine-library/regions/espana/rioja`.
- Tras validar, continuar con estilos prioritarios, maridajes prioritarios y schema semántico.

## Actualización 2026-05-26: primera tanda de regiones publicada y validada

## Hechos

- Commit creado y pusheado a `origin/main`:
  - `6f6dcd8 feat: deepen priority wine regions`.
- Lovable mostró el commit `feat: deepen priority wine regions`.
- Se publicó frontend desde Lovable con `Update`; Lovable quedó en estado `Up to date`.
- Se pidió a Lovable desplegar explícitamente la Edge Function `prerender`.
- Lovable confirmó:
  - `Edge Function prerender desplegada`.
  - Verificación propia de `/biblioteca-vino/regiones/espana/rioja` sirviendo nuevos perfiles regionales a Googlebot.
- Producción validada como Googlebot:
  - `/biblioteca-vino/regiones/espana/rioja`: `x-prerendered: true`, `x-worker-branch: bot-prerender`, contenido `Rol en carta`, `Rioja es el tinto de confianza`, `cordero asado`.
  - `/de/weinbibliothek/regionen/francia/champagne`: `x-prerendered: true`, `x-worker-branch: bot-prerender`, contenido `Rolle auf der Weinkarte`, `Champagne ist Feier`, `Austern`.
  - `/pt/biblioteca-vinho/regioes/portugal/vinho-verde`: `x-prerendered: true`, `x-worker-branch: bot-prerender`, contenido `Papel na carta`, `Vinho Verde traz frescura`, `marisco`.
  - `/en/wine-library/regions/espana/rioja`: `x-prerendered: true`, `x-worker-branch: bot-prerender`, contenido `Role on the wine list`, `Rioja is the trust red`, `roasted lamb`.
- Producción validada como usuario real con Chrome headless controlado por timeout:
  - `/pt/biblioteca-vinho/regioes/portugal/vinho-verde`: DOM contiene `Como usar Vinho Verde numa carta`, `Papel na carta` y `marisco`.
  - `/de/weinbibliothek/regionen/francia/champagne`: DOM contiene `Wie Champagne auf der Weinkarte funktioniert`, `Rolle auf der Weinkarte` y `Austern`.
- No se desplegó Cloudflare Worker; `bot-prerender` funcionó correctamente tras actualizar Lovable/prerender.
- Contradicción detectada y corregida en documentación: las rutas localizadas de región traducen la sección (`regions`, `regionen`, `regioes`) pero conservan slugs fuente de país (`espana`, `francia`, `portugal`), por lo que `/en/wine-library/regions/spain/rioja` no es la ruta canónica documentada.

## Decisiones

- Cerrar la primera tanda profunda de regiones como publicada y validada.
- Mantener Lovable como vía operativa para frontend y Edge Function `prerender`.
- No tocar Cloudflare Worker cuando producción responde por `bot-prerender` y el contenido actualizado llega correctamente.
- Mantener slugs fuente de país en rutas localizadas hasta que se decida una migración explícita con redirects/hreflang/canonical.

## Hipótesis

- La tanda regional ya es legible por usuarios, Googlebot y crawlers de IA.
- El siguiente salto editorial con menor riesgo debería profundizar estilos prioritarios conectados por el grafo.
- Traducir slugs de país podría mejorar UX internacional, pero implicaría una migración SEO que debe diseñarse aparte.

## Tareas pendientes

- Continuar con estilos prioritarios:
  - tinto crianza;
  - tinto reserva;
  - blanco con lias;
  - espumoso metodo tradicional;
  - rosado gastronomico.
- Después, continuar con maridajes prioritarios y schema semántico por entidad.
- Monitorizar Search Console tras recrawl para cobertura e impresiones de biblioteca del vino.

## Actualización 2026-05-26: primera tanda profunda de estilos prioritarios

## Hechos

- Se implementó la primera tanda profunda de estilos prioritarios de biblioteca del vino.
- Commit creado y pusheado a `origin/main`:
  - `7198d3a feat: deepen priority wine styles`.
- Estilos incluidos:
  - `tinto-crianza`;
  - `tinto-reserva`;
  - `blanco-crianza-lias`;
  - `espumoso`;
  - `rosado-cuerpo`.
- Nueva capa creada: `src/data/wineLibraryStyleEditorial.ts`.
- La capa de estilos incluye temperatura de servicio, copa, uso por copa, rol en carta, guion de sala, palanca comercial, error a evitar, maridajes de carta y FAQs.
- El contenido está localizado para `es`, `en`, `it`, `fr`, `de` y `pt`.
- `src/data/stylesLibrary.ts` añade `blanco-crianza-lias` como ficha completa de estilo, no solo como subtipo ligero.
- `src/data/stylesLibraryI18n.ts` añade nombres localizados y fallbacks profundos para evitar narrativa española en páginas internacionales de estilos.
- `src/pages/StyleDetail.tsx` integra la sección editorial de estilos, etiquetas localizadas, FAQs combinadas y CTA localizado.
- `supabase/functions/prerender/index.ts` incluye perfiles equivalentes para los 5 estilos prioritarios, manteniendo paridad esencial para Googlebot y crawlers de IA.
- `index.html` corrige el idioma enviado al widget de chat para usar el idioma detectado por ruta en vez de caer a `document.documentElement.lang || "es"`.
- Verificaciones locales completadas:
  - `npm run test -- --run`: 7 archivos, 29 tests.
  - `npm run build`: correcto.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`: correcto.
  - `git diff --check`: correcto.
  - Navegador local en `/de/weinbibliothek/weinstile/espumoso`.
  - Navegador local en `/pt/biblioteca-vinho/estilos/blanco-crianza-lias`.
- QA local verificó que las rutas alemana y portuguesa no muestran fuga española relevante en la página ni en el título del widget de chat.
- Intento de publicación posterior al push:
  - La única pestaña Lovable accesible redirige a login.
  - `SUPABASE_ACCESS_TOKEN` no existe en el entorno local.
  - No se pudo publicar frontend ni desplegar `prerender` desde esta sesión.
- Producción aún no refleja esta tanda hasta publicación en Lovable y despliegue explícito de la Edge Function `prerender`.

## Decisiones

- Cerrar el bloque local de estilos como implementado y verificado.
- Mantener la tanda inicial en 5 estilos por impacto práctico en carta y por conexión directa con regiones, uvas y maridajes del grafo.
- Convertir `blanco-crianza-lias` en ficha completa porque era un nodo prioritario sin superficie editorial suficiente.
- Mantener paridad React/prerender también para estilos; no basta con que el usuario humano vea la capa editorial.
- Corregir el idioma del widget de chat como parte de la calidad internacional de las rutas localizadas.
- No tocar Cloudflare Worker para este bloque salvo que la validación productiva demuestre `bot-fallback` o HTML antiguo.

## Hipótesis

- Los estilos prioritarios reforzarán búsquedas de intención práctica como servicio, venta por copa, maridaje y diseño de carta.
- Evitar mezcla de español en páginas `de` y `pt` mejorará la comprensión por Googlebot, crawlers de IA y usuarios internacionales.
- El impacto real dependerá de publicar frontend y `prerender` desde Lovable y esperar recrawl.

## Tareas pendientes

- Publicar frontend desde Lovable.
- Desplegar explícitamente la Edge Function `prerender` desde Lovable.
- Revalidar producción como Googlebot:
  - `/biblioteca-vino/estilos/tinto-crianza`;
  - `/de/weinbibliothek/weinstile/espumoso`;
  - `/pt/biblioteca-vinho/estilos/blanco-crianza-lias`;
  - `/en/wine-library/styles/rosado-cuerpo`.
- Revalidar producción como usuario real:
  - `/de/weinbibliothek/weinstile/espumoso`;
  - `/pt/biblioteca-vinho/estilos/blanco-crianza-lias`.
- Tras validar estilos, continuar con maridajes prioritarios y schema semántico por entidad.

## Actualización 2026-05-26: maridajes prioritarios y schema semántico local

## Hechos

- Se implementó localmente la primera tanda profunda de maridajes prioritarios de biblioteca del vino.
- Commit creado y pusheado a `origin/main`:
  - `fe4d10b feat: deepen priority wine pairings`.
- Maridajes incluidos:
  - `carnes-rojas`;
  - `lubina-dorada` como nodo de pescado blanco;
  - `pescados-y-mariscos` como nodo de marisco;
  - `pasta-arroces-y-legumbres` como nodo de arroces;
  - `cocina-asiatica-y-fusion`;
  - `quesos`.
- Nueva capa creada: `src/data/wineLibraryPairingEditorial.ts`.
- La capa de maridajes incluye momento de servicio, vino por copa, vinos base, rol del maridaje, guion de sala, palanca comercial, error a evitar, ruta de upsell, platos clave y FAQs.
- El contenido está localizado para `es`, `en`, `it`, `fr`, `de` y `pt`.
- `src/data/pairingsLibraryI18n.ts` añade fallbacks profundos para campos visibles de maridajes en idiomas internacionales:
  - principios;
  - notas de platos;
  - errores comunes;
  - alternativas;
  - uso en carta;
  - lenguaje de sala;
  - opciones seguras y diferenciales;
  - conceptos;
  - FAQs.
- `src/data/pairingsLibraryI18n.ts` traduce nombres prioritarios como `lubina-dorada` a intención real de pescado blanco en `en/fr/it/de/pt`.
- `src/data/pairingsLibraryI18n.ts` localiza términos narrativos de estilos para evitar fugas como `Blanco aromático` en rutas alemanas o portuguesas.
- `src/pages/PairingDetail.tsx` integra la sección editorial de maridajes, etiquetas localizadas, FAQs combinadas, CTA localizado y schema `DefinedTerm`.
- `src/pages/GrapeDetail.tsx`, `src/pages/RegionDetail.tsx` y `src/pages/StyleDetail.tsx` ahora emiten JSON-LD `@graph` con `Article` + `DefinedTerm`, alineando la semántica de todas las entidades principales de la biblioteca.
- `supabase/functions/prerender/index.ts` incluye perfiles equivalentes para los 6 maridajes prioritarios, manteniendo paridad esencial para Googlebot y crawlers de IA.
- Verificaciones locales completadas:
  - `npx tsc --noEmit --pretty false`: correcto.
  - `npm run test -- --run`: 7 archivos, 33 tests.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`: correcto.
  - `git diff --check`: correcto.
  - `npm run build`: correcto.
  - Browser QA local en `/de/weinbibliothek/weinbegleitung/cocina-asiatica-y-fusion`.
  - Browser QA local en `/pt/biblioteca-vinho/harmonizacoes/lubina-dorada`.
- QA local verificó que las rutas alemana y portuguesa de maridajes muestran `DefinedTerm`, un solo `FAQPage`, no muestran `¿` y no usan términos narrativos españoles como `Blanco aromático`.
- Producción aún no refleja estilos ni maridajes hasta publicación en Lovable y despliegue explícito de la Edge Function `prerender`.
- Se reintentó abrir Lovable tras el push de `fe4d10b`, pero `https://lovable.dev/projects/2c4eed0e-6760-45f0-aeb3-ce44de8e91f1` redirige a login en el navegador disponible.
- Revalidación productiva posterior al push: las rutas de estilos/maridajes responden `bot-prerender`, pero siguen sirviendo HTML antiguo sin las nuevas secciones ni títulos localizados profundos.

## Decisiones

- Avanzar localmente con maridajes aunque la publicación de estilos siga bloqueada por Lovable/login, porque el usuario pidió continuar hasta cerrar la biblioteca.
- No marcar como cerrado en producción ningún bloque que dependa de Lovable hasta validar frontend y `prerender`.
- Tratar `lubina-dorada` como nodo de intención `pescado blanco`, porque así conecta mejor con la intención SEO documentada.
- Tratar `pescados-y-mariscos` como nodo de intención `marisco`, manteniendo el slug existente para no crear nuevas URLs.
- Añadir `DefinedTerm` en las cuatro familias de detalle: uvas, regiones, estilos y maridajes.
- Mantener `FAQPage` único por página de detalle mediante `FAQSection`.
- No tocar Cloudflare Worker para este bloque salvo que producción demuestre `bot-fallback` o HTML antiguo tras actualizar Lovable.

## Hipótesis

- La biblioteca queda localmente mucho más cerca de "máximo nivel" porque ya cubre uvas, regiones, estilos, maridajes, enlaces internos, FAQs y schema semántico por entidad.
- El salto SEO/LLM real dependerá de publicar frontend y `prerender`, y después de recrawl.
- Los siguientes incrementos deberían centrarse en producción, QA, legacy shortcuts y ampliación masiva de más entidades, no en reabrir la arquitectura base.

## Tareas pendientes

- Publicar frontend desde Lovable.
- Desplegar explícitamente la Edge Function `prerender` desde Lovable.
- Revalidar producción como Googlebot:
  - `/biblioteca-vino/estilos/tinto-crianza`;
  - `/de/weinbibliothek/weinstile/espumoso`;
  - `/pt/biblioteca-vinho/estilos/blanco-crianza-lias`;
  - `/biblioteca-vino/maridajes/carnes-rojas`;
  - `/de/weinbibliothek/weinbegleitung/cocina-asiatica-y-fusion`;
  - `/pt/biblioteca-vinho/harmonizacoes/lubina-dorada`.
- Revalidar producción como usuario real:
  - `/de/weinbibliothek/weinstile/espumoso`;
  - `/pt/biblioteca-vinho/estilos/blanco-crianza-lias`;
  - `/de/weinbibliothek/weinbegleitung/cocina-asiatica-y-fusion`;
  - `/pt/biblioteca-vinho/harmonizacoes/lubina-dorada`.
- Tras validar producción, auditar legacy shortcuts de biblioteca y decidir redirects/metadatos únicos.

## Actualización 2026-05-26: estilos y maridajes validados en producción

## Hechos

- El usuario confirmó que Lovable/frontend y producción ya estaban publicados.
- Se revalidó producción como Googlebot con cache-bust en las rutas pendientes.
- Googlebot recibe HTTP 200, `x-prerendered: true` y `x-worker-branch: bot-prerender` en:
  - `/biblioteca-vino/estilos/tinto-crianza`;
  - `/de/weinbibliothek/weinstile/espumoso`;
  - `/pt/biblioteca-vinho/estilos/blanco-crianza-lias`;
  - `/biblioteca-vino/maridajes/carnes-rojas`;
  - `/de/weinbibliothek/weinbegleitung/cocina-asiatica-y-fusion`;
  - `/pt/biblioteca-vinho/harmonizacoes/lubina-dorada`.
- El prerender productivo ya incluye la capa editorial esencial de estilos y maridajes:
  - rol en carta o papel en carta;
  - lectura de servicio;
  - argumento de sala;
  - maridajes/platos clave;
  - error a evitar;
  - un `Article`;
  - un solo `FAQPage`.
- Producción como usuario real validada en navegador para:
  - `/de/weinbibliothek/weinstile/espumoso`;
  - `/pt/biblioteca-vinho/estilos/blanco-crianza-lias`;
  - `/de/weinbibliothek/weinbegleitung/cocina-asiatica-y-fusion`;
  - `/pt/biblioteca-vinho/harmonizacoes/lubina-dorada`.
- En frontend humano, las cuatro rutas muestran los bloques avanzados, un solo `FAQPage` y `DefinedTerm`.
- Queda resuelta la contradicción anterior: antes del último publish el prerender mostraba HTML antiguo; tras el publish confirmado por el usuario, producción ya contiene la capa profunda.

## Decisiones

- Cerrar en producción la primera tanda profunda de estilos y maridajes prioritarios.
- Considerar cerrado el bloque principal actual de biblioteca del vino: uvas, regiones, estilos, maridajes, grafo interno, FAQs, paridad multilingüe y prerender esencial.
- Mantener como línea separada la mejora futura de la plantilla de prerender para que sus H1/títulos usen alias localizados más editoriales, aunque el contenido esencial ya está presente.
- Pasar el siguiente frente de biblioteca a legacy shortcuts, ampliación masiva de entidades y monitorización en Search Console.

## Hipótesis

- El recrawl de Google debería empezar a ver la capa profunda de estilos y maridajes desde este despliegue.
- La diferencia entre H1/título del prerender compacto y H1/título del frontend humano puede mejorarse en una tanda futura, pero no bloquea el cierre del bloque principal.
- Los próximos saltos de SEO vendrán más de legacy shortcuts, enlaces internos, más entidades y Search Console que de seguir reabriendo la arquitectura base.

## Tareas pendientes

- Hecho: resolver los 96 legacy shortcuts de biblioteca con redirects canónicos en Worker de producción.
- Monitorizar Search Console para cobertura, recrawl e impresiones de las rutas enriquecidas.
- Definir la siguiente expansión masiva de entidades por demanda SEO:
  - más regiones;
  - estilos secundarios;
  - platos concretos;
  - más uvas internacionales.
- Mejorar en una tanda futura los títulos/H1 del prerender compacto para usar alias localizados de entidad cuando exista perfil editorial.

## Actualización 2026-05-26: legacy shortcuts de biblioteca resueltos

## Hechos

- Se implementó y publicó el mapa de redirects canónicos para los 96 legacy shortcuts de biblioteca del vino detectados en auditoría pública.
- Los 96 shortcuts corresponden a 16 slugs antiguos en 6 idiomas.
- Nuevo archivo: `src/data/wineLibraryLegacyRedirects.ts`.
- `src/pages/BibliotecaDetalle.tsx` redirige los shortcuts legacy hacia la ruta canónica localizada antes de renderizar un 404.
- `cloudflare-worker-v3-hybrid.js` redirige en el borde las URLs legacy de una sola parte hacia la entidad canónica localizada con 301 permanente.
- Tests actualizados:
  - `src/test/wine-library-links.test.ts`;
  - `src/test/wine-library-seo-surface.test.ts`.
- Verificaciones completadas:
  - `npm run test -- --run src/test/wine-library-links.test.ts src/test/wine-library-seo-surface.test.ts`: 12 tests correctos.
  - `npx tsc --noEmit --pretty false`: correcto.
  - `npm run test -- --run`: 7 archivos, 35 tests correctos.
  - `npm run build`: correcto, con avisos no bloqueantes ya conocidos de Browserslist y chunks grandes.
  - `npm run deploy:worker:dry-run`: correcto.
  - `git diff --check`: correcto.
- Commit y push completados: `d37044e fix: redirect legacy wine library shortcuts`.
- Cloudflare Worker `winerim-proxy` desplegado con Version ID `c4d375bb-5280-41fe-b793-549be14f17c4`.
- Producción validada:
  - 96/96 legacy shortcuts devuelven HTTP 301.
  - 96/96 apuntan al destino canónico esperado.
  - 96/96 emiten `X-Worker-Branch: wine-library-legacy-redirect`.
  - Destinos representativos en `es`, `en`, `it`, `fr`, `de` y `pt` responden HTTP 200 con `X-Prerendered: true` y `X-Worker-Branch: bot-prerender`.
- No se realizó publicación manual desde Lovable en esta sesión; la corrección crítica para SEO ya está activa en el Worker de producción.

## Decisiones

- Resolver los shortcuts legacy con 301 canónicos, no con metadatos únicos, para evitar canibalización contra las rutas nuevas de entidad.
- Mantener las rutas nuevas de biblioteca como superficie principal indexable.
- Duplicar el mapa mínimo en Worker porque el Worker no importa módulos TypeScript del frontend y debe poder redirigir antes de servir la SPA.
- Mantener una redirección equivalente en React como defensa secundaria para navegación de cliente o bundles futuros.

## Hipótesis

- Google debería consolidar señales de las URLs antiguas hacia las rutas canónicas nuevas tras recrawl.
- La reducción de páginas legacy con H1/título genérico debería mejorar calidad de cobertura y disminuir canibalización interna.
- La publicación Lovable del bundle React puede ser útil para alinear la SPA, pero no bloquea el resultado SEO directo porque el Worker ya intercepta las URLs.

## Tareas pendientes

- Monitorizar en Search Console si las URLs legacy pasan a aparecer como redirigidas o canónicas alternativas correctas.
- Si Search Console mantiene ejemplos legacy sin actualizar, reintentar inspección o solicitar indexación de una tanda corta de destinos canónicos.
- Publicar desde Lovable cuando se haga el siguiente publish general para que la defensa secundaria de React quede también en el bundle servido.
- Continuar con la siguiente expansión editorial masiva de biblioteca:
  - más regiones;
  - estilos secundarios;
  - platos/maridajes concretos;
  - más uvas internacionales.

## Actualización 2026-05-26: expansión editorial masiva local de biblioteca

## Hechos

- Se implementó localmente una expansión editorial masiva de biblioteca del vino sobre rutas canónicas ya existentes.
- Nueva capa creada: `src/data/wineLibraryEditorialExpansion.ts`.
- Cobertura editorial local tras la expansión:
  - 30 uvas prioritarias.
  - 22 regiones prioritarias.
  - 15 estilos prioritarios.
  - 18 maridajes/platos prioritarios.
- Nuevas uvas añadidas a la capa prioritaria:
  - `mencia`;
  - `cabernet-franc`;
  - `gamay`;
  - `gewurztraminer`;
  - `viognier`;
  - `gruner-veltliner`;
  - `pinot-grigio`;
  - `barbera`;
  - `primitivo`;
  - `aglianico`.
- Nuevas regiones ampliadas mediante perfil editorial localizado:
  - `toscana`;
  - `napa-valley`;
  - `jerez`;
  - `vallee-du-rhone`;
  - `piemonte`;
  - `barossa-valley`;
  - `marlborough`;
  - `mendoza`;
  - `mosel`;
  - `willamette-valley`;
  - `sancerre`;
  - `barolo`.
- Nuevos estilos ampliados mediante perfil editorial localizado:
  - `tinto-joven`;
  - `tinto-ligero`;
  - `tinto-cuerpo`;
  - `blanco-joven`;
  - `blanco-mineral`;
  - `champagne`;
  - `cava`;
  - `fino-manzanilla`;
  - `pedro-ximenez`;
  - `orange-maceracion-corta`.
- Nuevos maridajes/platos ampliados mediante perfil editorial localizado:
  - `aves-y-caza`;
  - `verduras-y-cocina-vegetariana`;
  - `postres-y-chocolate`;
  - `tapas-y-aperitivos`;
  - `solomillo-de-ternera`;
  - `cordero-asado`;
  - `pato-confitado`;
  - `atun-rojo`;
  - `pulpo-gallego`;
  - `risotto-setas`;
  - `ostras`;
  - `chocolate-negro`.
- La expansión se integró en:
  - `src/data/wineLibraryEditorial.ts`;
  - `src/data/wineLibraryRegionEditorial.ts`;
  - `src/data/wineLibraryStyleEditorial.ts`;
  - `src/data/wineLibraryPairingEditorial.ts`;
  - `supabase/functions/prerender/index.ts`.
- El `prerender` incluye perfiles compactos equivalentes para la nueva tanda, manteniendo paridad esencial para Googlebot y crawlers de IA.
- Se corrigió una contradicción técnica detectada durante esta sesión:
  - El Worker ya redirige 96 shortcuts legacy de biblioteca.
  - El sitemap seguía listando los 16 shortcuts legacy españoles como rutas enviadas.
  - `supabase/functions/sitemap/index.ts` ahora excluye esos shortcuts legacy del sitemap para no enviar URLs 301.
- QA local en navegador:
  - `/de/weinbibliothek/weinstile/fino-manzanilla` carga sin 404 y con canonical alemán.
  - `/pt/biblioteca-vinho/harmonizacoes/ostras` carga sin 404 y con canonical portugués.
  - `/fr/bibliotheque-vin/regions/francia/sancerre` carga sin 404 y con canonical francés.
  - No se detectaron errores de consola en las rutas probadas.
- Verificaciones locales completadas:
  - `npx tsc --noEmit --pretty false`.
  - `npm run test -- --run src/test/wine-library-editorial.test.ts src/test/wine-library-seo-surface.test.ts`.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`.
  - `npm run test -- --run`: 7 archivos, 35 tests correctos.
  - `npm run build`.
  - `git diff --check`.
- Avisos no bloqueantes durante build:
  - Browserslist/caniuse-lite desactualizado.
  - Chunks grandes por encima de 200 kB.

## Decisiones

- Ampliar la biblioteca sin crear nuevas rutas: usar rutas canónicas existentes y añadir profundidad editorial.
- Usar una capa de expansión localizada reutilizable para cubrir más entidades con consistencia en los seis idiomas.
- Mantener los perfiles manuales profundos como capa superior y usar la expansión arquetípica como segunda ola editorial.
- El sitemap no debe enviar shortcuts legacy que ya son 301; deben quedar fuera y consolidar señal hacia las rutas canónicas.
- No tocar Cloudflare Worker en esta tanda porque no cambia la lógica de redirects ni del proxy.

## Hipótesis

- Esta tanda debería aumentar la cobertura informacional y la utilidad comercial de la biblioteca en consultas long-tail de regiones, estilos, platos y uvas internacionales.
- La mejora SEO/LLM real dependerá de publicar el frontend en Lovable y desplegar explícitamente las Edge Functions `sitemap` y `prerender`.
- Quitar URLs 301 del sitemap debería reducir señales contradictorias para Google tras el siguiente recrawl.

## Tareas pendientes

- Hecho: commit y push de la expansión editorial masiva.
- Publicar frontend desde Lovable.
- Desplegar explícitamente desde Lovable:
  - Edge Function `sitemap`;
  - Edge Function `prerender`.
- Revalidar producción como usuario real:
  - `/de/weinbibliothek/weinstile/fino-manzanilla`;
  - `/pt/biblioteca-vinho/harmonizacoes/ostras`;
  - `/fr/bibliotheque-vin/regions/francia/sancerre`.
- Revalidar producción como Googlebot:
  - las mismas tres rutas anteriores;
  - `/sitemap.xml` sin shortcuts legacy españoles;
  - una uva nueva, por ejemplo `/de/weinbibliothek/rebsorten/mencia`.
- Monitorizar Search Console para legacy shortcuts y nuevas entidades enriquecidas.

## Actualización 2026-05-26: producción validada y ajuste final de sitemap

## Hechos

- El usuario indicó que la publicación ya estaba disponible y se revalidó producción.
- Producción como Googlebot responde HTTP 200, `x-prerendered: true` y `x-worker-branch: bot-prerender` en:
  - `/de/weinbibliothek/weinstile/fino-manzanilla`;
  - `/pt/biblioteca-vinho/harmonizacoes/ostras`;
  - `/fr/bibliotheque-vin/regions/francia/sancerre`.
- El HTML prerenderizado productivo contiene la nueva capa compacta de expansión:
  - Fino/Manzanilla en alemán con rol en carta y temperatura `7-9 C`.
  - Ostras en portugués con Champagne/Cava/Muscadet y papel en carta.
  - Sancerre en francés con temperatura `8-10 C` y maridajes de mar.
- Producción como usuario real validada en navegador:
  - las tres rutas cargan sin 404;
  - canonical correcto;
  - sin errores de consola;
  - sin `¿` detectado.
- `sitemap.xml` público ya no contiene los 16 shortcuts legacy españoles como `<loc>`.
- Se detectó una nueva laguna local antes del cierre:
  - algunas entidades de expansión prerenderizaban pero no estaban en `WINE_LIBRARY_DYNAMIC_ROUTES`.
  - Faltaban en sitemap rutas como `ostras`, `solomillo-de-ternera`, `mendoza`, `mosel`, `willamette-valley`, `sancerre` y `barolo`.
- Se corrigió localmente `supabase/functions/sitemap/index.ts` para incluir todas las entidades expandidas faltantes.
- Se actualizó `src/test/wine-library-seo-surface.test.ts` para cubrir esa presencia en sitemap.
- Verificaciones del ajuste final:
  - `npm run test -- --run src/test/wine-library-seo-surface.test.ts`: 8 tests correctos.
  - `npx --yes deno-bin check supabase/functions/sitemap/index.ts supabase/functions/prerender/index.ts`: correcto.
  - `npm run test -- --run`: 7 archivos, 35 tests correctos.
  - `npm run build`: correcto, con avisos no bloqueantes de Browserslist y chunks grandes.
  - `git diff --check`: correcto.
- Commit y push completados:
  - `9f99fa7 fix: include expanded wine entities in sitemap`.
- La producción aún necesita publicar el commit `9f99fa7` desde Lovable y desplegar explícitamente la Edge Function `sitemap` para que esas rutas adicionales entren en el sitemap público.

## Decisiones

- Considerar la capa de contenido/prerender de la expansión como publicada y validada en rutas representativas.
- No considerar cerrado el sitemap de la expansión hasta desplegar `9f99fa7` desde Lovable.
- No tocar Cloudflare Worker porque los redirects y `bot-prerender` funcionan.

## Hipótesis

- Tras desplegar `sitemap`, Google debería descubrir mejor los maridajes/platos concretos y regiones nuevas de la expansión.
- El mayor riesgo residual no es contenido, sino que Lovable no haya desplegado aún la última Edge Function `sitemap`.

## Tareas pendientes

- Publicar desde Lovable el commit `9f99fa7`.
- Desplegar explícitamente Edge Function `sitemap`.
- Revalidar producción:
  - `https://winerim.wine/sitemap.xml` contiene `/biblioteca-vino/maridajes/ostras`;
  - contiene `/biblioteca-vino/regiones/francia/sancerre`;
  - mantiene `0` shortcuts legacy españoles como `<loc>`.
- Después, reenviar o revalidar sitemap en Search Console.

## Actualización 2026-05-26: sitemap de expansión validado en producción

## Hechos

- El usuario confirmó que el último despliegue ya estaba publicado.
- Producción validada tras el despliegue del commit `9f99fa7`.
- `https://winerim.wine/sitemap.xml` contiene las rutas de expansión que faltaban:
  - `/biblioteca-vino/maridajes/ostras`;
  - `/biblioteca-vino/maridajes/solomillo-de-ternera`;
  - `/biblioteca-vino/regiones/francia/sancerre`;
  - `/biblioteca-vino/regiones/argentina/mendoza`;
  - `/biblioteca-vino/regiones/alemania/mosel`;
  - `/biblioteca-vino/regiones/estados-unidos/willamette-valley`;
  - `/biblioteca-vino/regiones/italia/barolo`.
- El sitemap público mantiene `0` shortcuts legacy españoles como `<loc>`.
- Conteo observado del sitemap público: 2.054 bloques `<loc>`.
- Googlebot validado en:
  - `/pt/biblioteca-vinho/harmonizacoes/ostras`: HTTP 200, `x-prerendered: true`, `x-worker-branch: bot-prerender`, `inLanguage: pt`, `FAQPage`.
  - `/de/weinbibliothek/rebsorten/mencia`: HTTP 200, `x-prerendered: true`, `x-worker-branch: bot-prerender`, `inLanguage: de`, `FAQPage`.
- Repo limpio en `main` tras la validación.

## Decisiones

- Cerrar como publicada y validada la expansión editorial masiva de biblioteca del vino, incluyendo contenido, prerender y sitemap.
- Mantener Cloudflare Worker sin cambios porque redirects legacy y `bot-prerender` funcionan.
- La siguiente acción ya no es código de biblioteca, sino monitorización y acciones de Search Console.

## Hipótesis

- El sitemap validado debería facilitar el descubrimiento de las nuevas entidades concretas tras recrawl.
- Search Console tardará días o semanas en mostrar consolidación de shortcuts legacy y nuevas rutas enriquecidas.

## Tareas pendientes

- Hecho: reenviar `/sitemap.xml` en Search Console.
- Solicitar indexación solo para una tanda corta de URLs estratégicas si Search Console lo permite:
  - `/biblioteca-vino/maridajes/ostras`;
  - `/biblioteca-vino/regiones/francia/sancerre`;
  - `/de/weinbibliothek/rebsorten/mencia`.
- Monitorizar cobertura:
  - shortcuts legacy como redirigidas;
  - rutas nuevas como descubiertas/indexadas;
  - cambios de impresiones en biblioteca del vino.
- Siguiente ola recomendada: usar datos de Search Console antes de añadir más entidades.

## Actualización 2026-05-26: sitemap reenviado en Search Console

## Hechos

- Search Console estaba accesible con la cuenta `gugocreative@gmail.com`.
- En la propiedad `https://winerim.wine/`, se reenvió `/sitemap.xml`.
- Search Console mostró confirmación:
  - `Se ha enviado el sitemap correctamente`.
- La fila de `/sitemap.xml` quedó con:
  - Enviado: `26 may 2026`.
  - Última lectura: `24 may 2026`.
  - Estado: `Correcto`.
  - Páginas descubiertas: `2.072`.
- La última lectura no cambió inmediatamente; Google indica que lo procesará periódicamente.

## Decisiones

- No solicitar indexación masiva en esta sesión.
- Esperar a que Search Console relea el sitemap antes de priorizar otra expansión editorial.

## Hipótesis

- Google puede tardar en actualizar `Última lectura`, cobertura y páginas descubiertas tras el reenvío.
- Una tanda corta de inspección/indexación manual puede ser útil cuando el sitemap aparezca leído de nuevo.

## Tareas pendientes

- Revisar Search Console más adelante para confirmar nueva fecha de `Última lectura`.
- Si Search Console lo permite, inspeccionar una tanda corta:
  - `/biblioteca-vino/maridajes/ostras`;
  - `/biblioteca-vino/regiones/francia/sancerre`;
  - `/de/weinbibliothek/rebsorten/mencia`.
- Monitorizar cobertura e impresiones de biblioteca del vino.

## Actualización 2026-05-27: Search Console tras recrawl de sitemap

## Hechos

- Al iniciar la continuación se leyeron `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- El repo estaba limpio en `main` y sincronizado con `origin/main`.
- Search Console mostró que `/sitemap.xml` ya fue releído:
  - Enviado: `26 may 2026`.
  - Última lectura: `26 may 2026`.
  - Estado: `Correcto`.
  - Páginas descubiertas: `2.054`.
  - Vídeos descubiertos: `0`.
- Search Console sigue mostrando `/sitemap_index.xml` como sitemap enviado antiguo:
  - Enviado: `22 dic 2022`.
  - Última lectura: `18 may 2026`.
  - Estado: `Correcto`.
  - Páginas descubiertas: `1.358`.
- Se inspeccionó la tanda corta estratégica:
  - `https://winerim.wine/biblioteca-vino/maridajes/ostras`;
  - `https://winerim.wine/biblioteca-vino/regiones/francia/sancerre`;
  - `https://winerim.wine/de/weinbibliothek/rebsorten/mencia`.
- Estado de inspección:
  - `ostras`: `La URL no está en Google`; motivo indicado: `Google no reconoce esta URL`.
  - `sancerre`: `La URL no está en Google`; motivo indicado: `Descubierta: actualmente sin indexar`.
  - `mencia`: `La URL no está en Google`; motivo indicado: `Descubierta: actualmente sin indexar`.
- Prueba en vivo de las tres URLs:
  - Search Console indica `La URL está disponible para Google`.
  - Search Console indica que la página se puede indexar.
- No se pulsó `Solicitar indexación`.

## Decisiones

- Mantener la regla de no solicitar indexación manual sin confirmación explícita justo antes de pulsar el botón.
- No abrir una nueva ola editorial todavía: la siguiente mejora debe partir del comportamiento real de indexación y consultas.
- Tratar la tanda corta como candidata razonable para solicitud manual de indexación si el usuario lo confirma.

## Hipótesis

- El bloqueo actual de las tres URLs no es técnico: Google puede acceder a ellas y las ve indexables.
- `sancerre` y `mencia` ya están en cola de descubrimiento; falta que Google las rastree/indexe.
- `ostras` puede tardar algo más en aparecer como descubierta porque Google acaba de releer el sitemap.
- Search Console puede tardar días o semanas en reflejar cobertura e impresiones de la expansión.

## Tareas pendientes

- Si el usuario confirma explícitamente, solicitar indexación manual de:
  - `/biblioteca-vino/maridajes/ostras`;
  - `/biblioteca-vino/regiones/francia/sancerre`;
  - `/de/weinbibliothek/rebsorten/mencia`.
- Revisar en unos días si esas URLs pasan a:
  - indexada;
  - descubierta sin indexar;
  - rastreada sin indexar;
  - canónica alternativa.
- Revisar si Search Console permite retirar o dejar de priorizar `/sitemap_index.xml`, que sigue enviado desde 2022.

## Actualización 2026-05-27: solicitud manual de indexación

## Hechos

- El usuario confirmó solicitar indexación manual de la tanda corta estratégica.
- Se solicitó indexación manual en Search Console para:
  - `https://winerim.wine/de/weinbibliothek/rebsorten/mencia`;
  - `https://winerim.wine/biblioteca-vino/regiones/francia/sancerre`;
  - `https://winerim.wine/biblioteca-vino/maridajes/ostras`.
- Search Console mostró confirmación en las tres URLs:
  - `Se ha solicitado la indexación`.
- Search Console indicó que las URLs quedaron añadidas a una cola de rastreo prioritaria.
- No se solicitó indexación masiva ni se tocaron otras URLs.

## Decisiones

- Ejecutar solo la tanda corta confirmada por el usuario.
- Mantener la monitorización como siguiente paso, sin seguir solicitando indexación URL a URL de forma masiva.

## Hipótesis

- Las solicitudes pueden acelerar el primer rastreo o recrawl, pero no garantizan indexación.
- Si alguna URL queda como `Rastreada: actualmente sin indexar`, el siguiente trabajo deberá centrarse en enlazado interno, señales de calidad y demanda real.

## Tareas pendientes

- Revisar en Search Console el estado de las tres URLs tras unos días.
- Monitorizar si pasan a:
  - indexadas;
  - descubiertas sin indexar;
  - rastreadas sin indexar;
  - canónicas alternativas.
- No abrir otra tanda masiva de solicitudes manuales sin revisar primero el resultado de esta tanda.

## Actualización 2026-05-27: saneamiento adicional de 404 en Search Console

## Hechos

- Se revisó el informe `Páginas` de Search Console tras la solicitud manual de indexación.
- Estado observado en Search Console:
  - `Indexadas`: 67.
  - `No se ha encontrado (404)`: 197 URLs.
  - `Página alternativa con etiqueta canónica adecuada`: 66 URLs.
  - `Página con redirección`: 18 URLs.
  - `Duplicada: el usuario no ha indicado ninguna versión canónica`: 3 URLs.
  - `Excluida por una etiqueta "noindex"`: 1 URL.
  - `Descubierta: actualmente sin indexar`: 1.758 URLs.
  - `Rastreada: actualmente sin indexar`: 133 URLs.
  - `Duplicada: Google ha elegido una versión canónica diferente a la del usuario`: 2 URLs.
- Se abrió el detalle de `/sitemap_index.xml` en Search Console.
- `/sitemap_index.xml` sigue enviado en Search Console, con:
  - Última lectura: `18/5/26`.
  - Páginas descubiertas: `1.358`.
  - Estado: sitemap procesado correctamente.
- Producción ya redirige `https://winerim.wine/sitemap_index.xml` con 301 a `https://winerim.wine/sitemap.xml`.
- Search Console ofrece la opción `Quitar sitemap` para `/sitemap_index.xml`, pero no se ejecutó.
- Se abrió el grupo `No se ha encontrado (404)` y se revisaron ejemplos visibles.
- Antes de la corrección, dos ejemplos visibles seguían siendo 404 reales en producción:
  - `https://winerim.wine/corso-vino-cata-mw-examen-practico`;
  - `https://winerim.wine/winerim-sommelier-magazine/`.
- Se añadieron dos redirects directos de alta confianza en `cloudflare-worker-v3-hybrid.js`:
  - `/corso-vino-cata-mw-examen-practico` -> `/decision-center/cursos`;
  - `/winerim-sommelier-magazine` -> `/sommelier-corner`.
- Verificaciones:
  - `npm run deploy:worker:dry-run`: correcto.
  - `git diff --check`: correcto.
  - Worker `winerim-proxy` desplegado con Version ID `b32cd9a2-63fe-40d5-97a4-5087a179f0b6`.
- Producción validada:
  - `/corso-vino-cata-mw-examen-practico` devuelve 301 a `/decision-center/cursos`.
  - `/winerim-sommelier-magazine` devuelve 301 a `/sommelier-corner`.
  - `/winerim-sommelier-magazine/` normaliza primero trailing slash y acaba en `/sommelier-corner`.
  - Los 10 ejemplos 404 visibles revisados en Search Console acaban ahora en HTTP 200 tras redirects.

## Decisiones

- Resolver solo redirects legacy de alta confianza con equivalencia semántica clara.
- No quitar `/sitemap_index.xml` de Search Console sin confirmación explícita del usuario.
- No iniciar validación del grupo 404 de Search Console todavía sin revisar si el conjunto completo está suficientemente cubierto.

## Hipótesis

- Estos redirects deberían reducir ejemplos visibles del grupo 404 tras el siguiente recrawl.
- El grupo 404 aún puede contener URLs no cubiertas; validar el grupo completo puede fallar si hay más ejemplos activos sin destino.
- Quitar `/sitemap_index.xml` de Search Console limpiaría el panel, pero no es urgente porque en producción redirige correctamente a `/sitemap.xml`.

## Tareas pendientes

- Commit y push del redirect Worker y documentación.
- Revisar más ejemplos del grupo 404 antes de pedir validación completa.
- Pedir confirmación explícita si se decide quitar `/sitemap_index.xml` en Search Console.
- Pedir confirmación explícita si se decide iniciar `Validar corrección` para el grupo 404.

## Actualización 2026-06-01: seguimiento Search Console e indexación biblioteca

## Hechos

- Al iniciar la sesión se leyeron `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- El repo estaba limpio en `main` antes de tocar código.
- Search Console para `https://winerim.wine/` muestra `/sitemap.xml` con:
  - Enviado: `26 may 2026`.
  - Última lectura: `30 may 2026`.
  - Estado: `Correcto`.
  - Páginas descubiertas: `2.054`.
- Search Console sigue mostrando `/sitemap_index.xml` enviado desde `22 dic 2022`, con:
  - Última lectura: `28 may 2026`.
  - Estado: `Correcto`.
  - Páginas descubiertas: `2.054`.
- Informe `Páginas`, última actualización `29/5/26`:
  - `Indexadas`: 102.
  - `Sin indexar`: 2.331.
  - `No se ha encontrado (404)`: 189.
  - `Página alternativa con etiqueta canónica adecuada`: 29.
  - `Página con redirección`: 23.
  - `Excluida por una etiqueta "noindex"`: 3.
  - `Duplicada: el usuario no ha indicado ninguna versión canónica`: 3.
  - `Descubierta: actualmente sin indexar`: 1.930.
  - `Rastreada: actualmente sin indexar`: 153.
  - `Duplicada: Google ha elegido una versión canónica diferente a la del usuario`: 1.
- Las tres URLs estratégicas de biblioteca del vino con indexación manual solicitada el 2026-05-27 aparecen ahora como indexadas:
  - `https://winerim.wine/de/weinbibliothek/rebsorten/mencia`.
  - `https://winerim.wine/biblioteca-vino/regiones/francia/sancerre`.
  - `https://winerim.wine/biblioteca-vino/maridajes/ostras`.
- En las tres URLs, Search Console indica:
  - `La página está indexada`.
  - Último rastreo por `Robot de Google para smartphones` el `27 may 2026`.
  - Rastreo permitido: `Sí`.
  - Obtención de página: `Correcto`.
  - Indexación permitida: `Sí`.
  - Canónica declarada igual a la URL inspeccionada.
  - Canónica elegida por Google: `URL inspeccionada`.
  - HTTPS válido, breadcrumbs válidos y `Preguntas frecuentes` válidas.
- Se revisó el grupo 404 en Search Console con 100 ejemplos visibles.
- En producción, antes de los cambios locales nuevos:
  - 87 de esos 100 ejemplos respondían con primer salto 301.
  - 13 respondían con primer salto 404.
  - Siguiendo redirecciones completas, 47 acababan en 200, 51 en 404 y 2 en 410.
- Se detectó una familia clara de 404 mal formados: rutas con patrón `/https:/winerim.wine/...`.
- Se añadieron cambios locales en `cloudflare-worker-v3-hybrid.js`:
  - Normalización genérica de rutas mal formadas `/https:/winerim.wine/...` hacia su path real.
  - Redirects directos de alta confianza para legacy de Search Console con equivalente claro, incluyendo `analiza-tu-carta`, CTAs antiguos, artículos de sommelier existentes, páginas de carta digital, maridajes, IA restaurantes y rutas de artículo con slug existente.
- Verificación local del Worker:
  - `npm run deploy:worker:dry-run`: correcto.
  - `git diff --check`: correcto.
  - Import local del Worker confirma 301 para ejemplos como `/https:/winerim.wine/fr/integrations`, `/analiza-tu-carta`, `/simone-monese` y `/carta-vinos-digital`.
- El despliegue real del Worker quedó bloqueado:
  - `npm run deploy:worker` falló con Cloudflare `Authentication error [code: 10000]`.
  - `wrangler whoami` detecta un OAuth token con permisos, pero el API rechaza la operación de deploy.

## Decisiones

- Tratar la indexación de `mencia`, `sancerre` y `ostras` como señal positiva: la infraestructura de biblioteca del vino es rastreable, canónica e indexable para Google.
- No solicitar más indexación manual de forma masiva.
- No quitar `/sitemap_index.xml` desde Search Console sin confirmación explícita.
- No iniciar `Validar corrección` del grupo 404 hasta desplegar los nuevos redirects y revisar más ejemplos o el conjunto completo.
- Mantener criterio de redirects de alta confianza: equivalencia semántica clara o normalización técnica inequívoca.
- Separar bloqueo de Cloudflare: los cambios están listos localmente, pero producción no los refleja hasta renovar sesión/token y desplegar.

## Hipótesis

- La solicitud manual corta aceleró el rastreo de las tres URLs de biblioteca, pero la indexación final también dependió de que canonical, FAQ, breadcrumbs y prerender estuvieran limpios.
- El aumento de indexadas de 67 a 102 sugiere que Google está empezando a procesar el bloque nuevo, aunque el cuello principal sigue siendo `Descubierta: actualmente sin indexar`.
- El grupo 404 debería bajar cuando Google recrawlee redirects ya existentes y cuando se despliegue la normalización pendiente del Worker.
- Las URLs `/https:/winerim.wine/...` probablemente vienen de enlaces absolutos mal serializados en algún momento histórico; normalizarlas a su path real es más correcto que dejarlas como 404.

## Tareas pendientes

- Restaurar autenticación Cloudflare Wrangler o proporcionar `CLOUDFLARE_API_TOKEN` válido.
- Desplegar `cloudflare-worker-v3-hybrid.js` con los redirects nuevos.
- Validar producción tras despliegue:
  - `/https:/winerim.wine/fr/integrations` -> `/fr/integrations`.
  - `/analiza-tu-carta` -> `/analisis-carta`.
  - `/simone-monese` -> `/article/simone-monese`.
  - `/carta-vinos-digital` -> `/software-carta-de-vinos`.
- Recalcular los 100 ejemplos visibles de 404 después del deploy.
- Decidir con confirmación explícita si se retira `/sitemap_index.xml` de Search Console.
- Decidir con confirmación explícita si se inicia `Validar corrección` para 404 cuando producción esté saneada.
- Monitorizar en Search Console si `Descubierta: actualmente sin indexar` baja y si las rutas nuevas de biblioteca empiezan a recibir impresiones.

## Actualización 2026-06-01: despliegue Worker completado

## Hechos

- Se renovó la autenticación de Wrangler mediante OAuth Cloudflare con la cuenta `gugocreative@gmail.com`.
- Se rechazó instalar Cloudflare skills cuando Wrangler lo preguntó durante el login.
- Wrangler 4 requería Node >= 22; se usó el Node del runtime de workspace (`v24.14.0`) para ejecutar `wrangler@4.95.0`.
- Se desplegó Cloudflare Worker `winerim-proxy` con Version ID `fda7c63b-ae88-4e3f-98c4-9d48ee39edc2`.
- Producción validada tras el deploy:
  - `/https:/winerim.wine/fr/integrations` devuelve 301 a `/fr/integrations` y termina en 200.
  - `/https:/winerim.wine/fr/conditions` devuelve 301 a `/fr/conditions` y termina en 200.
  - `/https:/winerim.wine/en/guides/how-to-train-staff-to-sell-wine` devuelve 301 a `/en/guides/how-to-train-staff-to-sell-wine` y termina en 200.
  - `/analiza-tu-carta` devuelve 301 a `/analisis-carta` y termina en 200.
  - `/simone-monese` devuelve 301 a `/article/simone-monese` y termina en 200.
  - `/carta-vinos-digital` devuelve 301 a `/software-carta-de-vinos` y termina en 200.
  - `/contacto-analizar-carta` devuelve 301 a `/analisis-carta` y termina en 200.
  - `/como-ser-sommelier-formacion-funciones-y-salidas-profesionales` devuelve 301 a `/decision-center/cursos` y termina en 200.
- Recalculada la muestra de 100 ejemplos visibles de 404 de Search Console tras el deploy:
  - 95 acaban en HTTP 200.
  - 3 acaban en HTTP 404.
  - 2 acaban en HTTP 410.
- Los 3 ejemplos que siguen en 404 son:
  - `/los-mejores-restaurantes-de-cataluna-para-disfrutar-del-vino/`;
  - `/kit-digital/`;
  - `/facturacion-y-contratos/`.
- Los 2 ejemplos que terminan en 410 son:
  - `/meet-our-winemaker-john-duo/`;
  - `/castillo-ygay-gran-reserva-especial-recognized-as-the-best-wine-in-the-world/`.
- `npm run deploy:worker:dry-run` vuelve a funcionar con la sesión renovada de Wrangler.

## Decisiones

- No forzar redirects para los 3 404 restantes de la muestra porque no tienen equivalente semántico claro documentado.
- Mantener 410 para contenidos antiguos sin equivalente útil cuando ya está configurado así.
- Considerar producción saneada para la muestra visible principal de 404, pero no iniciar validación en Search Console sin confirmación explícita.
- Mantener el script actual de dry-run como válido; para deploy real con Wrangler 4 se usó Node 24 del runtime por requisito de versión.

## Hipótesis

- El grupo 404 de Search Console debería mejorar tras el siguiente recrawl porque 95 de los 100 ejemplos visibles ya no terminan en 404.
- La validación 404 podría seguir fallando si Google prueba URLs no visibles en la primera muestra que aún acaban en 404.
- Los 3 404 restantes pueden dejarse como 404 hasta decidir si merecen 410 o un destino editorial específico.

## Tareas pendientes

- Esperar recrawl de Google para que Search Console actualice el grupo 404.
- Revisar más ejemplos si Search Console mantiene muchos 404 después del recrawl.
- Decidir si los 3 404 restantes de la muestra deben:
  - permanecer como 404;
  - responder 410;
  - redirigir a un destino nuevo si se define equivalencia real.
- Pedir confirmación explícita antes de iniciar `Validar corrección` del grupo 404.
- Pedir confirmación explícita antes de retirar `/sitemap_index.xml`.

## Actualización 2026-06-01: enlazado interno de hubs de biblioteca

## Hechos

- Al retomar la sesión se leyeron `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- El repo estaba limpio en `main` antes de empezar el bloque de enlazado interno.
- Se confirmó en código que las fichas detalle de uvas, regiones, estilos y maridajes ya renderizan `RelatedWineLibraryLinks` con relaciones entre entidades.
- Se creó `src/components/biblioteca/StrategicWineLibraryRoutes.tsx`.
- El nuevo componente expone rutas estratégicas por hub:
  - biblioteca principal;
  - uvas;
  - regiones;
  - estilos;
  - maridajes.
- Cada bloque conecta uvas, regiones, estilos y maridajes prioritarios mediante rutas curadas de alta intención, por ejemplo:
  - Tempranillo -> Rioja -> Ribera del Duero -> Tinto crianza;
  - Albariño -> Rías Baixas -> Godello -> Blanco con crianza sobre lías;
  - Ostras -> Pescados y mariscos -> Quesos -> Carnes rojas;
  - Champagne -> Espumoso -> Cava -> Xarel·lo.
- El componente resuelve nombres desde las fuentes localizadas de biblioteca y rutas con `getWineLibraryPath`, por lo que funciona también en `de` y `pt`.
- Se insertó el bloque en:
  - `src/pages/BibliotecaVino.tsx`;
  - `src/pages/GrapesHub.tsx`;
  - `src/pages/RegionsHub.tsx`;
  - `src/pages/StylesHub.tsx`;
  - `src/pages/PairingsHub.tsx`.
- En los hubs con filtros o búsqueda, el bloque se muestra solo en la vista inicial sin filtros para no interferir con la intención de búsqueda del usuario.
- Verificaciones ejecutadas:
  - `npm run test`: correcto, 35 tests pasan.
  - `npm run build`: correcto.
  - `git diff --check`: correcto.
  - `npx eslint src/components/biblioteca/StrategicWineLibraryRoutes.tsx src/pages/BibliotecaVino.tsx src/pages/GrapesHub.tsx src/pages/RegionsHub.tsx src/pages/StylesHub.tsx src/pages/PairingsHub.tsx`: correcto.
- `npm run lint` completo sigue fallando por deuda previa no relacionada con estos cambios, principalmente `no-explicit-any`, `no-empty-object-type`, `no-require-imports` y warnings de fast-refresh en archivos no tocados.
- Validación local en navegador sobre `http://127.0.0.1:8080`:
  - el bloque aparece en `/biblioteca-vino`;
  - las rutas estratégicas aparecen en `/biblioteca-vino/uvas`, `/biblioteca-vino/regiones`, `/biblioteca-vino/estilos` y `/biblioteca-vino/maridajes`;
  - `/de/weinbibliothek` genera enlaces localizados como `/de/weinbibliothek/rebsorten/tempranillo`;
  - `/pt/biblioteca-vinho` genera enlaces localizados como `/pt/biblioteca-vinho/castas/tempranillo`;
  - no se detectó overflow horizontal en desktop.

## Decisiones

- Reforzar primero los hubs de biblioteca porque reparten autoridad interna y ayudan al descubrimiento de URLs nuevas.
- No duplicar lógica en las fichas detalle, ya que esas páginas ya tenían relaciones internas.
- Usar rutas editoriales curadas en lugar de un listado automático masivo, para mantener relevancia semántica y evitar ruido.
- Mantener los bloques dentro de la experiencia editorial de biblioteca, no como CTAs comerciales agresivos.
- No solicitar indexación manual nueva por este cambio; el siguiente paso SEO debe ser desplegar, validar y monitorizar recrawl.

## Hipótesis

- El nuevo enlazado desde hubs debería mejorar descubrimiento, contexto semántico y reparto de autoridad hacia entidades prioritarias.
- El impacto en Search Console dependerá del despliegue en producción y del siguiente recrawl de Google.
- Las rutas nuevas deberían ayudar especialmente a URLs en estado `Descubierta: actualmente sin indexar`.
- Puede haber margen adicional en de/pt si se detectan nombres de platos o entidades que aún dependan de overlays incompletos.

## Tareas pendientes

- Hecho en actualización posterior del 2026-06-01: frontend y prerender de hubs estratégicos quedaron reflejados en producción.
- Validar producción tras deploy en:
  - `/biblioteca-vino`;
  - `/biblioteca-vino/uvas`;
  - `/biblioteca-vino/regiones`;
  - `/biblioteca-vino/estilos`;
  - `/biblioteca-vino/maridajes`;
  - `/de/weinbibliothek`;
  - `/pt/biblioteca-vinho`.
- Hecho en actualización posterior del 2026-06-01: las rutas estratégicas aparecen en HTML/prerender para bots.
- Monitorizar en Search Console si baja `Descubierta: actualmente sin indexar` y si suben impresiones long-tail de biblioteca.
- Mantener pendiente, con confirmación explícita, cualquier acción de `Validar corrección` 404 o retirada de `/sitemap_index.xml`.

## Actualización 2026-06-01: prerender de rutas estratégicas de biblioteca

## Hechos

- Al iniciar esta continuación se leyeron `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- El repositorio estaba en `main` y limpio respecto a `origin/main` antes de aplicar el nuevo ajuste.
- Producción ya tenía publicado el bundle frontend con `StrategicWineLibraryRoutes`, incluyendo textos y rutas para `es`, `en`, `it`, `fr`, `de` y `pt`.
- Se detectó una contradicción operativa: el frontend humano publicado sí incluía las rutas estratégicas, pero el HTML prerenderizado para Googlebot no las incluía en home ni hubs de biblioteca.
- Se corrigió `supabase/functions/prerender/index.ts` para que el prerender añada rutas estratégicas internas en:
  - Home de biblioteca del vino.
  - Hubs de uvas, regiones, estilos y maridajes.
  - Rutas localizadas `es`, `en`, `it`, `fr`, `de` y `pt`.
- La corrección añade grupos de rutas estratégicas en prerender y los conecta tanto en la rama estática de `/biblioteca-vino` como en el renderer dinámico de hubs.
- Commit creado y pusheado a `main`: `0c44042 fix: mirror wine library hub links in prerender`.
- Verificaciones locales completadas:
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts`.
  - `git diff --check`.
  - `npm run test`: 7 archivos, 35 tests.
  - `npm run build`.
  - Smoke test local con Googlebot contra la Edge Function en `/biblioteca-vino`, hubs ES y homes `de`/`pt`.
- Lovable desplegó explícitamente la Edge Function `prerender` tras pedirlo desde el chat del proyecto.
- Revalidación de producción como Googlebot completada:
  - `/biblioteca-vino`, `/biblioteca-vino/uvas`, `/biblioteca-vino/regiones`, `/biblioteca-vino/estilos` y `/biblioteca-vino/maridajes` responden 200 con `X-Worker-Branch: bot-prerender`, `X-Prerendered: true`, canonical propio, texto estratégico y enlaces internos.
  - `/en/wine-library` y `/en/wine-library/grapes` responden con texto y enlaces estratégicos localizados.
  - `/it/biblioteca-vino` y `/it/biblioteca-vino/vitigni` responden con texto y enlaces estratégicos localizados.
  - `/fr/bibliotheque-vin` y `/fr/bibliotheque-vin/cepages` responden con texto y enlaces estratégicos localizados.
  - `/de/weinbibliothek` y `/de/weinbibliothek/rebsorten` responden con texto y enlaces estratégicos localizados.
  - `/pt/biblioteca-vinho` y `/pt/biblioteca-vinho/castas` responden con texto y enlaces estratégicos localizados.
- No hizo falta redesplegar Cloudflare Worker ni publicar frontend adicional: la brecha estaba en `prerender` y producción quedó verde tras desplegar esa Edge Function.

## Decisiones

- Tratar el prerender como parte obligatoria del cierre SEO: un bloque visible en React no se considera publicado para SEO hasta que Googlebot lo recibe en HTML.
- Mantener por ahora la lista estratégica duplicada en React y `prerender` para resolver la urgencia de indexabilidad.
- No tocar Worker ni frontend cuando la revalidación productiva confirma que el cambio crítico ya está servido por `bot-prerender`.

## Hipótesis

- Al exponer rutas estratégicas internas en el HTML para bots, Google y crawlers de IA deberían descubrir mejor las entidades prioritarias de la biblioteca.
- Search Console puede tardar varios días en reflejar la mejora de rastreo e indexación.
- La siguiente mejora de mayor impacto será reducir duplicación entre frontend/prerender y seguir aumentando profundidad editorial/schema de entidades prioritarias.

## Tareas pendientes

- Monitorizar en Search Console el recrawl de `/biblioteca-vino` y hubs principales.
- Considerar extraer la matriz estratégica de biblioteca a una fuente compartida o generada para evitar divergencias entre React y `prerender`.
- Continuar el bloque de máximo nivel de biblioteca: más profundidad editorial, schema por entidad, enlaces por intención y priorización de URLs para indexación manual.

## Actualización 2026-06-01: cluster de blog para biblioteca del vino

## Hechos

- Al retomar esta continuación se revisaron los documentos fuente de verdad del proyecto antes de cerrar estado.
- Se confirmó que el blog usa Supabase `articles` como fuente principal y `src/data/articles.ts` solo como fallback si la tabla no devuelve contenido.
- Se confirmó que `ArticlePage` lee artículos desde Supabase por `slug`, con fallback a español para idiomas no disponibles.
- Se confirmó que `supabase/functions/prerender/index.ts` renderiza artículos desde la tabla `articles`, por lo que las mejoras de prerender afectan a artículos ya existentes y futuros.
- Antes del cambio, el prerender de artículos no exponía `related_links` ni enlaces markdown del cuerpo como enlaces internos detectables; solo añadía navegación genérica.
- Se mejoró `src/components/article/ArticleRelatedContent.tsx` para sugerir enlaces a biblioteca del vino, uvas, regiones y maridajes cuando el artículo trata vino, uvas, regiones o maridaje.
- Se mejoró `supabase/functions/prerender/index.ts` para construir enlaces internos de artículo desde:
  - `related_links` de la base de datos;
  - enlaces markdown presentes en el cuerpo;
  - reglas semánticas hacia biblioteca del vino, uvas, regiones, estilos, maridajes, análisis de carta y demo;
  - fallback genérico solo cuando no haya señales mejores.
- Se creó la migración `supabase/migrations/20260601093000_add_wine_library_blog_cluster.sql`.
- La migración añade, si falta, la columna `article_group` y publica 3 artículos españoles:
  - `biblioteca-vino-restaurante-vender-mas`;
  - `uvas-regiones-equipo-sala-vender-vino`;
  - `maridajes-carta-vinos-rentable`.
- Verificaciones locales completadas:
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts`;
  - `npm run test`: 7 archivos, 35 tests;
  - `npm run build`;
  - `npx eslint src/components/article/ArticleRelatedContent.tsx`;
  - `git diff --check`.
- Commit creado y pusheado a `main`: `cbe8a80 feat: add wine library blog cluster`.
- Lovable añadió además el commit remoto `cdd6e8f Apliqué la migración del blog`, con una migración SQL generada por Lovable para el mismo cluster.
- Quedan dos archivos de migración idempotentes para el cluster (`20260601075446_d8d6d927-c2fc-4a8b-bc75-2f7b34f3e59c.sql` y `20260601093000_add_wine_library_blog_cluster.sql`); ambos usan `ADD COLUMN IF NOT EXISTS` y `ON CONFLICT (slug) DO UPDATE`, por lo que no duplican artículos.
- Lovable desplegó la Edge Function `prerender` y aplicó la migración SQL en Supabase.
- Supabase público devuelve los 3 nuevos artículos como `published=true`, `lang=es` y `published_at` el 2026-06-01.
- Producción validada como Googlebot:
  - los 3 artículos responden HTTP 200;
  - `X-Worker-Branch: bot-prerender`;
  - `X-Prerendered: true`;
  - `Content-Type: text/html; charset=utf-8`;
  - títulos reales del artículo presentes;
  - enlaces HTML detectables hacia `/biblioteca-vino`, `/biblioteca-vino/uvas`, `/biblioteca-vino/regiones`, `/biblioteca-vino/maridajes`, `/analisis-carta` y `/demo`.
- `https://winerim.wine/sitemap.xml` responde 200 desde la rama `sitemap`, contiene 2.057 URLs y ya incluye los 3 nuevos artículos.
- No se detectaron contradicciones nuevas durante este cierre; sí se mantiene como riesgo operativo la duplicación de reglas entre frontend y prerender.

## Decisiones

- Sí conviene publicar artículos nuevos en el blog, pero como clusters tácticos de alta intención, no como volumen genérico.
- El primer cluster debe reforzar la biblioteca del vino y conectar contenido informacional con acciones comerciales: análisis de carta y demo.
- Los artículos nuevos deben incluir enlaces internos contextuales desde el cuerpo y `related_links`; el prerender debe exponerlos en HTML para bots.
- Empezar en español permite validar indexación, CTR y enlaces internos antes de traducir a `en`, `it`, `fr`, `de` y `pt`.
- No solicitar indexación masiva: priorizar una tanda corta de URLs estratégicas y monitorizar señales reales.

## Hipótesis

- Este cluster puede aumentar autoridad temática de la biblioteca del vino al conectar blog, hubs, entidades y herramientas comerciales.
- Los nuevos enlaces HTML en prerender deberían ayudar a Google y crawlers de IA a descubrir mejor la relación entre artículos y biblioteca.
- El impacto dependerá de que Google rastree el sitemap actualizado y de que Search Console permita solicitar indexación para una tanda reducida.
- Traducir los artículos sin validar primero el rendimiento español podría crear más URLs con señales débiles; conviene priorizar por datos.

## Tareas pendientes

- Solicitar indexación en Search Console, si la herramienta lo permite, para:
  - `/article/biblioteca-vino-restaurante-vender-mas`;
  - `/article/uvas-regiones-equipo-sala-vender-vino`;
  - `/article/maridajes-carta-vinos-rentable`;
  - `/biblioteca-vino`;
  - `/biblioteca-vino/uvas`;
  - `/biblioteca-vino/regiones`;
  - `/biblioteca-vino/maridajes`.
- Monitorizar en Search Console impresiones, CTR, cobertura e indexación de los 3 artículos.
- Decidir el siguiente cluster editorial por datos: gestión de carta, maridajes rentables, formación de sala, regiones estratégicas o comparativas de software.
- Traducir a otros idiomas solo los artículos que muestren potencial o que refuercen rutas internacionales prioritarias.
- Considerar una fuente compartida para reglas de enlaces internos entre React y `prerender`.
- No crear una tercera migración para estos mismos 3 artículos; si se limpia la redundancia, hacerlo como tarea explícita y revisando historial de migraciones aplicadas.

## Actualización 2026-06-01: artículos localizados y salto de idioma en blog

## Hechos

- El usuario señaló dos problemas nuevos:
  - los artículos estratégicos deberían publicarse en todos los idiomas, adaptados a mercado/país;
  - al navegar por la web, sobre todo en blog, la experiencia saltaba al español.
- Se revisaron de nuevo los documentos fuente de verdad antes de actuar.
- Se detectó la causa principal del salto de idioma:
  - `Blog.tsx` y `SommelierCorner.tsx` enlazaban artículos traducidos a `/article/{slug}` sin prefijo de idioma;
  - al entrar en `/article/{slug}`, `LanguageProvider` detectaba `es` porque la ruta no llevaba `/en`, `/it`, `/fr`, `/de` o `/pt`.
- Se añadió `src/lib/articleRoutes.ts` para centralizar:
  - eliminación de sufijos `_en`, `_it`, `_fr`, `_de`, `_pt`;
  - inferencia de idioma desde slugs legacy;
  - construcción de slugs de base de datos;
  - construcción de rutas localizadas limpias `/{lang}/article/{slug}`.
- `Blog.tsx` ahora enlaza artículos en el idioma activo:
  - español: `/article/{slug}`;
  - otros idiomas: `/{lang}/article/{slug}`.
- `SommelierCorner.tsx` aplica el mismo patrón para entrevistas traducidas.
- `ArticlePage.tsx` ahora:
  - busca en Supabase el slug correcto por idioma;
  - soporta rutas legacy `/article/{slug}_en` y rutas limpias `/en/article/{slug}`;
  - canonicaliza artículos traducidos hacia la ruta limpia localizada;
  - mantiene enlaces de vuelta al blog/Sommelier del idioma solicitado;
  - ajusta `document.documentElement.lang` al idioma real del artículo cargado.
- `LanguageSwitcher.tsx` reconoce rutas de artículo y conserva el slug base al cambiar de idioma.
- `supabase/functions/prerender/index.ts` ahora entiende rutas de artículos localizadas `/{lang}/article/{slug}`, renderiza el slug correcto de Supabase y canonicaliza a la URL localizada limpia.
- `supabase/functions/sitemap/index.ts` ahora consulta `lang` en artículos y emite:
  - `/article/{slug}` para español;
  - `/{lang}/article/{slug}` para artículos internacionales.
- Se creó la migración `supabase/migrations/20260601102000_add_localized_wine_library_blog_cluster.sql`.
- La migración añade 15 artículos localizados/adaptados para el cluster de biblioteca del vino:
  - `en`, `it`, `fr`, `de` y `pt`;
  - 3 temas por idioma: biblioteca del vino, uvas/regiones/castas/rebsorten/cépages y maridajes/abbinamenti/accords/harmonizações/Weinbegleitung.
- Los contenidos se adaptaron con ejemplos de mercado:
  - inglés: UK/internacional;
  - italiano: Italia, Piemonte, Toscana, Veneto;
  - francés: Francia, Bourgogne, Loire, Champagne;
  - alemán: DACH, Riesling, Spätburgunder, Mosel/Rheingau/Wachau;
  - portugués: Portugal, Douro, Dão, Alentejo, Vinho Verde.
- Verificaciones locales completadas:
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`;
  - `npm run test`: 8 archivos, 38 tests;
  - `npx eslint src/lib/articleRoutes.ts src/pages/Blog.tsx src/pages/ArticlePage.tsx src/pages/SommelierCorner.tsx src/components/LanguageSwitcher.tsx`;
  - `npm run build`;
  - `git diff --check`.
- No se pudo hacer QA de navegación visual con el navegador integrado porque el backend `iab` no estaba disponible.
- No se pudo hacer QA headless con Playwright porque `playwright`, `@playwright/test`, `puppeteer` y `puppeteer-core` no están instalados en el repo.
- Commit creado y pusheado a `main`: `9eb4b76 fix: localize blog article routes`.
- Supabase público todavía no devuelve las versiones `_en`, `_it`, `_fr`, `_de` y `_pt` del nuevo cluster; por tanto, la migración está lista en GitHub pero pendiente de aplicar desde Lovable.
- Producción todavía requiere despliegue Lovable de:
  - frontend;
  - Edge Function `prerender`;
  - Edge Function `sitemap`;
  - migración SQL `20260601102000_add_localized_wine_library_blog_cluster.sql`.

## Decisiones

- Sí, los artículos estratégicos deben publicarse en todos los idiomas relevantes, pero con adaptación real de mercado y no como traducción literal.
- Antes de escalar artículos internacionales, había que corregir la raíz técnica del salto a español.
- La URL pública canónica de artículos internacionales pasa a ser `/{lang}/article/{slug}`, aunque la base de datos conserve slugs con sufijo `{slug}_{lang}`.
- Mantener compatibilidad con slugs legacy como `/article/{slug}_en`, pero canonicalizarlos a la ruta limpia.
- No considerar publicadas las adaptaciones internacionales hasta que Lovable aplique la migración y despliegue `sitemap`/`prerender`.

## Hipótesis

- El salto al español en blog debería desaparecer tras desplegar el frontend porque los enlaces ya mantienen el prefijo de idioma.
- El prerender localizado de artículos debería evitar que bots reciban home genérica o canonical español en rutas internacionales.
- Las adaptaciones por mercado deberían reforzar SEO internacional y posicionamiento en LLMs más que traducciones literales.
- El sitemap localizado de artículos debería mejorar descubrimiento de las nuevas URLs internacionales tras despliegue.

## Tareas pendientes

- Publicar desde Lovable el commit `9eb4b76`.
- Aplicar desde Lovable la migración `20260601102000_add_localized_wine_library_blog_cluster.sql`.
- Desplegar explícitamente Edge Functions `prerender` y `sitemap`.
- Revalidar producción tras deploy:
  - `/en/blog` debe enlazar a `/en/article/...`;
  - `/it/blog`, `/fr/blog`, `/de/blog` y `/pt/blog` deben mantener su idioma al abrir artículos;
  - Googlebot en `/{lang}/article/biblioteca-vino-restaurante-vender-mas` debe recibir `bot-prerender`, `html lang` correcto y canonical localizado;
  - `sitemap.xml` debe incluir las 15 rutas localizadas nuevas.
- Después de validar producción, solicitar indexación selectiva de los artículos internacionales prioritarios, no indexación masiva.
