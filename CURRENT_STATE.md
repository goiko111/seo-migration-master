# CURRENT_STATE.md — winerim.wine

> Estado actual del proyecto. Actualizado al final de cada sesión de trabajo.
> Última actualización: 2026-04-17 (sesión 2)

## Estado general

**Build**: ✅ Pasa limpio (7.9s) — sin warnings de duplicate keys
**Branch**: `main` — todo empujado a `origin/main`
**Último commit**: `5061513` — "fix: remove duplicate de keys in 4 pages; add city page SQL for DE/PT"

## i18n: Estado de traducciones por componente

### Páginas estáticas (src/pages/) — ✅ COMPLETO

Todas las páginas con contenido traducible tienen DE y PT. Detalle:

| Categoría | Páginas | Estado DE/PT |
|-----------|---------|--------------|
| Comerciales (Index, Precios, Demo, Contacto, Funcionalidades...) | ~15 | ✅ |
| Guías SEO (ComoHacerCartaVinos, VinoPorCopa, EstrategiaMaridaje...) | ~20 | ✅ |
| Herramientas/Calculadoras (7 calculadoras + 3 analyzers + scores) | ~12 | ✅ |
| Pain pages (CartaNoVende, CartaAmplia, Problemas) | 3 | ✅ |
| Verticales (Hoteles, Grupos, WineBars, Gastronómicos, SinSumiller) | 5 | ✅ |
| Hub pages (GrapesHub, PairingsHub, RegionsHub, StylesHub, BibliotecaVino) | 5 | ✅ |
| Detail pages (GrapeDetail, PairingDetail, RegionDetail, StyleDetail, RegionCountry) | 5 | ✅ |
| Otros (CursosVino, CursoDetalle, GlosarioVino, Distribuidor, Afiliate, Empleo...) | ~15 | ✅ |
| Decision Center + DecisionCenterArea | 2 | ✅ |
| Admin/sistema (Admin, AdminLogin, Unsubscribe, SeoPage, ArticlePage) | 5 | N/A |
| Wrappers (BenchmarkPlaybookDetail, ComparativaDetalle, ResourcePage) | 3 | N/A |

### Datos compartidos — ✅ COMPLETO

| Archivo | Estado |
|---------|--------|
| `src/data/ctas.ts` (CTA system, 3 funnel stages) | ✅ DE/PT añadidos |
| `src/data/decisionCenter/*.ts` (36 archivos, 6 áreas × 6 idiomas) | ✅ 12 archivos nuevos (.de.ts y .pt.ts) |
| `src/components/VideoSection.tsx` | ✅ DE/PT añadidos |

### SEO Templates (src/components/templates/) — ✅ COMPLETO

| Template | Estado i18n |
|----------|-------------|
| CityTemplate | ✅ i18n object con 6 idiomas (antes hardcoded ES) |
| RestaurantTypeTemplate | ✅ i18n object con 6 idiomas (antes hardcoded ES) |
| CountryTemplate | ✅ i18n object con 6 idiomas (antes hardcoded EN) |
| GenericSeoTemplate | ✅ i18n object + clusterConfig refactored con 6 idiomas (antes hardcoded ES) |
| GuideTemplate | ✅ Ya tenía DE/PT |
| PainTemplate | ✅ Ya tenía DE/PT |
| ComparisonPageTemplate | ✅ Ya tenía DE/PT |
| VerticalTemplate | ✅ Ya tenía DE/PT |
| ToolStrategicBlock | ✅ Ya tenía DE/PT |

### Routing — ✅ COMPLETO

`ROUTE_MAP` en `src/i18n/types.ts` tiene entradas para los 6 idiomas. `SUPPORTED_LANGS`, `LANG_FLAGS`, `LANG_LABELS` incluyen DE y PT.

## Páginas SEO dinámicas (Supabase) — ⏳ SQL LISTO, PENDIENTE EJECUCIÓN

La tabla `seo_pages` en Supabase tiene páginas para ES/EN/IT/FR pero **NO tiene city pages para DE ni PT**.

**SQL preparado**: `sql/city-pages-de-pt.sql` — 15 INSERTs listos para ejecutar en Supabase SQL Editor:
- **DE (9)**: Berlin, München, Hamburg, Frankfurt, Düsseldorf, Köln, Stuttgart, Wien, Zürich
- **PT (6)**: Lisboa, Porto, Faro, Coimbra, Funchal, Braga

**Pendiente**: Ejecutar el SQL en Supabase (dashboard o CLI). No se puede desde el sandbox (proxy bloquea).
**Pendiente**: Verificar si otros clusters (restaurant_type, country) necesitan entries DE/PT.

## Chat widget FOUC fix

En `index.html` se añadió un bloque CSS que oculta el widget de chat hasta que cargue (opacity: 0 → 1 con transition). Los selectores usados (`#winerim-web-chat`, `.winerim-web-chat`, `[data-winerim-chat]`) son hipotéticos — **no se ha verificado en producción** que coincidan con el DOM real del widget.

## Cosas que funcionan

- Language switcher muestra 6 idiomas con banderas
- Fallback chain: `getI18n(map, lang)` → lang → en → es
- Build Vite pasa sin errores
- Todas las páginas estáticas renderizan en DE/PT sin crash
- CTAs se muestran traducidos en DE/PT (antes caían a EN)

## Cosas que NO se han verificado

- [ ] Aspecto visual de las traducciones en producción (no hay preview local)
- [ ] Calidad de las traducciones (no revisadas por nativo)
- [ ] SEO: hreflang tags para DE/PT en todas las páginas
- [ ] SEO: sitemaps incluyen URLs DE/PT
- [x] Templates SEO tienen chrome traducido a 6 idiomas
- [x] Duplicate de key warnings limpiados (VenderMasVino, VinoPorCopa, GuiasRecursos, ComoHacerCartaVinos)
- [x] SQL para city pages DE/PT preparado (sql/city-pages-de-pt.sql)
- [ ] City pages DE/PT en Supabase
- [ ] Chat widget FOUC fix funciona en producción
