export type WineLibraryPairingEditorialLang = "es" | "en" | "it" | "fr" | "de" | "pt";

type LocalizedPairingEditorialText = {
  byTheGlass: string;
  defaultWines: string;
  role: string;
  floorCue: string;
  commercialLever: string;
  avoid: string;
  upsell: string;
  menuHooks: string[];
};

interface PairingEditorialProfileSeed {
  slug: string;
  priority: number;
  serviceMoment: string;
  texts: Record<WineLibraryPairingEditorialLang, LocalizedPairingEditorialText>;
}

export interface LocalizedPairingEditorialProfile {
  slug: string;
  priority: number;
  eyebrow: string;
  title: string;
  subtitle: string;
  facts: { label: string; value: string }[];
  sections: { title: string; body: string }[];
  menuTitle: string;
  menuHooks: string[];
  faqs: { q: string; a: string }[];
}

export const priorityPairingSlugs = [
  "carnes-rojas",
  "lubina-dorada",
  "pescados-y-mariscos",
  "pasta-arroces-y-legumbres",
  "cocina-asiatica-y-fusion",
  "quesos",
] as const;

const profileText = (text: Record<WineLibraryPairingEditorialLang, LocalizedPairingEditorialText>) => text;

const pairingEditorialProfiles: Record<string, PairingEditorialProfileSeed> = {
  "carnes-rojas": {
    slug: "carnes-rojas",
    priority: 1,
    serviceMoment: "main-course / bottle upsell",
    texts: profileText({
      es: {
        byTheGlass: "Rioja Crianza, Ribera roble o Malbec con rotacion alta.",
        defaultWines: "Tempranillo, Malbec, Cabernet Sauvignon, Syrah.",
        role: "Carnes rojas es el maridaje de confianza para vender tinto con seguridad. Ordena la recomendacion por corte, grasa, salsa y punto de coccion.",
        floorCue: "Empieza por la carne y termina por la estructura: grasa, brasa, tanino y frescura.",
        commercialLever: "Permite una escalera clara: copa segura, botella de productor y reserva premium para mesas de celebracion.",
        avoid: "No recomendar siempre el tinto mas potente. El solomillo o el carpaccio necesitan menos tanino que un chuleton.",
        upsell: "Sube de crianza a reserva cuando hay brasa, salsa reducida, mesa larga o celebracion.",
        menuHooks: ["chuleton", "cordero", "solomillo", "estofados", "quesos curados"],
      },
      en: {
        byTheGlass: "Rioja Crianza, Ribera roble or high-rotation Malbec.",
        defaultWines: "Tempranillo, Malbec, Cabernet Sauvignon, Syrah.",
        role: "Red meat is the trust pairing for selling red wine with confidence. It organizes the recommendation by cut, fat, sauce and cooking point.",
        floorCue: "Start with the meat and finish with structure: fat, grill, tannin and freshness.",
        commercialLever: "It creates a clear ladder: safe glass, producer bottle and premium reserva for celebration tables.",
        avoid: "Do not always recommend the most powerful red. Fillet or carpaccio needs less tannin than ribeye.",
        upsell: "Move from crianza to reserva when there is grill, reduced sauce, a long table or a celebration.",
        menuHooks: ["ribeye", "lamb", "fillet", "stews", "aged cheese"],
      },
      it: {
        byTheGlass: "Rioja Crianza, Ribera roble o Malbec ad alta rotazione.",
        defaultWines: "Tempranillo, Malbec, Cabernet Sauvignon, Syrah.",
        role: "Le carni rosse sono l'abbinamento di fiducia per vendere rosso con sicurezza. La raccomandazione si ordina per taglio, grasso, salsa e cottura.",
        floorCue: "Parti dalla carne e chiudi con la struttura: grasso, brace, tannino e freschezza.",
        commercialLever: "Crea una scala chiara: calice sicuro, bottiglia di produttore e reserva premium per tavoli di celebrazione.",
        avoid: "Non consigliare sempre il rosso piu potente. Filetto o carpaccio richiedono meno tannino di una costata.",
        upsell: "Passa da crianza a reserva con brace, salsa ridotta, tavoli lunghi o celebrazioni.",
        menuHooks: ["costata", "agnello", "filetto", "brasati", "formaggi stagionati"],
      },
      fr: {
        byTheGlass: "Rioja Crianza, Ribera roble ou Malbec en forte rotation.",
        defaultWines: "Tempranillo, Malbec, Cabernet Sauvignon, Syrah.",
        role: "Les viandes rouges sont l'accord de confiance pour vendre du rouge avec securite. La recommandation se lit par morceau, gras, sauce et cuisson.",
        floorCue: "Commencez par la viande et finissez par la structure : gras, grill, tanin et fraicheur.",
        commercialLever: "Il cree une echelle claire : verre sur, bouteille de producteur et reserva premium pour les tables de celebration.",
        avoid: "Ne pas recommander toujours le rouge le plus puissant. Filet ou carpaccio demandent moins de tanin qu'une cote.",
        upsell: "Passez de crianza a reserva avec grill, sauce reduite, table longue ou celebration.",
        menuHooks: ["entrecote", "agneau", "filet", "plats mijotes", "fromages affines"],
      },
      de: {
        byTheGlass: "Rioja Crianza, Ribera Roble oder Malbec mit hoher Rotation.",
        defaultWines: "Tempranillo, Malbec, Cabernet Sauvignon, Syrah.",
        role: "Rotes Fleisch ist das Vertrauenspairing fur sicheren Rotweinverkauf. Die Empfehlung folgt Schnitt, Fett, Sauce und Gargrad.",
        floorCue: "Beim Fleisch beginnen und mit Struktur enden: Fett, Grill, Tannin und Frische.",
        commercialLever: "Es schafft eine klare Leiter: sicheres Glas, Produzentenflasche und Premium-Reserva fur Feiern.",
        avoid: "Nicht immer den kraftigsten Rotwein empfehlen. Filet oder Carpaccio brauchen weniger Tannin als Ribeye.",
        upsell: "Von Crianza zu Reserva wechseln, wenn Grill, reduzierte Sauce, langer Tisch oder Feier im Spiel sind.",
        menuHooks: ["Ribeye", "Lamm", "Filet", "Schmorgerichte", "gereifter Kase"],
      },
      pt: {
        byTheGlass: "Rioja Crianza, Ribera roble ou Malbec de alta rotacao.",
        defaultWines: "Tempranillo, Malbec, Cabernet Sauvignon, Syrah.",
        role: "Carnes vermelhas e a harmonizacao de confianca para vender tinto com seguranca. Organiza a recomendacao por corte, gordura, molho e ponto.",
        floorCue: "Comece pela carne e termine na estrutura: gordura, grelha, tanino e frescura.",
        commercialLever: "Cria uma escada clara: copo seguro, garrafa de produtor e reserva premium para celebracoes.",
        avoid: "Nao recomendar sempre o tinto mais potente. Filet ou carpaccio precisam de menos tanino que um entrecote.",
        upsell: "Suba de crianza para reserva quando houver grelha, molho reduzido, mesa longa ou celebracao.",
        menuHooks: ["entrecote", "borrego", "filet", "estufados", "queijos curados"],
      },
    }),
  },
  "lubina-dorada": {
    slug: "lubina-dorada",
    priority: 2,
    serviceMoment: "fresh white / seafood service",
    texts: profileText({
      es: {
        byTheGlass: "Albariño, Verdejo serio, Chablis o Godello joven.",
        defaultWines: "Albariño, Verdejo, Godello, Sauvignon Blanc, Chablis.",
        role: "Pescado blanco es el maridaje que debe vender frescura, precision y respeto por el producto.",
        floorCue: "Habla de delicadeza, acidez y salinidad. Si hay salsa, deja que la salsa decida el cuerpo del vino.",
        commercialLever: "Muy fuerte por copa: permite ofrecer un blanco seguro y un blanco premium con mas mineralidad o lias.",
        avoid: "No tapar el pescado con madera excesiva ni servir el vino helado hasta borrar aromas.",
        upsell: "Sube a Chablis, Godello con lias o Albariño de parcela si el pescado es protagonista.",
        menuHooks: ["lubina", "dorada", "merluza", "rodaballo", "salsas ligeras"],
      },
      en: {
        byTheGlass: "Albarino, serious Verdejo, Chablis or young Godello.",
        defaultWines: "Albarino, Verdejo, Godello, Sauvignon Blanc, Chablis.",
        role: "White fish should sell freshness, precision and respect for the product.",
        floorCue: "Talk delicacy, acidity and salinity. If there is sauce, let the sauce decide the wine's body.",
        commercialLever: "Very strong by the glass: one safe white and one premium white with more minerality or lees texture.",
        avoid: "Do not cover the fish with excessive oak or serve the wine so cold that aromatics disappear.",
        upsell: "Move to Chablis, lees-aged Godello or single-site Albarino when the fish is the hero.",
        menuHooks: ["sea bass", "sea bream", "hake", "turbot", "light sauces"],
      },
      it: {
        byTheGlass: "Albarino, Verdejo serio, Chablis o Godello giovane.",
        defaultWines: "Albarino, Verdejo, Godello, Sauvignon Blanc, Chablis.",
        role: "Il pesce bianco deve vendere freschezza, precisione e rispetto del prodotto.",
        floorCue: "Parla di delicatezza, acidita e salinita. Se c'e salsa, lascia che decida il corpo del vino.",
        commercialLever: "Molto forte al calice: un bianco sicuro e uno premium con piu mineralita o texture sui lieviti.",
        avoid: "Non coprire il pesce con legno eccessivo ne servire il vino cosi freddo da cancellare gli aromi.",
        upsell: "Sali a Chablis, Godello sui lieviti o Albarino di parcella quando il pesce e protagonista.",
        menuHooks: ["branzino", "orata", "nasello", "rombo", "salse leggere"],
      },
      fr: {
        byTheGlass: "Albarino, Verdejo serieux, Chablis ou jeune Godello.",
        defaultWines: "Albarino, Verdejo, Godello, Sauvignon Blanc, Chablis.",
        role: "Le poisson blanc doit vendre fraicheur, precision et respect du produit.",
        floorCue: "Parlez delicatesse, acidite et salinite. S'il y a sauce, elle decide le corps du vin.",
        commercialLever: "Tres fort au verre : un blanc sur et un blanc premium plus mineral ou sur lies.",
        avoid: "Ne pas couvrir le poisson avec trop de bois ni servir si froid que les aromes disparaissent.",
        upsell: "Montez vers Chablis, Godello sur lies ou Albarino de parcelle quand le poisson est central.",
        menuHooks: ["bar", "daurade", "merlu", "turbot", "sauces legeres"],
      },
      de: {
        byTheGlass: "Albarino, ernster Verdejo, Chablis oder junger Godello.",
        defaultWines: "Albarino, Verdejo, Godello, Sauvignon Blanc, Chablis.",
        role: "Weisser Fisch verkauft Frische, Prazision und Respekt vor dem Produkt.",
        floorCue: "Delikatesse, Saure und Salinitat nennen. Wenn Sauce da ist, entscheidet sie uber den Weinkorper.",
        commercialLever: "Sehr stark im Glas: ein sicherer Weisswein und ein Premium-Weisswein mit Mineralitat oder Hefetextur.",
        avoid: "Den Fisch nicht mit zu viel Holz verdecken und den Wein nicht so kalt servieren, dass Aroma verschwindet.",
        upsell: "Zu Chablis, Godello auf der Hefe oder Lagen-Albarino wechseln, wenn der Fisch Hauptdarsteller ist.",
        menuHooks: ["Wolfsbarsch", "Dorade", "Seehecht", "Steinbutt", "leichte Saucen"],
      },
      pt: {
        byTheGlass: "Alvarinho, Verdejo serio, Chablis ou Godello jovem.",
        defaultWines: "Alvarinho, Verdejo, Godello, Sauvignon Blanc, Chablis.",
        role: "Peixe branco deve vender frescura, precisao e respeito pelo produto.",
        floorCue: "Fale de delicadeza, acidez e salinidade. Se houver molho, deixe o molho decidir o corpo do vinho.",
        commercialLever: "Muito forte a copo: um branco seguro e um branco premium com mais mineralidade ou lias.",
        avoid: "Nao tapar o peixe com madeira excessiva nem servir tao frio que apague os aromas.",
        upsell: "Suba para Chablis, Godello sobre lias ou Alvarinho de parcela quando o peixe e protagonista.",
        menuHooks: ["robalo", "dourada", "pescada", "pregado", "molhos leves"],
      },
    }),
  },
  "pescados-y-mariscos": {
    slug: "pescados-y-mariscos",
    priority: 3,
    serviceMoment: "aperitif / seafood table",
    texts: profileText({
      es: {
        byTheGlass: "Albariño, Cava Brut Nature, Champagne Brut o Muscadet.",
        defaultWines: "Albariño, Godello, Champagne, Cava, Muscadet.",
        role: "Marisco es una palanca de frescura, salinidad y ticket medio. Puede vender blanco, espumoso o botella premium.",
        floorCue: "Conecta mar, sal y burbuja. En crudo manda la acidez; a la plancha puede entrar mas volumen.",
        commercialLever: "El espumoso por copa con ostras o marisco sube ticket y crea percepcion premium inmediata.",
        avoid: "No limitar marisco a un solo blanco fresco. Hay margen en espumosos, lias y blancos minerales.",
        upsell: "Sube a Champagne, Cava de larga crianza o Albariño con lias en mesas de marisco compartido.",
        menuHooks: ["ostras", "gambas", "pulpo", "ceviche", "sushi"],
      },
      en: {
        byTheGlass: "Albarino, Cava Brut Nature, Champagne Brut or Muscadet.",
        defaultWines: "Albarino, Godello, Champagne, Cava, Muscadet.",
        role: "Seafood is a lever for freshness, salinity and spend. It can sell white, sparkling or premium bottles.",
        floorCue: "Connect sea, salt and bubbles. Raw seafood needs acidity; grilled seafood can take more volume.",
        commercialLever: "Sparkling by the glass with oysters or shellfish lifts spend and creates immediate premium perception.",
        avoid: "Do not reduce seafood to one fresh white. There is margin in sparkling, lees-aged and mineral whites.",
        upsell: "Move to Champagne, long-aged Cava or lees-aged Albarino for shared seafood tables.",
        menuHooks: ["oysters", "prawns", "octopus", "ceviche", "sushi"],
      },
      it: {
        byTheGlass: "Albarino, Cava Brut Nature, Champagne Brut o Muscadet.",
        defaultWines: "Albarino, Godello, Champagne, Cava, Muscadet.",
        role: "I frutti di mare sono leva di freschezza, salinita e scontrino. Possono vendere bianco, spumante o bottiglia premium.",
        floorCue: "Collega mare, sale e bollicina. A crudo comanda l'acidita; alla griglia entra piu volume.",
        commercialLever: "Lo spumante al calice con ostriche o crostacei alza lo scontrino e crea percezione premium immediata.",
        avoid: "Non ridurre il mare a un solo bianco fresco. C'e margine in spumanti, lieviti e bianchi minerali.",
        upsell: "Sali a Champagne, Cava lunga sosta o Albarino sui lieviti per tavoli di mare condivisi.",
        menuHooks: ["ostriche", "gamberi", "polpo", "ceviche", "sushi"],
      },
      fr: {
        byTheGlass: "Albarino, Cava Brut Nature, Champagne Brut ou Muscadet.",
        defaultWines: "Albarino, Godello, Champagne, Cava, Muscadet.",
        role: "Les fruits de mer activent fraicheur, salinite et ticket moyen. Ils vendent blanc, effervescent ou bouteille premium.",
        floorCue: "Reliez mer, sel et bulle. Le cru demande acidite; la plancha accepte plus de volume.",
        commercialLever: "L'effervescent au verre avec huitres ou crustaces augmente le ticket et la perception premium.",
        avoid: "Ne pas reduire les fruits de mer a un seul blanc frais. La marge existe sur bulles, lies et blancs mineraux.",
        upsell: "Montez vers Champagne, Cava long elevage ou Albarino sur lies pour les tables de fruits de mer.",
        menuHooks: ["huitres", "crevettes", "poulpe", "ceviche", "sushi"],
      },
      de: {
        byTheGlass: "Albarino, Cava Brut Nature, Champagne Brut oder Muscadet.",
        defaultWines: "Albarino, Godello, Champagne, Cava, Muscadet.",
        role: "Meeresfruchte sind Hebel fur Frische, Salinitat und Bon. Sie verkaufen Weisswein, Schaumwein oder Premiumflaschen.",
        floorCue: "Meer, Salz und Perlage verbinden. Roh braucht Saure; gegrillt vertragt mehr Volumen.",
        commercialLever: "Schaumwein im Glas zu Austern oder Meeresfruchten hebt den Bon und wirkt sofort premium.",
        avoid: "Meeresfruchte nicht auf einen frischen Weisswein reduzieren. Marge liegt auch in Schaumwein, Hefelager und Mineralitat.",
        upsell: "Zu Champagne, lang gereiftem Cava oder Albarino auf der Hefe wechseln, wenn Meeresfruchte geteilt werden.",
        menuHooks: ["Austern", "Garnelen", "Oktopus", "Ceviche", "Sushi"],
      },
      pt: {
        byTheGlass: "Alvarinho, Cava Brut Nature, Champagne Brut ou Muscadet.",
        defaultWines: "Alvarinho, Godello, Champagne, Cava, Muscadet.",
        role: "Marisco e alavanca de frescura, salinidade e ticket medio. Pode vender branco, espumante ou garrafa premium.",
        floorCue: "Ligue mar, sal e bolha. Em cru manda a acidez; na grelha pode entrar mais volume.",
        commercialLever: "Espumante a copo com ostras ou marisco sobe ticket e cria percecao premium imediata.",
        avoid: "Nao limitar marisco a um branco fresco. Ha margem em espumantes, lias e brancos minerais.",
        upsell: "Suba para Champagne, Cava de longa crianza ou Alvarinho sobre lias em mesas de marisco partilhado.",
        menuHooks: ["ostras", "camarao", "polvo", "ceviche", "sushi"],
      },
    }),
  },
  "pasta-arroces-y-legumbres": {
    slug: "pasta-arroces-y-legumbres",
    priority: 4,
    serviceMoment: "high-rotation dishes",
    texts: profileText({
      es: {
        byTheGlass: "Garnacha, rosado gastronomico, Verdejo serio o Chianti.",
        defaultWines: "Garnacha, Sangiovese, Tempranillo joven, rosado gastronomico.",
        role: "Arroces y pasta son maridajes de rotacion: la salsa, el fondo y el punto de grasa mandan mas que el ingrediente base.",
        floorCue: "Pregunta por salsa y fondo: tomate pide acidez, setas piden tierra, marisco pide salinidad.",
        commercialLever: "Permite recomendar vinos por copa de alta salida y botellas medias sin friccion.",
        avoid: "No tratar todos los arroces como paella ni toda pasta como tomate. El condimento decide.",
        upsell: "Sube a rosado gastronomico, blanco con lias o tinto italiano cuando el plato tenga mas profundidad.",
        menuHooks: ["paella", "risotto", "pasta con tomate", "setas", "legumbres"],
      },
      en: {
        byTheGlass: "Garnacha, gastronomic rose, serious Verdejo or Chianti.",
        defaultWines: "Garnacha, Sangiovese, young Tempranillo, gastronomic rose.",
        role: "Rice and pasta are rotation pairings: sauce, stock and fat matter more than the base ingredient.",
        floorCue: "Ask about sauce and stock: tomato needs acidity, mushrooms need earth, seafood needs salinity.",
        commercialLever: "It supports high-rotation by-the-glass wines and mid-range bottles with low friction.",
        avoid: "Do not treat every rice dish as paella or every pasta as tomato. The seasoning decides.",
        upsell: "Move to gastronomic rose, lees-aged white or Italian red when the dish has more depth.",
        menuHooks: ["paella", "risotto", "tomato pasta", "mushrooms", "legumes"],
      },
      it: {
        byTheGlass: "Garnacha, rosato gastronomico, Verdejo serio o Chianti.",
        defaultWines: "Garnacha, Sangiovese, Tempranillo giovane, rosato gastronomico.",
        role: "Riso e pasta sono abbinamenti di rotazione: salsa, fondo e grasso contano piu dell'ingrediente base.",
        floorCue: "Chiedi salsa e fondo: pomodoro vuole acidita, funghi terra, mare salinita.",
        commercialLever: "Sostiene vini al calice ad alta uscita e bottiglie medie senza frizione.",
        avoid: "Non trattare ogni riso come paella ne ogni pasta come pomodoro. Decide il condimento.",
        upsell: "Sali a rosato gastronomico, bianco sui lieviti o rosso italiano quando il piatto ha piu profondita.",
        menuHooks: ["paella", "risotto", "pasta al pomodoro", "funghi", "legumi"],
      },
      fr: {
        byTheGlass: "Garnacha, rose gastronomique, Verdejo serieux ou Chianti.",
        defaultWines: "Garnacha, Sangiovese, jeune Tempranillo, rose gastronomique.",
        role: "Riz et pates sont des accords de rotation : sauce, fond et gras comptent plus que la base.",
        floorCue: "Demandez sauce et fond : tomate veut acidite, champignons terre, mer salinite.",
        commercialLever: "Il soutient les vins au verre a forte sortie et les bouteilles intermediaires.",
        avoid: "Ne pas traiter tous les riz comme paella ni toutes les pates comme tomate. L'assaisonnement decide.",
        upsell: "Montez vers rose gastronomique, blanc sur lies ou rouge italien si le plat gagne en profondeur.",
        menuHooks: ["paella", "risotto", "pates tomate", "champignons", "legumineuses"],
      },
      de: {
        byTheGlass: "Garnacha, gastronomischer Rose, ernster Verdejo oder Chianti.",
        defaultWines: "Garnacha, Sangiovese, junger Tempranillo, gastronomischer Rose.",
        role: "Reis und Pasta sind Rotationspairings: Sauce, Fond und Fett zahlen mehr als die Basiszutat.",
        floorCue: "Nach Sauce und Fond fragen: Tomate braucht Saure, Pilze Erde, Meeresfruchte Salinitat.",
        commercialLever: "Stutzt stark rotierende Glasweine und mittlere Flaschen ohne viel Erklarung.",
        avoid: "Nicht jedes Reisgericht als Paella und jede Pasta als Tomate behandeln. Wurze entscheidet.",
        upsell: "Zu gastronomischem Rose, Weisswein auf der Hefe oder italienischem Rotwein wechseln, wenn das Gericht Tiefe hat.",
        menuHooks: ["Paella", "Risotto", "Tomatenpasta", "Pilze", "Hulsenfruchte"],
      },
      pt: {
        byTheGlass: "Garnacha, rose gastronomico, Verdejo serio ou Chianti.",
        defaultWines: "Garnacha, Sangiovese, Tempranillo jovem, rose gastronomico.",
        role: "Arrozes e massas sao harmonizacoes de rotacao: molho, fundo e gordura mandam mais que o ingrediente base.",
        floorCue: "Pergunte pelo molho e fundo: tomate pede acidez, cogumelos pedem terra, marisco pede salinidade.",
        commercialLever: "Sustenta vinhos a copo de alta saida e garrafas medias sem friccao.",
        avoid: "Nao tratar todos os arrozes como paella nem todas as massas como tomate. O tempero decide.",
        upsell: "Suba para rose gastronomico, branco sobre lias ou tinto italiano quando o prato tiver mais profundidade.",
        menuHooks: ["paella", "risotto", "massa com tomate", "cogumelos", "leguminosas"],
      },
    }),
  },
  "cocina-asiatica-y-fusion": {
    slug: "cocina-asiatica-y-fusion",
    priority: 5,
    serviceMoment: "spice / umami / sweet-sour",
    texts: profileText({
      es: {
        byTheGlass: "Riesling seco o semiseco, Gewurztraminer, espumoso brut.",
        defaultWines: "Riesling, Gewurztraminer, Chenin Blanc, espumoso, rosado.",
        role: "Cocina asiatica exige gestionar picante, umami, dulzor y acidez. Es donde un buen maridaje mas sorprende.",
        floorCue: "No empieces por color; empieza por picante, soja, jengibre, coco o agridulce.",
        commercialLever: "Permite vender uvas menos obvias por copa y crear sensacion de recomendacion experta.",
        avoid: "No usar tintos tánicos con picante o soja dominante. Se endurecen y aumentan el calor.",
        upsell: "Sube a Riesling de productor, Champagne o Chenin con textura si hay menu compartido.",
        menuHooks: ["sushi", "ramen", "thai curry", "bao", "ceviche fusion"],
      },
      en: {
        byTheGlass: "Dry or off-dry Riesling, Gewurztraminer, brut sparkling.",
        defaultWines: "Riesling, Gewurztraminer, Chenin Blanc, sparkling wine, rose.",
        role: "Asian cuisine requires managing spice, umami, sweetness and acidity. It is where a good pairing surprises most.",
        floorCue: "Do not start with colour; start with spice, soy, ginger, coconut or sweet-sour balance.",
        commercialLever: "It sells less obvious grapes by the glass and creates an expert recommendation moment.",
        avoid: "Avoid tannic reds with heat or dominant soy. They harden and increase spice perception.",
        upsell: "Move to producer Riesling, Champagne or textured Chenin when the menu is shared.",
        menuHooks: ["sushi", "ramen", "Thai curry", "bao", "fusion ceviche"],
      },
      it: {
        byTheGlass: "Riesling secco o abboccato, Gewurztraminer, spumante brut.",
        defaultWines: "Riesling, Gewurztraminer, Chenin Blanc, spumante, rosato.",
        role: "La cucina asiatica richiede gestione di piccante, umami, dolcezza e acidita. Qui l'abbinamento sorprende di piu.",
        floorCue: "Non partire dal colore; parti da piccante, soia, zenzero, cocco o agrodolce.",
        commercialLever: "Vende vitigni meno ovvi al calice e crea percezione di raccomandazione esperta.",
        avoid: "Evitare rossi tannici con piccante o soia dominante. Si induriscono e aumentano il calore.",
        upsell: "Sali a Riesling di produttore, Champagne o Chenin con texture se il menu e condiviso.",
        menuHooks: ["sushi", "ramen", "thai curry", "bao", "ceviche fusion"],
      },
      fr: {
        byTheGlass: "Riesling sec ou demi-sec, Gewurztraminer, effervescent brut.",
        defaultWines: "Riesling, Gewurztraminer, Chenin Blanc, effervescent, rose.",
        role: "La cuisine asiatique demande de gerer piment, umami, douceur et acidite. C'est l'accord qui surprend le plus.",
        floorCue: "Ne commencez pas par la couleur ; commencez par piment, soja, gingembre, coco ou aigre-doux.",
        commercialLever: "Il vend des cepages moins evidents au verre et cree une recommandation experte.",
        avoid: "Eviter les rouges tanniques avec piment ou soja dominant. Ils durcissent et augmentent la chaleur.",
        upsell: "Montez vers Riesling de producteur, Champagne ou Chenin texture si le menu se partage.",
        menuHooks: ["sushi", "ramen", "thai curry", "bao", "ceviche fusion"],
      },
      de: {
        byTheGlass: "Trockener oder feinherber Riesling, Gewurztraminer, Brut-Schaumwein.",
        defaultWines: "Riesling, Gewurztraminer, Chenin Blanc, Schaumwein, Rose.",
        role: "Asiatische Kuche verlangt Kontrolle von Scharfe, Umami, Suesse und Saure. Hier uberrascht Pairing am starksten.",
        floorCue: "Nicht mit Farbe beginnen; mit Scharfe, Soja, Ingwer, Kokos oder Suss-Sauer beginnen.",
        commercialLever: "Verkauft weniger offensichtliche Rebsorten im Glas und schafft Expertenwirkung.",
        avoid: "Tannische Rotweine bei Scharfe oder dominanter Soja vermeiden. Sie wirken hart und verstarken Hitze.",
        upsell: "Zu Produzenten-Riesling, Champagne oder texturiertem Chenin wechseln, wenn das Menu geteilt wird.",
        menuHooks: ["Sushi", "Ramen", "Thai Curry", "Bao", "Fusion-Ceviche"],
      },
      pt: {
        byTheGlass: "Riesling seco ou meio seco, Gewurztraminer, espumante brut.",
        defaultWines: "Riesling, Gewurztraminer, Chenin Blanc, espumante, rose.",
        role: "Cozinha asiatica exige gerir picante, umami, doçura e acidez. E onde uma boa harmonizacao mais surpreende.",
        floorCue: "Nao comece pela cor; comece por picante, soja, gengibre, coco ou agridoce.",
        commercialLever: "Vende castas menos obvias a copo e cria sensacao de recomendacao especialista.",
        avoid: "Evite tintos tanicos com picante ou soja dominante. Endurecem e aumentam o calor.",
        upsell: "Suba para Riesling de produtor, Champagne ou Chenin com textura quando o menu for partilhado.",
        menuHooks: ["sushi", "ramen", "thai curry", "bao", "ceviche fusion"],
      },
    }),
  },
  quesos: {
    slug: "quesos",
    priority: 6,
    serviceMoment: "dessert / after-dinner / premium glass",
    texts: profileText({
      es: {
        byTheGlass: "Amontillado, Oloroso, Riesling, Sauternes o Pedro Ximenez.",
        defaultWines: "Fino, Amontillado, Champagne, Sauternes, Oporto, Riesling.",
        role: "Quesos es una categoria de margen alto si se vende por familias: fresco, cremoso, curado, azul.",
        floorCue: "No digas solo tinto con queso. Lee sal, grasa, curacion e intensidad.",
        commercialLever: "Una tabla de quesos permite vender copas premium al final de la comida con coste controlado.",
        avoid: "No recomendar tintos tánicos con todos los quesos. Muchos quesos van mejor con blancos, generosos o dulces.",
        upsell: "Sube a generosos, vinos dulces o Champagne cuando el cliente comparte tabla o pide final largo.",
        menuHooks: ["manchego", "queso azul", "brie", "parmigiano", "tabla de quesos"],
      },
      en: {
        byTheGlass: "Amontillado, Oloroso, Riesling, Sauternes or Pedro Ximenez.",
        defaultWines: "Fino, Amontillado, Champagne, Sauternes, Port, Riesling.",
        role: "Cheese is a high-margin category when sold by families: fresh, creamy, aged and blue.",
        floorCue: "Do not just say red with cheese. Read salt, fat, ageing and intensity.",
        commercialLever: "A cheese board lets the team sell premium glasses at the end of the meal with controlled cost.",
        avoid: "Do not recommend tannic reds with every cheese. Many cheeses work better with whites, fortified or sweet wines.",
        upsell: "Move to fortified, sweet wines or Champagne when guests share a board or want a long finish.",
        menuHooks: ["Manchego", "blue cheese", "Brie", "Parmigiano", "cheese board"],
      },
      it: {
        byTheGlass: "Amontillado, Oloroso, Riesling, Sauternes o Pedro Ximenez.",
        defaultWines: "Fino, Amontillado, Champagne, Sauternes, Porto, Riesling.",
        role: "I formaggi sono categoria ad alto margine se venduti per famiglie: freschi, cremosi, stagionati, erborinati.",
        floorCue: "Non dire solo rosso con formaggio. Leggi sale, grasso, stagionatura e intensita.",
        commercialLever: "Un tagliere permette di vendere calici premium a fine pasto con costo controllato.",
        avoid: "Non consigliare rossi tannici con tutti i formaggi. Molti funzionano meglio con bianchi, fortificati o dolci.",
        upsell: "Sali a fortificati, vini dolci o Champagne quando si condivide un tagliere o si cerca un finale lungo.",
        menuHooks: ["Manchego", "formaggio erborinato", "Brie", "Parmigiano", "tagliere"],
      },
      fr: {
        byTheGlass: "Amontillado, Oloroso, Riesling, Sauternes ou Pedro Ximenez.",
        defaultWines: "Fino, Amontillado, Champagne, Sauternes, Porto, Riesling.",
        role: "Le fromage est une categorie a forte marge s'il est vendu par familles : frais, cremeux, affine, bleu.",
        floorCue: "Ne dites pas seulement rouge avec fromage. Lisez sel, gras, affinage et intensite.",
        commercialLever: "Un plateau de fromages permet de vendre des verres premium en fin de repas avec cout maitrise.",
        avoid: "Ne pas recommander des rouges tanniques avec tous les fromages. Beaucoup vont mieux avec blancs, fortifies ou doux.",
        upsell: "Montez vers fortifies, vins doux ou Champagne lorsque la table partage un plateau.",
        menuHooks: ["Manchego", "fromage bleu", "Brie", "Parmigiano", "plateau de fromages"],
      },
      de: {
        byTheGlass: "Amontillado, Oloroso, Riesling, Sauternes oder Pedro Ximenez.",
        defaultWines: "Fino, Amontillado, Champagne, Sauternes, Port, Riesling.",
        role: "Kase ist eine margentragende Kategorie, wenn nach Familien verkauft wird: frisch, cremig, gereift, blau.",
        floorCue: "Nicht einfach Rotwein zu Kase sagen. Salz, Fett, Reife und Intensitat lesen.",
        commercialLever: "Eine Kaseplatte verkauft Premiumglaser am Ende des Essens mit kontrollierten Kosten.",
        avoid: "Nicht tannische Rotweine zu jedem Kase empfehlen. Viele Kase passen besser zu Weisswein, Fortified oder Susswein.",
        upsell: "Zu Fortified, Susswein oder Champagne wechseln, wenn eine Platte geteilt wird oder der Abschluss langer sein soll.",
        menuHooks: ["Manchego", "Blauschimmel", "Brie", "Parmigiano", "Kaseplatte"],
      },
      pt: {
        byTheGlass: "Amontillado, Oloroso, Riesling, Sauternes ou Pedro Ximenez.",
        defaultWines: "Fino, Amontillado, Champagne, Sauternes, Porto, Riesling.",
        role: "Queijos sao uma categoria de margem alta quando vendidos por familias: fresco, cremoso, curado, azul.",
        floorCue: "Nao diga apenas tinto com queijo. Leia sal, gordura, cura e intensidade.",
        commercialLever: "Uma tabua de queijos permite vender copos premium no final da refeicao com custo controlado.",
        avoid: "Nao recomendar tintos tanicos com todos os queijos. Muitos funcionam melhor com brancos, fortificados ou doces.",
        upsell: "Suba para fortificados, vinhos doces ou Champagne quando a mesa partilha tabua ou quer final longo.",
        menuHooks: ["Manchego", "queijo azul", "Brie", "Parmigiano", "tabua de queijos"],
      },
    }),
  },
};

