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

## 2026-04-17 — Documentación del proyecto con 4 archivos de estado

**Decisión**: Mantener 4 documentos como fuente de verdad:
1. `PROJECT_CONTEXT.md` — Arquitectura y contexto (cambia poco)
2. `CURRENT_STATE.md` — Estado actual (se actualiza cada sesión)
3. `DECISIONS_LOG.md` — Registro de decisiones (append-only)
4. `NEXT_STEPS.md` — Tareas pendientes (se reescribe cada sesión)

**Razón**: Las sesiones de Claude tienen contexto limitado. Estos archivos permiten retomar el trabajo sin perder estado. Separar hechos de decisiones de hipótesis de tareas.
