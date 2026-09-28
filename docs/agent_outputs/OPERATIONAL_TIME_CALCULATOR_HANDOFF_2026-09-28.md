# Calculadora de tiempo operativo recuperable - handoff 2026-09-28

## Alcance

Paquete local, sin publicacion, para la ruta:

`/herramientas/calculadora-tiempo-operativo`

Fuente:

- Worktree: `/Users/GOIKO/Documents/Playground/winerim-time-calculator-20260928`
- Rama: `codex/winerim-time-calculator-20260928`
- Base: `01ff8464` (`fix: preserve ChatGPT Ads attribution`)

## Hechos

- La calculadora cubre ocho tareas operativas: carta y precios, margenes, documentos,
  conciliacion TPV, distribuidores, informes, grupos y formacion.
- Cada hipotesis es editable. La formula visible es:
  `(tiempo manual - tiempo estimado con Winerim) x frecuencia`.
- El resultado separa horas recuperables de tiempo adicional y muestra semana, mes y
  ano. Una tarea negativa nunca queda oculta ni compensa silenciosamente otra.
- Existe un ejemplo ficticio de 26 h/mes, identificado como ejemplo y no como promesa.
- La herramienta entrega el resultado antes de cualquier captacion, no contiene
  formulario obligatorio y permite descargar el escenario en texto.
- Recomienda tres acciones enlazadas a funcionalidades reales de Winerim.
- La ruta queda preparada en React, Worker, sitemap Edge y prerender Edge. No se genero
  ni comprometio el sitemap estatico completo.
- La primera version es ES/EUR. No se ha presentado como traduccion global ni como
  recorrido USA.
- Produccion no se modifico.

## Decisiones

- No publicar cifras fijas de ahorro de horas ni convertir horas en ahorro salarial.
- Mantener hipotesis transparentes y editables; el resultado es orientativo.
- No insertar un formulario antes del resultado ni emitir eventos de lead por usar la
  calculadora.
- Mantener esta rama aislada hasta decidir su integracion en el release web coordinado.
- Resolver EN/USD como un bloque independiente, con copy y supuestos revisados.

## Hipotesis

- Un diagnostico guiado por tareas puede ayudar a elegir mejor entre Herramientas,
  Recursos y funcionalidades de producto.
- La descarga del escenario puede mejorar la continuidad comercial sin bloquear la
  utilidad inicial.

## Contradicciones y limites

- La ruta esta preparada en codigo, pero no existe en produccion hasta un release
  autorizado.
- `deno` no esta disponible en el entorno actual; las dos Edge Functions fueron
  verificadas por tests, TypeScript del proyecto y build, pero no con `deno check` en
  este worktree.
- El acceso Supabase al proyecto web `pwkqbcgjrhoyxrsmcypw` sigue bloqueado; por tanto
  no se puede coordinar todavia el release completo de Biblioteca y Edge.

## Validacion reproducible

- `node --check edge-router/winerim-pages-router.js`: OK.
- Tests focales de calculadora y superficies afectadas: `27/27`.
- Suite completa: `218/218`, 25 archivos.
- TypeScript: OK.
- ESLint focal: OK.
- Vite build: OK.
- Playwright escritorio y movil: OK.
  - ocho tareas;
  - ejemplo `26 h/mes`;
  - edicion `22 h/mes`;
  - una tarea desactivada `17 h/mes`;
  - cero overflow horizontal;
  - cero errores de pagina y consola.
- Evidencia:
  - `docs/agent_outputs/qa-2026-09-28/time-calculator/desktop.png`
  - `docs/agent_outputs/qa-2026-09-28/time-calculator/mobile.png`

## Tareas pendientes

1. Revisar el commit local y decidir si se integra en el mismo release que
   Web/Biblioteca o en uno posterior.
2. Antes de publicar, ejecutar `deno check` sobre `sitemap` y `prerender` en un entorno
   con Deno disponible.
3. Tras autorizacion explicita, desplegar todas las capas desde una unica revision y
   validar humano, Googlebot y OAI en produccion.
4. Reorganizar Herramientas y Recursos alrededor de dos entradas: rentabilidad y tiempo.
5. Disenar despues el recorrido EN/USD, sin traducir literalmente los supuestos ES.

