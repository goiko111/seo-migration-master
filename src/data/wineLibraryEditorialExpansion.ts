type WineExpansionLang = "es" | "en" | "it" | "fr" | "de" | "pt";

type LocalizedTextBlock = {
  role: (name: string) => string;
  floorCue: string;
  commercialLever: string;
  avoid: string;
};

type ProfileCopy = {
  eyebrow: string;
  title: (name: string) => string;
  subtitle: string;
  labels: {
    serviceTemp: string;
    glass: string;
    byTheGlass: string;
    moment: string;
    defaultWines: string;
    role: string;
    floorCue: string;
    commercialLever: string;
    avoid: string;
    upsell: string;
    menu: string;
  };
  faqService: (name: string, temp: string) => { q: string; a: string };
  faqList: (name: string, byTheGlass: string) => { q: string; a: string };
  faqPairing: (name: string, wines: string) => { q: string; a: string };
};

type BaseProfile = {
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
};

type RegionArchetype =
  | "classicRed"
  | "premiumRed"
  | "mediterraneanRed"
  | "elegantRed"
  | "aromaticWhite"
  | "mineralWhite"
  | "fortified"
  | "sparkling";

type StyleArchetype =
  | "freshRed"
  | "lightRed"
  | "structuredRed"
  | "freshWhite"
  | "mineralWhite"
  | "premiumSparkling"
  | "tableSparkling"
  | "florFortified"
  | "sweetFortified"
  | "orange";

type PairingArchetype =
  | "poultry"
  | "vegetable"
  | "dessert"
  | "aperitif"
  | "leanBeef"
  | "lamb"
  | "duck"
  | "tuna"
  | "octopus"
  | "mushroom"
  | "oysters"
  | "chocolate";

const langs: WineExpansionLang[] = ["es", "en", "it", "fr", "de", "pt"];
const langFallback = (lang: string): WineExpansionLang =>
  langs.includes(lang as WineExpansionLang) ? (lang as WineExpansionLang) : "en";

const profileCopy: Record<WineExpansionLang, ProfileCopy> = {
  es: {
    eyebrow: "Inteligencia de carta",
    title: (name) => `Como usar ${name} en una carta de vinos`,
    subtitle: "Lectura practica para compra, servicio, rotacion y maridaje.",
    labels: { serviceTemp: "Servicio", glass: "Copa", byTheGlass: "Por copa", moment: "Momento", defaultWines: "Vinos base", role: "Rol en carta", floorCue: "Guion de sala", commercialLever: "Palanca comercial", avoid: "Error a evitar", upsell: "Ruta de upsell", menu: "Usos utiles" },
    faqService: (name, temp) => ({ q: `Como servir ${name}?`, a: `Usa ${temp} como punto de partida y ajusta segun cuerpo, anada, plato y ritmo de sala.` }),
    faqList: (name, byTheGlass) => ({ q: `Como incluir ${name} en una carta?`, a: `Incluye una referencia facil de leer y una ruta premium. Para copa: ${byTheGlass}` }),
    faqPairing: (name, wines) => ({ q: `Que vinos funcionan con ${name}?`, a: `Empieza por ${wines} y ajusta segun grasa, salsa, intensidad y temperatura de servicio.` }),
  },
  en: {
    eyebrow: "Wine-list intelligence",
    title: (name) => `How to use ${name} on a wine list`,
    subtitle: "Practical reading for buying, service, rotation and pairing.",
    labels: { serviceTemp: "Service", glass: "Glass", byTheGlass: "By the glass", moment: "Moment", defaultWines: "Core wines", role: "Role on the list", floorCue: "Floor cue", commercialLever: "Commercial lever", avoid: "Mistake to avoid", upsell: "Upsell route", menu: "Useful uses" },
    faqService: (name, temp) => ({ q: `How should ${name} be served?`, a: `Use ${temp} as a starting point and adjust by body, vintage, dish and service pace.` }),
    faqList: (name, byTheGlass) => ({ q: `How should a restaurant include ${name}?`, a: `Include one easy-reading reference and one premium route. By the glass: ${byTheGlass}` }),
    faqPairing: (name, wines) => ({ q: `Which wines work with ${name}?`, a: `Start with ${wines} and adjust by fat, sauce, intensity and serving temperature.` }),
  },
  it: {
    eyebrow: "Intelligenza di carta",
    title: (name) => `Come usare ${name} in carta`,
    subtitle: "Lettura pratica per acquisto, servizio, rotazione e abbinamento.",
    labels: { serviceTemp: "Servizio", glass: "Calice", byTheGlass: "Al calice", moment: "Momento", defaultWines: "Vini base", role: "Ruolo in carta", floorCue: "Indicazione di sala", commercialLever: "Leva commerciale", avoid: "Errore da evitare", upsell: "Percorso upsell", menu: "Usi utili" },
    faqService: (name, temp) => ({ q: `Come servire ${name}?`, a: `Usa ${temp} come partenza e regola in base a corpo, annata, piatto e ritmo di sala.` }),
    faqList: (name, byTheGlass) => ({ q: `Come includere ${name} in carta?`, a: `Inserisci una referenza leggibile e un percorso premium. Al calice: ${byTheGlass}` }),
    faqPairing: (name, wines) => ({ q: `Quali vini funzionano con ${name}?`, a: `Parti da ${wines} e regola per grasso, salsa, intensita e temperatura.` }),
  },
  fr: {
    eyebrow: "Intelligence de carte",
    title: (name) => `Comment utiliser ${name} en carte`,
    subtitle: "Lecture pratique pour achat, service, rotation et accord.",
    labels: { serviceTemp: "Service", glass: "Verre", byTheGlass: "Au verre", moment: "Moment", defaultWines: "Vins de base", role: "Role en carte", floorCue: "Argument de salle", commercialLever: "Levier commercial", avoid: "Erreur a eviter", upsell: "Route de montee en gamme", menu: "Usages utiles" },
    faqService: (name, temp) => ({ q: `Comment servir ${name} ?`, a: `Utilisez ${temp} comme point de depart et ajustez selon corps, millesime, plat et rythme de service.` }),
    faqList: (name, byTheGlass) => ({ q: `Comment inclure ${name} en carte ?`, a: `Ajoutez une reference lisible et une route premium. Au verre : ${byTheGlass}` }),
    faqPairing: (name, wines) => ({ q: `Quels vins fonctionnent avec ${name} ?`, a: `Commencez par ${wines} et ajustez selon gras, sauce, intensite et temperature.` }),
  },
  de: {
    eyebrow: "Weinkarten-Intelligenz",
    title: (name) => `Wie ${name} auf der Weinkarte funktioniert`,
    subtitle: "Praktische Lesart fur Einkauf, Service, Rotation und Pairing.",
    labels: { serviceTemp: "Service", glass: "Glas", byTheGlass: "Im Glas", moment: "Moment", defaultWines: "Basisweine", role: "Rolle auf der Weinkarte", floorCue: "Service-Argument", commercialLever: "Kommerzieller Hebel", avoid: "Fehler vermeiden", upsell: "Upsell-Route", menu: "Nutzliche Einsatze" },
    faqService: (name, temp) => ({ q: `Wie sollte ${name} serviert werden?`, a: `${temp} als Ausgangspunkt nutzen und nach Korper, Jahrgang, Gericht und Servicetempo anpassen.` }),
    faqList: (name, byTheGlass) => ({ q: `Wie sollte ein Restaurant ${name} aufnehmen?`, a: `Eine leicht lesbare Referenz und eine Premiumroute aufnehmen. Im Glas: ${byTheGlass}` }),
    faqPairing: (name, wines) => ({ q: `Welche Weine passen zu ${name}?`, a: `Mit ${wines} starten und nach Fett, Sauce, Intensitat und Temperatur anpassen.` }),
  },
  pt: {
    eyebrow: "Inteligencia de carta",
    title: (name) => `Como usar ${name} numa carta de vinhos`,
    subtitle: "Leitura pratica para compra, servico, rotacao e harmonizacao.",
    labels: { serviceTemp: "Servico", glass: "Copo", byTheGlass: "A copo", moment: "Momento", defaultWines: "Vinhos base", role: "Papel na carta", floorCue: "Argumento de sala", commercialLever: "Alavanca comercial", avoid: "Erro a evitar", upsell: "Rota de upsell", menu: "Usos uteis" },
    faqService: (name, temp) => ({ q: `Como servir ${name}?`, a: `Use ${temp} como ponto de partida e ajuste por corpo, colheita, prato e ritmo de sala.` }),
    faqList: (name, byTheGlass) => ({ q: `Como incluir ${name} numa carta?`, a: `Inclua uma referencia facil de ler e uma rota premium. A copo: ${byTheGlass}` }),
    faqPairing: (name, wines) => ({ q: `Que vinhos funcionam com ${name}?`, a: `Comece por ${wines} e ajuste por gordura, molho, intensidade e temperatura.` }),
  },
};

