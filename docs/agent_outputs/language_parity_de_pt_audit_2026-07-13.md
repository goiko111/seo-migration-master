# Agent 3 - Auditoria DE/PT e paridad internacional

Fecha: 2026-07-13  
Scope de escritura respetado: este informe es el unico archivo editado/creado por este agente.

## Hechos

- Se leyeron primero `PROJECT_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.
- El worktree ya tenia cambios locales y archivos sin seguimiento de otros agentes/usuario. No se revirtio nada.
- La cobertura de rutas solicitadas en docs existe en source:
  - `/de/weinbibliothek/weinstile` y `/de/weinbibliothek/weinbegleitung` estan registradas en `src/App.tsx:574-577`, generadas por `src/data/wineLibraryRoutes.ts:22` y mapeadas en sitemap en `supabase/functions/sitemap/index.ts:223-227`.
  - `/de/weinbegleitung-generator` esta en `src/i18n/types.ts:371`, `src/App.tsx:853` y `cloudflare-worker-v3-hybrid.js:6054`.
  - `/pt/gerador-harmonizacoes-ia` esta en `src/i18n/types.ts:460`, `src/App.tsx:859` y `cloudflare-worker-v3-hybrid.js:6140`.
  - Hoteles/grupos DE/PT existen en `src/i18n/types.ts:334`, `src/i18n/types.ts:346`, `src/i18n/types.ts:423`, `src/i18n/types.ts:435` y en rutas React `src/App.tsx:711`, `src/App.tsx:714`, `src/App.tsx:782`, `src/App.tsx:785`.
- `LanguageProvider` conserva query/hash y genera `localePath`/`allLangPaths` desde `ROUTE_MAP` en `src/i18n/LanguageProvider.tsx:15-27` y `src/i18n/LanguageProvider.tsx:56-64`.
- Biblioteca usa rutas localizadas por helper, no por strings sueltos: `src/pages/BibliotecaVino.tsx` llama `getWineLibraryPath`/`getWineLibraryHreflang`; los labels DE/PT de Biblioteca estan en `src/data/wineLibraryI18n.ts`.
- Aprender vino tiene contenido DE/PT y rutas/hreflang propios. Las migraciones recientes de Aprender vino usan rutas correctas para DE/PT, por ejemplo `supabase/migrations/20260701064536_add_learn_wine_first_spokes.sql:1324-1354` y `supabase/migrations/20260701064536_add_learn_wine_first_spokes.sql:1399-1429`.
- Blog y Article no hacen fallback silencioso a ES para idiomas internacionales:
  - `Blog` solo usa static fallback si `lang === "es"`; para otros idiomas hace `setBlogPosts([])` en `src/pages/Blog.tsx:83-96`.
  - `ArticlePage` solo usa static fallback si `lang === "es"` en `src/pages/ArticlePage.tsx:123`; si no hay articulo internacional publicado, muestra 404/noindex en `src/pages/ArticlePage.tsx:173`.
- `ArticleRelatedContent` localiza enlaces automaticos con `localePath` y tiene overrides de labels DE/PT, pero los enlaces manuales ya insertados en DB dependen de que las migraciones hayan escrito `to` correcto.
- `sitemap` filtra articulos por `article_group`, `published_at` y releases antes de generar hreflang en `supabase/functions/sitemap/index.ts:394-401` y `supabase/functions/sitemap/index.ts:1005-1013`.
- `prerender` local incluye `oai-searchbot` en `BOT_UA_PATTERNS` (`supabase/functions/prerender/index.ts:17-22`) y genera hreflang estatico para rutas localizadas (`supabase/functions/prerender/index.ts:4249`).

## Decisiones

- Considero cubiertas las rutas Biblioteca/Aprender vino/Blog/Article basicas para DE/PT en source, sitemap, prerender local y Worker, salvo despliegue pendiente indicado en docs.
- Priorizo como P1 cualquier enlace DE/PT visible que salga de una pagina internacional hacia una ruta no canonica, legacy o inexistente cuando el template renderiza `to` directamente.
- No propongo tocar codigo en este informe. Los fixes se describen como patches recomendados con archivo/linea.
- Cuando hay dos destinos validos pero semanticamente distintos (`/analisis-carta` landing vs `/wine-list-analyzer` herramienta), marco el riesgo como canonicidad/consistencia, no como 404.

## Hallazgos priorizados

### P1 - Guias DE/PT renderizan URLs crudas y varias apuntan a slugs incorrectos

`GuideTemplate` no normaliza URLs: usa `Link to={ctaPrimaryUrl}` en `src/components/templates/GuideTemplate.tsx:208`, `Link to={data.ctaSecondaryUrl || "/demo"}` en `src/components/templates/GuideTemplate.tsx:213`, `Link to={tool.url}` en `src/components/templates/GuideTemplate.tsx:259` y `Link to={guide.url}` en `src/components/templates/GuideTemplate.tsx:278`.

Eso hace que cualquier slug antiguo en los datos DE/PT se publique tal cual para humanos. Ejemplos confirmados:

- `src/pages/GuiaFormarEquipoSala.tsx:137`: `ctaSecondaryUrl: "/wine-list-analyzer"` en DE. Si la intencion es la landing principal de analisis, cambiar a `/de/weinkarten-analyse`; si la intencion es la herramienta legacy, cambiar a `/de/weinkarten-analyzer`.
- `src/pages/GuiaFormarEquipoSala.tsx:155`: `Speisenbegleitungsgenerator` enlaza a `/wine-pairing-generator`; cambiar a `/de/weinbegleitung-generator`.
- `src/pages/GuiaFormarEquipoSala.tsx:168`: `ctaSecondaryUrl: "/wine-list-analyzer"` en PT. Si la intencion es la landing principal, cambiar a `/pt/analise-carta`; si es la herramienta legacy, cambiar a `/pt/analisador-carta-vinhos`.
- `src/pages/GuiaFormarEquipoSala.tsx:186`: `Gerador de harmonizações` enlaza a `/wine-pairing-generator`; cambiar a `/pt/gerador-harmonizacoes-ia`.
- `src/pages/GuiaWinerimSinSumiller.tsx:229`: `/de/pairing-generator`; cambiar a `/de/weinbegleitung-generator`.
- `src/pages/GuiaWinerimSinSumiller.tsx:233`: `/de/ratgeber/glaswein-einfuehren-ohne-marge-zu-verlieren`; no esta registrada. Cambiar a `/de/ratgeber/glasausschank-ohne-margenverlust`.
- `src/pages/GuiaWinerimSinSumiller.tsx:353`: `/pt/gerador-harmonizacoes-vinho`; cambiar a `/pt/gerador-harmonizacoes-ia`.
- `src/pages/GuiaWinerimSinSumiller.tsx:357`: `/pt/guias/como-implementar-vinho-a-copo-sem-perder-margem`; cambiar a `/pt/guias/como-implementar-vinho-por-copo-sem-perder-margem`.
- `src/pages/EstrategiaMaridaje.tsx:173`: `/de/weinkarten-analysator`; cambiar a `/de/weinkarten-analyse` si es CTA de analisis principal.
- `src/pages/EstrategiaMaridaje.tsx:192`: `/de/generator-speisenbegleitung`; cambiar a `/de/weinbegleitung-generator`.
- `src/pages/EstrategiaMaridaje.tsx:193`: `/de/werkzeuge/glaswein-preisrechner`; cambiar a `/de/tools/glaspreis-rechner`.
- `src/pages/EstrategiaMaridaje.tsx:194`: `/de/weinkarten-analysator`; cambiar a `/de/weinkarten-analyse`.
- `src/pages/EstrategiaMaridaje.tsx:197`: `/de/weinkarte-erstellen`; no hay ruta DE para `ComoHacerCartaVinos`; o se anade ruta DE/PT en `App` + `ROUTE_MAP`, o se sustituye temporalmente por `/de/ratgeber`.
- `src/pages/EstrategiaMaridaje.tsx:198`: `/de/mehr-wein-verkaufen-restaurant`; cambiar a `/de/wie-man-mehr-wein-im-restaurant-verkauft`.
- `src/pages/EstrategiaMaridaje.tsx:199`: `/de/glaswein-restaurant`; cambiar a `/de/wein-im-glas-restaurant`.
- `src/pages/EstrategiaMaridaje.tsx:200`: `/de/ratgeber/weinrotation-verbessern`; cambiar a `/de/ratgeber/weinrotation-im-restaurant-verbessern`.
- `src/pages/EstrategiaMaridaje.tsx:212`: `/pt/analisador-carta-vinhos`; cambiar a `/pt/analise-carta` si es CTA de analisis principal.
- `src/pages/EstrategiaMaridaje.tsx:231`: `/pt/gerador-harmonizacoes`; cambiar a `/pt/gerador-harmonizacoes-ia`.
- `src/pages/EstrategiaMaridaje.tsx:232`: `/pt/ferramentas/calculadora-preco-copo`; cambiar a `/pt/ferramentas/calculadora-preco-vinho-por-copo`.
- `src/pages/EstrategiaMaridaje.tsx:233`: `/pt/analisador-carta-vinhos`; cambiar a `/pt/analise-carta`.
- `src/pages/EstrategiaMaridaje.tsx:236`: `/pt/como-fazer-carta-vinhos`; no hay ruta PT registrada para `ComoHacerCartaVinos`; o se anade ruta PT, o se sustituye temporalmente por `/pt/guias`.
- `src/pages/EstrategiaMaridaje.tsx:237`: `/pt/vender-mais-vinho-restaurante`; cambiar a `/pt/como-vender-mais-vinho-restaurante`.
- `src/pages/EstrategiaMaridaje.tsx:238`: `/pt/vinho-a-copo`; cambiar a `/pt/vinho-por-copo-restaurante`.
- `src/pages/EstrategiaMaridaje.tsx:239`: `/pt/guias/melhorar-rotacao-vinhos`; cambiar a `/pt/guias/como-melhorar-rotacao-vinhos-restaurante`.

Patch recomendado:

1. Corregir los valores de datos anteriores.
2. Considerar una defensa en `GuideTemplate`: si `url` empieza por `/` y no lleva prefijo internacional valido, aplicar `localePath(url)`; esto no reemplaza la limpieza de datos porque no corrige slugs ya localizados pero antiguos (`/de/pairing-generator`, `/pt/gerador-harmonizacoes-vinho`).

### P1 - Mismo patron en `PainTemplate` e `InternalLinks`: DE/PT directos quedan sin normalizar

`PainTemplate` usa URLs crudas en `src/components/templates/PainTemplate.tsx:237`, `src/components/templates/PainTemplate.tsx:241`, `src/components/templates/PainTemplate.tsx:364` y `src/components/templates/PainTemplate.tsx:405`. `InternalLinks` tambien renderiza `Link to={link.to}` sin localizacion en `src/components/seo/InternalLinks.tsx:75-77`.

Casos DE/PT detectados:

- `src/pages/CartaNoVende.tsx:228`, `src/pages/CartaNoVende.tsx:268`: `/de/weinkarten-analysator`; decidir si debe ser `/de/weinkarten-analyse` (landing de analisis) o `/de/weinkarten-analyzer` (herramienta legacy registrada).
- `src/pages/CartaNoVende.tsx:265`: `/de/weinkarte-erstellen`; no hay ruta DE para `ComoHacerCartaVinos`.
- `src/pages/CartaNoVende.tsx:266`: `/de/mehr-wein-verkaufen-restaurant`; cambiar a `/de/wie-man-mehr-wein-im-restaurant-verkauft`.
- `src/pages/CartaNoVende.tsx:267`: `/de/weinmargen-rechner`; cambiar a `/de/wein-margen-rechner`.
- `src/pages/CartaNoVende.tsx:281`, `src/pages/CartaNoVende.tsx:321`: `/pt/analisador-carta-vinhos`; decidir si `/pt/analise-carta` o herramienta `/pt/analisador-carta-vinhos`.
- `src/pages/CartaNoVende.tsx:318`: `/pt/como-fazer-carta-vinhos`; no hay ruta PT registrada.
- `src/pages/CartaNoVende.tsx:319`: `/pt/vender-mais-vinho-restaurante`; cambiar a `/pt/como-vender-mais-vinho-restaurante`.
- `src/pages/IARestaurantes.tsx:533`, `src/pages/IARestaurantes.tsx:536`, `src/pages/IARestaurantes.tsx:741`, `src/pages/IARestaurantes.tsx:744`: CTAs hardcodeadas a `/demo` y `/analisis-carta`; en DE/PT deberian usar `localePath("/demo")` y `localePath("/analisis-carta")`.
- `src/pages/IARestaurantes.tsx:405`: `/de/weinkarten-analyzer`; ruta existe como legacy tool, pero no es la landing canonica `/de/weinkarten-analyse`.
- `src/pages/IARestaurantes.tsx:477`: `/pt/gerador-harmonizacoes-vinho`; cambiar a `/pt/gerador-harmonizacoes-ia`.
- `src/pages/IARestaurantes.tsx:478`: `/pt/analisador-carta-de-vinhos`; cambiar a `/pt/analise-carta` o `/pt/analisador-carta-vinhos` segun intencion.
- `src/pages/EjemplosCarta.tsx:640-641`: CTA hardcodeada a `/analisis-carta`; usar `localePath("/analisis-carta")`.
- `src/pages/EjemplosCarta.tsx:386`: `/de/weinkarten-analysator`; cambiar segun intencion a `/de/weinkarten-analyse` o `/de/weinkarten-analyzer`.
- `src/pages/EjemplosCarta.tsx:452`: `/pt/analisador-carta-vinhos`; revisar contra destino canonico.
- `src/pages/WhatIsWinerim.tsx:420-421`: CTAs hardcodeadas a `/demo` y `/precios`; usar `localePath("/demo")` y `localePath("/precios")`.
- `src/pages/WhatIsWinerim.tsx:359-361`: `/de/weinkarten-analysator` y `/de/speisenbegleitungs-generator`; cambiar a `/de/weinkarten-analyse` o `/de/weinkarten-analyzer` segun intencion, y `/de/weinbegleitung-generator`.
- `src/pages/WhatIsWinerim.tsx:365-367`: `/pt/analisador-carta-vinhos` y `/pt/gerador-harmonizacoes`; cambiar a destino canonico elegido y `/pt/gerador-harmonizacoes-ia`.

Patch recomendado:

- Donde el componente ya conoce `lang`, usar `useLanguage().localePath` en CTAs (`IARestaurantes`, `EjemplosCarta`, `WhatIsWinerim`).
- Para listas `InternalLinks`, pasar `links={...map(l => ({ ...l, to: localePath(l.to) }))}` solo si los datos estan en base ES. Para datos ya localizados, corregir cada slug obsoleto.
- En `PainTemplate`, igual que en `GuideTemplate`, aplicar una normalizacion solo para rutas base no prefijadas y limpiar los slugs ya localizados malos.

### P1 - Migraciones antiguas dejan related_links DE/PT al generator legacy

Las migraciones antiguas de cluster de Biblioteca insertaron links manuales no canonicos:

- `supabase/migrations/20260601102000_add_localized_wine_library_blog_cluster.sql:477`: `"/de/wine-pairing-generator"`.
- `supabase/migrations/20260601102000_add_localized_wine_library_blog_cluster.sql:590`: `"/pt/wine-pairing-generator"`.
- Duplicado historico en `supabase/migrations/20260601100256_af099b12-357c-4981-959a-9de326aee33f.sql:405` y `supabase/migrations/20260601100256_af099b12-357c-4981-959a-9de326aee33f.sql:503`.

La migracion nueva `supabase/migrations/20260713112000_fix_learn_wine_localized_pairing_links.sql:34-59` corrige `/wine-pairing-generator` y `/de/weinbibliothek/stile`, pero esta acotada a categorias Learn Wine/Aprender vino. No necesariamente toca estos articulos antiguos de Biblioteca/blog.

Patch recomendado: crear una migracion correctiva global, no limitada a categorias Learn Wine:

```sql
UPDATE public.articles
SET related_links = replace(
  replace(
    replace(COALESCE(related_links, '[]'::jsonb)::text,
      '"/de/wine-pairing-generator"', '"/de/weinbegleitung-generator"'),
    '"Pairing Generator"', '"Weinbegleitung-Generator"'),
  '"/pt/wine-pairing-generator"', '"/pt/gerador-harmonizacoes-ia"'
)::jsonb
WHERE lang IN ('de', 'pt')
  AND COALESCE(related_links, '[]'::jsonb)::text LIKE '%wine-pairing-generator%';
