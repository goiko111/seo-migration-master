# Search Console Audit — 2026-05-23

## Hechos

- Propiedad verificada en Google Search Console: `https://winerim.wine/`.
- Cuenta usada: `gugocreative@gmail.com`.
- Método de verificación: archivo HTML.
- Archivo/ruta de verificación:
  - `https://winerim.wine/google0be715f4ef205b3d.html`
  - Contenido: `google-site-verification: google0be715f4ef205b3d.html`
- La propiedad de dominio `sc-domain:winerim.wine` no estaba accesible con esta cuenta al inicio.
- Se desplegó Cloudflare Worker `winerim-proxy` para servir la verificación y redirects legacy.
- Worker desplegado tras redirects: version ID `766e2cdd-da00-4157-8745-1f27c25a03e5`.

## Rendimiento

- Periodo visible en Search Console: 3 meses, del 2026-03-27 al 2026-05-21.
- Última actualización del informe de rendimiento: hace unas 5,5 horas respecto a la consulta.
- Resultados de búsqueda web:
  - Clics totales: 664.
  - Impresiones totales: 8,32 mil.
  - CTR medio: 8 %.
  - Posición media: 9,5.
- Consultas principales:
  - `winerim`: 379 clics, 730 impresiones.
  - `winerin`: 31 clics, 82 impresiones.
  - `wine rim`: 20 clics, 36 impresiones.
  - `winerim login`: 13 clics, 76 impresiones.
  - `winering`: 7 clics, 22 impresiones.
  - `winerim app`: 4 clics, 16 impresiones.
  - `carta de vinos digital gratis`: 2 clics, 38 impresiones.
  - `carta de vinos digital`: 1 clic, 38 impresiones.
- Páginas principales:
  - `/`: 569 clics, 2.981 impresiones.
  - `/que-es-winerim`: 13 clics, 670 impresiones.
  - `/en`: 10 clics, 411 impresiones.
  - `/calculadora-margen-vino`: 9 clics, 279 impresiones.
  - `/homepage/`: 7 clics, 65 impresiones.
  - `/software-carta-de-vinos`: 6 clics, 446 impresiones.
  - `/producto/winerim-core`: 6 clics, 363 impresiones.
  - `/contacto`: 5 clics, 271 impresiones.
  - `/en/wine-list-management-software`: 5 clics, 139 impresiones.
  - `/aumenta-la-venta-de-vinos-en-tu-restaurante-mejores-estrategias/`: 4 clics, 218 impresiones.
- Recomendación automática de Search Console:
  - `/en/pricing` recibió menos impresiones de lo habitual, con caída indicada del 88 %.
  - `/guias/como-usar-winerim-sin-sumiller` recibió más impresiones de lo habitual, con subida indicada del 1.640 %.

## Indexación

- Última actualización del informe de páginas: 2026-05-18.
- Páginas indexadas: 73.
- Páginas no indexadas: 1.643.
- Motivos de no indexación:
  - `No se ha encontrado (404)`: 194 páginas, validación en error.
  - `Página alternativa con etiqueta canónica adecuada`: 64 páginas.
  - `Duplicada: el usuario no ha indicado ninguna versión canónica`: 22 páginas.
  - `Página con redirección`: 17 páginas.
  - `Excluida por una etiqueta "noindex"`: 1 página.
  - `Descubierta: actualmente sin indexar`: 1.232 páginas.
  - `Rastreada: actualmente sin indexar`: 111 páginas.
  - `Duplicada: Google ha elegido una versión canónica diferente a la del usuario`: 2 páginas.

### Ejemplos 404

- `/en/the-importance-of-choosing-the-wine-that-goes-best-with-food/`
- `/privacy-policy`
- `/winerim-vs-wineadvisor-2/`
- `/alex-pardo/`
- `/estadisticas/estadisticas-2024-01-28/`
- `/home/`
- `/estadisticas/estadisticas-2024-02-24/`
- `/clientes/canabota/`
- `/clientes/yandiola/`
- `/clientes/casa-curro/`

### Ejemplos descubiertos, actualmente sin indexar

