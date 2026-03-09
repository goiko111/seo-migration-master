export interface WineEntry {
  slug: string;
  name: string;
  category: "uva" | "region" | "estilo" | "maridaje";
  description: string;
  intro: string;
  characteristics: string[];
  aromas: string[];
  pairings: string[];
  regions: string[];
  examples: string[];
  image?: string;
}

export const wineLibrary: WineEntry[] = [
  // ── UVAS ──
  {
    slug: "tempranillo",
    name: "Tempranillo",
    category: "uva",
    description: "La uva tinta más importante de España, base de los grandes vinos de Rioja y Ribera del Duero.",
    intro: "Tempranillo es la variedad tinta española por excelencia. Su nombre hace referencia a su maduración temprana, y es la base de algunos de los vinos más reconocidos del mundo. Versátil y elegante, se adapta a climas diversos y produce vinos que van desde jóvenes afrutados hasta grandes reservas con décadas de evolución.",
    characteristics: ["Cuerpo medio a alto", "Taninos suaves y elegantes", "Buena acidez", "Gran capacidad de envejecimiento", "Se expresa distinto según la región"],
    aromas: ["Cereza", "Ciruela", "Vainilla", "Cuero", "Tabaco", "Especias"],
    pairings: ["Cordero asado", "Jamón ibérico", "Quesos curados", "Guisos de legumbres", "Carnes a la brasa"],
    regions: ["Rioja", "Ribera del Duero", "Toro", "La Mancha", "Alentejo (Portugal)"],
    examples: ["Rioja Reserva", "Ribera del Duero Crianza", "Toro joven", "Cigales rosado"],
  },
  {
    slug: "chardonnay",
    name: "Chardonnay",
    category: "uva",
    description: "La uva blanca más cultivada del mundo, capaz de producir vinos muy distintos según la región y la vinificación.",
    intro: "Chardonnay es la variedad blanca más versátil que existe. Puede dar desde vinos minerales y ácidos en Chablis hasta blancos cremosos fermentados en barrica en California. Su neutralidad permite que el terroir y la técnica del enólogo se expresen con claridad.",
    characteristics: ["Muy adaptable a distintos climas", "Cuerpo medio a alto", "Responde bien a la crianza en barrica", "Acidez moderada a alta", "Gran potencial de envejecimiento"],
    aromas: ["Manzana verde", "Cítricos", "Mantequilla", "Avellana", "Piña tropical", "Vainilla"],
    pairings: ["Pescado a la plancha", "Pollo asado", "Risotto de setas", "Marisco con salsas cremosas", "Pasta con trufa"],
    regions: ["Borgoña", "Champagne", "California", "Australia", "Chile", "Penedès"],
    examples: ["Chablis Premier Cru", "Meursault", "Chardonnay de Sonoma", "Cava Reserva"],
  },
  {
    slug: "garnacha",
    name: "Garnacha",
    category: "uva",
    description: "Uva mediterránea que produce vinos cálidos, generosos y con gran expresión frutal.",
    intro: "La Garnacha es una de las variedades más plantadas del mundo y está viviendo un renacimiento extraordinario. Desde los viejos viñedos del Priorat hasta las garnachas de altura de Aragón, produce vinos de intensidad y carácter únicos. Es también la base de muchos grandes rosados.",
    characteristics: ["Cuerpo medio a alto", "Alcohol generoso", "Taninos suaves", "Gran expresión frutal", "Excelente en monovarietal y en coupage"],
    aromas: ["Fresa madura", "Frambuesa", "Regaliz", "Pimienta blanca", "Garriga mediterránea"],
    pairings: ["Carnes a la brasa", "Cochinillo", "Pimientos asados", "Embutidos", "Arroces"],
    regions: ["Priorat", "Campo de Borja", "Châteauneuf-du-Pape", "Cerdeña", "Navarra"],
    examples: ["Priorat Vi de Vila", "Garnachas de Gredos", "Châteauneuf-du-Pape", "Navarra rosado"],
  },
  {
    slug: "sauvignon-blanc",
    name: "Sauvignon Blanc",
    category: "uva",
    description: "Uva blanca aromática que produce vinos frescos, herbáceos y con alta acidez.",
    intro: "Sauvignon Blanc es sinónimo de frescura. Desde el valle del Loira hasta Nueva Zelanda, produce vinos vibrantes con aromas intensos y una acidez que la convierte en compañera ideal de mariscos y ensaladas. Es una de las uvas más reconocibles por su perfil aromático inconfundible.",
    characteristics: ["Acidez alta y refrescante", "Aromas intensos y reconocibles", "Cuerpo ligero a medio", "Mejor en joven", "Expresión varietal muy marcada"],
    aromas: ["Hierba recién cortada", "Pomelo", "Maracuyá", "Grosella", "Espárrago", "Mineral"],
    pairings: ["Ensaladas frescas", "Ceviche", "Queso de cabra", "Espárragos", "Sushi"],
    regions: ["Marlborough", "Valle del Loira (Sancerre)", "Rueda", "Chile", "Burdeos"],
    examples: ["Sancerre", "Marlborough Sauvignon Blanc", "Rueda Verdejo-Sauvignon", "Pouilly-Fumé"],
  },
  {
    slug: "cabernet-sauvignon",
    name: "Cabernet Sauvignon",
    category: "uva",
    description: "La uva tinta más reconocida del mundo, conocida por su estructura, longevidad y carácter.",
    intro: "Cabernet Sauvignon es la referencia mundial en uvas tintas. Desde Burdeos hasta Napa Valley, produce vinos potentes, estructurados y con gran capacidad de envejecimiento. Sus taninos firmes y su perfil aromático complejo la convierten en la base de algunos de los vinos más cotizados del planeta.",
    characteristics: ["Taninos firmes y estructurados", "Gran capacidad de envejecimiento", "Cuerpo alto", "Color intenso", "Se beneficia de la crianza en barrica"],
    aromas: ["Cassis", "Pimiento verde", "Cedro", "Tabaco", "Chocolate negro", "Menta"],
    pairings: ["Chuletón", "Estofados", "Quesos muy curados", "Cordero con hierbas", "Platos con trufa"],
    regions: ["Burdeos", "Napa Valley", "Coonawarra", "Chile (Maipo)", "Penedès"],
    examples: ["Médoc Cru Classé", "Napa Cabernet", "Maipo Valley Reserva", "Super Toscano"],
  },

  // ── REGIONES ──
  {
    slug: "rioja",
    name: "Rioja",
    category: "region",
    description: "La denominación de origen más prestigiosa de España, famosa por sus tintos de Tempranillo envejecidos en barrica.",
    intro: "Rioja es sinónimo de vino español de calidad. Con más de un siglo de tradición, la región produce desde jóvenes frescos hasta Grandes Reservas con décadas de evolución. Sus tres subzonas (Rioja Alta, Rioja Alavesa y Rioja Oriental) ofrecen estilos distintos que reflejan la diversidad del terroir.",
    characteristics: ["Tres subzonas con personalidad propia", "Tradición de crianza en barrica de roble americano", "Nueva generación de vinos de pueblo y parcela", "Tintos, blancos y rosados de calidad", "Clasificación por tiempo de crianza"],
    aromas: ["Cereza", "Vainilla", "Cuero fino", "Especias dulces", "Frutos rojos maduros"],
    pairings: ["Cordero asado", "Chuletillas", "Pimientos del piquillo", "Queso idiazábal", "Patatas a la riojana"],
    regions: ["Rioja Alta", "Rioja Alavesa", "Rioja Oriental"],
    examples: ["Rioja Crianza", "Rioja Reserva", "Rioja Gran Reserva", "Rioja blanco fermentado en barrica"],
  },
  {
    slug: "borgona",
    name: "Borgoña",
    category: "region",
    description: "La región francesa que produce los Pinot Noir y Chardonnay más refinados y codiciados del mundo.",
    intro: "Borgoña (Bourgogne) es el templo del terroir. Aquí, el concepto de climats — parcelas definidas por siglos de tradición — alcanza su máxima expresión. Con Pinot Noir para tintos y Chardonnay para blancos, Borgoña produce vinos de una elegancia y complejidad difíciles de igualar.",
    characteristics: ["Sistema de clasificación por parcelas (Grand Cru, Premier Cru)", "Tintos de Pinot Noir elegantes y complejos", "Blancos de Chardonnay minerales y profundos", "Terroir como factor determinante", "Vinos de guarda excepcionales"],
    aromas: ["Cereza", "Fresa silvestre", "Trufa", "Tierra húmeda", "Mantequilla", "Avellana"],
    pairings: ["Boeuf bourguignon", "Pollo de Bresse", "Quesos de pasta blanda", "Foie gras", "Pescado con salsa de mantequilla"],
    regions: ["Côte de Nuits", "Côte de Beaune", "Chablis", "Mâconnais", "Côte Chalonnaise"],
    examples: ["Gevrey-Chambertin", "Meursault", "Chablis Grand Cru", "Romanée-Conti", "Pommard"],
  },
  {
    slug: "priorat",
    name: "Priorat",
    category: "region",
    description: "Denominación de origen catalana de prestigio internacional, famosa por sus vinos potentes de garnacha y cariñena sobre suelos de llicorella.",
    intro: "El Priorat es una de las dos únicas DOCa (Denominación de Origen Calificada) de España. Sus viñedos en terrazas escarpadas, con suelos de pizarra (llicorella), producen vinos de una concentración e intensidad excepcionales. La garnacha vieja y la cariñena son las protagonistas de esta región única.",
    characteristics: ["Suelos de llicorella (pizarra)", "Viñedos en terrazas con pendientes extremas", "Rendimientos muy bajos", "Vinos de gran concentración", "DOCa junto con Rioja"],
    aromas: ["Pizarra", "Fruta negra madura", "Regaliz", "Garriga", "Mineral", "Especias"],
    pairings: ["Carnes de caza", "Estofados de invierno", "Embutidos catalanes", "Quesos potentes", "Cocina con setas"],
    regions: ["Gratallops", "Porrera", "Bellmunt del Priorat", "Scala Dei"],
    examples: ["Priorat Vi de Vila", "Clos Mogador", "L'Ermita", "Clos Erasmus"],
  },
  {
    slug: "napa-valley",
    name: "Napa Valley",
    category: "region",
    description: "El valle californiano que revolucionó el mundo del vino con sus Cabernet Sauvignon potentes y sus Chardonnay opulentos.",
    intro: "Napa Valley es la región vinícola más famosa de Estados Unidos y una de las más reconocidas del mundo. Desde el histórico Juicio de París en 1976, sus vinos compiten con los mejores de Francia. Con un clima ideal y una cultura de innovación, Napa produce Cabernet Sauvignon de clase mundial.",
    characteristics: ["Clima mediterráneo ideal", "Cabernet Sauvignon como variedad estrella", "Alta inversión en enología y viticultura", "Diversidad de microclimas y suelos", "Enoturismo de primer nivel"],
    aromas: ["Cassis", "Vainilla", "Roble tostado", "Chocolate", "Fruta negra madura", "Eucalipto"],
    pairings: ["Chuletón de buey", "Costillas BBQ", "Quesos americanos artesanales", "Cordero con romero"],
    regions: ["Oakville", "Rutherford", "Stags Leap", "Howell Mountain", "Carneros"],
    examples: ["Opus One", "Screaming Eagle", "Caymus", "Silver Oak"],
  },

  // ── ESTILOS ──
  {
    slug: "vino-tinto",
    name: "Vino tinto",
    category: "estilo",
    description: "Vinos elaborados con uvas tintas, donde la maceración con pieles aporta color, taninos y estructura.",
    intro: "El vino tinto es el resultado de la fermentación del mosto de uvas tintas en contacto con sus pieles. Este proceso de maceración extrae color, taninos y compuestos aromáticos que definen el carácter del vino. Desde jóvenes afrutados hasta grandes reservas, el mundo del tinto es el más amplio y diverso de la enología.",
    characteristics: ["Maceración con pieles para extraer color y taninos", "Amplio rango de cuerpo y estructura", "Temperatura de servicio: 16-18°C", "Gran potencial de envejecimiento", "Maridaje versátil con carnes, quesos y guisos"],
    aromas: ["Frutos rojos", "Frutos negros", "Especias", "Cuero", "Vainilla", "Chocolate"],
    pairings: ["Carnes rojas", "Guisos", "Quesos curados", "Embutidos", "Pastas con salsas potentes"],
    regions: ["Rioja", "Burdeos", "Toscana", "Ribera del Duero", "Napa Valley"],
    examples: ["Rioja Reserva", "Chianti Classico", "Barolo", "Malbec argentino"],
  },
  {
    slug: "vino-blanco",
    name: "Vino blanco",
    category: "estilo",
    description: "Vinos elaborados con uvas blancas (o tintas sin maceración), frescos, aromáticos y versátiles.",
    intro: "El vino blanco se elabora fermentando el mosto sin contacto prolongado con las pieles, lo que resulta en vinos de color claro, frescos y generalmente más ligeros que los tintos. La diversidad es enorme: desde Albariños minerales hasta Chardonnays cremosos fermentados en barrica.",
    characteristics: ["Fermentación sin maceración con pieles", "Temperatura de servicio: 8-12°C", "Acidez como eje estructural", "Desde ligeros y frescos hasta complejos y con crianza", "Ideal como aperitivo y con pescados y mariscos"],
    aromas: ["Cítricos", "Manzana", "Flores blancas", "Frutas tropicales", "Mineral", "Miel"],
    pairings: ["Pescado", "Marisco", "Ensaladas", "Sushi", "Quesos frescos", "Pollo"],
    regions: ["Rías Baixas", "Borgoña", "Alsacia", "Rueda", "Marlborough"],
    examples: ["Albariño", "Chablis", "Riesling", "Verdejo", "Gewürztraminer"],
  },
  {
    slug: "vino-rosado",
    name: "Vino rosado",
    category: "estilo",
    description: "Vinos de color rosa elaborados con uvas tintas con un breve contacto con las pieles.",
    intro: "El rosado ha dejado de ser un vino de segunda para convertirse en protagonista de la escena gastronómica. Elaborado con uvas tintas pero con una maceración corta, ofrece la frescura de un blanco con algunos matices de un tinto. Provenza, Navarra y Tavel son referencias mundiales.",
    characteristics: ["Maceración corta con pieles (2-24 horas)", "Color rosa pálido a salmón intenso", "Temperatura de servicio: 8-10°C", "Frescura y versatilidad", "Ideal para climas cálidos y terrazas"],
    aromas: ["Fresa", "Frambuesa", "Pétalos de rosa", "Cítricos", "Caramelo"],
    pairings: ["Ensaladas mediterráneas", "Paella", "Pizza", "Sushi", "Cocina asiática ligera"],
    regions: ["Provenza", "Navarra", "Tavel", "Cigales", "Bandol"],
    examples: ["Rosé de Provence", "Navarra rosado de Garnacha", "Tavel rosé", "Cigales rosado"],
  },
  {
    slug: "vino-espumoso",
    name: "Vino espumoso",
    category: "estilo",
    description: "Vinos con burbujas producidas por una segunda fermentación, desde Champagne hasta Cava y Prosecco.",
    intro: "Los vinos espumosos son sinónimo de celebración, pero también de gastronomía. La segunda fermentación (en botella o en tanque) genera las burbujas que los caracterizan. Desde el refinamiento del Champagne hasta la frescura del Prosecco, los espumosos ofrecen una experiencia sensorial única.",
    characteristics: ["Segunda fermentación para generar CO₂", "Método tradicional (Champagne, Cava) vs. Charmat (Prosecco)", "Temperatura de servicio: 6-8°C", "Versatilidad gastronómica extraordinaria", "Desde brut nature hasta dulce"],
    aromas: ["Pan tostado", "Manzana verde", "Cítricos", "Brioche", "Almendra", "Flores blancas"],
    pairings: ["Aperitivos", "Marisco y ostras", "Sushi de alta gama", "Jamón ibérico", "Postres ligeros"],
    regions: ["Champagne", "Penedès", "Prosecco (Veneto)", "Franciacorta", "English sparkling"],
    examples: ["Champagne Brut", "Cava Reserva", "Prosecco Superiore", "Crémant de Bourgogne"],
  },

  // ── MARIDAJES ──
  {
    slug: "maridaje-carne",
    name: "Maridaje con carnes",
    category: "maridaje",
    description: "Guía para elegir el vino perfecto según el tipo de carne y su preparación.",
    intro: "El maridaje de vino y carne es uno de los más clásicos de la gastronomía. Pero no basta con decir 'tinto con carne': el tipo de corte, la cocción y la salsa determinan qué vino funcionará mejor. Un filete a la plancha pide un vino diferente al de un estofado lento.",
    characteristics: ["Carnes rojas: tintos con estructura y taninos", "Carnes blancas: tintos ligeros o blancos con cuerpo", "Carnes a la brasa: tintos potentes con notas ahumadas", "Estofados: tintos con buena acidez", "Carnes curadas: tintos jóvenes y frescos"],
    aromas: ["Frutos negros", "Especias", "Ahumados", "Hierbas aromáticas", "Cuero"],
    pairings: ["Chuletón → Cabernet Sauvignon", "Cordero → Rioja Reserva", "Pollo asado → Chardonnay con barrica", "Cochinillo → Garnacha", "Solomillo → Pinot Noir"],
    regions: ["Rioja", "Burdeos", "Napa Valley", "Ribera del Duero", "Borgoña"],
    examples: ["Ribeye con Malbec", "Cordero con Rioja Gran Reserva", "Pollo con Chardonnay de Borgoña"],
  },
  {
    slug: "maridaje-pescado",
    name: "Maridaje con pescados",
    category: "maridaje",
    description: "Cómo elegir vinos que complementen pescados y mariscos sin dominarlos.",
    intro: "El maridaje con pescado requiere equilibrio: el vino no debe dominar el sabor delicado del mar. La acidez y la frescura son aliados naturales, pero hay excepciones fascinantes como tintos ligeros con atún o rosados con pulpo a la brasa.",
    characteristics: ["Pescado blanco: blancos ligeros y ácidos", "Pescado azul: blancos con cuerpo o rosados", "Marisco: espumosos o blancos minerales", "Pescado a la brasa: blancos con barrica o rosados", "Sushi: espumosos o Riesling"],
    aromas: ["Cítricos", "Mineral", "Flores blancas", "Hierbas", "Sal marina"],
    pairings: ["Lubina → Albariño", "Atún → Pinot Noir ligero", "Gambas → Cava Brut", "Salmón → Chardonnay", "Pulpo → Mencía rosado"],
    regions: ["Rías Baixas", "Chablis", "Champagne", "Rueda", "Marlborough"],
    examples: ["Dorada a la sal con Godello", "Ceviche con Sauvignon Blanc", "Ostras con Champagne"],
  },
  {
    slug: "maridaje-queso",
    name: "Maridaje con quesos",
    category: "maridaje",
    description: "Combinaciones de vino y queso que potencian los sabores de ambos.",
    intro: "El maridaje vino-queso es un clásico, pero las combinaciones más exitosas no siempre son las más obvias. Los quesos frescos piden blancos ligeros, los curados necesitan tintos con cuerpo, y los azules encuentran su pareja ideal en vinos dulces.",
    characteristics: ["Quesos frescos: blancos jóvenes y frescos", "Quesos semicurados: tintos jóvenes o blancos con barrica", "Quesos curados: tintos con crianza", "Quesos azules: vinos dulces o generosos", "Quesos de cabra: Sauvignon Blanc o espumosos"],
    aromas: ["Fruta", "Frutos secos", "Miel", "Especias", "Mantequilla"],
    pairings: ["Manchego curado → Tempranillo Reserva", "Cabrales → Pedro Ximénez", "Brie → Champagne", "Idiazábal → Rioja Crianza", "Queso de cabra → Sancerre"],
    regions: ["Rioja", "Jerez", "Champagne", "Valle del Loira", "Borgoña"],
    examples: ["Tabla de quesos con selección de 3 vinos", "Fondue con Gruyère y vino blanco suizo"],
  },
];

export const getByCategory = (category: WineEntry["category"]) =>
  wineLibrary.filter((e) => e.category === category);

export const getBySlug = (slug: string) =>
  wineLibrary.find((e) => e.slug === slug);

export const categoryMeta: Record<WineEntry["category"], { title: string; plural: string; description: string; slug: string }> = {
  uva: {
    title: "Uvas",
    plural: "Variedades de uva",
    description: "Guía completa de las principales variedades de uva utilizadas en la elaboración de vino.",
    slug: "uvas",
  },
  region: {
    title: "Regiones vinícolas",
    plural: "Regiones vinícolas",
    description: "Las regiones productoras de vino más importantes del mundo y sus características.",
    slug: "regiones",
  },
  estilo: {
    title: "Estilos de vino",
    plural: "Estilos de vino",
    description: "Los principales estilos de vino: tinto, blanco, rosado, espumoso y más.",
    slug: "estilos",
  },
  maridaje: {
    title: "Maridajes",
    plural: "Guías de maridaje",
    description: "Cómo combinar vino con diferentes tipos de alimentos para una experiencia gastronómica perfecta.",
    slug: "maridajes",
  },
};
