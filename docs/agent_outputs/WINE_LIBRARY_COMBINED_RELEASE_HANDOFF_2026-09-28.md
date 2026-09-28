# Web/Biblioteca - candidato combinado de release

Fecha: 2026-09-28

Estado: fuente Git consolidada y QA local verde; produccion intacta; release bloqueado
por ledger y versionado de Supabase.

## Hechos

- Worktree limpio objetivo: `/Users/GOIKO/codex-workspaces/winerim-web-library-release-20260928`.
- Rama: `codex/winerim-web-library-release-20260928`.
- Base productiva Git: `8879ef49`.
- Checkpoint comercial que reproduce las rutas activas: `2d885503`.
- Paquete Biblioteca/Blog/i18n integrado: `d87eb0e1`.
- Los cambios comerciales sin commit del checkout anterior se conservaron y se
  comprometieron sin incluir sus 51 evidencias y temporales.
- No hubo push, Pages deploy, Worker deploy, funcion Edge, migracion, purga ni accion de
  Search Console.

## Produccion leida antes del release

- Frontend general: `https://0ec77291.winerim-origin.pages.dev`.
- Comercial: `https://b5d4f8eb.winerim-origin.pages.dev`.
- Catalonia: `https://4867c418.winerim-origin.pages.dev`.
- Router activo: `winerim-edge-router` version
  `d3bb33d3-772c-47db-bdbb-d2cadc6e2734`.
- Backend activo: `winerim-proxy` version
  `d893a932-b4bc-40f6-872f-034ebf736c8e`.
- Las cuatro propuestas comerciales responden `200/noindex`; `/presentacion/saddle`
  redirige a `/propuesta-comercial`.
- Googlebot y OAI reciben prerender en hubs y articulos existentes. Un articulo
  inexistente aun devuelve `200` en produccion; el candidato local lo corrige a
  `404/noindex`.

## Reconciliacion remota de datos

- El REST publico del proyecto `pwkqbcgjrhoyxrsmcypw` permite una lectura de las filas
  editoriales esperadas: `18/36` existen y no hay ningun grupo parcial.
- Filas completas, candidatas a no reaplicar tras confirmar ledger:
  - `20260713123000_add_blog_wine_list_margin_leaks_restaurant.sql`.
  - `20260713124000_add_learn_wine_service_temperature_restaurant.sql`.
  - `20260713125000_add_wine_library_pairing_matrix_texture_acidity_fat.sql`.
- Filas ausentes, candidatas a aplicar solo si el ledger confirma que faltan:
  - `20260713131823_add_learn_wine_guest_questions_service_scripts.sql`.
  - `20260713131825_add_wine_library_list_architecture_style_country_price.sql`.
  - `20260713152451_add_blog_slow_stock_rotation_restaurant.sql`.
- Las tres migraciones de soporte (`20260713112000`, `20260713130000` y
  `20260811153500`) requieren decision exclusiva del ledger.
- La sesion Supabase disponible no ve este proyecto y el worktree no puede enlazarlo.
  Por ello el gate permanece bloqueado y no se recomienda aplicar SQL por inferencia.
- Preflight reproducible: `npm run audit:wine-library:remote`.
- Evidencia: `docs/agent_outputs/qa-2026-09-28/remote-ledger-audit.json`.

## QA local combinado

- `npm run validate:wine-library`: verde.
- Vitest: `25` archivos y `210` pruebas verdes.
- TypeScript, build de produccion y lint focal: verdes.
- `node --check` para ambos Workers y scripts: verde.
- Deno check para `sitemap` y `prerender`: verde.
- Dry-run `winerim-proxy`: `205.11 KiB`, gzip `56.73 KiB`.
- Dry-run `winerim-edge-router`: `34.53 KiB`, gzip `8.33 KiB`.
- Navegador humano: `12/12` combinaciones, seis idiomas por desktop/movil, con idioma,
  canonical, siete alternates, sin overflow, sin marcadores y sin errores de consola.
- Worker local: `22/22` checks para Googlebot, `OAI-SearchBot/1.0`, humano, hubs,
  articulos, legales, home y funcionalidades.
- Se corrigio la deteccion de `OAI-SearchBot/1.0` en el Worker hibrido y se anadio una
  prueba de regresion para ambos Workers.
- Evidencias:
  - `docs/agent_outputs/qa-2026-09-28/combined-human-browser-qa.json`.
  - `docs/agent_outputs/qa-2026-09-28/combined-worker-bot-qa.json`.

## Gate de release

1. Entrar con una cuenta Supabase que vea `pwkqbcgjrhoyxrsmcypw`, enlazar el worktree y
   ejecutar `npm run audit:wine-library:remote`.
2. El informe debe quedar `ready`, sin grupos parciales ni acciones de reparacion. Si
   hay filas completas con version ausente del ledger, detenerse y reparar el historial
   de forma explicita; no reaplicar automaticamente.
3. Guardar IDs/versiones actuales de `sitemap` y `prerender` y exportar un snapshot de
   las 36 filas objetivo antes de cualquier escritura.
4. Aplicar solo migraciones marcadas `apply-in-order` y repetir el preflight.
5. Desplegar `sitemap` y `prerender`, crear un nuevo Pages inmutable desde esta revision,
   desplegar `winerim-proxy` y actualizar `winerim-edge-router` conservando los origenes
   comercial y Catalonia.
6. Verificar humano, Googlebot y OAI en seis idiomas, articulo existente, articulo
   ausente, sitemap, home, funcionalidades y legales.
7. Solo entonces hacer inspeccion selectiva en Search Console. No pedir indexacion
   masiva.

## Rollback preparado

- Router: volver a `d3bb33d3-772c-47db-bdbb-d2cadc6e2734`.
- Backend: volver a `d893a932-b4bc-40f6-872f-034ebf736c8e`.
- Frontend general: restaurar `FRONTEND_ORIGIN` a
  `https://0ec77291.winerim-origin.pages.dev`.
- Mantener sin cambios los origenes comercial `b5d4f8eb` y Catalonia `4867c418`.
- Edge Functions: restaurar las versiones guardadas en el paso 3. Este rollback no se
  considera listo hasta registrar esos IDs con una cuenta autorizada.
- Datos: usar una migracion compensatoria generada desde el snapshot previo. Nunca
  borrar filas manualmente ni ejecutar una migracion antigua por segunda vez.

## Decisiones

- El candidato combinado, no los worktrees anteriores, es la unica fuente propuesta
  para el siguiente release.
- La ausencia de acceso al ledger es un bloqueo de produccion, no una invitacion a
  inferir migraciones desde las filas.
- Las vulnerabilidades npm, Wrangler 3 y los 112 errores de lint global heredados quedan
  como bloques separados; los archivos de este release pasan sus gates focales.

## Hipotesis

- Las 18 filas presentes corresponden a las tres migraciones completas detectadas, pero
  solo el ledger puede confirmar su ejecucion formal.

## Contradicciones

- Produccion sirve los articulos existentes a bots, pero tambien enmascara como `200`
  los inexistentes.
- La cuenta Cloudflare permite leer y desplegar, pero la cuenta Supabase disponible no
  pertenece a la organizacion del proyecto web.

## Tareas pendientes

- Restaurar acceso read-only al ledger y registrar versiones Edge previas.
- Ejecutar el release coordinado solo con autorizacion explicita.
- Realizar QA productiva y, si queda verde, Search Console selectivo.
