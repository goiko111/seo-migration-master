# Project Context

## Actualizacion 2026-09-02 08:33 CEST: Biblioteca producto y saneado de articulos preparados localmente

### Hechos

- Se continuo en el repo sano `/Users/GOIKO/codex-workspaces/seo-migration-master-i18n-seo-og-clean2-20260901`, rama `codex/winerim-i18n-seo-og-clean2-20260901`, sin push, publish, deploy, Lovable ni Search Console.
- Se anadio un puente multidioma Biblioteca -> producto en `src/data/wineLibraryI18n.ts` y `src/pages/BibliotecaVino.tsx`, con enlaces localizados a Winerim Core, CloudRIM, SAVia y Winerim Supply.
- Se corrigio un texto fijo ES (`denominaciones`) en el preview de paises del hub Biblioteca y dos enlaces internos no localizados a Winerim Core en fichas de uva y region.
- Se anadio saneado frontend de comentarios HTML en articulos (`sanitizeMarkdownBody`) y `ArticlePage` usa el cuerpo saneado para secciones, conteo de palabras, herramientas y contenido relacionado.
- Consulta publica a Supabase `articles.body`: `0` filas con `winerim-content-expansion`, `@secret:` o `TELEGRAM_BOT_TOKEN`.
- QA HTTP read-only: la produccion publica `https://winerim.wine` mantiene sitemap/precios/simulador sanos via Cloudflare, pero la Edge directa Supabase sigue desalineada.
- Validaciones locales verdes: `npx tsc --noEmit --pretty false`, `npm test -- --run --reporter=dot` (`160/160`), `npm run build`, ESLint focal, `git diff --check`.
- Informe: `docs/agent_outputs/wine_library_product_bridge_local_2026-09-02.md`.

### Decisiones

- Lovable debe recibir solo un prompt acotado para Supabase Edge Functions `sitemap` y `prerender`; no necesita limpieza data-only de articulos ahora porque no hay filas publicas con los marcadores.
- El bloque local Biblioteca/blog sanitizer queda preparado pero no publicado; requiere commit/push/release frontend separado si se decide llevarlo a produccion.
- Cellaria, Matchrim, Spiritsrim, FoodRim, CRM y voz no se anadieron a Biblioteca por falta de ruta/copy publico canonico en este alcance o por pertenecer a otro producto.

### Hipotesis

- El puente Biblioteca -> producto deberia mejorar conversion de trafico informativo, especialmente EN/USA, sin mezclar productos ni claims no documentados.
- El saneado frontend evita recurrencia visible de comentarios HTML internos en articulos cuando se publique un frontend que lo incluya.

### Contradicciones

- Lovable habia comunicado deploy de `sitemap`/`prerender`, pero la Edge directa Supabase comprobada el 2026-09-02 08:33 CEST no contiene las rutas nuevas y su prerender cae a home/canonical home.
- `DECISIONS_LOG.md` sigue `compressed,dataless` (`size=275527`, `blocks=0`) y no se actualizo para evitar perdida de historico.
- La rama PR #3 remota sigue en `1024e5e`; este bloque deja cambios locales no commiteados sobre esa base.

### Tareas pendientes

- Enviar a Lovable el prompt minimo documentado en `NEXT_STEPS.md` para sincronizar Edge `sitemap`/`prerender`.
- Revalidar Edge directa Supabase tras Lovable y solo despues avanzar Search Console limitada.
- Decidir release separado de los cambios locales Biblioteca/blog sanitizer.
- Recuperar o rehidratar `DECISIONS_LOG.md` antes de actualizar ese documento.

## Actualizacion 2026-09-02 08:10 CEST: release tecnico simulator/precios desplegado por vias directas

### Hechos

- Se trabajo desde el repo sano `/Users/GOIKO/codex-workspaces/seo-migration-master-i18n-seo-og-clean2-20260901`, rama `codex/winerim-i18n-seo-og-clean2-20260901`, PR GitHub #3: `https://github.com/goiko111/seo-migration-master/pull/3`.
- La rama quedo con tres commits sobre `origin/main`: `cc0c665` (simulador i18n/SEO/OG), `b1c80f4` (precios modular y OG), `1024e5e` (puente de sitemap publico para precios modular).
- Se desplego Cloudflare Pages desde `dist` validado: `https://99319863.winerim-origin.pages.dev`, alias `https://codex-winerim-i18n-seo-og-cl.winerim-origin.pages.dev`.
- Se desplego `winerim-edge-router` apuntando a la Pages build `99319863`: version `6b84978c-ccfd-43c5-8f86-6abcd1744acc`.
- Se desplego `winerim-proxy`; version final post-sitemap bridge: `d893a932-b4bc-40f6-872f-034ebf736c8e`.
- Supabase directo sigue bloqueado por permisos: `supabase functions deploy sitemap prerender --project-ref pwkqbcgjrhoyxrsmcypw --use-api` devuelve `403 FunctionsApiStatusError`.
- QA productiva tras Cloudflare: `/precios-modulos-integraciones` devuelve `200` para humano, Googlebot y `OAI-SearchBot/1.0`, con title/canonical propios y sin `TELEGRAM_BOT_TOKEN`, `@secret` ni `winerim-content-expansion`.
- QA productiva tras Cloudflare: las seis rutas canonicas del simulador (`/simulador-carta`, `/en/wine-list-simulator`, `/it/simulatore-carta`, `/fr/simulateur-carte`, `/de/weinkarten-simulator`, `/pt/simulador-carta`) devuelven `200`, `x-prerendered: true`, canonical propio y contenido localizado para Googlebot/OAI.
- QA productiva tras Cloudflare: `/en/simulador-carta` redirige `301` a `/en/wine-list-simulator`; `/og/winerim-og-es.png` y `/og/winerim-og-en.png` devuelven `200 image/png`; legales siguen `200` con `X-Robots-Tag: noindex, follow`.
- QA productiva tras Cloudflare: `https://winerim.wine/sitemap.xml` devuelve `200`, `X-Robots-Tag: index, follow`, contiene `/precios-modulos-integraciones` y las seis rutas del simulador.
- Validaciones locales verdes: `npm test -- --reporter=dot` (`155/155`), `npm run build`, `npx tsc --noEmit --pretty false`, ESLint focal, `deno-bin check`, `node --check`, `git diff --check`, `npm run generate:sitemap-static`, `node scripts/validate-i18n-seo-og-release.mjs`.

### Decisiones

- La recuperacion tecnica prioritaria queda publicada por vias directas Cloudflare sin usar creditos de Lovable.
- Lovable queda limitado a sincronizar Supabase Edge Functions `sitemap` y `prerender` desde PR #3 / commit `1024e5e`; no debe tocar frontend, Cloudflare, Pages, DNS, migraciones, `llms`, Biblioteca, Blog ni Aprender vino.
- Ya se puede pasar a Search Console para inspeccion limitada de `/precios-modulos-integraciones`, `/simulador-carta`, `/en/wine-list-simulator` y el grupo de 404/alias relacionado; no hacer indexacion masiva.

### Hipotesis

- Cuando Lovable despliegue `sitemap` y `prerender`, Supabase quedara alineado con la produccion publica que ahora corrige Cloudflare.
- El puente de sitemap en Worker puede retirarse o simplificarse en el futuro solo despues de comprobar que la Edge Function publica ya incluye `/precios-modulos-integraciones`.

### Contradicciones

- Produccion publica esta sana por Cloudflare, pero Supabase Edge Functions no constan desplegadas desde el codigo nuevo por el bloqueo `403`.
- La carpeta viva `Documents` sigue siendo fuente documental, pero `git status` vuelve a colgar y `DECISIONS_LOG.md` aparece como archivo dataless/0 blocks aunque tiene tamano declarado; no se ha sobrescrito ni sincronizado desde el clon.

### Tareas pendientes

- En Lovable, ejecutar solo el prompt acotado para desplegar `sitemap` y `prerender` desde PR #3 / commit `1024e5e`.
- Tras confirmacion de Lovable, comprobar Edge directa Supabase para `/sitemap` y `/prerender?path=/precios-modulos-integraciones`.
- Pasar Search Console de forma limitada a las URLs ya validadas y reenviar sitemap publico.
- Mantener contenido editorial, nuevas migraciones, Biblioteca/Blog/Aprender vino y `llms` en gates separados.

## Actualizacion 2026-09-01 18:36 CEST: candidato limpio i18n/SEO/OG preparado sin contaminacion editorial

### Hechos

- Se preparo una rama limpia fuera de `Documents`: `/Users/GOIKO/codex-workspaces/seo-migration-master-i18n-seo-og-clean2-20260901`, rama `codex/winerim-i18n-seo-og-clean2-20260901`, base `origin/main` `ef64edbb35adf4ab44e030ea2e290db21c8f5bad`.
- Se creo el commit local unico `cc0c6656914dcb3d7f0d08c2335e42b426c3ce22` (`fix: prepare localized simulator seo release`) con 23 archivos, sin push, deploy, publish, Lovable, Cloudflare remoto, Supabase remoto, migraciones, `llms` ni Search Console.
- El candidato sustituye para release tecnico al paquete P0 bloqueado `9c374e5`, cuyo parent arrastraba cambios editoriales/data de Biblioteca no autorizados.
- El paquete corrige la superficie tecnica del simulador: slugs canonicos ES/EN/IT/FR/DE/PT, aliases como `/en/simulador-carta`, Worker, Pages router, Edge `prerender`, Edge `sitemap`, sitemap estatico, shell React inicial y metadatos OG/Twitter localizados.
- Se anadieron seis imagenes OG localizadas `public/og/winerim-og-*.png` y el validador reproducible `scripts/validate-i18n-seo-og-release.mjs`.
- El fallo reproducible de instalacion se diagnostico en `origin/main`: `package.json` declaraba dos devDependencies Lovable (`@lovable.dev/vite-plugin-dev-server-bridge` y `@lovable.dev/vite-plugin-hmr-gate`) que no existen en `package-lock.json` ni se importan. Se corrigio quitandolas de `package.json`; `package-lock.json` queda intacto.
- Validaciones verdes del candidato: `npm ci --ignore-scripts --no-audit --no-fund`, `npm test -- --reporter=dot` (`154/154`), `npm run build`, `npx tsc --noEmit --pretty false`, ESLint focal en archivos TS/TSX tocados, `node --check` Worker/router/scripts, `python3 -m py_compile`, `deno-bin check` de Edge Functions, `npm run generate:sitemap-static`, `git diff --check`, `node scripts/validate-i18n-seo-og-release.mjs` y prueba local de prerender Deno para seis rutas canonicas de simulador.
- `npm run lint` global sigue fallando por deuda preexistente fuera del paquete; no se corrigio en esta tanda para no mezclar refactors amplios.

### Decisiones

- Usar `cc0c6656914dcb3d7f0d08c2335e42b426c3ce22` como candidato limpio de release tecnico i18n/SEO/OG; no usar `9c374e5` para publicar sin separar su parent editorial.
- Mantener el contenido/migraciones de Biblioteca fuera de este candidato tecnico y exigir autorizacion separada para cualquier mutacion de datos.
- No publicar ni pedir indexacion hasta confirmar politica de release y repetir QA productiva tras deploy coordinado.

### Hipotesis

- Si se publica exactamente este commit junto con las capas correspondientes, `/en/simulador-carta` deberia redirigir a `/en/wine-list-simulator`, bots deberian recibir `200` localizado en las rutas canonicas y el sitemap deberia anunciar las seis variantes correctas.
- La eliminacion de las dos devDependencies Lovable no deberia afectar runtime ni build porque no aparecen importadas en `vite.config.ts`, `src`, Worker, router ni Edge Functions.

### Contradicciones

- El paquete anterior `9c374e5` tenia gates verdes (`163/163`), pero su diff efectivo excedia el alcance tecnico por el parent editorial `8538be5`.
- Este candidato limpio pasa `154/154` tests, no `163/163`, porque no arrastra los tests/cambios editoriales del paquete contaminado.
- La copia viva de `Documents` sigue siendo fuente documental, pero el artefacto de codigo fiable para commit es el clone de `~/codex-workspaces`.

### Tareas pendientes

- Confirmar si se autoriza push/PR y si GitHub/Lovable publican automaticamente alguna rama.
- Antes de cualquier publish, repetir los gates en el commit `cc0c6656914dcb3d7f0d08c2335e42b426c3ce22`.
- Tras deploy coordinado, validar produccion para humano, Googlebot y `OAI-SearchBot/1.0`: simulador canonico, alias, sitemap, canonical, hreflang, OG, home/campanas y legales `200/noindex`.
- Mantener Biblioteca editorial, nuevas migraciones y `llms` en un gate separado.

## Actualizacion 2026-09-01 16:09 CEST: diff revisado y commit local creado

### Hechos

- Se reviso el diff de la copia sana `/Users/GOIKO/codex-workspaces/seo-migration-master-release-sane-20260901-1536` en la rama `codex/winerim-biblioteca-release-gate-20260901`.
- La revision cubrio package/configuracion, shell React, router/Worker, prerender/sitemap, blog/articulos, Biblioteca, legales, tests, validadores y documentos.
- Antes del commit se corrigieron cuatro riesgos detectados en la revision: chat sin espera de cookies, idioma de chat en `/en`/`/de`/etc., redireccion USA que podia afectar `go.winerim.wine`, y breadcrumbs/CTA no localizados en `GuideTemplate`.
- Se anadio `src/test/router-shell-guardrails.test.ts` para cubrir esos riesgos.
- Gates verdes tras la revision: `npm ci`, `npm test` (`162/162`), `npm run build`, TypeScript, ESLint focal, `deno-bin check`, `validate_release_gates.mjs`, `validate_wine_library_20260907_batch.mjs`, `node --check` y `git diff --check`.
- Se creo un commit local reproducible en la rama sana; el hash operativo se obtiene fuera del propio commit con `git rev-parse HEAD`.
- Informe: `docs/agent_outputs/wine_library_diff_review_local_commit_2026-09-01.md`.

### Decisiones

- Mantener solo el commit local reproducible desde la copia sana.
- No hacer push, publish, deploy, migraciones, Search Console ni Lovable hasta coordinacion explicita posterior.
- Mantener `go.winerim.wine` como landing de campana y fuera de la redireccion automatica USA a `/en`.

### Hipotesis

- El paquete esta listo para una rama revisable, pero no debe tratarse como produccion ni como estado Lovable/Cloudflare sincronizado.

### Contradicciones

- La carpeta viva bajo `Documents` sigue siendo fuente documental, pero algunos archivos activos de codigo volvieron a aparecer `compressed,dataless`; la copia sana es la fuente operativa para commit.
- `Winerim Supply` tiene deuda preexistente de `hreflang` DE/PT en prerender; no fue introducida por este diff y queda fuera del commit Biblioteca.

### Tareas pendientes

- Confirmar politica de publish de Lovable/GitHub antes de cualquier push.
- Si se autoriza release remoto, repetir gates y coordinar publish/QA productiva.

## Actualizacion 2026-09-01 15:48 CEST: repo sano localizado para release

### Hechos

- Se creo una copia sana principal fuera de `Documents`: `/Users/GOIKO/codex-workspaces/seo-migration-master-release-sane-20260901-1536`.
- La copia sana parte de `origin/main` en `ef64edbb35adf4ab44e030ea2e290db21c8f5bad` y usa rama local `codex/winerim-biblioteca-release-gate-20260901`.
- Se traslado a esa rama el paquete local validado sin copiar `.git`, `.env`, `node_modules`, `dist`, backups ni placeholders historicos.
- `origin/main` clona correctamente, pero `npm ci` falla hasta incorporar el `package.json` local, porque `package.json` remoto lista dos plugins Lovable que no estan en `package-lock.json`.
- En la rama sana, `npm ci`, `npm test` (`159/159`), build, TypeScript, ESLint focal, `deno-bin check`, release maps, validador del lote 2026-09-07 y `git diff --check` pasan.
- Informe: `docs/agent_outputs/wine_library_release_repo_health_2026-09-01.md`.

### Decisiones

- Usar la copia de `~/codex-workspaces` como candidata para commit/push posterior; no usar la copia viva con `.git` deshidratado.
- No hacer commit ni push sin coordinacion explicita.

### Hipotesis

- El clone fuera de `Documents` reduce el riesgo de rehidratacion/deshidratacion de FileProvider antes del release.

### Contradicciones

- La copia viva tiene gates verdes pero no git sano; el clone remoto tiene git sano pero necesita el `package.json` local para `npm ci` reproducible.

### Tareas pendientes

- Revisar diff de la rama sana y decidir si se autoriza commit local/push de rama sin activar publish accidental.

## Actualizacion 2026-09-01 15:36 CEST: gate editorial 2026-09-07 saneado

### Hechos

