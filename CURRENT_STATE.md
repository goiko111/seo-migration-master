# CURRENT_STATE.md — winerim.wine

> Estado actual del proyecto. Actualizado al final de cada sesión de trabajo.
> Última actualización: 2026-05-11 (sesión 9 — Google Places + estimaciones de negocio)

## Sesión 9 — Google Places Autocomplete + estimates en Analizador

- ✅ `WineListAnalyzerTool.tsx`: integrado `use-places-autocomplete` (v4.0.1).
  - Campo opcional "Tu restaurante" con buscador, lupa, dropdown y chip con X para borrar.
  - Tipos: `restaurant`, `bar`, `cafe`. Sin restricción de país.
  - Script Google Maps cargado de forma diferida + singleton (`loading=async`) — solo cuando se monta el analizador.
  - API key cliente: `AIzaSyBcqZoVnmhGY12S39puKR248cIACToSZ4A` (pública, restringir por referrer en GCP).
- ✅ Selector de país **eliminado**. El backend lo deduce desde `placeId` o desde la carta.
- ✅ Body POST `/v1/analyze` actualizado: ya no envía `country`. Envía `lang` + (opcional) `placeId` y `restaurantName`. Funciona en `text`, `url` y `file` (FormData).
- ✅ Manejo de `pendingContact: true`: vista amigable con icono reloj + mensaje localizado en 6 idiomas, en lugar de error rojo.
- ✅ Header de resultado enriquecido: rating Google (estrella + nº reseñas), badge tipo restaurante, dirección.
- ✅ Fila de 4 KPIs de `estimates`: Ticket medio, Ticket vino/comensal, Botellas/servicio, Ingresos vino/mes — con badge de confianza (high/medium/low) coloreado. Solo aparece si el API devuelve `estimates`.
- ⚠️ Strings i18n del antiguo selector de país (`countries`, `country`) siguen en los `T[lang]` maps; son código muerto sin uso pero no rompen build.

### Pendientes detectados (no bloqueantes)
- Restringir la API key de Google Maps en GCP por HTTP referrer (`*.winerim.wine/*`, `*.lovable.app/*`).
- Validar end-to-end: seleccionar un restaurante real y comprobar que el Worker devuelve `estimates` y `restaurant.google` populated.
- Limpiar strings `countries`/`country` de los i18n maps en próxima pasada.

## Sesión 8 — Analizador de Cartas (correcciones del brief 11 May 2026)

- ✅ `WineListAnalyzerTool.tsx`: timeout fetch subido de 60s → **120s** (cartas grandes 100+ vinos).
- ✅ Manejo de errores específico:
  - Si API devuelve `error: "No wines found..."` → mensaje localizado claro al usuario.
  - Mensaje específico para `AbortError` (timeout) en ES/EN.
  - El error se muestra inline encima del CTA (`#analyzer-inline-error`), no como toast oculto.
- ✅ Selector de idioma propio del analizador **eliminado**. Ahora usa `useLanguage()` global.
- ✅ País preseleccionado según idioma global (es→ES, en→US, fr→FR, de→DE, it→IT, pt→PT) y se resincroniza si cambia el idioma.
- ✅ Tabs móviles muestran texto corto ("URL"/"Texto"/"PDF") junto al icono.
- ✅ Tab URL incluye nota localizada explicando limitaciones para cartas no-texto.
- ✅ Placeholder del textarea ES/EN reescrito con ejemplo realista (TINTOS/BLANCOS/COPAS).
- ✅ Input file acepta `.pdf,.jpg,.jpeg,.png,.txt,.csv`.
- ✅ FormData del upload se envía sin Content-Type manual (el browser pone boundary). Confirmado.
- ✅ `AnalizaCarta.tsx`: eliminadas las secciones legacy 1 (HERO antiguo) y 12 (FORMULARIO antiguo de 48h). Anclas `#formulario` reemplazadas por `#analizador`. El analyzer interactivo es ahora la única vía de captura.

### Pendientes detectados (no bloqueantes)
- AnalizaCarta.tsx aún contiene código muerto: handlers (`handleSubmit`, `handleFileDrop`, `handleFileChange`), refs, estado (`mode`, `fileName`, `submitting`) e i18n maps `formI` no usados tras eliminar la sección 12. Limpieza pendiente.
- Import `Breadcrumbs` en AnalizaCarta.tsx ya no se usa.
- Polling fallback a `/v1/status/:id` no implementado: el endpoint `/v1/analyze` responde síncrono y no devuelve `analysisId` antes de completar; el aumento a 120s cubre el caso real. Reevaluar si el Worker pasa a modo asíncrono.

## Estado general

**Build**: ✅ Pasa limpio — sin warnings
**Branch**: `main` — todo empujado a `origin/main`
**Producción**: ✅ winerim.wine funcionando (home, city pages ES/DE/PT verificadas)

## Google Ads — Estado conversiones

| Estado | Cantidad | Notas |
|--------|----------|-------|
| Registrando conversiones | 3 | ✅ Funcionando |
| Etiqueta inactiva | 2 | ⚠️ Requiere atención — no se pudo diagnosticar via Chrome MCP (Shadow DOM) |
| No verificado | 1 | ⚠️ Requiere atención |
| Sin conversiones recientes | 2 | ⚠️ Requiere atención |

**Gracias.tsx**: Actualizado con Google Ads conversion tracking snippet (sesión 5).

## Apps Script — Webhook Lead Form

