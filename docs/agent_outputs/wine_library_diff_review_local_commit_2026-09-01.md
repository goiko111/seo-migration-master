# Revision de diff y gate de commit local - 2026-09-01 16:09 CEST

## Hechos

- Repo candidato revisado: `/Users/GOIKO/codex-workspaces/seo-migration-master-release-sane-20260901-1536`.
- Rama local: `codex/winerim-biblioteca-release-gate-20260901`; base: `ef64edbb35adf4ab44e030ea2e290db21c8f5bad`.
- No se hizo push, publish, deploy, migracion, Search Console, Lovable, Cloudflare remoto ni Supabase remoto.
- Se reviso el diff por capas: package/configuracion, shell React, router/Worker, prerender/sitemap, blog/articulos, Biblioteca, legales, tests, validadores y documentos.
- La revision detecto cuatro riesgos locales antes del commit:
  - `index.html` cargaba el chat sin esperar decision de cookies y podia revelar el widget antes de que existiera;
  - `index.html` ya no detectaba `/en`, `/it`, `/fr`, `/de` ni `/pt` como idioma para el chat;
  - `cloudflare-worker-v3-hybrid.js` podia redirigir `go.winerim.wine/` a `/en` para trafico US, rompiendo la landing de campana;
  - `GuideTemplate` habia perdido localizacion en breadcrumb home y CTA secundaria de demo.
- Se corrigieron esos riesgos en la copia sana y se anadio `src/test/router-shell-guardrails.test.ts`.
- El SQL futuro `supabase/migrations/20260713131825_add_wine_library_list_architecture_style_country_price.sql` no contiene `winerim-content-expansion`, `TELEGRAM_BOT_TOKEN`, `@secret` ni comentarios HTML.
- El escaneo de archivos cambiados no encontro credenciales; los marcadores restantes estan en sanitizadores, validadores, tests o documentos.
- Durante un intento de espejo se comprobo que en la carpeta viva bajo `Documents` algunos archivos activos vuelven a estar `compressed,dataless` con `blocks=0`; por eso no se usa esa copia para commit.
- Se creo un commit local reproducible despues de esta revision; el hash se reporta fuera de este archivo porque el commit no puede auto-contener su propio hash de forma estable.

## Decisiones

- Autorizar solo commit local reproducible desde la copia sana si las validaciones finales permanecen verdes.
- Mantener bloqueados push, publish, deploy, migraciones, Search Console y Lovable hasta nueva coordinacion explicita.
- Tratar el commit como paquete tecnico/editorial local; no como evidencia de produccion actualizada.
- Mantener `go.winerim.wine` como landing de campana y fuera de la redireccion automatica USA a `/en`.

## Hipotesis

- La copia sana fuera de `Documents` es la via mas segura para preparar una rama revisable sin heredar placeholders de FileProvider/iCloud.
- El paquete podra pasar a PR/push de rama tras confirmar que ese push no dispara una publicacion automatica no deseada.

## Contradicciones

- La copia viva es fuente documental, pero parte del codigo activo esta deshidratado; la copia sana es la fuente operativa para commit.
- `origin/main` tiene Git sano, pero `npm ci` falla sin el `package.json` local que elimina dos dependencias Lovable desalineadas con el lockfile.
- Produccion/Lovable/Cloudflare no constan sincronizados con este paquete local.
- `Winerim Supply` tiene rutas DE/PT en React/Worker, pero el bloque de `hreflang` del prerender ya venia sin DE/PT desde `origin/main`; se registra como deuda separada, no como regresion de este diff.

## Validaciones verdes

- `npm ci --ignore-scripts --no-audit --no-fund`: OK.
- `npm test -- --reporter=dot`: OK, `16` archivos y `162` tests.
- `npm run build`: OK; mantiene warnings no bloqueantes de Browserslist/caniuse-lite antiguo y chunks grandes.
- `npx tsc --noEmit --pretty false`: OK.
- `npx eslint` focal de archivos tocados, nuevos tests y validador: OK.
- `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`: OK.
- `node docs/agent_outputs/validate_release_gates.mjs`: OK, `66/66/66/66`, cero warnings.
- `node docs/agent_outputs/validate_wine_library_20260907_batch.mjs`: OK, seis idiomas, minimo `918` palabras, nueve enlaces por fila, cero warnings.
- `node --check` en Worker, router y validadores: OK.
- `git diff --check`: OK.

## Tareas pendientes

- Confirmar politica de publish de Lovable/GitHub antes de cualquier push.
- Si se autoriza release remoto, repetir gates antes de push/publish y hacer QA productiva posterior.
- Tras publish y despues del 2026-09-07 09:25 CEST, validar ES/EN/IT/FR/DE/PT para humano, Googlebot y `OAI-SearchBot/1.0`.
- Corregir en otro bloque la deuda preexistente de `hreflang` DE/PT de `Winerim Supply` en prerender.