const text = (
  es: LocalizedTextBlock,
  en: LocalizedTextBlock,
  it: LocalizedTextBlock,
  fr: LocalizedTextBlock,
  de: LocalizedTextBlock,
  pt: LocalizedTextBlock,
) => ({ es, en, it, fr, de, pt });

const sharedText = {
  classicRed: text(
    { role: (name) => `${name} aporta una referencia tinta reconocible para ordenar la carta por origen, productor y nivel de crianza.`, floorCue: "Habla de acidez, tanino y plato antes de hablar de precio.", commercialLever: "Funciona como escalera de ticket: copa segura, productor serio y botella premium.", avoid: "No convertirlo en una categoria plana; diferencia pueblo, anada o productor." },
    { role: (name) => `${name} gives the list a recognizable red reference structured by origin, producer and ageing level.`, floorCue: "Talk acidity, tannin and dish before price.", commercialLever: "It creates a spend ladder: safe glass, serious producer and premium bottle.", avoid: "Do not make it a flat category; separate village, vintage or producer." },
    { role: (name) => `${name} porta una referenza rossa riconoscibile, ordinata per origine, produttore e affinamento.`, floorCue: "Parla di acidita, tannino e piatto prima del prezzo.", commercialLever: "Crea una scala: calice sicuro, produttore serio e bottiglia premium.", avoid: "Non renderlo una categoria piatta; distingui villaggio, annata o produttore." },
    { role: (name) => `${name} apporte une reference rouge lisible, structuree par origine, producteur et elevage.`, floorCue: "Parlez acidite, tanin et plat avant le prix.", commercialLever: "Cree une echelle : verre sur, producteur serieux et bouteille premium.", avoid: "Ne pas aplatir la categorie ; distinguez village, millesime ou producteur." },
    { role: (name) => `${name} gibt der Karte eine erkennbare Rotweinreferenz nach Herkunft, Produzent und Ausbau.`, floorCue: "Saure, Tannin und Gericht vor dem Preis erklaren.", commercialLever: "Schafft eine Leiter: sicheres Glas, starker Produzent und Premiumflasche.", avoid: "Nicht als flache Kategorie behandeln; Dorf, Jahrgang oder Produzent trennen." },
    { role: (name) => `${name} da a carta uma referencia tinta reconhecivel por origem, produtor e estagio.`, floorCue: "Fale de acidez, tanino e prato antes de falar de preco.", commercialLever: "Cria uma escada: copo seguro, produtor serio e garrafa premium.", avoid: "Nao tornar a categoria plana; diferencie vila, colheita ou produtor." },
  ),
  premiumRed: text(
    { role: (name) => `${name} sirve para construir una zona premium de tintos con estructura, marca y ocasion de consumo.`, floorCue: "Conecta fruta, tanino y prestigio con el plato principal.", commercialLever: "Sube ticket en mesas de carne, celebracion y menus largos.", avoid: "No recomendar sin aireacion o sin comida cuando el vino es joven y concentrado." },
    { role: (name) => `${name} builds a premium red zone with structure, brand power and occasion value.`, floorCue: "Connect fruit, tannin and prestige to the main dish.", commercialLever: "It lifts spend at meat, celebration and long-menu tables.", avoid: "Do not recommend without air or food when the wine is young and concentrated." },
    { role: (name) => `${name} costruisce una zona premium di rossi con struttura, marca e occasione.`, floorCue: "Collega frutto, tannino e prestigio al piatto principale.", commercialLever: "Alza lo scontrino con carne, celebrazioni e menu lunghi.", avoid: "Non consigliare senza aria o cibo quando il vino e giovane e concentrato." },
    { role: (name) => `${name} construit une zone premium de rouges avec structure, marque et occasion.`, floorCue: "Reliez fruit, tanin et prestige au plat principal.", commercialLever: "Augmente le ticket sur viande, celebration et menus longs.", avoid: "Ne pas recommander sans air ni plat quand le vin est jeune et concentre." },
    { role: (name) => `${name} baut eine Premiumzone fur strukturierte Rotweine mit Marke und Anlass auf.`, floorCue: "Frucht, Tannin und Prestige mit dem Hauptgericht verbinden.", commercialLever: "Hebt den Bon bei Fleisch, Feier und langen Menus.", avoid: "Jung und konzentriert nicht ohne Luft oder Essen empfehlen." },
    { role: (name) => `${name} cria uma zona premium de tintos com estrutura, marca e ocasiao.`, floorCue: "Ligue fruta, tanino e prestigio ao prato principal.", commercialLever: "Sobe ticket em carne, celebracoes e menus longos.", avoid: "Nao recomendar sem ar ou comida quando jovem e concentrado." },
  ),
  mediterraneanRed: text(
    { role: (name) => `${name} aporta sol, fruta y origen mediterraneo para tintos gastronomicos y cartas con brasa.`, floorCue: "Vende madurez y especia, pero equilibra siempre con frescura.", commercialLever: "Ayuda a diferenciar por origen sin exigir demasiada explicacion.", avoid: "No servir caliente: el alcohol pesa y reduce precision." },
    { role: (name) => `${name} brings sun, fruit and Mediterranean origin for food-friendly reds and grill-led lists.`, floorCue: "Sell ripeness and spice, but keep freshness in the story.", commercialLever: "It differentiates by origin without too much explanation.", avoid: "Do not serve warm: alcohol becomes heavy and precision drops." },
    { role: (name) => `${name} porta sole, frutto e origine mediterranea per rossi gastronomici e brace.`, floorCue: "Vendi maturita e spezia, ma bilancia con freschezza.", commercialLever: "Differenzia per origine senza troppa spiegazione.", avoid: "Non servire caldo: l'alcol pesa e perde precisione." },
    { role: (name) => `${name} apporte soleil, fruit et origine mediterraneenne pour rouges gastronomiques et grillades.`, floorCue: "Vendez maturite et epices, mais gardez la fraicheur.", commercialLever: "Differencie par origine sans trop d'explication.", avoid: "Ne pas servir chaud : l'alcool pese et la precision baisse." },
    { role: (name) => `${name} bringt Sonne, Frucht und mediterrane Herkunft fur Essen und Grill.`, floorCue: "Reife und Wurze verkaufen, aber Frische im Gleichgewicht halten.", commercialLever: "Differenziert uber Herkunft ohne lange Erklarung.", avoid: "Nicht warm servieren: Alkohol wirkt schwer und Prazision sinkt." },
    { role: (name) => `${name} traz sol, fruta e origem mediterranica para tintos gastronomicos e grelha.`, floorCue: "Venda maturidade e especiaria, mas mantenha frescura.", commercialLever: "Diferencia por origem sem explicacao longa.", avoid: "Nao servir quente: o alcool pesa e reduz precisao." },
  ),
  elegantRed: text(
    { role: (name) => `${name} cubre el espacio de tinto elegante para clientes que buscan finura antes que potencia.`, floorCue: "Habla de textura, acidez y aroma delicado; sirve ligeramente fresco.", commercialLever: "Permite vender premium a mesas que no quieren tanino dominante.", avoid: "No presentarlo como tinto ligero sin valor: la palabra clave es precision." },
    { role: (name) => `${name} covers the elegant-red slot for guests seeking finesse before power.`, floorCue: "Talk texture, acidity and delicate aroma; serve slightly cool.", commercialLever: "It sells premium to tables that do not want dominant tannin.", avoid: "Do not present it as light and low-value; the key word is precision." },
    { role: (name) => `${name} copre lo spazio del rosso elegante per chi cerca finezza prima della potenza.`, floorCue: "Parla di texture, acidita e aroma delicato; servi leggermente fresco.", commercialLever: "Vende premium a tavoli che non vogliono tannino dominante.", avoid: "Non presentarlo come rosso leggero senza valore: la chiave e precisione." },
    { role: (name) => `${name} couvre l'espace du rouge elegant pour clients qui cherchent finesse avant puissance.`, floorCue: "Parlez texture, acidite et aromes delicats ; servez legerement frais.", commercialLever: "Vend du premium aux tables qui ne veulent pas de tanin dominant.", avoid: "Ne pas le presenter comme rouge leger sans valeur : la cle est precision." },
    { role: (name) => `${name} besetzt den eleganten Rotweinplatz fur Gaste, die Finesse vor Kraft suchen.`, floorCue: "Textur, Saure und feines Aroma nennen; leicht kuhl servieren.", commercialLever: "Verkauft Premium an Tische ohne dominantes Tannin.", avoid: "Nicht als leichten Wein ohne Wert darstellen: Prazision ist das Stichwort." },
    { role: (name) => `${name} cobre o espaco de tinto elegante para clientes que procuram finura antes de potencia.`, floorCue: "Fale de textura, acidez e aroma delicado; sirva ligeiramente fresco.", commercialLever: "Vende premium a mesas que nao querem tanino dominante.", avoid: "Nao apresentar como tinto leve sem valor: a palavra chave e precisao." },
  ),
  aromaticWhite: text(
    { role: (name) => `${name} es una referencia aromatica para vender frescura, precision y origen reconocible en blancos.`, floorCue: "Aclara dulzor, acidez y perfil aromatico para evitar dudas.", commercialLever: "Muy fuerte por copa si el equipo sabe explicarlo en una frase.", avoid: "No servir demasiado frio ni mezclarlo con blancos genericos de la casa." },
    { role: (name) => `${name} is an aromatic reference for selling freshness, precision and recognizable white-wine origin.`, floorCue: "Clarify sweetness, acidity and aromatic profile to avoid doubt.", commercialLever: "Strong by the glass when the team can explain it in one sentence.", avoid: "Do not serve too cold or blend it into generic house-white language." },
    { role: (name) => `${name} e una referenza aromatica per vendere freschezza, precisione e origine nei bianchi.`, floorCue: "Chiarisci dolcezza, acidita e profilo aromatico.", commercialLever: "Forte al calice se la sala lo spiega in una frase.", avoid: "Non servire troppo freddo ne confonderlo con il bianco generico." },
    { role: (name) => `${name} est une reference aromatique pour vendre fraicheur, precision et origine des blancs.`, floorCue: "Clarifiez sucre, acidite et profil aromatique.", commercialLever: "Tres fort au verre si l'equipe sait l'expliquer en une phrase.", avoid: "Ne pas servir trop froid ni le fondre dans les blancs generiques." },
    { role: (name) => `${name} ist eine aromatische Referenz fur Frische, Prazision und erkennbare Herkunft.`, floorCue: "Susse, Saure und Aromatik klaren, damit keine Zweifel bleiben.", commercialLever: "Stark im Glas, wenn das Team ihn in einem Satz erklaren kann.", avoid: "Nicht zu kalt servieren oder als generischen Hauswein beschreiben." },
    { role: (name) => `${name} e referencia aromatica para vender frescura, precisao e origem reconhecivel em brancos.`, floorCue: "Clarifique docura, acidez e perfil aromatico.", commercialLever: "Muito forte a copo se a equipa explica em uma frase.", avoid: "Nao servir demasiado frio nem misturar com brancos genericos." },
  ),
  mineralWhite: text(
    { role: (name) => `${name} permite vender blanco gastronomico con tension, salinidad y mas precio medio.`, floorCue: "Traduce mineralidad en sensacion: sal, acidez, textura y final limpio.", commercialLever: "Abre upsell desde el blanco fresco hacia botella de productor.", avoid: "No describirlo solo como seco; explica por que funciona con comida." },
    { role: (name) => `${name} sells gastronomic white wine with tension, salinity and a higher average price.`, floorCue: "Translate minerality into sensation: salt, acidity, texture and clean finish.", commercialLever: "It opens upsell from fresh white into producer bottles.", avoid: "Do not describe it only as dry; explain why it works with food." },
    { role: (name) => `${name} vende bianco gastronomico con tensione, salinita e prezzo medio piu alto.`, floorCue: "Traduci mineralita in sensazioni: sale, acidita, texture e finale pulito.", commercialLever: "Apre upsell dal bianco fresco alla bottiglia di produttore.", avoid: "Non descriverlo solo come secco; spiega perche funziona col cibo." },
    { role: (name) => `${name} vend du blanc gastronomique avec tension, salinite et prix moyen plus eleve.`, floorCue: "Traduisez mineralite en sensations : sel, acidite, texture et finale nette.", commercialLever: "Ouvre la montee en gamme du blanc frais vers producteur.", avoid: "Ne pas le decrire seulement comme sec ; expliquez son usage a table." },
    { role: (name) => `${name} verkauft gastronomischen Weisswein mit Spannung, Salinitat und hoherem Durchschnittspreis.`, floorCue: "Mineralitat in Gefuhl ubersetzen: Salz, Saure, Textur und klarer Nachhall.", commercialLever: "Offnet Upsell vom frischen Weisswein zur Produzentenflasche.", avoid: "Nicht nur als trocken beschreiben; den Essensnutzen erklaren." },
    { role: (name) => `${name} vende branco gastronomico com tensao, salinidade e preco medio superior.`, floorCue: "Traduza mineralidade em sensacao: sal, acidez, textura e final limpo.", commercialLever: "Abre upsell do branco fresco para garrafa de produtor.", avoid: "Nao descrever apenas como seco; explique porque funciona a mesa." },
  ),
  fortified: text(
    { role: (name) => `${name} crea una zona de servicio experto para aperitivo, quesos, postres y cierre de mesa.`, floorCue: "Explica seco/dulce, temperatura y copa pequena antes de hablar de graduacion.", commercialLever: "Genera margen en medias copas, menus largos y recomendaciones de final.", avoid: "No esconderlo como rareza; necesita un uso concreto en la experiencia." },
    { role: (name) => `${name} creates an expert service zone for aperitif, cheese, dessert and table closure.`, floorCue: "Explain dry/sweet, temperature and small pour before alcohol strength.", commercialLever: "It creates margin in half-pours, long menus and closing recommendations.", avoid: "Do not hide it as a curiosity; it needs a concrete use in the experience." },
    { role: (name) => `${name} crea una zona esperta per aperitivo, formaggi, dessert e chiusura tavola.`, floorCue: "Spiega secco/dolce, temperatura e piccola mescita prima del grado.", commercialLever: "Genera margine in mezzi calici, menu lunghi e finali.", avoid: "Non nasconderlo come curiosita; serve un uso concreto." },
    { role: (name) => `${name} cree une zone experte pour aperitif, fromage, dessert et fin de table.`, floorCue: "Expliquez sec/doux, temperature et petit service avant l'alcool.", commercialLever: "Cree de la marge en demi-verres, menus longs et fins de repas.", avoid: "Ne pas le cacher comme curiosite ; il demande un usage concret." },
    { role: (name) => `${name} schafft eine Expertenzone fur Aperitif, Kase, Dessert und Abschluss.`, floorCue: "Trocken/suss, Temperatur und kleiner Ausschank vor Alkohol erklaren.", commercialLever: "Bringt Marge bei kleinen Glasern, langen Menus und Abschlussservice.", avoid: "Nicht als Kuriositat verstecken; er braucht einen konkreten Einsatz." },
    { role: (name) => `${name} cria uma zona especialista para aperitivo, queijo, sobremesa e fim de mesa.`, floorCue: "Explique seco/doce, temperatura e dose pequena antes do alcool.", commercialLever: "Gera margem em meios copos, menus longos e recomendacoes finais.", avoid: "Nao esconder como curiosidade; precisa de uso concreto." },
  ),
  sparkling: text(
    { role: (name) => `${name} convierte aperitivo, celebracion y maridaje en una misma oportunidad de carta.`, floorCue: "Habla de metodo, crianza y dosage para justificar diferencia de precio.", commercialLever: "Muy util por copa, brindis, menu degustacion y marisco.", avoid: "No relegarlo al postre ni servirlo en copa inadecuada." },
    { role: (name) => `${name} turns aperitif, celebration and pairing into one wine-list opportunity.`, floorCue: "Talk method, ageing and dosage to explain price difference.", commercialLever: "Very useful by the glass, for toasts, tasting menus and seafood.", avoid: "Do not relegate it to dessert or unsuitable glassware." },
    { role: (name) => `${name} trasforma aperitivo, celebrazione e abbinamento in una sola opportunita.`, floorCue: "Parla di metodo, affinamento e dosage per spiegare il prezzo.", commercialLever: "Molto utile al calice, brindisi, degustazione e frutti di mare.", avoid: "Non relegarlo al dessert ne usare calici inadatti." },
    { role: (name) => `${name} transforme aperitif, celebration et accord en une meme opportunite.`, floorCue: "Parlez methode, elevage et dosage pour expliquer le prix.", commercialLever: "Tres utile au verre, toast, degustation et fruits de mer.", avoid: "Ne pas le releguer au dessert ni au mauvais verre." },
    { role: (name) => `${name} verbindet Aperitif, Anlass und Pairing als eine Kartenchance.`, floorCue: "Methode, Reife und Dosage erklaren, um Preisunterschiede sichtbar zu machen.", commercialLever: "Sehr nutzlich im Glas, zum Anstossen, im Menu und zu Meeresfruchten.", avoid: "Nicht auf Dessert reduzieren oder im falschen Glas servieren." },
    { role: (name) => `${name} transforma aperitivo, celebracao e harmonizacao numa oportunidade de carta.`, floorCue: "Fale de metodo, estagio e dosage para explicar preco.", commercialLever: "Muito util a copo, brindes, degustacao e marisco.", avoid: "Nao relegar a sobremesa nem servir em copo errado." },
  ),
};