const langFallback = (lang: string): WineLibraryPairingEditorialLang =>
  ["es", "en", "it", "fr", "de", "pt"].includes(lang) ? (lang as WineLibraryPairingEditorialLang) : "en";

const pairingEditorialCopy: Record<WineLibraryPairingEditorialLang, {
  eyebrow: string;
  title: (name: string) => string;
  subtitle: string;
  labels: {
    moment: string;
    byTheGlass: string;
    defaultWines: string;
    role: string;
    floorCue: string;
    commercialLever: string;
    avoid: string;
    upsell: string;
    menu: string;
  };
  faqPairing: (name: string, wines: string) => { q: string; a: string };
  faqList: (name: string, byTheGlass: string) => { q: string; a: string };
}> = {
  es: {
    eyebrow: "Inteligencia de maridaje",
    title: (name) => `Cómo vender ${name} en sala`,
    subtitle: "Lectura practica para plato, copa, upsell y margen.",
    labels: { moment: "Momento", byTheGlass: "Por copa", defaultWines: "Vinos base", role: "Rol del maridaje", floorCue: "Guion de sala", commercialLever: "Palanca comercial", avoid: "Error a evitar", upsell: "Ruta de upsell", menu: "Platos clave" },
    faqPairing: (name, wines) => ({ q: `¿Qué vinos funcionan con ${name}?`, a: `Como punto de partida: ${wines}. Ajusta por intensidad, grasa, salsa y temperatura de servicio.` }),
    faqList: (name, byTheGlass) => ({ q: `¿Cómo vender ${name} en una carta?`, a: `Dale una recomendacion segura por copa y una ruta premium. Para copa: ${byTheGlass}` }),
  },
  en: {
    eyebrow: "Pairing intelligence",
    title: (name) => `How to sell ${name} on the floor`,
    subtitle: "Practical reading for dish, glass, upsell and margin.",
    labels: { moment: "Moment", byTheGlass: "By the glass", defaultWines: "Core wines", role: "Pairing role", floorCue: "Floor cue", commercialLever: "Commercial lever", avoid: "Mistake to avoid", upsell: "Upsell route", menu: "Key dishes" },
    faqPairing: (name, wines) => ({ q: `Which wines work with ${name}?`, a: `Start with ${wines}. Adjust by intensity, fat, sauce and service temperature.` }),
    faqList: (name, byTheGlass) => ({ q: `How should a restaurant sell ${name}?`, a: `Give it one safe by-the-glass recommendation and one premium route. By the glass: ${byTheGlass}` }),
  },
  it: {
    eyebrow: "Intelligenza di abbinamento",
    title: (name) => `Come vendere ${name} in sala`,
    subtitle: "Lettura pratica per piatto, calice, upsell e margine.",
    labels: { moment: "Momento", byTheGlass: "Al calice", defaultWines: "Vini base", role: "Ruolo dell'abbinamento", floorCue: "Indicazione di sala", commercialLever: "Leva commerciale", avoid: "Errore da evitare", upsell: "Percorso upsell", menu: "Piatti chiave" },
    faqPairing: (name, wines) => ({ q: `Quali vini funzionano con ${name}?`, a: `Come partenza: ${wines}. Regola per intensita, grasso, salsa e temperatura di servizio.` }),
    faqList: (name, byTheGlass) => ({ q: `Come vendere ${name} in carta?`, a: `Dai una raccomandazione sicura al calice e un percorso premium. Al calice: ${byTheGlass}` }),
  },
  fr: {
    eyebrow: "Intelligence d'accord",
    title: (name) => `Comment vendre ${name} en salle`,
    subtitle: "Lecture pratique pour plat, verre, montee en gamme et marge.",
    labels: { moment: "Moment", byTheGlass: "Au verre", defaultWines: "Vins de base", role: "Role de l'accord", floorCue: "Argument de salle", commercialLever: "Levier commercial", avoid: "Erreur a eviter", upsell: "Route de montee en gamme", menu: "Plats cles" },
    faqPairing: (name, wines) => ({ q: `Quels vins fonctionnent avec ${name} ?`, a: `Point de depart : ${wines}. Ajustez selon intensite, gras, sauce et temperature de service.` }),
    faqList: (name, byTheGlass) => ({ q: `Comment vendre ${name} en carte ?`, a: `Ajoutez une recommandation sure au verre et une route premium. Au verre : ${byTheGlass}` }),
  },
  de: {
    eyebrow: "Pairing-Service-Intelligenz",
    title: (name) => `Wie ${name} im Service verkauft wird`,
    subtitle: "Praktische Lesart fur Gericht, Glas, Upsell und Marge.",
    labels: { moment: "Moment", byTheGlass: "Im Glas", defaultWines: "Basisweine", role: "Pairing-Rolle", floorCue: "Service-Argument", commercialLever: "Kommerzieller Hebel", avoid: "Fehler vermeiden", upsell: "Upsell-Route", menu: "Schlusselgerichte" },
    faqPairing: (name, wines) => ({ q: `Welche Weine passen zu ${name}?`, a: `Startpunkt: ${wines}. Nach Intensitat, Fett, Sauce und Serviertemperatur anpassen.` }),
    faqList: (name, byTheGlass) => ({ q: `Wie verkauft ein Restaurant ${name}?`, a: `Mit einer sicheren Glasempfehlung und einer Premiumroute. Im Glas: ${byTheGlass}` }),
  },
  pt: {
    eyebrow: "Inteligencia de harmonizacao",
    title: (name) => `Como vender ${name} em sala`,
    subtitle: "Leitura pratica para prato, copo, upsell e margem.",
    labels: { moment: "Momento", byTheGlass: "A copo", defaultWines: "Vinhos base", role: "Papel da harmonizacao", floorCue: "Argumento de sala", commercialLever: "Alavanca comercial", avoid: "Erro a evitar", upsell: "Rota de upsell", menu: "Pratos chave" },
    faqPairing: (name, wines) => ({ q: `Que vinhos funcionam com ${name}?`, a: `Como ponto de partida: ${wines}. Ajuste por intensidade, gordura, molho e temperatura de servico.` }),
    faqList: (name, byTheGlass) => ({ q: `Como vender ${name} numa carta?`, a: `Dê uma recomendacao segura a copo e uma rota premium. A copo: ${byTheGlass}` }),
  },
};

