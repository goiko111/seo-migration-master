# Decisions Log

## 2026-05-23

### Hechos

- El usuario estableció un protocolo de documentación permanente para este proyecto.
- Los documentos exigidos por el protocolo no existían al revisar `/Users/GOIKO/seo-migration-master`.
- Se detectaron y corrigieron dos creaciones iniciales fuera del repo real.

### Decisiones

- Usar `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md` como fuente de verdad desde este punto.
- Crear los cuatro documentos en la raíz del repo y arrancarlos con el estado verificable disponible.
- Separar hechos, decisiones, hipótesis y tareas pendientes en los documentos de seguimiento.
- Implementar soporte de biblioteca del vino para alemán (`de`) y portugués (`pt`) con paridad de rutas localizadas.
- Usar localización genérica de rutas de la biblioteca del vino en sitemap y prerender para evitar mantener manualmente todas las variantes.
- Mover el resolver de entidades de la biblioteca a `src/data/wineLibraryLinks.ts` para evitar warnings de Fast Refresh y reutilizar enlaces internos.
- Ajustar Vitest para usar el plugin instalado `@vitejs/plugin-react`.
- Crear y usar la rama `codex/wine-library-de-pt` para aislar el bloque de trabajo.
- Añadir resolución inversa de rutas localizadas de la biblioteca para que el selector de idioma funcione en páginas dinámicas.
- Validar las funciones Edge tocadas con `npx --yes deno-bin check` en vez de depender de un Deno instalado globalmente.
- Separar `LanguageProvider` en `src/i18n/LanguageProvider.tsx` y dejar `LanguageContext.tsx` para contexto/hook, eliminando warnings de Fast Refresh en el lint dirigido.
- Cerrar el bloque técnico en un commit de feature en `codex/wine-library-de-pt`.
- Instalar GitHub CLI (`gh`) con Homebrew, autenticarlo vía navegador y configurar Git con `gh auth setup-git` para poder subir la rama.
- Crear el PR `https://github.com/goiko111/seo-migration-master/pull/1` desde `codex/wine-library-de-pt` hacia `main`.

### Hipótesis

- La estrategia correcta para escalar la biblioteca es consolidar primero la infraestructura SEO multilingüe y después enriquecer contenido editorial por idioma.
- La deuda de lint global debe tratarse como una iniciativa separada para no mezclar riesgos.

### Tareas pendientes

- Revisar y aprobar el PR `https://github.com/goiko111/seo-migration-master/pull/1`.
- Definir el siguiente bloque editorial de la biblioteca del vino.
