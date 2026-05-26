import {
  categoryMeta,
  pairingEntries,
  type DishPairing,
  type PairingCategory,
  type PairingEntry,
} from "./pairingsLibrary";
import {
  categoryLabels,
  formatList,
  normalizeWineOverlayLang,
  resolveWineLang,
  seoDescription,
  seoTitle,
  type WineI18nLang,
  type WineI18nOverlay,
  type WineOverlayMap,
  type WineRuntimeLang,
} from "./wineLibraryI18n";

interface PairingI18nOverlay extends WineI18nOverlay {
  name: string;
  principles?: string[];
  dishes?: DishPairing[];
  commonMistakes?: string[];
  alternatives?: string[];
  cartaUsage?: string;
  salaLanguage?: string;
  safeOptions?: string;
  differentialOptions?: string;
  restaurantMistakes?: string;
  whenClassicLoses?: string;
  bestConcepts?: string[];
  faqs?: { q: string; a: string }[];
}

type PairingOverlays = WineOverlayMap<PairingI18nOverlay>;

const pairingNames: Record<WineRuntimeLang, Record<PairingCategory, string>> = {
  es: {
    "carnes-rojas": "Maridaje con carnes rojas",
    "aves-caza": "Maridaje con aves y caza",
    "pescados-mariscos": "Maridaje con pescados y mariscos",
    quesos: "Maridaje con quesos",
    "pasta-arroces-legumbres": "Maridaje con pasta, arroces y legumbres",
    "verduras-vegetariana": "Maridaje con verduras y cocina vegetariana",
    "embutidos-charcuteria": "Maridaje con embutidos y charcutería",
    "postres-chocolate": "Maridaje con postres y chocolate",
    "cocina-asiatica-fusion": "Maridaje con cocina asiática y fusión",
    "tapas-aperitivos": "Maridaje con tapas y aperitivos",
  },
  en: {
    "carnes-rojas": "Pairing with Red Meat",
    "aves-caza": "Pairing with Poultry and Game",
    "pescados-mariscos": "Pairing with Fish and Seafood",
    quesos: "Pairing with Cheese",
    "pasta-arroces-legumbres": "Pairing with Pasta, Rice and Legumes",
    "verduras-vegetariana": "Pairing with Vegetables and Vegetarian Cuisine",
    "embutidos-charcuteria": "Pairing with Cured Meats and Charcuterie",
    "postres-chocolate": "Pairing with Desserts and Chocolate",
    "cocina-asiatica-fusion": "Pairing with Asian and Fusion Cuisine",
    "tapas-aperitivos": "Pairing with Tapas and Aperitifs",
  },
  fr: {
    "carnes-rojas": "Accords avec Viandes Rouges",
    "aves-caza": "Accords avec Volailles et Gibier",
    "pescados-mariscos": "Accords avec Poissons et Fruits de Mer",
    quesos: "Accords avec Fromages",
    "pasta-arroces-legumbres": "Accords avec Pâtes, Riz et Légumineuses",
    "verduras-vegetariana": "Accords avec Légumes et Cuisine Végétarienne",
    "embutidos-charcuteria": "Accords avec Charcuterie",
    "postres-chocolate": "Accords avec Desserts et Chocolat",
    "cocina-asiatica-fusion": "Accords avec Cuisine Asiatique et Fusion",
    "tapas-aperitivos": "Accords avec Tapas et Apéritifs",
  },
  it: {
    "carnes-rojas": "Abbinamento con Carni Rosse",
    "aves-caza": "Abbinamento con Pollame e Selvaggina",
    "pescados-mariscos": "Abbinamento con Pesce e Frutti di Mare",
    quesos: "Abbinamento con Formaggi",
    "pasta-arroces-legumbres": "Abbinamento con Pasta, Riso e Legumi",
    "verduras-vegetariana": "Abbinamento con Verdure e Cucina Vegetariana",
    "embutidos-charcuteria": "Abbinamento con Salumi e Charcuterie",
    "postres-chocolate": "Abbinamento con Dessert e Cioccolato",
    "cocina-asiatica-fusion": "Abbinamento con Cucina Asiatica e Fusion",
    "tapas-aperitivos": "Abbinamento con Tapas e Aperitivi",
  },
  de: {
    "carnes-rojas": "Weinbegleitung zu Rotem Fleisch",
    "aves-caza": "Weinbegleitung zu Geflügel und Wild",
    "pescados-mariscos": "Weinbegleitung zu Fisch und Meeresfrüchten",
    quesos: "Weinbegleitung zu Käse",
    "pasta-arroces-legumbres": "Weinbegleitung zu Pasta, Reis und Hülsenfrüchten",
    "verduras-vegetariana": "Weinbegleitung zu Gemüse und Vegetarischer Küche",
    "embutidos-charcuteria": "Weinbegleitung zu Wurstwaren und Charcuterie",
    "postres-chocolate": "Weinbegleitung zu Desserts und Schokolade",
    "cocina-asiatica-fusion": "Weinbegleitung zu Asiatischer und Fusion-Küche",
    "tapas-aperitivos": "Weinbegleitung zu Tapas und Aperitifs",
  },
  pt: {
    "carnes-rojas": "Harmonização com Carnes Vermelhas",
    "aves-caza": "Harmonização com Aves e Caça",
    "pescados-mariscos": "Harmonização com Peixes e Mariscos",
    quesos: "Harmonização com Queijos",
    "pasta-arroces-legumbres": "Harmonização com Massas, Arroz e Leguminosas",
    "verduras-vegetariana": "Harmonização com Legumes e Cozinha Vegetariana",
    "embutidos-charcuteria": "Harmonização com Enchidos e Charcutaria",
    "postres-chocolate": "Harmonização com Sobremesas e Chocolate",
    "cocina-asiatica-fusion": "Harmonização com Cozinha Asiática e Fusão",
    "tapas-aperitivos": "Harmonização com Tapas e Aperitivos",
  },
};

