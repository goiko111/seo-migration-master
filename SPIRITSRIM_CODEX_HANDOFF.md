# Spiritsrim Codex Handoff

## Objetivo

Construir `Spiritsrim`, la hermana gemela de Winerim para destilados, usando Winerim como base tecnica, estructural y SEO, pero sustituyendo completamente el dominio semantico de vino por destilados, cocteleria, backbar y servicio de bebidas espirituosas.

## Fuente de verdad Winerim

Antes de empezar cualquier tarea nueva, leer estos documentos en este orden:

1. `PROJECT_CONTEXT.md`
2. `CURRENT_STATE.md`
3. `DECISIONS_LOG.md`
4. `NEXT_STEPS.md`

Reglas operativas heredadas:

- Separar hechos, decisiones, hipotesis y tareas pendientes.
- No asumir estado no documentado.
- Si hay contradicciones entre documentos, codigo, Lovable, produccion o Search Console, senalarlas.
- Al cerrar una sesion, actualizar `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.

## Contexto tecnico de Winerim

Repositorio base: `/Users/GOIKO/seo-migration-master`.

Stack:

- Vite + React + TypeScript.
- React Router.
- Tailwind + shadcn/ui + Radix.
- `lucide-react` para iconos.
- Supabase Edge Functions.
- Cloudflare Worker como proxy/SEO layer.
- Lovable como via operativa habitual para desplegar frontend y Edge Functions.

Comandos principales:

```bash
npm install
npm run dev
npm run test -- --run
npm run build
npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts
git diff --check
```

Scripts actuales a revisar antes de reutilizar:

- `deploy:supabase:seo`: apunta al proyecto Supabase de Winerim.
- `deploy:worker`: apunta a `winerim-proxy`, `winerim.wine` y origen Lovable Winerim.
- Para Spiritsrim deben cambiarse proyecto Supabase, worker name, origen Lovable, dominio y URLs.

## Estado SEO Winerim que conviene replicar

Winerim ya tiene una infraestructura SEO fuerte:

- Rutas multilingues en `es`, `en`, `it`, `fr`, `de`, `pt`.
- Canonical propio por idioma.
- Hreflang completo, incluido `x-default`.
- Sitemap dinamico via Supabase Edge Function `sitemap`.
- Prerender para Googlebot y crawlers via Supabase Edge Function `prerender`.
- Cloudflare Worker que decide entre experiencia humana, redirects, sitemap y prerender.
- `robots.txt`, `llms.txt` y `llms-full.txt`.
- Blog con rutas localizadas `/{lang}/article/{slug}`.
- Biblioteca semantica con schema `WebPage`, `Article`, `DefinedTermSet` y `DefinedTerm`.
- Enlaces internos estrategicos entre entidades.

No copiar los valores de dominio ni IDs de Winerim. Copiar el patron.

## Proyecto Lovable correcto de Winerim

El proyecto correcto de Winerim es:

- `https://lovable.dev/projects/2c4eed0e-6760-45f0-aeb3-ce44de8e91f1`
- Nombre documentado: `Web Winerim`

No usar como base de Winerim:

- `https://lovable.dev/projects/ebb36746-82ff-43c3-86c1-558573beddcd`
- Ese proyecto pertenece a `Crim`, no a la web publica Winerim.

Para Spiritsrim se necesita un proyecto Lovable nuevo o un duplicado limpio.

## Archivos clave a estudiar antes de migrar

Routing y app:

- `src/App.tsx`
- `src/i18n/LanguageProvider.tsx`
- `src/i18n/LanguageContext.tsx`
- `src/i18n/types.ts`

Home, marca y navegacion:

