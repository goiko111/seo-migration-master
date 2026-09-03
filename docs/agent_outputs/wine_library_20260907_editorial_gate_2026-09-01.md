# Gate editorial Biblioteca 2026-09-07 - 2026-09-01 15:36 CEST

## Hechos

- Carpeta viva usada: `/Users/GOIKO/Documents/Playground/seo-migration-master`.
- No se publico, no se desplego, no se aplicaron migraciones, no se tocaron produccion, Search Console, Lovable Cloud, Supabase remoto ni Cloudflare remoto.
- Se reviso `supabase/migrations/20260713131825_add_wine_library_list_architecture_style_country_price.sql`, lote `wine-library-list-architecture-style-country-price` programado para el 2026-09-07.
- El SQL contiene seis filas, una por idioma: ES, EN, IT, FR, DE y PT.
- Las fechas `published_at` estan escalonadas entre `2026-09-07T09:00:00+02:00` y `2026-09-07T09:25:00+02:00`.
- Los cuerpos tienen entre `918` y `1155` palabras visibles tras retirar sintaxis Markdown.
- Cada fila mantiene `9` enlaces internos y los enlaces de EN/IT/FR/DE/PT apuntan a rutas del mismo prefijo idiomatico.
- Se detectaron seis comentarios internos `winerim-content-expansion-20260713` dentro del body del SQL no publicado.
- Se eliminaron esos seis comentarios internos del SQL local para reducir riesgo de fuga editorial similar a las capturas historicas de marcadores.
- Se creo `docs/agent_outputs/validate_wine_library_20260907_batch.mjs` como gate reproducible del lote.
- Se reviso `https://supabase.com/changelog.md`; no se detecto ningun breaking change aplicable a esta limpieza data-only/local.

## Decisiones

- Mantener el lote 2026-09-07 como candidato local a release coordinado, no como contenido aplicado ni publicado.
- Exigir el nuevo validador del lote junto a `validate_release_gates.mjs` antes de cualquier publish/migracion.
- No actualizar `llms.txt` ni `llms-full.txt` antes de que el lote este publicado, validado y aprobado.
- No hacer commit/push desde esta carpeta mientras `.git` siga deshidratado.

## Hipotesis

- Al eliminar los comentarios del SQL se reduce el riesgo de que un render, export o prerender futuro exponga marcadores internos aunque el frontend tenga saneado defensivo.
- El paquete podra aplicarse con menor riesgo desde una fuente canonica limpia si se traslada el patch a un clon sano o si se rehidrata `.git` de forma controlada.

## Contradicciones

- La QA previa indicaba que el marcador `winerim-content-expansion` no era visible en DOM y pertenecia al script de saneado; esta revision confirma que el SQL futuro aun contenia comentarios internos en el body.
- Los gates tecnicos estaban verdes antes de la limpieza, pero no cubrian explicitamente higiene editorial del SQL del lote semanal.
- El paquete local esta mas avanzado que produccion/Lovable, que no constan sincronizados con estos cambios.

## Validaciones verdes

- `node --check docs/agent_outputs/validate_wine_library_20260907_batch.mjs`: OK.
- `node docs/agent_outputs/validate_wine_library_20260907_batch.mjs`: OK, seis filas, minimo `918` palabras, `9` enlaces por fila, cero warnings.
- `node docs/agent_outputs/validate_release_gates.mjs`: OK, `66` releases por superficie y cero warnings.
- `npm test -- --reporter=dot`: OK, `15` archivos y `159` tests.
- `npm run build`: OK; mantiene warnings no bloqueantes de Browserslist/caniuse-lite antiguo y chunks grandes.
- `npx tsc --noEmit --pretty false`: OK.
- `node --check cloudflare-worker-v3-hybrid.js`: OK.
- `node --check edge-router/winerim-pages-router.js`: OK.
- `npx eslint` focal de archivos tocados y validador nuevo: OK.
- `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`: OK.

## Validaciones con limitacion

- La comprobacion `find -flags +compressed,+dataless` no es compatible con este flag combinado en el macOS local; se sustituyo por `stat`.
- `stat` confirma que el SQL saneado y el validador nuevo estan materializados, sin flags `compressed,dataless`.

## Tareas pendientes

- Coordinar la via canonica de release: Lovable Web Winerim, clon GitHub limpio o flujo Cloudflare/Supabase autorizado.
- Tras elegir la via, trasladar el patch completo a un repo con `.git` sano o rehidratar `.git` con control.
- Si se aplica el SQL, validar despues del 2026-09-07 09:25 CEST las seis URLs para humano, Googlebot y `OAI-SearchBot/1.0`.
- Revalidar sitemap, canonical, hreflang, prerender y ausencia de marcadores internos antes de tocar Search Console.
- Mantener congelado `llms` hasta publicacion real, QA posterior y aprobacion explicita.
