# Decisions Log

## 2026-07-01

### Segunda oleada publicada y extension comercial `Como lo hace Winerim`

#### Hechos

- Lovable/Supabase ya exponia las 18 URLs nuevas de la segunda oleada de `Aprender vino`.
- Se desplego Cloudflare Worker `winerim-proxy` version `6d8af13d-2ac0-4626-8535-2f5457954d56`.
- Produccion valida como Googlebot:
  - 18/18 articulos nuevos con `HTTP 200`, `x-prerendered: true`, canonical propio y contenido real;
  - 6/6 hubs `Aprender vino` con `HTTP 200`, `worker-static-prerender`, `x-prerendered: true`, canonical propio y 6 guias enlazadas por idioma.
- Navegador real valida los hubs con 6 enlaces de articulo, canonical correcto y sin overflow en desktop/mobile.
- `/sitemap.xml` productivo contiene `2282` URLs e incluye las 18 URLs nuevas.
- Search Console recibio de nuevo `/sitemap.xml` correctamente, pero aun mostraba `2.264` paginas descubiertas antes de procesar la lectura nueva.
- Search Console devolvio `Cuota superada` al intentar solicitar indexacion manual de la primera URL ES nueva.
- Se ampliaron las secciones comerciales:
  - `ConnectedCellarSection` ahora admite variantes `core` y `supply`;
  - `WinerimCore` explica como datos operativos se convierten en diagnosticos;
  - `WinerimSupply` explica como albaranes/compras se convierten en criterios de reposicion;
  - `MetaDemoLanding` incorpora una version corta `Que veras en la demo`.
- Se corrigio el conector DE/PT de `WinerimSupply`, que heredaba texto frances.
- Validaciones locales: build OK, `git diff --check` OK y QA navegador desktop/mobile OK.

#### Decisiones

- Mantener el orden de publicacion para contenido dependiente de Supabase: articulos primero, Worker despues.
- No forzar mas solicitudes manuales cuando Search Console devuelve cuota superada; dejarlas para el siguiente reinicio de cuota.
- Reutilizar el componente `ConnectedCellarSection` con variantes contextuales para reducir duplicacion y mantener paridad visual.
- Mantener la landing Meta como pagina de conversion pagada: explicacion corta del flujo operativo, no pagina larga de producto.

#### Hipotesis

- La segunda oleada deberia empezar a descubrirse mejor tras el reenvio del sitemap y el enlazado desde los hubs.
- La extension comercial de Core/Supply deberia mejorar comprension y conversion porque convierte el claim `subes albaranes y olvidate` en un flujo concreto.
- La discrepancia `2.264` vs `2282` deberia resolverse cuando Search Console procese la nueva lectura del sitemap.

#### Tareas pendientes

- Publicar frontend en Lovable.
- Revalidar produccion de Core, Supply y `go.winerim.wine`.
- Solicitar manana indexacion de las 3 URLs ES nuevas de la segunda oleada y de `/it/calcolatrice-margini-vino`.
- Corregir la deuda de localizacion de `DecisionCenterTeaser` en PT/DE.

### Segunda oleada `Aprender vino`

#### Hechos

- Se preparo una segunda oleada de `Aprender vino` con 18 articulos: 3 temas x 6 idiomas.
- La migracion creada es `supabase/migrations/20260701102537_add_learn_wine_second_spokes.sql`.
- Temas:
  - tipos de vino para entender una carta;
  - uvas/castas/cepages/rebsorten para empezar;
  - regiones vinicolas para empezar en restaurante.
- Se actualizaron el hub `Aprender vino`, prerender, Worker fallback, `llms.txt`, `llms-full.txt` y el test SEO enfocado.
- Validaciones pasadas:
  - test SEO enfocado;
  - build;
  - Worker syntax check;
  - Deno check de `prerender`/`sitemap`;
  - `git diff --check`;
  - QA navegador local desktop/mobile en ES/EN/PT con 6 enlaces y sin overflow.
- La migracion contiene 18 slugs unicos, 3 `article_group` y `ON CONFLICT (slug) DO UPDATE`.
- No se desplego Worker todavia porque depende de que los articulos existan antes en Supabase.

#### Decisiones

- Mantener `Aprender vino` como ruta guiada de articulos, separada de la capa de entidades de `Biblioteca del vino`.
- Publicar la oleada 2 como contenido B2B para equipos de sala, no como contenido editorial generico.
- Coordinar deploy: migracion Supabase, frontend, Edge Functions y Worker deben publicarse juntos o en ese orden.

#### Hipotesis

- Tipos de vino, uvas iniciales y regiones iniciales completan mejor el recorrido de aprendizaje y mejoran la comprension del hub para Google/LLMs.
- Exponer los nuevos enlaces en React, prerender, Worker y `llms` deberia facilitar descubrimiento cuando la base productiva tenga los articulos.

#### Tareas pendientes

- Aplicar la migracion en Lovable/Supabase.
- Publicar frontend y Edge Functions.
- Desplegar Worker despues de aplicar migracion/frontend.
- Revalidar produccion y Search Console.

### Produccion e indexacion de distribuidores/margenes

#### Hechos

- El usuario confirmo que el deploy/publish/purge estaba hecho.
- Produccion valida 12/12 rutas de distribuidores y calculadora de margen como Googlebot con `HTTP 200`, `x-prerendered: true`, canonical propio, 7 `hreflang`, H1 localizado y sin fallback/home.
- Produccion valida 12/12 rutas en navegador real para usuarios con contenido localizado, H1 correcto y canonical propio.
- `/sitemap.xml` responde `200`, contiene las 12 URLs revisadas y expone `2264` entradas.
- Search Console tenia `/sitemap.xml` como `Correcto` y se reenvio correctamente el 1 jul 2026.
- Search Console acepto 11 solicitudes manuales de indexacion/reindexacion:
  - `/distribuidor`;
  - `/calculadora-margen-vino`;
  - `/en/distributor`;
  - `/en/wine-margin-calculator`;
  - `/pt/distribuidor`;
  - `/pt/calculadora-margem-vinho`;
  - `/fr/distributeur`;
  - `/fr/calculateur-marge-vin`;
  - `/de/haendler`;
  - `/de/wein-margen-rechner`;
  - `/it/distributore`.
- Search Console bloqueo la solicitud de `/it/calcolatrice-margini-vino` por cuota diaria superada.
- `/it/calcolatrice-margini-vino` aparece como `Rastreada: actualmente sin indexar`, pero con rastreo permitido, obtencion correcta, indexacion permitida, canonical propio seleccionado y sitemap detectado.
- `/pt/distribuidor` aparece como `Pagina alternativa con etiqueta canonica adecuada`, aunque produccion muestra canonical propio y hreflang correcto.

#### Decisiones

- Considerar cerrada la validacion tecnica de produccion para distribuidores y calculadora de margen.
- Respetar la cuota diaria de Search Console y dejar `/it/calcolatrice-margini-vino` como primera solicitud manual de manana.
- Monitorizar `/pt/distribuidor` antes de hacer cambios: la senal de canonical alternativa no contradice por ahora la validacion tecnica de canonical/hreflang.
- Mantener la fuente de descubrimiento principal en sitemap + enlazado interno; usar solicitudes manuales solo para URLs estrategicas.

#### Hipotesis

- Las solicitudes manuales aceleraran el recrawl de las rutas comerciales nuevas, pero Google puede tardar dias en cambiar de `Descubierta`/`Rastreada` a indexada.
- El desfase de Search Console entre `2.258` paginas descubiertas y `2264` URLs reales del sitemap deberia corregirse tras la nueva lectura.
- Si `/pt/distribuidor` sigue como alternativa en 48-72 horas, puede requerir mas diferenciacion local, enlaces internos PT o revision de canonicals historicos.

#### Tareas pendientes

- Solicitar manana la indexacion de `https://winerim.wine/it/calcolatrice-margini-vino`.
- Revisar en 48-72 horas el estado de las 12 rutas.
- Comprobar si Search Console actualiza el conteo de URLs descubiertas del sitemap.
- Vigilar especialmente `/pt/distribuidor`.

### Revision de distribuidores y margenes

#### Hechos

- Se actualizaron las secciones/paginas de distribuidores y calculadora de margen en seis idiomas.
- `Distribuidor` ahora se posiciona como programa B2B para partners HORECA y elimina claims no documentados como `15M+ restaurantes`, `90%` y `producto que se vende solo`.
- `Distribuidor` incorpora breadcrumbs, contenido localizado de modelo de partner, requisitos, escenarios economicos, proceso, mercados, FAQ schema e internal links.
- Se anadio `/distribuidor` al `ROUTE_MAP`, `sitemap`, `prerender`, Worker, `sitemap-extra` y archivos `llms`.
- `CalculadoraMargen` incorpora canonical localizado, FAQ visible/schema localizado e internal links localizados.
- Se corrigio un bug de runtime en `CalculadoraMargen` por import ausente de `useEffect`.
- Se corrigio overflow movil en `InternalLinks` con `grid-cols-1`, `min-w-0` y `w-full`.
- Se completo en `prerender` la matriz de alternates de la calculadora con DE/PT.
- Se pusheo el commit `b981921 feat: refine distributor and margin SEO pages` a `origin/main`.
- El deploy CLI de Supabase SEO fallo por falta de `SUPABASE_ACCESS_TOKEN`.
- Se desplego Cloudflare Worker `winerim-proxy` version `31bbbf98-93f6-4659-81fb-5ece89be0214`.
- Tras detectar que la Edge Function antigua devolvia contenido/canonical de home para `/distribuidor`, se anadio prerender estatico de emergencia en Worker para las seis rutas de distribuidores.
- Con cache-buster, Googlebot recibe ya `worker-static-prerender` correcto para ES y EN de distribuidores; sin query queda pendiente purga de cache Cloudflare.
- Validaciones locales pasadas: build, Worker check, Deno check de Edge Functions, JSON de `sitemap-extra`, `git diff --check` y QA navegador desktop/mobile.
- Cambio local ajeno `src/components/WineListAnalyzerTool.tsx` sigue sin tocarse.

#### Decisiones

- Tratar la pagina de distribuidores como programa de partner comercial HORECA, no como promesa de exclusividad o rentabilidad automatica.
- Mantener claims prudentes sobre margen, territorio y soporte hasta que cada acuerdo comercial los concrete.
- Mantener `/de/haendler` como canonical aleman de distribuidores.
- Usar `FAQSection` para FAQ visibles y schema multilingue en la calculadora, evitando JSON-LD manual solo en espanol.
- Corregir el overflow en el componente comun `InternalLinks` porque afecta a varias paginas, no solo a distribuidores/margenes.
- Usar Worker static prerender como puente temporal cuando la Edge Function productiva aun no esta desplegada y devuelve contenido generico.

#### Hipotesis

- El nuevo enfoque de distribuidores deberia atraer partners mas cualificados porque explica fit, proceso y requisitos.
- La calculadora de margen deberia mejorar su recuperabilidad SEO/LLM por tener FAQ localizada, enlaces internos correctos y coherencia entre React y prerender.
- La paridad entre rutas React, sitemap, prerender, Worker y `llms` deberia reducir incidencias futuras en Search Console.

#### Tareas pendientes

- Publicar frontend en Lovable.
- Desplegar `sitemap` y `prerender` desde Lovable/Supabase.
- Purgar cache Cloudflare de las seis URLs de distribuidores o esperar expiracion de cache antes de pedir indexacion.
- Revalidar produccion humana y Googlebot para distribuidores y calculadora de margen en seis idiomas.
- Reenviar sitemap e inspeccionar URLs prioritarias en Search Console.

### Produccion e indexacion de primera oleada `Aprender vino`

#### Hechos

- El usuario confirmo que el publish estaba hecho.
- Se desplego Cloudflare Worker `winerim-proxy` version `77662a6b-a0b0-4e2f-bfbf-b4c7cb3ad06b`.
- Produccion como Googlebot valida los 6 hubs de `Aprender vino` con `200`, `worker-static-prerender`, `x-prerendered: true` y 3/3 enlaces a articulos por idioma.
- Produccion como Googlebot valida los 18 articulos de la primera oleada con `200`, prerender, canonical correcto y contenido real.
- `/sitemap.xml` contiene las 18 URLs de articulos de la oleada.
- Search Console acepto el reenvio de `/sitemap.xml`.
- Search Console mostro `/aprender-vino` ya indexada y acepto la solicitud de reindexacion.
- Search Console mostro los 3 articulos ES como `Descubierta: actualmente sin indexar`, presentes en sitemap y aptos para indexacion tras prueba de URL publicada.
- Search Console acepto la solicitud de indexacion de:
  - `https://winerim.wine/article/como-catar-vino-en-cinco-pasos`;
  - `https://winerim.wine/article/vocabulario-de-cata-de-vino`;
  - `https://winerim.wine/article/maridajes-basicos-para-restaurantes`.

#### Decisiones

- Considerar cerrada la publicacion tecnica de la primera oleada de `Aprender vino`.
- No pedir indexacion manual masiva de las 18 variantes de golpe; monitorizar primero hub y articulos ES.
- Mantener como siguiente foco la publicacion/revalidacion de distribuidores/margenes y la segunda oleada editorial.

#### Hipotesis

- Al refrescar el hub indexado y pedir los tres articulos ES, Google deberia descubrir mejor la estructura hub-and-spoke.
- Las variantes internacionales deberian beneficiarse del sitemap y del enlazado, aunque pueden requerir solicitudes selectivas posteriores.

#### Tareas pendientes

- Revisar Search Console en 48-72 horas.
- Pedir indexacion de variantes internacionales solo si el primer lote progresa o si alguna URL prioritaria queda estancada.
- Continuar con publicacion/revalidacion de distribuidores/margenes y segunda oleada de `Aprender vino`.

### Primera oleada de articulos `Aprender vino`

#### Hechos

- Se preparo una migracion Supabase para publicar 18 articulos de `Aprender vino`.
- La oleada cubre tres temas en seis idiomas:
  - catar vino en cinco pasos;
  - vocabulario de cata;
  - maridajes basicos para restaurantes.
- Se actualizo el hub `Aprender vino` para enlazar los tres spokes por idioma.
- Se actualizaron prerender, Worker fallback, `llms.txt`, `llms-full.txt` y test SEO para exponer los nuevos enlaces.
- Las validaciones locales de build, test SEO, Worker, Edge Functions y QA Playwright pasaron.

#### Decisiones

- Mantener los nuevos contenidos como articulos localizados, no como entidades de `Biblioteca del vino`.
- Publicar por oleadas pequenas para mantener calidad editorial y control de indexacion.
- Usar slugs localizados en ruta y sufijo de idioma en Supabase para las variantes internacionales.
- El CTA de las tarjetas del hub debe ser de lectura de guia, no de exploracion de biblioteca.

#### Hipotesis

- Estos spokes reforzaran el hub `Aprender vino` para SEO convencional y LLMs porque crean enlaces, contenido extraible y rutas de aprendizaje claras.
- La combinacion de cata, vocabulario y maridaje cubre intenciones iniciales utiles para restaurantes y equipos de sala.

#### Tareas pendientes

- Aplicar la migracion en Supabase/Lovable.
- Publicar frontend y Edge Functions actualizadas.
- Validar produccion y reenviar sitemap en Search Console.
- Continuar con la segunda oleada editorial.

## 2026-06-30

### Implementacion inicial de `Como lo hace Winerim` y briefs de `Aprender vino`

#### Hechos

- Se creo `src/components/landing/ConnectedCellarSection.tsx` como seccion comercial nueva para la home.
- `HomeBelowFold` carga la seccion despues de `HowItWorksSection`.
- La seccion esta localizada en seis idiomas y cubre flujo de compras, TPV, stock, carta, margen y decisiones.
- Se amplio `src/seo/APRENDER_VINO_SPOKES_PLAN_2026-06-30.md` con briefs ejecutables para los tres primeros spokes.
- `npm run build` paso correctamente.
- QA local desktop/mobile valido visibilidad de la seccion, ausencia de overflow y ausencia de errores de consola.

#### Decisiones

- Publicar primero el bloque comercial en home antes de llevarlo a producto o funnels.
- Mantener lenguaje prudente sobre integraciones y automatizacion.
- Ejecutar `Aprender vino` en oleadas pequenas: primero 3 temas x 6 idiomas.

#### Hipotesis

- El bloque `Como lo hace Winerim` aumenta claridad comercial porque muestra el proceso completo de bodega conectada.
- Los briefs reducen el riesgo de contenido educativo generico y ayudan a mantener una voz propia frente a referencias tipo La RVF.

#### Tareas pendientes

- Publicar frontend desde Lovable y validar produccion.
- Adaptar el bloque a producto/funnels.
- Crear y publicar los articulos de la primera oleada de `Aprender vino`.

### Nueva seccion comercial sobre operativa conectada de Winerim

#### Hechos

- El usuario aporto una bateria de copys sobre stock/TPV, margenes, albaranes/facturas/compras, carta digital, direccion y sumiller.
- El objetivo es valorar una nueva seccion web tipo `sabias que...` o `como lo hace Winerim`.
- Los angulos con mayor encaje para web son los que explican el sistema completo: compras, ventas, TPV, stock, carta y margen conectados.

#### Decisiones

- Convertir estos copys en una seccion de conversion para web, no tratarlos solo como headlines de Meta.
- Mantener prudencia con claims como `al momento` si dependen de integracion activa con TPV/proveedor.

#### Hipotesis

- Una seccion de flujo operativo puede ayudar a vender Winerim mejor que una lista de features porque convierte conceptos tecnicos en una transformacion visible para propietario, direccion y sumiller.

#### Tareas pendientes

- Redactar version final de la seccion y decidir ubicacion inicial.
- Confirmar alcance tecnico real de TPV/albaranes/facturas antes de publicar claims absolutos.

### Re-test productivo de formulario `go.winerim.wine`

#### Hechos

- Se repitio la prueba del formulario de `https://go.winerim.wine/`.
- Un primer intento con email `codex-qa-go-retest-20260630153825@winerim.com` no se envio porque faltaba el campo obligatorio `phone_prefix`; no genero llamadas de red ni lead.
- El intento valido uso email `codex-qa-go-retest-20260630154016@winerim.com`, restaurante `CODEx QA Go Retest 20260630154016` y UTMs `qa_20260630154016`.
- La landing mantuvo `noindex, follow`, UTMs ocultos correctos y chat desactivado.
- El formulario valido redirigio a `/gracias?tipo=demo&origen=meta`.
- `contact_leads` respondio `201`.
- `send-lead-notification` respondio `200` con `connect_forwarded:true`.
- `submit-gastrofunnel` respondio `200` con upstream `success:true` y `lead_id` `f388a0b4-bf19-4724-a1ed-f93211d05f13`.

#### Decisiones

- Mantener chat fuera de esta QA.
- Incluir siempre `phone_prefix` en scripts de prueba de la landing Meta porque es un select obligatorio.

#### Hipotesis

- El CRM deberia mostrar el lead `codex-qa-go-retest-20260630154016@winerim.com` con la atribucion de campana `qa_20260630154016`.

#### Tareas pendientes

- Confirmar visualmente el lead en Winerim Connect/CRM.
- No usar el intento `20260630153825` como evidencia de lead creado.

### QA productiva de formularios sin chat

#### Hechos

- El usuario decidio dejar el chat fuera de la tanda actual.
- Se probaron formularios productivos en `/demo`, `/contacto`, popup de herramientas en `/recursos` y `https://go.winerim.wine/`.
- Los emails de prueba fueron `codex-qa-demo-20260630125959@winerim.com`, `codex-qa-contacto-20260630125959@winerim.com`, `codex-qa-popup-20260630125959@winerim.com` y `codex-qa-go-20260630125959@winerim.com`.
- En `/demo`, `/contacto` y popup de `/recursos`, `contact_leads` respondio `201` y `send-lead-notification` respondio `200` con `connect_forwarded:true`.
- En `go.winerim.wine`, `contact_leads` respondio `201`, `send-lead-notification` respondio `200` con `connect_forwarded:true` y `submit-gastrofunnel` respondio `200` con upstream `success:true`.
- El chat de `go.winerim.wine` estaba desactivado como se esperaba.

#### Decisiones

- No seguir probando chat en esta fase; queda fuera hasta nueva instruccion.
- Considerar las respuestas `connect_forwarded:true` como validacion tecnica de envio a Winerim Connect/CRM, pendiente de comprobacion visual en el CRM.

#### Hipotesis

- Los abortos de analitica y `404` genericos de consola no forman parte del flujo critico de lead.

#### Tareas pendientes

- Confirmar visualmente en Winerim Connect/CRM los cuatro leads QA con sus emails de prueba.
- Investigar los `404` genericos solo como limpieza secundaria, no como bloqueo de captacion.

### Validacion productiva de landing Meta Demo reforzada

#### Hechos

- `https://go.winerim.wine/` ya sirve la version reforzada de la landing Meta Demo.
- Produccion muestra logo real, `+2.000 restaurantes`, testimonios reales, OpenGraph correcto, `noindex, follow` y UTMs ocultos correctos.
- Se envio un formulario test productivo con `codex-prod-test+winerim-meta@winerim.com`.
- `contact_leads` respondio `201`, `send-lead-notification` respondio `200` y la landing redirigio a `/gracias?tipo=demo&origen=meta`.
- Aparecio una llamada adicional a `submit-gastrofunnel` con respuesta inicial `500`.
- Tras integrar el commit remoto de Lovable `644db09`, `submit-gastrofunnel` aparece versionada en `supabase/functions/submit-gastrofunnel/index.ts`.
- Una llamada diagnostica directa a `submit-gastrofunnel` respondio `200` con upstream `success:true`.
- Una segunda prueba completa de formulario productivo respondio `contact_leads` `201`, `send-lead-notification` `200`, `submit-gastrofunnel` `200` y redirigio a gracias.

#### Decisiones

- No repetir DNS, Worker ni publish frontend para esta landing salvo cambios nuevos; la version reforzada ya esta publicada.
- Concentrar el siguiente trabajo en confirmar visualmente CRM/Winerim Connect y monitorizar las primeras campanas, no en reabrir frontend/DNS.

#### Hipotesis

- El `500` inicial de `submit-gastrofunnel` pudo deberse a una ventana de despliegue/secrets antes de que Lovable dejara la funcion estable; la revalidacion posterior ya devuelve `200`.
- Si `send-lead-notification` no esta desplegada desde `34b6900`, `submit-gastrofunnel` funciona como envio paralelo al CRM mientras se confirma la version exacta de la notificacion.

#### Tareas pendientes

- Confirmar que los leads test aparecen en Winerim Connect/CRM con UTMs y `fbclid`.
- Monitorizar `submit-gastrofunnel` durante las primeras campanas reales.

### Refuerzo landing Meta Demo: logo, testimonios y CRM

#### Hechos

- Se reviso la landing Meta Demo tras el publish inicial y se aplicaron mejoras en `src/pages/MetaDemoLanding.tsx`.
- La cabecera ahora usa el logo real de Winerim (`winerim-logo.webp`) en vez de texto plano.
- El OpenGraph de la landing apunta explicitamente a `https://winerim.wine/og-image.png`.
- Se cambio la prueba social de `+1.000 bodegas gestionadas` a `+2.000 restaurantes`.
- Se sustituyeron los tres casos plantilla por testimonios reales de Simone Monese, Lorena Cuevas y Xavi Nolla.
- Se reviso la nota tecnica sobre `action` del formulario: en esta app el formulario no debe depender de un `action` HTML plano, porque ya esta conectado por React `onSubmit` a Supabase y a la Edge Function de notificaciones.
- `notifyLead` ahora devuelve estado de exito/error y la landing espera la respuesta antes de navegar a gracias.
- `send-lead-notification` ahora reenvia a Winerim Connect los campos de atribucion de Meta y considera obligatorio el CRM en leads de `meta_demo_landing`/`meta_campaign`.
- Validaciones locales pasadas: build, `deno check`, `git diff --check` y prueba Playwright/Chrome con formulario enviado; Supabase `contact_leads` respondio `201` y la Edge Function respondio `200`.
- El deploy directo de la Edge Function por CLI no pudo hacerse por falta de `SUPABASE_ACCESS_TOKEN`.

#### Decisiones

- La cifra oficial para esta landing queda en `+2.000 restaurantes`.
- No se publican placeholders ni testimonios inventados en campanas; se usan testimonios reales ya presentes en la web.
- No se anade `action` HTML estatico al formulario de la landing, porque podria saltarse la insercion controlada, tracking, atribucion o CRM.
- El reenvio a Winerim Connect/CRM es obligatorio para la landing Meta y debe desplegarse en `send-lead-notification`.

#### Hipotesis

- La espera explicita de `notifyLead` hara mas fiable el envio a CRM antes de redirigir a la pagina de gracias.
- Reenviar UTMs y `fbclid` al CRM dara suficiente trazabilidad para las primeras campanas sin crear todavia nuevas columnas de atribucion.

#### Tareas pendientes

- Publicar frontend desde Lovable con la landing reforzada.
- Desplegar `send-lead-notification` desde Lovable Cloud/Supabase.
- Repetir prueba de formulario en produccion y confirmar que el lead aparece en Winerim Connect.

### Landing Meta Demo para campañas

#### Hechos

