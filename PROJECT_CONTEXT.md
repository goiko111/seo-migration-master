# Project Context

## Hechos

- Repositorio de trabajo actual: `/Users/GOIKO/seo-migration-master`.
- El 2026-06-08 se creo el commit funcional `70bb44e feat: enrich wine library entity schema`, que extiende el schema enriquecido y `mentions` estrategicas a regiones, estilos y maridajes, ademas de mantener paridad en `prerender` para bots.
- La mejora `70bb44e` anade grafo JSON-LD de `WebPage`, `Article`, `DefinedTermSet` y `DefinedTerm` para fichas humanas de regiones, estilos y maridajes, con propiedades especificas por tipo de entidad.
- La mejora `70bb44e` actualiza `supabase/functions/prerender/index.ts` para que Googlebot y crawlers reciban el mismo patron semantico en fichas de biblioteca reconocidas.
- El 2026-06-08 Lovable `Web Winerim` desplego `prerender` y publico frontend desde `69d2fbf`; produccion quedo validada como Googlebot en Vinho Verde PT, Espumoso DE y Lubina/Dorada PT con `200`, `bot-prerender`, `x-prerendered: true`, canonical propio, idioma correcto, schema completo y `mentions`.
- Validaciones locales de `70bb44e`: tests enfocados de biblioteca y superficie SEO, `deno check` de `prerender`, suite completa, build, `git diff --check` y navegador local.
- El 2026-06-08 se detecto y corrigio una contradiccion documental: los documentos seguian marcando `d02ff15` como `prerender` pendiente, pero el estado real ya habia avanzado a `7a1745a` para `prerender` y `6d0c2cf` para `sitemap`.
- El 2026-06-08 quedo desplegada y validada en produccion la Edge Function `prerender` del commit `7a1745a`: Googlebot recibe `mentions` estrategicas reales en JSON-LD para uvas prioritarias, no solo hubs genericos.
- El 2026-06-08 se pusheo, desplego y valido `6d0c2cf fix: include strategic wine library targets in sitemap`: `/sitemap.xml` responde `200`, contiene 2.150 URLs y cubre las 9 rutas estrategicas nuevas en las seis lenguas.
- Las 54 variantes nuevas del sitemap para esas 9 rutas existen en produccion; las 27 variantes `es/de/pt` revisadas como Googlebot responden `200` y una muestra confirma `x-prerendered: true` con `x-worker-branch: bot-prerender`.
- Los slugs de entidad de la biblioteca siguen usando la forma canonica base espanola dentro de rutas localizadas, por ejemplo `francia`, `blanco-mineral` o `queso-azul`; cambiar esto requiere migracion de canonicals, redirects, hreflang y sitemap.
- El proyecto es una aplicación Vite + React + TypeScript.
- La biblioteca del vino vive en la superficie `/biblioteca-vino` y sus rutas localizadas.
- La biblioteca del vino incluye una capa editorial avanzada para uvas, regiones, estilos y maridajes prioritarios, además de la infraestructura multilingüe.
- La capa editorial avanzada de uvas prioritarias está escalando por tandas; tras la última expansión publicada cubre 40 uvas prioritarias.
- La expansión editorial de biblioteca del vino cubre 40 uvas, 34 regiones prioritarias, 25 estilos prioritarios y 30 maridajes/platos prioritarios en seis idiomas.
- El 2026-06-08 se publico y valido en produccion `3954369 feat: expand wine library entity editorial coverage`, que amplio perfiles editoriales visibles de regiones, estilos y maridajes/platos, sincronizo `prerender` y anadio rutas nuevas al sitemap.
- Produccion tras `3954369`: Googlebot valida Santorini PT, Franciacorta DE y Ceviche PT con `200`, `bot-prerender`, `x-prerendered: true`, canonical propio, idioma correcto, schema enriquecido y contenido editorial sin fallback; `/sitemap.xml` contiene 2.228 URLs y las nuevas rutas revisadas en `es/de/pt`.
- El 2026-06-08 se publico en produccion la cuarta tanda editorial de uvas prioritarias: `graciano`, `muscadet`, `semillon`, `assyrtiko`, `vermentino`, `carmenere`, `tannat`, `petit-verdot`, `torrontes` y `corvina`.
- El 2026-06-08 se pusheo `d02ff15 feat: enrich wine library grape schema links`, que completa enlaces estrategicos para las 40 uvas prioritarias, enriquece JSON-LD humano de fichas de uva y desambigua `muscadet` como uva `Melon de Bourgogne` frente a region; la paridad de `prerender` quedo cerrada posteriormente con `7a1745a`.
- El 2026-06-08 se publico en produccion un fallback visible localizado para entidades de biblioteca sin perfil editorial especifico, integrado en uvas, regiones, estilos y maridajes.
- El 2026-06-08 se desplego y valido en produccion una capa de profundidad de prerender para biblioteca del vino: 761/761 URLs visibles de Search Console pasan con minimo 317 palabras, canonical propio, idioma correcto, schema y hreflang.
- El 2026-06-08 se desplego y valido en produccion una capa de profundidad de prerender para 49 rutas estaticas/no-biblioteca visibles en Search Console: 49/49 pasan con minimo 302 palabras, canonical propio e idioma correcto.
- La cobertura completa de la expansión en sitemap quedó publicada y validada tras desplegar desde Lovable el commit `9f99fa7`.
- La biblioteca del vino incluye un grafo estratégico publicado que conecta uvas, regiones, estilos y maridajes prioritarios.
- Los hubs principales de la biblioteca del vino exponen rutas estratégicas internas hacia uvas, regiones, estilos y maridajes prioritarios en seis idiomas.
- El prerender para bots de la biblioteca del vino debe exponer el mismo grafo estratégico que el frontend humano; esta paridad quedó revalidada en producción el 2026-06-01 para home y hubs principales.
- La profundidad de regiones, estilos y maridajes prioritarios ya fue publicada y validada en producción.
- Los 96 legacy shortcuts de biblioteca del vino detectados en auditoría pública ya redirigen en producción a las rutas canónicas de entidad.
- El blog forma parte de la estrategia de autoridad de la biblioteca del vino: debe publicar clusters editoriales que enlacen de forma contextual a hubs, entidades, herramientas de análisis y demo.
- El 2026-06-01 quedó publicado el primer cluster de 3 artículos españoles de blog enfocados en biblioteca del vino, uvas/regiones y maridajes para restaurantes.
- El 2026-06-01 quedó publicado y validado el cluster internacional de 15 artículos adaptados para `en`, `it`, `fr`, `de` y `pt` sobre biblioteca del vino.
- La navegación del blog ya mantiene el idioma en rutas de artículo localizadas `/{lang}/article/{slug}`; se corrigió el salto a español detectado en blogs internacionales.
- Los bloques de apoyo de artículos (índice, herramientas, relacionados y CTAs) están localizados en la experiencia humana para evitar residuos de UI española en artículos internacionales.
- El prerender de artículos debe exponer enlaces internos reales procedentes de `related_links`, markdown del cuerpo y reglas semánticas, no solo navegación genérica.
- Los artículos estratégicos del blog deben tener rutas localizadas limpias (`/{lang}/article/{slug}`) y contenido adaptado a mercado cuando se publiquen en otros idiomas.
- Las variantes internacionales de artículos no deben quedar servidas como `200` en `/article/{slug}` si su canonical real es `/{lang}/article/{slug}`; el Worker debe consolidarlas con `301` cuando aparezcan en Search Console.
- El SEO técnico y la lectura por LLMs forman parte del alcance operativo de la biblioteca del vino: sitemap, prerender, idioma, canonical, hreflang, robots y archivos `llms.txt`.
- Core Web Vitals de la home es una línea activa antes de retomar ampliación editorial máxima: ya se cerraron arranque ligero, CSS crítico y GTM diferido en producción.
- El proyecto usa Lovable como vía operativa para publicar frontend y Edge Functions Supabase.
- El proyecto Lovable correcto para la web pública Winerim es `https://lovable.dev/projects/2c4eed0e-6760-45f0-aeb3-ce44de8e91f1` (`Web Winerim`).
- El 2026-06-08 se detectó una contradicción operativa: `https://lovable.dev/projects/ebb36746-82ff-43c3-86c1-558573beddcd` pertenece al proyecto `Crim`, no a la web pública `Web Winerim`.
- Search Console está verificado para la propiedad URL-prefix `https://winerim.wine/`; la propiedad de dominio `sc-domain:winerim.wine` sigue pendiente de acceso/verificación.
- El 2026-06-08 se reenvio `/sitemap.xml` en Search Console para la propiedad URL-prefix `https://winerim.wine/`; Google lo marco como `Correcto`, ultimo rastreo 2026-06-08 y 2.228 URLs descubiertas.
- El 2026-06-08 Search Console acepto solicitudes manuales de indexacion para tres fichas nuevas de alta intencion ya presentes en sitemap: Ceviche PT, Santorini PT y Franciacorta DE.
- El 2026-06-08 Search Console mostro `/biblioteca-vino` y `/biblioteca-vino/maridajes` como URLs ya indexadas; el bloqueo principal observado sigue concentrado en fichas nuevas descubiertas pero aun no indexadas.
- El 2026-06-09 se creo `SPIRITSRIM_CODEX_HANDOFF.md` como briefing para construir Spiritsrim, hermana gemela de Winerim orientada a destilados, cocteleria y backbar.
- Desde el 2026-05-23, estos documentos son la fuente de verdad operativa del proyecto:
  - `PROJECT_CONTEXT.md`
  - `CURRENT_STATE.md`
  - `DECISIONS_LOG.md`
  - `NEXT_STEPS.md`