const priorityPairingNameOverrides: Record<string, Partial<Record<WineI18nLang, string>>> = {
  "lubina-dorada": {
    en: "Pairing with White Fish",
    fr: "Accords avec Poisson Blanc",
    it: "Abbinamento con Pesce Bianco",
    de: "Weinbegleitung zu Weißfisch",
    pt: "Harmonização com Peixe Branco",
  },
};

const priorityDishNameOverrides: Record<string, Record<string, Partial<Record<WineI18nLang, string>>>> = {
  "lubina-dorada": {
    "Lubina a la sal": {
      en: "Salt-baked sea bass",
      fr: "Bar en croute de sel",
      it: "Branzino al sale",
      de: "Wolfsbarsch in Salzkruste",
      pt: "Robalo ao sal",
    },
    "Dorada a la plancha": {
      en: "Grilled sea bream",
      fr: "Daurade a la plancha",
      it: "Orata alla piastra",
      de: "Gegrillte Dorade",
      pt: "Dourada grelhada",
    },
    "Lubina con hinojo": {
      en: "Sea bass with fennel",
      fr: "Bar au fenouil",
      it: "Branzino con finocchio",
      de: "Wolfsbarsch mit Fenchel",
      pt: "Robalo com funcho",
    },
    "Dorada rellena de hierbas": {
      en: "Herb-stuffed sea bream",
      fr: "Daurade farcie aux herbes",
      it: "Orata ripiena alle erbe",
      de: "Dorade mit Krautern gefullt",
      pt: "Dourada recheada com ervas",
    },
  },
};

