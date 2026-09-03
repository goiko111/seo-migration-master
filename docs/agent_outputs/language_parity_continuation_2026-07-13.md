# Language parity continuation audit — 2026-07-13

Agente 2 — idiomas/paridad. Alcance auditado: `src/pages`, `src/components`, `src/i18n`, `src/data` y rutas SEO relacionadas, con foco en DE/PT/EN/IT/FR/ES, rutas antiguas `/wine-pairing-generator`, `/analisis-carta`, `/wine-list-analyzer`, textos ES dentro de bloques DE/PT y señales canonical/hreflang.

## Contexto leido

- `PROJECT_CONTEXT.md`
- `CURRENT_STATE.md`
- `DECISIONS_LOG.md`
- `NEXT_STEPS.md`

El repo ya estaba sucio antes de esta auditoria. No se revirtieron cambios existentes.

## Resumen ejecutivo

La arquitectura base de idioma esta razonablemente alineada:

- `ROUTE_MAP` contiene equivalentes para ES/EN/IT/FR/DE/PT de herramientas principales, producto, soluciones, guias y Biblioteca.
- `LanguageProvider.localePath()` conserva query/hash y localiza rutas raiz.
- `LanguageSwitcher` hace reverse lookup y trata rutas de Biblioteca/articulo de forma especifica.
- `App.tsx` ya declara rutas localizadas DE/PT para Biblioteca, herramientas legacy y muchas guias.
- `SEOHead` acepta `hreflang`, y muchas paginas usan `allLangPaths(...)` o helpers de Biblioteca.

Los riesgos reales no estan tanto en el mapa central, sino en datos de pagina con URLs ya prefijadas (`/de/...`, `/pt/...`) que se consideran finales y no pasan por `localePath`. Ahi aparecen slugs antiguos, inventados o no coincidentes con `ROUTE_MAP`/`App.tsx`.

## Fixes pequenos aplicados

Se corrigieron rutas hardcodeadas con equivalente claro en `ROUTE_MAP`/`App.tsx`.

Archivos editados:

- `src/pages/AnalizaCarta.tsx`
  - PT canonical de `/pt/analise-carta-de-vinhos` a `/pt/analise-carta`.
  - DE link software de `/de/software-weinkarte` a `/de/weinkarten-software`.
  - DE tools de `/de/werkzeuge` a `/de/tools`.
  - PT software de `/pt/software-carta-de-vinhos` a `/pt/software-carta-vinhos`.
- `src/pages/CartaCrecimiento.tsx`
  - DE canonical de `/de/losungen/weinkarte-wachstum` a `/de/loesungen/wachsende-weinkarte`.
  - PT canonical de `/pt/solucoes/carta-crescimento` a `/pt/solucoes/carta-vinhos-crescimento`.
- `src/pages/InteligenciaCompras.tsx`
  - PT canonical de `/pt/solucoes/inteligencia-de-compras` a `/pt/solucoes/inteligencia-compras`.
- `src/pages/BenchmarksPlaybooks.tsx`
  - DE `/de/leitfaden` a `/de/ratgeber`.
  - DE `/de/fallstudien` a `/de/erfolgsgeschichten`.
  - PT `/pt/estudos-caso` a `/pt/casos-de-sucesso`.
  - PT `/pt/comparacoes` a `/pt/comparativos`.
- `src/pages/IARestaurantes.tsx`
  - DE pairing tool a `/de/weinbegleitung-generator`.
  - DE grupos a `/de/loesungen/restaurant-gruppen`.
  - PT software a `/pt/software-carta-vinhos`.
  - PT pairing/analyzer a `/pt/gerador-harmonizacoes-ia` y `/pt/analise-carta`.
  - CTAs principales pasan por `localePath("/demo")` y `localePath("/analisis-carta")`.
- `src/pages/DiagnosticoVinoPorCopa.tsx`
  - DE glass price calculator a `/de/tools/glaspreis-rechner`.
  - PT by-glass price calculator a `/pt/ferramentas/calculadora-preco-vinho-por-copo`.
- `src/pages/PrecioVinoRestaurante.tsx`
  - DE pricing tool a `/de/wein-pricing-tool`.
  - DE margin calculator a `/de/wein-margen-rechner`.
  - PT pricing tool a `/pt/ferramenta-pricing-vinhos`.

## Hallazgos principales

### 1. Rutas antiguas: muchas ocurrencias son falsos positivos, pero quedan riesgos

`rg` encuentra 213 ocurrencias de `/wine-pairing-generator`, `/analisis-carta` y `/wine-list-analyzer` en `src/pages` + `src/components`.

No todas son problema:

- Si se renderizan con `localePath("/analisis-carta")`, `localePath("/wine-list-analyzer")` o `localePath("/wine-pairing-generator")`, son correctas.
- En `GuideTemplate`, `PainTemplate`, `InternalLinks`, `ArticleRelatedContent` y `ArticleToolsSection`, URLs raiz sin prefijo se localizan segun idioma.

