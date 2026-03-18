// ─── Wine Grapes / Varieties Data Model ─────────────────────────────

export type GrapeColor = "tinta" | "blanca" | "rosada";
export type AcidityLevel = "baja" | "media" | "alta" | "muy-alta";
export type BodyLevel = "ligero" | "medio" | "alto" | "muy-alto";
export type AromaticIntensity = "sutil" | "media" | "alta" | "muy-alta";
export type ClientRecognition = "muy-alto" | "alto" | "medio" | "bajo" | "nicho";
export type CommercialDifficulty = "fácil" | "media" | "difícil" | "muy-difícil";
export type GrapeScope = "internacional" | "nacional" | "local" | "diferencial";
export type CartaRole = "conocida" | "diferencial" | "premium" | "descubrimiento" | "valor" | "identitaria";

export interface GrapeEntry {
  id: string;
  slug: string;
  name: string;
  synonyms: string[];
  color: GrapeColor;
  countries: string[];
  keyRegions: string[];
  tastingNotes: string;
  description: string;
  intro: string;
  // Sensory profile
  acidity: AcidityLevel;
  body: BodyLevel;
  aromaticIntensity: AromaticIntensity;
  aromas: string[];
  // Commercial layer
  clientRecognition: ClientRecognition;
  commercialDifficulty: CommercialDifficulty;
  scope: GrapeScope;
  cartaRole: CartaRole[];
  // Winerim unique layer
  cartaPerception: string;
  whenItHelps: string;
  clientProfile: string;
  sellByStrategy: string;
  bestRegionsForSales: string[];
  competingVarieties: string[];
  whenToWriteBig: string;
  commonMistakes: string[];
  pairings: string[];
  relatedGrapes: string[];
  faqs: { q: string; a: string }[];
  seo: {
    title: string;
    description: string;
  };
}

// Lightweight entry for grapes without full Winerim layer yet
export interface GrapeCatalogEntry {
  slug: string;
  name: string;
  synonyms: string[];
  color: GrapeColor;
  countries: string[];
  keyRegions: string[];
  tastingNotes: string;
}

// ═══════════════════════════════════════════════════════════════════════
// FULL SEED DATA — Model entries with complete Winerim layer
// ═══════════════════════════════════════════════════════════════════════

