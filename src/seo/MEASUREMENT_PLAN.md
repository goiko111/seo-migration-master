# Plan de Medición SEO & Visibilidad IA — Winerim

> Última actualización: 2026-03-11
> Dominio: https://winerim.wine

---

## 1. Conexiones y Configuración Inicial

### 1.1 Checklist de Activación

| Herramienta | Estado | Acción requerida | Prioridad |
|---|---|---|---|
| **Google Search Console** | ⬜ | Verificar dominio vía DNS TXT. Añadir propiedades: `https://winerim.wine` + `sc-domain:winerim.wine`. Enviar sitemap: `/sitemap.xml` | P0 |
| **Bing Webmaster Tools** | ⬜ | Verificar dominio. Importar desde GSC o verificar vía DNS. Enviar sitemap | P0 |
| **Bing AI Performance** | ⬜ | Acceder desde Bing Webmaster → "AI Performance". Revisar grounding queries y citaciones | P0 |
| **IndexNow** | ⬜ | Generar API key. Crear `/{key}.txt` en `/public`. Implementar ping on publish (ver §1.2) | P1 |
| **GA4** | ⬜ | Crear propiedad GA4. Añadir tag vía GTM o script directo. Configurar eventos de conversión (ver §1.3) | P1 |
| **robots.txt** | ✅ | Ya configurado con Allow para Googlebot, Bingbot, GPTBot, ClaudeBot, PerplexityBot | — |
| **Sitemap dinámico** | ✅ | Edge function genera sitemap con hreflang ES/EN/IT/FR | — |
| **Schema JSON-LD** | ✅ | Organization, SoftwareApplication, Article, FAQPage, BreadcrumbList | — |

### 1.2 Implementación de IndexNow

```
POST https://api.indexnow.org/indexnow
Content-Type: application/json

{
  "host": "winerim.wine",
  "key": "<TU_API_KEY>",
  "keyLocation": "https://winerim.wine/<TU_API_KEY>.txt",
  "urlList": [
    "https://winerim.wine/nueva-pagina"
  ]
}
```

**Cuándo hacer ping:**
- Al publicar un artículo nuevo desde el CMS
- Al actualizar una página SEO programática
- Al cambiar precios o funcionalidades

**Implementación sugerida:** Edge function `notify-indexnow` que se llama tras INSERT/UPDATE en `articles` y `seo_pages`.

### 1.3 Eventos GA4 de Conversión

| Evento | Trigger | Parámetros |
|---|---|---|
| `generate_lead` | Envío de formulario (demo, contacto, análisis) | `form_type`, `page_path` |
| `tool_used` | Cálculo completado en herramienta | `tool_name`, `page_path` |
| `resource_download` | Click en descarga de recurso | `resource_name` |
| `cta_click` | Click en CTA principal | `cta_text`, `page_path`, `position` |
| `scroll_depth` | 25%, 50%, 75%, 100% | `page_path`, `percent` |

---

## 2. Dashboard de Medición

### 2.1 Métricas de Cobertura e Indexación (GSC + Bing)

| Métrica | Fuente | Frecuencia | Umbral de alerta |
|---|---|---|---|
| Páginas indexadas vs enviadas | GSC Coverage | Semanal | < 85% indexadas |
| Páginas con errores (404, 5xx, redirect loops) | GSC Coverage | Diaria | > 0 errores |
| Páginas excluidas por `noindex` | GSC Coverage | Semanal | Verificar que solo admin/staging |
| Core Web Vitals (LCP, FID, CLS) | GSC CWV | Mensual | LCP > 2.5s, CLS > 0.1 |
| Tiempo de rastreo medio | GSC Stats | Mensual | > 500ms |

### 2.2 Queries por Idioma y País (GSC)

