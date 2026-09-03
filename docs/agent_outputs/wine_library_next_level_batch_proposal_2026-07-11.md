# Propuesta implementable: Biblioteca del vino, lote next-level 2026-08

Fecha de preparacion: 2026-07-11
Agente: Biblioteca del vino
Scope: propuesta editorial y tecnica. No modifica migraciones reales, sitemap, prerender, Worker ni llms.

## 1. Lectura de arquitectura existente

### Biblioteca del vino como entidades

La Biblioteca del vino vive como superficie evergreen de entidades en React y en prerender:

- Hub: `/biblioteca-vino` y rutas localizadas (`/en/wine-library`, `/de/weinbibliothek`, `/pt/biblioteca-vinho`, etc.).
- Entidades: uvas, regiones, estilos, maridajes, guia de servicio y glosario.
- Frontend principal: `src/pages/BibliotecaVino.tsx`, `src/pages/BibliotecaDetalle.tsx`, componentes bajo `src/components/biblioteca/`.
- Localizacion de rutas de Biblioteca: `src/data/wineLibraryRoutes.ts` y estructuras equivalentes en `supabase/functions/prerender/index.ts`.
- Sitemap/prerender: `WINE_LIBRARY_DYNAMIC_ROUTES`, `renderWineLibraryPage`, `resolveWineLibraryPath`, `wineLibraryHreflang`.
- Guardrail: `src/test/wine-library-seo-surface.test.ts`.

Conclusion: el siguiente lote no deberia crear slugs de entidad nuevos si no hay mapa completo de React, sitemap, prerender, Worker y redirects. Para avanzar rapido y seguro, conviene usar `public.articles` como capa editorial conectada a entidades existentes.

### Articulos editoriales

Los lotes recientes de Biblioteca/Aprender usan `public.articles`:

- Slug canonico DB en ES sin sufijo; variantes internacionales con sufijo DB: `_en`, `_it`, `_fr`, `_de`, `_pt`.
- Ruta publica localizada:
  - ES: `/article/{baseSlug}`
  - EN/IT/FR/DE/PT: `/{lang}/article/{baseSlug}`
- `src/lib/articleRoutes.ts` elimina el sufijo DB para construir la URL publica.
- `ArticlePage` consulta Supabase con `published=true` y `published_at <= now()`.
- `article_group` agrupa traducciones y permite `hreflang`.
- `related_links` alimenta enlaces manuales y conversion.

Patron de migracion:

- `ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS lang TEXT DEFAULT 'es';`
- `ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS article_group TEXT;`
- `ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS related_links jsonb DEFAULT '[]'::jsonb;`
- `WITH rows (...) AS (VALUES (...))`
- `INSERT INTO public.articles (...) SELECT ... FROM rows ON CONFLICT (slug) DO UPDATE SET ...`
- `author='Winerim'`, `published=true`, `published_at` programado.

### Release gating

Hay tres protecciones vigentes:

- DB/REST: `published_at <= now()` en frontend, sitemap y prerender.
- Edge Functions: `ARTICLE_RELEASES` y `LINK_RELEASES` para bloquear slugs/links futuros.
- Worker: `WORKER_LINK_RELEASES`, `stripUnreleasedSitemapUrls` y `future-article-not-found`.

Regla recomendada: si el lote se aplica con mucha antelacion, anadir release constants en `supabase/functions/prerender/index.ts`, `supabase/functions/sitemap/index.ts` y `cloudflare-worker-v3-hybrid.js`. Si se aplica cerca de la fecha de publicacion, `published_at` puede bastar, pero el historial del proyecto favorece doble proteccion.

### llms

`public/llms.txt` y `public/llms-full.txt` no deben listar articulos futuros. Se actualizan el dia de liberacion o despues de validar que las URLs ya devuelven contenido real, canonical propio y `hreflang`.

## 2. Propuesta editorial