- `src/pages/Index.tsx`
- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`
- `src/components/landing/*`
- `src/components/SEOHead.tsx`

Biblioteca del vino:

- `src/pages/BibliotecaVino.tsx`
- `src/pages/GrapesHub.tsx`
- `src/pages/GrapeDetail.tsx`
- `src/pages/RegionsHub.tsx`
- `src/pages/RegionCountry.tsx`
- `src/pages/RegionDetail.tsx`
- `src/pages/StylesHub.tsx`
- `src/pages/StyleDetail.tsx`
- `src/pages/PairingsHub.tsx`
- `src/pages/PairingDetail.tsx`
- `src/pages/GuiaServicio.tsx`
- `src/pages/GlosarioVino.tsx`
- `src/components/biblioteca/StrategicWineLibraryRoutes.tsx`
- `src/components/biblioteca/RelatedWineLibraryLinks.tsx`
- `src/components/biblioteca/WineLibraryOperationalDepth.tsx`
- `src/components/seo/wineLibrarySchema.ts`

Datos de biblioteca:

- `src/data/wineLibraryRoutes.ts`
- `src/data/wineLibraryI18n.ts`
- `src/data/wineLibraryLinks.ts`
- `src/data/wineLibraryLegacyRedirects.ts`
- `src/data/grapesLibrary.ts`
- `src/data/grapesLibraryI18n.ts`
- `src/data/regionsLibrary.ts`
- `src/data/regionsLibraryI18n.ts`
- `src/data/stylesLibrary.ts`
- `src/data/stylesLibraryI18n.ts`
- `src/data/pairingsLibrary.ts`
- `src/data/pairingsLibraryI18n.ts`
- `src/data/wineLibraryEditorial.ts`
- `src/data/wineLibraryEditorialExpansion.ts`
- `src/data/wineLibraryRegionEditorial.ts`
- `src/data/wineLibraryStyleEditorial.ts`
- `src/data/wineLibraryPairingEditorial.ts`

Blog, recursos y autoridad:

- `src/data/articles.ts`
- `src/pages/Blog.tsx`
- `src/pages/ArticlePage.tsx`
- `src/components/article/*`
- `src/data/newResources.ts`
- `src/data/newResourcesI18n.ts`

SEO server-side:

- `supabase/functions/sitemap/index.ts`
- `supabase/functions/prerender/index.ts`
- `supabase/functions/redirects/index.ts`
- `cloudflare-worker-v3-hybrid.js`
- `public/robots.txt`
- `public/llms.txt`
- `public/llms-full.txt`

Tests relevantes:

- `src/test/*wine*`
- `src/test/*library*`
- `src/test/*seo*`
- Cualquier test que valide sitemap, prerender, idioma, canonical, schema o rutas.

## Que se debe clonar de Winerim

Clonar patrones:

- Arquitectura de rutas multilingues.
- Sistema de SEOHead.
- Estructura de sitemap/prerender/Worker.
- Sistema de biblioteca semantica.
- Schema enriquecido por entidad.
- Blog con articulos localizados.
- Recursos descargables y formularios de lead.
- Componentes de landing, navbar, footer, CTA, casos, herramientas y verticales.
- Validaciones locales antes de deploy.
- Protocolo de Lovable + validacion productiva independiente.

No clonar literalmente:

- Copy de vino.
- Dominio `winerim.wine`.
- IDs de Supabase Winerim.
- Worker `winerim-proxy`.
- Search Console Winerim.
- Logos/clientes si no aplican a Spiritsrim.
- Claims comerciales de vino si no son ciertos para destilados.
- Biblioteca del vino como contenido final.

## Posicionamiento recomendado de Spiritsrim

Spiritsrim deberia ser:

> Software e inteligencia para cartas de destilados, cocteleria y backbar en restaurantes, hoteles, bares, coctelerias, grupos de restauracion y distribuidores.

Promesa base:

- Convertir destilados y cocteles en una carta mas clara, rentable y facil de vender.
- Ayudar al equipo a recomendar whisky, tequila, mezcal, ron, gin, brandy, cognac, aperitivos, licores y cocteles con lenguaje simple y comercial.
- Analizar surtido, precios, margen, rotacion, stock muerto, carta por copa/coctel, upselling y arquitectura de backbar.
- Mantener experiencia multilingue para clientes internacionales.

Publicos prioritarios:

- Restaurantes con carta de destilados amplia.
- Hoteles con bares, rooftops, lounges y room service.
- Cocktail bars.
- Grupos de restauracion.
- Distribuidores/importadores.
- Vinotecas o tiendas gourmet con categoria spirits.

## Mapa conceptual Winerim -> Spiritsrim

- Winerim -> Spiritsrim
- wine list -> spirits list / backbar / cocktail menu
- carta de vinos -> carta de destilados / carta de cocteles / backbar
- wine library -> spirits library
- uvas -> materias primas / bases
- regiones -> origenes / denominaciones / paises productores
- estilos de vino -> categorias y estilos de destilado
- maridajes -> cocteles, serves, ocasiones y maridajes gastronomicos
- sumiller -> bartender / bar manager / beverage manager
- vino por copa -> destilado por copa / cocktail by the glass / flight
- vinos muertos -> botellas paradas / slow movers / referencias inmovilizadas
- bodega -> backbar / stock de barra / inventario de destilados
- ticket medio vino -> ticket medio beverage / cocktail attach rate

## Biblioteca de destilados propuesta

Ruta base sugerida:

- ES: `/biblioteca-destilados`
- EN: `/en/spirits-library`
- FR: `/fr/bibliotheque-spiritueux`
- IT: `/it/biblioteca-distillati`
- DE: `/de/spirituosenbibliothek`
- PT: `/pt/biblioteca-destilados`

Secciones sugeridas:

- ES: `categorias`, `origenes`, `materias-primas`, `cocteles`, `guia-servicio`, `glosario`
- EN: `categories`, `origins`, `base-ingredients`, `cocktails`, `service-guide`, `glossary`
- FR: `categories`, `origines`, `matieres-premieres`, `cocktails`, `guide-service`, `glossaire`
- IT: `categorie`, `origini`, `materie-prime`, `cocktail`, `guida-servizio`, `glossario`
- DE: `kategorien`, `herkunft`, `grundstoffe`, `cocktails`, `service-guide`, `glossar`
- PT: `categorias`, `origens`, `materias-primas`, `coqueteis`, `guia-servico`, `glossario`

Entidades iniciales prioritarias:

Categorias/estilos:

- whisky
- scotch
- bourbon
- rye
- irish-whiskey
- japanese-whisky
- rum
- rhum-agricole
- cachaca
- gin
- vodka
- tequila
- mezcal
- brandy
- cognac
- armagnac
- pisco
- vermouth
- aperitivo
- amaro
- liqueurs
- absinthe
- calvados
- grappa
- shochu
- baijiu
- aquavit
- genever

Origenes:

- scotland
- ireland
- kentucky
- tennessee
- jalisco
- oaxaca
- cognac
- armagnac
- martinique
- jamaica
- barbados
- cuba
- guatemala
- guyana
- venezuela
- puerto-rico
- dominican-republic
- peru
- chile
- brazil
- japan
- london
- piedmont
- jerez
- canada

Materias primas:

- agave
- blue-agave
- espadin
- sugarcane
- molasses
- cane-juice
- barley
- corn
- rye
- wheat
- grape
- apple
- pear
- botanicals
- juniper
- rice
- sweet-potato

Cocteles/serves:

- margarita
- old-fashioned
- negroni
- martini
- daiquiri
- manhattan
- mojito
- paloma
- espresso-martini
- spritz
- highball
- gin-tonic
- boulevardier
- whisky-sour
- pisco-sour
- caipirinha
- mai-tai
- mule
- penicillin
- sidecar
- sazerac
- bloody-mary
- carajillo

## Schema recomendado para Spiritsrim

Replicar el patron de Winerim:

- Hubs: `CollectionPage` + `DefinedTermSet` + `ItemList`.
- Fichas: `WebPage` + `Article` + `DefinedTermSet` + `DefinedTerm`.
- `mentions` hacia entidades internas relacionadas.
- `additionalProperty` para propiedades de la entidad.

Propiedades utiles por tipo:

- Categoria: familia, materia prima, origenes clave, graduacion, cuerpo, dulzor, intensidad, uso en barra, margen, servicio recomendado.
- Origen: pais/region, denominacion, categorias asociadas, materias primas, regulacion, perfil sensorial, rol comercial.
- Materia prima: familia, fermentacion, impacto aromatico, categorias relacionadas, origenes tipicos.
- Coctel/serve: espirituoso base, metodo, vaso, hielo, intensidad, dulzor, acidez/amargor, momento de consumo, complejidad operativa, margen.

## Herramientas Spiritsrim sugeridas

Reutilizar el patron de herramientas de Winerim, renombrando y redisenando:

- `SpiritsListAnalyzer`: analizador de carta de destilados/backbar.
- `CocktailMenuAnalyzer`: analizador de carta de cocteles.
- `CocktailPricingCalculator`: calculadora de precio y margen por coctel.
- `SpiritsROICalculator`: calculadora ROI de backbar.
- `BackbarBenchmark`: benchmark de surtido por tipo de local.
- `SlowMovingSpiritsCalculator`: deteccion de botellas paradas.
- `SpiritsPairingGenerator`: recomendaciones de destilado/coctel por plato u ocasion.

## Arquitectura de contenidos recomendada

Home:

- No hacer landing generica vacia.
- Primer viewport debe comunicar Spiritsrim como producto real.
- Mantener estructura Winerim, pero adaptar a backbar, cocteleria y destilados.

Paginas verticales:

- Restaurantes.
- Hoteles.
- Cocktail bars.
- Grupos de restauracion.
- Distribuidores.
- Bares sin bartender senior.
- Restaurantes gastronomicos con pairing de destilados/cocteles.

Blog:

- Publicar por clusters, no por volumen.
- Adaptar por pais/idioma, no traducir literalmente.
- Cada articulo debe enlazar a biblioteca, herramienta y demo.

Clusters iniciales:

- Como disenar una carta de destilados rentable.
- Como ordenar un backbar para vender mas.
- Precio de cocteles y margen real.
- Botellas paradas en barra: como detectarlas.
- Tequila y mezcal en restaurantes: surtido minimo.
- Whisky para restaurantes: como elegir sin sobredimensionar.
- Cocteles clasicos que elevan ticket medio.
- Carta de destilados para hoteles y rooftops.

## Primer plan de implementacion recomendado

1. Duplicar Winerim en repo/proyecto nuevo.
2. Renombrar marca global: Winerim -> Spiritsrim.
3. Cambiar dominio y constantes de sitio.
4. Crear mapas de rutas de biblioteca de destilados.
5. Crear datos base de categorias, origenes, materias primas y cocteles.
6. Crear overlays i18n para `en`, `it`, `fr`, `de`, `pt`.
7. Adaptar hubs y detail pages desde biblioteca del vino.
8. Adaptar schema a `spiritsLibrarySchema`.
9. Adaptar `sitemap` y `prerender`.
10. Sustituir herramientas wine por spirits/backbar/cocteles.
11. Actualizar blog, recursos, llms, robots, manifest, OG images y favicons.
12. Cambiar scripts de deploy.
13. Validar local: tests, build, deno check, navegador.
14. Desplegar Lovable frontend + Edge Functions.
15. Validar produccion como humano y Googlebot.
16. Enviar sitemap a Search Console.

## Guardrails importantes

- No lanzar con textos residuales de Winerim salvo que se mencionen como referencia interna.
- No lanzar con `winerim.wine`, `winerim-proxy` ni project-ref Supabase de Winerim.
- No lanzar con sitemap/prerender apuntando a Winerim.
- No publicar biblioteca si canonical/hreflang no estan completos.
- No crear cientos de URLs de biblioteca sin contenido minimo util y prerender equivalente.
- No traducir slugs de entidades despues de indexar sin migracion SEO.
- No usar logos/clientes de Winerim si Spiritsrim no tiene permiso o si no representan ese producto.
- No considerar cerrado un deploy hasta validar produccion independientemente.

## Validaciones minimas antes de deploy

Local:

```bash
npm run test -- --run
npm run build
npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts
git diff --check
rg -n "Winerim|winerim|wine|vino|biblioteca-vino|winerim\\.wine|winerim-proxy" src public supabase cloudflare-worker-v3-hybrid.js package.json
```

Produccion:

- Home humana: titulo, copy, CTA, marca y assets Spiritsrim.
- Biblioteca ES/EN/PT/DE: canonical propio, idioma correcto, hreflang.
- Ficha de categoria, origen, materia prima y coctel: schema completo y contenido no fallback.
- Googlebot: `200`, `x-prerendered: true`, canonical propio, schema y texto suficiente.
- `/sitemap.xml`: `200`, URLs de Spiritsrim, sin Winerim.
- `/robots.txt`: sitemap de Spiritsrim.
- `/llms.txt` y `/llms-full.txt`: contenido Spiritsrim.
- Formularios: destino correcto de leads.
- Search Console: propiedad Spiritsrim verificada y sitemap enviado.

## Accesos/datos que necesita la tarea nueva

Imprescindibles:

- Repo o duplicado donde se construira Spiritsrim.
- Proyecto Lovable de Spiritsrim.
- Dominio final, por ejemplo `spiritsrim.com`, `spiritsrim.io` o el que se decida.
- Acceso Cloudflare/DNS del dominio.
- Proyecto Supabase nuevo o decision explicita de reutilizar alguno.
- Variables de entorno de frontend y Edge Functions.
- Destino de formularios/leads/email.
- Logo, favicon, OG image y paleta de Spiritsrim.

Muy recomendables:

- Pais/mercado prioritario de lanzamiento.
- Idiomas iniciales: recomendar `es`, `en`, `it`, `fr`, `de`, `pt` si se quiere espejo real de Winerim.
- Lista de clientes/logos autorizados para Spiritsrim.
- Si el producto Spiritsrim existe en backend o si al inicio sera web/SEO/lead-gen.
- Pricing o CTA comercial.
- Herramientas que deben funcionar desde el primer deploy.

## Prompt listo para otra tarea de Codex

```text
Estamos creando Spiritsrim, hermana gemela de Winerim para destilados, cocteleria y backbar.

Usa Winerim como base tecnica y SEO, pero no como contenido literal. El objetivo es construir una web nueva para Spiritsrim replicando la arquitectura madura de Winerim: Vite + React + TypeScript, rutas multilingues, SEOHead, biblioteca semantica, sitemap, prerender, Cloudflare Worker, blog, recursos, herramientas y validaciones.

Antes de tocar codigo, lee:
1) PROJECT_CONTEXT.md
2) CURRENT_STATE.md
3) DECISIONS_LOG.md
4) NEXT_STEPS.md
5) SPIRITSRIM_CODEX_HANDOFF.md

Reglas:
- Separa hechos, decisiones, hipotesis y tareas pendientes.
- No asumas estado no documentado.
- Si detectas contradicciones, senalalas.
- No conserves dominio, IDs, Worker, copy ni contenido de Winerim en Spiritsrim salvo como referencia interna.
- Manten paridad entre experiencia humana, sitemap, prerender, canonical, hreflang y schema.
- Valida localmente con tests/build/deno check/git diff check.
- Antes de considerar deploy cerrado, valida produccion como humano y Googlebot.

Primer objetivo:
Crear la base Spiritsrim a partir de Winerim: marca, rutas, home, navegacion, biblioteca de destilados, schema, sitemap/prerender y primeros contenidos SEO suficientes para lanzar una version publica indexable.
```
