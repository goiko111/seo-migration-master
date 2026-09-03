# Lovable / Cloudflare handoff 2026-07-11

## Actualizacion 2026-07-13

- `www.winerim.wine` corregido en Cloudflare DNS:
  - antes: A `185.158.133.1`, proxied, asociado a proveedor/Lovable;
  - ahora: A `192.0.2.1`, proxied.
- Validacion posterior:
  - `https://www.winerim.wine/` -> `301` a `https://winerim.wine/`;
  - `http://www.winerim.wine/` -> `301` a `https://winerim.wine/`;
  - `https://www.winerim.wine/producto/cloudrim` -> `301` a `https://winerim.wine/producto/cloudrim`;
  - las respuestas incluyen `x-worker-branch: canonical-host-scheme-redirect`.
- `www` queda resuelto salvo que Lovable vuelva a reclamar el custom domain.
- Se anadio `oai-searchbot` a `supabase/functions/prerender/index.ts`; falta desplegar Edge `prerender`.
- Nueva migracion correctiva pendiente:
  - `supabase/migrations/20260713112000_fix_learn_wine_localized_pairing_links.sql`.

## Actualizacion 2026-07-13 previa

- Worker desplegado correctamente:
  - Version ID: `8a6ba97e-4512-4825-bbb3-e42826d67c7b`.
  - Triggers desplegados explicitamente para `winerim.wine/*`, `go.winerim.wine/*` y `www.winerim.wine/*`.
- `OAI-SearchBot/1.0` ya recibe `x-prerendered: true` y `x-worker-branch: worker-static-prerender` en `/producto/cloudrim` y `/producto/savia`.
- `www.winerim.wine` sigue devolviendo `421` sin `x-worker-branch` incluso tras desplegar route Worker. Esto confirma que queda pendiente una capa externa de DNS/custom hostname/Lovable antes del Worker.
- No se pudo desplegar Supabase desde este entorno:
  - `supabase functions deploy` falla por falta de `SUPABASE_ACCESS_TOKEN`.
  - `supabase db push --linked --dry-run` falla porque el proyecto no esta enlazado localmente para CLI.
- Nueva migracion preparada:
  - `supabase/migrations/20260713101000_add_wine_library_substitution_map.sql`.
- Nuevos release gates preparados para 2026-08-10 en:
  - `supabase/functions/prerender/index.ts`;
  - `supabase/functions/sitemap/index.ts`;
  - `cloudflare-worker-v3-hybrid.js`.

## Objetivo

Publicar los cambios pendientes de Lovable/Supabase para blog multidioma, Aprender vino 2026-08-03, Biblioteca del vino 2026-08-10, correccion de enlaces localizados, sitemap/prerender y paridad de `OAI-SearchBot`.

## Hechos verificados

- `https://winerim.wine/blog` responde `200`, pero como humano/no-JS cae en `x-worker-branch: spa`.
- `https://www.winerim.wine/` ya responde `301` al apex con `x-worker-branch: canonical-host-scheme-redirect`.
- `https://winerim.wine/producto/cloudrim` como Googlebot responde `200`, `x-prerendered: true`, `x-worker-branch: worker-static-prerender`.
- `https://winerim.wine/producto/cloudrim` y `/producto/savia` como `OAI-SearchBot/1.0` ya responden `x-prerendered: true` tras el deploy Worker `8a6ba97e-4512-4825-bbb3-e42826d67c7b`.
- El sitemap actual tiene `2371` bloques `<url>` y no contiene el lote futuro `learn-wine-preserve-open-bottle`.

## Cambios de codigo ya preparados

- `src/pages/Blog.tsx`: elimina fallback silencioso a articulos ES y anade empty state localizado.
- `src/pages/ArticlePage.tsx`: elimina fallback silencioso a slug ES y usa 404 localizado/noindex si falta traduccion.
- `src/test/blog-article-language-guardrails.test.ts`: guardrail para fallback ES y `OAI-SearchBot`.
- `supabase/migrations/20260711103000_add_learn_wine_preserve_open_bottle.sql`: lote Aprender vino, seis idiomas, 2026-08-03.
- `supabase/migrations/20260713101000_add_wine_library_substitution_map.sql`: lote Biblioteca del vino, seis idiomas, 2026-08-10.
- `supabase/migrations/20260713112000_fix_learn_wine_localized_pairing_links.sql`: correccion DE/PT y URLs localizadas ya publicadas.
- `supabase/functions/prerender/index.ts`: release gates para Aprender vino 2026-08-03.
- `supabase/functions/sitemap/index.ts`: release gates para Aprender vino 2026-08-03.
- `cloudflare-worker-v3-hybrid.js`: `OAI-SearchBot` en `BOT_REGEX` y release gates 2026-08-03.
- `wrangler.winerim.toml`: reconstruido con routes explicitas:
  - `winerim.wine/*`;
  - `go.winerim.wine/*`;
  - `www.winerim.wine/*`.
- `package.json`: `deploy:worker` y `deploy:worker:dry-run` usan `--config wrangler.winerim.toml`.

## Para Lovable Cloud

1. Aplicar migracion:
   - `supabase/migrations/20260711103000_add_learn_wine_preserve_open_bottle.sql`
   - `supabase/migrations/20260713101000_add_wine_library_substitution_map.sql`
   - `supabase/migrations/20260713112000_fix_learn_wine_localized_pairing_links.sql`
2. Publicar frontend.
3. Desplegar Edge Functions:
   - `sitemap`;
   - `prerender`.

## Para Cloudflare Worker

El Worker ya fue desplegado el 2026-07-13. Repetir solo si se cambia `cloudflare-worker-v3-hybrid.js` o `wrangler.winerim.toml`.

1. Ejecutar dry-run:

```bash
npm run deploy:worker:dry-run
```

2. Si el dry-run muestra bindings y routes correctos, desplegar:

```bash
npm run deploy:worker
```

## Para `www.winerim.wine`

Resuelto en Cloudflare DNS. Mantener:

- A `www.winerim.wine` -> `192.0.2.1`;
- Proxy status: `Proxied`;
- TTL: `Auto`.

No volver a asociar `www` como custom domain Lovable. La canonicalizacion la hace el Worker.

## QA post-publicacion

1. `curl -I https://www.winerim.wine/` debe devolver `301` hacia apex con `x-worker-branch: canonical-host-scheme-redirect`.
2. `curl -A 'OAI-SearchBot/1.0' -I https://winerim.wine/` debe devolver prerender tras desplegar Edge `prerender`.
3. `/blog`, `/en/blog`, `/it/blog`, `/fr/blog`, `/de/blog`, `/pt/blog` no deben mostrar articulos ES como fallback si falta contenido.
4. Una ruta de articulo localizada inexistente debe devolver 404/noindex, no contenido ES.
5. `sitemap.xml` no debe listar las URLs de `learn-wine-preserve-open-bottle` antes del 2026-08-03.
6. `llms.txt` y `llms-full.txt` no deben listar ese lote futuro antes de publicarse.