| Dimensión | Desglose | Métrica clave |
|---|---|---|
| Queries ES | Top 50 queries España | Clicks, Impresiones, CTR, Posición media |
| Queries EN | Top 50 queries UK/US | Clicks, Impresiones, CTR, Posición media |
| Queries IT | Top 20 queries Italia | Clicks, Impresiones, CTR, Posición media |
| Queries FR | Top 20 queries Francia | Clicks, Impresiones, CTR, Posición media |
| Queries branded vs non-branded | Filtro "winerim" | Ratio branded/non-branded |

### 2.3 Landing Pages Orgánicas (GSC + GA4)

| Grupo | URLs | Métricas |
|---|---|---|
| Home | `/`, `/en/`, `/it/`, `/fr/` | Clicks, CTR, Posición, Bounce rate, Conversiones |
| Blog | `/article/*` | Clicks por artículo, Scroll depth, Tiempo en página |
| Guías | `/guias/*`, `/blog/como-*` | Clicks, Conversiones CTA, Engagement |
| Herramientas | `/herramientas/*`, `/analisis-carta`, `/calculadora-*` | Usos de herramienta, Leads generados |
| Recursos | `/recursos/*` | Descargas, Clicks, Leads |
| Comparativas | `/comparativas/*` | Clicks, CTR, Conversiones demo |
| SEO programáticas | `/carta-vinos-*`, `/vinos-*` | Indexación, Clicks, Impresiones |
| Soluciones | `/soluciones/*`, `/software-*` | Clicks, Conversiones, Posición |
| Benchmarks | `/benchmarks-playbooks/*` | Clicks, Engagement, Descargas |

### 2.4 Rendimiento por Tipo de Contenido

| Template | Nº páginas | Clicks/mes objetivo | Conversión objetivo |
|---|---|---|---|
| Artículo editorial | ~12 | 500 | 2% CTA click |
| Guía larga | ~15 | 300 | 3% CTA click |
| Herramienta interactiva | ~12 | 200 | 8% lead |
| Recurso descargable | ~8 | 150 | 10% descarga |
| Comparativa | ~5 | 100 | 5% demo |
| Benchmark/Playbook | ~10 | 200 | 4% CTA |
| SEO programática (ciudad) | ~50 | 20/pág | 1% lead |
| SEO programática (tipo) | ~20 | 30/pág | 1.5% lead |

### 2.5 Visibilidad en Buscadores IA (Bing AI Performance)

| Métrica | Descripción | Frecuencia |
|---|---|---|
| **Grounding queries** | Consultas donde Bing AI cita winerim.wine | Semanal |
| **Cited pages** | URLs de winerim.wine mostradas como fuente | Semanal |
| **Citation impressions** | Nº de veces que aparecemos en respuestas IA | Semanal |
| **Click-through de citas** | Clicks desde respuestas IA a winerim.wine | Semanal |
| **Top temas citados** | Clusters temáticos más citados | Mensual |

**Cómo interpretar:**
- Las grounding queries revelan para qué temas los LLMs nos consideran fuente fiable
- Comparar queries orgánicas (GSC) vs grounding queries (Bing AI) para detectar gaps
- Si una página se cita mucho pero no rankea, priorizar su SEO clásico
- Si una página rankea pero no se cita, mejorar su citabilidad (definiciones, tablas, bullets)

### 2.6 Alertas Automáticas

| Alerta | Condición | Canal |
|---|---|---|
| 🔴 Caída de tráfico | -20% clicks semana vs semana anterior | Email/Slack |
| 🔴 Errores de rastreo | > 5 errores 404/5xx nuevos | Email |
| 🟡 Pérdida de posición | Query top-10 cae a > posición 20 | Email semanal |
| 🟡 Indexación baja | < 80% de páginas enviadas indexadas | Email semanal |
| 🟡 CWV degradados | LCP > 2.5s en > 25% de URLs | Email mensual |
| 🟢 Nuevo grounding query | Nueva query donde nos citan en Bing AI | Informe semanal |

---

## 3. Cadencia de Revisión

### 3.1 Revisión Semanal (15 min)

