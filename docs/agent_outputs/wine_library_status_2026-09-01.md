# 2Ampliar Biblioteca del vino - status actual 2026-09-01

Revision: 2026-09-01, read-only. No se publico, no se desplego, no se tocaron credenciales, Search Console, Supabase ni produccion.

## Hechos

- Tarea viva: `2Ampliar biblioteca del vino`, thread `019f8f38-80a6-7fc3-a345-d036b528315e`, activa y pinned.
- Carpeta viva usada: `/Users/GOIKO/Documents/Playground/seo-migration-master`.
- Los cuatro documentos raiz del subproyecto ya son legibles a las 07:03 CEST del 2026-09-01; en la ejecucion del 2026-08-27 estaban `compressed,dataless`.
- Lovable confirma el proyecto Web Winerim `2c4eed0e-6760-45f0-aeb3-ce44de8e91f1`, publicado en `https://seo-migration-magic.lovable.app`, con latest commit `ef64edbb35adf4ab44e030ea2e290db21c8f5bad`.
- Despliegues ya documentados: commits Lovable `27ca0b54ada5fd0108e2d5b5eeed2307c035b4ef` y `ef64edbb35adf4ab44e030ea2e290db21c8f5bad`; Cloudflare `winerim-edge-router` Version ID `374b328a-cbc8-4681-8748-e88c47634476`.
- Produccion fresca:
  - `/precios-modulos-integraciones`: humano y Googlebot `200`, canonical propio y pagina real de precios.
  - `/sitemap.xml`: `200`, `x-worker-branch: sitemap-worker-detail-bridge`, `2436` URLs, contiene `/simulador-carta`, `/en/wine-list-simulator` y `/precios-modulos-integraciones`; no contiene `/en/simulador-carta`.
  - Playwright hidratado en mobile valida `/biblioteca-vino`, `/en/wine-library`, uva Tempranillo EN/DE, region Vinho Verde PT, maridaje DE de carnes rojas, `/en/wine-list-simulator` y `/blog`: `200`, sin overflow, sin `TELEGRAM_BOT_TOKEN`, `@secret` ni `winerim-content-expansion`.
  - Bots Googlebot y `OAI-SearchBot/1.0` reciben prerender `200` con canonical propio en la muestra de Biblioteca.
- El validador local `node docs/agent_outputs/validate_release_gates.mjs` pasa: `ok: true`, `66` releases en prerender links, prerender articles, sitemap articles y worker links; `warnings: []`.
- La suite focal `npm run test -- --run src/test/wine-library-i18n.test.ts` arranca pero no produce cierre tras mas de un minuto; se interrumpio manualmente con codigo `130`. Se registra como bloqueo de runner/IO, no como fallo de aserciones.

## Decisiones

- No declarar la web 100% cerrada: hay deuda de HTML shell inicial, titles duplicados en React hidratado y un title bot aleman con base espanola.
- No publicar el fix local de uvas ni tocar Worker/prerender desde esta corrida; el frontend publicado canonical sigue siendo Lovable y el ultimo commit live es anterior al fix local del 2026-08-27.
- Tratar el validador de release gates como desbloqueado: el bloqueo anterior era el wrapper `timeout`, no el contenido del gate.
- Mantener activas solo las automatizaciones relevantes: `Winerim SEO editorial coordinador` y `Winerim blog semanal - vivo`; las copias antiguas de blog estan pausadas.

## Hipotesis

- La duplicacion de marca en titles ocurre por entradas SEO que ya incluyen `Winerim` y luego pasan por `SEOHead`, que anade el sufijo global.
- La divergencia local/produccion del simulador sugiere que Lovable `ef64edbb` no coincide exactamente con el fichero local actual `src/components/simulator/simulatorI18n.ts`.
- El title bot aleman `Carnes Rojas: Weinbegleitung | Winerim` se genera en Worker/prerender, no en React hidratado.

## Contradicciones

- React hidratado sirve Biblioteca localizada correctamente, pero el HTML inicial sin JS de rutas SPA sigue con `lang=es`, title de home y canonical `https://winerim.wine/`.
- El fix local de uvas existe en `src/data/grapesLibraryI18n.ts` y el test en `src/test/wine-library-i18n.test.ts`, pero produccion Lovable sigue en commit `ef64edbb` y muestra el duplicado en fichas humanas.
- El simulador EN esta traducido visible y bot correcto, pero el title humano hidratado actual es `Wine List Simulator · Winerim | Winerim`.
- El calendario editorial muestra lotes futuros/listos, pero no debe tratarse como publicado hasta que exista release y QA post-release.

## Tareas pendientes

- Publicar desde la fuente frontend canonica el fix de titles de uvas y extenderlo al simulador para que ninguna pagina pase a `SEOHead` con marca ya incrustada.
- Corregir Worker/prerender para que el maridaje aleman de `carnes-rojas` use naming localizado, no `Carnes Rojas`.
- Resolver HTML shell inicial para rutas React: `html lang`, title, canonical y hreflang antes de hidratacion.
- Sincronizar o documentar oficialmente la relacion Lovable/repo local/Cloudflare para evitar que el repo local y el publish vuelvan a divergir.
- Continuar auditoria DE/PT/Biblioteca/Aprender vino y ejecutar Search Console solo de forma selectiva tras cerrar las incidencias de titles/shell.
- Reintentar Vitest focal cuando el entorno local deje de quedarse sin output, o ejecutar el gate desde Lovable/CI si esa es la fuente canonica del frontend.
