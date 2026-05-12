## Objetivo

Trasladar la presentación PDF actual (16 slides ES/EN, "La reVINOlución de la carta de vinos") a una página web nativa de winerim.wine, manteniendo su esencia visual y narrativa pero alineándola con la evolución de la marca ("Inteligencia dinámica", 6 pilares, foco grupos). Pensada para que un decisor la comparta por link con colegas y entiendan en 5 minutos qué es Winerim, los beneficios y cómo se implementa.

## URLs (multi-URL indexable)

- ES: `/presentacion`
- EN: `/en/presentation`
- FR: `/fr/presentation`
- IT: `/it/presentazione`
- DE: `/de/praesentation`
- PT: `/pt/apresentacao`

Registradas en `src/App.tsx`, `src/i18n/LanguageContext` (ROUTE_MAP con alternates) y `public/sitemap-extra.json`. Hreflang gestionado por `SEOHead`. Indexable con SEO activo. Añadidas a `STATIC_PAGES` del worker para prerender.

## Formato: híbrido deck + scroll

- **Desktop (≥1024px):** deck a pantalla completa, 1 slide por vista con `scroll-snap-type: y mandatory`.
  - Navegación: ↑/↓ teclado, rueda, swipe, dots laterales de progreso, contador inferior "03 / 14".
  - Botón "Pantalla completa" (Fullscreen API), botón "Compartir" (copia link con `?utm_source=presentation&utm_medium=share&grupo=Nombre`).
  - Transiciones `framer-motion` (ya instalado): fade + sutil parallax 300ms, una entrada por slide.
- **Móvil/tablet (<1024px):** las mismas slides como secciones verticales con `ScrollReveal` (componente existente). Sin snap, lectura natural.
- Sin Navbar/Footer estándar: header propio mínimo (logo Winerim · switcher de idioma · CTA "Hablemos").
- Personalización opcional: `?grupo=Nombre` aparece en slide 1 ("Preparado para {Nombre}") y en URL compartida.

## Estructura de slides (14 totales)

Mantiene la columna vertebral del PDF, modernizada con el lenguaje de la web:

1. **Portada** — "winerim · La reVINOlución de la carta de vinos" + capturas reales del producto sobre fondo motion sutil. Línea opcional "Preparado para {grupo}".
2. **El problema** — "Si tienes más de 100 vinos, tu cliente tiene más de 100 dudas." Tipografía gigante, datos sector debajo (cita de la web).
3. **Qué es Winerim** — Definición + visión "Inteligencia dinámica para la carta de vinos" (respeta `dynamic-intelligence-naming`). Captura tablet con ficha de vino.
4. **Cómo funciona "Haz match con tu vino"** — Recomendador + control para el restaurante. Dos columnas: comensal / restaurante.
5. **Beneficios para restaurantes** — Grid con los 7 beneficios del PDF (ticket medio, servicio eficiente, estrategia, stock, multilingüe, rotación, conversión). Iconografía propia coherente con la web.
6. **Beneficios para los comensales** — 4 beneficios (selección sin dudas, recomendaciones, confianza, experiencia enriquecida).
7. **Capacidades clave (los 6 pilares)** — Bloque nuevo que conecta con `mem://marketing/core-narrative`: Notas de cata IA, Maridaje automático, Big Data, Comparador, Gestión de stock, Pricing/márgenes. Grid 3×2 con preview real.
8. **Notas de cata + Maridaje automático** — Slide visual con dos screenshots reales de móvil/tablet (los del PDF p.8).
9. **Big Data y comparador** — Capturas reales del dashboard analítico y comparador (PDF p.9).
10. **Gestión de stock y rentabilidad** — 5 sub-bloques (actualización automática, alertas, rotación, pedidos, rentabilidad) sobre captura del backoffice.
11. **Especial grupos de restauración** — Slide nueva: ROI multi-local, benchmarking entre locales, control central + autonomía local. Apoyado en `GroupStrategyBlocks` y `mem://marketing/soluciones-grupos-estrategia`. **Eje narrativo del envío a colegas.**
12. **Implementación en días** — Línea de tiempo 4 pasos (carga inicial → QR/enlace → impresión opcional → soporte continuo). Texto del PDF p.12 condensado.
13. **Restaurantes que ya confían** — Mosaico de logos (los 30 del PDF p.13) + 1 cifra grande de la web ("X restaurantes activos"). Cita de caso de éxito.
14. **CTA final — "¿Ribera, Rioja o Winerim?"** — Headline del PDF p.14 + subtítulo "Lo único que nos diferencia de la competencia es que **te hacemos ganar dinero**". Botones: "Agendar demo" (→ `/contacto?origen=presentacion-grupos`), email/teléfono, botón "Compartir esta presentación".

