# NEXT_STEPS.md — winerim.wine

> Tareas pendientes priorizadas. Se reescribe al final de cada sesión.
> Última actualización: 2026-04-17

## Prioridad alta

### 1. City pages DE/PT en Supabase

**Qué**: Insertar filas en `seo_pages` (cluster="city") para ciudades alemanas y portuguesas.

**Ciudades candidatas**:
- DE: Berlin, München, Hamburg, Frankfurt, Düsseldorf, Köln, Stuttgart, Wien (Austria), Zürich (Suiza)
- PT: Lisboa, Porto, Faro, Coimbra, Funchal, Braga

**Cómo**: 
1. Primero extraer una city page existente (ej: Madrid) como plantilla del JSON body
2. Adaptar: city_name, country, problems, benefits, features, stats, FAQs, internal_links, CTAs
3. Generar SQL INSERTs
4. Ejecutar en Supabase (dashboard o CLI)

**Prerrequisito**: Acceso a Supabase (credenciales en `.env` del proyecto)

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

## Para retomar la próxima sesión

1. Leer los 4 documentos: `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md`, `NEXT_STEPS.md`
2. Elegir la tarea prioritaria
3. Si se trabaja en city pages: necesitaremos acceso a Supabase para leer las existentes y crear las nuevas
