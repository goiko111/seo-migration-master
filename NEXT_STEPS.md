# NEXT_STEPS.md — winerim.wine

> Tareas pendientes priorizadas. Se reescribe al final de cada sesión.
> Última actualización: 2026-04-18 (sesión 3)

## Prioridad alta

### 1. Ejecutar SQL de city pages DE/PT en Supabase

**Qué**: Ejecutar `sql/city-pages-de-pt.sql` en Supabase para crear 15 city pages (9 DE + 6 PT).

**IMPORTANTE**: Los slugs fueron corregidos en sesión 3 para NO incluir prefijos de idioma:
- ✅ `weinkarten-software-berlin` (correcto)
- ❌ `de/weinkarten-software-berlin` (incorrecto — nunca haría match)

**Si el SQL ya se ejecutó con slugs incorrectos**, ejecutar este UPDATE:
```sql
UPDATE seo_pages 
SET slug = REPLACE(slug, 'de/', '') 
WHERE slug LIKE 'de/%' AND lang = 'de' AND cluster = 'city';

UPDATE seo_pages 
SET slug = REPLACE(slug, 'pt/', '') 
WHERE slug LIKE 'pt/%' AND lang = 'pt' AND cluster = 'city';
```

**Verificación**: 
```sql
SELECT slug, lang FROM seo_pages WHERE cluster='city' AND lang IN ('de','pt') ORDER BY lang, slug;
```

### 2. Verificar city pages DE/PT en staging

**Qué**: Después de ejecutar el SQL, verificar que las 15 páginas renderizan en staging.

**URLs de prueba**:
- `https://seo-migration-magic.lovable.app/de/weinkarten-software-berlin`
- `https://seo-migration-magic.lovable.app/pt/software-carta-vinhos-lisboa`

**Verificar que**:
- La página carga (no error #130)
- CityTemplate renderiza con contenido correcto
- InternalLinks muestra iconos y labels correctos (no crash por type desconocido)
- RelatedPages muestra labels en el idioma correcto
- Breadcrumbs están en el idioma correcto

### 3. Fix redirects edge function en producción

**Qué**: `winerim.wine` devuelve "Not Found" en texto plano para paths de city pages porque la edge function `redirects` no los reenvía al SPA.

**Dónde**: `supabase/functions/redirects/index.ts`

**Hipótesis**: La edge function tiene una lista fija de paths conocidos y cualquier path nuevo (como `/de/weinkarten-software-berlin`) es rechazado antes de llegar al SPA.

---

## Prioridad media

### 4. Verificar otros clusters para DE/PT

**Qué**: Comprobar si los clusters `restaurant_type` y `country` tienen entradas para DE/PT.

**Query**: `SELECT DISTINCT lang, cluster FROM seo_pages ORDER BY cluster, lang`

### 5. Revisión visual en producción

**Qué**: Navegar las páginas principales en DE y PT para detectar problemas visuales.

### 6. Chat widget FOUC fix

**Qué**: Verificar que el fix CSS en `index.html` funciona en producción.

---

## Prioridad baja

### 7. CTA overrides para DE/PT
### 8. Traducción de datos de catálogo
### 9. Revisión por nativos

---

## Completado en sesión 3

- ✅ Root cause de React error #130 en city pages DE: `InternalLinks.tsx` renderizaba `undefined` como componente cuando `typeIcons[link.type]` no encontraba types `"product"` y `"case_study"`
- ✅ Fix InternalLinks.tsx: añadidos types `product`/`case_study` a `typeIcons`, `typeLabels`, `badgeClasses` + fallback `|| Lightbulb` para cualquier tipo desconocido
- ✅ Fix InternalLinks.tsx: añadidos DE/PT a `typeLabels` y `defaultTitles`
- ✅ Fix RelatedPages.tsx: refactorizado `clusterLabels` de `Record<string, string>` a `Record<string, Record<string, string>>` con 6 idiomas + `defaultTitles` i18n
- ✅ Fix SQL slugs: quitados prefijos `de/` y `pt/` de los 15 slugs en `city-pages-de-pt.sql`
- ✅ Fix data bug: Faro feature tenía `"a"` en lugar de `"desc"`
- ✅ Routing catch-all implementado (sesión anterior): `<Route path="*" element={<SeoPage />} />`
- ✅ Documentación actualizada (4 archivos)

## Completado en sesión 2

- ✅ i18n para los 4 SEO templates
- ✅ Fix duplicate `de` keys en 4 páginas
- ✅ SQL para 15 city pages DE/PT generado
- ✅ Sitemap edge function con DE/PT
- ✅ SEOHead: Organization schema, og:locale, areaServed para DE/PT

## Para retomar la próxima sesión

1. Leer los 4 documentos: `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md`, `NEXT_STEPS.md`
2. Verificar si el SQL fue ejecutado en Supabase (query: `SELECT count(*) FROM seo_pages WHERE lang IN ('de','pt')`)
3. Si no se ejecutó, necesitamos acceso a Supabase dashboard
4. Si se ejecutó con slugs incorrectos, ejecutar los UPDATEs de corrección
