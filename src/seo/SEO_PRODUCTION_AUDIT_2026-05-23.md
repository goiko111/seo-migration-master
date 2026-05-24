# Auditoría SEO Producción - 2026-05-23

## Alcance

### Hechos

- Se auditó `https://winerim.wine` en producción como Googlebot.
- Se rastreó el sitemap público completo: `https://winerim.wine/sitemap.xml`.
- Se revisaron `robots.txt`, `llms.txt`, canonicals, hreflang, prerender, estado HTTP, títulos, H1 y contenido visible en HTML.
- No se pudo auditar Search Console privada directamente en esta sesión porque no había acceso/exportación disponible desde la conversación.
- Resultado del crawl de sitemap:
  - URLs en sitemap: 2.989.
  - URLs únicas: 2.989.
  - HTTP 200: 2.455.
  - HTTP 404: 534.
  - `bot-prerender`: 2.333.
  - `bot-fallback`: 122.
  - Sitemap sin URLs duplicadas.

### Hipótesis

- Los problemas detectados deberían aparecer en Search Console como mezcla de `Submitted URL not found (404)`, `Duplicate without user-selected canonical`, canonicals inesperadas, páginas descubiertas/rastreadas pero no indexadas, y posibles avisos de hreflang.
- La mayoría de errores son de coordinación entre sitemap, Worker Cloudflare y prerender Supabase/Lovable, no de React puro.

## Hallazgos Prioritarios

### P0 - 534 URLs del sitemap devuelven 404

### Hechos

- El sitemap publica 534 URLs que producción corta con `HTTP 404`, `X-Worker-Branch: not-found` y `X-Robots-Tag: noindex`.
- Desglose:
  - 222 páginas de familia uva/variedad: prefijos `grape-`, `uva-`, `vitigno-`, `rebsorte-`, `cepage-`, `casta-`.
  - 303 páginas de cursos: prefijos `curso-vino-`, `curso-vinho-`, `wine-course-`, `corso-vino-`, `cours-vin-`, `weinkurs-`.
  - 3 páginas de región: prefijos `region-vinicola-`, `wine-region-`, `regione-vinicola-`, `regiao-vinicola-`, `weinregion-`.
  - 6 páginas portuguesas de ciudad con prefijo `software-carta-vinhos-`.
- Ejemplos:
  - `/rebsorte-zinfandel-primitivo`
  - `/grape-moscato-muscat`
  - `/curso-vino-cata-mw-examen-practico`
  - `/wine-course-bordeaux-profundidad`
  - `/software-carta-vinhos-lisboa`
- Causa en código:
  - `supabase/functions/sitemap/index.ts` emite todas las filas publicadas de `seo_pages` como `/${page.slug}`.
  - `cloudflare-worker-v3-hybrid.js` solo deja pasar rutas exactas, prefijos conocidos y algunos comodines SEO.
  - Las familias anteriores no están incluidas en `SEO_WILDCARD_PREFIXES`, así que el Worker devuelve 404 antes de llegar al prerender.

### Decisión Recomendada

- Corregir primero la fuente de verdad entre sitemap y Worker:
  - Opción A: no publicar en sitemap ninguna `seo_page` que el Worker no pueda resolver.
  - Opción B: ampliar `SEO_WILDCARD_PREFIXES`/routing para que esas familias lleguen a prerender, validando que existan y tengan contenido útil.
- Para SEO, la opción segura inmediata es excluir o filtrar lo no resoluble; la opción de crecimiento es hacerlas resolubles solo si tienen contenido no thin y canonicals correctas.

### P0 - 122 URLs 200 caen en `bot-fallback`

### Hechos

- 122 URLs del sitemap responden HTTP 200, pero Googlebot recibe la SPA genérica en vez de HTML prerenderizado específico.
- Desglose:
  - 95 URLs `wine-list-software-*`.
  - 27 URLs `software-carta-de-vinos-*`.
- Ejemplo observado:
  - `/software-carta-de-vinos-avila` responde `X-Worker-Branch: bot-fallback`.
  - Título recibido por Googlebot: `Winerim – Carta Inteligente de Vinos para Restaurantes`.
  - Canonical recibido por Googlebot: `/`.
- Impacto probable:
  - Muchas páginas de ciudad compiten con homepage o quedan como duplicadas/canonicalizadas a home.
  - Search Console puede informar canónicas elegidas por Google distintas, contenido duplicado o páginas rastreadas no indexadas.

### Decisión Recomendada

- Revisar si esas filas existen y están `published=true` en `seo_pages`.
- Si existen, alinear prerender desplegado para que renderice la página específica.
- Si no existen o son thin, retirarlas del sitemap o redirigirlas a una versión canónica real.

### P1 - Hreflang incoherente entre sitemap y HTML prerenderizado

### Hechos

- El sitemap declara alternates `es`, `en`, `it`, `fr`, `de`, `pt` y `x-default` para muchas rutas multilingües.
- El HTML prerenderizado de varias páginas estáticas solo devuelve `es`, `en`, `it`, `fr` y `x-default`, o incluso menos.
- Conteo del crawl: 156 URLs con hreflang esperado en sitemap ausente en HTML.
- Ejemplos:
  - `/`, `/en`, `/de`, `/pt`: faltan `de` y `pt` en HTML.
  - `/blog`: sitemap espera alternates completos, HTML no devuelve alternates.
  - `/contacto`: faltan `de`, `fr`, `pt` en HTML.
