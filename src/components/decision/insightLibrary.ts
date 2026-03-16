import type { InsightDrawerData } from "./InsightDrawer";

/**
 * Library of contextual insights for the Decision Center.
 * Each insight maps to a specific alert/metric in the product UI.
 * Import by key and pass to <InsightDrawer>.
 */
const insightLibrary: Record<string, InsightDrawerData> = {
  "margen-bajo": {
    id: "margen-bajo",
    title: "Margen bajo detectado",
    queSignifica:
      "Este vino tiene un margen por debajo del umbral recomendado para tu segmento. Eso significa que cada vez que se vende, dejas dinero sobre la mesa. No es que el vino sea malo: es que el precio no refleja su coste real.",
    porQueTeLoMostramos:
      "Porque este vino se está vendiendo y, por tanto, su bajo margen tiene impacto directo en tu rentabilidad. Si fuera un vino sin ventas, sería un problema distinto (stock muerto). Aquí el problema es que vendes, pero ganas poco.",
    queDeberias: [
      "Abre la ficha de esta referencia y compara su coste actual con el PVP: si el multiplicador está por debajo de ×2.5, sube el precio 1-2 € esta semana.",
      "Busca en tu carta otro vino de la misma franja con mejor margen y pide al equipo de sala que lo recomiende como primera opción durante 7 días.",
      "Contacta al proveedor y negocia una mejora de precio para el próximo pedido usando como palanca tu volumen de compra real.",
    ],
    recurso: { label: "Calculadora de márgenes", href: "/calculadora-margen-vino" },
    decisionCenterHref: "/decision-center/margenes-pricing",
  },

  "stock-muerto": {
    id: "stock-muerto",
    title: "Stock muerto identificado",
    queSignifica:
      "Esta referencia lleva más de 60 días sin venta. Es dinero parado en tu bodega que no genera ningún retorno. Cada día que pasa, el vino puede perder valor y el capital que invertiste sigue inmovilizado.",
    porQueTeLoMostramos:
      "Porque el stock muerto no es visible a simple vista. No aparece en la cuenta de resultados hasta que lo descartas. Pero mientras tanto, ocupa espacio, distrae atención y podría haberse invertido en referencias que sí rotan.",
    queDeberias: [
      "Confirma el inventario real de esta referencia (unidades en bodega) y calcula el capital inmovilizado: unidades × coste de compra.",
      "Si quedan 3+ botellas, sácala por copa esta semana con un precio que cubra merma y margen. Dile al equipo que la recomiende activamente.",
      "Si tras 14 días no rota ni por copa, retírala de la carta y reasigna ese presupuesto a una referencia que sí tenga demanda en tu carta.",
    ],
    recurso: { label: "Checklist detección de vinos muertos", href: "/recursos/checklist-deteccion-vinos-muertos" },
    decisionCenterHref: "/decision-center/stock-rotacion",
  },

  "carta-descompensada": {
    id: "carta-descompensada",
    title: "Carta descompensada",
    queSignifica:
      "Tu carta tiene un desequilibrio significativo entre tipos de vino, franjas de precio o regiones. Eso significa que hay zonas saturadas donde las referencias se canibalizan y huecos donde el comensal no encuentra lo que busca.",
    porQueTeLoMostramos:
      "Porque una carta desequilibrada ralentiza la decisión del comensal, reduce la conversión y genera stock muerto en las zonas saturadas. Equilibrar no es tener 'de todo': es que cada referencia tenga un rol claro.",
    queDeberias: [
      "Abre el wine mapping de tu carta y localiza la franja de precio con más de 5 referencias del mismo tipo: elige la de peor rotación y retírala hoy.",
      "Identifica el hueco más evidente (¿falta blanco por debajo de 25 €? ¿espumoso accesible?) y cubre esa posición con una sola referencia de buen margen.",
      "Revisa que tu carta tenga al menos un vino de entrada a <20 €, uno de impulso entre 25-35 € y uno de imagen >50 €. Si falta alguno, añádelo.",
    ],
    recurso: { label: "Plantilla de equilibrio de carta", href: "/recursos/plantilla-equilibrio-carta" },
    decisionCenterHref: "/decision-center/carta-equilibrio",
  },

  "copa-poco-rentable": {
    id: "copa-poco-rentable",
    title: "Vino por copa poco rentable",
    queSignifica:
      "Esta referencia por copa no está cubriendo su coste real cuando incluyes la merma. Es decir: estás sirviendo copas que te cuestan más de lo que cobras, porque parte de la botella se pierde antes de venderse.",
    porQueTeLoMostramos:
      "Porque la copa es tu mayor palanca de margen cuando funciona bien, y tu mayor fuente de pérdida invisible cuando no. Este vino por copa está en la segunda categoría y necesita atención.",
    queDeberias: [
      "Recalcula el precio de esta copa usando merma real del 25%: (coste botella ÷ 4 copas reales) × multiplicador ≥3. Si tu precio actual es inferior, súbelo mañana.",
      "Mide cuántas copas sirves realmente de esta referencia por semana. Si son menos de 8, la botella no se termina a tiempo y la merma te come el margen.",
      "Si la rotación es <8 copas/semana, retira esta referencia del programa de copa y sustitúyela por otra que tu equipo ya recomiende habitualmente.",
    ],
    recurso: { label: "Calculadora precio por copa", href: "/herramientas/calculadora-precio-vino-por-copa" },
    decisionCenterHref: "/decision-center/vino-por-copa",
  },

  "compra-mal-calibrada": {
    id: "compra-mal-calibrada",
    title: "Compra mal calibrada",
    queSignifica:
      "Estás comprando cantidades que no se alinean con tu ritmo de ventas. Puede ser por exceso (acumulas stock) o por defecto (te quedas sin referencias que sí piden). En ambos casos, pierdes dinero o ventas.",
    porQueTeLoMostramos:
      "Porque la compra es la primera decisión que impacta en tu margen. Si compras mal, todo lo demás (pricing, stock, carta) arrastra el problema. Calibrar la compra con datos de venta es la base de una gestión rentable.",
    queDeberias: [
      "Descarga tu último pedido y cruza cada línea con las ventas de los últimos 30 días: marca en rojo lo que compraste y no vendiste (exceso directo).",
      "Revisa si tienes rupturas de stock en tu top 10 de referencias por rotación. Si alguna se ha agotado, priorízala en el próximo pedido con cantidad = ventas mensuales × 1.2.",
      "Antes del próximo pedido, elimina al menos 2 líneas que llevan 60+ días sin venta y reasigna ese presupuesto a tus 3 referencias con mejor ratio margen/rotación.",
    ],
    recurso: { label: "Calculadora de compra inteligente", href: "/herramientas/calculadora-compra-inteligente" },
    decisionCenterHref: "/decision-center/compras-reposicion",
  },

  "baja-rotacion": {
    id: "baja-rotacion",
    title: "Baja rotación detectada",
    queSignifica:
      "Esta referencia se vende con una frecuencia muy inferior a la media de tu carta. No es (todavía) stock muerto, pero está cerca. Si no actúas, lo será en pocas semanas.",
    porQueTeLoMostramos:
      "Porque la rotación baja es la antesala del stock muerto. Detectarla a tiempo te permite actuar antes de que el vino pierda valor o se convierta en capital inmovilizado sin retorno.",
    queDeberias: [
      "Incluye esta referencia en el briefing de sala de esta semana: pide al equipo que la recomiende como primera sugerencia durante 7 días y registra las ventas.",
      "Revisa su posición en la carta: si está enterrada al final de una categoría larga, muévela a un lugar más visible o a una sección de 'Selección del sommelier'.",
      "Si tras 14 días de impulso activo no mejora, decide: sacarla por copa (si admite oxidación) o retirarla y liberar capital para una referencia nueva.",
    ],
    recurso: { label: "Guía: Mejorar la rotación", href: "/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante" },
    decisionCenterHref: "/decision-center/stock-rotacion",
  },

  "exceso-profundidad": {
    id: "exceso-profundidad",
    title: "Exceso de profundidad en carta",
    queSignifica:
      "Tienes demasiadas referencias en una misma categoría o franja de precio. Eso genera canibalización: varios vinos compiten por el mismo cliente, diluyen la atención y ralentizan la decisión de compra.",
    porQueTeLoMostramos:
      "Porque más opciones no significa más ventas. A partir de cierto punto, el exceso de elección paraliza al comensal y reduce el ticket medio. Además, cada referencia extra genera coste de stock y gestión.",
    queDeberias: [
      "Filtra la categoría saturada y ordena sus referencias por ventas de los últimos 60 días: las 2 con menos ventas son candidatas inmediatas a retirada.",
      "Comprueba si hay pares de vinos con precio idéntico (±2 €) y perfil similar: si los hay, quédate con el de mejor margen y retira el otro hoy.",
      "Define una regla de profundidad máxima para esa categoría (ej: máx. 4 tintos de Rioja entre 20-30 €) y aplícala antes de tu próximo pedido.",
    ],
    recurso: { label: "Guía: Detectar canibalización", href: "/guias/como-detectar-canibalizacion-vinos-carta" },
    decisionCenterHref: "/decision-center/carta-equilibrio",
  },

  "proveedor-caro": {
    id: "proveedor-caro",
    title: "Proveedor poco competitivo",
    queSignifica:
      "Este proveedor te está vendiendo por encima del precio medio de mercado para referencias similares. Puede ser por falta de negociación, por inercia de compra o porque no has comparado con alternativas recientes.",
    porQueTeLoMostramos:
      "Porque cada euro de más en compra es un euro menos de margen. Si este proveedor concentra un volumen alto de tu pedido, el impacto se multiplica. Comparar es la base de comprar mejor.",
    queDeberias: [
      "Pide presupuesto a 2 proveedores alternativos para tus 5 referencias de mayor volumen de este proveedor. Hazlo esta semana, por email, con cantidades exactas.",
      "Llama a tu proveedor actual con los presupuestos en mano y pide igualar o mejorar. Si no puede, reasigna al menos las 2 referencias con mayor diferencia de precio.",
      "Revisa las condiciones ocultas (portes, mínimos, rappels) y calcula el coste total real por botella, no solo el precio de tarifa.",
    ],
    recurso: { label: "Winerim Supply", href: "/producto/winerim-supply" },
    decisionCenterHref: "/decision-center/compras-reposicion",
  },

  "grupo-benchmarking": {
    id: "grupo-benchmarking",
    title: "Desviación entre locales detectada",
    queSignifica:
      "Uno o varios de tus locales muestran métricas significativamente distintas al resto del grupo en margen, rotación o ticket medio de vino. Eso no siempre es un problema, pero sí es una señal que requiere análisis.",
    porQueTeLoMostramos:
      "Porque en un grupo, las desviaciones se multiplican por el número de unidades. Un local con un 5% menos de margen en vino no parece grave, pero si tienes 8 locales y 3 replican el patrón, el impacto anual es considerable.",
    queDeberias: [
      "Abre el dashboard de comparación de unidades y ordena por margen bruto ponderado: identifica el local con peor resultado y revisa si su carta tiene el mismo mix que el mejor local.",
      "Compara las 5 referencias más vendidas del mejor local con las del peor: si no coinciden, evalúa replicar las 2 referencias de mayor margen/rotación del líder.",
      "Convoca una revisión mensual de 30 min con los responsables de los 2 locales más desviados para cruzar datos y acordar 2 acciones concretas de alineamiento.",
    ],
    recurso: { label: "Guía de carta para grupos", href: "/guias/como-gestionar-carta-vinos-grupo-restauracion" },
    decisionCenterHref: "/decision-center/grupos-benchmarking",
  },
};

export default insightLibrary;
