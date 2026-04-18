# DECISIONS_LOG.md — winerim.wine

> Registro de decisiones técnicas y de producto. Cada entrada es inmutable una vez escrita.
> Formato: fecha, decisión, razón, alternativas descartadas.

---

## 2026-04-17 — Comillas tipográficas alemanas

**Decisión**: Prohibir `„"` (U+201E/U+201C) en strings JS/TS. Usar `ʻʼ` o comillas ASCII.

**Razón**: Vite interpreta `"` (U+201C) como cierre del string delimiter estándar `"`, causando `Unterminated string literal` o `Expected "]"`. Ocurrió dos veces: en EstrategiaMaridaje.tsx (línea 180) y CartaAmplia.tsx (línea 469).

**Alternativas descartadas**: Usar template literals (backticks) — funcionaría pero cambiaría el estilo de todo el archivo sin necesidad.

---

## 2026-04-17 — Fallback chain de idiomas

**Decisión**: `getI18n(map, lang)` retorna `map[lang] ?? map.en ?? map.es`. Todas las páginas usan este helper.

**Razón**: DE y PT son idiomas opcionales en `I18nMap<T>` (solo `es` y `en` son required). Si falta una traducción, el usuario ve inglés antes que español. Esto se decidió antes de esta sesión pero se mantuvo.

**Implicación**: Es seguro no traducir una página — simplemente mostrará la versión EN. No hay crashes.

---

## 2026-04-17 — Hub/detail pages: i18n inline vs refactor completo

**Decisión**: Añadir i18n objects inline a las hub pages (GrapesHub, PairingsHub, etc.) para traducir el chrome (títulos, labels, FAQs, CTAs). Los datos dinámicos (catálogo de uvas, regiones, etc.) siguen en español.

**Razón**: El catálogo de datos (grapeCatalog, regionsCatalog, etc.) está hardcoded en archivos de datos grandes. Traducirlo requeriría un refactor masivo del sistema de datos. El chrome de la UI (headings, labels) era lo urgente para SEO.

**Hipótesis**: Los usuarios DE/PT verán los nombres de uvas/regiones en su idioma original (español o nombre propio de la región), lo cual es aceptable para términos vinícolas que son bastante universales. Si causa problemas, se puede abordar después.

---

## 2026-04-17 — Decision Center: archivos de datos separados por idioma

**Decisión**: Crear archivos `.de.ts` y `.pt.ts` en `src/data/decisionCenter/` (12 archivos nuevos), siguiendo el patrón existente de `.en.ts`, `.it.ts`, `.fr.ts`.

**Razón**: DecisionCenterArea.tsx importa archivos de datos por idioma. El agente que tradujo la página añadió los imports, así que los archivos debían existir.

**Alternativa descartada**: Meter todo en un solo archivo con i18n map — hubiera requerido refactorizar el sistema de imports del Decision Center.

---

## 2026-04-17 — CTA overrides: solo español

**Decisión**: Los `PAGE_CTA_OVERRIDES` en `ctas.ts` solo aplican a ES (línea 422: `if (lang !== "es") return base`). Los demás idiomas usan los CTAs genéricos por funnel stage.

**Razón**: Las overrides son muy detalladas y específicas por tipo de página (~20 page types). Traducirlas a 5 idiomas sería un esfuerzo enorme con retorno incierto. Los CTAs genéricos por funnel stage (tofu/mofu/bofu) ya están traducidos y cubren el caso base.

**Hipótesis**: Si las conversion rates en DE/PT son bajas, una causa posible es que los CTAs contextuales no están tan afinados como en ES. Se puede abordar entonces.

---

## 2026-04-17 — City pages: requieren Supabase, no código

**Decisión**: Las city landing pages (cluster="city" en `seo_pages`) necesitan INSERTs en la base de datos, no archivos en el repo.

**Razón**: El sistema `SeoPage.tsx` → `useSeoPage()` → `supabase.from("seo_pages")` es completamente dinámico. El template (`CityTemplate.tsx`) ya existe y renderiza cualquier city page que esté en la tabla.

**Pendiente**: Crear los INSERTs SQL para ciudades DE y PT.

---

## 2026-04-17 — Sitemap: rutas DE/PT solo para paginas multilang del ROUTE_MAP

**Decisión**: En el sitemap, solo las rutas marcadas como `multilang: true` generan versiones DE/PT. Las guías, herramientas, benchmarks, etc. marcadas como `multilang: false` siguen solo en ES.

**Razón**: El sitemap refleja lo que realmente existe en producción. Incluir URLs DE/PT en el sitemap para páginas que no tienen traducción generaría 404s o contenido en español con URL alemana/portuguesa, lo cual es peor para SEO que no listarlas.

**Nota**: Cuando se traduzcan más guías/herramientas a DE/PT, habrá que cambiar su `multilang` a `true` y añadir sus rutas al ROUTE_MAP del sitemap.

---

## 2026-04-17 — City pages SQL: contenido unico por ciudad

