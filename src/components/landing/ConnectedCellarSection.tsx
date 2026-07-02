import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  FileUp,
  LockKeyhole,
  ListChecks,
  MapPinned,
  PackageCheck,
  ShoppingCart,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { getI18n, type I18nMap } from "@/i18n/types";
import wineCellarMapImg from "@/assets/wine-cellar-map-grupo-jorge.jpg";
import wineLockersSummaryImg from "@/assets/wine-lockers-summary-premium-grille.jpg";

interface ConnectedCellarCopy {
  eyebrow: string;
  title: string;
  highlight: string;
  subtitle: string;
  beforeTitle: string;
  beforeItems: string[];
  afterTitle: string;
  afterItems: string[];
  flowTitle: string;
  flowItems: {
    title: string;
    desc: string;
  }[];
  ctaPrimary: string;
  ctaSecondary: string;
  note: string;
}

interface PhysicalProofCopy {
  title: string;
  subtitle: string;
  items: {
    eyebrow: string;
    title: string;
    desc: string;
    alt: string;
  }[];
}

type ConnectedCellarVariant = "home" | "core" | "supply";

interface ConnectedCellarSectionProps {
  variant?: ConnectedCellarVariant;
}

type ContextualCopyOverride = Partial<ConnectedCellarCopy>;

