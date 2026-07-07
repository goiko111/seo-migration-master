# Next Steps

## Actualizacion 2026-07-07: siguiente retoma tras agentes i18n/SEO/editorial

## Hechos

- Localmente queda preparada la tanda DE/PT/SEO/editorial:
  - 12 herramientas online alineadas en React, Worker, Edge `prerender`, Edge `sitemap` y guardrails;
  - traduccion profunda DE/PT aplicada en herramientas principales;
  - `Hoteles` y `GruposRestauracion` sin fallback masivo a EN para DE/PT;
  - lote Biblioteca del vino `2026-07-20` preparado;
  - lote Aprender vino `2026-07-27` preparado.
- Validaciones locales pasadas:
  - `npm run test -- --run src/test/wine-library-seo-surface.test.ts src/test/de-pt-seo-guardrails.test.tsx src/test/seo-head-i18n.test.tsx`;
  - `npx tsc --noEmit --pretty false`;
  - `npx eslint` focal;
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`;
  - `node --check cloudflare-worker-v3-hybrid.js`;
  - `npm run build`.

## Prioridad 1: despliegue coordinado

1. Commit/push de la tanda actual.
2. Desplegar Worker `winerim-proxy` desde Codex si el login Cloudflare esta disponible.
3. En Lovable Cloud, aplicar migraciones:
   - `supabase/migrations/20260707103000_add_wine_library_by_the_glass_stock_rotation.sql`;
   - `supabase/migrations/20260707090000_add_learn_wine_read_label_restaurant.sql`.
4. En Lovable Cloud, publicar frontend y Edge Functions:
   - `supabase/functions/sitemap/index.ts`;
   - `supabase/functions/prerender/index.ts`.

## Prioridad 2: revalidacion produccion

1. Como Googlebot, validar que ya no caen a home espanola:
   - `/de/tools/glaspreis-rechner`;
   - `/pt/ferramentas/calculadora-preco-vinho-por-copo`;
   - `/de/tools/durchschnittsbon-rechner`;
   - `/pt/ferramentas/calculadora-ticket-medio`;
   - `/de/tools/multi-standort-auditor`;
   - `/pt/ferramentas/auditor-carta-multilocal`.
2. Revalidar `https://winerim.wine/sitemap.xml`:
   - 12 familias de herramientas con alternates DE/PT;
   - 0 URLs futuras no liberadas.
3. Revalidar Edge directa `sitemap` y `prerender` tras publish Lovable.
4. Revalidar `llms.txt` y `llms-full.txt` sin URLs de los lotes `2026-07-20` y `2026-07-27` hasta su fecha.

## Prioridad 3: continuar contenido

1. Cuando produccion este validada, seguir con Biblioteca del vino:
   - mas entidades por uva/region/estilo/maridaje;
   - enlazado interno desde herramientas y articulos.
2. Seguir con Aprender vino:
   - guias para sala, lectura de etiqueta, maridaje operativo y venta por perfil de cliente.
3. Mantener cadencia semanal y pais/idioma adaptado, sin mezclar hubs de Biblioteca con guias de Aprender.

## Prioridad 4: deuda separada

1. Resolver warning preexistente de keys en `Precios`.
2. Revalidar footer legal sin parche Worker cuando Lovable publique el bundle correcto.
3. Resolver `https://www.winerim.wine/` `421` con Cloudflare/Lovable.

## Actualizacion 2026-07-06: URLs legales cerradas

## Hechos

- `https://winerim.wine/politica-privacidad` y `https://winerim.wine/terminos-y-condiciones-del-contrato` funcionan en produccion.
- Ambas rutas devuelven `200`, canonical propio, `noindex, follow` y contenido legal.
- El footer visible de la home ya enlaza a las dos slugs largas.
- Worker publicado: `8b257e6a-c8c4-4814-8e94-29b7597702ac`.
- Commits en `main`:
  - `606f2cd fix: serve legal pages from worker fallback`;
  - `0ffb13d fix: patch legal footer links at edge`.

## Prioridad 1: seguimiento legal/footer

1. Tras el siguiente publish Lovable, comprobar si el bundle React ya sirve las slugs largas sin depender del parche Worker.
2. Mantener los redirects legacy activos:
   - `/privacy-policy`;
   - `/terms-of-service`;
   - `/condiciones-de-servicio-2`.
3. No incluir estas paginas en sitemap organico; mantener `noindex, follow`.

## Prioridad 2: retomar trabajo principal pendiente

1. Completar traduccion profunda de herramientas online.
2. Corregir DE/PT en `Hoteles` y `GruposRestauracion`.
3. Retomar Biblioteca del vino y Aprender vino una vez cerrada la paridad i18n prioritaria.

## Actualizacion 2026-07-06: retomar lote DE/PT tras primer corte local

## Hechos

- Edge Functions ya no exponen URLs futuras en `sitemap`:
  - publico: `2333` URLs, `0` futuras;
  - Edge directa: `2302` URLs, `0` futuras.
- Local queda preparado con primer lote DE/PT/canonicals/hreflang:
  - home, contacto, precios, demo y gracias localizados;
  - formularios compartidos DE/PT;
  - secciones home compartidas DE/PT;
  - hub de herramientas DE/PT;
  - herramientas principales con canonical/hreflang/H1 localizado;
  - Edge `prerender` y `sitemap` actualizados para DE/PT y herramientas multilingues.
- Validaciones locales OK:
  - `npx tsc --noEmit --pretty false`;
  - `npm run test -- --run src/test/wine-library-seo-surface.test.ts`;
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`;
  - `git diff --check`;
  - `npm run build`;
  - Chrome local en rutas DE/PT.
- Produccion aun requiere publish de este lote; hasta entonces `curl` humano ve shell/canonical raiz en rutas DE/PT.
- Cambio ajeno a preservar: `src/components/WineListAnalyzerTool.tsx`.

## Prioridad 1: publicar y revalidar lote DE/PT

1. Publicar frontend en Lovable.
2. Publicar Edge Functions `sitemap` y `prerender` si Lovable no las publica junto al frontend.
3. Revalidar produccion:
   - `/de` canonical `https://winerim.wine/de`, `7` hreflang, H1 aleman;
   - `/pt` canonical `https://winerim.wine/pt`, `7` hreflang, H1 portugues;
   - `/de/kontakt`, `/pt/contacto`, `/de/preise`, `/pt/precos`;
   - `/de/tools/margenverlust-rechner`;
   - `/pt/ferramentas/comparador-distribuidores`;
   - `/de/danke?tipo=demo`, `/pt/obrigado?tipo=demo` noindex y sin 404.
4. Revalidar `https://winerim.wine/sitemap.xml` y Edge directa:
   - herramientas localizadas incluidas;
   - `0` URLs futuras;
   - alternates consistentes.

## Prioridad 2: completar paridad humana en herramientas

1. Traducir completamente el cuerpo de:
   - `src/pages/CalculadoraFugaMargen.tsx`;
   - `src/pages/ComparadorDistribuidores.tsx`;
   - `src/pages/SimuladorSenalMargenes.tsx`;
   - `src/pages/TestPerfilRim.tsx`;
   - `src/pages/SimuladorParetoCarta.tsx`.
2. Revisar labels de inputs, resultados, FAQ, CTA, internal links y ejemplos de vinos.
3. Crear guardrail local para detectar frases ES visibles en `/de/tools/*` y `/pt/ferramentas/*`.

## Prioridad 3: corregir paginas de negocio DE/PT

1. `src/pages/Hoteles.tsx`:
   - eliminar fallback masivo a EN para DE/PT;
   - localizar bloque final e internal links.
2. `src/pages/GruposRestauracion.tsx`:
   - eliminar fallback masivo a EN para DE/PT;
   - localizar bloques visibles e internal links hacia Core/Supply.

## Prioridad 4: retomar contenido

1. Una vez estable i18n, retomar Biblioteca del vino:
   - lote `wine-library-by-the-glass-stock-rotation` para 2026-07-20.
2. Retomar Aprender vino:
   - lote `learn-wine-read-label-restaurant` para 2026-07-27.
3. Mantener regla: no publicar contenido futuro antes de `published_at` en hub, sitemap, prerender, Worker ni `llms`.

## Actualizacion 2026-07-06: retomar tras revalidacion sitemap/prerender e idiomas

## Hechos

- La migracion correctiva `20260705081417_harden_articles_editorial_permissions.sql` y el publish frontend/Edge/Worker fueron confirmados por el usuario como hechos.
- Produccion esta parcialmente correcta:
  - hubs `Aprender vino` en 6 idiomas: OK;
  - `llms.txt` y `llms-full.txt`: OK;
  - sitemap/prerender de articulos futuros: NO OK.
- Las 6 URLs futuras del grupo `learn-wine-recommend-by-style` (`2026-07-13`) siguen apareciendo en sitemap y respondiendo `200` como Googlebot antes de fecha.
- El hotfix local prepara:
  - bloqueo de articulos futuros en `prerender`;
  - limpieza de URLs futuras en `sitemap`;
  - `404/noindex` de Worker para rutas futuras directas;
  - `hreflang` de articulos por `article_group` en sitemap.
- Hotfix pusheado:
  - `0c372cd fix: harden editorial article release gating`.
- Worker desplegado:
  - `winerim-proxy` Version ID `1b93b814-2ce0-4b88-b920-d882c70515d6`.
- Estado productivo tras Worker:
  - sitemap publico: `2336` URLs, `0` URLs futuras del 2026-07-13;
  - las 6 URLs futuras devuelven `404/noindex`;
  - hubs y `llms` siguen limpios.
- Bloqueo pendiente:
  - Edge Functions directas no se pudieron desplegar por CLI porque falta `SUPABASE_ACCESS_TOKEN`;
  - Edge directa `sitemap` aun contiene `6` URLs futuras hasta que Lovable publique `sitemap`/`prerender`.
- La prioridad fuerte de idiomas queda confirmada: DE/PT, canonicals, hreflang y paridad humano/bot antes de ampliar mas contenido.
- `src/components/WineListAnalyzerTool.tsx` sigue siendo cambio ajeno/preexistente y debe quedar fuera salvo orden explicita.

## Prioridad 1: publicar y revalidar hotfix SEO editorial

1. En Lovable Cloud, publicar Edge Functions:
   - `supabase/functions/sitemap/index.ts`;
   - `supabase/functions/prerender/index.ts`.
2. Revalidar Edge directa y produccion:
   - `https://pwkqbcgjrhoyxrsmcypw.supabase.co/functions/v1/sitemap` no debe contener:
     - `/article/recomendar-vino-por-estilos-restaurante`;
     - `/en/article/recommend-wine-by-style-restaurant`;
     - `/it/article/raccomandare-vino-per-stile-ristorante`;
     - `/fr/article/recommander-vin-par-style-restaurant`;
     - `/de/article/wein-nach-stil-empfehlen-restaurant`;
     - `/pt/article/recomendar-vinho-por-estilos-restaurante`.
   - La Edge Function `prerender` no debe renderizar esas 6 URLs como articulo antes del 2026-07-13.
   - Articulos publicados deben llevar alternates por `article_group` en sitemap y prerender.
   - Hubs `Aprender vino` y `llms` deben seguir sin enlaces futuros.

## Prioridad 2: lote i18n DE/PT y paridad humano/bot

1. Corregir home DE/PT:
   - H1/cuerpo localizados;
   - canonical `/de` y `/pt`, no root.
2. Corregir canonicals:
   - `/de/kontakt`;
   - `/pt/precos`;
   - revisar equivalentes de contacto/precios en otros idiomas.
3. Localizar herramientas React que el Worker ya tapa para bots:
   - comparador de distribuidores;
   - calculadora de fuga de margen;
   - otras herramientas online que aparezcan en sitemap.
4. Localizar formularios DE/PT, empezando por `ContactFormFields`.
5. Crear guardrails:
   - humano JS vs Googlebot;
   - canonical path;
   - H1;
   - `html lang`;
   - hreflang count;
   - ausencia de frases ES prohibidas.

## Prioridad 3: seguir Biblioteca / Aprender solo tras estabilizar

1. Mantener programado el lote Biblioteca para `2026-07-20`:
   - `wine-library-by-the-glass-stock-rotation`.
2. Mantener programado el lote Aprender vino para `2026-07-27`:
   - `learn-wine-read-label-restaurant`.
3. No publicar nuevas tandas hasta que la cadena `published_at` + sitemap + prerender + hreflang este revalidada.

## Actualizacion 2026-07-05: retomar tras sincronizacion editorial y auditoria de idiomas

## Hechos

- CloudRIM/SAVia ya estan implementados y documentados como capacidades principales.
- La oleada editorial de 12 articulos de Biblioteca del vino / Aprender vino ya esta en `origin/main`.
- Se preparo una migracion correctiva para `public.articles`:
  - `supabase/migrations/20260705081417_harden_articles_editorial_permissions.sql`.
- Local queda preparado para no enlazar articulos con `published_at` futuro hasta su fecha:
  - React hub `Aprender vino`;
  - Supabase `prerender`;
  - Cloudflare Worker;
  - `llms.txt`;
  - `llms-full.txt`.
- Validaciones locales completas OK:
  - Worker syntax;
  - diff check;
  - test SEO 20/20;
  - ESLint;
  - Deno check;
  - TypeScript;
  - build.
- La auditoria del agente Idiomas detecto una deuda prioritaria en DE/PT y canonicals/hreflang.
- `src/components/WineListAnalyzerTool.tsx` es cambio ajeno/preexistente y debe seguir fuera de este trabajo salvo instruccion expresa.

## Prioridad 1: cierre operativo y despliegue

1. Verificar que el merge local/remoto quedo commiteado y pusheado.
2. En Lovable Cloud, aplicar la migracion correctiva:
   - `20260705081417_harden_articles_editorial_permissions.sql`.
3. Publicar frontend/Edge/Worker con los cambios de gating editorial.
4. Revalidar produccion:
   - `https://winerim.wine/aprender-vino`;
   - variantes EN/IT/FR/DE/PT del hub;
   - que la guia `Recomendar vino por estilos` no aparezca enlazada antes del 2026-07-13;
   - `https://winerim.wine/llms.txt`;
   - `https://winerim.wine/llms-full.txt`;
   - sitemap y prerender.
5. Confirmar en Supabase/Lovable que los articulos publicados son visibles por anon y que los futuros no se sirven como publicados.

## Prioridad 2: auditoria y correccion de idiomas

1. Crear guardrails/tests para detectar fallback espanol en rutas DE/PT.
2. Corregir home DE/PT para humanos, no solo para Googlebot/Worker.
3. Unificar fuente de verdad de rutas localizadas para React, sitemap, prerender y Worker.
4. Revisar canonicals/hreflang de:
   - `Contacto`;
   - `Precios`;
   - `Hoteles`;
   - `CalculadoraPrecioCopa`;
   - herramientas online localizadas.
5. Localizar formularios DE/PT y herramientas que aun tengan copy/SEO espanol.
6. Revalidar paridad bot/humano en muestras DE/PT antes de ampliar mas contenido internacional.

## Prioridad 3: siguientes lotes Biblioteca / Aprender vino

1. Preparar lote Biblioteca del vino para 2026-07-20:
   - `wine-library-by-the-glass-stock-rotation`;
   - foco: rotacion, stock y vino por copa.
2. Preparar lote Aprender vino para 2026-07-27:
   - `learn-wine-read-label-restaurant`;
   - foco: leer etiquetas para equipos de sala.
3. Mantener cadencia semanal, con fechas correlativas y versiones adaptadas por idioma/pais.
4. No mezclar `Aprender vino` con fichas puras de `Biblioteca del vino`: `Aprender vino` es capa didactica; Biblioteca es capa de entidad/conocimiento.

## Prioridad 4: Search Console y `www`

1. Vigilar CloudRIM en Search Console tras la solicitud de indexacion del 2026-07-05.
2. Mantener monitorizado `/sitemap.xml` y su conteo de URLs.
3. Resolver `https://www.winerim.wine/` que sigue devolviendo `421`; requiere ajuste Cloudflare/Lovable/routing con permisos de DNS/rulesets.

## Actualizacion 2026-07-05: retomar tras Search Console, Worker y Radar Winerim

## Hechos

- Produccion valida `https://winerim.wine/sitemap.xml` con `200` y `2.330` URLs.
- Search Console marca `/sitemap.xml` como `Correcto`, ultima lectura `5 jul 2026`, `2.330` paginas descubiertas.
- `https://winerim.wine/producto/cloudrim` ya pasa prueba en vivo de Search Console como URL disponible e indexable.
- Se solicito indexacion de CloudRIM el 2026-07-05; queda en cola prioritaria de Google.
- Search Console muestra indexadas:
  - `https://winerim.wine/producto/savia`;
  - `https://winerim.wine/presentacion`;
  - `https://winerim.wine/aprender-vino`.
- Worker desplegado: `winerim-proxy` Version ID `91667a6c-bbb5-48ba-a47a-e489918bed53`.
- Las herramientas localizadas del sitemap tienen ahora prerender/canonical propio en Worker.
- `https://www.winerim.wine/` sigue devolviendo `421`.
- Nuevos documentos de trabajo:
  - `src/seo/NEW_WINE_RADAR_AND_MONTHLY_NEWS_2026-07-05.md`;
  - `src/seo/WINE_LIBRARY_LEARN_WINE_NEXT_EXPANSION_2026-07-05.md`.
- Migracion editorial pendiente:
  - `supabase/migrations/20260703141412_add_wine_library_learn_wine_editorial_expansion.sql`;
  - 12 articulos, 2 grupos, 6 idiomas por grupo;
  - no aplicada remoto.
- Validaciones locales de cierre OK:
  - `git diff --check`;
  - `node --check cloudflare-worker-v3-hybrid.js`;
  - `npm run test -- --run src/test/wine-library-seo-surface.test.ts`;
  - `npm run build`.
- Cambio ajeno/preexistente sin tocar:
  - `src/components/WineListAnalyzerTool.tsx`.

## Prioridad 1: infraestructura y Search Console

1. Revisar en 24-72 horas Search Console para CloudRIM:
   - confirmar si pasa de `Duplicada: el usuario no ha indicado ninguna version canonica` a indexada;
   - si no cambia, repetir prueba en vivo y revisar canonical seleccionado por Google.
2. Resolver `https://www.winerim.wine/`:
   - opcion preferente: Redirect Rule `www -> https://winerim.wine/{path}?{query}`;
   - alternativa: revisar DNS/custom hostname/ownership y que `www` entre por Worker;
   - requiere permisos Cloudflare de DNS/rulesets que el token actual no tiene.
3. Mantener `/sitemap.xml` monitorizado:
   - valor esperado actual: `2.330` paginas descubiertas;
   - investigar cualquier caida brusca o vuelta a conteos antiguos.

## Prioridad 2: Biblioteca del vino y Aprender vino

1. Aplicar/publicar en Supabase/Lovable la migracion:
   - `20260703141412_add_wine_library_learn_wine_editorial_expansion.sql`.
2. Tras aplicarla, validar:
   - las 12 URLs de articulos;
   - sitemap;
   - prerender;
   - canonicals;
   - enlaces internos;
   - Search Console solo para URLs principales si hay cuota.
3. Preparar el siguiente lote editorial:
   - Biblioteca: `wine-library-by-the-glass-stock-rotation`, sugerido para `2026-07-20`;
   - Aprender vino: `learn-wine-read-label-restaurant`, sugerido para `2026-07-27`.

## Prioridad 3: Radar Winerim y Novedades de Julio

1. Localizar la fuente real de solicitudes de vinos inexistentes:
   - editor de carta;
   - notificaciones;
   - base interna;
   - soporte;
   - CloudRIM/albaranes/tarifas si aplica.
2. Extraer una muestra anonima de 30-90 dias:
   - volumen total;
   - duplicados;
   - bodegas/regiones/tipos mas repetidos;
   - restaurantes o segmentos solicitantes anonimizados;
   - tiempo medio de resolucion.
3. Definir MVP `Radar Winerim`:
   - estado de solicitud;
   - deduplicacion;
   - enriquecimiento;
   - prioridad;
   - aviso al cliente cuando el vino queda listo.
4. Prototipar carta `Novedades de Julio`:
   - vinos anadidos en 30/45/60 dias;
   - stock/disponibilidad;
   - margen;
   - argumento de sala;
   - etiquetas `Nuevo`, `Por copa`, `Ultimas botellas`, `Recomendado`.
5. Crear lead magnet si se valida la propuesta:
   - `Plantilla Radar de Novedades para Carta de Vinos`;
   - landing posible `/recursos/plantilla-novedades-carta-vinos`.

## Prioridad 4: cierre operativo de cambios locales

1. Decidir si se hace commit de los cambios propios:
   - `cloudflare-worker-v3-hybrid.js`;
   - `package.json`;
   - `src/seo/NEW_WINE_RADAR_AND_MONTHLY_NEWS_2026-07-05.md`;
   - `src/seo/WINE_LIBRARY_LEARN_WINE_NEXT_EXPANSION_2026-07-05.md`;
   - docs fuente actualizados.
2. No incluir `src/components/WineListAnalyzerTool.tsx` salvo confirmacion expresa de que esos cambios ajenos deben entrar en el mismo commit.
3. Si se va a desplegar otra vez Worker, usar los scripts actualizados para no perder rutas.

## Actualizacion 2026-07-02: retomar con sitemap completo y Search Console

## Hechos

- El usuario publico Lovable y produccion cambio a deployment `1f496f52-39b9-4f32-a925-db02f74b0596`.
- `https://winerim.wine/sitemap.xml` ya devuelve `2.294` URLs en limpio, sin cache-buster, incluyendo CloudRIM/SAVia, biblioteca y articulos.
- Se reenvio `/sitemap.xml` en Search Console y Google confirmo `Se ha enviado el sitemap correctamente`; la tabla puede tardar en sustituir el valor anterior de `403`.
- La Edge Function productiva `prerender` sigue antigua para CloudRIM/SAVia y devuelve home/canonical raiz cuando se prueba como Googlebot.
- Googlebot en `winerim.wine` sigue recibiendo home/canonical raiz en CloudRIM/SAVia; por tanto no conviene solicitar indexacion manual todavia.
- Produccion ya sirve `https://winerim.wine/sitemap.xml` con `HTTP 200`.
- El primer publish sirvio un fallback parcial de `403` URLs y Search Console lo acepto el 2026-07-02, mostrando `403` paginas descubiertas.
- Se preparo localmente un sitemap estatico completo de `2.294` URLs:
  - `2.282` URLs del sitemap completo vivo en Supabase;
  - `12` URLs CloudRIM/SAVia nuevas.
- `npm run generate:sitemap-static` reconstruye ese archivo desde `scripts/refresh-static-sitemap.mjs`.
- `npm run build` pasa con el sitemap completo.
- El commit `d6af8bf fix: restore full static sitemap` esta pusheado a `origin/main`.
- Produccion sigue sirviendo el deployment `46a9e914-a3a2-4326-9f72-1b6b8ec36d5b` con `403` URLs; el push no publico automaticamente.
- Codex no pudo publicar desde Lovable porque los proyectos `ebb36746-82ff-43c3-86c1-558573beddcd` y `2c4eed0e-6760-45f0-aeb3-ce44de8e91f1` devuelven `You don't have access` en el navegador integrado.
- En navegador real, CloudRIM/SAVia estan publicadas y funcionan para usuarios con canonical propio.
- Como Googlebot en `winerim.wine`, CloudRIM/SAVia siguen devolviendo home/canonical raiz porque el apex no ejecuta Worker/prerender correcto.
- `src/components/WineListAnalyzerTool.tsx` sigue siendo cambio ajeno y fuera de alcance.

## Tareas pendientes inmediatas

1. Desplegar la Edge Function `supabase/functions/prerender/index.ts` desde Lovable/Supabase, o conseguir `SUPABASE_ACCESS_TOKEN` para desplegar por CLI.
2. Revalidar despues del deploy de `prerender`:
   - `https://pwkqbcgjrhoyxrsmcypw.supabase.co/functions/v1/prerender?path=/producto/cloudrim` como Googlebot debe contener CloudRIM y canonical propio;
   - las 12 rutas CloudRIM/SAVia en `winerim.wine` deben devolver contenido real, canonical propio y `x-prerendered`/rama bot correcta.
3. Cuando el prerender este correcto, solicitar indexacion manual en Search Console para:
   - `https://winerim.wine/producto/cloudrim`;
   - `https://winerim.wine/producto/savia`;
   - variantes principales EN/PT si hay cuota.
4. Vigilar Search Console hasta que `/sitemap.xml` actualice paginas descubiertas desde `403` hacia `2.294`.
5. Mantener vivo el bloqueo SEO principal:
   - Googlebot en CloudRIM/SAVia del apex debe dejar de recibir canonical raiz;
   - resolver por Edge Functions `prerender`/`sitemap` desde Lovable/Supabase o por ownership/routing de Cloudflare Worker.
6. Cuando el prerender del apex este resuelto:
   - revalidar las 12 rutas CloudRIM/SAVia como Googlebot;
   - solicitar indexacion manual de las rutas principales si hay cuota.

## Actualizacion 2026-07-02: retomar tras puente Worker y bloqueo apex

## Hechos

- CloudRIM/SAVia estan implementados en codigo y el puente Worker esta preparado.
- Worker desplegado: `winerim-proxy` version `41cd1394-5a19-4ead-abc9-436fb646f41e`.
- Triggers Worker activos en Cloudflare:
  - `winerim.wine/*`;
  - `go.winerim.wine/*`.
- `go.winerim.wine/*` si ejecuta `winerim-proxy`; la prueba Googlebot de `/producto/cloudrim` devuelve `worker-static-prerender`.
- `winerim.wine/*` no ejecuta `winerim-proxy`; Cloudflare Trace para el apex devuelve `hostname does not belong to your account`.
- Se probo el apex `Proxied`, pero no ejecuto Worker y dejo `/sitemap.xml` en `404`; se revirtio a `DNS only`.
- `public/sitemap.xml` queda creado como fallback estatico con 403 URLs, incluyendo CloudRIM/SAVia.
- Produccion actual en apex:
  - `https://winerim.wine/sitemap.xml` devuelve `404`;
  - Googlebot en `/producto/cloudrim` recibe HTML de home con canonical `https://winerim.wine/`.
- Supabase CLI sigue bloqueado sin `SUPABASE_ACCESS_TOKEN`.
- Cambio ajeno `src/components/WineListAnalyzerTool.tsx` sigue fuera de alcance.

## Tareas pendientes inmediatas

1. Publicar desde Lovable el commit que incluye:
   - `public/sitemap.xml`;
   - puente Worker CloudRIM/SAVia;
   - tests/documentacion actualizados.
2. Revalidar tras publish:
   - `https://winerim.wine/sitemap.xml` debe responder `200`;
   - debe contener CloudRIM/SAVia en `es/en/it/fr/de/pt`.
3. Resolver el bloqueo del apex:
   - revisar en Cloudflare/Lovable por que Trace marca `winerim.wine` como `hostname does not belong to your account`;
   - confirmar si el dominio apex esta gestionado por integracion/proveedor de Lovable;
   - decidir si se corrige por ownership/routing Cloudflare o por Edge Functions Supabase.
4. Cuando el apex ejecute Worker o Edge Functions:
   - validar las 12 rutas CloudRIM/SAVia como Googlebot;
   - confirmar canonical propio, hreflang y contenido localizado;
   - reenviar `/sitemap.xml` en Search Console.
5. Desplegar `sitemap` y `prerender` desde Lovable/Supabase si se obtiene acceso operativo.

## Pendientes SEO previos que siguen vivos

- Search Console cuando haya cuota y sitemap `200`:
  - `https://winerim.wine/article/tipos-de-vino-para-entender-una-carta`;
  - `https://winerim.wine/article/uvas-que-conocer-para-empezar`;
  - `https://winerim.wine/article/regiones-vinicolas-para-empezar-en-restaurante`;
  - `https://winerim.wine/it/calcolatrice-margini-vino`.
- Confirmar si el fallback estatico de 403 URLs es suficiente temporalmente o si hay que generar un sitemap estatico completo de biblioteca/articulos.
- Mantener pendiente separado:
  - optimizar banner de cookies en landings de pago si se decide;
  - confirmar visualmente leads QA anteriores en CRM;
  - no tocar chat hasta nueva orden.

## Actualizacion 2026-07-02: retomar tras implementar CloudRIM/SAVia

## Hechos

- CloudRIM/SAVia estan implementados localmente y validados.
- Rutas nuevas:
  - `/producto/cloudrim`;
  - `/producto/savia`;
  - `/en/product/cloudrim`;
  - `/en/product/savia`;
  - `/it/prodotto/cloudrim`;
  - `/it/prodotto/savia`;
  - `/fr/produit/cloudrim`;
  - `/fr/produit/savia`;
  - `/de/produkt/cloudrim`;
  - `/de/produkt/savia`;
  - `/pt/produto/cloudrim`;
  - `/pt/produto/savia`.
- Superficies actualizadas:
  - home despues de `La solucion: 5 herramientas en una`;
  - navbar/footer;
  - `/funcionalidades`;
  - `/integraciones`;
  - `/producto/inteligencia-dinamica`;
  - `sitemap`;
  - `prerender`;
  - Worker;
  - `sitemap-extra`;
  - `llms.txt`;
  - `llms-full.txt`;
  - test SEO.
- Validaciones locales OK:
  - test SEO enfocado;
  - build;
  - Deno check;
  - Worker syntax check;
  - Worker dry-run;
  - JSON sitemap-extra;
  - `git diff --check`;
  - QA navegador desktop/mobile en 8 rutas clave.
- Supabase CLI no puede desplegar sin `SUPABASE_ACCESS_TOKEN`.
- Cambio ajeno `src/components/WineListAnalyzerTool.tsx` sigue fuera de alcance.

## Tareas pendientes inmediatas

1. Pushear el commit si no esta ya en `origin/main`.
2. En Lovable, publicar frontend del ultimo commit.
3. En Lovable/Supabase, desplegar Edge Functions:
   - `sitemap`;
   - `prerender`.
4. Desplegar Cloudflare Worker `winerim-proxy` despues de que frontend y Edge Functions esten publicados.
5. Revalidar produccion como usuario:
   - `/producto/cloudrim`;
   - `/producto/savia`;
   - `/en/product/cloudrim`;
   - `/pt/produto/savia`;
   - home;
   - `/funcionalidades`;
   - `/integraciones`;
   - `/producto/inteligencia-dinamica`.
6. Revalidar como Googlebot:
   - CloudRIM ES/EN/IT/FR/DE/PT;
   - SAVia ES/EN/IT/FR/DE/PT;
   - canonicals;
   - hreflang;
   - `x-prerendered`;
   - contenido real sin `Not found`.
7. Confirmar `/sitemap.xml` contiene las 12 URLs nuevas y reenviarlo en Search Console.
8. Revisar `llms.txt` y `llms-full.txt` productivos.

## Pendientes SEO previos que siguen vivos

- Search Console cuando haya cuota:
  - `https://winerim.wine/article/tipos-de-vino-para-entender-una-carta`;
  - `https://winerim.wine/article/uvas-que-conocer-para-empezar`;
  - `https://winerim.wine/article/regiones-vinicolas-para-empezar-en-restaurante`;
  - `https://winerim.wine/it/calcolatrice-margini-vino`.
- Revisar si Search Console actualiza `/sitemap.xml` hacia `2282` URLs o el nuevo total tras CloudRIM/SAVia.
- Mantener pendiente separado:
  - optimizar banner de cookies en landings de pago si se decide;
  - confirmar visualmente leads QA anteriores en CRM;
  - no tocar chat hasta nueva orden.

## Actualizacion 2026-07-01: retomar tras revalidar landing Meta Demo en produccion

## Hechos

- Landing Meta Demo publicada y revalidada en produccion.
- `https://go.winerim.wine/` y `https://winerim.wine/meta-demo` muestran la version actualizada.
- Revalidado:
  - badge `Sistema Winerim IA`;
  - CTA fijo `Solicita tu demo`;
  - bullets nuevos con primera frase destacada;
  - `+2.000 restaurantes`;
  - testimonios reales;
  - `noindex, follow`;
  - OpenGraph de Winerim;
  - chat desactivado;
  - sin overflow horizontal desktop/mobile;
  - ancla del CTA al formulario funcionando con clic real;
  - UTMs/fbclid capturados en inputs ocultos.
- No se envio lead test nuevo en esta pasada para evitar ruido en CRM.
- Observacion no bloqueante: 404 de `__l5e/trackevents` de Lovable.
- Cambio ajeno en `src/components/WineListAnalyzerTool.tsx` sigue fuera de alcance.

## Tareas pendientes inmediatas

1. Retomar CloudRIM/SAVia desde el handoff:
   - `/producto/cloudrim`;
   - `/producto/savia`;
   - bloque en home;
   - cards en `/funcionalidades`;
   - CloudRIM en `/integraciones`;
   - SAVia en `/producto/inteligencia-dinamica`.
2. Si se quiere cerrar tambien CRM despues de esta publicacion, enviar un lead test nuevo desde `https://go.winerim.wine/` y verificar:
   - `contact_leads`;
   - `send-lead-notification`;
   - `submit-gastrofunnel`;
   - entrada visible en Winerim Connect/CRM.
3. Decidir si se optimiza el banner de cookies para landings de pago.
4. Mantener pendientes SEO previos:
   - Search Console cuando reinicie cuota;
   - revisar conteo de sitemap hacia `2282`;
   - revalidar cualquier fix de canonicals/localizacion que no haya quedado publicado.

