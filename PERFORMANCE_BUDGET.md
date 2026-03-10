# Performance Budget & Guidelines

## Objectives (Core Web Vitals targets)

| Metric | Target | Red flag |
|--------|--------|----------|
| **LCP** (Largest Contentful Paint) | < 2.5s | > 4.0s |
| **INP** (Interaction to Next Paint) | < 200ms | > 500ms |
| **CLS** (Cumulative Layout Shift) | < 0.1 | > 0.25 |
| **TTFB** (Time to First Byte) | < 800ms | > 1.8s |
| **FCP** (First Contentful Paint) | < 1.8s | > 3.0s |

## Bundle Budgets

| Asset type | Max size (gzip) | Notes |
|------------|----------------|-------|
| Initial JS (critical path) | < 150 KB | React + Router + minimal app shell |
| Per-route JS chunk | < 80 KB | Each lazy-loaded page |
| CSS (total) | < 50 KB | Tailwind purged |
| Any single image | < 200 KB | Use WebP/AVIF when possible |
| Hero/LCP image | < 150 KB | Prioritize with fetchPriority="high" |
| Logo PNGs (each) | < 15 KB | Already optimized |
| Total initial download | < 400 KB | Everything needed for FCP |

## Chunk Strategy

```
vendor-react.js     → React + ReactDOM (always loaded)
vendor-router.js    → React Router (always loaded)
vendor-motion.js    → Framer Motion (loaded with first animated component)
vendor-supabase.js  → Supabase client (loaded on first DB call)
vendor-query.js     → React Query (loaded with app shell)
vendor-radix.js     → UI primitives (lazy with components)
vendor-charts.js    → Recharts (only Admin pages)
vendor-markdown.js  → React Markdown (only Article pages)
```

## Image Rules

1. **Above the fold**: `loading="eager"` + `fetchPriority="high"` + explicit `width`/`height`
2. **Below the fold**: `loading="lazy"` + `decoding="async"`
3. **Decorative backgrounds**: Use CSS gradients instead of images when possible
4. **Logo carousels**: All logos `loading="lazy"` with explicit dimensions
5. **Article images**: Always lazy, always with aspect-ratio container

## Font Rules

1. Load via `<link rel="preload">` in index.html with `media="print"` trick
2. Use `font-display: swap` — always (set in Google Fonts URL)
3. Only load weights actually used:
   - Playfair Display: 400, 700, 400i (headings)
   - Inter: 400, 500, 600, 700 (body)
4. Never add new font families without performance review

## Animation Rules

1. Only animate `transform` and `opacity` (GPU-composited, no reflow)
2. Never animate `width`, `height`, `top`, `left`, `margin`, `padding`
3. Use `will-change: transform` sparingly (only on active animations)
4. ScrollReveal: `viewport={{ once: true }}` — never re-animate
5. Prefer CSS animations over Framer Motion for simple effects (e.g., spinner)

## Component Rules

1. **Above the fold**: Eagerly import (Navbar, HeroSection, LogoStrip)
2. **Below the fold**: Always `React.lazy()` + `<Suspense>`
3. **Overlays** (WhatsApp, BackToTop, CookieConsent): Lazy loaded, null fallback
4. **Admin pages**: Never imported in the main bundle
5. **Heavy libraries** (Recharts, react-markdown): Only in their specific page chunks

## Third-Party Scripts

| Script | Load strategy | Impact |
|--------|--------------|--------|
| Google Fonts | Preload + media=print swap | Low (non-blocking) |
| YouTube embed | `loading="lazy"` iframe | None until scrolled |
| Supabase | Dynamic import via client.ts | Deferred |

## CLS Prevention Checklist

- [ ] All images have explicit `width` and `height` attributes
- [ ] Font loading uses `font-display: swap`
- [ ] No layout-shifting ad or embed insertions
- [ ] Navbar has fixed height (h-16 sm:h-20)
- [ ] Hero section has `min-h-screen` — no shift on content load
- [ ] LogoStrip has fixed-height containers for logos

## Monitoring

1. Run Lighthouse on every deploy (aim for 90+ mobile performance)
2. Check Real User Metrics via Google Search Console CWV report
3. Test on 4G throttled connection monthly
4. Review bundle size on major dependency updates

## When Adding New Features

1. Check if the feature needs to be above the fold → if not, lazy load
2. Check if it imports heavy dependencies → if so, create a separate chunk
3. Never import entire icon libraries — import individual icons
4. Test with `npm run build` and check chunk sizes before merging
5. If adding images, compress to < 200KB and add dimensions
