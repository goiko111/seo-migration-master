import {
  regionEntries,
  wineCountries,
  type RegionEntry,
  type WineType,
  type WineCountry,
} from "./regionsLibrary";
import {
  formatList,
  localizeCountryName,
  normalizeWineOverlayLang,
  resolveWineLang,
  seoDescription,
  seoTitle,
  wineTypeLabels,
  type WineI18nLang,
  type WineI18nOverlay,
  type WineOverlayMap,
  type WineRuntimeLang,
} from "./wineLibraryI18n";

type RegionI18nOverlay = WineI18nOverlay;

interface CountryI18nOverlay {
  name: string;
  intro: string;
  classificationExplainer: string;
  howToReadInCarta: string;
  seo: {
    title: string;
    description: string;
  };
}

type RegionOverlays = WineOverlayMap<RegionI18nOverlay>;
type CountryOverlays = Record<string, Partial<Record<WineI18nLang, CountryI18nOverlay>>>;

const prestigeLabels: Record<WineRuntimeLang, Record<string, string>> = {
  es: { "icónico": "icónico", premium: "premium", reconocido: "reconocido", emergente: "emergente", local: "local" },
  en: { "icónico": "iconic", premium: "premium", reconocido: "recognized", emergente: "emerging", local: "local" },
  fr: { "icónico": "emblématique", premium: "premium", reconocido: "reconnu", emergente: "émergent", local: "local" },
  it: { "icónico": "iconico", premium: "premium", reconocido: "riconosciuto", emergente: "emergente", local: "locale" },
  de: { "icónico": "ikonisch", premium: "Premium", reconocido: "anerkannt", emergente: "aufstrebend", local: "lokal" },
  pt: { "icónico": "icónico", premium: "premium", reconocido: "reconhecido", emergente: "emergente", local: "local" },
};

const recognitionLabels: Record<WineRuntimeLang, Record<string, string>> = {
  es: { "muy-alto": "muy alto", alto: "alto", medio: "medio", bajo: "bajo", nicho: "de nicho" },
  en: { "muy-alto": "very high", alto: "high", medio: "medium", bajo: "low", nicho: "niche" },
  fr: { "muy-alto": "très forte", alto: "forte", medio: "moyenne", bajo: "faible", nicho: "de niche" },
  it: { "muy-alto": "molto alto", alto: "alto", medio: "medio", bajo: "basso", nicho: "di nicchia" },
  de: { "muy-alto": "sehr hoch", alto: "hoch", medio: "mittel", bajo: "niedrig", nicho: "Nische" },
  pt: { "muy-alto": "muito alto", alto: "alto", medio: "médio", bajo: "baixo", nicho: "de nicho" },
};

const getCountry = (slug: string) => wineCountries.find((country) => country.slug === slug);

const localizeWineTypes = (types: string[], lang: WineRuntimeLang): string => {
  const labels = wineTypeLabels[lang];
  return formatList(types.map((type) => labels[type] || type), lang);
};

