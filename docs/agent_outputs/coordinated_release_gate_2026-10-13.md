# Gate de release coordinada - 2026-10-13

## Hechos

- Candidato Git: `9a1c41ac` en `codex/winerim-web-next-20260929`.
- Cloudflare esta autenticado para Pages y Workers.
- Se creo una release inmutable de Pages sin conectarla al dominio:
  `https://64badf62.winerim-origin.pages.dev`.
- La release responde `200` en calculadora operativa ES/EN, partner ES/DE y
  diagnostico de rentabilidad ES/EN. La calculadora ES se renderizo en navegador
  con sus siete tareas y metadata propia.
- Gates repetidos antes de publicar: `239/239` tests, build de produccion,
  dry-run de `winerim-proxy` y dry-run de `winerim-edge-router`.
- Versiones productivas de rollback confirmadas:
  - `winerim-edge-router`: `d3bb33d3-772c-47db-bdbb-d2cadc6e2734`;
  - `winerim-proxy`: `d893a932-b4bc-40f6-872f-034ebf736c8e`;
  - frontend general: `https://0ec77291.winerim-origin.pages.dev`.
- El conector Supabase disponible no lista el proyecto web
  `pwkqbcgjrhoyxrsmcypw`; la CLI tampoco dispone de token local y la consulta
  remota no devuelve resultado. No se puede capturar/versionar ni desplegar
  `sitemap` y `prerender` por via directa desde este entorno.
- No se modifico el trafico de `winerim.wine`, ningun Worker productivo, ninguna
  Edge Function, datos, migraciones ni Search Console.

## Decisiones

- No hacer un corte parcial. Pages queda como artefacto inmutable de candidato.
- Preservar en el futuro corte los origenes independientes de Catalonia y de las
  propuestas comerciales.
- Usar `wrangler.release-20261013.toml` para el facade una vez que las dos Edge
  Functions esten versionadas y desplegadas.
- No aplicar migraciones editoriales en este release.

## Hipotesis

- El acceso correcto a `pwkqbcgjrhoyxrsmcypw` permitira completar el corte sin
  cambios adicionales de producto.

## Contradicciones / riesgos

- Cloudflare permite preparar y desplegar sus capas, pero Supabase sigue fuera de
  la cuenta conectada; activar solo Cloudflare rompería la regla de release atomica.
- La URL de Pages es valida para QA, pero no es todavia la version servida por el
  dominio principal.

## Tareas pendientes

1. Conectar una cuenta Supabase que vea `pwkqbcgjrhoyxrsmcypw`.
2. Registrar las versiones actuales de `sitemap` y `prerender`.
3. Desplegar solo esas dos Edge Functions, sin SQL ni migraciones.
4. Desplegar `winerim-proxy` y despues el facade con
   `wrangler.release-20261013.toml`.
5. Ejecutar QA humano, Googlebot, OAI, sitemap, legales, home y funcionalidades.
6. Solo con todo verde, pasar a Search Console selectivo.
