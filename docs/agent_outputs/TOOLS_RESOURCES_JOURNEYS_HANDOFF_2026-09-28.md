# Herramientas y Recursos - recorridos guiados 2026-09-28

## Hechos

- `/herramientas` incorpora `Recuperar tiempo operativo` como objetivo prioritario en
  español y enlaza a la calculadora creada en `13be084a`.
- `/recursos` presenta dos entradas antes del catálogo completo:
  `Mejorar la rentabilidad` y `Recuperar tiempo operativo`.
- En español ambas entradas llevan a los dos diagnósticos interactivos. En EN, IT, FR,
  DE y PT llevan a recursos localizados ya existentes hasta que las calculadoras tengan
  versiones propias.
- El catálogo, sus 22 recursos y los filtros siguen disponibles debajo de los recorridos.
- Se retiraron las formas difusas decorativas del hero de Recursos.
- Producción no se modificó.

## Decisiones

- No ocultar ni sustituir el catálogo: los recorridos sirven de orientación, no de
  barrera.
- No enlazar una calculadora ES desde una URL localizada inexistente.
- Mantener solo dos entradas principales para reducir decisión y repetición visual.
- Usar una banda de navegación con divisores, sin añadir tarjetas dentro de tarjetas.

## Hipótesis

- Dos recorridos visibles ayudarán a responder qué utilizar primero y conectarán mejor
  cada resultado con una acción posterior.

## Contradicciones y límites

- La arquitectura queda localizada, pero las dos calculadoras completas solo existen
  en español. Las demás lenguas usan alternativas editoriales reales.
- El catálogo móvil sigue siendo largo por contener 22 recursos; no se eliminó contenido
  ni se introdujo paginación en este bloque.

## Validación

- TypeScript: OK.
- ESLint focal: OK.
- Vite build: OK.
- Suite completa: `218/218`.
- Playwright:
  - destinos ES correctos;
  - alternativas EN correctas;
  - las 22 fichas se revelan al desplazarse;
  - overflow desktop `0`;
  - overflow móvil `0`;
  - errores de página y consola `0`.
- Evidencia:
  - `docs/agent_outputs/qa-2026-09-28/tools-resources-journeys/recursos-desktop.png`
  - `docs/agent_outputs/qa-2026-09-28/tools-resources-journeys/recursos-mobile.png`

## Tareas pendientes

1. Revisar copy comercial de los recorridos junto con el release de la calculadora.
2. Crear versiones EN/USD de los diagnósticos antes de enlazarlos desde campañas USA.
3. Medir uso de recorridos, inicio de herramienta y siguiente acción solo con analítica
   consentida.
4. Mantener publicación bloqueada hasta el release web coordinado.