## Actualizacion 2026-07-01: retomar tras ajuste de landing Meta Demo

## Hechos

- `src/pages/MetaDemoLanding.tsx` queda actualizado localmente con el copy de referencia de LeadConnector.
- Cambios incluidos:
  - badge `Sistema Winerim IA`;
  - CTA fijo superior derecho `Solicita tu demo`;
  - retirada del `Sin compromiso` de cabecera;
  - bullets nuevos con primera frase en negrita;
  - testimonios reales mantenidos;
  - `+2.000 restaurantes` mantenido.
- No se toco el backend del formulario ni el flujo CRM.
- Validaciones locales OK:
  - `npm run build`;
  - `git diff --check`;
  - captura Playwright desktop/mobile;
  - comprobacion por selector renderizado.
- Observacion CRO: el banner global de cookies puede tapar parte del formulario en primera visita.
- CloudRIM/SAVia sigue pendiente; solo se dio el plan antes de pausar por esta landing.
- Cambio ajeno en `src/components/WineListAnalyzerTool.tsx` sigue fuera de alcance.

## Tareas pendientes inmediatas

1. Publicar en Lovable el commit nuevo de landing.
2. Revalidar `https://go.winerim.wine/` tras publish:
   - badge correcto;
   - CTA fijo visible en desktop/mobile;
   - bullets con negrita inicial;
   - `+2.000 restaurantes`;
   - testimonios reales;
   - formulario operativo.
3. Si se quiere maximizar conversion de pago, decidir si se adapta el banner de cookies para `go.winerim.wine`.
4. Retomar CloudRIM/SAVia:
   - crear `/producto/cloudrim`;
   - crear `/producto/savia`;
   - anadir bloque en home;
   - anadir cards en `/funcionalidades`;
   - anadir seccion CloudRIM en `/integraciones`;
   - anadir seccion SAVia en `/producto/inteligencia-dinamica`.
5. Mantener pendientes SEO previos:
   - publish/revalidacion del fix de canonicals/localizacion si no queda incluido en el proximo publish;
   - Search Console cuando reinicie cuota;
   - revisar conteo de sitemap hacia `2282`.

## Actualizacion 2026-07-01: retomar tras revalidacion post-publish y fix local

## Hechos

- La ampliacion comercial de Core/Supply/Meta Demo ya fue publicada por Lovable y revalidada en produccion.
- Produccion valida en navegador real desktop/mobile:
  - `/producto/winerim-core`;
  - `/en/product/winerim-core`;
  - `/producto/winerim-supply`;
  - `/pt/produto/winerim-supply`;
  - `https://go.winerim.wine/`.
- Las secciones nuevas y CTAs estan visibles, no hay overflow y no aparece `Not found`.
- `go.winerim.wine` mantiene `noindex, follow`, formulario visible y bloque `Que veras en la demo`.
- Se detecto y corrigio localmente una contradiccion SEO: `/en/product/winerim-core` tenia canonical espanol en produccion.
- Fix local preparado:
  - `src/pages/WinerimCore.tsx` genera canonical con `localePath`;
  - `src/components/DecisionCenterTeaser.tsx` incorpora DE/PT y fallback `getI18n`.
- Validaciones locales del fix OK:
  - `npm run build`;
  - `git diff --check`;
  - navegador local para Core EN/DE y Supply PT.
- Cambio ajeno en `src/components/WineListAnalyzerTool.tsx` sigue fuera de alcance.

## Tareas pendientes inmediatas

1. Publicar en Lovable el commit nuevo con:
   - canonical localizado de `WinerimCore`;
   - localizacion DE/PT de `DecisionCenterTeaser`.
2. Revalidar produccion tras ese publish:
   - `https://winerim.wine/en/product/winerim-core` canonical propio;
   - `https://winerim.wine/de/produkt/winerim-core` canonical propio;
   - `https://winerim.wine/pt/produto/winerim-supply` sin texto espanol en Decision Center.
3. Search Console cuando se reinicie cuota:
   - solicitar indexacion de `https://winerim.wine/article/tipos-de-vino-para-entender-una-carta`;
   - solicitar indexacion de `https://winerim.wine/article/uvas-que-conocer-para-empezar`;
   - solicitar indexacion de `https://winerim.wine/article/regiones-vinicolas-para-empezar-en-restaurante`;
   - solicitar indexacion de `https://winerim.wine/it/calcolatrice-margini-vino`.
4. Revisar si Search Console actualiza `/sitemap.xml` desde `2.264` paginas descubiertas hacia las `2282` URLs productivas.
5. Mantener pendiente separado:
   - confirmar visualmente en CRM los leads QA anteriores;
   - no tocar chat hasta nueva orden;
   - no tocar `WineListAnalyzerTool.tsx` salvo instruccion expresa.

## Actualizacion 2026-07-01: retomar tras Worker, Search Console y secciones comerciales

## Hechos

- Segunda oleada de `Aprender vino` ya validada en produccion:
  - 18 articulos nuevos responden `200` como Googlebot;
  - 6 hubs enlazan 6 guias por idioma;
  - Worker desplegado: `winerim-proxy` version `6d8af13d-2ac0-4626-8535-2f5457954d56`;
  - sitemap productivo con `2282` URLs.
- Search Console recibio `/sitemap.xml` correctamente, pero aun mostraba `2.264` paginas descubiertas antes de procesar la nueva lectura.
- Search Console devolvio `Cuota superada` para solicitudes manuales de indexacion.
- Se preparo una ampliacion comercial para publicar:
  - variantes `core` y `supply` de `ConnectedCellarSection`;
  - insercion en `WinerimCore` y `WinerimSupply`;
  - bloque corto `Que veras en la demo` en `MetaDemoLanding`;
  - correccion del conector DE/PT en `WinerimSupply`.
- Validaciones locales OK:
  - `npm run build`;
  - `git diff --check`;
  - QA navegador local desktop/mobile.
- Sigue fuera de alcance el cambio ajeno en `src/components/WineListAnalyzerTool.tsx`.

## Tareas pendientes inmediatas

1. Publicar frontend desde Lovable cuando este commit este en `origin/main`.
2. Revalidar produccion despues del publish:
   - `https://winerim.wine/producto/winerim-core`;
   - `https://winerim.wine/en/product/winerim-core`;
   - `https://winerim.wine/producto/winerim-supply`;
   - `https://winerim.wine/pt/produto/winerim-supply`;
   - `https://go.winerim.wine/`.
3. Validar en produccion:
   - nueva seccion Core visible;
   - nueva seccion Supply visible;
   - bloque `Que veras en la demo` visible en la landing Meta;
   - sin overflow mobile;
   - CTAs correctos hacia demo, margen y compra inteligente.
4. Search Console cuando se reinicie cuota:
   - solicitar indexacion de `https://winerim.wine/article/tipos-de-vino-para-entender-una-carta`;
   - solicitar indexacion de `https://winerim.wine/article/uvas-que-conocer-para-empezar`;
   - solicitar indexacion de `https://winerim.wine/article/regiones-vinicolas-para-empezar-en-restaurante`;
   - solicitar indexacion de `https://winerim.wine/it/calcolatrice-margini-vino`.
5. Revisar si Search Console actualiza `/sitemap.xml` desde `2.264` paginas descubiertas hacia las `2282` URLs productivas.
6. Corregir deuda de localizacion detectada:
   - `DecisionCenterTeaser` muestra texto espanol en PT/DE dentro de paginas de producto.
7. Mantener pendiente separado:
   - confirmar visualmente en CRM los leads QA anteriores;
   - no tocar chat hasta nueva orden;
   - no tocar `WineListAnalyzerTool.tsx` salvo instruccion expresa.

## Actualizacion 2026-07-01: retomar tras preparar segunda oleada `Aprender vino`

## Hechos

- Segunda oleada de `Aprender vino` preparada localmente.
- Migracion creada:
  - `supabase/migrations/20260701102537_add_learn_wine_second_spokes.sql`.
- Contenido preparado:
  - 18 articulos;
  - 3 temas;
  - 6 idiomas;
  - slugs localizados;
  - `related_links`;
  - `article_group` compartido por tema.
- Hub `Aprender vino` actualizado para mostrar 6 guias por idioma.
- `prerender`, Worker fallback, `llms` y test SEO actualizados.
- Validaciones locales OK:
  - test SEO;
  - build;
  - Worker check;
  - Deno check;
  - `git diff --check`;
  - QA local desktop/mobile ES/EN/PT sin overflow.
- No desplegar Worker todavia hasta aplicar la migracion de articulos.

## Tareas pendientes inmediatas

1. En Lovable/Supabase, aplicar la migracion:
   - `20260701102537_add_learn_wine_second_spokes.sql`.
2. Publicar frontend desde Lovable.
3. Desplegar Edge Functions:
   - `sitemap`;
   - `prerender`.
4. Desplegar Cloudflare Worker despues de que los articulos existan en Supabase.
5. Revalidar produccion:
   - 6 hubs `Aprender vino`;
   - 18 articulos nuevos como Googlebot;
   - canonical propio;
   - idioma correcto;
   - contenido real sin `Not found`;
   - `/sitemap.xml` contiene las 18 URLs nuevas.
6. Search Console:
   - reenviar `/sitemap.xml`;
   - solicitar indexacion de las 3 URLs ES nuevas:
     - `/article/tipos-de-vino-para-entender-una-carta`;
     - `/article/uvas-que-conocer-para-empezar`;
     - `/article/regiones-vinicolas-para-empezar-en-restaurante`.
7. Despues de publicar, continuar con:
   - monitorizar distribuidores/margenes en 48-72 horas;
   - pedir indexacion pendiente de `/it/calcolatrice-margini-vino`;
   - adaptar `Como lo hace Winerim` a producto/funnels.

## Actualizacion 2026-07-01: retomar tras Search Console de distribuidores/margenes

## Hechos

- Produccion ya quedo revalidada para las 12 rutas de distribuidores y calculadora de margen.
- Googlebot recibe `200`, prerender, canonical propio, 7 `hreflang` y contenido localizado en las 12 rutas.
- Navegador real recibe contenido correcto en las 12 rutas.
- `/sitemap.xml` productivo contiene las 12 URLs y `2264` entradas.
- Search Console recibio de nuevo `/sitemap.xml` y confirmo envio correcto.
- Search Console acepto 11 solicitudes manuales de indexacion/reindexacion.
- Quedo pendiente por cuota diaria:
  - `https://winerim.wine/it/calcolatrice-margini-vino`.
- Senal a vigilar:
  - `https://winerim.wine/pt/distribuidor` aparece como `Pagina alternativa con etiqueta canonica adecuada`.
- Cambio local ajeno `src/components/WineListAnalyzerTool.tsx` sigue fuera de alcance.

## Tareas pendientes inmediatas

1. Manana, cuando se reinicie cuota de Search Console, solicitar indexacion de:
   - `https://winerim.wine/it/calcolatrice-margini-vino`.
2. En 48-72 horas, revisar estado en Search Console de las 12 URLs:
   - `/distribuidor`;
   - `/en/distributor`;
   - `/it/distributore`;
   - `/fr/distributeur`;
   - `/de/haendler`;
   - `/pt/distribuidor`;
   - `/calculadora-margen-vino`;
   - `/en/wine-margin-calculator`;
   - `/it/calcolatrice-margini-vino`;
   - `/fr/calculateur-marge-vin`;
   - `/de/wein-margen-rechner`;
   - `/pt/calculadora-margem-vinho`.
3. Confirmar si Search Console actualiza `/sitemap.xml` desde `2.258` paginas descubiertas hacia las `2264` URLs productivas actuales.
4. Si `/pt/distribuidor` sigue como alternativa canonica, revisar:
   - canonical/hreflang productivo otra vez;
   - enlazado interno PT;
   - diferenciacion del copy PT frente a ES;
   - posibles canonicals historicos cacheados.
5. Continuar con segunda oleada de `Aprender vino`:
   - tipos de vino explicados para restaurantes;
   - uvas que conocer para empezar;
   - regiones vinicolas para empezar.
6. Adaptar `Como lo hace Winerim` a paginas de producto/funnels:
   - Winerim Core;
   - Winerim Supply;
   - version corta para landings de captacion.
7. Mantener pendiente separado:
   - confirmar visualmente en CRM los leads QA anteriores;
   - no tocar chat hasta nueva orden del usuario.

## Actualizacion 2026-07-01: retomar tras revision de distribuidores y margenes

## Hechos

- Revision local de distribuidores y margenes completada.
- Cambios preparados en React, rutas i18n, sitemap, prerender, Worker, `sitemap-extra` y `llms`.
- QA local desktop completada en 12 rutas con H1, canonical, 7 `hreflang`, FAQ schema, JSON-LD valido, sin fallback y sin overflow.
- QA movil completada en muestras ES/EN/PT de distribuidores y margen sin overflow y sin errores nuevos.
- Validaciones locales OK:
  - `npm run build`;
  - `node --check cloudflare-worker-v3-hybrid.js`;
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`;
  - `jq empty public/sitemap-extra.json`;
  - `git diff --check`.
- Cambio local ajeno `src/components/WineListAnalyzerTool.tsx` sigue fuera de alcance.
- Commit `b981921 feat: refine distributor and margin SEO pages` ya esta en `origin/main`.
- Cloudflare Worker desplegado: `winerim-proxy` version `31bbbf98-93f6-4659-81fb-5ece89be0214`.
- Supabase CLI no pudo desplegar `sitemap`/`prerender` por falta de `SUPABASE_ACCESS_TOKEN`.
- El Worker incluye prerender estatico puente para distribuidores, pero Cloudflare mantiene cache antiguo sin query para algunas URLs; con cache-buster ya se valida HTML correcto.

## Tareas pendientes inmediatas

1. Publicar y desplegar lo que queda de esta tanda:
   - frontend desde Lovable;
   - Edge Functions `sitemap` y `prerender`.
2. Purgar cache Cloudflare o esperar expiracion antes de Search Console para:
   - `https://winerim.wine/distribuidor`;
   - `https://winerim.wine/en/distributor`;
   - `https://winerim.wine/it/distributore`;
   - `https://winerim.wine/fr/distributeur`;
   - `https://winerim.wine/de/haendler`;
   - `https://winerim.wine/pt/distribuidor`.
3. Revalidar produccion humana y Googlebot:
   - `/distribuidor`;
   - `/en/distributor`;
   - `/it/distributore`;
   - `/fr/distributeur`;
   - `/de/haendler`;
   - `/pt/distribuidor`;
   - `/calculadora-margen-vino`;
   - `/en/wine-margin-calculator`;
   - `/it/calcolatrice-margini-vino`;
   - `/fr/calculateur-marge-vin`;
   - `/de/wein-margen-rechner`;
   - `/pt/calculadora-margem-vinho`.
4. Tras deploy/purge, reenviar `/sitemap.xml` en Search Console.
5. Inspeccionar en Search Console:
   - `/distribuidor`;
   - `/calculadora-margen-vino`;
   - una variante internacional de distribuidores;
   - una variante internacional de margen.
6. Monitorizar en 48-72 horas la primera oleada de `Aprender vino` ya solicitada:
   - `/article/como-catar-vino-en-cinco-pasos`;
   - `/article/vocabulario-de-cata-de-vino`;
   - `/article/maridajes-basicos-para-restaurantes`.
7. Preparar segunda oleada de `Aprender vino`:
   - tipos de vino explicados para restaurantes;
   - uvas que conocer para empezar;
   - regiones vinicolas para empezar.
8. Adaptar `Como lo hace Winerim` a producto y funnels:
   - Winerim Core;
   - Winerim Supply;
   - version corta para landings de captacion.
9. Mantener pendiente separado: confirmar en CRM los leads QA de formularios anteriores.

## Actualizacion 2026-07-01: retomar tras primera oleada publicada de `Aprender vino`

## Hechos

- Primera oleada publicada y validada en produccion:
  - migracion `20260701064536_add_learn_wine_first_spokes.sql`;
  - 18 articulos, 3 temas x 6 idiomas;
  - hub `Aprender vino` enlazando los spokes;
  - prerender, Worker y `llms` sincronizados.
- Validaciones locales OK:
  - test SEO enfocado;
  - build;
  - `deno check`;
  - `node --check` Worker;
  - QA Playwright en ES/EN/PT.
- Cloudflare Worker desplegado: `winerim-proxy` version `77662a6b-a0b0-4e2f-bfbf-b4c7cb3ad06b`.
- Validaciones productivas OK:
  - 6/6 hubs responden `200` como Googlebot y exponen 3/3 enlaces a articulos;
  - 18/18 articulos responden `200` como Googlebot, con prerender, canonical correcto y contenido real;
  - `/sitemap.xml` contiene las 18 URLs.
- Search Console:
  - `/sitemap.xml` reenviado correctamente;
  - `/aprender-vino` ya estaba indexada y se solicito reindexacion;
  - los 3 articulos ES estaban `Descubierta: actualmente sin indexar`, presentes en sitemap y aptos tras prueba viva;
  - indexacion solicitada y aceptada para los 3 articulos ES.
- Limitacion: base local Supabase no esta arrancada, por lo que la migracion no se aplico localmente.
- Cambio local ajeno `src/components/WineListAnalyzerTool.tsx` sigue fuera de alcance.

## Tareas pendientes inmediatas

1. Cerrado en la actualizacion superior: revision local de distribuidores y margenes lista para publicar.
2. Monitorizar Search Console en 48-72 horas:
   - `/article/como-catar-vino-en-cinco-pasos`;
   - `/article/vocabulario-de-cata-de-vino`;
   - `/article/maridajes-basicos-para-restaurantes`;
   - comprobar si pasan de `Descubierta` a `Rastreada` o indexada.
3. Si el lote ES progresa, solicitar indexacion selectiva de variantes internacionales prioritarias:
   - EN y PT primero por oportunidad comercial;
   - FR/IT/DE despues si no avanzan via sitemap.
4. Preparar segunda oleada:
   - tipos de vino explicados para restaurantes;
   - uvas que conocer para empezar;
   - regiones vinicolas para empezar.
5. Adaptar `Como lo hace Winerim` a producto y funnels tras publicar y revalidar distribuidores/margenes.

## Actualizacion 2026-06-30: retomar tras implementacion inicial `Como lo hace Winerim`

## Hechos

- Implementado componente `ConnectedCellarSection` en home.
- Ubicacion: despues de `HowItWorksSection`.
- Localizacion: `es/en/it/fr/de/pt`.
- Build local OK y QA local desktop/mobile OK.
- Ampliado el plan de `Aprender vino` con briefs para los tres primeros spokes.
- Cambio local ajeno en `src/components/WineListAnalyzerTool.tsx` sigue fuera de esta linea.

## Tareas pendientes inmediatas

1. Publicar frontend desde Lovable.
2. Revalidar produccion:
   - home desktop;
   - home mobile;
   - ausencia de overflow;
   - seccion visible despues de `Como funciona`;
   - CTAs a demo y analisis de carta.
3. Adaptar `Como lo hace Winerim` a producto:
   - candidato 1: `Winerim Supply`;
   - candidato 2: `Winerim Core`;
   - version corta para `go.winerim.wine` o futuras landings.
4. Confirmar alcance tecnico real antes de claims mas fuertes:
   - TPV;
   - albaranes;
   - facturas;
   - actualizacion de carta;
   - actualizacion de stock.
5. Siguiente paso editorial La RVF/Aprender vino:
   - crear migracion SQL o carga CMS para 3 temas x 6 idiomas;
   - incluir `related_links`;
   - actualizar hub `Aprender vino`;
   - validar sitemap/prerender/Search Console.

## Actualizacion 2026-06-30: retomar seccion `Como lo hace Winerim`

## Hechos

- Hay nuevos copys comerciales para testear sobre:
  - stock conectado a TPV;
  - margenes y rotacion;
  - albaranes/facturas/compras;
  - carta digital viva;
  - direccion/propietario;
  - sumiller/responsable de vino.
- La oportunidad es crear una seccion web que explique como Winerim convierte la bodega en un sistema conectado.

## Tareas pendientes inmediatas

1. Confirmar alcance real de integraciones:
   - TPV;
   - albaranes;
   - facturas;
   - actualizacion de stock;
   - actualizacion de carta.
2. Redactar seccion final con estructura recomendada:
   - H2: `Subes albaranes. Vendes botellas. Winerim mantiene tu bodega en orden.`;
   - subtitulo sobre TPV, compras, stock, carta y margen conectados;
   - bloque `Antes / Con Winerim`;
   - tarjetas de flujo: compras, ventas, carta, margen, decisiones;
   - CTA hacia demo o analisis de carta.
3. Decidir ubicacion inicial:
   - home, como bloque de conversion principal;
   - pagina de producto, como explicacion funcional;
   - version reducida en `go.winerim.wine` o futuras landings.
4. Evitar claims absolutos hasta confirmar integraciones; usar `cuando conectas tu TPV` y `con la integracion activa`.

## Actualizacion 2026-06-30: retomar tras re-test de `go.winerim.wine`

## Hechos

- Re-test exitoso de `https://go.winerim.wine/`:
  - lead: `codex-qa-go-retest-20260630154016@winerim.com`;
  - restaurante: `CODEx QA Go Retest 20260630154016`;
  - redireccion: `/gracias?tipo=demo&origen=meta`;
  - `contact_leads`: `201`;
  - `send-lead-notification`: `200`, `connect_forwarded:true`;
  - `submit-gastrofunnel`: `200`, upstream `success:true`, `lead_id=f388a0b4-bf19-4724-a1ed-f93211d05f13`.
- UTMs de la prueba:
  - `utm_source=codex_qa`;
  - `utm_medium=paid_social_retest`;
  - `utm_campaign=qa_20260630154016`;
  - `utm_content=form_retest`;
  - `utm_term=demo`;
  - `fbclid=codex_qa_retest_20260630154016`.
- Intento previo `codex-qa-go-retest-20260630153825@winerim.com` no envio formulario por faltar `phone_prefix`; no debe buscarse en CRM.
- Chat sigue fuera de alcance y la landing lo mantiene desactivado.

## Tareas pendientes inmediatas

1. Confirmar en Winerim Connect/CRM el lead `codex-qa-go-retest-20260630154016@winerim.com`.
2. Verificar que ese lead conserva UTMs y `fbclid`.
3. No buscar el email `codex-qa-go-retest-20260630153825@winerim.com` como lead creado.
4. Mantener `phone_prefix=ES` o equivalente en proximas automatizaciones de esta landing.

## Actualizacion 2026-06-30: retomar tras QA de formularios sin chat

## Hechos

- Chat queda fuera de alcance por decision del usuario.
- Formularios productivos validados tecnicamente:
  - `/demo`: `contact_leads 201`, `send-lead-notification 200`, `connect_forwarded:true`;
  - `/contacto`: `contact_leads 201`, `send-lead-notification 200`, `connect_forwarded:true`;
  - popup `/recursos`: `contact_leads 201`, `send-lead-notification 200`, `connect_forwarded:true`;
  - `go.winerim.wine`: `contact_leads 201`, `send-lead-notification 200`, `connect_forwarded:true`, `submit-gastrofunnel 200`, upstream `success:true`.
- Leads QA a buscar en CRM:
  - `codex-qa-demo-20260630125959@winerim.com`;
  - `codex-qa-contacto-20260630125959@winerim.com`;
  - `codex-qa-popup-20260630125959@winerim.com`;
  - `codex-qa-go-20260630125959@winerim.com`.
- La landing `go.winerim.wine` mantiene chat desactivado de forma esperada.

## Tareas pendientes inmediatas

1. Entrar en Winerim Connect/CRM y confirmar que los cuatro leads QA aparecen correctamente identificados.
2. Revisar que el lead de `go.winerim.wine` conserva UTMs de prueba:
   - `utm_source=codex_qa`;
   - `utm_medium=paid_social_test`;
   - `utm_campaign=qa_20260630125959`;
   - `utm_content=form_test`;
   - `utm_term=demo`;
   - `fbclid=codex_qa_20260630125959`.
3. No tocar chat hasta nueva orden del usuario.
4. Si se quiere dejar la consola de produccion mas limpia, investigar los `404` genericos observados en QA; no bloquearon los formularios.
5. Mantener fuera de esta linea el cambio local previo en `src/components/WineListAnalyzerTool.tsx`.

## Actualizacion 2026-06-30: retomar landing Meta Demo reforzada

## Hechos

- La landing reforzada ya esta publicada en `https://go.winerim.wine/` y muestra logo, `+2.000 restaurantes`, OpenGraph correcto y los tres testimonios reales.
- Se envio un formulario test en produccion; `contact_leads` respondio `201`, `send-lead-notification` respondio `200` y hubo redireccion a `/gracias?tipo=demo&origen=meta`.
- En el primer test aparecio una llamada adicional a `submit-gastrofunnel` con `HTTP 500`; despues se integro el commit remoto de Lovable `644db09`, que versiona esa funcion.
- Revalidacion posterior:
  - llamada directa a `submit-gastrofunnel`: `200`, upstream `success:true`;
  - segundo formulario productivo completo: `contact_leads` `201`, `send-lead-notification` `200`, `submit-gastrofunnel` `200`, redireccion a gracias.
- La landing Meta Demo ya esta reforzada en codigo local:
  - logo real de Winerim en cabecera;
  - OpenGraph con `https://winerim.wine/og-image.png`;
  - stat unificado a `+2.000 restaurantes`;
  - tres testimonios reales sustituyendo plantillas;
  - formulario conectado a Supabase por `onSubmit`;
  - notificacion esperada con `await notifyLead`;
  - Edge Function preparada para reenviar UTMs/`fbclid` al CRM.
- Validaciones locales pasadas: `npm run build`, `deno check` de `send-lead-notification`, `git diff --check` y prueba Playwright/Chrome de envio.
- La prueba local creo un lead test con respuesta `201` de `contact_leads` y `200` de `send-lead-notification`, y redirigio a `/gracias?tipo=demo&origen=meta`.
- El CLI local no puede desplegar `send-lead-notification` por falta de `SUPABASE_ACCESS_TOKEN`.
- Hay un cambio local previo en `src/components/WineListAnalyzerTool.tsx`; no forma parte de esta tarea.

## Tareas pendientes inmediatas

1. Confirmar en Winerim Connect/CRM que entraron estos leads test con UTMs y `fbclid`:
   - `codex-prod-test+winerim-meta@winerim.com`;
   - `codex-diagnostic+winerim-gastrofunnel@winerim.com`;
   - `codex-prod-retest+winerim-meta@winerim.com`.
2. Revisar en Lovable/Supabase si la Edge Function `send-lead-notification` esta desplegada desde el commit `34b6900`; si no, desplegarla para mantener el envio CRM obligatorio dentro de esa funcion.
3. Monitorizar durante las primeras campanas que `submit-gastrofunnel` siga devolviendo `200`.
4. Si el CRM no muestra algun lead, revisar primero:
   - `WINERIM_CONNECT_WEBHOOK_URL` en `send-lead-notification`;
   - `WINERIM_API_KEY` y `WINERIM_ANON_KEY` en `submit-gastrofunnel`;
   - logs del upstream `https://edwuzzmeunzgsrejlmwr.supabase.co/functions/v1/leads-upsert`.
5. No repetir DNS, Worker ni frontend de la landing salvo cambios nuevos; `go.winerim.wine` ya sirve la version reforzada y mantiene `noindex, follow`.
6. No mezclar con `src/components/WineListAnalyzerTool.tsx` salvo que el usuario pida retomar esa linea.

## Actualizacion 2026-06-30: retomar landing Meta Demo

## Hechos

- El audio recibido confirma que los materiales de campana son: cuenta publicitaria, identificador de conjunto de datos/pixel, codigo Pixel, UTMs, captura de configuracion de campos ocultos y HTML de landing.
- La landing de campanas esta implementada y pusheada en `/meta-demo`.
- `go.winerim.wine` es el subdominio recomendado; `demo.winerim.wine` ya resolvia en DNS en la comprobacion local.
- La landing captura UTMs ocultos y se integra con `contact_leads`, notificaciones, eventos existentes y Pixel Meta consent-aware.
- `/meta-demo` esta marcada como `noindex` en React/SEOHead y en Cloudflare Worker.
- El chat externo y el popup global quedan desactivados para la landing.
- Validaciones locales completadas:
  - build OK;
  - Worker dry-run OK;
  - desktop/mobile sin overflow;
  - hidden UTMs rellenados correctamente con parametros de prueba.
- Commit publicado en GitHub: `43e1cae feat: add meta demo campaign landing`.
- Cloudflare Worker desplegado: `winerim-proxy` version `635e8855-8d39-4473-b37c-f3566653dd70`.
- `https://winerim.wine/meta-demo` ya responde `HTTP 200` y `noindex`, pero todavia renderiza la home antigua porque falta publicar el frontend desde Lovable.
- DNS creado: `go.winerim.wine` como `A 185.158.133.1`, proxied, TTL Auto.
- Ruta Worker creada: `go.winerim.wine/*` asociada a `winerim-proxy`; `winerim.wine/*` se mantiene.
- Cloudflare Worker redeployado con version `e850fe30-c8de-4fef-b7da-5bce3ea11667` para que todo `go.winerim.wine` sea `noindex, follow`.
- `https://go.winerim.wine/` ya responde `HTTP 200` y `noindex`, pero todavia renderiza la home antigua porque falta publicar el frontend desde Lovable.

## Tareas pendientes inmediatas

1. Publicar frontend desde Lovable para que `https://winerim.wine/meta-demo` muestre la landing real del commit `43e1cae`.
2. No repetir deploy de Worker salvo cambio de ruta/DNS; `/meta-demo` ya esta incluido como `noindex` en produccion.
3. No repetir configuracion de `go.winerim.wine`; DNS y route ya estan activos.
4. Validar produccion tras el publish de Lovable:
   - `https://winerim.wine/meta-demo?utm_source=meta&utm_medium=paid_social&utm_campaign=test&utm_content=ad&utm_term=demo`;
   - `https://go.winerim.wine/?utm_source=meta&utm_medium=paid_social&utm_campaign=test&utm_content=ad&utm_term=demo`;
   - H1, formulario, noindex, ausencia de chat externo, ausencia de popup global y hidden UTMs.
5. Probar un envio real controlado del formulario y confirmar:
   - fila en `contact_leads`;
   - `message` contiene attribution JSON;
   - email/webhook/notificacion llegan;
   - evento Lead de Meta/ads solo se dispara si hay consentimiento.
6. Confirmar el claim de prueba social:
   - si `+1.000 bodegas gestionadas` y `+2.000 restaurantes` son metricas distintas, documentar ambas;
   - si una esta desactualizada, unificar copy antes de escalar campana.
7. Reemplazar los tres casos pendientes por testimonios reales o retirar esa seccion si no hay prueba suficiente.

## Actualizacion 2026-06-29: retomar tras auditoria de publicaciones y pendientes

Nota 2026-06-30: esta lista queda actualizada por la implementacion en codigo de `Aprender vino`. La tarea viva ya no es crear el hub dentro de Biblioteca, sino desplegarlo, validarlo y preparar sus spokes.

## Hechos

- Los articulos del cluster de biblioteca del vino del 2026-06-01 estan publicados, marcados como `published=true`, presentes en sitemap y validan como Googlebot con prerender correcto.
- Produccion tiene `440` URLs de articulos en sitemap.
- El hub de iniciacion inspirado por La RVF ya esta implementado en codigo como `Aprender vino`, separado de `Biblioteca del vino`.
- Las rutas antiguas previstas del hub quedan como aliases/redirects legacy; las canonicas nuevas son `/aprender-vino` y sus variantes localizadas.

## Tareas pendientes inmediatas

1. Hacer commit y push del hub `Aprender vino`:
   - ES `/aprender-vino`;
   - EN `/en/learn-wine`;
   - FR `/fr/apprendre-le-vin`;
   - IT `/it/imparare-il-vino`;
   - DE `/de/wein-lernen`;
   - PT `/pt/aprender-vinho`.
2. Desplegar Cloudflare Worker, frontend Lovable y Supabase `sitemap`/`prerender`.
3. Validar produccion:
   - status `200` humano;
   - Googlebot `200`;
   - titulo/H1/canonical especificos;
   - `hreflang`;
   - presencia en `/sitemap.xml`;
   - enlaces internos hacia glosario, uvas, regiones, estilos, maridajes, analisis de carta y demo.
4. Reenviar `/sitemap.xml` en Search Console cuando produccion tenga las URLs nuevas.
5. Crear contenido propio por niveles:
   - entender la botella;
   - catar y describir;
   - uvas, regiones y estilos;
   - maridajes basicos;
   - servicio, conservacion y recomendacion en sala.
6. Despues del hub, crear primera tanda de articulos de iniciacion y enlazarlos desde el hub.

## Actualizacion 2026-06-19: retomar tras correccion de `/presentacion`

## Hechos

- `/presentacion` ya no devuelve `404` en produccion.
- La causa fue Cloudflare Worker: la ruta existia en React y sitemap, pero no estaba permitida por `SEO_EXACT`.
- Las seis rutas de presentacion ya responden `200` para usuarios.
- Las seis rutas responden `200` para Googlebot con `x-worker-branch: worker-static-prerender`.
- Worker desplegado: `807319ba-4743-47ad-87e9-401e8d952efe`.

## Tareas pendientes inmediatas