const styleText: Record<StyleArchetype, Record<WineExpansionLang, LocalizedTextBlock>> = {
  freshRed: sharedText.classicRed,
  lightRed: sharedText.elegantRed,
  structuredRed: sharedText.premiumRed,
  freshWhite: sharedText.aromaticWhite,
  mineralWhite: sharedText.mineralWhite,
  premiumSparkling: sharedText.sparkling,
  tableSparkling: sharedText.sparkling,
  florFortified: sharedText.fortified,
  sweetFortified: sharedText.fortified,
  orange: sharedText.mediterraneanRed,
};

const pairingText: Record<PairingArchetype, Record<WineExpansionLang, LocalizedTextBlock & { upsell: string }>> = {
  poultry: addUpsell(sharedText.elegantRed, "Pinot Noir / Chardonnay premium"),
  vegetable: addUpsell(sharedText.mineralWhite, "blanco mineral / rosado gastronomico"),
  dessert: addUpsell(sharedText.fortified, "vino dulce / espumoso demi-sec"),
  aperitif: addUpsell(sharedText.sparkling, "espumoso / fino / blanco fresco"),
  leanBeef: addUpsell(sharedText.classicRed, "reserva / Cabernet / Tempranillo de productor"),
  lamb: addUpsell(sharedText.classicRed, "Rioja reserva / Ribera / Garnacha vieja"),
  duck: addUpsell(sharedText.elegantRed, "Pinot Noir / Nebbiolo / Garnacha fina"),
  tuna: addUpsell(sharedText.elegantRed, "Pinot Noir / rosado / blanco con lias"),
  octopus: addUpsell(sharedText.mediterraneanRed, "Godello / Mencia / espumoso"),
  mushroom: addUpsell(sharedText.elegantRed, "Pinot Noir / Nebbiolo / blanco con lias"),
  oysters: addUpsell(sharedText.sparkling, "Champagne / Cava larga crianza / Muscadet"),
  chocolate: addUpsell(sharedText.fortified, "PX / Oporto / Banyuls"),
};

