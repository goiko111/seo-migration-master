# Auditoría de Contenido, SEO Semántico y LLMs - 2026-05-23

## Alcance

### Hechos

- Se analizó `https://winerim.wine` a nivel de contenido público, SEO semántico y preparación para LLMs/AI search.
- Se reutilizó el crawl completo de sitemap como Googlebot: 2.989 URLs.
- Se revisaron:
  - Arquitectura de contenidos por tipo de página.
  - Duplicación de títulos/H1/descripciones.
  - Profundidad de contenido.
  - Idioma declarado vs idioma real.
  - Datos estructurados.
  - `robots.txt` y `llms.txt`.
  - Señales externas visibles en buscador.
  - Subdominio indexable `analisis.winerim.wine`.
- Search Console privada sigue pendiente: no hubo acceso/exportación directa.

## Diagnóstico Ejecutivo

### Hechos

- Winerim tiene una propuesta semántica clara: software de IA para carta de vinos, ventas, margen, stock, pricing, maridaje y analítica en restauración.
- La home, herramientas, pricing, producto y biblioteca construyen una entidad fuerte para "AI wine list software" y "software carta de vinos".
- La base actual es prometedora para LLMs porque:
  - `robots.txt` permite crawlers de IA relevantes.
  - Hay HTML prerenderizado para muchas URLs.
  - Hay `Organization`, `SoftwareApplication`, `Article`, `FAQPage` y `BreadcrumbList`.
  - Existen menciones externas útiles como TecnoVino y F6S.
- El problema principal es que la señal semántica se diluye por errores de indexabilidad, idioma, canonicals y duplicación.

### Hipótesis

- Si un LLM rastrea ahora la web, aprenderá bastante bien que Winerim es una plataforma de carta de vinos con IA.
- También puede aprender señales confusas:
  - Páginas EN/IT/FR/DE/PT que para bots son la home española.
  - Artículos internacionales con `html lang="es"`.
  - URLs antiguas indexadas que hoy devuelven 404.
  - `llms.txt` demasiado superficial.

## Contenido Por Tipo de Página

### Home y Páginas Producto

#### Hechos

- La home pública comunica con claridad:
  - Carta inteligente de vinos.
  - Recomendador IA.
  - Optimización de márgenes.
  - Stock/bodega.
  - Maridajes automáticos.
  - Analítica.
- La home tiene contenido suficiente para entidad/marca, pero Search/LLM puede ver versiones distintas según crawler:
  - Navegación pública y search result muestran contenido largo y rico.
  - Googlebot recibe una versión prerenderizada más condensada.
- La propuesta de valor está bien alineada con queries de intención comercial.

#### Riesgos

- Hay claims numéricos fuertes, por ejemplo aumento de ticket medio, reducción de stock muerto y ahorro de horas. Conviene respaldarlos con casos/benchmarks enlazables y datos fechados.
- Varias páginas localizadas estáticas no reciben su contenido específico en prerender.

### Páginas Localizadas Estáticas

#### Hechos

- 128 rutas localizadas estáticas auditadas entregan a bots el título de home española:
  - `Software de IA para Restaurantes — Vende Más Vino | Winerim`.
- Ejemplos:
  - `/en`
  - `/en/blog`
  - `/en/pricing`
  - `/de/preise`
  - `/pt/precos`
- Estas URLs responden HTTP 200 y `bot-prerender`, pero canonicalizan a `/` y usan `html lang="es"`.

#### Impacto SEO/LLM

- Google y LLMs reciben una página equivocada para idiomas y secciones.
- Daña hreflang, canónicas, snippets internacionales y comprensión multilingüe.
- Hace que las páginas internacionales parezcan duplicados de la home.

### Biblioteca del Vino

#### Hechos

- Biblioteca auditada:
  - 1.470 URLs.
  - 1.470 HTTP 200.
  - 0 `bot-fallback`.
  - 0 canonical mismatch.
  - 0 hreflang esperado ausente.
- Profundidad:
  - Media: 185 palabras.
  - Mediana: 182 palabras.
  - 27 páginas con menos de 120 palabras.
- La arquitectura nueva de biblioteca está técnicamente mucho mejor que el resto del sitio.

#### Riesgos

- La profundidad promedio todavía es baja para competir en consultas informacionales fuertes.
- Hay legacy shortcuts con títulos/H1 genéricos.
- Se detectaron grupos duplicados de 16 páginas por idioma con títulos tipo:
  - `Biblioteca de vino | Winerim`
  - `Wine library | Winerim`
  - `Weinbibliothek | Winerim`
  - `Biblioteca do vinho | Winerim`