1. No hace falta actuar en Lovable para este bug: el bloqueo estaba en Cloudflare Worker y ya esta desplegado.
2. Mantener como deuda tecnica menor: mover o duplicar el prerender de presentacion en Supabase `prerender` para que el Worker no tenga contenido SEO estatico de esta pagina.
3. En futuras rutas publicas, validar siempre:
   - ruta React;
   - inclusion en sitemap si es indexable;
   - inclusion en Worker;
   - respuesta humana `200`;
   - respuesta Googlebot `200` con canonical/titulo correctos.
4. Continuar despues con el despliegue/validacion de `Aprender vino`.

## Actualizacion 2026-06-19: retomar `Como empezar con el vino`

Nota 2026-06-30: esta propuesta queda superada por la decision de separar la capa como `Aprender vino`, con rutas canonicas nuevas y redirects desde las URLs previstas antiguas.

## Hechos

- La revision de La RVF confirma que una biblioteca fuerte necesita un hub de iniciacion, subhubs tematicos y articulos atomicos evergreen.
- Winerim ya dispone de biblioteca, glosario, cursos, maridajes, regiones, estilos, guias, Barometro y activos de conversion.
- La oportunidad no es copiar La RVF, sino ordenar Winerim como recorrido guiado propio para usuarios principiantes y equipos de sala.

## Tareas pendientes inmediatas

1. Publicar y validar el hub localizado `Aprender vino`:
   - ES `/aprender-vino`;
   - EN `/en/learn-wine`;
   - FR `/fr/apprendre-le-vin`;
   - IT `/it/imparare-il-vino`;
   - DE `/de/wein-lernen`;
   - PT `/pt/aprender-vinho`.
2. Estructurar el hub por niveles:
   - entender la botella;
   - catar y describir;
   - uvas, regiones y estilos;
   - maridajes basicos;
   - servicio, conservacion y recomendacion en sala.
3. Crear primera tanda de articulos propios:
   - como empezar a aprender vino desde cero;
   - como catar vino en cinco pasos;
   - palabras para describir un vino;
   - tipos de vino;
   - que es una uva o cepa;
   - diferencia entre uva, region, DO/AOC, bodega y anada;
   - como leer una etiqueta;
   - temperatura de servicio;
   - que copa usar;
   - como conservar una botella abierta;
   - defectos del vino;
   - maridajes basicos;
   - como recomendar vino en sala sin ser sumiller;
   - como formar a un equipo de sala en vino.
4. Conectar cada articulo a entidades existentes de biblioteca: uvas, regiones, estilos y maridajes.
5. Actualizar rutas React, sitemap, prerender, `llms.txt`, `llms-full.txt`, canonicals, hreflang y schema.
6. Validar localmente con build/test SEO y luego validar produccion tras deploy desde Lovable.

## Actualizacion 2026-06-13: retomar tras seguimiento Search Console del Barometro

## Hechos

- Search Console ya rastreo el Barometro.
- EN y PT del Barometro aparecen indexadas.
- ES, IT, FR y DE estan `Rastreada: actualmente sin indexar`.
- Se solicitaron indexaciones manuales para ES, IT, FR y DE el 2026-06-13.
- Produccion ya expone `Dataset.license` localizado en las seis variantes tras commit `3ddbbe2`, Worker `5d2c0d9c-b596-4796-99fb-2ac5af00636e` y deploy Lovable de `prerender`/frontend.
- Search Console mostro `719` paginas indexadas, `2.600` no indexadas y Core Web Vitals con `153` URLs en `Necesita mejorar` en movil y ordenador.

## Tareas pendientes inmediatas

1. Revisar en 48-72 horas estas URLs:
   - `https://winerim.wine/barometro-cartas-vino-2026`;
   - `https://winerim.wine/it/barometro-carte-vini-2026`;
   - `https://winerim.wine/fr/barometre-cartes-vins-2026`;
   - `https://winerim.wine/de/weinkarten-barometer-2026`.
2. Confirmar que EN y PT siguen indexadas.
3. Revisar el informe de `Conjuntos de datos` para confirmar si desaparece `Falta el campo "license"`.
4. No repetir solicitudes manuales de indexacion salvo que Search Console muestre error nuevo; varias solicitudes no aumentan prioridad.
5. Auditar Core Web Vitals como siguiente linea tecnica: Search Console muestra `153` URLs en `Necesita mejorar` en movil y ordenador.
6. Preparar la siguiente version del Barometro con dataset real, muestra minima y reglas de anonimato.

## Actualizacion 2026-06-11: retomar tras limpiar Worker del Barometro

## Hechos

- Search Console ya recibio la solicitud de indexacion para `https://winerim.wine/barometro-cartas-vino-2026`.
- `sitemap.xml` ya fue reenviado y leido el `11 jun 2026`.
- El sitemap figura como `Correcto` con `2.234` paginas descubiertas.
- El aumento desde `2.228` a `2.234` confirma que Search Console ya reconoce las seis URLs nuevas del Barometro en el sitemap.
- Lovable ya desplego las Edge Functions `sitemap` y `prerender`.
- Produccion ya sirve el Barometro a Googlebot desde Supabase `prerender` con `x-worker-branch: bot-prerender`.
- Cloudflare Worker `winerim-proxy` quedo desplegado en version `356db317-9985-41de-a1a1-ac6ed6baba6f` sin el prerender estatico temporal del Barometro.

## Tareas pendientes inmediatas

1. Revisar en 24-72 horas la inspeccion de `https://winerim.wine/barometro-cartas-vino-2026`.
2. Comprobar si el estado cambia de `Google no reconoce esta URL` a rastreada, descubierta o indexada.
3. Revisar cobertura de las variantes:
   - `/en/wine-list-barometer-2026`;
   - `/it/barometro-carte-vini-2026`;
   - `/fr/barometre-cartes-vins-2026`;
   - `/de/weinkarten-barometer-2026`;
   - `/pt/barometro-cartas-vinhos-2026`.
4. Si las variantes no aparecen en Search Console tras varios dias, inspeccionar y solicitar indexacion manual selectiva.
5. Si Supabase se mantiene estable varios dias, valorar retirar el fallback de sitemap del Worker.
6. Conseguir `SUPABASE_ACCESS_TOKEN` o sesion CLI para no depender de Lovable en futuros deploys SEO.

## Actualizacion 2026-06-11: retomar tras publicar Barometro Winerim

## Hechos

- El Barometro Winerim ya esta publicado en produccion.
- Commits en `origin/main`:
  - `4020e5a feat: add Winerim wine list barometer`;
  - `aed4328 fix: serve barometer through worker`.
- Lovable quedo publicado y `Up to date`.
- Cloudflare Worker `winerim-proxy` quedo desplegado en version `ec48088d-62b0-4d3e-85c0-8d9cc74760e1`.
- Las seis rutas localizadas del Barometro responden `200` en produccion.
- Googlebot recibe prerender correcto en la URL principal con `Report`, `Dataset`, canonical y `hreflang`.
- `/sitemap.xml` ya contiene las seis URLs del Barometro.
- Supabase Edge Functions no quedaron desplegadas por CLI porque falta `SUPABASE_ACCESS_TOKEN`; el Worker cubre la publicacion actual.

## Tareas pendientes inmediatas

1. En Search Console, inspeccionar `https://winerim.wine/barometro-cartas-vino-2026` y solicitar indexacion si la herramienta lo permite.
2. Revisar en 24-72 horas:
   - si Search Console descubre las seis URLs desde sitemap;
   - si alguna aparece como `Descubierta: actualmente sin indexar`;
   - si hay errores de canonical, idioma o duplicadas.
3. Cuando haya `SUPABASE_ACCESS_TOKEN` o sesion Supabase CLI, ejecutar:
   - `npm run deploy:supabase:seo`.
4. Tras desplegar Supabase, confirmar que el Worker ya no necesita inyectar el Barometro como puente temporal.
5. Preparar la segunda version del Barometro:
   - dataset real;
   - periodo de analisis;
   - muestra minima;
   - umbrales de anonimato;
   - segmentos por tipo de negocio/pais si hay masa suficiente.
6. Revisar `/analisis-carta` en produccion para confirmar H1, copy, CTA y formulario tras el publish de Lovable.

## Actualizacion 2026-06-10: retomar tras implementar Barometro Winerim

## Hechos

- El Barometro Winerim de cartas de vino 2026 ya esta implementado en codigo.
- La pagina principal es `/barometro-cartas-vino-2026`.
- Existen variantes localizadas para `en`, `it`, `fr`, `de` y `pt`.
- Sitemap, prerender, `llms.txt`, `llms-full.txt`, rutas React, `ROUTE_MAP`, `sitemap-extra.json` y enlaces internos ya fueron actualizados.
- Validaciones locales completadas:
  - build;
  - test SEO enfocado;
  - `deno check`;
  - JSON de `sitemap-extra.json`;
  - `git diff --check`;
  - QA local desktop/mobile.

## Tareas pendientes inmediatas

1. Desplegar desde Lovable el frontend y las Edge Functions afectadas (`sitemap` y `prerender`).
2. Validar produccion:
   - `/barometro-cartas-vino-2026`;
   - `/en/wine-list-barometer-2026`;
   - `/it/barometro-carte-vini-2026`;
   - `/fr/barometre-cartes-vins-2026`;
   - `/de/weinkarten-barometer-2026`;
   - `/pt/barometro-cartas-vinhos-2026`.
3. Validar como Googlebot que la pagina devuelve `x-prerendered: true`, canonical propio, idioma correcto, schema `Report`/`Dataset` y enlaces internos reales.
4. Reenviar o inspeccionar en Search Console la URL principal tras deploy.
5. Definir el dataset real del Barometro Winerim 2026:
   - cartas analizadas;
   - referencias por carta;
   - precios botella/copa;
   - regiones, uvas, estilos y denominaciones;
   - venta por copa;
   - rotacion/stock si existe;
   - tipo de negocio, pais/ciudad y ticket medio si se puede anonimizar.
6. Convertir la siguiente version del barometro en estudio con cifras reales solo cuando haya metodologia, muestra y anonimato suficientes.

## Actualizacion 2026-06-10: retomar tras refuerzo de `/analisis-carta`

## Hechos

- `/analisis-carta` ahora usa un `<h1>` real en el encabezado principal del analizador.
- El copy principal se oriento a margen perdido, envio en 30 segundos e informe personalizado en menos de 48 h.
- Build y `git diff --check` pasaron correctamente.

## Tareas pendientes inmediatas

1. Desplegar los cambios desde Lovable o el flujo operativo vigente.
2. Validar produccion humana en `/analisis-carta`:
   - H1 visible correcto;
   - CTA visible y entendible;
   - no solape en mobile;
   - formulario funcionando en modos URL, texto y archivo.
3. Si se puede acceder a analitica/eventos:
   - medir clicks en URL, texto y archivo;
   - medir envio de formulario;
   - medir desbloqueo de informe completo.
4. Preparar el siguiente bloque de conversion:
   - ejemplo visual de informe;
   - seccion "que recibiras" mas tangible;
   - enlace contextual a futuros benchmarks/barometro.

## Actualizacion 2026-06-10: retomar autoridad propia de Winerim

## Hechos

- El `Wine List Score` ya existe y debe funcionar como ancla de captacion, no como tarea nueva.
- Existen superficies publicas para `WineListBenchmark`, `BenchmarksPlaybooks` y `Comparativas`.
- La propuesta pendiente se centra en desarrollar:
  - Barometro Winerim 2026;
  - benchmarks agregados publicables;
  - guias por vertical/problema;
  - comparativas BOFU adicionales;
  - schema reforzado;
  - propuesta de home antes/despues.

## Tareas pendientes inmediatas

1. Datos para Barometro:
   - inventario de cartas analizadas;
   - numero de referencias por carta;
   - precios botella y copa;
   - estilos, regiones, uvas y denominaciones;
   - vinos por copa;
   - ventas/rotacion si existen;
   - stock muerto/capital inmovilizado si existe;
   - tipo de negocio, pais/ciudad y ticket medio si se puede anonimizar.
2. Metodologia:
   - definir periodo de datos;
   - definir muestra minima por segmento;
   - fijar umbrales de anonimato;
   - separar datos observados, inferencias e hipotesis.
3. Publicacion:
   - convertir `WineListBenchmark` de cifras estaticas a pieza con metodologia y datos defendibles;
   - crear pagina/reporte `Barometro Winerim 2026`;
   - anadir schema `Dataset`, `Report`, `FAQPage` e `ItemList` donde corresponda.
4. Guias y comparativas:
   - crear primeras guias por vertical: restaurantes sin sommelier, hoteles, grupos, wine bars y restaurantes gastronomicos;
   - ampliar comparativas hacia Excel, consultor externo, menu digital generico, software de inventario y carta PDF/QR.
5. Home:
   - revisar propuesta antes/despues y, si se aprueba, implementar el nuevo framing centrado en diagnostico y datos propios.

## Actualizacion 2026-06-10: SEO/LLM inicial de Spiritsrim publicado

## Hechos

- Spiritsrim ya tiene home castellana enriquecida, pagina `/software-carta-destilados`, fichas prioritarias con narrativa SEO y prerender estatico para todas las URLs del sitemap.
- `sitemap.xml` queda en `325` URLs.
- Despliegue activo en Cloudflare Pages: `https://b77c1545.spiritsrim.pages.dev`.
- Produccion validada con HTML estatico y canonicals correctos en home, producto, biblioteca, Tequila, Negroni y sitemap.
- Search Console ya muestra el sitemap como `Correcto`, ultima lectura 2026-06-10 y `325` paginas descubiertas.

## Tareas pendientes inmediatas

1. Monitorizar Search Console durante los proximos dias: cobertura, paginas descubiertas e indexacion inicial.
2. Enriquecer segunda tanda de entidades: `bourbon`, `scotch`, `vermouth`, `agave`, `blue-agave`, `espresso-martini`, `manhattan`, `gin-tonic`.
3. Crear primeros clusters editoriales en castellano.
4. Decidir si `www` debe servir contenido o redirigir a apex.

## Actualizacion 2026-06-09: activar dominio Spiritsrim en Cloudflare

## Hechos

- Spiritsrim ya esta publicado en Cloudflare Pages: `https://spiritsrim.pages.dev/`.
- `spiritsrim.com` y `www.spiritsrim.com` estan añadidos a Pages y estan `active`.
- La zona `spiritsrim.com` ya esta creada en Cloudflare y DNS esta preparado hacia `spiritsrim.pages.dev`.
- OVH acepto la solicitud de cambio de nameservers desde `dns-parking.com` a `april.ns.cloudflare.com` y `nash.ns.cloudflare.com`.
- DNS publico ya delega en Cloudflare.
- Validacion final completada con `HTTP/2 200` en apex, `www`, sitemap y ruta profunda de biblioteca.
- Search Console tiene verificada la propiedad de dominio `sc-domain:spiritsrim.com` mediante TXT DNS en Cloudflare.
- `https://spiritsrim.com/sitemap.xml` fue enviado, leido el 2026-06-09 y figura como `Correcto` con `324` paginas descubiertas.
- El token local no tiene permiso para crear la zona Cloudflare.

## Tareas pendientes inmediatas

1. Monitorizar Search Console tras el primer recrawl: cobertura, paginas descubiertas e indexacion inicial.
2. Decidir si `www` debe servir contenido o redirigir a apex.
3. Revisar en 24-48 horas si quedan caches DNS antiguas en resolvers residuales.

## Actualizacion 2026-06-09: continuar Spiritsrim tras crear base separada

## Hechos

- Existe un repo separado de Spiritsrim en `/Users/GOIKO/spiritsrim`.
- El repo nuevo no tiene remoto configurado.
- La base publica inicial ya incluye home, biblioteca de destilados multilingue, sitemap, prerender, redirects, Worker, robots, llms, manifest, OG image, favicons, tests y validaciones locales.
- El dominio tecnico usado en codigo es provisionalmente `https://spiritsrim.com`.
- El servidor local quedo activo en `http://127.0.0.1:8080/`.

## Decisiones

- Continuar el trabajo de implementacion en `/Users/GOIKO/spiritsrim`, no en el repo Winerim.
- No desplegar hasta confirmar dominio final, Lovable, Supabase, Cloudflare y destino de leads.
- Mantener el foco siguiente en operativa real y QA productivo, no en volumen editorial.

## Hipotesis

- La siguiente sesion deberia poder empezar desde validacion visual, configuracion de proyecto Lovable/Supabase y conexion de formularios.

## Tareas pendientes inmediatas

1. Confirmar dominio final y si `spiritsrim.com` es correcto.
2. Crear/confirmar proyecto Lovable de Spiritsrim y actualizar `SPIRITSRIM_ORIGIN`.
3. Crear/confirmar Supabase separado y sustituir placeholders.
4. Configurar Cloudflare Worker `spiritsrim-proxy` con `PRERENDER_URL`, `SITEMAP_URL`, `ORIGIN` y `SITE_URL`.
5. Confirmar lead routing/email/CRM para demo/contacto.
6. Revisar visualmente home y biblioteca en desktop/mobile con navegador.
7. Desplegar y validar:
   - home humana;
   - biblioteca ES/EN/PT/DE;
   - ficha de categoria, origen, materia prima y coctel;
   - Googlebot con `x-prerendered: true`;
   - `/sitemap.xml`, `/robots.txt`, `/llms.txt`.

## Actualizacion 2026-06-09: retomar Spiritsrim en tarea separada

## Hechos

- Existe `SPIRITSRIM_CODEX_HANDOFF.md` en la raiz del repo.
- El handoff esta pensado para crear una tarea nueva de Codex y construir Spiritsrim usando Winerim como base tecnica y SEO.
- Winerim no se ha modificado funcionalmente en esta sesion.

## Decisiones

- Spiritsrim debe tratarse como proyecto separado.
- La tarea nueva debe leer primero:
  - `PROJECT_CONTEXT.md`;
  - `CURRENT_STATE.md`;
  - `DECISIONS_LOG.md`;
  - `NEXT_STEPS.md`;
  - `SPIRITSRIM_CODEX_HANDOFF.md`.
- No se debe tocar produccion Winerim para crear Spiritsrim.

## Hipotesis

- El primer bloque de Spiritsrim deberia ser un clon controlado de arquitectura, no una reescritura desde cero.
- La salida mas robusta sera crear primero marca, rutas, biblioteca de destilados, sitemap/prerender y validaciones antes de ampliar blog o herramientas.

## Tareas pendientes inmediatas

1. Abrir nueva tarea Codex para Spiritsrim.
2. Confirmar datos operativos:
   - dominio final;
   - proyecto Lovable;
   - repo o fork;
   - proyecto Supabase;
   - Worker/Cloudflare;
   - Search Console;
   - destino de formularios/leads.
3. Confirmar marca:
   - logo;
   - favicon;
   - OG image;
   - paleta;
   - tono visual;
   - claims permitidos.
4. Confirmar alcance inicial:
   - idiomas;
   - mercados prioritarios;
   - verticales;
   - herramientas que deben salir en v1;
   - si hay logos/clientes autorizados.

## Actualizacion 2026-06-08: retomar tras reenvio de sitemap e indexacion selectiva

## Hechos

- `main` sigue limpio funcionalmente; en esta sesion no se cambio codigo de aplicacion.
- Se trabajo con Search Console en la propiedad URL-prefix `https://winerim.wine/`.
- `/sitemap.xml` fue reenviado y Search Console lo muestra como `Correcto`, ultimo rastreo 2026-06-08 y 2.228 URLs descubiertas.
- `/sitemap_index.xml` seguia mostrando ultimo rastreo 2026-06-06 y 2.098 paginas descubiertas.
- Search Console acepto solicitudes manuales de indexacion para:
  - `https://winerim.wine/pt/biblioteca-vinho/harmonizacoes/ceviche`;
  - `https://winerim.wine/pt/biblioteca-vinho/regioes/grecia/santorini`;
  - `https://winerim.wine/de/weinbibliothek/weinstile/franciacorta`.
- Las tres URLs solicitadas estaban en estado `Descubierta: actualmente sin indexar` y presentes en sitemap.
- `https://winerim.wine/biblioteca-vino` y `https://winerim.wine/biblioteca-vino/maridajes` ya aparecen indexadas en Search Console.
- Produccion tecnica de la quinta tanda sigue validada: sitemap con 2.228 URLs, prerender correcto y fichas nuevas servibles.

## Decisiones

- No repetir solicitud manual sobre hubs que ya estan indexados.
- Mantener indexacion manual como apoyo selectivo, no como estrategia principal de escalado.
- La siguiente mejora debe reforzar rastreo y autoridad desde enlaces internos y contenido editorial, no solo seguir solicitando URLs una a una.
- Tratar `/sitemap_index.xml` como punto a revisar si sigue quedando desfasado frente a `/sitemap.xml`.

## Hipotesis

- La discrepancia entre 102 paginas indexadas y 2.228 URLs descubiertas refleja retraso de Google y baja prioridad de cola para fichas nuevas, no un bloqueo tecnico general.
- Las fichas nuevas deberian mejorar su probabilidad de indexacion si reciben mas enlaces internos desde hubs, fichas relacionadas y articulos por idioma.
- El cluster de maridajes puede ser la via mas rapida para captar long-tail porque conecta intencion de busqueda humana con entidades nuevas ya maduras.

## Tareas pendientes inmediatas

1. Search Console:
   - revisar en unos dias Ceviche PT, Santorini PT y Franciacorta DE;
   - comprobar si baja `Descubierta: actualmente sin indexar`;
   - revisar si `/sitemap_index.xml` conviene reenviarlo o retirarlo como referencia secundaria.
2. Enlazado interno:
   - reforzar hubs de regiones, estilos y maridajes hacia las nuevas entidades;
   - anadir enlaces contextuales desde fichas relacionadas maduras;
   - evitar que entidades nuevas dependan solo del sitemap para ser descubiertas.
3. Contenido:
   - preparar clusters de blog por idioma para `ceviche`, `jamon-iberico`, `thai-curry` y `tarta-de-queso`;
   - enlazar cada articulo a ficha de biblioteca, herramienta relevante y demo;
   - adaptar por mercado, no traducir literalmente.
4. Proyecto separado:
   - planificar slugs localizados con mapa completo, redirects 301, canonicals, hreflang, sitemap y validacion antes/despues.

## Actualizacion 2026-06-08: retomar tras quinta tanda editorial publicada

## Hechos

- `main` contiene y tiene pusheado `3954369 feat: expand wine library entity editorial coverage`.
- Lovable `Web Winerim` desplego `prerender` y `sitemap` desde `3954369` y publico frontend; el panel quedo `Up to date`.
- La biblioteca del vino tiene perfiles editoriales visibles para 40 uvas, 34 regiones, 25 estilos y 30 maridajes/platos prioritarios.
- Produccion Googlebot validada:
  - `/pt/biblioteca-vinho/regioes/grecia/santorini`: `200`, `bot-prerender`, `x-prerendered: true`, canonical propio, `lang="pt"`, schema enriquecido, contenido editorial y sin fallback.
  - `/de/weinbibliothek/weinstile/franciacorta`: `200`, `bot-prerender`, `x-prerendered: true`, canonical propio, `lang="de"`, schema enriquecido, contenido editorial y sin fallback.
  - `/pt/biblioteca-vinho/harmonizacoes/ceviche`: `200`, `bot-prerender`, `x-prerendered: true`, canonical propio, `lang="pt"`, schema enriquecido, contenido editorial y sin fallback.
- Produccion humana validada en `/pt/biblioteca-vinho/harmonizacoes/ceviche`: perfil propio, `Papel na carta`, `branco gastronomico`, canonical propio, sin fallback y sin lectura de `tinto elegante`.
- `/sitemap.xml` responde `200`, contiene 2.228 URLs y no faltan las variantes `es/de/pt` revisadas de `chianti-classico`, `brunello-di-montalcino`, `soave`, `etna`, `jamon-iberico`, `thai-curry` y `tarta-de-queso`.
- Validaciones locales completadas: tests enfocados, `deno check`, suite completa, build, `git diff --check`, revision local de sitemap sin duplicados y navegador local.
- No se toco Cloudflare Worker.
- No se toco base de datos.

## Decisiones

- La quinta tanda editorial queda cerrada solo porque ya esta validada en local, Lovable y produccion.
- Mantener como siguiente prioridad Search Console e indexacion selectiva, no otra tanda grande inmediata sin observar recrawl.
- Seguir tratando la localizacion de slugs de entidad como proyecto SEO separado.

## Hipotesis

- Search Console deberia empezar a descubrir las nuevas rutas cuando recrawlee `/sitemap.xml`, aunque puede tardar dias o semanas.
- El siguiente salto vendra de reforzar enlaces internos y contenido de apoyo hacia las nuevas fichas, no solo de seguir sumando entidades.
- Las nuevas fichas de maridaje pueden apoyar clusters de blog por idioma si se publican articulos conectados.

## Tareas pendientes inmediatas

1. Search Console:
   - revisar fecha de ultimo rastreo de `/sitemap.xml`;
   - comprobar si aparecen las nuevas URLs en cobertura;
   - solicitar indexacion selectiva de hubs y 5-10 fichas nuevas si la herramienta lo permite.
2. Enlazado interno:
   - reforzar hubs de regiones, estilos y maridajes hacia las nuevas prioridades;
   - anadir enlaces contextuales desde fichas relacionadas ya maduras;
   - revisar que nuevos perfiles no queden aislados del grafo estrategico.
3. Contenido:
   - preparar clusters de blog por idioma alrededor de maridajes de alta intencion (`ceviche`, `jamon-iberico`, `thai-curry`, `tarta-de-queso`);
   - enlazar esos articulos a biblioteca, herramientas y demo.
4. Proyecto separado:
   - planificar slugs localizados con mapa completo, redirects 301, canonicals, hreflang, sitemap y validacion antes/despues.

## Actualizacion 2026-06-08: retomar tras deploy de schema enriquecido de entidades

## Hechos

- `main` contiene y tiene pusheado `70bb44e feat: enrich wine library entity schema`.
- `main` tambien contiene y tiene pusheado `69d2fbf docs: record wine library entity schema rollout`.
- La mejora extiende el schema enriquecido de biblioteca a regiones, estilos y maridajes.
- React humano y `supabase/functions/prerender/index.ts` quedan sincronizados con el patron:
  - `WebPage`;
  - `Article`;
  - `DefinedTermSet`;
  - `DefinedTerm`;
  - `mentions` internas localizadas.
