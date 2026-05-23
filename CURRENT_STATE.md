# Current State

## Hechos

- Fecha de actualización: 2026-05-23.
- Al aplicar el nuevo protocolo, los archivos `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md` no existían en `/Users/GOIKO/seo-migration-master`.
- Hubo dos correcciones de ubicación al arrancar el protocolo:
  - El primer intento creó estos documentos en `/Users/GOIKO/Documents/Playground`.
  - El segundo intento usó `../seo-migration-master`, que apuntaba a `/Users/GOIKO/Documents/seo-migration-master`.
  - La ubicación correcta es `/Users/GOIKO/seo-migration-master`.
- Se corrigió creando los documentos en `/Users/GOIKO/seo-migration-master` y eliminando los duplicados fuera de sitio.
- La ampliación de la biblioteca del vino a alemán (`de`) y portugués (`pt`) está implementada y comprometida localmente en la rama `codex/wine-library-de-pt`; push, PR y despliegue quedan pendientes.
- El trabajo está ahora aislado en la rama `codex/wine-library-de-pt`.
- El bloque incluye cambios de i18n, rutas, SEO, sitemap, prerender, enlaces internos, tests y documentación de seguimiento.
- Se corrigió un fallo detectado durante la revisión: el selector de idioma no resolvía bien rutas dinámicas localizadas de la biblioteca, por ejemplo `/de/weinbibliothek/rebsorten/tempranillo` hacia su equivalente en otros idiomas.
- Se separó `LanguageProvider` de `LanguageContext` para eliminar warnings de Fast Refresh sin cambiar los imports existentes de `useLanguage`.
- Verificación acumulada del bloque:
  - `npm run test` pasa: 4 archivos de test, 8 tests.
  - `npm run build` pasa.
  - `npx --yes deno-bin check supabase/functions/sitemap/index.ts supabase/functions/prerender/index.ts` pasa.
  - ESLint dirigido sobre los archivos tocados pasa sin errores ni warnings.
  - Render DOM verificado previamente para `/de/weinbibliothek/rebsorten/tempranillo`, incluyendo enlaces relacionados hacia rutas localizadas.
- `npm run lint -- --quiet` falla por 66 errores en archivos fuera del alcance directo de esta tarea.
- `deno` no está instalado globalmente, pero se pudo validar con `npx --yes deno-bin`.
- `git diff --check` pasó antes del commit.
- El intento de `git push -u origin codex/wine-library-de-pt` falló porque GitHub HTTPS no pudo leer credenciales en este entorno: `Device not configured`.
- `gh` no está disponible en el entorno, por lo que no se pudo crear PR desde la terminal.

## Decisiones

- Antes de seguir con cambios funcionales, se documenta el estado inicial exigido por el nuevo protocolo.
- Los errores globales de lint se tratan como deuda separada hasta revisar esos archivos específicamente.
- Se usa `codex/wine-library-de-pt` para aislar el bloque antes de commit/PR.
- El bloque se cierra en un commit de feature único para facilitar revisión.
- El push queda bloqueado hasta configurar credenciales de GitHub o usar otro método de publicación.
- La resolución de rutas de la biblioteca debe ser reversible para que el selector de idioma funcione también en fichas dinámicas.
- `LanguageProvider` debe vivir separado de `LanguageContext` para mantener Fast Refresh limpio.

## Hipótesis

- Los 66 errores de lint global son deuda preexistente o ajena al bloque de trabajo de la biblioteca del vino, porque el lint dirigido sobre los archivos tocados pasa.
- La deuda de lint global sigue fuera del alcance del bloque actual.

## Tareas pendientes

- Configurar credenciales de GitHub o empujar la rama desde un entorno autenticado.
- Crear PR desde `codex/wine-library-de-pt`.
- Ejecutar de nuevo `npm run test`, `npm run build`, lint dirigido y `deno check` si se hacen nuevos cambios.
- Separar en una tarea propia la deuda de lint global.
- Desplegar y validar sitemap, canonical, hreflang y prerender en producción.
