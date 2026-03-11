import GuideTemplate from "@/components/templates/GuideTemplate";
import type { GuidePageData } from "@/components/templates/GuideTemplate";

const data: GuidePageData = {
  slug: "guias/como-decidir-surtido-segun-ticket-medio-tipo-local",
  metaTitle: "Cómo Decidir el Surtido de Vinos Según Ticket Medio y Tipo de Local | Winerim",
  metaDescription: "Guía para seleccionar el surtido de vinos ideal según el ticket medio de tu restaurante, el perfil del cliente y el tipo de cocina. Framework práctico con ejemplos.",
  heroTitle: "Cómo decidir el surtido según ticket medio y tipo de local",
  heroSubtitle: "No existe la carta de vinos perfecta. Existe la carta perfecta para tu restaurante. El surtido debe reflejar quién come en tu sala, cuánto gasta y qué espera. Esta guía te da el framework para acertarlo.",
  heroBadge: "Guía estratégica",
  breadcrumbParent: { label: "Guías", href: "/guias-y-recursos" },
  tableOfContents: [
    "Por qué el surtido depende del ticket medio",
    "Los 4 perfiles de restaurante y su surtido ideal",
    "Framework: de ticket medio a escalera de precios",
    "Cuántas referencias por tramo de precio",
    "Errores frecuentes en la composición del surtido",
    "Checklist de validación del surtido",
  ],
  sections: [
    {
      heading: "Por qué el surtido depende del ticket medio",
      content: "El ticket medio es el indicador más fiable del poder adquisitivo y las expectativas de tus clientes. Un comensal que gasta 25€ por persona no espera lo mismo que uno que gasta 80€.\n\nSi tu ticket medio es 30€ y tienes vinos de 60€ en carta, esos vinos no se van a vender. No porque sean malos, sino porque representan el doble de lo que tu cliente gasta en toda la comida.\n\nRegla general: el vino más vendido de tu carta debería costar entre el 30% y el 50% de tu ticket medio por persona. Eso marca el 'sweet spot' de precio donde la mayoría de tus clientes se siente cómodo.",
      tips: [
        "Ticket medio 25-35€/persona → vino más vendido entre 8-16€ (copa 4-6€).",
        "Ticket medio 40-60€/persona → vino más vendido entre 18-28€ (copa 6-10€).",
        "Ticket medio 70€+/persona → vino más vendido entre 25-40€ (copa 8-14€).",
        "Si tu vino más vendido no está en ese rango, tu surtido está desajustado con tu público.",
      ],
      icon: "lightbulb",
    },
    {
      heading: "Los 4 perfiles de restaurante y su surtido ideal",
      content: "No todos los restaurantes con el mismo ticket medio necesitan el mismo surtido. El tipo de cocina, la ubicación y el perfil de cliente también importan.",
      tips: [
        "Casual dining / gastrobar (ticket 20-35€): 15-25 referencias, 60% tintos, foco en copas, máx. 2 tramos de precio, nada por encima de 35€/botella. El cliente busca facilidad.",
        "Restaurante de cocina de autor (ticket 40-65€): 30-50 referencias, equilibrio blanco/tinto, 3 tramos de precio, copa premium como palanca, vinos de pequeño productor como diferenciación.",
        "Fine dining (ticket 70€+): 60-120+ referencias, profundidad por región/estilo, carta como experiencia, mínimo 4 tramos de precio, maridajes sugeridos, vinos icónicos como aspiracionales.",
        "Hotel / resort (ticket variable): carta dual — una simplificada para restaurante casual y otra con profundidad para el gastronómico. El minibar y el room service necesitan selección diferenciada.",
      ],
      icon: "list",
    },
    {
      heading: "Framework: de ticket medio a escalera de precios",
      content: "La escalera de precios es la distribución de tus vinos por tramos de PVP. Un surtido bien diseñado tiene una escalera clara que guía al comensal desde la opción accesible hasta la premium.\n\nCómo construirla:\n1. Calcula tu 'sweet spot' (30-50% del ticket medio).\n2. Define 3-4 tramos de precio:\n   • Entrada: 60-70% del sweet spot → para el cliente sensible al precio.\n   • Sweet spot: el rango donde esperas concentrar el 50% de ventas.\n   • Premium: 150-200% del sweet spot → para ocasiones especiales.\n   • Aspiracional (opcional): 300%+ del sweet spot → 2-3 referencias icónicas.\n3. Distribuye referencias: más concentración en el sweet spot, menos en extremos.\n\nEjemplo para ticket medio 45€:\n• Entrada: 14-18€ (5 referencias)\n• Sweet spot: 20-28€ (12 referencias)\n• Premium: 32-45€ (6 referencias)\n• Aspiracional: 55-90€ (3 referencias)\n• Total: 26 referencias bien distribuidas.",
      tips: [
        "El 50-60% de tus referencias deberían estar en el tramo sweet spot.",
        "El tramo de entrada existe para que el cliente no se sienta forzado. No lo elimines.",
        "Las referencias aspiracionales no necesitan venderse mucho. Su función es anclar el valor percibido de tu carta.",
      ],
      icon: "check",
    },
    {
      heading: "Cuántas referencias por tramo de precio",
      content: "Más referencias no significa mejor carta. Significa más complejidad de gestión, más stock inmovilizado y más decisiones difíciles para el comensal.\n\nRegla de oro por tipo de local:\n• Casual / gastrobar: 15-25 referencias totales\n• Restaurante medio: 25-45 referencias\n• Restaurante gastronómico: 40-80 referencias\n• Fine dining con bodega: 80-150+ referencias\n\nDentro de cada tramo de precio:\n• Tramo de entrada: 3-5 referencias (pocas pero buenas)\n• Sweet spot: 8-15 referencias (la mayor concentración)\n• Premium: 4-8 referencias\n• Aspiracional: 2-4 referencias\n\nCriterio clave: cada referencia debe tener una razón de estar. Si no puedes explicar en una frase por qué ese vino está en tu carta, probablemente sobra.",
      tips: [
        "Si tienes más de 5 referencias por copa, estás gestionando demasiada merma.",
        "Cada referencia que añades diluye la atención sobre las demás. Más no es mejor.",
        "Revisa: si algún tramo tiene más del 40% de referencias sin venta en 30 días, tienes demasiadas.",
      ],
      icon: "alert",
    },
    {
      heading: "Errores frecuentes en la composición del surtido",
      content: "Estos son los errores más comunes que vemos en la composición del surtido, independientemente del tipo de restaurante.",
      tips: [
        "Surtido de ego: elegir vinos que le gustan al dueño o al sumiller en lugar de vinos que se adaptan al cliente. Tu carta no es una colección personal.",
        "Hueco de precio: no tener nada entre 18€ y 35€ cuando tu sweet spot está ahí. El cliente se va al extremo barato o no pide.",
        "Redundancia: 4 Ribera del Duero crianza en el mismo rango de precio. No compiten con la competencia, compiten entre sí.",
        "Falta de copa: un restaurante con ticket medio de 30€ que solo ofrece botella. El cliente no quiere comprometerse con 25€ de vino.",
        "Carta estática: el mismo surtido durante 12 meses. Sin estacionalidad, sin novedad, sin razón para que el cliente repita y descubra.",
      ],
      icon: "alert",
    },
    {
      heading: "Checklist de validación del surtido",
      content: "Antes de cerrar tu carta, pasa este checklist de 8 puntos para validar que el surtido está bien equilibrado.",
      tips: [
        "✓ ¿Tu vino más vendido está en el sweet spot de precio (30-50% del ticket medio)?",
        "✓ ¿Tienes al menos 2 opciones de copa en el tramo de entrada?",
        "✓ ¿Cada tramo de precio tiene suficientes opciones sin redundancias?",
        "✓ ¿Menos del 20% de las referencias lleva más de 60 días sin venderse?",
        "✓ ¿Hay al menos 1 blanco y 1 tinto por tramo de precio?",
        "✓ ¿Las referencias aspiracionales son reconocibles para tu público?",
        "✓ ¿Puedes explicar en una frase por qué cada vino está en la carta?",
        "✓ ¿El total de referencias es gestionable para tu equipo y tu almacén?",
      ],
      icon: "list",
    },
  ],
  faqs: [
    { q: "¿Qué hago si mi ticket medio varía mucho entre comida y cena?", a: "Considera una carta ligeramente diferente o, al menos, copas distintas. Si la cena tiene un ticket 40% superior, los vinos premium se venderán más de noche." },
    { q: "¿Debo incluir vinos que yo sé que son buenos pero que no se venden?", a: "Un vino que no se vende no es 'bueno' para tu carta, aunque lo sea objetivamente. Dale 3 meses con recomendación activa. Si no funciona, sustitúyelo." },
    { q: "¿Cómo sé si tengo demasiadas referencias?", a: "Si más del 25% de tu carta no ha vendido en 30 días, tienes demasiadas. Reduce y concentra." },
    { q: "¿Winerim me ayuda a definir el surtido?", a: "Sí. Winerim analiza tu ticket medio, perfil de cliente y rendimiento histórico para sugerirte la composición ideal de carta." },
  ],
  relatedTools: [
    { label: "Analizador de carta", url: "/analisis-carta" },
    { label: "Calculadora de margen", url: "/calculadora-margen-vino" },
    { label: "Plantilla wine mapping", url: "/recursos/plantilla-wine-mapping-restaurante" },
  ],
  relatedGuides: [
    { label: "Cómo diseñar una carta rentable", url: "/blog/como-disenar-carta-vinos-rentable" },
    { label: "Cuántos vinos debe tener una carta", url: "/blog/cuantos-vinos-carta-restaurante" },
    { label: "Cómo detectar canibalización", url: "/guias/como-detectar-canibalizacion-vinos-carta" },
  ],
  ctaPrimaryText: "Analizar mi carta gratis",
  ctaPrimaryUrl: "/analisis-carta",
  ctaSecondaryText: "Solicitar demo",
  ctaSecondaryUrl: "/demo",
  ctaFinalTitle: "Winerim te dice exactamente qué vinos necesita tu carta",
  ctaFinalDescription: "Análisis de surtido, escalera de precios, detección de huecos y redundancias. Todo basado en datos reales de tu restaurante.",
};

const GuiaSurtidoTicketMedio = () => <GuideTemplate data={data} />;
export default GuiaSurtidoTicketMedio;