- Al iniciar una sesión se deben leer estos documentos antes de asumir estado no documentado.
- Al cerrar una sesión se deben actualizar `CURRENT_STATE.md`, `DECISIONS_LOG.md` y `NEXT_STEPS.md`.

## Decisiones

- Separar siempre la información en hechos, decisiones, hipótesis y tareas pendientes.
- Si falta contexto, revisar primero estos documentos antes de continuar.
- Si se detectan contradicciones entre documentos, código o instrucciones, señalarlas en vez de ignorarlas.
- Actualizar estos documentos también durante la sesión cuando ocurra algo significativo.
- Publicar artículos de blog de forma táctica, por clusters conectados a la biblioteca del vino y a conversión, antes que aumentar volumen sin enlazado ni intención clara.
- Priorizar traducción/adaptación por país de artículos estratégicos cuando el routing, sitemap, prerender y la UI humana mantengan el idioma sin saltar a español.
- No traducir slugs de entidad como parche rapido mientras ya esten publicados como canonicals en sitemap; tratarlos como una migracion SEO con redirects 301, hreflang, canonicals y validacion de Search Console.
- Tratar el schema enriquecido de regiones, estilos y maridajes como parte de la capa semantica base de biblioteca, no como mejora opcional solo para uvas.
- Tratar Spiritsrim como proyecto separado que puede reutilizar arquitectura Winerim, pero no dominio, IDs, contenido literal, claims ni sitemap/prerender de Winerim.

