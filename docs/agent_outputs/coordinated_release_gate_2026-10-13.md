# Gate de release coordinada - 2026-10-13

## Hechos

- Candidato Git funcional: `9a1c41ac`; correccion de continuidad de idioma:
  `fa99b388`, en `codex/winerim-web-next-20260929`.
- Cloudflare esta autenticado para Pages y Workers.
- Se creo una release inmutable de Pages sin conectarla al dominio:
  `https://f97077cf.winerim-origin.pages.dev`.
- La release responde `200` en calculadora operativa ES/EN, partner ES/DE y
  diagnostico de rentabilidad ES/EN. La calculadora ES se renderizo en navegador
  con sus siete tareas y metadata propia.
- La QA de la primera candidata detecto que IT/FR/DE/PT enlazaban la calculadora
  inglesa desde su landing partner. Se corrigio el recorrido: ES/EN conservan su
  calculadora y los otros cuatro idiomas apuntan a su hub de herramientas localizado.
- Gates repetidos tras la correccion: `243/243` tests, build de produccion,
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

## Resultado final

### Despliegue

- Lovable Cloud publico solo `sitemap` y `prerender`.
  - edit: `edt-ea588f80-7c13-42b1-98f6-45cd48c9d59d`;
  - commit informado: `31af7114bc7084d61e193ae89ec023312a596075`.
- `winerim-proxy`: `c47493d8-7ef4-4f91-a58b-2b63fdb33f0e`.
- `winerim-edge-router` final: `4b4d2b66-573a-499b-b8e4-614f35105698`.
- Pages general activa: `https://f97077cf.winerim-origin.pages.dev`.
- No se tocaron SQL, migraciones, datos, contenido editorial, secretos, DNS ni Search
  Console.

### Hallazgos durante el corte

1. El facade inyectaba HTML de herramienta sobre el shell React y dejaba dos H1 para
   bots. Se retiro ese puente y se delego en el prerender limpio de `winerim-proxy`.
2. Las seis rutas partner no estaban en `REACT_ROUTES`; humanos seguian viendo el
   origen anterior. Se incorporaron y se anadio una prueba de regresion.

### QA final

- Humanos: calculadora operativa ES/EN y partner ES/EN/IT/FR/DE/PT con title, H1,
  canonical e idioma propios; sin overflow en desktop/movil.
- Interaccion: ejemplo de calculadora `11,4 h -> 6,8 h`, neto `+4,6 h/semana`.
- Bots: Googlebot y OAI con `200`, un solo H1 y canonical propio en herramientas,
  partner y simulador; articulo inexistente `404/noindex`.
- Sitemap: XML valido, `2434` URLs y cero `loc` duplicados.
- Regresion: home/Funcionalidades `200`; legales, propuestas y Catalonia
  `200/noindex`.
- Gates: `244/244` tests, build, ESLint focal, sintaxis Workers, `git diff --check` y
  auditor SEO/i18n `252/252`.

### Contradiccion registrada

- Los SHA-256 de fuente comunicados por Lovable difieren de los hashes locales pese a
  declarar copia exacta. La salida productiva coincide funcionalmente con las rutas y
  metadatos esperados, por lo que no bloquea el cierre, pero debe conservarse en la
  trazabilidad.

### Gate siguiente

- Release verde. Search Console queda listo para inspeccion selectiva y reenvio del
  sitemap; no se ha ejecutado todavia.