- Se transcribio el audio recibido el 2026-06-30; confirma los entregables de Meta: ID de cuenta publicitaria, identificador del conjunto de datos/pixel, codigo Pixel, UTMs, captura de campos ocultos y HTML de la landing.
- Se implemento una landing de captacion separada para campanas de Meta en `src/pages/MetaDemoLanding.tsx`.
- Se anadio la ruta `/meta-demo` en React y se preparo la raiz de `go.winerim.wine` para mostrar esa landing mediante deteccion de host.
- La landing captura campos UTM ocultos (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`) y tambien `fbclid`, URL y referrer.
- La atribucion se guarda en `contact_leads.message` como JSON junto con los datos del formulario; no se anadieron columnas nuevas a la base de datos.
- La landing usa `form_type="demo"` para integrarse con el flujo actual de notificaciones y conversiones.
- El Pixel Meta `450273446324682` se incorpora dentro de la landing y solo dispara si hay consentimiento aceptado.
- Se desactivo el chat externo para `/meta-demo` y para el host `go.winerim.wine`.
- Se registro `/meta-demo` como ruta `noindex` en Cloudflare Worker.
- Validaciones locales completadas: `npm run build`, `npm run deploy:worker:dry-run`, QA desktop y QA mobile sin overflow.
- Se creo y pusheo a `origin/main` el commit `43e1cae feat: add meta demo campaign landing`.
- Se desplego Cloudflare Worker `winerim-proxy` con version `635e8855-8d39-4473-b37c-f3566653dd70`.
- Produccion ya devuelve `HTTP 200` y `x-robots-tag: noindex, follow` en `https://winerim.wine/meta-demo`, pero aun renderiza la home antigua porque falta publicar el frontend en Lovable.
- Se creo el DNS `go.winerim.wine` en Cloudflare como `A 185.158.133.1`, proxied, TTL Auto.
- Se anadio la ruta Worker `go.winerim.wine/*` a `winerim-proxy`, manteniendo `winerim.wine/*`.
- Se actualizo y desplego Cloudflare Worker `winerim-proxy` version `e850fe30-c8de-4fef-b7da-5bce3ea11667` para que todo el host `go.winerim.wine` reciba `X-Robots-Tag: noindex, follow`.
- Validacion productiva: `go.winerim.wine` resuelve a Cloudflare, responde `HTTP 200`, pasa por `x-worker-branch: spa` y devuelve `x-robots-tag: noindex, follow`.
- `go.winerim.wine` aun renderiza la home antigua porque falta publicar el frontend en Lovable.

#### Decisiones

- No hay decision nueva derivada del audio; se mantiene el plan ya implementado para Pixel/UTMs/landing.
- Usar `go.winerim.wine` como subdominio recomendado para funnels de campanas.
- No usar `demo.winerim.wine` sin revisar antes porque la comprobacion DNS muestra que ya resuelve.
- Mantener la landing fuera de SEO/indexacion; es una pagina de conversion pagada, no un activo editorial.
- No publicar testimonios falsos ni placeholders literales; los espacios de casos pendientes se mantienen como pendientes de prueba real.
- Evitar migracion de base de datos en esta fase y guardar UTMs en `message`; reevaluar si se necesita reporting avanzado por campana/anuncio.
- Respetar consentimiento antes de cargar/disparar Meta Pixel.
- Crear `go.winerim.wine` como registro `A` proxied a `185.158.133.1`, siguiendo el patron ya usado por `demo.winerim.wine`.
- Aplicar `noindex, follow` por cabecera a todo el host `go.winerim.wine`, no solo a la ruta `/meta-demo`.

#### Hipotesis

- Una landing sin navegacion, footer, chat, FAQ ni CTAs secundarios reducira distracciones frente a `/demo` para trafico frio de Meta.
- `go.winerim.wine` es suficientemente corto y reutilizable para nuevos funnels sin bloquear el significado de `demo`.
- Si las campanas escalan, necesitaremos columnas UTM dedicadas o una tabla de attribution para reporting comercial mas limpio.

#### Tareas pendientes

- Publicar el frontend desde Lovable desde `origin/main` commit `43e1cae` o posterior.
- No repetir DNS ni ruta Worker para `go.winerim.wine`; ya estan activos.
- No redeplegar Worker salvo cambios nuevos; la version activa para `go` noindex es `e850fe30-c8de-4fef-b7da-5bce3ea11667`.
- Validar produccion con UTMs reales y comprobar lead/notificacion.
- Resolver la contradiccion de prueba social: `+1.000 bodegas gestionadas` frente a `+2.000 restaurantes`.
- Conseguir tres testimonios reales antes de escalar presupuesto.

## 2026-06-29

### Auditoria de articulos publicados y pendientes SEO/LLM

Nota 2026-06-30: el estado de esta auditoria queda superado en la parte del hub de iniciacion. La capa ya fue implementada en codigo como `Aprender vino`, separada de `Biblioteca del vino`; queda pendiente publicacion completa y validacion productiva.

#### Hechos

- Se comprobo Supabase, sitemap y produccion para distinguir articulos publicados de mejoras pendientes.
- Supabase expone `440` articulos publicados en total: `de` 75, `en` 74, `es` 69, `fr` 74, `it` 75 y `pt` 73.
- `/sitemap.xml` contiene `2.234` URLs y `440` URLs de articulos.
- El cluster de biblioteca del vino publicado el 2026-06-01 existe en seis idiomas para tres temas:
  - biblioteca del vino como herramienta de venta;
  - uvas/regiones que debe conocer el equipo de sala;
  - maridajes que aumentan venta/rentabilidad.
- Las muestras de articulos revisadas responden `200` para usuario y `200` para Googlebot con `bot-prerender`, canonical, titulo y H1 especificos.
- En el momento de esta auditoria, la capa inspirada en La RVF (`Como empezar con el vino`) aun no existia como pagina real: no estaba en rutas dedicadas, sitemap, `llms`, ni prerender especifico.
- Las URLs previstas del hub responden `200` por fallback/catch-all, pero muestran contenido generico de biblioteca o SPA, no una pagina dedicada de iniciacion.

#### Decisiones

- Dar por publicado el cluster de articulos de biblioteca existente.
- Mantener como prioridad siguiente la implementacion del hub `Como empezar con el vino`, no la republicacion del cluster antiguo.
- Exigir que cualquier nueva URL estrategica tenga ruta real, contenido especifico, sitemap, prerender bot, canonical, hreflang y entrada en `llms`.

#### Hipotesis

- La brecha actual de SEO/LLM no es falta de articulos publicados, sino falta de arquitectura didactica de iniciacion conectada a la biblioteca.
- Las respuestas `200` por fallback pueden ocultar problemas si solo se valida status code; hay que validar tambien titulo, H1, canonical y contenido.

#### Tareas pendientes

- Implementar hub localizado de iniciacion y primera tanda editorial propia.
- Validar que las URLs previstas dejen de ser fallback y pasen a contenido especifico.
- Mantener seguimiento de Search Console para articulos y Barometro.

## 2026-06-19

### Correccion de `/presentacion` en produccion

#### Hechos

- `/presentacion` devolvia `HTTP 404` en produccion.
- La respuesta incluia `x-worker-branch: not-found`, por lo que el fallo estaba en Cloudflare Worker antes de llegar a Lovable.
- React ya tenia rutas para `/presentacion`, `/en/presentation`, `/fr/presentation`, `/it/presentazione`, `/de/praesentation` y `/pt/apresentacao`.
- `public/sitemap-extra.json` ya incluia esas seis URLs.
- Se anadieron las seis rutas a `SEO_EXACT` en `cloudflare-worker-v3-hybrid.js`.
- Se anadio prerender estatico especifico en Worker para que Googlebot no recibiera un fallback generico o de otra pagina.
- Validaciones locales pasaron: `node --check`, `npm run deploy:worker:dry-run` y `git diff --check`.
- Se desplego Cloudflare Worker `winerim-proxy` version `807319ba-4743-47ad-87e9-401e8d952efe`.
- Produccion quedo validada con `200` humano y `200` Googlebot para las seis rutas; Googlebot recibe `worker-static-prerender` y titulos propios por idioma.

#### Decisiones

- Resolver el problema en Cloudflare Worker porque la evidencia de cabecera apuntaba ahi.
- Mantener las rutas de presentacion como SEO indexables, alineadas con sitemap.
- Usar prerender estatico del Worker como solucion operativa inmediata para bots.

#### Hipotesis

- El 404 venia de una ruta nueva o existente publicada en React/sitemap sin estar incorporada a la whitelist del Worker.
- El riesgo futuro es repetir esta desalineacion con nuevas rutas si no se valida `x-worker-branch` en produccion.

#### Tareas pendientes

- Valorar migrar el prerender de presentacion a Supabase `prerender` para eliminar duplicacion en Worker.
- Revisar en proximas publicaciones que toda URL de sitemap tenga ruta React, Worker y prerender consistentes.

### Revision de La RVF para `Como empezar con el vino`

Nota 2026-06-30: esta decision evoluciono. La capa no se publica como subruta canonica de Biblioteca, sino como hub separado `Aprender vino`.

#### Hechos

- Se revisaron las paginas de La Revue du Vin de France sobre `S'initier au vin` y `Dictionnaire du vin`.
- La estructura revisada combina hub principal, subhubs tematicos y articulos atomicos de iniciacion.
- Los subhubs mas relevantes para Winerim son aprender vino, diccionario/glosario, acuerdos comida-vino, regiones, terroirs y conservacion/cava.
- Los temas con mejor encaje inmediato son vocabulario de cata, como catar, tipos de vino, cepas, regiones, lectura de etiqueta, temperatura de servicio, copas, conservacion, defectos y maridajes.
- Winerim ya tiene biblioteca, glosario, cursos, maridajes y guias; lo que falta es ordenar una capa de inicio guiado.

#### Decisiones

- No copiar contenido de La RVF; usarlo solo para inspirar arquitectura editorial, intenciones SEO y cobertura tematica.
- Crear un hub propio `Como empezar con el vino` con enfoque Winerim: aprendizaje util para restaurantes, hoteles y equipos de sala.
- Priorizar contenido evergreen y accionable frente a noticias, subastas o actualidad economica.
- Conectar cada pieza nueva con entidades existentes de biblioteca y con activos de conversion.

#### Hipotesis

- La ruta guiada de iniciacion puede mejorar engagement, enlazado interno e indexabilidad semantica.
- El angulo de sala/restaurante puede diferenciar a Winerim de medios editoriales generalistas.

#### Tareas pendientes

- Implementar el hub localizado y la primera tanda de articulos propios.
- Asegurar que sitemap, prerender, canonicals, hreflang, schema y `llms.txt` quedan actualizados.
- Validar en produccion como usuario humano y como Googlebot tras deploy.

## 2026-06-13

### Seguimiento Search Console y limpieza de `Dataset` del Barometro

#### Hechos

- Se reviso Search Console para `https://winerim.wine/`.
- La vista general mostraba `719` paginas indexadas, `2.600` no indexadas y `899` clics totales en busqueda web.
- `https://winerim.wine/barometro-cartas-vino-2026` ya fue rastreada por Google y paso a `Rastreada: actualmente sin indexar`.
- La URL principal ES tiene rastreo permitido, obtencion correcta, indexacion permitida, sitemap detectado y canonica propia.
- EN y PT del Barometro ya aparecen indexadas.
- IT, FR y DE aparecen `Rastreada: actualmente sin indexar`, con rastreo permitido, obtencion correcta, indexacion permitida y sitemap detectado.
- Se solicito indexacion manual para ES, IT, FR y DE.
- Search Console detecto en `Dataset` un aviso no critico: falta `license` opcional.
- Se anadio `license` localizado al schema `Dataset` del Barometro en React, Supabase `prerender` y fallback Worker.
- Se desplego Worker `winerim-proxy` version `5d2c0d9c-b596-4796-99fb-2ac5af00636e`.
- Se pusheo `3ddbbe2 fix: add dataset license to barometer schema`.
- Lovable desplego `prerender` desde `3ddbbe2` y publico frontend; produccion valida `license` en las seis variantes.

#### Decisiones

- No pedir reindexacion para EN/PT porque ya estan indexadas.
- Usar las paginas localizadas de terminos como `license` mientras no exista licencia especifica de dataset.
- Tratar el aviso `license` como mejora de calidad SEO/LLM, no como bloqueo de indexacion.

#### Hipotesis

- El aviso de `license` desaparecera en Search Console tras el siguiente rastreo de las URLs del Barometro.
- La indexacion parcial EN/PT sugiere que el cluster esta siendo entendido; ES/IT/FR/DE dependen ahora de la seleccion de Google tras nuevo rastreo.

#### Tareas pendientes

- Revisar ES/IT/FR/DE en 48-72 horas.
- Confirmar si el informe `Conjuntos de datos` deja de marcar el campo `license`.
- Priorizar Core Web Vitals como linea tecnica posterior porque Search Console muestra `153` URLs en `Necesita mejorar` en movil y ordenador.

## 2026-06-11

### Lovable despliega `sitemap`/`prerender` y se retira el puente estatico del Worker

#### Hechos

- Se pidio a Lovable desplegar las Edge Functions `sitemap` y `prerender` del proyecto `Web Winerim`.
- Lovable confirmo el deploy de ambas funciones.
- Se valido directamente Supabase:
  - `sitemap` responde `200`, contiene las seis rutas localizadas del Barometro y mantiene alternates `xhtml:link`;
  - `prerender` responde `200` para `/barometro-cartas-vino-2026` y contiene canonical, `hreflang`, schema `Report` y schema `Dataset`.
- Se elimino del Cloudflare Worker el objeto temporal de prerender estatico del Barometro.
- Se desplego Cloudflare Worker `winerim-proxy` version `356db317-9985-41de-a1a1-ac6ed6baba6f`.
- Produccion como Googlebot devuelve `x-worker-branch: bot-prerender`, lo que confirma que el Barometro ya sale por Supabase `prerender`, no por el puente estatico del Worker.

#### Decisiones

- Supabase `sitemap` y `prerender` pasan a ser la fuente productiva de verdad del Barometro.
- El Worker conserva solo reconocimiento de rutas y fallback de sitemap, no el HTML estatico del Barometro.
- Lovable queda como via operativa valida para desplegar Edge Functions cuando no exista token local de Supabase.

#### Hipotesis

- Reducir HTML SEO duplicado en Worker disminuye riesgo de divergencia entre pagina humana, sitemap y prerender bot.
- El estado actual facilita que futuras mejoras del Barometro salgan por una sola fuente.

#### Tareas pendientes

- Monitorizar Search Console durante los proximos dias.
- Retirar el fallback de sitemap del Worker solo si Supabase demuestra estabilidad suficiente.
- Obtener credenciales CLI de Supabase para automatizar futuros deploys SEO.

### Search Console para Barometro Winerim

#### Hechos

- Se inspecciono `https://winerim.wine/barometro-cartas-vino-2026` en Search Console.
- El estado inicial era `La URL no esta en Google` y `Google no reconoce esta URL`.
- Se solicito indexacion manual y Search Console confirmo que la URL fue anadida a una cola de rastreo prioritaria.
- Se reenvio `sitemap.xml`.
- Search Console confirmo el envio del sitemap y actualizo `/sitemap.xml` a:
  - enviado: `11 jun 2026`;
  - ultima lectura: `11 jun 2026`;
  - estado: `Correcto`;
  - paginas descubiertas: `2.234`.
- El sitemap anterior mostraba `2.228` paginas; el aumento a `2.234` encaja con las seis URLs nuevas del Barometro.

#### Decisiones

- No forzar de momento solicitudes manuales para todas las variantes internacionales; dejar que Google procese el sitemap actualizado.
- Priorizar seguimiento en 24-72 horas antes de abrir otra tanda manual de inspecciones.

#### Hipotesis

- La inspeccion manual acelera el rastreo de la URL principal, pero no garantiza indexacion inmediata.
- El sitemap actualizado deberia bastar para descubrimiento inicial de las seis variantes.

#### Tareas pendientes

- Revisar cobertura e indexacion del Barometro en 24-72 horas.
- Solicitar indexacion selectiva de variantes internacionales solo si no aparecen descubiertas o rastreadas.

### Publicacion productiva del Barometro Winerim

#### Hechos

- Se pusheo `4020e5a feat: add Winerim wine list barometer` a `origin/main`.
- Se publico el frontend desde Lovable y el panel quedo `Up to date`.
- Produccion seguia devolviendo `404` para `/barometro-cartas-vino-2026` porque el Cloudflare Worker cortaba rutas nuevas no registradas con `x-worker-branch: not-found`.
- Se anadio soporte del Barometro al Worker:
  - rutas conocidas en seis idiomas;
  - prerender estatico para bots;
  - schema `Report` y `Dataset`;
  - canonical y `hreflang`;
  - inyeccion de las seis URLs en `/sitemap.xml`.
- Se desplego `winerim-proxy` version `ec48088d-62b0-4d3e-85c0-8d9cc74760e1`.
- Se pusheo `aed4328 fix: serve barometer through worker` a `origin/main`.
- Validacion productiva:
  - seis URLs del Barometro responden `200`;
  - Googlebot recibe `x-prerendered: true`, `worker-static-prerender`, canonical, `hreflang`, `Report` y `Dataset`;
  - `/sitemap.xml` contiene las seis URLs del Barometro.
- `npm run deploy:supabase:seo` fallo por falta de `SUPABASE_ACCESS_TOKEN`.

#### Decisiones

- Dar por publicado el Barometro en produccion porque Cloudflare Worker ya cubre HTML humano, sitemap y prerender bot.
- Mantener el Worker como puente SEO hasta poder desplegar directamente `sitemap` y `prerender` en Supabase.
- No retrasar la solicitud de indexacion en Search Console por la falta de token Supabase.

#### Hipotesis

- El Barometro deberia ser rastreable por Google desde sitemap y por inspeccion manual inmediata.
- La indexacion dependera mas de rastreo/cobertura de Google que de cambios tecnicos adicionales en la web.

#### Tareas pendientes

- Inspeccionar la URL principal en Search Console y solicitar indexacion.
- Desplegar Supabase Edge Functions cuando haya token/sesion CLI.
- Monitorizar cobertura de las seis variantes localizadas.

## 2026-06-10

### Barometro Winerim de cartas de vino

#### Hechos

- Se implemento una nueva pagina publica para el Barometro Winerim de cartas de vino 2026.
- La ruta principal es `/barometro-cartas-vino-2026` y tiene variantes localizadas en ingles, italiano, frances, aleman y portugues.
- La pagina incluye metodologia, patrones detectables, segmentos publicables, datos necesarios, FAQ, enlaces internos y CTAs hacia analisis/benchmarks.
- Se conecto la pagina a rutas React, `ROUTE_MAP`, sitemap, prerender, `sitemap-extra.json`, `llms.txt`, `llms-full.txt` y enlaces internos.
- Se anadio schema `Report` y `Dataset` tambien en la version prerenderizada para bots.
- Validaciones completadas: build, test SEO enfocado, `deno check`, JSON del sitemap extra, `git diff --check` y QA local desktop/mobile.

#### Decisiones

- Priorizar el Barometro Winerim como pieza de autoridad propia y citable, no como sustituto del `Wine List Score` existente.
- Mantener una separacion explicita entre hechos/datos observados, inferencias e hipotesis dentro del enfoque editorial.
- No presentar cifras de benchmark como resultados reales hasta respaldarlas con datos agregados, anonimizados y metodologia documentada.
- Actualizar `STATIC_ROUTE_LASTMOD` a `2026-06-10` por la incorporacion de una nueva pagina estatica estrategica y alinear los tests.

#### Hipotesis

- El barometro puede elevar autoridad SEO/LLM al convertir conocimiento operativo de cartas de vino en una fuente estructurada y enlazable.
- Los futuros benchmarks por vertical seran mas defendibles si se apoyan en el barometro, metodologia y umbrales de anonimato.

#### Tareas pendientes

- Desplegar desde Lovable y validar produccion como usuario y Googlebot.
- Inspeccionar o solicitar indexacion de la URL principal en Search Console.
- Recopilar datos reales para una siguiente version con cifras publicables.

### Refuerzo de captacion en `/analisis-carta`

#### Hechos

- Se reviso la propuesta de otra tarea de Codex sobre adaptar el patron Surfeo a Winerim.
- Se confirmo que el titulo visual del analizador en `/analisis-carta` estaba implementado como `<h2>` dentro de `WineListAnalyzerTool`.
- Se corrigio a `<h1>` y se reforzo el copy del encabezado en seis idiomas.
- El nuevo angulo del encabezado comunica perdida de margen/potencial economico, envio en 30 segundos e informe personalizado en menos de 48 h.
- `npm run build` y `git diff --check` pasaron correctamente.

#### Decisiones

- Usar `/analisis-carta` como landing principal de captacion basada en "cuanto dinero/margen pierde tu carta de vinos sin que lo veas".
- No modificar por ahora la logica del analizador ni los flujos backend.
- Mantener el claim de mas de 500 cartas analizadas como prueba social ya presente en otras zonas de la pagina.

#### Tareas pendientes

- Validar la pagina publicada tras deploy.
- Medir conversion del nuevo encabezado frente al anterior si existe analitica de eventos.
- Preparar ejemplo visual de informe para reforzar confianza.

### Estrategia de autoridad propia para Winerim

#### Hechos

- El usuario indico que el test/score de carta ya existe en Winerim.
- El repo confirma la existencia de `WineListScore`, `WineListAnalyzer`, `WineListBenchmark`, `BenchmarksPlaybooks` y `Comparativas`.
- `WineListBenchmark` existe como pagina, pero sus cifras publicas actuales son estaticas/orientativas y no deben presentarse como estudio propio real sin respaldo de datos.
- La oportunidad inspirada en Surfeo se reformula como capa de autoridad propia: barometro, benchmarks agregados, guias por vertical/problema, comparativas y schema.

#### Decisiones

- No crear un nuevo punto 1; aprovechar el `Wine List Score` existente como ancla de conversion.
- Priorizar el Barometro Winerim 2026 como pieza editorial de datos propios.
- Publicar benchmarks solo con datos agregados y anonimizados.
- Evitar rankings nominales de clientes, ciudades o restaurantes si no hay permiso o masa critica suficiente.
- Usar las comparativas BOFU como paginas de decision, no como ataques a alternativas.

#### Hipotesis

- Los datos propios de cartas, precios, copa, estilos, regiones, rotacion y stock pueden convertirse en una ventaja SEO/LLM dificil de copiar.
- Los benchmarks publicos pueden mejorar confianza si explican metodologia, muestra, periodo, limitaciones y datos anonimizados.
- Las guias por vertical rendiran mejor cuando esten enlazadas a biblioteca, score, benchmark y demo.

#### Tareas pendientes

- Confirmar disponibilidad y calidad de los datos necesarios para el Barometro.
- Definir metodologia y umbrales de anonimato.
- Redactar el esquema editorial del Barometro y de los benchmarks.
- Preparar propuesta de home antes/despues y decidir implementacion.

### SEO/LLM inicial de Spiritsrim

#### Hechos

- Se enriquecio Spiritsrim desde el repo separado `/Users/GOIKO/spiritsrim`.
- Se creo `/software-carta-destilados`.
- Se añadieron narrativas SEO/LLM para entidades prioritarias.
- Se genero HTML estatico para todas las URLs del sitemap.
- `sitemap.xml` queda en `325` URLs.
- Se desplego en Cloudflare Pages: `https://b77c1545.spiritsrim.pages.dev`.
- Search Console muestra el sitemap actualizado como `Correcto`, ultima lectura 2026-06-10 y `325` paginas descubiertas.

#### Decisiones

- Usar HTML estatico por URL para mejorar SEO y recuperabilidad por LLMs.
- Mantener castellano como primera capa editorial fuerte.
- Seguir documentando en este repo solo como espejo/handoff; el trabajo operativo vive en `/Users/GOIKO/spiritsrim`.

#### Tareas pendientes

- Monitorizar cobertura e indexacion inicial en Search Console tras la lectura del sitemap actualizado.
- Enriquecer segunda tanda de entidades y clusters editoriales.
- Decidir canonical de `www`.

## 2026-06-09

### Publicacion inicial de Spiritsrim en Cloudflare Pages

#### Hechos

- Se publico Spiritsrim desde `/Users/GOIKO/spiritsrim` en Cloudflare Pages como proyecto `spiritsrim`.
- URL disponible: `https://spiritsrim.pages.dev/`.
- Se añadieron `spiritsrim.com` y `www.spiritsrim.com` como custom domains de Pages.
- Se creo la zona `spiritsrim.com` en Cloudflare.
- Se preparo DNS Cloudflare hacia `spiritsrim.pages.dev`.
- OVH acepto la solicitud de cambio de nameservers desde `dns-parking.com` hacia `april.ns.cloudflare.com` y `nash.ns.cloudflare.com`.
- DNS publico ya delega en Cloudflare.
- Se dejaron los CNAME web en DNS-only, se recrearon los custom domains de Pages y `spiritsrim.com` / `www.spiritsrim.com` quedaron `active`.
- Validacion final: apex, `www`, `/sitemap.xml` y ruta profunda de biblioteca responden `HTTP/2 200`.
- Search Console tiene verificada la propiedad de dominio `sc-domain:spiritsrim.com` mediante TXT DNS manual en Cloudflare.
- Se envio `https://spiritsrim.com/sitemap.xml`; Search Console lo leyo el 2026-06-09 como `Correcto` y detecto `324` paginas.
- Se decidio no usar Lovable como requisito para publicar esta web.

#### Decisiones

- Usar Cloudflare Pages como hosting primario de Spiritsrim.
- Usar Cloudflare DNS como zona autoritativa de `spiritsrim.com`; OVH queda como registrador.
- Usar propiedad de dominio en Search Console y verificacion TXT manual; no usar OAuth Google-Cloudflare para la verificacion.
- Priorizar monitorizacion de Search Console y decision canonica de `www` antes de Worker/Supabase avanzado.

#### Tareas pendientes

- Monitorizar Search Console tras primer recrawl.
- Decidir si `www` debe servir contenido o redirigir a apex.

## 2026-06-09

### Base separada de Spiritsrim creada

#### Hechos

- Se creo `/Users/GOIKO/spiritsrim` como repo separado mediante clon local del repo base.
- Se elimino el remoto del nuevo repo para evitar pushes accidentales al origen de Winerim.
- Se construyo una primera base publica de Spiritsrim con home, chrome propio, rutas principales, biblioteca de destilados multilingue, schema, sitemap, prerender, redirects, Worker, robots, llms, manifest, OG image y favicons.
- Se retiraron del arbol lanzable de Spiritsrim contenidos, assets, migraciones, funciones y rutas heredadas que pertenecian a Winerim.
- `.env`, `supabase/config.toml` y scripts de deploy quedaron con placeholders/variables de Spiritsrim.
- Validaciones locales completadas: tests, build, `deno check`, `git diff --check`, escaneo de residuos criticos y servidor Vite local.

#### Decisiones

- Tratar `/Users/GOIKO/spiritsrim` como el repo operativo de Spiritsrim.
- Usar `https://spiritsrim.com` como canonical tecnico provisional.
- No publicar nada con IDs, dominio, Worker, assets, clientes o claims heredados.
- Priorizar base indexable y paridad SEO antes de herramientas avanzadas, blog y formularios definitivos.

#### Hipotesis

- El corte actual reduce el riesgo principal de clonacion: residuos operativos o SEO de Winerim.
- La taxonomia inicial de categorias, origenes, materias primas y cocteles da una base suficiente para validar arquitectura y rastreo.

#### Tareas pendientes

- Confirmar dominio, Lovable, Supabase, Worker, Search Console y destino de leads.
- Reemplazar placeholders operativos por credenciales/URLs de Spiritsrim.
- Validar en produccion como humano y Googlebot tras deploy.
- Escalar contenidos, herramientas y blog sin traducir literalmente Winerim.

## 2026-06-09

### Handoff para Spiritsrim

#### Hechos

- El usuario planteo crear `Spiritsrim`, hermana gemela de Winerim para destilados.
- Se reviso el contexto documental del proyecto y la estructura local de Winerim.
- Se creo `SPIRITSRIM_CODEX_HANDOFF.md` como briefing operativo para otra tarea de Codex.
- El handoff documenta arquitectura, archivos clave, mapa Winerim -> Spiritsrim, biblioteca de destilados propuesta, schema, herramientas, plan de implementacion, guardrails, validaciones, accesos necesarios y prompt inicial.
- No se modifico codigo, Worker ni base de datos.

#### Decisiones

- Tratar Spiritsrim como proyecto separado de Winerim.
- Reutilizar patrones tecnicos y SEO de Winerim, pero sustituir completamente dominio semantico, copy, assets, datos, IDs operativos y despliegue.
- Recomendar que Spiritsrim arranque con una biblioteca de destilados multilingue, no solo con una landing comercial.
- Mantener como guardrail central que sitemap, prerender, canonical, hreflang y schema deben cambiar a Spiritsrim antes de cualquier lanzamiento.

#### Hipotesis

- La base Winerim puede acelerar mucho Spiritsrim si se clona con disciplina y se eliminan residuos de marca/dominio/contenido.
- El enfoque de biblioteca semantica puede ser aun mas valioso en spirits por la amplitud de categorias, origenes, materias primas, cocteles y servicio.
- La mayor fuente de errores sera operacional: project-ref de Supabase, Worker, dominio, Search Console y formularios apuntando todavia a Winerim.

#### Tareas pendientes

- Usar `SPIRITSRIM_CODEX_HANDOFF.md` como briefing en la nueva tarea.
- Confirmar dominio, Lovable, Supabase, Cloudflare, marca, assets, idiomas y destino de leads.
- Crear repo/proyecto separado antes de ejecutar cambios reales de Spiritsrim.

## 2026-06-08

### Search Console tras quinta tanda editorial

#### Hechos

- Se uso la propiedad Search Console URL-prefix `https://winerim.wine/`.
- La vista general mostraba 102 paginas indexadas y 2.331 no indexadas como foto del 2026-06-08.
- Antes del reenvio, `/sitemap.xml` y `/sitemap_index.xml` figuraban con ultimo rastreo 2026-06-06 y 2.098 paginas descubiertas.
- Se reenvio `/sitemap.xml`.
- Search Console marco `/sitemap.xml` como `Correcto`, ultimo rastreo 2026-06-08 y 2.228 URLs descubiertas.
- `/sitemap_index.xml` quedo sin reenviar y seguia mostrando ultimo rastreo 2026-06-06 y 2.098 paginas descubiertas.
- Se inspeccionaron y solicitaron manualmente para indexacion:
  - `https://winerim.wine/pt/biblioteca-vinho/harmonizacoes/ceviche`;
  - `https://winerim.wine/pt/biblioteca-vinho/regioes/grecia/santorini`;
  - `https://winerim.wine/de/weinbibliothek/weinstile/franciacorta`.
- Las tres fichas aparecian en Search Console como `La URL no esta en Google` y `Descubierta: actualmente sin indexar`, con presencia en sitemap.
- Search Console acepto las tres solicitudes y confirmo que cada URL quedo anadida a una cola de rastreo prioritaria.
- `https://winerim.wine/biblioteca-vino` y `https://winerim.wine/biblioteca-vino/maridajes` aparecen como `La URL esta en Google`.
- No se modifico codigo, Worker ni base de datos.

#### Decisiones

- Usar `/sitemap.xml` como sitemap operativo principal en Search Console porque ya refleja las 2.228 URLs publicadas.
- Mantener las solicitudes manuales de indexacion en tandas cortas y representativas.
- Priorizar fichas nuevas validadas en produccion y no repetir solicitud para hubs ya indexados.
- Tratar las cifras de Search Console como datos con retraso, no como contradiccion con produccion cuando las URLs ya responden correctamente y estan en sitemap.

#### Hipotesis

- Google ya actualizo descubrimiento de sitemap tras el reenvio, pero la indexacion de fichas nuevas depende de cola y prioridad.
- Las solicitudes manuales pueden ayudar con ejemplos estrategicos, pero el volumen total debera moverse por enlazado interno, calidad de contenido y recrawl natural.
- Los hubs indexados deberian servir como base para reforzar rastreo hacia fichas nuevas si se mejora el enlazado contextual.

#### Tareas pendientes

- Revalidar en Search Console las tres URLs solicitadas dentro de unos dias.
- Revisar si `/sitemap_index.xml` debe reenviarse o retirarse de la operativa si sigue mostrando menos URLs que `/sitemap.xml`.
- Preparar una segunda tanda corta solo si Search Console no muestra limites y si las nuevas fichas siguen sin indexar.
- Continuar con refuerzo de enlaces internos y clusters de blog por idioma.

### Quinta tanda editorial de regiones, estilos y maridajes

#### Hechos

- Se implemento y pusheo `3954369 feat: expand wine library entity editorial coverage`.
- La cobertura editorial visible de biblioteca del vino queda en 40 uvas, 34 regiones, 25 estilos y 30 maridajes/platos prioritarios.
- Se anadieron 12 regiones prioritarias: `ribeira-sacra`, `bierzo`, `toro`, `chablis`, `alsacia`, `provence`, `santorini`, `valpolicella`, `chianti-classico`, `brunello-di-montalcino`, `soave` y `etna`.
- Se anadieron 10 estilos prioritarios: `prosecco`, `cremant`, `franciacorta`, `pet-nat`, `amontillado`, `oloroso`, `palo-cortado`, `oporto-tawny`, `madeira` y `blanco-fermentado-barrica`.
- Se anadieron 12 maridajes/platos prioritarios: `ceviche`, `queso-azul`, `queso-de-cabra`, `jamon-iberico`, `paella`, `curry`, `ramen`, `thai-curry`, `setas-y-trufas`, `cochinillo-lechon`, `queso-manchego` y `tarta-de-queso`.
- Se sincronizo `supabase/functions/prerender/index.ts` para que bots reciban perfiles editoriales de la misma tanda.
- Se ampliaron rutas en `supabase/functions/sitemap/index.ts` para regiones italianas y maridajes/platos que aun no estaban sometidos.
- Validaciones locales completadas: tests enfocados, `deno check`, suite completa, build, `git diff --check`, revision de sitemap sin duplicados y navegador local.
- Lovable `Web Winerim` desplego `prerender` y `sitemap` desde `3954369`, publico frontend y quedo `Up to date`.
- Produccion validada como Googlebot en Santorini PT, Franciacorta DE y Ceviche PT con `200`, `bot-prerender`, `x-prerendered: true`, canonical propio, idioma correcto, schema enriquecido, contenido editorial y sin fallback.
- Produccion `/sitemap.xml` contiene 2.228 URLs y cubre las variantes `es/de/pt` revisadas de los nuevos slugs estrategicos.
- Produccion humana validada en Ceviche PT con `branco gastronomico`, sin fallback y sin lectura erronea de `tinto elegante`.
- No se modifico Cloudflare Worker ni base de datos.

#### Decisiones

- Usar la capa editorial generativa localizada para escalar perfiles propios con consistencia en seis idiomas.
- Mantener paridad de cada tanda entre React, `prerender` y sitemap antes de tratarla como cerrada.
- Incluir en sitemap las entidades nuevas que ya existian en catalogos de biblioteca pero no estaban sometidas.
- Revisar manualmente las herencias de plantilla cuando el texto generico produzca una recomendacion poco natural para un plato.
- Seguir usando Lovable como via operativa para Supabase Edge Functions mientras no haya `SUPABASE_ACCESS_TOKEN` local.

#### Hipotesis

- La nueva cobertura reduce la cantidad de entidades de alto valor que dependen de fallback y deberia mejorar utilidad humana y rastreo.
- Los nuevos maridajes/platos pueden actuar como long-tail de alta intencion si se refuerzan con enlaces internos y clusters de blog.
- El incremento de sitemap a 2.228 URLs deberia ayudar al descubrimiento, pero Search Console necesitara recrawl antes de reflejar el cambio.

#### Tareas pendientes

- Monitorizar Search Console tras el recrawl de `/sitemap.xml` y de las nuevas fichas.
- Solicitar indexacion selectiva de una tanda corta cuando la herramienta lo permita.
- Reforzar enlaces internos hacia las nuevas entidades desde hubs, fichas relacionadas y blog.
- Mantener la migracion de slugs localizados como proyecto separado.

### Schema enriquecido para regiones, estilos y maridajes

#### Hechos

- Se implemento `70bb44e feat: enrich wine library entity schema`.
- El frontend humano de regiones, estilos y maridajes emite ahora grafo JSON-LD enriquecido con `WebPage`, `Article`, `DefinedTermSet` y `DefinedTerm`.
- Las fichas de regiones incorporan propiedades de pais, tipo de denominacion, estilos, uvas, rol de carta, prestigio, reconocimiento, subzonas y perfil de servicio.
- Las fichas de estilos incorporan propiedades de familia, temperatura de servicio, uvas, regiones, cuerpo, acidez, complejidad, maridajes, rol de carta y perfil de servicio.
- Las fichas de maridajes incorporan propiedades de categoria, nivel, intensidad, grasa, picante, acidez del plato, estilos, regiones, uvas recomendadas, roles de maridaje y perfil de servicio.
- `supabase/functions/prerender/index.ts` se sincronizo para emitir el mismo patron semantico en fichas de biblioteca reconocidas para bots.
- Se añadieron tests renderizados para una region portuguesa, un estilo aleman y un maridaje portugues.
- Validaciones locales completadas: tests enfocados, `deno check`, `git diff --check`, suite completa, build y navegador local.
- Commits pusheados a `origin/main`: `70bb44e` y `69d2fbf`.
- Lovable `Web Winerim` desplego Supabase Edge Function `prerender` desde `69d2fbf` y publico frontend; el panel quedo `Published` / `Up to date`.
- Produccion validada independientemente como Googlebot:
  - `/pt/biblioteca-vinho/regioes/portugal/vinho-verde`: `200`, `bot-prerender`, `x-prerendered: true`, canonical propio, `lang="pt"`, schema completo, 9 `mentions`.
  - `/de/weinbibliothek/weinstile/espumoso`: `200`, `bot-prerender`, `x-prerendered: true`, canonical propio, `lang="de"`, schema completo, 10 `mentions`.
  - `/pt/biblioteca-vinho/harmonizacoes/lubina-dorada`: `200`, `bot-prerender`, `x-prerendered: true`, canonical propio, `lang="pt"`, schema completo, 10 `mentions`.
- No se modifico Cloudflare Worker ni base de datos.

#### Decisiones

- Convertir el schema enriquecido en patron comun de todas las fichas estrategicas de biblioteca del vino.
- Mantener `DefinedTermSet` separado por seccion para que uvas, regiones, estilos y maridajes tengan contexto semantico propio.
- Alimentar `mentions` desde enlaces estrategicos y listas editoriales ya existentes, evitando duplicar una segunda fuente manual de grafo.
- Publicar este cambio desde Lovable para incluir frontend y Edge Function `prerender`.
- Considerar cerrada la tanda solo tras validacion independiente de produccion.

#### Hipotesis

- La coherencia entre schema humano, `prerender` y enlaces internos deberia mejorar el posicionamiento semantico de la biblioteca del vino.
- Las entidades no-uva ganaran contexto de autoridad al quedar conectadas con uvas, regiones, estilos y maridajes relacionados.
- Search Console tardara en reflejar la mejora aunque produccion quede servible inmediatamente tras deploy.

#### Tareas pendientes

- Monitorizar Search Console tras recrawl de las rutas validadas.
- Mantener como siguiente bloque la expansion editorial visible de regiones, estilos y maridajes de mayor valor.
- Tratar la migracion de slugs localizados como proyecto SEO separado.

### Cierre de prerender y sitemap estrategico de biblioteca

#### Hechos

- Se detecto una contradiccion documental: `d02ff15` seguia descrito como pendiente de `prerender`, aunque el repo y Lovable ya habian avanzado.
- La Edge Function `prerender` del commit `7a1745a` quedo desplegada en Lovable `Web Winerim`.
- Produccion Googlebot valida `mentions` estrategicas reales en JSON-LD para Muscadet DE/PT, Gruner Veltliner DE y Corvina PT.
- Se audito la paridad entre los targets de `WINE_LIBRARY_STRATEGIC_LINKS` y el sitemap.
- Faltaban 9 rutas estrategicas en `WINE_LIBRARY_DYNAMIC_ROUTES`.
- Se implemento, valido, pusheo y desplego `6d0c2cf fix: include strategic wine library targets in sitemap`.
- `src/test/wine-library-seo-surface.test.ts` ahora impide que un target estrategico de `prerender` quede fuera del sitemap.
- La Edge Function `sitemap` se desplego desde Lovable tras fallar el CLI por falta de `SUPABASE_ACCESS_TOKEN`.
- Produccion `/sitemap.xml` responde `200`, contiene 2.150 URLs y contiene las 54 variantes de las 9 rutas nuevas en seis idiomas.
- Las 27 variantes `es/de/pt` revisadas como Googlebot responden `200`; una muestra confirma `x-prerendered: true` y `bot-prerender`.
- No se modifico Cloudflare Worker ni base de datos.

#### Decisiones

- Cerrar `7a1745a` como deploy efectivo de `prerender` estrategico.
- Cerrar `6d0c2cf` como deploy efectivo de `sitemap` estrategico.
- Mantener una prueba automatica que sincronice `WINE_LIBRARY_STRATEGIC_LINKS` y `WINE_LIBRARY_DYNAMIC_ROUTES`.
- No convertir slugs de entidad a formas traducidas como parche rapido; hacerlo solo como migracion SEO planificada con redirects 301.
- Seguir usando Lovable para desplegar Supabase Edge Functions mientras no haya token CLI local.

#### Hipotesis

- La paridad `prerender` + sitemap refuerza el rastreo de entidades estrategicas y reduce señales incompletas para Googlebot y LLMs.
- Search Console tardara en reflejar el cambio, pero las URLs ya son servibles, rastreables y visibles en sitemap.
- Traducir slugs de entidad puede ser valioso, aunque su impacto positivo depende de preservar canonicals historicos mediante redirects.

#### Tareas pendientes

- Monitorizar Search Console despues del recrawl de `/sitemap.xml`.
- Planificar la migracion de slugs localizados como proyecto separado.
- Continuar schema/enlazado para regiones, estilos y maridajes.
- Seguir ampliando perfiles editoriales propios en entidades de alto valor comercial y SEO.

### Schema y grafo interno de uvas prioritarias

#### Hechos

- Se completo el grafo estrategico de enlaces internos para las 40 uvas prioritarias.
- Se anadieron alias y resolucion contextual para `muscadet`:
  - `Melon de Bourgogne` resuelve como uva;
  - `Muscadet` resuelve como region cuando el enlace pide `region`.
- Se enriquecio el JSON-LD humano de fichas de uva con `WebPage`, `Article`, `DefinedTermSet`, `DefinedTerm`, `alternateName`, propiedades de entidad y `mentions` internas.
- El grafo de uva no emite `FAQPage`; las FAQs siguen delegadas en `FAQSection`.
- Se anadio aviso localizado en seis idiomas para desambiguar `Muscadet` como uva `Melon de Bourgogne` frente a la region Muscadet.
- Se preparo `supabase/functions/prerender/index.ts` para que el HTML de bots de fichas de biblioteca incluya `mainEntity`, `about` y `mentions`.
- Validaciones locales completadas: tests enfocados, `deno check`, suite completa, build, `git diff --check` y navegador local.
- Commit funcional creado y pusheado: `d02ff15 feat: enrich wine library grape schema links`.
- Lovable detecto el commit `d02ff15`; se publico frontend desde `Publish project` -> `Update`.
- Produccion humana valida en `/de/weinbibliothek/rebsorten/muscadet`.
- Produccion Googlebot y Supabase directo todavia sirven `prerender` anterior; falta desplegar la Edge Function `prerender` del commit `d02ff15`.
- El intento de deploy CLI de `prerender` fallo por falta de `SUPABASE_ACCESS_TOKEN`.
- No se modifico Cloudflare Worker ni base de datos.

#### Decisiones

- Priorizar schema y enlazado interno antes de iniciar otra tanda de entidades.
- Tratar `muscadet` como caso editorial ambiguo y hacerlo explicito en UI y schema.
- Mantener `FAQPage` fuera del grafo propio de uva para evitar duplicidades.
- Publicar frontend por Lovable y dejar pendiente el despliegue explicito de `prerender` si Lovable no permite enviar instrucciones desde el navegador automatizado.

#### Hipotesis

- Un grafo completo y resoluble para 40 uvas mejora autoridad interna, rastreo y comprension semantica.
- La mejora de schema ayudara especialmente a LLMs y crawlers cuando tambien este activa en `prerender`.
- La ambiguedad Muscadet/Melon de Bourgogne puede afectar a intencion de busqueda si no se desambigua de forma visible.

#### Tareas pendientes

- Desplegar `prerender` del commit `d02ff15` desde Lovable o con token CLI autorizado.
- Revalidar Googlebot en DE/PT tras ese deploy.
- Extender el mismo criterio de schema/enlazado a regiones, estilos y maridajes.

### Cuarta tanda editorial de uvas prioritarias

#### Hechos

- Se amplio la capa editorial humana de uvas prioritarias de 30 a 40.
- Las 10 uvas anadidas son `graciano`, `muscadet`, `semillon`, `assyrtiko`, `vermentino`, `carmenere`, `tannat`, `petit-verdot`, `torrontes` y `corvina`.
- Se sincronizo `supabase/functions/prerender/index.ts` con las mismas 10 uvas mediante perfiles expandidos para bots.
- Se actualizaron tests editoriales y de superficie SEO para exigir la cuarta tanda.
- Validaciones locales completadas: tests enfocados, `deno check`, suite completa, build, `git diff --check` y navegador local.
- Commit funcional creado y pusheado: `ad89889 feat: expand priority grape editorial profiles`.
- Lovable `Web Winerim` sincronizo `ad89889`, desplego `prerender` y publico frontend tras `Update`.
- Produccion validada:
  - Googlebot en `/pt/biblioteca-vinho/castas/graciano` y `/de/weinbibliothek/rebsorten/muscadet`: `200`, `bot-prerender`, `x-prerendered: true`, canonical propio, idioma correcto, contenido editorial y sin fallback.
  - Navegador humano en ambas rutas: perfil editorial propio, seccion de rol, maridajes y sin fallback visible.
- No se modifico Cloudflare Worker ni base de datos.

#### Decisiones

- Priorizar uvas con valor comercial y SEO antes de abrir otra superficie nueva.
- Mantener paridad frontend/prerender para cada tanda editorial.
- Resolver esta tanda sin cambios de Worker ni DB.
- Tratar `Muscadet` como ficha de uva existente aunque el H1 humano aleman muestre `Melon de Bourgogne` por sinonimia del catalogo.

#### Hipotesis

- La cuarta tanda refuerza autoridad en vinos de descubrimiento, blancos gastronomicos y tintos premium internacionales.
- Reducir el numero de entidades de alto valor servidas con fallback deberia mejorar utilidad humana y senales para Googlebot/LLMs.
- La ambiguedad `Muscadet` uva/region merece revision editorial posterior para enlazado y schema.

#### Tareas pendientes

- Seguir con regiones, estilos o maridajes que todavia dependan del fallback visible.
- Revisar schema y enlaces internos de las 40 uvas prioritarias.
- Monitorizar Search Console despues de recrawl.

### Profundidad visible fallback en biblioteca del vino

#### Hechos

- Se implemento `WineLibraryOperationalDepth` como capa visible para entidades de biblioteca sin perfil editorial especifico.
- La capa cubre uvas, regiones, estilos y maridajes.
- El contenido esta localizado para `es`, `en`, `it`, `fr`, `de` y `pt`.
- Se integro en `GrapeDetail`, `RegionDetail`, `StyleDetail` y `PairingDetail`.
- Las fichas con perfil editorial prioritario mantienen su bloque especifico y no muestran el fallback.
- Se corrigio el test de Airen portugues para usar la ruta real `/pt/biblioteca-vinho/castas/airen`.
- Validaciones locales completadas: `npm test -- --run`, `npm run build`, `git diff --check` y navegador local.
- Commit y push completados: `31354ef feat: add visible wine library depth fallback`.
- Lovable publico el cambio y quedo en `Up to date`.
- Produccion validada:
  - Airen portugues muestra el fallback operativo localizado.
  - Tempranillo aleman conserva `Service-Intelligenz` y no duplica fallback.
- No se modifico Worker, base de datos ni Edge Functions.

#### Decisiones

- La profundidad humana de entidades sin perfil editorial se resuelve con un fallback visible comun y localizado.
- No duplicar contenido en entidades prioritarias que ya tienen inteligencia editorial especifica.
- Mantener CTA a demo como enlace comercial contextual dentro del fallback.
- Usar rutas localizadas reales en tests para evitar falsa confianza.
- Publicar este cambio por Lovable como frontend, sin despliegue de Worker ni Supabase.

#### Hipotesis

- El fallback mejora utilidad y conversion en fichas largas de cola sin exigir escritura editorial manual inmediata para todas.
- Las entidades con mas demanda deben seguir pasando de fallback a perfil editorial propio.
- El patron puede servir como base de QA para detectar entidades con contenido demasiado ligero en experiencia humana.

#### Tareas pendientes

- Ampliar perfiles especificos a las entidades que sigan dependiendo del fallback y tengan alto valor SEO/comercial.
- Revisar schema por tipo de entidad.
- Revalidar una muestra de produccion y Search Console cuando haya recrawl.
- Mantener documentada la contradiccion historica entre fases antiguas de 10 uvas y el estado actual de expansion masiva.

### Hechos

- Se continuo la auditoria de Search Console y de la biblioteca del vino sobre el proyecto correcto de Lovable: `Web Winerim`.
- Se confirmo que el proyecto Lovable `Crim` no es la web publica Winerim y no debe usarse para este despliegue.
- Se revisaron 1.000 URLs visibles de Search Console en `Descubierta: actualmente sin indexar`.
- Clasificacion de esas URLs visibles:
  - 761 biblioteca del vino.
  - 154 articulos legacy con sufijo de idioma.
  - 36 articulos canonicos.
  - 49 rutas no-biblioteca.
- Las 49 rutas no-biblioteca estaban finas en produccion aunque tecnicamente correctas.
- Se implemento y desplego `3932aa0 fix: deepen static prerender pages`.
- Produccion tras `3932aa0`: 49/49 rutas no-biblioteca validadas con minimo 302 palabras, mediana 374 y 0 fallos.
- La muestra profunda de 68 URLs de biblioteca del vino en produccion estaba tecnicamente limpia pero por debajo de 300 palabras en todos los casos.
- Se implemento y desplego `5aa5b1c fix: deepen wine library prerender pages`.
- Produccion tras `5aa5b1c`: 761/761 URLs visibles de biblioteca validadas con minimo 317 palabras, mediana 422 y 0 fallos.
- Las validaciones confirmaron `200`, `bot-prerender`, `x-prerendered: true`, canonical propio, `lang` esperado, schema y hreflang.
- Verificaciones de codigo completadas: Deno check, Vitest completo y `git diff --check`.
- No se desplego Cloudflare Worker ni se modifico base de datos.

### Decisiones

- Resolver el problema de paginas finas en prerender antes de pedir mas indexacion manual.
- Usar una capa de profundidad operacional localizada para paginas estaticas finas, manteniendo la UI humana sin cambios.
- Para biblioteca del vino, anadir una capa comun de uso en carta, servicio/venta, datos, comparaciones y siguiente accion solo cuando el contenido de bot queda por debajo del umbral.
- No tocar Worker si el cambio pertenece exclusivamente a Edge Function `prerender`.
- Desplegar Edge Function `prerender` desde Lovable, porque en este proyecto Supabase vive dentro de Lovable.
- Considerar una ruta como cerrada solo si la validacion independiente de produccion como Googlebot confirma el resultado, no solo si Lovable responde que desplego.

### Hipotesis

- Las URLs en `Descubierta: actualmente sin indexar` tenian una mezcla de baja prioridad de rastreo y contenido demasiado fino, no un fallo tecnico unico.
- La mejora de cuerpo en HTML prerenderizado deberia aumentar la probabilidad de rastreo e indexacion, pero Search Console tardara en mostrarlo.
- La siguiente ventaja competitiva de biblioteca vendra de contenido visible y editorial por entidad, no solo de texto adicional en prerender.

### Tareas pendientes

- Monitorizar Search Console cuando actualice datos posteriores al despliegue.
- Solicitar indexacion selectiva de hubs y entidades maduras cuando la herramienta no devuelva error.
- Revisar las 154 URLs legacy de articulos con sufijos tras recrawl.
- Planificar la siguiente tanda editorial visible de biblioteca del vino por entidad e idioma.

## 2026-05-23

### Hechos

- El usuario estableció un protocolo de documentación permanente para este proyecto.
- Los documentos exigidos por el protocolo no existían al revisar `/Users/GOIKO/seo-migration-master`.
- Se detectaron y corrigieron dos creaciones iniciales fuera del repo real.
- Se implementó soporte de biblioteca del vino para alemán (`de`) y portugués (`pt`).
- Se creó la rama `codex/wine-library-de-pt`.
- Se abrió el PR `https://github.com/goiko111/seo-migration-master/pull/1`.
- Al intentar fusionar el PR, `origin/main` había avanzado y hubo conflictos de merge.
- Los conflictos se resolvieron combinando el bloque de biblioteca multilingüe con los cambios más recientes de `main`.
- Se detectó que el sitemap había perdido rutas generales `de`/`pt` de `main` durante la resolución; se corrigió manteniendo esas rutas y añadiendo las rutas de biblioteca.
- Las verificaciones posteriores al merge resuelto pasan: tests, build, lint dirigido, `deno check` y `git diff --check`.
- Se fusionó el PR `https://github.com/goiko111/seo-migration-master/pull/1` en `main`.
- Merge commit: `30e9a95f592ba1c3607c0b385a2711e783bcc525`.
- La validación ligera de producción posterior al merge detectó que el código nuevo aún no está activo para sitemap/prerender de biblioteca: sitemap público sin rutas nuevas `de`/`pt` y bot dinámico cayendo en `bot-fallback`.
- Se detectó y corrigió una contradicción en documentación de despliegue: `TECH_INSTRUCTIONS.md` apuntaba a `cloudflare-worker-v2.1-improved-debug.js`, pero el código integrado y el worker observado usan la línea `cloudflare-worker-v3-hybrid.js`.
- Se intentó desplegar desde CLI, pero Supabase falló por falta de `SUPABASE_ACCESS_TOKEN` y Cloudflare no tenía sesión `wrangler`.
- El dry-run del worker con `wrangler@3.112.0` compila correctamente.
- Se añadieron scripts de despliegue en `package.json` para repetir el proceso cuando haya credenciales.

### Decisiones

- Usar `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md` como fuente de verdad desde este punto.
- Separar hechos, decisiones, hipótesis y tareas pendientes en los documentos de seguimiento.
- Implementar soporte `de`/`pt` con paridad de rutas localizadas para la biblioteca del vino.
- Usar localización genérica de rutas de la biblioteca en sitemap y prerender para evitar mantener manualmente todas las variantes dinámicas.
- Mover el resolver de entidades de la biblioteca a `src/data/wineLibraryLinks.ts` para reutilizar enlaces internos y evitar warnings de Fast Refresh.
- Ajustar Vitest para usar el plugin instalado `@vitejs/plugin-react`.
- Añadir resolución inversa de rutas localizadas para que el selector de idioma funcione en páginas dinámicas.
- Validar las funciones Edge con `npx --yes deno-bin check` en vez de depender de un Deno instalado globalmente.
- Separar `LanguageProvider` en `src/i18n/LanguageProvider.tsx` y dejar `LanguageContext.tsx` para contexto/hook.
- En el merge con `main`, conservar los overlays i18n más recientes de uvas en `de`/`pt` y adaptar los helpers locales que necesitaba la biblioteca.
- Restaurar rutas generales `de`/`pt` en el sitemap tras detectar la contradicción.
- Mantener la deuda de lint global como iniciativa separada.
- Cerrar el bloque técnico como integrado en `main` y mover el foco a despliegue, validación productiva y mejora editorial.
- Tratar despliegue/validación productiva como siguiente bloque operativo, porque no hay CLI/script de deploy disponible en este entorno.
- No incluir tokens privados en el repo; usar variables de entorno o login local para desplegar.

### Hipótesis

- La estrategia correcta para escalar la biblioteca es consolidar primero la infraestructura SEO multilingüe y después enriquecer contenido editorial por idioma.
- La deuda de lint global debe tratarse como una iniciativa separada para no mezclar riesgos.
- La validación final importante será la de producción después del despliegue, especialmente sitemap, canonical, hreflang y prerender.

### Tareas pendientes

- Validar el despliegue en producción.
- Usar `cloudflare-worker-v3-hybrid.js` en el despliegue manual del worker.
- Ejecutar `npm run deploy:supabase:seo` y `npm run deploy:worker` cuando estén disponibles las credenciales.
- Revisar Search Console tras indexación.
- Definir el siguiente bloque editorial de la biblioteca del vino.

### Cierre de despliegue productivo

#### Hechos

- El usuario aclaró que Supabase vive dentro de Lovable para este proyecto y proporcionó el proyecto `https://lovable.dev/projects/2c4eed0e-6760-45f0-aeb3-ce44de8e91f1`.
- Se publicó el frontend desde Lovable; la UI mostró `Published` y `Up to date`.
- Se autenticó Cloudflare Wrangler como `gugocreative@gmail.com`.
- El primer despliegue CLI del Worker `winerim-proxy` (`170c5339-8938-45c9-8aaa-e8be84dac540`) dejó producción en HTTP 500 porque el script no preservaba las variables públicas del Worker.
- Se redeployó el Worker con `--keep-vars` y variables explícitas (`60c3b0e2-28ac-4785-8eb8-fd7750294823`), recuperando HTTP 200.
- Lovable desplegó las Edge Functions `sitemap` y `prerender` tras pedirlo explícitamente en el chat del proyecto.
- Se detectó que `prerender` devolvía HTML correcto con `Content-Type: text/plain`; el Worker lo rechazaba y caía en `bot-fallback`.
- Se parcheó `cloudflare-worker-v3-hybrid.js` para aceptar HTML prerenderizado por contenido real, aunque venga etiquetado como `text/plain`.
- Se desplegó el Worker final `ec6d2f24-f3f3-4739-8a56-ef6992fdf2a9`.
- Producción quedó validada:
  - Sitemap público con rutas `de` y `pt` de biblioteca.
  - Googlebot en Tempranillo alemán y portugués con `X-Prerendered: true`, `X-Worker-Branch: bot-prerender`, canonical y hreflang correctos.

#### Decisiones

- No usar Supabase externo como vía principal en este proyecto mientras Lovable gestione las Edge Functions.
- Desplegar el Worker desde el repo con `npm run deploy:worker`, no con comandos sueltos que puedan omitir variables.
- Mantener `--keep-vars` en los scripts del Worker para preservar secretos de Cloudflare.
- Tratar como válido el HTML prerenderizado si el cuerpo empieza por `<!doctype html` o `<html`, aunque el `Content-Type` no sea `text/html`.

#### Hipótesis

- El comportamiento `Content-Type: text/plain` de Supabase Edge Functions puede repetirse en otros prerenders; el sniffing de HTML evita una caída falsa a SPA para bots.
- El flujo Lovable puede requerir prompts explícitos para Edge Functions aunque la UI indique que publicar frontend es suficiente.

#### Tareas pendientes

- Commit y push de los ajustes finales.
- Revisar visualmente rutas `de`/`pt` en navegador y selector de idioma.
- Revisar avisos de seguridad de Lovable en una tarea separada.
- Monitorizar Search Console después de la indexación.

### Bloque editorial avanzado de biblioteca del vino

#### Hechos

- Se inició el siguiente bloque tras cerrar infraestructura y despliegue `de`/`pt`.
- Se implementó una nueva capa editorial para 10 uvas prioritarias.
- Las uvas incluidas son `tempranillo`, `garnacha`, `albarino`, `verdejo`, `godello`, `chardonnay`, `cabernet-sauvignon`, `pinot-noir`, `sauvignon-blanc` y `riesling`.
- El bloque añade inteligencia de servicio, rol en carta, guion de sala, palanca comercial, error a evitar, maridajes y FAQs.
- El contenido se localizó para `es`, `en`, `it`, `fr`, `de` y `pt`.
- Se integró el bloque en `GrapeDetail` para fichas completas y fichas de catálogo.
- Se corrigió `getLocalizedGrape` para aceptar `slug` y devolver la ficha completa localizada.
- Se detectó durante QA una fuga de narrativa española en fichas localizadas completas.
- Se añadió fallback narrativo localizado para evitar mezclar español en páginas internacionales cuando una ficha no tenga traducción profunda.
- Se extendió el prerender de bots para las mismas 10 uvas prioritarias y los seis idiomas.
- Verificaciones ejecutadas: `npm run test`, `npm run build`, `deno check`, `git diff --check` y navegador local en rutas `de`, `pt`, `it`, `fr`.

#### Decisiones

- Tratar la paridad entre frontend y prerender como una regla de calidad SEO de la biblioteca del vino.
- Empezar la profundidad editorial máxima por 10 uvas prioritarias antes de ampliar a más entidades.
- Usar fallbacks narrativos localizados como solución intermedia segura, sin sustituir la escritura editorial completa futura.
- Mantener este bloque separado de lint global y avisos de seguridad Lovable.
- No desplegar Worker Cloudflare porque el cambio afecta a frontend y Edge Function `prerender`, no al proxy.

#### Hipótesis

- Las 10 uvas priorizadas concentran suficiente demanda SEO y utilidad de restaurante para justificar ser la primera tanda.
- El enriquecimiento de prerender mejorará la lectura de bots y AI crawlers en fichas de uva.
- La siguiente mejora de mayor impacto será ampliar entidad por entidad con contenido propio, schema más rico y enlaces internos por intención.

#### Tareas pendientes

- Commit y push del bloque editorial.
- Publicar frontend desde Lovable.
- Pedir despliegue explícito de `prerender` desde Lovable.
- Validar producción con usuario real y Googlebot.
- Escalar el patrón editorial a 30-50 uvas/regiones/estilos prioritarios.

### Auditoría SEO producción y Search Console

#### Hechos

- El usuario pidió auditar Search Console, la web y todo el contenido antes de seguir con biblioteca del vino.
- Al iniciar esta continuación se leyeron `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- Se detectó contradicción documental: `CURRENT_STATE.md` y `NEXT_STEPS.md` aún marcaban como pendiente el commit/push del bloque editorial, pero `main` ya estaba en `e3eab53 feat: enrich wine library editorial profiles`.
- Se auditó producción pública como Googlebot contra el sitemap completo.
- Se creó `src/seo/SEO_PRODUCTION_AUDIT_2026-05-23.md`.
- Resultados principales:
  - Sitemap con 2.989 URLs únicas.
  - 2.455 URLs HTTP 200.
  - 534 URLs HTTP 404 enviadas por sitemap.
  - 2.333 URLs con `bot-prerender`.
  - 122 URLs con `bot-fallback`.
  - 156 URLs con hreflang esperado en sitemap ausente en HTML.
  - 276 URLs HTTP 200 con canonical distinta a la URL enviada.
  - `robots.txt` anuncia `llms.txt` como `Sitemap` aunque es `text/plain`.
- Los 404 provienen principalmente de `seo_pages` publicadas en sitemap que el Worker no reconoce como rutas conocidas:
  - 222 slugs de familias uva/variedad.
  - 303 slugs de cursos.
  - 3 slugs de región.
  - 6 slugs portugueses con prefijo `software-carta-vinhos-*`.
- Las 122 URLs `bot-fallback` son páginas programáticas de ciudad, sobre todo `wine-list-software-*` y `software-carta-de-vinos-*`.
- La biblioteca del vino nueva no presentó 404 en sitemap: 1.470 URLs auditadas y 1.470 HTTP 200.
- Se detectaron 96 legacy shortcuts de biblioteca con título/H1 genérico, 16 por idioma.
- Search Console privada no se pudo auditar directamente porque no había acceso/exportación disponible en la sesión.

#### Decisiones

- Antes de seguir ampliando la biblioteca del vino, priorizar correcciones SEO técnicas de indexabilidad.
- Tratar sitemap, Worker y prerender como una sola fuente coordinada: no enviar en sitemap URLs que el Worker/prerender no puedan resolver.
- Cruzar la auditoría pública con Search Console cuando el usuario abra la propiedad o facilite exportaciones.
- Mantener `llms.txt` accesible, pero no declararlo como `Sitemap` en `robots.txt`.
- Resolver legacy shortcuts de biblioteca con redirects canónicos o metadatos únicos antes de ampliar mucho más la superficie indexable.

#### Hipótesis

- Search Console reflejará los hallazgos públicos como errores de cobertura, canonicals inesperadas, duplicados y posibles problemas hreflang.
- Corregir 404 del sitemap y `bot-fallback` tendrá más impacto inmediato que añadir nuevas entidades editoriales.
- La biblioteca del vino puede escalar mejor cuando la base sitemap/prerender/canonical esté saneada.

#### Tareas pendientes

- Conseguir acceso o exportaciones de Search Console.
- Corregir 534 URLs 404 enviadas en sitemap.
- Corregir 122 URLs `bot-fallback`.
- Unificar hreflang entre sitemap y prerender.
- Corregir canonicals de recursos, benchmarks/playbooks y páginas localizadas que caen a `/`.
- Retirar `llms.txt` como sitemap de `robots.txt`.
- Resolver legacy shortcuts de biblioteca del vino.
- Reenviar sitemap en Search Console y validar correcciones.

### Auditoría de contenido, SEO semántico y LLMs

#### Hechos

- El usuario pidió continuar con análisis de web a nivel contenido, SEO y posicionamiento en LLMs.
- Se creó `src/seo/CONTENT_LLM_AUDIT_2026-05-23.md`.
- Se confirmó que Winerim tiene una entidad clara: software de IA para carta de vinos, recomendaciones, maridajes, stock, pricing, margen y analítica para restaurantes/hoteles/grupos.
- Se detectó que 128 rutas localizadas estáticas entregan a bots la home española con canonical a `/`.
- Se detectó que 320 artículos internacionales con sufijos `_en`, `_it`, `_fr`, `_de` y `_pt` declaran `html lang="es"`.
- Se confirmó que `robots.txt` permite crawlers de IA: `GPTBot`, `ChatGPT-User`, `Google-Extended`, `ClaudeBot`, `PerplexityBot` y `Cohere-AI`.
- Se confirmó que `llms.txt` existe, pero no lista páginas prioritarias ni funciona como mapa semántico completo.
- No existe `llms-full.txt`.
- Se detectó que `analisis.winerim.wine` responde 200, está permitido por robots, tiene título `winerim-analisis`, no canonical visible y HTML inicial muy pobre.
- Búsqueda pública muestra menciones externas útiles en TecnoVino y F6S, además de competidores visibles para categoría.
- Búsqueda pública también muestra URLs antiguas de Winerim que hoy terminan en 404 o redirecciones incompletas.

#### Decisiones

- Tratar posicionamiento en LLMs como consistencia de entidad, no solo como archivo `llms.txt`.
- Priorizar idioma/canonical/prerender limpios antes de ampliar masivamente contenido.
- Rehacer `llms.txt` como mapa curado y crear `llms-full.txt`.
- Revisar subdominios indexables para evitar señales pobres de marca.
- No considerar la biblioteca del vino "máximo nivel" hasta resolver shortcuts legacy y profundidad media.

#### Hipótesis

- Winerim puede aparecer bien en respuestas LLM de marca o categoría muy específica.
- Para consultas genéricas competitivas, la señal actual puede ser superada por competidores con páginas más limpias y menos contradicciones.
- Corregir idioma y prerender de localizadas puede mejorar tanto SEO internacional como comprensión por LLMs.
- Las menciones externas existentes son una buena base para autoridad, pero conviene reforzarlas con páginas propias de evidencia/casos.

#### Tareas pendientes

- Implementar prerender específico para rutas localizadas estáticas.
- Corregir idioma e `inLanguage` de artículos internacionales.
- Decidir patrón canónico de artículos traducidos.
- Rehacer `llms.txt` y crear `llms-full.txt`.
- Revisar `analisis.winerim.wine`.
- Resolver URLs antiguas indexadas que terminan en 404.
- Crear páginas de evidencia y comparativas para reforzar autoridad en LLMs.

### Primer bloque de correcciones SEO/LLM tras auditoría

#### Hechos

- Tras la auditoría SEO y LLM se implementó un primer saneamiento en el repo.
- `public/robots.txt` ya no anuncia `llms.txt` como sitemap.
- `public/llms.txt` se rehizo como referencia curada para sistemas de IA.
- Se creó `public/llms-full.txt` como referencia extendida de entidad, producto, biblioteca del vino, herramientas y guías.
- `supabase/functions/sitemap/index.ts` filtra las familias de `seo_pages` no resolubles que causaban 534 URLs 404 en la auditoría pública.
- `supabase/functions/sitemap/index.ts` excluye temporalmente 24 rutas estáticas de recursos, benchmarks y playbooks que aún no tienen prerender/canonical específicos.
- `supabase/functions/prerender/index.ts` añade prerender técnico para rutas estáticas localizadas `en`, `it`, `fr`, `de` y `pt`.
- Las páginas estáticas españolas principales ahora pueden emitir hreflang completo con `de` y `pt`.
- `renderArticle` infiere idioma desde sufijos `_en`, `_it`, `_fr`, `_de` y `_pt`.
- Verificaciones locales completadas:
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`.
  - `npm run build`.
  - `npm run test`.
  - `git diff --check`.
  - Pruebas locales de prerender como Googlebot en `/en/pricing`, `/de/preise` y `/precios`.

#### Decisiones

- Corregir primero la indexabilidad básica antes de ampliar de nuevo la biblioteca del vino.
- Sacar del sitemap las URLs que el sistema no puede resolver ahora, en vez de seguir enviando 404.
- Mantener fuera del sitemap de forma temporal los recursos/benchmarks/playbooks sin prerender propio.
- Usar una plantilla localizada genérica para cortar el fallo crítico de rutas localizadas que caían a la home española.
- Tratar esa plantilla localizada como solución técnica intermedia, no como traducción editorial final.
- Mantener `llms.txt` y `llms-full.txt` como archivos informativos para IA, no como sitemaps.
- No tocar Cloudflare Worker en este bloque porque no cambia la lógica del proxy.

#### Hipótesis

- Al desplegar en Lovable, el sitemap público debería dejar de enviar las 534 URLs 404 detectadas en la auditoría.
- Las rutas localizadas estáticas deberían dejar de canonicalizar a `/` para bots cuando se despliegue `prerender`.
- La mejora de `llms.txt`/`llms-full.txt` ayuda a LLMs y agentes, pero su efecto depende de que el sitio siga teniendo contenido indexable limpio.
- La siguiente mejora con mayor impacto será resolver los `bot-fallback` restantes y convertir las páginas excluidas temporalmente en contenido real o redirecciones canónicas.

#### Tareas pendientes

- Publicar frontend desde Lovable.
- Pedir despliegue explícito de Edge Function `sitemap` desde Lovable.
- Pedir despliegue explícito de Edge Function `prerender` desde Lovable.
- Revalidar producción con Googlebot y sitemap público.
- Reenviar sitemap en Search Console y validar correcciones.
- Decidir destino definitivo de las URLs excluidas: mantener fuera, redirigir o crear páginas reales.

### Search Console: verificación, auditoría y redirects legacy

#### Hechos

- Se intentó acceder a `sc-domain:winerim.wine` y a `https://winerim.wine/` en Search Console.
- La cuenta `gugocreative@gmail.com` no tenía acceso inicial.
- Search Console ofreció verificación por archivo HTML `google0be715f4ef205b3d.html`.
- El flujo automático de verificación con Cloudflare quedó bloqueado por popup.
- Se añadió el archivo `public/google0be715f4ef205b3d.html`.
- Se añadió una ruta en `cloudflare-worker-v3-hybrid.js` para servir `/google0be715f4ef205b3d.html`.
- Se desplegó Cloudflare Worker `winerim-proxy`.
- Search Console verificó la propiedad `https://winerim.wine/` correctamente mediante archivo HTML.
- Se auditó Search Console y se creó `src/seo/SEARCH_CONSOLE_AUDIT_2026-05-23.md`.
- Hallazgos principales:
  - 664 clics y 8,32 mil impresiones en 3 meses.
  - 73 páginas indexadas y 1.643 no indexadas.
  - 194 URLs 404.
  - 1.232 URLs descubiertas sin indexar.
  - 111 URLs rastreadas sin indexar.
  - `/sitemap.xml` correcto y `/sitemap_index.xml` todavía enviado desde 2022.
  - LCP móvil pobre en grupo de 7 URLs, con home como ejemplo y LCP 4,5 s.
  - 4 elementos FAQ no válidos por `FAQPage` duplicado.
  - Sin acciones manuales ni problemas de seguridad.
  - 48 enlaces externos y 87 enlaces internos detectados.
- Se añadieron redirects directos de alta confianza en el Worker para ejemplos de Search Console.
- Se desplegó Worker final con redirects: `766e2cdd-da00-4157-8745-1f27c25a03e5`.

#### Decisiones

- Verificar la propiedad URL-prefix `https://winerim.wine/` como primer paso práctico, aunque la propiedad de dominio siga pendiente.
- Usar método de archivo HTML por estabilidad y rapidez.
- Servir la verificación tanto desde Worker como desde `public/` para mantener continuidad.
- Corregir redirects legacy de alta confianza cuando Search Console mostró ejemplos concretos y existía destino canónico claro.
- No validar corrección de 404 en Search Console todavía porque no están corregidos todos los casos.
- No reenviar sitemap todavía porque `sitemap` y `prerender` saneados aún no están desplegados desde Lovable.

#### Hipótesis

- La caída de `/en/pricing` que muestra Search Console está relacionada con el problema de rutas localizadas que entregaban home española/canonical `/`.
- La dependencia de tráfico branded es alta; la biblioteca del vino y las páginas informacionales aún no están aportando volumen significativo.
- El número bajo de enlaces internos detectados por Search Console indica que Google no está entendiendo todavía la arquitectura completa.
- Resolver legacy redirects y sitemaps reducirá ruido antes de pedir validaciones.

#### Tareas pendientes

- Exportar ejemplos completos de 404, descubiertas sin indexar y rastreadas sin indexar.
- Completar mapa de redirects legacy por familias.
- Retirar o dejar inactivo `/sitemap_index.xml` en Search Console si la UI lo permite.
- Desplegar `sitemap` y `prerender` saneados desde Lovable.
- Reenviar `/sitemap.xml` cuando producción ya refleje esos cambios.

## 2026-05-24

### Auditoría profunda web, rendimiento y señales orgánicas

#### Hechos

- El usuario pidió revisar la web en profundidad antes de continuar con biblioteca del vino.
- Se leyeron `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md` antes de continuar.
- Se creó `src/seo/WEB_DEEP_AUDIT_2026-05-24.md`.
- Lighthouse mobile midió performance baja en home y `/clientes`:
  - Home: Performance 58, LCP 12,9 s.
  - `/clientes`: Performance 57, LCP 12,1 s.
- Se detectaron 122 URLs programáticas de ciudad en `bot-fallback`.
- Se detectó que páginas legales localizadas aparecían en sitemap y devolvían a Googlebot contenido/canonical de home.
- Se detectó 404 de `~api/analytics`.
- Se detectó 404 de asset en `/clientes` por nombres de archivo de logos con espacios.
- Se implementó saneamiento local de sitemap, legales, prerender y nombres de assets.
- Se desplegó Cloudflare Worker `winerim-proxy` con Version ID `4cc5425b-cc8d-4de4-a72f-d9370b355426`.
- Producción ya emite `X-Robots-Tag: noindex, follow` en legales tras el despliegue Worker.

#### Decisiones

- Las páginas legales no deben competir en SEO: se mantienen accesibles, pero con `noindex, follow` y fuera de sitemap.
- El `noindex` explícito de frontend debe ser `noindex, follow`; staging mantiene `noindex, nofollow`.
- Las familias city/programmatic sin HTML SEO válido salen del sitemap hasta que tengan contenido real o destino definitivo.
- No añadir más superficie indexable masiva sin asegurar primero prerender, canonical, H1 y contenido específico.
- Sanear basenames de assets públicos para evitar rutas generadas con espacios o caracteres problemáticos.

#### Hipótesis

- El LCP móvil está condicionado por JS e imágenes, no por TTFB.
- El sitemap saneado reducirá ruido de Search Console cuando se publique desde Lovable y se reenvíe.
- La galería de clientes necesita optimización específica por volumen de logos y DOM.
- `~api/analytics` puede depender del entorno Lovable/origen y requiere revisión separada.

#### Tareas pendientes

- Publicar frontend y Edge Functions desde Lovable.
- Revalidar sitemap, legales y assets en producción tras Lovable.
- Resolver `~api/analytics`.
- Planificar bloque Core Web Vitals.
- Decidir destino de city pages.
- Actualizar o retirar como fuente operativa `src/seo/route-map.ts` si sigue contradiciendo `de`/`pt`.
- Corregir FAQPage duplicado.
- Optimizar LCP móvil de la home.

### Continuación Search Console: FAQ duplicado, redirects y despliegue

#### Hechos

- Se corrigió localmente el `FAQPage` duplicado en `SoftwareCartaVinos`, `VenderMasVino` y `WhatIsWinerim`.
- `FAQSection` añade ahora títulos por defecto para `de` y `pt`.
- `index.html` usa ahora `id="seo-jsonld"` y `id="seo-org-jsonld"` para que `SEOHead` actualice los JSON-LD estáticos en vez de duplicarlos.
- La verificación local con navegador confirmó 1 solo `FAQPage` en:
  - `/software-carta-de-vinos`.
  - `/como-vender-mas-vino-en-un-restaurante`.
  - `/en/what-is-winerim`.
- Se añadió redirect directo para `/estadisticas` y `/estadisticas/*` hacia `/benchmarks-playbooks`.
- Se desplegó Cloudflare Worker `winerim-proxy` con Version ID `4f83ba4a-7994-4cf1-9ec6-d20368b5628b`.
- `npm run deploy:supabase:seo` falló por ausencia de `SUPABASE_ACCESS_TOKEN` o login Supabase CLI.
- Lovable desde el navegador de Codex pide login; no se pudo publicar frontend ni Edge Functions desde esa vía.

#### Decisiones

- Usar `FAQSection` como fuente única de schema `FAQPage` cuando una página ya muestra FAQs.
- Mantener schema de producto/artículo/breadcrumb separado, pero evitar duplicar tipos de schema equivalentes.
- Mantener JSON-LD estático en `index.html` solo como fallback actualizable por `SEOHead`.
- Redirigir `/estadisticas/*` a `/benchmarks-playbooks` porque es el destino actual más cercano a los contenidos antiguos de estadísticas.
- Tratar la falta de credenciales Supabase/Lovable como bloqueo real de despliegue para frontend y Edge Functions.
- Mantener Worker desplegable por CLI cuando el cambio sea del proxy y exista verificación local previa.

#### Hipótesis

- La corrección de FAQ reducirá los 4 elementos no válidos cuando Lovable publique el frontend y Google recrawlee.
- El nuevo redirect de `/estadisticas/*` reducirá ruido en el grupo 404 de Search Console.
- La duplicación genérica causada por `index.html` sin IDs queda corregida localmente; puede quedar una duplicación específica en páginas con schema propio adicional.

#### Tareas pendientes

- Publicar frontend desde Lovable para llevar el arreglo FAQ a producción.
- Desplegar `sitemap` y `prerender` desde Lovable o con `SUPABASE_ACCESS_TOKEN`.
- Confirmar en producción que las páginas afectadas tienen un solo `FAQPage`.
- Pedir validación FAQ en Search Console tras el despliegue frontend.
- Revisar si `WhatIsWinerim` debe conservar schema `SoftwareApplication` propio adicional o transformarlo en un tipo semántico más específico.

### Commit/push del bloque SEO y bloqueo Lovable

#### Hechos

- Se creó y empujó a `origin/main` el commit `a98e8c6 fix: clean search console seo signals`.
- El commit contiene auditorías, `llms.txt`, `llms-full.txt`, correcciones `robots.txt`, sitemap/prerender, FAQ/schema, verificación GSC, redirects Worker y documentos de estado.
- Producción no refleja todavía el commit:
  - `robots.txt` mantiene `llms.txt` como sitemap.
  - `llms-full.txt` responde 404.
  - `/en/pricing` como Googlebot sigue entregando home/canonical española.
- `SUPABASE_ACCESS_TOKEN` sigue ausente y Supabase CLI no puede desplegar Edge Functions.
- Lovable en el navegador de Codex sigue en login.

#### Decisiones

- Tomar `a98e8c6` como referencia para publicar desde Lovable.
- No reenviar sitemap ni pedir validaciones en Search Console hasta que producción refleje el commit.
- Continuar por Lovable autenticado o por Supabase CLI con token explícito.

#### Hipótesis

- Lovable requiere sync/publish manual aunque `origin/main` esté actualizado.
- El despliegue frontend y el despliegue de Edge Functions pueden ser acciones separadas dentro de Lovable.

#### Tareas pendientes

- Iniciar sesión en Lovable en la ventana de Codex.
- Publicar/sincronizar el commit `a98e8c6`.
- Desplegar `sitemap` y `prerender`.
- Repetir QA público antes de tocar Search Console.

### Producción validada tras publicación Lovable

#### Hechos

- Lovable publicó el bloque SEO/LLM.
- `robots.txt` ya no declara `llms.txt` como sitemap.
- `llms-full.txt` responde HTTP 200 en producción.
- `sitemap.xml` en producción contiene 2.431 URLs y ya no incluye familias excluidas como `grape/`, `uva/`, `llms.txt` ni el ejemplo `/benchmarks-playbooks/playbook-mejorar-rotacion`.
- Googlebot recibe idioma/canonical propios en `/en/pricing`, `/de/preise` y `/pt/precos`.
- Googlebot recibe `html lang="en"` e `inLanguage: "en"` en `/article/alex-pardo_en`.
- Las páginas con error FAQ previo renderizan 1 solo `FAQPage` en navegador.
- Worker no se redesplegó porque producción ya servía correctamente redirects y verificación GSC.

#### Decisiones

- Dar por publicado el bloque técnico SEO/LLM en producción.
- No redeployar Worker sin cambio efectivo o fallo de QA.
- Pasar el foco a Search Console: reenviar sitemap y pedir validaciones.

#### Hipótesis

- Search Console mantendrá el estado antiguo hasta recrawl, pero las condiciones técnicas para validar ya están.
- La limpieza del sitemap debería reducir errores detectados en próximos rastreos.

#### Tareas pendientes

- Reenviar sitemap en Search Console.
- Pedir validación FAQ.
- Seguir exportando y corrigiendo familias 404 restantes.
- Abrir bloque separado para LCP móvil y enlaces internos.

### Acciones Search Console post-despliegue

#### Hechos

- Se releyeron los documentos fuente de verdad antes de continuar.
- Search Console muestra `/sitemap.xml` enviado y leído el 24 may 2026, estado `Correcto`, 2.431 páginas descubiertas y 0 vídeos.
- Search Console mantiene `/sitemap_index.xml` listado desde 2022, leído por última vez el 18 may 2026, estado `Correcto`, 1.358 páginas descubiertas.
- Se inició la validación del error `El campo "FAQPage" está duplicado`.
- La validación FAQ quedó con resultado `Iniciada` y fecha de inicio 24/5/26.
- La inspección de URL de `https://winerim.wine/software-carta-de-vinos` confirma:
  - URL en Google.
  - Página indexada.
  - HTTPS válido.
  - 1 breadcrumb válido.
  - 1 FAQ válido.
- Se intentó solicitar reindexación de `https://winerim.wine/software-carta-de-vinos`.
- Search Console rechazó temporalmente la solicitud con el mensaje `Se ha producido un problema al enviar la solicitud de indexación. Vuelve a intentarlo más tarde.`

#### Decisiones

- Reenviar sitemap y validar FAQ son acciones suficientes para esta primera pasada post-despliegue.
- La indexación manual debe limitarse a URLs estratégicas, no a todo el sitemap.
- No repetir solicitudes de indexación mientras Search Console devuelva error temporal.
- No retirar `/sitemap_index.xml` sin confirmar una acción de retirada clara en Search Console.

#### Hipótesis

- Google puede tardar varios días en procesar la validación FAQ y actualizar los informes de cobertura.
- El error de solicitud de indexación no indica problema técnico de la página inspeccionada, porque Search Console la muestra indexada y con datos estructurados válidos.
- El sitemap nuevo ya está técnicamente aceptado por Search Console; el efecto en páginas no indexadas será gradual.

#### Tareas pendientes

- Monitorizar la validación FAQ iniciada.
- Reintentar indexación manual más tarde solo para una lista corta de URLs core e internacionales.
- Seguir corrigiendo 404 por familias antes de pedir validación global.
- Abrir bloque separado para Core Web Vitals móvil y enlaces internos.

### Actualización de logos home/clientes

#### Hechos

- El usuario pidió actualizar logos antes de continuar con Search Console o biblioteca del vino.
- Se usó `Hoteles_Blancos_1024.zip` para la sección de hoteles de la home.
- Se usó `Logos_Blancos_white_1024.zip` para la página `/clientes`.
- Se añadieron 8 logos de hoteles en `src/assets/logos/hotels-white/`.
- Se añadieron 589 logos de clientes en `src/assets/logos/clients-white/`.
- Los PNG se redujeron a 360 px para controlar peso.
- `LogoStrip` importa ahora los logos de hoteles blancos desde `hotels-white`.
- `Clientes` usa `import.meta.glob` para construir la galería estática desde `clients-white`.
- `/clientes` ya no depende de la tabla `restaurants` de Supabase para mostrar la galería pública de logos.
- Verificaciones ejecutadas:
  - `npm run build`.
  - `npm run test`.
  - `git diff --check`.
  - Navegador local en home y `/clientes`.

#### Decisiones

- Priorizar assets estáticos versionados para la prueba social pública.
- Tras feedback posterior del usuario, mantener nombres visibles de clientes bajo cada logo y conservar ubicación como apoyo/metadato accesible.
- Ordenar la galería con logos de España primero.
- No mezclar este bloque con SEO técnico, Search Console, Worker ni biblioteca del vino.

#### Hipótesis

- La nueva galería aumenta credibilidad comercial sin afectar al flujo SEO técnico.
- El lazy-loading reduce el impacto de incluir 589 logos en `/clientes`.
- En el futuro puede merecer la pena generar un manifest curado de nombres comerciales y ubicaciones.

#### Tareas pendientes

- Hecho: commit y push base de logos con `c7adcfe feat: update hotel and client logos`.
- Publicar desde Lovable.
- Validar home y `/clientes` en producción.
- Evaluar conversión WebP/AVIF dedicada si se quiere reducir aún más peso.

### Ajuste visual posterior de logos

#### Hechos

- El usuario pidió mantener el nombre escrito de los clientes y hacer más grandes los logos de hoteles.
- Se detectó y corrigió una contradicción documental: el commit/push base de logos ya estaba hecho en `c7adcfe`, aunque `CURRENT_STATE.md` aún lo marcaba pendiente.
- `Clientes` muestra ahora nombre visible y ubicación secundaria en cada tarjeta de cliente.
- La galería de `/clientes` baja su densidad máxima de 8 a 6 columnas para que logo y nombre respiren mejor.
- `LogoStrip` aumenta el tamaño de los logos hoteleros en home de `h-8 sm:h-14 md:h-16` a `h-16 sm:h-20 md:h-24`.
- Verificaciones ejecutadas:
  - `npm run build`.
  - `npm run test`.
  - `git diff --check`.
  - Navegador local en home y `/clientes`.

#### Decisiones

- Mostrar nombre visible de clientes bajo el logo como criterio de diseño para `/clientes`.
- Mantener ubicación visible de forma secundaria, limitada a una línea.
- Dar más presencia a los logos de hoteles sin añadir copy visible nuevo en la home.
- No mezclar el ajuste visual con cambios SEO, Worker, Search Console ni biblioteca del vino.

#### Hipótesis

- La página `/clientes` gana claridad comercial al combinar logo y nombre.
- Los hoteles en home necesitan mayor peso visual para que la sección de grupos hoteleros no quede débil frente a Michelin/Repsol.
- En un bloque posterior convendrá normalizar nombres desde un manifest editorial, porque algunos filenames no reflejan perfectamente el nombre comercial.

#### Tareas pendientes

- Publicar el ajuste desde Lovable.
- Validar en producción home y `/clientes`.
- Decidir si se crea un manifest editorial de clientes con nombres comerciales revisados.

### Rendimiento `/clientes` y endpoint analytics noop

#### Hechos

- Producción sigue sin reflejar todo el bloque pendiente de Lovable: el sitemap público aún incluye legales/city pages fallback y `/en/privacy` como Googlebot conserva HTML/canonical de la home.
- El navegador de Codex sigue viendo Lovable en login, por lo que no se pudo publicar desde esa vía.
- Se añadió en `cloudflare-worker-v3-hybrid.js` una respuesta HTTP 204 para `/~api/analytics`.
- Se desplegó Worker `winerim-proxy` Version ID `5e984988-b0c1-4fa2-b5f8-dc0e62fabe0f`.
- Producción verifica `GET` y `OPTIONS` de `/~api/analytics` con HTTP 204 y `X-Worker-Branch: analytics-noop`.
- `/clientes` pasa a cargar los 589 logos por tandas de 120.
- QA local confirma 120 logos iniciales y 240 tras pulsar `Ver más clientes`, sin errores de consola.
- Verificaciones: `npm run build`, `npm run test`, `git diff --check` y `npm run deploy:worker:dry-run`.
- `npm run lint` sigue fallando por deuda global preexistente no relacionada con los archivos modificados.

#### Decisiones

- Usar el Worker para neutralizar `/~api/analytics` con 204, porque el 404 venía del origen y afectaba a auditorías.
- Mantener `/clientes` como galería completa, pero con carga progresiva en vez de renderizar todos los logos de golpe.
- Conservar nombre escrito y ubicación en las tarjetas de cliente.
- No bloquear este cierre por lint global mientras build, tests y diff check estén correctos.

#### Hipótesis

- La carga progresiva de logos reducirá DOM inicial y presión de imágenes en `/clientes`.
- El 204 de analytics eliminará el error de consola en Lighthouse.
- Hasta publicar Lovable, producción no reflejará la parte frontend de `/clientes` ni el sitemap/prerender limpio.

#### Tareas pendientes

- Publicar Lovable para activar frontend, `sitemap` y `prerender` pendientes.
- Revalidar `/clientes`, sitemap y legales tras publish.
- Reejecutar Lighthouse móvil en home y `/clientes`.
- Planificar la limpieza de lint global como bloque separado.

### Validación post-deploy Lovable

#### Hechos

- El usuario confirmó que hizo el deploy desde Lovable.
- Producción refleja el bloque desplegado:
  - Sitemap público con 2.072 URLs.
  - Legales fuera del sitemap.
  - Familias `wine-list-software-*`, `software-carta-de-vinos-*` y `software-carta-vinhos-*` fuera del sitemap.
  - Legales prerenderizadas para Googlebot en `es`, `en`, `it`, `fr`, `de` y `pt` con canonical propio y `noindex, follow`.
  - `/clientes` con 120 logos iniciales y carga progresiva hasta 240 tras el primer click.
  - Home con 8 logos hoteleros nuevos activos y tamaño visual de 96 px en desktop.
  - `/~api/analytics` responde 204 en producción.
- Lighthouse mobile post-deploy:
  - Home: Performance 59, LCP 11,2 s.
  - `/clientes`: Performance 57, LCP 12,3 s, DOM 1.255 elementos.
- `/clientes` mejoró DOM frente a la auditoría anterior, pero LCP sigue siendo alto.
- Lighthouse marcó una anomalía puntual de `robots.txt` en `/clientes`; verificación directa y home Lighthouse confirman `robots.txt` válido.

#### Decisiones

- Dar por desbloqueado el deploy Lovable del bloque SEO/UX actual.
- Pasar la siguiente prioridad a Search Console post-deploy y Core Web Vitals.
- No volver a tocar el sitemap hasta reenviarlo y observar cómo lo procesa Search Console.
- Mantener como tarea separada la mejora real de LCP, porque requiere trabajo sobre render inicial, imágenes y JS.

#### Hipótesis

- Search Console debería procesar un sitemap más limpio después del reenvío.
- Las legales deberían dejar de generar señales confusas de indexación/canonical tras recrawl.
- La carga progresiva de logos mejora estructura y peso, pero el LCP depende de una capa más alta del arranque de la app.

#### Tareas pendientes

- Reenviar `/sitemap.xml` en Search Console.
- Reintentar indexación manual de URLs estratégicas cuando Search Console lo permita.
- Preparar bloque Core Web Vitals con foco en LCP/FCP, imágenes, JS no usado y cache TTL.
- Vigilar si se repite el aviso de Lighthouse sobre `robots.txt`.

### Search Console y primer bloque Core Web Vitals home

#### Hechos

- Se reenvió `/sitemap.xml` en Search Console y la UI confirmó el envío correcto.
- Search Console seguía mostrando 2.431 páginas descubiertas tras el envío, pendiente de recrawl.
- La URL `https://winerim.wine/software-carta-de-vinos` quedó añadida a la cola prioritaria de rastreo.
- La solicitud de indexación para `https://winerim.wine/de/weinbibliothek` no quedó confirmada porque la UI se quedó bloqueada probando indexabilidad.
- Una tanda automatizada de URLs estratégicas expiró sin salida verificable, por lo que no se considera confirmada.
- Se implementó un saneamiento local de rendimiento para home:
  - Home bajo el fold diferida después del primer `load`.
  - Chat diferido tras `load`/idle.
  - Navbar sin `framer-motion` en el bundle inicial.
  - Modulepreloads iniciales reducidos a vendors esenciales.
  - `fetchpriority` normalizado en imágenes hero.
- Verificaciones completadas: `npm run test`, `npm run build`, `git diff --check` y QA local en preview para home, dropdown desktop y menú móvil.

#### Decisiones

- Usar indexación manual solo como refuerzo de URLs prioritarias, no como sustituto de sitemap, enlazado interno y consistencia técnica.
- No documentar como exitosas solicitudes de indexación sin confirmación explícita de Search Console.
- Atacar LCP de home reduciendo competencia de JS y terceros antes de rediseñar hero o contenido.
- Mantener comportamiento visual del navbar con CSS simple en vez de cargar `framer-motion` en la navegación inicial.
- Retrasar contenido bajo el fold y Footer hasta después de la carga inicial para proteger FCP/LCP.

#### Hipótesis

- El nuevo perfil de carga debería mejorar LCP móvil de home tras publicar y esperar datos de campo.
- El efecto no será inmediato en Search Console porque Core Web Vitals depende de datos agregados y recrawl.
- Las rutas nuevas internacionales de biblioteca pueden necesitar varias señales adicionales: sitemap leído, enlaces internos y solicitudes puntuales de indexación.

#### Tareas pendientes

- Commit y push del bloque Core Web Vitals.
- Publicar desde Lovable.
- Revalidar producción y medir Lighthouse/CrUX cuando el despliegue esté activo.
- Reintentar indexación de `https://winerim.wine/de/weinbibliothek` más tarde.

### 2026-05-25: segundo bloque Core Web Vitals home

#### Hechos

- Producción publicada con `553d17c` se validó correctamente a nivel funcional, pero Lighthouse mobile siguió en Performance 60 y LCP 10,97 s.
- El entry publicado `/assets/index-D4-5gxc6.js` seguía importando `vendor-motion` y `vendor-charts` de forma estática aunque ya no aparecieran como modulepreload inicial.
- Se identificó que el `manualChunks` de Vite dejaba `react/jsx-runtime` dentro de `vendor-motion` y utilidades UI dentro de chunks pesados.
- Se identificó que `App.tsx` mantenía un `TooltipProvider` lazy envolviendo toda la aplicación.
- Se creó y pusheó `7cccf3d fix: remove heavy vendors from home startup`.
- El build local posterior tiene entry `/assets/index-DZSHSGuS.js`, sin imports estáticos de `vendor-motion`, `vendor-charts`, `vendor-radix` ni `vendor-supabase`.
- Lighthouse mobile local en preview tras `7cccf3d`: Performance 96, FCP 1,96 s y LCP 2,26 s.
- Producción aún no refleja el cambio de código `7cccf3d`; sigue sirviendo deployment `20fa0919-eb4c-4738-a25d-5bf87c5c1cff`.
- Desplegar la rama `main` desde Lovable incluye `7cccf3d`, aunque puede haber commits posteriores solo de documentación.

#### Decisiones

- No dar por resuelto Core Web Vitals con el bloque `553d17c`; fue una reducción parcial de preloads, no una eliminación completa del coste crítico.
- Mover `react/jsx-runtime` y `react/jsx-dev-runtime` a `vendor-react`.
- Crear `vendor-ui-utils` para `clsx`, `tailwind-merge` y `class-variance-authority`.
- Eliminar el `TooltipProvider` lazy global de `App.tsx` para que no pueda suspender el primer render.
- Retrasar overlays, toasts, cookie consent, intent tracker y popups hasta después de `load`/idle.
- Publicar `main` desde Lovable antes de tomar más decisiones de rendimiento.

#### Hipótesis

- El mayor salto inmediato de LCP vendrá de publicar `7cccf3d`, porque elimina cargas estáticas pesadas del arranque.
- Si tras publicar `7cccf3d` producción sigue lejos del preview local, la siguiente prioridad será third-party JS y CSS render-blocking.

#### Tareas pendientes

- Publicar `main` desde Lovable; contiene el cambio de código `7cccf3d`.
- Revalidar entry/preloads/chunks en producción tras publish.
- Repetir Lighthouse mobile en producción.
- Mantener Search Console/Core Web Vitals en observación porque los datos de campo no cambiarán inmediatamente.

### 2026-05-25: revalidación producción tras publish de main

#### Hechos

- Producción ya sirve el deployment `19fcf663-9531-4993-a3a9-4ae480002433`.
- Home ya usa entry `/assets/index-Fu3lyPiF.js`, distinto del entry viejo `/assets/index-D4-5gxc6.js`.
- Modulepreloads iniciales publicados: `vendor-react`, `vendor-query`, `vendor-router` y `vendor-ui-utils`.
- El entry publicado no importa estáticamente `vendor-motion`, `vendor-charts`, `vendor-radix` ni `vendor-supabase`.
- QA de home en producción: H1 presente, dropdown desktop `Producto` correcto y sin errores de consola.
- Lighthouse mobile tras publish sigue en Performance 60 y LCP 11,38 s.
- El LCP sigue siendo el H1 de la home.
- El desglose LCP muestra 93% de render delay: 10,57 s.
- La cadena crítica propia ya es corta y no incluye chunks pesados: HTML -> CSS/entry.
- Una prueba de Lighthouse bloqueando terceros no mejoró el LCP; bajó a Performance 58 y LCP 12,33 s.

#### Decisiones

- Considerar resuelto en producción el problema de imports estáticos pesados del entry.
- No considerar resuelto Core Web Vitals.
- No seguir invirtiendo en `vendor-motion`/`vendor-charts` para la home hasta que aparezca una nueva evidencia.
- El siguiente diagnóstico de rendimiento debe centrarse en el render delay del H1: CSS crítico, fuentes, animación y estilos del hero.
- Mantener terceros como deuda relevante, pero no tratarlos como causa única del LCP porque el test bloqueándolos no mejoró.

#### Hipótesis

- La combinación de fuente externa Playfair, `font-heading`, gradiente de texto y animación del H1 puede estar retrasando la contabilización final de LCP bajo el perfil móvil de Lighthouse.
- El resultado de producción se puede acercar al preview local si se estabiliza el primer paint del H1 y se reduce dependencia de CSS/fuentes externas para el texto principal.

#### Tareas pendientes

- Probar variante del hero sin animación en H1.
- Probar variante del H1 con color sólido inicial.
- Evaluar self-host/preload real de fuentes críticas o fuente del sistema en hero.
- Medir cada variante antes de publicar.

### 2026-05-25: variante controlada del H1 de home

#### Hechos

- Se releyeron `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md` antes de continuar.
- Se aplicó la variante documentada de Core Web Vitals: retirar `animate-fade-in-up` solo del H1 de `src/components/landing/HeroSection.tsx`.
- No se modificaron gradiente, fuente ni CSS crítico en esta variante.
- Verificaciones locales completadas:
  - `npm run build`.
  - `npm run test`: 5 archivos, 15 tests.
  - `git diff --check`.
  - QA navegador en preview local: H1 visible, sin animación y con opacidad 1.
  - Lighthouse mobile local: Performance 96, FCP 2,0 s y LCP 2,3 s.
- Commit y push realizados en `main`: `b86d06d fix: remove hero h1 entrance animation`.
- Lovable no pudo publicarse desde Codex porque el proyecto redirige a login en el navegador integrado.

#### Decisiones

- Mantener la prueba como cambio mínimo para aislar si la animación del H1 estaba retrasando el LCP en producción.
- Publicar y medir producción antes de tocar `text-gradient-wine`, fuentes o CSS crítico.

#### Hipótesis

- La mejora local confirma que no hay regresión visual ni funcional, pero la validación real es producción porque el problema se manifiesta con red/throttling y entorno publicado.
- Si producción no mejora, el siguiente experimento debe ser color sólido inicial para el H1 y después fuente crítica/preload.

#### Tareas pendientes

- Publicar desde Lovable el commit `b86d06d`.
- Revalidar Lighthouse mobile en producción y revisar el desglose LCP.

### 2026-05-25: revalidación de H1 sin animación y siguiente variante

#### Hechos

- El usuario confirmó la publicación en Lovable.
- Producción sirve deployment `05d29c6a-1f11-4a80-8af5-c913bfa8d990` con entry `/assets/index-B3ya-SL1.js`.
- El entry publicado mantiene preloads ligeros y no importa estáticamente vendors pesados.
- El H1 publicado ya no tiene `animate-fade-in-up`; navegador confirma `animationName: none` y `opacity: 1`.
- Lighthouse mobile producción tras la variante sin animación:
  - Performance 58.
  - FCP 6,2 s.
  - LCP 11,1 s.
  - TBT 100 ms.
  - CLS 0,007.
  - El LCP sigue siendo el H1 y el render delay sigue en 10,3 s, 93%.
- Se aplicó localmente la siguiente variante: cambiar el primer tramo del H1 de `text-gradient-wine` a `text-wine-light`.
- Verificaciones locales de la variante color sólido:
  - `npm run build`.
  - `npm run test`: 5 archivos, 15 tests.
  - `git diff --check`.
  - QA navegador: primer tramo sin `backgroundImage`, H1 sin animación, opacidad 1.
  - Lighthouse mobile local: Performance 96, FCP 2,0 s y LCP 2,3 s.

#### Decisiones

- Descartar que la animación del H1 sea la causa suficiente del LCP alto.
- Mantener la retirada de animación por ser una mejora segura del primer paint.
- Probar color sólido antes de tocar fuentes o CSS crítico.

#### Hipótesis

- Si el problema viene del gradiente/clip de texto, producción debería mejorar al publicar el H1 con `text-wine-light`.
- Si no mejora, la hipótesis principal pasa a fuente externa crítica o CSS/orden de render.

#### Tareas pendientes

- Commit y push de la variante color sólido.
- Publicar desde Lovable.
- Revalidar Lighthouse mobile producción y revisar si baja el render delay.

### 2026-05-25: revalidación de color sólido y variante fuente móvil

#### Hechos

- El usuario confirmó la publicación en Lovable de la variante de H1 con color sólido.
- Producción sirve deployment `9d5642ab-6d1f-4806-b6c3-26c1b330db23` con entry `/assets/index-QyK9ToNR.js`.
- El entry publicado mantiene preloads ligeros y no importa estáticamente vendors pesados.
- El H1 publicado tiene `text-wine-light`, sin gradiente, sin animación y con opacidad 1.
- Lighthouse mobile producción tras color sólido:
  - Performance 63.
  - FCP 5,1 s.
  - LCP 7,0 s.
  - TBT 70 ms.
  - CLS 0,007.
  - El LCP sigue siendo el H1.
  - Render delay baja a 6,19 s, 89%.
- Se aplicó localmente la siguiente variante: `font-serif lg:font-heading` en el H1.
- Verificaciones locales de la variante fuente móvil:
  - `npm run build`.
  - `npm run test`: 5 archivos, 15 tests.
  - `git diff --check`.
  - QA navegador desktop: a 1280 px el H1 conserva `Playfair Display`.
  - Lighthouse mobile local: Performance 96, FCP 1,9 s y LCP 2,2 s.

#### Decisiones

- Mantener el color sólido del H1 porque mejoró producción de forma clara.
- Limitar la fuente del sistema a móvil/tablet mediante `font-serif lg:font-heading`.
- Medir esta variante antes de abordar CSS crítico o terceros.

#### Hipótesis

- La dependencia de Playfair en móvil puede explicar una parte del render delay que queda.
- Si esta variante no baja suficiente, el problema restante probablemente esté en CSS crítico/render blocking o en el orden de primer render.

#### Tareas pendientes

- Commit y push de la variante fuente móvil.
- Publicar desde Lovable.
- Revalidar Lighthouse mobile producción y comparar contra LCP 7,0 s.

### 2026-05-25: fuente móvil publicada y corrección de arranque/biblioteca humana

#### Hechos

- La variante de H1 con `font-serif lg:font-heading` quedó en `main` con `1a3a1c3`.
- Producción refleja esa variante en deployment `25c70cc4-cb78-4036-b43a-73bd41ee085a` y entry `/assets/index-howILT12.js`.
- Lighthouse mobile de producción para esa variante fue variable:
  - Performance 85, FCP 2,6 s y LCP 3,5 s en un run.
  - Performance 63, FCP 4,8 s y LCP 7,9 s en otro run.
- Producción mantiene `vendor-query` en el arranque inicial.
- Se separaron los helpers ligeros de rutas de biblioteca en `src/data/wineLibraryRoutes.ts`.
- `LanguageSwitcher` dejó de importar `wineLibraryI18n` y usa el módulo ligero de rutas.
- `App` dejó de usar `QueryClientProvider`.
- `usePageContent` mantiene el contrato del hook con caché manual, TTL y deduplicación de peticiones.
- Se detectó que la ficha humana `/de/weinbibliothek/rebsorten/tempranillo` en producción no muestra H1 ni bloque editorial.
- Se corrigió `GrapeDetail` con `TooltipProvider` local para fichas completas.
- Se añadió test de regresión para la ficha alemana de Tempranillo.
- Verificaciones locales completadas: `npm run test` con 16 tests, `npm run build`, `git diff --check`, QA navegador local y Lighthouse mobile local con Performance 98 y LCP 2,1 s.
- Se creó y pusheó `f26443a fix: slim startup and restore grape detail render`.

#### Decisiones

- No considerar cerrado Core Web Vitals por la mejora puntual de Lighthouse; usar varias muestras y publicar el saneamiento de arranque antes de decidir.
- No volver a introducir providers globales para solucionar dependencias de rutas específicas.
- Mantener los helpers de rutas de biblioteca separados de la capa editorial para proteger el entry de home.
- Sacar React Query del primer render porque ya no hay consumo global que lo justifique.

#### Hipótesis

- La eliminación de `vendor-query` del preload inicial reducirá coste de arranque en producción.
- El proveedor local de tooltip arreglará el bug humano de fichas de uva sin penalizar la home.
- El siguiente bloque de rendimiento, si sigue haciendo falta, será CSS crítico y render-blocking.

#### Tareas pendientes

- Publicar desde Lovable el commit `f26443a` o cualquier `main` posterior que lo contenga.
- Revalidar producción con entry/preloads, home, ruta humana de Tempranillo y Lighthouse mobile.

### 2026-05-25: producción validada tras arranque ligero

#### Hechos

- El usuario confirmó el publish desde Lovable.
- Producción sirve deployment `baa85387-7e8f-4f71-a058-0633f8767465`.
- Home sirve entry `/assets/index-BRCyx101.js`.
- Modulepreloads iniciales publicados: `vendor-react`, `vendor-router` y `vendor-ui-utils`.
- `vendor-query` ya no aparece en preload inicial ni en el entry publicado.
- El entry publicado sigue sin imports estáticos de `vendor-motion`, `vendor-charts`, `vendor-radix` y `vendor-supabase`.
- Home en producción mantiene H1 correcto, sin animación, sin gradiente y con fuente del sistema en móvil.
- `/de/weinbibliothek/rebsorten/tempranillo` como usuario humano renderiza H1 `Tempranillo` y bloque `Service-Intelligenz`.
- Lighthouse mobile producción tras publish:
  - Run 1: Performance 85, FCP 2,4 s, LCP 3,4 s, TBT 60 ms, CLS 0,006.
  - Run 2: Performance 68, FCP 3,1 s, LCP 7,9 s, TBT 60 ms, CLS 0,006.

#### Decisiones

- Dar por publicado y validado el bloque de arranque ligero y reparación de ficha humana.
- No reintroducir React Query en el arranque inicial.
- No dar por cerrado Core Web Vitals hasta estabilizar LCP en varias muestras.
- Si el usuario quiere seguir performance, el siguiente bloque será CSS crítico/render-blocking.

#### Hipótesis

- La variabilidad restante de Lighthouse viene de CSS crítico, render-blocking, fuentes o condiciones externas, no de los vendors pesados que ya fueron eliminados del arranque.
- La mejora de campo en Search Console no será inmediata.

#### Tareas pendientes

- Decidir si seguimos inmediatamente con CSS crítico o retomamos la ampliación máxima de biblioteca del vino.
- Si se retoma biblioteca, usar esta base ya saneada para ampliar entidades sin cargar datos editoriales en el chrome global.

### 2026-05-25: CSS crítico y stylesheet no bloqueante

#### Hechos

- Se implementó el primer bloque CSS crítico/above-the-fold.
- `index.html` incluye ahora `critical-above-fold-css` para navbar y hero de home.
- `vite.config.ts` añade un plugin de build que convierte el CSS generado en preload + stylesheet no bloqueante + fallback `noscript`.
- Verificaciones locales:
  - `npm run build`: correcto.
  - `npm run test`: 16 tests.
  - `git diff --check`: correcto.
  - QA Chrome móvil y desktop de home sin errores.
  - QA Chrome de `/de/weinbibliothek/rebsorten/tempranillo` correcta.
  - Lighthouse mobile local: Performance 98/97, LCP 2,0/2,1 s y 0 recursos render-blocking.
- Commit técnico creado: `6627bda fix: load build css non-blocking`.

#### Decisiones

- Eliminar el CSS render-blocking por build transform, no manualmente en `dist`.
- Mantener el CSS crítico inline limitado al primer viewport.
- Mantener `noscript` para conservar degradación segura.
- No mezclar este bloque con terceros ni cambios de contenido.

#### Hipótesis

- Producción debería eliminar el aviso de render-blocking CSS tras publicar.
- El aumento de HTML está justificado si estabiliza FCP/LCP.
- El CSS crítico deberá revisarse cuando cambien hero o navbar.

#### Tareas pendientes

- Publicar `main` desde Lovable.
- Revalidar producción con Lighthouse mobile y QA de home/ficha de uva.

### 2026-05-25: producción validada tras CSS crítico

#### Hechos

- El usuario indicó que el bloque CSS crítico ya estaba publicado.
- Producción sirve deployment `0e7c5ea6-8b8a-4638-a5f7-01e2335d8106`.
- Home contiene `critical-above-fold-css`.
- El CSS principal carga como preload + stylesheet no bloqueante con fallback `noscript`.
- No hay stylesheet principal bloqueante fuera de `noscript`.
- Lighthouse mobile producción:
  - Run 1: Performance 73, FCP 2,4 s, LCP 6,6 s, TBT 90 ms, CLS 0,006.
  - Run 2: Performance 71, FCP 2,4 s, LCP 6,7 s, TBT 190 ms, CLS 0,006.
  - 0 recursos render-blocking en ambos runs.
- QA Chrome producción confirmó home móvil, home desktop y Tempranillo alemán sin errores de consola.

#### Decisiones

- Dar por validado el bloque CSS crítico en producción.
- Considerar resuelto el problema concreto de CSS render-blocking.
- Mantener Core Web Vitals abierto porque LCP sigue por encima del objetivo.
- Si se sigue performance, pasar a hidratación/terceros.

#### Hipótesis

- El CSS crítico estabiliza mejor FCP/Speed Index, pero el H1 sigue entrando tarde en LCP por causas ajenas al stylesheet principal.
- Terceros y orden de ejecución inicial son los siguientes sospechosos razonables.

#### Tareas pendientes

- Decidir si el siguiente bloque es terceros/hidratación o retomar biblioteca del vino.

### 2026-05-25: GTM diferido tras load/idle

#### Hechos

- Se auditó `index.html` y el código de tracking.
- Consent Mode v2 se mantiene inicializado antes de GTM.
- GTM cargaba de forma inmediata en el `head`.
- El chat ya estaba diferido tras `load` + `requestIdleCallback`.
- Se creó `e164294 fix: defer gtm until after load`.
- Se pusheó `main`; el commit técnico del cambio es `e164294 fix: defer gtm until after load`.
- Producción revisada después del push todavía sirve deployment `94aea691-4fe9-4a08-84c0-135f46fa300f`, entry `/assets/index-BRCyx101.js` y el snippet inmediato antiguo de GTM.
- Conclusión factual: falta publish desde Lovable.
- El snippet nuevo define `window.__winerimLoadGtm` y carga GTM tras `load` + `requestIdleCallback`, con fallback `setTimeout`.
- Verificación local:
  - `npm run build`: correcto.
  - `npm run test`: 16 tests.
  - `git diff --check`: correcto.
  - Lighthouse mobile local: Performance 98/97 y LCP 2,1 s en ambas pasadas.
  - QA navegador local de home y Tempranillo alemán sin errores de consola.

#### Decisiones

- Mantener Consent Mode temprano.
- Diferir GTM para proteger LCP y primer render.
- Mantener fallback `noscript`.
- No modificar todavía las etiquetas internas del contenedor GTM.
- Aceptar el tradeoff de medición: algunas etiquetas de marketing pueden activarse segundos más tarde.

#### Hipótesis

- Si terceros dentro de GTM influían en producción, el LCP debería mejorar o volverse menos variable tras el publish.
- Si no mejora, el siguiente bloque debe centrarse en hidratación/render del H1 y coste del entry inicial.

#### Tareas pendientes

- Hecho: pushear código y documentación.
- Pendiente: publicar desde Lovable.
- Revalidar producción con HTML, QA y 2-3 muestras Lighthouse.

### 2026-05-25: publish Lovable pendiente de confirmación

#### Hechos

- Producción sigue sirviendo deployment `94aea691-4fe9-4a08-84c0-135f46fa300f`, entry `/assets/index-BRCyx101.js` y el snippet antiguo de GTM.
- El navegador integrado de Codex no está disponible.
- Chrome tiene sesión Lovable activa en el proyecto `2c4eed0e-6760-45f0-aeb3-ce44de8e91f1`.
- El botón `Publish` está visible.
- La UI Lovable, tras recarga, no muestra explícitamente el commit `e164294`.

#### Decisiones

- Pedir confirmación antes de pulsar `Publish` porque es un cambio público de producción.
- No asumir que Lovable está sincronizado solo porque GitHub `main` está actualizado.

#### Hipótesis

- La UI de Lovable puede no mostrar todo el historial reciente.
- Si el publish no incorpora `e164294`, el siguiente paso será resolver sincronización GitHub/Lovable antes de seguir midiendo.

#### Tareas pendientes

- Confirmar publish.
- Revalidar producción después.

### 2026-05-25: GTM diferido validado en producción

#### Hechos

- El usuario confirmó publicar.
- Se ejecutó `Publish` + `Update` en Lovable.
- Lovable quedó `Up to date`.
- Producción sirve deployment `11e48c49-19d5-4d37-884c-d58b7de5387a`.
- Producción contiene `__winerimLoadGtm`, `requestIdleCallback`, Consent Mode previo y fallback `noscript`.
- Producción ya no contiene el snippet inmediato antiguo de GTM.
- QA producción de home móvil, home desktop y Tempranillo alemán sin errores de consola.
- Lighthouse mobile producción:
  - Run 1: Performance 89, LCP 2,7 s.
  - Run 2: Performance 89, LCP 2,6 s.
  - Run 3: Performance 93, LCP 2,5 s.
  - 0 recursos render-blocking.

#### Decisiones

- Cerrar el bloque GTM diferido.
- Mantener GTM diferido y Consent Mode temprano.
- Considerar suficientemente saneada la home para retomar biblioteca del vino, manteniendo monitorización de campo.

#### Hipótesis

- La mejora sintética indica que GTM/tags asociados estaban contribuyendo de forma material al LCP alto.
- Search Console no reflejará el cambio inmediatamente.

#### Tareas pendientes

- Monitorizar Core Web Vitals en Search Console.
- Retomar biblioteca del vino al máximo nivel o, si se prioriza rendimiento residual, auditar JS no usado.

### 2026-05-25: segunda tanda editorial de biblioteca del vino

#### Hechos

- Se amplió localmente la capa editorial avanzada de uvas prioritarias de 10 a 20 perfiles.
- Nuevas uvas prioritarias añadidas:
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
- `src/data/wineLibraryEditorial.ts` contiene los perfiles nuevos para la experiencia React.
- `supabase/functions/prerender/index.ts` contiene perfiles equivalentes para bots y crawlers.
- Las pruebas se actualizaron para cubrir la segunda tanda y la superficie SEO.
- Verificaciones completadas:
  - `npm run test -- --run`: 17 tests.
  - `npm run build`.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`.
  - `git diff --check`.
  - QA local en navegador de rutas ES, DE, PT y EN.

#### Decisiones

- Usar `xarello` como slug canónico en lugar de `xarel-lo`, porque el catálogo real usa `xarello`.
- Añadir `monastrell` y `touriga-nacional` en esta tanda para reforzar el eje ibérico y portugués.
- No añadir URLs nuevas; la ampliación aumenta profundidad editorial sobre rutas ya existentes.
- Mantener el patrón actual de perfiles editoriales antes de pasar a una estructura de contenido más granular por entidad.
- Mantener paridad frontend/prerender como criterio obligatorio de biblioteca del vino.

#### Hipótesis

- Esta tanda mejora la utilidad para restaurantes y la lectura semántica internacional sin aumentar riesgo de sitemap.
- La próxima ganancia fuerte vendrá de regiones/estilos/maridajes con enlaces internos cruzados y schema más rico.
- `xarello` puede necesitar alias visible/editorial para capturar búsquedas con grafías `Xarel-lo` y `Xarel·lo`, aunque el slug técnico siga siendo `xarello`.

#### Tareas pendientes

- Commit y push.
- Publicar desde Lovable.
- Revalidar producción con usuario real y Googlebot.
- Diseñar la siguiente tanda de regiones, estilos y maridajes prioritarios.

### 2026-05-25: segunda tanda editorial publicada en producción

#### Hechos

- Commit `d03625a feat: expand priority wine grape profiles` ya estaba pusheado a `origin/main`.
- El usuario confirmó continuar y se publicó desde Lovable.
- Producción pasó a frontend deployment `d80a4e7c-1f42-4cfe-8414-b247ae5ccd75`.
- Tras publicar frontend, producción como Googlebot seguía sirviendo fichas genéricas para Syrah y Xarello.
- Se detectó que el cambio pendiente era la Edge Function `prerender`, no Cloudflare Worker.
- Se pidió a Lovable desplegar explícitamente `prerender`.
- Lovable confirmó que `prerender` quedó desplegada.
- Producción como Googlebot quedó validada con contenido editorial enriquecido en:
  - `/biblioteca-vino/uvas/syrah`
  - `/de/weinbibliothek/rebsorten/syrah`
  - `/pt/biblioteca-vinho/castas/xarello`
  - `/en/wine-library/grapes/chenin-blanc`
- Producción como usuario real quedó validada en esas cuatro rutas sin errores de consola.

#### Decisiones

- Tratar `Publish` frontend y despliegue de `prerender` como dos pasos separados cuando haya cambios en `supabase/functions/prerender/index.ts`.
- No redeployar Cloudflare Worker si `x-worker-branch: bot-prerender` funciona y el problema está en contenido de Edge Function.
- Mantener la segunda tanda editorial como publicada y cerrada.

#### Hipótesis

- El contenido enriquecido ya queda disponible para indexación y lectura por LLM crawlers.
- El siguiente bloque debe aumentar la red semántica entre entidades, no solo añadir más perfiles aislados.

#### Tareas pendientes

- Abrir bloque de regiones, estilos y maridajes prioritarios.
- Añadir alias/variantes de grafía para entidades con búsqueda ambigua.
- Monitorizar Search Console tras recrawl.

### 2026-05-25: grafo estratégico de biblioteca del vino

#### Hechos

- Se implementó localmente el primer bloque de red temática entre entidades de biblioteca del vino.
- `src/data/wineLibraryLinks.ts` incorpora alias de alto valor para variantes de grafía y búsquedas semánticas:
  - `Xarel-lo`/`Xarel·lo` hacia `xarello`.
  - `Borgoña` hacia `bourgogne`.
  - `Burdeos` hacia `bordeaux`.
  - estilos y maridajes como `blanco con lías`, `espumoso método tradicional`, `rosado gastronómico`, `marisco`, `arroces` y `cocina asiática`.
- El resolver de enlaces ahora usa lookup separado por categoría para respetar hints y resolver correctamente entidades homónimas como `Champagne`.
- Se añadió un grafo estratégico para enlaces internos en fichas de uva, región, estilo y maridaje.
- El grafo se integró en React y en `supabase/functions/prerender/index.ts`.
- Se añadieron tests de alias, resolución por categoría y presencia del grafo estratégico en prerender.
- Verificaciones locales completadas: tests completos, build, `deno check`, `git diff --check` y QA navegador local.

#### Decisiones

- Resolver variantes mediante alias, no mediante rutas duplicadas.
- Mantener `xarello` como slug canónico.
- Separar el resolver por categoría para no perder precisión SEO cuando una palabra representa entidades distintas.
- Dar prioridad a enlaces internos por intención gastronómica/comercial antes de ampliar masivamente más URLs.
- Mantener paridad entre React y prerender para que usuarios, Googlebot y crawlers de IA vean la misma red esencial.

#### Hipótesis

- Los enlaces cruzados uva -> región -> estilo -> maridaje aumentarán la autoridad temática de la biblioteca.
- Los alias reducirán fricción SEO para búsquedas con grafías ambiguas sin generar canibalización.
- Este bloque debería mejorar rastreo y comprensión semántica cuando esté publicado y recrawleado.

#### Tareas pendientes

- Hecho: commit y push con `80895ac feat: connect wine library entities`.
- Publish frontend en Lovable.
- Deploy explícito de `prerender` en Lovable.
- Revalidación de producción como usuario real y Googlebot.

### 2026-05-25: grafo estratégico subido y validación de producción pendiente

#### Hechos

- El bloque de grafo estratégico se commiteó como `80895ac feat: connect wine library entities`.
- El commit `80895ac` se subió correctamente a `origin/main`.
- Lovable muestra el commit nuevo en la conversación del proyecto `Web Winerim`.
- La validación de producción como Googlebot muestra que `prerender` sigue sirviendo la versión anterior para el grafo estratégico:
  - Xarel-lo/Xarello conserva contenido editorial avanzado, pero sus enlaces relacionados en HTML siguen siendo hubs generales.
  - Espumoso y carnes rojas no devuelven todavía los enlaces estratégicos esperados.
- El intento de pulsar `Update` desde automatización no cambió el estado de Lovable.
- macOS solicitó permiso amplio para que Codex controle Finder durante esa automatización; no se concedió desde esta sesión.

#### Decisiones

- No marcar el grafo estratégico como publicado en producción hasta que `prerender` devuelva los enlaces internos nuevos.
- Mantener como siguiente acción operativa publicar desde Lovable y pedir despliegue explícito de la Edge Function `prerender`.
- No tocar Cloudflare Worker para este bloque mientras `x-worker-branch: bot-prerender` siga activo y el problema sea contenido no actualizado.

#### Hipótesis

- Lovable aún no ha aplicado el commit `80895ac` al frontend/Edge Function de producción.
- El deploy explícito de `prerender` debería resolver la diferencia entre GitHub/local y producción sin cambios adicionales de código.

#### Tareas pendientes

- Hecho: publicar `80895ac` desde Lovable.
- Hecho: desplegar Edge Function `prerender` desde Lovable.
- Hecho: revalidar Googlebot y usuario real en uva, región, estilo y maridaje antes de cerrar el bloque.

### 2026-05-25: grafo estratégico publicado y validado

#### Hechos

- Supabase CLI no pudo desplegar `prerender` por falta de `SUPABASE_ACCESS_TOKEN`.
- Se usó Lovable como vía operativa de despliegue, según el patrón documentado del proyecto.
- Lovable desplegó explícitamente la Edge Function `prerender`.
- Se ejecutó `Update` en Lovable y el panel quedó `Up to date`.
- Producción para Googlebot quedó validada:
  - Xarel-lo enlaza a Penedes, Cava, espumoso, marisco y arroces.
  - Champagne enlaza a Chardonnay, Pinot Noir, espumoso, marisco y quesos.
  - Espumoso enlaza a Champagne como región, Cava como estilo, Chardonnay, Xarel-lo y marisco.
  - Carnes rojas enlaza a Tempranillo, Syrah, Cabernet Sauvignon, Rioja y tinto reserva.
- Producción para usuario real quedó validada en Chrome headless en Xarel-lo con el asset `/assets/index-DAMK02nf.js` y los enlaces estratégicos esperados.

#### Decisiones

- Cerrar el bloque de grafo estratégico como publicado.
- Mantener Lovable como vía de despliegue para Edge Functions mientras no exista `SUPABASE_ACCESS_TOKEN`.
- No desplegar Cloudflare Worker porque la rama `bot-prerender` funciona y sirve el HTML actualizado.
- Seguir validando por separado HTML de bots y DOM de usuario real cuando se modifique biblioteca del vino.

#### Hipótesis

- El bloque ya está disponible para Googlebot y crawlers de IA.
- Search Console no mostrará efecto inmediato; el resultado dependerá del recrawl.

#### Tareas pendientes

- Abrir bloque de contenido profundo para regiones, estilos y maridajes.
- Evaluar schema semántico adicional por entidad.
- Monitorizar Search Console para cambios de cobertura e impresiones de biblioteca.

## 2026-05-26

### Primera tanda profunda de regiones prioritarias

#### Hechos

- Se inició el bloque editorial profundo de regiones tras quedar publicado y validado el grafo estratégico de biblioteca del vino.
- Se creó `src/data/wineLibraryRegionEditorial.ts` con 10 regiones prioritarias:
  - Rioja;
  - Ribera del Duero;
  - Rías Baixas;
  - Rueda;
  - Priorat;
  - Borgoña/Bourgogne;
  - Burdeos/Bordeaux;
  - Champagne;
  - Douro;
  - Vinho Verde.
- Cada perfil regional incluye servicio, copa, uso por copa, rol en carta, guion de sala, palanca comercial, error a evitar, maridajes y FAQs.
- Los perfiles están localizados para `es`, `en`, `it`, `fr`, `de` y `pt`.
- `RegionDetail` integra el bloque regional y localiza etiquetas principales de la página.
- `regionsLibraryI18n` genera fallbacks profundos localizados para secciones de región que antes quedaban en español en rutas internacionales.
- `prerender` incorpora perfiles regionales equivalentes para que bots reciban la misma capa esencial.
- Se añadieron tests de perfiles regionales, render humano, i18n regional y superficie SEO de prerender.
- Verificaciones locales completadas:
  - `npm run test -- --run`: 25 tests.
  - `npm run build`.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`.
  - `git diff --check`.

#### Decisiones

- La primera ampliación profunda post-grafo se centra en regiones, no en otra tanda de uvas.
- Las regiones prioritarias se enriquecen sin crear nuevas URLs para evitar más deuda de indexación.
- Las páginas regionales internacionales deben evitar narrativa española heredada; se aplican fallbacks localizados cuando no hay traducción humana específica.
- `prerender` debe mantener perfiles regionales propios, aunque duplique una versión reducida del contenido React, porque es la fuente que leen Googlebot y LLM crawlers.
- No modificar Cloudflare Worker mientras el cambio sea de frontend y Edge Function `prerender`.

#### Hipótesis

- Las regiones aportan una señal SEO más amplia que entidades aisladas porque conectan intención geográfica con uvas, estilos y maridajes.
- Los fallbacks localizados reducen fricción internacional mientras se escriben versiones editoriales humanas más profundas por región.
- La mejora será medible solo tras publicación en Lovable, despliegue de `prerender` y recrawl.

#### Tareas pendientes

- Commit y push del bloque.
- Publicar frontend desde Lovable.
- Desplegar explícitamente `prerender` desde Lovable.
- Validar producción como usuario real y Googlebot.
- Continuar con estilos y maridajes prioritarios.

### Primera tanda profunda de regiones publicada

#### Hechos

- Commit `6f6dcd8 feat: deepen priority wine regions` creado y pusheado a `origin/main`.
- Lovable publicó el frontend y quedó `Up to date`.
- Lovable desplegó explícitamente la Edge Function `prerender`.
- Producción validada como Googlebot en:
  - `/biblioteca-vino/regiones/espana/rioja`;
  - `/de/weinbibliothek/regionen/francia/champagne`;
  - `/pt/biblioteca-vinho/regioes/portugal/vinho-verde`;
  - `/en/wine-library/regions/espana/rioja`.
- Las cuatro rutas respondieron con `x-prerendered: true` y `x-worker-branch: bot-prerender`.
- Producción validada como usuario real con Chrome headless controlado por timeout en:
  - `/pt/biblioteca-vinho/regioes/portugal/vinho-verde`;
  - `/de/weinbibliothek/regionen/francia/champagne`.
- Se detectó y corrigió una contradicción documental: las rutas localizadas de regiones conservan el slug de país fuente (`espana`, `francia`, `portugal`) y no usan `/spain/` como slug canónico.

#### Decisiones

- Cerrar el bloque regional como publicado y validado.
- No desplegar Cloudflare Worker para este bloque.
- Mantener slugs fuente de país en rutas localizadas por ahora; cualquier traducción de slugs debe tratarse como migración SEO separada.

#### Hipótesis

- La capa regional publicada reforzará la comprensión temática de biblioteca del vino tras recrawl.
- El siguiente bloque natural es estilos prioritarios, porque el grafo ya conecta regiones con estilos y maridajes.

#### Tareas pendientes

- Abrir bloque de estilos prioritarios.
- Monitorizar Search Console para recrawl de rutas de biblioteca enriquecidas.

### Primera tanda profunda de estilos prioritarios

#### Hechos

- Se inició la ampliación profunda de estilos tras publicar y validar la tanda regional.
- Commit `7198d3a feat: deepen priority wine styles` creado y pusheado a `origin/main`.
- Se creó `src/data/wineLibraryStyleEditorial.ts` con 5 estilos prioritarios:
  - tinto crianza;
  - tinto reserva;
  - blanco crianza sobre lías;
  - espumoso;
  - rosado gastronómico.
- Cada perfil de estilo incluye temperatura de servicio, copa, uso por copa, rol en carta, guion de sala, palanca comercial, error a evitar, maridajes de carta y FAQs.
- Los perfiles están localizados para `es`, `en`, `it`, `fr`, `de` y `pt`.
- `StyleDetail` integra el bloque editorial, etiquetas localizadas y FAQs de la capa de estilo.
- `stylesLibraryI18n` añade nombres localizados y fallbacks profundos para que las fichas internacionales de estilos no dependan de narrativa española.
- `stylesLibrary` añade una ficha completa para `blanco-crianza-lias`, que antes existía solo como subtipo.
- `prerender` incorpora perfiles equivalentes para que bots reciban la misma capa esencial de estilos.
- Se corrigió el idioma del widget de chat en `index.html` para respetar el idioma detectado por ruta.
- Tras el push se intentó continuar con Lovable, pero la pestaña accesible estaba en login.
- Se comprobó que `SUPABASE_ACCESS_TOKEN` sigue ausente, así que el despliegue CLI de `prerender` continúa bloqueado.
- Verificaciones locales completadas:
  - `npm run test -- --run`: 29 tests.
  - `npm run build`.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`.
  - `git diff --check`.
  - Browser QA local en alemán para `espumoso`.
  - Browser QA local en portugués para `blanco-crianza-lias`.

#### Decisiones

- Cerrar la tanda local de estilos como implementada y verificada antes de abrir maridajes.
- Empezar estilos por 5 nodos con alta utilidad comercial y buena conexión con el grafo ya publicado.
- Convertir `blanco-crianza-lias` en ficha completa porque faltaba profundidad para un estilo prioritario.
- Mantener duplicación reducida en `prerender` para preservar calidad de lectura por Googlebot y crawlers de IA.
- Considerar el idioma del widget de chat parte de la experiencia localizada y corregirlo dentro de este bloque.
- No desplegar Cloudflare Worker salvo que producción muestre fallo de proxy o caída a `bot-fallback`.
- No considerar publicado este bloque hasta que Lovable aplique el frontend y despliegue explícitamente `prerender`.

#### Hipótesis

- La capa de estilos reforzará búsquedas de servicio, venta por copa, maridaje y carta de vinos.
- La calidad internacional mejora al eliminar fugas de español en rutas `de` y `pt`.
- El efecto SEO/LLM depende de publicar Lovable, desplegar `prerender` y validar producción.

#### Tareas pendientes

- Publicar frontend desde Lovable.
- Desplegar explícitamente `prerender` desde Lovable.
- Validar producción como usuario real y Googlebot.
- Continuar con maridajes prioritarios y schema semántico.

### Primera tanda profunda de maridajes prioritarios y schema semántico

#### Hechos

- Se implementó localmente la primera tanda profunda de maridajes prioritarios.
- Commit creado y pusheado a `origin/main`: `fe4d10b feat: deepen priority wine pairings`.
- Se creó `src/data/wineLibraryPairingEditorial.ts` con 6 nodos:
  - carnes rojas;
  - pescado blanco mediante `lubina-dorada`;
  - marisco mediante `pescados-y-mariscos`;
  - arroces mediante `pasta-arroces-y-legumbres`;
  - cocina asiática y fusión;
  - quesos.
- Cada perfil de maridaje incluye momento, copa, vinos base, rol, guion de sala, palanca comercial, error a evitar, upsell, platos clave y FAQs.
- Los perfiles están localizados para `es`, `en`, `it`, `fr`, `de` y `pt`.
- `PairingDetail` integra el bloque editorial, etiquetas localizadas, CTA localizado, FAQs combinadas y schema `DefinedTerm`.
- `pairingsLibraryI18n` añade fallbacks profundos para narrativa internacional de maridajes y localiza términos de estilos dentro de textos.
- `prerender` incorpora perfiles equivalentes para los 6 maridajes prioritarios.
- `GrapeDetail`, `RegionDetail`, `StyleDetail` y `PairingDetail` quedan alineados con JSON-LD `@graph` de `Article` + `DefinedTerm`.
- Verificaciones locales completadas:
  - `npx tsc --noEmit --pretty false`.
  - `npm run test -- --run`: 33 tests.
  - `npm run build`.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`.
  - `git diff --check`.
  - Browser QA local en maridaje alemán de cocina asiática.
  - Browser QA local en maridaje portugués de pescado blanco.

#### Decisiones

- Avanzar localmente con maridajes pese al bloqueo de Lovable, dejando claro que producción no está cerrada.
- Usar los slugs existentes para intención SEO: `lubina-dorada` como pescado blanco y `pescados-y-mariscos` como marisco.
- No crear nuevas URLs en esta tanda para evitar deuda de sitemap/canonical.
- Añadir `DefinedTerm` a todas las familias de detalle de biblioteca como schema semántico base.
- Mantener el despliegue de Edge Function `prerender` como requisito para considerar cerrado el bloque frente a bots.
- No desplegar Cloudflare Worker salvo que producción muestre fallo de proxy.

#### Hipótesis

- Maridajes completan el triángulo editorial principal de la biblioteca: entidad vinícola, estilo y uso gastronómico.
- `DefinedTerm` ayudará a crawlers y LLMs a entender las fichas como conceptos definidos dentro de la biblioteca Winerim.
- La siguiente mejora de impacto real será publicar, validar producción y resolver legacy shortcuts, más que seguir moviendo arquitectura local.

#### Tareas pendientes

- Publicar frontend desde Lovable.
- Desplegar explícitamente `prerender` desde Lovable.
- Validar producción como usuario real y Googlebot.
- Resolver legacy shortcuts de biblioteca y decidir siguiente expansión masiva de entidades.

### Estilos y maridajes validados en producción

#### Hechos

- El usuario confirmó que todo estaba desplegado y publicado en producción.
- Se revalidó producción como Googlebot con cache-bust.
- Las rutas de estilos y maridajes pendientes responden HTTP 200 con `x-prerendered: true` y `x-worker-branch: bot-prerender`.
- El prerender productivo contiene la capa esencial de estilos y maridajes: rol, servicio, argumento de sala, platos/maridajes, error a evitar, `Article` y un solo `FAQPage`.
- Se validó producción como usuario real en navegador para alemán y portugués en estilos y maridajes.
- El frontend humano muestra los bloques avanzados, `DefinedTerm` y un solo `FAQPage`.

#### Decisiones

- Cerrar la primera tanda profunda de estilos y maridajes como publicada y validada en producción.
- Dar por cerrado el bloque principal actual de biblioteca del vino.
- Mantener la mejora de H1/títulos del prerender como refinamiento futuro, no como bloqueo.
- Continuar con legacy shortcuts, expansión de entidades y monitorización Search Console.

#### Hipótesis

- Googlebot y crawlers de IA ya pueden leer la capa profunda esencial de estilos y maridajes.
- Search Console tardará varios días en reflejar recrawl y cambios de cobertura.
- La siguiente mejora con impacto será reducir canibalización/duplicación legacy y ampliar entidades con criterio SEO.

#### Tareas pendientes

- Hecho después: resolver legacy shortcuts de biblioteca.
- Monitorizar Search Console.
- Planificar siguiente expansión editorial masiva.

### Legacy shortcuts de biblioteca resueltos en producción

#### Hechos

- Se implementó el mapa de 16 shortcuts legacy de biblioteca del vino por idioma, cubriendo 96 URLs.
- Se añadieron redirects canónicos en `cloudflare-worker-v3-hybrid.js`.
- Se añadió defensa secundaria en React mediante `src/data/wineLibraryLegacyRedirects.ts` y `BibliotecaDetalle`.
- Se añadieron tests para matriz de redirects y presencia de lógica Worker.
- Verificaciones completadas: tests dirigidos, TypeScript, full test, build, dry-run Worker y `git diff --check`.
- Commit y push completados: `d37044e fix: redirect legacy wine library shortcuts`.
- Worker desplegado en producción con Version ID `c4d375bb-5280-41fe-b793-549be14f17c4`.
- Matriz productiva validada: 96 redirects comprobados, 0 fallos.

#### Decisiones

- Usar 301 permanentes hacia rutas canónicas de entidad en vez de crear contenido/metadatos únicos para shortcuts antiguos.
- Hacer la redirección en Worker para que Googlebot, crawlers de IA y usuarios reciban la canonicalización antes de cargar React.
- Mantener la redirección React como capa secundaria, aunque el cierre SEO dependa del Worker.
- No crear nuevas URLs ni nuevos slugs para resolver este bloque.

#### Hipótesis

- Esta corrección debería consolidar autoridad de shortcuts antiguos hacia las rutas nuevas y reducir duplicación de títulos/H1 genéricos.
- Search Console tardará en reflejar la mejora y puede mantener temporalmente ejemplos antiguos en cobertura.

#### Tareas pendientes

- Monitorizar Search Console para confirmar consolidación de legacy shortcuts.
- Publicar bundle React desde Lovable en el siguiente ciclo general.
- Pasar a expansión editorial masiva y enlazado interno de biblioteca.

### Expansión editorial masiva local de biblioteca

#### Hechos

- Se implementó una segunda ola editorial local para ampliar biblioteca del vino sin crear nuevas rutas.
- Se añadió `src/data/wineLibraryEditorialExpansion.ts` como capa reutilizable de perfiles localizados.
- La cobertura local queda en:
  - 30 uvas prioritarias;
  - 22 regiones prioritarias;
  - 15 estilos prioritarios;
  - 18 maridajes/platos prioritarios.
- La nueva ola añade 10 uvas internacionales, 12 regiones, 10 estilos y 12 maridajes/platos concretos.
- `prerender` se amplió con perfiles compactos equivalentes para bots.
- Se corrigió el sitemap para excluir los 16 shortcuts legacy españoles que ya redirigen por Worker.
- Verificaciones locales completadas: TypeScript, tests dirigidos, full test, build, Deno check, `git diff --check` y QA local de rutas `de`, `pt` y `fr`.
- Commit y push completados: `78135cd feat: expand wine library editorial coverage`.
- Producción todavía no refleja el `sitemap` actualizado: el sitemap público sigue listando shortcuts legacy como `/biblioteca-vino/tempranillo` y `/biblioteca-vino/napa-valley`.
- Lovable redirige a login y no existe `SUPABASE_ACCESS_TOKEN` local, por lo que el despliegue productivo queda pendiente.

#### Decisiones

- Usar perfiles arquetípicos localizados como segunda ola editorial cuando no exista perfil manual profundo.
- Mantener prioridad editorial manual para entidades principales y usar la nueva capa como expansión consistente.
- No crear URLs nuevas en esta tanda; la mejora debe enriquecer rutas canónicas existentes.
- Excluir del sitemap cualquier shortcut legacy que ya sea 301, empezando por los 16 shortcuts españoles fuente.
- Mantener Cloudflare Worker sin cambios en esta tanda.

#### Hipótesis

- Esta expansión aumenta cobertura semántica y utilidad práctica sin aumentar deuda de routing.
- Los crawlers de IA y Googlebot se beneficiarán solo después de publicar Lovable y desplegar `sitemap`/`prerender`.
- La limpieza del sitemap ayuda a consolidar señales de redirects legacy.

#### Tareas pendientes

- Hecho: commit y push de la expansión.
- Publicar frontend desde Lovable.
- Desplegar `sitemap` y `prerender` desde Lovable.
- Revalidar producción como usuario real y Googlebot.
- Monitorizar Search Console tras recrawl.

### Producción validada y sitemap de expansión completado

#### Hechos

- Producción ya sirve la capa de expansión en rutas representativas como Googlebot:
  - Fino/Manzanilla en alemán;
  - Ostras en portugués;
  - Sancerre en francés.
- Producción también se validó como usuario real para esas tres rutas: sin 404, canonical correcto y sin errores de consola.
- El sitemap público ya no contiene shortcuts legacy españoles como `<loc>`.
- Se detectó que algunas entidades expandidas no estaban aún en `WINE_LIBRARY_DYNAMIC_ROUTES`.
- Se añadió la cobertura faltante de sitemap para regiones y maridajes/platos concretos de la expansión.
- Commit y push completados: `9f99fa7 fix: include expanded wine entities in sitemap`.
- Validaciones locales del ajuste final: tests dirigidos, full test, build, Deno check y `git diff --check`.

#### Decisiones

- Cerrar como validada la parte de contenido/prerender ya publicada.
- Dejar el sitemap como pendiente de publicación final hasta que Lovable despliegue `9f99fa7`.
- No tocar Worker porque la ruta `bot-prerender` y los redirects legacy siguen funcionando.

#### Hipótesis

- La última mejora de sitemap aumentará descubrimiento de platos concretos y regiones nuevas una vez desplegada.
- Search Console reflejará primero la limpieza de shortcuts y después la ampliación de rutas cuando recrawlee el sitemap.

#### Tareas pendientes

- Publicar `9f99fa7` desde Lovable.
- Desplegar Edge Function `sitemap`.
- Revalidar sitemap público y reenviarlo en Search Console.

### Sitemap de expansión validado en producción

#### Hechos

- El usuario confirmó la publicación del último despliegue.
- El sitemap público ya contiene las rutas de expansión añadidas en `9f99fa7`, incluyendo `ostras`, `solomillo-de-ternera`, `sancerre`, `mendoza`, `mosel`, `willamette-valley` y `barolo`.
- El sitemap público mantiene fuera los shortcuts legacy españoles.
- Googlebot validado en nuevas entidades de expansión:
  - `ostras` en portugués;
  - `mencia` en alemán.
- Ambas rutas responden con `x-prerendered: true` y `x-worker-branch: bot-prerender`.

#### Decisiones

- Cerrar la expansión editorial masiva como publicada y validada en producción.
- No hacer más cambios de Worker para este bloque.
- Pasar a Search Console y monitorización antes de abrir otra ola editorial.

#### Hipótesis

- El sitemap completo debería mejorar descubrimiento de entidades long-tail de biblioteca.
- El impacto SEO se verá tras recrawl, no inmediatamente.

#### Tareas pendientes

- Reenviar o validar `/sitemap.xml` en Search Console.
- Monitorizar cobertura e impresiones de biblioteca.
- Usar datos reales de Search Console para priorizar la siguiente expansión.

### Sitemap reenviado en Search Console

#### Hechos

- Se reenvió `/sitemap.xml` en Search Console para la propiedad `https://winerim.wine/`.
- La UI confirmó: `Se ha enviado el sitemap correctamente`.
- La fila quedó con `Enviado: 26 may 2026`, `Última lectura: 24 may 2026`, `Estado: Correcto` y `2.072` páginas descubiertas.

#### Decisiones

- No solicitar indexación masiva inmediatamente.
- Esperar nueva lectura del sitemap antes de abrir otra expansión grande.

#### Hipótesis

- Google procesará el sitemap nuevo más adelante y actualizará cobertura/descubrimiento después.

#### Tareas pendientes

- Comprobar nueva fecha de última lectura en Search Console.
- Inspeccionar una tanda corta de URLs estratégicas si la UI lo permite.

### Search Console tras nueva lectura de sitemap

#### Hechos

- Al retomar se leyeron los cuatro documentos fuente de verdad del proyecto.
- `/sitemap.xml` aparece en Search Console con nueva `Última lectura: 26 may 2026`.
- `/sitemap.xml` aparece como `Correcto` y con `2.054` páginas descubiertas.
- `/sitemap_index.xml` sigue enviado desde `22 dic 2022`, con última lectura `18 may 2026`, estado `Correcto` y `1.358` páginas descubiertas.
- Se inspeccionaron tres URLs estratégicas de la expansión:
  - `/biblioteca-vino/maridajes/ostras`;
  - `/biblioteca-vino/regiones/francia/sancerre`;
  - `/de/weinbibliothek/rebsorten/mencia`.
- Search Console indica que las tres URLs no están en Google.
- `sancerre` y `mencia` aparecen como `Descubierta: actualmente sin indexar`.
- `ostras` aparece como URL no reconocida por Google.
- La prueba en vivo de las tres URLs indica que están disponibles para Google y se pueden indexar.
- No se solicitó indexación manual.

#### Decisiones

- No solicitar indexación manual sin confirmación explícita justo antes de ejecutar la acción.
- No solicitar indexación masiva.
- Considerar aceptable solicitar indexación manual solo para la tanda corta estratégica si el usuario lo confirma.
- Mantener la siguiente ola editorial bloqueada hasta tener señales de Search Console sobre descubrimiento, indexación, impresiones y consultas.

#### Hipótesis

- El problema actual es cola de descubrimiento/indexación, no disponibilidad técnica ni bloqueo de robots.
- Las URLs nuevas deberían ir apareciendo en cobertura conforme Google procese el sitemap ya leído.
- `ostras` puede necesitar solicitud manual de indexación antes que `sancerre` y `mencia`, porque aún figura como no reconocida.

#### Tareas pendientes

- Pedir confirmación explícita al usuario si se va a pulsar `Solicitar indexación`.
- Si se confirma, solicitar indexación de la tanda corta:
  - `/biblioteca-vino/maridajes/ostras`;
  - `/biblioteca-vino/regiones/francia/sancerre`;
  - `/de/weinbibliothek/rebsorten/mencia`.
- Monitorizar si la cobertura cambia tras la solicitud o tras recrawl natural.

### Solicitud manual de indexación de tanda corta

#### Hechos

- El usuario respondió afirmativamente a la solicitud de confirmación para pedir indexación manual.
- Se pidió indexación manual en Search Console para:
  - `/de/weinbibliothek/rebsorten/mencia`;
  - `/biblioteca-vino/regiones/francia/sancerre`;
  - `/biblioteca-vino/maridajes/ostras`.
- Las tres URLs recibieron confirmación de Search Console:
  - `Se ha solicitado la indexación`.
- Search Console indicó que las URLs se añadieron a una cola de rastreo prioritaria.

#### Decisiones

- Limitar la acción manual a tres URLs estratégicas.
- No convertir la solicitud manual de indexación en una práctica masiva para toda la biblioteca.
- Usar el resultado de esta tanda como señal antes de priorizar otra ola editorial o más solicitudes.

#### Hipótesis

- La solicitud puede adelantar el rastreo de URLs nuevas de biblioteca, especialmente `ostras`.
- La indexación final dependerá de señales de calidad, enlaces internos, canónica elegida por Google y demanda.

#### Tareas pendientes

- Revisar el estado de las tres URLs en Search Console tras el siguiente intervalo de recrawl.
- Si quedan sin indexar, analizar motivo específico antes de pedir más indexaciones manuales.

### Saneamiento adicional de ejemplos 404

#### Hechos

- Se revisó el informe `Páginas` de Search Console.
- Search Console muestra 67 páginas indexadas y el bloque principal no indexado como `Descubierta: actualmente sin indexar` con 1.758 URLs.
- El grupo `No se ha encontrado (404)` muestra 197 URLs.
- Se inspeccionaron ejemplos visibles del grupo 404.
- Dos ejemplos visibles seguían activos como 404 en producción antes de la corrección:
  - `/corso-vino-cata-mw-examen-practico`;
  - `/winerim-sommelier-magazine/`.
- Se añadió redirect directo en Worker:
  - `/corso-vino-cata-mw-examen-practico` -> `/decision-center/cursos`;
  - `/winerim-sommelier-magazine` -> `/sommelier-corner`.
- Se ejecutó `npm run deploy:worker:dry-run` correctamente.
- Se desplegó Cloudflare Worker `winerim-proxy` con Version ID `b32cd9a2-63fe-40d5-97a4-5087a179f0b6`.
- Los 10 ejemplos visibles del grupo 404 revisados acaban en HTTP 200 tras redirects.
- `/sitemap_index.xml` redirige en producción a `/sitemap.xml`, pero sigue enviado en Search Console y puede quitarse desde el menú.

#### Decisiones

- Corregir por ahora solo redirects de equivalencia clara, no convertir todas las URLs 404 en redirecciones genéricas.
- No quitar `/sitemap_index.xml` desde Search Console sin confirmación explícita.
- No pedir validación del grupo 404 hasta revisar más ejemplos o confirmar que el conjunto restante está suficientemente cubierto.

#### Hipótesis

- Los ejemplos 404 visibles deberían salir del grupo cuando Google los recrawlee.
- Puede haber más URLs 404 ocultas en el grupo que requieran redirects adicionales o 410 si no tienen equivalente útil.

#### Tareas pendientes

- Seguir revisando ejemplos del grupo 404.
- Decidir si quitar `/sitemap_index.xml` de Search Console.
- Decidir cuándo iniciar validación del grupo 404.

## 2026-06-01

### Hechos

- Se retomó el trabajo leyendo los cuatro documentos fuente de verdad del proyecto.
- Se revisó Search Console para `https://winerim.wine/`.
- `/sitemap.xml` aparece correcto, con última lectura `30 may 2026` y `2.054` páginas descubiertas.
- `/sitemap_index.xml` sigue enviado, aparece correcto, con última lectura `28 may 2026` y también `2.054` páginas descubiertas.
- El informe `Páginas` muestra 102 indexadas y 2.331 sin indexar, con actualización `29/5/26`.
- Las tres URLs estratégicas de biblioteca del vino inspeccionadas el 2026-05-27 ya aparecen indexadas:
  - `/de/weinbibliothek/rebsorten/mencia`;
  - `/biblioteca-vino/regiones/francia/sancerre`;
  - `/biblioteca-vino/maridajes/ostras`.
- Search Console confirma para las tres URLs canónica inspeccionada, rastreo correcto, indexación permitida, HTTPS válido, breadcrumbs válidos y FAQ válido.
- Se amplió la tabla de ejemplos del grupo `No se ha encontrado (404)` a 100 filas.
- En esos 100 ejemplos, siguiendo redirecciones completas, 47 acaban en 200, 51 en 404 y 2 en 410.
- Se añadieron cambios locales al Worker para:
  - normalizar rutas mal formadas `/https:/winerim.wine/...`;
  - redirigir legacy de alta confianza hacia URLs canónicas existentes.
- `npm run deploy:worker:dry-run` y `git diff --check` pasan.
- El despliegue real de Worker falló por Cloudflare `Authentication error [code: 10000]`.

### Decisiones

- Considerar la tanda corta de indexación manual como validación positiva de la salud técnica de la biblioteca del vino.
- No continuar con solicitudes manuales masivas de indexación.
- No retirar `/sitemap_index.xml` sin confirmación explícita, aunque ya no sea necesario técnicamente.
- No iniciar validación de corrección 404 hasta que los redirects pendientes estén desplegados y verificados en producción.
- Añadir redirects solo si hay equivalente semántico claro o normalización técnica inequívoca.
- Tratar el fallo de Cloudflare como bloqueo operativo externo, no como fallo del código.

### Hipótesis

- Google empezó a aceptar las páginas nuevas de biblioteca porque reciben HTML rastreable, canonical correcto, FAQ y breadcrumbs coherentes.
- Las URLs nuevas que aún estén descubiertas sin indexar necesitarán más enlazado interno y señales de calidad, no más solicitudes manuales indiscriminadas.
- Los 404 legacy visibles son una mezcla de URLs ya corregidas pero no recrawleadas, URLs mal formadas y contenido antiguo sin equivalente exacto.
- El siguiente despliegue de Worker debería reducir una parte relevante del grupo 404 tras recrawl.

### Tareas pendientes

- Renovar autenticación Cloudflare o usar un `CLOUDFLARE_API_TOKEN` válido.
- Desplegar el Worker con los redirects añadidos.
- Validar producción con ejemplos concretos de Search Console.
- Recalcular la muestra de 100 URLs tras deploy.
- Pedir confirmación antes de retirar `/sitemap_index.xml`.
- Pedir confirmación antes de iniciar `Validar corrección` para 404.

### Despliegue Worker completado

#### Hechos

- Se renovó la autenticación de Wrangler con OAuth Cloudflare usando `gugocreative@gmail.com`.
- Durante el login se rechazó instalar Cloudflare skills.
- Se usó Node `v24.14.0` del runtime de workspace para ejecutar `wrangler@4.95.0`, porque Wrangler 4 no soporta Node 20.
- Se desplegó Cloudflare Worker `winerim-proxy`.
- Version ID desplegada: `fda7c63b-ae88-4e3f-98c4-9d48ee39edc2`.
- Producción validada en ejemplos de URLs mal formadas, CTAs antiguos, artículos legacy y carta digital.
- Tras el deploy, la muestra de 100 ejemplos visibles de 404 queda:
  - 95 terminan en 200.
  - 3 terminan en 404.
  - 2 terminan en 410.
- `npm run deploy:worker:dry-run` funciona con la sesión renovada.

#### Decisiones

- No añadir redirects dudosos para `/los-mejores-restaurantes-de-cataluna-para-disfrutar-del-vino/`, `/kit-digital/` ni `/facturacion-y-contratos/` sin una equivalencia clara.
- No iniciar validación 404 en Search Console dentro de esta sesión.
- No retirar `/sitemap_index.xml` dentro de esta sesión.
- Tratar el bloque de redirects como desplegado y validado en producción.

#### Hipótesis

- Search Console debería reducir el grupo 404 cuando recrawlee los ejemplos ya saneados.
- Puede quedar una cola residual de 404 si Google prueba URLs antiguas fuera de la muestra visible.

#### Tareas pendientes

- Monitorizar el grupo 404 tras recrawl.
- Revisar más ejemplos si el grupo no baja.
- Decidir explícitamente qué hacer con los 3 404 restantes de la muestra.
- Pedir confirmación antes de `Validar corrección` 404 o retirar `/sitemap_index.xml`.

### Enlazado interno estratégico de hubs de biblioteca

#### Hechos

- Se revisó el código de detalle de uvas, regiones, estilos y maridajes.
- Las fichas detalle ya incorporan relaciones internas mediante `RelatedWineLibraryLinks`.
- Se añadió un componente específico para hubs: `StrategicWineLibraryRoutes`.
- El componente se integró en la home de biblioteca y en los hubs de uvas, regiones, estilos y maridajes.
- Las rutas se resuelven con `getWineLibraryPath` y fuentes localizadas, incluyendo `de` y `pt`.
- Verificaciones locales correctas:
  - `npm run test`;
  - `npm run build`;
  - `git diff --check`;
  - ESLint limitado a archivos tocados.
- El lint completo del repo sigue fallando por deuda previa no relacionada.

#### Decisiones

- Priorizar enlaces desde hubs hacia entidades estratégicas antes de abrir otra expansión editorial masiva.
- Usar grupos editoriales curados de 4 rutas por bloque para mantener relevancia y control semántico.
- Mostrar el bloque solo en la vista inicial de hubs cuando no hay búsqueda o filtros activos.
- No usar indexación manual para este bloque; primero desplegar, validar producción y monitorizar.

#### Hipótesis

- Los hubs deberían transmitir más contexto y autoridad a entidades prioritarias de biblioteca.
- La mejora puede ayudar a que Google pase de descubrimiento a rastreo/indexación en más URLs nuevas.
- Los datos de Search Console tras recrawl serán la mejor señal para decidir la siguiente ampliación.

#### Tareas pendientes

- Hecho en cierre posterior del 2026-06-01: frontend publicado desde Lovable.
- Hecho en cierre posterior del 2026-06-01: producción y prerender/HTML de rutas principales validados.
- Revisar Search Console tras recrawl antes de decidir nuevas solicitudes manuales o más expansión editorial.

## 2026-06-01

### Prerender de rutas estratégicas de biblioteca

#### Hechos

- Se comprobó que el commit frontend `6bb3180` ya estaba publicado en producción para usuarios humanos.
- El bundle productivo contenía `StrategicWineLibraryRoutes` con rutas estratégicas para `es`, `en`, `it`, `fr`, `de` y `pt`.
- Googlebot seguía recibiendo HTML prerenderizado sin esas rutas en `/biblioteca-vino` y hubs principales.
- Se implementó la paridad en `supabase/functions/prerender/index.ts`.
- Se creó y pusheó el commit `0c44042 fix: mirror wine library hub links in prerender`.
- Lovable desplegó la Edge Function `prerender`.
- Producción quedó validada como Googlebot con `bot-prerender`, canonical propio y enlaces estratégicos en home/hubs de biblioteca y rutas localizadas probadas.

#### Decisiones

- La biblioteca del vino no se da por cerrada para SEO si la experiencia humana y el prerender para bots no tienen el mismo grafo interno prioritario.
- El prerender debe incluir rutas estratégicas de hubs, no solo enlaces estratégicos de páginas de detalle.
- Para esta corrección se mantiene la duplicación explícita de datos entre frontend y Edge Function porque era el camino más rápido y seguro para producción.
- La extracción a una fuente compartida queda como mejora posterior, no como bloqueo del despliegue.

#### Hipótesis

- Este ajuste aumentará la capacidad de rastreo de URLs prioritarias de uvas, regiones, estilos y maridajes.
- La mejora puede ayudar también a crawlers de IA porque reduce la dependencia del JavaScript cliente para entender el grafo de la biblioteca.
- Search Console puede tardar días o semanas en reflejar cambios en cobertura y enlaces internos.

#### Tareas pendientes

- Monitorizar Search Console para hubs de biblioteca y entidades prioritarias.
- Definir una fuente única para rutas estratégicas si vuelve a crecer la matriz.
- Continuar con schema y profundidad editorial de entidades para llevar la biblioteca al máximo nivel.

### Cluster de blog para biblioteca del vino

#### Hechos

- Se auditó cómo funciona el blog: Supabase `articles` es la fuente principal y `src/data/articles.ts` actúa como fallback.
- Se confirmó que el prerender de artículos lee desde Supabase, pero antes no convertía `related_links` ni enlaces markdown del cuerpo en enlaces internos HTML completos.
- Se mejoró el enlazado interno de artículos en frontend y prerender.
- Se creó la migración `supabase/migrations/20260601093000_add_wine_library_blog_cluster.sql`.
- Se publicaron 3 artículos españoles:
  - `biblioteca-vino-restaurante-vender-mas`;
  - `uvas-regiones-equipo-sala-vender-vino`;
  - `maridajes-carta-vinos-rentable`.
- Se creó y pusheó el commit `cbe8a80 feat: add wine library blog cluster`.
- Lovable añadió el commit remoto `cdd6e8f Apliqué la migración del blog` con una migración SQL idempotente equivalente para aplicar el cluster.
- Lovable desplegó `prerender` y aplicó la migración SQL.
- Producción quedó validada: los 3 artículos responden HTTP 200 como Googlebot, usan `bot-prerender`, exponen enlaces internos hacia biblioteca/hubs/análisis/demo y aparecen en `sitemap.xml`.

#### Decisiones

- Sí se deben publicar nuevos artículos, pero solo cuando formen clusters claros conectados a objetivos SEO y comerciales.
- Para biblioteca del vino, el blog debe funcionar como capa de autoridad temática y no como repositorio de posts aislados.
- Cada artículo estratégico debe enlazar al menos a un hub de biblioteca, una intención específica y una acción de conversión cuando encaje.
- El prerender debe exponer esos enlaces en HTML para bots; no basta con que existan en React o en markdown cliente.
- La primera publicación se hace en español; las traducciones se priorizarán por señales de Search Console y valor internacional.

#### Hipótesis

- El cluster ayudará a reforzar la autoridad de `/biblioteca-vino` y sus hubs si Google rastrea las nuevas URLs desde sitemap y enlaces internos.
- Los artículos pueden capturar búsquedas de intención práctica para restaurantes que no encajan bien en fichas de entidad.
- La combinación artículo -> biblioteca -> análisis/demo puede mejorar tanto SEO informacional como conversión asistida.

#### Tareas pendientes

- Solicitar indexación manual de una tanda corta si Search Console lo permite.
- Medir indexación, impresiones y CTR de los 3 artículos.
- Elegir el siguiente cluster editorial con datos: formación de sala, regiones, rentabilidad de carta, maridajes o comparativas.
- Definir cuándo traducir artículos a `en`, `it`, `fr`, `de` y `pt`.
- Evitar nuevas migraciones duplicadas para estos mismos slugs salvo que se decida limpiar explícitamente la redundancia.

### Artículos localizados y salto de idioma en blog

#### Hechos

- El usuario preguntó si los artículos debían publicarse en todos los idiomas adaptados a país y reportó que el blog saltaba a español durante la navegación.
- Se confirmó en código que los listados de blog y Sommelier enlazaban a `/article/{slug}` incluso cuando el usuario estaba en `/en/blog`, `/de/blog`, `/pt/blog`, etc.
- Se centralizó la lógica de rutas de artículos en `src/lib/articleRoutes.ts`.
- Se corrigieron enlaces de blog y entrevistas para usar rutas localizadas `/{lang}/article/{slug}`.
- `ArticlePage.tsx` soporta rutas localizadas limpias y slugs legacy con sufijo, además de canonical localizado.
- `LanguageSwitcher.tsx` reconoce rutas de artículo al cambiar de idioma.
- `prerender` soporta `/{lang}/article/{slug}` y `sitemap` emite rutas de artículo localizadas usando el campo `lang`.
- Se creó la migración `20260601102000_add_localized_wine_library_blog_cluster.sql` con 15 adaptaciones del cluster de biblioteca del vino para `en`, `it`, `fr`, `de` y `pt`.
- Verificaciones locales: Deno check, tests, build, ESLint dirigido y `git diff --check`.
- Commit creado y pusheado: `9eb4b76 fix: localize blog article routes`.
- La migración aún no está aplicada en Supabase de producción; Supabase público no devuelve todavía las versiones `_en/_it/_fr/_de/_pt`.

#### Decisiones

- Publicar el cluster de biblioteca del vino en todos los idiomas relevantes, pero con adaptación por mercado y ejemplos locales.
- Usar `/{lang}/article/{slug}` como patrón canónico público para artículos internacionales.
- Mantener slugs de base de datos con sufijo `_{lang}` por compatibilidad con el sistema existente.
- No dar por publicada la ampliación internacional hasta que Lovable despliegue frontend, `prerender`, `sitemap` y aplique la migración.
- Validar navegación humana y Googlebot después del despliegue antes de solicitar indexación.

#### Hipótesis

- El salto a español venía principalmente de enlaces sin prefijo de idioma, no de falta de traducciones en sí.
- La corrección de rutas reducirá fricción de usuario internacional y señales SEO contradictorias.
- El contenido adaptado por mercado debería funcionar mejor para SEO y LLMs que traducciones literales.

#### Tareas pendientes

- Publicar desde Lovable el commit `9eb4b76`.
- Aplicar migración SQL del cluster internacional.
- Revalidar producción en blog, artículos localizados, prerender y sitemap.
- Solicitar indexación solo tras confirmar que las URLs localizadas responden correctamente.

### Cierre productivo de blog internacional y UI de artículos

#### Hechos

- Lovable aplicó la migración `20260601102000_add_localized_wine_library_blog_cluster.sql`.
- Supabase quedó con 15 artículos internacionales publicados para el cluster de biblioteca del vino.
- Lovable desplegó `prerender` y `sitemap`.
- `sitemap.xml` pasó a 2.072 URLs e incluye las rutas `/{lang}/article/...` del cluster internacional.
- Googlebot recibe `bot-prerender`, `html lang` correcto y canonical localizado en muestras `en`, `it`, `fr`, `de` y `pt`.
- El frontend fue publicado desde Lovable y quedó `Up to date`.
- La navegación humana de `/en/blog` ya enlaza a `/en/article/...`, sin saltar a `/article/...`.
- Se corrigió un residuo de UI española en artículos internacionales:
  - índice del artículo;
  - bloque de herramientas;
  - contenido relacionado;
  - CTAs intermedios, finales y sticky.
- Commit final publicado: `ee9da93 fix: localize article support blocks`.
- Verificaciones locales: ESLint dirigido, `git diff --check`, tests y build.
- Verificaciones productivas: navegador real en artículo inglés, Googlebot en artículos internacionales y sitemap.

#### Decisiones

- Cerrar como resuelto el bug de salto a español en blog/artículos.
- Mantener `/{lang}/article/{slug}` como patrón canónico internacional.
- Considerar los 15 artículos internacionales publicados, porque base de datos, prerender, sitemap y frontend humano ya están validados.
- Tratar la UI de soporte del artículo como parte de la localización, no como detalle secundario.
- No tocar base de datos ni Edge Functions para el pulido final de UI: fue un cambio exclusivamente frontend.

#### Hipótesis

- El cluster internacional debería mejorar señales SEO/LLM porque URL, idioma, canonical, sitemap, contenido y UI ahora apuntan al mismo mercado.
- El siguiente impacto dependerá más de indexación, enlazado interno, autoridad y señales de Search Console que de publicar más volumen inmediato.

#### Tareas pendientes

- Solicitar indexación selectiva de los artículos internacionales ya validados.
- Monitorizar cobertura y consultas en Search Console.
- Auditar residuos de UI española en otras rutas internacionales.
- Separar futura refactorización para compartir reglas entre frontend y `prerender`.

### Schema e i18n de hubs de biblioteca del vino

#### Hechos

- Se implementó soporte de `structuredData` explícito en `SEOHead`.
- Se añadió `src/components/seo/wineLibrarySchema.ts` para construir schema de hubs como `CollectionPage`, `DefinedTermSet`, `ItemList` y `BreadcrumbList`.
- Los hubs principales de biblioteca del vino usan schema específico en frontend.
- Las FAQs visibles de los hubs quedaron localizadas en `es`, `en`, `it`, `fr`, `de` y `pt`.
- Se corrigieron residuos de idioma en `GrapesHub` y `RegionsHub`.
- `prerender` ahora emite `ItemList`, FAQs de sección, navegación/footer localizados y etiquetas estratégicas localizadas en hubs internacionales.
- Verificaciones locales completadas: ESLint dirigido, Deno check, tests, build, `git diff --check` y muestras Googlebot locales.

#### Decisiones

- Los hubs de biblioteca se modelan como colecciones semánticas, no como aplicación/software.
- Las etiquetas visibles se localizan sin cambiar los slugs canónicos.
- La matriz de rutas estratégicas queda como fuente compartida provisional entre UI y schema.
- No ampliar más contenido hasta publicar y validar este bloque estructural.

#### Hipótesis

- `CollectionPage` + `ItemList` debería ayudar a Search Console, Google y LLMs a entender mejor la profundidad de biblioteca.
- La localización del prerender debería mejorar consistencia internacional frente a bots.

#### Tareas pendientes

- Publicar desde Lovable y desplegar `prerender`.
- Revalidar producción en hubs internacionales.
- Extender schema a páginas de detalle.
- Retomar indexación selectiva en Search Console tras producción validada.

### Estado de despliegue del bloque schema/i18n de hubs

#### Hechos

- Commit publicado en `main`: `9a14725 fix: enrich wine library hub schema`.
- Lovable no está autenticado en el navegador interno y redirige a login.
- El deploy directo de `prerender` por CLI falló por falta de `SUPABASE_ACCESS_TOKEN`.

#### Decisiones

- Considerar el bloque como implementado y pusheado, pero no desplegado en producción.
- Mantener Lovable como vía operativa para publicar frontend y Edge Function cuando la sesión esté disponible.

#### Hipótesis

- Una vez Lovable publique el commit y despliegue `prerender`, las validaciones locales deberían replicarse en producción.

#### Tareas pendientes

- Publish Lovable.
- Deploy explícito de `prerender`.
- Validación productiva Googlebot.

### Publicación productiva del schema/i18n de hubs

#### Hechos

- Lovable publicó el frontend y quedó `Published` / `Up to date`.
- Edge Functions `prerender`, `sitemap` y `redirects` constaban como desplegadas en Lovable.
- Validación productiva como Googlebot correcta en `en`, `pt` y `de` para hubs de biblioteca.
- Validación humana hidratada correcta en `/en/wine-library/grapes`.
- Search Console no permitió acceder a `sc-domain:winerim.wine` con `gugocreative@gmail.com`.

#### Decisiones

- Dar por publicado el bloque técnico de hubs.
- Bloquear la tarea de indexación manual hasta resolver permisos de Search Console.
- Mantener Worker sin cambios.

#### Hipótesis

- La mejora ya está disponible para bots y usuarios, pero Search Console tardará en mostrar impacto.

#### Tareas pendientes

- Resolver acceso Search Console.
- Solicitar indexación selectiva.
- Continuar con schema de detalle de entidades.

### Indexación selectiva de hubs y artículos internacionales

#### Hechos

- Search Console quedó accesible mediante la propiedad URL-prefix `https://winerim.wine/`.
- La propiedad de dominio `sc-domain:winerim.wine` no quedó accesible para `gugocreative@gmail.com`.
- Se solicitaron tres hubs internacionales de biblioteca:
  - EN grapes;
  - PT harmonizacoes;
  - DE rebsorten.
- Se procesó también la tanda prioritaria de tres artículos internacionales.
- Search Console confirmó `Se ha solicitado la indexación` para los hubs y terminó la secuencia de artículos en la tercera URL con confirmación.

#### Decisiones

- Operar Search Console desde la propiedad URL-prefix mientras no exista acceso al dominio.
- No repetir solicitudes de las mismas URLs.
- Priorizar pocas URLs estratégicas y esperar datos antes de abrir una tanda grande.

#### Hipótesis

- La solicitud manual acelerará rastreo de hubs y artículos, pero no garantiza indexación inmediata.

#### Tareas pendientes

- Revisar cambios de estado en 48-72 horas.
- Medir impresiones/cobertura antes de solicitar más URLs.

### Lectura de cobertura e indexación baja

#### Hechos

- Search Console muestra `102` URLs indexadas y `2.331` sin indexar en la propiedad `https://winerim.wine/`.
- La última actualización del informe es `29/5/26`, anterior a los últimos despliegues e indexación manual.
- La causa dominante es `Descubierta: actualmente sin indexar` con `1.930` URLs.
- Las muestras visibles de esa causa son mayoritariamente URLs legacy de artículos con sufijo de idioma (`/article/..._de`, `/article/..._fr`, etc.).
- El sitemap actual contiene `2.072` URLs limpias y no incluye esas legacy con sufijo.
- Las legacy responden `200` con canonical limpio localizado, no `301`.

#### Decisiones

- Considerar bajo el ratio de indexación, pero no interpretarlo como fallo total porque el informe está atrasado y mezcla URLs legacy.
- Priorizar depurar señales legacy/canonical/redirect antes de ampliar indexación manual.
- Evaluar redirecciones `301` para artículos legacy con sufijo.

#### Hipótesis

- El ruido legacy está consumiendo parte del análisis/crawl de Google y dificultando leer el avance real de la biblioteca del vino.
- Un sistema de redirects más explícito puede reducir el inventario no indexado visible en GSC.

#### Tareas pendientes

- Auditar ejemplos de las principales causas de no indexación.
- Definir plan de redirects legacy.
- Volver a medir después de que GSC actualice datos posteriores al deploy.

### Redirects 301 para artículos legacy localizados

#### Hechos

- Se implementó regla genérica de Worker para `/article/{slug}_{lang}` con `lang` en `en`, `it`, `fr`, `de`, `pt`.
- El destino queda como `/{lang}/article/{slug}`.
- Worker desplegado con version ID `251558ac-99da-4fec-8fa6-8a63286174c0`.
- Producción devuelve `301` con `X-Worker-Branch: legacy-localized-article-redirect` en muestras reales de GSC.

#### Decisiones

- Usar `301` en edge para legacy localizados en lugar de servir `200` con canonical.
- Mantener query string en el redirect.
- No modificar contenido ni base de datos para esta corrección.

#### Hipótesis

- Esto debería limpiar parte del inventario legacy de Search Console y reforzar las rutas canónicas localizadas.

#### Tareas pendientes

- Medir de nuevo `Descubierta: actualmente sin indexar` cuando GSC actualice.
- Continuar con auditoría de 404 y rastreadas/no indexadas.

### Auditoría inicial de 404

#### Hechos

- Se revisó el informe GSC `No se ha encontrado (404)` con `189` URLs.
- Las 10 muestras visibles son legacy antiguas.
- Producción actual redirige esas muestras y acaba en destinos `200`.
- GSC no mostró botón disponible de `Validar corrección` en esa vista.

#### Decisiones

- No crear reglas nuevas para esas 10 muestras porque ya no son 404 reales en producción.
- Monitorizar recrawl antes de intervenir más.

#### Hipótesis

- El informe de 404 está atrasado y debería mejorar con recrawl.

#### Tareas pendientes

- Exportar más ejemplos si el recuento no baja.
- Evaluar si conviene evitar cadenas de redirect en trailing slash legacy.

### Redirects adicionales para 404 legacy de alta confianza

#### Hechos

- Se añadieron redirects directos en Cloudflare Worker para:
  - `/terms-of-service` -> `/terminos`;
  - `/landing` -> `/`;
  - `/reviews-restaurante` -> `/casos-exito`;
  - `/por-que-los-jovenes-no-beben-vino-en-los-restaurantes` -> `/article/por-que-los-jovenes-no-beben-vino-en-los-restaurantes`.
- Worker desplegado con version ID `6c6f3366-e13f-4eee-b9c1-7603572f8822`.
- Producción devuelve `301` con `X-Worker-Branch: direct-legacy-redirect` en las cuatro URLs.
- Las versiones con trailing slash terminan en destino `200`.
- La suite local queda en 8 archivos y 40 tests pasados.

#### Decisiones

- Mantener la política de redirects de alta confianza: solo se añade `301` cuando existe una equivalencia clara.
- Resolver el artículo legacy de jóvenes y vino hacia su ruta de artículo actual, no hacia `/blog`.
- Dejar los casos dudosos pendientes de exportación GSC en vez de inventar destinos.

#### Hipótesis

- Estos redirects deberían reducir el bloque de 404 histórico cuando Search Console actualice después de recrawl.
- El efecto no será inmediato porque el informe visto estaba actualizado a `29/5/26`.

#### Tareas pendientes

- Revisar el informe 404 tras recrawl.
- Exportar más ejemplos si el recuento no baja.
- Continuar con `Rastreada: actualmente sin indexar`.

### Saneamiento de `Rastreada: actualmente sin indexar`

#### Hechos

- Se extrajeron las `153` URLs visibles del informe GSC `Rastreada: actualmente sin indexar`.
- Antes del nuevo Worker quedaban `20` URLs con destino final `404`.
- Se añadieron redirects directos para legacy de artículos, casos, comparativas, academia, cookies, afiliados y rutas localizadas antiguas.
- Se añadieron redirects por familia para `/blog-2/*` y `/programa-afiliados/*`.
- Se añadió normalización de `/?lang={lang}` hacia homes localizadas.
- Se añadió `410` para `/en/castillo-ygay-gran-reserva-especial-recognized-as-the-best-wine-in-the-world`, sin equivalente útil.
- Worker desplegado con version ID `06906271-4e57-4755-be7e-03376cfd8f7d`.
- Tras deploy, la revalidación de las `153` URLs queda:
  - `143` en `301 -> 200`;
  - `8` en `200 -> 200`;
  - `2` en `301 -> 410`;
  - `0` en `404`.
- Search Console muestra `Resultado de la validación: Iniciada`, con fecha de inicio `5/6/26`.
- La suite local queda en 8 archivos y 43 tests pasados.

#### Decisiones

- Iniciar validación GSC solo después de comprobar que el conjunto visible no deja destinos `404`.
- No convertir las `8` URLs reales que siguen en `200` en redirects; deben trabajarse como indexabilidad/calidad.
- Mantener `410` para contenido sin equivalente claro.
- Consolidar queries legacy de idioma con redirects permanentes a la home localizada.

#### Hipótesis

- La validación debería reducir el ruido de URLs legacy rastreadas cuando Google procese la tanda.
- El siguiente cuello de botella será la calidad, enlazado interno y priorización de URLs reales, no los redirects legacy de esta muestra.

#### Tareas pendientes

- Monitorizar la validación GSC.
- Revisar las `8` URLs `200 -> 200` y decidir refuerzo o noindex/sitemap según intención.
- Seguir después con `Descubierta: actualmente sin indexar`, especialmente biblioteca del vino y artículos internacionales.

### Refuerzo de las 6 URLs indexables `200 -> 200`

#### Hechos

- Se auditaron como Googlebot las `8` URLs reales restantes del informe `Rastreada: actualmente sin indexar`.
- `/terminos` y `/en/terms` siguen como legales `noindex`, correcto.
- Las tres fichas:
  - `/recursos/plantilla-formacion-equipo-sala`;
  - `/benchmarks-playbooks/benchmark-peso-vino-ticket-medio`;
  - `/recursos/revision-mensual-margenes`;
  estaban respondiendo con canonical/title/schema de la home en el prerender de bots.
- Se añadió prerender dedicado en Supabase para recursos y benchmarks/playbooks.
- Se dejó de excluir recursos y benchmarks/playbooks del sitemap en la Edge Function.
- El despliegue Supabase por CLI falló por falta de `SUPABASE_ACCESS_TOKEN`.
- Se desplegó un puente productivo en Cloudflare Worker:
  - version ID `670b5372-cbca-48a5-92af-8ebcfb9fb5f5`;
  - `worker-detail-prerender` para recursos y benchmarks/playbooks;
  - `worker-static-prerender` para `/it/prezzi` e `/integraciones`;
  - `sitemap-worker-detail-bridge` para inyectar las fichas en `/sitemap.xml`.
- Producción queda validada como Googlebot con `200`, `index, follow`, canonical propio y schema adecuado en las seis URLs indexables.
- Tests completos pasados: 8 archivos, 45 tests.

#### Decisiones

- Mantener las seis URLs indexables como páginas propias y no redirigirlas.
- Usar Worker como puente temporal porque no hay credenciales locales para desplegar Supabase.
- Mantener los cambios en Supabase listos para publicar desde Lovable.
- No pedir indexación manual masiva hasta que Google recrawlee el bloque corregido.

#### Hipótesis

- El principal bloqueo de las tres fichas era canonicalización efectiva a la home en el HTML de bot.
- `/it/prezzi` e `/integraciones` necesitaban más contenido semántico de bot, no un cambio de URL.
- Tras recrawl, estas seis URLs deberían tener más opciones de salir de `Rastreada: actualmente sin indexar`.

#### Tareas pendientes

- Publicar Supabase `prerender` y `sitemap` desde Lovable o con `SUPABASE_ACCESS_TOKEN`.
- Monitorizar si GSC reconoce el cambio en las seis URLs.
- Reforzar enlaces internos hacia estas URLs desde hubs, producto, blog y biblioteca.
- Retomar `Descubierta: actualmente sin indexar` con foco en biblioteca del vino e internacional.

### Comunicación con Lovable para publicar Edge Functions

#### Hechos

- Se intentó enviar directamente a Lovable la instrucción operativa para publicar las Edge Functions de Supabase actualizadas.
- La sesión no tenía navegador integrado conectado.
- Chrome sí tenía pestañas del proyecto Winerim en Lovable, pero no se pudo interactuar de forma fiable con el contenido de la página.
- No hay confirmación de envío a Lovable.

#### Decisiones

- No pegar ni enviar instrucciones a ciegas en Lovable.
- Dejar preparado el mensaje exacto para Lovable y mantener el despliegue de Supabase como tarea pendiente.

#### Hipótesis

- Con navegador integrado conectado o con permisos de automatización/captura activos, se podrá enviar el mensaje directamente desde la pestaña de Lovable.
- Alternativamente, `SUPABASE_ACCESS_TOKEN` permitiría cerrar el despliegue sin depender de Lovable.

#### Tareas pendientes

- Enviar el mensaje operativo a Lovable o desplegar Supabase por CLI si se proporciona token.

### Reducción de cadenas de redirect legacy visibles en GSC

#### Hechos

- Search Console sigue mostrando `Rastreada: actualmente sin indexar` con `153` URLs y última actualización `29/5/26`.
- La validación del motivo sigue iniciada desde el `5/6/26`.
- Los ejemplos visibles están dominados por URLs legacy de `/clientes/*` y `/estadisticas/*`.
- Producción ya redirigía esas familias, pero las variantes con slash final generaban cadena de dos redirects.
- Se desplegó Worker `396ec636-a1af-4bd4-8fb6-5f9dc2b0bc3a` para resolver legacy directos antes del trailing slash genérico.
- Las muestras de GSC ahora devuelven un único `301` con `X-Worker-Branch: direct-legacy-redirect`.

#### Decisiones

- Priorizar redirects legacy directos antes que normalización genérica de trailing slash cuando exista destino semántico claro.
- No redirigir `/clientes` porque es una página útil e indexable.
- Mantener `/estadisticas` y sus profundas legacy apuntando a `/benchmarks-playbooks`.

#### Hipótesis

- Reducir cadenas ayudará a Google a consolidar las señales de estas familias en menos rastreos.
- GSC no mostrará el impacto hasta que procese datos posteriores al deploy del `2026-06-06`.

#### Tareas pendientes

- Vigilar si el recuento de `Rastreada: actualmente sin indexar` baja o si las legacy pasan a `Página con redirección`.
- Exportar más ejemplos si aparecen nuevas familias no cubiertas.

### Validación de `Descubierta` y estabilización de `lastmod`

#### Hechos

- GSC muestra `Descubierta: actualmente sin indexar` con `1.930` URLs.
- Se inició validación general de la causa el `6/6/26`.
- Se inició también validación con filtro `/sitemap.xml` el `6/6/26`.
- La muestra visible de `1.000` URLs contiene `761` URLs de biblioteca del vino y `154` legacy de artículos con sufijo de idioma.
- El sitemap actual no contiene legacy `/article/{slug}_{lang}`.
- El sitemap actual contiene `1.458` URLs de biblioteca del vino.
- El sitemap estaba asignando `lastmod` dinámico por fecha de generación a rutas de biblioteca.
- Se desplegó Worker `56798607-2334-4472-8c23-d44c94af8432` para estabilizar `lastmod` de biblioteca en producción.

#### Decisiones

- Iniciar validación de `Descubierta` porque las legacy principales ya redirigen y el sitemap actual está limpio.
- Mantener todas las URLs de biblioteca en sitemap, pero con `lastmod` estable.
- Usar `2026-06-01` como fecha estable de última actualización editorial de biblioteca del vino.
- Usar `2026-06-05` para las fichas de recursos/benchmarks inyectadas por Worker.

#### Hipótesis

- Google conserva asociación histórica entre legacy y `/sitemap.xml` aunque el sitemap actual ya no las incluya.
- El `lastmod` dinámico podía estar generando ruido de recrawl y mala priorización.
- La biblioteca del vino necesita más señal y tiempo de crawl, no una corrección de canonical masiva.

#### Tareas pendientes

- Revisar evolución de `Descubierta` tras recrawl.
- Auditar artículos canónicos con poco contenido antes de priorizarlos.
- Reforzar enlazado interno hacia biblioteca del vino desde blog, producto y recursos.

### Recuperación editorial de `/article/alex-peiro`

#### Hechos

- Se auditó `/article/alex-peiro` porque GSC lo mostraba como artículo canónico real dentro de `Descubierta: actualmente sin indexar`.
- Producción como Googlebot respondía `200` y `bot-prerender`, pero solo mostraba `123` palabras y un placeholder de contenido pendiente.
- Se confirmó que el prerender de artículos lee desde Supabase `articles`, no desde el fallback estático.
- Se enriqueció el fallback estático de `alex-peiro` hasta `780` palabras, con enlaces contextuales a la biblioteca del vino.
- Se creó la migración `20260607123000_enrich_alex_peiro_article.sql` para actualizar la fila real en Supabase.
- Se añadió el test `article-content-quality.test.ts`.
- Verificaciones locales completadas: tests enfocados, test completo, build, ESLint dirigido y `git diff --check`.
- Commit y push realizados: `a095b85 fix: enrich alex peiro article`.
- Lovable publicó/actualizó el frontend hasta quedar `Up to date`, pero producción sigue mostrando el placeholder porque la migración de Supabase no se aplicó.
- El chat de Lovable no aceptó foco/texto desde el navegador integrado.
- La clave pública de Supabase permite leer el artículo, pero no actualizarlo.
- `/admin` no tiene sesión activa de editor.

#### Decisiones

- Tratar la corrección de contenido como incompleta hasta aplicar la migración en Supabase.
- Mantener el contenido enriquecido en fallback y en migración para que frontend y base de datos puedan converger.
- No atribuir respuestas inventadas a Álex Peiró; usar una recuperación editorial basada en hechos disponibles y análisis propio.
- No seguir forzando acciones en Lovable si la interfaz no permite una interacción fiable.

#### Hipótesis

- Lovable no aplica automáticamente migraciones SQL al hacer `Update` desde el panel Publish.
- Con la migración aplicada, `/article/alex-peiro` pasará de pieza fina a URL canónica defendible para indexación.
- Este patrón debe repetirse con otros artículos canónicos finos antes de solicitar indexación selectiva.

#### Tareas pendientes

- Aplicar la migración de Supabase.
- Revalidar `/article/alex-peiro` en producción como Googlebot.
- Si queda correcto, pedir indexación selectiva en GSC.
- Continuar con la siguiente URL fina de artículos canónicos.

## 2026-06-08

### Aplicación de migración Supabase para `/article/alex-peiro`

#### Hechos

- Se retomó la sesión leyendo los cuatro documentos de fuente de verdad del proyecto.
- El enlace Lovable aportado en la sesión, `https://lovable.dev/projects/ebb36746-82ff-43c3-86c1-558573beddcd`, corresponde al proyecto `Crim`, no a la web pública `Web Winerim`.
- Se evitó aplicar cambios en `Crim`.
- Se usó el proyecto correcto `Web Winerim`: `https://lovable.dev/projects/2c4eed0e-6760-45f0-aeb3-ce44de8e91f1`.
- Se envió a Lovable la instrucción para aplicar `supabase/migrations/20260607123000_enrich_alex_peiro_article.sql`.
- Lovable informó que la migración quedó aplicada en Supabase.
- La validación independiente como Googlebot de `https://winerim.wine/article/alex-peiro?codex=lovable-20260608-verify` confirmó:
  - HTTP `200`;
  - `X-Worker-Branch: bot-prerender`;
  - `X-Prerendered: true`;
  - canonical propio;
  - `926` palabras visibles;
  - placeholder ausente;
  - enlaces estratégicos a biblioteca del vino, hubs, software y análisis.
- Search Console confirmó que `https://winerim.wine/article/alex-peiro` ya está en Google y la página está indexada.
- Se solicitó indexación de la URL para forzar recrawl de la versión corregida.
- Search Console aceptó la solicitud y mostró `Se ha solicitado la indexación`.

#### Decisiones

- No operar sobre proyectos Lovable no documentados aunque el usuario los abra, si la revisión muestra que pertenecen a otra app.
- Usar siempre `Web Winerim` como destino de cambios de la web pública salvo decisión explícita documentada.
- Dar por resuelta la recuperación editorial de `/article/alex-peiro` en producción y la solicitud selectiva de recrawl en Search Console.

#### Hipótesis

- La URL `/article/alex-peiro` ya es suficientemente defendible para solicitar indexación selectiva.
- El patrón de artículos canónicos finos puede repetirse en otros ejemplos de `Descubierta: actualmente sin indexar`.

#### Tareas pendientes

- Monitorizar el recrawl de `/article/alex-peiro` en Search Console.
- Continuar con la siguiente URL fina del informe `Descubierta`.

### Saneamiento de duplicados blandos de artículos internacionales

#### Hechos

- Se abrió de nuevo `Descubierta: actualmente sin indexar` en Search Console.
- La causa sigue con `1.930` URLs, validación `Iniciada`, fecha de inicio `6/6/26` y datos actualizados a `29/5/26`.
- Se subió la tabla a `500` filas y se clasificaron `1.000` URLs visibles:
  - `761` biblioteca del vino;
  - `154` legacy `/article/{slug}_{lang}`;
  - `36` artículos canónicos `/article/{slug}`;
  - `49` otras rutas.
- Los `36` artículos canónicos visibles no presentan problema editorial:
  - `0` bajo `500` palabras;
  - `0` placeholders;
  - mínimo `590` palabras;
  - mediana `883` palabras.
- Se detectaron `14` artículos internacionales servidos como `200` en `/article/{slug}` con canonical a `/{lang}/article/{slug}`.
- Se implementó en `cloudflare-worker-v3-hybrid.js` `LOCALIZED_ARTICLE_CANONICAL_REDIRECTS`.
- Se desplegó Cloudflare Worker `winerim-proxy` Version ID `881ec799-cc05-4110-8e4e-6ed75f3bcd6d`.
- Producción confirmó las `14` redirecciones:
  - `301`;
  - `X-Worker-Branch: localized-article-canonical-redirect`;
  - destino localizado correcto;
  - destino `200`, `bot-prerender` y canonical propio.
- Verificaciones completadas:
  - sintaxis Worker;
  - ESLint dirigido;
  - test enfocado `wine-library-seo-surface`;
  - test completo `47` tests;
  - `git diff --check`;
  - dry-run Worker;
  - mini-regresión productiva.

#### Decisiones

- Consolidar con `301` las URLs internacionales sin prefijo de idioma que canonicalizan a rutas localizadas.
- No hacer cambios editoriales sobre este lote porque el contenido visible es suficiente.
- No reenviar indexación manual para URLs que deben convertirse en redirecciones; dejar que GSC las reclasifique.

#### Hipótesis

- El ruido de artículos internacionales en `Descubierta` bajará cuando Google recrawlee y vea los `301`.
- La mayor bolsa restante de `Descubierta` es biblioteca del vino, donde el siguiente impacto vendrá de enlazado interno, señales de demanda y tiempo de crawl.

#### Tareas pendientes

- Commit y push.
- Revisar las `49` rutas `other` de la muestra visible.
- Monitorizar evolución de `Descubierta` y `Página con redirección`.

## 2026-06-30

### `Aprender vino` separado de `Biblioteca del vino`

#### Hechos

- La inspiración de La RVF y la sección “cómo empezar con el vino” se revisó como una necesidad de arquitectura guiada, no como una nueva entidad de biblioteca.
- Se implementó el hub localizado `Aprender vino` en código con rutas ES/EN/IT/FR/DE/PT.
- El hub enlaza hacia `Biblioteca del vino`, pero tiene intención propia de aprendizaje y captación.
- Se creó y subió `9c005dd feat: add learn wine hub` a `origin/main`.
- Se desplegó Cloudflare Worker `winerim-proxy` Version ID `749b0929-9ac5-408b-8c51-7ee195051232`.
- Googlebot y `/sitemap.xml` ya quedan cubiertos por Worker para `Aprender vino`.
- Supabase CLI no pudo desplegar `sitemap`/`prerender` por falta de `SUPABASE_ACCESS_TOKEN`.
- El usuario confirmó después que Lovable publicó frontend y Edge Functions `sitemap`/`prerender` desde `main`.
- Producción humana quedó validada para las seis rutas con H1/canonical/hreflang propios, sin `Página no encontrada`.
- Googlebot quedó validado en las seis rutas con `HTTP 200`, `x-prerendered: true` y título localizado correcto.
- `/sitemap.xml` contiene las seis URLs nuevas y se observaron `2.240` nodos `<url>`.
- El usuario informó dos hallazgos de seguridad preexistentes en buckets `cartas-vinos` y `lead-uploads`, fuera del alcance de este deploy.

#### Decisiones

- Mantener `Biblioteca del vino` como colección de entidades y referencia semántica.
- Mantener `Aprender vino` como ruta guiada para principiantes/equipos de sala:
  - ES `/aprender-vino`;
  - EN `/en/learn-wine`;
  - IT `/it/imparare-il-vino`;
  - FR `/fr/apprendre-le-vin`;
  - DE `/de/wein-lernen`;
  - PT `/pt/aprender-vinho`.
- Usar schema `LearningResource` para la nueva capa.
- Añadir fallback/prerender en Worker para bots mientras Supabase `prerender` no esté desplegado.
- Pasar a fase de Search Console y spokes de iniciación una vez validada producción humana y Googlebot.
- Tratar los hallazgos de buckets Supabase Storage como tarea de seguridad independiente.

#### Hipótesis

- Separar el hub reduce canibalización interna: Biblioteca responde a entidades; Aprender vino responde a orden, método y aplicación en sala.
- La capa guiada puede reforzar posicionamiento LLM porque explica explícitamente cómo se usa la Biblioteca.

#### Tareas pendientes

- Reenviar sitemap en Search Console y solicitar indexacion selectiva de `/aprender-vino` si la herramienta lo permite.
- Monitorizar indexacion de las seis rutas de `Aprender vino`.
- Auditar/corregir buckets Supabase Storage `cartas-vinos` y `lead-uploads` en una tarea separada.

### Ejecución de cinco pasos posteriores a `Aprender vino`

#### Hechos

- Search Console aceptó el reenvío de `/sitemap.xml`.
- Search Console aceptó la solicitud de indexación manual de `https://winerim.wine/aprender-vino`.
- La inspección de las seis rutas confirmó que todas están detectadas en `https://winerim.wine/sitemap.xml`.
- Estado GSC tras solicitud:
  - ES `/aprender-vino`: `Rastreada: actualmente sin indexar`, último rastreo `30 jun 2026, 9:41:46`, smartphone Googlebot, obtención correcta;
  - EN/IT/FR/DE/PT: `Descubierta: actualmente sin indexar`.
- Se confirmó el riesgo de Storage:
  - `lead-uploads` y `cartas-vinos` estaban públicos;
  - ambos tenían políticas de lectura pública;
  - ambos recibían archivos de leads.
- Se preparó la migración `20260630074507_harden_lead_storage_buckets.sql`.
- Se actualizaron formularios para guardar referencias privadas `storage://bucket/path`.
- Se actualizó `send-lead-notification` para generar URLs firmadas temporales desde service role.
- Se creó `src/seo/APRENDER_VINO_SPOKES_PLAN_2026-06-30.md` con la primera arquitectura de spokes.
- Se pusheó `9e274d0 feat: harden lead uploads and plan wine learning spokes`.
- El deploy remoto queda pendiente porque CLI no tiene `SUPABASE_ACCESS_TOKEN` y Lovable no está autenticado en el navegador integrado.

#### Decisiones

- Pedir indexación manual solo de la URL ES principal y monitorizar las otras cinco variantes.
- Hacer privados los buckets con cartas de leads y reemplazar URLs públicas persistentes por URLs firmadas.
- Mantener subida anónima únicamente para los buckets y tipos de archivo necesarios.
- Priorizar tres spokes iniciales: cata en cinco pasos, vocabulario de cata y maridajes básicos.

#### Hipótesis

- El reenvío de sitemap y la solicitud ES deberían acelerar el primer rastreo del cluster.
- Las variantes internacionales deberían avanzar cuando Google procese alternates y sitemap.
- La solución con URL firmada mantiene utilidad operativa para ventas sin exposición pública permanente.

#### Tareas pendientes

- Desplegar commit `9e274d0` desde Lovable o con `SUPABASE_ACCESS_TOKEN`.
- Revalidar uploads y URLs firmadas tras despliegue.
- Revisar Search Console en 48-72 horas.
- Crear y publicar la primera ola de 3 spokes x 6 idiomas.

### Seguridad Storage desplegada y contradiccion en `/analisis-carta`

#### Hechos

- El usuario confirmo que Lovable marco `lead-uploads` y `cartas-vinos` como buckets privados mediante storage tool.
- El usuario confirmo que las politicas RLS quedaron aplicadas y validadas con anon key:
  - subida permitida solo en rutas/tipos previstos;
  - subida a raiz de `lead-uploads` bloqueada con `403`;
  - lectura anonima bloqueada con `400`;
  - lectura por `/public/...` bloqueada con `400`.
- El usuario confirmo que `send-lead-notification` esta desplegada y genera URLs firmadas de 14 dias para referencias `storage://bucket/path`.
- La plataforma bloqueo SQL directo contra `storage.buckets`; por tanto quedan pendientes el limite de tamano y la lista MIME a nivel bucket.
- El remoto incorporo `supabase/migrations/20260630082747_c608b25f-fbaa-4950-b158-6611319b8ade.sql` como migracion efectiva de politicas RLS.
- `supabase/migrations/20260630074507_harden_lead_storage_buckets.sql` se convirtio en no-op documentado para no volver a ejecutar SQL bloqueado contra `storage.buckets`.
- Verificacion read-only de produccion confirmo que el popup de herramientas publicado usa `storage://cartas-vinos/...` y ya no usa `getPublicUrl`.
- Se detecto una contradiccion:
  - el resumen recibido decia que `/analisis-carta` envia `storage://lead-uploads/analisis/...`;
  - produccion y build local muestran que el flujo activo no contiene `storage://` ni `lead-uploads`;
  - `/analisis-carta` renderiza `WineListAnalyzerTool`, que envia archivos a `https://api.winerim.wine/v1/analyze`.
- `src/pages/AnalizaCarta.tsx` contiene un `handleSubmit` con subida a `lead-uploads`, pero no esta conectado a ningun formulario renderizado.
- No se localizo en este repo el codigo fuente de `api.winerim.wine`; el servicio responde desde Cloudflare.

#### Decisiones

- Dar por correcto el endurecimiento de Storage para `cartas-vinos` y para cualquier flujo que realmente use referencias `storage://...`.
- No dar por cerrada la privacidad de archivos de `/analisis-carta` hasta auditar `api.winerim.wine`.
- No cambiar `WineListAnalyzerTool` a Supabase Storage sin conocer el contrato de `/v1/analyze`, para no romper el analizador.
- Tratar los limites de tamano/MIME a nivel bucket como tarea de Lovable Cloud Storage panel o soporte.
- Mantener la contradiccion documentada explicitamente y limpiar/reconectar el codigo muerto en una tarea posterior.
- Mantener la migracion `20260630082747...` como fuente de politicas y no recuperar los `UPDATE storage.buckets` en migraciones futuras.

#### Hipotesis

- El backend `api.winerim.wine` puede estar usando almacenamiento propio de Cloudflare o procesamiento temporal; su retencion real no es inferible desde el frontend.
- El lead del analizador en modo archivo puede estar llegando con `analysisId`, no con link al PDF original.
- La auditoria del backend externo es la siguiente pieza necesaria antes de declarar cerrado el flujo completo de privacidad de cartas.

#### Tareas pendientes

- Localizar o auditar el backend `api.winerim.wine`.
- Confirmar politica de retencion/borrado de PDFs y si existen URLs internas o firmadas para ventas.
- Ajustar `file_size_limit` y `allowed_mime_types` desde Lovable Cloud Storage si es posible.
- Limpiar o reconectar el `handleSubmit` muerto de `AnalizaCarta.tsx`.
- Continuar con la primera ola de spokes de `Aprender vino`.
