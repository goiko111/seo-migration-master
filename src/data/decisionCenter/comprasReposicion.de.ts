import { ShoppingCart } from "lucide-react";
import type { DeepAreaContent } from "./margenesPricing";

const comprasReposicionDE: DeepAreaContent = {
  name: "Einkauf & Nachschub",
  tagline: "Mit Daten kaufen, nicht mit Intuition",
  intro: "Dieser Bereich hilft Ihnen, bessere Einkaufs- und Nachschubentscheidungen zu treffen. Es geht nicht darum, billig zu kaufen, sondern um den Kauf von Weinen, die sich verkaufen lassen, zum richtigen Preis und in der richtigen Menge. Jede Einkaufsentscheidung wirkt sich direkt auf Ihre Gewinnspanne, Ihren Bestand und die Kohaerenz Ihrer Weinkarte aus.",
  icon: ShoppingCart,
  accent: "text-blue-500",
  bg: "bg-blue-500/10",
  audiences: ["compras-fb", "direccion"],
  topErrors: [
    { error: "Aus Gewohnheit oder Lieferantendruck kaufen", porQueOcurre: "Weil der Lieferant jede Woche anruft und es einfacher ist, die Bestellung zu wiederholen, als sie zu ueberpruefen. Routine ersetzt Analyse.", consecuencia: "Ihr Keller fuellt sich mit dem, was der Lieferant Ihnen verkauft, nicht mit dem, was Sie brauchen. Der Bestand waechst ohne Bezug zur tatsaechlichen Nachfrage." },
    { error: "Lieferanten nur nach Listenpreis bewerten", porQueOcurre: "Weil der Preis pro Flasche die sichtbarste Zahl ist. Aber Sie ignorieren Versand, Mindestbestellmengen, Rabatte, Zahlungsbedingungen und Rueckgaben.", consecuencia: "Sie waehlen den 'billigsten' Lieferanten, der tatsaechlich teurer pro Glas ist, wenn Sie alles zusammenzaehlen." },
    { error: "Bestellungen nicht mit Verkaufsdaten abgleichen", porQueOcurre: "Weil Einkauf und Servicepersonal als separate Abteilungen arbeiten. Die Person, die bestellt, schaut sich nicht an, was verkauft wird.", consecuencia: "Sie kaufen, was nicht verkaeuft wird, und laufen aus dem aus, was doch verkaeuft wird. Die Nichtabstimmung vergroessert sich mit jeder Bestellung." },
    { error: "Nachschub ohne Ueberpruefung des aktuellen Kellerbestands", porQueOcurre: "Weil das Zaehlen von Bestaenden Zeit kostet und unnoetig zu sein scheint, wenn 'wir immer mehr brauchen'. Aber oft haben Sie bereits genug.", consecuencia: "Sie sammeln Ueberbestaende bei Referenzen, die Sie bereits hatten. Kapital wird unnoetig gebunden." },
    { error: "Nur verhandeln, wenn es ein Problem gibt", porQueOcurre: "Weil die Lieferantenbeziehung als selbstverstaendlich angesehen wird. Sie wird nur ueberprueift, wenn es ein Problem oder eine Preiserhohung gibt.", consecuencia: "Sie verpassen die Chance, Bedingungen proaktiv zu verbessern. Der Lieferant nimmt an, dass Sie zufrieden sind, und bietet nichts Besseres." },
  ],
  links: [
    { label: "Winerim Supply", href: "/producto/winerim-supply", description: "Einkaufsintelligenz: Preisvergleich, Ueberpreisalarme und datengesteuerte Nachschubplanung", type: "product" },
    { label: "Intelligenter Einkaufsrechner", href: "/herramientas/calculadora-compra-inteligente", description: "Beurteilen Sie, ob ein Kauf sinnvoll ist, indem Sie Rotation, Gewinnspanne und aktuellen Bestand ueberpruefen", type: "tool" },
    { label: "Vorlage: Kontrolle der Multi-Standort-Gruppe", href: "/recursos/plantilla-control-grupo-restauracion", description: "Koordinieren Sie Einkauf und Sortiment ueber mehrere Standorte in derselben Gruppe", type: "resource" },
    { label: "Vorlage: Monatliche Kartenpruefung", href: "/recursos/plantilla-revision-mensual-carta", description: "Monatlicher Prozess zur Verbindung der Karteleistung mit Einkaufsentscheidungen", type: "resource" },
    { label: "Blog: Kaufen Sie Wein falsch?", href: "/blog/como-saber-si-estas-comprando-mal-vino-restaurante", description: "Anzeichen dafuer, dass Ihr Einkaufsprozess ueberarbeitet werden muss", type: "article" },
    { label: "Blog: Welche Weine lohnt sich zu replenieren?", href: "/blog/que-vinos-merece-la-pena-reponer", description: "Kriterien fuer die Entscheidung, welche Weine in Ihre naechste Bestellung gehen", type: "article" },
  ],
  miniCases: [
    {
      profile: "Casual-Gruppe mit 4 Standorten",
      situation: "Jeder Standort bestellte unabhaengig vom Lieferanten, ohne Koordination. Der gleiche Wein wurde zu 3 verschiedenen Preisen gekauft, je nachdem wer verhandelte.",
      action: "Zentralisierter Einkauf fuer die 15 gemeinsamen Referenzen. Mit Lieferant wurde ein Gesamtpreis mit aggregiertem Volumen und Versand verhandelt.",
      result: "Durchschnittliche Ersparnisse von 11% bei Einkaufskosten. 4.200 EUR/Jahr nur bei gemeinsamen Referenzen.",
    },
    {
      profile: "Unabhaengiges Fine-Dining-Restaurant",
      situation: "Der Sommelier kaufte nach Intuition und Katalog. Bestellungen wurden nie mit Verkaufsdaten abgeglichen. Ergebnis: 30% der monatlichen Bestellung ging an References mit niedriger Rotation.",
      action: "Vor jeder Bestellung werden die Top 20 nach Rotation und die Totbestand-Liste exportiert. Nur Weine mit guter Rotation werden aufgefuellt und 2 neue References pro Monat getestet.",
      result: "Monatliche Bestellungen um 20% reduziert ohne Umsatzeinbussen. Die Investition konzentriert sich auf das, was funktioniert.",
    },
  ],
  subtopics: [
    {
      id: "comprando-mal",
      title: "Wie Sie erkennen, dass Sie falsch kaufen",
      priority: "inmediato",
      porQueTeLoMostramos: { detected: "Winerim hat Ihre letzten Bestellungen mit Verkaufsdaten abgeglichen und festgestellt, dass Teil Ihres Budgets in References ohne echte Nachfrage fliesst.", whyMatters: "Wenn Sie falsch kaufen, inflationiert Ihr Bestand, Ihre Gewinnspanne komprimiert sich und Ihre Karte fuellt sich mit dem, was niemand bestellt.", riskIfIgnored: "Jede aus Gewohnheit aufgegebene Bestellung finanziert einen wiederkehrenden Fehler, der Ihre Rentabilitaet monatlich erodiert." },
      queSignifica:
        "Falsch kaufen bedeutet nicht nur zu viel zahlen. Es bedeutet, Weine zu kaufen, die sich nicht verkaufen, in Mengen, die Sie nicht brauchen, von Lieferanten, die Sie nicht verglichen haben, oder Nachschub aus Traegheit ohne Datenanalyse. Das clearest sign schlechten Einkaufs ist ein Bestand, der waechst, waehrend die Verkaeufe stagnieren. Wenn Ihr Keller jeden Monat voeller wird, aber Ihr Durchschnittsbon nicht steigt, stimmt etwas mit Ihrem Einkauf nicht.",
      porQueImporta:
        "Weil Einkauf die erste Entscheidung ist, die alles andere bedingt. Wenn Sie falsch kaufen, inflationiert Ihr Bestand, Ihre Gewinnspanne komprimiert sich und Ihre Karte fuellt sich mit References, die niemand bestellt. Die Behebung des Einkaufs hat einen positiven Kaskadeneffekt auf die gesamte Operation: besserer Bestand, bessere Gewinnspanne, bessere Karte.",
      queHacer: [
        "Gleichen Sie Ihre letzte Bestellung mit den Verkaufsdaten der letzten 30 Tage ab. Wie viele bestellte References hatten keine echte Nachfrage?",
        "Berechnen Sie, welcher Prozentsatz Ihres Einkaufsbudgets in References mit niedriger oder keiner Rotation fliesst.",
        "Ermitteln Sie, ob Sie fehlende Bestaende bei References haben, die Ihre Kunden tatsaechlich anfragen (ein Zeichen, dass Sie die falschen Dinge kaufen).",
        "Ueberpruefen Sie, ob Sie aus Traegheit nachschub (gleiche Bestellung jeden Monat) oder aus Daten (angepasst an tatsaechliche Nachfrage).",
      ],
      errores: [
        { mistake: "Gleiche Bestellung jeden Monat wiederholen, ohne Verkaeufe zu ueberpruefen", consequence: "Sie sammeln das an, was sich nicht verkaeuft, und laufen aus dem aus, was doch verkaeuft wird." },
        { mistake: "In Menge fuer einen Rabatt kaufen ohne echte Nachfrage", consequence: "Der 10% Rabatt kompensiert nicht 6 Monate stillstehenden Bestand." },
        { mistake: "Keine Sichtbarkeit des Kellerbestands vor der Bestellung", consequence: "Sie duplizieren den Bestand bei References, die Sie bereits hatten, und binden Kapital." },
      ],
    },
    {
      id: "cuando-no-reponer",
      title: "Wann Sie eine Reference nicht nachschub sollten",
      priority: "esta semana",
      porQueTeLoMostramos: { detected: "Winerim hat References mit anhaltend niedriger Rotation erkannt, die weiterhin automatisch nachgeschoben werden.", whyMatters: "Nachschub aus Traegheit ist die haeufigste Art, Totbestand anzusammeln. Jeder Nachschub ohne Daten ist Geld, das nicht zurueckkommt.", riskIfIgnored: "Sie finanzieren jeden Monat einen wiederkehrenden Fehler und kaufen, was sich nicht verkaeuft, waehrend das, was sich verkaeuft, ausgeht." },
      queSignifica:
        "Nicht nachschub ist eine aktive Entscheidung, keine Auslassung. Sie stoppen den Nachschub, wenn Daten zeigen, dass diese Reference ihren Platz nicht mehr rechtfertigt: anhaltend niedrige Rotation, unzureichende Gewinnspanne, Kannibalismus mit einer besseren Reference oder eine Verschiebung Ihres Kundenprofils. Der Schluessel ist, dass die Entscheidung bewusst und dokumentiert ist, nicht einfach nur, dass sie ausgeht und Sie sie nicht erneut bestellen.",
      porQueImporta:
        "Weil Nachschub aus Traegheit die haeufigste Art ist, Totbestand anzusammeln. Jede Reference, die Sie ohne Begruendung nachschuben, nimmt Budget weg von einer, die tatsaechlich verkaeuft werden koennte. Und jeden Monat, wenn Sie einen Wein nachschuben, der sich nicht dreht, finanzieren Sie einen wiederkehrenden Fehler.",
      queHacer: [
        "Vor jeder Bestellung References mit Rotation < 1x/Monat pruefen. Brauchen Sie wirklich Nachschub?",
        "Wenn eine Reference 2 aufeinanderfolgende Monate niedrige Rotation hatte, quarantaenieren Sie sie: nicht nachschuben, bis sie ausgeht, dann evaluieren.",
        "Wenn Sie und Ihre Kunden sie nicht vermissen, sobald sie aufgebraucht ist, kaufen Sie sie nicht wieder.",
        "Dokumentieren Sie jede Nicht-Nachschub-Entscheidung, damit das Team weiss, warum und sie nicht erneut bestellt.",
      ],
      errores: [
        { mistake: "Alles nachschuben, was ausgeht, ohne Leistung zu evaluieren", consequence: "Sie behandeln alle References als gleich, wenn sie es nicht sind." },
        { mistake: "Nicht nachschuben, ohne dem Servicepersonal zu sagen", consequence: "Der Kellner verspricht einen Wein, der nicht mehr verfuegbar ist, und der Gast ist enttaeuscht." },
        { mistake: "Den Lieferanten entscheiden lassen ('Ich schicke dir das Uebliche')", consequence: "Ihre Karte wird von dem entschieden, der es Ihnen verkaeuft, nicht von dem, der Ihr Geschaeft verwaltet." },
      ],
    },
    {
      id: "precios-compra",
      title: "So lesen Sie Einkaufspreise",
      priority: "este mes",
      porQueTeLoMostramos: { detected: "Winerim hat Ihre Einkaufskosten einschliesslich Transport, Mindestmengen und Bedingungen analysiert, um die echten Gesamtkosten zu berechnen.", whyMatters: "Jeder Euro Unterschied beim Einkauf ist ein direkter Euro bei Ihrer Gewinnspanne. EUR 0,80 extra bei 50 Flaschen/Monat entspricht EUR 480/Jahr verloren bei einer einzigen Reference.", riskIfIgnored: "Sie waehlen Lieferanten nach Listenpreis, nicht echten Kosten. Ihre Gewinnspanne erodiert ohne Anzeige im Einzelpreis." },
      queSignifica:
        "Der Einkaufspreis ist nicht einfach die Zahl auf der Rechnung. Es ist diese Zahl plus Transport, Mindestbestellmengen, Rabatte, Zahlungsbedingungen und Rueckgabebedingungen. Zwei Lieferanten koennen Ihnen den gleichen Wein zum 'gleichen Preis' mit sehr unterschiedlichen echten Kosten anbieten. Einkaufspreise korrekt zu lesen bedeutet, die Gesamtakquisitionskosten zu verstehen, nicht nur den Einzelpreis.",
      porQueImporta:
        "Weil jeder Euro Unterschied beim Einkauf ein direkter Euro bei Ihrer Gewinnspanne ist. Wenn Sie 50 Flaschen/Monat einer Reference kaufen und EUR 0,80 mehr zahlen als noetig, verlieren Sie EUR 480/Jahr bei dieser einen Reference. Multiplizieren Sie mit 10 schlecht gekauften References und Sie sehen fast EUR 5.000 jaehrlich.",
      queHacer: [
        "Berechnen Sie fuer jede Schluessel-Reference die Gesamtkosten: Preis + Transport pro Einheit + Kapitalkosten (Zahlung bei 30 Tagen vs. 60 Tagen).",
        "Vergleichen Sie Gesamtkosten zwischen Lieferanten, nicht nur Listenpreis.",
        "Ueberpruefen Sie, ob Ihre Rueckgabebedingungen Abfaelle decken: Ein Lieferant, der Rueckgaben akzeptiert, kann guenstiger sein, auch wenn der Preis hoeher ist.",
        "Mit Daten verhandeln: Bringen Sie Ihre Einkaufsgeschichte zum Lieferantentreffen mit.",
      ],
      errores: [
        { mistake: "Nur Einzelpreise zwischen Lieferanten vergleichen", consequence: "Sie waehlen den billigsten auf dem Papier, aber den teuersten in echten Kosten." },
        { mistake: "Preise nach der Verhandlung nicht ueberpruefen", consequence: "Ihr Lieferant erhoeht Preise 5% jaehrlich und Sie bemerken es nicht, bis Sie Gewinnspaennen pruefen." },
        { mistake: "Mindestbestellkosten nicht beruecksichtigen", consequence: "Sie kaufen 24 Flaschen fuer den Preis, brauchen aber nur 6." },
      ],
    },
    {
      id: "detectar-sobreprecio",
      title: "Wie Sie Ueberpreisierung erkennen",
      priority: "inmediato",
      porQueTeLoMostramos: { detected: "Winerim hat Ihre Einkaufspreise mit Marktdaten verglichen und References erkannt, bei denen Sie moeglicherweise mehr zahlen als noetig.", whyMatters: "Ueberpreisierung ist unsichtbar, bis Sie danach suchen. In einer Gruppe koennen 8% Uebergebuehr bei 20 References tens of thousands EUR jaehrlich bedeuten.", riskIfIgnored: "Sie zahlen weiter zu viel, weil Sie nicht vergleichen. Lieferantentreue sollte nicht unvereinbar mit gutem Management sein." },
      queSignifica:
        "Ueberpreisierung ist, wenn Sie mehr zahlen als der Markt fuer eine Reference oder fuer einen Wein mit aequivalenten Eigenschaften fragt. Es ist nicht immer die Schuld des Lieferanten: Manchmal ist es, weil Sie nicht verglichen haben, weil Sie seit Jahren vom gleichen kaufen ohne zu verhandeln, oder weil sich Ihr Volumen veraendert hat und Ihre Bedingungen nicht aktualisiert wurden. Ueberpreisierung zu erkennen erfordert Vergleichen, nicht Erraten.",
      porQueImporta:
        "Weil Ueberpreisierung unsichtbar ist, bis Sie danach suchen. Es zeigt sich nicht als zusaetzliche Ausgabe in Ihrer Gewinn- und Verlustrechnung: Es reduziert einfach Ihre Gewinnspanne ohne Ihr Wissen. In einer Restaurantgruppe mit zentralisiertem Einkauf koennen 8% Ueberpreisierung bei 20 References tens of thousands EUR jaehrlich bedeuten.",
      queHacer: [
        "Waehlen Sie Ihre 10 umsatzstaerksten References und fordern Sie Angebote von mindestens 2 alternativen Lieferanten an.",
        "Vergleichen Sie nicht nur Preis, sondern Bedingungen: Zahlungsbedingungen, Mindestmengen, Transport, Rueckgaben.",
        "Wenn Sie einen Unterschied > 10% erkannt haben, verhandeln Sie mit Ihrem aktuellen Lieferanten mit den Daten als Hebel.",
        "Legen Sie eine Preispruefung mindestens alle sechs Monate fest. Maerkte veraendern sich und Ihre Bedingungen muessen sich anpassen.",
      ],
      errores: [
        { mistake: "Nie vergleichen, weil 'mein Lieferant ist vertrauenswuerdig'", consequence: "Vertrauen ist nicht unvereinbar mit Vergleichen. Vergleichen ist Management." },
        { mistake: "Nur einmal im Jahr oder am Anfang der Beziehung vergleichen", consequence: "Preise aendern sich quartalsweise. Wenn Sie nicht ueberpruefen, fallen Sie zurueck." },
        { mistake: "Lieferanten nur aus Preisgruenden wechseln, ohne Service zu beruecksichtigen", consequence: "Ein billiger, aber unzuverlaessiger Lieferant kostet mehr bei Ausfaellen und Logistikproblemen." },
      ],
    },
    {
      id: "decidir-entre-similares",
      title: "Wie Sie zwischen aehnlichen References waehlen",
      priority: "esta semana",
      porQueTeLoMostramos: { detected: "Winerim hat Paare von References erkannt, die im gleichen Segment Ihrer Karte konkurrieren: gleicher Typ, aehnlicher Preis.", whyMatters: "Zwei redundante Weine erhalten Umsaetze, teilen Aufmerksamkeit und verdoppeln Bestand. Die Konsolidierung befreit Platz und verbessert Einkaufsbedingungen.", riskIfIgnored: "Beide verkaeufen sich schlecht statt eines gut. Sie verlieren Gewinnspanne, Effizienz und die Chance, eine echte Luecke zu fuellen." },
      queSignifica:
        "Wenn Sie zwei oder mehr Weine im gleichen Segment haben (gleicher Typ, aehnlicher Preis, aehnliches Profil), brauchen Sie ein klares Kriterium, um zu waehlen, welcher bleibt und welcher geht. Dieses Kriterium sollte drei Variablen kombinieren: Gewinnspanne (was mehr einbringt), Rotation (was mehr verkaeuft) und Rolle in der Karte (welcher die Funktion besser erfuellt, die Sie abdecken muessen).",
      porQueImporta:
        "Weil zwei aehnliche References Umsaetze erhalten, die Aufmerksamkeit des Gastes teilen und doppelten Bestand erforderlich machen. Jedes Paar redundanter Weine ist eine verpasste Gelegenheit, eine echte Luecke in Ihrer Karte zu fuellen oder das Volumen zu konzentrieren und Einkaufsbedingungen zu verbessern.",
      queHacer: [
        "Identifizieren Sie Paare oder Trios von References im gleichen Segment (gleicher Typ, ±EUR 3 Unterschied).",
        "Vergleichen Sie: Welcher hat bessere Gewinnspanne? Welcher dreht sich mehr? Welchen empfiehlt das Servicepersonal mehr?",
        "Entscheiden Sie, welcher bleibt, und entfernen Sie den anderen. Wenn Sie Bestand des ausgehenden haben, verschieben Sie ihn zu Glaswein oder Promotion.",
        "Nutzen Sie den befreiten Platz, um eine echte Luecke zu fuellen oder um besseres Volumen bei der gewinnenden Reference zu verhandeln.",
      ],
      errores: [
        { mistake: "Beide behalten, 'weil sie beide ein bisschen verkaufen'", consequence: "Beide verkaeufen sich schlecht statt eines gut. Sie verlieren Gewinnspanne und Effizienz." },
        { mistake: "Nur nach Gewinnspanne entscheiden ohne Rotation zu schauen", consequence: "Sie behalten den profitabelsten pro Flasche, aber den, den niemand bestellt." },
        { mistake: "Nach dem persoenlichen Geschmack des Sommelier oder Koch entscheiden", consequence: "Ihre Karte befriiedigt, wer sie gestaltet, nicht wer sie konsumiert." },
      ],
    },
    {
      id: "decision-compra-integrada",
      title: "Wie Sie Rotation, Gewinnspanne und Bestand in einer Einkaufsentscheidung kombinieren",
      priority: "este mes",
      porQueTeLoMostramos: { detected: "Winerim kreuzt automatisch Rotation, Gewinnspanne und Bestand, um jede Reference in einer Entscheidungsmatrix zu klassifizieren.", whyMatters: "Eine einzelne Metrik anzuschauen fuehrt zu unvollstaendigen Entscheidungen. Nur wenn Sie alle drei kreuzen, sehen Sie das vollstaendige Bild jeder Reference.", riskIfIgnored: "Sie kaufen, was Sie nicht brauchen, schuben Nachschub, was sich nicht dreht, und laufen aus dem aus, was sich verkaeuft." },
      queSignifica:
        "Die beste Einkaufsentscheidung schaut nicht auf einen einzelnen Datenpunkt: Sie kreuzt drei. Rotation sagt, ob sich der Wein verkaeuft. Gewinnspanne sagt, ob es sich lohnt zu verkaufen. Bestand sagt, ob Sie mehr brauchen oder bereits genug haben. Wenn alle drei in die gleiche Richtung zeigen, ist die Entscheidung klar. Wenn sie widersprechen, muessen Sie nach Ihrer Strategie priorisieren.",
      porQueImporta:
        "Weil eine einzelne Metrik anzuschauen zu unvollstaendigen Entscheidungen fuehrt. Ein Wein mit guter Rotation aber schlechter Gewinnspanne macht Sie hart fuer kleinen Gewinn arbeiten. Einer mit guter Gewinnspanne aber keine Rotation fuellt Ihren Keller mit untaetigen Kapital. Und mehr von etwas zu kaufen, das Sie bereits im Ueberfluss haben, ist Geldverschwendung. Nur wenn Sie alle drei kreuzen, sehen Sie das vollstaendige Bild.",
      queHacer: [
        "Vor jeder Bestellung klassifizieren Sie jede Reference in einer 2x2 Matrix: hohe/niedrige Rotation x hohe/niedrige Gewinnspanne.",
        "Hohe Rotation + hohe Gewinnspanne → Nachschub ohne zu zoegern, Volumen verhandeln.",
        "Hohe Rotation + niedrige Gewinnspanne → Umpreisen oder Kosten neu verhandeln, bevor Sie nachschuben.",
        "Niedrige Rotation + hohe Gewinnspanne → In-Raum oder Glaswein vor Nachschub pushen.",
        "Niedrige Rotation + niedrige Gewinnspanne → Nicht nachschuben. Bestand aufbrauchen und entfernen.",
        "Fuegen Sie die Bestandsvariable hinzu: Wenn Sie bereits 3 Monate Inventar haben, brauchen Sie nicht nachzuschuben, auch wenn es sich gut dreht.",
      ],
      errores: [
        { mistake: "Einkaufsentscheidungen nur auf Rotation basieren", consequence: "Sie schuben den Bestseller nach, ohne zu ueberpruefen, ob er ausreichend Gewinnspanne bringt." },
        { mistake: "Nur nach Gewinnspanne entscheiden", consequence: "Sie kaufen, was den meisten pro Flasche bringt, aber niemand bestellt." },
        { mistake: "Aktuellen Bestand vor der Bestellung nicht pruefen", consequence: "Sie duplizieren Inventar bei References, die Sie bereits genug hatten." },
      ],
    },
  ],
  nextStep: {
    label: "Evaluieren Sie Ihren naechsten Einkauf",
    href: "/herramientas/calculadora-compra-inteligente",
    description: "Kreuzen Sie Rotation, Gewinnspanne und aktuellen Bestand, um zu entscheiden, ob ein Einkauf Sinn macht, bevor Sie die Bestellung aufgeben.",
  },
};

export default comprasReposicionDE;
