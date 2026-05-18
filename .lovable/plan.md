
# Plan — Simulador de Carta de Vinos (MVP)

Nueva herramienta pública en `/simulador-carta` que complementa al Analizador. Mismo patrón UX: formulario → fire-and-forget POST → skeleton animado → teaser → unlock por email. Backend ya desplegado en `https://simulator.winerim.wine`.

## Alcance del MVP (Fase 1)

Implemento todo lo marcado como MVP: landing + formulario 5 pasos + POST + skeleton animado + teaser + unlock. Difiero a fases posteriores:
- V2: cualificación post-unlock, export CSV
- V3: regiones dinámicas avanzadas por país (incluyo lista estática), widget flotante alternativo

## Archivos nuevos

1. `src/pages/SimuladorCarta.tsx` — página + orquestador del flujo (estados: `landing → form → simulating → teaser → unlocked`). `<SEOHead>` con title/description/canonical.
2. `src/components/simulator/SimulatorHero.tsx` — hero (H1 + subtítulo + CTA scroll), 6 iconos de valor, banner diferenciador "¿Ya tienes carta? → /analisis-carta".
3. `src/components/simulator/SimulatorForm.tsx` — wrapper con progress bar segmentada (5 dots), navegación Atrás/Siguiente, validación inline, transición slide-left con Framer Motion (ya en deps).
4. `src/components/simulator/steps/Step1Restaurant.tsx` — nombre, ciudad (input simple, sin Google Places en MVP), país, tipo cocina (chips multi), aforo (slider 20–300 step 5), ¿ya tiene carta? con nota condicional hacia analizador.
5. `src/components/simulator/steps/Step2Concept.tsx` — ticket medio (chips), `WPSSlider`, servicio vino (chips multi), sommelier (radio), almacenamiento (select).
6. `src/components/simulator/steps/Step3Client.tsx` — perfil cliente (chips multi), sensibilidad precio (slider 0–100 con labels), conocimiento vino (chips), preferencia origen (chips multi).
7. `src/components/simulator/steps/Step4Budget.tsx` — presupuesto (slider 1000–50000), bev cost (chips), margen (chips), servicios/semana (number con +/−), comensales/semana (auto-calc editable: `aforo × 0.65 × servicios / 2`).
8. `src/components/simulator/steps/Step5Preferences.tsx` — tipos vino (chips pre-checked), regiones (chips dinámicos por país desde mapa estático), estilo carta (radio), vinos naturales (radio), notas (textarea max 500).
9. `src/components/simulator/WPSSlider.tsx` — slider 0–100 con 5 zonas, icono 🍷×N, nombre y descripción de zona actual.
10. `src/components/simulator/ChipGroup.tsx` — helper interno para chips (single/multi) usando Button shadcn.
11. `src/components/simulator/SimulationProgress.tsx` — timeline 7 pasos (0–30s) con Progress, label dinámico, skeletons de las cajas del teaser que se rellenan en cuanto llega el teaser inicial.
12. `src/components/simulator/TeaserReport.tsx` — score circle (SVG), métricas, tabla distribución con emojis por tipo, alertas, secciones blur con overlay de unlock.
13. `src/components/simulator/UnlockForm.tsx` — email/nombre/teléfono con validación zod; al éxito redirige a `https://simulator.winerim.wine{reportUrl}`.
14. `src/components/simulator/ScoreCircle.tsx` — círculo SVG con color por umbral (verde 70+, ámbar 45–69, rojo <45).
15. `src/lib/simulatorApi.ts` — cliente del Worker:
    - `generateSimulationId()` → `sim_` + 8 chars
    - `submitSimulation(payload)` → POST `/v1/simulate` con `keepalive: true`, devuelve `{ teaser }` cuando responde
    - `pollStatus(id)` → GET `/v1/simulate/status/{id}`
    - `unlockReport(id, body)` → POST `/v1/simulate/unlock/{id}`
    - Constante `SIMULATOR_BASE_URL = "https://simulator.winerim.wine"`
16. `src/data/simulatorRegions.ts` — mapa `Record<CountryCode, string[]>` con las regiones del brief.

## Archivos modificados

- `src/App.tsx` — añadir ruta lazy `/simulador-carta` (router centralizado, mem://technical/app-router-centralization).
- `src/pages/WineListAnalyzer.tsx` — banner cruzado "¿Aún no tienes carta? → Simúlala aquí".
- `public/sitemap-extra.json` — añadir URL nueva (alta prioridad, herramienta pública).

## Comportamiento clave (paridad con analizador, mem reciente)

- `simulationId` se genera en el frontend antes del POST. El backend lo reutiliza para guardar el estado.
- POST fire-and-forget con `keepalive: true`; la UI cambia inmediatamente a `simulating`.
- El `teaser` de la respuesta del POST se usa para rellenar skeletons sin esperar al polling.
- Polling cada 3s; al `complete` → fade-in datos reales.
- **Deadline 40s**: si no `complete`, mostrar `UnlockForm` con copy "Te enviaremos el informe por email en menos de 48h". El polling sigue en background; si llega antes de unlock, el teaser se actualiza.
- Nunca mostrar error al usuario (solo `console.error`).
- Tras unlock exitoso → redirigir a `${SIMULATOR_BASE_URL}/v1/simulate/report/{id}` en la misma pestaña.

## Diseño

- Reuso tokens semánticos existentes (`--wine`, `--gold`, etc. en `index.css`). Sin colores hardcoded.
- Componentes shadcn ya disponibles: `Progress`, `Slider`, `RadioGroup`, `Select`, `Input`, `Textarea`, `Button`, `Card`, `Skeleton`, `Label`.
- Mobile-first; cada paso ocupa la pantalla, scroll mínimo.
- Animaciones: Framer Motion (ya en proyecto) para slide entre pasos y fade-in de resultados.

## SEO

- Title: "Simulador de Carta de Vinos | Diseña tu carta ideal · Winerim" (<60)
- Meta description (<155, con keyword, frase completa): "Diseña la carta de vinos perfecta para tu restaurante en 3 minutos. Gratis. Basado en datos de 149+ restaurantes reales."
- H1 único; canonical absoluto; hreflang vía `SEOHead`.

## Fuera de alcance (explícito)

- i18n completo (UI sólo ES; el campo `lang` se envía como `"es"`).
- Cualificación post-unlock, export CSV, regiones dinámicas avanzadas, Google Places autocomplete, widget flotante.
- Cambios en el menú principal (lo dejo para una pasada UX posterior cuando se confirme la jerarquía).

## Validación

- `tsc` limpio (lo verifica el harness).
- Curl al Worker con payload mínimo para confirmar contrato.
- Screenshot del flujo en preview tras implementar.