const copy: I18nMap<ConnectedCellarCopy> = {
  es: {
    eyebrow: "COMO LO HACE WINERIM",
    title: "Subes albaranes. Vendes botellas. Winerim mantiene",
    highlight: "tu bodega en orden",
    subtitle:
      "Conecta compras, TPV, stock, carta y margen para saber que tienes, que vendes y que referencias conviene mover, revisar o reponer.",
    beforeTitle: "Antes",
    beforeItems: [
      "Excel, recuentos manuales y cartas que se quedan desactualizadas.",
      "Costes de compra que cambian sin que el margen se revise a tiempo.",
      "Decisiones de reposicion basadas en intuicion o memoria.",
    ],
    afterTitle: "Con Winerim",
    afterItems: [
      "Albaranes y facturas alimentan compras, costes y referencias.",
      "Cuando conectas tu TPV, cada venta ayuda a mantener el stock alineado.",
      "La carta, la rotacion y el margen se leen desde el mismo sistema.",
    ],
    flowTitle: "Una bodega conectada de punta a punta",
    flowItems: [
      {
        title: "Compras que entran",
        desc: "Sube albaranes y facturas para controlar costes, proveedores y nuevas referencias sin perseguir hojas de calculo.",
      },
      {
        title: "Ventas que salen",
        desc: "Con la integracion TPV activa, las botellas vendidas alimentan el control de stock y la lectura de rotacion.",
      },
      {
        title: "Carta siempre alineada",
        desc: "Precios, disponibilidad, formatos y recomendaciones se gestionan desde Winerim para evitar PDFs olvidados.",
      },
      {
        title: "Margen visible",
        desc: "Cruza compra, venta, stock y rotacion para detectar vinos estrategicos, referencias dormidas y fugas de margen.",
      },
      {
        title: "Decisiones con datos",
        desc: "Repón, revisa, mueve o retira referencias con señales claras para direccion, sumiller y equipo de sala.",
      },
    ],
    ctaPrimary: "Ver Winerim en una demo",
    ctaSecondary: "Analizar mi carta",
    note: "El alcance de automatizacion depende de las integraciones activas y del flujo operativo de cada restaurante.",
  },
  en: {
    eyebrow: "HOW WINERIM WORKS",
    title: "Upload invoices. Sell bottles. Winerim keeps",
    highlight: "your cellar under control",
    subtitle:
      "Connect purchases, POS, stock, wine list and margin to know what you have, what sells and which references to move, review or restock.",
    beforeTitle: "Before",
    beforeItems: [
      "Spreadsheets, manual counts and wine lists that fall out of date.",
      "Purchase costs change while margins are reviewed too late.",
      "Restocking decisions rely on intuition or memory.",
    ],
    afterTitle: "With Winerim",
    afterItems: [
      "Delivery notes and invoices feed purchases, costs and references.",
      "When your POS is connected, every sale helps keep stock aligned.",
      "List, rotation and margin are read from the same system.",
    ],
    flowTitle: "A cellar connected end to end",
    flowItems: [
      {
        title: "Purchases come in",
        desc: "Upload delivery notes and invoices to control costs, suppliers and new references without chasing spreadsheets.",
      },
      {
        title: "Sales go out",
        desc: "With the POS integration active, bottles sold feed stock control and rotation analysis.",
      },
      {
        title: "The list stays aligned",
        desc: "Prices, availability, formats and recommendations are managed from Winerim instead of forgotten PDFs.",
      },
      {
        title: "Margin is visible",
        desc: "Cross purchase, sale, stock and rotation to spot strategic wines, sleeping references and margin leaks.",
      },
      {
        title: "Decisions use data",
        desc: "Restock, review, move or remove references with clear signals for owners, sommeliers and floor teams.",
      },
    ],
    ctaPrimary: "See Winerim in a demo",
    ctaSecondary: "Analyse my wine list",
    note: "Automation scope depends on active integrations and each restaurant's operating workflow.",
  },
  it: {
    eyebrow: "COME FUNZIONA WINERIM",
    title: "Carichi documenti d'acquisto. Vendi bottiglie. Winerim mantiene",
    highlight: "la cantina sotto controllo",
    subtitle:
      "Collega acquisti, cassa, stock, carta e margine per sapere cosa hai, cosa vendi e quali referenze muovere, rivedere o riordinare.",
    beforeTitle: "Prima",
    beforeItems: [
      "Excel, conteggi manuali e carte che restano indietro.",
      "Costi d'acquisto che cambiano senza rivedere il margine in tempo.",
      "Riordini decisi per intuizione o memoria.",
    ],
    afterTitle: "Con Winerim",
    afterItems: [
      "Documenti e fatture alimentano acquisti, costi e referenze.",
      "Quando colleghi il POS, ogni vendita aiuta ad allineare lo stock.",
      "Carta, rotazione e margine si leggono dallo stesso sistema.",
    ],
    flowTitle: "Una cantina collegata dall'acquisto alla carta",
    flowItems: [
      { title: "Entrano gli acquisti", desc: "Carica documenti e fatture per controllare costi, fornitori e nuove referenze senza inseguire fogli di calcolo." },
      { title: "Escono le vendite", desc: "Con l'integrazione POS attiva, le bottiglie vendute alimentano stock e analisi della rotazione." },
      { title: "La carta resta allineata", desc: "Prezzi, disponibilita, formati e raccomandazioni si gestiscono da Winerim, non da PDF dimenticati." },
      { title: "Il margine e visibile", desc: "Incrocia acquisto, vendita, stock e rotazione per individuare vini strategici, referenze ferme e perdite di margine." },
      { title: "Decisioni con dati", desc: "Riordina, rivedi, sposta o ritira referenze con segnali chiari per direzione, sommelier e sala." },
    ],
    ctaPrimary: "Vedere Winerim in demo",
    ctaSecondary: "Analizzare la mia carta",
    note: "Il livello di automazione dipende dalle integrazioni attive e dal flusso operativo del ristorante.",
  },
  fr: {
    eyebrow: "COMMENT WINERIM FONCTIONNE",
    title: "Vous importez vos factures. Vous vendez des bouteilles. Winerim garde",
    highlight: "votre cave sous controle",
    subtitle:
      "Connectez achats, caisse, stock, carte et marge pour savoir ce que vous avez, ce qui se vend et quelles references bouger, revoir ou recommander.",
    beforeTitle: "Avant",
    beforeItems: [
      "Excel, comptages manuels et cartes qui ne suivent plus la cave.",
      "Couts d'achat qui changent sans revision rapide des marges.",
      "Reassorts decides a l'intuition ou de memoire.",
    ],
    afterTitle: "Avec Winerim",
    afterItems: [
      "Bons de livraison et factures alimentent achats, couts et references.",
      "Quand la caisse est connectee, chaque vente aide a aligner le stock.",
      "Carte, rotation et marge se lisent dans le meme systeme.",
    ],
    flowTitle: "Une cave connectee de bout en bout",
    flowItems: [
      { title: "Les achats entrent", desc: "Importez bons et factures pour suivre couts, fournisseurs et nouvelles references sans multiplier les tableurs." },
      { title: "Les ventes sortent", desc: "Avec l'integration caisse active, les bouteilles vendues alimentent le stock et l'analyse de rotation." },
      { title: "La carte reste alignee", desc: "Prix, disponibilite, formats et recommandations se gerent dans Winerim au lieu de PDF oublies." },
      { title: "La marge devient visible", desc: "Croisez achat, vente, stock et rotation pour reperer vins strategiques, references dormantes et fuites de marge." },
      { title: "Les decisions ont des donnees", desc: "Recommandez, revoyez, mettez en avant ou retirez des references avec des signaux clairs." },
    ],
    ctaPrimary: "Voir Winerim en demo",
    ctaSecondary: "Analyser ma carte",
    note: "Le niveau d'automatisation depend des integrations actives et du fonctionnement de chaque restaurant.",
  },
  de: {
    eyebrow: "WIE WINERIM ARBEITET",
    title: "Sie laden Belege hoch. Sie verkaufen Flaschen. Winerim halt",
    highlight: "Ihren Keller im Griff",
    subtitle:
      "Verbinden Sie Einkauf, Kassensystem, Bestand, Weinkarte und Marge, um zu wissen, was da ist, was verkauft wird und welche Positionen bewegt, gepruft oder nachbestellt werden sollten.",
    beforeTitle: "Vorher",
    beforeItems: [
      "Excel, manuelle Zahlungen und Weinkarten, die nicht mehr aktuell sind.",
      "Einkaufspreise andern sich, wahrend Margen zu spat gepruft werden.",
      "Nachbestellungen basieren auf Bauchgefuhl oder Erinnerung.",
    ],
    afterTitle: "Mit Winerim",
    afterItems: [
      "Lieferscheine und Rechnungen speisen Einkauf, Kosten und Referenzen.",
      "Wenn das Kassensystem verbunden ist, hilft jeder Verkauf, den Bestand abzugleichen.",
      "Karte, Rotation und Marge werden im selben System gelesen.",
    ],
    flowTitle: "Ein Weinkeller, der vom Einkauf bis zur Karte verbunden ist",
    flowItems: [
      { title: "Einkaufe kommen rein", desc: "Laden Sie Belege und Rechnungen hoch, um Kosten, Lieferanten und neue Referenzen ohne Tabellenjagd zu steuern." },
      { title: "Verkaufe gehen raus", desc: "Mit aktiver Kassenintegration fliesen verkaufte Flaschen in Bestandskontrolle und Rotationsanalyse ein." },
      { title: "Die Karte bleibt aktuell", desc: "Preise, Verfugbarkeit, Formate und Empfehlungen werden in Winerim gepflegt statt in vergessenen PDFs." },
      { title: "Marge wird sichtbar", desc: "Kombinieren Sie Einkauf, Verkauf, Bestand und Rotation, um strategische Weine, ruhende Positionen und Margenverluste zu erkennen." },
      { title: "Entscheidungen nutzen Daten", desc: "Nachbestellen, prufen, hervorheben oder entfernen mit klaren Signalen fur Leitung, Sommelier und Service." },
    ],
    ctaPrimary: "Winerim in einer Demo sehen",
    ctaSecondary: "Meine Karte analysieren",
    note: "Der Automatisierungsgrad hangt von aktiven Integrationen und dem Betriebsablauf jedes Restaurants ab.",
  },
  pt: {
    eyebrow: "COMO A WINERIM FAZ",
    title: "Carrega faturas. Vende garrafas. A Winerim mantem",
    highlight: "a garrafeira sob controlo",
    subtitle:
      "Liga compras, POS, stock, carta e margem para saber o que tem, o que vende e que referencias deve mover, rever ou repor.",
    beforeTitle: "Antes",
    beforeItems: [
      "Excel, contagens manuais e cartas que ficam desatualizadas.",
      "Custos de compra mudam sem rever a margem a tempo.",
      "Reposicoes decididas por intuicao ou memoria.",
    ],
    afterTitle: "Com a Winerim",
    afterItems: [
      "Guias, faturas e documentos alimentam compras, custos e referencias.",
      "Quando liga o POS, cada venda ajuda a manter o stock alinhado.",
      "Carta, rotacao e margem sao lidas no mesmo sistema.",
    ],
    flowTitle: "Uma garrafeira ligada de ponta a ponta",
    flowItems: [
      { title: "As compras entram", desc: "Carregue documentos e faturas para controlar custos, fornecedores e novas referencias sem depender de folhas de calculo." },
      { title: "As vendas saem", desc: "Com a integracao POS ativa, as garrafas vendidas alimentam stock e analise de rotacao." },
      { title: "A carta fica alinhada", desc: "Precos, disponibilidade, formatos e recomendacoes sao geridos na Winerim, nao em PDFs esquecidos." },
      { title: "A margem fica visivel", desc: "Cruze compra, venda, stock e rotacao para detetar vinhos estrategicos, referencias paradas e fugas de margem." },
      { title: "Decisoes com dados", desc: "Repor, rever, mover ou retirar referencias com sinais claros para direcao, escancao e equipa de sala." },
    ],
    ctaPrimary: "Ver Winerim numa demo",
    ctaSecondary: "Analisar a minha carta",
    note: "O alcance da automacao depende das integracoes ativas e do fluxo operacional de cada restaurante.",
  },
};