Objetivo: llevar Biblioteca del vino del nivel "consulta de entidades" al nivel "grafo operativo de decision". El lote no compite con Aprender vino: Biblioteca sigue siendo referencia estructurada; los articulos explican como conectar uvas, regiones, estilos y maridajes con decisiones de carta, sustitucion, stock, margen y servicio.

Recomendacion: preparar tres grupos editoriales semanales, cada uno en seis idiomas. Si se quiere una implementacion conservadora, empezar solo por el Grupo 1.

## 3. Grupos propuestos

### Grupo 1: mapa de sustituciones

Article group: `wine-library-substitution-map-restaurant`

Fecha:

- ES: `2026-08-03T09:00:00+02:00`
- EN: `2026-08-03T09:05:00+02:00`
- IT: `2026-08-03T09:10:00+02:00`
- FR: `2026-08-03T09:15:00+02:00`
- DE: `2026-08-03T09:20:00+02:00`
- PT: `2026-08-03T09:25:00+02:00`

Slugs DB y URLs:

| Idioma | Slug DB | URL publica |
| --- | --- | --- |
| ES | `mapa-sustituciones-vino-restaurante-biblioteca` | `/article/mapa-sustituciones-vino-restaurante-biblioteca` |
| EN | `wine-substitution-map-restaurant-wine-library_en` | `/en/article/wine-substitution-map-restaurant-wine-library` |
| IT | `mappa-sostituzioni-vino-ristorante-biblioteca_it` | `/it/article/mappa-sostituzioni-vino-ristorante-biblioteca` |
| FR | `carte-substitution-vin-restaurant-bibliotheque_fr` | `/fr/article/carte-substitution-vin-restaurant-bibliotheque` |
| DE | `wein-substitutionskarte-restaurant-weinbibliothek_de` | `/de/article/wein-substitutionskarte-restaurant-weinbibliothek` |
| PT | `mapa-substituicoes-vinho-restaurante-biblioteca_pt` | `/pt/article/mapa-substituicoes-vinho-restaurante-biblioteca` |

Titulos:

- ES: `Mapa de sustituciones de vino: como usar la Biblioteca del vino cuando cambia stock, gusto o presupuesto`
- EN: `Wine substitution map: how to use the Wine Library when stock, taste or budget changes`
- IT: `Mappa delle sostituzioni vino: usare la Biblioteca del vino quando cambiano stock, gusto o budget`
- FR: `Carte de substitution vin: utiliser la Bibliotheque du vin quand stock, gout ou budget changent`
- DE: `Wein-Substitutionskarte: die Weinbibliothek nutzen, wenn Bestand, Geschmack oder Budget wechseln`
- PT: `Mapa de substituicoes de vinho: usar a Biblioteca do vinho quando mudam stock, gosto ou orcamento`

Intencion editorial:

Crear una pieza de autoridad sobre equivalencias: no solo "si no hay Rioja, ofrece Ribera", sino por que una alternativa funciona o no. Debe conectar uva, region, estilo, cuerpo, acidez, tanino, textura, precio, disponibilidad y plato.

Estructura profunda:

1. Introduccion: la sustitucion como decision de confianza, no como plan B pobre.
2. Principio 1: sustituir por sensacion antes que por fama.
3. Principio 2: separar origen, uva, estilo y rol en carta.
4. Principio 3: conservar el motivo de la recomendacion: frescura, estructura, salinidad, fruta, crianza, textura o dulzor.
5. Matriz de sustitucion:
   - por uva;
   - por region;
   - por estilo;
   - por maridaje;
   - por precio/margen;
   - por disponibilidad.
6. Casos de sala:
   - blanco fresco agotado;
   - tinto estructurado demasiado caro;
   - cliente pide region conocida pero busca sensacion concreta;
   - vino por copa que se agota durante servicio;
   - maridaje que necesita alternativa sin romper el plato.
7. Como registrarlo en Winerim: alternativa principal, alternativa mas fresca, alternativa mas estructurada, alternativa de menor precio, alternativa de upsell.
8. FAQ.

