import { BarChart3 } from "lucide-react";
import type { DeepAreaContent } from "./margenesPricing";

const cartaEquilibrioContent: DeepAreaContent = {
  name: "Carta y equilibrio",
  tagline: "Tu carta debe contar una historia coherente",
  intro: "Esta sección te ayuda a evaluar si tu carta tiene la estructura adecuada para vender, no solo para impresionar. Equilibrar una carta no es tener 'un poco de todo': es que cada referencia tenga un rol claro. Especialmente en cartas amplias y complejas —a partir de 250 referencias— el equilibrio deja de ser una cuestión estética y se convierte en una decisión estratégica que impacta directamente en ventas, stock y experiencia de mesa.",
  icon: BarChart3,
  accent: "text-wine",
  bg: "bg-wine/10",
  links: [
    { label: "Plantilla wine mapping", href: "/recursos/plantilla-wine-mapping-restaurante", description: "Mapea tu carta por tipo, precio, origen y rol comercial" },
    { label: "Plantilla equilibrio de carta", href: "/recursos/plantilla-equilibrio-carta", description: "Diagnostica saturaciones, huecos y canibalización por franja" },
    { label: "Checklist carta rentable", href: "/recursos/checklist-carta-rentable", description: "Comprueba si tu carta cumple los criterios de una carta que vende" },
    { label: "Winerim Core", href: "/producto/winerim-core", description: "El motor analítico que evalúa el equilibrio de tu carta automáticamente" },
    { label: "Blog: ¿Tu carta está descompensada?", href: "/article/como-saber-si-carta-vinos-esta-descompensada", description: "Diagnóstico rápido para detectar desequilibrios en tu carta" },
    { label: "Blog: ¿Tu carta es demasiado larga?", href: "/article/cuando-carta-vinos-es-demasiado-larga", description: "Señales de exceso de referencias y cómo actuar" },
  ],
  subtopics: [
    {
      id: "carta-descompensada",
      title: "Cómo saber si una carta está descompensada",
      priority: "esta semana",
      porQueTeLoMostramos: { detected: "Winerim ha mapeado la distribución de tu carta por tipo, precio y origen, y ha encontrado zonas de saturación y huecos.", whyMatters: "Una carta descompensada pierde ventas (el comensal no encuentra lo que busca), canibaliza margen y acumula stock donde hay exceso.", riskIfIgnored: "Cada referencia nueva que añades sin criterio descompensa más la carta y amplifica el problema." },
      queSignifica:
        "Una carta descompensada es aquella donde la distribución de referencias no refleja lo que tu cliente realmente pide. Puede ser un exceso de tintos y casi ningún espumoso, una concentración exagerada en una franja de precio, o un 40% de la carta dedicada a una sola región. La descompensación no se ve a simple vista: se detecta cuando mapeas la carta por variables y comparas con tus datos de venta.",
      porQueImporta:
        "Porque una carta descompensada genera tres problemas a la vez: el comensal no encuentra lo que busca (pérdida de venta), las referencias saturadas se canibalizan entre sí (pérdida de margen) y acumulas stock en las zonas con exceso (capital inmovilizado). En cartas amplias —a partir de 250 referencias— la descompensación se amplifica exponencialmente.",
      queHacer: [
        "Mapea tu carta por tipo de vino (tinto, blanco, rosado, espumoso, generoso) y calcula el % de cada uno.",
        "Cruza esa distribución con tus datos de venta: ¿el 70% de tu carta es tinto pero el 40% de tus ventas son blancos?",
        "Identifica las 3 categorías más saturadas y las 2 más vacías. Ahí están tus oportunidades.",
        "Establece una distribución objetivo coherente con tu concepto y revísala cada trimestre.",
      ],
      errores: [
        { mistake: "Asumir que la carta está equilibrada porque 'tiene de todo'", consequence: "Tener de todo no es equilibrio. Puede que tengas 60 tintos y 4 blancos." },
        { mistake: "Equilibrar por número de referencias sin mirar ventas", consequence: "Puedes tener 20 espumosos y vender 2. El equilibrio debe reflejar la demanda." },
        { mistake: "No revisar el equilibrio tras añadir nuevas referencias", consequence: "Cada alta sin criterio descompensa la carta un poco más." },
      ],
    },
    {
      id: "exceso-huecos-precio",
      title: "Exceso y huecos por rango de precio",
      priority: "esta semana",
      porQueTeLoMostramos: { detected: "Winerim ha analizado la distribución de tus referencias por franja de precio y ha encontrado zonas saturadas y franjas vacías.", whyMatters: "El precio es el primer filtro del comensal. Saturar una franja genera canibalización; dejar huecos pierde ventas que nunca ves.", riskIfIgnored: "Sigues saturando franjas donde ya compites contigo mismo mientras el cliente que busca algo diferente se va sin pedir." },
      queSignifica:
        "Los rangos de precio son las franjas en las que se distribuyen tus referencias: 10-15 €, 15-25 €, 25-40 €, etc. Un exceso en una franja significa que tienes demasiadas referencias compitiendo por el mismo comensal en el mismo rango. Un hueco significa que hay una franja donde el cliente busca y no encuentra. Ambos son problemas, pero el exceso es más caro (genera canibalización y stock) y el hueco es más invisible (pierdes ventas que nunca ves).",
      porQueImporta:
        "Porque el precio es el primer filtro del comensal. Si tu carta tiene 15 tintos entre 18 y 22 € y ninguno entre 30 y 40 €, estás saturando al cliente indeciso en una franja y perdiendo al que busca algo especial. En cartas amplias, este efecto se multiplica: cada franja saturada es un nido de canibalización.",
      queHacer: [
        "Divide tu carta en franjas de precio (ej. <15€, 15-25€, 25-40€, 40-60€, >60€) y cuenta referencias en cada una.",
        "Identifica las franjas con más de 10 referencias del mismo tipo: ahí hay saturación.",
        "Busca franjas vacías o con menos de 2 opciones: ahí tienes un hueco que cubrir.",
        "Compara la distribución de precios con tu ticket medio de vino: ¿la mayoría de tus opciones está en la franja que tu cliente elige?",
      ],
      errores: [
        { mistake: "No tener visibilidad de la distribución por franjas de precio", consequence: "No sabes dónde estás saturado ni dónde tienes huecos hasta que un comensal te lo dice." },
        { mistake: "Añadir referencias sin comprobar en qué franja caen", consequence: "Cada referencia nueva que cae en una franja saturada empeora el problema." },
        { mistake: "Cubrir un hueco con un vino que no encaja en el concepto", consequence: "Tener algo en esa franja no es suficiente: tiene que ser coherente con tu restaurante." },
      ],
    },
    {
      id: "equilibrio-estilos",
      title: "Equilibrio por estilos",
      priority: "este mes",
      porQueTeLoMostramos: { detected: "Winerim ha clasificado tu carta por perfil organoléptico y ha detectado concentración excesiva en ciertos estilos.", whyMatters: "Si todos tus tintos son potentes o todos tus blancos afrutados, limitas tu mercado potencial a un solo tipo de paladar.", riskIfIgnored: "Pierdes al comensal que quiere algo diferente. Y nunca lo sabrás, porque no pide: simplemente elige otra cosa o no pide vino." },
      queSignifica:
        "Más allá de tinto/blanco/rosado, el equilibrio por estilos mira la diversidad de perfiles organolépticos: ¿tienes vinos ligeros y frescos además de potentes? ¿Hay opciones jóvenes además de crianzas? ¿Tu carta ofrece variedad de uvas y elaboraciones, o todo suena parecido? El equilibrio por estilos determina si tu carta cubre la amplitud de gustos de tu clientela o si habla solo de un tipo de paladar.",
      porQueImporta:
        "Porque el comensal no elige solo por tipo y precio: elige por lo que le apetece. Si todos tus tintos son potentes y con madera, pierdes al que quiere algo ligero. Si todos tus blancos son afrutados, pierdes al que busca mineralidad. Un buen equilibrio de estilos maximiza la probabilidad de que cada comensal encuentre algo que le encaje.",
      queHacer: [
        "Clasifica tus referencias por perfil: ligero/medio/potente, joven/crianza/reserva, aromático/mineral/estructurado.",
        "Comprueba si tienes opciones en cada cuadrante o si todo se concentra en un perfil.",
        "Pregunta al equipo de sala: ¿hay peticiones que no pueden cubrir con la carta actual?",
        "Si el 80% de tu carta tiene un perfil similar, estás limitando tu mercado potencial.",
      ],
      errores: [
        { mistake: "Diseñar la carta según los gustos del sumiller o del chef", consequence: "Tu carta satisface a quien la crea, pero puede estar ignorando al 60% de tus comensales." },
        { mistake: "Confundir variedad de bodegas con variedad de estilos", consequence: "20 bodegas diferentes pueden producir vinos muy parecidos si son de la misma zona y uva." },
        { mistake: "No adaptar los estilos a la cocina del restaurante", consequence: "Una carta llena de tintos potentes en un restaurante de cocina ligera genera disonancia." },
      ],
    },
    {
      id: "equilibrio-origen",
      title: "Equilibrio por origen",
      porQueTeLoMostramos: { detected: "Winerim ha analizado la distribución de tu carta por denominación y origen y ha detectado sobreconcentración o dispersión.", whyMatters: "La concentración de origen genera riesgo de compra (dependencia de un mercado) y puede no reflejar lo que pide tu clientela.", riskIfIgnored: "Si tu DO principal sube precios, no tienes alternativas. Y tu carta cuenta una historia que quizás no coincide con tu cliente." },
      queSignifica:
        "El equilibrio por origen evalúa cómo se distribuyen tus referencias por denominación, región o país. Una concentración excesiva en un origen puede limitar tu oferta y crear dependencia de un mercado de compra. Una distribución demasiado dispersa puede generar una carta sin identidad. El punto óptimo depende de tu concepto: un restaurante de cocina regional tiene lógica de concentración; uno cosmopolita necesita amplitud.",
      porQueImporta:
        "Porque el origen es parte de la historia que tu carta cuenta. Si tienes 30 Riojas y 2 Rías Baixas, tu carta dice algo sobre tus prioridades —que puede o no coincidir con lo que pide tu clientela. Además, la concentración de origen genera riesgo de compra: si tu principal DO sube precios, no tienes alternativas inmediatas.",
      queHacer: [
        "Lista las 5 denominaciones o regiones con más referencias en tu carta. ¿Superan el 50% del total?",
        "Compara con tus datos de venta: ¿la concentración se justifica por la demanda o es por inercia de compra?",
        "Evalúa si tu distribución de orígenes es coherente con el tipo de cocina y el perfil de tu cliente.",
        "Si detectas sobreconcentración, no elimines de golpe: sustituye gradualmente al renovar referencias.",
      ],
      errores: [
        { mistake: "Sobrerepresentar una DO por relación personal con bodegas o distribuidores", consequence: "Tu carta refleja tus contactos comerciales, no las necesidades de tu cliente." },
        { mistake: "Diversificar por diversificar sin criterio", consequence: "Una carta con 30 países y ninguna profundidad no transmite conocimiento: transmite dispersión." },
        { mistake: "No adaptar el origen a la estacionalidad de la cocina", consequence: "Blancos de zonas frías en invierno y tintos potentes en verano no encajan con lo que el comensal quiere." },
      ],
    },
    {
      id: "carta-demasiado-larga",
      title: "Cuándo una carta es demasiado larga",
      porQueTeLoMostramos: { detected: "Winerim ha calculado tu ratio de efectividad: referencias con venta real vs. total de referencias en carta.", whyMatters: "El exceso de opciones paraliza al comensal, concentra las ventas en 15-20 referencias y convierte el resto en decoración con coste.", riskIfIgnored: "Acumulas complejidad, stock y gestión sin retorno. Tu equipo recomienda siempre lo mismo porque no puede conocer toda la carta." },
      queSignifica:
        "Una carta es demasiado larga cuando tiene más referencias de las que tu operativa puede gestionar, tu equipo puede conocer o tu comensal puede procesar. No hay un número mágico, pero hay señales claras: si más del 20% de tus referencias no se han vendido en 60 días, si tu equipo de sala no puede describir la mitad de la carta, o si el comensal tarda más de 5 minutos en elegir, tu carta es demasiado larga para tu contexto.",
      porQueImporta:
        "Porque una carta larga no impresiona: paraliza. El exceso de opciones (paradoja de la elección) reduce la conversión, aumenta el tiempo de servicio y concentra las ventas en las mismas 15-20 referencias que el equipo conoce y recomienda. El resto es decoración que genera stock, gestión y coste sin retorno. En cartas amplias a partir de 250 referencias, este riesgo es estructural.",
      queHacer: [
        "Calcula tu ratio de efectividad: referencias con venta real en los últimos 60 días / total de referencias.",
        "Si tu ratio es < 70%, tu carta tiene demasiadas referencias para tu nivel de demanda.",
        "Identifica las referencias que nunca recomienda el equipo de sala: probablemente sobran.",
        "Establece un límite operativo y respétalo: cada alta nueva requiere una baja.",
      ],
      errores: [
        { mistake: "Creer que una carta larga es sinónimo de calidad o prestigio", consequence: "Una carta de 400 referencias donde 150 no se venden no es prestigiosa: es ineficiente." },
        { mistake: "No poner límite al número de referencias", consequence: "La carta crece por acumulación y nunca se depura, hasta que el stock muerto obliga a actuar." },
        { mistake: "Reducir la carta eliminando los vinos más baratos", consequence: "Los vinos de entrada son los más rotados y a menudo los que abren la puerta a la venta de copa." },
      ],
    },
    {
      id: "carta-amplia-compleja",
      title: "Qué significa una carta amplia y compleja",
      porQueTeLoMostramos: { detected: "Tu carta supera las 250 referencias: es un activo estratégico si se gestiona con datos, y un pasivo si se gestiona con intuición.", whyMatters: "La complejidad añade profundidad pero también fricción: más stock, más canibalización, más riesgo sin visibilidad.", riskIfIgnored: "Sin herramientas analíticas, la complejidad se convierte en caos. No ves qué se canibaliza ni dónde tienes huecos." },
      queSignifica:
        "Una carta amplia y compleja —a partir de 250 referencias— no es intrínsecamente buena ni mala. Es un activo estratégico si se gestiona con datos, y un pasivo operativo si se gestiona con intuición. La complejidad añade profundidad (más opciones para el comensal experto) pero también añade fricción (más difícil de gestionar, más stock, más riesgo de canibalización). Winerim está diseñado específicamente para este escenario.",
      porQueImporta:
        "Porque gestionar una carta de 250+ referencias sin herramientas analíticas es como pilotar un avión sin instrumentos. Necesitas saber qué vende, qué no, qué se canibaliza, dónde tienes huecos y dónde tienes exceso. Sin esa visibilidad, la complejidad se convierte en caos. Con ella, se convierte en ventaja competitiva.",
      queHacer: [
        "Si tu carta supera las 250 referencias, prioriza la implementación de un sistema de análisis continuo (no revisiones puntuales).",
        "Segmenta la carta en bloques gestionables: por tipo, por franja de precio, por origen. Analiza cada bloque por separado.",
        "Asigna un responsable de la salud de la carta que revise mensualmente los indicadores clave.",
        "Acepta que la complejidad requiere herramientas: lo que funciona con 80 referencias no escala a 300.",
      ],
      errores: [
        { mistake: "Gestionar una carta de 300 referencias con los mismos métodos que una de 50", consequence: "La complejidad crece exponencialmente, pero los métodos manuales no escalan." },
        { mistake: "No segmentar: tratar toda la carta como un bloque único", consequence: "Los problemas de un segmento se diluyen en la media y no se detectan hasta que son graves." },
        { mistake: "Considerar la complejidad como un problema a reducir en vez de un activo a gestionar", consequence: "Si tu concepto requiere amplitud, la solución no es cortar: es gestionar mejor." },
      ],
    },
    {
      id: "wine-mapping",
      title: "Cómo interpretar wine mapping y arquitectura de carta",
      porQueTeLoMostramos: { detected: "Winerim ha generado automáticamente el wine mapping de tu carta cruzando tipo × precio × estilo.", whyMatters: "Sin un mapa visual, cada decisión (alta, baja, repricing) se toma sin contexto. El mapa te dice dónde actuar en 5 minutos.", riskIfIgnored: "Tomas decisiones sobre una lista sin ver la estructura. Es como reformar una casa sin plano." },
      queSignifica:
        "El wine mapping es la representación visual de tu carta en una matriz que cruza al menos dos variables: típicamente tipo de vino × franja de precio, o estilo × origen. La arquitectura de carta es el paso siguiente: asignar un rol comercial a cada zona del mapa (atracción, conversión, posicionamiento, exploración). Un mapa bien leído te dice dónde actuar. Una arquitectura bien definida te dice por qué.",
      porQueImporta:
        "Porque sin un mapa no puedes ver la estructura de tu carta. Y sin estructura, cada decisión (añadir, quitar, repricing) se toma sin contexto. El wine mapping convierte una lista de 200 referencias en una imagen que cualquier responsable puede interpretar en 5 minutos. Es la herramienta de diagnóstico más rápida que existe para una carta de vinos.",
      queHacer: [
        "Crea un mapa de tu carta con ejes tipo × precio. Cada referencia es un punto en el mapa.",
        "Identifica zonas densas (saturación) y zonas vacías (oportunidad o irrelevancia).",
        "Asigna roles: ¿qué zona atrae al comensal? ¿Cuál convierte? ¿Cuál posiciona tu restaurante?",
        "Usa el mapa para tomar decisiones de alta/baja: si un vino nuevo cae en una zona saturada, necesitas quitar otro primero.",
      ],
      errores: [
        { mistake: "No tener un mapa visual de la carta", consequence: "Tomas decisiones sobre una lista sin ver la estructura. Es como reformar una casa sin plano." },
        { mistake: "Hacer el wine mapping una vez y no actualizarlo", consequence: "El mapa caduca con cada cambio de carta. Tiene que ser un documento vivo." },
        { mistake: "Mapear solo por tipo y precio sin incluir datos de venta", consequence: "Ves la estructura pero no sabes qué zonas funcionan y cuáles no." },
      ],
    },
  ],
};

export default cartaEquilibrioContent;