**Estado**: ✅ Código con deduplicación creado y entregado al usuario.
**Archivo**: `APPS_SCRIPT_LEAD_NOTIFICATION_FIX.js` (en outputs)
**Pendiente**: Usuario debe crear nueva versión de implementación (Implementar → Gestionar implementaciones → Nueva versión).
**Dedup**: Ventana de 30 minutos por email, evita duplicados por reintentos del webhook de Google Ads.

## Cloudflare Worker (`winerim-proxy`) — ✅ ACTUALIZADO

Worker desplegado el 2026-04-19 con los siguientes cambios:

### Cambios en `SEO_WILDCARD_PREFIXES`:
- ✅ `"/de/weinkarten-software-"` — cubre 9 ciudades DE
- ✅ `"/pt/software-carta-vinhos-"` — cubre 6 ciudades PT
- (Ya existían: `"/software-carta-de-vinos-"`, `"/software-vino-"`, `"/wine-list-software-"`)

### Cambios en `SPA_PREFIXES`:
- ✅ `"/de/"` — permite cualquier ruta bajo /de/
- ✅ `"/pt/"` — permite cualquier ruta bajo /pt/

### Env vars restauradas:
- `ORIGIN`, `SITE_URL`, `PRERENDER_URL`, `REDIRECTS_URL`, `SUPABASE_ANON_KEY` — todas configuradas correctamente.

### Verificación en producción:
- `winerim.wine/de/weinkarten-software-berlin` → HTTP 200, H1: "Weinkarten-Software fuer Berlins moderne Weinrestaurants"
- `winerim.wine/pt/software-carta-vinhos-lisboa` → HTTP 200, título: "Software Carta de Vinhos Lisboa | Winerim"
- `winerim.wine` (home) → HTTP 200, funciona normal

## i18n: Estado de traducciones por componente

### Páginas estáticas (src/pages/) — ✅ COMPLETO

Todas las páginas con contenido traducible tienen DE y PT. Sin cambios desde sesión 3.

### Datos compartidos — ✅ COMPLETO

Sin cambios desde sesión 3.

### SEO Templates — ✅ COMPLETO

Sin cambios desde sesión 3.

### Routing — ✅ COMPLETO

Sin cambios desde sesión 3. Catch-all `<Route path="*" element={<SeoPage />} />` sigue funcionando.

### Componentes SEO compartidos — ✅ COMPLETO

Sin cambios desde sesión 3.

### Recursos (newResources) — ✅ TRADUCCIONES CREADAS, ⚠️ NO INTEGRADO

**Archivo nuevo**: `src/data/newResourcesI18n.ts` (3,732 líneas)
**Idiomas traducidos**: EN, IT, FR (los 14 recursos)
**Arquitectura**: Archivo separado con `getLocalizedResources(lang)` que aplica overlay de traducciones sobre los datos base de `newResources.ts`.
**Tipo**: `ResourceLangContent` con 24 campos traducibles por recurso.
**PENDIENTE**: Integrar en `ResourceTemplate.tsx` / `ResourcePage.tsx` — actualmente los componentes siguen usando solo los datos en español de `newResources.ts`. También falta traducir las strings hardcoded del template (mensajes de validación, toasts, labels).

## Páginas SEO dinámicas (Supabase) — ✅ CITY PAGES EXPANSION COMPLETA

La tabla `seo_pages` tiene city pages funcionando en producción para 6 idiomas:

| Lang | Cluster | Ciudades | Estado |
|------|---------|----------|--------|
| ES | city | 61 | ✅ Activas |
| EN | city | 121 | ✅ Activas |
| IT | city | 50 | ✅ Activas |
| FR | city | 50 | ✅ Activas |
| DE | city | 39 | ✅ Activas |
| PT | city | 26 | ✅ Activas |

**Total city pages**: 347

**Expansión completada** (sesión 7): Se añadieron ~210 nuevas city pages en 6 países. SQLs generados, corregidos (related_pages type, Italian quotes, Ancona JSON) e insertados via Lovable API.

### Otros clusters — ⚠️ NO VERIFICADO

No se ha comprobado si `restaurant_type`, `country`, u otros clusters tienen entries DE/PT.

## Cosas que funcionan

- Language switcher muestra 6 idiomas con banderas
- Fallback chain: `getI18n(map, lang)` → lang → en → es
- Build Vite pasa sin errores
- Todas las páginas estáticas renderizan en DE/PT sin crash
- CTAs se muestran traducidos en DE/PT
- City pages DE/PT renderizan correctamente en producción (worker + Supabase + SPA)
- Cloudflare Worker sirve correctamente rutas `/de/*` y `/pt/*`
- Google Ads conversion tracking en Gracias.tsx (sesión 5)
- Apps Script webhook con deduplicación (sesión 6)

## Cosas que NO se han verificado

- [ ] Aspecto visual completo de las traducciones en producción
- [ ] Calidad de las traducciones (no revisadas por nativo)
- [ ] Chat widget FOUC fix funciona en producción
- [ ] Otros clusters (restaurant_type, country) para DE/PT en Supabase
- [ ] Worker: código fuente en repo (`cloudflare-worker-v3-hybrid.js`) puede estar desincronizado con el worker desplegado — el deploy se hizo via API, no desde el repo
- [ ] Google Ads: 2 etiquetas inactivas, 1 no verificada, 2 sin conversiones recientes — requieren revisión manual en Google Ads UI
- [ ] DNS: www.winerim.wine no redirige a winerim.wine — requiere config en Cloudflare
- [ ] Apps Script: usuario debe confirmar que creó nueva versión de implementación
- [ ] Integración de newResourcesI18n.ts en los componentes de renderizado
