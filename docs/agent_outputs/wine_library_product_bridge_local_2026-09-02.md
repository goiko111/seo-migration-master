# Wine Library Product Bridge Local Block - 2026-09-02

## Hechos

- Trabajo local realizado en `/Users/GOIKO/codex-workspaces/seo-migration-master-i18n-seo-og-clean2-20260901`, rama `codex/winerim-i18n-seo-og-clean2-20260901`, sin push, publish, deploy, Lovable ni Search Console.
- Se añadió copy multidioma ES/EN/FR/IT/DE/PT para un puente Biblioteca -> producto en `src/data/wineLibraryI18n.ts`.
- El hub `src/pages/BibliotecaVino.tsx` renderiza el puente con enlaces localizados a Winerim Core, CloudRIM, SAVia y Winerim Supply mediante `localePath(item.href)`.
- Se sustituyó el texto fijo `denominaciones` del preview de países por `ui.stats.denominations`.
- Se corrigieron enlaces internos no localizados a Winerim Core en `src/pages/GrapeDetail.tsx` y `src/pages/RegionDetail.tsx`.
- Se añadió `sanitizeMarkdownBody` en `src/components/article/parseMarkdownSections.ts` y `src/pages/ArticlePage.tsx` usa el cuerpo saneado para secciones, word count, herramientas y relacionados.
- Se añadió `src/test/wine-library-product-bridge.test.ts` y se amplió `src/test/article-content-quality.test.ts`.
- Consulta pública a Supabase `public.articles` el 2026-09-02 08:33 CEST: `0` filas con `winerim-content-expansion`, `@secret:` o `TELEGRAM_BOT_TOKEN` en `body`.
- QA HTTP read-only el 2026-09-02 08:33 CEST:
  - `https://winerim.wine/sitemap.xml` contiene `/precios-modulos-integraciones` y las rutas canonicas del simulador.
  - `https://winerim.wine/precios-modulos-integraciones` con Googlebot devuelve title/canonical propios.
  - `https://winerim.wine/en/wine-list-simulator` con Googlebot devuelve title/canonical EN propios.
  - Edge directa Supabase `sitemap` no contiene `/precios-modulos-integraciones` ni las rutas canonicas del simulador.
  - Edge directa Supabase `prerender?path=/precios-modulos-integraciones` con Googlebot devuelve fallback de home y canonical `https://winerim.wine`.

## Decisiones

- Lovable no necesita limpieza data-only de artículos ahora porque la tabla pública ya no muestra marcadores en `body`; si reaparecen, la limpieza debe ser data-only y con conteo de filas afectadas.
- El prompt necesario para Lovable queda limitado a desplegar correctamente Supabase Edge Functions `sitemap` y `prerender`; no debe tocar frontend, migraciones, Cloudflare, Pages, DNS, `llms`, Blog, Aprender vino ni Biblioteca.
- El puente Biblioteca -> producto incluye solo productos públicos y claramente conectados al flujo de restaurante: Winerim Core, CloudRIM, SAVia y Winerim Supply.
- Cellaria, Matchrim, Spiritsrim, FoodRim, CRM y voz quedan fuera de este bloque por falta de ruta pública/copy canonico dentro de Biblioteca o por pertenecer a otra línea de producto.

## Hipótesis

- El saneado frontend evitará que comentarios HTML internos vuelvan a mostrarse en artículos tras el próximo release frontend, aunque una fila antigua contenga comentarios.
- El puente producto mejorará la transición desde búsquedas informativas de Biblioteca a intención comercial sin contaminar fichas con claims no documentados.
- La producción pública está compensada por Cloudflare, pero Search Console puede seguir encontrando incoherencias si Google accede o compara señales generadas por Edge directa Supabase desactualizada.

## Contradicciones

- Lovable comunicó que había desplegado `sitemap`/`prerender`, pero la comprobación directa de Supabase el 2026-09-02 08:33 CEST sigue devolviendo sitemap sin las rutas nuevas y prerender fallback de home para `/precios-modulos-integraciones`.
- La rama PR #3 sigue en HEAD remoto `1024e5e`, pero este bloque añade cambios locales sin commit/push encima de esa base.
- `DECISIONS_LOG.md` en `/Users/GOIKO/Documents/Playground/seo-migration-master` sigue con `size=275527`, `blocks=0`, flags `compressed,dataless`; `sed`, `head` y `file` no devuelven contenido real. No se actualizó para no perder el histórico lógico.

## Validaciones

- `npx tsc --noEmit --pretty false`: verde.
- `npm test -- --run src/test/article-content-quality.test.ts src/test/wine-library-i18n.test.ts src/test/wine-library-links.test.ts src/test/wine-library-product-bridge.test.ts src/test/grape-detail-render.test.tsx src/test/wine-library-seo-surface.test.ts --reporter=dot`: `54/54` verde.
- `npm test -- --run --reporter=dot`: `160/160` verde, sin cuelgue; warnings preexistentes de React Router y key en `Precios.tsx`.
- `npm run build`: verde; warnings preexistentes de Browserslist y chunks grandes.
- `npx eslint` focal sobre archivos tocados: verde.
- `git diff --check`: verde.
- Python Playwright no disponible (`ModuleNotFoundError: No module named 'playwright'`); no se instalaron dependencias nuevas.

## Prompt mínimo para Lovable

```text
El deploy Edge sigue desalineado. El 2026-09-02 08:33 CEST, la Edge directa de Supabase sitemap NO contiene /precios-modulos-integraciones ni las rutas canonicas del simulador, y prerender?path=/precios-modulos-integraciones con Googlebot devuelve fallback de home/canonical https://winerim.wine. Usa PR #3 / rama codex/winerim-i18n-seo-og-clean2-20260901 / commit 1024e5e. Despliega SOLO Supabase Edge Functions sitemap y prerender desde ese código. No frontend, no migraciones, no datos de articles, no llms, no Biblioteca/Blog/Aprender vino, no rediseño, no Cloudflare/Pages/DNS. Devuélveme confirmación de deploy y revisión: sitemap Edge contiene /precios-modulos-integraciones y /simulador-carta, /en/wine-list-simulator, /it/simulatore-carta, /fr/simulateur-carte, /de/weinkarten-simulator, /pt/simulador-carta; prerender Edge con Googlebot devuelve 200 con canonical propio para /precios-modulos-integraciones y esas seis rutas.
```

## Tareas pendientes

- Enviar el prompt mínimo a Lovable y revalidar Edge directa Supabase.
- Después de Edge verde, pasar Search Console limitada al grupo ya corregido en la capa pública.
- Decidir si los cambios locales Biblioteca/blog sanitizer se commitean y publican en un release frontend separado.
- Resolver el warning preexistente de key en `Precios.tsx` y la deuda de `npm run lint` global en otro bloque.
- Recuperar o rehidratar `DECISIONS_LOG.md` antes de intentar nuevas actualizaciones de ese archivo.