function addUpsell(
  source: Record<WineExpansionLang, LocalizedTextBlock>,
  route: string,
): Record<WineExpansionLang, LocalizedTextBlock & { upsell: string }> {
  return Object.fromEntries(
    langs.map((lang) => [lang, { ...source[lang], upsell: route }])
  ) as Record<WineExpansionLang, LocalizedTextBlock & { upsell: string }>;
}

const hookSets: Record<string, Record<WineExpansionLang, string[]>> = {
  redMeat: {
    es: ["carnes rojas", "cordero", "quesos curados"],
    en: ["red meat", "lamb", "aged cheese"],
    it: ["carni rosse", "agnello", "formaggi stagionati"],
    fr: ["viandes rouges", "agneau", "fromages affines"],
    de: ["rotes Fleisch", "Lamm", "gereifter Kase"],
    pt: ["carnes vermelhas", "borrego", "queijos curados"],
  },
  seafood: {
    es: ["ostras", "pescado blanco", "marisco"],
    en: ["oysters", "white fish", "shellfish"],
    it: ["ostriche", "pesce bianco", "frutti di mare"],
    fr: ["huitres", "poisson blanc", "fruits de mer"],
    de: ["Austern", "weisser Fisch", "Meeresfruchte"],
    pt: ["ostras", "peixe branco", "marisco"],
  },
  vegetable: {
    es: ["verduras", "setas", "arroces"],
    en: ["vegetables", "mushrooms", "rice dishes"],
    it: ["verdure", "funghi", "risotti"],
    fr: ["legumes", "champignons", "riz"],
    de: ["Gemuse", "Pilze", "Reisgerichte"],
    pt: ["legumes", "cogumelos", "arrozes"],
  },
  aperitif: {
    es: ["aperitivo", "tapas", "frituras"],
    en: ["aperitif", "tapas", "fried dishes"],
    it: ["aperitivo", "tapas", "fritti"],
    fr: ["aperitif", "tapas", "fritures"],
    de: ["Aperitif", "Tapas", "Frittiertes"],
    pt: ["aperitivo", "tapas", "fritos"],
  },
  dessert: {
    es: ["chocolate", "quesos azules", "postres"],
    en: ["chocolate", "blue cheese", "desserts"],
    it: ["cioccolato", "formaggi erborinati", "dessert"],
    fr: ["chocolat", "fromages bleus", "desserts"],
    de: ["Schokolade", "Blauschimmelkase", "Desserts"],
    pt: ["chocolate", "queijos azuis", "sobremesas"],
  },
};

