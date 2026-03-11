import GuideTemplate from "@/components/templates/GuideTemplate";
import type { GuidePageData } from "@/components/templates/GuideTemplate";

const data: GuidePageData = {
  slug: "guias/como-estructurar-carta-vinos-grupo-restauracion",
  metaTitle: "Cómo Estructurar una Carta de Vinos para un Grupo de Restauración | Guía",
  metaDescription: "Guía para diseñar cartas de vinos coherentes en grupos de restauración: estandarización, adaptación local, control de márgenes y gestión centralizada.",
  heroTitle: "Cómo estructurar una carta de vinos para un grupo de restauración",
  heroSubtitle: "Gestionar la carta de vinos de un solo restaurante ya es complejo. Hacerlo para 5, 10 o 50 locales con identidades diferentes exige un sistema. Esta guía te muestra cómo.",
  heroBadge: "Guía estratégica",
  breadcrumbParent: { label: "Guías", href: "/guias-y-recursos" },
  ctaPrimaryText: "Solicitar demo",
  ctaPrimaryUrl: "/demo",
  ctaSecondaryText: "Analizar mi carta",
  ctaSecondaryUrl: "/analisis-carta",
  ctaFinalTitle: "Gestiona todas tus cartas desde un solo lugar",
  ctaFinalDescription: "Winerim permite a los grupos de restauración centralizar la gestión de cartas, estandarizar márgenes y adaptar la oferta por local — todo desde una única plataforma.",
  tableOfContents: [
    "El reto de gestionar múltiples cartas",
    "Errores habituales en grupos de restauración",
    "El modelo troncal + adaptación local",
    "Cómo estandarizar márgenes sin perder identidad",
    "Gestión centralizada de proveedores y stock",
    "Framework de decisión para nuevos locales",
  ],
  sections: [
    {
      heading: "1. El reto de gestionar múltiples cartas de vinos",
      content: "Un grupo de restauración no es un restaurante multiplicado por N. Cada local puede tener una cocina diferente, un público distinto y un posicionamiento propio. Pero la dirección necesita coherencia, control de costes y visibilidad financiera.\n\nEl vino suele ser el área con menos estandarización en los grupos. Mientras la comida tiene fichas técnicas, escandallos y proveedores homologados, la carta de vinos frecuentemente se deja en manos del sumiller o el director de cada local, sin criterios comunes.\n\nEl resultado: márgenes dispares, proveedores duplicados, stock descontrolado y cartas que no reflejan la estrategia del grupo.",
      tips: [
        "Sin criterios comunes, cada local fija precios de forma diferente — el grupo pierde margen en unos y competitividad en otros",
        "La duplicación de proveedores impide negociar volúmenes y condiciones ventajosas",
        "Sin visibilidad centralizada, la dirección no sabe cuánto capital tiene inmovilizado en bodega",
        "La falta de estándares dificulta la formación del personal: cada local enseña de forma diferente",
      ],
      icon: "alert",
    },
    {
      heading: "2. Errores habituales en la gestión de cartas de grupo",
      content: "Antes de construir un sistema, conviene identificar los errores que más se repiten en grupos de restauración que gestionan el vino sin una estrategia definida.",
      tips: [
        "Carta única para todos los locales: ignora las diferencias de cocina, público y posicionamiento. Un gastronómico y un casual no pueden compartir la misma carta",
        "Libertad total por local: genera caos operativo, hace imposible el control financiero y complica la relación con proveedores",
        "Negociar con demasiados distribuidores: multiplicar proveedores por local aumenta el coste logístico y reduce el poder de negociación",
        "No medir el rendimiento del vino por local: sin datos comparables, no se puede identificar qué funciona y qué no",
        "Fijar márgenes sin considerar el posicionamiento del local: un multiplicador ×3 que funciona en un casual puede ser excesivo en un fine dining",
      ],
      icon: "alert",
    },
    {
      heading: "3. El modelo troncal + adaptación local",
      content: "La solución más efectiva para grupos es el modelo de carta troncal con adaptación local. Funciona así:\n\nLa carta troncal define los criterios comunes del grupo: estructura de categorías, rangos de precio, reglas de margen, número mínimo y máximo de referencias por sección, y un catálogo de vinos homologados.\n\nCada local adapta la carta troncal a su realidad: puede elegir referencias del catálogo, añadir vinos locales que cumplan los criterios de margen, y ajustar la distribución según su cocina y público.\n\nEsto garantiza coherencia sin uniformidad. El grupo mantiene el control financiero y de marca, y cada local conserva la personalidad de su oferta.",
      tips: [
        "Define una estructura de categorías común: espumosos, blancos, rosados, tintos, dulces — con subcategorías opcionales por local",
        "Establece un catálogo de vinos homologados con proveedores negociados centralmente",
        "Permite un 20-30% de referencias locales que cumplan los criterios de margen del grupo",
        "Fija rangos de precio por sección: cada local puede elegir dentro del rango, pero no salirse",
        "Limita el número total de referencias por tipo de local: 40-60 para casual, 60-100 para gastronómico",
      ],
      icon: "check",
    },
    {
      heading: "4. Cómo estandarizar márgenes sin perder identidad",
      content: "El margen del vino es una de las áreas donde más valor pueden crear los grupos de restauración — y donde más dinero se pierde por falta de criterio.\n\nLa clave es usar multiplicadores escalonados y adaptados al posicionamiento de cada local, no un multiplicador fijo para todo el grupo.",
      tips: [
        "Define multiplicadores por tramo de coste, no por local: entrada (×3-4), media (×2.5-3), premium (×2-2.5), alta gama (×1.8-2.2)",
        "Ajusta los multiplicadores según el posicionamiento: un casual puede usar multiplicadores más altos en entrada; un fine dining necesita ser más competitivo en premium",
        "Establece un margen bruto objetivo por local (ej: 65-72%) y deja que el director ajuste dentro de ese rango",
        "Revisa los márgenes trimestralmente con datos de venta reales, no solo con precios de carta",
        "Compara el rendimiento entre locales: el benchmarking interno es una de las ventajas más potentes de un grupo",
      ],
      icon: "lightbulb",
    },
    {
      heading: "5. Gestión centralizada de proveedores y stock",
      content: "La centralización de compras es donde los grupos pueden generar más ahorro directo. Pero requiere un sistema que equilibre volumen con flexibilidad.\n\nEl enfoque recomendado es tener un proveedor principal (60-70% del volumen), 2-3 proveedores complementarios (20-30%) y dejar un margen para proveedores locales de cada establecimiento (10-20%).",
      tips: [
        "Negocia condiciones con el proveedor principal basándote en el volumen total del grupo, no de cada local",
        "Centraliza el seguimiento de stock: cada local reporta niveles de bodega con la misma frecuencia y formato",
        "Establece alertas de stock mínimo y máximo por referencia — evita tanto roturas como acumulación",
        "Revisa la rotación por local y por referencia mensualmente: detecta vinos muertos antes de que acumulen meses",
        "Usa los datos de compra para negociar condiciones anuales: rappels por volumen, plazos de pago, devoluciones",
      ],
      icon: "list",
    },
    {
      heading: "6. Framework de decisión para nuevos locales",
      content: "Cuando un grupo abre un nuevo local, la carta de vinos debería diseñarse con un proceso estructurado, no improvisarse.\n\nEste framework te guía paso a paso:",
      tips: [
        "Paso 1 — Definir el posicionamiento: casual, gastronómico, temático. Esto determina el número de referencias, los rangos de precio y el nivel de profundidad",
        "Paso 2 — Seleccionar del catálogo troncal: elegir las referencias homologadas que encajan con la cocina y el público del nuevo local",
        "Paso 3 — Añadir referencias locales: completar con vinos de la zona que aporten identidad, siempre dentro de los criterios de margen",
        "Paso 4 — Validar la estructura: revisar el equilibrio de tipologías, regiones, precios y estilos usando la plantilla de equilibrio",
        "Paso 5 — Formar al equipo: usar la plantilla de formación exprés adaptada a la carta específica del nuevo local",
        "Paso 6 — Monitorizar los primeros 90 días: revisar semanalmente las ventas por referencia y ajustar la carta según los datos reales",
      ],
      icon: "check",
    },
  ],
  faqs: [
    { q: "¿Cuántas referencias debería tener cada local de un grupo?", a: "Depende del posicionamiento: 40-60 para casual dining, 60-100 para gastronómico, 100-150 para fine dining con bodega. Lo importante es que cada referencia tenga una función clara y rote regularmente." },
    { q: "¿Debería cada local tener su propio sumiller?", a: "No necesariamente. Un sumiller de grupo puede supervisar 3-5 locales si tiene las herramientas adecuadas. Los locales individuales pueden funcionar con jefes de sala formados en vino." },
    { q: "¿Cómo medir el rendimiento del vino entre locales?", a: "Los KPIs clave son: peso del vino en ticket medio, margen bruto por local, tasa de rotación, ratio copa/botella y capital inmovilizado en bodega." },
    { q: "¿Merece la pena centralizar las compras de vino?", a: "Sí. Los grupos que centralizan consiguen mejores precios (5-15% de ahorro), mejores condiciones de pago y menor coste logístico. La clave es mantener flexibilidad para referencias locales." },
  ],
  relatedTools: [
    { label: "Analizador de carta de vinos", url: "/wine-list-analyzer" },
    { label: "Wine List Score — Audita tu carta", url: "/herramientas/wine-list-score" },
    { label: "Calculadora de margen de vino", url: "/calculadora-margen-vino" },
  ],
  relatedGuides: [
    { label: "Cómo conectar carta, stock, ventas y margen", url: "/guias/como-conectar-carta-stock-ventas-margen" },
    { label: "Cómo usar datos para decidir qué vinos comprar", url: "/guias/como-usar-datos-para-decidir-que-vinos-comprar" },
    { label: "Soluciones para grupos de restauración", url: "/soluciones/grupos-restauracion" },
  ],
};

const GuiaCartaGrupoRestauracion = () => <GuideTemplate data={data} />;
export default GuiaCartaGrupoRestauracion;
