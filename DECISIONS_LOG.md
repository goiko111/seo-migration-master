# Decisions Log

## 2026-05-23

### Hechos

- El usuario estableció un protocolo de documentación permanente para este proyecto.
- Los documentos exigidos por el protocolo no existían al revisar `/Users/GOIKO/seo-migration-master`.
- Se detectaron y corrigieron dos creaciones iniciales fuera del repo real.
- Se implementó soporte de biblioteca del vino para alemán (`de`) y portugués (`pt`).
- Se creó la rama `codex/wine-library-de-pt`.
- Se abrió el PR `https://github.com/goiko111/seo-migration-master/pull/1`.
- Al intentar fusionar el PR, `origin/main` había avanzado y hubo conflictos de merge.
- Los conflictos se resolvieron combinando el bloque de biblioteca multilingüe con los cambios más recientes de `main`.
- Se detectó que el sitemap había perdido rutas generales `de`/`pt` de `main` durante la resolución; se corrigió manteniendo esas rutas y añadiendo las rutas de biblioteca.
- Las verificaciones posteriores al merge resuelto pasan: tests, build, lint dirigido, `deno check` y `git diff --check`.
- Se fusionó el PR `https://github.com/goiko111/seo-migration-master/pull/1` en `main`.
- Merge commit: `30e9a95f592ba1c3607c0b385a2711e783bcc525`.
- La validación ligera de producción posterior al merge detectó que el código nuevo aún no está activo para sitemap/prerender de biblioteca: sitemap público sin rutas nuevas `de`/`pt` y bot dinámico cayendo en `bot-fallback`.
- Se detectó y corrigió una contradicción en documentación de despliegue: `TECH_INSTRUCTIONS.md` apuntaba a `cloudflare-worker-v2.1-improved-debug.js`, pero el código integrado y el worker observado usan la línea `cloudflare-worker-v3-hybrid.js`.
- Se intentó desplegar desde CLI, pero Supabase falló por falta de `SUPABASE_ACCESS_TOKEN` y Cloudflare no tenía sesión `wrangler`.
- El dry-run del worker con `wrangler@3.112.0` compila correctamente.
- Se añadieron scripts de despliegue en `package.json` para repetir el proceso cuando haya credenciales.

### Decisiones

- Usar `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md` como fuente de verdad desde este punto.
- Separar hechos, decisiones, hipótesis y tareas pendientes en los documentos de seguimiento.
- Implementar soporte `de`/`pt` con paridad de rutas localizadas para la biblioteca del vino.
- Usar localización genérica de rutas de la biblioteca en sitemap y prerender para evitar mantener manualmente todas las variantes dinámicas.
- Mover el resolver de entidades de la biblioteca a `src/data/wineLibraryLinks.ts` para reutilizar enlaces internos y evitar warnings de Fast Refresh.
- Ajustar Vitest para usar el plugin instalado `@vitejs/plugin-react`.
- Añadir resolución inversa de rutas localizadas para que el selector de idioma funcione en páginas dinámicas.
- Validar las funciones Edge con `npx --yes deno-bin check` en vez de depender de un Deno instalado globalmente.
- Separar `LanguageProvider` en `src/i18n/LanguageProvider.tsx` y dejar `LanguageContext.tsx` para contexto/hook.
- En el merge con `main`, conservar los overlays i18n más recientes de uvas en `de`/`pt` y adaptar los helpers locales que necesitaba la biblioteca.
- Restaurar rutas generales `de`/`pt` en el sitemap tras detectar la contradicción.
- Mantener la deuda de lint global como iniciativa separada.
- Cerrar el bloque técnico como integrado en `main` y mover el foco a despliegue, validación productiva y mejora editorial.
- Tratar despliegue/validación productiva como siguiente bloque operativo, porque no hay CLI/script de deploy disponible en este entorno.
- No incluir tokens privados en el repo; usar variables de entorno o login local para desplegar.

### Hipótesis

- La estrategia correcta para escalar la biblioteca es consolidar primero la infraestructura SEO multilingüe y después enriquecer contenido editorial por idioma.
- La deuda de lint global debe tratarse como una iniciativa separada para no mezclar riesgos.
- La validación final importante será la de producción después del despliegue, especialmente sitemap, canonical, hreflang y prerender.

### Tareas pendientes

- Validar el despliegue en producción.
- Usar `cloudflare-worker-v3-hybrid.js` en el despliegue manual del worker.
- Ejecutar `npm run deploy:supabase:seo` y `npm run deploy:worker` cuando estén disponibles las credenciales.
- Revisar Search Console tras indexación.
- Definir el siguiente bloque editorial de la biblioteca del vino.

### Cierre de despliegue productivo

#### Hechos

