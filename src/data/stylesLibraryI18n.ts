import {
  familyMeta,
  styleCatalog,
  styleEntries,
  type StyleCatalogEntry,
  type StyleEntry,
  type StyleFamily,
  type StyleSubtype,
} from "./stylesLibrary";
import {
  familyLabels,
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

interface StyleI18nOverlay extends WineI18nOverlay {
  name: string;
}

type StyleOverlays = WineOverlayMap<StyleI18nOverlay>;

const styleNames: Record<WineRuntimeLang, Record<string, string>> = {
  es: {},
  en: {
    tinto: "Red Wine",
    "tinto-crianza": "Crianza Red Wine",
    "tinto-reserva": "Reserva Red Wine",
    blanco: "White Wine",
    "blanco-crianza-lias": "Lees-Aged White Wine",
    rosado: "Rosé Wine",
    "rosado-cuerpo": "Gastronomic Rosé",
    espumoso: "Sparkling Wine",
    generoso: "Fortified Wine",
    dulce: "Natural Sweet Wine",
    naranja: "Orange Wine",
    eco: "Organic, Biodynamic and Natural Wine",
  },
  fr: {
    tinto: "Vin Rouge",
    "tinto-crianza": "Rouge Crianza",
    "tinto-reserva": "Rouge Reserva",
    blanco: "Vin Blanc",
    "blanco-crianza-lias": "Blanc sur Lies",
    rosado: "Vin Rosé",
    "rosado-cuerpo": "Rosé Gastronomique",
    espumoso: "Vin Effervescent",
    generoso: "Vin Fortifié",
    dulce: "Vin Doux Naturel",
    naranja: "Vin Orange",
    eco: "Vin Bio, Biodynamique et Naturel",
  },
  it: {
    tinto: "Vino Rosso",
    "tinto-crianza": "Rosso Crianza",
    "tinto-reserva": "Rosso Reserva",
    blanco: "Vino Bianco",
    "blanco-crianza-lias": "Bianco sui Lieviti",
    rosado: "Vino Rosato",
    "rosado-cuerpo": "Rosato Gastronomico",
    espumoso: "Spumante",
    generoso: "Vino Fortificato",
    dulce: "Vino Dolce Naturale",
    naranja: "Orange Wine",
    eco: "Vino Biologico, Biodinamico e Naturale",
  },
  de: {
    tinto: "Rotwein",
    "tinto-crianza": "Crianza-Rotwein",
    "tinto-reserva": "Reserva-Rotwein",
    blanco: "Weißwein",
    "blanco-crianza-lias": "Weißwein auf der Hefe",
    rosado: "Roséwein",
    "rosado-cuerpo": "Gastronomischer Rosé",
    espumoso: "Schaumwein",
    generoso: "Verstärkter Wein",
    dulce: "Natursüßer Wein",
    naranja: "Orange Wine",
    eco: "Biologischer, Biodynamischer und Naturbelassener Wein",
  },
  pt: {
    tinto: "Vinho Tinto",
    "tinto-crianza": "Tinto Crianza",
    "tinto-reserva": "Tinto Reserva",
    blanco: "Vinho Branco",
    "blanco-crianza-lias": "Branco sobre Lias",
    rosado: "Vinho Rosé",
    "rosado-cuerpo": "Rosé Gastronómico",
    espumoso: "Espumante",
    generoso: "Vinho Fortificado",
    dulce: "Vinho Doce Natural",
    naranja: "Vinho Laranja",
    eco: "Vinho Biológico, Biodinâmico e Natural",
  },
};

const familyDescriptions: Record<WineRuntimeLang, Record<StyleFamily, string>> = {
  es: Object.fromEntries(
    Object.entries(familyMeta).map(([family, meta]) => [family, meta.description])
  ) as Record<StyleFamily, string>,
  en: {
    tinto: "The broadest style family for structure, tannin and gastronomic depth.",
    blanco: "Freshness, acidity, texture and aromatic precision for the wine list.",
    rosado: "The bridge between white freshness and red-wine structure.",
    espumoso: "Bubbles, celebration and versatile pairing power.",
    generoso: "Oxidative depth, fortification and historic service rituals.",
    dulce: "Concentration, balance and memorable dessert or cheese pairings.",
    naranja: "Skin-contact whites with texture, tannin and contemporary appeal.",
    eco: "Sustainable farming, low intervention and terroir-driven storytelling.",
  },
  fr: {
    tinto: "La famille la plus large pour structure, tanins et profondeur gastronomique.",
    blanco: "Fraîcheur, acidité, texture et précision aromatique pour la carte.",
    rosado: "Le pont entre la fraîcheur du blanc et la structure du rouge.",
    espumoso: "Bulles, célébration et grande polyvalence à table.",
    generoso: "Profondeur oxydative, fortification et rituels de service historiques.",
    dulce: "Concentration, équilibre et accords mémorables avec desserts ou fromages.",
    naranja: "Blancs de macération avec texture, tanins et attrait contemporain.",
    eco: "Viticulture durable, faible intervention et récit de terroir.",
  },
  it: {
    tinto: "La famiglia più ampia per struttura, tannino e profondità gastronomica.",
    blanco: "Freschezza, acidità, texture e precisione aromatica per la carta.",
    rosado: "Il ponte tra la freschezza del bianco e la struttura del rosso.",
    espumoso: "Bollicine, celebrazione e grande versatilità negli abbinamenti.",
    generoso: "Profondità ossidativa, fortificazione e rituali storici di servizio.",
    dulce: "Concentrazione, equilibrio e abbinamenti memorabili con dessert o formaggi.",
    naranja: "Bianchi macerati con texture, tannino e appeal contemporaneo.",
    eco: "Viticoltura sostenibile, bassa interventistica e racconto del terroir.",
  },
  de: {
    tinto: "Die breiteste Stilfamilie für Struktur, Tannin und gastronomische Tiefe.",
    blanco: "Frische, Säure, Textur und aromatische Präzision für die Weinkarte.",
    rosado: "Die Brücke zwischen Weißweinfrische und Rotweinstruktur.",
    espumoso: "Perlage, Anlass und vielseitige Speisenbegleitung.",
    generoso: "Oxidative Tiefe, Aufspritung und historische Servicerituale.",
    dulce: "Konzentration, Balance und starke Kombinationen mit Dessert oder Käse.",
    naranja: "Maischevergorene Weißweine mit Textur, Tannin und moderner Relevanz.",
    eco: "Nachhaltiger Anbau, geringe Intervention und Terroir-Erzählung.",
  },
  pt: {
    tinto: "A família mais ampla para estrutura, tanino e profundidade gastronómica.",
    blanco: "Frescura, acidez, textura e precisão aromática para a carta.",
    rosado: "A ponte entre a frescura do branco e a estrutura do tinto.",
    espumoso: "Bolhas, celebração e grande versatilidade à mesa.",
    generoso: "Profundidade oxidativa, fortificação e rituais históricos de serviço.",
    dulce: "Concentração, equilíbrio e harmonizações memoráveis com sobremesas ou queijos.",
    naranja: "Brancos de maceração com textura, tanino e apelo contemporâneo.",
    eco: "Viticultura sustentável, baixa intervenção e narrativa de terroir.",
  },
};

const getStyleName = (entry: StyleEntry, lang: WineRuntimeLang) =>
  styleNames[lang][entry.slug] || entry.name;

const subtypeNames: Record<WineI18nLang, Record<string, string>> = {
  en: {
    "tinto-crianza": "Crianza Red Wine",
    "tinto-reserva": "Reserva Red Wine",
    "blanco-crianza-lias": "Lees-Aged White Wine",
    "rosado-cuerpo": "Gastronomic Rosé",
  },
  fr: {
    "tinto-crianza": "Rouge Crianza",
    "tinto-reserva": "Rouge Reserva",
    "blanco-crianza-lias": "Blanc sur Lies",
    "rosado-cuerpo": "Rosé Gastronomique",
  },
  it: {
    "tinto-crianza": "Rosso Crianza",
    "tinto-reserva": "Rosso Reserva",
    "blanco-crianza-lias": "Bianco sui Lieviti",
    "rosado-cuerpo": "Rosato Gastronomico",
  },
  de: {
    "tinto-crianza": "Crianza-Rotwein",
    "tinto-reserva": "Reserva-Rotwein",
    "blanco-crianza-lias": "Weißwein auf der Hefe",
    "rosado-cuerpo": "Gastronomischer Rosé",
  },
  pt: {
    "tinto-crianza": "Tinto Crianza",
    "tinto-reserva": "Tinto Reserva",
    "blanco-crianza-lias": "Branco sobre Lias",
    "rosado-cuerpo": "Rosé Gastronómico",
  },
};

const localizeSubtype = (subtype: StyleSubtype, parent: StyleEntry, lang: WineRuntimeLang): StyleSubtype => {
  if (lang === "es") return subtype;
  const parentName = getStyleName(parent, lang);
  const subtypeName = subtypeNames[lang][subtype.slug] || subtype.name;
  const descriptions: Record<WineI18nLang, string> = {
    en: `${subtype.name} is a subtype within ${parentName}. It gives the wine list a more precise service cue around temperature, texture and pairing expectations.`,
    fr: `${subtype.name} est un sous-style de ${parentName}. Il donne à la carte un repère plus précis sur température, texture et attentes d'accord.`,
    it: `${subtype.name} è un sottostile di ${parentName}. Offre alla carta un'indicazione più precisa su temperatura, texture e aspettative di abbinamento.`,
    de: `${subtype.name} ist ein Unterstil von ${parentName}. Er präzisiert Temperatur, Textur und Pairing-Erwartung auf der Weinkarte.`,
    pt: `${subtype.name} é um subtipo de ${parentName}. Dá à carta uma indicação mais precisa de temperatura, textura e expectativa de harmonização.`,
  };
  return { ...subtype, name: subtypeName, description: descriptions[lang].replace(subtype.name, subtypeName) };
};

const buildOverlay = (entry: StyleEntry, lang: WineI18nLang): StyleI18nOverlay => {
  const name = getStyleName(entry, lang);
  const grapes = formatList(entry.mainGrapes, lang);
  const regions = formatList(entry.keyRegions, lang);
  const family = familyLabels[lang][entry.family] || entry.family;

  const copy: Record<WineI18nLang, StyleI18nOverlay> = {
    en: {
      name,
      description: `${name} is a ${family.toLowerCase()} style where service, structure and pairing expectations shape the guest experience. It is especially useful with grapes such as ${grapes || "classic varieties"} and regions such as ${regions || "benchmark regions"}.`,
      intro: `${name} helps restaurants organize the wine list by experience, not only by origin. It clarifies temperature, glassware, body, acidity and the occasions where the style can sell better.`,
      seo: {
        title: seoTitle(`${name}: wine style guide`),
        description: seoDescription(`Guide to ${name}: service, sensory profile, grapes, regions and pairings for restaurant wine lists.`),
      },
    },
    fr: {
      name,
      description: `${name} est un style de ${family.toLowerCase()} où service, structure et attentes d'accord façonnent l'expérience client. Il fonctionne particulièrement avec ${grapes || "des cépages classiques"} et des régions comme ${regions || "les références du style"}.`,
      intro: `${name} aide les restaurants à organiser la carte par expérience, pas seulement par origine. Il clarifie température, verrerie, corps, acidité et occasions de vente.`,
      seo: {
        title: seoTitle(`${name}: guide du style de vin`),
        description: seoDescription(`Guide de ${name}: service, profil sensoriel, cépages, régions et accords pour cartes de restaurant.`),
      },
    },
    it: {
      name,
      description: `${name} è uno stile di ${family.toLowerCase()} in cui servizio, struttura e aspettative di abbinamento definiscono l'esperienza dell'ospite. Funziona bene con ${grapes || "vitigni classici"} e regioni come ${regions || "riferimenti dello stile"}.`,
      intro: `${name} aiuta i ristoranti a organizzare la carta per esperienza, non solo per origine. Chiarisce temperatura, calice, corpo, acidità e momenti in cui lo stile vende meglio.`,
      seo: {
        title: seoTitle(`${name}: guida allo stile di vino`),
        description: seoDescription(`Guida a ${name}: servizio, profilo sensoriale, vitigni, regioni e abbinamenti per carte vini.`),
      },
    },
    de: {
      name,
      description: `${name} ist ein Stil innerhalb von ${family}, bei dem Service, Struktur und Pairing-Erwartung das Gästeerlebnis prägen. Besonders relevant ist er mit ${grapes || "klassischen Rebsorten"} und Regionen wie ${regions || "stilprägenden Herkünften"}.`,
      intro: `${name} hilft Restaurants, die Weinkarte nach Erlebnis statt nur nach Herkunft zu strukturieren. Der Stil klärt Temperatur, Glas, Körper, Säure und passende Verkaufsmomente.`,
      seo: {
        title: seoTitle(`${name}: Weinstil Guide`),
        description: seoDescription(`Guide zu ${name}: Service, sensorisches Profil, Rebsorten, Regionen und Pairings für Weinkarten.`),
      },
    },
    pt: {
      name,
      description: `${name} é um estilo de ${family.toLowerCase()} em que serviço, estrutura e expectativa de harmonização moldam a experiência do cliente. É especialmente útil com ${grapes || "castas clássicas"} e regiões como ${regions || "referências do estilo"}.`,
      intro: `${name} ajuda restaurantes a organizar a carta por experiência, não apenas por origem. Clarifica temperatura, copo, corpo, acidez e momentos em que o estilo vende melhor.`,
      seo: {
        title: seoTitle(`${name}: guia do estilo de vinho`),
        description: seoDescription(`Guia de ${name}: serviço, perfil sensorial, castas, regiões e harmonizações para cartas de restaurante.`),
      },
    },
  };

  return copy[lang];
};

type StyleRuntimeCopy = Pick<
  StyleEntry,
  | "elaboration"
  | "glassRecommendation"
  | "agingPotential"
  | "pairings"
  | "cartaCommunication"
  | "clientProfile"
  | "sellByStrategy"
  | "whenSafe"
  | "whenDifferential"
  | "whenPremium"
  | "competingStyles"
  | "bestConcepts"
  | "faqs"
>;

const stylePairings: Record<WineI18nLang, Record<StyleFamily, string[]>> = {
  en: {
    tinto: ["grilled red meat", "lamb", "stews", "aged cheeses", "mushrooms"],
    blanco: ["white fish", "shellfish", "rice dishes", "poultry", "fresh cheeses"],
    rosado: ["rice dishes", "tuna", "charcuterie", "spicy food", "Mediterranean salads"],
    espumoso: ["oysters", "fried dishes", "sushi", "Iberian ham", "soft cheeses"],
    generoso: ["tapas", "cured ham", "aged cheeses", "nuts", "chocolate desserts"],
    dulce: ["blue cheese", "fruit desserts", "foie gras", "caramel desserts", "pastry"],
    naranja: ["spiced dishes", "fermented vegetables", "charcuterie", "curries", "washed-rind cheeses"],
    eco: ["market cuisine", "seasonal vegetables", "local produce", "light meats", "sharing plates"],
  },
  fr: {
    tinto: ["viandes rouges", "agneau", "plats mijotes", "fromages affines", "champignons"],
    blanco: ["poisson blanc", "fruits de mer", "riz", "volaille", "fromages frais"],
    rosado: ["riz", "thon", "charcuterie", "cuisine epicee", "salades mediterraneennes"],
    espumoso: ["huitres", "fritures", "sushi", "jambon iberique", "fromages doux"],
    generoso: ["tapas", "jambon affine", "fromages affines", "fruits secs", "desserts chocolat"],
    dulce: ["fromages bleus", "desserts aux fruits", "foie gras", "caramel", "patisserie"],
    naranja: ["plats epices", "legumes fermentes", "charcuterie", "currys", "fromages a croute lavee"],
    eco: ["cuisine de marche", "legumes de saison", "produits locaux", "viandes legeres", "plats a partager"],
  },
  it: {
    tinto: ["carni rosse", "agnello", "stufati", "formaggi stagionati", "funghi"],
    blanco: ["pesce bianco", "frutti di mare", "risotti", "pollame", "formaggi freschi"],
    rosado: ["risotti", "tonno", "salumi", "cucina piccante", "insalate mediterranee"],
    espumoso: ["ostriche", "fritti", "sushi", "jamon iberico", "formaggi morbidi"],
    generoso: ["tapas", "prosciutto stagionato", "formaggi stagionati", "frutta secca", "dolci al cioccolato"],
    dulce: ["formaggi erborinati", "dolci alla frutta", "foie gras", "caramello", "pasticceria"],
    naranja: ["piatti speziati", "verdure fermentate", "salumi", "curry", "formaggi a crosta lavata"],
    eco: ["cucina di mercato", "verdure di stagione", "prodotti locali", "carni leggere", "piatti condivisi"],
  },
  de: {
    tinto: ["rotes Fleisch", "Lamm", "Schmorgerichte", "gereifter Kase", "Pilze"],
    blanco: ["weisser Fisch", "Meeresfruchte", "Reisgerichte", "Geflugel", "Frischkase"],
    rosado: ["Reisgerichte", "Thunfisch", "Charcuterie", "scharfe Kuche", "mediterrane Salate"],
    espumoso: ["Austern", "Frittiertes", "Sushi", "Iberico-Schinken", "weicher Kase"],
    generoso: ["Tapas", "gereifter Schinken", "gereifter Kase", "Nusse", "Schokoladendesserts"],
    dulce: ["Blauschimmelkäse", "Fruchtdesserts", "Foie gras", "Karamell", "Gebäck"],
    naranja: ["gewurzte Gerichte", "fermentiertes Gemuse", "Charcuterie", "Currys", "Rotschmierkase"],
    eco: ["Marktkuche", "saisonales Gemuse", "lokale Produkte", "helles Fleisch", "Sharing-Gerichte"],
  },
  pt: {
    tinto: ["carnes vermelhas", "borrego", "estufados", "queijos curados", "cogumelos"],
    blanco: ["peixe branco", "marisco", "arrozes", "aves", "queijos frescos"],
    rosado: ["arrozes", "atum", "enchidos", "comida picante", "saladas mediterranicas"],
    espumoso: ["ostras", "fritos", "sushi", "presunto iberico", "queijos macios"],
    generoso: ["tapas", "presunto curado", "queijos curados", "frutos secos", "sobremesas de chocolate"],
    dulce: ["queijos azuis", "sobremesas de fruta", "foie gras", "caramelo", "pastelaria"],
    naranja: ["pratos especiados", "legumes fermentados", "enchidos", "caril", "queijos de casca lavada"],
    eco: ["cozinha de mercado", "legumes da epoca", "produto local", "carnes leves", "pratos de partilha"],
  },
};

const buildRuntimeStyleCopy = (
  entry: StyleEntry,
  lang: WineI18nLang,
  name: string,
): StyleRuntimeCopy => {
  const family = familyLabels[lang][entry.family] || entry.family;
  const pairings = stylePairings[lang][entry.family];
  const copy: Record<WineI18nLang, StyleRuntimeCopy> = {
    en: {
      elaboration: `${name} is defined by how structure, texture and service expectations are built in the cellar. On a restaurant list, the useful cue is not the technical process alone, but how it changes temperature, glassware and pairing.`,
      glassRecommendation: `Use a glass that protects aroma while leaving enough space for the style's texture and structure.`,
      agingPotential: `Ageing potential depends on producer, origin and structure. Use recent vintages for freshness and older bottles when complexity is part of the sale.`,
      pairings,
      cartaCommunication: `${name} communicates a clear ${family.toLowerCase()} experience. It helps guests choose by occasion, body and dish instead of only by region.`,
      clientProfile: `Useful for guests who know the broad category but need a practical cue from the floor team.`,
      sellByStrategy: `Sell it by occasion, dish and texture first; add grape, region or producer when that makes the price easier to understand.`,
      whenSafe: `Safe when the guest asks for a recognizable style and the dish matches the body and acidity.`,
      whenDifferential: `Differentiating when the list explains why this style is more precise than a generic wine category.`,
      whenPremium: `Premium when origin, producer, ageing or scarcity justify a higher bottle price.`,
      competingStyles: ["nearby wine styles", "better-known regional choices"],
      bestConcepts: ["restaurant wine list", "hotel F&B", "wine bar", "tasting menu"],
      faqs: [
        { q: `How should ${name} be served?`, a: `Serve it with the temperature, glass and pairing cue visible on the list so the guest understands the style before ordering.` },
        { q: `When does ${name} work best?`, a: `It works best when the dish, service temperature and commercial role are aligned instead of presenting it as a generic wine.` },
      ],
    },
    fr: {
      elaboration: `${name} se definit par la maniere dont structure, texture et attente de service sont construites en cave. En carte, le repere utile est l'effet sur temperature, verre et accord.`,
      glassRecommendation: `Utilisez un verre qui protege les aromes tout en laissant de l'espace pour la texture et la structure du style.`,
      agingPotential: `Le potentiel de garde depend du producteur, de l'origine et de la structure. Millesimes recents pour la fraicheur, bouteilles plus agees pour la complexite.`,
      pairings,
      cartaCommunication: `${name} communique une experience claire de ${family.toLowerCase()}. Il aide le client a choisir par occasion, corps et plat.`,
      clientProfile: `Utile pour les clients qui connaissent la categorie mais ont besoin d'un repere pratique de l'equipe de salle.`,
      sellByStrategy: `Vendez d'abord par occasion, plat et texture ; ajoutez cepage, region ou producteur si cela rend le prix plus lisible.`,
      whenSafe: `Sur quand le client demande un style reconnaissable et que le plat correspond au corps et a l'acidite.`,
      whenDifferential: `Differenciant lorsque la carte explique pourquoi ce style est plus precis qu'une categorie generique.`,
      whenPremium: `Premium quand origine, producteur, elevage ou rarete justifient un prix de bouteille plus eleve.`,
      competingStyles: ["styles voisins", "choix regionaux plus connus"],
      bestConcepts: ["carte de restaurant", "hotel F&B", "bar a vin", "menu degustation"],
      faqs: [
        { q: `Comment servir ${name} ?`, a: `Indiquez temperature, verre et repere d'accord pour que le client comprenne le style avant de commander.` },
        { q: `Quand ${name} fonctionne-t-il le mieux ?`, a: `Quand plat, temperature et role commercial sont alignes au lieu de le presenter comme vin generique.` },
      ],
    },
    it: {
      elaboration: `${name} si definisce per come struttura, texture e aspettative di servizio vengono costruite in cantina. In carta conta l'effetto su temperatura, calice e abbinamento.`,
      glassRecommendation: `Usa un calice che protegga gli aromi ma lasci spazio a texture e struttura dello stile.`,
      agingPotential: `Il potenziale di evoluzione dipende da produttore, origine e struttura. Annate recenti per freschezza, bottiglie piu mature per complessita.`,
      pairings,
      cartaCommunication: `${name} comunica un'esperienza chiara di ${family.toLowerCase()}. Aiuta a scegliere per occasione, corpo e piatto.`,
      clientProfile: `Utile per ospiti che conoscono la categoria ma hanno bisogno di un'indicazione pratica dalla sala.`,
      sellByStrategy: `Vendilo prima per occasione, piatto e texture; aggiungi vitigno, regione o produttore quando aiuta a capire il prezzo.`,
      whenSafe: `Sicuro quando il cliente chiede uno stile riconoscibile e il piatto corrisponde a corpo e acidita.`,
      whenDifferential: `Differenziante quando la carta spiega perche questo stile e piu preciso di una categoria generica.`,
      whenPremium: `Premium quando origine, produttore, affinamento o rarita giustificano un prezzo piu alto.`,
      competingStyles: ["stili vicini", "scelte regionali piu note"],
      bestConcepts: ["carta ristorante", "hotel F&B", "wine bar", "menu degustazione"],
      faqs: [
        { q: `Come servire ${name}?`, a: `Rendi visibili temperatura, calice e abbinamento cosi l'ospite capisce lo stile prima dell'ordine.` },
        { q: `Quando funziona meglio ${name}?`, a: `Quando piatto, temperatura e ruolo commerciale sono allineati, non quando appare come vino generico.` },
      ],
    },
    de: {
      elaboration: `${name} wird durch Struktur, Textur und Serviceerwartung definiert. Auf der Weinkarte zahlt vor allem, wie der Stil Temperatur, Glas und Pairing verandert.`,
      glassRecommendation: `Ein Glas wahlen, das Aromen schutzt und zugleich genug Raum fur Textur und Struktur lasst.`,
      agingPotential: `Reifepotenzial hangt von Produzent, Herkunft und Struktur ab. Junge Jahrgange fur Frische, gereifte Flaschen fur Komplexitat nutzen.`,
      pairings,
      cartaCommunication: `${name} vermittelt auf der Weinkarte eine klare Erfahrung innerhalb von ${family}. Gaste wahlen leichter nach Anlass, Korper und Gericht statt nur nach Region.`,
      clientProfile: `Hilfreich fur Gaste, die die Kategorie kennen, aber einen praktischen Hinweis vom Serviceteam brauchen.`,
      sellByStrategy: `Zuerst uber Anlass, Gericht und Textur verkaufen; Rebsorte, Region oder Produzent erganzen, wenn das den Preis verstandlicher macht.`,
      whenSafe: `Sicher, wenn der Gast einen erkennbaren Stil sucht und das Gericht zu Korper und Saure passt.`,
      whenDifferential: `Differenzierend, wenn die Karte erklart, warum dieser Stil praziser ist als eine generische Weinkategorie.`,
      whenPremium: `Premium, wenn Herkunft, Produzent, Ausbau oder Seltenheit einen hoheren Flaschenpreis begrunden.`,
      competingStyles: ["nahe Weinstile", "bekanntere regionale Optionen"],
      bestConcepts: ["Restaurant-Weinkarte", "Hotel F&B", "Weinbar", "Degustationsmenu"],
      faqs: [
        { q: `Wie sollte ${name} serviert werden?`, a: `Temperatur, Glas und Pairing-Hinweis sichtbar machen, damit Gaste den Stil vor der Bestellung verstehen.` },
        { q: `Wann funktioniert ${name} am besten?`, a: `Wenn Gericht, Temperatur und kommerzielle Rolle zusammenpassen und der Stil nicht generisch prasentiert wird.` },
      ],
    },
    pt: {
      elaboration: `${name} define-se pela forma como estrutura, textura e expectativa de servico sao construidas na adega. Na carta importa o efeito em temperatura, copo e harmonizacao.`,
      glassRecommendation: `Use um copo que proteja os aromas e deixe espaco para textura e estrutura do estilo.`,
      agingPotential: `O potencial de guarda depende de produtor, origem e estrutura. Use colheitas recentes para frescura e garrafas mais evoluidas para complexidade.`,
      pairings,
      cartaCommunication: `${name} comunica na carta uma experiencia clara de ${family.toLowerCase()}. Ajuda o cliente a escolher por ocasiao, corpo e prato.`,
      clientProfile: `Util para clientes que conhecem a categoria mas precisam de uma pista pratica da equipa de sala.`,
      sellByStrategy: `Venda primeiro por ocasiao, prato e textura; acrescente casta, regiao ou produtor quando isso tornar o preco mais claro.`,
      whenSafe: `Seguro quando o cliente pede um estilo reconhecivel e o prato combina com corpo e acidez.`,
      whenDifferential: `Diferencial quando a carta explica porque este estilo e mais preciso do que uma categoria generica.`,
      whenPremium: `Premium quando origem, produtor, estagio ou raridade justificam preco de garrafa superior.`,
      competingStyles: ["estilos proximos", "opcoes regionais mais conhecidas"],
      bestConcepts: ["carta de restaurante", "hotel F&B", "wine bar", "menu de degustacao"],
      faqs: [
        { q: `Como servir ${name}?`, a: `Mostre temperatura, copo e harmonizacao para que o cliente entenda o estilo antes de pedir.` },
        { q: `Quando funciona melhor ${name}?`, a: `Quando prato, temperatura e papel comercial estao alinhados, em vez de surgir como vinho generico.` },
      ],
    },
  };

  return copy[lang];
};

export const styleOverlays: StyleOverlays = Object.fromEntries(
  styleEntries.map((entry) => [
    entry.slug,
    Object.fromEntries(
      (["en", "fr", "it", "de", "pt"] satisfies WineI18nLang[]).map((lang) => [lang, buildOverlay(entry, lang)])
    ),
  ])
) as StyleOverlays;

const applyStyleOverlay = <T extends StyleEntry>(entry: T, lang?: string): T => {
  const resolved = resolveWineLang(lang);
  const overlayLang = normalizeWineOverlayLang(resolved);
  const overlay = overlayLang ? styleOverlays[entry.slug]?.[overlayLang] : undefined;
  if (!overlay) return entry;
  const runtimeCopy = buildRuntimeStyleCopy(entry, overlayLang, overlay.name);
  return {
    ...entry,
    ...runtimeCopy,
    name: overlay.name,
    description: overlay.description,
    intro: overlay.intro,
    subtypes: entry.subtypes.map((subtype) => localizeSubtype(subtype, entry, resolved)),
    seo: { ...entry.seo, ...overlay.seo },
  };
};

export const getLocalizedStyleEntries = (lang?: string): StyleEntry[] =>
  styleEntries.map((entry) => applyStyleOverlay(entry, lang));

export const getLocalizedStyleBySlug = (slug: string, lang?: string): StyleEntry | undefined => {
  const entry = styleEntries.find((style) => style.slug === slug);
  return entry ? applyStyleOverlay(entry, lang) : undefined;
};

export const getLocalizedStyleCatalog = (lang?: string): StyleCatalogEntry[] => {
  const resolved = resolveWineLang(lang);
  if (resolved === "es") return styleCatalog;
  return getLocalizedStyleEntries(resolved).flatMap((entry) =>
    entry.subtypes.map((subtype) => ({
      slug: subtype.slug,
      name: subtype.name,
      family: entry.family,
      description: subtype.description,
      servingTemp: entry.servingTemp,
      mainGrapes: entry.mainGrapes.slice(0, 5),
      keyRegions: entry.keyRegions.slice(0, 5),
    }))
  );
};

export const getLocalizedStyleCatalogEntry = (
  slug: string,
  lang?: string
): StyleCatalogEntry | undefined =>
  getLocalizedStyleCatalog(lang).find((entry) => entry.slug === slug);

export const getAllLocalizedStyles = (lang?: string): (StyleEntry | StyleCatalogEntry)[] => {
  const entries = getLocalizedStyleEntries(lang);
  const catalog = getLocalizedStyleCatalog(lang);
  const fullSlugs = new Set(entries.map((entry) => entry.slug));
  return [...entries, ...catalog.filter((entry) => !fullSlugs.has(entry.slug))];
};

export const getLocalizedFamilyMeta = (family: StyleFamily, lang?: string) => {
  const resolved = resolveWineLang(lang);
  return {
    ...familyMeta[family],
    label: familyLabels[resolved][family] || familyMeta[family].label,
    description: familyDescriptions[resolved][family] || familyMeta[family].description,
  };
};