```

Si se quiere ser mas conservador, dividir DE/PT en dos `UPDATE` para no tocar labels PT con el replace de label DE.

### P2 - JSON-LD de guias fuerza "Inicio" en todos los idiomas

`GuideTemplate` inyecta schema con breadcrumb `name: "Inicio"` en `src/components/templates/GuideTemplate.tsx:172-178`. Esto no se ve en UI, pero si lo ve el bot en DE/PT.

Patch recomendado:

- Anadir un map local, por ejemplo:

```ts
const homeNames = { es: "Inicio", en: "Home", it: "Home", fr: "Accueil", de: "Startseite", pt: "Inicio" };
```

- Cambiar `name: "Inicio"` por `name: homeNames[lang] || homeNames.es`.

### P2 - `WineListAnalyzer` genera URL canonica fija ES/legacy para todos los idiomas

`src/pages/WineListAnalyzer.tsx:541-542` pasa `url="https://winerim.wine/wine-list-analyzer"` aunque `hreflang={allLangPaths("/wine-list-analyzer")}` genera variantes DE/PT (`/de/weinkarten-analyzer`, `/pt/analisador-carta-vinhos`). Si se mantiene la herramienta legacy internacional, su canonical debe ser `https://winerim.wine${localePath("/wine-list-analyzer")}`.

