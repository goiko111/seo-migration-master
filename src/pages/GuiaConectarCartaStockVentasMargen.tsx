import GuideTemplate from "@/components/templates/GuideTemplate";
import type { GuidePageData } from "@/components/templates/GuideTemplate";

const data: GuidePageData = {
  slug: "guias/como-conectar-carta-stock-ventas-margen",
  metaTitle: "Cómo Conectar Carta, Stock, Ventas y Margen en un Restaurante | Guía",
  metaDescription: "Guía para integrar la gestión de carta de vinos, stock, ventas y márgenes en un sistema coherente. Elimina silos de información y toma decisiones con visibilidad completa.",
  heroTitle: "Cómo conectar carta, stock, ventas y margen en un restaurante",
  heroSubtitle: "La carta, el stock, las ventas y el margen son cuatro piezas del mismo puzzle. Cuando se gestionan por separado, el restaurante pierde dinero. Cuando se conectan, las decisiones se toman con claridad.",
  heroBadge: "Guía de gestión",
  breadcrumbParent: { label: "Guías", href: "/guias-y-recursos" },
  ctaPrimaryText: "Solicitar demo",
  ctaPrimaryUrl: "/demo",
  ctaSecondaryText: "Analizar mi carta",
  ctaSecondaryUrl: "/analisis-carta",
  ctaFinalTitle: "Conecta todo con Winerim",
  ctaFinalDescription: "Winerim integra carta, stock, ventas y margen en un único panel. Visibilidad completa, decisiones informadas y gestión automatizada.",
  tableOfContents: [
    "El problema de los silos de información",
    "Las 4 piezas y cómo se conectan",
    "Carta → Stock: el flujo de compras",
    "Stock → Ventas: la rotación como puente",
    "Ventas → Margen: la rentabilidad real",
    "El ciclo completo: gestión integrada",
  ],
  sections: [
    {
      heading: "1. El problema de los silos de información",
      content: "En la mayoría de restaurantes, la información del vino vive en lugares separados: la carta está en un documento de diseño, el stock en una hoja de cálculo (o en la cabeza del sumiller), las ventas en el TPV y el margen en el informe del controller.\n\nCuando estos datos no se cruzan, nadie tiene la foto completa. El resultado son decisiones parciales que generan ineficiencias acumulativas.\n\nEjemplo real: un restaurante puede tener un vino con excelente margen que nadie recomienda porque no saben que existe (la carta no lo destaca), mientras tiene otro con margen mediocre en la posición más visible. Sin conectar los datos, este desequilibrio es invisible.",
      tips: [
        "La carta se diseña sin datos de venta → se priorizan vinos que no se venden",
        "El stock se gestiona sin datos de rotación → se compra de más y se acumula",
        "Las ventas se miran sin datos de margen → se celebra facturación sin saber si es rentable",
        "El margen se calcula sin datos de stock → no se detecta el coste de oportunidad del capital inmovilizado",
        "El coste de esta desconexión suele estar entre el 5% y el 15% de la facturación de vino",
      ],
      icon: "alert",
    },
    {
      heading: "2. Las 4 piezas y cómo se conectan",
      content: "Para entender la conexión, piensa en un ciclo:\n\nLa carta define qué vendes y a qué precio. El stock soporta lo que la carta ofrece. Las ventas son el resultado de cómo se cruza la carta con el servicio. El margen es la consecuencia de cómo se cruzan las ventas con el coste del stock.\n\nCada pieza alimenta a la siguiente. Y cada una proporciona información que debería influir en las decisiones de las demás.",
      tips: [
        "Carta → Stock: la carta debe diseñarse considerando lo que puedes tener en stock de forma sostenible",
        "Stock → Carta: si un vino se agota y no puedes reponerlo rápido, no debería estar en una posición prominente",
        "Ventas → Carta: los datos de venta te dicen qué funciona y qué debería cambiar de posición, pricing o composición",
        "Margen → Compras: el margen real (no el teórico) debe guiar las decisiones de qué comprar y cuánto",
        "La clave es que la información fluya entre las cuatro piezas, no que cada una se gestione como una isla",
      ],
      icon: "lightbulb",
    },
    {
      heading: "3. Carta → Stock: el flujo de compras",
      content: "La carta no debería diseñarse en abstracto. Cada referencia que incluyes implica una decisión de compra, un nivel de stock y un compromiso financiero.\n\nAntes de añadir un vino a la carta, responde: ¿puedo conseguirlo de forma constante? ¿Cuántas unidades necesito tener en bodega? ¿Cuánto capital representa?",
      tips: [
        "Cada referencia en carta es un compromiso de stock: si no puedes mantener stock constante, no la incluyas o marca que es edición limitada",
        "Calcula el stock mínimo necesario para cubrir 60-90 días de venta estimada antes de incluir la referencia",
        "Considera la logística del proveedor: ¿entrega semanal, quincenal, mensual? Esto determina cuánto stock necesitas mantener",
        "Al diseñar la carta, calcula el capital total que necesitas en bodega para sostenerla. Si la carta 'ideal' requiere 30.000€ en stock y solo puedes invertir 15.000€, algo sobra",
        "Prioriza referencias con proveedores fiables y entregas frecuentes — te permiten trabajar con menos stock",
      ],
      icon: "list",
    },
    {
      heading: "4. Stock → Ventas: la rotación como puente",
      content: "El stock no es un almacén — es un recurso financiero que debe generar retorno. La rotación es el indicador que conecta stock con ventas: te dice cuántas veces al año se renueva cada referencia.\n\nUna rotación alta significa que el capital invertido trabaja eficientemente. Una rotación baja significa dinero dormido.",
      tips: [
        "Tasa de rotación = Ventas anuales (uds) / Stock medio → objetivo: 8-12 para la mayoría de referencias",
        "Referencias con rotación < 4: evaluar si deben seguir en carta. Cada mes que no se venden, su coste de oportunidad crece",
        "Conecta stock con posición en carta: los vinos con más stock deberían estar en posiciones visibles y ser recomendados activamente",
        "Usa las ventas para predecir compras: si un vino vende 8 unidades/mes y tienes 24 en stock, no necesitas comprar hasta dentro de 2 meses",
        "El inventario de bodega debería revisarse junto con los datos de venta, no por separado. Un inventario sin datos de rotación es solo una lista de botellas",
      ],
      icon: "check",
    },
    {
      heading: "5. Ventas → Margen: la rentabilidad real",
      content: "Facturar mucho en vino no garantiza rentabilidad. Lo que importa es el margen: cuánto queda después de descontar el coste de cada botella o copa vendida.\n\nEl margen teórico (el que calculas al fijar el precio) rara vez coincide con el margen real (el que resulta después de merma, promociones, errores de servicio y negociaciones de última hora).",
      tips: [
        "Calcula el margen real mensualmente: (Facturación vino - Coste de vino vendido) / Facturación vino",
        "Compara con el margen teórico: si hay una diferencia > 5%, investiga. Las causas habituales son merma de copa, regalos a clientes y errores de facturación",
        "Analiza el margen por referencia, no solo el global: las medias ocultan las referencias con margen pobre",
        "Conecta el margen con las ventas: una referencia puede tener margen alto pero vender poco (poco impacto) o margen bajo pero vender mucho (gran impacto negativo)",
        "El indicador definitivo es la contribución al margen: margen unitario × unidades vendidas. Esto te dice qué vinos realmente financian tu negocio",
      ],
      icon: "lightbulb",
    },
    {
      heading: "6. El ciclo completo: gestión integrada",
      content: "Cuando las cuatro piezas se conectan, la gestión del vino pasa de ser reactiva a ser proactiva. No esperas a que un vino acumule meses sin venderse — lo detectas en semanas. No fijas precios sin datos — los ajustas con información real.\n\nEste es el ciclo mensual que conecta las cuatro piezas:",
      tips: [
        "Paso 1 — Revisar el scorecard mensual: ventas, rotación, margen y KPIs de copa en un solo documento",
        "Paso 2 — Identificar anomalías: referencias que bajan en rotación, márgenes que se deterioran, stock que se acumula",
        "Paso 3 — Decidir acciones: ajustar pricing, rotar copas, reubicar referencias en carta, planificar compras",
        "Paso 4 — Ejecutar: implementar los cambios en carta, comunicar al equipo, hacer los pedidos",
        "Paso 5 — Medir el impacto: en el siguiente scorecard, verificar si las acciones tuvieron efecto",
        "Este ciclo convierte la gestión del vino de un arte basado en intuición a un proceso basado en datos, sin perder la creatividad ni la pasión",
      ],
      icon: "check",
    },
  ],
  faqs: [
    { q: "¿Necesito un software para conectar estos datos?", a: "No es imprescindible, pero sí muy recomendable. Con hojas de cálculo puedes cruzar los datos manualmente, pero lleva tiempo y es propenso a errores. Winerim lo automatiza completamente." },
    { q: "¿Cuánto tiempo lleva implementar este sistema?", a: "Empezar con un scorecard mensual básico lleva 1-2 horas la primera vez y 30-60 minutos los meses siguientes. La versión completa requiere un período de adaptación de 2-3 meses." },
    { q: "¿Esto es solo para restaurantes grandes?", a: "No. Un restaurante con 30 referencias y una bodega pequeña se beneficia igual de conectar sus datos. De hecho, en restaurantes pequeños el impacto de una mala decisión de compra es proporcionalmente mayor." },
    { q: "¿Cuál es el primer paso si no tengo nada de esto?", a: "Empieza por el scorecard mensual: recoger ventas por referencia, calcular la rotación y el margen. Con esos tres datos ya puedes tomar mejores decisiones." },
  ],
  relatedTools: [
    { label: "Wine List Score", url: "/herramientas/wine-list-score" },
    { label: "Calculadora de stock muerto", url: "/herramientas/calculadora-stock-muerto" },
    { label: "Calculadora de margen de vino", url: "/calculadora-margen-vino" },
  ],
  relatedGuides: [
    { label: "Scorecard mensual de rendimiento", url: "/recursos/scorecard-rendimiento-carta" },
    { label: "Cómo usar datos para decidir qué vinos comprar", url: "/guias/como-usar-datos-para-decidir-que-vinos-comprar" },
    { label: "Funcionalidades de Winerim", url: "/funcionalidades" },
    { label: "Soluciones para grupos de restauración", url: "/soluciones/grupos-restauracion" },
  ],
};

const GuiaConectarCartaStockVentasMargen = () => <GuideTemplate data={data} />;
export default GuiaConectarCartaStockVentasMargen;
