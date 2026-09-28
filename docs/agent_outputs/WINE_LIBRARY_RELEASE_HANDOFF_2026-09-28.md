# Biblioteca del vino - release handoff

Fecha: 2026-09-28

Estado: candidato local completo, validado y no publicado.

## Hechos

- Fuente aislada: rama `codex/winerim-wine-library-complete-20260928`, basada en
  `8879ef49`.
- No se ha modificado produccion, no se han aplicado migraciones remotas y no se han
  usado creditos de Lovable.
- Se incorporan a la cadena canonica seis lotes editoriales publicables en ES, EN, IT,
  FR, DE y PT. El lote del 2026-09-21 permanece congelado para no competir con el blog
  comercial del 2026-09-28.
- Sitemap, prerender y Worker comparten los mismos slugs y fechas de salida.
- Blog y detalle de articulo ya no sustituyen contenido internacional inexistente por
  una fila espanola.
- Los comentarios internos se eliminan tanto en la migracion de datos como antes del
  render Markdown.
- El Worker conserva el estado HTTP del prerender. Un articulo ausente devuelve `404`,
  `X-Robots-Tag: noindex, follow` y diagnostico de upstream, no un `200` aparente.
- El shell HTML humano recibe idioma, title, description, canonical y Open Graph acordes
  a Biblioteca, Aprender vino, Blog y articulos antes de hidratar React.

## Archivos principales

- `src/components/SEOHead.tsx`, `src/seo/config.ts` y `public/og/`: metadatos y activos
  sociales por idioma.
- `src/pages/Blog.tsx` y `src/pages/ArticlePage.tsx`: eliminacion de fallbacks ES.
- `src/components/article/parseMarkdownSections.ts`: saneado defensivo de marcadores.
- `src/pages/SimuladorCarta.tsx`: alternates completos para las seis rutas.
- `src/data/wineLibraryI18n.ts`: forma alemana correcta `Weinbibliothek`.
- `cloudflare-worker-v3-hybrid.js`: gates completos, shell localizado y estado HTTP real.
- `supabase/functions/prerender/index.ts` y `supabase/functions/sitemap/index.ts`: gates
  hasta 2026-09-28 y nombres de entidades localizados sin depender de mayusculas.
- `supabase/migrations/20260713112000` a `20260811153500`: lotes, enlaces y saneado
  recuperados para la cadena canonica.
- `scripts/validate-wine-library-release.mjs`: gate reproducible con
  `npm run validate:wine-library`.

## Validaciones

- `npm run validate:wine-library`: OK.
- `npm test`: 23 archivos, 206 pruebas, todas OK.
- `npx tsc --noEmit`: OK.
- `npm run build`: OK.
- ESLint focal de todos los archivos frontend modificados: OK.
- ESLint global: falla por 112 errores preexistentes fuera de este alcance; el unico
  aviso introducido en `ArticlePage` se corrigio.
- `node --check` para Worker, router y validador: OK.
- `deno check` para `prerender` y `sitemap`: OK con Deno 2.2.7.
- `wrangler deploy --dry-run`: OK, paquete de 205.09 KiB / 56.72 KiB gzip.
- Playwright: 12 combinaciones del hub de Biblioteca, seis idiomas por dos viewports,
  con canonical propio, siete alternates, idioma correcto, cero overflow y cero errores
  de consola.
- Playwright adicional: detalle DE/PT, simulador EN, blog EN y 404 de articulo EN,
  sin marcadores visibles ni desbordamiento.
- Miniflare: HTML humano DE sale con `lang=de`, title localizado y canonical propio;
  prerender simulado ausente conserva `404` y `noindex` al atravesar el Worker.

Capturas: `docs/agent_outputs/qa-2026-09-28/`.

## Contradicciones

- Produccion ya contiene tres lotes de agosto, pero sus migraciones faltaban en esta
  fuente Git. Se recuperaron sin asumir que deban ejecutarse de nuevo remotamente.
- El navegador local usa `noindex, nofollow` por diseno de `SEOHead`; produccion cambia
  a `index, follow`. No es un defecto del candidato.
- La raiz del repositorio mantiene deuda global de lint y dependencias con avisos de
  auditoria. No se mezclan en este release editorial.

## Gate de produccion

Requiere autorizacion explicita y una ventana coordinada. Orden recomendado:

1. Consultar el historial remoto de migraciones y las filas por `article_group`.
2. Aplicar solo las migraciones ausentes, en orden cronologico.
3. Desplegar `sitemap` y `prerender` desde esta misma revision.
4. Publicar el frontend/origen desde esta misma revision, sin reconstruccion manual en
   Lovable.
5. Desplegar el Worker y purgar solo las rutas afectadas.
6. Verificar humano, Googlebot y OAI en las seis variantes, sitemap, legales y home.
7. Solo con todo verde, inspeccionar URLs representativas en Search Console; no solicitar
   indexacion masiva.

Rollback: conservar las versiones previas de Pages, Worker y Edge Functions; las
migraciones son `UPSERT` data-only, por lo que cualquier rollback editorial debe hacerse
con una migracion compensatoria, nunca borrando a mano sin snapshot.

## Pendientes

- Autorizacion de release y comprobacion remota de migraciones ya ejecutadas.
- Publicacion coordinada y QA productiva.
- Deuda global de lint, actualizacion de Wrangler y auditoria de dependencias como
  bloques independientes.
