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

### 3. Verificar hreflang tags

**Qué**: Asegurar que todas las páginas emiten `<link rel="alternate" hreflang="de" href="...">` y `hreflang="pt"` correctamente.

**Cómo**: Revisar el componente `SEOHead` y verificar que usa `allLangPaths` para generar los hreflang. Luego comprobar en producción con herramienta SEO.

### 4. Verificar sitemaps

**Qué**: Confirmar que las URLs DE/PT aparecen en el sitemap.xml.

**Cómo**: Depende de cómo se genera el sitemap — puede ser estático, generado en build, o servido por Supabase/función edge.

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

## Para retomar la próxima sesión

1. Leer los 4 documentos: `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md`, `NEXT_STEPS.md`
2. Elegir la tarea prioritaria
3. Si se trabaja en city pages: necesitaremos acceso a Supabase para leer las existentes y crear las nuevas
4. Los warnings de "Duplicate key de" ya fueron corregidos en el commit `5061513`