1. **GSC → Rendimiento:** ¿Han caído clicks o impresiones > 15%?
2. **GSC → Cobertura:** ¿Nuevos errores de rastreo?
3. **Bing AI Performance:** ¿Nuevas grounding queries? ¿Pérdida de citas?
4. **GA4 → Conversiones:** ¿Leads de la semana vs media?
5. **Admin panel → Leads:** ¿Qué formularios convierten más?

**Si hay caída de tráfico (> 15%):**
1. Verificar si es estacional (comparar año anterior)
2. Comprobar errores en GSC Coverage
3. Revisar si alguna página importante ha perdido posiciones
4. Verificar que canonical y robots están correctos
5. Comprobar CWV en PageSpeed Insights
6. Si la caída persiste 2 semanas: investigar cambio de algoritmo

### 3.2 Revisión Mensual (45 min)

1. **Rendimiento por template:** ¿Qué tipos de contenido crecen/decrecen?
2. **Queries no-branded:** ¿Estamos captando nuevas queries informacionales?
3. **Funnel de conversión:** Orgánico → Tool use → Lead → Demo request
4. **Hreflang:** ¿Las versiones EN/IT/FR captan tráfico?
5. **Citabilidad IA:** ¿Para qué temas nos citan más? ¿Gaps vs competencia?
6. **Contenido thin:** ¿Páginas programáticas con score < 40?
7. **Enlazado interno:** ¿Páginas huérfanas nuevas?
8. **Competencia:** Revisar nuevas páginas de competidores en las mismas queries

**Si hay pérdida de citas IA:**
1. Verificar que las páginas citadas siguen accesibles
2. Comprobar que los schemas JSON-LD son válidos (Google Rich Results Test)
3. Revisar si el contenido sigue siendo relevante y actualizado
4. Añadir más bloques citables (definiciones, tablas, listas)
5. Comprobar que los AI crawlers tienen acceso (robots.txt)

### 3.3 Revisión Trimestral (2h)

1. **Auditoría completa de indexación**
2. **Revisión de arquitectura de contenido:** ¿Nuevos clusters necesarios?
3. **Limpieza de páginas thin o duplicadas**
4. **Actualización de artículos evergreen**
5. **Benchmarking vs competencia**
6. **Revisión de backlinks (Ahrefs/Semrush)**
7. **Plan de contenido para el próximo trimestre**

---

## 4. KPIs por Área

### 4.1 SEO Técnico

| KPI | Objetivo | Medición |
|---|---|---|
| % de páginas indexadas | > 90% | GSC Coverage, semanal |
| Errores de rastreo | 0 | GSC Coverage, diaria |
| LCP (P75) | < 2.0s | GSC CWV, mensual |
| CLS (P75) | < 0.05 | GSC CWV, mensual |
| INP (P75) | < 150ms | GSC CWV, mensual |
| Tiempo medio de rastreo | < 300ms | GSC Stats, mensual |
| Sitemap válido | 100% URLs accesibles | Validar mensual |
| Hreflang correctos | 0 errores | GSC International, mensual |
| Schema válido | 0 errores/warnings | Rich Results Test, mensual |

### 4.2 Contenido

| KPI | Objetivo | Medición |
|---|---|---|
| Páginas con > 100 clicks/mes | > 20 | GSC, mensual |
| Posición media global | < 25 | GSC, mensual |
| CTR medio orgánico | > 3.5% | GSC, mensual |
| Queries non-branded en top 10 | > 50 | GSC, mensual |
| Artículos con scroll > 75% | > 60% | GA4, mensual |
| Tiempo medio en página (guías) | > 3 min | GA4, mensual |
| Páginas thin (score < 40) | 0 | Interno, mensual |

### 4.3 Conversión Orgánica