**Decisión**: Cada city page tiene contenido contextualizado (intro, problemas, FAQs) que refleja el mercado local, no solo un swap de nombre de ciudad.

**Razón**: Google penaliza contenido thin/duplicado. Las city pages necesitan contenido sustancial y diferenciado para rankear. Cada ciudad tiene un mercado gastronómico con particularidades reales (Berlin: escena internacional; Porto: herencia del Douro; München: poder adquisitivo alto, etc.)

**Slugs**: `de/weinkarten-software-{city}` y `pt/software-carta-vinhos-{city}` — siguen el patron SEO de keyword + localidad.

---

## 2026-04-17 — SEO templates: i18n via page.lang, no useLanguage()

**Decisión**: Los 4 SEO templates (City, RestaurantType, Country, Generic) usan `page.lang` del objeto Supabase para seleccionar el idioma del chrome, en vez de `useLanguage()` del contexto React.

**Razón**: `page.lang` ya está disponible en el prop y refleja el idioma correcto para esa página. Evita añadir un import adicional y mantiene el template autocontenido.

**Patrón**: `const t = templateI18n[page.lang] || templateI18n.es` (o `.en` para CountryTemplate que era originalmente inglés).

---

## 2026-04-17 — GenericSeoTemplate clusterConfig: labels como Record<string, string>

**Decisión**: Refactorizar `breadcrumbParent` y `badge` en `clusterConfig` de `string` a `Record<string, string>` (keyed by lang).

**Razón**: El clusterConfig define labels visibles al usuario (ej: "Guías", "Maridajes") que necesitan traducción. Hacerlos Record<string, string> es el cambio mínimo que permite i18n sin reestructurar todo el objeto.

**Uso**: `config.breadcrumbParent[lang] || config.breadcrumbParent.es`

---

## 2026-04-17 — Documentación del proyecto con 4 archivos de estado

**Decisión**: Mantener 4 documentos como fuente de verdad:
1. `PROJECT_CONTEXT.md` — Arquitectura y contexto (cambia poco)
2. `CURRENT_STATE.md` — Estado actual (se actualiza cada sesión)
3. `DECISIONS_LOG.md` — Registro de decisiones (append-only)
4. `NEXT_STEPS.md` — Tareas pendientes (se reescribe cada sesión)

**Razón**: Las sesiones de Claude tienen contexto limitado. Estos archivos permiten retomar el trabajo sin perder estado. Separar hechos de decisiones de hipótesis de tareas.

---

## 2026-04-17 — Routing: catch-all con SeoPage en lugar de rutas específicas

**Decisión**: Reemplazar todas las rutas SEO específicas (`software-carta-de-vinos-*`, `software-carta-de-vinos-:city`) con un único catch-all `<Route path="*" element={<SeoPage />} />`.

**Razón**: React Router v6 usa matching basado en segmentos. Los wildcards (`*`) y params (`:param`) solo funcionan como segmentos completos después de `/`. Patrones inline como `software-carta-de-vinos-*` se tratan como strings literales y NUNCA hacen match con URLs dinámicas. Todas las rutas city page (ES, EN, IT, FR, DE, PT) estaban rotas.

**Cómo funciona**: SeoPage usa `useLocation().pathname` → `slugFromPathname()` (quita solo el prefijo de idioma `/xx/`) → query a Supabase por slug → si existe, renderiza el template; si no, SeoPageNotFound.

---

## 2026-04-17 — Slugs en seo_pages: SIN prefijo de idioma

**Decisión**: Los slugs en la tabla `seo_pages` NO incluyen el prefijo de idioma. Ej: `weinkarten-software-berlin`, NO `de/weinkarten-software-berlin`.

**Razón**: `slugFromPathname()` quita el prefijo `/de/` de la URL antes de buscar en Supabase. Si el slug en DB tiene `de/`, nunca haría match. Las pages ES existentes (ej: `software-carta-de-vinos-madrid`) ya siguen este patrón sin `es/`.

**Fix aplicado**: SQL `city-pages-de-pt.sql` corregido quitando prefijos `de/` y `pt/` de los 15 slugs.

---

## 2026-04-18 — InternalLinks: fallback para tipos desconocidos

**Decisión**: Añadir `|| Lightbulb` como fallback al resolver `typeIcons[link.type]` en InternalLinks.tsx.

**Razón**: Los datos de city pages DE/PT en Supabase usan `internal_links` con types `"product"` y `"case_study"`, pero InternalLinks solo definía icons para `guide`, `tool`, `resource`, `solution`, `decision-center`. Cuando `typeIcons[link.type]` devolvía `undefined` y se renderizaba como `<Icon />`, causaba React error #130 ("Element type is invalid: expected string or class/function but got: undefined"). Esta era la causa del crash en city pages alemanas.

**Fix**: Añadir `product` y `case_study` a `typeIcons`, `typeLabels` y `badgeClasses`, más un fallback genérico para cualquier tipo futuro desconocido.