- Validaciones locales completadas:
  - `npm run test -- --run src/test/grape-detail-render.test.tsx src/test/wine-library-seo-surface.test.ts`: 26 tests.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts`.
  - `git diff --check`.
  - En la misma sesion tambien se validaron suite completa, build y navegador local.
- Lovable `Web Winerim` desplego Supabase Edge Function `prerender` desde `69d2fbf` y publico el frontend; el panel quedo `Published` / `Up to date`.
- Produccion validada independientemente como Googlebot:
  - `/pt/biblioteca-vinho/regioes/portugal/vinho-verde`: `200`, `bot-prerender`, `x-prerendered: true`, canonical propio, `lang="pt"`, schema completo y 9 `mentions`.
  - `/de/weinbibliothek/weinstile/espumoso`: `200`, `bot-prerender`, `x-prerendered: true`, canonical propio, `lang="de"`, schema completo y 10 `mentions`.
  - `/pt/biblioteca-vinho/harmonizacoes/lubina-dorada`: `200`, `bot-prerender`, `x-prerendered: true`, canonical propio, `lang="pt"`, schema completo y 10 `mentions`.
- No se toco Cloudflare Worker.
- No se toco base de datos.

## Decisiones

- La capa de schema enriquecido para regiones, estilos y maridajes queda cerrada como deploy productivo.
- Mantener los slugs de entidad actuales; cualquier localizacion de slugs sigue siendo una migracion SEO separada.
- No iniciar cambios de Worker para esta linea salvo que una validacion productiva lo exija.

## Hipotesis

- La mejora puede reforzar lectura por Googlebot y LLMs al conectar fichas no-uva con entidades relacionadas.
- El mayor salto editorial pendiente sigue siendo convertir mas regiones, estilos y maridajes de fallback a perfiles visibles propios.

## Tareas pendientes inmediatas

1. Monitorizar Search Console:
   - recrawl de hubs de biblioteca;
   - ejemplos de regiones, estilos y maridajes;
   - evolucion de `Descubierta: actualmente sin indexar`.
2. Solicitar indexacion selectiva solo de una tanda corta si Search Console lo permite sin error.
3. Siguiente bloque editorial:
   - perfiles propios para regiones prioritarias que aun dependan de fallback;
   - perfiles propios para maridajes de alta intencion;
   - perfiles propios para estilos con demanda de busqueda y valor de carta.
4. Preparar, como proyecto separado, la migracion de slugs localizados:
   - mapa completo por idioma;
   - redirects 301;
   - canonicals nuevos;
   - hreflang y sitemap;
   - validacion antes/despues en Search Console.

## Actualizacion 2026-06-08: retomar tras deploy de sitemap estrategico

## Hechos

- `main` incluye y tiene pusheado `6d0c2cf fix: include strategic wine library targets in sitemap`.
- `7a1745a fix: sync prerender grape strategic links` quedo desplegado en `prerender` y validado en produccion como Googlebot.
- `6d0c2cf` quedo desplegado en la Edge Function `sitemap` desde Lovable `Web Winerim`.
- Produccion `/sitemap.xml` responde `200` y contiene 2.150 URLs.
- Las 54 variantes de las 9 rutas estrategicas nuevas estan presentes en sitemap en `es`, `en`, `it`, `fr`, `de` y `pt`.
- Las 27 variantes `es/de/pt` revisadas como Googlebot responden `200`.
- Muestra de headers de rutas nuevas:
  - `/biblioteca-vino/regiones/francia/muscadet`;
  - `/de/weinbibliothek/weinbegleitung/queso-azul`;
  - `/pt/biblioteca-vinho/regioes/italia/vermentino-di-gallura`;
  - todas con `content-type: text/html; charset=utf-8`, `x-prerendered: true` y `x-worker-branch: bot-prerender`.
- El CLI de Supabase sigue bloqueado sin `SUPABASE_ACCESS_TOKEN`; Lovable es la via operativa actual para Edge Functions.
- No se toco Cloudflare Worker ni base de datos.

## Decisiones

- No queda pendiente desplegar `prerender` para `d02ff15`; esa deuda quedo superada por `7a1745a`.
- No queda pendiente desplegar `sitemap` para `6d0c2cf`; ya esta validado en produccion.
- El siguiente bloque no debe ser otro parche tecnico de sitemap, sino expansion editorial/schema y plan de slugs localizados.
- Los slugs de entidad localizados no se cambian sin plan de migracion SEO.

## Hipotesis

- Search Console deberia empezar a descubrir mejor las entidades estrategicas cuando recrawlee el sitemap nuevo.
- La siguiente mejora de maximo nivel vendra de contenido visible, schema especifico y enlaces contextuales para regiones, estilos y maridajes.
- Una migracion de slugs localizados puede mejorar adecuacion internacional, pero tambien puede generar volatilidad si se ejecuta sin redirects y canonical plan.

## Tareas pendientes inmediatas

1. Monitorizar Search Console:
   - revisar fecha de ultimo rastreo de `/sitemap.xml`;
   - comprobar si baja `Descubierta: actualmente sin indexar`;
   - revisar ejemplos de las 9 rutas estrategicas nuevas.
2. Solicitar indexacion selectiva si la herramienta lo permite:
   - `/biblioteca-vino`;
   - `/biblioteca-vino/uvas`;
   - `/biblioteca-vino/regiones`;
   - `/biblioteca-vino/estilos`;
   - `/biblioteca-vino/maridajes`;
   - una seleccion corta de rutas nuevas ya servibles.
3. Planificar migracion de slugs localizados:
   - mapa completo por idioma;
   - canonicals nuevos;
   - redirects 301 desde slugs actuales;
   - hreflang y sitemap nuevos;
   - validacion de Search Console antes/despues.
4. Extender schema/enlazado estrategico a:
   - regiones prioritarias;
   - estilos prioritarios;
   - maridajes prioritarios.
5. Seguir ampliando contenido visible:
   - perfiles editoriales propios para regiones y maridajes de alto valor;
   - clusters de blog por idioma solo si enlazan a entidades maduras;
   - CTAs contextuales hacia demo/herramientas sin forzar paginas informacionales.

## Actualizacion 2026-06-08: retomar tras schema y enlaces de uvas

## Hechos

- `main` incluye y tiene pusheado `d02ff15 feat: enrich wine library grape schema links`.
- La mejora cubre:
  - enlaces estrategicos resolubles para las 40 uvas prioritarias;
  - alias y resolucion contextual de `muscadet` como uva/region;
  - JSON-LD humano enriquecido para fichas de uva;
  - aviso localizado de desambiguacion de `muscadet`;
  - preparacion de `prerender` para `mainEntity`, `about` y `mentions` en fichas de biblioteca.
- Validaciones locales completadas:
  - tests enfocados: 28 tests;
  - `deno check` de `supabase/functions/prerender/index.ts`;
  - suite completa: 52 tests;
  - `npm run build`;
  - `git diff --check`;
  - navegador local en Muscadet aleman.
- Lovable `Web Winerim` detecto el commit y se pulso `Publish project` -> `Update`.
- Produccion humana esta publicada para `/de/weinbibliothek/rebsorten/muscadet`:
  - aviso visible;
  - JSON-LD enriquecido;
  - menciones internas;
  - sin `FAQPage` duplicado en el grafo de uva.
- Produccion Googlebot aun usa `prerender` anterior para Muscadet.
- Supabase Edge Function directa tambien devuelve el `prerender` anterior.
- El intento de deploy CLI de `prerender` fallo porque falta `SUPABASE_ACCESS_TOKEN`.
- No se toco Cloudflare Worker.
- No se toco base de datos.

## Decisiones

- Retomar por el despliegue de `prerender` antes de considerar cerrada esta mejora para bots.
- Mantener Lovable como via preferida para Edge Functions; usar CLI solo si se proporciona token o si se autoriza explicitamente ese camino.
- No iniciar otra tanda editorial grande hasta que el cambio de schema/enlazado este activo tambien para Googlebot.

## Hipotesis

- El frontend humano ya aporta valor inmediato, pero Googlebot/LLMs no recibiran todo el nuevo schema hasta que `prerender` se despliegue.
- La validacion de produccion puede tardar por cache, pero la funcion directa de Supabase confirma que falta deploy real de Edge Function.
- Despues de `prerender`, el siguiente bloque de alto impacto sera aplicar schema/enlazado equivalente a regiones, estilos y maridajes.

## Tareas pendientes inmediatas

1. Desplegar `prerender` del commit `d02ff15`:
   - Opcion preferida: pedirlo en Lovable `Web Winerim`.
   - Opcion alternativa: usar CLI con `SUPABASE_ACCESS_TOKEN`.
2. Revalidar produccion como Googlebot:
   - `/de/weinbibliothek/rebsorten/muscadet`;
   - `/pt/biblioteca-vinho/castas/muscadet`;
   - esperado: `200`, `bot-prerender`, `x-prerendered: true`, canonical propio, idioma correcto, `mentions` y entidad enriquecida.
3. Revalidar humano una muestra adicional:
   - `/de/weinbibliothek/rebsorten/muscadet`;
   - `/pt/biblioteca-vinho/castas/muscadet`;
   - una uva no ambigua con enlaces nuevos, por ejemplo `gruner-veltliner` o `corvina`.
4. Extender la capa de schema/enlazado a:
   - regiones prioritarias;
   - estilos prioritarios;
   - maridajes prioritarios.
5. Continuar expansion editorial visible:
   - regiones y maridajes con demanda comercial;
   - perfiles propios donde hoy solo hay fallback.
6. Monitorizar Search Console tras recrawl:
   - fichas de uva prioritarias;
   - `Descubierta: actualmente sin indexar`;
   - ejemplos concretos de Muscadet uva/region.

## Actualizacion 2026-06-08: retomar tras cuarta tanda de uvas

## Hechos

- `main` incluye y tiene pusheado `ad89889 feat: expand priority grape editorial profiles`.
- Lovable `Web Winerim` sincronizo el commit desde GitHub, desplego Supabase Edge Function `prerender` y publico frontend con estado final `Up to date`.
- La biblioteca del vino tiene ahora 40 uvas prioritarias con perfil editorial humano.
- La cuarta tanda incluye:
  - `graciano`;
  - `muscadet`;
  - `semillon`;
  - `assyrtiko`;
  - `vermentino`;
  - `carmenere`;
  - `tannat`;
  - `petit-verdot`;
  - `torrontes`;
  - `corvina`.
- Validaciones locales completadas:
  - tests enfocados de biblioteca: 24 tests;
  - `deno check` de `supabase/functions/prerender/index.ts`;
  - suite completa: 49 tests;
  - `npm run build`;
  - `git diff --check`;
  - navegador local en rutas PT/DE.
- Produccion validada:
  - Googlebot en `/pt/biblioteca-vinho/castas/graciano`: `200`, `bot-prerender`, `x-prerendered: true`, canonical propio, `lang="pt"`, contenido editorial y sin fallback.
  - Googlebot en `/de/weinbibliothek/rebsorten/muscadet`: `200`, `bot-prerender`, `x-prerendered: true`, canonical propio, `lang="de"`, contenido editorial y sin fallback.
  - Usuario humano en ambas rutas: inteligencia de servicio, rol en carta, maridajes y sin fallback.
- No se toco Cloudflare Worker ni base de datos.

## Decisiones

- Dar por cerrada y publicada la cuarta tanda editorial de uvas.
- Mantener como regla que toda ampliacion visible de biblioteca debe revisar tambien `prerender`.
- Continuar la expansion maxima por entidades con demanda SEO/comercial, no por volumen indiscriminado.

## Hipotesis

- El siguiente impacto vendra de pasar regiones, maridajes y estilos de fallback a perfiles propios, y de reforzar schema/enlazado.
- Search Console tardara en reflejar el recrawl de estas fichas.
- `Muscadet` necesita una revision editorial fina por la ambiguedad entre region y uva/sinonimo `Melon de Bourgogne`.

## Tareas pendientes inmediatas

1. Revisar schema de fichas de uva:
   - sinonimos;
   - paises;
   - regiones;
   - FAQs;
   - enlaces a region/estilo/maridaje.
2. Elegir la siguiente tanda de entidades propias:
   - regiones con valor comercial;
   - maridajes de alta intencion;
   - estilos con potencial de busqueda y decision de carta.
3. Reforzar enlaces internos desde las 40 uvas:
   - hacia regiones clave;
   - hacia estilos;
   - hacia maridajes;
   - hacia demo/herramientas cuando tenga sentido.
4. Revisar `muscadet`:
   - diferenciar casta/sinonimo `Melon de Bourgogne` de region `Muscadet`;
   - decidir si necesita copy, canonical o enlaces aclaratorios.
5. Monitorizar Search Console:
   - revisar recrawl de uvas prioritarias;
   - solicitar indexacion selectiva de hubs y fichas maduras si la herramienta lo permite.

## Actualizacion 2026-06-08: retomar tras fallback visible de biblioteca

## Hechos

- El commit `31354ef feat: add visible wine library depth fallback` esta pusheado en `main`.
- Lovable `Web Winerim` publico el commit y quedo en `Up to date`.
- Produccion validada en experiencia humana:
  - `/pt/biblioteca-vinho/castas/airen` muestra el bloque visible `Como usar Airén numa carta real`.
  - `/de/weinbibliothek/rebsorten/tempranillo` conserva su bloque especifico `Service-Intelligenz` y no muestra fallback.
- La nueva capa esta localizada para seis idiomas y conectada a uvas, regiones, estilos y maridajes.
- Validaciones del bloque:
  - `npm test -- --run`: 48 tests.
  - `npm run build`.
  - `git diff --check`.
  - navegador local y produccion.
- No se toco Worker, DB ni Edge Functions.

## Decisiones

- El bloque de fallback visible queda cerrado como mejora de UX/contenido humano para entidades sin perfil editorial especifico.
- Las entidades prioritarias deben seguir usando perfiles propios, no el fallback.
- La ruta portuguesa real para uvas/castas es `/pt/biblioteca-vinho/castas/...`; evitar `/pt/biblioteca-vinho/uvas/...` salvo como ruta interna artificial de test, que ya se corrigio.

## Hipotesis

- La biblioteca queda mejor equilibrada para usuarios humanos, pero el maximo nivel vendra de convertir progresivamente entidades de alto valor de fallback a perfil editorial propio.
- La mejora puede ayudar a conversion y calidad percibida, aunque el impacto de indexacion dependera de recrawl y enlazado interno.

## Tareas pendientes inmediatas

1. Expandir perfiles especificos de biblioteca:
   - priorizar entidades que hoy dependen del fallback y tienen demanda comercial;
   - empezar por uvas/regiones/estilos/maridajes con mas busquedas o mejor encaje de producto.
2. Revisar schema por tipo de entidad:
   - diferenciar mejor `DefinedTerm`, `Article`, `FAQPage` y posibles entidades de producto/servicio cuando corresponda.
3. Reforzar enlaces internos humanos:
   - blog -> entidad;
   - guia/herramienta -> entidad;
   - entidad -> demo/producto;
   - uva -> region -> estilo -> maridaje.
4. Revalidar produccion mas adelante:
   - muestra de fichas fallback en los seis idiomas;
   - muestra de fichas prioritarias para confirmar que no duplican fallback.
5. Mantener Search Console:
   - monitorizar `Descubierta: actualmente sin indexar`;
   - pedir indexacion selectiva solo para hubs/entidades maduras cuando la herramienta no falle.

## Actualizacion 2026-06-08: estado retomable

## Hechos

- `main` incluye y tiene pusheados:
  - `3932aa0 fix: deepen static prerender pages`.
  - `5aa5b1c fix: deepen wine library prerender pages`.
- Ambos commits fueron desplegados desde Lovable en el proyecto `Web Winerim`.
- Las 49 rutas no-biblioteca visibles en Search Console que estaban en `Descubierta` quedan validadas en produccion:
  - 49/49 correctas.
  - minimo 302 palabras.
  - mediana 374 palabras.
  - 0 fallos tecnicos.
- Las 761 URLs visibles de biblioteca del vino en Search Console quedan validadas en produccion:
  - 761/761 correctas.
  - minimo 317 palabras.
  - p10 362, mediana 422, p90 474, maximo 543.
  - 0 fallos tecnicos.
- Se validaron `200`, `bot-prerender`, `x-prerendered: true`, canonical propio, idioma esperado, schema y hreflang.
- No se toco Cloudflare Worker ni base de datos.

## Decisiones

- Dar por cerrado el bloque de contenido fino en prerender para las rutas visibles auditadas de Search Console.
- No pedir validaciones masivas manuales en Search Console; priorizar indexacion selectiva y monitorizacion.
- La siguiente ampliacion de biblioteca debe enfocarse en contenido visible y editorial por entidad, no solo en prerender.
- Mantener Lovable como via de despliegue de `prerender`.

## Hipotesis

- Search Console deberia empezar a reducir o reclasificar parte de `Descubierta: actualmente sin indexar` cuando Google vuelva a rastrear estas URLs.
- El efecto no sera inmediato porque el ultimo dato visible de Search Console seguia fechado el 2026-05-29.
- La biblioteca del vino ya tiene una base tecnica y de prerender mucho mas solida; ahora el diferencial esta en autoridad, contenido humano, enlaces y clusters por mercado.

## Tareas pendientes inmediatas

1. Monitorizar Search Console:
   - revisar cuando cambie la fecha de datos de `Descubierta: actualmente sin indexar`;
   - comprobar si baja el volumen de URLs descubiertas;
   - revisar ejemplos concretos de biblioteca y rutas estaticas ya enriquecidas.
2. Pedir indexacion selectiva, no masiva, cuando Search Console lo permita:
   - `/biblioteca-vino`;
   - `/biblioteca-vino/uvas`;
   - `/biblioteca-vino/regiones`;
   - `/biblioteca-vino/estilos`;
   - `/biblioteca-vino/maridajes`;
   - `/de/weinbibliothek/service-guide`;
   - `/pt/biblioteca-vinho`.
3. Continuar biblioteca del vino al maximo nivel:
   - convertir las entidades con mas demanda en paginas humanas mas profundas;
   - priorizar uvas, regiones, estilos y maridajes con valor comercial;
   - reforzar enlaces internos entre entidad, guia, herramienta y demo;
   - revisar schema por tipo de entidad.
4. Revisar articulos:
   - confirmar recrawl de las 154 URLs legacy con sufijo de idioma;
   - publicar nuevos clusters por idioma/pais solo si enlazan a entidades maduras;
   - mantener rutas localizadas limpias para articulos internacionales.
5. Mantener tareas tecnicas separadas:
   - Core Web Vitals;
   - Search Console 404 legacy restantes;
   - `/sitemap_index.xml`;
   - avisos de Lovable;
   - deuda global de lint.

## Hechos

- La base técnica para `de` y `pt` de la biblioteca del vino está implementada, fusionada, desplegada y validada en producción.
- El cierre técnico previo quedó pusheado en `main` con `e009927`.
- El bloque editorial avanzado de biblioteca del vino quedó pusheado en `main` con `e3eab53 feat: enrich wine library editorial profiles`.
- El proyecto Lovable operativo es `https://lovable.dev/projects/2c4eed0e-6760-45f0-aeb3-ce44de8e91f1`.
- Las Edge Functions Supabase de este proyecto se gestionan desde Lovable.
- En esta sesión se añadió el primer bloque editorial avanzado:
  - 10 uvas prioritarias.
  - Seis idiomas: `es`, `en`, `it`, `fr`, `de`, `pt`.
  - Bloques de servicio/restauración, FAQs y maridajes.
  - Paridad entre frontend y prerender para bots.
  - Fallbacks localizados para evitar texto español en páginas internacionales.
- Verificaciones locales completadas:
  - `npm run test`: 15 tests.
  - `npm run build`.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`.
  - `git diff --check`.
  - Navegador local en rutas prioritarias `de`, `pt`, `it`, `fr`.
- El build mantiene avisos no bloqueantes de Browserslist y chunks grandes.
- El lint global y los avisos de seguridad Lovable siguen fuera del alcance de este bloque.
- Antes de seguir ampliando biblioteca del vino, se ejecutó auditoría SEO pública de producción como Googlebot.
- Informe de auditoría: `src/seo/SEO_PRODUCTION_AUDIT_2026-05-23.md`.
- Se ejecutó auditoría adicional de contenido, SEO semántico y posicionamiento en LLMs.
- Informe de auditoría: `src/seo/CONTENT_LLM_AUDIT_2026-05-23.md`.
- Resultados clave:
  - 2.989 URLs únicas en sitemap.
  - 534 URLs del sitemap devuelven 404.
  - 122 URLs HTTP 200 caen en `bot-fallback` con HTML genérico.
  - 156 URLs tienen hreflang esperado en sitemap ausente en HTML.
  - 276 URLs HTTP 200 canonicalizan a otra URL.
  - `robots.txt` anuncia `llms.txt` como sitemap aunque no es XML.
  - La biblioteca del vino nueva no tiene 404 en sitemap, pero hay 96 legacy shortcuts con título/H1 genérico.
- Hallazgos clave de contenido/LLM:
  - 128 rutas localizadas estáticas entregan a bots la home española.
  - 320 artículos internacionales declaran `html lang="es"`.
  - `llms.txt` existe, pero no es un mapa curado de páginas prioritarias y no hay `llms-full.txt`.
  - `robots.txt` permite crawlers de IA relevantes.
  - `analisis.winerim.wine` está indexable con señal SEO pobre.
  - Hay menciones externas positivas en TecnoVino y F6S.
- Search Console privada no se pudo auditar directamente sin acceso/exportación.
- Tras la auditoría se implementó localmente el primer bloque de correcciones SEO/LLM:
  - `robots.txt` ya no declara `llms.txt` como sitemap.
  - `llms.txt` se rehizo como mapa curado para IA.
  - Se creó `llms-full.txt`.
  - El sitemap filtra las familias de `seo_pages` no resolubles que causaban 534 URLs 404.
  - El sitemap excluye temporalmente 24 recursos/benchmarks/playbooks sin prerender específico.
  - El prerender ya genera rutas estáticas localizadas con idioma, canonical y hreflang propios.
  - Los artículos internacionales ya infieren idioma desde sufijos `_en`, `_it`, `_fr`, `_de` y `_pt`.
- Verificaciones locales posteriores al bloque:
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`.
  - `npm run build`.
  - `npm run test`: 15 tests.
  - `git diff --check`.
  - Prerender local como Googlebot validado en `/en/pricing`, `/de/preise` y `/precios`.
- Estas correcciones aún no están desplegadas ni validadas en producción.
- Se verificó la propiedad Search Console `https://winerim.wine/` con la cuenta `gugocreative@gmail.com`.
- Informe Search Console creado: `src/seo/SEARCH_CONSOLE_AUDIT_2026-05-23.md`.
- Datos Search Console principales:
  - 664 clics y 8,32 mil impresiones en 3 meses.
  - 73 páginas indexadas y 1.643 no indexadas.
  - 194 URLs 404.
  - 1.232 URLs descubiertas sin indexar.
  - 111 URLs rastreadas sin indexar.
  - `/sitemap.xml` correcto; `/sitemap_index.xml` sigue enviado desde 2022 aunque redirige a `/sitemap.xml`.
  - Home con grupo móvil de LCP pobre: 4,5 s.
  - 4 elementos FAQ no válidos por `FAQPage` duplicado.
  - Sin acciones manuales ni problemas de seguridad.
- Se desplegó Cloudflare Worker para:
  - servir `/google0be715f4ef205b3d.html`;
  - corregir redirects legacy de alta confianza detectados por Search Console.
- Worker desplegado para verificación y redirects legacy: `766e2cdd-da00-4157-8745-1f27c25a03e5`.
- Se corrigió localmente el `FAQPage` duplicado en `/software-carta-de-vinos`, `/como-vender-mas-vino-en-un-restaurante` y `/en/what-is-winerim`.
- `index.html` usa ahora IDs compatibles con `SEOHead` en los JSON-LD estáticos para evitar duplicados genéricos.
- Verificación local con navegador: las tres rutas anteriores tienen 1 solo `FAQPage` y 0 JSON-LD sin ID.
- Se añadió redirect directo `/estadisticas` y `/estadisticas/*` -> `/benchmarks-playbooks`.
- Worker final desplegado con redirect `/estadisticas/*`: `4f83ba4a-7994-4cf1-9ec6-d20368b5628b`.
- Producción verificada:
  - `/estadisticas/estadisticas-2024-01-28?codex=1` responde 301 a `/benchmarks-playbooks`.
  - `/google0be715f4ef205b3d.html?codex=1` responde 200.
  - `/clientes/canabota?codex=1` responde 301 a `/clientes`.
  - `/sitemap.xml?codex=1` responde 200.
- `npm run deploy:supabase:seo` no pudo desplegar Edge Functions por falta de `SUPABASE_ACCESS_TOKEN` o login Supabase CLI.
- Lovable en el navegador de Codex redirige a login; no se pudo publicar frontend ni Edge Functions desde esa vía.
- El bloque se commiteó y empujó a `origin/main` como `a98e8c6 fix: clean search console seo signals`.
- Antes del publish de Lovable, producción todavía no reflejaba `a98e8c6`:
  - `robots.txt` mantiene `llms.txt` como sitemap.
  - `llms-full.txt` responde 404.
  - `/en/pricing` como Googlebot sigue con `html lang="es"` y canonical a `/`.
- Antes del publish, Lovable seguía abierto en login dentro del navegador de Codex.
- Después de publicar Lovable, producción ya refleja el bloque:
  - `robots.txt` solo declara `https://winerim.wine/sitemap.xml`.
  - `llms-full.txt` responde HTTP 200.
  - `sitemap.xml` contiene 2.431 URLs y excluye familias 404 conocidas.
  - Googlebot en `/en/pricing`, `/de/preise` y `/pt/precos` recibe idioma/canonical propios.
  - Googlebot en `/article/alex-pardo_en` recibe `html lang="en"` e `inLanguage: "en"`.
  - `/software-carta-de-vinos`, `/como-vender-mas-vino-en-un-restaurante` y `/en/what-is-winerim` renderizan 1 solo `FAQPage`.
- No hizo falta redeployar Cloudflare Worker: redirects legacy, verificación GSC y sitemap proxy respondieron correctamente.

## Decisiones

- Continuar usando Lovable para publicar frontend y Edge Functions.
- Supabase CLI directo queda bloqueado sin `SUPABASE_ACCESS_TOKEN`; usar Lovable autenticado o token explícito si hace falta desplegar Edge Functions desde CLI.
- Desplegar Worker Cloudflare cuando el cambio afecte a proxy, verificación o redirects y esté validado con dry-run.
- Tratar el bloque editorial como fase 1 de profundidad máxima, no como cierre definitivo de contenido.
- Mantener tareas de lint global, seguridad Lovable y Search Console como líneas separadas.
- Priorizar salud SEO técnica antes de seguir sumando URLs/contenido: sitemap, Worker, prerender, hreflang, canonical y robots.
- Cruzar la auditoría pública con Search Console cuando haya acceso o exportaciones.
- Priorizar consistencia semántica para LLMs: idioma correcto, contenido específico por URL, schema alineado, canonicals limpias y fuentes citables.
- Usar exclusión temporal de sitemap para URLs que hoy no tienen respuesta SEO válida, y devolverlas solo cuando exista prerender/canonical real.
- Tratar el prerender estático localizado actual como corrección técnica intermedia, no como versión editorial definitiva.
- Mantener `llms.txt` como archivo informativo y no como sitemap XML.
- Mantener Search Console verificado por archivo HTML.
- No validar los 404 en Search Console hasta corregir el conjunto completo o al menos una familia completa.
- No reenviar `/sitemap.xml` hasta desplegar en Lovable las correcciones locales de `sitemap` y `prerender`.
- Usar `FAQSection` como fuente única de `FAQPage` para páginas con FAQs visibles.
- Mantener los JSON-LD estáticos de `index.html` como fallback con IDs que `SEOHead` pueda actualizar.
- No pedir validación FAQ en Search Console hasta publicar el frontend corregido desde Lovable.
- Usar `a98e8c6` como referencia de publicación.
- No considerar resuelto el despliegue aunque GitHub esté actualizado: producción debe validarse por HTTP.

## Hipótesis

- Tras desplegar este bloque, las fichas de las 10 uvas prioritarias deberían mejorar calidad percibida, utilidad comercial y superficie SEO internacional.
- Search Console puede tardar días en reflejar cambios de prerender, canonical y contenido.
- La siguiente ampliación debería priorizar entidades por demanda SEO, valor comercial y capacidad de enlazado interno.
- Los 404 del sitemap y los `bot-fallback` están limitando más la indexabilidad inmediata que la falta de más contenido editorial.
- Search Console probablemente confirmará los hallazgos públicos como errores de cobertura, canonicals inesperadas y duplicados.
- La presencia en LLMs mejorará más al limpiar contradicciones de entidad/idioma que al publicar más páginas finas.
- Tras desplegar el bloque, la próxima auditoría pública debería mostrar menos URLs enviadas con 404 y menos rutas localizadas canonicalizando a `/`.
- Search Console confirma que el tráfico orgánico depende demasiado de marca.
- La caída de `/en/pricing` debería mejorar después del despliegue de `prerender` localizado.
- La baja detección de enlaces internos indica que hace falta reforzar navegación HTML y enlaces contextuales.
- Los errores FAQ deberían resolverse tras publicar frontend y esperar recrawl de Google.
- El redirect `/estadisticas/*` debería reducir una familia concreta de 404 legacy.
- Puede quedar una duplicación específica de `SoftwareApplication` en páginas con schema propio adicional, pero ya no viene de los JSON-LD genéricos sin ID de `index.html`.
- Lovable requería publish manual para llevar `origin/main` a producción.
- Search Console puede recibir ya el sitemap y validaciones porque producción está corregida.

## Tareas pendientes

1. Despliegue Lovable del bloque SEO/LLM:
   - Hecho: frontend, `sitemap` y `prerender` reflejan el bloque en producción.
   - Hecho: no hizo falta redeployar Worker.
2. QA de producción post-despliegue:
   - Hecho: `robots.txt`, `llms-full.txt`, sitemap, rutas localizadas, artículo internacional y FAQ schema validados.
2.1. Logos home/clientes:
   - Hecho local: 8 logos de hoteles añadidos a `src/assets/logos/hotels-white/`.
   - Hecho local: 589 logos de clientes añadidos a `src/assets/logos/clients-white/`.
   - Hecho local: home usa los nuevos logos de hoteles en `LogoStrip`.
   - Hecho local: `/clientes` usa la galería estática de logos optimizados.
   - Hecho: actualización base commiteada y pusheada con `c7adcfe`.
   - Hecho local: `/clientes` vuelve a mostrar nombre visible de cada cliente bajo el logo.
   - Hecho local: home muestra los logos hoteleros con mayor tamaño visual.
   - Hecho local: build, tests, `git diff --check` y navegador local validados tras el ajuste visual.
   - Pendiente: publicar desde Lovable.
   - Pendiente: validar en producción home y `/clientes` tras publish.
   - Pendiente: decidir si se crea un manifest editorial para normalizar nombres comerciales de clientes.
3. Search Console:
   - Hecho: `/sitemap.xml` reenviado y leído el 24 may 2026, estado `Correcto`, 2.431 páginas descubiertas.
   - Hecho: validación de `FAQPage` duplicado iniciada el 24/5/26.
   - Hecho: inspección de `https://winerim.wine/software-carta-de-vinos` confirma URL indexada y 1 FAQ válido.
   - Bloqueado temporalmente: `Solicitar indexación` devolvió `Se ha producido un problema al enviar la solicitud de indexación. Vuelve a intentarlo más tarde.`
   - Exportar ejemplos completos de `Páginas`: 404, descubiertas sin indexar, rastreadas sin indexar, duplicadas y canónicas alternativas.
   - Cruzar los errores públicos con impresiones, clics, canónica elegida por Google y motivo de exclusión.
   - Monitorizar resultado de la validación FAQ.
   - Reintentar indexación manual más tarde para una tanda corta de URLs estratégicas, no para todo el sitemap.
   - Pedir validación de 404 cuando se completen familias de redirects/correcciones.
   - Revisar si se puede retirar `/sitemap_index.xml` desde la vista de detalle o configuración.
4. P0 destino definitivo de URLs excluidas:
   - Decidir si las familias `grape/uva/vitigno/rebsorte/cepage/casta`, cursos, regiones y `software-carta-vinhos-*` quedan fuera, redirigen o se convierten en páginas reales.
   - Decidir si los 24 recursos/benchmarks/playbooks vuelven al sitemap con prerender propio o permanecen fuera.
5. P0 redirects legacy Search Console:
   - Completar mapa de redirects para los 194 404.
   - `/estadisticas/*` ya redirige a `/benchmarks-playbooks`.
   - Priorizar antiguas URLs `/en/.../`, clientes antiguos y posts de WordPress con señales.
   - Mantener 410 solo para URLs sin equivalente útil.
6. P0 prerender de páginas programáticas:
   - Corregir 122 URLs en `bot-fallback`.
   - Revisar especialmente `wine-list-software-*` y `software-carta-de-vinos-*`.
   - Asegurar título, H1, canonical y contenido específicos para Googlebot, o retirar esas URLs del sitemap.
7. P1 hreflang/canonical:
   - Unificar `ROUTE_MAP`/`HREFLANG_MAP` para evitar duplicación entre sitemap y prerender.
   - Añadir `de`/`pt` solo donde haya rutas reales y mantenerlo sincronizado.
   - Corregir recursos, benchmarks/playbooks con canonical específico antes de devolverlos al sitemap.
8. P1 prerender e idioma:
   - Sustituir la plantilla genérica de rutas estáticas localizadas por contenido editorial más específico para home, pricing, blog, demo, contacto, recursos, herramientas y páginas core.
   - Definir si los artículos internacionales deben vivir en `/article/slug_lang` o en rutas localizadas `/en/article/slug`.
9. P1 Core Web Vitals:
   - Optimizar LCP móvil de la home.
   - Revisar imagen/hero inicial, JS crítico, preload y tamaño de bundles.
10. P1 schema:
   - Hecho: arreglo `FAQPage` publicado en producción y validación Search Console iniciada.
   - Monitorizar resultado de validación para `/software-carta-de-vinos` y `/como-vender-mas-vino-en-un-restaurante`.
   - Revisar si `WhatIsWinerim` debe conservar schema `SoftwareApplication` adicional o transformarlo en `AboutPage`/`WebPage` con `mainEntity`.
11. P1 LLMs:
   - Añadir páginas de evidencia, casos y comparativas con datos citables.
   - Reforzar enlaces internos desde `llms.txt`/`llms-full.txt` hacia las páginas más maduras.
12. P1 subdominios/legacy externos:
   - Revisar `analisis.winerim.wine`: añadir canonical/noindex o convertirlo en landing SEO válida.
   - Redirigir o resolver URLs antiguas que aparecen en búsqueda pública y hoy terminan en 404.
13. P2 biblioteca del vino:
   - Hecho: resolver los 96 legacy shortcuts con redirects canónicos en Worker de producción.
   - Mantener las rutas nuevas de biblioteca como superficie principal.
14. Siguiente bloque editorial máximo nivel:
   - Priorizar 30-50 entidades por potencial SEO.
   - Ampliar uvas con más intención: Syrah, Merlot, Malbec, Nebbiolo, Sangiovese, Verdejo, Viura, Xarel-lo, Godello, Chenin Blanc.
   - Ampliar regiones: Rioja, Ribera del Duero, Rias Baixas, Rueda, Priorat, Borgoña, Burdeos, Champagne, Douro, Vinho Verde.
   - Añadir schema por entidad: `Article`, `FAQPage`, `BreadcrumbList`, `DefinedTerm`/`ItemList` donde encaje.
   - Crear enlaces internos por intención: uva -> región -> estilo -> maridaje -> guía de servicio.
15. Deuda separada:
   - Resolver lint global.
   - Revisar avisos de seguridad de Lovable.

## Actualización 2026-05-24: auditoría profunda web

## Hechos

- Informe nuevo: `src/seo/WEB_DEEP_AUDIT_2026-05-24.md`.
- Worker desplegado: `winerim-proxy` Version ID `4cc5425b-cc8d-4de4-a72f-d9370b355426`.
- Producción ya emite `X-Robots-Tag: noindex, follow` en `/privacidad` y `/en/privacy` para Googlebot.
- Cambios locales pendientes de Lovable:
  - Sitemap sin legales ni city pages fallback.
  - Prerender legal exacto con canonical propio en 6 idiomas.
  - Frontend legal con `noindex`.
  - Assets de logos renombrados para evitar espacios/caracteres especiales.
- Lighthouse mobile actual:
  - Home Performance 58, LCP 12,9 s.
  - `/clientes` Performance 57, LCP 12,1 s.
- 404 detectado pendiente: `https://winerim.wine/~api/analytics`.

## Decisiones

- Prioridad inmediata: publicar y revalidar los cambios SEO/UX ya implementados antes de seguir ampliando biblioteca del vino.
- Las city pages deben salir del sitemap mientras no tengan prerender real.
- Las legales quedan accesibles pero no indexables.
- La siguiente mejora transversal debe centrarse en Core Web Vitals y errores de consola.

## Hipótesis

- Publicar el sitemap limpio reducirá URLs descubiertas sin contenido útil y canonicals inesperadas.
- Reducir JS inicial y optimizar imágenes tendrá más impacto en LCP que tocar servidor.
- `/clientes` necesita estrategia de carga progresiva o paginación/virtualización si se mantienen cientos de logos visibles.

## Tareas pendientes inmediatas

1. Publicar desde Lovable:
   - Frontend.
   - Edge Function `sitemap`.
   - Edge Function `prerender`.
2. Revalidar tras Lovable:
   - `/sitemap.xml` sin legales ni city pages fallback.
   - `/en/privacy` como Googlebot con título `Privacy Policy`, canonical `/en/privacy` y `noindex, follow`.
   - `/clientes` sin 404 de logos.
3. Reenviar `/sitemap.xml` en Search Console tras validar producción.
4. Resolver `~api/analytics`.
5. Abrir bloque Core Web Vitals:
   - Home LCP.

## Actualización 2026-05-24: cierre parcial analytics y `/clientes`

## Hechos

- Hecho: `~api/analytics` ya no responde 404 en producción.
- Worker desplegado: `5e984988-b0c1-4fa2-b5f8-dc0e62fabe0f`.
- Producción verificada:
  - `GET /~api/analytics` -> HTTP 204.
  - `OPTIONS /~api/analytics` -> HTTP 204.
  - Header `X-Worker-Branch: analytics-noop`.
- Hecho local: `/clientes` ya no renderiza 589 logos de golpe.
- Hecho local: `/clientes` renderiza 120 logos iniciales y carga 120 más por click.
- Hecho local: el contador/botón de carga progresiva está traducido a `es`, `en`, `it`, `fr`, `de` y `pt`.
- QA local:
  - 120 logos iniciales.
  - 240 logos tras click en `Ver más clientes`.
  - Sin errores de consola.
- Validaciones:
  - `npm run build`: correcto.
  - `npm run test`: 15 tests correctos.
  - `git diff --check`: correcto.
  - `npm run deploy:worker:dry-run`: correcto.
- `npm run lint` falla por deuda global preexistente y no por el cambio de `/clientes`.
- Bloqueo actual: Lovable sigue sin sesión disponible en Codex, por lo que frontend, `sitemap` y `prerender` siguen requiriendo publish manual/autenticado.

## Decisiones

- Mantener `~api/analytics` como 204 noop en Worker.
- Mantener galería completa de clientes, pero con carga progresiva para reducir coste inicial.
- No reenviar sitemap ni pedir nuevas validaciones de Search Console hasta publicar y validar Lovable.

## Hipótesis

- `/clientes` debería mejorar en DOM inicial/LCP una vez publicado el frontend.
- Lighthouse debería dejar de reportar el 404 de analytics.
- Home sigue siendo el siguiente foco principal de Core Web Vitals.

## Tareas pendientes inmediatas

1. Publicar desde Lovable:
   - Hecho: frontend.
   - Hecho: Edge Function `sitemap`.
   - Hecho: Edge Function `prerender`.
2. Revalidar producción tras Lovable:
   - Hecho: `/sitemap.xml` tiene 2.072 URLs y no incluye legales ni city pages fallback comprobadas.
   - Hecho: legales en 6 idiomas como Googlebot con canonical propio y `noindex, follow`.
   - Hecho: `/clientes` con 120 logos iniciales, botón de carga progresiva y sin 404 same-origin de assets.
3. Reejecutar Lighthouse móvil:
   - Hecho: home Performance 59, LCP 11,2 s.
   - Hecho: `/clientes` Performance 57, LCP 12,3 s, DOM 1.255.
