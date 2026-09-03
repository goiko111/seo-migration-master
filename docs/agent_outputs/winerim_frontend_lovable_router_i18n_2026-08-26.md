# Winerim frontend Lovable/router i18n recovery - 2026-08-26

## Hechos

- Carpeta operativa usada: `/Users/GOIKO/Documents/Playground/seo-migration-master`.
- La copia antigua `/Users/GOIKO/seo-migration-master` no se uso.
- Se intento leer `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`. `DECISIONS_LOG.md` estaba legible; los otros tres aparecen como `compressed,dataless` y fallan con `Undefined error: 0`.
- Lovable proyecto: `2c4eed0e-6760-45f0-aeb3-ce44de8e91f1` (`seo-migration-magic`, Web Winerim).
- Commit Lovable `27ca0b54ada5fd0108e2d5b5eeed2307c035b4ef`: regex de idioma del chat, gating del chat hasta decision de cookies y fixes de overflow mobile.
- Commit Lovable `ef64edbb35adf4ab44e030ea2e290db21c8f5bad`: i18n del simulador visible en ES/EN/IT/FR/DE/PT, con labels traducidas y values tecnicos estables.
- Ambos commits fueron publicados en Lovable; el origen `https://seo-migration-magic.lovable.app` sirve asset `index-CPjMdYJh.js`.
- Se actualizo localmente `wrangler.pages-router.toml` para que `FRONTEND_ORIGIN` sea `https://seo-migration-magic.lovable.app` y `FRONTEND_RELEASE` sea `lovable-ef64edbb-simulator-i18n-20260826`.
- Dry-run Wrangler correcto para `winerim-edge-router`.
- Se desplego `winerim-edge-router` con Version ID `374b328a-cbc8-4681-8748-e88c47634476`.

## Validaciones productivas

- `/en`, `/de`, `/pt`: `200`, `X-Winerim-Router: react-pages`, asset `index-CPjMdYJh.js`, JS hidratado con `htmlLang`, `document.title` y canonical localizados.
- `/en`: chat config `lang: en`; tras consentimiento el widget visible dice `How much is your wine list losing?`; sin consentimiento el script del chat no carga.
- `/de` y `/pt`: home visible en idioma correspondiente y sin overflow horizontal mobile a 390px.
- `/en/wine-list-simulator`: humano `200`, visible en ingles, canonical `https://winerim.wine/en/wine-list-simulator`, sin overflow horizontal mobile.
- Recorrido productivo por los 5 pasos del simulador EN: sin `Tu Restaurante`, `Nombre del restaurante`, `Tipo de cocina`, `Atras`, `Siguiente`, `Simular carta`, `Sommelier en sala`, `Sensibilidad al precio` ni `Tus Datos`.
- `/simulador`: `301` a `https://winerim.wine/simulador-carta` para humano y Googlebot.
- `/en/simulador-carta`: `301` a `https://winerim.wine/en/wine-list-simulator` para humano y Googlebot.
- Googlebot y `OAI-SearchBot/1.0` en `/en/wine-list-simulator`: `200`, `x-worker-branch: worker-static-prerender`, title `Wine List Simulator | Winerim`, canonical correcto y snippet en ingles sin español.
- `/sitemap.xml`: `200`, `x-worker-branch: sitemap-worker-detail-bridge`, `2430` URLs; contiene `/simulador-carta`, `/en/wine-list-simulator` y `/precios-modulos-integraciones`; no contiene `/en/simulador-carta`.
- Legales: `/politica-privacidad` y `/terminos-y-condiciones-del-contrato` humanos `200` con `X-Robots-Tag: noindex, follow`; Googlebot en `/politica-privacidad` `200/noindex`.
- Blog: sin marcadores `winerim-content-expansion`, `TELEGRAM_BOT_TOKEN` ni `@secret` en QA mobile/DOM.

## Decisiones

- Para resolver la divergencia productiva, se hizo que las rutas React cacheadas del router consuman Lovable publicado en lugar del Pages deployment antiguo `dc22cf1e.winerim-origin.pages.dev`.
- Se mantuvieron estables los valores tecnicos del simulador para backend/analitica; solo se localizaron labels, placeholders, errores y textos visibles.
- No se tocaron sitemap, Supabase Edge Functions, prerender, migraciones ni contenido editorial en este cierre.
- Search Console queda habilitado para inspeccion selectiva de las URLs corregidas, no para indexacion masiva.

## Hipotesis

- La causa de que `/blog` se actualizara y `/en` siguiera antiguo era que `/blog` caia al backend `winerim-proxy` con ORIGIN Lovable, mientras las rutas React estaban interceptadas por `winerim-edge-router` y `FRONTEND_ORIGIN` Pages antiguo.
- La deuda del HTML shell inicial afecta sobre todo a usuarios/herramientas que leen HTML bruto sin ejecutar JS. Bots cubiertos por el Worker reciben prerender correcto.

## Contradicciones

- `winerim-proxy` tenia ORIGIN Lovable, pero `winerim-edge-router` seguia con `FRONTEND_ORIGIN = "https://dc22cf1e.winerim-origin.pages.dev"`.
- Lovable reporto inicialmente "sin cambios Supabase", aunque el diff incluyo ajustes frontend generados en `src/integrations/supabase/client.ts`, `src/integrations/supabase/types.ts` y `src/integrations/supabase/previewAuthStorage.ts`. No hubo migraciones ni Edge Functions.
- `PROJECT_CONTEXT.md`, `CURRENT_STATE.md` y `NEXT_STEPS.md` no pudieron actualizarse por estado `compressed,dataless`; escribir sobre ellos podria romper contenido.
- `git status --short` se cuelga en la copia viva; `wrangler.pages-router.toml` no aparece en `git ls-files --stage`, por lo que puede estar no trackeado.

## Tareas pendientes

- Hidratar/recuperar `PROJECT_CONTEXT.md`, `CURRENT_STATE.md` y `NEXT_STEPS.md`, y replicar este cierre en los cuatro documentos raiz cuando sean legibles.
- Definir fuente de verdad entre Lovable, repo local y Cloudflare Pages/Workers; idealmente documentar si Lovable es frontend canonical y el repo local solo orquesta Worker/router.
- Sincronizar los cambios Lovable `27ca0b54` y `ef64edbb` al repo local si este debe seguir siendo mirror tecnico.
- Completar auditoria i18n de rutas no validadas, especialmente DE/PT profundos, herramientas legacy, Biblioteca y Aprender vino.
- Corregir HTML shell inicial para rutas React: `html lang`, title, canonical y hreflang antes de hidratacion.
- Actualizar textos legales/consentimiento para reflejar GTM/GA4/Ads/Meta/Leadfeeder reales y granularidad de consentimiento.
- En Search Console: inspeccionar `/simulador-carta`, `/en/wine-list-simulator`, `/en/simulador-carta`, reenviar sitemap y validar el grupo de 404 relacionado; evitar indexacion masiva.