const contextualCopy: Record<Exclude<ConnectedCellarVariant, "home">, I18nMap<ContextualCopyOverride>> = {
  core: {
    es: {
      eyebrow: "CORE EN ACCION",
      title: "El Core no espera a que mires un Excel. Convierte cada dato en",
      highlight: "una senal de decision",
      subtitle:
        "Albaranes, ventas, stock y carta alimentan Winerim Core para detectar margen, rotacion, stock dormido y cambios de precio que conviene revisar.",
      beforeItems: [
        "Cada dato vive en un sitio distinto: TPV, proveedor, carta, Excel y memoria del equipo.",
        "El margen real se revisa tarde, cuando el coste ya ha cambiado o la botella ya no rota.",
        "La direccion ve sintomas, pero no siempre la causa: precio, stock, rotacion o arquitectura de carta.",
      ],
      afterItems: [
        "Core cruza coste, venta, stock, carta y rotacion en una lectura unica.",
        "Las alertas ayudan a priorizar referencias que revisar, mover, reponer o retirar.",
        "Direccion, sumiller y sala trabajan sobre las mismas senales, no sobre intuiciones aisladas.",
      ],
      flowTitle: "Del movimiento diario al diagnostico",
      flowItems: [
        { title: "Coste actualizado", desc: "Albaranes y facturas ayudan a mantener precios de compra y referencias bajo control." },
        { title: "Venta conectada", desc: "Con TPV activo, cada venta alimenta lectura de stock, rotacion y rendimiento." },
        { title: "Carta interpretada", desc: "Core lee como encaja cada vino dentro de precio, estilo, formato y disponibilidad." },
        { title: "Margen calculado", desc: "Cruza coste, precio de venta, rotacion y stock para detectar fugas y oportunidades." },
        { title: "Accion priorizada", desc: "Ordena que revisar primero: reposicion, precio, visibilidad, baja rotacion o exceso de stock." },
      ],
      ctaPrimary: "Ver una demo de Core",
      ctaSecondary: "Calcular margen",
      note: "Las senales dependen de los datos conectados, las integraciones activas y el flujo operativo de cada restaurante.",
    },
    en: {
      eyebrow: "CORE IN ACTION",
      title: "Core does not wait for another spreadsheet. It turns each data point into",
      highlight: "a decision signal",
      subtitle:
        "Invoices, sales, stock and the wine list feed Winerim Core so it can detect margin, rotation, sleeping stock and price changes worth reviewing.",
      beforeItems: [
        "Data sits in separate places: POS, suppliers, list, spreadsheets and team memory.",
        "Real margin is reviewed too late, after costs have changed or bottles have stopped moving.",
        "Management sees symptoms, but not always the cause: price, stock, rotation or list architecture.",
      ],
      afterItems: [
        "Core cross-references cost, sale, stock, list and rotation in one reading.",
        "Alerts help prioritise which references to review, move, restock or remove.",
        "Owners, sommeliers and floor teams work from the same signals, not isolated intuition.",
      ],
      flowTitle: "From daily movement to diagnosis",
      flowItems: [
        { title: "Cost updated", desc: "Delivery notes and invoices help keep purchase prices and references under control." },
        { title: "Sales connected", desc: "With POS active, each sale feeds stock, rotation and performance analysis." },
        { title: "List interpreted", desc: "Core reads how each wine fits by price, style, format and availability." },
        { title: "Margin calculated", desc: "It combines cost, sale price, rotation and stock to detect leaks and opportunities." },
        { title: "Action prioritised", desc: "It orders what to review first: restock, price, visibility, slow rotation or excess stock." },
      ],
      ctaPrimary: "See a Core demo",
      ctaSecondary: "Calculate margin",
      note: "Signals depend on connected data, active integrations and each restaurant's operating workflow.",
    },
    it: {
      eyebrow: "CORE IN AZIONE",
      title: "Core non aspetta un altro Excel. Trasforma ogni dato in",
      highlight: "un segnale di decisione",
      subtitle:
        "Documenti, vendite, stock e carta alimentano Winerim Core per rilevare margine, rotazione, stock fermo e cambi di prezzo da rivedere.",
      beforeItems: [
        "Ogni dato vive in un posto diverso: POS, fornitore, carta, Excel e memoria del team.",
        "Il margine reale si controlla tardi, quando il costo e gia cambiato o la bottiglia non ruota piu.",
        "La direzione vede sintomi, ma non sempre la causa: prezzo, stock, rotazione o architettura della carta.",
      ],
      afterItems: [
        "Core incrocia costo, vendita, stock, carta e rotazione in una lettura unica.",
        "Gli alert aiutano a prioritizzare referenze da rivedere, muovere, riordinare o togliere.",
        "Direzione, sommelier e sala lavorano sugli stessi segnali, non su intuizioni isolate.",
      ],
      flowTitle: "Dal movimento quotidiano alla diagnosi",
      flowItems: [
        { title: "Costo aggiornato", desc: "Documenti e fatture aiutano a tenere sotto controllo prezzi di acquisto e referenze." },
        { title: "Vendita collegata", desc: "Con POS attivo, ogni vendita alimenta analisi di stock, rotazione e performance." },
        { title: "Carta interpretata", desc: "Core legge il ruolo di ogni vino per prezzo, stile, formato e disponibilita." },
        { title: "Margine calcolato", desc: "Incrocia costo, prezzo di vendita, rotazione e stock per rilevare perdite e opportunita." },
        { title: "Azione prioritaria", desc: "Ordina cosa rivedere prima: riordino, prezzo, visibilita, bassa rotazione o stock eccessivo." },
      ],
      ctaPrimary: "Vedere una demo Core",
      ctaSecondary: "Calcolare il margine",
      note: "I segnali dipendono dai dati collegati, dalle integrazioni attive e dal flusso operativo del ristorante.",
    },
    fr: {
      eyebrow: "CORE EN ACTION",
      title: "Core n'attend pas un autre Excel. Il transforme chaque donnee en",
      highlight: "signal de decision",
      subtitle:
        "Factures, ventes, stock et carte alimentent Winerim Core pour detecter marge, rotation, stock dormant et changements de prix a revoir.",
      beforeItems: [
        "Chaque donnee vit ailleurs : caisse, fournisseur, carte, Excel et memoire de l'equipe.",
        "La marge reelle est revue trop tard, quand le cout a deja change ou que la bouteille ne tourne plus.",
        "La direction voit les symptomes, mais pas toujours la cause : prix, stock, rotation ou architecture de carte.",
      ],
      afterItems: [
        "Core croise cout, vente, stock, carte et rotation dans une lecture unique.",
        "Les alertes aident a prioriser les references a revoir, bouger, recommander ou retirer.",
        "Direction, sommelier et salle travaillent sur les memes signaux, pas sur des intuitions isolees.",
      ],
      flowTitle: "Du mouvement quotidien au diagnostic",
      flowItems: [
        { title: "Cout actualise", desc: "Bons et factures aident a garder prix d'achat et references sous controle." },
        { title: "Vente connectee", desc: "Avec la caisse active, chaque vente nourrit l'analyse stock, rotation et performance." },
        { title: "Carte interpretee", desc: "Core lit le role de chaque vin par prix, style, format et disponibilite." },
        { title: "Marge calculee", desc: "Il croise cout, prix de vente, rotation et stock pour detecter fuites et opportunites." },
        { title: "Action priorisee", desc: "Il ordonne quoi revoir d'abord : reassort, prix, visibilite, faible rotation ou surstock." },
      ],
      ctaPrimary: "Voir une demo Core",
      ctaSecondary: "Calculer la marge",
      note: "Les signaux dependent des donnees connectees, des integrations actives et du fonctionnement de chaque restaurant.",
    },
    de: {
      eyebrow: "CORE IN AKTION",
      title: "Core wartet nicht auf die naechste Tabelle. Es macht aus jedem Datensatz",
      highlight: "ein Entscheidungssignal",
      subtitle:
        "Belege, Verkaeufe, Bestand und Weinkarte speisen Winerim Core, damit Marge, Rotation, ruhender Bestand und Preiswechsel sichtbar werden.",
      beforeItems: [
        "Daten liegen getrennt: Kassensystem, Lieferant, Karte, Tabelle und Teamerinnerung.",
        "Die echte Marge wird zu spaet geprueft, wenn Kosten schon anders sind oder Flaschen nicht mehr laufen.",
        "Die Leitung sieht Symptome, aber nicht immer die Ursache: Preis, Bestand, Rotation oder Kartenarchitektur.",
      ],
      afterItems: [
        "Core verbindet Kosten, Verkauf, Bestand, Karte und Rotation in einer Lesart.",
        "Warnungen helfen, Referenzen zu priorisieren: pruefen, bewegen, nachbestellen oder entfernen.",
        "Leitung, Sommelier und Service arbeiten mit denselben Signalen, nicht mit Einzelintuition.",
      ],
      flowTitle: "Vom Tagesgeschaeft zur Diagnose",
      flowItems: [
        { title: "Kosten aktualisiert", desc: "Lieferscheine und Rechnungen helfen, Einkaufspreise und Referenzen zu kontrollieren." },
        { title: "Verkauf verbunden", desc: "Mit aktivem Kassensystem speist jeder Verkauf Bestand, Rotation und Leistungsanalyse." },
        { title: "Karte interpretiert", desc: "Core liest die Rolle jedes Weins nach Preis, Stil, Format und Verfuegbarkeit." },
        { title: "Marge berechnet", desc: "Es kombiniert Kosten, Verkaufspreis, Rotation und Bestand, um Lecks und Chancen zu erkennen." },
        { title: "Aktion priorisiert", desc: "Es ordnet, was zuerst geprueft wird: Nachkauf, Preis, Sichtbarkeit, langsame Rotation oder Ueberbestand." },
      ],
      ctaPrimary: "Core Demo ansehen",
      ctaSecondary: "Marge berechnen",
      note: "Die Signale haengen von verbundenen Daten, aktiven Integrationen und dem Ablauf jedes Restaurants ab.",
    },
    pt: {
      eyebrow: "CORE EM ACAO",
      title: "O Core nao espera por outro Excel. Transforma cada dado em",
      highlight: "um sinal de decisao",
      subtitle:
        "Faturas, vendas, stock e carta alimentam o Winerim Core para detetar margem, rotacao, stock parado e mudancas de preco a rever.",
      beforeItems: [
        "Cada dado vive num sitio diferente: POS, fornecedor, carta, Excel e memoria da equipa.",
        "A margem real e revista tarde, quando o custo ja mudou ou a garrafa ja nao roda.",
        "A direcao ve sintomas, mas nem sempre a causa: preco, stock, rotacao ou arquitetura da carta.",
      ],
      afterItems: [
        "O Core cruza custo, venda, stock, carta e rotacao numa leitura unica.",
        "Os alertas ajudam a priorizar referencias a rever, mover, repor ou retirar.",
        "Direcao, escancao e sala trabalham sobre os mesmos sinais, nao sobre intuicoes isoladas.",
      ],
      flowTitle: "Do movimento diario ao diagnostico",
      flowItems: [
        { title: "Custo atualizado", desc: "Guias e faturas ajudam a manter precos de compra e referencias sob controlo." },
        { title: "Venda ligada", desc: "Com POS ativo, cada venda alimenta analise de stock, rotacao e desempenho." },
        { title: "Carta interpretada", desc: "O Core le o papel de cada vinho por preco, estilo, formato e disponibilidade." },
        { title: "Margem calculada", desc: "Cruza custo, preco de venda, rotacao e stock para detetar fugas e oportunidades." },
        { title: "Acao priorizada", desc: "Ordena o que rever primeiro: reposicao, preco, visibilidade, baixa rotacao ou excesso de stock." },
      ],
      ctaPrimary: "Ver demo do Core",
      ctaSecondary: "Calcular margem",
      note: "Os sinais dependem dos dados ligados, das integracoes ativas e do fluxo operacional de cada restaurante.",
    },
  },
  supply: {
    es: {
      eyebrow: "SUPPLY EN ACCION",
      title: "Cada albaran deja de ser papeleo y se convierte en",
      highlight: "criterio de compra",
      subtitle:
        "Supply conecta compras, coste, stock y rotacion para saber que reponer, que renegociar y que referencias no merece la pena volver a comprar.",
      beforeItems: [
        "Pedidos repetidos por costumbre aunque la referencia ya no rote.",
        "Precios de compra aceptados sin comparar ni medir impacto en margen.",
        "Stock inmovilizado que se detecta cuando ya ocupa bodega y caja.",
      ],
      afterItems: [
        "Las compras entran con coste, proveedor y referencia trazados.",
        "La reposicion se apoya en demanda real, margen y stock disponible.",
        "Las conversaciones con distribuidores parten de datos, no de sensaciones.",
      ],
      flowTitle: "De compra aislada a aprovisionamiento inteligente",
      flowItems: [
        { title: "Subes albaranes", desc: "Captura coste, proveedor y referencia para dejar de reconstruir compras a mano." },
        { title: "Conectas ventas", desc: "El consumo real muestra que referencias se mueven y cuales se quedan paradas." },
        { title: "Lees stock", desc: "La bodega deja de ser una foto fija y se convierte en una senal de reposicion." },
        { title: "Comparas precio", desc: "Detecta sobreprecios, oportunidades de negociacion y cambios de coste relevantes." },
        { title: "Compras mejor", desc: "Decide que reponer, que no volver a comprar y que sustituir con mas criterio." },
      ],
      ctaPrimary: "Ver una demo de Supply",
      ctaSecondary: "Probar compra inteligente",
      note: "Las recomendaciones dependen de los datos de compra, stock y venta disponibles en cada negocio.",
    },
    en: {
      eyebrow: "SUPPLY IN ACTION",
      title: "Each delivery note stops being admin and becomes",
      highlight: "purchasing criteria",
      subtitle:
        "Supply connects purchases, cost, stock and rotation to know what to restock, what to renegotiate and which references are not worth buying again.",
      beforeItems: [
        "Orders are repeated out of habit even when references no longer move.",
        "Purchase prices are accepted without comparison or margin impact.",
        "Tied-up stock is detected only after it has taken space and cash.",
      ],
      afterItems: [
        "Purchases enter with cost, supplier and reference traced.",
        "Restocking is based on real demand, margin and available stock.",
        "Distributor conversations start from data, not impressions.",
      ],
      flowTitle: "From isolated purchase to smart supply",
      flowItems: [
        { title: "Upload delivery notes", desc: "Capture cost, supplier and reference without rebuilding purchases manually." },
        { title: "Connect sales", desc: "Real consumption shows which references move and which ones stay still." },
        { title: "Read stock", desc: "The cellar stops being a static picture and becomes a replenishment signal." },
        { title: "Compare price", desc: "Detect overpricing, negotiation opportunities and relevant cost changes." },
        { title: "Buy better", desc: "Decide what to restock, what not to buy again and what to replace with better criteria." },
      ],
      ctaPrimary: "See a Supply demo",
      ctaSecondary: "Try smart purchasing",
      note: "Recommendations depend on the purchase, stock and sales data available in each business.",
    },
    it: {
      eyebrow: "SUPPLY IN AZIONE",
      title: "Ogni documento smette di essere burocrazia e diventa",
      highlight: "criterio d'acquisto",
      subtitle:
        "Supply collega acquisti, costo, stock e rotazione per sapere cosa riordinare, cosa rinegoziare e quali referenze non conviene ricomprare.",
      beforeItems: [
        "Ordini ripetuti per abitudine anche quando la referenza non ruota piu.",
        "Prezzi d'acquisto accettati senza confronto o impatto sul margine.",
        "Stock immobilizzato rilevato solo quando occupa gia spazio e cassa.",
      ],
      afterItems: [
        "Gli acquisti entrano con costo, fornitore e referenza tracciati.",
        "Il riordino si basa su domanda reale, margine e stock disponibile.",
        "Le conversazioni con i distributori partono dai dati, non da sensazioni.",
      ],
      flowTitle: "Da acquisto isolato ad approvvigionamento intelligente",
      flowItems: [
        { title: "Carichi documenti", desc: "Cattura costo, fornitore e referenza senza ricostruire gli acquisti a mano." },
        { title: "Colleghi vendite", desc: "Il consumo reale mostra quali referenze si muovono e quali restano ferme." },
        { title: "Leggi lo stock", desc: "La cantina smette di essere una foto statica e diventa un segnale di riordino." },
        { title: "Confronti il prezzo", desc: "Rileva sovrapprezzi, opportunita di negoziazione e cambi di costo rilevanti." },
        { title: "Compri meglio", desc: "Decidi cosa riordinare, cosa non ricomprare e cosa sostituire con piu criterio." },
      ],
      ctaPrimary: "Vedere una demo Supply",
      ctaSecondary: "Provare acquisto intelligente",
      note: "Le raccomandazioni dipendono dai dati di acquisto, stock e vendita disponibili in ogni business.",
    },
    fr: {
      eyebrow: "SUPPLY EN ACTION",
      title: "Chaque bon cesse d'etre administratif et devient",
      highlight: "critere d'achat",
      subtitle:
        "Supply relie achats, cout, stock et rotation pour savoir quoi recommander, quoi renegocier et quelles references ne plus racheter.",
      beforeItems: [
        "Commandes repetees par habitude alors que la reference ne tourne plus.",
        "Prix d'achat acceptes sans comparaison ni impact marge.",
        "Stock immobilise detecte seulement quand il occupe deja cave et tresorerie.",
      ],
      afterItems: [
        "Les achats entrent avec cout, fournisseur et reference traces.",
        "Le reassort s'appuie sur demande reelle, marge et stock disponible.",
        "Les discussions fournisseurs partent des donnees, pas des impressions.",
      ],
      flowTitle: "De l'achat isole a l'approvisionnement intelligent",
      flowItems: [
        { title: "Importez les bons", desc: "Capturez cout, fournisseur et reference sans reconstruire les achats a la main." },
        { title: "Connectez les ventes", desc: "La consommation reelle montre quelles references bougent et lesquelles dorment." },
        { title: "Lisez le stock", desc: "La cave cesse d'etre une photo fixe et devient un signal de reassort." },
        { title: "Comparez le prix", desc: "Detectez surcouts, opportunites de negociation et changements de cout importants." },
        { title: "Achetez mieux", desc: "Decidez quoi recommander, quoi ne plus acheter et quoi remplacer avec plus de criteres." },
      ],
      ctaPrimary: "Voir une demo Supply",
      ctaSecondary: "Tester l'achat intelligent",
      note: "Les recommandations dependent des donnees d'achat, de stock et de vente disponibles dans chaque etablissement.",
    },
    de: {
      eyebrow: "SUPPLY IN AKTION",
      title: "Jeder Lieferschein wird weniger Verwaltung und mehr",
      highlight: "Einkaufskriterium",
      subtitle:
        "Supply verbindet Einkauf, Kosten, Bestand und Rotation, um zu wissen, was nachbestellt, neu verhandelt oder nicht wieder gekauft werden sollte.",
      beforeItems: [
        "Bestellungen werden aus Gewohnheit wiederholt, auch wenn die Referenz nicht mehr laeuft.",
        "Einkaufspreise werden akzeptiert, ohne Vergleich oder Margenwirkung.",
        "Gebundener Bestand wird erst erkannt, wenn er schon Platz und Kapital blockiert.",
      ],
      afterItems: [
        "Einkaeufe kommen mit Kosten, Lieferant und Referenz nachvollziehbar rein.",
        "Nachbestellung basiert auf realer Nachfrage, Marge und verfuegbarem Bestand.",
        "Gespraeche mit Distributoren starten mit Daten, nicht mit Eindruecken.",
      ],
      flowTitle: "Vom Einzeleinkauf zur intelligenten Versorgung",
      flowItems: [
        { title: "Lieferscheine hochladen", desc: "Kosten, Lieferant und Referenz erfassen, ohne Einkaeufe manuell nachzubauen." },
        { title: "Verkaeufe verbinden", desc: "Der echte Verbrauch zeigt, welche Referenzen laufen und welche stehen bleiben." },
        { title: "Bestand lesen", desc: "Der Keller wird von einer Momentaufnahme zu einem Nachbestellungssignal." },
        { title: "Preis vergleichen", desc: "Ueberpreise, Verhandlungschancen und relevante Kostenwechsel erkennen." },
        { title: "Besser einkaufen", desc: "Entscheiden, was nachbestellt, nicht wieder gekauft oder ersetzt werden sollte." },
      ],
      ctaPrimary: "Supply Demo ansehen",
      ctaSecondary: "Smart Einkauf testen",
      note: "Empfehlungen haengen von Einkaufs-, Bestands- und Verkaufsdaten im jeweiligen Betrieb ab.",
    },
    pt: {
      eyebrow: "SUPPLY EM ACAO",
      title: "Cada guia deixa de ser papelada e passa a ser",
      highlight: "criterio de compra",
      subtitle:
        "A Supply liga compras, custo, stock e rotacao para saber o que repor, o que renegociar e que referencias nao vale a pena voltar a comprar.",
      beforeItems: [
        "Encomendas repetidas por habito mesmo quando a referencia ja nao roda.",
        "Precos de compra aceites sem comparacao nem leitura de margem.",
        "Stock imobilizado detetado so quando ja ocupa garrafeira e caixa.",
      ],
      afterItems: [
        "As compras entram com custo, fornecedor e referencia rastreados.",
        "A reposicao apoia-se em procura real, margem e stock disponivel.",
        "As conversas com distribuidores partem de dados, nao de sensacoes.",
      ],
      flowTitle: "Da compra isolada ao aprovisionamento inteligente",
      flowItems: [
        { title: "Carrega guias", desc: "Captura custo, fornecedor e referencia sem reconstruir compras manualmente." },
        { title: "Liga vendas", desc: "O consumo real mostra que referencias se movem e quais ficam paradas." },
        { title: "Le o stock", desc: "A garrafeira deixa de ser uma fotografia e passa a ser um sinal de reposicao." },
        { title: "Compara preco", desc: "Deteta sobreprecos, oportunidades de negociacao e mudancas de custo relevantes." },
        { title: "Compra melhor", desc: "Decide o que repor, o que nao voltar a comprar e o que substituir com mais criterio." },
      ],
      ctaPrimary: "Ver demo da Supply",
      ctaSecondary: "Testar compra inteligente",
      note: "As recomendacoes dependem dos dados de compra, stock e venda disponiveis em cada negocio.",
    },
  },
};

