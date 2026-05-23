import { Package } from "lucide-react";
import type { DeepAreaContent } from "./margenesPricing";

const stockRotacionDE: DeepAreaContent = {
  name: "Bestand und Rotation",
  tagline: "Erkennen Sie stagnierenden Bestand bevor es zu spät ist",
  intro: "Dieser Bereich hilft Ihnen stagnierenden Weine zu identifizieren das gebundene Kapital zu quantifizieren und konkrete Entscheidungen zu treffen: Ankerwein, Glas, Auslistung oder Ausverkauf. Dies ist keine Bestandstheorie. Es geht darum sicherzustellen dass jede Flasche in Ihrer Kellerei einen Plan hat.",
  icon: Package,
  accent: "text-emerald-500",
  bg: "bg-emerald-500/10",
  audiences: ["sala", "compras-fb", "direccion"],
  topErrors: [
    { error: "Langsame Referenzen behalten weil 'sie sich irgendwann noch verkaufen'", porQueOcurre: "Weil das Auslistung einen Kauffehler zugeben fühlt. Es ist einfacher zu warten.", consecuencia: "Das Kapital bleibt gebunden der Wein verliert mit der Zeit an Wert und besetzt Platz auf der Weinkarte der echte Umsätze generieren könnte." },
    { error: "Die echten Kosten von Totbestand nicht quantifizieren", porQueOcurre: "Weil Totbestand nicht als Ausgabe in der Gewinn- und Verlustrechnung auftaucht. Sie sehen es nur wenn Sie es abschreiben.", consecuencia: "Sie fühlen die Dringlichkeit nicht. 20 Flaschen mit 12-Euro-Kosten sind 240 Euro die in Referenzen mit echter Rotation investiert werden könnten." },
    { error: "Eine Referenz ankurbeln ohne das Ergebnis zu messen", porQueOcurre: "Weil Sie dem Team sagen 'empfehlt es' aber niemand das Ergebnis verfolgt. Ohne Messung gibt es kein Lernen.", consecuencia: "Sie wissen nicht ob die Aktion funktioniert hat. Sie wiederholen den Zyklus: ankurbeln ohne zu messen auf Zeit zu spielen ohne Daten zu spät auslistung." },
    { error: "Alles automatisch nachbestellen das ausgeht", porQueOcurre: "Weil Nachbestellung auf Autopilot läuft. Jede Woche geht die gleiche Bestellung raus ohne zu überprüfen ob sich die Nachfrage geändert hat.", consecuencia: "Sie finanzieren Bestand der untätig bleibt. Bestellungen sollten auf echter Rotation basieren nicht auf der letzen Monats-Weinkarte." },
    { error: "Teure Weine mit Totbestand verwechseln", porQueOcurre: "Weil ein 60-Euro-Wein der Zeit zum Verkaufen braucht wie Totbestand aussieht aber vielleicht ein Image- oder Premium-Ticketrolle erfüllt.", consecuencia: "Sie listen strategische Weine aus die einen Zweck erfüllen und ersetzen sie mit mehr der gleichen mid-range Weine die Sie bereits überladet haben." },
  ],
  links: [
    { label: "Totbestand-Rechner", href: "/herramientas/calculadora-stock-muerto", description: "Quantifizieren Sie das gebundene Kapital in Referenzen ohne Umsatz", type: "tool" },
    { label: "Checkliste: Totbestand-Erkennung", href: "/recursos/checklist-deteccion-vinos-muertos", description: "Schrittweiser Prozess um stagnierenden Bestand zu erkennen und zu handeln", type: "resource" },
    { label: "Monatliche Scorecard", href: "/recursos/scorecard-mensual", description: "Überwachen Sie Ihre Bestandsgesundheit jeden Monat mit Schlüsselmetriken", type: "resource" },
    { label: "Winerim Core", href: "/producto/winerim-core", description: "Die analytische Engine die niedrige Rotation automatisch erkennt", type: "product" },
    { label: "Winerim Supply", href: "/producto/winerim-supply", description: "Verbinden Sie Rotation mit Einkauf und Nachbestellungsentscheidungen", type: "product" },
    { label: "Blog: Wie man Totbestand erkennt", href: "/article/como-detectar-stock-muerto-carta-vinos", description: "Warnsignale und Prozess um Weine ohne Rotation zu identifizieren", type: "article" },
    { label: "Blog: Welche Weine verdienen Nachbestellung", href: "/article/que-vinos-merece-la-pena-reponer", description: "Kriterien um zu entscheiden was in die nächste Bestellung bleibt und was geht", type: "article" },
  ],
  miniCases: [
    {
      profile: "Hotelrestaurant mit 90 Referenzen",
      situation: "22 Referenzen hatten über 90 Tage ohne einen einzigen Verkauf. Gebundenes Kapital: 3.400 Euro.",
      action: "Listete 15 Referenzen aus. Bewegte 5 zu Glaswein mit aggressiver Preisgestaltung. Gab die restlichen 2 an den Lieferanten zurück.",
      result: "Gab 2.800 Euro in Kapital frei die in 8 neue Referenzen mit validierter Nachfrage reinvestiert wurden. Totbestand sank von 24 auf 6 Prozent.",
    },
    {
      profile: "Urbanes Bistro mit 28 Referenzen",
      situation: "Schaute nur auf wöchentliche Verkäufe. Bemerkte nicht dass 6 Weine 45 Tage ohne Rotation gingen weil 'einer kürzlich verkauft wurde'.",
      action: "Stelle automatische Warnung in Winerim bei 30 Tagen ohne Verkauf ein. Jeden Montag überprüft die Liste und entscheidet: ankurbeln Glas oder auslistung.",
      result: "In 3 Monaten ging es von 6 Totweinen auf 1. Die durchschnittliche Listenrotation verbesserte sich um 18 Prozent.",
    },
  ],
  subtopics: [
    {
      id: "stock-muerto",
      title: "Was zählt als Totbestand",
      priority: "inmediato",
      porQueTeLoMostramos: {
        detected: "Winerim hat Referenzen auf Ihrer Liste identifiziert ohne Verkäufe über 60 Tage.",
        whyMatters: "Zwischen 10 und 25 Prozent der durchschnittlichen Restaurantliste ist Totbestand ohne dass sie es wissen. Es ist Kapital das nicht funktioniert.",
        riskIfIgnored: "Jeden Monat der vergeht bleibt das Geld untätig. Es verbessert sich nicht mit der Zeit: es sammelt sich nur an.",
      },
      queSignifica:
        "Totbestand ist jede Referenz ohne Verkauf über 60 Tage hinweg und ohne klare strategische Rechtfertigung (Spezialreserve für Veranstaltung etc.). Es ist nicht das gleiche wie langsamer Bestand: ein Wein der 2 Flaschen pro Monat verkauft ist langsam aber lebendig. Einer der 3 Monate lang nicht bewegt ist tot. Die Unterscheidung ist wichtig weil die Aktion anders ist.",
      porQueImporta:
        "Weil jede untätige Flasche Geld ist das nicht funktioniert. Ein durchschnittliches Restaurant hat zwischen 10 und 25 Prozent seiner Liste in Totbestand ohne es zu wissen. Wenn Sie 20 tote Referenzen mit durchschnittlichen 8-Euro-Kosten haben mit durchschnittlich 3 Flaschen jede sind das 480 Euro gebunden die Marge in Referenzen mit echter Rotation generieren könnten.",
      queHacer: [
        "Filtern Sie alle Referenzen mit null Verkäufen in den letzten 60 Tagen.",
        "Trennen Sie die mit strategischer Rechtfertigung (Veranstaltung Kundenreserve) von jenen die einfach vergessen wurden.",
        "Für die vergessenen entscheiden Sie jetzt: ankurbeln im Service Glas Rabatt oder auslistung?",
        "Legen Sie eine Regel fest: Jede Referenz ohne Verkauf in 60 Tagen kommt automatisch in Überprüfung.",
      ],
      errores: [
        { mistake: "Denken 'Totbestand' bedeutet nur alt oder verschlechtert Wein", consequence: "Der teuerste Totbestand ist normalerweise perfekt trinkbarer Wein den niemand bestellt." },
        { mistake: "Nicht zwischen Totbestand und strategischem Bestand unterscheiden", consequence: "Sie listen Weine aus die Sie behalten sollten oder behalten welche die gehen sollten." },
        { mistake: "Warten dass sich das Problem von selbst löst", consequence: "Wein verbessert sich nicht mit der Zeit im Restaurantkeller. Das Kapital bleibt untätig." },
      ],
    },
    {
      id: "capital-inmovilizado",
      title: "Wie man gebundenes Kapital erkennt",
      priority: "inmediato",
      porQueTeLoMostramos: {
        detected: "Winerim hat den Gesamtwert unverkaufter Flaschen in Ihrer Kellerei berechnet.",
        whyMatters: "Es ist echtes Geld das investiert ist aber keine Erträge generiert. Unsichtbar in der Gewinn- und Verlustrechnung aber sehr real in Ihrem Cashflow.",
        riskIfIgnored: "Ohne Maßnahme wächst gebundenes Kapital jeden Monat mit jeder neuen Bestellung die nicht der Nachfrage angepasst ist.",
      },
      queSignifica:
        "Gebundenes Kapital ist der Gesamtkaufwert aller Flaschen die Sie in der Kellerei haben die nicht verkaufen. Es ist keine abstrakte Zahl: es sind echte Euro die Sie investiert haben die aber keine Erträge generieren. Um es zu berechnen multiplizieren Sie die Einkaufskosten jeder Referenz ohne Verkäufe mit der Anzahl Flaschen im Bestand.",
      porQueImporta:
        "Weil es unsichtbares Geld ist. Es taucht nicht als Ausgabe in Ihrer Gewinn- und Verlustrechnung auf erzeugt aber auch keinen Umsatz. Es ist die stillste Art Rentabilität zu verlieren. Eine Restaurantgruppe kann Tausende Euro gebunden haben ohne dass jemand das weiß weil der Bestand über Standorte verteilt ist und niemand addiert es.",
      queHacer: [
        "Berechnen Sie den Gesamtwert des Bestands ohne Verkäufe in den letzten 60 Tagen (Kosten × Einheiten).",
        "Sortieren Sie vom höchsten zum niedrigsten: die Top 5 Referenzen machen wahrscheinlich 50 Prozent des Problems aus.",
        "Setzen Sie ein Ziel: Gebundenes Kapital in den nächsten 60 Tagen um 30 Prozent reduzieren.",
        "Etablieren Sie einen monatlichen Indikator: Gebundenes Kapital als Prozent des Gesamtbestands.",
      ],
      errores: [
        { mistake: "Gebundenes Kapital nie berechnen", consequence: "Sie wissen nicht wie viel Geld untätig sitzt. Sie können nicht verbessern was Sie nicht messen." },
        { mistake: "Nur Einheiten zählen nicht Eurowerth", consequence: "20 Flaschen bei 3 Euro sind nicht das gleiche wie 20 bei 25 Euro. Der Effekt ist radikal unterschiedlich." },
        { mistake: "Gesamtbestand überprüfen ohne rotierendes von nicht-rotierendem zu trennen", consequence: "Ihr Inventar sieht angemessen aus aber darin ist eine Schicht toten Kapitals die Sie nicht sehen können." },
      ],
    },
    {
      id: "cuando-impulsar",
      title: "Wann sollten Sie eine Referenz ankurbeln",
      priority: "esta semana",
      porQueTeLoMostramos: {
        detected: "Winerim hat Weine mit guter Marge und guten Bewertungen aber niedriger Rotation gefunden: sie verkaufen nicht aber könnten.",
        whyMatters: "Viele Weine verkaufen nicht wegen mangelnder Sichtbarkeit nicht Qualität. Ein 7-14-tägiger Ankurbel kann sie reaktivieren.",
        riskIfIgnored: "Sie listen potenziell rentable Weine aus ohne ihnen eine echte Verkaufschance zu geben.",
      },
      queSignifica:
        "Ankurbeln bedeutet einem Wein der nicht verkauft eine aktive zweite Chance geben. Es ist nicht Warten: es ist das Serviceteam mit dieser Referenz über einen spezifischen Zeitraum (7-14 Tage) arbeiten lassen und messen ob es antwortet. Wenn der Wein gut positioniert ist und der Gast ihn einfach nicht kennt kann ein Serviceteam-Ankurbel ihn reaktivieren.",
      porQueImporta:
        "Weil viele Weine nicht wegen mangelnder Qualität sondern mangelnder Sichtbarkeit nicht verkaufen. Wenn das Serviceteam ihn nicht kennt empfehlen sie ihn nicht. Wenn sie ihn nicht empfehlen verkauft er sich nicht. Und wenn er sich nicht verkauft listen Sie ihn aus ohne zu wissen ob er wirklich keine Nachfrage hatte.",
      queHacer: [
        "Wählen Sie 2-3 Referenzen mit niedriger Rotation aber guter Marge und gutem Preis-Leistungs-Verhältnis.",
        "Trainieren Sie das Serviceteam: lassen Sie sie kosten wissen wie man es beschreibt und haben Sie eine klare Vertriebslinie.",
        "Definieren Sie einen Ankurbelzeitraum (7-14 Tage) und ein Mindestumsatzziel.",
        "Wenn es am Ende der Periode nicht reagiert hat gehen Sie zur nächsten Stufe: Glas oder Auslistung.",
      ],
      errores: [
        { mistake: "Alles auf einmal ankurbeln", consequence: "Das Team kann nicht 10 neue Weine gleichzeitig empfehlen. Konzentrieren Sie sich." },
        { mistake: "Ankurbeln ohne das Team zu trainieren", consequence: "Wenn der Kellner nicht weiß was er sagen soll funktioniert der Ankurbel nicht." },
        { mistake: "Keine Deadline für den Ankurbel setzen", consequence: "Ohne Deadline wird der 'Ankurbel' zur ewigen Hoffnung." },
      ],
    },
    {
      id: "cuando-sacar-por-copa",
      title: "Wann man es zum Glaswein macht",
      priority: "esta semana",
      porQueTeLoMostramos: {
        detected: "Winerim hat langsame Referenzen gefunden die als Glaswein funktionieren könnten um Rotation zu beschleunigen.",
        whyMatters: "Das Glas senkt die Hürde des Gastes und lässt Sie das Kapital in Tagen statt Monaten zurückgewinnen.",
        riskIfIgnored: "Der Bestand bleibt untätig bis er sich verschlechtert oder Sie mit Verlust ausverkaufen.",
      },
      queSignifica:
        "Eine langsame Referenz zum Glas zu machen ist eine Rettungsstrategie: Statt auf jemanden zu warten der die Flasche bestellt bieten Sie sie als Glas an um Rotation zu beschleunigen und mindestens einen Teil der Investition zurückzugewinnen. Es funktioniert gut bei Weinen die gut sind aber der Gast nicht wagt per Flasche zu bestellen (hoher Preis unbekannte Traube unbekannte Region).",
      porQueImporta:
        "Weil das Glas die Hürde des Gastes senkt. Ein Wein den niemand für 35 Euro per Flasche bestellt kann leicht 8 Euro per Glas verkaufen. Außerdem lässt das Glas Sie das Kapital in Tagen statt Monaten zurückgewinnen. Aber es funktioniert nur wenn der Wein genug Rotation als Glas hat um die Flasche zu beendigen bevor er oxidiert.",
      queHacer: [
        "Bewerten Sie ob der Wein 24-48 Stunden offen ohne Qualitätsverlust hält (wenn nicht schließen Sie es aus für Glas).",
        "Berechnen Sie den Glaspeis inklusive echter Verschwendung (mindestens 20-25-Prozent-Verlust auf die Flasche).",
        "Sagen Sie dem Serviceteam es ist eine Prioritätsreferenz um als Glas zu empfehlen.",
        "Wenn Sie in 2 Wochen nicht mindestens 2-3 Gläser pro Woche verkauft haben listen Sie es aus und geben Sie den Platz frei.",
      ],
      errores: [
        { mistake: "Einen Wein als Glas machen der sich nicht offen hält", consequence: "Sie servieren oxidierten Wein verlieren Gastvertrauen und verschwenden die Flasche." },
        { mistake: "Den Glaspeis nicht anpassen um Verschwendung zu decken", consequence: "Sie verkaufen as Glas aber verlieren Geld weil sich die Flasche nie beendet." },
        { mistake: "Zu viele aktive Gläser von langsamen Weinen haben", consequence: "Sie öffnen 8 Flaschen verkaufen 2 Gläser jede und werfen den Rest weg." },
      ],
    },
    {
      id: "cuando-retirar",
      title: "Wann sollten Sie eine Referenz auslistung",
      priority: "inmediato",
      porQueTeLoMostramos: {
        detected: "Winerim hat Referenzen identifiziert die nicht auf Ankurbel oder Glas reagiert haben: klare Kandidaten für Auslistung.",
        whyMatters: "Jede Referenz ohne Rechtfertigung nimmt physischen und mentalen Platz von einer anderen die tatsächlich verkaufen könnte.",
        riskIfIgnored: "Sie behalten Totbestand auf unbegrenzte Zeit akkumulieren untätiges Kapital und Komplexität ohne Rückgabe.",
      },
      queSignifica:
        "Auslistung ist die letzte Option aber manchmal ist es die beste. Ein Wein sollte die Liste verlassen wenn: er durch Ankurbel und Glas gegangen ist ohne Ergebnis seine Marge rechtfertigt nicht den Aufwand oder er passt einfach nicht mehr zu Ihrem Konzept. Auslistung ist keine Niederlage: es ist Management. Das schlimmste was Sie tun können ist eine Referenz zu behalten die Platz einnimmt ohne etwas zu generieren.",
      porQueImporta:
        "Weil jede Referenz die Sie ohne Rechtfertigung behalten Platz (physisch und mental) von einer anderen nimmt die verkaufen könnte. Ihre Liste hat eine optimale Anzahl von Referenzen und Überschreitung verdünnt Gastaufmerksamkeit erschwert Operationen und erhöht Managementkosten.",
      queHacer: [
        "Wenn eine Referenz nicht auf Ankurbel oder Glas in 30 Tagen reagiert hat listen Sie sie aus.",
        "Entscheiden Sie was mit dem restlichen Bestand zu tun ist: ausverkaufen an Lieferanten zurückgeben oder innere Nutzung.",
        "Aktualisieren Sie die Liste und teilen Sie dem Team mit dass die Referenz nicht mehr verfügbar ist.",
        "Dokumentieren Sie die Entscheidung damit sie nicht in Zukunft nachbestellt wird.",
      ],
      errores: [
        { mistake: "Es behalten 'falls jemand danach fragt'", consequence: "Niemand wird danach fragen. Mittlerweile nimmt es Platz und Kapital." },
        { mistake: "Auslistung ohne den Grund zu dokumentieren", consequence: "Der nächste Sommelier oder Käufer könnte es wieder kaufen." },
        { mistake: "Keinen klaren Auslistungsprozess haben", consequence: "Entscheidungen werden auf unbegrenzte Zeit verschoben und Totbestand sammelt sich an." },
      ],
    },
    {
      id: "evolucion-stock",
      title: "Wie man Bestandsentwicklung liest",
      priority: "este mes",
      porQueTeLoMostramos: {
        detected: "Winerim überwacht Ihren Bestandstrend Monat für Monat: gebundenes Kapital Referenzen ohne Verkäufe und niedrige Rotation.",
        whyMatters: "Was wichtig ist ist nicht das heutige Bild sondern ob der Trend sich verbessert oder verschlechtert.",
        riskIfIgnored: "Bestand der sich jeden Monat verschlechtert wird zur Krise. Wenn Sie den Trend nicht beobachten reagieren Sie nur wenn es zu spät ist.",
      },
      queSignifica:
        "Bestandsentwicklung ist kein Bild: es ist ein Trend. Was wichtig ist ist nicht wie viel Bestand Sie heute haben sondern wie es sich im Vergleich zum letzten Monat geändert hat. Ist gebundenes Kapital gestiegen? Sind neue Referenzen ohne Verkäufe aufgetaucht? Verbessert sich der Prozentsatz der Liste mit niedriger Rotation oder verschlechtert sich? Die Entwicklung zu lesen lässt Sie Probleme vorahnen bevor sie zu Krisen werden.",
      porQueImporta:
        "Weil Bestand der sich jeden Monat verschlechtert signalisiert dass etwas in Ihrem Einkauf Ihrer Liste oder Ihrem Serviceteam fehlgeht. Wenn Sie den Trend nicht beobachten reagieren Sie nur wenn das Problem bereits groß ist. Wenn Sie das tun können Sie die Richtung korrigieren bevor gebundenes Kapital spiralt.",
      queHacer: [
        "Vergleichen Sie 3 Indikatoren jeden Monat: Gesamtgebundenes Kapital Anzahl der Referenzen ohne Verkauf in 60 Tagen und Prozent der Liste mit Rotation unter 1 pro Monat.",
        "Wenn einer der drei im Vergleich zum Vormonat steigt untersuchen Sie die Ursache bevor es sich sammelt.",
        "Verbinden Sie Bestandsentwicklung mit Ihren Einkaufsentscheidungen: kaufen Sie mehr als Sie verkaufen?",
        "Setzen Sie ein vierteljährliches Verbesserungsziel und überprüfen Sie es mit Ihrem Team jeden Monat.",
      ],
      errores: [
        { mistake: "Nur auf Gesamtbestand schauen ohne es nach Rotation aufzuschlüsseln", consequence: "Ihr Inventar mag stabil aussehen während Totbestand darin wächst." },
        { mistake: "Bestand nur überprüfen wenn es ein sichtbares Problem gibt", consequence: "Wenn Sie es sehen haben Sie bereits Monate gebundenes Kapital verloren." },
        { mistake: "Bestandsentwicklung nicht mit Einkaufsentscheidungen verbinden", consequence: "Sie kaufen weiterhin das das nicht verkauft weil niemand die Daten abgleicht." },
      ],
    },
  ],
  nextStep: {
    label: "Totbestand mit dem Rechner erkennen",
    href: "/herramientas/calculadora-stock-muerto",
    description: "Quantifizieren Sie das gebundenes Kapital in Referenzen ohne Verkauf und entscheiden Sie welche zuerst ausgelistet werden.",
  },
};

export default stockRotacionDE;
