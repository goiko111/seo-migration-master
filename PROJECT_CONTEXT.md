# PROJECT_CONTEXT.md — winerim.wine

> Fuente de verdad sobre la arquitectura y el contexto general del proyecto.
> No cambia frecuentemente. Actualizar solo cuando haya cambios estructurales.

## Qué es Winerim

SaaS B2B de gestión inteligente de cartas de vinos para restaurantes, hoteles, wine bars y grupos de restauración. El sitio web (winerim.wine) es la presencia comercial, SEO y de conversión.

## Stack técnico

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + TypeScript + Vite |
| Routing | React Router v6 (lazy-loaded routes) |
| Styling | Tailwind CSS + shadcn/ui |
| Backend/DB | Supabase (proyecto `pwkqbcgjrhoyxrsmcypw`) |
| Hosting | Lovable (deploy desde repo GitHub) |
| Repo | `github.com/goiko111/seo-migration-master` (branch `main`) |

## Sistema de internacionalización (i18n)

### Idiomas soportados

```typescript
type SupportedLang = "es" | "en" | "it" | "fr" | "de" | "pt";
```

- **es**: Español (idioma base, DEFAULT_LANG)
- **en**: English
- **it**: Italiano
- **fr**: Français
- **de**: Deutsch (formal Sie register)
- **pt**: Português europeu (PT-PT, NO brasileño)

### Patrones i18n en el código

1. **I18nMap<T>**: `{ es: T; en: T } & Partial<Record<SupportedLang, T>>` — El más común. Usado en GuideTemplate, PainTemplate, etc.
2. **Record<string, Content>**: Objeto con claves de idioma. Usado en páginas con contenido estructurado propio (Implantacion, Integraciones, etc.)
3. **Múltiples objetos i18n**: Páginas con muchas secciones definen varios objetos (`seoI`, `heroI`, `faqsI`...). Ejemplo: WhatIsWinerim.tsx
4. **Inline conditionals**: `lang === "es" ? ... : lang === "en" ? ...` — Usado en algunos componentes para strings sueltos.

### Helper de fallback

```typescript
getI18n(map, lang) // Devuelve map[lang] ?? map.en ?? map.es
```

### Convenciones de traducción

**Alemán (DE)**:
- Registro formal (Sie, Ihnen, Ihr)
- Terminología gastronómica: Weinkarte, Glaswein, Durchschnittsbon, Totbestand, Kellerrotation, Sommelier, Ankerwein, Preistreppe, Servicepersonal, Kannibalisierung, Schwundkontrolle, Marge/Gewinnspanne
- Prefijo URL: `/de/...`

**Portugués europeo (PT-PT)**:
- NO brasileño (evitar "você" suelto, usar construcciones con "a sua", "o seu")
- Terminología: carta de vinhos, vinho a copo, harmonizações, escanção, garrafeira, bilhete médio, stock morto, consoante, perceber, rentabilidade, casta, quebra, gama, canibalização, detetar, margem
- Prefijo URL: `/pt/...`

### Error conocido: comillas tipográficas alemanas

NUNCA usar `„"` (U+201E/U+201C) dentro de strings JavaScript/TypeScript. Vite las interpreta como cierre de string y rompe el build. Usar `ʻʼ` (modifier letter apostrophe) o comillas simples ASCII.

## Tipos de páginas

### 1. Páginas estáticas (src/pages/*.tsx)

109 archivos. Cada uno tiene su contenido inline en i18n maps. Incluyen:
- Páginas comerciales: Index, Precios, Funcionalidades, Demo, Contacto...
- Guías SEO: ComoHacerCartaVinos, VinoPorCopa, EstrategiaMaridaje...
- Herramientas: Calculadoras, Analyzers, WineListScore...
- Pain pages: CartaNoVende, CartaAmplia...
- Verticales: Hoteles, GruposRestauracion, WineBars, RestaurantesGastronomicos...
- Hub/detalle: GrapesHub, PairingsHub, RegionsHub, StylesHub + sus Detail pages
- Decision Center: DecisionCenter, DecisionCenterArea (con datos en src/data/decisionCenter/)

### 2. Páginas SEO dinámicas (Supabase → seo_pages)