4. Reenviar `/sitemap.xml` en Search Console.
5. Reintentar indexación manual de una lista corta:
   - `https://winerim.wine/software-carta-de-vinos`
   - `https://winerim.wine/como-vender-mas-vino-en-un-restaurante`
   - `https://winerim.wine/en/pricing`
   - `https://winerim.wine/de/preise`
   - `https://winerim.wine/pt/precos`
   - `https://winerim.wine/biblioteca-vino`
   - `https://winerim.wine/en/wine-library`
   - `https://winerim.wine/de/weinbibliothek`
   - `https://winerim.wine/pt/biblioteca-vinho`
6. Siguiente bloque Core Web Vitals:
   - Home LCP.
   - `/clientes` LCP.
   - Imágenes responsive.
   - JS inicial no usado.
   - Chunks grandes.
   - Cache TTL de assets.

## Actualización 2026-05-24: cierre Search Console + Core Web Vitals home

## Hechos

- Search Console:
  - `/sitemap.xml` reenviado correctamente.
  - `https://winerim.wine/software-carta-de-vinos` añadida a cola prioritaria de rastreo.
  - `https://winerim.wine/de/weinbibliothek` sigue sin confirmación de indexación manual porque la UI quedó bloqueada probando la URL.
  - La tanda automatizada de URLs estratégicas quedó con resultado no verificable por timeout.
- Core Web Vitals home implementado localmente:
  - Home bajo el fold diferida tras `load`.
  - Footer y chat diferidos.
  - Navbar inicial sin `framer-motion`.
  - Preloads iniciales del build reducidos a `vendor-react`, `vendor-query` y `vendor-router`.
  - `fetchPriority` camelCase eliminado de `src`; se usa `fetchpriority` donde aplica.
- QA local:
  - `npm run test`: 5 archivos, 15 tests.
  - `npm run build`.
  - `git diff --check`.
  - Preview local home con H1 visible, chunks bajo el fold cargando después del delay, dropdown desktop y menú móvil correctos.

## Decisiones

- Siguiente acción operativa: commit/push y publish Lovable de este bloque.
- No repetir solicitudes masivas de indexación; usar tandas cortas y registrar solo confirmaciones explícitas.
- Medir Core Web Vitals en producción después del publish, no antes.

## Hipótesis

- Este bloque debería bajar presión de JS alrededor del primer viewport y mejorar LCP móvil cuando llegue a producción.
- Search Console tardará días en reflejar cambios de sitemap/indexación y semanas en estabilizar métricas Core Web Vitals de campo.

## Tareas pendientes listas para retomar

1. Commit y push del bloque Core Web Vitals.
2. Publicar desde Lovable.
3. Revalidar producción:
   - Home renderiza hero correctamente.
   - Preloads iniciales siguen sin vendors pesados.
   - Menú desktop/móvil funciona.
   - Chat carga diferido.
4. Reejecutar Lighthouse móvil en home tras publish.
5. Reintentar en Search Console `Solicitar indexación` para `https://winerim.wine/de/weinbibliothek`.
6. Continuar bloque máximo nivel de biblioteca del vino tras cerrar publicación y medición de este saneamiento.
7. Decidir destino definitivo de city pages.
8. Resolver contradicción de `src/seo/route-map.ts` frente al mapa real `de`/`pt`.

## Actualización 2026-05-25: siguiente retoma tras segundo bloque Core Web Vitals

## Hechos

- El bloque `553d17c` sí está publicado en producción, pero Lighthouse mobile de home sigue alrededor de Performance 60 y LCP 10,97 s.
- Se encontró que el entry publicado aún cargaba `vendor-motion` y `vendor-charts` de forma estática.
- Se implementó, commiteó y pusheó `7cccf3d fix: remove heavy vendors from home startup`.
- `7cccf3d` corrige:
  - `react/jsx-runtime` dentro de `vendor-react`.
  - utilidades UI en `vendor-ui-utils`.
  - eliminación del `TooltipProvider` lazy global.
  - diferido de chrome no crítico de aplicación tras `load`/idle.
- Validación local de `7cccf3d`:
  - `npm run build`: correcto.
  - `npm run test`: 15 tests.
  - `git diff --check`: correcto.
  - QA navegador preview: H1, dropdown desktop y consola correctos.
  - Lighthouse mobile preview: Performance 96 y LCP 2,26 s.
- Producción aún no refleja el cambio de código `7cccf3d`; sigue sirviendo `/assets/index-D4-5gxc6.js`.
- Publicar `main` incluye el cambio de código `7cccf3d`, aunque puede haber commits posteriores solo de documentación.

## Decisiones

- La prioridad inmediata es publicar `main` desde Lovable y medir producción.
- No seguir ampliando biblioteca del vino hasta validar este segundo bloque de rendimiento o dejarlo explícitamente aparcado.
- Si producción no mejora tras `7cccf3d`, el siguiente bloque debe centrarse en third-party JS y CSS render-blocking.

## Hipótesis

- `7cccf3d` debería ser el salto real para LCP sintético de home.
- Los datos de Search Console/Core Web Vitals no cambiarán en tiempo real aunque Lighthouse mejore tras publish.

## Tareas pendientes listas para retomar

1. Publicar `main` desde Lovable; contiene el cambio de código `7cccf3d`.
2. Verificar producción tras publish:
   - Entry nuevo distinto de `/assets/index-D4-5gxc6.js`.
   - Sin imports estáticos de `vendor-motion`, `vendor-charts`, `vendor-radix` ni `vendor-supabase`.
   - Preloads iniciales ligeros con `vendor-ui-utils`.
   - Home, dropdown desktop y menú móvil funcionando.
3. Ejecutar Lighthouse mobile en producción para home.
4. Si el resultado es bueno, volver a Search Console:
   - Reintentar indexación de `https://winerim.wine/de/weinbibliothek`.
   - Monitorizar validación FAQ.
   - Vigilar lectura del sitemap limpio.
5. Si el resultado sigue flojo, abrir bloque third-party:
   - GTM.
   - Google Ads.
   - Meta Pixel.
   - Chat.
   - CSS render-blocking.
6. Después de cerrar rendimiento, retomar biblioteca del vino al máximo nivel.

## Actualización 2026-05-25: retoma tras revalidar producción publicada

## Hechos

- El deploy de `main` ya está activo en producción.
- Producción sirve entry nuevo `/assets/index-Fu3lyPiF.js`.
- El entry publicado ya no importa estáticamente `vendor-motion`, `vendor-charts`, `vendor-radix` ni `vendor-supabase`.
- Modulepreloads iniciales ligeros confirmados: `vendor-react`, `vendor-query`, `vendor-router`, `vendor-ui-utils`.
- Home y dropdown desktop funcionan; no se detectaron errores de consola.
- Lighthouse mobile de home sigue mal:
  - Performance 60.
  - LCP 11,38 s.
  - FCP 5,14 s.
  - TBT 110,5 ms.
  - CLS 0,002.
- El LCP es el H1 y el 93% del tiempo es render delay.
- Bloquear terceros en Lighthouse no mejoró el LCP, así que terceros no son la única causa.

## Decisiones

- Siguiente prioridad: `Core Web Vitals home: render delay H1`.
- No seguir con biblioteca del vino hasta cerrar o aparcar explícitamente este punto de rendimiento.
- Terceros siguen siendo importantes, pero pasan detrás del diagnóstico del H1.

## Hipótesis

- El H1 se contabiliza tarde por CSS/fuentes/animación/gradient en throttling móvil.
- El siguiente cambio con mayor probabilidad de impacto es estabilizar el primer paint del H1:
  - sin animación;
  - color sólido inicial;
  - fuente crítica local/preload o fuente del sistema para hero;
  - CSS crítico above-the-fold.

## Tareas pendientes listas para retomar

1. Crear una variante local del hero sin `animate-fade-in-up` en el H1.
2. Medir Lighthouse preview y, si mejora, aplicar el cambio.
3. Si no mejora, probar H1 con color sólido inicial en vez de gradient text.
4. Si no mejora, probar fuentes críticas self-host/preload o fuente del sistema para el H1.
5. Después, volver a production Lighthouse.
6. Solo cuando LCP esté controlado, abordar terceros:
   - GTM/Ads.
   - Meta Pixel.
   - Clarity.
   - Leadfeeder.
   - Chat.
7. Retomar biblioteca del vino al máximo nivel cuando el bloque de rendimiento quede cerrado o aparcado.

## Actualización 2026-05-25: cierre variante H1 sin animación

## Hechos

- Se aplicó la primera variante del bloque `Core Web Vitals home: render delay H1`.
- Cambio realizado: el H1 de `src/components/landing/HeroSection.tsx` ya no tiene `animate-fade-in-up`.
- Se mantuvieron intactos:
  - `text-gradient-wine`.
  - `font-heading` / Playfair Display.
  - Google Fonts.
  - CSS crítico.
- Verificación local completada:
  - `npm run build`: correcto.
  - `npm run test`: 15 tests correctos.
  - `git diff --check`: correcto.
  - Preview local: H1 visible, `animationName: none`, `opacity: 1`.
  - Lighthouse mobile local: Performance 96, FCP 2,0 s, LCP 2,3 s, TBT 110 ms, CLS 0,007.
- Commit y push realizados: `b86d06d fix: remove hero h1 entrance animation`.
- Lovable sigue redirigiendo a login en el navegador de Codex; el publish requiere sesión Lovable activa o publicación manual/autenticada.

## Decisiones

- Publicar y medir esta variante antes de añadir más cambios.
- No mezclar todavía gradiente, fuentes ni CSS crítico para conservar una lectura limpia de Lighthouse.

## Hipótesis

- Si la animación era la causa del LCP tardío, producción debería mostrar menor `render delay`.
- Si no mejora, la causa más probable se desplaza a gradiente/fuente/CSS crítico.

## Tareas pendientes listas para retomar

1. Publicar `main` desde Lovable; contiene `b86d06d`.
2. Avisar cuando esté publicado para revalidar producción.
3. Revalidar producción:
   - Confirmar H1 sin `animate-fade-in-up`.
   - Ejecutar Lighthouse mobile home.
   - Comparar LCP y `render delay` contra la medición anterior: LCP 11,38 s y render delay 10,57 s.
4. Si sigue alto, probar H1 con color sólido inicial en vez de `text-gradient-wine`.
5. Si sigue alto, probar fuente crítica self-host/preload o fuente del sistema solo para el hero.
6. Después de cerrar o aparcar este bloque, retomar biblioteca del vino al máximo nivel.

## Actualización 2026-05-25: siguiente retoma tras revalidar H1 sin animación

## Hechos

- El deploy de Lovable sí publicó la variante sin animación.
- Producción sirve deployment `05d29c6a-1f11-4a80-8af5-c913bfa8d990`.
- Entry publicado: `/assets/index-B3ya-SL1.js`.
- H1 publicado:
  - Sin `animate-fade-in-up`.
  - `animationName: none`.
  - `opacity: 1`.
- Lighthouse mobile producción de esta variante:
  - Performance 58.
  - FCP 6,2 s.
  - LCP 11,1 s.
  - Render Delay 10,3 s.
  - LCP sigue siendo el H1.
- Se aplicó localmente la siguiente variante:
  - Primer tramo del H1 con `text-wine-light`.
  - Se eliminó `text-gradient-wine` solo en el H1 de home.
- Validación local:
  - `npm run build`: correcto.
  - `npm run test`: 15 tests correctos.
  - `git diff --check`: correcto.
  - QA navegador: primer tramo sin background/gradient, H1 visible y sin animación.
  - Lighthouse local: Performance 96, FCP 2,0 s, LCP 2,3 s.

## Decisiones

- La animación no explica el LCP alto de producción.
- Publicar y medir la variante de color sólido antes de pasar a fuentes/CSS crítico.

## Hipótesis

- Si `text-gradient-wine`/background-clip era parte del problema, producción debe bajar el render delay.
- Si no baja, el siguiente foco será fuente crítica o CSS render-blocking.

## Tareas pendientes listas para retomar

1. Commit y push de la variante color sólido.
2. Publicar `main` desde Lovable.
3. Revalidar producción:
   - Entry nuevo distinto de `/assets/index-B3ya-SL1.js`.
   - H1 con `text-wine-light` y sin `text-gradient-wine`.
   - Lighthouse mobile home.
   - Comparar contra LCP 11,1 s y render delay 10,3 s.
4. Si sigue alto, probar fuente del sistema solo para el H1/hero o self-host/preload de Playfair crítica.
5. Después, abordar CSS crítico/terceros si sigue pendiente.

## Actualización 2026-05-25: siguiente retoma tras color sólido

## Hechos

- El deploy de Lovable publicó la variante de H1 con color sólido.
- Producción sirve deployment `9d5642ab-6d1f-4806-b6c3-26c1b330db23`.
- Entry publicado: `/assets/index-QyK9ToNR.js`.
- H1 publicado:
  - Sin `animate-fade-in-up`.
  - Primer tramo con `text-wine-light`.
  - Sin `text-gradient-wine` en el H1.
  - `backgroundImage: none`.
- Lighthouse mobile producción de esta variante:
  - Performance 63.
  - FCP 5,1 s.
  - LCP 7,0 s.
  - Render Delay 6,19 s.
  - LCP sigue siendo el H1.
- La variante color sólido mejoró de forma material frente a:
  - H1 sin animación: LCP 11,1 s, render delay 10,3 s.
  - Bundle optimizado previo: LCP 11,38 s, render delay 10,57 s.
- Se aplicó localmente la siguiente variante:
  - H1 con `font-serif lg:font-heading`.
  - Móvil/tablet usan fuente serif del sistema.
  - Desktop `lg` mantiene Playfair Display.
- Validación local:
  - `npm run build`: correcto.
  - `npm run test`: 15 tests correctos.
  - `git diff --check`: correcto.
  - QA navegador desktop: Playfair se conserva en 1280 px.
  - Lighthouse local: Performance 96, FCP 1,9 s, LCP 2,2 s.

## Decisiones

- Mantener color sólido del H1.
- Probar fuente del sistema solo para móvil/tablet antes de tocar CSS crítico.
- Conservar Playfair en desktop para mantener identidad visual.

## Hipótesis

- La fuente externa Playfair aún puede estar retrasando el LCP móvil.
- Si la variante no mejora producción, el siguiente bloque debe ir a CSS crítico/inline above-the-fold.

## Tareas pendientes listas para retomar

1. Commit y push de la variante `font-serif lg:font-heading`.
2. Publicar `main` desde Lovable.
3. Revalidar producción:
   - Entry nuevo distinto de `/assets/index-QyK9ToNR.js`.
   - H1 con `font-serif lg:font-heading`.
   - Lighthouse mobile home.
   - Comparar contra LCP 7,0 s y render delay 6,19 s.
4. Si mejora pero sigue por encima de objetivo, abrir bloque CSS crítico.
5. Si no mejora, valorar revertir fuente móvil y centrar el bloque en CSS/terceros.

## Actualización 2026-05-25: cierre local de arranque ligero y ficha humana de biblioteca

## Hechos

- Hecho: la variante `font-serif lg:font-heading` ya está publicada en producción con deployment `25c70cc4-cb78-4036-b43a-73bd41ee085a` y entry `/assets/index-howILT12.js`.
- Hecho: producción conserva `vendor-query` en el preload inicial.
- Hecho: Lighthouse mobile producción de la variante fuente móvil es inestable:
  - Run favorable: Performance 85, LCP 3,5 s.
  - Run posterior: Performance 63, LCP 7,9 s.
- Hecho local: se extrajo `src/data/wineLibraryRoutes.ts` para que el selector de idioma no cargue la capa editorial completa de biblioteca.
- Hecho local: `App` ya no usa `QueryClientProvider` y `usePageContent` usa caché manual.
- Hecho local: el build deja preloads iniciales en `vendor-react`, `vendor-router` y `vendor-ui-utils`; ya no aparece `vendor-query`.
- Hecho producción actual: `/de/weinbibliothek/rebsorten/tempranillo` como usuario humano no muestra H1 ni bloque `Service-Intelligenz`.
- Hecho local: `GrapeDetail` añade `TooltipProvider` local y la ruta alemana de Tempranillo renderiza H1 y bloque editorial.
- Hecho: el bloque quedó commiteado y pusheado a `origin/main` con `f26443a fix: slim startup and restore grape detail render`.
- Verificación local completada:
  - `npm run test`: 16 tests.
  - `npm run build`.
  - `git diff --check`.
  - QA navegador local de home y ficha alemana.
  - Lighthouse mobile local home: Performance 98, FCP 1,7 s, LCP 2,1 s.

## Decisiones

- Mantener la variante H1 actual, pero no declarar resuelto Core Web Vitals hasta validar el nuevo arranque sin `vendor-query`.
- Mantener providers de UI pesados localizados por ruta.
- Mantener biblioteca del vino como superficie prioritaria, pero corregir primero el bug humano de fichas de uva antes de escalar más contenido.

## Hipótesis

- Publicar este bloque debería:
  - Reducir el entry/preloads iniciales de home.
  - Arreglar fichas humanas de uva localizadas.
  - Dar una base más limpia para decidir si el siguiente foco es CSS crítico.

## Tareas pendientes listas para retomar

1. Publicar `main` desde Lovable; debe incluir `f26443a`.
2. Revalidar producción:
   - Entry nuevo distinto de `/assets/index-howILT12.js`.
   - Modulepreloads sin `vendor-query`.
   - Home sin errores y H1 correcto.
   - `/de/weinbibliothek/rebsorten/tempranillo` con H1 `Tempranillo` y bloque `Service-Intelligenz`.
   - Lighthouse mobile home con dos muestras.
3. Si LCP sigue inestable, abrir bloque CSS crítico/above-the-fold.
4. Después de cerrar o aparcar Core Web Vitals, retomar ampliación máxima de biblioteca del vino:
   - 30-50 uvas/regiones/estilos por demanda SEO.
   - Enlazado interno por intención.
   - Schema por entidad.
   - Contenido editorial profundo por idioma.

## Actualización 2026-05-25: producción validada tras `f26443a`

## Hechos

- Hecho: el publish de Lovable ya está activo en producción.
- Hecho: producción sirve deployment `baa85387-7e8f-4f71-a058-0633f8767465`.
- Hecho: home sirve entry `/assets/index-BRCyx101.js`, distinto de `/assets/index-howILT12.js`.
- Hecho: modulepreloads iniciales ya no incluyen `vendor-query`; quedan `vendor-react`, `vendor-router` y `vendor-ui-utils`.
- Hecho: el entry publicado no contiene imports estáticos de `vendor-motion`, `vendor-charts`, `vendor-radix` ni `vendor-supabase`.
- Hecho: home mantiene H1 correcto, sin animación, con color sólido y fuente del sistema en móvil.
- Hecho: `/de/weinbibliothek/rebsorten/tempranillo` renderiza H1 `Tempranillo` y bloque `Service-Intelligenz` como usuario humano.
- Hecho: Lighthouse mobile producción sigue variable:
  - Mejor muestra: Performance 85, LCP 3,4 s.
  - Segunda muestra: Performance 68, LCP 7,9 s.

## Decisiones

- El bloque de publish `f26443a` queda cerrado.
- El bug humano de la ficha alemana de Tempranillo queda corregido en producción.
- Core Web Vitals sigue abierto por inestabilidad de LCP.

## Hipótesis

- El siguiente cuello de rendimiento está probablemente en CSS crítico/render-blocking, fuentes o condiciones externas de medición, no en React Query ni en vendors pesados iniciales.
- La biblioteca del vino ya puede retomarse sobre una base más limpia, siempre que no se reintroduzca carga editorial en el arranque global.

## Tareas pendientes listas para retomar

1. Elegir siguiente bloque:
   - Opción A: CSS crítico/above-the-fold para estabilizar LCP móvil.
   - Opción B: retomar ampliación máxima de biblioteca del vino.
2. Si seguimos performance:
   - Auditar CSS render-blocking.
   - Probar inline crítico del hero/navbar.
   - Medir Lighthouse con varias muestras.
3. Si retomamos biblioteca:
   - Priorizar 30-50 uvas/regiones/estilos.
   - Ampliar contenido por idioma.
   - Añadir schema por entidad.
   - Reforzar enlaces internos uva -> región -> estilo -> maridaje -> guía de servicio.

## Actualización 2026-05-25: CSS crítico listo para publish

## Hechos

- Hecho local: se implementó CSS crítico above-the-fold en `index.html`.
- Hecho local: `vite.config.ts` convierte el CSS de build en no bloqueante:
  - preload;
  - stylesheet `media="print"` con `onload`;
  - fallback `noscript`.
- Hecho local: Lighthouse mobile preview muestra 0 recursos render-blocking.
- Hecho local: Lighthouse mobile preview:
  - Run 1: Performance 98, LCP 2,0 s.
  - Run 2: Performance 97, LCP 2,1 s.
- Hecho local: home móvil/desktop y ficha alemana de Tempranillo pasan QA de Chrome sin errores.
- Hecho local: `npm run build`, `npm run test` y `git diff --check` correctos.
- Commit técnico: `6627bda fix: load build css non-blocking`.

## Decisiones

- Continuar por publish Lovable y medición productiva antes de tocar terceros o ampliar biblioteca.
- Mantener el CSS crítico limitado a navbar/hero para no convertir `index.html` en una segunda hoja de estilos completa.

## Hipótesis

- Al publicar, Lighthouse debería dejar de marcar el CSS principal como render-blocking.
- Si LCP sigue variable en producción, habrá que mirar terceros/orden de hidratación/caché, porque CSS bloqueante quedaría descartado.

## Tareas pendientes listas para retomar

1. Pushear `main` si aún no está subido.
2. Publicar `main` desde Lovable.
3. Revalidar producción:
   - HTML contiene `critical-above-fold-css`.
   - CSS principal carga no bloqueante.
   - Lighthouse mobile no lista recursos render-blocking.
   - Home móvil/desktop correcta.
   - `/de/weinbibliothek/rebsorten/tempranillo` correcta.
4. Si mejora y queda estable, retomar biblioteca del vino al máximo nivel.
5. Si sigue variable, auditar terceros/orden de hidratación.

## Actualización 2026-05-25: CSS crítico validado en producción

## Hechos

- Hecho: el publish de Lovable está activo.
- Hecho: producción sirve deployment `0e7c5ea6-8b8a-4638-a5f7-01e2335d8106`.
- Hecho: el HTML de home contiene `critical-above-fold-css`.
- Hecho: el CSS principal carga no bloqueante y conserva fallback `noscript`.
- Hecho: Lighthouse mobile producción ya no lista recursos render-blocking.
- Hecho: métricas Lighthouse mobile:
  - Run 1: Performance 73, LCP 6,6 s.
  - Run 2: Performance 71, LCP 6,7 s.
- Hecho: home móvil/desktop y Tempranillo alemán pasan QA de Chrome sin errores.

## Decisiones

- El bloque CSS crítico queda cerrado.
- Core Web Vitals sigue abierto porque el LCP todavía no está en objetivo.
- El siguiente bloque de performance debe mirar terceros/hidratación, no CSS render-blocking.

## Hipótesis

- El LCP restante puede depender de scripts de terceros, orden de ejecución inicial o cuándo se estabiliza el H1 tras hidratación.
- Si se decide priorizar crecimiento de contenido, ya podemos retomar biblioteca del vino con una base técnica bastante más limpia.

## Tareas pendientes listas para retomar

1. Elegir siguiente dirección:
   - Performance: terceros/hidratación.
   - Contenido: biblioteca del vino al máximo nivel.
2. Si seguimos performance:
   - Auditar GTM, Ads, Meta, Clarity, Leadfeeder y chat.
   - Probar carga por consentimiento/idle.
   - Medir LCP en 2-3 runs por variante.
3. Si retomamos biblioteca:
   - Priorizar 30-50 entidades.
   - Crear contenido profundo por idioma.
   - Añadir schema y enlaces internos por intención.

## Actualización 2026-05-25: GTM diferido listo para publish

## Hechos

- Hecho local: se auditó la carga de terceros del primer viewport.
- Hecho local: Consent Mode v2 sigue inicializado antes de GTM.
- Hecho local: GTM dejó de cargarse inmediatamente en el `head`.
- Hecho local: el nuevo snippet carga GTM después de `load` + `requestIdleCallback`, con fallback `setTimeout`.
- Hecho local: el chat ya estaba diferido y no se cambió.
- Hecho local: el iframe `noscript` de GTM se conserva.
- Commit técnico creado: `e164294 fix: defer gtm until after load`.
- Push completado a `origin/main`; el commit técnico del cambio es `e164294 fix: defer gtm until after load`.
- Producción revisada después del push todavía no refleja el cambio:
  - Deployment activo: `94aea691-4fe9-4a08-84c0-135f46fa300f`.
  - Entry activo: `/assets/index-BRCyx101.js`.
  - No contiene `__winerimLoadGtm`.
  - Todavía contiene el snippet inmediato antiguo de GTM.
- Falta publish desde Lovable.
- Verificación local:
  - `npm run build`: correcto.
  - `npm run test`: 16 tests correctos.
  - `git diff --check`: correcto.
  - Lighthouse mobile preview:
    - Run 1: Performance 98, FCP 1,8 s, LCP 2,1 s, TBT 90 ms, CLS 0,006.
    - Run 2: Performance 97, FCP 1,7 s, LCP 2,1 s, TBT 110 ms, CLS 0,006.
  - Home y Tempranillo alemán pasan QA local sin errores de consola.

## Decisiones

- Mantener Consent Mode temprano.
- Diferir GTM antes de tocar configuración interna del contenedor.
- No tocar Worker ni Supabase en este bloque.
- Medir producción antes de seguir con biblioteca del vino.

## Hipótesis

- Este cambio puede reducir competencia de terceros antes del LCP en producción.
- Si no hay mejora clara, el cuello estará probablemente en hidratación/render del H1 o en coste del entry inicial.
- Las métricas de Search Console/Core Web Vitals tardarán en reflejar cambios aunque Lighthouse responda antes.

## Tareas pendientes listas para retomar

1. Hecho: pushear `main` con `e164294` y documentación.
2. Pendiente: publicar `main` desde Lovable.
3. Revalidar producción:
   - HTML contiene `__winerimLoadGtm`.
   - Consent Mode sigue antes de GTM.
   - GTM no usa el snippet inmediato antiguo.
   - Home móvil/desktop correcta.
   - `/de/weinbibliothek/rebsorten/tempranillo` correcta.
   - Lighthouse mobile home con 2-3 muestras.
4. Si LCP mejora y queda estable, retomar biblioteca del vino al máximo nivel.
5. Si LCP sigue alto, auditar hidratación/render del H1 y coste del entry inicial.

## Actualización 2026-05-25: siguiente paso inmediato

## Hechos

- GitHub `main` está limpio y sincronizado con `origin/main`.
- Producción sigue sin el cambio de GTM diferido.
- Lovable está abierto y autenticado en Chrome.
- `Publish` está visible.
- La UI Lovable no muestra explícitamente `e164294` tras recarga.

## Decisiones

- Antes de pulsar `Publish`, pedir confirmación explícita al usuario.

## Hipótesis

- Publicar puede bastar si Lovable usa el último estado sincronizado aunque la UI no muestre el commit.
- Si no basta, habrá que forzar la sincronización GitHub -> Lovable.

## Tareas pendientes listas para retomar

1. Confirmación del usuario para pulsar `Publish` en Lovable.
2. Pulsar `Publish`.
3. Esperar despliegue.
4. Revalidar producción:
   - `__winerimLoadGtm`.
   - ausencia del snippet inmediato antiguo de GTM.
   - QA home y Tempranillo alemán.
   - Lighthouse mobile 2-3 muestras.
5. Actualizar documentos con el resultado real.

## Actualización 2026-05-25: GTM diferido cerrado, siguiente bloque

## Hechos

- Hecho: el usuario confirmó publicar.
- Hecho: Lovable publicó el frontend y quedó `Up to date`.
- Hecho: producción sirve deployment `11e48c49-19d5-4d37-884c-d58b7de5387a`.
- Hecho: producción contiene `__winerimLoadGtm` y ya no contiene el snippet inmediato antiguo de GTM.
- Hecho: Consent Mode sigue antes de GTM.
- Hecho: QA producción de home móvil, home desktop y Tempranillo alemán sin errores.
- Hecho: Lighthouse mobile producción:
  - Run 1: Performance 89, LCP 2,7 s.
  - Run 2: Performance 89, LCP 2,6 s.
  - Run 3: Performance 93, LCP 2,5 s.
  - 0 recursos render-blocking.

## Decisiones

- Bloque GTM diferido cerrado.
- Core Web Vitals sintético de home queda en rango operativo para retomar contenido.
- No declarar aún mejora de campo hasta que Search Console lo refleje.

## Hipótesis

- El principal bloqueo de LCP era GTM/tags asociados compitiendo al inicio.
- La deuda residual de JS no usado puede abordarse después, pero no bloquea ahora la biblioteca.

## Tareas pendientes listas para retomar

1. Retomar biblioteca del vino al máximo nivel:
   - priorizar 30-50 entidades por demanda SEO y valor comercial;
   - ampliar uvas, regiones, estilos y maridajes;
   - crear contenido profundo por idioma;
   - añadir/validar schema por entidad;
   - reforzar enlaces internos uva -> región -> estilo -> maridaje -> guía de servicio.
2. Monitorizar Search Console:
   - Core Web Vitals móvil home;
   - indexación de rutas de biblioteca;
   - validaciones FAQ/sitemap ya iniciadas.
3. Rendimiento residual opcional:
   - auditar JS no usado;
   - revisar carga de tags dentro del contenedor GTM si vuelve la variabilidad.

## Actualización 2026-05-25: segunda tanda editorial lista para publish

## Hechos

- Hecho local: biblioteca del vino ampliada de 10 a 20 uvas prioritarias con inteligencia de servicio.
- Hecho local: nuevas uvas cubiertas:
  - `syrah`
  - `merlot`
  - `malbec`
  - `nebbiolo`
  - `sangiovese`
  - `monastrell`
  - `viura`
  - `chenin-blanc`
  - `xarello`
  - `touriga-nacional`
- Hecho local: React y `prerender` tienen paridad editorial para estas uvas.
- Hecho local: pruebas actualizadas para exigir 20 perfiles prioritarios y presencia de la segunda tanda en prerender.
- Verificación local completada:
  - `npm run test -- --run`: 17 tests.
  - `npm run build`.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`.
  - `git diff --check`.
  - QA navegador en `/biblioteca-vino/uvas/syrah`, `/de/weinbibliothek/rebsorten/syrah`, `/pt/biblioteca-vinho/castas/xarello` y `/en/wine-library/grapes/chenin-blanc`.
- Producción queda pendiente de publish desde Lovable.

## Decisiones

- Slug canónico de Xarel-lo: `xarello`.
- Esta tanda añade `monastrell` y `touriga-nacional` porque refuerzan la biblioteca en España/Portugal y `verdejo`/`godello` ya estaban cubiertas.
- No se crean nuevas rutas; se enriquecen rutas existentes.

## Hipótesis

- La segunda tanda mejora profundidad y autoridad temática de la biblioteca sin aumentar deuda de indexación.
- El siguiente salto debe venir de regiones, estilos y maridajes con enlazado cruzado y schema por entidad.

## Tareas pendientes listas para retomar

1. Hecho: commit y push de la segunda tanda editorial con `d03625a`.
2. Hecho: publish frontend desde Lovable.
3. Hecho: despliegue explícito de Edge Function `prerender` desde Lovable.
4. Hecho: revalidación producción como usuario real y Googlebot en:
   - `/biblioteca-vino/uvas/syrah`;
   - `/de/weinbibliothek/rebsorten/syrah`;
   - `/pt/biblioteca-vinho/castas/xarello`;
   - `/en/wine-library/grapes/chenin-blanc`.
5. Continuar biblioteca del vino al máximo nivel:
   - regiones: Rioja, Ribera del Duero, Rias Baixas, Rueda, Priorat, Borgoña, Burdeos, Champagne, Douro, Vinho Verde;
   - estilos: crianza, reserva, blanco con lias, espumoso metodo tradicional, rosado gastronomico;
   - maridajes: carnes rojas, pescado blanco, marisco, arroces, cocina asiatica, quesos;
   - schema y enlaces internos uva -> región -> estilo -> maridaje -> guía de servicio.

## Actualización 2026-05-25: siguiente bloque recomendado

## Hechos

- La segunda tanda editorial de uvas prioritarias está publicada y validada en producción.
- La biblioteca tiene ahora 20 uvas prioritarias con inteligencia de servicio visible para usuarios y bots.
- El flujo operativo confirmado para cambios de biblioteca con prerender es:
  - commit/push;
  - publish frontend en Lovable;
  - pedir despliegue explícito de Edge Function `prerender`;
  - validar producción como usuario y Googlebot.

## Decisiones

- No hace falta Cloudflare Worker para la segunda tanda.
- La siguiente ampliación debe salir del plano "uvas aisladas" y construir red temática: regiones, estilos, maridajes y enlaces internos.

## Hipótesis

- La autoridad temática crecerá más si cada uva prioritaria enlaza con regiones, estilos y maridajes relevantes.
- Crear alias visibles para grafías alternativas evitará perder intención de búsqueda sin duplicar slugs.

## Tareas pendientes listas para retomar

1. Regiones prioritarias:
   - Rioja;
   - Ribera del Duero;
   - Rias Baixas;
   - Rueda;
   - Priorat;
   - Borgoña;
   - Burdeos;
   - Champagne;
   - Douro;
   - Vinho Verde.
2. Estilos prioritarios:
   - tinto crianza;
   - tinto reserva;
   - blanco con lias;
   - espumoso metodo tradicional;
   - rosado gastronomico.
3. Maridajes prioritarios:
   - carnes rojas;
   - pescado blanco;
   - marisco;
   - arroces;
   - cocina asiatica;
   - quesos.
4. Schema/enlazado:
   - revisar `Article`, `FAQPage`, `BreadcrumbList` y posibles `DefinedTerm`/`ItemList`;
   - crear enlaces internos uva -> región -> estilo -> maridaje -> guía de servicio.
5. Alias y variantes:
   - `Xarel-lo`/`Xarel·lo` -> `xarello`;
   - revisar grafías con acentos y sin acentos para búsquedas internacionales.

## Actualización 2026-05-25: grafo estratégico listo localmente

## Hechos

- Bloque local implementado:
  - alias de grafías y consultas frecuentes;
  - resolver de enlaces separado por categoría;
  - grafo estratégico de enlaces internos para uvas, regiones, estilos y maridajes;
  - integración en React;
  - integración equivalente en `prerender`;
  - tests nuevos y contrato SEO actualizado.
- Verificación local completada:
  - `npm run test -- --run`: 21 tests.
  - `npm run build`.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`.
  - `git diff --check`.
  - QA navegador local en Xarel-lo, Champagne región, espumoso y carnes rojas.
