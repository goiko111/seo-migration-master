export type WineLibraryRegionEditorialLang = "es" | "en" | "it" | "fr" | "de" | "pt";

type LocalizedRegionEditorialText = {
  byTheGlass: string;
  role: string;
  floorCue: string;
  commercialLever: string;
  avoid: string;
  menuHooks: string[];
};

interface RegionEditorialProfileSeed {
  slug: string;
  priority: number;
  serviceTemp: string;
  glass: string;
  texts: Record<WineLibraryRegionEditorialLang, LocalizedRegionEditorialText>;
}

export interface LocalizedRegionEditorialProfile {
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

export const priorityRegionSlugs = [
  "rioja",
  "ribera-del-duero",
  "rias-baixas",
  "rueda",
  "priorat",
  "bourgogne",
  "bordeaux",
  "champagne",
  "douro",
  "vinho-verde",
] as const;

const profileText = (text: Record<WineLibraryRegionEditorialLang, LocalizedRegionEditorialText>) => text;

const regionEditorialProfiles: Record<string, RegionEditorialProfileSeed> = {
  rioja: {
    slug: "rioja",
    priority: 1,
    serviceTemp: "16-18 C",
    glass: "Burdeos / universal amplia",
    texts: profileText({
      es: {
        byTheGlass: "Crianza o tinto joven de productor; reserva para botella.",
        role: "Rioja es el tinto de confianza de la carta: reduce fricción, ordena la sección española y permite subir desde crianza accesible hasta gran reserva.",
        floorCue: "Véndelo por estilo y subzona: Rioja Alta para elegancia, Alavesa para frescura y Oriental para fruta más cálida.",
        commercialLever: "Funciona como ancla de rotación. El margen crece cuando la carta diferencia productor, viñedo o estilo en vez de listar solo crianza/reserva.",
        avoid: "No dejar que Rioja sea una categoría plana. Incluir blanco, garnacha o vino de pueblo evita que parezca una selección automática.",
        menuHooks: ["cordero asado", "ibéricos", "quesos curados", "tinto por copa"],
      },
      en: {
        byTheGlass: "Crianza or producer-led young red; reserve for bottle sales.",
        role: "Rioja is the trust red on the list: it reduces choice friction, structures the Spanish section and moves guests from crianza to gran reserva.",
        floorCue: "Sell it by style and subzone: Rioja Alta for elegance, Alavesa for freshness and Oriental for warmer fruit.",
        commercialLever: "It anchors rotation. Margin improves when the list separates producer, vineyard or style instead of only crianza/reserva.",
        avoid: "Do not make Rioja a flat category. White Rioja, Garnacha or village wines keep it from feeling automatic.",
        menuHooks: ["roasted lamb", "Iberian pork", "aged cheeses", "by-the-glass red"],
      },
      it: {
        byTheGlass: "Crianza o rosso giovane di produttore; reserva per bottiglia.",
        role: "Rioja e il rosso di fiducia della carta: riduce l'incertezza, ordina la Spagna e porta dal crianza al gran reserva.",
        floorCue: "Vendilo per stile e sottozona: Rioja Alta per eleganza, Alavesa per freschezza e Oriental per frutto piu caldo.",
        commercialLever: "Ancora la rotazione. Il margine cresce distinguendo produttore, vigna o stile, non solo crianza/reserva.",
        avoid: "Non rendere Rioja una categoria piatta. Bianco, Garnacha o vino di villaggio evitano l'effetto selezione automatica.",
        menuHooks: ["agnello arrosto", "maiale iberico", "formaggi stagionati", "rosso al calice"],
      },
      fr: {
        byTheGlass: "Crianza ou rouge jeune de producteur ; reserva pour la bouteille.",
        role: "Rioja est le rouge de confiance de la carte : il rassure, structure l'Espagne et fait monter du crianza au gran reserva.",
        floorCue: "Vendez par style et sous-zone : Rioja Alta pour l'elegance, Alavesa pour la fraicheur, Oriental pour le fruit plus solaire.",
        commercialLever: "Il ancre la rotation. La marge augmente quand la carte distingue producteur, vigne ou style plutot que seulement crianza/reserva.",
        avoid: "Ne pas aplatir Rioja. Blanc, Garnacha ou vin de village evitent l'impression de choix automatique.",
        menuHooks: ["agneau roti", "porc iberique", "fromages affines", "rouge au verre"],
      },
      de: {
        byTheGlass: "Crianza oder produzentenstarker junger Rotwein; Reserva eher als Flasche.",
        role: "Rioja ist der Vertrauensanker der Karte: weniger Auswahlfriktion, klare Spanien-Struktur und ein Weg von Crianza bis Gran Reserva.",
        floorCue: "Nach Stil und Subzone verkaufen: Rioja Alta fur Eleganz, Alavesa fur Frische, Oriental fur warmere Frucht.",
        commercialLever: "Rioja tragt Rotation. Mehr Marge entsteht, wenn Produzent, Lage oder Stil sichtbar sind und nicht nur Crianza/Reserva.",
        avoid: "Rioja nicht als flache Kategorie behandeln. Weisser Rioja, Garnacha oder Ortswein vermeiden Autopilot.",
        menuHooks: ["Lammbraten", "Iberico", "gereifter Kase", "Rotwein im Glas"],
      },
      pt: {
        byTheGlass: "Crianza ou tinto jovem de produtor; reserva para garrafa.",
        role: "Rioja e o tinto de confianca da carta: reduz friccao, organiza a secao espanhola e leva de crianza a gran reserva.",
        floorCue: "Venda por estilo e subzona: Rioja Alta para elegancia, Alavesa para frescura e Oriental para fruta mais quente.",
        commercialLever: "Ancora rotacao. A margem cresce quando a carta distingue produtor, vinha ou estilo, nao apenas crianza/reserva.",
        avoid: "Nao transformar Rioja numa categoria plana. Branco, Garnacha ou vinho de vila evitam escolha automatica.",
        menuHooks: ["borrego assado", "porco iberico", "queijos curados", "tinto a copo"],
      },
    }),
  },
  "ribera-del-duero": {
    slug: "ribera-del-duero",
    priority: 2,
    serviceTemp: "16-18 C",
    glass: "Burdeos amplia",
    texts: profileText({
      es: {
        byTheGlass: "Joven o roble con rotación alta; crianzas de productor para botella.",
        role: "Ribera del Duero cubre el deseo de tinto español potente, reconocible y moderno. Es el contrapunto natural de Rioja.",
        floorCue: "Conecta rápido con carne, fruta negra y estructura. Si hay altitud o pueblo, dilo porque justifica precio.",
        commercialLever: "Permite upsell por marca, pueblo y añada. En cartas de carnes sostiene ticket medio sin mucha explicación.",
        avoid: "No servirlo demasiado joven sin aire. Un Ribera cerrado puede parecer duro incluso cuando la calidad es alta.",
        menuHooks: ["lechazo", "chuletón", "morcilla", "queso de oveja"],
      },
      en: {
        byTheGlass: "Young or roble style for rotation; producer crianza for bottle sales.",
        role: "Ribera del Duero covers the demand for powerful, recognizable and modern Spanish red. It is Rioja's natural counterpoint.",
        floorCue: "Connect it to meat, black fruit and structure. If altitude or village matters, say it because it supports price.",
        commercialLever: "It upsells through brand, village and vintage. In meat-led restaurants it lifts spend with little explanation.",
        avoid: "Do not serve a closed young Ribera without air. It can feel hard even when quality is high.",
        menuHooks: ["roast lamb", "ribeye", "black pudding", "sheep cheese"],
      },
      it: {
        byTheGlass: "Joven o roble ad alta rotazione; crianza di produttore per bottiglia.",
        role: "Ribera del Duero copre il desiderio di rosso spagnolo potente, riconoscibile e moderno. E il contrappunto naturale di Rioja.",
        floorCue: "Collegalo subito a carne, frutto nero e struttura. Se ci sono altitudine o villaggio, dillo per sostenere il prezzo.",
        commercialLever: "Permette upsell per marca, villaggio e annata. Nelle carte di carne alza lo scontrino con poca spiegazione.",
        avoid: "Non servirlo giovane e chiuso senza aria. Puo sembrare duro anche quando la qualita e alta.",
        menuHooks: ["agnello arrosto", "costata", "sanguinaccio", "formaggio di pecora"],
      },
      fr: {
        byTheGlass: "Jeune ou roble en rotation ; crianza de producteur pour la bouteille.",
        role: "Ribera del Duero couvre l'envie d'un rouge espagnol puissant, moderne et reconnu. C'est le contrepoint naturel de Rioja.",
        floorCue: "Reliez-le a la viande, au fruit noir et a la structure. Altitude ou village doivent etre mentionnes.",
        commercialLever: "La montee en gamme vient par marque, village et millesime. En restaurant de viande, il augmente le ticket facilement.",
        avoid: "Ne pas servir un Ribera jeune et ferme sans air. Il peut paraitre dur malgre une forte qualite.",
        menuHooks: ["agneau roti", "entrecote", "boudin noir", "fromage de brebis"],
      },
      de: {
        byTheGlass: "Junger oder Roble-Stil fur Rotation; Produzenten-Crianza als Flasche.",
        role: "Ribera del Duero bedient den Wunsch nach kraftigem, erkennbarem und modernem spanischem Rotwein. Er ist der naturliche Gegenpol zu Rioja.",
        floorCue: "Mit Fleisch, dunkler Frucht und Struktur verbinden. Hohe oder Dorf fruh nennen, weil sie Preis rechtfertigen.",
        commercialLever: "Upsell uber Marke, Dorf und Jahrgang. In fleischbetonten Konzepten hebt er den Bon ohne viel Erklarung.",
        avoid: "Jungen, verschlossenen Ribera nicht ohne Luft servieren. Er kann hart wirken, auch wenn die Qualitat hoch ist.",
        menuHooks: ["Lammbraten", "Ribeye", "Blutwurst", "Schafskase"],
      },
      pt: {
        byTheGlass: "Jovem ou roble com alta rotacao; crianza de produtor para garrafa.",
        role: "Ribera del Duero cobre a procura por tinto espanhol potente, reconhecivel e moderno. E o contraponto natural de Rioja.",
        floorCue: "Ligue a carne, fruta negra e estrutura. Se houver altitude ou vila, diga cedo porque justifica preco.",
        commercialLever: "Permite upsell por marca, vila e colheita. Em cartas de carne sobe ticket com pouca explicacao.",
        avoid: "Nao servir demasiado jovem sem ar. Um Ribera fechado pode parecer duro mesmo com qualidade alta.",
        menuHooks: ["borrego assado", "entrecote", "morcela", "queijo de ovelha"],
      },
    }),
  },
  "rias-baixas": {
    slug: "rias-baixas",
    priority: 3,
    serviceTemp: "8-10 C",
    glass: "Blanco aromatico / universal",
    texts: profileText({
      es: {
        byTheGlass: "Albariño fresco de rotación alta; lías para botella gastronómica.",
        role: "Rías Baixas es el blanco de mar que el cliente reconoce. Da seguridad cuando pide un blanco bueno para pescado o marisco.",
        floorCue: "Habla de Atlántico, salinidad y Albariño. Val do Salnés o lías ayudan a diferenciar la recomendación.",
        commercialLever: "Es excelente por copa y permite subir ticket hacia productores de parcela o crianzas sobre lías.",
        avoid: "No servirlo helado ni como blanco genérico. Pierde aroma y valor percibido.",
        menuHooks: ["marisco", "ostras", "pescado blanco", "ceviche"],
      },
      en: {
        byTheGlass: "Fresh Albariño for fast rotation; lees-aged bottles for gastronomic use.",
        role: "Rias Baixas is the seafood white guests recognize. It gives confidence when they ask for a good white with fish or shellfish.",
        floorCue: "Talk Atlantic, salinity and Albariño. Val do Salnes or lees ageing help differentiate the recommendation.",
        commercialLever: "Excellent by the glass, with clear upsell into single-site producers or lees-aged styles.",
        avoid: "Do not serve it ice cold or as a generic white. Aroma and perceived value disappear.",
        menuHooks: ["shellfish", "oysters", "white fish", "ceviche"],
      },
      it: {
        byTheGlass: "Albariño fresco ad alta rotazione; lias per bottiglia gastronomica.",
        role: "Rias Baixas e il bianco di mare riconosciuto dal cliente. Da sicurezza con pesce e frutti di mare.",
        floorCue: "Parla di Atlantico, salinita e Albariño. Val do Salnes o affinamento sui lieviti differenziano la proposta.",
        commercialLever: "Ottimo al calice, con upsell verso produttori di parcella o stili sui lieviti.",
        avoid: "Non servirlo gelato o come bianco generico. Aroma e valore percepito spariscono.",
        menuHooks: ["frutti di mare", "ostriche", "pesce bianco", "ceviche"],
      },
      fr: {
        byTheGlass: "Albariño frais en rotation ; elevage sur lies pour bouteille gastronomique.",
        role: "Rias Baixas est le blanc de mer que le client reconnait. Il rassure avec poisson et fruits de mer.",
        floorCue: "Parlez Atlantique, salinite et Albariño. Val do Salnes ou lies differencient la recommandation.",
        commercialLever: "Excellent au verre, avec montee en gamme vers producteurs de parcelle ou styles sur lies.",
        avoid: "Ne pas servir glace ni comme blanc generique. Les aromes et la valeur percue disparaissent.",
        menuHooks: ["fruits de mer", "huitres", "poisson blanc", "ceviche"],
      },
      de: {
        byTheGlass: "Frischer Albarino fur Rotation; Hefelager-Stile als gastronomische Flasche.",
        role: "Rias Baixas ist der erkennbare Weisswein zum Meer. Er gibt Sicherheit bei Fisch und Meeresfruchten.",
        floorCue: "Atlantik, Salinitat und Albarino nennen. Val do Salnes oder Hefelager differenzieren die Empfehlung.",
        commercialLever: "Sehr stark im Glasverkauf, mit Upsell zu Einzellagen oder Stilen auf der Hefe.",
        avoid: "Nicht eiskalt oder als generischen Weisswein servieren. Aroma und Wert gehen verloren.",
        menuHooks: ["Meeresfruchte", "Austern", "weisser Fisch", "Ceviche"],
      },
      pt: {
        byTheGlass: "Alvarinho fresco de alta rotacao; lias para garrafa gastronomica.",
        role: "Rias Baixas e o branco de mar que o cliente reconhece. Da confianca com peixe e marisco.",
        floorCue: "Fale de Atlantico, salinidade e Alvarinho. Val do Salnes ou lias ajudam a diferenciar.",
        commercialLever: "Excelente a copo, com upsell para produtores de parcela ou estilos sobre lias.",
        avoid: "Nao servir gelado nem como branco generico. Perde aroma e valor percebido.",
        menuHooks: ["marisco", "ostras", "peixe branco", "ceviche"],
      },
    }),
  },
  rueda: {
    slug: "rueda",
    priority: 4,
    serviceTemp: "7-9 C",
    glass: "Blanco joven / universal",
    texts: profileText({
      es: {
        byTheGlass: "Verdejo joven para copa; viñedo viejo o lías para botella.",
        role: "Rueda cubre el blanco fácil, fresco y reconocible. Es una puerta de entrada útil para cartas con alta rotación.",
        floorCue: "Véndelo como Verdejo fresco, cítrico y directo, pero añade productor o viñedo para evitar commodity.",
        commercialLever: "Aporta velocidad por copa y margen estable. Las versiones de viñedo viejo permiten un escalón premium accesible.",
        avoid: "No competir solo por precio. Si todo Rueda parece igual, la carta pierde criterio.",
        menuHooks: ["tapas", "ensaladas", "pescado blanco", "arroces ligeros"],
      },
      en: {
        byTheGlass: "Young Verdejo by the glass; old-vine or lees styles for bottle.",
        role: "Rueda covers the easy, fresh and recognizable white slot. It is a useful entry point for high-rotation lists.",
        floorCue: "Sell it as fresh, citrus-driven Verdejo, then add producer or vineyard to avoid commodity perception.",
        commercialLever: "It gives by-the-glass speed and stable margin. Old-vine styles create an accessible premium step.",
        avoid: "Do not compete only on price. If every Rueda feels identical, the list loses expertise.",
        menuHooks: ["tapas", "salads", "white fish", "light rice dishes"],
      },
      it: {
        byTheGlass: "Verdejo giovane al calice; vigne vecchie o lias per bottiglia.",
        role: "Rueda copre il bianco facile, fresco e riconoscibile. E una porta d'ingresso per carte ad alta rotazione.",
        floorCue: "Vendilo come Verdejo fresco, agrumato e diretto, poi aggiungi produttore o vigna.",
        commercialLever: "Da velocita al calice e margine stabile. Le vigne vecchie creano uno scalino premium accessibile.",
        avoid: "Non competere solo sul prezzo. Se ogni Rueda sembra uguale, la carta perde criterio.",
        menuHooks: ["tapas", "insalate", "pesce bianco", "risotti leggeri"],
      },
      fr: {
        byTheGlass: "Verdejo jeune au verre ; vieilles vignes ou lies pour la bouteille.",
        role: "Rueda couvre le blanc facile, frais et reconnu. C'est une entree utile pour les cartes a forte rotation.",
        floorCue: "Vendez-le comme Verdejo frais, agrume et direct, puis ajoutez producteur ou vigne.",
        commercialLever: "Vitesse au verre et marge stable. Les vieilles vignes creent un palier premium accessible.",
        avoid: "Ne pas jouer seulement le prix. Si tous les Rueda se ressemblent, la carte perd son critere.",
        menuHooks: ["tapas", "salades", "poisson blanc", "riz leger"],
      },
      de: {
        byTheGlass: "Junger Verdejo im Glas; alte Reben oder Hefelager als Flasche.",
        role: "Rueda besetzt den einfachen, frischen und erkennbaren Weissweinplatz. Gut fur Karten mit hoher Rotation.",
        floorCue: "Als frischen, zitrischen Verdejo verkaufen, dann Produzent oder Weinberg nennen.",
        commercialLever: "Bringt Geschwindigkeit im Glasverkauf und stabile Marge. Alte Reben schaffen eine bezahlbare Premiumstufe.",
        avoid: "Nicht nur uber Preis konkurrieren. Wenn jeder Rueda gleich wirkt, verliert die Karte Kompetenz.",
        menuHooks: ["Tapas", "Salate", "weisser Fisch", "leichte Reisgerichte"],
      },
      pt: {
        byTheGlass: "Verdejo jovem a copo; vinha velha ou lias para garrafa.",
        role: "Rueda cobre o branco facil, fresco e reconhecivel. E entrada util para cartas de alta rotacao.",
        floorCue: "Venda como Verdejo fresco, citrico e direto, depois acrescente produtor ou vinha.",
        commercialLever: "Da velocidade a copo e margem estavel. Vinha velha cria degrau premium acessivel.",
        avoid: "Nao competir apenas por preco. Se todo Rueda parece igual, a carta perde criterio.",
        menuHooks: ["tapas", "saladas", "peixe branco", "arrozes leves"],
      },
    }),
  },
  priorat: {
    slug: "priorat",
    priority: 5,
    serviceTemp: "16-18 C",
    glass: "Burdeos amplia / Syrah",
    texts: profileText({
      es: {
        byTheGlass: "Raro por copa; mejor como botella premium o recomendación de mesa.",
        role: "Priorat comunica ambición y criterio. Es la región española para clientes que buscan intensidad, mineralidad y prestigio.",
        floorCue: "Explica llicorella, viña vieja y Garnacha/Cariñena. Es una venta de terroir, no solo de potencia.",
        commercialLever: "Eleva percepción de carta y permite margen alto si se cuenta bien el origen y el productor.",
        avoid: "No servir demasiado caliente ni joven sin aire: la concentración puede volverse pesada.",
        menuHooks: ["caza", "carnes a la brasa", "guisos de montaña", "quesos curados"],
      },
      en: {
        byTheGlass: "Rare by the glass; best as a premium bottle or table recommendation.",
        role: "Priorat signals ambition and expertise. It is the Spanish region for guests seeking intensity, minerality and prestige.",
        floorCue: "Explain llicorella, old vines and Garnacha/Cariñena. This is terroir selling, not only power.",
        commercialLever: "It lifts list perception and supports high margin when origin and producer are clearly told.",
        avoid: "Do not serve too warm or too young without air: concentration can become heavy.",
        menuHooks: ["game", "grilled meats", "mountain stews", "aged cheeses"],
      },
      it: {
        byTheGlass: "Raro al calice; meglio come bottiglia premium o raccomandazione al tavolo.",
        role: "Priorat comunica ambizione e competenza. E la regione spagnola per intensita, mineralita e prestigio.",
        floorCue: "Spiega llicorella, vigne vecchie e Garnacha/Cariñena. E vendita di terroir, non solo potenza.",
        commercialLever: "Alza la percezione della carta e sostiene margine alto se origine e produttore sono raccontati bene.",
        avoid: "Non servire troppo caldo o giovane senza aria: la concentrazione diventa pesante.",
        menuHooks: ["selvaggina", "carni alla griglia", "stufati di montagna", "formaggi stagionati"],
      },
      fr: {
        byTheGlass: "Rare au verre ; plutot bouteille premium ou recommandation de table.",
        role: "Priorat communique ambition et expertise. C'est l'Espagne de l'intensite, de la mineralite et du prestige.",
        floorCue: "Expliquez llicorella, vieilles vignes et Garnacha/Cariñena. C'est une vente de terroir, pas seulement de puissance.",
        commercialLever: "Il eleve la perception de la carte et soutient une forte marge si origine et producteur sont clairs.",
        avoid: "Ne pas servir trop chaud ni trop jeune sans air : la concentration devient lourde.",
        menuHooks: ["gibier", "viandes grillees", "plats mijotes de montagne", "fromages affines"],
      },
      de: {
        byTheGlass: "Selten im Glas; besser als Premiumflasche oder gezielte Tischempfehlung.",
        role: "Priorat signalisiert Anspruch und Kompetenz. Die spanische Region fur Intensitat, Mineralitat und Prestige.",
        floorCue: "Llicorella, alte Reben und Garnacha/Carinena erklaren. Das ist Terroir-Verkauf, nicht nur Kraft.",
        commercialLever: "Hebt die Wahrnehmung der Karte und tragt hohe Marge, wenn Herkunft und Produzent klar erzahlt werden.",
        avoid: "Nicht zu warm oder zu jung ohne Luft servieren: Konzentration kann schwer wirken.",
        menuHooks: ["Wild", "Grillfleisch", "Bergschmorgerichte", "gereifter Kase"],
      },
      pt: {
        byTheGlass: "Raro a copo; melhor como garrafa premium ou recomendacao de mesa.",
        role: "Priorat comunica ambicao e criterio. E a regiao espanhola para intensidade, mineralidade e prestigio.",
        floorCue: "Explique llicorella, vinha velha e Garnacha/Carinena. E venda de terroir, nao so potencia.",
        commercialLever: "Eleva percecao da carta e permite margem alta quando origem e produtor sao bem contados.",
        avoid: "Nao servir demasiado quente nem jovem sem ar: a concentracao pode ficar pesada.",
        menuHooks: ["caca", "carnes grelhadas", "guisados de montanha", "queijos curados"],
      },
    }),
  },
  bourgogne: {
    slug: "bourgogne",
    priority: 6,
    serviceTemp: "12-15 C tintos / 9-12 C blancos",
    glass: "Borgona amplia",
    texts: profileText({
      es: {
        byTheGlass: "Chablis o Bourgogne regional; premiers crus para botella premium.",
        role: "Borgoña es la señal máxima de terroir y finura. Eleva la carta incluso con referencias regionales bien elegidas.",
        floorCue: "Vende por productor, village y clasificación. El cliente compra precisión, no solo Pinot Noir o Chardonnay.",
        commercialLever: "Permite margen alto por escasez y reputación, pero exige una explicación simple del nivel regional/village/cru.",
        avoid: "No llenar la sección solo con etiquetas caras. Chablis, Mâcon o Bourgogne regional abren la puerta.",
        menuHooks: ["pollo de Bresse", "setas", "pescados nobles", "quesos afinados"],
      },
      en: {
        byTheGlass: "Chablis or regional Bourgogne; premier cru bottles for premium spend.",
        role: "Bourgogne is the ultimate signal of terroir and finesse. It lifts the list even through well-chosen regional wines.",
        floorCue: "Sell by producer, village and classification. Guests buy precision, not just Pinot Noir or Chardonnay.",
        commercialLever: "High margin is possible through scarcity and reputation, but the regional/village/cru ladder must be simple.",
        avoid: "Do not fill the section only with expensive labels. Chablis, Macon or regional Bourgogne open the door.",
        menuHooks: ["Bresse chicken", "mushrooms", "noble fish", "aged cheeses"],
      },
      it: {
        byTheGlass: "Chablis o Bourgogne regionale; premier cru per bottiglia premium.",
        role: "Bourgogne e il segnale massimo di terroir e finezza. Alza la carta anche con referenze regionali scelte bene.",
        floorCue: "Vendi per produttore, village e classificazione. Il cliente compra precisione, non solo Pinot Noir o Chardonnay.",
        commercialLever: "Margine alto grazie a scarsita e reputazione, ma la scala regionale/village/cru deve essere semplice.",
        avoid: "Non riempire la sezione solo di etichette costose. Chablis, Macon o Bourgogne regionale aprono la porta.",
        menuHooks: ["pollo di Bresse", "funghi", "pesci nobili", "formaggi affinati"],
      },
      fr: {
        byTheGlass: "Chablis ou Bourgogne regional ; premiers crus pour la bouteille premium.",
        role: "La Bourgogne est le signal ultime de terroir et de finesse. Elle eleve la carte meme avec de bons regionaux.",
        floorCue: "Vendez par producteur, village et classement. Le client achete la precision, pas seulement Pinot Noir ou Chardonnay.",
        commercialLever: "Marge elevee par rarete et reputation, mais l'echelle regional/village/cru doit rester simple.",
        avoid: "Ne pas remplir la section seulement avec des etiquettes cheres. Chablis, Macon ou Bourgogne regional ouvrent la porte.",
        menuHooks: ["poulet de Bresse", "champignons", "poissons nobles", "fromages affines"],
      },
      de: {
        byTheGlass: "Chablis oder regionaler Bourgogne; Premier Cru als Premiumflasche.",
        role: "Bourgogne ist das starkste Signal fur Terroir und Finesse. Schon gute regionale Weine heben die Karte.",
        floorCue: "Nach Produzent, Village und Klassifikation verkaufen. Gaste kaufen Prazision, nicht nur Pinot Noir oder Chardonnay.",
        commercialLever: "Hohe Marge uber Knappheit und Reputation, aber die Leiter regional/village/cru muss einfach bleiben.",
        avoid: "Die Sektion nicht nur mit teuren Etiketten fullen. Chablis, Macon oder regionaler Bourgogne offnen die Tur.",
        menuHooks: ["Bresse-Huhn", "Pilze", "edle Fische", "gereifter Kase"],
      },
      pt: {
        byTheGlass: "Chablis ou Bourgogne regional; premier cru para garrafa premium.",
        role: "Bourgogne e o sinal maximo de terroir e finura. Eleva a carta mesmo com regionais bem escolhidos.",
        floorCue: "Venda por produtor, village e classificacao. O cliente compra precisao, nao apenas Pinot Noir ou Chardonnay.",
        commercialLever: "Margem alta por escassez e reputacao, mas a escada regional/village/cru tem de ser simples.",
        avoid: "Nao encher a secao so com rotulos caros. Chablis, Macon ou Bourgogne regional abrem a porta.",
        menuHooks: ["frango de Bresse", "cogumelos", "peixes nobres", "queijos afinados"],
      },
    }),
  },
  bordeaux: {
    slug: "bordeaux",
    priority: 7,
    serviceTemp: "16-18 C",
    glass: "Burdeos amplia",
    texts: profileText({
      es: {
        byTheGlass: "Bordeaux Superieur o Cotes; crus y chateaux para botella.",
        role: "Burdeos comunica prestigio internacional y seriedad. Es una referencia que muchos clientes entienden antes de leer la añada.",
        floorCue: "Diferencia margen izquierda y derecha: Cabernet estructurado frente a Merlot más redondo.",
        commercialLever: "Permite escalera clara de precio desde Cotes hasta cru classé. La clasificación ayuda a defender ticket.",
        avoid: "No asumir que Burdeos solo es caro. Las Cotes y satelites de Saint-Emilion dan valor real.",
        menuHooks: ["entrecot", "cordero", "pato", "quesos semicurados"],
      },
      en: {
        byTheGlass: "Bordeaux Superieur or Cotes; crus and chateaux for bottle sales.",
        role: "Bordeaux signals international prestige and seriousness. Many guests understand it before reading the vintage.",
        floorCue: "Separate left and right bank: structured Cabernet versus rounder Merlot.",
        commercialLever: "It creates a clear price ladder from Cotes to cru classe. Classification helps defend spend.",
        avoid: "Do not assume Bordeaux only means expensive. Cotes and Saint-Emilion satellites deliver real value.",
        menuHooks: ["entrecote", "lamb", "duck", "semi-aged cheeses"],
      },
      it: {
        byTheGlass: "Bordeaux Superieur o Cotes; crus e chateaux per bottiglia.",
        role: "Bordeaux comunica prestigio internazionale e serieta. Molti clienti lo capiscono prima dell'annata.",
        floorCue: "Distingui riva sinistra e destra: Cabernet strutturato contro Merlot piu rotondo.",
        commercialLever: "Crea una scala di prezzo chiara da Cotes a cru classe. La classificazione difende lo scontrino.",
        avoid: "Non pensare che Bordeaux sia solo caro. Cotes e satelliti di Saint-Emilion danno valore reale.",
        menuHooks: ["entrecote", "agnello", "anatra", "formaggi semistagionati"],
      },
      fr: {
        byTheGlass: "Bordeaux Superieur ou Cotes ; crus et chateaux pour la bouteille.",
        role: "Bordeaux communique prestige international et serieux. Beaucoup de clients le comprennent avant le millesime.",
        floorCue: "Distinguez rive gauche et rive droite : Cabernet structure face a Merlot plus rond.",
        commercialLever: "Cree une echelle de prix claire des Cotes au cru classe. Le classement defend le ticket.",
        avoid: "Ne pas croire que Bordeaux est seulement cher. Les Cotes et satellites de Saint-Emilion offrent de la valeur.",
        menuHooks: ["entrecote", "agneau", "canard", "fromages demi-affines"],
      },
      de: {
        byTheGlass: "Bordeaux Superieur oder Cotes; Crus und Chateaux als Flasche.",
        role: "Bordeaux signalisiert internationales Prestige und Seriositat. Viele Gaste verstehen ihn vor dem Jahrgang.",
        floorCue: "Linkes und rechtes Ufer trennen: strukturierter Cabernet gegen runderen Merlot.",
        commercialLever: "Klare Preisleiter von Cotes bis Cru Classe. Klassifikation hilft, den Bon zu verteidigen.",
        avoid: "Bordeaux nicht nur als teuer betrachten. Cotes und Satelliten von Saint-Emilion liefern echten Wert.",
        menuHooks: ["Entrecote", "Lamm", "Ente", "halbfester Kase"],
      },
      pt: {
        byTheGlass: "Bordeaux Superieur ou Cotes; crus e chateaux para garrafa.",
        role: "Bordeaux comunica prestigio internacional e seriedade. Muitos clientes entendem antes da colheita.",
        floorCue: "Separe margem esquerda e direita: Cabernet estruturado versus Merlot mais redondo.",
        commercialLever: "Cria escada de preco clara de Cotes a cru classe. A classificacao ajuda a defender ticket.",
        avoid: "Nao assumir que Bordeaux e apenas caro. Cotes e satelites de Saint-Emilion dao valor real.",
        menuHooks: ["entrecote", "borrego", "pato", "queijos meio curados"],
      },
    }),
  },
  champagne: {
    slug: "champagne",
    priority: 8,
    serviceTemp: "8-10 C",
    glass: "Copa de vino blanco / tulipa",
    texts: profileText({
      es: {
        byTheGlass: "Brut non vintage o grower; vintage y prestige para botella.",
        role: "Champagne es celebración, aperitivo y maridaje premium a la vez. Ningún otro espumoso comunica lo mismo.",
        floorCue: "Vende por ocasión, estilo y productor: Blanc de Blancs para precisión, Rosé para mesa gastronómica.",
        commercialLever: "Por copa eleva ticket de inicio; por botella sostiene celebraciones, upsell y menús degustación.",
        avoid: "No servirlo en flauta estrecha ni demasiado frío. Pierde aroma y parece solo brindis.",
        menuHooks: ["ostras", "caviar", "jamón ibérico", "quesos", "aperitivo premium"],
      },
      en: {
        byTheGlass: "Brut non-vintage or grower; vintage and prestige cuvees for bottle sales.",
        role: "Champagne is celebration, aperitif and premium pairing at once. No other sparkling wine communicates the same thing.",
        floorCue: "Sell by occasion, style and producer: Blanc de Blancs for precision, Rose for gastronomic tables.",
        commercialLever: "By the glass it lifts the opening spend; by bottle it supports celebrations, upsell and tasting menus.",
        avoid: "Do not serve in a narrow flute or too cold. It loses aroma and becomes only a toast.",
        menuHooks: ["oysters", "caviar", "Iberian ham", "cheeses", "premium aperitif"],
      },
      it: {
        byTheGlass: "Brut non vintage o grower; vintage e prestige per bottiglia.",
        role: "Champagne e celebrazione, aperitivo e abbinamento premium insieme. Nessun altro spumante comunica lo stesso.",
        floorCue: "Vendi per occasione, stile e produttore: Blanc de Blancs per precisione, Rose per tavoli gastronomici.",
        commercialLever: "Al calice alza lo scontrino iniziale; in bottiglia sostiene celebrazioni, upsell e degustazioni.",
        avoid: "Non servirlo in flute stretto o troppo freddo. Perde aromi e diventa solo brindisi.",
        menuHooks: ["ostriche", "caviale", "prosciutto iberico", "formaggi", "aperitivo premium"],
      },
      fr: {
        byTheGlass: "Brut sans annee ou vigneron ; millesime et cuvee prestige pour la bouteille.",
        role: "Champagne est a la fois celebration, aperitif et accord premium. Aucun autre effervescent ne dit la meme chose.",
        floorCue: "Vendez par occasion, style et producteur : Blanc de Blancs pour la precision, Rose pour la table gastronomique.",
        commercialLever: "Au verre, il augmente le ticket d'entree ; en bouteille, il soutient celebration, upsell et menus degustation.",
        avoid: "Ne pas servir en flute etroite ni trop froid. Il perd ses aromes et devient seulement un toast.",
        menuHooks: ["huitres", "caviar", "jambon iberique", "fromages", "aperitif premium"],
      },
      de: {
        byTheGlass: "Brut non-vintage oder Grower; Vintage und Prestige als Flasche.",
        role: "Champagne ist Feier, Aperitif und Premium-Pairing zugleich. Kein anderer Schaumwein sendet dasselbe Signal.",
        floorCue: "Nach Anlass, Stil und Produzent verkaufen: Blanc de Blancs fur Prazision, Rose fur gastronomische Tische.",
        commercialLever: "Im Glas hebt er den Startbon; als Flasche tragt er Feiern, Upsell und Degustationsmenus.",
        avoid: "Nicht in enger Flote oder zu kalt servieren. Er verliert Aroma und wirkt nur wie ein Toast.",
        menuHooks: ["Austern", "Kaviar", "Iberico-Schinken", "Kase", "Premium-Aperitif"],
      },
      pt: {
        byTheGlass: "Brut non vintage ou grower; vintage e prestige para garrafa.",
        role: "Champagne e celebracao, aperitivo e harmonizacao premium ao mesmo tempo. Nenhum espumante comunica igual.",
        floorCue: "Venda por ocasiao, estilo e produtor: Blanc de Blancs para precisao, Rose para mesa gastronomica.",
        commercialLever: "A copo sobe o ticket inicial; em garrafa sustenta celebracoes, upsell e menus de degustacao.",
        avoid: "Nao servir em flute estreita nem demasiado frio. Perde aroma e vira apenas brinde.",
        menuHooks: ["ostras", "caviar", "presunto iberico", "queijos", "aperitivo premium"],
      },
    }),
  },
  douro: {
    slug: "douro",
    priority: 9,
    serviceTemp: "16-18 C tintos / 10-12 C Porto Tawny",
    glass: "Burdeos amplia / copa generoso",
    texts: profileText({
      es: {
        byTheGlass: "Tinto DOC con rotación; Porto Tawny o LBV para sobremesa.",
        role: "Douro aporta descubrimiento con autoridad. Sus tintos secos dan valor premium y el Porto cubre sobremesa única.",
        floorCue: "Distingue siempre Douro seco y Porto. Touriga Nacional ayuda a explicar estructura, violeta y origen portugués.",
        commercialLever: "Gran oportunidad de margen: calidad alta, reconocimiento en crecimiento y precios aún defendibles.",
        avoid: "No mezclar DOC Douro y Porto como si fueran lo mismo. Confunde al cliente y reduce la venta.",
        menuHooks: ["caza", "carnes guisadas", "bacalao", "Stilton", "chocolate"],
      },
      en: {
        byTheGlass: "DOC Douro red for rotation; Tawny or LBV Port for after-dinner service.",
        role: "Douro brings discovery with authority. Dry reds deliver premium value and Port covers a unique after-dinner role.",
        floorCue: "Always separate dry Douro from Port. Touriga Nacional explains structure, violet and Portuguese origin.",
        commercialLever: "Strong margin opportunity: high quality, growing recognition and still defendable pricing.",
        avoid: "Do not present DOC Douro and Port as the same thing. It confuses guests and weakens sales.",
        menuHooks: ["game", "braised meats", "salt cod", "Stilton", "chocolate"],
      },
      it: {
        byTheGlass: "Rosso DOC Douro in rotazione; Porto Tawny o LBV per fine pasto.",
        role: "Douro porta scoperta con autorevolezza. I rossi secchi danno valore premium e il Porto copre il dopo cena.",
        floorCue: "Distingui sempre Douro secco e Porto. Touriga Nacional spiega struttura, violetta e origine portoghese.",
        commercialLever: "Grande opportunita di margine: alta qualita, riconoscimento in crescita e prezzi difendibili.",
        avoid: "Non presentare DOC Douro e Porto come la stessa cosa. Confondono il cliente e riducono la vendita.",
        menuHooks: ["selvaggina", "carni brasate", "baccala", "Stilton", "cioccolato"],
      },
      fr: {
        byTheGlass: "Rouge DOC Douro en rotation ; Porto Tawny ou LBV pour la fin de repas.",
        role: "Douro apporte decouverte et autorite. Les rouges secs donnent une valeur premium et le Porto couvre l'apres-repas.",
        floorCue: "Separez toujours Douro sec et Porto. Touriga Nacional explique structure, violette et origine portugaise.",
        commercialLever: "Forte opportunite de marge : qualite elevee, reconnaissance croissante et prix encore defendables.",
        avoid: "Ne pas presenter DOC Douro et Porto comme identiques. Cela confond le client et affaiblit la vente.",
        menuHooks: ["gibier", "viandes braisees", "morue", "Stilton", "chocolat"],
      },
      de: {
        byTheGlass: "DOC Douro Rotwein fur Rotation; Tawny oder LBV Port zum Abschluss.",
        role: "Douro bringt Entdeckung mit Autoritat. Trockene Rotweine liefern Premiumwert, Port deckt den Abschluss ab.",
        floorCue: "Trockenen Douro und Port immer trennen. Touriga Nacional erklart Struktur, Veilchen und portugiesische Herkunft.",
        commercialLever: "Starke Margenchance: hohe Qualitat, wachsende Bekanntheit und noch gut verteidigbare Preise.",
        avoid: "DOC Douro und Port nicht gleichsetzen. Das verwirrt Gaste und schwacht den Verkauf.",
        menuHooks: ["Wild", "geschmortes Fleisch", "Bacalhau", "Stilton", "Schokolade"],
      },
      pt: {
        byTheGlass: "Tinto DOC Douro com rotacao; Porto Tawny ou LBV para sobremesa.",
        role: "Douro traz descoberta com autoridade. Tintos secos dao valor premium e Porto cobre a sobremesa.",
        floorCue: "Separe sempre Douro seco e Porto. Touriga Nacional explica estrutura, violeta e origem portuguesa.",
        commercialLever: "Grande oportunidade de margem: qualidade alta, reconhecimento crescente e precos ainda defensaveis.",
        avoid: "Nao apresentar DOC Douro e Porto como a mesma coisa. Confunde o cliente e reduz venda.",
        menuHooks: ["caca", "carnes estufadas", "bacalhau", "Stilton", "chocolate"],
      },
    }),
  },
  "vinho-verde": {
    slug: "vinho-verde",
    priority: 10,
    serviceTemp: "7-9 C",
    glass: "Blanco joven / universal",
    texts: profileText({
      es: {
        byTheGlass: "Loureiro o Alvarinho fresco; monovarietales serios para botella.",
        role: "Vinho Verde aporta frescura portuguesa, bajo peso y mucha bebibilidad. Es perfecto para copa, aperitivo y terraza.",
        floorCue: "Explica que verde significa joven y fresco, no color. Alvarinho y Loureiro dan dos lecturas claras.",
        commercialLever: "Gran rotación por copa en clima cálido. Los Alvarinho serios permiten subir ticket sin perder frescura.",
        avoid: "No tratarlo como vino simple con gas. Las mejores referencias tienen acidez, salinidad y origen.",
        menuHooks: ["marisco", "sardinas", "bacalao", "queso fresco", "aperitivo"],
      },
      en: {
        byTheGlass: "Fresh Loureiro or Alvarinho; serious single-varietal bottles for upsell.",
        role: "Vinho Verde brings Portuguese freshness, low weight and high drinkability. It is ideal by the glass, aperitif and terrace.",
        floorCue: "Explain that verde means young and fresh, not the colour. Alvarinho and Loureiro give two clear readings.",
        commercialLever: "Excellent warm-weather by-the-glass rotation. Serious Alvarinho lifts spend without losing freshness.",
        avoid: "Do not treat it as simple fizzy wine. The best references have acidity, salinity and origin.",
        menuHooks: ["shellfish", "sardines", "salt cod", "fresh cheese", "aperitif"],
      },
      it: {
        byTheGlass: "Loureiro o Alvarinho fresco; monovitigno seri per bottiglia.",
        role: "Vinho Verde porta freschezza portoghese, leggerezza e grande bevibilita. Perfetto al calice, aperitivo e terrazza.",
        floorCue: "Spiega che verde significa giovane e fresco, non colore. Alvarinho e Loureiro danno due letture chiare.",
        commercialLever: "Grande rotazione al calice con caldo. Gli Alvarinho seri alzano lo scontrino senza perdere freschezza.",
        avoid: "Non trattarlo come semplice vino frizzante. I migliori hanno acidita, salinita e origine.",
        menuHooks: ["frutti di mare", "sardine", "baccala", "formaggio fresco", "aperitivo"],
      },
      fr: {
        byTheGlass: "Loureiro ou Alvarinho frais ; monocépages serieux pour la bouteille.",
        role: "Vinho Verde apporte fraicheur portugaise, legerete et grande buvabilite. Ideal au verre, a l'aperitif et en terrasse.",
        floorCue: "Expliquez que verde signifie jeune et frais, pas la couleur. Alvarinho et Loureiro donnent deux lectures claires.",
        commercialLever: "Tres forte rotation au verre par temps chaud. Les Alvarinho serieux augmentent le ticket sans perdre la fraicheur.",
        avoid: "Ne pas le traiter comme simple vin perlant. Les meilleurs ont acidite, salinite et origine.",
        menuHooks: ["fruits de mer", "sardines", "morue", "fromage frais", "aperitif"],
      },
      de: {
        byTheGlass: "Frischer Loureiro oder Alvarinho; seriose Rebsortenweine als Flasche.",
        role: "Vinho Verde bringt portugiesische Frische, Leichtigkeit und hohe Trinkigkeit. Ideal im Glas, als Aperitif und auf der Terrasse.",
        floorCue: "Erklaren, dass verde jung und frisch bedeutet, nicht die Farbe. Alvarinho und Loureiro geben zwei klare Lesarten.",
        commercialLever: "Sehr starke Glasrotation bei warmem Wetter. Serioser Alvarinho hebt den Bon, ohne Frische zu verlieren.",
        avoid: "Nicht als einfachen Perlwein behandeln. Gute Referenzen haben Saure, Salinitat und Herkunft.",
        menuHooks: ["Meeresfruchte", "Sardinen", "Bacalhau", "Frischkase", "Aperitif"],
      },
      pt: {
        byTheGlass: "Loureiro ou Alvarinho fresco; monovarietais serios para garrafa.",
        role: "Vinho Verde traz frescura portuguesa, leveza e muita bebibilidade. Perfeito a copo, aperitivo e esplanada.",
        floorCue: "Explique que verde significa jovem e fresco, nao cor. Alvarinho e Loureiro dao duas leituras claras.",
        commercialLever: "Grande rotacao a copo em tempo quente. Alvarinho serio sobe ticket sem perder frescura.",
        avoid: "Nao tratar como vinho simples com gas. As melhores referencias tem acidez, salinidade e origem.",
        menuHooks: ["marisco", "sardinhas", "bacalhau", "queijo fresco", "aperitivo"],
      },
    }),
  },
};

const langFallback = (lang: string): WineLibraryRegionEditorialLang =>
  ["es", "en", "it", "fr", "de", "pt"].includes(lang) ? (lang as WineLibraryRegionEditorialLang) : "en";

const regionEditorialCopy: Record<WineLibraryRegionEditorialLang, {
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
    eyebrow: "Inteligencia regional",
    title: (name) => `Cómo usar ${name} en una carta de vinos`,
    subtitle: "Lectura práctica para compra, sala, servicio y maridaje.",
    labels: { serviceTemp: "Servicio", glass: "Copa", byTheGlass: "Por copa", role: "Rol en carta", floorCue: "Guion de sala", commercialLever: "Palanca comercial", avoid: "Error a evitar", menu: "Maridajes útiles" },
    faqService: (name, temp) => ({ q: `¿A qué temperatura servir vinos de ${name}?`, a: `Como punto de partida, ${name} funciona bien a ${temp}. Ajusta según color, crianza y estructura de cada referencia.` }),
    faqList: (name, byTheGlass) => ({ q: `¿Cómo incluir ${name} en una carta de restaurante?`, a: `Incluye una referencia de lectura rápida y otra de mayor profundidad. Para copa: ${byTheGlass}` }),
  },
  en: {
    eyebrow: "Regional intelligence",
    title: (name) => `How to use ${name} on a wine list`,
    subtitle: "Practical reading for buying, service, floor team and pairings.",
    labels: { serviceTemp: "Service", glass: "Glass", byTheGlass: "By the glass", role: "Role on the list", floorCue: "Floor cue", commercialLever: "Commercial lever", avoid: "Mistake to avoid", menu: "Useful pairings" },
    faqService: (name, temp) => ({ q: `What temperature works for wines from ${name}?`, a: `As a starting point, ${name} works well at ${temp}. Adjust by colour, ageing and structure.` }),
    faqList: (name, byTheGlass) => ({ q: `How should a restaurant include ${name}?`, a: `Include one fast-reading reference and one deeper bottle. By the glass: ${byTheGlass}` }),
  },
  it: {
    eyebrow: "Intelligenza regionale",
    title: (name) => `Come usare ${name} in carta`,
    subtitle: "Lettura pratica per acquisto, servizio, sala e abbinamenti.",
    labels: { serviceTemp: "Servizio", glass: "Calice", byTheGlass: "Al calice", role: "Ruolo in carta", floorCue: "Indicazione di sala", commercialLever: "Leva commerciale", avoid: "Errore da evitare", menu: "Abbinamenti utili" },
    faqService: (name, temp) => ({ q: `A che temperatura servire i vini di ${name}?`, a: `Come punto di partenza, ${name} funziona bene a ${temp}. Regola in base a colore, affinamento e struttura.` }),
    faqList: (name, byTheGlass) => ({ q: `Come includere ${name} in una carta ristorante?`, a: `Inserisci una referenza di lettura rapida e una bottiglia piu profonda. Al calice: ${byTheGlass}` }),
  },
  fr: {
    eyebrow: "Intelligence regionale",
    title: (name) => `Comment utiliser ${name} en carte`,
    subtitle: "Lecture pratique pour achat, service, salle et accords.",
    labels: { serviceTemp: "Service", glass: "Verre", byTheGlass: "Au verre", role: "Role en carte", floorCue: "Argument de salle", commercialLever: "Levier commercial", avoid: "Erreur a eviter", menu: "Accords utiles" },
    faqService: (name, temp) => ({ q: `A quelle temperature servir les vins de ${name} ?`, a: `Comme point de depart, ${name} fonctionne bien a ${temp}. Ajustez selon couleur, elevage et structure.` }),
    faqList: (name, byTheGlass) => ({ q: `Comment inclure ${name} dans une carte de restaurant ?`, a: `Ajoutez une reference lisible rapidement et une bouteille plus profonde. Au verre : ${byTheGlass}` }),
  },
  de: {
    eyebrow: "Regionale Service-Intelligenz",
    title: (name) => `Wie ${name} auf der Weinkarte funktioniert`,
    subtitle: "Praktische Lesart fur Einkauf, Service, Team und Pairings.",
    labels: { serviceTemp: "Service", glass: "Glas", byTheGlass: "Im Glas", role: "Rolle auf der Weinkarte", floorCue: "Service-Argument", commercialLever: "Kommerzieller Hebel", avoid: "Fehler vermeiden", menu: "Nutzliche Pairings" },
    faqService: (name, temp) => ({ q: `Bei welcher Temperatur Weine aus ${name} servieren?`, a: `Als Ausgangspunkt funktioniert ${name} gut bei ${temp}. Je nach Farbe, Ausbau und Struktur anpassen.` }),
    faqList: (name, byTheGlass) => ({ q: `Wie sollte ein Restaurant ${name} aufnehmen?`, a: `Eine schnell verstandliche Referenz und eine tiefere Flasche aufnehmen. Im Glas: ${byTheGlass}` }),
  },
  pt: {
    eyebrow: "Inteligencia regional de servico",
    title: (name) => `Como usar ${name} numa carta de vinhos`,
    subtitle: "Leitura pratica para compra, servico, equipa de sala e harmonizacoes.",
    labels: { serviceTemp: "Servico", glass: "Copo", byTheGlass: "A copo", role: "Papel na carta", floorCue: "Argumento de sala", commercialLever: "Alavanca comercial", avoid: "Erro a evitar", menu: "Harmonizacoes uteis" },
    faqService: (name, temp) => ({ q: `A que temperatura servir vinhos de ${name}?`, a: `Como ponto de partida, ${name} funciona bem a ${temp}. Ajuste conforme cor, estagio e estrutura.` }),
    faqList: (name, byTheGlass) => ({ q: `Como incluir ${name} numa carta de restaurante?`, a: `Inclua uma referencia de leitura rapida e uma garrafa mais profunda. A copo: ${byTheGlass}` }),
  },
};

export function getRegionEditorialProfile(
  slug: string,
  lang: string,
  regionName: string,
): LocalizedRegionEditorialProfile | undefined {
  const profile = regionEditorialProfiles[slug];
  if (!profile) return undefined;
  const resolvedLang = langFallback(lang);
  const copy = regionEditorialCopy[resolvedLang];
  const text = profile.texts[resolvedLang];

  return {
    slug,
    priority: profile.priority,
    eyebrow: copy.eyebrow,
    title: copy.title(regionName),
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
      copy.faqService(regionName, profile.serviceTemp),
      copy.faqList(regionName, text.byTheGlass),
    ],
  };
}