Riesgo pendiente:

- Algunas paginas usan `<Link to="/analisis-carta">` o `<Link to="/wine-list-analyzer">` directamente dentro de componentes multilingues. Ejemplos detectados: `PrecioVinoRestaurante.tsx`, `ComoOrganizarCarta.tsx`, `CartaVinosRentable.tsx`, `CasosExito.tsx`, templates de recursos/benchmarks y componentes simulator. Esto debe normalizarse con `localePath` en una tanda separada.

### 2. DE/PT tienen slugs prefijados que no coinciden con rutas declaradas

Patron: bloques DE/PT guardan URLs ya localizadas, por ejemplo `/de/...` o `/pt/...`. Como `InternalLinks` y las plantillas preservan prefijos localizados, no hay autocorreccion.

Ejemplos pendientes:

- `GuiaCanibalizacionVinos.tsx`: slugs/crosslinks DE/PT como `/de/ratgeber/wein-kannibalisierung-auf-der-karte-erkennen`, `/pt/guias/como-detetar-canibalizacao-vinhos-carta`, `/de/tools/rechner-totbestand`, `/pt/guias/como-detetar-vinhos-mortos`, etc. no coinciden de forma consistente con `ROUTE_MAP`.
- `GuiaVinoPorCopaSinPerderMargen.tsx`: DE/PT `slug` y related links difieren de las rutas declaradas (`/de/ratgeber/glasausschank-ohne-margenverlust`, `/pt/guias/como-implementar-vinho-por-copo-sem-perder-margem`).
- `RotacionVinos.tsx`: DE/PT `slug` difiere de `ROUTE_MAP` para la guia de rotacion.
- `AnalizaCarta.tsx`: quedan enlaces DE/PT a blog/recursos que pueden ser rutas no declaradas o dependientes de datos CMS.
- `AuditorMultiLocal.tsx`, `EjemplosCarta.tsx`, `ComoOrganizarCarta.tsx`, `CartaPapelVsDigital.tsx`, `DiagnosticoVinoPorCopa.tsx`: varios enlaces localizados parecen inventados o antiguos.

No se corrigio masivamente porque algunos pueden depender de `SeoPage`, recursos CMS o futuras rutas; requiere decidir si se crean rutas, redirects o se reemplazan por equivalentes existentes.

### 3. Canonicals/hreflang

Bien:

- Herramientas principales (`WineListAnalyzer`, `WinePairingGenerator`) usan `url={...localePath(...)}` y `hreflang={allLangPaths(...)}`.
- `AnalizaCarta` usa `allLangPaths("/analisis-carta")`.
- Blog/articulo ya vienen de la tanda previa con fallback ES eliminado.

Pendiente:

- `GuideTemplate` y `PainTemplate` construyen `SEOHead.url` con `https://winerim.wine/${data.slug}` y no reciben `hreflang`. Si `data.slug` difiere de `ROUTE_MAP` o de `App.tsx`, el canonical visible puede no coincidir con la URL real renderizada.
- Varias guias DE/PT tienen `slug` distinto a la ruta declarada. Esto es el riesgo SEO mas estructural de la auditoria.

### 4. Textos ES dentro de bloques DE/PT

Se detectan restos puntuales, pero no un fallback ES global nuevo:

- `RestauranteSinSumiller.tsx`, `Problemas.tsx` y algunos bloques compartidos usan condicion `lang === "es" ? ... : "Analyze..."`, por lo que DE/PT pueden recibir texto EN generico, no ES.
- En `WinePairingGenerator.tsx`, DE/PT tienen copy sin acentos transliterados (`fuer`, `recomendacoes`, etc.) y algunas etiquetas aun en ingles (`Wine Pairing Generator`). No rompe rutas, pero es deuda de calidad linguistica.
- En `SEOHead.tsx` hay defaults estructurados en ES; solo afectan cuando la pagina no pasa descripcion/structured data propia.

## Recomendacion de siguiente tanda

1. Crear un helper unico para enlaces internos prefijados:
   - Si el enlace es raiz ES, usar `localePath`.
   - Si ya viene prefijado, validar contra una tabla de rutas resolubles o normalizar desde ruta ES canonica.
2. Auditar todas las paginas `GuideTemplate`/`PainTemplate`:
   - alinear `data.slug` con `ROUTE_MAP`;
   - anadir `hreflang` cuando exista familia multilingue real;
   - sustituir related links DE/PT inventados por rutas existentes.
3. Normalizar `<Link to="/analisis-carta">` y `<Link to="/wine-list-analyzer">` directos en paginas multilingues a `localePath(...)`.
4. Decidir politica para rutas DE/PT no declaradas:
   - crear routes/redirects si tienen valor SEO;
   - o reemplazarlas por equivalentes existentes.

## Validacion

- `git diff --check -- src/pages/...`: OK.
- `./node_modules/.bin/tsc --noEmit --pretty false -p tsconfig.json`: OK.