const localizedBestConcepts: Record<WineRuntimeLang, Record<PairingCategory, string[]>> = {
  es: {
    "carnes-rojas": ["Asador", "Steakhouse", "Parrilla", "Cocina castellana"],
    "aves-caza": ["Restaurante gastronómico", "Caza", "Cocina francesa"],
    "pescados-mariscos": ["Marisquería", "Restaurante costero", "Cocina japonesa", "Mercado"],
    quesos: ["Wine bar", "Restaurante gastronómico", "Tabla de quesos", "Hotel"],
    "pasta-arroces-legumbres": ["Trattoria", "Arrocería", "Gastrobar", "Menú diario"],
    "verduras-vegetariana": ["Vegetariano", "Cocina de mercado", "Mediterráneo"],
    "embutidos-charcuteria": ["Tapas", "Wine bar", "Aperitivo"],
    "postres-chocolate": ["Restaurante gastronómico", "Hotel", "Menú degustación"],
    "cocina-asiatica-fusion": ["Japonés", "Nikkei", "Thai", "Fusión"],
    "tapas-aperitivos": ["Tapas", "Bar de vinos", "Aperitivo"],
  },
  en: {
    "carnes-rojas": ["Grill", "Steakhouse", "Argentinian grill", "Meat-led dining"],
    "aves-caza": ["Fine dining", "Game restaurant", "French cuisine"],
    "pescados-mariscos": ["Seafood restaurant", "Coastal dining", "Japanese cuisine", "Market cuisine"],
    quesos: ["Wine bar", "Fine dining", "Cheese board", "Hotel"],
    "pasta-arroces-legumbres": ["Trattoria", "Rice restaurant", "Gastrobar", "Casual dining"],
    "verduras-vegetariana": ["Vegetarian", "Market cuisine", "Mediterranean"],
    "embutidos-charcuteria": ["Tapas", "Wine bar", "Aperitif"],
    "postres-chocolate": ["Fine dining", "Hotel", "Tasting menu"],
    "cocina-asiatica-fusion": ["Japanese", "Nikkei", "Thai", "Fusion"],
    "tapas-aperitivos": ["Tapas", "Wine bar", "Aperitif"],
  },
  fr: {
    "carnes-rojas": ["Grill", "Steakhouse", "Cuisine de viande", "Brasserie"],
    "aves-caza": ["Gastronomie", "Gibier", "Cuisine francaise"],
    "pescados-mariscos": ["Fruits de mer", "Cuisine côtière", "Japonais", "Cuisine de marché"],
    quesos: ["Bar a vin", "Gastronomie", "Plateau de fromages", "Hotel"],
    "pasta-arroces-legumbres": ["Trattoria", "Riz", "Gastrobar", "Cuisine quotidienne"],
    "verduras-vegetariana": ["Vegetarien", "Cuisine de marché", "Mediterraneen"],
    "embutidos-charcuteria": ["Tapas", "Bar a vin", "Aperitif"],
    "postres-chocolate": ["Gastronomie", "Hotel", "Menu degustation"],
    "cocina-asiatica-fusion": ["Japonais", "Nikkei", "Thai", "Fusion"],
    "tapas-aperitivos": ["Tapas", "Bar a vin", "Aperitif"],
  },
  it: {
    "carnes-rojas": ["Griglia", "Steakhouse", "Parrilla", "Cucina di carne"],
    "aves-caza": ["Fine dining", "Selvaggina", "Cucina francese"],
    "pescados-mariscos": ["Pesce", "Cucina costiera", "Giapponese", "Mercato"],
    quesos: ["Wine bar", "Fine dining", "Tagliere", "Hotel"],
    "pasta-arroces-legumbres": ["Trattoria", "Risotti", "Gastrobar", "Casual dining"],
    "verduras-vegetariana": ["Vegetariano", "Cucina di mercato", "Mediterraneo"],
    "embutidos-charcuteria": ["Tapas", "Wine bar", "Aperitivo"],
    "postres-chocolate": ["Fine dining", "Hotel", "Menu degustazione"],
    "cocina-asiatica-fusion": ["Giapponese", "Nikkei", "Thai", "Fusion"],
    "tapas-aperitivos": ["Tapas", "Wine bar", "Aperitivo"],
  },
  de: {
    "carnes-rojas": ["Grill", "Steakhouse", "Fleischrestaurant", "Parrilla"],
    "aves-caza": ["Fine Dining", "Wild", "Franzosische Kuche"],
    "pescados-mariscos": ["Seafood", "Kustenkuche", "Japanisch", "Marktkuche"],
    quesos: ["Weinbar", "Fine Dining", "Kaseplatte", "Hotel"],
    "pasta-arroces-legumbres": ["Trattoria", "Reisgerichte", "Gastrobar", "Casual Dining"],
    "verduras-vegetariana": ["Vegetarisch", "Marktkuche", "Mediterran"],
    "embutidos-charcuteria": ["Tapas", "Weinbar", "Aperitif"],
    "postres-chocolate": ["Fine Dining", "Hotel", "Degustationsmenu"],
    "cocina-asiatica-fusion": ["Japanisch", "Nikkei", "Thai", "Fusion"],
    "tapas-aperitivos": ["Tapas", "Weinbar", "Aperitif"],
  },
  pt: {
    "carnes-rojas": ["Grelha", "Steakhouse", "Parrilla", "Cozinha de carne"],
    "aves-caza": ["Fine dining", "Caça", "Cozinha francesa"],
    "pescados-mariscos": ["Marisqueira", "Cozinha costeira", "Japonês", "Mercado"],
    quesos: ["Wine bar", "Fine dining", "Tábua de queijos", "Hotel"],
    "pasta-arroces-legumbres": ["Trattoria", "Arrozes", "Gastrobar", "Casual"],
    "verduras-vegetariana": ["Vegetariano", "Cozinha de mercado", "Mediterrâneo"],
    "embutidos-charcuteria": ["Tapas", "Wine bar", "Aperitivo"],
    "postres-chocolate": ["Fine dining", "Hotel", "Menu de degustação"],
    "cocina-asiatica-fusion": ["Japonês", "Nikkei", "Thai", "Fusão"],
    "tapas-aperitivos": ["Tapas", "Wine bar", "Aperitivo"],
  },
};

