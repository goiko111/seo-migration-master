export interface Article {
  slug: string;
  type: "interview" | "blog";
  category: string;
  title: string;
  subtitle: string;
  heroImage: string;
  secondaryImage?: string;
  name?: string;
  role?: string;
  body: string;
}

export const articles: Record<string, Article> = {
  "berta-romero": {
    slug: "berta-romero",
    type: "interview",
    category: "Entrevista",
    title: "\"No se trata de impresionar, sino de encontrar el vino que se adapte al momento, al plato y, sobre todo, a la persona.\"",
    subtitle: "Berta Romero, Directora y Sommelier en Restaurante Alameda",
    heroImage: "https://winerim.wine/wp-content/uploads/2025/08/80-1024x1024.png",
    secondaryImage: "https://winerim.wine/wp-content/uploads/2025/08/81-1024x1024.png",
    name: "Berta Romero",
    role: "Directora y Sommelier en Restaurante Alameda",
    body: `El vino no es solo una bebida. Es relato, es territorio, es memoria servida en cristal. Así lo vive **Berta Romero**, directora del restaurante Alameda (Granada), que ha hecho de cada copa una oportunidad para crear conexiones reales entre personas y lugares.

Formada en hostelería, protocolo y certificaciones como el WSET, Berta ha trazado un recorrido sólido por algunos de los restaurantes más reconocidos de Granada y Marbella. Desde el servicio y el maridaje en La Milla hasta su papel actual en Alameda, su trabajo es una suma de técnica, observación y sensibilidad.

En esta entrevista, nos habla del vino que le cambió la mirada —un blanco criado sobre lías, lleno de textura y complejidad— y de cómo, en su estilo como sumiller, prima la escucha, la cercanía y el respeto al paladar del comensal.

Defiende que el servicio es tan importante como el vino en sí, y desmonta con elegancia el viejo mito de que el tinto va con carne y el blanco con pescado. En su selección, brillan los godellos con crianza, las garnachas de altura y espumosos como _La Bota de Florpower MMXVIII_, que rompen moldes.

**1. ¿Cuál fue ese primer sorbo que te marcó y te hizo mirar el vino de otra manera?**

Fue un vino con crianza sobre lías que me reveló cómo el trabajo técnico puede dar lugar a una textura y complejidad sorprendentes. A partir de ahí, empecé a analizar el vino no solo por su sabor, sino por todo el proceso detrás de la copa.

**2. Dicen que el buen sommelier es más guía que juez. ¿Cómo definirías tu estilo a la hora de asesorar a alguien?**

Totalmente de acuerdo. Me gusta escuchar y observar antes de recomendar. No se trata de impresionar, sino de encontrar el vino que se adapte al momento, al plato y, sobre todo, a la persona. Mi estilo es cercano, curioso y respetuoso con todos los gustos.

**3. ¿Tienes algún ritual antes de una cata o servicio importante?**

Sí, preparo el espacio, reviso las referencias y me aseguro de que la temperatura, cristalería y decantación estén en condiciones óptimas.

**4. El lugar más insólito donde has vivido una cata inolvidable. ¿Qué lo hizo especial?**

Una cata técnica en bodega, en plena vendimia, con muestras directamente del depósito. Fue interesante por la inmediatez y por poder ver cómo evoluciona el vino desde etapas muy tempranas.

**5. ¿Qué está cambiando hoy en el mundo de la sumillería que hace 10 años habría parecido impensable?**

La visibilidad de la figura del sommelier fuera del restaurante, el uso de herramientas digitales para la gestión y el interés en aumento por vinos con poca intervención, que implican un enfoque distinto tanto en cata como en conservación.

**6. Selección del sommelier:**

– Blanco: Godello con crianza, por su equilibrio entre frescura y estructura.
– Tinto: Garnacha de altura, expresiva y versátil.
– Rosado: Rosado provenzal, elegante y gastronómico.
– Espumoso: Cava de paraje calificado, por su buena relación calidad-precio.
– Fortificado: Amontillado, por su complejidad y persistencia.
– De postre: Tokaji, por su intensidad aromática y equilibrio de acidez.

> "Un gran vino mal servido puede pasar desapercibido."

**7. Si alguien apenas empieza a beber vino, ¿qué consejo le darías para elegir uno que acompañe bien la comida?**

Empieza por lo que te gusta, no por lo que "deberías" beber. Una buena regla es equilibrar peso y sabor: platos ligeros con vinos frescos, platos intensos con vinos más estructurados. Y, por supuesto, preguntar al sommelier!

**8. ¿Qué importancia tiene el servicio del vino (temperatura, copas, decantación) en la experiencia del cliente?**

Es crucial. Un gran vino mal servido puede pasar desapercibido. La temperatura, el tipo de copa o decantar en el momento adecuado pueden transformar por completo la percepción del vino.

**9. Derriba un mito del vino o del maridaje que te gustaría desterrar para siempre.**

"Vino tinto con carne y blanco con pescado." Es una guía útil, pero limitada. Un blanco con crianza puede ir de maravilla con carnes, y hay tintos ligeros que son perfectos para platos de mar.

**10. ¿Qué cualidades hacen que un vino pase de "bueno" a "inolvidable" para ti?**

La emoción. Puedes tener técnica, equilibrio y complejidad, pero lo inolvidable llega cuando ese vino conecta contigo, con el momento, con un recuerdo o una sorpresa que no esperabas.

**11. En una cata informal con amigos, ¿qué pasos recomendarías para disfrutar del vino sin sentirse intimidados?**

No hay que saberlo todo. Prueba, escucha, comenta lo que percibes sin miedo. Empieza por la vista, sigue con el aroma y luego sabor, pero sin reglas estrictas. El vino es para disfrutarlo.

**12. El vino que más te ha sorprendido últimamente.**

La Bota de Florpower MMXVIII Más Ancestral, de Equipo Navazos. Un espumoso de Palomino Fino elaborado por método ancestral, con una frescura y expresión salina que rompen con lo esperado de la zona.

**13. El mejor vino que hayas probado en relación calidad-precio.**

Benje blanco, Tenerife. Un vino con una excelente expresión volcánica y precisión. Ofrece una complejidad que no es habitual en su gama.

> "Winerim me ofrece una herramienta práctica y ágil para gestionar referencias, agilizar pedidos y tener toda la información actualizada."

**14. ¿Carta de vinos tradicional o digital?**

Me inclino por la tradicional, porque genera una experiencia más cercana. Aunque la digital tiene muchas más ventajas operativas, el papel sigue siendo más intuitivo para muchos clientes.

**15. ¿Cómo te apoya Winerim en tu día a día como sommelier?**

Winerim me ofrece una herramienta práctica y ágil para gestionar referencias, agilizar pedidos y tener toda la información actualizada. Es una gran aliada para optimizar el tiempo.

**16. Un consejo breve pero duradero para cualquier amante del vino, ya sea experto o principiante.**

Probar sin prejuicios, comparar y seguir formándose. El vino se entiende mejor desde la práctica constante y la curiosidad.`,
  },

  "paco-martinez-ales": {
    slug: "paco-martinez-ales",
    type: "interview",
    category: "Entrevista",
    title: "\"Cada vez prima más la calidad del terroir y la uva, que la propia crianza\"",
    subtitle: "Paco Martínez Ales, Sommelier en Restaurante Antonio Zahara",
    heroImage: "https://winerim.wine/wp-content/uploads/2025/05/77-1024x1024.png",
    name: "Paco Martínez Áles",
    role: "Sommelier – Restaurante Antonio Zahara",
    body: `Desde Zahara de los Atunes, tierra de costa y carácter, Paco Martínez Ales representa una de las voces más frescas y prometedoras de la sumillería española. Aunque vinculado desde niño al mundo de la hostelería, fue hace cinco años cuando su curiosidad por el vino se transformó en una auténtica vocación.

Paco defiende un enfoque que comienza por ser "un buen profesional en la sala" y se complementa con una formación constante, humildad, y una capacidad especial para transmitir su entusiasmo al comensal. Apuesta por el equilibrio en los vinos y promueve maridajes que rompen mitos.

**1. ¿Cuándo empezó tu interés por el mundo del vino?**

Desde bien pequeño, he estado vinculado a la hostelería. Pero realmente desde hace unos 5 años es cuando me empezó a picar la curiosidad por el mundo del vino.

**2. ¿Qué cualidades debe tener un buen sommelier?**

Yo creo que es muy importante que primero sea un buen profesional en la sala. Y ya luego que sepa recomendar en todo momento al cliente el vino adecuado para cada ocasión.

**3. ¿Cuál es el lugar más singular en el que has asistido a una cata de vinos?**

Este año estuve visitando las bodegas Hacienda Monasterio y pude hacer una cata vertical de sus vinos, con el propio enólogo, en la terraza de la bodega con unas vistas espectaculares a los viñedos.

**4. ¿Cuáles son las tendencias del mundo de la sumillería actual?**

La tendencia ahora mismo se está inclinando para vinos ecológicos, también vinos cada vez menos alcohólicos y más ligeros. Y también cada vez prima más la calidad del terroir y la uva, que de la propia crianza.

**5. Selección del sommelier:**

- Vino Blanco: Finca Tronco Negro Viñedo Singular de Bodegas Valdelana
- Vino Tinto: Dalmau de bodegas Marqués de Murrieta
- Vino Rosado: Territorio Luthier Clarete de Guarda
- Espumoso: Llopart Ex-Vite Corpinnat
- Fortificado: Manzanilla en rama Pleamar de Bodegas César Florido
- Postre: Dulce de invierno de Bodegas Javier Sanz

> "La tendencia ahora mismo se está inclinando para vinos ecológicos, también vinos cada vez menos alcohólicos y más ligeros"

**6. ¿En qué debe fijarse una persona con poca experiencia?**

Lo primero que debe tener en cuenta es el tipo de comida que vaya a tomar, si hubiera sumiller en el restaurante pedirle consejo. Hoy en día tenemos aplicaciones o páginas web que te ayudan bastante a la elección del vino.

**7. Desmonta un mito del maridaje.**

Para el pescado sólo vino blanco y para la carne solo vino tinto. Un rodaballo a la brasa con una pinot noir joven o una perdiz escabechada con un albariño con crianza en madera, sería para mi gusto un buen maridaje.

**8. ¿Qué requisitos debe reunir un vino para ser un buen vino?**

Un equilibrio completo sería lo ideal. También pienso que es más importante la calidad que la cantidad.

**9. Pasos para catar un vino a nivel amateur:**

Primero me fijaría en el color. Posteriormente lo oleríamos a copa parada. Seguidamente moveríamos la copa con movimientos circulares y volveríamos a oler. Y para finalizar catamos el vino, dejándolo unos segundos en boca.

**10. El vino que más te haya sorprendido últimamente:**

Un vino blanco llamado Torralbenc de la isla de Menorca, una bodega que pertenece a Remirez de Ganuza.

**11. El mejor vino calidad-precio:**

Juan Valdelana Tinto de bodegas Valdelana en la Rioja.

> "Winerim ha sido un gran descubrimiento, y me ha facilitado el trabajo en un 200 %"

**12. ¿Carta de vino tradicional o digital?**

Yo siempre he sido gran defensor del formato papel. Pero si es verdad que la vida evoluciona. Yo en mi caso tengo los dos formatos.

**13. ¿De qué manera Winerim te ayuda?**

Ha sido un gran descubrimiento, y me ha facilitado el trabajo en un 200 %. Con Winerim ya tienen ahí una ayuda para elegir el vino deseado.

**14. Un consejo para cualquier amante del vino:**

Que salgan un poco de la zona confort de sus vinos clásicos y apuesten por pequeñas bodegas, D.O y zonas vitivinícolas desconocidas, que hay auténticas joyas en formato vínico.`,
  },

  "simone-monese": {
    slug: "simone-monese",
    type: "interview",
    category: "Entrevista",
    title: "\"El vino corona un momento de placer, y es bueno diversificar la experiencia para descubrir nuevas ideas y sensaciones.\"",
    subtitle: "Simone Monese, Sommelier en La Vecchia Griglia Sirmione",
    heroImage: "https://winerim.wine/wp-content/uploads/2025/06/74-1024x1024.png",
    secondaryImage: "https://winerim.wine/wp-content/uploads/2025/06/75-1024x1024.png",
    name: "Simone Monese",
    role: "Sommelier – La Vecchia Griglia, Sirmione",
    body: `Desde la barra de un bar musical en Desenzano hasta liderar la selección de más de 140 referencias en una de las trattorie más populares del lago de Garda, el recorrido de Simone Monese es una muestra de constancia silenciosa y profundo amor por el vino.

Formado en la sede AIS de Brescia y curtido en eventos privados ligados a Lugana DOC, Monese es hoy el responsable de la carta, los maridajes y el servicio de vinos en La Vecchia Griglia (Sirmione).

**1. ¿Cuándo empezó tu interés por el mundo del vino?**

Mi interés por el vino nació directamente en casa; vengo de una familia que ha hecho de la restauración su vida, y gracias a mis hermanos mayores fui educado, desde pequeño, al buen vino.

**2. ¿Qué cualidades debe tener un buen sommelier?**

Un buen sommelier debe ser muy empático y tener una mente abierta y flexible; comprender el contexto, el momento y la persona que tiene delante es fundamental.

**3. ¿Cuáles son las tendencias actuales?**

Sin duda, la búsqueda de productos alineados con la ética medioambiental; el sommelier también debe tener en cuenta el impacto que incluso una sola botella puede tener en el planeta.

**4. Selección del sommelier:**

- Vino blanco: Podere Concori "Concori Bianco IGT"
- Vino tinto: Tenuta San Leonardo 100% Carmenere
- Rosado: Chiar'Otto, Villa Calicantus, Bardolino DOC
- Espumoso: Champagne Tarlant "Zero"
- Vino generoso: Merlino 2007 Pojer & Sandri
- Vino de postre: Passito di Pantelleria "Bukkuram" Marco de Bartoli

> "Lo primero es entender lo que te dice la 'sed', en el sentido de deseo, y seguirla nunca es un error"

**5. Desmonta un mito del maridaje.**

Los espumosos combinan perfectamente con la carne, ¡así como los tintos ligeros con el pescado! El vino corona un momento de placer, y es justo experimentar con diversos maridajes.

**6. El vino que más te ha sorprendido:**

Terroir al Límit Terra de Cuques Blanc 2022 Priorat.

**7. El mejor vino calidad-precio:**

Arpepe "Il Pettirosso"

> "Winerim agiliza la búsqueda de información útil para estar siempre preparado para interactuar con el cliente."`,
  },

  "juan-perez-vidal": {
    slug: "juan-perez-vidal",
    type: "interview",
    category: "Entrevista",
    title: "\"La tendencia es hacia vinos más ligeros, con menos alcohol y de trago fácil\"",
    subtitle: "Juan Pérez Vidal, Sommelier en Vinoteca Jaleo",
    heroImage: "https://winerim.wine/wp-content/uploads/2025/04/68-1024x1024.png",
    secondaryImage: "https://winerim.wine/wp-content/uploads/2025/04/69-1024x1024.png",
    name: "Juan Pérez Vidal",
    role: "Sumiller – Vinoteca Jaleo",
    body: `Con una trayectoria marcada por la curiosidad, el esfuerzo y el amor por la gastronomía, Juan Pérez se ha consolidado como una figura destacada en la sumillería gallega. Actualmente al frente de la Vinoteca Jaleo.

Fue en el restaurante Árbore da Veira donde comprendió que el vino no solo acompaña, sino que transforma. Esa revelación lo llevó a profundizar en su formación, cursando el título de sumiller profesional en el Instituto Galego do Viño.

**1. ¿Cuándo empezó tu interés por el mundo del vino?**

Cuando comencé a trabajar en el restaurante Árbore da Veira empecé a entender que la comida y el vino debían ir de la mano. Ahí me entró una curiosidad tremenda acerca del vino.

**2. ¿Qué cualidades debe tener un buen sommelier?**

Sobre todo saber escuchar lo que el cliente busca. Tener la capacidad de, con una breve charla, poder ofrecer las mejores opciones, siempre con mucho respeto y humildad.

**3. Selección del sommelier:**

- Blanco: Ribeiras de Armea, de José Beade
- Tinto: Aliaxe Fabaiños, de Manuel Moldes
- Rosado: Rosete de Bodegas Cume do Avia
- Espumoso: Burbullas das Bateas, Bodegas Pombal
- Fortificado: Fino La Barajuela de Willy Pérez
- Postre: As Pasas dos Pasas, un tostado do Ribeiro

> "¿Un mito? El espumoso para el postre. Los espumosos suelen ser vinos muy versátiles para acompañar comidas de principio a fin."

**4. Un consejo para cualquier amante del vino:**

Disfrútenlo abiertamente, no le tengan miedo al vino, no hace falta saber ni conocer de vinos para disfrutarlo. Prueben, descubran y no se arrepentirán.

> "Siempre he sido un romántico de la carta en papel, pero he acabado reconociendo que el futuro pasa por la digitalización y la carta digital Winerim me ha ganado totalmente."`,
  },

  "nacho-otamendi": {
    slug: "nacho-otamendi",
    type: "interview",
    category: "Entrevista",
    title: "\"Vamos hacia una época dorada en nuestro país del vino blanco\"",
    subtitle: "Nacho Otamendi, propietario y sumiller de Travieso Bar",
    heroImage: "https://winerim.wine/wp-content/uploads/2025/03/65-1024x1024.png",
    name: "Nacho Otamendi",
    role: "Sumiller – Travieso Bar",
    body: `Para Nacho Otamendi, el vino no es solo una bebida, sino un universo de historias, matices y emociones. Su pasión por este mundo lo llevó a ponerse al frente de Travieso Bar, un espacio donde cada copa es una invitación a descubrir etiquetas sorprendentes.

Con una carta que supera las 150 referencias y una selección que supera 60 vinos por copas, Nacho ha convertido su bar en un auténtico santuario para los amantes del vino.

**1. ¿Cuándo empezó tu interés por el mundo del vino?**

Despertó mi interés gracias a mi padre a finales de los años 90, gran amante de la comida y la enología, con un paladar extraordinario.

**2. ¿Qué cualidades debe tener un buen sommelier?**

Tener los sentidos del olfato y del gusto bien entrenados. Ser un poco psicólogo. Tener habilidad de comunicación.

**3. Selección del sommelier:**

- Blanco: Tobia Blanco Gran Reserva 2016
- Rosado: Viña Tondonia Gran Reserva 2010
- Tinto: Bocapiedra 2020 de Terra D'art
- Espumoso: Clos Damiana 2009 de Cavas Mestres
- Fortificado: El Tresillo de Pepe Hidalgo
- Postre: Sofia Noble de Bodegas de Moya

> "Entre los grandes mitos del maridaje y los vinos, está la creencia de que los vinos tintos se beben siempre al natural, sin enfriar."

**4. Un consejo para cualquier amante del vino:**

Que investigue, se forme y experimente constantemente, aunque sea ilógico lo que pretende.

> "Para el modelo de mi negocio, Winerim resulta imprescindible para el mejor control de la bodega y facilitar el trabajo al personal de sala"`,
  },

  "periko-ortega": {
    slug: "periko-ortega",
    type: "interview",
    category: "Entrevista",
    title: "\"Hay un interés creciente por variedades autóctonas y por recuperar tradiciones olvidadas.\"",
    subtitle: "Periko Ortega, Chef y Sumiller de ReComiendo",
    heroImage: "https://winerim.wine/wp-content/uploads/2025/02/63-1024x1024.png",
    secondaryImage: "https://winerim.wine/wp-content/uploads/2025/02/64-1024x1024.png",
    name: "Periko Ortega",
    role: "Sumiller y chef – ReComiendo",
    body: `En el mundo de la alta cocina, pocos chefs logran capturar la esencia de la tradición y llevarla a un nivel de innovación como lo hace Periko Ortega. Nacido en Córdoba, viene de una familia unida a la gastronomía y al aceite de oliva.

En 2014 abre ReComiendo, su propio restaurante, donde la cocina de recuerdos se fusiona con las técnicas más vanguardistas. Su apuesta por la excelencia le ha valido numerosos reconocimientos, como el Sol Repsol y la distinción en la Guía Michelin.

**1. ¿Cuándo empezó tu interés por el mundo del vino?**

Mi interés por el vino comenzó hace muchísimos años en el Café de París de Málaga, cuando trabajaba con José Carlos García. Descubrí que el vino era mucho más que una bebida: era historia, cultura y pasión embotellada.

**2. Selección del sommelier:**

- Blanco: Toscalización de Bodegas El Monte
- Tinto: Chateau de Pibarnon (Bandol, Provenza)
- Rosado: Rocalima
- Espumoso: Umbretum 1810 de Bodegas Salado
- Fortificado: Singular Cask de Ximenium
- Postre: Dulce de Invierno de Vivanco

> "Un buen vino debe ser equilibrado, tener personalidad y contar una historia."

**3. Un consejo:**

Se aprende todos los días, se aprende practicando, y la práctica es muyyyyy divertida.

> "Hay que estar al día con las tecnologías, y el sistema Winerim me tiene enamorado."`,
  },

  "omar-oviedo": {
    slug: "omar-oviedo",
    type: "interview",
    category: "Entrevista",
    title: "\"Un buen vino debe tener equilibrio entre sus componentes, expresar su origen y mostrar autenticidad.\"",
    subtitle: "Omar Oviedo, sumiller en Oliva Nova Beach & Golf Resort",
    heroImage: "https://winerim.wine/wp-content/uploads/2025/01/61-1024x1024.png",
    secondaryImage: "https://winerim.wine/wp-content/uploads/2025/01/62-1024x1024.png",
    name: "Omar Oviedo",
    role: "Sumiller – Oliva Nova Beach & Golf Resort",
    body: `Omar Oviedo, sumiller de Oliva Nova Beach & Golf Resort. Su historia con el vino comenzó en el prestigioso grupo de Ricard Camarena en Valencia, donde descubrió la magia del maridaje.

Su proyecto personal, Winetleman, es otro claro reflejo de su amor por el sector. Omar trabaja como consultor, asesorando a restaurantes y hoteles.

**1. ¿Cuándo empezó tu interés por el mundo del vino?**

Mi interés por el vino comenzó en mi adolescencia. Fue trabajando en la alta restauración y gracias a buenos mentores que me ayudaron a descubrir el verdadero arte que hay detrás de cada botella.

**2. Selección del sommelier:**

- Blanco: Tocando el Cielo
- Tinto: Alto Moncayo Veratón
- Rosado: Aurora de Espiells
- Espumoso: Raventos i Blanc Blanc de Blancs
- Fortificado: Un buen Jerez Amontillado
- Postre: Origen de Oscar Mestre

> "Hay tintos ligeros que combinan de maravilla con pescados grasos, y blancos con cuerpo que destacan con carnes blancas."

**3. Un consejo:**

Nunca dejes de explorar. Cada botella es un mundo, y probar vinos de diferentes regiones, estilos y bodegas enriquece tu conocimiento y disfrute.

> "Winerim permite a los clientes explorar cada vino en detalle y agiliza el servicio"`,
  },

  "david-paredes": {
    slug: "david-paredes",
    type: "interview",
    category: "Entrevista",
    title: "\"Lo más importante es transmitir la pasión y el amor por los vinos al cliente.\"",
    subtitle: "David Paredes, sumiller en Mesón las Duelas",
    heroImage: "https://winerim.wine/wp-content/uploads/2024/11/58-1024x1024.png",
    name: "David Paredes",
    role: "Sumiller – Mesón las Duelas, Algeciras",
    body: `David Paredes, sumiller en Mesón las Duelas y uno de los 100 mejores sumilleres de España según el prestigioso certamen Top 100 Sommeliers.

David destaca por su capacidad de transmitir pasión y conocimiento sobre el vino de manera empática y humilde, cualidades que considera esenciales para cualquier sumiller.

**1. ¿Cuándo empezó tu interés por el mundo del vino?**

A nivel usuario, hace unos 15 años, en el restaurante que actualmente trabajo, Mesón Las Duelas. Recuerdo que Alberto, su dueño, me guiaba y recomendaba vinos de la zona de Cádiz.

**2. Selección del sommelier:**

- Blanco: Rioja blanco de Roda I
- Tinto: Duo Grand Cru, AOC Saint Emilion
- Rosado: Le Rosé, de Bodegas Antídoto
- Espumoso: Champagne de Olivier Martieux
- Fortificado: Carvajal en Rama
- Postre: Chateau de Fargues, Lur Saluces

> "Los Espumosos y los Jereces sólo me los tomaría para el aperitivo. Es un mito que hay que eliminarlo ya."

**3. Un consejo:**

Ten respeto por los que elaboran el vino o te lo recomiendan, porque detrás hay muchísimo trabajo e historia.

> "Winerim es un compañero más. Te ayuda a facilitar la vida al cliente, y a ti mismo"`,
  },

  "alex-pardo": {
    slug: "alex-pardo",
    type: "interview",
    category: "Entrevista",
    title: "\"La cata de vinos está evolucionando para conocer y probar otras cepas y estilos\"",
    subtitle: "Álex Pardo, mejor sumiller de España 2023 – Restaurante Coque**",
    heroImage: "https://winerim.wine/wp-content/uploads/2024/10/Un-vaso-de-vino-en-el-momento-oportuno-vale-mas-que-todas-las-riquezas-de-la-tierra-19-1024x1024.png",
    name: "Álex Pardo",
    role: "Mejor Sumiller de España 2023 – Restaurante Coque**",
    body: `Coronado como el Mejor Sumiller de España en 2023, Pardo ha convertido la experiencia del vino en una combinación de conocimiento, innovación y pasión. Actualmente dirige un equipo de sumilleres en Coque con más de 2.500 referencias.

**1. ¿Cuándo empezó tu interés?**

Desde que era un niño en el restaurante de mi familia. Allí comencé a interesarme por el vino y allí diseñé mi primera carta de vinos.

**2. Selección del sommelier:**

- Blanco: Un Borgoña de Meursault, de Vincent Girardin
- Tinto: Alma de Luzón, Jumilla
- Rosado: Miraval Rosé de Provenza
- Fortificado: Apóstoles VORS de González Byass
- Postre: Ariyanas Naturalmente Dulce de Bentómiz

> "Cava o Champagne y tarta de cumpleaños…un maridaje malísimo"

**3. Un consejo:**

No hace falta saber de vino para disfrutar de él.

> "Con Winerim no hay que imprimir, permite tener la carta actualizada siempre, me ayuda a gestionar los stocks, compras y ventas"`,
  },

  "daniel-ramos": {
    slug: "daniel-ramos",
    type: "interview",
    category: "Entrevista",
    title: "\"Para mí, un buen sumiller debe tener las mismas cualidades que una buena persona\"",
    subtitle: "Daniel Ramos, sommelier y responsable de formación en Vinófilos",
    heroImage: "https://winerim.wine/wp-content/uploads/2024/09/Un-vaso-de-vino-en-el-momento-oportuno-vale-mas-que-todas-las-riquezas-de-la-tierra-17-1024x1024.png",
    secondaryImage: "https://winerim.wine/wp-content/uploads/2024/09/53-1024x1024.png",
    name: "Daniel Ramos",
    role: "Sommelier y responsable de formación – Vinófilos",
    body: `Daniel Ramos, un auténtico maestro del vino y figura destacada en el panorama enológico español. Nacido en Sevilla, ha forjado su camino desde los fogones hasta las más altas esferas de la sumillería.

Su trayectoria va desde la Escuela de Hostelería de Sevilla, pasando por su trabajo junto a Ferran Adrià en el Bulli Hotel Hacienda Benazuza.

**1. ¿Cuándo empezó tu interés por el mundo del vino?**

En el año 93, cuando uno de mis profesores nos explicó cómo se elaboraba el vino, me pareció algo mágico y despertó toda mi curiosidad.

**2. Selección del sommelier:**

- Blanco: Domaine Vincent Pinard Nuance 2022 Sancerre
- Tinto: Valentín Zusslin Pinot Noir Ophrys 2021 Alsace
- Rosado: Bendito Destino Clarete 2021 Ribera del Duero
- Espumoso: Recaredo Bufadors Vinya del Rascarà 2015
- Fortificado: La Barajuela Palma Cortada 2017 Jerez
- Postre: Carrascal 2014 Jerez – Pedro Ximénez

> "Tenemos la tendencia de tomar vinos muy potentes y maderizados con quesos muy viejos. La sal y el tanino maderizado no son los mejores amigos."

**3. Un consejo:**

El amor es dar y, si es con un buen vino mediante, mejor.

> "Las cartas digitales nos pueden dar infinitas posibilidades y en el caso de Winerim más aún por tratarse de algo mucho más allá que una simple carta digital"`,
  },

  "xavi-nolla": {
    slug: "xavi-nolla",
    type: "interview",
    category: "Entrevista",
    title: "\"La sumillería actual busca vinos sinceros y sin complejos\"",
    subtitle: "Xavi Nolla, sommelier y fundador de enoAula",
    heroImage: "https://winerim.wine/wp-content/uploads/2024/06/50-1-1024x1024.png",
    name: "Xavi Nolla",
    role: "Sommelier, fundador de enoAula y asesor",
    body: `Xavi Nolla, un destacado sommelier y apasionado del mundo del vino cuya carrera es un testimonio de dedicación y excelencia. Con certificaciones del programa WSET de Londres y formador homologado del Vino de Jerez y del Cava.

**1. Un consejo:**

Es imprescindible estar formado para entender la esencia, concepto y sentido del vino.`,
  },

  "joan-guso": {
    slug: "joan-guso",
    type: "interview",
    category: "Entrevista",
    title: "\"En una cata, es importante el diálogo con uno mismo y la experiencia en soledad sin interrupciones\"",
    subtitle: "Joan Gusó, Propietario de Mas Gusó y sumiller",
    heroImage: "https://winerim.wine/wp-content/uploads/2024/05/Joan-Guso-1-1024x1024.jpg",
    name: "Joan Gusó",
    role: "Propietario y sumiller – Mas Gusó",
    body: `Joan Gusó es toda una figura destacada en el ámbito de la gastronomía y la enología. Es el propietario del reconocido restaurante Mas Gusó, un lugar que se ha convertido en un referente para los amantes del buen vino.

**1. Un consejo:**

Con el vino, es importante el diálogo con uno mismo y la experiencia en soledad sin interrupciones.`,
  },

  "alex-peiro": {
    slug: "alex-peiro",
    type: "interview",
    category: "Entrevista",
    title: "\"Cada vez se busca apoyar más vinos de pequeños vignerons y de máxima expresión del Terroir.\"",
    subtitle: "Álex Peiró, Sumiller en Restaurante Casamar",
    heroImage: "https://winerim.wine/wp-content/uploads/2024/03/Un-vaso-de-vino-en-el-momento-oportuno-vale-mas-que-todas-las-riquezas-de-la-tierra-11-1024x1024.jpg",
    name: "Álex Peiró",
    role: "Sommelier – Restaurante Casamar",
    body: `Originario de Palafrugell, Àlex Peiró tiene el restaurante en la sangre desde pequeño. Hoy en día es el responsable de elevar la experiencia gastronómica del comensal en el Restaurante Casamar.

**1. Un consejo:**

No perdáis nunca la curiosidad por probar vinos desconocidos.`,
  },

  "un-consejo-cata-con-el-corazon": {
    slug: "un-consejo-cata-con-el-corazon",
    type: "interview",
    category: "Entrevista",
    title: "\"Debemos transmitir la pasión por el vino, con naturalidad y de manera humilde\"",
    subtitle: "Xavier Valenzuela, Sumiller de Forat 19",
    heroImage: "https://winerim.wine/wp-content/uploads/2024/02/Un-vaso-de-vino-en-el-momento-oportuno-vale-mas-que-todas-las-riquezas-de-la-tierra-7-1024x1024.jpg",
    name: "Xavier Valenzuela",
    role: "Responsable de maridaje – Forat 19",
    body: `En el mundo del vino, el sumiller se forja desde la humildad de sus inicios. Xavier Valenzuela transmite cada día esos conocimientos a sus comensales desde Forat 19.

**1. Un consejo:**

Cata con el corazón.`,
  },

  "un-consejo-apreciar-lo-bien-hecho": {
    slug: "un-consejo-apreciar-lo-bien-hecho",
    type: "interview",
    category: "Entrevista",
    title: "\"La sumillería debe hacer que la experiencia gastronómica sea algo que el cliente recuerde durante mucho tiempo\"",
    subtitle: "Jorge Soto, Sumiller de Cocinandos*",
    heroImage: "https://winerim.wine/wp-content/uploads/2023/03/Fotos-para-Web-Winerim.jpg",
    name: "Jorge Soto",
    role: "Sumiller – Cocinandos*",
    body: `Jorge Soto, sumiller de Cocinandos*, responsable de que el maridaje sea una experiencia única para el comensal.

**1. Un consejo:**

Que nunca deje de apreciar y valorar lo bien hecho, porque así tendremos cada vez mejores vinos.`,
  },

  "un-consejo-salirnos-de-nuestra-zona-de-confort": {
    slug: "un-consejo-salirnos-de-nuestra-zona-de-confort",
    type: "interview",
    category: "Entrevista",
    title: "\"Un buen sumiller debe tener humildad, mucha cultura del vino y saber qué le apetece al cliente\"",
    subtitle: "Manuel Cla, Head Sommelier – Paladar by Zuriñe García",
    heroImage: "https://winerim.wine/wp-content/uploads/2023/02/Manuel-Cla.jpg",
    name: "Manuel Cla",
    role: "Head Sommelier – Paladar by Zuriñe García, Hotel Boutique Puente Colgante",
    body: `Manuel Cla es Head Sommelier del Paladar by Zuriñe García, el restaurante ubicado en el Hotel Boutique Puente Colgante.

**1. Un consejo:**

¡Hay que probar y salirnos de nuestra zona de confort y, por supuesto, compartir!`,
  },

  "un-consejo-prueba-vinos-nuevos": {
    slug: "un-consejo-prueba-vinos-nuevos",
    type: "interview",
    category: "Entrevista",
    title: "\"Amante del vino, no te limites a disfrutar siempre de los mismos vinos\"",
    subtitle: "Elisa Barroso, sumiller de Sport Hotel Hermitage & Spa",
    heroImage: "https://winerim.wine/wp-content/uploads/2022/12/4.jpg",
    name: "Elisa Barroso",
    role: "Sumiller – Sport Hotel Hermitage & Spa, Mejor Sumiller de Cataluña XIX Nariz de Oro",
    body: `Algunas de las mejores y más selectas bodegas del mundo se encuentran en Sport Hotel Hermitage & Spa. Y, al frente de su bodega encontramos a Elisa Barroso, reconocida con mejor sumiller de Cataluña en la XIX edición de La Nariz de Oro.

**1. Un consejo:**

Prueba vinos nuevos, de otros estilos.`,
  },

  "un-consejo-descorchar-probar-compartir": {
    slug: "un-consejo-descorchar-probar-compartir",
    type: "interview",
    category: "Entrevista",
    title: "\"El mejor vino es aquel que está para disfrutar y compartir\"",
    subtitle: "Alberto Rodríguez, sumiller de En la Parra",
    heroImage: "https://winerim.wine/wp-content/uploads/2022/11/Alberto-2-1024x1024.jpeg",
    name: "Alberto Rodríguez",
    role: "Responsable de carta de vinos – En la Parra",
    body: `Si algo caracteriza al restaurante En la Parra es su minuciosa selección en cada uno de los productos que ofrece. Este restaurante cuenta desde 2021 con una Estrella Michelin. Al frente de la bodega se encuentra Alberto Rodríguez.

**1. Un consejo:**

Descorchar, probar, compartir.`,
  },

  // Blog articles
  "como-mejorar-la-experiencia-del-cliente-en-un-restaurante": {
    slug: "como-mejorar-la-experiencia-del-cliente-en-un-restaurante",
    type: "blog",
    category: "Estrategia",
    title: "Cómo mejorar la experiencia del cliente en un restaurante",
    subtitle: "",
    heroImage: "https://winerim.wine/wp-content/uploads/2025/08/experiencia-cliente-restaurante-01.jpg",
    body: `Imagina una mesa ocupada en pleno sábado noche. El comedor está lleno, la cocina saca platos sin parar y el ambiente es el que esperabas. El cliente hojea la carta, observa el espacio, intercambia miradas con el camarero. Todo parece ir bien, pero hay algo que no termina de conectar.

Este tipo de situaciones suceden a diario en cientos de restaurantes. **La experiencia del cliente** no se basa solo en lo que se sirve en el plato. Está en cómo se recibe al comensal, cómo se responde a una duda, cómo se gestionan los tiempos, cómo se presentan las opciones y en cómo se ofrece el vino, el postre, o el café.

## ¿Qué es la experiencia del cliente en un restaurante?

Cuando hablamos de experiencia del cliente en un restaurante, nos referimos a todo lo que el cliente percibe, siente y recuerda desde que cruza la puerta hasta que abandona el local.

Cada detalle suma o resta:
- La agilidad con la que se toma el pedido
- El tono con el que se responde a una duda
- La forma en que se sirve el agua o el pan
- El tiempo de espera entre platos
- La limpieza del baño cuando lo visita
- El gesto de despedida cuando paga la cuenta

## ¿Por qué es tan importante?

### Impacta directamente en las valoraciones y la reputación

Hoy, la reputación de un restaurante se construye principalmente a través de las valoraciones online. Una buena experiencia genera comentarios espontáneos y reseñas positivas.

### Mejora la fidelización y la repetición

Un cliente que repite, gasta más. Se siente cómodo, confía en el equipo y está más abierto a dejarse guiar.

### Aumenta el ticket medio sin esfuerzo

Cuando el cliente se siente bien atendido y entiende lo que está pidiendo, está dispuesto a confiar. Y cuando confía, compra mejor.

## Cómo mejorar la experiencia

### Cuida los momentos de decisión

En cada servicio hay momentos determinantes donde el cliente tiene que tomar una decisión. La clave está en anticiparse.

### Forma al equipo en atención y empatía

Un camarero que sabe decir "este vino blanco es muy fresco, va genial con el plato que has pedido" aporta valor, genera confianza y mejora la experiencia.

### Reduce tiempos de espera y errores

Cuando el servicio fluye, el cliente lo nota. No porque sea espectacular, sino porque no hay interrupciones, ni dudas, ni incomodidades innecesarias.

### La carta también forma parte de la experiencia

Una carta que no guía, que no explica, que no responde a lo que el cliente necesita en ese momento, no es solo una oportunidad de venta perdida. Es una experiencia incompleta.

## Cómo Winerim mejora la experiencia del cliente

Winerim nace precisamente para resolver ese problema y para convertir la carta de vinos en una herramienta que mejora, de forma directa, la experiencia del cliente. Es una solución diseñada desde dentro del sector.

### La carta de vinos deja de ser un obstáculo

Winerim convierte la carta en una interfaz visual, clara y filtrable que el cliente puede explorar desde una tablet o desde su propio móvil.

### Siempre actualizada, siempre disponible

Cada vez que una referencia se agota, se puede marcar como "no disponible" con un solo clic, y automáticamente desaparece de la carta digital.

### Recomendaciones que acompañan sin presionar

Las sugerencias inteligentes de vino, adaptadas al contexto. Es como tener un sommelier digital en la mesa.

[**Solicita tu demo gratuita hoy mismo**](/demo) y descubre cómo transformar tu carta de vinos.`,
  },

  "ia-para-restaurantes-las-mejores-aplicaciones": {
    slug: "ia-para-restaurantes-las-mejores-aplicaciones",
    type: "blog",
    category: "Tecnología",
    title: "IA para restaurantes: las mejores aplicaciones",
    subtitle: "",
    heroImage: "https://winerim.wine/wp-content/uploads/2025/07/Iia-para-restaurantes-las-mejores-aplicaciones-01.jpg",
    body: `La **IA para restaurantes** está siendo acogida por cada vez más negocios del sector. Desde pequeños locales, hasta grandes grupos de restauración, están incorporando herramientas basadas en inteligencia artificial para ganar eficiencia, mejorar la experiencia del cliente y optimizar sus operaciones.

## Atención al cliente

### Slang.ai
Un agente virtual diseñado para atender llamadas en restaurantes. Funciona 24/7 y gestiona reservas, responde preguntas frecuentes, o redirige a los clientes.

### Aivo AgentBot
Chatbot conectado a IA que permite interactuar con clientes a través de múltiples canales: web, WhatsApp, Instagram, Facebook Messenger.

### ConnexAI
Plataforma que integra todos los canales de comunicación para una visión centralizada de las interacciones con el cliente.

## Eficiencia operativa

### Bronze
Herramienta que utiliza visión por computador e IA para verificar la precisión de los pedidos en cocina.

### CoverManager
Plataforma que emplea IA y machine learning para anticipar la demanda de reservas y gestionar turnos de personal.

## Marketing y experiencia del cliente

### Astral Restaurant Systems
Plataforma que combina IA y automatización para gestionar la comunicación entre el restaurante y sus clientes.

## Winerim: una IA para restaurantes específicamente para el vino

Winerim ha desarrollado una inteligencia artificial especializada en vino, entrenada para comprender lo que hay detrás de cada etiqueta y convertir la carta en una herramienta de venta.

### Funcionalidades clave:
- Recomendaciones inteligentes y adaptativas
- Maridaje automático en base a cada plato
- Redacción automática de notas de cata
- Filtros sensoriales para facilitar la búsqueda
- Comparador técnico de vinos
- Rotación automatizada de vinos destacados
- Alta de vinos casi instantánea

Los restaurantes que utilizan Winerim han reportado **incrementos de hasta un 30% en la facturación de vino**.

[**Solicita tu demo gratuita hoy mismo**](/demo) y descubre cómo transformar tu carta de vinos en una herramienta de venta inteligente, visual y rentable.`,
  },

  "como-hacer-una-carta-de-vinos-perfecta-para-tu-restaurante": {
    slug: "como-hacer-una-carta-de-vinos-perfecta-para-tu-restaurante",
    type: "blog",
    category: "Guía",
    title: "Cómo hacer una carta de vinos perfecta para tu restaurante",
    subtitle: "",
    heroImage: "https://winerim.wine/wp-content/uploads/2025/06/como-hacer-una-carta-de-vinos-perfecta-para-tu-restaurante-01.jpg",
    body: `Tienes una buena selección de vinos. Has elegido referencias con criterio, equilibradas en estilos, zonas y precios. Sin embargo, **la mayoría de los clientes pide siempre lo mismo**. O peor, directamente no pide vino. ¿Qué está fallando?

La carta de vinos no es solo una lista. Es la herramienta principal que determina si un cliente pide vino o no, qué vino elige y cuánto está dispuesto a gastar. Es el punto de encuentro entre tu bodega y la experiencia del comensal.

## Los errores más comunes

- Carta demasiado extensa sin estructura clara
- Falta de descripciones o notas de cata
- No incluir sugerencias de maridaje
- Precios poco equilibrados
- No actualizar las referencias agotadas

## Claves para una carta perfecta

### 1. Estructura clara y lógica
Organiza por tipo de vino, luego por región o estilo. El cliente debe poder navegar sin esfuerzo.

### 2. Descripciones que ayuden a decidir
Cada vino debería tener una breve nota que explique su estilo, sin tecnicismos innecesarios.

### 3. Sugerencias de maridaje
Vincular vinos con platos de tu carta elimina la duda del cliente y aumenta la conversión.

### 4. Rotación y actualización
Una carta viva genera interés. Destaca novedades, temporada, o selecciones del sommelier.

## Cómo Winerim puede ayudarte

Winerim te permite crear, gestionar y actualizar tu carta de vinos en tiempo real, con descripciones generadas por IA, filtros sensoriales y maridajes automáticos.

[**Solicita tu demo gratuita**](/demo)`,
  },

  "por-que-los-jovenes-no-beben-vino-en-los-restaurantes": {
    slug: "por-que-los-jovenes-no-beben-vino-en-los-restaurantes",
    type: "blog",
    category: "Tendencias",
    title: "¿Por qué los jóvenes no beben vino en los restaurantes?",
    subtitle: "",
    heroImage: "https://winerim.wine/wp-content/uploads/2025/05/por-que-los-jovenes-no-beben-vino-en-los-restaurantes-01.jpg",
    body: `Estás en un restaurante lleno de mesas ocupadas por gente joven. Ríen, hacen stories, comentan lo que están comiendo. Todo parece funcionar. Hasta que miras las copas.

Gin-tonic con rodajas de pepino. Cervezas artesanas. Spritz. Agua con gas. **No hay vino.**

**El vino ha perdido protagonismo en las mesas de los restaurantes entre los menores de 40.** Y no hablamos únicamente de cifras. Hablamos de una desconexión real entre una generación y una categoría de producto.

## ¿Por qué los jóvenes ya no piden vino?

### 1. El vino se percibe como algo complejo y elitista
Muchos jóvenes asocian el vino con un mundo de normas, tecnicismos y rituales que no encajan con su forma natural de consumir.

### 2. La carta de vinos no habla su idioma
Cartas extensas, sin imágenes, sin descripciones comprensibles. El joven no se siente acompañado.

### 3. Falta de formación del equipo de sala
Si el camarero no puede guiar con naturalidad, el joven elige lo seguro: cerveza o cocktail.

### 4. La experiencia visual importa
Las nuevas generaciones consumen con los ojos. Un gin-tonic en copa balón o una cerveza artesana con buena etiqueta ganan en presentación.

## ¿Cómo reconectar a los jóvenes con el vino?

### Hacer la carta accesible y visual
Con descripciones claras, imágenes y filtros que permitan buscar por estilo o sensación.

### Ofrecer vinos por copas
Reducir la barrera de entrada. Una copa permite explorar sin compromiso.

### Usar la tecnología como aliada
Una carta digital interactiva como Winerim permite al joven explorar a su ritmo.

### Contar historias
Los jóvenes valoran la autenticidad. Bodegas pequeñas, vinos naturales, orígenes únicos.

## Winerim: la solución

Winerim transforma la carta de vinos en una experiencia visual, intuitiva e interactiva que conecta con las nuevas generaciones.

[**Solicita tu demo gratuita**](/demo)`,
  },
  },

  // ── BOFU cluster ──────────────────────────────────────────────

  "mejor-software-carta-vinos-restaurante": {
    slug: "mejor-software-carta-vinos-restaurante",
    type: "blog",
    category: "Software",
    title: "Mejor software para carta de vinos de restaurante en 2025",
    subtitle: "Análisis de las opciones disponibles, qué debe incluir un buen software de carta de vinos y cómo elegir según tu tipo de local.",
    heroImage: "/src/assets/blog/carta-rentabilidad.jpg",
    body: `¿Tu carta de vinos sigue siendo un PDF estático o una hoja de cálculo? En 2025, gestionar la carta con herramientas genéricas es perder dinero, tiempo y oportunidades de venta.

## Qué es un software de carta de vinos

Un software de carta de vinos es una herramienta digital diseñada específicamente para que restaurantes gestionen, presenten y optimicen su oferta de vinos. No es un menú digital genérico: es una solución vertical que entiende pricing, rotación, maridajes y stock vinícola.

**En resumen:** es la diferencia entre una carta que informa y una carta que vende.

## Qué debe incluir un buen software de carta de vinos

No todos los softwares son iguales. Estos son los criterios mínimos para que la inversión tenga retorno:

| Funcionalidad | Por qué importa |
|---|---|
| Carta digital interactiva | El cliente explora, filtra y descubre vinos sin depender del camarero |
| Gestión de stock en tiempo real | Evita recomendar vinos agotados y controla la inversión en bodega |
| Pricing dinámico | Calcula márgenes, detecta desfases y sugiere ajustes |
| Maridajes automáticos | Conecta cada plato con vinos relevantes sin necesidad de sumiller |
| Analítica de ventas | Saber qué se vende, qué no rota y dónde están las oportunidades |
| Formación para sala | Fichas de producto y frases de venta para el equipo |

## Tipos de solución disponibles

### 1. Menús digitales genéricos
Herramientas como QR menú o apps de carta digital que no distinguen entre un postre y un Gran Reserva. Sirven para mostrar, no para vender vino.

**Limitación:** sin funcionalidades específicas de vino (maridajes, rotación, pricing por copa, stock).

### 2. Software de gestión de bodega / inventario
Herramientas de control de stock que gestionan entradas y salidas, pero no tienen capa de venta ni experiencia de cliente.

**Limitación:** gestión interna sin impacto en la facturación.

### 3. Software especializado en carta de vinos
Soluciones verticales como Winerim que integran la gestión (stock, pricing, rotación) con la venta (carta digital, maridajes, recomendaciones) y la analítica (KPIs, rendimiento por referencia).

**Ventaja:** cubren todo el ciclo del vino en el restaurante.

## Cómo elegir según tu tipo de local

- **Casual / gastrobar (15-25 referencias):** necesitas simplicidad y copa bien gestionada. Prioriza maridajes automáticos y control de merma.
- **Restaurante medio (25-50 referencias):** necesitas analítica de rendimiento y pricing. El equipo de sala debe tener fichas de producto accesibles.
- **Fine dining (50+ referencias):** necesitas profundidad en la carta digital, gestión de bodega avanzada y experiencia premium para el comensal.
- **Grupos de restauración:** necesitas visibilidad multi-local, benchmarking y control centralizado de surtido.

## Por qué Winerim es la referencia en software de carta de vinos

Winerim es el único software del mercado que integra carta digital interactiva, gestión de stock, pricing dinámico, maridajes por IA, formación de equipo y analítica avanzada en una sola plataforma.

No es un menú digital con extras. Es un sistema de gestión y venta de vino diseñado desde dentro del sector.

## Preguntas frecuentes

**¿Un software de carta de vinos sustituye al sumiller?**
No sustituye la interacción humana, pero sí automatiza las tareas analíticas (selección, pricing, rotación) y potencia la recomendación en sala.

**¿Cuánto cuesta un software de carta de vinos?**
Depende de la solución. Los menús digitales genéricos cuestan entre 20-50€/mes pero no ofrecen funcionalidades de vino. Las soluciones especializadas como Winerim tienen planes adaptados al tamaño del local.

**¿Necesito conocimientos técnicos para usarlo?**
No. Winerim está diseñado para hosteleros, no para informáticos. La implementación es guiada y el equipo puede empezar a usarlo desde el primer día.

**¿Funciona para restaurantes con pocas referencias?**
Sí. De hecho, los restaurantes con 15-30 referencias son los que más se benefician, porque cada vino debe rendir al máximo.

---

→ [Solicitar demo gratuita de Winerim](/demo)
→ [Analizar mi carta de vinos gratis](/analisis-carta)
→ [Ver funcionalidades completas](/funcionalidades)
→ [Comparativa: Winerim vs carta PDF](/comparativa/winerim-vs-carta-pdf-vinos)`,
  },

  "alternativa-carta-pdf-vinos-restaurante": {
    slug: "alternativa-carta-pdf-vinos-restaurante",
    type: "blog",
    category: "Software",
    title: "Alternativa a la carta PDF de vinos: por qué tu restaurante necesita algo mejor",
    subtitle: "El PDF fue útil durante la pandemia. En 2025, es un freno para las ventas de vino. Analizamos las alternativas reales.",
    heroImage: "/src/assets/blog/digital-vs-tradicional.jpg",
    body: `La carta en PDF fue la solución de emergencia durante 2020. Cinco años después, muchos restaurantes siguen usándola como solución definitiva. Y eso tiene un coste directo en ventas de vino.

## El problema con la carta PDF de vinos

El PDF no fue diseñado para vender vino. Fue diseñado para compartir documentos. Cuando lo usas como carta de vinos, esto es lo que pasa:

- **No es navegable:** el cliente hace scroll por un documento plano sin filtros, sin categorías, sin ayuda.
- **No tiene maridajes:** el comensal no sabe qué vino pedir con su plato.
- **No se actualiza en tiempo real:** cuando un vino se agota, sigue visible en el PDF hasta que alguien lo edite manualmente.
- **No genera datos:** no sabes cuántos clientes lo abren, qué vinos miran o dónde abandonan.
- **No vende:** informa, pero no recomienda, no guía, no convierte.

**En resumen:** un PDF es una lista. No es una herramienta de venta.

## Qué alternativas existen

### 1. Carta impresa tradicional
Ventaja: experiencia táctil, percepción premium.
Limitación: no se actualiza, no tiene maridajes dinámicos, coste de impresión cada vez que cambias algo.

### 2. Menú digital genérico (QR → web)
Ventaja: se actualiza fácilmente, accesible desde el móvil.
Limitación: diseñado para menús de comida, no entiende de vinos. Sin maridajes, sin filtros por estilo, sin pricing inteligente.

### 3. Carta digital especializada en vinos (Winerim)
Ventaja: diseñada desde cero para vender vino. Filtros por estilo, maridajes por plato, descripciones accesibles, stock en tiempo real, recomendaciones por IA.
Limitación: requiere un cambio de mentalidad (de "informar" a "vender").

## Comparativa rápida

| Criterio | PDF | QR genérico | Winerim |
|---|---|---|---|
| Navegación y filtros | ✗ | Básica | Completa |
| Maridajes automáticos | ✗ | ✗ | ✓ |
| Stock en tiempo real | ✗ | ✗ | ✓ |
| Analítica de uso | ✗ | Básica | Avanzada |
| Pricing dinámico | ✗ | ✗ | ✓ |
| Formación de equipo | ✗ | ✗ | ✓ |
| Coste de mantenimiento | Bajo | Bajo | Medio |
| Impacto en ventas | Nulo | Bajo | Alto |

## Cuándo tiene sentido seguir con PDF

Seamos honestos: el PDF puede tener sentido en casos muy concretos:
- Restaurantes con menos de 10 referencias que cambian muy poco.
- Locales donde la carta se entrega en mano y el camarero guía personalmente.
- Negocios sin intención de optimizar la venta de vino.

Si tu restaurante no encaja en estos perfiles, el PDF te está costando ventas.

## Cómo migrar del PDF a una carta inteligente

1. **Sube tu carta actual a Winerim:** en 24h tendrás tu carta digital con maridajes, filtros y descripciones.
2. **Genera el QR:** coloca el QR en las mesas como ya hacías con el PDF.
3. **Forma al equipo:** 15 minutos de briefing para que sepan explicar el cambio a los clientes.
4. **Mide:** en una semana tendrás datos reales de qué vinos se consultan, cuáles se piden y cuáles se ignoran.

## Preguntas frecuentes

**¿Los clientes prefieren el PDF porque ya están acostumbrados?**
Los clientes no prefieren el PDF. Prefieren encontrar rápido un buen vino. Si la alternativa es mejor, la adoptan inmediatamente.

**¿Perderé la experiencia "premium" del papel?**
Una carta digital bien diseñada transmite más profesionalidad que un PDF genérico. Y puedes mantener la carta impresa para quien la prefiera.

**¿Cuánto tardo en migrar?**
Con Winerim, menos de 48 horas. Subes tu carta, se genera la versión digital y compartes el QR.

---

→ [Solicitar demo gratuita](/demo)
→ [Comparativa completa: Winerim vs PDF](/comparativa/winerim-vs-carta-pdf-vinos)
→ [Ver funcionalidades de la carta digital](/funcionalidades)`,
  },

  "software-vino-por-copa-restaurantes": {
    slug: "software-vino-por-copa-restaurantes",
    type: "blog",
    category: "Software",
    title: "Software para gestionar vino por copa en restaurantes",
    subtitle: "El vino por copa es la mayor oportunidad de venta en restauración. Pero sin control, es también la mayor fuente de pérdida. Un software especializado lo cambia todo.",
    heroImage: "/src/assets/blog/vino-por-copa-botellas.jpg",
    body: `El vino por copa puede representar entre el 30% y el 50% de la facturación de vino en un restaurante. Pero gestionarlo manualmente —pricing, merma, rotación, selección— convierte esa oportunidad en un riesgo financiero.

## Por qué el vino por copa necesita software

Gestionar copa no es lo mismo que gestionar botella. La copa introduce variables que la botella no tiene:

- **Merma:** cada botella abierta pierde valor con el tiempo. Sin control, la merma puede llegar al 20%.
- **Pricing complejo:** el PVP de la copa no es el precio de la botella dividido entre 5. Debe incluir merma, rotación y servicio.
- **Rotación acelerada:** una copa que no se vende en 2-3 días se convierte en pérdida directa.
- **Selección dinámica:** la oferta de copa debería cambiar cada 1-2 semanas para generar interés.

Sin un sistema que controle estas variables, el margen del programa de copa se erosiona sin que nadie lo detecte.

## Qué debe hacer un software de vino por copa

| Funcionalidad | Sin software | Con Winerim |
|---|---|---|
| Calcular PVP por copa | Estimación manual | Automático (coste + merma + rotación) |
| Controlar merma | No se mide | Registro de copas por botella |
| Alertar rotación lenta | Nadie lo detecta | Alerta automática si < 3 copas/semana |
| Sugerir selección | Criterio del sumiller | Basado en datos + perfil del local |
| Comunicar al equipo | Briefing verbal | Fichas de producto + frase de venta |

## El coste oculto de gestionar copa sin datos

Ejemplo real: un restaurante con 6 copas abiertas, ticket medio de 4,50€/copa.

- Si la merma es del 10% (estándar): margen bruto ~72%.
- Si la merma es del 18% (habitual sin control): margen bruto ~61%.
- Diferencia mensual en un restaurante con 40 servicios: **entre 400€ y 800€ de margen perdido.**

Ese es el coste de no medir. No es catastrófico, pero acumulado en 12 meses supone entre 5.000€ y 10.000€ de margen que desaparece silenciosamente.

## Cómo Winerim gestiona el vino por copa

### Pricing automático
Winerim calcula el PVP óptimo por copa considerando coste de botella, copas reales por botella (con merma), multiplicador objetivo y precio de la competencia.

### Control de merma
Registro de botellas abiertas y copas servidas. Winerim detecta cuándo la merma supera el umbral y alerta para investigar causas.

### Rotación inteligente
Alerta de copas con baja rotación (< 3 ventas/semana) y sugiere sustituciones basadas en el perfil del local y la estacionalidad.

### Formación de equipo
Ficha de producto para cada copa con descripción, maridaje y frase de venta sugerida. Actualizada automáticamente con cada cambio de selección.

## Preguntas frecuentes

**¿Necesito un sistema de preservación como Coravin para usar Winerim?**
No es obligatorio, pero Winerim recomienda sistemas de preservación para copas premium (>12€/copa) donde la merma tiene más impacto financiero.

**¿Cuántas copas debo tener abiertas?**
Winerim recomienda entre 4 y 6 para empezar. Lo importante no es la cantidad, sino que cada copa rote y se venda.

**¿El software detecta sobreservicio?**
Sí. Si las copas servidas por botella son consistentemente inferiores a 4,5 (en botella de 75cl), Winerim alerta de posible sobreservicio.

**¿Funciona para restaurantes sin programa de copa actual?**
Especialmente. Winerim te ayuda a diseñar el programa desde cero: selección, pricing, formación y lanzamiento.

---

→ [Solicitar demo](/demo)
→ [Calculadora de precio por copa](/herramientas/calculadora-precio-vino-por-copa)
→ [Guía: vino por copa sin perder margen](/guias/como-implantar-vino-por-copa-sin-perder-margen)
→ [Diagnóstico de vino por copa](/herramientas/diagnostico-vino-por-copa)`,
  },

  "como-mejorar-ticket-medio-vino-con-datos": {
    slug: "como-mejorar-ticket-medio-vino-con-datos",
    type: "blog",
    category: "Estrategia",
    title: "Cómo mejorar el ticket medio en vino con datos",
    subtitle: "El ticket medio en vino no sube con presión comercial. Sube con datos que te dicen exactamente dónde están las oportunidades.",
    heroImage: "/src/assets/blog/ticket-medio-vinos.jpg",
    body: `El ticket medio en vino es el KPI más revelador de la salud comercial de tu carta. Y el más ignorado. La mayoría de restaurantes lo calculan de forma agregada (facturación de vino / número de mesas) y no profundizan más.

Pero el ticket medio no es un número estático. Es el resultado de múltiples decisiones: qué vinos hay en carta, cómo están presentados, qué recomienda el equipo, qué precio tiene la copa, y si el comensal se siente cómodo pidiendo.

## Qué datos necesitas para mejorar el ticket medio

### 1. Ticket medio en vino por mesa (no global)
El ticket medio global enmascara la realidad. Lo que necesitas es el ticket por mesa que pide vino. Si el 40% de tus mesas pide vino con un ticket de 18€, y el 60% no pide nada, tu media global será 7,20€. Pero el problema no es el ticket de 18€ — es el 60% que no pide.

### 2. Distribución de ventas por tramo de precio
¿Dónde se concentran las ventas? Si el 70% de tus ventas están en el tramo más barato de tu carta, tienes una oportunidad de redistribución.

### 3. Ratio copa vs botella
Las copas tienen un ticket unitario menor pero pueden aumentar el % de mesas que piden vino. El mix ideal depende de tu perfil de local.

### 4. Top 5 y bottom 5 referencias
Las 5 más vendidas definen tu ticket medio real. Las 5 menos vendidas te dicen dónde tienes capital inmovilizado sin retorno.

### 5. Impacto de la recomendación
¿Sube el ticket cuando el camarero recomienda? ¿Cuánto? Sin este dato, no sabes si tu equipo está ayudando o no.

## 5 palancas basadas en datos para subir el ticket medio

### Palanca 1: Ajustar la escalera de precios
Si hay un hueco entre tu copa a 5€ y tu botella más barata a 22€, estás perdiendo al cliente que gastaría 8-10€ en una copa premium. Rellena el hueco.

### Palanca 2: Copa premium como palanca
Introduce una copa "especial" entre 8€ y 12€. No necesita venderse mucho: su función es anclar el valor percibido y hacer que la copa estándar de 5€ parezca una ganga.

### Palanca 3: Maridaje sugerido
Cada plato principal debería tener un vino sugerido. No como imposición, sino como facilitador. El dato: los restaurantes con maridajes visibles en carta venden un 15-25% más de vino.

### Palanca 4: Recomendación activa del equipo
Forma al equipo con una frase de venta por copa. "Con este plato va muy bien este Verdejo, ¿te sirvo una copa?" es más efectivo que cualquier otra acción de marketing.

### Palanca 5: Eliminar barreras de entrada
Si el vino más barato de tu carta es 18€/botella y tu ticket medio de comida es 25€/persona, estás pidiendo al cliente que gaste un 36% adicional solo en vino. Ofrece una copa de entrada a 4-5€ para captar mesas que hoy no piden.

## Cómo Winerim te da estos datos

Winerim calcula automáticamente el ticket medio por mesa, la distribución por tramo de precio, el ratio copa/botella y el rendimiento de cada referencia. Sin hojas de cálculo, sin estimaciones.

Además, sugiere ajustes de pricing, selección de copa premium y maridajes basados en datos reales de tu restaurante.

## Preguntas frecuentes

**¿Cuál es un buen ticket medio en vino?**
Depende del tipo de local. Como referencia: casual dining 6-10€/mesa, restaurante medio 12-20€/mesa, fine dining 25-50€/mesa. Lo importante no es el número absoluto, sino la tendencia.

**¿Subir precios es la forma más rápida de subir el ticket?**
No necesariamente. Subir precios sin dato puede bajar el volumen. La palanca más segura es aumentar el % de mesas que piden vino (a través de copa y recomendación).

**¿Cuánto tarda en notarse el impacto?**
Con ajustes de pricing y copa, en 2-4 semanas. Con formación de equipo, en 1-2 semanas. Los datos de Winerim permiten medir el impacto desde el primer día.

---

→ [Analizar mi carta gratis](/analisis-carta)
→ [Solicitar demo de Winerim](/demo)
→ [Guía: surtido según ticket medio](/guias/como-decidir-surtido-segun-ticket-medio-tipo-local)
→ [Calculadora de margen de vino](/calculadora-margen-vino)`,
  },

  // ── MOFU cluster ──────────────────────────────────────────────

  "errores-fijar-precios-vino-restaurante": {
    slug: "errores-fijar-precios-vino-restaurante",
    type: "blog",
    category: "Pricing",
    title: "7 errores al fijar precios del vino en un restaurante",
    subtitle: "El pricing del vino es la decisión que más impacta en el margen de tu bodega. Y la que más restaurantes hacen por inercia.",
    heroImage: "/src/assets/blog/precio-multiplicador.jpg",
    body: `Fijar el precio del vino en un restaurante parece simple: coste × multiplicador = PVP. Pero esa simplicidad esconde errores que erosionan el margen sin que nadie lo detecte.

Estos son los 7 errores más frecuentes que vemos en restaurantes reales.

## Error 1: Usar un multiplicador único para toda la carta

Aplicar el mismo ×3 a un vino de 4€ y a uno de 25€ genera resultados absurdos: el primero queda a 12€ (razonable) y el segundo a 75€ (probablemente invendible para tu perfil de local).

**Qué hacer:** usa multiplicadores decrecientes por tramo. Los vinos de entrada pueden tener ×4-5; los premium, ×2-2,5. El margen absoluto es mayor en los caros incluso con multiplicador menor.

## Error 2: No diferenciar pricing de copa y botella

El precio de la copa NO es el precio de la botella ÷ 5. Debe incluir merma (10-15%), riesgo de oxidación y coste de servicio.

**Regla práctica:** PVP copa = (coste botella / 4,5 copas reales) × multiplicador de copa (4x-5x).

## Error 3: Ignorar la escalera de precios

Si tu carta tiene vinos a 14€, 16€, 18€ y el siguiente a 38€, tienes un hueco que el cliente percibe como un salto injustificado. Las ventas se concentrarán en el tramo 14-18€ y el de 38€ no rotará.

**Qué hacer:** construye tramos con incrementos progresivos del 30-40% entre cada escalón.

## Error 4: No revisar los costes de compra periódicamente

Los distribuidores ajustan precios sin avisar. Si tu coste de compra sube un 8% y no ajustas el PVP, tu margen bruto baja 2-3 puntos sin que lo notes.

**Qué hacer:** verifica facturas mensualmente y recalcula márgenes de las referencias principales.

## Error 5: Pricing emocional en lugar de analítico

"Este vino me gusta mucho, lo dejo a buen precio." El pricing basado en preferencias personales ignora al cliente y al mercado. Un vino que te gusta pero tiene margen del 55% cuando tu objetivo es 68% te está costando dinero.

## Error 6: No considerar el ticket medio del local

Un restaurante con ticket medio de 30€/persona que pone vinos a 45€ está pidiéndole al cliente que gaste un 75% adicional solo en vino. Es desproporcionado para ese perfil de gasto.

**Regla:** el vino más vendido debería costar entre el 30% y el 50% del ticket medio por persona.

## Error 7: No tener vinos de entrada accesibles

Eliminar los vinos "baratos" por percepción de calidad elimina también al cliente que habría empezado con una copa de 4€ y quizás habría acabado pidiendo una botella.

**Qué hacer:** siempre ten 2-3 opciones de entrada atractivas. Su función no es generar margen, sino captar mesas que hoy no piden vino.

## Cómo evitar estos errores

Winerim calcula automáticamente el PVP óptimo de cada referencia considerando coste, multiplicador por tramo, ticket medio del local, escalera de precios y competencia. Sin hojas de cálculo, sin intuición.

## Preguntas frecuentes

**¿Cuál es el multiplicador ideal?**
No hay uno único. Depende del tramo de precio, el tipo de local y la competencia. Como referencia: entrada ×4-5, medio ×3-3,5, premium ×2-2,5.

**¿Cada cuánto debo revisar precios?**
Mensualmente los costes de compra y trimestralmente la escalera completa de precios.

**¿Cómo sé si un vino está demasiado caro para mi público?**
Si vende menos de 3 unidades al mes y hay alternativas más baratas que sí rotan, probablemente el precio está por encima de lo que tu cliente acepta.

---

→ [Calculadora de margen de vino](/calculadora-margen-vino)
→ [Guía: cómo poner precio al vino](/precio-vino-restaurante)
→ [Analizador de carta gratuito](/analisis-carta)
→ [Solicitar demo](/demo)`,
  },

  "como-saber-si-carta-vinos-esta-descompensada": {
    slug: "como-saber-si-carta-vinos-esta-descompensada",
    type: "blog",
    category: "Analítica",
    title: "Cómo saber si tu carta de vinos está descompensada",
    subtitle: "Una carta descompensada no es una carta con malos vinos. Es una carta donde la distribución de estilos, precios o regiones no se ajusta a tu cliente real.",
    heroImage: "/src/assets/blog/carta-sobrecargada.jpg",
    body: `La mayoría de cartas de vinos se construyen por acumulación: se añaden vinos por relación con el distribuidor, por gusto personal, por tradición. Rara vez se diseñan con criterio de equilibrio.

El resultado: cartas descompensadas que generan concentración de ventas en pocas referencias, stock muerto en las demás y una experiencia pobre para el cliente que no encuentra lo que busca.

## Qué significa una carta descompensada

Una carta descompensada tiene uno o más de estos desequilibrios:

- **Por precio:** demasiados vinos en un tramo y huecos en otros. Ejemplo: 12 vinos entre 14-20€ y 2 vinos entre 25-35€.
- **Por estilo:** exceso de un perfil (ej. tintos de crianza) y carencia de otro (ej. blancos frescos, rosados).
- **Por región:** sobrerepresentación de una DO y ausencia de alternativas. 5 Ribera del Duero y 0 Bierzo.
- **Por formato:** todo en botella, sin oferta de copa que capture al comensal indeciso.
- **Por nivel de complejidad:** todo para expertos o todo para principiantes, sin gradación.

## Los 6 síntomas de una carta descompensada

Busca estas señales en tu carta:

1. **Más del 60% de las ventas se concentran en menos del 20% de las referencias.** Esto indica que la mayoría de tu carta es invisible para el cliente.

2. **Tienes referencias sin venta en más de 30 días.** Capital inmovilizado en vinos que nadie pide.

3. **El equipo siempre recomienda los mismos 3-4 vinos.** Si tu carta tiene 40 referencias pero el equipo solo conoce 5, el resto no existe comercialmente.

4. **Los clientes piden "el de la casa" o "el más barato".** No encuentran una opción que les encaje en la carta, así que eligen por defecto.

5. **Tienes huecos de precio evidentes.** El salto entre la copa a 5€ y la botella más barata a 22€ deja fuera al cliente que gastaría 8-10€.

6. **No hay estacionalidad.** La misma carta en enero que en julio. Sin adaptación a temperaturas, productos de temporada ni menús especiales.

## Cómo diagnosticar el equilibrio de tu carta

### Paso 1: Mapa de distribución por precio
Clasifica todos tus vinos por tramo de precio (ej. 0-15€, 15-25€, 25-40€, 40€+). ¿La distribución se parece a una campana centrada en tu sweet spot? Si no, está descompensada.

### Paso 2: Mapa de distribución por estilo
¿Cuántos blancos, tintos, rosados, espumosos? ¿Dentro de los tintos, cuántos jóvenes vs crianza vs reserva? La distribución debería reflejar lo que tu cliente pide, no lo que tu distribuidor te ofrece.

### Paso 3: Análisis de redundancia
¿Hay 2+ vinos del mismo estilo, región y tramo de precio? Eso es canibalización, no diversidad.

### Paso 4: Ratio copa vs botella
¿Cuántas opciones de copa tienes? ¿Cubren los tramos de precio principales? La copa es la puerta de entrada al vino para el 40% de los comensales.

## Cómo reequilibrar

1. **Identifica los huecos:** ¿falta un blanco en el tramo 18-24€? ¿No hay copa premium? Cubre esos huecos primero.
2. **Elimina redundancias:** si tienes 3 Ribera del Duero en el mismo rango, quédate con 1 y usa los otros huecos para diversificar.
3. **Ajusta la estacionalidad:** más blancos y rosados en primavera/verano, más tintos estructurados en otoño/invierno.
4. **Equilibra la complejidad:** asegura que hay opciones accesibles para el no-experto Y opciones interesantes para el entendido.

## Preguntas frecuentes

**¿Cuántas referencias debería tener por tramo de precio?**
Depende del tamaño de tu carta. Como regla: 50-60% en el sweet spot, 20% en entrada, 15% en premium, 5-10% aspiracional.

**¿Una carta descompensada siempre es un problema?**
Si vendes todo lo que tienes con buenos márgenes, no. Pero eso casi nunca ocurre. La descompensación suele ir acompañada de stock muerto y concentración de ventas.

**¿Winerim detecta desequilibrios automáticamente?**
Sí. Winerim analiza tu carta por precio, estilo, región y formato, y te alerta de huecos, redundancias y oportunidades de reequilibrio.

---

→ [Analizador de carta gratuito](/analisis-carta)
→ [Plantilla de equilibrio de carta](/recursos/plantilla-equilibrio-carta)
→ [Guía: detectar canibalización](/guias/como-detectar-canibalizacion-vinos-carta)
→ [Solicitar demo](/demo)`,
  },

  "que-vinos-ofrecer-por-copa-segun-tipo-local": {
    slug: "que-vinos-ofrecer-por-copa-segun-tipo-local",
    type: "blog",
    category: "Copa",
    title: "Qué vinos deberías ofrecer por copa según tu tipo de local",
    subtitle: "La selección de copa no es un miniatura de tu carta de botellas. Es una oferta independiente que debe adaptarse a tu público, tu cocina y tu operativa.",
    heroImage: "/src/assets/blog/vino-por-copa-botellas.jpg",
    body: `No todos los restaurantes necesitan las mismas copas. Un gastrobar urbano con cocina de fusión no tiene los mismos clientes ni la misma operativa que un restaurante de mariscos en la costa. Sin embargo, la mayoría diseñan su oferta de copa por inercia: "el tinto de la casa, el blanco de la casa y poco más."

## Por qué la selección de copa debe ser estratégica

La copa es la puerta de entrada al vino para el 35-45% de los comensales que no pedirían botella. Si la selección no encaja con el perfil de tu local, pierdes esas ventas.

Criterios que deben guiar la selección:
- **Perfil de cliente:** ¿experto, curioso, indiferente? Cuanto menos experto, más accesible debe ser la copa.
- **Tipo de cocina:** los maridajes naturales de tu carta de comida definen qué copas tienen más salida.
- **Ticket medio:** determina el rango de precio aceptable para la copa.
- **Operativa:** cuántos servicios haces, cuánto puedes controlar la merma, si tienes sistema de preservación.

## Selección recomendada por tipo de local

### Casual dining / gastrobar (ticket 20-35€)
Perfil del cliente: joven-adulto, busca experiencia informal, sensible al precio.

| Copa | Perfil | PVP sugerido |
|---|---|---|
| Espumoso | Cava brut o prosecco fresco | 4-5€ |
| Blanco fresco | Verdejo, Albariño o Sauvignon Blanc | 4-5€ |
| Tinto joven | Garnacha, Mencía o Monastrell | 4-5€ |
| Copa especial rotativa | Referencia diferente cada 2 semanas | 6-8€ |

**Total: 4 copas.** Prioriza rotación rápida y merma baja.

### Restaurante de cocina de autor (ticket 40-65€)
Perfil del cliente: foodie, abierto a descubrir, dispuesto a gastar más en experiencia.

| Copa | Perfil | PVP sugerido |
|---|---|---|
| Espumoso | Corpinnat, Champagne de pequeño productor | 7-10€ |
| Blanco con personalidad | Godello con crianza, Viognier, Riesling | 7-9€ |
| Blanco fresco | Albariño, Txakoli, Picpoul | 6-7€ |
| Tinto medio | Pinot Noir, Garnacha de altura, Nerello | 7-9€ |
| Tinto con estructura | Tempranillo crianza, Syrah | 8-10€ |
| Copa premium rotativa | Vino de autor, cosecha limitada | 12-16€ |

**Total: 6 copas.** La copa premium justifica sistema de preservación.

### Fine dining (ticket 70€+)
Perfil del cliente: experto o aspiracional, valora la exclusividad.

| Copa | Perfil | PVP sugerido |
|---|---|---|
| Champagne | Grower, vintage o cuvée | 14-22€ |
| Blanco gran formato | Borgoña, Ribeiro con crianza | 10-14€ |
| Blanco fresco | Chablis, Albariño premium | 8-11€ |
| Tinto elegante | Borgoña, Rioja clásico, Barolo | 12-18€ |
| Tinto potente | Ribera, Priorat, Napa | 10-16€ |
| Copa de postre/generoso | Amontillado, Sauternes, PX | 8-12€ |
| Copa del sommelier | Selección personal rotativa semanal | 15-25€ |

**Total: 7 copas.** Sistema de preservación obligatorio para copas > 12€.

### Hotel / resort
Adapta la selección al perfil del restaurante dentro del hotel. El bar de piscina necesita copas frescas y fáciles (2-3 opciones). El restaurante gastronómico sigue el modelo de fine dining.

## Errores comunes en la selección de copa

- **Solo tinto y blanco "de la casa":** es como tener solo un primer plato y un segundo. Demasiado limitado.
- **Copas idénticas a las botellas más baratas:** si el cliente puede pedir lo mismo en copa o en botella, la copa canibaliza la botella sin aportar valor.
- **No rotar:** la misma copa durante 6 meses pierde todo interés narrativo.
- **Copas que no maridajan con tu cocina:** un restaurante de sushi con copa de Ribera del Duero crianza es un desajuste evidente.

## Preguntas frecuentes

**¿Puedo ofrecer el mismo vino en copa y en botella?**
Sí, pero con estrategia. La copa funciona como prueba: el cliente cata por copa y, si le gusta, pide botella. No pongas en copa tu botella más barata — pon una que quieras que el cliente descubra.

**¿Cada cuánto debo rotar las copas?**
Copa estándar: cada 2-4 semanas. Copa premium/especial: puede ser semanal. La rotación genera narrativa para el equipo y curiosidad para el cliente.

**¿Cuántas copas son demasiadas?**
Si tienes más copas abiertas de las que puedes vender en 2 días, son demasiadas. Empieza con 4 y sube según datos de rotación.

---

→ [Calculadora de precio por copa](/herramientas/calculadora-precio-vino-por-copa)
→ [Guía: vino por copa sin perder margen](/guias/como-implantar-vino-por-copa-sin-perder-margen)
→ [Diagnóstico de vino por copa](/herramientas/diagnostico-vino-por-copa)
→ [Solicitar demo](/demo)`,
  },

  "cuando-carta-vinos-es-demasiado-larga": {
    slug: "cuando-carta-vinos-es-demasiado-larga",
    type: "blog",
    category: "Analítica",
    title: "Cuándo una carta de vinos es demasiado larga (y qué hacer al respecto)",
    subtitle: "Más referencias no significa mejor carta. Significa más complejidad, más stock inmovilizado y más decisiones difíciles para tu cliente.",
    heroImage: "/src/assets/blog/demasiadas-referencias.jpg",
    body: `Existe un mito persistente en hostelería: cuantos más vinos tenga la carta, más profesional parece el restaurante. Pero los datos cuentan otra historia.

## Cuándo una carta es demasiado larga

No hay un número mágico, pero hay señales claras:

- **Más del 25% de las referencias no se han vendido en 30 días.** Si 1 de cada 4 vinos no rota, tu carta tiene exceso de oferta.
- **El equipo de sala solo conoce el 10-15% de la carta.** Si tienes 60 referencias y tu equipo conoce 8, las otras 52 son invisibles comercialmente.
- **El comensal tarda más de 3 minutos en elegir y acaba pidiendo "lo de siempre."** La parálisis de elección es real y medible.
- **Tu stock inmovilizado supera el 20% del valor total de bodega.** Capital que no rota es capital que no trabaja.

## Los costes ocultos de una carta demasiado larga

### Coste de stock
Cada referencia adicional es capital inmovilizado. Si tienes 60 referencias con una media de 6 botellas cada una a 8€/botella de coste, son 2.880€ en bodega. Si el 25% no rota, son 720€ de capital muerto.

### Coste de gestión
Más referencias = más pedidos, más control de stock, más relación con distribuidores, más actualizaciones de carta. Tiempo que no dedicas a vender.

### Coste de merma
En vino por copa, cada referencia abierta es un reloj en marcha. Más copas abiertas sin rotación = más merma.

### Coste de decisión del cliente
La paradoja de la elección: con demasiadas opciones, el cliente no elige mejor — elige peor. Se refugia en lo seguro (el más barato, el que ya conoce) o directamente no pide vino.

## Cuántas referencias necesitas realmente

| Tipo de local | Referencias recomendadas |
|---|---|
| Casual / gastrobar | 15-25 |
| Restaurante medio | 25-45 |
| Restaurante gastronómico | 40-80 |
| Fine dining con bodega | 80-150+ |

**Importante:** estos números incluyen copa. Un casual con 20 botellas y 4 copas tiene 24 referencias totales.

## El test de las 3 preguntas

Para cada referencia de tu carta, hazte estas 3 preguntas:

1. **¿Se ha vendido en los últimos 30 días?** Si no, es candidata a salir.
2. **¿Mi equipo puede explicarla en 15 segundos?** Si no, es invisible.
3. **¿Aporta algo que ninguna otra referencia aporta?** Si no, es redundante.

Si la respuesta a las 3 preguntas es "no", esa referencia debería salir de tu carta.

## Cómo reducir sin empobrecer

Reducir la carta no es quitar vinos al azar. Es optimizar:

1. **Elimina redundancias:** si tienes 3 Ribera del Duero crianza entre 20-28€, quédate con 1.
2. **Cubre huecos:** usa los espacios liberados para cubrir estilos o tramos de precio que faltan.
3. **Prioriza rotación:** cada referencia que quede debe venderse al menos 3-4 veces al mes.
4. **Refuerza la copa:** menos botellas, más opciones de copa bien rotadas.
5. **Estacionaliza:** rota 5-10 referencias cada temporada para mantener la carta viva sin inflarla.

## Preguntas frecuentes

**¿Reducir la carta no da imagen de menos profesionalidad?**
Al contrario. Una carta curada, donde cada vino tiene una razón de estar, transmite más criterio que una carta inflada con vinos que nadie conoce.

**¿Cuántos vinos debo quitar?**
Empieza por los que no se han vendido en 60 días y no tienen justificación estratégica. Suele ser entre el 15% y el 25% de la carta.

**¿Qué hago con el stock de los vinos que saco?**
Liquídalos: copa especial, menú degustación, evento en el restaurante, oferta a empleados. No los dejes acumulando polvo.

**¿Winerim me ayuda a decidir qué quitar?**
Sí. Winerim identifica automáticamente las referencias con baja rotación, márgenes insuficientes y redundancias con otras referencias de tu carta.

---

→ [Analizador de carta gratuito](/analisis-carta)
→ [Guía: detectar canibalización](/guias/como-detectar-canibalizacion-vinos-carta)
→ [Guía: cuántos vinos debe tener una carta](/blog/cuantos-vinos-carta-restaurante)
→ [Solicitar demo](/demo)`,
  },
};

// Helper to get all articles as array
export const getAllArticles = () => Object.values(articles);
export const getArticleBySlug = (slug: string) => articles[slug];
export const getInterviews = () => getAllArticles().filter(a => a.type === "interview");
export const getBlogArticles = () => getAllArticles().filter(a => a.type === "blog");
