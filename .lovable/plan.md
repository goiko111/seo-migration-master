

# Plan: Actualizar contenido integral (Home + Funcionalidades + Problemas)

Vamos a usar el listado completo de funcionalidades y problemas que has compartido para actualizar tres áreas clave del sitio.

---

## 1. Home — Secciones Problema, Solución y Features Preview

**ProblemSection.tsx** — Actualizar los 4 problemas actuales (genéricos) con los pains reales más impactantes para el restaurante:
- "La carta de vinos no vende, solo informa"
- "El equipo de sala no tiene conocimiento para recomendar"
- "Hay vinos parados con mala rotación"
- "No hay datos claros para tomar decisiones"

Actualizar la quote final con el resumen directo: "baja venta de vino, mala rotación, falta de conocimiento en sala, decisiones sin datos".

**SolutionSection.tsx** — Reescribir los 5 beneficios actuales para que reflejen mejor la propuesta de valor:
- Herramienta de venta (la carta guía al comensal y convierte)
- Herramienta de recomendación (IA + maridajes automáticos)
- Herramienta de gestión (stock, pricing, rotación)
- Herramienta de análisis (datos de comportamiento, KPIs)
- Herramienta de formación (el equipo aprende mientras trabaja)

Esto refleja directamente el "resumen muy directo" del documento.

**FeaturesPreview.tsx** — Actualizar las 6 features preview para cubrir las categorías principales:
- Carta digital interactiva (QR/link)
- Maridajes automáticos con IA
- Gestión de stock e inventario
- Pricing y márgenes
- Analítica avanzada
- IA aplicada al vino

---

## 2. Página /funcionalidades — Reorganización completa

Actualmente tiene 2 bloques (12 core + 6 mgmt). La reescribiremos con las **11 categorías reales** del documento, organizadas en 3 grandes bloques visuales:

**Bloque A — Para el comensal:**
1. Carta digital interactiva (QR, filtros, búsqueda, comparador, recomendaciones, multiidioma)
2. Información avanzada de cada vino (ficha técnica, descriptores IA, fotos, lenguaje accesible)
3. Maridaje e inteligencia gastronómica (maridajes automáticos, pairing estratégico)

**Bloque B — Para el restaurante:**
4. Gestión de carta (alta/edición, organización, personalización, multiidioma, base de datos)
5. Stock e inventario (control botellas, disponibilidad, rotación)
6. Pricing, márgenes y estrategia comercial (análisis precios/márgenes, optimización ticket, detección referencias poco rentables)
7. Analítica y datos (informes, comportamiento comensal, KPIs, Big Data)
8. Operativa del restaurante (pedidos, historial, roles, notificaciones)

**Bloque C — Tecnología e IA:**
9. IA aplicada al vino (generación fichas, maridajes IA, recomendación comercial, acciones dinámicas)
10. Integración y capa operativa (conexión carta-stock-venta, base para TPV/comandas)
11. En desarrollo (solicitar al sumiller, compartir selección, modo educación, FocusRIM)

Cada categoría se renderizará con su título, un listado de funcionalidades con iconos, y los screenshots existentes se redistribuirán en las categorías correspondientes. El Changelog y Roadmap se mantienen.

Traducciones: se actualizarán los 4 idiomas (es, en, it, fr).

---

## 3. Página /problemas — Ampliación con 3 bloques de pains

Actualmente solo tiene 1 problema ("Mi carta no vende"). La ampliaremos con los 3 bloques completos:

**Bloque 1 — Para el restaurante** (17 pains):
Cards con icono + título + descripción corta para cada pain (la carta no vende, vino infravendido, ticket medio bajo, equipo sin tiempo, falta conocimiento, dependencia del sumiller, demasiadas referencias, vinos parados, compras sin criterio, márgenes sin optimizar, precios mal planteados, carta desactualizada, falta visibilidad, sin datos, gestión separada, cuesta formar, se desaprovecha el vino).

**Bloque 2 — Para el comensal** (8 pains):
No entiende la carta, se abruma, va al barato/conocido, no sabe qué encaja, no entiende tecnicismos, miedo a equivocarse, vinos "todos iguales", elección no guiada.

**Bloque 3 — Para la experiencia global** (4 pains):
Mal maridaje arruina la experiencia, carta compleja frena venta, vino no integrado en sala, se pierde oportunidad de educar y vender.

Cada bloque con un CTA que enlaza a /demo o /funcionalidades. Se mantiene la sección final de "¿No encuentras tu problema?" con enlace al analizador.

---

## Detalle técnico

- **Archivos a modificar**: `ProblemSection.tsx`, `SolutionSection.tsx`, `FeaturesPreview.tsx`, `Funcionalidades.tsx`, `Problemas.tsx`
- **i18n**: Cada archivo mantiene su patrón actual de objetos por idioma. Se actualizarán los 4 idiomas.
- **Iconos**: Se seleccionarán iconos de `lucide-react` para cada nueva funcionalidad/pain.
- **Screenshots**: Los 20 screenshots existentes en /funcionalidades se redistribuyen en las nuevas categorías.
- **Sin cambios de base de datos** ni de rutas.