const genericPairingCopy: Record<WineI18nLang, {
  description: (name: string, category: string, styles: string) => string;
  intro: (category: string, grapes: string, regions: string) => string;
  principles: (category: string) => string[];
  dishNote: (dish: string, styles: string) => string;
  commonMistakes: (category: string) => string[];
  alternatives: (styles: string) => string[];
  cartaUsage: (category: string) => string;
  salaLanguage: (category: string, styles: string) => string;
  safeOptions: (styles: string) => string;
  differentialOptions: (grapes: string, regions: string) => string;
  restaurantMistakes: (category: string) => string;
  whenClassicLoses: (category: string) => string;
  faqs: (name: string, styles: string) => { q: string; a: string }[];
}> = {
  en: {
    description: (name, category, styles) => `${name} connects ${category.toLowerCase()} with wines that balance intensity, fat, acidity and texture. Useful starting styles include ${styles || "versatile wines"}.`,
    intro: (category, grapes, regions) => `For ${category.toLowerCase()}, the strongest recommendation reads the dish first and the wine second. Grapes such as ${grapes || "classic varieties"} and regions such as ${regions || "benchmark regions"} give the team a reliable route.`,
    principles: (category) => [`Match the intensity of ${category.toLowerCase()} with the wine body.`, "Use acidity, bubbles or tannin to refresh fat.", "Let sauces and cooking technique lead the recommendation.", "Avoid wines that dominate the texture of the dish.", "Keep one safe option and one premium option ready for service."],
    dishNote: (dish, styles) => `${dish} should be matched by intensity, sauce and texture. Start with ${styles || "a balanced wine style"} and adjust by preparation.`,
    commonMistakes: (category) => [`Choosing wine for ${category.toLowerCase()} without reading sauce or texture.`, "Serving the wine too warm or too cold for the dish.", "Offering only one obvious pairing and losing the upsell path."],
    alternatives: (styles) => [`A lighter option from ${styles || "a fresh style"}.`, "A sparkling or higher-acid wine when the dish needs freshness."],
    cartaUsage: (category) => `${category} should have one clear by-the-glass recommendation and one stronger bottle recommendation so the team can sell without improvising.`,
    salaLanguage: (category, styles) => `For ${category.toLowerCase()}, this wine works because it balances the dish instead of overpowering it. ${styles || "The style"} gives the team a simple, credible cue.`,
    safeOptions: (styles) => styles || "A fresh, balanced wine with clear acidity.",
    differentialOptions: (grapes, regions) => `${grapes || "A less obvious grape"} or ${regions || "a benchmark region"} can turn the pairing into a discovery moment.`,
    restaurantMistakes: (category) => `The common mistake is treating ${category.toLowerCase()} as a fixed rule instead of a service decision based on the actual dish.`,
    whenClassicLoses: (category) => `The classic pairing loses force when every table hears the same recommendation. Add a second route for guests who want discovery.`,
    faqs: (name, styles) => [{ q: `Which wine works with ${name}?`, a: `Start with ${styles || "a balanced, food-friendly style"} and adjust by intensity, fat, sauce and spice.` }, { q: `How should a restaurant use ${name}?`, a: "Give the team a safe glass, a premium bottle and one short sentence they can use at the table." }],
  },
  fr: {
    description: (name, category, styles) => `${name} associe ${category.toLowerCase()} avec des vins qui equilibrent intensite, gras, acidite et texture. Styles utiles : ${styles || "vins polyvalents"}.`,
    intro: (category, grapes, regions) => `Pour ${category.toLowerCase()}, la meilleure recommandation lit d'abord le plat puis le vin. Des cepages comme ${grapes || "les cepages classiques"} et des regions comme ${regions || "les regions de reference"} donnent un repere fiable.`,
    principles: (category) => [`Alignez l'intensite de ${category.toLowerCase()} avec le corps du vin.`, "Utilisez acidite, bulles ou tanin pour rafraichir le gras.", "Laissez sauce et cuisson guider la recommandation.", "Evitez les vins qui dominent la texture du plat.", "Gardez une option sure et une option premium pour le service."],
    dishNote: (dish, styles) => `${dish} doit etre lu par intensite, sauce et texture. Commencez avec ${styles || "un style equilibre"} puis ajustez.`,
    commonMistakes: (category) => [`Choisir le vin pour ${category.toLowerCase()} sans lire sauce ou texture.`, "Servir le vin trop chaud ou trop froid pour le plat.", "N'offrir qu'un accord evident et perdre la montee en gamme."],
    alternatives: (styles) => [`Une option plus legere dans ${styles || "un style frais"}.`, "Un effervescent ou un vin plus acide si le plat demande de la fraicheur."],
    cartaUsage: (category) => `${category} doit avoir une recommandation claire au verre et une bouteille plus ambitieuse pour vendre sans improviser.`,
    salaLanguage: (category, styles) => `Avec ${category.toLowerCase()}, ce vin fonctionne parce qu'il equilibre le plat sans le dominer. ${styles || "Le style"} donne un argument simple a l'equipe.`,
    safeOptions: (styles) => styles || "Un vin frais, equilibre et avec une acidite nette.",
    differentialOptions: (grapes, regions) => `${grapes || "Un cepage moins attendu"} ou ${regions || "une region de reference"} peut creer un moment de decouverte.`,
    restaurantMistakes: (category) => `L'erreur est de traiter ${category.toLowerCase()} comme une regle fixe au lieu d'une decision de service.`,
    whenClassicLoses: () => "L'accord classique perd de la force si chaque table entend la meme recommandation. Ajoutez une route de decouverte.",
    faqs: (name, styles) => [{ q: `Quel vin avec ${name} ?`, a: `Commencez avec ${styles || "un style equilibre et gastronomique"} puis ajustez selon intensite, gras, sauce et epices.` }, { q: `Comment utiliser ${name} en restaurant ?`, a: "Donnez a l'equipe un verre sur, une bouteille premium et une phrase courte pour la table." }],
  },
  it: {
    description: (name, category, styles) => `${name} abbina ${category.toLowerCase()} a vini che bilanciano intensita, grasso, acidita e texture. Stili utili: ${styles || "vini versatili"}.`,
    intro: (category, grapes, regions) => `Per ${category.toLowerCase()}, la raccomandazione migliore legge prima il piatto e poi il vino. Vitigni come ${grapes || "vitigni classici"} e regioni come ${regions || "regioni di riferimento"} danno una rotta affidabile.`,
    principles: (category) => [`Allinea l'intensita di ${category.toLowerCase()} con il corpo del vino.`, "Usa acidita, bollicina o tannino per rinfrescare il grasso.", "Lascia che salsa e cottura guidino la raccomandazione.", "Evita vini che dominano la texture del piatto.", "Tieni pronta un'opzione sicura e una premium."],
    dishNote: (dish, styles) => `${dish} va letto per intensita, salsa e texture. Parti da ${styles || "uno stile equilibrato"} e poi regola.`,
    commonMistakes: (category) => [`Scegliere il vino per ${category.toLowerCase()} senza leggere salsa o texture.`, "Servire il vino troppo caldo o troppo freddo.", "Offrire solo l'abbinamento ovvio e perdere l'upsell."],
    alternatives: (styles) => [`Un'opzione piu leggera da ${styles || "uno stile fresco"}.`, "Uno spumante o un vino piu acido quando serve freschezza."],
    cartaUsage: (category) => `${category} deve avere un calice chiaro e una bottiglia piu ambiziosa per vendere senza improvvisare.`,
    salaLanguage: (category, styles) => `Con ${category.toLowerCase()}, questo vino funziona perche equilibra il piatto senza dominarlo. ${styles || "Lo stile"} da un argomento semplice alla sala.`,
    safeOptions: (styles) => styles || "Un vino fresco, equilibrato e con acidita chiara.",
    differentialOptions: (grapes, regions) => `${grapes || "Un vitigno meno ovvio"} o ${regions || "una regione di riferimento"} possono creare scoperta.`,
    restaurantMistakes: (category) => `L'errore e trattare ${category.toLowerCase()} come regola fissa invece che decisione di servizio.`,
    whenClassicLoses: () => "L'abbinamento classico perde forza se ogni tavolo sente la stessa raccomandazione. Aggiungi una rotta di scoperta.",
    faqs: (name, styles) => [{ q: `Quale vino con ${name}?`, a: `Parti da ${styles || "uno stile equilibrato e gastronomico"} e regola per intensita, grasso, salsa e spezie.` }, { q: `Come usare ${name} in ristorante?`, a: "Dai alla sala un calice sicuro, una bottiglia premium e una frase breve per il tavolo." }],
  },
  de: {
    description: (name, category, styles) => `${name} verbindet ${category.toLowerCase()} mit Weinen, die Intensitat, Fett, Saure und Textur ausbalancieren. Nutzliche Stile: ${styles || "vielseitige Weine"}.`,
    intro: (category, grapes, regions) => `Bei ${category.toLowerCase()} liest die beste Empfehlung zuerst das Gericht und dann den Wein. Rebsorten wie ${grapes || "klassische Sorten"} und Regionen wie ${regions || "Referenzregionen"} geben dem Team eine sichere Route.`,
    principles: (category) => [`Intensitat von ${category.toLowerCase()} und Weinkorper angleichen.`, "Saure, Perlage oder Tannin nutzen, um Fett zu erfrischen.", "Sauce und Zubereitung fuhren die Empfehlung.", "Weine vermeiden, die die Textur des Gerichts uberdecken.", "Eine sichere Option und eine Premiumoption bereithalten."],
    dishNote: (dish, styles) => `${dish} uber Intensitat, Sauce und Textur lesen. Mit ${styles || "einem balancierten Stil"} starten und anpassen.`,
    commonMistakes: (category) => [`Wein zu ${category.toLowerCase()} wahlen, ohne Sauce oder Textur zu lesen.`, "Den Wein fur das Gericht zu warm oder zu kalt servieren.", "Nur das offensichtliche Pairing anbieten und Upsell verlieren."],
    alternatives: (styles) => [`Eine leichtere Option aus ${styles || "einem frischen Stil"}.`, "Schaumwein oder Wein mit hoherer Saure, wenn Frische gebraucht wird."],
    cartaUsage: (category) => `${category} braucht eine klare Glasempfehlung und eine starkere Flaschenempfehlung, damit das Team ohne Improvisation verkauft.`,
    salaLanguage: (category, styles) => `Zu ${category.toLowerCase()} funktioniert dieser Wein, weil er das Gericht ausbalanciert statt es zu dominieren. ${styles || "Der Stil"} gibt dem Team ein klares Argument.`,
    safeOptions: (styles) => styles || "Ein frischer, balancierter Wein mit klarer Saure.",
    differentialOptions: (grapes, regions) => `${grapes || "Eine weniger offensichtliche Rebsorte"} oder ${regions || "eine Referenzregion"} schafft Entdeckung.`,
    restaurantMistakes: (category) => `Der Fehler ist, ${category.toLowerCase()} als feste Regel statt als Serviceentscheidung zu behandeln.`,
    whenClassicLoses: () => "Das klassische Pairing verliert Kraft, wenn jeder Tisch dieselbe Empfehlung hort. Eine Entdeckungsroute erganzen.",
    faqs: (name, styles) => [{ q: `Welcher Wein passt zu ${name}?`, a: `Mit ${styles || "einem balancierten, speisenfreundlichen Stil"} starten und nach Intensitat, Fett, Sauce und Scharfe anpassen.` }, { q: `Wie nutzt ein Restaurant ${name}?`, a: "Das Team braucht ein sicheres Glas, eine Premiumflasche und einen kurzen Satz fur den Tisch." }],
  },
  pt: {
    description: (name, category, styles) => `${name} combina ${category.toLowerCase()} com vinhos que equilibram intensidade, gordura, acidez e textura. Estilos uteis: ${styles || "vinhos versateis"}.`,
    intro: (category, grapes, regions) => `Para ${category.toLowerCase()}, a melhor recomendacao le primeiro o prato e depois o vinho. Castas como ${grapes || "castas classicas"} e regioes como ${regions || "regioes de referencia"} dao uma rota segura.`,
    principles: (category) => [`Alinhar a intensidade de ${category.toLowerCase()} com o corpo do vinho.`, "Usar acidez, bolha ou tanino para refrescar gordura.", "Deixar molho e tecnica liderarem a recomendacao.", "Evitar vinhos que dominem a textura do prato.", "Ter uma opcao segura e uma premium prontas."],
    dishNote: (dish, styles) => `${dish} deve ser lido por intensidade, molho e textura. Comece com ${styles || "um estilo equilibrado"} e ajuste.`,
    commonMistakes: (category) => [`Escolher vinho para ${category.toLowerCase()} sem ler molho ou textura.`, "Servir o vinho demasiado quente ou frio para o prato.", "Oferecer apenas a harmonizacao obvia e perder upsell."],
    alternatives: (styles) => [`Uma opcao mais leve de ${styles || "um estilo fresco"}.`, "Um espumante ou vinho com mais acidez quando o prato pede frescura."],
    cartaUsage: (category) => `${category} deve ter uma recomendacao clara a copo e uma garrafa mais forte para a equipa vender sem improvisar.`,
    salaLanguage: (category, styles) => `Com ${category.toLowerCase()}, este vinho funciona porque equilibra o prato sem dominar. ${styles || "O estilo"} da um argumento simples a equipa.`,
    safeOptions: (styles) => styles || "Um vinho fresco, equilibrado e com acidez clara.",
    differentialOptions: (grapes, regions) => `${grapes || "Uma casta menos obvia"} ou ${regions || "uma regiao de referencia"} pode criar descoberta.`,
    restaurantMistakes: (category) => `O erro e tratar ${category.toLowerCase()} como regra fixa em vez de decisao de servico.`,
    whenClassicLoses: () => "A harmonizacao classica perde forca quando todas as mesas ouvem a mesma recomendacao. Acrescente uma rota de descoberta.",
    faqs: (name, styles) => [{ q: `Que vinho combina com ${name}?`, a: `Comece com ${styles || "um estilo equilibrado e gastronomico"} e ajuste por intensidade, gordura, molho e picante.` }, { q: `Como usar ${name} num restaurante?`, a: "De a equipa um copo seguro, uma garrafa premium e uma frase curta para a mesa." }],
  },
};