- Se reviso internamente el SQL local `supabase/migrations/20260713131825_add_wine_library_list_architecture_style_country_price.sql` sin publicar, desplegar ni aplicar migraciones.
- El lote `wine-library-list-architecture-style-country-price` mantiene seis filas ES/EN/IT/FR/DE/PT, fechas `published_at` escalonadas el 2026-09-07 de 09:00 a 09:25 CEST, 918-1155 palabras visibles y nueve enlaces internos por idioma.
- Se detectaron y retiraron del SQL local seis comentarios internos `winerim-content-expansion-20260713`.
- Se creo el gate reproducible `docs/agent_outputs/validate_wine_library_20260907_batch.mjs`.
- Validaciones verdes tras la limpieza: validador nuevo, `validate_release_gates.mjs`, `npm test -- --reporter=dot` (`159/159`), `npm run build`, TypeScript, ESLint focal, `node --check` Worker/router y `deno-bin check` de Edge Functions.
- Informe: `docs/agent_outputs/wine_library_20260907_editorial_gate_2026-09-01.md`.

### Decisiones

- El lote queda como candidato local saneado para release coordinado, no como contenido publicado ni aplicado.
- El nuevo validador debe ejecutarse junto al gate de release maps antes de cualquier migracion/publish.
- No actualizar `llms` ni pasar Search Console hasta publicacion real y QA posterior.

### Hipotesis

- El saneado elimina una fuente potencial de fugas de marcadores internos si algun render/export futuro no aplica el limpiador del frontend.

### Contradicciones

- La QA previa situaba el marcador en el script limpiador y no visible en DOM, pero el SQL futuro aun conservaba comentarios internos en los bodies.
- Los gates tecnicos estaban verdes, pero no cubrian explicitamente higiene editorial del SQL.

### Tareas pendientes

- Elegir via canonica de release y trasladar el patch a un repo con `.git` sano o rehidratar `.git` con control.
- Validar produccion despues del 2026-09-07 09:25 CEST antes de `llms` o Search Console.

## Actualizacion 2026-09-01 07:03 CEST: lote semanal 2026-09-07 seleccionado

### Hechos

- El próximo lunes ya tiene un lote data-only completo: `wine-library-list-architecture-style-country-price`, ES/EN/IT/FR/DE/PT, 942-1181 palabras por mercado y `published_at` escalonado el 2026-09-07 de 09:00 a 09:25 CEST.
- Pre-release productivo correcto: Googlebot/OAI reciben `404`, `future-article-not-found` y `noindex`; las seis rutas no aparecen en sitemap ni `llms`.
- Los lotes 2026-08-24 y 2026-08-31 están liberados para bots con prerender, canonical propio, siete hreflang y presencia completa en sitemap.
- El marcador detectado en HTML humano pertenece al script limpiador y no es texto visible ni contenido editorial renderizado.
- Informe completo: `docs/agent_outputs/winerim_weekly_blog_preflight_2026-09-01.md`.

### Decisiones

- Usar el lote existente del 2026-09-07 como entrega semanal y no crear un duplicado.
- Congelar 2026-09-21 por solapamiento con el Blog de stock dormido del 2026-09-28.
- No publicar, migrar, desplegar ni actualizar `llms` sin aprobación explícita.

### Hipotesis

- La doble compuerta debería mantener el lote oculto hasta cada offset y liberarlo de forma localizada el 2026-09-07.

### Contradicciones

- Los documentos proponían sanear un marcador visible; la inspección del DOM demuestra que el literal restante vive en el código del limpiador, no en el cuerpo visible.

### Tareas pendientes

- Revisión editorial humana del lote y QA ES/EN/IT/FR/DE/PT después de las 09:25 del 2026-09-07.
- Actualizar `llms` solo tras certificar publicación; decidir un tema no canibalizante para 2026-09-21 o dejar el hueco libre.

## Actualizacion 2026-09-01: coordinacion semanal y QA posterior

### Hechos

- La evidencia mas reciente del frente es `docs/agent_outputs/wine_library_next_block_2026-08-27.md` y su QA JSON.
- En produccion se auditaron seis rutas de Biblioteca del vino para humano y bots: todas devolvieron `200`, `html lang` correcto, canonical propio, sin overflow mobile y sin `winerim-content-expansion`, `TELEGRAM_BOT_TOKEN` ni `@secret`.
- Googlebot y `OAI-SearchBot/1.0` devolvieron `200` y canonical propio en las seis rutas, con `x-worker-branch: bot-prerender`.
- Sigue pendiente publicar el cambio local que elimina `— Winerim` duplicado de los titles SEO de uvas; el title humano observado era, por ejemplo, `Tempranillo | Grape guide — Winerim | Winerim`.
- En `de/weinbibliothek/weinbegleitung/carnes-rojas`, el title bot conserva `Carnes Rojas` en español aunque la UI humana esta localizada.
- `public/llms.txt` y `public/llms-full.txt` siguen fechados `2026-07-03`; no se ha autorizado ni documentado una actualizacion.
- No hay evidencia posterior en `docs/agent_outputs` de aplicacion/publicacion de nuevos lotes tras la QA del 27 de agosto. El calendario contiene propuestas hasta el 28 de septiembre, no prueba de releases.
- El validador de gates no se pudo ejecutar en esta corrida porque el entorno no tiene el comando `timeout`; no se interpreta como resultado verde ni rojo.

### Decisiones

- Mantener congeladas nuevas publicaciones editoriales hasta comprobar el estado real de los lotes y corregir los defectos de title localizados.
- Publicar el fix de titles solo desde la fuente frontend canonica confirmada (Lovable si sigue siendo origen operativo), sujeto a aprobacion; no desplegar desde el repo local por inferencia.
- No tocar `llms`, sitemap, prerender, Worker, migraciones, Search Console ni credenciales en esta coordinacion.

### Hipotesis

- La duplicacion de marca procede de titles de uva que ya incluyen marca mas el sufijo global de `SEOHead`.
- El naming español del title bot aleman procede de la capa Worker/prerender, independiente de la UI React.

### Contradicciones

- La QA tecnica de seis rutas esta verde, pero la calidad editorial/SEO no esta cerrada por titles inconsistentes entre humano y bot.
- El calendario propone temas del 31 de agosto en adelante, pero no existe evidencia operativa de que se hayan aplicado o publicado.

### Tareas pendientes

- Confirmar el estado de los lotes 2026-08-31 y siguientes antes de generar otra migracion.
- Publicar y revalidar el fix de titles de uvas en EN/DE y una muestra IT/FR/PT.
- Localizar el title bot de `carnes-rojas` en DE.
- Ejecutar `node docs/agent_outputs/validate_release_gates.mjs` directamente o con un mecanismo de limite disponible, y registrar su salida real.
- Recuperar la cadencia de actualizacion de `llms` solo cuando haya contenido efectivamente liberado y QA completa.

## Actualizacion 2026-08-24 08:36 CEST: preflight del lote Biblioteca

### Hechos

- Se ejecuto antes de la ventana de release (`08:35 CEST`; releases `09:00`-`09:25`) el preflight de `wine-library-pairing-matrix-texture-acidity-fat`.
- El validador local esta verde: `ok: true`, `66/66/66/66`, cero warnings.
- Googlebot y `OAI-SearchBot/1.0` reciben `404`, `x-worker-branch: future-article-not-found` y `X-Robots-Tag: noindex, follow` para las seis rutas; el sitemap contiene cero slugs del lote.
- El navegador humano recibe el shell React con `200`; ese HTML contiene el marcador interno `winerim-content-expansion-20260713` en las seis rutas. No aparece `TELEGRAM_BOT_TOKEN`.
- No se publico, desplego, migro, modifico sitemap/prerender/Worker/`llms`, tocaron credenciales ni se uso Lovable.

### Decisiones

- No certificar ni aplicar el lote mientras el marcador interno siga presente y antes de completar QA posterior a `09:25`.
- No preparar el lote de Blog `2026-10-05` mientras siga pendiente la decision editorial `2026-09-21` frente a `2026-09-28`.

### Hipotesis

- El `200` humano corresponde al shell SPA, no demuestra que las filas editoriales esten liberadas; el marcador puede proceder del contenido embebido o de datos ya accesibles al cliente y requiere localizar su origen.

### Contradicciones

- Los gates de fechas estan alineados, pero la superficie humana expone un marcador que los criterios de calidad prohíben; un gate verde no equivale a lote publicable.

### Tareas pendientes

- Repetir QA completa despues de `09:25` y comprobar contenido, title, canonical, hreflang, prerender, sitemap y ausencia del marcador.
- Localizar y retirar el marcador mediante un cambio data-only minimo sujeto a aprobacion; despues resolver `09-21/09-28`.

## Actualizacion 2026-08-24: lote de Biblioteca pendiente de QA

- No hay commits ni nuevos `docs/agent_outputs` desde 2026-08-17; los outputs son historicos/propositivos.
- La QA productiva y el validador local no terminaron dentro del limite operativo; no se certifica release.
- `llms.txt`/`llms-full.txt` siguen con `Last updated: 2026-07-03`.
- El SQL del lote 2026-08-24 contiene marcadores internos en `body`; no aplicar sin revision y aprobacion.
- No publicar, desplegar, migrar, tocar credenciales, sitemap, prerender, Worker, `llms` ni usar Lovable.
- Pendiente: QA de seis idiomas para humano/Googlebot/OAI, contenido, title, canonical, hreflang, prerender, sitemap y marcadores; despues resolver 09-21/09-28.

## Cierre 2026-07-07: estado publicado de la tanda i18n/SEO/editorial

## Hechos

- La tanda DE/PT/SEO/editorial se completo, se publico y se revalido.
- Las 12 herramientas online estan alineadas en frontend, Worker, Edge `sitemap`, Edge `prerender` y guardrails.
- Los lotes editoriales de Biblioteca del vino y Aprender vino quedaron aplicados en base de datos con `published_at` futuro y sin exposicion en sitemap/llms antes de fecha.
- Lovable genero migraciones duplicadas equivalentes a las nombradas por Codex; son idempotentes y reflejan el estado aplicado.

## Decisiones

- La arquitectura internacional de Winerim debe seguir tratando herramientas como superficie SEO completa, no solo como assets de conversion.
- Los lotes futuros se preparan en DB, pero se liberan editorialmente por fecha en hub, sitemap, prerender, Worker y `llms`.
- Los documentos `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md` siguen siendo fuente de verdad para retomar.

## Hipotesis

- La mejora de paridad humano-bot deberia tener mas impacto SEO internacional inmediato que publicar volumen de contenido sin control tecnico.

## Tareas pendientes

- Vigilar Search Console tras recrawl.
- Continuar Biblioteca/Aprender con cadencia semanal y contenido profundo.
- Mantener pruebas de guardrail antes de cada expansion.

## Actualizacion 2026-07-07: paridad herramientas DE/PT y calendario editorial

## Hechos

- La prioridad vigente del proyecto sigue siendo no ampliar contenido "a lo bruto" si la capa internacional no esta estable.
- El 2026-07-07 se ejecutaron agentes paralelos de idioma, SEO/paridad, Biblioteca del vino y Aprender vino.
- La superficie DE/PT de herramientas se amplio y endurecio:
  - React humano cubre home, contacto, precios, hub de herramientas y 12 herramientas online con `html lang`, canonical propio y `hreflang`;
  - Worker ya tiene prerender estatico para 12 familias de herramientas, no solo para las 5 que ya estaban cubiertas;
  - `sitemap` y `prerender` de Supabase incluyen las 12 herramientas en su mapa localizado.
- Los fallbacks detectados por el agente SEO eran una contradiccion real entre humano y bot: herramientas DE/PT correctas en navegador, pero Googlebot recibiendo home espanola/canonical raiz en rutas que no estaban en el prerender estatico.
- Quedan preparados dos lotes editoriales futuros:
  - Biblioteca del vino: `wine-library-by-the-glass-stock-rotation`, `2026-07-20`;
  - Aprender vino: `learn-wine-read-label-restaurant`, `2026-07-27`.
- Las migraciones editoriales son data-only sobre `public.articles`, con `author='Winerim'`, `published=true`, `published_at` programado, `article_group` y `related_links`.
- Las URLs futuras de estos dos lotes no se han anadido a `llms` ni a hubs publicos antes de fecha.

## Decisiones

- `src/i18n/types.ts`, `supabase/functions/sitemap/index.ts`, `supabase/functions/prerender/index.ts` y `cloudflare-worker-v3-hybrid.js` deben permanecer alineados para rutas localizadas importantes.
- Las herramientas online forman parte de la arquitectura SEO/LLM internacional, no solo de conversion.
- La cadencia editorial semanal se mantiene, pero las tandas se preparan con release gating defensivo por Worker/Edge.
- Los tests `wine-library-seo-surface` y `de-pt-seo-guardrails` pasan a ser guardrails obligatorios antes de ampliar Biblioteca/Aprender.

## Hipotesis

- La publicacion de esta tanda deberia reducir senales contradictorias de canonical/hreflang para DE/PT en Search Console.
- El contenido futuro programado no deberia aparecer en Google/LLMs antes de fecha si Lovable publica tambien Edge Functions.

## Tareas pendientes

- Publicar esta tanda en Lovable/frontend/Edge y desplegar Worker.
- Aplicar las dos migraciones editoriales futuras en Lovable Cloud.
- Revalidar produccion y Search Console tras publish.
- Despues de validar, continuar con mas entidades y guias de Biblioteca del vino y Aprender vino.

## Actualizacion 2026-07-06: URLs legales largas y footer

## Hechos

- Se implementaron y publicaron en `main` las rutas legales espanolas:
  - `/politica-privacidad`;
  - `/terminos-y-condiciones-del-contrato`.
- React, footer, cookies, contacto, landing Meta, simulador, Barometro, sitemap/prerender y Worker quedan sincronizados para usar las slugs largas en espanol.
- Se desplego Cloudflare Worker `winerim-proxy` Version ID `8b257e6a-c8c4-4814-8e94-29b7597702ac`.
- Produccion valida ambas URLs con `HTTP 200`, `x-worker-branch: worker-static-human`, `X-Robots-Tag: noindex, follow`, canonical propio y sin `Pagina no encontrada`.
- El footer visible de la home en navegador real ya apunta a `/politica-privacidad` y `/terminos-y-condiciones-del-contrato`.
- Los redirects legacy quedan activos:
  - `/privacy-policy` -> `/politica-privacidad`;
  - `/terms-of-service` -> `/terminos-y-condiciones-del-contrato`;
  - `/condiciones-de-servicio-2` -> `/terminos-y-condiciones-del-contrato`.

## Decisiones

- Las slugs largas son el destino legal principal en espanol.
- Las paginas legales siguen como `noindex, follow` y fuera del sitemap organico.
- Mantener `/privacidad` y `/terminos` vivos por compatibilidad.
- Usar un fallback legal y un parche de footer en Worker mientras el bundle de Lovable termina de publicar el frontend correcto.

## Hipotesis

- Cuando Lovable publique de nuevo `main`, el footer React ya no necesitara depender del parche del Worker.
- El parche del Worker es seguro porque solo cambia enlaces dentro de `footer a` y no altera contenido comercial ni SEO indexable.

## Tareas pendientes

- En el siguiente publish de Lovable, revalidar que el footer React ya trae las slugs largas sin depender del parche.
- Mantener el fallback Worker hasta confirmar que Lovable sirve el bundle correcto en produccion.

## Actualizacion 2026-07-06: lote DE/PT, canonicals, hreflang y paridad humano-bot

## Hechos

- Se leyeron al inicio de sesion `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- Tras la confirmacion del usuario de Edge Functions publicadas, se revalido produccion:
  - `https://winerim.wine/sitemap.xml`: `200`, `2333` URLs, `13191` alternates, `0` URLs futuras del 2026-07-13.
  - Edge directa `sitemap`: `200`, `2302` URLs, `12974` alternates, `0` URLs futuras.
  - Edge directa `prerender` para las URLs futuras del grupo `learn-wine-recommend-by-style`: no renderiza el articulo futuro ni su titulo; sigue devolviendo fallback home `200`.
- Se lanzaron dos agentes de auditoria solo lectura:
  - Idioma encontro deuda DE/PT en home compartida, formularios, `NextSteps`, `Navbar`, `Herramientas`, `Hoteles` y `GruposRestauracion`.
  - SEO/paridad encontro herramientas con bot localizado pero React humano con canonical/copy ES, y Edge `sitemap`/`prerender` con alternates incompletos.
- Se implemento localmente el primer lote de correcciones DE/PT:
  - home DE/PT sin fallback espanol en secciones principales;
  - canonical localizado para home, contacto, precios, demo y thank-you;
  - formularios compartidos DE/PT en `ContactFormFields`;
  - `Navbar`, `NextSteps`, `CredibilitySection`, `DefinitionSection`, `WhoItHelpsSection`, `Herramientas` y `CategoryLeapSection` con DE/PT;
  - rutas localizadas de gracias: `/en/thank-you`, `/it/grazie`, `/fr/merci`, `/de/danke`, `/pt/obrigado`;
  - canonical/hreflang/H1 principales localizados en herramientas online criticas;
  - `ToolsLeadPopup` reconoce hubs y subrutas localizadas de herramientas/recursos;
  - `supabase/functions/prerender` amplía hreflang DE/PT para hubs clave;
  - `supabase/functions/sitemap` marca herramientas online como multilingues en vez de ES-only.
