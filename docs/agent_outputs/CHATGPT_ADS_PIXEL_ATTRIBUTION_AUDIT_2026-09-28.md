# Auditoría de atribución del Pixel de ChatGPT Ads

Fecha: 2026-09-28

## Alcance

- Pixel público: `PJjbjzqWhEvepS3MMogyEs`.
- SDK: `https://bzrcdn.openai.com/sdk/oaiq.min.js`.
- Fuente auditada: `/Users/GOIKO/codex-workspaces/winerim-web-library-release-20260928`, commit base `eb2af1c8`.
- Trabajo exclusivamente local. No hubo despliegue, escritura en Supabase, lead real ni cambio de campaña.

## Hechos

- La aplicación instala una sola cola global, ejecuta un único `init` y solicita una sola copia del SDK después de consentimiento aceptado.
- Sin consentimiento no se realiza ninguna solicitud a dominios de medición de OpenAI.
- El evento implementado es el estándar `lead_created` con `{ type: "customer_action" }` y un `event_id` derivado del UUID persistido. Solo se emite después de que `contact_leads` confirme la inserción o el reintento del mismo UUID.
- La implementación no envía `page_viewed`. Por tanto, las visitas no deben compararse directamente con el contador de `lead_created`.
- El redirect de inicio para visitantes ingleses/estadounidenses enviaba `https://winerim.wine/?oppref=...` a `https://winerim.wine/en` y eliminaba toda la query.
- El SDK se carga después del consentimiento. Antes de la corrección, una navegación SPA previa a aceptar también podía retirar `oppref` de la URL.
- No se detectó una CSP del sitio que bloquee el SDK. Los bloqueadores del navegador siguen siendo una causa externa posible.

## Diagnóstico por categoría

### Pixel no carga

- Esperado mientras el consentimiento está pendiente o rechazado.
- También puede ocurrir por bloqueo de `bzrcdn.openai.com` en navegador o red.
- Con consentimiento aceptado, el test local confirma exactamente una solicitud del SDK.

### Pixel carga sin eventos

- Es normal en una visita sin envío exitoso: no existe un evento de página configurado.
- Un fallo de persistencia en Supabase no genera `lead_created`, por diseño.

### Evento mal definido

- No encontrado. Nombre, tipo y deduplicación coinciden con el evento estándar implementado.

### Conversión no atribuida

- Causa probable encontrada: pérdida de `oppref` en el redirect `/` -> `/en` y durante navegación SPA previa al consentimiento.
- Continúan fuera del alcance local la asociación del Pixel a la campaña, el ajuste de conversión, la ventana de atribución y la existencia de un clic elegible.

### Ausencia real de conversiones

- Sigue siendo posible si no hubo usuarios que aceptaran cookies y completaran correctamente Contacto, Demo o Meta Demo.
- Los formularios secundarios que no usan `persistLeadAndMeasure` no cuentan como `lead_created` de OpenAI.

## Corrección local

- `edge-router/winerim-pages-router.js`: conserva `url.search` en el redirect a `/en`.
- `src/lib/openaiAds.ts`: retiene `oppref` solo en memoria durante la navegación SPA y lo restaura justo antes de la primera carga consentida del SDK. No usa cookies, `localStorage` ni red antes del consentimiento y consume la referencia una sola vez.
- `src/test/openai-ads.test.ts`: cubre preservación de `oppref`, consumo único y redirect.
- `scripts/verify-chatgpt-ads-browser.mjs`: añade un recorrido Playwright de atribución previo al consentimiento.

## Evidencia reproducible

- Worker `node --check`: PASS.
- Redirect directo: `302`, `X-Winerim-Router: us-home-locale-redirect`, location `https://winerim.wine/en?oppref=click_123&utm_source=chatgpt`.
- Vitest focal: `12/12` PASS.
- TypeScript: PASS.
- ESLint focal: PASS.
- Build Vite: PASS.
- Playwright: `0` solicitudes OpenAI sin consentimiento, `1` SDK tras consentimiento, `oppref` preservado, `2` intentos de persistencia, `1` evento y UUID estable.

## Decisiones

- No desplegar este ajuste aislado desde un árbol diferente al candidato coordinado Web/Biblioteca.
- No generar un lead ficticio en producción para forzar estadísticas.
- Mantener el modelo de consentimiento actual y no almacenar `oppref` de forma persistente antes de la aceptación.

## Hipótesis

- La pérdida de `oppref` explica conversiones recibidas pero no atribuidas en una parte del tráfico estadounidense. No demuestra que sea la única causa.

## Contradicciones y límites

- La web puede enviar correctamente `lead_created` y Ads Manager seguir mostrando cero conversiones si el evento no está seleccionado para la campaña, el clic no es elegible o queda fuera de ventana.
- El test intercepta el SDK y Supabase: prueba la integración del sitio sin contaminar sistemas reales, pero no acredita recepción final en Ads Manager.

## Gate antes de publicar

1. Revisar el diff con la fuente coordinada del release y conservar el router que sirve producción.
2. Repetir los gates focales y el smoke de rutas comerciales, legales y formularios.
3. Publicar solo con autorización explícita.
4. Usar un clic de prueba autorizado con `oppref`, aceptar consentimiento y enviar un lead identificable no personal.
5. Confirmar en Monitoring Events la recepción de `lead_created` y en Ads Manager que la campaña usa ese evento y la fuente correcta.
6. Comparar durante varios días clics elegibles, consentimientos, leads persistidos, eventos recibidos y conversiones atribuidas; no comparar visitas brutas con conversiones.
