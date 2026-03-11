import GuideTemplate from "@/components/templates/GuideTemplate";
import type { GuidePageData } from "@/components/templates/GuideTemplate";

const data: GuidePageData = {
  slug: "guias/como-usar-datos-para-decidir-que-vinos-comprar",
  metaTitle: "Cómo Usar Datos para Decidir Qué Vinos Comprar | Guía",
  metaDescription: "Guía para tomar decisiones de compra de vinos basadas en datos: rotación, márgenes, estacionalidad, tendencias y rendimiento por referencia.",
  heroTitle: "Cómo usar datos para decidir qué vinos comprar",
  heroSubtitle: "Comprar vino basándose en la intuición, las ferias o las recomendaciones del distribuidor genera acumulación de stock. Comprar con datos genera rotación, margen y una carta que evoluciona.",
  heroBadge: "Guía analítica",
  breadcrumbParent: { label: "Guías", href: "/guias-y-recursos" },
  ctaPrimaryText: "Solicitar demo",
  ctaPrimaryUrl: "/demo",
  ctaSecondaryText: "Analizar mi carta",
  ctaSecondaryUrl: "/analisis-carta",
  ctaFinalTitle: "Compra con inteligencia, no con intuición",
  ctaFinalDescription: "Winerim analiza tus datos de venta, rotación y margen para recomendarte exactamente qué vinos comprar, cuánto comprar y cuándo hacerlo.",
  tableOfContents: [
    "Por qué la intuición no basta para comprar vino",
    "Los 5 datos que deberías mirar antes de cada compra",
    "Cómo analizar el rendimiento de tu carta actual",
    "Criterios de entrada para nuevas referencias",
    "Cuánto comprar: la regla del stock óptimo",
    "El ciclo de compra basado en datos",
  ],
  sections: [
    {
      heading: "1. Por qué la intuición no basta para comprar vino",
      content: "Las decisiones de compra de vino en restauración suelen basarse en tres fuentes: las ferias donde el sumiller prueba y compra por impulso, las visitas del distribuidor que empuja su catálogo, y la inercia de seguir comprando lo mismo.\n\nNinguna de estas fuentes tiene en cuenta lo más importante: qué está funcionando realmente en tu carta y qué no.\n\nEl resultado habitual es una bodega con referencias que se compraron por entusiasmo pero no encajan con la demanda real del restaurante.",
      tips: [
        "Las ferias de vino generan compras emocionales: el contexto de cata (sin comida, sin presión de servicio) no refleja la realidad del restaurante",
        "El distribuidor tiene incentivos propios: su recomendación prioriza su catálogo, no tu carta",
        "La inercia genera complacencia: seguir comprando los mismos vinos sin evaluar su rendimiento actual",
        "El dato clave que nadie mira: ¿cuántas de las últimas 10 referencias nuevas que compraste siguen en carta y rotando?",
      ],
      icon: "alert",
    },
    {
      heading: "2. Los 5 datos que deberías mirar antes de cada compra",
      content: "Antes de hacer cualquier pedido, consulta estos cinco indicadores. Te toma 15 minutos y puede ahorrarte miles de euros en stock mal comprado.",
      tips: [
        "Dato 1 — Rotación por referencia: ¿cuántas unidades vendes al mes de cada vino? Las referencias que venden menos de 2 unidades/mes probablemente no justifican recompra",
        "Dato 2 — Margen por referencia: no solo el margen %, sino el margen absoluto en euros. Un vino de entrada con margen 75% pero 3€ de beneficio aporta menos que un premium con 55% y 12€",
        "Dato 3 — Stock actual: ¿cuántas unidades tienes en bodega? No compres más de lo que puedes vender en 60-90 días",
        "Dato 4 — Tendencia de ventas: ¿la referencia va a más o a menos? Un vino que vendía 10 unidades/mes y ahora vende 4 necesita un diagnóstico, no más stock",
        "Dato 5 — Huecos en la carta: ¿hay un rango de precio, estilo o tipología sin cubrir? Las compras deberían tapar huecos, no duplicar lo que ya tienes",
      ],
      icon: "list",
    },
    {
      heading: "3. Cómo analizar el rendimiento de tu carta actual",
      content: "Antes de comprar nuevo, evalúa lo que ya tienes. Un análisis trimestral de rendimiento te dice exactamente dónde estás y qué necesitas.",
      tips: [
        "Clasifica cada referencia en 4 categorías: estrella (alta rotación + alto margen), vaca (alta rotación + bajo margen), potencial (baja rotación + alto margen), lastre (baja rotación + bajo margen)",
        "Las estrellas: protégelas. Asegura stock suficiente y negocia mejores condiciones con el proveedor",
        "Las vacas: optimiza su pricing. Si venden bien con margen bajo, probablemente aguanten un ligero incremento de precio",
        "Las de potencial: investiga por qué no rotan. ¿Mal posicionadas? ¿Precio alto? ¿El equipo no las conoce? Algunas pueden convertirse en estrellas con apoyo",
        "Los lastres: candidatos a retirar. No compres más y planifica su salida",
        "Esta clasificación se llama análisis BCG aplicado a vinos — es la base de las decisiones de compra inteligentes",
      ],
      icon: "lightbulb",
    },
    {
      heading: "4. Criterios de entrada para nuevas referencias",
      content: "Cada referencia nueva que entra en la carta debería pasar un filtro mínimo. No para limitar la creatividad, sino para evitar compras que generen stock muerto.",
      tips: [
        "¿Qué función cumple? Cada vino debe llenar un hueco: un rango de precio vacío, un estilo ausente, un maridaje no cubierto, o una referencia que sustituye a un lastre",
        "¿A qué referencia sustituye o complementa? La regla 'uno entra, uno sale' previene la inflación de la carta",
        "¿Qué margen ofrece? Calcula el margen antes de decidir el PVP. Si el margen no es viable dentro de tu estructura, el vino no encaja",
        "¿Cuánto comprar? Máximo 6-12 unidades iniciales. Si funciona, recompras en 30-60 días. Si no, la pérdida es mínima",
        "¿El equipo lo puede vender? Si necesita una explicación de 3 minutos para entenderse, tu equipo no lo va a recomendar",
        "¿Encaja con la cocina actual? Verifica que marida con al menos 2-3 platos del menú vigente",
      ],
      icon: "check",
    },
    {
      heading: "5. Cuánto comprar: la regla del stock óptimo",
      content: "La sobrecompra es la causa número uno del stock muerto. La regla del stock óptimo te dice exactamente cuántas unidades necesitas de cada referencia.\n\nStock óptimo = Venta mensual × meses de cobertura deseados + stock de seguridad.\n\nPara la mayoría de referencias, 60-90 días de cobertura son suficientes. Para vinos de alta rotación, puedes ir a 30-45 días si el proveedor tiene disponibilidad constante.",
      tips: [
        "Referencia nueva: máximo 6-12 unidades. No compres más hasta validar la rotación en 60-90 días",
        "Referencia consolidada (vende 8+ unidades/mes): mantén stock para 60-90 días de venta",
        "Referencia estrella (vende 15+ unidades/mes): negocia entregas mensuales automáticas con el proveedor",
        "Referencia lenta (vende < 3 unidades/mes): mantén stock máximo para 30 días. Evalúa si justifica su presencia",
        "No te dejes tentar por descuentos por volumen si el resultado es tener 12 meses de stock de una referencia",
        "Revisa los niveles de stock quincenal o mensualmente según el volumen de tu negocio",
      ],
      icon: "lightbulb",
    },
    {
      heading: "6. El ciclo de compra basado en datos",
      content: "La compra de vino no debería ser un evento puntual ni una reacción a la visita del distribuidor. Debería ser un ciclo planificado basado en datos actualizados.",
      tips: [
        "Semana 1 del mes: revisar el scorecard de rendimiento del mes anterior. Identificar estrellas, lastres y tendencias",
        "Semana 2: revisar niveles de stock y rotación. Identificar referencias que necesitan recompra y referencias que necesitan decisión (mover, promover o retirar)",
        "Semana 3: hacer los pedidos basándose en los datos anteriores. Priorizar: primero las estrellas, luego las vacas, luego las referencias nuevas que cubren huecos",
        "Semana 4: recibir, ubicar y comunicar al equipo. Si hay referencias nuevas, preparar las fichas y la sesión de formación",
        "Este ciclo mensual convierte la compra de vinos de una actividad reactiva a un proceso profesional y predecible",
      ],
      icon: "list",
    },
  ],
  faqs: [
    { q: "¿Qué datos necesito para empezar?", a: "Como mínimo: ventas por referencia (tu TPV debería darlo), stock actual en bodega y precios de compra. Con estos tres datos puedes calcular rotación, margen y capital inmovilizado." },
    { q: "¿Qué hago si mi TPV no da datos por referencia de vino?", a: "Empieza con un registro manual en una hoja de cálculo. Registra cada venta de vino con nombre, formato (copa/botella) y fecha. En 30 días tendrás datos suficientes para tomar mejores decisiones." },
    { q: "¿Debería dejar de ir a ferias de vino?", a: "No. Las ferias son útiles para descubrir y probar. Pero separa la cata de la compra: apunta los vinos que te interesan y después aplica los criterios de entrada antes de comprar." },
    { q: "¿Cada cuánto debería hacer el análisis de rendimiento?", a: "Trimestralmente como mínimo. Mensualmente si tu carta tiene más de 80 referencias. El scorecard mensual de Winerim lo genera automáticamente." },
  ],
  relatedTools: [
    { label: "Calculadora de margen de vino", url: "/calculadora-margen-vino" },
    { label: "Calculadora de stock muerto", url: "/herramientas/calculadora-stock-muerto" },
    { label: "Wine List Score", url: "/herramientas/wine-list-score" },
  ],
  relatedGuides: [
    { label: "Scorecard mensual de rendimiento", url: "/recursos/scorecard-rendimiento-carta" },
    { label: "Plantilla de análisis de márgenes", url: "/recursos/plantilla-analisis-margenes" },
    { label: "Playbook: decidir compras con datos", url: "/benchmarks-playbooks/playbook-decidir-compras-datos" },
    { label: "Cómo detectar vinos muertos", url: "/guias/como-detectar-vinos-muertos-referencias-frenan-rentabilidad" },
  ],
};

const GuiaUsarDatosCompra = () => <GuideTemplate data={data} />;
export default GuiaUsarDatosCompra;