- Validacion local:
  - `npx tsc --noEmit --pretty false`: OK.
  - `npm run test -- --run src/test/wine-library-seo-surface.test.ts`: OK, `20/20`.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`: OK.
  - `git diff --check`: OK.
  - `npm run build`: OK con avisos conocidos de Browserslist desactualizado y chunks grandes.
  - Chrome local sobre `http://127.0.0.1:5177`: `/de`, `/pt`, `/de/kontakt`, `/pt/contacto`, `/de/preise`, `/pt/precos`, herramientas localizadas y thank-you localizados devuelven `html lang` correcto, canonical propio, `7` hreflang en paginas indexables y sin `Not found`.
- Contradiccion productiva actual: hasta publicar este frontend, `curl` humano a produccion sigue viendo el shell SPA con titulo/canonical raiz en rutas como `/de`, `/pt`, `/de/kontakt` y `/pt/precos`; local ya corrige el DOM tras JS.
- `src/components/WineListAnalyzerTool.tsx` sigue siendo cambio ajeno/preexistente y no se ha tocado.

## Decisiones

- Cerrar primero canonicals/hreflang y paridad humano-bot DE/PT antes de ampliar contenido de forma masiva.
- Mantener herramientas localizadas en sitemap/Worker, pero corregir React humano por fases: primero SEO/canonical/H1, despues traduccion completa de cuerpo, formularios y resultados.
- Tratar Edge directa `sitemap` como fuente que tambien debe emitir herramientas localizadas, no depender solo del Worker para inyectarlas.
- Mantener las paginas `gracias` como `noindex`, pero con URL/canonical localizado para no heredar canonical raiz del shell.

## Hipotesis

- Publicar este lote deberia corregir la senal humana JS de DE/PT en paginas base y reducir contradicciones frente al bot.
- Completar traduccion de cuerpo en herramientas, `Hoteles` y `GruposRestauracion` sera el siguiente salto real de paridad internacional.
- El fallback home `200` de Edge `prerender` para articulos futuros ya no expone contenido futuro, pero idealmente deberia evolucionar a `404/noindex` tambien en Edge directa.

## Tareas pendientes

- Publicar frontend y Edge Functions con este lote DE/PT.
- Revalidar produccion post-publish:
  - `/de`, `/pt`, `/de/kontakt`, `/pt/contacto`, `/de/preise`, `/pt/precos`;
  - herramientas localizadas principales;
  - `/sitemap.xml` y Edge directa `sitemap`;
  - Googlebot/humano comparados en una muestra.
- Traducir cuerpo completo de herramientas online que aun conservan calculos/campos/resultados en espanol:
  - `CalculadoraFugaMargen`;
  - `ComparadorDistribuidores`;
  - `SimuladorSenalMargenes`;
  - `TestPerfilRim`;
  - `SimuladorParetoCarta`.
- Corregir fallback EN visible en `Hoteles` y `GruposRestauracion` para DE/PT.
- Mantener fuera del commit cualquier cambio ajeno de `WineListAnalyzerTool.tsx`.

## Actualizacion 2026-07-06: revalidacion editorial, sitemap/prerender e idiomas

## Hechos

- El usuario confirma que en Lovable Cloud ya se aplico la migracion correctiva `20260705081417_harden_articles_editorial_permissions.sql` y que ya se publico frontend/Edge/Worker.
- Revalidacion productiva del 2026-07-06: los hubs de `Aprender vino` en ES/EN/IT/FR/DE/PT devuelven `200`, `x-prerendered: true`, canonical propio, `7` hreflang y no enlazan la guia futura `Recomendar vino por estilos` del 2026-07-13.
- `https://winerim.wine/llms.txt` y `https://winerim.wine/llms-full.txt` devuelven `200` y no anuncian las URLs futuras del 2026-07-13.
- Contradiccion productiva detectada: `https://winerim.wine/sitemap.xml` y la Edge Function directa `sitemap` siguen incluyendo las 6 URLs futuras del grupo `learn-wine-recommend-by-style`, y esas URLs responden `200` como Googlebot con contenido real antes de su fecha.
- La RLS/REST anonima no expone los articulos futuros, pero las Edge Functions usan service role y por tanto necesitan filtros explicitos por `published_at`/release date.
- Los articulos dinamicos publicados no estaban emitiendo `hreflang` en sitemap productivo; local queda preparado para generar alternates por `article_group` solo con siblings publicados y ya liberados.
- El agente de idiomas confirmo prioridad fuerte en DE/PT: home humana con fallback espanol/canonical root, canonicals ES en contacto/precios localizados y herramientas localizadas correctas para bot pero no para humano React.
- Se puso en marcha trabajo paralelo con tres agentes: Biblioteca, Aprender vino e Idiomas. Los tres hicieron auditoria solo lectura y no editaron archivos.
- Se pusheo el hotfix `0c372cd fix: harden editorial article release gating` a `origin/main`.
- Se desplego Cloudflare Worker `winerim-proxy` Version ID `1b93b814-2ce0-4b88-b920-d882c70515d6`.
- Tras el deploy del Worker, el sitemap publico `https://winerim.wine/sitemap.xml` devuelve `2336` URLs, `0` hits futuros y mantiene `12558` alternates; las 6 URLs futuras del 2026-07-13 devuelven `404` con `X-Robots-Tag: noindex, follow`.
- El deploy CLI de Edge Functions sigue bloqueado por falta de `SUPABASE_ACCESS_TOKEN`; la Edge Function directa `sitemap` aun devuelve `2294` URLs e incluye `6` futuras hasta que Lovable publique `sitemap`/`prerender`.

## Decisiones

- Antes de seguir ampliando contenido a lo bruto, hay que cerrar la paridad humano/bot, canonicals y hreflang en DE/PT y herramientas localizadas.
- Las URLs editoriales futuras deben bloquearse en tres capas: sitemap Edge, prerender Edge y Worker, aunque RLS ya las oculte a REST anonima.
- Los articulos por `article_group` deben llevar alternates/hreflang en sitemap y prerender cuando haya hermanos publicados.
- `src/components/WineListAnalyzerTool.tsx` sigue siendo cambio ajeno/preexistente y no debe mezclarse con este hotfix.

## Hipotesis

- Desplegar juntas las Edge Functions `sitemap`/`prerender` y el Worker deberia sacar las 6 URLs del 2026-07-13 del sitemap y hacer que devuelvan `404/noindex` hasta su fecha.
- Anadir hreflang por `article_group` deberia mejorar la consolidacion internacional de articulos semanales y reducir senales ambiguas para Google/LLMs.
- La deuda DE/PT puede afectar mas al SEO internacional que publicar otra tanda editorial sin corregir la capa de rutas/canonicals.

## Tareas pendientes

- Publicar desde Lovable Cloud las Edge Functions `sitemap` y `prerender` del hotfix.
- Revalidar produccion tras ese deploy Edge:
  - Edge Function directa `sitemap` sin las 6 URLs del 2026-07-13;
  - URLs futuras sin prerender de articulo tambien si se llama directo a Edge;
  - articulos publicados con alternates/hreflang por `article_group`;
  - hubs y `llms` manteniendose limpios.
- Abrir el lote i18n prioritario:
  - home DE/PT sin fallback espanol;
  - canonical localizado en contacto/precios;
  - herramientas localizadas con React humano, canonical y hreflang reales;
  - formularios DE/PT sin labels espanoles.

## Hechos

- El 2026-07-05 se confirmo que CloudRIM y SAVia ya estan implementados como capacidades principales en la web y superficie SEO/LLM de Winerim.
- El 2026-07-05 se detecto una contradiccion documental: la migracion editorial `20260703141412_add_wine_library_learn_wine_editorial_expansion.sql` figuraba como pendiente, pero `origin/main` ya contiene la oleada de 12 articulos de Biblioteca del vino / Aprender vino.
- El 2026-07-05 se preparo la migracion correctiva `20260705081417_harden_articles_editorial_permissions.sql` para asegurar RLS, grants y politicas de `public.articles` tras la expansion editorial.
- La cadencia editorial decidida para blog/aprender/biblioteca es semanal y con fechas correlativas; las URLs con `published_at` futuro no deben enlazarse ni anunciarse en `llms` antes de su fecha.
- El 2026-07-05 se corrigio localmente la exposicion prematura de la guia futura `Recomendar vino por estilos` en hubs, prerender, Worker y `llms`; queda pendiente publicar y revalidar en produccion.
- El 2026-07-05 una auditoria especifica de idiomas detecto que la prioridad multilingue ya no es solo crear contenido DE/PT, sino asegurar paridad humano/bot, canonicals/hreflang correctos y ausencia de fallback espanol en rutas internacionales.
- El 2026-07-05 se revalido Search Console para la propiedad URL-prefix `https://winerim.wine/`: `/sitemap.xml` figura como `Correcto`, ultima lectura `5 jul 2026` y `2.330` paginas descubiertas.
- El 2026-07-05 Search Console mostro `https://winerim.wine/producto/cloudrim` como no indexada por un rastreo antiguo del `2 jul 2026` que seleccionaba `https://winerim.wine/` como canonical, pero la prueba en vivo ya devuelve `La URL esta disponible para Google` y `La pagina se puede indexar`; se solicito indexacion y Google confirmo que se anadio a cola prioritaria.
- El 2026-07-05 Search Console mostro `https://winerim.wine/producto/savia`, `https://winerim.wine/presentacion` y `https://winerim.wine/aprender-vino` como URLs ya indexadas.
- El 2026-07-05 se desplego `winerim-proxy` Version ID `91667a6c-bbb5-48ba-a47a-e489918bed53` con prerender/canonical propio para las 25 herramientas localizadas que estaban en sitemap.
- El 2026-07-05 `https://winerim.wine/sitemap.xml` devuelve `200` y `2.330` URLs; incluye CloudRIM, SAVia y herramientas localizadas.
- El 2026-07-05 se valido una muestra de herramientas localizadas como Googlebot:
  - `/en/tools/distributor-comparator`;
  - `/pt/ferramentas/calculadora-fuga-margem`;
  - `/fr/outils/simulateur-pareto-carte-vins`;
  todas devuelven `200`, `x-prerendered: true`, `x-worker-branch: worker-static-prerender`, canonical propio y H1 localizado.