#### Oportunidad

- La biblioteca es la mejor base para GEO/LLM si se convierte cada entidad en una ficha "answer-ready":
  - definición breve,
  - perfil sensorial,
  - servicio,
  - maridaje,
  - rol en carta,
  - errores comunes,
  - FAQs,
  - enlaces a regiones/estilos/maridajes,
  - schema de entidad.

### Artículos

#### Hechos

- Artículos auditados:
  - 422 URLs.
  - Media: 779 palabras.
  - Mediana: 775 palabras.
  - 6 artículos thin alrededor de 105-121 palabras.
- Distribución por sufijo:
  - 102 artículos sin sufijo.
  - 64 `_en`.
  - 64 `_it`.
  - 64 `_fr`.
  - 64 `_de`.
  - 64 `_pt`.
- Problema crítico:
  - Los 320 artículos con sufijo internacional tienen `html lang="es"`.
  - El prerender `renderArticle` fija `lang: 'es'` para todos los artículos.

#### Impacto SEO/LLM

- Google y LLMs reciben señales lingüísticas erróneas.
- Puede perjudicar snippets, clasificación internacional, accesibilidad y agrupación semántica.
- Los artículos traducidos parecen contenido español con texto en otro idioma.

### Guías, Recursos y Herramientas

#### Hechos

- Grupo `blog/guias/herramientas/recursos/benchmarks-playbooks` auditado:
  - 52 URLs.
  - Media: 272 palabras.
  - Mediana: 153 palabras.
  - 23 páginas con menos de 120 palabras.
  - 24 canonical mismatches.
- Varias guías individuales tienen 90-110 palabras en HTML prerenderizado.
- Recursos y benchmarks/playbooks incluidos en sitemap pueden canonicalizar a `/`.

#### Impacto

- Hay demasiadas páginas que parecen "placeholder SEO" para Google/LLM.
- Recursos y benchmarks son valiosos para autoridad, pero si canonicalizan a home no consolidan tema propio.

### Programmatic SEO / Ciudades

#### Hechos

- 344 páginas programáticas de ciudad auditadas.
- 122 caen en `bot-fallback`.
- Media: 278 palabras.
- Mediana: 232 palabras.

#### Impacto

- Parte de la estrategia local/long-tail no está entregando contenido específico a bots.
- Las URLs que funcionan tienen contenido justo; necesitan más diferenciación real por país/ciudad/segmento.

### Subdominio `analisis.winerim.wine`

#### Hechos

- `https://analisis.winerim.wine/` responde HTTP 200.
- Está permitido por robots.
- Tiene título `winerim-analisis`.
- Meta description: `Winerim - La reVINOlución`.
- No tiene canonical visible.
- HTML inicial detectado: 1 palabra.
- Aparece en búsqueda pública para marca Winerim.

#### Impacto

- Es una landing indexable con señal SEO muy débil.
- Puede competir con la home para búsquedas de marca o generar una impresión pobre en LLMs.

## Posicionamiento En LLMs / AI Search

### Fortalezas

- `robots.txt` permite explícitamente:
  - `GPTBot`,
  - `ChatGPT-User`,
  - `Google-Extended`,
  - `ClaudeBot`,
  - `PerplexityBot`,
  - `Cohere-AI`.
- `llms.txt` existe en `/llms.txt`.
- Hay datos estructurados amplios:
  - `Organization`: 2.455 páginas auditadas.
  - `Article`: 2.004 apariciones.
  - `FAQPage`: 1.859 apariciones.
  - `BreadcrumbList`: 2.333 apariciones.
  - `SoftwareApplication`: 283 apariciones.
- La entidad Winerim tiene menciones externas:
  - TecnoVino describe la plataforma y su uso en tablets/móviles para restaurantes.
  - F6S describe Winerim como SaaS digital wine list/recommendation platform.
- La marca tiene alta claridad semántica en torno a:
  - digital wine list,
  - AI recommendations,
  - food and wine pairing,
  - inventory/stock,
  - analytics,
  - restaurant wine sales.

### Debilidades

- `llms.txt` es demasiado corto:
  - No lista páginas prioritarias.
  - No agrupa contenidos por intención.
  - No enlaza a biblioteca, pricing, producto, herramientas, casos, artículos clave ni recursos.
  - No existe `llms-full.txt`.
