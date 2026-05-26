export type WineLibraryStyleEditorialLang = "es" | "en" | "it" | "fr" | "de" | "pt";

type LocalizedStyleEditorialText = {
  byTheGlass: string;
  role: string;
  floorCue: string;
  commercialLever: string;
  avoid: string;
  menuHooks: string[];
};

interface StyleEditorialProfileSeed {
  slug: string;
  priority: number;
  serviceTemp: string;
  glass: string;
  texts: Record<WineLibraryStyleEditorialLang, LocalizedStyleEditorialText>;
}

export interface LocalizedStyleEditorialProfile {
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

export const priorityStyleSlugs = [
  "tinto-crianza",
  "tinto-reserva",
  "blanco-crianza-lias",
  "espumoso",
  "rosado-cuerpo",
] as const;

const profileText = (text: Record<WineLibraryStyleEditorialLang, LocalizedStyleEditorialText>) => text;

const styleEditorialProfiles: Record<string, StyleEditorialProfileSeed> = {
  "tinto-crianza": {
    slug: "tinto-crianza",
    priority: 1,
    serviceTemp: "16-18 C",
    glass: "Burdeos / universal amplia",
    texts: profileText({
      es: {
        byTheGlass: "Rioja, Ribera o Garnacha crianza con rotación alta.",
        role: "El tinto crianza es el puente de confianza entre el vino sencillo y la botella premium. Da seguridad, tiene precio defendible y ayuda a subir ticket sin pedir una explicación larga.",
        floorCue: "Véndelo por región, productor y equilibrio: fruta madura, madera integrada y tanino amable.",
        commercialLever: "Funciona como ancla de carta. Si hay una referencia por copa y otra de productor para botella, cubre consumo casual y upsell.",
        avoid: "No servirlo demasiado caliente ni describirlo solo como vino con madera. La clave es equilibrio, no roble.",
        menuHooks: ["cordero", "carnes rojas", "setas", "quesos curados", "guisos"],
      },
      en: {
        byTheGlass: "Rioja, Ribera or Garnacha crianza with strong rotation.",
        role: "Crianza red is the trust bridge between an easy red and a premium bottle. It feels safe, has defendable pricing and lifts spend without a long explanation.",
        floorCue: "Sell it through region, producer and balance: ripe fruit, integrated oak and gentle tannin.",
        commercialLever: "It anchors the list. One by-the-glass option and one producer-led bottle cover casual demand and upsell.",
        avoid: "Do not serve it too warm or describe it only as oaky wine. The key is balance, not oak.",
        menuHooks: ["lamb", "red meat", "mushrooms", "aged cheese", "stews"],
      },
      it: {
        byTheGlass: "Rioja, Ribera o Garnacha crianza ad alta rotazione.",
        role: "Il rosso crianza e il ponte di fiducia tra un rosso semplice e una bottiglia premium. Da sicurezza, ha prezzo difendibile e alza lo scontrino senza spiegazioni lunghe.",
        floorCue: "Vendilo per regione, produttore ed equilibrio: frutto maturo, legno integrato e tannino gentile.",
        commercialLever: "Ancora la carta. Una referenza al calice e una bottiglia di produttore coprono consumo casual e upsell.",
        avoid: "Non servirlo troppo caldo ne descriverlo solo come vino boise. La chiave e equilibrio, non rovere.",
        menuHooks: ["agnello", "carni rosse", "funghi", "formaggi stagionati", "stufati"],
      },
      fr: {
        byTheGlass: "Rioja, Ribera ou Garnacha crianza en forte rotation.",
        role: "Le rouge crianza est le pont de confiance entre un rouge simple et une bouteille premium. Il rassure, justifie le prix et augmente le ticket sans longue explication.",
        floorCue: "Vendez-le par region, producteur et equilibre : fruit mur, bois integre et tanin souple.",
        commercialLever: "Il ancre la carte. Une reference au verre et une bouteille de producteur couvrent rotation et montee en gamme.",
        avoid: "Ne pas le servir trop chaud ni le reduire a un vin boise. La cle est l'equilibre, pas le chene.",
        menuHooks: ["agneau", "viandes rouges", "champignons", "fromages affines", "plats mijotes"],
      },
      de: {
        byTheGlass: "Rioja, Ribera oder Garnacha Crianza mit hoher Rotation.",
        role: "Crianza-Rotwein ist die Vertrauensbrucke zwischen einfachem Rotwein und Premiumflasche. Er wirkt sicher, ist preislich gut erklarbar und hebt den Bon ohne lange Erklarung.",
        floorCue: "Uber Region, Produzent und Balance verkaufen: reife Frucht, integriertes Holz und sanftes Tannin.",
        commercialLever: "Er verankert die Karte. Eine Option im Glas und eine Produzentenflasche decken Alltag und Upsell ab.",
        avoid: "Nicht zu warm servieren und nicht nur als holzbetonten Wein beschreiben. Entscheidend ist Balance, nicht Eiche.",
        menuHooks: ["Lamm", "rotes Fleisch", "Pilze", "gereifter Kase", "Schmorgerichte"],
      },
      pt: {
        byTheGlass: "Rioja, Ribera ou Garnacha crianza com alta rotacao.",
        role: "O tinto crianza e a ponte de confianca entre um tinto simples e uma garrafa premium. Da seguranca, tem preco defensavel e sobe ticket sem explicacao longa.",
        floorCue: "Venda por regiao, produtor e equilibrio: fruta madura, madeira integrada e tanino amavel.",
        commercialLever: "Ancora a carta. Uma referencia a copo e uma garrafa de produtor cobrem consumo casual e upsell.",
        avoid: "Nao servir demasiado quente nem descrever apenas como vinho com madeira. A chave e equilibrio, nao carvalho.",
        menuHooks: ["borrego", "carnes vermelhas", "cogumelos", "queijos curados", "estufados"],
      },
    }),
  },
  "tinto-reserva": {
    slug: "tinto-reserva",
    priority: 2,
    serviceTemp: "16-18 C",
    glass: "Burdeos amplia",
    texts: profileText({
      es: {
        byTheGlass: "Solo con conservación adecuada; mejor como botella de ocasión.",
        role: "El tinto reserva construye percepción premium: envejecimiento, productor, añada y momento especial.",
        floorCue: "Cuenta el tiempo: crianza, botella y evolución. El cliente entiende mejor el precio cuando ve paciencia y selección.",
        commercialLever: "Eleva ticket en mesas de celebración, carnes y menús largos. Es una palanca clara de botella, no solo de categoría.",
        avoid: "No asumir que más viejo siempre es mejor. Revisa añada, conservación y necesidad de aireación.",
        menuHooks: ["chuletón", "caza", "guisos lentos", "trufa", "quesos muy curados"],
      },
      en: {
        byTheGlass: "Only with proper preservation; stronger as an occasion bottle.",
        role: "Reserva red builds premium perception through ageing, producer, vintage and special occasion.",
        floorCue: "Tell the time story: oak ageing, bottle ageing and evolution. Guests understand price when they see patience and selection.",
        commercialLever: "It lifts spend for celebrations, meat-led tables and long menus. It is a bottle lever, not just a category.",
        avoid: "Do not assume older is always better. Check vintage, storage and need for aeration.",
        menuHooks: ["ribeye", "game", "slow stews", "truffle", "very aged cheese"],
      },
      it: {
        byTheGlass: "Solo con conservazione adeguata; meglio come bottiglia d'occasione.",
        role: "Il rosso reserva costruisce percezione premium con affinamento, produttore, annata e momento speciale.",
        floorCue: "Racconta il tempo: botte, bottiglia ed evoluzione. Il cliente capisce il prezzo quando vede pazienza e selezione.",
        commercialLever: "Alza lo scontrino in celebrazioni, tavoli di carne e menu lunghi. E una leva di bottiglia, non solo di categoria.",
        avoid: "Non dare per scontato che piu vecchio sia sempre meglio. Controlla annata, conservazione e aria.",
        menuHooks: ["costata", "selvaggina", "brasati", "tartufo", "formaggi molto stagionati"],
      },
      fr: {
        byTheGlass: "Seulement avec conservation adaptee ; plus fort en bouteille d'occasion.",
        role: "Le rouge reserva cree une perception premium par elevage, producteur, millesime et moment special.",
        floorCue: "Racontez le temps : elevage, bouteille et evolution. Le client comprend le prix quand il voit patience et selection.",
        commercialLever: "Il augmente le ticket sur celebrations, viandes et menus longs. C'est un levier bouteille.",
        avoid: "Ne pas supposer que plus vieux est toujours meilleur. Verifiez millesime, conservation et besoin d'aeration.",
        menuHooks: ["entrecote", "gibier", "plats mijotes", "truffe", "fromages tres affines"],
      },
      de: {
        byTheGlass: "Nur mit passender Konservierung; starker als Anlassflasche.",
        role: "Reserva-Rotwein schafft Premiumwahrnehmung uber Ausbau, Produzent, Jahrgang und besonderen Anlass.",
        floorCue: "Die Zeit erzahlen: Fass, Flasche und Entwicklung. Gaste verstehen den Preis, wenn Geduld und Auswahl sichtbar sind.",
        commercialLever: "Hebt den Bon bei Feiern, Fleischgerichten und langen Menus. Eine klare Flaschenchance.",
        avoid: "Nicht annehmen, dass alter immer besser ist. Jahrgang, Lagerung und Luftbedarf prufen.",
        menuHooks: ["Ribeye", "Wild", "Schmorgerichte", "Truffel", "sehr gereifter Kase"],
      },
      pt: {
        byTheGlass: "So com conservacao adequada; melhor como garrafa de ocasiao.",
        role: "O tinto reserva cria percecao premium atraves de estagio, produtor, colheita e momento especial.",
        floorCue: "Conte o tempo: barrica, garrafa e evolucao. O cliente entende melhor o preco quando ve paciencia e selecao.",
        commercialLever: "Sobe ticket em celebracoes, mesas de carne e menus longos. E uma alavanca de garrafa.",
        avoid: "Nao assumir que mais velho e sempre melhor. Verifique colheita, conservacao e necessidade de ar.",
        menuHooks: ["entrecote", "caca", "estufados lentos", "trufa", "queijos muito curados"],
      },
    }),
  },
  "blanco-crianza-lias": {
    slug: "blanco-crianza-lias",
    priority: 3,
    serviceTemp: "10-12 C",
    glass: "Blanco grande / universal",
    texts: profileText({
      es: {
        byTheGlass: "Copa premium si hay rotación; botella gastronómica para pescado, arroces y aves.",
        role: "El blanco con lías permite vender blanco con textura y precio superior sin depender de la barrica.",
        floorCue: "Explica crema, salinidad y volumen. La palabra lías debe traducirse a textura, no a técnica fría.",
        commercialLever: "Abre upsell en clientes que suelen pedir blanco fresco pero necesitan un vino con más mesa.",
        avoid: "No servirlo helado ni presentarlo como blanco pesado. La gracia es tensión con volumen.",
        menuHooks: ["pescado blanco", "marisco", "arroces", "aves", "quesos cremosos"],
      },
      en: {
        byTheGlass: "Premium glass if rotation is real; gastronomic bottle for fish, rice and poultry.",
        role: "Lees-aged white sells texture and a higher white-wine price without relying on oak.",
        floorCue: "Translate lees into creaminess, salinity and volume. Make the technique useful, not cold.",
        commercialLever: "It opens an upsell for guests who usually order fresh white but need more table presence.",
        avoid: "Do not serve it ice cold or present it as heavy white. The point is tension with volume.",
        menuHooks: ["white fish", "shellfish", "rice dishes", "poultry", "creamy cheeses"],
      },
      it: {
        byTheGlass: "Calice premium se la rotazione e reale; bottiglia gastronomica per pesce, riso e carni bianche.",
        role: "Il bianco sui lieviti vende texture e prezzo superiore senza dipendere dal legno.",
        floorCue: "Traduci i lieviti in cremosita, salinita e volume. La tecnica deve essere utile, non fredda.",
        commercialLever: "Apre upsell per chi chiede bianco fresco ma ha bisogno di piu presenza a tavola.",
        avoid: "Non servirlo gelato ne presentarlo come bianco pesante. Il punto e tensione con volume.",
        menuHooks: ["pesce bianco", "frutti di mare", "risotti", "pollame", "formaggi cremosi"],
      },
      fr: {
        byTheGlass: "Verre premium si la rotation est reelle ; bouteille gastronomique pour poisson, riz et volaille.",
        role: "Le blanc sur lies vend texture et prix superieur sans dependre du bois.",
        floorCue: "Traduisez les lies en cremeux, salinite et volume. La technique doit servir le client.",
        commercialLever: "Il ouvre une montee en gamme pour les clients de blanc frais qui veulent plus de presence a table.",
        avoid: "Ne pas servir glace ni comme blanc lourd. L'interet est la tension avec du volume.",
        menuHooks: ["poisson blanc", "fruits de mer", "riz", "volaille", "fromages cremoses"],
      },
      de: {
        byTheGlass: "Premiumglas bei echter Rotation; gastronomische Flasche zu Fisch, Reis und Geflugel.",
        role: "Weisswein auf der Hefe verkauft Textur und hoheren Weissweinpreis ohne Holz als Hauptargument.",
        floorCue: "Hefelager in Cremigkeit, Salinitat und Volumen ubersetzen. Technik muss fur Gaste nutzlich werden.",
        commercialLever: "Offnet Upsell fur Gaste, die frischen Weisswein suchen, aber mehr Prasenz am Tisch brauchen.",
        avoid: "Nicht eiskalt servieren und nicht als schweren Weisswein verkaufen. Es geht um Spannung mit Volumen.",
        menuHooks: ["weisser Fisch", "Meeresfruchte", "Reisgerichte", "Geflugel", "cremiger Kase"],
      },
      pt: {
        byTheGlass: "Copo premium se houver rotacao; garrafa gastronomica para peixe, arroz e aves.",
        role: "O branco sobre lias vende textura e preco superior sem depender da madeira.",
        floorCue: "Traduza lias em cremosidade, salinidade e volume. A tecnica deve ajudar o cliente.",
        commercialLever: "Abre upsell para clientes de branco fresco que precisam de mais presenca a mesa.",
        avoid: "Nao servir gelado nem apresentar como branco pesado. A chave e tensao com volume.",
        menuHooks: ["peixe branco", "marisco", "arrozes", "aves", "queijos cremosos"],
      },
    }),
  },
  espumoso: {
    slug: "espumoso",
    priority: 4,
    serviceTemp: "6-8 C",
    glass: "Tulipa / copa de vino blanco",
    texts: profileText({
      es: {
        byTheGlass: "Brut método tradicional para aperitivo; botella de crianza larga para mesa.",
        role: "El espumoso no es solo celebración: es aperitivo, maridaje y herramienta de ticket medio.",
        floorCue: "Habla de método, crianza sobre lías y dosage. Así el cliente entiende diferencia entre Cava, Champagne y Prosecco.",
        commercialLever: "Excelente para copa, brindis, menús degustación y maridajes con fritura o marisco.",
        avoid: "No relegarlo al postre ni servirlo en copa coupe. Pierde precisión y oportunidad comercial.",
        menuHooks: ["ostras", "frituras", "sushi", "jamón ibérico", "quesos"],
      },
      en: {
        byTheGlass: "Traditional-method brut for aperitif; longer-aged bottle for the table.",
        role: "Sparkling wine is not only celebration: it is aperitif, pairing tool and spend builder.",
        floorCue: "Talk method, lees ageing and dosage. That explains Cava, Champagne and Prosecco clearly.",
        commercialLever: "Strong for by-the-glass, toasts, tasting menus and pairings with fried food or shellfish.",
        avoid: "Do not relegate it to dessert or serve it in coupe glasses. Precision and sales opportunity disappear.",
        menuHooks: ["oysters", "fried dishes", "sushi", "Iberian ham", "cheese"],
      },
      it: {
        byTheGlass: "Brut metodo classico per aperitivo; bottiglia a lunga sosta per la tavola.",
        role: "Lo spumante non e solo celebrazione: e aperitivo, abbinamento e leva di scontrino.",
        floorCue: "Parla di metodo, affinamento sui lieviti e dosage. Cosi Cava, Champagne e Prosecco diventano chiari.",
        commercialLever: "Forte al calice, brindisi, degustazione e abbinamenti con fritti o frutti di mare.",
        avoid: "Non relegarlo al dessert ne servirlo in coppa coupe. Perde precisione e opportunita.",
        menuHooks: ["ostriche", "fritti", "sushi", "jamon iberico", "formaggi"],
      },
      fr: {
        byTheGlass: "Brut methode traditionnelle a l'aperitif ; bouteille longue garde pour la table.",
        role: "L'effervescent n'est pas seulement la celebration : c'est aperitif, accord et levier de ticket.",
        floorCue: "Parlez methode, elevage sur lies et dosage. Cava, Champagne et Prosecco deviennent lisibles.",
        commercialLever: "Tres fort au verre, toast, menu degustation et accords avec friture ou fruits de mer.",
        avoid: "Ne pas le releguer au dessert ni le servir en coupe. Precision et opportunite commerciale baissent.",
        menuHooks: ["huitres", "fritures", "sushi", "jambon iberique", "fromages"],
      },
      de: {
        byTheGlass: "Brut aus traditioneller Methode als Aperitif; langer gereifte Flasche zum Essen.",
        role: "Schaumwein ist nicht nur Feier: Er ist Aperitif, Pairing-Werkzeug und Bon-Hebel.",
        floorCue: "Methode, Hefelager und Dosage nennen. So werden Cava, Champagne und Prosecco verstandlich.",
        commercialLever: "Stark im Glas, beim Anstossen, im Degustationsmenu und zu Frittiertem oder Meeresfruchten.",
        avoid: "Nicht auf Dessert reduzieren und nicht in der Coupe servieren. Prazision und Chance gehen verloren.",
        menuHooks: ["Austern", "Frittiertes", "Sushi", "Iberico-Schinken", "Kase"],
      },
      pt: {
        byTheGlass: "Brut de metodo tradicional para aperitivo; garrafa com estagio longo para mesa.",
        role: "O espumante nao e so celebracao: e aperitivo, harmonizacao e alavanca de ticket medio.",
        floorCue: "Fale de metodo, estagio sobre lias e dosage. Assim Cava, Champagne e Prosecco ficam claros.",
        commercialLever: "Forte a copo, brindes, menus de degustacao e harmonizacoes com fritos ou marisco.",
        avoid: "Nao relegar para sobremesa nem servir em coupe. Perde precisao e oportunidade comercial.",
        menuHooks: ["ostras", "fritos", "sushi", "presunto iberico", "queijos"],
      },
    }),
  },
  "rosado-cuerpo": {
    slug: "rosado-cuerpo",
    priority: 5,
    serviceTemp: "9-11 C",
    glass: "Blanco amplio / universal",
    texts: profileText({
      es: {
        byTheGlass: "Rosado seco y estructurado en temporada; botella para cocina mediterránea y picante.",
        role: "El rosado gastronómico une frescura de blanco y estructura de tinto. Da una respuesta elegante cuando la mesa no se pone de acuerdo.",
        floorCue: "Véndelo como rosado seco, serio y de comida. Color no significa dulzor.",
        commercialLever: "Aumenta rotación en terraza y abre maridajes con arroces, atún, cocina asiática y embutidos.",
        avoid: "No presentarlo como vino simple de verano. Si tiene cuerpo, hay que darle sitio gastronómico.",
        menuHooks: ["arroces", "atún", "cocina picante", "charcutería", "aves"],
      },
      en: {
        byTheGlass: "Dry structured rose in season; bottle for Mediterranean and spicy dishes.",
        role: "Gastronomic rose bridges white freshness and red structure. It solves tables that cannot agree on one wine.",
        floorCue: "Sell it as dry, serious and food-friendly rose. Colour does not mean sweetness.",
        commercialLever: "It drives terrace rotation and opens pairings with rice, tuna, Asian food and charcuterie.",
        avoid: "Do not present it as simple summer wine. If it has body, give it a gastronomic role.",
        menuHooks: ["rice dishes", "tuna", "spicy food", "charcuterie", "poultry"],
      },
      it: {
        byTheGlass: "Rosato secco e strutturato in stagione; bottiglia per cucina mediterranea e piccante.",
        role: "Il rosato gastronomico unisce freschezza del bianco e struttura del rosso. Risolve tavoli che non scelgono un solo vino.",
        floorCue: "Vendilo come rosato secco, serio e da tavola. Colore non significa dolcezza.",
        commercialLever: "Aumenta rotazione in terrazza e apre abbinamenti con riso, tonno, cucina asiatica e salumi.",
        avoid: "Non presentarlo come semplice vino estivo. Se ha corpo, merita ruolo gastronomico.",
        menuHooks: ["risotti", "tonno", "cucina piccante", "salumi", "pollame"],
      },
      fr: {
        byTheGlass: "Rose sec et structure en saison ; bouteille pour cuisine mediterraneenne et epicee.",
        role: "Le rose gastronomique relie fraicheur du blanc et structure du rouge. Il resout les tables qui hesitent.",
        floorCue: "Vendez-le comme rose sec, serieux et de table. La couleur ne signifie pas sucre.",
        commercialLever: "Il augmente la rotation en terrasse et ouvre riz, thon, cuisine asiatique et charcuterie.",
        avoid: "Ne pas le presenter comme simple vin d'ete. S'il a du corps, il merite un role gastronomique.",
        menuHooks: ["riz", "thon", "cuisine epicee", "charcuterie", "volaille"],
      },
      de: {
        byTheGlass: "Trockener, strukturierter Rose in der Saison; Flasche zu mediterraner und scharfer Kuche.",
        role: "Gastronomischer Rose verbindet Weissweinfrische mit Rotweinstruktur. Er lost Tische, die sich nicht einigen.",
        floorCue: "Als trockenen, ernsthaften Speisenrose verkaufen. Farbe bedeutet nicht Suesse.",
        commercialLever: "Steigert Terrassenrotation und offnet Pairings mit Reis, Thunfisch, asiatischer Kuche und Charcuterie.",
        avoid: "Nicht als einfachen Sommerwein vorstellen. Wenn er Korper hat, braucht er eine gastronomische Rolle.",
        menuHooks: ["Reisgerichte", "Thunfisch", "scharfe Kuche", "Charcuterie", "Geflugel"],
      },
      pt: {
        byTheGlass: "Rose seco e estruturado na epoca; garrafa para cozinha mediterranica e picante.",
        role: "O rose gastronomico une frescura de branco e estrutura de tinto. Resolve mesas que nao chegam a acordo.",
        floorCue: "Venda como rose seco, serio e de comida. Cor nao significa doçura.",
        commercialLever: "Aumenta rotacao em esplanada e abre arroz, atum, cozinha asiatica e enchidos.",
        avoid: "Nao apresentar como vinho simples de verao. Se tem corpo, merece papel gastronomico.",
        menuHooks: ["arrozes", "atum", "comida picante", "enchidos", "aves"],
      },
    }),
  },
};

const langFallback = (lang: string): WineLibraryStyleEditorialLang =>
  ["es", "en", "it", "fr", "de", "pt"].includes(lang) ? (lang as WineLibraryStyleEditorialLang) : "en";

const styleEditorialCopy: Record<WineLibraryStyleEditorialLang, {
  eyebrow: string;
  title: (name: string) => string;
  subtitle: string;
  labels: {
    serviceTemp: string;
    glass: string;
    byTheGlass: string;
    role: string;
    floorCue: string;
    commercialLever: string;
    avoid: string;
    menu: string;
  };
  faqService: (name: string, temp: string) => { q: string; a: string };
  faqList: (name: string, byTheGlass: string) => { q: string; a: string };
}> = {
  es: {
    eyebrow: "Inteligencia de estilo",
    title: (name) => `Cómo vender ${name} en una carta de vinos`,
    subtitle: "Lectura práctica para servicio, precio, rotación y maridaje.",
    labels: { serviceTemp: "Servicio", glass: "Copa", byTheGlass: "Por copa", role: "Rol en carta", floorCue: "Guion de sala", commercialLever: "Palanca comercial", avoid: "Error a evitar", menu: "Maridajes útiles" },
    faqService: (name, temp) => ({ q: `¿A qué temperatura servir ${name}?`, a: `${name} funciona como punto de partida a ${temp}. Ajusta según cuerpo, crianza, añada y contexto de sala.` }),
    faqList: (name, byTheGlass) => ({ q: `¿Cómo incluir ${name} en una carta de restaurante?`, a: `Incluye una referencia clara por ocasión y otra de mayor profundidad. Para copa: ${byTheGlass}` }),
  },
  en: {
    eyebrow: "Style intelligence",
    title: (name) => `How to sell ${name} on a wine list`,
    subtitle: "Practical reading for service, price, rotation and pairings.",
    labels: { serviceTemp: "Service", glass: "Glass", byTheGlass: "By the glass", role: "Role on the list", floorCue: "Floor cue", commercialLever: "Commercial lever", avoid: "Mistake to avoid", menu: "Useful pairings" },
    faqService: (name, temp) => ({ q: `What temperature works for ${name}?`, a: `${name} works as a starting point at ${temp}. Adjust by body, ageing, vintage and service context.` }),
    faqList: (name, byTheGlass) => ({ q: `How should a restaurant include ${name}?`, a: `Include one clear occasion-led reference and one deeper bottle. By the glass: ${byTheGlass}` }),
  },
  it: {
    eyebrow: "Intelligenza di stile",
    title: (name) => `Come vendere ${name} in carta`,
    subtitle: "Lettura pratica per servizio, prezzo, rotazione e abbinamenti.",
    labels: { serviceTemp: "Servizio", glass: "Calice", byTheGlass: "Al calice", role: "Ruolo in carta", floorCue: "Indicazione di sala", commercialLever: "Leva commerciale", avoid: "Errore da evitare", menu: "Abbinamenti utili" },
    faqService: (name, temp) => ({ q: `A che temperatura servire ${name}?`, a: `${name} funziona come punto di partenza a ${temp}. Regola in base a corpo, affinamento, annata e servizio.` }),
    faqList: (name, byTheGlass) => ({ q: `Come includere ${name} in una carta ristorante?`, a: `Inserisci una referenza chiara per occasione e una bottiglia piu profonda. Al calice: ${byTheGlass}` }),
  },
  fr: {
    eyebrow: "Intelligence de style",
    title: (name) => `Comment vendre ${name} en carte`,
    subtitle: "Lecture pratique pour service, prix, rotation et accords.",
    labels: { serviceTemp: "Service", glass: "Verre", byTheGlass: "Au verre", role: "Role en carte", floorCue: "Argument de salle", commercialLever: "Levier commercial", avoid: "Erreur a eviter", menu: "Accords utiles" },
    faqService: (name, temp) => ({ q: `A quelle temperature servir ${name} ?`, a: `${name} fonctionne comme point de depart a ${temp}. Ajustez selon corps, elevage, millesime et service.` }),
    faqList: (name, byTheGlass) => ({ q: `Comment inclure ${name} dans une carte de restaurant ?`, a: `Ajoutez une reference claire par occasion et une bouteille plus profonde. Au verre : ${byTheGlass}` }),
  },
  de: {
    eyebrow: "Stil-Service-Intelligenz",
    title: (name) => `Wie ${name} auf der Weinkarte verkauft wird`,
    subtitle: "Praktische Lesart fur Service, Preis, Rotation und Pairings.",
    labels: { serviceTemp: "Service", glass: "Glas", byTheGlass: "Im Glas", role: "Rolle auf der Weinkarte", floorCue: "Service-Argument", commercialLever: "Kommerzieller Hebel", avoid: "Fehler vermeiden", menu: "Nutzliche Pairings" },
    faqService: (name, temp) => ({ q: `Bei welcher Temperatur ${name} servieren?`, a: `${name} funktioniert als Ausgangspunkt bei ${temp}. Je nach Korper, Ausbau, Jahrgang und Servicekontext anpassen.` }),
    faqList: (name, byTheGlass) => ({ q: `Wie sollte ein Restaurant ${name} aufnehmen?`, a: `Eine klare Referenz nach Anlass und eine tiefere Flasche aufnehmen. Im Glas: ${byTheGlass}` }),
  },
  pt: {
    eyebrow: "Inteligencia de estilo",
    title: (name) => `Como vender ${name} numa carta de vinhos`,
    subtitle: "Leitura pratica para servico, preco, rotacao e harmonizacoes.",
    labels: { serviceTemp: "Servico", glass: "Copo", byTheGlass: "A copo", role: "Papel na carta", floorCue: "Argumento de sala", commercialLever: "Alavanca comercial", avoid: "Erro a evitar", menu: "Harmonizacoes uteis" },
    faqService: (name, temp) => ({ q: `A que temperatura servir ${name}?`, a: `${name} funciona como ponto de partida a ${temp}. Ajuste conforme corpo, estagio, colheita e contexto de sala.` }),
    faqList: (name, byTheGlass) => ({ q: `Como incluir ${name} numa carta de restaurante?`, a: `Inclua uma referencia clara por ocasiao e uma garrafa mais profunda. A copo: ${byTheGlass}` }),
  },
};

export function getStyleEditorialProfile(
  slug: string,
  lang: string,
  styleName: string,
): LocalizedStyleEditorialProfile | undefined {
  const profile = styleEditorialProfiles[slug];
  if (!profile) return undefined;
  const resolvedLang = langFallback(lang);
  const copy = styleEditorialCopy[resolvedLang];
  const text = profile.texts[resolvedLang];

  return {
    slug,
    priority: profile.priority,
    eyebrow: copy.eyebrow,
    title: copy.title(styleName),
    subtitle: copy.subtitle,
    facts: [
      { label: copy.labels.serviceTemp, value: profile.serviceTemp },
      { label: copy.labels.glass, value: profile.glass },
      { label: copy.labels.byTheGlass, value: text.byTheGlass },
    ],
    sections: [
      { title: copy.labels.role, body: text.role },
      { title: copy.labels.floorCue, body: text.floorCue },
      { title: copy.labels.commercialLever, body: text.commercialLever },
      { title: copy.labels.avoid, body: text.avoid },
    ],
    menuTitle: copy.labels.menu,
    menuHooks: text.menuHooks,
    faqs: [
      copy.faqService(styleName, profile.serviceTemp),
      copy.faqList(styleName, text.byTheGlass),
    ],
  };
}