export const expandedRegionSlugs = [
  "toscana",
  "napa-valley",
  "jerez",
  "vallee-du-rhone",
  "piemonte",
  "barossa-valley",
  "marlborough",
  "mendoza",
  "mosel",
  "willamette-valley",
  "sancerre",
  "barolo",
] as const;

const expandedRegionSeeds: Record<(typeof expandedRegionSlugs)[number], {
  priority: number;
  serviceTemp: string;
  glass: string;
  archetype: RegionArchetype;
  byTheGlass: string;
  hookSet: keyof typeof hookSets;
}> = {
  "toscana": { priority: 11, serviceTemp: "16-18 C", glass: "Burdeos / universal amplia", archetype: "classicRed", byTheGlass: "Chianti / Sangiovese", hookSet: "redMeat" },
  "napa-valley": { priority: 12, serviceTemp: "16-18 C", glass: "Burdeos amplia", archetype: "premiumRed", byTheGlass: "Cabernet Sauvignon premium", hookSet: "redMeat" },
  "jerez": { priority: 13, serviceTemp: "7-13 C", glass: "Copa de vino blanco / catavinos", archetype: "fortified", byTheGlass: "Fino, Manzanilla o Amontillado", hookSet: "aperitif" },
  "vallee-du-rhone": { priority: 14, serviceTemp: "15-18 C", glass: "Burdeos / Syrah", archetype: "mediterraneanRed", byTheGlass: "Cotes du Rhone / Syrah", hookSet: "redMeat" },
  "piemonte": { priority: 15, serviceTemp: "15-18 C", glass: "Borgona amplia", archetype: "elegantRed", byTheGlass: "Barbera / Nebbiolo joven", hookSet: "redMeat" },
  "barossa-valley": { priority: 16, serviceTemp: "16-18 C", glass: "Syrah / Burdeos amplia", archetype: "premiumRed", byTheGlass: "Shiraz con rotacion", hookSet: "redMeat" },
  "marlborough": { priority: 17, serviceTemp: "7-9 C", glass: "Blanco aromatico", archetype: "aromaticWhite", byTheGlass: "Sauvignon Blanc fresco", hookSet: "seafood" },
  "mendoza": { priority: 18, serviceTemp: "16-18 C", glass: "Burdeos amplia", archetype: "classicRed", byTheGlass: "Malbec de altura", hookSet: "redMeat" },
  "mosel": { priority: 19, serviceTemp: "7-10 C", glass: "Blanco aromatico", archetype: "aromaticWhite", byTheGlass: "Riesling seco o feinherb", hookSet: "seafood" },
  "willamette-valley": { priority: 20, serviceTemp: "13-15 C", glass: "Borgona amplia", archetype: "elegantRed", byTheGlass: "Pinot Noir elegante", hookSet: "vegetable" },
  "sancerre": { priority: 21, serviceTemp: "8-10 C", glass: "Blanco aromatico / universal", archetype: "mineralWhite", byTheGlass: "Sauvignon Blanc mineral", hookSet: "seafood" },
  "barolo": { priority: 22, serviceTemp: "16-18 C", glass: "Borgona / Nebbiolo", archetype: "premiumRed", byTheGlass: "Nebbiolo de productor", hookSet: "redMeat" },
};

