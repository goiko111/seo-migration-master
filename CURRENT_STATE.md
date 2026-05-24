# Current State

## Hechos

- Fecha de actualización: 2026-05-24.
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
- Resolver legacy shortcuts de biblioteca del vino con redirects canónicos o metadatos únicos.
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