- `/article/5-errores-reales-que-vemos-en-cartas-de-vinos-de-restaurantes_de`
- `/article/5-errores-reales-que-vemos-en-cartas-de-vinos-de-restaurantes_en`
- `/article/5-errores-reales-que-vemos-en-cartas-de-vinos-de-restaurantes_fr`
- `/article/5-errores-reales-que-vemos-en-cartas-de-vinos-de-restaurantes_it`
- `/article/5-errores-reales-que-vemos-en-cartas-de-vinos-de-restaurantes_pt`
- `/article/alex-pardo`
- `/article/alex-pardo_de`
- `/article/alex-pardo_en`
- `/article/alex-pardo_fr`
- `/article/alex-pardo_it`

### Ejemplos rastreados, actualmente sin indexar

- `/fr/logiciel-carte-des-vins`
- `/article/como-pensar-la-carta-de-vinos-desde-la-rentabilidad`
- `/benchmarks-playbooks/playbook-mejorar-rotacion`
- `/wine-list-software-italy`
- `/integraciones`
- `/?p=7351`
- `/terminos`
- `/en/castillo-ygay-gran-reserva-especial-recognized-as-the-best-wine-in-the-world/`
- `/en/terms`
- `/?lang=en`

## Sitemaps

- Sitemaps enviados:
  - `/sitemap.xml`: enviado el 2026-04-15, leído el 2026-05-20, estado correcto, 1.886 páginas descubiertas.
  - `/sitemap_index.xml`: enviado el 2022-12-22, leído el 2026-05-18, estado correcto, 1.358 páginas descubiertas.
- En producción, `/sitemap_index.xml` responde 301 a `/sitemap.xml`.
- La UI no ofreció opción directa de retirar `/sitemap_index.xml` desde el menú de tabla; solo mostró enlaces a indexación de páginas y vídeos.

## Experiencia

- Core Web Vitals, última actualización: 2026-05-22.
- Móvil:
  - 7 URLs malas.
  - Problema: LCP superior a 4 s.
  - Grupo representativo: `https://winerim.wine/`, población 7, LCP de grupo 4,5 s.
- Ordenador:
  - 0 URLs malas.
  - 7 URLs necesitan mejora.
  - 0 URLs rápidas.
- HTTPS:
  - 7 URLs HTTPS.
  - 0 URLs no HTTPS.

## Datos Estructurados

- FAQ:
  - 4 elementos no válidos.
  - 3 elementos válidos.
  - Problema crítico: campo `FAQPage` duplicado.
  - Ejemplos:
    - `/software-carta-de-vinos`
    - `/como-vender-mas-vino-en-un-restaurante`
  - Google indica que los resultados enriquecidos de FAQ dejan de aparecer a partir del 2026-05-07 y que el informe se retirará en junio de 2026.
- Breadcrumbs:
  - 5 válidas.
  - 0 no válidas.
- Seguridad y acciones manuales:
  - Acciones manuales: sin problemas detectados.
  - Problemas de seguridad: sin problemas detectados.

## Enlaces

- Enlaces externos totales: 48.
- Página externa más enlazada: `/`, con 48 enlaces.
- Sitios con más enlaces:
  - `institutinternet.org`: 4.
  - `issuu.com`: 3.
  - `majadahondamagazin.es`: 3.
  - `moncloa.com`: 3.
  - `24noticias.es`: 2.
- Textos de enlace frecuentes:
  - `winerim`
  - `sommelier digital`
  - `carta de vinos`
  - `https winerim wine`
  - `winerim wine`
- Enlaces internos totales: 87.
- Páginas internas más enlazadas:
  - `/`: 67.
  - `/producto/winerim-core`: 20.

## Acciones Ejecutadas

- Se verificó `https://winerim.wine/` en Search Console.
- Se añadió archivo estático de verificación:
  - `public/google0be715f4ef205b3d.html`.
