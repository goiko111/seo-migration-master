# 2Ampliar Biblioteca del vino - bloque interno local 2026-09-01

## Hechos

- Carpeta viva usada: `/Users/GOIKO/Documents/Playground/seo-migration-master`.
- No se publico, no se desplego, no se tocaron Search Console, Supabase remoto, Cloudflare remoto ni Lovable.
- Se cerraron cambios locales para cinco pendientes internos:
  - titles duplicados de uvas/simulador via normalizacion de `SEOHead`;
  - duplicado React de `/en/simulador-carta` via rutas canonicas explicitas y redirecciones cliente;
  - title bot aleman de Biblioteca para `carnes-rojas` via normalizacion/localizacion en prerender;
  - metadata inicial del shell React para home multilingue, simulador y Biblioteca;
  - reconciliacion local documentada entre Lovable publicado, repo local y Cloudflare.
- `wrangler.pages-router.toml` apunta el router a `https://seo-migration-magic.lovable.app` con `FRONTEND_RELEASE = "lovable-ef64edbb-simulator-i18n-20260826"`.
- `wrangler.winerim.toml` apunta `ORIGIN = "https://seo-migration-magic.lovable.app"` y usa `SITE_URL = "https://winerim.wine"`.
- Lovable project knowledge consultado en modo read-only para el proyecto `2c4eed0e-6760-45f0-aeb3-ce44de8e91f1` devolvio contenido vacio.
- `.lovable/plan.md` sigue siendo historico: marcaba el simulador como MVP ES-only, contradictorio con el estado publicado posterior `ef64edbb` que ya incluyo i18n visible.

## Decisiones

- Mantener la correccion como paquete local no publicado hasta que el controlador confirme la via canonica de publicacion.
- No usar Search Console para este bloque local hasta que el paquete este publicado y revalidado en produccion.
- Tratar `SEOHead` como defensa general contra sufijos de marca con separadores `|`, `-`, `–`, `—` y `·`.
- Quitar las rutas genericas de simulador dentro de `langRoutes(prefix)` porque aceptaban slugs cruzados por idioma.

## Hipotesis

- Tras publicar frontend/Worker/prerender desde la fuente correcta, `/en/simulador-carta` deberia quedar resuelto por redirect y `/en/wine-list-simulator` deberia mantener title/canonical ingles sin duplicar marca.
- El parche de shell inicial reduce el desfase para navegacion humana; los bots cubiertos dependen de Worker/prerender tras deploy.

## Contradicciones

- El repo local contiene correcciones que no constan desplegadas en Lovable/Cloudflare.
- La fuente historica `.lovable/plan.md` dice que el simulador no tenia i18n, pero los reports y la produccion posterior documentan i18n publicada en `ef64edbb`.
- `vitest` y `vite build` arrancan pero no cierran en el entorno local actual; las validaciones completas requieren entorno estable, CI o Lovable antes de certificar publish.

## Validaciones ejecutadas

- `node --check cloudflare-worker-v3-hybrid.js`: OK.
- `node docs/agent_outputs/validate_release_gates.mjs`: OK, `66` releases por superficie y sin warnings.
- Validador estatico Node de normalizadores/router/shell: OK.
- Simulacion Node `vm` del script pre-hidratacion:
  - `/en/wine-list-simulator`: `lang=en`, title `Wine List Simulator | Winerim`, canonical correcto.
  - `/de/weinbibliothek/weinbegleitung/carnes-rojas`: `lang=de`, title `Rotes Fleisch: Weinbegleitung | Winerim`, canonical correcto.
  - `/pt/biblioteca-vinho/harmonizacoes/carnes-rojas`: `lang=pt`, title `Carnes vermelhas: harmonizacao | Winerim`, canonical correcto.
- TypeScript `transpileModule` puntual sobre archivos TS/TSX tocados: OK.
- `npm test -- ...`: bloqueado; `vitest run` no finalizo en 45s y se corto con SIGINT.
- `npm run build`: bloqueado; `vite build` no finalizo en 60s y se corto con SIGINT.
- `deno`: no disponible en PATH ni ubicaciones comunes revisadas.

## Tareas pendientes

- Publicar por la fuente canonica confirmada, sin mezclar estados.
- Revalidar produccion tras publish:
  - humano y bots en `/en/wine-list-simulator`, `/en/simulador-carta`, `/de/weinbibliothek/weinbegleitung/carnes-rojas` y una muestra de uvas EN/DE/PT;
  - title, canonical, hreflang, sitemap y ausencia de marcadores internos.
- Reintentar `npm test`/`npm run build` en un entorno que no cuelgue antes de declarar el paquete listo para publicacion amplia.
- Solo despues, pasar Search Console en modo selectivo.