export const expandedStyleSlugs = [
  "tinto-joven",
  "tinto-ligero",
  "tinto-cuerpo",
  "blanco-joven",
  "blanco-mineral",
  "champagne",
  "cava",
  "fino-manzanilla",
  "pedro-ximenez",
  "orange-maceracion-corta",
] as const;

const expandedStyleSeeds: Record<(typeof expandedStyleSlugs)[number], {
  priority: number;
  serviceTemp: string;
  glass: string;
  archetype: StyleArchetype;
  byTheGlass: string;
  hookSet: keyof typeof hookSets;
}> = {
  "tinto-joven": { priority: 6, serviceTemp: "13-15 C", glass: "Universal", archetype: "freshRed", byTheGlass: "Mencia, Gamay o Tempranillo joven", hookSet: "aperitif" },
  "tinto-ligero": { priority: 7, serviceTemp: "13-15 C", glass: "Borgona / universal", archetype: "lightRed", byTheGlass: "Pinot Noir, Gamay o Mencia", hookSet: "vegetable" },
  "tinto-cuerpo": { priority: 8, serviceTemp: "16-18 C", glass: "Burdeos amplia", archetype: "structuredRed", byTheGlass: "Cabernet, Syrah o Malbec", hookSet: "redMeat" },
  "blanco-joven": { priority: 9, serviceTemp: "7-9 C", glass: "Blanco joven", archetype: "freshWhite", byTheGlass: "Verdejo, Albarino o Sauvignon Blanc", hookSet: "seafood" },
  "blanco-mineral": { priority: 10, serviceTemp: "8-11 C", glass: "Blanco universal", archetype: "mineralWhite", byTheGlass: "Chablis, Godello, Riesling o Sancerre", hookSet: "seafood" },
  "champagne": { priority: 11, serviceTemp: "6-8 C", glass: "Tulipa / blanco", archetype: "premiumSparkling", byTheGlass: "Brut o Blanc de Blancs", hookSet: "seafood" },
  "cava": { priority: 12, serviceTemp: "6-8 C", glass: "Tulipa / blanco", archetype: "tableSparkling", byTheGlass: "Brut Nature o Reserva", hookSet: "aperitif" },
  "fino-manzanilla": { priority: 13, serviceTemp: "7-9 C", glass: "Copa pequena / blanco", archetype: "florFortified", byTheGlass: "Fino o Manzanilla", hookSet: "aperitif" },
  "pedro-ximenez": { priority: 14, serviceTemp: "10-12 C", glass: "Copa pequena", archetype: "sweetFortified", byTheGlass: "PX por media copa", hookSet: "dessert" },
  "orange-maceracion-corta": { priority: 15, serviceTemp: "10-12 C", glass: "Universal", archetype: "orange", byTheGlass: "Orange joven con baja extraccion", hookSet: "vegetable" },
};

