## 2026-05-11 — Sesión 9 · Analizador de Cartas + Google Places

- **Decisión:** Integrar Google Places Autocomplete en el analizador como campo opcional (no bloqueante).
  - **Razón:** Permite al Worker auto-detectar país, tipo de restaurante, rating, y calcular estimaciones de negocio (ticket medio, botellas/servicio, ingresos vino/mes). Sin restaurante seleccionado, el flujo sigue funcionando.
- **Decisión:** Eliminar el selector de país del formulario.
  - **Razón:** El backend infiere país desde `placeId` o, en su defecto, desde la propia carta. El selector aportaba fricción sin valor neto.
- **Decisión:** Cargar el script de Google Maps de forma diferida (singleton) sólo cuando se monta el analizador, con `loading=async`.
  - **Razón:** Evitar coste de carga en páginas que no usan el componente y respetar el presupuesto JS.
- **Decisión:** API key de Places `AIzaSyBcqZoVnmhGY12S39puKR248cIACToSZ4A` se mantiene en código cliente, restringida por HTTP referrers en GCP.
  - **Razón:** Es una clave pública de frontend (Maps JS); la seguridad real se hace por dominio, no por ocultarla.
- **Decisión:** El front no envía `country` al endpoint `/v1/analyze`; sólo `lang`, `placeId` y `restaurantName` (estos dos últimos opcionales).
  - **Razón:** Una única fuente de verdad para identificación geográfica (Worker).
- **Decisión:** Respuesta `pendingContact: true` se renderiza como vista informativa amigable (sin error rojo).
  - **Razón:** Cartas grandes (500+ vinos) se procesan manualmente y el usuario debe entender que el equipo le contactará en <48h.

---

## 2026-05-11 — Sesión 8 · Analizador de Cartas

- **Decisión:** El analizador NO mantiene su propio selector de idioma; usa siempre el idioma global de la web (`useLanguage()`).
  - **Razón:** Coherencia UX con el resto del sitio y un único parámetro `lang` que viaja al API.
- **Decisión:** Eliminar el formulario antiguo de "informe en 48h" en `/analisis-carta`.
  - **Razón:** El nuevo analizador interactivo entrega resultado al instante y captura email en el unlock gate. Coexistir confundía al usuario.
- **Decisión:** Timeout fetch del analizador subido a 120s en lugar de implementar polling con `/v1/status/:id`.
  - **Razón:** El endpoint `/v1/analyze` actual responde síncrono y no entrega `analysisId` previo. Reevaluar si el Worker cambia a modo async.
- **Decisión:** País preseleccionado por idioma (es→ES, en→US, fr→FR, de→DE, it→IT, pt→PT).
  - **Razón:** Reducir fricción del usuario en 1 click, manteniendo override manual.

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

---

## 2026-04-19 — Causa raíz del 404 en /de/* y /pt/*: Cloudflare Worker whitelist

**Decisión**: Actualizar el Cloudflare Worker `winerim-proxy` añadiendo prefijos DE/PT a `SEO_WILDCARD_PREFIXES` y `SPA_PREFIXES`.

**Razón**: Las rutas `/de/*` y `/pt/*` devolvían 404 en producción. El diagnóstico previo (NEXT_STEPS punto 3) apuntaba a la edge function `redirects`, pero era incorrecto. La causa real era el Cloudflare Worker, que usa un sistema de whitelist estricto: cualquier path que no esté en `SEO_EXACT`, `SPA_EXACT`, `SPA_PREFIXES`, `SEO_WILDCARD_PREFIXES` o `PRIVATE_ROUTES` recibe un 404 real ANTES de llegar al SPA.

**Cambios realizados**:
- `SEO_WILDCARD_PREFIXES`: añadidos `"/de/weinkarten-software-"` y `"/pt/software-carta-vinhos-"`
- `SPA_PREFIXES`: añadidos `"/de/"` y `"/pt/"`

**Hipótesis previa descartada**: "La edge function redirects no reenvía al SPA" — descartada. El 404 venía del worker, no de la edge function.

**IMPORTANTE para el futuro**: Cada vez que se añada un nuevo patrón de URL (nuevo idioma, nuevo cluster de city pages en otro idioma), hay que actualizar el worker además del SPA y Supabase.

---

## 2026-04-19 — Deploy del worker via Cloudflare API, no UI

**Decisión**: Desplegar el worker modificado usando la API REST de Cloudflare (`PUT /api/v4/accounts/{id}/workers/scripts/{name}`) desde la consola JS del dashboard, en vez de editar manualmente en el editor Monaco.

**Razón**: El editor Monaco del dashboard de Cloudflare está embebido en un iframe y las herramientas de automatización del navegador no podían interactuar fiablemente con su Find/Replace (el typing iba al editor de código en vez del campo de búsqueda).

**Riesgo materializado**: El primer PUT se hizo sin incluir los `bindings` (env vars) en el metadata, lo que borró todas las variables de entorno y causó un 500 "Missing ORIGIN env var". Se corrigió inmediatamente con un segundo PUT incluyendo los 5 bindings.