- `llms.txt` está declarado como `Sitemap` en `robots.txt`, lo cual no corresponde.
- La señal lingüística es confusa:
  - 128 páginas localizadas estáticas reciben home española para bots.
  - 320 artículos internacionales declaran `html lang="es"`.
- Hay muchas URLs enviadas con 404 o canonical a home.
- Algunos claims comerciales no están soportados por páginas de evidencia estructuradas.

### Hipótesis

- Winerim podría aparecer bien en respuestas LLM de marca o de categoría muy específica.
- Para consultas genéricas competitivas, por ejemplo "best AI wine list software for restaurants", la señal actual compite contra Decanta.ai, Winevizer, WineConnect, WineFinder.ai, Wineater y otros actores visibles en buscador.
- La estrategia de LLMs debería centrarse menos en "meter más keywords" y más en construir un mapa de conocimiento consistente, citable y sin contradicciones.

## Señales Externas Observadas

### Hechos

- En búsqueda pública para queries de marca y categoría, Winerim aparece con la home y algunas páginas internas.
- Para queries de categoría aparecen competidores junto a Winerim:
  - Decanta.ai.
  - Winevizer.
  - WineConnect.
  - WineFinder.ai.
  - Wineater.
  - VINU.
- Hay menciones externas útiles:
  - TecnoVino, artículo de enero de 2021.
  - F6S, ficha de software.
- También aparecen URLs antiguas o débiles:
  - `/terms-of-service/` indexada pero hoy redirige a `/terms-of-service` y termina en 404.
  - `/reviews-restaurante/` indexada pero hoy termina en 404.
  - `/landing/` indexada pero hoy termina en 404.
  - `/por-que-los-jovenes-no-beben-vino-en-los-restaurantes/` indexada pero hoy termina en 404 sin trailing slash.

## Prioridades Recomendadas

### P0 - Antes de ampliar contenido

1. Corregir sitemap/Worker/prerender para que no haya URLs enviadas con 404.
2. Corregir `bot-fallback` en páginas programáticas.
3. Corregir prerender de rutas localizadas estáticas para que cada idioma entregue su contenido, canonical y `html lang`.
4. Corregir artículos internacionales para que `html lang`, `inLanguage`, canonical y, si procede, rutas `/en/article/...` coincidan.
5. Retirar `llms.txt` como sitemap en `robots.txt`.

### P1 - LLMs y GEO

1. Rehacer `llms.txt` como mapa curado en Markdown:
   - quién es Winerim,
   - qué problemas resuelve,
   - producto,
   - pricing,
   - herramientas,
   - biblioteca,
   - casos,
   - guías principales,
   - páginas por idioma.
2. Crear `llms-full.txt` con resúmenes extendidos y enlaces a contenido prioritario.
3. Añadir una página "About / Entity Profile" muy explícita:
   - empresa,
   - producto,
   - categoría,
   - países/idiomas,
   - clientes/tipos de cliente,
   - pruebas y fuentes.
4. Crear páginas comparativas honestas:
   - Winerim vs carta QR/PDF.
   - Winerim vs carta digital básica.
   - Winerim vs software de inventario.
   - Winerim vs recomendador genérico de vino.
5. Crear páginas de evidencia:
   - resultados por caso,
   - metodología de cálculo,
   - benchmarks de carta,
   - glosario de métricas.

### P2 - Biblioteca Del Vino A Máximo Nivel

1. Resolver shortcuts legacy antes de crear nuevas entidades.
2. Convertir cada entidad prioritaria en ficha answer-ready.
3. Añadir schema más específico:
   - `DefinedTerm` para uvas, estilos y conceptos.
   - `ItemList` para hubs.
   - `FAQPage` solo donde haya preguntas reales visibles.
   - `Article` con `inLanguage` correcto.
4. Profundizar primero:
   - uvas de alta intención,
   - regiones comerciales,
   - estilos de servicio,
   - maridajes operativos.
5. Crear hubs de intención:
   - "qué vino recomendar con...",
   - "cómo vender más...",
   - "temperatura y servicio de...",
   - "margen y rotación por estilo".

## Próximo Bloque De Trabajo Propuesto

### Tareas Pendientes

1. Implementar fix de prerender para localizadas estáticas.
2. Implementar fix de idioma en artículos internacionales.
3. Rehacer `llms.txt` y añadir `llms-full.txt`.
4. Limpiar/redirect de URLs legacy indexadas.
5. Después, re-auditar crawl completo y comparar:
   - 404,
   - canonicals,
   - hreflang,
   - idioma,
   - duplicados,
   - contenido thin.
