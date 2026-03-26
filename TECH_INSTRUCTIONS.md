# Bot Detection Fix — Instrucciones para el Técnico

**Versión**: v2.1 (improved-debug)
**Estado**: Listo para ejecución
**Tiempo estimado**: ~1 hora

---

## ⚠️ IMPORTANTE: ORDEN CORRECTO

Debes hacer esto **en este orden exacto**:

1. **Actualizar `redirects` en Supabase** (15-30 min)
2. **Deploy Worker v2.1 en Cloudflare** (5 min)
3. **Validar en staging** con curl (15-30 min)
4. **Deploy a producción** (solo si staging OK)

**NO saltarte pasos. NO pasar a producción sin validar staging primero.**

---

## PASO 1: Actualizar `redirects` en Supabase (15-30 min)

### Ubicación
`/supabase/functions/redirects/index.ts`

### El cambio

Busca esta línea:
```typescript
const SITE = "https://winerim.wine";
```

Reemplázala por:
```typescript
const SITE = Deno.env.get("SITE_URL") || "https://winerim.wine";
```

**Eso es todo el cambio de código. Una línea.**

### Setear variables de entorno

Después, en Supabase Dashboard:

**Para staging:**
- Settings → Secrets
- Agregar: `SITE_URL` = `https://wine.winerim.wine`

**Para producción:**
- Settings → Secrets
- Agregar: `SITE_URL` = `https://winerim.wine`

(Si ya existen, actualiza sus valores)

### Deploy
- Publica los cambios en Supabase
- Espera a que se compile (suele ser rápido)

**Referencia detallada**: Ver `REDIRECTS_EDGE_FUNCTION_FIX.md`

---

## PASO 2: Deploy Worker v2.1 en Cloudflare (5 min)

### El archivo correcto
**USAR**: `cloudflare-worker-v2.1-improved-debug.js`

**NO USES**: `cloudflare-worker-v2-corrected.js` (ese es viejo)

### Cómo deployar

1. Ir a **Cloudflare Dashboard** → **Workers**
2. Buscar `winerim-proxy`
3. Hacer click en "Edit" o crear uno nuevo
4. Seleccionar **TODO el código actual** (Ctrl+A)
5. Borrarlo
6. Copiar **TODO el contenido** de `cloudflare-worker-v2.1-improved-debug.js`
7. Pegarlo en el editor
8. **Save & Deploy**

### Verificar variables de entorno

