# Plan de Analytics — Winerim

> Última actualización: 2026-03-17

---

## 1. Stack de Medición

| Capa | Herramienta | Estado |
|---|---|---|
| Tag Manager | Google Tag Manager (GTM-XXXXXXX) | ✅ Snippet instalado |
| Analytics | Google Analytics 4 (configurar en GTM) | ⬜ Crear propiedad GA4, añadir tag en GTM |
| Consent | Google Consent Mode v2 | ✅ Default denied, actualizado on accept/reject |
| Intent scoring | Custom (localStorage + dataLayer) | ✅ `intentTracking.ts` |
| Event layer | `src/lib/analytics.ts` | ✅ Centralizado |

---

## 2. Consentimiento de Cookies

Flujo implementado:

1. **index.html**: `gtag('consent', 'default', { analytics_storage: 'denied', ... })` antes del snippet GTM
2. **CookieConsent.tsx**: al aceptar → `updateConsent(true)` → `gtag('consent', 'update', { analytics_storage: 'granted', ... })`
3. **CookieConsent.tsx**: al rechazar → `updateConsent(false)` → storage sigue denegado
4. **CookieConsent.tsx**: si ya aceptó previamente → `updateConsent(true)` en mount

Compatibilidad: GA4 respeta Consent Mode v2. Los hits se envían en modo "cookieless" cuando está denegado (sin cookies, sin IDs de usuario). Al conceder, GA4 modela las conversiones retroactivamente.

---

## 3. Catálogo de Eventos GA4

### 3.1 Eventos de Conversión (Macro)

| Evento | Trigger | Parámetros clave |
|---|---|---|
| `generate_lead` | Envío exitoso de formulario | `form_type` (demo / contact / resource / analysis), `page_path` |
| `resource_download` | Click en descarga o auto-download | `resource_name`, `page_path` |

### 3.2 Microconversiones

| Evento | Trigger | Parámetros clave |
|---|---|---|
| `cta_click` | Click en CTA principal | `cta_id`, `cta_destination`, `cta_position`, `page_path` |
| `form_start` | Primera interacción con formulario | `form_type`, `page_path` |
| `tool_used` | Cálculo completado en herramienta | `tool_name`, `page_path` |
| `resource_open` | Apertura de página de recurso | `resource_name`, `page_path` |
| `high_intent_page` | Vista de página de alta intención | `page_name`, `page_path` |

### 3.3 Eventos de Comportamiento

| Evento | Trigger | Parámetros clave |
|---|---|---|
| `page_view` | Cambio de ruta (con content_group) | `page_path`, `page_title`, `content_group` |
| `scroll_depth` | Scroll 25%, 50%, 75%, 100% | `percent`, `page_path` |
| `navigation_path` | Navegación entre secciones clave | `from_section`, `to_section`, `page_path` |
| `engagement_milestone` | Tiempo en página (30s, 60s, 120s, 300s) | `seconds`, `page_path` |

### 3.4 Eventos del Sistema de Intent

| Evento | Trigger | Parámetros clave |
|---|---|---|
| `winerim_intent` | Cada señal de intención | `intent_category`, `intent_level`, `intent_action`, `intent_label`, `intent_value` |
| `consent_update` | Cambio de consentimiento | `analytics_storage`, `ad_storage` |

---

## 4. Puntos de Disparo por Componente

### CTAs rastreados

| Componente | CTA ID | Posición |
|---|---|---|
| `Hero.tsx` | `hero_home_primary` | hero |
| `Navbar.tsx` (desktop) | `nav_demo` | navbar |
| `Navbar.tsx` (mobile) | `mobile_nav_demo` | navbar_mobile |
| `Footer.tsx` | `footer_demo` | footer |
| `StickyCTA.tsx` | `sticky_{pageType}` | sticky_bar |
| `WinerimCore.tsx` | `hero_core_primary` | hero |
| `InteligenciaDinamica.tsx` | `hero_id_primary` | hero |
| `WinerimSupply.tsx` | `hero_supply_primary` | hero |

### Formularios rastreados

| Página | form_type | Eventos |
|---|---|---|
| `Demo.tsx` | `demo` | `form_start`, `generate_lead` |
| `Contacto.tsx` | `contact` | `form_start`, `generate_lead` |
| `ResourceTemplate.tsx` | `resource` | `form_start`, `generate_lead`, `resource_download` |
| `AnalizaCarta.tsx` | `analysis` | `form_start`, `generate_lead` |

### Herramientas rastreadas

| Página | tool_name |
|---|---|
| `CalculadoraMargen.tsx` | `margin_calculator` |
| `CalculadoraPrecioCopa.tsx` | `glass_price_calculator` |
| `CalculadoraStockMuerto.tsx` | `dead_stock_calculator` |
| `CalculadoraTicketMedio.tsx` | `ticket_medio_calculator` |
| `CalculadoraCompraInteligente.tsx` | `smart_purchase_calculator` |
| `WineListScore.tsx` | `wine_list_score` |
| `WineROICalculator.tsx` | `wine_roi_calculator` |
| `WinePricingTool.tsx` | `wine_pricing_tool` |

