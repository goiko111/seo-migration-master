# Salud de repo para release Biblioteca - 2026-09-01 15:48 CEST

## Hechos

- Carpeta viva revisada: `/Users/GOIKO/Documents/Playground/seo-migration-master`.
- No se publico, no se desplego, no se aplicaron migraciones, no se uso Lovable, no se toco Search Console, Supabase remoto ni Cloudflare remoto.
- La copia viva mantiene `.git` deshidratado y no es apta para commit/push directo.
- Se confirmo que `origin/main` esta en `ef64edbb35adf4ab44e030ea2e290db21c8f5bad`.
- Se creo una copia sana principal fuera de `Documents` para evitar repetir riesgo FileProvider/iCloud:
  `/Users/GOIKO/codex-workspaces/seo-migration-master-release-sane-20260901-1536`.
- En esa copia se creo la rama local `codex/winerim-biblioteca-release-gate-20260901`.
- `git status`, `git diff`, `git add --dry-run --all` y `git diff --check` funcionan correctamente en la copia sana.
- Se traslado el paquete local validado desde la copia viva a la rama sana, sin copiar backups, `dist`, `.env`, `.git`, `node_modules` ni placeholders historicos.
- La primera pasada de `npm ci` en el clone sano fallo porque `origin/main` tenia `package.json` con dos plugins Lovable dev que no estaban en `package-lock.json`.
- Se traslado tambien el `package.json` local ya corregido; despues `npm ci --ignore-scripts --no-audit --no-fund` paso.
- Se detecto que faltaban archivos activos del paquete (`HomeBelowFold`, legales, `grapesLibraryI18n`, setup/tests, tsconfig/vite/wrangler pages router, `articleContent`) y se incorporaron a la rama sana hasta igualar la copia viva en todos los archivos activos legibles.
- Comparacion live-vs-rama sobre tracked files: `modifiedCount: 0` para archivos legibles; quedan `10` tracked placeholders historicos saltados por `blocks=0`.

## Decisiones

- Usar `/Users/GOIKO/codex-workspaces/seo-migration-master-release-sane-20260901-1536` como repo candidato para commit/push posterior, no la copia viva con `.git` roto.
- Mantener la copia sana sin commit ni push hasta recibir coordinacion explicita.
- No intentar reparar `.git` manualmente en la copia viva mientras exista alternativa sana reproducible.
- Tratar la desincronizacion `package.json`/`package-lock.json` de `origin/main` como hallazgo de release: el patch debe incluir `package.json` para que `npm ci` sea reproducible.

## Hipotesis

- Trabajar fuera de `Documents` reduce el riesgo de reaparicion inmediata de placeholders `compressed,dataless`.
- El clone sano basado en `ef64edbb35adf4ab44e030ea2e290db21c8f5bad` es la via menos arriesgada para preparar un commit revisable sin mezclar la copia antigua `/Users/GOIKO/seo-migration-master`.

## Contradicciones

- `origin/main` es clonable y Git sano, pero no ejecuta `npm ci` hasta incluir el `package.json` local que alinea el lockfile.
- La copia viva tiene los gates verdes, pero no es apta para commit/push porque `.git` sigue deshidratado.
- Hay dos clones sanos creados en esta sesion: uno bajo `Documents/Playground` y otro bajo `~/codex-workspaces`; el candidato recomendado es el de `~/codex-workspaces`.

## Validaciones verdes en la copia sana

- `git status --short --untracked-files=all`: OK.
- `npm ci --ignore-scripts --no-audit --no-fund`: OK.
- `npm test -- --reporter=dot`: OK, `15` archivos y `159` tests.
- `npm run build`: OK; mantiene warnings no bloqueantes de Browserslist/caniuse-lite antiguo y chunks grandes.
- `npx tsc --noEmit --pretty false`: OK.
- `npx eslint` focal de archivos tocados y nuevos tests/validadores: OK.
- `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`: OK.
- `node docs/agent_outputs/validate_release_gates.mjs`: OK, `66` releases por superficie, cero warnings.
- `node docs/agent_outputs/validate_wine_library_20260907_batch.mjs`: OK, seis idiomas, minimo `918` palabras, nueve enlaces por fila, cero warnings.
- `git diff --check`: OK.
- Escaneo basico de secretos sobre archivos cambiados: sin credenciales detectadas; solo queda un falso positivo por una variable local `token` en Worker.

## Tareas pendientes

- Revisar el diff en la rama sana antes de commit.
- Si se autoriza, hacer commit local en `codex/winerim-biblioteca-release-gate-20260901`; push solo si no activa publish automatico no deseado.
- Confirmar si Lovable publica automaticamente desde `main` o desde rama/proyecto antes de cualquier push a rama principal.
- Mantener Search Console, despliegues y migraciones bloqueados hasta release coordinado y QA productiva.