const buildRegionOverlay = (entry: RegionEntry, lang: WineI18nLang): RegionI18nOverlay => {
  const country = getCountry(entry.country);
  const countryName = country ? localizeCountryName(country.name, lang) : entry.country;
  const grapes = formatList(entry.mainGrapes, lang);
  const styles = localizeWineTypes(entry.wineTypes, lang);
  const prestige = prestigeLabels[lang][entry.prestige] || entry.prestige;
  const recognition = recognitionLabels[lang][entry.clientRecognition] || entry.clientRecognition;

  const copy: Record<WineI18nLang, RegionI18nOverlay> = {
    en: {
      description: `${entry.name} is a ${entry.denominationType} in ${countryName}, known for ${styles || "distinctive wines"} based on ${grapes || "local grapes"}. It works as a ${prestige} regional signal with ${recognition} guest recognition on the wine list.`,
      intro: `${entry.name} helps a restaurant wine list explain origin, style and commercial role in one clear reference. It is useful for positioning the region, training the floor team and guiding pairings.`,
      seo: {
        title: seoTitle(`${entry.name}: wine region guide`),
        description: seoDescription(`Guide to ${entry.name}: grapes, styles, recognition and wine-list role for restaurants. Winerim wine library.`),
      },
    },
    fr: {
      description: `${entry.name} est une ${entry.denominationType} de ${countryName}, reconnue pour ses ${styles || "vins de caractère"} issus de ${grapes || "cépages locaux"}. Elle agit comme un repère ${prestige} avec une reconnaissance client ${recognition} en carte.`,
      intro: `${entry.name} aide une carte des vins à expliquer origine, style et rôle commercial en un repère clair. C'est utile pour positionner la région, former la salle et guider les accords.`,
      seo: {
        title: seoTitle(`${entry.name}: guide de région viticole`),
        description: seoDescription(`Guide de ${entry.name}: cépages, styles, reconnaissance et rôle en carte pour restaurants. Bibliothèque Winerim.`),
      },
    },
    it: {
      description: `${entry.name} è una ${entry.denominationType} in ${countryName}, nota per ${styles || "vini di carattere"} da ${grapes || "vitigni locali"}. In carta funziona come segnale regionale ${prestige} con riconoscibilità ${recognition}.`,
      intro: `${entry.name} aiuta la carta vini a spiegare origine, stile e ruolo commerciale con un riferimento chiaro. È utile per posizionare la regione, formare la sala e guidare gli abbinamenti.`,
      seo: {
        title: seoTitle(`${entry.name}: guida alla regione vinicola`),
        description: seoDescription(`Guida a ${entry.name}: vitigni, stili, riconoscibilità e ruolo nella carta vini. Biblioteca Winerim.`),
      },
    },
    de: {
      description: `${entry.name} ist eine ${entry.denominationType} in ${countryName}, bekannt für ${styles || "eigenständige Weine"} aus ${grapes || "lokalen Rebsorten"}. Auf der Weinkarte ist sie ein ${prestige} Herkunftssignal mit ${recognition} Gästeerkennung.`,
      intro: `${entry.name} hilft, Herkunft, Stil und kommerzielle Rolle einer Region klar auf der Weinkarte zu erklären. Das unterstützt Positionierung, Teamschulung und passende Empfehlungen.`,
      seo: {
        title: seoTitle(`${entry.name}: Weinregion Guide`),
        description: seoDescription(`Guide zu ${entry.name}: Rebsorten, Stile, Bekanntheit und Rolle auf der Weinkarte. Winerim Bibliothek.`),
      },
    },
    pt: {
      description: `${entry.name} é uma ${entry.denominationType} em ${countryName}, reconhecida por ${styles || "vinhos de carácter"} de ${grapes || "castas locais"}. Na carta funciona como sinal regional ${prestige} com reconhecimento ${recognition} do cliente.`,
      intro: `${entry.name} ajuda a carta de vinhos a explicar origem, estilo e papel comercial num só ponto de referência. É útil para posicionar a região, formar a equipa e orientar harmonizações.`,
      seo: {
        title: seoTitle(`${entry.name}: guia da região vinícola`),
        description: seoDescription(`Guia de ${entry.name}: castas, estilos, reconhecimento e papel na carta de vinhos. Biblioteca Winerim.`),
      },
    },
  };

  return copy[lang];
};

