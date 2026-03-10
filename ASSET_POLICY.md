# Asset & Third-Party Policy

## Images

| Context | Format | Max size | Loading | Priority |
|---------|--------|----------|---------|----------|
| Hero / LCP image | PNG/WebP | 150 KB | `eager` | `fetchPriority="high"` |
| Below-fold product shots | PNG/WebP | 200 KB | `lazy` | — |
| Logo sprites | PNG | 15 KB each | `lazy` | — |
| Blog article images | JPG/WebP | 150 KB | `lazy` | — |
| Decorative backgrounds | CSS gradient | 0 KB | — | — |

### Rules
1. **Always** set `width` and `height` attributes on `<img>` to prevent CLS.
2. **Only one** image per page gets `fetchPriority="high"` — the LCP candidate.
3. Use `decoding="async"` on all non-LCP images.
4. Prefer CSS gradients over background images for decorative elements.
5. Never import images in components that are above the fold unless they are the LCP image.

## Videos & Embeds

### YouTube
- **NEVER** use raw `<iframe>` for YouTube embeds.
- **ALWAYS** use `<YouTubeFacade>` component (click-to-load pattern).
- This saves ~800 KB of YouTube JS per embed on initial load.

```tsx
import YouTubeFacade from "@/components/YouTubeFacade";
<YouTubeFacade videoId="VIDEO_ID" title="Video title" />
```

### Other embeds (maps, forms, widgets)
- Wrap in `IntersectionObserver` or load on user interaction.
- Never load third-party iframes above the fold.

## Fonts

| Font | Weights | Usage |
|------|---------|-------|
| Playfair Display | 400, 700, 400i | Headings only |
| Inter | 400, 500, 600, 700 | Body text |

### Rules
1. Loaded via `<link rel="preload">` with `media="print"` swap trick.
2. `font-display: swap` — always.
3. **Never** add new font families without performance review.
4. **Never** add weights not listed above.

## Third-Party Scripts

| Script | Status | Strategy |
|--------|--------|----------|
| Google Fonts | ✅ Allowed | Non-blocking preload |
| YouTube embed | ✅ Allowed | Via YouTubeFacade only |
| Analytics/tracking | ⚠️ Requires review | Must be deferred, never render-blocking |
| Chat widgets | ❌ Avoided | Use WhatsApp link instead |
| Social share buttons | ❌ Avoided | Use native share API or simple links |

### Rules
1. **No script** may block the critical rendering path.
2. Any new third-party must be justified with a performance impact assessment.
3. Prefer first-party solutions over third-party widgets.

## Animations

### Above the fold
- Only `opacity` and `transform` animations allowed.
- Max 3 animated elements above the fold.
- No Framer Motion `whileInView` above the fold — use `initial` + `animate` only.

### Below the fold
- `ScrollReveal` with `viewport={{ once: true }}` — never re-animate.
- Avoid animating more than 6 elements simultaneously.

## Component Loading Strategy

| Component type | Import strategy |
|---------------|----------------|
| Navbar, Hero, LogoStrip | Eager import |
| Below-fold sections | `React.lazy()` + `<Suspense>` |
| Overlays (WhatsApp, Cookie, BackToTop) | Lazy, delayed render (2-3s) |
| Admin pages | Never in main bundle |
| Heavy libraries (Recharts, react-markdown) | Isolated to specific route chunks |

## Before Adding Any New Asset

1. ☐ Is it above the fold? → If not, lazy load it.
2. ☐ Does it import heavy dependencies? → Isolate in a separate chunk.
3. ☐ Is the image < 200 KB with explicit dimensions?
4. ☐ Is it a third-party script? → Does it block render?
5. ☐ Run `npm run build` and verify chunk sizes before merging.
