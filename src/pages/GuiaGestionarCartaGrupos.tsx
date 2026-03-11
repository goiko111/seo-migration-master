import GuideTemplate from "@/components/templates/GuideTemplate";
import type { GuidePageData } from "@/components/templates/GuideTemplate";

const data: GuidePageData = {
  slug: "guias/como-gestionar-carta-vinos-grupos-restauracion",
  metaTitle: "Cómo Gestionar la Carta de Vinos en Grupos de Restauración | Winerim",
  metaDescription: "Guía operativa para gestionar cartas de vinos en grupos multiunidad: governance, benchmarking entre locales, control de surtido y pricing centralizado.",
  heroTitle: "Cómo gestionar una carta de vinos en grupos de restauración",
  heroSubtitle: "La gestión del vino en grupos de restauración no puede depender solo de cada jefe de sala. Necesitas una capa de gobierno, visibilidad cruzada y estándares operativos que permitan escalar sin perder identidad.",
  heroBadge: "Guía operativa — Grupos",
  breadcrumbParent: { label: "Guías", href: "/guias-y-recursos" },
  tableOfContents: [
    "Por qué gestionar vino en un grupo es distinto",
    "Los 4 errores operativos más frecuentes",
    "El modelo de governance: centralización flexible",
    "Cómo estandarizar sin homogeneizar",
    "Framework de benchmarking entre locales",
    "Checklist de implementación progresiva",
  ],
  sections: [
    {
      heading: "Por qué gestionar vino en un grupo es distinto",
      content: "Un restaurante independiente gestiona una carta. Un grupo gestiona un sistema. La diferencia no es de volumen, sino de complejidad: múltiples perfiles de local, diferentes equipos, proveedores distintos, y la necesidad de coherencia sin rigidez.\n\nSin un modelo de gobierno claro, cada local toma decisiones aisladas. El resultado: precios inconsistentes, surtidos desequilibrados, oportunidades de compra centralizada perdidas y ninguna visibilidad cruzada para saber qué funciona y qué no.",
      tips: [
        "Un grupo con 5 locales puede tener hasta 5 precios distintos para el mismo vino si no hay un framework de pricing.",
        "La centralización total mata la identidad local. La autonomía total impide el control. El objetivo es centralización flexible.",
        "Los grupos más rentables en vino no son los que compran más barato, sino los que miden mejor.",
      ],
      icon: "lightbulb",
    },
    {
      heading: "Los 4 errores operativos más frecuentes",
      content: "Antes de construir un sistema, identifica si estás cometiendo alguno de estos errores que erosionan silenciosamente la rentabilidad del vino en tu grupo.",
      tips: [
        "Autonomía total sin reporting: cada local gestiona el vino como quiere y nadie compara resultados. Es el error más común y el más costoso.",
        "Catálogo corporativo rígido: imponer las mismas 40 referencias en locales con cocinas y públicos distintos. Genera frustración y stock parado.",
        "Falta de estándares de pricing: sin un multiplicador o rango de referencia, cada jefe de sala pone precios según su criterio. El margen del grupo se diluye.",
        "Sin benchmarking interno: no saber qué local vende más vino por mesa, cuál tiene mejor rotación o cuál acumula más stock muerto. Sin datos, no hay mejora.",
      ],
      icon: "alert",
    },
    {
      heading: "El modelo de governance: centralización flexible",
      content: "El framework que mejor funciona en grupos de restauración es la centralización flexible. Consiste en definir qué se decide a nivel corporativo y qué se delega a cada local.\n\nNivel corporativo (no negociable):\n• Rango de multiplicadores de pricing por categoría\n• KPIs mínimos de seguimiento mensual\n• Catálogo base de referencias comunes\n• Proceso de revisión trimestral\n\nNivel local (delegado):\n• Selección de referencias locales dentro de los parámetros\n• Recomendaciones del equipo de sala\n• Ajustes estacionales de carta\n• Vinos por copa según perfil de cliente\n\nEste modelo permite que un gastrobar urbano y un restaurante de hotel dentro del mismo grupo tengan cartas coherentes pero distintas.",
      tips: [
        "Define máximo 5 reglas corporativas. Más de eso genera burocracia y rechazo.",
        "El catálogo base no debería superar el 40% de las referencias de cada local. El resto es libertad local con criterios.",
        "Cada local debe tener un responsable de vino identificado, aunque no sea sumiller. Es el interlocutor con corporativo.",
      ],
      icon: "list",
    },
    {
      heading: "Cómo estandarizar sin homogeneizar",
      content: "La clave no es que todos los locales tengan la misma carta, sino que todos apliquen el mismo rigor. Esto se consigue estandarizando procesos, no productos.\n\nProcesos a estandarizar:\n• Cómo se evalúa una referencia antes de entrar en carta\n• Cómo se fija el PVP (fórmula o rango, no precio exacto)\n• Cuándo y cómo se revisa la carta\n• Qué datos se reportan mensualmente\n• Cómo se gestiona el stock parado\n\nProductos que no se estandarizan:\n• La selección específica de vinos locales\n• Los maridajes que recomienda el equipo\n• La presentación de la carta (digital, impresa, pizarra)\n• Las promociones locales de vino por copa",
      tips: [
        "Un local de Barcelona y otro de Bilbao pueden compartir proceso de revisión mensual pero tener cartas completamente distintas.",
        "El estándar de pricing no es 'este vino vale X', sino 'el multiplicador para esta categoría es entre 2,5x y 3,2x'.",
      ],
      icon: "check",
    },
    {
      heading: "Framework de benchmarking entre locales",
      content: "El benchmarking interno es la herramienta más poderosa de un grupo para mejorar. Permite identificar qué local lo hace bien en cada área y replicar sus prácticas.\n\nKPIs para comparar locales:\n• % de mesas que piden vino\n• Ticket medio en vino por mesa\n• Ratio copa vs botella\n• Rotación media de referencias\n• % de vinos muertos (sin venta en 60 días)\n• Margen bruto del vino vs objetivo\n\nCómo usarlo:\n1. Mide los 6 KPIs en todos los locales cada mes\n2. Crea un ranking por KPI (no un ranking global)\n3. Identifica al local referente en cada área\n4. Organiza sesiones de cross-learning trimestrales\n5. Define objetivos diferenciados por perfil de local",
      tips: [
        "No compares un fine dining con un gastrobar. Agrupa locales por perfil y compara dentro del mismo cluster.",
        "El local con mejor rotación probablemente tiene prácticas de sala replicables. Documéntalas y compártelas.",
        "Winerim automatiza este benchmarking con un dashboard multi-local en tiempo real.",
      ],
      icon: "list",
    },
    {
      heading: "Checklist de implementación progresiva",
      content: "No intentes implementar todo de golpe. Un despliegue progresivo reduce riesgos y genera buy-in del equipo.",
      tips: [
        "Mes 1-2: Auditoría del estado actual de cada local (surtido, pricing, ventas, stock).",
        "Mes 2-3: Define el modelo de governance con los 5 estándares corporativos no negociables.",
        "Mes 3-4: Piloto en 2-3 locales: implementa el reporting mensual y el catálogo base.",
        "Mes 4-6: Primer ciclo de benchmarking. Comparte resultados y ajusta el modelo.",
        "Mes 6+: Escalado al resto de locales con las lecciones del piloto incorporadas.",
        "Cada trimestre: revisión del modelo. Lo que no se mide se degrada.",
      ],
      icon: "list",
    },
  ],
  faqs: [
    { q: "¿Cuántos locales necesito para que esto tenga sentido?", a: "Desde 2 locales ya tiene valor, porque permite comparar y estandarizar. A partir de 5 se convierte en imprescindible para no perder el control." },
    { q: "¿Puedo gestionar locales con cocinas muy diferentes?", a: "Sí. El modelo de centralización flexible permite adaptar surtido y pricing por perfil de local, manteniendo estándares comunes de proceso y reporting." },
    { q: "¿Qué pasa si un local no tiene sumiller?", a: "El modelo funciona con cualquier estructura de equipo. Lo importante es tener un responsable de vino identificado en cada local, aunque sea el jefe de sala." },
    { q: "¿Cómo gestiono las compras centralizadas?", a: "Define un catálogo base corporativo (40% máximo de cada carta) y negocia volumen. El resto de referencias las compra cada local dentro de los parámetros de pricing." },
  ],
  relatedTools: [
    { label: "Scorecard mensual de rendimiento", url: "/recursos/scorecard-rendimiento-carta" },
    { label: "Plantilla de control para grupos", url: "/recursos/plantilla-control-grupo-restauracion" },
  ],
  relatedGuides: [
    { label: "Carta de vinos para grupos de restauración", url: "/guias/como-estructurar-carta-vinos-grupo-restauracion" },
    { label: "Conectar carta, stock, ventas y margen", url: "/guias/como-conectar-carta-stock-ventas-margen" },
    { label: "Cómo revisar la carta cada mes", url: "/guias/como-revisar-carta-vinos-cada-mes" },
  ],
  ctaPrimaryText: "Solicitar demo para grupos",
  ctaPrimaryUrl: "/demo",
  ctaSecondaryText: "Ver soluciones para grupos",
  ctaSecondaryUrl: "/soluciones/grupos-restauracion",
  ctaFinalTitle: "Gestiona el vino de todo tu grupo desde un solo panel",
  ctaFinalDescription: "Winerim centraliza la gestión de cartas, stock y analítica de todos tus locales. Benchmarking automatizado, alertas de desviación y control de surtido en tiempo real.",
};

const GuiaGestionarCartaGrupos = () => <GuideTemplate data={data} />;
export default GuiaGestionarCartaGrupos;