const regionRuntimeCopy: Record<WineI18nLang, {
  style: Record<WineType, (name: string) => string>;
  pairings: Record<WineType, string[]>;
  cartaReading: (entry: RegionEntry, prestige: string, recognition: string) => string;
  whenToHighlight: (entry: RegionEntry) => string;
  clientProfile: (entry: RegionEntry, recognition: string) => string;
  sellByStrategy: (entry: RegionEntry, grapes: string) => string;
  mistakes: (entry: RegionEntry) => string[];
  faqs: (entry: RegionEntry, grapes: string, styles: string) => { q: string; a: string }[];
}> = {
  en: {
    style: {
      tinto: (name) => `${name} structured red`,
      blanco: (name) => `${name} fresh white`,
      rosado: (name) => `${name} gastronomic rosé`,
      espumoso: (name) => `${name} sparkling wine`,
      dulce: (name) => `${name} sweet wine`,
      generoso: (name) => `${name} fortified wine`,
      naranja: (name) => `${name} orange wine`,
      seco: (name) => `${name} dry wine`,
    },
    pairings: {
      tinto: ["grilled meats", "roast dishes", "aged cheeses"],
      blanco: ["white fish", "shellfish", "fresh starters"],
      rosado: ["rice dishes", "vegetables", "Mediterranean plates"],
      espumoso: ["aperitif", "oysters", "salty snacks"],
      dulce: ["fruit desserts", "blue cheese", "foie gras"],
      generoso: ["Iberian ham", "tapas", "aged cheeses"],
      naranja: ["spiced dishes", "fermented vegetables", "hard cheeses"],
      seco: ["aperitif", "fish", "light starters"],
    },
    cartaReading: (entry, prestige, recognition) => `${entry.name} gives the list a ${prestige} regional signal with ${recognition} guest recognition. It helps organize origin, price ladder and food recommendation in one visible reference.`,
    whenToHighlight: (entry) => `Highlight ${entry.name} when the list needs a clear regional anchor, a food-led recommendation or a bridge between familiar wines and more distinctive producers.`,
    clientProfile: (entry, recognition) => `${entry.name} fits guests with ${recognition} recognition of the region, plus curious tables that respond to origin, grape and food context.`,
    sellByStrategy: (entry, grapes) => `Sell it through region first, then grapes (${grapes}) and style. The floor team should connect ${entry.name} to one dish and one clear occasion.`,
    mistakes: (entry) => [
      `Do not reduce ${entry.name} to a single style; show the grape or producer cue that makes the bottle specific.`,
      "Do not list the region without a food or service cue; guests need a short reason to choose it.",
      "Do not let price be the only ladder; origin, producer and style should explain the step up.",
    ],
    faqs: (entry, grapes, styles) => [
      { q: `What grapes define ${entry.name}?`, a: `${entry.name} is mainly explained through ${grapes}. Use the grape cue to make the region easier to sell on the floor.` },
      { q: `What style of wine should a restaurant expect from ${entry.name}?`, a: `${entry.name} usually appears on the list through ${styles}. The best choice depends on dish, price point and service format.` },
    ],
  },
  it: {
    style: {
      tinto: (name) => `rosso strutturato di ${name}`,
      blanco: (name) => `bianco fresco di ${name}`,
      rosado: (name) => `rosato gastronomico di ${name}`,
      espumoso: (name) => `spumante di ${name}`,
      dulce: (name) => `vino dolce di ${name}`,
      generoso: (name) => `vino fortificato di ${name}`,
      naranja: (name) => `orange wine di ${name}`,
      seco: (name) => `vino secco di ${name}`,
    },
    pairings: {
      tinto: ["carni alla griglia", "arrosti", "formaggi stagionati"],
      blanco: ["pesce bianco", "frutti di mare", "antipasti freschi"],
      rosado: ["risotti", "verdure", "cucina mediterranea"],
      espumoso: ["aperitivo", "ostriche", "stuzzichini salati"],
      dulce: ["dessert alla frutta", "formaggi erborinati", "foie gras"],
      generoso: ["prosciutto iberico", "tapas", "formaggi stagionati"],
      naranja: ["piatti speziati", "verdure fermentate", "formaggi duri"],
      seco: ["aperitivo", "pesce", "antipasti leggeri"],
    },
    cartaReading: (entry, prestige, recognition) => `${entry.name} porta in carta un segnale regionale ${prestige} con riconoscibilita ${recognition}. Aiuta a organizzare origine, scala prezzo e raccomandazione gastronomica.`,
    whenToHighlight: (entry) => `Evidenzia ${entry.name} quando la carta ha bisogno di un'ancora regionale chiara, una raccomandazione legata al cibo o un ponte verso produttori piu distintivi.`,
    clientProfile: (entry, recognition) => `${entry.name} funziona per ospiti con riconoscibilita ${recognition} della regione e per tavoli curiosi sensibili a origine, vitigno e piatto.`,
    sellByStrategy: (entry, grapes) => `Vendilo prima per regione, poi per vitigni (${grapes}) e stile. La sala deve collegare ${entry.name} a un piatto e a un'occasione chiara.`,
    mistakes: (entry) => [
      `Non ridurre ${entry.name} a un solo stile; mostra il vitigno o il produttore che rende specifica la bottiglia.`,
      "Non listare la regione senza un indizio di cibo o servizio; l'ospite ha bisogno di una ragione breve.",
      "Non far dipendere la scala solo dal prezzo; origine, produttore e stile devono spiegare il salto.",
    ],
    faqs: (entry, grapes, styles) => [
      { q: `Quali vitigni definiscono ${entry.name}?`, a: `${entry.name} si spiega soprattutto attraverso ${grapes}. Usa il vitigno per renderla piu facile da vendere in sala.` },
      { q: `Che stile aspettarsi da ${entry.name}?`, a: `${entry.name} appare di solito in carta come ${styles}. La scelta dipende da piatto, fascia prezzo e formato di servizio.` },
    ],
  },
  fr: {
    style: {
      tinto: (name) => `rouge structure de ${name}`,
      blanco: (name) => `blanc frais de ${name}`,
      rosado: (name) => `rose gastronomique de ${name}`,
      espumoso: (name) => `effervescent de ${name}`,
      dulce: (name) => `vin doux de ${name}`,
      generoso: (name) => `vin fortifie de ${name}`,
      naranja: (name) => `vin orange de ${name}`,
      seco: (name) => `vin sec de ${name}`,
    },
    pairings: {
      tinto: ["viandes grillees", "plats rotis", "fromages affines"],
      blanco: ["poisson blanc", "fruits de mer", "entrees fraiches"],
      rosado: ["riz", "legumes", "cuisine mediterraneenne"],
      espumoso: ["aperitif", "huitres", "snacks sales"],
      dulce: ["desserts aux fruits", "fromages bleus", "foie gras"],
      generoso: ["jambon iberique", "tapas", "fromages affines"],
      naranja: ["plats epices", "legumes fermentes", "fromages durs"],
      seco: ["aperitif", "poisson", "entrees legeres"],
    },
    cartaReading: (entry, prestige, recognition) => `${entry.name} apporte a la carte un signal regional ${prestige} avec une reconnaissance client ${recognition}. Elle aide a organiser origine, prix et recommandation gastronomique.`,
    whenToHighlight: (entry) => `Mettez ${entry.name} en avant quand la carte a besoin d'un repere regional clair, d'une recommandation par plat ou d'un pont vers des producteurs plus distinctifs.`,
    clientProfile: (entry, recognition) => `${entry.name} convient aux clients avec une reconnaissance ${recognition} de la region et aux tables curieuses sensibles a l'origine, au cepage et au plat.`,
    sellByStrategy: (entry, grapes) => `Vendez d'abord par region, puis par cepages (${grapes}) et par style. L'equipe doit relier ${entry.name} a un plat et a une occasion claire.`,
    mistakes: (entry) => [
      `Ne pas reduire ${entry.name} a un seul style ; montrez le cepage ou le producteur qui rend la bouteille specifique.`,
      "Ne pas lister la region sans repere de plat ou de service ; le client a besoin d'une raison courte.",
      "Ne pas faire du prix la seule echelle ; origine, producteur et style doivent expliquer la montee.",
    ],
    faqs: (entry, grapes, styles) => [
      { q: `Quels cepages definissent ${entry.name} ?`, a: `${entry.name} s'explique surtout par ${grapes}. Le cepage aide l'equipe a la vendre plus facilement.` },
      { q: `Quel style attendre de ${entry.name} ?`, a: `${entry.name} apparait generalement en carte comme ${styles}. Le choix depend du plat, du prix et du format de service.` },
    ],
  },
  de: {
    style: {
      tinto: (name) => `strukturierter Rotwein aus ${name}`,
      blanco: (name) => `frischer Weisswein aus ${name}`,
      rosado: (name) => `gastronomischer Rose aus ${name}`,
      espumoso: (name) => `Schaumwein aus ${name}`,
      dulce: (name) => `Susswein aus ${name}`,
      generoso: (name) => `aufgespriteter Wein aus ${name}`,
      naranja: (name) => `Orange Wine aus ${name}`,
      seco: (name) => `trockener Wein aus ${name}`,
    },
    pairings: {
      tinto: ["Grillfleisch", "Bratgerichte", "gereifter Kase"],
      blanco: ["weisser Fisch", "Meeresfruchte", "frische Vorspeisen"],
      rosado: ["Reisgerichte", "Gemuse", "mediterrane Kuche"],
      espumoso: ["Aperitif", "Austern", "salzige Snacks"],
      dulce: ["Fruchtdesserts", "Blauschimmelkase", "Foie gras"],
      generoso: ["Iberico-Schinken", "Tapas", "gereifter Kase"],
      naranja: ["gewurzte Gerichte", "fermentiertes Gemuse", "Hartkase"],
      seco: ["Aperitif", "Fisch", "leichte Vorspeisen"],
    },
    cartaReading: (entry, prestige, recognition) => `${entry.name} gibt der Weinkarte ein ${prestige} Herkunftssignal mit ${recognition} Gasteerkennung. Das hilft bei Herkunft, Preisleiter und Speiseempfehlung.`,
    whenToHighlight: (entry) => `${entry.name} hervorheben, wenn die Karte einen klaren regionalen Anker, eine speisebezogene Empfehlung oder den Schritt zu markanteren Produzenten braucht.`,
    clientProfile: (entry, recognition) => `${entry.name} passt zu Gasten mit ${recognition} Regionserkennung und zu neugierigen Tischen, die auf Herkunft, Rebsorte und Speise reagieren.`,
    sellByStrategy: (entry, grapes) => `Zuerst uber Region verkaufen, dann uber Rebsorten (${grapes}) und Stil. Das Team sollte ${entry.name} mit einem Gericht und einem Anlass verbinden.`,
    mistakes: (entry) => [
      `${entry.name} nicht auf einen einzigen Stil reduzieren; Rebsorte oder Produzent machen die Flasche konkret.`,
      "Die Region nicht ohne Speise- oder Servicehinweis listen; Gaste brauchen einen kurzen Grund.",
      "Preis nicht als einzige Leiter nutzen; Herkunft, Produzent und Stil mussen den Schritt erklaren.",
    ],
    faqs: (entry, grapes, styles) => [
      { q: `Welche Rebsorten pragen ${entry.name}?`, a: `${entry.name} lasst sich vor allem uber ${grapes} erklaren. Die Rebsorte macht die Region im Service leichter verkaufbar.` },
      { q: `Welchen Weinstil erwartet man aus ${entry.name}?`, a: `${entry.name} erscheint auf der Karte meist als ${styles}. Die beste Wahl hangt von Gericht, Preis und Serviceformat ab.` },
    ],
  },
  pt: {
    style: {
      tinto: (name) => `tinto estruturado de ${name}`,
      blanco: (name) => `branco fresco de ${name}`,
      rosado: (name) => `rosado gastronomico de ${name}`,
      espumoso: (name) => `espumante de ${name}`,
      dulce: (name) => `vinho doce de ${name}`,
      generoso: (name) => `vinho generoso de ${name}`,
      naranja: (name) => `vinho laranja de ${name}`,
      seco: (name) => `vinho seco de ${name}`,
    },
    pairings: {
      tinto: ["carnes grelhadas", "assados", "queijos curados"],
      blanco: ["peixe branco", "marisco", "entradas frescas"],
      rosado: ["arrozes", "legumes", "cozinha mediterranica"],
      espumoso: ["aperitivo", "ostras", "petiscos salgados"],
      dulce: ["sobremesas de fruta", "queijos azuis", "foie gras"],
      generoso: ["presunto iberico", "tapas", "queijos curados"],
      naranja: ["pratos especiados", "legumes fermentados", "queijos duros"],
      seco: ["aperitivo", "peixe", "entradas leves"],
    },
    cartaReading: (entry, prestige, recognition) => `${entry.name} da a carta um sinal regional ${prestige} com reconhecimento ${recognition} do cliente. Ajuda a organizar origem, escala de preco e recomendacao gastronomica.`,
    whenToHighlight: (entry) => `Destaque ${entry.name} quando a carta precisa de ancora regional clara, recomendacao ligada a prato ou ponte para produtores mais distintivos.`,
    clientProfile: (entry, recognition) => `${entry.name} funciona para clientes com reconhecimento ${recognition} da regiao e mesas curiosas que respondem a origem, casta e comida.`,
    sellByStrategy: (entry, grapes) => `Venda primeiro por regiao, depois por castas (${grapes}) e estilo. A equipa deve ligar ${entry.name} a um prato e uma ocasiao clara.`,
    mistakes: (entry) => [
      `Nao reduzir ${entry.name} a um unico estilo; mostre a casta ou produtor que torna a garrafa especifica.`,
      "Nao listar a regiao sem pista de comida ou servico; o cliente precisa de uma razao curta.",
      "Nao deixar o preco ser a unica escala; origem, produtor e estilo devem explicar o salto.",
    ],
    faqs: (entry, grapes, styles) => [
      { q: `Que castas definem ${entry.name}?`, a: `${entry.name} explica-se sobretudo por ${grapes}. A casta torna a regiao mais facil de vender em sala.` },
      { q: `Que estilo esperar de ${entry.name}?`, a: `${entry.name} aparece normalmente na carta como ${styles}. A melhor escolha depende de prato, preco e formato de servico.` },
    ],
  },
};