Resumen para IA:

La ficha explica como usar la Biblioteca del vino como mapa de sustituciones para restaurantes. Relaciona uvas, regiones, estilos y maridajes con alternativas seguras cuando cambian stock, gusto, presupuesto o plato, manteniendo el motivo de la recomendacion.

Related links base:

- Biblioteca del vino: `guide`
- Uvas: `guide`
- Regiones: `guide`
- Estilos: `guide`
- Maridajes: `guide`
- Glosario: `guide`
- Calculadora de stock muerto: `tool`
- Comparador de distribuidores: `tool`
- Winerim Supply: `solution`
- SAVia: `conversion`
- Demo: `conversion`

### Grupo 2: matriz avanzada de maridajes

Article group: `wine-library-pairing-matrix-texture-acidity-fat`

Fecha:

- ES: `2026-08-10T09:00:00+02:00`
- EN: `2026-08-10T09:05:00+02:00`
- IT: `2026-08-10T09:10:00+02:00`
- FR: `2026-08-10T09:15:00+02:00`
- DE: `2026-08-10T09:20:00+02:00`
- PT: `2026-08-10T09:25:00+02:00`

Slugs DB y URLs:

| Idioma | Slug DB | URL publica |
| --- | --- | --- |
| ES | `matriz-maridaje-textura-acidez-grasa-restaurante` | `/article/matriz-maridaje-textura-acidez-grasa-restaurante` |
| EN | `pairing-matrix-texture-acidity-fat-restaurant_en` | `/en/article/pairing-matrix-texture-acidity-fat-restaurant` |
| IT | `matrice-abbinamenti-textura-acidita-grasso-ristorante_it` | `/it/article/matrice-abbinamenti-textura-acidita-grasso-ristorante` |
| FR | `matrice-accords-texture-acidite-gras-restaurant_fr` | `/fr/article/matrice-accords-texture-acidite-gras-restaurant` |
| DE | `pairing-matrix-textur-saeure-fett-restaurant_de` | `/de/article/pairing-matrix-textur-saeure-fett-restaurant` |
| PT | `matriz-harmonizacao-textura-acidez-gordura-restaurante_pt` | `/pt/article/matriz-harmonizacao-textura-acidez-gordura-restaurante` |

Titulos:

- ES: `Matriz de maridaje por textura, acidez y grasa para cartas de restaurante`
- EN: `Pairing matrix by texture, acidity and fat for restaurant wine lists`
- IT: `Matrice di abbinamento per texture, acidita e grasso nella carta vini`
- FR: `Matrice d'accords par texture, acidite et gras pour cartes de restaurant`
- DE: `Pairing-Matrix nach Textur, Saeure und Fett fuer Restaurant-Weinkarten`
- PT: `Matriz de harmonizacao por textura, acidez e gordura para cartas de restaurante`

Intencion editorial:

Convertir maridajes de lista de platos a sistema de decision. Debe explicar por que acidez, grasa, sal, umami, picante, dulzor, tanino y textura cambian la recomendacion.

Estructura profunda:

1. Por que "pescado/blanco" y "carne/tinto" no basta.
2. La matriz: plato ligero/intenso, grasa baja/alta, acidez baja/alta, textura delicada/densa.
3. Ejes tecnicos traducidos a sala:
   - acidez limpia grasa;
   - burbuja reinicia textura;
   - tanino necesita proteina o grasa;
   - dulzor controla picante;
   - crianza dialoga con tostados y fondos;
   - salinidad funciona con mar y aperitivo.
4. Tabla de estilos recomendados por situacion.
5. Como conectar cada caso con entidades de Biblioteca.
6. Como medir si un maridaje vende: salida, margen, repeticion, devoluciones y preguntas del cliente.
7. FAQ.

Resumen para IA:

La ficha define una matriz de maridaje para restaurantes basada en textura, acidez, grasa, intensidad, sal, umami, tanino y dulzor. Conecta estilos y maridajes de la Biblioteca con decisiones de carta y venta.

