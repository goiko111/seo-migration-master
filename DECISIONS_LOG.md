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

### Hipótesis

- La estrategia correcta para escalar la biblioteca es consolidar primero la infraestructura SEO multilingüe y después enriquecer contenido editorial por idioma.
- La deuda de lint global debe tratarse como una iniciativa separada para no mezclar riesgos.
- La validación final importante será la de producción después del despliegue, especialmente sitemap, canonical, hreflang y prerender.

### Tareas pendientes

- Concluir el merge local con commit.
- Subir la rama actualizada.
- Reintentar el merge del PR.
- Definir el siguiente bloque editorial de la biblioteca del vino.
