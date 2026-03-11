# SEO Consolidation Report — 2026-03-11

## ✅ Conflictos resueltos

### 1. Páginas EN en raíz (CRÍTICO — resuelto)
| Ruta antigua | Redirect 301 → | Estado |
|---|---|---|
| `/wine-list-management-software` | `/en/wine-list-management-software` | ✅ Activo |
| `/what-is-winerim` | `/en/what-is-winerim` | ✅ Activo |
| `/ai-wine-software` | `/en/ai-wine-software` | ✅ Activo |
| `/wine-list-analyzer` | `/en/wine-list-analyzer` | ✅ Activo |
| `/wine-roi-calculator` | `/en/wine-roi-calculator` | ✅ Activo |
| `/wine-pairing-generator` | `/en/wine-pairing-generator` | ✅ Activo |
| `/wine-pricing-tool` | `/en/wine-pricing-tool` | ✅ Activo |
| `/wine-list-benchmark` | `/en/wine-list-benchmark` | ✅ Activo |

### 2. Canibalización EN resuelta
| Ruta duplicada | Redirect 301 → | Motivo |
|---|---|---|
| `/en/digital-wine-list` | `/en/wine-list-management-software` | Misma intención; consolida autoridad |

### 3. Rutas que faltaban en sitemap (añadidas)
- `/producto/inteligencia-dinamica` (+ hreflang EN/IT/FR)
- 5 guías bajo `/guias/` (copa, vinos muertos, equipo sala, datos compra, stock-ventas-margen)
- 7 recursos bajo `/recursos/` (estrategia copa, vinos muertos, formación, márgenes, scorecard, checklist vende, equilibrio)
- 3 herramientas: diagnóstico copa, wine-list-score, calculadora stock muerto
- 12 benchmarks y playbooks bajo `/benchmarks-playbooks/`

### 4. ROUTE_MAP sincronizado
- Añadido `/producto/inteligencia-dinamica` → EN/IT/FR en el sitemap edge function
- El ROUTE_MAP del sitemap ahora coincide 1:1 con `src/i18n/types.ts`

### 5. robots.txt actualizado
- Añadidos crawlers de IA: GPTBot, ChatGPT-User, Google-Extended, ClaudeBot, PerplexityBot, Cohere-AI
- Todos con `Allow: /` para maximizar citabilidad

### 6. Canonical `/en/digital-wine-list`
- Cambiado de apuntar a sí mismo → apunta a `/en/wine-list-management-software`
- Evita señales duplicadas en Google

## ⚠️ Riesgos residuales

### 1. Rutas EN en raíz siguen renderizando en SPA
Las rutas como `/wine-list-management-software` aún tienen `<Route>` en App.tsx y renderizan contenido. Los bots reciben el 301 vía edge function, pero usuarios directos ven la página sin redirect.

**Impacto**: Bajo. Google sigue la señal del redirect edge function. Canonical apunta correctamente.
**Acción futura**: Considerar eliminar las rutas EN del `esRoutes` en App.tsx y dejar solo en `langRoutes("/en")`.

### 2. Páginas programáticas (seo_pages) sin thin-content check en sitemap
El sitemap incluye todas las `seo_pages` con `published=true` sin verificar calidad.

**Acción futura**: Añadir columna `quality_score` a la tabla y filtrar `quality_score >= 40` en sitemap.

### 3. Artículos sin hreflang
Los artículos del blog (`/article/:slug`) no tienen versiones en EN/IT/FR y se incluyen en sitemap sin hreflang.

**Impacto**: Bajo. Son contenido ES-only; Google trata correctamente URLs sin hreflang como monolíngues.

### 4. Staging nunca indexable
- `SEOHead` aplica `noindex, nofollow` en dominios que contienen "lovable.app", "localhost", etc.
- `robots.txt` no puede bloquear staging (es el mismo archivo), pero los meta robots lo gestionan correctamente.

## Checklist pre-lanzamiento

- [x] Todos los redirects 301 implementados en edge function
- [x] Canonical siempre apunta a `https://winerim.wine`
- [x] Hreflang incluye `x-default` → ES
- [x] Staging domains → noindex automático
- [x] Sitemap completo con todas las rutas estáticas
- [x] Sitemap incluye hreflang para páginas multilingües
- [x] robots.txt con Sitemap y reglas de crawlers IA
- [x] 410 Gone para URLs WordPress obsoletas
- [x] Trailing slash normalization global
- [x] Lowercase normalization global
- [ ] Verificar en Google Search Console tras deploy
- [ ] Monitorizar cobertura 30 días post-migración
- [ ] Revisar backlinks top-10 del sitio antiguo en Ahrefs/GSC