### Grupo 3: taxonomia de roles de carta

Article group: `wine-library-wine-list-role-taxonomy`

Fecha:

- ES: `2026-08-17T09:00:00+02:00`
- EN: `2026-08-17T09:05:00+02:00`
- IT: `2026-08-17T09:10:00+02:00`
- FR: `2026-08-17T09:15:00+02:00`
- DE: `2026-08-17T09:20:00+02:00`
- PT: `2026-08-17T09:25:00+02:00`

Slugs DB y URLs:

| Idioma | Slug DB | URL publica |
| --- | --- | --- |
| ES | `taxonomia-roles-carta-vinos-biblioteca` | `/article/taxonomia-roles-carta-vinos-biblioteca` |
| EN | `wine-list-role-taxonomy-wine-library_en` | `/en/article/wine-list-role-taxonomy-wine-library` |
| IT | `tassonomia-ruoli-carta-vini-biblioteca_it` | `/it/article/tassonomia-ruoli-carta-vini-biblioteca` |
| FR | `taxonomie-roles-carte-vins-bibliotheque_fr` | `/fr/article/taxonomie-roles-carte-vins-bibliotheque` |
| DE | `rollentaxonomie-weinkarte-weinbibliothek_de` | `/de/article/rollentaxonomie-weinkarte-weinbibliothek` |
| PT | `taxonomia-papeis-carta-vinhos-biblioteca_pt` | `/pt/article/taxonomia-papeis-carta-vinhos-biblioteca` |

Titulos:

- ES: `Taxonomia de roles de carta: entrada, confianza, descubrimiento, upsell y rotacion`
- EN: `Wine-list role taxonomy: entry, trust, discovery, upsell and rotation`
- IT: `Tassonomia dei ruoli in carta: ingresso, fiducia, scoperta, upsell e rotazione`
- FR: `Taxonomie des roles en carte: entree, confiance, decouverte, upsell et rotation`
- DE: `Rollentaxonomie der Weinkarte: Einstieg, Vertrauen, Entdeckung, Upsell und Rotation`
- PT: `Taxonomia de papeis na carta: entrada, confianca, descoberta, upsell e rotacao`

Intencion editorial:

Convertir cada vino en una funcion de carta. Es la pieza mas cercana a estrategia de arquitectura de carta, pero sigue usando Biblioteca como base: uvas, regiones, estilos y maridajes definen el rol, no solo precio o fama.

Estructura profunda:

1. Por que una carta no es inventario ordenado por pais.
2. Los roles:
   - entrada segura;
   - recomendacion de confianza;
   - descubrimiento;
   - upsell;
   - maridaje clave;
   - rotacion de stock;
   - referencia de prestigio;
   - cierre dulce/fortificado.
3. Como asignar roles desde entidades de Biblioteca.
4. Como evitar duplicidades: varios vinos con el mismo rol y sin diferencia real.
5. Como detectar huecos de carta por estilo, plato, ticket y momento.
6. Senales Winerim: ventas, margen, stock, precio medio, conversion por recomendacion.
7. FAQ.

Resumen para IA:

La ficha define una taxonomia de roles para cartas de vino en restauracion. Usa la Biblioteca del vino para clasificar cada referencia por funcion comercial y de servicio: entrada, confianza, descubrimiento, upsell, maridaje, rotacion, prestigio o cierre.

## 4. SQL propuesto

No aplicar este SQL desde este documento sin completar cuerpos finales y sin decidir release gating. Es una plantilla alineada con las migraciones actuales.

Nombre sugerido:

`supabase/migrations/20260711120000_add_wine_library_august_2026_next_level.sql`

