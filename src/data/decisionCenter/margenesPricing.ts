import { DollarSign } from "lucide-react";

export type SubTopicPriority = "inmediato" | "esta semana" | "este mes" | "seguimiento";

export interface SubTopic {
  id: string;
  title: string;
  priority?: SubTopicPriority;
  queSignifica: string;
  porQueImporta: string;
  queHacer: string[];
  errores: { mistake: string; consequence: string }[];
  porQueTeLoMostramos?: {
    detected: string;
    whyMatters: string;
    riskIfIgnored: string;
  };
}

export interface DeepAreaContent {
  name: string;
  tagline: string;
  intro: string;
  icon: typeof DollarSign;
  accent: string;
  bg: string;
  subtopics: SubTopic[];
  links: { label: string; href: string; description: string }[];
}

const margenesPricingContent: DeepAreaContent = {
  name: "Márgenes y pricing",
  tagline: "Entiende la rentabilidad real de cada vino y actúa con criterio",
  intro: "Esta sección te ayuda a interpretar todos los indicadores de margen, pricing y rentabilidad que Winerim te muestra. No necesitas ser financiero: necesitas saber qué mirar, por qué importa y qué hacer con cada dato.",
  icon: DollarSign,
  accent: "text-amber-500",
  bg: "bg-amber-500/10",
  links: [
    { label: "Calculadora de márgenes", href: "/calculadora-margen-vino", description: "Calcula el margen real de cualquier referencia en segundos" },
    { label: "Plantilla: Revisión mensual de márgenes", href: "/recursos/plantilla-revision-mensual-margenes", description: "Proceso mensual para detectar desviaciones y oportunidades" },
    { label: "Recurso: Análisis de márgenes", href: "/recursos/scorecard-mensual", description: "Scorecard para monitorizar la salud de tu pricing" },
    { label: "Winerim Core", href: "/producto/winerim-core", description: "El motor analítico que automatiza todo esto por ti" },
    { label: "Blog: 7 errores al fijar precios", href: "/article/errores-fijar-precios-vino-restaurante", description: "Los errores de pricing más frecuentes y cómo evitarlos" },
    { label: "Blog: Palancas para mejorar margen", href: "/article/palancas-mejorar-margen-vino-sin-rehacer-carta", description: "Cómo mejorar el margen sin rehacer la carta de vinos" },
    { label: "Blog: Métricas F&B de vino", href: "/article/metricas-fb-vino-restaurante", description: "Las métricas que todo F&B debería monitorizar" },
  ],
  subtopics: [
    {
      id: "margen-bruto",
      title: "Qué es el margen bruto",
      priority: "esta semana",
      porQueTeLoMostramos: {
        detected: "Winerim ha calculado el margen bruto de cada referencia de tu carta cruzando PVP con coste de compra real.",
        whyMatters: "Si no distingues entre margen porcentual y contribución absoluta, puedes estar empujando los vinos equivocados.",
        riskIfIgnored: "Sigues promocionando vinos que parecen rentables por porcentaje pero que en euros te dejan menos que otros que ni miras.",
      },
      queSignifica:
        "El margen bruto es la diferencia entre lo que cobras por un vino y lo que te cuesta comprarlo. Se expresa en euros (contribución) o en porcentaje. Es la métrica más básica de rentabilidad, pero no la única que importa. Un vino con un 60% de margen puede dejarte menos dinero real que otro con un 45%, si el segundo se vende al doble de precio.",
      porQueImporta:
        "Porque es el punto de partida de cualquier decisión de pricing. Si no conoces tu margen bruto por referencia, estás tomando decisiones a ciegas. Y si solo miras el porcentaje sin ver la contribución absoluta, puedes estar promocionando los vinos equivocados.",
      queHacer: [
        "Calcula el margen bruto en euros y en porcentaje de tus 10 referencias más vendidas.",
        "Ordénalas por contribución absoluta (€), no por porcentaje.",
        "Compara: ¿tus vinos más vendidos son también los que más margen dejan?",
        "Si no lo son, tienes una oportunidad de repricing inmediata.",
      ],
      errores: [
        { mistake: "Mirar solo el porcentaje de margen", consequence: "Un vino de 8 € con 65% de margen deja 5,20 €. Uno de 25 € con 50% deja 12,50 €. El segundo es mejor negocio." },
        { mistake: "Calcular el margen sobre PVP en vez de sobre coste", consequence: "Te engañas con un número más alto que no refleja lo que realmente ganas." },
        { mistake: "No actualizar el coste tras cambios del proveedor", consequence: "Tu margen teórico ya no existe: vendes creyendo que ganas, pero no." },
      ],
    },
    {
      id: "margen-sano",
      title: "Qué margen es sano",
      priority: "este mes",
      porQueTeLoMostramos: {
        detected: "Winerim ha comparado tu multiplicador medio ponderado con el benchmark de tu segmento.",
        whyMatters: "Si estás por debajo del rango saludable, tienes un problema estructural que no se arregla vendiendo más.",
        riskIfIgnored: "Cada mes que pasa con el margen desalineado, pierdes rentabilidad acumulada que ya no puedes recuperar.",
      },
      queSignifica:
        "No hay un margen universal 'correcto'. Depende de tu segmento, tu ticket medio, tu volumen y tu estructura de costes. Pero hay referencias de mercado: la mayoría de restaurantes rentables operan con un multiplicador medio entre ×2.5 y ×3.5 sobre coste, lo que equivale a márgenes brutos del 60-72%. Lo importante no es un número fijo, sino que tu margen medio ponderado por ventas esté en línea con tu modelo de negocio.",
      porQueImporta:
        "Porque si tu margen medio está por debajo del benchmark de tu segmento, tienes un problema estructural que no se arregla vendiendo más. Y si está muy por encima, podrías estar perdiendo competitividad y volumen sin saberlo.",
      queHacer: [
        "Calcula tu multiplicador medio ponderado por ventas (no por referencia).",
        "Compara con el benchmark de tu segmento: casual (×2.5-3), gastronómico (×2-2.5), hotel (×3-4).",
        "Si estás por debajo, identifica las referencias que bajan la media.",
        "Si estás por encima, evalúa si tu volumen de copa y botella es el esperado.",
      ],
      errores: [
        { mistake: "Aplicar un multiplicador único a toda la carta", consequence: "Pierdes margen en los vinos baratos y eres poco competitivo en los caros." },
        { mistake: "Comparar tu margen con el de otro segmento", consequence: "Un hotel tiene estructura de costes distinta a un bistró. No son comparables." },
        { mistake: "No ponderar por ventas", consequence: "Tu media de margen parece buena, pero los vinos que más vendes son los peores en margen." },
      ],
    },
    {
      id: "referencias-mal-calibradas",
      title: "Cómo detectar referencias mal calibradas",
      porQueTeLoMostramos: {
        detected: "Winerim ha identificado referencias cuyo precio no cuadra con su coste, su posición en carta o su papel comercial.",
        whyMatters: "Una sola referencia mal calibrada en tu top 5 puede costarte miles de euros al año sin que lo notes.",
        riskIfIgnored: "El impacto se acumula día a día y solo lo ves cuando cierras el trimestre y el margen no da.",
      },
      queSignifica:
        "Una referencia mal calibrada es un vino cuyo precio no refleja su coste real, su posición en carta o su papel comercial. Puede estar demasiado barato (pierdes margen), demasiado caro (no rota) o mal posicionado frente a otros vinos de la misma franja.",
      porQueImporta:
        "Porque una sola referencia mal calibrada en tu top 5 de ventas puede costarte miles de euros al año. Y si tienes varias, el impacto se acumula sin que sea visible en el día a día.",
      queHacer: [
        "Cruza tus 10 referencias más vendidas con su margen: busca las que más venden y menos dejan.",
        "Identifica referencias con multiplicador < ×2 o > ×4.5 (ambos extremos son señales de alerta).",
        "Revisa si hay vinos con precio idéntico pero coste muy distinto: uno de ellos está mal calibrado.",
        "Corrige al menos una referencia esta semana y mide el impacto en 30 días.",
      ],
      errores: [
        { mistake: "Asumir que si se vende bien, el precio está bien", consequence: "Un vino puede vender mucho precisamente porque está demasiado barato." },
        { mistake: "No revisar tras cambios de coste del proveedor", consequence: "El margen desaparece sin que lo notes hasta el cierre del mes." },
        { mistake: "Calibrar solo por coste, sin considerar la percepción del cliente", consequence: "Un repricing agresivo puede romper la confianza del comensal habitual." },
      ],
    },
    {
      id: "cuando-subir-precio",
      title: "Cuándo subir precio",
      porQueTeLoMostramos: {
        detected: "Winerim ha detectado referencias con alto volumen de venta pero margen por debajo de la media de tu carta.",
        whyMatters: "Son candidatas claras a una subida de 1-2 € que rara vez impacta en la demanda pero mejora tu resultado cada día.",
        riskIfIgnored: "Cada servicio que pasa sin corregir el precio es margen que pierdes y que ya no puedes recuperar.",
      },
      queSignifica:
        "Subir precio no es siempre la respuesta, pero a menudo es la acción más directa para mejorar la rentabilidad. El momento adecuado para hacerlo es cuando tienes datos que lo justifican: un margen por debajo del benchmark, un coste que ha subido, una referencia que vende bien con margen bajo, o una franja de precio donde no tienes competencia interna.",
      porQueImporta:
        "Porque muchos restaurantes evitan subir precios por miedo a perder clientes, pero la realidad es que subidas de 1-2 € en referencias estratégicas rara vez impactan en la demanda. En cambio, no subir cuando deberías te cuesta margen todos los días.",
      queHacer: [
        "Identifica las 3 referencias con mayor volumen de venta y margen por debajo de la media.",
        "Evalúa una subida de 1-2 € y calcula el impacto anual (volumen × incremento).",
        "Comprueba que el nuevo precio no entre en conflicto con otra referencia de la misma franja.",
        "Implementa el cambio y revisa ventas a los 30 días. Si el volumen no cae, el precio era correcto.",
      ],
      errores: [
        { mistake: "Subir todos los precios a la vez", consequence: "El comensal habitual nota el cambio y la percepción de valor se resiente." },
        { mistake: "No subir nunca por miedo a la reacción", consequence: "Tu margen se erosiona año a año mientras los costes suben." },
        { mistake: "Subir sin comprobar la franja competitiva", consequence: "Creas un hueco de precio o un solapamiento que no existía." },
      ],
    },
    {
      id: "cuando-revisar-compra",
      title: "Cuándo revisar la compra",
      porQueTeLoMostramos: {
        detected: "Winerim ha detectado referencias con margen bajo cuyo coste de compra ha subido respecto al histórico.",
        whyMatters: "Cada euro que ahorras en compra es margen directo, invisible para el cliente pero muy visible en tu cuenta de resultados.",
        riskIfIgnored: "Sigues pagando más de lo que deberías por lealtad al proveedor, no por valor recibido.",
      },
      queSignifica:
        "Un margen bajo no siempre se arregla subiendo el precio. A veces el problema es que estás comprando caro. Revisar la compra significa comprobar si el coste de adquisición de una referencia sigue siendo competitivo, si hay alternativas más baratas con calidad equivalente, o si puedes negociar mejores condiciones.",
      porQueImporta:
        "Porque cada euro que ahorras en compra es un euro de margen directo. Y a diferencia de subir precio (que el cliente ve), mejorar la compra es invisible para el comensal pero muy visible en tu cuenta de resultados.",
      queHacer: [
        "Identifica las referencias con margen bajo y revisa su historial de coste: ¿ha subido?",
        "Solicita al menos 2 presupuestos alternativos para esas referencias.",
        "Negocia con tu proveedor actual usando los precios de mercado como palanca.",
        "Si la diferencia es >10%, plantea el cambio o usa la negociación para obtener mejores condiciones.",
      ],
      errores: [
        { mistake: "No revisar costes porque 'siempre compras al mismo'", consequence: "Pagas más de lo necesario por lealtad, no por valor recibido." },
        { mistake: "Comparar solo precio sin valorar servicio y condiciones", consequence: "Un proveedor barato pero poco fiable te cuesta más a largo plazo." },
        { mistake: "No conectar margen bajo con origen de compra", consequence: "Buscas la solución en el PVP cuando el problema está en el coste." },
      ],
    },
    {
      id: "cuando-revisar-copeo",
      title: "Cuándo revisar el copeo",
      porQueTeLoMostramos: {
        detected: "Winerim ha detectado referencias por copa cuyo margen real difiere significativamente del margen teórico.",
        whyMatters: "La copa puede ser tu mejor palanca de margen o tu mayor fuente de pérdida invisible. Un error de 0,50 € por copa en 20 copas semanales son +500 €/año perdidos.",
        riskIfIgnored: "Sigues sirviendo copas a precio deficitario sin saberlo, porque nunca cruzaste el dato de merma con el de pricing.",
      },
      queSignifica:
        "Si una referencia tiene margen bajo y se sirve por copa, el problema puede estar en el copeo: precio de copa mal calculado, merma no contabilizada o rotación insuficiente. El copeo multiplica los errores de pricing porque cada botella se divide en 4-6 servicios, y cualquier desviación se repite en cada copa.",
      porQueImporta:
        "Porque la copa puede ser tu mayor palanca de margen (hasta ×3 sobre botella) o tu mayor fuente de pérdida invisible. Un error de 0,50 € por copa, multiplicado por 20 copas semanales, son más de 500 € al año perdidos en una sola referencia.",
      queHacer: [
        "Recalcula el precio de copa incluyendo merma real (usa mínimo un 20-25% de pérdida).",
        "Compara el margen por copa con el margen por botella de la misma referencia.",
        "Si la copa no da más margen que la botella, o estás mal de precio o estás perdiendo por merma.",
        "Revisa si la referencia por copa tiene rotación suficiente para terminar la botella en 24-48h.",
      ],
      errores: [
        { mistake: "Dividir el precio de la botella entre 5 para fijar el de la copa", consequence: "No cubres merma, servicio ni margen. Vendes a pérdida sin saberlo." },
        { mistake: "No medir la merma real de cada referencia por copa", consequence: "Tu margen teórico y tu margen real pueden diferir un 30% o más." },
        { mistake: "Mantener copas con baja rotación 'porque quedan bien en carta'", consequence: "Cada botella abierta que no se termina es dinero tirado." },
      ],
    },
    {
      id: "revision-mensual",
      title: "Cómo leer una revisión mensual de márgenes",
      porQueTeLoMostramos: {
        detected: "Winerim genera automáticamente una comparativa mensual de márgenes para que detectes desviaciones antes de que se acumulen.",
        whyMatters: "Los proveedores suben precios, la merma varía por temporada y la demanda cambia. Sin revisión mensual, acumulas sorpresas.",
        riskIfIgnored: "Las desviaciones se suman silenciosamente y solo las ves cuando el trimestre cierra peor de lo esperado.",
      },
      queSignifica:
        "La revisión mensual de márgenes es el proceso de comprobar, cada mes, si tu carta sigue siendo rentable. Incluye comparar márgenes actuales con los del mes anterior, detectar desviaciones de coste, identificar referencias que han cambiado de rendimiento y decidir ajustes. No es un informe: es un proceso de decisión recurrente.",
      porQueImporta:
        "Porque los márgenes cambian sin que hagas nada. Los proveedores suben precios, la demanda varía, las copas generan merma distinta según temporada. Si no revisas cada mes, acumulas desviaciones que al final del trimestre se convierten en sorpresas desagradables.",
      queHacer: [
        "Reserva 1 hora al mes para revisar márgenes. Ponlo en calendario como rutina operativa.",
        "Compara el margen medio ponderado de este mes vs. el anterior. ¿Ha subido o bajado?",
        "Identifica las 3 referencias con mayor caída de margen y busca la causa (coste, volumen, merma).",
        "Toma al menos 1 decisión de ajuste por revisión: repricing, cambio de copa, negociación con proveedor.",
      ],
      errores: [
        { mistake: "No hacer revisión mensual porque 'no hay tiempo'", consequence: "Las desviaciones se acumulan y solo las ves cuando ya son un problema grave." },
        { mistake: "Revisar solo el margen medio global", consequence: "El promedio puede estar bien mientras 5 referencias están en rojo." },
        { mistake: "Revisar sin tomar ninguna decisión concreta", consequence: "La revisión se convierte en un ejercicio teórico que no cambia nada." },
      ],
    },
  ],
};

export default margenesPricingContent;
