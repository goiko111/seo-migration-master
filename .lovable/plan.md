

## Portal de Empleo — "Trabaja en Winerim"

### Qué vamos a crear

Una página atractiva en `/empleo` (o `/careers` para versión EN) donde candidatos pueden ver la cultura de Winerim, las ventajas de trabajar en la empresa y enviar su candidatura a través de un formulario. Las candidaturas se guardan en la base de datos y disparan una notificación por email al equipo.

### Estructura de la página

```text
┌─────────────────────────────────────────┐
│  Navbar                                 │
├─────────────────────────────────────────┤
│  HERO — "Únete al equipo que está       │
│  transformando el mundo del vino"        │
│  Badge: "Estamos contratando"           │
│  Subtítulo motivacional                 │
├─────────────────────────────────────────┤
│  POR QUÉ WINERIM — Grid 3 cols         │
│  · Impacto real en hostelería           │
│  · Equipo internacional (remoto)        │
│  · Crecimiento profesional              │
│  · Cultura basada en datos              │
│  · Autonomía + responsabilidad          │
│  · Producto con tracción real            │
├─────────────────────────────────────────┤
│  VALORES / CULTURA — Sección visual     │
│  Iconos + frases cortas del ADN         │
├─────────────────────────────────────────┤
│  FORMULARIO DE CANDIDATURA              │
│  Nombre · Email · Teléfono · LinkedIn   │
│  Área de interés (select)               │
│  Mensaje / motivación (textarea)        │
│  Botón: "Enviar candidatura"            │
├─────────────────────────────────────────┤
│  Footer                                 │
└─────────────────────────────────────────┘
```

### Cambios técnicos

1. **Nueva tabla `job_applications`** — migración SQL con campos: id, name, email, phone, linkedin_url, area_of_interest, message, created_at. RLS: inserción pública (anon), lectura solo admin.

2. **Nueva página `src/pages/Empleo.tsx`** — diseño consistente con el resto del site (Navbar, Footer, ScrollReveal, motion). Formulario con validación client-side. Inserta en `job_applications` y dispara notificación via la edge function `send-lead-notification` existente (con form_type `empleo`).

3. **Ruta en `App.tsx`** — añadir `/empleo` lazy-loaded.

4. **Link en Footer** — añadir "Trabaja con nosotros" en la columna "Empresa".

5. **Traducciones** — añadir claves para es/en/it/fr en los archivos de traducción.

6. **SEOHead** — meta title/description optimizados para la página.

### Áreas de interés (selector del formulario)

- Tecnología / Desarrollo
- Producto / Diseño
- Ventas / Comercial
- Marketing / Contenidos
- Operaciones / Customer Success
- Otro

### Sin cambios en

- Páginas existentes (contenido, layout)
- Edge functions (reutilizamos `send-lead-notification`)
- Estilos globales

