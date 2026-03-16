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
      "Revisa el coste actualizado del proveedor. ¿Ha subido sin que ajustaras el PVP?",
      "Compara su multiplicador con referencias similares de tu carta.",
      "Decide si subes el precio, lo sustituyes o lo reposicionas en una franja donde compita mejor.",
      "Si es una referencia estratégica (atracción, imagen), documéntalo como decisión consciente.",
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
      "Confirma que la referencia sigue realmente en bodega (no vendida fuera de sistema).",
      "Clasifícala: ¿es rescatable con una acción de sala, o debe salir de la carta?",
      "Si es rescatable, dile al equipo que la recomiende activamente durante 2 semanas.",
      "Si no rota tras la acción, retírala y libera el capital para comprar mejor.",
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
      "Identifica la franja de precio más saturada y evalúa qué referencia sobra.",
      "Busca el hueco más evidente (¿falta espumoso? ¿falta blanco accesible?) y cúbrelo.",
      "Revisa si tu distribución por tipos coincide con lo que realmente pide tu clientela.",
      "Antes de añadir, retira. Una carta más corta y coherente vende más.",
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
      "Recalcula el precio incluyendo merma real (no teórica): usa al menos un 25% de pérdida.",
      "Si la merma es alta, evalúa si este vino tiene suficiente rotación para justificar copa.",
      "Considera reducir el número de copas activas para concentrar rotación.",
      "Forma al equipo para recomendar esta copa activamente si decides mantenerla.",
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
      "Cruza tu último pedido con los datos de venta de los últimos 30 días.",
      "Identifica referencias que compraste y no vendiste (señal de exceso).",
      "Identifica rupturas de stock en referencias que sí tenían demanda.",
      "Ajusta las cantidades del próximo pedido en base a rotación real.",
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
      "Revisa si el vino está bien posicionado en la carta (¿es fácil de encontrar?).",
      "Pide al equipo de sala que lo recomiende durante una semana y mide el impacto.",
      "Si no mejora, evalúa si el precio es competitivo dentro de su franja.",
      "Si tras 2 acciones no responde, planifica su salida de la carta.",
    ],
    recurso: { label: "Guía: Mejorar la rotación", href: "/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante" },
  },

  "exceso-profundidad": {
    id: "exceso-profundidad",
    title: "Exceso de profundidad en carta",
    queSignifica:
      "Tienes demasiadas referencias en una misma categoría o franja de precio. Eso genera canibalización: varios vinos compiten por el mismo cliente, diluyen la atención y ralentizan la decisión de compra.",
    porQueTeLoMostramos:
      "Porque más opciones no significa más ventas. A partir de cierto punto, el exceso de elección paraliza al comensal y reduce el ticket medio. Además, cada referencia extra genera coste de stock y gestión.",
    queDeberias: [
      "Identifica la categoría con más referencias y analiza cuáles se solapan.",
      "Compara ventas entre las referencias solapadas: ¿alguna claramente gana?",
      "Retira o fusiona las que menos aportan, priorizando margen y rotación.",
      "Define un criterio de profundidad máxima por categoría y respétalo.",
    ],
    recurso: { label: "Guía: Detectar canibalización", href: "/guias/como-detectar-canibalizacion-vinos-carta" },
  },

  "proveedor-caro": {
    id: "proveedor-caro",
    title: "Proveedor poco competitivo",
    queSignifica:
      "Este proveedor te está vendiendo por encima del precio medio de mercado para referencias similares. Puede ser por falta de negociación, por inercia de compra o porque no has comparado con alternativas recientes.",
    porQueTeLoMostramos:
      "Porque cada euro de más en compra es un euro menos de margen. Si este proveedor concentra un volumen alto de tu pedido, el impacto se multiplica. Comparar es la base de comprar mejor.",
    queDeberias: [
      "Solicita presupuesto a al menos 2 proveedores alternativos para las mismas referencias.",
      "Negocia con tu proveedor actual usando los precios de mercado como referencia.",
      "Evalúa si el servicio (plazo, mínimos, devoluciones) justifica el sobrecoste.",
      "Si no hay justificación, reasigna volumen al proveedor más competitivo.",
    ],
    recurso: { label: "Winerim Supply", href: "/producto/winerim-supply" },
  },
};

export default insightLibrary;
