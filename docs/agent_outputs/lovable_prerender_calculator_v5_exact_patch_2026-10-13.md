# Lovable: parche exacto de prerender para calculadora operativa v5

## Hecho confirmado

- La fuente viva local `supabase/functions/prerender/index.ts` tiene SHA-256
  `fd668c97f88bed9d073716f9cf3b7d0f3bff332767302e071fa5968d305d3b4d`.
- El despliegue comunicado por Lovable conserva contenido antiguo de siete tareas.
- La salida SEO publica no esta afectada: `winerim-proxy` entrega a Googlebot y
  OAI el contenido de trece tareas y tres perfiles.

## Prompt exacto para Lovable

Modifica y despliega exclusivamente la Edge Function `prerender`. No despliegues
frontend, `sitemap`, migraciones, SQL, datos, articulos, Workers, Pages ni DNS.

En `supabase/functions/prerender/index.ts`, sustituye el contenido de las entradas
`/herramientas/calculadora-tiempo-operativo` y
`/en/tools/operational-time-calculator` para que contengan exactamente estos
textos funcionales:

### Espanol

- Meta description: `Calcula tiempo recuperable en hasta trece tareas de vino para restaurantes, hoteles y grupos, con minutos Winerim, ranking y jornadas anuales.`
- Subtitle: `Compara tu tiempo actual con los minutos estimados con Winerim para restaurante, hotel o grupo mediante hipótesis visibles y editables.`
- Seccion 1: `Fórmula transparente` / `Los minutos con Winerim se calculan desde el tiempo actual y una hipótesis visible de automatización por tarea. El resultado usa la frecuencia semanal indicada por el usuario.`
- Seccion 2: `Trece tareas y tres perfiles` / `Restaurante activa diez tareas comunes. Hotel o resort y grupo incorporan también cartas en varios idiomas, consolidación entre centros y dudas o formación del equipo.`
- Seccion 3: `Prioridades y jornadas anuales` / `El resultado muestra semana, mes y año, las tres automatizaciones con mayor impacto y su equivalencia orientativa en jornadas de ocho horas. No es una garantía.`

### Ingles

- Meta description: `Calculate recoverable time across up to thirteen wine tasks for restaurants, hotels and groups, with Winerim minutes, ranking and annual workdays.`
- Subtitle: `Compare current time with estimated Winerim minutes for a restaurant, hotel or group using visible, editable assumptions.`
- Section 1: `Transparent formula` / `Winerim minutes are calculated from current time and a visible automation assumption for each task. Results use the weekly frequency entered by the user.`
- Section 2: `Thirteen tasks and three profiles` / `Restaurant activates ten common tasks. Hotel or resort and group also include multilingual wine-list updates, multi-location consolidation and recurring team questions or training.`
- Section 3: `Priorities and annual workdays` / `Results show week, month and year, the three highest-impact automations and an indicative equivalent in eight-hour workdays. This is not a guarantee.`

Conserva H1, canonical, FAQ, breadcrumbs e internal links actuales de ambas
entradas. Antes de desplegar, confirma que ya no aparecen `Siete tareas semanales`
ni `Seven weekly tasks` en esas dos rutas. Despues despliega solo `prerender` y
devuelve: source SHA-256, version/edit del despliegue y verificacion HTTP `200` de
ambas rutas con las frases `Trece tareas y tres perfiles` y
`Thirteen tasks and three profiles`.

Si el archivo actual no contiene esas entradas, no reconstruyas nada: anadelas con
los mismos canonical y estructura que las entradas existentes y detalla el diff.