const localizePairingName = (entry: PairingEntry, lang: WineI18nLang): string => {
  const override = priorityPairingNameOverrides[entry.slug]?.[lang];
  if (override) return override;
  if (entry.level === "category") return pairingNames[lang][entry.category] || entry.name;
  return entry.name;
};

const localizeDishName = (entrySlug: string, dish: string, lang: WineI18nLang): string =>
  priorityDishNameOverrides[entrySlug]?.[dish]?.[lang] || dish;

const pairingTermTranslations: Record<WineI18nLang, Record<string, string>> = {
  en: {
    "Blanco aromático": "aromatic white wine",
    Espumoso: "sparkling wine",
    "Riesling off-dry": "off-dry Riesling",
    "Blanco joven": "young white wine",
    "Blanco mineral": "mineral white wine",
    "Blanco con cuerpo moderado": "moderately full white wine",
    "Tinto joven": "young red wine",
    "Tinto ligero": "light red wine",
    "Blanco con cuerpo": "fuller white wine",
    "Tinto con cuerpo": "full-bodied red wine",
    "Tinto crianza": "crianza red wine",
    "Tinto reserva": "reserva red wine",
    Rosado: "rose wine",
    "Rosado con cuerpo": "full-bodied rose wine",
  },
  fr: {
    "Blanco aromático": "blanc aromatique",
    Espumoso: "effervescent",
    "Riesling off-dry": "Riesling demi-sec",
    "Blanco joven": "blanc jeune",
    "Blanco mineral": "blanc mineral",
    "Blanco con cuerpo moderado": "blanc de corps modere",
    "Tinto joven": "rouge jeune",
    "Tinto ligero": "rouge leger",
    "Blanco con cuerpo": "blanc avec du corps",
    "Tinto con cuerpo": "rouge structure",
    "Tinto crianza": "rouge crianza",
    "Tinto reserva": "rouge reserva",
    Rosado: "rose",
    "Rosado con cuerpo": "rose structure",
  },
  it: {
    "Blanco aromático": "bianco aromatico",
    Espumoso: "spumante",
    "Riesling off-dry": "Riesling abboccato",
    "Blanco joven": "bianco giovane",
    "Blanco mineral": "bianco minerale",
    "Blanco con cuerpo moderado": "bianco di corpo moderato",
    "Tinto joven": "rosso giovane",
    "Tinto ligero": "rosso leggero",
    "Blanco con cuerpo": "bianco strutturato",
    "Tinto con cuerpo": "rosso strutturato",
    "Tinto crianza": "rosso crianza",
    "Tinto reserva": "rosso reserva",
    Rosado: "rosato",
    "Rosado con cuerpo": "rosato strutturato",
  },
  de: {
    "Blanco aromático": "aromatischer Weisswein",
    Espumoso: "Schaumwein",
    "Riesling off-dry": "feinherber Riesling",
    "Blanco joven": "junger Weisswein",
    "Blanco mineral": "mineralischer Weisswein",
    "Blanco con cuerpo moderado": "mittelkraftiger Weisswein",
    "Tinto joven": "junger Rotwein",
    "Tinto ligero": "leichter Rotwein",
    "Blanco con cuerpo": "kraftigerer Weisswein",
    "Tinto con cuerpo": "kraftiger Rotwein",
    "Tinto crianza": "Crianza-Rotwein",
    "Tinto reserva": "Reserva-Rotwein",
    Rosado: "Rosewein",
    "Rosado con cuerpo": "strukturierter Rose",
  },
  pt: {
    "Blanco aromático": "branco aromatico",
    Espumoso: "espumante",
    "Riesling off-dry": "Riesling meio seco",
    "Blanco joven": "branco jovem",
    "Blanco mineral": "branco mineral",
    "Blanco con cuerpo moderado": "branco de corpo moderado",
    "Tinto joven": "tinto jovem",
    "Tinto ligero": "tinto leve",
    "Blanco con cuerpo": "branco encorpado",
    "Tinto con cuerpo": "tinto encorpado",
    "Tinto crianza": "tinto crianza",
    "Tinto reserva": "tinto reserva",
    Rosado: "rose",
    "Rosado con cuerpo": "rose estruturado",
  },
};

