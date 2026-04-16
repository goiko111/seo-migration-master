export interface CourseModule {
  id: string;
  slug: string;
  title: string;
  description: string;
  duration: string; // e.g. "5 min"
  videoPlaceholder: string; // description of what the video would cover
  keyPoints: string[];
  quiz: { question: string; options: string[]; correct: number }[];
  content?: string; // full lesson text, 200-300 words
  practicalExercise?: string; // hands-on exercise, 1-2 sentences
}

export interface CourseLevel {
  id: string;
  slug: string;
  level: number; // 1-4
  title: string;
  subtitle: string;
  description: string;
  icon: string; // emoji
  targetAudience: string;
  prerequisites: string;
  estimatedHours: number;
  modules: CourseModule[];
  certificate: string; // certificate name
  seo: { title: string; description: string };
}

const coursesLibrary: CourseLevel[] = [
{
  id: "level-1",
  slug: "fundamentos-vino-viticultura",
  level: 1,
  title: "Fundamentos del Vino y la Viticultura",
  subtitle: "Introducción profesional a los principios esenciales del vino",
  description: "Un recorrido exhaustivo por los fundamentos del vino, desde la historia y el cultivo de la vid hasta las técnicas de elaboración. Diseñado para camareros, estudiantes de hostelería y aficionados que buscan una comprensión seria y profesional del mundo vinícola. Este nivel establece las bases teóricas y prácticas necesarias para desarrollar una carrera o expertise en vino.",
  icon: "🍇",
  targetAudience: "Camareros, estudiantes de hostelería, sommelier en formación, aficionados serios, profesionales del sector gastronómico",
  prerequisites: "Ninguno. Abierto a cualquier persona con interés en aprender sobre vino de forma profesional",
  estimatedHours: 12,
  certificate: "Certificado de Fundamentos del Vino y la Viticultura - Nivel 1",
  seo: {
    title: "Curso de Fundamentos del Vino y la Viticultura | Academia de Vino Online",
    description: "Aprende los fundamentos del vino con nuestro curso profesional. Historia, viticultura, elaboración y cata de vino. Perfecto para camareros y sommeliers en formación."
  },
  modules: [
    {
      id: "m1-1",
      slug: "que-es-el-vino-historia-definicion",
      title: "Qué es el vino: historia y definición",
      description: "Exploración de la definición oficial del vino, su composición química y su evolución histórica desde Mesopotamia hasta la actualidad",
      duration: "12 minutos",
      videoPlaceholder: "https://via.placeholder.com/1280x720?text=Que+es+el+vino",
      keyPoints: [
        "El vino es el resultado de la fermentación alcohólica del mosto de uva por levaduras naturales o seleccionadas",
        "La definición legal exige un mínimo de 8.5° de alcohol volumétrico",
        "El vino contiene más de 600 compuestos químicos identificados",
        "La historia del vino se remonta a más de 10,000 años en el Cáucaso",
        "Los antiguos egipcios, griegos y romanos fueron civilizaciones vinícolas clave",
        "La Edad Media consolidó la producción en monasterios y tierras nobles",
        "El comercio colonial expandió los viñedos a América, Australia y Sudáfrica",
        "La clasificación moderna de vinos comenzó en el siglo XVIII en Burdeos",
        "Hoy existen más de 10,000 variedades de uva documentadas",
        "El vino es símbolo cultural, gastronómico y económico en muchas regiones"
      ],
      quiz: [
        {
          question: "¿Cuál es el grado mínimo de alcohol que debe tener un vino según la definición legal?",
          options: ["5.5°", "8.5°", "12.0°", "15.0°"],
          correct: 1
        },
        {
          question: "¿En qué región se originó la producción de vino hace aproximadamente 10,000 años?",
          options: ["Mesopotamia", "Cáucaso", "Antigua Grecia", "Burdeos"],
          correct: 1
        }
      ],
      content: "El vino es una bebida compleja resultado de la fermentación alcohólica del mosto de uva. Según la legislación europea, el vino debe tener un grado alcohólico volumétrico mínimo de 8.5°. Su composición incluye agua (80-85%), alcohol etílico (8-15%), ácidos, minerales y compuestos fenólicos que dan color y sabor. Históricamente, el vino acompaña a la humanidad desde hace más de 10,000 años, con evidencias arqueológicas que sitúan su origen en la región del Cáucaso. Civilizaciones como Egipto, Grecia y Roma desarrollaron culturas vinícolas sofisticadas. Durante la Edad Media, los monasterios fueron centros clave de producción y conservación del conocimiento enológico. La clasificación moderna de vinos comenzó en Burdeos en el siglo XVIII, sistematizando la calidad según origen y características. El comercio colonial del siglo XVI expandió los viñedos a América Latina, Australia y Sudáfrica, globalizando la viticultura.",
      practicalExercise: "Analiza una botella de vino que tengas disponible. Lee la etiqueta y extrae: grado alcohólico, tipo de vino, año de cosecha, región de origen. Anota tus observaciones sobre color y aroma. Reflexiona sobre cómo la historia de esa región influye en el estilo del vino."
    },
    {
      id: "m1-2",
      slug: "de-la-vid-al-vino-ciclo-vegetativo",
      title: "De la vid al vino: el ciclo vegetativo",
      description: "Comprensión del ciclo vegetativo anual de la vid, desde el desborre hasta la maduración de la uva",
      duration: "10 minutos",
      videoPlaceholder: "https://via.placeholder.com/1280x720?text=Ciclo+vegetativo+de+la+vid",
      keyPoints: [
        "El ciclo vegetativo de la vid dura aproximadamente 180 días desde desborre a cosecha",
        "El desborre marca el inicio del crecimiento cuando las temperaturas suben",
        "La floración ocurre en primavera, típicamente entre abril y junio",
        "El cuajado es el proceso donde la flor se convierte en fruto",
        "El envero marca el cambio de color en las uvas, señalando la maduración",
        "La maduración implica aumento de azúcares y disminución de ácidos",
        "Factores como lluvia, temperatura y luz influyen en cada fase",
        "El estrés hídrico controlado mejora la concentración de sabores",
        "La vendimia ocurre cuando las uvas alcanzan madurez optima",
        "Después de la cosecha comienza el reposo invernal de la vid"
      ],
      quiz: [
        {
          question: "¿Cuántos días aproximadamente dura el ciclo vegetativo de la vid desde desborre a cosecha?",
          options: ["90 días", "120 días", "180 días", "240 días"],
          correct: 2
        },
        {
          question: "¿Qué se entiende por envero en el ciclo vegetativo?",
          options: ["El comienzo de la floración", "El cambio de color en las uvas", "La maduración final del sarmiento", "La caída de hojas en otoño"],
          correct: 1
        }
      ],
      content: "El ciclo vegetativo de la vid es un proceso cíclico anual que comienza con el desborre en primavera, cuando las temperaturas superan los 10°C y la planta inicia su crecimiento. Aproximadamente 60 días después ocurre la floración, donde pequeñas flores verdes aparecer en el sarmiento. El cuajado sucede 5-10 días después, transformando las flores en pequeños frutos. Durante 6-7 semanas, los frutos crecen mediante división celular y acumulación de agua. El envero marca una transición crucial: las uvas cambian de color y comienzan a acumular azúcares mientras los ácidos disminuyen. Este período de maduración dura 30-40 días, influenciado por temperatura, radiación solar y disponibilidad de agua. El estrés hídrico controlado acelera la maduración y concentra componentes aromáticos y fenólicos. Finalmente, la vendimia ocurre cuando se alcanza la madurez óptima según los objetivos del viticultor.",
      practicalExercise: "Investiga en internet el calendario de un viñedo en tu región durante un año completo. Crea un diagrama circular mostrando las 12 fases del ciclo vegetativo, indicando meses, temperaturas aproximadas y qué sucede en la vid cada mes. Compara con el ciclo de otra región con clima distinto."
    },
    {
      id: "m1-3",
      slug: "anatomia-vid-cepa-sarmiento-racimo",
      title: "Anatomía de la vid: cepa, sarmiento, racimo",
      description: "Estudio detallado de la estructura anatómica de la vid y sus diferentes componentes",
      duration: "11 minutos",
      videoPlaceholder: "https://via.placeholder.com/1280x720?text=Anatomia+de+la+vid",
      keyPoints: [
        "La vid es una planta leñosa de la familia Vitaceae que vive 50-100 años",
        "La cepa es el conjunto de raíces y tronco principal de la vid",
        "El sistema radicular profundiza 3-5 metros en busca de agua y nutrientes",
        "Los sarmientos son los tallos verdes anuales que nacen del tronco",
        "El pámpano es el sarmiento herbáceo durante la vegetación",
        "Las yemas contienen el potencial de producción de la vid siguiente",
        "Las hojas tienen nervaduras palmadas y son caducifolias",
        "El racimo está compuesto por el raspón y los granos de uva",
        "La baya contiene pulpa, semillas y piel (hollejo) con propiedades distintas",
        "Los zarcillos permiten a la vid trepar naturalmente"
      ],
      quiz: [
        {
          question: "¿Cuántos años de vida aproximada tiene una vid bien cuidada?",
          options: ["20-30 años", "50-100 años", "200-300 años", "Indefinida"],
          correct: 1
        },
        {
          question: "¿Qué componente del racimo contiene principalmente taninos y compuestos aromáticos?",
          options: ["La pulpa", "El raspón", "La piel (hollejo)", "Las semillas"],
          correct: 2
        }
      ],
      content: "La vid es una planta leñosa perteneciente a la familia Vitaceae, caracterizada por su longevidad (50-100 años) y su capacidad de adaptarse a diversos terrenos. La cepa comprende el sistema radicular y el tronco leñoso. Las raíces se profundizan en el suelo buscando agua y nutrientes, alcanzando 3-5 metros de profundidad en condiciones favorables. El tronco, llamado cepa, puede medir varios metros de altura. Los sarmientos son los tallos anuales que nacen del tronco y el esqueleto de la madera, presentando un crecimiento herbáceo durante la vegetación (pámpano) y endureciéndose posteriormente. Las hojas tienen forma palmada con nervaduras características. El racimo es la estructura reproductiva, compuesto por el raspón (eje leñoso) y los granos de uva. Cada baya contiene pulpa jugosa, semillas y hollejo (piel). El hollejo contiene la mayoría de polifenoles, pigmentos y aromas. Los zarcillos permiten que la vid se enrosque naturalmente en soportes.",
      practicalExercise: "Visita un viñedo o consulta imágenes de una vid en diferentes estaciones. Dibuja o describe: la estructura general de la vid, el sistema radicular, los sarmientos, las hojas, el racimo y sus componentes. Etiqueta cada parte e indica su función en la producción de uva para vino."
    },
    {
      id: "m1-4",
      slug: "terroir-suelo-clima-altitud",
      title: "Terroir: suelo, clima y altitud",
      description: "Exploración del concepto de terroir y cómo los factores ambientales moldean el carácter del vino",
      duration: "13 minutos",
      videoPlaceholder: "https://via.placeholder.com/1280x720?text=Terroir",
      keyPoints: [
        "El terroir es el conjunto de características ambientales que definen la identidad de un vino",
        "El suelo proporciona agua, nutrientes y afecta el vigor de la vid",
        "Los suelos pizarrosos retienen calor y producen vinos aromáticos",
        "Los suelos calcáreos permiten vinos más ácidos y elegantes",
        "Los suelos arcillosos retienen mucha agua y favorecen vinos potentes",
        "El clima determina la madurez de la uva y el equilibrio alcohólico-ácido",
        "Las regiones frías producen vinos más ácidos y aromáticos",
        "Las regiones cálidas producen vinos más alcohólicos y concentrados",
        "La altitud modera la temperatura y aumenta la radiación solar",
        "La exposición y pendiente del viñedo influyen en la captación solar"
      ],
      quiz: [
        {
          question: "¿Cuál es la principal función del terroir en la producción de vino?",
          options: ["Determinar el precio de mercado", "Definir el conjunto de características ambientales que moldean la identidad del vino", "Influir en el etiquetado legal", "Determinar la duración de crianza"],
          correct: 1
        },
        {
          question: "¿Cómo afecta la altitud al cultivo de la vid?",
          options: ["Aumenta uniformemente las temperaturas", "Modera la temperatura y aumenta la radiación solar", "Disminuye la radiación solar", "No tiene efecto significativo"],
          correct: 1
        }
      ],
      content: "El terroir es un concepto fundamental en viticultura que engloba todos los factores ambientales que influyen en la vid y, consecuentemente, en las características del vino. El suelo es un componente crítico: determina la profundidad de enraizamiento, la disponibilidad de agua y nutrientes, y la textura del vino. Suelos pizarrosos retienen calor y producen vinos aromáticos y minerales. Suelos calcáreos producen vinos más ácidos y elegantes. Suelos arcillosos retienen mucha agua, favoreciendo vinos más potentes. El clima, determinado por latitud, continentalidad y oceanidad, define la madurez alcanzable. Regiones frías producen vinos más ácidos y aromáticos; regiones cálidas producen vinos más alcohólicos. La altitud modera temperaturas extremas y aumenta radiación solar, mejorando maduración y complejidad. La exposición (sololeamiento) y pendiente influyen en cantidad de radiación recibida. Juntos, estos factores crean perfiles distintivos que permiten a los viticultores elegir las mejores prácticas.",
      practicalExercise: "Selecciona dos vinos de regiones distintas (ej: Riojas de diferentes subzonas o vinos de diferentes países). Investiga el terroir de cada región: tipo de suelo, clima, altitud, exposición. Cata ambos vinos y anota diferencias en color, aroma y sabor. Relaciona las diferencias con las características del terroir de cada región."
    },
    {
      id: "m1-5",
      slug: "vendimia-cuando-como-recoger-uva",
      title: "Vendimia: cuándo y cómo recoger la uva",
      description: "Estudio de los criterios de madurez y los métodos de recolección de uvas para garantizar la calidad",
      duration: "10 minutos",
      videoPlaceholder: "https://via.placeholder.com/1280x720?text=Vendimia",
      keyPoints: [
        "La vendimia es la recolección de uvas, momento crítico que determina la calidad del futuro vino",
        "La madurez tecnológica se alcanza cuando los azúcares llegan a niveles óptimos",
        "El grado Brix mide el contenido de azúcares en la uva",
        "La madurez fenólica implica el desarrollo completo de taninos y pigmentos",
        "La madurez aromática es esencial para vinos aromáticos de calidad",
        "La vendimia manual permite seleccionar racimos individuales y controlar calidad",
        "La vendimia mecánica es eficiente pero afecta menos la selección",
        "Las uvas deben recolectarse en condiciones de frescura óptima",
        "El horario de vendimia influye en temperatura y características del mosto",
        "La logística post-cosecha es crítica para preservar la calidad"
      ],
      quiz: [
        {
          question: "¿Qué mide la escala Brix en el contexto de la vendimia?",
          options: ["La acidez total", "El contenido de azúcares", "El pH", "La concentración de taninos"],
          correct: 1
        },
        {
          question: "¿Cuál es la principal ventaja de la vendimia manual frente a la mecánica?",
          options: ["Es más rápida", "Permite seleccionar racimos individuales y controlar calidad", "Es menos costosa", "Produce mostos de mayor alcohol"],
          correct: 1
        }
      ],
      content: "La vendimia es la recolección de uvas y constituye uno de los momentos más críticos en la cadena de producción del vino. El momento de vendimia se determina evaluando varios indicadores de madurez. La madurez tecnológica se alcanza cuando el contenido de azúcares (medido en grados Brix) ha llegado a niveles suficientes, típicamente 20-24 Brix en uvas de vino tranquilo. La madurez fenólica implica el desarrollo completo de taninos (en tintas) y la estabilización de pigmentos. La madurez aromática es especialmente importante en vinos aromáticos. Existen dos métodos principales: vendimia manual, que permite seleccionar racimos individuales y controlar calidad de forma exhaustiva, y vendimia mecánica, más eficiente pero menos selectiva. El momento del día influye en la temperatura de la uva: vendimias nocturnas o tempranas preservan frescura. La integridad de la baya también es crítica: uvas dañadas oxidan rápidamente. La logística post-cosecha debe minimizar tiempos entre recolección y procesamiento.",
      practicalExercise: "Contacta con una bodega cercana y solicita información sobre su proceso de vendimia: cuándo vendimian, qué criterios usan, si es manual o mecánica, qué temperatura tienen las uvas. Si es posible, participa en una vendimia real o visualiza videos profesionales. Documenta el proceso y reflexiona sobre cómo afecta estos pasos a la calidad del vino final."
    },
    {
      id: "m1-6",
      slug: "vinificacion-en-blanco",
      title: "Vinificación en blanco",
      description: "Proceso de elaboración de vinos blancos, desde vendimia hasta embotellado",
      duration: "14 minutos",
      videoPlaceholder: "https://via.placeholder.com/1280x720?text=Vinificacion+blanco",
      keyPoints: [
        "La vinificación en blanco se caracteriza por la separación inmediata del hollejo",
        "El despalillado separa las uvas del raspón",
        "El estrujado rompe el hollejo liberando el mosto",
        "La maceración en frío puede usarse antes de la fermentación para extrae aromas",
        "La clarificación del mosto mejora la calidad y presenta defectos",
        "La fermentación ocurre a temperaturas controladas (12-18°C) para preservar aromas",
        "Las levaduras naturales o seleccionadas convierten azúcares en alcohol",
        "El débourbage separa lías gruesas para mejorar calidad",
        "La crianza en barrica o acero inoxidable define el carácter final",
        "La estabilización y clarificación final preparan el vino para embotellado"
      ],
      quiz: [
        {
          question: "¿Cuál es la característica principal que diferencia la vinificación en blanco?",
          options: ["Mayor fermentación", "Separación inmediata del hollejo", "Uso obligatorio de barrica", "Maduración más larga"],
          correct: 1
        },
        {
          question: "¿A qué rango de temperatura se lleva típicamente la fermentación de vinos blancos?",
          options: ["5-10°C", "12-18°C", "20-25°C", "25-30°C"],
          correct: 1
        }
      ],
      content: "La vinificación en blanco es un proceso diseñado para preservar frescura, aroma y cristalinidad. Comienza con vendimia en condiciones de máxima frescura. Tras el despalillado (separación de raspón), el estrujado suave rompe el hollejo sin machacar semillas (que aportan amargor). El mosto se clarifica rápidamente mediante sedimentación o centrifugación para separar materia sólida. Algunos vinos se benefician de una maceración en frío (skin contact) controlada antes de fermentación para extraer aromas y precursores aromáticos. La fermentación se realiza a temperaturas controladas bajas (12-18°C) en depósitos de acero inoxidable o madera neutra, preservando aromas volátiles. Se utiliza débourbage selectivo (separación de lías gruesas) a mitad de fermentación. Tras fermentación alcohólica, puede ocurrir fermentación maloláctica opcional. La crianza puede ser en barrica (aportando complejidad), acero inoxidable (preservando pureza) o ambos. La estabilización y clarificación finales preceden al embotellado.",
      practicalExercise: "Compara dos vinos blancos: uno criado en acero inoxidable y otro en barrica (ej: Riesling vs Chardonnay barricado). Analiza color, aroma e sabor. Nota cómo la ausencia o presencia de crianza en barrica afecta la complejidad. Reflexiona sobre el carácter que cada método imprime al vino."
    },
    {
      id: "m1-7",
      slug: "vinificacion-en-tinto",
      title: "Vinificación en tinto",
      description: "Proceso de elaboración de vinos tintos, enfatizando la extracción de color, taninos y sabores",
      duration: "15 minutos",
      videoPlaceholder: "https://via.placeholder.com/1280x720?text=Vinificacion+tinto",
      keyPoints: [
        "La vinificación en tinto mantiene el contacto prolongado entre mosto y hollejo",
        "Los antocianinos en el hollejo proporcionan color al vino",
        "Los taninos se extraen del hollejo, semillas y raspón",
        "La maceración pre-fermentativa puede durar días para extraer compuestos",
        "La fermentación en tinto dura típicamente 7-21 días",
        "El remontaje (delestage) homogeniza el mosto y extrae más compuestos",
        "La fermentación maloláctica es común en vinos tintos",
        "El descube separa vino de orujo tras fermentación",
        "La crianza en barrica de roble añade complejidad y suaviza taninos",
        "El ensamblaje combina diferentes lotes para optimizar calidad"
      ],
      quiz: [
        {
          question: "¿Cuál es el principal factor que diferencia la vinificación en tinto de la blanca?",
          options: ["Mayor contenido de alcohol", "Contacto prolongado entre mosto y hollejo", "Fermentación más larga", "Uso obligatorio de barrica"],
          correct: 1
        },
        {
          question: "¿Qué compuestos del hollejo son responsables del color en vinos tintos?",
          options: ["Taninos", "Antocianinos", "Ácidos", "Levaduras"],
          correct: 1
        }
      ],
      content: "La vinificación en tinto se caracteriza por el contacto prolongado entre mosto y hollejo, permitiendo extracción completa de color (antocianinos), taninos y compuestos aromáticos. Tras vendimia y despalillado, el estrujado libera mosto que comienza a fermentar con levaduras naturales o seleccionadas. La maceración pre-fermentativa puede durar días, extrayendo compuestos antes de que inicie fermentación. Durante fermentación (típicamente 7-21 días a 20-28°C), los azúcares se convierten en alcohol. El sombrero de orujo (materia sólida flotante) se remonta (bombea arriba) o sumerge para homogenizar mosto y extraer más compuestos. Tras fermentación alcohólica, ocurre fermentación maloláctica, transformando ácido málico en ácido láctico más suave. El descube separa vino de orujo. El vino joven pasa a crianza en barrica de roble (típicamente 12-24 meses), donde oxida lentamente, suaviza taninos y gana complejidad. El ensamblaje combina diferentes lotes por viñedo, cepa o año para optimizar perfil final.",
      practicalExercise: "Cata dos vinos tintos: uno joven (menos de 1 año) y uno con crianza en barrica (mínimo 12 meses). Compara: color (tono y opacidad), aromas (frutal vs tostado/especiado), sabor (taninos ásperos vs integrados), estructura. Documenta cómo el tiempo y la barrica transforman el vino."
    },
    {
      id: "m1-8",
      slug: "vinificacion-en-rosado",
      title: "Vinificación en rosado",
      description: "Técnicas de elaboración de vinos rosados, equilibrio entre blanco y tinto",
      duration: "10 minutos",
      videoPlaceholder: "https://via.placeholder.com/1280x720?text=Vinificacion+rosado",
      keyPoints: [
        "Los vinos rosados se elaboran con uvas tintas pero sin maceración prolongada",
        "El color proviene de una maceración controlada del hollejo (4-24 horas típicamente)",
        "El objetivo es extraer color y algunos taninos sin sobreextraer",
        "Los vinos rosados secos son los más apreciados actualmente",
        "La fermentación es similar a la de blancos: fresca y controlada",
        "El rosado requiere uvas de buena calidad para equilibrio",
        "El color final depende de la cepa, pH y duración de maceración",
        "Los vinos rosados son versátiles en maridaje gastronómico",
        "No se recomiendan crianzas largas en barrica para rosados clásicos",
        "El embotellado se realiza joven para preservar frescura y aroma"
      ],
      quiz: [
        {
          question: "¿Cuánto tiempo típicamente se macera el hollejo en la elaboración de vino rosado?",
          options: ["1-3 horas", "4-24 horas", "3-7 días", "7-14 días"],
          correct: 1
        },
        {
          question: "¿Cuál es el objetivo principal de la maceración en rosados?",
          options: ["Fermentar completamente", "Extraer solo color y algunos taninos", "Desarrollar aromas complejos", "Aumentar contenido de alcohol"],
          correct: 1
        }
      ],
      content: "Los vinos rosados ocupan una posición intermedia entre blancos y tintos, elaborándose con uvas tintas pero sin la maceración prolongada de éstos. El proceso comienza con vendimia de uvas tintas de calidad. Tras despalillado y estrujado, el mosto permanece en contacto con el hollejo durante 4-24 horas (según color deseado), extrayendo color mediante antocianinos y algunos taninos sin desarrollar estructura tánica pesada. La duración es crítica: menor maceración produce rosados más pálidos y aromáticos; mayor maceración produce tonos más profundos. Tras alcanzar color óptimo, se realiza sangrado y separación del mosto. La fermentación procede como en blancos: temperaturas bajas (12-18°C) en acero inoxidable para preservar aromas frescos. La fermentación maloláctica es menos común. Los rosados no requieren crianza en barrica (aunque algunos productores lo hacen para mayor complejidad). Se embotellan jóvenes (mismo año o siguiente) para preservar frescura. Los vinos rosados secos de calidad son altamente apreciados actualmente, especialmente en Francia (Provenza).",
      practicalExercise: "Compara tres rosados de diferentes regiones o estilos (ej: Provenza pálido, Navarra más profundo, Tinto de Verano). Analiza: intensidad de color, aromas (frutas rojas vs cítricas), equilibrio entre frescura y cuerpo. Nota cómo la duración de maceración y fermentación influyen en el perfil final."
    },
    {
      id: "m1-9",
      slug: "elaboracion-espumosos-tradicional-charmat",
      title: "Elaboración de espumosos: método tradicional y charmat",
      description: "Procesos de carbonatación para producción de vinos espumosos de calidad",
      duration: "13 minutos",
      videoPlaceholder: "https://via.placeholder.com/1280x720?text=Elaboracion+espumosos",
      keyPoints: [
        "Los espumosos requieren presión mínima de 3 atmósferas en la botella",
        "El método tradicional implica segunda fermentación en botella",
        "El licor de tirage es una mezcla de vino base, azúcar y levaduras seleccionadas",
        "La crianza sobre lías ocurre meses o años después de segunda fermentación",
        "La autolisis de levaduras aporta aromas complejos de pan y frutos secos",
        "El método Charmat usa depósitos cerrados para segunda fermentación",
        "El método Charmat es más rápido y económico que tradicional",
        "El remuage tradicional elimina el sedimento por rotación manual",
        "El degüelle separa el tapón y sedimento de levadura",
        "El licor de expedición ajusta dulzura final del espumoso"
      ],
      quiz: [
        {
          question: "¿Cuál es la presión mínima requerida en botella para que un vino sea considerado espumoso?",
          options: ["1 atmósfera", "2 atmósferas", "3 atmósferas", "5 atmósferas"],
          correct: 2
        },
        {
          question: "¿Cuál es la principal diferencia entre método tradicional y Charmat?",
          options: ["El tipo de uva", "El lugar donde ocurre la segunda fermentación", "La duración total", "El contenido de alcohol"],
          correct: 1
        }
      ],
      content: "Los vinos espumosos resultan de la carbonatación del vino mediante dióxido de carbono, ya sea natural (segunda fermentación) o inyectado. El método tradicional (Champenoise en Champagne) comienza con vino base de calidad, típicamente más ácido. Se añade licor de tirage (mezcla de vino base, azúcar y levaduras seleccionadas) y se embotella herméticamente. La segunda fermentación ocurre lentamente en botella (meses a años), produciendo CO2 que permanece disuelto bajo presión. Tras fermentación, el vino envejece sobre sus propias lías de levadura, desarrollando aromas complejos de pan, brioche y frutos secos. El remuage (giro manual de botellas) va concentrando sedimento en el cuello. El degüelle congela el cuello, expulsando sedimento bajo presión. El licor de expedición ajusta dulzura final. El método Charmat utiliza depósitos cerrados de acero inoxidable para segunda fermentación, más rápido (semanas) y económico. El CO2 se inyecta desde el depósito directamente a botellas. Produce espumosos frescos y frutales, ideal para consumo próximo.",
      practicalExercise: "Cata un Champagne o espumoso de método tradicional y un espumoso de método Charmat (ej: Prosecco). Compara: tipo de burbuja (tamaño, persistencia), aromas (frutal/floral vs pan/tostado), sabor (elegante/complejo vs fresco/simple). Investiga el proceso de cada bodega. Reflexiona sobre cómo el método afecta el resultado final."
    },
    {
      id: "m1-10",
      slug: "vinos-dulces-generosos",
      title: "Vinos dulces y generosos",
      description: "Elaboración de vinos dulces naturales, fortificados y generosos, técnicas especiales",
      duration: "12 minutos",
      videoPlaceholder: "https://via.placeholder.com/1280x720?text=Vinos+dulces+generosos",
      keyPoints: [
        "Los vinos dulces contienen azúcares residuales sin fermentar completamente",
        "Los vinos de postre pueden ser dulces naturales o fortificados",
        "La botrytis cinerea produce uvas pasificadas con concentración de azúcares",
        "Los vinos dulces naturales detienen fermentación aumentando alcohol",
        "Los vinos generosos reciben adición de alcohol (alcohol vínico o destilado)",
        "El Jerez es fortificado después de fermentación completa",
        "El Oporto es fortificado durante fermentación para retener dulzura",
        "Los vinos de hielo se elaboran con uvas congeladas en vid",
        "La pasificación natural concentra azúcares en uvas deshidratadas",
        "Estos vinos envejecen bien gracias a su contenido de azúcares y alcohol"
      ],
      quiz: [
        {
          question: "¿Cuál es la característica distintiva de los vinos generosos?",
          options: ["Mayor contenido de azúcar", "Adición de alcohol vínico o destilado", "Largo envejecimiento", "Elaboración con uvas nobles"],
          correct: 1
        },
        {
          question: "¿Qué hongo produce la pasificación que concentra azúcares en vinos dulces?",
          options: ["Penicillium", "Aspergillus", "Botrytis cinerea", "Saccharomyces"],
          correct: 2
        }
      ],
      content: "Los vinos dulces y generosos representan una categoría diversa con métodos específicos. Los vinos dulces naturales se elaboran interrumpiendo fermentación cuando quedan azúcares residuales significativos, típicamente aumentando alcohol para parar la fermentación o mediante filtración. La botrytis cinerea (hongo noble) concentra azúcares en uvas, produciendo vinos de Sauternes u otros dulces complejos. Los vinos fortificados reciben adición de alcohol vínico (96% alcohol), elevando gradación a 15-22%. El Jerez se fortifica tras fermentación completa, desarrollando estilos secos (Fino) hasta dulces (Pedro Ximénez). El Oporto se fortifica durante fermentación, conservando dulzura natural. Los vinos de hielo (Eiswein, Ice Wine) se elaboran vendimiendo uvas congeladas naturalmente en vid, concentrando azúcares. La pasificación concentra azúcares mediante deshidratación natural o controlada. Estos vinos envejecen excepcionalmen debido a su equilibrio: el azúcar proporciona cuerpo y dulzura, el alcohol proporciona estabilidad, los ácidos evitan empalagosidad. Muchos mejoran significativamente con años o décadas de crianza.",
      practicalExercise: "Cata tres vinos dulces de diferentes tipos: uno de botrytis (Sauternes o Tokaji), uno de pasificación (Amarone o Moscato passito) y uno generoso (Jerez, Oporto o Madeira). Compara: color (profundidad), viscosidad, aromas (frutas cocidas, especias, nueces), dulzura percibida, equilibrio final. Anota cómo cada método aporta características únicas."
    },
    {
      id: "m1-11",
      slug: "crianza-barrica-botella",
      title: "Crianza en barrica y botella",
      description: "Procesos de envejecimiento y su impacto en la complejidad, estructura y evolución del vino",
      duration: "13 minutos",
      videoPlaceholder: "https://via.placeholder.com/1280x720?text=Crianza+barrica+botella",
      keyPoints: [
        "La crianza en barrica permite microoxidación controlada del vino",
        "El roble aporta aromas (vainilla, especias, tostado) y taninos",
        "Las barricas nuevas aportan más sabor que las usadas o neutras",
        "La capacidad típica de barrica de roble es 225 litros (Burdeos) o 300 (Borgoña)",
        "El time en barrica varía según cepa y estilo (6 meses a 3 años)",
        "El tostado de barrica (bajo, medio, alto) influye en aromas finales",
        "La crianza en botella es reductora (sin oxígeno) y más lenta",
        "La botella protege el vino de luz e permite evolución terciaria",
        "Los depósitos de acero inoxidable preservan frescura sin aportar sabor",
        "El embotellado es paso crítico: se clarifica y estabiliza antes"
      ],
      quiz: [
        {
          question: "¿Cuál es la principal función de la crianza en barrica de roble?",
          options: ["Aumentar contenido de alcohol", "Microoxidación controlada y aporte de sabores de roble", "Eliminar defectos", "Reducir acidez"],
          correct: 1
        },
        {
          question: "¿Cuál es el tipo de crianza que ocurre en botella?",
          options: ["Oxidativa", "Reductora", "Neutra", "Fermentativa"],
          correct: 1
        }
      ],
      content: "La crianza es el período de envejecimiento controlado que desarrolla complejidad, suaviza taninos y potencia aromas. La crianza en barrica de roble es oxidativa: permite microoxidación del vino, transformando radicales libres y desarrollando sabores. El roble aporta compuestos aromáticos naturales (vanilina, eugenol) y taninos adicionales. Las barricas nuevas aportan máximo sabor; barricas usadas o neutras permiten crianza sin dominancia de roble. El tostado (bajo, medio, alto) de la barrica durante fabricación influye en perfiles aromáticos finales. La duración en barrica varía: vinos blancos 6-12 meses, tintos 12-36 meses según estructura y objetivos. La crianza en botella es reductora: sin oxígeno, permitiendo evolución lenta y compleja de aromas (terciarios: cuero, champiñón, tabaco). La botella protege del luz. Los depósitos de acero inoxidable preservan frescura sin aportar sabores adicionales, usados cuando se busca máxima expresión de fruta. El embotellado requiere clarificación y estabilización previas para eliminar partículas finas que podrían evolucionar negativamente.",
      practicalExercise: "Compara tres vinos del mismo tipo de uva pero con diferentes tratamientos de crianza: uno sin barrica (acero inoxidable), uno con barrica nueva, uno con barrica usada o viejo. Analiza aromas (frutal vs tostado/vainilla), estructura, evolución en boca. Reflexiona sobre cómo la barrica y el tiempo transforman el vino."
    },
    {
      id: "m1-12",
      slug: "20-uvas-tintas-esenciales",
      title: "Las 20 uvas tintas esenciales",
      description: "Estudio detallado de las principales variedades de uva tinta, sus características y perfiles sensoriales",
      duration: "15 minutos",
      videoPlaceholder: "https://via.placeholder.com/1280x720?text=Uvas+tintas+esenciales",
      keyPoints: [
        "Cabernet Sauvignon: estructura tánnica, aromas de cassis y especias, originaria Burdeos",
        "Merlot: suavidad, aromas de ciruela, versatilidad, cultivada globalmente",
        "Pinot Noir: elegancia, aromas frutales, acidez viva, exigente en cultivo",
        "Syrah/Shiraz: potencia, aromas de fruta negra y especias, varía por región",
        "Grenache: cuerpo medio, aromas frutales, importante en Ródano",
        "Tempranillo: aromas especiados, importante en Rioja y Ribera del Duero",
        "Nebbiolo: taninos duros, aromas de alquitrán/rosa, Piamonte",
        "Sangiovese: acidez, aromas terrosos, varietal toscana esencial",
        "Barbera: acidez refrescante, aromas frutales, Piamonte",
        "Gamay: frutalidad, baja tannicidad, varietal Beaujolais",
        "Winzerbank: taninos suaves, aromas varietales, Alemania",
        "Carmenere: estructura, especias, originaria Chile",
        "Malbec: taninos potentes, aromas de ciruela negra, Argentina",
        "Petit Verdot: taninos firmes, aromas florales, Burdeos",
        "Carignan: rusticidad, aromas profundos, viñas viejas especiales",
        "Monastrell/Mourvèdre: aromas de hierbas, estructura firme, Mediterráneo",
        "Cannonau/Grenache negro: versatilidad, aromas frutal",
        "Mencía: acidez, aromas especiados, Bierzo",
        "Aglianico: taninos rústicos, aromas profundos, Sur Italia",
        "Blend: combinaciones estratégicas de variedades para equilibrio óptimo"
      ],
      quiz: [
        {
          question: "¿Cuál de estas uvas tintas es caracterizada por su exigencia en cultivo y aromas frutales delicados?",
          options: ["Cabernet Sauvignon", "Merlot", "Pinot Noir", "Syrah"],
          correct: 2
        },
        {
          question: "¿De cuál región es originaria la uva Tempranillo, importante para vinos españoles?",
          options: ["Francia", "Italia", "España (Rioja, Ribera del Duero)", "Argentina"],
          correct: 2
        }
      ],
      content: "Las uvas tintas esenciales definen los grandes vinos del mundo. Cabernet Sauvignon destaca por estructura tánnica firme, aromas de cassis, ciruela negra y especias, originaria de Burdeos. Merlot ofrece suavidad, frutalidad de ciruela madura y adaptabilidad global. Pinot Noir es elegante, exigente, con aromas de frutas rojas frescas y acidez vivaz, reina en Borgoña. Syrah/Shiraz aporta potencia, aromas de fruta negra, pimienta y especias; varía dramáticamente por clima. Grenache combina cuerpo medio con frutalidad, importante en Ródano Sur. Tempranillo es fundamental en Rioja, con aromas especiados y crianza magnifica en barrica. Nebbiolo produce taninos duros y complejos, con aromas de alquitrán y rosa, Piamonte. Sangiovese toscana aporta acidez y aromas terrosos característicos. Barbera refrescante con acidez jugosa. Gamay produce vinos frutales de baja tannicidad. Otras variedades regionales clave incluyen Carmenere (Chile), Malbec (Argentina), Mourvèdre (Mediterráneo), Aglianico (Sur Italia), Mencía (Bierzo). Los blends estratégicos combinan variedades para equilibrio óptimo.",
      practicalExercise: "Realiza una cata vertical de 6 uvas tintas diferentes (ej: Cabernet Sauvignon, Merlot, Pinot Noir, Tempranillo, Syrah, Malbec). De preferencia, vinos del mismo año y similar rango de precios. Analiza para cada uno: color, aromas primarios/secundarios, estructura (taninos, acidez, cuerpo), sabor, final. Documenta diferencias varietales. Reflexiona sobre cuál se adapta mejor a tus preferencias."
    },
    {
      id: "m1-13",
      slug: "20-uvas-blancas-esenciales",
      title: "Las 20 uvas blancas esenciales",
      description: "Estudio de las principales variedades de uva blanca, sus perfiles sensoriales y regiones de cultivo",
      duration: "15 minutos",
      videoPlaceholder: "https://via.placeholder.com/1280x720?text=Uvas+blancas+esenciales",
      keyPoints: [
        "Chardonnay: versatilidad, desde fresco a cremoso en barrica, Borgoña icónica",
        "Sauvignon Blanc: herbáceo, cítrico, aromas intensos, Loire",
        "Riesling: aromática, acidez vivaz, especial en climas fríos, Alemania",
        "Albariño: mineralidad, cítrico fresco, Rías Baixas España",
        "Pinot Grigio: ligereza, notas manzana-pera, versatilidad italiana",
        "Viura: mineralidad, acidez, Rioja blanca",
        "Verdejo: aromas herbáceos, estructura, Rueda España",
        "Gewürztraminer: aromaticidad intensa, notas florales, Alsacia",
        "Muscat/Moscatel: aromafloral, dulce natural o seco, muy frutal",
        "Chenin Blanc: versatilidad estilo (seco, dulce), Loire",
        "Grüner Veltliner: cítrico, pimienta blanca, Austria",
        "Vermentino: marino, mineralidad, Cerdeña",
        "Torrontés: aromafloral, Salta Argentina",
        "Verdicchio: mineralidad, estructura, Italia central",
        "Muscadet: ligereza, salado, Loire",
        "Soave: finura, almendra, Véneto",
        "Catarratto: cítrico, Sicilia",
        "Malvasía: versatilidad estilos, Canarias/otros",
        "Greco: mineralidad, complejidad, Sur Italia",
        "Blend blanco: armonía estratégica entre variedades complementarias"
      ],
      quiz: [
        {
          question: "¿Cuál de estas uvas blancas es caracterizada por herbaceidad e intensos aromas cítricos?",
          options: ["Chardonnay", "Sauvignon Blanc", "Riesling", "Albariño"],
          correct: 1
        },
        {
          question: "¿Qué característica define especialmente al Riesling alemán?",
          options: ["Baja acidez", "Aromaticidad y acidez vivaz", "Cuerpo pesado", "Aromas tostados"],
          correct: 1
        }
      ],
      content: "Las uvas blancas esenciales crean una paleta aromática y sensorial amplia. Chardonnay es la más versátil: fresca en acero inoxidable, cremosa en barrica, origen icónico Borgoña. Sauvignon Blanc destaca por herbaceidad y cítricos intensos, reina en Loire. Riesling es aromática con acidez vivaz, excelente en climas fríos, fundamental Alemania. Albariño aporta mineralidad y frescura cítrica, Rías Baixas. Pinot Grigio es ligera con notas de manzana-pera, versátil italiana. Viura combina mineralidad y acidez en Rioja. Verdejo presenta aromas herbáceos y estructura en Rueda. Gewürztraminer es intensamente aromática con notas florales, especial Alsacia. Muscat/Moscatel es frutal y floral, puede ser seco o dulce. Chenin Blanc es versátil en estilos desde seco a dulce. Grüner Veltliner ofrece cítricos y pimienta blanca, austriaca. Otras varietales regionales claves incluyen Vermentino (Cerdeña), Torrontés (Argentina), Verdicchio (Italia), Soave (Véneto), Greco (Sur Italia). Los blends blancos combinan variedades para equilibrio aromático y estructura.",
      practicalExercise: "Realiza una cata horizontal de 6 uvas blancas diferentes (ej: Chardonnay, Sauvignon Blanc, Riesling, Albariño, Pinot Grigio, Viura). De preferencia, vinos del mismo año. Analiza para cada uno: color (intensidad, tonalidad), aromas primarios (frutal, floral, herbáceo, mineral), acidez (vivaz vs suave), cuerpo, sabor, persistencia. Documenta variaciones. Reflexiona sobre perfiles y preferencias."
    },
    {
      id: "m1-14",
      slug: "introduccion-cata-vista-nariz-boca",
      title: "Introducción a la cata: vista, nariz y boca",
      description: "Método profesional de cata de vino, evaluando color, aroma y sabor sistemáticamente",
      duration: "14 minutos",
      videoPlaceholder: "https://via.placeholder.com/1280x720?text=Introduccion+cata",
      keyPoints: [
        "La cata de vino es una evaluación sensorial sistemática en tres fases: vista, nariz, boca",
        "La fase visual examina limpidez, color, intensidad, tonalidad y viscosidad",
        "La limpidez debe ser perfecta; turbidez sugiere defecto",
        "El color indica edad, cepa y estado oxidativo",
        "Los tonos anaranjados/marrones en blancos indican oxidación o edad",
        "Los tonos teja/marrón en tintos indican madurez",
        "La fase olfativa inicial (sin movimiento) percibe aromas volátiles primarios",
        "La fase olfativa tras movimiento aerea el vino, liberando aromas secundarios",
        "La copa tulipa o Burdeos concentra aromas hacia la nariz",
        "La cata en boca evalúa acidez, taninos, dulzura, cuerpo, persistencia",
        "La retención en boca 3-5 segundos permite percibir aromas retronasal",
        "El escupir es profesional para no emborracharse en cataciones extensas"
      ],
      quiz: [
        {
          question: "¿Cuáles son las tres fases principales de la cata de vino?",
          options: ["Color, sabor, aroma", "Vista, nariz, boca", "Olfato, gusto, olfato retronasal", "Blanco, tinto, rosado"],
          correct: 1
        },
        {
          question: "¿Qué indica la presencia de tonos anaranjados/marrones en un vino blanco?",
          options: ["Es normal", "Indica oxidación o envejecimiento avanzado", "Significa buena calidad", "Es un defecto severo"],
          correct: 1
        }
      ],
      content: "La cata de vino es una evaluación sensorial sistemática y objetiva que utiliza los sentidos para evaluar características. La fase visual comienza observando el vino contra luz blanca: se evalúa limpidez (debe ser cristalina; turbidez sugiere defecto), color (intensidad y tonalidad), y viscosidad (densidad de gotas en copa). El color indica cepa, edad y estado oxidativo. Tintos jóvenes son rojo rubí intenso; envejecidos adquieren tonos teja o marrón. Blancos jóvenes son amarillo pálido; envejecidos desarrollan tonos dorados o anaranjados. La fase olfativa implica dos momentos: primero, sin mover la copa (aromas volátiles primarios: frutas, flores); segundo, tras airear levemente (aromas secundarios: crianza, oxidación). Se reconocen aromas en familias (frutal, floral, especiada, mineral, tostada). La fase gustativa implica tomar pequeño sorbo y distribuirlo por toda la boca durante 3-5 segundos para evaluar: dulzura (residual), acidez (vivacidad), taninos (sequedad en tintos), cuerpo (peso sensorial), persistencia (final largo vs corto). La retención permite percibir aromas a través de vía retronasal. El escupir es técnica profesional cuando se catan múltiples vinos.",
      practicalExercise: "Obtén una botella de vino que no hayas catado antes. Prepara: copa clara, luz blanca, papel para notas, posibilidad de escupir. Realiza cata sistemática: (1) Examina visualmente: ¿limpidez?, ¿color exacto?, ¿tonalidad?, ¿viscosidad?. (2) Cata nariz sin movimiento, luego con aireación: ¿aromas primarios?, ¿secundarios? (3) Prueba pequeño sorbo, retén 5 segundos: ¿dulzura?, ¿acidez?, ¿taninos (si tinto)?, ¿cuerpo?, ¿persistencia?. Documenta todo sistemáticamente. Compara con tu proceso anterior si lo hiciste."
    },
    {
      id: "m1-15",
      slug: "vocabulario-cata-profesional",
      title: "Vocabulario de cata profesional",
      description: "Léxico especializado para describir aromas, sabores y características del vino",
      duration: "12 minutos",
      videoPlaceholder: "https://via.placeholder.com/1280x720?text=Vocabulario+cata",
      keyPoints: [
        "El vocabulario de cata es preciso, objetivo y replicable entre catadores",
        "Aromas primarios incluyen frutas (frutos rojos, negros, cítricos), flores (violeta, rosa)",
        "Aromas secundarios provienen de fermentación y crianza (levadura, mantequilla, tostado)",
        "Aromas terciarios resultan de envejecimiento: cuero, champiñón, tabaco, avellana",
        "Descriptores de acidez: vivaz (positivo), fresco, crudo (excesivo), plano (deficiente)",
        "Descriptores de taninos: presentes, firmes, suave, ásperos (excesivo), sedosos (integrados)",
        "Descriptores de cuerpo: ligero, medio, pleno, potente, alcohólico",
        "Descriptores de sabor: frutal, floral, especiado, mineral, herbáceo, tostado, cremoso",
        "Persistencia: corta (defecto), media (normal), larga (calidad), muy larga (excepcional)",
        "Equilibrio: armonía entre componentes; desequilibrio indica defecto o estilo particular"
      ],
      quiz: [
        {
          question: "¿A cuál categoría corresponde el aroma 'champiñón' en la clasificación de aromas de vino?",
          options: ["Primario", "Secundario", "Terciario", "Defecto"],
          correct: 2
        },
        {
          question: "¿Qué significa 'vivaz' como descriptor de acidez?",
          options: ["Acidez deficiente", "Acidez positiva y refrescante", "Acidez excesiva", "Ausencia de acidez"],
          correct: 1
        }
      ],
      content: "El vocabulario de cata profesional es objetivo, preciso y replicable, permitiendo comunicación clara entre catadores. Los aromas se clasifican en tres categorías por origen. Aromas primarios provienen de la uva: frutal (arándano, cereza, manzana, limón, naranja), floral (violeta, rosa, jazmín). Aromas secundarios resultan de fermentación y crianza: levadura, mantequilla, pan, tostado, vainilla. Aromas terciarios provienen de envejecimiento prolongado: cuero, champiñón, tabaco, avellana, frutos secos. Los descriptores de componentes son específicos: acidez vivaz (positiva), cruda (excesiva), plana (deficiente); taninos presentes (perceptibles), firmes (estructura), suaves (integrados), ásperos (excesivos); cuerpo ligero (delicado), medio (equilibrado), pleno (robusto), alcohólico (fuerte). La persistencia se mide en segundos o palabras: corta (defecto), media (normal para muchos vinos), larga (8-12 segundos, calidad), muy larga (más de 12 segundos, excepcional). El equilibrio describe armonía entre componentes; desequilibrio (exceso de taninos, acidez, alcohol) reduce apreciación. Estas descripciones permiten catalogación y comunicación consistente.",
      practicalExercise: "Cata 3 vinos distintos usando únicamente vocabulario profesional. Para cada uno, describe: aromas (primarios, secundarios, terciarios), acidez (descriptor específico), cuerpo (categoría), sabor (descriptores de familia aromática), persistencia (duración), equilibrio (comentario). Evita palabras coloquiales como 'delicioso' o 'rico'. Compara tus descripciones con las de un catador profesional si es posible."
    },
    {
      id: "m1-16",
      slug: "temperatura-servicio-cristaleria",
      title: "Temperatura de servicio y cristalería",
      description: "Técnicas de servicio correcto de vino, incluyendo temperatura y elección de copa adecuada",
      duration: "10 minutos",
      videoPlaceholder: "https://via.placeholder.com/1280x720?text=Temperatura+servicio+cristaleria",
      keyPoints: [
        "La temperatura de servicio influye drásticamente en percepción de aromas y sabor",
        "Vinos blancos secos: 7-10°C, fríos para preservar frescura",
        "Vinos tintos ligeros: 13-15°C, temperatura ambiente baja",
        "Vinos tintos potentes: 16-18°C, permitir expresión aromal completa",
        "Vinos espumosos: 6-8°C, muy fríos para preservar efervescencia",
        "Vinos dulces: 8-12°C, según dulzura y estilo",
        "Temperaturas excesivamente frías adormecer aromas y sabor",
        "Temperaturas excesivamente cálidas volatilizan aromas y desentonan alcohol",
        "La copa tulipa concentra aromas hacia la nariz",
        "La copa Burdeos es ancha para tintos complejos",
        "La copa Borgoña es más pequeña para vinos delicados",
        "La flauta para espumosos preserva efervescencia mejor que copa ancha"
      ],
      quiz: [
        {
          question: "¿Cuál es el rango de temperatura recomendado para servir un vino tinto potente?",
          options: ["10-12°C", "13-15°C", "16-18°C", "20-22°C"],
          correct: 2
        },
        {
          question: "¿Qué tipo de copa concentra aromas hacia la nariz?",
          options: ["Copa ancha tipo Burdeos", "Flauta para espumosos", "Copa tulipa", "Vaso recto"],
          correct: 2
        }
      ],
      content: "La temperatura de servicio es crítica y afecta dramáticamente la percepción sensorial. Vinos blancos secos deben servirse fríos (7-10°C) para preservar frescura, aroma y ligereza, aunque temperaturas menores adormecer aromas delicados. Vinos tintos ligeros (Pinot Noir, Gamay) se sirven a 13-15°C, temperatura ambiente moderada. Vinos tintos potentes (Cabernet, Syrah) requieren 16-18°C para expresión completa de aromas y estructurales sin volatilizar alcohol. Vinos generosos y dulces se sirven a 8-12°C según estilo: Jerez fino más frío, Pedro Ximénez menos frío. Espumosos se sirven muy fríos (6-8°C) para preservar efervescencia y refrescancia. Temperaturas excesivas volatilizan aromas y desentonan alcohol; temperaturas insuficientes adormecer sabores. La cristalería también es crucial. Copa tulipa estándar concentra aromas hacia la nariz. Copa Burdeos es más ancha para tintos complejos permitiendo aireación. Copa Borgoña es más pequeña para vinos delicados como Pinot Noir. Flauta para espumosos preserva efervescencia mejor que copa ancha de espumosos. El material debe ser cristal transparente para evaluar color.",
      practicalExercise: "Sirve el mismo vino blanco a tres temperaturas diferentes (8°C, 12°C, 16°C) y prueba cada uno. Nota cómo la temperatura afecta aroma, sabor, acidez percibida. Repite con un vino tinto a 13°C, 16°C, 19°C. Documenta cambios. Experimenta con diferentes tipos de copa para mismo vino si es posible. Reflexiona sobre importancia del servicio correcto."
    },
    {
      id: "m1-17",
      slug: "descorche-decantacion",
      title: "Descorche y decantación",
      description: "Técnicas profesionales de apertura de botellas y decantación para optimizar sabor",
      duration: "11 minutos",
      videoPlaceholder: "https://via.placeholder.com/1280x720?text=Descorche+decantacion",
      keyPoints: [
        "El descorche correcto requiere sacacorchos adecuado y técnica firme",
        "El sacacorchos de dos brazos es óptimo para vinos antiguos con corcho frágil",
        "La lámina de corte debe cortar cápsula bajo el labio de botella",
        "Se debe extraer corcho lentamente para evitar fragmentación",
        "Fragancias negras pueden indicar degradación de corcho (corcho en punta)",
        "La decantación es separación física del vino de sedimentos",
        "Los vinos tintos jóvenes potentes se decantean para aireación",
        "Los vinos envejecidos se decantean suavemente para separar sedimento",
        "La decantación requiere luz (vela o linterna) para ver sedimento",
        "Los vinos envejecidos reclaman 15-30 minutos tras decantación",
        "La decantación es arte: requiere práctica para efectuarla sin turbidez"
      ],
      quiz: [
        {
          question: "¿Cuál es el objetivo principal de la decantación en vinos envejecidos?",
          options: ["Areación", "Separación de sedimentos", "Enfriamiento", "Oxidación forzada"],
          correct: 1
        },
        {
          question: "¿Qué herramienta es óptima para descorchar vinos antiguos con corcho frágil?",
          options: ["Sacacorchos simple", "Sacacorchos de dos brazos", "Abridor de laminilla", "Bomba de aire"],
          correct: 1
        }
      ],
      content: "El descorche es arte y técnica que requiere precisión. El sacacorchos es fundamental: el modelo de dos brazos es óptimo para vinos antiguos con corcho frágil, permitiendo extracción controlada. El sacacorchos de espiral simple funciona para vinos modernos. El proceso: se coloca lámina de corte bajo labio de botella, cortando cápsula. Se atornilla espiral en corcho firmemente sin perforarlo completamente. Se extrae lentamente, evitando fragmentación. Un corcho en punta negra puede indicar degradación (corcho en punta / cork taint). La decantación es separación física del vino de sedimentos, especialmente importante en vinos tintos envejecidos. Los vinos tintos jóvenes potentes se decantean también para aireación, exponiendo vino al aire rápidamente. Los vinos envejecidos requieren decantación suave para minimizar disturbancia. La técnica: luz (vela pequeña bajo botella) permite ver sedimento aproximándose. Se vierte lentamente en decantador, deteniéndose cuando sedimento alcanza cuello. Los vinos envejecidos se dejan reposar 15-30 minutos tras decantación, permitiendo sedimentación de partículas liberadas.",
      practicalExercise: "Practica descorche de al menos 3 botellas de vino vacías o con vino de bajo precio. Perfecciona técnica de sacacorchos, corte de cápsula, extracción suave. Si tienes acceso a vino envejecido o reserva con sedimento visible, practica decantación: necesitarás decantador, luz, movimiento lento y controlado. Documenta sedimento separado. Reflexiona sobre cómo estas técnicas afectan la experiencia de cata."
    },
    {
      id: "m1-18",
      slug: "defectos-vino-como-identificarlos",
      title: "Defectos del vino: cómo identificarlos",
      description: "Reconocimiento y análisis de defectos comunes en vino, causas e implicaciones",
      duration: "12 minutos",
      videoPlaceholder: "https://via.placeholder.com/1280x720?text=Defectos+vino",
      keyPoints: [
        "El corcho en punta (cork taint) produce aroma a papel mojado, causado por TCA",
        "La oxidación no deseada produce aromas apagados, color marrón prematuro",
        "La maderización es oxidación severa en tintos (color teja prematuro)",
        "Las referencias (brettanomyces) producen aromas animales indeseados",
        "La turbidez puede indicar defecto microbiológico o precipitación proteínica",
        "La refermentación en botella produce vinos efervescentes no deseados",
        "El picado acético (vinagre) resulta de oxidación incontrolada",
        "La vejez excesiva produce vinos planos, desteñidos, sin frescura",
        "La falta de acidez produce vinos planos y flácidos",
        "El exceso de SO2 residual produce aromas sulfurosos desagradables"
      ],
      quiz: [
        {
          question: "¿Cuál es la causa del defecto conocido como 'corcho en punta'?",
          options: ["Mala fermentación", "TCA (tricloroanisol) en el corcho", "Falta de SO2", "Botella rota"],
          correct: 1
        },
        {
          question: "¿Qué aroma produce el defecto de 'corcho en punta'?",
          options: ["Papel mojado", "Vinagre", "Azufre", "Animal"],
          correct: 0
        }
      ],
      content: "Los defectos del vino son problemas que afectan sabor, aroma u aspecto, reduciendo calidad. El corcho en punta (cork taint) es el más común: TCA (tricloroanisol), compuesto químico en corcho degradado, produce aroma a papel mojado/humedad y adormecimiento de aromas. La oxidación no deseada (falta de SO2 protector) produce aromas apagados, manzana oxidada, color marrón prematuro en blancos. La maderización es oxidación severa en tintos viejos: color teja prematuro, aromas cocidos. Las referencias (brettanomyces, levadura salvaje) producen aromas animales indeseados (cuero, establo), más común en vinos sin SO2 suficiente. La turbidez indica defecto microbiológico, precipitación proteínica o partículas grandes; debe ser cristalina. La refermentación en botella produce vinos efervescentes accidentales, causada por azúcar residual y levaduras vivas. El picado acético (vinagre) resulta de bacterias acéticas oxidando alcohol a ácido acético. La vejez excesiva produce vinos planos, color desteñido, sin frescura: problema común en vinos guardados a temperatura variable. La falta de acidez produce vinos flácidos sin estructura (fermentación maloláctica excesiva). Exceso de SO2 residual produce aromas sulfurosos desagradables (fósforos, huevo podrido).",
      practicalExercise: "Si es posible, obtén ejemplos de vinos con defectos conocidos (ej: corcho en punta, oxidación, refermentación) de bodegas o amigos catadores. Analiza cada uno: ¿qué detectas visualmente?, ¿qué aromas inusuales?, ¿qué cambios en sabor?. Documenta cada defecto identificado. Si no tienes acceso a vinos defectuosos, visualiza videos profesionales de cata de vinos defectuosos. Aprende a reconocer rápidamente para asesorar correctamente a clientes."
    },
    {
      id: "m1-19",
      slug: "lectura-etiquetas-contraetiquetas",
      title: "Lectura de etiquetas y contraetiquetas",
      description: "Interpretación de información obligatoria y voluntaria en etiquetas de vino",
      duration: "10 minutos",
      videoPlaceholder: "https://via.placeholder.com/1280x720?text=Lectura+etiquetas",
      keyPoints: [
        "Las etiquetas contienen información obligatoria por ley en la mayoría de países",
        "La denominación de origen es regulada y garantiza procedencia y método",
        "El productor (marca) y embotellador deben especificarse",
        "El año de cosecha (añada) indica la edad del vino",
        "El grado alcohólico volumétrico debe expresarse en % vol",
        "El volumen debe indicarse (típicamente 750ml, 375ml, 1.5L)",
        "Las advertencias de salud (alergenos) son obligatorias en muchos países",
        "Las contraetiquetas aportan información comercial: notas de cata, maridaje, historia",
        "Algunas menciones (Reserva, Gran Reserva) tienen significado legal en España",
        "La lectura experta de etiquetas permite evaluación preliminar de calidad y autenticidad"
      ],
      quiz: [
        {
          question: "¿Cuál de estos datos es OBLIGATORIO que aparezca en la etiqueta de un vino?",
          options: ["Notas de cata", "Grado alcohólico volumétrico", "Historia del productor", "Recomendaciones de maridaje"],
          correct: 1
        },
        {
          question: "¿Qué información aporta típicamente una contraetiqueta?",
          options: ["Obligaciones legales", "Información comercial, notas de cata y maridaje", "Solo el precio", "Datos de producción detallados"],
          correct: 1
        }
      ],
      content: "Las etiquetas de vino contienen información obligatoria regulada por ley (UE) y voluntaria (comercial). Información obligatoria: denominación de origen (garantiza procedencia, método, regulaciones aplicables), productor/embotellador (identidad responsable), volumen (750ml estándar), grado alcohólico % vol (precisión a 0.5°), año de cosecha/añada (identifica envejecimiento), advertencias de salud (alérgenos como SO2, sulfitos). En España, Reserva significa mínimo 3 años envejecimiento; Gran Reserva significa mínimo 5-6 años. Información voluntaria en contraetiquetas: notas de cata (aromas, sabores), historia productora, recomendaciones de maridaje, temperatura servicio. Una lectura experta de etiqueta permite evaluación preliminar: denominación prestigiosa sugiere calidad regulada; año reciente sugiere vino fresco; grado alcohólico alto sugiere región cálida. Contraetiqueta detallada y profesional sugiere bodega de calidad comprometida.",
      practicalExercise: "Reúne 5 botellas de vino diferentes. Examina cuidadosamente etiqueta frontal: ¿qué información legal está presente?, ¿qué denominación tiene?, ¿qué año?, ¿qué grado alcohólico?. Revisa contraetiqueta: ¿qué información comercial proporciona?, ¿notas de cata?, ¿maridaje sugerido?. Documenta información de todas las botellas. Compara claridad y profesionalismo de presentación. Reflexiona sobre cómo etiqueta predice posible calidad/estilo."
    },
    {
      id: "m1-20",
      slug: "denominaciones-origen-sistema-espanol-europeo",
      title: "Denominaciones de origen: sistema español y europeo",
      description: "Estudio del sistema de denominaciones de origen, regulaciones y garantías de calidad",
      duration: "13 minutos",
      videoPlaceholder: "https://via.placeholder.com/1280x720?text=Denominaciones+origen",
      keyPoints: [
        "Las denominaciones de origen protegen identidad geográfica y calidad",
        "La UE clasifica vinos en categorías: sin denominación, IGP, DOP",
        "DOP (Denominación de Origen Protegida) es el estándar más regulado",
        "En España, DO (Denominación de Origen) es equivalente a DOP europeo",
        "La Rioja es la región con más tradición de regulación DO",
        "Ribera del Duero es DO importante en Castilla y León",
        "Las Riojas Alavesas, Rioja Media y Rioja Baja tienen características distintas",
        "Rueda se especializa en vinos blancos (Verdejo)",
        "La Penedès es región DO versátil catalana",
        "Priorat es DO de tintos potentes de Tarragona",
        "El Consejo Regulador es la entidad que define y controla normas DO",
        "Regulación típica incluye: variedades autorizadas, rendimiento máximo, métodos elaboración"
      ],
      quiz: [
        {
          question: "¿Cuál es el nivel de protección más alto en el sistema europeo de denominaciones?",
          options: ["Vino sin denominación", "IGP (Indicación Geográfica Protegida)", "DOP (Denominación de Origen Protegida)", "Vino genérico"],
          correct: 2
        },
        {
          question: "¿Cuál es la variedad blanca que caracteriza la región DO de Rueda?",
          options: ["Chardonnay", "Verdejo", "Riesling", "Sauvignon Blanc"],
          correct: 1
        }
      ],
      content: "Las denominaciones de origen son sistemas regulatorios que protegen identidad geográfica, calidad y método de elaboración de vinos. El sistema europeo clasifica: vinos sin denominación (sin regulación específica), IGP Indicación Geográfica Protegida (regulación moderada de origen y método), DOP Denominación de Origen Protegida (máxima regulación). En España, DO (Denominación de Origen) es equivalente a DOP. La Rioja es la región DO española más antigua y prestigiosa, con tres subregiones: Rioja Alta (vinos elegantes), Rioja Media, Rioja Baja (vinos más potentes). Ribera del Duero es DO importante especializada en Tempranillo. Rueda se especializa en blancos (Verdejo). Penedès es DO versátil catalana con vinos tintos y blancos. Priorat produce tintos intensos de gran estructura. Riojas Alavesas es subregión vasca con características propias. Cada DO tiene Consejo Regulador que define normas: variedades autorizadas, rendimiento máximo viña (hectolitros/hectárea), métodos elaboración, envejecimiento mínimo. Regulación vigila fraude, garantiza calidad consistente. DOCa (Denominación de Origen Calificada) en España es nivel superior: requiere reputación histórica extendida. Actualmente, Rioja y Priorat son DOCa. Comprender denominaciones permite recomendaciones informadas a clientes.",
      practicalExercise: "Investiga en profundidad tres regiones DO españolas distintas (ej: Rioja, Ribera del Duero, Rueda). Para cada una, documenta: características del terroir (clima, suelo), variedades principales, regulaciones DO (envejecimiento mínimo, rendimiento máximo), sub-regiones si las hay. Cata vinos de cada región si es posible. Compara perfiles y características. Reflexiona sobre cómo regulación DO protege identidad y consistencia."
    }
  ]
}
,
{
  id: "level-2",
  slug: "especialista-en-vino",
  level: 2,
  title: "Especialista en Vino",
  subtitle: "Profundización profesional en la enología y servicios de vino",
  description: "Programa avanzado diseñado para camareros experimentados, personal de tiendas de vino y sumilleres en formación. Desarrollo de competencias técnicas profundas en regiones vinícolas, técnicas de vinificación, análisis sensorial y servicio profesional.",
  icon: "wine-specialist",
  targetAudience: "Camareros experimentados, personal de tiendas especializadas, sumilleres en formación, profesionales del vino",
  prerequisites: "Conocimiento básico de vino (equivalente a Level 1), experiencia mínima en servicio de bebidas",
  estimatedHours: 15,
  modules: [
    {
      id: "m2-01",
      slug: "regiones-vinicolas-espana",
      title: "Regiones vinícolas de España en profundidad",
      description: "Estudio exhaustivo de las principales denominaciones de origen españolas, características terroir y estilos distintivos.",
      duration: "12 min",
      videoPlaceholder: "spain-regions-comprehensive",
      keyPoints: [
        "DO Rioja: suelos, clima y evolución de estilos tradicionales a modernos",
        "Ribera del Duero: características de uva Tempranillo en terroir continental",
        "Priorat: pizarra y concentración extrema de sabores",
        "Riojas Alavesas y Aéreas: diferenciación geográfica y calidad",
        "Penedès y denominaciones de Cataluña: diversidad de variedades",
        "Denominaciones del Levante: Jumilla, Yecla y producción de calidad",
        "Sherry y Manzanilla: crianza biológica y sistema de soleras",
        "Regiones emergentes: Toro, Montsant y nuevas referencias",
        "Sistemas de clasificación: Reserva, Gran Reserva y su significado real",
        "Factores de calidad: altitud, antigüedad de viñedos y potencial de envejecimiento"
      ],
      quiz: [
        {
          question: "¿Cuál es el principal factor diferenciador entre Rioja Alavesa y Rioja Alta?",
          options: [
            "La altitud y características geológicas del terroir",
            "El porcentaje de alcohol permitido",
            "La edad mínima de crianza en barrica",
            "El tipo de levadura utilizada en fermentación"
          ],
          correct: 0
        },
        {
          question: "¿Qué característica define principalmente a los vinos de Priorat?",
          options: [
            "Alta acidez natural y baja concentración",
            "Suelos de pizarra que producen vinos muy concentrados",
            "Producción masiva de vinos jóvenes",
            "Crianza obligatoria en acero inoxidable"
          ],
          correct: 1
        }
      ],
      content: "España posee una diversidad vinícola extraordinaria con más de 90 denominaciones de origen protegidas. Rioja sigue siendo la región más reconocida internacionalmente, especialmente por sus vinos de Tempranillo con carácter elegante y capacidad de envejecimiento. Ribera del Duero ha ganado prestigio por producir algunos de los vinos más concentrados del mundo, aprovechando el clima continental extremo. Priorat representa un ejemplo único de terroir desafiante donde suelos de pizarra y viñedos viejos generan expresiones minerales intensas. Las regiones emergentes como Toro y Montsant están demostrando que la calidad española va más allá de las denominaciones establecidas. Manzanilla y Sherry ocupan una categoría única con su sistema de crianza dinámica en soleras.",
      practicalExercise: "Cata vertical de Rioja: probar un vino joven, uno con 5 años de crianza y uno de 10+ años para entender evolución. Analizar cómo la altitud diferencia Alavesa de Alta. Comparar Tempranillo de Rioja con Tempranillo de Ribera del Duero para identificar influencias climáticas."
    },
    {
      id: "m2-02",
      slug: "francia-bordeaux-borgonya-champagne",
      title: "Francia: Burdeos, Borgoña, Champagne y más",
      description: "Análisis exhaustivo de los sistemas de clasificación franceses y características de sus principales regiones vinícolas.",
      duration: "14 min",
      videoPlaceholder: "france-wine-regions-detailed",
      keyPoints: [
        "Burdeos: sistema de châteaux, Rive Gauche vs Rive Droite y clasificación oficial",
        "Borgoña: sistema de parcelas Climat, piramidología de calidad y Pinot Noir",
        "Champagne: método tradicional, tirages y proceso de autolisis",
        "Alsacia: vinos blancos aromáticos y sistema de vendimias tardías",
        "Loire: diversidad de estilos desde Muscadet hasta Sancerre",
        "Côtes du Rhône: Grenache, Syrah y vinos de guarda",
        "Provence: rosados de alta calidad y estilos modernos",
        "Cálculo del consumo de SO2 y su regulación en Francia",
        "Impacto del cambio climático en regiones tradicionales francesas",
        "Sistemas de trazabilidad y denominación de origen protegida (AOP)"
      ],
      quiz: [
        {
          question: "¿Cuál es la principal diferencia entre Rive Gauche y Rive Droite en Burdeos?",
          options: [
            "Rive Gauche produce solo vinos blancos",
            "Rive Gauche se especializa en Cabernet Sauvignon, Rive Droite en Merlot",
            "No hay diferencia técnica, solo en precio",
            "Rive Droite está en la región de Champagne"
          ],
          correct: 1
        },
        {
          question: "¿Qué es un 'Climat' en Borgoña?",
          options: [
            "Un sistema de calefacción en las bodegas",
            "Una parcela de viña identificada históricamente con características específicas",
            "Un método de fermentación en temperatura controlada",
            "Un tipo de roble francés utilizado en barriles"
          ],
          correct: 1
        }
      ],
      content: "Francia establece los estándares mundiales de producción y clasificación de vino. Burdeos presenta un sistema de château basado en reputación histórica y consistencia, dividido en Rive Gauche (orilla izquierda del Garona, dominada por Cabernet Sauvignon) y Rive Droite (Saint-Emilion, Pomerol, dominada por Merlot). La clasificación de 1855 sigue siendo relevante pero ha evolucionado. Borgoña utiliza un sistema complejo de pequeñas parcelas llamadas Climat, donde la ubicación específica determina precio y calidad más que el productor. Champagne requiere método tradicional con mínimo 15 meses de autolisis para denomración. Loire ofrece diversidad excepcional en 50 kilómetros, desde vinos espumosos hasta secos y dulces.",
      practicalExercise: "Cata de dos Burdeos: uno de Rive Gauche (Pauillac) y uno de Rive Droite (Pomerol) para comparar estructura y varietal. Buscar lista de Climat de Borgoña y entender jerarquía. Probar Champagne brut y demi-sec para detectar diferencias en autolisis y concentración."
    },
    {
      id: "m2-03",
      slug: "italia-piamonte-sicilia",
      title: "Italia: de Piamonte a Sicilia",
      description: "Exploración profunda de la enología italiana, desde regiones del norte hasta islas mediterráneas.",
      duration: "13 min",
      videoPlaceholder: "italy-wine-regions-complete",
      keyPoints: [
        "Piamonte: Nebbiolo, Barolo y Barbaresco como vinos de guarda supremos",
        "Toscana: Chianti y Brunello, tradición versus innovación, super toscanos",
        "Umbría y Lacio: Sagrantino y vinos blancos de Grechetto",
        "Venecia: Prosecco, Amarone y vinos de pasificación",
        "Campania: vinos volcánicos de Vesuvio y Fiano",
        "Sicilia: revitalización vinícola, Nero d'Avola y vinos autóctonos recuperados",
        "Sardena: Cannonau y características específicas del viñedo isleño",
        "Clasificación DOCG, DOC y su diferenciación cualitativa",
        "Materia orgánica y suelos volcánicos en producción italiana",
        "Influencias de terroir mediterráneo en estructura tánica"
      ],
      quiz: [
        {
          question: "¿Cuál es la principal variedad de uva en Barolo y Barbaresco?",
          options: [
            "Barbera",
            "Nebbiolo",
            "Dolcetto",
            "Moscato"
          ],
          correct: 1
        },
        {
          question: "¿Qué caracteriza a los vinos Amarone del Véneto?",
          options: [
            "Son vinos espumosos de alta acidez",
            "Se producen con uvas pasificadas, resultando en vinos secos pero concentrados",
            "Son vinos fortificados tipo jerez",
            "Se producen únicamente en zonas costeras"
          ],
          correct: 1
        }
      ],
      content: "Italia representa una de las mayores complejidades vinícolas del mundo con identidades regionales muy marcadas. Piamonte produce algunos de los vinos más estructurados de Italia con Nebbiolo, requiriendo mínimo 38 meses de envejecimiento para Barolo. Toscana balancea tradición con modernidad, siendo Chianti la región más grande y diversa, mientras que Brunello de Montalcino mantiene purismo total con Brunello. Venecia ofrece contraste extremo entre Prosecco accesible y Amarone complejo hecho con uvas secas. Sicilia experimenta renacimiento vinícola recuperando variedades autóctonas tras décadas de producción masiva. Los suelos volcánicos de Campania y Sicilia imprimen mineralidad y salinidad distintivas.",
      practicalExercise: "Cata de Piamonte versus Toscana: comparar estructura tánica de Nebbiolo con Sangiovese. Probar Prosecco versus Amarone para entender técnicas radicalmente diferentes. Investigar cambio cualitativo en Sicilia probando un vino moderno y otro tradicional."
    },
    {
      id: "m2-04",
      slug: "portugal-alemania-austria",
      title: "Portugal, Alemania y Austria",
      description: "Análisis de regiones emergentes y especializadas en vinos blancos de alta calidad y fortificados únicos.",
      duration: "12 min",
      videoPlaceholder: "portugal-germany-austria-wines",
      keyPoints: [
        "Portugal: Douro, Dão y revitalización cualitativa con variedades autóctonas",
        "Vinos de Oporto: tipos, métodos de crianza y edad versus calidad",
        "Madeira: procesado único con calefacción y oxidación controlada",
        "Alemania: Riesling como referencia mundial de elegancia y precisión",
        "Sistemas de clasificación alemanes: Prädikat y niveles de madurez",
        "Austria: Grüner Veltliner y Riesling con carácter mineral y salinidad",
        "Danubio austriaco: Wachau, Kremstal y viñedos en terrazas",
        "Vinos naturales y biodinámicos en regiones germánicas",
        "Cambio climático como beneficio para regiones de clima frío",
        "Potencial de envejecimiento en Riesling alemán y austriaco"
      ],
      quiz: [
        {
          question: "¿Cuál es la principal característica del Riesling alemán de calidad?",
          options: [
            "Alto contenido alcohólico y fermentaciones completas",
            "Equilibrio entre azúcares residuales, acidez y aromas florales",
            "Fermentación en barricas de roble francés",
            "Obligatoriamente seco sin azúcares residuales"
          ],
          correct: 1
        },
        {
          question: "¿Cómo se diferencia la Madeira de otros vinos fortificados?",
          options: [
            "Es un vino blanco únicamente",
            "Utiliza proceso de calentamiento (estufas) como parte integral de su elaboración",
            "Proviene solo de la región del Douro",
            "Se produce mediante crianza en botas de madera húmeda"
          ],
          correct: 1
        }
      ],
      content: "Portugal ha experimentado revitalización vinícola en últimas décadas, reconociendo potencial de Douro no solo para Oporto sino para vinos de mesa secos de estructura excepcional. Douro representa una de las regiones más antiguas de Occidente con terrazas milenarias. Dão produce vinos de Touriga Nacional con carácter y longevidad. Madeira ocupa categoría única en mundo del vino, siendo único vino que requiere oxidación y calefacción controlada como parte de proceso. Alemania domina producción de Riesling, desarrollando un sistema que distingue precisamente por nivel de madurez en vendimia, desde Kabinett ligero hasta Trockenbeerenauslese concentradísimo. Austria produce Grüner Veltliner de frescura incomparable y Riesling de mineralidad única en región del Danubio.",
      practicalExercise: "Comparar Riesling alemán (Mosel) con austriaco (Wachau) para detectar diferencias regionales. Probar diferentes estilos de Oporto: Tawny 10 años, Vintage y Late Bottled Vintage. Investigar evolución de Madeira probando muestras de diferentes cosechas si es posible."
    },
    {
      id: "m2-05",
      slug: "nuevo-mundo-america",
      title: "Nuevo Mundo: América",
      description: "Estudio de regiones vitivinícolas de América del Norte, Central y del Sur, énfasis en Norteamérica.",
      duration: "13 min",
      videoPlaceholder: "new-world-america-wines",
      keyPoints: [
        "California: Napa, Sonoma y perfil de Cabernet Sauvignon y Chardonnay",
        "Pinot Noir de Oregon y Santa Bárbara en evolución constante",
        "Washington State: Cabernet Sauvignon con estructura alternativa",
        "Regiones costeras versus continentales de América del Norte",
        "Argentina: Malbec de Mendoza y regiones de altura creciente",
        "Chile: Carmenère, regiones costeras y adaptación varietales europeos",
        "Perú, Bolivia y otros productores en desarrollo",
        "Impacto de latitud y altitud en perfiles aromáticos",
        "Estilos modernos versus búsqueda de elegancia en Nuevo Mundo",
        "Sistemas de riego y consecuencias en concentración de sabores"
      ],
      quiz: [
        {
          question: "¿Cuál es la principal región de Pinot Noir de calidad en Nuevo Mundo?",
          options: [
            "Valle de Napa, California",
            "Willamette Valley, Oregon",
            "Mendoza, Argentina",
            "Santiago, Chile"
          ],
          correct: 1
        },
        {
          question: "¿Qué variedad ha sido revitalizada en Chile como símbolo regional?",
          options: [
            "Chardonnay",
            "Sauvignon Blanc",
            "Carmenère",
            "Riesling"
          ],
          correct: 2
        }
      ],
      content: "California revolucionó mundo del vino demostrando capacidad de producir vinos de talla mundial fuera de Europa. Napa Valley se especializa en Cabernet Sauvignon de estructura compleja con equilibrio entre madurez y acidez. Sonoma ofrece Chardonnay y Pinot Noir con caracteres más diversos según microtopografía. Oregon ha posicionado Pinot Noir como expresión de elegancia americana en Willamette Valley. Washington State produce Cabernet Sauvignon alternativo con acidez más pronunciada. Argentina revolucionó Malbec, transformando variedad considerada menor a estrella vinícola, especialmente en Mendoza a altitude. Chile recuperó Carmenère casi extinta, posicionándola como identidad nacional. La altitud creciente (desde 1000 a 3000m en Andes) ofrece oportunidades de experimentación.",
      practicalExercise: "Comparar Cabernet Sauvignon de Napa con uno de Washington para entender diferencias climáticas. Probar Pinot Noir de Oregon con uno californiano. Buscar línea vertical de Malbec argentino para entender evolución de región."
    },
    {
      id: "m2-06",
      slug: "nuevo-mundo-oceania-sudafrica",
      title: "Nuevo Mundo: Oceanía y Sudáfrica",
      description: "Exploración de viticulturas en hemisferio sur, con énfasis en Nueva Zelanda, Australia y Sudáfrica.",
      duration: "12 min",
      videoPlaceholder: "new-world-oceania-southafrica",
      keyPoints: [
        "Nueva Zelanda: Sauvignon Blanc revolucionario y Pinot Noir de Otago",
        "Australia: Shiraz, Cabernet y estilos de clima cálido",
        "Regiones continentales versus marítimas en Oceanía",
        "Sudáfrica: Pinotage como variedad híbrida única y Chenin Blanc",
        "Terroir volcánico de Nueva Zelanda versus grava australiana",
        "Sistemas de clasificación sudafricanos: Wine of Origin",
        "Impacto del cambio climático en Oceanía y Sudáfrica",
        "Métodos de riego y gestión hídrica en regiones secas",
        "Revolución enológica en Sudáfrica post-apartheid",
        "Potencial de envejecimiento en vinos antipodales"
      ],
      quiz: [
        {
          question: "¿Por qué es revolucionario el Sauvignon Blanc de Nueva Zelanda?",
          options: [
            "Porque es el más barato del mundo",
            "Porque expresa aromas de hierba tropical con acidez cortante, diferenciándose de Sancerre",
            "Porque es el primer vino blanco jamás producido",
            "Porque no requiere crianza en barrica"
          ],
          correct: 1
        },
        {
          question: "¿Qué es el Pinotage sudafricano?",
          options: [
            "Un vino blanco criado en barrica",
            "Cruce entre Pinot Noir y Cinsault, creado en Sudáfrica como variedad única",
            "Un tipo de espumoso de método tradicional",
            "Una denominación de origen específica"
          ],
          correct: 1
        }
      ],
      content: "Nueva Zelanda revolucionó Sauvignon Blanc en 1980s, produciendo expresión tropical e intensamente aromática en Marlborough, diferenciándose radicalmente de Loire francés. Pinot Noir de Otago demuestra elegancia en clima frío del hemisferio sur. Australia domina con Shiraz de voluptuosidad característica, especialmente en Barossa Valley, donde calor genera madurez extrema. Cabernet australiano de Coonawarra presenta terroir único de terra roja. Sudáfrica representa rebirth post-apartheid, revitalizando viticultura y experimentando activamente. Pinotage representa intento de crear variedad distintivamente sudafricana fusionando Pinot Noir y Cinsault. Chenin Blanc emerge como blanco de guarda excepcional. Océano Índico y Atlántico moderan temperaturas en regiones costeras.",
      practicalExercise: "Comparar Sauvignon Blanc de Nueva Zelanda con Sancerre francés para identificar diferencias climáticas. Probar Shiraz australiano junto a Syrah del Rhône. Investigar evolución de Pinotage sudafricano como expresión de terroir único."
    },
    {
      id: "m2-07",
      slug: "variedades-autoctonas-internacionales",
      title: "Variedades autóctonas vs internacionales",
      description: "Análisis de estrategias de preservación de variedades locales frente a internacionalización vinícola.",
      duration: "13 min",
      videoPlaceholder: "native-vs-international-varieties",
      keyPoints: [
        "Variedades internacionales: Cabernet Sauvignon, Merlot, Chardonnay, Sauvignon Blanc distribución global",
        "Variedades ibéricas: Tempranillo, Garnacha, Mencía, Godello, Verdejo",
        "Variedades italianas: Sangiovese, Nebbiolo, Barbera, Vermentino",
        "Variedades francesas menos conocidas: Carmenère, Mourvèdre, Grüner Veltliner",
        "Variedades portuguesas: Touriga Nacional, Touriga Franca, Bastardo, Arinto",
        "Estrategias de revitalización: Mencía en Bierzo, Godello en Valdeorras",
        "Cruzamientos y híbridos: Pinotage, Kerner, cuestiones de purismo",
        "Implicaciones genéticas de uniformidad varietal versus biodiversidad",
        "Terroir expression: cómo variedad autóctona se adapta mejor a su origen",
        "Futuro de variedades autóctonas en contexto de cambio climático"
      ],
      quiz: [
        {
          question: "¿Cuál es la principal ventaja de las variedades autóctonas en su región de origen?",
          options: [
            "Son siempre más caras en mercado",
            "Están adaptadas genéticamente al terroir específico, expresando mejor potencial local",
            "No requieren sulfitos",
            "Siempre tienen mayor potencial de envejecimiento"
          ],
          correct: 1
        },
        {
          question: "¿Qué variedad ibérica está siendo revitalizada en DO Bierzo?",
          options: [
            "Verdejo",
            "Godello",
            "Mencía",
            "Albariño"
          ],
          correct: 2
        }
      ],
      content: "Viticultura global ha favorecido variedades internacionales por facilidad comercial, pero últimas décadas ven resurgimiento de autóctonas por diferenciación y autenticidad. Tempranillo representa mejor expresión de esta tendencia en España, ganando reconocimiento internacional. Variedades italianas como Sangiovese mantienen identidad fuerte pese a presión global. Regiones españolas como Bierzo revitalizan Mencía abandonada décadas, demostrando capacidad de expresar terroir excepcional. Godello en Valdeorras representa similarmente revitalización de blanco autóctono. Touriga Nacional portuguesa emerge como Malbec argentino: variedad menor redescubierta como estrella. Cambio climático está acelerando experimentación con autóctonas adaptadas a estrés hídrico y temperatura.",
      practicalExercise: "Comparar Tempranillo de Rioja con Cabernet Sauvignon de región equivalente para entender diferencias varietales. Investigar historia de Mencía buscando información sobre su abandono y revitalización. Probar Godello si está disponible para evaluar potencial de blanco autóctono."
    },
    {
      id: "m2-08",
      slug: "vinificaciones-especiales",
      title: "Vinificaciones especiales: maceración carbónica, vinos naranjas",
      description: "Estudio de técnicas enológicas alternativas y sus aplicaciones en producción moderna y tradicional.",
      duration: "12 min",
      videoPlaceholder: "special-winemaking-techniques",
      keyPoints: [
        "Maceración carbónica: anaeróbica intracellular, aplicaciones en Beaujolais y emergencia global",
        "Maceración carbónica: generación de aromas afrutados distintivos versus potencial de guarda limitado",
        "Vinos naranjas: contacto prolongado de blanco con hollejos, historia en Georgia y evolución",
        "Vinos naranjas: caracterización aromática, tánica y potencial de oxidación",
        "Maceración en frío: extracción color y aromas sin oxidación temprana",
        "Fermentación salvaje versus controlada: implicaciones de microbiota",
        "Uso de enzimas pectinolíticas y sus efectos en clarificación",
        "Técnicas ancestrales revivenidas: kvevri georgiano, ánforas, barriles de madera",
        "Estabilidad y envejecimiento de vinos elaborados con técnicas alternativas",
        "Clasificación y regulación de vinos naranjas y naturales en diferentes regiones"
      ],
      quiz: [
        {
          question: "¿Qué caracteriza a la maceración carbónica como proceso?",
          options: [
            "Adición de CO2 gaseoso al mosto durante fermentación",
            "Fermentación intracellular anaeróbica de uvas enteras en atmósfera de CO2",
            "Enfriamiento del mosto a 0 grados centígrados",
            "Fermentación prolongada en barriles de acero inoxidable"
          ],
          correct: 1
        },
        {
          question: "¿Cuál es la característica principal de los vinos naranjas?",
          options: [
            "Son vinos rosados de color más intenso",
            "Vinos blancos producidos con maceración prolongada en hollejos, ganando color y taninos",
            "Vinos espumosos naturales de baja alcohol",
            "Vinos fortificados producidos en clima cálido"
          ],
          correct: 1
        }
      ],
      content: "Maceración carbónica representa técnica ancestral redescubierta y modernizada, donde uvas enteras fermentan anaeróbicamente dentro de atmósfera CO2, generando aromas frutales intensos y estructura tánica reducida. Beaujolais tradicionalmente utiliza esta técnica produciendo vinos de frescura inmediata. Técnica está ganando adopción global como reacción contra uniformidad de fermentación convencional. Vinos naranjas representan convergencia de técnicas ancestrales georgianas (kvevri) con experimentación moderna: blancos macerados extensamente con hollejos, ganando color ámbar-naranja y taninos apropiados a blanco. Técnicas como fermentación salvaje con microorganismos autóctonos ganan tracción en movimiento vino natural. Maceración en frío extrae color y aroma sin oxidación temprana. Técnicas ancestrales como ánforas y kvevri están siendo rehabilitadas especialmente en Georgia, Italia y España.",
      practicalExercise: "Probar Beaujolais Nouveau como ejemplo de maceración carbónica. Buscar y probar vino naranja si está disponible, comparándolo con blanco tradicional de misma variedad. Investigar movimiento vino natural y técnicas utilizadas."
    },
    {
      id: "m2-09",
      slug: "biodynamia-ecologico-naturales",
      title: "Biodinámia, ecológico y vinos naturales",
      description: "Análisis profundo de agricultura regenerativa, certificaciones y producción sustentable en viticultura.",
      duration: "13 min",
      videoPlaceholder: "biodynamic-organic-natural-wines",
      keyPoints: [
        "Viticultura orgánica: ausencia de sintéticos, certificación Demeter, limitaciones técnicas",
        "Biodinámia: principios antroposóficos, calendarios lunares y cosecha en función de movimientos astrales",
        "Preparados biodinámicos: función y aplicación en viñedo",
        "Vinos naturales: definición, minimal intervention, fermentación salvaje y riesgos microbiológicos",
        "Diferencia entre orgánico certificado, biodinámico y 'natural': legislación y prácticas",
        "Sulfitos: rol en conservación, mitos sobre sulfitos versus realidad química",
        "Certificaciones: Demeter, Ecocert, SOCert, SATIVA y otras referencias",
        "Impacto real de agricultura regenerativa versus greenwashing",
        "Biodiversidad de viñedo: relación con microbiota y terroir expression",
        "Sostenibilidad versus dogma: pragmatismo en viticultura moderna"
      ],
      quiz: [
        {
          question: "¿Cuál es la principal diferencia entre viticultura orgánica y biodinámia?",
          options: [
            "Ambas son idénticas en práctica",
            "Biodinámia incorpora principios antroposóficos incluyendo ciclos lunares y preparados específicos",
            "Orgánica es más estricta que biodinámia",
            "Biodinámia no requiere certificación"
          ],
          correct: 1
        },
        {
          question: "¿Cuál es el rol real de los sulfitos en viticultura?",
          options: [
            "Son tóxicos y deben eliminarse completamente",
            "Son agentes conservantes que previenen oxidación y contaminación microbiana indeseable",
            "Son aditivos que generan sabores desagradables obligatoriamente",
            "No tienen ninguna función química relevante"
          ],
          correct: 1
        }
      ],
      content: "Viticultura orgánica certificada elimina sintéticos químicos (pesticidas, fungicidas) manteniendo manejo convencional de suelo y riego. Biodinámia va más allá, incorporando principios antroposóficos donde ciclos lunares y planetarios guían decisiones de cosecha y trabajo del viñedo. Preparados biodinámicos (como compost revitalizados) tienen fundamento teórico controversial pero muchos productores reportan resultados. Vinos naturales representan minimal intervention philosophy: fermentación salvaje, sin/poco SO2, sin clarificantes, resultando en vinos vivos, impredecibles. Sulfitos son químicamente esenciales como conservante pero exceso afecta aroma y gusto. Legislación diferencia orgánico (EU 203/12), biodinámico (Demeter estándar) y no regula 'natural'. Sostenibilidad regenerativa mejora biodiversidad viñedo.",
      practicalExercise: "Investigar viña biodinamica cercana (si existe) para entender ciclo lunar. Comparar vino orgánico con convencional de misma región. Probar vino natural notando variabilidad (lo cual es normal) versus vino convencional."
    },
    {
      id: "m2-10",
      slug: "maridaje-clasico",
      title: "Maridaje clásico: principios y reglas",
      description: "Fundamentación teórica y práctica de maridaje clásico basado en principios de armonía, contraste y complemento.",
      duration: "12 min",
      videoPlaceholder: "classic-food-wine-pairing",
      keyPoints: [
        "Principio de armonía: similitud de sabores, intensidad y estructura",
        "Principio de contraste: complementariedad de ácidos, taninos y componentes",
        "Factores sensoriales: umami, salinidad, amargor, dulzor en equilibrio vino-comida",
        "Consideración de técnicas culinarias: preparación, cocción y salsas determinan pairing",
        "Vino blanco con pescado: regla no universal, excepciones basadas en estructura",
        "Vino tinto con carne: consideración de cocción, grasa, especias",
        "Acidez como factor determinante: limpieza de paladar y neutralización de grasas",
        "Taninos y proteína: afinidad química entre taninos y proteínas musculares",
        "Temperatura de servicio: impacto en expresión aromática y sensorial del maridaje",
        "Casos clásicos: Burdeos rojo con cordero, Chablis con ostras, Lambrusco con Parmigiano"
      ],
      quiz: [
        {
          question: "¿Cuál es el principal mecanismo químico en maridaje clásico tinto-carne?",
          options: [
            "El color del vino se mezcla con el color de la carne",
            "La acidez del vino ayuda a neutralizar la grasa de la carne",
            "Los taninos del vino se unen a proteínas de la carne, suavizando percepción de amargura",
            "No hay explicación química, es solo tradición"
          ],
          correct: 2
        },
        {
          question: "¿Por qué Chablis (Chardonnay sin roble) marida tan bien con ostras?",
          options: [
            "Porque Chablis es blanco y las ostras son mariscos",
            "Porque la acidez y mineralidad del Chablis complementan salinidad y umami de ostras",
            "Porque la región geográfica es cercana",
            "Porque ambos tienen mismo origen marino"
          ],
          correct: 1
        }
      ],
      content: "Maridaje clásico se fundamenta en principios sensoriales y químicos. Armonía implica similitud de intensidad, estructura y componentes: vino tinto potente con carne guisada concentrada. Contraste implica complementariedad: acidez alta del blanco limpiar grasas ricas. Taninos del tinto se unen a proteínas, suavizando percepción de astringencia. Umami de carnes y quesos complementa bien sabores salados y minerales del vino. Preparación culinaria es determinante: pescado en mantequilla blanca requiere blanco rico versus pescado a la sal permite tinto ligero. Temperatura servicio afecta expresión: tinto muy frío pierde aromas, blanco muy tibio pierde frescura. Clásicos atemporales incluyen Burdeos rojo con cordero, Chablis con ostras, Prosecco con quesos suaves.",
      practicalExercise: "Preparar cata de maridaje comparativo: vino tinto con carne, notando cómo taninos se suavizan. Probar blanco ácido con plato graso. Buscar menciones de mariages clásicos en regiones vinícolas establecidas."
    },
    {
      id: "m2-11",
      slug: "maridaje-creativo",
      title: "Maridaje creativo: fusión y cocina internacional",
      description: "Exploración de maridaje moderno con cocinas alternativas, fusión y platos innovadores.",
      duration: "13 min",
      videoPlaceholder: "creative-modern-pairing",
      keyPoints: [
        "Maridaje por componente versus por plato: análisis de sabores individuales",
        "Cocina asiática: manejo de picante, umami y acidez en contexto vinícola",
        "Maridaje con cocina tailandesa, japonesa, coreana: desafíos táctiles y sápidos",
        "Cocina india y especias: roles de acidez, alcohol, amargor en equilibrio",
        "Fusión moderna: deconstrucción de sabores clásicos con técnicas contemporáneas",
        "Postres salados y sabores dulce-salado: consideraciones especiales en maridaje",
        "Técnicas modernas: spherification, emulsiones, humos y aromas; impacto en pairing",
        "Vinos naturales y alternativos en contexto de cocina creativa",
        "Presupuesto y disponibilidad: buscar valores en regiones emergentes",
        "Diálogo vino-chef: comunicación y experimentación colaborativa"
      ],
      quiz: [
        {
          question: "¿Cuál es el desafío principal en maridar vino con cocina tailandesa?",
          options: [
            "La cocina tailandesa siempre requiere vino dulce",
            "El balance de picante, umami y acidez requiere cuidado: ácidos limpian picante, taninos pueden intensificarlo",
            "No es posible maridar vino con comida tailandesa",
            "Solo cerveza funciona con cocina asiática"
          ],
          correct: 1
        },
        {
          question: "¿Qué rol juega la acidez en maridar vino con cocina picante?",
          options: [
            "La acidez intensifica el picante desagradablemente",
            "La acidez no tiene ningún efecto",
            "La acidez limpia paladar y refrescancia, equilibrando componentes picantes",
            "El picante neutraliza completamente la acidez"
          ],
          correct: 2
        }
      ],
      content: "Maridaje creativo requiere análisis deconstruido de sabores componentes antes que visión monolítica del plato. Cocina asiática presenta desafíos únicos: especias calientes (picante), profiles umami profundos, acidez cítrica. Vinos con acidez alta funcionan bien porque limpian paladar de picante. Cocina tailandesa (coconut milk, lime, chili) requiere manejo cuidadoso: ácidos contrabalancean picante, pero taninos pueden intensificar. Cocina japonesa (soy, miso, dashi) tiene umami profundo: vinos con cuerpo moderado y mineralidad funcionan. Cocina india presenta espectro de sabores: curcuma, cilantro, garam masala. Fusión moderna deconstruye sabores clásicos aplicando técnicas contemporáneas (spherification, emulsiones): requiere pensamiento flexible. Chefs modernos colaboran con sommelliers buscando diálogo creativo.",
      practicalExercise: "Buscar plato de cocina moderna/fusion y pensar en componentes específicos antes de recomendar vino. Probar vino ácido con plato picante versus tinto tánico para entender diferencias. Experimentar recomendaciones alternativas fuera de opciones obvias."
    },
    {
      id: "m2-12",
      slug: "maridaje-postres-quesos-aperitivos",
      title: "Maridaje con postres, quesos y aperitivos",
      description: "Especialización en maridaje de categorías específicas: dulces, lácteos y apertivos.",
      duration: "12 min",
      videoPlaceholder: "pairing-desserts-cheeses-aperitifs",
      keyPoints: [
        "Maridaje con postres: dulzor comparable versus contraste amargo-dulce",
        "Vinos dulces: tipos y perfiles aromáticos compatibles con repostería",
        "Quesos frescos versus curados: impacto de edad y grasa en pairing",
        "Quesos azules y maridaje con vinos fortificados o aromáticos",
        "Queso y vino tinto: factores de grasa, sal y taninos en equilibrio",
        "Aperitivos salados: rol de acidez y salinidad en estimular apetito",
        "Charcutería y vinos frescos: contraste de grasas y aromas",
        "Platillos vegetarianos: consideraciones de umami y estructuras vegetales",
        "Tempo de comida: aperitivo diferencia de digestivo, implicaciones enológicas",
        "Casos especiales: frutos secos, chocolate, especias en contexto dulce"
      ],
      quiz: [
        {
          question: "¿Cuál es la mejor estrategia para maridar vino con postre muy dulce?",
          options: [
            "Elegir vino más dulce aún para armonía",
            "Elegir vino seco para contraste extremo",
            "Elegir vino dulce comparable o más dulce aún; alternativamente, vino ácido para corte",
            "Usar siempre champagne porque funciona universalmente"
          ],
          correct: 2
        },
        {
          question: "¿Por qué funciona bien Oporto tawny con queso azul?",
          options: [
            "Porque ambos son de Portugal",
            "Porque ambos tienen origen animal",
            "Porque la dulzura y oxidación del Oporto complementan salinidad y intensidad del azul",
            "Porque no funciona, es combinación incorrecta"
          ],
          correct: 2
        }
      ],
      content: "Postres requieren consideración de dulzor: principio general sugiere vino comparable o más dulce que postre, evitando percepción de vino seco junto dulce. Alternativamente, acidez alta (Riesling seco o espumoso) corta dulzor agradablemente. Vinos dulces: Moscato, Riesling Auslese, vinos de postre franceses varían en perfil aromático; chocolates requieren robles oscuros mientras frutas reclaman florales. Quesos varían dramáticamente: frescos (mozzarella, ricotta) requieren blancos limpios; curados (manchego, parmigiano) funcionan con tintos de tanino suave. Quesos azules necesitan dulzor o complejidad tipo Oporto tawny. Aperitivos salados (jamón ibérico, anchoas) funcionan bien con ácidos frescos: manzanilla seca, Albariño. Charcutería grasa requiere acidez para corte. Vegetales umami (setas, tomates) requieren vinos con estructura tánica suave. Tempo importa: aperitivo estimula apetito (ácidos, burbujas), digestivo cierra comida (generalmente más alcohólico, estructurado).",
      practicalExercise: "Hacer tabla de quesos variados y probar con vinos diferentes, anotando harmonías descubiertas. Maridar postre dulce con vino comparable y luego con blanco ácido, comparando resultados. Crear platillo con vegetales umami (champiñones) y experimentar mariaje."
    },
    {
      id: "m2-13",
      slug: "champagne-cava-detalle",
      title: "El mundo del champagne y cava en detalle",
      description: "Análisis exhaustivo de espumosos premium: método tradicional, casas, estilos y clasificaciones.",
      duration: "14 min",
      videoPlaceholder: "champagne-cava-detailed-guide",
      keyPoints: [
        "Champagne: definición geográfica, método tradicional, tiraje y degüelle",
        "Proceso de autolisis: impacto de tiempo en burbuja, aroma y complejidad",
        "Clasificación: Brut Nature, Extra Brut, Brut, Extra Dry, Dry, Doux en términos de residual",
        "Casas de Champagne: características regionales de Épernay versus Reims",
        "Cuvées especiales: Blanc de Blancs (100% Chardonnay), Blanc de Noirs (100% Pinot Noir)",
        "Millésimes versus Non-Vintage: estrategia de reservas y consistencia",
        "Prestige Cuvées: Cristal, Dom Pérignon, Krug Clos d'Ambonnay como ejemplos",
        "Cava español: método idéntico pero diferentes variedades y clasificación DO",
        "Espumosos de otros métodos: Charmat, Transfer, espumosos naturales",
        "Servicio, temperatura y técnica de apertura: protocolo profesional"
      ],
      quiz: [
        {
          question: "¿Cuál es el principal beneficio de la autolisis en Champagne?",
          options: [
            "Aumenta el alcohol del vino",
            "Descompone pared celular levadura, liberando compuestos que generan complejidad aromática y mejoran burbuja",
            "Reduce el dióxido de carbono",
            "Cambia color del vino"
          ],
          correct: 1
        },
        {
          question: "¿Cuál es la diferencia entre Blanc de Blancs y Blanc de Noirs en Champagne?",
          options: [
            "Blanc de Blancs es rosado, Blanc de Noirs es blanco",
            "Blanc de Blancs es 100% Chardonnay (uva blanca), Blanc de Noirs es 100% Pinot Noir/Meunier (uvas negras)",
            "No hay diferencia, son nombres marketing",
            "Blanc de Noirs viene de Champagne, Blanc de Blancs de Borgoña"
          ],
          correct: 1
        }
      ],
      content: "Champagne requiere denominación geográfica (región de Champagne, Francia) y método tradicional: segunda fermentación en botella, tiraje (adición de levadura y azúcar), autolisis mínimo 15 meses (36 para millésimes). Autolisis es proceso donde pared celular levadura se descompone lentamente liberando amino-ácidos y nucleótidos: genera aromas complejos y burbuja más fina. Brut es estándar comercial con 0-12g/L azúcar residual. Casas de Champagne expresan terroir regional: Épernay favorece Chardonnay elegante, Reims Pinot Noir estructura. Prestige Cuvées (Cristal de Louis Roederer, Dom Pérignon, Krug Clos d'Ambonnay) son picos de calidad con envejecimiento extendido. Cava usa método idéntico pero variedades españolas (Macabeo, Parellada, Xarel-lo) produciendo perfil diferente a menor costo. Non-Vintage representa 80% producción: blend de años para consistencia. Millésime celebra año excepcional. Espumosos Charmat fermentan en tanque, resultando en menos complejidad, precios bajos.",
      practicalExercise: "Comparar Non-Vintage de Champagne con Millésime de casa conocida. Probar Blanc de Blancs versus Blanc de Noirs para diferenciar perfiles. Comparar Champagne Premium con Cava de calidad similar, anotando diferencias aromáticas."
    },
    {
      id: "m2-14",
      slug: "vinos-fortificados",
      title: "Vinos fortificados: jerez, oporto, madeira",
      description: "Estudio especializado de vinos fortificados, métodos de crianza dinámica y estática, envejecimiento.",
      duration: "14 min",
      videoPlaceholder: "fortified-wines-detailed",
      keyPoints: [
        "Fortificación: adición de alcohol (aguardiente) antes, durante o después fermentación",
        "Jerez: sistema de soleras y criaderas, crianza biológica con velo de flor",
        "Clasificación Jerez: Fino, Manzanilla, Amontillado, Oloroso, Palo Cortado",
        "Oporto: crianza estática en barriles, categorías por tipo de crianza y edad",
        "Oporto: Tawny versus Ruby, características organolépticas diferenciadoras",
        "Madeira: estufas (calentamiento) como proceso integral versus crianza convencional",
        "Edad de Madeira: evolución en botas y impacto de oxidación controlada",
        "Vinos naturalmente dulces versus fortificados: diferencias técnicas",
        "Impacto del SO2 en preservación de vinos fortificados versus naturales",
        "Servicio y maridaje: temperatura, copa, contexto de consumo"
      ],
      quiz: [
        {
          question: "¿Cuál es la principal característica del sistema de soleras en Jerez?",
          options: [
            "Fermentación en botellas de vidrio",
            "Sistema de barriles por edad donde vino joven es transferido a barril más viejo progresivamente, manteniendo consistencia",
            "Crianza al aire libre bajo sol intenso",
            "Agregación de diferentes regiones de Andalucía"
          ],
          correct: 1
        },
        {
          question: "¿Por qué Madeira requiere estufas (calentamiento) como parte de elaboración?",
          options: [
            "Para acelerar fermentación convencionalmente",
            "Para simular viajes oceánicos antiguos en barriles donde calor y movimiento mejoraban vino",
            "Para reducir contenido alcohólico",
            "Es proceso opcional solo para fines comerciales"
          ],
          correct: 1
        }
      ],
      content: "Vinos fortificados utilizan aguardiente para elevar alcohol, deteniendo fermentación antes de consumo total azúcar, resultando en dulzor residual. Jerez representa sistema único de soleras y criaderas: barriles organizados por edad, vino joven transferido a más viejo, extrayendo máximo 1/3 anual del barril más viejo para venta. Flor (levadura blanca) cubre vino de Fino, crianza biológica bajo velo protector. Fino es pálido, seco, delicado (15% alcohol). Manzanilla es Fino de Sanlúcar de Barrameda con salobridad marina. Amontillado es Fino oxidado parcialmente. Oloroso es crianza sin flor, oscuro. Oporto divide en Vintage (muy envejecido, caro, limitado a años excepcionales), Tawny (crianza oxidativa, 10/20/40 años), Ruby (joven, color rojo). Madeira requiere estufas (calentamiento 45-50°C) simulando viajes oceánicos antiguos, acelerando oxidación controlada. Madeira verdaderamente única: vino más estable, puede envejecer siglos.",
      practicalExercise: "Probar línea de Jerez: Fino, Amontillado, Oloroso, notando progresión de oxidación. Comparar Tawny de 10 años con Ruby de misma edad. Investigar historia de Madeira y proceso de estufas."
    },
    {
      id: "m2-15",
      slug: "analisis-sensorial-intermedio",
      title: "Análisis sensorial intermedio: cata a ciegas",
      description: "Técnicas avanzadas de cata sensorial, cata a ciegas, deducción de características y pruebas formales.",
      duration: "13 min",
      videoPlaceholder: "sensory-analysis-blind-tasting",
      keyPoints: [
        "Preparación técnica: copa ISO, temperatura, iluminación, eliminación de sesgos visuales",
        "Análisis visual sin información: color, intensidad, claridad, burbuja",
        "Deducción de envejecimiento desde color: oxidación progresiva en tintos, browning en blancos",
        "Análisis aromático: primarios (varietales), secundarios (fermentación), terciarios (envejecimiento)",
        "Aromas oxidativos versus reductores: implicaciones de almacenaje y proceso",
        "Análisis gustativo: estructura tánica, acidez, alcohol, dulzor, amargo, umami",
        "Técnicas de deducción: región, variedad, edad, estilo desde componentes sensoriales",
        "Cata a ciegas competitiva: protocolo, puntuación y criterios de evaluación",
        "Errores comunes en cata: prejuicios visuales, sugestión olfatoria, fatiga sensorial",
        "Entramiento de sensaciones gustativas: calibración de paladar y memoria olfatoria"
      ],
      quiz: [
        {
          question: "¿Cuál es el principal riesgo de cata sin condiciones controladas?",
          options: [
            "El vino se oxida más rápido",
            "Los sesgos visuales (etiqueta, botella, color) pueden predisponer expectativas, distorsionando análisis objetivo",
            "Siempre produce resultados idénticos",
            "No hay riesgos, todas las condiciones son equivalentes"
          ],
          correct: 1
        },
        {
          question: "¿Cómo se diferencia aroma primario de terciario en análisis sensorial?",
          options: [
            "Primarios vienen de varietal, terciarios de envejecimiento y oxidación",
            "No hay diferencia, son sinónimos",
            "Primarios son siempre superiores a terciarios",
            "Terciarios vienen de fermentación solamente"
          ],
          correct: 0
        }
      ],
      content: "Análisis sensorial intermedio desarrolla capacidad de deducir características de vino desde componentes sensoriales sin información visual (cata a ciegas). Preparación técnica es esencial: copa ISO (clara, inodora, adecuada forma), temperatura controlada (18°C para tintos, 12°C para blancos), iluminación neutral. Análisis visual aún ocurre: color, intensidad, claridad, burbuja informan sobre edad, variedad, proceso. Tintos envejecidos progresivamente desarrollan tonos teja (oxidación). Blancos envejecidos desarrollan amber (browning). Análisis aromático distingue capas: aromas primarios varietales (fresa en Pinot, cassis en Cabernet), secundarios de fermentación (levadura, mantequilla), terciarios de envejecimiento (tabaco, cuero, tostado). Análisis gustativo evalúa estructura: taninos (astringencia), acidez (frescancia), alcohol (calidez), dulzor, amargor. Deducción implica synthesizar información hacia conclusiones sobre región, variedad, edad. Capatación a ciegas competitiva requiere protocolo formal y puntuación según criterios internacionales.",
      practicalExercise: "Realizar cata a ciegas de 3 vinos diferentes, anotando observaciones sin ver etiqueta. Comparar después notas con realidad del vino. Practicar identificación de aromas utilizando referencias estándar (frutas, flores, especias)."
    },
    {
      id: "m2-16",
      slug: "gestion-bodega",
      title: "Gestión de bodega: conservación y almacenaje",
      description: "Aspectos prácticos de almacenamiento, conservación de vino, inventario y condiciones óptimas.",
      duration: "12 min",
      videoPlaceholder: "wine-cellar-management",
      keyPoints: [
        "Temperatura óptima: 13-15°C constante, fluctuaciones como enemigo principal",
        "Humedad relativa: 50-80% para preservar corcho y etiquetas",
        "Luz: UV como degradador de vino, almacenaje en oscuridad esencial",
        "Posición de botella: horizontal para vinos con corcho natural, vertical permisible solo temporalmente",
        "Organización: catalogación, zona de consumo inmediato versus guarda prolongada",
        "Rotación: FIFO (First In, First Out) como principio comercial",
        "Detectar degrado: corcho contaminado, ullage, teñidura de vino en botella",
        "Seguros y documentación: registro de inventario, precios, condiciones de compra",
        "Equipamiento: termómetros, higrómetros, sistemas de ventilación, iluminación LED",
        "Regulación y permisos: requisitos legales para almacenaje comercial de alcohol"
      ],
      quiz: [
        {
          question: "¿Cuál es el factor ambiental más crítico para preservación de vino?",
          options: [
            "La iluminación brillante",
            "La temperatura alta",
            "La temperatura constante (no fluctuaciones) entre 13-15°C",
            "La humedad muy baja (menos 30%)"
          ],
          correct: 2
        },
        {
          question: "¿Por qué las botellas se almacenan horizontalmente?",
          options: [
            "Para ahorrar espacio",
            "Para permitir que corcho permanezca húmedo y expandido, previniendo entrada de aire",
            "Es puramente cosmético",
            "Posición no tiene ningún impacto"
          ],
          correct: 1
        }
      ],
      content: "Gestión de bodega requiere comprensión de factores que degradan vino. Temperatura es criticidad principal: vino responde a calor acelerando envejecimiento oxidativo. Fluctuaciones temperatura causan expansión/contracción líquido, pueden afectar integridad de corcho. Ideal es 13-15°C constante. Humedad 50-80% preserva corcho de secado y etiquetas de degradación. UV degrada vino, descomponiendo compuestos aromáticos. Posición horizontal mantiene corcho húmedo y expandido, previniendo aire ingreso. Organización sistemática mediante catalogación y FIFO asegura rotación eficiente. Detectar degradación: corcho manchado/contaminado indica contaminación potencial, ullage (vacío en botella) indica evaporación/infiltración, teñidura de vino en cuello exterior indica fugas. Documentación de inventario con precios y fechas adquisición es esencial para control. Equipamiento básico: termómetro, higrómetro, iluminación LED roja (menos dañina). Regulación varía por país: permisos para almacenaje comercial de alcohol típicamente requeridos.",
      practicalExercise: "Auditar bodega existente verificando temperatura, humedad, posición botella, iluminación. Crear sistema de catalogación simple. Implementar control de inventario usando hoja de cálculo básica con variedad, año, cantidad, precio."
    },
    {
      id: "m2-17",
      slug: "servicio-profesional",
      title: "Servicio profesional: protocolo de sala",
      description: "Técnicas y protocolos de servicio profesional de vino en contexto de hostelería de calidad.",
      duration: "13 min",
      videoPlaceholder: "professional-wine-service",
      keyPoints: [
        "Presentación de lista de vinos: estructura lógica, rangos de precio, sugerencias del sumiller",
        "Recomendaciones de vino: escucha activa, presupuesto, preferencias, maridaje con comida",
        "Temperatura de servicio: variación según tipo vino (espumosos 6-8°C, blancos 10-12°C, rosados 12-14°C, tintos 16-18°C)",
        "Abertura de botella: técnica corkscrew, presentación de corcho, remoción segura",
        "Decanting: cuando es apropiado, técnica sin sedimentación, aireación",
        "Servicio: orden de copas (dueño/dueña, invitados, anfitriona), relleno apropiado, atención de copa",
        "Temperatura durante servicio: jackets de hielo para blancos, camareras para cubrir tintos",
        "Descripción y promoción: lenguaje accesible, evitar jargón innecesario, educación del cliente",
        "Protocolo de degustación: pequeña cantidad inicial para cliente, aprobación, servicio formal",
        "Manejo de devoluciones: corcho contaminado, oxidación, vino degenerado versus preferencia personal"
      ],
      quiz: [
        {
          question: "¿Cuál es el protocolo correcto de servicio de vino tinto de calidad?",
          options: [
            "Servir inmediatamente de botella fría",
            "Permitir cliente pequeño sorbo para aprobación, luego servicio formal a 16-18°C",
            "Siempre decantir 2+ horas antes de servir",
            "Servir a temperatura ambiente sin protocolo específico"
          ],
          correct: 1
        },
        {
          question: "¿Cuándo es apropiado decantir un vino?",
          options: [
            "Nunca, es desperdicio de vino",
            "Para vinos envejecidos con sedimento (permite separación) y para aireación de vinos jóvenes (15-30 minutos)",
            "Siempre, incluso para vinos blancos",
            "Solo para espumosos"
          ],
          correct: 1
        }
      ],
      content: "Servicio profesional comienza con presentación de lista: organizadas por región, tipo, rango de precio, con notas de sumiller. Recomendaciones requieren escucha activa: presupuesto, preferencias, consideración de menu. Temperatura servicio es crítica: espumosos 6-8°C, blancos 10-12°C, rosados 12-14°C, tintos 16-18°C. Apertura requiere técnica: corkscrew helicoidale, presentación de corcho a cliente (verificar contaminación). Decanting es apropiado para vinos envejecidos con sedimento (separación de poso) y jóvenes concentrados (aireación 15-30 min). Servicio sigue orden: cliente solicitante primero (pequeño sorbo para aprobación), luego invitados, anfitriona última. Relleno apropiado es 2/3 de copa. Atención continua: rellenar vasos cuando bajan a 1/2. Temperatura durante servicio: jackets hielo para blancos, camareras de algodón para tintos. Descripción accesible sin jargon excesivo: educar cliente sobre vino. Devolución procedente: corcho contaminado (TCA/bouchonné), oxidación obvia, degradación física. Preferencia personal no es motivo válido devolución.",
      practicalExercise: "Practicar apertura botella con corkscrew, presentación de corcho. Servir vino tinto siguiendo protocolo: degustación cliente, aprobación, servicio ordenado. Describir vino con lenguaje simple y educativo."
    },
    {
      id: "m2-18",
      slug: "comunicacion-vino-cliente",
      title: "Comunicación del vino al cliente",
      description: "Habilidades de comunicación profesional, educación del cliente y construcción de relaciones comerciales.",
      duration: "12 min",
      videoPlaceholder: "wine-client-communication",
      keyPoints: [
        "Lenguaje accesible versus técnico: calibración según nivel conocimiento cliente",
        "Narrativas de vino: historia de región, productor, viñedo como herramienta de venta",
        "Storytelling: conectar emocionalmente cliente con vino más allá de sabor",
        "Educación sin condescendencia: explicar conceptos complejos en términos simples",
        "Preguntas abiertas: descubrir preferencias, crear diálogo en lugar de monólogo",
        "Recomendaciones personalizadas: mostrar conocimiento, considerar contexto individual",
        "Manejo de situaciones difíciles: cliente desinformado, desacuerdos sobre calidad, quejas",
        "Visibilidad de vino: cómo presentar oferta en carta, en bodega, en retrogusto",
        "Loyalty building: reconocimiento de clientes regulares, ofertas personalizadas",
        "Integración de tecnología: apps, notas de cata, seguimiento de preferencias cliente"
      ],
      quiz: [
        {
          question: "¿Cuál es el principal objetivo de comunicación de vino al cliente?",
          options: [
            "Vender botella más cara posible",
            "Demostrar conocimiento técnico exhaustivo",
            "Conectar cliente con vino que satisfaga sus preferencias, educando y construyendo relación de confianza",
            "Evitar cualquier conversación sobre vino"
          ],
          correct: 2
        },
        {
          question: "¿Cómo se debe manejar cliente que rechaza recomendación de sumiller?",
          options: [
            "Insistir en que sumiller tiene razón",
            "Respetar preferencia, usar como oportunidad de aprendizaje y comprensión de gustos cliente",
            "Tomar rechazo como ofensa personal",
            "Nunca hacer recomendaciones en futuro"
          ],
          correct: 1
        }
      ],
      content: "Comunicación efectiva de vino requiere calibración de lenguaje según audiencia. Cliente experto aprecia análisis técnico (análisis sensorial, crianza, terroir). Cliente novato requiere lenguaje accesible enfocado en sabor, aroma general, concordancia con comida. Narrativas potentes incluyen historia de región (tradición, terroir, innovación), productor (filosofía, técnicas especiales), viñedo específico. Storytelling conecta emocionalmente: 'Este vino viene de viñedo con 80 años que sobrevivió guerras, ahora produce expresión única de pizarra y granito' es más poderoso que 'Chenin Blanc mineral'. Educación sin condescendencia implica explicar complejidad en términos simples: 'Taninos son astringentes como secador de boca' versus jargon técnico. Preguntas abiertas ('Qué tipo de sabores prefiere?') crean diálogo versus monólogo vendedor. Recomendaciones personalizadas muestran atención: considerar presupuesto, comida, ocasión, preferencias previamente expresadas. Manejo de desacuerdos: respetar preferencia cliente, usar como aprendizaje. Loyalty building: reconocer clientes regulares, recordar preferencias, ofrecer nuevos descubrimientos personalizados. Tecnología (apps, notas digitales) facilita seguimiento de preferencias.",
      practicalExercise: "Escribir descripción de 2-3 vinos para menú: lenguaje accesible, narrativa enraizante, sin jargon excesivo. Practicar recomendación personalizando a clientes tipo diferentes (ejecutivo, pareja romántica, novato). Roleplay manejo de cliente que rechaza recomendación."
    }
  ],
  certificate: "Especialista en Vino Nivel 2 - Academia Vinícola Profesional",
  seo: {
    title: "Especialista en Vino Nivel 2: Formación Profesional Enología",
    description: "Programa avanzado de 15 horas con 18 módulos para profundizar competencias en regiones vinícolas, técnicas de cata, maridaje y servicio profesional. Diseñado para camareros, personal tiendas especializadas y sumilleres en formación."
  }
}
,
{
  id: "level3",
  slug: "sumiller-profesional",
  level: 3,
  title: "Sumiller Profesional",
  subtitle: "Especialización avanzada en gestión, cata y servicio de vinos de alta gama",
  description: "Programa de especialización profesional dirigido a sumilleres, directores de sala y profesionales de la restauración de alto nivel. Cubre gestión estratégica de cartas de vino, análisis analítico avanzado, servicio premium y liderazgo en equipos de vinos. Contenido técnico, comercial y legislativo para posicionamiento profesional en establecimientos de categoría superior.",
  icon: "🏆",
  targetAudience: "Sumilleres jefe, directores de vinos en restauración, profesionales con experiencia que buscan especialización en gestión y servicio premium",
  prerequisites: "Nivel 2 completado. Experiencia mínima de 3 años en servicio de vinos. Conocimientos avanzados de cata y maridaje.",
  estimatedHours: 18,
  modules: [
    {
      id: "level3-module1",
      slug: "diseno-estrategico-carta-vinos",
      title: "Diseño estratégico de carta de vinos",
      description: "Metodología para diseñar cartas de vinos profesionales que maximicen ingresos, satisfacción del cliente y coherencia con la propuesta gastronómica.",
      duration: "16 min",
      videoPlaceholder: "diseño-carta-vinos-estrategia",
      keyPoints: [
        "Análisis de la propuesta gastronómica y perfil de cliente del establecimiento",
        "Estructura piramidal de la carta: vinos de acceso, core business, vinos premium y rarezas",
        "Equilibrio entre cantidad de referencias y profundidad en cada rango de precio",
        "Criterios de selección geográfica: clásicos, emergentes y vinos de descubrimiento",
        "Posicionamiento de márgenes según categoría del establecimiento",
        "Estrategia de destacados: rotación mensual y sugerencias por temporada",
        "Presentación física: formato, fotografías, descripción y anotaciones técnicas",
        "Integración con el menú: maridajes sugeridos y opciones por plato",
        "Dinamismo de la carta: revisión trimestral, análisis de ventas y descartes",
        "Comunicación de la carta: capacitación del personal y estrategia de ventas"
      ],
      quiz: [
        {
          question: "¿Cuál es el objetivo principal de la estructura piramidal en una carta de vinos?",
          options: [
            "Maximizar el número total de referencias en la bodega",
            "Asegurar acceso a todos los clientes en diferentes rangos de precio mientras se construye un núcleo de negocio rentable",
            "Mostrar únicamente los vinos más caros para posicionar el establecimiento",
            "Organizar alfabéticamente los vinos por bodega"
          ],
          correct: 1
        },
        {
          question: "¿Qué porcentaje aproximado de referencias debería ser vinos de acceso (entrada baja) en una carta de calidad?",
          options: [
            "Menos del 10%",
            "Entre 30-40%",
            "Más del 60%",
            "No importa el porcentaje, solo la rentabilidad"
          ],
          correct: 1
        }
      ],
      content: "El diseño de una carta de vinos estratégica requiere equilibrar objetivos comerciales, coherencia con la propuesta gastronómica y satisfacción del cliente. La estructura piramidal garantiza que existan opciones para todos los tipos de cliente: desde los que buscan una opción accesible, hasta los que desean experimentar vinos de colección. El análisis del perfil de cliente del establecimiento (edad, poder adquisitivo, conocimiento enológico) determina el peso de cada segmento. Los vinos de core business, donde se concentra la rotación y el margen, deben ser cuidadosamente seleccionados, evitando referencias que compitan entre sí. La presentación y descripción en la carta física debe ser clara, invitadora y que facilite la venta: fotograbías de las botellas, notas de cata breves, maridajes sugeridos. La integración con el menú gastronómico es fundamental: cada plato debe tener al menos una sugerencia de vino que lo complemente. Una buena carta evoluciona: la revisión trimestral basada en datos de venta permite incorporar nuevos descubrimientos, descartar referencias lentas y mantener el interés del cliente habitual.",
      practicalExercise: "Analiza la propuesta gastronómica de un restaurante específico (proporciona menú). Diseña una estructura de carta con: 1) 10 referencias de vinos de acceso (bajo 20€), 2) 15 de core business (20-50€), 3) 8 premium (50-150€), 4) 3 rarezas (>150€). Para cada vino incluye: bodega, varietal, añada, maridajes sugeridos, nota de cata breve (máx. 30 palabras) y margen estimado (70-100%)."
    },
    {
      id: "level3-module2",
      slug: "analisis-costes-margenes",
      title: "Análisis de costes y márgenes por referencia",
      description: "Metodología de análisis económico detallado para optimizar rentabilidad de cada referencia en la carta de vinos.",
      duration: "15 min",
      videoPlaceholder: "analisis-costes-margenes-vinos",
      keyPoints: [
        "Cálculo del coste total de la botella: coste de compra, transporte, almacenamiento, roturas y obsolescencia",
        "Diferencia entre margen bruto y margen operativo en vinos",
        "Márgenes recomendados por segmento: acceso, core business, premium, colección",
        "Análisis de rotación: impacto de velocidad de venta en rentabilidad real",
        "Break-even point: punto de equilibrio considerando costes fijos de bodega",
        "Análisis ABC: identificación de referencias de alto impacto económico",
        "Comparativa de márgenes entre proveedores para la misma referencia",
        "Negociación de precios de compra basada en datos de rotación",
        "Control de mermas: aplicación de márgenes de seguridad",
        "Impacto de variaciones de tipo de cambio en vinos importados"
      ],
      quiz: [
        {
          question: "Si compras una botella a 15€ y la vendes a 45€, y tus costes operativos asociados (almacenamiento, manipulación, seguros) son 5€, ¿cuál es tu margen operativo real?",
          options: [
            "200% (45-15)",
            "66% (30/45)",
            "50% (15/30)",
            "75% (30/40)"
          ],
          correct: 2
        },
        {
          question: "¿Qué tipo de análisis permite identificar que el 20% de tus referencias generan el 80% de la rentabilidad?",
          options: [
            "Análisis de rotación",
            "Análisis ABC",
            "Análisis de margen bruto",
            "Análisis de proveedores"
          ],
          correct: 1
        }
      ],
      content: "El análisis de costes y márgenes en vinos requiere ir más allá del simple cálculo de margen bruto. Cada botella tiene un coste total real que incluye no solo el precio de compra, sino también transporte, almacenamiento en condiciones óptimas, seguros, mermas por roturas, y el coste de capital inmobilizado en inventario. Los márgenes recomendados varían significativamente por segmento: los vinos de acceso (entrada baja) requieren márgenes del 70-100%, el core business del 100-130%, los premium del 80-120%, y las rarezas del 100-150%. Sin embargo, una botella con margen del 150% que rota 2 veces al año genera menos rentabilidad que una de margen del 100% que rota 12 veces. El análisis ABC (Pareto) revela que típicamente el 20% de las referencias generan el 80% de la rentabilidad. Este conocimiento permite orientar los esfuerzos comerciales y decidir qué referencias mantener, cuáles ampliar y cuáles descartar. La variabilidad en costes de compra entre proveedores puede ser sustancial: un análisis detallado de las 30-50 referencias de mayor rotación puede identificar oportunidades de ahorro del 5-15% que impacten significativamente en rentabilidad.",
      practicalExercise: "Con una lista de 20 referencias de tu carta actual (o hipotética), calcula para cada una: 1) Coste de compra, 2) Costes operativos estimados, 3) Precio de venta, 4) Margen operativo %, 5) Rotación estimada (botellas/mes). Agrupa por margen y rotación, identifica las 5 referencias de mayor rentabilidad real. Propón ajustes de precio o costes de compra para 3 referencias de baja rentabilidad."
    },
    {
      id: "level3-module3",
      slug: "rotacion-stock-inventario",
      title: "Rotación de stock y gestión de inventario",
      description: "Sistemas avanzados de control de inventario, rotación estratégica y optimización del capital inmobilizado en vinos.",
      duration: "14 min",
      videoPlaceholder: "rotacion-stock-gestion-inventario",
      keyPoints: [
        "Cálculo de índices de rotación por familia de vinos (tinto, blanco, espumoso, generoso)",
        "Métodos FIFO, LIFO y FEFO aplicados a vinos en función de su perfil de conservación",
        "Stock de seguridad: determinación en función de rotación y time-to-delivery",
        "Punto de reorden: fórmula y aplicación práctica",
        "Inventarios cíclicos versus toma anual: ventajas e implementación",
        "Gestión diferenciada de vinos jóvenes, en evolución y de guarda",
        "Control de temperaturas y condiciones de almacenamiento como parte de la rotación",
        "Identificación de referencias obsoletas o de lenta rotación",
        "Descuentos estratégicos para acelerar salida de referencias antiguas",
        "Software de gestión: integración con sistemas de compra y venta"
      ],
      quiz: [
        {
          question: "¿Cuál es la ventaja principal del método FEFO (First Expired, First Out) aplicado a vinos en comparación con FIFO?",
          options: [
            "Garantiza que se venden primero los vinos más antiguos",
            "Asegura que se venden primero los vinos cercanos a su punto óptimo de consumo",
            "Maximiza el margen por botella vendida",
            "Reduce costes de almacenamiento"
          ],
          correct: 1
        },
        {
          question: "Si un vino tiene rotación de 8 veces al año y el proveedor tarda 15 días en entregar, ¿cuál es el stock mínimo aproximado que deberías mantener?",
          options: [
            "8 botellas",
            "15 botellas",
            "25 botellas",
            "50 botellas"
          ],
          correct: 2
        }
      ],
      content: "Una gestión eficiente de inventario en vinos requiere equilibrar disponibilidad, inversión de capital y condiciones de almacenamiento. La rotación no es uniforme: los vinos jóvenes y frescos rotan rápidamente (10-15 veces/año), el core business entre 8-12 veces, los vinos premium 2-4 veces, y las rarezas pueden rotar menos de una vez al año. El método FEFO (First Expired, First Out) es superior al FIFO en vinos porque considera la vida útil y punto óptimo de consumo: un vino de guarda de 20 años puede seguir mejorando, pero un blanco joven debe consumirse en su ventana óptima. El stock de seguridad debe ser proporcional a la volatilidad de demanda y tiempo de entrega: referencias muy vendidas (core business) requieren stock de seguridad mayor, referencias lentas pueden funcionar con sistemas de pedido bajo demanda. Los inventarios cíclicos (conteos parciales frecuentes) son preferibles a la toma anual en establecimientos de volumen medio-alto: permiten detectar discrepancias rápidamente y evitar ajustes contables grandes. La gestión diferenciada es crítica: los vinos de guarda deben almacenarse en condiciones óptimas (temperatura 10-15°C, humedad 60-80%, oscuridad) independientemente de su rotación; los jóvenes pueden estar en zonas de menor control. Las referencias obsoletas (vinos fuera de mercado, botellas dañadas, vinos pasados de punto) deben identificarse trimestralmente y desmovilizarse mediante promociones o donaciones.",
      practicalExercise: "Realiza un análisis completo de inventario con 15-20 referencias: 1) Calcula rotación real (ventas/mes ÷ stock promedio) de cada una, 2) Clasifica en rangos (rápida >12x/año, media 6-12x/año, lenta <6x/año), 3) Determina stock mínimo y punto de reorden para cada referencia asumiendo plazo de entrega de 15 días, 4) Identifica referencias obsoletas o cercanas a fin de vida útil, 5) Propón plan de desmovilización para 2-3 referencias problemáticas."
    },
    {
      id: "level3-module4",
      slug: "compras-inteligentes-proveedores",
      title: "Compras inteligentes: selección de proveedores",
      description: "Estrategia avanzada de compras: evaluación de proveedores, negociación de condiciones, consolidación de relaciones y optimización de costes.",
      duration: "16 min",
      videoPlaceholder: "compras-inteligentes-proveedores",
      keyPoints: [
        "Tipología de proveedores: distribuidores mayoristas, bodegas directas, importadores especializados",
        "Criterios de evaluación: precio, plazo de entrega, capacidad de servicio, calidad de asesoramiento",
        "Análisis de costes totales: no solo precio unitario, sino logística, mínimos de pedido, términos de pago",
        "Estrategia de concentración versus diversificación de proveedores",
        "Gestión de relaciones: comunicación regular, retroalimentación y oportunidades de crecimiento conjunto",
        "Acceso a lanzamientos de bodegas: importancia comercial y reputacional",
        "Términos de pago: negociación de plazos, descuentos por pronto pago, anticipo de cambios de costes",
        "Aprovisionamiento de vinos de difícil acceso: estrategias de búsqueda y relación con productores",
        "Control de calidad en recepción: inspección de botellas, almacenamiento previo a bodega",
        "Documentación y trazabilidad: facturas, albaranes, certificados de autenticidad"
      ],
      quiz: [
        {
          question: "Un distribuidor A ofrece 12€/botella con 30 días de plazo, 2€/botella de gastos de envío y mínimo de 20 botellas. Un distribuidor B ofrece 11€/botella con 60 días de plazo, 3€/botella de envío y mínimo de 50 botellas. Asumiendo que pagas a 30 días en ambos casos, ¿cuál es el coste real por botella más bajo?",
          options: [
            "Distribuidor A: 14€/botella",
            "Distribuidor B: 14€/botella",
            "Distribuidor A es 0,5€/botella más barato",
            "No se puede calcular sin conocer la rotación"
          ],
          correct: 1
        },
        {
          question: "¿Cuál es la ventaja principal de mantener relaciones directas con bodegas productoras además de distribuidores?",
          options: [
            "Siempre ofrecen precios más bajos que los distribuidores",
            "Acceso a lanzamientos limitados, storytelling directo y posibilidad de eventos promocionales únicos",
            "Garantía de que nunca faltarán referencias en stock",
            "Evitar todas las actividades comerciales de los distribuidores"
          ],
          correct: 1
        }
      ],
      content: "Una estrategia de compras inteligentes equilibra costes, disponibilidad, calidad y relaciones comerciales a largo plazo. No todas las bodegas venden directamente: muchas tienen obligaciones de distribución exclusiva. Los distribuidores mayoristas ofrecen variedad y servicio rápido, pero con márgenes incluidos. Las bodegas directas ofrecen mejores precios en grandes volúmenes y acceso a lanzamientos premium, pero requieren pedidos mínimos. Los importadores especializados son ideales para vinos de difícil acceso o regiones emergentes. El análisis de costes totales es fundamental: dos proveedores con precios unitarios similares pueden tener costes reales muy diferentes considerando gastos de envío, mínimos de pedido, plazo de pago y capacidad de financiación. La negociación debe considerar el volumen comprometido: un distribuidor puede ofrecer descuentos por volumen anual, pero esto requiere compromiso. La gestión de relaciones es crítica en el sector: un proveedor que conoce bien tu establecimiento puede alertarte de cambios de costes, sugerir referencias alineadas con tu propuesta, y ofrecer condiciones mejores. El acceso a lanzamientos de bodegas prestigiosas no solo genera ingresos sino también reputación: ser los primeros en la zona con un vino nuevos atrae clientes entusiastas. La documentación y trazabilidad son obligatorias: cada botella debe poder rastrearse desde proveedor hasta consumidor.",
      practicalExercise: "Realiza un análisis comparativo de 3-4 proveedores (reales o hipotéticos) para una referencia específica o familia de vinos. Para cada uno calcula: 1) Precio unitario, 2) Costes de envío (por botella), 3) Mínimo de pedido, 4) Plazo de entrega, 5) Condiciones de pago, 6) Coste total por botella considerando financiación. Identifica el proveedor más favorable según diferentes escenarios (máxima disponibilidad vs. mínimo coste). Propón una estrategia de relación a largo plazo con tu proveedor seleccionado."
    },
    {
      id: "level3-module5",
      slug: "negociacion-bodegas-distribuidores",
      title: "Negociación con bodegas y distribuidores",
      description: "Técnicas profesionales de negociación comercial para obtener mejores condiciones, acceso a productos y posicionamiento en el mercado.",
      duration: "17 min",
      videoPlaceholder: "negociacion-bodegas-distribuidores",
      keyPoints: [
        "Preparación de la negociación: análisis de posiciones, BATNA (mejor alternativa), límites del negociable",
        "Estructuración de la propuesta de compra: volumen, plazo, términos de pago, compromisos",
        "Argumentación basada en datos: historial de compra, rotación, capacidad de venta",
        "Descuentos por volumen versus descuentos por permanencia",
        "Negociación de exclusividades: beneficios y riesgos",
        "Acceso a campañas de marketing y material promocional de bodegas",
        "Negociación de devoluciones: botellas dañadas, cambios de oferta, obsoletos",
        "Condiciones de pago: días de plazo, descuentos por pronto pago, financiación de stocks",
        "Cláusulas de revisión de precios según cambios de costes",
        "Manejo de conflictos y desacuerdos: soluciones creativas y relación a largo plazo"
      ],
      quiz: [
        {
          question: "En una negociación con un distribuidor, tu BATNA (mejor alternativa) es comprar el mismo vino con otro proveedor a 12€/botella. El distribuidor actual ofrece 11€/botella. ¿Cuál es tu posición ideal en la negociación?",
          options: [
            "Aceptar inmediatamente los 11€",
            "Asegurar que tu límite mínimo sea superior a 11€ y negociar otros términos (plazo, mínimos, exclusividad)",
            "Rechazar cualquier oferta superior a 11€",
            "Usar tu BATNA como presión para obtener 10€"
          ],
          correct: 1
        },
        {
          question: "¿Cuál es la diferencia estratégica clave entre descuentos por volumen y descuentos por permanencia?",
          options: [
            "Los de volumen son siempre mayores",
            "El de volumen premia la cantidad comprada en un período; el de permanencia premia la lealtad a largo plazo y compromiso de compra futura",
            "No hay diferencia, son términos iguales",
            "El de permanencia aplica solo a nuevas bodegas"
          ],
          correct: 1
        }
      ],
      content: "La negociación en el sector de vinos combina análisis económico y gestión de relaciones personales. Toda negociación debe partir de una preparación rigurosa: análisis de la situación de compra actual (volumen, márgenes, rotación), identificación del BATNA (mejor alternativa si no se acuerda), y establecimiento claro de los límites del negociable. La argumentación debe ser basada en datos: historiales de compra, velocidad de rotación del proveedor, capacidad del establecimiento de generar demanda. Los descuentos por volumen son coyunturales (compra grande = descuento), mientras que los de permanencia construyen relaciones a largo plazo garantizando compromiso mutuo. La exclusividad tiene dos caras: puede asegurar diferenciación (ser el único en la zona con una selección), pero también limita opciones y puede resultar en costes más altos si el proveedor sabe que no hay competencia. Las campañas de marketing conjunto y material promocional son oportunidades valiosas que no siempre se negocian: bodegas premium están dispuestas a invertir en promoción de sus vinos en establecimientos de calidad. La política de devoluciones debe quedar clara desde el inicio: botellas dañadas, cambios en la oferta, referencia obsoletas descontinuadas. Los términos de pago son críticos: un plazo de 30 vs. 60 días representa una diferencia sustancial en la financiación requerida. Las cláusulas de revisión de precios protegen a ambas partes: si los costes de producción suben, el proveedor puede aumentar precios, pero con previa comunicación y acuerdo. El manejo del conflicto es profesional: los desacuerdos se resuelven mediante diálogo, búsqueda de alternativas creativas, y priorización de la relación a largo plazo.",
      practicalExercise: "Simula una negociación: eres sumiller de un restaurante de 5 estrellas que quiere aumentar su compra de una bodega de Rioja DOCa del 20 a 50 botellas/mes. 1) Define tu BATNA (mejor alternativa). 2) Estructura tu propuesta de compra con argumentos (rotación actual, tipo de clientes). 3) Identifica qué pides: descuento %, acceso a lanzamientos, términos de pago, exclusividad. 4) Define tus límites no negociables y tus márgenes de flexibilidad. 5) Anticipa objeciones del proveedor y propón soluciones creativas."
    },
    {
      id: "level3-module6",
      slug: "cata-analitica-avanzada",
      title: "Cata analítica avanzada: estructura y equilibrio",
      description: "Metodología de cata profesional enfocada en análisis exhaustivo de estructura, equilibrio, evolución y potencial de envejecimiento.",
      duration: "18 min",
      videoPlaceholder: "cata-analitica-avanzada-estructura",
      keyPoints: [
        "Análisis exhaustivo de color: tonalidad, intensidad, evolución según edad y almacenamiento",
        "Evaluación de aromas: identificación precisa de familias aromáticas, reconocimiento de defectos",
        "Estructura de taninos: tamaño, aspereza, evolución, integración en el vino",
        "Acidez: papel en la estructura, equilibrio, capacidad de guarda",
        "Alcohol: aporte energético, equilibrio con otros componentes, sensación en boca",
        "Cuerpo y extracto: densidad, concentración, impresión general",
        "Análisis del equilibrio: relación entre alcohol, acidez, taninos, azúcares residuales",
        "Evolución temporal: cambios en nariz y boca durante la cata (volatilidad)",
        "Detección y caracterización de defectos: oxidación, refermentación, corcho contaminado",
        "Evaluación de potencial: predicción de evolución y punto óptimo de consumo"
      ],
      quiz: [
        {
          question: "En un análisis de estructura, ¿qué indica que los taninos sean 'ásperos' en lugar de 'integrados'?",
          options: [
            "Que el vino está en su punto óptimo de consumo",
            "Que los taninos aún no se han polimerizado y necesitan más tiempo de envejecimiento",
            "Que el vino es de mala calidad",
            "Que es un vino joven que debe consumirse inmediatamente"
          ],
          correct: 1
        },
        {
          question: "¿Cuál es el papel equilibrador fundamental de la acidez en un vino tinto de cuerpo completo?",
          options: [
            "Rebajar el alcohol para hacerlo más drinkable",
            "Contrarrestar la densidad y riqueza, proporcionar frescura y estructura para el envejecimiento",
            "Potenciar los aromas frutales",
            "Reducir la sensación de los taninos"
          ],
          correct: 1
        }
      ],
      content: "La cata analítica avanzada va más allá de la apreciación sensorial: busca descomponer el vino en sus componentes para evaluar calidad, equilibrio y potencial. El análisis de color es la primera herramienta: en tintos jóvenes, el color púrpura o rojo intenso indica frescura; la evolución hacia tonos granate señala maduración; los tintes anaranjados o parduzcos pueden indicar sobre-oxidación. Los aromas se dividen en familias: primarios (fruta fresca, vegetales), secundarios (fermentación: pan, levadura), terciarios (envejecimiento: cuero, tabaco, vainilla). La estructura es el esqueleto del vino: los taninos, ácidos y alcohol interactúan creando sensaciones en boca. Los taninos jóvenes se perciben como ásperos (sensación pétrea, secante); con envejecimiento, se polimerizan y suavizan, integrándose en la estructura. La acidez no solo proporciona frescura, sino que es determinante en la longevidad: vinos con buena acidez tienden a envejecer mejor. El cuerpo es la impresión general de densidad: se determina por concentración de extractos, alcohol, taninos. El equilibrio es el concepto central: un vino está equilibrado cuando ningún componente domina de forma desagradable. En la evolución temporal, los buenos vinos revelan cambios durante la cata: en los primeros 5 minutos tras la apertura, aromas volátiles emergen y desaparecen, dejando paso a aromas más estables. La detección de defectos requiere entrenamiento: la oxidación (aromas a madeira, fruta cocida), la refermentación (burbujas indeseadas, sabor a levadura), el corcho contaminado (aromas a sótano, falta de fruta). La evaluación del potencial es la capacidad de predecir cómo evolucionará el vino: requiere conocimiento de regiones, variedades y condiciones de almacenamiento.",
      practicalExercise: "Realiza una cata analítica completa de 2-3 vinos (un joven, uno en evolución, uno maduro): 1) Color: describe tonalidad, intensidad, evolución desde el borde. 2) Nariz: identifica familias aromáticas (primarios, secundarios, terciarios). 3) Estructura en boca: taninos (tamaño, aspereza, integración), acidez (nivel, papel equilibrador), alcohol (aporte energético), cuerpo (impresión general). 4) Equilibrio: evalúa relación entre componentes, identifica si hay dominancias indeseables. 5) Evolución temporal: nota cambios durante 10 minutos de cata. 6) Potencial: predice punto óptimo de consumo y longevidad estimada. 7) Defectos: identifica cualquiera. Elabora una ficha técnica de cata profesional."
    },
    {
      id: "level3-module7",
      slug: "cata-ciegas-profesional",
      title: "Cata a ciegas profesional: método deductivo",
      description: "Técnica avanzada de cata ciega: deducción de origen, varietal, edad y calidad mediante análisis sistemático de características.",
      duration: "19 min",
      videoPlaceholder: "cata-ciegas-metodo-deductivo",
      keyPoints: [
        "Objetivos de la cata ciega: evaluación sin sesgos, entrenamiento sensorial, mejora de análisis",
        "Método de reducción: eliminación sistemática de posibilidades según características",
        "Identificación de variedad: patrones cromáticos, aromáticos, estructurales distintivos",
        "Deducción de región: microclima, altitud, tipo de suelo, expresión territorial",
        "Estimación de edad: evolución de color, integración de aromas, estado de taninos",
        "Evaluación de calidad: amplitud aromática, complejidad, finura, precisión",
        "Diferenciación entre estilos: tradicional vs. moderno, natural vs. convencional",
        "Hipótesis múltiples: mantener varias posibilidades hasta conclusión",
        "Registro estructurado: ficha de cata con apartados deductivos",
        "Análisis de errores: aprendizaje de desviaciones entre hipótesis y realidad"
      ],
      quiz: [
        {
          question: "En una cata ciega, observas color rojo claro (no púrpura), aromas a fruta roja fresca y especias blancas, baja densidad, acidez marcada, taninos finos. ¿Qué información deductiva sugieren estas características?",
          options: [
            "Vino tinto joven de clima cálido, variedad Cabernet Sauvignon, no apto para guarda",
            "Vino tinto que ha pasado varios años en bodega, probablemente Garnacha o Pinot Noir, potencial de envejecimiento moderado",
            "Vino blanco envejecido, probablemente Riesling o Albariño",
            "Vino de gran densidad y estructurado, apto para colección a largo plazo"
          ],
          correct: 1
        },
        {
          question: "¿Cuál es la ventaja fundamental de la cata ciega respecto a cata con información de la botella?",
          options: [
            "Siempre produce puntuaciones más altas",
            "Permite evaluación sin sesgos previos, forzando análisis objetivo basado en caracteres reales",
            "Es más rápida de realizar",
            "Reduce el número de variables a considerar"
          ],
          correct: 1
        }
      ],
      content: "La cata ciega es la prueba de fuego del conocimiento enológico: sin información de procedencia, variedad o precio, el catador debe deducir todos estos detalles mediante observación sistemática. El método es de reducción: el color inicial limita el espectro de posibilidades (un color rojo claro descarta Cabernet Sauvignon en clima cálido); los aromas primarios sugieren región y climate (notas a albaricoque deshidratado sugieren clima muy cálido, notas a cereza ácida sugieren clima frescos); la estructura desvela el potencial de envejecimiento (ácidos marcados + taninos finos = potencial de guarda). El objetivo no es siempre identificar perfectamente, sino entrenar la capacidad de análisis y eliminar sesgos: el hecho de que una botella sea cara no debe influir en la evaluación. Los patrones aromáticos son familia-específicos: Riojas tradicionales tienen aromas a cuero, tabaco, especia; Rioja moderno puede tener más fruta; Pinot Noir tiene notas a cereza, regaliz; Syrah tiene notas a pimienta, flores. La estimación de edad es probabilística: un color rojo púrpura sugiere juventud; la presencia de aromas terciarios (cuero, madera) sugiere envejecimiento; la integración de taninos sugiere al menos 5-7 años de botella. La evaluación de calidad se basa en amplitud aromática (número de familias aromáticas identificadas), complejidad (capas de sabores, evolución), finura (sensación elegante vs. grosera), precisión (déficit de componentes o falta de integración). La diferenciación entre estilos es crucial en épocas modernas: algunos vinos se hacen para consumo temprano (natural, light, frescos), otros para envejecimiento (estructura, polimerización de taninos). El registro debe ser metódico: describir observaciones antes de hipótesis, mantener múltiples posibilidades hasta tener suficiente información, finalizar con conclusión y margen de confianza.",
      practicalExercise: "Realiza catas ciegas de 3-4 vinos. Para cada uno: 1) Describe color sin conclusiones. 2) Describe nariz: familias aromáticas, intensidad, complejidad. 3) Estructura: taninos, acidez, cuerpo, alcohol estimado. 4) Elabora hipótesis de variedad/región/edad basada en características. 5) Identifica 2-3 hipótesis alternativas. 6) Califica amplitud (número de aromas), complejidad, finura. 7) Revela identidad real. 8) Analiza desviaciones entre predicción y realidad, aprende de errores. Objetivo: 60% de acierto en región, 50% en varietal."
    },
    {
      id: "level3-module8",
      slug: "servicio-alta-gama",
      title: "Servicio de alta gama: decantación, magnum, vinos añejos",
      description: "Técnicas profesionales de servicio para vinos premium: manejo especial de botellas grandes, decantación estratégica, servicio de rarezas.",
      duration: "17 min",
      videoPlaceholder: "servicio-alta-gama-decantacion",
      keyPoints: [
        "Preparación previa: temperatura, oxigenación, movimiento de botellas",
        "Decantación: objetivos (separación de depósitos, oxigenación), técnica, timing",
        "Decantadores: tipos, función, estética y comunicación al cliente",
        "Servicio de botellas grandes (magnum, jéroboam): técnica, apoyo, control",
        "Vinos añejos y de larga crianza: manejo delicado, evitar agitación excesiva",
        "Cálculo de temperatura óptima para cada estilo: guía de referencias",
        "Presentación del vino al cliente: información, storytelling, creación de expectativa",
        "Gestión de copas: tamaño, forma, temperatura, secado",
        "Servicio de vinos por copa en alta gama: técnica de medida, calidad, consistencia",
        "Acompañamiento: agua, paleta de sabores, interrupción minimizada durante disfrute"
      ],
      quiz: [
        {
          question: "¿Cuál es el objetivo principal de la decantación en un Rioja Reserva de 15 años?",
          options: [
            "Aumentar la temperatura del vino",
            "Separar posibles depósitos sólidos y permitir aireación controlada sin agitación excesiva de sedimentos",
            "Cambiar el sabor del vino",
            "Reducir el alcohol"
          ],
          correct: 1
        },
        {
          question: "Un vino de 8 años, criado en barrica durante 24 meses, ¿debería decantarse?",
          options: [
            "Sí, siempre se decanta todo vino tinto",
            "Probablemente no: a esa edad es poco probable tener depósitos significativos, y la decantación puede favorecer oxidación prematura",
            "Solo si el cliente lo pide",
            "Sí, para que el vino gane volumen en la boca"
          ],
          correct: 1
        }
      ],
      content: "El servicio de alta gama distingue establecimientos premium. La preparación previa es crucial: temperatura óptima (vinos tintos 16-18°C, blancos secos 8-10°C, rancios 12-14°C), identificación de posibles depósitos, evaluación de la necesidad de decantación. La decantación tiene dos objetivos distintos: separar depósitos (posos naturales que se forman en vinos envejecidos) y oxigenación controlada. Tintos jóvenes con estructura (Cabernet, Syrah) benefician de una aeración activa (30-60 minutos antes de servir); vinos añejos requieren decantación lenta y delicada, minimizando turbulencia que puede provocar rápida oxidación. El decantador debe ser elegido según el vino: decantadores anchos favorecen la aireación; decantadores alargados son más seguros para vinos frágiles. Botellas grandes (magnum = 1,5L, jéroboam = 3L) requieren técnica especial: mayor peso, necesidad de apoyo firme, control de flujo de vino. La presentación al cliente en alta gama es fundamental: el sumiller describe el vino, su origen, historia, potencial de evolución; crea anticipación y justifica el precio. Las copas deben ser de tamaño adecuado (no llenar más del 1/3, permitir oxigenación en aire), forma (tulipa para tintos, flauta para espumosos, balón para blancos complejos), siempre a temperatura ambiente. El servicio por copa en alta gama requiere medida precisa, conocimiento de la apertura del vino (cómo cambia con el tiempo en decantador), consistencia. El acompañamiento profesional incluye agua para limpiar paladar entre vinos, pan neutro, minimal interrupciones durante el disfrute. Los vinos de larga crianza (20+ años) pueden ser frágiles: la oxidación es proceso natural, algunos pierden fruta y ganan notas terciarias; el objetivo es servir en su punto óptimo, que puede ser inmediatamente tras la apertura (algunos declinan rápidamente) o tras 30-60 minutos de aireación.",
      practicalExercise: "Simula el servicio de 3 vinos en diferentes escenarios: 1) Un Rioja Reserva 2005 (15 años): ¿necesita decantación? ¿Cuánto tiempo antes de servir? ¿Temperatura óptima? Describe presentación al cliente. 2) Una botella de magnum de Champagne brut: preparación, técnica de servicio, gestión de temperatura. 3) Un Vino Rancio DOQ (aejo 15 años): ¿riesgo de oxidación? ¿Decantación necesaria? ¿Cómo presentar? Elabora fichas de servicio para cada escenario con temperaturas, tiempos, copas recomendadas."
    },
    {
      id: "level3-module9",
      slug: "maridaje-avanzado",
      title: "Maridaje avanzado: cocina de autor y menú degustación",
      description: "Técnicas de maridaje profesional para menús de alta cocina: creación de secuencias armónicas, manejo de vinos por plato y equilibrio global.",
      duration: "18 min",
      videoPlaceholder: "maridaje-avanzado-cocina-autor",
      keyPoints: [
        "Principios de maridaje: similitud, contraste, intensidad, aromas, texturas",
        "Análisis químico-sensorial: componentes del plato que requieren complementación o contraste",
        "Construcción de menús de degustación: secuencia de platos y vinos equilibrada",
        "Manejo de transiciones: entre platos y vinos, limpieza de paladar estratégica",
        "Protagonismo: decidir si vino es complemento o elemento central del maridaje",
        "Cocina de autor y técnicas modernas: deconstrucciones, aires, espumas, marinadas",
        "Vinos naturales y no convencionales en maridaje: oportunidades y desafíos",
        "Maridajes locales: sinergias entre vinos y cocina regional",
        "Feedback del cliente: ajustes en tiempo real durante degustación",
        "Documentación: fichas de maridaje, notas de cata, evolución de propuestas"
      ],
      quiz: [
        {
          question: "En un plato de pescado blanco con salsa de champiñones y trufa, ¿qué tipo de vino sería la mejor opción?",
          options: [
            "Un blanco ligero y frutal (Albariño joven)",
            "Un blanco con cuerpo, estructura y aromas florales (Chardonnay envejecido) o un tinto muy ligero (Pinot Noir frío)",
            "Un tinto joven y potente (Tempranillo joven)",
            "Un espumoso brut nature"
          ],
          correct: 1
        },
        {
          question: "¿Cuál es el error más común en menús de degustación con múltiples vinos?",
          options: [
            "Elegir vinos demasiado variados y carentes de coherencia global",
            "Elegir vinos con igual intensidad en todos los platos, creando monotonía",
            "Ambos anteriores: falta de coherencia en la secuencia y equilibrio entre vinos",
            "Usar solo vinos de una región"
          ],
          correct: 2
        }
      ],
      content: "El maridaje avanzado es un arte que requiere conocimiento profundo de gastronomía, enología y química sensorial. Los principios básicos (similitud, contraste, intensidad) se aplican de forma sofisticada: un plato con notas de champiñón puede maridar por similaridad (vino con aromas a tierra) o por contraste (blanco mineral que limpie las grasas del hongo). El análisis químico-sensorial es crítico: identificar componentes principales del plato (sabor dominante, texturas, técnicas culinarias aplicadas), evaluar qué elemento del vino las complementa mejor. Un plato de carne con costra tostada requiere vino con taninos y alcohol para equilibrar; uno con salsa láctea requiere acidez para limpiar; uno con especias requiere vino cuya complejidad no compita. La construcción de menús de degustación sigue lógica: comenzar con vinos blancos ligeros que abren el apetito, progresar hacia tintos progresivamente más densos, finalizar con vinos dulces o espumosos. Las transiciones son fundamentales: entre platos, el agua mineral débilmente mineralizada limpia mejor que agua sin mineralización; pequeños sorbos de vino del siguiente pueden preparar el paladar. El manejo del protagonismo es decisión estratégica: en algunos casos, el vino es la estrella (menu built around wine); en otros, es complemento discreto (el plato es la estrella). La cocina de autor presenta desafíos específicos: deconstrucciones, aires, sabores inesperados requieren pensamiento lateral. Los vinos naturales ofrecen oportunidades (características únicas, expresión de terroir), pero también desafíos (variabilidad, defectos potenciales). El feedback en tiempo real es profesional: si el cliente detecta desajuste, el sumiller puede sugerir alternativas, ajustar servicio, o documentar para evolución futura. La documentación es fundamental para mejora continua: fichas de cada maridaje, notas de cliente, cambios estacionales.",
      practicalExercise: "Diseña un menú de degustación (5-6 platos) de cocina de autor con sus vinos maridar: 1) Analiza cada plato: ingredientes principales, técnicas, sabor dominante, texturas. 2) Para cada plato, propón vino específico con justificación (qué componente del vino complementa qué elemento del plato). 3) Evalúa la secuencia global: ¿hay progresión lógica? ¿Monotonía? 4) Planifica transiciones y limpieza de paladar. 5) Crea fichas de maridaje profesionales. Alternativa: si el restaurante tiene menú fijo, realiza maridaje real con platos reales y vinos disponibles en la carta."
    },
    {
      id: "level3-module10",
      slug: "vinos-mundo-regiones-emergentes",
      title: "Vinos del mundo: regiones emergentes",
      description: "Exploración de regiones vitivinícolas emergentes: oportunidades comerciales, características distintivas, tendencias de mercado.",
      duration: "16 min",
      videoPlaceholder: "vinos-mundo-regiones-emergentes",
      keyPoints: [
        "Definición de región emergente: criterios de clasificación, potencial de crecimiento, novedad en mercado",
        "Geografía vitivinícola: Sudáfrica, Argentina (Salta, Valle de Uco), Chile (Patagonia), Portugal (interior, Douro levantisco)",
        "Nuevos terroirs europeos: Georgia, Moldova, Ucrania, Eslovenia, Croacia",
        "Características distintivas: variedades autóctonas, estilos únicos, relación calidad-precio",
        "Sostenibilidad y métodos naturales: predominancia en regiones emergentes",
        "Oportunidades comerciales: nichos de mercado, clientes entusiastas, diferenciación",
        "Desafíos: trazabilidad, consistencia, distribución, documentación",
        "Tendencias: vinos naranjas (orange wines), vinos naturales, low/no sulfites",
        "Educación del cliente: cómo presentar y promover vinos desconocidos",
        "Proveedores y fuentes de información: asociaciones, importadores especializados, publicaciones"
      ],
      quiz: [
        {
          question: "¿Cuál es la principal oportunidad comercial de incluir vinos de regiones emergentes (Moldavia, Georgia) en carta de restaurante de alta gama?",
          options: [
            "Siempre son más baratos que vinos de Burdeos",
            "Diferenciación clara, atracción de clientes entusiastas, relación calidad-precio excelente, narrativa única",
            "Garantía de que envejecerán mejor que vinos clásicos",
            "Ninguna, son muy desconocidos"
          ],
          correct: 1
        },
        {
          question: "¿Qué característica comparten muchos vinos de regiones emergentes con métodos naturales?",
          options: [
            "Mayor volumen de sulfitos",
            "Color más claro y sabores menos intensos",
            "Énfasis en expresión de terroir, variedades autóctonas, producción sostenible, menor intervención en bodega",
            "Menor edad mínima de conservación"
          ],
          correct: 2
        }
      ],
      content: "Las regiones emergentes son oportunidades tanto comerciales como educativas. Sudáfrica ofrece Pinotage (variedad única), vinos de excelente relación calidad-precio y liderazgo en viticultura sostenible. Argentina, más allá de Mendoza, presenta Salta (altitudes extremas, Torrontés aromático) y Valle de Uco (altitud, Malbec complejo). Chile, además de zonas clásicas, explora Patagonia (clima fresco, expresión delicada). Portugal, históricamente conocido por oporto y madeira, ahora ofrece tintos del interior (Dão, Douro) de estructura impresionante. Europa del Este presenta joyas: Georgia (cuna de la viticultura, variedades autóctonas como Saperavi), Moldova (relación calidad-precio imbatible), Eslovenia y Croacia (frescos blancos mediterráneos, tintos elegantes). Las características distintivas de emergentes son: variedades autóctonas que no existen en otros lugares (valor de descubrimiento), estilos únicos que reflejan terroir poco explorado, precios accesibles comparados con equivalentes europeos establecidos. La sostenibilidad es seña de identidad: muchas regiones emergentes evitan la industrialización excesiva, privilegian métodos naturales, buscan certificaciones orgánicas o biodinámicas. Las tendencias modernas (vinos naranjas, naturales, low-sulfites) convergen con producción en emergentes. Las oportunidades comerciales son claras: diferenciar la carta, atraer clientes curiosos dispuestos a experimentar, generar narrativa de descubrimiento, mejorar márgenes (vinos de gran calidad a precios 30-50% más bajos que equivalentes europeos). Los desafíos incluyen trazabilidad (algunos mercados carecen de estructura formal), consistencia (pequeños productores pueden variar año a año), distribución (requiere importadores especializados), educación del cliente (nombres desconocidos requieren explicación). La educación es crítica: un sumiller debe poder narrar la historia, explicar características distintivas, justificar inclusión en carta de alta gama.",
      practicalExercise: "Selecciona 3-4 regiones emergentes. Para cada una: 1) Investiga historia vitivinícola, clima, terroir. 2) Identifica variedades principales y estilos distintivos. 3) Busca 2-3 productores reconocidos y analiza vinos (características, precio, disponibilidad). 4) Evalúa potencial comercial para tu establecimiento (target cliente, diferenciación). 5) Diseña propuesta de inclusión en carta: qué vinos, posicionamiento, precio. 6) Elabora guía de presentación al cliente: historia, características, maridaje sugerido. Presenta 2-3 vinos a clientes/colegas y recoge feedback."
    },
    {
      id: "level3-module11",
      slug: "viticultura-avanzada",
      title: "Viticultura avanzada: clones, portainjertos, conducción",
      description: "Conocimiento profundo de factores vitícolas que impactan calidad: selección de clones, portainjertos, sistemas de conducción y prácticas culturales.",
      duration: "17 min",
      videoPlaceholder: "viticultura-avanzada-clones",
      keyPoints: [
        "Clones de Vitis vinifera: concepto, selección masiva vs. selección clonal, impacto en vino",
        "Clones notables: Pinot Noir (PN114, PN777), Riesling (clones limpios), Tempranillo (diferentes perfiles)",
        "Portainjertos: función (adaptación a suelo, resistencia a plagas), elección según contexto",
        "Sistemas de conducción: vaso, espaldera, pérgola; impacto en aireación, exposición solar, vigor",
        "Poda y manejo del dosel: equilibrio entre vigor y fructificación, estrés positivo",
        "Vendimia en verde: ajuste de carga de uva, calidad vs. cantidad",
        "Prácticas sostenibles: cubiertas vegetales, compost, integración del ecosistema",
        "Adaptación al cambio climático: elección de portainjertos, altitud, orientación de viñedos",
        "Estrés hídrico controlado: impacto en concentración, fenología, madurez",
        "Terroir vs. técnica: cómo decisiones vitícolas modulan expresión de terroir"
      ],
      quiz: [
        {
          question: "¿Cuál es la función principal de un portainjerto en viticultura moderna?",
          options: [
            "Cambiar el sabor del vino para mejorar su calidad",
            "Adaptar la vid a suelo específico, proporcionar resistencia a plagas (filoxera, nematodos), controlar vigor",
            "Aumentar la producción de uva",
            "Permitir que variedades clásicas crezcan en climas muy cálidos sin cambios"
          ],
          correct: 1
        },
        {
          question: "En un contexto de cambio climático con temperaturas crecientes, ¿qué adaptación vitícola sería preferible?",
          options: [
            "Cambiar a variedades muy tolerantes de calor, ignorar terroir tradicional",
            "Aumentar la altitud de plantaciones, ajustar portainjertos, elegir clones menos vigorosos, mantener vigor controlado para equilibrio",
            "No hacer nada y aceptar pérdidas de calidad",
            "Riego intensivo para compensar estrés hídrico"
          ],
          correct: 1
        }
      ],
      content: "La viticultura avanzada reconoce que el vino comienza en el viñedo: decisiones de selección de clones, portainjertos y sistemas de conducción impactan profundamente en la calidad final. Los clones son variaciones genéticas de una variedad seleccionadas a través de reproducción vegetativa: Pinot Noir tiene múltiples clones con características distintas (PN114 produce vinos más estructurados, PN777 más aromáticos). La selección clonal es decisión estratégica: algunos productores buscan mezcla de clones para complejidad; otros priorizan pureza de expresión. Los portainjertos cumplen función crucial: proporcionan resistencia a filoxera y otros nematodos, adaptan vigor de la vid al suelo disponible (portainjertos débiles ralentizan crecimiento en suelos muy ricos), controlan tamaño final de la planta. La elección varía según suelo: en suelos pobres, portainjerto vigoroso es necesario; en suelos ricos, portainjerto débil evita exceso de vegetación. Los sistemas de conducción (vaso = baja producción, calidad superior; espaldera = mecanización, mayor producción; pérgola = control fino de radiación solar) impactan aireación, exposición solar, estrés de la planta. La poda es arte: el objetivo es equilibrio entre vigor y fructificación. Vendimias en verde (eliminación de uvas inmaduras en verano) reduce rendimiento pero aumenta concentración de azúcares, compuestos fenólicos, aromáticos. Las prácticas sostenibles (cubiertas vegetales, compost, ausencia de agroquímicos) mantienen suelo vivo, mejorar microbiota, reducen inputs externos. El cambio climático força adaptaciones: aumentar altitud de viñedos, ajustar portainjertos para resistencia a estrés hídrico, seleccionar clones menos vigorosos que puedan expresarse sin exceso de alcohol. El estrés hídrico controlado (riego limitado) favorece concentración, pero requiere precisión: estrés excesivo reduce calidad. El concepto clave es que terroir (suelo, clima, altitud, orientación) y técnica vitícola interactúan: grandes terroirs con técnica mediocre no producen grandes vinos; terroirs modestos con técnica excelente pueden sorprender.",
      practicalExercise: "Selecciona una variedad y región específicas. Investiga: 1) Clones disponibles: características, productores que los usan, impacto en vino. 2) Portainjertos más usados: adaptación a suelos locales, gestión de vigor. 3) Sistemas de conducción: cuál es predominante, por qué. 4) Prácticas sostenibles locales: certificaciones, impacto detectables en vino. 5) Desafíos del cambio climático en la región: cómo se adaptan. 6) Cata comparativa (si accesible): misma variedad, diferentes clones o productores; identifica diferencias atribuibles a decisiones vitícolas. Elabora informe que conecte decisiones vitícolas con perfil organoléptico final."
    },
    {
      id: "level3-module12",
      slug: "enologia-avanzada",
      title: "Enología avanzada: fermentaciones, estabilización, filtrado",
      description: "Conocimiento profundo de procesos enológicos que modelan características finales: fermentación alcohólica y maloláctica, estabilización, técnicas de clarificación.",
      duration: "18 min",
      videoPlaceholder: "enologia-avanzada-fermentaciones",
      keyPoints: [
        "Fermentación alcohólica: papel de levaduras, temperatura, duración, impacto en aroma y sabor",
        "Levaduras seleccionadas vs. fermentación espontánea: ventajas y desafíos de cada enfoque",
        "Fermentación maloláctica: proceso bioquímico, momento óptimo, impacto en acidez y complejidad",
        "Contacto con bagazo (skin contact): duración, impacto en color, taninos, aromas",
        "Crianza en barrica vs. acero: impacto en oxidación, aromas, textura, evolución",
        "Estabilización: remoción de proteínas, polifenoles, cristales de tartrato; métodos",
        "Filtración: objetivos, tipos (membranas, tierra), riesgo de pérdida de sabor",
        "Clarificación: bentonita, albumina, gelatina; impacto en vino final",
        "Uso de sulfitos: protección oxidativa y antimicrobiana, controversia de vinos naturales",
        "Control de defectos: referencias biológicas, acetificación, refermentación, oxidación"
      ],
      quiz: [
        {
          question: "¿Cuál es el impacto principal de la fermentación maloláctica en un vino tinto?",
          options: [
            "Aumento de alcohol",
            "Reducción de acidez (málico → láctico), aumento de complejidad aromática, sensación más redonda",
            "Cambio de color a más oscuro",
            "Aumento de taninos"
          ],
          correct: 1
        },
        {
          question: "¿Por qué algunos enólogos evitan la filtración en vinos premium pese al riesgo de turbidez?",
          options: [
            "Porque la filtración siempre causa problemas",
            "Porque la filtración puede remover compuestos que contribuyen a sabor, textura y evolución; el riesgo de turbidez es aceptable en vinos de calidad",
            "Porque filtramos solo vinos baratos",
            "Porque los clientes premium no toleran turbidez"
          ],
          correct: 1
        }
      ],
      content: "La enología avanzada es el control fino de procesos bioquímicos que transforman zumo en vino. La fermentación alcohólica es catalizada por levaduras (Saccharomyces cerevisiae naturales o seleccionadas) que consumen azúcares y producen alcohol, CO2, calor, y subproductos aromáticos (ésteres, alcoholes superiores). La temperatura es crítica: fermentaciones frías (12-16°C) preservan aromas primarios, son lentas; fermentaciones cálidas (20-25°C) son rápidas, generan más calor, pueden producir defectos. Las levaduras seleccionadas garantizan fermentación predecible y control de características finales; la fermentación espontánea (con levaduras salvajes del entorno) es más arriesgada pero puede producir vinos más complejos. La fermentación maloláctica es proceso secundario realizado por bacterias lácticas (Oenococcus oeni): convierte ácido málico (ácido, marcado) en ácido láctico (suave, mantecoso). En blancos frescos se evita (mantiene acidez); en tintos es buscada (reduce acidez, aumenta complejidad, agrega aromas lácticos). El contacto con bagazo (hollejos) en blancos puede ser prolongado (vinos naranjas, contact time 12-48 horas) para extracción de color, taninos, aromas; en tintos es parte estándar de maceración. La crianza en barrica expone vino a leve oxigenación, extrae compuestos de madera (vanilina, tostación), genera aromas terciarios; duración varía (6-36 meses según estilo). El acero inoxidable preserva frescura, impide oxidación, ideal para blancos aromáticos. La estabilización es remoción de compuestos inestables: proteínas que causen turbidez, cristales de tartrato que se precipiten en frío, oxidasas que causen pardeamiento. La filtración es controversial: elimina microorganismos y partículas, garantiza claridad, pero puede remover compuestos que contribuyen a sabor y evolución; vinos de calidad premium frecuentemente evitan filtración fina. El manejo de sulfitos es crítico: SO2 protege contra oxidación y contaminación microbiana, esencial en vinos clásicos; vinos naturales minimizan sulfitos (riesgo mayor de defectos). La detección de defectos requiere conocimiento: acetificación (vinagre), refermentación (burbujas), oxidación (color anómalo, aromas cocidos), corcho contaminado.",
      practicalExercise: "Analiza 2-3 vinos con diferentes perfiles enológicos: 1) Vino blanco fresco sin maloláctica vs. con maloláctica (si accesible): identifica diferencias en acidez, complejidad aromática, textura. 2) Vino en barrica vs. acero inoxidable: compara impacto en color, aromas, oxidación. 3) Vino filtrado vs. sin filtrar (si disponible): nota diferencias en claridad, intensidad aromática. Para cada comparación: 4) Conecta características observadas con decisiones enológicas. 5) Propón perfiles sensoriales esperados según proceso. 6) Evalúa defectos potenciales. Elabora informe análisis enológico comparativo."
    },
    {
      id: "level3-module13",
      slug: "legislacion-vitivinicola",
      title: "Legislación vitivinícola española e internacional",
      description: "Marco legal de producción, comercialización y servicio de vinos: denominaciones, estándares de calidad, regulaciones nacionales e internacionales.",
      duration: "15 min",
      videoPlaceholder: "legislacion-vitivinicola-normativa",
      keyPoints: [
        "Clasificación de vinos en España: DOP (DO, DOCa, DOCA), IGP, vinos de mesa",
        "Requisitos de producción: zonas geográficas, variedades permitidas, rendimientos máximos, procesos obligatorios",
        "Denominación de Origen Protegida: criterios, control, certificación, prestigio comercial",
        "Vinos importados: trazabilidad, certificados de origen, cumplimiento normativo",
        "Regulación de etiquetado: información obligatoria, claims de salud permitidos, prohibiciones",
        "Normativa internacional: Acuerdos bilaterales (UE-Australia, UE-Argentina), armonización",
        "Regulación de servicio: límites de alcohol en menores, responsabilidad del establecimiento",
        "Fraude y falsificación: medidas anti-contrafacción, denuncias, protección del consumidor",
        "Sostenibilidad: certificaciones ecológicas, biodinámica, carbono neutral",
        "Documentación: albaranes, facturas, registros de compra-venta, auditorías"
      ],
      quiz: [
        {
          question: "¿Cuál es la principal diferencia entre Denominación de Origen (DO) y Denominación de Origen Protegida (DOP)?",
          options: [
            "No hay diferencia, son términos equivalentes",
            "DOP es término europeo que incluye DO españolas; implica regulación más estricta y protección legal internacional",
            "DO es superior a DOP en prestigio",
            "DOP solo aplica a vinos blancos"
          ],
          correct: 1
        },
        {
          question: "¿Qué información es OBLIGATORIA en la etiqueta de una botella de vino según regulación UE?",
          options: [
            "Solo nombre del vino y bodega",
            "Nombre del producto, % alcohol, volumen, país origen, información de alérgenos (sulfitos), identificación del embotellador",
            "Cualquier información que el productor desee incluir",
            "Año de cosecha (obligatorio siempre)"
          ],
          correct: 1
        }
      ],
      content: "La legislación vitivinícola es fundamental para profesionales: garantiza calidad, protege consumidores, y define marcos comerciales. En España, la clasificación se estructura en DOP (Denominación de Origen Protegida: DO tradicional, DOCa como Rioja o Priorat con regulación más estricta), IGP (Indicación Geográfica Protegida: menos restrictiva, pero asociada a región), y vino de mesa (sin protección geográfica). Las DOP requieren cumplimiento de reglas estrictas: zonas geográficas definidas, variedades permitidas específicas, rendimiento máximo de uva por hectárea (evitar sobre-producción), procesos obligatorios (alcoholización mínima, acidez máxima), controles de producción y envejecimiento (Rioja Reserva requiere mínimo 3 años, 1 en barrica). El control es ejercido por Consejos Reguladores que realizan auditorías, análisis, verificaciones. Las DOP ostentan prestigio comercial y justifican precios superiores. Los vinos importados requieren certificados de origen, compliance con normativa local, trazabilidad documentada. El etiquetado tiene regulaciones estrictas: debe incluir nombre del vino, país de origen, % alcohol, volumen, identificación del embotellador, información de alérgenos (sulfitos), advertencias de salud. Los claims de salud (beneficios para la salud) están prohibidos en bebidas alcohólicas en UE. La regulación internacional varía: acuerdos bilaterales (UE-Australia, UE-Argentina) armonizar requisitos; sin acuerdos, cada país aplica estándares propios (lo que complica comercio). La regulación de servicio requiere responsabilidad del establecimiento: prohibido vender a menores, obligación de negarse a servir a personas intoxicadas. El fraude es problemático: falsificación de botellas, adición de vinos de baja calidad a botellas premium, corcho contaminado que afecta autenticidad. La documentación es obligatoria: albaranes de compra, facturas, registro de inventario; auditorías periódicas verifican trazabilidad. Las certificaciones de sostenibilidad (Ecológica, Biodinámica, Carbono Neutral) añaden valor pero requieren cumplimiento específico verificado por organismos independientes.",
      practicalExercise: "Realiza análisis de cumplimiento normativo de 5-6 vinos de tu carta: 1) Verifica información de etiqueta: ¿cumple requisitos obligatorios? 2) Identifica DOP/IGP/Vino de mesa; investiga requisitos de cada clasificación. 3) Para importados, verifica documentación: certificados de origen, cumplimiento normativo. 4) Evalúa si hay claims no permitidos. 5) Revisa documentación interna: ¿hay trazabilidad completa de compra? 6) Propone sistema de control de documentación (albaranes, facturas, registros). Elabora matriz de cumplimiento normativo."
    },
    {
      id: "level3-module14",
      slug: "marketing-vino-restauracion",
      title: "Marketing del vino en restauración",
      description: "Estrategias comerciales para promocionar vinos, aumentar venta y crear experiencia de valor para cliente en entorno de servicio.",
      duration: "16 min",
      videoPlaceholder: "marketing-vino-restauracion",
      keyPoints: [
        "Posicionamiento de la carta: diferenciación clara, identidad propia, coherencia con propuesta gastronómica",
        "Promoción de referencias: destacados mensuales, vinos por copa, degustaciones, promociones puntuales",
        "Storytelling: narración del origen, características, historia del bodega; conexión emocional con cliente",
        "Capacitación del personal: conocimiento básico, técnica de venta, recomendación consultiva",
        "Utilización de redes sociales: fotos de vinos, eventos, educación enológica, hashtags locales",
        "Eventos y maridajes: catas en restaurante, noches temáticas, presentaciones de bodegas",
        "Programa de fidelización: clientes habituales, preferencias registradas, recomendaciones personalizadas",
        "Análisis de datos: vinos más vendidos, preferencias por cliente, tendencias estacionales",
        "Precio y percepción: estrategia de márgenes, rango de precios en carta, tácticas psicológicas",
        "Feedback y mejora continua: encuestas, sugerencias del cliente, evolución de la propuesta"
      ],
      quiz: [
        {
          question: "¿Cuál es la ventaja principal de ofrecer vinos por copa en restaurante de alta gama?",
          options: [
            "Reducir costes de inventario",
            "Permitir que clientes experimenten múltiples vinos sin compromiso a botella completa, aumentar AOV (average order value), crear oportunidad de recomendación consultiva",
            "Evitar que clientes completen botellas",
            "Garantizar que no hay desperdicio"
          ],
          correct: 1
        },
        {
          question: "¿Cuál es el factor más importante en la recomendación consultiva de vino?",
          options: [
            "Siempre recomendar el vino más caro",
            "Entender preferencias del cliente, su experiencia con vino, presupuesto, gustos en comida; hacer recomendación que encaje con su perfil",
            "Promover únicamente vinos con mayor margen",
            "Permitir que el cliente elija sin intervención"
          ],
          correct: 1
        }
      ],
      content: "El marketing de vinos en restauración es combinación de educación, venta consultiva y creación de experiencia. El posicionamiento de la carta es decisión estratégica: ¿es carta amplia y diversa (atrae curiosos)? ¿Carta selecta y curada (posiciona como experto)? ¿Equilibrio (máxima acceso + opciones premium)? La identidad debe ser coherente: un restaurante de cocina tradicional espera carta con clásicos; uno de cocina de autor puede ostentar emergentes o naturales. La promoción requiere dinamismo: destacados mensuales (crea urgencia, rota referencias lentas), vinos por copa (permite experimentación sin compromiso), degustaciones en bodega (experiencia memorable), promociones puntuales (descuentos estratégicos, happy hour vinos). El storytelling es herramienta poderosa: la historia de la bodega (familia desde 1923), el terroir (viñedos en altitud extrema), características únicas (variedad autóctona) generan conexión emocional que justifica precio. La capacitación del personal es crítica: meseros deben tener conocimiento básico (variedades, características, maridajes sugeridos), técnica de venta consultiva (escuchar, preguntar, recomendar sin presionar), habilidad para upsell (sugerir copa en lugar de botella, siguiente rango de precio). Las redes sociales son canal directo: fotos de vinos, eventos, educación (datos curiosos sobre regiones), hashtags locales generan visibilidad. Los eventos (catas en restaurante, presentaciones de bodegas, noches temáticas) crean experiencia memorable, atraen nuevos clientes, construyen comunidad. El programa de fidelización registra preferencias de clientes habituales: sistema de recomendación personalizada (\"típicamente usted gusta de tintos Rioja con menos acidez, le sugiero...\") aumenta satisfacción y frecuencia de compra. El análisis de datos (vinos más vendidos, preferencias por tipo cliente, tendencias estacionales) informa decisiones de compra y promoción. La estrategia de precio es psicológica: carta con demasiado rango amplio confunde; 3-4 opciones por segmento simplifica decisión. El feedback activo (encuestas, sugerencias) informa mejora continua.",
      practicalExercise: "Desarrolla plan de marketing trimestral para carta de vinos: 1) Define posicionamiento de tu carta (diferenciación, identidad, coherencia con cocina). 2) Diseña estrategia de promoción: 3-4 vinos destacados por mes, razón de promoción (rotación lenta, lanzamiento nuevo), acciones específicas (descuento, por copa, evento). 3) Elabora 3-4 storytellings de bodegas/vinos de tu carta (origen, características, narrativa). 4) Crea plan de capacitación para personal: temas, materiales, evaluación. 5) Planifica 1-2 eventos (cata en restaurante, presentación bodega): fecha, vinos, invitados. 6) Propone programa de fidelización para clientes habituales. 7) Define métricas de éxito: aumento AOV, rotación de referencias, feedback cliente."
    },
    {
      id: "level3-module15",
      slug: "liderazgo-formacion-equipos",
      title: "Liderazgo y formación de equipos de sala",
      description: "Gestión de equipos, desarrollo profesional, comunicación efectiva y liderazgo en ambiente de restauración de alta gama.",
      duration: "17 min",
      videoPlaceholder: "liderazgo-formacion-equipos-sala",
      keyPoints: [
        "Rol del sumiller jefe: responsabilidades, visión estratégica, gestión de equipo, relación con cocina y dirección",
        "Estructura organizativa: escalas profesionales (jefe de bodega, sumiller senior, sommelier, asistente), roles claros",
        "Reclutamiento y selección: perfiles buscados, habilidades técnicas vs. actitud, potencial de desarrollo",
        "Formación continua: programa de capacitación, fuentes de información, benchmarking con competencia",
        "Motivación y retención: reconocimiento, oportunidades de crecimiento, ambiente de trabajo, compensación equitativa",
        "Comunicación: briefs preturno (vinos destacados, maridajes), feedback constructivo, reuniones estratégicas",
        "Resolución de conflictos: cliente insatisfecho, desacuerdos internos, presión de servicio",
        "Evaluación de desempeño: KPIs (AOV, satisfacción cliente, conocimiento técnico), feedback regular",
        "Vinculación con cocina: comprensión mutua de propuesta, coordinación menú-vinos, colaboración creativa",
        "Cultura de equipo: valores, celebraciones, aprendizaje compartido, ambiente inclusivo"
      ],
      quiz: [
        {
          question: "¿Cuál es el indicador clave de desempeño (KPI) más importante para evaluar sumiller en restaurante de alta gama?",
          options: [
            "Número total de botellas vendidas",
            "AOV (Average Order Value) de vinos + satisfacción cliente (NPS) + conocimiento técnico demostrado en evaluaciones",
            "Margen total generado sin considerar cliente",
            "Número de eventos de marketing realizados"
          ],
          correct: 1
        },
        {
          question: "¿Qué elemento es crítico en la comunicación chef-sumiller para éxito en maridaje?",
          options: [
            "El sumiller siempre tiene razón en decisiones de vino",
            "El chef siempre decide los vinos para sus platos",
            "Comunicación regular, respeto mutuo, compromiso en propuesta conjunta, disposición a iterar basada en feedback",
            "Los roles deben ser completamente separados sin contacto"
          ],
          correct: 2
        }
      ],
      content: "El liderazgo en una sala de vinos es responsabilidad multidimensional. El sumiller jefe es administrador de inventario, vendedor consultivo, educador del equipo, y asesor estratégico de dirección sobre propuesta de vinos. Las responsabilidades incluyen: selección y compra de referencias (alineadas con presupuesto y propuesta), gestión de inventario (rotación, condiciones), definición de estrategia de precios y promoción, capacitación del equipo de servicio, coordinación con cocina en maridajes, análisis de datos de venta, relación con proveedores, atención a clientes en momentos críticos. La estructura organizativa varía según tamaño: en restaurantes grandes, jefe de bodega (gestión física), sumiller senior (catas, maridajes), sommelier (venta, servicio), asistente. En medianos, sumiller combina múltiples roles. El rol requiere liderazgo fuerte: visión clara comunicada al equipo, decisiones basadas en datos, apertura a ideas del equipo. El reclutamiento busca balance: habilidades técnicas (conocimiento enológico básico), pero actitud es crítica (curiosidad, apertura a aprendizaje, empatía con cliente). El potencial de desarrollo importa más que la experiencia inicial: un joven con actitud aprendible puede convertirse en excelente; alguien con experiencia pero actitud cerrada se mantiene estancado. La formación continua es obligación: sesiones semanales sobre vinos de la carta, degustaciones ciegas para entrenamiento, acceso a publicaciones especializadas, asistencia a congresos/ferias de vino. La motivación se construye mediante reconocimiento (público, bonificaciones por logros), oportunidades de crecimiento (ascenso, especialización, liderazgo de proyectos), ambiente positivo (respeto, inclusión, tiempo para pausa), compensación equitativa (salario, beneficios alineados con responsabilidad). La comunicación es diaria: brief preturno (vinos destacados, clientes VIP esperados, platos nuevos en cocina), feedback constructivo post-servicio, reuniones estratégicas mensuales. La resolución de conflictos es inevitable: cliente insatisfecho requiere escucha activa, empatía, solución rápida (cambio de vino, descuento si apropiado); desacuerdos internos se resuelven en privado, priorizando solución colectiva. La evaluación de desempeño es multifactorial: AOV de vinos per cover, NPS (Net Promoter Score de cliente), conocimiento técnico demostrado, rotación de referencias slow-moving, retroalimentación de cliente directo. La vinculación con cocina es espíritu de colaboración: chef y sumiller son aliados en propuesta conjunta; reuniones regulares exploran nuevos maridajes, retroalimentación mutua, reconocimiento público de creaciones conjuntas. La cultura de equipo refleja valores: si el establecimiento prioriza excelencia, presión de calidad debe venir con apoyo; si prioriza sostenibilidad, vinos naturales deben estar respaldados por conocimiento y promoción.",
      practicalExercise: "Desarrolla plan de liderazgo y formación para equipo de vinos de 3-5 personas: 1) Define estructura organizativa: roles, responsabilidades, jerarquía. 2) Crea programa de formación: temas, frecuencia, recursos, evaluación. 3) Establece KPIs de desempeño: qué medir, cómo, frecuencia de revisión. 4) Diseña sistema de comunicación: briefs preturno (contenido, duración), reuniones (frecuencia, orden del día), feedback (formal/informal, cadencia). 5) Propone estrategia de motivación y retención: reconocimiento, oportunidades de crecimiento, ambiente. 6) Planifica coordinación con cocina: reuniones chef-sumiller (temas, frecuencia), proceso de decisión conjunta en maridajes. 7) Simula resolución de 2 conflictos: cliente insatisfecho, desacuerdo interno. Elabora handbook de equipo o política de operación."
    }
  ],
  certificate: "Certificado profesional de Sumiller Especialista - Gestión estratégica, cata avanzada y liderazgo de equipos de vinos",
  seo: {
    title: "Curso Sumiller Profesional | Nivel 3 - Academia de Vinos Online",
    description: "Especialización avanzada en gestión de cartas de vino, cata analítica, servicio premium y liderazgo. Programa de 18 horas para directores de sala y sumilleres de alta gama."
  }
}
,
{
  id: 'level-4',
  slug: 'direccion-enologica-certificacion',
  level: 4,
  title: 'Dirección Enológica y Certificación',
  subtitle: 'Programa avanzado de gestión de vinos y certificación profesional',
  description: 'El nivel más avanzado de la Academia de Vino. Dirigido a profesionales que buscan certificación en dirección enológica, gestión de cartas de vino en grandes grupos, y liderazgo en el sector. Combina estrategia empresarial, psicología del consumidor, tecnología digital y normativa internacional. Para F&B managers, dueños de restaurantes, directores de vino y profesionales en búsqueda de certificación internacional.',
  icon: 'crown',
  targetAudience: 'F&B managers, dueños de restaurantes, directores de vino, sumilleres avanzados, profesionales en búsqueda de certificación internacional',
  prerequisites: 'Completar Nivel 3 o tener experiencia profesional mínima de 3 años en gestión de vinos',
  estimatedHours: 20,
  modules: [
    {
      id: 'module-4-1',
      slug: 'estrategia-vino-modelo-negocio',
      title: 'Estrategia de vino por modelo de negocio',
      description: 'Diseño de estrategias de vino adaptadas a diferentes modelos empresariales: hoteles, restaurantes finos, bares de vino, tiendas especializadas y enoturismo.',
      duration: '20 minutos',
      videoPlaceholder: '/videos/level4/module1-estrategia.mp4',
      keyPoints: [
        'Análisis de modelos de negocio en el sector del vino',
        'Estrategia de precio y margen en función del tipo de establecimiento',
        'Posicionamiento de marca y diferenciación mediante la carta de vinos',
        'Segmentación de clientes y perfiles de consumidor',
        'Estrategia de compra y relación con proveedores según modelo de negocio',
        'ROI de la inversión en vino por tipo de negocio',
        'Casos de estudio: estrategias exitosas en distintos formatos',
        'Adaptación de estrategia a cambios de mercado',
        'Indicadores de éxito según modelo empresarial'
      ],
      quiz: [
        {
          question: '¿Cuál es la principal diferencia en estrategia de vinos entre un restaurante fino y un bar de vinos casual?',
          options: [
            'El restaurante fino se enfoca en márgenes altos y experiencia de lujo, mientras que el bar se enfoca en volumen y accesibilidad',
            'No hay diferencia estratégica significativa',
            'El bar de vinos siempre tiene márgenes más altos',
            'La estrategia es idéntica en ambos casos'
          ],
          correct: 0
        },
        {
          question: '¿Qué factor es CRÍTICO al diseñar estrategia de compra de vinos según el modelo de negocio?',
          options: [
            'Comprar solo vinos caros y prestigiosos',
            'La rotación esperada, el espacio de almacenamiento y el perfil de cliente',
            'Comprar siempre del mismo distribuidor',
            'El número total de referencias disponibles en el mercado'
          ],
          correct: 1
        }
      ],
      content: 'La estrategia de vinos debe ser un reflejo directo del modelo de negocio y la propuesta de valor de la empresa. Un hotel de lujo requiere una carta amplia con referencias premium que reflejen su posicionamiento, mientras que un restaurante de cocina rápida necesita una selección curada y accesible que complemente sus platos. La estrategia debe considerar factores críticos: rotación esperada de inventario, espacio físico disponible, capacidad de capacitación del personal, perfil económico del cliente y objetivos de margen. En cadenas de restauración, la estrategia es más compleja: requiere estandarización entre locales pero con flexibilidad local para adaptarse a preferencias regionales. El análisis del ROI por establecimiento permite identificar qué referencias funcionan mejor en cada contexto. Los hoteles pueden aprovechar el turismo para vender referencias premium, mientras que bares pueden crear experiencias de descubrimiento a precios más accesibles. La clave está en alinear la oferta con las expectativas y poder adquisitivo del cliente objetivo, sin sacrificar márgenes innecesariamente.',
      practicalExercise: 'Analiza tu establecimiento (o uno hipotético) e identifica su modelo de negocio. Define 5 objetivos estratégicos para tu programa de vinos, considerando: target de clientes, presupuesto disponible, espacio de bodega, y margen deseado. Crea un documento de 1-2 páginas detallando tu estrategia de vino, incluyendo justificación de cada objetivo y métricas para medir éxito.'
    },
    {
      id: 'module-4-2',
      slug: 'kpis-vino-metricas-rendimiento',
      title: 'KPIs del vino: métricas de rendimiento',
      description: 'Domina los indicadores clave de rendimiento (KPIs) para gestionar la rentabilidad y eficiencia de tu programa de vinos: margen, rotación, ticket promedio y otros.',
      duration: '22 minutos',
      videoPlaceholder: '/videos/level4/module2-kpis.mp4',
      keyPoints: [
        'Margen bruto y margen neto en vinos',
        'Rotación de inventario y su impacto en rentabilidad',
        'Ticket promedio y valor medio de venta',
        'Índice de popularidad de referencias',
        'Tasa de obsolescencia y gestión de vinos viejos',
        'Costo de almacenamiento y mantenimiento',
        'Participación de vinos en ingresos totales',
        'Benchmark de KPIs según tipo de negocio',
        'Dashboards y sistemas de seguimiento'
      ],
      quiz: [
        {
          question: '¿Cuál es la fórmula correcta para calcular el margen bruto en vinos?',
          options: [
            '(Precio venta - Costo compra) / Precio venta × 100',
            'Precio venta / Costo compra',
            'Costo compra / Precio venta × 100',
            'Ingresos totales - Gastos fijos'
          ],
          correct: 0
        },
        {
          question: '¿Qué KPI es especialmente crítico para bodegas con espacio limitado?',
          options: [
            'El margen de cada botella',
            'La rotación de inventario',
            'El número total de referencias',
            'El precio promedio de las botellas'
          ],
          correct: 1
        }
      ],
      content: 'Los KPIs son esenciales para transformar datos en decisiones empresariales. El margen bruto típicamente oscila entre 60-70% en restaurantes finos, 50-60% en bares casuales, y puede ser más bajo (40-50%) en hoteles que priorizan la experiencia. La rotación de inventario indica eficiencia operacional: un vino que rota 8 veces al año es más rentable que uno que rota 2 veces, incluso si tiene márgenes similares. El ticket promedio de vino revela si tu cliente está comprando copas (ticket bajo) o botellas completas (ticket alto). Es crucial identificar el 20% de referencias que generan el 80% de ingresos (Pareto), para enfocar esfuerzos de upsell y capacitación. La tasa de obsolescencia (botellas que pierden valor con el tiempo) debe monitorearse continuamente: vinos con problemas de almacenamiento o referencias descatalogadas pueden convertirse en pérdidas. Sistemas modernos como Point of Sale integrados permiten generar dashboards en tiempo real que muestren tendencias, facilitando decisiones ágiles sobre reposición, promoción y discontinuación.',
      practicalExercise: 'Crea un dashboard de KPIs para un restaurante de 100 referencias. Incluye: margen bruto promedio (objetivo: 65%), rotación anual por referencia, ticket promedio de vino (objetivo: $25), y top 10 referencias por rentabilidad. Analiza qué referencias son ineficientes y qué cambios recomendarías. Usa una hoja de cálculo o herramienta simple.'
    },
    {
      id: 'module-4-3',
      slug: 'gobernanza-carta-grupos-restauracion',
      title: 'Gobernanza de carta en grupos de restauración',
      description: 'Gestión de cartas de vino en cadenas y grupos multi-restaurante: estandarización, flexibilidad local y coordinación central.',
      duration: '18 minutos',
      videoPlaceholder: '/videos/level4/module3-gobernanza.mp4',
      keyPoints: [
        'Estructuras de gobernanza en grupos de restauración',
        'Procesos centralizados vs. decisiones locales',
        'Negociación con proveedores a nivel grupo',
        'Estandarización de cartas manteniendo diferenciación',
        'Control de calidad y consistencia entre establecimientos',
        'Capacitación y onboarding de personal en múltiples sedes',
        'Sistemas de información para coordinar inventarios',
        'Ventajas de compras volumen y negociación',
        'Resolución de conflictos entre sedes en temas de vino'
      ],
      quiz: [
        {
          question: '¿Cuál es el principal beneficio de centralizar las compras de vino en un grupo multi-restaurante?',
          options: [
            'Todos los restaurantes venden el mismo vino',
            'Mejor poder de negociación con proveedores y optimización de costos',
            'Elimina la necesidad de contar con sommeliers en cada restaurante',
            'Aumenta automáticamente el margen en todas las sedes'
          ],
          correct: 1
        },
        {
          question: '¿Cómo se balancea la estandarización con la flexibilidad local en grupos?',
          options: [
            'Imponiendo la misma carta en todas las sedes sin excepción',
            'Permitiendo que cada restaurante tenga carta completamente diferente',
            'Definiendo un core de referencias obligatorias y permitiendo aportaciones locales según perfil de cliente',
            'Eliminando la figura del sommelier local'
          ],
          correct: 2
        }
      ],
      content: 'La gobernanza en grupos requiere un delicado equilibrio entre control central y autonomía local. Una estructura efectiva define un "core" de referencias obligatorias que garantizan consistencia, margen y poder de negociación, mientras permite que cada restaurante agregue 20-30% de referencias locales según su perfil de cliente y geografía. La compra centralizada permite negociar mejor precio con grandes productores, pero la selección debe considerar las características únicas de cada establecimiento: un restaurante de montaña tendrá preferencias diferentes a uno de playa. Los sistemas de información integrados son críticos: permiten compartir datos de rotación, margen y preferencias entre sedes para optimizar reposiciones y detectar tendencias. La gobernanza también define roles: puede haber un director de vinos a nivel grupo que establece políticas, directores regionales que supervisan sedes, y sommeliers en terreno que ejecutan. La capacitación debe ser consistente pero adaptada al contexto local. Los conflictos entre sedes (por ejemplo, una quiere descontinuar un vino que otra vende bien) se resuelven mediante procesos definidos basados en datos.',
      practicalExercise: 'Diseña una estructura de gobernanza de vinos para un grupo de 5 restaurantes (diversos: fino, casual, hotel, bar de vinos). Define: referencias obligatorias (core), referencias locales permitidas, proceso de aprobación para nuevas referencias, sistema de reporte de KPIs, y roles. Crea una matriz de responsabilidades (quién decide qué) de 1-2 páginas.'
    },
    {
      id: 'module-4-4',
      slug: 'tendencias-mercado-vino-2024-2025',
      title: 'Tendencias del mercado del vino 2024-2025',
      description: 'Análisis de tendencias actuales: vinos naturales, low/no alcohol, sostenibilidad, mercados emergentes y cambios de preferencia de consumidor.',
      duration: '21 minutos',
      videoPlaceholder: '/videos/level4/module4-tendencias.mp4',
      keyPoints: [
        'Explosión de vinos naturales: mercado, percepción y controversia',
        'Vinos bajos en alcohol y sin alcohol: crecimiento y oportunidades',
        'Sostenibilidad y viticultura orgánica como factor diferenciador',
        'Vinos de mercados emergentes: Georgia, Armenia, Moldavia, Grecia',
        'Influencia de redes sociales y prescriptores en compra',
        'Preferencia por botellas pequeñas y formatos alternativos',
        'Consumo de experiencias sobre acumulación de vinos premium',
        'Preocupaciones ambientales del consumidor millennial y Gen Z',
        'Impacto del cambio climático en regiones vitivinícolas clásicas'
      ],
      quiz: [
        {
          question: '¿Cuál es la principal razón del crecimiento en popularidad de vinos naturales entre 2020-2025?',
          options: [
            'Porque son siempre de mejor calidad que vinos convencionales',
            'Combinación de percepción de naturalidad, narrativa de autenticidad, y alineación con valores de sostenibilidad',
            'Porque son significativamente más baratos',
            'Porque todos los vinos naturales son certificados y 100% seguros'
          ],
          correct: 1
        },
        {
          question: '¿Qué oportunidad representa el segmento de vinos bajos en alcohol (9-12%) para restaurantes?',
          options: [
            'Ninguna, los clientes siempre quieren alcohol estándar',
            'Atraer a conductores, consumidores de salud consciente, y facilitar consumo de múltiples copas',
            'Reducir costos de importación',
            'Mejorar automáticamente todos los márgenes'
          ],
          correct: 1
        }
      ],
      content: 'El mercado del vino está en transformación acelerada. Los vinos naturales (sin intervención química, fermentación silvestre) han pasado de nicho a tendencia mainstream, impulsados por consumidores millennials y Gen Z que valoran autenticidad y sostenibilidad. Este segmento creció 30-40% en 2023-2024, aunque genera controversia en calidad y consistencia. Los vinos bajos en alcohol (8-12%) y sin alcohol representan otra megatrend, aprovechando consciencia de salud, preocupación ambiental y nuevas regulaciones sobre conducción. Mercados emergentes como Georgia, Armenia, Moldavia y Grecia están ganando prominencia gracias a narrativas de origen y precios competitivos. Las redes sociales y prescriptores (influencers, bloggers) tienen poder decisivo especialmente entre menores de 40 años. Botellas pequeñas (375ml) y formatos alternativos (latas, tetra pack) crecen rápidamente. El cambio climático está redibujando el mapa vitivinícola: regiones clásicas como Burdeos enfrentan desafíos, mientras zonas antes marginales mejoran potencial. La experiencia desplaza a la acumulación: más consumo de catas, viajes a bodegas, y eventos que copas de vino premium guardadas en bodegas personales.',
      practicalExercise: 'Analiza tu mercado local (o uno hipotético). Identifica 5 tendencias aplicables y cómo podrías integrarlas en tu cartas de vinos. Por cada tendencia: describe qué es, cómo está creciendo, 2-3 referencias específicas para implementar, y cómo lo promocionarías a clientes. Formato: tabla o documento de 2-3 páginas.'
    },
    {
      id: 'module-4-5',
      slug: 'sostenibilidad-responsabilidad-viticultura',
      title: 'Sostenibilidad y responsabilidad en viticultura',
      description: 'Viticulturas sostenibles, ecológicas y biodinámicas. Impacto ambiental y social. Certificaciones y verificación. Responsabilidad empresarial en la cadena de suministro.',
      duration: '19 minutos',
      videoPlaceholder: '/videos/level4/module5-sostenibilidad.mp4',
      keyPoints: [
        'Viticultura convencional, integrada, ecológica y biodinámica: diferencias',
        'Impacto ambiental: agua, químicos, emisiones de carbono',
        'Certificaciones internacionales: IFOAM, EU Organic, Demeter, Fair Trade',
        'Responsabilidad social: condiciones laborales y comunitarias',
        'Terroir y sostenibilidad: beneficios mutuos',
        'Huella de carbono en vinos: producción, transporte, embalaje',
        'Sellos y marketing verde: verificación de autenticidad',
        'Biodiversidad y ecosistemas vitícolas',
        'Cómo traducir sostenibilidad en valor para el cliente'
      ],
      quiz: [
        {
          question: '¿Cuál es la principal diferencia entre viticultura ecológica y biodinámica?',
          options: [
            'La ecológica prohibe pesticidas químicos; la biodinámica va más allá, integrando principios espirituales y ciclos lunares',
            'Ambas son exactamente lo mismo',
            'La biodinámica es más amigable con el ambiente',
            'La ecológica permite más pesticidas que la biodinámica'
          ],
          correct: 0
        },
        {
          question: '¿Por qué debería un sommelier conocer sobre sostenibilidad en vinos?',
          options: [
            'Solo para cumplir regulaciones legales',
            'Para educar a clientes, diferenciarse en el mercado, alinear oferta con valores del consumidor moderno, y asegurar resiliencia en la cadena de suministro',
            'Es irrelevante para la venta de vinos',
            'Porque los vinos sostenibles siempre saben mejor'
          ],
          correct: 1
        }
      ],
      content: 'La sostenibilidad en viticultura es tanto ambiental como social. La viticultura ecológica prohíbe pesticidas sintéticos y OGMs, usando métodos naturales de control de plagas; la biodinámica añade principios holísticos y calendarios lunares. Ambas reducen contaminación, preservan biodiversidad y crean ecosistemas más resilientes. Las certificaciones verifican cumplimiento: IFOAM y EU Organic son internacionalmente reconocidas; Demeter certifica biodinámica; Fair Trade asegura condiciones laborales justas. El impacto ambiental incluye uso de agua (viticultura consume 300-500 litros por botella), químicos agrícolas que contaminan acuíferos, y emisiones de carbono en producción y transporte. Botellas de vidrio más ligeras, corchos compostables, y transporte por barco reducen huella. La sostenibilidad no es altruismo: viñedos ecológicos tienen mayor resiliencia ante plagas y clima extremo, reducen costos de insumos, y acceden a segmentos premium dispuestos a pagar más. Los clientes modernos—especialmente millennials—valoran transparencia sobre prácticas de producción. Sin embargo, hay greenwashing: certificaciones falsas o marketing exagerado. Verificar credibilidad de sellos es crítico.',
      practicalExercise: 'Selecciona 5 vinos actuales de tu lista (o del mercado). Investiga la sostenibilidad de cada uno: qué método de cultivo usan, qué certificaciones tienen, huella de carbono si está disponible. Evalúa: ¿Qué tan verificable es la información? ¿Cómo lo comunicarías a clientes? Crea una ficha para cada vino con 3-5 puntos clave de sostenibilidad.'
    },
    {
      id: 'module-4-6',
      slug: 'wine-economics-negocio-global-vino',
      title: 'Wine economics: el negocio global del vino',
      description: 'Macroeconomía del vino: producción global, comercio, especulación, inversión. Dinámicas de oferta y demanda. Regiones productoras y mercados consumidores.',
      duration: '23 minutos',
      videoPlaceholder: '/videos/level4/module6-economics.mp4',
      keyPoints: [
        'Producción global de vino: volumen, tendencias, regiones líderes',
        'Comercio internacional de vino: barreras arancelarias y acuerdos',
        'Ciclos de mercado del vino y factores que los mueven',
        'Vino como activo de inversión: mercado secundario y especulación',
        'Dinámicas de precio: oferta, demanda, marca, antigüedad',
        'Mercados emergentes consumidores: China, India, mercados asiáticos',
        'Impacto del cambio climático en economía vitivinícola',
        'Consolidación empresarial: grandes conglomerados vs. productores pequeños',
        'Futuro: tecnología blockchain, digitalización de mercados'
      ],
      quiz: [
        {
          question: '¿Cuál es el principal país productor de vino en volumen a nivel global?',
          options: [
            'Francia',
            'Italia',
            'España',
            'Los tres producen volúmenes similares en diferentes contextos (Francia y Italia en calidad premium, España en volumen total)'
          ],
          correct: 3
        },
        {
          question: '¿Qué ha impulsado el crecimiento del mercado de vino en China en los últimos 15 años?',
          options: [
            'Producción interna china ha superado a Francia',
            'Crecimiento de clase media, valor cultural del vino como estatus, y acceso a importaciones',
            'Reducción de consumo de licores destilados locales',
            'Subsidios gubernamentales a importación de vino'
          ],
          correct: 1
        }
      ],
      content: 'El vino es un negocio de escala global compleja. Los principales productores (Francia, Italia, España) juntos generan ~300 millones de hectolitros anuales, pero dinámicas están cambiando: Nueva Zelanda, Chile, Argentina y Australia capturan cuota con relación calidad-precio competitiva. El comercio está regulado por tratados (acuerdos entre UE y países específicos) e impuestos arancelarios que protegen mercados locales. China es la historia más transformadora: consumo de vino creció 300% en 2000-2015, impulsado por clase media y percepción de vino como símbolo de sofisticación. Burdeos 1982 y otros vinos premium son activos de inversión: coleccionistas compran para especular en precios. El mercado secundario (subastas, brokers) mueve cientos de millones anuales. Pero este segmento es volátil y especulativo: precios pueden colapsar con cambios de preferencia. La mayoría de vino (90%+) es para consumo ordinario, no inversión. El cambio climático causa disrupciones: Burdeos enfrenta desafíos de madurez, Champagne lucha por acidez, pero regiones del norte como Inglaterra producen espumantes competitivos. La consolidación es real: multinacionales controlan 50%+ del mercado global, pero hay resurgimiento de productores pequeños independientes mediante directos y ecommerce.',
      practicalExercise: 'Analiza el impacto económico de una región o país productor de vino. Investiga: volumen de producción, principales mercados de exportación, precios promedio, impacto climático, y tendencia de mercado (crecimiento o declive). Presenta en 2-3 páginas cómo estos factores macroeconómicos afectan decisiones de compra a nivel de restaurante.'
    },
    {
      id: 'module-4-7',
      slug: 'enoturismo-experiencias-bodega',
      title: 'Enoturismo y experiencias en bodega',
      description: 'Diseño y comercialización de experiencias enoturísticas: catas, tours, hospedaje, eventos. Estrategia para bodegas y restaurantes.',
      duration: '20 minutos',
      videoPlaceholder: '/videos/level4/module7-enoturismo.mp4',
      keyPoints: [
        'Segmentación de enoturistas: experienciales, coleccionistas, curiosos, turismo de lujo',
        'Diseño de experiencias de cata: estructura, narrativa, ambiente',
        'Tours en bodega: desde introducción a sommeliers profundos',
        'Hospedaje enoturístico: vinoteles, quintas, enohabits',
        'Eventos y celebraciones: bodas, seminarios corporativos en bodegas',
        'Packaging de experiencias: combinar vino con gastronomía, arte, naturaleza',
        'Precios y rentabilidad de experiencias vs. venta de botellas',
        'Marketing digital y redes sociales para atraer enoturistas',
        'Impacto social y ambiental del enoturismo'
      ],
      quiz: [
        {
          question: '¿Cuál es el modelo económico más rentable para una bodega pequeña: vender botellas al por menor o crear experiencias enoturísticas?',
          options: [
            'Siempre venta de botellas es más rentable',
            'Las experiencias generalmente tienen márgenes más altos (50-70%) que botellas, aunque requieren capacitación y operaciones complejas',
            'Las experiencias son solo marketing, nunca son rentables',
            'Depende completamente del vino, no de la estrategia'
          ],
          correct: 1
        },
        {
          question: '¿Qué segmento de enoturistas típicamente genera mayor valor por visita?',
          options: [
            'Turistas casuales que toman fotos',
            'Turistas corporativos en eventos y celebraciones, dispuestos a gastar en experiencias premium',
            'Niños en tours educativos',
            'Todas las categorías gastan exactamente lo mismo'
          ],
          correct: 1
        }
      ],
      content: 'El enoturismo crece 8-12% anualmente como segmento. Las bodegas descubren que experiencias (catas, tours, hospedaje, eventos) generan márgenes superiores a venta de botellas. Una cata privada para 10 personas a $100/persona = $1,000 ingresos con costo marginal bajo (~$100 en vino + tiempo). Los enoturistas son heterogéneos: experienciales buscan aprender y disfrutar; coleccionistas buscan botellas raras; curiosos buscan fotos para redes sociales; turistas de lujo esperan servicios premium con hospedaje. Cada segmento requiere diseño diferente. Las experiencias efectivas cuentan una narrativa: no solo degustan vino, sino aprenden historia de bodega, tradición familiar, proceso de elaboración, paisaje. El ambiente importa: una cata en una sala industrial genera diferente percepción que una en una bodega histórica con vistas al viñedo. Precios varían: catas básicas $20-50, catas privadas con comida $100-300, experiencias de múltiples días (hospedaje + catas + gastronomía) $500-5,000+. Los vinoteles—hospedaje integrado con experiencias—crecen rápidamente en Napa, Rioja, Argentina. Eventos corporativos (team buildings, seminarios) son altamente lucrativos: corporaciones pagan premium por exclusividad y profesionalismo.',
      practicalExercise: 'Diseña una experiencia enoturística para una bodega (real o hipotética). Define: tipo de enoturista objetivo, duración y estructura de la experiencia, qué incluye (cata, tour, comida, etc.), narrativa o story que cuenta, precio y proyección de margen, y cómo la comercializarías. Presenta en 1-2 páginas con timeline de la experiencia.'
    },
    {
      id: 'module-4-8',
      slug: 'comunicacion-marca-personal-sommelier',
      title: 'Comunicación y marca personal del sumiller',
      description: 'Construcción de marca personal profesional. Comunicación efectiva, storytelling, presencia digital y liderazgo en el sector.',
      duration: '18 minutos',
      videoPlaceholder: '/videos/level4/module8-marca.mp4',
      keyPoints: [
        'Diferenciación profesional: qué te hace único como sommelier',
        'Narrativa personal: historia, valores, especialidades',
        'Storytelling en la venta: cómo hablar de vinos de forma cautivadora',
        'Presencia digital: LinkedIn, Instagram, TikTok, blog, podcast',
        'Gestión de reputación online y offline',
        'Networking y construcción de comunidad profesional',
        'Speaking, conferencias y visibility pública',
        'Monetización de marca personal: consultoría, educación, colecciones',
        'Ética y transparencia en comunicación'
      ],
      quiz: [
        {
          question: '¿Cuál es el elemento más importante para construir marca personal como sommelier?',
          options: [
            'Tener el título más prestigioso posible',
            'Consistencia en comunicación de valores, especialidades, y autenticidad en múltiples canales',
            'Cantidad de seguidores en redes sociales',
            'Trabajar en el restaurante más caro de la ciudad'
          ],
          correct: 1
        },
        {
          question: '¿Cómo debería un sommelier moderno aprovechar redes sociales para fortalecer su marca?',
          options: [
            'No debería, es poco profesional',
            'Solo publicando fotos de botellas caras',
            'Compartiendo educación, behind-the-scenes, reflexiones sobre vino, y demostrando expertise de forma accesible',
            'Evitando cualquier contenido sobre vino para parecer más profesional'
          ],
          correct: 2
        }
      ],
      content: 'La marca personal es diferenciación en un mercado competitivo. Sumilleres que simplemente venden vinos son commodities intercambiables; sumilleres que cuentan historias, educan, y crean conexión generan lealtad y oportunidades. Tu marca se construye alrededor de: especialidades (vinos naturales, tintos de España, cava), valores (sostenibilidad, accesibilidad del vino), y estilo personal (formal vs. casual, educador vs. entretenedor). La narrativa es crítica: no es "probé este Rioja 2018 con 14% alcohol"; es "este Rioja está hecho por una familia de quinta generación en Haro, fermentado naturalmente, y expresa la terraza volcánica de la región de forma magistral". Redes sociales son herramientas poderosas: LinkedIn para posicionamiento profesional y B2B; Instagram/TikTok para educación visual y entretenimiento; Twitter para discusión. Pero requieren consistencia: publicar irregularmente daña marca. El networking real (eventos, asociaciones profesionales, viajes a bodegas) sigue siendo invaluable. Líderes de opinión en vino (críticos, educators, retailers reconocidos) tienen oportunidades lucrativas: consultoría, educación en línea, colecciones propias, libros. La ética es fundamental: recomendaciones deben ser honestas; no vender lo que no crees; transparencia sobre patrocinios o relaciones comerciales.',
      practicalExercise: 'Desarrolla tu marca personal como sommelier (o director de vinos). Define: 1) Tu especialidad o nicho, 2) Tu narrativa personal (por qué haces esto), 3) Tus valores diferenciadores, 4) Canales digitales donde te posicionarás, 5) 5 posts o contenidos específicos que publicarías. Crea un documento de 1-2 páginas + ejemplos de 2-3 posts de redes sociales.'
    },
    {
      id: 'module-4-9',
      slug: 'tecnologia-aplicada-ia-apps-digitalizacion',
      title: 'Tecnología aplicada: IA, apps y digitalización',
      description: 'Herramientas digitales para gestión de vinos: software POS, apps de recomendación, blockchain, IA, y transformación digital.',
      duration: '21 minutos',
      videoPlaceholder: '/videos/level4/module9-tecnologia.mp4',
      keyPoints: [
        'Sistemas POS integrados para vinos: gestión, KPIs, inventario real-time',
        'Apps de recomendación basadas en preferencias: pairing, perfiles',
        'Inteligencia artificial en detección de preferencias y predicción de demanda',
        'Blockchain para autenticación y combate de falsificaciones',
        'Plataformas de compra digital B2B: eficiencia en procurement',
        'Digitalización de lista de vinos: menú dinámico, QR, interactividad',
        'Datos analytics: identificar tendencias, obsoletos, oportunidades',
        'Automatización de procesos: reordenes, alertas de inventario',
        'Educación digital: virtual tastings, contenido asincrónico'
      ],
      quiz: [
        {
          question: '¿Cómo la IA puede mejorar la experiencia del cliente en un restaurante con carta de vinos amplia?',
          options: [
            'No puede, la IA no entiende de vino',
            'Analizando historial de compra, preferencias de cliente, y recomendando referencias alineadas con su perfil y plato elegido',
            'Simplemente mostrando el vino más caro',
            'Eliminando la necesidad de sommeliers'
          ],
          correct: 1
        },
        {
          question: '¿Cuál es el principal beneficio de blockchain en la industria del vino?',
          options: [
            'Aumentar el precio de todos los vinos',
            'Verificación de autenticidad, trazabilidad desde bodega, y combate de falsificaciones en botellas premium',
            'Reemplazar a sommeliers con máquinas',
            'No tiene beneficios reales'
          ],
          correct: 1
        }
      ],
      content: 'La tecnología transforma la industria del vino. Sistemas POS modernos (Square, Toast, Lightspeed) integran venta con gestión de inventario en tiempo real: cuando vendes una botella, automáticamente el sistema actualiza stock, calcula margen, y alerta si inventario cae bajo mínimo. Esto elimina discrepancias y facilita reordenes precisas. Apps de recomendación (Vivino, Delectable, Winc) usan algoritmos para sugerir vinos basados en gustos previos: un cliente que marcó preferencia por Pinot Noir ligero recibe recomendaciones alineadas, con opciones de precio. En restaurantes, menús digitales interactivos (QR code que abre lista en tablet) permiten filtrar por región, precio, varietal, e incluir descripciones e imágenes. La IA predice demanda: "Este vino rosado típicamente vende más los viernes entre 19-21h; asegurar stock suficiente". Para botellas premium (caras), blockchain crea registro inmutable de autenticidad y cadena de custodia: comprador de una botella de Burdeos 1947 puede verificar su historia completa en blockchain. Plataformas B2B digitales como Vinovest o Naked Wines cotizan bodegas, permiten ordenes grandes, y optimizan logística. Analytics avanzado identifica patrones: qué referencias generan máximo margen, cuáles ruedan, cuál es el cliente ideal por vino. El futuro incluye virtual tastings multiconexión (usuario prueba vino en casa mientras sommelier guía remotamente), y personalización extrema.',
      practicalExercise: 'Evalúa tres herramientas digitales para vinos (actuales: Vivino, Toast POS, Delectable, u otras). Para cada una: investiga qué ofrece, cuál es el costo, cómo mejoraría operaciones de un restaurante, y cuáles son limitaciones. Recomienda una para un restaurante hipotético de 80 referencias. Justifica tu elección en 2-3 páginas.'
    },
    {
      id: 'module-4-10',
      slug: 'gestion-eventos-catas-profesionales',
      title: 'Gestión de eventos y catas profesionales',
      description: 'Diseño, organización y ejecución de catas profesionales, eventos corporativos, lanzamientos de vinos y celebraciones.',
      duration: '19 minutos',
      videoPlaceholder: '/videos/level4/module10-eventos.mp4',
      keyPoints: [
        'Tipología de eventos: catas educativas, corporativas, lanzamientos, beneficencia',
        'Estructura de cata profesional: preparación, conducción, timing',
        'Selección de vinos: coherencia temática y curva de degustación',
        'Logística: espacio, temperatura, copas, drenaje, movilidad',
        'Moderación y educación: lectura de audiencia, adaptación de discurso',
        'Pairing con comida: sincronización, menú, temporización',
        'Virtual vs. presencial: fortalezas de cada formato',
        'Evaluación y feedback post-evento',
        'Rentabilidad y presupuesto de eventos'
      ],
      quiz: [
        {
          question: '¿Cuál es el orden correcto de degustación en una cata profesional?',
          options: [
            'De mayor a menor precio, siempre',
            'De blanco a tinto, de seco a dulce, de joven a antiguo, de menor a mayor complejidad',
            'El orden no importa',
            'De rojo oscuro a claro'
          ],
          correct: 1
        },
        {
          question: '¿Por qué es importante la "curva de degustación" en catas profesionales?',
          options: [
            'Para confundir al público con vinos complejos',
            'Para progresivamente preparar el paladar, mantener atención, y permitir que el público aprecie diferencias',
            'No tiene importancia real',
            'Solo para catas de vinos muy caros'
          ],
          correct: 1
        }
      ],
      content: 'Una cata profesional bien ejecutada es experiencia que trasciende consumo: educación, placer, y conexión. El orden de degustación es crucial: empezar con blancos secos (paladar fresco), progresando a tintos, finalizando con dulces. La "curva de degustación" respeta fatiga sensorial: no bombardear con 15 vinos en 90 minutos (cata clásica es 6-8 vinos en 2 horas). Entre vinos, agua y pan neutro limpian paladar. La temperatura ambiente es crítica: room temperature para tintos no significa "ambiente cálido", sino 16-18°C; blancos 8-12°C. Copas deben ser adecuadas (tipo ISO standar para catas técnicas). La moderación es arte: el sommelier lee audiencia (son expertos o principiantes?), adapta lenguaje, cuenta historias, genera participación sin ser abrumador. En catas corporativas (team building), énfasis es en diversión y conexión; en catas de lanzamiento de bodega, énfasis es en narrativa de productor y diferenciación. Pairing con comida requiere sincronización: entrada y primer vino salen simultáneamente, no se espera a terminar para siguiente plato. Virtual tastings (pandemia impulsó innovación) permiten alcance geográfico pero pierden sensoriales complejos; requieren envío previo de muestras a casa. Presupuesto varía dramáticamente: evento educativo comunitario ~$15/persona; cata corporativa premium ~$75-150/persona; lanzamiento con chef y vinos antiguos ~$300+/persona.',
      practicalExercise: 'Diseña una cata profesional completa. Define: 1) Tipo (educativa, corporativa, lanzamiento), 2) Público objetivo y número, 3) Presupuesto, 4) 6-8 vinos seleccionados (con justificación de orden), 5) Pairing de comida (si aplica), 6) Timeline (cuánto tiempo para cada vino), 7) Narrativa o educación (qué aprenderán). Presenta en 2-3 páginas con detalles de logística y presupuesto estimado.'
    },
    {
      id: 'module-4-11',
      slug: 'psicologia-consumidor-vino',
      title: 'Psicología del consumidor de vino',
      description: 'Comportamiento de compra, toma de decisiones, influencia de precio, marca, diseño de botella y contexto social.',
      duration: '20 minutos',
      videoPlaceholder: '/videos/level4/module11-psicologia.mp4',
      keyPoints: [
        'Heurísticas de decisión: precio como proxy de calidad, marca, críticas',
        'Efecto de anclaje: cómo el primer precio visto influencia percepción',
        'Packaging y diseño: etiqueta, forma de botella, color',
        'Influencia del contexto social: consumo en grupo vs. privado',
        'Wine snobbery vs. democratización: temor a "elegir mal"',
        'Generacionales: boomers vs. millennials vs. Gen Z y preferencias',
        'Neuromarketing: qué activa el cerebro ante vinos',
        'Poder de prescriptores: influencers, críticos, sommeliers',
        'ROI emocional: vino como status, celebración, experiencia'
      ],
      quiz: [
        {
          question: '¿Cuál es el "efecto de anclaje" en la compra de vinos?',
          options: [
            'Vino que viene de puertos (anclajes)',
            'El primer precio que ve el cliente (ej. $200) influencia su percepción de otros precios, incluso si están en rango $20-80',
            'No existe tal efecto',
            'Solo aplica a vinos muy baratos'
          ],
          correct: 1
        },
        {
          question: '¿Por qué muchos consumidores usan "precio" como indicador de calidad en vinos?',
          options: [
            'Porque la correlación es perfecta entre precio y calidad',
            'Porque existe correlación (aunque imperfecta) + incertidumbre sobre cómo evaluar calidad + socialmente, vino caro señala sofisticación',
            'El precio nunca indica calidad',
            'Porque sommeliers les obligan'
          ],
          correct: 1
        }
      ],
      content: 'El consumidor de vino está movido por psicología compleja que va más allá del gusto. El "efecto de anclaje" es poderoso: si cliente ve botella de $200 en la lista, luego una de $50 le parece "barata" incluso si en contexto absoluto es cara. El precio actúa como heurística (atajo mental) para calidad: en ausencia de expertise, "más caro = mejor" es lógica rápida, aunque imperfecta. El packaging importa irracionalalmente: diseño de etiqueta, color de botella, forma, origen/región—todo influencia percepción antes de probar. Wine snobbery es real: muchos consumidores temen "elegir mal", lo que explota demanda por recomendaciones de expertos (críticos, sommeliers, influencers). Las generaciones difieren: boomers valoran marcas establecidas y puntuaciones críticas (Parker scores); millennials valoran narrativa y sostenibilidad; Gen Z valora diversidad, naturales, y accesibilidad. Neuromarketing revela: ver color rojo activa diferentes áreas cerebrales que blanco; leer "vino natural" activa regiones asociadas con valores personales; tener información sobre productor activa empatía. El contexto social es determinante: vino en cena romántica tiene significado diferente a vino en pícnic. El ROI emocional es clave: cliente no compra vino, compra la emoción y identidad que representa. Sommelier que comprende esto puede crear experiencias memorables.',
      practicalExercise: 'Diseña una estrategia de comunicación para vender un vino específico (elige real o hipotético) dirigida a tres perfiles de consumidor diferentes (ej. ejecutivo corporativo, pareja joven, turista ocasional). Para cada uno: identifica sus heurísticas de decisión, qué narrativa resonaría, cómo presentarías el vino (precio, historia, región), y qué emociones buscarías activar. Presenta en 1-2 páginas.'
    },
    {
      id: 'module-4-12',
      slug: 'derecho-vitivinicola-normativa-internacional',
      title: 'Derecho vitivinícola y normativa internacional',
      description: 'Regulación de denominaciones de origen, etiquetado, certificaciones internacionales, legislación de comercio e importación/exportación.',
      duration: '22 minutos',
      videoPlaceholder: '/videos/level4/module12-derecho.mp4',
      keyPoints: [
        'Denominación de origen (DO, DOC, AOC): protección y regulación',
        'Denominación geográfica vs. vino de mesa: diferencias legales',
        'Certificaciones internacionales: EU Organic, Fair Trade, otros',
        'Etiquetado obligatorio: contenido de alcohol, alérgenos, origen',
        'Comercio internacional: aranceles, acuerdos bilaterales, barreras',
        'Importación/exportación: documentación, certificados fitosanitarios',
        'Responsabilidad del restaurante: cumplimiento legal en venta',
        'Falsificaciones: detección, legalidad, protección de derechos',
        'Normativa de seguridad alimentaria aplicable a vinos'
      ],
      quiz: [
        {
          question: '¿Cuál es la diferencia legal entre Denominación de Origen Protegida (DOP) y Indicación Geográfica Protegida (IGP)?',
          options: [
            'No hay diferencia',
            'DOP requiere que producción y elaboración ocurran en la región, con criterios estrictos; IGP permite más flexibilidad en procesos (pueden importarse uvas) pero requiere que al menos producción/elaboración sea en región',
            'IGP es más estricta que DOP',
            'DOP es menos importante legalmente'
          ],
          correct: 1
        },
        {
          question: '¿Qué información es legalmente obligatoria en la etiqueta de un vino en la UE?',
          options: [
            'Solo nombre del vino',
            'Nombre, alcohol %, origen, alérgenos (sulfitos), volumen',
            'Información detallada sobre cada proceso de elaboración',
            'No hay regulación obligatoria'
          ],
          correct: 1
        }
      ],
      content: 'La regulación vitivinícola es compleja y varía globalmente. En Europa, el sistema de Denominaciones de Origen es rigoroso: Denominación de Origen Protegida (DOP, ej. Burdeos, Rioja DO) requiere que uvas, producción y elaboración ocurran en región específica, con criterios estrictos de variedades permitidas y técnicas. Indicación Geográfica Protegida (IGP) es más flexible: permite uvas importadas pero requiere que producción/elaboración sea en región. "Vino de mesa" no tiene protección geográfica ni requisitos específicos. En EE.UU., American Viticultural Areas (AVA) son menos restrictivas que DO europeas. Certificaciones internacionales (EU Organic, Fair Trade) requieren auditoría y verificación. El etiquetado en EU es estrictamente regulado: debe incluir % alcohol, origen, alérgenos (especialmente sulfitos), volumen, responsable comercial. En restaurantes, responsabilidades legales incluyen: vender vino de forma transparente (no falsificar origen), cumplir legislación de edad mínima, informar contenido de alérgenos. Falsificaciones de botellas premium (Burdeos, Burdeos) son problema criminal: detectar requiere expertise en inspección de corchos, cápsulas, botella misma. El comercio internacional está regulado por aranceles (EU-Chile tienen acuerdo preferencial, por ejemplo) y acuerdos bilaterales que reducen o aumentan costos de importación. Certificados fitosanitarios son requeridos para exportación/importación para confirmar que vino no porta plagas o enfermedades. Para restaurantes internacionales, navegar normativa es crítico para evitar sanciones.',
      practicalExercise: 'Investiga normativa vitivinícola de dos países diferentes (ej. España y EE.UU., o Francia y Chile). Compara: requisitos de DO/certificación, regulación de etiquetado, restricciones de comercio, y alineación en acuerdos internacionales. Cómo afectan estas normas a la disponibilidad y costo de vinos importados en un restaurante? Presenta comparativa en 2-3 páginas.'
    },
    {
      id: 'module-4-13',
      slug: 'proyecto-final-programa-vinos',
      title: 'Proyecto final: diseño de programa de vinos',
      description: 'Proyecto integrador: diseña un programa de vinos completo para un negocio específico, aplicando todos los conceptos del nivel.',
      duration: '25 minutos',
      videoPlaceholder: '/videos/level4/module13-proyecto.mp4',
      keyPoints: [
        'Análisis de negocio: modelo, cliente, presupuesto, espacio',
        'Definición de estrategia de vino alineada con modelo de negocio',
        'Selección de referencias: curaduría, pricing, margen',
        'Gobernanza y procesos: compra, almacenamiento, capacitación',
        'Propuesta de valor: cómo diferenciarse mediante vino',
        'KPIs de éxito: métricas a monitorear',
        'Plan de marketing y comunicación del programa',
        'Sostenibilidad y responsabilidad incorporada',
        'Timeline de implementación y contingencias'
      ],
      quiz: [
        {
          question: '¿Cuál es el primer paso al diseñar un programa de vinos para un negocio?',
          options: [
            'Comprar vinos premium inmediatamente',
            'Analizar el modelo de negocio, cliente objetivo, presupuesto disponible, y espacio físico',
            'Copiar la carta de un competidor exitoso',
            'Contratar al sommelier más famoso disponible'
          ],
          correct: 1
        },
        {
          question: 'Un proyecto de programa de vinos debe integrar:',
          options: [
            'Solo análisis de costo de vinos',
            'Estrategia, operaciones, KPIs, marketing, y sostenibilidad alineados con la visión empresarial',
            'Solo educación y catas',
            'Ninguna integración es necesaria'
          ],
          correct: 1
        }
      ],
      content: 'El proyecto final integra todos los conceptos del Nivel 4. Comienza con análisis profundo del negocio: ¿Qué es? ¿Quién es tu cliente? ¿Cuál es su poder adquisitivo? ¿Qué espacio físico y inversión disponible tienes? ¿Cuál es tu visión para vino en este negocio—lucrativo, diferenciador, experiencial? De esto emerge estrategia: un hotel de lujo necesita amplia carta con referencias premium y servicios personalizados; un bar de vino en barrio hipster necesita naturales, accesibilidad, y storytelling; un restaurante de cocina regional necesita alineación vino-comida. La selección de referencias debe ser cuidadosa: no por cantidad (80 referencias mal curadas es peor que 30 excelentes), sino por coherencia temática, balance precio-calidad, y capacidad de rotación. Gobernanza define procesos: quién compra, con qué criterios, cómo se almacena, cómo se capacita al personal. Propuesta de valor es crítica: si todos los restaurantes venden vino, ¿por qué tu programa es diferente? ¿Sommelier educador? ¿Programa de vinos naturales? ¿Experiencias enoturísticas? KPIs permiten monitoreo: margen bruto, rotación, ticket promedio, índice de satisfacción de cliente. Marketing comunica propuesta: training del staff, publicidad, social media, eventos de lanzamiento. Sostenibilidad está integrada: qué proporción será orgánico, local, con prácticas responsables. Timeline realista con fases: fase 1 (meses 1-2) lanzamiento inicial; fase 2 (meses 3-6) optimización; fase 3 (meses 6+) expansión y eventos.',
      practicalExercise: 'PROYECTO INTEGRADOR: Diseña un programa de vinos completo para un negocio de tu elección (real u hipotético). Incluye: 1) Análisis ejecutivo del negocio y cliente, 2) Estrategia de vino (diferenciadores, propuesta de valor), 3) Carta de 40-80 referencias (con justificación de selección), 4) Pricing y proyección de márgenes, 5) Gobernanza y procesos, 6) KPIs y metas para año 1, 7) Plan de marketing, 8) Consideraciones de sostenibilidad, 9) Timeline de implementación. Presenta en formato profesional (5-10 páginas) como si fuese propuesta a inversionistas o propietario.'
    },
    {
      id: 'module-4-14',
      slug: 'examen-certificacion-teoria',
      title: 'Examen de certificación: teoría',
      description: 'Examen teórico integral que valida conocimientos de todos los módulos del Nivel 4 y obtención de certificación.',
      duration: '90 minutos',
      videoPlaceholder: '/videos/level4/module14-examen-teoria.mp4',
      keyPoints: [
        'Evaluación integral de conceptos de los 13 módulos anteriores',
        'Preguntas de comprensión conceptual no solo memorización',
        'Análisis de casos de estudio: aplicar conceptos a escenarios reales',
        'Preguntas de integración: cómo interconectan los temas',
        'Calificación mínima requerida: 75% para aprobar',
        'Cobertura: estrategia, KPIs, gobernanza, tendencias, sostenibilidad, economics, enoturismo, marca, tecnología, eventos, psicología, derecho',
        'Formato: 50 preguntas de múltiple opción + 3 preguntas de análisis breve',
        'Tiempo permitido: 90 minutos',
        'Feedback detallado post-examen con áreas de fortaleza y mejora'
      ],
      quiz: [
        {
          question: 'Estás diseñando programa de vinos para un restaurante casual en barrio joven. ¿Cuál sería tu estrategia PRINCIPAL?',
          options: [
            'Vinos premium exclusivamente, altos márgenes, capacitación básica de staff',
            'Referencias accesibles (precios $20-60), énfasis en educación, naturales y vinos de mercados emergentes, experiencias (catas, eventos), márgenes moderados pero alto volumen',
            'Copiar carta de restaurante de lujo local',
            'Minimizar inversión, comprar vinos baratos sin estrategia'
          ],
          correct: 1
        },
        {
          question: 'Una referencia de vino rota 12 veces/año, margen de 60%, pero solo hay espacio para 3 botellas simultáneamente. Otra rota 4 veces/año, margen 70%, requiere 6 botellas espacio. ¿Cuál debería priorizar en inventario limitado?',
          options: [
            'La de mayor margen (70%)',
            'La de mayor rotación (12x/año) porque mayor utilización de espacio y capital circulante',
            'Ambas igualmente',
            'Ninguna, son ambas ineficientes'
          ],
          correct: 1
        }
      ],
      content: 'Este examen valida competencia profesional integral en dirección enológica. No es memorización sino aplicación. Las preguntas integran conceptos múltiples: "Estás en grupo de 8 restaurantes con presupuesto regional limitado. Una región prefiere tintos, otra blancos. ¿Cómo gobernanzas la compra?" Requiere comprender estrategia, gobernanza, KPIs simultáneamente. Los casos de estudio son escenarios reales: "Tu hotel lanzará programa enoturístico. Diseña experiencia de 3 horas que sea rentable y diferenciadora." Requiere integrar conocimiento de enoturismo, marketing, operaciones, rentabilidad. Aprobación requiere 75%+ (38 de 50 preguntas correctas en múltiple opción, más análisis breve de calidad). El examen está diseñado para profesionales actuales, no académico: énfasis en decisiones prácticas, trade-offs reales, y análisis de negocio. Posibilidad de retomar si no aprueba a primera (máximo 3 intentos).',
      practicalExercise: 'Prepárate para examen teórico revisando todos los módulos anteriores. Identifica 5 conceptos clave de cada módulo. Crea 10 preguntas de estudio tipo examen (5 conceptuales, 5 aplicadas a casos). Responde tus propias preguntas por escrito. Esto te preparará para integración de conocimiento requerida en el examen real.'
    },
    {
      id: 'module-4-15',
      slug: 'examen-certificacion-cata-practica',
      title: 'Examen de certificación: cata práctica',
      description: 'Examen práctico de cata profesional que valida habilidades sensoriales, análisis descriptivo y recomendaciones personalizadas.',
      duration: '120 minutos',
      videoPlaceholder: '/videos/level4/module15-examen-cata.mp4',
      keyPoints: [
        'Degustación a ciegas de 4-5 vinos seleccionados estratégicamente',
        'Análisis visual completo (color, viscosidad, claridad)',
        'Análisis olfativo: intensidad, familia aromática, evolución',
        'Análisis gustativo: estructura, taninos, acidez, final, complejidad',
        'Descripción profesional: terminología correcta, narrativa coherente',
        'Identificación de varietal, región, y vintage aproximado',
        'Recomendación de emparejamiento con comidas específicas',
        'Juicio crítico: fortalezas y debilidades del vino',
        'Comunicación efectiva: explicar análisis a público no-experto'
      ],
      quiz: [
        {
          question: 'Catas un vino a ciegas con color rojo violáceo, nariz intensa de frambuesa y especias, estructura media, final corto. Probablemente es:',
          options: [
            'Un Burdeos antiguo de 20+ años',
            'Un Pinot Noir o Syrah joven de clima frío/templado',
            'Un Cabernet Sauvignon de Napa Valley de 10 años',
            'Un vino blanco deshidratado'
          ],
          correct: 1
        },
        {
          question: 'Un cliente en restaurante pide recomendación de vino para acompañar pechuga de pollo al horno con champiñones y crema. ¿Cuál sería tu recomendación técnica y POR QUÉ?',
          options: [
            'Siempre tinto, es más importante',
            'Blanco de cuerpo medio-completo (Chardonnay, Albariño) o tinto suave (Pinot Noir) porque los champiñones son umamis que funcionan con acidez del blanco o taninos suaves del tinto, la crema requiere suficiente acidez para cortar grasa',
            'Un vino dulce porque la crema es dulce',
            'El cliente decide, no hay criterios'
          ],
          correct: 1
        }
      ],
      content: 'El examen práctico es validación de competencia sensorial y profesional real. Se realiza en condiciones controladas: 4-5 vinos a ciegas (candidato no sabe qué son). Cada vino se evalúa siguiendo protocolo profesional: primero análisis visual (color indica edad, claridad indica defectos, viscosidad indica concentración y alcohol), luego olfativo (100+ aromas posibles, pero se agrupan en familias: frutas, flores, especias, terrenales, reducidos), luego gustativo (estructura, balance, evolución en boca, final). El candidato describe cada vino usando terminología estándar: no "sabe bien", sino "estructura media con acidez vibrante, taninos suaves, final frutal mediano". Luego intenta identificar: varietal probable, región, vintage aproximado (dentro de 3-5 años). La identificación perfecta no es requerida; lo importante es razonamiento lógico: "Porque color sugiere juventud, aromas de frambuesa fresca sugieren clima fresco, acidez alta es consistente con Pinot Noir de Nueva Zelanda". Finalmente, el candidato recomienda emparejamiento con comidas específicas, justificando técnicamente. Evaluación es holística: exactitud técnica (40%), razonamiento lógico (30%), comunicación profesional (20%), y crítica equilibrada (10%). Pasar requiere mínimo 75% en evaluación. Este examen garantiza que director de vinos certificado puede: identificar vinos por análisis sensorial, comunicar profesionalmente a clientes, y tomar decisiones técnicas informadas.',
      practicalExercise: 'Practica cata práctica a ciegas: consigue 4-5 vinos diversos (diferentes tipos, regiones, edades si es posible). Cata cada uno siguiendo protocolo: visual (3 min), olfativo (5 min), gustativo (5 min). Anota observaciones usando terminología correcta. Intenta identificar varietal/región/edad. Luego revela etiqueta y evalúa tu análisis: ¿Qué acertaste? ¿Qué perdiste? ¿Por qué? Repite con diferentes vinos. Busca feedback de sommelier experimentado si es posible.'
    }
  ],
  certificate: 'Certificado de Dirección Enológica y Gestión de Programas de Vino - Nivel 4 (Academia de Vino)',
  seo: {
    title: 'Nivel 4: Dirección Enológica y Certificación - Academia de Vino',
    description: 'Programa profesional de certificación en dirección enológica, gestión de cartas de vino, estrategia empresarial y liderazgo. Para F&B managers, directores de vino y profesionales de la industria.'
  }
}
];

export default coursesLibrary;