- Se añadió ruta de verificación en `cloudflare-worker-v3-hybrid.js`.
- Se desplegó Cloudflare Worker con verificación GSC.
- Se añadieron redirects directos de alta confianza en el Worker:
  - `/privacy-policy` -> `/privacidad`
  - `/home` -> `/`
  - `/homepage` -> `/`
  - `/alex-pardo` -> `/article/alex-pardo`
  - `/aumenta-la-venta-de-vinos-en-tu-restaurante-mejores-estrategias` -> `/como-vender-mas-vino-en-un-restaurante`
  - `/winerim-vs-wineadvisor-2` -> `/comparativas`
  - `/en/the-importance-of-choosing-the-wine-that-goes-best-with-food` -> `/en/blog`
  - `/clientes/*` -> `/clientes`
  - `/?p=*` -> `/blog`
- Verificación de producción:
  - `/google0be715f4ef205b3d.html` responde HTTP 200 con `X-Worker-Branch: gsc-verification`.
  - Los redirects nuevos probados responden HTTP 301 con `X-Worker-Branch: direct-legacy-redirect` o `wordpress-query-redirect`.
  - Home y sitemap siguen respondiendo HTTP 200 tras el despliegue.

## Decisiones

- Mantener el método HTML de verificación para Search Console porque no había acceso inicial a la propiedad y el flujo Cloudflare OAuth estaba bloqueado por popup.
- Añadir la verificación tanto en Worker como en `public/` para mantener continuidad si en el futuro la ruta deja de servirse desde Worker.
- Corregir inmediatamente redirects legacy de alta confianza cuando Search Console muestre ejemplos concretos y exista destino canónico claro.
- No validar corrección del informe 404 todavía: se han corregido ejemplos importantes, pero no los 194 casos de Search Console completos.
- No reenviar sitemap todavía: las correcciones locales de `sitemap` y `prerender` siguen pendientes de despliegue desde Lovable.

## Hipótesis

- La caída de `/en/pricing` está relacionada con el problema ya detectado en la auditoría pública: rutas localizadas estáticas que entregaban la home española con canonical a `/`.
- El bloque de 1.232 páginas descubiertas sin indexar se debe en gran parte a exceso de URLs internacionales/artículos traducidos con señales débiles o inconsistentes.
- El tráfico actual depende demasiado de marca; el crecimiento no branded exige mejorar indexación, enlaces internos, contenido profundo y autoridad externa.
- La baja cantidad de enlaces internos detectados por Search Console sugiere que Google aún no está descubriendo bien la arquitectura completa o que la navegación enlazable es insuficiente para bots.
- El LCP móvil de la home puede estar limitando rendimiento en la página con más clics e impresiones.

## Tareas Pendientes

1. Desplegar desde Lovable los cambios locales de `sitemap`, `prerender`, `robots.txt`, `llms.txt` y `llms-full.txt`.
2. Reenviar `/sitemap.xml` en Search Console después de confirmar producción.
3. Revisar si Search Console permite retirar `/sitemap_index.xml` desde detalle o configuración; dejar solo `/sitemap.xml` como sitemap activo.
4. Exportar ejemplos completos de los 194 404 y crear un mapa de redirects por familias.
5. Resolver el resto de legacy:
   - `/estadisticas/*`
   - antiguas URLs `/en/.../`
   - antiguas URLs de clientes.
6. Auditar artículos internacionales:
   - decidir canonical/ruta definitiva;
   - reducir URLs finas;
   - reforzar contenido y enlaces internos antes de pedir indexación.
7. Corregir `FAQPage` duplicado en `/software-carta-de-vinos` y `/como-vender-mas-vino-en-un-restaurante`, aunque su impacto será bajo por la retirada del rich result.
8. Optimizar LCP móvil de la home:
   - revisar imagen/hero inicial;
   - reducir JS crítico;
   - priorizar preload de asset principal;
   - medir con Lighthouse/PageSpeed.
9. Fortalecer enlaces internos:
   - home -> producto -> recursos -> biblioteca;
   - biblioteca -> uvas/regiones/estilos;
   - artículos -> páginas comerciales relevantes.
10. Trabajar autoridad externa: casos, menciones y páginas citables para reducir dependencia de consultas de marca.