### Páginas de alta intención

| Ruta | page_name | Intent level |
|---|---|---|
| `/precios` | `pricing` | high |
| `/producto/winerim-core` | `product_core` | high |
| `/producto/inteligencia-dinamica` | `product_id` | high |
| `/producto/winerim-supply` | `product_supply` | high |
| `/soluciones/grupos-restauracion` | `solution_groups` | high |
| `/demo` | `demo` | high |
| `/contacto` | `contact` | high |
| `/casos-exito` | `case_study` | high |

---

## 5. Nomenclatura de Eventos

### Convenciones

- **snake_case** para todos los nombres de eventos y parámetros
- Prefijo `winerim_` solo para eventos custom del sistema de intent
- Eventos GA4 estándar: `page_view`, `generate_lead`, `scroll`
- Eventos custom: `cta_click`, `tool_used`, `resource_download`, `high_intent_page`

### Valores de `cta_id`

Formato: `{posición}_{página}_{variante}`
- `hero_home_primary`, `hero_core_primary`, `nav_demo`, `footer_demo`, `sticky_blog`

### Valores de `form_type`

- `demo`, `contact`, `resource`, `analysis`

### Valores de `content_group`

Derivados de `IntentCategory`:
- `product core`, `product id`, `product supply`, `pricing`, `demo`, `tool`, `blog editorial`, `blog commercial`, `resource download`, `solution groups`, `solution vertical`, `case study`

---

## 6. Configuración GTM (Checklist)

### 6.1 Tags a crear en GTM

| Tag | Tipo | Trigger |
|---|---|---|
| GA4 Configuration | GA4 Config | All Pages |
| GA4 — generate_lead | GA4 Event | Custom Event = `generate_lead` |
| GA4 — cta_click | GA4 Event | Custom Event = `cta_click` |
| GA4 — tool_used | GA4 Event | Custom Event = `tool_used` |
| GA4 — resource_download | GA4 Event | Custom Event = `resource_download` |
| GA4 — high_intent_page | GA4 Event | Custom Event = `high_intent_page` |
| GA4 — scroll_depth | GA4 Event | Custom Event = `scroll_depth` |

### 6.2 Variables de Data Layer a crear

| Variable | Nombre DL |
|---|---|
| `dlv_form_type` | `form_type` |
| `dlv_cta_id` | `cta_id` |
| `dlv_cta_destination` | `cta_destination` |
| `dlv_cta_position` | `cta_position` |
| `dlv_tool_name` | `tool_name` |
| `dlv_resource_name` | `resource_name` |
| `dlv_page_name` | `page_name` |
| `dlv_percent` | `percent` |
| `dlv_content_group` | `content_group` |
| `dlv_intent_category` | `intent_category` |
| `dlv_intent_level` | `intent_level` |

### 6.3 Triggers custom

| Trigger | Tipo | Condición |
|---|---|---|
| `CE — generate_lead` | Custom Event | Event = `generate_lead` |
| `CE — cta_click` | Custom Event | Event = `cta_click` |
| `CE — tool_used` | Custom Event | Event = `tool_used` |
| `CE — resource_download` | Custom Event | Event = `resource_download` |
| `CE — high_intent_page` | Custom Event | Event = `high_intent_page` |
| `CE — scroll_depth` | Custom Event | Event = `scroll_depth` |

---

## 7. Compatibilidad con Campañas

### 7.1 Google Ads

- Los eventos `generate_lead` se marcan como conversión en GA4
- GA4 enlazado a Google Ads importa conversiones automáticamente
- `cta_click` se puede usar como conversión secundaria (señal de calidad)
- Consent Mode v2 permite modelado de conversiones con datos denegados

### 7.2 Meta / LinkedIn Ads

- Instalar píxeles vía GTM
- Mapear `generate_lead` → Lead event
- Mapear `high_intent_page` con `page_name=pricing` → ViewContent

### 7.3 Dealfront / Leadfeeder

- Lee `dataLayer` nativamente
- El evento `winerim_intent` con `intent_level=high` sirve como señal de cuenta calificada
- No requiere configuración adicional

---

## 8. Próximos Pasos

- [ ] Crear propiedad GA4 y obtener Measurement ID
- [ ] Reemplazar `GTM-XXXXXXX` en index.html con ID real
- [ ] Configurar tags/triggers/variables en GTM según §6
- [ ] Marcar `generate_lead` como conversión en GA4
- [ ] Crear audiencias en GA4: visitantes de pricing, usuarios de herramientas, leads
- [ ] Enlazar GA4 con Google Ads cuando se activen campañas
