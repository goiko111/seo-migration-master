# 2Ampliar Biblioteca del vino - diagnostico npm/build y paquete local de release 2026-09-01

## Hechos

- Carpeta viva usada: `/Users/GOIKO/Documents/Playground/seo-migration-master`.
- No se publico, no se desplego, no se tocaron produccion, Search Console, Supabase remoto, Cloudflare remoto ni Lovable con creditos.
- La causa confirmada de los cuelgues de `npm test` y `npm run build` era el estado `compressed,dataless` de iCloud/FileProvider en archivos criticos del worktree.
- `package-lock.json` estaba deshidratado y Node lo leia como JSON vacio; `node_modules/vite/bin/vite.js` tambien estaba deshidratado.
- Se recupero toolchain sin sincronizar la copia antigua:
  - clon limpio read-only desde GitHub en `/tmp/winerim-origin-main-20260901-1108`, commit `ef64edbb35adf4ab44e030ea2e290db21c8f5bad`;
  - backup local de placeholders en `.dataless-backups/20260901/`;
  - `npm ci --ignore-scripts --no-audit --no-fund` con el lockfile del clon limpio.
- Versiones activas tras recuperar dependencias:
  - Vite `5.4.19`;
  - Vitest `3.2.4`;
  - Supabase CLI `2.105.0`.
- `git status --short` sigue fallando con `fatal: not a git repository` porque `.git/HEAD`, `.git/config` y objetos de `.git` siguen `compressed,dataless`.
- El paquete local corrige o preserva:
  - Biblioteca/simulador/shell/title bot del bloque previo;
  - fallback ES del blog multilingue;
  - fallback ES de articulos localizados inexistentes;
  - guardrail de blog/articulos/bots reconstruido;
  - paridad `ARTICLE_RELEASES` entre `sitemap` y `prerender`;
  - `wrangler.winerim.toml` reconstruido desde la documentacion viva, sin secretos.

## Decisiones

- Mantener este paquete como local y no publicado hasta que el controlador confirme la via exacta de release.
- No usar Search Console sobre este bloque antes de publish y QA productiva fresca.
- No copiar ni sincronizar desde `/Users/GOIKO/seo-migration-master`; solo se comparo de forma read-only y los archivos locales faltantes no existen alli.
- No tocar `.env`, migraciones locales deshidratadas no recuperables ni outputs historicos `docs/agent_outputs` que no existen en el clon GitHub.
- Tratar el estado `.git` roto como gate operativo de commit/push, no como fallo de build/test.

## Hipotesis

- La deshidratacion de iCloud/FileProvider puede reaparecer si la carpeta viva sigue bajo una ubicacion sincronizada y macOS descarga archivos no usados.
- Las migraciones locales de julio que siguen `compressed,dataless` pertenecen a trabajo no pusheado o no materializado; al no existir en GitHub ni en la copia antigua, no deben darse por recuperadas.
- Tras publicar desde la fuente canonica, el cambio de blog deberia evitar nuevas URLs localizadas con contenido ES y reducir ruido de Search Console por duplicados/malas canonicas.

## Contradicciones

- La documentacion anterior indicaba que `vitest` y `vite build` se colgaban; en esta corrida pasan tras recuperar placeholders y reinstalar dependencias.
- El repo local contiene cambios listos y validados, pero produccion/Lovable no consta actualizada con este paquete.
- `wrangler.pages-router.toml` existia materializado, pero `wrangler.winerim.toml` estaba deshidratado y no existia en el clon GitHub pese a estar documentado como necesario para deploy manual.
- Persisten archivos locales `compressed,dataless` fuera de `.git`, incluidos `.env`, varios outputs historicos, migraciones de julio y `src/components/simulator/simulatorI18n.ts`; no bloquean build/test porque no estan en el grafo activo, pero si son deuda de recuperacion documental.

## Validaciones verdes

- `npm test -- --reporter=dot`: OK, `15` test files, `159` tests.
- `npm run build`: OK, Vite build completo.
- `npx tsc --noEmit --pretty false`: OK.
- `node docs/agent_outputs/validate_release_gates.mjs`: OK, `66` releases en `prerender LINK_RELEASES`, `prerender ARTICLE_RELEASES`, `sitemap ARTICLE_RELEASES` y `worker WORKER_LINK_RELEASES`, sin warnings.
- `node --check cloudflare-worker-v3-hybrid.js`: OK.
- `node --check edge-router/winerim-pages-router.js`: OK.
- `npx eslint src/pages/Blog.tsx src/pages/ArticlePage.tsx src/components/InstagramFeed.tsx src/pages/Precios.tsx src/test/blog-article-language-guardrails.test.ts`: OK.
- Tests focales:
  - `src/test/blog-article-language-guardrails.test.ts` + `src/test/article-content-sanitize.test.ts`: OK, `5` tests.
  - `src/test/seo-head-i18n.test.tsx` + `src/test/wine-library-i18n.test.ts` + `src/test/wine-library-seo-surface.test.ts`: OK, `41` tests.
  - `src/test/partner-deck.test.ts` + `src/test/presentation-content.test.ts` + `src/test/product-architecture.test.ts` + `src/test/de-pt-seo-guardrails.test.tsx`: OK, `86` tests.

## Validaciones no ejecutadas o con avisos

- `deno check` no se pudo ejecutar porque `deno` no esta disponible en PATH; el changelog oficial de Supabase se reviso de forma ligera y no se detecto una ruptura aplicable a este cambio de constantes.
- `npm run build` mantiene warnings no bloqueantes de `caniuse-lite` antiguo y chunks grandes.
- `npm test` mantiene warnings informativos de React Router future flags v7.
- No se ejecuto `npm run deploy:worker:dry-run` porque el usuario pidio no desplegar/publicar sin coordinacion explicita; aunque sea dry-run, queda reservado al paso de release coordinado.

## Archivos tocados en el cierre de gates

- `src/pages/Blog.tsx`: elimina fallback ES para indices localizados y anade empty state localizado.
- `src/pages/ArticlePage.tsx`: elimina fallback ES para articulo localizado inexistente y emite SEO `noindex` con canonical de la URL solicitada.
- `src/test/blog-article-language-guardrails.test.ts`: reconstruido y materializado.
- `supabase/functions/sitemap/index.ts`: alinea `ARTICLE_RELEASES` con `prerender` para los grupos 2026-09-07, 2026-09-14 y 2026-09-28.
- `src/components/InstagramFeed.tsx`: evita fetch a `undefined.supabase.co` cuando falta `VITE_SUPABASE_PROJECT_ID`.
- `src/pages/Precios.tsx`: corrige `key` en la tabla comparativa.
- `wrangler.winerim.toml`: reconstruido desde docs con `winerim-proxy`, `cloudflare-worker-v3-hybrid.js`, rutas `winerim.wine/*`, `go.winerim.wine/*`, `www.winerim.wine/*`, `ORIGIN` Lovable y `SITE_URL`.

## Tareas pendientes

- Confirmar la via canonica de release: Lovable Web Winerim, repo/GitHub o flujo Cloudflare coordinado.
- Reparar o reemplazar el `.git` local antes de commit/push desde esta carpeta, o usar un clon limpio y aplicar el patch con cuidado.
- Ejecutar dry-run Worker solo cuando el controlador autorice el paso de release.
- Revalidar produccion tras publish: humano, Googlebot, `OAI-SearchBot/1.0`, sitemap, canonical, hreflang y ausencia de marcadores internos.
- Hidratar o archivar conscientemente los placeholders no bloqueantes que quedan fuera de `.git`, especialmente migraciones locales de julio y docs historicos.
