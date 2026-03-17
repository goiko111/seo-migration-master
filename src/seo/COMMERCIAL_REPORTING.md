# Reporting Comercial Interno — Winerim

> Complemento de `MEASUREMENT_PLAN.md` (SEO/visibilidad).  
> Este documento cubre captación, intención comercial y conversión.

---

## 1. Conversión

### KPIs

| Métrica | Fuente | Evento dataLayer |
|---|---|---|
| Demos solicitadas | `contact_leads` (form_type='demo') | `generate_lead { form_type: "demo" }` |
| Contactos recibidos | `contact_leads` (form_type='contacto') | `generate_lead { form_type: "contacto" }` |
| Recursos descargados | `contact_leads` (form_type='recurso_*') | `resource_download { resource_name }` |
| CVR por canal | GA4: conversions / sessions por source/medium | — |
| CVR por landing | GA4: conversions por landing_page | — |

### Vista sugerida (Looker Studio)

```
┌─────────────────────────────────────────────────────┐
│  CONVERSIONES — Últimos 30 días                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │ Demos    │  │ Contactos│  │ Recursos         │  │
│  │    12    │  │     8    │  │      34          │  │
│  └──────────┘  └──────────┘  └──────────────────┘  │
│                                                     │
│  CVR por canal:                                     │
│  Organic 2.1% │ Direct 3.8% │ Paid 4.2% │ Social 0.9% │
│                                                     │
│  Top landings por conversión:                       │
│  /analisis-carta → demo (6.2%)                     │
│  /precios → demo (5.1%)                            │
│  /blog/metricas-fb-vino → recurso (3.4%)           │
└─────────────────────────────────────────────────────┘
```

---

## 2. Intención Comercial

### KPIs

| Métrica | Evento dataLayer |
|---|---|
| Visitas alta intención | `high_intent_page` |
| Herramientas más usadas | `tool_used { tool_name }` |
| Recursos con más captación | `resource_download` + DB |
| Sesiones comprometidas (≥3 págs) | `winerim_engaged_session` |
| Exploradores multi-producto | `winerim_product_explorer` |
| Engagement time en producto | `winerim_engagement_milestone` |
| Funnel stage por sesión | `winerim_session_update { session_funnel_stage }` |

### Scoring (implementado en intentTracking.ts)

| Tier | Score | Señal típica | % estimado |
|---|---|---|---|
| Cold | <30 | Blog casual, bounce | ~70% |
| Warm | 30-79 | Herramientas, descargas | ~20% |
| Hot | 80-149 | Pricing + producto + engagement | ~8% |
| Qualified | ≥150 | Demo + múltiples señales | ~2% |

### Pesos por página

| Página | Peso base | Categoría |
|---|---|---|
| /demo | 40 | demo |
| /contacto | 40 | contact |
| /precios | 30 | pricing |
| /soluciones/grupos-restauracion | 25 | solution_groups |
| /producto/winerim-supply | 20 | product_supply |
| /producto/winerim-core | 15 | product_core |
| /producto/inteligencia-dinamica | 15 | product_id |
| /casos-exito | 12 | case_study |
| /recursos/* | 12 | resource_download |
| /analisis-carta | 8 | tool |
| /blog/* (comercial) | 5 | blog_commercial |
| /blog/* (editorial) | 2 | blog_editorial |

### Multiplicadores por acción

| Acción | ×Mult |
|---|---|
| Pageview | ×1 |
| CTA click | ×1.2 |
| Form start | ×1.5 |
| Tool use | ×2 |
| Resource download | ×2.5 |
| Form submit | ×3 |

---

## 3. Interés por Producto

### Métricas

| Producto | Pageviews | Engagement (s) | Scroll ≥75% | Multi-producto |
|---|---|---|---|---|
| Winerim Core | GA4 content_group | `engagement_milestone` | `scroll_depth` | `winerim_product_explorer` |
| Inteligencia Dinámica | idem | idem | idem | idem |
| Winerim Supply | idem | idem | idem | idem |
| Grupos | idem | idem | idem | idem |

Variables de profundidad por sesión (dataLayer `winerim_session_update`):
- `session_product_depth_core`
- `session_product_depth_supply`
- `session_product_depth_groups`
- `session_product_depth_id`

---

## 4. SEO / Contenido (vista comercial)

| Métrica | Cómo medir |
|---|---|
| Artículos que generan leads | GA4: landing = `/blog/*` → conversión |
| CTR blog → herramienta | `cta_click { cta_position: "article_mid" }` |
| Flujo blog → tool → demo | GA4 Path Exploration 3 pasos |
| Artículos top orgánico | GSC: clicks por `/blog/*` |

---

## 5. Internacional

| Métrica | Variable |
|---|---|
| Tráfico por idioma | `page_path` prefix o `intent_lang` |
| Leads por idioma | `generate_lead` + `intent_lang` |
| Herramientas por idioma | `tool_used` + `intent_lang` |

---

## 6. Dónde Construir

| Bloque | Herramienta | Notas |
|---|---|---|
| Conversiones | Looker Studio + GA4 | Dashboard compartido |
| Intención | Looker Studio + BigQuery (opt) | Path exploration en GA4 UI |
| Producto | Looker Studio | Métricas GA4 simples |
| SEO comercial | Looker Studio + Search Console | Combina tráfico + leads |
| Internacional | Looker Studio | Segmentar por lang |
| Leads detalle | Admin `/admin` → Leads | Ya implementado, CSV export |
| Debug scoring | Consola navegador | `JSON.parse(localStorage.getItem('winerim_intent_score'))` |

---

## 7. Eventos dataLayer — Referencia

| Evento | Trigger | Vars clave |
|---|---|---|
| `page_view` | Navegación | `page_path`, `content_group` |
| `high_intent_page` | Página high-level | `page_name` |
| `cta_click` | CTA click | `cta_id`, `cta_destination`, `cta_position` |
| `generate_lead` | Form submit | `form_type` |
| `resource_download` | Descarga | `resource_name` |
| `tool_used` | Calculadora usada | `tool_name` |
| `scroll_depth` | 25/50/75/100% | `percent` |
| `engagement_milestone` | 30/60/120/300s | `seconds` |
| `winerim_intent` | Señal clasificada | `intent_category`, `intent_level`, `intent_action` |
| `winerim_session_update` | Cada pageview | `session_pages_count`, `session_funnel_stage`, `session_product_depth_*` |
| `winerim_engaged_session` | ≥3 páginas | `session_pages`, `funnel_stage` |
| `winerim_product_explorer` | ≥2 productos | `products_explored` |
| `ads_conversion` | Conversión Ads | `conversion_type`, `value` |
| `ads_micro_conversion` | Micro señal | `micro_action` |
| `remarketing_event` | Audiencia | `page_type`, `intent_level` |

---

## 8. Checklist

- [ ] GA4 + GTM configurados con Measurement ID real
- [ ] Eventos `generate_lead` marcados como conversión en GA4
- [ ] Looker Studio dashboard con los 5 bloques
- [ ] Search Console conectado a Looker Studio
- [ ] Audiencias GA4 creadas (Product Evaluators, Pricing Visitors, Tool Users)
- [ ] Verificar eventos en GA4 DebugView
- [ ] Primer informe mensual con el equipo
