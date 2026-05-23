# Next Steps

## Hechos

- La base técnica para `de` y `pt` está implementada localmente.
- El trabajo está en la rama `codex/wine-library-de-pt`.
- El bloque técnico está comprometido en un commit de feature en esa rama.
- La rama `codex/wine-library-de-pt` está subida a `origin`.
- PR abierto: `https://github.com/goiko111/seo-migration-master/pull/1`.
- Tests, build y `deno check` de las funciones Edge tocadas pasan en el estado actual.
- El lint global tiene errores fuera del alcance directo del bloque actual.
- El lint dirigido sobre los archivos tocados no tiene errores ni warnings.

## Decisiones

- Priorizar primero revisión, validación y cierre del bloque técnico multilingüe.
- Mantener la deuda de lint global como tarea separada.
- Mantener la corrección del selector de idioma para rutas dinámicas como parte del bloque `de`/`pt`.

## Hipótesis

- Tras desplegar, la mejora de mayor impacto será enriquecer el contenido editorial localizado de entidades con alto potencial SEO.
- La generación de rutas desde una fuente común reducirá el riesgo de divergencia entre app, sitemap y prerender.

## Tareas pendientes

1. Revisar y aprobar el PR `https://github.com/goiko111/seo-migration-master/pull/1`.
2. Repetir `npm run test`, `npm run build`, lint dirigido y `deno check` si hay nuevos cambios.
3. Separar en una tarea propia los 66 errores del lint global.
4. Desplegar cuando el PR esté aprobado.
5. Validar en producción sitemap, canonical, hreflang, prerender, selector de idioma y rutas localizadas.
6. Plan editorial siguiente:
   - Mejorar copys propios en alemán y portugués para uvas, regiones, estilos y maridajes prioritarios.
   - Añadir contenido largo localizado en las páginas con mayor valor SEO.
   - Revisar términos de glosario por idioma.
   - Medir cobertura e indexación por idioma en Search Console.