export const grapeEntries: GrapeEntry[] = [
  {
    id: "tempranillo",
    slug: "tempranillo",
    name: "Tempranillo",
    synonyms: ["Tinto Fino", "Tinto del País", "Cencibel", "Ull de Llebre", "Tinta de Toro", "Tinta Roriz", "Aragonez"],
    color: "tinta",
    countries: ["España", "Portugal", "Argentina", "Estados Unidos", "Australia"],
    keyRegions: ["Rioja", "Ribera del Duero", "Toro", "Cigales", "Valdepeñas", "La Mancha", "Douro"],
    tastingNotes: "Principal tinta española. Aromas de frutos rojos, cuero, vainilla. Excelente para crianza en barrica.",
    description: "La uva tinta más importante de España, base de los grandes vinos de Rioja y Ribera del Duero, y una de las variedades más versátiles del mundo.",
    intro: "Tempranillo es la variedad tinta española por excelencia. Su nombre hace referencia a su maduración temprana, y es la base de algunos de los vinos más reconocidos del mundo. Versátil y elegante, se adapta a climas diversos y produce vinos que van desde jóvenes afrutados hasta grandes reservas con décadas de evolución. Bajo nombres como Tinta de Toro, Cencibel o Tinta Roriz, protagoniza cartas de vino en todo el mundo.",
    acidity: "media",
    body: "alto",
    aromaticIntensity: "alta",
    aromas: ["Cereza", "Ciruela", "Vainilla", "Cuero", "Tabaco", "Especias dulces"],
    clientRecognition: "muy-alto",
    commercialDifficulty: "fácil",
    scope: "internacional",
    cartaRole: ["conocida", "premium", "identitaria"],
    cartaPerception: "Tempranillo es la uva que el comensal español más reconoce, aunque a menudo la identifica a través de la región (Rioja, Ribera) más que por nombre de uva. Es una apuesta segura en cualquier carta. Comunicar 'Tempranillo' aporta claridad; comunicar 'Rioja Reserva' aporta confianza.",
    whenItHelps: "Siempre. Es imprescindible en cualquier carta española. Funciona en todos los segmentos: desde joven para copa hasta Gran Reserva como ancla premium. También funciona en carta internacional bajo sus sinónimos (Tinta Roriz en Portugal).",
    clientProfile: "Reconocimiento universal en España. Alto entre viajeros internacionales que conocen Rioja. El comensal casual la pide por región; el entendido la busca por productor o viñedo.",
    sellByStrategy: "En España, vende mejor por región ('un Rioja', 'un Ribera') que por variedad. En mercados internacionales, el nombre 'Tempranillo' empieza a tener fuerza propia. En carta, combinar ambas referencias es ideal.",
    bestRegionsForSales: ["Rioja", "Ribera del Duero", "Toro"],
    competingVarieties: ["Garnacha", "Cabernet Sauvignon", "Merlot"],
    whenToWriteBig: "Cuando la carta está dirigida a un público internacional o cuando quieres educar sobre la variedad más allá de la denominación. En carta española pura, la región suele ser más potente que el nombre de la uva.",
    commonMistakes: [
      "Asumir que todo Tempranillo sabe igual: un Toro y un Rioja Alavesa son mundos aparte",
      "No explorar los sinónimos: Tinta de Toro o Cencibel comunican diferenciación",
      "Limitar la oferta a crianzas y reservas sin incluir jóvenes de calidad",
    ],
    pairings: ["Cordero asado", "Jamón ibérico", "Quesos curados", "Guisos de legumbres", "Carnes a la brasa"],
    relatedGrapes: ["garnacha", "graciano", "mazuelo", "cabernet-sauvignon"],
    faqs: [
      { q: "¿Tempranillo y Tinta de Toro son la misma uva?", a: "Sí, genéticamente son la misma variedad. En Toro, las condiciones extremas de clima producen un estilo más concentrado y potente que en Rioja." },
      { q: "¿Por qué Tempranillo se llama diferente en cada región?", a: "Es tradición. Cada zona le dio su nombre local: Cencibel en La Mancha, Ull de Llebre en Cataluña, Tinta Roriz en Portugal. Todos hacen referencia a la misma uva." },
      { q: "¿Tempranillo envejece bien?", a: "Excepcionalmente bien. Un Gran Reserva de Rioja o un Ribera del Duero de alta gama pueden evolucionar durante 20-30 años." },
    ],
    seo: {
      title: "Tempranillo: Guía completa de la variedad | Biblioteca Winerim",
      description: "Todo sobre Tempranillo: sinónimos, regiones, perfil sensorial, rol en carta y criterio comercial para hostelería. Guía Winerim.",
    },
  },
  {
    id: "garnacha",
    slug: "garnacha",
    name: "Garnacha",
    synonyms: ["Grenache", "Cannonau", "Garnatxa"],
    color: "tinta",
    countries: ["España", "Francia", "Italia", "Australia", "Estados Unidos"],
    keyRegions: ["Priorat", "Campo de Borja", "Cariñena", "Calatayud", "Navarra", "Châteauneuf-du-Pape", "Gigondas", "Sardegna"],
    tastingNotes: "Alta graduación, frutos rojos maduros. Base de muchos tintos del sur de Francia y ensamblajes GSM.",
    description: "Uva mediterránea que está viviendo un renacimiento extraordinario, produciendo vinos de intensidad y carácter únicos desde Priorat hasta Châteauneuf-du-Pape.",
    intro: "La Garnacha es una de las variedades más plantadas del mundo y está viviendo un renacimiento extraordinario. Desde los viejos viñedos del Priorat hasta las garnachas de altura de Aragón, desde los GSM del Ródano hasta los Cannonau de Cerdeña, produce vinos de una intensidad y carácter únicos. Es también la base de muchos grandes rosados.",
    acidity: "media",
    body: "alto",
    aromaticIntensity: "alta",
    aromas: ["Fresa madura", "Frambuesa", "Regaliz", "Pimienta blanca", "Garriga", "Especias"],
    clientRecognition: "alto",
    commercialDifficulty: "fácil",
    scope: "internacional",
    cartaRole: ["diferencial", "valor", "premium"],
    cartaPerception: "La Garnacha comunica calidez, generosidad y autenticidad mediterránea. En España es cada vez más valorada como monovarietal premium, especialmente de viñas viejas. En Francia se asocia al Ródano Sur. Funciona como alternativa de alta calidad y precio accesible frente a Tempranillo premium.",
    whenItHelps: "Cuando quieres ofrecer tintos potentes con personalidad a precios competitivos. Las Garnachas de Aragón son una de las mejores relaciones calidad-precio del vino español. En Priorat, ancla el segmento premium.",
    clientProfile: "El comensal curioso y el que busca valor la valora mucho. El casual la reconoce menos que Tempranillo. El internacional la identifica como Grenache (Ródano).",
    sellByStrategy: "En España, combinar uva + región funciona muy bien: 'Garnacha de Gredos', 'Garnacha vieja del Priorat'. En internacional, Grenache/GSM es un lenguaje reconocido.",
    bestRegionsForSales: ["Priorat", "Campo de Borja", "Châteauneuf-du-Pape", "Gredos"],
    competingVarieties: ["tempranillo", "syrah", "monastrell"],
    whenToWriteBig: "Cuando la garnacha es de viña vieja, de un terroir específico o cuando quieres comunicar tendencia. 'Garnacha de cepas centenarias' es un claim muy potente.",
    commonMistakes: [
      "Asociarla solo a vinos de alta graduación: las garnachas de altura son frescas y elegantes",
      "Ignorar la Garnacha blanca, que produce blancos excepcionales",
      "No destacar la procedencia: la misma uva en Priorat y en Campo de Borja da vinos completamente distintos",
    ],
    pairings: ["Carnes a la brasa", "Cochinillo", "Pimientos asados", "Embutidos", "Arroces"],
    relatedGrapes: ["tempranillo", "monastrell", "syrah", "mazuelo"],
    faqs: [
      { q: "¿Garnacha y Grenache son la misma uva?", a: "Sí. Garnacha es el nombre español, Grenache el francés, y Cannonau el italiano (Cerdeña). Es la misma variedad con distintos nombres según el país." },
      { q: "¿Qué es un vino GSM?", a: "GSM significa Grenache-Syrah-Mourvèdre, un ensamblaje clásico del sur de Francia y Australia. Combina la fruta de la Garnacha, la estructura de la Syrah y la complejidad de la Mourvèdre." },
    ],
    seo: {
      title: "Garnacha (Grenache): Guía completa | Biblioteca Winerim",
      description: "Todo sobre Garnacha: sinónimos, regiones, perfil sensorial, GSM y su rol en hostelería. Guía Winerim con enfoque comercial.",
    },
  },
  {
    id: "cabernet-sauvignon",
    slug: "cabernet-sauvignon",
    name: "Cabernet Sauvignon",
    synonyms: [],
    color: "tinta",
    countries: ["Francia", "Estados Unidos", "Chile", "Argentina", "Australia", "Italia", "España", "Sudáfrica", "China"],
    keyRegions: ["Pauillac", "Margaux", "Saint-Julien", "Pessac-Léognan", "Napa Valley", "Coonawarra", "Maipo", "Stellenbosch"],
    tastingNotes: "La tinta más internacional. Cassis, cedro, grafito. Excelente potencial de guarda. Reina de Burdeos izquierda.",
    description: "La uva tinta más reconocida del mundo, conocida por su estructura, longevidad y carácter universal.",
    intro: "Cabernet Sauvignon es la referencia mundial en uvas tintas. Desde Burdeos hasta Napa Valley, desde Chile hasta China, produce vinos potentes, estructurados y con gran capacidad de envejecimiento. Sus taninos firmes y su perfil aromático complejo la convierten en la base de algunos de los vinos más cotizados del planeta.",
    acidity: "alta",
    body: "muy-alto",
    aromaticIntensity: "alta",
    aromas: ["Cassis", "Pimiento verde", "Cedro", "Tabaco", "Chocolate negro", "Grafito"],
    clientRecognition: "muy-alto",
    commercialDifficulty: "fácil",
    scope: "internacional",
    cartaRole: ["conocida", "premium", "identitaria"],
    cartaPerception: "Cabernet Sauvignon comunica poder, estructura y seriedad. Es la variedad que el comensal internacional más reconoce. Verla en carta aporta confianza inmediata. Funciona como referencia premium universal.",
    whenItHelps: "En cartas con presencia internacional. Un Cabernet Sauvignon de Napa o de Burdeos ancla el segmento premium. Un Cabernet chileno cubre el segmento valor con reconocimiento alto.",
    clientProfile: "Reconocimiento prácticamente universal. Desde el empresario que pide un Napa Cab hasta el casual que reconoce el nombre. Es probablemente la variedad que más personas en el mundo pueden nombrar.",
    sellByStrategy: "Vende igual de bien por variedad que por región, dependiendo del mercado. En España, la región manda (Burdeos, Napa). En mercados anglosajones, el nombre de la uva es protagonista.",
    bestRegionsForSales: ["Burdeos", "Napa Valley", "Maipo (Chile)", "Coonawarra"],
    competingVarieties: ["merlot", "tempranillo", "syrah"],
    whenToWriteBig: "Siempre que sea un varietal puro o dominante. El nombre Cabernet Sauvignon tiene peso propio en cualquier carta del mundo.",
    commonMistakes: [
      "Servir demasiado joven: muchos Cabernet necesitan madurez o al menos decantación",
      "No considerar que un Cabernet de Chile y uno de Burdeos son experiencias muy distintas",
      "Limitar la percepción a 'vino potente': hay Cabernets elegantes y frescos en climas fríos",
    ],
    pairings: ["Chuletón", "Estofados", "Quesos muy curados", "Cordero con hierbas", "Platos con trufa"],
    relatedGrapes: ["merlot", "cabernet-franc", "malbec", "syrah"],
    faqs: [
      { q: "¿Por qué Cabernet Sauvignon es tan popular?", a: "Combina reconocimiento universal, estructura que permite envejecimiento, y una expresión que funciona en prácticamente cualquier clima vinícola del mundo. Es la tinta más 'segura' en carta." },
      { q: "¿Cuál es la diferencia entre un Cabernet de Burdeos y uno de Napa?", a: "Burdeos tiende a ser más austero, elegante y basado en ensamblaje (con Merlot). Napa produce Cabernets más concentrados, frutales y potentes, generalmente monovarietales." },
    ],
    seo: {
      title: "Cabernet Sauvignon: Guía completa | Biblioteca Winerim",
      description: "Todo sobre Cabernet Sauvignon: regiones, perfil sensorial, estilos y su rol en hostelería. Guía Winerim con enfoque comercial.",
    },
  },
  {
    id: "pinot-noir",
    slug: "pinot-noir",
    name: "Pinot Noir",
    synonyms: ["Pinot Nero", "Spätburgunder", "Blauburgunder"],
    color: "tinta",
    countries: ["Francia", "Alemania", "Austria", "Nueva Zelanda", "Estados Unidos", "Australia", "Chile", "Italia"],
    keyRegions: ["Bourgogne", "Gevrey-Chambertin", "Chambolle-Musigny", "Vosne-Romanée", "Champagne", "Central Otago", "Sonoma Coast", "Willamette Valley", "Baden", "Pfalz"],
    tastingNotes: "La uva más romántica. Transparente, compleja, sensual. Difícil de cultivar pero extraordinaria en Borgoña.",
    description: "La uva tinta más elegante del mundo, capaz de transmitir el terroir con una transparencia que ninguna otra variedad iguala.",
    intro: "Pinot Noir es la variedad tinta más exigente y seductora del mundo. Difícil de cultivar, sensible a todo, pero cuando encuentra su terroir produce vinos de una elegancia y complejidad que han fascinado a generaciones. Borgoña es su cuna y su máxima expresión, pero Oregon, Central Otago y Baden demuestran que puede brillar en otros rincones del planeta.",
    acidity: "alta",
    body: "medio",
    aromaticIntensity: "alta",
    aromas: ["Cereza", "Fresa silvestre", "Rosa", "Trufa", "Tierra húmeda", "Especias finas"],
    clientRecognition: "alto",
    commercialDifficulty: "media",
    scope: "internacional",
    cartaRole: ["premium", "diferencial", "descubrimiento"],
    cartaPerception: "Pinot Noir en carta comunica sofisticación, elegancia y conocimiento. No es la uva de todos, sino la de quien busca algo más sutil. Un buen Borgoña en carta eleva el perfil de toda la selección.",
    whenItHelps: "Cuando la carta busca equilibrio entre potencia y elegancia. Pinot Noir llena el espacio de 'tinto ligero con profundidad' que ninguna otra variedad cubre igual. Ideal para maridajes con aves, setas y cocina japonesa.",
    clientProfile: "El comensal sofisticado, el viajero que ha probado Borgoña, el que busca alternativas a tintos pesados. Menor reconocimiento en público casual, pero altísimo en segmento premium.",
    sellByStrategy: "En alta gama, la región manda: 'Gevrey-Chambertin', 'Vosne-Romanée'. En gama media, el nombre Pinot Noir tiene peso propio, especialmente en vinos del Nuevo Mundo.",
    bestRegionsForSales: ["Borgoña", "Central Otago", "Oregon", "Sonoma"],
    competingVarieties: ["nebbiolo", "gamay", "mencia"],
    whenToWriteBig: "Cuando el Pinot es del Nuevo Mundo o de regiones menos conocidas. En Borgoña, la appellation es más importante que el nombre de la uva.",
    commonMistakes: [
      "Servir demasiado frío: Pinot Noir necesita al menos 15-16°C para expresarse",
      "Esperar potencia: Pinot Noir es elegancia y transparencia, no fuerza",
      "Comprar Borgoña barato esperando calidad: en Borgoña, el precio y la parcela importan mucho",
    ],
    pairings: ["Pato", "Setas", "Salmón", "Codorniz", "Quesos de corteza lavada", "Cocina japonesa refinada"],
    relatedGrapes: ["gamay", "nebbiolo", "mencia"],
    faqs: [
      { q: "¿Por qué Pinot Noir es tan cara en Borgoña?", a: "Combina rendimientos bajos, parcelas pequeñas, alta demanda global y un terroir imposible de replicar. Los Grand Cru producen cantidades muy limitadas." },
      { q: "¿Hay Pinot Noir bueno fuera de Borgoña?", a: "Excelente. Oregon (Willamette Valley), Nueva Zelanda (Central Otago), Sonoma Coast y Baden (Alemania) producen Pinot Noir de primer nivel a precios más accesibles." },
    ],
    seo: {
      title: "Pinot Noir: Guía completa de la variedad | Biblioteca Winerim",
      description: "Todo sobre Pinot Noir: Borgoña, Oregon, Central Otago. Perfil sensorial, rol en carta y criterio comercial. Guía Winerim.",
    },
  },
  {
    id: "chardonnay",
    slug: "chardonnay",
    name: "Chardonnay",
    synonyms: [],
    color: "blanca",
    countries: ["Francia", "Estados Unidos", "Australia", "Chile", "Argentina", "Nueva Zelanda", "Italia", "Sudáfrica"],
    keyRegions: ["Chablis", "Meursault", "Puligny-Montrachet", "Champagne", "Mâcon", "Napa Valley", "Margaret River", "Casablanca"],
    tastingNotes: "La blanca más versátil del mundo. Desde Chablis mineral hasta Meursault con barrica. Base del Champagne.",
    description: "La uva blanca más cultivada y versátil del mundo, capaz de producir vinos radicalmente diferentes según la región y la vinificación.",
    intro: "Chardonnay es la variedad blanca más versátil que existe. Puede dar desde vinos minerales y acerados en Chablis hasta blancos cremosos y opulentos fermentados en barrica en California. Su neutralidad permite que el terroir y la técnica del enólogo se expresen con claridad. Es además una de las tres uvas del Champagne.",
    acidity: "media",
    body: "alto",
    aromaticIntensity: "media",
    aromas: ["Manzana verde", "Cítricos", "Mantequilla", "Avellana", "Piña tropical", "Vainilla"],
    clientRecognition: "muy-alto",
    commercialDifficulty: "fácil",
    scope: "internacional",
    cartaRole: ["conocida", "premium", "valor"],
    cartaPerception: "Chardonnay es la blanca que más comensales en el mundo pueden nombrar. Su presencia en carta aporta seguridad en el segmento de blancos. Permite cubrir desde vinos accesibles hasta Borgoñas de primerísimo nivel.",
    whenItHelps: "Siempre. Es la blanca de referencia universal. Un Chablis y un Chardonnay californiano cubren dos estilos completamente distintos con la misma variedad. Ideal para introducir al comensal en el mundo de los blancos con cuerpo.",
    clientProfile: "Reconocimiento universal. Es probablemente la primera blanca que aprende cualquier aficionado al vino. Desde el casual ('un Chardonnay') hasta el conocedor ('un Meursault Premier Cru').",
    sellByStrategy: "Vende tanto por variedad como por región. En gama alta, la appellation de Borgoña manda. En gama media, 'Chardonnay' es un lenguaje que todo el mundo entiende.",
    bestRegionsForSales: ["Borgoña (Chablis, Meursault)", "Napa Valley", "Chile (Casablanca)", "Australia (Margaret River)"],
    competingVarieties: ["sauvignon-blanc", "albarino", "viognier"],
    whenToWriteBig: "Cuando es un varietal monocepa del Nuevo Mundo. En Borgoña, el nombre del pueblo o parcela es más relevante que la variedad.",
    commonMistakes: [
      "Asumir que todo Chardonnay es 'cremoso con barrica': Chablis es mineral y acerado",
      "No ofrecer diferentes estilos: un Chablis y un Chardonnay australiano son experiencias opuestas",
      "Servir demasiado frío: los Chardonnay con cuerpo se expresan mejor a 10-12°C",
    ],
    pairings: ["Pescado a la plancha", "Pollo asado", "Risotto de setas", "Marisco con salsas cremosas", "Pasta con trufa"],
    relatedGrapes: ["sauvignon-blanc", "viognier", "albarino"],
    faqs: [
      { q: "¿Chablis es Chardonnay?", a: "Sí. Chablis es 100% Chardonnay, pero su estilo mineral, acerado y sin barrica es tan diferente que muchos consumidores no lo asocian con Chardonnay." },
      { q: "¿Cuál es la diferencia entre Chardonnay con y sin barrica?", a: "Sin barrica: fresco, mineral, cítrico (estilo Chablis). Con barrica: cremoso, tostado, con notas de vainilla y mantequilla (estilo Borgoña/California)." },
    ],
    seo: {
      title: "Chardonnay: Guía completa de la variedad | Biblioteca Winerim",
      description: "Todo sobre Chardonnay: Chablis, Borgoña, Napa. Perfil sensorial, estilos con y sin barrica, y su rol en hostelería. Guía Winerim.",
    },
  },
  {
    id: "sauvignon-blanc",
    slug: "sauvignon-blanc",
    name: "Sauvignon Blanc",
    synonyms: ["Fumé Blanc"],
    color: "blanca",
    countries: ["Francia", "Nueva Zelanda", "Chile", "Sudáfrica", "Estados Unidos"],
    keyRegions: ["Sancerre", "Pouilly-Fumé", "Bordeaux Blanc", "Marlborough", "Casablanca", "Stellenbosch"],
    tastingNotes: "Herbácea, cítrica, pasa de la fruta. Dos estilos: Loira mineral vs. Nueva Zelanda tropical.",
    description: "Uva blanca aromática con un perfil inconfundible, que produce desde los minerales Sancerre hasta los exuberantes Sauvignon de Marlborough.",
    intro: "Sauvignon Blanc es sinónimo de frescura y expresividad. Su perfil aromático es inconfundible: herbáceo, cítrico, con una acidez que la convierte en compañera ideal de mariscos, ensaladas y cocina ligera. Marlborough (Nueva Zelanda) la ha catapultado al estrellato mundial con un estilo tropical y vibrante, mientras que Sancerre y Pouilly-Fumé mantienen la elegancia mineral del Loira.",
    acidity: "muy-alta",
    body: "ligero",
    aromaticIntensity: "muy-alta",
    aromas: ["Hierba recién cortada", "Pomelo", "Maracuyá", "Grosella", "Espárrago", "Mineral"],
    clientRecognition: "muy-alto",
    commercialDifficulty: "fácil",
    scope: "internacional",
    cartaRole: ["conocida", "valor"],
    cartaPerception: "Sauvignon Blanc comunica frescura, accesibilidad y modernidad. Es la segunda blanca más reconocida después de Chardonnay. Su alta acidez la hace ideal para aperitivo y maridaje con cocina ligera.",
    whenItHelps: "Cuando necesitas blancos frescos, accesibles y con alta rotación. Marlborough Sauvignon es casi un commodity premium: altísimo reconocimiento. Sancerre aporta elegancia.",
    clientProfile: "Reconocimiento muy alto. Es la blanca favorita de muchos bebedores casuales. El conocedor busca Sancerre o Pouilly-Fumé para un perfil más mineral y complejo.",
    sellByStrategy: "Vende muy bien por variedad. 'Un Sauvignon Blanc' es un pedido habitual. La mención de Marlborough o Sancerre eleva la percepción.",
    bestRegionsForSales: ["Marlborough", "Sancerre", "Chile (Casablanca)"],
    competingVarieties: ["chardonnay", "albarino", "verdejo"],
    whenToWriteBig: "Casi siempre. Es una de las pocas variedades que vende igual o más por su nombre que por su región (excepto Sancerre).",
    commonMistakes: [
      "Asumir que todos saben igual: la diferencia entre Sancerre y Marlborough es enorme",
      "Servir demasiado frío: por debajo de 8°C pierde expresión aromática",
      "No rotar: Sauvignon Blanc se bebe joven, no guardar stock demasiado tiempo",
    ],
    pairings: ["Ensaladas frescas", "Ceviche", "Queso de cabra", "Espárragos", "Sushi", "Marisco crudo"],
    relatedGrapes: ["chardonnay", "verdejo", "albarino"],
    faqs: [
      { q: "¿Cuál es la diferencia entre Sancerre y Marlborough?", a: "Sancerre (Loira, Francia) produce Sauvignon Blanc mineral, discreto y con mayor complejidad. Marlborough (Nueva Zelanda) da vinos más exuberantes, tropicales e intensamente aromáticos." },
      { q: "¿Sauvignon Blanc envejece?", a: "Generalmente se bebe joven (1-3 años). Los mejores Sancerre y Pouilly-Fumé pueden evolucionar 5-8 años, ganando complejidad." },
    ],
    seo: {
      title: "Sauvignon Blanc: Guía completa | Biblioteca Winerim",
      description: "Todo sobre Sauvignon Blanc: Sancerre, Marlborough, estilos y su rol en carta. Guía Winerim con enfoque comercial.",
    },
  },
  {
    id: "nebbiolo",
    slug: "nebbiolo",
    name: "Nebbiolo",
    synonyms: ["Spanna", "Chiavennasca", "Picoutener"],
    color: "tinta",
    countries: ["Italia"],
    keyRegions: ["Barolo", "Barbaresco", "Langhe", "Roero", "Gattinara", "Ghemme"],
    tastingNotes: "La gran tinta del Piemonte. Taninos potentes, acidez alta, aromas de rosa, alquitrán y trufa. Vinos de grandísima longevidad.",
    description: "La uva más noble de Italia, responsable de los majestuosos Barolo y Barbaresco, vinos con capacidad de envejecer décadas.",
    intro: "Nebbiolo es una de las uvas más fascinantes del mundo. Produce vinos de color engañosamente pálido pero con una estructura tánica y una complejidad que desafían toda expectativa visual. Barolo y Barbaresco, sus máximas expresiones, son considerados entre los mejores vinos del mundo. Su nombre proviene de 'nebbia' (niebla), la bruma que cubre las colinas del Piemonte durante la vendimia.",
    acidity: "muy-alta",
    body: "alto",
    aromaticIntensity: "muy-alta",
    aromas: ["Rosa", "Alquitrán", "Trufa", "Cereza", "Cuero", "Violeta"],
    clientRecognition: "alto",
    commercialDifficulty: "media",
    scope: "diferencial",
    cartaRole: ["premium", "diferencial", "descubrimiento"],
    cartaPerception: "Nebbiolo en carta comunica conocimiento, ambición y sofisticación. Un Barolo funciona como ancla premium italiana. Barbaresco aporta elegancia a precio ligeramente más accesible. Es la uva que los profesionales del vino más respetan.",
    whenItHelps: "Cuando la carta busca posicionamiento premium italiano o cuando quieres ofrecer una alternativa elegante a los tintos potentes habituales. Langhe Nebbiolo es una puerta de entrada excelente.",
    clientProfile: "El entendido y el viajero que ha visitado Piamonte. Menor reconocimiento casual, pero altísimo prestigio entre conocedores. El nombre 'Barolo' es más conocido que 'Nebbiolo'.",
    sellByStrategy: "Vende mucho mejor por denominación (Barolo, Barbaresco) que por nombre de uva. Langhe Nebbiolo funciona como puerta de entrada accesible.",
    bestRegionsForSales: ["Barolo", "Barbaresco", "Langhe"],
    competingVarieties: ["pinot-noir", "sangiovese", "tempranillo"],
    whenToWriteBig: "Cuando ofreces un Langhe Nebbiolo o un Roero, donde el comensal puede no conocer la denominación pero sí la variedad. En Barolo/Barbaresco, la denominación manda.",
    commonMistakes: [
      "Juzgar por el color: Nebbiolo es pálido pero extraordinariamente potente en estructura",
      "Servir demasiado joven: un Barolo necesita mínimo 10 años para empezar a expresarse",
      "No ofrecer Langhe Nebbiolo como alternativa accesible: misma uva, estilo más inmediato",
    ],
    pairings: ["Tartufo", "Brasato", "Risotto al Barolo", "Tajarin con ragú", "Quesos piamonteses"],
    relatedGrapes: ["pinot-noir", "sangiovese", "barbera"],
    faqs: [
      { q: "¿Cuál es la diferencia entre Barolo y Barbaresco?", a: "Ambos son 100% Nebbiolo. Barolo tiende a ser más estructurado, potente y longevo. Barbaresco es generalmente más elegante, accesible más joven y con una expresión algo más floral." },
      { q: "¿Por qué Nebbiolo es tan pálido?", a: "Nebbiolo tiene poco pigmento en la piel pero muchísimo tanino. Es una de las pocas uvas donde color y estructura no van correlacionados." },
    ],
    seo: {
      title: "Nebbiolo: Guía completa (Barolo, Barbaresco) | Biblioteca Winerim",
      description: "Todo sobre Nebbiolo: Barolo, Barbaresco, Langhe. Perfil sensorial, rol premium en carta y criterio comercial. Guía Winerim.",
    },
  },
  {
    id: "albarino",
    slug: "albarino",
    name: "Albariño",
    synonyms: ["Alvarinho"],
    color: "blanca",
    countries: ["España", "Portugal"],
    keyRegions: ["Rías Baixas", "Vinho Verde", "Monção e Melgaço"],
    tastingNotes: "La gran blanca gallega. Melocotón, cítricos, salina. Perfecta con marisco.",
    description: "La variedad blanca más reconocida de España, estrella indiscutible de Rías Baixas y sinónimo de frescura atlántica.",
    intro: "Albariño es la reina de las blancas atlánticas. Procedente de Rías Baixas (Galicia), produce vinos frescos, aromáticos y con una salinidad mineral que la convierte en la compañera perfecta del marisco. Es la variedad blanca española más reconocida internacionalmente y una de las más valoradas en hostelería por su versatilidad gastronómica.",
    acidity: "alta",
    body: "medio",
    aromaticIntensity: "alta",
    aromas: ["Melocotón blanco", "Cítricos", "Manzana verde", "Flores blancas", "Salino", "Mineral"],
    clientRecognition: "muy-alto",
    commercialDifficulty: "fácil",
    scope: "internacional",
    cartaRole: ["conocida", "identitaria", "valor"],
    cartaPerception: "Albariño comunica frescura, calidad y maridaje con marisco. Es la blanca española que el comensal reconoce y pide con confianza. En carta, su presencia es prácticamente obligatoria si tienes pescados y mariscos.",
    whenItHelps: "Siempre que la carta tenga pescados o mariscos. Es la blanca más 'segura' de la carta española. Funciona igual de bien por copa que por botella.",
    clientProfile: "Altísimo reconocimiento en España. Creciente internacionalmente. Desde el turista que busca 'something local' hasta el conocedor que diferencia entre subzonas de Rías Baixas.",
    sellByStrategy: "Vende igual de bien por variedad que por denominación. 'Un Albariño' y 'un Rías Baixas' son prácticamente sinónimos en la mente del comensal español.",
    bestRegionsForSales: ["Rías Baixas", "Vinho Verde"],
    competingVarieties: ["verdejo", "godello", "sauvignon-blanc"],
    whenToWriteBig: "Siempre en España. El nombre 'Albariño' tiene fuerza propia. En mercados internacionales, combinar 'Albariño, Rías Baixas' maximiza el reconocimiento.",
    commonMistakes: [
      "Limitarse a Albariño joven: hay excelentes Albariños con crianza y lías que aportan complejidad",
      "No explorar las diferencias entre subzonas de Rías Baixas (Val do Salnés, O Rosal, Condado do Tea)",
      "Servir demasiado frío: por debajo de 8°C pierde aromas",
    ],
    pairings: ["Marisco gallego", "Pulpo", "Ostras", "Pescado blanco", "Ceviche", "Sushi"],
    relatedGrapes: ["verdejo", "godello", "sauvignon-blanc"],
    faqs: [
      { q: "¿Albariño y Alvarinho son la misma uva?", a: "Sí. Albariño es el nombre español (Rías Baixas) y Alvarinho el portugués (Vinho Verde). Los estilos pueden variar: gallegos más frutales, portugueses a veces más minerales." },
      { q: "¿Albariño envejece?", a: "Mejor de lo que se piensa. Los Albariños de calidad con crianza sobre lías pueden evolucionar 5-10 años, ganando complejidad y notas tostadas." },
    ],
    seo: {
      title: "Albariño: Guía completa de la variedad | Biblioteca Winerim",
      description: "Todo sobre Albariño: Rías Baixas, Vinho Verde, perfil sensorial y su rol imprescindible en hostelería. Guía Winerim.",
    },
  },
  {
    id: "syrah",
    slug: "syrah",
    name: "Syrah",
    synonyms: ["Shiraz"],
    color: "tinta",
    countries: ["Francia", "Australia", "Sudáfrica", "Estados Unidos", "España", "Argentina", "Chile"],
    keyRegions: ["Côte-Rôtie", "Hermitage", "Crozes-Hermitage", "Saint-Joseph", "Cornas", "Barossa Valley", "McLaren Vale", "Stellenbosch"],
    tastingNotes: "Pimienta negra, violeta, carne ahumada. Elegante en el Ródano, potente como Shiraz en Australia.",
    description: "Una de las grandes tintas del mundo, con dos personalidades: la elegancia del Ródano Norte y la potencia del Shiraz australiano.",
    intro: "Syrah es una variedad con doble personalidad. En el Ródano Norte (Francia), produce vinos elegantes con pimienta negra, violeta y carne ahumada. En Australia como Shiraz, se transforma en vinos potentes, concentrados y con notas de frutas negras y chocolate. Esta dualidad la convierte en una de las tintas más interesantes para cualquier carta.",
    acidity: "alta",
    body: "muy-alto",
    aromaticIntensity: "muy-alta",
    aromas: ["Pimienta negra", "Violeta", "Mora", "Carne ahumada", "Clavo", "Chocolate"],
    clientRecognition: "alto",
    commercialDifficulty: "fácil",
    scope: "internacional",
    cartaRole: ["diferencial", "premium", "valor"],
    cartaPerception: "Syrah/Shiraz comunica dos cosas según el origen: elegancia (Ródano) o potencia (Australia). Es una uva que permite cubrir diferentes perfiles de comensal con la misma variedad.",
    whenItHelps: "Cuando buscas tintos con carácter que se diferencien de Cabernet y Tempranillo. Un Crozes-Hermitage ofrece excelente relación calidad-precio. Un Barossa Shiraz ancla potencia.",
    clientProfile: "Alto entre aficionados. El nombre 'Shiraz' tiene más reconocimiento casual (Australia). 'Syrah' resuena con el comensal más sofisticado.",
    sellByStrategy: "En Francia, la appellation manda (Côte-Rôtie, Hermitage). En Australia, Shiraz + región funciona (Barossa Valley Shiraz). En España, Syrah empieza a posicionarse en zonas como Jumilla.",
    bestRegionsForSales: ["Côte-Rôtie", "Hermitage", "Barossa Valley"],
    competingVarieties: ["cabernet-sauvignon", "garnacha", "monastrell"],
    whenToWriteBig: "Cuando es un varietal puro fuera de Francia. En el Ródano, la appellation es más importante. En cartas internacionales, 'Syrah' o 'Shiraz' comunican bien.",
    commonMistakes: [
      "No diferenciar entre Syrah (estilo francés) y Shiraz (estilo australiano): son la misma uva con expresiones muy distintas",
      "Ignorar los Crozes-Hermitage: una de las mejores relaciones calidad-precio del mundo",
      "Servir Shiraz sin decantar: los vinos potentes australianos se benefician de oxigenación",
    ],
    pairings: ["Carnes a la brasa", "Cordero especiado", "Embutidos ahumados", "Cocina con pimienta", "BBQ"],
    relatedGrapes: ["garnacha", "monastrell", "cabernet-sauvignon"],
    faqs: [
      { q: "¿Syrah y Shiraz son la misma uva?", a: "Sí. Syrah es el nombre francés y Shiraz el australiano/sudafricano. El nombre en etiqueta suele indicar el estilo: Syrah = elegante, Shiraz = potente." },
      { q: "¿Qué es un vino del Ródano Norte?", a: "Son vinos de Syrah pura (o con un poco de Viognier) de appellations como Côte-Rôtie, Hermitage, Crozes-Hermitage, Cornas y Saint-Joseph. Representan el estilo más elegante de esta variedad." },
    ],
    seo: {
      title: "Syrah (Shiraz): Guía completa | Biblioteca Winerim",
      description: "Todo sobre Syrah/Shiraz: Ródano, Barossa, estilos y su rol en hostelería. Guía Winerim con enfoque comercial.",
    },
  },
  {
    id: "riesling",
    slug: "riesling",
    name: "Riesling",
    synonyms: [],
    color: "blanca",
    countries: ["Alemania", "Francia", "Austria", "Australia", "Estados Unidos", "Nueva Zelanda"],
    keyRegions: ["Mosel", "Rheingau", "Pfalz", "Nahe", "Alsace", "Wachau", "Clare Valley", "Eden Valley"],
    tastingNotes: "Posiblemente la blanca más noble del mundo. Acidez eléctrica, petróleo, cítricos. Del seco al TBA.",
    description: "Considerada por muchos la uva blanca más noble del mundo, capaz de producir vinos desde secos y acerados hasta dulces exuberantes.",
    intro: "Riesling es la variedad blanca más noble y con mayor rango de expresión. Desde secos y eléctricos en Mosel hasta dulces TBA con siglos de potencial de guarda, pasando por los secos y aromáticos de Alsacia. Su acidez natural es su firma: mantiene frescura incluso con azúcar residual. Es también una de las pocas blancas que desarrolla complejidad extraordinaria con el envejecimiento.",
    acidity: "muy-alta",
    body: "ligero",
    aromaticIntensity: "muy-alta",
    aromas: ["Lima", "Melocotón", "Petróleo", "Miel", "Flores blancas", "Mineral"],
    clientRecognition: "medio",
    commercialDifficulty: "difícil",
    scope: "diferencial",
    cartaRole: ["diferencial", "premium", "descubrimiento"],
    cartaPerception: "Riesling en carta comunica criterio, sofisticación y ambición. Pero tiene un reto comercial: muchos comensales la asocian erróneamente con vinos dulces. Educar sobre Riesling seco es una oportunidad de diferenciación.",
    whenItHelps: "Cuando la carta busca diferenciación en blancos y el equipo de sala puede explicar la variedad. Un Riesling seco es una de las mejores experiencias gastronómicas que puedes ofrecer. Funciona extraordinariamente bien con cocina asiática.",
    clientProfile: "Reconocimiento alto entre conocedores, medio-bajo entre público casual. El prejuicio de 'dulce' sigue pesando. Pero quien descubre un buen Riesling seco suele convertirse en fan.",
    sellByStrategy: "En Alemania, la appellation y el Prädikat mandan. En Alsacia, 'Riesling Grand Cru' tiene peso. Para público casual, explicar 'seco, como un Chablis pero con más aroma' funciona bien.",
    bestRegionsForSales: ["Mosel", "Rheingau", "Alsace", "Wachau"],
    competingVarieties: ["chardonnay", "sauvignon-blanc", "gruner-veltliner"],
    whenToWriteBig: "Siempre. Riesling es una marca con peso propio. El nombre de la uva es más reconocible que la mayoría de appellations alemanas.",
    commonMistakes: [
      "Asumir que todo Riesling es dulce: la tendencia actual es claramente hacia los secos (Trocken)",
      "No indicar el nivel de dulzor en carta: confunde al comensal",
      "No decantarla o servirla demasiado fría: a 10-12°C muestra su complejidad",
    ],
    pairings: ["Cocina tailandesa", "Sushi", "Cerdo", "Curry suave", "Quesos de corteza lavada", "Foie gras"],
    relatedGrapes: ["gruner-veltliner", "gewurztraminer", "chenin-blanc"],
    faqs: [
      { q: "¿Riesling es siempre dulce?", a: "No. La tendencia moderna es claramente hacia los secos (Trocken en Alemania, o los alsacianos). Riesling produce algunos de los mejores vinos blancos secos del mundo." },
      { q: "¿Qué significa el 'petróleo' en Riesling?", a: "Es una nota característica que desarrollan los Riesling con edad, causada por un compuesto llamado TDN. Es muy apreciada por conocedores y marca de autenticidad." },
    ],
    seo: {
      title: "Riesling: Guía completa de la variedad | Biblioteca Winerim",
      description: "Todo sobre Riesling: Mosel, Alsace, Wachau. Perfil sensorial, mitos del dulzor y su rol diferencial en hostelería. Guía Winerim.",
    },
  },
];

