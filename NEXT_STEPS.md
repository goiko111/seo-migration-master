# Next Steps

## Hechos

- La base técnica para `de` y `pt` de la biblioteca del vino está implementada.
- El PR `https://github.com/goiko111/seo-migration-master/pull/1` está abierto desde `codex/wine-library-de-pt` hacia `main`.
- `origin/main` avanzó y el merge local ya fue resuelto.
- Las comprobaciones posteriores a la resolución pasan:
  - `npm run test`.
  - `npm run build`.
  - ESLint dirigido de biblioteca/i18n.
  - `npx --yes deno-bin check` de `sitemap` y `prerender`.
  - `git diff --check`.
- El lint global sigue teniendo deuda fuera del alcance directo de este bloque.

## Decisiones

- Priorizar ahora commit, push y merge del PR.
- Mantener el seguimiento de mejoras editoriales separado del cierre técnico.
- No mezclar la deuda global de lint con el bloque de biblioteca del vino.

## Hipótesis

- Tras el merge, el siguiente impacto SEO vendrá de mejorar contenido propio localizado en entidades prioritarias.
- La cobertura técnica multilingüe ya permite escalar contenido `de` y `pt` sin reabrir la arquitectura base.

## Tareas pendientes

1. Hacer commit de la resolución de merge.
2. Subir `codex/wine-library-de-pt` a `origin`.
3. Reintentar el merge del PR.
4. Tras desplegar, validar:
   - Sitemap XML y rutas `de`/`pt`.
   - Hreflang recíproco y canonical.
   - Prerender para bots en páginas de biblioteca.
   - Selector de idioma en rutas dinámicas.
   - Páginas prioritarias: uvas, regiones, estilos y maridajes.
5. Bloque editorial siguiente:
   - Priorizar 20-30 entidades por tráfico potencial.
   - Reescribir copys propios en `de` y `pt`, no solo overlays genéricos.
   - Añadir FAQs localizadas por intención de búsqueda.
   - Conectar entidades relacionadas con enlaces internos por idioma.
   - Medir indexación y cobertura en Search Console.
