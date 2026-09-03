# Coordinacion editorial Winerim 2026-07-11

## Hechos

- Se trabajaron cuatro frentes en paralelo:
  - Prioridad 1: SEO tecnico, Search Console indirecto, sitemap, llms, prerender, canonicals, hreflang y `www`.
  - Biblioteca del vino: propuesta next-level para ampliar la biblioteca como grafo operativo.
  - Aprender vino: lote completo de seis idiomas sobre conservacion de botellas abiertas.
  - Blog editorial: auditoria de cadencia, fallbacks de idioma y calendario semanal.
- Prioridad 1 confirmo que `https://www.winerim.wine/` sigue devolviendo `421 Project not found`.
- Prioridad 1 confirmo que Googlebot, Bingbot, GPTBot, ChatGPT-User, ClaudeBot y PerplexityBot reciben prerender correcto en rutas principales, pero `OAI-SearchBot/1.0` caia a SPA shell.
- Se anadio `oai-searchbot` al `BOT_REGEX` del Worker.
- El blog tenia fallback silencioso a ES en `Blog.tsx` si no encontraba articulos en el idioma activo.
- El detalle de articulo tenia fallback silencioso a slug ES en `ArticlePage.tsx`.
- Se elimino el fallback ES silencioso en blog y articulo, y se anadio empty state localizado.
- Se creo guardrail `src/test/blog-article-language-guardrails.test.ts`.
- Aprender vino genero migracion data-only:
  - `supabase/migrations/20260711103000_add_learn_wine_preserve_open_bottle.sql`.
  - `article_group`: `learn-wine-preserve-open-bottle`.
  - Fecha: 2026-08-03 con offsets ES/EN/IT/FR/DE/PT.
- Se anadieron release gates del lote de Aprender vino en:
  - `supabase/functions/prerender/index.ts`;
  - `supabase/functions/sitemap/index.ts`;
  - `cloudflare-worker-v3-hybrid.js`.
- Biblioteca del vino genero propuesta, no migracion aplicable completa:
  - `docs/agent_outputs/wine_library_next_level_batch_proposal_2026-07-11.md`.
- Blog editorial genero auditoria y guardrails SQL:
  - `docs/agent_outputs/winerim_blog_editorial_audit_2026-07-11.md`;
  - `docs/agent_outputs/winerim_blog_editorial_guardrails_2026-07-11.sql`.

## Decisiones

- No se mantiene ningun fallback silencioso a contenido ES en rutas internacionales de blog/articulo.
- Si falta contenido en un idioma, la pagina debe mostrar empty state localizado o 404 localizado/noindex, no contenido en otro idioma.
- El siguiente lote completo aplicable sera Aprender vino sobre conservacion de botellas abiertas, programado para el lunes 2026-08-03.
- Biblioteca del vino debe continuar, pero su propuesta de 2026-08-03 se reprogramara para no pisar el lote de Aprender vino.
- Las URLs futuras no deben entrar en `llms.txt` ni `llms-full.txt` antes de su fecha de publicacion real.
- `www.winerim.wine` se considera problema de DNS/routing/certificado/custom domain antes del Worker, porque el Worker ya contiene redireccion canonica pero la peticion no llega a esa rama.

## Hipotesis

- Quitar fallbacks ES reducira el salto al espanol que el usuario ve especialmente en blog.
- Anadir `OAI-SearchBot` mejora la paridad humano/bot para crawlers de OpenAI, siempre que el Worker se despliegue.
- La cadencia semanal debe ser un solo tema editorial por lunes, con seis idiomas y offsets, para evitar oleadas masivas y mezclas de intencion.

## Contradicciones detectadas

- Tres frentes propusieron contenido para el lunes 2026-08-03:
  - Aprender vino: `learn-wine-preserve-open-bottle`, migracion completa.
  - Blog editorial: `learn-wine-service-temperature-restaurant`, propuesta de calendario.
  - Biblioteca del vino: `wine-library-substitution-map-restaurant`, propuesta de calendario.
- Resolucion operativa: mantener 2026-08-03 para Aprender vino porque ya hay contenido completo; reprogramar Biblioteca/Blog antes de crear migraciones.
- `CURRENT_STATE.md` estaba como archivo sparse/empty: tenia tamano en disco aparente pero `wc -l` devolvia 0. Se reescribe como fuente de verdad legible.

## Tareas pendientes

- Aplicar la migracion `20260711103000_add_learn_wine_preserve_open_bottle.sql` en Lovable Cloud.
- Publicar frontend, Edge `sitemap`, Edge `prerender` y Worker.
- Revalidar que las URLs de 2026-08-03 no aparecen antes de fecha en sitemap/llms/prerender.
- Revalidar tras deploy Worker que `OAI-SearchBot/1.0` recibe prerender.
- Resolver `www.winerim.wine` en Cloudflare/Lovable custom domains.
- Convertir la propuesta Biblioteca en migraciones completas de seis idiomas, con calendario no conflictivo.
- Redactar lote de blog semanal largo y adaptado por idioma, con calendario posterior al lote de Aprender.