export const expandedPairingSlugs = [
  "aves-y-caza",
  "verduras-y-cocina-vegetariana",
  "postres-y-chocolate",
  "tapas-y-aperitivos",
  "solomillo-de-ternera",
  "cordero-asado",
  "pato-confitado",
  "atun-rojo",
  "pulpo-gallego",
  "risotto-setas",
  "ostras",
  "chocolate-negro",
] as const;

const expandedPairingSeeds: Record<(typeof expandedPairingSlugs)[number], {
  priority: number;
  serviceMoment: string;
  archetype: PairingArchetype;
  byTheGlass: string;
  defaultWines: string;
  hookSet: keyof typeof hookSets;
}> = {
  "aves-y-caza": { priority: 7, serviceMoment: "main course / flexible bottle", archetype: "poultry", byTheGlass: "Pinot Noir, Chardonnay o Garnacha fina", defaultWines: "Pinot Noir, Chardonnay, Garnacha, Nebbiolo", hookSet: "redMeat" },
  "verduras-y-cocina-vegetariana": { priority: 8, serviceMoment: "light mains / by-the-glass", archetype: "vegetable", byTheGlass: "Verdejo serio, Gruner Veltliner o rosado", defaultWines: "Verdejo, Gruner Veltliner, Sauvignon Blanc, rosado", hookSet: "vegetable" },
  "postres-y-chocolate": { priority: 9, serviceMoment: "dessert / closing glass", archetype: "dessert", byTheGlass: "PX, Oporto Tawny o Moscatel", defaultWines: "PX, Oporto, Moscatel, Banyuls", hookSet: "dessert" },
  "tapas-y-aperitivos": { priority: 10, serviceMoment: "aperitif / fast rotation", archetype: "aperitif", byTheGlass: "Cava, Fino, Verdejo o rosado", defaultWines: "Cava, Fino, Verdejo, rosado, Garnacha joven", hookSet: "aperitif" },
  "solomillo-de-ternera": { priority: 11, serviceMoment: "premium main / bottle", archetype: "leanBeef", byTheGlass: "Rioja reserva, Cabernet o Pinot potente", defaultWines: "Tempranillo, Cabernet Sauvignon, Merlot, Syrah", hookSet: "redMeat" },
  "cordero-asado": { priority: 12, serviceMoment: "classic main / bottle", archetype: "lamb", byTheGlass: "Rioja, Ribera o Garnacha vieja", defaultWines: "Tempranillo, Garnacha, Syrah, Cabernet Sauvignon", hookSet: "redMeat" },
  "pato-confitado": { priority: 13, serviceMoment: "rich poultry / bottle", archetype: "duck", byTheGlass: "Pinot Noir, Nebbiolo o Garnacha", defaultWines: "Pinot Noir, Nebbiolo, Garnacha, Barbera", hookSet: "vegetable" },
  "atun-rojo": { priority: 14, serviceMoment: "seafood main / red or rose", archetype: "tuna", byTheGlass: "Pinot Noir, rosado o blanco con lias", defaultWines: "Pinot Noir, Garnacha, rosado, Godello", hookSet: "seafood" },
  "pulpo-gallego": { priority: 15, serviceMoment: "seafood tapas / by-the-glass", archetype: "octopus", byTheGlass: "Godello, Albarino, Mencia o espumoso", defaultWines: "Godello, Albarino, Mencia, Cava", hookSet: "seafood" },
  "risotto-setas": { priority: 16, serviceMoment: "rice / texture pairing", archetype: "mushroom", byTheGlass: "Pinot Noir, Nebbiolo o blanco con lias", defaultWines: "Pinot Noir, Nebbiolo, Chardonnay, Godello", hookSet: "vegetable" },
  "ostras": { priority: 17, serviceMoment: "premium aperitif / upsell", archetype: "oysters", byTheGlass: "Champagne, Cava o Muscadet", defaultWines: "Champagne, Cava, Muscadet, Albarino", hookSet: "seafood" },
  "chocolate-negro": { priority: 18, serviceMoment: "dessert / closing glass", archetype: "chocolate", byTheGlass: "PX, Oporto o Banyuls", defaultWines: "PX, Oporto, Banyuls, Madeira", hookSet: "dessert" },
};

