# Wine Library next QA/improvement block - 2026-08-27

## Hechos

- Carpeta operativa viva usada: `/Users/GOIKO/Documents/Playground/seo-migration-master`.
- Se intentaron materializar y leer `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`; los cuatro seguian como `compressed,dataless` y las lecturas quedaron bloqueadas hasta interrupcion manual.
- Se uso el vault Winerim como contexto minimo legible: `/Users/GOIKO/Documents/Playground/WINERIM_KNOWLEDGE_VAULT`.
- No se publico en Lovable, no se desplego Cloudflare, no se tocaron Supabase Edge Functions ni Search Console.
- Se auditaron en produccion 6 rutas de Biblioteca con Playwright mobile 390 px y 12 variantes bot/humano por HTTP:
  - `https://winerim.wine/biblioteca-vino`
  - `https://winerim.wine/en/wine-library`
  - `https://winerim.wine/en/wine-library/grapes/tempranillo`
  - `https://winerim.wine/de/weinbibliothek/rebsorten/tempranillo`
  - `https://winerim.wine/pt/biblioteca-vinho/regioes/portugal/vinho-verde`
  - `https://winerim.wine/de/weinbibliothek/weinbegleitung/carnes-rojas`
- Evidencia JSON: `docs/agent_outputs/wine_library_next_block_qa_2026-08-27.json`.
- Capturas mobile guardadas en `docs/agent_outputs/screenshots/`:
  - `es_library_hub_mobile.png`
  - `en_library_hub_mobile.png`
  - `en_grape_tempranillo_mobile.png`
  - `de_grape_tempranillo_mobile.png`
  - `pt_region_vinho_verde_mobile.png`
  - `de_pairing_carnes_rojas_mobile.png`
- Resultado productivo positivo: las 6 URLs humanas devuelven `200`, `html lang` correcto, canonical propio, sin overflow horizontal mobile y sin marcadores `winerim-content-expansion`, `TELEGRAM_BOT_TOKEN` ni `@secret`.
- Resultado productivo positivo para bots: Googlebot y `OAI-SearchBot/1.0` devuelven `200` y canonical propio en las 6 URLs auditadas, con `x-worker-branch: bot-prerender`.
- Fallo detectado en frontend humano: las fichas de uva localizadas tenian title duplicado, por ejemplo `Tempranillo | Grape guide — Winerim | Winerim` y `Tempranillo | Rebsortenführer — Winerim | Winerim`.
- Cambio local aplicado: `src/data/grapesLibraryI18n.ts` ya no incrusta `— Winerim` en los `seo.title` localizados ni en fallbacks de uva.
- Gate local anadido: `src/test/wine-library-i18n.test.ts` verifica que los titulos SEO localizados de uvas no contienen `Winerim` antes de que `SEOHead` anada el sufijo global.
- Incidente operativo corregido: una reescritura mecanica sobre el fichero dataless `src/data/grapesLibraryI18n.ts` lo dejo temporalmente a 0 bytes. Se restauro solo ese fichero desde `/Users/GOIKO/seo-migration-master/src/data/grapesLibraryI18n.ts`, que estaba legible, y se reaplico el cambio minimo. No se sincronizo ningun otro archivo ni se tomo la copia antigua como fuente de estado.

## Decisiones

- Este bloque se limita a Biblioteca del vino: SEO/i18n de fichas, UX mobile y evidencia productiva.
- No se adelantan articulos futuros del calendario editorial ni se toca `llms.txt`/`llms-full.txt`.
- No se despliega el cambio local de uvas porque el frontend productivo canonical reciente vive en Lovable y el repo local presenta bloqueos de materializacion/IO; desplegar desde local podria mezclar estados.
- La correccion del title duplicado debe publicarse por la fuente frontend canonical que se confirme: Lovable si sigue siendo el origen operativo, o repo local solo si antes se sincroniza con los commits Lovable recientes.

## Hipotesis

- El title duplicado humano ocurre porque los overlays de uva ya incluian marca (`— Winerim`) y la capa `SEOHead`/head manager anade de nuevo el sufijo de sitio.
- El prerender bot de uvas no duplica marca porque usa una ruta de render distinta para bots.
- El titulo bot aleman de `carnes-rojas` (`Carnes Rojas: Weinbegleitung | Winerim`) procede de la capa Worker/prerender, no de la UI React hidratada.

## Contradicciones

- Produccion humana y produccion bot no muestran exactamente los mismos titles en fichas de uva: humano duplica marca; bot no.
- En el maridaje aleman `carnes-rojas`, la UI humana esta mayormente localizada (`Weinbegleitung zu Rotem Fleisch`), pero el titulo bot conserva el nombre base espanol `Carnes Rojas`.
- La regla viva pide actualizar los cuatro documentos raiz del subproyecto, pero esos ficheros siguen `compressed,dataless` y leerlos/escribirlos queda bloqueado. Se evita escribir sobre placeholders para no perder contenido.
- La copia antigua `/Users/GOIKO/seo-migration-master` se uso una sola vez como fuente de recuperacion de emergencia para un archivo dañado por esta sesion, pese a que no debe mezclarse como repo operativo.

## Tareas pendientes

- Publicar el fix de titulos de uvas desde la fuente frontend canonical confirmada y revalidar:
  - `/en/wine-library/grapes/tempranillo`
  - `/de/weinbibliothek/rebsorten/tempranillo`
  - una muestra adicional de uvas EN/FR/IT/PT.
- Corregir en Worker/prerender el naming localizado de maridajes para bots, empezando por `de/weinbibliothek/weinbegleitung/carnes-rojas`, de modo que title/headline use `Rotes Fleisch` o el nombre aleman localizado, no `Carnes Rojas`.
- Hidratar/recuperar `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md` antes de la siguiente sesion con escritura documental.
- Reintentar `vitest` y `npm run build` cuando el repo deje de colgarse por IO. En esta sesion ambos quedaron inconclusos y se interrumpieron manualmente.
- Ampliar el siguiente bloque verificable a estilos y maridajes DE/PT: detectar terminos base espanoles en titles, H1, breadcrumbs, cards y JSON-LD.