const localizePairingTerms = (items: string[], lang: WineI18nLang): string[] =>
  items.map((item) => pairingTermTranslations[lang][item] || item);

const buildOverlay = (entry: PairingEntry, lang: WineI18nLang): PairingI18nOverlay => {
  const name = localizePairingName(entry, lang);
  const category = categoryLabels[lang][entry.category] || entry.category;
  const styles = formatList(localizePairingTerms(entry.recommendedStyles, lang), lang);
  const grapes = formatList(entry.recommendedGrapes, lang);
  const regions = formatList(entry.recommendedRegions, lang);
  const runtime = genericPairingCopy[lang];
  const dishes = entry.dishes.map((dish) => {
    const dishName = localizeDishName(entry.slug, dish.dish, lang);
    return {
      ...dish,
      dish: dishName,
      notes: runtime.dishNote(dishName, styles),
    };
  });

  const copy: Record<WineI18nLang, PairingI18nOverlay> = {
    en: {
      name,
      description: runtime.description(name, category, styles),
      intro: runtime.intro(category, grapes, regions),
      principles: runtime.principles(category),
      dishes,
      commonMistakes: runtime.commonMistakes(category),
      alternatives: runtime.alternatives(styles),
      cartaUsage: runtime.cartaUsage(category),
      salaLanguage: runtime.salaLanguage(category, styles),
      safeOptions: runtime.safeOptions(styles),
      differentialOptions: runtime.differentialOptions(grapes, regions),
      restaurantMistakes: runtime.restaurantMistakes(category),
      whenClassicLoses: runtime.whenClassicLoses(category),
      bestConcepts: localizedBestConcepts.en[entry.category],
      faqs: runtime.faqs(name, styles),
      seo: {
        title: seoTitle(`${name}: wine pairing guide`),
        description: seoDescription(`Wine pairing guide for ${category.toLowerCase()}: principles, safe options and restaurant sales language. Winerim.`),
      },
    },
    fr: {
      name,
      description: runtime.description(name, category, styles),
      intro: runtime.intro(category, grapes, regions),
      principles: runtime.principles(category),
      dishes,
      commonMistakes: runtime.commonMistakes(category),
      alternatives: runtime.alternatives(styles),
      cartaUsage: runtime.cartaUsage(category),
      salaLanguage: runtime.salaLanguage(category, styles),
      safeOptions: runtime.safeOptions(styles),
      differentialOptions: runtime.differentialOptions(grapes, regions),
      restaurantMistakes: runtime.restaurantMistakes(category),
      whenClassicLoses: runtime.whenClassicLoses(category),
      bestConcepts: localizedBestConcepts.fr[entry.category],
      faqs: runtime.faqs(name, styles),
      seo: {
        title: seoTitle(`${name}: guide d'accords mets-vins`),
        description: seoDescription(`Guide d'accords pour ${category.toLowerCase()}: principes, options sûres et langage de vente en restaurant. Winerim.`),
      },
    },
    it: {
      name,
      description: runtime.description(name, category, styles),
      intro: runtime.intro(category, grapes, regions),
      principles: runtime.principles(category),
      dishes,
      commonMistakes: runtime.commonMistakes(category),
      alternatives: runtime.alternatives(styles),
      cartaUsage: runtime.cartaUsage(category),
      salaLanguage: runtime.salaLanguage(category, styles),
      safeOptions: runtime.safeOptions(styles),
      differentialOptions: runtime.differentialOptions(grapes, regions),
      restaurantMistakes: runtime.restaurantMistakes(category),
      whenClassicLoses: runtime.whenClassicLoses(category),
      bestConcepts: localizedBestConcepts.it[entry.category],
      faqs: runtime.faqs(name, styles),
      seo: {
        title: seoTitle(`${name}: guida agli abbinamenti`),
        description: seoDescription(`Guida agli abbinamenti per ${category.toLowerCase()}: principi, opzioni sicure e linguaggio di vendita. Winerim.`),
      },
    },
    de: {
      name,
      description: runtime.description(name, category, styles),
      intro: runtime.intro(category, grapes, regions),
      principles: runtime.principles(category),
      dishes,
      commonMistakes: runtime.commonMistakes(category),
      alternatives: runtime.alternatives(styles),
      cartaUsage: runtime.cartaUsage(category),
      salaLanguage: runtime.salaLanguage(category, styles),
      safeOptions: runtime.safeOptions(styles),
      differentialOptions: runtime.differentialOptions(grapes, regions),
      restaurantMistakes: runtime.restaurantMistakes(category),
      whenClassicLoses: runtime.whenClassicLoses(category),
      bestConcepts: localizedBestConcepts.de[entry.category],
      faqs: runtime.faqs(name, styles),
      seo: {
        title: seoTitle(`${name}: Weinbegleitung Guide`),
        description: seoDescription(`Weinbegleitung für ${category.toLowerCase()}: Prinzipien, sichere Optionen und Verkaufssprache im Restaurant. Winerim.`),
      },
    },
    pt: {
      name,
      description: runtime.description(name, category, styles),
      intro: runtime.intro(category, grapes, regions),
      principles: runtime.principles(category),
      dishes,
      commonMistakes: runtime.commonMistakes(category),
      alternatives: runtime.alternatives(styles),
      cartaUsage: runtime.cartaUsage(category),
      salaLanguage: runtime.salaLanguage(category, styles),
      safeOptions: runtime.safeOptions(styles),
      differentialOptions: runtime.differentialOptions(grapes, regions),
      restaurantMistakes: runtime.restaurantMistakes(category),
      whenClassicLoses: runtime.whenClassicLoses(category),
      bestConcepts: localizedBestConcepts.pt[entry.category],
      faqs: runtime.faqs(name, styles),
      seo: {
        title: seoTitle(`${name}: guia de harmonização`),
        description: seoDescription(`Guia de harmonização para ${category.toLowerCase()}: princípios, opções seguras e linguagem de venda. Winerim.`),
      },
    },
  };

  return copy[lang];
};

