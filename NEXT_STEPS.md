# Next Steps

## Hechos

- La base técnica para `de` y `pt` de la biblioteca del vino está implementada.
- El PR `https://github.com/goiko111/seo-migration-master/pull/1` está fusionado en `main`.
- Merge commit: `30e9a95f592ba1c3607c0b385a2711e783bcc525`.
- El frontend fue publicado desde Lovable en el proyecto `https://lovable.dev/projects/2c4eed0e-6760-45f0-aeb3-ce44de8e91f1`.
- Las Edge Functions `sitemap` y `prerender` fueron actualizadas desde Lovable.
- El Worker `winerim-proxy` quedó desplegado en Cloudflare con versión final `ec6d2f24-f3f3-4739-8a56-ef6992fdf2a9`.
- `npm run deploy:worker` y `npm run deploy:worker:dry-run` incluyen ahora `--keep-vars` y variables públicas explícitas.
- Producción validada:
  - `https://winerim.wine/de/weinbibliothek` responde HTTP 200.
  - `https://winerim.wine/pt/biblioteca-vinho` responde HTTP 200.
  - `https://winerim.wine/sitemap.xml` lista rutas `de` y `pt` de la biblioteca.
  - Googlebot en `https://winerim.wine/de/weinbibliothek/rebsorten/tempranillo` recibe prerender alemán con canonical/hreflang correctos.
  - Googlebot en `https://winerim.wine/pt/biblioteca-vinho/castas/tempranillo` recibe prerender portugués con canonical/hreflang correctos.
- El lint global sigue teniendo deuda fuera del alcance directo de este bloque.
- Lovable muestra avisos de seguridad/uso que deben revisarse en una tarea separada.

## Decisiones

- Dar por completado el despliegue técnico principal de la biblioteca del vino `de`/`pt`.
- Usar Lovable como fuente operativa para desplegar Edge Functions Supabase en este proyecto.
- Usar el script del repo para desplegar Worker y evitar comandos sueltos.
- No mezclar deuda global de lint ni avisos de seguridad de Lovable con el cierre de biblioteca del vino.
- Abrir el siguiente bloque como mejora editorial/SEO avanzada, no como infraestructura base.

## Hipótesis

- La cobertura técnica multilingüe ya permite escalar contenido `de` y `pt` sin reabrir rutas, sitemap, hreflang ni prerender.
- El siguiente salto de calidad vendrá de contenido editorial específico por entidad, más datos estructurados y enlaces internos por intención.
- Search Console puede tardar días en reflejar sitemap/canonical/hreflang después del despliegue.

## Tareas pendientes

1. Commit y push de los cambios finales de cierre:
   - `cloudflare-worker-v3-hybrid.js`.
   - `package.json`.
   - `TECH_INSTRUCTIONS.md`.
   - `CURRENT_STATE.md`.
   - `DECISIONS_LOG.md`.
   - `NEXT_STEPS.md`.
2. Validación visual rápida:
   - Abrir `/de/weinbibliothek`.
   - Abrir `/pt/biblioteca-vinho`.
   - Probar selector de idioma desde una ficha dinámica como Tempranillo.
3. Search Console:
   - Reenviar `https://winerim.wine/sitemap.xml`.
   - Inspeccionar URLs prioritarias `de` y `pt`.
   - Revisar canonical seleccionada por Google e informes hreflang.
4. Bloque editorial máximo nivel:
   - Priorizar 30-50 entidades por potencial SEO.
   - Reescribir contenido propio por idioma, empezando por uvas y regiones con intención transaccional/informacional.
   - Añadir FAQs localizadas por entidad.
   - Añadir bloques de servicio/restauración: temperatura, copa, margen, rotación, maridaje y recomendación de sala.
   - Conectar entidades relacionadas con enlaces internos por idioma.
   - Ampliar schema por tipo de entidad (`Article`, `FAQPage`, `BreadcrumbList` y, donde encaje, `DefinedTerm`/`ItemList`).
5. Separar deuda técnica:
   - Resolver lint global.
   - Revisar avisos de seguridad de Lovable.