Se sirven desde `SeoPage.tsx` que consulta la tabla `seo_pages` por slug. Clusters disponibles:
- `city`: CityTemplate (ej: "software-carta-vinos-madrid")
- `restaurant_type`: RestaurantTypeTemplate
- `country`: CountryTemplate
- Genéricos: grape, region, style, pairing, guide, problem, comparison, resource → GenericSeoTemplate

### 3. Páginas admin/sistema (sin i18n)

Admin.tsx, AdminLogin.tsx, Unsubscribe.tsx — No necesitan traducción.

## Estructura de archivos clave

```
src/
├── i18n/
│   ├── types.ts              # SupportedLang, I18nMap, getI18n, ROUTE_MAP, LANG_FLAGS
│   └── LanguageContext.tsx    # useLanguage() hook
├── pages/                    # 109 archivos .tsx
├── components/
│   ├── templates/            # 10 templates (Guide, Pain, City, Comparison...)
│   ├── tools/                # ToolStrategicBlock
│   ├── landing/              # Secciones de la homepage
│   └── seo/                  # Breadcrumbs, FAQSection, InternalLinks, NextSteps
├── data/
│   ├── ctas.ts               # Sistema CTA por funnel stage × idioma
│   ├── newResources.ts       # 14 recursos (datos base, español)
│   ├── newResourcesI18n.ts   # Traducciones EN/IT/FR overlay (getLocalizedResources)
│   └── decisionCenter/       # 36 archivos (6 áreas × 6 idiomas)
├── hooks/
│   └── useSeoPage.ts         # Fetch de páginas dinámicas desde Supabase
└── integrations/
    └── supabase/             # Cliente y tipos auto-generados
```

## Cloudflare Worker (`winerim-proxy`)

El dominio `winerim.wine` apunta a un Cloudflare Worker que actúa como proxy inverso. Es pieza crítica de la arquitectura — controla qué paths llegan al SPA y cuáles devuelven 404.

| Campo | Valor |
|-------|-------|
| Cuenta Cloudflare | `Gugocreative@gmail.com` |
| Account ID | `e75343bb63534d3d029150e90b48ec7c` |
| Worker name | `winerim-proxy` |
| Route | `winerim.wine/*` |
| Workers.dev | `winerim-proxy.gugocreative.workers.dev` |
| Código fuente (repo) | `cloudflare-worker-v3-hybrid.js` |

### Env vars del worker

| Variable | Valor |
|----------|-------|
| `ORIGIN` | `https://seo-migration-magic.lovable.app` |
| `SITE_URL` | `https://winerim.wine` |
| `PRERENDER_URL` | `https://pwkqbcgjrhoyxrsmcypw.supabase.co/functions/v1/prerender` |
| `REDIRECTS_URL` | `https://pwkqbcgjrhoyxrsmcypw.supabase.co/functions/v1/redirects` |
| `SUPABASE_ANON_KEY` | (secret — es el anon key del proyecto Supabase) |

### Routing whitelist del worker

El worker usa un sistema de whitelist estricto. Cualquier path que NO esté en alguna de estas listas devuelve 404 real:

- **`SEO_EXACT`**: paths exactos conocidos (ej: `/software-carta-de-vinos`)
- **`SPA_EXACT`**: paths SPA exactos (ej: `/precios`, `/contacto`)
- **`SPA_PREFIXES`**: prefijos que sirven el SPA (ej: `/en/`, `/blog/`, `/de/`, `/pt/`)
- **`SEO_WILDCARD_PREFIXES`**: prefijos para city pages SEO (ej: `/software-carta-de-vinos-`, `/de/weinkarten-software-`, `/pt/software-carta-vinhos-`)
- **`PRIVATE_ROUTES`**: rutas admin

**IMPORTANTE**: Al añadir nuevos patrones de URL (nuevo idioma, nuevo cluster), hay que actualizar el worker. El deploy del worker se hace via Cloudflare dashboard o API, NO via Lovable Publish.

## Build y deploy

- `npm run build` — Vite build (~7-8s)
- Deploy SPA: push a `main` → Lovable despliega automáticamente
- Deploy Worker: via Cloudflare dashboard ("Edit code" → "Deploy") o via API PUT
- Commits llevan trailer: `Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>`
