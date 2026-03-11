import GuideTemplate from "@/components/templates/GuideTemplate";
import type { GuidePageData } from "@/components/templates/GuideTemplate";

const data: GuidePageData = {
  slug: "guias/como-implantar-vino-por-copa-sin-perder-margen",
  metaTitle: "Cómo Implantar Vino por Copa sin Perder Margen | Winerim",
  metaDescription: "Guía práctica para lanzar un programa de vino por copa rentable: selección, pricing, control de merma, rotación y formación del equipo de sala.",
  heroTitle: "Cómo implantar vino por copa sin perder margen",
  heroSubtitle: "El vino por copa es la mayor oportunidad de venta en restauración… y la mayor fuente de pérdida si no se gestiona bien. Esta guía te da el framework completo para hacerlo rentable desde el primer día.",
  heroBadge: "Guía operativa — Copa",
  breadcrumbParent: { label: "Guías", href: "/guias-y-recursos" },
  tableOfContents: [
    "Por qué el vino por copa es una oportunidad enorme",
    "Los 5 errores que destruyen el margen",
    "Cómo seleccionar los vinos por copa correctos",
    "Framework de pricing: la fórmula del equilibrio",
    "Control de merma: el factor invisible",
    "Checklist de lanzamiento",
  ],
  sections: [
    {
      heading: "Por qué el vino por copa es una oportunidad enorme",
      content: "El vino por copa resuelve el principal freno del cliente: el compromiso. Una copa permite explorar sin riesgo, probar el vino antes de pedir botella, y acceder a vinos que por botella quedarían fuera de su presupuesto.\n\nPara el restaurante, una oferta de copa bien diseñada puede aumentar el ticket medio un 15-25%, mejorar la rotación de stock y reducir la barrera de entrada al vino en mesas que normalmente no piden.\n\nPero la rentabilidad no viene solo de vender más copas. Viene de controlar la merma, fijar el precio correcto y rotar con inteligencia.",
      tips: [
        "El 35-45% de las mesas que no piden vino lo harían si la oferta por copa fuera más visible y atractiva.",
        "Una copa bien posicionada tiene un margen bruto superior al de la botella si la merma está controlada.",
        "Los restaurantes que mejor venden por copa no tienen más referencias, tienen mejor rotación.",
      ],
      icon: "lightbulb",
    },
    {
      heading: "Los 5 errores que destruyen el margen",
      content: "La mayoría de restaurantes que 'prueban' el vino por copa y lo abandonan cometieron al menos 2 de estos errores.",
      tips: [
        "Demasiadas referencias abiertas: tener 12 vinos por copa abiertos cuando solo se venden 6 al día genera merma insostenible. Empieza con 4-6 referencias.",
        "Pricing por intuición: poner el precio de la copa dividiendo el de la botella entre 5 sin contar merma, servicio ni rotación. La copa debe calcularse por separado.",
        "No medir la merma: sin registrar cuántas copas salen por botella y cuánto se tira, no puedes saber si ganas o pierdes.",
        "Selección estática: no cambiar los vinos por copa durante meses. La rotación frecuente genera curiosidad y reduce riesgo de stock abierto sin movimiento.",
        "Equipo no formado: si el camarero no sabe explicar por qué debería pedir una copa de ese vino concreto, la copa no se vende.",
      ],
      icon: "alert",
    },
    {
      heading: "Cómo seleccionar los vinos por copa correctos",
      content: "La selección de vinos por copa no es un mini-versión de tu carta de botellas. Es una oferta independiente con sus propios criterios de selección.\n\nCriterios de selección:\n• Versatilidad: vinos que funcionen con la mayoría de tu oferta gastronómica.\n• Resistencia a la oxidación: prioriza vinos que aguanten 2-3 días abiertos sin deterioro notable.\n• Precio de compra: el coste por copa debe permitir un multiplicador de al menos 4x.\n• Perfil accesible: al menos 2-3 copas deben ser vinos fáciles de entender para clientes no expertos.\n• Uno 'premium': siempre ten una copa aspiracional que suba el ticket medio.\n\nEstructura recomendada para empezar:\n• 1 espumoso\n• 2 blancos (uno fresco, uno con cuerpo)\n• 2-3 tintos (uno joven, uno con crianza)\n• 1 copa especial/premium rotativa",
      tips: [
        "Los vinos de screwcap o tapón técnico aguantan mejor abiertos. Considéralo en la selección.",
        "La copa rotativa 'del mes' genera narrativa, urgencia y da motivo al camarero para recomendar.",
        "Prueba cada referencia abierta durante 3 días antes de incluirla. Si al tercer día no está bien, descártala.",
      ],
      icon: "check",
    },
    {
      heading: "Framework de pricing: la fórmula del equilibrio",
      content: "El precio de la copa NO es el precio de la botella dividido entre el número de copas. Es un cálculo independiente que debe incluir merma, servicio y rotación.\n\nFórmula base:\nPVP copa = (Coste botella / copas reales por botella) × multiplicador\n\nCopas reales por botella:\n• Botella 75cl con copa de 15cl = 5 copas teóricas\n• Con merma media del 10% = 4,5 copas reales\n• En vinos que se oxidan rápido = 4 copas reales (más merma)\n\nMultiplicador recomendado:\n• Copa estándar: 4x-5x sobre coste\n• Copa premium: 3,5x-4x (el margen absoluto compensa)\n• Copa de entrada: 5x-6x (mayor volumen, menor riesgo)\n\nRegla de oro: el PVP de una copa nunca debería ser inferior al 25% del PVP de la botella, ni superior al 35%.",
      tips: [
        "Si una copa cuesta 2€ y la vendes a 8€, tu margen bruto es del 75%. Pero si tiras 1 copa por botella, el margen real baja al 60%.",
        "Revisa el pricing de copas cada mes. Un cambio de 0,50€ en coste de botella puede destruir el margen si no ajustas.",
        "Winerim calcula automáticamente el PVP óptimo por copa teniendo en cuenta merma real y rotación histórica.",
      ],
      icon: "list",
    },
    {
      heading: "Control de merma: el factor invisible",
      content: "La merma es la diferencia entre lo que deberías servir y lo que realmente sirves (o tiras). Es el factor que más restaurantes ignoran y el que más impacta en la rentabilidad del programa de copa.\n\nFuentes de merma:\n• Oxidación: vino abierto demasiado tiempo sin sistema de preservación.\n• Sobreservicio: copas que llenan más de los 15cl estándar.\n• Rotura y derrames.\n• Copas de cortesía no registradas.\n\nCómo controlarla:\n1. Mide: registra cuántas copas salen por cada botella abierta durante un mes.\n2. Compara: el estándar es 4,5 copas reales por botella de 75cl.\n3. Si estás por debajo de 4: tienes un problema de merma que hay que investigar.\n4. Invierte en preservación: un sistema Coravin o similar se amortiza en semanas si vendes copa premium.\n5. Rota: cambia los vinos por copa cada 1-2 semanas para que ninguna botella esté abierta más de 2-3 días.",
      tips: [
        "Una merma del 15% en lugar del 10% estándar puede reducir el margen bruto de copa un 8-10 puntos.",
        "El sobreservicio es la causa más común de merma en España. Forma al equipo con vasos medidores o marcas en la copa.",
        "Registra las copas de cortesía como gasto de marketing. Si no se registran, no se controlan.",
      ],
      icon: "alert",
    },
    {
      heading: "Checklist de lanzamiento",
      content: "Un programa de vino por copa rentable se lanza en 3 semanas si sigues estos pasos.",
      tips: [
        "Semana 1: Define la selección (4-6 referencias), calcula pricing con la fórmula y prepara fichas de producto para el equipo.",
        "Semana 2: Forma al equipo (15 min/día durante 5 días). Cada día practican la recomendación de 1 copa.",
        "Semana 3: Lanzamiento con seguimiento diario de copas servidas por botella y ventas por referencia.",
        "Mes 1: Revisión completa — qué funciona, qué no rota, qué merma hay. Ajusta selección y pricing.",
        "Regla de salida: si una referencia vende menos de 3 copas por semana, sustitúyela.",
        "Objetivo mes 3: proceso estabilizado con merma < 12%, rotación semanal y equipo autónomo.",
      ],
      icon: "list",
    },
  ],
  faqs: [
    { q: "¿Cuántas copas por copa debo ofrecer para empezar?", a: "Entre 4 y 6 referencias. Es suficiente para cubrir perfiles (espumoso, blanco, tinto, premium) sin generar merma inmanejable." },
    { q: "¿El vino por copa canibaliza la venta de botellas?", a: "No, la complementa. Los datos muestran que las mesas que empiezan con una copa piden más vino (copa adicional o botella) que las que no piden nada." },
    { q: "¿Necesito un sistema de preservación como Coravin?", a: "No es obligatorio para empezar, pero sí muy recomendable si quieres ofrecer copas premium (+15€). Se amortiza en 2-4 semanas con copas de alta gama." },
    { q: "¿Cada cuánto debo rotar los vinos por copa?", a: "La copa estándar cada 2-4 semanas. La copa especial/premium puede ser semanal. La rotación genera narrativa y reduce riesgo de merma." },
  ],
  relatedTools: [
    { label: "Calculadora de precio por copa", url: "/herramientas/calculadora-precio-vino-por-copa" },
    { label: "Diagnóstico de vino por copa", url: "/herramientas/diagnostico-vino-por-copa" },
  ],
  relatedGuides: [
    { label: "Estrategia rentable de vino por copa", url: "/guias/como-fijar-estrategia-rentable-vino-por-copa" },
    { label: "Cómo detectar canibalización entre vinos", url: "/guias/como-detectar-canibalizacion-vinos-carta" },
    { label: "Formar al equipo de sala en vino", url: "/guias/como-formar-equipo-sala-para-vender-vino" },
  ],
  ctaPrimaryText: "Solicitar demo",
  ctaPrimaryUrl: "/demo",
  ctaSecondaryText: "Analizar mi carta",
  ctaSecondaryUrl: "/analisis-carta",
  ctaFinalTitle: "Winerim optimiza tu programa de copa automáticamente",
  ctaFinalDescription: "Pricing dinámico, control de merma, alertas de rotación y recomendaciones de selección basadas en datos reales de tu restaurante.",
};

const GuiaVinoPorCopaSinPerderMargen = () => <GuideTemplate data={data} />;
export default GuiaVinoPorCopaSinPerderMargen;
