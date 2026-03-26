# Cloudflare Worker — Test Suite de Validación

Una vez hecha la actualización de redirects y deployada la v2 del Worker, ejecuta estos tests en staging.

---

## Test 1: Bot Detection (Googlebot)

```bash
curl -i -H "User-Agent: Googlebot/2.1 (+http://www.google.com/bot.html)" \
  https://wine.winerim.wine/
```

**Esperado:**
- `X-Worker-Branch: bot` (o `bot-fallback-origin` si prerender falla)
- `X-Worker-Bot-Detected: true`
- `X-Worker-Prerender-Status: 200-html` (si prerender tuvo éxito)
- `Content-Type: text/html` (NO `text/plain`, NO `204`)
- `X-Prerendered: true` (si prerender fue exitoso)
- HTTP status: `200`

**Si ves:**
- `X-Worker-Branch: redirect` → El request matcheó legacy URL
- `X-Worker-Branch: bot-fallback-origin` → Bot, pero prerender falló. Fallback al origin.
- `X-Worker-Prerender-Status: fallback-no-content` o `fallback-error` → Indica por qué falló
- `204 No Content` → ❌ BUG (debería fallback a bot-fallback-origin)
- `text/plain` → ❌ BUG (debería ser HTML)

---

## Test 2: Bot Detection (Bingbot)

```bash
curl -i -H "User-Agent: Bingbot/2.0" \
  https://wine.winerim.wine/
```

**Esperado:** Mismo que Test 1 (debería detectarse como bot)

---

## Test 3: Human Traffic (Chrome)

```bash
curl -i -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0" \
  https://wine.winerim.wine/
```

**Esperado:**
- `X-Worker-Branch: origin` (NO `bot`)
- `X-Worker-Bot-Detected: false` (NO `true`)
- `Content-Type: text/html` (SPA desde Lovable)
- HTTP status: `200`

---

## Test 4: Sitemap (sin UA específico)

```bash
curl -i https://wine.winerim.wine/sitemap.xml
```

**Esperado:**
- `X-Worker-Branch: sitemap`
- `Content-Type: application/xml`
- HTTP status: `200`
- Contenido: XML válido

**Si ves:**
- `404` → Prerender no está serviendo sitemap
- `text/html` → Cayó al origin, no fue detectado como sitemap

---

## Test 5: Sitemap con bot UA (debe ser igual)

```bash
curl -i -H "User-Agent: Googlebot/2.1" \
  https://wine.winerim.wine/sitemap.xml
```

**Esperado:** Mismo que Test 4 (sitemap es independiente de bot detection)

---

## Test 6: Legacy WordPress URL (debe redirigir)

```bash
curl -i https://wine.winerim.wine/wp-admin/
```

**Esperado:**
- HTTP status: `301` o `410` (según la función redirects)
- `X-Worker-Branch: redirect`
- `X-Worker-Redirect-Status: 301` (o `410`)
- Header `Location` presente (para 301)

---

## Test 7: URL normalization (trailing slash)

```bash
curl -i https://wine.winerim.wine/wine-list-management-software/
```

**Esperado:**
- HTTP status: `301` (redirect a sin trailing slash)
- `X-Worker-Branch: redirect`
- `X-Worker-Redirect-Status: 301-normalization`
- Header `Location: https://wine.winerim.wine/wine-list-management-software`

---

## Test 8: Home page con bot

```bash
curl -s -H "User-Agent: Googlebot/2.1" https://wine.winerim.wine/ \
  | grep -E "<h1|<title|<meta name=\"description\"|<link rel=\"canonical\"" | head -5
```

**Esperado:** Devuelve HTML con metadatos, título, h1, etc. (no vacío)

**Si ves:**
- Vacío → Prerender no está generando contenido
- `<h1>Not Found</h1>` → Prerender devolvió error 404

---

## Test 9: Comparar home page (Bot vs Human)

```bash
# Bot version
echo "=== BOT VERSION ===" && \
curl -s -H "User-Agent: Googlebot/2.1" https://wine.winerim.wine/ | grep -c "<html" && \
curl -s -H "User-Agent: Googlebot/2.1" https://wine.winerim.wine/ | head -c 500

# Human version
echo -e "\n\n=== HUMAN VERSION ===" && \
curl -s -H "User-Agent: Mozilla/5.0" https://wine.winerim.wine/ | grep -c "<html" && \
curl -s -H "User-Agent: Mozilla/5.0" https://wine.winerim.wine/ | head -c 500
```