**Lección**: Al desplegar via API con `PUT`, SIEMPRE incluir los bindings en el metadata. La API reemplaza todo, no hace merge.

---

## 2026-04-19 — Documentación como fuente de verdad entre sesiones

**Decisión**: Adoptar formalmente los 4 documentos (PROJECT_CONTEXT.md, CURRENT_STATE.md, DECISIONS_LOG.md, NEXT_STEPS.md) como fuente de verdad obligatoria.

**Reglas**:
- Si falta contexto, revisar primero esos documentos
- No asumir estado no documentado
- Actualizar al final de cada sesión
- Separar: hechos, decisiones, hipótesis y tareas pendientes
- Si hay contradicciones, señalarlas en vez de ignorarlas

**Razón**: Las sesiones de trabajo tienen contexto limitado y el proyecto se desarrolla en múltiples sesiones. Sin documentación actualizada, se repiten diagnósticos incorrectos (como la hipótesis de la edge function).

---

## 2026-05-07 — Apps Script deduplicación por email + ventana temporal

**Decisión**: Añadir deduplicación al webhook `doPost()` del Apps Script. Antes de insertar un lead, comprobar si ya existe el mismo email en la hoja en los últimos 30 minutos.

**Razón**: Google Ads reintenta el webhook POST cuando tarda en responder, causando 15+ filas duplicadas y 15+ emails por cada lead real. Esto se confirmó con el caso de Christophe Roublin (Francia) — 1 lead real, ~15 entradas en la hoja.

**Alternativas descartadas**: Bloquear reintentos a nivel de red (no es posible con Google Ads); usar un lock global de Apps Script (innecesariamente complejo para este caso); dedup por Google lead ID (no disponible en el payload del webhook).

**Patrón**: `isDuplicate(sheet, email, nombre)` recorre filas desde el final, rompe al salir de la ventana temporal. Match primario por email, fallback por nombre si no hay email.

---

## 2026-05-07 — Resource translations: archivo separado con overlay

**Decisión**: Crear `src/data/newResourcesI18n.ts` como archivo separado que exporta `getLocalizedResources(lang)`. Las traducciones se aplican como overlay sobre los datos base de `newResources.ts`, sin modificar el archivo original.

**Razón**: `newResources.ts` es muy grande (85KB, 14 recursos) y tiene una estructura compleja con arrays anidados, slugs, imágenes, etc. Modificarlo directamente para añadir i18n habría sido arriesgado. El patrón overlay permite traducir solo los campos textuales (24 campos por recurso via `ResourceLangContent`) manteniendo toda la estructura, slugs y assets intactos.

**Idiomas traducidos**: EN, IT, FR. Los 14 recursos del catálogo.

**PENDIENTE**: DE y PT para recursos. Integrar en los componentes de renderizado (`ResourceTemplate.tsx`, `ResourcePage.tsx`).


---

## 2026-05-07 — City pages expansion: 347 pages across 6 languages

**Decisión**: Expansión masiva de city pages insertando ~210 nuevas páginas en Supabase para 6 países: ES (+30→61), EN (+26→121), IT (+50→50), FR (+50→50), DE (+30→39), PT (+20→26).

**Método**: SQL files generados y almacenados en `sql/` del repo GitHub. Ejecutados via Lovable API (`window.__execSQL`) desde el navegador, con fetch desde GitHub API (CORS-compatible) usando `window.__fixAndExec` que corrige automáticamente `related_pages` type mismatch (jsonb→text[]) y añade `ON CONFLICT (slug) DO NOTHING` para idempotencia.

**Problemas resueltos**:
- `related_pages` column es `text[]` pero SQLs usaban `::jsonb` cast → regex fix en browser
- Italian SQL tenía comillas sin escapar (`vini 'noti'`, `vini 'seri'`) y JSON malformado en Ancona → fix en archivo y push a GitHub
- GitHub raw URLs bloqueadas por CORS → se usó GitHub API con `Accept: application/vnd.github.v3.raw`
- Inserciones duplicadas por ejecuciones parciales → `ON CONFLICT (slug) DO NOTHING`

**Archivos SQL**: `city-pages-es-30-new.sql`, `city-pages-uk-30-new.sql`, `city-pages-it-50.sql`, `city-pages-fr-50.sql`, `city-pages-pt-20.sql`, `city-pages-de-30.sql`

**Resultado final**: 347 city pages activas en producción.

---

## 2026-05-07 — Traducción de contenido de recursos a 5 idiomas

**Decisión**: Traducir todo el contenido de la página de recursos (tarjetas, páginas individuales, formularios) a EN, IT, FR, DE, PT.

**Método**: Archivos de traducción creados/actualizados en el código fuente y sincronizados via GitHub push.

**Razón**: Los recursos son landing pages clave para conversión y necesitan estar en el idioma del visitante para maximizar engagement y leads.