- Producción aún no refleja este bloque hasta commit/push, publish Lovable y deploy explícito de `prerender`.

## Decisiones

- No duplicar URLs por alias.
- Mantener `xarello` como slug canónico.
- Usar hints por categoría para resolver colisiones de entidad.
- Hacer visible para bots el mismo grafo interno que ve React.

## Hipótesis

- Este bloque mejora más la arquitectura semántica que añadir otra tanda aislada de uvas.
- El siguiente salto vendrá de ampliar contenido específico en regiones, estilos y maridajes prioritarios ya conectados.

## Tareas pendientes listas para retomar

1. Hecho: commit y push del bloque con `80895ac feat: connect wine library entities`.
2. Publicar frontend desde Lovable.
3. Pedir despliegue explícito de Edge Function `prerender` en Lovable.
4. Revalidar producción:
   - `/biblioteca-vino/uvas/xarello` muestra enlaces a Penedès, Cava, espumoso, marisco y arroces.
   - `/biblioteca-vino/regiones/francia/champagne` enlaza a Chardonnay, Pinot Noir, espumoso, marisco y quesos.
   - `/biblioteca-vino/estilos/espumoso` enlaza `Champagne` como región y `Cava` como estilo.
   - `/biblioteca-vino/maridajes/carnes-rojas` enlaza Tempranillo, Syrah, Cabernet Sauvignon, Rioja y tinto reserva.
   - Googlebot recibe los enlaces estratégicos desde `prerender`.
5. Siguiente bloque editorial:
   - profundizar fichas de regiones prioritarias;
   - profundizar estilos prioritarios;
   - profundizar maridajes prioritarios;
   - evaluar schema `DefinedTerm`/`ItemList` por tipo de entidad.

## Actualización 2026-05-25: listo para retomar desde deploy Lovable

## Hechos

- Hecho: commit y push del bloque de grafo estratégico.
- Commit en `origin/main`: `80895ac feat: connect wine library entities`.
- Lovable ve el commit nuevo, pero producción no muestra todavía el grafo estratégico en `prerender`.
- Verificación de producción como Googlebot:
  - `x-worker-branch: bot-prerender` está activo.
  - El HTML de `/biblioteca-vino/uvas/xarello` aún no muestra los enlaces estratégicos; solo hubs generales.
  - Espumoso y carnes rojas tampoco contienen los enlaces estratégicos esperados.
- La automatización no consiguió activar `Update` en Lovable.

## Decisiones

- Retomar por Lovable antes de hacer más código.
- No tocar Cloudflare Worker salvo fallo posterior del proxy.
- Cerrar el bloque solo cuando producción y Googlebot confirmen el grafo.

## Hipótesis

- Falta aplicar el `Update` de Lovable y desplegar la Edge Function `prerender`.
- El código ya subido debería ser suficiente para que producción quede correcta tras ese deploy.

## Tareas pendientes listas para retomar

1. Hecho: en Lovable, pulsar `Update` para el commit `feat: connect wine library entities`.
2. Hecho: en el chat de Lovable, pedir despliegue de la Supabase Edge Function `prerender`.
3. Hecho: validar como Googlebot:
   - `/biblioteca-vino/uvas/xarello`;
   - `/biblioteca-vino/regiones/francia/champagne`;
   - `/biblioteca-vino/estilos/espumoso`;
   - `/biblioteca-vino/maridajes/carnes-rojas`.
4. Hecho: validar usuario real en Chrome headless para `/biblioteca-vino/uvas/xarello`.
5. Continuar con la ampliación editorial profunda de regiones, estilos, maridajes y schema.

## Actualización 2026-05-25: siguiente sesión tras publicar grafo estratégico

## Hechos

- El grafo estratégico de biblioteca del vino está publicado y validado.
- Googlebot recibe los enlaces internos estratégicos desde `prerender`.
- Usuarios reales reciben el frontend actualizado desde `/assets/index-DAMK02nf.js`.
- No fue necesario tocar Cloudflare Worker.
- La Supabase CLI sigue sin token local; Lovable es la vía operativa para Edge Functions.

## Decisiones

- El siguiente trabajo ya no es despliegue, sino ampliación editorial profunda.
- Prioridad recomendada: regiones primero, porque conectan intención SEO geográfica con uvas, estilos y maridajes.
- Mantener cada bloque con paridad React/prerender y validación producción.

## Hipótesis

- Regiones prioritarias darán más crecimiento SEO que otra tanda de uvas aisladas porque atacan intención geográfica y gastronómica.
- Schema `DefinedTerm`/`ItemList` puede aportar claridad semántica si se aplica por entidad sin duplicar schema innecesario.

## Tareas pendientes listas para retomar

1. Profundizar regiones prioritarias:
   - Hecho local: primera tanda profunda implementada para Rioja, Ribera del Duero, Rias Baixas, Rueda, Priorat, Borgoña, Burdeos, Champagne, Douro y Vinho Verde.
   - Hecho local: perfiles regionales en seis idiomas.
   - Hecho local: React y `prerender` tienen paridad esencial.
   - Hecho local: fallbacks profundos localizados evitan narrativa española en regiones internacionales.
   - Pendiente: commit/push, publish Lovable, deploy explícito de `prerender` y validación productiva.
2. Profundizar estilos prioritarios:
   - tinto crianza;
   - tinto reserva;
   - blanco con lias;
   - espumoso metodo tradicional;
   - rosado gastronomico.
3. Profundizar maridajes prioritarios:
   - carnes rojas;
   - pescado blanco;
   - marisco;
   - arroces;
   - cocina asiatica;
   - quesos.
4. Revisar schema por entidad:
   - `DefinedTerm`;
   - `ItemList`;
   - `FAQPage`;
   - `BreadcrumbList`;
   - evitar duplicidades o schema decorativo.
5. Tras el siguiente bloque:
   - Hecho local: tests, build, `deno check` y `git diff --check`.
   - Pendiente: publish Lovable.
   - Pendiente: deploy explícito `prerender`.
   - Pendiente: validación usuario real y Googlebot.

## Actualización 2026-05-26: retomar desde publicación de regiones

## Hechos

- El bloque local de regiones prioritarias está implementado y verificado.
- Archivos principales:
  - `src/data/wineLibraryRegionEditorial.ts`;
  - `src/pages/RegionDetail.tsx`;
  - `src/data/regionsLibraryI18n.ts`;
  - `supabase/functions/prerender/index.ts`.
- Verificaciones locales completadas:
  - `npm run test -- --run`: 25 tests.
  - `npm run build`.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`.
  - `git diff --check`.
- El dev server local está disponible en `http://127.0.0.1:5173/` mientras la sesión siga activa.

## Decisiones

- Retomar por commit/push y Lovable antes de hacer más contenido.
- Pedir siempre despliegue explícito de `prerender` porque este bloque modifica HTML para bots.
- No tocar Cloudflare Worker salvo que producción sirva `bot-fallback` o HTML antiguo tras actualizar Lovable.

## Hipótesis

- Producción necesitará dos pasos: frontend Lovable y Edge Function `prerender`.
- Si Lovable despliega correctamente, Googlebot debería ver los perfiles de Rioja, Champagne y Vinho Verde sin cambios de Worker.

## Tareas pendientes listas para retomar

1. Commit y push del bloque regional.
2. Publicar frontend desde Lovable.
3. Pedir a Lovable: desplegar Edge Function `prerender`.
4. Validar producción como Googlebot:
   - `/biblioteca-vino/regiones/espana/rioja`;
   - `/de/weinbibliothek/regionen/francia/champagne`;
   - `/pt/biblioteca-vinho/regioes/portugal/vinho-verde`;
   - `/en/wine-library/regions/espana/rioja`.
5. Validar producción como usuario real:
   - `/pt/biblioteca-vinho/regioes/portugal/vinho-verde`;
   - `/de/weinbibliothek/regionen/francia/champagne`.
6. Después de validar, abrir bloque de estilos prioritarios:
   - tinto crianza;
   - tinto reserva;
   - blanco con lias;
   - espumoso metodo tradicional;
   - rosado gastronomico.

## Actualización 2026-05-26: regiones publicadas, siguiente bloque listo

## Hechos

- Hecho: commit y push del bloque regional con `6f6dcd8 feat: deepen priority wine regions`.
- Hecho: frontend publicado desde Lovable.
- Hecho: Edge Function `prerender` desplegada explícitamente desde Lovable.
- Hecho: producción validada como Googlebot:
  - `/biblioteca-vino/regiones/espana/rioja`;
  - `/de/weinbibliothek/regionen/francia/champagne`;
  - `/pt/biblioteca-vinho/regioes/portugal/vinho-verde`;
  - `/en/wine-library/regions/espana/rioja`.
- Hecho: producción validada como usuario real:
  - `/pt/biblioteca-vinho/regioes/portugal/vinho-verde`;
  - `/de/weinbibliothek/regionen/francia/champagne`.
- Hecho: no hizo falta desplegar Cloudflare Worker.
- Hecho: se corrigió la ruta documentada inglesa de Rioja a `/en/wine-library/regions/espana/rioja`, porque el sistema conserva slugs fuente de país.

## Decisiones

- La primera tanda profunda de regiones queda cerrada.
- Mantener el procedimiento:
  - commit/push;
  - Lovable `Update`;
  - despliegue explícito de `prerender`;
  - validación separada usuario real/Googlebot.
- Continuar con estilos antes que maridajes, porque los estilos son el siguiente nodo central entre región, uva y recomendación gastronómica.

## Hipótesis

- Estilos prioritarios reforzarán búsquedas de intención práctica y ayudarán a unir regiones/uvas con maridajes.
- Schema semántico conviene revisarlo después de tener regiones + estilos + maridajes profundos para no crear schema decorativo demasiado pronto.

## Tareas pendientes listas para retomar

1. Estilos prioritarios:
   - tinto crianza;
   - tinto reserva;
   - blanco con lias;
   - espumoso metodo tradicional;
   - rosado gastronomico.
2. Maridajes prioritarios:
   - carnes rojas;
   - pescado blanco;
   - marisco;
   - arroces;
   - cocina asiatica;
   - quesos.
3. Schema/enlazado:
   - evaluar `DefinedTerm`/`ItemList` tras ampliar estilos y maridajes;
   - mantener paridad React/prerender;
   - validar usuario real y Googlebot en producción.
4. Search Console:
   - monitorizar recrawl de biblioteca del vino;
   - observar cobertura e impresiones de rutas enriquecidas.

## Actualización 2026-05-26: estilos prioritarios implementados

## Hechos

- Hecho local: primera tanda profunda de estilos prioritarios implementada.
- Hecho: commit y push del bloque de estilos completados con `7198d3a feat: deepen priority wine styles`.
- Estilos cubiertos:
  - `tinto-crianza`;
  - `tinto-reserva`;
  - `blanco-crianza-lias`;
  - `espumoso`;
  - `rosado-cuerpo`.
- Hecho local: nueva capa `src/data/wineLibraryStyleEditorial.ts` en seis idiomas.
- Hecho local: `StyleDetail` renderiza inteligencia de servicio, rol en carta, guion de sala, palancas comerciales, errores a evitar, maridajes y FAQs.
- Hecho local: `blanco-crianza-lias` ya tiene ficha completa en `stylesLibrary`.
- Hecho local: `stylesLibraryI18n` evita fugas de narrativa española en campos profundos de estilos internacionales.
- Hecho local: `prerender` tiene perfiles prioritarios equivalentes para bots.
- Hecho local: el widget de chat usa el idioma detectado por ruta en `de` y `pt`.
- Hecho: Lovable no pudo publicarse desde esta sesión porque la pestaña accesible está en login.
- Hecho: no hay `SUPABASE_ACCESS_TOKEN`, por lo que el despliegue directo de `prerender` por CLI sigue bloqueado.
- Verificaciones locales completadas:
  - `npm run test -- --run`: 29 tests.
  - `npm run build`.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`.
  - `git diff --check`.
  - Browser QA local en `/de/weinbibliothek/weinstile/espumoso`.
  - Browser QA local en `/pt/biblioteca-vinho/estilos/blanco-crianza-lias`.

## Decisiones

- Retomar por Lovable antes de añadir más contenido.
- Pedir despliegue explícito de `prerender` porque el bloque modifica HTML para bots.
- No tocar Cloudflare Worker salvo que producción sirva `bot-fallback` o HTML antiguo tras actualizar Lovable.
- Después de validar estilos, continuar con maridajes prioritarios antes de schema final.

## Hipótesis

- Producción necesitará dos pasos: frontend Lovable y Edge Function `prerender`.
- Si Lovable despliega correctamente, Googlebot debería ver los perfiles de tinto crianza, espumoso, blanco sobre lías y rosado gastronómico sin cambios de Worker.
- El siguiente bloque natural son maridajes porque completan el triángulo región/uva/estilo/intención gastronómica.

## Tareas pendientes listas para retomar

1. Publicar frontend desde Lovable.
2. Pedir a Lovable: desplegar Edge Function `prerender`.
3. Validar producción como Googlebot:
   - `/biblioteca-vino/estilos/tinto-crianza`;
   - `/de/weinbibliothek/weinstile/espumoso`;
   - `/pt/biblioteca-vinho/estilos/blanco-crianza-lias`;
   - `/en/wine-library/styles/rosado-cuerpo`.
4. Validar producción como usuario real:
   - `/de/weinbibliothek/weinstile/espumoso`;
   - `/pt/biblioteca-vinho/estilos/blanco-crianza-lias`.
5. Maridajes prioritarios:
   - carnes rojas;
   - pescado blanco;
   - marisco;
   - arroces;
   - cocina asiatica;
   - quesos.
6. Schema/enlazado tras maridajes:
   - evaluar `DefinedTerm`/`ItemList`;
   - mantener `FAQPage` único;
   - validar usuario real y Googlebot en producción.

## Actualización 2026-05-26: maridajes/schema implementados, pusheados y validados en producción

## Hechos

- Hecho local: primera tanda profunda de maridajes prioritarios implementada.
- Hecho: commit y push completados con `fe4d10b feat: deepen priority wine pairings`.
- Hecho local: nueva capa `src/data/wineLibraryPairingEditorial.ts` en seis idiomas.
- Maridajes cubiertos:
  - `carnes-rojas`;
  - `lubina-dorada` como pescado blanco;
  - `pescados-y-mariscos` como marisco;
  - `pasta-arroces-y-legumbres` como arroces;
  - `cocina-asiatica-y-fusion`;
  - `quesos`.
- Hecho local: `PairingDetail` renderiza inteligencia de maridaje, etiquetas localizadas, FAQs combinadas y CTA localizado.
- Hecho local: `pairingsLibraryI18n` genera narrativa localizada profunda para maridajes internacionales y evita términos de estilo españoles en texto narrativo.
- Hecho local: `prerender` tiene perfiles prioritarios equivalentes para los 6 maridajes.
- Hecho local: `GrapeDetail`, `RegionDetail`, `StyleDetail` y `PairingDetail` emiten `Article` + `DefinedTerm`.
- Verificaciones locales completadas:
  - `npx tsc --noEmit --pretty false`.
  - `npm run test -- --run`: 33 tests.
  - `npm run build`.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`.
  - `git diff --check`.
  - Browser QA local en `/de/weinbibliothek/weinbegleitung/cocina-asiatica-y-fusion`.
  - Browser QA local en `/pt/biblioteca-vinho/harmonizacoes/lubina-dorada`.
- Hecho: producción sigue pendiente porque Lovable estaba en login y no hay `SUPABASE_ACCESS_TOKEN`.
- Hecho: tras el push de `fe4d10b`, Lovable sigue redirigiendo a login en `https://lovable.dev/projects/2c4eed0e-6760-45f0-aeb3-ce44de8e91f1`.
- Hecho: revalidación productiva posterior al push confirma que Googlebot recibe `bot-prerender`, pero todavía sin los nuevos bloques profundos de estilos/maridajes.
- Hecho posterior: el usuario confirmó publish completo en producción.
- Hecho posterior: Googlebot ya recibe la capa esencial profunda de estilos y maridajes con `bot-prerender`.
- Hecho posterior: usuario real en navegador ya ve bloques avanzados, `DefinedTerm` y un solo `FAQPage` en rutas representativas `de` y `pt`.

## Decisiones

- Cerrar estilos y maridajes como publicados y validados en producción.
- Mantener publish + despliegue explícito de `prerender` como protocolo para futuras tandas.
- No tocar Cloudflare Worker salvo que producción sirva `bot-fallback` o HTML antiguo tras actualizar Lovable.

## Hipótesis

- La biblioteca queda cerrada en su bloque principal actual: uvas, regiones, estilos, maridajes, grafo interno, FAQs y schema semántico en frontend.
- El siguiente trabajo de máximo nivel debería ser:
  - mantener monitorización de legacy shortcuts ya resueltos;
  - ampliar más entidades por demanda SEO;
  - monitorizar Search Console.

## Tareas pendientes listas para retomar

1. Legacy shortcuts de biblioteca:
   - Hecho: 96 redirects canónicos en producción vía Worker.
   - Hecho: matriz productiva 96/96 validada sin fallos.
   - Hecho: commit y push `d37044e fix: redirect legacy wine library shortcuts`.
   - Hecho: Worker desplegado con Version ID `c4d375bb-5280-41fe-b793-549be14f17c4`.
   - Pendiente: monitorizar Search Console tras recrawl.
   - Pendiente: publicar bundle React desde Lovable en el siguiente ciclo general para incluir la defensa secundaria de SPA.
2. Siguiente expansión máxima:
   - ampliar más regiones, estilos secundarios y platos concretos;
   - reforzar enlaces internos desde hubs;
   - monitorizar Search Console tras recrawl.
3. Refinamiento futuro:
   - mejorar títulos/H1 del prerender compacto con alias localizados de entidad;
   - mantener paridad de contenido esencial entre frontend y prerender;
   - comprobar evolución en Search Console.

## Actualización 2026-05-26: lista para retomar tras legacy shortcuts

## Hechos

- El bloque de legacy shortcuts queda resuelto en producción a nivel Worker.
- Las URLs antiguas de una sola parte de biblioteca ya no deben competir con las rutas nuevas de uvas, regiones, estilos y maridajes.
- La siguiente línea documentada es expansión editorial masiva y monitorización de Search Console.

## Decisiones

- Continuar con contenido nuevo solo sobre rutas canónicas nuevas.
- Mantener los shortcuts antiguos como redirects permanentes.
- No reabrir arquitectura base de biblioteca salvo que producción o Search Console muestren una contradicción concreta.

## Hipótesis

- El siguiente mayor retorno vendrá de ampliar entidades y enlazado interno, no de crear más rutas técnicas.
- Search Console tardará días o semanas en consolidar la señal de redirects.

## Tareas pendientes listas para retomar

1. Exportar o revisar en Search Console ejemplos de URLs legacy de biblioteca después del recrawl.
2. Preparar la siguiente tanda editorial:
   - regiones: Ribera del Duero, Rias Baixas, Rueda, Priorat, Burdeos, Douro, Vinho Verde;
   - uvas: Syrah, Merlot, Malbec, Nebbiolo, Sangiovese, Viura, Xarel-lo, Chenin Blanc;
   - maridajes/platos: carnes blancas, verduras, pasta, setas, chocolate, postres, aperitivos;
   - estilos: joven, roble, blanco aromatico, dulce, generoso, naranja.
3. Reforzar enlaces internos desde hubs hacia entidades enriquecidas.
4. Publicar bundle React desde Lovable en el siguiente ciclo general.

## Actualización 2026-05-26: expansión masiva local lista para publicar

## Hechos

- Hecho local: expansión editorial masiva implementada.
- Hecho local: cobertura de biblioteca ampliada a 30 uvas, 22 regiones, 15 estilos y 18 maridajes/platos prioritarios.
- Hecho local: nueva capa `src/data/wineLibraryEditorialExpansion.ts`.
- Hecho local: `prerender` tiene perfiles compactos equivalentes para la nueva tanda.
- Hecho local: `sitemap` deja de enviar los shortcuts legacy españoles que ya redirigen a rutas canónicas.
- Hecho local: QA navegador correcto en:
  - `/de/weinbibliothek/weinstile/fino-manzanilla`;
  - `/pt/biblioteca-vinho/harmonizacoes/ostras`;
  - `/fr/bibliotheque-vin/regions/francia/sancerre`.
- Hecho local: TypeScript, tests, build, Deno check y `git diff --check` correctos.
- Hecho: commit y push de código completados con `78135cd feat: expand wine library editorial coverage`.
- Hecho: Lovable no está accesible desde esta sesión porque redirige a login.
- Hecho: no hay `SUPABASE_ACCESS_TOKEN` local.
- Hecho: producción todavía tiene `sitemap.xml` antiguo para esta tanda y sigue listando shortcuts legacy.

## Decisiones

- Siguiente paso operativo: commit/push y publicación Lovable.
- No tocar Cloudflare Worker para esta tanda.
- Desplegar explícitamente `sitemap` y `prerender` porque ambos han cambiado.
- No marcar esta expansión como cerrada en producción hasta validar usuario real y Googlebot.

## Hipótesis

- Lovable necesitará frontend publish y deploy explícito de Edge Functions.
- Si Lovable publica correctamente, la producción debería reflejar la expansión sin cambios de Worker.
- Search Console tardará en reflejar la consolidación de shortcuts y la nueva profundidad editorial.

## Tareas pendientes listas para retomar

1. Commit y push:
   - Hecho: expansión editorial.
   - Hecho: actualización de documentación de cierre previa.
   - Hecho: ajuste final de sitemap subido con `9f99fa7`.
2. Publicar desde Lovable:
   - Hecho: commit `9f99fa7`;
   - Hecho: Edge Function `sitemap`.
3. Validar producción como usuario real:
   - Hecho: `/de/weinbibliothek/weinstile/fino-manzanilla`;
   - Hecho: `/pt/biblioteca-vinho/harmonizacoes/ostras`;
   - Hecho: `/fr/bibliotheque-vin/regions/francia/sancerre`.
4. Validar producción como Googlebot:
   - Hecho: las tres rutas anteriores.
   - Hecho: `/sitemap.xml` sin shortcuts legacy españoles.
   - Hecho: `/sitemap.xml` con `/biblioteca-vino/maridajes/ostras` y `/biblioteca-vino/regiones/francia/sancerre`.
5. Search Console:
   - monitorizar shortcuts legacy como redirigidas/canónicas alternativas;
   - revisar recrawl de rutas enriquecidas;
   - preparar siguiente ola con datos reales de impresiones y cobertura.

## Actualización 2026-05-26: expansión cerrada, siguiente paso Search Console

## Hechos

- Hecho: commit `9f99fa7` publicado.
- Hecho: Edge Function `sitemap` desplegada.
- Hecho: sitemap público contiene rutas nuevas de expansión:
  - `ostras`;
  - `solomillo-de-ternera`;
  - `sancerre`;
  - `mendoza`;
  - `mosel`;
  - `willamette-valley`;
  - `barolo`.
- Hecho: sitemap público mantiene fuera los shortcuts legacy españoles.
- Hecho: Googlebot recibe prerender correcto en `ostras` portugués y `mencia` alemán.

## Decisiones

- La expansión editorial masiva de biblioteca queda cerrada en producción.
- El siguiente bloque no debe añadir más entidades a ciegas; debe partir de Search Console.
- Mantener monitorización SEO como siguiente frente.

## Hipótesis

- Google tardará en descubrir/indexar la nueva profundidad aunque el sitemap ya esté correcto.
- Las primeras señales útiles serán cobertura, canónica elegida, impresiones y consultas long-tail.

## Tareas pendientes listas para retomar

1. Search Console:
   - Hecho: reenviar `/sitemap.xml`.
   - Pendiente: revisar si el sitemap muestra fecha de última lectura posterior al despliegue;
   - pedir indexación manual solo para una tanda corta si la UI lo permite.
2. Tanda corta sugerida para inspección/indexación:
   - `/biblioteca-vino/maridajes/ostras`;
   - `/biblioteca-vino/regiones/francia/sancerre`;
   - `/de/weinbibliothek/rebsorten/mencia`.
3. Monitorizar:
   - shortcuts legacy como redirigidas;
   - rutas nuevas como descubiertas/indexadas;
   - impresiones no branded de biblioteca del vino.
4. Próxima ola editorial:
   - esperar datos de Search Console;
   - priorizar entidades con impresiones y baja posición;
   - reforzar enlazado interno desde hubs si Google no descubre rápido las nuevas rutas.

## Actualización 2026-05-26: Search Console listo para monitorizar

## Hechos

- `/sitemap.xml` reenviado en Search Console.
- Confirmación recibida: `Se ha enviado el sitemap correctamente`.
- Estado actual de la fila:
  - Enviado: `26 may 2026`;
  - Última lectura: `24 may 2026`;
  - Estado: `Correcto`;
  - Páginas descubiertas: `2.072`.

## Decisiones

- No pedir indexación masiva.
- Próximo paso: esperar lectura nueva o inspeccionar una tanda corta estratégica.

## Hipótesis

- Search Console actualizará `Última lectura` cuando Google procese el sitemap reenviado.
- Las nuevas entidades pueden aparecer primero como descubiertas antes de indexarse.

## Tareas pendientes listas para retomar

1. Volver a Search Console y comprobar:
   - Hecho: `/sitemap.xml` ya muestra `Última lectura: 26 may 2026`;
   - Hecho: `/sitemap.xml` mantiene estado `Correcto`;
   - Hecho: `/sitemap.xml` muestra `2.054` páginas descubiertas.
2. Inspeccionar manualmente, si procede:
   - Hecho: `/biblioteca-vino/maridajes/ostras` no está en Google, pero la prueba en vivo indica que está disponible y se puede indexar;
   - Hecho: `/biblioteca-vino/regiones/francia/sancerre` está descubierta pero sin indexar; la prueba en vivo indica que está disponible y se puede indexar;
   - Hecho: `/de/weinbibliothek/rebsorten/mencia` está descubierta pero sin indexar; la prueba en vivo indica que está disponible y se puede indexar.
3. Preparar siguiente ola solo con datos de:
   - impresiones;
   - posición media;
   - estado de indexación;
   - consultas long-tail.

## Actualización 2026-05-27: siguiente paso inmediato

## Hechos

- Google ya releyó `/sitemap.xml`.
- Las tres URLs estratégicas probadas son técnicamente indexables según la prueba en vivo de Search Console.
- Ninguna de las tres URLs está indexada todavía.
- `sancerre` y `mencia` ya están descubiertas sin indexar.
- `ostras` aún aparece como URL no reconocida por Google.
- No se ha pulsado `Solicitar indexación`.

## Decisiones

- No pedir indexación manual masiva.
- Pedir confirmación explícita antes de solicitar indexación de la tanda corta.
- No abrir otra expansión de biblioteca hasta tener señales de indexación y rendimiento.

## Hipótesis

- Solicitar indexación de tres URLs estratégicas puede acelerar el primer rastreo sin saturar el proceso.
- Si Google no indexa estas URLs tras la solicitud, el siguiente foco será enlazado interno desde hubs y señales de calidad por entidad.

## Tareas pendientes listas para retomar

1. Si el usuario confirma, pulsar `Solicitar indexación` en Search Console para:
   - Hecho: `https://winerim.wine/biblioteca-vino/maridajes/ostras`;
   - Hecho: `https://winerim.wine/biblioteca-vino/regiones/francia/sancerre`;
   - Hecho: `https://winerim.wine/de/weinbibliothek/rebsorten/mencia`.
2. Tras pedir indexación, documentar el resultado exacto de Search Console:
   - Hecho: las tres URLs muestran `Se ha solicitado la indexación`.
   - Hecho: Search Console indica que quedaron añadidas a cola de rastreo prioritaria.
3. En la próxima revisión, comprobar si pasan a indexadas o si quedan como descubiertas/rastreadas sin indexar.
4. Revisar el sitemap antiguo `/sitemap_index.xml` solo como tarea secundaria; no bloquea la biblioteca porque `/sitemap.xml` ya está correcto.

## Actualización 2026-05-27: listo para próxima revisión

## Hechos

- Solicitud manual de indexación completada para las tres URLs estratégicas.
- No se solicitaron más URLs.
- El siguiente dato útil no será inmediato: dependerá de Search Console tras recrawl.

## Decisiones

- Esperar datos antes de abrir otra tanda editorial o pedir más indexaciones manuales.
- Priorizar monitorización de cobertura y consultas long-tail de biblioteca.

## Hipótesis

- Si Google indexa estas tres URLs, la expansión empieza a entrar correctamente por sitemap e inspección manual.
- Si Google no las indexa, el foco no debe ser más contenido a ciegas, sino enlaces internos, autoridad y calidad percibida por URL.

## Tareas pendientes listas para retomar

1. Revisar en Search Console las tres URLs:
   - `/biblioteca-vino/maridajes/ostras`;
   - `/biblioteca-vino/regiones/francia/sancerre`;
   - `/de/weinbibliothek/rebsorten/mencia`.
2. Comprobar para cada una:
   - estado de indexación;
   - último rastreo;
   - sitemaps detectados;
   - canónica declarada y canónica elegida por Google;
   - mejoras detectadas como `FAQPage` y breadcrumbs.
3. Revisar rendimiento de biblioteca del vino cuando haya datos:
   - impresiones;
   - clics;
   - CTR;
   - posición media;
   - consultas long-tail.
4. Si alguna queda sin indexar:
   - reforzar enlazado desde hubs;
   - comprobar si aparece como canónica alternativa;
   - revisar profundidad diferencial de contenido frente a competidores.

## Actualización 2026-05-27: 404 y sitemap antiguo

## Hechos

- Se revisó Search Console después de la solicitud manual de indexación.
- Cobertura observada:
  - 67 páginas indexadas.
  - 197 URLs en `No se ha encontrado (404)`.
  - 1.758 URLs en `Descubierta: actualmente sin indexar`.
  - 133 URLs en `Rastreada: actualmente sin indexar`.
- `/sitemap_index.xml` sigue enviado en Search Console, pero en producción redirige a `/sitemap.xml`.
- Search Console permite `Quitar sitemap` para `/sitemap_index.xml`; no se ejecutó.
- Se corrigieron dos 404 reales visibles en ejemplos de Search Console:
  - `/corso-vino-cata-mw-examen-practico` -> `/decision-center/cursos`;
  - `/winerim-sommelier-magazine` -> `/sommelier-corner`.
- Worker desplegado: `b32cd9a2-63fe-40d5-97a4-5087a179f0b6`.
- Los 10 ejemplos visibles revisados del grupo 404 terminan ahora en HTTP 200 tras redirects.

## Decisiones

- No quitar `/sitemap_index.xml` sin confirmación explícita.
- No validar aún el grupo 404 completo hasta revisar si hay más ejemplos activos.
- Mantener prioridad en Search Console: cobertura, redirects legacy y descubrimiento de biblioteca del vino.

## Hipótesis

- El bloque 404 debería mejorar gradualmente tras recrawl, pero puede contener más URLs antiguas no visibles en la primera página.
- El mayor cuello de botella actual sigue siendo `Descubierta: actualmente sin indexar`, no solo 404.

## Tareas pendientes listas para retomar

1. Revisar más ejemplos del grupo `No se ha encontrado (404)`.
2. Si la mayoría ya redirigen o tienen destino claro, pedir confirmación para iniciar `Validar corrección`.
3. Pedir confirmación explícita si se quiere quitar `/sitemap_index.xml` de Search Console.
4. Monitorizar las tres URLs de biblioteca con indexación solicitada:
   - `/biblioteca-vino/maridajes/ostras`;
   - `/biblioteca-vino/regiones/francia/sancerre`;
   - `/de/weinbibliothek/rebsorten/mencia`.
5. Abrir bloque de enlazado interno si las nuevas URLs siguen como descubiertas/rastreadas sin indexar.

## Actualización 2026-06-01: listo para retomar

## Hechos

- Search Console muestra `/sitemap.xml` correcto, última lectura `30 may 2026`, `2.054` páginas descubiertas.
- `/sitemap_index.xml` sigue enviado y correcto, última lectura `28 may 2026`, `2.054` páginas descubiertas.
- Cobertura actual según Search Console, actualizado `29/5/26`:
  - 102 indexadas.
  - 2.331 sin indexar.
  - 189 en 404.
  - 1.930 descubiertas sin indexar.
  - 153 rastreadas sin indexar.