export function getExpandedRegionEditorialProfile(slug: string, lang: string, name: string): BaseProfile | undefined {
  const seed = expandedRegionSeeds[slug as (typeof expandedRegionSlugs)[number]];
  if (!seed) return undefined;
  const resolvedLang = langFallback(lang);
  const copy = profileCopy[resolvedLang];
  const profileText = sharedText[seed.archetype][resolvedLang];
  return {
    slug,
    priority: seed.priority,
    eyebrow: copy.eyebrow,
    title: copy.title(name),
    subtitle: copy.subtitle,
    facts: [
      { label: copy.labels.serviceTemp, value: seed.serviceTemp },
      { label: copy.labels.glass, value: seed.glass },
      { label: copy.labels.byTheGlass, value: seed.byTheGlass },
    ],
    sections: [
      { title: copy.labels.role, body: profileText.role(name) },
      { title: copy.labels.floorCue, body: profileText.floorCue },
      { title: copy.labels.commercialLever, body: profileText.commercialLever },
      { title: copy.labels.avoid, body: profileText.avoid },
    ],
    menuTitle: copy.labels.menu,
    menuHooks: hookSets[seed.hookSet][resolvedLang],
    faqs: [copy.faqService(name, seed.serviceTemp), copy.faqList(name, seed.byTheGlass)],
  };
}

export function getExpandedStyleEditorialProfile(slug: string, lang: string, name: string): BaseProfile | undefined {
  const seed = expandedStyleSeeds[slug as (typeof expandedStyleSlugs)[number]];
  if (!seed) return undefined;
  const resolvedLang = langFallback(lang);
  const copy = profileCopy[resolvedLang];
  const profileText = styleText[seed.archetype][resolvedLang];
  return {
    slug,
    priority: seed.priority,
    eyebrow: copy.eyebrow,
    title: copy.title(name),
    subtitle: copy.subtitle,
    facts: [
      { label: copy.labels.serviceTemp, value: seed.serviceTemp },
      { label: copy.labels.glass, value: seed.glass },
      { label: copy.labels.byTheGlass, value: seed.byTheGlass },
    ],
    sections: [
      { title: copy.labels.role, body: profileText.role(name) },
      { title: copy.labels.floorCue, body: profileText.floorCue },
      { title: copy.labels.commercialLever, body: profileText.commercialLever },
      { title: copy.labels.avoid, body: profileText.avoid },
    ],
    menuTitle: copy.labels.menu,
    menuHooks: hookSets[seed.hookSet][resolvedLang],
    faqs: [copy.faqService(name, seed.serviceTemp), copy.faqList(name, seed.byTheGlass)],
  };
}

export function getExpandedPairingEditorialProfile(slug: string, lang: string, name: string): BaseProfile | undefined {
  const seed = expandedPairingSeeds[slug as (typeof expandedPairingSlugs)[number]];
  if (!seed) return undefined;
  const resolvedLang = langFallback(lang);
  const copy = profileCopy[resolvedLang];
  const profileText = pairingText[seed.archetype][resolvedLang];
  return {
    slug,
    priority: seed.priority,
    eyebrow: copy.eyebrow,
    title: copy.title(name),
    subtitle: copy.subtitle,
    facts: [
      { label: copy.labels.moment, value: seed.serviceMoment },
      { label: copy.labels.byTheGlass, value: seed.byTheGlass },
      { label: copy.labels.defaultWines, value: seed.defaultWines },
    ],
    sections: [
      { title: copy.labels.role, body: profileText.role(name) },
      { title: copy.labels.floorCue, body: profileText.floorCue },
      { title: copy.labels.commercialLever, body: profileText.commercialLever },
      { title: copy.labels.avoid, body: profileText.avoid },
      { title: copy.labels.upsell, body: profileText.upsell },
    ],
    menuTitle: copy.labels.menu,
    menuHooks: hookSets[seed.hookSet][resolvedLang],
    faqs: [copy.faqPairing(name, seed.defaultWines), copy.faqList(name, seed.byTheGlass)],
  };
}
