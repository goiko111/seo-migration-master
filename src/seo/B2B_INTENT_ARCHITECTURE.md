# B2B Buyer Intent Architecture — Winerim

## 1. Visión General

Sistema de rastreo de intención B2B que prepara la web para integración con herramientas de *buyer intent* y *visitor identification* sin comprometer la privacidad.

**No prometemos**: identificar emails individuales de visitantes anónimos.
**Sí garantizamos**: señales estructuradas en dataLayer que cualquier herramienta B2B puede consumir.

---

## 2. Herramientas Compatibles

| Herramienta | Cómo consume los datos | Integración |
|---|---|---|
| **Dealfront / Leadfeeder** | Lee `window.dataLayer` nativamente | Drop-in (añadir script) |
| **HubSpot Tracking Code** | Lee dataLayer vía GTM trigger | GTM Custom HTML tag |
| **Clearbit Reveal** | API-based, complementa con dataLayer | GTM + webhook |
| **6sense / Bombora** | Tag propio + dataLayer enrichment | GTM Custom HTML |
| **Google Ads Smart Bidding** | Consume eventos GA4 como signals | Nativo via GA4 |
| **LinkedIn Insight Tag** | Remarketing por empresa | GTM tag |

---

## 3. Eventos dataLayer — Contrato B2B

### 3.1 `winerim_intent` — Señal de intención individual

Disparado en cada acción clasificada (pageview, tool_use, download, form, CTA click).

```json
{
  "event": "winerim_intent",
  "intent_category": "product_core | pricing | demo | tool | ...",
  "intent_level": "high | medium | low",
  "intent_action": "pageview | tool_use | resource_download | form_submit | cta_click | scroll_depth",
  "intent_page": "/producto/winerim-core",
  "intent_label": "margin_calculator",
  "intent_value": 15,
  "intent_lang": "es",
  "intent_timestamp": 1710672000000
}
```

### 3.2 `winerim_session_update` — Resumen de sesión (cada pageview)

```json
{
  "event": "winerim_session_update",
  "session_pages_count": 5,
  "session_unique_categories": 3,
  "session_categories": "product_core,pricing,tool",
  "session_funnel_stage": "decision",
  "session_duration_seconds": 245,
  "session_tools_used": 2,
  "session_resources_downloaded": 1,
  "session_product_depth_core": 2,
  "session_product_depth_supply": 1,
  "session_product_depth_groups": 0,
  "session_product_depth_id": 1,
  "session_current_path": "/precios",
  "session_current_category": "pricing"
}
```

### 3.3 `winerim_engaged_session` — Sesión comprometida (≥3 páginas)

```json
{
  "event": "winerim_engaged_session",
  "session_pages": "/blog/carta-vinos → /producto/winerim-core → /precios",
  "funnel_stage": "decision"
}
```

### 3.4 `winerim_product_explorer` — Explorador de producto (≥2 productos visitados)

```json
{
  "event": "winerim_product_explorer",
  "products_explored": "core,supply"
}
```

### 3.5 `winerim_engagement_milestone` — Tiempo de engagement activo

```json
{
  "event": "winerim_engagement_milestone",
  "engagement_seconds": 60,
  "engagement_page": "/producto/winerim-core"
}
```

Milestones: 30s, 60s, 120s, 300s. Solo en páginas medium/high intent.
Pausa automática cuando el tab está oculto o el usuario está inactivo 30s.

---

## 4. Clasificación de Páginas por Señal Comercial

### Nivel 1 — DECISIÓN (scoring: 25-40 pts)

| Página | Categoría | Weight |
|---|---|---|
| `/demo` | demo | 40 |
| `/contacto` | contact | 40 |
| `/precios` | pricing | 30 |
| `/soluciones/grupos-restauracion` | solution_groups | 25 |

### Nivel 2 — EVALUACIÓN (scoring: 10-20 pts)

| Página | Categoría | Weight |
|---|---|---|
| `/producto/winerim-core` | product_core | 15 |
| `/producto/inteligencia-dinamica` | product_id | 15 |
| `/producto/winerim-supply` | product_supply | 20 |
| `/soluciones/*` (verticales) | solution_vertical | 10 |
| `/casos-exito` | case_study | 12 |
| `/recursos/*` | resource_download | 12 |
| `/analisis-carta` | tool | 8 |

### Nivel 3 — AWARENESS (scoring: 2-8 pts)

| Página | Categoría | Weight |
|---|---|---|
| `/blog/*` (editorial) | blog_editorial | 2 |
| `/blog/*` (comercial) | blog_commercial | 5 |
| `/herramientas` | tool | 8 |
| `/guias-y-recursos` | resource_download | 2 |

