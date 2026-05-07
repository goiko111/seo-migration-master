# CURRENT_STATE.md — winerim.wine

> Estado actual del proyecto. Actualizado al final de cada sesión de trabajo.
> Última actualización: 2026-05-07 (sesión 6)

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

## Páginas SEO dinámicas (Supabase) — ✅ CITY PAGES DE/PT ACTIVAS

La tabla `seo_pages` tiene city pages funcionando en producción:

| Lang | Cluster | Ciudades | Estado |
|------|---------|----------|--------|
| ES | city | 3 (Madrid, Barcelona, Valencia) | ✅ Activas |
| DE | city | 9 (Berlin, Düsseldorf, Frankfurt, Hamburg, Köln, München, Stuttgart, Wien, Zürich) | ✅ Activas |
| PT | city | 6 (Braga, Coimbra, Faro, Funchal, Lisboa, Porto) | ✅ Activas |
| EN | city | 0 | ❌ No existen |
| FR | city | 0 | ❌ No existen |
| IT | city | 0 | ❌ No existen |

**Total city pages**: 18

**FALTA**: Expansión masiva de ciudades. España tiene solo 3 (faltan Sevilla, Málaga, Bilbao, etc.). EN/FR/IT no tienen ninguna. DE y PT podrían ampliarse.

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
