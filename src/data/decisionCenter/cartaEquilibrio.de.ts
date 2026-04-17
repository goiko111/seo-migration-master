import { BarChart3 } from "lucide-react";
import type { DeepAreaContent } from "./margenesPricing";

const cartaEquilibrioDE: DeepAreaContent = {
  name: "Weinkarte & Ausgewogenheit",
  tagline: "Ihre Weinkarte sollte eine kohaerent Geschichte erzaehlen",
  intro: "Dieser Bereich hilft Ihnen zu beurteilen, ob Ihre Weinkarte die richtige Struktur hat, um zu verkaufen, nicht nur um zu beeindrucken. Eine Karte auszubalancieren bedeutet nicht, 'ein bisschen von allem' zu haben: es bedeutet, dass jede Reference eine klare Rolle hat. Besonders fuer grosse, komplexe Karten - ab 250 References aufwaerts - hoert Ausgewogenheit auf, eine aesthetische Frage zu sein, und wird zur strategischen Entscheidung, die direkt Verkauf, Bestand und Gastefaehigkeit beeinflusst.",
  icon: BarChart3,
  accent: "text-wine",
  bg: "bg-wine/10",
  audiences: ["sala", "direccion", "compras-fb"],
  topErrors: [
    { error: "Karte durch Ansammlung statt durch Design aufbauen", porQueOcurre: "Weil jeder neue Wein hinzugefuegt wird, ohne einen anderen zu entfernen. Der Lieferant bietet an, der Sommelier akzeptiert, die Karte waechst ohne Kriterien.", consecuencia: "Die Karte bloat auf, wird unausgewogen und fuellt sich mit Redundanzen, die Verkaeufe kannibalislieren und Totbestand generieren." },
    { error: "Ein Preistier saettigen, ohne andere abzudecken", porQueOcurre: "Weil Sie kaufen, was Ihnen gefaellt oder was der Regellieferant anbietet, der normalerweise im gleichen Tier arbeitet.", consecuencia: "Sie konkurrieren mit sich selbst bei EUR 25-35, waehrend Gaeste, die etwas unter EUR 20 oder ueber EUR 50 suchen, keine Optionen finden." },
    { error: "Unausgewogenheit nach Herkunft: 80% aus einer einzigen Appellation", porQueOcurre: "Weil die Komfortzone des Kaeufers oder geografische Naehe Kaeufe von wenigen Urspruengen konzentriert.", consecuencia: "Abhaengigkeit von einem Markt (Preisrisiko), mangelnde Vielfalt fuer den Gast und eine Karte, die keine interessante Geschichte erzaehlt." },
    { error: "Hinzufuegen ohne Entfernen: 'mehr Optionen, besser'", porQueOcurre: "Weil das Entfernen sich wie Verlust anfuehlt und Hinzufuegen wie Gewinn. Aber ueber einen bestimmten Punkt hinaus schwaeicht jede neue Reference die Aufmerksamkeit.", consecuencia: "Der Gast brauchst laenger zum Entscheiden, das Team kann die volle Karte nicht kennen, und Verkaeufe konzentrieren sich auf 15-20 References waehrend der Rest Dekoration ist." },
    { error: "Karte nicht kartieren, bevor Entscheidungen getroffen werden", porQueOcurre: "Weil Sie von der Reference-Liste arbeiten, ohne die Struktur zu visualisieren. Entscheidungen werden einzeln getroffen, ohne das ganze Bild zu sehen.", consecuencia: "Sie fuegen dort zu, wo Sie bereits gesaettigt sind, und hinterlassen Luecken, wo es Nachfrage gibt. Es ist wie ein Haus zu renovieren, ohne den Grundriss anzuschauen." },
  ],
  links: [
    { label: "Weinkarten-Kartierungs-Vorlage", href: "/recursos/plantilla-wine-mapping-restaurante", description: "Kartieren Sie Ihre Karte nach Typ, Preis, Herkunft und kommerzieller Rolle", type: "resource" as const },
    { label: "Karten-Ausgewogenheits-Vorlage", href: "/recursos/plantilla-equilibrio-carta", description: "Diagnoseo Saettigung, Luecken und Kannibalismus nach Tier", type: "resource" as const },
    { label: "Profitable Kartenchecklist", href: "/recursos/checklist-carta-rentable", description: "Ueberpruefen Sie, ob Ihre Karte die Kriterien einer Karte erfuellt, die verkaeuft", type: "resource" as const },
    { label: "Winerim Core", href: "/producto/winerim-core", description: "Das Analyse-Engine, das Ihre Karten-Ausgewogenheit automatisch evaluiert", type: "product" as const },
    { label: "Blog: Ist Ihre Karte unausgewogen?", href: "/article/como-saber-si-carta-vinos-esta-descompensada", description: "Schnelle Diagnose, um Unausgeglichenheiten in Ihrer Weinkarte zu erkennen", type: "article" as const },
    { label: "Blog: Ist Ihre Karte zu lang?", href: "/article/cuando-carta-vinos-es-demasiado-larga", description: "Anzeichen zu vieler References und wie man handelt", type: "article" as const },
  ],
  subtopics: [
    {
      id: "carta-descompensada",
      title: "Wie Sie erkennen, ob eine Karte unausgewogen ist",
      priority: "esta semana",
      porQueTeLoMostramos: { detected: "Winerim hat die Verteilung Ihrer Karte nach Typ, Preis und Herkunft kartiert und Saettigung und Luecken gefunden.", whyMatters: "Eine unausgewogene Karte verliert Verkaeufe (der Gast kann nicht finden, was er sucht), kannibalisiert die Gewinnspanne und sammelt Stock an, wo es Ueberfluss gibt.", riskIfIgnored: "Jede neue Reference, die ohne Kriterien hinzugefuegt wird, macht die Karte unausgewogener und versstaerkt das Problem." },
      queSignifica:
        "Eine unausgewogene Karte ist eine, bei der die Reference-Verteilung nicht widerspiegelt, was Ihre Kunden tatsaechlich bestellen. Es koennte ein Ueberfluss an Rotweinen und fast keine Sekte sein, eine uebertriebene Konzentration in einem Preistier, oder 40% der Karte fuer eine einzige Region. Unausgewogenheit ist nicht auf den ersten Blick sichtbar: Sie wird erkannt, wenn Sie die Karte nach Variablen kartieren und mit Ihren Verkaufsdaten vergleichen.",
      porQueImporta:
        "Weil eine unausgewogene Karte drei Probleme gleichzeitig erzeugt: Der Gast kann nicht finden, was er sucht (verlorener Verkauf), gesaettigte References kannibalisieren sich gegenseitig (verlorene Gewinnspanne) und Sie sammeln Stock in Bereichen des Ueberfluss an (gebundenes Kapital). In grossen Karten - ab 250 References aufwaerts - versstaerkt sich die Unausgewogenheit exponentiell.",
      queHacer: [
        "Kartieren Sie Ihre Karte nach Weintyp (rot, weiss, rose, Sekt, Fortifiziert) und berechnen Sie den % von jedem.",
        "Kreuzen Sie diese Verteilung mit Ihren Verkaufsdaten: Ist 70% Ihrer Karte rot, aber 40% Ihrer Verkaeufe weiss?",
        "Identifizieren Sie die 3 am staerksten gesaettigten Kategorien und die 2 leersten. Das sind Ihre Chancen.",
        "Legen Sie eine Zielverteilung fest, die mit Ihrem Konzept konsistent ist, und ueberpruefen Sie sie quartalsweise.",
      ],
      errores: [
        { mistake: "Annehmen, dass die Karte ausgewogen ist, weil 'sie ein bisschen von allem hat'", consequence: "Ein bisschen von allem ist nicht Ausgewogenheit. Sie koennten 60 Rotweine und 4 Weissweine haben." },
        { mistake: "Ausgewogenheit nach Anzahl der References austarieren, ohne Verkaeufe zu betrachten", consequence: "Sie koennten 20 Sekt-Weine haben und 2 verkaufen. Ausgewogenheit sollte Nachfrage widerspiegeln." },
        { mistake: "Ausgewogenheit nach dem Hinzufuegen neuer References nicht ueberpruefen", consequence: "Jedes Hinzufuegen ohne Kriterien macht die Karte etwas unausgewogener." },
      ],
    },
    {
      id: "exceso-huecos-precio",
      title: "Ueberfluss und Luecken nach Preisbereich",
      priority: "esta semana",
      porQueTeLoMostramos: { detected: "Winerim hat Ihre Reference-Verteilung nach Preistier analysiert und gesaettigte Zonen und leere Tiers gefunden.", whyMatters: "Preis ist der erste Filter des Gastes. Saettigung eines Tiers erzeugt Kannibalismus; Luecken lassen die Verkaeufe verlieren, die Sie nie sehen.", riskIfIgnored: "Sie saettigen weiterhin Tiers, wo Sie bereits mit sich selbst konkurrieren, waehrend der Gast, der etwas anderes sucht, ohne Bestellung geht." },
      queSignifica:
        "Preisbereichs sind die Tiers, in die Ihre References verteilt sind: EUR 10-15, EUR 15-25, EUR 25-40, usw. Ueberfluss in einem Tier bedeutet, dass Sie zu viele References haben, die um den gleichen Gast im gleichen Bereich konkurrieren. Eine Luecke bedeutet, dass es einen Tier gibt, wo der Gast sucht und nichts findet. Beide sind Probleme, aber Ueberfluss ist teurer (erzeugt Kannibalismus und Stock) und Luecken sind unsichtbarer (Sie verlieren Verkaeufe, die Sie nie sehen).",
      porQueImporta:
        "Weil Preis der erste Filter des Gastes ist. Wenn Ihre Karte 15 Rotweine zwischen EUR 18 und EUR 22 hat und keine zwischen EUR 30 und EUR 40, saettigen Sie den unentschlossenen Gast in einem Tier und verlieren den, der nach etwas Besonderem sucht. In grossen Karten vervielfacht sich dieser Effekt: Jedes gesaettigte Tier ist ein Kannibalismus-Nest.",
      queHacer: [
        "Teilen Sie Ihre Karte in Preistiers auf (z.B. <EUR 15, EUR 15-25, EUR 25-40, EUR 40-60, >EUR 60) und zaehlen Sie References in jedem.",
        "Identifizieren Sie Tiers mit mehr als 10 References des gleichen Typs: Das ist Saettigung.",
        "Suchen Sie nach leeren Tiers oder solchen mit weniger als 2 Optionen: Das ist eine Luecke zum Fuellen.",
        "Vergleichen Sie Preisverteilung mit Ihrem durchschnittlichen Weinbon: Sind die meisten Ihrer Optionen in dem Tier, den Ihr Gast waehlt?",
      ],
      errores: [
        { mistake: "Keine Sichtbarkeit der Verteilung nach Preistier", consequence: "Sie wissen nicht, wo Sie gesaettigt oder wo Sie Luecken haben, bis ein Gast es Ihnen sagt." },
        { mistake: "References hinzufuegen, ohne zu pruefen, in welchen Tier sie fallen", consequence: "Jede neue Reference, die in einem gesaettigten Tier landet, verwaessert das Problem." },
        { mistake: "Eine Luecke mit einem Wein fuellen, der nicht zum Konzept passt", consequence: "Etwas in diesem Tier zu haben ist nicht genug: es muss mit Ihrem Restaurant konsistent sein." },
      ],
    },
    {
      id: "equilibrio-estilos",
      title: "Ausgewogenheit nach Stil",
      priority: "este mes",
      porQueTeLoMostramos: { detected: "Winerim hat Ihre Karte nach organoleptischem Profil klassifiziert und ubermassige Konzentration in bestimmten Stilen erkannt.", whyMatters: "Wenn alle Ihre Rotweine kraftvoll oder alle Ihre Weissweine fruchtig sind, begrenzen Sie Ihren potenziellen Markt auf einen Geschmackstyp.", riskIfIgnored: "Sie verlieren den Gast, der etwas anderes moechte. Und Sie werden es nie wissen, weil sie nicht fragen: Sie waehlen einfach etwas anderes oder verzichten auf Wein." },
      queSignifica:
        "Ueber rot/weiss/rose hinaus schaut Stil-Ausgewogenheit auf die Vielfalt der organoleptischen Profile: haben Sie leichte, frische Weine neben kraftvollen? Gibt es junge Optionen sowie gereift? Bietet Ihre Karte Vielfalt von Trauben und Weinbereitung, oder klingt alles aehnlich? Stil-Ausgewogenheit bestimmt, ob Ihre Karte die Breite der Geschmaecker Ihrer Kundschaft abdeckt oder nur zu einem Geschmack spricht.",
      porQueImporta:
        "Weil der Gast nicht nur nach Typ und Preis waehlt: Er waehlt, was er moechte. Wenn alle Ihre Rotweine kraftvoll und eichig sind, verlieren Sie den, der etwas Leichtes moechte. Wenn alle Ihre Weissweine fruchtig sind, verlieren Sie den, der Mineratlitat sucht. Gute Stil-Ausgewogenheit maximiert die Wahrscheinlichkeit, dass jeder Gast etwas findet, das passt.",
      queHacer: [
        "Klassifizieren Sie Ihre References nach Profil: leicht/mittel/voluminoess, jung/gereift/reserve, aromatisch/mineral/strukturiert.",
        "Prufen Sie, ob Sie Optionen in jedem Quadrant haben oder alles sich in einem Profil konzentriert.",
        "Fragen Sie das Servicepersonal: Gibt es Anfragen, die sie mit der aktuellen Karte nicht erfullen koennen?",
        "Wenn 80% Ihrer Karte ein aehnliches Profil hat, begrenzen Sie Ihren potenziellen Markt.",
      ],
      errores: [
        { mistake: "Karte nach dem Sommelier oder Chef Geschmack gestalten", consequence: "Ihre Karte befrieedigt, wer sie gestaltet, aber ignoriert moeglicherweise 60% Ihrer Gaeste." },
        { mistake: "Vielfalt der Produzenten mit Vielfalt der Stile verwechseln", consequence: "20 verschiedene Produzenten koennen sehr aehnliche Weine machen, wenn sie aus der gleichen Region und Traube sind." },
        { mistake: "Stile nicht an die Restaurantkueche anpassen", consequence: "Eine Karte voller kraftvoller Rotweine in einem Leicht-Kueche-Restaurant erzeugt Dissonanz." },
      ],
    },
    {
      id: "equilibrio-origen",
      title: "Ausgewogenheit nach Herkunft",
      priority: "este mes",
      porQueTeLoMostramos: { detected: "Winerim hat Ihre Karten-Verteilung nach Appellation und Herkunft analysiert und Ueberkonzentration oder Dispersion erkannt.", whyMatters: "Herkunfts-Konzentration erzeugt Einkaufsrisiko (Marktabhaengigkeit) und widerspiegelt moeglicherweise nicht, was Ihre Kundschaft fragt.", riskIfIgnored: "Wenn Ihre Haupt-Appellation Preise erhoeht, haben Sie keine Alternativen. Und Ihre Karte erzaehlt eine Geschichte, die moeglicherweise nicht zu Ihrem Kunden passt." },
      queSignifica:
        "Herkunfts-Ausgewogenheit evaluiert, wie Ihre References nach Appellation, Region oder Land verteilt sind. Excessive Konzentration in einer Herkunft kann Ihr Angebot begrenzen und Abhaengigkeit von einem Kaufmarkt erzeugen. Excessive Dispersion kann eine Karte ohne Identitaet erzeugen. Der suesse Punkt haengt von Ihrem Konzept ab: Ein Regional-Kueche-Restaurant hat logische Konzentration; Ein Cosmopolitan braucht Breite.",
      porQueImporta:
        "Weil Herkunft Teil der Geschichte ist, die Ihre Karte erzaehlt. Wenn Sie 30 Riojas und 2 Albarinos haben, sagt Ihre Karte etwas ueber Ihre Prioritaeten - was moeglicherweise nicht dem entspricht, was Ihre Kundschaft bestellt. Auch erzeugt Herkunfts-Konzentration Kaufrisiko: Wenn Ihre Haupt-Appellation Preise erhoeht, haben Sie keine unmittelbaren Alternativen.",
      queHacer: [
        "Listen Sie die 5 Appellationen oder Regionen mit den meisten References in Ihrer Karte auf. Uebersteigen sie 50% der Gesamtmenge?",
        "Vergleichen Sie mit Ihren Verkaufsdaten: Ist die Konzentration durch Nachfrage oder durch Einkaufs-Traegheit gerechtfertigt?",
        "Evaluieren Sie, ob Ihre Herkunfts-Verteilung koharent mit Ihrem Kueche-Typ und Kundenprofil ist.",
        "Wenn Sie Ueberkonzentration erkannt haben, nicht alle auf einmal eliminieren: Schrittweise ersetzen, wenn Sie References erneuern.",
      ],
      errores: [
        { mistake: "Ueber-Representation einer Appellation aufgrund von persoenlichen Beziehungen zu Weingoeterreien oder Distributoraen", consequence: "Ihre Karte widerspiegelt Ihre kommerziellen Kontakte, nicht die Beduerfnisse Ihrer Kundschaft." },
        { mistake: "Diversifizieren um der Vielfalt willen ohne Kriterien", consequence: "Eine Karte mit 30 Laendern und keine Tiefe vermiestelt nicht Expertise: Sie vermiestelt Unordnung." },
        { mistake: "Herkunft nicht an Kuechen-Saisontaet anpassen", consequence: "Kaltklimaweissweine im Winter und kraftvolle Rotweine im Sommer entsprechen nicht dem, was der Gast moechte." },
      ],
    },
    {
      id: "carta-demasiado-larga",
      title: "Wenn eine Weinkarte zu lang ist",
      priority: "esta semana",
      porQueTeLoMostramos: { detected: "Winerim hat Ihr Effektivitaets-Verhaeltnis berechnet: References mit tatsaechlichen Verkaeufen vs. Gesamt-References auf der Karte.", whyMatters: "Excess Optionen laehmem den Gast, konzentrieren Verkaeufe auf 15-20 References und verwandeln den Rest in teure Dekoration.", riskIfIgnored: "Sie sammeln Komplexitaet, Stock und Management ohne Ertrag an. Ihr Team empfiehlt immer das gleiche, weil sie die volle Karte nicht kennen." },
      queSignifica:
        "Eine Karte ist zu lang, wenn sie mehr References hat, als Ihre Operation verwalten kann, als Ihr Team kennen kann, oder als Ihr Gast verarbeiten kann. Es gibt keine magische Zahl, aber es gibt klare Signale: Wenn mehr als 20% Ihrer References in 60 Tagen nicht verkauft wurden, wenn Ihr Servicepersonal die Haelfte der Karte nicht beschreiben kann, oder wenn der Gast mehr als 5 Minuten braucht, um zu waehlen, ist Ihre Karte zu lang fuer Ihren Kontext.",
      porQueImporta:
        "Weil eine lange Karte nicht beeindruckt: Sie laehmt. Der Excess von Optionen (Paradoxon der Wahl) reduziert Conversion, erhoet Servicezeit und konzentriert Verkaeufe auf die gleichen 15-20 References, die das Team kennt und empfiehlt. Der Rest ist Dekoration, die Stock, Management und Kosten ohne Ertrag generiert. In grossen Karten ab 250 References aufwaerts ist dieses Risiko strukturell.",
      queHacer: [
        "Berechnen Sie Ihr Effektivitaets-Verhaeltnis: References mit tatsaechlichen Verkaeufen in den letzten 60 Tagen / Gesamt-References.",
        "Wenn Ihr Verhaeltnis < 70% ist, hat Ihre Karte zu viele References fuer Ihren Nachfrage-Level.",
        "Identifizieren Sie References, die das Servicepersonal nie empfiehlt: Sie sind wahrscheinlich unnoetig.",
        "Legen Sie eine Betriebsgrenze fest und halten Sie sich daran: Jedes neue Hinzufuegen erfordert eine Entfernung.",
      ],
      errores: [
        { mistake: "Glauben, dass eine lange Karte Qualitaet oder Prestige bedeutet", consequence: "Eine 400-Reference-Karte, bei der 150 nicht verkaeuft werden, ist nicht prestigetaechtig: Sie ist ineffizient." },
        { mistake: "Keine Grenze auf die Anzahl der References setzen", consequence: "Die Karte waechst durch Ansammlung und wird nie beschnitten, bis Totbestand zum Handeln zwingt." },
        { mistake: "Karte durch Elimination der billigsten Weine reduzieren", consequence: "Einstiegs-Weine sind die hoechsten Rotations und oft das Tor zu Glaswein-Verkaeufen." },
      ],
    },
    {
      id: "carta-amplia-compleja",
      title: "Was eine grosse und komplexe Karte bedeutet",
      priority: "seguimiento",
      porQueTeLoMostramos: { detected: "Ihre Karte ueberschreitet 250 References: Sie ist ein strategisches Asset, wenn mit Daten verwaltet, und ein Liability, wenn mit Intuition verwaltet.", whyMatters: "Komplexitaet fuegt Tiefe hinzu, aber auch Reibung: mehr Stock, mehr Kannibalismus, mehr Risiko ohne Sichtbarkeit.", riskIfIgnored: "Ohne analytische Tools wird Komplexitaet zum Chaos. Sie koennen nicht sehen, was kannibalisiert oder wo Ihre Luecken sind." },
      queSignifica:
        "Eine grosse und komplexe Karte - ab 250 References aufwaerts - ist weder inhaerent gut noch schlecht. Sie ist ein strategisches Asset, wenn mit Daten verwaltet, und ein operatives Liability, wenn mit Intuition verwaltet. Komplexitaet fuegt Tiefe hinzu (mehr Optionen fuer den Experten-Gast), aber fuegt auch Reibung hinzu (schwieriger zu verwalten, mehr Stock, mehr Kannibalismus-Risiko). Winerim ist speziell fuer dieses Szenario gedacht.",
      porQueImporta:
        "Weil ein 250+ Reference-Karte ohne analytische Tools zu verwalten ist wie ein Flugzeug ohne Instrumente zu fliegen. Sie muessen wissen, was verkauft, was nicht, was kannibalisiert, wo Sie Luecken haben und wo Sie Ueberfluss haben. Ohne diese Sichtbarkeit wird Komplexitaet zum Chaos. Mit ihr wird sie zum Wettbewerbsvorteil.",
      queHacer: [
        "Wenn Ihre Karte 250+ References ueberschreitet, priorisieren Sie die Implementierung eines kontinuierlichen Analyse-Systems (nicht einmalige Reviews).",
        "Segmentieren Sie die Karte in verwaltbare Bloecke: nach Typ, nach Preistier, nach Herkunft. Analysieren Sie jeden Block separat.",
        "Weisen Sie einen Karten-Gesundheits-Eigentuemer zu, der monatlich Schluessel-Indikatoren ueberpruefer.",
        "Akzeptieren Sie, dass Komplexitaet Tools erfordert: Was mit 80 References funktioniert, skaliert nicht zu 300.",
      ],
      errores: [
        { mistake: "Eine 300-Reference-Karte mit den gleichen Methoden wie eine 50-Reference verwalten", consequence: "Komplexitaet waechst exponentiell, aber manuelle Methoden skalieren nicht." },
        { mistake: "Nicht segmentieren: ganze Karte als ein Block behandeln", consequence: "Probleme in einem Segment werden im Durchschnitt verwaessert und nicht erkannt, bis sie schwer sind." },
        { mistake: "Komplexitaet als Problem zu reduzieren statt als Asset zu verwalten betrachten", consequence: "Wenn Ihr Konzept Breite erfordert, ist die Loesung nicht zu schneiden: es ist besser zu verwalten." },
      ],
    },
    {
      id: "wine-mapping",
      title: "Wie Sie Wein-Kartierung und Karten-Architektur interpretieren",
      priority: "este mes",
      porQueTeLoMostramos: { detected: "Winerim hat automatisch die Wein-Kartierung fuer Ihre Karte generiert, indem Typ x Preis x Stil gekreuzt werden.", whyMatters: "Ohne eine visuelle Karte wird jede Entscheidung (Hinzufuegen, Entfernen, Umpreis) ohne Kontext getroffen. Die Karte sagt Ihnen, wo Sie in 5 Minuten handeln.", riskIfIgnored: "Sie treffen Entscheidungen auf einer Karte, ohne die Struktur zu sehen. Es ist wie ein Haus zu renovieren, ohne einen Grundriss zu haben." },
      queSignifica:
        "Wein-Kartierung ist die visuelle Darstellung Ihrer Karte in einer Matrix, die mindestens zwei Variablen kreuzt: typischerweise Weintyp x Preistier, oder Stil x Herkunft. Karten-Architektur ist der naechste Schritt: Zuweisung einer kommerziellen Rolle fuer jede Zone der Karte (Anziehung, Conversion, Positionierung, Exploration). Eine gut gelesene Karte sagt Ihnen, wo zu handeln. Eine gut definierte Architektur sagt Ihnen, warum.",
      porQueImporta:
        "Weil Sie ohne eine Karte die Struktur Ihrer Karte nicht sehen. Und ohne Struktur wird jede Entscheidung (Hinzufuegen, Entfernen, Umpreis) ohne Kontext getroffen. Wein-Kartierung konvertiert eine Liste von 200 References in ein Bild, das jeder Manager in 5 Minuten interpretieren kann. Es ist das schnellste Diagnose-Tool, das fuer eine Weinkarte existiert.",
      queHacer: [
        "Erstellen Sie eine Karte Ihrer Karte mit Achsen Typ x Preis. Jede Reference ist ein Punkt auf der Karte.",
        "Identifizieren Sie dichte Zonen (Saettigung) und leere Zonen (Gelegenheit oder Irrelevanz).",
        "Weisen Sie Rollen zu: welche Zone zieht den Gast an? Welche konvertiert? Welche positioniert Ihr Restaurant?",
        "Verwenden Sie die Karte fuer Hinzufuegen/Entfernen-Entscheidungen: Wenn ein neuer Wein in eine gesaettigte Zone faellt, muessen Sie erst einen anderen entfernen.",
      ],
      errores: [
        { mistake: "Keine visuelle Karte der Karte haben", consequence: "Sie treffen Entscheidungen auf einer Karte, ohne die Struktur zu sehen. Es ist wie ein Haus zu renovieren, ohne einen Grundriss zu haben." },
        { mistake: "Wein-Kartierung einmal machen und nicht aktualisieren", consequence: "Die Karte verfaellt mit jeder Karten-Aenderung. Sie muss ein lebendes Dokument sein." },
        { mistake: "Nur nach Typ und Preis kartieren, ohne Verkaufsdaten einzubeziehen", consequence: "Sie sehen die Struktur, aber wissen nicht, welche Zonen funktionieren und welche nicht." },
      ],
    },
  ],
  miniCases: [
    {
      profile: "Fine Dining mit 180-Reference-Karte",
      situation: "65% der Karte waren Rotweine aus Rioja und Ribera, konzentriert zwischen EUR 25 und EUR 35. Weissweine und Sekt representieren nur 12%. Das Servicepersonal bestaetigte, dass viele Gaeste nach 'etwas Frischem' fragten und keine Optionen fanden.",
      action: "Kartierte die Karte nach Typ x Preis. Entfernte 14 redundante Rotweine im gesaettigten Tier und fuegee 6 Weissweine und 3 Sekt in leere Tiers hinzu (EUR 15-25 und EUR 35-50). Verteilte neu, ohne die Gesamt-Reference-Zahl zu veraendern.",
      result: "Weisswein-Verkaeufe stiegen 28% im ersten Monat. Durchschnittlicher Wein-Bon erhoehte sich um EUR 2,40, weil Gaeste Optionen fanden, wo es keine gab.",
    },
    {
      profile: "Boutique-Hotel mit 310-Reference-Karte",
      situation: "Grosse und komplexe Karte als flache Liste verwaltet, ohne Wein-Kartierung. 22% der References waren in 90 Tagen nicht verkaeuft. Das Einkaufs-Team wusste nicht, was zu entfernen ist, weil 'alles verkaufen koennte'.",
      action: "Implementierte Winerim Core zur automatischen Wein-Kartierungs-Generierung. Identifizierte 68 References in Saettigung-Zonen und 4 Preistiers ohne Abdeckung. Entfernte 35 References in 3 monatlichen Phasen.",
      result: "Effektivitaets-Verhaeltnis ging von 72% zu 89%. Kapital aus Stock befreit: EUR 8.200. Das Servicepersonal ging von immer die gleichen Weine zu empfehlen zu diverse Anfragen zu decken.",
    },
    {
      profile: "Wein-Bar mit 95 References und hohe Rotation",
      situation: "Alle Weine lagen zwischen EUR 18 und EUR 30. Nichts unter EUR 15 (Einstieg) oder ueber EUR 45 (besonderheit). Der casual Gast ging ohne Bestellung und der Kenner konnte keine Tiefe finden.",
      action: "Erstellt drei neue Tiers: Einstieg (<EUR 15, 4 Weine), Exploration (EUR 35-45, 5 Weine) und Bild (>EUR 50, 3 Weine). Reduzierte das zentrale Tier von 95 zu 83 References.",
      result: "Wein-Durchdringung pro Tisch stieg von 62% zu 74%. Bild-Weine oeffneten Gespraeche, die das Team nutzte, um das Explorations-Tier zu verkaufen.",
    },
    {
      profile: "Gruppe von 5 casual-premium Orte",
      situation: "Jeder Ort hatte eine unterschiedliche Karte, die von seinem Servicepersonal erstellt wurde. Es gab keine Balance-Standard nach Typ oder Preis. Zwei Orte hatten keine Sekt; einer hatte 40% Rose mit keiner Nachfrage.",
      action: "Definierte eine gemeinsame Karten-Architektur: Ziel-Verteilung nach Typ (50% rot, 25% weiss, 15% Sekt, 10% andere) mit ±10% lokaler Anpassungs-Spielraum. Verwendete Winerim Core zur monatlichen Abweichungs-Ueberwachung.",
      result: "In 3 Monaten konvergierten alle 5 Orte auf Balance, ohne Identitaet zu verlieren. Der Ort mit Excess Rose reduzierte Totbestand um 60%. Benchmarking zwischen Orten ermoeglichen wiederholbare Best Practices.",
    },
  ],
  nextStep: {
    label: "Ueberpruefen Sie Ihre Karten-Ausgewogenheit",
    href: "/recursos/plantilla-equilibrio-carta",
    description: "Laden Sie die Vorlage herunter und diagnostizieren Sie Saettigung, Luecken und Kannibalismus in Ihrer aktuellen Karte.",
  },
};

export default cartaEquilibrioDE;
