# Current State

## Actualizacion 2026-07-02: produccion revalidada y sitemap completo preparado

## Hechos

- Tras el publish hecho por el usuario, `https://winerim.wine/sitemap.xml` ya sirve la version completa en produccion con deployment `1f496f52-39b9-4f32-a925-db02f74b0596`.
- La URL limpia de produccion devuelve `2.294` URLs, incluye CloudRIM/SAVia, biblioteca y articulos, y el fallback parcial de `403` ya no esta activo.
- Se reenvio `/sitemap.xml` en Search Console el 2026-07-02 y Google confirmo `Se ha enviado el sitemap correctamente`; la tabla todavia puede mostrar `403` hasta que procese la nueva lectura.
- La Edge Function productiva `prerender`, probada directamente como Googlebot, sigue antigua para CloudRIM/SAVia: devuelve contenido generico/home, canonical `https://winerim.wine`, sin CloudRIM/SAVia.
- Googlebot en el apex `winerim.wine` sigue recibiendo la home para CloudRIM/SAVia, sin `x-prerendered` ni `x-worker-branch`.
- No se debe pedir indexacion manual de CloudRIM/SAVia hasta corregir el prerender/canonical para bots.
- Tras el publish de Lovable, `https://winerim.wine/sitemap.xml` ya responde `200` en produccion, pero la version publicada inicialmente era el fallback parcial de `403` URLs.
- Search Console acepto el reenvio de `/sitemap.xml` el 2026-07-02 y paso a mostrar `403` paginas descubiertas para ese sitemap, frente a las `2.282` URLs que mostraba la lectura anterior.
- `https://winerim.wine/llms.txt` responde `200`, contiene CloudRIM/SAVia y muestra el despliegue productivo `x-deployment-id: 46a9e914-a3a2-4326-9f72-1b6b8ec36d5b`.
- En navegador real, las rutas publicadas de CloudRIM/SAVia funcionan para usuarios:
  - `/producto/cloudrim`;
  - `/producto/savia`;
  - `/en/product/cloudrim`;
  - `/pt/produto/savia`.
- En esas rutas, el navegador real muestra H1/titulo/canonical propios, contenido CloudRIM/SAVia, ausencia de `Not found` y sin overflow horizontal en el viewport probado.
- Como Googlebot en el apex, CloudRIM/SAVia siguen recibiendo el HTML shell de home: sin `x-prerendered`, sin `x-worker-branch`, canonical `https://winerim.wine/` y H1 `Carta inteligente de vinos con recomendador IA`.
- La Edge Function directa `https://pwkqbcgjrhoyxrsmcypw.supabase.co/functions/v1/sitemap` sigue respondiendo `200` con `2.282` URLs, pero no incluye todavia CloudRIM/SAVia.
- Se creo `scripts/refresh-static-sitemap.mjs` y el script npm `generate:sitemap-static` para reconstruir `public/sitemap.xml` desde la Edge Function viva y anadir solo las 12 URLs CloudRIM/SAVia que faltan.
- `public/sitemap.xml` local queda ahora en `2.294` URLs unicas: `2.282` de la fuente completa + `12` CloudRIM/SAVia, sin duplicados y con cierre XML valido.
- Validaciones locales OK:
  - `npm run generate:sitemap-static`;
  - validacion de `2.294` `<loc>` unicos y checks de CloudRIM/SAVia, biblioteca y articulo;
  - `npm run build`;
  - `git diff --check`.
- El commit `d6af8bf fix: restore full static sitemap` esta pusheado a `origin/main`.
- Tras esperar y revalidar produccion, `https://winerim.wine/sitemap.xml` sigue sirviendo el deployment `46a9e914-a3a2-4326-9f72-1b6b8ec36d5b` con `403` URLs; el push no disparo publish automatico.
- El navegador integrado no tiene acceso a los proyectos Lovable probados:
  - `https://lovable.dev/projects/ebb36746-82ff-43c3-86c1-558573beddcd`;
  - `https://lovable.dev/projects/2c4eed0e-6760-45f0-aeb3-ce44de8e91f1`.
- Ambos proyectos muestran `You don't have access`; por tanto no se pudo pulsar Publish desde Codex en esta sesion.
- `https://winerim.wine/sitemap_index.xml` devuelve `404`, asi que no sirve como mitigacion temporal para Search Console.
- El cambio ajeno `src/components/WineListAnalyzerTool.tsx` sigue sin tocarse ni incluirse.

## Decisiones

- No dejar como version final el fallback de `403` URLs porque reduce la cobertura comunicada en Search Console.
- Usar temporalmente un sitemap estatico completo de `2.294` URLs mientras el deploy CLI de Supabase siga bloqueado por falta de `SUPABASE_ACCESS_TOKEN`.
- Anadir solo CloudRIM/SAVia al sitemap completo de la Edge Function, y no las otras `204` URLs extra del fallback parcial, porque algunas son legales, privadas o paginas historicamente excluidas hasta tener prerender/canonical propio.
- Reenviar `/sitemap.xml` en Search Console de nuevo solo despues de publicar y revalidar que produccion sirve `2.294` URLs.
- Priorizar ahora el deploy de la Edge Function `prerender`; el sitemap ya esta resuelto temporalmente con el estatico completo.
- No solicitar indexacion de CloudRIM/SAVia mientras Googlebot reciba canonical raiz.

## Hipotesis

- Publicar el sitemap estatico completo deberia restaurar la cobertura de Search Console desde `403` hacia `2.294` URLs en la siguiente lectura.
- El problema de Googlebot para CloudRIM/SAVia no esta en React, porque el navegador real ve canonicals correctos; esta en la capa de prerender/Worker/Edge del apex.
- La Edge Function de sitemap sigue operativa, pero va por detras del codigo actual; por eso sirve `2.282` URLs y no las 12 nuevas.

## Contradicciones / dudas abiertas

- Contradiccion detectada: el sitemap del apex ya responde `200`, pero lo hace con el fallback parcial publicado por frontend, no con el sitemap completo historico.
- Contradiccion detectada: Search Console acepto el sitemap parcial y actualizo paginas descubiertas a `403`; hay que corregirlo con una nueva publicacion y reenvio.
- Contradiccion persistente: usuario/navegador ve CloudRIM/SAVia correctamente, pero Googlebot en el apex sigue viendo home/canonical raiz.

## Tareas pendientes

- Publicar desde Lovable o flujo equivalente el commit que deja `public/sitemap.xml` en `2.294` URLs.
- Para publicar desde Codex hace falta que la sesion de Lovable del navegador integrado tenga acceso al proyecto correcto.
- Revalidar en produccion:
  - `https://winerim.wine/sitemap.xml` debe devolver `200`;
  - debe contener `2.294` URLs;
  - debe incluir CloudRIM/SAVia, biblioteca y articulos.
- Reenviar `/sitemap.xml` en Search Console tras esa revalidacion para reemplazar la lectura parcial de `403`.
- Resolver el prerender del apex para que Googlebot reciba CloudRIM/SAVia con canonical propio.
- Desplegar `supabase/functions/prerender/index.ts` desde Lovable/Supabase o recuperar `SUPABASE_ACCESS_TOKEN` para hacerlo por CLI.

## Actualizacion 2026-07-02: puente Worker desplegado y bloqueo de apex detectado

## Hechos

- Se anadio en `cloudflare-worker-v3-hybrid.js` un prerender estatico puente para CloudRIM y SAVia en `es/en/it/fr/de/pt`.
- El puente Worker genera HTML bot con canonical propio, `hreflang`, schema `SoftwareApplication`, `x-prerendered: true` y `x-worker-branch: worker-static-prerender`.
- Se anadio inyeccion de las 12 rutas CloudRIM/SAVia al sitemap del Worker cuando la Edge Function antigua no las incluya.
- Se reforzo `src/test/wine-library-seo-surface.test.ts` para cubrir `CLOUDRIM_WORKER_PAGES`, `SAVIA_WORKER_PAGES` y `missingCloudRimSaviaPaths`.
- Se genero `public/sitemap.xml` como fallback estatico con 403 URLs procedentes de `public/sitemap-extra.json`, incluyendo CloudRIM/SAVia y variantes localizadas.
- Validaciones locales OK:
  - `node --check cloudflare-worker-v3-hybrid.js`;
  - `npm run test -- --run src/test/wine-library-seo-surface.test.ts`;
  - `npm run build`;
  - `npm run deploy:worker:dry-run`;
  - `git diff --check`.
- Se desplego Cloudflare Worker `winerim-proxy` version `41cd1394-5a19-4ead-abc9-436fb646f41e` con triggers:
  - `winerim.wine/*`;
  - `go.winerim.wine/*`.
- `https://go.winerim.wine/producto/cloudrim` valida como Googlebot con `worker-static-prerender`, canonical de `https://winerim.wine/producto/cloudrim` y contenido CloudRIM.
- `https://winerim.wine/producto/cloudrim` no ejecuta el Worker: Googlebot recibe el HTML shell de home con canonical `https://winerim.wine/`.
- Cloudflare Trace para `https://go.winerim.wine/producto/cloudrim` muestra `Workers > winerim-proxy` como matched.
- Cloudflare Trace para `https://winerim.wine/producto/cloudrim` devuelve `hostname does not belong to your account`, aunque la zona `winerim.wine` y la ruta Worker aparecen en el dashboard.
- Se probo cambiar el registro apex `A winerim.wine -> 185.158.133.1` a `Proxied`; no hizo entrar el Worker y dejo `/sitemap.xml` en `404`.
- Se revirtio el apex a `DNS only` para no dejar una configuracion proxied que no aporta Worker.
- Produccion actual sigue sin sitemap publico en apex: `https://winerim.wine/sitemap.xml` devuelve `404` hasta que se publique el fallback estatico o se reactive la capa Edge/Worker correcta.
- El deploy CLI de Supabase sigue bloqueado por falta de `SUPABASE_ACCESS_TOKEN`.
- El cambio local ajeno `src/components/WineListAnalyzerTool.tsx` sigue sin tocarse ni incluirse.

## Decisiones

- Mantener el puente Worker y el fallback de sitemap estatico en codigo, porque son necesarios cuando `prerender`/`sitemap` de Supabase no estan publicados.
- No dejar el apex en `Proxied` mientras Cloudflare Trace diga que `winerim.wine` no pertenece al account para esa traza y el Worker no se ejecute.
- No reenviar sitemap en Search Console hasta que `https://winerim.wine/sitemap.xml` devuelva `200`.
- Tratar el problema del apex como bloqueo de configuracion Cloudflare/Lovable/proveedor, no como bug de React ni del Worker, porque `go.winerim.wine` ejecuta el mismo Worker correctamente.

## Hipotesis

- El apex `winerim.wine` parece estar condicionado por la integracion/proveedor de Lovable o por ownership de hostname, mientras que `go.winerim.wine` si pertenece al account a efectos de Workers/Trace.
- Publicar `public/sitemap.xml` desde Lovable deberia recuperar un sitemap basico aunque el Worker del apex siga sin ejecutarse.
- Desplegar las Edge Functions `sitemap` y `prerender` desde Lovable/Supabase podria resolver el sitemap y el prerender sin depender del Worker del apex.

## Contradicciones / dudas abiertas

- Contradiccion detectada: en Cloudflare existen rutas `winerim.wine/*` y `go.winerim.wine/*` hacia `winerim-proxy`, pero Trace solo reconoce `go.winerim.wine` como hostname del account.
- Contradiccion detectada: la documentacion historica daba por operativo `/sitemap.xml`, pero la validacion actual de produccion devuelve `404`.
- Pendiente confirmar si Lovable ha cambiado la configuracion del dominio apex o si el sitemap dependia antes de una capa Worker/Edge que ya no esta efectiva en el apex.

## Tareas pendientes

- Publicar desde Lovable el frontend que incluye `public/sitemap.xml`.
- Revalidar despues del publish:
  - `https://winerim.wine/sitemap.xml` debe devolver `200`;
  - debe contener `/producto/cloudrim`, `/producto/savia` y variantes localizadas.
- Resolver con Cloudflare/Lovable por que Trace dice `hostname does not belong to your account` para `winerim.wine`.
- Cuando el apex vuelva a pasar por Worker o Edge Functions:
  - revalidar CloudRIM/SAVia como Googlebot en las 12 rutas;
  - confirmar canonicals propios;
  - reenviar `/sitemap.xml` en Search Console.
- Desplegar `sitemap` y `prerender` desde Lovable/Supabase cuando haya acceso operativo.
- Mantener fuera de alcance `src/components/WineListAnalyzerTool.tsx` salvo instruccion expresa.

## Actualizacion 2026-07-02: CloudRIM y SAVia incorporados en la web

## Hechos

- Se implementaron las paginas de producto:
  - `/producto/cloudrim`;
  - `/producto/savia`.
- Ambas paginas tienen contenido localizado para `es/en/it/fr/de/pt`, SEOHead con canonical localizado, breadcrumbs, FAQ, schema `SoftwareApplication` y enlaces internos.
- Se anadio el bloque `CloudRIM + SAVia` en home justo despues de la solucion de 5 herramientas.
- Se anadieron enlaces a CloudRIM y SAVia en navbar y footer.
- Se anadieron dos cards de CloudRIM/SAVia en `/funcionalidades`.
- Se anadio una seccion CloudRIM en `/integraciones` para explicar el puente documental cuando no hay API perfecta.
- Se anadio una seccion SAVia en `/producto/inteligencia-dinamica` como forma conversacional de usar la inteligencia de Winerim.
- Se sincronizaron rutas en `src/App.tsx` y `src/i18n/types.ts` para ES, EN, IT, FR, DE y PT.
- Se sincronizo la superficie SEO/LLM:
  - `supabase/functions/sitemap/index.ts`;
  - `supabase/functions/prerender/index.ts`;
  - `cloudflare-worker-v3-hybrid.js`;
  - `public/sitemap-extra.json`;
  - `public/llms.txt`;
  - `public/llms-full.txt`;
  - `src/test/wine-library-seo-surface.test.ts`.
- Se corrigio durante QA que el titulo `Como funciona CloudRIM` existia en copy pero no se renderizaba en la tarjeta de pasos.
- Validaciones locales OK:
  - `npm run test -- --run src/test/wine-library-seo-surface.test.ts`;
  - `npm run build`;
  - `git diff --check`;
  - `node --check cloudflare-worker-v3-hybrid.js`;
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`;
  - validacion JSON de `public/sitemap-extra.json`;
  - `npm run deploy:worker:dry-run`.
- QA local con Chrome en `http://127.0.0.1:4179` OK en desktop y mobile para:
  - `/producto/cloudrim`;
  - `/en/product/cloudrim`;
  - `/producto/savia`;
  - `/pt/produto/savia`;
  - `/`;
  - `/funcionalidades`;
  - `/integraciones`;
  - `/producto/inteligencia-dinamica`.
- La QA confirmo canonicals correctos, contenido visible, ausencia de `Not found` y sin overflow horizontal.
- El deploy CLI de Supabase SEO sigue bloqueado por falta de `SUPABASE_ACCESS_TOKEN`.
- No se desplego el Worker real porque debe ir despues de publicar frontend y Edge Functions desde Lovable/Supabase.
- El cambio local ajeno `src/components/WineListAnalyzerTool.tsx` sigue sin tocarse ni incluirse.

## Decisiones

- Tratar CloudRIM y SAVia como capacidades principales de producto, con paginas propias y presencia transversal en home, funcionalidades, integraciones e inteligencia dinamica.
- Posicionar CloudRIM como nube operativa/documental que recoge cartas, ventas, albaranes, stock, reportes TPV y tarifas por los canales reales del restaurante.
- Posicionar SAVia como agente conversacional que consulta y prepara decisiones, sin ejecutar acciones criticas sin aprobacion humana.
- No desplegar el Worker productivo antes de que Lovable publique frontend y Edge Functions `sitemap`/`prerender`.

## Hipotesis

- CloudRIM deberia hacer mas tangible el mensaje de `subes tus albaranes y olvidate` porque explica como entran documentos y datos dispersos en Winerim.
- SAVia deberia reforzar conversion y posicionamiento LLM al traducir dashboards y datos operativos en preguntas naturales.
- La inclusion en `llms.txt` y `llms-full.txt` deberia ayudar a que modelos externos entiendan CloudRIM/SAVia como parte central de Winerim.

## Contradicciones / dudas abiertas

- No hay contradicciones nuevas de producto detectadas.
- La unica limitacion operativa es conocida: el CLI de Supabase no puede desplegar sin `SUPABASE_ACCESS_TOKEN`.
- Produccion todavia no esta revalidada para estas rutas hasta que Lovable/Supabase publiquen los cambios.

## Tareas pendientes

- Pushear el commit de CloudRIM/SAVia a `origin/main`.
- En Lovable, publicar frontend y desplegar Edge Functions:
  - `sitemap`;
  - `prerender`.
- Desplegar Cloudflare Worker despues de la publicacion de frontend/Edge Functions.
- Revalidar produccion como usuario y Googlebot:
  - `/producto/cloudrim`;
  - `/producto/savia`;
  - variantes EN/IT/FR/DE/PT;
  - home;
  - `/funcionalidades`;
  - `/integraciones`;
  - `/producto/inteligencia-dinamica`;
  - `/sitemap.xml`;
  - `llms.txt` y `llms-full.txt`.
- Reenviar `/sitemap.xml` en Search Console tras confirmar produccion.
- Mantener fuera de alcance `src/components/WineListAnalyzerTool.tsx` salvo instruccion expresa.

## Actualizacion 2026-07-01: revalidacion productiva de landing Meta Demo

## Hechos

- Se hizo una segunda pasada de QA sobre la landing de `go.winerim.wine` despues del commit `67e245a`.
- Estado repo al iniciar la pasada: `main` en `67e245a`; unico cambio local ajeno pendiente `src/components/WineListAnalyzerTool.tsx`.
- Validaciones locales:
  - `npm run build` OK;
  - `git diff --check` OK;
  - capturas desktop/mobile de `http://127.0.0.1:4190/meta-demo` OK;
  - el codigo contiene `Sistema Winerim IA`, los 4 bullets nuevos, `Solicita tu demo`, `+2.000` y no contiene `Prueba gratuita`, `PLANTILLA`, `+1.000` ni `BODEGAS GESTIONADAS`.
- Produccion ya esta publicada: `https://go.winerim.wine/` renderiza `Sistema Winerim IA`.
- Produccion en `https://winerim.wine/meta-demo` tambien renderiza la landing actualizada.
- Headers productivos revisados:
  - `HTTP 200`;
  - `x-robots-tag: noindex, follow`;
  - `x-worker-branch: spa`;
  - `x-deployment-id: e39de2d7-cea8-40e7-b65a-2b8a4ca7690d`.
- DOM productivo revisado:
  - title `Solicita una demo gratuita de Winerim | Winerim`;
  - robots `noindex, follow`;
  - canonical `https://go.winerim.wine/`;
  - OpenGraph `https://winerim.wine/og-image.png`;
  - chat desactivado (`window.__WINERIM_CHAT_DISABLED__ === true`) y sin nodos de chat.
- Layout productivo:
  - desktop sin overflow horizontal (`1280/1280`);
  - mobile sin overflow horizontal (`390/390`);
  - CTA fijo visible en desktop/mobile.
- Clic real sobre el CTA fijo en mobile:
  - actualiza hash a `#demo-form`;
  - desplaza a `scrollY=1188`;
  - deja `#demo-form` visible con top aproximado `96px`.
- UTMs/fbclid en produccion verificados con query real: los hidden inputs conservan `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` y `fbclid`.
- Formulario inspeccionado: conserva 19 controles, campos obligatorios y selects esperados.
- No se envio lead nuevo al CRM en esta pasada para evitar ruido, porque el cambio revalidado no toco backend ni `onSubmit`.
- Unicos 404 observados: `https://go.winerim.wine/__l5e/trackevents`, tracking interno de Lovable no bloqueante.

## Decisiones

- Dar por publicada y revalidada la actualizacion de copy/CTA de la landing Meta Demo.
- No hacer prueba de envio CRM adicional salvo peticion expresa o cambio futuro en el flujo de formulario.
- Mantener el banner global de cookies como posible mejora CRO separada, no como incidencia de esta pasada.

## Hipotesis

- La landing deberia estar lista para trafico de campana desde el punto de vista de copy, CTA, atribucion UTM y SEO `noindex`.
- Los 404 de `__l5e/trackevents` no deberian afectar conversion ni tracking propio de Winerim; parecen ruido de Lovable.

## Contradicciones / dudas abiertas

- La navegacion directa a `https://go.winerim.wine/#demo-form` no desplaza en captura inicial por el comportamiento de carga de la SPA, pero el clic real del CTA ya renderizado si funciona correctamente.
- Sigue pendiente decidir si se adapta el banner de cookies para mejorar conversion en landings de pago.

## Tareas pendientes

- Retomar CloudRIM/SAVia cuando el usuario lo confirme.
- Si se quiere una QA completa de CRM tras el publish, enviar un lead test nuevo y verificar `contact_leads`, `send-lead-notification` y `submit-gastrofunnel`.
- Mantener fuera de alcance `src/components/WineListAnalyzerTool.tsx` salvo instruccion expresa.

## Actualizacion 2026-07-01: landing Meta Demo actualizada antes de CloudRIM/SAVia

## Hechos

- El usuario pidio pausar la entrada en CloudRIM/SAVia para actualizar primero la landing de `go.winerim.wine`.
- Se tomo como referencia el contenido de `https://sites.leadconnectorhq.com/preview/2xc4bo8rOcqAkRWPLO5H?notrack=true`.
- Se actualizo `src/pages/MetaDemoLanding.tsx`:
  - el badge pasa de `Prueba gratuita` a `Sistema Winerim IA`;
  - el bloque superior `Sin compromiso` sale de la cabecera;
  - se anade CTA fijo superior derecho `Solicita tu demo` con ancla al formulario;
  - los bullets principales usan el nuevo copy comercial;
  - la primera frase de cada bullet queda en negrita.
- Se mantuvieron los testimonios reales existentes en vez de volver a los placeholders de la referencia.
- Se mantuvo `+2.000 restaurantes` en vez de `+1.000 bodegas gestionadas`.
- No se cambio el flujo del formulario: sigue conectado por React a Supabase, notificaciones y CRM.
- Validaciones locales OK:
  - `npm run build`;
  - `git diff --check -- src/pages/MetaDemoLanding.tsx`;
  - captura Playwright desktop/mobile;
  - comprobacion por selector `Sistema Winerim IA`.
- La captura local muestra que el banner global de cookies tapa parte del formulario en primera visita; es comportamiento preexistente/global, no causado por este cambio.
- El cambio local previo y ajeno en `src/components/WineListAnalyzerTool.tsx` sigue sin tocarse ni incluirse.
- CloudRIM/SAVia sigue pendiente de implementacion; solo se habia preparado el plan solicitado.

## Decisiones

- Usar el copy nuevo de LeadConnector para los bullets, puliendo la frase final que venia duplicada/mal puntuada.
- Conservar la prueba social decidida previamente: `+2.000 restaurantes`.
- Conservar testimonios reales y no publicar placeholders en una landing de campana.
- Mantener el CTA fijo como ancla al formulario, sin modificar backend ni tracking.

## Hipotesis

- El nuevo copy deberia alinear mejor la landing con campanas Meta centradas en IA, stock muerto, ventas y restaurantes premium.
- El CTA fijo deberia aumentar llegada al formulario en scroll, especialmente en mobile.
- Quitar `Sin compromiso` de la cabecera reduce ruido visual, aunque el mensaje sigue presente en copy/trust.

## Contradicciones / dudas abiertas

- La referencia externa incluye `+1.000 bodegas gestionadas`, pero la decision vigente del proyecto es usar `+2.000 restaurantes`.
- La referencia externa incluye testimonios plantilla, pero la decision vigente es no publicar placeholders ni testimonios inventados.
- El banner de cookies puede reducir conversion en primera visita de pago; conviene decidir si se ajusta solo para `go.winerim.wine`.

## Tareas pendientes

- Pushear el cambio de landing y publicar frontend desde Lovable.
- Revalidar `https://go.winerim.wine/` tras publish:
  - badge `Sistema Winerim IA`;
  - CTA fijo superior derecho;
  - bullets nuevos con primera frase en negrita;
  - `+2.000 restaurantes`;
  - testimonios reales;
  - formulario y CRM sin regresiones.
- Valorar ajuste CRO del banner de cookies para landings de pago.
- Retomar despues la implementacion de CloudRIM/SAVia desde el handoff y el plan ya dado.

## Actualizacion 2026-07-01: revalidacion post-publish y fix de canonicals/localizacion

## Hechos

- El usuario confirmo que el frontend con la ampliacion comercial de Core/Supply/Meta Demo ya estaba publicado.
- Se revalido produccion en navegador real, desktop y mobile, para:
  - `https://winerim.wine/producto/winerim-core`;
  - `https://winerim.wine/en/product/winerim-core`;
  - `https://winerim.wine/producto/winerim-supply`;
  - `https://winerim.wine/pt/produto/winerim-supply`;
  - `https://go.winerim.wine/`.
- La revalidacion confirmo que las nuevas secciones estan visibles, los CTAs estan presentes, no hay overflow horizontal y no aparece `Not found`.
- `https://go.winerim.wine/` mantiene canonical propio, H1 correcto, bloque `Que veras en la demo`, formulario presente y cabecera `x-robots-tag: noindex, follow`.
- Se detecto una contradiccion SEO en produccion: `/en/product/winerim-core` mostraba contenido ingles, pero el canonical seguia apuntando a `/producto/winerim-core`.
- Se corrigio localmente `src/pages/WinerimCore.tsx` para calcular la URL canonica con `CANONICAL_DOMAIN + localePath("/producto/winerim-core")`.
- Se corrigio localmente `src/components/DecisionCenterTeaser.tsx` con traducciones DE/PT y fallback mediante `getI18n`, cerrando la deuda detectada de texto espanol en variantes PT/DE.
- Validaciones locales del fix OK:
  - `npm run build`;
  - `git diff --check`;
  - navegador local para `/en/product/winerim-core`, `/de/produkt/winerim-core` y `/pt/produto/winerim-supply` con canonical/copy correctos y sin overflow.
- Sigue existiendo un cambio local previo y ajeno en `src/components/WineListAnalyzerTool.tsx`; no se toco ni debe incluirse.

## Decisiones

- Considerar la ampliacion comercial de Core/Supply/Meta Demo publicada y validada en produccion.
- Corregir de inmediato canonicals localizados incorrectos aunque la pagina sea visible y funcional.
- Resolver la localizacion de componentes compartidos en el componente comun (`DecisionCenterTeaser`) para evitar residuos de idioma en varias paginas.

## Hipotesis

- El canonical localizado de Core deberia reducir senales de duplicidad o consolidacion erronea en paginas internacionales de producto.
- Las traducciones DE/PT del teaser deberian mejorar consistencia de idioma y calidad percibida en producto, especialmente para crawlers y usuarios internacionales.

## Contradicciones / dudas abiertas

- Contradiccion detectada y corregida localmente: contenido ingles en `/en/product/winerim-core` con canonical espanol en produccion.
- El fix todavia no esta publicado en produccion hasta que Lovable publique el commit nuevo.
- Search Console sigue con cuota diaria superada para las solicitudes manuales pendientes.

## Tareas pendientes

- Pushear el fix de canonical/localizacion y publicar frontend desde Lovable.
- Revalidar en produccion despues del publish:
  - `/en/product/winerim-core` canonical `https://winerim.wine/en/product/winerim-core`;
  - `/de/produkt/winerim-core` canonical `https://winerim.wine/de/produkt/winerim-core`;
  - `/pt/produto/winerim-supply` teaser Decision Center en portugues.
- Cuando se reinicie la cuota de Search Console, solicitar indexacion manual de las 3 URLs ES nuevas de `Aprender vino` y de `/it/calcolatrice-margini-vino`.
- Revisar si Search Console actualiza el conteo de sitemap hacia `2282`.

## Actualizacion 2026-07-01: segunda oleada publicada y bloque comercial ampliado

## Hechos

- El usuario confirmo que Lovable habia aplicado/publicado la segunda oleada de `Aprender vino`.
- Se validaron antes del Worker las 18 URLs nuevas de articulos como Googlebot: `HTTP 200`, `x-prerendered: true`, canonical propio y contenido real sin `Not found`.
- Se desplego Cloudflare Worker `winerim-proxy` version `6d8af13d-2ac0-4626-8535-2f5457954d56`.
- Tras el Worker, los 6 hubs de `Aprender vino` responden como Googlebot con `HTTP 200`, `x-worker-branch: worker-static-prerender`, `x-prerendered: true`, canonical propio y enlaces a las 6 guias por idioma.
- Validacion en navegador real de los hubs: 6 enlaces de articulo por idioma, canonical correcto y sin overflow en desktop y mobile.
- `/sitemap.xml` productivo contiene `2282` URLs y las 18 URLs nuevas de la segunda oleada.
- Search Console mostraba aun `2.264` paginas descubiertas para `/sitemap.xml` antes del nuevo procesamiento.
- Se reenvio `/sitemap.xml` en Search Console y Google confirmo `Se ha enviado el sitemap correctamente`.
- La solicitud manual de indexacion para `https://winerim.wine/article/tipos-de-vino-para-entender-una-carta` devolvio `Cuota superada`.
- Por cuota diaria superada, quedan sin solicitar manualmente:
  - `https://winerim.wine/article/tipos-de-vino-para-entender-una-carta`;
  - `https://winerim.wine/article/uvas-que-conocer-para-empezar`;
  - `https://winerim.wine/article/regiones-vinicolas-para-empezar-en-restaurante`;
  - `https://winerim.wine/it/calcolatrice-margini-vino`.
- Se amplio `src/components/landing/ConnectedCellarSection.tsx` con variantes `home`, `core` y `supply`.
- `src/pages/WinerimCore.tsx` usa la variante `core` para explicar el paso de datos operativos a diagnosticos.
- `src/pages/WinerimSupply.tsx` usa la variante `supply` para explicar albaranes, compras, stock, reposicion y negociacion.
- `src/pages/MetaDemoLanding.tsx` incorpora la seccion compacta `Que veras en la demo` sobre albaranes, TPV/stock y margen real.
- Se corrigio el conector multidioma de `WinerimSupply` para DE/PT: ya no hereda el texto frances.
- Validaciones locales OK:
  - `npm run build`;
  - `git diff --check`;
  - QA navegador local desktop/mobile para Core, Supply y Meta Demo sin overflow ni `Not found`.
- Deuda detectada durante QA: `DecisionCenterTeaser` muestra texto espanol en variantes PT/DE de paginas de producto.
- Sigue existiendo un cambio local previo y ajeno en `src/components/WineListAnalyzerTool.tsx`; no se toco ni debe incluirse en este commit.

## Decisiones

- Desplegar el Worker solo despues de comprobar que las 18 URLs nuevas ya existian en Supabase/Lovable.
- Mantener solicitudes manuales de Search Console para URLs estrategicas, pero no insistir cuando Google devuelve cuota superada.
- Reutilizar `ConnectedCellarSection` con variantes contextuales en vez de duplicar secciones separadas por producto.
- Mantener la landing Meta enfocada al formulario y anadir solo una version corta del flujo operativo.

## Hipotesis

- El sitemap reenviado deberia permitir que Search Console pase de `2.264` paginas descubiertas hacia las `2282` URLs actuales cuando procese la nueva lectura.
- Las nuevas variantes `core` y `supply` deberian mejorar conversion porque explican como Winerim convierte datos operativos en decisiones concretas.
- La seccion corta de Meta Demo deberia ayudar a que trafico frio entienda mejor la propuesta antes de leer testimonios o enviar el formulario.

## Contradicciones / dudas abiertas

- Search Console aun mostraba `2.264` paginas descubiertas aunque el sitemap productivo contiene `2282` URLs.
- Search Console sigue con cuota diaria superada para solicitudes manuales de indexacion.
- `DecisionCenterTeaser` conserva texto espanol en variantes PT/DE; queda como deuda de localizacion separada.

## Tareas pendientes

- Publicar en Lovable el frontend con las nuevas secciones comerciales.
- Revalidar produccion de:
  - `/producto/winerim-core`;
  - `/en/product/winerim-core`;
  - `/producto/winerim-supply`;
  - `/pt/produto/winerim-supply`;
  - `https://go.winerim.wine/`.
- Cuando se reinicie la cuota de Search Console, solicitar indexacion manual de las 3 URLs ES nuevas y de `/it/calcolatrice-margini-vino`.
- Revisar si Search Console actualiza el conteo de sitemap hacia `2282`.
- Corregir la localizacion de `DecisionCenterTeaser` en PT/DE.

## Actualizacion 2026-07-01: segunda oleada `Aprender vino` preparada

## Hechos

- Se preparo la segunda oleada de `Aprender vino` como articulos localizados, separada de `Biblioteca del vino`.
- Se creo la migracion `supabase/migrations/20260701102537_add_learn_wine_second_spokes.sql` mediante `supabase migration new add_learn_wine_second_spokes`.
- La migracion inserta/actualiza 18 articulos publicados en `public.articles`: 3 temas x 6 idiomas.
- Temas incluidos:
  - tipos de vino para entender una carta;
  - uvas/castas/cepages/rebsorten para empezar;
  - regiones vinicolas para empezar en restaurante.
- Cada tema comparte `article_group` en los seis idiomas:
  - `learn-wine-wine-types`;
  - `learn-wine-grapes-to-start`;
  - `learn-wine-regions-to-start`.
- Los slugs siguen el patron actual: ES sin sufijo y variantes internacionales con sufijo DB `_en/_it/_fr/_de/_pt`, publicadas como `/{lang}/article/{slug}`.
- `src/pages/AprenderVino.tsx` enlaza ahora 6 guias por idioma en el hub.
- Se actualizaron `supabase/functions/prerender/index.ts`, `cloudflare-worker-v3-hybrid.js`, `public/llms.txt`, `public/llms-full.txt` y `src/test/wine-library-seo-surface.test.ts`.
- Validaciones OK:
  - `npm run test -- --run src/test/wine-library-seo-surface.test.ts`;
  - `npm run build`;
  - `node --check cloudflare-worker-v3-hybrid.js`;
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`;
  - `git diff --check`.
- Validacion de migracion por inspeccion: 18 slugs unicos, 3 grupos, pares `$md$` y `$json$` equilibrados y `ON CONFLICT (slug) DO UPDATE`.
- QA navegador local en `http://127.0.0.1:5173/`: `/aprender-vino`, `/en/learn-wine` y `/pt/aprender-vinho` muestran 6 enlaces de articulo en desktop y mobile, sin overflow horizontal.
- No se desplego Worker todavia porque los enlaces nuevos no deben exponerse en produccion antes de aplicar la migracion de articulos en Supabase.
- Sigue existiendo un cambio local previo y ajeno en `src/components/WineListAnalyzerTool.tsx`; no se toco.

## Decisiones

- Mantener la segunda oleada como articulos de `Aprender vino`, no como nuevas entidades de `Biblioteca del vino`.
- Publicar tipos, uvas y regiones como contenido guiado B2B para equipos de sala, conectando aprendizaje con carta, recomendacion, analisis y demo.
- No desplegar el Worker hasta que Lovable/Supabase aplique la migracion y publique el frontend, para evitar que bots vean enlaces a articulos aun inexistentes.

## Hipotesis

- La segunda oleada deberia reforzar el hub como ruta educativa completa porque cubre los tres bloques que faltaban tras cata/vocabulario/maridaje: tipos, uvas y regiones.
- Al estar enlazados desde hub, prerender, Worker y `llms`, los nuevos articulos deberian mejorar descubrimiento SEO/LLM cuando se aplique la migracion.

## Contradicciones / dudas abiertas

- La migracion esta preparada y validada localmente, pero no esta aplicada en la base productiva hasta que Lovable/Supabase ejecute el deploy.
- El frontend local ya enlaza 6 guias, pero produccion no debe considerarse actualizada hasta publish de Lovable.

## Tareas pendientes

- Aplicar en Lovable/Supabase la migracion `20260701102537_add_learn_wine_second_spokes.sql`.
- Publicar frontend desde Lovable.
- Desplegar Edge Functions `sitemap` y `prerender`.
- Desplegar Cloudflare Worker despues de aplicar migracion/frontend/Edge Functions.
- Revalidar produccion humana y Googlebot para hubs y los 18 nuevos articulos.
- Reenviar `/sitemap.xml` y solicitar indexacion selectiva de las URLs ES de la segunda oleada.

## Actualizacion 2026-07-01: produccion distribuidores/margenes y Search Console

## Hechos

- El usuario confirmo que el deploy/publish/purge ya estaba hecho y se revalido produccion.
- Produccion como Googlebot valida 12/12 rutas de distribuidores y calculadora de margen:
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
- Las 12 rutas responden `HTTP 200`, `x-prerendered: true`, canonical propio, 7 `hreflang`, H1 localizado y sin fallback/home/`Not found`.
- Las seis rutas de distribuidores responden como Googlebot por `x-worker-branch: worker-static-prerender`.
- Las seis rutas de calculadora de margen responden como Googlebot por `x-worker-branch: bot-prerender`.
- Produccion en navegador real valida 12/12 rutas para usuarios: contenido localizado, H1 correcto, canonical propio, sin fallback ni `Pagina no encontrada`.
- Observacion tecnica: el HTML crudo no-bot via `curl` devuelve el shell SPA con title/canonical de home, pero el navegador real y Googlebot reciben la ruta correcta.
- `/sitemap.xml` responde `HTTP 200`, `x-worker-branch: sitemap-worker-detail-bridge`, contiene las 12 URLs revisadas y expone `2264` entradas.
- Search Console mostraba `/sitemap.xml` ya enviado y leido el 1 jul 2026 como `Correcto`, con `2.258` paginas descubiertas antes de releer la version de `2264` URLs.
- Se reenvio `/sitemap.xml` en Search Console y Google confirmo `Se ha enviado el sitemap correctamente`.
- Search Console acepto solicitud manual de indexacion/reindexacion para 11 URLs:
  - `https://winerim.wine/distribuidor`;
  - `https://winerim.wine/calculadora-margen-vino`;
  - `https://winerim.wine/en/distributor`;
  - `https://winerim.wine/en/wine-margin-calculator`;
  - `https://winerim.wine/pt/distribuidor`;
  - `https://winerim.wine/pt/calculadora-margem-vinho`;
  - `https://winerim.wine/fr/distributeur`;
  - `https://winerim.wine/fr/calculateur-marge-vin`;
  - `https://winerim.wine/de/haendler`;
  - `https://winerim.wine/de/wein-margen-rechner`;
  - `https://winerim.wine/it/distributore`.
- Search Console no acepto la solicitud manual de `https://winerim.wine/it/calcolatrice-margini-vino` porque se alcanzo la cuota diaria.
- Estado visto en Search Console durante la inspeccion:
  - `/distribuidor`: `La URL no esta en Google`; razon `Google no reconoce esta URL`; solicitud aceptada.
  - `/calculadora-margen-vino`: `La URL esta en Google`; recrawl solicitado.
  - `/en/distributor`: `Descubierta: actualmente sin indexar`; solicitud aceptada.
  - `/en/wine-margin-calculator`: `La URL esta en Google`; recrawl solicitado.
  - `/pt/distribuidor`: `Pagina alternativa con etiqueta canonica adecuada`; solicitud aceptada.
  - `/pt/calculadora-margem-vinho`: `La URL esta en Google`; recrawl solicitado.
  - `/fr/distributeur`: `Descubierta: actualmente sin indexar`; solicitud aceptada.
  - `/fr/calculateur-marge-vin`: `Rastreada: actualmente sin indexar`; solicitud aceptada.
  - `/de/haendler`: `Descubierta: actualmente sin indexar`; solicitud aceptada.
  - `/de/wein-margen-rechner`: `La URL esta en Google`; recrawl solicitado.
  - `/it/distributore`: `Google no reconoce esta URL`; solicitud aceptada.
  - `/it/calcolatrice-margini-vino`: `Rastreada: actualmente sin indexar`; rastreo permitido, obtencion correcta, indexacion permitida, canonical declarado y seleccionado como la URL inspeccionada, presente en sitemap, pero sin solicitud por cuota diaria.
- Sigue existiendo un cambio local previo y ajeno en `src/components/WineListAnalyzerTool.tsx`; no se toco.

## Decisiones

- Dar por publicada y revalidada tecnicamente la tanda de distribuidores y calculadora de margen en produccion.
- Usar Search Console para solicitudes manuales solo en URLs estrategicas y respetar cuota diaria; el resto debe apoyarse en sitemap, enlazado interno y monitorizacion.
- Considerar valido el comportamiento SEO si Googlebot y navegador real reciben contenido correcto, aunque el HTML crudo no-bot siga siendo shell SPA.
- Vigilar el caso `/pt/distribuidor` por la senal de `Pagina alternativa con etiqueta canonica adecuada`; no tratarlo como error bloqueante mientras canonical/hreflang/productivo sean correctos.

## Hipotesis

- Las 11 solicitudes manuales deberian acelerar el rastreo, pero no garantizan indexacion inmediata ni posicionamiento.
- Search Console podria actualizar el conteo de sitemap de `2.258` a `2.264` en la proxima lectura.
- La senal de `/pt/distribuidor` podria deberse a similitud internacional, a una decision temporal de Google o a consolidacion canonica previa; si persiste, convendra reforzar diferenciacion local y enlazado especifico PT.

## Contradicciones / dudas abiertas

- Diferencia observada: `/sitemap.xml` productivo contiene `2264` URLs, mientras Search Console mostraba `2.258` paginas descubiertas antes de procesar el reenvio.
- `https://winerim.wine/it/calcolatrice-margini-vino` esta tecnicamente apta para indexacion, pero queda sin solicitud manual por cuota diaria de Search Console.

## Tareas pendientes

- Manana solicitar manualmente la indexacion de `https://winerim.wine/it/calcolatrice-margini-vino` si sigue sin indexar.
- Revisar en 48-72 horas el estado de las 12 URLs revisadas en Search Console.
- Confirmar si Search Console actualiza el conteo de `/sitemap.xml` a `2264` URLs descubiertas o equivalente.
- Vigilar especialmente `/pt/distribuidor` por la senal de canonical alternativa.
- Mantener fuera de esta linea el cambio ajeno en `src/components/WineListAnalyzerTool.tsx`.

## Actualizacion 2026-07-01: revision de distribuidores y margenes lista para publicar

## Hechos

- Se retomaron los documentos fuente de verdad (`PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md`, `NEXT_STEPS.md`) antes de continuar.
- Se reviso y actualizo `src/pages/Distribuidor.tsx` en `es/en/it/fr/de/pt`.
- La pagina de distribuidores deja de apoyarse en claims no documentados como `15M+ restaurantes`, `90%` o `producto que se vende solo`; ahora posiciona Winerim como programa B2B para partners HORECA.
- Distribuidores incorpora breadcrumbs, modelo de partner, requisitos esenciales/deseables, escenarios economicos, proceso de onboarding, mercados activos, FAQ visible con schema e internal links localizados.
- Se corrigio `ROUTE_MAP` para `/distribuidor` en `src/i18n/types.ts`:
  - EN `/en/distributor`;
  - IT `/it/distributore`;
  - FR `/fr/distributeur`;
  - DE `/de/haendler`;
  - PT `/pt/distribuidor`.
- Se reviso y actualizo `src/pages/CalculadoraMargen.tsx`.
- La calculadora de margen ahora usa canonical localizado, `hreflang` localizado, FAQ visible/schema localizado e internal links localizados hacia pricing, Winerim Core, Winerim Supply y demo.
- Se elimino la inyeccion manual de FAQ JSON-LD solo en espanol dentro de la calculadora de margen y se sustituyo por `FAQSection`.
- Se corrigio un bug local de la calculadora: faltaba `useEffect` en el import de React y la pagina caia en navegador aunque el build pasaba.
- Se corrigio `src/components/seo/InternalLinks.tsx` para evitar overflow movil: grid base `grid-cols-1`, wrappers `min-w-0` y links `w-full min-w-0`.
- Se sincronizaron rutas y contenido en:
  - `supabase/functions/sitemap/index.ts`;
  - `supabase/functions/prerender/index.ts`;
  - `cloudflare-worker-v3-hybrid.js`;
  - `public/sitemap-extra.json`;
  - `public/llms.txt`;
  - `public/llms-full.txt`.
- Se completo en `prerender` la lista manual de alternates de `/calculadora-margen-vino`, que ya tenia EN/IT/FR pero no DE/PT.
- Se creo el commit `b981921 feat: refine distributor and margin SEO pages` y se pusheo a `origin/main`.
- El deploy CLI de Supabase SEO fallo por falta de `SUPABASE_ACCESS_TOKEN`, igual que en sesiones anteriores.
- Se desplego Cloudflare Worker `winerim-proxy` version `31f4e71d-d184-40e0-89a6-0dae9722195f` y despues una correccion de emergencia version `31bbbf98-93f6-4659-81fb-5ece89be0214`.
- La correccion de emergencia del Worker anade prerender estatico para las seis rutas de distribuidores y las inyecta en sitemap si origen aun no las trae.
- Produccion con cache-buster valida como Googlebot `worker-static-prerender` correcto para:
  - `https://winerim.wine/distribuidor?codex_worker_check=202607010908`;
  - `https://winerim.wine/en/distributor?codex_worker_check=202607010908`.
- Sin cache-buster, Cloudflare aun devolvia HTML antiguo cacheado de bot-prerender para `/distribuidor`, con canonical de home; queda pendiente purgar cache de las seis rutas de distribuidores.
- Validaciones locales OK:
  - `npm run build`;
  - `node --check cloudflare-worker-v3-hybrid.js`;
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`;
  - `jq empty public/sitemap-extra.json`;
  - `git diff --check`.
- QA navegador local desktop OK en 12 rutas:
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
- La QA desktop confirmo H1, canonical, 7 `hreflang`, `x-default`, FAQ schema, JSON-LD valido, contenido real, sin fallback y sin overflow en las 12 rutas.
- QA movil local OK en muestras ES/EN/PT de distribuidores y margen: sin fallback, H1 visible, FAQ schema y sin overflow horizontal.
- Se reviso `https://supabase.com/changelog.md`; no se encontro un breaking change reciente aplicable a estas Edge Functions estaticas.
- Sigue existiendo un cambio local previo y ajeno en `src/components/WineListAnalyzerTool.tsx`; no se toco.

## Decisiones

- Posicionar `Distribuidores` como programa de partner HORECA prudente y comercial, no como promesa de exclusividad o rentabilidad absoluta sin acuerdo firmado.
- Usar claims conservadores y verificables en distribuidores: red HORECA, soporte central, materiales comerciales, onboarding y condiciones por territorio.
- Mantener `/de/haendler` como ruta canonica alemana de distribuidores porque es la ruta que ya existe en React.
- Usar `FAQSection` como fuente comun de FAQ visible + schema en la calculadora, en vez de scripts JSON-LD manuales por pagina.
- Tratar `InternalLinks` como componente comun sensible a mobile; arreglarlo una vez para que beneficie a todas las paginas que lo usan.

## Hipotesis

- La nueva pagina de distribuidores deberia convertir mejor porque explica partner, proceso, requisitos y soporte en lugar de apoyarse en claims genericos.
- La calculadora de margen deberia posicionar mejor en SEO/LLM porque ahora expone FAQ e internal links localizados y explica margen, Beverage Cost, multiplicador y siguiente accion con Winerim.
- Sincronizar React, sitemap, prerender, Worker y `llms` reduce riesgo de discrepancias tipo `404`, canonical equivocado o `hreflang` incompleto en Search Console.
- La correccion de `InternalLinks` reducira pequeños desbordamientos moviles en otras paginas que usan el mismo componente.

## Contradicciones / dudas abiertas

- Contradiccion corregida: `/distribuidor` existia en React para idiomas, pero faltaba en `ROUTE_MAP` y en parte de la superficie sitemap/prerender/Worker.
- Contradiccion corregida: la calculadora de margen existia en DE/PT, pero la lista manual de alternates de `prerender` no incluia DE/PT.
- Limitacion detectada: `npm run build` no detecto el import ausente de `useEffect`; la rotura solo aparecio en QA de navegador.
- Pendiente de produccion: el Worker ya esta desplegado, pero faltan publish frontend en Lovable, deploy de Edge Functions `sitemap`/`prerender` y purge de cache Cloudflare para las rutas de distribuidores sin query.

## Tareas pendientes

- Publicar frontend desde Lovable.
- Desplegar Edge Functions `sitemap` y `prerender` desde Lovable/Supabase.
- Purgar cache Cloudflare para:
  - `https://winerim.wine/distribuidor`;
  - `https://winerim.wine/en/distributor`;
  - `https://winerim.wine/it/distributore`;
  - `https://winerim.wine/fr/distributeur`;
  - `https://winerim.wine/de/haendler`;
  - `https://winerim.wine/pt/distribuidor`.
- Revalidar produccion humana y Googlebot para las 12 rutas revisadas.
- Reenviar `/sitemap.xml` en Search Console tras el deploy y revisar indexacion de las nuevas URLs de distribuidores.
- Mantener fuera de esta linea el cambio ajeno en `src/components/WineListAnalyzerTool.tsx`.

## Actualizacion 2026-07-01: produccion e indexacion de primera oleada `Aprender vino`

## Hechos

- El usuario confirmo que el publish estaba hecho y pidio continuar.
- Se desplego Cloudflare Worker `winerim-proxy` version `77662a6b-a0b0-4e2f-bfbf-b4c7cb3ad06b`.
- Revalidacion productiva como Googlebot:
  - los 6 hubs de `Aprender vino` responden `200`;
  - los 6 hubs devuelven `x-worker-branch: worker-static-prerender`;
  - los 6 hubs devuelven `x-prerendered: true`;
  - los 6 hubs exponen 3/3 enlaces a los articulos de su idioma.
- Revalidacion productiva de articulos:
  - 18/18 URLs responden `200`;
  - 18/18 devuelven `x-prerendered: true`;
  - 18/18 tienen canonical propio correcto;
  - 0/18 muestran fallback o `Not found`.
- `/sitemap.xml` responde `200` y contiene las 18 URLs de articulos de la primera oleada.
- En Search Console:
  - `/sitemap.xml` se reenvio correctamente;
  - `https://winerim.wine/aprender-vino` ya aparece indexada;
  - se solicito reindexacion de `https://winerim.wine/aprender-vino` y Google la anadio a cola prioritaria;
  - los 3 articulos ES aparecen como `Descubierta: actualmente sin indexar` y presentes en sitemap;
  - la prueba de URL publicada confirmo que los 3 articulos ES se pueden indexar;
  - Google acepto la solicitud de indexacion de los 3 articulos ES:
    - `https://winerim.wine/article/como-catar-vino-en-cinco-pasos`;
    - `https://winerim.wine/article/vocabulario-de-cata-de-vino`;
    - `https://winerim.wine/article/maridajes-basicos-para-restaurantes`.
- Search Console muestra a 2026-07-01 un contexto global de `1.568` paginas indexadas y `2.734` paginas no indexadas para la propiedad URL-prefix `https://winerim.wine/`.
- Sigue existiendo un cambio local previo y ajeno en `src/components/WineListAnalyzerTool.tsx`; no se toco.

## Decisiones

- Dar la primera oleada de `Aprender vino` como publicada y validada tecnicamente en produccion.
- Priorizar solicitud manual de indexacion para el hub ES y los tres articulos ES; las variantes internacionales quedan monitorizadas via sitemap antes de pedirlas todas manualmente.
- Mantener `Aprender vino` separado de `Biblioteca del vino`: ruta guiada y articulos por un lado, capa de entidades por otro.

## Hipotesis

- La reindexacion del hub deberia ayudar a que Google refresque el enlazado hacia los nuevos spokes.
- Las solicitudes manuales de los tres articulos ES deberian acelerar el primer rastreo, pero no garantizan indexacion inmediata ni ranking.
- Si las URLs ES pasan de `Descubierta` a `Rastreada` o indexada, convendra solicitar despues una seleccion de variantes EN/PT/FR/IT/DE.

## Contradicciones / dudas abiertas

- La primera comprobacion productiva uso tres slugs esperados incorrectos; al contrastar con la migracion se confirmo que React, Worker y la base usan los slugs reales:
  - `vocabulario-de-cata-de-vino`;
  - `basic-food-and-wine-pairing-for-restaurants`;
  - `vocabulario-de-prova-de-vinho`.
- La senal de Search Console `Descubierta: actualmente sin indexar` no es un error tecnico de la web: las URLs estan en sitemap, son accesibles y la prueba viva permite indexarlas.

## Tareas pendientes

- Revisar Search Console en 48-72 horas para los tres articulos ES solicitados.
- Si avanzan bien, solicitar indexacion selectiva de variantes internacionales prioritarias.
- Cerrado en la actualizacion superior: revision local de distribuidores y margenes lista para publicar.
- Preparar segunda oleada de `Aprender vino`: tipos de vino, uvas para empezar y regiones para empezar.

## Actualizacion 2026-07-01: primera oleada de articulos `Aprender vino`

## Hechos

- El usuario confirmo que el deploy anterior ya estaba publicado y pidio continuar con `Aprender vino`.
- Se creo la migracion `supabase/migrations/20260701064536_add_learn_wine_first_spokes.sql`.
- La migracion prepara 18 articulos publicados en `public.articles`: 3 temas x 6 idiomas.
- Temas incluidos:
  - catar vino en cinco pasos;
  - vocabulario de cata de vino;
  - maridajes basicos para restaurantes.
- Cada articulo incluye `article_group`, `lang`, `related_links`, categoria `Aprender vino`, imagen, cuerpo markdown, FAQ y enlaces a hub, biblioteca y conversion.
- Los slugs internacionales siguen el patron de la app: ruta limpia `/{lang}/article/{slug}` y fila DB con sufijo `_{lang}`.
- `src/pages/AprenderVino.tsx` ahora muestra una seccion de primeros spokes con 3 tarjetas localizadas y CTA de lectura.
- El schema del hub incorpora un `ItemList` con los articulos de la oleada.
- Se sincronizaron enlaces en:
  - `supabase/functions/prerender/index.ts`;
  - `cloudflare-worker-v3-hybrid.js`;
  - `public/llms.txt`;
  - `public/llms-full.txt`;
  - `src/test/wine-library-seo-surface.test.ts`.
- Validaciones completadas:
  - `npm run test -- --run src/test/wine-library-seo-surface.test.ts` OK;
  - `npm run build` OK;
  - `node --check cloudflare-worker-v3-hybrid.js` OK;
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts` OK;
  - `git diff --check` OK.
- QA Playwright local:
  - `/aprender-vino`, `/en/learn-wine` y `/pt/aprender-vinho` muestran 3 enlaces de articulo;
  - no hay overflow en desktop/mobile;
  - CTA de cards corregido a `Leer guia`/equivalentes.
- El servidor local de Vite quedo levantado temporalmente en `http://127.0.0.1:5173/` durante QA.
- Sigue existiendo un cambio local previo y ajeno en `src/components/WineListAnalyzerTool.tsx`; no se toco.

## Decisiones

- Publicar la primera oleada de `Aprender vino` como articulos localizados, no como nuevas fichas de Biblioteca del vino.
- Mantener `Aprender vino` como capa guiada y Biblioteca del vino como capa de referencia/entidades.
- Priorizar primero 3 temas x 6 idiomas antes de avanzar con el resto del plan editorial.
- Exponer enlaces a los spokes tambien en prerender, Worker y `llms` para SEO/LLM, no solo en React.

## Hipotesis

- La oleada deberia mejorar el rastreo e indexabilidad del hub porque convierte `Aprender vino` en una arquitectura hub-and-spoke real.
- Los tres temas iniciales son buenos puntos de entrada para equipos de sala porque conectan aprendizaje con recomendacion, maridaje y venta.

## Contradicciones / dudas abiertas

- `supabase migration list --local` no pudo validar contra base local porque Postgres local no esta arrancado en `127.0.0.1:54322`.
- Los articulos no estaran visibles en produccion hasta que Lovable/Supabase aplique la migracion en la base real.
- Durante QA local aparecio un error conocido de Instagram feed/404 en consola desktop; no bloquea el hub ni los enlaces nuevos.

## Tareas pendientes

- Cerrado en la actualizacion superior: revision local de distribuidores y margenes lista para publicar.
- Aplicar la migracion en Supabase desde Lovable o flujo operativo disponible.
- Publicar frontend desde Lovable y desplegar `sitemap`/`prerender` actualizados.
- Revalidar produccion humana y Googlebot para hub y articulos.
- Reenviar sitemap y solicitar indexacion selectiva de las URLs ES.
- Preparar segunda oleada: tipos de vino, uvas para empezar y regiones para empezar.

## Actualizacion 2026-06-30: implementacion inicial `Como lo hace Winerim` y briefs La RVF

## Hechos

- Se implemento `src/components/landing/ConnectedCellarSection.tsx`.
- La seccion se inserta en `src/components/landing/HomeBelowFold.tsx` justo despues de `HowItWorksSection`.
- La seccion esta localizada en seis idiomas (`es`, `en`, `it`, `fr`, `de`, `pt`).
- Mensaje central: compras/albaranes, TPV, stock, carta, margen y decisiones conectadas en un sistema operativo de bodega.
- El copy evita claims absolutos sobre automatizacion:
  - `cuando conectas tu TPV`;
  - `con la integracion TPV activa`;
  - nota de dependencia de integraciones activas y flujo operativo.
- Se amplio `src/seo/APRENDER_VINO_SPOKES_PLAN_2026-06-30.md` con briefs ejecutables para:
  - catar vino en 5 pasos;
  - vocabulario de cata;
  - maridajes basicos para restaurantes.
- Validaciones:
  - `npm run build` OK;
  - QA local desktop/mobile en `http://127.0.0.1:5173/` OK;
  - la seccion aparece visible, sin overflow y sin errores de consola en la prueba local.
- El banner de cookies y el sticky CTA pueden cubrir parte baja de la captura local, pero no impiden que la seccion cargue ni producen overflow.
- Sigue existiendo un cambio local previo y ajeno en `src/components/WineListAnalyzerTool.tsx`; no se toco.

## Decisiones

- Primera ubicacion de `Como lo hace Winerim`: home.
- Segunda fase: adaptar el bloque a producto (`Winerim Core`/`Winerim Supply`) y preparar version reducida para funnels.
- Para la linea La RVF/Aprender vino, avanzar primero con 3 temas x 6 idiomas antes de publicar toda la lista.

## Hipotesis

- El bloque comercial deberia ayudar a vender mejor porque explica el flujo completo del producto, no solo una lista de funcionalidades.
- Los tres briefs iniciales de `Aprender vino` son la forma mas segura de convertir la referencia editorial francesa en contenido propio, util y no copiado.

## Contradicciones / dudas abiertas

- Aun hay que confirmar el alcance tecnico exacto de integraciones TPV, albaranes y facturas antes de usar claims mas fuertes en producto o campanas.
- La seccion esta validada localmente, pero no publicada en produccion hasta que Lovable haga publish desde `main`.

## Tareas pendientes

- Publicar frontend en Lovable y revalidar home en produccion.
- Adaptar el bloque `Como lo hace Winerim` a pagina de producto y funnels.
- Crear los articulos de la primera oleada de `Aprender vino` y publicarlos con `related_links`.
- Actualizar el hub `Aprender vino` con enlaces a los spokes cuando existan.

## Actualizacion 2026-06-30: propuesta comercial `Como lo hace Winerim`

## Hechos

- El usuario aporto copys agrupados por angulos:
  - stock y TPV;
  - margenes;
  - albaranes, facturas y compras;
  - carta digital y gestion;
  - propietario/direccion;
  - sumiller/responsable de vino;
  - headlines y descripciones cortas para Meta.
- El objetivo planteado es evaluar si se puede crear una seccion web que ayude a vender Winerim, en la linea de `sabias que...` y `como lo hace Winerim`.
- Los copys mas diferenciales son los que conectan operativa real: albaranes/facturas, TPV, stock, carta, ventas, rotacion y margen.

## Decisiones

- Tratar esta linea como una seccion de conversion para web, no solo como copy de anuncios.
- No usar claims absolutos sin matiz si dependen de integraciones concretas; preferir formulaciones como `cuando conectas tu TPV` o `con la integracion activa`.

## Hipotesis

- La seccion puede vender mejor si no se limita a listar funciones y muestra el flujo completo: compras entran, ventas salen, stock cambia, carta se actualiza y margen se entiende.
- El angulo `subes albaranes y olvidate de perseguir Excel` puede ser muy potente si se expresa con precision operativa.

## Contradicciones / dudas abiertas

- Hay que confirmar el alcance real de integraciones TPV, albaranes y facturas antes de prometer actualizacion `al momento` en todos los casos.

## Tareas pendientes

- Crear propuesta de seccion web con:
  - headline principal;
  - bloque `Antes / Con Winerim`;
  - 4-5 tarjetas de flujo operativo;
  - CTA hacia demo o analisis de carta.
- Decidir si se implementa primero en home, pagina de producto o landing/funnel.

## Actualizacion 2026-06-30: re-test productivo de `go.winerim.wine`

## Hechos

- Se repitio la prueba del formulario de `https://go.winerim.wine/` sin probar chat.
- Primer intento de la repeticion:
  - run id `20260630153825`;
  - email `codex-qa-go-retest-20260630153825@winerim.com`;
  - no hubo llamadas de red ni redireccion porque el campo obligatorio `phone_prefix` quedo vacio;
  - no debe buscarse ese email como lead creado.
- Segundo intento, corregido con `phone_prefix=ES`:
  - run id `20260630154016`;
  - restaurante `CODEx QA Go Retest 20260630154016`;
  - email `codex-qa-go-retest-20260630154016@winerim.com`;
  - URL con `utm_source=codex_qa`, `utm_medium=paid_social_retest`, `utm_campaign=qa_20260630154016`, `utm_content=form_retest`, `utm_term=demo`, `fbclid=codex_qa_retest_20260630154016`.
- Estado de la landing en la prueba exitosa:
  - titulo `Solicita una demo gratuita de Winerim | Winerim`;
  - H1 `Solicita una demo gratuita de Winerim`;
  - `robots` `noindex, follow`;
  - UTMs ocultos correctamente poblados;
  - `window.__WINERIM_CHAT_DISABLED__ === true`;
  - `chatNodes: 0`;
  - formulario valido antes de enviar.
- Resultado tecnico de la prueba exitosa:
  - redireccion a `https://go.winerim.wine/gracias?tipo=demo&origen=meta`;
  - `contact_leads` respondio `201`;
  - `send-lead-notification` respondio `200` con `{"ok":true,"connect_forwarded":true,"connect_error":null}`;
  - `submit-gastrofunnel` respondio `200` con upstream `success:true` y `lead_id` `f388a0b4-bf19-4724-a1ed-f93211d05f13`.
- Siguen apareciendo `404` genericos de consola, pero no bloquearon formulario, notificacion ni CRM.
- Sigue existiendo un cambio local previo y ajeno en `src/components/WineListAnalyzerTool.tsx`; no se toco.

## Decisiones

- Mantener el chat fuera de alcance en esta validacion.
- En futuras pruebas automatizadas de esta landing, rellenar siempre `phone_prefix` porque es obligatorio aunque el label visual principal sea telefono.

## Hipotesis

- El lead de la prueba exitosa deberia aparecer en Winerim Connect/CRM con la atribucion `qa_20260630154016`.
- Los `404` genericos siguen pareciendo recursos secundarios o analitica, no errores del flujo de lead.

## Contradicciones / dudas abiertas

- La confirmacion visual dentro de CRM sigue pendiente; la prueba actual valida respuestas tecnicas de Supabase, Edge Functions y upstream.

## Tareas pendientes

- Buscar en Winerim Connect/CRM el lead `codex-qa-go-retest-20260630154016@winerim.com`.
- Confirmar que el CRM conserva UTMs y `fbclid` de la prueba:
  - `utm_campaign=qa_20260630154016`;
  - `fbclid=codex_qa_retest_20260630154016`.
- No buscar `codex-qa-go-retest-20260630153825@winerim.com` como lead valido porque ese intento no se envio.

## Actualizacion 2026-06-30: QA productiva de formularios sin chat

## Hechos

- El usuario decidio dejar el chat fuera de esta tanda de pruebas.
- Se probaron en produccion varios formularios de Winerim con run id `20260630125959`.
- `/demo` con `codex-qa-demo-20260630125959@winerim.com`:
  - redirigio a `/gracias?tipo=demo`;
  - `contact_leads` respondio `201`;
  - `send-lead-notification` respondio `200`;
  - la Edge Function devolvio `connect_forwarded:true`.
- `/contacto` con `codex-qa-contacto-20260630125959@winerim.com`:
  - redirigio a `/gracias?tipo=contacto`;
  - `contact_leads` respondio `201`;
  - `send-lead-notification` respondio `200`;
  - la Edge Function devolvio `connect_forwarded:true`.
- Popup de herramientas en `/recursos` con `codex-qa-popup-20260630125959@winerim.com`:
  - el popup se envio y cerro correctamente;
  - `contact_leads` respondio `201`;
  - `send-lead-notification` respondio `200`;
  - la Edge Function devolvio `connect_forwarded:true`.
- Landing `https://go.winerim.wine/` con `codex-qa-go-20260630125959@winerim.com`:
  - redirigio a `/gracias?tipo=demo&origen=meta`;
  - `contact_leads` respondio `201`;
  - `send-lead-notification` respondio `200`;
  - la Edge Function devolvio `connect_forwarded:true`;
  - `submit-gastrofunnel` respondio `200` con upstream `success:true` y `lead_id` `fe69414e-f343-4e99-ae9f-f92b7c90db22`.
- En `go.winerim.wine`, el chat estaba desactivado como estaba previsto: `window.__WINERIM_CHAT_DISABLED__ === true` y no habia nodos de chat en el DOM.
- En las pruebas aparecieron abortos de analitica y `404` genericos de consola; no bloquearon Supabase, notificaciones ni CRM.
- Sigue existiendo un cambio local previo y ajeno en `src/components/WineListAnalyzerTool.tsx`; no se toco.

## Decisiones

- No probar ni modificar chat en esta sesion salvo nueva instruccion explicita.
- Dar por validado tecnicamente el envio a CRM para los formularios probados cuando `send-lead-notification` devuelve `connect_forwarded:true`.
- Mantener `submit-gastrofunnel` como canal adicional validado en `go.winerim.wine`, ya que devolvio upstream `success:true`.

## Hipotesis

- Los `404` genericos de consola probablemente pertenecen a recursos secundarios o analitica y no afectan a captacion.
- La confirmacion visual en Winerim Connect/CRM deberia mostrar los leads con los emails de prueba anteriores si los webhooks se procesaron correctamente.

## Contradicciones / dudas abiertas

- No hay contradiccion viva sobre chat: queda fuera por decision del usuario.
- La confirmacion visual dentro de Winerim Connect/CRM sigue pendiente porque la QA local solo verifica respuestas tecnicas de Supabase/Edge Functions/upstream.

## Tareas pendientes

- Verificar en Winerim Connect/CRM los cuatro leads QA:
  - `codex-qa-demo-20260630125959@winerim.com`;
  - `codex-qa-contacto-20260630125959@winerim.com`;
  - `codex-qa-popup-20260630125959@winerim.com`;
  - `codex-qa-go-20260630125959@winerim.com`.
- Revisar los `404` genericos de consola solo si se quiere limpiar deuda menor de frontend/analitica.

## Actualizacion 2026-06-30: landing Meta Demo reforzada con CRM, logo y testimonios reales

## Hechos

- Produccion ya sirve la landing reforzada en `https://go.winerim.wine/`:
  - logo real de Winerim visible;
  - `+2.000 restaurantes`;
  - testimonios reales de Simone Monese, Lorena Cuevas y Xavi Nolla;
  - sin placeholders ni `+1.000`;
  - OpenGraph `https://winerim.wine/og-image.png`;
  - `robots` meta `noindex, follow`;
  - UTMs ocultos rellenados correctamente.
- Se envio un formulario test en produccion con estos datos:
  - restaurante: `CODEx Test Produccion Landing Meta`;
  - email: `codex-prod-test+winerim-meta@winerim.com`;
  - UTM campaign: `codex_prod_test`.
- Resultado tecnico del test productivo:
  - `contact_leads` respondio `201`;
  - `send-lead-notification` respondio `200`;
  - la landing redirigio a `https://go.winerim.wine/gracias?tipo=demo&origen=meta`.
- Durante el mismo test aparecio una llamada adicional a `submit-gastrofunnel` con `HTTP 500`.
- Tras integrar el commit remoto de Lovable `644db09`, `submit-gastrofunnel` si aparece versionado en `supabase/functions/submit-gastrofunnel/index.ts` y la landing incluye su llamada en `MetaDemoLanding`.
- Una llamada diagnostica directa a `submit-gastrofunnel` con `codex-diagnostic+winerim-gastrofunnel@winerim.com` respondio `200` y upstream `success:true`.
- Una segunda prueba completa de formulario productivo con `codex-prod-retest+winerim-meta@winerim.com` respondio:
  - `contact_leads` `201`;
  - `send-lead-notification` `200`;
  - `submit-gastrofunnel` `200`;
  - redireccion a `/gracias?tipo=demo&origen=meta`.
- Validaciones tras integrar el commit remoto de Lovable:
  - `npm run build` OK;
  - `npx --yes deno-bin check supabase/functions/send-lead-notification/index.ts supabase/functions/submit-gastrofunnel/index.ts` OK;
  - `git diff --check` OK.
- El usuario confirmo que el claim correcto para campanas es `+2.000 restaurantes`; se sustituyo el stat anterior `+1.000 bodegas gestionadas` en `src/pages/MetaDemoLanding.tsx`.
- La landing Meta Demo ahora muestra el logo real de Winerim desde `src/assets/winerim-logo.webp` en la cabecera.
- El OpenGraph de la landing se fijo explicitamente a `https://winerim.wine/og-image.png`; el asset existe en `public/og-image.png` e incluye marca Winerim.
- Los tres casos plantilla se reemplazaron por testimonios reales de la web, alineados con cada titulo:
  - Rotacion de bodega: Simone Monese, Sommelier de La Vecchia Griglia.
  - Ticket medio y margen: Lorena Cuevas, Sommelier de El Paladar By Zurine Garcia.
  - Tiempo recuperado: Xavi Nolla, Sommelier y Fundador de enoAula.
- El formulario de la landing sigue conectado al backend mediante `onSubmit`, no mediante un `action` HTML estatico: inserta en `contact_leads` y despues invoca `send-lead-notification`.
- Se reforzo `src/lib/notifyLead.ts` para devolver `true/false` segun la respuesta de la Edge Function.
- En `MetaDemoLanding`, la invocacion de `notifyLead` ahora se espera con `await` antes de disparar conversiones y navegar a gracias.
- Se actualizo `supabase/functions/send-lead-notification/index.ts` para reenviar a Winerim Connect/CRM los campos de atribucion Meta (`landing_url`, `referrer`, `fbclid` y UTMs).
- Para leads de `meta_demo_landing` o `meta_campaign`, la Edge Function considera obligatorio el reenvio a Winerim Connect: si falta `WINERIM_CONNECT_WEBHOOK_URL` o el webhook falla, devuelve error.
- Validaciones completadas:
  - `npm run build` OK;
  - `npx --yes deno-bin check supabase/functions/send-lead-notification/index.ts` OK;
  - `git diff --check` OK;
  - prueba Playwright/Chrome local en `http://127.0.0.1:5174/meta-demo?...` OK.
- Resultado de la prueba local de formulario:
  - lead test: `codex-test+winerim-meta-crm@winerim.com`;
  - `contact_leads` respondio `201`;
  - `send-lead-notification` respondio `200`;
  - la pagina navego a `/gracias?tipo=demo&origen=meta`;
  - los hidden UTMs quedaron rellenos;
  - no quedaban placeholders ni `+1.000` en la landing local.
- El despliegue CLI directo de `send-lead-notification` fallo por falta de `SUPABASE_ACCESS_TOKEN`, igual que en despliegues Supabase anteriores.
- Sigue existiendo un cambio local previo y ajeno en `src/components/WineListAnalyzerTool.tsx`; no se toco ni debe mezclarse con esta landing.

## Decisiones

- Usar `+2.000 restaurantes` como cifra publica en esta landing de campanas.
- No anadir un `action` HTML estatico al `<form>` porque la app no es un formulario HTML plano: el flujo correcto es React `onSubmit` -> Supabase `contact_leads` -> Edge Function -> email/CRM.
- Usar solamente testimonios reales ya existentes en la web para los casos de exito; no dejar placeholders en una landing de pago.
- Hacer obligatorio el reenvio al CRM para la landing Meta desde la Edge Function, manteniendo la fila en Supabase como respaldo operativo.

## Hipotesis

- Esperar a `send-lead-notification` antes de navegar a gracias reducira perdidas silenciosas de notificacion/CRM en trafico de Meta.
- Pasar UTMs y `fbclid` al CRM permitira medir mejor campana, anuncio y termino sin migracion de columnas inmediata.

## Contradicciones / dudas abiertas

- No queda abierta la contradiccion `+1.000 bodegas` vs `+2.000 restaurantes`: queda resuelta a favor de `+2.000 restaurantes`.
- No se ha confirmado visualmente en Winerim Connect/CRM que los leads test hayan entrado con UTMs y `fbclid`, aunque `submit-gastrofunnel` ya devuelve upstream `success:true`.
- La incidencia inicial de `submit-gastrofunnel` `500` queda superada por revalidacion posterior `200`; conviene monitorizarla en las primeras campanas reales.

## Tareas pendientes

- Confirmar en Winerim Connect/CRM la entrada de los leads test con UTMs y `fbclid`.
- Monitorizar durante las primeras campanas que `submit-gastrofunnel` siga devolviendo `200`.

## Actualizacion 2026-06-30: landing Meta Demo para campañas

## Hechos

- Se transcribio el audio `WhatsApp Audio 2026-06-30 at 10.51.47.opus`; confirma que el material a entregar para la landing/campanas incluye cuenta publicitaria, identificador de conjunto de datos/pixel, codigo Pixel, UTMs, captura de campos ocultos y HTML de la landing.
- Se preparo una landing aislada para campañas de Meta en `src/pages/MetaDemoLanding.tsx`.
- La ruta de preview/publicacion en el dominio principal queda como `/meta-demo`.
- El subdominio recomendado para el funnel es `go.winerim.wine`.
- Comprobacion DNS puntual: `demo.winerim.wine` ya resuelve a Cloudflare; `go.winerim.wine` no devolvio A/CNAME en la comprobacion local, por lo que parece libre.
- `src/App.tsx` ahora registra `/meta-demo` y muestra la landing en la raiz cuando el host sea `go.winerim.wine`.
- La landing incluye el copy recibido: demo gratuita, 15 minutos, sin compromiso, formulario de contexto, stat cards y testimonio real de Travieso Bar.
- No se publicaron testimonios ficticios: los tres casos sin datos reales quedan marcados como pendientes/verificados antes de escalar campanas.
- El formulario guarda leads en `contact_leads` con `form_type="demo"` y captura `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `fbclid`, URL y referrer dentro de `message` como JSON.
- Se mantienen los eventos existentes de lead/demo (`trackFormStart`, `trackFormSubmit`, `ads.conversion`) y se anaden eventos `dataLayer` especificos de la landing.
- Se incorporo el Pixel ID de Meta `450273446324682` de forma consent-aware: solo se inicializa/dispara si el usuario ha aceptado consentimiento.
- `index.html` se actualizo para no cargar el chat externo en `/meta-demo` ni en el host `go.winerim.wine`; la propia landing tambien elimina el widget si llegara a inyectarse.
- `cloudflare-worker-v3-hybrid.js` trata `/meta-demo` como ruta servida pero `noindex`.
- Validaciones completadas:
  - `npm run build`;
  - `npm run deploy:worker:dry-run`;
  - QA local desktop en `http://127.0.0.1:5173/meta-demo` sin overflow y sin chat externo;
  - QA local mobile `390x844` sin overflow y con formulario apilado correctamente.
- El servidor local de Vite quedo levantado en `http://127.0.0.1:5173/` para revision.
- Se creo y pusheo a `origin/main` el commit `43e1cae feat: add meta demo campaign landing`.
- Se desplego Cloudflare Worker `winerim-proxy` con version `635e8855-8d39-4473-b37c-f3566653dd70`.
- Produccion ya reconoce `https://winerim.wine/meta-demo` con `HTTP 200` y `x-robots-tag: noindex, follow`, pero sigue renderizando la home antigua hasta que Lovable publique el frontend del commit `43e1cae`.
- El 2026-06-30 se creo en Cloudflare el DNS `go.winerim.wine` como `A 185.158.133.1`, proxied, TTL Auto.
- Se anadio la ruta Worker `go.winerim.wine/*` a `winerim-proxy`, manteniendo `winerim.wine/*`.
- Se actualizo y desplego Cloudflare Worker `winerim-proxy` version `e850fe30-c8de-4fef-b7da-5bce3ea11667` para aplicar `X-Robots-Tag: noindex, follow` a todo el host `go.winerim.wine`.
- Validacion productiva de `go.winerim.wine`: DNS resuelve a Cloudflare, `HTTP 200`, `x-worker-branch: spa` y `x-robots-tag: noindex, follow`.
- `https://go.winerim.wine/` sigue renderizando la home antigua hasta que Lovable publique el frontend del commit `43e1cae` o posterior.
- Siguen existiendo cambios locales previos en `src/components/WineListAnalyzerTool.tsx`; no se tocaron en esta tarea.

## Decisiones

- El audio no introduce una decision nueva; refuerza la decision ya tomada de capturar UTMs ocultos y usar el Pixel Meta `450273446324682`.
- Usar `go.winerim.wine` como subdominio de campanas frente a `demo.winerim.wine`, porque `demo` ya resuelve y ademas es menos flexible para futuros funnels.
- Mantener la landing como superficie de conversion `noindex`, no como pagina SEO ni como parte de Biblioteca del vino.
- Reutilizar `contact_leads` y guardar la atribucion UTM en `message` para evitar una migracion de base de datos en esta fase.
- No mostrar testimonios inventados ni placeholders literales del tipo `[Añade aqui]`; mejor dejar espacios pendientes de prueba social real.
- Mantener el banner de cookies por cumplimiento; el Pixel Meta queda condicionado al consentimiento.

## Hipotesis

- `go.winerim.wine` funcionara bien como URL corta y reusable para Meta Ads, Google Ads y futuros funnels si Cloudflare enruta el host al mismo Worker/frontend.
- Guardar la atribucion en `message` es suficiente para la primera fase de campanas; si se necesita reporting avanzado, convendra crear columnas UTM dedicadas o una tabla de attribution.
- La landing deberia convertir mejor que `/demo` para trafico frio de Meta al eliminar navegacion, footer, FAQ, chat y CTAs secundarios.

## Contradicciones / dudas abiertas

- El contenido recibido usa `+1.000 bodegas gestionadas`, pero las creatividades mencionan `+2.000 restaurantes`; hay que confirmar si son metricas distintas o si una esta desactualizada.
- `demo.winerim.wine` no parece libre porque ya resuelve a Cloudflare; no conviene usarlo sin revisar que servicio tiene detras.

## Tareas pendientes

- Publicar el frontend desde Lovable para que `/meta-demo` y `go.winerim.wine/` muestren la landing real del commit `43e1cae`, no la home actual.
- No hace falta volver a configurar DNS ni ruta Worker para `go.winerim.wine`: ya estan creados.
- No hace falta volver a desplegar el Worker salvo nuevo cambio de codigo; la version activa para esta correccion es `e850fe30-c8de-4fef-b7da-5bce3ea11667`.
- Validar produccion:
  - `https://winerim.wine/meta-demo` responde `200` y `noindex`;
  - `https://go.winerim.wine/` responde `200` y muestra la landing;
  - no aparece chat externo ni popup global;
  - hidden UTMs se rellenan correctamente;
  - envio de formulario crea lead y notificacion.
- Confirmar el claim correcto entre `+1.000 bodegas` y `+2.000 restaurantes`.
- Sustituir los tres casos pendientes por testimonios reales antes de escalar presupuesto.

## Actualizacion 2026-06-29: auditoria de publicaciones blog y pendientes SEO/LLM

Nota 2026-06-30: esta fotografia queda superada para el hub de iniciacion. La pagina real se implemento en codigo como `Aprender vino`, separada de `Biblioteca del vino`; lo pendiente ahora es commit/push, despliegue completo y validacion productiva.

## Hechos

- Se reviso si las publicaciones del blog y las mejoras pendientes de biblioteca del vino estan realmente publicadas.
- La tabla publica `articles` de Supabase devuelve `440` articulos publicados:
  - `de`: 75;
  - `en`: 74;
  - `es`: 69;
  - `fr`: 74;
  - `it`: 75;
  - `pt`: 73.
- `/sitemap.xml` de produccion contiene `2.234` URLs totales y `440` URLs de articulos.
- El cluster de biblioteca del vino del 2026-06-01 esta publicado en seis idiomas:
  - `biblioteca-vino-restaurante-vender-mas`;
  - `uvas-regiones-equipo-sala-vender-vino`;
  - `maridajes-carta-vinos-rentable`.
- Las 18 variantes del cluster anterior aparecen como `published=true` en Supabase, estan en sitemap y una muestra valida como Googlebot con `200`, `x-worker-branch: bot-prerender`, canonical propio, titulo y H1 correctos.
- El hub inspirado por La RVF ya no debe describirse como `Como empezar con el vino` dentro de Biblioteca; desde el 2026-06-30 existe en codigo como `Aprender vino`, con rutas, sitemap extra, `llms` y prerender preparados.
- Las URLs previstas antiguas (`/biblioteca-vino/como-empezar`, `/en/wine-library/how-to-start`, `/fr/bibliotheque-vin/debuter`) quedan tratadas como aliases/redirects legacy hacia la nueva capa, no como canonicals.
- Siguen existiendo cambios locales previos no relacionados en `index.html` y `src/components/WineListAnalyzerTool.tsx`.

## Decisiones

- Considerar publicados los articulos existentes del cluster de biblioteca del vino; el problema no es publicacion del cluster anterior, sino falta de la nueva capa editorial de iniciacion.
- Tratar `Aprender vino` como la capa de iniciacion prioritaria para SEO convencional y LLMs.
- No dejar las URLs legacy del hub dependiendo de fallbacks/catch-all: deben redirigir a paginas reales con rutas, sitemap, prerender, canonical, hreflang y menciones en `llms`.

## Hipotesis

- El cluster publicado ayuda a autoridad tematica, pero no cubre por si solo la intencion de busqueda educativa de iniciacion detectada en la revision de La RVF.
- `Aprender vino` puede cerrar la brecha de arquitectura: Biblioteca mantiene el grafo enciclopedico y el hub nuevo ofrece una entrada didactica por niveles.
- Las URLs fallback pueden confundir validaciones superficiales porque responden `200`, aunque no representen contenido real ni intencion especifica; por eso se han preparado aliases/redirects.

## Tareas pendientes

- Hacer commit/push de `Aprender vino` y desplegar Cloudflare Worker.
- Publicar frontend desde Lovable o confirmar autodeploy desde `main`.
- Desplegar Supabase `sitemap` y `prerender` desde Lovable o con `SUPABASE_ACCESS_TOKEN`.
- Validar produccion humana/Googlebot para las seis rutas canonicas de `Aprender vino`.
- Crear la primera tanda de contenidos propios de iniciacion: catar vino, vocabulario de cata, tipos de vino, uvas para empezar, regiones para empezar, leer etiqueta, temperatura, copas, conservacion, defectos, maridajes basicos, recomendacion en sala y formacion de equipos.

## Actualizacion 2026-06-19: `/presentacion` deja de devolver 404

## Hechos

- El usuario reporto que `/presentacion` devolvia `Not Found`.
- Validacion inicial en produccion:
  - `https://winerim.wine/presentacion` respondia `HTTP 404`;
  - el cuerpo era `Not Found`;
  - cabecera `x-worker-branch: not-found`;
  - cabecera `x-robots-tag: noindex`.
- El codigo React ya tenia rutas para la presentacion:
  - `/presentacion`;
  - `/en/presentation`;
  - `/fr/presentation`;
  - `/it/presentazione`;
  - `/de/praesentation`;
  - `/pt/apresentacao`.
- `public/sitemap-extra.json` ya incluia las seis URLs de presentacion.
- La causa era Cloudflare Worker: las rutas de presentacion no estaban incluidas en `SEO_EXACT`, por lo que el Worker las cortaba antes de llegar al origen Lovable.
- Se actualizaron `cloudflare-worker-v3-hybrid.js` y el Worker productivo:
  - se anadieron las seis rutas a `SEO_EXACT`;
  - se anadio prerender estatico especifico para las seis variantes de presentacion;
  - se mantuvieron canonical, alternates `hreflang`, schema `WebPage` y enlaces internos basicos.
- Validaciones ejecutadas:
  - `node --check cloudflare-worker-v3-hybrid.js`;
  - `npm run deploy:worker:dry-run`;
  - `git diff --check`;
  - `npm run deploy:worker`.
- Cloudflare Worker `winerim-proxy` quedo desplegado con version `807319ba-4743-47ad-87e9-401e8d952efe`.
- Produccion validada:
  - humano: las seis rutas de presentacion responden `200`;
  - Googlebot: las seis rutas responden `200`, `x-prerendered: true`, `x-worker-branch: worker-static-prerender`;
  - Googlebot recibe titulos propios de presentacion por idioma.
- Estado de worktree tras la correccion: `index.html` y `src/components/WineListAnalyzerTool.tsx` siguen modificados de antes y no se tocaron en esta correccion.

## Decisiones

- Tratar `/presentacion` como ruta SEO publica porque ya esta en sitemap y tiene versiones localizadas.
- Resolver el bloqueo en Worker, no en Lovable, porque la cabecera `x-worker-branch: not-found` demostraba que la peticion no llegaba al origen.
- Anadir prerender estatico en Worker para evitar que Googlebot recibiera fallback de otra pagina mientras Supabase `prerender` no tenga una version especifica.

## Hipotesis

- La pagina fallaba por desalineacion operativa entre React/sitemap y Cloudflare Worker, no por un problema de Lovable ni del componente `Presentation`.
- Centralizar el prerender de presentacion en Supabase reduciria duplicacion futura, pero no era necesario para resolver el 404 productivo.

## Tareas pendientes

- Si se modifica la presentacion de forma significativa, sincronizar tambien el prerender estatico del Worker o migrarlo a Supabase `prerender`.
- Incluir las rutas de presentacion en cualquier checklist futura de validacion de rutas publicas nuevas.

## Actualizacion 2026-06-19: referencia La RVF para iniciacion al vino

Nota 2026-06-30: esta propuesta se materializo como `Aprender vino`, no como subruta canonica dentro de `Biblioteca del vino`.

## Hechos

- Se revisaron estas URLs de La Revue du Vin de France:
  - `https://www.larvf.com/,le-dico-du-vin,13178.htm`;
  - `https://www.larvf.com/s-initier-au-vin,13174.asp2`.
- La seccion `S'initier au vin` agrupa subtemas de iniciacion: aprender vino, diccionario, acuerdos mets-vins, regiones viticolas, terroirs, organizar una cava, economia, subastas y cultura alrededor del vino.
- El `Dictionnaire du vin` funciona como glosario evergreen con explicaciones atomicas de terminos, tecnicas, cepas, defectos, estilos y vinificacion.
- La seccion `Apprendre le vin` concentra temas muy validos para Winerim: vocabulario de cata, como catar, que es una cepa, fermentacion, temperatura de servicio, conservacion de botella abierta, defectos del vino, aromas, copas, lectura de etiqueta y nociones basicas de vinificacion.
- Las secciones de acuerdos, regiones y conservacion/cava tambien encajan con la biblioteca existente de Winerim.
- Las secciones de economia, subastas y actualidad son utiles como autoridad secundaria, pero no son el primer bloque para una experiencia de iniciacion.
- El repo ya tiene superficies relacionadas: biblioteca multilingue, glosario, cursos, maridajes, regiones, estilos, guias y rutas SEO/LLM.
- Estado de worktree al revisar: ya existian cambios modificados en `index.html` y `src/components/WineListAnalyzerTool.tsx` que no se tocaron en esta revision.

## Decisiones

- Usar La RVF solo como referencia de arquitectura editorial e intencion de busqueda, no como contenido a copiar.
- Crear una capa propia de Winerim: `Como empezar con el vino`, con variantes localizadas y enfoque practico para restaurantes, hoteles y equipos de sala.
- Conectar ese hub con biblioteca, glosario, maridajes, uvas, regiones, estilos, analisis de carta y conversion a demo.
- Priorizar articulos evergreen y guias accionables antes que noticias o piezas de subastas.

## Hipotesis

- Un hub guiado de iniciacion reducira la sensacion de biblioteca enciclopedica dispersa y ayudara a usuarios principiantes a avanzar por niveles.
- El enfoque B2B de sala puede hacer que Winerim compita mejor que un medio generalista: no solo explicar vino, sino ayudar a recomendarlo, venderlo y formar equipos.
- El hub puede reforzar SEO/LLM si cada articulo enlaza a entidades existentes y a herramientas como analisis de carta y maridajes.

## Tareas pendientes

- Implementar un hub localizado tipo:
  - ES `/biblioteca-vino/como-empezar`;
  - EN `/en/wine-library/how-to-start`;
  - FR `/fr/bibliotheque-vin/debuter`;
  - IT `/it/biblioteca-vino/iniziare`;
  - DE `/de/weinbibliothek/einsteigen`;
  - PT `/pt/biblioteca-vinho/como-comecar`.
- Preparar primera tanda editorial propia en seis idiomas: catar vino, vocabulario de cata, tipos de vino, uvas iniciales, regiones iniciales, leer etiqueta, temperatura, copas, conservacion, defectos, maridajes basicos, recomendacion en sala y formacion de equipos.
- Revisar sitemap, prerender, `llms.txt`, `llms-full.txt`, enlaces internos y schema al implementar.
- Mantener separadas las piezas para aficionados de las piezas para restaurantes/hoteles.

## Actualizacion 2026-06-13: Search Console y Dataset license del Barometro

## Hechos

- Se reviso Search Console para la propiedad URL-prefix `https://winerim.wine/`.
- Vista general de Search Console en el momento de revision:
  - `719` paginas indexadas;
  - `2.600` paginas no indexadas;
  - `899` clics totales en busqueda web;
  - Core Web Vitals muestra `153` URLs en `Necesita mejorar` en movil y `153` en ordenador.
- La URL `https://winerim.wine/barometro-cartas-vino-2026` ya no aparece como desconocida por Google.
- Estado de la URL principal ES:
  - `La URL no esta en Google`;
  - motivo: `Rastreada: actualmente sin indexar`;
  - ultimo rastreo: `11 jun 2026, 4:37:41`;
  - rastreador: Robot de Google para smartphones;
  - rastreo permitido: `Si`;
  - obtencion de pagina: `Correcto`;
  - indexacion permitida: `Si`;
  - sitemap detectado: `https://winerim.wine/sitemap.xml`;
  - canonica declarada: propia;
  - canonica seleccionada por Google: URL inspeccionada.
- Se volvio a solicitar indexacion manual para la URL principal ES y Search Console confirmo que fue anadida a una cola de rastreo prioritaria.
- Estado de variantes:
  - EN `https://winerim.wine/en/wine-list-barometer-2026`: indexada en Google.
  - PT `https://winerim.wine/pt/barometro-cartas-vinhos-2026`: indexada en Google.
  - IT `https://winerim.wine/it/barometro-carte-vini-2026`: `Rastreada: actualmente sin indexar`, ultimo rastreo `11 jun 2026, 8:14:48`.
  - FR `https://winerim.wine/fr/barometre-cartes-vins-2026`: `Rastreada: actualmente sin indexar`, ultimo rastreo `11 jun 2026, 12:24:16`.
  - DE `https://winerim.wine/de/weinkarten-barometer-2026`: `Rastreada: actualmente sin indexar`, ultimo rastreo `11 jun 2026, 9:22:45`.
- Se solicitaron manualmente indexaciones para IT, FR y DE; PT no se solicito porque ya aparecia indexada.
- Search Console mostro un aviso no critico en `Conjuntos de datos`: `Falta el campo "license" (opcional)`.
- Se implemento `license` localizado en el schema `Dataset` del Barometro:
  - React humano: `src/pages/BarometroCartasVino.tsx`;
  - Supabase `prerender`: `supabase/functions/prerender/index.ts`;
  - fallback generico de Worker: `cloudflare-worker-v3-hybrid.js`.
- Validaciones locales completadas:
  - `npm run build`;
  - `npm run test -- --run src/test/wine-library-seo-surface.test.ts` (`17` tests pasados);
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`;
  - `node --check cloudflare-worker-v3-hybrid.js`;
  - `npm run deploy:worker:dry-run`;
  - `git diff --check`.
- Se desplego Cloudflare Worker `winerim-proxy` version `5d2c0d9c-b596-4796-99fb-2ac5af00636e`.
- Se pusheo a `origin/main` el commit `3ddbbe2 fix: add dataset license to barometer schema`.
- Lovable desplego Supabase `prerender` desde `3ddbbe2` y valido ES/EN/PT con `200`, `bot-prerender`, `x-prerendered true`, canonical, `hreflang`, schema `Report`, schema `Dataset` y `license` localizado.
- Se publico frontend desde Lovable y el dialogo quedo `Up to date`.
- Produccion validada como Googlebot:
  - ES contiene `license: https://winerim.wine/terminos`;
  - EN contiene `license: https://winerim.wine/en/terms`;
  - IT contiene `license: https://winerim.wine/it/termini`;
  - FR contiene `license: https://winerim.wine/fr/conditions`;
  - DE contiene `license: https://winerim.wine/de/agb`;
  - PT contiene `license: https://winerim.wine/pt/termos`.

## Decisiones

- No volver a solicitar indexacion para EN/PT porque ya estan indexadas.
- Solicitar indexacion manual solo para ES/IT/FR/DE, que estan tecnicamente correctas pero aun no indexadas.
- Usar las paginas localizadas de terminos de Winerim como `license` del `Dataset` hasta que exista una licencia especifica de dataset o metodologia.

## Hipotesis

- ES/IT/FR/DE deberian avanzar de `Rastreada: actualmente sin indexar` a indexadas tras la nueva cola de rastreo, aunque Google no garantiza plazo ni inclusion.
- El aviso no critico de `Dataset` deberia desaparecer en Search Console tras el siguiente recrawl porque produccion ya expone `license`.
- La presencia de EN/PT ya indexadas indica que el Barometro esta entrando en el indice por hreflang/sitemap, no solo por solicitud manual.

## Tareas pendientes

- Revisar Search Console en 48-72 horas para ES/IT/FR/DE.
- Confirmar que el informe de `Conjuntos de datos` deja de mostrar `Falta el campo "license"` tras recrawl.
- Vigilar Core Web Vitals: hay `153` URLs en `Necesita mejorar` tanto en movil como en ordenador.
- Mantener como siguiente mejora editorial del Barometro la definicion de dataset real, muestra minima y reglas de anonimato.

## Actualizacion 2026-06-11: Lovable despliega Edge Functions y Worker queda limpio

## Hechos

- Se pidio a Lovable (`Web Winerim`) desplegar las Supabase Edge Functions `sitemap` y `prerender` desde el ultimo `main`.
- Lovable confirmo que ambas Edge Functions quedaron desplegadas.
- Validacion directa contra Supabase `sitemap`:
  - `status 200`;
  - contiene las seis rutas localizadas del Barometro;
  - mantiene alternates `xhtml:link`.
- Validacion directa contra Supabase `prerender` para `/barometro-cartas-vino-2026`:
  - `status 200`;
  - `resolvedPath` correcto;
  - contiene canonical propio;
  - contiene `hreflang`;
  - contiene schema `Report`;
  - contiene schema `Dataset`.
- Se retiro del Cloudflare Worker el prerender estatico temporal del Barometro para evitar duplicar la fuente SEO.
- Se mantuvieron en el Worker el reconocimiento de rutas del Barometro y el fallback de sitemap, que ahora no inyecta nada si Supabase ya trae las seis URLs.
- `node --check cloudflare-worker-v3-hybrid.js`, `npm run deploy:worker:dry-run` y `git diff --check` pasaron correctamente.
- Se desplego Cloudflare Worker `winerim-proxy` version `356db317-9985-41de-a1a1-ac6ed6baba6f`.
- Produccion valida:
  - usuario humano en `https://winerim.wine/barometro-cartas-vino-2026`: `200`;
  - Googlebot en la misma URL: `200`, `x-prerendered: true`, `x-worker-branch: bot-prerender`;
  - el HTML prerenderizado conserva canonical, `hreflang="x-default"`, schema `Report` y schema `Dataset`;
  - `/sitemap.xml` contiene las seis URLs localizadas del Barometro.

## Decisiones

- Dar por cerrada la dependencia temporal del prerender estatico del Worker para el Barometro.
- Tratar Supabase `sitemap` y `prerender` como fuente productiva de verdad para el Barometro.
- Mantener en Worker solo la proteccion de rutas y fallback de sitemap por seguridad operativa.

## Hipotesis

- Servir el Barometro a bots desde Supabase `prerender` reduce divergencias futuras frente al frontend y al sitemap.
- El estado actual deberia ser mas mantenible para nuevas paginas SEO/LLM que el puente estatico temporal en Worker.

## Tareas pendientes

- Monitorizar Search Console en 24-72 horas para ver si la URL principal del Barometro pasa a rastreada o indexada.
- Revisar si las cinco variantes internacionales aparecen descubiertas desde sitemap.
- Considerar retirar tambien el fallback de sitemap del Worker si durante varios dias Supabase se mantiene estable.
- Obtener `SUPABASE_ACCESS_TOKEN` o sesion Supabase CLI para futuros deploys directos sin depender de Lovable.

## Actualizacion 2026-06-11: Search Console acelera Barometro Winerim

## Hechos

- Se inspecciono en Search Console la URL `https://winerim.wine/barometro-cartas-vino-2026` dentro de la propiedad URL-prefix `https://winerim.wine/`.
- Search Console informo inicialmente: `La URL no esta en Google` y `Google no reconoce esta URL`.
- Se solicito indexacion manual desde la inspeccion de URL.
- Search Console confirmo: `Se ha solicitado la indexacion` y anadio la URL a una cola de rastreo prioritaria.
- Se reenvio `sitemap.xml` desde el informe de Sitemaps.
- Search Console confirmo: `Se ha enviado el sitemap correctamente`.
- `/sitemap.xml` paso a:
  - enviado: `11 jun 2026`;
  - ultima lectura: `11 jun 2026`;
  - estado: `Correcto`;
  - paginas descubiertas: `2.234`.
- El incremento de `2.228` a `2.234` paginas descubiertas coincide con las seis URLs localizadas del Barometro Winerim.

## Decisiones

- Dar por completada la accion inmediata de Search Console para la URL principal del Barometro.
- No solicitar indexacion manual de las cinco variantes internacionales todavia; primero conviene dejar que Google procese el sitemap actualizado.

## Hipotesis

- La URL principal deberia pasar de `Google no reconoce esta URL` a un estado rastreado en los proximos dias.
- Las cinco variantes localizadas deberian aparecer como descubiertas por sitemap tras el procesamiento del sitemap actualizado.

## Tareas pendientes

- Revisar Search Console en 24-72 horas para confirmar si la URL principal fue rastreada o indexada.
- Revisar si las variantes `en`, `it`, `fr`, `de` y `pt` aparecen descubiertas desde sitemap.
- Si alguna variante sigue sin aparecer tras varios dias, inspeccionarla manualmente y solicitar indexacion selectiva.

## Actualizacion 2026-06-11: Barometro Winerim publicado y validado en produccion

## Hechos

- Se pusheo a `origin/main` el commit `4020e5a feat: add Winerim wine list barometer`.
- Se publico el frontend desde Lovable (`Web Winerim`) con el dialogo `Publish` -> `Update`; Lovable quedo en estado `Up to date`.
- Tras el publish de Lovable, produccion seguia devolviendo `404` en `/barometro-cartas-vino-2026` con `x-worker-branch: not-found`.
- Se detecto que el Cloudflare Worker `winerim-proxy` tenia una lista propia de rutas conocidas y cortaba rutas nuevas antes de llegar al origen.
- Se actualizo `cloudflare-worker-v3-hybrid.js` para:
  - reconocer las seis rutas del Barometro como rutas indexables;
  - servir prerender estatico para bots con `Report`, `Dataset`, canonical y `hreflang`;
  - inyectar las seis URLs del Barometro en `/sitemap.xml` mientras Supabase Edge Functions no puedan desplegarse por CLI.
- Se desplego el Worker `winerim-proxy` y quedo activa la version `ec48088d-62b0-4d3e-85c0-8d9cc74760e1`.
- Se pusheo a `origin/main` el commit `aed4328 fix: serve barometer through worker`.
- Produccion valida:
  - `/barometro-cartas-vino-2026`: `200`;
  - `/en/wine-list-barometer-2026`: `200`;
  - `/it/barometro-carte-vini-2026`: `200`;
  - `/fr/barometre-cartes-vins-2026`: `200`;
  - `/de/weinkarten-barometer-2026`: `200`;
  - `/pt/barometro-cartas-vinhos-2026`: `200`.
- Googlebot en `/barometro-cartas-vino-2026` recibe `200`, `x-prerendered: true`, `x-worker-branch: worker-static-prerender`, canonical propio, `hreflang` para `es/en/it/fr/de/pt/x-default`, schema `Report` y schema `Dataset`.
- `/sitemap.xml` en produccion contiene las seis URLs del Barometro.
- El intento de `npm run deploy:supabase:seo` fallo por falta de `SUPABASE_ACCESS_TOKEN`; no se desplegaron directamente las Edge Functions `sitemap` y `prerender`.
- Validaciones ejecutadas:
  - `npm run build`;
  - `npm run test -- --run src/test/wine-library-seo-surface.test.ts`;
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`;
  - `node --check cloudflare-worker-v3-hybrid.js`;
  - `npm run deploy:worker:dry-run`;
  - `git diff --check`;
  - validaciones `curl` de produccion humana, sitemap y Googlebot.

## Decisiones

- Considerar el Barometro Winerim publicado en produccion aunque las Edge Functions de Supabase queden pendientes, porque el Worker ya cubre ruta, sitemap y prerender bot.
- Mantener el puente del Worker para el Barometro hasta que `sitemap` y `prerender` puedan desplegarse directamente en Supabase.
- No bloquear Search Console por el fallo de Supabase CLI: la URL publica y el sitemap ya son rastreables.

## Hipotesis

- Search Console podra descubrir el Barometro desde `/sitemap.xml` tras el siguiente rastreo, aunque conviene acelerar con inspeccion manual de la URL principal.
- Desplegar Supabase Edge Functions mas adelante reducira dependencia del puente Worker, pero no es requisito para indexacion inicial del Barometro.

## Tareas pendientes

- Inspeccionar `/barometro-cartas-vino-2026` en Search Console y solicitar indexacion si la herramienta lo permite.
- Desplegar `npm run deploy:supabase:seo` cuando exista `SUPABASE_ACCESS_TOKEN` o sesion Supabase CLI.
- Monitorizar en Search Console cobertura, descubrimiento por sitemap e indexacion de las seis variantes.
- Definir dataset real, muestra minima y umbrales de anonimato para la siguiente version del Barometro.

## Actualizacion 2026-06-10: Barometro Winerim de cartas de vino implementado

## Hechos

- Se creo la nueva pagina publica `src/pages/BarometroCartasVino.tsx` como pieza de autoridad propia inspirada en el patron de estudios/benchmarks de Surfeo, pero adaptada a Winerim.
- La ruta principal es `/barometro-cartas-vino-2026`.
- Se anadieron rutas localizadas:
  - `/en/wine-list-barometer-2026`;
  - `/it/barometro-carte-vini-2026`;
  - `/fr/barometre-cartes-vins-2026`;
  - `/de/weinkarten-barometer-2026`;
  - `/pt/barometro-cartas-vinhos-2026`.
- La pagina esta localizada en `es`, `en`, `it`, `fr`, `de` y `pt`, con metodologia, patrones detectables, segmentos publicables, datos necesarios, FAQ, enlaces internos y CTAs hacia analisis/benchmarks.
- Se reforzo el SEO/LLM con `Report`, `Dataset`, `ItemList`, canonical, `hreflang`, sitemap, prerender estatico y referencias en `llms.txt` / `llms-full.txt`.
- Se anadieron enlaces internos desde `GuiasRecursos`, `WineListBenchmark` y `BenchmarksPlaybooks`.
- Se actualizo `STATIC_ROUTE_LASTMOD` del sitemap a `2026-06-10` y se alineo el test de superficie SEO con ese valor.
- Validaciones locales completadas:
  - `npm run build`;
  - `npm run test -- --run src/test/wine-library-seo-surface.test.ts`;
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`;
  - `node -e "JSON.parse(...)"` sobre `public/sitemap-extra.json`;
  - `git diff --check`;
  - revision en navegador local desktop y mobile.

## Decisiones

- Usar el Barometro Winerim como activo editorial de datos propios y autoridad SEO/LLM, no como otro test de carta.
- Presentar el barometro como metodologia y marco publicable hasta que existan datos agregados validados suficientes para cifras reales.
- No publicar rankings nominales, cifras sensibles ni benchmarks por segmento sin anonimato y muestra minima.
- Mantener rutas localizadas limpias para la pieza del barometro y exponerlas en sitemap/prerender/llms.

## Hipotesis

- El barometro puede mejorar posicionamiento en Google y LLMs porque convierte la experiencia acumulada de Winerim en una fuente citable.
- Cuando se conecte con datos reales de cartas, precios, copa, rotacion y stock, podra generar benchmarks por vertical con mayor valor comercial.
- La combinacion `analisis de carta` + `barometro` + `benchmarks` deberia aumentar confianza y captacion de restaurantes/hoteles.

## Tareas pendientes

- Desplegar frontend y Edge Functions desde Lovable antes de considerar la mejora publicada.
- Validar en produccion las seis URLs localizadas, canonical, `hreflang`, schema y respuesta Googlebot/prerender.
- Reenviar o inspeccionar la nueva URL principal en Search Console tras deploy.
- Definir el dataset real del Barometro Winerim 2026: periodo, campos, segmentos, umbrales de anonimato y muestra minima.

## Actualizacion 2026-06-10: refuerzo de captacion en `/analisis-carta`

## Hechos

- Se reviso la observacion aportada por otra tarea de Codex sobre `/analisis-carta`.
- La observacion tecnica era correcta: el titulo visual del componente principal `WineListAnalyzerTool` estaba marcado como `<h2>`, aunque en `/analisis-carta` funciona como encabezado principal de la pagina.
- Se actualizo `src/components/WineListAnalyzerTool.tsx` para que el encabezado principal sea `<h1>`.
- Se reforzo el copy del encabezado en seis idiomas hacia el angulo comercial: margen perdido por la carta, envio en 30 segundos, diagnostico inicial e informe personalizado en menos de 48 h.
- Se anadio microprueba visible en el encabezado: mas de 500 cartas analizadas y sin compromiso, localizada por idioma.
- `npm run build` finalizo correctamente; solo aparecieron avisos preexistentes de Browserslist desactualizado y chunks grandes.
- `git diff --check` finalizo sin errores.

## Decisiones

- Adoptar como posicionamiento principal para la captacion de `/analisis-carta`: cuanto margen o potencial economico pierde la carta de vinos sin que el restaurante lo vea.
- Mantener la logica y backend del analizador sin cambios en esta correccion.

## Tareas pendientes

- Validar visualmente `/analisis-carta` tras deploy en produccion.
- Considerar anadir un ejemplo visual descargable o capturable del informe como siguiente mejora de conversion.
- Medir eventos por modo de entrada: URL, texto y PDF/archivo.

## Actualizacion 2026-06-10: propuesta de autoridad propia para Winerim

## Hechos

- Se leyeron al inicio `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- El usuario corrigio la lectura anterior: el punto 1 de la propuesta inspirada en Surfeo, el test/score de carta, ya existe en Winerim y no debe tratarse como pieza nueva.
- El codigo confirma que Winerim ya tiene piezas relacionadas: `WineListScore`, `WineListAnalyzer`, `WineListBenchmark`, `BenchmarksPlaybooks` y `Comparativas`.
- `WineListBenchmark` existe como superficie publica, pero actualmente usa cifras estaticas orientativas como `42` referencias medias, `32 EUR` precio medio botella, `7,50 EUR` precio medio copa y `18%` vino por copa.
- La oportunidad prioritaria no es crear otro test, sino convertir las herramientas y la biblioteca en un sistema de autoridad publica: barometro propio, benchmarks agregados, guias por vertical/problema, comparativas BOFU y schema reforzado.

## Decisiones

- Tratar el `Wine List Score` existente como ancla de captacion y diagnostico, no como iniciativa nueva.
- Desarrollar el Barometro Winerim solo con datos agregados y anonimizados, evitando publicar nombres de clientes, rankings o datos sensibles sin permiso explicito.
- Convertir los benchmarks publicos en datos defendibles antes de presentarlos como evidencia del mercado.
- Mantener comparativas claras y honestas, conectadas a demo, analisis de carta, funcionalidades, casos y biblioteca.

## Hipotesis

- Un Barometro Winerim con datos propios puede elevar autoridad SEO/LLM mas que publicar solo guias genericas.
- Benchmarks por vertical, ciudad o tipo de restaurante pueden mejorar captacion si se apoyan en datos reales y umbrales de anonimato.
- Las guias por vertical/problema pueden funcionar mejor si cada una conecta biblioteca, herramienta y demo en un flujo unico.

## Tareas pendientes

- Confirmar que datos reales estan disponibles para barometro y benchmarks: cartas, referencias, precios, copa, estilos, regiones, ventas, rotacion, stock y tipo de negocio.
- Definir umbrales de anonimato antes de publicar estadisticas por ciudad, vertical o segmento.
- Proponer la version final de copy de home antes/despues y decidir si se implementa.
- Planificar la primera tanda: Barometro Winerim 2026, benchmark publico mejorado, 4-6 guias verticales y nuevas comparativas BOFU.

## Actualizacion 2026-06-10: SEO/LLM inicial de Spiritsrim desplegado

## Hechos

- En `/Users/GOIKO/spiritsrim` se publico una capa SEO/LLM inicial para Spiritsrim:
  - home castellana enriquecida;
  - nueva pagina `/software-carta-destilados`;
  - fichas prioritarias con narrativa de uso, margen, backbar, error habitual y FAQ;
  - prerender estatico para todas las URLs del sitemap.
- `sitemap.xml` pasa a `325` URLs e incluye `/software-carta-destilados`.
- `llms.txt` y `llms-full.txt` incluyen producto y entidades prioritarias.
- Despliegue Cloudflare Pages completado:
  - `https://b77c1545.spiritsrim.pages.dev`.
- Produccion validada con `HTTP/2 200` en home, producto, biblioteca, Tequila, Negroni y sitemap.
- Search Console leyo el sitemap actualizado el 2026-06-10 como `Correcto`, con `325` paginas descubiertas.

## Decisiones

- Mantener el trabajo operativo de Spiritsrim en `/Users/GOIKO/spiritsrim`.
- Usar HTML estatico por URL como primera capa SEO/LLM, no solo render cliente.
- Priorizar castellano como primera capa editorial fuerte.

## Tareas pendientes

- Monitorizar cobertura e indexacion inicial en Search Console tras la lectura del sitemap de `325` URLs.
- Continuar con segunda tanda de entidades y clusters editoriales.
- Decidir canonical operativo de `www`.

## Actualizacion 2026-06-09: Spiritsrim publicado en Cloudflare Pages

## Hechos

- En el repo separado `/Users/GOIKO/spiritsrim` se publico Spiritsrim en Cloudflare Pages.
- Proyecto Cloudflare Pages creado: `spiritsrim`.
- URL estable disponible: `https://spiritsrim.pages.dev/`.
- Se elimino la dependencia de Lovable para publicar esta web estatica.
- Se limpiaron assets publicos heredados y se añadieron sitemap estatico generado, `_headers`, `_redirects` y scripts de deploy Pages.
- Se añadieron `spiritsrim.com` y `www.spiritsrim.com` como custom domains de Pages.
- Se creo la zona `spiritsrim.com` en Cloudflare y se preparo DNS hacia `spiritsrim.pages.dev`.
- OVH acepto la solicitud de cambio de nameservers desde `ns1.dns-parking.com` / `ns2.dns-parking.com` hacia `april.ns.cloudflare.com` / `nash.ns.cloudflare.com`.
- DNS publico ya delega en Cloudflare.
- Los CNAME web se dejaron DNS-only hacia `spiritsrim.pages.dev`, se recrearon los custom domains de Pages y `spiritsrim.com` / `www.spiritsrim.com` quedaron `active`.
- Validacion final completada con `HTTP/2 200` en `https://spiritsrim.com/`, `https://www.spiritsrim.com/`, `/sitemap.xml` y `/biblioteca-destilados/categorias/tequila`.
- Search Console tiene verificada la propiedad de dominio `sc-domain:spiritsrim.com` con la cuenta `gugocreative@gmail.com`.
- Se añadio en Cloudflare DNS el TXT raiz `google-site-verification=tcC0VMQ4t9oe-XvteDYgQXmMrCn3DvsfzItkfh1_aCU`.
- Se envio `https://spiritsrim.com/sitemap.xml` en Search Console; el 2026-06-09 figura como `Correcto` y con `324` paginas descubiertas.
- El token Wrangler local no pudo crear la zona por falta de permiso `zone.create`.

## Decisiones

- Spiritsrim puede publicarse sin Lovable usando Cloudflare Pages.
- La propiedad Search Console se verifico por DNS TXT manual, sin conectar Google con Cloudflare por OAuth.
- La prioridad operativa pasa a monitorizar Search Console y decidir canonica de `www`.

## Tareas pendientes

- Monitorizar Search Console tras el primer recrawl: cobertura, paginas descubiertas e indexacion inicial.
- Decidir si `www` debe servir contenido o redirigir a apex.

## Actualizacion 2026-06-09: base separada de Spiritsrim creada

## Hechos

- Se leyeron al inicio `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md`, `NEXT_STEPS.md` y `SPIRITSRIM_CODEX_HANDOFF.md`.
- Se creo el repo separado `/Users/GOIKO/spiritsrim` mediante clon local de `/Users/GOIKO/seo-migration-master`.
- En `/Users/GOIKO/spiritsrim` se elimino el remoto para evitar pushes accidentales al origen de Winerim.
- Se construyo una primera base publica de Spiritsrim con Vite + React + TypeScript:
  - router publico propio;
  - home de Spiritsrim;
  - chrome propio de marca;
  - biblioteca de destilados en seis idiomas;
  - datos iniciales de categorias, origenes, materias primas y cocteles;
  - schema `WebPage`, `Article`, `DefinedTermSet` y `DefinedTerm`;
  - `SEOHead` apuntando a Spiritsrim;
  - `sitemap`, `prerender` y `redirects` de Supabase sustituidos;
  - Cloudflare Worker `spiritsrim-proxy` preparado con variables propias;
  - `robots.txt`, `llms.txt`, `llms-full.txt`, manifest, OG image y favicons sustituidos;
  - `.env` neutralizado con placeholders de Supabase Spiritsrim.
- Se retiro del arbol lanzable de Spiritsrim el contenido heredado de vino, migraciones SQL antiguas, assets/logos antiguos, funciones Supabase no aplicables y rutas publicas de Winerim.
- Se genero y guardo el asset bitmap `public/spiritsrim-og.png`.
- Validaciones completadas en `/Users/GOIKO/spiritsrim`:
  - `npm run test -- --run`: 3 archivos, 9 tests;
  - `npm run build`;
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts supabase/functions/redirects/index.ts`;
  - `git diff --check`;
  - escaneo critico sin residuos de marca/dominio/rutas de Winerim en `src`, `public`, `supabase`, Worker, package, HTML, Vite, `.env`, `.lovable`, README e instrucciones;
  - servidor local Vite activo en `http://127.0.0.1:8080/`.

## Decisiones

- Usar `/Users/GOIKO/spiritsrim` como repo/proyecto separado de trabajo para Spiritsrim.
- Usar `https://spiritsrim.com` como canonical tecnico provisional hasta confirmacion de dominio final.
- No reutilizar project-ref Supabase, Worker, origen Lovable, Search Console, logos/clientes ni claims de Winerim.
- Mantener la primera version de Spiritsrim enfocada en home, biblioteca semantica, sitemap/prerender, Worker y rutas principales antes de ampliar herramientas reales, blog o formularios.

## Hipotesis

- La base creada es suficiente como corte indexable inicial si se conectan dominio, Lovable, Supabase y Cloudflare reales.
- La biblioteca de destilados puede escalar con el mismo patron SEO/LLM de Winerim sin heredar contenido literal.

## Tareas pendientes

- Confirmar dominio final de Spiritsrim.
- Crear o confirmar proyecto Lovable de Spiritsrim y `SPIRITSRIM_ORIGIN`.
- Crear proyecto Supabase separado y reemplazar placeholders de `.env`, `supabase/config.toml` y scripts.
- Configurar Worker/DNS/Cloudflare para `spiritsrim-proxy`.
- Confirmar destino real de leads/formularios.
- Sustituir/validar logo definitivo, favicon dedicado y claims/clientes autorizados.
- Expandir herramientas reales de backbar/cocteleria y clusters de blog por mercado.
- Desplegar y validar produccion como humano y Googlebot antes de enviar sitemap a Search Console.

## Actualizacion 2026-06-09: handoff para Spiritsrim

## Hechos

- Se trabajo sobre `main` en `/Users/GOIKO/seo-migration-master`.
- Se leyeron al inicio `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- El usuario explico que existe o se quiere crear una hermana gemela de Winerim para destilados llamada `Spiritsrim`.
- Se reviso la arquitectura local de Winerim: Vite + React + TypeScript, rutas multilingues, biblioteca del vino, `SEOHead`, schema, blog, recursos, Supabase Edge Functions, Cloudflare Worker y scripts de despliegue.
- Se creo `SPIRITSRIM_CODEX_HANDOFF.md` como briefing autocontenido para abrir una tarea nueva de Codex y construir Spiritsrim a partir del patron Winerim.
- El handoff incluye:
  - objetivo de Spiritsrim;
  - documentos fuente de verdad a leer;
  - contexto tecnico de Winerim;
  - archivos clave;
  - que clonar y que no clonar;
  - posicionamiento recomendado;
  - mapa conceptual Winerim -> Spiritsrim;
  - propuesta de biblioteca de destilados;
  - schema recomendado;
  - herramientas sugeridas;
  - plan de implementacion;
  - guardrails;
  - validaciones minimas;
  - accesos y datos necesarios;
  - prompt listo para pegar en otra tarea de Codex.
- No se modifico codigo de aplicacion.
- No se modifico Cloudflare Worker.
- No se modifico base de datos.

## Decisiones

- Preparar Spiritsrim como proyecto separado, no como sustitucion de Winerim.
- Reutilizar de Winerim la arquitectura, patrones SEO, validaciones y estructura de biblioteca, pero no el contenido literal ni los identificadores operativos.
- Orientar Spiritsrim a destilados, cocteleria, backbar y servicio beverage para restaurantes, hoteles, cocktail bars, grupos y distribuidores.
- Recomendar una biblioteca propia de destilados con categorias, origenes, materias primas, cocteles/serves, guia de servicio y glosario.

## Hipotesis

- La arquitectura Winerim reduce mucho el tiempo de salida de Spiritsrim si se separan bien marca, dominio, datos, sitemap, prerender y contenido.
- Spiritsrim puede heredar la ventaja SEO/LLM de Winerim si se replica la paridad entre experiencia humana, schema, sitemap, prerender, canonical y hreflang.
- El mayor riesgo de la clonacion es dejar residuos de Winerim: dominio, copy, claims, logos, project-ref, worker name o rutas de vino.

## Tareas pendientes

- Abrir una tarea nueva de Codex usando `SPIRITSRIM_CODEX_HANDOFF.md` como briefing inicial.
- Decidir dominio final de Spiritsrim.
- Crear o confirmar proyecto Lovable de Spiritsrim.
- Crear o confirmar proyecto Supabase y Worker separados.
- Aportar logo, favicon, OG image, paleta y assets de Spiritsrim.
- Confirmar idiomas iniciales, mercados prioritarios, CTAs, destino de leads y logos/clientes autorizados.

## Actualizacion 2026-06-08: Search Console tras quinta tanda editorial

## Hechos

- Se trabajo sobre `main` en `/Users/GOIKO/seo-migration-master`.
- Se leyeron al inicio `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- La propiedad operativa usada fue Search Console URL-prefix `https://winerim.wine/`.
- La vista general de Search Console mostraba 102 paginas indexadas y 2.331 paginas no indexadas; este dato es una foto del 2026-06-08 y puede cambiar con retraso respecto a produccion.
- Antes del reenvio, Search Console tenia `/sitemap.xml` y `/sitemap_index.xml` con ultimo rastreo 2026-06-06 y 2.098 paginas descubiertas.
- Se reenvio `/sitemap.xml` desde Search Console.
- Search Console acepto el sitemap y paso a mostrar `/sitemap.xml` como `Correcto`, ultimo rastreo 2026-06-08 y 2.228 URLs descubiertas.
- `/sitemap_index.xml` seguia figurando con ultimo rastreo 2026-06-06 y 2.098 paginas descubiertas.
- Se inspecciono `https://winerim.wine/pt/biblioteca-vinho/harmonizacoes/ceviche`: Search Console lo mostraba como `La URL no esta en Google` y `Descubierta: actualmente sin indexar`, con presencia en `https://winerim.wine/sitemap.xml`.
- Search Console acepto la solicitud manual de indexacion para Ceviche PT y confirmo que la URL fue anadida a una cola de rastreo prioritaria.
- Se inspecciono `https://winerim.wine/pt/biblioteca-vinho/regioes/grecia/santorini`: Search Console lo mostraba como `La URL no esta en Google` y `Descubierta: actualmente sin indexar`, con presencia en sitemap.
- Search Console acepto la solicitud manual de indexacion para Santorini PT y confirmo que la URL fue anadida a una cola de rastreo prioritaria.
- Se inspecciono `https://winerim.wine/de/weinbibliothek/weinstile/franciacorta`: Search Console lo mostraba como `La URL no esta en Google` y `Descubierta: actualmente sin indexar`, con presencia en sitemap.
- Search Console acepto la solicitud manual de indexacion para Franciacorta DE y confirmo que la URL fue anadida a una cola de rastreo prioritaria.
- Se inspecciono `https://winerim.wine/biblioteca-vino`: Search Console lo mostraba como `La URL esta en Google`.
- Se inspecciono `https://winerim.wine/biblioteca-vino/maridajes`: Search Console lo mostraba como `La URL esta en Google`.
- No se modifico codigo de aplicacion.
- No se modifico Cloudflare Worker.
- No se modifico base de datos.

## Decisiones

- Reenviar solo `/sitemap.xml` como sitemap canonico operativo porque ya refleja las 2.228 URLs de produccion.
- Solicitar indexacion manual solo de una tanda corta y representativa para evitar saturar la herramienta o topar con cuotas de Search Console.
- Priorizar para solicitud manual fichas nuevas ya validadas en produccion y con alta intencion: un maridaje PT, una region PT y un estilo DE.
- No solicitar de nuevo indexacion de hubs que Search Console ya marca como indexados.

## Hipotesis

- El salto de 2.098 a 2.228 URLs descubiertas en Search Console refleja que Google ya leyo el sitemap actualizado tras la quinta tanda editorial.
- Las solicitudes manuales pueden acelerar el recrawl de las fichas seleccionadas, pero no garantizan indexacion inmediata ni mejora de posicion.
- Que los hubs principales esten indexados y las fichas nuevas aparezcan como descubiertas sugiere que el problema actual es cola/priorizacion de rastreo, no bloqueo tecnico de sitemap o canonical.

## Tareas pendientes

- Revisar en Search Console dentro de unos dias si Ceviche PT, Santorini PT y Franciacorta DE pasan de `Descubierta: actualmente sin indexar` a indexadas o a otro estado.
- Monitorizar si baja el volumen de `Descubierta: actualmente sin indexar` tras el rastreo de `/sitemap.xml` del 2026-06-08.
- Hacer una segunda tanda corta de solicitudes manuales solo si no aparece limite de cuota y si las URLs nuevas siguen descubiertas sin indexar.
- Reforzar enlaces internos hacia las fichas nuevas desde hubs, entidades relacionadas y proximos articulos de blog.

## Actualizacion 2026-06-08: quinta tanda editorial de regiones, estilos y maridajes

## Hechos

- Se trabajo sobre `main` en `/Users/GOIKO/seo-migration-master`.
- Se leyeron al inicio `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- Se implemento y pusheo `3954369 feat: expand wine library entity editorial coverage`.
- La cobertura editorial visible de biblioteca del vino pasa a:
  - 40 uvas prioritarias;
  - 34 regiones prioritarias;
  - 25 estilos prioritarios;
  - 30 maridajes/platos prioritarios.
- `src/data/wineLibraryEditorialExpansion.ts` anadio 12 regiones: `ribeira-sacra`, `bierzo`, `toro`, `chablis`, `alsacia`, `provence`, `santorini`, `valpolicella`, `chianti-classico`, `brunello-di-montalcino`, `soave` y `etna`.
- `src/data/wineLibraryEditorialExpansion.ts` anadio 10 estilos: `prosecco`, `cremant`, `franciacorta`, `pet-nat`, `amontillado`, `oloroso`, `palo-cortado`, `oporto-tawny`, `madeira` y `blanco-fermentado-barrica`.
- `src/data/wineLibraryEditorialExpansion.ts` anadio 12 maridajes/platos: `ceviche`, `queso-azul`, `queso-de-cabra`, `jamon-iberico`, `paella`, `curry`, `ramen`, `thai-curry`, `setas-y-trufas`, `cochinillo-lechon`, `queso-manchego` y `tarta-de-queso`.
- Se corrigio la plantilla de `ceviche`, `paella` y `ramen` para evitar heredar una lectura de `tinto elegante`; `ceviche` PT queda validado como `branco gastronomico`.
- `supabase/functions/prerender/index.ts` se sincronizo con las nuevas entidades para que Googlebot reciba perfil editorial de bot.
- `supabase/functions/sitemap/index.ts` anadio las rutas que faltaban para regiones italianas y maridajes/platos nuevos; la revision local confirma 366 rutas fuente, 0 duplicados y 0 faltantes en la tanda nueva.
- Tests y validaciones locales completadas:
  - `npm run test -- --run src/test/wine-library-editorial.test.ts src/test/wine-library-seo-surface.test.ts`: 25 tests.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`.
  - `npm run test -- --run`: 55 tests.
  - `npm run build`.
  - `git diff --check`.
  - Navegador local en Santorini PT, Franciacorta DE y Ceviche PT.
- Lovable `Web Winerim` desplego `prerender` y `sitemap` del commit `3954369` y publico frontend con estado `Up to date`.
- Produccion validada independientemente como Googlebot:
  - `/pt/biblioteca-vinho/regioes/grecia/santorini`: `200`, `x-worker-branch: bot-prerender`, `x-prerendered: true`, canonical propio, `lang="pt"`, schema con `WebPage`, `Article`, `DefinedTermSet`, `DefinedTerm`, contenido editorial y sin fallback.
  - `/de/weinbibliothek/weinstile/franciacorta`: `200`, `x-worker-branch: bot-prerender`, `x-prerendered: true`, canonical propio, `lang="de"`, schema con `WebPage`, `Article`, `DefinedTermSet`, `DefinedTerm`, contenido editorial y sin fallback.
  - `/pt/biblioteca-vinho/harmonizacoes/ceviche`: `200`, `x-worker-branch: bot-prerender`, `x-prerendered: true`, canonical propio, `lang="pt"`, schema con `WebPage`, `Article`, `DefinedTermSet`, `DefinedTerm`, contenido editorial y sin fallback.
- Produccion `/sitemap.xml` responde `200`, `x-worker-branch: sitemap-worker-detail-bridge`, contiene 2.228 URLs y no faltan las variantes revisadas `es/de/pt` de `chianti-classico`, `brunello-di-montalcino`, `soave`, `etna`, `jamon-iberico`, `thai-curry` y `tarta-de-queso`.
- Produccion humana validada en `/pt/biblioteca-vinho/harmonizacoes/ceviche`: canonical propio, `lang="pt"`, `Papel na carta`, `branco gastronomico`, sin fallback y sin texto de `tinto elegante`.
- No se modifico Cloudflare Worker.
- No se modifico base de datos.

## Decisiones

- Escalar regiones, estilos y maridajes/platos con la capa generativa localizada existente para mantener seis idiomas sin duplicar seis bloques manuales por entidad.
- Cuando una entidad pasa a prioridad editorial, mantener paridad minima entre experiencia humana, `prerender` y sitemap.
- Anadir al sitemap las entidades nuevas que ya existian en catalogos humanos pero no estaban sometidas como URLs dinamicas.
- Ajustar plantillas de maridaje cuando una herencia generica produzca una recomendacion poco natural para el plato.
- Mantener sin cambios Cloudflare Worker y DB porque la tanda pertenece a React, `prerender` y `sitemap`.

## Hipotesis

- Ampliar perfiles propios en regiones, estilos y maridajes de alta intencion deberia reducir dependencia del fallback visible y mejorar utilidad humana, rastreo e interpretacion por LLMs.
- La presencia de nuevas rutas en sitemap junto con HTML prerenderizado robusto deberia acelerar descubrimiento tras recrawl, aunque Search Console tardara en reflejarlo.
- Los maridajes de alta intencion como `ceviche`, `jamon-iberico`, `thai-curry` y `tarta-de-queso` pueden convertirse en puertas de entrada SEO hacia la biblioteca si se refuerzan con enlaces internos y blog.

## Tareas pendientes

- Monitorizar en Search Console el recrawl posterior a `3954369`, especialmente `/sitemap.xml` y la categoria `Descubierta: actualmente sin indexar`.
- Solicitar indexacion selectiva de una tanda corta si Search Console lo permite:
  - hubs de biblioteca;
  - Santorini PT;
  - Franciacorta DE;
  - Ceviche PT;
  - rutas nuevas de sitemap con alta intencion.
- Reforzar enlaces internos estrategicos hacia las nuevas entidades desde hubs, fichas relacionadas y futuros articulos.
- Planificar la migracion de slugs localizados solo como proyecto SEO separado con redirects 301, canonicals, hreflang y validacion.

## Actualizacion 2026-06-08: schema enriquecido para regiones, estilos y maridajes

## Hechos

- Se trabajo sobre `main` en `/Users/GOIKO/seo-migration-master`.
- Se leyeron al inicio `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- Se implemento `70bb44e feat: enrich wine library entity schema`.
- `src/components/seo/wineLibrarySchema.ts` ahora contiene helpers compartidos para construir schema de fichas de biblioteca:
  - `WebPage`;
  - `Article`;
  - `DefinedTermSet`;
  - `DefinedTerm`;
  - `PropertyValue`;
  - `mentions` internas resolubles con rutas localizadas.
- `src/pages/RegionDetail.tsx` emite schema enriquecido con propiedades de pais, tipo de denominacion, estilos, uvas principales, roles de carta, prestigio, reconocimiento, subzonas y perfil de servicio.
- `src/pages/StyleDetail.tsx` emite schema enriquecido con familia de estilo, temperatura de servicio, uvas, regiones clave, cuerpo, acidez, complejidad, maridajes, roles de carta y perfil de servicio.
- `src/pages/PairingDetail.tsx` emite schema enriquecido con categoria, nivel, intensidad, grasa, picante, acidez del plato, estilos, regiones, uvas recomendadas, roles de maridaje y perfil de servicio.
- `supabase/functions/prerender/index.ts` ahora identifica fichas de uvas, regiones, estilos y maridajes para emitir un grafo semantico equivalente en HTML de bot.
- Se añadieron tests renderizados para validar schema de region PT, estilo DE y maridaje PT con `WebPage`, `DefinedTermSet`, `DefinedTerm`, propiedades y `mentions`.
- `src/test/wine-library-seo-surface.test.ts` valida que `prerender` conserva `WebPage`, `DefinedTermSet` y anchors semanticos para regiones, estilos y maridajes.
- `70bb44e` y el cierre documental `69d2fbf` quedaron pusheados a `origin/main`.
- Lovable `Web Winerim` sincronizo `69d2fbf`, desplego Supabase Edge Function `prerender` y dejo el frontend en estado `Published` / `Up to date`.
- Produccion validada independientemente como Googlebot:
  - `/pt/biblioteca-vinho/regioes/portugal/vinho-verde`: `200`, `x-worker-branch: bot-prerender`, `x-prerendered: true`, canonical propio, `lang="pt"`, schema con `WebPage`, `Article`, `DefinedTermSet`, `DefinedTerm`, 9 `mentions` y 455 palabras.
  - `/de/weinbibliothek/weinstile/espumoso`: `200`, `x-worker-branch: bot-prerender`, `x-prerendered: true`, canonical propio, `lang="de"`, schema con `WebPage`, `Article`, `DefinedTermSet`, `DefinedTerm`, 10 `mentions` y 381 palabras.
  - `/pt/biblioteca-vinho/harmonizacoes/lubina-dorada`: `200`, `x-worker-branch: bot-prerender`, `x-prerendered: true`, canonical propio, `lang="pt"`, schema con `WebPage`, `Article`, `DefinedTermSet`, `DefinedTerm`, 10 `mentions` y 442 palabras.
- Validaciones locales completadas durante la sesion:
  - `npm run test -- --run src/test/grape-detail-render.test.tsx src/test/wine-library-seo-surface.test.ts`: 26 tests.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts`.
  - `git diff --check`.
  - Antes del cierre tambien se habia validado `npm run test -- --run`, `npm run build` y navegador local en `/pt/biblioteca-vinho/harmonizacoes/lubina-dorada`.
- No se modifico Cloudflare Worker.
- No se modifico base de datos.
- La capa semantica de regiones, estilos y maridajes queda publicada y validada en produccion.

## Decisiones

- Extender a regiones, estilos y maridajes el mismo patron semantico ya aplicado a uvas prioritarias.
- Mantener el schema de fichas como grafo `WebPage` + `Article` + `DefinedTermSet` + `DefinedTerm`, evitando volver a schemas planos con menos contexto.
- Mantener paridad entre experiencia humana y `prerender` para bots en cualquier mejora semantica de biblioteca.
- No tocar Worker ni DB porque la mejora pertenece a React y a Supabase Edge Function `prerender`.
- Usar Lovable como via operativa de deploy para `prerender`, ya que el CLI local sigue sin `SUPABASE_ACCESS_TOKEN`.
- Dar por cerrada esta tanda solo despues de validacion independiente de produccion, no solo por respuesta de Lovable.

## Hipotesis

- Las fichas de regiones, estilos y maridajes pasan a ser mas legibles como entidades conectadas, no solo como articulos aislados.
- Googlebot y LLMs deberian interpretar mejor la relacion uva-region-estilo-maridaje si el grafo semantico y los enlaces internos coinciden.
- El impacto en Search Console dependera del despliegue efectivo de `prerender` y del recrawl posterior.

## Tareas pendientes

- Monitorizar Search Console tras recrawl de las fichas de regiones, estilos y maridajes.
- Mantener como siguiente bloque la expansion editorial visible de regiones, estilos y maridajes.
- Planificar la migracion de slugs localizados solo como proyecto SEO separado con redirects y canonicals.

## Actualizacion 2026-06-08: prerender estrategico y sitemap estrategico cerrados

## Hechos

- Se trabajo sobre `main` en `/Users/GOIKO/seo-migration-master`.
- Se leyeron al inicio `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- Contradiccion detectada: los documentos aun marcaban `d02ff15` como `prerender` pendiente, pero el repo y Lovable ya habian avanzado a `7a1745a` para sincronizar `prerender` y a `6d0c2cf` para completar el sitemap.
- Lovable `Web Winerim` ya habia desplegado la Edge Function `prerender` del commit `7a1745a`.
- Produccion Googlebot validada tras `7a1745a`:
  - `/de/weinbibliothek/rebsorten/muscadet`;
  - `/pt/biblioteca-vinho/castas/muscadet`;
  - `/de/weinbibliothek/rebsorten/gruner-veltliner`;
  - `/pt/biblioteca-vinho/castas/corvina`.
- Las cuatro rutas responden `200`, `x-worker-branch: bot-prerender`, `x-prerendered: true`, canonical propio, idioma correcto y JSON-LD con `mentions` estrategicas reales.
- Los slugs de entidad siguen en forma canonica base espanola dentro de rutas localizadas; los segmentos de seccion si estan localizados, por ejemplo `regionen`, `regioes`, `weinbegleitung` y `harmonizacoes`.
- Se audito la sincronizacion entre `WINE_LIBRARY_STRATEGIC_LINKS` de `supabase/functions/prerender/index.ts` y `WINE_LIBRARY_DYNAMIC_ROUTES` de `supabase/functions/sitemap/index.ts`.
- Antes del cambio faltaban 9 rutas estrategicas en el sitemap:
  - `/biblioteca-vino/maridajes/ceviche`;
  - `/biblioteca-vino/maridajes/lubina-dorada`;
  - `/biblioteca-vino/maridajes/queso-azul`;
  - `/biblioteca-vino/maridajes/queso-de-cabra`;
  - `/biblioteca-vino/regiones/espana/ribeira-sacra`;
  - `/biblioteca-vino/regiones/francia/muscadet`;
  - `/biblioteca-vino/regiones/grecia/santorini`;
  - `/biblioteca-vino/regiones/italia/valpolicella`;
  - `/biblioteca-vino/regiones/italia/vermentino-di-gallura`.
- Se implemento y pusheo `6d0c2cf fix: include strategic wine library targets in sitemap`.
- `supabase/functions/sitemap/index.ts` ahora incluye esas 9 rutas estrategicas.
- `src/test/wine-library-seo-surface.test.ts` ahora valida que todos los targets de `WINE_LIBRARY_STRATEGIC_LINKS` esten presentes en el sitemap.
- Validaciones locales tras `6d0c2cf`:
  - `npx --yes deno-bin check supabase/functions/sitemap/index.ts supabase/functions/prerender/index.ts`;
  - `npm run test -- --run src/test/wine-library-seo-surface.test.ts`: 17 tests;
  - `npm run test -- --run`: 52 tests;
  - `npm run build`;
  - `git diff --check`.
- El intento de deploy CLI de `sitemap` fallo por falta de `SUPABASE_ACCESS_TOKEN`; no habia token local ni sesion Supabase guardada.
- Se envio instruccion explicita a Lovable para desplegar `sitemap` del commit `6d0c2cf`.
- Lovable respondio que la Edge Function `sitemap` quedo desplegada y que `/sitemap.xml` produce 2.150 URLs.
- Produccion validada independientemente:
  - `/sitemap.xml` responde `200`, `content-type: application/xml; charset=utf-8`, `x-worker-branch: sitemap-worker-detail-bridge` y `x-robots-tag: index, follow`;
  - conteo real: 2.150 URLs;
  - las 54 variantes de las 9 rutas nuevas en seis idiomas estan presentes;
  - las 27 variantes `es/de/pt` revisadas como Googlebot responden `200`;
  - una muestra de rutas nuevas confirma `x-prerendered: true` y `x-worker-branch: bot-prerender`.
- Se pulso `Publish your app` en Lovable despues del deploy de `sitemap`; el panel quedo `Published` y `Up to date`.
- No se modifico Cloudflare Worker.
- No se modifico base de datos.

## Decisiones

- Dar por cerrado el despliegue de `prerender` estrategico para uvas prioritarias en `7a1745a`.
- Dar por cerrado el despliegue de `sitemap` estrategico para los targets de enlaces internos en `6d0c2cf`.
- Mantener como guardrail que cualquier target nuevo de `WINE_LIBRARY_STRATEGIC_LINKS` debe estar tambien en `WINE_LIBRARY_DYNAMIC_ROUTES`.
- No traducir slugs de entidad como cambio rapido porque alteraria canonicals ya publicados; tratarlo como migracion SEO separada.
- Mantener Lovable como via operativa para Edge Functions mientras no haya `SUPABASE_ACCESS_TOKEN` local.

## Hipotesis

- Tener los enlaces estrategicos de JSON-LD tambien en sitemap deberia mejorar rastreo y coherencia semantica entre uvas, regiones, estilos y maridajes.
- El aumento de sitemap de 2.098 a 2.150 URLs refleja la incorporacion efectiva de las rutas estrategicas, teniendo en cuenta que algunas variantes ya podian existir o deduplicarse.
- La migracion futura de slugs localizados puede mejorar percepcion internacional, pero solo si se ejecuta con redirects y sin romper señales acumuladas.

## Tareas pendientes

- Monitorizar Search Console cuando actualice datos posteriores al deploy de `6d0c2cf`.
- Solicitar indexacion selectiva de hubs y entidades maduras si Search Console lo permite sin error.
- Planificar la migracion de slugs de entidad localizados con mapa completo por idioma, redirects 301, canonical, hreflang y sitemap.
- Extender el criterio de schema, `mentions` y enlazado estrategico a regiones, estilos y maridajes, no solo uvas.
- Continuar convirtiendo entidades de alto valor desde fallback a perfiles editoriales propios.

## Actualizacion 2026-06-08: schema y enlaces internos de uvas prioritarias

## Hechos

- Se trabajo sobre `main` en `/Users/GOIKO/seo-migration-master`.
- Se leyeron al inicio `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- Se implemento una mejora de biblioteca del vino centrada en schema, enlaces internos y desambiguacion de `muscadet`.
- Commit funcional creado y pusheado: `d02ff15 feat: enrich wine library grape schema links`.
- `src/data/wineLibraryLinks.ts` ahora anade enlaces estrategicos para las 40 uvas prioritarias, no solo para las 20 primeras.
- Se anadieron alias de resolucion para `Melon de Bourgogne`, `Melon`, `Muscadet Sèvre-et-Maine`, `Muscadet Sevre-et-Maine` y `Muscadet sur Lie`.
- `Muscadet` puede resolverse como uva o como region segun el `hint`:
  - `Melon de Bourgogne` con `grape` apunta a `/biblioteca-vino/uvas/muscadet`;
  - `Muscadet` con `region` apunta a `/biblioteca-vino/regiones/francia/muscadet`.
- `src/pages/GrapeDetail.tsx` ahora genera JSON-LD enriquecido para fichas de uva:
  - `WebPage`;
  - `Article`;
  - `DefinedTermSet`;
  - `DefinedTerm`;
  - `alternateName`;
  - paises, regiones clave, color, acidez, cuerpo, intensidad aromatica y rol en carta como `PropertyValue`;
  - `mentions` hacia entidades internas resolubles de region, estilo, uva y maridaje.
- El JSON-LD nuevo no incluye `FAQPage`, para evitar duplicar el schema de FAQs que ya emite `FAQSection`.
- La ficha humana de `muscadet` muestra una aclaracion localizada en seis idiomas explicando que la pagina modela la uva `Melon de Bourgogne` y enlaza la region `Muscadet` cuando el contexto es denominacion/origen.
- `supabase/functions/prerender/index.ts` queda preparado para que las fichas de biblioteca prerenderizadas como bots incluyan `mainEntity`, `about` y `mentions` semanticas hacia enlaces internos.
- Tests ampliados:
  - todas las 40 `priorityGrapeSlugs` deben tener enlaces estrategicos resolubles;
  - `muscadet` se valida como caso ambiguo uva/region;
  - la ficha alemana valida aviso humano, schema enriquecido, mencion a region Muscadet y ausencia de `FAQPage` dentro del grafo de uva;
  - la superficie SEO de `prerender` valida la nueva capa de menciones semanticas.
- Validaciones locales completadas:
  - `npm test -- --run src/test/wine-library-links.test.ts src/test/grape-detail-render.test.tsx src/test/wine-library-seo-surface.test.ts`: 28 tests.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts`.
  - `npm test -- --run`: 52 tests.
  - `npm run build`.
  - `git diff --check`.
  - Navegador local en `/de/weinbibliothek/rebsorten/muscadet`.
- Lovable `Web Winerim` detecto el commit `d02ff15` como `Pushed from GitHub`.
- Se pulso `Publish project` y despues `Update` en Lovable.
- Produccion humana validada en `https://winerim.wine/de/weinbibliothek/rebsorten/muscadet?codex=d02ff15`:
  - H1 `Melon de Bourgogne`;
  - aviso visible de desambiguacion;
  - `grape-detail-jsonld` con `alternateName` que incluye `Muscadet`;
  - `mentions` hacia `/de/weinbibliothek/regionen/francia/muscadet`;
  - 0 `FAQPage` dentro del grafo de uva.
- Produccion Googlebot sigue sirviendo `prerender` antiguo para `/de/weinbibliothek/rebsorten/muscadet`:
  - `200`;
  - `X-Worker-Branch: bot-prerender`;
  - `x-prerendered: true`;
  - canonical propio e `html lang="de"`;
  - 722 palabras;
  - pero el schema principal aun no contiene `mentions` ni `DefinedTerm` enriquecido.
- La Edge Function directa de Supabase tambien confirma que `prerender` sigue en version anterior.
- Se intento desplegar solo `prerender` por CLI como fallback, pero fallo por falta de `SUPABASE_ACCESS_TOKEN`.
- No se modifico Cloudflare Worker.
- No se modifico base de datos.

## Decisiones

- Completar primero el grafo de enlaces de las 40 uvas prioritarias antes de abrir otra tanda editorial.
- Mantener la aclaracion de `muscadet` en la UI humana para evitar confusion entre uva/sinonimo y region.
- Enriquecer el schema de uva sin anadir `FAQPage` al grafo propio de la ficha, porque el proyecto ya tuvo deuda de FAQ duplicado.
- Publicar el frontend desde Lovable, siguiendo la via operativa documentada.
- No desplegar Cloudflare Worker ni tocar DB porque el cambio pertenece a frontend y `prerender`.

## Hipotesis

- El grafo completo de las 40 uvas deberia mejorar rastreo interno, contexto semantico y lectura por LLMs.
- La desambiguacion de `muscadet` reducira señales contradictorias para usuarios, Googlebot y crawlers de IA.
- La mejora de schema sera plenamente efectiva para bots cuando Lovable despliegue la Edge Function `prerender` del commit `d02ff15`.

## Tareas pendientes

- Desplegar explicitamente Supabase Edge Function `prerender` del commit `d02ff15` desde Lovable, o proporcionar `SUPABASE_ACCESS_TOKEN` si se decide usar CLI.
- Revalidar despues del deploy de `prerender`:
  - Googlebot en `/de/weinbibliothek/rebsorten/muscadet`;
  - Googlebot en `/pt/biblioteca-vinho/castas/muscadet`;
  - presencia de `mentions` y entidad `DefinedTerm` enriquecida en HTML de bot.
- Continuar con schema especifico para regiones, estilos y maridajes.
- Convertir mas regiones/maridajes/estilos de alto valor desde fallback a perfil editorial propio.
- Monitorizar Search Console cuando haya recrawl de las uvas prioritarias.

## Actualizacion 2026-06-08: cuarta tanda editorial de uvas prioritarias

## Hechos

- Se trabajo sobre `main` en `/Users/GOIKO/seo-migration-master`.
- Se leyeron al inicio `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- Se implemento la cuarta tanda de perfiles editoriales humanos para uvas de biblioteca del vino.
- La cobertura de uvas prioritarias paso de 30 a 40.
- Las 10 uvas anadidas son:
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
- Cada nueva uva tiene servicio, copa, aireacion, rol en carta, guion de sala, palanca comercial, error a evitar y maridajes de menu localizados en `es`, `en`, `it`, `fr`, `de` y `pt`.
- Se sincronizo `supabase/functions/prerender/index.ts` con entradas expandidas para las mismas 10 uvas, manteniendo disponibilidad editorial para Googlebot y crawlers.
- Se actualizo la cobertura de tests:
  - `priorityGrapeSlugs` ahora exige 40 uvas;
  - se valida la cuarta tanda en aleman y portugues;
  - se valida que `prerender` contiene la nueva tanda.
- Validaciones locales completadas:
  - `npm test -- --run src/test/wine-library-editorial.test.ts src/test/wine-library-seo-surface.test.ts`: 24 tests.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts`.
  - `npm test -- --run`: 49 tests.
  - `npm run build`.
  - `git diff --check`.
  - Navegador local en `/pt/biblioteca-vinho/castas/graciano` y `/de/weinbibliothek/rebsorten/muscadet`.
- Commit funcional creado y pusheado: `ad89889 feat: expand priority grape editorial profiles`.
- Lovable `Web Winerim` sincronizo `ad89889` desde GitHub `main`.
- Lovable desplego Supabase Edge Function `prerender` para el commit `ad89889`.
- Lovable quedo en estado `Up to date` tras pulsar `Update` en el panel de publish.
- Produccion validada como Googlebot:
  - `https://winerim.wine/pt/biblioteca-vinho/castas/graciano?codex=ad89889`: `200`, `X-Worker-Branch: bot-prerender`, `x-prerendered: true`, canonical propio, `html lang="pt"`, 421 palabras, contenido editorial y sin fallback visible.
  - `https://winerim.wine/de/weinbibliothek/rebsorten/muscadet?codex=ad89889`: `200`, `X-Worker-Branch: bot-prerender`, `x-prerendered: true`, canonical propio, `html lang="de"`, 366 palabras, contenido editorial y sin fallback visible.
- Produccion validada en navegador humano:
  - `/pt/biblioteca-vinho/castas/graciano` muestra `Inteligencia de servico`, `Papel na carta`, maridaje `borrego assado`, canonical propio y no muestra `Como usar Graciano numa carta real`.
  - `/de/weinbibliothek/rebsorten/muscadet` muestra `Service-Intelligenz`, `Rolle auf der Karte`, maridaje de mar, canonical propio y no muestra fallback.
- En la experiencia humana alemana, la ruta `/de/weinbibliothek/rebsorten/muscadet` muestra H1 `Melon de Bourgogne` porque el catalogo trata `Muscadet` como sinonimo/nombre comercial de la uva.
- No se modifico Cloudflare Worker.
- No se modifico base de datos.

## Decisiones

- Convertir primero 10 uvas de alto valor SEO/comercial que todavia dependian del fallback visible.
- Mantener la cuarta tanda como perfiles humanos especificos en React y como perfiles expandidos en `prerender`, evitando que bots reciban una pagina menos rica que usuarios.
- Publicar frontend y `prerender` desde Lovable, porque sigue siendo la via operativa real del proyecto.
- No tocar Cloudflare Worker ni base de datos porque el cambio pertenece a frontend y Edge Function `prerender`.

## Hipotesis

- Esta tanda mejora cobertura internacional para busquedas de descubrimiento, blancos de mar y tintos premium menos obvios.
- La combinacion de perfil humano propio y prerender editorial deberia reducir dependencia del fallback y aumentar calidad percibida por usuarios, Googlebot y LLMs.
- `Muscadet` puede requerir una decision editorial posterior para separar mejor la lectura de uva `Melon de Bourgogne` frente a region `Muscadet`.

## Tareas pendientes

- Continuar convirtiendo entidades de alto valor que aun usan fallback visible, especialmente regiones y maridajes con demanda comercial.
- Revisar schema especifico de fichas de uva para reflejar mejor entidad, sinonimos, paises, estilos y FAQs.
- Revisar naming y enlaces internos de `muscadet` para evitar confusion entre casta/sinonimo y region.
- Revalidar una muestra mayor de las 40 uvas prioritarias en produccion cuando cache y Search Console hayan recirculado.
- Monitorizar Search Console para ver si baja `Descubierta: actualmente sin indexar` y si estas fichas empiezan a recibir rastreo.

## Actualizacion 2026-06-08: profundidad visible fallback en biblioteca del vino

## Hechos

- Se trabajo sobre `main` en `/Users/GOIKO/seo-migration-master`.
- Se leyeron al inicio `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- Se implemento `src/components/biblioteca/WineLibraryOperationalDepth.tsx`.
- La nueva capa visible aparece solo cuando una entidad no tiene perfil editorial especifico y cubre:
  - lectura de cliente;
  - argumento de sala;
  - papel en carta;
  - siguiente paso y CTA a demo.
- La capa esta localizada para `es`, `en`, `it`, `fr`, `de` y `pt`.
- Se integro como fallback en:
  - `src/pages/GrapeDetail.tsx`;
  - `src/pages/RegionDetail.tsx`;
  - `src/pages/StyleDetail.tsx`;
  - `src/pages/PairingDetail.tsx`.
- Las fichas prioritarias con perfil editorial siguen mostrando su bloque especifico y no duplican el fallback.
- Se corrigio una prueba que usaba una ruta portuguesa artificial `/pt/biblioteca-vinho/uvas/...`; la ruta real de produccion es `/pt/biblioteca-vinho/castas/...`.
- Se anadio cobertura en `src/test/grape-detail-render.test.tsx` para una ficha sin perfil editorial especifico: Airen en portugues.
- Validaciones locales completadas:
  - `npm test -- --run`: 9 archivos, 48 tests.
  - `npm run build`.
  - `git diff --check`.
  - Navegador local en `/pt/biblioteca-vinho/castas/airen`: bloque `Como usar Airén numa carta real`, tres tarjetas, texto fallback y CTA `/pt/demo`.
- Commit funcional creado y pusheado: `31354ef feat: add visible wine library depth fallback`.
- Lovable `Web Winerim` publico el commit y quedo en estado `Up to date`.
- Produccion validada tras publish:
  - `https://winerim.wine/pt/biblioteca-vinho/castas/airen?codex_visible_depth=31354ef` muestra `Airén`, `Como usar Airén numa carta real`, las tres tarjetas localizadas y CTA `/pt/demo`.
  - `https://winerim.wine/de/weinbibliothek/rebsorten/tempranillo?codex_visible_depth=31354ef` mantiene `Service-Intelligenz` y no muestra el fallback operacional.
- No se modifico Cloudflare Worker.
- No se modifico base de datos.
- No se desplegaron Edge Functions Supabase para este cambio, porque el cambio es frontend humano.

## Decisiones

- Añadir profundidad visible humana para entidades no prioritarias sin sustituir los perfiles editoriales especificos ya existentes.
- Usar un componente comun para uvas, regiones, estilos y maridajes, en vez de duplicar copy y UI en cada pagina.
- Mantener el CTA a demo dentro del bloque porque conecta la consulta informacional con la accion comercial de Winerim.
- Corregir pruebas para usar rutas localizadas reales, especialmente portugues `castas`, y evitar validaciones que solo pasen por rutas artificiales de test.
- Publicar desde Lovable tras push a `origin/main`, porque sigue siendo la via operativa del frontend de Winerim.

## Hipotesis

- Las fichas no prioritarias ganaran mejor utilidad humana, mas profundidad semantica y mejores rutas de conversion sin inflar las fichas prioritarias.
- Este fallback reduce el hueco entre entidades con perfil editorial avanzado y entidades de catalogo, pero no sustituye la escritura editorial propia de entidades de alto valor.
- La siguiente mejora de maximo nivel debe ampliar perfiles especificos por demanda SEO/comercial y seguir reforzando enlaces contextuales entre biblioteca, blog, herramientas y demo.

## Tareas pendientes

- Revalidar una muestra mas amplia de produccion cuando el cache y Search Console hayan recirculado.
- Escalar perfiles editoriales propios para las entidades con mas demanda o valor comercial que todavia dependen del fallback.
- Revisar schema especifico por tipo de entidad para no quedarse solo en profundidad visual.
- Mantener vigilancia de rutas localizadas reales en tests, especialmente `pt/castas`, `de/rebsorten`, `fr/cepages`, `it/vitigni`.
- Contradiccion documental detectada: secciones historicas de `CURRENT_STATE.md` siguen describiendo una fase antigua de 10 uvas, mientras `PROJECT_CONTEXT.md` documenta la expansion actual de 30 uvas, 22 regiones, 15 estilos y 18 maridajes. Se conserva el historico, pero el estado vigente es esta actualizacion y `PROJECT_CONTEXT.md`.

## Actualizacion 2026-06-08: Search Console, prerender y biblioteca del vino

## Hechos

- Se trabajo sobre `main` en `/Users/GOIKO/seo-migration-master`.
- Search Console mostraba la familia `Descubierta: actualmente sin indexar` con 1.930 URLs, validacion iniciada el 2026-06-06 y datos todavia fechados el 2026-05-29.
- De 1.000 URLs visibles extraidas de Search Console:
  - 761 correspondian a biblioteca del vino.
  - 154 eran articulos legacy con sufijos `/article/{slug}_{lang}`.
  - 36 eran articulos canonicos `/article/{slug}`.
  - 49 eran otras rutas estaticas/localizadas/herramientas.
- Las 49 rutas no-biblioteca estaban tecnicamente correctas en produccion antes del cambio (`200`, `bot-prerender`, canonical propio, sin `noindex`), pero todas eran finas: menos de 300 palabras visibles.
- Se implemento `withStaticDepthSections` en `supabase/functions/prerender/index.ts`.
- El commit `3932aa0 fix: deepen static prerender pages` se pusheo a `main` y se desplego desde Lovable en el proyecto correcto `Web Winerim`.
- Produccion validada tras `3932aa0`:
  - 49/49 rutas no-biblioteca pasan.
  - 0 fallos.
  - minimo 302 palabras.
  - mediana 374 palabras.
  - `200`, `X-Worker-Branch: bot-prerender`, `x-prerendered: true`, canonical propio e idioma correcto.
- Se audito una muestra profunda de 68 URLs de biblioteca del vino en produccion antes del segundo cambio.
- La biblioteca estaba tecnicamente correcta (`200`, prerender, canonical, `lang`, schema y hreflang), pero corta editorialmente:
  - muestra de 68 URLs: minimo 147 palabras, mediana 203, maximo 287.
  - todas las 68 URLs de la muestra estaban por debajo de 300 palabras.
- Se implemento `withWineLibraryDepthSections` en `supabase/functions/prerender/index.ts`.
- El bloque de biblioteca solo se activa en rutas de biblioteca y solo si el cuerpo actual queda por debajo de 340 palabras.
- El bloque nuevo anade secciones localizadas para `es`, `en`, `it`, `fr`, `de` y `pt`: uso en carta real, claves de servicio/venta, datos para priorizar, comparaciones utiles y siguiente accion.
- El commit `5aa5b1c fix: deepen wine library prerender pages` se pusheo a `main` y se desplego desde Lovable.
- Validacion local tras `5aa5b1c`:
  - 761/761 URLs visibles de biblioteca del vino pasan.
  - 0 fallos.
  - minimo 317 palabras.
  - p10 362, mediana 422, p90 474, maximo 543.
  - canonical propio, `lang` esperado, schema presente, hreflang completo y sin `noindex`.
- Produccion validada tras despliegue de `5aa5b1c`:
  - 761/761 URLs visibles de biblioteca del vino pasan.
  - 0 fallos.
  - minimo 317 palabras.
  - p10 362, mediana 422, p90 474, maximo 543.
  - `200`, `X-Worker-Branch: bot-prerender`, `x-prerendered: true`, canonical propio, `lang` esperado, schema presente, hreflang completo y sin `noindex`.
- Verificaciones ejecutadas:
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts`.
  - `npm run test -- --run`: 9 archivos, 47 tests.
  - `git diff --check`.
  - Validaciones locales y de produccion como Googlebot.
- No se modifico Cloudflare Worker.
- No se modifico base de datos.
- Se uso Lovable como via de despliegue de la Edge Function `prerender`.

## Decisiones

- Tratar las paginas tecnicamente correctas pero finas como problema de calidad para indexacion, aunque no sean errores HTTP/canonical.
- Mejorar primero el HTML de prerender para bots en rutas ya indexables, sin cambiar UI humana ni crear nuevas rutas.
- Mantener Cloudflare Worker fuera de estos dos bloques porque no habia cambio de proxy, redirects ni verificacion.
- Para biblioteca del vino, no sustituir los perfiles editoriales prioritarios ya existentes: el nuevo bloque es una capa complementaria para entidades y hubs que quedaban demasiado compactos.
- Usar un umbral interno de 340 palabras para activar la profundidad de biblioteca, dejando intactas las paginas que ya superen ese cuerpo.
- Validar siempre en produccion como Googlebot antes de tratar un cambio de prerender como cerrado.

## Hipotesis

- El aumento de cuerpo textual en prerender deberia ayudar a que Google reevalúe parte de las URLs en `Descubierta: actualmente sin indexar`, pero Search Console puede tardar dias o semanas en reflejarlo.
- El impacto sera mayor en rutas que ya tenian buenas senales tecnicas y estaban bloqueadas por baja profundidad o baja prioridad de rastreo.
- Para competir al maximo nivel, la siguiente capa debe llevar mas contenido editorial visible tambien a usuarios humanos, no solo al HTML de bots.
- La biblioteca ganara autoridad adicional si se refuerza con enlaces contextuales desde blog, guias, herramientas y casos por pais.

## Tareas pendientes

- Monitorizar en Search Console la validacion iniciada el 2026-06-06 para `Descubierta: actualmente sin indexar`.
- Reintentar solicitud de indexacion selectiva para un grupo corto de hubs y entidades maduras cuando Search Console lo permita.
- Auditar de nuevo cuando Search Console actualice datos posteriores al 2026-06-08.
- Revisar el bloque de 154 articulos legacy con sufijos y confirmar que Google reciba las redirecciones/canonicals esperadas tras recrawl.
- Seguir ampliando biblioteca del vino al maximo nivel con contenido visible por entidad, no solo prerender:
  - mas perfiles propios de uvas, regiones, estilos y maridajes.
  - mejores enlaces cruzados uva -> region -> estilo -> maridaje -> guia.
  - schema mas especifico por tipo de entidad cuando encaje.
  - clusters de blog por pais e idioma conectados a entidades maduras.

## Hechos

- Fecha de actualización: 2026-06-08.
- Repositorio de trabajo: `/Users/GOIKO/seo-migration-master`.
- Rama activa: `main`.
- PR `https://github.com/goiko111/seo-migration-master/pull/1` fusionado el 2026-05-23.
- Merge commit base de la ampliación `de`/`pt`: `30e9a95f592ba1c3607c0b385a2711e783bcc525`.
- El cierre técnico de despliegue previo quedó committeado y pusheado en `main` con `e009927`.
- El bloque editorial avanzado de biblioteca del vino quedó committeado y pusheado en `main` con `e3eab53 feat: enrich wine library editorial profiles`.
- Producción quedó validada en el bloque anterior:
  - `https://winerim.wine/de/weinbibliothek` responde HTTP 200.
  - `https://winerim.wine/pt/biblioteca-vinho` responde HTTP 200.
  - `https://winerim.wine/sitemap.xml` lista rutas `de` y `pt` de biblioteca.
  - Googlebot en Tempranillo alemán y portugués recibe HTML prerenderizado con canonical/hreflang correctos.
- Producción ya muestra el bloque editorial enriquecido para Googlebot en fichas prioritarias probadas:
  - `/de/weinbibliothek/rebsorten/tempranillo` contiene secciones de rol en carta, servicio recomendado, guion de sala y errores a evitar.
  - `/pt/biblioteca-vinho/castas/albarino` responde con prerender específico de ficha.
- Proyecto Lovable operativo: `https://lovable.dev/projects/2c4eed0e-6760-45f0-aeb3-ce44de8e91f1`.
- Para este proyecto, Supabase Edge Functions viven dentro de Lovable y no deben tratarse como despliegue externo por CLI salvo instrucción explícita nueva.
- En esta sesión se implementó el primer bloque editorial avanzado de biblioteca del vino:
  - Nueva capa `src/data/wineLibraryEditorial.ts`.
  - 10 uvas prioritarias con inteligencia de servicio: `tempranillo`, `garnacha`, `albarino`, `verdejo`, `godello`, `chardonnay`, `cabernet-sauvignon`, `pinot-noir`, `sauvignon-blanc`, `riesling`.
  - Contenido localizado para `es`, `en`, `it`, `fr`, `de` y `pt`.
  - Bloques de temperatura, copa, aireación, rol en carta, guion de sala, palanca comercial, error a evitar, maridajes y FAQs.
- `src/pages/GrapeDetail.tsx` ahora muestra el bloque de inteligencia de servicio en fichas completas y fichas de catálogo cuando existe perfil editorial.
- `src/data/grapesLibraryI18n.ts` se corrigió para resolver uvas completas por `slug`; antes podía recibir un string y devolver datos rotos en páginas de detalle.
- `src/data/grapesLibraryI18n.ts` ahora evita fugas de narrativa española en fichas localizadas:
  - Si falta traducción profunda, genera fallback narrativo localizado.
  - Traduce países principales.
  - Añade SEO fallback para fichas de catálogo.
- `src/pages/GrapeDetail.tsx` localiza etiquetas y tooltips de rol en carta.
- `supabase/functions/prerender/index.ts` ahora incluye contenido editorial enriquecido para bots en las mismas 10 uvas prioritarias y en los seis idiomas de la biblioteca.
- En esta sesión se realizó una auditoría SEO pública de producción como Googlebot antes de seguir ampliando biblioteca del vino.
- Informe creado: `src/seo/SEO_PRODUCTION_AUDIT_2026-05-23.md`.
- Se realizó una segunda auditoría de contenido, SEO semántico y posicionamiento en LLMs.
- Informe creado: `src/seo/CONTENT_LLM_AUDIT_2026-05-23.md`.
- Resultados de la auditoría pública:
  - Sitemap con 2.989 URLs únicas.
  - 2.455 URLs HTTP 200.
  - 534 URLs del sitemap devuelven HTTP 404.
  - 2.333 URLs reciben `bot-prerender`.
  - 122 URLs reciben `bot-fallback` y HTML genérico.
  - 156 URLs tienen hreflang esperado en sitemap ausente en HTML prerenderizado.
  - 276 URLs HTTP 200 canonicalizan a una URL distinta de la enviada en sitemap.
  - `robots.txt` anuncia `llms.txt` como `Sitemap`, aunque `llms.txt` es `text/plain` y no XML.
- La biblioteca del vino en rutas nuevas no presenta 404 en sitemap: 1.470 URLs auditadas y 1.470 HTTP 200.
- Se detectaron 96 legacy shortcuts de biblioteca con títulos/H1 genéricos, 16 por idioma, por ejemplo `/biblioteca-vino/borgona` y `/en/wine-library/borgona`.
- Hallazgos de contenido/LLM:
  - 128 rutas localizadas estáticas entregan a bots la home española con canonical a `/`, por ejemplo `/en/pricing`, `/de/preise` y `/pt/precos`.
  - 320 artículos internacionales con sufijos `_en`, `_it`, `_fr`, `_de` y `_pt` declaran `html lang="es"` porque el prerender de artículos fija `lang: 'es'`.
  - La biblioteca nueva está limpia técnicamente, pero aún es poco profunda para máxima competencia informacional: media de 185 palabras y 27 páginas por debajo de 120 palabras.
  - `llms.txt` existe, pero es demasiado superficial: no lista páginas prioritarias, no agrupa contenido por intención y no existe `llms-full.txt`.
  - `robots.txt` permite crawlers de IA relevantes: `GPTBot`, `ChatGPT-User`, `Google-Extended`, `ClaudeBot`, `PerplexityBot` y `Cohere-AI`.
  - El subdominio `https://analisis.winerim.wine/` está indexable, tiene título `winerim-analisis`, no canonical visible y HTML inicial muy pobre.
  - Búsqueda pública muestra menciones externas útiles de Winerim en TecnoVino y F6S.
- Se detectó una contradicción documental: `CURRENT_STATE.md` y `NEXT_STEPS.md` seguían marcando como pendiente el commit/push del bloque editorial, pero el repo ya estaba en `e3eab53`.
- Tras las auditorías, se implementó en el repo el primer bloque de correcciones SEO/LLM:
  - `public/robots.txt` ya no declara `https://winerim.wine/llms.txt` como `Sitemap`.
  - `public/llms.txt` se rehizo como mapa curado para IA/LLMs con páginas prioritarias, temas principales y biblioteca del vino.
  - Se creó `public/llms-full.txt` con referencia extendida de entidad, producto, audiencia, hubs de contenido, herramientas y guías.
  - `supabase/functions/sitemap/index.ts` excluye del sitemap familias de `seo_pages` no resolubles que producían 534 URLs 404 en la auditoría pública.
  - `supabase/functions/sitemap/index.ts` excluye temporalmente 24 recursos/benchmarks/playbooks que hoy no tienen prerender específico y canonicalizan como contenido genérico.
  - `supabase/functions/prerender/index.ts` renderiza rutas estáticas localizadas `en`, `it`, `fr`, `de` y `pt` con idioma, canonical y hreflang propios en vez de caer a la home española.
  - Las páginas estáticas españolas principales ahora emiten hreflang completo incluyendo `de` y `pt` cuando tienen ruta localizada.
  - `renderArticle` infiere idioma desde sufijos `_en`, `_it`, `_fr`, `_de` y `_pt` y deja de marcar todos los artículos internacionales como `html lang="es"`.
- Verificación local del bloque SEO/LLM:
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`.
  - `npm run build`.
  - `npm run test`: 5 archivos, 15 tests.
  - `git diff --check`.
  - Prueba local como Googlebot: `/en/pricing` entrega `html lang="en"`, canonical `https://winerim.wine/en/pricing` y hreflang.
  - Prueba local como Googlebot: `/de/preise` entrega `html lang="de"` y canonical `https://winerim.wine/de/preise`.
  - Prueba local como Googlebot: `/precios` conserva contenido español y ahora incluye alternates `de` y `pt`.
- Estas correcciones SEO/LLM están implementadas localmente, pero aún no se han desplegado ni revalidado en producción.
- En esta sesión se avanzó con Search Console:
  - Se verificó la propiedad URL-prefix `https://winerim.wine/` con la cuenta `gugocreative@gmail.com`.
  - La propiedad de dominio `sc-domain:winerim.wine` seguía sin acceso con esa cuenta.
  - Se creó `public/google0be715f4ef205b3d.html`.
  - Se añadió una ruta de verificación al Cloudflare Worker para `/google0be715f4ef205b3d.html`.
  - Se desplegó Cloudflare Worker `winerim-proxy` para servir la verificación y redirects legacy.
  - Version ID final desplegada: `766e2cdd-da00-4157-8745-1f27c25a03e5`.
  - Informe creado: `src/seo/SEARCH_CONSOLE_AUDIT_2026-05-23.md`.
- Datos reales vistos en Search Console:
  - Rendimiento 3 meses: 664 clics, 8,32 mil impresiones, CTR 8 %, posición media 9,5.
  - 73 páginas indexadas y 1.643 no indexadas.
  - 194 URLs 404, 1.232 descubiertas sin indexar y 111 rastreadas sin indexar.
  - `/sitemap.xml` enviado y correcto con 1.886 páginas descubiertas.
  - `/sitemap_index.xml` sigue enviado desde 2022 y correcto, aunque en producción redirige a `/sitemap.xml`.
  - Core Web Vitals móvil: 7 URLs malas por LCP > 4 s; grupo representativo home con LCP 4,5 s.
  - FAQ schema: 4 elementos no válidos por `FAQPage` duplicado en `/software-carta-de-vinos` y `/como-vender-mas-vino-en-un-restaurante`.
  - Acciones manuales y problemas de seguridad: sin problemas detectados.
  - Enlaces externos totales: 48; enlaces internos totales: 87.
- Correcciones ejecutadas desde Search Console:
  - `/privacy-policy` -> `/privacidad`
  - `/home` -> `/`
  - `/homepage` -> `/`
  - `/alex-pardo` -> `/article/alex-pardo`
  - `/aumenta-la-venta-de-vinos-en-tu-restaurante-mejores-estrategias` -> `/como-vender-mas-vino-en-un-restaurante`
  - `/winerim-vs-wineadvisor-2` -> `/comparativas`
  - `/en/the-importance-of-choosing-the-wine-that-goes-best-with-food` -> `/en/blog`
  - `/clientes/*` -> `/clientes`
  - `/?p=*` -> `/blog`
- Verificaciones locales de esta sesión:
  - `npm run test`: 5 archivos, 15 tests.
  - `npm run build`.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`.
  - `git diff --check`.
  - Navegador local en `/de/weinbibliothek/rebsorten/tempranillo`: bloque `Service-Intelligenz` presente y sin fuga de texto español.
  - Navegador local en `/pt/biblioteca-vinho/castas/albarino`, `/it/biblioteca-vino/vitigni/chardonnay` y `/fr/bibliotheque-vin/cepages/riesling`: bloque editorial presente y sin fuga de texto español detectada.
- Avisos no bloqueantes durante build:
  - `caniuse-lite`/Browserslist desactualizado.
  - Chunks grandes por encima de 200 kB.
- `npm run lint -- --quiet` sigue teniendo deuda global fuera del alcance directo de la biblioteca del vino.
- Lovable sigue mostrando avisos de seguridad/uso que deben revisarse como bloque separado.

## Decisiones

- Mantener Lovable como vía operativa para publicar frontend y Edge Functions Supabase de este proyecto.
- Tratar la paridad frontend/prerender como requisito para biblioteca del vino: lo importante para usuarios también debe estar disponible para bots.
- Priorizar una primera tanda editorial de 10 uvas por impacto SEO y utilidad comercial antes de escalar a 30-50 entidades.
- Añadir fallbacks narrativos localizados cuando una ficha completa no tenga traducción profunda, para no mezclar español en páginas internacionales.
- No mezclar en este bloque la deuda global de lint ni los avisos de seguridad de Lovable.
- No redesplegar Cloudflare Worker para este bloque porque no se modificó la lógica del Worker.
- Antes de seguir escalando contenido, priorizar correcciones SEO técnicas que afectan a indexabilidad: sitemap vs Worker, `bot-fallback`, hreflang/canonical y `robots.txt`.
- Tratar Search Console privada como fuente pendiente de cruce: hace falta acceso a la propiedad o exportaciones para auditar datos internos.
- Tratar el posicionamiento en LLMs como una capa de consistencia de entidad: robots, prerender, idioma, schema, canonicals, contenido citable y menciones externas.
- No escalar masivamente la biblioteca hasta corregir señales que confunden a bots/LLMs.
- Para el primer saneamiento del sitemap, excluir URLs no resolubles es preferible a seguir enviando 404 a Google.
- La exclusión de recursos/benchmarks/playbooks es temporal: esas URLs deben volver al sitemap cuando tengan prerender y canonical propios.
- El prerender estático localizado añadido ahora es una mitigación técnica: corrige idioma/canonical/hreflang, pero no sustituye traducciones editoriales humanas completas por página.
- `llms.txt` debe mantenerse como archivo informativo para IA, no como sitemap XML.
- En el primer bloque SEO/LLM previo no se modificó Cloudflare Worker porque esos cambios afectaban a frontend estático y Edge Functions gestionadas por Lovable.
- Para Search Console se permitió una excepción a la regla de no tocar Worker: era necesario para verificar la propiedad y corregir redirects legacy de alta confianza detectados en GSC.
- No validar corrección de 404 en Search Console todavía, porque solo se corrigió una tanda de ejemplos y no los 194 casos completos.
- No reenviar sitemap todavía, porque los cambios locales de `sitemap` y `prerender` siguen pendientes de despliegue desde Lovable.

## Hipótesis

- La primera tanda de 10 uvas cubre una parte alta de demanda informacional y comercial de la biblioteca.
- El mayor salto SEO siguiente vendrá de ampliar esta profundidad a más uvas, regiones y estilos, no de reabrir rutas/hreflang.
- Los fallbacks localizados mejoran calidad internacional y reducen riesgo de páginas mixtas mientras se escriben traducciones editoriales humanas completas.
- Search Console probablemente reflejará los problemas públicos detectados como URLs enviadas con 404, canónicas inesperadas, páginas duplicadas y posibles incoherencias hreflang.
- El mayor salto inmediato de indexabilidad vendrá de limpiar el sitemap y asegurar prerender específico antes de añadir más URLs.
- Winerim puede estar bien posicionado para consultas de marca y categoría específica, pero las incoherencias de idioma/canonical reducen la probabilidad de ser citado correctamente por LLMs en consultas genéricas.
- Un `llms.txt` curado y un `llms-full.txt` ayudarían a orientar mejor a agentes, aunque no sustituyen robots, schema ni contenido indexable limpio.
- Al desplegar el sitemap corregido deberían desaparecer del sitemap público las 534 URLs 404 detectadas y las 24 URLs estáticas con canonical genérico excluidas temporalmente.
- Corregir idioma/canonical/hreflang en rutas localizadas estáticas debería mejorar comprensión internacional para Googlebot y LLM crawlers, aunque el contenido genérico aún limita la profundidad semántica.
- La caída de impresiones de `/en/pricing` señalada por Search Console probablemente está relacionada con el problema de prerender/canonical localizado ya corregido en local pero pendiente de despliegue.
- El bloque de 1.232 páginas descubiertas sin indexar parece venir de demasiadas URLs internacionales/artículos traducidos con señales débiles o inconsistentes.
- El tráfico orgánico actual depende mucho de marca; el crecimiento no branded exige limpiar indexación, mejorar profundidad, enlazado interno y autoridad externa.

## Tareas pendientes

- Desplegar desde Lovable:
  - Publicar frontend para `robots.txt`, `llms.txt` y `llms-full.txt`.
  - Pedir despliegue explícito de Edge Function `sitemap`.
  - Pedir despliegue explícito de Edge Function `prerender`.
- Revalidar producción tras despliegue:
  - `https://winerim.wine/robots.txt` debe listar solo `https://winerim.wine/sitemap.xml` como sitemap.
  - `https://winerim.wine/llms.txt` y `https://winerim.wine/llms-full.txt` deben responder 200.
  - `https://winerim.wine/sitemap.xml` debe dejar de enviar las familias 404 excluidas.
  - Googlebot en `/en/pricing`, `/de/preise`, `/pt/precos` debe recibir idioma/canonical propios.
  - Googlebot en un artículo con sufijo internacional debe declarar `html lang` correcto.
- Conseguir acceso directo a Search Console o exportaciones de indexación, rendimiento, sitemaps, inspección de URLs y experiencia.
- Reenviar sitemap y validar correcciones en Search Console cuando esté disponible.
- Exportar desde Search Console los ejemplos completos de:
  - 194 URLs 404.
  - 1.232 URLs descubiertas sin indexar.
  - 111 URLs rastreadas sin indexar.
- Completar mapa de redirects legacy por familias, especialmente `/estadisticas/*`, antiguas URLs `/en/.../` y antiguas URLs de clientes.
- Revisar si Search Console permite retirar `/sitemap_index.xml` desde detalle o configuración.
- Corregir `FAQPage` duplicado.
- Optimizar LCP móvil de la home.
- Fortalecer enlaces internos detectables por Google.
- Decidir si las 534 URLs excluidas del sitemap deben:
  - Permanecer fuera del sitemap de forma permanente.
  - Redirigirse a URLs canónicas existentes.
  - Convertirse en páginas reales con routing/prerender propio.
- Corregir 122 URLs `bot-fallback`, especialmente city pages `wine-list-software-*` y `software-carta-de-vinos-*`.
- Crear prerender/canonical específico para recursos, benchmarks y playbooks antes de devolverlos al sitemap.
- Refinar contenido humano de rutas estáticas localizadas: el prerender genérico actual es una capa técnica, no la versión editorial final.
- Definir patrón canónico definitivo para artículos traducidos (`/article/slug_lang` vs rutas localizadas `/en/article/slug`).
- Revisar o noindex/canonicalizar `analisis.winerim.wine` para que no compita con la home ni transmita una señal pobre.
- Hecho: resolver legacy shortcuts de biblioteca del vino con redirects canónicos en Worker de producción.
- Separar una tarea para deuda global de lint.
- Separar una tarea para avisos de seguridad de Lovable.

## Actualización 2026-05-24: continuación Search Console

## Hechos

- Se corrigió localmente el error de Search Console `FAQPage` duplicado:
  - `src/pages/SoftwareCartaVinos.tsx` ya no inyecta un `FAQPage` manual adicional.
  - `src/pages/VenderMasVino.tsx` ya no inyecta un `FAQPage` manual adicional.
  - `src/pages/WhatIsWinerim.tsx` conserva su schema `SoftwareApplication`, pero deja el `FAQPage` únicamente en `FAQSection`.
  - `src/components/seo/FAQSection.tsx` añade títulos por defecto para `de` y `pt`.
- `index.html` usa ahora los IDs `seo-jsonld` y `seo-org-jsonld` en sus JSON-LD estáticos para que `SEOHead` los actualice en vez de crear duplicados.
- Verificación local del arreglo FAQ:
  - `/software-carta-de-vinos`: 1 `FAQPage`, 0 JSON-LD sin ID.
  - `/como-vender-mas-vino-en-un-restaurante`: 1 `FAQPage`, 0 JSON-LD sin ID.
  - `/en/what-is-winerim`: 1 `FAQPage`, 0 JSON-LD sin ID.
- Se añadió redirect directo en `cloudflare-worker-v3-hybrid.js`:
  - `/estadisticas` -> `/benchmarks-playbooks`.
  - `/estadisticas/*` -> `/benchmarks-playbooks`.
- Se ejecutó `npm run build` correctamente.
- Se ejecutó `npm run deploy:worker:dry-run` correctamente.
- Se desplegó Cloudflare Worker `winerim-proxy` con Version ID `4f83ba4a-7994-4cf1-9ec6-d20368b5628b`.
- Verificaciones de producción posteriores al despliegue Worker:
  - `https://winerim.wine/estadisticas/estadisticas-2024-01-28?codex=1` responde 301 a `https://winerim.wine/benchmarks-playbooks`.
  - `https://winerim.wine/google0be715f4ef205b3d.html?codex=1` responde 200 con `X-Worker-Branch: gsc-verification`.
  - `https://winerim.wine/clientes/canabota?codex=1` responde 301 a `https://winerim.wine/clientes`.
  - `https://winerim.wine/sitemap.xml?codex=1` responde 200 con `X-Worker-Branch: sitemap`.
- `npm run deploy:supabase:seo` quedó bloqueado: falta `SUPABASE_ACCESS_TOKEN` o login de Supabase CLI.
- Lovable abierto desde el navegador de Codex redirige a login, por lo que no se pudo publicar frontend ni Edge Functions desde Lovable en esta sesión.
- Las correcciones frontend/SEO de FAQ duplicado, `robots.txt`, `llms.txt`, `llms-full.txt`, `sitemap` y `prerender` siguen pendientes de publicación desde Lovable o de credenciales Supabase.

## Decisiones

- `FAQSection` queda como fuente única de `FAQPage` para páginas que renderizan una sección FAQ visible.
- Las páginas que necesiten schema adicional pueden mantener `SoftwareApplication`, `Article`, `BreadcrumbList` u otros tipos, pero no deben duplicar `FAQPage`.
- Los JSON-LD estáticos de `index.html` deben conservar IDs compatibles con `SEOHead` para funcionar como fallback y no como duplicado.
- La familia legacy `/estadisticas/*` se redirige a `/benchmarks-playbooks` por equivalencia semántica y por aparecer en ejemplos 404 de Search Console.
- No se puede usar Supabase CLI directo sin token/login; el despliegue de `sitemap` y `prerender` debe hacerse desde Lovable autenticado o con `SUPABASE_ACCESS_TOKEN`.
- No pedir validación de FAQ en Search Console hasta que el frontend corregido esté publicado.

## Hipótesis

- Los 4 elementos FAQ inválidos de Search Console deberían desaparecer tras publicar el frontend corregido y esperar recrawl.
- El redirect `/estadisticas/*` reducirá una familia concreta de los 194 404 detectados en Search Console.
- Puede quedar duplicación específica de `SoftwareApplication` en páginas con schema propio adicional, como `WhatIsWinerim`; ya no viene de los JSON-LD genéricos sin ID de `index.html`.

## Tareas pendientes

- Publicar desde Lovable el frontend corregido para que el arreglo de `FAQPage` llegue a producción.
- Desplegar desde Lovable o con token las Edge Functions `sitemap` y `prerender`.
- Revalidar en producción:
  - `FAQPage` único en `/software-carta-de-vinos`.
  - `FAQPage` único en `/como-vender-mas-vino-en-un-restaurante`.
  - `FAQPage` único en `/en/what-is-winerim`.
- Pedir validación en Search Console de FAQ solo tras confirmar producción.
- Continuar mapa de redirects legacy para el resto de 404.
- Revisar si `WhatIsWinerim` debe mantener un `SoftwareApplication` adicional o convertirlo a otro tipo semántico como `AboutPage`.

## Actualización 2026-05-24: commit/push y comprobación de producción

## Hechos

- Se comprobó que `SUPABASE_ACCESS_TOKEN` sigue ausente en el entorno.
- `npm run deploy:supabase:seo` sigue fallando por falta de token o login Supabase CLI.
- Se verificó de nuevo:
  - `npm run test`: 5 archivos, 15 tests.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`.
  - `git diff --check`.
- Se creó el commit `a98e8c6 fix: clean search console seo signals`.
- Se hizo push de `a98e8c6` a `origin/main`.
- Producción todavía no refleja el commit:
  - `https://winerim.wine/robots.txt?codex=a98e8c6` sigue anunciando `Sitemap: https://winerim.wine/llms.txt`.
  - `https://winerim.wine/llms-full.txt?codex=a98e8c6` responde 404.

## Actualización 2026-05-24: auditoría profunda de web

## Hechos

- Antes de continuar con biblioteca del vino se ejecutó una revisión profunda de la web a nivel SEO técnico, contenido, LLMs, UX y rendimiento.
- Informe creado: `src/seo/WEB_DEEP_AUDIT_2026-05-24.md`.
- Producción auditada con Googlebot mantiene bien las rutas core ya saneadas: home, `/clientes`, `/biblioteca-vino`, `/en/pricing`, `/de/preise`, `/pt/precos`, `/software-carta-de-vinos`, `/recursos` y `/benchmarks-playbooks`.
- Sitemap público actual: 2.431 URLs.
- Quedan 122 URLs programáticas de ciudad en `bot-fallback`, sobre todo `wine-list-software-*` y `software-carta-de-vinos-*`.
- Las páginas legales localizadas aparecían con contenido/canonical de home para Googlebot, por ejemplo `/en/privacy`.
- Lighthouse mobile medido el 2026-05-24:
  - Home: Performance 58, Accessibility 96, Best Practices 71, SEO 92; LCP 12,9 s, FCP 6,6 s, CLS 0.
  - `/clientes`: Performance 57, Accessibility 93, Best Practices 71, SEO 92; LCP 12,1 s, FCP 7,4 s, CLS 0.
- Lighthouse detectó 404 de red en `https://winerim.wine/~api/analytics`.
- Lighthouse detectó un 404 de logo en producción causado por assets con espacios en el nombre generado, por ejemplo `Mabe%20Jamoneria-*.png`.
- Se implementaron correcciones locales:
  - Las páginas legales tienen `noindex` en frontend.
  - `SEOHead` emite `noindex, follow` cuando el `noindex` es explícito.
  - `prerender` renderiza páginas legales exactas en `es`, `en`, `it`, `fr`, `de` y `pt` con canonical propio y `noindex, follow`.
  - `sitemap` excluye legales y familias programáticas de ciudad sin prerender real.
  - Se sanearon nombres de archivo de logos con espacios/caracteres especiales.
  - `LogoStrip` usa `em-hotels.png`.
- Se desplegó Cloudflare Worker `winerim-proxy` para activar `X-Robots-Tag: noindex, follow` en legales.
- Version ID Worker desplegada: `4cc5425b-cc8d-4de4-a72f-d9370b355426`.
- Producción validada tras Worker:
  - `/en/privacy?codex=legal-noindex` como Googlebot responde 200 con `X-Robots-Tag: noindex, follow`.
  - `/privacidad?codex=legal-noindex` como Googlebot responde 200 con `X-Robots-Tag: noindex, follow`.
- Las correcciones de frontend, sitemap y prerender siguen pendientes de publicación desde Lovable.
- Verificaciones locales completadas:
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`.
  - `npm run build`.
  - `npm run test`: 5 archivos, 15 tests.
  - `git diff --check`.
  - QA local en `/clientes`: 591 imágenes renderizadas.
  - QA local en `/en/privacy`: `Privacy Policy`, canonical `https://winerim.wine/en/privacy`, robots `noindex, follow`.
- Se detectó una contradicción/deuda documental: `src/seo/route-map.ts` sigue sin reflejar plenamente `de`/`pt` y no debe tratarse como fuente única frente a los mapas reales de i18n, sitemap y prerender.

## Decisiones

- Las páginas legales deben estar disponibles para usuarios, pero fuera del sitemap y fuera del índice orgánico.
- Las páginas legales deben ser `noindex, follow`, no `noindex, nofollow`, para no cortar el rastreo de enlaces internos.
- Las city pages programáticas sin prerender específico no deben enviarse a Google hasta tener contenido/canonical/H1 propios.
- Los assets públicos de logos no deben tener espacios ni caracteres especiales en el basename.
- Mantener Lighthouse y Search Console como fuente de priorización para el siguiente bloque de performance.

## Hipótesis

- El problema principal de rendimiento móvil viene de JavaScript inicial, imágenes sobredimensionadas y DOM grande, no del tiempo de respuesta del documento.
- Al publicar desde Lovable el sitemap saneado, Search Console debería recibir menos URLs con canonical inesperada o contenido genérico.
- Resolver `~api/analytics` debería limpiar errores de consola y mejorar Best Practices.
- Las city pages pueden ser útiles como landings reales por mercado, pero hoy son riesgo de contenido fino/duplicado.

## Tareas pendientes

- Publicar desde Lovable frontend y Edge Functions `sitemap`/`prerender`.
- Revalidar producción tras Lovable:
  - `/sitemap.xml` no debe listar legales ni city pages fallback.
  - Googlebot en `/en/privacy` debe recibir `Privacy Policy`, canonical propio y `noindex, follow`.
  - `/clientes` no debe generar 404 por assets con espacios.
- Resolver o desactivar la llamada a `~api/analytics`.
- Abrir bloque P1 de Core Web Vitals: LCP home y `/clientes`, JS inicial, imágenes responsivas y DOM de logos.
- Decidir destino final de city pages: contenido real, redirect o noindex.
- Unificar o degradar explícitamente `src/seo/route-map.ts` para evitar contradicciones futuras.
  - Googlebot en `https://winerim.wine/en/pricing?codex=a98e8c6` sigue recibiendo `html lang="es"` y canonical `https://winerim.wine`.
- Lovable sigue redirigiendo a login en el navegador de Codex: `https://lovable.dev/login?redirect=%2Fprojects%2F2c4eed0e-6760-45f0-aeb3-ce44de8e91f1`.

## Decisiones

- Mantener `a98e8c6` como commit de referencia del bloque Search Console/SEO.
- No considerar desplegadas las correcciones frontend/Edge Functions hasta que producción cambie en las verificaciones públicas.
- Para continuar sin token Supabase, hace falta iniciar sesión en Lovable dentro del navegador de Codex o publicar manualmente desde Lovable.

## Hipótesis

- Lovable no está auto-publicando desde `origin/main`, o todavía requiere una acción manual de sync/publish.
- Una vez Lovable publique el commit, `robots.txt`, `llms-full.txt` y el arreglo FAQ deberían aparecer en producción; `sitemap`/`prerender` requerirán además despliegue de Edge Functions.

## Tareas pendientes

- Iniciar sesión en Lovable en la ventana de Codex y publicar el proyecto.
- Confirmar si Lovable permite desplegar explícitamente las Edge Functions `sitemap` y `prerender`.
- Revalidar producción tras publish:
  - `robots.txt` sin `llms.txt` como sitemap.
  - `llms-full.txt` con HTTP 200.
  - `/en/pricing`, `/de/preise` y `/pt/precos` como Googlebot con idioma/canonical propios.
  - `FAQPage` único en las páginas afectadas.

## Actualización 2026-05-24: producción validada tras Lovable

## Hechos

- El usuario publicó desde Lovable.
- No se redesplegó Cloudflare Worker porque las rutas dependientes del Worker ya respondían correctamente.
- Producción refleja el frontend publicado:
  - `https://winerim.wine/robots.txt?codex=postlovable` ya solo declara `Sitemap: https://winerim.wine/sitemap.xml`.
  - `https://winerim.wine/llms-full.txt?codex=postlovable` responde HTTP 200.
- Producción refleja `prerender` localizado:
  - Googlebot en `/en/pricing` recibe `html lang="en"`, canonical `https://winerim.wine/en/pricing` y hreflang `es/en/de/pt/x-default`.
  - Googlebot en `/de/preise` recibe `html lang="de"` y canonical `https://winerim.wine/de/preise`.
  - Googlebot en `/pt/precos` recibe `html lang="pt"` y canonical `https://winerim.wine/pt/precos`.
  - Googlebot en `/article/alex-pardo_en` recibe `html lang="en"` e `inLanguage: "en"`.
- Producción refleja el sitemap saneado:
  - `https://winerim.wine/sitemap.xml?codex=postlovable2` contiene 2.431 URLs.
  - El sitemap ya no incluye `llms.txt`.
  - El sitemap ya no incluye las familias `grape/` ni `uva/`.
  - El sitemap ya no incluye el ejemplo temporalmente excluido `/benchmarks-playbooks/playbook-mejorar-rotacion`.
  - El sitemap sí incluye `/en/pricing` y `/de/preise`.
- Producción mantiene Worker correcto:
  - `/estadisticas/estadisticas-2024-01-28?codex=postlovable` responde 301 a `/benchmarks-playbooks`.
  - `/google0be715f4ef205b3d.html?codex=postlovable2` responde 200 con `X-Worker-Branch: gsc-verification`.
- Producción renderizada en navegador confirma `FAQPage` único:
  - `/software-carta-de-vinos`: 1 `FAQPage`, 0 JSON-LD sin ID.
  - `/como-vender-mas-vino-en-un-restaurante`: 1 `FAQPage`, 0 JSON-LD sin ID.
  - `/en/what-is-winerim`: 1 `FAQPage`, 0 JSON-LD sin ID.

## Decisiones

- No desplegar Worker cuando la lógica desplegada ya coincide con las verificaciones públicas.
- Considerar cerrado el despliegue técnico del bloque `robots`/`llms`/`sitemap`/`prerender`/FAQ.
- El siguiente paso en Search Console ya puede ser reenviar `/sitemap.xml` y pedir validaciones de corrección.

## Hipótesis

- Google tardará días en reflejar la reducción de URLs no indexadas y la corrección de FAQ.
- La bajada del sitemap de 2.989 a 2.431 URLs debería reducir ruido de 404 y páginas débiles enviadas.
- Las páginas localizadas estáticas deberían empezar a recuperar señales internacionales al dejar de canonicalizar a la home española.

## Tareas pendientes

- Reenviar `https://winerim.wine/sitemap.xml` en Search Console.
- Pedir validación de corrección para FAQ duplicado en Search Console.
- Pedir validación o seguimiento de 404 tras corregir familias completas.
- Exportar ejemplos completos restantes de 404, descubiertas sin indexar y rastreadas sin indexar.
- Continuar con Core Web Vitals móvil, LCP home y fortalecimiento de enlaces internos.

## Actualización 2026-05-24: acciones Search Console post-despliegue

## Hechos

- Al iniciar esta continuación se releyeron `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- En Search Console, `/sitemap.xml` aparece enviado el 24 may 2026, leído el 24 may 2026, con estado `Correcto`, 2.431 páginas descubiertas y 0 vídeos.
- En Search Console, `/sitemap_index.xml` sigue listado desde el 22 dic 2022, leído por última vez el 18 may 2026, con estado `Correcto` y 1.358 páginas descubiertas.
- Se pidió la validación de corrección del problema `El campo "FAQPage" está duplicado`.
- Search Console dejó la validación FAQ en estado `Iniciada`, con fecha de inicio 24/5/26.
- Se inspeccionó `https://winerim.wine/software-carta-de-vinos` en Search Console:
  - Estado: `La URL está en Google`.
  - Indexación de páginas: `La página está indexada`.
  - HTTPS: válido.
  - Rutas de exploración: 1 elemento válido.
  - Preguntas frecuentes: 1 elemento válido.
- Se intentó solicitar indexación/reindexación de `https://winerim.wine/software-carta-de-vinos`.
- Search Console devolvió error al enviar la solicitud de indexación: `Se ha producido un problema al enviar la solicitud de indexación. Vuelve a intentarlo más tarde.`

## Decisiones

- No hacer indexación manual masiva: usar la herramienta de inspección solo para una tanda corta de URLs estratégicas.
- No insistir repetidamente con `Solicitar indexación` mientras Search Console devuelva error temporal.
- Mantener `/sitemap_index.xml` como pendiente de revisión, sin retirarlo a ciegas mientras la UI no ofrezca una acción clara.
- Considerar que el paso manual prioritario de Search Console para FAQ ya está hecho: la validación quedó iniciada.

## Hipótesis

- La validación FAQ puede tardar días en completarse aunque la inspección de URL ya detecte 1 FAQ válido.
- El error de solicitud de indexación parece temporal o propio de Search Console, no un bloqueo técnico de Winerim, porque la URL inspeccionada está indexada y con mejoras válidas.
- El nuevo sitemap de 2.431 URLs debería empezar a sustituir la lectura antigua del sitemap cuando Google recalcule cobertura.

## Tareas pendientes

- Monitorizar la validación FAQ iniciada el 24/5/26.
- Reintentar solicitud de indexación más tarde solo para URLs estratégicas:
  - `https://winerim.wine/software-carta-de-vinos`
  - `https://winerim.wine/como-vender-mas-vino-en-un-restaurante`
  - `https://winerim.wine/en/pricing`
  - `https://winerim.wine/de/preise`
  - `https://winerim.wine/pt/precos`
  - `https://winerim.wine/biblioteca-vino`
  - `https://winerim.wine/en/wine-library`
  - `https://winerim.wine/de/weinbibliothek`
  - `https://winerim.wine/pt/biblioteca-vinho`
- Revisar más adelante si Search Console permite retirar `/sitemap_index.xml` sin afectar al sitemap activo.
- No validar 404 todavía hasta completar familias de redirects o destinos canónicos.

## Actualización 2026-05-24: actualización de logos home/clientes

## Hechos

- Al iniciar este bloque se releyeron `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- El usuario pidió actualizar logos antes de continuar con Search Console/biblioteca del vino.
- Se recibieron dos paquetes de assets:
  - `Hoteles_Blancos_1024.zip` con 8 logos de grupos hoteleros.
  - `Logos_Blancos_white_1024.zip` con 589 logos de clientes.
- Los assets se incorporaron al repo en:
  - `src/assets/logos/hotels-white/`
  - `src/assets/logos/clients-white/`
- Los PNG originales de 1024 px se redujeron a 360 px de lado para limitar peso:
  - Hoteles: 228 KB.
  - Clientes: 18 MB.
- `src/components/LogoStrip.tsx` usa ahora los 8 logos blancos de hoteles para la sección de home.
- `src/pages/Clientes.tsx` deja de depender de la tabla `restaurants` de Supabase para pintar la galería principal y usa los 589 logos estáticos optimizados.
- En `/clientes`, la galería prioriza logos de España primero y mantiene nombre/ubicación como `aria-label`/`title`.
- Verificación local:
  - `npm run build` completado correctamente.
  - `npm run test`: 5 archivos, 15 tests.
  - `git diff --check` sin errores.
  - Navegador local en home: los 8 logos de hoteles cargan con dimensiones válidas.
  - Navegador local en `/clientes`: 589 logos detectados y sin imágenes rotas en la muestra cargada.
- El bloque base de logos quedó commiteado y pusheado en `main` con `c7adcfe feat: update hotel and client logos`.
- Avisos no bloqueantes:
  - Browserslist/caniuse-lite sigue desactualizado.
  - Persisten avisos de chunks grandes durante build.

## Decisiones

- Usar assets estáticos versionados para la galería pública de `/clientes`, evitando que la página dependa de datos incompletos o antiguos de Supabase.
- Mantener los logos de clientes como PNG optimizados porque el entorno local no soporta conversión WebP vía `sips`.
- Tras feedback del usuario, mostrar nombres visibles de clientes bajo cada logo en `/clientes`; mantener ubicación como apoyo visual y metadata accesible.
- No tocar SEO técnico, Worker, sitemap, prerender ni Search Console en este bloque.

## Hipótesis

- El peso añadido de 18 MB queda contenido porque las imágenes son lazy-loaded y la ruta `/clientes` no está en la home.
- La galería estática dará una señal de prueba social más completa y fiable que la dependencia actual de Supabase.
- Puede convenir en un bloque posterior crear un manifest editorial con nombres comerciales normalizados si se quieren mostrar textos visibles por cliente.

## Tareas pendientes

- Hecho: commit y push de la actualización base de logos con `c7adcfe`.
- Publicar desde Lovable para que home y `/clientes` reflejen los nuevos assets.
- Revalidar producción:
  - Home: sección `Grupos hoteleros` con los 8 logos nuevos.
  - `/clientes`: galería de 589 logos cargando sin rotos.
- Valorar más adelante si conviene convertir los logos a WebP/AVIF con una herramienta de imagen dedicada.

## Actualización 2026-05-24: ajuste visual de logos

## Hechos

- Al iniciar este ajuste se releyeron `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- Se detectó una contradicción documental: `CURRENT_STATE.md` aún marcaba como pendiente el commit/push del bloque base de logos, aunque `c7adcfe` ya estaba pusheado.
- El usuario pidió mantener el nombre escrito de los clientes y hacer más grandes los logos de hoteles en la home.
- `src/pages/Clientes.tsx` vuelve a mostrar texto visible por cliente bajo cada logo.
- `src/pages/Clientes.tsx` muestra también la ubicación como apoyo secundario, limitada en una línea.
- `src/components/LogoStrip.tsx` aumenta el tamaño visual de los logos de hoteles:
  - Antes: imagen `h-8 sm:h-14 md:h-16`.
  - Ahora: imagen `h-16 sm:h-20 md:h-24`.
- No se añadieron nuevos assets.
- Verificación local:
  - `npm run build` completado correctamente.
  - `npm run test`: 5 archivos, 15 tests.
  - `git diff --check` sin errores.
  - Navegador local en `/clientes`: aparecen nombres visibles junto a los logos.
  - Navegador local en home: los 8 logos de hoteles cargan y miden 96 px de alto en viewport desktop local.
- Avisos no bloqueantes:
  - Browserslist/caniuse-lite sigue desactualizado.
  - Persisten avisos de chunks grandes durante build.

## Decisiones

- Mantener nombres visibles de clientes en `/clientes` porque el usuario lo prefiere y mejora reconocimiento comercial.
- Reducir densidad de la galería de clientes de 8 columnas máximas a 6 columnas máximas para dar aire al logo y al nombre.
- Mantener los logos de hoteles sin nombre escrito visible en home, pero con mayor presencia visual.
- No tocar SEO técnico, Worker, sitemap, prerender ni Search Console en este ajuste.

## Hipótesis

- Los nombres visibles debajo de cada logo harán más reconocible la prueba social, aunque algunos nombres generados desde filename puedan requerir normalización editorial futura.
- Aumentar los logos de hoteles mejora la percepción de credibilidad en la home sin cambiar arquitectura ni contenido SEO.

## Tareas pendientes

- Publicar desde Lovable el ajuste visual de logos.
- Revalidar producción:
  - Home: logos de hoteles más grandes.
  - `/clientes`: logos con nombre visible.
- Valorar un manifest editorial de clientes para normalizar nombres comerciales, grupos y ubicaciones.

## Actualización 2026-05-24: rendimiento `/clientes` y analytics noop

## Hechos

- Al retomar se confirmó que producción aún no refleja todo el bloque pendiente de Lovable:
  - `https://winerim.wine/sitemap.xml?codex=01fc2b1` sigue con 2.431 URLs e incluye legales y city pages fallback.
  - `https://winerim.wine/en/privacy?codex=01fc2b1` como Googlebot ya recibe `X-Robots-Tag: noindex, follow` desde Worker, pero el HTML del origen sigue siendo la home/canonical `/`.
- Lovable en el navegador de Codex sigue redirigiendo a login, por lo que no se pudo publicar frontend ni Edge Functions desde esa vía.
- `SUPABASE_ACCESS_TOKEN` sigue ausente en el entorno.
- Se corrigió en Cloudflare Worker el 404 de producción `https://winerim.wine/~api/analytics`.
- Worker desplegado: `winerim-proxy` Version ID `5e984988-b0c1-4fa2-b5f8-dc0e62fabe0f`.
- Verificación de producción:
  - `GET https://winerim.wine/~api/analytics` responde HTTP 204.
  - `OPTIONS https://winerim.wine/~api/analytics` responde HTTP 204.
  - La respuesta incluye `X-Worker-Branch: analytics-noop`, `Cache-Control: no-store` y `X-Robots-Tag: noindex`.
- `src/pages/Clientes.tsx` ahora carga la galería de clientes por tandas:
  - 120 logos iniciales.
  - Botón para cargar 120 logos adicionales por click.
  - Contador localizado en `es`, `en`, `it`, `fr`, `de` y `pt`.
- QA local en `/clientes` móvil:
  - Estado inicial: 120 imágenes de logo.
  - Tras click en `Ver más clientes`: 240 imágenes.
  - Texto inicial: `Mostrando 120 de 589`.
  - Sin errores de consola en la prueba.
- Verificaciones ejecutadas:
  - `npm run build` correcto.
  - `npm run test`: 5 archivos, 15 tests.
  - `git diff --check` correcto.
  - `npm run deploy:worker:dry-run` correcto.
- `npm run lint` falla por deuda global preexistente fuera de los archivos modificados; `src/pages/Clientes.tsx` no aparece entre los errores.

## Decisiones

- Resolver `~api/analytics` en Worker como endpoint noop 204 para eliminar ruido de consola/Lighthouse sin depender del origen Lovable.
- Cambiar `/clientes` de carga total de 589 logos visibles a carga progresiva por tandas para reducir DOM inicial, imágenes iniciales y presión sobre LCP.
- Mantener nombre escrito y ubicación secundaria en cada cliente, respetando la preferencia visual ya fijada por el usuario.
- No mezclar este bloque con corrección global de lint, porque los errores vienen de deuda previa y no del cambio actual.

## Hipótesis

- Reducir la carga inicial de `/clientes` de 589 a 120 logos debería mejorar DOM inicial, coste de layout y LCP móvil.
- El endpoint noop de analytics debería eliminar el 404 detectado por Lighthouse sin afectar SEO ni indexación.
- El mayor salto pendiente sigue dependiendo de publicar desde Lovable los cambios de frontend, `sitemap` y `prerender` ya implementados.

## Tareas pendientes

- Publicar desde Lovable los cambios pendientes de frontend y Edge Functions.
- Tras publish Lovable, revalidar:
  - `/sitemap.xml` sin legales ni city pages fallback.
  - `/en/privacy` como Googlebot con título/canonical propios y `noindex, follow`.
  - `/clientes` en producción con galería progresiva y sin 404 de logos.
- Reenviar `/sitemap.xml` en Search Console solo después de validar producción.
- Reejecutar Lighthouse móvil en home y `/clientes` tras publish para medir el impacto real.
- Abrir bloque específico para Core Web Vitals de home: hero/LCP, JS inicial, bundles e imágenes responsive.

## Actualización 2026-05-24: validación post-deploy Lovable

## Hechos

- El usuario confirmó que hizo el deploy desde Lovable.
- Producción ya refleja el bloque pendiente de frontend, `sitemap` y `prerender`.
- `https://winerim.wine/sitemap.xml?codex=f778db3` contiene 2.072 URLs.
- El sitemap ya no incluye las legales:
  - `/privacidad`
  - `/en/privacy`
  - `/it/privacy`
  - `/fr/confidentialite`
  - `/de/datenschutz`
  - `/pt/privacidade`
- El sitemap ya no incluye las familias fallback de city pages comprobadas:
  - `wine-list-software-*`
  - `software-carta-de-vinos-*`
  - `software-carta-vinhos-*`
- Googlebot recibe prerender legal exacto en los seis idiomas, con `X-Worker-Branch: bot-prerender`, `X-Robots-Tag: noindex, follow`, `meta robots: noindex, follow`, canonical propio e idioma correcto:
  - `/privacidad`: `lang="es"`, canonical `/privacidad`.
  - `/en/privacy`: `lang="en"`, canonical `/en/privacy`.
  - `/it/privacy`: `lang="it"`, canonical `/it/privacy`.
  - `/fr/confidentialite`: `lang="fr"`, canonical `/fr/confidentialite`.
  - `/de/datenschutz`: `lang="de"`, canonical `/de/datenschutz`.
  - `/pt/privacidade`: `lang="pt"`, canonical `/pt/privacidade`.
- `/clientes` en producción ya usa carga progresiva:
  - 120 logos iniciales.
  - Botón `Ver más clientes`.
  - 240 logos tras un click.
  - Texto `Mostrando 120 de 589` y `Mostrando 240 de 589`.
  - Sin errores de consola en QA Playwright.
  - Sin 404 same-origin de assets en la muestra comprobada.
- Home en producción muestra los 8 logos hoteleros nuevos con altura visual de 96 px en viewport desktop y sin fallos same-origin.
- `https://winerim.wine/~api/analytics?codex=f778db3` sigue respondiendo HTTP 204 con `X-Worker-Branch: analytics-noop`.
- Lighthouse mobile post-deploy:
  - Home: Performance 59, Accessibility 96, Best Practices 75, SEO 92, FCP 5,4 s, LCP 11,2 s, Speed Index 6,5 s, TBT 70 ms, DOM 1.370 elementos.
  - `/clientes`: Performance 57, Accessibility 93, Best Practices 75, SEO 85, FCP 5,6 s, LCP 12,3 s, Speed Index 8,6 s, TBT 110 ms, DOM 1.255 elementos.
- Comparado con la auditoría previa, `/clientes` baja de 2.177 a 1.255 elementos DOM y el ahorro potencial por imágenes responsive baja de 927 KB a 240 KB.
- Un run de Lighthouse en `/clientes` marcó `robots.txt is not valid` sin detalles, pero `robots.txt` responde 200, home Lighthouse lo marca válido y el contenido directo es válido con un único sitemap XML.

## Decisiones

- Considerar completado el bloqueo de deploy Lovable para este bloque: sitemap, legales, logos y `/clientes` ya están activos en producción.
- Mantener `~api/analytics` resuelto en Worker como 204.
- No considerar resuelto Core Web Vitals: aunque `/clientes` redujo DOM/peso de imágenes, LCP sigue por encima del objetivo.
- Tratar el aviso puntual de Lighthouse sobre `robots.txt` en `/clientes` como anomalía a vigilar, no como fallo confirmado.

## Hipótesis

- El nuevo sitemap de 2.072 URLs debería reducir ruido de cobertura y URLs descubiertas sin contenido útil en Search Console.
- El noindex legal exacto en seis idiomas debería evitar indexación accidental de páginas legales sin mezclar canonicals con home.
- El cuello de rendimiento ya no está principalmente en los 589 logos de `/clientes`, sino en FCP/LCP inicial, JS no usado, entrega de imágenes, cache TTL y render del primer viewport.

## Tareas pendientes

- Reenviar `/sitemap.xml` en Search Console.
- Reintentar inspección/indexación manual solo para una tanda corta de URLs estratégicas.
- Monitorizar la validación FAQ ya iniciada.
- Abrir bloque Core Web Vitals:
  - Identificar LCP element real en home y `/clientes`.
  - Optimizar JS inicial/no usado.
  - Revisar imágenes responsive y formatos next-gen.
  - Revisar cache TTL de assets.
  - Corregir contraste/enlace sin texto si se aborda accesibilidad.

## Actualización 2026-05-24: Search Console y Core Web Vitals home

## Hechos

- Se continuó la sesión leyendo primero `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- Search Console estaba autenticado con `gugocreative@gmail.com` para la propiedad URL-prefix `https://winerim.wine/`.
- En Search Console se reenvió `https://winerim.wine/sitemap.xml`.
- Search Console mostró el modal `Se ha enviado el sitemap correctamente`.
- Tras cerrar el modal, la tabla seguía mostrando 2.431 páginas descubiertas para `/sitemap.xml`; se espera que cambie solo cuando Google recrawlee.
- Se inspeccionó `https://winerim.wine/software-carta-de-vinos`.
- La solicitud manual de indexación para `https://winerim.wine/software-carta-de-vinos` quedó confirmada por Search Console con el mensaje de cola prioritaria.
- Se intentó una tanda automatizada de inspecciones/indexación para URLs estratégicas, pero el proceso expiró sin salida verificable; no se considera confirmado qué URLs de esa tanda quedaron en cola.
- La inspección de `https://winerim.wine/de/weinbibliothek` mostró `La URL no está en Google`.
- Al solicitar indexación de `https://winerim.wine/de/weinbibliothek`, Search Console quedó bloqueado en `Estamos probando si se puede indexar la URL publicada`; no se considera confirmada la solicitud.
- Se implementó un bloque local de Core Web Vitals para la home:
  - `src/pages/Index.tsx` monta la home bajo el fold después del primer `load`.
  - `src/components/landing/HomeBelowFold.tsx` separa las secciones secundarias de home y su `PageContentProvider`.
  - `src/components/Navbar.tsx` deja de importar `framer-motion` en la navegación inicial.
  - `vite.config.ts` filtra modulepreloads pesados de vendors diferidos.
  - `index.html` carga el widget de chat después del `load` y en idle/fallback diferido.
  - `fetchPriority` camelCase se sustituyó por `fetchpriority` en imágenes hero para evitar avisos React.
- Build local posterior:
  - `dist/index.html` solo pre-carga inicialmente `vendor-react`, `vendor-query` y `vendor-router`.
  - Ya no aparecen como modulepreload inicial `vendor-motion`, `vendor-supabase`, `vendor-charts`, `vendor-radix` ni `vendor-markdown`.
  - El entry local de home queda en torno a 268 kB, frente a unos 300 kB observados antes de este saneamiento.
- Verificaciones ejecutadas:
  - `npm run test`: 5 archivos, 15 tests.
  - `npm run build`.
  - `git diff --check`.
- Commit y push completados:
  - `78135cd feat: expand wine library editorial coverage`.
- Publicación productiva no completada desde esta sesión:
  - Lovable redirige a `https://lovable.dev/login?redirect=%2Fprojects%2F2c4eed0e-6760-45f0-aeb3-ce44de8e91f1`.
  - `SUPABASE_ACCESS_TOKEN` no existe en el entorno local.
  - No se pudo desplegar por CLI ni desde Lovable.
- Revalidación productiva posterior al push:
  - `https://winerim.wine/sitemap.xml` sigue listando shortcuts legacy como `/biblioteca-vino/tempranillo` y `/biblioteca-vino/napa-valley`.
  - Por tanto, la Edge Function `sitemap` nueva aún no está desplegada en producción.
  - La expansión editorial local no debe marcarse como cerrada en producción hasta publicar Lovable y desplegar `sitemap`/`prerender`.
  - Preview local `http://127.0.0.1:4177/`.
  - QA local: H1 de home visible, chunks bajo el fold cargan después del delay, dropdown desktop funciona, menú móvil funciona y submenu móvil de Producto funciona.
- Avisos no bloqueantes durante build:
  - Browserslist/caniuse-lite desactualizado.
  - Chunks grandes por encima de 200 kB.

## Decisiones

- Priorizar Core Web Vitals de home sin cambiar la propuesta visual ni el copy principal.
- Diferir secciones bajo el fold, Footer y chat para reducir competencia con FCP/LCP.
- Mantener `framer-motion` fuera del navbar inicial; las animaciones simples de menú usan clases CSS existentes.
- Normalizar `fetchpriority` en imágenes hero para conservar prioridad de imagen sin avisos React.
- No afirmar que toda la tanda de URLs estratégicas quedó enviada a indexación si Search Console no devolvió confirmación verificable.
- Tratar la indexación manual como refuerzo puntual: el sitemap limpio y el enlazado interno siguen siendo la vía principal.

## Hipótesis

- El grupo móvil de LCP malo de Search Console debería mejorar tras publicar este bloque y esperar datos de CrUX/Search Console.
- La mayor mejora inicial viene de reducir competencia de JS y terceros alrededor del hero, no de cambiar contenido.
- Las URLs de biblioteca alemana/portuguesa pueden tardar más en entrar en índice aunque respondan 200 y estén en sitemap.

## Tareas pendientes

- Commit y push del bloque Core Web Vitals.
- Publicar desde Lovable para que los cambios lleguen a producción.
- Revalidar producción tras publish:
  - `dist` publicado debe conservar preloads iniciales ligeros.
  - Home debe renderizar hero y navegación sin errores.
  - Menú móvil y dropdown desktop deben seguir funcionando.
  - Widget de chat debe aparecer tras carga diferida.
- Reintentar más tarde en Search Console la solicitud de indexación de `https://winerim.wine/de/weinbibliothek`.
- No validar mejora LCP en Search Console hasta que el bloque esté publicado y haya nuevos datos de campo.

## Actualización 2026-05-25: publish previo validado y segundo bloque Core Web Vitals

## Hechos

- Se releyeron los documentos fuente de verdad antes de continuar.
- El usuario confirmó que el bloque anterior ya estaba publicado.
- Producción refleja el commit `553d17c fix: improve home core web vitals`:
  - `https://winerim.wine/` responde 200.
  - Deployment activo: `20fa0919-eb4c-4738-a25d-5bf87c5c1cff`.
  - Entry activo: `/assets/index-D4-5gxc6.js`.
  - Modulepreloads iniciales: `vendor-react`, `vendor-query` y `vendor-router`.
  - No hay preloads iniciales de `vendor-motion`, `vendor-charts`, `vendor-radix` ni `vendor-supabase`.
  - `https://winerim.wine/sitemap.xml` responde 200 con 2.072 URLs y `X-Worker-Branch: sitemap`.
- QA de producción del bloque `553d17c`:
  - Home renderiza 1 H1: `Vende más vino. Mejora márgenes. Controla tu bodega.`
  - Dropdown desktop `Producto` funciona.
  - No se detectaron errores de consola en la prueba de navegador.
- Lighthouse mobile sobre producción publicada seguía sin mejorar de forma material:
  - Performance 60.
  - FCP 5,65 s.
  - LCP 10,97 s.
  - TBT 82 ms.
  - CLS 0,002.
  - DOM 1.371 elementos.
- Se detectó la causa principal de que el primer bloque no bastara:
  - El entry publicado seguía importando estáticamente `vendor-motion` y `vendor-charts`.
  - La causa local era el particionado manual: `react/jsx-runtime` quedaba dentro de `vendor-motion` y utilidades UI (`clsx`, `tailwind-merge`, `class-variance-authority`) podían quedar dentro de chunks pesados como `vendor-charts`.
  - `App.tsx` también envolvía toda la app en un `TooltipProvider` lazy, capaz de suspender el render inicial de la home.
- Se implementó y pusheó el segundo bloque Core Web Vitals:
  - Commit `7cccf3d fix: remove heavy vendors from home startup`.
  - `vite.config.ts` mueve `react/jsx-runtime` y `react/jsx-dev-runtime` a `vendor-react`.
  - `vite.config.ts` crea `vendor-ui-utils` para utilidades UI pequeñas.
  - `src/App.tsx` elimina el `TooltipProvider` lazy global.
  - `src/App.tsx` retrasa toasts, cookie consent, back-to-top, intent tracker y popups hasta después de `load`/idle.
- Verificación local del segundo bloque:
  - `npm run build`: correcto.
  - `npm run test`: 5 archivos, 15 tests.
  - `git diff --check`: correcto.
  - QA navegador en preview local: H1 correcto, dropdown `Producto` correcto y sin errores de consola.
  - Bundle local: entry `/assets/index-DZSHSGuS.js`, sin imports estáticos de `vendor-motion`, `vendor-charts`, `vendor-radix` ni `vendor-supabase`.
  - Preloads locales: `vendor-react`, `vendor-query`, `vendor-router`, `vendor-ui-utils`.
  - Lighthouse mobile local en preview: Performance 96, FCP 1,96 s, LCP 2,26 s, TBT 119,5 ms, CLS 0,005.
- Producción todavía no refleja el cambio de código `7cccf3d`:
  - Sigue sirviendo `/assets/index-D4-5gxc6.js`.
  - Sigue en deployment `20fa0919-eb4c-4738-a25d-5bf87c5c1cff`.
- Desplegar la rama `main` desde Lovable incluye el cambio de código `7cccf3d`, aunque puede haber commits posteriores solo de documentación.

## Decisiones

- Dar por publicado y validado el primer bloque `553d17c`, pero no dar por resuelto Core Web Vitals porque Lighthouse de producción sigue con LCP cercano a 11 s.
- Tratar `7cccf3d` como el bloque real de corrección del arranque pesado de home.
- Mantener `framer-motion`, Recharts, Radix y Supabase fuera del arranque inicial de la home.
- Retrasar chrome no crítico de aplicación hasta después de `load`/idle para proteger FCP/LCP.

## Hipótesis

- Al publicar `7cccf3d` desde Lovable, Lighthouse mobile de home debería acercarse mucho más al resultado local, aunque producción seguirá condicionada por red, Cloudflare, terceros y caché.
- Search Console/Core Web Vitals tardará días o semanas en reflejar datos de campo aunque Lighthouse mejore inmediatamente.
- El siguiente cuello de botella, tras publicar `7cccf3d`, probablemente serán scripts de terceros y CSS render-blocking, no los chunks `motion/charts`.

## Tareas pendientes

- Publicar `main` desde Lovable; el cambio de código relevante es `7cccf3d`.
- Revalidar producción tras publish:
  - Entry debe cambiar desde `/assets/index-D4-5gxc6.js`.
  - No debe haber imports estáticos de `vendor-motion`, `vendor-charts`, `vendor-radix` ni `vendor-supabase` en el entry.
  - Modulepreloads iniciales deben incluir solo vendors esenciales y `vendor-ui-utils`.
  - Dropdown desktop y menú móvil deben seguir funcionando.
  - Lighthouse mobile home debe repetirse en producción.
- Si Lighthouse producción mejora pero sigue insuficiente, abrir bloque específico para terceros: GTM, Google Ads, Meta Pixel y chat.

## Actualización 2026-05-25: revalidación producción tras publish de main

## Hechos

- El usuario confirmó que el deploy de `main` ya estaba hecho desde Lovable.
- Producción ya refleja el bloque de código `7cccf3d`:
  - Deployment activo: `19fcf663-9531-4993-a3a9-4ae480002433`.
  - Entry activo: `/assets/index-Fu3lyPiF.js`.
  - El entry anterior `/assets/index-D4-5gxc6.js` ya no está activo en home.
  - Modulepreloads iniciales: `vendor-react-Dq-5nJUb.js`, `vendor-query-Bp82qg4E.js`, `vendor-router-B4emm9GY.js` y `vendor-ui-utils--BulIq_u.js`.
  - No hay modulepreloads pesados de `vendor-motion`, `vendor-charts`, `vendor-radix`, `vendor-supabase` ni `vendor-markdown`.
  - El entry publicado no contiene imports estáticos de `vendor-motion`, `vendor-charts`, `vendor-radix` ni `vendor-supabase`.
  - El entry publicado mantiene referencias a `vendor-ui-utils`, como se esperaba.
- Sitemap de producción sigue correcto:
  - `https://winerim.wine/sitemap.xml` responde 200.
  - `X-Worker-Branch: sitemap`.
  - 2.072 URLs.
- QA de navegación en producción:
  - Home renderiza el H1 `Vende más vino. Mejora márgenes. Controla tu bodega.`
  - Dropdown desktop `Producto` funciona.
  - No se detectaron errores de consola en la prueba de navegador.
- Lighthouse mobile de producción tras publish:
  - Performance 60.
  - Accessibility 96.
  - Best Practices 75.
  - SEO 92.
  - FCP 5,14 s.
  - LCP 11,38 s.
  - Speed Index 5,91 s.
  - TBT 110,5 ms.
  - CLS 0,002.
  - DOM 1.371 elementos.
- El LCP de producción sigue siendo el H1 de la home.
- Desglose LCP:
  - TTFB 808 ms.
  - Load Delay 0 ms.
  - Load Time 0 ms.
  - Render Delay 10,57 s, 93% del LCP.
- La cadena crítica propia ya es corta:
  - HTML -> `/assets/index-B8X_G7Tz.css`.
  - HTML -> `/assets/index-Fu3lyPiF.js`.
  - Longest chain aprox. 791 ms.
- El CSS `/assets/index-B8X_G7Tz.css` sigue marcado como render-blocking con ahorro estimado de 170 ms.
- Un Lighthouse alternativo bloqueando terceros no mejoró el LCP:
  - Performance 58.
  - FCP 6,72 s.
  - LCP 12,33 s.
  - TBT 26,5 ms.
  - Render Delay 11,50 s.
- Por tanto, los terceros contribuyen a JS no usado/TBT, pero no explican por sí solos el LCP de 11 s tras este deploy.
- Terceros detectados en navegación/Lighthouse: GTM, Google Ads, Meta Pixel, Clarity, Leadfeeder y chat.

## Decisiones

- Dar por correctamente publicado el bloque de bundle `7cccf3d`: el problema de imports estáticos pesados está resuelto en producción.
- No dar por resuelto Core Web Vitals: Lighthouse mobile de producción sigue con LCP alto.
- No volver a atacar `vendor-motion`/`vendor-charts` como causa principal del LCP de home, porque ya no están en el arranque estático.
- El siguiente bloque debe aislar el render delay del H1, especialmente CSS crítico, carga de fuentes, animación/gradient del hero y comportamiento bajo throttling móvil.
- Mantener el bloque de terceros como P1, pero no asumir que por sí solo arreglará el LCP porque la prueba bloqueándolos no mejoró.

## Hipótesis

- El resultado local de Lighthouse 96 vs producción 60 indica que queda una diferencia de entorno/red/throttling y render del primer viewport, no un problema de chunk pesado propio.
- El H1 puede estar recalculando LCP tarde por combinación de fuente externa, `font-heading`, texto con gradient/clip y animación `animate-fade-in-up`.
- Reducir o eliminar animación del H1, precargar/self-hostear fuentes críticas o usar una fuente del sistema para el hero podría mejorar el render delay.
- CSS crítico inline o reducción del CSS render-blocking puede aportar, aunque el ahorro estimado actual es menor que el render delay total.

## Tareas pendientes

- Abrir bloque específico `Core Web Vitals home: render delay H1`.
- Probar en local y preview variantes controladas:
  - H1 sin `animate-fade-in-up`.
  - H1 sin `text-gradient-wine` o con color sólido en primer paint.
  - Hero con fuente del sistema o fuente crítica self-host/preload real de WOFF2.
  - CSS crítico mínimo para above-the-fold.
- Repetir Lighthouse production-like tras cada variante.
- Mantener como bloque posterior:
  - Defer de GTM/Ads/Meta/Clarity/Leadfeeder.
  - Revisión del chat.
  - Cache/headers de assets.

## Actualización 2026-05-25: variante H1 sin animación

## Hechos

- Se continuó la sesión leyendo primero `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- No se detectaron contradicciones nuevas entre los documentos y el estado del repo.
- Se abrió el bloque específico `Core Web Vitals home: render delay H1`.
- Se aplicó la primera variante controlada en `src/components/landing/HeroSection.tsx`:
  - El H1 de la home ya no usa `animate-fade-in-up`.
  - No se tocaron todavía `text-gradient-wine`, `font-heading`, carga de fuentes ni CSS crítico.
- Verificación local:
  - `npm run build`: correcto.
  - `npm run test`: 5 archivos, 15 tests correctos.
  - `git diff --check`: correcto.
  - Preview local `http://127.0.0.1:4177/`: H1 visible con el texto `Vende más vino. Mejora márgenes. Controla tu bodega.`
  - QA navegador: el H1 tiene `animationName: none` y `opacity: 1`.
  - Lighthouse mobile local en preview: Performance 96, FCP 2,0 s, LCP 2,3 s, TBT 110 ms, CLS 0,007.
- Se creó y pusheó a `origin/main` el commit `b86d06d fix: remove hero h1 entrance animation`.
- Tras el push se intentó abrir Lovable desde el navegador de Codex, pero redirige a `https://lovable.dev/login?redirect=%2Fprojects%2F2c4eed0e-6760-45f0-aeb3-ce44de8e91f1`; no se pudo publicar desde esta sesión.
- Avisos no bloqueantes durante build:
  - Browserslist/caniuse-lite desactualizado.
  - Chunks grandes por encima de 200 kB.

## Decisiones

- Probar el render delay del H1 con cambios de una sola variable para que la medición sea atribuible.
- Mantener por ahora el gradiente del primer fragmento del H1 y la fuente `Playfair Display`, porque la primera prueba documentada era retirar la animación.
- No considerar resuelto Core Web Vitals hasta publicar esta variante y revalidar Lighthouse mobile en producción.

## Hipótesis

- Si el H1 se contabilizaba tarde por la animación CSS, esta variante debería reducir el render delay de producción.
- Si producción sigue con LCP alto tras publicar, la siguiente causa probable será el gradiente de texto, la fuente externa crítica o CSS render-blocking.

## Tareas pendientes

- Publicar `main` desde Lovable; el cambio pendiente es `b86d06d`.
- Revalidar producción tras publish:
  - Confirmar que el H1 publicado ya no tiene `animate-fade-in-up`.
  - Repetir Lighthouse mobile home.
  - Revisar desglose LCP y confirmar si baja el `render delay`.
- Si no mejora lo suficiente, probar la siguiente variante: H1 con color sólido inicial en vez de `text-gradient-wine`.

## Actualización 2026-05-25: producción H1 sin animación y variante color sólido

## Hechos

- El usuario confirmó que el cambio H1 sin animación ya estaba publicado desde Lovable.
- Producción refleja el deploy nuevo:
  - Deployment activo: `05d29c6a-1f11-4a80-8af5-c913bfa8d990`.
  - Entry activo: `/assets/index-B3ya-SL1.js`.
  - Modulepreloads iniciales: `vendor-react`, `vendor-query`, `vendor-router` y `vendor-ui-utils`.
  - El entry publicado no contiene imports estáticos de `vendor-motion`, `vendor-charts`, `vendor-radix`, `vendor-supabase` ni `vendor-markdown`.
  - El entry publicado contiene el H1 sin `animate-fade-in-up`.
- QA navegador en producción:
  - H1: `Vende más vino. Mejora márgenes. Controla tu bodega.`
  - Clase H1: `font-heading text-4xl md:text-5xl lg:text-[3.4rem] xl:text-6xl font-bold leading-[1.1] mb-5`.
  - `animationName: none`.
  - `opacity: 1`.
  - `fontFamily: "Playfair Display", serif`.
- Lighthouse mobile producción tras quitar animación:
  - Performance 58.
  - Accessibility 96.
  - Best Practices 75.
  - SEO 92.
  - FCP 6,2 s.
  - LCP 11,1 s.
  - Speed Index 7,1 s.
  - TBT 100 ms.
  - CLS 0,007.
  - LCP element sigue siendo el H1.
  - Desglose LCP: TTFB 785 ms, Load Delay 0 ms, Load Time 0 ms, Render Delay 10.300 ms, 93%.
- Conclusión factual: quitar `animate-fade-in-up` del H1 no resuelve el LCP alto de producción.
- Se aplicó localmente la siguiente variante controlada:
  - En `src/components/landing/HeroSection.tsx`, el primer fragmento del H1 pasa de `text-gradient-wine` a `text-wine-light`.
  - No se tocaron fuente, tamaños, estructura, copy ni CSS crítico.
- Verificación local de la variante color sólido:
  - `npm run build`: correcto.
  - `npm run test`: 5 archivos, 15 tests correctos.
  - `git diff --check`: correcto.
  - QA navegador local: primer tramo del H1 con `text-wine-light`, `backgroundImage: none`, color `rgb(207, 23, 35)`, H1 sin animación y opacidad 1.
  - Lighthouse mobile local: Performance 96, FCP 2,0 s, LCP 2,3 s, TBT 100 ms, CLS 0,007.
- Avisos no bloqueantes durante build:
  - Browserslist/caniuse-lite desactualizado.
  - Chunks grandes por encima de 200 kB.

## Decisiones

- Descartar la animación del H1 como causa suficiente del LCP alto.
- Mantener el H1 sin animación porque evita una espera innecesaria y no rompe la experiencia.
- Probar ahora color sólido en el primer tramo del H1 para aislar si `background-clip/text-gradient` retrasa el LCP.
- No tocar todavía fuente crítica ni CSS inline hasta publicar y medir esta variante.

## Hipótesis

- Si el gradiente de texto estaba retrasando el paint final del H1, la variante `text-wine-light` debería reducir el render delay en producción.
- Si producción sigue con LCP alto, el foco pasa a fuente crítica externa (`Playfair Display`), CSS render-blocking y posible orden de hidratación/primer paint.

## Tareas pendientes

- Commit y push de la variante color sólido.
- Publicar `main` desde Lovable.
- Revalidar producción tras publish:
  - Confirmar entry nuevo distinto de `/assets/index-B3ya-SL1.js`.
  - Confirmar H1 con `text-wine-light`, sin `text-gradient-wine`.
  - Repetir Lighthouse mobile home.
  - Comparar contra LCP 11,1 s y render delay 10,3 s de la variante sin animación.
- Si no mejora, probar fuente crítica self-host/preload o fuente del sistema solo para el hero.

## Actualización 2026-05-25: producción color sólido y variante fuente móvil

## Hechos

- El usuario confirmó que el cambio de H1 con color sólido ya estaba publicado desde Lovable.
- Producción refleja el deploy nuevo:
  - Deployment activo: `9d5642ab-6d1f-4806-b6c3-26c1b330db23`.
  - Entry activo: `/assets/index-QyK9ToNR.js`.
  - Modulepreloads iniciales: `vendor-react`, `vendor-query`, `vendor-router` y `vendor-ui-utils`.
  - El entry publicado no contiene imports estáticos de `vendor-motion`, `vendor-charts`, `vendor-radix`, `vendor-supabase` ni `vendor-markdown`.
  - El entry contiene `text-wine-light` para el H1 y no conserva el snippet del H1 con `text-gradient-wine`.
- QA navegador en producción:
  - H1: `Vende más vino. Mejora márgenes. Controla tu bodega.`
  - H1 sin animación: `animationName: none`, `opacity: 1`.
  - Primer tramo del H1: `text-wine-light`, `backgroundImage: none`, color `rgb(207, 23, 35)`.
  - Fuente del H1 todavía era `"Playfair Display", serif`.
- Lighthouse mobile producción tras color sólido:
  - Performance 63.
  - Accessibility 96.
  - Best Practices 75.
  - SEO 92.
  - FCP 5,1 s.
  - LCP 7,0 s.
  - Speed Index 5,1 s.
  - TBT 70 ms.
  - CLS 0,007.
  - LCP element sigue siendo el H1.
  - Desglose LCP: TTFB 801 ms, Load Delay 0 ms, Load Time 0 ms, Render Delay 6.187 ms, 89%.
- Conclusión factual: quitar `text-gradient-wine` mejora producción de forma material, pero LCP sigue por encima del objetivo.
- Se aplicó localmente la siguiente variante controlada:
  - El H1 pasa de `font-heading` a `font-serif lg:font-heading`.
  - En móvil/tablet usa fuente serif del sistema.
  - En escritorio `lg` conserva `Playfair Display` para no degradar la primera impresión desktop.
  - Se mantienen H1 sin animación y primer tramo con `text-wine-light`.
- Verificación local de la variante fuente móvil:
  - `npm run build`: correcto.
  - `npm run test`: 5 archivos, 15 tests correctos.
  - `git diff --check`: correcto.
  - QA navegador local desktop 1280 px: H1 conserva `"Playfair Display", serif`.
  - Lighthouse mobile local: Performance 96, FCP 1,9 s, LCP 2,2 s, TBT 120 ms, CLS 0,006.
- Avisos no bloqueantes durante build:
  - Browserslist/caniuse-lite desactualizado.
  - Chunks grandes por encima de 200 kB.

## Decisiones

- Mantener la eliminación del gradiente del H1 porque redujo LCP de producción de 11,1 s a 7,0 s.
- Probar fuente del sistema solo bajo `lg` para atacar Core Web Vitals móvil sin sacrificar la identidad visual desktop.
- No tocar todavía CSS crítico ni terceros hasta medir esta variante publicada.

## Hipótesis

- Si Playfair Display es parte del render delay móvil, `font-serif lg:font-heading` debería reducir el LCP de producción por debajo de la variante de color sólido.
- Si LCP sigue alto, el siguiente foco será CSS crítico above-the-fold y orden de carga del CSS/JS inicial, más que estética del H1.

## Tareas pendientes

- Commit y push de la variante fuente móvil.
- Publicar `main` desde Lovable.
- Revalidar producción tras publish:
  - Confirmar entry nuevo distinto de `/assets/index-QyK9ToNR.js`.
  - Confirmar H1 con `font-serif lg:font-heading`.
  - En viewport móvil, confirmar fuente del sistema para el H1.
  - Repetir Lighthouse mobile home.
  - Comparar contra LCP 7,0 s y render delay 6,19 s de la variante color sólido.
- Si no mejora lo suficiente, pasar a CSS crítico/inline above-the-fold y revisión de carga del CSS.

## Actualización 2026-05-25: fuente móvil publicada y saneamiento de arranque/biblioteca humana

## Hechos

- La variante `font-serif lg:font-heading` del H1 quedó commiteada previamente en `main` con `1a3a1c3 fix: use system serif for mobile hero h1`.
- Producción refleja esa variante:
  - Deployment activo observado: `25c70cc4-cb78-4036-b43a-73bd41ee085a`.
  - Entry activo: `/assets/index-howILT12.js`.
  - En navegador desktop, el H1 mantiene `font-serif lg:font-heading`, sin animación y con opacidad 1.
  - El entry publicado contiene `font-serif lg:font-heading` y `text-wine-light`.
- Producción todavía conserva `vendor-query` en modulepreload inicial y en el entry publicado.
- Lighthouse mobile de producción para esta variante sigue siendo variable:
  - Run favorable: Performance 85, FCP 2,6 s, LCP 3,5 s, TBT 100 ms, CLS 0,006.
  - Run posterior: Performance 63, FCP 4,8 s, LCP 7,9 s, TBT 30 ms, CLS 0.
- Conclusión factual: la variante de fuente móvil puede mejorar el mejor caso, pero no permite declarar resuelto el LCP móvil de forma estable.
- Se detectó que `LanguageSwitcher` arrastraba helpers desde `wineLibraryI18n`, dejando código de biblioteca del vino en el arranque global.
- Se creó `src/data/wineLibraryRoutes.ts` con helpers ligeros de rutas, idiomas, canonical y hreflang de biblioteca.
- `src/components/LanguageSwitcher.tsx` usa ahora `wineLibraryRoutes` en vez de importar la capa editorial completa.
- `src/data/wineLibraryI18n.ts` reexporta los helpers de rutas desde el nuevo módulo para mantener compatibilidad.
- Se eliminó React Query del arranque de `App`:
  - `src/App.tsx` ya no envuelve toda la app en `QueryClientProvider`.
  - `src/hooks/usePageContent.ts` usa caché manual con TTL de 5 minutos y deduplicación de peticiones.
- Build local tras el saneamiento:
  - Entry local: `/assets/index-BpRdM0S8.js`.
  - Modulepreloads iniciales: `vendor-react`, `vendor-router` y `vendor-ui-utils`.
  - Ya no aparece `vendor-query` como preload inicial.
  - El entry local no contiene `QueryClient` ni imports estáticos de `vendor-motion`, `vendor-charts`, `vendor-radix` o `vendor-supabase`.
- Se detectó un bug importante en experiencia humana de biblioteca:
  - En producción, `/de/weinbibliothek/rebsorten/tempranillo` carga sin H1 ni bloque `Service-Intelligenz` para usuario humano.
  - El origen probable era la retirada previa del `TooltipProvider` global sin proveedor local en `GrapeDetail`.
- Se corrigió `src/pages/GrapeDetail.tsx` añadiendo `TooltipProvider` local solo alrededor de fichas completas.
- Se añadió test de regresión `src/test/grape-detail-render.test.tsx` para asegurar que `/de/weinbibliothek/rebsorten/tempranillo` renderiza H1 `Tempranillo` y el bloque `Service-Intelligenz`.
- `src/test/setup.ts` añade mock de `IntersectionObserver` para jsdom.
- El bloque quedó commiteado y pusheado a `origin/main` con `f26443a fix: slim startup and restore grape detail render`.
- Verificaciones locales completadas:
  - `npm run test`: 6 archivos, 16 tests correctos.
  - `npm run build`: correcto.
  - `git diff --check`: correcto.
  - QA navegador local home: H1 visible, sin animación, con `font-serif lg:font-heading`.
  - QA navegador local `/de/weinbibliothek/rebsorten/tempranillo`: H1 `Tempranillo`, bloque `Service-Intelligenz`, root no vacío y sin errores de consola.
  - Lighthouse mobile local home: Performance 98, FCP 1,7 s, LCP 2,1 s, TBT 60 ms, CLS 0,006.

## Decisiones

- Mantener por ahora H1 sin animación, con color sólido y `font-serif lg:font-heading`, pero no marcar Core Web Vitals como cerrado.
- No restaurar un `TooltipProvider` global: los componentes que lo necesiten deben proveerlo localmente para no cargar Radix en el arranque de home.
- Mantener los datos editoriales de biblioteca del vino fuera del chrome global y del selector de idioma.
- Sustituir React Query en `usePageContent` por caché manual, porque ese contenido se usa en superficies diferidas y no justifica un provider global en el primer render.

## Hipótesis

- Al publicar este bloque, el entry de home debería perder `vendor-query` y reducir presión de arranque.
- La corrección local de `TooltipProvider` debería arreglar las fichas humanas de uva que hoy quedan sin contenido principal en producción.
- Search Console/Core Web Vitals tardará en reflejar cambios aunque Lighthouse mejore inmediatamente.
- Si Lighthouse de producción sigue inestable tras publicar este bloque, el siguiente cuello estará probablemente en CSS crítico/render-blocking y orden de primer render.

## Tareas pendientes

- Publicar `main` desde Lovable; el commit de código relevante es `f26443a`.
- Revalidar producción tras publish:
  - Entry nuevo distinto de `/assets/index-howILT12.js`.
  - Modulepreloads iniciales sin `vendor-query`.
  - Home sin imports estáticos de vendors pesados.
  - `/de/weinbibliothek/rebsorten/tempranillo` como usuario humano con H1 `Tempranillo` y bloque `Service-Intelligenz`.
  - Lighthouse mobile home con al menos dos runs para medir estabilidad.
- Si producción mejora pero sigue fuera de objetivo, abrir bloque CSS crítico/above-the-fold.

## Actualización 2026-05-25: producción validada tras publish de arranque ligero

## Hechos

- El usuario confirmó la publicación desde Lovable.
- Producción ya refleja el bloque `f26443a`:
  - Deployment activo observado: `baa85387-7e8f-4f71-a058-0633f8767465`.
  - Entry activo: `/assets/index-BRCyx101.js`.
  - Entry anterior `/assets/index-howILT12.js` ya no está activo en home.
  - Modulepreloads iniciales: `vendor-react`, `vendor-router` y `vendor-ui-utils`.
  - `vendor-query` ya no aparece en modulepreload inicial ni en el entry publicado.
  - El entry publicado no contiene referencias estáticas a `vendor-motion`, `vendor-charts`, `vendor-radix` ni `vendor-supabase`.
  - El entry conserva `font-serif lg:font-heading` y `text-wine-light`.
- QA de home en producción:
  - H1 visible: `Vende más vino. Mejora márgenes. Controla tu bodega.`
  - H1 sin animación: `animationName: none`, `opacity: 1`.
  - Primer tramo sin gradiente: `backgroundImage: none`.
  - En viewport móvil 390 px, el H1 usa fuente del sistema: `ui-serif, Georgia, Cambria, "Times New Roman", Times, serif`.
  - En desktop conserva Playfair por `lg:font-heading`.
- QA de biblioteca humana en producción:
  - `/de/weinbibliothek/rebsorten/tempranillo` renderiza H1 `Tempranillo`.
  - La página muestra bloque `Service-Intelligenz`.
  - Título observado: `Tempranillo | Rebsortenführer — Winerim | Winerim`.
  - No se detectaron errores de consola en la prueba.
- Matiz de QA: la ficha de uva requiere esperar a que cargue el chunk lazy; tras `load` inmediato puede no estar lista, pero tras unos segundos renderiza correctamente.
- Lighthouse mobile de producción tras el publish:
  - Run 1: Performance 85, FCP 2,4 s, LCP 3,4 s, Speed Index 5,1 s, TBT 60 ms, CLS 0,006.
  - Run 2: Performance 68, FCP 3,1 s, LCP 7,9 s, Speed Index 4,3 s, TBT 60 ms, CLS 0,006.
- Conclusión factual: el arranque ligero está publicado y mejora claramente el mejor caso de Lighthouse, pero el LCP móvil sigue inestable y no se puede cerrar Core Web Vitals todavía.

## Decisiones

- Considerar cerrado el bloqueo de publish del bloque `f26443a`.
- Considerar arreglado el bug humano de ficha alemana de Tempranillo en producción.
- Mantener `vendor-query` fuera del arranque inicial.
- No declarar Core Web Vitals resuelto por la variabilidad de Lighthouse; el siguiente bloque será CSS crítico/above-the-fold si seguimos rendimiento.

## Hipótesis

- La variabilidad restante parece menos ligada a JS propio inicial y más a CSS/render-blocking, orden de primer paint o condiciones externas de Lighthouse.
- Search Console tardará días o semanas en reflejar la mejora de campo aunque el bundle ya esté saneado.
- La ficha humana de uva puede beneficiarse de prefetch o skeleton específico si se quiere reducir la espera del chunk lazy, pero ya no está rota.

## Tareas pendientes

- Si seguimos Core Web Vitals:
  - Abrir bloque CSS crítico/above-the-fold.
  - Revisar render-blocking CSS y fuentes críticas.
  - Medir Lighthouse con varias muestras tras cada cambio.
- Si aparcamos rendimiento:
  - Retomar ampliación máxima de biblioteca del vino.
  - Priorizar 30-50 entidades por demanda SEO y valor comercial.
  - Añadir schema por entidad y enlazado interno por intención.

## Actualización 2026-05-25: CSS crítico above-the-fold local

## Hechos

- Se abrió el bloque `CSS crítico/above-the-fold` tras validar que producción seguía con LCP móvil variable.
- Se añadió `critical-above-fold-css` en `index.html` con estilos mínimos para:
  - variables de color base;
  - body;
  - navbar;
  - hero;
  - tipografías críticas;
  - botones y utilidades above-the-fold usadas por home.
- Se añadió en `vite.config.ts` el plugin `winerim-non-blocking-build-css`.
- En build de producción, el CSS generado por Vite pasa de stylesheet bloqueante a:
  - `rel="preload" as="style"`;
  - stylesheet `media="print"` con `onload`;
  - fallback `noscript`.
- Build local posterior:
  - `dist/index.html`: 21,07 KB, gzip 6,35 KB.
  - El HTML contiene `critical-above-fold-css`.
  - El CSS de build aparece como preload + stylesheet no bloqueante + fallback `noscript`.
  - Modulepreloads iniciales se mantienen en `vendor-react`, `vendor-router` y `vendor-ui-utils`.
- Lighthouse mobile local en preview:
  - Run 1: Performance 98, FCP 1,7 s, LCP 2,0 s, TBT 90 ms, CLS 0,006.
  - Run 2: Performance 97, FCP 1,7 s, LCP 2,1 s, TBT 110 ms, CLS 0,006.
  - `render-blocking resources`: 0.
- QA local con Chrome:
  - Home móvil: H1 visible, fuente serif del sistema, header fixed, fondo correcto y sin errores de consola.
  - Home desktop: H1 visible, Playfair en desktop, nav visible y tablet hero visible.
  - `/de/weinbibliothek/rebsorten/tempranillo`: H1 `Tempranillo`, bloque `Service-Intelligenz` y sin errores de consola.
- Verificaciones completadas:
  - `npm run build`: correcto.
  - `npm run test`: 6 archivos, 16 tests correctos.
  - `git diff --check`: correcto.
- Commit técnico creado: `6627bda fix: load build css non-blocking`.

## Decisiones

- Aceptar un aumento pequeño de HTML inicial para eliminar el stylesheet bloqueante del primer viewport.
- Mantener fallback `noscript` para que usuarios sin JS reciban el CSS completo.
- No tocar todavía GTM/terceros ni rediseñar hero; este bloque aísla la variable CSS render-blocking.

## Hipótesis

- Al publicar `6627bda`, Lighthouse de producción debería dejar de listar el CSS principal como recurso render-blocking.
- Si producción sigue con LCP variable, el siguiente foco será orden de ejecución/hidratación, terceros o caché/red, no el stylesheet principal.
- El CSS crítico inline debe vigilarse si cambia el hero o navbar, porque puede quedarse desalineado con clases futuras.

## Tareas pendientes

- Push de `6627bda` y documentación de cierre.
- Publicar `main` desde Lovable.
- Revalidar producción tras publish:
  - Entry/HTML nuevo con `critical-above-fold-css`.
  - CSS completo cargando como preload + stylesheet `media="print"`.
  - Lighthouse mobile con `render-blocking resources` en 0.
  - Home móvil/desktop sin FOUC visible ni errores.
  - Ficha alemana de Tempranillo sigue renderizando.

## Actualización 2026-05-25: producción validada tras CSS crítico

## Hechos

- El usuario confirmó que el publish de Lovable parecía estar hecho.
- Producción ya refleja el bloque CSS crítico:
  - Deployment activo observado: `0e7c5ea6-8b8a-4638-a5f7-01e2335d8106`.
  - Entry activo: `/assets/index-BRCyx101.js`.
  - El HTML contiene `critical-above-fold-css`.
  - El CSS principal `/assets/index-Dh6dOxG-.css` carga como `preload` + stylesheet `media="print"` con `onload`.
  - El HTML mantiene fallback `noscript` para el CSS completo.
  - No hay stylesheet principal bloqueante fuera del fallback `noscript`.
  - Modulepreloads iniciales: `vendor-react`, `vendor-router` y `vendor-ui-utils`.
  - `vendor-query` sigue fuera del preload inicial y del entry publicado.
- Lighthouse mobile producción tras el publish:
  - Run 1: Performance 73, FCP 2,4 s, LCP 6,6 s, Speed Index 3,0 s, TBT 90 ms, CLS 0,006.
  - Run 2: Performance 71, FCP 2,4 s, LCP 6,7 s, Speed Index 2,8 s, TBT 190 ms, CLS 0,006.
  - `render-blocking resources`: 0 en ambos runs.
- QA Chrome producción:
  - Home móvil: H1 correcto, fuente serif del sistema, header fixed, CTA con gradiente y fondo correcto.
  - Home desktop: H1 correcto, Playfair Display en desktop, nav visible y tablet hero visible.
  - `/de/weinbibliothek/rebsorten/tempranillo`: H1 `Tempranillo`, título localizado y bloque `Service-Intelligenz`.
  - No se detectaron errores de consola en la prueba.
- Conclusión factual: el bloqueo por CSS render-blocking queda eliminado en producción, pero el LCP móvil sigue por encima de objetivo.

## Decisiones

- Considerar publicado y validado el bloque CSS crítico.
- Considerar resuelto el punto específico `render-blocking resources`.
- No declarar cerrado Core Web Vitals porque LCP sigue alrededor de 6,6-6,7 s en las dos muestras de producción.
- El siguiente bloque de rendimiento, si se continúa, debe centrarse en orden de hidratación/primer render y terceros, no en CSS render-blocking principal.

## Hipótesis

- La mejora de FCP/Speed Index indica que el CSS crítico ayudó al primer render, aunque el LCP del H1 sigue contabilizándose tarde.
- La causa restante puede estar en hidratación, tareas de terceros, scripts iniciales de tracking, fuentes/estilos aplicados después o variabilidad de entorno Lighthouse.
- El CSS crítico inline debe mantenerse sincronizado con cambios futuros de hero/navbar.

## Tareas pendientes

- Si seguimos rendimiento:
  - Auditar orden de hidratación y scripts de terceros.
  - Probar diferir GTM/Ads/Meta/Clarity/Leadfeeder con consentimiento/idle.
  - Medir si el LCP del H1 mejora al reducir scripts antes de interacción.
- Si aparcamos rendimiento:
  - Retomar biblioteca del vino al máximo nivel sobre la base saneada.
  - Priorizar 30-50 entidades y enlazado interno.

## Actualización 2026-05-25: GTM diferido localmente

## Hechos

- Se auditó la carga de terceros en el arranque.
- En `index.html`, Consent Mode v2 ya se inicializaba antes de GTM y se mantiene en el `head`.
- GTM era el único tercero de tracking que se insertaba inmediatamente durante el parseo del `head`.
- El chat de Winerim ya estaba diferido tras `load` + `requestIdleCallback`.
- Se cambió el snippet de GTM para definir `window.__winerimLoadGtm` y cargar `https://www.googletagmanager.com/gtm.js?id=GTM-NDNQP955` solo después de `load` y en idle, con fallback `setTimeout`.
- Se mantiene el iframe `noscript` de GTM.
- Commit técnico creado: `e164294 fix: defer gtm until after load`.
- Push completado a `origin/main`; el commit técnico del cambio es `e164294 fix: defer gtm until after load`.
- Comprobación de producción tras el push:
  - Deployment observado: `94aea691-4fe9-4a08-84c0-135f46fa300f`.
  - Entry activo: `/assets/index-BRCyx101.js`.
  - Producción todavía no contiene `__winerimLoadGtm`.
  - Producción todavía contiene el snippet inmediato antiguo de GTM.
  - Conclusión factual: falta publish desde Lovable para llevar `origin/main` a producción.
- Verificaciones locales:
  - `npm run build`: correcto.
  - `npm run test`: 6 archivos, 16 tests correctos.
  - `git diff --check`: correcto.
  - `dist/index.html` contiene `__winerimLoadGtm`, `requestIdleCallback`, `GTM-NDNQP955`, Consent Mode y fallback `noscript`.
  - El CSS principal sigue cargando como preload + stylesheet no bloqueante + fallback `noscript`.
  - Lighthouse mobile local:
    - Run 1: Performance 98, FCP 1,8 s, LCP 2,1 s, TBT 90 ms, CLS 0,006.
    - Run 2: Performance 97, FCP 1,7 s, LCP 2,1 s, TBT 110 ms, CLS 0,006.
  - QA navegador local:
    - Home renderiza H1 `Vende más vino. Mejora márgenes. Controla tu bodega.`
    - `/de/weinbibliothek/rebsorten/tempranillo` renderiza H1 `Tempranillo`, canonical y JSON-LD.
    - No se detectaron errores de consola.

## Decisiones

- Mantener Consent Mode temprano para conservar el contrato de consentimiento antes de cualquier tag.
- Diferir el contenedor GTM para reducir competencia de red/main thread antes del primer render relevante.
- Aceptar que las etiquetas gestionadas dentro de GTM pueden dispararse unos segundos más tarde.
- No tocar todavía configuración interna de GTM, Google Ads, Meta, Clarity o Leadfeeder porque viven dentro del contenedor.
- No tocar Cloudflare Worker en este bloque.

## Hipótesis

- Si GTM o tags internos estaban compitiendo con el primer render, producción debería mostrar menos variabilidad de LCP tras publicar `e164294`.
- Si producción sigue con LCP alto, el siguiente sospechoso será hidratación/orden de render del H1 o coste del bundle inicial, no CSS render-blocking ni GTM inmediato.
- Search Console y Core Web Vitals de campo no reflejarán este cambio en tiempo real aunque Lighthouse sintético mejore.

## Tareas pendientes

- Hecho: pushear `e164294` y documentación de cierre a `origin/main`.
- Pendiente: publicar `main` desde Lovable.
- Revalidar producción tras publish:
  - HTML contiene `__winerimLoadGtm`.
  - GTM no aparece como snippet inmediato antiguo.
  - Consent Mode sigue antes de GTM.
  - Home móvil/desktop correcta.
  - `/de/weinbibliothek/rebsorten/tempranillo` correcta.
  - Lighthouse mobile home con 2-3 muestras.
- Si LCP mejora y queda estable, retomar biblioteca del vino al máximo nivel.
- Si LCP sigue alto, auditar hidratación/render del H1 y coste del entry inicial.

## Actualización 2026-05-25: Lovable disponible, publish pendiente de confirmación

## Hechos

- Relectura de documentos operativos completada al iniciar la retoma.
- `git status`: `main...origin/main`, árbol limpio.
- Producción revisada de nuevo:
  - Deployment activo: `94aea691-4fe9-4a08-84c0-135f46fa300f`.
  - Entry activo: `/assets/index-BRCyx101.js`.
  - Todavía no contiene `__winerimLoadGtm`.
  - Todavía contiene el snippet inmediato antiguo de GTM.
- El navegador integrado de Codex no está disponible (`iab`).
- Chrome sí tiene sesión Lovable activa para `https://lovable.dev/projects/2c4eed0e-6760-45f0-aeb3-ce44de8e91f1`.
- En Lovable el botón `Publish` está visible.
- Tras recargar Lovable, el DOM no muestra `e164294` ni texto relacionado con GTM diferido.
- Brecha detectada: GitHub `main` contiene el cambio, pero la UI de Lovable no evidencia explícitamente que el commit esté incorporado antes de pulsar `Publish`.

## Decisiones

- No pulsar `Publish` sin confirmación explícita porque cambia la web pública.
- Tratar la ausencia de `e164294` en la UI Lovable como una incertidumbre, no como prueba definitiva de que Lovable no haya sincronizado.

## Hipótesis

- Lovable puede tener la UI de historial incompleta o no mostrar commits recientes aunque el publish use el estado sincronizado.
- Si se pulsa `Publish` y producción sigue sin `__winerimLoadGtm`, habrá que forzar sincronización desde Lovable o publicar por otra vía.

## Tareas pendientes

- Confirmar si se debe pulsar `Publish` en Lovable ahora.
- Tras publicar:
  - Revalidar HTML de producción.
  - Si aparece `__winerimLoadGtm`, ejecutar QA y Lighthouse.
  - Si no aparece, investigar sincronización GitHub -> Lovable.

## Actualización 2026-05-25: GTM diferido publicado y validado en producción

## Hechos

- El usuario confirmó publicar desde Lovable.
- Se pulsó `Publish` y después `Update` en el panel `Published` de Lovable.
- Lovable terminó en estado `Up to date`.
- Lovable sigue mostrando aviso de balance Cloud & AI pausado, pero no bloqueó la actualización del frontend.
- Producción refleja el cambio:
  - Deployment activo: `11e48c49-19d5-4d37-884c-d58b7de5387a`.
  - Entry activo: `/assets/index-BRCyx101.js`.
  - HTML contiene `__winerimLoadGtm`.
  - HTML contiene `requestIdleCallback`.
  - HTML mantiene Consent Mode antes de GTM.
  - HTML mantiene fallback `noscript` de GTM.
  - HTML ya no contiene el snippet inmediato antiguo `w[l].push({'gtm.start'...`.
  - HTML mantiene `critical-above-fold-css`.
  - CSS principal sigue como preload + stylesheet no bloqueante + fallback `noscript`.
- QA producción:
  - Home móvil: H1 `Vende más vino. Mejora márgenes. Controla tu bodega.`, canonical `/`, JSON-LD y sin errores de consola.
  - Home desktop: H1 correcto, canonical `/`, JSON-LD y sin errores de consola.
  - `/de/weinbibliothek/rebsorten/tempranillo`: `lang=de`, H1 `Tempranillo`, canonical alemán, JSON-LD y sin errores de consola.
  - GTM cargó en QA como recurso diferido y `window.__winerimGtmLoaded` quedó en `true`.
- Lighthouse mobile producción tras GTM diferido:
  - Run 1: Performance 89, FCP 2,6 s, LCP 2,7 s, Speed Index 4,6 s, TBT 110 ms, CLS 0,006.
  - Run 2: Performance 89, FCP 2,6 s, LCP 2,6 s, Speed Index 4,9 s, TBT 110 ms, CLS 0,006.
  - Run 3: Performance 93, FCP 2,4 s, LCP 2,5 s, Speed Index 2,5 s, TBT 160 ms, CLS 0,006.
  - `render-blocking resources`: 0 en las tres muestras.
- Resultado frente a medición anterior tras CSS crítico:
  - Antes: Performance 73/71, LCP 6,6/6,7 s.
  - Ahora: Performance 89/89/93, LCP 2,7/2,6/2,5 s.

## Decisiones

- Cerrar el bloque GTM diferido como publicado y validado.
- Considerar Core Web Vitals sintético de home en estado aceptable para retomar biblioteca del vino, sin declarar aún mejora de campo en Search Console.
- Mantener Consent Mode temprano y GTM diferido.
- No tocar Cloudflare Worker ni Supabase para este bloque.

## Hipótesis

- La variabilidad previa de LCP estaba muy probablemente influida por GTM/tags asociados o por competencia inicial que GTM provocaba.
- Search Console/Core Web Vitals de campo tardará días o semanas en reflejar el cambio.
- Queda deuda residual de JS no usado, pero ya no parece ser el bloqueo principal de LCP home.

## Tareas pendientes

- Monitorizar Search Console/Core Web Vitals de campo.
- Retomar biblioteca del vino al máximo nivel:
  - priorizar 30-50 entidades;
  - ampliar contenido profundo por idioma;
  - reforzar schema y enlaces internos por intención.
- Como mejora secundaria de rendimiento, auditar JS no usado si vuelve a ser prioritario.

## Actualización 2026-05-25: segunda tanda editorial de biblioteca del vino

## Hechos

- Se retomó la biblioteca del vino tras cerrar GTM diferido y Core Web Vitals sintético de home.
- Se amplió la capa editorial avanzada de uvas prioritarias de 10 a 20 perfiles.
- Nuevas uvas añadidas a `src/data/wineLibraryEditorial.ts`:
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
- Las nuevas fichas incluyen temperatura, copa, aireación, rol en carta, guion de sala, palanca comercial, error a evitar, maridajes y FAQs localizadas mediante la capa existente.
- Se añadió la misma segunda tanda a `supabase/functions/prerender/index.ts` para mantener paridad entre experiencia humana y HTML prerenderizado para bots.
- Se actualizó el contrato de pruebas:
  - `src/test/wine-library-editorial.test.ts` exige 20 perfiles prioritarios y cubre segunda tanda en `de` y `pt`.
  - `src/test/wine-library-seo-surface.test.ts` exige que el prerender contenga las nuevas uvas prioritarias.
- Verificaciones completadas:
  - `npm run test -- --run`: 6 archivos, 17 tests.
  - `npm run build`: correcto.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`: correcto.
  - `git diff --check`: correcto.
  - QA local en navegador: `/biblioteca-vino/uvas/syrah`, `/de/weinbibliothek/rebsorten/syrah`, `/pt/biblioteca-vinho/castas/xarello` y `/en/wine-library/grapes/chenin-blanc` muestran inteligencia de servicio, rol en carta y maridajes sin errores de consola.
- No se detectó fuga de texto español en las rutas `de` y `pt` probadas.
- Producción aún no refleja esta tanda hasta publicar desde Lovable.

## Decisiones

- Usar `xarello` como slug canónico porque es el slug real del catálogo; no crear `xarel-lo`.
- Añadir `monastrell` y `touriga-nacional` para reforzar intención ibérica/portuguesa, ya que `verdejo` y `godello` ya estaban en la primera tanda.
- Mantener la segunda tanda dentro del mismo patrón editorial de servicio para evitar crear una abstracción nueva innecesaria.
- Mantener paridad frontend/prerender como requisito de calidad SEO y LLM.

## Hipótesis

- Pasar de 10 a 20 uvas prioritarias aumenta la profundidad semántica de la biblioteca sin añadir URLs nuevas ni riesgo de indexación.
- Las nuevas uvas cubren demanda internacional e ibérica relevante para restaurantes: tintos globales, tintos italianos, blancos de valor y Portugal.
- El impacto SEO real dependerá de publicar desde Lovable y de que Google recrawlee las rutas.

## Tareas pendientes

- Hecho: commit y push de la segunda tanda editorial con `d03625a feat: expand priority wine grape profiles`.
- Hecho: frontend publicado desde Lovable.
- Hecho: Edge Function `prerender` desplegada explícitamente desde Lovable tras detectar que el publish del frontend no actualizaba bots.
- Hecho: producción revalidada en `/biblioteca-vino/uvas/syrah`, `/de/weinbibliothek/rebsorten/syrah`, `/pt/biblioteca-vinho/castas/xarello` y `/en/wine-library/grapes/chenin-blanc`.
- Siguiente ampliación: regiones, estilos, maridajes y schema/enlazado interno por intención.

## Actualización 2026-05-25: segunda tanda editorial publicada y validada

## Hechos

- Commit publicado en GitHub: `d03625a feat: expand priority wine grape profiles`.
- Lovable detectó el commit `feat: expand priority wine grape profiles`.
- Se pulsó `Publish` en Lovable.
- Producción pasó a deployment frontend `d80a4e7c-1f42-4cfe-8414-b247ae5ccd75`.
- Tras el publish frontend, Googlebot todavía recibía la versión genérica de Syrah/Xarello porque `prerender` no se había actualizado.
- Se pidió en Lovable el despliegue explícito de Supabase Edge Function `prerender`.
- Lovable confirmó el despliegue de `prerender`.
- Producción validada como Googlebot:
  - `/biblioteca-vino/uvas/syrah` contiene `Rol en carta`, contenido editorial de Syrah y `x-worker-branch: bot-prerender`.
  - `/de/weinbibliothek/rebsorten/syrah` contiene el perfil enriquecido de Syrah y `x-worker-branch: bot-prerender`.
  - `/pt/biblioteca-vinho/castas/xarello` contiene `Papel na carta`, `marisco` y `x-worker-branch: bot-prerender`.
  - `/en/wine-library/grapes/chenin-blanc` contiene perfil enriquecido de Chenin Blanc.
- Producción validada como usuario real en navegador:
  - `/biblioteca-vino/uvas/syrah` muestra H1 `Syrah`, inteligencia de servicio, rol en carta y maridajes.
  - `/de/weinbibliothek/rebsorten/syrah` muestra H1 `Syrah`, inteligencia de servicio, rol en carta y maridajes.
  - `/pt/biblioteca-vinho/castas/xarello` muestra H1 `Xarel·lo`, inteligencia de servicio, rol en carta y maridajes.
  - `/en/wine-library/grapes/chenin-blanc` muestra H1 `Chenin Blanc`, inteligencia de servicio, rol en carta y maridajes.
  - No se detectaron errores de consola en las rutas revalidadas.
- No hizo falta modificar ni redeployar Cloudflare Worker.

## Decisiones

- Considerar cerrada la segunda tanda editorial de uvas prioritarias solo tras validar frontend y prerender en producción.
- Mantener como procedimiento: cuando se toque `supabase/functions/prerender`, pedir despliegue explícito de esa Edge Function en Lovable aunque el frontend marque `Published/Up to date`.
- No publicar Worker Cloudflare para este bloque porque la ruta `bot-prerender` funcionó correctamente tras actualizar Edge Function.

## Hipótesis

- Las nuevas 10 uvas prioritarias ya son visibles para Googlebot y crawlers de IA, por lo que pueden empezar a consolidar señales tras recrawl.
- Search Console tardará en reflejar cualquier mejora de cobertura o contenido.
- El siguiente mayor incremento de autoridad temática vendrá de regiones, estilos y maridajes con enlaces internos cruzados.

## Tareas pendientes

- Continuar biblioteca del vino al máximo nivel:
  - ampliar regiones prioritarias;
  - ampliar estilos prioritarios;
  - ampliar maridajes prioritarios;
  - añadir alias visibles para grafías como `Xarel-lo`/`Xarel·lo`;
  - reforzar schema y enlaces internos por intención.
- Monitorizar Search Console para indexación de rutas nuevas/enriquecidas.

## Actualización 2026-05-25: grafo estratégico de biblioteca del vino

## Hechos

- Se inició el siguiente bloque de biblioteca del vino tras la segunda tanda editorial publicada.
- Se añadieron alias de resolución en `src/data/wineLibraryLinks.ts` para capturar variantes sin duplicar URLs:
  - `Xarel-lo`, `Xarel·lo` y `Xarello` -> `xarello`.
  - `Borgoña`/`Borgona` -> `bourgogne`.
  - `Burdeos` -> `bordeaux`.
  - `blanco con lías`, `espumoso método tradicional`, `rosado gastronómico`.
  - `pescado blanco`, `marisco`, `arroces`, `cocina asiática`.
- El resolver de enlaces de biblioteca ahora separa lookup por categoría (`grape`, `region`, `style`, `pairing`) para respetar hints y evitar colisiones como `Champagne` región vs `Champagne` estilo.
- Se creó un grafo estratégico de enlaces internos para conectar uvas, regiones, estilos y maridajes prioritarios.
- Las páginas React de detalle de uva, región, estilo y maridaje ahora anteponen enlaces estratégicos al bloque `RelatedWineLibraryLinks`.
- `supabase/functions/prerender/index.ts` incluye `WINE_LIBRARY_STRATEGIC_LINKS` para que Googlebot y crawlers de IA reciban enlaces internos estratégicos en HTML prerenderizado.
- Verificaciones locales completadas:
  - `npm run test -- --run`: 7 archivos, 21 tests.
  - `npm run build`: correcto.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`: correcto.
  - `git diff --check`: correcto.
  - QA navegador local en `/biblioteca-vino/uvas/xarello`, `/biblioteca-vino/regiones/francia/champagne`, `/biblioteca-vino/estilos/espumoso` y `/biblioteca-vino/maridajes/carnes-rojas`.
- QA local confirmó enlaces estratégicos visibles y resolubles, incluyendo `Champagne` como región en la ficha de espumoso.
- No se detectaron errores de consola en las rutas probadas.
- Este bloque aún no está publicado en producción.

## Decisiones

- No crear slugs duplicados para grafías alternativas: se resuelven mediante alias hacia el slug canónico.
- Mantener `xarello` como slug canónico y cubrir variantes editoriales con alias.
- Resolver colisiones de entidades por categoría, no por prioridad global de strings.
- Priorizar red semántica interna antes de añadir más URLs nuevas.
- Mantener paridad frontend/prerender como requisito: los enlaces estratégicos deben existir también para bots.

## Hipótesis

- El enlazado estratégico aumentará la comprensión temática de la biblioteca al conectar entidades por intención real de restaurante.
- Resolver alias evitará perder búsquedas con grafías frecuentes sin generar canibalización ni duplicados.
- La mejora será visible para Googlebot y LLM crawlers tras desplegar `prerender` desde Lovable.

## Tareas pendientes

- Hecho: commit y push del bloque de grafo estratégico con `80895ac feat: connect wine library entities`.
- Publicar frontend desde Lovable.
- Desplegar explícitamente la Edge Function `prerender` desde Lovable.
- Revalidar producción como usuario real y Googlebot en rutas de uva, región, estilo y maridaje.
- Siguiente ampliación: contenido más profundo para regiones, estilos y maridajes prioritarios, y revisar schema `DefinedTerm`/`ItemList` donde aporte valor.

## Actualización 2026-05-25: grafo estratégico pusheado, deploy Lovable pendiente

## Hechos

- El bloque de grafo estratégico ya está commiteado y subido a `origin/main`.
- Commit publicado en GitHub: `80895ac feat: connect wine library entities`.
- Lovable muestra el commit `feat: connect wine library entities` en el proyecto `Web Winerim`.
- Producción aún no refleja el grafo estratégico en el HTML prerenderizado de bots:
  - `/biblioteca-vino/uvas/xarello` responde con `x-worker-branch: bot-prerender`, pero el bloque `Enlaces relacionados` sigue limitado a hubs generales.
  - `/biblioteca-vino/estilos/espumoso` responde con `x-worker-branch: bot-prerender`, pero todavía no incluye enlaces estratégicos como `Champagne`, `Cava`, `Chardonnay`, `marisco` o `quesos`.
  - `/biblioteca-vino/maridajes/carnes-rojas` responde `200`, pero no contiene los enlaces estratégicos esperados en el prerender.
- Se intentó activar `Update` desde la pestaña autenticada de Lovable, pero la interacción automatizada no cambió el estado del panel.
- macOS mostró un permiso amplio para que Codex controle Finder durante la automatización; no se concedió ese permiso desde la sesión.
- No se ha desplegado Cloudflare Worker para este bloque.

## Decisiones

- Tratar este bloque como completado en código y GitHub, pero no como publicado en producción.
- No afirmar publicación hasta validar que Googlebot recibe los enlaces estratégicos desde `prerender`.
- Mantener el siguiente paso en Lovable: pulsar `Update` y pedir despliegue explícito de la Edge Function `prerender`.
- No desplegar Cloudflare Worker salvo que la validación posterior demuestre que el proxy impide servir el HTML actualizado.

## Hipótesis

- El frontend de Lovable y/o la Edge Function `prerender` siguen sirviendo la versión anterior pese a que GitHub ya tiene el commit nuevo.
- Una vez Lovable aplique el `Update` y despliegue `prerender`, las rutas de biblioteca deberían mostrar el grafo estratégico sin tocar Cloudflare.

## Tareas pendientes

- Hecho: en Lovable, publicar el commit `80895ac feat: connect wine library entities`.
- Hecho: en Lovable, desplegar explícitamente la Supabase Edge Function `prerender`.
- Hecho: revalidar producción como Googlebot:
  - `/biblioteca-vino/uvas/xarello` enlaza a Penedes, Cava, espumoso, marisco y arroces.
  - `/biblioteca-vino/regiones/francia/champagne` enlaza a Chardonnay, Pinot Noir, espumoso, marisco y quesos.
  - `/biblioteca-vino/estilos/espumoso` enlaza `Champagne` como región y `Cava` como estilo.
  - `/biblioteca-vino/maridajes/carnes-rojas` enlaza Tempranillo, Syrah, Cabernet Sauvignon, Rioja y tinto reserva.
- Tras validar producción, retomar ampliación editorial profunda de regiones, estilos, maridajes y schema por entidad.

## Actualización 2026-05-25: grafo estratégico publicado y validado

## Hechos

- Se intentó desplegar `prerender` por CLI, pero falló por ausencia de `SUPABASE_ACCESS_TOKEN`.
- Se envió a Lovable el pedido operativo para desplegar el commit `feat: connect wine library entities` y la Edge Function `prerender`.
- Lovable confirmó `Edge Function prerender desplegada`.
- Se pulsó `Update` en el panel de publicación de Lovable.
- Lovable quedó en estado `Up to date`.
- Producción sirve nuevo asset frontend para usuarios reales: `/assets/index-DAMK02nf.js`.
- Producción como Googlebot quedó validada con enlaces estratégicos en:
  - `/biblioteca-vino/uvas/xarello`;
  - `/biblioteca-vino/regiones/francia/champagne`;
  - `/biblioteca-vino/estilos/espumoso`;
  - `/biblioteca-vino/maridajes/carnes-rojas`.
- Producción como usuario real quedó validada con Chrome headless en `/biblioteca-vino/uvas/xarello`; el DOM renderizado contiene:
  - `/biblioteca-vino/regiones/espana/penedes`;
  - `/biblioteca-vino/estilos/cava`;
  - `/biblioteca-vino/estilos/espumoso`;
  - `/biblioteca-vino/maridajes/pescados-y-mariscos`;
  - `/biblioteca-vino/maridajes/pasta-arroces-y-legumbres`.
- La ruta humana responde con `x-worker-branch: spa`; la ruta bot responde con `x-worker-branch: bot-prerender`.
- No se desplegó Cloudflare Worker.

## Decisiones

- Cerrar el bloque de grafo estratégico como publicado y validado.
- Mantener el procedimiento operativo confirmado:
  - GitHub commit/push;
  - Lovable `Update` para frontend;
  - petición explícita de despliegue de Edge Function `prerender`;
  - validación separada de usuario real y Googlebot.
- No tocar Cloudflare Worker cuando `bot-prerender` funciona y el cambio está en frontend/Edge Function.

## Hipótesis

- El nuevo grafo interno debería mejorar rastreo, comprensión semántica y lectura por LLM crawlers tras recrawl.
- El impacto en Search Console tardará en aparecer y debe medirse por cobertura, impresiones y consultas de biblioteca.

## Tareas pendientes

- Retomar ampliación editorial profunda:
  - regiones prioritarias;
  - estilos prioritarios;
  - maridajes prioritarios;
  - schema `DefinedTerm`/`ItemList` donde aporte valor.
- Monitorizar Search Console tras recrawl.

## Actualización 2026-05-26: primera tanda profunda de regiones prioritarias

## Hechos

- Se implementó localmente la primera tanda editorial profunda de regiones prioritarias de biblioteca del vino.
- Regiones incluidas:
  - `rioja`
  - `ribera-del-duero`
  - `rias-baixas`
  - `rueda`
  - `priorat`
  - `bourgogne`
  - `bordeaux`
  - `champagne`
  - `douro`
  - `vinho-verde`
- Nueva capa creada: `src/data/wineLibraryRegionEditorial.ts`.
- La capa regional incluye servicio, copa, uso por copa, rol en carta, guion de sala, palanca comercial, error a evitar, maridajes y FAQs.
- El contenido está localizado para `es`, `en`, `it`, `fr`, `de` y `pt`.
- `src/pages/RegionDetail.tsx` integra la sección editorial regional cuando existe perfil prioritario.
- `src/pages/RegionDetail.tsx` usa ahora etiquetas principales multilingües de la biblioteca para breadcrumbs, datos clave, secciones, CTA y roles.
- `src/data/regionsLibraryI18n.ts` añade fallbacks localizados para campos profundos de región en idiomas no españoles:
  - estilos;
  - lectura en carta;
  - cuándo destacar;
  - perfil de cliente;
  - estrategia de venta;
  - errores comunes;
  - maridajes;
  - FAQs.
- `supabase/functions/prerender/index.ts` incluye perfiles equivalentes para las 10 regiones prioritarias, manteniendo paridad para Googlebot y crawlers de IA.
- Verificaciones locales completadas:
  - `npm run test -- --run`: 7 archivos, 25 tests.
  - `npm run build`: correcto.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`: correcto.
  - `git diff --check`: correcto.
  - Render test humano en región prioritaria portuguesa: `/pt/biblioteca-vinho/regioes/portugal/vinho-verde`.
- Chrome headless externo con `--dump-dom` se quedó colgado en el entorno local; se cortaron los procesos temporales y se sustituyó esa comprobación por test de render controlado con React Testing Library.
- Producción aún no refleja esta tanda hasta commit/push, publish Lovable y despliegue explícito de `prerender`.

## Decisiones

- Priorizar regiones antes que estilos y maridajes porque conectan intención geográfica, uvas, estilos, maridajes y criterio comercial.
- Mantener las 10 regiones documentadas como primera tanda regional.
- No crear URLs nuevas; el bloque aumenta profundidad editorial sobre rutas existentes.
- Añadir fallbacks localizados profundos para regiones en idiomas internacionales, porque dejar textos españoles en páginas localizadas reduce calidad SEO/LLM.
- Mantener paridad React/prerender como requisito para considerar cerrado el bloque.
- No tocar Cloudflare Worker para este bloque salvo que la validación productiva demuestre un problema de proxy.

## Hipótesis

- La profundidad regional aumentará autoridad temática porque cubre intención geográfica y refuerza enlaces internos ya publicados.
- Evitar mezcla de español en rutas internacionales mejorará la comprensión por Googlebot y crawlers de IA.
- El impacto real dependerá de publicar frontend y `prerender` desde Lovable y de que Google recrawlee las fichas.

## Tareas pendientes

- Commit y push de la primera tanda profunda de regiones prioritarias.
- Publicar frontend desde Lovable.
- Desplegar explícitamente la Edge Function `prerender` desde Lovable.
- Revalidar producción como Googlebot y usuario real en rutas representativas:
  - `/biblioteca-vino/regiones/espana/rioja`;
  - `/de/weinbibliothek/regionen/francia/champagne`;
  - `/pt/biblioteca-vinho/regioes/portugal/vinho-verde`;
  - `/en/wine-library/regions/espana/rioja`.
- Tras validar, continuar con estilos prioritarios, maridajes prioritarios y schema semántico.

## Actualización 2026-05-26: primera tanda de regiones publicada y validada

## Hechos

- Commit creado y pusheado a `origin/main`:
  - `6f6dcd8 feat: deepen priority wine regions`.
- Lovable mostró el commit `feat: deepen priority wine regions`.
- Se publicó frontend desde Lovable con `Update`; Lovable quedó en estado `Up to date`.
- Se pidió a Lovable desplegar explícitamente la Edge Function `prerender`.
- Lovable confirmó:
  - `Edge Function prerender desplegada`.
  - Verificación propia de `/biblioteca-vino/regiones/espana/rioja` sirviendo nuevos perfiles regionales a Googlebot.
- Producción validada como Googlebot:
  - `/biblioteca-vino/regiones/espana/rioja`: `x-prerendered: true`, `x-worker-branch: bot-prerender`, contenido `Rol en carta`, `Rioja es el tinto de confianza`, `cordero asado`.
  - `/de/weinbibliothek/regionen/francia/champagne`: `x-prerendered: true`, `x-worker-branch: bot-prerender`, contenido `Rolle auf der Weinkarte`, `Champagne ist Feier`, `Austern`.
  - `/pt/biblioteca-vinho/regioes/portugal/vinho-verde`: `x-prerendered: true`, `x-worker-branch: bot-prerender`, contenido `Papel na carta`, `Vinho Verde traz frescura`, `marisco`.
  - `/en/wine-library/regions/espana/rioja`: `x-prerendered: true`, `x-worker-branch: bot-prerender`, contenido `Role on the wine list`, `Rioja is the trust red`, `roasted lamb`.
- Producción validada como usuario real con Chrome headless controlado por timeout:
  - `/pt/biblioteca-vinho/regioes/portugal/vinho-verde`: DOM contiene `Como usar Vinho Verde numa carta`, `Papel na carta` y `marisco`.
  - `/de/weinbibliothek/regionen/francia/champagne`: DOM contiene `Wie Champagne auf der Weinkarte funktioniert`, `Rolle auf der Weinkarte` y `Austern`.
- No se desplegó Cloudflare Worker; `bot-prerender` funcionó correctamente tras actualizar Lovable/prerender.
- Contradicción detectada y corregida en documentación: las rutas localizadas de región traducen la sección (`regions`, `regionen`, `regioes`) pero conservan slugs fuente de país (`espana`, `francia`, `portugal`), por lo que `/en/wine-library/regions/spain/rioja` no es la ruta canónica documentada.

## Decisiones

- Cerrar la primera tanda profunda de regiones como publicada y validada.
- Mantener Lovable como vía operativa para frontend y Edge Function `prerender`.
- No tocar Cloudflare Worker cuando producción responde por `bot-prerender` y el contenido actualizado llega correctamente.
- Mantener slugs fuente de país en rutas localizadas hasta que se decida una migración explícita con redirects/hreflang/canonical.

## Hipótesis

- La tanda regional ya es legible por usuarios, Googlebot y crawlers de IA.
- El siguiente salto editorial con menor riesgo debería profundizar estilos prioritarios conectados por el grafo.
- Traducir slugs de país podría mejorar UX internacional, pero implicaría una migración SEO que debe diseñarse aparte.

## Tareas pendientes

- Continuar con estilos prioritarios:
  - tinto crianza;
  - tinto reserva;
  - blanco con lias;
  - espumoso metodo tradicional;
  - rosado gastronomico.
- Después, continuar con maridajes prioritarios y schema semántico por entidad.
- Monitorizar Search Console tras recrawl para cobertura e impresiones de biblioteca del vino.

## Actualización 2026-05-26: primera tanda profunda de estilos prioritarios

## Hechos

- Se implementó la primera tanda profunda de estilos prioritarios de biblioteca del vino.
- Commit creado y pusheado a `origin/main`:
  - `7198d3a feat: deepen priority wine styles`.
- Estilos incluidos:
  - `tinto-crianza`;
  - `tinto-reserva`;
  - `blanco-crianza-lias`;
  - `espumoso`;
  - `rosado-cuerpo`.
- Nueva capa creada: `src/data/wineLibraryStyleEditorial.ts`.
- La capa de estilos incluye temperatura de servicio, copa, uso por copa, rol en carta, guion de sala, palanca comercial, error a evitar, maridajes de carta y FAQs.
- El contenido está localizado para `es`, `en`, `it`, `fr`, `de` y `pt`.
- `src/data/stylesLibrary.ts` añade `blanco-crianza-lias` como ficha completa de estilo, no solo como subtipo ligero.
- `src/data/stylesLibraryI18n.ts` añade nombres localizados y fallbacks profundos para evitar narrativa española en páginas internacionales de estilos.
- `src/pages/StyleDetail.tsx` integra la sección editorial de estilos, etiquetas localizadas, FAQs combinadas y CTA localizado.
- `supabase/functions/prerender/index.ts` incluye perfiles equivalentes para los 5 estilos prioritarios, manteniendo paridad esencial para Googlebot y crawlers de IA.
- `index.html` corrige el idioma enviado al widget de chat para usar el idioma detectado por ruta en vez de caer a `document.documentElement.lang || "es"`.
- Verificaciones locales completadas:
  - `npm run test -- --run`: 7 archivos, 29 tests.
  - `npm run build`: correcto.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`: correcto.
  - `git diff --check`: correcto.
  - Navegador local en `/de/weinbibliothek/weinstile/espumoso`.
  - Navegador local en `/pt/biblioteca-vinho/estilos/blanco-crianza-lias`.
- QA local verificó que las rutas alemana y portuguesa no muestran fuga española relevante en la página ni en el título del widget de chat.
- Intento de publicación posterior al push:
  - La única pestaña Lovable accesible redirige a login.
  - `SUPABASE_ACCESS_TOKEN` no existe en el entorno local.
  - No se pudo publicar frontend ni desplegar `prerender` desde esta sesión.
- Producción aún no refleja esta tanda hasta publicación en Lovable y despliegue explícito de la Edge Function `prerender`.

## Decisiones

- Cerrar el bloque local de estilos como implementado y verificado.
- Mantener la tanda inicial en 5 estilos por impacto práctico en carta y por conexión directa con regiones, uvas y maridajes del grafo.
- Convertir `blanco-crianza-lias` en ficha completa porque era un nodo prioritario sin superficie editorial suficiente.
- Mantener paridad React/prerender también para estilos; no basta con que el usuario humano vea la capa editorial.
- Corregir el idioma del widget de chat como parte de la calidad internacional de las rutas localizadas.
- No tocar Cloudflare Worker para este bloque salvo que la validación productiva demuestre `bot-fallback` o HTML antiguo.

## Hipótesis

- Los estilos prioritarios reforzarán búsquedas de intención práctica como servicio, venta por copa, maridaje y diseño de carta.
- Evitar mezcla de español en páginas `de` y `pt` mejorará la comprensión por Googlebot, crawlers de IA y usuarios internacionales.
- El impacto real dependerá de publicar frontend y `prerender` desde Lovable y esperar recrawl.

## Tareas pendientes

- Publicar frontend desde Lovable.
- Desplegar explícitamente la Edge Function `prerender` desde Lovable.
- Revalidar producción como Googlebot:
  - `/biblioteca-vino/estilos/tinto-crianza`;
  - `/de/weinbibliothek/weinstile/espumoso`;
  - `/pt/biblioteca-vinho/estilos/blanco-crianza-lias`;
  - `/en/wine-library/styles/rosado-cuerpo`.
- Revalidar producción como usuario real:
  - `/de/weinbibliothek/weinstile/espumoso`;
  - `/pt/biblioteca-vinho/estilos/blanco-crianza-lias`.
- Tras validar estilos, continuar con maridajes prioritarios y schema semántico por entidad.

## Actualización 2026-05-26: maridajes prioritarios y schema semántico local

## Hechos

- Se implementó localmente la primera tanda profunda de maridajes prioritarios de biblioteca del vino.
- Commit creado y pusheado a `origin/main`:
  - `fe4d10b feat: deepen priority wine pairings`.
- Maridajes incluidos:
  - `carnes-rojas`;
  - `lubina-dorada` como nodo de pescado blanco;
  - `pescados-y-mariscos` como nodo de marisco;
  - `pasta-arroces-y-legumbres` como nodo de arroces;
  - `cocina-asiatica-y-fusion`;
  - `quesos`.
- Nueva capa creada: `src/data/wineLibraryPairingEditorial.ts`.
- La capa de maridajes incluye momento de servicio, vino por copa, vinos base, rol del maridaje, guion de sala, palanca comercial, error a evitar, ruta de upsell, platos clave y FAQs.
- El contenido está localizado para `es`, `en`, `it`, `fr`, `de` y `pt`.
- `src/data/pairingsLibraryI18n.ts` añade fallbacks profundos para campos visibles de maridajes en idiomas internacionales:
  - principios;
  - notas de platos;
  - errores comunes;
  - alternativas;
  - uso en carta;
  - lenguaje de sala;
  - opciones seguras y diferenciales;
  - conceptos;
  - FAQs.
- `src/data/pairingsLibraryI18n.ts` traduce nombres prioritarios como `lubina-dorada` a intención real de pescado blanco en `en/fr/it/de/pt`.
- `src/data/pairingsLibraryI18n.ts` localiza términos narrativos de estilos para evitar fugas como `Blanco aromático` en rutas alemanas o portuguesas.
- `src/pages/PairingDetail.tsx` integra la sección editorial de maridajes, etiquetas localizadas, FAQs combinadas, CTA localizado y schema `DefinedTerm`.
- `src/pages/GrapeDetail.tsx`, `src/pages/RegionDetail.tsx` y `src/pages/StyleDetail.tsx` ahora emiten JSON-LD `@graph` con `Article` + `DefinedTerm`, alineando la semántica de todas las entidades principales de la biblioteca.
- `supabase/functions/prerender/index.ts` incluye perfiles equivalentes para los 6 maridajes prioritarios, manteniendo paridad esencial para Googlebot y crawlers de IA.
- Verificaciones locales completadas:
  - `npx tsc --noEmit --pretty false`: correcto.
  - `npm run test -- --run`: 7 archivos, 33 tests.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`: correcto.
  - `git diff --check`: correcto.
  - `npm run build`: correcto.
  - Browser QA local en `/de/weinbibliothek/weinbegleitung/cocina-asiatica-y-fusion`.
  - Browser QA local en `/pt/biblioteca-vinho/harmonizacoes/lubina-dorada`.
- QA local verificó que las rutas alemana y portuguesa de maridajes muestran `DefinedTerm`, un solo `FAQPage`, no muestran `¿` y no usan términos narrativos españoles como `Blanco aromático`.
- Producción aún no refleja estilos ni maridajes hasta publicación en Lovable y despliegue explícito de la Edge Function `prerender`.
- Se reintentó abrir Lovable tras el push de `fe4d10b`, pero `https://lovable.dev/projects/2c4eed0e-6760-45f0-aeb3-ce44de8e91f1` redirige a login en el navegador disponible.
- Revalidación productiva posterior al push: las rutas de estilos/maridajes responden `bot-prerender`, pero siguen sirviendo HTML antiguo sin las nuevas secciones ni títulos localizados profundos.

## Decisiones

- Avanzar localmente con maridajes aunque la publicación de estilos siga bloqueada por Lovable/login, porque el usuario pidió continuar hasta cerrar la biblioteca.
- No marcar como cerrado en producción ningún bloque que dependa de Lovable hasta validar frontend y `prerender`.
- Tratar `lubina-dorada` como nodo de intención `pescado blanco`, porque así conecta mejor con la intención SEO documentada.
- Tratar `pescados-y-mariscos` como nodo de intención `marisco`, manteniendo el slug existente para no crear nuevas URLs.
- Añadir `DefinedTerm` en las cuatro familias de detalle: uvas, regiones, estilos y maridajes.
- Mantener `FAQPage` único por página de detalle mediante `FAQSection`.
- No tocar Cloudflare Worker para este bloque salvo que producción demuestre `bot-fallback` o HTML antiguo tras actualizar Lovable.

## Hipótesis

- La biblioteca queda localmente mucho más cerca de "máximo nivel" porque ya cubre uvas, regiones, estilos, maridajes, enlaces internos, FAQs y schema semántico por entidad.
- El salto SEO/LLM real dependerá de publicar frontend y `prerender`, y después de recrawl.
- Los siguientes incrementos deberían centrarse en producción, QA, legacy shortcuts y ampliación masiva de más entidades, no en reabrir la arquitectura base.

## Tareas pendientes

- Publicar frontend desde Lovable.
- Desplegar explícitamente la Edge Function `prerender` desde Lovable.
- Revalidar producción como Googlebot:
  - `/biblioteca-vino/estilos/tinto-crianza`;
  - `/de/weinbibliothek/weinstile/espumoso`;
  - `/pt/biblioteca-vinho/estilos/blanco-crianza-lias`;
  - `/biblioteca-vino/maridajes/carnes-rojas`;
  - `/de/weinbibliothek/weinbegleitung/cocina-asiatica-y-fusion`;
  - `/pt/biblioteca-vinho/harmonizacoes/lubina-dorada`.
- Revalidar producción como usuario real:
  - `/de/weinbibliothek/weinstile/espumoso`;
  - `/pt/biblioteca-vinho/estilos/blanco-crianza-lias`;
  - `/de/weinbibliothek/weinbegleitung/cocina-asiatica-y-fusion`;
  - `/pt/biblioteca-vinho/harmonizacoes/lubina-dorada`.
- Tras validar producción, auditar legacy shortcuts de biblioteca y decidir redirects/metadatos únicos.

## Actualización 2026-05-26: estilos y maridajes validados en producción

## Hechos

- El usuario confirmó que Lovable/frontend y producción ya estaban publicados.
- Se revalidó producción como Googlebot con cache-bust en las rutas pendientes.
- Googlebot recibe HTTP 200, `x-prerendered: true` y `x-worker-branch: bot-prerender` en:
  - `/biblioteca-vino/estilos/tinto-crianza`;
  - `/de/weinbibliothek/weinstile/espumoso`;
  - `/pt/biblioteca-vinho/estilos/blanco-crianza-lias`;
  - `/biblioteca-vino/maridajes/carnes-rojas`;
  - `/de/weinbibliothek/weinbegleitung/cocina-asiatica-y-fusion`;
  - `/pt/biblioteca-vinho/harmonizacoes/lubina-dorada`.
- El prerender productivo ya incluye la capa editorial esencial de estilos y maridajes:
  - rol en carta o papel en carta;
  - lectura de servicio;
  - argumento de sala;
  - maridajes/platos clave;
  - error a evitar;
  - un `Article`;
  - un solo `FAQPage`.
- Producción como usuario real validada en navegador para:
  - `/de/weinbibliothek/weinstile/espumoso`;
  - `/pt/biblioteca-vinho/estilos/blanco-crianza-lias`;
  - `/de/weinbibliothek/weinbegleitung/cocina-asiatica-y-fusion`;
  - `/pt/biblioteca-vinho/harmonizacoes/lubina-dorada`.
- En frontend humano, las cuatro rutas muestran los bloques avanzados, un solo `FAQPage` y `DefinedTerm`.
- Queda resuelta la contradicción anterior: antes del último publish el prerender mostraba HTML antiguo; tras el publish confirmado por el usuario, producción ya contiene la capa profunda.

## Decisiones

- Cerrar en producción la primera tanda profunda de estilos y maridajes prioritarios.
- Considerar cerrado el bloque principal actual de biblioteca del vino: uvas, regiones, estilos, maridajes, grafo interno, FAQs, paridad multilingüe y prerender esencial.
- Mantener como línea separada la mejora futura de la plantilla de prerender para que sus H1/títulos usen alias localizados más editoriales, aunque el contenido esencial ya está presente.
- Pasar el siguiente frente de biblioteca a legacy shortcuts, ampliación masiva de entidades y monitorización en Search Console.

## Hipótesis

- El recrawl de Google debería empezar a ver la capa profunda de estilos y maridajes desde este despliegue.
- La diferencia entre H1/título del prerender compacto y H1/título del frontend humano puede mejorarse en una tanda futura, pero no bloquea el cierre del bloque principal.
- Los próximos saltos de SEO vendrán más de legacy shortcuts, enlaces internos, más entidades y Search Console que de seguir reabriendo la arquitectura base.

## Tareas pendientes

- Hecho: resolver los 96 legacy shortcuts de biblioteca con redirects canónicos en Worker de producción.
- Monitorizar Search Console para cobertura, recrawl e impresiones de las rutas enriquecidas.
- Definir la siguiente expansión masiva de entidades por demanda SEO:
  - más regiones;
  - estilos secundarios;
  - platos concretos;
  - más uvas internacionales.
- Mejorar en una tanda futura los títulos/H1 del prerender compacto para usar alias localizados de entidad cuando exista perfil editorial.

## Actualización 2026-05-26: legacy shortcuts de biblioteca resueltos

## Hechos

- Se implementó y publicó el mapa de redirects canónicos para los 96 legacy shortcuts de biblioteca del vino detectados en auditoría pública.
- Los 96 shortcuts corresponden a 16 slugs antiguos en 6 idiomas.
- Nuevo archivo: `src/data/wineLibraryLegacyRedirects.ts`.
- `src/pages/BibliotecaDetalle.tsx` redirige los shortcuts legacy hacia la ruta canónica localizada antes de renderizar un 404.
- `cloudflare-worker-v3-hybrid.js` redirige en el borde las URLs legacy de una sola parte hacia la entidad canónica localizada con 301 permanente.
- Tests actualizados:
  - `src/test/wine-library-links.test.ts`;
  - `src/test/wine-library-seo-surface.test.ts`.
- Verificaciones completadas:
  - `npm run test -- --run src/test/wine-library-links.test.ts src/test/wine-library-seo-surface.test.ts`: 12 tests correctos.
  - `npx tsc --noEmit --pretty false`: correcto.
  - `npm run test -- --run`: 7 archivos, 35 tests correctos.
  - `npm run build`: correcto, con avisos no bloqueantes ya conocidos de Browserslist y chunks grandes.
  - `npm run deploy:worker:dry-run`: correcto.
  - `git diff --check`: correcto.
- Commit y push completados: `d37044e fix: redirect legacy wine library shortcuts`.
- Cloudflare Worker `winerim-proxy` desplegado con Version ID `c4d375bb-5280-41fe-b793-549be14f17c4`.
- Producción validada:
  - 96/96 legacy shortcuts devuelven HTTP 301.
  - 96/96 apuntan al destino canónico esperado.
  - 96/96 emiten `X-Worker-Branch: wine-library-legacy-redirect`.
  - Destinos representativos en `es`, `en`, `it`, `fr`, `de` y `pt` responden HTTP 200 con `X-Prerendered: true` y `X-Worker-Branch: bot-prerender`.
- No se realizó publicación manual desde Lovable en esta sesión; la corrección crítica para SEO ya está activa en el Worker de producción.

## Decisiones

- Resolver los shortcuts legacy con 301 canónicos, no con metadatos únicos, para evitar canibalización contra las rutas nuevas de entidad.
- Mantener las rutas nuevas de biblioteca como superficie principal indexable.
- Duplicar el mapa mínimo en Worker porque el Worker no importa módulos TypeScript del frontend y debe poder redirigir antes de servir la SPA.
- Mantener una redirección equivalente en React como defensa secundaria para navegación de cliente o bundles futuros.

## Hipótesis

- Google debería consolidar señales de las URLs antiguas hacia las rutas canónicas nuevas tras recrawl.
- La reducción de páginas legacy con H1/título genérico debería mejorar calidad de cobertura y disminuir canibalización interna.
- La publicación Lovable del bundle React puede ser útil para alinear la SPA, pero no bloquea el resultado SEO directo porque el Worker ya intercepta las URLs.

## Tareas pendientes

- Monitorizar en Search Console si las URLs legacy pasan a aparecer como redirigidas o canónicas alternativas correctas.
- Si Search Console mantiene ejemplos legacy sin actualizar, reintentar inspección o solicitar indexación de una tanda corta de destinos canónicos.
- Publicar desde Lovable cuando se haga el siguiente publish general para que la defensa secundaria de React quede también en el bundle servido.
- Continuar con la siguiente expansión editorial masiva de biblioteca:
  - más regiones;
  - estilos secundarios;
  - platos/maridajes concretos;
  - más uvas internacionales.

## Actualización 2026-05-26: expansión editorial masiva local de biblioteca

## Hechos

- Se implementó localmente una expansión editorial masiva de biblioteca del vino sobre rutas canónicas ya existentes.
- Nueva capa creada: `src/data/wineLibraryEditorialExpansion.ts`.
- Cobertura editorial local tras la expansión:
  - 30 uvas prioritarias.
  - 22 regiones prioritarias.
  - 15 estilos prioritarios.
  - 18 maridajes/platos prioritarios.
- Nuevas uvas añadidas a la capa prioritaria:
  - `mencia`;
  - `cabernet-franc`;
  - `gamay`;
  - `gewurztraminer`;
  - `viognier`;
  - `gruner-veltliner`;
  - `pinot-grigio`;
  - `barbera`;
  - `primitivo`;
  - `aglianico`.
- Nuevas regiones ampliadas mediante perfil editorial localizado:
  - `toscana`;
  - `napa-valley`;
  - `jerez`;
  - `vallee-du-rhone`;
  - `piemonte`;
  - `barossa-valley`;
  - `marlborough`;
  - `mendoza`;
  - `mosel`;
  - `willamette-valley`;
  - `sancerre`;
  - `barolo`.
- Nuevos estilos ampliados mediante perfil editorial localizado:
  - `tinto-joven`;
  - `tinto-ligero`;
  - `tinto-cuerpo`;
  - `blanco-joven`;
  - `blanco-mineral`;
  - `champagne`;
  - `cava`;
  - `fino-manzanilla`;
  - `pedro-ximenez`;
  - `orange-maceracion-corta`.
- Nuevos maridajes/platos ampliados mediante perfil editorial localizado:
  - `aves-y-caza`;
  - `verduras-y-cocina-vegetariana`;
  - `postres-y-chocolate`;
  - `tapas-y-aperitivos`;
  - `solomillo-de-ternera`;
  - `cordero-asado`;
  - `pato-confitado`;
  - `atun-rojo`;
  - `pulpo-gallego`;
  - `risotto-setas`;
  - `ostras`;
  - `chocolate-negro`.
- La expansión se integró en:
  - `src/data/wineLibraryEditorial.ts`;
  - `src/data/wineLibraryRegionEditorial.ts`;
  - `src/data/wineLibraryStyleEditorial.ts`;
  - `src/data/wineLibraryPairingEditorial.ts`;
  - `supabase/functions/prerender/index.ts`.
- El `prerender` incluye perfiles compactos equivalentes para la nueva tanda, manteniendo paridad esencial para Googlebot y crawlers de IA.
- Se corrigió una contradicción técnica detectada durante esta sesión:
  - El Worker ya redirige 96 shortcuts legacy de biblioteca.
  - El sitemap seguía listando los 16 shortcuts legacy españoles como rutas enviadas.
  - `supabase/functions/sitemap/index.ts` ahora excluye esos shortcuts legacy del sitemap para no enviar URLs 301.
- QA local en navegador:
  - `/de/weinbibliothek/weinstile/fino-manzanilla` carga sin 404 y con canonical alemán.
  - `/pt/biblioteca-vinho/harmonizacoes/ostras` carga sin 404 y con canonical portugués.
  - `/fr/bibliotheque-vin/regions/francia/sancerre` carga sin 404 y con canonical francés.
  - No se detectaron errores de consola en las rutas probadas.
- Verificaciones locales completadas:
  - `npx tsc --noEmit --pretty false`.
  - `npm run test -- --run src/test/wine-library-editorial.test.ts src/test/wine-library-seo-surface.test.ts`.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`.
  - `npm run test -- --run`: 7 archivos, 35 tests correctos.
  - `npm run build`.
  - `git diff --check`.
- Avisos no bloqueantes durante build:
  - Browserslist/caniuse-lite desactualizado.
  - Chunks grandes por encima de 200 kB.

## Decisiones

- Ampliar la biblioteca sin crear nuevas rutas: usar rutas canónicas existentes y añadir profundidad editorial.
- Usar una capa de expansión localizada reutilizable para cubrir más entidades con consistencia en los seis idiomas.
- Mantener los perfiles manuales profundos como capa superior y usar la expansión arquetípica como segunda ola editorial.
- El sitemap no debe enviar shortcuts legacy que ya son 301; deben quedar fuera y consolidar señal hacia las rutas canónicas.
- No tocar Cloudflare Worker en esta tanda porque no cambia la lógica de redirects ni del proxy.

## Hipótesis

- Esta tanda debería aumentar la cobertura informacional y la utilidad comercial de la biblioteca en consultas long-tail de regiones, estilos, platos y uvas internacionales.
- La mejora SEO/LLM real dependerá de publicar el frontend en Lovable y desplegar explícitamente las Edge Functions `sitemap` y `prerender`.
- Quitar URLs 301 del sitemap debería reducir señales contradictorias para Google tras el siguiente recrawl.

## Tareas pendientes

- Hecho: commit y push de la expansión editorial masiva.
- Publicar frontend desde Lovable.
- Desplegar explícitamente desde Lovable:
  - Edge Function `sitemap`;
  - Edge Function `prerender`.
- Revalidar producción como usuario real:
  - `/de/weinbibliothek/weinstile/fino-manzanilla`;
  - `/pt/biblioteca-vinho/harmonizacoes/ostras`;
  - `/fr/bibliotheque-vin/regions/francia/sancerre`.
- Revalidar producción como Googlebot:
  - las mismas tres rutas anteriores;
  - `/sitemap.xml` sin shortcuts legacy españoles;
  - una uva nueva, por ejemplo `/de/weinbibliothek/rebsorten/mencia`.
- Monitorizar Search Console para legacy shortcuts y nuevas entidades enriquecidas.

## Actualización 2026-05-26: producción validada y ajuste final de sitemap

## Hechos

- El usuario indicó que la publicación ya estaba disponible y se revalidó producción.
- Producción como Googlebot responde HTTP 200, `x-prerendered: true` y `x-worker-branch: bot-prerender` en:
  - `/de/weinbibliothek/weinstile/fino-manzanilla`;
  - `/pt/biblioteca-vinho/harmonizacoes/ostras`;
  - `/fr/bibliotheque-vin/regions/francia/sancerre`.
- El HTML prerenderizado productivo contiene la nueva capa compacta de expansión:
  - Fino/Manzanilla en alemán con rol en carta y temperatura `7-9 C`.
  - Ostras en portugués con Champagne/Cava/Muscadet y papel en carta.
  - Sancerre en francés con temperatura `8-10 C` y maridajes de mar.
- Producción como usuario real validada en navegador:
  - las tres rutas cargan sin 404;
  - canonical correcto;
  - sin errores de consola;
  - sin `¿` detectado.
- `sitemap.xml` público ya no contiene los 16 shortcuts legacy españoles como `<loc>`.
- Se detectó una nueva laguna local antes del cierre:
  - algunas entidades de expansión prerenderizaban pero no estaban en `WINE_LIBRARY_DYNAMIC_ROUTES`.
  - Faltaban en sitemap rutas como `ostras`, `solomillo-de-ternera`, `mendoza`, `mosel`, `willamette-valley`, `sancerre` y `barolo`.
- Se corrigió localmente `supabase/functions/sitemap/index.ts` para incluir todas las entidades expandidas faltantes.
- Se actualizó `src/test/wine-library-seo-surface.test.ts` para cubrir esa presencia en sitemap.
- Verificaciones del ajuste final:
  - `npm run test -- --run src/test/wine-library-seo-surface.test.ts`: 8 tests correctos.
  - `npx --yes deno-bin check supabase/functions/sitemap/index.ts supabase/functions/prerender/index.ts`: correcto.
  - `npm run test -- --run`: 7 archivos, 35 tests correctos.
  - `npm run build`: correcto, con avisos no bloqueantes de Browserslist y chunks grandes.
  - `git diff --check`: correcto.
- Commit y push completados:
  - `9f99fa7 fix: include expanded wine entities in sitemap`.
- La producción aún necesita publicar el commit `9f99fa7` desde Lovable y desplegar explícitamente la Edge Function `sitemap` para que esas rutas adicionales entren en el sitemap público.

## Decisiones

- Considerar la capa de contenido/prerender de la expansión como publicada y validada en rutas representativas.
- No considerar cerrado el sitemap de la expansión hasta desplegar `9f99fa7` desde Lovable.
- No tocar Cloudflare Worker porque los redirects y `bot-prerender` funcionan.

## Hipótesis

- Tras desplegar `sitemap`, Google debería descubrir mejor los maridajes/platos concretos y regiones nuevas de la expansión.
- El mayor riesgo residual no es contenido, sino que Lovable no haya desplegado aún la última Edge Function `sitemap`.

## Tareas pendientes

- Publicar desde Lovable el commit `9f99fa7`.
- Desplegar explícitamente Edge Function `sitemap`.
- Revalidar producción:
  - `https://winerim.wine/sitemap.xml` contiene `/biblioteca-vino/maridajes/ostras`;
  - contiene `/biblioteca-vino/regiones/francia/sancerre`;
  - mantiene `0` shortcuts legacy españoles como `<loc>`.
- Después, reenviar o revalidar sitemap en Search Console.

## Actualización 2026-05-26: sitemap de expansión validado en producción

## Hechos

- El usuario confirmó que el último despliegue ya estaba publicado.
- Producción validada tras el despliegue del commit `9f99fa7`.
- `https://winerim.wine/sitemap.xml` contiene las rutas de expansión que faltaban:
  - `/biblioteca-vino/maridajes/ostras`;
  - `/biblioteca-vino/maridajes/solomillo-de-ternera`;
  - `/biblioteca-vino/regiones/francia/sancerre`;
  - `/biblioteca-vino/regiones/argentina/mendoza`;
  - `/biblioteca-vino/regiones/alemania/mosel`;
  - `/biblioteca-vino/regiones/estados-unidos/willamette-valley`;
  - `/biblioteca-vino/regiones/italia/barolo`.
- El sitemap público mantiene `0` shortcuts legacy españoles como `<loc>`.
- Conteo observado del sitemap público: 2.054 bloques `<loc>`.
- Googlebot validado en:
  - `/pt/biblioteca-vinho/harmonizacoes/ostras`: HTTP 200, `x-prerendered: true`, `x-worker-branch: bot-prerender`, `inLanguage: pt`, `FAQPage`.
  - `/de/weinbibliothek/rebsorten/mencia`: HTTP 200, `x-prerendered: true`, `x-worker-branch: bot-prerender`, `inLanguage: de`, `FAQPage`.
- Repo limpio en `main` tras la validación.

## Decisiones

- Cerrar como publicada y validada la expansión editorial masiva de biblioteca del vino, incluyendo contenido, prerender y sitemap.
- Mantener Cloudflare Worker sin cambios porque redirects legacy y `bot-prerender` funcionan.
- La siguiente acción ya no es código de biblioteca, sino monitorización y acciones de Search Console.

## Hipótesis

- El sitemap validado debería facilitar el descubrimiento de las nuevas entidades concretas tras recrawl.
- Search Console tardará días o semanas en mostrar consolidación de shortcuts legacy y nuevas rutas enriquecidas.

## Tareas pendientes

- Hecho: reenviar `/sitemap.xml` en Search Console.
- Solicitar indexación solo para una tanda corta de URLs estratégicas si Search Console lo permite:
  - `/biblioteca-vino/maridajes/ostras`;
  - `/biblioteca-vino/regiones/francia/sancerre`;
  - `/de/weinbibliothek/rebsorten/mencia`.
- Monitorizar cobertura:
  - shortcuts legacy como redirigidas;
  - rutas nuevas como descubiertas/indexadas;
  - cambios de impresiones en biblioteca del vino.
- Siguiente ola recomendada: usar datos de Search Console antes de añadir más entidades.

## Actualización 2026-05-26: sitemap reenviado en Search Console

## Hechos

- Search Console estaba accesible con la cuenta `gugocreative@gmail.com`.
- En la propiedad `https://winerim.wine/`, se reenvió `/sitemap.xml`.
- Search Console mostró confirmación:
  - `Se ha enviado el sitemap correctamente`.
- La fila de `/sitemap.xml` quedó con:
  - Enviado: `26 may 2026`.
  - Última lectura: `24 may 2026`.
  - Estado: `Correcto`.
  - Páginas descubiertas: `2.072`.
- La última lectura no cambió inmediatamente; Google indica que lo procesará periódicamente.

## Decisiones

- No solicitar indexación masiva en esta sesión.
- Esperar a que Search Console relea el sitemap antes de priorizar otra expansión editorial.

## Hipótesis

- Google puede tardar en actualizar `Última lectura`, cobertura y páginas descubiertas tras el reenvío.
- Una tanda corta de inspección/indexación manual puede ser útil cuando el sitemap aparezca leído de nuevo.

## Tareas pendientes

- Revisar Search Console más adelante para confirmar nueva fecha de `Última lectura`.
- Si Search Console lo permite, inspeccionar una tanda corta:
  - `/biblioteca-vino/maridajes/ostras`;
  - `/biblioteca-vino/regiones/francia/sancerre`;
  - `/de/weinbibliothek/rebsorten/mencia`.
- Monitorizar cobertura e impresiones de biblioteca del vino.

## Actualización 2026-05-27: Search Console tras recrawl de sitemap

## Hechos

- Al iniciar la continuación se leyeron `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- El repo estaba limpio en `main` y sincronizado con `origin/main`.
- Search Console mostró que `/sitemap.xml` ya fue releído:
  - Enviado: `26 may 2026`.
  - Última lectura: `26 may 2026`.
  - Estado: `Correcto`.
  - Páginas descubiertas: `2.054`.
  - Vídeos descubiertos: `0`.
- Search Console sigue mostrando `/sitemap_index.xml` como sitemap enviado antiguo:
  - Enviado: `22 dic 2022`.
  - Última lectura: `18 may 2026`.
  - Estado: `Correcto`.
  - Páginas descubiertas: `1.358`.
- Se inspeccionó la tanda corta estratégica:
  - `https://winerim.wine/biblioteca-vino/maridajes/ostras`;
  - `https://winerim.wine/biblioteca-vino/regiones/francia/sancerre`;
  - `https://winerim.wine/de/weinbibliothek/rebsorten/mencia`.
- Estado de inspección:
  - `ostras`: `La URL no está en Google`; motivo indicado: `Google no reconoce esta URL`.
  - `sancerre`: `La URL no está en Google`; motivo indicado: `Descubierta: actualmente sin indexar`.
  - `mencia`: `La URL no está en Google`; motivo indicado: `Descubierta: actualmente sin indexar`.
- Prueba en vivo de las tres URLs:
  - Search Console indica `La URL está disponible para Google`.
  - Search Console indica que la página se puede indexar.
- No se pulsó `Solicitar indexación`.

## Decisiones

- Mantener la regla de no solicitar indexación manual sin confirmación explícita justo antes de pulsar el botón.
- No abrir una nueva ola editorial todavía: la siguiente mejora debe partir del comportamiento real de indexación y consultas.
- Tratar la tanda corta como candidata razonable para solicitud manual de indexación si el usuario lo confirma.

## Hipótesis

- El bloqueo actual de las tres URLs no es técnico: Google puede acceder a ellas y las ve indexables.
- `sancerre` y `mencia` ya están en cola de descubrimiento; falta que Google las rastree/indexe.
- `ostras` puede tardar algo más en aparecer como descubierta porque Google acaba de releer el sitemap.
- Search Console puede tardar días o semanas en reflejar cobertura e impresiones de la expansión.

## Tareas pendientes

- Si el usuario confirma explícitamente, solicitar indexación manual de:
  - `/biblioteca-vino/maridajes/ostras`;
  - `/biblioteca-vino/regiones/francia/sancerre`;
  - `/de/weinbibliothek/rebsorten/mencia`.
- Revisar en unos días si esas URLs pasan a:
  - indexada;
  - descubierta sin indexar;
  - rastreada sin indexar;
  - canónica alternativa.
- Revisar si Search Console permite retirar o dejar de priorizar `/sitemap_index.xml`, que sigue enviado desde 2022.

## Actualización 2026-05-27: solicitud manual de indexación

## Hechos

- El usuario confirmó solicitar indexación manual de la tanda corta estratégica.
- Se solicitó indexación manual en Search Console para:
  - `https://winerim.wine/de/weinbibliothek/rebsorten/mencia`;
  - `https://winerim.wine/biblioteca-vino/regiones/francia/sancerre`;
  - `https://winerim.wine/biblioteca-vino/maridajes/ostras`.
- Search Console mostró confirmación en las tres URLs:
  - `Se ha solicitado la indexación`.
- Search Console indicó que las URLs quedaron añadidas a una cola de rastreo prioritaria.
- No se solicitó indexación masiva ni se tocaron otras URLs.

## Decisiones

- Ejecutar solo la tanda corta confirmada por el usuario.
- Mantener la monitorización como siguiente paso, sin seguir solicitando indexación URL a URL de forma masiva.

## Hipótesis

- Las solicitudes pueden acelerar el primer rastreo o recrawl, pero no garantizan indexación.
- Si alguna URL queda como `Rastreada: actualmente sin indexar`, el siguiente trabajo deberá centrarse en enlazado interno, señales de calidad y demanda real.

## Tareas pendientes

- Revisar en Search Console el estado de las tres URLs tras unos días.
- Monitorizar si pasan a:
  - indexadas;
  - descubiertas sin indexar;
  - rastreadas sin indexar;
  - canónicas alternativas.
- No abrir otra tanda masiva de solicitudes manuales sin revisar primero el resultado de esta tanda.

## Actualización 2026-05-27: saneamiento adicional de 404 en Search Console

## Hechos

- Se revisó el informe `Páginas` de Search Console tras la solicitud manual de indexación.
- Estado observado en Search Console:
  - `Indexadas`: 67.
  - `No se ha encontrado (404)`: 197 URLs.
  - `Página alternativa con etiqueta canónica adecuada`: 66 URLs.
  - `Página con redirección`: 18 URLs.
  - `Duplicada: el usuario no ha indicado ninguna versión canónica`: 3 URLs.
  - `Excluida por una etiqueta "noindex"`: 1 URL.
  - `Descubierta: actualmente sin indexar`: 1.758 URLs.
  - `Rastreada: actualmente sin indexar`: 133 URLs.
  - `Duplicada: Google ha elegido una versión canónica diferente a la del usuario`: 2 URLs.
- Se abrió el detalle de `/sitemap_index.xml` en Search Console.
- `/sitemap_index.xml` sigue enviado en Search Console, con:
  - Última lectura: `18/5/26`.
  - Páginas descubiertas: `1.358`.
  - Estado: sitemap procesado correctamente.
- Producción ya redirige `https://winerim.wine/sitemap_index.xml` con 301 a `https://winerim.wine/sitemap.xml`.
- Search Console ofrece la opción `Quitar sitemap` para `/sitemap_index.xml`, pero no se ejecutó.
- Se abrió el grupo `No se ha encontrado (404)` y se revisaron ejemplos visibles.
- Antes de la corrección, dos ejemplos visibles seguían siendo 404 reales en producción:
  - `https://winerim.wine/corso-vino-cata-mw-examen-practico`;
  - `https://winerim.wine/winerim-sommelier-magazine/`.
- Se añadieron dos redirects directos de alta confianza en `cloudflare-worker-v3-hybrid.js`:
  - `/corso-vino-cata-mw-examen-practico` -> `/decision-center/cursos`;
  - `/winerim-sommelier-magazine` -> `/sommelier-corner`.
- Verificaciones:
  - `npm run deploy:worker:dry-run`: correcto.
  - `git diff --check`: correcto.
  - Worker `winerim-proxy` desplegado con Version ID `b32cd9a2-63fe-40d5-97a4-5087a179f0b6`.
- Producción validada:
  - `/corso-vino-cata-mw-examen-practico` devuelve 301 a `/decision-center/cursos`.
  - `/winerim-sommelier-magazine` devuelve 301 a `/sommelier-corner`.
  - `/winerim-sommelier-magazine/` normaliza primero trailing slash y acaba en `/sommelier-corner`.
  - Los 10 ejemplos 404 visibles revisados en Search Console acaban ahora en HTTP 200 tras redirects.

## Decisiones

- Resolver solo redirects legacy de alta confianza con equivalencia semántica clara.
- No quitar `/sitemap_index.xml` de Search Console sin confirmación explícita del usuario.
- No iniciar validación del grupo 404 de Search Console todavía sin revisar si el conjunto completo está suficientemente cubierto.

## Hipótesis

- Estos redirects deberían reducir ejemplos visibles del grupo 404 tras el siguiente recrawl.
- El grupo 404 aún puede contener URLs no cubiertas; validar el grupo completo puede fallar si hay más ejemplos activos sin destino.
- Quitar `/sitemap_index.xml` de Search Console limpiaría el panel, pero no es urgente porque en producción redirige correctamente a `/sitemap.xml`.

## Tareas pendientes

- Commit y push del redirect Worker y documentación.
- Revisar más ejemplos del grupo 404 antes de pedir validación completa.
- Pedir confirmación explícita si se decide quitar `/sitemap_index.xml` en Search Console.
- Pedir confirmación explícita si se decide iniciar `Validar corrección` para el grupo 404.

## Actualización 2026-06-01: seguimiento Search Console e indexación biblioteca

## Hechos

- Al iniciar la sesión se leyeron `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- El repo estaba limpio en `main` antes de tocar código.
- Search Console para `https://winerim.wine/` muestra `/sitemap.xml` con:
  - Enviado: `26 may 2026`.
  - Última lectura: `30 may 2026`.
  - Estado: `Correcto`.
  - Páginas descubiertas: `2.054`.
- Search Console sigue mostrando `/sitemap_index.xml` enviado desde `22 dic 2022`, con:
  - Última lectura: `28 may 2026`.
  - Estado: `Correcto`.
  - Páginas descubiertas: `2.054`.
- Informe `Páginas`, última actualización `29/5/26`:
  - `Indexadas`: 102.
  - `Sin indexar`: 2.331.
  - `No se ha encontrado (404)`: 189.
  - `Página alternativa con etiqueta canónica adecuada`: 29.
  - `Página con redirección`: 23.
  - `Excluida por una etiqueta "noindex"`: 3.
  - `Duplicada: el usuario no ha indicado ninguna versión canónica`: 3.
  - `Descubierta: actualmente sin indexar`: 1.930.
  - `Rastreada: actualmente sin indexar`: 153.
  - `Duplicada: Google ha elegido una versión canónica diferente a la del usuario`: 1.
- Las tres URLs estratégicas de biblioteca del vino con indexación manual solicitada el 2026-05-27 aparecen ahora como indexadas:
  - `https://winerim.wine/de/weinbibliothek/rebsorten/mencia`.
  - `https://winerim.wine/biblioteca-vino/regiones/francia/sancerre`.
  - `https://winerim.wine/biblioteca-vino/maridajes/ostras`.
- En las tres URLs, Search Console indica:
  - `La página está indexada`.
  - Último rastreo por `Robot de Google para smartphones` el `27 may 2026`.
  - Rastreo permitido: `Sí`.
  - Obtención de página: `Correcto`.
  - Indexación permitida: `Sí`.
  - Canónica declarada igual a la URL inspeccionada.
  - Canónica elegida por Google: `URL inspeccionada`.
  - HTTPS válido, breadcrumbs válidos y `Preguntas frecuentes` válidas.
- Se revisó el grupo 404 en Search Console con 100 ejemplos visibles.
- En producción, antes de los cambios locales nuevos:
  - 87 de esos 100 ejemplos respondían con primer salto 301.
  - 13 respondían con primer salto 404.
  - Siguiendo redirecciones completas, 47 acababan en 200, 51 en 404 y 2 en 410.
- Se detectó una familia clara de 404 mal formados: rutas con patrón `/https:/winerim.wine/...`.
- Se añadieron cambios locales en `cloudflare-worker-v3-hybrid.js`:
  - Normalización genérica de rutas mal formadas `/https:/winerim.wine/...` hacia su path real.
  - Redirects directos de alta confianza para legacy de Search Console con equivalente claro, incluyendo `analiza-tu-carta`, CTAs antiguos, artículos de sommelier existentes, páginas de carta digital, maridajes, IA restaurantes y rutas de artículo con slug existente.
- Verificación local del Worker:
  - `npm run deploy:worker:dry-run`: correcto.
  - `git diff --check`: correcto.
  - Import local del Worker confirma 301 para ejemplos como `/https:/winerim.wine/fr/integrations`, `/analiza-tu-carta`, `/simone-monese` y `/carta-vinos-digital`.
- El despliegue real del Worker quedó bloqueado:
  - `npm run deploy:worker` falló con Cloudflare `Authentication error [code: 10000]`.
  - `wrangler whoami` detecta un OAuth token con permisos, pero el API rechaza la operación de deploy.

## Decisiones

- Tratar la indexación de `mencia`, `sancerre` y `ostras` como señal positiva: la infraestructura de biblioteca del vino es rastreable, canónica e indexable para Google.
- No solicitar más indexación manual de forma masiva.
- No quitar `/sitemap_index.xml` desde Search Console sin confirmación explícita.
- No iniciar `Validar corrección` del grupo 404 hasta desplegar los nuevos redirects y revisar más ejemplos o el conjunto completo.
- Mantener criterio de redirects de alta confianza: equivalencia semántica clara o normalización técnica inequívoca.
- Separar bloqueo de Cloudflare: los cambios están listos localmente, pero producción no los refleja hasta renovar sesión/token y desplegar.

## Hipótesis

- La solicitud manual corta aceleró el rastreo de las tres URLs de biblioteca, pero la indexación final también dependió de que canonical, FAQ, breadcrumbs y prerender estuvieran limpios.
- El aumento de indexadas de 67 a 102 sugiere que Google está empezando a procesar el bloque nuevo, aunque el cuello principal sigue siendo `Descubierta: actualmente sin indexar`.
- El grupo 404 debería bajar cuando Google recrawlee redirects ya existentes y cuando se despliegue la normalización pendiente del Worker.
- Las URLs `/https:/winerim.wine/...` probablemente vienen de enlaces absolutos mal serializados en algún momento histórico; normalizarlas a su path real es más correcto que dejarlas como 404.

## Tareas pendientes

- Restaurar autenticación Cloudflare Wrangler o proporcionar `CLOUDFLARE_API_TOKEN` válido.
- Desplegar `cloudflare-worker-v3-hybrid.js` con los redirects nuevos.
- Validar producción tras despliegue:
  - `/https:/winerim.wine/fr/integrations` -> `/fr/integrations`.
  - `/analiza-tu-carta` -> `/analisis-carta`.
  - `/simone-monese` -> `/article/simone-monese`.
  - `/carta-vinos-digital` -> `/software-carta-de-vinos`.
- Recalcular los 100 ejemplos visibles de 404 después del deploy.
- Decidir con confirmación explícita si se retira `/sitemap_index.xml` de Search Console.
- Decidir con confirmación explícita si se inicia `Validar corrección` para 404 cuando producción esté saneada.
- Monitorizar en Search Console si `Descubierta: actualmente sin indexar` baja y si las rutas nuevas de biblioteca empiezan a recibir impresiones.

## Actualización 2026-06-01: despliegue Worker completado

## Hechos

- Se renovó la autenticación de Wrangler mediante OAuth Cloudflare con la cuenta `gugocreative@gmail.com`.
- Se rechazó instalar Cloudflare skills cuando Wrangler lo preguntó durante el login.
- Wrangler 4 requería Node >= 22; se usó el Node del runtime de workspace (`v24.14.0`) para ejecutar `wrangler@4.95.0`.
- Se desplegó Cloudflare Worker `winerim-proxy` con Version ID `fda7c63b-ae88-4e3f-98c4-9d48ee39edc2`.
- Producción validada tras el deploy:
  - `/https:/winerim.wine/fr/integrations` devuelve 301 a `/fr/integrations` y termina en 200.
  - `/https:/winerim.wine/fr/conditions` devuelve 301 a `/fr/conditions` y termina en 200.
  - `/https:/winerim.wine/en/guides/how-to-train-staff-to-sell-wine` devuelve 301 a `/en/guides/how-to-train-staff-to-sell-wine` y termina en 200.
  - `/analiza-tu-carta` devuelve 301 a `/analisis-carta` y termina en 200.
  - `/simone-monese` devuelve 301 a `/article/simone-monese` y termina en 200.
  - `/carta-vinos-digital` devuelve 301 a `/software-carta-de-vinos` y termina en 200.
  - `/contacto-analizar-carta` devuelve 301 a `/analisis-carta` y termina en 200.
  - `/como-ser-sommelier-formacion-funciones-y-salidas-profesionales` devuelve 301 a `/decision-center/cursos` y termina en 200.
- Recalculada la muestra de 100 ejemplos visibles de 404 de Search Console tras el deploy:
  - 95 acaban en HTTP 200.
  - 3 acaban en HTTP 404.
  - 2 acaban en HTTP 410.
- Los 3 ejemplos que siguen en 404 son:
  - `/los-mejores-restaurantes-de-cataluna-para-disfrutar-del-vino/`;
  - `/kit-digital/`;
  - `/facturacion-y-contratos/`.
- Los 2 ejemplos que terminan en 410 son:
  - `/meet-our-winemaker-john-duo/`;
  - `/castillo-ygay-gran-reserva-especial-recognized-as-the-best-wine-in-the-world/`.
- `npm run deploy:worker:dry-run` vuelve a funcionar con la sesión renovada de Wrangler.

## Decisiones

- No forzar redirects para los 3 404 restantes de la muestra porque no tienen equivalente semántico claro documentado.
- Mantener 410 para contenidos antiguos sin equivalente útil cuando ya está configurado así.
- Considerar producción saneada para la muestra visible principal de 404, pero no iniciar validación en Search Console sin confirmación explícita.
- Mantener el script actual de dry-run como válido; para deploy real con Wrangler 4 se usó Node 24 del runtime por requisito de versión.

## Hipótesis

- El grupo 404 de Search Console debería mejorar tras el siguiente recrawl porque 95 de los 100 ejemplos visibles ya no terminan en 404.
- La validación 404 podría seguir fallando si Google prueba URLs no visibles en la primera muestra que aún acaban en 404.
- Los 3 404 restantes pueden dejarse como 404 hasta decidir si merecen 410 o un destino editorial específico.

## Tareas pendientes

- Esperar recrawl de Google para que Search Console actualice el grupo 404.
- Revisar más ejemplos si Search Console mantiene muchos 404 después del recrawl.
- Decidir si los 3 404 restantes de la muestra deben:
  - permanecer como 404;
  - responder 410;
  - redirigir a un destino nuevo si se define equivalencia real.
- Pedir confirmación explícita antes de iniciar `Validar corrección` del grupo 404.
- Pedir confirmación explícita antes de retirar `/sitemap_index.xml`.

## Actualización 2026-06-01: enlazado interno de hubs de biblioteca

## Hechos

- Al retomar la sesión se leyeron `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- El repo estaba limpio en `main` antes de empezar el bloque de enlazado interno.
- Se confirmó en código que las fichas detalle de uvas, regiones, estilos y maridajes ya renderizan `RelatedWineLibraryLinks` con relaciones entre entidades.
- Se creó `src/components/biblioteca/StrategicWineLibraryRoutes.tsx`.
- El nuevo componente expone rutas estratégicas por hub:
  - biblioteca principal;
  - uvas;
  - regiones;
  - estilos;
  - maridajes.
- Cada bloque conecta uvas, regiones, estilos y maridajes prioritarios mediante rutas curadas de alta intención, por ejemplo:
  - Tempranillo -> Rioja -> Ribera del Duero -> Tinto crianza;
  - Albariño -> Rías Baixas -> Godello -> Blanco con crianza sobre lías;
  - Ostras -> Pescados y mariscos -> Quesos -> Carnes rojas;
  - Champagne -> Espumoso -> Cava -> Xarel·lo.
- El componente resuelve nombres desde las fuentes localizadas de biblioteca y rutas con `getWineLibraryPath`, por lo que funciona también en `de` y `pt`.
- Se insertó el bloque en:
  - `src/pages/BibliotecaVino.tsx`;
  - `src/pages/GrapesHub.tsx`;
  - `src/pages/RegionsHub.tsx`;
  - `src/pages/StylesHub.tsx`;
  - `src/pages/PairingsHub.tsx`.
- En los hubs con filtros o búsqueda, el bloque se muestra solo en la vista inicial sin filtros para no interferir con la intención de búsqueda del usuario.
- Verificaciones ejecutadas:
  - `npm run test`: correcto, 35 tests pasan.
  - `npm run build`: correcto.
  - `git diff --check`: correcto.
  - `npx eslint src/components/biblioteca/StrategicWineLibraryRoutes.tsx src/pages/BibliotecaVino.tsx src/pages/GrapesHub.tsx src/pages/RegionsHub.tsx src/pages/StylesHub.tsx src/pages/PairingsHub.tsx`: correcto.
- `npm run lint` completo sigue fallando por deuda previa no relacionada con estos cambios, principalmente `no-explicit-any`, `no-empty-object-type`, `no-require-imports` y warnings de fast-refresh en archivos no tocados.
- Validación local en navegador sobre `http://127.0.0.1:8080`:
  - el bloque aparece en `/biblioteca-vino`;
  - las rutas estratégicas aparecen en `/biblioteca-vino/uvas`, `/biblioteca-vino/regiones`, `/biblioteca-vino/estilos` y `/biblioteca-vino/maridajes`;
  - `/de/weinbibliothek` genera enlaces localizados como `/de/weinbibliothek/rebsorten/tempranillo`;
  - `/pt/biblioteca-vinho` genera enlaces localizados como `/pt/biblioteca-vinho/castas/tempranillo`;
  - no se detectó overflow horizontal en desktop.

## Decisiones

- Reforzar primero los hubs de biblioteca porque reparten autoridad interna y ayudan al descubrimiento de URLs nuevas.
- No duplicar lógica en las fichas detalle, ya que esas páginas ya tenían relaciones internas.
- Usar rutas editoriales curadas en lugar de un listado automático masivo, para mantener relevancia semántica y evitar ruido.
- Mantener los bloques dentro de la experiencia editorial de biblioteca, no como CTAs comerciales agresivos.
- No solicitar indexación manual nueva por este cambio; el siguiente paso SEO debe ser desplegar, validar y monitorizar recrawl.

## Hipótesis

- El nuevo enlazado desde hubs debería mejorar descubrimiento, contexto semántico y reparto de autoridad hacia entidades prioritarias.
- El impacto en Search Console dependerá del despliegue en producción y del siguiente recrawl de Google.
- Las rutas nuevas deberían ayudar especialmente a URLs en estado `Descubierta: actualmente sin indexar`.
- Puede haber margen adicional en de/pt si se detectan nombres de platos o entidades que aún dependan de overlays incompletos.

## Tareas pendientes

- Hecho en actualización posterior del 2026-06-01: frontend y prerender de hubs estratégicos quedaron reflejados en producción.
- Validar producción tras deploy en:
  - `/biblioteca-vino`;
  - `/biblioteca-vino/uvas`;
  - `/biblioteca-vino/regiones`;
  - `/biblioteca-vino/estilos`;
  - `/biblioteca-vino/maridajes`;
  - `/de/weinbibliothek`;
  - `/pt/biblioteca-vinho`.
- Hecho en actualización posterior del 2026-06-01: las rutas estratégicas aparecen en HTML/prerender para bots.
- Monitorizar en Search Console si baja `Descubierta: actualmente sin indexar` y si suben impresiones long-tail de biblioteca.
- Mantener pendiente, con confirmación explícita, cualquier acción de `Validar corrección` 404 o retirada de `/sitemap_index.xml`.

## Actualización 2026-06-01: prerender de rutas estratégicas de biblioteca

## Hechos

- Al iniciar esta continuación se leyeron `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- El repositorio estaba en `main` y limpio respecto a `origin/main` antes de aplicar el nuevo ajuste.
- Producción ya tenía publicado el bundle frontend con `StrategicWineLibraryRoutes`, incluyendo textos y rutas para `es`, `en`, `it`, `fr`, `de` y `pt`.
- Se detectó una contradicción operativa: el frontend humano publicado sí incluía las rutas estratégicas, pero el HTML prerenderizado para Googlebot no las incluía en home ni hubs de biblioteca.
- Se corrigió `supabase/functions/prerender/index.ts` para que el prerender añada rutas estratégicas internas en:
  - Home de biblioteca del vino.
  - Hubs de uvas, regiones, estilos y maridajes.
  - Rutas localizadas `es`, `en`, `it`, `fr`, `de` y `pt`.
- La corrección añade grupos de rutas estratégicas en prerender y los conecta tanto en la rama estática de `/biblioteca-vino` como en el renderer dinámico de hubs.
- Commit creado y pusheado a `main`: `0c44042 fix: mirror wine library hub links in prerender`.
- Verificaciones locales completadas:
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts`.
  - `git diff --check`.
  - `npm run test`: 7 archivos, 35 tests.
  - `npm run build`.
  - Smoke test local con Googlebot contra la Edge Function en `/biblioteca-vino`, hubs ES y homes `de`/`pt`.
- Lovable desplegó explícitamente la Edge Function `prerender` tras pedirlo desde el chat del proyecto.
- Revalidación de producción como Googlebot completada:
  - `/biblioteca-vino`, `/biblioteca-vino/uvas`, `/biblioteca-vino/regiones`, `/biblioteca-vino/estilos` y `/biblioteca-vino/maridajes` responden 200 con `X-Worker-Branch: bot-prerender`, `X-Prerendered: true`, canonical propio, texto estratégico y enlaces internos.
  - `/en/wine-library` y `/en/wine-library/grapes` responden con texto y enlaces estratégicos localizados.
  - `/it/biblioteca-vino` y `/it/biblioteca-vino/vitigni` responden con texto y enlaces estratégicos localizados.
  - `/fr/bibliotheque-vin` y `/fr/bibliotheque-vin/cepages` responden con texto y enlaces estratégicos localizados.
  - `/de/weinbibliothek` y `/de/weinbibliothek/rebsorten` responden con texto y enlaces estratégicos localizados.
  - `/pt/biblioteca-vinho` y `/pt/biblioteca-vinho/castas` responden con texto y enlaces estratégicos localizados.
- No hizo falta redesplegar Cloudflare Worker ni publicar frontend adicional: la brecha estaba en `prerender` y producción quedó verde tras desplegar esa Edge Function.

## Decisiones

- Tratar el prerender como parte obligatoria del cierre SEO: un bloque visible en React no se considera publicado para SEO hasta que Googlebot lo recibe en HTML.
- Mantener por ahora la lista estratégica duplicada en React y `prerender` para resolver la urgencia de indexabilidad.
- No tocar Worker ni frontend cuando la revalidación productiva confirma que el cambio crítico ya está servido por `bot-prerender`.

## Hipótesis

- Al exponer rutas estratégicas internas en el HTML para bots, Google y crawlers de IA deberían descubrir mejor las entidades prioritarias de la biblioteca.
- Search Console puede tardar varios días en reflejar la mejora de rastreo e indexación.
- La siguiente mejora de mayor impacto será reducir duplicación entre frontend/prerender y seguir aumentando profundidad editorial/schema de entidades prioritarias.

## Tareas pendientes

- Monitorizar en Search Console el recrawl de `/biblioteca-vino` y hubs principales.
- Considerar extraer la matriz estratégica de biblioteca a una fuente compartida o generada para evitar divergencias entre React y `prerender`.
- Continuar el bloque de máximo nivel de biblioteca: más profundidad editorial, schema por entidad, enlaces por intención y priorización de URLs para indexación manual.

## Actualización 2026-06-01: cluster de blog para biblioteca del vino

## Hechos

- Al retomar esta continuación se revisaron los documentos fuente de verdad del proyecto antes de cerrar estado.
- Se confirmó que el blog usa Supabase `articles` como fuente principal y `src/data/articles.ts` solo como fallback si la tabla no devuelve contenido.
- Se confirmó que `ArticlePage` lee artículos desde Supabase por `slug`, con fallback a español para idiomas no disponibles.
- Se confirmó que `supabase/functions/prerender/index.ts` renderiza artículos desde la tabla `articles`, por lo que las mejoras de prerender afectan a artículos ya existentes y futuros.
- Antes del cambio, el prerender de artículos no exponía `related_links` ni enlaces markdown del cuerpo como enlaces internos detectables; solo añadía navegación genérica.
- Se mejoró `src/components/article/ArticleRelatedContent.tsx` para sugerir enlaces a biblioteca del vino, uvas, regiones y maridajes cuando el artículo trata vino, uvas, regiones o maridaje.
- Se mejoró `supabase/functions/prerender/index.ts` para construir enlaces internos de artículo desde:
  - `related_links` de la base de datos;
  - enlaces markdown presentes en el cuerpo;
  - reglas semánticas hacia biblioteca del vino, uvas, regiones, estilos, maridajes, análisis de carta y demo;
  - fallback genérico solo cuando no haya señales mejores.
- Se creó la migración `supabase/migrations/20260601093000_add_wine_library_blog_cluster.sql`.
- La migración añade, si falta, la columna `article_group` y publica 3 artículos españoles:
  - `biblioteca-vino-restaurante-vender-mas`;
  - `uvas-regiones-equipo-sala-vender-vino`;
  - `maridajes-carta-vinos-rentable`.
- Verificaciones locales completadas:
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts`;
  - `npm run test`: 7 archivos, 35 tests;
  - `npm run build`;
  - `npx eslint src/components/article/ArticleRelatedContent.tsx`;
  - `git diff --check`.
- Commit creado y pusheado a `main`: `cbe8a80 feat: add wine library blog cluster`.
- Lovable añadió además el commit remoto `cdd6e8f Apliqué la migración del blog`, con una migración SQL generada por Lovable para el mismo cluster.
- Quedan dos archivos de migración idempotentes para el cluster (`20260601075446_d8d6d927-c2fc-4a8b-bc75-2f7b34f3e59c.sql` y `20260601093000_add_wine_library_blog_cluster.sql`); ambos usan `ADD COLUMN IF NOT EXISTS` y `ON CONFLICT (slug) DO UPDATE`, por lo que no duplican artículos.
- Lovable desplegó la Edge Function `prerender` y aplicó la migración SQL en Supabase.
- Supabase público devuelve los 3 nuevos artículos como `published=true`, `lang=es` y `published_at` el 2026-06-01.
- Producción validada como Googlebot:
  - los 3 artículos responden HTTP 200;
  - `X-Worker-Branch: bot-prerender`;
  - `X-Prerendered: true`;
  - `Content-Type: text/html; charset=utf-8`;
  - títulos reales del artículo presentes;
  - enlaces HTML detectables hacia `/biblioteca-vino`, `/biblioteca-vino/uvas`, `/biblioteca-vino/regiones`, `/biblioteca-vino/maridajes`, `/analisis-carta` y `/demo`.
- `https://winerim.wine/sitemap.xml` responde 200 desde la rama `sitemap`, contiene 2.057 URLs y ya incluye los 3 nuevos artículos.
- No se detectaron contradicciones nuevas durante este cierre; sí se mantiene como riesgo operativo la duplicación de reglas entre frontend y prerender.

## Decisiones

- Sí conviene publicar artículos nuevos en el blog, pero como clusters tácticos de alta intención, no como volumen genérico.
- El primer cluster debe reforzar la biblioteca del vino y conectar contenido informacional con acciones comerciales: análisis de carta y demo.
- Los artículos nuevos deben incluir enlaces internos contextuales desde el cuerpo y `related_links`; el prerender debe exponerlos en HTML para bots.
- Empezar en español permite validar indexación, CTR y enlaces internos antes de traducir a `en`, `it`, `fr`, `de` y `pt`.
- No solicitar indexación masiva: priorizar una tanda corta de URLs estratégicas y monitorizar señales reales.

## Hipótesis

- Este cluster puede aumentar autoridad temática de la biblioteca del vino al conectar blog, hubs, entidades y herramientas comerciales.
- Los nuevos enlaces HTML en prerender deberían ayudar a Google y crawlers de IA a descubrir mejor la relación entre artículos y biblioteca.
- El impacto dependerá de que Google rastree el sitemap actualizado y de que Search Console permita solicitar indexación para una tanda reducida.
- Traducir los artículos sin validar primero el rendimiento español podría crear más URLs con señales débiles; conviene priorizar por datos.

## Tareas pendientes

- Solicitar indexación en Search Console, si la herramienta lo permite, para:
  - `/article/biblioteca-vino-restaurante-vender-mas`;
  - `/article/uvas-regiones-equipo-sala-vender-vino`;
  - `/article/maridajes-carta-vinos-rentable`;
  - `/biblioteca-vino`;
  - `/biblioteca-vino/uvas`;
  - `/biblioteca-vino/regiones`;
  - `/biblioteca-vino/maridajes`.
- Monitorizar en Search Console impresiones, CTR, cobertura e indexación de los 3 artículos.
- Decidir el siguiente cluster editorial por datos: gestión de carta, maridajes rentables, formación de sala, regiones estratégicas o comparativas de software.
- Traducir a otros idiomas solo los artículos que muestren potencial o que refuercen rutas internacionales prioritarias.
- Considerar una fuente compartida para reglas de enlaces internos entre React y `prerender`.
- No crear una tercera migración para estos mismos 3 artículos; si se limpia la redundancia, hacerlo como tarea explícita y revisando historial de migraciones aplicadas.

## Actualización 2026-06-01: artículos localizados y salto de idioma en blog

## Hechos

- El usuario señaló dos problemas nuevos:
  - los artículos estratégicos deberían publicarse en todos los idiomas, adaptados a mercado/país;
  - al navegar por la web, sobre todo en blog, la experiencia saltaba al español.
- Se revisaron de nuevo los documentos fuente de verdad antes de actuar.
- Se detectó la causa principal del salto de idioma:
  - `Blog.tsx` y `SommelierCorner.tsx` enlazaban artículos traducidos a `/article/{slug}` sin prefijo de idioma;
  - al entrar en `/article/{slug}`, `LanguageProvider` detectaba `es` porque la ruta no llevaba `/en`, `/it`, `/fr`, `/de` o `/pt`.
- Se añadió `src/lib/articleRoutes.ts` para centralizar:
  - eliminación de sufijos `_en`, `_it`, `_fr`, `_de`, `_pt`;
  - inferencia de idioma desde slugs legacy;
  - construcción de slugs de base de datos;
  - construcción de rutas localizadas limpias `/{lang}/article/{slug}`.
- `Blog.tsx` ahora enlaza artículos en el idioma activo:
  - español: `/article/{slug}`;
  - otros idiomas: `/{lang}/article/{slug}`.
- `SommelierCorner.tsx` aplica el mismo patrón para entrevistas traducidas.
- `ArticlePage.tsx` ahora:
  - busca en Supabase el slug correcto por idioma;
  - soporta rutas legacy `/article/{slug}_en` y rutas limpias `/en/article/{slug}`;
  - canonicaliza artículos traducidos hacia la ruta limpia localizada;
  - mantiene enlaces de vuelta al blog/Sommelier del idioma solicitado;
  - ajusta `document.documentElement.lang` al idioma real del artículo cargado.
- `LanguageSwitcher.tsx` reconoce rutas de artículo y conserva el slug base al cambiar de idioma.
- `supabase/functions/prerender/index.ts` ahora entiende rutas de artículos localizadas `/{lang}/article/{slug}`, renderiza el slug correcto de Supabase y canonicaliza a la URL localizada limpia.
- `supabase/functions/sitemap/index.ts` ahora consulta `lang` en artículos y emite:
  - `/article/{slug}` para español;
  - `/{lang}/article/{slug}` para artículos internacionales.
- Se creó la migración `supabase/migrations/20260601102000_add_localized_wine_library_blog_cluster.sql`.
- La migración añade 15 artículos localizados/adaptados para el cluster de biblioteca del vino:
  - `en`, `it`, `fr`, `de` y `pt`;
  - 3 temas por idioma: biblioteca del vino, uvas/regiones/castas/rebsorten/cépages y maridajes/abbinamenti/accords/harmonizações/Weinbegleitung.
- Los contenidos se adaptaron con ejemplos de mercado:
  - inglés: UK/internacional;
  - italiano: Italia, Piemonte, Toscana, Veneto;
  - francés: Francia, Bourgogne, Loire, Champagne;
  - alemán: DACH, Riesling, Spätburgunder, Mosel/Rheingau/Wachau;
  - portugués: Portugal, Douro, Dão, Alentejo, Vinho Verde.
- Verificaciones locales completadas:
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`;
  - `npm run test`: 8 archivos, 38 tests;
  - `npx eslint src/lib/articleRoutes.ts src/pages/Blog.tsx src/pages/ArticlePage.tsx src/pages/SommelierCorner.tsx src/components/LanguageSwitcher.tsx`;
  - `npm run build`;
  - `git diff --check`.
- No se pudo hacer QA de navegación visual con el navegador integrado porque el backend `iab` no estaba disponible.
- No se pudo hacer QA headless con Playwright porque `playwright`, `@playwright/test`, `puppeteer` y `puppeteer-core` no están instalados en el repo.
- Commit creado y pusheado a `main`: `9eb4b76 fix: localize blog article routes`.
- Supabase público todavía no devuelve las versiones `_en`, `_it`, `_fr`, `_de` y `_pt` del nuevo cluster; por tanto, la migración está lista en GitHub pero pendiente de aplicar desde Lovable.
- Estado antes del cierre productivo posterior: producción todavía requería despliegue Lovable de:
  - frontend;
  - Edge Function `prerender`;
  - Edge Function `sitemap`;
  - migración SQL `20260601102000_add_localized_wine_library_blog_cluster.sql`.

## Decisiones

- Sí, los artículos estratégicos deben publicarse en todos los idiomas relevantes, pero con adaptación real de mercado y no como traducción literal.
- Antes de escalar artículos internacionales, había que corregir la raíz técnica del salto a español.
- La URL pública canónica de artículos internacionales pasa a ser `/{lang}/article/{slug}`, aunque la base de datos conserve slugs con sufijo `{slug}_{lang}`.
- Mantener compatibilidad con slugs legacy como `/article/{slug}_en`, pero canonicalizarlos a la ruta limpia.
- No considerar publicadas las adaptaciones internacionales hasta que Lovable aplique la migración y despliegue `sitemap`/`prerender`.

## Hipótesis

- El salto al español en blog debería desaparecer tras desplegar el frontend porque los enlaces ya mantienen el prefijo de idioma.
- El prerender localizado de artículos debería evitar que bots reciban home genérica o canonical español en rutas internacionales.
- Las adaptaciones por mercado deberían reforzar SEO internacional y posicionamiento en LLMs más que traducciones literales.
- El sitemap localizado de artículos debería mejorar descubrimiento de las nuevas URLs internacionales tras despliegue.

## Tareas pendientes

- Publicar desde Lovable el commit `9eb4b76`.
- Aplicar desde Lovable la migración `20260601102000_add_localized_wine_library_blog_cluster.sql`.
- Desplegar explícitamente Edge Functions `prerender` y `sitemap`.
- Revalidar producción tras deploy:
  - `/en/blog` debe enlazar a `/en/article/...`;
  - `/it/blog`, `/fr/blog`, `/de/blog` y `/pt/blog` deben mantener su idioma al abrir artículos;
  - Googlebot en `/{lang}/article/biblioteca-vino-restaurante-vender-mas` debe recibir `bot-prerender`, `html lang` correcto y canonical localizado;
  - `sitemap.xml` debe incluir las 15 rutas localizadas nuevas.
- Después de validar producción, solicitar indexación selectiva de los artículos internacionales prioritarios, no indexación masiva.

## Actualización 2026-06-01: cierre productivo de blog internacional

## Hechos

- Se continuó tras revisar `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- Lovable aplicó la migración `supabase/migrations/20260601102000_add_localized_wine_library_blog_cluster.sql`.
- Supabase público devuelve 15 artículos localizados publicados:
  - 3 temas de biblioteca del vino;
  - 5 idiomas internacionales: `en`, `it`, `fr`, `de`, `pt`.
- Lovable desplegó las Edge Functions `prerender` y `sitemap`.
- Producción validada como Googlebot:
  - `/en/article/biblioteca-vino-restaurante-vender-mas` responde `html lang="en"`, canonical inglés y contenido inglés.
  - `/it/article/uvas-regiones-equipo-sala-vender-vino` responde `html lang="it"` y contenido italiano.
  - `/fr/article/maridajes-carta-vinos-rentable` responde `html lang="fr"` y contenido francés.
  - `/de/article/biblioteca-vino-restaurante-vender-mas` responde `html lang="de"` y contenido alemán.
  - `/pt/article/maridajes-carta-vinos-rentable` responde `html lang="pt"` y contenido portugués.
- `https://winerim.wine/sitemap.xml` contiene 2.072 URLs e incluye las nuevas rutas internacionales `/{lang}/article/...`.
- Se publicó frontend desde Lovable y quedó `Up to date`.
- En navegador real de producción, `/en/blog` enlaza artículos a `/en/article/...` y no a `/article/...`, por lo que ya no fuerza detección española.
- En navegador real de producción, `/en/article/biblioteca-vino-restaurante-vender-mas` mantiene `lang="en"`, canonical inglés, H1 inglés y enlaces internos ingleses.
- Se detectó un residuo de UI española en artículos internacionales: índice, herramientas, relacionados y CTAs.
- Se corrigió y publicó el commit `ee9da93 fix: localize article support blocks`.
- Producción validada en navegador real tras `ee9da93`:
  - no aparece `Contenido del artículo`;
  - no aparece `Herramientas útiles`;
  - no aparece `Contenido relacionado`;
  - aparecen `ARTICLE CONTENTS`, `Useful tools`, `Related content` y `Free wine list analysis`.
- Verificaciones locales del bloque final:
  - ESLint dirigido en archivos tocados;
  - `git diff --check`;
  - `npm run test -- --run`: 8 archivos, 38 tests;
  - `npm run build`.
- El build mantiene avisos no bloqueantes de Browserslist desactualizado y chunks grandes.

## Decisiones

- Dar por resuelto el salto a español del blog para rutas de artículo localizadas tras validar frontend, prerender y sitemap.
- Mantener `/{lang}/article/{slug}` como URL pública canónica para artículos internacionales.
- Mantener slugs internos de Supabase con sufijo `_{lang}` por compatibilidad.
- Publicar los artículos estratégicos internacionales como adaptaciones por mercado, no traducciones literales.
- No tocar de nuevo base de datos ni Edge Functions para el pulido de UI; el último cambio fue solo frontend.
- No solicitar indexación hasta tener producción completa validada, lo que ya queda cumplido para este cluster.

## Hipótesis

- El cluster internacional debería reforzar la autoridad temática de la biblioteca del vino en mercados internacionales si Google rastrea las nuevas URLs del sitemap.
- Corregir rutas, canonical, idioma y UI reducirá señales contradictorias para SEO internacional y LLMs.
- Search Console puede tardar días o semanas en reflejar indexación, impresiones y CTR de las nuevas URLs.

## Tareas pendientes

- Solicitar indexación selectiva en Search Console para una tanda corta de artículos internacionales prioritarios, empezando por:
  - `/en/article/biblioteca-vino-restaurante-vender-mas`;
  - `/de/article/biblioteca-vino-restaurante-vender-mas`;
  - `/pt/article/maridajes-carta-vinos-rentable`.
- Monitorizar en Search Console cobertura, impresiones y CTR de los 18 artículos del cluster completo.
- Revisar si quedan residuos de UI española en otros tipos de páginas internacionales, especialmente herramientas y recursos legacy.
- Extraer en el futuro reglas compartidas de rutas/enlaces de artículos para reducir duplicación entre React y `prerender`.

## Actualización 2026-06-04: schema e i18n de hubs de biblioteca del vino

## Hechos

- Se continuó tras revisar `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- El repositorio estaba limpio, en `main`, alineado con `origin/main`, antes de empezar este bloque.
- Se añadió soporte en `SEOHead` para recibir `structuredData` explícito y evitar que los hubs de biblioteca hereden schema genérico de `SoftwareApplication`.
- Se creó `src/components/seo/wineLibrarySchema.ts` para generar JSON-LD de hubs con `CollectionPage`, `DefinedTermSet`, `ItemList` y `BreadcrumbList`.
- `BibliotecaVino`, `GrapesHub`, `RegionsHub`, `StylesHub` y `PairingsHub` ya emiten schema específico de biblioteca del vino en frontend.
- Se localizaron las FAQs visibles de los hubs en `es`, `en`, `it`, `fr`, `de` y `pt`.
- Se corrigieron residuos de UI española en hubs:
  - `GrapesHub`: etiquetas de color y badge `Guía`;
  - `RegionsHub`: subtítulo fijo en inglés y roles de carta en español.
- Se actualizó `supabase/functions/prerender/index.ts` para:
  - emitir `ItemList` en páginas `CollectionPage`;
  - localizar encabezado de FAQ;
  - localizar navegación, footer y descripción de Organization;
  - añadir FAQs útiles en hubs de sección;
  - localizar etiquetas de rutas estratégicas de biblioteca del vino para bots.
- Verificación local del prerender como Googlebot:
  - `/en/wine-library/grapes`;
  - `/pt/biblioteca-vinho/harmonizacoes`;
  - `/de/weinbibliothek/rebsorten`.
- Verificaciones ejecutadas:
  - ESLint dirigido en archivos tocados;
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`;
  - `npm run test -- --run`: 8 archivos, 38 tests;
  - `npm run build`;
  - `git diff --check`.
- El build mantiene avisos no bloqueantes de Browserslist desactualizado y chunks grandes.
- Este bloque todavía requiere publicación de frontend en Lovable y despliegue de la Edge Function `prerender` para verse en producción.

## Decisiones

- Tratar los hubs de biblioteca como `CollectionPage` con `ItemList`, no como `SoftwareApplication`.
- Mantener los slugs de URL estables aunque las etiquetas visibles se localicen por idioma.
- Mantener por ahora la matriz de rutas estratégicas en el componente visible y reutilizarla para schema, para evitar divergencias entre UI y JSON-LD.
- Priorizar paridad entre React humano y prerender para bots antes de ampliar más volumen editorial.

## Hipótesis

- El schema específico de hubs debería mejorar la comprensión de Google y LLMs sobre la arquitectura de la biblioteca del vino.
- La localización del HTML prerenderizado debería reducir señales contradictorias en rutas internacionales.
- El impacto en Search Console dependerá de publicar el frontend, desplegar `prerender` y esperar recrawl.

## Tareas pendientes

- Crear commit y push de este bloque.
- Publicar frontend desde Lovable.
- Desplegar explícitamente la Edge Function `prerender`.
- Revalidar producción como Googlebot en muestras `en`, `pt` y `de`.
- Continuar con schema de entidades de detalle:
  - `GrapeDetail`;
  - `RegionDetail`;
  - `StyleDetail`;
  - `PairingDetail`;
  - `BibliotecaDetalle`.
- Revisar si detalle de entidades duplica Article JSON-LD y decidir consolidación.
- Continuar la indexación selectiva pendiente en Search Console tras validar producción.

## Actualización 2026-06-04: push completado y despliegue pendiente

## Hechos

- Commit creado y pusheado a `main`: `9a14725 fix: enrich wine library hub schema`.
- El árbol local quedó limpio tras el push.
- Se intentó abrir Lovable en el navegador interno, pero redirige a `https://lovable.dev/login?redirect=%2Fprojects%2F2c4eed0e-6760-45f0-aeb3-ce44de8e91f1`.
- No hay sesión local Supabase CLI ni variable `SUPABASE_ACCESS_TOKEN`.
- El intento directo de desplegar `prerender` por CLI falló con: `Access token not provided`.
- No se desplegó Cloudflare Worker; este bloque no requiere cambios de Worker.

## Decisiones

- Dejar el cambio listo en `main` y no marcarlo como publicado en producción hasta que Lovable publique frontend y despliegue `prerender`.
- No intentar métodos alternativos de deploy sin credenciales explícitas.

## Hipótesis

- Lovable podrá publicar el frontend desde el commit `9a14725` y desplegar `prerender` con la sesión autenticada del proyecto.
- Producción seguirá sirviendo el HTML prerenderizado anterior hasta ese despliegue.

## Tareas pendientes

- En Lovable, publicar el proyecto desde `main`.
- En Lovable, desplegar explícitamente la Edge Function `prerender`.
- Revalidar producción después del deploy antes de pedir más indexación en Search Console.

## Actualización 2026-06-04: frontend publicado, prerender validado y GSC bloqueado por permisos

## Hechos

- Lovable quedó autenticado y accesible en el navegador de Codex para el proyecto `Web Winerim`.
- En Lovable constaba el despliegue de Edge Functions `prerender`, `sitemap` y `redirects`.
- Se pulsó `Publish` y Lovable mostró estado `Published` / `Up to date`.
- Producción validada como Googlebot tras publish:
  - `/en/wine-library/grapes`: `x-prerendered: true`, `x-worker-branch: bot-prerender`, `CollectionPage`, `ItemList`, FAQ inglesa y navegación inglesa.
  - `/pt/biblioteca-vinho/harmonizacoes`: `x-prerendered: true`, `x-worker-branch: bot-prerender`, `CollectionPage`, `ItemList`, FAQ portuguesa y etiquetas localizadas como `Peixes e mariscos`, `Robalo e dourada`, `Carnes vermelhas`, `Queijos`.
  - `/de/weinbibliothek/rebsorten`: `x-prerendered: true`, `x-worker-branch: bot-prerender`, `CollectionPage`, `ItemList`, FAQ alemana y navegación/footer alemanes.
- Producción validada en navegador humano hidratado para `/en/wine-library/grapes`:
  - `html lang="en"`;
  - JSON-LD de hub con `CollectionPage|DefinedTermSet|ItemList|BreadcrumbList`;
  - FAQ no muestra `Preguntas frecuentes`.
- Se detectó `SoftwareApplication` dentro del JSON-LD de Organization como `itemOffered` del catálogo de planes; no sustituye al schema de hub.
- Search Console abrió con la cuenta `gugocreative@gmail.com`, pero mostró `Vaya, no puedes acceder a esta propiedad` para `sc-domain:winerim.wine`.

## Decisiones

- Considerar publicado y validado en producción el bloque de schema/i18n de hubs.
- No tocar Cloudflare Worker porque el flujo `bot-prerender` responde correctamente.
- No solicitar indexación desde Search Console hasta tener una cuenta con acceso a la propiedad.

## Hipótesis

- Googlebot ya puede rastrear los hubs internacionales con schema y navegación localizada.
- La indexación manual podrá retomarse en cuanto Search Console tenga permisos correctos.

## Tareas pendientes

- Cambiar en Search Console a una cuenta con acceso a `winerim.wine` o conceder acceso a `gugocreative@gmail.com`.
- Solicitar indexación selectiva de:
  - `/en/wine-library/grapes`;
  - `/pt/biblioteca-vinho/harmonizacoes`;
  - `/de/weinbibliothek/rebsorten`.
- Después, seguir con la tanda de artículos internacionales ya validada.

## Actualización 2026-06-04: indexación selectiva solicitada en Search Console

## Hechos

- Se confirmó que `gugocreative@gmail.com` tiene acceso a la propiedad URL-prefix `https://winerim.wine/`.
- La propiedad de dominio `sc-domain:winerim.wine` sigue sin acceso para esa cuenta, pero no bloquea la inspección de URLs canónicas `https://winerim.wine/...`.
- Se solicitaron en Search Console las siguientes URLs de hubs:
  - `https://winerim.wine/en/wine-library/grapes`;
  - `https://winerim.wine/pt/biblioteca-vinho/harmonizacoes`;
  - `https://winerim.wine/de/weinbibliothek/rebsorten`.
- Estado observado antes de solicitar:
  - EN grapes: `La URL no está en Google`, `Google no reconoce esta URL`, sin sitemap de referencia detectado.
  - PT harmonizacoes: `La URL no está en Google`, `Descubierta: actualmente sin indexar`, con `sitemap.xml` y `sitemap_index.xml`.
  - DE rebsorten: `La URL no está en Google`, `Descubierta: actualmente sin indexar`, con `sitemap.xml` y `sitemap_index.xml`.
- Search Console confirmó `Se ha solicitado la indexación` para las tres URLs de hubs.
- Se ejecutó también la tanda prioritaria de artículos internacionales:
  - `https://winerim.wine/en/article/biblioteca-vino-restaurante-vender-mas`;
  - `https://winerim.wine/de/article/biblioteca-vino-restaurante-vender-mas`;
  - `https://winerim.wine/pt/article/maridajes-carta-vinos-rentable`.
- La automatización de artículos agotó el tiempo de retorno del navegador, pero al revisar el estado posterior quedó en la tercera URL (`pt/article/maridajes-carta-vinos-rentable`) con el diálogo `Se ha solicitado la indexación`, lo que confirma que la secuencia llegó hasta el final.

## Decisiones

- Usar la propiedad `https://winerim.wine/` para inspección e indexación manual mientras la propiedad de dominio no esté disponible.
- No repetir solicitudes sobre las mismas URLs porque Google avisa que múltiples envíos no cambian prioridad.
- Mantener la indexación manual selectiva, no masiva.

## Hipótesis

- Las URLs PT/DE ya estaban descubiertas por sitemap y deberían avanzar antes que la EN que Google aún no reconocía.
- La solicitud manual debería acelerar rastreo, pero la indexación final dependerá de evaluación de Google y puede tardar días o semanas.

## Tareas pendientes

- Revisar Search Console en 48-72 horas para ver si las seis URLs pasan de `no indexada` a rastreada/indexada.
- Monitorizar el informe de Páginas para `Descubierta: actualmente sin indexar`.
- Continuar con schema de detalle de entidades de biblioteca del vino.

## Actualización 2026-06-05: lectura inicial de cobertura GSC

## Hechos

- Search Console, propiedad `https://winerim.wine/`, muestra en el informe de Páginas:
  - `102` URLs indexadas;
  - `2.331` URLs sin indexar;
  - última actualización del informe: `29/5/26`.
- Motivos principales de no indexación:
  - `Descubierta: actualmente sin indexar`: `1.930` URLs;
  - `Rastreada: actualmente sin indexar`: `153` URLs;
  - `No se ha encontrado (404)`: `189` URLs;
  - `Página alternativa con etiqueta canónica adecuada`: `29` URLs;
  - `Página con redirección`: `23` URLs;
  - `noindex`: `3` URLs;
  - duplicadas sin canonical: `3` URLs;
  - canonical distinta elegida por Google: `1` URL.
- El sitemap actual contiene `2.072` URLs y `robots.txt` permite Googlebot.
- El informe de `Descubierta: actualmente sin indexar` muestra como ejemplos muchas URLs legacy de artículos con sufijos de idioma:
  - `/article/..._de`;
  - `/article/..._fr`;
  - `/article/..._it`;
  - `/article/..._pt`;
  - `/article/..._en`.
- El sitemap actual ya lista versiones limpias localizadas, por ejemplo `/de/article/...`, `/en/article/...`, `/pt/article/...`, no esas legacy con sufijo.
- Las legacy de artículos responden `200` y canonicalizan a la ruta limpia localizada en prerender para Googlebot; no redirigen `301`.

## Decisiones

- Tratar `102` indexadas como una señal baja para el volumen estratégico del sitio, pero leerla con cautela porque el informe va retrasado al `29/5/26`.
- Priorizar saneamiento de inventario y señales de canonical/redirect antes de solicitar más indexación masiva.
- Considerar convertir rutas legacy `slug_lang` de artículos en redirecciones `301` a `/{lang}/article/{slug}` para acelerar consolidación.

## Hipótesis

- Gran parte del diferencial entre sitemap y URLs sin indexar viene de histórico legacy y descubrimiento de URLs antiguas, no solo de las nuevas páginas de biblioteca.
- Las URLs nuevas de biblioteca pueden tardar en reflejarse porque Search Console todavía no incluye la publicación/indexación del 2026-06-04.
- Responder `200` en legacy con canonical puede ser correcto, pero un `301` probablemente reduciría ruido de cobertura y consolidaría señales más rápido.

## Tareas pendientes

- Auditar muestras de:
  - `Descubierta: actualmente sin indexar`;
  - `Rastreada: actualmente sin indexar`;
  - `No se ha encontrado (404)`.
- Revisar si conviene implementar redirects `301` para artículos legacy `slug_lang`.
- Confirmar si todas las URLs del sitemap actual tienen valor suficiente para indexación o si conviene priorizar/podar.
- Reinspeccionar en 48-72 horas las seis URLs solicitadas el 2026-06-04.

## Actualización 2026-06-05: redirects 301 para artículos legacy localizados

## Hechos

- Se implementó en `cloudflare-worker-v3-hybrid.js` una regla genérica para rutas legacy de artículos:
  - patrón: `/article/{slug}_{en|it|fr|de|pt}`;
  - destino: `/{lang}/article/{slug}`;
  - estado: `301`;
  - branch: `legacy-localized-article-redirect`.
- La regla preserva query string cuando existe.
- Se añadió cobertura en `src/test/wine-library-seo-surface.test.ts`.
- Validaciones locales:
  - `node --check cloudflare-worker-v3-hybrid.js`;
  - ESLint dirigido;
  - `npm run test -- --run`: 8 archivos, 39 tests;
  - `git diff --check`;
  - `npm run deploy:worker:dry-run`.
- Se desplegó Cloudflare Worker `winerim-proxy`.
- Worker version ID desplegada: `251558ac-99da-4fec-8fa6-8a63286174c0`.
- Producción validada:
  - `/article/alex-pardo_en` -> `301` a `/en/article/alex-pardo`;
  - `/article/5-errores-reales-que-vemos-en-cartas-de-vinos-de-restaurantes_de` -> `301` a `/de/article/5-errores-reales-que-vemos-en-cartas-de-vinos-de-restaurantes`;
  - `/article/alternativa-carta-pdf-vinos_pt?utm=test` -> `301` a `/pt/article/alternativa-carta-pdf-vinos?utm=test`;
  - `/en/article/alex-pardo` sigue respondiendo `200`.

## Decisiones

- Convertir los artículos legacy localizados con sufijo en redirects permanentes en el Worker, antes de bot prerender y antes del proxy SPA.
- Mantener compatibilidad de destino limpio, pero no seguir sirviendo legacy con `200` + canonical.
- No tocar Supabase ni Lovable para este cambio, porque la corrección vive en Cloudflare Worker.

## Hipótesis

- Google consolidará más rápido las señales de las rutas legacy hacia las rutas limpias localizadas.
- El informe de `Descubierta: actualmente sin indexar` debería ir reduciendo ruido legacy cuando GSC recrawlee esas URLs.

## Tareas pendientes

- Reinspeccionar en Search Console una muestra de legacy `_en/_de/_pt` tras recrawl.
- Revisar la causa `No se ha encontrado (404)` con sus 189 URLs.
- Revisar `Rastreada: actualmente sin indexar` para separar páginas valiosas de baja prioridad.

## Actualización 2026-06-05: auditoría inicial de 404 GSC

## Hechos

- Se abrió el informe GSC `No se ha encontrado (404)`.
- El informe muestra `189` URLs, con última actualización `29/5/26`.
- Las 10 muestras visibles son legacy antiguas:
  - `/corso-vino-cata-mw-examen-practico`;
  - `/winerim-sommelier-magazine/`;
  - `/winerim-vs-wineadvisor-2/`;
  - `/alex-pardo/`;
  - `/estadisticas/estadisticas-2024-01-28/`;
  - `/home/`;
  - `/estadisticas/estadisticas-2024-02-24/`;
  - `/clientes/canabota/`;
  - `/clientes/yandiola/`;
  - `/clientes/casa-curro/`.
- Producción actual ya no devuelve 404 en esas muestras:
  - las rutas sin trailing slash mapeadas devuelven `301` directo;
  - las rutas con trailing slash hacen primero normalización de slash y acaban en destino `200`.
- Ejemplos de destino final validados:
  - `/winerim-sommelier-magazine/` -> `/sommelier-corner` -> `200`;
  - `/winerim-vs-wineadvisor-2/` -> `/comparativas` -> `200`;
  - `/alex-pardo/` -> `/article/alex-pardo` -> `200`;
  - `/estadisticas/estadisticas-2024-01-28/` -> `/benchmarks-playbooks` -> `200`;
  - `/home/` -> `/` -> `200`;
  - `/clientes/canabota/` -> `/clientes` -> `200`.
- En esta vista GSC no expuso botón `Validar corrección`; solo `ver detalles`.

## Decisiones

- No añadir nuevas reglas para las 10 muestras visibles de 404 porque ya están resueltas en producción.
- Esperar recrawl/GSC antes de considerar más cambios sobre esas URLs.
- Mantener pendiente auditar más allá de las 10 muestras visibles si el recuento no baja.

## Hipótesis

- El bloque de 404 refleja principalmente estado histórico anterior a los redirects ya desplegados.
- GSC debería mover esas URLs a `Página con redirección` o sacarlas del error cuando las recrawlee.

## Tareas pendientes

- Si el 404 sigue alto tras recrawl, exportar más ejemplos desde GSC.
- Revisar si conviene reducir cadenas de dos saltos para legacy con trailing slash.

## Actualización 2026-06-05: redirects adicionales para 404 legacy de alta confianza

## Hechos

- Se añadieron cuatro redirects directos en `cloudflare-worker-v3-hybrid.js` para URLs legacy que auditorías previas habían confirmado como 404 reales:
  - `/terms-of-service` -> `/terminos`;
  - `/landing` -> `/`;
  - `/reviews-restaurante` -> `/casos-exito`;
  - `/por-que-los-jovenes-no-beben-vino-en-los-restaurantes` -> `/article/por-que-los-jovenes-no-beben-vino-en-los-restaurantes`.
- Se añadió cobertura de test en `src/test/wine-library-seo-surface.test.ts`.
- Validaciones locales:
  - `node --check cloudflare-worker-v3-hybrid.js`;
  - `npx eslint cloudflare-worker-v3-hybrid.js src/test/wine-library-seo-surface.test.ts`;
  - `npm run test -- --run src/test/wine-library-seo-surface.test.ts`: 10 tests;
  - `npm run test -- --run`: 8 archivos, 40 tests;
  - `git diff --check`;
  - `npm run deploy:worker:dry-run`.
- Se desplegó Cloudflare Worker `winerim-proxy`.
- Worker version ID desplegada: `6c6f3366-e13f-4eee-b9c1-7603572f8822`.
- Producción validada:
  - `/terms-of-service` devuelve `301` a `/terminos`;
  - `/landing` devuelve `301` a `/`;
  - `/reviews-restaurante` devuelve `301` a `/casos-exito`;
  - `/por-que-los-jovenes-no-beben-vino-en-los-restaurantes` devuelve `301` a `/article/por-que-los-jovenes-no-beben-vino-en-los-restaurantes`;
  - las cuatro variantes con trailing slash terminan en destino `200`;
  - `/article/alex-pardo_en` conserva el redirect `legacy-localized-article-redirect` a `/en/article/alex-pardo`.

## Decisiones

- Redirigir solo URLs legacy con equivalente semántico claro y validado.
- Enviar `/reviews-restaurante` a `/casos-exito` por intención de reviews/casos.
- Enviar `/terms-of-service` a `/terminos` por equivalencia legal.
- Enviar `/landing` a home porque no hay una landing canónica más específica documentada.
- Enviar el artículo antiguo de jóvenes y vino a su ruta actual de artículo, porque el slug existe en `src/data/articles.ts`.

## Hipótesis

- Estos redirects reducirán parte del ruido del informe 404 cuando Google recrawlee.
- Las variantes con trailing slash seguirán teniendo dos saltos por la normalización global, pero llegan a `200` y no bloquean indexación ni consolidación.

## Tareas pendientes

- Esperar recrawl de Google antes de validar si el informe 404 baja.
- Si el recuento 404 se mantiene alto, exportar más ejemplos desde GSC y clasificar en `301`, `410` o contenido nuevo.
- Continuar revisión de `Rastreada: actualmente sin indexar` para separar páginas valiosas de URLs que conviene podar o redirigir.

## Actualización 2026-06-05: saneamiento de `Rastreada: actualmente sin indexar`

## Hechos

- Se abrió en Search Console el informe `Rastreada: actualmente sin indexar`.
- El informe muestra:
  - `153` URLs afectadas;
  - última actualización: `29/5/26`;
  - fecha de primera detección: `2/3/24`.
- La exportación CSV no funcionó dentro del navegador integrado, así que se aumentó la tabla a `100` filas y se capturaron las `153` URLs mediante las dos páginas visibles (`1-100` y `101-153`).
- Clasificación productiva antes del nuevo Worker:
  - `122` URLs ya acababan en `301 -> 200`;
  - `9` URLs respondían `200 -> 200`;
  - `20` URLs acababan todavía en `404`;
  - `1` URL acababa en `410`;
  - `1` comprobación tuvo error puntual de fetch, sin repetirse como patrón.
- Se añadieron redirects directos de alta confianza para URLs legacy rastreadas sin indexar:
  - `/en/homepage` -> `/en`;
  - `/periko-ortega` -> `/article/periko-ortega`;
  - `/informe-il-mulino-di-monza` -> `/casos-exito`;
  - `/jordi-subiros-lo-que-winerim-aporta-a-un-responsable-de-fb` -> `/casos-exito`;
  - `/vinos-ecologicos` -> `/biblioteca-vino/estilos/ecologico-biodinamico-natural`;
  - `/winerim-vs-vinipad` -> `/comparativas`;
  - `/programa-afiliados/afiliacion` -> `/afiliate`;
  - `/en/when-the-food-goes-with-the-wine-the-best-restaurants` -> `/en/guides/wine-pairing-strategy-restaurants`;
  - `/en/cookies` -> `/en/privacy`;
  - `/los-mejores-restaurantes-de-cataluna-para-disfrutar-del-vino` -> `/blog`;
  - `/winerim-academy` -> `/decision-center/cursos`;
  - `/en/choosing-wine-a-not-so-easy-task-for-many-diners` -> `/en/wine-list-management-software`;
  - `/un-consejo-prueba-vinos-` -> `/article/un-consejo-prueba-vinos-nuevos`;
  - `/un-consejo-cata-con-el-` -> `/article/un-consejo-cata-con-el-corazon`.
- Se añadieron redirects por familia:
  - `/blog-2/*` -> `/blog`;
  - `/programa-afiliados/*` -> `/afiliate`.
- Se añadió normalización de query legacy:
  - `/?lang=en` -> `/en`;
  - el helper soporta también `it`, `fr`, `de`, `pt` y `es`.
- Se añadió `410` directo para `/en/castillo-ygay-gran-reserva-especial-recognized-as-the-best-wine-in-the-world`, porque la documentación previa lo trataba como noticia sin equivalente útil.
- Validaciones locales:
  - `node --check cloudflare-worker-v3-hybrid.js`;
  - `npx eslint cloudflare-worker-v3-hybrid.js src/test/wine-library-seo-surface.test.ts`;
  - `npm run test -- --run src/test/wine-library-seo-surface.test.ts`: 13 tests;
  - `npm run test -- --run`: 8 archivos, 43 tests;
  - `git diff --check`;
  - `npm run deploy:worker:dry-run`.
- Se desplegó Cloudflare Worker `winerim-proxy`.
- Worker version ID desplegada: `06906271-4e57-4755-be7e-03376cfd8f7d`.
- Producción validada en muestras:
  - los nuevos destinos devuelven `301` con `X-Worker-Branch: direct-legacy-redirect`;
  - `/?lang=en` devuelve `301` con `X-Worker-Branch: legacy-language-query-redirect`;
  - `/en/castillo-ygay-gran-reserva-especial-recognized-as-the-best-wine-in-the-world/` termina en `410`.
- Revalidación productiva de las `153` URLs completas tras deploy:
  - `143` URLs quedan en `301 -> 200`;
  - `8` URLs quedan en `200 -> 200`;
  - `2` URLs quedan en `301 -> 410`;
  - `0` URLs quedan en `404`.
- Search Console permitió iniciar validación del informe.
- Estado visible en GSC:
  - `Resultado de la validación: Iniciada`;
  - `Fecha de inicio: 5/6/26`.

## Decisiones

- No solicitar indexación masiva para este bloque: primero se saneó el inventario legacy que Google ya había rastreado.
- Convertir a `301` solo URLs con destino semántico claro.
- Usar `410` para noticias legacy sin equivalente útil, en vez de redirigirlas a hubs genéricos.
- Tratar las `8` URLs que siguen en `200` como trabajo de calidad/enlazado/indexabilidad, no como problema de redirect.
- Iniciar validación de `Rastreada: actualmente sin indexar` en Search Console tras comprobar que ya no quedan `404` en la muestra completa.

## Hipótesis

- GSC debería mover la mayoría de las 153 URLs fuera de `Rastreada: actualmente sin indexar` cuando recrawlee y procese la validación.
- Las URLs reales que siguen en `200` pueden necesitar más enlaces internos, contenido más específico o revisión de sitemap para lograr indexación.
- Las páginas legales `terminos` y `en/terms` seguirán sin indexarse por `noindex`, y eso es correcto.

## Tareas pendientes

- Monitorizar el resultado de la validación iniciada en GSC.
- Revisar por separado las `8` URLs que siguen en `200 -> 200`:
  - `/it/prezzi`;
  - `/article/como-pensar-la-carta-de-vinos-desde-la-rentabilidad`;
  - `/recursos/plantilla-formacion-equipo-sala`;
  - `/benchmarks-playbooks/benchmark-peso-vino-ticket-medio`;
  - `/recursos/revision-mensual-margenes`;
  - `/integraciones`;
  - `/terminos`;
  - `/en/terms`.
- Para las seis indexables de esa lista, reforzar enlazado interno, contenido visible, prerender/schema y presencia en sitemap si procede.
- Mantener legales como `noindex`.

## Actualización 2026-06-05: refuerzo de las 6 URLs indexables `200 -> 200`

## Hechos

- Se retomó la sesión leyendo primero `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- Se auditó producción como Googlebot para las `8` URLs que seguían en `200 -> 200`.
- Las dos legales siguen correctas:
  - `/terminos`: `noindex, follow`;
  - `/en/terms`: `noindex, follow`.
- En las seis indexables se detectó:
  - `/recursos/plantilla-formacion-equipo-sala`, `/benchmarks-playbooks/benchmark-peso-vino-ticket-medio` y `/recursos/revision-mensual-margenes` devolvían HTML prerenderizado con title/canonical/schema de la home, por lo que Google podía interpretarlas como duplicadas/canonicalizadas a `/`;
  - `/it/prezzi` y `/integraciones` devolvían canonical propio, pero contenido de bot muy fino;
  - `/article/como-pensar-la-carta-de-vinos-desde-la-rentabilidad` devolvía HTML largo, canonical propio y schema `Article`.
- Se añadió prerender dedicado en `supabase/functions/prerender/index.ts` para:
  - fichas de `/recursos/*`;
  - fichas de `/benchmarks-playbooks/*`;
  - `/integraciones` con contenido más completo;
  - override específico para `/it/prezzi`.
- Se actualizó `supabase/functions/sitemap/index.ts` para que recursos y benchmarks/playbooks vuelvan a poder entrar en el sitemap una vez tienen prerender dedicado.
- El deploy directo de Supabase Edge Functions falló por falta de credenciales locales:
  - `SUPABASE_ACCESS_TOKEN` no está configurado;
  - el CLI pidió `supabase login`.
- Para cubrir producción sin esperar a Lovable, se añadió un puente temporal en `cloudflare-worker-v3-hybrid.js`:
  - `worker-detail-prerender` para `/recursos/*` y `/benchmarks-playbooks/*`;
  - `worker-static-prerender` para `/it/prezzi` y `/integraciones`;
  - `sitemap-worker-detail-bridge` para inyectar recursos y benchmarks/playbooks en `/sitemap.xml` mientras Supabase sirve la versión antigua.
- Worker final desplegado:
  - version ID `670b5372-cbca-48a5-92af-8ebcfb9fb5f5`.
- Validación productiva final como Googlebot:
  - `/it/prezzi`: `200`, `worker-static-prerender`, canonical `https://winerim.wine/it/prezzi`, `index, follow`;
  - `/article/como-pensar-la-carta-de-vinos-desde-la-rentabilidad`: `200`, `bot-prerender`, canonical propio, schema `Article`, `1113` palabras;
  - `/recursos/plantilla-formacion-equipo-sala`: `200`, `worker-detail-prerender`, canonical propio, schema `CreativeWork`;
  - `/benchmarks-playbooks/benchmark-peso-vino-ticket-medio`: `200`, `worker-detail-prerender`, canonical propio, schema `Article`;
  - `/recursos/revision-mensual-margenes`: `200`, `worker-detail-prerender`, canonical propio, schema `CreativeWork`;
  - `/integraciones`: `200`, `worker-static-prerender`, canonical propio, schema `WebPage`.
- `/sitemap.xml` en producción devuelve `X-Worker-Branch: sitemap-worker-detail-bridge` e incluye:
  - `/recursos/plantilla-formacion-equipo-sala`;
  - `/benchmarks-playbooks/benchmark-peso-vino-ticket-medio`;
  - `/recursos/revision-mensual-margenes`.
- Validaciones locales:
  - `node --check cloudflare-worker-v3-hybrid.js`;
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`;
  - `npx eslint cloudflare-worker-v3-hybrid.js supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts src/test/wine-library-seo-surface.test.ts`;
  - `npm run test -- --run src/test/wine-library-seo-surface.test.ts`: 15 tests;
  - `npm run test -- --run`: 8 archivos, 45 tests;
  - `git diff --check`;
  - `npm run deploy:worker:dry-run`.

## Decisiones

- No redirigir las seis URLs indexables: son páginas útiles y deben competir como URLs propias.
- Mantener `/terminos` y `/en/terms` como `noindex`.
- Usar Cloudflare Worker como puente productivo porque no hay token local para desplegar Supabase Edge Functions.
- Mantener también los cambios en Supabase `prerender` y `sitemap` para que Lovable pueda publicar la solución de fuente cuando esté disponible.
- Reforzar primero indexabilidad/canonical/schema antes de solicitar nuevas indexaciones manuales.

## Hipótesis

- Las tres fichas de recursos/benchmarks deberían dejar de parecer duplicados de la home cuando Google las recrawlee.
- `/it/prezzi` e `/integraciones` tienen mejores señales para salir de `Rastreada: actualmente sin indexar`, aunque pueden seguir necesitando enlaces internos y autoridad.
- El puente de Worker es suficiente para producción, pero conviene publicar Edge Functions desde Lovable para evitar depender de lógica duplicada a medio plazo.

## Tareas pendientes

- Publicar desde Lovable las Edge Functions `prerender` y `sitemap` actualizadas, o proporcionar `SUPABASE_ACCESS_TOKEN` para desplegarlas por CLI.
- Cuando Supabase esté publicado, decidir si se retira el puente del Worker o se deja como fallback.
- Monitorizar en Search Console:
  - validación iniciada de `Rastreada: actualmente sin indexar`;
  - si las seis URLs indexables pasan a indexadas o cambian de motivo.
- Reforzar enlazado interno hacia:
  - `/it/prezzi`;
  - `/integraciones`;
  - recursos y benchmarks/playbooks desde hubs, blog, producto y biblioteca.
- Retomar después `Descubierta: actualmente sin indexar`, especialmente biblioteca del vino y artículos internacionales.

## Actualización 2026-06-05: intento de comunicación con Lovable

## Hechos

- Se retomó la sesión leyendo `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- El repo estaba limpio y sincronizado con `origin/main`.
- Se intentó usar el navegador integrado para enviar a Lovable la instrucción de publicar las Edge Functions, pero la sesión no exponía ningún navegador conectado.
- Se detectaron pestañas de Chrome abiertas en el proyecto Lovable `https://lovable.dev/projects/2c4eed0e-6760-45f0-aeb3-ce44de8e91f1`.
- Chrome permitió listar pestañas, pero no permitió una interacción fiable con el contenido de Lovable:
  - la ejecución de JavaScript en pestañas de Lovable quedó bloqueada;
  - la captura de pantalla local salió negra;
  - la capa de accesibilidad no expuso ventanas útiles de Chrome;
  - no había `chrome-cli` ni puerto de depuración remoto disponible.
- No hay confirmación de que Lovable haya recibido el mensaje.

## Decisiones

- No enviar comandos ni pegar texto a ciegas en Lovable sin localizar de forma fiable el campo de chat/instrucciones.
- Mantener como pendiente que Lovable publique las Edge Functions de Supabase ya implementadas en el repo.

## Hipótesis

- La pestaña de Lovable existe en Chrome, pero esta sesión no tiene permisos/canal suficiente para automatizarla de forma segura.
- El camino más seguro sigue siendo pegar en Lovable el mensaje operativo preparado o proporcionar `SUPABASE_ACCESS_TOKEN` para desplegar por CLI.

## Tareas pendientes

- Enviar a Lovable la instrucción de publicar `supabase/functions/prerender/index.ts` y `supabase/functions/sitemap/index.ts`.
- Tras publicar desde Lovable, revalidar producción como Googlebot y decidir si se retira el puente de Worker.

## Actualización 2026-06-06: reducción de cadenas legacy visibles en GSC

## Hechos

- Se retomó la sesión leyendo `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- El repo estaba limpio y sincronizado con `origin/main`.
- Se revisó la pestaña abierta de Search Console para `Rastreada: actualmente sin indexar`.
- Search Console sigue mostrando:
  - `153` URLs afectadas;
  - última actualización `29/5/26`;
  - validación iniciada el `5/6/26`.
- Los ejemplos visibles actuales están dominados por legacy de:
  - `/clientes/*`;
  - `/clientes/page/*`;
  - `/estadisticas/*`;
  - `/estadisticas/page/*`.
- Producción ya redirigía esas familias, pero las variantes con trailing slash hacían dos saltos:
  - `trailing-slash`;
  - después `direct-legacy-redirect`.
- Se actualizó `cloudflare-worker-v3-hybrid.js` para resolver los redirects legacy directos antes de la normalización genérica de trailing slash.
- Se añadió `getDirectLegacyTarget(path)` con lookup normalizado para detectar legacy con slash final.
- Se actualizó `src/test/wine-library-seo-surface.test.ts` para proteger esta prioridad de ejecución.
- Validaciones locales pasadas:
  - `node --check cloudflare-worker-v3-hybrid.js`;
  - `npx eslint cloudflare-worker-v3-hybrid.js src/test/wine-library-seo-surface.test.ts`;
  - `npm run test -- --run src/test/wine-library-seo-surface.test.ts`: 15 tests;
  - `npm run test -- --run`: 8 archivos, 45 tests;
  - `git diff --check`;
  - `npm run deploy:worker:dry-run`.
- Worker desplegado:
  - version ID `396ec636-a1af-4bd4-8fb6-5f9dc2b0bc3a`.
- Producción validada como Googlebot:
  - `/clientes/el-capricho/`: `301` directo a `/clientes`, `X-Worker-Branch: direct-legacy-redirect`;
  - `/clientes/page/8/`: `301` directo a `/clientes`, `X-Worker-Branch: direct-legacy-redirect`;
  - `/estadisticas/estadisticas-2024-02-28-3/`: `301` directo a `/benchmarks-playbooks`, `X-Worker-Branch: direct-legacy-redirect`;
  - `/estadisticas/page/27/`: `301` directo a `/benchmarks-playbooks`, `X-Worker-Branch: direct-legacy-redirect`.
- Las rutas estratégicas revalidadas siguen correctas:
  - `/it/prezzi`: `200`, `worker-static-prerender`;
  - `/recursos/plantilla-formacion-equipo-sala`: `200`, `worker-detail-prerender`;
  - `/sitemap.xml`: `200`, `sitemap-worker-detail-bridge`, `index, follow`.

## Decisiones

- Reducir cadenas de redirects legacy visibles en GSC en vez de esperar solo al recrawl.
- Mantener `/clientes` como página indexable propia.
- Mantener `/clientes/` como normalización simple a `/clientes`.
- Redirigir páginas profundas legacy de clientes hacia `/clientes` y estadísticas legacy hacia `/benchmarks-playbooks`.

## Hipótesis

- Al recrawlear, Google debería procesar más limpiamente estas familias porque ya no pasan por una cadena `301 -> 301 -> 200`.
- El informe seguirá mostrando `153` hasta que GSC actualice datos posteriores al `29/5/26`.
- La validación iniciada el `5/6/26` puede tardar varios días en reflejar el cambio.

## Tareas pendientes

- Monitorizar en GSC si `Rastreada: actualmente sin indexar` baja o cambia de causa tras recrawl.
- Si GSC sigue mostrando familias legacy, exportar más ejemplos y aplicar solo redirects de alta confianza.
- Mantener pendiente la publicación de Edge Functions desde Lovable.
- Retomar después `Descubierta: actualmente sin indexar`, priorizando biblioteca del vino y artículos internacionales.

## Actualización 2026-06-06: validación de `Descubierta` y sitemap estable

## Hechos

- Se retomó la sesión leyendo `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- El repo estaba limpio y sincronizado con `origin/main`.
- En la vista general de GSC, `Descubierta: actualmente sin indexar` muestra:
  - `1.930` URLs afectadas;
  - última actualización `29/5/26`;
  - validación inicialmente no iniciada.
- Se abrió `Descubierta: actualmente sin indexar` y se inició validación:
  - `Resultado de la validación: Iniciada`;
  - `Fecha de inicio: 6/6/26`.
- Al filtrar por `/sitemap.xml`, también se inició validación para la misma causa:
  - `Resultado de la validación: Iniciada`;
  - `Fecha de inicio: 6/6/26`.
- Se extrajeron `1.000` URLs visibles de la tabla de ejemplos de `Descubierta`.
- Clasificación de esas `1.000` URLs visibles:
  - `761` biblioteca del vino;
  - `154` legacy de artículos con sufijo de idioma `/article/{slug}_{lang}`;
  - `36` artículos canónicos ES;
  - `35` páginas localizadas de producto/site;
  - `11` páginas ES de producto/recurso;
  - `3` otras.
- Las muestras legacy de artículos localizados responden en producción con `301` y `X-Worker-Branch: legacy-localized-article-redirect`.
- `/article/alex-pardo` es una URL real, indexable, canónica, presente en sitemap y con `977` palabras en prerender.
- `/article/alex-peiro` aparece como posible caso fino: `200`, canónico, pero solo `123` palabras en prerender.
- El sitemap actual de producción contiene:
  - `2.098` URLs;
  - `1.458` URLs de biblioteca del vino;
  - `243` URLs de biblioteca por idioma;
  - `0` URLs legacy `/article/{slug}_{lang}`.
- Se detectó que el sitemap marcaba `lastmod` dinámico para rutas estáticas y biblioteca al usar la fecha de generación.
- Se corrigió `supabase/functions/sitemap/index.ts` para usar fechas estables:
  - `STATIC_ROUTE_LASTMOD = '2026-06-06'`;
  - `WINE_LIBRARY_LASTMOD = '2026-06-01'`.
- Se corrigió el Worker puente para estabilizar ya en producción el `lastmod` de biblioteca:
  - `WINE_LIBRARY_SITEMAP_LASTMOD = '2026-06-01'`;
  - `WORKER_DETAIL_SITEMAP_LASTMOD = '2026-06-05'`.
- Worker desplegado:
  - version ID `56798607-2334-4472-8c23-d44c94af8432`.
- Producción validada tras deploy:
  - `/sitemap.xml`: `200`, `sitemap-worker-detail-bridge`, `index, follow`;
  - `2.098` URLs totales;
  - `1.458` URLs de biblioteca;
  - todas las URLs de biblioteca tienen `lastmod=2026-06-01`;
  - `0` legacy de artículo con sufijo en sitemap;
  - recursos/benchmarks inyectados por Worker mantienen `lastmod=2026-06-05`.
- Validaciones locales pasadas:
  - `node --check cloudflare-worker-v3-hybrid.js`;
  - `npx --yes deno-bin check supabase/functions/sitemap/index.ts`;
  - `npx eslint cloudflare-worker-v3-hybrid.js supabase/functions/sitemap/index.ts src/test/wine-library-seo-surface.test.ts`;
  - `npm run test -- --run src/test/wine-library-seo-surface.test.ts`: 15 tests;
  - `npm run test -- --run`: 8 archivos, 45 tests;
  - `git diff --check`;
  - `npm run deploy:worker:dry-run`.

## Decisiones

- Iniciar validación de `Descubierta: actualmente sin indexar` porque las principales legacy visibles ya responden con redirects correctos y el sitemap actual no las envía.
- No solicitar indexación manual masiva para las `1.930` URLs.
- Mantener cobertura completa de biblioteca en sitemap, pero corregir `lastmod` para no enviar falsa frescura diaria.
- Mantener el Worker como puente productivo hasta que Lovable publique las Edge Functions actualizadas.

## Hipótesis

- GSC sigue mostrando legacy en `/sitemap.xml` por histórico anterior, no porque el sitemap actual las contenga.
- El `lastmod` estable debería reducir ruido de crawl y ayudar a Google a priorizar biblioteca del vino sin interpretar cambios diarios artificiales.
- La biblioteca del vino necesita ahora más crawl/indexación y señal interna; no parece un problema de canonical o sitemap roto.
- Algunos artículos canónicos finos, como `alex-peiro`, pueden necesitar ampliación editorial o poda futura.

## Tareas pendientes

- Monitorizar la validación iniciada de `Descubierta: actualmente sin indexar`.
- Revisar si GSC mueve legacy `/article/{slug}_{lang}` a `Página con redirección`.
- Reforzar enlazado interno hacia hubs y entidades prioritarias de biblioteca del vino.
- Auditar artículos canónicos finos antes de seguir enviándolos con prioridad en sitemap.
- Mantener pendiente la publicación de Edge Functions desde Lovable.

## Actualización 2026-06-07: recuperación editorial de `/article/alex-peiro`

## Hechos

- Se retomó la sesión leyendo `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- El repo estaba limpio y sincronizado con `origin/main`.
- Producción como Googlebot confirmaba que `/article/alex-peiro` estaba técnicamente bien servida:
  - HTTP `200`;
  - `X-Worker-Branch: bot-prerender`;
  - canonical `https://winerim.wine/article/alex-peiro`.
- El problema detectado era editorial:
  - solo `123` palabras visibles en prerender;
  - placeholder visible: `La URL original de la entrevista con Álex Peiró no está disponible actualmente en la web de origen. Contenido pendiente de recuperar.`;
  - solo enlaces internos genéricos, sin enlaces profundos a hubs de biblioteca.
- Se confirmó que Supabase `articles` es la fuente principal del blog y del prerender; `src/data/articles.ts` actúa como fallback.
- Se implementó el commit `a095b85 fix: enrich alex peiro article` y se hizo push a `origin/main`.
- Cambios del commit:
  - `src/data/articles.ts`: fallback de `alex-peiro` ampliado a `780` palabras, sin placeholder, con enlaces contextuales a biblioteca del vino, uvas, regiones, estilos, maridajes, software de carta y análisis de carta.
  - `supabase/migrations/20260607123000_enrich_alex_peiro_article.sql`: migración idempotente para actualizar/upsert de `articles.slug='alex-peiro'`, `related_links`, `lang`, `category`, `author` y contenido largo.
  - `src/test/article-content-quality.test.ts`: test para evitar que el fallback de `alex-peiro` vuelva a quedar como contenido fino o placeholder.
- Verificaciones locales completadas:
  - `npm run test -- --run src/test/article-content-quality.test.ts src/test/article-routes.test.ts src/test/wine-library-seo-surface.test.ts`: 19 tests.
  - `npm run test -- --run`: 9 archivos, 46 tests.
  - `npm run build`.
  - `git diff --check`.
  - `npx eslint src/data/articles.ts src/test/article-content-quality.test.ts`.
- Lovable detectó el commit `fix: enrich alex peiro article`.
- Se pulsó `Publish project` y luego `Update`; Lovable quedó en estado `Up to date`.
- La revalidación productiva posterior mostró que el frontend quedó publicado, pero la fila de Supabase no se actualizó:
  - `/article/alex-peiro?codex=a095b85` sigue con `123` palabras;
  - el placeholder sigue presente;
  - no aparecen los enlaces profundos a `/biblioteca-vino/uvas`, `/regiones`, `/estilos`, `/maridajes` ni `/analisis-carta`.
- Se intentó enviar la instrucción operativa a Lovable por chat, pero el `Chat input` no recibía foco ni texto desde el navegador integrado.
- Se comprobó la vía directa con la clave pública de Supabase:
  - lectura pública de `articles.slug='alex-peiro'` funciona;
  - `PATCH` con clave pública no actualiza la fila por permisos/RLS.
- Se probó `/admin`; redirige a `/admin/login` y no hay sesión de editor activa en el navegador integrado.

## Decisiones

- No considerar resuelto `/article/alex-peiro` en producción hasta aplicar la migración de Supabase.
- Mantener el fallback estático enriquecido como protección, pero tratar Supabase `articles` como fuente operativa para artículos publicados y prerender.
- No inventar una entrevista completa ni atribuir respuestas no disponibles; se optó por una recuperación editorial basada en los hechos/citas disponibles y en análisis útil para sala, carta y biblioteca.
- No forzar más el chat de Lovable cuando el input no recibe foco, para evitar envíos accidentales o acciones opacas.

## Hipótesis

- Lovable `Update` publica frontend, pero no aplica automáticamente migraciones de Supabase añadidas desde GitHub.
- Aplicar `20260607123000_enrich_alex_peiro_article.sql` debería hacer que Googlebot vea más de `500` palabras, elimine el placeholder y detecte enlaces internos profundos hacia biblioteca.
- Corregir artículos canónicos finos reducirá fricción en `Descubierta: actualmente sin indexar`, especialmente para URLs reales que sí están en sitemap.

## Tareas pendientes

- Aplicar en Supabase la migración `supabase/migrations/20260607123000_enrich_alex_peiro_article.sql` desde Lovable, Supabase SQL editor, Admin UI autenticado o CLI con token.
- Revalidar después como Googlebot:
  - `https://winerim.wine/article/alex-peiro`;
  - HTTP `200`;
  - `X-Worker-Branch: bot-prerender`;
  - canonical propio;
  - sin placeholder;
  - más de `500` palabras visibles;
  - enlaces a `/biblioteca-vino`, `/biblioteca-vino/uvas`, `/biblioteca-vino/regiones`, `/biblioteca-vino/estilos`, `/biblioteca-vino/maridajes`, `/software-carta-de-vinos` y `/analisis-carta`.
- Si la revalidación pasa, solicitar indexación selectiva de `/article/alex-peiro` en Search Console si la herramienta lo permite.
- Continuar la auditoría de artículos canónicos finos detectados en `Descubierta`.

## Actualización 2026-06-08: migración de `/article/alex-peiro` aplicada desde Lovable

## Hechos

- Se retomó la sesión leyendo `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- El usuario aportó `https://lovable.dev/projects/ebb36746-82ff-43c3-86c1-558573beddcd` como acceso a Lovable.
- Se comprobó que ese proyecto es `Crim` y muestra la preview `Winerim Protocol Center`, por lo que no corresponde a la web pública documentada.
- La web pública Winerim sigue siendo el proyecto Lovable `https://lovable.dev/projects/2c4eed0e-6760-45f0-aeb3-ce44de8e91f1`, identificado como `Web Winerim`.
- Se accedió al proyecto correcto `Web Winerim` y se revisó el conector Supabase; la pantalla de connector no expone un editor SQL directo.
- Se envió al chat de Lovable la instrucción para aplicar `supabase/migrations/20260607123000_enrich_alex_peiro_article.sql` sobre `articles.slug='alex-peiro'`.
- Lovable informó que la migración quedó aplicada y validó:
  - HTTP `200`;
  - `X-Worker-Branch: bot-prerender`;
  - `X-Prerendered: true`;
  - canonical propio `https://winerim.wine/article/alex-peiro`;
  - más de `1200` palabras según su validación;
  - enlaces a biblioteca, uvas, regiones, estilos, maridajes, software de carta y análisis de carta.
- Se revalidó producción de forma independiente como Googlebot:
  - `https://winerim.wine/article/alex-peiro?codex=lovable-20260608-verify` responde HTTP `200`;
  - `X-Worker-Branch: bot-prerender`;
  - `X-Prerendered: true`;
  - canonical `https://winerim.wine/article/alex-peiro`;
  - `926` palabras visibles en el HTML analizado;
  - placeholder ausente;
  - enlaces presentes a `/biblioteca-vino`, `/biblioteca-vino/uvas`, `/biblioteca-vino/regiones`, `/biblioteca-vino/estilos`, `/biblioteca-vino/maridajes`, `/software-carta-de-vinos` y `/analisis-carta`.
- Se inspeccionó `https://winerim.wine/article/alex-peiro` en Search Console.
- Search Console informó: `La URL está en Google`, `La página está indexada`, HTTPS correcto y `1` elemento válido de rutas de exploración.
- Se solicitó indexación para que Google recrawlee la versión corregida.
- Search Console confirmó: `Se ha solicitado la indexación` y añadió la URL a una cola de rastreo prioritaria.

## Decisiones

- No usar el proyecto Lovable `Crim` para cambios de la web pública Winerim.
- Mantener `Web Winerim` (`2c4eed0e-6760-45f0-aeb3-ce44de8e91f1`) como proyecto Lovable operativo para frontend y Supabase de la web pública.
- Considerar cerrado el bloqueo editorial específico de `/article/alex-peiro` porque producción ya no muestra placeholder y supera el umbral de contenido útil.
- Tratar `/article/alex-peiro` como URL corregida e indexación solicitada; el siguiente trabajo pasa a monitorización y auditoría de otras URLs finas.

## Hipótesis

- Corregir `/article/alex-peiro` debería ayudar a que esta URL canónica tenga más opciones de salir de `Descubierta: actualmente sin indexar`.
- Puede haber otros artículos canónicos con patrón similar: técnicamente indexables, pero demasiado finos para priorizar indexación.
- Search Console puede tardar varios días en reflejar el cambio aunque la URL ya esté corregida en producción.

## Tareas pendientes

- Monitorizar en Search Console el recrawl de `https://winerim.wine/article/alex-peiro`.
- Continuar la auditoría de artículos canónicos finos detectados en `Descubierta`.
- Seguir reforzando enlazado interno hacia biblioteca del vino desde artículos, producto y recursos.

## Actualización 2026-06-08: saneamiento de duplicados blandos de artículos internacionales

## Hechos

- Se continuó la sesión leyendo `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- El repo estaba limpio y sincronizado con `origin/main` al empezar.
- Search Console mantiene `Descubierta: actualmente sin indexar` con:
  - `1.930` páginas afectadas;
  - validación `Iniciada`;
  - `Fecha de inicio: 6/6/26`;
  - última actualización `29/5/26`.
- En la muestra visible de `1.000` URLs de `Descubierta`, tras subir la tabla a `500` filas por página y extraer las URLs del DOM:
  - `761` URLs son biblioteca del vino;
  - `154` son legacy de artículos con sufijo `/article/{slug}_{lang}`;
  - `36` son artículos canónicos bajo `/article/{slug}`;
  - `49` son otras rutas.
- La exportación CSV desde el navegador integrado no está soportada; se usó extracción de DOM visible para clasificar la muestra.
- Se inspeccionó `https://winerim.wine/article/alex-pardo` en Search Console:
  - `La URL está en Google`;
  - `La página está indexada`;
  - HTTPS correcto;
  - `1` elemento válido de rutas de exploración.
- Se auditó en producción como Googlebot la muestra de `36` artículos canónicos:
  - `0` URLs con status distinto de `200`;
  - `0` artículos por debajo de `500` palabras;
  - `0` placeholders;
  - mínimo `590` palabras;
  - mediana `883` palabras;
  - `14` URLs internacionales servían `200` en `/article/{slug}`, pero canonicalizaban a `/{lang}/article/{slug}`.
- Se añadió en `cloudflare-worker-v3-hybrid.js` el mapa `LOCALIZED_ARTICLE_CANONICAL_REDIRECTS` para consolidar esas `14` variantes:
  - `en`: `what-wines-offer-by-glass-venue-type`, `wine-by-the-glass-software-restaurants`;
  - `it`: `come-sapere-se-la-carta-vini-squilibrata`, `pricing-vino-errori-comuni`, `quali-vini-offrire-al-bicchiere-secondo-tipo-locale`;
  - `fr`: `quand-carte-vins-trop-longue`, `quels-vins-proposer-au-verre-selon-type-etablissement`;
  - `de`: `alternative-zur-pdf-weinkarte`, `fehler-weinepreis-restaurant`, `software-offener-weinausschank-restaurants`, `zu-lange-weinkarte`;
  - `pt`: `como-saber-carta-vinhos-desequilibrada`, `quando-carta-vinhos-demasiado-longa`, `software-vinho-copo-restaurantes`.
- Se añadió cobertura en `src/test/wine-library-seo-surface.test.ts`.
- Verificaciones locales completadas:
  - `node --check cloudflare-worker-v3-hybrid.js`;
  - `npm run test -- --run src/test/wine-library-seo-surface.test.ts`: `16` tests;
  - `npx eslint cloudflare-worker-v3-hybrid.js src/test/wine-library-seo-surface.test.ts`;
  - `git diff --check`;
  - `npm run deploy:worker:dry-run`;
  - `npm run test -- --run`: `9` archivos, `47` tests.
- Worker desplegado:
  - `winerim-proxy`;
  - Version ID `881ec799-cc05-4110-8e4e-6ed75f3bcd6d`.
- Producción validada como Googlebot:
  - las `14` variantes `/article/{slug}` devuelven `301`;
  - `X-Worker-Branch: localized-article-canonical-redirect`;
  - destino `/{lang}/article/{slug}`;
  - query string preservado;
  - los destinos localizados responden `200`, `bot-prerender` y canonical propio.
- Mini-regresión productiva:
  - `/article/alex-pardo` sigue `200`, `bot-prerender`, canonical propio;
  - `/article/alex-peiro` sigue `200`, `bot-prerender`, canonical propio;
  - `/article/alex-pardo_en` sigue `301`, `legacy-localized-article-redirect`;
  - `/article/wine-by-the-glass-software-restaurants` ahora `301`, `localized-article-canonical-redirect`.

## Decisiones

- No pedir recrawl de `alex-pardo` porque ya está en Google, indexado y no hubo cambio reciente de contenido.
- Tratar los artículos internacionales bajo `/article/{slug}` con canonical a `/{lang}/article/{slug}` como duplicados blandos a consolidar con `301`.
- Resolver este patrón en Cloudflare Worker porque afecta a URLs públicas ya vistas por GSC y no requiere Lovable.
- Mantener la auditoría de artículos canónicos finos como línea activa, pero este lote no requiere enriquecimiento editorial.

## Hipótesis

- Estas `14` URLs deberían pasar con el tiempo a `Página con redirección` o desaparecer de `Descubierta`.
- La muestra de GSC sigue desactualizada al `29/5/26`, así que el impacto no será visible hasta que Google procese la validación iniciada el `6/6/26` y recrawlee.
- El cuello principal restante en `Descubierta` ya no parece ser contenido fino de artículos visibles, sino priorización/crawl de biblioteca del vino y ruido histórico legacy.

## Tareas pendientes

- Commit y push del cambio de Worker y test.
- Monitorizar en Search Console:
  - si las `14` variantes pasan a `Página con redirección`;
  - si baja `Descubierta`;
  - si la biblioteca del vino empieza a recibir más indexación e impresiones.
- Continuar con la muestra `other` de `49` rutas de `Descubierta`.
- Seguir reforzando enlazado interno hacia biblioteca del vino y páginas localizadas limpias.

## Actualización 2026-06-30: hub separado `Aprender vino` para SEO/LLM

## Hechos

- Se retomó la sesión siguiendo el protocolo y se leyeron `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- Se confirmó la decisión editorial: el contenido de iniciación inspirado por La RVF no debe mezclarse como entidad interna de `Biblioteca del vino`.
- Se creó la página React `src/pages/AprenderVino.tsx` con contenido localizado en:
  - ES: `/aprender-vino`;
  - EN: `/en/learn-wine`;
  - IT: `/it/imparare-il-vino`;
  - FR: `/fr/apprendre-le-vin`;
  - DE: `/de/wein-lernen`;
  - PT: `/pt/aprender-vinho`.
- La página incluye:
  - canonical propio;
  - `hreflang` completo con `x-default`;
  - schema `LearningResource`, `BreadcrumbList` e `ItemList`;
  - enlaces a Biblioteca del vino, glosario, uvas, regiones, maridajes, guía de servicio, análisis de carta y demo.
- Se conectaron las rutas en `src/App.tsx` y `src/i18n/types.ts`.
- Se actualizó `supabase/functions/sitemap/index.ts`:
  - `STATIC_ROUTE_LASTMOD = '2026-06-30'`;
  - rutas localizadas;
  - entrada multilingüe para `/aprender-vino`.
- Se actualizó `supabase/functions/prerender/index.ts`:
  - `HREFLANG_MAP`;
  - `STATIC_LOCALIZED_ROUTES`;
  - `STATIC_PAGE_LABELS`;
  - página estática ES;
  - overrides localizados EN/IT/FR/DE/PT.
- Se actualizó `cloudflare-worker-v3-hybrid.js`:
  - aliases legacy desde rutas tipo `/biblioteca-vino/como-empezar`;
  - `LEARN_WINE_ALTERNATES`;
  - prerender estático Worker para las seis URLs;
  - inyección puente al sitemap si Supabase aún no incluye las URLs;
  - rutas exactas SEO en `SEO_EXACT`.
- Se actualizaron `public/llms.txt`, `public/llms-full.txt` y `public/sitemap-extra.json`.
- Se amplió `src/test/wine-library-seo-surface.test.ts` para proteger la nueva superficie.
- Verificaciones completadas:
  - `npm run test -- --run src/test/wine-library-seo-surface.test.ts`: 18 tests;
  - `node --check cloudflare-worker-v3-hybrid.js`;
  - parse JSON de `public/sitemap-extra.json`;
  - `git diff --check`;
  - `npm run build`;
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`;
  - `npm run deploy:worker:dry-run`;
  - QA con Chrome headless en `/aprender-vino`, `/en/learn-wine` y `/pt/aprender-vinho`: canonical correcto, 7 hreflangs, sin errores de consola y sin overflow horizontal.
- El intento de desplegar Supabase SEO falló porque no hay `SUPABASE_ACCESS_TOKEN` ni sesión CLI:
  - error: `LegacyPlatformAuthRequiredError`.
- Se creó el commit `9c005dd feat: add learn wine hub` y se subió a `origin/main`.
- Se desplegó Cloudflare Worker `winerim-proxy` Version ID `749b0929-9ac5-408b-8c51-7ee195051232`.
- El usuario confirmó después que Lovable desplegó las Edge Functions `sitemap` y `prerender` desde `main`.
- El usuario confirmó que el frontend quedó publicado desde Lovable.
- Producción tras Worker:
  - `/sitemap.xml` contiene las seis URLs de `Aprender vino`;
  - Googlebot recibe `200`, `x-prerendered: true`, `x-worker-branch: worker-static-prerender`, título, H1 y schema `LearningResource` en muestras ES/EN/PT.
- Revalidación Googlebot tras deploy completo:
  - las seis URLs devuelven `HTTP 200`;
  - `x-prerendered: true`;
  - título localizado correcto;
  - ninguna sirve `Página no encontrada`.
- Revalidación sitemap tras deploy completo:
  - `/sitemap.xml` contiene las seis URLs nuevas;
  - total observado: `2.240` nodos `<url>`.
- Revalidación producción humana tras deploy completo:
  - las seis URLs cargan contenido real;
  - canonical propio;
  - H1 localizado propio;
  - 7 `hreflang` por página;
  - sin `Página no encontrada`;
  - sin errores de consola;
  - sin overflow horizontal.
- El usuario informó dos hallazgos de seguridad preexistentes en buckets Supabase Storage:
  - `cartas-vinos`;
  - `lead-uploads`.
- Esos hallazgos quedaron fuera del alcance de este deploy y deben tratarse en una tarea separada.
- El servidor local está activo en `http://127.0.0.1:5173/`.
- Cambios no relacionados ya existentes y no tocados por esta sesión:
  - `index.html`;
  - `src/components/WineListAnalyzerTool.tsx`.

## Decisiones

- `Biblioteca del vino` queda como grafo/colección de entidades: uvas, regiones, estilos, maridajes, servicio y glosario.
- `Aprender vino` queda como capa guiada de aprendizaje para equipos de sala, enlazada a Biblioteca pero separada en arquitectura, intención y URLs.
- No crear subpáginas finas de iniciación dentro de Biblioteca; si se crean, deben colgar de `Aprender vino` o de blog/guias con intención propia.
- Mantener fallback/prerender en Worker para cubrir bots si Supabase `prerender` aún no está desplegado.
- Tratar la auditoría de buckets Supabase Storage como deuda de seguridad separada del despliegue SEO/LLM.

## Hipótesis

- Separar `Aprender vino` debería mejorar la comprensión SEO/LLM: una página responde a “por dónde empezar” y la Biblioteca responde a entidades concretas.
- El hub puede captar búsquedas informacionales y conducirlas hacia análisis de carta, demo y contenido de biblioteca con más intención comercial.
- Tras el deploy de Lovable, `Aprender vino` ya queda alineado para humano, sitemap y bots.

## Tareas pendientes

- Reenviar `/sitemap.xml` en Search Console.
- Solicitar indexacion selectiva de `/aprender-vino` si Search Console lo permite.
- Monitorizar rastreo/indexacion de las seis rutas de `Aprender vino`.
- Auditar los buckets Supabase Storage `cartas-vinos` y `lead-uploads` en una tarea separada de seguridad.
- Después de validar el hub, planificar spokes propios de iniciación: cata, vocabulario, tipos de vino, uvas para empezar, regiones para empezar, etiquetas, temperatura, copas, conservación, defectos, maridajes básicos y recomendación en sala.

## Actualización 2026-06-30: ejecución de los cinco pasos posteriores a `Aprender vino`

## Hechos

- Se reenvió `/sitemap.xml` en Search Console.
- Search Console confirmó: `Se ha enviado el sitemap correctamente`.
- `/sitemap.xml` aparece con fecha de envío `30 jun 2026`; la última lectura visible seguía en `29 jun 2026` justo después del envío.
- Se inspeccionó `https://winerim.wine/aprender-vino` en Search Console.
- Estado inicial de `/aprender-vino`:
  - `La URL no está en Google`;
  - `La página no está indexada: Descubierta: actualmente sin indexar`;
  - sitemap detectado: `https://winerim.wine/sitemap.xml`.
- Se solicitó indexación manual de `/aprender-vino`.
- Search Console aceptó la solicitud y mostró: `Se ha solicitado la indexación`.
- Tras la solicitud, `/aprender-vino` cambió a:
  - `La página no está indexada: Rastreada: actualmente sin indexar`;
  - último rastreo: `30 jun 2026, 9:41:46`;
  - rastreador: `Robot de Google para smartphones`;
  - obtención de página: `Correcto`;
  - sitemap detectado.
- Se inspeccionaron las seis rutas de `Aprender vino` en Search Console:
  - ES `/aprender-vino`: `Rastreada: actualmente sin indexar`;
  - EN `/en/learn-wine`: `Descubierta: actualmente sin indexar`;
  - IT `/it/imparare-il-vino`: `Descubierta: actualmente sin indexar`;
  - FR `/fr/apprendre-le-vin`: `Descubierta: actualmente sin indexar`;
  - DE `/de/wein-lernen`: `Descubierta: actualmente sin indexar`;
  - PT `/pt/aprender-vinho`: `Descubierta: actualmente sin indexar`;
  - las seis aparecen asociadas a `https://winerim.wine/sitemap.xml`.
- Se auditó el código de Supabase Storage para los buckets `lead-uploads` y `cartas-vinos`.
- Hallazgos de seguridad confirmados en migraciones previas:
  - ambos buckets se crearon como `public = true`;
  - existían políticas de lectura pública;
  - existían políticas de subida anónima con restricciones mínimas.
- Se preparó una migración nueva:
  - `supabase/migrations/20260630074507_harden_lead_storage_buckets.sql`.
- La migración preparada:
  - marca `lead-uploads` y `cartas-vinos` como privados;
  - fija límite de tamaño de `10 MB`;
  - restringe MIME types;
  - elimina políticas de lectura pública;
  - conserva subida anónima/authenticated solo para tipos permitidos.
- Se actualizó frontend:
  - `src/pages/AnalizaCarta.tsx`;
  - `src/components/ToolsLeadPopup.tsx`;
  - los uploads guardan referencias `storage://bucket/path` en vez de URLs públicas persistentes.
- Se actualizó `supabase/functions/send-lead-notification/index.ts`:
  - convierte referencias `storage://...` en URLs firmadas temporales de 14 días usando service role;
  - envía la URL firmada a notificación interna y Winerim Connect.
- El deploy directo de Supabase sigue bloqueado localmente por falta de `SUPABASE_ACCESS_TOKEN`.
- La validación local de lista de migraciones falló porque Supabase local no está arrancado en `127.0.0.1:54322`.
- Verificaciones pasadas:
  - `npm run build`;
  - `npm run test -- --run src/test/wine-library-seo-surface.test.ts`;
  - `npx --yes deno-bin check supabase/functions/send-lead-notification/index.ts supabase/functions/sitemap/index.ts supabase/functions/prerender/index.ts`;
  - `git diff --check`.
- Se creó `src/seo/APRENDER_VINO_SPOKES_PLAN_2026-06-30.md`.
- El plan de spokes incluye:
  - 12 temas;
  - slugs localizados ES/EN/IT/FR/DE/PT;
  - primera ola recomendada de 3 temas x 6 idiomas;
  - requisitos de enlazado interno, estructura SEO y posicionamiento LLM.
- Cambios no relacionados ya existentes y no tocados por esta sesión:
  - `index.html`;
  - `src/components/WineListAnalyzerTool.tsx`.
- Se creó y pusheó `9e274d0 feat: harden lead uploads and plan wine learning spokes`.
- El intento de deploy Supabase desde CLI falló por `LegacyPlatformAuthRequiredError`: falta `SUPABASE_ACCESS_TOKEN`.
- Lovable sigue redirigiendo a login en el navegador integrado de Codex, por lo que no se pudo publicar el commit desde ahí.

## Decisiones

- No solicitar indexación manual de las seis variantes de golpe; se pidió la URL ES principal y se monitorizó el resto para evitar gasto innecesario de cuota.
- Mantener los uploads de leads funcionando, pero sin buckets públicos ni URLs públicas persistentes.
- Resolver el acceso operativo a archivos de leads con URLs firmadas desde Edge Function, no desde el cliente público.
- Publicar primero los spokes de `Aprender vino` como blog/guias con intención propia, no como entidades de `Biblioteca del vino`.

## Hipótesis

- Google debería rastrear las variantes internacionales al procesar sitemap, hreflang y enlazado desde el hub.
- La URL ES puede pasar de `Rastreada: actualmente sin indexar` a indexada tras el recrawl, pero no conviene repetir solicitudes manuales.
- La migración de buckets reducirá exposición de cartas privadas sin romper captación si Lovable despliega migración, frontend y Edge Function de forma conjunta.
- La primera ola de spokes (`cata`, `vocabulario`, `maridajes básicos`) debería reforzar el hub y generar señales internas rápidas.

## Tareas pendientes

- Desplegar desde Lovable:
  - commit `9e274d0`;
  - migración `20260630074507_harden_lead_storage_buckets.sql`;
  - frontend actualizado;
  - Edge Function `send-lead-notification`.
- Revalidar tras deploy:
  - upload de archivo en `/analisis-carta`;
  - upload de archivo en popup de herramientas;
  - email interno con URL firmada;
  - webhook Winerim Connect con URL firmada;
  - URLs públicas antiguas de los buckets dejan de ser accesibles.
- Revisar Search Console en 48-72 horas:
  - `/aprender-vino`;
  - `/en/learn-wine`;
  - `/it/imparare-il-vino`;
  - `/fr/apprendre-le-vin`;
  - `/de/wein-lernen`;
  - `/pt/aprender-vinho`.
- Crear la migración de artículos para la primera ola:
  - `como-catar-vino-en-cinco-pasos`;
  - `vocabulario-de-cata-de-vino`;
  - `maridajes-basicos-para-restaurantes`;
  - con variantes EN/IT/FR/DE/PT adaptadas.
- Actualizar `Aprender vino` para enlazar esos spokes cuando estén publicados.

## Actualizacion 2026-06-30: despliegue parcial de seguridad Storage y auditoria de flujo real

## Hechos

- El usuario confirmo que Lovable marco los buckets `lead-uploads` y `cartas-vinos` como privados mediante storage tool.
- El usuario confirmo que la plataforma bloqueo SQL directo contra `storage.buckets`, por lo que no quedaron aplicados desde SQL:
  - `file_size_limit = 10 MB`;
  - `allowed_mime_types`.
- Tras hacer `fetch`, se incorporo desde remoto la migracion `supabase/migrations/20260630082747_c608b25f-fbaa-4950-b158-6611319b8ade.sql`, que contiene solo las politicas RLS aplicables.
- La migracion preparada previamente `supabase/migrations/20260630074507_harden_lead_storage_buckets.sql` se dejo como no-op documentado para que futuros despliegues no fallen al intentar actualizar `storage.buckets` por SQL.
- El usuario confirmo que las politicas RLS quedaron aplicadas:
  - `lead-uploads`: `INSERT` anon/auth solo en `analisis/<pdf|jpg|jpeg|png|webp>`;
  - `cartas-vinos`: `INSERT` anon/auth solo en `<pdf|jpg|jpeg|png>`;
  - `SELECT` publico eliminado.
- Validacion reportada por el usuario con anon key:
  - upload `lead-uploads/analisis/*.pdf`: `200`;
  - upload `lead-uploads/<root>.pdf`: `403`;
  - upload `cartas-vinos/*.pdf`: `200`;
  - read anonimo normal y `/public/...`: `400`.
- El usuario confirmo que `send-lead-notification` quedo desplegada y convierte `storage://bucket/path` en URL firmada de 14 dias con service role antes de enviar email y webhook.
- Verificacion read-only de produccion:
  - el chunk productivo `ToolsLeadPopup-5QA0vEF_.js` contiene `storage://cartas-vinos/...`;
  - ese chunk no contiene `getPublicUrl`;
  - por tanto el popup de herramientas publicado ya usa referencias privadas.
- Contradiccion detectada:
  - el resumen operativo decia que `/analisis-carta` envia `storage://lead-uploads/analisis/...`;
  - el chunk productivo de `/analisis-carta` no contiene `storage://`, `lead-uploads` ni `getPublicUrl`;
  - el build local actual tampoco los contiene en el chunk activo.
- Causa de la contradiccion:
  - `src/pages/AnalizaCarta.tsx` contiene un `handleSubmit` antiguo con subida privada a `lead-uploads/analisis/...`;
  - ese `handleSubmit` no esta conectado a ningun `<form>` renderizado;
  - la pantalla real de `/analisis-carta` renderiza `WineListAnalyzerTool`.
- Flujo real activo de `/analisis-carta`:
  - para archivos, `WineListAnalyzerTool` envia `FormData` a `https://api.winerim.wine/v1/analyze`;
  - despues usa `analysisId` y notifica leads via `send-lead-notification`;
  - para modo URL, `menu_link` conserva la URL enviada por el usuario;
  - para modo archivo, no se ha confirmado una URL de archivo en el lead: depende del backend externo.
- `https://api.winerim.wine` responde como servicio Cloudflare externo; no se localizo su codigo fuente en este repo.
- Verificaciones locales ejecutadas:
  - `npm run build` paso;
  - avisos no bloqueantes: Browserslist antiguo y chunks grandes.
- Cambios no relacionados siguen presentes y no se tocaron:
  - `index.html`;
  - `src/components/WineListAnalyzerTool.tsx`.

## Decisiones

- Dar por desplegada y validada la privacidad de `cartas-vinos` para el popup de herramientas.
- No dar por cerrado el flujo de privacidad de `/analisis-carta` hasta auditar `api.winerim.wine`.
- No migrar a ciegas `/analisis-carta` a Supabase Storage porque podria romper el analizador interactivo que depende de `/v1/analyze`.
- Mantener como tarea separada la configuracion de `file_size_limit` y `allowed_mime_types` a nivel bucket desde Lovable Cloud Storage o soporte.
- Mantener documentada la existencia de codigo muerto en `AnalizaCarta.tsx` para limpiarlo o reconectarlo con intencion explicita.

## Hipotesis

- `api.winerim.wine` probablemente guarda o procesa temporalmente los archivos fuera de Supabase Storage; la retencion y permisos no pueden inferirse desde este repo.
- Los leads del analizador en modo archivo pueden estar llegando con `analysisId` pero sin enlace directo al PDF original, salvo que el backend externo lo anada por otra via.
- El endurecimiento de `lead-uploads` sigue siendo util para el codigo preparado/futuro, pero no protege por si solo el flujo activo de PDFs de `/analisis-carta`.

## Tareas pendientes

- Auditar o localizar el codigo/deploy de `https://api.winerim.wine`:
  - donde almacena PDFs;
  - tiempo de retencion;
  - permisos/acceso;
  - borrado o anonimizado;
  - si puede devolver una referencia privada o firmada al lead.
- Decidir si `WineListAnalyzerTool` debe seguir enviando archivos al backend API o si conviene redisenar el flujo con Storage privado + worker/API.
- Ajustar `file_size_limit` y `allowed_mime_types` desde Lovable Cloud Storage si el panel lo permite.
- Limpiar o reconectar el `handleSubmit` muerto de `src/pages/AnalizaCarta.tsx` para evitar futuras conclusiones erroneas.
- Retomar la primera ola de spokes de `Aprender vino` y su publicacion multilingue.

## Actualizacion 2026-07-03: estado tras agentes paralelos y despliegue Worker

## Hechos

- Se completó una ronda con cuatro agentes paralelos:
  - Ágora/documento comercial;
  - Biblioteca del vino + Aprender vino;
  - CloudRIM/SAVia/Funcionalidades;
  - SEO/Search Console/sitemap/llms audit.
- Ágora:
  - V5 comercial creada y validada visualmente;
  - DOCX y PDF finales en `/Users/GOIKO/Documents/Playground/agora_doc_2026-07-03/output/`;
  - el documento refuerza qué es Winerim y mantiene cautelas sobre API, permisos, sandbox y acciones críticas.
- Biblioteca del vino + Aprender vino:
  - migración local creada: `supabase/migrations/20260703141412_add_wine_library_learn_wine_editorial_expansion.sql`;
  - añade 12 artículos nuevos, 2 grupos editoriales, 6 idiomas;
  - fechas: `2026-07-06` y `2026-07-13`;
  - no está aplicada remoto por falta de `SUPABASE_ACCESS_TOKEN` y proyecto Supabase no enlazado.
- CloudRIM/SAVia:
  - React actualizado en páginas de producto y funcionalidades;
  - `llms.txt` y `llms-full.txt` actualizados;
  - Worker está enriquecido para CloudRIM/SAVia;
  - Worker desplegado con Version ID `8dd5e4dc-33da-4269-a0a1-7899a9e2e910`.
- Sitemap:
  - `public/sitemap.xml` local queda con `2.305` URLs;
  - producción `https://winerim.wine/sitemap.xml` devuelve `2.305` URLs, sin duplicados;
  - `/presentacion` y variantes localizadas ya aparecen con alternates;
  - CloudRIM y SAVia aparecen con alternates.
- Producción validada:
  - Googlebot `/producto/cloudrim`: `200`, `worker-static-prerender`, `283` palabras, `7` alternates;
  - Googlebot `/producto/savia`: `200`, `worker-static-prerender`, `281` palabras, `7` alternates;
  - `http://winerim.wine/sitemap.xml` redirige `301` a HTTPS.
- Producción aún problemática:
  - `http://winerim.wine/` devuelve `200`, no `301`;
  - `http://winerim.wine/producto/cloudrim` devuelve `200`, no `301`;
  - `https://www.winerim.wine/` devuelve `421`.
- Verificaciones locales pasadas:
  - `git diff --check`;
  - `node --check` de Worker y script sitemap;
  - `npm run generate:sitemap-static`;
  - `npm run build`;
  - `npm run test` (`57` tests).
- Cambio ajeno/no propio:
  - `src/components/WineListAnalyzerTool.tsx` sigue modificado y no fue tocado ni revertido.

## Decisiones

- No aplicar la migración editorial hasta tener credenciales Supabase o ejecutarla desde Lovable/Supabase.
- Dar por desplegada solo la parte Worker; frontend React y migraciones siguen dependiendo de publish/aplicación en Lovable/Supabase.
- Mantener las capturas actuales en Funcionalidades porque las nuevas candidatas no estaban limpias para publicación.
- Tratar `www` y HTTP global como configuración Cloudflare/DNS/certificado pendiente.

## Hipótesis

- La producción puede estar aplicando Worker en sitemap y rutas bot, pero no en todas las rutas HTTP humanas; por eso sitemap redirige y páginas HTTP siguen `200`.
- El frontend publicado todavía puede no reflejar todas las mejoras React hasta que Lovable publique el repo actual.
- Search Console debería actualizar el conteo y alternates tras reenviar sitemap y recrawl.

## Tareas pendientes

- Aplicar `20260703141412_add_wine_library_learn_wine_editorial_expansion.sql`.
- Publicar o verificar frontend Lovable con cambios CloudRIM/SAVia/Funcionalidades.
- Reenviar sitemap en Search Console y solicitar indexación selectiva de `/presentacion`.
- Corregir DNS/certificado/routing de `www.winerim.wine`.
- Activar regla Cloudflare equivalente a `Always Use HTTPS` para todas las rutas.
- Revalidar producción humana y Googlebot tras frontend/migración.
