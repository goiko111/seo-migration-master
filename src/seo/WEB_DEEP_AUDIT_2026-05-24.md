# Web Deep Audit - 2026-05-24

## Hechos

- Se audito produccion con user-agent normal, Googlebot, sitemap completo y Lighthouse mobile.
- `https://winerim.wine/sitemap.xml` contiene 2.431 URLs despues del saneamiento anterior y todas las URLs auditadas respondian HTTP 200.
- Googlebot recibe prerender correcto en home, `/clientes`, `/biblioteca-vino`, `/en/pricing`, `/de/preise`, `/pt/precos`, `/software-carta-de-vinos`, `/recursos` y `/benchmarks-playbooks`.
- Quedan 122 URLs programaticas de ciudad en `bot-fallback`, sobre todo familias `wine-list-software-*` y `software-carta-de-vinos-*`.
- Las paginas legales localizadas estaban en sitemap y para Googlebot devolvian contenido/canonical de home, por ejemplo `/en/privacy`.
- Se detectaron 89 articulos con meta description corta, especialmente traducciones con sufijos `_en`, `_de`, `_pt`, `_fr` e `_it`.
- Lighthouse mobile en home:
  - Performance 58, Accessibility 96, Best Practices 71, SEO 92.
  - LCP 12,9 s, FCP 6,6 s, TBT 90 ms, CLS 0.
  - Ahorro estimado: 416 KiB de JavaScript no usado, 235 KiB de imagenes responsivas, 110 ms de recursos bloqueantes.
- Lighthouse mobile en `/clientes`:
  - Performance 57, Accessibility 93, Best Practices 71, SEO 92.
  - LCP 12,1 s, FCP 7,4 s, TBT 120 ms, CLS 0.
  - Ahorro estimado: 416 KiB de JavaScript no usado, 927 KiB de imagenes responsivas.
  - DOM grande: 2.177 elementos.
- Lighthouse detecto un 404 de red en `https://winerim.wine/~api/analytics`.
- Lighthouse detecto un 404 de logo en `/clientes` causado por assets con espacios en el nombre generado, por ejemplo `Mabe%20Jamoneria-*.png`.
- El servidor inicial responde razonablemente rapido: Lighthouse midio 310 ms en el documento raiz.
- La arquitectura sigue teniendo una deuda de consistencia: `src/seo/route-map.ts` no refleja aun todo el estado multilingue `de`/`pt` ni debe tratarse como fuente unica real frente a `ROUTE_MAP`/prerender/sitemap.

## Decisiones

- Las paginas legales deben seguir disponibles y enlazadas, pero no enviarse al sitemap ni tratarse como landing organica.
- Las paginas legales pasan a `noindex, follow` tanto en frontend como en Worker/prerender.
- Las familias programaticas de ciudad sin prerender especifico salen del sitemap hasta que tengan contenido, canonical y H1 propios.
- No se deben enviar a Google URLs que hoy caen en HTML generico de SPA para bots.
- Los nombres de assets publicos de logos deben evitar espacios y caracteres especiales para no generar 404 en produccion.

## Hipotesis

- El cuello de botella principal de rendimiento no es TTFB, sino JS inicial, imagenes dimensionadas de forma poco eficiente y exceso de nodos en paginas densas como `/clientes`.
- Search Console deberia reducir ruido cuando se publique el sitemap sin legales ni city pages fallback y se reenvie `/sitemap.xml`.
- El 404 `~api/analytics` puede venir de una integracion de analytics de Lovable/origen; conviene resolverlo o desactivarlo para limpiar Best Practices y consola.
- Las paginas de ciudad pueden ser valiosas si se convierten en landings reales por mercado, pero hoy son mas riesgo de thin/duplicate content que oportunidad.
- El SEO tecnico de la biblioteca del vino esta mucho mejor que el de las familias legacy/programaticas, pero la profundidad editorial sigue siendo la palanca de crecimiento.

## Cambios implementados en repo

- `supabase/functions/sitemap/index.ts`
  - Excluye `/privacidad` y `/terminos` del sitemap multilingue.
  - Excluye familias city/programmatic sin prerender real: `software-carta-de-vinos-*`, `software-vino-*`, `wine-list-software-*`, `software-carta-dei-vini-*`, `logiciel-carte-des-vins-*`, `weinkarten-software-*`, `software-carta-vinhos-*` y `software-carta-de-vinhos-*`.
- `supabase/functions/prerender/index.ts`
  - Añade soporte `robots` a `PageMeta`.
  - Renderiza paginas legales exactas en `es`, `en`, `it`, `fr`, `de` y `pt` con canonical propio y `noindex, follow`.
- `cloudflare-worker-v3-hybrid.js`
  - Añade rutas legales a `NOINDEX_ROUTES` para emitir `X-Robots-Tag: noindex, follow`.
- `src/pages/Privacidad.tsx` y `src/pages/Terminos.tsx`
  - Marcan las paginas legales con `noindex`.
- `src/components/SEOHead.tsx`
  - Cambia el comportamiento de `noindex` explicito a `noindex, follow`; staging sigue en `noindex, nofollow`.
- Logos:
  - Se sanearon nombres de archivo de logos con espacios/caracteres especiales.
  - `src/components/LogoStrip.tsx` actualiza el import de `em-hotels.png`.

## Tareas pendientes

- Publicar desde Lovable frontend y Edge Functions `sitemap`/`prerender`.
- Desplegar Cloudflare Worker para activar `X-Robots-Tag` legal.
- Revalidar en produccion:
  - `/sitemap.xml` ya no debe listar legales ni city pages fallback.
  - Googlebot en `/en/privacy` debe recibir `Privacy Policy`, canonical `/en/privacy` y `noindex, follow`.
  - Googlebot en `/wine-list-software-bradford` no debe estar enviado por sitemap; decidir despues si se convierte en landing real o se redirige/noindexa.
  - `/clientes` no debe generar 404 de logos con nombres con espacios.
- Resolver el 404 `~api/analytics` o desactivar esa llamada.
- Reducir LCP movil:
  - Revisar hero de home y preload de recursos criticos.
  - Rebajar JS inicial y mover dependencias pesadas fuera del primer render.
  - Aplicar `srcset/sizes` o variantes responsive a logos/imagenes, especialmente `/clientes`.
  - Considerar paginacion, virtualizacion o carga progresiva en la galeria de 589 logos.
- Completar descriptions de articulos internacionales cortos.
- Decidir destino final de las city pages: contenido real por ciudad/mercado, redirect a landing pais/idioma o `noindex`.
- Unificar `src/seo/route-map.ts` con el mapa real `de`/`pt` o documentarlo como referencia historica para evitar contradicciones futuras.
