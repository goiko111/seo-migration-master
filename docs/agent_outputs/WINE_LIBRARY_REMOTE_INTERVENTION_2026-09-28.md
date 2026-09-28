# Biblioteca del vino - intervencion remota minima

Fecha: 2026-09-28

Estado: preparada, no ejecutada. Requiere una cuenta que vea el proyecto Supabase
`pwkqbcgjrhoyxrsmcypw` y autorizacion explicita antes de cualquier escritura o despliegue.

## Hechos

- El paquete local contiene exactamente 36 articulos: seis grupos por seis idiomas.
- El gate local confirma cero duplicados de slug, titulo, cuerpo o par
  `article_group + lang`; las seis migraciones de contenido usan `ON CONFLICT (slug)` y
  `public.articles.slug` tiene restriccion `UNIQUE`.
- Las tres migraciones de soporte solo contienen actualizaciones, no inserciones ni
  borrados, y aun asi solo pueden decidirse con el ledger.
- La lectura REST publica actual ve `18/36`: tres grupos completos presentes y tres
  ausentes, sin lotes parciales, metadatos divergentes ni contenido duplicado.
- No se ha ejecutado ningun comando de esta intervencion contra produccion.

## Fase A: solo lectura

Ejecutar desde:

```bash
cd /Users/GOIKO/codex-workspaces/winerim-web-library-release-20260928
```

Autenticar y enlazar el proyecto correcto:

```bash
supabase login
supabase link --project-ref pwkqbcgjrhoyxrsmcypw
```

Registrar las Edge Functions actuales para rollback:

```bash
supabase --output-format json functions list --project-ref pwkqbcgjrhoyxrsmcypw > docs/agent_outputs/qa-2026-09-28/pre-release-edge-functions.json
```

Ejecutar el preflight mediante lectura directa enlazada y guardar el snapshot completo
de las filas objetivo y de cualquier fila adicional perteneciente a sus grupos:

```bash
npm run audit:wine-library:remote -- --snapshot-file docs/agent_outputs/qa-2026-09-28/pre-release-articles-snapshot.json > docs/agent_outputs/qa-2026-09-28/remote-ledger-audit-authorized.json
```

El unico resultado aceptable antes de continuar es:

```bash
jq -e '.releaseGate == "ready" and .localPackage.status == "valid" and .articleRows.duplicateSlugs == [] and .articleRows.duplicateGroupLanguages == [] and .articleRows.duplicateBodies == [] and .articleRows.unexpectedRowsInExpectedGroups == [] and .articleRows.metadataMismatches == [] and .snapshot.status == "written"' docs/agent_outputs/qa-2026-09-28/remote-ledger-audit-authorized.json
```

Si aparece `repair-ledger-or-review-before-apply` o `manual-investigation`, detenerse.
No ejecutar `migration repair` ni reaplicar SQL de forma automatica.

## Fase B: dry-run obligatorio

Extraer la lista autorizable por el preflight:

```bash
jq -r '.migrations[] | select(.action == "apply-in-order") | .filename' docs/agent_outputs/qa-2026-09-28/remote-ledger-audit-authorized.json
```

Compararla con el dry-run oficial:

```bash
supabase db push --linked --dry-run > docs/agent_outputs/qa-2026-09-28/pre-release-db-push-dry-run.txt
```

El dry-run debe contener exactamente esas migraciones, en el mismo orden, y ninguna
otra. Cualquier diferencia mantiene el release bloqueado.

## Fase C: escritura, solo con autorizacion explicita

```bash
supabase db push --linked
npm run audit:wine-library:remote -- --snapshot-file docs/agent_outputs/qa-2026-09-28/post-migration-articles-snapshot.json > docs/agent_outputs/qa-2026-09-28/post-migration-ledger-audit.json
```

El segundo informe debe quedar `ready`, con las nueve migraciones en `skip`, las 36
filas presentes y todos los arrays de duplicados/discrepancias vacios. Si no ocurre,
no desplegar Edge, Pages ni Workers.

## Rollback

- Datos: generar una migracion compensatoria desde
  `pre-release-articles-snapshot.json`; eliminar solo los slugs anotados como ausentes
  antes de la escritura y restaurar exactamente las filas preexistentes.
- Edge: conservar `pre-release-edge-functions.json` y descargar las fuentes actuales de
  `sitemap` y `prerender` en una carpeta aislada antes del deploy.
- Frontend/Workers: usar los IDs y origenes ya documentados en
  `WINE_LIBRARY_COMBINED_RELEASE_HANDOFF_2026-09-28.md`.
- No usar Search Console hasta que el release coordinado y el QA productivo terminen.

## Gate actual

Bloqueado exclusivamente por acceso al proyecto y autorizacion de publicacion. No queda
otra implementacion local necesaria para Biblioteca/Blog/i18n.