const buildLocalizedRuntimeRegion = (entry: RegionEntry, lang: WineI18nLang): Partial<RegionEntry> => {
  const copy = regionRuntimeCopy[lang];
  const grapes = formatList(entry.mainGrapes.slice(0, 4), lang);
  const styles = formatList(entry.wineTypes.map((type) => copy.style[type]?.(entry.name) || type), lang);
  const prestige = prestigeLabels[lang][entry.prestige] || entry.prestige;
  const recognition = recognitionLabels[lang][entry.clientRecognition] || entry.clientRecognition;
  const pairings = Array.from(new Set(entry.wineTypes.flatMap((type) => copy.pairings[type] || []))).slice(0, 6);

  return {
    styles: entry.wineTypes.map((type) => copy.style[type]?.(entry.name) || type),
    cartaReading: copy.cartaReading(entry, prestige, recognition),
    whenToHighlight: copy.whenToHighlight(entry),
    clientProfile: copy.clientProfile(entry, recognition),
    sellByStrategy: copy.sellByStrategy(entry, grapes),
    commonMistakes: copy.mistakes(entry),
    pairings,
    faqs: copy.faqs(entry, grapes, styles),
  };
};

const buildCountryOverlay = (country: WineCountry, lang: WineI18nLang): CountryI18nOverlay => {
  const name = localizeCountryName(country.name, lang);
  const topRegions = formatList(country.topRegions.map((slug) => slug.replace(/-/g, " ")), lang);
  const differentialRegions = formatList(country.differentialRegions.map((slug) => slug.replace(/-/g, " ")), lang);

  const copy: Record<WineI18nLang, CountryI18nOverlay> = {
    en: {
      name,
      intro: `${name} brings together ${country.denominationsCount.toLocaleString()} denominations and ${country.bodegasCount.toLocaleString()} wineries in the Winerim library. Its strongest signals on a restaurant wine list include ${topRegions || "benchmark regions"}, while ${differentialRegions || "emerging regions"} add discovery and range.`,
      classificationExplainer: `${name} is organized through ${country.denominationTypes}. Use these categories to explain origin, quality level and the amount of flexibility producers have in each wine style.`,
      howToReadInCarta: `${name} should be read by balancing familiar regions with discovery areas. The strongest regions create trust, while differential areas help the wine list show expertise and better value.`,
      seo: {
        title: seoTitle(`${name}: wine regions and denominations`),
        description: seoDescription(`Guide to ${name} wine regions: denominations, main zones, commercial role and wine-list strategy for restaurants.`),
      },
    },
    fr: {
      name,
      intro: `${name} réunit ${country.denominationsCount.toLocaleString()} appellations et ${country.bodegasCount.toLocaleString()} domaines dans la bibliothèque Winerim. Ses repères les plus forts en carte incluent ${topRegions || "les régions de référence"}, tandis que ${differentialRegions || "les régions émergentes"} ajoutent découverte et profondeur.`,
      classificationExplainer: `${name} s'organise autour de ${country.denominationTypes}. Ces catégories aident à expliquer l'origine, le niveau de qualité et la liberté dont dispose le producteur selon le style.`,
      howToReadInCarta: `${name} se lit en équilibrant régions connues et zones de découverte. Les références créent la confiance, les régions différenciantes montrent expertise et valeur.`,
      seo: {
        title: seoTitle(`${name}: régions et appellations`),
        description: seoDescription(`Guide des régions viticoles de ${name}: appellations, zones clés, rôle commercial et stratégie de carte.`),
      },
    },
    it: {
      name,
      intro: `${name} riunisce ${country.denominationsCount.toLocaleString()} denominazioni e ${country.bodegasCount.toLocaleString()} cantine nella biblioteca Winerim. I segnali più forti in carta includono ${topRegions || "le regioni di riferimento"}, mentre ${differentialRegions || "le aree emergenti"} aggiungono scoperta e profondità.`,
      classificationExplainer: `${name} si organizza attraverso ${country.denominationTypes}. Queste categorie aiutano a spiegare origine, livello qualitativo e libertà produttiva nei diversi stili.`,
      howToReadInCarta: `${name} va letto bilanciando regioni note e aree di scoperta. Le denominazioni forti creano fiducia, quelle differenziali mostrano competenza e valore.`,
      seo: {
        title: seoTitle(`${name}: regioni e denominazioni`),
        description: seoDescription(`Guida alle regioni vinicole di ${name}: denominazioni, zone chiave, ruolo commerciale e strategia in carta.`),
      },
    },
    de: {
      name,
      intro: `${name} umfasst in der Winerim Bibliothek ${country.denominationsCount.toLocaleString()} Herkunftsbezeichnungen und ${country.bodegasCount.toLocaleString()} Weingüter. Starke Signale auf der Weinkarte sind ${topRegions || "wichtige Regionen"}, während ${differentialRegions || "aufstrebende Gebiete"} Entdeckung und Tiefe bieten.`,
      classificationExplainer: `${name} ist über ${country.denominationTypes} strukturiert. Diese Kategorien erklären Herkunft, Qualitätsniveau und den Spielraum der Erzeuger je nach Weinstil.`,
      howToReadInCarta: `${name} funktioniert auf der Weinkarte durch die Balance aus bekannten Regionen und Entdeckungsgebieten. Bekannte Namen schaffen Vertrauen, differenzierende Gebiete zeigen Fachwissen und Wert.`,
      seo: {
        title: seoTitle(`${name}: Weinregionen und Herkunft`),
        description: seoDescription(`Guide zu Weinregionen in ${name}: Herkunft, wichtige Zonen, kommerzielle Rolle und Weinkartenstrategie.`),
      },
    },
    pt: {
      name,
      intro: `${name} reúne ${country.denominationsCount.toLocaleString()} denominações e ${country.bodegasCount.toLocaleString()} adegas na biblioteca Winerim. Os sinais mais fortes na carta incluem ${topRegions || "regiões de referência"}, enquanto ${differentialRegions || "regiões emergentes"} acrescentam descoberta e profundidade.`,
      classificationExplainer: `${name} organiza-se através de ${country.denominationTypes}. Estas categorias ajudam a explicar origem, nível de qualidade e margem de trabalho dos produtores em cada estilo.`,
      howToReadInCarta: `${name} deve ser lido equilibrando regiões conhecidas e zonas de descoberta. As regiões fortes criam confiança, enquanto as diferenciais mostram critério e valor.`,
      seo: {
        title: seoTitle(`${name}: regiões e denominações`),
        description: seoDescription(`Guia das regiões vinícolas de ${name}: denominações, zonas principais, papel comercial e estratégia de carta.`),
      },
    },
  };

  return copy[lang];
};