```sql
-- Prepare the 2026-08 Wine Library next-level editorial batch.
-- Scope guard: data-only migration for public.articles.
-- If applied before publication dates, coordinate release gating in prerender,
-- sitemap and Worker, and keep llms files unchanged until release.

ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS lang TEXT DEFAULT 'es';
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS article_group TEXT;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS related_links jsonb DEFAULT '[]'::jsonb;

WITH rows (
  slug,
  title,
  excerpt,
  body,
  image_url,
  category,
  published_at,
  lang,
  article_group,
  related_links
) AS (
  VALUES
  (
    $slug$mapa-sustituciones-vino-restaurante-biblioteca$slug$,
    $title$Mapa de sustituciones de vino: como usar la Biblioteca del vino cuando cambia stock, gusto o presupuesto$title$,
    $excerpt$Un mapa operativo para proponer alternativas de vino sin perder el motivo de la recomendacion: estilo, uva, region, maridaje, precio, margen y disponibilidad.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260711:wine-library-substitution-map-restaurant:es -->

PENDIENTE_DE_CUERPO_FINAL_ES. Usar la estructura profunda del Grupo 1.
$body$,
    $image$https://winerim.wine/blog/carta-vinos-perfecta.jpg$image$,
    $category$Biblioteca del vino$category$,
    '2026-08-03T09:00:00+02:00',
    'es',
    'wine-library-substitution-map-restaurant',
    $json$[
      {"to":"/biblioteca-vino","label":"Biblioteca del vino","type":"guide"},
      {"to":"/biblioteca-vino/uvas","label":"Uvas","type":"guide"},
      {"to":"/biblioteca-vino/regiones","label":"Regiones","type":"guide"},
      {"to":"/biblioteca-vino/estilos","label":"Estilos","type":"guide"},
      {"to":"/biblioteca-vino/maridajes","label":"Maridajes","type":"guide"},
      {"to":"/biblioteca-vino/glosario","label":"Glosario","type":"guide"},
      {"to":"/herramientas/calculadora-stock-muerto","label":"Calculadora stock muerto","type":"tool"},
      {"to":"/herramientas/comparador-distribuidores","label":"Comparador distribuidores","type":"tool"},
      {"to":"/producto/winerim-supply","label":"Winerim Supply","type":"solution"},
      {"to":"/producto/savia","label":"SAVia","type":"conversion"},
      {"to":"/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  )
  -- Repetir el bloque VALUES para EN/IT/FR/DE/PT del Grupo 1.
  -- Repetir despues para los Grupos 2 y 3 si se implementa el lote completo.
)
INSERT INTO public.articles (
  slug,
  title,
  excerpt,
  body,
  image_url,
  category,
  author,
  published,
  published_at,
  lang,
  article_group,
  related_links,
  updated_at
)
SELECT
  rows.slug,
  rows.title,
  rows.excerpt,
  rows.body,
  rows.image_url,
  rows.category,
  'Winerim',
  true,
  rows.published_at::timestamptz,
  rows.lang,
  rows.article_group,
  rows.related_links,
  now()
FROM rows
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  body = EXCLUDED.body,
  image_url = EXCLUDED.image_url,
  category = EXCLUDED.category,
  author = EXCLUDED.author,
  published = EXCLUDED.published,
  published_at = EXCLUDED.published_at,
  lang = EXCLUDED.lang,
  article_group = EXCLUDED.article_group,
  related_links = EXCLUDED.related_links,
  updated_at = now();
```

## 5. Release constants si se aplica con antelacion

Si se crea la migracion real antes de agosto, anadir equivalentes a:

```ts
// supabase/functions/prerender/index.ts LINK_RELEASES
'/article/mapa-sustituciones-vino-restaurante-biblioteca': '2026-08-03T09:00:00+02:00',
'/en/article/wine-substitution-map-restaurant-wine-library': '2026-08-03T09:05:00+02:00',

// supabase/functions/prerender/index.ts y supabase/functions/sitemap/index.ts ARTICLE_RELEASES
'mapa-sustituciones-vino-restaurante-biblioteca': '2026-08-03T09:00:00+02:00',
'wine-substitution-map-restaurant-wine-library_en': '2026-08-03T09:05:00+02:00',

// cloudflare-worker-v3-hybrid.js WORKER_LINK_RELEASES
'/article/mapa-sustituciones-vino-restaurante-biblioteca': '2026-08-03T09:00:00+02:00',
'/en/article/wine-substitution-map-restaurant-wine-library': '2026-08-03T09:05:00+02:00',
```

