# Next Steps

## Hechos

- La base técnica para `de` y `pt` de la biblioteca del vino está implementada.
- El PR `https://github.com/goiko111/seo-migration-master/pull/1` está fusionado en `main`.
- Merge commit: `30e9a95f592ba1c3607c0b385a2711e783bcc525`.
- La rama local está en `main`, alineada con `origin/main`.
- `origin/main` avanzó durante el trabajo, el merge local fue resuelto y posteriormente fusionado.
- Producción todavía no refleja por completo el bloque nuevo en sitemap/prerender:
  - Rutas `de` y `pt` de biblioteca responden 200 como SPA.
  - El sitemap público comprobado no lista aún las nuevas rutas de biblioteca `de`/`pt`.
  - Googlebot en una ficha dinámica cae en `X-Worker-Branch: bot-fallback` y recibe canonical raíz.
- No hay `supabase` ni `wrangler` instalados localmente, ni script de deploy en `package.json`.
- La contradicción de instrucciones del worker quedó corregida: `TECH_INSTRUCTIONS.md` ahora apunta a `cloudflare-worker-v3-hybrid.js`.
- Las comprobaciones posteriores a la resolución pasan:
  - `npm run test`.
  - `npm run build`.
  - ESLint dirigido de biblioteca/i18n.
  - `npx --yes deno-bin check` de `sitemap` y `prerender`.
  - `git diff --check`.
- El lint global sigue teniendo deuda fuera del alcance directo de este bloque.

## Decisiones

- Priorizar ahora despliegue y validación productiva.
- Mantener el seguimiento de mejoras editoriales separado del cierre técnico.
- No mezclar la deuda global de lint con el bloque de biblioteca del vino.
- No dar por válida la indexabilidad productiva hasta ver sitemap y prerender nuevos en producción.

## Hipótesis

- Tras el despliegue, el siguiente impacto SEO vendrá de mejorar contenido propio localizado en entidades prioritarias.
- La cobertura técnica multilingüe ya permite escalar contenido `de` y `pt` sin reabrir la arquitectura base.

## Tareas pendientes

1. Desplegar las funciones Supabase actualizadas:
   - `supabase/functions/sitemap/index.ts`.
   - `supabase/functions/prerender/index.ts`.
2. Desplegar `cloudflare-worker-v3-hybrid.js` en Cloudflare con las rutas de biblioteca `de`/`pt`.
3. Tras desplegar, validar:
   - Sitemap XML y rutas `de`/`pt`.
   - Hreflang recíproco y canonical.
   - Prerender para bots en páginas de biblioteca.
   - Selector de idioma en rutas dinámicas.
   - Páginas prioritarias: uvas, regiones, estilos y maridajes.
4. Separar una tarea para el lint global pendiente.
5. Bloque editorial siguiente:
   - Priorizar 20-30 entidades por tráfico potencial.
   - Reescribir copys propios en `de` y `pt`, no solo overlays genéricos.
   - Añadir FAQs localizadas por intención de búsqueda.
   - Conectar entidades relacionadas con enlaces internos por idioma.
   - Medir indexación y cobertura en Search Console.