export const regionOverlays: RegionOverlays = Object.fromEntries(
  regionEntries.map((entry) => [
    entry.slug,
    Object.fromEntries(
      (["en", "fr", "it", "de", "pt"] satisfies WineI18nLang[]).map((lang) => [lang, buildRegionOverlay(entry, lang)])
    ),
  ])
) as RegionOverlays;

export const countryOverlays: CountryOverlays = Object.fromEntries(
  wineCountries.map((country) => [
    country.slug,
    Object.fromEntries(
      (["en", "fr", "it", "de", "pt"] satisfies WineI18nLang[]).map((lang) => [lang, buildCountryOverlay(country, lang)])
    ),
  ])
) as CountryOverlays;

const applyRegionOverlay = <T extends RegionEntry>(entry: T, lang?: string): T => {
  const overlayLang = normalizeWineOverlayLang(lang);
  const overlay = overlayLang ? regionOverlays[entry.slug]?.[overlayLang] : undefined;
  if (!overlay) return entry;
  const localizedRuntime = buildLocalizedRuntimeRegion(entry, overlayLang);
  return {
    ...entry,
    ...localizedRuntime,
    description: overlay.description,
    intro: overlay.intro,
    seo: { ...entry.seo, ...overlay.seo },
  };
};

const applyCountryOverlay = <T extends WineCountry>(country: T, lang?: string): T => {
  const overlayLang = normalizeWineOverlayLang(lang);
  const overlay = overlayLang ? countryOverlays[country.slug]?.[overlayLang] : undefined;
  if (!overlay) return country;
  return {
    ...country,
    name: overlay.name,
    intro: overlay.intro,
    classificationExplainer: overlay.classificationExplainer,
    howToReadInCarta: overlay.howToReadInCarta,
    seo: { ...country.seo, ...overlay.seo },
  };
};

export const getLocalizedCountries = (lang?: string): WineCountry[] =>
  wineCountries.map((country) => applyCountryOverlay(country, lang));

export const getLocalizedCountryBySlug = (slug: string, lang?: string): WineCountry | undefined => {
  const country = wineCountries.find((entry) => entry.slug === slug);
  return country ? applyCountryOverlay(country, lang) : undefined;
};

export const getLocalizedRegions = (lang?: string): RegionEntry[] =>
  regionEntries.map((entry) => applyRegionOverlay(entry, lang));

export const getLocalizedRegionBySlug = (slug: string, lang?: string): RegionEntry | undefined => {
  const entry = regionEntries.find((region) => region.slug === slug);
  return entry ? applyRegionOverlay(entry, lang) : undefined;
};

export const getLocalizedRegionsByCountry = (countrySlug: string, lang?: string): RegionEntry[] =>
  regionEntries.filter((region) => region.country === countrySlug).map((entry) => applyRegionOverlay(entry, lang));

export const getResolvedWineLang = resolveWineLang;