// ═══════════════════════════════════════════════════════════════════════
// CATALOG — Lightweight entries for all 87 grapes (for hub listing)
// ═══════════════════════════════════════════════════════════════════════

export const grapeCatalog: GrapeCatalogEntry[] = [
  // TINTAS (41)
  { slug: "tempranillo", name: "Tempranillo", synonyms: ["Tinto Fino", "Cencibel", "Ull de Llebre", "Tinta de Toro", "Tinta Roriz", "Aragonez"], color: "tinta", countries: ["España", "Portugal", "Argentina"], keyRegions: ["Rioja", "Ribera del Duero", "Toro", "Douro"], tastingNotes: "Principal tinta española. Frutos rojos, cuero, vainilla." },
  { slug: "garnacha", name: "Garnacha", synonyms: ["Grenache", "Cannonau", "Garnatxa"], color: "tinta", countries: ["España", "Francia", "Italia", "Australia"], keyRegions: ["Priorat", "Campo de Borja", "Châteauneuf-du-Pape"], tastingNotes: "Alta graduación, frutos rojos maduros. Base de GSM." },
  { slug: "monastrell", name: "Monastrell", synonyms: ["Mourvèdre", "Mataro"], color: "tinta", countries: ["España", "Francia", "Australia"], keyRegions: ["Jumilla", "Yecla", "Bandol"], tastingNotes: "Potente, tánica, mora y especias." },
  { slug: "mencia", name: "Mencía", synonyms: ["Jaen"], color: "tinta", countries: ["España", "Portugal"], keyRegions: ["Bierzo", "Ribeira Sacra", "Valdeorras"], tastingNotes: "Elegante, fresca, frutos rojos y mineral." },
  { slug: "bobal", name: "Bobal", synonyms: [], color: "tinta", countries: ["España"], keyRegions: ["Utiel-Requena", "Manchuela"], tastingNotes: "Color intenso, frutos negros, taninos suaves." },
  { slug: "graciano", name: "Graciano", synonyms: ["Morrastel"], color: "tinta", countries: ["España", "Francia"], keyRegions: ["Rioja", "Navarra"], tastingNotes: "Minoritaria de Rioja. Aporta color, acidez y complejidad." },
  { slug: "mazuelo", name: "Mazuelo", synonyms: ["Cariñena", "Carignan", "Carignano"], color: "tinta", countries: ["España", "Francia", "Italia"], keyRegions: ["Rioja", "Priorat", "Languedoc"], tastingNotes: "Altos taninos y acidez. Cepas viejas excepcionales." },
  { slug: "garnacha-tintorera", name: "Garnacha Tintorera", synonyms: ["Alicante Bouschet"], color: "tinta", countries: ["España", "Francia", "Portugal"], keyRegions: ["Almansa", "Alicante", "Alentejo"], tastingNotes: "Teinturier: pulpa y piel coloreadas." },
  { slug: "nebbiolo", name: "Nebbiolo", synonyms: ["Spanna", "Chiavennasca"], color: "tinta", countries: ["Italia"], keyRegions: ["Barolo", "Barbaresco", "Langhe"], tastingNotes: "Rosa, alquitrán, trufa. Gran longevidad." },
  { slug: "sangiovese", name: "Sangiovese", synonyms: ["Brunello", "Prugnolo Gentile", "Morellino"], color: "tinta", countries: ["Italia", "Francia", "Estados Unidos"], keyRegions: ["Chianti", "Brunello di Montalcino", "Vino Nobile"], tastingNotes: "Cereza, cuero, tomate seco. Base del Chianti." },
  { slug: "barbera", name: "Barbera", synonyms: [], color: "tinta", countries: ["Italia", "Estados Unidos", "Argentina"], keyRegions: ["Barbera d'Asti", "Barbera d'Alba"], tastingNotes: "Alta acidez, baja en taninos, frutales frescos." },
  { slug: "dolcetto", name: "Dolcetto", synonyms: [], color: "tinta", countries: ["Italia"], keyRegions: ["Dolcetto d'Alba", "Dogliani"], tastingNotes: "Frutos negros y almendra amarga." },
  { slug: "montepulciano", name: "Montepulciano", synonyms: [], color: "tinta", countries: ["Italia"], keyRegions: ["Montepulciano d'Abruzzo", "Rosso Conero"], tastingNotes: "Frutos negros, especias, taninos suaves." },
  { slug: "primitivo", name: "Primitivo", synonyms: ["Zinfandel", "Tribidrag"], color: "tinta", countries: ["Italia", "Estados Unidos", "Croacia"], keyRegions: ["Primitivo di Manduria", "Napa Valley", "Sonoma"], tastingNotes: "Alta graduación, mermelada de frutos, especias." },
  { slug: "nero-d-avola", name: "Nero d'Avola", synonyms: ["Calabrese"], color: "tinta", countries: ["Italia"], keyRegions: ["Sicilia", "Noto"], tastingNotes: "La gran tinta siciliana. Ciruela, chocolate, tabaco." },
  { slug: "aglianico", name: "Aglianico", synonyms: [], color: "tinta", countries: ["Italia"], keyRegions: ["Taurasi", "Aglianico del Vulture"], tastingNotes: "El 'Barolo del Sur'. Taninos firmes, muy longeva." },
  { slug: "nerello-mascalese", name: "Nerello Mascalese", synonyms: [], color: "tinta", countries: ["Italia"], keyRegions: ["Etna", "Faro"], tastingNotes: "Tinta volcánica del Etna. Elegante, comparada con Pinot Noir." },
  { slug: "corvina", name: "Corvina", synonyms: [], color: "tinta", countries: ["Italia"], keyRegions: ["Valpolicella", "Amarone"], tastingNotes: "Cereza ácida, almendra. Se apasiona para Amarone." },
  { slug: "lagrein", name: "Lagrein", synonyms: [], color: "tinta", countries: ["Italia", "Austria"], keyRegions: ["Alto Adige", "Trentino"], tastingNotes: "Color profundo, frutos negros, chocolate." },
  { slug: "cabernet-sauvignon", name: "Cabernet Sauvignon", synonyms: [], color: "tinta", countries: ["Francia", "Estados Unidos", "Chile", "Argentina", "Australia"], keyRegions: ["Pauillac", "Napa Valley", "Maipo"], tastingNotes: "Cassis, cedro, grafito. Reina de Burdeos." },
  { slug: "merlot", name: "Merlot", synonyms: [], color: "tinta", countries: ["Francia", "Italia", "Estados Unidos", "Chile"], keyRegions: ["Pomerol", "Saint-Émilion", "Napa Valley"], tastingNotes: "Ciruela, chocolate, textural suave." },
  { slug: "pinot-noir", name: "Pinot Noir", synonyms: ["Pinot Nero", "Spätburgunder", "Blauburgunder"], color: "tinta", countries: ["Francia", "Alemania", "Nueva Zelanda", "Estados Unidos"], keyRegions: ["Bourgogne", "Champagne", "Central Otago", "Oregon"], tastingNotes: "Transparente, compleja, sensual." },
  { slug: "syrah", name: "Syrah", synonyms: ["Shiraz"], color: "tinta", countries: ["Francia", "Australia", "Sudáfrica", "España"], keyRegions: ["Côte-Rôtie", "Hermitage", "Barossa Valley"], tastingNotes: "Pimienta negra, violeta, carne ahumada." },
  { slug: "cabernet-franc", name: "Cabernet Franc", synonyms: ["Bouchet"], color: "tinta", countries: ["Francia", "Italia", "Estados Unidos"], keyRegions: ["Saint-Émilion", "Chinon", "Bourgueil"], tastingNotes: "Pimiento verde, frambuesa, violeta." },
  { slug: "malbec", name: "Malbec", synonyms: ["Côt", "Auxerrois"], color: "tinta", countries: ["Argentina", "Francia", "Chile"], keyRegions: ["Mendoza", "Valle de Uco", "Cahors"], tastingNotes: "Violeta, ciruela, chocolate. Color profundísimo." },
  { slug: "gamay", name: "Gamay", synonyms: ["Gamay Noir"], color: "tinta", countries: ["Francia", "Suiza"], keyRegions: ["Beaujolais", "Touraine"], tastingNotes: "Frutal, ligera, festiva. Los Crus dan vinos serios." },
  { slug: "cinsault", name: "Cinsault", synonyms: ["Cinsaut"], color: "tinta", countries: ["Francia", "Sudáfrica", "Líbano"], keyRegions: ["Languedoc", "Provence"], tastingNotes: "Ligera, aromática. Parte de ensamblajes del sur." },
  { slug: "touriga-nacional", name: "Touriga Nacional", synonyms: [], color: "tinta", countries: ["Portugal"], keyRegions: ["Douro", "Dão", "Alentejo"], tastingNotes: "Color profundo, floral (violeta), taninos firmes. Base del Oporto." },
  { slug: "touriga-franca", name: "Touriga Franca", synonyms: ["Touriga Francesa"], color: "tinta", countries: ["Portugal"], keyRegions: ["Douro"], tastingNotes: "La más plantada en Douro. Floral, elegante." },
  { slug: "castelao", name: "Castelão", synonyms: ["Periquita", "João de Santarém"], color: "tinta", countries: ["Portugal"], keyRegions: ["Setúbal", "Palmela"], tastingNotes: "Frutos rojos, especias, taninos medios." },
  { slug: "baga", name: "Baga", synonyms: [], color: "tinta", countries: ["Portugal"], keyRegions: ["Bairrada", "Dão"], tastingNotes: "Altísimos taninos y acidez. Capaz de grandes vinos." },
  { slug: "pinotage", name: "Pinotage", synonyms: [], color: "tinta", countries: ["Sudáfrica"], keyRegions: ["Stellenbosch", "Paarl", "Swartland"], tastingNotes: "Cruce de Pinot Noir × Cinsault. Frutos negros, ahumado." },
  { slug: "carmenere", name: "Carménère", synonyms: [], color: "tinta", countries: ["Chile", "Italia"], keyRegions: ["Colchagua", "Maipo", "Rapel"], tastingNotes: "Originaria de Burdeos, redescubierta en Chile." },
  { slug: "tannat", name: "Tannat", synonyms: [], color: "tinta", countries: ["Uruguay", "Francia"], keyRegions: ["Canelones", "Madiran"], tastingNotes: "La gran tinta uruguaya. Taninos potentísimos." },
  { slug: "pais", name: "País", synonyms: ["Listán Prieto", "Misión", "Criolla"], color: "tinta", countries: ["Chile", "Argentina", "México"], keyRegions: ["Maule", "Itata"], tastingNotes: "Cepas centenarias. Vinos frescos, ligeros." },
  { slug: "blaufrankisch", name: "Blaufränkisch", synonyms: ["Lemberger", "Kékfrankos", "Frankovka"], color: "tinta", countries: ["Austria", "Hungría", "Alemania"], keyRegions: ["Burgenland", "Mittelburgenland"], tastingNotes: "Cereza ácida, pimienta, mineral." },
  { slug: "zweigelt", name: "Zweigelt", synonyms: [], color: "tinta", countries: ["Austria", "Hungría"], keyRegions: ["Burgenland", "Weinviertel"], tastingNotes: "Cruce austriaco. Cereza, especias dulces." },
  { slug: "saperavi", name: "Saperavi", synonyms: [], color: "tinta", countries: ["Georgia", "Moldavia"], keyRegions: ["Kakheti", "Kartli"], tastingNotes: "Teinturier georgiana. 8.000 años de historia." },
  { slug: "xinomavro", name: "Xinomavro", synonyms: [], color: "tinta", countries: ["Grecia"], keyRegions: ["Naoussa", "Amyntaio"], tastingNotes: "La 'Nebbiolo griega'. Alta acidez, taninos firmes." },
  { slug: "pinot-meunier", name: "Pinot Meunier", synonyms: ["Meunier"], color: "tinta", countries: ["Francia"], keyRegions: ["Champagne"], tastingNotes: "La tercera uva del Champagne. Frutal, suave." },

  // BLANCAS (45)
  { slug: "albarino", name: "Albariño", synonyms: ["Alvarinho"], color: "blanca", countries: ["España", "Portugal"], keyRegions: ["Rías Baixas", "Vinho Verde"], tastingNotes: "Melocotón, cítricos, salina. Perfecta con marisco." },
  { slug: "verdejo", name: "Verdejo", synonyms: [], color: "blanca", countries: ["España"], keyRegions: ["Rueda", "Cigales"], tastingNotes: "Herbácea, cítrica, almendra. Estrella de Castilla." },
  { slug: "viura", name: "Viura", synonyms: ["Macabeo", "Macabeu"], color: "blanca", countries: ["España", "Francia"], keyRegions: ["Rioja", "Cava", "Penedès"], tastingNotes: "Base del Rioja blanco y del Cava." },
  { slug: "xarello", name: "Xarel·lo", synonyms: ["Xarello"], color: "blanca", countries: ["España"], keyRegions: ["Cava", "Penedès"], tastingNotes: "Cuerpo, estructura y notas terrosas." },
  { slug: "parellada", name: "Parellada", synonyms: [], color: "blanca", countries: ["España"], keyRegions: ["Cava", "Penedès"], tastingNotes: "La más fina de las tres uvas del Cava." },
  { slug: "godello", name: "Godello", synonyms: [], color: "blanca", countries: ["España"], keyRegions: ["Valdeorras", "Bierzo", "Monterrei"], tastingNotes: "Elegante, mineral, con cuerpo. Redescubierta en los 80." },
  { slug: "hondarrabi-zuri", name: "Hondarrabi Zuri", synonyms: [], color: "blanca", countries: ["España"], keyRegions: ["Txakoli de Getaria", "Txakoli de Bizkaia"], tastingNotes: "Ligera, ácida, efervescente. Vino del País Vasco." },
  { slug: "pedro-ximenez", name: "Pedro Ximénez", synonyms: ["PX"], color: "blanca", countries: ["España"], keyRegions: ["Montilla-Moriles", "Jerez"], tastingNotes: "Los vinos dulces más concentrados del mundo." },
  { slug: "palomino", name: "Palomino", synonyms: ["Palomino Fino", "Listán Blanco"], color: "blanca", countries: ["España"], keyRegions: ["Jerez", "Manzanilla de Sanlúcar"], tastingNotes: "Base del Fino, Manzanilla, Amontillado, Oloroso." },
  { slug: "airen", name: "Airén", synonyms: [], color: "blanca", countries: ["España"], keyRegions: ["La Mancha", "Valdepeñas"], tastingNotes: "La más plantada del mundo por superficie." },
  { slug: "treixadura", name: "Treixadura", synonyms: [], color: "blanca", countries: ["España", "Portugal"], keyRegions: ["Ribeiro", "Rías Baixas"], tastingNotes: "La gran blanca del Ribeiro. Floral, afrutada." },
  { slug: "chardonnay", name: "Chardonnay", synonyms: [], color: "blanca", countries: ["Francia", "Estados Unidos", "Australia", "Chile"], keyRegions: ["Chablis", "Meursault", "Champagne", "Napa Valley"], tastingNotes: "La blanca más versátil del mundo." },
  { slug: "sauvignon-blanc", name: "Sauvignon Blanc", synonyms: ["Fumé Blanc"], color: "blanca", countries: ["Francia", "Nueva Zelanda", "Chile"], keyRegions: ["Sancerre", "Marlborough", "Casablanca"], tastingNotes: "Herbácea, cítrica. Loira mineral vs. NZ tropical." },
  { slug: "chenin-blanc", name: "Chenin Blanc", synonyms: ["Steen", "Pineau de la Loire"], color: "blanca", countries: ["Francia", "Sudáfrica"], keyRegions: ["Vouvray", "Savennières", "Swartland"], tastingNotes: "Extraordinariamente versátil: seco, dulce, espumoso." },
  { slug: "viognier", name: "Viognier", synonyms: [], color: "blanca", countries: ["Francia", "Estados Unidos", "Australia"], keyRegions: ["Condrieu", "Château-Grillet"], tastingNotes: "Melocotón, albaricoque, floral. Casi extinta en los 60." },
  { slug: "marsanne", name: "Marsanne", synonyms: [], color: "blanca", countries: ["Francia", "Australia"], keyRegions: ["Hermitage", "Crozes-Hermitage"], tastingNotes: "Blanca del Ródano Norte. Textura y cuerpo." },
  { slug: "roussanne", name: "Roussanne", synonyms: [], color: "blanca", countries: ["Francia", "Australia"], keyRegions: ["Hermitage", "Châteauneuf-du-Pape"], tastingNotes: "Más aromática que Marsanne. Pera, hierbas, miel." },
  { slug: "semillon", name: "Sémillon", synonyms: [], color: "blanca", countries: ["Francia", "Australia"], keyRegions: ["Sauternes", "Graves", "Hunter Valley"], tastingNotes: "Base de Sauternes. Higo, miel, cera." },
  { slug: "muscadet", name: "Muscadet", synonyms: ["Melon de Bourgogne"], color: "blanca", countries: ["Francia"], keyRegions: ["Muscadet Sèvre-et-Maine"], tastingNotes: "Ligera, mineral, salina. Perfecta con ostras." },
  { slug: "gewurztraminer", name: "Gewürztraminer", synonyms: ["Traminer"], color: "blanca", countries: ["Francia", "Alemania", "Austria", "Italia"], keyRegions: ["Alsace", "Alto Adige", "Pfalz"], tastingNotes: "Lichi, rosa, jengibre. Inconfundible." },
  { slug: "muscat", name: "Muscat", synonyms: ["Moscatel", "Moscato", "Muskateller"], color: "blanca", countries: ["Francia", "Italia", "España", "Grecia"], keyRegions: ["Alsace", "Asti", "Pantelleria", "Málaga"], tastingNotes: "La única uva que huele a uva. Secos y dulces." },
  { slug: "riesling", name: "Riesling", synonyms: [], color: "blanca", countries: ["Alemania", "Francia", "Austria", "Australia"], keyRegions: ["Mosel", "Rheingau", "Alsace", "Wachau"], tastingNotes: "La blanca más noble. Acidez eléctrica, petróleo, cítricos." },
  { slug: "gruner-veltliner", name: "Grüner Veltliner", synonyms: [], color: "blanca", countries: ["Austria", "Rep. Checa"], keyRegions: ["Wachau", "Kremstal", "Kamptal"], tastingNotes: "La gran blanca austriaca. Pimienta blanca, legumbres." },
  { slug: "muller-thurgau", name: "Müller-Thurgau", synonyms: ["Rivaner"], color: "blanca", countries: ["Alemania", "Austria", "Italia"], keyRegions: ["Franken", "Rheinhessen", "Alto Adige"], tastingNotes: "Suave, floral, para consumo joven." },
  { slug: "silvaner", name: "Silvaner", synonyms: ["Sylvaner"], color: "blanca", countries: ["Alemania", "Francia"], keyRegions: ["Franken", "Alsace"], tastingNotes: "Terrosa, mineral, discreta. Infravalorada." },
  { slug: "pinot-grigio", name: "Pinot Grigio", synonyms: ["Pinot Gris", "Grauburgunder"], color: "blanca", countries: ["Italia", "Francia", "Alemania", "Nueva Zelanda"], keyRegions: ["Alto Adige", "Friuli", "Alsace", "Oregon"], tastingNotes: "Dos estilos: ligero italiano vs. rico alsaciano." },
  { slug: "glera", name: "Glera", synonyms: [], color: "blanca", countries: ["Italia"], keyRegions: ["Prosecco", "Conegliano Valdobbiadene"], tastingNotes: "La uva del Prosecco. Floral, pera, manzana." },
  { slug: "garganega", name: "Garganega", synonyms: [], color: "blanca", countries: ["Italia"], keyRegions: ["Soave", "Gambellara"], tastingNotes: "Base del Soave. Almendra, cítricos, flores." },
  { slug: "trebbiano", name: "Trebbiano", synonyms: ["Ugni Blanc"], color: "blanca", countries: ["Italia", "Francia"], keyRegions: ["Abruzzo", "Romagna", "Cognac"], tastingNotes: "Alta producción. Neutra, ácida. Base de Cognac." },
  { slug: "vermentino", name: "Vermentino", synonyms: ["Rolle"], color: "blanca", countries: ["Italia", "Francia"], keyRegions: ["Sardegna", "Liguria", "Provence"], tastingNotes: "Mediterránea, salina, herbácea." },
  { slug: "fiano", name: "Fiano", synonyms: [], color: "blanca", countries: ["Italia"], keyRegions: ["Fiano di Avellino", "Campania"], tastingNotes: "Miel, avellana, mineral. Gran longevidad." },
  { slug: "greco", name: "Greco", synonyms: [], color: "blanca", countries: ["Italia"], keyRegions: ["Greco di Tufo", "Campania"], tastingNotes: "Mineral, cítrica, almendra amarga." },
  { slug: "arneis", name: "Arneis", synonyms: [], color: "blanca", countries: ["Italia"], keyRegions: ["Roero", "Langhe"], tastingNotes: "Pera, almendra, flores blancas." },
  { slug: "cortese", name: "Cortese", synonyms: [], color: "blanca", countries: ["Italia"], keyRegions: ["Gavi", "Piemonte"], tastingNotes: "Limón, manzana verde, mineral." },
  { slug: "encruzado", name: "Encruzado", synonyms: [], color: "blanca", countries: ["Portugal"], keyRegions: ["Dão"], tastingNotes: "La gran blanca del Dão. Mineral, compleja." },
  { slug: "antao-vaz", name: "Antão Vaz", synonyms: [], color: "blanca", countries: ["Portugal"], keyRegions: ["Alentejo"], tastingNotes: "Tropical, madura, con cuerpo." },
  { slug: "arinto", name: "Arinto", synonyms: ["Pedernã"], color: "blanca", countries: ["Portugal"], keyRegions: ["Bucelas", "Vinho Verde"], tastingNotes: "Alta acidez, cítrica, mineral." },
  { slug: "loureiro", name: "Loureiro", synonyms: [], color: "blanca", countries: ["Portugal"], keyRegions: ["Vinho Verde"], tastingNotes: "Floral (laurel), fresca, aromática." },
  { slug: "torrontes", name: "Torrontés", synonyms: [], color: "blanca", countries: ["Argentina"], keyRegions: ["Salta", "Cafayate"], tastingNotes: "La blanca argentina. Muy aromática, floral." },
  { slug: "furmint", name: "Furmint", synonyms: [], color: "blanca", countries: ["Hungría", "Austria", "Eslovaquia"], keyRegions: ["Tokaj", "Somló"], tastingNotes: "Base del Tokaji Aszú. Ácida, compleja." },
  { slug: "assyrtiko", name: "Assyrtiko", synonyms: [], color: "blanca", countries: ["Grecia"], keyRegions: ["Santorini"], tastingNotes: "Volcánica, mineral, salina. Altísima acidez." },
  { slug: "rkatsiteli", name: "Rkatsiteli", synonyms: [], color: "blanca", countries: ["Georgia", "Moldavia"], keyRegions: ["Kakheti"], tastingNotes: "Blanca georgiana ancestral. Vinos en qvevri." },
  { slug: "koshu", name: "Koshu", synonyms: [], color: "blanca", countries: ["Japón"], keyRegions: ["Yamanashi"], tastingNotes: "Delicada, ligera, mineral. Con gastronomía japonesa." },
  { slug: "welschriesling", name: "Welschriesling", synonyms: ["Olaszrizling", "Graševina"], color: "blanca", countries: ["Austria", "Hungría", "Croacia"], keyRegions: ["Burgenland", "Steiermark"], tastingNotes: "No tiene relación con Riesling. Ligera, ácida." },

  // ROSADA (1)
  { slug: "moscatel-rosado", name: "Moscatel Rosado", synonyms: ["Muscat Rosé"], color: "rosada", countries: ["España", "Francia"], keyRegions: ["Valencia", "Languedoc"], tastingNotes: "Variante rosada del Moscatel. Muy aromática." },
];

// ═══════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════

export const getGrapeBySlug = (slug: string): GrapeEntry | undefined =>
  grapeEntries.find((g) => g.slug === slug);

export const getCatalogEntry = (slug: string): GrapeCatalogEntry | undefined =>
  grapeCatalog.find((g) => g.slug === slug);

export const hasFullEntry = (slug: string): boolean =>
  grapeEntries.some((g) => g.slug === slug);

export const getGrapesByColor = (color: GrapeColor) =>
  grapeCatalog.filter((g) => g.color === color);

export const getAllGrapeSlugs = () =>
  grapeCatalog.map((g) => g.slug);

export const colorLabels: Record<GrapeColor, { label: string; emoji: string }> = {
  tinta: { label: "Tintas", emoji: "🍷" },
  blanca: { label: "Blancas", emoji: "🥂" },
  rosada: { label: "Rosadas", emoji: "🌸" },
};