En **Settings** del Worker, verificar que existen:
- `ORIGIN` = tu URL Lovable (ej: https://seo-migration-magic.lovable.app)
- `PRERENDER_URL` = https://pwkqbcgjrhoyxrsmcypw.supabase.co/functions/v1/prerender
- `REDIRECTS_URL` = https://pwkqbcgjrhoyxrsmcypw.supabase.co/functions/v1/redirects
- `SUPABASE_ANON_KEY` = (debe estar en **Secrets**, no como variable normal)

Si falta algo, agrégalo.

**✅ Worker deployado.**

---

## PASO 3: Validar en Staging (15-30 min)

**URL de staging**: `https://wine.winerim.wine`

### Test 1: Bot Detection (Googlebot)

```bash
curl -i -H "User-Agent: Googlebot/2.1 (+http://www.google.com/bot.html)" \
  https://wine.winerim.wine/
```

**Esperado:**
- HTTP status: `200`
- `X-Worker-Branch: bot` (o `bot-fallback-origin` si falló prerender)
- `X-Worker-Bot-Detected: true`
- `X-Worker-Prerender-Status: 200-html` (o `fallback-*` si falló)
- `Content-Type: text/html` (NO text/plain, NO 204)
- `X-Prerendered: true` (si prerender tuvo éxito)

**Si ves esto ✅**: Bot detection funciona.

---

### Test 2: Sitemap (accessible a cualquiera)

```bash
curl -i https://wine.winerim.wine/sitemap.xml
```

**Esperado:**
- HTTP status: `200`
- `X-Worker-Branch: sitemap`
- `Content-Type: application/xml`
- Contenido: XML válido (comienza con `<?xml version...`)

**Si ves esto ✅**: Sitemap accesible.

---

### Test 3: Human Traffic (Mozilla/navegador)

```bash
curl -i -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" \
  https://wine.winerim.wine/
```

**Esperado:**
- HTTP status: `200`
- `X-Worker-Branch: origin`
- `X-Worker-Bot-Detected: false`
- `Content-Type: text/html`

**Si ves esto ✅**: Human traffic va al origin.

---

### Test 4: Legacy URL (debe redirigir dentro de staging)

```bash
curl -i https://wine.winerim.wine/wp-admin/
```

**Esperado:**
- HTTP status: `301` o `410`
- `X-Worker-Branch: redirect`
- `X-Worker-Redirect-Status: 301` (o `410`)
- Header `Location` presente
- **IMPORTANTE**: Location debe apuntar a `wine.winerim.wine`, NO a `winerim.wine`

**Si ves esto ✅**: Redirects dentro de staging (no a producción).

---

### Test 5: Bot Fallback (si prerender falla)

Este test es opcional pero útil para verificar el debug:

```bash
# Asume que /test-no-existe es una URL que prerender no puede renderizar
curl -i -H "User-Agent: Googlebot/2.1" \
  https://wine.winerim.wine/test-no-existe
```

**Esperado (si prerender falla)**:
- HTTP status: `200` (fallback al origin)
- `X-Worker-Branch: bot-fallback-origin` ← **ESTO ES CLAVE**
- `X-Worker-Bot-Detected: true` ← Sigue siendo un bot
- `X-Worker-Prerender-Status: fallback-no-content` o `fallback-error`

**Si ves esto ✅**: Fallback marcado explícitamente (para debug).

---

### Checklist de Staging

```
[ ] Test 1: Googlebot → X-Worker-Branch: bot
[ ] Test 2: Sitemap → X-Worker-Branch: sitemap
[ ] Test 3: Mozilla → X-Worker-Branch: origin
[ ] Test 4: /wp-admin/ → redirige a wine.winerim.wine
[ ] Test 5: Bot fallback → X-Worker-Branch: bot-fallback-origin
```

**Si todo es ✅, puedes pasar a producción.**

---

## PASO 4: Deploy a Producción (si staging OK)

**URL de producción**: `https://winerim.wine`

### Mismos tests que staging, pero en winerim.wine

```bash
# Bot
curl -i -H "User-Agent: Googlebot/2.1" https://winerim.wine/

# Sitemap
curl -i https://winerim.wine/sitemap.xml

# Human
curl -i -H "User-Agent: Mozilla/5.0" https://winerim.wine/

# Legacy URL (debe redirigir a winerim.wine, no wine.winerim.wine)
curl -i https://winerim.wine/wp-admin/
```

**La única diferencia**: En producción, los redirects deben apuntar a `winerim.wine` (no a `wine.winerim.wine`).

Si todo es igual que staging, **✅ estás listo en producción.**

---

## ❌ Si Algo Falla

### "Sin headers X-Worker-*"
→ Worker v1 aún deployado o Worker no actualizó
→ Redeployar con `cloudflare-worker-v2.1-improved-debug.js`

### "X-Worker-Branch: origin pero debería ser bot"
→ Bot detection fallando
→ Verificar que `/i` flag está en BOT_REGEX (línea 16 del Worker)

### "Staging redirige a winerim.wine (producción)"
→ Redirects no fue actualizado o SITE_URL no está seteado
→ Verificar que `/supabase/functions/redirects/index.ts` tiene `Deno.env.get("SITE_URL")`
→ Verificar que SITE_URL está en Supabase Secrets

### "Content-Type: text/plain en lugar de text/html"
→ Prerender no está devolviendo HTML válido
→ Revisar logs de la edge function prerender en Supabase

### "HTTP 204 No Content"
→ Worker v1 aún deployado
→ Redeployar con v2.1

---

## 📞 Contacto/Dudas

Si tienes dudas sobre:
- **Cómo actualizar Supabase**: Ver `REDIRECTS_EDGE_FUNCTION_FIX.md`
- **Cómo deployar en Cloudflare**: Ver `DEPLOYMENT_CHECKLIST.md`
- **Qué esperar en tests**: Ver `VALIDATION_TESTS.md`
- **Qué cambió en v2.1**: Ver `IMPROVEMENTS_V2.1.md`

---

## Resumen de archivos

| Archivo | Propósito |
|---------|-----------|
| `cloudflare-worker-v2.1-improved-debug.js` | ⭐ **El Worker a deployar** |
| `REDIRECTS_EDGE_FUNCTION_FIX.md` | Cómo actualizar `redirects` |
| `DEPLOYMENT_CHECKLIST.md` | Paso a paso detallado |
| `VALIDATION_TESTS.md` | Suite completa de tests |
| `TECH_INSTRUCTIONS.md` | Este documento |

---

## ⏱️ Timeline

```
Paso 1 (Redirects):      15-30 min
Paso 2 (Worker deploy):   5 min
Paso 3 (Tests staging):  15-30 min
Paso 4 (Deploy prod):     5 min
                         ───────
TOTAL:                   ~1 hora
```

---

## Éxito

Cuando hayas completado todos los pasos y todos los tests pasen en **staging** y **producción**, habrá:

✅ Googlebot siendo detectado correctamente
✅ Sitemap accesible a todos
✅ Bots recibiendo prerendered HTML
✅ Fallbacks claros si algo falla
✅ Headers de debug para future troubleshooting
✅ Staging y producción trabajando independientemente

**¡Listo para pasar a siguiente fase!**