| KPI | Objetivo | Medición |
|---|---|---|
| Leads orgánicos / mes | Baseline + 10% MoM | GA4 + Admin, mensual |
| Tasa de conversión orgánico → lead | > 1.5% | GA4, mensual |
| Tasa herramienta → lead | > 5% | GA4, mensual |
| Demos solicitadas desde orgánico | Baseline + 15% MoM | Admin panel, mensual |
| Descarga de recursos | > 50/mes | GA4, mensual |
| Formularios más efectivos | Top 3 por conversión | Admin, mensual |

### 4.4 Visibilidad IA

| KPI | Objetivo | Medición |
|---|---|---|
| Grounding queries (Bing AI) | > 20 queries | Bing AI Performance, semanal |
| Páginas citadas por IA | > 10 URLs únicas | Bing AI Performance, semanal |
| Citation impressions | Crecimiento MoM | Bing AI Performance, mensual |
| Temas de citación | > 5 clusters temáticos | Bing AI Performance, mensual |
| Cobertura de AI crawlers | 100% páginas accesibles | robots.txt + logs, mensual |
| Bloques citables por página | > 3 (definiciones, tablas, listas) | Auditoría interna, trimestral |

---

## 5. Propuesta de Dashboard (Looker Studio / Sheets)

### Panel 1: Vista General
- Clicks orgánicos (7d, 30d, 90d) con sparkline
- Leads orgánicos (7d, 30d) con sparkline
- Grounding queries IA (7d)
- Errores de cobertura (activos)
- CWV status (verde/amarillo/rojo)

### Panel 2: Rendimiento por Template
- Tabla: template → nº páginas → clicks → impresiones → CTR → posición media → leads
- Gráfico de barras: clicks por template (30d)
- Tendencia MoM por template

### Panel 3: Queries & Posiciones
- Top 20 queries non-branded (clicks, posición, tendencia)
- Queries ganadas/perdidas (WoW)
- Distribución por idioma
- Branded vs non-branded ratio

### Panel 4: Conversión
- Funnel: Impresiones → Clicks → Visitas → Tool use → Lead → Demo
- Conversion rate por landing page tipo
- Top 10 landing pages por leads

### Panel 5: Visibilidad IA
- Grounding queries (lista + tendencia)
- Páginas más citadas
- Nuevas citas vs pérdidas
- Solapamiento queries orgánicas vs grounding queries

---

## 6. Herramientas Recomendadas

| Herramienta | Uso | Coste |
|---|---|---|
| Google Search Console | Indexación, queries, CWV, hreflang | Gratis |
| Bing Webmaster Tools | Indexación Bing, AI Performance | Gratis |
| GA4 | Tráfico, eventos, conversiones | Gratis |
| Google Looker Studio | Dashboard centralizado | Gratis |
| IndexNow API | Notificación de cambios a buscadores | Gratis |
| PageSpeed Insights | CWV por URL | Gratis |
| Rich Results Test | Validación de schemas | Gratis |
| Screaming Frog (opcional) | Auditoría técnica masiva | ~$259/año |
| Ahrefs/Semrush (opcional) | Backlinks, competencia, keywords | ~$100-200/mes |

---

## 7. Notas de Implementación

### Ya implementado en winerim.wine:
- ✅ `robots.txt` con allow para AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
- ✅ Sitemap dinámico con hreflang completo
- ✅ Schema JSON-LD: Organization, SoftwareApplication, Article, FAQPage, BreadcrumbList
- ✅ Canonical tags apuntando siempre a producción
- ✅ `noindex` automático en staging/preview
- ✅ Componentes de citabilidad: SummaryBox, MethodologyBox, CommonMistakes, FactsBox
- ✅ Evaluación de thin content con noindex automático (score < 40)
- ✅ Enlazado interno estructurado con NextSteps e InternalLinks

### Pendiente de implementar tras lanzamiento:
- ⬜ Verificar dominios en GSC y Bing
- ⬜ Configurar GA4 y eventos de conversión
- ⬜ Implementar IndexNow (edge function + key file)
- ⬜ Crear dashboard en Looker Studio
- ⬜ Configurar alertas de GSC
- ⬜ Primera auditoría baseline (semana 1)