## Contenido i18n

- Archivo `src/data/presentationContent.ts` con `Record<SupportedLang, PresentationContent>` (mismo patrón que Decision Center y GuideTemplate, ver `mem://technical/guide-template-multilang`).
- Tipado fuerte por slide para forzar paridad de traducciones.
- ES y EN aprovechan textos del PDF existente; FR/IT/DE/PT se traducen del EN.
- Capturas/logos compartidos entre idiomas en `src/assets/presentation/`.

## Assets visuales

Copiar desde los PDFs parseados a `src/assets/presentation/`:
- 6 screenshots de producto reales (p.1, p.2, p.5, p.8, p.9, p.10).
- 30 logos de restaurantes (p.13) en sprite/grid.
- Cabecera Bilbao/Mallorca como visual narrativo opcional.

Política `credibility-tone-policy`: capturas reales, sin mockups inventados.

## SEO

- `SEOHead` con title/description por idioma (≤60/≤155 chars, regla `meta-description-standard`).
  - ES: "Winerim · Presentación oficial para grupos de restauración"
  - Description con CTA implícita y palabra clave "carta de vinos".
- JSON-LD `WebPage` + `Organization` (dual injection según `seo-schema-architecture`).
- `<h1>` único en slide-portada; resto `<h2>`.
- Añadir las 6 URLs a `STATIC_PAGES` (`prerender-static-pages-coverage`) y a `sitemap-extra.json`.
- Indexable, canonical por idioma + hreflang cruzado gestionado por `SEOHead`.

## Tracking (centralized-analytics-architecture)

- `presentation_view` al cargar (con `lang`, `grupo` si presente).
- `presentation_slide_view` por slide visible (con índice + nombre).
- `presentation_share_click` cuando se copia link.
- CTA final dispara `lead_intent` con `funnel_stage="consideration"` y `product_interest="grupos"` (alineado a `b2b-intent-tracking`).

## Diseño visual

- Tokens semánticos existentes (`--background`, `--primary`, `--accent`, etc.). Sin colores hardcoded.
- Tipografía: la display de Hero para titulares 56–80px; sans actual para body.
- 1 idea por slide, mucho aire, números/citas a gran escala.
- Acento color burdeos/vino consistente con la marca actual (no replicar paleta dorada del PDF si no concuerda con la web — verificar tokens en `index.css` antes de implementar).
- Modo oscuro respetado.
- `prefers-reduced-motion`: animaciones reducidas a fade.
- Print stylesheet básico para que `Cmd+P` exporte un PDF presentable (1 slide por página, sin chrome).

## Archivos a crear/tocar

```text
Nuevos
  src/pages/Presentation.tsx                        # contenedor + lógica deck/scroll/keyboard
  src/components/presentation/PresentationShell.tsx # header propio + dots + share/fullscreen
  src/components/presentation/Slide.tsx             # wrapper snap + reveal + motion
  src/components/presentation/slides/                # 14 componentes de slide
  src/data/presentationContent.ts                   # i18n content (6 idiomas)
  src/assets/presentation/                          # 6 screenshots + logos clientes

Modificados
  src/App.tsx                                       # 6 rutas con React.lazy
  src/i18n/LanguageContext.tsx                      # ROUTE_MAP + alternates
  public/sitemap-extra.json                         # 6 URLs nuevas
  cloudflare-worker-v3-hybrid.js                    # añadir a STATIC_PAGES (referencia, deploy manual)
```

## Detalles técnicos

- Sin librerías nuevas: `framer-motion` y `lucide-react` ya disponibles. Scroll-snap nativo CSS.
- Lazy load de la página vía `React.lazy` (`performance-js-optimization`).
- Imágenes con `loading="lazy"` salvo la del slide 1 (`fetchpriority="high"`).
- IntersectionObserver para disparar animaciones y eventos de tracking por slide.
- Logos clientes como `<img>` en grid con filter de monocromo opcional para coherencia visual.

## Fuera de alcance (siguientes iteraciones)

- Generación server-side de PDF/PPTX descargable (por ahora `Cmd+P` cubre el caso).
- Subida del logo del grupo personalizado.
- Versión video/loom embebida en slide 13.
- Variantes A/B comerciales por canal.
- Slide bonus "Bilbao/Mallorca" del PDF — se puede añadir como #14 opcional si encaja narrativamente.