const flowIcons = [FileUp, ShoppingCart, ListChecks, BarChart3, PackageCheck];

const physicalProofCopy: I18nMap<PhysicalProofCopy> = {
  es: {
    title: "De saber el stock a encontrar la botella",
    subtitle:
      "Winerim baja la gestion desde el dato hasta la ubicacion fisica: mapa de bodega para equipos grandes y Wine Lockers para clientes, socios o reservas privadas.",
    items: [
      {
        eyebrow: "Wine Cellar",
        title: "Ubicacion fisica de cada botella",
        desc: "Mapa visual por zonas, botelleros y posiciones para que el equipo sepa donde esta cada referencia sin depender de memoria ni recuentos largos.",
        alt: "Mapa de bodega de Winerim con posiciones marcadas por zona y botellero",
      },
      {
        eyebrow: "Wine Lockers",
        title: "Lockers privados con vinos, pedidos e historial",
        desc: "Controla taquillas de clientes o socios: vinos guardados, botellas disponibles, solicitudes de consumo y reposicion desde el mismo entorno.",
        alt: "Resumen de Wine Lockers en Winerim con vinos pedidos e historial",
      },
    ],
  },
  en: {
    title: "From stock visibility to the exact bottle",
    subtitle:
      "Winerim takes cellar management from the data layer to the physical shelf: cellar maps for large teams and Wine Lockers for private clients, members or reserved collections.",
    items: [
      {
        eyebrow: "Wine Cellar",
        title: "Physical location for every bottle",
        desc: "A visual map by zone, rack and position so the team knows where each reference is without relying on memory or long manual counts.",
        alt: "Winerim cellar map with marked positions by zone and rack",
      },
      {
        eyebrow: "Wine Lockers",
        title: "Private lockers with wines, orders and history",
        desc: "Manage client or member lockers: stored wines, available bottles, consumption requests and replenishment from the same operating environment.",
        alt: "Wine Lockers summary in Winerim with wines orders and history",
      },
    ],
  },
  it: {
    title: "Dallo stock visibile alla bottiglia esatta",
    subtitle:
      "Winerim porta la gestione della cantina dal dato alla posizione fisica: mappe cantina per team grandi e Wine Lockers per clienti, soci o collezioni riservate.",
    items: [
      {
        eyebrow: "Wine Cellar",
        title: "Posizione fisica di ogni bottiglia",
        desc: "Mappa visuale per zone, scaffali e posizioni affinche il team sappia dove si trova ogni referenza senza dipendere dalla memoria.",
        alt: "Mappa cantina Winerim con posizioni segnate per zona e scaffale",
      },
      {
        eyebrow: "Wine Lockers",
        title: "Locker privati con vini, ordini e storico",
        desc: "Gestisci armadietti di clienti o soci: vini custoditi, bottiglie disponibili, richieste di consumo e riordino nello stesso ambiente.",
        alt: "Riepilogo Wine Lockers in Winerim con vini ordini e storico",
      },
    ],
  },
  fr: {
    title: "Du stock visible a la bouteille exacte",
    subtitle:
      "Winerim fait descendre la gestion de cave jusqu'a l'emplacement physique : plans de cave pour grandes equipes et Wine Lockers pour clients, membres ou collections reservees.",
    items: [
      {
        eyebrow: "Wine Cellar",
        title: "Emplacement physique de chaque bouteille",
        desc: "Plan visuel par zones, casiers et positions pour que l'equipe sache ou se trouve chaque reference sans compter sur la memoire.",
        alt: "Plan de cave Winerim avec positions marquees par zone et casier",
      },
      {
        eyebrow: "Wine Lockers",
        title: "Casiers prives avec vins, commandes et historique",
        desc: "Gerez les casiers de clients ou membres : vins gardes, bouteilles disponibles, demandes de consommation et reassort dans le meme environnement.",
        alt: "Resume Wine Lockers dans Winerim avec vins commandes et historique",
      },
    ],
  },
  de: {
    title: "Vom sichtbaren Bestand zur exakten Flasche",
    subtitle:
      "Winerim bringt Kellersteuerung von der Datenebene bis zum physischen Platz: Kellerkarten fur grosse Teams und Wine Lockers fur private Kunden, Mitglieder oder reservierte Sammlungen.",
    items: [
      {
        eyebrow: "Wine Cellar",
        title: "Physischer Standort jeder Flasche",
        desc: "Visuelle Karte nach Zonen, Regalen und Positionen, damit das Team jede Referenz findet, ohne sich auf Erinnerung oder lange Zahlungen zu verlassen.",
        alt: "Winerim Kellerkarte mit markierten Positionen nach Zone und Regal",
      },
      {
        eyebrow: "Wine Lockers",
        title: "Private Locker mit Weinen, Bestellungen und Historie",
        desc: "Verwalten Sie Kunden- oder Mitgliederlocker: gelagerte Weine, verfugbare Flaschen, Konsumanfragen und Nachschub im selben System.",
        alt: "Wine Lockers Ubersicht in Winerim mit Weinen Bestellungen und Historie",
      },
    ],
  },
  pt: {
    title: "Do stock visivel a garrafa exata",
    subtitle:
      "A Winerim leva a gestao da garrafeira do dado ate a localizacao fisica: mapas de garrafeira para equipas grandes e Wine Lockers para clientes, socios ou reservas privadas.",
    items: [
      {
        eyebrow: "Wine Cellar",
        title: "Localizacao fisica de cada garrafa",
        desc: "Mapa visual por zonas, garrafeiras e posicoes para que a equipa saiba onde esta cada referencia sem depender da memoria.",
        alt: "Mapa de garrafeira Winerim com posicoes marcadas por zona e estante",
      },
      {
        eyebrow: "Wine Lockers",
        title: "Lockers privados com vinhos, pedidos e historico",
        desc: "Controle cacifos de clientes ou socios: vinhos guardados, garrafas disponiveis, pedidos de consumo e reposicao no mesmo ambiente.",
        alt: "Resumo Wine Lockers na Winerim com vinhos pedidos e historico",
      },
    ],
  },
};

