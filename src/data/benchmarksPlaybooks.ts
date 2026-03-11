import {
  BarChart3, TrendingUp, Wine, DollarSign, Layers, Users,
  Target, RotateCcw, BookOpen, GraduationCap, ShoppingCart, PieChart
} from "lucide-react";

export type ContentType = "benchmark" | "playbook";

export interface KeyPoint {
  title: string;
  description: string;
}

export interface BPItem {
  slug: string;
  type: ContentType;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroSubtitle: string;
  icon: React.ElementType;
  audience: string;
  problem: string;
  summary: string;
  methodology: string;
  keyPoints: KeyPoint[];
  whatItMeans: string;
  whenToUse: string;
  commonMistakes: string[];
  faqs: { q: string; a: string }[];
  relatedSlugs: string[];
  ctaText?: string;
  ctaUrl?: string;
}

export const benchmarksPlaybooks: BPItem[] = [
  // ── BENCHMARKS ──
  {
    slug: "benchmark-referencias-por-tipo-restaurante",
    type: "benchmark",
    title: "Número ideal de referencias según tipo de restaurante",
    metaTitle: "Benchmark: Número de Referencias en Carta de Vinos por Tipo de Restaurante",
    metaDescription: "¿Cuántas referencias debe tener tu carta de vinos? Benchmark por tipo de restaurante: gastronómico, casual, hotel, vinoteca. Datos y criterios para decidir.",
    heroSubtitle: "Descubre cuántas referencias de vino debería tener tu carta según el tipo de establecimiento, el ticket medio y el perfil de cliente.",
    icon: BarChart3,
    audience: "Directores de restaurante, F&B managers, sumilleres y propietarios que quieren dimensionar correctamente su carta de vinos.",
    problem: "Una carta sobredimensionada genera stock muerto, confusión en el cliente y costes de almacenaje innecesarios. Una carta demasiado corta limita la experiencia y reduce oportunidades de venta.",
    summary: "El número ideal de referencias no es universal: depende del tipo de restaurante, su posicionamiento, la rotación esperada y la capacidad de formación del equipo. Este benchmark establece rangos orientativos basados en la práctica del sector.",
    methodology: "Análisis basado en prácticas habituales del sector hostelero en España y Europa. Se consideran variables como tipo de cocina, ticket medio, capacidad de bodega, perfil del comensal y frecuencia de rotación. No se trata de cifras absolutas, sino de rangos que deben adaptarse a cada contexto.",
    keyPoints: [
      { title: "Restaurante casual / bistró", description: "Entre 20 y 40 referencias suele ser suficiente. Prioriza legibilidad y rotación rápida." },
      { title: "Restaurante gastronómico", description: "Entre 80 y 200+ referencias, con profundidad en regiones y añadas. La carta es parte de la experiencia." },
      { title: "Hotel con varios outlets", description: "Cada punto de venta necesita su propia selección adaptada. Un pool central de 100–300 referencias se distribuye entre outlets." },
      { title: "Vinoteca / wine bar", description: "50 a 120 referencias con alta rotación y fuerte presencia de vino por copa." },
      { title: "Cadena de restauración", description: "15 a 30 referencias con enfoque en estandarización, formación del personal y control de costes." },
    ],
    whatItMeans: "Tener el número correcto de referencias significa que cada vino de tu carta tiene un propósito: cubre un rango de precio, un estilo o un maridaje. No se trata de más o menos, sino de que cada referencia trabaje.",
    whenToUse: "Usa este benchmark cuando diseñes una carta nueva, cuando hagas una revisión anual, o cuando detectes problemas de rotación o stock muerto.",
    commonMistakes: [
      "Añadir referencias sin retirar las que no rotan.",
      "Copiar la carta de otro restaurante sin considerar el propio contexto.",
      "No adaptar el tamaño de la carta a la capacidad del equipo para recomendarla.",
      "Confundir cantidad con calidad o prestigio.",
    ],
    faqs: [
      { q: "¿Existe un número mágico de referencias?", a: "No. El número ideal depende de tu tipo de restaurante, tu clientela y tu capacidad operativa. Lo importante es que cada referencia tenga rotación y propósito." },
      { q: "¿Cuántas referencias mínimas para ofrecer variedad?", a: "Con 20-25 referencias bien seleccionadas puedes cubrir los principales estilos, rangos de precio y maridajes en un restaurante casual." },
      { q: "¿Cómo sé si tengo demasiadas referencias?", a: "Si más del 20% de tu carta no rota en 3 meses, probablemente tienes referencias que no aportan valor." },
    ],
    relatedSlugs: [
      "benchmark-distribucion-rangos-precio",
      "playbook-carta-rentable",
      "benchmark-equilibrio-regiones-estilos",
    ],
  },
  {
    slug: "benchmark-distribucion-rangos-precio",
    type: "benchmark",
    title: "Distribución ideal por rangos de precio",
    metaTitle: "Benchmark: Distribución de Precios en Carta de Vinos de Restaurante",
    metaDescription: "Cómo distribuir los rangos de precio en tu carta de vinos para maximizar ventas y margen. Benchmark con criterios prácticos para hostelería.",
    heroSubtitle: "Aprende a estructurar los rangos de precio de tu carta para que el cliente navegue con facilidad y el restaurante maximice su margen.",
    icon: DollarSign,
    audience: "Propietarios, directores de F&B y sumilleres que quieren optimizar la estructura de precios de su carta.",
    problem: "Una carta con precios mal distribuidos genera cuellos de botella: los clientes se concentran en los vinos más baratos o perciben los caros como inaccesibles. El margen global se resiente.",
    summary: "La distribución de precios debe guiar al cliente hacia una zona de confort donde el restaurante obtiene su mejor margen. No se trata de tener vinos caros, sino de distribuir inteligentemente las opciones.",
    methodology: "Criterios basados en las prácticas habituales del sector hostelero. Se analiza la distribución típica en restaurantes con cartas rentables, considerando ticket medio, posicionamiento y perfil de cliente.",
    keyPoints: [
      { title: "Regla de los tercios", description: "Una distribución funcional suele dividir la carta en tres tramos: entrada (30-35%), medio (40-45%) y alto (20-25%)." },
      { title: "Ancla de precio", description: "Incluir 2-3 referencias premium sirve como ancla psicológica que hace que el tramo medio parezca más accesible." },
      { title: "Sweet spot", description: "El rango de precio donde se concentra el mayor volumen de ventas. Debe contener tus referencias con mejor margen." },
      { title: "Precio de entrada", description: "El vino más barato de la carta marca la expectativa del cliente. No debe ser demasiado bajo si buscas posicionamiento." },
    ],
    whatItMeans: "Una buena distribución de precios facilita la decisión del cliente, reduce la fricción de compra y dirige la venta hacia las referencias más rentables.",
    whenToUse: "Al diseñar una carta nueva, al revisar tu pricing anual, o cuando detectes que la mayoría de clientes piden siempre el vino más barato.",
    commonMistakes: [
      "Tener demasiados vinos en el mismo rango de precio.",
      "No dejar hueco entre el vino más barato y el siguiente tramo.",
      "Fijar precios solo con multiplicador fijo sin considerar la estrategia.",
      "No revisar la distribución cuando cambian los costes de compra.",
    ],
    faqs: [
      { q: "¿Qué porcentaje del margen debe venir del tramo medio?", a: "En cartas bien construidas, el tramo medio suele representar entre el 50% y el 60% de las ventas en volumen y una parte significativa del margen total." },
      { q: "¿Cuántos tramos de precio debería tener?", a: "Tres tramos claros suelen ser suficientes. Más de cuatro puede complicar la navegación del cliente." },
      { q: "¿El multiplicador debe ser igual para todos los vinos?", a: "No necesariamente. Muchos restaurantes aplican multiplicadores descendentes a medida que sube el coste del vino." },
    ],
    relatedSlugs: [
      "benchmark-referencias-por-tipo-restaurante",
      "benchmark-margen-por-tipo-referencia",
      "playbook-carta-rentable",
    ],
  },
  {
    slug: "benchmark-estrategia-por-copa",
    type: "benchmark",
    title: "Estrategia de vino por copa: cuántos y cuáles",
    metaTitle: "Benchmark: Estrategia de Vino por Copa en Restaurantes",
    metaDescription: "¿Cuántos vinos por copa ofrecer? ¿Cuáles elegir? Benchmark con criterios prácticos para diseñar una oferta de vino por copa rentable.",
    heroSubtitle: "El vino por copa es una de las palancas más potentes para aumentar ventas. Descubre cuántos ofrecer, qué perfiles elegir y cómo rotarlos.",
    icon: Wine,
    audience: "Cualquier restaurante que ofrezca o quiera ofrecer vino por copa: desde bistrós hasta hoteles.",
    problem: "Ofrecer pocos vinos por copa limita la experiencia. Ofrecer demasiados genera merma y complejidad operativa. La clave está en el equilibrio.",
    summary: "Una oferta de vino por copa bien diseñada aumenta el ticket medio, reduce la barrera de compra y permite al cliente explorar sin compromiso. El reto es encontrar el número y perfil adecuados.",
    methodology: "Criterios basados en la experiencia del sector y en la lógica operativa de gestión de copas abiertas, considerando merma, rotación y diversidad de perfiles.",
    keyPoints: [
      { title: "Número recomendado", description: "Entre 6 y 12 vinos por copa es el rango operativo para la mayoría de restaurantes. Wine bars pueden llegar a 20+." },
      { title: "Diversidad de perfil", description: "Incluir al menos: 1-2 espumosos, 2-3 blancos, 2-3 tintos y 1 rosado o dulce. Variedad sin redundancia." },
      { title: "Rotación regular", description: "Cambiar al menos 2-3 referencias cada mes mantiene el interés de los clientes habituales y reduce riesgo de merma." },
      { title: "Tamaño de copa", description: "Ofrecer dos formatos (copa estándar y media copa) amplía opciones y reduce la barrera de precio." },
    ],
    whatItMeans: "El vino por copa no es solo una opción para quien no quiere botella: es una herramienta de venta que puede aumentar significativamente la facturación.",
    whenToUse: "Al lanzar o rediseñar tu oferta de vino por copa, al detectar merma excesiva, o cuando el porcentaje de venta por copa sea bajo respecto al potencial.",
    commonMistakes: [
      "Ofrecer solo los vinos más baratos por copa.",
      "No controlar la merma ni la fecha de apertura.",
      "Mantener las mismas referencias por copa durante meses.",
      "No formar al personal para recomendar la copa como primera opción.",
    ],
    faqs: [
      { q: "¿El vino por copa es más rentable que la botella?", a: "Generalmente sí, porque permite aplicar un margen mayor por unidad de servicio y reduce el riesgo de que el cliente no pida vino por miedo a la botella entera." },
      { q: "¿Cómo controlar la merma?", a: "Con sistemas de preservación, registro de apertura y seguimiento de consumo diario. Winerim automatiza esta gestión." },
      { q: "¿Cuántos días puedo mantener abierta una botella?", a: "Depende del sistema de preservación. Sin sistema, 1-2 días para blancos y 2-3 para tintos. Con gas inerte, hasta 2-3 semanas." },
    ],
    relatedSlugs: [
      "playbook-optimizar-vino-copa",
      "benchmark-distribucion-rangos-precio",
      "playbook-vender-mas-vino",
    ],
  },
  {
    slug: "benchmark-equilibrio-regiones-estilos",
    type: "benchmark",
    title: "Equilibrio entre regiones, estilos y tipologías",
    metaTitle: "Benchmark: Equilibrio de Regiones y Estilos en Carta de Vinos",
    metaDescription: "¿Tu carta está equilibrada en regiones, estilos y tipologías? Benchmark para construir una carta diversa, coherente y alineada con tu cocina.",
    heroSubtitle: "Una carta equilibrada no es una carta que lo tiene todo: es una carta donde cada vino cumple una función y complementa al resto.",
    icon: Layers,
    audience: "Sumilleres, directores de F&B y propietarios que buscan coherencia y diversidad en su selección.",
    problem: "Cartas desequilibradas donde una región o estilo domina excesivamente, limitando la experiencia del cliente y las posibilidades de maridaje.",
    summary: "El equilibrio no significa paridad. Significa que cada región, estilo y tipología presentes en la carta responden a una lógica: la cocina del restaurante, el perfil del cliente y la identidad del establecimiento.",
    methodology: "Análisis cualitativo basado en principios de composición de carta. No existen proporciones universales: cada carta debe responder a su propio contexto.",
    keyPoints: [
      { title: "Coherencia con la cocina", description: "La carta debe reflejar la identidad gastronómica del restaurante. Un restaurante mediterráneo necesita más blancos y rosados que uno especializado en carnes." },
      { title: "Regiones locales vs internacionales", description: "Un equilibrio habitual sitúa entre un 50-70% de vinos nacionales/locales y un 30-50% internacionales, según posicionamiento." },
      { title: "Diversidad de estilos", description: "Incluir estilos variados (frescos, estructurados, crianza, naturales) permite atender distintos perfiles de cliente." },
      { title: "Evitar redundancia", description: "Dos vinos que cumplen la misma función en la carta compiten entre sí. Cada referencia debe ser distinguible." },
    ],
    whatItMeans: "Una carta equilibrada facilita el trabajo del personal para recomendar, amplía las posibilidades de maridaje y ofrece una experiencia más rica al cliente.",
    whenToUse: "Al componer una carta nueva, al hacer una revisión estacional, o cuando detectes que ciertas zonas de la carta no rotan.",
    commonMistakes: [
      "Llenar la carta de una sola región por inercia o relación con el distribuidor.",
      "No considerar los maridajes reales de la cocina al seleccionar regiones.",
      "Incluir vinos 'de moda' sin evaluar si encajan con el resto de la carta.",
      "No revisar el equilibrio cuando se añaden o eliminan referencias.",
    ],
    faqs: [
      { q: "¿Debería incluir vino natural en mi carta?", a: "Depende de tu público. Si tu clientela lo valora, incluir 2-3 referencias naturales puede diferenciar tu carta. Si no, puede generar confusión." },
      { q: "¿Cuántas regiones distintas debería cubrir?", a: "No hay un número fijo. Es más importante que cada región tenga un propósito en la carta que cubrir muchas regiones por completitud." },
    ],
    relatedSlugs: [
      "benchmark-referencias-por-tipo-restaurante",
      "playbook-carta-rentable",
      "benchmark-estrategia-por-copa",
    ],
  },
  {
    slug: "benchmark-peso-vino-ticket-medio",
    type: "benchmark",
    title: "Peso del vino en el ticket medio",
    metaTitle: "Benchmark: Peso del Vino en el Ticket Medio de un Restaurante",
    metaDescription: "¿Cuánto debería representar el vino en tu ticket medio? Benchmark por tipo de restaurante para evaluar y mejorar la contribución del vino a la facturación.",
    heroSubtitle: "El vino puede representar entre un 15% y un 40% del ticket medio. Conoce los rangos habituales y evalúa si estás por debajo de tu potencial.",
    icon: TrendingUp,
    audience: "Directores de restaurante, controllers financieros y propietarios interesados en maximizar la contribución del vino al negocio.",
    problem: "Muchos restaurantes desconocen qué porcentaje del ticket medio corresponde al vino y, por tanto, no pueden evaluar si están aprovechando su potencial.",
    summary: "El peso del vino en el ticket medio varía enormemente según el tipo de restaurante, pero conocer los rangos del sector permite identificar oportunidades de mejora.",
    methodology: "Rangos basados en referencias habituales del sector. Cada restaurante debe calcular su propio ratio y compararlo con establecimientos similares.",
    keyPoints: [
      { title: "Restaurante casual", description: "El vino suele representar entre un 15% y un 25% del ticket medio." },
      { title: "Restaurante gastronómico", description: "El vino puede suponer entre un 30% y un 45% del ticket, especialmente con maridajes." },
      { title: "Hotel", description: "Variable por outlet, pero el potencial suele estar infrautilizado. Rangos típicos entre 10% y 30%." },
      { title: "Wine bar / vinoteca", description: "El vino es el producto principal: puede representar entre un 50% y un 70% del ticket." },
    ],
    whatItMeans: "Si tu ratio está por debajo de los rangos habituales de tu categoría, probablemente hay oportunidades de mejora en tu carta, tu formación de personal o tu estrategia de recomendación.",
    whenToUse: "Como KPI mensual para evaluar la evolución de las ventas de vino. También al comparar rendimiento entre distintos locales o periodos.",
    commonMistakes: [
      "No medir este ratio de forma regular.",
      "Compararse con restaurantes de categoría diferente.",
      "Atribuir un ratio bajo solo a la carta cuando puede ser un problema de servicio o formación.",
      "No considerar el efecto estacional en el consumo de vino.",
    ],
    faqs: [
      { q: "¿Cómo calculo el peso del vino en mi ticket?", a: "Divide la facturación de vino entre la facturación total en un periodo dado. Es un cálculo simple pero revelador." },
      { q: "¿Un ratio alto siempre es mejor?", a: "No necesariamente. Un ratio muy alto podría indicar que otros departamentos (comida, cócteles) están infrautilizados. El objetivo es optimizar, no maximizar a toda costa." },
    ],
    relatedSlugs: [
      "benchmark-margen-por-tipo-referencia",
      "playbook-vender-mas-vino",
      "benchmark-distribucion-rangos-precio",
    ],
  },
  {
    slug: "benchmark-margen-por-tipo-referencia",
    type: "benchmark",
    title: "Margen por tipo de referencia",
    metaTitle: "Benchmark: Margen de Vino por Tipo de Referencia en Restaurante",
    metaDescription: "¿Qué margen aplicar a cada tipo de vino? Benchmark con criterios por categoría: entrada, medio, premium, copa, espumoso. Estrategia de pricing real.",
    heroSubtitle: "No todos los vinos necesitan el mismo margen. Descubre cómo aplicar una estrategia de pricing diferenciada para maximizar la rentabilidad global.",
    icon: PieChart,
    audience: "Propietarios, controllers, sumilleres y directores de compras que gestionan el pricing de la carta de vinos.",
    problem: "Aplicar un multiplicador uniforme a todos los vinos suele resultar en precios desproporcionados en las referencias caras y márgenes insuficientes en las baratas.",
    summary: "Una estrategia de márgenes inteligente aplica diferentes multiplicadores según el coste del vino, el contexto competitivo y la percepción de valor del cliente.",
    methodology: "Criterios basados en las prácticas habituales del sector hostelero. Los multiplicadores son orientativos y deben ajustarse al posicionamiento de cada restaurante.",
    keyPoints: [
      { title: "Vinos de entrada", description: "Admiten multiplicadores más altos (x3–x4) porque el precio absoluto sigue siendo accesible para el cliente." },
      { title: "Vinos de gama media", description: "Multiplicadores moderados (x2.5–x3). Es el tramo donde se concentra el volumen de ventas." },
      { title: "Vinos premium", description: "Multiplicadores más bajos (x1.8–x2.5) para mantener precios competitivos y fomentar la venta." },
      { title: "Vino por copa", description: "El margen por copa suele ser superior al de botella, ya que se vende en unidades menores con mayor percepción de valor." },
      { title: "Espumosos y champagne", description: "Multiplicadores variables. El champagne admite márgenes más bajos por su alto precio de coste; los cavas y proseccos permiten márgenes más altos." },
    ],
    whatItMeans: "Un pricing inteligente no es poner el máximo margen posible: es construir una estructura donde cada referencia contribuye de forma óptima al margen global.",
    whenToUse: "Al fijar precios para una carta nueva, al renegociar con proveedores, o al detectar que ciertos vinos no se venden por estar fuera de rango.",
    commonMistakes: [
      "Usar un único multiplicador para toda la carta.",
      "No revisar los precios cuando cambian los costes de compra.",
      "Fijar precios sin considerar la percepción del cliente ni la competencia.",
      "No incluir el coste de merma en el cálculo del margen por copa.",
    ],
    faqs: [
      { q: "¿Cuánto margen debo hacer en vino como mínimo?", a: "Depende de tu estructura de costes, pero en general, un food cost del vino (coste sobre PVP) entre el 25% y el 40% se considera saludable en el sector." },
      { q: "¿Debería publicar los precios de coste?", a: "No. El precio de coste es información interna. El precio de venta debe reflejar el valor percibido, no solo el coste." },
    ],
    relatedSlugs: [
      "benchmark-distribucion-rangos-precio",
      "benchmark-peso-vino-ticket-medio",
      "playbook-carta-rentable",
    ],
  },

  // ── PLAYBOOKS ──
  {
    slug: "playbook-vender-mas-vino",
    type: "playbook",
    title: "Cómo vender más vino en sala",
    metaTitle: "Playbook: Cómo Vender Más Vino en Sala | Estrategia para Restaurantes",
    metaDescription: "Playbook práctico para aumentar las ventas de vino en tu restaurante. Técnicas de recomendación, formación de personal y diseño de carta.",
    heroSubtitle: "Un plan de acción con las técnicas más efectivas para que tu equipo venda más vino sin necesidad de ser sumiller.",
    icon: Target,
    audience: "Directores de restaurante, jefes de sala, encargados y propietarios que quieren que su equipo recomiende más y mejor.",
    problem: "El personal no recomienda vino porque no se siente seguro, no tiene formación o la carta es demasiado compleja para explicarla.",
    summary: "Vender más vino no requiere un sumiller en cada mesa. Requiere una carta bien diseñada, un equipo con las herramientas adecuadas y un sistema que facilite la recomendación.",
    methodology: "Plan de acción basado en las mejores prácticas de restaurantes que han mejorado significativamente sus ventas de vino. No requiere inversión tecnológica inicial, aunque se potencia con herramientas como Winerim.",
    keyPoints: [
      { title: "Simplifica la carta", description: "Una carta que el personal puede explicar en 30 segundos es una carta que vende. Reduce complejidad, no calidad." },
      { title: "Forma al equipo en 3 vinos", description: "Cada miembro del equipo debería poder recomendar con confianza al menos 3 vinos. No necesita saberlos todos." },
      { title: "Ofrece la copa como puerta de entrada", description: "Recomendar una copa antes de la botella reduce la barrera de compra y abre la conversación sobre el vino." },
      { title: "Vincula vino y plato", description: "Una recomendación de maridaje es más efectiva que una recomendación genérica. 'Este vino va perfecto con lo que ha pedido' es más poderoso que 'tenemos un buen Rioja'." },
      { title: "Usa las descripciones de la carta", description: "Notas de cata sencillas y maridajes sugeridos en la carta ayudan al cliente a decidir sin depender del camarero." },
    ],
    whatItMeans: "Vender más vino es una consecuencia de hacer bien varias cosas: carta legible, personal formado, recomendación proactiva y experiencia coherente.",
    whenToUse: "Cuando las ventas de vino estén por debajo de tu potencial, cuando incorpores nuevo personal, o como plan de acción trimestral.",
    commonMistakes: [
      "Esperar que el personal venda vino sin formación ni herramientas.",
      "Diseñar una carta pensada para expertos cuando tu equipo no lo es.",
      "No medir las ventas de vino de forma regular.",
      "No vincular la recomendación del vino al momento del servicio.",
    ],
    faqs: [
      { q: "¿Necesito un sumiller para vender bien vino?", a: "No necesariamente. Un equipo bien formado con una carta bien diseñada puede vender más vino que un sumiller con una carta mal planteada." },
      { q: "¿Cuánto tiempo lleva ver resultados?", a: "Con una buena implementación, muchos restaurantes notan mejoras en las primeras 2-4 semanas." },
    ],
    relatedSlugs: [
      "playbook-formar-personal",
      "benchmark-peso-vino-ticket-medio",
      "playbook-carta-rentable",
    ],
  },
  {
    slug: "playbook-mejorar-rotacion",
    type: "playbook",
    title: "Cómo mejorar la rotación de vinos",
    metaTitle: "Playbook: Cómo Mejorar la Rotación de Vinos en tu Restaurante",
    metaDescription: "Playbook para eliminar stock muerto y mejorar la rotación de tu bodega. Criterios de análisis, acciones correctivas y prevención.",
    heroSubtitle: "Un plan paso a paso para identificar los vinos que no rotan, decidir qué hacer con ellos y prevenir que se acumulen en el futuro.",
    icon: RotateCcw,
    audience: "Sumilleres, jefes de compras, controllers y propietarios preocupados por la inversión inmovilizada en bodega.",
    problem: "Stock muerto que ocupa espacio, inmoviliza capital y genera costes ocultos. Vinos que llevan meses (o años) sin venderse.",
    summary: "La rotación no mejora sola. Requiere análisis periódico, decisiones claras sobre qué mantener y qué retirar, y un sistema de prevención para evitar que el problema se repita.",
    methodology: "Proceso estructurado de diagnóstico y acción. Se basa en el análisis de datos de venta, antigüedad del stock y contribución al margen.",
    keyPoints: [
      { title: "Audita tu bodega", description: "Identifica todas las referencias que no se han vendido en los últimos 90 días. Este es tu stock muerto." },
      { title: "Clasifica y decide", description: "Para cada referencia sin rotación, decide: promocionar, reubicar en la carta, incluir en maridajes o retirar." },
      { title: "Establece reglas de entrada", description: "Cada nueva referencia debe sustituir a una existente o justificar su incorporación con datos." },
      { title: "Revisa mensualmente", description: "Un seguimiento regular evita que el stock muerto se acumule de nuevo." },
      { title: "Usa la carta como palanca", description: "Destaca los vinos que quieres mover: posición en la carta, recomendaciones del chef, vino de la semana." },
    ],
    whatItMeans: "Una bodega con buena rotación es una bodega rentable. Cada botella almacenada es dinero inmovilizado que no genera retorno.",
    whenToUse: "Trimestralmente como revisión rutinaria, o inmediatamente si detectas que tu inversión en bodega crece pero las ventas no.",
    commonMistakes: [
      "Guardar vinos 'para una ocasión especial' indefinidamente.",
      "No tener un sistema para registrar la antigüedad del stock.",
      "Comprar por inercia al mismo distribuidor sin analizar la rotación.",
      "No comunicar los cambios de carta al equipo de sala.",
    ],
    faqs: [
      { q: "¿Qué hago con los vinos que no se venden?", a: "Opciones: ofrecerlos por copa a precio especial, incluirlos en menús degustación, hacer eventos de liquidación, o devolverlos al proveedor si es posible." },
      { q: "¿Cuál es una tasa de rotación saludable?", a: "Depende del tipo de restaurante, pero como regla general, el 80% de las referencias debería venderse al menos una vez al mes." },
    ],
    relatedSlugs: [
      "benchmark-referencias-por-tipo-restaurante",
      "playbook-decidir-compras-datos",
      "benchmark-equilibrio-regiones-estilos",
    ],
  },
  {
    slug: "playbook-carta-rentable",
    type: "playbook",
    title: "Cómo construir una carta más rentable",
    metaTitle: "Playbook: Cómo Construir una Carta de Vinos Rentable para tu Restaurante",
    metaDescription: "Playbook completo para diseñar una carta de vinos que maximice márgenes, rotación y experiencia del cliente. Estructura, pricing y selección.",
    heroSubtitle: "Un marco de trabajo para diseñar (o rediseñar) tu carta de vinos con foco en la rentabilidad sin sacrificar la experiencia del cliente.",
    icon: DollarSign,
    audience: "Propietarios, directores de F&B, sumilleres y cualquier responsable de la composición y pricing de la carta de vinos.",
    problem: "Cartas construidas por inercia, sin criterio de rentabilidad claro: referencias acumuladas, precios sin estrategia y poca conexión con la cocina.",
    summary: "Una carta rentable no es una carta barata ni agresiva en márgenes. Es una carta donde cada referencia tiene un propósito, un precio bien calculado y una conexión clara con la oferta gastronómica.",
    methodology: "Framework de 6 pasos para construir o auditar una carta de vinos con criterios de rentabilidad. Aplicable a cualquier tipo de restaurante.",
    keyPoints: [
      { title: "1. Define tu identidad", description: "¿Qué tipo de experiencia de vino ofreces? La carta debe reflejar tu posicionamiento, no intentar ser todo." },
      { title: "2. Dimensiona correctamente", description: "Ajusta el número de referencias a tu tipo de restaurante, capacidad operativa y perfil de cliente." },
      { title: "3. Estructura por rangos de precio", description: "Distribuye las referencias siguiendo la regla de los tercios y usa anclas de precio." },
      { title: "4. Aplica pricing diferenciado", description: "No uses un multiplicador único. Ajusta según categoría, coste y valor percibido." },
      { title: "5. Alinea con la cocina", description: "Cada vino debería maridarse con al menos 2-3 platos de tu carta. Si no encaja, no debería estar." },
      { title: "6. Mide y ajusta", description: "Revisa mensualmente la rotación, el margen por referencia y la contribución al ticket medio." },
    ],
    whatItMeans: "Una carta rentable es un activo del negocio: genera margen, facilita la venta y mejora la experiencia del cliente.",
    whenToUse: "Al abrir un nuevo restaurante, al hacer una revisión anual de la carta, o cuando los márgenes del vino no cumplan expectativas.",
    commonMistakes: [
      "Diseñar la carta para impresionar en vez de para vender.",
      "Acumular referencias sin retirar las que no aportan.",
      "No considerar la formación del personal como parte del diseño de la carta.",
      "Copiar la carta de la competencia sin analizar tu propio contexto.",
    ],
    faqs: [
      { q: "¿Cuánto tiempo se tarda en rediseñar una carta?", a: "Con los datos adecuados, una carta puede rediseñarse en 2-4 semanas. El reto suele ser conseguir los datos, no el diseño en sí." },
      { q: "¿Debería cambiar toda la carta o hacer ajustes graduales?", a: "Depende de la situación. Si la carta tiene problemas estructurales, un rediseño completo es más efectivo. Si solo necesita ajustes, un enfoque gradual genera menos fricción." },
    ],
    relatedSlugs: [
      "benchmark-distribucion-rangos-precio",
      "benchmark-margen-por-tipo-referencia",
      "playbook-vender-mas-vino",
    ],
  },
  {
    slug: "playbook-optimizar-vino-copa",
    type: "playbook",
    title: "Cómo optimizar tu oferta de vino por copa",
    metaTitle: "Playbook: Cómo Optimizar el Vino por Copa en tu Restaurante",
    metaDescription: "Playbook para diseñar, gestionar y rentabilizar tu oferta de vino por copa. Selección, pricing, control de merma y estrategia de rotación.",
    heroSubtitle: "La copa es tu mejor herramienta de venta de vino. Este playbook te muestra cómo diseñar una oferta que maximice facturación y minimice merma.",
    icon: Wine,
    audience: "Cualquier restaurante que quiera lanzar, mejorar o rentabilizar su oferta de vino por copa.",
    problem: "Merma excesiva, selección poco atractiva, precios mal calculados o falta de rotación en la oferta de vino por copa.",
    summary: "Una oferta de vino por copa bien gestionada puede ser una de las líneas más rentables del restaurante. Requiere selección inteligente, pricing ajustado y control operativo.",
    methodology: "Plan de acción en 5 fases: diseño de la oferta, pricing, control operativo, formación y optimización continua.",
    keyPoints: [
      { title: "Selecciona con criterio", description: "Elige vinos que cubran estilos diversos, que mariden con tu cocina y que tengan buena relación calidad-precio de coste." },
      { title: "Calcula el pricing por copa", description: "El precio de una copa debería cubrir al menos el coste de la botella en 2-3 copas servidas. El resto es margen." },
      { title: "Controla la merma", description: "Registra la fecha de apertura, usa sistemas de preservación y establece protocolos de descarte." },
      { title: "Rota regularmente", description: "Cambia 2-3 referencias cada 2-4 semanas para mantener el interés y reducir merma." },
      { title: "Promociona activamente", description: "La copa como primera recomendación del equipo de sala. 'Tenemos un blanco por copa que va perfecto con su entrante.'" },
    ],
    whatItMeans: "La copa es la puerta de entrada al vino para muchos clientes. Una oferta bien diseñada aumenta ventas y reduce barreras.",
    whenToUse: "Al lanzar una oferta de vino por copa, al detectar merma excesiva, o al querer aumentar las ventas de vino.",
    commonMistakes: [
      "No registrar merma ni controlar botellas abiertas.",
      "Ofrecer solo vinos baratos por copa.",
      "No cambiar la oferta durante semanas o meses.",
      "Calcular el precio sin considerar la merma real.",
    ],
    faqs: [
      { q: "¿Cuántas copas saco de una botella?", a: "Entre 5 y 6 copas de 150ml. Para el cálculo de pricing, usa 5 copas para incluir un margen de merma." },
      { q: "¿Es rentable invertir en un sistema de preservación?", a: "Generalmente sí, especialmente si ofreces más de 8 vinos por copa. El sistema se paga con la merma que evita." },
    ],
    relatedSlugs: [
      "benchmark-estrategia-por-copa",
      "benchmark-margen-por-tipo-referencia",
      "playbook-vender-mas-vino",
    ],
  },
  {
    slug: "playbook-formar-personal",
    type: "playbook",
    title: "Cómo formar al personal para recomendar vino",
    metaTitle: "Playbook: Cómo Formar a tu Equipo para Recomendar Vino sin Ser Sumiller",
    metaDescription: "Playbook para formar al personal de sala en vino. Técnicas simples, sin jerga, para que tu equipo recomiende con confianza y aumente las ventas.",
    heroSubtitle: "Tu equipo no necesita ser sumiller. Necesita confianza, las herramientas adecuadas y una carta que pueda explicar en 30 segundos.",
    icon: GraduationCap,
    audience: "Directores de restaurante, jefes de sala, responsables de RRHH y propietarios de restaurantes con equipos sin formación en vino.",
    problem: "El personal no recomienda vino porque tiene miedo a equivocarse, no conoce la carta o siente que el vino es un tema de expertos.",
    summary: "La formación en vino para equipos de sala no tiene que ser académica ni exhaustiva. Tiene que ser práctica, centrada en la carta real del restaurante y orientada a la venta.",
    methodology: "Programa de formación en 4 módulos, diseñado para implementarse en sesiones cortas (30-45 min) durante los briefings previos al servicio.",
    keyPoints: [
      { title: "Módulo 1: La carta en 5 minutos", description: "Enseña al equipo a navegar la carta, identificar los bloques principales y saber dónde encontrar cada tipo de vino." },
      { title: "Módulo 2: Los 3 vinos clave", description: "Cada miembro del equipo debe poder describir y recomendar al menos 3 vinos con confianza. Elige los de mejor margen." },
      { title: "Módulo 3: Maridaje simple", description: "Enseña 5-6 reglas básicas de maridaje que cubran el 80% de las situaciones: pescado-blanco, carne-tinto, postre-dulce, etc." },
      { title: "Módulo 4: La recomendación natural", description: "Practica frases de recomendación que suenen naturales: '¿Le apetece un vino para acompañar?' es mejor que '¿Quiere ver la carta de vinos?'" },
    ],
    whatItMeans: "Un equipo que recomienda vino con naturalidad vende más y genera una mejor experiencia de cliente.",
    whenToUse: "Al incorporar nuevo personal, al cambiar la carta, o como refuerzo trimestral para todo el equipo.",
    commonMistakes: [
      "Dar formación teórica en vez de práctica.",
      "Exigir que el personal conozca toda la carta de memoria.",
      "No actualizar la formación cuando cambia la carta.",
      "No practicar las recomendaciones antes del servicio.",
    ],
    faqs: [
      { q: "¿Cuánto tiempo necesito para formar a mi equipo?", a: "Con sesiones de 30 minutos, 2-3 veces por semana durante 2 semanas, puedes cubrir lo esencial. La clave es la práctica continua." },
      { q: "¿Y si mi equipo rota mucho?", a: "Por eso es importante tener un sistema replicable: fichas de vino, guía de maridajes y 3 vinos de referencia siempre actualizados. Winerim automatiza esto." },
    ],
    relatedSlugs: [
      "playbook-vender-mas-vino",
      "benchmark-peso-vino-ticket-medio",
      "playbook-carta-rentable",
    ],
  },
  {
    slug: "playbook-decidir-compras-datos",
    type: "playbook",
    title: "Cómo decidir qué vinos comprar con datos",
    metaTitle: "Playbook: Cómo Decidir Qué Vinos Comprar con Datos en tu Restaurante",
    metaDescription: "Playbook para tomar decisiones de compra de vino basadas en datos reales: rotación, margen, demanda y tendencias. Reduce riesgos y mejora tu selección.",
    heroSubtitle: "Deja de comprar por intuición o por la relación con el proveedor. Aprende a usar datos de venta para tomar decisiones de compra más inteligentes.",
    icon: ShoppingCart,
    audience: "Jefes de compras, sumilleres, controllers y propietarios que quieren profesionalizar su proceso de compra de vinos.",
    problem: "Decisiones de compra basadas en la inercia, la presión del distribuidor o el gusto personal, sin datos de rendimiento real.",
    summary: "Comprar bien no es comprar barato. Es comprar lo que tu restaurante necesita, basándote en datos de venta, rotación, margen y demanda real de tus clientes.",
    methodology: "Framework de decisión de compra basado en 4 criterios objetivos que cualquier restaurante puede implementar con datos básicos de venta.",
    keyPoints: [
      { title: "Criterio 1: Rotación", description: "¿Se vende? Si una referencia no rota en 90 días, cuestiona si debes reponerla." },
      { title: "Criterio 2: Margen", description: "¿Cuánto ganas? Prioriza referencias que contribuyan al margen global, no solo las de bajo coste." },
      { title: "Criterio 3: Función en la carta", description: "¿Qué hueco cubre? Cada compra debe responder a una necesidad: rango de precio, estilo, maridaje o región." },
      { title: "Criterio 4: Tendencia", description: "¿La demanda sube o baja? Identifica qué estilos o regiones están ganando tracción entre tus clientes." },
      { title: "Matriz de decisión", description: "Cruza los 4 criterios para priorizar: mantener, sustituir, ampliar o eliminar cada referencia." },
    ],
    whatItMeans: "Comprar con datos significa reducir el riesgo de stock muerto, mejorar la rentabilidad y construir una carta que responde a la demanda real.",
    whenToUse: "Antes de cada pedido de reposición, al negociar con proveedores, o al hacer la planificación anual de compras.",
    commonMistakes: [
      "Comprar porque 'el distribuidor lo recomienda' sin verificar demanda.",
      "No registrar las ventas por referencia.",
      "Reponer automáticamente sin revisar la rotación.",
      "No considerar el coste de oportunidad del stock acumulado.",
    ],
    faqs: [
      { q: "¿Qué datos necesito como mínimo?", a: "Ventas por referencia (unidades y euros) y antigüedad del stock. Con estos dos datos ya puedes tomar decisiones mucho mejores." },
      { q: "¿Cómo negocio mejor con los distribuidores?", a: "Con datos de venta puedes demostrar qué referencias funcionan y negociar mejores condiciones. El distribuidor también prefiere trabajar con restaurantes que venden." },
    ],
    relatedSlugs: [
      "playbook-mejorar-rotacion",
      "benchmark-margen-por-tipo-referencia",
      "benchmark-referencias-por-tipo-restaurante",
    ],
  },
];

export function getBPBySlug(slug: string): BPItem | undefined {
  return benchmarksPlaybooks.find(bp => bp.slug === slug);
}

export function getBPByType(type: ContentType): BPItem[] {
  return benchmarksPlaybooks.filter(bp => bp.type === type);
}

export function getRelatedBPs(slugs: string[]): BPItem[] {
  return slugs.map(s => benchmarksPlaybooks.find(bp => bp.slug === s)).filter(Boolean) as BPItem[];
}