Patch recomendado en `WineListAnalyzer.tsx`:

- Extraer `localePath` de `useLanguage`.
- Usar `url={`https://winerim.wine${localePath("/wine-list-analyzer")}`}`.

### P2 - Blog/Article estan bien contra fallback ES, pero los manual links de DB aun pueden romper paridad

`ArticlePage` no sirve ES en rutas internacionales cuando falta traduccion, lo cual cumple la decision de no fallback silencioso. El riesgo restante esta en `related_links` manuales: `ArticleRelatedContent` localiza reglas automaticas, pero si DB ya trae `/de/wine-pairing-generator` o `/pt/wine-pairing-generator`, los va a renderizar como manual link.

Patch recomendado: cubrirlo con migracion global de `related_links` descrita en P1 y despues consultar Supabase:

```sql
select lang, slug, related_links
from public.articles
where lang in ('de', 'pt')
  and related_links::text ~ '(wine-pairing-generator|pairing-generator|gerador-harmonizacoes-vinho|generator-speisenbegleitung)';
```

### P3 - Etiquetas inglesas no criticas en DE/PT

Hay labels como `Pairings` en contenido prerender DE (`supabase/functions/prerender/index.ts:4011`, `supabase/functions/prerender/index.ts:4366`) y en algunas migraciones DE (`Pairing-Generator` en `supabase/migrations/20260701064536_add_learn_wine_first_spokes.sql:1324-1354`). No rompen rutas, pero conviene decidir si se acepta terminologia inglesa en DE o se cambia a `Weinbegleitung`/`Weinbegleitung-Generator` para consistencia editorial.

