# Auditoría SEO — Informe de duplicados, canibalizaciones y consolidaciones

> Generado para el proyecto Winerim. Fecha: 2026-03-10

---

## 1. Resumen ejecutivo

Se han identificado **8 páginas en inglés ubicadas en la raíz** que deberían estar bajo `/en/`, **4 grupos de canibalización** activos, y **varias inconsistencias de naming** entre idiomas. No se han detectado rutas rotas, pero sí un riesgo alto de dilución de autoridad por la mezcla de idiomas en el root.

---

## 2. Páginas EN en la raíz (CRÍTICO)

Estas páginas en inglés están publicadas directamente en la raíz del dominio (sin prefijo `/en/`), lo que envía señales contradictorias a Googlebot sobre el idioma principal del sitio:

| Ruta actual | Destino recomendado | Estado |
|---|---|---|
| `/wine-list-management-software` | `/en/wine-list-management-software` | 🔴 Pendiente |
| `/what-is-winerim` | `/en/what-is-winerim` | 🔴 Pendiente |
| `/ai-wine-software` | `/en/ai-wine-software` | 🔴 Pendiente |
| `/wine-list-analyzer` | `/en/wine-list-analyzer` | 🔴 Pendiente |
| `/wine-roi-calculator` | `/en/wine-roi-calculator` | 🔴 Pendiente |
| `/wine-pairing-generator` | `/en/wine-pairing-generator` | 🔴 Pendiente |
| `/wine-pricing-tool` | `/en/wine-pricing-tool` | 🔴 Pendiente |
| `/wine-list-benchmark` | `/en/wine-list-benchmark` | 🔴 Pendiente |

**Impacto:** Google puede interpretar el dominio como bilingüe sin estructura clara, penalizando el posicionamiento tanto en ES como en EN.

**Acción recomendada:** 301 redirect de cada URL actual a su versión `/en/`. Crear las rutas `/en/` correspondientes en `langRoutes`.

---

## 3. Grupos de canibalización detectados

### 3.1 Grupo: `software-carta-vinos`

Tres páginas compiten por la misma intención de búsqueda ("software para gestionar carta de vinos"):

| Ruta | Idioma | Intención |
|---|---|---|
| `/software-carta-de-vinos` | ES | software carta vinos |
| `/wine-list-management-software` | EN | wine list management software |
| `/en/digital-wine-list` | EN | digital wine list |

**Recomendación:**
- ES: mantener `/software-carta-de-vinos` como canonical.
- EN: consolidar `/wine-list-management-software` y `/en/digital-wine-list` en una sola URL: `/en/wine-list-management-software`. Evaluar tráfico de `/en/digital-wine-list` antes de redirigir.
- Usar hreflang bidireccional entre la versión ES y EN.

### 3.2 Grupo: `what-is-winerim`

| Ruta | Idioma |
|---|---|
| `/que-es-winerim` | ES |
| `/what-is-winerim` | EN |

**Recomendación:** Mantener ambas, pero mover `/what-is-winerim` → `/en/what-is-winerim` y vincular con hreflang.

### 3.3 Grupo: `analisis-carta`

| Ruta | Idioma |
|---|---|
| `/analisis-carta` | ES |
| `/wine-list-analyzer` | EN |

**Recomendación:** Son la misma herramienta en dos idiomas. Mover EN a `/en/wine-list-analyzer` y vincular con hreflang.

### 3.4 Grupo: `calculadora-margen`

| Ruta | Idioma | Intención |
|---|---|---|
| `/calculadora-margen-vino` | ES | calculadora margen vino |
| `/precio-vino-restaurante` | ES | precio vino restaurante (guía) |
| `/wine-pricing-tool` | EN | wine pricing tool |

**Recomendación:**
- `/calculadora-margen-vino` (herramienta) y `/precio-vino-restaurante` (guía) cubren la misma keyword desde ángulos distintos. Está bien si se diferencian claramente con canonicals independientes.
- `/wine-pricing-tool` → mover a `/en/wine-pricing-tool`.

---

## 4. Inconsistencias de naming

| Problema | Ejemplo |
|---|---|
| Mezcla snake-case / kebab-case | Todos usan kebab ✅ (no hay problema) |
| Prefijos inconsistentes en herramientas | `/calculadora-margen-vino` (raíz) vs `/herramientas/calculadora-precio-vino-por-copa` (directorio) |
| Prefijos inconsistentes en guías | `/como-hacer-una-carta-de-vinos` (raíz) vs `/guias/como-mejorar-la-rotacion-de-vinos...` (directorio) |

**Recomendación:** Mantener las URLs raíz existentes para preservar autoridad. Nuevas guías siempre bajo `/guias/`, nuevas herramientas bajo `/herramientas/`, nuevos recursos bajo `/recursos/`.

---

## 5. Estrategia de normalización de URLs

### 5.1 Trailing slash
- **Regla:** Eliminar trailing slash en todas las URLs excepto `/`.
- **Implementación:** Middleware/edge function que redirige `/precios/` → `/precios` con 301.

### 5.2 Case normalization
- **Regla:** Forzar lowercase.
- **Implementación:** Middleware que redirige `/Blog` → `/blog` con 301.

### 5.3 Idioma por defecto
- **Regla:** URLs sin prefijo de idioma = español.
- **Excepción actual:** 8 páginas EN en la raíz (ver §2).
- **Estado objetivo:** Todo EN bajo `/en/`, todo IT bajo `/it/`, todo FR bajo `/fr/`.

---

## 6. Páginas programáticas (SEO dinámico)

Tres patrones de wildcard activos:

| Patrón | Idioma | Riesgo |
|---|---|---|
| `/software-carta-de-vinos-*` | ES | Bajo si el contenido es único por ciudad/tipo |
| `/software-vino-*` | ES | Medio — puede solaparse con el patrón anterior |
| `/wine-list-software-*` | EN | Bajo |

**Recomendación:**
- Asegurarse de que `/software-carta-de-vinos-*` y `/software-vino-*` no generen páginas para el mismo slug.
- Validar con `evaluateContentQuality()` (ya implementado) para marcar noindex las que no alcancen el umbral.

---

## 7. Checklist de migración

- [ ] Crear las 8 rutas EN faltantes en `langRoutes("/en")` dentro de App.tsx
- [ ] Implementar 301 redirects (edge function o _redirects file)
- [ ] Añadir hreflang bidireccional en todas las páginas con equivalente en otro idioma
- [ ] Implementar middleware de trailing slash removal
- [ ] Implementar middleware de case normalization
- [ ] Verificar canonicals de todas las páginas programáticas
- [ ] Monitorizar Search Console 2 semanas post-migración para detectar pérdida de cobertura
- [ ] Actualizar sitemap edge function para reflejar los nuevos canonicals

---

## 8. Archivos de referencia

| Archivo | Propósito |
|---|---|
| `src/seo/route-map.ts` | Mapa completo de rutas con canonical, idioma y grupo de canibalización |
| `src/seo/redirects.ts` | Manifiesto de redirecciones con utilidades de exportación |
| `src/seo/SEO_AUDIT.md` | Este informe |
| `src/hooks/useSeoPage.ts` | Validación de thin content con scoring automático |