- Las tres URLs estratégicas de biblioteca ya están indexadas:
  - `/de/weinbibliothek/rebsorten/mencia`;
  - `/biblioteca-vino/regiones/francia/sancerre`;
  - `/biblioteca-vino/maridajes/ostras`.
- Las tres tienen rastreo correcto por Googlebot smartphone el `27 may 2026`, canónica inspeccionada, HTTPS válido, breadcrumbs válidos y FAQ válido.
- Se revisaron 100 ejemplos visibles del grupo 404:
  - 47 acaban en HTTP 200 siguiendo redirects.
  - 51 acaban en HTTP 404 siguiendo redirects.
  - 2 acaban en HTTP 410.
- Cambios locales listos en `cloudflare-worker-v3-hybrid.js`:
  - normalización de `/https:/winerim.wine/...`;
  - redirects directos para legacy de alta confianza.
- Verificaciones locales:
  - `npm run deploy:worker:dry-run`: correcto.
  - `git diff --check`: correcto.
  - prueba local del Worker con ejemplos críticos: correcta.
- Bloqueo actual:
  - `npm run deploy:worker` falla por Cloudflare `Authentication error [code: 10000]`.

## Decisiones

- La tanda corta de indexación manual de biblioteca se considera exitosa.
- La biblioteca del vino puede seguir creciendo, pero con prioridad en enlazado interno y señales de calidad para reducir `Descubierta: actualmente sin indexar`.
- No pedir más indexación manual masiva.
- No quitar `/sitemap_index.xml` ni iniciar `Validar corrección` 404 sin confirmación explícita.
- Antes de cualquier validación GSC de 404, desplegar y verificar el Worker pendiente.

## Hipótesis

- Google está aceptando las páginas nuevas de biblioteca porque la base técnica quedó limpia.
- El gran cuello de botella actual es descubrimiento/indexación por escala y autoridad, no bloqueo técnico de las tres URLs probadas.
- Los redirects pendientes del Worker reducirán 404 visibles cuando Google recrawlee.

## Tareas pendientes listas para retomar

1. Resolver autenticación Cloudflare:
   - Hecho: login OAuth renovado con `gugocreative@gmail.com`.
2. Desplegar Worker pendiente:
   - Hecho: Worker `winerim-proxy` desplegado con Version ID `fda7c63b-ae88-4e3f-98c4-9d48ee39edc2`.
3. Validar producción tras deploy:
   - Hecho: `/https:/winerim.wine/fr/integrations` -> `/fr/integrations` -> 200;
   - Hecho: `/analiza-tu-carta` -> `/analisis-carta` -> 200;
   - Hecho: `/simone-monese` -> `/article/simone-monese` -> 200;
   - Hecho: `/carta-vinos-digital` -> `/software-carta-de-vinos` -> 200.
4. Recalcular los 100 ejemplos visibles de 404.
   - Hecho: 95 terminan en 200, 3 en 404 y 2 en 410.
5. Si producción queda saneada, pedir confirmación explícita para:
   - retirar `/sitemap_index.xml`; o
   - iniciar `Validar corrección` del grupo 404.
6. Siguiente mejora de biblioteca del vino:
   - reforzar enlaces internos desde hubs hacia entidades nuevas ya indexadas;
   - revisar rendimiento/consultas cuando haya datos;
   - priorizar la próxima expansión por impresiones, intención y baja posición.

## Próximo arranque recomendado

## Hechos

- El Worker ya está desplegado y validado.
- La muestra visible de 404 está mayoritariamente saneada: 95/100 terminan en 200.
- Quedan 3 404 visibles sin equivalencia clara:
  - `/los-mejores-restaurantes-de-cataluna-para-disfrutar-del-vino/`;
  - `/kit-digital/`;
  - `/facturacion-y-contratos/`.
- Quedan 2 URLs antiguas que terminan en 410, lo cual es aceptable si no hay equivalente útil.
- Las tres URLs estratégicas de biblioteca del vino ya están indexadas.

## Decisiones

- No hacer más redirects de baja confianza.
- No validar corrección 404 ni retirar `/sitemap_index.xml` sin confirmación explícita.
- La siguiente mejora de biblioteca debe ser enlazado interno y monitorización de consultas, no indexación manual masiva.

## Hipótesis

- El próximo recrawl de Google debería bajar el grupo 404.
- Si `Descubierta: actualmente sin indexar` sigue alto, el siguiente cuello será autoridad/enlazado interno y profundidad diferencial por entidad.

## Tareas pendientes listas para retomar

1. Reabrir Search Console en unos días y comprobar:
   - evolución de `No se ha encontrado (404)`;
   - evolución de `Descubierta: actualmente sin indexar`;
   - rendimiento de biblioteca del vino.
2. Si el usuario confirma explícitamente:
   - iniciar `Validar corrección` del grupo 404;
   - o retirar `/sitemap_index.xml`.
3. Abrir bloque de enlazado interno de biblioteca:
   - Hecho: hubs principales -> entidades estratégicas nuevas y ya indexadas;
   - Hecho: rutas uva -> región -> estilo -> maridaje desde biblioteca principal, uvas, regiones, estilos y maridajes;
   - Pendiente: CTAs suaves hacia análisis/carta en páginas de intención comercial, si se decide abrir ese bloque.

## Actualización 2026-06-01: listo para retomar tras enlazado interno

## Hechos

- Se añadió enlazado interno estratégico en la home de biblioteca y en los hubs de:
  - uvas;
  - regiones;
  - estilos;
  - maridajes.
- El componente nuevo es `src/components/biblioteca/StrategicWineLibraryRoutes.tsx`.
- Los enlaces usan nombres localizados y rutas localizadas en seis idiomas.
- La validación local confirmó rutas en español, alemán y portugués.
- `npm run test`, `npm run build`, `git diff --check` y ESLint limitado a archivos tocados pasan.
- `npm run lint` completo sigue fallando por errores preexistentes no relacionados.
- En esa sesión aún no se había desplegado el cambio de frontend desde Lovable; quedó resuelto en el cierre posterior de prerender del 2026-06-01.

## Decisiones

- Tratar el bloque de enlazado interno como la mejora principal inmediata para reducir el cuello de `Descubierta: actualmente sin indexar`.
- No abrir otra tanda de indexación manual hasta ver señales posteriores al deploy y recrawl.
- Mantener cualquier acción sobre Search Console 404 o `/sitemap_index.xml` bajo confirmación explícita.

## Hipótesis

- Los hubs reforzados deberían acelerar descubrimiento y mejorar contexto semántico de entidades prioritarias.
- La mejora no tendrá efecto en Search Console hasta que Lovable publique el frontend y Google recrawlee.
- La siguiente mejora de máximo nivel será una mezcla de datos GSC, expansión editorial selectiva y enlaces desde páginas comerciales relacionadas.

## Tareas pendientes listas para retomar

1. Publicar el frontend actualizado desde Lovable.
   - Hecho en el cierre posterior del 2026-06-01.
2. Validar en producción:
   - `/biblioteca-vino`;
   - `/biblioteca-vino/uvas`;
   - `/biblioteca-vino/regiones`;
   - `/biblioteca-vino/estilos`;
   - `/biblioteca-vino/maridajes`;
   - `/de/weinbibliothek`;
   - `/pt/biblioteca-vinho`.
   - Hecho en el cierre posterior del 2026-06-01 con Googlebot.
3. Validar que el bloque aparece en HTML/prerender para bots, no solo tras hidratación cliente.
   - Hecho en el cierre posterior del 2026-06-01.
4. Revisar Search Console tras recrawl:
   - evolución de `Descubierta: actualmente sin indexar`;
   - nuevas URLs indexadas de biblioteca;
   - impresiones y consultas long-tail por entidad.
5. Siguiente ampliación de biblioteca al máximo nivel:
   - completar overlays de nombres/platos en de y pt si aparecen cadenas residuales poco naturales;
   - añadir clusters por intención comercial desde páginas de análisis/carta hacia entidades de biblioteca;
   - ampliar contenido diferencial en entidades que GSC muestre con impresiones y baja posición;
   - reforzar schema y `llms.txt` solo después de validar que el HTML/prerender y el enlazado están limpios.

## Actualización 2026-06-01: cierre prerender rutas estratégicas biblioteca

## Hechos

- El frontend productivo ya mostraba el nuevo bloque de rutas estratégicas de biblioteca, pero Googlebot no lo recibía en HTML prerenderizado.
- Se corrigió `supabase/functions/prerender/index.ts`.
- Commit publicado en `main`: `0c44042 fix: mirror wine library hub links in prerender`.
- Lovable desplegó la Edge Function `prerender`.
- Producción validada como Googlebot:
  - `es`: `/biblioteca-vino`, `/biblioteca-vino/uvas`, `/biblioteca-vino/regiones`, `/biblioteca-vino/estilos`, `/biblioteca-vino/maridajes`.
  - `en`: `/en/wine-library`, `/en/wine-library/grapes`.
  - `it`: `/it/biblioteca-vino`, `/it/biblioteca-vino/vitigni`.
  - `fr`: `/fr/bibliotheque-vin`, `/fr/bibliotheque-vin/cepages`.
  - `de`: `/de/weinbibliothek`, `/de/weinbibliothek/rebsorten`.
  - `pt`: `/pt/biblioteca-vinho`, `/pt/biblioteca-vinho/castas`.
- Todas las rutas probadas responden 200, `X-Worker-Branch: bot-prerender`, `X-Prerendered: true`, canonical propio, texto estratégico y enlace estratégico esperado.

## Decisiones

- Cerrar como resuelta la brecha frontend/prerender de rutas estratégicas de hubs.
- No tocar Worker ni publicar frontend adicional para este cierre porque producción ya sirve el cambio desde `prerender`.
- Mantener como tarea futura la extracción de la matriz estratégica a una fuente compartida.

## Hipótesis

- El impacto debería verse en mejor rastreo de entidades prioritarias y señales internas más claras para Googlebot y crawlers de IA.
- La medición real dependerá del recrawl de Google y de los informes de Search Console.

## Tareas pendientes inmediatas

1. Monitorizar Search Console para `/biblioteca-vino` y hubs tras recrawl.
2. Reintentar indexación manual de una tanda corta de URLs estratégicas si Search Console lo permite:
   - `/biblioteca-vino`
   - `/biblioteca-vino/uvas`
   - `/biblioteca-vino/regiones`
   - `/biblioteca-vino/estilos`
   - `/biblioteca-vino/maridajes`
   - `/de/weinbibliothek`
   - `/pt/biblioteca-vinho`
3. Siguiente bloque biblioteca máximo nivel:
   - Añadir schema por entidad y por hub.
   - Profundizar fichas prioritarias con intención de compra, servicio, maridaje, regiones y FAQs.
   - Crear una fuente compartida para rutas estratégicas frontend/prerender.
   - Medir qué entidades están descubiertas sin indexar antes de añadir nuevas tandas masivas.

## Actualización 2026-06-01: listo para retomar tras cluster de blog

## Hechos

- Se publicó el primer cluster de blog para reforzar la biblioteca del vino.
- Commit en `main`: `cbe8a80 feat: add wine library blog cluster`.
- Lovable añadió el commit remoto `cdd6e8f Apliqué la migración del blog`, con una migración idempotente equivalente para el mismo cluster.
- Lovable aplicó la migración SQL y desplegó `prerender`.
- Artículos publicados y validados:
  - `/article/biblioteca-vino-restaurante-vender-mas`;
  - `/article/uvas-regiones-equipo-sala-vender-vino`;
  - `/article/maridajes-carta-vinos-rentable`.
- Los 3 artículos responden 200 como Googlebot, usan `bot-prerender`, aparecen en `sitemap.xml` y enlazan a biblioteca, uvas, regiones, maridajes, análisis de carta y demo.
- Supabase lista esos 3 artículos como los más recientes de la tabla `articles`.

## Decisiones

- Sí debemos publicar nuevos artículos en el blog, pero solo en clusters estratégicos con intención clara y enlaces internos reales.
- El siguiente paso no es publicar muchos posts, sino medir estos 3, solicitar indexación selectiva y decidir el próximo cluster por potencial SEO/comercial.
- Las traducciones se harán después de validar qué temas merecen escalar internacionalmente.

## Hipótesis

- Este cluster debería reforzar autoridad temática de biblioteca del vino y ayudar a Google a entender mejor el grafo blog -> biblioteca -> conversión.
- Los artículos pueden capturar intención práctica de restaurantes y alimentar visitas hacia análisis/demo.
- Si Search Console sigue mostrando muchas URLs descubiertas sin indexar, hará falta más autoridad/enlazado externo además de más contenido.

## Tareas pendientes listas para retomar

1. En Search Console, inspeccionar y solicitar indexación si está disponible:
   - `https://winerim.wine/article/biblioteca-vino-restaurante-vender-mas`
   - `https://winerim.wine/article/uvas-regiones-equipo-sala-vender-vino`
   - `https://winerim.wine/article/maridajes-carta-vinos-rentable`
2. Reenviar o comprobar lectura de `https://winerim.wine/sitemap.xml` tras el cambio.
3. Monitorizar durante la siguiente semana:
   - estado de indexación de los 3 artículos;
   - impresiones/clics por consultas relacionadas con biblioteca del vino, uvas, regiones y maridajes;
   - enlaces internos detectados hacia hubs de biblioteca.
4. Preparar el siguiente cluster solo después de mirar señales iniciales:
   - formación de sala para vender vino;
   - regiones prioritarias para cartas de restaurante;
   - maridajes por tipo de cocina;
   - rentabilidad, stock y rotación de carta;
   - comparativas de software de carta de vinos.
5. Mantener como bloque técnico:
   - fuente compartida de enlaces estratégicos entre React y `prerender`;
   - schema de artículos y hubs;
   - extracción de métricas Search Console para priorizar nuevas publicaciones.
6. No crear más migraciones para estos 3 slugs; si se decide limpiar la duplicación de migraciones, revisar primero cuáles constan aplicadas por Supabase/Lovable.

## Actualización 2026-06-01: listo para retomar tras corrección blog i18n

## Hechos

- Se corrigió localmente el salto a español en navegación de blog:
  - blog y Sommelier ya generan URLs `/{lang}/article/{slug}`;
  - `ArticlePage` ya resuelve slugs de base de datos por idioma;
  - `LanguageSwitcher` reconoce rutas de artículo;
  - `prerender` y `sitemap` soportan artículos localizados.
- Se creó y pusheó el commit `9eb4b76 fix: localize blog article routes`.
- Se añadió la migración `20260601102000_add_localized_wine_library_blog_cluster.sql`.
- La migración contiene 15 artículos adaptados para `en`, `it`, `fr`, `de` y `pt`.
- Verificaciones locales completadas:
  - `npm run test`: 8 archivos, 38 tests;
  - `npm run build`;
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`;
  - ESLint dirigido;
  - `git diff --check`.
- Limitación de QA: navegador integrado no disponible y Playwright/Puppeteer no instalados.
- Estado antes del cierre productivo posterior: Supabase aún no devolvía las versiones traducidas, por lo que faltaba aplicar migración y desplegar desde Lovable.

## Decisiones

- Patrón canónico nuevo para artículos internacionales: `/{lang}/article/{slug}`.
- Slugs de base de datos siguen usando `slug_lang` por compatibilidad.
- Las traducciones del cluster se tratan como adaptaciones por mercado, no traducción literal.
- No pedir indexación hasta validar producción.

## Hipótesis

- Tras desplegar, el usuario debería dejar de ver saltos a español al navegar desde blogs internacionales.
- El sitemap con rutas localizadas permitirá descubrir mejor las versiones internacionales.
- El prerender corregido evitará que Googlebot reciba la home o canonical incorrecto en rutas `/{lang}/article/...`.

## Tareas pendientes listas para retomar

1. Hecho en cierre posterior: Lovable publicó el commit de rutas localizadas y el frontend final `ee9da93`.
2. Hecho en cierre posterior: aplicar la migración:
   - `supabase/migrations/20260601102000_add_localized_wine_library_blog_cluster.sql`.
3. Hecho en cierre posterior: desplegar explícitamente Edge Functions:
   - `prerender`;
   - `sitemap`.
4. Hecho en cierre posterior: revalidar producción:
   - `/en/blog` -> primer artículo debe abrir `/en/article/...`;
   - `/it/blog`, `/fr/blog`, `/de/blog`, `/pt/blog` deben conservar idioma al entrar en artículos;
   - Supabase público debe devolver los 15 slugs `_en/_it/_fr/_de/_pt`;
   - Googlebot en `/en/article/biblioteca-vino-restaurante-vender-mas` debe recibir `bot-prerender`, canonical `https://winerim.wine/en/article/biblioteca-vino-restaurante-vender-mas` y texto inglés;
   - repetir una muestra en `it`, `fr`, `de`, `pt`;
   - `sitemap.xml` debe incluir las rutas `/{lang}/article/...`.
5. Siguiente tarea real: solicitar indexación selectiva de una tanda corta:
   - los 5 artículos `/lang/article/biblioteca-vino-restaurante-vender-mas`;
   - después los de uvas/regiones y maridajes si Search Console no falla.

## Actualización 2026-06-01: listo para retomar tras blog internacional publicado

## Hechos

- El cluster internacional de biblioteca del vino está publicado:
  - 15 artículos adaptados para `en`, `it`, `fr`, `de` y `pt`;
  - 3 temas por idioma: biblioteca del vino, uvas/regiones y maridajes.
- Lovable aplicó la migración SQL internacional.
- Lovable desplegó `prerender` y `sitemap`.
- Lovable publicó frontend y quedó `Up to date`.
- Commit final en `main`: `ee9da93 fix: localize article support blocks`.
- Producción validada:
  - Supabase devuelve los 15 slugs internacionales como `published=true`.
  - `sitemap.xml` tiene 2.072 URLs e incluye las rutas `/{lang}/article/...`.
  - Googlebot recibe `html lang`, canonical y contenido correctos en muestras `en`, `it`, `fr`, `de` y `pt`.
  - Navegador real en `/en/blog` enlaza a `/en/article/...`.
  - Navegador real en `/en/article/biblioteca-vino-restaurante-vender-mas` ya no muestra UI española en índice, herramientas, relacionados ni CTAs.

## Decisiones

- Dar por cerrado el bug de salto a español del blog.
- Mantener como canónico internacional `/{lang}/article/{slug}`.
- Tratar la UI de soporte de artículos como parte obligatoria de la localización.
- No crear más artículos hasta medir indexación y señales iniciales de este cluster.

## Hipótesis

- La biblioteca del vino gana autoridad internacional al tener blog, sitemap, canonical, contenido, enlaces internos y UI alineados por idioma.
- Search Console tardará en reflejar el impacto; conviene medir antes de abrir otro cluster editorial grande.

## Tareas pendientes listas para retomar

1. Search Console:
   - inspeccionar e intentar solicitar indexación de `/en/article/biblioteca-vino-restaurante-vender-mas`;
   - repetir con `/de/article/biblioteca-vino-restaurante-vender-mas`;
   - repetir con `/pt/article/maridajes-carta-vinos-rentable`;
   - si no falla, ampliar a los otros artículos internacionales del cluster.
2. Monitorizar durante la próxima semana:
   - cobertura de las 18 URLs del cluster completo;
   - impresiones y CTR por país/idioma;
   - consultas relacionadas con wine library, Weinbibliothek, biblioteca do vinho, abbinamenti y accords mets-vins.
3. Revisar residuos de UI española en rutas internacionales fuera del blog:
   - herramientas;
   - recursos;
   - páginas programáticas antiguas.
4. Siguiente mejora de biblioteca del vino:
   - schema por hub y entidad;
   - más profundidad editorial en entidades con impresiones;
   - fuente compartida para reglas de enlaces/rutas entre frontend y `prerender`.

## Actualización 2026-06-04: listo para publicar schema/i18n de hubs

## Hechos

- Se implementó el primer bloque de schema por hub de biblioteca del vino.
- Los hubs principales ahora tienen JSON-LD específico en frontend:
  - `CollectionPage`;
  - `DefinedTermSet`;
  - `ItemList`;
  - `BreadcrumbList`.
- `prerender` quedó preparado para servir hubs internacionales con `ItemList`, FAQs y navegación/footer localizados.
- Las FAQs de hubs visibles quedaron localizadas en `es`, `en`, `it`, `fr`, `de` y `pt`.
- Se corrigieron residuos de UI en `GrapesHub` y `RegionsHub`.
- Validaciones locales completadas:
  - ESLint dirigido;
  - Deno check;
  - tests;
  - build;
  - `git diff --check`;
  - muestras prerender locales como Googlebot.

## Decisiones

- Publicar primero la capa estructural de hubs antes de seguir con más volumen editorial.
- Mantener slugs estables y localizar solo labels/contenido visible.
- Tratar la matriz estratégica de enlaces como fuente compartida provisional entre UI y schema.

## Hipótesis

- La biblioteca del vino debería ganar claridad semántica para buscadores y LLMs tras publicar este bloque.
- La mejora será visible en producción solo después de deploy Lovable, deploy de `prerender` y recrawl.

## Tareas pendientes listas para retomar

1. Publicación:
   - hacer push del commit de este bloque;
   - publicar frontend desde Lovable;
   - desplegar explícitamente Edge Function `prerender`.
2. Revalidación producción:
   - Googlebot en `/en/wine-library/grapes`;
   - Googlebot en `/pt/biblioteca-vinho/harmonizacoes`;
   - Googlebot en `/de/weinbibliothek/rebsorten`;
   - comprobar `ItemList`, FAQ localizada, navegación localizada y ausencia de residuos españoles en header/footer.
3. Siguiente bloque de biblioteca:
   - schema de detalle para uvas, regiones, estilos y maridajes;
   - revisar duplicación de Article JSON-LD en detalle;
   - enriquecer entidades con datos de mayor intención SEO.
4. Search Console:
   - continuar indexación selectiva después de validar producción;
   - medir cobertura e impresiones del cluster internacional antes de abrir otro cluster editorial grande.

## Actualización 2026-06-04: pendiente de publish Lovable

## Hechos

- El bloque de schema/i18n de hubs está en `main` con commit `9a14725 fix: enrich wine library hub schema`.
- No se pudo publicar desde el navegador interno porque Lovable redirige a login.
- No se pudo desplegar `prerender` por CLI porque falta `SUPABASE_ACCESS_TOKEN`.
- No se requiere deploy de Cloudflare Worker para este bloque.

## Decisiones

- No dar por cerrado en producción hasta publicar Lovable y desplegar `prerender`.
- La siguiente acción humana/operativa es autenticada en Lovable, no de código.

## Hipótesis

- Tras publicar desde Lovable, el frontend humano mostrará schema y FAQs localizadas.
- Tras desplegar `prerender`, Googlebot recibirá `ItemList`, FAQs y navegación/footer localizados.

## Tareas pendientes listas para retomar

1. En Lovable:
   - abrir `https://lovable.dev/projects/2c4eed0e-6760-45f0-aeb3-ce44de8e91f1`;
   - publicar el proyecto desde `main`;
   - desplegar explícitamente la Edge Function `prerender`.
2. Revalidar producción como Googlebot:
   - `/en/wine-library/grapes`;
   - `/pt/biblioteca-vinho/harmonizacoes`;
   - `/de/weinbibliothek/rebsorten`.
3. Criterios de cierre:
   - aparece `ItemList` en JSON-LD;
   - FAQ del hub está en el idioma correcto;
   - header/footer prerenderizados no tienen residuos españoles;
   - `x-worker-branch: bot-prerender` y `x-prerendered: true`.
4. Después:
   - retomar Search Console con indexación selectiva;
   - seguir con schema de detalle para entidades.

## Actualización 2026-06-04: bloque publicado, falta acceso Search Console

## Hechos

- Frontend publicado desde Lovable y marcado como `Up to date`.
- Edge Functions `prerender`, `sitemap` y `redirects` estaban desplegadas en Lovable.
- Producción validada como Googlebot en:
  - `/en/wine-library/grapes`;
  - `/pt/biblioteca-vinho/harmonizacoes`;
  - `/de/weinbibliothek/rebsorten`.
- Las tres rutas devuelven `x-prerendered: true`, `x-worker-branch: bot-prerender`, `CollectionPage` e `ItemList`.
- La ruta inglesa hidratada en navegador humano tiene `ItemList` y no muestra FAQ española.
- Search Console queda bloqueado por permisos: `gugocreative@gmail.com` no puede acceder a `sc-domain:winerim.wine`.

## Decisiones

- Considerar cerrado el deploy del bloque schema/i18n de hubs.
- Retomar indexación manual solo cuando Search Console tenga cuenta con permisos.

## Hipótesis

- El recrawl orgánico puede empezar a recoger el cambio aunque no se solicite indexación manual inmediatamente.
- La solicitud manual acelerará la visibilidad de las tres rutas tras resolver permisos.

## Tareas pendientes listas para retomar

1. Search Console:
   - cambiar a una cuenta con permisos sobre `winerim.wine` o conceder acceso a `gugocreative@gmail.com`;
   - inspeccionar `/en/wine-library/grapes`;
   - inspeccionar `/pt/biblioteca-vinho/harmonizacoes`;
   - inspeccionar `/de/weinbibliothek/rebsorten`;
   - solicitar indexación si la inspección lo permite.
2. Después de GSC:
   - repetir indexación selectiva para artículos internacionales prioritarios;
   - monitorizar cobertura e impresiones.
3. Siguiente bloque de desarrollo:
   - schema de detalle para uvas, regiones, estilos y maridajes;
   - resolver si conviene limpiar el `SoftwareApplication` del catálogo Organization o mantenerlo como oferta de producto.

## Actualización 2026-06-04: Search Console operativo y solicitudes enviadas

## Hechos

- Search Console funciona con la propiedad `https://winerim.wine/`.
- La propiedad `sc-domain:winerim.wine` sigue sin acceso para `gugocreative@gmail.com`.
- Solicitudes de indexación enviadas:
  - `/en/wine-library/grapes`;
  - `/pt/biblioteca-vinho/harmonizacoes`;
  - `/de/weinbibliothek/rebsorten`;
  - `/en/article/biblioteca-vino-restaurante-vender-mas`;
  - `/de/article/biblioteca-vino-restaurante-vender-mas`;
  - `/pt/article/maridajes-carta-vinos-rentable`.
- Estado inicial observado:
  - EN grapes: Google no reconocía aún la URL.
  - PT/DE hubs: descubiertas por sitemap, actualmente sin indexar.
  - PT article finalizó con confirmación visible de solicitud.

## Decisiones

- No enviar de nuevo las mismas URLs.
- Esperar 48-72 horas antes de evaluar si conviene otra tanda.
- Mantener indexación manual selectiva.

## Hipótesis

- Las rutas descubiertas por sitemap deberían actualizar estado antes que las no reconocidas.
- Search Console puede tardar en reflejar rastreo aunque la cola prioritaria ya esté solicitada.

## Tareas pendientes listas para retomar

1. En 48-72 horas:
   - inspeccionar las seis URLs solicitadas;
   - anotar si cambian a rastreadas, indexadas o con canonical distinto.
2. Si avanzan bien:
   - solicitar una segunda tanda corta de URLs de biblioteca;
   - incluir entidades de detalle con más valor SEO.
3. Desarrollo:
   - implementar schema de detalle para uvas, regiones, estilos y maridajes;
   - decidir si se mantiene o separa el `SoftwareApplication` dentro del catálogo de Organization.

## Actualización 2026-06-05: siguiente foco, cobertura baja en GSC

## Hechos

- GSC reporta `102` indexadas frente a `2.331` sin indexar.
- El informe está actualizado a `29/5/26`, antes de los cambios y solicitudes del 2026-06-04.
- Causa principal: `Descubierta: actualmente sin indexar` con `1.930` URLs.
- Las muestras visibles son muchas URLs legacy de artículos con sufijo de idioma.
- El sitemap actual tiene `2.072` URLs limpias y `robots.txt` permite Googlebot.
- Las legacy de artículos responden `200` con canonical limpio, no `301`.

## Decisiones

- No hacer indexación masiva.
- La siguiente mejora debe ser depuración de inventario SEO:
  - legacy redirects;
  - 404s;
  - páginas rastreadas/no indexadas;
  - priorización del sitemap.

## Hipótesis

- El ratio de indexación mejorará más limpiando señales legacy y reforzando enlazado interno que solicitando manualmente cientos de URLs.

## Tareas pendientes listas para retomar

1. Auditar GSC:
   - exportar o revisar ejemplos de `Descubierta: actualmente sin indexar`;
   - exportar o revisar ejemplos de `Rastreada: actualmente sin indexar`;
   - exportar o revisar ejemplos de `404`.
2. Código/SEO técnico:
   - implementar `301` de `/article/{slug}_{lang}` a `/{lang}/article/{slug}` si no rompe compatibilidad;
   - revisar legacy article routes que hoy responden `200`;
   - confirmar que sitemap solo contiene URLs canónicas de valor.
3. Estrategia:
   - priorizar indexación de hubs, entidades y artículos con mejor enlazado interno;
   - esperar datos nuevos de GSC antes de otra tanda manual.

## Actualización 2026-06-05: legacy article redirects desplegados

## Hechos

- Ya está desplegado el Worker con redirects `301` para artículos legacy localizados:
  - `/article/{slug}_en` -> `/en/article/{slug}`;
  - `/article/{slug}_it` -> `/it/article/{slug}`;
  - `/article/{slug}_fr` -> `/fr/article/{slug}`;
  - `/article/{slug}_de` -> `/de/article/{slug}`;
  - `/article/{slug}_pt` -> `/pt/article/{slug}`.
- Version ID de Worker: `251558ac-99da-4fec-8fa6-8a63286174c0`.
- Validación productiva correcta en ejemplos EN, DE y PT.
- Tests locales completos: 39 tests pasan.

## Decisiones

- Cerrar la primera corrección del ruido legacy de artículos.
- Siguiente foco: 404 y `Rastreada: actualmente sin indexar`.

## Hipótesis

- Search Console tardará días en reflejar menos ruido en legacy, pero Googlebot ya recibe la señal correcta.

## Tareas pendientes listas para retomar

1. Search Console:
   - inspeccionar una muestra legacy `_en/_de/_pt` en unos días;
   - comprobar si cambia a `Página con redirección` o desaparece del motivo `Descubierta`.
2. 404:
   - abrir informe `No se ha encontrado (404)`;
   - extraer ejemplos;
   - decidir 301, 410 o dejar 404.
3. Rastreada sin indexar:
   - revisar si son páginas de valor real;
   - mejorar enlazado/contenido o sacarlas del sitemap si no merecen indexarse.

## Actualización 2026-06-05: 404 visibles no son 404 productivos

## Hechos

- Las 10 primeras muestras del informe `No se ha encontrado (404)` ya redirigen en producción.
- No se añadió código extra para esas muestras.
- GSC no ofreció `Validar corrección` en la vista actual.

## Decisiones

- No tocar más redirects 404 hasta tener más ejemplos o recrawl.
- Pasar al siguiente foco: `Rastreada: actualmente sin indexar`.

## Hipótesis

- El informe de 404 bajará cuando Google recrawlee los legacy ya redirigidos.

## Tareas pendientes listas para retomar

1. Abrir `Rastreada: actualmente sin indexar`.
2. Revisar ejemplos:
   - páginas de valor que necesitan más contenido/enlazado;
   - páginas no estratégicas que conviene sacar del sitemap;
   - rutas legacy que conviene redirigir.
3. Revisión posterior:
   - comprobar si `No se ha encontrado (404)` baja tras recrawl.

## Actualización 2026-06-05: 404 legacy adicionales redirigidos

## Hechos

- Worker desplegado con redirects adicionales de alta confianza:
  - `/terms-of-service` -> `/terminos`;
  - `/landing` -> `/`;
  - `/reviews-restaurante` -> `/casos-exito`;
  - `/por-que-los-jovenes-no-beben-vino-en-los-restaurantes` -> `/article/por-que-los-jovenes-no-beben-vino-en-los-restaurantes`.
- Version ID de Worker: `6c6f3366-e13f-4eee-b9c1-7603572f8822`.
- Producción validada con `301` directo en las cuatro URLs y destino final `200` en variantes con trailing slash.
- Tests completos pasados: 8 archivos, 40 tests.
- El redirect legacy de artículos localizados (`/article/{slug}_{lang}`) sigue activo y validado.

## Decisiones

- Cerrar esta tanda de redirects legacy de alta confianza.
- No añadir más redirects sin ejemplos nuevos de GSC o equivalencia semántica clara.
- Siguiente foco operativo: `Rastreada: actualmente sin indexar`.

## Hipótesis

- El informe 404 de GSC debería bajar después del recrawl, pero no de forma inmediata porque los datos visibles eran del `29/5/26`.
- El cuello de indexación seguirá siendo `Descubierta`/`Rastreada sin indexar` aunque el bloque 404 mejore.

## Tareas pendientes listas para retomar

1. Hecho al cierre: commit y push del bloque Worker/docs.
2. Abrir `Rastreada: actualmente sin indexar` en Search Console.
3. Clasificar ejemplos en:
   - páginas valiosas que necesitan más enlazado interno/contenido;
   - páginas no estratégicas que deben salir del sitemap;
   - rutas legacy que necesitan `301`;
   - URLs sin equivalente útil que pueden quedarse como 404/410.
4. Tras recrawl, revisar si `No se ha encontrado (404)` baja y si las legacy `_lang` pasan a `Página con redirección`.

## Actualización 2026-06-05: `Rastreada sin indexar` saneado y validación iniciada

## Hechos