export const pairingOverlays: PairingOverlays = Object.fromEntries(
  pairingEntries.map((entry) => [
    entry.slug,
    Object.fromEntries(
      (["en", "fr", "it", "de", "pt"] satisfies WineI18nLang[]).map((lang) => [lang, buildOverlay(entry, lang)])
    ),
  ])
) as PairingOverlays;

const applyPairingOverlay = <T extends PairingEntry>(entry: T, lang?: string): T => {
  const overlayLang = normalizeWineOverlayLang(lang);
  const overlay = overlayLang ? pairingOverlays[entry.slug]?.[overlayLang] : undefined;
  if (!overlay) return entry;
  return {
    ...entry,
    name: overlay.name,
    description: overlay.description,
    intro: overlay.intro,
    principles: overlay.principles || entry.principles,
    dishes: overlay.dishes || entry.dishes,
    commonMistakes: overlay.commonMistakes || entry.commonMistakes,
    alternatives: overlay.alternatives || entry.alternatives,
    cartaUsage: overlay.cartaUsage || entry.cartaUsage,
    salaLanguage: overlay.salaLanguage || entry.salaLanguage,
    safeOptions: overlay.safeOptions || entry.safeOptions,
    differentialOptions: overlay.differentialOptions || entry.differentialOptions,
    restaurantMistakes: overlay.restaurantMistakes || entry.restaurantMistakes,
    whenClassicLoses: overlay.whenClassicLoses || entry.whenClassicLoses,
    bestConcepts: overlay.bestConcepts || entry.bestConcepts,
    faqs: overlay.faqs || entry.faqs,
    seo: { ...entry.seo, ...overlay.seo },
  };
};

export const getLocalizedPairingEntries = (lang?: string): PairingEntry[] =>
  pairingEntries.map((entry) => applyPairingOverlay(entry, lang));

export const getLocalizedPairingBySlug = (slug: string, lang?: string): PairingEntry | undefined => {
  const entry = pairingEntries.find((pairing) => pairing.slug === slug);
  return entry ? applyPairingOverlay(entry, lang) : undefined;
};

export const getLocalizedCategoryMeta = (category: PairingCategory, lang?: string) => {
  const resolved = resolveWineLang(lang);
  return {
    ...categoryMeta[category],
    label: categoryLabels[resolved][category] || categoryMeta[category].label,
  };
};