- El usuario aclaró que Supabase vive dentro de Lovable para este proyecto y proporcionó el proyecto `https://lovable.dev/projects/2c4eed0e-6760-45f0-aeb3-ce44de8e91f1`.
- Se publicó el frontend desde Lovable; la UI mostró `Published` y `Up to date`.
- Se autenticó Cloudflare Wrangler como `gugocreative@gmail.com`.
- El primer despliegue CLI del Worker `winerim-proxy` (`170c5339-8938-45c9-8aaa-e8be84dac540`) dejó producción en HTTP 500 porque el script no preservaba las variables públicas del Worker.
- Se redeployó el Worker con `--keep-vars` y variables explícitas (`60c3b0e2-28ac-4785-8eb8-fd7750294823`), recuperando HTTP 200.
- Lovable desplegó las Edge Functions `sitemap` y `prerender` tras pedirlo explícitamente en el chat del proyecto.
- Se detectó que `prerender` devolvía HTML correcto con `Content-Type: text/plain`; el Worker lo rechazaba y caía en `bot-fallback`.
- Se parcheó `cloudflare-worker-v3-hybrid.js` para aceptar HTML prerenderizado por contenido real, aunque venga etiquetado como `text/plain`.
- Se desplegó el Worker final `ec6d2f24-f3f3-4739-8a56-ef6992fdf2a9`.
- Producción quedó validada:
  - Sitemap público con rutas `de` y `pt` de biblioteca.
  - Googlebot en Tempranillo alemán y portugués con `X-Prerendered: true`, `X-Worker-Branch: bot-prerender`, canonical y hreflang correctos.

#### Decisiones

- No usar Supabase externo como vía principal en este proyecto mientras Lovable gestione las Edge Functions.
- Desplegar el Worker desde el repo con `npm run deploy:worker`, no con comandos sueltos que puedan omitir variables.
- Mantener `--keep-vars` en los scripts del Worker para preservar secretos de Cloudflare.
- Tratar como válido el HTML prerenderizado si el cuerpo empieza por `<!doctype html` o `<html`, aunque el `Content-Type` no sea `text/html`.

#### Hipótesis

- El comportamiento `Content-Type: text/plain` de Supabase Edge Functions puede repetirse en otros prerenders; el sniffing de HTML evita una caída falsa a SPA para bots.
- El flujo Lovable puede requerir prompts explícitos para Edge Functions aunque la UI indique que publicar frontend es suficiente.

#### Tareas pendientes

- Commit y push de los ajustes finales.
- Revisar visualmente rutas `de`/`pt` en navegador y selector de idioma.
- Revisar avisos de seguridad de Lovable en una tarea separada.
- Monitorizar Search Console después de la indexación.

### Bloque editorial avanzado de biblioteca del vino

#### Hechos

- Se inició el siguiente bloque tras cerrar infraestructura y despliegue `de`/`pt`.
- Se implementó una nueva capa editorial para 10 uvas prioritarias.
- Las uvas incluidas son `tempranillo`, `garnacha`, `albarino`, `verdejo`, `godello`, `chardonnay`, `cabernet-sauvignon`, `pinot-noir`, `sauvignon-blanc` y `riesling`.
- El bloque añade inteligencia de servicio, rol en carta, guion de sala, palanca comercial, error a evitar, maridajes y FAQs.
- El contenido se localizó para `es`, `en`, `it`, `fr`, `de` y `pt`.
- Se integró el bloque en `GrapeDetail` para fichas completas y fichas de catálogo.
- Se corrigió `getLocalizedGrape` para aceptar `slug` y devolver la ficha completa localizada.
- Se detectó durante QA una fuga de narrativa española en fichas localizadas completas.
- Se añadió fallback narrativo localizado para evitar mezclar español en páginas internacionales cuando una ficha no tenga traducción profunda.
- Se extendió el prerender de bots para las mismas 10 uvas prioritarias y los seis idiomas.
- Verificaciones ejecutadas: `npm run test`, `npm run build`, `deno check`, `git diff --check` y navegador local en rutas `de`, `pt`, `it`, `fr`.

#### Decisiones

- Tratar la paridad entre frontend y prerender como una regla de calidad SEO de la biblioteca del vino.
- Empezar la profundidad editorial máxima por 10 uvas prioritarias antes de ampliar a más entidades.
- Usar fallbacks narrativos localizados como solución intermedia segura, sin sustituir la escritura editorial completa futura.
- Mantener este bloque separado de lint global y avisos de seguridad Lovable.
- No desplegar Worker Cloudflare porque el cambio afecta a frontend y Edge Function `prerender`, no al proxy.

#### Hipótesis

- Las 10 uvas priorizadas concentran suficiente demanda SEO y utilidad de restaurante para justificar ser la primera tanda.
- El enriquecimiento de prerender mejorará la lectura de bots y AI crawlers en fichas de uva.
- La siguiente mejora de mayor impacto será ampliar entidad por entidad con contenido propio, schema más rico y enlaces internos por intención.

#### Tareas pendientes

- Commit y push del bloque editorial.
- Publicar frontend desde Lovable.
- Pedir despliegue explícito de `prerender` desde Lovable.
- Validar producción con usuario real y Googlebot.
- Escalar el patrón editorial a 30-50 uvas/regiones/estilos prioritarios.
