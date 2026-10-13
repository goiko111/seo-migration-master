# Herramientas, salud de URLs e i18n visible — release 2026-10-13

## Hechos confirmados

- El barrido previo de las `2.434` URLs del sitemap encontró un único fallo duro:
  `https://winerim.wine/precios-modulos-integraciones` devolvía `404`.
- La causa era el router de Cloudflare: esa ruta enviaba humanos y bots al origen
  anterior, donde ya no existía.
- La calculadora de fuga de margen tenía SEO localizado para seis idiomas, pero el
  contenido interactivo completo solo seleccionaba ES, DE y PT. EN, IT y FR caían
  silenciosamente en castellano.
- La revisión de condicionales visibles partió de `82` usos sospechosos de idioma.
  Tras corregir los fallbacks incompletos quedan `37`; todos corresponden a rutas
  especiales o expresiones que enumeran los seis idiomas.
- Las calculadoras de rentabilidad y tiempo operativo se han alineado visualmente
  con la familia pública de herramientas de Winerim: fondo oscuro, tipografía,
  bordes, acentos vino/dorado, controles, foco y estados responsive.
- Se corrigieron textos visibles o navegación localizada en Herramientas, Recursos,
  legales, integraciones, Comparativas, calculadora por copa, software de carta,
  guías de vino por copa/venta, Benchmarks, Clientes, Problemas, implantación,
  restaurante sin sumiller e Inteligencia Dinámica.
- La familia completa de rutas públicas de herramientas se sirve ahora desde la
  release versionada de Cloudflare Pages para evitar divergencia con el origen
  antiguo de Lovable.

## Producción

- Pages: `https://169386d2.winerim-origin.pages.dev`.
- Router: `winerim-edge-router` versión
  `f7237ef2-4e6f-4286-810e-e8d2bae1d816`.
- Backend, Lovable Cloud/Supabase, SQL y Edge Functions: sin cambios.
- `/precios-modulos-integraciones`: `200` para humano, Googlebot y
  `OAI-SearchBot/1.0`, canonical propio y un solo H1.
- Sitemap productivo: `2.434/2.434` URLs canónicas responden `200`.
- Verificación hidratada EN de la calculadora de margen: aparece `Margin data` y
  no aparece `Datos de margen`.

## Validaciones

- TypeScript: verde.
- Vitest: `251/251`.
- Build Vite: verde.
- Sintaxis del Worker y dry-run de Wrangler: verdes.
- Auditor SEO/i18n estructural: `252/252`.
- QA visual: escritorio y móvil para las dos calculadoras nuevas; sin solapes ni
  errores de consola de aplicación.

## Decisiones

- Enrutar solo Herramientas y las rutas React ya controladas a Pages; no cambiar de
  origen toda la web en este lote.
- No gastar créditos de Lovable ni desplegar Supabase para una corrección que vive
  en frontend y router.
- Tratar el `100 %` del auditor estructural como cobertura técnica, no como garantía
  de calidad lingüística humana de las `2.434` URLs.

## Hipótesis

- Google sustituirá el antiguo `404` de la arquitectura de precios en la siguiente
  recaptura, dado que humano y bots ya reciben `200` y canonical propio.

## Contradicciones y límites

- El origen antiguo podía servir código distinto al repositorio vivo aun con una
  release nueva en Pages; por eso una prueba local no bastaba para confirmar la
  traducción productiva.
- No se ha realizado revisión editorial por traductores nativos de cada párrafo del
  corpus completo. Sí se han corregido los fallbacks técnicos detectables y probado
  las superficies críticas.

## Pendiente

- Revisar Search Console en 24-72 horas para confirmar la recaptura del antiguo
  `404`; el sitemap ya está sano y no requiere otro cambio técnico.
- Ejecutar una segunda pasada lingüística nativa por mercado si se van a activar
  campañas específicas en IT, FR, DE o PT.
- Atender por separado los avisos no bloqueantes de React Router v7, `key` en
  Precios, `caniuse-lite` antiguo y chunks grandes.