## Hipótesis

- La biblioteca del vino es una superficie SEO estratégica para Winerim.
- La ampliación internacional de la biblioteca debe priorizar paridad de rutas, indexabilidad, hreflang, canonical, sitemap y prerender para bots.
- La mejora editorial debería avanzar después de asegurar la base técnica multilingüe.
- La mejora editorial debe mantener paridad entre experiencia humana, sitemap/prerender y datos estructurados.
- Las entidades prioritarias deben usar perfiles editoriales propios; el fallback visible es una capa para entidades que aun no tienen perfil especifico.
- Las rutas estratégicas de hubs deben mantenerse sincronizadas entre React y `supabase/functions/prerender/index.ts` hasta que exista una fuente compartida.
- La ampliación editorial debe publicarse desde Lovable y validarse en producción antes de tratarse como cerrada.
- Los archivos `llms.txt` y `llms-full.txt` ayudan a orientar agentes y crawlers de IA, pero no sustituyen contenido indexable, prerender correcto ni schema consistente.
- Los clusters editoriales del blog deberían aumentar autoridad temática y enlazado interno hacia la biblioteca del vino si se indexan, se enlazan desde hubs relevantes y mantienen profundidad real.
- Corregir el salto de idioma en blog debería mejorar experiencia internacional y evitar señales SEO/LLM contradictorias entre URL, contenido, canonical e idioma.
- Aplicar el mismo patron de `WebPage` + `Article` + `DefinedTermSet` + `DefinedTerm` en todas las fichas prioritarias deberia mejorar comprension de entidades por Googlebot y LLMs.

## Tareas pendientes

- Mantener estos documentos actualizados al cierre de cada sesión.
- Confirmar en cada nueva sesión si el estado real del repo coincide con lo documentado.
- Escalar la capa editorial avanzada de uvas, regiones, estilos y maridajes sin romper la paridad multilingüe ni el prerender para bots.
- Convertir progresivamente entidades que dependen del fallback visible en perfiles editoriales especificos cuando tengan demanda SEO o valor comercial; la cobertura de uvas prioritarias ya paso de 30 a 40.
- Mantener la validación productiva de cada tanda editorial antes de tratarla como cerrada.
- Publicar y validar en producción cada tanda editorial de biblioteca del vino.
- Revalidar en producción cualquier cambio de sitemap/prerender tras desplegarlo desde Lovable.
- Planificar la migracion futura de slugs de entidad localizados solo con mapa completo, redirects 301 y control de impacto SEO.
- Evitar que frontend y prerender diverjan cuando se añadan nuevos enlaces estratégicos de biblioteca.
- Mantener los redirects legacy de biblioteca validados y continuar escalando biblioteca del vino al máximo nivel, manteniendo rendimiento residual como línea secundaria.
- Monitorizar en Search Console la expansión editorial masiva ya publicada y validada.
- Monitorizar en Search Console el efecto del reenvio de `/sitemap.xml` del 2026-06-08 y de las tres solicitudes manuales de indexacion aceptadas.
- Monitorizar en Search Console el cluster de artículos de biblioteca del vino publicado el 2026-06-01 y solicitar indexación de una tanda corta si la herramienta lo permite.
- Solicitar indexación selectiva de los artículos internacionales solo después de validar que Search Console permite hacerlo sin error.
- Monitorizar en Search Console la ampliacion semantica de regiones, estilos y maridajes tras el deploy validado de `69d2fbf`.
- Si se abre la tarea Spiritsrim, usar `SPIRITSRIM_CODEX_HANDOFF.md` como punto de partida junto con los cuatro documentos fuente de verdad.
