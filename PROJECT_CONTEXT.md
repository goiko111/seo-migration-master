# Project Context

## Hechos

- Repositorio de trabajo actual: `/Users/GOIKO/seo-migration-master`.
- El proyecto es una aplicación Vite + React + TypeScript.
- La biblioteca del vino vive en la superficie `/biblioteca-vino` y sus rutas localizadas.
- La biblioteca del vino incluye una capa editorial avanzada para uvas, regiones, estilos y maridajes prioritarios, además de la infraestructura multilingüe.
- La capa editorial avanzada de uvas prioritarias está escalando por tandas; tras la última expansión publicada cubre 30 uvas prioritarias.
- La expansión editorial de biblioteca del vino cubre 30 uvas, 22 regiones prioritarias, 15 estilos prioritarios y 18 maridajes/platos prioritarios en seis idiomas.
- La cobertura completa de la expansión en sitemap quedó publicada y validada tras desplegar desde Lovable el commit `9f99fa7`.
- La biblioteca del vino incluye un grafo estratégico publicado que conecta uvas, regiones, estilos y maridajes prioritarios.
- Los hubs principales de la biblioteca del vino exponen rutas estratégicas internas hacia uvas, regiones, estilos y maridajes prioritarios en seis idiomas.
- El prerender para bots de la biblioteca del vino debe exponer el mismo grafo estratégico que el frontend humano; esta paridad quedó revalidada en producción el 2026-06-01 para home y hubs principales.
- La profundidad de regiones, estilos y maridajes prioritarios ya fue publicada y validada en producción.
- Los 96 legacy shortcuts de biblioteca del vino detectados en auditoría pública ya redirigen en producción a las rutas canónicas de entidad.
- El SEO técnico y la lectura por LLMs forman parte del alcance operativo de la biblioteca del vino: sitemap, prerender, idioma, canonical, hreflang, robots y archivos `llms.txt`.
- Core Web Vitals de la home es una línea activa antes de retomar ampliación editorial máxima: ya se cerraron arranque ligero, CSS crítico y GTM diferido en producción.
- El proyecto usa Lovable como vía operativa para publicar frontend y Edge Functions Supabase.
- Search Console está verificado para la propiedad URL-prefix `https://winerim.wine/`; la propiedad de dominio `sc-domain:winerim.wine` sigue pendiente de acceso/verificación.
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

## Hipótesis

- La biblioteca del vino es una superficie SEO estratégica para Winerim.
- La ampliación internacional de la biblioteca debe priorizar paridad de rutas, indexabilidad, hreflang, canonical, sitemap y prerender para bots.
- La mejora editorial debería avanzar después de asegurar la base técnica multilingüe.
- La mejora editorial debe mantener paridad entre experiencia humana, sitemap/prerender y datos estructurados.
- Las rutas estratégicas de hubs deben mantenerse sincronizadas entre React y `supabase/functions/prerender/index.ts` hasta que exista una fuente compartida.
- La ampliación editorial debe publicarse desde Lovable y validarse en producción antes de tratarse como cerrada.
- Los archivos `llms.txt` y `llms-full.txt` ayudan a orientar agentes y crawlers de IA, pero no sustituyen contenido indexable, prerender correcto ni schema consistente.

## Tareas pendientes

- Mantener estos documentos actualizados al cierre de cada sesión.
- Confirmar en cada nueva sesión si el estado real del repo coincide con lo documentado.
- Escalar la capa editorial avanzada de uvas, regiones, estilos y maridajes sin romper la paridad multilingüe ni el prerender para bots.
- Mantener la validación productiva de cada tanda editorial antes de tratarla como cerrada.
- Publicar y validar en producción cada tanda editorial de biblioteca del vino.
- Revalidar en producción cualquier cambio de sitemap/prerender tras desplegarlo desde Lovable.
- Evitar que frontend y prerender diverjan cuando se añadan nuevos enlaces estratégicos de biblioteca.
- Mantener los redirects legacy de biblioteca validados y continuar escalando biblioteca del vino al máximo nivel, manteniendo rendimiento residual como línea secundaria.
- Monitorizar en Search Console la expansión editorial masiva ya publicada y validada.