export function getPairingEditorialProfile(
  slug: string,
  lang: string,
  pairingName: string,
): LocalizedPairingEditorialProfile | undefined {
  const profile = pairingEditorialProfiles[slug];
  if (!profile) return undefined;
  const resolvedLang = langFallback(lang);
  const copy = pairingEditorialCopy[resolvedLang];
  const text = profile.texts[resolvedLang];

  return {
    slug,
    priority: profile.priority,
    eyebrow: copy.eyebrow,
    title: copy.title(pairingName),
    subtitle: copy.subtitle,
    facts: [
      { label: copy.labels.moment, value: profile.serviceMoment },
      { label: copy.labels.byTheGlass, value: text.byTheGlass },
      { label: copy.labels.defaultWines, value: text.defaultWines },
    ],
    sections: [
      { title: copy.labels.role, body: text.role },
      { title: copy.labels.floorCue, body: text.floorCue },
      { title: copy.labels.commercialLever, body: text.commercialLever },
      { title: copy.labels.avoid, body: text.avoid },
      { title: copy.labels.upsell, body: text.upsell },
    ],
    menuTitle: copy.labels.menu,
    menuHooks: text.menuHooks,
    faqs: [
      copy.faqPairing(pairingName, text.defaultWines),
      copy.faqList(pairingName, text.byTheGlass),
    ],
  };
}
