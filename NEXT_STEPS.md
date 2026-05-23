# Next Steps

## Hechos

- La base técnica para `de` y `pt` de la biblioteca del vino está implementada, fusionada, desplegada y validada en producción.
- El cierre técnico previo quedó pusheado en `main` con `e009927`.
- El proyecto Lovable operativo es `https://lovable.dev/projects/2c4eed0e-6760-45f0-aeb3-ce44de8e91f1`.
- Las Edge Functions Supabase de este proyecto se gestionan desde Lovable.
- En esta sesión se añadió el primer bloque editorial avanzado:
  - 10 uvas prioritarias.
  - Seis idiomas: `es`, `en`, `it`, `fr`, `de`, `pt`.
  - Bloques de servicio/restauración, FAQs y maridajes.
  - Paridad entre frontend y prerender para bots.
  - Fallbacks localizados para evitar texto español en páginas internacionales.
- Verificaciones locales completadas:
  - `npm run test`: 15 tests.
  - `npm run build`.
  - `npx --yes deno-bin check supabase/functions/prerender/index.ts supabase/functions/sitemap/index.ts`.
  - `git diff --check`.
  - Navegador local en rutas prioritarias `de`, `pt`, `it`, `fr`.
- El build mantiene avisos no bloqueantes de Browserslist y chunks grandes.
- El lint global y los avisos de seguridad Lovable siguen fuera del alcance de este bloque.

## Decisiones

- Continuar usando Lovable para publicar frontend y Edge Functions.
- No usar Supabase CLI externo salvo instrucción explícita nueva.
- No desplegar Worker Cloudflare en este bloque porque no hubo cambios en el Worker.
- Tratar el bloque editorial como fase 1 de profundidad máxima, no como cierre definitivo de contenido.
- Mantener tareas de lint global, seguridad Lovable y Search Console como líneas separadas.

## Hipótesis

- Tras desplegar este bloque, las fichas de las 10 uvas prioritarias deberían mejorar calidad percibida, utilidad comercial y superficie SEO internacional.
- Search Console puede tardar días en reflejar cambios de prerender, canonical y contenido.
- La siguiente ampliación debería priorizar entidades por demanda SEO, valor comercial y capacidad de enlazado interno.

## Tareas pendientes

1. Cierre de esta sesión:
   - Commit y push del bloque editorial avanzado.
2. Despliegue Lovable:
   - Publicar frontend desde Lovable.
   - Pedir explícitamente en el chat de Lovable que despliegue la Edge Function `prerender`.
3. Validación productiva posterior:
   - Comprobar rutas humanas de las 10 uvas prioritarias.
   - Comprobar Googlebot en:
     - `/de/weinbibliothek/rebsorten/tempranillo`
     - `/pt/biblioteca-vinho/castas/albarino`
     - `/it/biblioteca-vino/vitigni/chardonnay`
     - `/fr/bibliotheque-vin/cepages/riesling`
   - Confirmar `X-Prerendered: true`, canonical, hreflang y contenido editorial enriquecido.
4. Search Console:
   - Reenviar `https://winerim.wine/sitemap.xml`.
   - Inspeccionar URLs prioritarias.
   - Revisar canonical seleccionada e informes hreflang.
5. Siguiente bloque editorial máximo nivel:
   - Priorizar 30-50 entidades por potencial SEO.
   - Ampliar uvas con más intención: Syrah, Merlot, Malbec, Nebbiolo, Sangiovese, Verdejo, Viura, Xarel-lo, Godello, Chenin Blanc.
   - Ampliar regiones: Rioja, Ribera del Duero, Rias Baixas, Rueda, Priorat, Borgoña, Burdeos, Champagne, Douro, Vinho Verde.
   - Añadir schema por entidad: `Article`, `FAQPage`, `BreadcrumbList`, `DefinedTerm`/`ItemList` donde encaje.
   - Crear enlaces internos por intención: uva -> región -> estilo -> maridaje -> guía de servicio.
6. Deuda separada:
   - Resolver lint global.
   - Revisar avisos de seguridad de Lovable.