### Multiplicadores por acción

| Acción | Multiplicador |
|---|---|
| Pageview | ×1 |
| CTA click | ×1.2 |
| Form start | ×1.5 |
| Tool use | ×2 |
| Resource download | ×2.5 |
| Form submit | ×3 |
| Scroll depth | ×0.5 |

---

## 5. Scoring y Segmentación

| Tier | Score | Señal |
|---|---|---|
| **Cold** | <30 | Navegación editorial, bounce |
| **Warm** | 30-79 | Uso de herramientas, descarga de recursos |
| **Hot** | 80-149 | Visita a pricing/producto + engagement |
| **Qualified** | ≥150 | Demo/contacto + múltiples señales comerciales |

Score almacenado en `localStorage` (solo con consentimiento cookies).
Resumen de sesión en `sessionStorage` (sin cookies, sin consentimiento requerido).

---

## 6. Funnel Stage Automático

Clasificación automática basada en las categorías visitadas en la sesión:

```
awareness  → Solo blog, guías, home
consideration → Producto, soluciones, herramientas, casos de éxito
decision → Precios, demo, contacto
```

Variable `session_funnel_stage` disponible en dataLayer para:
- GTM triggers condicionales
- Audiencias de remarketing por etapa
- HubSpot lifecycle stage mapping

---

## 7. Guía de Integración

### 7.1 Dealfront / Leadfeeder

```html
<!-- GTM: Custom HTML tag, trigger: All Pages -->
<script>
(function(ss,ex){
  window.ldfdr=window.ldfdr||function(){(ldfdr._q=ldfdr._q||[]).push([].slice.call(arguments));};
  (function(d,s){fs=d.getElementsByTagName(s)[0];
  function ce(src){var cs=d.createElement(s);cs.src=src;cs.async=1;fs.parentNode.insertBefore(cs,fs);};
  ce('https://sc.lfeeder.com/lftracker_v1_'+ss+(ex?'_'+ex:'')+'.js');
  })(document,'script');
})('XXXXXX');
</script>
```

Dealfront lee `window.dataLayer` automáticamente. Los eventos `winerim_intent` y `winerim_session_update` aparecen como actividad de la empresa identificada.

### 7.2 HubSpot

1. Instalar HubSpot Tracking Code vía GTM
2. Crear trigger GTM: Custom Event = `winerim_intent` 
3. Tag: HubSpot Custom Behavioral Event con variables:
   - `intent_category` → DL Variable
   - `intent_level` → DL Variable
   - `session_funnel_stage` → DL Variable

### 7.3 Audiencias de Remarketing (Google Ads)

Crear audiencias en GA4 basadas en:

| Audiencia | Condición |
|---|---|
| Product Evaluators | `content_group` contains "product" AND `session_engaged` = true |
| Pricing Visitors | `page_path` = "/precios" |
| Tool Users | Event `tool_used` fired |
| Multi-product Explorers | Event `winerim_product_explorer` fired |
| Decision Stage | `session_funnel_stage` = "decision" (via GTM → GA4) |

---

## 8. Qué NO Hacemos (y Por Qué)

| Lo que NO hacemos | Por qué |
|---|---|
| Fingerprinting de navegador | Ilegal en EU, inútil con iOS/Firefox |
| Reverse DNS lookup | No identifica personas, solo ISPs |
| Prometer email del visitante | Ninguna herramienta lo hace de forma legal |
| Cookies de terceros | Eliminadas por Chrome, Safari, Firefox |
| Tracking cross-site | Bloqueado por ITP, ETP |

**Lo que SÍ hacemos**: Señales de intención estructuradas que herramientas B2B (Dealfront, 6sense) cruzan con sus bases de datos de IPs empresariales para identificar **empresas** (no individuos).

---

## 9. Checklist de Activación

- [ ] Instalar Dealfront/Leadfeeder script (GTM Custom HTML)
- [ ] Verificar que `winerim_intent` aparece en dataLayer (DevTools → Console → `dataLayer.filter(e => e.event === 'winerim_intent')`)
- [ ] Verificar `winerim_session_update` se actualiza en cada navegación
- [ ] Verificar `winerim_engagement_milestone` se dispara a los 30s en páginas de producto
- [ ] Crear audiencias GA4 basadas en las señales documentadas
- [ ] Conectar HubSpot Tracking Code si se usa HubSpot
- [ ] Verificar que el scoring local funciona: `JSON.parse(localStorage.getItem('winerim_intent_score'))`
