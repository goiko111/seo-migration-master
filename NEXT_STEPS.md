# NEXT_STEPS.md — winerim.wine

> Tareas pendientes priorizadas. Se reescribe al final de cada sesión.
> Última actualización: 2026-05-11 (sesión 9)

## Sesión 9 — abierto al cierre

### A. Validación end-to-end Google Places + estimates
- Publicar el front (Lovable Publish) y, en producción, seleccionar un restaurante real desde el autocomplete.
- Confirmar que el body POST a `/v1/analyze` incluye `placeId` y `restaurantName`.
- Confirmar que la respuesta trae `restaurant.google` (rating, reviews, type, address) y `estimates` (ticketMedio, ticketVino, bottlesPerService, monthlyRevenue, wps).
- Probar caso `pendingContact: true` con una carta >500 vinos (o forzar desde el Worker en staging).

### B. Restricción de API key Google Maps (MANUAL — GCP)
- En Google Cloud Console → APIs & Services → Credentials → API key `AIzaSyBcqZoVnmhGY12S39puKR248cIACToSZ4A`.
- Application restrictions → HTTP referrers, añadir:
  - `https://winerim.wine/*`
  - `https://*.winerim.wine/*`
  - `https://*.lovable.app/*` (preview)
  - `http://localhost:*` (dev)
- API restrictions → restringir a `Maps JavaScript API` y `Places API`.

### C. Limpieza i18n del analizador (cosmética)
- Eliminar `countries: { ... }` y `country: "..."` de cada bloque `T[lang]` en `WineListAnalyzerTool.tsx` — ya no se usan tras retirar el selector de país.

## Sesión 8 — abierto al cierre

## Sesión 8 — abierto al cierre

### A. Limpieza AnalizaCarta.tsx (cosmética/build)
- Eliminar handlers y estado del formulario antiguo (`handleSubmit`, `handleFileDrop`, `handleFileChange`, `fileRef`, `mode`, `fileName`, `submitting`, `formI`, `setMode`, `setFileName`, `setSubmitting`).
- Eliminar import `Breadcrumbs` no usado.
- Confirmar que `t.form.*` y `t.hero.*` ya no se referencian; quitar de los i18n maps.

### B. Validación end-to-end del analizador
- Probar con PDF real >50 vinos contra `https://api.winerim.wine/v1/analyze` (Worker actualizado 11 May 2026).
- Probar texto pegado >100 vinos (verificar que 120s es suficiente).
- Probar URL de carta texto-only.
- Confirmar que `/v1/unlock` envía email + devuelve `reportUrl`.

### C. Decidir polling asíncrono
- Si el Worker pasa a respuesta inmediata + `analysisId` con polling `/v1/status/:id`, refactorizar `WineListAnalyzerTool` para usar ese flujo en vez del fetch bloqueante.

## Prioridad alta — Requiere acción manual

### 1. Fix Google Ads conversion tags (MANUAL)

**Qué**: 2 etiquetas inactivas, 1 no verificada, 2 sin conversiones recientes. Solo 3 de 8 están "Registrando conversiones".

**Acción**: Ir a Google Ads → Objetivos → Conversiones → revisar cada acción de conversión individualmente. Las etiquetas inactivas probablemente necesitan reinstalación del snippet o verificación del tag.

**Nota**: No se pudo diagnosticar via automatización — el panel de Google Ads usa Shadow DOM que impide extracción de datos.

### 2. Fix DNS www.winerim.wine → winerim.wine (MANUAL)

**Qué**: `www.winerim.wine` no redirige a `winerim.wine`. Necesita configuración en Cloudflare.

**Acción en Cloudflare** (cuenta `Gugocreative@gmail.com`):
1. DNS → Añadir CNAME: `www` → `winerim.wine` (proxied)
2. Rules → Redirect Rules → Crear regla:
   - Si hostname = `www.winerim.wine`
   - Entonces redirect 301 a `https://winerim.wine${uri}`

### 3. Deploy nueva versión Apps Script (MANUAL)

**Qué**: El código con deduplicación ya está guardado pero necesita nueva implementación.

**Acción**: En el Apps Script → Implementar → Gestionar implementaciones → Editar implementación existente → Nueva versión → Implementar.

---

## Prioridad alta — Desarrollo

### 4. Integrar newResourcesI18n.ts en componentes

**Qué**: El archivo de traducciones de recursos existe (`src/data/newResourcesI18n.ts`, 14 recursos × 3 idiomas EN/IT/FR) pero NO está conectado a los componentes de renderizado.

**Acción**:
1. Modificar `ResourceTemplate.tsx` para importar `getLocalizedResource()` y aplicar overlay de traducciones según el idioma activo
2. Traducir strings hardcoded del template (mensajes de validación, toasts, labels)
3. Añadir traducciones DE/PT para los 14 recursos

### 5. ~~Expansión masiva de city pages~~ ✅ COMPLETADO

**Completado sesión 7**: 347 city pages activas en 6 idiomas (ES=61, EN=121, IT=50, FR=50, DE=39, PT=26). SQLs en `sql/` del repo.

### 6. Sincronizar worker del repo con el desplegado

**Qué**: `cloudflare-worker-v3-hybrid.js` en el repo puede estar desincronizado con el worker en producción.

---

## Prioridad media

### 7. Campañas Meta Leads US/UK (#118)
### 8. Optimizar retargeting Meta — CTA + destino (#103)
### 9. Evaluar cambio destino Google Ads → páginas de recursos (#109)
### 10. Verificar otros clusters (restaurant_type, country) para DE/PT
### 11. Revisión visual traducciones en producción
### 12. Chat widget FOUC fix en producción

---

## Prioridad baja

### 13. CTA overrides para DE/PT
### 14. Traducción de datos de catálogo (uvas, regiones, estilos)
### 15. Revisión por nativos DE/PT
### 16. Restaurant type pages para DE/PT

---

## Completado en sesión 6

- ✅ Apps Script con deduplicación creado y entregado (`APPS_SCRIPT_LEAD_NOTIFICATION_FIX.js`)
- ✅ Traducciones de recursos EN/IT/FR creadas (`newResourcesI18n.ts`, 3,732 líneas, 14 recursos)
- ✅ Investigación lead Francia: 1 lead real (Christophe Roublin), duplicados por reintentos webhook
- ✅ Documentos de proyecto actualizados
- ✅ Archivos de traducción commiteados y pusheados

## Completado en sesión 5

- ✅ Google Ads conversion tracking en Gracias.tsx
- ✅ Traducción de testimonios a EN/IT/FR
- ✅ Traducción tabla comparativa homepage
- ✅ Localización chat widget por idioma
- ✅ Fix "Distribuidores" en footer EN/IT
- ✅ Auditoría completa traducciones web

## Completado en sesión 4

- ✅ Diagnóstico y fix 404 en /de/* y /pt/* (Cloudflare Worker whitelist)
- ✅ Worker `winerim-proxy` actualizado con DE/PT
- ✅ Verificado en producción

## Para retomar la próxima sesión

1. Leer los 4 documentos: `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md`, `NEXT_STEPS.md`
2. Prioridad: Integrar traducciones de recursos en componentes (punto 4)
3. Prioridad: Completar expansión city pages pendientes (punto 5)
4. Usuario debe confirmar: ¿se hizo el deploy de nueva versión del Apps Script? ¿Se fijaron las etiquetas de conversión? ¿Se configuró el DNS www?
