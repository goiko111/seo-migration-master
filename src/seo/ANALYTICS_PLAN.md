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

## 7. Google Ads — Configuración Completa

### 7.1 Arquitectura

```
index.html → Consent Mode v2 (default denied)
           → GTM container
           
GTM        → GA4 Config tag
           → Google Ads Conversion tags (fired via dataLayer events)
           → Google Ads Remarketing tag (fired on all pages)
           → Enhanced Conversions (user data from dataLayer)

analytics.ts → ads.conversion() → pushes "ads_conversion" + "enhanced_conversion_data"
             → ads.microConversion() → pushes "ads_micro_conversion"  
             → ads.remarketing() → pushes "remarketing_event"
```

### 7.2 Conversiones Principales

| Conversión | Evento dataLayer | Valor | Categoría Ads |
|---|---|---|---|
| Demo solicitada | `ads_conversion` (conversion_type=demo) | 50 EUR | Primary |
| Contacto enviado | `ads_conversion` (conversion_type=contact) | 30 EUR | Primary |
| Recurso descargado | `ads_conversion` (conversion_type=resource) | 10 EUR | Primary |

### 7.3 Microconversiones (Secondary)

| Acción | Evento dataLayer | Variable clave |
|---|---|---|
| Click CTA demo | `ads_micro_conversion` (micro_action=cta_click_demo) | cta_id |
| Uso de calculadora | `ads_micro_conversion` (micro_action=tool_used) | tool_name |
| Visita a Precios | `ads_micro_conversion` (micro_action=pricing_visit) | — |
| Visita a Winerim Supply | `ads_micro_conversion` (micro_action=supply_visit) | — |
| Visita a Soluciones grupos | `ads_micro_conversion` (micro_action=groups_visit) | — |
| Descarga de recurso | `ads_micro_conversion` (micro_action=resource_download) | resource_name |

### 7.4 Enhanced Conversions

Datos enviados al dataLayer para enhanced conversions (GTM los hashea con SHA-256):

| Campo | Variable DL | Origen |
|---|---|---|
| Email | `email` (via `enhanced_conversion_data`) | Formulario |
| Teléfono | `phone_number` | Formulario |
| Nombre | `first_name` | Formulario (split) |
| Apellido | `last_name` | Formulario (split) |
| Ciudad | `city` | Formulario |

**Configuración en GTM:**
1. Activar "Enhanced conversions" en el tag de Google Ads
2. Seleccionar "Data layer" como fuente de datos
3. Mapear el evento `enhanced_conversion_data` como User-Provided Data Event

### 7.5 Remarketing

| Señal | Evento dataLayer | Uso en audiencias |
|---|---|---|
| Tipo de página | `remarketing_event` → `page_type` | Segmentar por interés |
| Nivel de intención | `remarketing_event` → `intent_level` | Hot leads vs exploradores |
| Content group | `page_view` → `content_group` | Audiencias por tema |

**Audiencias sugeridas para Google Ads:**

| Audiencia | Condición | Ventana |
|---|---|---|
| Hot leads | `intent_level = high` + ≥2 páginas producto | 30 días |
| Pricing visitors | `page_type = pricing` | 14 días |
| Tool users | `micro_action = tool_used` | 30 días |
| Resource downloaders | `conversion_type = resource` | 60 días |
| Demo abandonadores | Visitó /demo pero no convirtió | 7 días |
| Blog engaged | `scroll_depth ≥ 75%` en blog | 30 días |

### 7.6 Consent Mode v2 para Ads

Implementado en `index.html`:

```javascript
// Default: todo denegado
gtag('consent', 'default', {
  'analytics_storage': 'denied',
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'wait_for_update': 500
});

// Redacción de datos cuando no hay consent
gtag('set', 'ads_data_redaction', true);

// URL passthrough para medición cross-domain sin cookies
gtag('set', 'url_passthrough', true);
```

**Comportamiento:**
- Sin consentimiento: Google modela conversiones (~70% precisión)
- Con consentimiento: tracking completo con cookies + enhanced conversions
- `ads_data_redaction`: redacta datos de clic en ads cuando `ad_storage=denied`
- `url_passthrough`: mantiene gclid/dclid en URLs para atribución sin cookies

### 7.7 Tags GTM para Google Ads (Checklist)

| Tag | Tipo | Trigger | Notas |
|---|---|---|---|
| Google Ads Remarketing | Remarketing | All Pages | Usar AW-XXXXXXXXX |
| Ads Conv — Demo | Conversion | CE = `ads_conversion` + `conversion_type=demo` | Primary, valor 50€ |
| Ads Conv — Contact | Conversion | CE = `ads_conversion` + `conversion_type=contact` | Primary, valor 30€ |
| Ads Conv — Resource | Conversion | CE = `ads_conversion` + `conversion_type=resource` | Primary, valor 10€ |
| Ads Micro — CTA click | Conversion | CE = `ads_micro_conversion` + `micro_action=cta_click_demo` | Secondary |
| Ads Micro — Tool used | Conversion | CE = `ads_micro_conversion` + `micro_action=tool_used` | Secondary |
| Ads Micro — Pricing | Conversion | CE = `ads_micro_conversion` + `micro_action=pricing_visit` | Secondary |

**Variables DL adicionales para Ads:**

| Variable | Nombre DL |
|---|---|
| `dlv_conversion_type` | `conversion_type` |
| `dlv_conversion_label` | `conversion_label` |
| `dlv_micro_action` | `micro_action` |
| `dlv_value` | `value` |
| `dlv_currency` | `currency` |

---

## 8. Compatibilidad con Otras Plataformas

### 8.1 Meta / LinkedIn Ads

- Instalar píxeles vía GTM
- Mapear `generate_lead` → Lead event
- Mapear `high_intent_page` con `page_name=pricing` → ViewContent

### 8.2 Dealfront / Leadfeeder

- Lee `dataLayer` nativamente
- El evento `winerim_intent` con `intent_level=high` sirve como señal de cuenta calificada
- No requiere configuración adicional

---

## 9. Próximos Pasos

- [ ] Crear propiedad GA4 y obtener Measurement ID
- [ ] Crear cuenta Google Ads y obtener Conversion ID (AW-XXXXXXXXX)
- [ ] Reemplazar `GTM-XXXXXXX` en index.html con ID real
- [ ] Reemplazar `AW-XXXXXXXXX` en analytics.ts con Conversion ID + Labels reales
- [ ] Configurar tags/triggers/variables en GTM según §6 y §7.7
- [ ] Marcar `generate_lead` como conversión en GA4
- [ ] Activar Enhanced Conversions en Google Ads → Settings → Conversions
- [ ] Crear audiencias de remarketing en Google Ads según §7.6
- [ ] Enlazar GA4 ↔ Google Ads en Admin → Product links
- [ ] Importar conversiones GA4 en Google Ads como secondary conversions
- [ ] Crear audiencias en GA4: visitantes de pricing, usuarios de herramientas, leads
