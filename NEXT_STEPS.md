# NEXT_STEPS.md — winerim.wine

> Tareas pendientes priorizadas. Se reescribe al final de cada sesión.
> Última actualización: 2026-04-17 (sesión 2)

## Prioridad alta

### 1. Ejecutar SQL de city pages DE/PT en Supabase

**Qué**: Ejecutar `sql/city-pages-de-pt.sql` en Supabase para crear 15 city pages (9 DE + 6 PT).

**Cómo**: 
1. Abrir el Supabase SQL Editor (dashboard)
2. Copiar y pegar el contenido de `sql/city-pages-de-pt.sql`
3. Ejecutar
4. Verificar que las páginas aparecen: `SELECT slug, lang FROM seo_pages WHERE cluster='city' AND lang IN ('de','pt')`

**Nota del usuario**: También faltan city pages ES para muchas ciudades españolas. Considerar si ampliar el scope a TODAS las ciudades de TODOS los idiomas.

### 2. Verificar city pages existentes para otros clusters

**Qué**: Comprobar si los clusters `restaurant_type` y `country` tienen entradas para DE/PT, o solo para ES/EN/IT/FR.

**Cómo**: Query a Supabase: `SELECT DISTINCT lang, cluster FROM seo_pages ORDER BY cluster, lang`

---

## Prioridad media

### 3. ~~Verificar hreflang tags~~ ✅ HECHO

Client-side: `allLangPaths` ya incluía DE/PT. Sitemap: actualizado en commit `b6fb7a3`.

### 4. ~~Verificar sitemaps~~ ✅ HECHO

Sitemap edge function (`supabase/functions/sitemap/index.ts`) actualizado con ROUTE_MAP para DE y PT. Hreflang en sitemap ahora incluye 5 idiomas + x-default.

**NOTA**: La edge function necesita ser redeployada en Supabase para que los cambios surtan efecto. Hacer `supabase functions deploy sitemap` o push al repo si hay CI/CD configurado.

### 5. Revisión visual en producción

**Qué**: Navegar las páginas principales en DE y PT para detectar problemas visuales (textos cortados, layouts rotos por textos más largos en alemán, etc.)

### 6. Chat widget FOUC fix

**Qué**: Verificar que el fix CSS en `index.html` funciona. Los selectores (`#winerim-web-chat`, `.winerim-web-chat`, `[data-winerim-chat]`) son hipotéticos.

**Cómo**: Inspeccionar el DOM en producción cuando el widget carga y ajustar selectores si es necesario.

---

## Prioridad baja

### 7. CTA overrides para DE/PT

**Qué**: Los CTAs contextuales por tipo de página (`PAGE_CTA_OVERRIDES`) solo están en ES. Los demás idiomas usan CTAs genéricos por funnel stage.

**Cuándo**: Solo si las conversion rates en DE/PT son significativamente más bajas que en ES.

### 8. Traducción de datos de catálogo

**Qué**: Los catálogos de uvas, regiones, estilos y maridajes están en español. Las hub/detail pages muestran el chrome traducido pero los datos en español.

**Cuándo**: Cuando se quiera posicionar SEO con contenido nativo en DE/PT para esas enciclopedias.

### 9. Revisión por nativos

**Qué**: Las traducciones DE/PT fueron generadas por IA. Algunas pueden tener errores sutiles de registro, terminología o naturalidad.

**Cuándo**: Antes de invertir en SEO/SEM en esos mercados.

---

## Completado en esta sesión

- ✅ i18n para los 4 SEO templates (CityTemplate, RestaurantTypeTemplate, CountryTemplate, GenericSeoTemplate) — commit `04334e2`
- ✅ Fix duplicate `de` keys en 4 páginas (VenderMasVino, VinoPorCopa, GuiasRecursos, ComoHacerCartaVinos) — commit `5061513`
- ✅ SQL para 15 city pages DE/PT generado (`sql/city-pages-de-pt.sql`) — commit `5061513`
- ✅ Sitemap edge function actualizado con DE/PT routes y hreflang — commit `b6fb7a3`
- ✅ SEOHead: Organization schema, og:locale, areaServed para DE/PT — commit `b6fb7a3`

## Para retomar la próxima sesión

1. Leer los 4 documentos: `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md`, `NEXT_STEPS.md`
2. Elegir la tarea prioritaria
3. Si se trabaja en city pages: necesitaremos acceso a Supabase para leer las existentes y crear las nuevas
4. Los warnings de "Duplicate key de" ya fueron corregidos en el commit `5061513`