**Esperado:**
- Ambas devuelven HTML con `<html>`
- Bot version podría tener metadatos adicionales prerendercados
- Human version devuelve SPA desde Lovable

---

## Test 10: Response headers globales

```bash
curl -i https://wine.winerim.wine/ | grep -E "^X-|^Content-Type|^Cache-Control"
```

**Esperado:**
- Headers presentes: `X-Worker-Branch`, `X-Worker-Bot-Detected`
- Security headers: `X-Frame-Options`, `X-Content-Type-Options`
- Cache control apropiado

---

## Script Completo (bash)

Guarda esto en un archivo `test-worker.sh`:

```bash
#!/bin/bash

DOMAIN="wine.winerim.wine"
RESULTS="test-results-$(date +%Y%m%d-%H%M%S).txt"

{
  echo "=== CLOUDFLARE WORKER VALIDATION TESTS ==="
  echo "Domain: $DOMAIN"
  echo "Date: $(date)"
  echo ""

  echo "TEST 1: Googlebot"
  curl -s -i -H "User-Agent: Googlebot/2.1" https://$DOMAIN/ | head -20
  echo ""

  echo "TEST 2: Mozilla/Human"
  curl -s -i -H "User-Agent: Mozilla/5.0" https://$DOMAIN/ | head -20
  echo ""

  echo "TEST 3: Sitemap"
  curl -s -i https://$DOMAIN/sitemap.xml | head -15
  echo ""

  echo "TEST 4: Legacy URL"
  curl -s -i https://$DOMAIN/wp-admin/ | head -15
  echo ""

} | tee $RESULTS

echo "Resultados guardados en: $RESULTS"
```

Úsalo así:

```bash
chmod +x test-worker.sh
./test-worker.sh
```

---

## Matriz de Validación Rápida

| Test | Esperado | ¿Listo? |
|------|----------|--------|
| Googlebot User-Agent | `X-Worker-Branch: bot` | ☐ |
| Googlebot Content-Type | `text/html` (no text/plain) | ☐ |
| Googlebot Status | `200` (no 204) | ☐ |
| Mozilla User-Agent | `X-Worker-Branch: origin` | ☐ |
| Sitemap | `X-Worker-Branch: sitemap` | ☐ |
| Sitemap Content-Type | `application/xml` | ☐ |
| Legacy URL | `X-Worker-Branch: redirect` | ☐ |
| Trailing slash | `301` redirect | ☐ |
| Home con bot | HTML con `<h1>` | ☐ |
| Home sin bot | SPA funcional | ☐ |

---

## Troubleshooting

| Problema | Causa | Solución |
|----------|-------|----------|
| Todo devuelve `origin` | Bot detection fallando | Verificar `/i` flag en BOT_REGEX |
| Sitemap devuelve 404 | Prerender no sirve sitemap | Verificar edge function prerender |
| Sitemap dentro del bloque bot | Code outdated | Verificar que v2 fue deployed |
| Staging redirige a producción | redirects hardcodeado | Actualizar edge function redirects |
| 204 No Content en prerender | Code outdated (v1) | Verificar que v2 fue deployed |
| Headers de debug no aparecen | Cloudflare caching | Limpiar cache o usar `?t=timestamp` |

---

## Success Criteria

Todos estos deben ser ✅ **en staging** (wine.winerim.wine):

- [ ] Googlebot es detectado → `X-Worker-Branch: bot` (o `bot-fallback-origin`)
- [ ] Mozilla no es detectado → `X-Worker-Branch: origin`
- [ ] Prerender devuelve HTML (no 204, no text/plain)
- [ ] Sitemap es accesible por cualquier UA
- [ ] Legacy URLs redirigen **dentro de staging** (a wine.winerim.wine, NO a winerim.wine)
- [ ] Headers de debug están presentes (incluyendo `X-Worker-Prerender-Status`)
- [ ] No hay errores 502 en URLs válidas
- [ ] Bot fallback marcado como `bot-fallback-origin` si prerender falla

Cuando todo sea ✅ **en staging**, aplica los mismos tests en **producción** (winerim.wine) y confirma que Legacy URLs redirigen dentro de producción (a winerim.wine).

Cuando ambos ambientes pasen, está listo para producción.
