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
          "Proceso de fermentación básico: las levaduras convierten azúcar en alcohol",
          "Diferencias en alcohol, acidez y cuerpo entre tipos",
          "El vino tinto: pieles de uva durante toda la fermentación, más taninos",
          "El vino blanco: sin contacto con pieles, más fresco y ácido",
          "El vino rosado: contacto breve con pieles, color entre blanco y tinto",
          "El vino espumoso: CO2 disuelto = burbujas, puede ser seco o dulce",
          "Alcohol: rango típico 11-15% en vinos tranquilos, menos en espumosos",
          "Taninos: proteínas en pieles que dan sensación astringente en boca"
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
              "11-15%",
              "18-20%",
              "22-25%"
            ],
            correct: 1
          },
          {
            question: "¿Qué son los taninos en el vino?",
            options: [
              "Levaduras que fermentan",
              "Proteínas en las pieles que dan sensación astringente",
              "Azúcares del mosto",
              "Tipos de barriles"
            ],
            correct: 1
          },
          {
            question: "¿Cuánto tiempo contactan las pieles con el mosto en un vino rosado?",
            options: [
              "Menos de 1 hora",
              "Unas pocas horas a 1-2 días",
              "Una semana",
              "Durante toda la fermentación"
            ],
            correct: 1
          }
        ],
        content: "El vino es una bebida obtenida de la fermentación de las uvas. La magia del vino ocurre cuando las levaduras naturales de la uva (o añadidas) convierten el azúcar en alcohol. Pero lo que diferencia cada tipo de vino es el tiempo que las pieles de la uva permanecen en contacto con el mosto (zumo de uva). En los vinos tintos, las pieles fermentan durante todo el proceso, lo que aporta color profundo, taninos y más cuerpo. Los vinos blancos casi nunca tocan las pieles, resultando en bebidas más ligeras, ácidas y refrescantes. Los rosados están en el medio: poco tiempo de contacto con pieles, un par de horas o días, que da ese color característico. Los espumosos tienen burbujas porque contienen CO2 disuelto, y pueden hacerse con uvas blancas o tintas. El alcohol típico en un vino tranquilo oscila entre 11 y 15%, aunque algunos pueden llegar a 16-17% dependiendo de qué tan maduras estaban las uvas. Los taninos, que sentirás como una sequedad en la boca, son elementos naturales en las pieles que acompañan a los vinos tintos. Para recordar: tipo de vino = cuánto tiempo toca la piel.",
        practicalExercise: "Prueba a observar un vino tinto, blanco y rosado lado a lado. Fíjate en los colores: el tinto debe ser oscuro (casi opaco), el blanco pálido dorado, y el rosado entre ambos. Ahora prueba si puedes identificar la sensación de taninos en el tinto (sequedad en goma de dientes) comparado con la frescura ácida del blanco."
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
          "Tipos de copas y por qué cada tipo tiene su copa: copa de tinto (grande), de blanco (mediana), de espumoso (flauta)",
          "Técnica correcta del sacacorchos: insertar perpendicular, girar sin prisa, sacar con aplomo",
          "Cómo presentar el vino al cliente: mostrar etiqueta, verificar bodega y añada",
          "Ángulo de vertido correcto para evitar derrames: 45 grados, hasta un tercio de la copa",
          "Por qué la temperatura importa: demasiado fría apaga sabores, demasiado caliente acelera oxidación",
          "Cómo elegir copa según el vino: cuerpo del vino = tamaño de copa",
          "Limpiar el cuello después de descorchar: con servilleta limpia, sin manchas visibles",
          "Servir al cliente primero para que apruebe, luego al resto de la mesa de lado a lado",
          "Mantener la botella visible en la mesa o en hielo si es blanco"
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
              "Limpiar el cuello de la botella con servilleta",
              "Servir un poco al cliente para que pruebe"
            ],
            correct: 2
          },
          {
            question: "¿Cuánto debe ocupar el vino en una copa?",
            options: [
              "Hasta el borde",
              "Dos tercios",
              "Un tercio",
              "Lleno pero sin tocar el borde"
            ],
            correct: 2
          },
          {
            question: "¿Qué tipo de copa usas para un vino espumoso?",
            options: [
              "Copa ancha de tinto",
              "Copa mediana de blanco",
              "Flauta alta y estrecha",
              "Cualquier copa sirve"
            ],
            correct: 2
          },
          {
            question: "¿Por qué es importante servir la botella a temperatura correcta?",
            options: [
              "Solo por estética",
              "La temperatura correcta permite apreciar el sabor, demasiado fría lo apaga",
              "Para impresionar al cliente",
              "No tiene realmente importancia"
            ],
            correct: 1
          }
        ],
        content: "Servir vino correctamente es un arte que combina temperatura, copas adecuadas y técnica. La temperatura es crítica: un vino tinto demasiado frío perderá sus aromas y sabores, mientras que uno demasiado caliente se oxida rápidamente. Los tintos robustos como Tempranillo o Cabernet Sauvignon necesitan 16-18°C, los blancos frescos 8-10°C, y los espumosos aún más fríos, 6-8°C. La copa correcta permite que el vino respire y que los aromas lleguen a tu nariz. Una copa grande de tinto deja espacio, la de blanco es más pequeña para mantener la temperatura, y la flauta para espumosos preserva las burbujas. El descorche debe hacerse sin prisa: introduce el sacacorchos perpendicularmente, gira sin cambiar el ángulo, y extrae con un movimiento suave. Después, limpia el cuello de la botella con una servilleta limpia para evitar que el cliente vea polvo o restos. Presenta la botella al cliente mostrando la etiqueta, deja que vea la bodega y añada, y finalmente sirve: un poco primero al cliente para que apruebe, luego al resto de comensales de lado a lado en movimiento circular. Llena cada copa hasta un tercio para permitir que el cliente appurtunidad de rotar y airear el vino en la copa, liberando aromas.",
        practicalExercise: "Practica el descorche con botellas vacías: aprende a insertar el sacacorchos recto, girar con control, y extraer sin esfuerzo. Luego, en servicio, observa cómo la temperatura del vino cambia su aroma y sabor entre inicio de comida y mitad."
      },
      {
        id: "diez-uvas-esenciales",
        slug: "diez-uvas-esenciales",
        title: "Las 10 uvas que todo camarero debe conocer",
        description: "Las variedades de uva más comunes en el mundo, sus características, sabores y regiones donde se cultivan.",
        duration: "12 min",
        videoPlaceholder: "Introducción visual a las 10 variedades de uva más importantes: Tempranillo, Cabernet Sauvignon, Merlot, Chardonnay, Sauvignon Blanc, Riesling, Albariño, Pinot Noir, Garnacha y Syrah. Para cada uva se muestran sus características, perfiles de sabor, regiones de cultivo y ejemplos de vinos famosos.",
        keyPoints: [
          "Tempranillo: tinto corpulento con taninos, típico de La Rioja y Ribera del Duero",
          "Cabernet Sauvignon: potente, estructurado, sabores cassis y cedro, originario de Burdeos",
          "Merlot: suave, frutal, cereza y chocolate, versátil y accesible para principiantes",
          "Chardonnay: blanco versátil y elegante, sabores manzana verde y mantequilla, Borgoña",
          "Sauvignon Blanc: aromático, fresco, notas hierba y cítricos, orgánico y mineral",
          "Riesling: aromático alemán, puede ser desde muy seco a muy dulce, frutal y floral",
          "Albariño: blanco gallego, mineral, salino, con carácter atlántico y salinidad",
          "Pinot Noir: delicado, elegante, frambuesa y especias, difícil pero emocionante",
          "Garnacha: jugosa, afrutada, pimienta y especias, vinos auténticos y amigables",
          "Syrah: potente, pimienta negra, flores y especias, común en Rhône y Australia"
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
          },
          {
            question: "¿Cuál es la característica principal del Pinot Noir?",
            options: [
              "Muy potente y tánico",
              "Dulce y afrutado",
              "Delicado, elegante, con sabores frambuesa",
              "Duro de beber para principiantes"
            ],
            correct: 2
          },
          {
            question: "¿De dónde es originaria la uva Chardonnay?",
            options: [
              "Italia",
              "Alemania",
              "Borgoña, Francia",
              "California"
            ],
            correct: 2
          }
        ],
        content: "Estas diez uvas son la base del conocimiento que necesitas. Los tintos: Tempranillo es la gloria de España, taninos rústicos pero profundos, perfecta para carnes. Cabernet Sauvignon es el Rey del Burdeos, potente, con notas de cassis (grosellas negras) y cedro, requiere tiempo para abrir. Merlot es su hermana más suave, accesible, con cereza y chocolate, perfecta para clientes que temen los taninos. Pinot Noir es el cisne negro: delicado, elegante, caro, pero adictivo. Garnacha es jugosa, amigable, perfecta para ese cliente que dice 'algo sencillo pero bueno'. Syrah es pimienta negra líquida. Los blancos: Chardonnay es versátil como un camaleón, desde seco a cremoso, manzana verde o mantequilla según envejecimiento. Sauvignon Blanc es hierba mojada y cítricos, fresco como el mar. Riesling es el campeón alemán, puede ser seco o dulce, casi siempre con gas residual. Albariño es los sabores atlánticos: salado, mineral, mariscos. Con estas diez, puedes entender la mayoría de la carta de cualquier restaurante.",
        practicalExercise: "Cata cada una de estas diez uvas en una misma tarde si es posible. Anota tus primeras impresiones: qué ves, qué hueles, qué sientes en boca. No importa si no identificas los sabores técnicos; tu paladar se entrenará. Prueba también cómo cambian los sabores con temperatura."
      },
      {
        id: "leer-carta-vinos",
        slug: "leer-carta-vinos",
        title: "Cómo leer una carta de vinos sin perderse",
        description: "Entender qué significa cada cosa en una carta: región, añada, precio, clasificación y cómo buscar lo que el cliente necesita.",
        duration: "9 min",
        videoPlaceholder: "Guía práctica de lectura de cartas de vinos. Se muestran varios ejemplos reales de cartas: cómo están organizadas (por regiones, estilos, precios), qué información contiene cada entrada (bodega, región, añada, denominación, notas de cata), cómo encontrar rápidamente lo que necesitas y cómo identificar vinos de calidad.",
        keyPoints: [
          "Estructura típica de una carta: por región, por estilo o por precio según criterio del restaurante",
          "Información clave en cada entrada: bodega, región, añada, denominación, puntuación si la hay",
          "Cómo buscar un vino por características específicas: seco/dulce, ligero/potente, color",
          "Abreviaturas comunes: D.O. (Denominación de Origen), D.O.P. (Denominación de Origen Protegida), vino de mesa",
          "Clasificación por edad: joven (sin envejecimiento), crianza (2 años mínimo), reserva (3 años), gran reserva (5+ años)",
          "Cómo identificar la bodega y si es conocida o pequeña productora",
          "Entender la añada (año de cosecha) y cómo afecta a precio y sabor",
          "Buscar referencias que puedas reconocer de tus catas"
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
          },
          {
            question: "¿Cuál es la diferencia entre Crianza y Reserva?",
            options: [
              "No hay diferencia",
              "Crianza 2 años, Reserva 3 años mínimo de envejecimiento",
              "Reserva es más barato",
              "Crianza es solo para blancos"
            ],
            correct: 1
          },
          {
            question: "Si ves 'Tinto Joven 2023' en la carta, ¿qué significa?",
            options: [
              "Es muy caro",
              "Sin envejecimiento en barrica, vino fresco, cosecha reciente",
              "Es un vino de mala calidad",
              "Está hecho de uvas jóvenes"
            ],
            correct: 1
          }
        ],
        content: "Una carta de vinos puede parecer una montaña de información, pero tiene una estructura lógica. La mayoría de cartas se organizan por regiones geográficas: primero los Riojas, luego Ribera del Duero, etc., o alternadamente blancos y tintos. Esto ayuda a crear una narrativa. Cada entrada tiene información crucial: bodega (marca), región, año de cosecha (añada), y a veces denominación y notas. La añada es el año que se cosecharon las uvas, no cuándo se embotelló. Las abreviaturas son tu mejor amiga: D.O. significa que tiene protección legal por región, D.O.P. es lo mismo pero europeo. La clasificación por edad es estándar en España: joven significa sin barrica (fresco), crianza es mínimo 2 años en barrica, reserva 3 años (al menos un año en barrica), y gran reserva 5+ años. Un vino viejo no siempre es mejor; algunos jóvenes son extraordinarios y más económicos. Busca referencias que reconozcas de tus catas, bodegas que tengan buena reputación. Observa patrones: una buena carta tiene diversidad de precios y estilos.",
        practicalExercise: "Elige una carta de tu restaurante (o una online). Léela de principio a fin sin buscar nada. Luego, practica encontrar: un blanco ligero barato, un tinto potente premium, y un rosado de precio medio. Temporizador: 5 minutos. Cuando lo domines, puedes hacerlo mentalmente en segundos."
      },
      {
        id: "primera-recomendacion",
        slug: "primera-recomendacion",
        title: "Cómo responder 'Recomiéndame algo' sin bloquear",
        description: "Técnicas para hacer buenas recomendaciones cuando el cliente no sabe qué pedir.",
        duration: "10 min",
        videoPlaceholder: "Estrategias prácticas para responder recomendaciones. Se demuestran diálogos reales con clientes indecisiones: cómo hacer preguntas de apertura (¿qué te apetece?, ¿tinto o blanco?), cómo filtrar opciones, cómo ofrecer 2-3 alternativas con argumentos claros, y cómo cerrar la venta con confianza.",
        keyPoints: [
          "Las 3 preguntas clave: color preferido (tinto/blanco), estructura deseada (ligero/potente), presupuesto aproximado",
          "Cómo filtrar la carta rápidamente en tu cabeza durante la conversación",
          "Técnica de ofrecer 2-3 opciones máximo, nunca más (confunde al cliente)",
          "Cómo justificar cada recomendación con 1-2 palabras de sabor clave",
          "Lenguaje positivo: 'Te va a encantar porque es fresco y mineral' vs 'Es que podría funcionar'",
          "Considerar la comida que pidieron: no recomendar vino sin saber el plato",
          "Leer el contexto: ¿es celebración?, ¿clientela habitual?, ¿pareja o grupo?",
          "Mostrar confianza en tu recomendación; la duda se contagia"
        ],
        quiz: [
          {
            question: "Ante un cliente que dice 'no sé de vinos, tú recomienda', ¿cuál es tu primer paso?",
            options: [
              "Recomendar el vino más caro",
              "Hacer preguntas para entender sus preferencias y comida",
              "Recomendar el más vendido",
              "Dar a probar varios vinos"
            ],
            correct: 1
          },
          {
            question: "¿Cuántas opciones de vino deberías ofrecer al cliente indeciso?",
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
          },
          {
            question: "¿Cuál es el error más común al recomendar vino?",
            options: [
              "Recomendar algo muy caro",
              "Ofrecer demasiadas opciones y confundir al cliente",
              "No preguntarle qué va a comer",
              "Usar palabras técnicas"
            ],
            correct: 2
          },
          {
            question: "Un cliente pide 'algo ligero que no sea caro'. ¿Cuál es la mejor recomendación?",
            options: [
              "Un Tempranillo joven potente",
              "Un blanco fresco de Albariño o Sauvignon Blanc",
              "Un vino muy oscuro y tánico",
              "Solo agua"
            ],
            correct: 1
          }
        ],
        content: "Cuando alguien dice 'recomiéndame algo', tienes una oportunidad de oro de generar satisfacción. La magia está en las preguntas, no en hablar. Primero: ¿tinto o blanco? Esto divide la carta por la mitad. Segundo: ¿ligero o potente? Un cliente que pide 'ligero' puede ser porque come algo delicado o porque no quiere emborracharse; tú necesitas saber. Tercero: presupuesto aproximado ('¿entre 20 y 40 euros?'). Con esta información, ya tienes un pequeño grupo de opciones. Ahora elige 2-3, máximo 3, porque más confunde. Para cada una, da un argumento corto y positivo: 'Este es fresco y mineral, perfecto con lo que pediste' en lugar de 'Este podría servir'. Muestra confianza: tu seguridad vende vino. Si no conoces el vino que vas a recomendar, no lo recomiendes. Mejor decir 'Te recomiendo este otro que conozco bien' que fingir y quedar en ridículo. Considera también el contexto: si es una celebración, quizá algo un poco más premium. Si es una comida de negocios, algo refinado pero no intimidante.",
        practicalExercise: "Practica la secuencia de preguntas con un compañero. Cliente dice 'no sé, tú elige'. Tú respondes: '¿Tinto o blanco?' → '¿Ligero o potente?' → '¿Alrededor de cuánto en euros?' Luego recomienda 2-3 opciones específicas con argumentos. Repite hasta que salga natural."
      },
      {
        id: "errores-comunes",
        slug: "errores-comunes",
        title: "Los 5 errores más frecuentes al servir vino",
        description: "Los errores que cometen los camareros principiantes y cómo evitarlos.",
        duration: "7 min",
        videoPlaceholder: "Análisis detallado de los 5 errores más comunes al servir vino: servir a temperatura incorrecta, usar copas inapropiadas, derramar al servir, no limpiar el cuello de la botella, y hacer recomendaciones sin escuchar al cliente. Para cada error se muestra qué sucede, por qué ocurre y cómo prevenirlo.",
        keyPoints: [
          "Error 1: Servir a temperatura incorrecta (apaga aromas y sabores, o acelera oxidación)",
          "Error 2: Usar la copa equivocada (impide apreciar el vino, falta de profesionalismo)",
          "Error 3: Derrames al servir (mancha la ropa del cliente, parece falta de experiencia)",
          "Error 4: No limpiar el cuello (primera impresión negativa, aspecto descuidado)",
          "Error 5: Recomendar sin escuchar (cliente se siente ignorado, riesgo de mal maridaje)",
          "Error 6: Hablar demasiado sobre el vino (aburrimiento, jerga técnica innecesaria)",
          "Error 7: No revisar que la botella no esté corchada (cliente recibe un vino arruinado)",
          "Error 8: Servir botella antes de confirmar con el cliente (puede ser la equivocada)"
        ],
        quiz: [
          {
            question: "¿Cuál es la consecuencia de servir un vino blanco a temperatura ambiente?",
            options: [
              "Se enfría más rápido",
              "Pierde acidez, frescura y se siente plano",
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
              "Para dar una impresión de profesionalismo y limpieza",
              "Para evitar que el vino se oxide"
            ],
            correct: 2
          },
          {
            question: "¿Cómo evitar derrames al servir vino?",
            options: [
              "Vertiendo muy rápido",
              "Con ángulo correcto (45°) y sin prisa, giro en la muñeca",
              "Vertiendo muy lentamente",
              "Usando una servilleta en la mano"
            ],
            correct: 1
          },
          {
            question: "¿Qué es estar 'corchado' en un vino?",
            options: [
              "Estar muy viejo",
              "Estar contaminado por hongos en el corcho, sabor a sótano",
              "Tener demasiados taninos",
              "Estar demasiado frío"
            ],
            correct: 1
          },
          {
            question: "Antes de servir vino, ¿qué deberías hacer?",
            options: [
              "Verificar que el cliente pidió exactamente esta botella (bodega y año)",
              "Servir sin comprobar nada",
              "Solo mostrar la etiqueta",
              "Preguntar si tiene alergias"
            ],
            correct: 0
          }
        ],
        content: "Los errores más comunes vienen de no prestar atención. El primero es la temperatura: un Albariño a 18°C pierde toda su frescura y se convierte en goma; un Tempranillo a 12°C cierra sus aromas. Los vinos fríos necesitan enfriador o hielo; los fríos, sacalos 5 minutos antes de servir. Segundo, las copas: usar una copa de tinto para blanco es falta de respeto al vino y al cliente. Tercero, los derrames: ocurren por prisa o mal ángulo. La botella debe estar a 45 grados, vertiendo sin aspa, con giro suave en la muñeca para cortar el flujo. Cuarto, el cuello sucio: después de descorchar, limpia con servilleta. Quinto, no escuchar: si el cliente dice 'algo fresco' y recomendas un tinto potente, lo arruinaste. Sexto, hablar demasiado: el cliente no necesita saber todo sobre el terroir, solo que va a disfrutar. Séptimo, no revisar corchadura: huele el corcho o el vino al descorchar, y si huele a sótano húmedo o moho, devuelve la botella. Octavo, servir sin confirmar: pregunta '¿Es este el vino que pidieron?' antes de descorchar.",
        practicalExercise: "Practica el descorche y el servicio en un espejo para ver tu técnica de ángulo. Luego, pide a un compañero que juegue de cliente: haz todas las cosas bien una vez, y luego comete deliberadamente cada uno de los 5 errores. Reflexiona sobre cómo se siente como cliente."
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
          "Técnica del vino por copa: riesgo financiero bajo, cliente prueba antes de comprometerse a botella",
          "Estrategia de conversión: copa que le encanta → 'Pido una botella entera para que disfrutes'",
          "Cómo sugerir segunda botella sin parecer ávaro: 'Va perfecto con los siguientes platos'",
          "Premiumización: ascender de un tinto 20€ a uno 35€ con argumento de maridaje",
          "Leer el contexto: celebración, cliente habitual, tipo de comida elegida indica capacidad de gasto",
          "Lenguaje de cierre: crear escasez ética ('Solo 3 botellas de este en bodega', si es verdad)",
          "Timing: ofrecer vino por copa al inicio, segunda botella a mitad de comida",
          "Identificar al tomador de decisión: en grupo, quién paga o lidera la decisión"
        ],
        quiz: [
          {
            question: "¿Cuál es la ventaja principal de ofrecer vino por copa antes de botella?",
            options: [
              "Es más fácil de servir",
              "El cliente puede probar sin riesgo financiero y después subir a botella",
              "Cuesta menos al restaurante",
              "Ocupa menos espacio en bodega"
            ],
            correct: 1
          },
          {
            question: "¿Cuándo es el momento óptimo para sugerir una segunda botella?",
            options: [
              "Al final de la comida cuando llega postre",
              "Cuando el cliente pide la carta de vinos",
              "Cuando ha terminado más de la mitad de la primera y faltan platos por venir",
              "Solo si lo pide el cliente"
            ],
            correct: 2
          },
          {
            question: "¿Cuál es el mejor argumento para una premiumización?",
            options: [
              "'Este es más caro, pero mejor'",
              "'Todos compran este, es el más vendido'",
              "'Este maridaje especial con los siguientes platos va a ser excepcional'",
              "'Es una inversión que vale la pena'"
            ],
            correct: 2
          },
          {
            question: "Un cliente probó un vino por copa y le encantó. ¿Cuál es tu siguiente paso?",
            options: [
              "Dejar que pida él solo",
              "'¿Te traigo una botella entera para que disfrutes más?'",
              "Ofrecerle otro vino diferente",
              "Esperar a que lo pida explícitamente"
            ],
            correct: 1
          },
          {
            question: "¿Cómo identificas si un cliente tiene capacidad de gasto alto en vino?",
            options: [
              "Por la ropa que lleva",
              "Por el tipo de comida que elige, si pide aperitivo, el tono al hablar de vino",
              "Nunca se puede saber",
              "Solo si lo dice explícitamente"
            ],
            correct: 1
          }
        ],
        content: "Aumentar el ticket de vino sin presionar es un arte de lectura del cliente combinado con técnica. La copa es tu aliada: ofrécela al inicio ('¿Quieres probar algo mientras eliges?'), porque permite que el cliente gaste 8-10 euros en lugar de 40 para probar. Si le encanta, la conversión a botella es natural. La segunda botella se sugiere cuando han bebido más de la mitad de la primera y aún hay platos por venir; es momento de ofrecer algo que acompañe lo siguiente ('Va perfecto con los segundos platos'). La premiumización funciona con maridaje, no con precio: no digas 'este vale más', di 'este realza los sabores de lo que vas a comer'. Leer el contexto es crucial: una celebración (aniversario, cumpleaños) abre la puerta a vinos premium. Un cliente habitual que siempre pide vino tendrá menos resistencia a subir de precio. El tipo de comida elegida también habla: quien pide entrecot o rodaballo se preocupa por experiencia. El lenguaje importa: la urgencia ética funciona (botellas limitadas si es verdad), pero la presión nunca. Al final, estás ofreciendo una mejor experiencia, no obligando. La métrica: si el 30% de tus mesas que compran vino suben a botella desde copa, ya ganaste.",
        practicalExercise: "Entra a una bodega o tienda de vino. Elige un vino 'básico' (15-20 euros) y otro premium de la misma región o estilo (40-50 euros). Ahora crea el argumento de premiumización: qué lo hace especial, con qué comida va mejor. Practica el pitch frente a un espejo o un compañero."
      },
      {
        id: "maridajes-rapidos",
        slug: "maridajes-rapidos",
        title: "Maridajes rápidos: qué vino con qué plato",
        description: "Combinaciones clásicas y criterios para emparejar vino y comida sin complicarse.",
        duration: "13 min",
        videoPlaceholder: "Guía práctica de maridajes. Se cubren las combinaciones clásicas (pescado blanco + blanco, carne roja + tinto) y los criterios que funcionan siempre: peso del plato con peso del vino, sabores complementarios, y acidez/taninos vs grasa del plato. Se muestran ejemplos visuales y diálogos del camarero con cliente.",
        keyPoints: [
          "Regla de oro: peso del vino = peso del plato (plato ligero + vino ligero, pesado + vino potente)",
          "Pescados blancos (lenguado, bacalao) → blancos ligeros, Sauvignon Blanc, Albariño o espumosos",
          "Carnes rojas (solomillo, entrecot) → tintos con cuerpo, Tempranillo, Cabernet Sauvignon",
          "Pastas cremosas → blancos con cuerpo (Chardonnay) o tintos ligeros (Pinot Noir)",
          "Aves (pollo, pato) → tintos ligeros o blancos, según preparación y salsa",
          "La acidez corta la grasa: carne muy grasa pide vino ácido (Sauvignon, Riesling)",
          "Los taninos combaten proteínas y grasas: mejor en combinaciones carnívoras",
          "Mariscos (camarones, calamar) → blancos frescos, Albariño, Verdicchio, o espumosos",
          "Quesos → tintos si son aged, blancos si son frescos, según intensidad",
          "Salsas agridulces → blancos aromáticos (Riesling) o rosados estructurados"
        ],
        quiz: [
          {
            question: "¿Qué vino combina mejor con un salmón a la mantequilla?",
            options: [
              "Tinto potente y tánico",
              "Blanco con cuerpo y acidez (Chardonnay, Sauvignon Blanc)",
              "Vino muy dulce",
              "Tinto joven muy ligero"
            ],
            correct: 1
          },
          {
            question: "¿Por qué un vino ácido funciona bien con platos grasos?",
            options: [
              "Porque contrasta en color",
              "Porque la acidez 'limpia' el paladar de la grasa y restaura el apetito",
              "Porque siempre se vende más",
              "Porque es más barato"
            ],
            correct: 1
          },
          {
            question: "Un cliente pide pechuga de pollo con salsa ligera, ¿qué le recomendarías?",
            options: [
              "Tinto reserva potente y tánico",
              "Blanco ligero o tinto ligero (Pinot Noir), según preferencia de color",
              "Solo espumoso",
              "Sin vino, es mejor agua"
            ],
            correct: 1
          },
          {
            question: "¿Cuál es la característica más importante para maridaje?",
            options: [
              "Que ambos sean de la misma región",
              "Que ambos sean caros",
              "Que el peso/estructura del vino coincida con el plato",
              "Que siempre sea tinto con carne"
            ],
            correct: 2
          },
          {
            question: "Un cliente pide camarones a la brasa (potentes, con limón). ¿Qué vino?",
            options: [
              "Tinto potente",
              "Blanco fresco ácido o espumoso seco",
              "Blanco dulce",
              "No pide vino con mariscos"
            ],
            correct: 1
          }
        ],
        content: "Los maridajes no son magia, son lógica. La regla de oro es equilibrio: un plato ligero (pescado blanco escalfado) pide un vino ligero (Sauvignon Blanc). Un plato potente (entrecot jugoso) pide un vino potente (Tempranillo, Cabernet). El pescado blanco simple casi siempre busca blanco: bacalao con Albariño es casi perfecto. El salmón necesita más cuerpo por su grasa, así que un blanco con estructura (Chardonnay) o hasta un tinto muy ligero. Las carnes rojas estructuradas necesitan taninos, que combaten la proteína y grasa. La salsa es crucial: un pollo con salsa de champiñones rústica funciona con tinto ligero; con limón y aceite pide blanco. La grasa es enemiga del tanino pero amiga de la acidez: un lenguado con mantequilla dice 'dame un Sauvignon Blanc ácido'. Los mariscos delicados (camarones, calamar) buscan blancos frescos o espumosos. Una pasta cremosa es un caso medio: blanco con cuerpo mantiene equilibrio. Las salsas agridulces (teriyaki, agridulce) son traviesas, buscan un blanco aromático (Riesling) que tolere la dulzura. Memoriza estos patrones: cuando ves un plato, pregúntate 'qué peso tiene' y 'cuál es su sabor dominante'. La respuesta casi siempre aparece.",
        practicalExercise: "Ve a un restaurante con menú. Elige 5 platos al azar. Para cada uno, predice el vino ideal basándote en peso y sabor. Después, busca en la carta si existe un maridaje similar. ¿Acertaste? Si no, entiende por qué."
      },
      {
        id: "preguntas-frecuentes",
        slug: "preguntas-frecuentes",
        title: "Las 20 preguntas del cliente y cómo responderlas",
        description: "Las preguntas más comunes que hace un cliente sobre vino y respuestas claras que construyen confianza.",
        duration: "15 min",
        videoPlaceholder: "Compilación de 20 preguntas reales que hace el cliente sobre vino, con respuestas profesionales claras y sin jerga. Incluye: '¿Qué es la añada?', '¿Tiene taninos?', '¿Es un vino joven o viejo?', '¿Por qué es tan caro?', '¿Me emborrachará rápido?', '¿Tiene sulfitos?', y otras. Cada respuesta se da en lenguaje simple con argumentos que tranquilizan al cliente.",
        keyPoints: [
          "Preguntas sobre añada: 'Es el año que se cosechó la uva, no cuándo se embotelló'",
          "Preguntas sobre crianza y edad: 'Joven es fresco, Crianza 2+ años, Reserva 3+, Gran Reserva 5+'",
          "Preguntas sobre taninos: 'Es la sensación de sequedad que sientes, como en té fuerte'",
          "Preguntas sobre alcohol: 'Rango típico 12-15%, depende de madurez de uva'",
          "Preguntas sobre precio y valor: Justificar con bodega, terroir, envejecimiento, no solo precio",
          "Preguntas sobre sulfitos: 'Conservante natural, todo vino tiene, ayuda a preservar'",
          "Preguntas sobre cuerpo: 'Ligero se siente aéreo, cuerpo se siente denso, como leche vs agua'",
          "Preguntas sobre defectos: Corchadura, oxidación, brettanomyces (tono animal)"
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
            question: "Si el cliente pregunta '¿Tiene mucho alcohol?', ¿cómo descubres si es problema?",
            options: [
              "Asumes que sí",
              "Le preguntas si es por salud, medicinas, o solo preferencia de sabor ligero",
              "Le das blanco siempre",
              "No le das importancia"
            ],
            correct: 1
          },
          {
            question: "¿Qué significa 'añada' en una botella?",
            options: [
              "El color del vino",
              "El año en que se cosecharon las uvas",
              "La región de origen",
              "El tiempo que está en barrica"
            ],
            correct: 1
          },
          {
            question: "¿Qué significa si un vino 'tiene mucho cuerpo'?",
            options: [
              "Tiene muchos taninos",
              "Se siente denso, viscoso, como leche vs agua",
              "Es muy oscuro",
              "Tiene mucho alcohol siempre"
            ],
            correct: 1
          },
          {
            question: "'¿Por qué tiene un corcho sintético este vino?' ¿Cuál es tu respuesta?",
            options: [
              "'Porque es barato'",
              "'Para evitar corchadura, algunos vinos usan tapones sintéticos o rosca'",
              "'Porque la bodega no tiene dinero'",
              "'Los vinos de calidad solo usan corcho natural'"
            ],
            correct: 1
          }
        ],
        content: "Los clientes hacen muchas preguntas porque el vino intimida. Tu trabajo es tranquilizarlos. La pregunta más común es sobre precio: responde con datos, no con arrogancia. 'Este vino viene de una bodega con 100 años de historia, la cosecha 2015 fue excepcional, y tiene 18 meses en barrica francesa' suena mejor que 'cuesta más porque es mejor'. Los taninos asustan: explica con una metáfora. 'Son las proteínas en las pieles que crean una sensación de sequedad, como cuando tomas té muy fuerte'. Sobre alcohol, identifica el verdadero problema: si es por salud (medicinas), sugiere algo ligero; si es preferencia de sabor, lo mismo; si es miedo a emborracharse, asegura que beber lentamente con comida es seguro. Los sulfitos son el enemigo imaginario: 'Todos los vinos tienen sulfitos, es un conservante natural que preserva el vino, sin él se pudre'. Sobre corchadura, si alguien pregunta, es porque huele algo raro: toma la botella, prueba, y dila si tiene ese olor a sótano mojado, entonces sí, está corchada. La crianza confunde: simplifica. 'Joven es fresco y rápido de beber. Crianza pasó 2 años en barrica, más estructurado. Reserva 3 años, mucho más refinado. Gran Reserva 5+, para coleccionistas'. Si alguien pregunta si es bueno un vino, pruébalo tú primero si puedes, o da tu opinión honesta.",
        practicalExercise: "Crea un documento con las 10 preguntas que más escuchas en tu trabajo. Para cada una, escribe la respuesta que darías en 2-3 frases simples, sin jerga. Luego, pide a un compañero que te las haga de repente, y responde sin leer."
      },
      {
        id: "detectar-perfil-cliente",
        slug: "detectar-perfil-cliente",
        title: "Cómo detectar lo que el cliente quiere",
        description: "Técnicas para leer al cliente y ofrecer exactamente lo que busca, aunque no lo sepa.",
        duration: "10 min",
        videoPlaceholder: "Análisis de señales que emite el cliente en la mesa: lenguaje corporal, cómo habla de vino, si va acompañado, el tipo de comida que elige, si pide copas o botellas. Se enseña cómo usar estas señales para saber si el cliente es aventurero o conservador, si busca precio o calidad, si quiere aprender o simplemente disfrutar.",
        keyPoints: [
          "Señales verbales: 'No entiendo de vinos' = seguridad necesaria; 'Tengo favorito' = conocedor",
          "Señales no verbales: mira carta rápido = prisa; detalladamente = interés; la cierra rápido = inseguridad",
          "Contexto: Celebración abre presupuesto; negocios busca seguridad; pareja busca romance; amigos buscan diversión",
          "Tipo de comida elegida: solomillo + champaña = presupuesto; menú del día = ahorro; platos raros = aventurero",
          "Lenguaje usado: 'Algo seco' = conocedor; 'Algo dulce' = generalmente inseguro; silencio = indeciso",
          "Acompañamiento: solo = confiado o negocios; pareja = romántico; grupo = social",
          "Historia anterior: cliente habitual = personaliza; cliente nuevo = estándar seguro"
        ],
        quiz: [
          {
            question: "Un cliente abre la carta de vinos y la cierra rápido diciendo 'Tú elige', ¿qué dice esto?",
            options: [
              "Que es un experto en vino",
              "Que no tiene dinero",
              "Que no entiende de vino y necesita seguridad en tu recomendación",
              "Que solo quiere agua"
            ],
            correct: 2
          },
          {
            question: "¿Cómo diferencias entre un cliente que busca calidad vs. uno que busca ahorro?",
            options: [
              "Por la ropa que lleva",
              "Por el tipo de comida que pide, cómo habla, si pregunta sobre origen del vino",
              "Nunca se puede saber",
              "Todos quieren lo mismo: buen vino barato"
            ],
            correct: 1
          },
          {
            question: "Un cliente pide 'algo fresco y ligero para acompañar pescado', ¿qué tipo de perfil es?",
            options: [
              "Aventurero, busca vinos raros",
              "Conocedor, sabe lo que quiere y es específico",
              "Principiante, necesita orientación total",
              "Esnob, busca vinos caros únicamente"
            ],
            correct: 1
          },
          {
            question: "Una pareja pide vino pero uno dice 'no mucho alcohol'. ¿Cuál es el contexto probable?",
            options: [
              "Uno es alcohólico",
              "Uno no le gusta el vino",
              "Probablemente conductor, o preferencia personal por vinos ligeros",
              "No dan pistas"
            ],
            correct: 2
          },
          {
            question: "Un cliente habitual pide 'lo de siempre'. ¿Cuál es el riesgo?",
            options: [
              "Que ya no le guste ese vino",
              "Que se aburra de lo mismo",
              "Que sea más caro",
              "Respeta su rutina, es seguridad para él"
            ],
            correct: 0
          }
        ],
        content: "Leer al cliente es una habilidad que se entrena. Las palabras que elige revelan mucho: 'algo seco' significa que conoce la diferencia entre seco y dulce; 'algo afrutado' puede ser impreciso pero intenta ser específico; silencio total significa miedo. El contexto importa enormemente: una pareja en mesa de rincón en aniversario tiene presupuesto emocional para vino premium. Una comida de negocios busca seguridad (vinos conocidos, no raros). Un grupo de amigos busca diversión y compartir. La comida que elige habla también: quien pide entrecot gracias tiene dinero; quien estudia el menú del día busca ahorro; quien pide los platos más caros o raros es aventurero. El lenguaje corporal: si abre la carta de vinos con entusiasmo, aprecia el vino; si la pasa al compañero rápido, no. Si pregunta dónde viene el vino, si es de una bodega conocida, entonces busca conocimiento. Si solo pregunta el precio, busca seguridad en su bolsillo. Los clientes habituales son predecibles pero peligrosos: si piden 'lo de siempre', puedes caer en la rutina; mejor preguntar ocasionalmente '¿Quieres probar algo nuevo este mes?' para evitar aburrimiento. Tu trabajo es ofrecer lo que el cliente necesita emocionalmente, no solo lo que dice querer.",
        practicalExercise: "En tu próximo servicio, observa 3 clientes diferentes. Para cada uno, anota: lenguaje usado, contexto (¿pareja?, ¿negocios?), tipo de comida, cómo miran la carta. Después de servirles, reflexiona: ¿acertaste el perfil? ¿Tu recomendación fue la ideal?"
      },
      {
        id: "vino-por-copa",
        slug: "vino-por-copa",
        title: "Vino por copa: tu mejor herramienta de venta",
        description: "Cómo usar el vino por copa para aumentar ventas sin presionar al cliente.",
        duration: "11 min",
        videoPlaceholder: "Análisis estratégico del vino por copa como herramienta de venta. Se cubren: cómo presentar el vino por copa sin restar importancia a la botella, cómo gestionar que el cliente pruebe en copa y después pida botella, cómo mantener la calidad en el programa de copa, y cómo comunicar los vinos por copa al cliente (carta separada, presentación verbal, etc.).",
        keyPoints: [
          "Ventaja psicológica: cliente prueba 8-10 euros sin riesgo de 40 euros en botella",
          "Cómo presentar: 'Tenemos también por copa si quieres probar antes de comprometer botella'",
          "Conversión copa a botella: lectura de señales ('Te encanta, ¿verdad?') + oferta natural",
          "Mantener frescura: máximo 48h en botella abierta con sistemas Coravin o nitógeno",
          "Marketing: mencionar vino por copa en momento de incertidumbre del cliente",
          "Cuándo upsell: después de 1-2 copas si le encanta, justo antes de segundo plato",
          "Riesgo: copa debe ser excelente para convertir; mala copa = no confía en botella"
        ],
        quiz: [
          {
            question: "¿Cuál es la ventaja principal de ofrecer vino por copa?",
            options: [
              "Cuesta menos al restaurante",
              "Se vende más rápido en volumen",
              "El cliente prueba sin riesgo financiero y puede convertir a botella",
              "Ocupa menos espacio en bodega"
            ],
            correct: 2
          },
          {
            question: "¿Cuánto tiempo máximo puede estar una botella abierta de vino por copa?",
            options: [
              "1 día máximo",
              "48h con sistemas de conservación (Coravin, nitrógeno)",
              "Una semana si está bien tapada",
              "Un mes en nevera"
            ],
            correct: 1
          },
          {
            question: "Un cliente probó un vino por copa y le encantó, ¿cómo lo conviertes en botella?",
            options: [
              "'Compra la botella, es mucho más barato'",
              "'Te encanta, ¿verdad? Pido una botella entera para que disfrutes más'",
              "Dejas que pida por su cuenta si quiere",
              "Lo recomendas pero sin insistir"
            ],
            correct: 1
          },
          {
            question: "¿Cuál es el riesgo de ofrecer vino por copa de mala calidad?",
            options: [
              "Que pierdas dinero",
              "Que el cliente no confíe en la botella del mismo vino",
              "Que sea muy caro",
              "Que se acabe rápido"
            ],
            correct: 1
          },
          {
            question: "¿Cuál es el timing óptimo para sugerir pasar de copa a botella?",
            options: [
              "Al terminar la comida",
              "Cuando el cliente termina la segunda copa y faltan platos",
              "Inmediatamente después de probar",
              "Solo si el cliente lo pide"
            ],
            correct: 1
          }
        ],
        content: "El vino por copa es tu arma secreta de venta. Psicológicamente, un cliente indeciso puede gastar 8-10 euros en una copa sin miedo; después de disfrutar, convierte eso a botella es natural. La presentación es clave: no digas 'también lo vendemos por copa', di 'tenemos este también por copa si quieres probarlo sin compromiso'. El lenguaje quita presión. La botella por copa debe ser excelente: una copa pobre destruye la confianza. Si el vino es malo o está mal conservado, el cliente nunca comprará botella, aunque sea la misma. La conservación es técnica: con un Coravin o nitrógeno, una botella dura 48 horas sin degradación. Sin estos sistemas, máximo 24 horas. Esto es crucial porque botellas muertas = dinero perdido. La conversión sucede durante la comida, no después: cuando el cliente disfruta su segunda copa y aún hay platos viniendo, es el momento. 'Te encanta, ¿verdad? Pido una botella entera para que disfrutes' es irresistible. El riesgo es ofrecerlo demasiado pronto o tardío. Demasiado pronto intimida; demasiado tarde, el cliente ya decidió solo agua. Un programa de copa bien ejecutado puede aumentar el ticket de vino 20-30%. Es la herramienta más sofisticada de ventas de vino.",
        practicalExercise: "Diseña un programa de copa para tu restaurante: elige 5 vinos (tintos, blancos, espumosos) que representen calidad y diferentes precios. Prueba la presentación verbal con un compañero. Luego, durante una comida lenta, implementa: ofrece copa a 3 mesas diferentes. Mide conversión."
      },
      {
        id: "tecnicas-mesa",
        slug: "tecnicas-mesa",
        title: "Técnicas de presentación y venta en mesa",
        description: "Cómo conducir la conversación sobre vino en la mesa para aumentar ventas y satisfacción.",
        duration: "12 min",
        videoPlaceholder: "Masterclass sobre dinámicas de venta de vino en la mesa. Se cubren: cómo abordar la conversación de vino en el momento correcto, cómo hacer preguntas que cierren venta (no preguntas abiertas), cómo usar lenguaje positivo, cómo manejar objeciones de precio, y cómo crear sensación de escasez ('Solo 3 botellas de este') sin ser mentiroso.",
        keyPoints: [
          "Timing: oferta de vino después de aperitivo, antes de pedir plato (cliente relajado, hambre abierto)",
          "Preguntas de cierre: '¿Tinto o blanco?' obliga a elegir vs '¿Quieres vino?' es fácil rechazar",
          "Lenguaje positivo: 'Increíble con este plato' vs 'Podría funcionar' (diferencia vendedora)",
          "Manejo de objeción de precio: nunca defender el precio, defender la calidad y experiencia",
          "Crear urgencia ética: usar escasez real ('Quedan 2 botellas'), no inventar mentiras",
          "Presencia: mantén contacto visual, seguridad en recomendación, energía positiva",
          "Cerradura: confirmar bebida, verificar satisfacción, nunca dejar duda en la mesa"
        ],
        quiz: [
          {
            question: "¿Cuál es la mejor pregunta para cerrar venta?",
            options: [
              "'¿Quieres vino?' (abierta, fácil rechazar)",
              "'¿Prefieres este tinto o blanco?' (cierre, obliga a elegir)",
              "Ambas funcionan igual",
              "No importa la pregunta, el tono es lo crucial"
            ],
            correct: 1
          },
          {
            question: "Un cliente dice 'Es muy caro', ¿cuál es tu respuesta profesional?",
            options: [
              "'Es el precio que está en la carta'",
              "'La calidad tiene precio siempre'",
              "'Esta bodega es famosa, la cosecha fue excepcional, 18 meses en barrica francesa'",
              "'Mira, otros vinos son más caros aún'"
            ],
            correct: 2
          },
          {
            question: "¿Cuándo es el mejor momento para ofrecer vino?",
            options: [
              "Cuando el cliente llega a la mesa",
              "Después del aperitivo, antes de pedir comida (cliente relajado)",
              "Después de que ha llegado la comida",
              "Al final con postre"
            ],
            correct: 1
          },
          {
            question: "Un cliente pregunta '¿No hay algo más barato?'. ¿Tu respuesta?",
            options: [
              "'Este es el más barato de su tipo'",
              "'Podemos ir bajando en precio, pero esto sube la experiencia'",
              "'Los baratos son malos'",
              "'Lo siento, este es el mínimo'"
            ],
            correct: 1
          },
          {
            question: "¿Cuál es el error más grave en técnica de mesa?",
            options: [
              "Hablar demasiado de vino",
              "Parecer desesperado o presionado, destruye confianza",
              "Ofrecer vino caro",
              "Ofrecer vino barato"
            ],
            correct: 1
          }
        ],
        content: "La venta en mesa es teatro. El timing es todo: si ofreces vino cuando acaban de llegar, están leyendo menú y pedir comida. Ofrece después del aperitivo, cuando están relajados, cuando la comida ya viene en camino. Las preguntas que cierran venta son binarias: '¿Tinto o blanco?' obliga a elegir entre dos opciones; '¿Quieres vino?' permite decir no sin culpa. Tu lenguaje debe ser positivo y seguro. No digas 'Este podría funcionar', di 'Este es espectacular con salmón porque es ácido, corta la grasa'. La diferencia entre 'podría' y 'es' es vendedora. Cuando manejas una objeción de precio, nunca defiendas el precio, defiende la experiencia. 'Es caro' → 'Sí, tiene precio porque esta bodega ha estado en la familia 80 años, y usan técnicas francesas en la barrica'. La urgencia funciona si es ética: 'Tenemos solo 2 botellas de este año' si es verdad. Si mientes, se nota y pierdes credibilidad. Tu presencia en la mesa importa: contacto visual, sonrisa, seguridad. Si pareces inseguro, el cliente desconfía. La cerrazura es el final: confirma que está satisfecho con la elección, vuelve a verificar después del primer sorbo. Una mesa bien cerrada genera propina y repetición.",
        practicalExercise: "Graba un video de ti mismo (o pide a un compañero) haciendo una presentación de vino en 1 minuto. Luego, obsérva: ¿usaste preguntas de cierre o abiertas?, ¿lenguaje positivo?, ¿contacto visual?, ¿confianza? Repite hasta que suene natural."
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
          "Estructura visual: agrupa por contexto (para el cliente debe ser fácil buscar)",
          "Rotación esperada: referencias basic rotan 8-12 veces/año, premium 2-3 veces/año",
          "Relación con la cocina: maridaje es una venta potencial, carta debe acompañar menú",
          "Actualización regular: revisar carta cada 3-6 meses según venta y tendencias",
          "Margen por segmento: básicos 50-60%, mid-range 60-70%, premium 70-80%",
          "Educación al cliente: carta debe incluir pequeñas notas de terroir o familia"
        ],
        content: "Construir una carta de vinos efectiva es un equilibrio entre estrategia comercial, experiencia del cliente y realidad operativa. La mayoría de restaurantes exitosos manejan entre 40 y 80 referencias, número que varía según el modelo de negocio: un wine bar puede tener 150+, mientras que un casual bien hecho funciona con 30-40.\n\nLa pirámide de precios es fundamental: el 50% de tu carta debe ser vinos accesibles (los que ruedan rápido), el 30% mid-range (donde está la ganancia equilibrada), y apenas el 20% premium (prestidigitalismo y aspiración). Esta estructura no es arbitraria: refleja cómo come la mayoría de clientes.\n\nEquilibrio de estilos significa acompañar tu cocina. Si sirves comida ligera, blancos deben protagonizar. Identidad regional crea narrativa (una bodega riojana que refuerza Rioja vende mejor), pero nunca a costa de variedad total. Finalmente, la estructura visual de la carta importa: agrupa por región, estilo o precio según tu target. Un sommelier puede navegar por técnica; un cliente casual necesita claridad.",
        practicalExercise: "Revisa la carta actual de tu restaurante y mapéala en la pirámide de precios (básico/mid/premium). ¿Cumple 50-30-20? Si no, identifica 5 referencias para mover: 2 que suban de categoría, 3 que bajen para mejorar rotación.",
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
          },
          {
            question: "¿Cuántas veces al año debería rotar una referencia básica en tu carta?",
            options: [
              "1-2 veces",
              "4-6 veces",
              "8-12 veces",
              "20+ veces"
            ],
            correct: 2
          },
          {
            question: "¿Cuál debería ser el margen típico en vinos premium de tu carta?",
            options: [
              "40-50%",
              "55-65%",
              "70-80%",
              "85-90%"
            ],
            correct: 2
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
          "Benchmark: ¿cuál es el margen promedio?, ¿cuál es el mínimo aceptable?",
          "Merma real: cálculo incluye rotura, muestras, promociones, desperdicio natural",
          "Análisis ABC: A = 20% referencias generan 80% margen, éstos son los 'motores'",
          "Precio lista vs margen efectivo: ¿qué % realmente cobramos en promedio?",
          "Elasticidad precio: algunos vinos bajan volumen si subes precio, otros no",
          "Decisiones por cuadrante: rojo=retirar, amarillo=mejorar, verde=mantener/expandir"
        ],
        content: "El análisis de márgenes es la diferencia entre parecer exitoso y serlo. Muchos jefes de sala caen en la trampa del margen bruto: dicen 'este vino tiene 70% de margen' pero ignoran que pierden 20 puntos en merma, catas, servicios complimentarios y eventos sin cobro. El margen real es lo que queda después de restar todos esos costos ocultos.\n\nLa matriz 2x2 es tu mejor amiga. En el eje Y va margen (calculado correctamente), en el eje X va volumen de ventas. Los vinos en la esquina superior derecha (alto margen + alto volumen) son tus joyas, debes expandirlos. Los de esquina superior izquierda (alto margen + bajo volumen) son vinos 'muertos': tu dinero inmovilizado en botellas que nadie compra. Los de esquina inferior derecha (bajo margen + alto volumen) son tus volúmenes, revisables pero funcionales. Los de esquina inferior izquierda (bajo margen + bajo volumen) son candidatos directos a retiro.\n\nUsando análisis ABC identificarás que el 20% de tus referencias generan el 80% del margen total. Esos son tus 'motores'. Protégelos, empújalo, negocia volumen con proveedores para mejorar costo.",
        practicalExercise: "Toma las últimas 12 semanas de datos de venta y calcula margen real (no bruto) para cada referencia. Crea una matriz 2x2 con tus referencias y clasifícalas en 4 cuadrantes. Identifica 3 referencias en zona roja que debes retirar esta semana.",
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
          },
          {
            question: "¿Qué incluye el cálculo de 'merma real' en un análisis de márgenes?",
            options: [
              "Solo las botellas que se rompieron",
              "Rotura, muestras, promociones, desperdicio natural",
              "Solo el dinero que perdiste",
              "Nada, merma es solo un término teórico"
            ],
            correct: 1
          },
          {
            question: "Si el 20% de tus referencias generan el 80% del margen, ¿qué deberías hacer?",
            options: [
              "Retirar el otro 80% de referencias",
              "Aumentar precio en ese 20%",
              "Proteger, expandir y negociar volumen para ese 20%",
              "Ignorar el análisis ABC, no funciona en vino"
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
          "Prevención: auditoría mensual de stock vs ventas",
          "Indicadores previos: si la referencia no se vende, sale de lista en 2-4 semanas",
          "Vino por copa como revividor: 5 botellas vivas en barra > 10 botellas muertas en bodega",
          "Red flags: vino que estuvo en lista hace 6+ meses sin venta = casi seguro muerto",
          "Tratamiento: baja de carta → vino por copa → donación/venta a otro local → último recurso retirar",
          "Frecuencia de auditoría: semanal para referencias lentas, mensual para básicas"
        ],
        content: "Tener botellas muertas en bodega es como tener dinero enterrado. Un vino sin movimiento durante 60-120 días (según su naturaleza: básicos rotan rápido, premium más lento) es oficialmente muerto. Pero el costo no es solo 'perder una venta': es perder espacio, tener capital inmovilizado, arriesgar oxidación, olvidarse de qué existe.\n\nLa mayoría de jefes de sala no hace inventarios cruzados de botellas vs datos de venta. Resultado: bodega llena de vinos olvidados. La auditoría mensual es esencial: lista cada botella de bodega, crúzala con ventas de últimas 12 semanas, marca las que no aparecen.\n\nPara revivir un vino muerto, primero intenta baja de carta + vino por copa con promoción activa: 'esta semana probamos X, una joya desconocida'. Si sigue sin vender en 2-3 semanas, consideraremos donación (bodega/escuela) o venta a otro restaurante que pueda darle vida. El retiro puro es la última opción: si no hay salida, debe irse.",
        practicalExercise: "Haz un inventario completo de tu bodega hoy. Cruza cada botella contra ventas de últimas 8 semanas. Identifica 5 vinos muertos (sin venta en 60+ días). Esta semana, retira 2 de carta y promuévelos como 'vino por copa de promoción especial'.",
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
          },
          {
            question: "¿Cuándo debería retirar completamente un vino de bodega?",
            options: [
              "Cuando lleve 30 días sin vender",
              "Después de intentar vino por copa y seguir sin venta en 2-3 semanas",
              "Nunca, todo vino tiene potencial",
              "Inmediatamente, para tener espacio"
            ],
            correct: 1
          },
          {
            question: "¿Con qué frecuencia debería hacer auditoría de stock vs ventas?",
            options: [
              "Una vez al año",
              "Cada trimestre",
              "Semanal para lentos, mensual para básicos",
              "Nunca, es pérdida de tiempo"
            ],
            correct: 2
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
          "Auditoría mensual: ¿cómo estuvo el histórico vs predicción?, ¿qué ajustar?",
          "Seasonalidad: vinos blancos/rosados suben en verano, tintos estructurados en invierno",
          "Cantidades mínimas: negociar con proveedor, ¿puedo comprar en docenas o cajas completas?",
          "Lead time: ¿cuánto tarda entre pedido y entrega? Esto afecta el ciclo de compra",
          "Descuentos por volumen: acumular 12 meses de datos permite pedido volumen a mejor precio",
          "Criterios de descarte: referencias que rotan <0.5 veces/año = candidatos a retiro directo"
        ],
        content: "Comprar vino no es ir al distribuidor y decir 'dame lo mismo que siempre'. La compra inteligente empieza con datos. Necesitas histórico de 8-12 semanas mínimo de cada referencia: cuántas botellas se venden por semana, cómo es la variación (¿siempre igual o hay picos?), cuál es el margen real que genera.\n\nLa fórmula base es simple: rotación semanal × 4 semanas × 1.1 (margen de seguridad) = cantidad a comprar. Si un vino rota 2 botellas/semana, compras 8-9 botellas para un mes. Pero hay matices: si es temporada alta de turismo, multiplica por 1.3. Si la referencia está en descenso, reduce.\n\nNegociar es esencial. Lleva datos al proveedor: 'Vendo 40 botellas anuales de este Rioja, ¿qué precio me das en docena?' o 'Tengo 5 referencias muertas, ¿las cambias por nuevos vinos tu región?' Los proveedores responden a datos y volumen, no a emociones. Finalmente, cada trimestre audita: ¿se cumplieron las predicciones? ¿Qué referencias sobre/sub estimé? Ajusta el modelo.",
        practicalExercise: "Toma 12 semanas de datos de venta de tu top 10 referencias. Calcula rotación semanal promedio, desviación estándar y margen real. Luego aplica fórmula de compra inteligente: (rotación × 4 × 1.1). Compara con lo que compraste realmente en últimas 3 órdenes: ¿sobre qué compraste?, ¿bajo qué?",
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
          },
          {
            question: "¿Cuál es el impacto de la seasonalidad en las compras de vino?",
            options: [
              "No hay impacto, el vino se vende igual todo el año",
              "Blancos/rosados suben en verano, tintos en invierno; debes ajustar cantidad",
              "La seasonalidad solo aplica en bares, no en restaurantes",
              "Es responsabilidad del distribuidor, no tuya"
            ],
            correct: 1
          },
          {
            question: "¿Qué referencia de vino debería retirar completamente?",
            options: [
              "La que tenga mayor precio",
              "La que tenga margen más bajo",
              "La que rote menos de 0.5 veces por año",
              "Ninguna, todas son valiosas"
            ],
            correct: 2
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
          "Tendencias: vinos naturales, bio, de variedades olvidadas, emergentes regiones",
          "Priorat: pizarra y esquisto, vinos potentes; Montsant: más accesible, suelo menos exigente",
          "Georgia: cuna de la viticultura, método kvevri (anforas), vinos únicos a precio razonable",
          "Portugal no es Rioja: Douro estructurado, vinho verde fresco, Alentejo emergente",
          "Nuevas Zelanda: Sauvignon Blanc icónico pero Pinot Noir desafía a Borgoña",
          "Diferenciación con regiones emergentes: estrategia inteligente = opción premium a mejor margen"
        ],
        content: "Ser experto en regiones te diferencia. Cualquiera conoce Rioja; pocos saben por qué Alavesa es más ácida (suelos calcáreos, clima atlántico) versus Alta que es más potente (clima continental, suelos ferrosos). Esta distinción es oro: vendes Alavesa a cliente que quiere frescura, Alta al que busca estructura. Mismo precio, diferente narrativa.\n\nTerroir no es moda, es realidad: altitud determina temperatura y maduración; exposición del viñedo (norte vs sur) impacta coloración; tipo de suelo afecta mineralidad. Un Priorat de pizarra es literalmente diferente a un Montsant de arcilla: precios similares pero perfiles sensoriales opuestos.\n\nLas regiones emergentes son tu arma comercial: Georgia produce vinos únicos en ánforas a 1/3 del precio de Borgoña equivalente. Portugal (Alentejo, Douro) entrega calidad premium con margen mejor. Nueva Zelanda reta a Francia en Pinot Noir. Estos no son 'vinos raros', son oportunidades: educas al cliente, justificas precio con historia, y logras margen superior.",
        practicalExercise: "Selecciona 3 regiones donde tienes más referencias. Para cada una, investiga y anota: variedades principales, diferencias de terroir (si hay sub-regiones), perfil de sabor típico. Luego, identifica 2 regiones emergentes (que no tengas) y busca 1 vino de cada una: compáralo en precio y características vs tu región equivalente. ¿Oportunidad?",
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
          },
          {
            question: "¿Cuál es la ventaja comercial de incluir regiones emergentes como Georgia en tu carta?",
            options: [
              "Son más fáciles de pronunciar",
              "Vinos únicos, educativos, mejor margen que Europa clásica",
              "Son más baratos, eso es todo",
              "No hay ventaja, son demasiado raros"
            ],
            correct: 1
          },
          {
            question: "¿Qué método tradicional usa Georgia para producir vino que lo diferencia?",
            options: [
              "Roble francés, como todo el mundo",
              "Acero inoxidable solamente",
              "Anforas de cerámica (kvevri), método ancestral",
              "Técnicas modernas de temperatura controlada"
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
          "Cómo contar la historia en la mesa sin ser pedante",
          "Narrativa de viaje: vino cuenta una historia de dónde viene, quién lo hizo, por qué es especial",
          "Lenguaje accesible: no uses términos técnicos sin explicar (polisacáridos = textura cremosa)",
          "Brevedad es oro: máximo 30 segundos de historia al presentar, el resto es conversación",
          "Conectar con cliente: 'Este es un vino familiar, como tu abuela hacía' más que 'fermentación láctica'",
          "Precio justificado: historia + calidad = cliente paga más y se siente bien de haberlo hecho"
        ],
        content: "Storytelling en vino no es ficción, es contexto. Un vino de 50€ es joyero químico si solo dices 'Es bueno'. Pero si dices 'Este vino viene de una familia riojana que ha cultivado la misma parcela durante 120 años en esta ladera orientada al norte, el suelo es de tiza blanca que le da mineralidad única', el cliente entiende por qué cuesta lo que cuesta.\n\nLas mejores historias tienen 3 ingredientes: lugar (terroir), persona (el winemaker y su obsesión), y propósito (¿por qué este vino existe?). No es invención; es información contextual que transforma cómo el cliente percibe lo que bebe.\n\nTiming es crítico. Al presentar el vino, cuenta brevemente la historia (máximo 30 segundos). Luego, mientras el cliente lo bebe, pregunta qué siente, qué percibe. Eso abre conversación genuina, no monólogo tuyo. Si el cliente conecta emocionalmente con la narrativa, justificará el precio sin resistencia: 'Vale pagar más por una historia que me importa'.",
        practicalExercise: "Escoge 3 vinos de tu carta. Investiga: origen de la bodega, historia del lugar (viñedo), quién es el winemaker, qué hace que este vino sea especial. Escribe una narrativa de 2-3 frases máximo para cada uno. Esta semana, practica presentándolas a mesas reales; pide feedback. ¿Conectaron?",
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
          },
          {
            question: "¿Cuál es la duración ideal para contar una historia de vino en la mesa?",
            options: [
              "5 minutos, hay que ser detallado",
              "Máximo 30 segundos, luego conversación",
              "2-3 minutos mientras se sirve",
              "Mejor no contar, dejar que el cliente lo descubra"
            ],
            correct: 1
          },
          {
            question: "¿Cómo logras que el cliente justifique un precio alto con storytelling?",
            options: [
              "Usas palabras técnicas para sonar experto",
              "Conectas emocionalmente con narrativa + calidad = cliente paga y se siente bien",
              "Subes precio paulatinamente, sin historia",
              "No se puede justificar, el precio habla solo"
            ],
            correct: 1
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
          "Grupo: política centralizada + flexibilidad local, estándares, auditoría regular",
          "Margen objetivo: gastronomía 70%+, wine bar 60%+, casual 55%+, hotel 65%+",
          "Marido estratégico: vino con platos = vector venta, debe ser parte de menú design",
          "Presupuesto training: gastronomía invierte en sommelier; casual en clear tasting notes",
          "Rotación esperada: gastronomía premium lenta/selecta, casual rápida/volumen",
          "Inversión inicial: gastronomía requiere stock premium (capital alto), casual flujo rápido"
        ],
        content: "Una estrategia de carta no es copiar a otro restaurante. Depende de tu modelo de negocio completamente. Un restaurante gastronómico que copia estrategia de wine bar fracasa; un casual que intenta ser premium también.\n\nGastronomía vive de maridaje y narrativa: menor cantidad de referencias (60-80) pero cada una pensada para acompañar platos específicos. El sommelier es parte del equipo creativo. Margen alto (70%+) porque cliente paga por expertise.\n\nWine bar es educación + volumen bajo en botella: 100-150 referencias pero enfoque en vino por copa (5 referencias en barra rotando). Cliente aprende, experimenta, repite. Margen 60%+ por el servicio de copaje.\n\nCasual es accesibilidad: 30-40 referencias de marcas conocidas, fácil de vender, margen 55%+ porque el volumen y la rapidez compensa. Cliente entra sin idea, camarero recomienda en 20 segundos, bebe.\n\nHotel necesita volumen + confianza: 80-120 referencias para satisfacer variedad de guests. Margen 65%+ porque hay presión de costos operativos.",
        practicalExercise: "Clasifica tu restaurante en uno de estos 5 modelos. Ahora audita tu carta actual: cantidad de referencias, distribución de precios, enfoque de margen. ¿Alinea con tu modelo?, ¿o estás copiando otro? Si no alinea, lista qué cambios harías en los próximos 3 meses.",
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
          },
          {
            question: "¿Cuál es el margen objetivo típico en un restaurante gastronómico?",
            options: [
              "40-50%",
              "50-60%",
              "70%+",
              "30%"
            ],
            correct: 2
          },
          {
            question: "¿Cuál es la ventaja clave de una estrategia de vino por copa en wine bar?",
            options: [
              "Ahorra dinero",
              "Permite cliente experimentar variedad + margen alto por servicio",
              "Es lo más fácil de gestionar",
              "No hay ventaja real"
            ],
            correct: 1
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
          "KPI 7: Obsolescencia (vinos muertos como % de stock)",
          "KPI 8: Índice de satisfacción cliente (comentarios sobre vino, quejas, repeats)",
          "KPI 9: Mix de precios (% de cada segmento: basic/mid/premium vendido)",
          "KPI 10: Velocidad de decisión (tiempo promedio cliente tardó en elegir vino)"
        ],
        content: "Un buen dashboard de vino no es bonito, es accionable. Los 7 KPIs esenciales son los que tu director debe revisar diariamente (alertas) y semanalmente (estrategia).\n\nMargen real (no bruto) te dice si estás siendo rentable. Rotación te dice si tu capital está inmovilizado o circulando. Vino como % de venta total (idealmente 15-25% en restaurante) te muestra si tu equipo está empujando vino o es pasivo. Ticket promedio de vino responde: ¿cuánto gasto promedio cliente en vino?, ¿está creciendo o bajando?\n\nConcentración 80/20 es crítica: si el 20% de referencias genera 80% de margen, esos son tus joyas, protégelos. Obsolescencia (vinos muertos/stock total) debe estar <5%: >5% es señal de mala gestión de compras. Cobertura mide salud general: si menos del 50% de referencias vendan >10% del esperado, tu carta tiene problemas.\n\nFinalmente, satisfacción cliente (comentarios, quejas) importa: un vino malo con buen margen destruye reputación. Mix de precios te muestra si el cliente está comprando aspiracional o jugando seguro: cambio en mix predice cambio en demand.",
        practicalExercise: "Crea un dashboard semanal (Excel o Sheets) con estos 7 KPIs de tu restaurante. Si no tienes datos fácilmente, empieza esta semana a recopilar. Establece benchmark para cada KPI (ejemplo: margen ≥60%, rotación ≥2.5x/año, vino %≥18%). Compara tu realidad vs benchmark: ¿dónde estás fuera? Ese es tu primer frente de acción.",
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
              "Es normal, es la regla 80/20, esos son los 'motores' a proteger",
              "Debería ser distribuido equitativamente",
              "Significa que los clientes no exploran"
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
          },
          {
            question: "¿Cuál es el máximo aceptable de 'obsolescencia' (vinos muertos) en tu stock?",
            options: [
              "<10%",
              "<5%",
              "<15%",
              "No hay límite, es inevitable"
            ],
            correct: 1
          },
          {
            question: "¿Qué te dice un cambio en 'mix de precios' (menos cliente comprando premium)?",
            options: [
              "Nada, son variaciones aleatorias",
              "Que hay cambio en comportamiento cliente, posible recesión o problema de carta",
              "Que debes bajar todos los precios",
              "Que debes agregar más referencias premium"
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
          "Comunicación: cambios de carta se comunican con 2 semanas adelanto, training",
          "Métricas por local: margen, rotación, ticket vino deben ser comparables entre locales",
          "Autonomía local: jefe de sala elige 5-10 referencias locales dentro de criterios (margen min, calidad)",
          "Conflicto: si local A tiene margen 45% y local B 65%, algo está mal: auditar precios/merma",
          "Cambios de carta: centralizado negocia cambios; locales tienen 1 semana para entrenar equipo",
          "Incentivos alineados: si bonificas por ticket vino alto, locales trabajarán en vender, no solo servir"
        ],
        content: "Gobernar cartas en grupo es balance: demasiada centralización mata creatividad local y camarero desmotivado vende mal; demasiada flexibilidad y pierdes poder de negociación y consistencia. La fórmula típica es 70-80% core centralizado + 20-30% local flexible.\n\nCore centralizado (70%): referencias básicas + mid-range + algunos premium que son 'motores' en todos los locales. Negocías volumen anual, obtienes mejores precios, garantizas calidad consistente. Flexible local (20-30%): jefe de sala elige 5-10 referencias dentro de criterios (margen mínimo 65%, rotación mínima, que encajen con cocina local).\n\nAuditoría mensual es crítica. Compara margen real, rotación, ticket promedio entre locales. Si local A vende 10x más de un vino que local B sin explicación, hay problema: ¿camarero no lo promociona?, ¿merma alta?, ¿precios diferentes?. Red flags: un local con margen promedio 45% vs 65% en otro = gestión pobre de merma/precios.\n\nComunicación de cambios: cuando retiras/agregas referencias core, avisas 2 semanas antes. Entrenas equipo, cuentas historia del nuevo vino, das tasting note. Si no hay buy-in de camarero, nuevo vino muere en bodega.",
        practicalExercise: "Si diriges grupo: documenta tu estructura (¿cuánto es core vs local?), lista tus 10 referencias core, establece criterios de selección local. Luego audita 2-3 locales: margen real, rotación, ticket vino. ¿Qué local está fuera de rango?, ¿por qué? Si diriges un local: negocia con dirección 5 referencias locales; documenta criterios que usaste para elegirlas.",
        quiz: [
          {
            question: "¿Cuál debería ser el balance entre carta centralizada y local en un grupo?",
            options: [
              "100% centralizado, sin flexibilidad",
              "100% local, sin estándares",
              "70-80% centralizado + 20-30% local flex",
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
          },
          {
            question: "¿Cuándo debería comunicar un cambio de carta en un grupo?",
            options: [
              "El mismo día, sorpresa",
              "Una semana antes, rápido",
              "Dos semanas antes con training",
              "Un mes antes, es mucho tiempo"
            ],
            correct: 2
          },
          {
            question: "¿Qué criterios DEBE tener el jefe de sala para elegir referencias locales?",
            options: [
              "Cualquier vino que le guste",
              "Solo vinos baratos",
              "Margen mínimo, rotación mínima, alineación con cocina",
              "Los que el distribuidor le trae"
            ],
            correct: 2
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
          "Estrategia: no perseguir todas las tendencias, pero sí estar atento a cuál funciona en tu mercado",
          "Generación Z: influencia social media, preferencia por variedades 'Instagrameables', atracción por historias",
          "Vinos naturales: 2-3% del mercado en España pero crecen 15%+ anual, nicho pero rentable",
          "Certificaciones: bio, biodinámico, vegan, comercio justo; cliente pagará 10-15% más por certificación relevante",
          "Premiumización lenta: cliente gasta menos en botella pero busca mejor experiencia, copas, educación"
        ],
        content: "Las tendencias en vino se mueven lentamente, no como moda rápida. Pero ignorarlas te deja obsoleto en 5 años. El consumidor joven (millennial, Gen Z) no quiere lo que su abuelo bebía: busca autenticidad (quién hace, cómo), accesibilidad (15-25€ no 100€), y educación (entender qué bebe, no solo confiar).\n\nVinos naturales crecen 15%+ anual pero siguen siendo 2-3% del mercado total en España. No son mainstream, pero si tu target es creativo/educado, incluir 3-4 referencias naturales bien elegidas genera buzz y diferencia. Atención: 'natural' no es sinónimo de bueno; hay naturales excelentes y horribles.\n\nRegiones emergentes desafían la autoridad: Georgia, Portugal, Nueva Zelanda ya no son 'alternativas baratas'. Tienen calidad equiparable a Francia/Italia pero con mejor margen. Cliente aspiracional se siente inteligente probando Georgia; cliente presupuesto consigue valor en Portugal.\n\nSostenibilidad impacta decisión de compra: packaging sostenible, huella de carbono baja, bio/vegan certificado. Cliente pagará 10-15% más si se alinea con sus valores. Pero cuidado: no es universal; en población tour/casual es menos relevante que en grande ciudades.",
        practicalExercise: "Audita tu carta contra 5 tendencias: ¿tienes acceso a vinos jóvenes (<15€)?, ¿referencias naturales educativas?, ¿regiones emergentes (Georgia, Portugal, Zelanda)?, ¿opciones bajas en alcohol?, ¿certificaciones visibles (bio, vegan)? Por cada ausencia: busca 1 vino y testéalo 2 semanas con clientes. ¿Feedback positivo?, considera agregarlo permanent.",
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
          },
          {
            question: "¿Cuál es el crecimiento anual típico de vinos naturales en el mercado?",
            options: [
              "1-2%",
              "5-8%",
              "15%+ pero siguen siendo 2-3% del total",
              "50%+, es la mayoría"
            ],
            correct: 2
          },
          {
            question: "¿Cuánto más pagará cliente por un vino con certificación (bio, vegan)?",
            options: [
              "0%, son iguales",
              "5%",
              "10-15% si se alinea con sus valores",
              "100%, el doble"
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
          "Decisión data-driven: nunca intuición sola, siempre datos + experiencia",
          "Automatización: alertas de stock bajo activan órdenes de compra automáticas",
          "Benchmarking: comparar tu margen/rotación vs estándar industria, ¿dónde estás débil?",
          "Audit trail: Winerim registra quién cambió qué precio, cuándo; trazabilidad total",
          "Comunicación: cambios de carta se notifican a equipo via Winerim (camareros ven notas)",
          "Escalabilidad: misma plataforma gestiona 1 restaurante o 50, estructura igual, resultados mayores"
        ],
        content: "Winerim como director es como tener un CFO de vino: te da datos en tiempo real, alertas automáticas, y la capacidad de escalar decisiones a múltiples locales sin perder control. El error más común: tener la plataforma pero no la lees.\n\nEl dashboard principal debe ser tu primer acto cada mañana: ¿cuál fue ayer margen real?, ¿cuántos vinos se vendieron?, ¿alguno en riesgo de muerto?, ¿algún precio desynced con POS?. 5 minutos de lectura diaria te evita 10 horas de corrección mensual.\n\nAlertas automáticas son tus guardaespaldas: stock bajo (configura: si quedan <10 botellas, alerta compra); referencias muertas (60 días sin venta = auto-flag); margen en riesgo (si rinde <50%, revisá). Automatización no toma decisión, pero te advierte.\n\nEn grupo: Winerim es tu única fuente de verdad. Si 3 locales tienen 3 números diferentes para el mismo vino, Winerim centraliza. Cambio de precio? Se implementa simultáneo en todos. Camarero nuevo en local B? Ve notas de vino, tasting notes, história de cada botella, sin confusión.\n\nFinalmente, escalabilidad: con Winerim puedes pasar de 1 a 10 restaurantes sin multiplicar tu overhead. Mismos KPIs, misma estructura, más negocio.",
        practicalExercise: "Si usas Winerim: activa alertas en: stock bajo (<10 botellas), referencias muertas (60+ días), margen bajo (<50%). Crea dashboard personalizado con tus 7 KPIs clave. Programa revisión diaria (15 min) y semanal (1 hora) de datos. Después: documenta 3 decisiones que habrías tomado sin datos; después con datos. ¿Mejoraron resultados?",
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
          },
          {
            question: "¿Cuál es la ventaja de automatización de alertas en Winerim?",
            options: [
              "Toma decisiones automáticamente",
              "Te advierte de problemas antes de que sean crisis",
              "No hay ventaja real",
              "Solo funciona en grandes grupos"
            ],
            correct: 1
          },
          {
            question: "¿Cómo permite Winerim escalar de 1 a 10 restaurantes?",
            options: [
              "Hay que comprar licencias nuevas",
              "Mismos KPIs, misma estructura, cambios centralizados a todos",
              "No es posible, hay que usar plataformas diferentes",
              "Requiere equipo IT dedicado"
            ],
            correct: 1
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
          "Feedback detallado por tema si no pasas",
          "Secciones: fundamentos (5 preguntas), servicio (5), nivel intermedio (10), especialista (10), director (10)",
          "Preguntas dinámicas: 60% teóricas, 40% prácticas (casos reales, decisiones)",
          "Retakes: si no pasas, puedes reintentar después de revisar materiales",
          "Certificado digital: emitido automáticamente si alcanzas 80%+, válido por 2 años",
          "Portfolio: certificado incluye resumen de fortalezas/áreas mejora para desarrollo continuo"
        ],
        content: "Esta evaluación final no es un test tradicional; es un assessment de competencia real en gestión de vinos. No memorizes; aplicás lo aprendido. Casos de estudio requieren tomar decisiones: 'Tu restaurante casual tiene 150 referencias con margen 45% pero rotación lenta. ¿Qué haces en 30 días?'.\n\nPreguntas teóricas (60%) cubren conceptos: tipos de vino, estructura de pirámide de precios, cálculo de márgenes, KPIs. Preguntas prácticas (40%) son escenarios: 'Trabajas en grupo de 8 locales, local A vende 10x más de una referencia. ¿Qué auditas?'.\n\nEvaluación es progresiva: secciones fáciles primero (fundamentos) para construir confianza, luego incrementa complejidad. Si pasas 80%+, recibes certificado digital válido 2 años. Incluye análisis de fortalezas (dónde brillaste) y áreas mejora (dónde fallaste).\n\nSi no pasas, no es fracaso: es diagnóstico. Sistema te dice exactamente qué revisar. Puedes reintentar después de 48h de estudio. Objetivo: que salgas habilitado a gestionar cartas de vino en cualquier contexto.",
        practicalExercise: "Antes del examen: revisa tus notas de 4 módulos. Haz 3 ejercicios prácticos: (1) crea una carta de 60 referencias desde cero para restaurante casual, (2) analiza datos de 4 semanas de un restaurante y propone 3 cambios, (3) diseña gobernanza para grupo 5 locales. Luego: toma examen final sin presión; enfoca en aplicar lógica, no memorizar.",
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
            question: "En una gobernanza de grupo de 10 restaurantes, ¿cuál es el KPI más importante a auditar mensualmente?",
            options: [
              "Que todos tengan la misma carta",
              "Desviaciones anormales entre locales (margen, rotación, referencias que funcionan diferente)",
              "Que todos vendan lo mismo",
              "Que no cambien la carta"
            ],
            correct: 1
          },
          {
            question: "Diseñas una carta para restaurante gastronómico. ¿Cuántas referencias y qué margen objetivo?",
            options: [
              "30-40 referencias, margen 50%",
              "60-80 referencias, margen 70%+",
              "150+ referencias, margen 40%",
              "Sin límite, más es mejor"
            ],
            correct: 1
          },
          {
            question: "Como director de grupo, detectas que local A tiene margen 45% y local B 65%. ¿Cuál es el siguiente paso?",
            options: [
              "Ignorar, variación normal",
              "Auditar merma, precios y promociones en local A; hay problema de gestión",
              "Unificar todos en 55% de promedio",
              "Cerrar local A, no es rentable"
            ],
            correct: 1
          }
        ]
      }
    ]
  }
];

export default coursesLibrary;