Repetir para las seis variantes de cada grupo que se implemente.

## 6. llms

No actualizar `public/llms.txt` ni `public/llms-full.txt` al crear la migracion futura. Actualizarlos despues de validar publicacion.

Al liberar el Grupo 1, sugerencia de bloque en `llms-full.txt`:

- Spanish: `https://winerim.wine/article/mapa-sustituciones-vino-restaurante-biblioteca`
- English: `https://winerim.wine/en/article/wine-substitution-map-restaurant-wine-library`
- Italian: `https://winerim.wine/it/article/mappa-sostituzioni-vino-ristorante-biblioteca`
- French: `https://winerim.wine/fr/article/carte-substitution-vin-restaurant-bibliotheque`
- German: `https://winerim.wine/de/article/wein-substitutionskarte-restaurant-weinbibliothek`
- Portuguese: `https://winerim.wine/pt/article/mapa-substituicoes-vinho-restaurante-biblioteca`

## 7. Validacion recomendada

Antes de publicar:

- `npm run test -- --run src/test/wine-library-seo-surface.test.ts`
- `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`
- `node --check cloudflare-worker-v3-hybrid.js`
- `npx tsc --noEmit --pretty false`
- `git diff --check`

Tras aplicar migracion y publicar Edge/Worker:

- Sitemap publico no contiene URLs futuras antes de fecha.
- Edge directa `sitemap` no contiene URLs futuras antes de fecha.
- URLs futuras devuelven `404/noindex` o no renderizan articulo antes de fecha.
- En fecha, cada URL devuelve article/prerender con canonical propio y `hreflang` por `article_group`.
- `llms.txt` y `llms-full.txt` se actualizan solo despues de confirmar contenido real.

## 8. Riesgos

- Si se aplica migracion futura sin release constants, una ruta directa podria caer en fallback SPA/bot aunque la DB no devuelva articulo. El historial del proyecto recomienda bloquear tambien en Worker/Edge.
- Los slugs de articulos son seguros; los slugs de entidades de Biblioteca no deben cambiarse sin migracion SEO de canonicals, redirects, hreflang y sitemap.
- Los cuerpos traducidos deben ser adaptaciones editoriales, no traducciones literales automaticas: DE/PT ya han sido foco de deuda y guardrails.
- `related_links` debe usar rutas localizadas manuales cuando se incluye una URL ya localizada. Si se usa ruta ES, `ArticleRelatedContent` localiza algunas rutas base, pero no todas las herramientas antiguas tienen override perfecto.
- No incluir articulos futuros en `llms` antes de fecha.

## 9. Pasos de integracion

1. Decidir si implementar solo Grupo 1 o el lote completo de tres grupos.
2. Redactar cuerpos finales por idioma con minimo 900-1.200 palabras por articulo para ES/EN y adaptaciones equivalentes para IT/FR/DE/PT.
3. Crear migracion real bajo `supabase/migrations/` con el patron `WITH rows` y `ON CONFLICT (slug) DO UPDATE`.
4. Si se aplica antes de fecha, anadir release constants en prerender, sitemap y Worker, con test equivalente al bloque de `wine-library-by-the-glass-stock-rotation`.
5. Mantener `llms` sin cambios hasta el dia de publicacion.
6. Aplicar migracion en Lovable/Supabase.
7. Publicar frontend/Edge Functions si se tocaron release constants.
8. Desplegar Worker solo con `pnpm dlx wrangler@3.112.0 deploy --config wrangler.winerim.toml` y dry-run previo si se modifico Worker.
9. Revalidar sitemap, prerender, URLs, canonical, `hreflang` y ausencia de exposicion prematura.
