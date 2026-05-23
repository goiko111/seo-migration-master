import { DollarSign } from "lucide-react";
import type { DeepAreaContent } from "./margenesPricing";

const margenesPricingDE: DeepAreaContent = {
  name: "Margen und Preisgestaltung",
  tagline: "Verstehen Sie die echte Rentabilität jedes Weins und handeln Sie datengestützt",
  intro: "Dieser Bereich hilft Ihnen, jeden Margen-, Preisgestaltungs- und Rentabilitätsindikator zu interpretieren, den Winerim Ihnen zeigt. Sie müssen kein Finanzexperte sein: Sie müssen wissen, worauf Sie achten müssen, warum es wichtig ist und was Sie mit jedem Datenpunkt tun sollten.",
  icon: DollarSign,
  accent: "text-amber-500",
  bg: "bg-amber-500/10",
  audiences: ["direccion", "compras-fb"],
  topErrors: [
    { error: "Preise erhöhen, ohne vorher die Einkaufskosten zu überprüfen", porQueOcurre: "Weil es einfacher ist, den Verkaufspreis zu ändern als mit dem Lieferanten zu verhandeln. Die Annahme ist, dass niedrige Margen ein Preisproblem sind, aber oft liegt der Ursprung beim Einkauf.", consecuencia: "Sie erhöhen den Preis für den Gast (der das bemerkt), während Sie die Marge durch Neuverhandlung des Einkaufs unsichtbar hätten verbessern können." },
    { error: "Einen einheitlichen Aufschlag auf die gesamte Weinkarte anwenden", porQueOcurre: "Weil es die Verwaltung vereinfacht und 'gerecht' klingt. Ein x3 auf alles klingt angemessen.", consecuencia: "Sie verlieren Marge bei günstigen Weinen (wo der Gast preisempfindlich ist) und sind bei teuren Weinen unkonkurrenzfähig (wo der Aufschlag niedriger sein sollte)." },
    { error: "Margen nicht jeden Monat überprüfen", porQueOcurre: "Weil der Alltag die ganze Zeit in Anspruch nimmt und die Margen stabil wirken. Aber die Kosten steigen, die Merzahl variiert und die Nachfrage ändert sich.", consecuencia: "Abweichungen sammeln sich unbemerkt an. Sie sehen sie nur, wenn Sie das Quartal abschließen und die Zahlen nicht aufgehen." },
    { error: "Glasweinpreis durch Division der Flasche durch 5 festlegen", porQueOcurre: "Weil dies die schnellste Kopfrechnung ist. Aber es ignoriert Merzahl, Service und die zusätzliche Marge, die das Glas generieren sollte.", consecuencia: "Sie verkaufen Gläser mit Verlust ohne es zu wissen. Eine 25-prozentige echte Merzahl wandelt Ihre theoretische 70-prozentige Marge in eine echte 35-prozentige Marge um." },
    { error: "Einen Wein mit guter Marge aber ohne Umsatz behalten", porQueOcurre: "Weil die Margenzahl positiv aussieht und beruhigend wirkt. Aber ein Wein, der sich nicht verkauft, generiert keine echte Marge.", consecuencia: "Gebundenes Kapital, das Platz in der Kellerei und auf der Weinkarte einnimmt, ohne Ertrag zu generieren. Die potenzielle Marge wird sich nie materialisieren." },
  ],
  links: [
    { label: "Margenrechner", href: "/calculadora-margen-vino", description: "Berechnen Sie die echte Marge jeder Referenz in Sekunden", type: "tool" },
    { label: "Vorlage: Monatliche Margenüberprüfung", href: "/recursos/plantilla-revision-mensual-margenes", description: "Monatlicher Prozess zur Erkennung von Abweichungen und Chancen", type: "resource" },
    { label: "Ressource: Margenanalyse", href: "/recursos/scorecard-mensual", description: "Scorecard zur Überwachung Ihrer Preisgestaltungsgesundheit", type: "resource" },
    { label: "Winerim Core", href: "/producto/winerim-core", description: "Die analytische Engine, die all das für Sie automatisiert", type: "product" },
    { label: "Blog: 7 Fehler bei der Preisgestaltung", href: "/article/errores-fijar-precios-vino-restaurante", description: "Die häufigsten Fehler bei der Preisgestaltung und wie man sie vermeidet", type: "article" },
    { label: "Blog: Hebel zur Margenverbesserung", href: "/article/palancas-mejorar-margen-vino-sin-rehacer-carta", description: "Wie Sie die Marge verbessern ohne die Weinkarte umzugestalten", type: "article" },
    { label: "Blog: Wein-F&B-Metriken", href: "/article/metricas-fb-vino-restaurante", description: "Die Metriken, die jeder F&B-Manager überwachen sollte" },
  ],
  miniCases: [
    {
      profile: "Gastronomiebetrieb mit 60-teiliger Weinkarte",
      situation: "Durchschnittliche Marge von 58 Prozent, aber die 5 meistverkauften Referenzen hatten einen x2,2-Aufschlag, weil sie nach der letzten Lieferantenpreiserhöhung nie aktualisiert wurden.",
      action: "Berechnete Preise der 5 Top-Referenzen neu. Erhöhte je nach Preisbereich um 1 bis 3 Euro. Gab dem Serviceteam Argumentationshilfen zur Rechtfertigung der Änderung.",
      result: "Durchschnittliche Marge stieg auf 63 Prozent ohne einen einzigen Verkauf bei diesen Referenzen zu verlieren. Geschätzter Effekt: +1.800 Euro/Monat.",
    },
    {
      profile: "Casual-Dining mit 35 Referenzen",
      situation: "Wendet einheitlichen x3-Aufschlag auf die ganze Weinkarte an. Einführungsweine (Kosten unter 5 Euro) kosteten 15 Euro und verkauften sich nicht; Weine über 15 Euro Kosten kosteten 45 Euro und verkauften sich auch nicht.",
      action: "Implementierte gestaffelten Aufschlag: x3,5 bei Weinen unter 8 Euro Kosten, x2,8 im mittleren Bereich, x2,2 bei Prestige-Weinen.",
      result: "Durchschnittliches Weinticket stieg um 12 Prozent, weil Gäste aufhörten, immer den billigsten zu wählen.",
    },
  ],
  subtopics: [
    {
      id: "margen-bruto",
      title: "Was ist Bruttogewinn",
      priority: "esta semana",
      porQueTeLoMostramos: {
        detected: "Winerim hat den Bruttogewinn jeder Referenz auf Ihrer Weinkarte berechnet, indem Verkaufspreis mit echtem Einkaufspreis abgeglichen wurde.",
        whyMatters: "Wenn Sie nicht zwischen Gewinnspannenprozentzahl und absoluten Beitrag unterscheiden, können Sie die falschen Weine fördern.",
        riskIfIgnored: "Sie fördern weiterhin Weine, die prozentual rentabel erscheinen, aber Ihnen in Euro weniger bringen als andere, die Sie nicht beachten.",
      },
      queSignifica:
        "Der Bruttogewinn ist die Differenz zwischen dem, was Sie für einen Wein einnehmen, und dem, was Sie ihn kosten. Er wird in Euro (Beitrag) oder Prozent ausgedrückt. Dies ist die grundlegendste Rentabilitätsmetrik, aber nicht die einzige, die wichtig ist. Ein Wein mit 60-prozentigem Gewinn kann Ihnen weniger echtes Geld bringen als ein anderer mit 45-prozentigem Gewinn, wenn letzterer zum doppelten Preis verkauft wird.",
      porQueImporta:
        "Weil es der Ausgangspunkt für jede Preisgestaltungsentscheidung ist. Wenn Sie Ihren Bruttogewinn pro Referenz nicht kennen, treffen Sie Entscheidungen blind. Und wenn Sie nur das Prozent ansehen, ohne den absoluten Beitrag zu sehen, können Sie die falschen Weine fördern.",
      queHacer: [
        "Berechnen Sie den Bruttogewinn in Euro und Prozent für Ihre 10 meistverkauften Referenzen.",
        "Sortieren Sie nach absolutem Beitrag (Euro), nicht nach Prozent.",
        "Vergleichen Sie: Sind Ihre meistverkauften Weine auch jene, die die meiste Marge bringen?",
        "Wenn nicht, haben Sie eine sofortige Repricing-Gelegenheit.",
      ],
      errores: [
        { mistake: "Nur die Gewinnprozentzahl ansehen", consequence: "Ein 8-Euro-Wein mit 65-prozentigem Gewinn bringt 5,20 Euro. Ein 25-Euro-Wein mit 50-prozentigem Gewinn bringt 12,50 Euro. Der zweite ist ein besseres Geschäft." },
        { mistake: "Gewinn auf Verkaufspreis statt auf Kosten berechnen", consequence: "Sie täuschen sich selbst mit einer höheren Zahl, die nicht widerspiegelt, was Sie wirklich verdienen." },
        { mistake: "Kosten nach Lieferantenwechsel nicht aktualisieren", consequence: "Ihre theoretische Marge existiert nicht mehr: Sie verkaufen, glauben zu verdienen, tun aber nicht." },
      ],
    },
    {
      id: "margen-sano",
      title: "Was ist eine gesunde Gewinnspanne",
      priority: "este mes",
      porQueTeLoMostramos: {
        detected: "Winerim hat Ihren gewichteten Durchschnittsaufschlag mit dem Benchmark Ihres Segments verglichen.",
        whyMatters: "Wenn Sie unter dem gesunden Bereich liegen, haben Sie ein strukturelles Problem, das nicht durch mehr Verkäufe behoben werden kann.",
        riskIfIgnored: "Jeden Monat, in dem die Marge nicht ausgerichtet ist, verlieren Sie kumulierte Rentabilität, die Sie nicht mehr zurück bekommen.",
      },
      queSignifica:
        "Es gibt keine universelle 'korrekte' Gewinnspanne. Dies hängt von Ihrem Segment, Ihrem Durchschnittsticket, Ihrem Volumen und Ihrer Kostenstruktur ab. Aber es gibt Marktrichtwerte: Die meisten rentablen Restaurants arbeiten mit einem gewichteten Durchschnittsaufschlag zwischen x2,5 und x3,5 auf Kosten, was Bruttogewinnen von 60-72 Prozent entspricht. Wichtig ist nicht eine feste Zahl, sondern dass Ihre umsatzgewichtete Durchschnittsmarge mit Ihrem Geschäftsmodell übereinstimmt.",
      porQueImporta:
        "Weil Sie, wenn Ihre durchschnittliche Marge unter dem Benchmark Ihres Segments liegt, ein strukturelles Problem haben, das nicht durch mehr Verkäufe gelöst werden kann. Und wenn sie weit darüber liegt, könnten Sie Wettbewerbsfähigkeit und Volumen verlieren, ohne es zu wissen.",
      queHacer: [
        "Berechnen Sie Ihren umsatzgewichteten Durchschnittsaufschlag (nicht pro Referenz).",
        "Vergleichen Sie mit dem Benchmark Ihres Segments: Casual (x2,5-3), Gastronomiebetrieb (x2-2,5), Hotel (x3-4).",
        "Wenn Sie darunter liegen, identifizieren Sie die Referenzen, die den Durchschnitt senken.",
        "Wenn Sie darüber liegen, bewerten Sie, ob Ihr Glas- und Flaschenvolumen dem erwarteten Niveau entspricht.",
      ],
      errores: [
        { mistake: "Einen einheitlichen Aufschlag auf die gesamte Weinkarte anwenden", consequence: "Sie verlieren Marge bei günstigen Weinen und sind bei teuren unkonkurrenzfähig." },
        { mistake: "Ihre Marge mit der eines anderen Segments vergleichen", consequence: "Ein Hotel hat eine andere Kostenstruktur als ein Bistro. Sie sind nicht vergleichbar." },
        { mistake: "Nicht nach Umsatz gewichten", consequence: "Ihr Durchschnittgewinn sieht gut aus, aber Ihre Bestseller haben die schlechteste Marge." },
      ],
    },
    {
      id: "referencias-mal-calibradas",
      title: "Wie man schlecht kalibrierte Referenzen erkennt",
      priority: "inmediato",
      porQueTeLoMostramos: {
        detected: "Winerim hat Referenzen identifiziert, deren Preis nicht zu Kosten, Position oder Geschäftsrolle passt.",
        whyMatters: "Eine einzige schlecht kalibrierte Referenz in Ihren Top 5 kann Sie Tausende Euro pro Jahr kosten, ohne dass Sie es bemerken.",
        riskIfIgnored: "Der Effekt summiert sich Tag für Tag und Sie sehen es erst, wenn Sie das Quartal abschließen und die Marge nicht stimmt.",
      },
      queSignifica:
        "Eine schlecht kalibrierte Referenz ist ein Wein, dessen Preis nicht die echten Kosten, seine Position oder Geschäftsrolle widerspiegelt. Er könnte zu billig sein (Marge verlieren), zu teuer (rotiert nicht) oder schlecht positioniert gegenüber anderen Weinen in der gleichen Spanne.",
      porQueImporta:
        "Weil eine einzelne schlecht kalibrierte Referenz in Ihren Top-5-Verkäufern Sie Tausende Euro pro Jahr kosten kann. Und wenn Sie mehrere haben, summiert sich der Effekt unsichtbar Tage um Tag auf.",
      queHacer: [
        "Kreuzen Sie Ihre 10 Bestseller mit ihrer Marge: suchen Sie jene, die am meisten verkaufen aber am wenigsten bringen.",
        "Identifizieren Sie Referenzen mit Aufschlag unter x2 oder über x4,5 (beide Extreme sind Warnsignale).",
        "Prüfen Sie, ob Weine zum identischen Preis aber sehr unterschiedliche Kosten haben: einer davon ist schlecht kalibriert.",
        "Korrigieren Sie mindestens eine Referenz diese Woche und messen Sie den Effekt in 30 Tagen.",
      ],
      errores: [
        { mistake: "Annehmen, dass wenn es sich gut verkauft, der Preis richtig ist", consequence: "Ein Wein kann genau deshalb viel verkauft werden, weil er zu billig ist." },
        { mistake: "Nicht überprüfen nach Kostenänderung des Lieferanten", consequence: "Die Marge verschwindet ohne dass Sie es bemerken, bis zum Ende des Monats." },
        { mistake: "Nur nach Kosten kalibrieren ohne Gastwahrnehmung zu berücksichtigen", consequence: "Eine aggressive Neupreisgestaltung kann das Vertrauen des Stammgastes beschädigen." },
      ],
    },
    {
      id: "cuando-subir-precio",
      title: "Wann Sie einen Preis erhöhen sollten",
      priority: "esta semana",
      porQueTeLoMostramos: {
        detected: "Winerim hat Referenzen mit hohem Verkaufsvolumen aber Marge unter Ihrem Durchschnitt gefunden.",
        whyMatters: "Dies sind klare Kandidaten für eine 1-2-Euro-Erhöhung, die die Nachfrage selten beeinflusst, aber Ihr Ergebnis täglich verbessert.",
        riskIfIgnored: "Jede Serviceleistung, die vorbeigehen, ohne den Preis zu korrigieren, ist Marge, die Sie verlieren und nicht zurück bekommen.",
      },
      queSignifica:
        "Preise zu erhöhen ist nicht immer die Antwort, aber oft die direkteste Aktion zur Verbesserung der Rentabilität. Der richtige Zeitpunkt ist, wenn Sie Daten haben, das zu rechtfertigen: Eine Marge unter Benchmark, ein Kostenwert der gestiegen ist, eine Referenz die gut verkauft aber niedrige Marge hat, oder eine Preisrange ohne interne Konkurrenz.",
      porQueImporta:
        "Weil viele Restaurants Preiserhöhungen aus Angst vor Kundenverlust vermeiden, aber die Realität ist, dass 1-2-Euro-Erhöhungen bei strategischen Referenzen die Nachfrage selten beeinflussen. Andererseits kostet Sie Nicht-Erhöhen wenn Sie sollten die Marge jeden Tag.",
      queHacer: [
        "Identifizieren Sie die 3 Referenzen mit dem höchsten Verkaufsvolumen und Marge unter Durchschnitt.",
        "Bewerten Sie eine 1-2-Euro-Erhöhung und berechnen Sie die jährliche Auswirkung (Volumen x Erhöhung).",
        "Überprüfen Sie, dass der neue Preis nicht mit einer anderen Referenz in der gleichen Range konkurriert.",
        "Implementieren Sie die Änderung und überprüfen Sie Verkäufe nach 30 Tagen. Wenn das Volumen nicht sinkt, war der Preis richtig.",
      ],
      errores: [
        { mistake: "Alle Preise auf einmal erhöhen", consequence: "Der Stammgast bemerkt die Änderung und die Wertwahrnehmung leidet." },
        { mistake: "Aus Angst vor Reaktion nie erhöhen", consequence: "Ihre Marge erodiert Jahr für Jahr während die Kosten steigen." },
        { mistake: "Erhöhen ohne Preis-Range zu überprüfen", consequence: "Sie erzeugen eine Preisspanne oder Überlappung, die vorher nicht existierte." },
      ],
    },
    {
      id: "cuando-revisar-compra",
      title: "Wann Sie den Einkauf überprüfen sollten",
      priority: "esta semana",
      porQueTeLoMostramos: {
        detected: "Winerim hat Referenzen mit niedriger Marge gefunden, deren Einkaufspreis im Vergleich zu historischen Daten gestiegen ist.",
        whyMatters: "Jeder Euro den Sie beim Einkauf sparen ist direkte Marge, für den Gast unsichtbar aber sehr sichtbar in Ihrer Gewinn- und Verlustrechnung.",
        riskIfIgnored: "Sie zahlen weiterhin mehr als nötig aus Lieferantentreue, nicht aus empfangenem Wert.",
      },
      queSignifica:
        "Eine niedrige Marge wird nicht immer durch Preiserhöhung gelöst. Manchmal liegt das Problem darin, dass Sie zu teuer einkaufen. Einkauf überprüfen bedeutet zu überprüfen, ob die Einkaufskosten einer Referenz noch wettbewerbsfähig sind, ob es billigere Alternativen mit äquivalenter Qualität gibt, oder ob Sie bessere Bedingungen verhandeln können.",
      porQueImporta:
        "Weil jeder Euro den Sie beim Einkauf sparen ein Euro direkte Marge ist. Und anders als Preiserhöhung (die der Gast sieht) ist Einkaufsverbesserung für den Gast unsichtbar aber sehr sichtbar auf Ihrer Gewinn- und Verlustrechnung.",
      queHacer: [
        "Identifizieren Sie Referenzen mit niedriger Marge und überprüfen Sie ihre Kostenhistorie: ist sie gestiegen?",
        "Fordern Sie mindestens 2 alternative Angebote für diese Referenzen an.",
        "Verhandeln Sie mit Ihrem aktuellen Lieferanten mit Marktpreisen als Hebel.",
        "Wenn der Unterschied größer als 10 Prozent ist, erwägen Sie den Wechsel oder nutzen Sie die Verhandlung für bessere Bedingungen.",
      ],
      errores: [
        { mistake: "Kosten nicht überprüfen weil 'Sie immer bei demselben kaufen'", consequence: "Sie zahlen mehr als nötig aus Treue, nicht aus Wert." },
        { mistake: "Nur Preis vergleichen ohne Service und Bedingungen zu bewerten", consequence: "Ein billiger aber unzuverlässiger Lieferant kostet Sie langfristig mehr." },
        { mistake: "Niedrige Marge nicht mit Einkaufsursprung verbinden", consequence: "Sie suchen die Lösung im Verkaufspreis wenn das Problem bei den Kosten liegt." },
      ],
    },
    {
      id: "cuando-revisar-copeo",
      title: "Wann Sie das Glas-Programm überprüfen sollten",
      priority: "esta semana",
      porQueTeLoMostramos: {
        detected: "Winerim hat Glaswein-Referenzen gefunden, deren echte Marge sich erheblich von der theoretischen unterscheidet.",
        whyMatters: "Das Glas kann Ihr bester Margenhebel oder Ihre größte Quelle unsichtbaren Verlusts sein. Ein 0,50-Euro-Fehler pro Glas über 20 Gläser/Woche sind über 500 Euro/Jahr verloren.",
        riskIfIgnored: "Sie servieren weiterhin Gläser zu Verlustpreisen ohne es zu wissen, weil Sie Merzhahl-Daten nie mit Preisgestaltung abgeglichen haben.",
      },
      queSignifica:
        "Wenn eine Referenz niedrige Marge hat und per Glas serviert wird, kann das Problem beim Glas-Programm liegen: schlecht berechneter Glaspeis, nicht berücksichtigte Merzhahl oder unzureichende Rotation. Das Glas vervielfacht Preisgestaltungsfehler, weil jede Flasche in 4-6 Portionen aufgeteilt wird und jede Abweichung sich bei jedem Glas wiederholt.",
      porQueImporta:
        "Weil das Glas Ihr bester Margenhebel sein kann (bis x3 über Flasche) oder Ihre größte Quelle unsichtbaren Verlusts. Ein 0,50-Euro-Fehler pro Glas, multipliziert mit 20 Gläsern pro Woche, sind über 500 Euro pro Jahr verloren bei einer einzelnen Referenz.",
      queHacer: [
        "Berechnen Sie den Glaspreis neu mit echter Merzhahl (mindestens 20-25-prozentige Verluste annehmen).",
        "Vergleichen Sie die Glasmarge mit der Flaschenm Gleichzeit der gleichen Referenz.",
        "Wenn das Glas nicht mehr Marge als die Flasche bringt, haben Sie entweder ein Preis- oder Merzhahl-Problem.",
        "Prüfen Sie ob die Glasreferenz genug Rotation hat um die Flasche in 24-48 Stunden zu beenden.",
      ],
      errores: [
        { mistake: "Flaschenpreis durch 5 teilen um Glaspeis zu setzen", consequence: "Sie decken Merzhahl, Service oder Marge nicht. Sie verkaufen mit Verlust ohne es zu wissen." },
        { mistake: "Echte Merzhahl für jede Glasreferenz nicht messen", consequence: "Ihre theoretische und echte Marge können sich um 30 Prozent oder mehr unterscheiden." },
        { mistake: "Gläser mit niedriger Rotation halten weil 'sie gut auf der Weinkarte aussehen'", consequence: "Jede nicht beendete Flasche ist weggeworfenes Geld." },
      ],
    },
    {
      id: "revision-mensual",
      title: "Wie Sie eine monatliche Margenüberprüfung lesen",
      priority: "este mes",
      porQueTeLoMostramos: {
        detected: "Winerim generiert automatisch einen monatlichen Margenvergleich damit Sie Abweichungen sehen bevor sie sich summieren.",
        whyMatters: "Lieferanten erhöhen Preise, Merzhahl variiert mit Saison und Nachfrage ändert sich. Ohne monatliche Überprüfung häufen sich Überraschungen.",
        riskIfIgnored: "Abweichungen addieren sich still und Sie sehen sie erst wenn das Quartal schlechter als erwartet abschließt.",
      },
      queSignifica:
        "Eine monatliche Margenüberprüfung ist der Prozess zu überprüfen, jeden Monat, ob Ihre Weinkarte noch rentabel ist. Sie beinhaltet Vergleich der aktuellen Margen mit dem letzten Monat, Erkennung von Kostenabweichungen, Identifizierung von Referenzen die Performance geändert haben und Entscheidung über Anpassungen. Dies ist kein Bericht: es ist ein wiederkehrend entscheidungsfindender Prozess.",
      porQueImporta:
        "Weil Margen sich ohne Ihr Tun ändern. Lieferanten erhöhen Preise, Nachfrage variiert, Gläser erzeugen verschiedene Merzhahl je nach Saison. Wenn Sie nicht monatlich überprüfen, summieren sich Abweichungen und werden unangenehme Quartals-Überraschungen.",
      queHacer: [
        "Reservieren Sie sich 1 Stunde pro Monat zur Margenüberprüfung. Schreiben Sie das als operationale Routine in den Kalender.",
        "Vergleichen Sie diesen Monat umsatzgewichtete Durchschnittsmarge mit letztem Monat. Oben oder unten?",
        "Identifizieren Sie die 3 Referenzen mit größtem Margenfall und suchen Sie die Ursache (Kosten, Volumen, Merzhahl).",
        "Treffen Sie mindestens 1 Anpassungsentscheidung pro Überprüfung: Neupreisgestaltung, Glasänderung, Lieferanten-Verhandlung.",
      ],
      errores: [
        { mistake: "Monatliche Überprüfung überspringen weil 'keine Zeit'", consequence: "Abweichungen summieren sich und Sie sehen sie erst wenn es ein großes Problem ist." },
        { mistake: "Nur die Gesamtdurchschnittsmarge überprüfen", consequence: "Der Durchschnitt sieht gut aus während 5 Referenzen im roten sind." },
        { mistake: "Überprüfen ohne konkrete Entscheidung zu treffen", consequence: "Die Überprüfung wird zu einer theoretischen Übung die nichts ändert." },
      ],
    },
  ],
  nextStep: {
    label: "Öffnen Sie den Margenrechner",
    href: "/calculadora-margen-vino",
    description: "Berechnen Sie die echte Marge Ihrer Referenzen und erkennen Sie jene, die eine Preisanpassung brauchen.",
  },
};

export default margenesPricingDE;
