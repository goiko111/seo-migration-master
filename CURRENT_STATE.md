# CURRENT_STATE.md — winerim.wine

> Estado actual del proyecto. Actualizado al final de cada sesión de trabajo.
> Última actualización: 2026-04-17

## Estado general

**Build**: ✅ Pasa limpio (7.4s)
**Branch**: `main` — todo empujado a `origin/main`
**Último commit**: `7303ef3` — "i18n: add DE/PT translations to shared CTA system and VideoSection"

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

### Templates — ✅ YA TENÍAN DE/PT

GuideTemplate, PainTemplate, ComparisonPageTemplate, VerticalTemplate, ToolStrategicBlock — todos ya incluían DE/PT en su chrome (labels de secciones, botones, etc.)

### Routing — ✅ COMPLETO

`ROUTE_MAP` en `src/i18n/types.ts` tiene entradas para los 6 idiomas. `SUPPORTED_LANGS`, `LANG_FLAGS`, `LANG_LABELS` incluyen DE y PT.

## Páginas SEO dinámicas (Supabase) — ❌ PENDIENTE

La tabla `seo_pages` en Supabase tiene páginas para ES/EN/IT/FR pero **NO tiene city pages para DE ni PT**. Tampoco se ha verificado si hay otros clusters (restaurant_type, country) en DE/PT.

Ciudades candidatas:
- **DE**: Berlin, München, Hamburg, Frankfurt, Düsseldorf, Köln, Wien, Zürich
- **PT**: Lisboa, Porto, Faro, Coimbra, Funchal

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
- [ ] City pages DE/PT en Supabase
- [ ] Chat widget FOUC fix funciona en producción