## Hipotesis

- Es probable que el despliegue pendiente de `prerender` resuelva la identificacion OAI en produccion, porque localmente ya incluye `oai-searchbot`.
- Si las migraciones antiguas de junio ya se aplicaron en produccion, los `related_links` malos pueden seguir vivos aunque el codigo actual tenga overrides correctos.
- Las rutas legacy de herramientas (`/de/weinkarten-analyzer`, `/pt/analisador-carta-vinhos`, `/de/weinbegleitung-generator`, `/pt/gerador-harmonizacoes-ia`) parecen intencionadas para herramientas, mientras `/de/weinkarten-analyse` y `/pt/analise-carta` son la landing principal de analisis. La decision de producto debe fijar cual usar en CTAs de auditoria.

## Tareas pendientes recomendadas

1. Aplicar una migracion global para limpiar `related_links` DE/PT de articulos ya publicados.
2. Corregir las URLs crudas en paginas `GuideTemplate`, `PainTemplate` e `InternalLinks` listadas arriba.
3. Decidir una regla de destino para "analizar carta":
   - oferta/landing: `/de/weinkarten-analyse`, `/pt/analise-carta`;
   - herramienta legacy: `/de/weinkarten-analyzer`, `/pt/analisador-carta-vinhos`.
4. Despues de los fixes, validar con `npm run build` y barrido `rg` de slugs obsoletos:

```bash
rg -n "/de/(pairing-generator|generator-speisenbegleitung|weinkarten-analysator|weinkarte-erstellen|mehr-wein-verkaufen-restaurant|glaswein-restaurant)|/pt/(gerador-harmonizacoes-vinho|gerador-harmonizacoes\"|analisador-carta-de-vinhos|como-fazer-carta-vinhos|vender-mais-vinho-restaurante|vinho-a-copo\"|guias/melhorar-rotacao-vinhos)|/de/wine-pairing-generator|/pt/wine-pairing-generator" src supabase
```

5. Desplegar `sitemap` y `prerender` tras las migraciones pendientes y comprobar las rutas:
   - `https://winerim.wine/de/weinbibliothek/weinstile`
   - `https://winerim.wine/de/weinbibliothek/weinbegleitung`
   - `https://winerim.wine/de/weinbegleitung-generator`
   - `https://winerim.wine/pt/gerador-harmonizacoes-ia`
   - `https://winerim.wine/de/loesungen/hotels`
   - `https://winerim.wine/pt/solucoes/hoteis`

## Comandos usados

```bash
sed -n '1,220p' PROJECT_CONTEXT.md
sed -n '1,220p' CURRENT_STATE.md
sed -n '1,220p' DECISIONS_LOG.md
sed -n '1,220p' NEXT_STEPS.md
git status --short
rg --files
find docs/agent_outputs -maxdepth 1 -type f -print
rg -n "Speisenbegleitungsgenerator|Gerador de harmonizações|ctaSecondaryUrl: \"/wine-list-analyzer\"|relatedTools|/wine-pairing-generator" src/pages/GuiaFormarEquipoSala.tsx
rg -n "Food-Pairing-Generator|gerador-harmonizacoes-vinho|pairing-generator|relatedTools|relatedGuides|glasausschank|marge" src/pages/GuiaWinerimSinSumiller.tsx
rg -n "generator-speisenbegleitung|werkzeuge/glaswein|weinkarten-analysator|gerador-harmonizacoes\"|calculadora-preco-copo|analisador-carta|weinkarte-erstellen|mehr-wein|glaswein-restaurant|vinho-a-copo|melhorar-rotacao|relatedTools|relatedGuides|como-fazer-carta" src/pages/EstrategiaMaridaje.tsx
rg -n "Inicio|tool.url|guide.url|data.slug|ctaPrimaryUrl|ctaSecondaryUrl" src/components/templates/GuideTemplate.tsx
sed -n '166,244p' src/pages/EstrategiaMaridaje.tsx
sed -n '220,362p' src/pages/GuiaWinerimSinSumiller.tsx
sed -n '132,190p' src/pages/GuiaFormarEquipoSala.tsx
rg -n "wine-pairing-generator|analisis-carta|herramientas/calculadora-precio-vino-por-copa|como-vender-mas-vino|vino-por-copa-restaurante|como-mejorar-la-rotacion|como-implantar-vino-por-copa|como-hacer-una-carta|aprender-vino|soluciones/hoteles|soluciones/grupos-restauracion" src/i18n/types.ts src/App.tsx
rg -n "weinbegleitung-generator|gerador-harmonizacoes-ia|weinbibliothek|biblioteca-vinho|solucoes/grupos|loesungen/restaurant|loesungen/hotels|solucoes/hoteis|wein-lernen|aprender-vinho" src/App.tsx src/i18n/types.ts src/data/wineLibraryRoutes.ts
rg -n "/de/wine-pairing-generator|/pt/wine-pairing-generator|category IN|WHERE|related_links|replace\(" supabase/migrations/20260601102000_add_localized_wine_library_blog_cluster.sql supabase/migrations/20260601100256_af099b12-357c-4981-959a-9de326aee33f.sql supabase/migrations/20260713112000_fix_learn_wine_localized_pairing_links.sql
rg -n "BOT_UA_PATTERNS|oai-searchbot|/de/weinbibliothek|weinbegleitung|harmonizacoes|renderArticle|isPublishedAtReleased|article_group|hreflangForPath|/de/weinbegleitung-generator|/pt/gerador-harmonizacoes-ia" supabase/functions/prerender/index.ts
rg -n "LOCALIZED_ROUTES|/de/weinbibliothek|weinbegleitung|harmonizacoes|articleHreflangBlock|isPublishedAtReleased|ARTICLE_RELEASES|article_group|/pt/gerador-harmonizacoes-ia|/de/weinbegleitung-generator|solucoes/grupos|loesungen/restaurant|loesungen/hotels|solucoes/hoteis" supabase/functions/sitemap/index.ts cloudflare-worker-v3-hybrid.js
nl -ba src/pages/EstrategiaMaridaje.tsx | sed -n '168,242p'
nl -ba src/pages/GuiaWinerimSinSumiller.tsx | sed -n '224,360p'
nl -ba src/pages/GuiaFormarEquipoSala.tsx | sed -n '134,188p'
nl -ba src/components/templates/GuideTemplate.tsx | sed -n '150,282p'
rg -n "servicepersonal-fuer-weinverkauf-schulen|glaswein-einfuehren-ohne-marge|glasausschank-ohne-margenverlust|como-formar-equipa-sala-vender-vinho|como-implementar-vinho-a-copo|como-implementar-vinho-por-copo" src/i18n/types.ts src/App.tsx cloudflare-worker-v3-hybrid.js supabase/functions/sitemap/index.ts
rg -n "como-fazer-uma-carta|como-hacer-una-carta|weinkarte-erstellen|ComoHacerCartaVinos" src/i18n/types.ts src/App.tsx cloudflare-worker-v3-hybrid.js supabase/functions/sitemap/index.ts supabase/functions/prerender/index.ts
rg -n "/de/wine-pairing-generator|/pt/wine-pairing-generator|/de/pairing-generator|/pt/gerador-harmonizacoes-vinho|/de/generator-speisenbegleitung|/pt/gerador-harmonizacoes|/de/weinkarten-analysator|/pt/analisador-carta-vinhos" src supabase/functions cloudflare-worker-v3-hybrid.js supabase/migrations
rg -n "wine-list-analyzer|weinkarten-analyse|analise-carta|wine-list-analysis" src/i18n/types.ts src/App.tsx src/pages/GuiaFormarEquipoSala.tsx src/pages/EstrategiaMaridaje.tsx cloudflare-worker-v3-hybrid.js supabase/functions/sitemap/index.ts supabase/functions/prerender/index.ts
nl -ba src/pages/CartaNoVende.tsx | sed -n '220,325p'
nl -ba src/pages/IARestaurantes.tsx | sed -n '448,490p'
nl -ba src/pages/GuiaCartaGrupoRestauracion.tsx | sed -n '150,176p'
nl -ba src/pages/EjemplosCarta.tsx | sed -n '378,456p'
nl -ba src/pages/WhatIsWinerim.tsx | sed -n '348,370p'
rg -n "<Link|to=\{|relatedLinks|data\.links|item\.url|link\.url|link\.to|ctaPrimaryUrl|localePath" src/pages/CartaNoVende.tsx src/pages/IARestaurantes.tsx src/pages/EjemplosCarta.tsx src/pages/WhatIsWinerim.tsx
nl -ba src/pages/IARestaurantes.tsx | sed -n '489,620p'
nl -ba src/pages/IARestaurantes.tsx | sed -n '720,765p'
nl -ba src/pages/EjemplosCarta.tsx | sed -n '620,665p'
rg -n "links\.map|link\.to|t\.links|RelatedContent|ArticleRelatedContent|to=\{link" src/pages/WhatIsWinerim.tsx src/pages/IARestaurantes.tsx src/pages/EjemplosCarta.tsx
rg -n "const InternalLinks|function InternalLinks|export .*InternalLinks|to=\{.*to|localePath|link\.to|link\.url" src/components src/pages
rg -n "PainTemplate|relatedLinks|ctaPrimaryUrl|Link to|localePath|data\.cta|link\.url" src/components src/pages
nl -ba src/i18n/types.ts | sed -n '360,462p'
nl -ba src/App.tsx | sed -n '718,862p'
rg -n "localePath\(\"/wine-list-analyzer\"|/de/weinkarten-analysator|/de/weinkarten-analyzer|/pt/analisador-carta-vinhos|/pt/analisador-carta-de-vinhos|/en/wine-list-analyzer|/wine-list-analyzer" src/pages src/components src/i18n/types.ts
rg -n "weinkarten-analyzer|analisador-carta-vinhos|analisador-carta-de-vinhos|weinkarten-analysator|wine-list-analyzer" src/App.tsx supabase/functions/sitemap/index.ts supabase/functions/prerender/index.ts cloudflare-worker-v3-hybrid.js
nl -ba src/pages/WineListAnalyzer.tsx | sed -n '535,548p'
nl -ba src/components/seo/InternalLinks.tsx | sed -n '57,90p'
```