const ConnectedCellarSection = ({ variant = "home" }: ConnectedCellarSectionProps) => {
  const { lang, localePath } = useLanguage();
  const baseCopy = getI18n(copy, lang);
  const variantCopy = variant === "home" ? {} : getI18n(contextualCopy[variant], lang);
  const t = { ...baseCopy, ...variantCopy };
  const proof = getI18n(physicalProofCopy, lang);
  const physicalProofs = [
    { ...proof.items[0], img: wineCellarMapImg, Icon: MapPinned },
    { ...proof.items[1], img: wineLockersSummaryImg, Icon: LockKeyhole },
  ];
  const secondaryPath =
    variant === "core"
      ? "/herramientas/calculadora-margen"
      : variant === "supply"
        ? "/herramientas/calculadora-compra-inteligente"
        : "/analisis-carta";

  return (
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-14">
          <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">
            {t.eyebrow}
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-5 max-w-4xl mx-auto">
            {t.title} <span className="text-gradient-wine italic">{t.highlight}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            {t.subtitle}
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-10 items-start">
          <ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="rounded-2xl border border-border bg-gradient-card p-6 md:p-7">
                <h3 className="font-heading text-xl font-bold mb-4">{t.beforeTitle}</h3>
                <ul className="space-y-3">
                  {t.beforeItems.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-muted-foreground/50 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-wine/25 bg-wine/5 p-6 md:p-7">
                <h3 className="font-heading text-xl font-bold mb-4">{t.afterTitle}</h3>
                <ul className="space-y-3">
                  {t.afterItems.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-foreground/80 leading-relaxed">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-wine shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-card/60 p-5 md:p-6">
              <h3 className="font-heading text-2xl font-bold mb-6">{t.flowTitle}</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.flowItems.map((item, i) => {
                  const Icon = flowIcons[i] || PackageCheck;
                  return (
                    <div
                      key={item.title}
                      className="group rounded-xl border border-border bg-gradient-card p-5 hover:border-wine/30 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-wine/10 group-hover:bg-wine/15 transition-colors">
                        <Icon size={20} className="text-wine" />
                      </div>
                      <h4 className="font-heading text-lg font-semibold mb-2">{item.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.18}>
          <div className="mt-10">
            <div className="mb-6 max-w-3xl">
              <p className="text-xs tracking-[0.24em] uppercase text-wine font-semibold mb-3">
                Wine Cellar + Wine Lockers
              </p>
              <h3 className="font-heading text-2xl md:text-3xl font-bold mb-3">
                {proof.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {proof.subtitle}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-5">
              {physicalProofs.map(({ eyebrow, title, desc, alt, img, Icon }) => (
                <article
                  key={eyebrow}
                  className="overflow-hidden rounded-2xl border border-border bg-card/70"
                >
                  <div className="aspect-[16/9] bg-muted/30">
                    <img
                      src={img}
                      alt={alt}
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 md:p-6">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-wine/10">
                      <Icon size={20} className="text-wine" />
                    </div>
                    <p className="text-xs tracking-[0.2em] uppercase text-wine font-semibold mb-2">
                      {eyebrow}
                    </p>
                    <h4 className="font-heading text-xl font-bold mb-2">{title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5 rounded-2xl border border-border bg-gradient-card p-5 md:p-6">
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-2xl">
              {t.note}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                to={localePath("/demo")}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-wine px-6 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground hover:opacity-90 transition-all"
              >
                {t.ctaPrimary}
                <ArrowRight size={16} />
              </Link>
              <Link
                to={localePath(secondaryPath)}
                className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:border-wine/30 hover:bg-secondary transition-all"
              >
                {t.ctaSecondary}
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ConnectedCellarSection;