- Se completó la revisión del informe `Rastreada: actualmente sin indexar`.
- Se extrajeron las `153` URLs visibles desde Search Console.
- El CSV no pudo descargarse desde el navegador integrado; la extracción se hizo aumentando a `100` filas y capturando las dos páginas de tabla.
- Antes del Worker nuevo:
  - `122` URLs acababan en `301 -> 200`;
  - `9` URLs respondían `200 -> 200`;
  - `20` URLs acababan en `404`;
  - `1` URL acababa en `410`.
- Worker desplegado para corregir los 404 de alta confianza y queries legacy.
- Version ID de Worker: `06906271-4e57-4755-be7e-03376cfd8f7d`.
- Después del deploy:
  - `143` URLs quedan en `301 -> 200`;
  - `8` URLs quedan en `200 -> 200`;
  - `2` URLs quedan en `301 -> 410`;
  - `0` URLs quedan en `404`.
- Search Console tiene validación iniciada para el motivo:
  - `Resultado de la validación: Iniciada`;
  - `Fecha de inicio: 5/6/26`.
- Tests completos pasados: 8 archivos, 43 tests.

## Decisiones

- Cerrar el bloque de redirects de `Rastreada sin indexar`.
- No solicitar indexación masiva todavía.
- Tratar las `8` URLs `200 -> 200` como siguiente microbloque de calidad/indexabilidad.
- Mantener legales `terminos` y `en/terms` como `noindex`.

## Hipótesis

- El informe debería mejorar cuando Google procese la validación.
- Si algunas URLs reales siguen sin indexar, el problema ya será contenido/enlazado/señal de calidad, no respuesta HTTP.

## Tareas pendientes listas para retomar

1. Hecho al cierre: commit y push del bloque Worker/docs.
2. Monitorizar la validación GSC de `Rastreada: actualmente sin indexar`.
3. Revisar las 6 URLs indexables que siguen `200 -> 200`:
   - `/it/prezzi`;
   - `/article/como-pensar-la-carta-de-vinos-desde-la-rentabilidad`;
   - `/recursos/plantilla-formacion-equipo-sala`;
   - `/benchmarks-playbooks/benchmark-peso-vino-ticket-medio`;
   - `/recursos/revision-mensual-margenes`;
   - `/integraciones`.
4. Para esas 6, decidir:
   - reforzar enlaces internos desde hubs/producto/blog;
   - mejorar contenido/prerender/schema;
   - mantener o retirar del sitemap según valor SEO.
5. Retomar después `Descubierta: actualmente sin indexar`, con foco en biblioteca del vino y artículos internacionales.

## Actualización 2026-06-05: 6 URLs indexables reforzadas en producción

## Hechos

- Se completó el microbloque de las 6 URLs indexables que seguían `200 -> 200`.
- Producción, como Googlebot, queda así:
  - `/it/prezzi`: `200`, `worker-static-prerender`, canonical propio, `index, follow`;
  - `/article/como-pensar-la-carta-de-vinos-desde-la-rentabilidad`: `200`, `bot-prerender`, canonical propio, schema `Article`;
  - `/recursos/plantilla-formacion-equipo-sala`: `200`, `worker-detail-prerender`, canonical propio, schema `CreativeWork`;
  - `/benchmarks-playbooks/benchmark-peso-vino-ticket-medio`: `200`, `worker-detail-prerender`, canonical propio, schema `Article`;
  - `/recursos/revision-mensual-margenes`: `200`, `worker-detail-prerender`, canonical propio, schema `CreativeWork`;
  - `/integraciones`: `200`, `worker-static-prerender`, canonical propio, schema `WebPage`.
- `/sitemap.xml` en producción usa `sitemap-worker-detail-bridge` e incluye las fichas de recursos/benchmarks auditadas.
- Worker desplegado:
  - version ID `670b5372-cbca-48a5-92af-8ebcfb9fb5f5`.
- Cambios de Supabase Edge Functions implementados en repo:
  - `prerender`: recursos, benchmarks/playbooks, `/integraciones`, override `/it/prezzi`;
  - `sitemap`: recursos y benchmarks/playbooks dejan de estar excluidos.
- El deploy directo de Supabase no se pudo hacer porque falta `SUPABASE_ACCESS_TOKEN`.
- Validaciones pasadas:
  - Deno check;
  - ESLint;
  - test específico SEO;
  - suite completa: 8 archivos, 45 tests;
  - dry-run y deploy de Worker.

## Decisiones

- Mantener el puente de Worker hasta que Lovable publique las Edge Functions de Supabase.
- No tocar las dos legales (`/terminos`, `/en/terms`): deben seguir `noindex`.
- No pedir indexación masiva de todo; priorizar recrawl y solicitudes selectivas si GSC no actualiza.

## Hipótesis

- Las tres fichas de recursos/benchmarks no se indexaban porque Google recibía canonical/title/schema de la home.
- `/it/prezzi` e `/integraciones` tenían señal técnica correcta pero poco contenido para bots.
- El siguiente cuello será enlazado interno/autoridad y el bloque `Descubierta: actualmente sin indexar`.

## Tareas pendientes listas para retomar

1. Publicar desde Lovable las Edge Functions actualizadas:
   - `supabase/functions/prerender/index.ts`;
   - `supabase/functions/sitemap/index.ts`.
2. Tras publicar Supabase, revalidar:
   - `/it/prezzi`;
   - `/integraciones`;
   - `/recursos/plantilla-formacion-equipo-sala`;
   - `/benchmarks-playbooks/benchmark-peso-vino-ticket-medio`;
   - `/recursos/revision-mensual-margenes`;
   - `/sitemap.xml`.
3. Decidir si se retira el puente de Worker o se mantiene como fallback.
4. En Search Console:
   - monitorizar la validación iniciada de `Rastreada: actualmente sin indexar`;
   - revisar estas seis URLs si siguen sin indexar tras recrawl;
   - solicitar indexación manual solo para las URLs estratégicas que ya estén limpias y si GSC lo permite.
5. Reforzar enlazado interno hacia `/it/prezzi`, `/integraciones`, recursos y benchmarks/playbooks desde:
   - hubs de producto;
   - blog;
   - biblioteca del vino;
   - páginas de recursos y guías.
6. Retomar `Descubierta: actualmente sin indexar`, priorizando biblioteca del vino y artículos internacionales.

## Actualización 2026-06-05: mensaje listo para Lovable

## Hechos

- Se intentó comunicar la instrucción directamente a Lovable.
- La automatización no pudo confirmar interacción segura con la pestaña de Lovable.
- Lovable todavía debe publicar las Edge Functions de Supabase para convertir el puente de Worker en solución de respaldo o retirarlo.

## Decisiones

- No considerar avisado a Lovable hasta ver confirmación explícita de envío o publicación.

## Hipótesis

- El Worker mantiene producción correcta mientras Lovable publica las Edge Functions.

## Tareas pendientes listas para retomar

1. Pegar/enviar este mensaje en el chat del proyecto Lovable `https://lovable.dev/projects/2c4eed0e-6760-45f0-aeb3-ce44de8e91f1`:

```text
Publica desde Lovable las Edge Functions de Supabase actualizadas del commit fe70c0b.

Objetivo: dejar como fuente definitiva los cambios que ahora están cubiertos temporalmente por Cloudflare Worker.

Cambios que deben publicarse:
1. supabase/functions/prerender/index.ts
   - Prerender dedicado para /recursos/*.
   - Prerender dedicado para /benchmarks-playbooks/*.
   - /integraciones con contenido de bot enriquecido.
   - Override localizado para /it/prezzi.
2. supabase/functions/sitemap/index.ts
   - Dejar de excluir recursos y benchmarks/playbooks del sitemap.

No cambies el frontend ni el Worker. El Worker ya está desplegado como puente en producción:
670b5372-cbca-48a5-92af-8ebcfb9fb5f5.

Tras publicar, validar como Googlebot:
- /it/prezzi
- /integraciones
- /recursos/plantilla-formacion-equipo-sala
- /benchmarks-playbooks/benchmark-peso-vino-ticket-medio
- /recursos/revision-mensual-margenes
- /sitemap.xml

Esperado:
- 200
- index, follow
- canonical propio
- no canonical a /
- schema WebPage/CreativeWork/Article según página
- sitemap incluye las fichas de recursos/benchmarks.

Contexto: el deploy CLI de Supabase no se pudo ejecutar aquí porque no hay SUPABASE_ACCESS_TOKEN.
```

2. Tras confirmar publicación desde Lovable, revalidar producción con user-agent Googlebot.
3. Decidir si se retira el puente de Cloudflare Worker o queda como fallback.
4. Continuar con Search Console: monitorizar `Rastreada: actualmente sin indexar` y después atacar `Descubierta: actualmente sin indexar`.

## Actualización 2026-06-06: legacy de clientes/estadísticas sin cadenas

## Hechos

- Se revisó la vista actual de GSC `Rastreada: actualmente sin indexar`.
- Sigue en `153` URLs, con datos del `29/5/26` y validación iniciada el `5/6/26`.
- Se detectó que muchos ejemplos visibles eran legacy de `/clientes/*` y `/estadisticas/*`.
- Se desplegó Worker `396ec636-a1af-4bd4-8fb6-5f9dc2b0bc3a`.
- Producción ahora responde en un solo salto:
  - `/clientes/el-capricho/` -> `/clientes`;
  - `/clientes/page/8/` -> `/clientes`;
  - `/estadisticas/estadisticas-2024-02-28-3/` -> `/benchmarks-playbooks`;
  - `/estadisticas/page/27/` -> `/benchmarks-playbooks`.
- Tests completos pasados: 8 archivos, 45 tests.

## Decisiones

- Mantener este bloque cerrado hasta que GSC recrawlee.
- No solicitar indexación manual para legacy redirigidas.

## Hipótesis

- Esas URLs deberían pasar a consolidarse como redirecciones cuando Google actualice el informe.

## Tareas pendientes listas para retomar

1. Si Lovable ya publicó Edge Functions, revalidar Supabase y decidir si retirar el puente del Worker.
2. Revisar GSC cuando actualice:
   - `Rastreada: actualmente sin indexar`;
   - `Página con redirección`;
   - `No se ha encontrado (404)`.
3. Continuar con `Descubierta: actualmente sin indexar`, priorizando:
   - biblioteca del vino;
   - artículos internacionales;
   - URLs estratégicas limpias en sitemap.
4. Reforzar enlaces internos hacia `/it/prezzi`, `/integraciones`, recursos y benchmarks/playbooks.

## Actualización 2026-06-06: `Descubierta` en validación y sitemap estabilizado

## Hechos

- Se inició validación en GSC para `Descubierta: actualmente sin indexar`.
- También se inició validación con filtro `/sitemap.xml`.
- La causa tiene `1.930` URLs y datos aún actualizados a `29/5/26`.
- La muestra visible de `1.000` URLs se reparte así:
  - `761` biblioteca del vino;
  - `154` legacy de artículos localizados;
  - `36` artículos ES canónicos;
  - `35` páginas localizadas de producto/site;
  - `11` páginas ES de producto/recurso;
  - `3` otras.
- Producción ya sirve sitemap con:
  - `2.098` URLs;
  - `1.458` de biblioteca;
  - `0` legacy `/article/{slug}_{lang}`;
  - `lastmod=2026-06-01` estable para toda la biblioteca.
- Worker desplegado: `56798607-2334-4472-8c23-d44c94af8432`.
- Tests completos pasados: 8 archivos, 45 tests.

## Decisiones

- No hacer indexación manual masiva.
- Esperar respuesta de validación de GSC mientras se refuerza señal interna.
- Mantener sitemap completo de biblioteca, pero sin falsa actualización diaria.

## Hipótesis

- Las legacy de artículos deberían salir de `Descubierta` o pasar a `Página con redirección`.
- La biblioteca del vino debería mejorar con recrawl, pero necesita enlaces internos y quizá más priorización editorial.

## Tareas pendientes listas para retomar

1. Monitorizar en GSC:
   - `Descubierta: actualmente sin indexar`, validación iniciada `6/6/26`;
   - `Rastreada: actualmente sin indexar`, validación iniciada `5/6/26`;
   - `Página con redirección`;
   - `No se ha encontrado (404)`.
2. Si Lovable publicó Edge Functions, revalidar Supabase y decidir si retirar el puente del Worker.
3. Reforzar enlaces internos hacia biblioteca del vino:
   - hubs `uvas`, `regiones`, `estilos`, `maridajes`;
   - entidades prioritarias;
   - artículos internacionales relacionados;
   - recursos y guías.
4. Auditar artículos canónicos finos detectados en `Descubierta`, empezando por `/article/alex-peiro`.

## Actualización 2026-06-07: siguiente arranque

## Hechos

- Commit publicado en GitHub: `a095b85 fix: enrich alex peiro article`.
- Lovable detectó el commit y se ejecutó `Publish project` + `Update`.
- Lovable quedó en `Up to date`.
- Producción de `/article/alex-peiro` como Googlebot sigue pendiente a nivel Supabase:
  - HTTP `200`;
  - `X-Worker-Branch: bot-prerender`;
  - canonical propio;
  - sigue el placeholder;
  - sigue con `123` palabras visibles.
- La migración que debe aplicarse es:
  - `supabase/migrations/20260607123000_enrich_alex_peiro_article.sql`.
- El fallback estático ya está enriquecido y protegido por test:
  - `src/data/articles.ts`;
  - `src/test/article-content-quality.test.ts`.
- Validaciones locales pasadas:
  - `npm run test -- --run`: 46 tests;
  - `npm run build`;
  - `git diff --check`;
  - `npx eslint src/data/articles.ts src/test/article-content-quality.test.ts`.
- Bloqueos actuales:
  - el chat de Lovable no recibía foco/texto desde el navegador integrado;
  - no hay sesión activa en `/admin`;
  - la clave pública de Supabase no permite actualizar la fila;
  - no hay `SUPABASE_ACCESS_TOKEN` documentado como disponible.

## Decisiones

- La próxima tarea debe ser aplicar la migración de Supabase, no tocar más frontend para este caso.
- No solicitar indexación de `/article/alex-peiro` hasta que producción deje de mostrar el placeholder.

## Hipótesis

- La migración puede aplicarse desde Lovable si el usuario consigue escribir en el chat o desde una vista de Supabase/SQL dentro de Lovable.
- También puede aplicarse por CLI si se proporciona `SUPABASE_ACCESS_TOKEN` o una sesión Supabase válida.

## Tareas pendientes listas para retomar

1. Aplicar `supabase/migrations/20260607123000_enrich_alex_peiro_article.sql` en Supabase.
2. Validar con:
   `curl -A 'Googlebot/2.1 (+http://www.google.com/bot.html)' -D - https://winerim.wine/article/alex-peiro?codex=a095b85`
3. Confirmar:
   - sin `Contenido pendiente`;
   - más de `500` palabras;
   - enlaces profundos a biblioteca del vino;
   - `bot-prerender`;
   - canonical propio.
4. Pedir indexación selectiva en Search Console si la validación pasa.
5. Seguir con la auditoría de artículos canónicos finos y enlazado interno hacia biblioteca.

## Actualización 2026-06-08: listo para retomar tras aplicar migración de `alex-peiro`

## Hechos

- Contradicción detectada y resuelta: el proyecto Lovable `ebb36746-82ff-43c3-86c1-558573beddcd` es `Crim`, no la web pública Winerim.
- Proyecto Lovable correcto usado: `https://lovable.dev/projects/2c4eed0e-6760-45f0-aeb3-ce44de8e91f1` (`Web Winerim`).
- La migración `supabase/migrations/20260607123000_enrich_alex_peiro_article.sql` fue aplicada desde Lovable.
- Producción revalidada como Googlebot:
  - `/article/alex-peiro?codex=lovable-20260608-verify`;
  - HTTP `200`;
  - `X-Worker-Branch: bot-prerender`;
  - `X-Prerendered: true`;
  - canonical `https://winerim.wine/article/alex-peiro`;
  - `926` palabras visibles;
  - sin placeholder;
  - enlaces a biblioteca, uvas, regiones, estilos, maridajes, software de carta y análisis de carta.
- Search Console inspeccionó `https://winerim.wine/article/alex-peiro` y mostró que la URL ya está en Google y la página está indexada.
- Se solicitó indexación para recrawl de la versión corregida.
- Search Console aceptó la solicitud y mostró `Se ha solicitado la indexación`.
- No hay cambios de código nuevos en esta sesión; el cambio real fue aplicar la migración ya versionada en Supabase.

## Decisiones

- `/article/alex-peiro` queda corregido en producción y con indexación solicitada.
- No tocar `Crim` para tareas de Winerim web pública.
- Continuar con Search Console y auditoría de artículos finos antes de abrir otra ampliación masiva de biblioteca.

## Hipótesis

- Google puede tardar días en mover la URL aunque la versión productiva ya esté corregida.
- La siguiente mejora incremental vendrá de detectar y corregir más artículos canónicos finos, no de enviar URLs masivamente a indexación.

## Tareas pendientes listas para retomar

1. Monitorizar en Search Console el recrawl de `https://winerim.wine/article/alex-peiro`.
2. Revisar la muestra de `Descubierta: actualmente sin indexar` y escoger la siguiente URL canónica fina.
3. Auditar esa URL como Googlebot con el mismo criterio:
   - `200`;
   - `bot-prerender`;
   - canonical propio;
   - sin placeholder;
   - contenido suficiente;
   - enlaces internos contextuales.

## Actualización 2026-06-08: listo para retomar tras redirects de artículos internacionales

## Hechos

- Se auditó la muestra visible de `1.000` URLs de `Descubierta: actualmente sin indexar`.
- Clasificación:
  - `761` biblioteca del vino;
  - `154` legacy `/article/{slug}_{lang}`;
  - `36` artículos canónicos `/article/{slug}`;
  - `49` otras rutas.
- Los `36` artículos canónicos visibles no son finos:
  - mínimo `590` palabras;
  - mediana `883` palabras;
  - `0` placeholders.
- Se detectaron `14` duplicados blandos: URLs internacionales en `/article/{slug}` que respondían `200`, pero canonicalizaban a `/{lang}/article/{slug}`.
- Se corrigieron en Worker con `301` a la ruta localizada.
- Worker desplegado: `881ec799-cc05-4110-8e4e-6ed75f3bcd6d`.
- Producción validada:
  - `14/14` redirigen con `X-Worker-Branch: localized-article-canonical-redirect`;
  - los destinos localizados responden `200`, `bot-prerender` y canonical propio.
- Tests y verificaciones pasadas:
  - `node --check cloudflare-worker-v3-hybrid.js`;
  - `npm run test -- --run src/test/wine-library-seo-surface.test.ts`;
  - `npx eslint cloudflare-worker-v3-hybrid.js src/test/wine-library-seo-surface.test.ts`;
  - `npm run deploy:worker:dry-run`;
  - `npm run test -- --run`;
  - `git diff --check`.

## Decisiones

- No enriquecer artículos de este lote porque no hay contenido fino visible.
- Usar redirects Worker para consolidar variantes internacionales sin prefijo de idioma.
- El foco siguiente pasa a la muestra `other` y a reforzar crawl/indexación de biblioteca del vino.

## Hipótesis

- Las `14` URLs corregidas deberían moverse a `Página con redirección` cuando GSC actualice.
- La biblioteca del vino sigue necesitando más señal interna y tiempo de crawl más que correcciones técnicas masivas.

## Tareas pendientes listas para retomar

1. Commit y push del cambio.
2. Revisar la muestra `other` de `49` URLs visibles en `Descubierta`.
3. Auditar una tanda representativa de biblioteca del vino:
   - hubs;
   - estilos;
   - uvas;
   - regiones;
   - maridajes.
4. Decidir si el siguiente bloque debe ser:
   - más enlazado interno hacia biblioteca;
   - solicitudes selectivas de indexación a hubs;
   - o refuerzo editorial de entidades con más potencial.

## Actualización 2026-06-30: listo para retomar `Aprender vino`

## Hechos

- El hub `Aprender vino` ya está implementado en código como capa separada de `Biblioteca del vino`.
- Rutas canónicas preparadas:
  - `/aprender-vino`;
  - `/en/learn-wine`;
  - `/it/imparare-il-vino`;
  - `/fr/apprendre-le-vin`;
  - `/de/wein-lernen`;
  - `/pt/aprender-vinho`.
- Están actualizados:
  - React router;
  - `ROUTE_MAP`;
  - Supabase `sitemap`;
  - Supabase `prerender`;
  - Cloudflare Worker;
  - `llms.txt`;
  - `llms-full.txt`;
  - `sitemap-extra.json`;
  - test de superficie SEO.
- Verificaciones locales pasadas:
  - test enfocado;
  - build;
  - Deno check;
  - Worker dry-run;
  - QA con Chrome headless.
- El deploy CLI local de Supabase estuvo bloqueado por falta de `SUPABASE_ACCESS_TOKEN`, pero el usuario confirmó que Lovable desplegó `sitemap` y `prerender` desde `main`.
- Commit/push completado:
  - `9c005dd feat: add learn wine hub`;
  - `origin/main` actualizado.
- Cloudflare Worker desplegado:
  - `winerim-proxy`;
  - Version ID `749b0929-9ac5-408b-8c51-7ee195051232`.
- Producción bot/sitemap:
  - Googlebot recibe prerender estático Worker con `LearningResource`;
  - `/sitemap.xml` ya contiene las seis URLs nuevas.
- Producción humana:
  - las seis rutas cargan contenido real;
  - canonical propio;
  - H1 localizado;
  - 7 `hreflang`;
  - sin `Página no encontrada`;
  - sin errores de consola;
  - sin overflow horizontal.
- Sitemap:
  - contiene las seis URLs nuevas;
  - total observado: `2.240` URLs.
- Googlebot:
  - las seis rutas devuelven `HTTP 200`;
  - `x-prerendered: true`;
  - título localizado correcto.
- El usuario informó dos hallazgos de seguridad preexistentes en buckets Supabase Storage:
  - `cartas-vinos`;
  - `lead-uploads`.
- Hay cambios no relacionados ya existentes en:
  - `index.html`;
  - `src/components/WineListAnalyzerTool.tsx`.

## Decisiones

- No mezclar `Aprender vino` dentro de la Biblioteca como si fuera otra entidad.
- Usar `Aprender vino` como hub de iniciación y captación para equipos de sala.
- Ampliar con spokes educativos desde `Aprender vino`/blog/guias, no como entidades internas de Biblioteca.
- Tratar los hallazgos de buckets Supabase Storage como tarea de seguridad independiente.

## Hipótesis

- El hub debería mejorar posicionamiento convencional y LLM al explicar de forma explícita cómo empezar y cómo usar la Biblioteca.
- La siguiente mejora de SEO/LLM vendra de Search Console, enlazado interno hacia el hub y spokes educativos propios.

## Tareas pendientes listas para retomar

1. Desplegar desde Lovable el commit `9e274d0` con seguridad Storage:
   - migración `20260630074507_harden_lead_storage_buckets.sql`;
   - frontend actualizado;
   - Edge Function `send-lead-notification`.
2. Revalidar seguridad Storage:
   - `/analisis-carta` sube archivo correctamente;
   - popup de herramientas sube archivo correctamente;
   - email interno recibe URL firmada temporal;
   - Winerim Connect recibe URL firmada temporal;
   - URLs públicas persistentes de `lead-uploads` y `cartas-vinos` dejan de funcionar.
3. Revisar Search Console en 48-72 horas:
   - `/aprender-vino` pasa de `Rastreada: actualmente sin indexar` a indexada o mantiene motivo claro;
   - EN/IT/FR/DE/PT pasan de `Descubierta` a rastreadas/indexadas.
4. Crear la migración SQL de la primera ola de spokes:
   - `como-catar-vino-en-cinco-pasos`;
   - `vocabulario-de-cata-de-vino`;
   - `maridajes-basicos-para-restaurantes`;
   - variantes EN/IT/FR/DE/PT adaptadas.
5. Cuando esos spokes estén publicados:
   - enlazarlos desde `Aprender vino`;
   - añadirlos a `llms.txt`/`llms-full.txt` si procede;
   - reenviar sitemap;
   - solicitar indexación selectiva solo para la URL principal de cada nueva ola.

## Actualizacion 2026-06-30: siguientes 5 pasos tras validar Storage

## Hechos

- El usuario confirmo que `lead-uploads` y `cartas-vinos` ya son privados en Lovable Storage.
- El usuario confirmo que las politicas RLS ya bloquean lectura anonima y limitan subidas anon/auth a rutas/tipos previstos.
- `send-lead-notification` ya esta desplegada y convierte referencias `storage://...` en URLs firmadas de 14 dias.
- La migracion efectiva de politicas es `supabase/migrations/20260630082747_c608b25f-fbaa-4950-b158-6611319b8ade.sql`.
- La migracion anterior `supabase/migrations/20260630074507_harden_lead_storage_buckets.sql` queda como no-op documentado porque Lovable bloquea `UPDATE storage.buckets`.
- Produccion del popup de herramientas ya usa `storage://cartas-vinos/...`.
- Contradiccion importante: `/analisis-carta` activo no usa `lead-uploads`; renderiza `WineListAnalyzerTool` y envia archivos a `https://api.winerim.wine/v1/analyze`.
- El codigo de `api.winerim.wine` no esta localizado en este repo.
- `npm run build` paso con avisos no bloqueantes.

## Tareas pendientes inmediatas

1. Auditar el backend real de `/analisis-carta`:
   - localizar el codigo o panel de `https://api.winerim.wine`;
   - documentar donde guarda PDFs, durante cuanto tiempo, quien accede y como se borran;
   - confirmar si el lead puede incluir una referencia interna o firmada al archivo.
2. Cerrar la deuda Storage en Lovable Cloud:
   - aplicar `file_size_limit = 10 MB` si el panel lo permite;
   - aplicar `allowed_mime_types` si el panel lo permite;
   - si no se puede, abrir soporte o dejarlo como limitacion aceptada y cubierta parcialmente por RLS/frontend.
3. Hacer QA end-to-end controlado del popup de herramientas:
   - subir un PDF/imagen de prueba;
   - confirmar que email y Winerim Connect reciben URL firmada, no `storage://` crudo ni URL publica;
   - confirmar que la URL publica antigua del bucket sigue bloqueada.
4. Limpiar la contradiccion de codigo en `/analisis-carta`:
   - eliminar o reconectar el `handleSubmit` muerto de `src/pages/AnalizaCarta.tsx`;
   - documentar en comentarios o README cual es el flujo oficial del analizador;
   - evitar que futuras auditorias crean que `lead-uploads` cubre el analizador activo.
5. Retomar crecimiento SEO/LLM de `Aprender vino`:
   - publicar primera ola de 3 spokes x 6 idiomas;
   - enlazarlos desde `Aprender vino`;
   - actualizar `llms.txt`/`llms-full.txt` si procede;
   - revisar Search Console en 48-72 h para las seis rutas del hub;
   - solicitar indexacion selectiva solo para URLs principales de cada nueva ola.

## Actualizacion 2026-07-03: próximos pasos tras Worker, Ágora V5 y migración editorial preparada

## Hechos

- Ágora V5 ya está generado:
  - `/Users/GOIKO/Documents/Playground/agora_doc_2026-07-03/output/Winerim_Agora_brief_comercial_partner_v5_2026-07-03.pdf`;
  - `/Users/GOIKO/Documents/Playground/agora_doc_2026-07-03/output/Winerim_Agora_brief_comercial_partner_v5_2026-07-03.docx`.
- Migración editorial preparada:
  - `supabase/migrations/20260703141412_add_wine_library_learn_wine_editorial_expansion.sql`;
  - 12 artículos;
  - 2 semanas editoriales;
  - 6 idiomas.
- Worker desplegado:
  - Version ID `8dd5e4dc-33da-4269-a0a1-7899a9e2e910`;
  - sitemap productivo: `2.305` URLs;
  - CloudRIM/SAVia prerender productivo enriquecido.
- Bloqueos confirmados:
  - Supabase CLI sin `SUPABASE_ACCESS_TOKEN`;
  - proyecto Supabase no enlazado;
  - `www.winerim.wine` devuelve `421`;
  - HTTP global no redirige todavía en páginas humanas.

## Decisiones

- Prioridad inmediata: aplicar migración editorial y publicar frontend, no crear más contenido sin cerrar la cadena de publicación.
- Search Console se debe tocar después de aplicar migración/publicar frontend, salvo `/presentacion`, que ya puede inspeccionarse porque está en sitemap.
- No sustituir capturas de Funcionalidades hasta conseguir capturas limpias y específicas.

## Hipótesis

- Aplicar la migración editorial debería añadir las 12 URLs nuevas al blog/sitemap según fecha si las funciones de visibilidad temporal están ya desplegadas.
- Reenviar sitemap después de la migración reducirá el desfase entre URLs reales y URLs descubiertas en Search Console.

## Tareas pendientes listas para retomar

1. Aplicar migración editorial:
   - con `SUPABASE_ACCESS_TOKEN` y proyecto enlazado;
   - o pegando SQL desde Lovable/Supabase SQL editor.
2. Verificar después de aplicar:
   - `select article_group, lang, slug, published, published_at from public.articles where article_group in (...)`;
   - esperar `12` filas, `6` por grupo.
3. Publicar frontend desde Lovable si los cambios React de CloudRIM/SAVia/Funcionalidades no están en producción.
4. Search Console:
   - reenviar `https://winerim.wine/sitemap.xml`;
   - inspeccionar `/presentacion`, `/producto/cloudrim`, `/producto/savia`, `/funcionalidades`, `/blog`;
   - pedir indexación de `/presentacion`;
   - pedir indexación de artículos solo cuando estén publicados/aplicados.
5. Cloudflare:
   - crear o corregir `www.winerim.wine` con certificado válido;
   - redirigir `www` a `https://winerim.wine/`;
   - activar regla global HTTP -> HTTPS.
6. Funcionalidades/capturas:
   - conseguir capturas limpias por funcionalidad;
   - revisar visualmente antes de publicar;
   - reemplazar solo si mejoran los composites actuales.
7. Ágora:
   - enviar V5 comercial al usuario/stakeholders;
   - preparar documento técnico separado solo si Ágora pide endpoints, auth, sandbox, rate limits o modelo multi-cliente.

## Actualizacion 2026-07-05: siguientes pasos tras preparar migracion editorial Lovable

## Hechos

- La migracion editorial esta lista para entregar a Lovable como SQL completo.
- El repo contiene los cambios de frontend/prerender/Worker/LLM/test necesarios para enlazar el nuevo spoke de Aprender vino en seis idiomas.
- Build, TypeScript, test SEO enfocado y lint focal de archivos tocados pasan.
- Lint global sigue fallando por deuda previa no relacionada.

## Decisiones

- El siguiente paso operativo no es reanalizar Supabase: es ejecutar la migracion en Lovable y publicar.
- No mezclar el backlog amplio de idioma con el publish de la migracion editorial actual.
- No tocar `src/components/WineListAnalyzerTool.tsx` sin instruccion explicita porque arrastra cambios ajenos/preexistentes.

## Hipotesis

- Si Lovable aplica la migracion y publica, los articulos del `2026-07-06` deberian quedar visibles inmediatamente y los del `2026-07-13` deberian respetar fecha.
- Search Console puede tardar en reflejar los nuevos articulos aunque las URLs esten disponibles.

## Tareas pendientes listas para retomar

1. En Lovable:
   - ejecutar `supabase--migration` con el SQL completo preparado;
   - ejecutar `preview_ui--publish`.
2. Validacion post-publish:
   - consultar que hay `12` filas para los dos `article_group`;
   - abrir `/aprender-vino`, `/en/learn-wine`, `/it/imparare-il-vino`, `/fr/apprendre-le-vin`, `/de/wein-lernen`, `/pt/aprender-vinho`;
   - confirmar que aparece el spoke de estilos en los seis idiomas;
   - inspeccionar un articulo ES, EN y PT;
   - revisar `hreflang` cuando los seis hermanos esten publicados.
3. Search Console:
   - reenviar sitemap tras publish;
   - solicitar indexacion selectiva de `/aprender-vino` si cambia el contenido detectado;
   - solicitar indexacion de articulos solo cuando esten publicados segun fecha.
4. Backlog de idioma:
   - arreglar route maps/hreflang incompletos;
   - localizar home/product sections DE/PT;
   - localizar Biblioteca detalle;
   - localizar Herramientas y `ToolStrategicBlock` para DE/PT;
   - ampliar `llms` con perfiles localizados de uvas.

## Actualizacion 2026-07-06: publicar fix de URLs legales

## Hechos

- El fix legal esta aplicado sobre rama preparada desde `origin/main`.
- Worker ya fue desplegado y cambio las nuevas URLs de `404 not-found` a HTTP `200`.
- El navegador humano seguia viendo `Página no encontrada` porque Lovable publico un deployment sin el bundle del commit legal.

## Decisiones

- Empujar el fix legal a `main` y publicar desde Lovable.
- No solicitar indexacion de paginas legales; solo usar Search Console para comprobar que ya no son `Not found`.

## Hipotesis

- Tras publish de `main`, ambas URLs renderizaran las paginas legales correctas en navegador.

## Tareas pendientes listas para retomar

1. Terminar commit/push del fix legal sobre `main`.
2. Publicar frontend en Lovable desde `main`.
3. Revalidar:
   - `https://winerim.wine/politica-privacidad`;
   - `https://winerim.wine/terminos-y-condiciones-del-contrato`;
   - Googlebot para ambas;
   - footer en home y paginas legales;
   - redirects legacy.