- El 2026-07-05 `https://www.winerim.wine/` sigue devolviendo `421` aunque la ruta Worker `www.winerim.wine/*` exista; el bloqueo pendiente es de configuracion/routing Cloudflare, no de React.
- El 2026-07-05 se creo el alcance `Radar Winerim de vinos nuevos y cartas de novedades` en `src/seo/NEW_WINE_RADAR_AND_MONTHLY_NEWS_2026-07-05.md`.
- La idea de vinos nuevos queda formulada como `Radar Winerim`: capturar solicitudes de vinos inexistentes, normalizarlas, enriquecerlas y convertirlas cuando proceda en ficha, Vino del Dia, newsletter, lead magnet o carta dinamica `Novedades de Julio`.
- La orientacion decidida para `Radar Winerim` es B2B primero; cualquier uso B2C queda como fase posterior para no diluir el foco comercial de restaurantes, hoteles, grupos, distribuidores y bodegas.
- El 2026-07-02, tras el publish del usuario, `https://winerim.wine/sitemap.xml` quedo corregido en produccion con `2.294` URLs y deployment `1f496f52-39b9-4f32-a925-db02f74b0596`.
- El 2026-07-02 se reenvio `/sitemap.xml` en Search Console y Google confirmo `Se ha enviado el sitemap correctamente`; puede tardar en dejar de mostrar `403` paginas descubiertas.
- El bloqueo SEO pendiente ya no es el sitemap, sino `prerender`: la Edge Function productiva y el apex siguen devolviendo home/canonical raiz para CloudRIM/SAVia cuando se prueban como Googlebot.
- No se debe solicitar indexacion manual de CloudRIM/SAVia hasta desplegar y validar `supabase/functions/prerender/index.ts`.
- El 2026-07-02, tras publish de Lovable, `https://winerim.wine/sitemap.xml` paso a `200` pero servia un fallback parcial de `403` URLs; Search Console lo acepto y mostro `403` paginas descubiertas.
- Para corregirlo, se preparo `public/sitemap.xml` como sitemap estatico completo de `2.294` URLs, generado desde la Edge Function viva de Supabase (`2.282` URLs) mas las 12 rutas CloudRIM/SAVia.
- Se anadio `scripts/refresh-static-sitemap.mjs` y `npm run generate:sitemap-static` para regenerar ese sitemap completo sin depender del deploy CLI de Supabase.
- El commit `d6af8bf` con el sitemap completo esta pusheado, pero no publicado: Lovable no dio acceso a Codex en los proyectos probados y produccion sigue en `403` URLs hasta que se publique.
- En produccion, el navegador real ya ve CloudRIM/SAVia con H1, titulo y canonical propios; Googlebot en el apex sigue viendo home/canonical raiz para esas rutas.
- El siguiente paso operativo es publicar el sitemap de `2.294` URLs, revalidar produccion y reenviar `/sitemap.xml` en Search Console para sustituir la lectura parcial de `403`.
- El 2026-07-02 se desplego `winerim-proxy` version `41cd1394-5a19-4ead-abc9-436fb646f41e` con puente estatico para CloudRIM/SAVia, pero el apex `winerim.wine` no ejecuta el Worker aunque la ruta `winerim.wine/*` exista en Cloudflare.
- `go.winerim.wine/*` si ejecuta `winerim-proxy`; la validacion Googlebot de `/producto/cloudrim` en ese host devuelve `worker-static-prerender`, canonical propio y contenido CloudRIM.
- Cloudflare Trace para `https://winerim.wine/producto/cloudrim` devuelve `hostname does not belong to your account`; Trace para `go.winerim.wine` si muestra `Workers > winerim-proxy`.
- Se probo poner el apex `A winerim.wine -> 185.158.133.1` en `Proxied`; no activo el Worker y dejo `/sitemap.xml` en `404`, por lo que se revirtio a `DNS only`.
- `https://winerim.wine/sitemap.xml` devuelve `404` en la validacion actual; se creo `public/sitemap.xml` como fallback estatico de 403 URLs para publicar desde Lovable.
- El 2026-07-02 se implemento localmente CloudRIM y SAVia como capacidades principales de la web Winerim.
- CloudRIM tiene pagina propia en `/producto/cloudrim` y variantes EN/IT/FR/DE/PT; se define como nube operativa/documental para recoger cartas, ventas, albaranes, stock, reportes TPV y tarifas por portal, email, carpeta compartida, FTP/SFTP, API o proveedor.
- SAVia tiene pagina propia en `/producto/savia` y variantes EN/IT/FR/DE/PT; se define como agente conversacional para preguntar sobre carta, ventas, stock, costes, margenes, albaranes y oportunidades, sin ejecutar acciones criticas sin aprobacion humana.
- CloudRIM/SAVia quedaron incorporados en home, navbar/footer, `/funcionalidades`, `/integraciones` y `/producto/inteligencia-dinamica`.
- La superficie SEO/LLM de CloudRIM/SAVia quedo sincronizada en React, `ROUTE_MAP`, sitemap, prerender, Worker, `sitemap-extra`, `llms.txt`, `llms-full.txt` y test SEO.
- Validaciones locales de CloudRIM/SAVia: test SEO enfocado, build, Deno check, Worker syntax check, Worker dry-run, JSON de sitemap extra, `git diff --check` y QA navegador desktop/mobile en 8 rutas clave.
- El despliegue CLI de Supabase SEO sigue bloqueado por falta de `SUPABASE_ACCESS_TOKEN`; estas rutas quedan pendientes de publicar desde Lovable/Supabase y revalidar en produccion.
- El 2026-07-01 se revalido en produccion el commit `67e245a` de la landing Meta Demo: `https://go.winerim.wine/` y `https://winerim.wine/meta-demo` ya renderizan `Sistema Winerim IA`, CTA fijo `Solicita tu demo`, bullets nuevos con inicio en negrita, `+2.000 restaurantes` y testimonios reales.
- La revalidacion productiva confirmo `x-robots-tag: noindex, follow`, canonical `https://go.winerim.wine/`, OpenGraph `https://winerim.wine/og-image.png`, chat desactivado y ausencia de overflow horizontal en desktop/mobile.
- El CTA fijo de la landing Meta fue probado con clic real en produccion: actualiza hash a `#demo-form`, desplaza al formulario y lo deja visible en mobile.
- La captura de UTMs/fbclid de `go.winerim.wine` fue revalidada en produccion con query real; los hidden inputs conservan `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` y `fbclid`.
- En esta pasada no se envio un lead nuevo al CRM porque el cambio revisado era de copy/CTA y el flujo backend no se habia tocado; el formulario ya conserva campos y conexion React/Supabase/CRM existentes.
- La QA productiva detecto solo 404 de `https://go.winerim.wine/__l5e/trackevents`, atribuibles a tracking interno de Lovable; no afectan al render, formulario ni CTA.
- El 2026-07-01 se actualizo localmente la landing de campanas `go.winerim.wine` / `/meta-demo` con el copy aportado desde LeadConnector: badge `Sistema Winerim IA`, bullets nuevos con primera frase en negrita y CTA fijo superior `Solicita tu demo`.
- En esa actualizacion se mantuvieron los testimonios reales ya publicados y el claim `+2.000 restaurantes`; el enlace de referencia seguia mostrando placeholders y `+1.000 bodegas gestionadas`, pero eso contradice decisiones previas del proyecto.
- La validacion local de la actualizacion de Meta Demo paso `npm run build`, `git diff --check`, captura Playwright desktop/mobile y comprobacion por selector `Sistema Winerim IA`.
- Se detecto en QA que el banner global de cookies puede tapar parte inferior del formulario de `go.winerim.wine` en primera visita; no es regresion de este cambio, queda como mejora separada si se quiere optimizar conversion de campanas.
- La implementacion de CloudRIM/SAVia no se ha iniciado todavia; se preparo un plan de trabajo, pero el usuario pidio pausar antes para actualizar la landing Meta.
- El 2026-07-01, tras el publish de Lovable del bloque comercial Core/Supply/Meta Demo, se revalido produccion en navegador real para `WinerimCore`, `WinerimSupply` y `go.winerim.wine`: contenido nuevo visible, CTAs presentes, sin overflow en desktop/mobile y `go.winerim.wine` con `noindex, follow`.
- En esa revalidacion se detecto una contradiccion SEO: `https://winerim.wine/en/product/winerim-core` renderizaba contenido ingles, pero su canonical apuntaba a `https://winerim.wine/producto/winerim-core`.
- Se corrigio localmente `WinerimCore` para que el canonical use `localePath("/producto/winerim-core")` sobre `CANONICAL_DOMAIN`.
- Se corrigio localmente la deuda de localizacion de `DecisionCenterTeaser`: ahora tiene copys DE/PT y usa `getI18n` para fallback seguro.
- Validaciones locales del fix Core/Decision Center: `npm run build`, `git diff --check` y QA navegador local de canonical EN/DE Core y copy PT Supply sin overflow ni `Not found`.
- El fix de canonical/localizacion queda pendiente de publicar en Lovable y revalidar en produccion.
- El 2026-07-01, tras confirmacion del usuario de que Lovable habia publicado la segunda oleada de `Aprender vino`, se desplego Cloudflare Worker `winerim-proxy` version `6d8af13d-2ac0-4626-8535-2f5457954d56`.
- Antes de desplegar el Worker, se validaron las 18 URLs nuevas de articulos como Googlebot: todas devolvian `HTTP 200`, `x-prerendered: true`, canonical propio y contenido real sin `Not found`.
- Tras el Worker, los 6 hubs de `Aprender vino` validan como Googlebot con `HTTP 200`, `x-worker-branch: worker-static-prerender`, `x-prerendered: true`, canonical propio y enlaces a las 6 guias por idioma.
- La validacion en navegador real de los hubs de `Aprender vino` confirmo 6 enlaces de articulo por idioma, canonical correcto y ausencia de overflow en desktop y mobile.
- El sitemap productivo contiene ahora `2282` URLs y las 18 URLs nuevas de la segunda oleada; Search Console seguia mostrando `2.264` paginas descubiertas antes de procesar el nuevo envio.
- El 2026-07-01 se reenvio `/sitemap.xml` en Search Console y Google confirmo `Se ha enviado el sitemap correctamente`.
- El 2026-07-01 Search Console no permitio solicitar indexacion manual de los nuevos articulos ES ni de la URL italiana pendiente de margen porque la cuota diaria seguia superada.
- El 2026-07-01 se amplio `Como lo hace Winerim` a producto/funnel: `ConnectedCellarSection` acepta variantes `core` y `supply`, `WinerimCore` y `WinerimSupply` las usan, y `MetaDemoLanding` incorpora el bloque compacto `Que veras en la demo`.
- La variante `core` explica como albaranes, ventas, stock, carta y margen se convierten en diagnosticos y senales de decision.
- La variante `supply` explica como albaranes, compras, coste, stock y rotacion se convierten en criterio de reposicion y negociacion.
- La landing `go.winerim.wine` / `/meta-demo` gana una seccion corta sobre subir albaranes, conectar ventas/stock y decidir con margen real, manteniendo el foco en el formulario.
- Se corrigio una contradiccion de idioma en `WinerimSupply`: el conector del H2 de Supply para DE/PT heredaba el texto frances `avec ce que vous`; ahora DE usa `mit dem, was Sie` y PT `com o que`.
- Validaciones locales de la ampliacion comercial: `npm run build`, `git diff --check` y QA navegador desktop/mobile para Core, Supply y Meta Demo sin overflow ni `Not found`.
- Durante la QA se detecto una deuda preexistente: `DecisionCenterTeaser` muestra texto espanol en variantes PT/DE de paginas de producto.
- El 2026-07-01 se preparo la segunda oleada de `Aprender vino` como 18 articulos localizados: tipos de vino, uvas/castas/cepages/rebsorten para empezar y regiones vinicolas para empezar en restaurante.
- La segunda oleada vive en la migracion `supabase/migrations/20260701102537_add_learn_wine_second_spokes.sql` y usa `article_group`, `lang` y `related_links` siguiendo el patron de la primera oleada.
- El hub `Aprender vino`, `prerender`, Cloudflare Worker, `llms.txt`, `llms-full.txt` y el test SEO quedaron sincronizados para exponer 6 guias por idioma cuando la migracion se aplique.
- Validaciones locales de la segunda oleada: test SEO, build, Worker check, Deno check, `git diff --check` y QA navegador desktop/mobile en ES/EN/PT sin overflow.
- La segunda oleada no esta desplegada todavia en produccion porque primero hay que aplicar la migracion en Lovable/Supabase; el Worker no debe publicarse antes para no enlazar articulos inexistentes.
- El 2026-07-01 se revalido produccion tras publish/deploy/purge para distribuidores y calculadora de margen: 12/12 rutas responden correctamente como Googlebot con `HTTP 200`, `x-prerendered: true`, canonical propio, 7 `hreflang`, H1 localizado y sin fallback.
- El 2026-07-01 se revalido navegador real para esas 12 rutas y todas muestran contenido localizado, H1/canonical propios y sin `Pagina no encontrada`.
- El 2026-07-01 `/sitemap.xml` productivo contiene las 12 URLs revisadas y `2264` entradas; Search Console recibio de nuevo el sitemap correctamente.
- El 2026-07-01 Search Console acepto 11 solicitudes manuales de indexacion/reindexacion para distribuidores y calculadora de margen; solo quedo pendiente `https://winerim.wine/it/calcolatrice-margini-vino` por cuota diaria.
- El 2026-07-01 Search Console mostro `/pt/distribuidor` como `Pagina alternativa con etiqueta canonica adecuada`, aunque produccion valida canonical propio y hreflang correcto; queda como senal a vigilar.
- El 2026-07-01 se preparo una revision publicable de las paginas `Distribuidor` y `Calculadora de margen` en seis idiomas.
- `Distribuidor` quedo reposicionada como programa B2B para partners HORECA, con claims prudentes, breadcrumbs, requisitos, modelo de partner, escenarios economicos, proceso, mercados, FAQ e internal links.
- `Calculadora de margen` quedo reforzada con FAQ localizada, canonical/hreflang localizado, enlaces internos localizados y explicacion de margen, multiplicador y Beverage Cost.
- Se sincronizaron distribuidores y margen en React, `ROUTE_MAP`, sitemap, prerender, Cloudflare Worker, `sitemap-extra.json`, `llms.txt` y `llms-full.txt`.
- Se corrigio un bug local de `CalculadoraMargen`: el componente usaba `useEffect` pero el import de React no lo incluia tras la edicion.
- Se corrigio un overflow movil en el componente comun `InternalLinks`, que afectaba a tarjetas de enlaces internos en mobile.
- El 2026-07-01 se pusheo `b981921 feat: refine distributor and margin SEO pages` y se desplego Cloudflare Worker `winerim-proxy` version `31bbbf98-93f6-4659-81fb-5ece89be0214`.
- El 2026-07-01 el deploy CLI de Supabase SEO siguio bloqueado por falta de `SUPABASE_ACCESS_TOKEN`; `sitemap` y `prerender` deben desplegarse desde Lovable/Supabase.
- El 2026-07-01 se anadio prerender estatico puente en Worker para las seis rutas de distribuidores porque la Edge Function productiva antigua devolvia contenido/canonical de home para `/distribuidor`.
- Con cache-buster, produccion valida `worker-static-prerender` correcto para distribuidores; sin query queda pendiente purgar cache Cloudflare de esas rutas.
- Validaciones locales del 2026-07-01 para distribuidores/margenes: build OK, Worker check OK, Deno check OK, `sitemap-extra` JSON OK, `git diff --check` OK y QA navegador desktop/mobile OK.
- Contradiccion corregida el 2026-07-01: `/distribuidor` existia en React, pero faltaba en `ROUTE_MAP` y en parte de la superficie SEO localizada.
- Contradiccion corregida el 2026-07-01: la calculadora de margen tenia rutas DE/PT, pero la lista manual de alternates de `prerender` no incluia DE/PT.
- El 2026-07-01 se preparo la primera oleada publicable de spokes de `Aprender vino` mediante la migracion `supabase/migrations/20260701064536_add_learn_wine_first_spokes.sql`.
- La migracion de `Aprender vino` crea/actualiza 18 articulos: 3 temas x 6 idiomas (`es/en/it/fr/de/pt`) para cata en cinco pasos, vocabulario de cata y maridajes basicos para restaurantes.
- Los articulos usan slugs localizados con sufijo de idioma en Supabase para variantes internacionales, siguiendo el patron de rutas `/{lang}/article/{slug}` sin salto a espanol.
- El hub `src/pages/AprenderVino.tsx` enlaza ahora esos tres spokes por idioma en una seccion `Primeras guias para empezar` y expone un `ItemList` adicional en schema.
- Se sincronizaron enlaces de los nuevos spokes en `supabase/functions/prerender/index.ts`, `cloudflare-worker-v3-hybrid.js`, `public/llms.txt` y `public/llms-full.txt`.
- Validaciones locales del 2026-07-01 para `Aprender vino`: `npm run test -- --run src/test/wine-library-seo-surface.test.ts` OK, `npm run build` OK, `node --check cloudflare-worker-v3-hybrid.js` OK, `deno check` de `prerender`/`sitemap` OK y `git diff --check` OK.
- QA Playwright local en `http://127.0.0.1:5173/` valido que `/aprender-vino`, `/en/learn-wine` y `/pt/aprender-vinho` muestran 3 enlaces de articulo, sin overflow; el CTA de tarjetas quedo corregido a `Leer guia`/equivalentes.
- El 2026-07-01 se desplego Cloudflare Worker `winerim-proxy` version `77662a6b-a0b0-4e2f-bfbf-b4c7cb3ad06b` para refrescar el prerender estatico de los hubs `Aprender vino`.
- Tras el publish y el deploy del Worker, produccion valido como Googlebot los 6 hubs de `Aprender vino`: todos responden `200`, `x-worker-branch: worker-static-prerender`, `x-prerendered: true` y exponen 3/3 enlaces a los nuevos articulos.
- Tras el publish y el deploy del Worker, produccion valido los 18 articulos de la primera oleada como Googlebot: todos responden `200`, `x-prerendered: true`, canonical propio y contenido real sin `Not found`.
- El 2026-07-01 `/sitemap.xml` respondio `200` y contiene las 18 URLs de articulos de la primera oleada; Search Console recibio de nuevo `/sitemap.xml` y confirmo `Se ha enviado el sitemap correctamente`.
- El 2026-07-01 Search Console mostro `https://winerim.wine/aprender-vino` ya indexada; se solicito reindexacion y Google la anadio a cola de rastreo prioritaria.
- El 2026-07-01 Search Console mostro los tres articulos ES de la oleada como `Descubierta: actualmente sin indexar`, presentes en `https://winerim.wine/sitemap.xml`; la prueba de URL publicada confirmo que se pueden indexar y Google acepto la solicitud de indexacion para las tres.
- Durante la QA local del hub aparecio el error ya conocido del feed de Instagram/404 en desktop; no afecta al bloque de `Aprender vino`, pero queda como deuda menor de consola.
- `supabase migration list --local` no pudo ejecutarse porque la base local no esta arrancada en `127.0.0.1:54322`; la migracion queda validada por inspeccion, conteo de filas y coherencia de slugs, pendiente de aplicacion real en Supabase/Lovable.
- El 2026-06-30 se implemento en la home la primera version de la seccion comercial `Como lo hace Winerim` mediante el componente `src/components/landing/ConnectedCellarSection.tsx`.
- La seccion `Como lo hace Winerim` se inserta en `src/components/landing/HomeBelowFold.tsx` despues de `HowItWorksSection`, esta localizada en `es/en/it/fr/de/pt` y cubre compras/albaranes, TPV, stock, carta, margen y decisiones.
- La seccion evita claims absolutos: usa formulas como `cuando conectas tu TPV`, `con la integracion TPV activa` y una nota sobre dependencia de integraciones/flujos operativos.
- Validacion local de la seccion comercial: `npm run build` OK; QA Playwright en `http://127.0.0.1:5173/` desktop y mobile encontro la seccion visible, sin overflow y sin errores de consola.
- El plan `src/seo/APRENDER_VINO_SPOKES_PLAN_2026-06-30.md` se amplio con briefs ejecutables para la primera oleada de `Aprender vino`: catar vino en 5 pasos, vocabulario de cata y maridajes basicos para restaurantes.
- El 2026-06-30 el usuario aporto nuevos copys comerciales sobre stock/TPV, margenes, albaranes/facturas/compras, carta digital, direccion y sumiller para evaluar una nueva seccion de venta en la web.
- La nueva linea comercial propuesta se centra en explicar `como lo hace Winerim`: subir albaranes/facturas, conectar TPV, mantener stock/carta actualizados y cruzar compras, ventas, rotacion y margen.
- El 2026-06-30 se repitio la prueba productiva del formulario de `https://go.winerim.wine/` con run id `20260630154016` y lead `codex-qa-go-retest-20260630154016@winerim.com`.
- La prueba exitosa de `go.winerim.wine` mantuvo `robots` `noindex, follow`, H1 `Solicita una demo gratuita de Winerim`, UTMs ocultos correctos, chat desactivado, formulario valido y redireccion a `https://go.winerim.wine/gracias?tipo=demo&origen=meta`.
- En esa repeticion, `contact_leads` respondio `201`, `send-lead-notification` respondio `200` con `connect_forwarded:true`, y `submit-gastrofunnel` respondio `200` con upstream `success:true` y `lead_id` `f388a0b4-bf19-4724-a1ed-f93211d05f13`.
- Un intento previo de la misma repeticion con run id `20260630153825` no llego a enviar red ni crear lead porque el selector obligatorio `phone_prefix` quedo sin completar; no debe buscarse ese email en CRM.
- El 2026-06-30 se revalidaron formularios productivos sin incluir chat por decision posterior del usuario: `/demo`, `/contacto`, popup de herramientas en `/recursos` y `https://go.winerim.wine/`.
- La tanda QA de formularios uso el identificador `20260630125959` y creo leads de prueba `codex-qa-demo-20260630125959@winerim.com`, `codex-qa-contacto-20260630125959@winerim.com`, `codex-qa-popup-20260630125959@winerim.com` y `codex-qa-go-20260630125959@winerim.com`.
- En `/demo`, `/contacto` y popup de `/recursos`, Supabase `contact_leads` respondio `201` y `send-lead-notification` respondio `200` con `connect_forwarded:true`.
- En `https://go.winerim.wine/`, el formulario respondio `contact_leads` `201`, `send-lead-notification` `200` con `connect_forwarded:true`, `submit-gastrofunnel` `200` y upstream `success:true` con `lead_id` `fe69414e-f343-4e99-ae9f-f92b7c90db22`.
- La prueba de `go.winerim.wine` confirmo que el chat esta desactivado de forma esperada: `window.__WINERIM_CHAT_DISABLED__ === true` y no habia nodos de chat en DOM.
- Durante la QA aparecieron abortos de analitica y errores `404` genericos en consola; no afectaron a insercion Supabase, notificacion ni reenvio CRM, pero quedan como posible linea menor de investigacion si se quiere limpiar consola.
- El 2026-06-30 se revalido produccion de la landing Meta Demo tras el publish: `https://go.winerim.wine/` ya muestra logo real, `+2.000 restaurantes`, testimonios reales de Simone Monese/Lorena Cuevas/Xavi Nolla, OpenGraph `https://winerim.wine/og-image.png`, `noindex, follow` y UTMs ocultos correctos.
- El 2026-06-30 se envio un formulario test en produccion desde `go.winerim.wine` con el lead `codex-prod-test+winerim-meta@winerim.com`; `contact_leads` respondio `201`, `send-lead-notification` respondio `200` y la landing redirigio a `/gracias?tipo=demo&origen=meta`.
- Durante el primer test productivo del formulario Meta Demo aparecio una llamada adicional a `https://pwkqbcgjrhoyxrsmcypw.supabase.co/functions/v1/submit-gastrofunnel` con respuesta `500`; despues se integro el commit remoto de Lovable `644db09`, que anadio `supabase/functions/submit-gastrofunnel/index.ts` y la llamada desde `MetaDemoLanding`.
- Tras integrar ese commit remoto, `submit-gastrofunnel` se revalido con llamada directa y respondio `200` con upstream `success:true`; una segunda prueba completa de formulario productivo tambien dejo `contact_leads` `201`, `send-lead-notification` `200`, `submit-gastrofunnel` `200` y redireccion a gracias.
- El 2026-06-30 se reforzo la landing Meta Demo tras el publish inicial: `src/pages/MetaDemoLanding.tsx` ahora muestra el logo real de Winerim, usa `https://winerim.wine/og-image.png` como OpenGraph, cambia la prueba social a `+2.000 restaurantes` y sustituye los tres casos plantilla por testimonios reales de Simone Monese, Lorena Cuevas y Xavi Nolla.
- La landing Meta Demo no usa un `action` HTML estatico; el formulario esta conectado por `onSubmit` a Supabase `contact_leads`, y despues invoca `send-lead-notification`. Este flujo se mantiene porque evita duplicar leads y conserva validacion, tracking y atribucion.
- El 2026-06-30 se reforzo `notifyLead` para esperar la respuesta de la Edge Function y devolver `false` si falla la invocacion, evitando que la navegacion a gracias oculte errores de notificacion/CRM en la landing Meta.
- El 2026-06-30 se actualizo `supabase/functions/send-lead-notification/index.ts` para reenviar a Winerim Connect los campos de atribucion Meta (`landing_url`, `referrer`, `fbclid`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`) y exigir CRM cuando `source="meta_demo_landing"` o `lead_category="meta_campaign"`.
- Validacion local de la landing reforzada: `npm run build`, `npx --yes deno-bin check supabase/functions/send-lead-notification/index.ts`, `git diff --check` y prueba Playwright/Chrome en `http://127.0.0.1:5174/meta-demo?...` con lead test `codex-test+winerim-meta-crm@winerim.com`; Supabase `contact_leads` respondio `201`, `send-lead-notification` respondio `200` y la navegacion termino en `/gracias?tipo=demo&origen=meta`.
- El deploy CLI directo de `send-lead-notification` sigue bloqueado por falta de `SUPABASE_ACCESS_TOKEN`; la Edge Function reforzada debe desplegarse desde Lovable Cloud/Supabase igual que en sesiones anteriores.
- El 2026-06-30 se implemento una landing de captacion para campanas de Meta en `/meta-demo`, con subdominio recomendado `go.winerim.wine`.
- La landing Meta Demo vive en `src/pages/MetaDemoLanding.tsx`, se registra en `src/App.tsx`, captura UTMs ocultos y guarda la atribucion en `contact_leads.message` como JSON.
- La landing usa `form_type="demo"` para mantener el flujo actual de leads/notificaciones/conversiones y carga/dispara el Pixel Meta `450273446324682` solo con consentimiento aceptado.
- `/meta-demo` queda como ruta `noindex` en Cloudflare Worker y la raiz de `go.winerim.wine` se prepara en React para mostrar la landing si el host esta configurado.
- El chat externo se desactiva para `/meta-demo` y para `go.winerim.wine`; la propia landing elimina cualquier widget si llegara a inyectarse.
- Validaciones de la landing Meta Demo: `npm run build`, `npm run deploy:worker:dry-run`, QA desktop/mobile sin overflow, hidden UTMs correctos, sin chat externo y comprobacion productiva de `HTTP 200`/`noindex` en `/meta-demo`.
- El 2026-06-30 se pusheo `43e1cae feat: add meta demo campaign landing` a `origin/main`.
- El 2026-06-30 se desplego Cloudflare Worker `winerim-proxy` version `635e8855-8d39-4473-b37c-f3566653dd70`.
- Falta publish Lovable del frontend para que `https://winerim.wine/meta-demo` renderice la landing real; ahora la ruta ya abre y es `noindex`, pero todavia muestra la home antigua.
- El 2026-06-30 se creo en Cloudflare el DNS `go.winerim.wine` como `A 185.158.133.1`, proxied, TTL Auto.
- El 2026-06-30 se anadio la ruta Worker `go.winerim.wine/*` a `winerim-proxy`, manteniendo `winerim.wine/*`.
- El 2026-06-30 se desplego Cloudflare Worker `winerim-proxy` version `e850fe30-c8de-4fef-b7da-5bce3ea11667` para aplicar `X-Robots-Tag: noindex, follow` a todo el host `go.winerim.wine`.
- Validacion productiva de `go.winerim.wine`: DNS resuelve a Cloudflare, `HTTP 200`, `x-worker-branch: spa` y `x-robots-tag: noindex, follow`; todavia muestra la home antigua hasta que Lovable publique el frontend del commit `43e1cae` o posterior.
- La contradiccion de prueba social de la landing Meta queda cerrada por decision del usuario: se usa `+2.000 restaurantes` en lugar de `+1.000 bodegas gestionadas`.
- El 2026-06-29 se audito el estado de publicaciones y pendientes SEO/LLM: Supabase expone `440` articulos publicados y `/sitemap.xml` contiene `440` URLs de articulos dentro de `2.234` URLs totales.
- El cluster de biblioteca del vino del 2026-06-01 esta publicado en seis idiomas, incluido en sitemap y validado en muestras como Googlebot con prerender, canonical, titulo y H1 especificos.
- El hub inspirado por La RVF quedo implementado y publicado el 2026-06-30 como capa separada `Aprender vino`; las rutas antiguas previstas tipo `/biblioteca-vino/como-empezar` pasan a ser aliases/redirects legacy.
- El 2026-06-30 se pusheo `9c005dd feat: add learn wine hub` a `origin/main` y se desplego Cloudflare Worker `winerim-proxy` version `749b0929-9ac5-408b-8c51-7ee195051232`.
- Tras ese deploy, Googlebot recibe `200`, `x-worker-branch: worker-static-prerender`, `LearningResource`, titulo y H1 propios en las rutas de `Aprender vino`, y `/sitemap.xml` contiene las seis URLs nuevas por la inyeccion puente del Worker.
- Tras el deploy de Lovable desde `main`, produccion humana valida las seis rutas de `Aprender vino` con H1, canonical, 7 `hreflang`, sin `Pagina no encontrada`, sin errores de consola y sin overflow.
- El usuario informo que las Edge Functions `sitemap` y `prerender` quedaron desplegadas desde `main`; el deploy CLI local sigue sin token, pero ya no bloquea esta publicacion.
- El usuario informo dos hallazgos de seguridad preexistentes en buckets Supabase Storage (`cartas-vinos`, `lead-uploads`) que quedaron fuera del alcance del deploy de `Aprender vino` y deben tratarse aparte.
- El 2026-06-30 se reenvio `/sitemap.xml` en Search Console para la propiedad URL-prefix `https://winerim.wine/`; Search Console confirmo `Se ha enviado el sitemap correctamente`.
- El 2026-06-30 se solicito indexacion manual de `https://winerim.wine/aprender-vino`; Search Console acepto la solicitud y anadio la URL a una cola de rastreo prioritaria.
- El 2026-06-30 Search Console mostro las seis rutas de `Aprender vino` como presentes en sitemap pero aun no indexadas: ES paso a `Rastreada: actualmente sin indexar` tras rastreo smartphone del mismo dia; EN/IT/FR/DE/PT seguian en `Descubierta: actualmente sin indexar`.
- El 2026-06-30 se preparo una correccion de seguridad para buckets `lead-uploads` y `cartas-vinos`: buckets privados, subida anonima restringida por carpeta/tipo/tamano y enlaces firmados desde `send-lead-notification`.
- El 2026-06-30 se preparo el plan operativo de primera tanda de spokes de `Aprender vino` en `src/seo/APRENDER_VINO_SPOKES_PLAN_2026-06-30.md`, con 12 temas, slugs ES/EN/IT/FR/DE/PT, prioridad y criterios SEO/LLM.
- El 2026-06-30 se pusheo `9e274d0 feat: harden lead uploads and plan wine learning spokes`; el despliegue Supabase directo sigue bloqueado por falta de `SUPABASE_ACCESS_TOKEN` y Lovable no esta autenticado en el navegador integrado de Codex.
- El 2026-06-30 el usuario confirmo que `lead-uploads` y `cartas-vinos` quedaron privados mediante Lovable Storage tool, con `SELECT` publico eliminado, politicas de `INSERT` anon/auth restringidas y `send-lead-notification` desplegada para convertir `storage://...` en URLs firmadas de 14 dias.
- El 2026-06-30 se recibio desde remoto la migracion aplicada `supabase/migrations/20260630082747_c608b25f-fbaa-4950-b158-6611319b8ade.sql`, que gestiona solo politicas RLS de Storage; la migracion anterior `20260630074507_harden_lead_storage_buckets.sql` quedo neutralizada como no-op porque Lovable bloquea SQL directo contra `storage.buckets`.
- Contradiccion detectada el 2026-06-30: el resumen operativo indicaba que `/analisis-carta` envia `storage://lead-uploads/analisis/...`, pero el bundle productivo y el build local muestran que la experiencia activa de `/analisis-carta` es `WineListAnalyzerTool`, que envia archivos a `https://api.winerim.wine/v1/analyze`; el flujo `lead-uploads` en `src/pages/AnalizaCarta.tsx` existe en codigo pero no esta conectado a un formulario renderizado.
- Produccion si sirve el cambio del popup de herramientas: `ToolsLeadPopup` sube a `cartas-vinos` y guarda `storage://cartas-vinos/...` sin `getPublicUrl`.
- El backend `https://api.winerim.wine` responde como servicio Cloudflare externo al repo; no se localizo su codigo fuente en `/Users/GOIKO/seo-migration-master`.
- El 2026-06-19 se corrigio el `404 Not Found` de `https://winerim.wine/presentacion`: React y `sitemap-extra.json` ya tenian la ruta, pero Cloudflare Worker la bloqueaba como ruta no conocida con `x-worker-branch: not-found`.
- La correccion anadio al Worker las seis rutas de presentacion (`/presentacion`, `/en/presentation`, `/fr/presentation`, `/it/presentazione`, `/de/praesentation`, `/pt/apresentacao`) como rutas SEO exactas y anadio prerender estatico especifico para bots.
- Produccion quedo validada tras desplegar Cloudflare Worker `winerim-proxy` version `807319ba-4743-47ad-87e9-401e8d952efe`: las seis rutas responden `200` para usuarios y Googlebot recibe `worker-static-prerender` con titulo/canonical propios.
- El 2026-06-19 se reviso la seccion de La Revue du Vin de France `S'initier au vin` y su `Dictionnaire du vin` como referencia editorial externa para ampliar la biblioteca del vino de Winerim.
- La RVF estructura la iniciacion al vino con hubs y subhubs: aprender vino, diccionario/glosario, acuerdos comida-vino, regiones, terroirs, conservacion/cava, economia, subastas y cultura del vino.
- La revision externa se considera inspiracion de arquitectura, intenciones de busqueda y taxonomia editorial; no es fuente para copiar texto, ejemplos literales ni estructura protegida.
- Repositorio de trabajo actual: `/Users/GOIKO/seo-migration-master`.
- El 2026-06-10 se implemento en codigo el Barometro Winerim de cartas de vino 2026 como nueva pieza publica de autoridad propia en `/barometro-cartas-vino-2026`, con variantes localizadas para `en`, `it`, `fr`, `de` y `pt`.
- El Barometro Winerim queda conectado a rutas React, `ROUTE_MAP`, sitemap, prerender, `sitemap-extra.json`, `llms.txt`, `llms-full.txt` y enlaces internos desde guias, benchmark y benchmarks/playbooks.
- El Barometro Winerim incluye schema `Report`, `Dataset` e `ItemList`, metodologia editorial, FAQ y separacion conceptual entre datos observables, inferencias e hipotesis.
- La implementacion local del Barometro Winerim paso `npm run build`, test SEO enfocado, `deno check` de Edge Functions, validacion JSON de `sitemap-extra.json`, `git diff --check` y QA local desktop/mobile.
- El 2026-06-11 se publico el Barometro Winerim en produccion: frontend Lovable `Up to date`, Cloudflare Worker `winerim-proxy` version `ec48088d-62b0-4d3e-85c0-8d9cc74760e1`, seis URLs localizadas con `200`, sitemap con las seis URLs y Googlebot con `worker-static-prerender`, canonical, `hreflang`, `Report` y `Dataset`.
- El 2026-06-11 el deploy directo por CLI de Supabase Edge Functions `sitemap` y `prerender` siguio bloqueado por falta de `SUPABASE_ACCESS_TOKEN`, pero Lovable desplego ambas Edge Functions desde el proyecto `Web Winerim`.
- El 2026-06-11, tras el deploy de Lovable, se retiro el prerender estatico temporal del Barometro en Cloudflare Worker y se desplego `winerim-proxy` version `356db317-9985-41de-a1a1-ac6ed6baba6f`; Googlebot recibe el Barometro desde Supabase `prerender` con `x-worker-branch: bot-prerender`.
- El 2026-06-11 la Edge Function `sitemap` de Supabase ya incluye las seis URLs del Barometro con alternates `xhtml:link`; la inyeccion del Worker queda solo como fallback inofensivo si alguna URL faltara en origen.
- El 2026-06-11 Search Console recibio solicitud de indexacion manual para `https://winerim.wine/barometro-cartas-vino-2026` y releyo `/sitemap.xml` como `Correcto`, con `2.234` paginas descubiertas.
- El 2026-06-13 Search Console mostro el Barometro EN y PT indexados; ES, IT, FR y DE estaban `Rastreada: actualmente sin indexar`, con rastreo permitido, obtencion correcta, indexacion permitida, sitemap detectado y solicitudes manuales renovadas para ES/IT/FR/DE.
- El 2026-06-13 se corrigio el aviso no critico de Search Console para schema `Dataset` del Barometro: se anadio `license` localizado a React, Supabase `prerender` y fallback Worker; produccion valida `license` en las seis variantes.
- El 2026-06-13 se desplego Cloudflare Worker `winerim-proxy` version `5d2c0d9c-b596-4796-99fb-2ac5af00636e`; Lovable desplego `prerender` del commit `3ddbbe2` y el frontend quedo `Up to date`.
- El 2026-06-08 se creo el commit funcional `70bb44e feat: enrich wine library entity schema`, que extiende el schema enriquecido y `mentions` estrategicas a regiones, estilos y maridajes, ademas de mantener paridad en `prerender` para bots.
- La mejora `70bb44e` anade grafo JSON-LD de `WebPage`, `Article`, `DefinedTermSet` y `DefinedTerm` para fichas humanas de regiones, estilos y maridajes, con propiedades especificas por tipo de entidad.
- La mejora `70bb44e` actualiza `supabase/functions/prerender/index.ts` para que Googlebot y crawlers reciban el mismo patron semantico en fichas de biblioteca reconocidas.
- El 2026-06-08 Lovable `Web Winerim` desplego `prerender` y publico frontend desde `69d2fbf`; produccion quedo validada como Googlebot en Vinho Verde PT, Espumoso DE y Lubina/Dorada PT con `200`, `bot-prerender`, `x-prerendered: true`, canonical propio, idioma correcto, schema completo y `mentions`.
- Validaciones locales de `70bb44e`: tests enfocados de biblioteca y superficie SEO, `deno check` de `prerender`, suite completa, build, `git diff --check` y navegador local.
- El 2026-06-08 se detecto y corrigio una contradiccion documental: los documentos seguian marcando `d02ff15` como `prerender` pendiente, pero el estado real ya habia avanzado a `7a1745a` para `prerender` y `6d0c2cf` para `sitemap`.
- El 2026-06-08 quedo desplegada y validada en produccion la Edge Function `prerender` del commit `7a1745a`: Googlebot recibe `mentions` estrategicas reales en JSON-LD para uvas prioritarias, no solo hubs genericos.
- El 2026-06-08 se pusheo, desplego y valido `6d0c2cf fix: include strategic wine library targets in sitemap`: `/sitemap.xml` responde `200`, contiene 2.150 URLs y cubre las 9 rutas estrategicas nuevas en las seis lenguas.
- Las 54 variantes nuevas del sitemap para esas 9 rutas existen en produccion; las 27 variantes `es/de/pt` revisadas como Googlebot responden `200` y una muestra confirma `x-prerendered: true` con `x-worker-branch: bot-prerender`.
- Los slugs de entidad de la biblioteca siguen usando la forma canonica base espanola dentro de rutas localizadas, por ejemplo `francia`, `blanco-mineral` o `queso-azul`; cambiar esto requiere migracion de canonicals, redirects, hreflang y sitemap.
- El proyecto es una aplicación Vite + React + TypeScript.
- La biblioteca del vino vive en la superficie `/biblioteca-vino` y sus rutas localizadas.
- La biblioteca del vino incluye una capa editorial avanzada para uvas, regiones, estilos y maridajes prioritarios, además de la infraestructura multilingüe.
- La capa editorial avanzada de uvas prioritarias está escalando por tandas; tras la última expansión publicada cubre 40 uvas prioritarias.
- La expansión editorial de biblioteca del vino cubre 40 uvas, 34 regiones prioritarias, 25 estilos prioritarios y 30 maridajes/platos prioritarios en seis idiomas.
- El 2026-06-08 se publico y valido en produccion `3954369 feat: expand wine library entity editorial coverage`, que amplio perfiles editoriales visibles de regiones, estilos y maridajes/platos, sincronizo `prerender` y anadio rutas nuevas al sitemap.
- Produccion tras `3954369`: Googlebot valida Santorini PT, Franciacorta DE y Ceviche PT con `200`, `bot-prerender`, `x-prerendered: true`, canonical propio, idioma correcto, schema enriquecido y contenido editorial sin fallback; `/sitemap.xml` contiene 2.228 URLs y las nuevas rutas revisadas en `es/de/pt`.
- El 2026-06-08 se publico en produccion la cuarta tanda editorial de uvas prioritarias: `graciano`, `muscadet`, `semillon`, `assyrtiko`, `vermentino`, `carmenere`, `tannat`, `petit-verdot`, `torrontes` y `corvina`.
- El 2026-06-08 se pusheo `d02ff15 feat: enrich wine library grape schema links`, que completa enlaces estrategicos para las 40 uvas prioritarias, enriquece JSON-LD humano de fichas de uva y desambigua `muscadet` como uva `Melon de Bourgogne` frente a region; la paridad de `prerender` quedo cerrada posteriormente con `7a1745a`.
- El 2026-06-08 se publico en produccion un fallback visible localizado para entidades de biblioteca sin perfil editorial especifico, integrado en uvas, regiones, estilos y maridajes.
- El 2026-06-08 se desplego y valido en produccion una capa de profundidad de prerender para biblioteca del vino: 761/761 URLs visibles de Search Console pasan con minimo 317 palabras, canonical propio, idioma correcto, schema y hreflang.
- El 2026-06-08 se desplego y valido en produccion una capa de profundidad de prerender para 49 rutas estaticas/no-biblioteca visibles en Search Console: 49/49 pasan con minimo 302 palabras, canonical propio e idioma correcto.
- La cobertura completa de la expansión en sitemap quedó publicada y validada tras desplegar desde Lovable el commit `9f99fa7`.
- La biblioteca del vino incluye un grafo estratégico publicado que conecta uvas, regiones, estilos y maridajes prioritarios.
- Los hubs principales de la biblioteca del vino exponen rutas estratégicas internas hacia uvas, regiones, estilos y maridajes prioritarios en seis idiomas.
- El prerender para bots de la biblioteca del vino debe exponer el mismo grafo estratégico que el frontend humano; esta paridad quedó revalidada en producción el 2026-06-01 para home y hubs principales.
- La profundidad de regiones, estilos y maridajes prioritarios ya fue publicada y validada en producción.
- Los 96 legacy shortcuts de biblioteca del vino detectados en auditoría pública ya redirigen en producción a las rutas canónicas de entidad.
- El blog forma parte de la estrategia de autoridad de la biblioteca del vino: debe publicar clusters editoriales que enlacen de forma contextual a hubs, entidades, herramientas de análisis y demo.
- El 2026-06-01 quedó publicado el primer cluster de 3 artículos españoles de blog enfocados en biblioteca del vino, uvas/regiones y maridajes para restaurantes.
- El 2026-06-01 quedó publicado y validado el cluster internacional de 15 artículos adaptados para `en`, `it`, `fr`, `de` y `pt` sobre biblioteca del vino.
- La navegación del blog ya mantiene el idioma en rutas de artículo localizadas `/{lang}/article/{slug}`; se corrigió el salto a español detectado en blogs internacionales.
- Los bloques de apoyo de artículos (índice, herramientas, relacionados y CTAs) están localizados en la experiencia humana para evitar residuos de UI española en artículos internacionales.
- El prerender de artículos debe exponer enlaces internos reales procedentes de `related_links`, markdown del cuerpo y reglas semánticas, no solo navegación genérica.
- Los artículos estratégicos del blog deben tener rutas localizadas limpias (`/{lang}/article/{slug}`) y contenido adaptado a mercado cuando se publiquen en otros idiomas.
- Las variantes internacionales de artículos no deben quedar servidas como `200` en `/article/{slug}` si su canonical real es `/{lang}/article/{slug}`; el Worker debe consolidarlas con `301` cuando aparezcan en Search Console.
- El SEO técnico y la lectura por LLMs forman parte del alcance operativo de la biblioteca del vino: sitemap, prerender, idioma, canonical, hreflang, robots y archivos `llms.txt`.
- Core Web Vitals de la home es una línea activa antes de retomar ampliación editorial máxima: ya se cerraron arranque ligero, CSS crítico y GTM diferido en producción.
- El proyecto usa Lovable como vía operativa para publicar frontend y Edge Functions Supabase.
- El proyecto Lovable correcto para la web pública Winerim es `https://lovable.dev/projects/2c4eed0e-6760-45f0-aeb3-ce44de8e91f1` (`Web Winerim`).
- El 2026-06-08 se detectó una contradicción operativa: `https://lovable.dev/projects/ebb36746-82ff-43c3-86c1-558573beddcd` pertenece al proyecto `Crim`, no a la web pública `Web Winerim`.
- Search Console está verificado para la propiedad URL-prefix `https://winerim.wine/`; la propiedad de dominio `sc-domain:winerim.wine` sigue pendiente de acceso/verificación.
- El 2026-06-08 se reenvio `/sitemap.xml` en Search Console para la propiedad URL-prefix `https://winerim.wine/`; Google lo marco como `Correcto`, ultimo rastreo 2026-06-08 y 2.228 URLs descubiertas.
- El 2026-06-08 Search Console acepto solicitudes manuales de indexacion para tres fichas nuevas de alta intencion ya presentes en sitemap: Ceviche PT, Santorini PT y Franciacorta DE.
- El 2026-06-08 Search Console mostro `/biblioteca-vino` y `/biblioteca-vino/maridajes` como URLs ya indexadas; el bloqueo principal observado sigue concentrado en fichas nuevas descubiertas pero aun no indexadas.
- El 2026-06-09 se creo `SPIRITSRIM_CODEX_HANDOFF.md` como briefing para construir Spiritsrim, hermana gemela de Winerim orientada a destilados, cocteleria y backbar.
- Desde el 2026-05-23, estos documentos son la fuente de verdad operativa del proyecto:
  - `PROJECT_CONTEXT.md`
  - `CURRENT_STATE.md`
  - `DECISIONS_LOG.md`
  - `NEXT_STEPS.md`
- Al iniciar una sesión se deben leer estos documentos antes de asumir estado no documentado.
- Al cerrar una sesión se deben actualizar `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.

## Decisiones

- No dejar `winerim.wine` en `Proxied` mientras el Worker no se ejecute y Cloudflare Trace no reconozca el hostname como perteneciente al account.
- Mantener `public/sitemap.xml` como fallback estatico publicable desde Lovable para evitar `404` en sitemap cuando fallen Edge Function/Worker.
- No reenviar sitemap en Search Console hasta que `https://winerim.wine/sitemap.xml` devuelva `HTTP 200`.
- Tratar el bloqueo del apex como problema de configuracion Cloudflare/Lovable/proveedor de hostname, no como problema de copy, React o contenido CloudRIM/SAVia.
- CloudRIM y SAVia pasan a ser capacidades principales de Winerim con paginas propias, presencia en home/producto y superficie SEO/LLM completa.
- SAVia debe comunicarse siempre como agente que prepara decisiones y respuestas, no como sistema que ejecuta acciones criticas sin aprobacion humana.
- La publicacion de CloudRIM/SAVia debe coordinarse en orden: Lovable frontend, Edge Functions `sitemap`/`prerender`, Cloudflare Worker y revalidacion de produccion/Search Console.
- Considerar publicada y revalidada la actualizacion de copy/CTA de `go.winerim.wine` tras comprobar produccion, responsive, ancla al formulario, UTMs y SEO `noindex`.
- No generar leads QA adicionales cuando el cambio revisado no toca backend/formulario y ya existen pruebas previas de CRM, salvo que el usuario pida una prueba completa de envio.
- Para `go.winerim.wine`, usar el copy comercial nuevo de LeadConnector solo donde no contradiga decisiones previas: se conserva `+2.000 restaurantes` y testimonios reales.
- Mantener el CTA fijo superior de la landing Meta como boton de anclaje al formulario, sin cambiar el flujo React/Supabase/CRM existente.
- Tratar el banner de cookies en landing de pago como posible optimizacion CRO separada, no como bloqueante tecnico.
- Tratar cualquier canonical localizado que apunte a la version espanola como error SEO, aunque el contenido visible este correctamente traducido.
- Resolver deudas de localizacion comunes en componentes compartidos cuando aparezcan durante QA de producto, no dejarlas como problema aislado de una sola pagina.
- Mantener la segunda oleada de `Aprender vino` como articulos guiados B2B y no mezclarla con fichas de entidad de `Biblioteca del vino`.
- Coordinar despliegue de oleadas editoriales que dependen de Supabase en este orden: migracion de articulos, publish frontend, Edge Functions `sitemap`/`prerender`, Worker.
- Dar por publicada y revalidada tecnicamente la tanda de distribuidores y calculadora de margen tras validar Googlebot, navegador real, sitemap y Search Console.
- Usar solicitudes manuales de Search Console solo para URLs estrategicas y respetar la cuota diaria; el resto debe apoyarse en sitemap, enlazado interno y seguimiento.
- Vigilar `/pt/distribuidor` antes de cambiar codigo: la senal de canonical alternativa no contradice todavia las validaciones productivas de canonical/hreflang.
- En `Distribuidor`, evitar claims no documentados o demasiado absolutos (`15M+ restaurantes`, `90%`, `producto que se vende solo`) y usar una propuesta de partner HORECA verificable.
- Mantener `/de/haendler` como ruta canonica alemana para distribuidores.
- Usar `FAQSection` como patron para FAQ visibles + schema localizado en paginas comerciales/herramientas, en vez de scripts JSON-LD manuales por pagina.
- Tratar `InternalLinks` como componente comun sensible a SEO y responsive; los arreglos de mobile deben hacerse en el componente si el problema es compartido.
- Usar prerender estatico en Worker solo como puente cuando la Edge Function productiva aun no tenga el contenido correcto; despues de desplegar `prerender`, valorar retirar el puente si se quiere centralizar SEO en Supabase.
- La primera oleada real de `Aprender vino` se publica como articulos de blog localizados, no como entidades nuevas de `Biblioteca del vino`.
- Los tres primeros spokes priorizados son: catar vino en cinco pasos, vocabulario de cata y maridajes basicos para restaurantes.
- En el hub `Aprender vino`, las tarjetas de spokes deben usar CTA de lectura (`Leer guia` y equivalentes), no el CTA general de biblioteca.
- Para bots y LLMs, el hub debe exponer enlaces a los spokes tanto en React/schema como en prerender, Worker fallback y archivos `llms`.
- Ubicacion inicial de la seccion `Como lo hace Winerim`: home, justo despues del bloque `HowItWorksSection`; la pagina de producto y funnels quedan como segunda fase para adaptar la misma logica.
- Para la inspiracion de La RVF, avanzar primero con 3 spokes x 6 idiomas, no con todos los temas a la vez, para mantener calidad, enlazado y revision editorial.
- Tratar los copys nuevos como material para una seccion web de conversion, no solo como anuncios de Meta: debe reforzar homepage/producto y explicar el sistema operativo de bodega de Winerim.
- Dejar el chat fuera de la QA actual hasta nueva orden; no probar ni modificar el widget de chat en esta tanda.
- Considerar valida la conexion tecnica a CRM para los formularios probados cuando `send-lead-notification` devuelve `connect_forwarded:true`; la confirmacion final visual debe hacerse dentro de Winerim Connect/CRM.
- Usar `+2.000 restaurantes` como claim de prueba social en la landing Meta Demo.
- Reemplazar los casos plantilla de la landing Meta Demo solo con testimonios reales ya presentes en la web; no inventar testimonios ni dejar placeholders visibles en campanas.
- Mantener el formulario de la landing Meta conectado por React/Supabase (`onSubmit` -> `contact_leads` -> `send-lead-notification`) en vez de anadir un `action` HTML estatico que podria saltarse tracking, validacion o CRM.
- Considerar obligatorio el reenvio a Winerim Connect/CRM para leads de `meta_demo_landing`; si falta `WINERIM_CONNECT_WEBHOOK_URL` o el webhook falla, la Edge Function debe devolver error para poder detectarlo.
- Usar `go.winerim.wine` como subdominio recomendado para funnels de campanas; no usar `demo.winerim.wine` sin revisar porque ya resuelve en DNS.
- Mantener la landing Meta Demo como superficie de conversion pagada `noindex`, separada de SEO editorial y de Biblioteca del vino.
- En la primera fase de campanas, guardar UTMs en `contact_leads.message` en vez de crear migraciones de columnas; si escala reporting, evaluar columnas dedicadas o tabla de attribution.
- No publicar testimonios inventados ni placeholders literales en la landing; sustituir espacios pendientes por casos reales antes de escalar presupuesto.
- La inspiracion de La RVF se materializo como una capa separada `Aprender vino`, no como una subcarpeta de `Biblioteca del vino`.
- Validar nuevas URLs estrategicas por contenido real, no solo por status `200`, para evitar falsos positivos causados por fallbacks o catch-all.
- Toda ruta incluida en sitemap o en React como pagina publica debe estar tambien permitida por Cloudflare Worker; si no, produccion puede devolver `404` antes de llegar a Lovable.
- Para `/presentacion`, mantener un prerender estatico en Worker hasta que Supabase `prerender` tenga una version propia equivalente o se centralice la fuente SEO.
- Para Winerim, mantener `Aprender vino` como hub propio localizado, conectado a biblioteca, glosario, maridajes, regiones, uvas, estilos, analisis de carta y formacion de equipos de sala.
- Priorizar en ese hub el angulo diferencial B2B de Winerim: explicar vino para restaurantes, hoteles y equipos de sala, no solo educacion generica para aficionados.
- Las cartas de vino subidas por leads deben tratarse como datos privados: no usar buckets publicos ni URLs publicas persistentes para `lead-uploads` ni `cartas-vinos`.
- No dar por cerrado el flujo de privacidad de `/analisis-carta` hasta auditar `api.winerim.wine`; no forzar su migracion a Supabase Storage sin entender el backend porque podria romper el analizador interactivo.
- Tratar los limites de tamano y MIME a nivel bucket como tarea de Lovable Cloud Storage panel/soporte mientras la plataforma bloquee SQL directo contra `storage.buckets`.
- No priorizar subastas como parte del primer bloque de iniciacion de Winerim; puede quedar como contenido futuro de autoridad, pero no como base de la biblioteca para captacion.
- Separar siempre la información en hechos, decisiones, hipótesis y tareas pendientes.
- Tratar el Barometro Winerim como activo de autoridad SEO/LLM y fuente citable, no como sustituto del `Wine List Score` existente.
- No publicar cifras de benchmark como datos reales del mercado sin respaldo de datos agregados, anonimizados y metodologia documentada.
- Para el Barometro, usar Supabase `sitemap` y `prerender` como fuente productiva de verdad tras el deploy de Lovable; Cloudflare Worker solo debe conservar reconocimiento de rutas y fallback de sitemap.
- Para el schema `Dataset` del Barometro, usar las paginas localizadas de terminos de Winerim como `license` hasta que exista una licencia especifica de dataset.
- Si falta contexto, revisar primero estos documentos antes de continuar.
- Si se detectan contradicciones entre documentos, código o instrucciones, señalarlas en vez de ignorarlas.
- Actualizar estos documentos también durante la sesión cuando ocurra algo significativo.
- Publicar artículos de blog de forma táctica, por clusters conectados a la biblioteca del vino y a conversión, antes que aumentar volumen sin enlazado ni intención clara.
- Priorizar traducción/adaptación por país de artículos estratégicos cuando el routing, sitemap, prerender y la UI humana mantengan el idioma sin saltar a español.
- No traducir slugs de entidad como parche rapido mientras ya esten publicados como canonicals en sitemap; tratarlos como una migracion SEO con redirects 301, hreflang, canonicals y validacion de Search Console.
- Tratar el schema enriquecido de regiones, estilos y maridajes como parte de la capa semantica base de biblioteca, no como mejora opcional solo para uvas.
- Tratar Spiritsrim como proyecto separado que puede reutilizar arquitectura Winerim, pero no dominio, IDs, contenido literal, claims ni sitemap/prerender de Winerim.

## Hipótesis

- Tipos de vino, uvas iniciales y regiones iniciales deberian completar el recorrido de `Aprender vino` y hacerlo mas util para equipos de sala, SEO convencional y LLMs.
- Si la migracion, sitemap/prerender y Worker se publican juntos, Google deberia descubrir las 18 URLs nuevas con menor riesgo de `Not found` o enlaces rotos temporales.
- Las solicitudes manuales de Search Console deberian acelerar el recrawl de distribuidores/margenes, pero no garantizan indexacion inmediata.
- El desfase entre las `2264` URLs reales del sitemap y las `2.258` paginas descubiertas que mostraba Search Console deberia corregirse tras una nueva lectura.
- Si `/pt/distribuidor` sigue como alternativa canonica tras el recrawl, podria requerir mas diferenciacion local, enlaces internos PT o revision de cache/canonicals historicos.
- Reforzar distribuidores con estructura de partner, FAQ e internal links deberia mejorar conversion comercial y comprension por LLMs.
- Reforzar la calculadora de margen con FAQ localizada e internal links deberia mejorar su utilidad SEO/LLM y conectarla mejor con Winerim Core/Supply.
- Mantener paridad entre React, sitemap, prerender, Worker y `llms` deberia reducir incidencias de Search Console en rutas comerciales nuevas.
- Publicar los primeros spokes de `Aprender vino` deberia mejorar enlazado interno, cobertura SEO informacional y recuperabilidad por LLMs porque convierte el hub en una ruta guiada con contenido profundo.
- La primera oleada puede ayudar a restaurantes y hoteles a formar equipo de sala con lenguaje practico, diferenciando Winerim de medios editoriales generalistas de vino.
- Los articulos entraran en sitemap automaticamente cuando la migracion este aplicada y la Edge Function `sitemap` lea las filas publicadas de `articles`.
- La seccion `Como lo hace Winerim` deberia mejorar comprension y conversion porque transforma funciones dispersas en un flujo operativo: compra entra, venta sale, stock se alinea, carta se actualiza y margen se entiende.
- Los briefs de la primera oleada de `Aprender vino` reducen el riesgo de publicar contenido generico y ayudan a mantener el enfoque B2B para equipos de sala.
- Una seccion tipo `Como lo hace Winerim` o `Sabias que...` podria mejorar conversion porque aterriza el beneficio operativo: menos Excel, menos stock desactualizado, mas control de margen y carta viva conectada al TPV.
- Conviene evitar promesas absolutas tipo `todo al momento` o `olvidate` si alguna integracion depende del TPV, proveedor o configuracion; mejor formularlo como `cuando conectas tu TPV` o `con la integracion activa`.
- Los `404` genericos observados en consola durante QA productiva probablemente pertenecen a recursos/analitica no criticos, no al flujo de formularios ni al CRM.
- Esperar la invocacion de `send-lead-notification` antes de navegar a gracias reduce el riesgo de perder envios a CRM en trafico de campanas.
- Incluir UTMs y `fbclid` tambien en el payload de Winerim Connect deberia permitir atribucion comercial mas clara sin cambiar todavia el esquema de `contact_leads`.
- La landing Meta Demo deberia convertir mejor que `/demo` para trafico frio de Meta porque elimina navegacion, footer, chat externo, FAQ y CTAs secundarios.
- `go.winerim.wine` deberia servir como URL corta y reutilizable para Meta Ads, Google Ads y funnels futuros si Cloudflare enruta el host al mismo Worker/frontend.
- La brecha principal actual tras publicar `Aprender vino` es reenviar/monitorizar Search Console y ampliar spokes especificos de iniciacion sin mezclar la biblioteca de entidades.
- La correccion de buckets deberia reducir exposicion de documentos sensibles sin romper captacion si Lovable aplica migracion, frontend y Edge Function juntos.
- La correccion de buckets ya reduce exposicion en el popup de herramientas; la privacidad real de PDFs de `/analisis-carta` depende de como `api.winerim.wine` almacene o descarte los archivos recibidos.
- La discrepancia entre React/sitemap y Worker puede repetirse en paginas nuevas si no se valida siempre produccion humana y Googlebot tras publicar rutas.
- Un recorrido guiado para principiantes puede aumentar la utilidad humana, el enlazado interno y la comprension por Google/LLMs de la biblioteca del vino.
- Adaptar contenidos de iniciacion a contextos de restaurante y hotel deberia diferenciar Winerim frente a medios editoriales generalistas de vino.
- La biblioteca del vino es una superficie SEO estratégica para Winerim.
- La ampliación internacional de la biblioteca debe priorizar paridad de rutas, indexabilidad, hreflang, canonical, sitemap y prerender para bots.
- La mejora editorial debería avanzar después de asegurar la base técnica multilingüe.
- La mejora editorial debe mantener paridad entre experiencia humana, sitemap/prerender y datos estructurados.
- Las entidades prioritarias deben usar perfiles editoriales propios; el fallback visible es una capa para entidades que aun no tienen perfil especifico.
- Las rutas estratégicas de hubs deben mantenerse sincronizadas entre React y `supabase/functions/prerender/index.ts` hasta que exista una fuente compartida.
- La ampliación editorial debe publicarse desde Lovable y validarse en producción antes de tratarse como cerrada.
- Los archivos `llms.txt` y `llms-full.txt` ayudan a orientar agentes y crawlers de IA, pero no sustituyen contenido indexable, prerender correcto ni schema consistente.
- Los clusters editoriales del blog deberían aumentar autoridad temática y enlazado interno hacia la biblioteca del vino si se indexan, se enlazan desde hubs relevantes y mantienen profundidad real.
- Corregir el salto de idioma en blog debería mejorar experiencia internacional y evitar señales SEO/LLM contradictorias entre URL, contenido, canonical e idioma.
- Aplicar el mismo patron de `WebPage` + `Article` + `DefinedTermSet` + `DefinedTerm` en todas las fichas prioritarias deberia mejorar comprension de entidades por Googlebot y LLMs.
- El Barometro Winerim deberia reforzar la autoridad tematica si evoluciona desde metodologia publica hacia dataset real agregado con cifras defendibles por vertical.

## Tareas pendientes

- Revision local de distribuidores y margenes completada el 2026-07-01; pendiente publicar, desplegar y revalidar produccion.
- Aplicar/desplegar desde Lovable/Supabase la migracion `20260701064536_add_learn_wine_first_spokes.sql` para que las 18 filas de articulos existan en produccion.
- Publicar desde Lovable el frontend que enlaza los nuevos spokes en `Aprender vino` y desplegar las Edge Functions `sitemap`/`prerender` actualizadas.
- Validar produccion tras deploy: hub humano, 18 rutas de articulos, sitemap con articulos, Googlebot/prerender para una muestra ES/EN/PT y ausencia de salto de idioma.
- Reenviar `/sitemap.xml` en Search Console y solicitar indexacion primero para `/aprender-vino` y las tres URLs ES de la oleada.
- Preparar la segunda oleada de `Aprender vino`: tipos de vino, uvas para empezar y regiones para empezar.
- Publicar desde Lovable el frontend que incluye `ConnectedCellarSection` y revalidar produccion humana en home desktop/mobile.
- Adaptar la seccion `Como lo hace Winerim` a una pagina de producto, probablemente `Winerim Core` o `Winerim Supply`, y preparar version corta para funnels.
- Crear la migracion SQL de la primera oleada `Aprender vino` con 3 temas x 6 idiomas y sus `related_links`, o preparar los articulos en el CMS si Lovable lo gestiona mejor.
- Actualizar el hub `Aprender vino` para enlazar a los tres spokes cuando esten publicados.
- Disenar e implementar una seccion comercial en la web basada en los copys nuevos, priorizando el mensaje: `Subes albaranes, conectas TPV y Winerim mantiene stock, carta y margen bajo control`.
- Decidir ubicacion de la seccion: home, pagina de producto y/o landing de conversion; version recomendada inicial: home + producto, con version reducida en funnels.
- Confirmar visualmente en Winerim Connect/CRM que el lead `codex-qa-go-retest-20260630154016@winerim.com` aparece correctamente identificado con UTMs `qa_20260630154016` y `fbclid=codex_qa_retest_20260630154016`.
- Confirmar visualmente en Winerim Connect/CRM que los leads `codex-qa-demo-20260630125959@winerim.com`, `codex-qa-contacto-20260630125959@winerim.com`, `codex-qa-popup-20260630125959@winerim.com` y `codex-qa-go-20260630125959@winerim.com` aparecen correctamente identificados.
- Si se quiere dejar la consola mas limpia, investigar los `404` genericos detectados durante QA productiva; no bloquearon formularios ni CRM.
- Confirmar visualmente en Winerim Connect/CRM que los leads test `codex-prod-test+winerim-meta@winerim.com`, `codex-diagnostic+winerim-gastrofunnel@winerim.com` y `codex-prod-retest+winerim-meta@winerim.com` entraron con UTMs y `fbclid`.
- Mantener monitorizado `submit-gastrofunnel` en proximas pruebas de campana aunque la revalidacion productiva ya devuelve `200`.
- Monitorizar Search Console para confirmar descubrimiento, rastreo e indexacion de las seis rutas de `Aprender vino`.
- Desplegar desde Lovable la correccion de seguridad de Supabase Storage para `cartas-vinos` y `lead-uploads`, porque el CLI local sigue sin `SUPABASE_ACCESS_TOKEN` y la base local no esta arrancada.
- Revalidar que los formularios con upload siguen funcionando y que los enlaces internos recibidos por email/webhook son firmados, no publicos.
- Auditar o localizar el backend `api.winerim.wine` para documentar almacenamiento, retencion, acceso y borrado de PDFs enviados por `WineListAnalyzerTool`.
- Considerar mover el prerender especifico de `/presentacion` desde Worker a Supabase `prerender` para reducir duplicacion futura.
- Ampliar `Aprender vino` con una primera tanda de articulos propios: catar vino, vocabulario de cata, tipos de vino, uvas para empezar, regiones para empezar, leer etiquetas, temperatura de servicio, copas, conservacion, defectos, maridajes basicos y recomendacion en sala.
- Mantener estos documentos actualizados al cierre de cada sesión.
- Monitorizar en Search Console la indexacion de la URL principal del Barometro Winerim y la cobertura de las seis variantes localizadas tras el reenvio de `/sitemap.xml` del 2026-06-11.
- Monitorizar en Search Console la cola de indexacion renovada el 2026-06-13 para ES, IT, FR y DE del Barometro, y confirmar que el aviso `Falta el campo "license"` desaparece tras recrawl.
- Conseguir `SUPABASE_ACCESS_TOKEN` o sesion Supabase CLI sigue siendo deseable para despliegues futuros sin depender de Lovable, pero el Barometro ya esta alineado en `sitemap` y `prerender` por Lovable.
- Definir el dataset real del Barometro Winerim 2026: campos, periodo, muestra minima, segmentos y umbrales de anonimato.
- Confirmar en cada nueva sesión si el estado real del repo coincide con lo documentado.
- Escalar la capa editorial avanzada de uvas, regiones, estilos y maridajes sin romper la paridad multilingüe ni el prerender para bots.
- Convertir progresivamente entidades que dependen del fallback visible en perfiles editoriales especificos cuando tengan demanda SEO o valor comercial; la cobertura de uvas prioritarias ya paso de 30 a 40.
- Mantener la validación productiva de cada tanda editorial antes de tratarla como cerrada.
- Publicar y validar en producción cada tanda editorial de biblioteca del vino.
- Revalidar en producción cualquier cambio de sitemap/prerender tras desplegarlo desde Lovable.
- Planificar la migracion futura de slugs de entidad localizados solo con mapa completo, redirects 301 y control de impacto SEO.
- Evitar que frontend y prerender diverjan cuando se añadan nuevos enlaces estratégicos de biblioteca.
- Mantener los redirects legacy de biblioteca validados y continuar escalando biblioteca del vino al máximo nivel, manteniendo rendimiento residual como línea secundaria.
- Monitorizar en Search Console la expansión editorial masiva ya publicada y validada.
- Monitorizar en Search Console el efecto del reenvio de `/sitemap.xml` del 2026-06-08 y de las tres solicitudes manuales de indexacion aceptadas.
- Monitorizar en Search Console el cluster de artículos de biblioteca del vino publicado el 2026-06-01 y solicitar indexación de una tanda corta si la herramienta lo permite.
- Solicitar indexación selectiva de los artículos internacionales solo después de validar que Search Console permite hacerlo sin error.
- Monitorizar en Search Console la ampliacion semantica de regiones, estilos y maridajes tras el deploy validado de `69d2fbf`.
- Si se abre la tarea Spiritsrim, usar `SPIRITSRIM_CODEX_HANDOFF.md` como punto de partida junto con los cuatro documentos fuente de verdad.

## Actualizacion 2026-07-03: ejecucion paralela Agora, contenido, CloudRIM/SAVia y SEO

### Hechos

- Se trabajó con cuatro agentes paralelos sobre los seis frentes pedidos por el usuario.
- Documento comercial Ágora:
  - se creó `Winerim_Agora_brief_comercial_partner_v5_2026-07-03.docx`;
  - se creó `Winerim_Agora_brief_comercial_partner_v5_2026-07-03.pdf`;
  - rutas: `/Users/GOIKO/Documents/Playground/agora_doc_2026-07-03/output/`;
  - script: `/Users/GOIKO/Documents/Playground/agora_doc_2026-07-03/scripts/build_winerim_agora_partner_brief_v5.py`;
  - QA visual reportado: PDF válido de 5 páginas, DOCX OK, sin solapes ni cortes.
- Biblioteca del vino y Aprender vino:
  - se preparó la migración local `supabase/migrations/20260703141412_add_wine_library_learn_wine_editorial_expansion.sql`;
  - añade `12` artículos: `2` temas x `6` idiomas;
  - fechas semanales: `2026-07-06` para Biblioteca del vino y `2026-07-13` para Aprender vino;
  - no se aplicó remoto porque `supabase migration list --linked` falla por proyecto no enlazado y `supabase projects list` falla por falta de `SUPABASE_ACCESS_TOKEN`.
- CloudRIM/SAVia:
  - se reforzaron las páginas React de CloudRIM, SAVia, Winerim Supply, Winerim Core, Inteligencia Dinámica y Funcionalidades;
  - se actualizaron `public/llms.txt` y `public/llms-full.txt` con facturas, conciliación albarán-factura, RIMs y aprobación humana;
  - se corrigió el posible solape entre cookie banner y CTA flotante moviendo el banner en mobile.
- Capturas de Funcionalidades:
  - no se sustituyeron assets porque las capturas alternativas disponibles tenían modal/notificación o contexto interno peor que los composites actuales.
- SEO técnico:
  - se actualizó `cloudflare-worker-v3-hybrid.js`;
  - se enriqueció el prerender estático Worker de CloudRIM/SAVia hasta unas `280` palabras y `7` alternates;
  - se añadió `/presentacion` y variantes localizadas al sitemap;
  - se añadieron alternates sitemap para CloudRIM, SAVia y Presentación;
  - se alineó `scripts/refresh-static-sitemap.mjs`;
  - `public/sitemap.xml` local queda con `2.305` URLs, sin duplicados y XML válido.
- Cloudflare Worker:
  - dry-run OK;
  - desplegado `winerim-proxy` Version ID `8dd5e4dc-33da-4269-a0a1-7899a9e2e910`.
- Producción tras Worker:
  - `https://winerim.wine/sitemap.xml` devuelve `200`, `X-Worker-Branch: sitemap-worker-detail-bridge`, `2.305` URLs, sin duplicados;
  - `/presentacion`, `/en/presentation`, `/producto/cloudrim` y `/producto/savia` están en sitemap con `7` alternates;
  - Googlebot recibe `worker-static-prerender` para `/producto/cloudrim` y `/producto/savia`, con `283` y `281` palabras respectivamente y `7` alternates;
  - `http://winerim.wine/sitemap.xml` ya redirige `301` a HTTPS;
  - `http://winerim.wine/` y `http://winerim.wine/producto/cloudrim` siguen devolviendo `200` para UA humana, lo que indica que esa parte requiere regla/capa Cloudflare fuera del Worker actual;
  - `https://www.winerim.wine/` sigue devolviendo `421`.
- Verificaciones locales:
  - `node --check cloudflare-worker-v3-hybrid.js`;
  - `node --check scripts/refresh-static-sitemap.mjs`;
  - `npm run generate:sitemap-static`;
  - `npm run build`;
  - `npm run test` con `57` tests;
  - `git diff --check`.
- Cambio ajeno/no propio presente y no tocado:
  - `src/components/WineListAnalyzerTool.tsx`.

### Decisiones

- Mantener las capturas actuales de Funcionalidades hasta conseguir capturas limpias sin modales ni notificaciones.
- Publicar inmediatamente el Worker porque Cloudflare CLI sí estaba autenticado, pero no aplicar migraciones Supabase sin credenciales/proyecto enlazado.
- Tratar `www` y la redirección HTTP completa como problema de configuración Cloudflare/DNS/certificado, no como problema resuelto solo por código.
- Mantener `Aprender vino` y Biblioteca del vino separados también en la nueva migración editorial.

### Hipótesis

- El sitemap con `/presentacion` y alternates de producto debería reducir errores de descubrimiento/canonical en Search Console tras recrawl.
- El prerender estático más largo de CloudRIM/SAVia debería mejorar comprensión por Googlebot y LLMs aunque Supabase `prerender` no tenga todavía una versión completa.
- La regla `Always Use HTTPS` o equivalente en Cloudflare debería resolver los `200` por HTTP en páginas humanas que no están entrando por la ruta Worker adecuada.
- El `421` de `www` probablemente requiere DNS/certificado/routing de hostname antes de que la redirección Worker pueda actuar.

### Tareas pendientes

- Aplicar la migración `20260703141412_add_wine_library_learn_wine_editorial_expansion.sql` desde Lovable/Supabase o con `SUPABASE_ACCESS_TOKEN`.
- Revalidar tras aplicar migración:
  - `12` artículos visibles según fecha;
  - `/blog` y variantes no saltan a español;
  - sitemap incluye los nuevos artículos solo cuando corresponda por fecha;
  - Googlebot recibe article/prerender correcto en una muestra ES/EN/PT.
- En Search Console:
  - reenviar `https://winerim.wine/sitemap.xml`;
  - inspeccionar `/presentacion`, `/producto/cloudrim`, `/producto/savia`, `/funcionalidades` y `/blog`;
  - solicitar indexación selectiva de `/presentacion` y de las URLs editoriales cuando estén aplicadas.
- En Cloudflare:
  - configurar `www.winerim.wine` para redirigir `301` a `https://winerim.wine/`;
  - forzar HTTP -> HTTPS para todas las rutas, no solo sitemap.
- Hacer QA visual post-publish de CloudRIM/SAVia/Funcionalidades en desktop/mobile si Lovable publica el frontend React.

## Actualizacion 2026-07-05: criterio vigente para expansion editorial Biblioteca/Aprender

### Hechos

- El proyecto usa Lovable Cloud para aplicar migraciones/publicar en este flujo.
- La migracion editorial vigente es `supabase/migrations/20260703141412_add_wine_library_learn_wine_editorial_expansion.sql`.
- La expansion editorial debe mantener:
  - seis idiomas: ES/EN/IT/FR/DE/PT;
  - cadencia semanal de lunes;
  - articulos extensos, idealmente por encima de `900` palabras;
  - enlaces internos a biblioteca/aprender y enlaces de conversion localizados;
  - `article_group` para relacionar traducciones.
- `public.articles` tiene columnas `lang`, `article_group` y `related_links`.
- `ArticlePage` y `prerender` pueden emitir `hreflang` de articulos cuando existen hermanos por `article_group`.
- `llms.txt` y `llms-full.txt` deben listar spokes de Aprender vino por idioma cuando haya URLs localizadas.

### Decisiones

- Para esta migracion, el agente de Lovable debe ejecutar solo:
  - `supabase--migration`;
  - `preview_ui--publish`.
- No depender de Supabase CLI, dashboard ni credenciales locales para este cierre.
- Incluir RLS/GRANTs explicitamente en migraciones que toquen tablas publicas usadas por frontend.
- Mantener `Biblioteca del vino` como base/coleccion de entidades y `Aprender vino` como ruta formativa guiada.

### Hipotesis

- El uso consistente de `article_group` favorece indexacion multilingue, canonicalizacion y citabilidad por LLMs.
- El contenido semanal por idioma deberia evitar el patron anterior de muchos articulos publicados en bloque el mismo dia.

### Tareas pendientes

- Resolver backlog amplio de idioma detectado el `2026-07-05`: route maps/hreflang, home DE/PT, herramientas, biblioteca detalle y perfiles localizados.
- Tras publish, validar Search Console y sitemap para los nuevos grupos editoriales.

## Actualizacion 2026-07-06: URLs legales solicitadas

### Hechos

- El usuario pidio activar `https://winerim.wine/politica-privacidad` y `https://winerim.wine/terminos-y-condiciones-del-contrato`.
- El fix requiere tres capas sincronizadas: React Router/frontend, Worker y prerender/sitemap.
- Worker ya se desplego manualmente y dejo de devolver `not-found` para esas rutas.
- El frontend debe publicarse desde `main` para que el navegador humano no muestre `Página no encontrada`.

### Decisiones

- Las slugs largas son el destino principal legal en español.
- Las slugs cortas se mantienen como compatibilidad historica.
- Las paginas legales siguen `noindex, follow`.

### Hipotesis

- Lovable esta publicando desde `main`; por eso se aplica el fix en una rama basada en `origin/main`.

### Tareas pendientes

- Publicar `main` en Lovable y revalidar produccion humana/bot.

## Actualizacion 2026-09-01: regla de continuidad para 2Ampliar Biblioteca del vino

### Hechos

- La tarea viva `2Ampliar biblioteca del vino` usa `/Users/GOIKO/Documents/Playground/seo-migration-master` como carpeta operativa.
- Lovable Web Winerim sigue siendo el frontend publicado confirmado para la web publica: proyecto `2c4eed0e-6760-45f0-aeb3-ce44de8e91f1`, latest commit `ef64edbb35adf4ab44e030ea2e290db21c8f5bad`.
- El router/Worker desplegado para la recuperacion de simulador/precios queda documentado como ya aplicado; no debe redeployarse por rutina.
- La revision read-only del 2026-09-01 confirma que el gate local `docs/agent_outputs/validate_release_gates.mjs` pasa.

### Decisiones

- No declarar la web ni Biblioteca al 100% hasta cerrar titles, HTML shell inicial y paridad bot/humano en DE/PT.
- No mezclar la copia antigua `/Users/GOIKO/seo-migration-master` salvo comparacion explicita o recuperacion excepcional documentada.
- Search Console debe ir despues de validar URL sana; si se usa, que sea selectivo y con evidencia fresca.

### Hipotesis

- La fuente de verdad operativa esta repartida entre Lovable publicado, repo local y Worker/Cloudflare; esa relacion debe documentarse antes de cambios amplios.

### Contradicciones

- El repo local contiene fixes que produccion Lovable aun no refleja.
- Rutas React hidratadas se ven correctas, pero el HTML inicial sigue naciendo con metadatos ES de home.

### Tareas pendientes

- Cerrar y publicar el fix de titles de uvas/simulador desde la fuente canonica.
- Corregir title bot localizado de maridajes.
- Documentar relacion Lovable/repo/Cloudflare y evitar deploys que mezclen estados.

## Actualizacion 2026-09-01: bloque interno local de Biblioteca/shell/simulador

### Hechos

- Se continuo sobre la carpeta viva `/Users/GOIKO/Documents/Playground/seo-migration-master` sin publicar ni tocar produccion.
- Queda creado `docs/agent_outputs/wine_library_internal_fixes_2026-09-01.md` como evidencia del bloque.
- Cambios locales relevantes:
  - `SEOHead` normaliza titulos que ya llegan con marca y evita dobles `Winerim`;
  - `App.tsx` deja de servir slugs cruzados del simulador en `langRoutes(prefix)` y redirige `/en/simulador-carta` a `/en/wine-list-simulator`;
  - `prerender` localiza nombres estrategicos de Biblioteca, incluida la ficha alemana `carnes-rojas` como `Rotes Fleisch`;
  - `cloudflare-worker-v3-hybrid.js` e `index.html` preparan metadata inicial de shell para home multilingue, simulador y Biblioteca.
- Reconciliacion confirmada localmente:
  - `wrangler.pages-router.toml` apunta a `https://seo-migration-magic.lovable.app` con release `lovable-ef64edbb-simulator-i18n-20260826`;
  - `wrangler.winerim.toml` apunta `ORIGIN` al mismo Lovable y usa `SITE_URL = "https://winerim.wine"`;
  - Lovable project knowledge read-only para `2c4eed0e-6760-45f0-aeb3-ce44de8e91f1` devolvio contenido vacio.

### Decisiones

- Estado operativo: `85%` local, `75%` produccion para este frente, porque las correcciones no estan publicadas.
- No pasar Search Console por estos cambios hasta publish y revalidacion productiva.
- Mantener Lovable/local/Cloudflare como fuentes coordinadas pero no intercambiables: cualquier publish debe declarar que commit/release y que Worker/prerender incluye.

### Hipotesis

- El duplicado de titles venia de entradas SEO con marca mas sufijo global en `SEOHead`.
- El fallo `/en/simulador-carta` venia de rutas React genericas por prefijo que aceptaban slugs de otros idiomas.

### Contradicciones

- `.lovable/plan.md` conserva contexto historico ES-only para el simulador, pero los reports y produccion posterior documentan i18n publicada en `ef64edbb`.
- El repo local contiene fixes que Lovable/Cloudflare no reflejan hasta una publicacion explicita.

### Tareas pendientes

- Publicar desde la fuente canonica confirmada, no desde una mezcla accidental de estados.
- Revalidar produccion humano/bots/sitemap tras publish antes de Search Console.
- Reintentar `npm test` y `npm run build` en entorno estable: ambos se colgaron localmente y se cortaron con timeout controlado.

## Actualizacion 2026-09-01: diagnostico npm/build y paquete local de release

### Hechos

- Se diagnostico el bloqueo de `npm test`/`npm run build`: la causa era deshidratacion `compressed,dataless` de iCloud/FileProvider en archivos criticos, incluido `package-lock.json`, `node_modules/vite/bin/vite.js` y metadata de `.git`.
- Se recupero la toolchain desde un clon limpio read-only de GitHub en `/tmp/winerim-origin-main-20260901-1108`, commit `ef64edbb35adf4ab44e030ea2e290db21c8f5bad`, sin sincronizar la copia antigua `/Users/GOIKO/seo-migration-master`.
- Se materializaron dependencias con `npm ci --ignore-scripts --no-audit --no-fund`; Vite queda en `5.4.19` y Vitest en `3.2.4`.
- Se corrigio localmente el fallback ES de `src/pages/Blog.tsx` y `src/pages/ArticlePage.tsx`: rutas localizadas sin contenido ya no deben mostrar articulos espanoles, sino empty state o pagina localizada `noindex`.
- Se reconstruyo `src/test/blog-article-language-guardrails.test.ts`, se alineo `supabase/functions/sitemap/index.ts` con `prerender` para `66` releases y se reconstruyo `wrangler.winerim.toml` desde documentacion viva, sin secretos.
- Evidencia: `docs/agent_outputs/wine_library_release_gate_diagnostics_2026-09-01.md`.
- Validaciones verdes: `npm test -- --reporter=dot` (`159/159`), `npm run build`, `npx tsc --noEmit --pretty false`, `node docs/agent_outputs/validate_release_gates.mjs`, `node --check` Worker/router y ESLint focal.

### Decisiones

- Considerar el paquete local de Biblioteca/simulador/blog/shell listo para release coordinado, pero no publicado.
- No ejecutar `npm run deploy:worker:dry-run` ni ningun deploy sin coordinacion explicita del controlador.
- Tratar `.git` local como bloqueo operativo de commit/push; no repararlo automaticamente ni mezclar repos.
- No tocar `.env`, migraciones locales deshidratadas no recuperables ni outputs historicos que no existen en el clon GitHub.

### Hipotesis

- La deshidratacion puede reaparecer si la carpeta viva sigue gestionada por iCloud/FileProvider.
- Tras publicar desde la fuente canonica, el blog localizado deberia dejar de generar contenido ES en rutas internacionales y deberia reducir ruido de Search Console por canonicals/duplicados.

### Contradicciones

- La documentacion inmediatamente anterior decia que `vitest` y `vite build` se colgaban; queda supersedido por esta corrida: ambos pasan tras recuperar placeholders.
- Produccion/Lovable no consta actualizada con este paquete aunque localmente los gates esten verdes.
- Persisten placeholders no bloqueantes fuera de `.git`, incluidos docs historicos, migraciones locales de julio y `src/components/simulator/simulatorI18n.ts`.

### Tareas pendientes

- Confirmar via canonica de release y publicar solo ese paquete tecnico, sin articulos nuevos ni Search Console.
- Reparar o sustituir el `.git` local antes de commit/push desde esta carpeta, o aplicar el patch desde un clon limpio.
- Revalidar produccion tras publish con humano, Googlebot, `OAI-SearchBot/1.0`, sitemap, canonical, hreflang y ausencia de marcadores internos.

## Actualizacion 2026-09-01: paquete P0 i18n/SEO/OG preparado en clon sano

### Hechos

- Se trabajo en el clon sano `/Users/GOIKO/codex-workspaces/seo-migration-master-release-sane-20260901-1536`, rama `codex/winerim-i18n-seo-og-p0-20260901`, no en la copia antigua `/Users/GOIKO/seo-migration-master`.
- Queda creado el commit local `9c374e5` (`fix i18n seo og shell package`), sin push, publish, deploy ni Search Console.
- El paquete cubre HTML inicial localizado, canonical, hreflang, `html lang`, title/description, OG/Twitter, JSON-LD, sitemap, prerender, Worker, router Pages y rutas canonicas del simulador.
- Rutas canonicas del simulador confirmadas en codigo: ES `/simulador-carta`, EN `/en/wine-list-simulator`, IT `/it/simulatore-carta`, FR `/fr/simulateur-carte`, DE `/de/weinkarten-simulator`, PT `/pt/simulador-carta`.
- `/en/simulador-carta` queda tratado como alias 301 hacia `/en/wine-list-simulator`.
- Se generaron assets OG locales 1200x630 en `public/og/winerim-og-{es,en,it,fr,de,pt}.png`.
- Evidencia tecnica: `/Users/GOIKO/codex-workspaces/seo-migration-master-release-sane-20260901-1536/docs/agent_outputs/winerim_i18n_seo_og_p0_release_package_2026-09-01.md`.
- Captura mobile EN: `/Users/GOIKO/codex-workspaces/seo-migration-master-release-sane-20260901-1536/docs/agent_outputs/winerim_i18n_p0_en_simulator_mobile_20260901.png`.

### Decisiones

- Mantener este paquete como candidato local listo para coordinacion, no como cambio productivo.
- Para campanas USA, usar `en_US` en OG locale y pagina canonica EN `/en/wine-list-simulator`.
- La deteccion de idioma de `/` queda limitada a humanos y solo en raiz, con prioridad cookie/preferencia, `Accept-Language`, pais Cloudflare y fallback ES.
- No redirigir rutas explicitas de idioma por pais para evitar loops, cloaking o canonicals variables.
- No pasar Search Console de este bloque hasta publicar y revalidar produccion.

### Hipotesis

- Los fallos vivos actuales proceden de divergencia entre el paquete local validado y las capas publicadas en Lovable/Cloudflare/Supabase.
- El origen SPA de Lovable necesita apoyo de shell/edge/prerender para emitir HTML bruto correcto por ruta antes de hidratacion.

### Contradicciones

- Produccion ya contiene en sitemap las URLs localizadas del simulador, pero todavia no sirve los nuevos assets OG localizados ni el shell humano localizado.
- Lovable comunico despliegue de sitemap/prerender/redirects, pero auditoria viva sigue mostrando shell inicial ES en rutas EN y OG/locale antiguos o ausentes en algunas respuestas bot.
- Esta carpeta sigue siendo la fuente documental viva, pero el commit sano quedo en un clon externo porque el repo vivo tenia historial de deshidratacion iCloud/FileProvider.

### Tareas pendientes

- Coordinar la via canonica de release: Lovable, GitHub/clon sano, Cloudflare Worker/router y Supabase Edge Functions.
- Publicar el commit `9c374e5` o patch equivalente solo con aprobacion explicita.
- Revalidar produccion tras publicar antes de Search Console.
- No tocar articulos nuevos, migraciones editoriales, DE/PT de contenido amplio ni la copia antigua hasta cerrar este release tecnico.
