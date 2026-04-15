export interface CourseModule {
  id: string;
  slug: string;
  title: string;
  description: string;
  duration: string; // e.g. "5 min"
  videoPlaceholder: string; // description of what the video would cover
  keyPoints: string[];
  quiz: { question: string; options: string[]; correct: number }[];
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
    id: "fundamentos",
    slug: "fundamentos",
    level: 1,
    title: "Fundamentos del Vino",
    subtitle: "Para camareros sin experiencia",
    description: "Aprende las bases del vino: qué es, cómo servirse, las uvas principales y cómo leer una carta sin miedo.",
    icon: "🍷",
    targetAudience: "Camarero sin experiencia",
    prerequisites: "Ninguno",
    estimatedHours: 2,
    certificate: "Certificado Fundamentos del Vino",
    seo: {
      title: "Fundamentos del Vino - Curso para Camareros",
      description: "Curso de vino para principiantes. Aprende qué es el vino, cómo servir correctamente, las 10 uvas esenciales y cómo leer una carta."
    },
    modules: [
      {
        id: "que-es-el-vino",
        slug: "que-es-el-vino",
        title: "Qué es el vino",
        description: "Tintos, blancos, rosados, espumosos: cómo se hacen y qué diferencias hay entre ellos.",
        duration: "8 min",
        videoPlaceholder: "Video explicativo sobre los cuatro grandes tipos de vino (tinto, blanco, rosado, espumoso), cómo se elaboran y qué características definen a cada uno. Incluye ejemplos visuales de uvas, procesos de fermentación y colores.",
        keyPoints: [
          "Los 4 grandes tipos de vino: tinto, blanco, rosado y espumoso",
          "Cómo el contacto con pieles cambia el color y sabor",
          "Proceso de fermentación básico",
          "Diferencias en alcohol, acidez y cuerpo entre tipos"
        ],
        quiz: [
          {
            question: "¿Cuál es la principal diferencia entre un vino tinto y un blanco?",
            options: [
              "El tiempo de envejecimiento",
              "El contacto de la fermentación con las pieles de uva",
              "El tipo de levadura utilizada",
              "La región de origen"
            ],
            correct: 1
          },
          {
            question: "¿Qué caracteriza a un vino espumoso?",
            options: [
              "Tiene frutas añadidas",
              "Se fermenta en clima frío",
              "Contiene CO2 disuelto que crea burbujas",
              "Tiene mayor contenido de azúcar"
            ],
            correct: 2
          },
          {
            question: "¿Cuál es el rango típico de alcohol en un vino?",
            options: [
              "5-10%",
              "12-15%",
              "18-20%",
              "22-25%"
            ],
            correct: 1
          }
        ]
      },
      {
        id: "servicio-correcto",
        slug: "servicio-correcto",
        title: "Cómo servir vino correctamente",
        description: "Temperatura, copas, cómo descorchar y las reglas de presentación que el cliente valora.",
        duration: "10 min",
        videoPlaceholder: "Demostración paso a paso de cómo servir vino profesionalmente: selección de copas, manejo del sacacorchos, presentación de la botella, ángulo correcto de vertido, temperatura ideal para cada tipo de vino y cómo limpiar derrames.",
        keyPoints: [
          "Temperaturas ideales: tintos 16-18°C, blancos 8-10°C, espumosos 6-8°C",
          "Tipos de copas y por qué cada tipo tiene su copa",
          "Técnica correcta del sacacorchos (con aplomo y sin prisa)",
          "Cómo presentar el vino al cliente y verificar la calidad",
          "Ángulo de vertido correcto para evitar derrames"
        ],
        quiz: [
          {
            question: "¿A qué temperatura se debe servir un vino tinto?",
            options: [
              "4-6°C",
              "8-10°C",
              "12-14°C",
              "16-18°C"
            ],
            correct: 3
          },
          {
            question: "¿Cuál es el primer paso después de descorchar una botella en la mesa?",
            options: [
              "Verter en todas las copas",
              "Mostrar el corcho al cliente",
              "Servir un poco al cliente para que pruebe",
              "Limpiar el cuello de la botella"
            ],
            correct: 3
          },
          {
            question: "¿Cuánto debe ocupar el vino en una copa?",
            options: [
              "Hasta el borde",
              "Dos tercios",
              "Un tercio",
              "Medio vaso"
            ],
            correct: 2
          }
        ]
      },
      {
        id: "diez-uvas-esenciales",
        slug: "diez-uvas-esenciales",
        title: "Las 10 uvas que todo camarero debe conocer",
        description: "Las variedades de uva más comunes en el mundo, sus características, sabores y regiones donde se cultivan.",
        duration: "12 min",
        videoPlaceholder: "Introducción visual a las 10 variedades de uva más importantes: Tempranillo, Cabernet Sauvignon, Merlot, Chardonnay, Sauvignon Blanc, Riesling, Albariño, Pinot Noir, Garnacha y Syrah. Para cada uva se muestran sus características, perfiles de sabor, regiones de cultivo y ejemplos de vinos famosos.",
        keyPoints: [
          "Tempranillo: bodycorp y taninos, típico de La Rioja",
          "Cabernet Sauvignon: potente, estructurado, cassis y cedro",
          "Merlot: suave, frutal, cereza y chocolate",
          "Chardonnay: blanco versátil, manzana y mantequilla",
          "Sauvignon Blanc: aromático, fresco, hierba y cítricos",
          "Riesling: aromático alemán, desde seco a dulce",
          "Albariño: blanco gallego, mineral y atlántico",
          "Pinot Noir: delicado, frambuesa y especias",
          "Garnacha: jugosa, frutal, pimienta",
          "Syrah: potente, pimienta negra y flores"
        ],
        quiz: [
          {
            question: "¿Cuál es la uva más típica de La Rioja?",
            options: [
              "Cabernet Sauvignon",
              "Tempranillo",
              "Merlot",
              "Garnacha"
            ],
            correct: 1
          },
          {
            question: "¿Qué caracteriza a un Sauvignon Blanc?",
            options: [
              "Sabor a chocolate y café",
              "Aromático con notas de hierba y cítricos",
              "Muy dulce y afrutado",
              "Color profundo y taninos fuertes"
            ],
            correct: 1
          },
          {
            question: "¿Cuál es la región de origen del Albariño?",
            options: [
              "Cataluña",
              "La Rioja",
              "Galicia",
              "Castilla y León"
            ],
            correct: 2
          }
        ]
      },
      {
        id: "leer-carta-vinos",
        slug: "leer-carta-vinos",
        title: "Cómo leer una carta de vinos sin perderse",
        description: "Entender qué significa cada cosa en una carta: región, añada, precio, clasificación y cómo buscar lo que el cliente necesita.",
        duration: "9 min",
        videoPlaceholder: "Guía práctica de lectura de cartas de vinos. Se muestran varios ejemplos reales de cartas: cómo están organizadas (por regiones, estilos, precios), qué información contiene cada entrada (bodega, región, añada, denominación, notas de cata), cómo encontrar rápidamente lo que necesitas y cómo identificar vinos de calidad.",
        keyPoints: [
          "Estructura típica de una carta: por región, por estilo o por precio",
          "Información clave: bodega, región, añada, denominación, puntuación",
          "Cómo buscar un vino por características (seco/dulce, ligero/potente)",
          "Abreviaturas comunes (D.O., D.O.P., vino de mesa)",
          "Cómo identificar si un vino es joven, crianza o reserva"
        ],
        quiz: [
          {
            question: "¿Qué significa D.O. en una carta de vinos?",
            options: [
              "Denominación Obligatoria",
              "Denominación de Origen",
              "Destilación Oficial",
              "Denominación Oxidativa"
            ],
            correct: 1
          },
          {
            question: "Un vino que pone 'Crianza' en la etiqueta, ¿cuánto tiempo mínimo debe estar envejecido?",
            options: [
              "1 año",
              "2 años",
              "3 años",
              "5 años"
            ],
            correct: 1
          },
          {
            question: "¿Cómo se organiza comúnmente una carta de vinos?",
            options: [
              "Solo por precio",
              "Solo por color",
              "Por regiones, estilos o precios (según criterio del restaurante)",
              "Alfabéticamente por bodega"
            ],
            correct: 2
          }
        ]
      },
      {
        id: "primera-recomendacion",
        slug: "primera-recomendacion",
        title: "Cómo responder 'Recomiéndame algo' sin bloquear",
        description: "Técnicas para hacer buenas recomendaciones cuando el cliente no sabe qué pedir.",
        duration: "10 min",
        videoPlaceholder: "Estrategias prácticas para responder recomendaciones. Se demuestran diálogos reales con clientes indecisiones: cómo hacer preguntas de apertura (¿qué te apetece?, ¿tinto o blanco?), cómo filtrar opciones, cómo ofrecer 2-3 alternativas con argumentos claros, y cómo cerrar la venta con confianza.",
        keyPoints: [
          "Las 3 preguntas clave: color, estructura, y presupuesto aproximado",
          "Cómo filtrar la carta rápidamente en tu cabeza",
          "Técnica de ofrecer 2-3 opciones (nunca más)",
          "Cómo justificar cada recomendación con 1-2 palabras de sabor",
          "Lenguaje positivo: 'Te va a encantear porque...' en lugar de 'Es que...'"
        ],
        quiz: [
          {
            question: "Ante un cliente que dice 'no sé de vinos, tú recomienda', ¿cuál es tu primer paso?",
            options: [
              "Recomendar el vino más caro",
              "Recomendar el más vendido",
              "Hacer preguntas para entender sus preferencias",
              "Dar a probar varios vinos"
            ],
            correct: 2
          },
          {
            question: "¿Cuántas opciones de vino deberías ofrecer al cliente?",
            options: [
              "Una sola",
              "Dos o tres máximo",
              "Cinco o seis",
              "Todas las de la carta"
            ],
            correct: 1
          },
          {
            question: "Un cliente que pide 'algo afrutado', ¿qué debería preguntarle?",
            options: [
              "¿Tinto o blanco?",
              "¿Dulce o seco?",
              "¿Con o sin burbujas?",
              "Todas las anteriores"
            ],
            correct: 3
          }
        ]
      },
      {
        id: "errores-comunes",
        slug: "errores-comunes",
        title: "Los 5 errores más frecuentes al servir vino",
        description: "Los errores que cometen los camareros principiantes y cómo evitarlos.",
        duration: "7 min",
        videoPlaceholder: "Análisis detallado de los 5 errores más comunes al servir vino: servir a temperatura incorrecta, usar copas inapropiadas, derramar al servir, no limpiar el cuello de la botella, y hacer recomendaciones sin escuchar al cliente. Para cada error se muestra qué sucede, por qué ocurre y cómo prevenirlo.",
        keyPoints: [
          "Error 1: Servir a temperatura incorrecta (impacto en el sabor)",
          "Error 2: Usar la copa equivocada (reduce la experiencia)",
          "Error 3: Derrames al servir (falta de profesionalismo)",
          "Error 4: No limpiar el cuello (primera impresión)",
          "Error 5: Recomendar sin preguntar (no escuchar al cliente)"
        ],
        quiz: [
          {
            question: "¿Cuál es la consecuencia de servir un vino blanco a temperatura ambiente?",
            options: [
              "Se enfría más rápido",
              "Pierde acidez y frescura",
              "Mejora su sabor",
              "Se oxida menos"
            ],
            correct: 1
          },
          {
            question: "¿Por qué es importante limpiar el cuello de la botella?",
            options: [
              "Para que se vea más bonita",
              "Porque el corcho deja polvo",
              "Para dar una impresión de profesionalismo",
              "Para evitar que el vino se oxide"
            ],
            correct: 2
          },
          {
            question: "¿Cómo evitar derrames al servir vino?",
            options: [
              "Vertiendo muy rápido",
              "Vertiendo muy lento",
              "Con ángulo correcto y sin prisa",
              "Usando una servilleta en la mano"
            ],
            correct: 2
          }
        ]
      }
    ]
  },
  {
    id: "vendedor",
    slug: "vendedor",
    level: 2,
    title: "Vendedor de Vino",
    subtitle: "Para camarero con experiencia",
    description: "Aprende a vender vino, no solo a servirlo. Técnicas de recomendación, maridaje rápido, preguntas del cliente y cómo aumentar el ticket.",
    icon: "💼",
    targetAudience: "Camarero con experiencia",
    prerequisites: "Nivel 1 completado",
    estimatedHours: 3,
    certificate: "Certificado Vendedor de Vino",
    seo: {
      title: "Vendedor de Vino - Curso de Ventas para Camareros",
      description: "Curso de técnicas de venta de vino. Aprende maridajes, a aumentar ticket medio, responder preguntas del cliente y detectar qué quiere el comensal."
    },
    modules: [
      {
        id: "subir-ticket-medio",
        slug: "subir-ticket-medio",
        title: "Cómo subir el ticket medio con vino",
        description: "Estrategias y técnicas para aumentar el gasto de vino sin presionar al cliente.",
        duration: "11 min",
        videoPlaceholder: "Análisis de estrategias probadas para aumentar el ticket medio de vino. Se cubren técnicas como ofrecer vino en copa primero (para que pruebe), sugerir una segunda botella cuando es apropiado, recomendar vinos premium sin presionar, y cómo leer las señales del cliente para saber cuándo upsellar. Se incluyen diálogos reales y roleplay.",
        keyPoints: [
          "Técnica del vino por copa: menos riesgo para el cliente, prueba antes",
          "Cómo sugerir una segunda botella sin parecer avaro",
          "Premiumización: cómo pasar de un tinto básico a uno de mejor calidad",
          "Leer el contexto: celebración, cliente habitual, tipo de comida",
          "Lenguaje de cierre: crear urgencia sin presion ('Tenemos solo 3 botellas de este')"
        ],
        quiz: [
          {
            question: "¿Cuál es la ventaja principal de ofrecer vino por copa antes de botella?",
            options: [
              "Es más fácil de servir",
              "El cliente puede probar sin riesgo y después pedir botella",
              "Cuesta menos dinero",
              "Ocupa menos espacio en bodega"
            ],
            correct: 1
          },
          {
            question: "¿Cuándo es un buen momento para sugerir una segunda botella?",
            options: [
              "Al final de la comida",
              "Cuando el cliente pide la carta",
              "Cuando ya ha terminado más de la mitad de la primera botella",
              "Nunca, es invasivo"
            ],
            correct: 2
          },
          {
            question: "¿Cuál es el mejor argumento para una premiumización?",
            options: [
              "'Este es más caro, pero mejor'",
              "'Todos compran este'",
              "'Este maridaje especial con el plato es increíble'",
              "'Recomienda tus amigos este'"
            ],
            correct: 2
          }
        ]
      },
      {
        id: "maridajes-rapidos",
        slug: "maridajes-rapidos",
        title: "Maridajes rápidos: qué vino con qué plato",
        description: "Combinaciones clásicas y criterios para emparejar vino y comida sin complicarse.",
        duration: "13 min",
        videoPlaceholder: "Guía práctica de maridajes. Se cubren las combinaciones clásicas (pescado blanco + blanco, carne roja + tinto) y los criterios que funcionan siempre: peso del plato con peso del vino, sabores complementarios, y acidez/taninos vs grasa del plato. Se muestran ejemplos visuales y diálogos del camarero con cliente.",
        keyPoints: [
          "Regla de oro: peso del vino = peso del plato",
          "Pescados blancos → blancos ligeros o espumosos",
          "Carnes rojas → tintos con cuerpo",
          "Pastas cremosas → blancos con cuerpo o tintos ligeros",
          "Aves → tintos ligeros o blancos, según preparación",
          "La acidez corta la grasa: carne grasa pide vino ácido",
          "Los taninos combaten proteínas y grasas"
        ],
        quiz: [
          {
            question: "¿Qué vino combina mejor con un salmón a la mantequilla?",
            options: [
              "Tinto potente",
              "Blanco con cuerpo y acidez",
              "Vino muy dulce",
              "Espumoso seco"
            ],
            correct: 1
          },
          {
            question: "¿Por qué un vino ácido funciona bien con platos grasos?",
            options: [
              "Porque contrasta en color",
              "Porque la acidez 'limpia' el paladar de la grasa",
              "Porque siempre se vende más",
              "Porque es más barato"
            ],
            correct: 1
          },
          {
            question: "Un cliente pide pechuga de pollo con salsa ligera, ¿qué le recomendarías?",
            options: [
              "Tinto reserva potente",
              "Blanco ligero o tinto ligero (según preferencia de color)",
              "Solo espumoso",
              "Sin vino, es mejor agua"
            ],
            correct: 1
          }
        ]
      },
      {
        id: "preguntas-frecuentes",
        slug: "preguntas-frecuentes",
        title: "Las 20 preguntas del cliente y cómo responderlas",
        description: "Las preguntas más comunes que hace un cliente sobre vino y respuestas claras que construyen confianza.",
        duration: "15 min",
        videoPlaceholder: "Compilación de 20 preguntas reales que hace el cliente sobre vino, con respuestas profesionales claras y sin jerga. Incluye: '¿Qué es la añada?', '¿Tiene taninos?', '¿Es un vino joven o viejo?', '¿Por qué es tan caro?', '¿Me emborrachará rápido?', '¿Tiene sulfitos?', y otras. Cada respuesta se da en lenguaje simple con argumentos que tranquilizan al cliente.",
        keyPoints: [
          "Preguntas sobre añada, crianza y envejecimiento",
          "Preguntas sobre sabor, cuerpo y características",
          "Preguntas sobre precio y valor",
          "Preguntas sobre salud y componentes",
          "Preguntas sobre conservación y servicio",
          "Cómo responder con confianza sin parecer esnob"
        ],
        quiz: [
          {
            question: "¿Qué responderías a 'Este vino es muy caro, ¿por qué?'?",
            options: [
              "'Porque sí'",
              "'Porque es viejo'",
              "'Porque esta bodega es famosa, tiene calidad consistente, y la cosecha de ese año fue excepcional'",
              "'No sé, así está en la carta'"
            ],
            correct: 2
          },
          {
            question: "Si el cliente pregunta '¿Tiene mucho alcohol?', ¿cómo descubres si es un problema?",
            options: [
              "Asumes que sí",
              "Le preguntas si es por salud o por preferencia de sabor",
              "Le das dirección a un blanco siempre",
              "No le das importancia"
            ],
            correct: 1
          },
          {
            question: "¿Qué significa 'añada' en una botella?",
            options: [
              "El color del vino",
              "El año de cosecha de la uva",
              "La región de origen",
              "El tiempo que está en barrica"
            ],
            correct: 1
          }
        ]
      },
      {
        id: "detectar-perfil-cliente",
        slug: "detectar-perfil-cliente",
        title: "Cómo detectar lo que el cliente quiere",
        description: "Técnicas para leer al cliente y ofrecer exactamente lo que busca, aunque no lo sepa.",
        duration: "10 min",
        videoPlaceholder: "Análisis de señales que emite el cliente en la mesa: lenguaje corporal, cómo habla de vino, si va acompañado, el tipo de comida que elige, si pide copas o botellas. Se enseña cómo usar estas señales para saber si el cliente es aventurero o conservador, si busca precio o calidad, si quiere aprender o simplemente disfrutar.",
        keyPoints: [
          "Señales verbales: 'No entiendo de vinos' vs 'Tengo un tinto favorito'",
          "Señales no verbales: cómo mira la carta, tono de voz",
          "Contexto: Celebración, comida de negocios, pareja, grupo de amigos",
          "Tipo de comida elegida: indica presupuesto y sofisticación",
          "Cómo adaptar tu recomendación al cliente real, no al cliente ideal"
        ],
        quiz: [
          {
            question: "Un cliente abre la carta de vinos y la cierra rápido diciendo 'Tú elige', ¿qué dice esto?",
            options: [
              "Que es un experto en vino",
              "Que no tiene dinero",
              "Que no entiende de vino y necesita que tomes la decisión",
              "Que solo quiere agua"
            ],
            correct: 2
          },
          {
            question: "¿Cómo diferencias entre un cliente que busca calidad vs. un cliente que solo quiere ahorrar?",
            options: [
              "Por la ropa que lleva",
              "Por el tipo de comida que pide y cómo habla de vino",
              "Nunca se puede saber",
              "Todos quieren lo mismo: buen vino barato"
            ],
            correct: 1
          },
          {
            question: "Un cliente pide 'algo fresco y ligero para acompañar pescado', ¿qué tipo de perfil es?",
            options: [
              "Aventurero, busca vinos raros",
              "Conocedor, sabe lo que quiere",
              "Principiante, necesita orientación",
              "Esnob, busca vinos caros"
            ],
            correct: 1
          }
        ]
      },
      {
        id: "vino-por-copa",
        slug: "vino-por-copa",
        title: "Vino por copa: tu mejor herramienta de venta",
        description: "Cómo usar el vino por copa para aumentar ventas sin presionar al cliente.",
        duration: "11 min",
        videoPlaceholder: "Análisis estratégico del vino por copa como herramienta de venta. Se cubren: cómo presentar el vino por copa sin restar importancia a la botella, cómo gestionar que el cliente pruebe en copa y después pida botella, cómo mantener la calidad en el programa de copa, y cómo comunicar los vinos por copa al cliente (carta separada, presentación verbal, etc.).",
        keyPoints: [
          "Ventaja psicológica: el cliente prueba sin riesgo en copa",
          "Cómo presentar: 'Tenemos estos vinos también por copa si quieres probar'",
          "Conversión copa a botella: 'Te encanta, ¿verdad? Pido una botella entera'",
          "Mantener frescura: botellas abiertas máximo 24-48h con sistemas de conservación",
          "Cuándo hacer 'upsell' de copa a botella sin parecer vendedor agresivo"
        ],
        quiz: [
          {
            question: "¿Cuál es la ventaja principal de ofrecer vino por copa?",
            options: [
              "Cuesta menos al restaurante",
              "Se vende más rápido",
              "El cliente puede probar sin riesgo financiero",
              "Ocupa menos espacio en bodega"
            ],
            correct: 2
          },
          {
            question: "¿Cuánto tiempo máximo puede estar una botella abierta de vino por copa?",
            options: [
              "1 día",
              "2-3 días con sistemas de conservación",
              "Una semana",
              "Un mes si está tapada"
            ],
            correct: 1
          },
          {
            question: "Un cliente probó un vino por copa y le encantó, ¿cómo lo conviertes en botella?",
            options: [
              "'Compra la botella, es más barato'",
              "'Este es muy bueno, ¿te traigo una botella entera?'",
              "Lo dejas que pida por su cuenta",
              "Le cobras como si fuera botella"
            ],
            correct: 1
          }
        ]
      },
      {
        id: "tecnicas-mesa",
        slug: "tecnicas-mesa",
        title: "Técnicas de presentación y venta en mesa",
        description: "Cómo conducir la conversación sobre vino en la mesa para aumentar ventas y satisfacción.",
        duration: "12 min",
        videoPlaceholder: "Masterclass sobre dinámicas de venta de vino en la mesa. Se cubren: cómo abordar la conversación de vino en el momento correcto, cómo hacer preguntas que cierren venta (no preguntas abiertas), cómo usar lenguaje positivo, cómo manejar objeciones de precio, y cómo crear sensación de escasez ('Solo 3 botellas de este') sin ser mentiroso.",
        keyPoints: [
          "Timing: oferta de vino después de aperitivo, antes de plato",
          "Preguntas de cierre vs preguntas abiertas",
          "Lenguaje positivo: 'Este es increíble con...' en lugar de 'Este podría servir'",
          "Manejo de objección de precio: justificación con calidad, no discusión",
          "Crear urgencia ética: escasez real, no mentiras"
        ],
        quiz: [
          {
            question: "¿Cuál es la mejor pregunta para cerrar venta: 'Pregunta abierta' o 'Pregunta de cierre'?",
            options: [
              "'¿Quieres vino?' es pregunta abierta, fácil decir que no",
              "'¿Prefieres este tinto o este blanco?' es de cierre, obliga a elegir",
              "Ambas funcionan igual",
              "No importa la pregunta, importa el tono"
            ],
            correct: 1
          },
          {
            question: "Un cliente dice 'Es muy caro', ¿cuál es tu respuesta profesional?",
            options: [
              "'Es el precio que está en la carta'",
              "'La calidad tiene precio'",
              "'Esta bodega es famosa por la consistencia, y este año la cosecha fue especial'",
              "'No es tan caro, mira, otros vinos valen más'"
            ],
            correct: 2
          },
          {
            question: "¿Cuándo es el mejor momento para ofrecer vino?",
            options: [
              "Cuando el cliente llega a la mesa",
              "Después del aperitivo, antes de pedir comida",
              "Después de que ha llegado la comida",
              "Al final de la comida con café"
            ],
            correct: 1
          }
        ]
      }
    ]
  },
  {
    id: "especialista",
    slug: "especialista",
    level: 3,
    title: "Especialista en Carta",
    subtitle: "Para jefe de sala / responsable de vino",
    description: "Domina la gestión estratégica de la carta: construcción, márgenes, rotación, compras y storytelling que vende.",
    icon: "👨‍💼",
    targetAudience: "Jefe de sala / responsable de vino",
    prerequisites: "Nivel 2 completado",
    estimatedHours: 4,
    certificate: "Certificado Especialista en Carta",
    seo: {
      title: "Especialista en Carta - Curso para Jefes de Sala",
      description: "Curso avanzado de gestión de cartas de vino. Aprende a construir cartas rentables, analizar márgenes, gestionar stock y crear estrategias de venta."
    },
    modules: [
      {
        id: "construir-carta",
        slug: "construir-carta",
        title: "Cómo construir una carta que venda",
        description: "Arquitectura, equilibrio, narrativa: cómo diseñar una carta de vinos coherente y rentable.",
        duration: "14 min",
        videoPlaceholder: "Análisis detallado de cómo construir una carta de vinos estratégica. Se cubren: número ideal de referencias (40-80 típicamente), equilibrio por estilos (¿cuántos blancos vs tintos?), equilibrio por precio (pirámide de precios), equilibrio por región (crear identidad), y cómo estructura la carta visualmente (por región, estilo o precio). Se muestran ejemplos reales de cartas bien hechas y mal hechas.",
        keyPoints: [
          "Cantidad ideal de referencias: 40-80 es típico (depende del tipo de negocio)",
          "Pirámide de precios: 50% referencias básicas, 30% mid-range, 20% premium",
          "Equilibrio de estilos: si vendes comida equilibrada, vino debe serlo también",
          "Identidad regional: si es bodega riojana, refuerza Rioja pero sin perder variedad",
          "Estructura visual: agrupa por contexto (para el cliente debe ser fácil buscar)"
        ],
        quiz: [
          {
            question: "¿Cuántas referencias de vino debería tener una carta típica?",
            options: [
              "10-20",
              "40-80",
              "150-200",
              "Más de 300"
            ],
            correct: 1
          },
          {
            question: "¿Cómo debería estar distribuido el presupuesto en referencias de vino?",
            options: [
              "Todos baratos",
              "Todos caros",
              "Pirámide: 50% básicos, 30% mid-range, 20% premium",
              "Partes iguales entre los 3 rangos"
            ],
            correct: 2
          },
          {
            question: "¿Cuál es la ventaja de organizar una carta por región en lugar de por precio?",
            options: [
              "Es más barata de imprimir",
              "Crea una narrativa y diferencia el restaurante",
              "Los vinos se venden más rápido",
              "No hay ventaja real"
            ],
            correct: 1
          }
        ]
      },
      {
        id: "analisis-margenes",
        slug: "analisis-margenes",
        title: "Análisis de márgenes: qué referencias empujar",
        description: "Cómo analizar rentabilidad real, identificar vinos que deben promoverse y cuáles están perdiendo dinero.",
        duration: "13 min",
        videoPlaceholder: "Análisis cuantitativo de márgenes de vino. Se cubren: cómo calcular margen real (incluyendo merma), cómo usar datos de venta para ver qué vinos son rentables de verdad, cómo identificar 'vinos asesinados' (buen margen pero sin ventas), cómo segmentar referencias por rentabilidad (zona roja, amarilla, verde), y cómo tomar decisiones: ¿empujar esta referencia?, ¿ajustar precio?, ¿cambiar proveedor?",
        keyPoints: [
          "Margen bruto ≠ Margen real (hay que restar merma, servicio, eventos)",
          "Referencia rentable = buen margen + buenas ventas (ambas)",
          "Matriz 2x2: Margen vs Volumen (4 cuadrantes de decisión)",
          "Identificar vinos 'muertos': buen margen pero 0 ventas = capital inmovilizado",
          "Benchmark: ¿cuál es el margen promedio?, ¿cuál es el mínimo aceptable?"
        ],
        quiz: [
          {
            question: "Un vino tiene margen bruto del 70% pero margen real solo del 45%, ¿por qué la diferencia?",
            options: [
              "Error de cálculo",
              "Merma, servicio complimentario, eventos sin charge",
              "El cliente siempre negocia el precio",
              "Es un vino muy raro"
            ],
            correct: 1
          },
          {
            question: "¿Cuál es la mejor decisión para un vino con buen margen pero sin ventas?",
            options: [
              "Mantenerlo para prestigio",
              "Subirle el precio aún más",
              "Retirarlo y usar ese espacio para otro vino que sí venda",
              "Bajarle el precio pero sin promocionarlo"
            ],
            correct: 2
          },
          {
            question: "En una matriz Margen vs Volumen, ¿cuál es el cuadrante más valioso?",
            options: [
              "Alto margen, bajo volumen",
              "Bajo margen, alto volumen",
              "Alto margen, alto volumen",
              "Bajo margen, bajo volumen"
            ],
            correct: 2
          }
        ]
      },
      {
        id: "vinos-muertos",
        slug: "vinos-muertos",
        title: "Identificar vinos muertos y rotar stock",
        description: "Cómo detectar referencias que no se venden y qué hacer: promoción, reposicionamiento o retiro.",
        duration: "11 min",
        videoPlaceholder: "Método práctico para identificar y gestionar vinos muertos en bodega. Se cubren: cuáles son los indicadores (no hay movimiento en 60, 90 o 120 días según el vino), cómo revisar bodega para encontrar vinos olvidados, cómo calcular el costo real de mantener un vino muerto (espacio, obsolescencia, capital inmovilizado), y estrategias para resolver: ¿promover?, ¿trasladar a vino por copa?, ¿donar?, ¿vender como stock a otros restaurantes?",
        keyPoints: [
          "Vino muerto: sin movimiento en 60-120 días (depende del tipo)",
          "Costo real: espacio, capital inmovilizado, riesgo de oxidación",
          "Cómo revisar: hacer inventario y cruzar con datos de ventas",
          "Estrategias: promoción, vino por copa, reposicionamiento, retiro",
          "Prevención: auditoría mensual de stock vs ventas"
        ],
        quiz: [
          {
            question: "¿Cuánto tiempo sin ventas considera un vino como 'muerto'?",
            options: [
              "30 días",
              "60 días",
              "90-120 días según tipo de vino",
              "Un año"
            ],
            correct: 2
          },
          {
            question: "¿Cuál es el costo real de mantener una botella muerta en bodega?",
            options: [
              "Solo el precio de compra",
              "El precio de compra + espacio + capital inmovilizado + riesgo de daño",
              "Nada, mientras esté en bodega no cuesta",
              "El precio de venta"
            ],
            correct: 1
          },
          {
            question: "¿Cuál es la mejor estrategia para revivir un vino muerto?",
            options: [
              "Subirle el precio",
              "Ponerlo en vino por copa y promocionarlo activamente",
              "Dejarlo hasta que se venda solo",
              "Tirarlo directamente"
            ],
            correct: 1
          }
        ]
      },
      {
        id: "compras-inteligentes",
        slug: "compras-inteligentes",
        title: "Gestión de compras inteligente",
        description: "Cómo usar datos de ventas y márgenes para decidir qué comprar y en qué cantidad.",
        duration: "12 min",
        videoPlaceholder: "Framework de compras inteligente para cartas de vino. Se cubren: cómo usar histórico de ventas para prever demanda, cómo calcular cantidad óptima a comprar (evitar excedentes o desabastecimiento), cómo negociar precios y condiciones con proveedores, cómo evaluar nuevos proveedores, y cómo usar datos de margen para decidir: ¿incremento volumen de este proveedor?, ¿cambio de referencia?, ¿negoció condiciones?",
        keyPoints: [
          "Datos para compra inteligente: rotación, histórico, margen, tendencias",
          "Cálculo de cantidad: rotación promedio × margen de seguridad (0.8-1.2x)",
          "Negociación con proveedor: datos de volumen, oportunidad, referencias obsoletas",
          "Nuevos proveedores: ¿mejor precio?, ¿mejor calidad?, ¿nuevas regiones?",
          "Auditoría mensual: ¿cómo estuvo el histórico vs predicción?, ¿qué ajustar?"
        ],
        quiz: [
          {
            question: "¿Cuál es la información más importante para decidir cuánto comprar de un vino?",
            options: [
              "El precio de compra",
              "El precio de venta",
              "Rotación histórica + margen + tendencia del cliente",
              "Lo que recomienda el proveedor"
            ],
            correct: 2
          },
          {
            question: "Un vino tiene rotación de 2 botellas por semana, ¿cuántas deberías comprar para 1 mes?",
            options: [
              "2 botellas",
              "4 botellas",
              "8-10 botellas (2×4 semanas + margen seguridad)",
              "20 botellas"
            ],
            correct: 2
          },
          {
            question: "¿Cuándo es el mejor momento para negociar condiciones con un proveedor?",
            options: [
              "Cuando acabas de comprar",
              "Cuando tienes datos de volumen anual y márgenes",
              "Nunca, los precios son fijos",
              "Solo al final del año"
            ],
            correct: 1
          }
        ]
      },
      {
        id: "regiones-avanzadas",
        slug: "regiones-avanzadas",
        title: "Regiones y variedades avanzadas",
        description: "Conocimiento profundo de regiones clave, sub-regiones y variedades menos conocidas para diferenciarse.",
        duration: "15 min",
        videoPlaceholder: "Exploración avanzada de regiones vinícolas del mundo. Se cubren: sub-regiones dentro de grandes denominaciones (Rioja Alavesa vs Rioja Alta), características terroir (altitud, exposición, clima), variedades locales poco conocidas que representan valor, tendencias emergentes en regiones. Se incluyen mapas, videos de viñedos y explicaciones de por qué un vino de una sub-región es diferente.",
        keyPoints: [
          "Sub-regiones españolas: Rioja (3 áreas), Priorat vs Montsant, Riojas aéreos",
          "Regiones internacionales clave: Borgoña, Champagne, Toscana, Napa, Barossa",
          "Variedades autóctonas: Malbec argentino, Tannat uruguayo, Tempranillo ibérico",
          "Terroir: cómo el suelo, altitud y clima crean diferencias en sabor",
          "Tendencias: vinos naturales, bio, de variedades olvidadas, emergentes regiones"
        ],
        quiz: [
          {
            question: "¿Cuál es la diferencia entre Rioja Alavesa y Rioja Alta?",
            options: [
              "El color del vino",
              "El terroir: Alavesa tiene suelo más calcáreo, vinos más frescos; Alta más Tempranillo estructurado",
              "El alcohol",
              "No hay diferencia, es marketing"
            ],
            correct: 1
          },
          {
            question: "¿Qué es 'terroir' en el contexto del vino?",
            options: [
              "El nombre de la bodega",
              "La suma de suelo, clima, altitud y factores naturales que influyen en el vino",
              "El tipo de botella",
              "La denominación de origen"
            ],
            correct: 1
          },
          {
            question: "¿Cuál es una variedad autóctona argentina conocida mundialmente?",
            options: [
              "Chardonnay",
              "Tempranillo",
              "Malbec",
              "Riesling"
            ],
            correct: 2
          }
        ]
      },
      {
        id: "storytelling-vino",
        slug: "storytelling-vino",
        title: "Storytelling del vino: vender historias",
        description: "Cómo convertir un vino en una historia que emociona y justifica el precio.",
        duration: "11 min",
        videoPlaceholder: "Técnica de storytelling para venta de vino premium. Se muestra cómo transformar datos técnicos (15% alcohol, 18 meses en barrica) en historias emocionales ('Este vino es la expresión de 100 años de tradición familiar'). Se cubren: la historia del terroir, la historia del winemaker, la historia de la bodega, historias culturales, y cómo usarlas en la mesa para justificar precio y crear conexión emocional.",
        keyPoints: [
          "Historia del lugar: viñas en ladera, microclima único, tradición",
          "Historia del winemaker: obsesión con calidad, técnicas ancestrales, innovación",
          "Historia de bodega: generaciones, premios, momentos históricos",
          "Historia cultural: región, festividades, identidad",
          "Cómo contar la historia en la mesa sin ser pedante"
        ],
        quiz: [
          {
            question: "¿Cuál es el propósito principal del storytelling en venta de vino?",
            options: [
              "Entretener al cliente",
              "Crear conexión emocional y justificar precio",
              "Sonar como experto",
              "Vender botellas adicionales"
            ],
            correct: 1
          },
          {
            question: "¿Cuál es un buen story para un vino premium?",
            options: [
              "'Es caro porque sí'",
              "'Mi bodega lleva 150 años haciendo vino en esta pendiente única, cada gota cuenta una historia de terroir'",
              "'Todos lo compran'",
              "'El sumiller lo recomienda'"
            ],
            correct: 1
          },
          {
            question: "¿Cuándo es el mejor momento para contar la historia de un vino?",
            options: [
              "Después de que el cliente lo ha bebido",
              "Mientras está leyendo la carta",
              "Al presentar el vino antes de servir",
              "Mientras negocia el precio"
            ],
            correct: 2
          }
        ]
      }
    ]
  },
  {
    id: "director",
    slug: "director",
    level: 4,
    title: "Director de Vinos",
    subtitle: "Para F&B manager / propietario / sumiller",
    description: "Domina la estrategia: gobernanza multi-local, KPIs, tendencias de mercado y cómo usar Winerim como centro de operaciones.",
    icon: "👑",
    targetAudience: "F&B manager / propietario / sumiller",
    prerequisites: "Nivel 3 completado",
    estimatedHours: 5,
    certificate: "Certificado Director de Vinos",
    seo: {
      title: "Director de Vinos - Curso para F&B Managers",
      description: "Curso de dirección estratégica de cartas de vino. Aprende a gobernar cartas en grupos, KPIs, tendencias de mercado y estrategia empresarial del vino."
    },
    modules: [
      {
        id: "estrategia-carta",
        slug: "estrategia-carta",
        title: "Estrategia de carta por tipo de negocio",
        description: "Cómo diseñar una estrategia de vino diferente para cada modelo: gastronomía, wine bar, casual, grupos.",
        duration: "13 min",
        videoPlaceholder: "Análisis estratégico de cartas para diferentes modelos de negocio. Se cubren: restaurante gastronómico (menos referencias, mayor calidad, enfoque región), wine bar (muchas referencias, educativo, énfasis en vino por copa), restaurante casual (referencias conocidas, buen servicio al coste, accesibilidad), hotel (volumen, variedad, confianza), grupo multi-local (estandarización vs identidad). Para cada modelo se muestran ejemplos reales y el porqué de cada decisión.",
        keyPoints: [
          "Gastronomía: 60-80 referencias, premium, enfoque región, sommelier dedicado",
          "Wine bar: 100-150 referencias, énfasis en vino por copa, educación, ambiente",
          "Casual: 30-40 referencias, marcas conocidas, buena relación precio-calidad, fácil de vender",
          "Hotel: 80-120 referencias, variedad de regiones, fiabilidad, volumen",
          "Grupo: política centralizada + flexibilidad local, estándares, auditoría regular"
        ],
        quiz: [
          {
            question: "¿Cuál debería ser la estrategia de carta para un restaurante casual?",
            options: [
              "Muchas referencias raras para educar",
              "30-40 referencias conocidas, buen servicio, accesibilidad",
              "Solo vinos caros de prestigio",
              "Sin carta, vino del grifo"
            ],
            correct: 1
          },
          {
            question: "¿Cuál es la característica principal de una estrategia de wine bar?",
            options: [
              "Pocas referencias caras",
              "Muchas referencias y enfoque en vino por copa",
              "Solo vinos españoles",
              "Sin comida, solo vino"
            ],
            correct: 1
          },
          {
            question: "En un grupo de restaurantes, ¿cuál debería ser el balance entre estandarización y flexibilidad?",
            options: [
              "100% estandarizado",
              "100% flexible, cada local elige",
              "Política centralizada + flexibilidad local según contexto",
              "Depende del color del local"
            ],
            correct: 2
          }
        ]
      },
      {
        id: "kpis-vino",
        slug: "kpis-vino",
        title: "KPIs del vino: qué medir y cómo actuar",
        description: "Los indicadores clave que debes monitorear y cómo usarlos para tomar decisiones.",
        duration: "14 min",
        videoPlaceholder: "Dashboard de KPIs para gestión de vino. Se cubren: ventas por referencia, margen bruto y neto, rotación, ticket promedio de vino, porcentaje de vino en venta total, concentración (pareto: ¿20% de referencias generan 80% de ventas?), análisis por cliente, por hora, por día de semana, y cómo leer un dashboard: qué significa cada métrica, cuándo algo está mal, y qué acciones tomar.",
        keyPoints: [
          "KPI 1: Margen real promedio (debería ser 60%+)",
          "KPI 2: Rotación (cuántas veces gira el stock anual)",
          "KPI 3: Vino como % de venta total (15-25% es típico)",
          "KPI 4: Ticket promedio de vino por cliente",
          "KPI 5: Concentración (regla 80/20: quiénes son los vinos 'motores')",
          "KPI 6: Cobertura (¿qué % de referencias vende más del 10% de lo esperado?)",
          "KPI 7: Obsolescencia (vinos muertos como % de stock)"
        ],
        quiz: [
          {
            question: "¿Cuál debería ser el margen real típico de una carta de vino?",
            options: [
              "30-40%",
              "50-60%",
              "60%+ (después de merma y eventos)",
              "80%+"
            ],
            correct: 2
          },
          {
            question: "Si el 20% de tus referencias genera el 80% de ventas, ¿qué significa?",
            options: [
              "Tienes demasiadas referencias",
              "Es normal, es la regla 80/20",
              "Debería ser distribuido equitativamente",
              "Significa que los clientes no explorar"
            ],
            correct: 1
          },
          {
            question: "¿Cuál es un objetivo realista para 'vino como % de venta total'?",
            options: [
              "5-10%",
              "15-25%",
              "30-40%",
              "50%+"
            ],
            correct: 1
          }
        ]
      },
      {
        id: "gobernanza-grupos",
        slug: "gobernanza-grupos",
        title: "Gobernanza de carta en grupos de restauración",
        description: "Cómo gestionar cartas de vino en múltiples locales sin perder control ni identidad.",
        duration: "13 min",
        videoPlaceholder: "Framework de gobernanza para grupos de restaurantes. Se cubren: cómo establecer estándares centrales sin matar la creatividad local, auditoría regular, gestión de proveedores a escala (conseguir mejores precios), cómo detectar desviaciones (local A vende 10x más que local B del mismo vino = algo anda mal), cómo comunicar cambios, y cómo manejar resistencia del equipo local.",
        keyPoints: [
          "Estructura: core lista centralizada + optional local (80/20 o 70/30)",
          "Gobernanza: quién decide qué, criterios claros, comités de revisión",
          "Auditoría: mensual datos de venta por local, detección de anomalías",
          "Compras: negociar volumen para conseguir mejores precios, mientras permitir local customización",
          "Comunicación: cambios de carta se comunican con 2 semanas adelanto, training"
        ],
        quiz: [
          {
            question: "¿Cuál debería ser el balance entre carta centralizada y local en un grupo?",
            options: [
              "100% centralizado, sin flexibilidad",
              "100% local, sin estándares",
              "80-70% centralizado + 20-30% local flex",
              "No hay fórmula, depende del grupo"
            ],
            correct: 2
          },
          {
            question: "¿Cuál es la red flag cuando auditas datos de vino en múltiples locales?",
            options: [
              "Todos venden exactamente lo mismo",
              "Un local vende 10x más que otro de la misma referencia sin explicación",
              "Distintos márgenes por local",
              "Diferentes proveedores"
            ],
            correct: 1
          },
          {
            question: "¿Cuál es la ventaja de negociar compras a escala de grupo?",
            options: [
              "Obligar a todos los locales a tener la misma carta",
              "Conseguir mejores precios y condiciones de volumen",
              "Reducir variedad",
              "Complicar la gestión"
            ],
            correct: 1
          }
        ]
      },
      {
        id: "tendencias-mercado",
        slug: "tendencias-mercado",
        title: "Tendencias del mercado del vino",
        description: "Qué está pasando en el mundo del vino: consumidor emergente, vinos naturales, regiones nuevas, sostenibilidad.",
        duration: "14 min",
        videoPlaceholder: "Análisis de tendencias globales del mercado de vino. Se cubren: cambio demográfico (generación joven buscando vinos accesibles), vinos naturales y biodinámicos (crecimiento, percepción), regiones emergentes (Georgia, Portugal, Nueva Zelanda), sostenibilidad (huella de carbono, packaging), vinos sin alcohol o bajos en alcohol, y cómo posicionar tu restaurante en estas tendencias sin ser 'trendy'.",
        keyPoints: [
          "Tendencia 1: Consumidor joven busca accesibilidad + educación + autenticidad",
          "Tendencia 2: Vinos naturales y 'orange wine' crecen pero siguen siendo nicho",
          "Tendencia 3: Regiones emergentes desafiando Burdeos y Napa",
          "Tendencia 4: Sostenibilidad importa (packaging, huella de carbono, certificaciones)",
          "Tendencia 5: Opciones sin alcohol / bajo alcohol en crecimiento",
          "Estrategia: no perseguir todas las tendencias, pero sí estar atento a cuál funciona en tu mercado"
        ],
        quiz: [
          {
            question: "¿Cuál es la característica principal del consumidor joven de vino?",
            options: [
              "Busca vinos caros de prestigio",
              "No le importa el vino",
              "Busca accesibilidad + educación + autenticidad",
              "Solo quiere vinos naturales"
            ],
            correct: 2
          },
          {
            question: "¿Cuál es una región emergente importante en el mercado del vino?",
            options: [
              "Francia (es tradicional, no emergente)",
              "Georgia (vinos ancestrales con nueva energía)",
              "Italia (tradicional)",
              "España (tradicional)"
            ],
            correct: 1
          },
          {
            question: "¿Cuál es la mejor estrategia frente a nuevas tendencias?",
            options: [
              "Ignorarlas completamente",
              "Perseguir todas sin discriminar",
              "Estar atento, pero adoptar solo las que funcionen en tu mercado",
              "Esperar 5 años para estar seguro"
            ],
            correct: 2
          }
        ]
      },
      {
        id: "winerim-operaciones",
        slug: "winerim-operaciones",
        title: "Cómo usar Winerim como centro de operaciones",
        description: "Maximizar la plataforma: datos, inteligencia, automatización y toma de decisiones.",
        duration: "12 min",
        videoPlaceholder: "Guía estratégica de Winerim como herramienta de dirección. Se cubren: cómo leer dashboards de venta y rentabilidad, cómo usar datos para detectar oportunidades (referencias que deben crecer, que deben retirarse), cómo automatizar decisiones (alertas de stock, renovación de carta), cómo comunicarse con el equipo usando Winerim (cambios de precio, nuevas referencias, auditoría), y cómo escalar la operación con datos.",
        keyPoints: [
          "Dashboard principal: margen, rotación, concentración, tendencias",
          "Alertas: stock bajo, margen en riesgo, referencias muertas, precios desalineados",
          "Reportes: diarios para decisión rápida, mensuales para estrategia",
          "Integración: punto de venta, bodega, compras (si disponible)",
          "Decisión data-driven: nunca intuición sola, siempre datos + experiencia"
        ],
        quiz: [
          {
            question: "¿Cuál es el principal value de usar una plataforma como Winerim?",
            options: [
              "Tener un software bonito",
              "Vender más automáticamente",
              "Usar datos en tiempo real para tomar decisiones mejores",
              "Reducir el personal"
            ],
            correct: 2
          },
          {
            question: "¿Cuál es la frecuencia ideal de revisión de datos de vino?",
            options: [
              "Una vez al año",
              "Una vez al trimestre",
              "Diarios para alertas, mensuales para estrategia",
              "Nunca, los datos no importan"
            ],
            correct: 2
          },
          {
            question: "¿Cómo deberías tomar una decisión sobre una nueva referencia?",
            options: [
              "Solo intuición del sumiller",
              "Solo por precio",
              "Datos + experiencia + intuición combinados",
              "Lo que otros restaurantes tienen"
            ],
            correct: 2
          }
        ]
      },
      {
        id: "certificacion-final",
        slug: "certificacion-final",
        title: "Evaluación y certificación final",
        description: "Prueba integral de todos los conceptos aprendidos en los 4 niveles.",
        duration: "20 min",
        videoPlaceholder: "Examen final interactivo que cubre conceptos de todos los niveles: desde fundamentos (tipos de vino, servicio) hasta estrategia (KPIs, gobernanza). El examen incluye preguntas teóricas y prácticas (casos de estudio, simulaciones de decisiones), feedback inmediato y diagnóstico de áreas donde puedas mejorar.",
        keyPoints: [
          "Evaluación integral: 40 preguntas mix de conceptos",
          "Casos de estudio: situaciones reales de restaurantes",
          "Tiempo límite: 60 minutos",
          "Mínimo 80% para certificación",
          "Feedback detallado por tema si no pasas"
        ],
        quiz: [
          {
            question: "Un restaurante tiene 150 referencias de vino pero el 80% de las ventas vienen del 20% de referencias. ¿Cuál debería ser la acción?",
            options: [
              "Agregar más referencias",
              "Analizar por qué los otros vinos no se venden y retirar los que no funcionen",
              "Bajar precio en todo",
              "Aumentar volumen de las referencias que venden"
            ],
            correct: 1
          },
          {
            question: "¿Cuál es la fórmula correcta para calcular margen real en vino por copa?",
            options: [
              "PVP - Coste = Margen",
              "(PVP - Coste - Merma estimada - Servicio) / PVP = Margen real %",
              "No existe fórmula, es solo intuición",
              "Margen = Veces multiplicador (x3, x4)"
            ],
            correct: 1
          },
          {
            question: "En una gobernanza de grupo de 10 restaurantes, ¿cuál es el KPI más importante a auditar mensuales?",
            options: [
              "Que todos tengan la misma carta",
              "Desviaciones anormales entre locales (margen, rotación, referencias que funcionan diferente)",
              "Que todos vendan lo mismo",
              "Que no cambien la carta"
            ],
            correct: 1
          }
        ]
      }
    ]
  }
];

export default coursesLibrary;