- Causa en código:
  - `supabase/functions/sitemap/index.ts` usa `hreflangBlock` con `['es', 'en', 'it', 'fr', 'de', 'pt']`.
  - `supabase/functions/prerender/index.ts` mantiene `HREFLANG_MAP` manual para muchas páginas y varias entradas no incluyen `de`/`pt`.

### Decisión Recomendada

- Generar `HREFLANG_MAP` desde la misma `ROUTE_MAP` que usa sitemap, o crear una tabla única compartida por sitemap/prerender.
- Si una página no existe realmente en un idioma, marcarla como no multilingüe en sitemap y no declarar alternate.

### P1 - Canonicals incorrectas en páginas incluidas en sitemap

### Hechos

- 276 URLs HTTP 200 presentan canonical distinta de su URL de sitemap.
- Grupos principales:
  - Localizadas estáticas que caen a homepage: `/en`, `/it`, `/fr`, `/de`, `/pt`, `/en/blog`, etc.
  - 122 páginas de ciudad en `bot-fallback`.
  - 12 recursos y 12 benchmarks/playbooks en sitemap que Googlebot ve como homepage.
- Ejemplos:
  - `/recursos/plantilla-carta-de-vinos` canonicaliza a `/`.
  - `/benchmarks-playbooks/benchmark-referencias-por-tipo-restaurante` canonicaliza a `/`.
  - `/en/pricing` canonicaliza a `/`.

### Decisión Recomendada

- No dejar en sitemap URLs cuyo HTML de bot canonicaliza a home salvo que esa sea una consolidación intencional.
- Añadir prerender específico para recursos, benchmarks y localizadas estáticas, o excluirlas temporalmente del sitemap.

### P1 - `llms.txt` está anunciado como sitemap en `robots.txt`

### Hechos

- `robots.txt` declara:
  - `Sitemap: https://winerim.wine/sitemap.xml`
  - `Sitemap: https://winerim.wine/llms.txt`
- `https://winerim.wine/llms.txt` responde `text/plain`, no XML.

### Decisión Recomendada

- Mantener `llms.txt` accesible, pero retirar la línea `Sitemap: https://winerim.wine/llms.txt` de `robots.txt`.
- Search Console espera XML en sitemaps; `llms.txt` no debe enviarse como sitemap.

### P2 - Biblioteca del vino: legacy shortcuts con títulos/H1 genéricos

### Hechos

- La biblioteca del vino no tiene 404 en sitemap: 1.470 URLs auditadas y 1.470 HTTP 200.
- Las rutas nuevas por sección funcionan con prerender y hreflang correcto.
- Hay 96 páginas legacy de biblioteca con título/H1 genérico:
  - 16 por idioma para `es`, `en`, `it`, `fr`, `de`, `pt`.
  - Ejemplos: `/biblioteca-vino/borgona`, `/biblioteca-vino/cabernet-sauvignon`, `/en/wine-library/borgona`.
- Esas páginas se interpretan como hubs por el prerender porque no incluyen sección (`uvas`, `regiones`, `estilos`, `maridajes`), por eso generan títulos tipo `Biblioteca de vino | Winerim` en vez de un título específico.

### Decisión Recomendada

- Elegir una estrategia:
  - Redirigir legacy shortcuts a rutas canónicas por sección.
  - O renderizarlas con metadatos propios si se quieren conservar como URLs indexables.
- Para máxima calidad, conviene evitar dos URLs indexables para la misma entidad.

### P2 - Contenido thin en hubs, guías y herramientas

### Hechos

- 65 páginas HTTP 200 tienen menos de 120 palabras en HTML prerenderizado.
- Grupos:
  - Hubs de biblioteca, especialmente `de`.
  - Guías y herramientas.
  - Algunas páginas de contacto/demo/integraciones/clientes.

### Decisión Recomendada

- Ampliar primero las páginas que se quieren indexar.
- Para páginas transaccionales necesarias pero pobres en texto, no forzar contenido; revisar intención y canonical/noindex según caso.

## Search Console

### Hechos

- No hubo acceso directo a Search Console durante esta sesión.
- La auditoría pública ya detecta errores que Search Console debería reflejar.

### Datos Necesarios Para Cruce Profundo

- Exportación de `Páginas` / indexación con motivo de exclusión.
- Exportación de `Sitemaps` con estado del sitemap principal.
- Exportación de `Rendimiento` de los últimos 16 meses:
  - consultas,
  - páginas,
  - países,
  - dispositivos,
  - fechas.
- Exportación de inspección de URLs prioritarias:
  - `/`,
  - `/biblioteca-vino`,
  - `/de/weinbibliothek/rebsorten/tempranillo`,
  - `/pt/biblioteca-vinho/castas/albarino`,
  - una URL 404 del sitemap,
  - una URL `bot-fallback` de ciudad.
- Informes de experiencia/Core Web Vitals y enlaces internos si están disponibles.

## Plan Recomendado

### Tareas Pendientes

1. Corregir sitemap vs Worker para eliminar los 534 404 enviados.
2. Corregir las 122 páginas `bot-fallback` o retirarlas del sitemap.
3. Unificar hreflang entre sitemap y prerender, incluyendo `de`/`pt` solo donde existan rutas reales.
4. Corregir canonicals de recursos, benchmarks/playbooks y localizadas estáticas que caen a `/`.
5. Retirar `llms.txt` como sitemap de `robots.txt`.
6. Resolver legacy shortcuts de biblioteca del vino con redirects o metadatos únicos.
7. Reenviar sitemap en Search Console y pedir validación de correcciones.
8. Cuando Search Console esté disponible, cruzar los hallazgos con impresiones, clics, indexación y canónica elegida por Google.
