/*
 * SEO City Pages - German and Portuguese
 *
 * This file contains INSERT statements for wine restaurant software landing pages
 * for major cities in Germany, Austria, Switzerland, and Portugal.
 *
 * Table: seo_pages
 *
 * To run:
 *   psql -U postgres -d supabase -f city-pages-de-pt.sql
 *
 * Or in Supabase SQL Editor:
 *   - Copy and paste the content
 *   - Run the entire script
 *
 * Total rows: 15 city pages (9 DE, 6 PT)
 */

-- German Cities: Berlin
INSERT INTO seo_pages (slug, lang, cluster, hero_title, hero_subtitle, hero_badge, meta_title, meta_description, cta_primary_text, cta_primary_url, body, faqs, published)
VALUES (
  'de/weinkarten-software-berlin',
  'de',
  'city',
  'Weinkarten-Software für Berlins moderne Weinrestaurants',
  'Digitale Weinkarten und automatisierte Bestands­verwaltung für Restaurants in Berlin',
  'Deutschland',
  'Weinkarten-Software Berlin | Winerim',
  'Moderne Weinkarten-Lösung für Berlins internationale Gastronomieszene. Digitale Menüs, Bestandsverwaltung und Preisoptimierung.',
  'Demo anfordern',
  '/demo',
  $${"city_name": "Berlin", "country": "Deutschland", "intro": "Berlin hat sich zu einer der spannendsten Weindestinationen Europas entwickelt. Die Stadt zieht Food-Enthusiasten und Sommelier an, die internationale Weinkarten mit experimentellen Ansätzen verbinden. In einer schnelllebigen Szene mit vielen neuen Konzepten ist es entscheidend, Weinkarten aktuell, verfügbar und profitabel zu halten. Restaurants kämpfen mit dem Ausgleich zwischen Trendwinen, klassischen Ankern und einer preisbewussten Gästebasis.", "ticket_medio": "28-45 EUR", "problems": ["Hohe Fluktuation bei Weinkarten und schnelle Weinbestände in trendigen Lokalen", "Sommelier- und Servicepersonal brauchen einfachen Zugriff auf aktuelle Weininformationen", "Preisoptimierung zwischen Premium-Weinen und erschwinglichen Tagesweinen", "Totbestand und Kellerverwaltung in kleinen Restaurantweinkellern", "Digitale Menüs, die mit der schnellen Veränderung der Berliner Szene Schritt halten"], "features": [{"title": "Digitale Weinkarten", "desc": "Einfach zu aktualisierende Menüs mit Glaswein-, Flaschenwein- und Paarungsoptionen"}, {"title": "Echtzeit-Bestandsverwaltung", "desc": "Nachverfolgung von Lagerbeständen und automatische Benachrichtigungen bei niedrigen Ständen"}, {"title": "Preistreppe-Optimierung", "desc": "Intelligente Preisgestaltung über mehrere Weinkategorien und Formate"}, {"title": "Sommelier-Portal", "desc": "Team-Zugriff auf Weininformationen, Tasting Notes und Anbindungsempfehlungen"}], "stats": [{"value": "35%", "label": "durchschnittliche Reduktion des Totbestands"}, {"value": "22%", "label": "Steigerung der Weinkartenumsätze"}, {"value": "15 Min", "label": "Zeit zur Weinkarten-Aktualisierung (vs. 2 Stunden manuell)"}], "benefits": ["Moderne Weinkarten, die schnell aktualisierbar sind und zur Berliner Szene passen", "Automatisierte Kellerrotation und Bestandsverfolgung reduzieren Verschwendung", "Mehr Gewinnspanne durch intelligente Preisstrategien", "Team-Empowerment mit Weinwissen an der Front Line"], "internal_links": [{"url": "/de/features", "label": "Funktionen der Winerim-Plattform", "type": "product"}, {"url": "/de/case-studies", "label": "Fallstudien von deutschen Restaurants", "type": "case_study"}]}$$,
  $$[{"q": "Wie lange dauert die Einrichtung einer digitalen Weinkarte?", "a": "Die meisten Berliner Restaurants sind innerhalb von 1-2 Wochen aktiv. Wir unterstützen den Datenimport und die Schulung des Servicepersonals."}, {"q": "Kann ich meine bestehende Weinkarte importieren?", "a": "Ja, wir unterstützen den Import aus PDF, Excel und anderen Bestandsverwaltungssystemen. Das Winerim-Team hilft mit dem Onboarding."}, {"q": "Wie helft ihr bei der Preisgestaltung?", "a": "Unsere Preis-Algorithmen berücksichtigen Einkaufskosten, Markttrends und lokale Konkurrenzpreise, um die Gewinnspanne zu optimieren."}, {"q": "Was passiert, wenn der Wein ausverkauft ist?", "a": "Die App zeigt automatisch verfügbare Alternativen basierend auf Vorlieben und Preisbereich und verhindert Upselling von nicht vorrätigem Wein."}]$$,
  true
);

-- German Cities: München
INSERT INTO seo_pages (slug, lang, cluster, hero_title, hero_subtitle, hero_badge, meta_title, meta_description, cta_primary_text, cta_primary_url, body, faqs, published)
VALUES (
  'de/weinkarten-software-munchen',
  'de',
  'city',
  'Weinkarten-Software für Münchens traditionelle und moderne Restaurants',
  'Digitale Weinkarten für gehobene Gastronomie in München',
  'Deutschland',
  'Weinkarten-Software München | Winerim',
  'Weinkarten-Lösung für Münchens gastronomische Vielfalt. Von Traditioneller bayerischer Küche bis zur modernen Gourmet-Szene.',
  'Demo anfordern',
  '/demo',
  $${"city_name": "München", "country": "Deutschland", "intro": "München vereint traditionelle bayerische Gastronomieszene mit einer wachsenden gehobenen Restaurantszene. Restaurants müssen Weinkarten pflegen, die bayerische Klassiker, deutsche Riesling-Weine und internationale Premium-Weine umfassen. Mit einer vermögenden Kundschaft und hohen Erwartungen an Dienstleistung sind digitale Weinkarten und Sommelier-Tools unverzichtbar geworden.", "ticket_medio": "42-68 EUR", "problems": ["Verwaltung umfangreicher Weinkeller mit teuren Flaschen und seltenen Jahrgängen", "Hohe Gewinnspannen erfordern präzise Preisgestaltung und Bestandskontrolle", "Sommelier müssen schnell und akkurat Paarungsempfehlungen liefern", "Konservative Gäste mit hohen Erwartungen an Wein-Expertise", "Integration von regionalen bayerischen Weinen mit internationalen Premiums"], "features": [{"title": "Premium-Weinkeller-Management", "desc": "Digitale Verwaltung großer und hochwertiger Weinkeller mit Lagerungsbedingungen und Jahrgängen"}, {"title": "Intelligente Paarungsempfehlungen", "desc": "Sommelier-Portal mit KI-gestützten Paarungsempfehlungen basierend auf Gericht und Gästenpräferenzen"}, {"title": "Detaillierte Weininformationen", "desc": "Umfangreiche Tasting Notes, Herkunft und Paarungsdetails für Sommelier-Schulung"}, {"title": "Nachverfolgung der Gewinnspanne", "desc": "Einblick in die Rentabilität jedes Weins und Optimierung durch strategische Preisgestaltung"}], "stats": [{"value": "28%", "label": "Durchschnittliche Gewinnspannensteigerung durch Preisoptimierung"}, {"value": "40%", "label": "Weniger Zeit für Sommelier bei der Paarung durch digitale Tools"}, {"value": "18%", "label": "Reduktion des Totbestands in Premiumpflege-Weinkellern"}], "benefits": ["Professionelle Verwaltung großer Premium-Weinkeller", "Sommelier-Tools, die Fachwissen und Gästeservice verbessern", "Präzise Gewinnspannen-Kontrolle für gehobene Restaurants", "Moderne digitale Präsentation für anspruchsvolle Münchner Gäste"], "internal_links": [{"url": "/de/features/sommelier-portal", "label": "Sommelier-Portal und Paarungsempfehlungen", "type": "product"}, {"url": "/de/industries/gehobene-restaurants", "label": "Lösungen für gehobene Gastronomie", "type": "product"}]}$$,
  $$[{"q": "Können wir Zugangsrechte für Sommeliers und Personal unterschiedlich festlegen?", "a": "Ja, Winerim hat rollenbasierte Zugangskontrollen. Sommeliers können erweiterte Informationen sehen, während Servicepersonal einfache Empfehlungen nutzt."}, {"q": "Wie unterstützt ihr Schulung und Sommelier-Entwicklung?", "a": "Unser Portal enthält detaillierte Weininformationen, Tasting Notes und Paarungslogik, die als Lernwerkzeug für das Team dient."}, {"q": "Funktioniert die App offline auf Tablets für Sommelier im Restaurant?", "a": "Ja, wir bieten Offline-Modus und Tablet-Optimierung für Sommeliers, die Clients am Tisch beraten."}, {"q": "Wie werdet ihr mit seltenen oder alten Weinen umgehen?", "a": "Winerim unterstützt spezielle Einträge für Vintage-Weine, limitierte Bestände und Archiv-Weine mit verlängerter Nachverfolgung."}]$$,
  true
);

-- German Cities: Hamburg
INSERT INTO seo_pages (slug, lang, cluster, hero_title, hero_subtitle, hero_badge, meta_title, meta_description, cta_primary_text, cta_primary_url, body, faqs, published)
VALUES (
  'de/weinkarten-software-hamburg',
  'de',
  'city',
  'Weinkarten-Software für Hamburgs maritime Gastronomieszene',
  'Digitale Weinkarten für Fischrestaurants und gehobene Gastronomie in Hamburg',
  'Deutschland',
  'Weinkarten-Software Hamburg | Winerim',
  'Weinkarten-Lösung für Hamburgs Fisch- und Seafood-Restaurants. Spezialisierte Paarungsempfehlungen und nordische Weintends.',
  'Demo anfordern',
  '/demo',
  $${"city_name": "Hamburg", "country": "Deutschland", "intro": "Hamburg ist ein Zentrum der nordischen Gastronomie mit Fokus auf Fischgerichte und Seafood-Speisen. Die Restaurants benötigen Weinkarten, die marine Küche perfekt ergänzen - von Albariño bis Muscadet, von skandinavischen Naturweinen bis deutschen Seezungenbegleitern. Eine internationale Gästebasis und Tourismus erfordern digitale Weinkarten in mehreren Sprachen und schnelle Anpassungen.", "ticket_medio": "35-55 EUR", "problems": ["Spezialisierte Paarungen für Fisch- und Meeresfrüchte-Gerichte", "Saisonal wechselnde Speisekarten erfordern schnelle Weinkarten-Updates", "Internationale Gäste verlangen Weininformation in mehreren Sprachen", "Schnelle Rotation leichter, frischer Weinsorten", "Dokumentation nordischer Weintends und Naturweine"], "features": [{"title": "Spezialisierte Fisch-Paarungen", "desc": "Vordefinierte und maßgeschneiderte Paarungsvorschläge für Fischgerichte und Meeresfrüchte"}, {"title": "Mehrsprachige Weinkarten", "desc": "Digitale Menüs in DE, EN, FR und skandinavischen Sprachen für internationale Gäste"}, {"title": "Schnelle Bestandsverwaltung", "desc": "Einfaches Hinzufügen und Entfernen von Weinen bei saisonalen Menüänderungen"}, {"title": "Moderne Wein-Trends", "desc": "Kuratierte Liste von skandinavischen Naturweinen, Orange Wines und modernen Klassikern"}], "stats": [{"value": "32%", "label": "Reduktion von Fehlpaarungen durch spezialisierte Vorschläge"}, {"value": "50%", "label": "Schnellere Menü-Updates bei saisonalen Wechseln"}, {"value": "25%", "label": "Höhere durchschnittliche Flaschenweinbestellung durch bessere Paarung"}], "benefits": ["Spezialisierte Empfehlungen für maritime Küche", "Multilinguale Weinkarten für internationales Publikum", "Schnelle Anpassung an saisonale Speisenkarten", "Moderne Wein-Kuration für trendorientierte Hamburg Gäste"], "internal_links": [{"url": "/de/features/multilingual", "label": "Mehrsprachige Weinkarten-Lösung", "type": "product"}, {"url": "/de/case-studies/fischrestaurants", "label": "Fallstudien: Fischrestaurants und Meeresfrüchte", "type": "case_study"}]}$$,
  $$[{"q": "Wie oft können wir die digitale Weinkarte aktualisieren?", "a": "Sie können Weinkarten unbegrenzt oft aktualisieren. Änderungen sind sofort live und sichtbar im Restaurant und online."}, {"q": "Unterstützt ihr Paarungsempfehlungen für spezifische Gerichte?", "a": "Ja, jeder Wein kann mit mehreren Gerichten verknüpft werden. Servicepersonal sieht schnell die besten Paarungen für das gewählte Gericht."}, {"q": "Können Gäste die Weinkarte online sehen, bevor sie kommen?", "a": "Ja, Winerim kann öffentliche oder private Weinkarten-Links für Social Media, Website und Online-Reservierungen erstellen."}, {"q": "Wie verwaltet ihr Allergien und spezielle Gästenbedürfnisse?", "a": "Winerim kann Noten zu jedem Wein hinzufügen, z.B. Sulfite, Histamine oder andere Allergen-Informationen."}]$$,
  true
);

-- German Cities: Frankfurt
INSERT INTO seo_pages (slug, lang, cluster, hero_title, hero_subtitle, hero_badge, meta_title, meta_description, cta_primary_text, cta_primary_url, body, faqs, published)
VALUES (
  'de/weinkarten-software-frankfurt',
  'de',
  'city',
  'Weinkarten-Software für Frankfurts gehobene Dining-Szene',
  'Digitale Weinkarten und Restaurantsoftware für Business-Dining in Frankfurt',
  'Deutschland',
  'Weinkarten-Software Frankfurt | Winerim',
  'Weinkarten-Lösung für Frankfurt: Gehobene Restaurants mit fokus auf Business-Dining, deutsche und französische Weine.',
  'Demo anfordern',
  '/demo',
  $${"city_name": "Frankfurt", "country": "Deutschland", "intro": "Frankfurt ist ein Zentrum für Business-Dining und gehobene Gastronomieszene. Restaurants begrüßen Geschäftsleute, die Wert auf Qualität und Expertise legen. Digitale Weinkarten sind nicht nur Komfort, sondern Erwartung. Restaurantsoftware muss professionelle Verwaltung, intelligente Preisgestaltung und Kontrollaudit unterstützen - besonders für Restaurants mit großen Gästen und hohen Ticketpreisen.", "ticket_medio": "55-85 EUR", "problems": ["Weinkellen mit großem Umfang und hohem Wert erfordern strikte Kontrollen", "Geschäftsleute erwarten digitale Weinkarten-Zugang und detaillierte Weininformation", "Komplexe Preisgestaltung für verschiedene Kundensegmente (Gelegenheits-, Gast-, VIP-Gäste)", "Sommelier-Expertise bei der Bestandsverwaltung und Bestandsoptimierung", "Reporting und Gewinn-Analyse für Restaurant-Management"], "features": [{"title": "Kontrolle und Auditing", "desc": "Vollständiger Überblick über Weinkeller mit Audit-Logs, Bestandsverfolgung und Kostenkontrolle"}, {"title": "Tiered-Preisgestaltung", "desc": "Intelligente Preisstrategien für verschiedene Gäste-Segmente und Eventtypen (Gala, Geschäftsessen, etc.)"}, {"title": "Geschäftsberichte", "desc": "Detaillierte Rentabilitäts- und Gewinn-Reports für Management und Sommelier-Team"}, {"title": "Premium-Weinkeller-Tools", "desc": "Verwaltung von Vintage-Weinen, Lagerung, Temperaturkontrolle und Alterungspotenzial"}], "stats": [{"value": "45%", "label": "Verbesserung der Weinkellen-Rentabilität durch Optimierung"}, {"value": "60%", "label": "Reduktion von Verwaltungsszeit durch digitale Kontrollen"}, {"value": "31%", "label": "Steigerung des durchschnittlichen Weinkarten-Umsatzes"}], "benefits": ["Strikter Kontrolle und Audit für hochwertige Weinkeller", "Professionelle Preisgestaltung für unterschiedliche Gäste-Segmente", "Detailliertes Reporting für Top-Management und Sommelier", "Moderne Technologie für gehobene Frankfurter Restaurants"], "internal_links": [{"url": "/de/features/business-dining", "label": "Business-Dining Lösungen", "type": "product"}, {"url": "/de/features/reporting", "label": "Gewinn- und Rentabilitäts-Reporting", "type": "product"}]}$$,
  $$[{"q": "Können wir verschiedene Preisstrategien für verschiedene Eventtypen festlegen?", "a": "Ja, Winerim unterstützt Event-spezifische Weinkarten und Preisgestaltung. Sie können Gala-, Business-Dinner- und Standard-Weinkarten erstellen."}, {"q": "Wie helft ihr mit Vintage-Wein-Management?", "a": "Winerim verfügt über spezialisierte Tools für Vintage-Verfolgung, Lagerungsbedingungen und Alterungspotenziale."}, {"q": "Welche Berichte können wir generieren?", "a": "Berichte über Rentabilität nach Wein-Kategorie, Gewinn-Trends, Bestandswerte und Umsatzmetriken für Management."}, {"q": "Wie sichern wir sensitive Geschäfts-Daten?", "a": "Winerim nutzt Enterprise-Grade Verschlüsselung, Zugangskontrollen und Compliance mit DSGVO und Datenschutzstandards."}]$$,
  true
);

-- German Cities: Düsseldorf
INSERT INTO seo_pages (slug, lang, cluster, hero_title, hero_subtitle, hero_badge, meta_title, meta_description, cta_primary_text, cta_primary_url, body, faqs, published)
VALUES (
  'de/weinkarten-software-dusseldorf',
  'de',
  'city',
  'Weinkarten-Software für Düsseldorfs Gourmet-Restaurants',
  'Digitale Weinkarten für gehobene Küche in Düsseldorf',
  'Deutschland',
  'Weinkarten-Software Düsseldorf | Winerim',
  'Weinkarten-Lösung für Düsseldorf: Moderne Gourmet-Restaurants, französische und deutsche Klassiker, digitale Sommelier-Tools.',
  'Demo anfordern',
  '/demo',
  $${"city_name": "Düsseldorf", "country": "Deutschland", "intro": "Düsseldorf hat sich als Zentrum der modernen Gourmet-Gastronomie etabliert mit Restaurants, die französische Klassiker und innovative deutsche Küche kombinieren. Michelin-Sterne und gehobene Restaurants erfordern professionelle Weinkarten-Verwaltung mit Sommelier-Tools, detaillierten Paarungsempfehlungen und Bestandsverwaltung auf Weltklasse-Niveau.", "ticket_medio": "48-72 EUR", "problems": ["Komplexe Weinkarte mit klassischen Burgunds und modernen Naturweinen", "Sommelier brauchen spezialisierte Tools für Paarung und Gäste-Beratung", "Hohe Gewinnspannen erfordern optimale Preisgestaltung und Kellerverwaltung", "Gäste erwarten digitale Weinkarten vor dem Besuch", "Verwaltung von Änderungen und saisonalen Spezialitäten"], "features": [{"title": "Sommelier-Portal mit KI", "desc": "Intelligente Paarungsempfehlungen basierend auf Gast-Profil, Gerichtswahl und Wein-Profil"}, {"title": "Detaillierte Wein-Kuration", "desc": "Umfangreiche Tasting Notes, Herkunft, Winzern-Profile und Paarungslogik"}, {"title": "Digitale Menü-Integration", "desc": "Verbindung von Speisenkarte mit Weinkarte für nahtlose Paarungsempfehlungen"}, {"title": "Event und Dinner-Management", "desc": "Erstellen Sie Weinkarten für Private Dining, Gala-Menüs und spezielle Events"}], "stats": [{"value": "38%", "label": "Durchschnittliche Gewinnspannensteigerung bei gourmet-fokussierten Restaurants"}, {"value": "44%", "label": "Reduktion der Gäste-Beratungszeit durch digitale Tools"}, {"value": "29%", "label": "Höhere Gäste-Zufriedenheit durch optimierte Paarungen"}], "benefits": ["Weltklasse Sommelier-Tools für gehobene Restaurants", "Intelligente Paarungsempfehlungen für moderne Gourmet-Küche", "Optimale Gewinnspannen durch datengesteuerte Preisgestaltung", "Gäste-Engagement durch digitale Menü-Integration"], "internal_links": [{"url": "/de/features/michelin-restaurants", "label": "Lösungen für Michelin-Restaurants", "type": "product"}, {"url": "/de/case-studies", "label": "Gourmet Restaurant Fallstudien", "type": "case_study"}]}$$,
  $$[{"q": "Wie funktioniert die KI-Paarungsempfehlung?", "a": "Die KI analysiert Gericht-Charakteristiken, Zutatenprofil und Weineigenschaften, um ähnliche Kombinationen zu finden. Sie können KI-Vorschläge überprüfen und anpassen."}, {"q": "Können wir die Weinkarte mit der Speisenkarte verbinden?", "a": "Ja, Winerim integriert sich mit den meisten POS-Systemen und erlaubt Menü-Verknüpfungen für automatische Paarungsvorschläge."}, {"q": "Wie unterstützen wir Diners, die vegan oder allergenarm essen?", "a": "Winerim kann Diät- oder Allergen-Noten zu Gerichten und Weinen hinzufügen, damit Sommeliers informierte Empfehlungen machen können."}, {"q": "Kann ich alte Weinkarten-Versionen speichern?", "a": "Ja, Winerim speichert Versions-Historie. Sie können jederzeit auf vorherige Weinkarten verweisen oder wiederherstellen."}]$$,
  true
);

-- German Cities: Köln
INSERT INTO seo_pages (slug, lang, cluster, hero_title, hero_subtitle, hero_badge, meta_title, meta_description, cta_primary_text, cta_primary_url, body, faqs, published)
VALUES (
  'de/weinkarten-software-koln',
  'de',
  'city',
  'Weinkarten-Software für Kölns vielfältige Restaurantszene',
  'Digitale Weinkarten für Restaurants in Köln - von traditionell bis modern',
  'Deutschland',
  'Weinkarten-Software Köln | Winerim',
  'Weinkarten-Lösung für Köln: Restaurants, Weinbars und traditionelle Gastronomie mit digitalen Menüs und Bestandsverwaltung.',
  'Demo anfordern',
  '/demo',
  $${"city_name": "Köln", "country": "Deutschland", "intro": "Köln hat eine vibrierende Restaurantszene mit traditionellen Kneipen, modernen Weinbars und gehobenen Gourmet-Restaurants. Eine breite Mischung aus lokal verwurzelten Gästen und internationalen Touristen erfordert flexible, mehrsprachige Weinkarten-Lösungen. Restaurants kämpfen mit Bestandsverwaltung, schnellen Updates und der Balance zwischen klassischen Weinen und Trends.", "ticket_medio": "32-52 EUR", "problems": ["Vielfalt der Gäste erfordert flexibel anpassbare Weinkarten", "Tourismus bedingt Mehrsprachigkeit und digitalen Zugang", "Kleinere Restaurants brauchen einfache aber effektive Lösungen", "Schnelle Rotation von Weinen bei Weinbars und trendigen Lokalen", "Bestandsverwaltung über mehrere Restaurantstandorte hinweg"], "features": [{"title": "Mehrsprachige Weinkarten", "desc": "Einfache Erstellung von Weinkarten in Deutsch, Englisch, Französisch und weiteren Sprachen"}, {"title": "Mobile Sommelier-App", "desc": "Tablet und Mobile-Optimierung für Sommelier und Servicepersonal mit offline Funktionalität"}, {"title": "Multi-Standort-Verwaltung", "desc": "Zentrale Verwaltung von Weinkellen über mehrere Restaurant-Standorte"}, {"title": "Einfache Bestandsverfolgung", "desc": "Benutzerfreundliche Bestandsverwaltung ohne komplexe Schulung"}], "stats": [{"value": "40%", "label": "Reduktion von Bestandsverwaltungszeit durch Automatisierung"}, {"value": "26%", "label": "Steigerung der Weinkarten-Umsätze durch bessere Verfügbarkeit"}, {"value": "3 Sprachen", "label": "Durchschnittliche Anzahl von Sprachen auf digitalen Weinkarten"}], "benefits": ["Flexible Weinkarten für diverse Gästebasis", "Mehrsprachige Menüs für Tourismus und internationale Gäste", "Einfache Verwaltung für kleinere Restaurants", "Multi-Standort-Kontrolle für Restaurantketten"], "internal_links": [{"url": "/de/features/multi-location", "label": "Multi-Standort Weinkarten-Verwaltung", "type": "product"}, {"url": "/de/features/mobile", "label": "Mobile und Tablet App für Sommelier", "type": "product"}]}$$,
  $$[{"q": "Können wir von mehreren Standorten aus die Weinkarten verwalten?", "a": "Ja, Winerim ermöglicht zentrale Verwaltung mit standort-spezifischen Anpassungen. Jeder Standort kann seine eigene Weinkarte haben."}, {"q": "Wie funktioniert die Offline-Funktionalität?", "a": "Sommeliers können Weinkarten auf ihre Tablets herunterladen und offline arbeiten. Änderungen werden synchronisiert, wenn Verbindung zurückkommt."}, {"q": "Können wir die Weinkarte auf unserer Website einbetten?", "a": "Ja, Winerim bietet benutzerdefinierten Code zum Einbetten der Weinkarte auf Ihrer Website oder als Link für Social Media."}, {"q": "Wie gut funktioniert die Suche für Gäste?", "a": "Gäste können nach Rebsorte, Herkunftsregion, Geschmacksprofil oder Preis filtern. Autocomplete und Vorschläge helfen schnell das zu finden, was sie wollen."}]$$,
  true
);

-- German Cities: Stuttgart
INSERT INTO seo_pages (slug, lang, cluster, hero_title, hero_subtitle, hero_badge, meta_title, meta_description, cta_primary_text, cta_primary_url, body, faqs, published)
VALUES (
  'de/weinkarten-software-stuttgart',
  'de',
  'city',
  'Weinkarten-Software für Stuttgarts Weinkultur und Restaurants',
  'Digitale Weinkarten für Restaurants und Weinstubes in Stuttgart',
  'Deutschland',
  'Weinkarten-Software Stuttgart | Winerim',
  'Weinkarten-Lösung für Stuttgart: Weinstube, traditionelle Restaurants und moderne Gourmet-Lokale. Fokus auf Württemberg-Weine und Regionales.',
  'Demo anfordern',
  '/demo',
  $${"city_name": "Stuttgart", "country": "Deutschland", "intro": "Stuttgart ist im Herzen der Weinregion Württemberg und hat eine starke Wein-Kultur mit traditionellen Weinstubes und modernen Restaurants. Gäste kennen sich mit Weinen aus und erwarten Expertise. Eine große Anzahl von lokalen Weingütern und regionalen Weinen erfordert spezialisierte Verwaltung und Wissen über lokale Produktion und Charakteristiken.", "ticket_medio": "30-48 EUR", "problems": ["Große Auswahl an lokalen Württemberg-Weinen verlangt organisierte Verwaltung", "Tradition der Weinstubes erfordert Authentizität und Wissenvermittlung", "Gäste kennen sich mit Weinen aus und erwarten dementsprechend Beratung", "Saisonal Weinfeste und Events erfordern flexible Weinkarten", "Bestandsverwaltung für kleinere Weinstube-Mengen"], "features": [{"title": "Lokales Wein-Verzeichnis", "desc": "Umfassende Datenbank von Württemberg-Weinen und Winzern mit lokalen Informationen"}, {"title": "Regional-fokussierte Kuration", "desc": "Spezialisierte Verwaltung von lokalen und regionalen Weinen"}, {"title": "Event und Festival-Menüs", "desc": "Schnelle Erstellung von Event-spezifischen Weinkarten für Weinfeste und Veranstaltungen"}, {"title": "Weinkeller-Authentizität", "desc": "Detaillierte Dokumentation von Winzern, Weinbergen und Produktionsmethoden"}], "stats": [{"value": "35%", "label": "Bessere Verfügbarkeit von lokalen Weinen durch optimierte Verwaltung"}, {"value": "28%", "label": "Steigerung der Weinkarten-Umsätze in traditionellen Weinstubes"}, {"value": "42%", "label": "Reduktion von Zeit bei Event-Menü-Erstellung"}], "benefits": ["Spezialisierte Verwaltung lokaler und regionaler Weine", "Authentische Dokumentation von Winzern und Produktionsmethoden", "Schnelle Event-Anpassungen für Weinfeste und Veranstaltungen", "Tieferes Gäste-Engagement durch Wein-Wissenvermittlung"], "internal_links": [{"url": "/de/features/regional-wines", "label": "Regionale Wein-Verwaltung und Kuration", "type": "product"}, {"url": "/de/case-studies/weinstubes", "label": "Fallstudien: Traditionelle Weinstubes", "type": "case_study"}]}$$,
  $$[{"q": "Können wir lokale Winzer-Informationen direkt einfügen?", "a": "Ja, Winerim erlaubt detaillierte Winzer-Profile mit Herkunftsregion, Produktionsmethoden und Geschichte."}, {"q": "Wie helft ihr bei Event-Weinkarten?", "a": "Sie können schnell Event-spezifische Weinkarten erstellen, mit temporären Einträgen und dann zurück zur normalen Karte wechseln."}, {"q": "Können Gäste die Weinkarte online vor Besuch einsehen?", "a": "Ja, Winerim generiert öffentliche Links für Website, Social Media und Reservierungsseiten."}, {"q": "Wie verwalten wir kleinere Bestandsmengen in Weinstubes?", "a": "Winerim ist für alle Größen optimiert - von großen Restaurants bis zu kleinen Weinstubes mit minimal 5-10 Flaschen pro Wein."}]$$,
  true
);

-- German Cities: Wien (Austria)
INSERT INTO seo_pages (slug, lang, cluster, hero_title, hero_subtitle, hero_badge, meta_title, meta_description, cta_primary_text, cta_primary_url, body, faqs, published)
VALUES (
  'de/weinkarten-software-wien',
  'de',
  'city',
  'Weinkarten-Software für Wiens traditionelle und moderne Restaurants',
  'Digitale Weinkarten für Wiens gehobene Gastronomie und Weinkeller',
  'Österreich',
  'Weinkarten-Software Wien | Winerim',
  'Weinkarten-Lösung für Wien: Gehobene Restaurants, Heurige und traditionelle Gasthöfe mit österreichischem Fokus und digitalem Management.',
  'Demo anfordern',
  '/demo',
  $${"city_name": "Wien", "country": "Österreich", "intro": "Wien hat eine reiche Wein- und Gastronomie-Tradition, mit Heurigen, traditionellen Gasthöfen und gehobenen Restaurants. Die Metropole vereinigt klassische österreichische Küche mit modernen Trends. Weinkarten müssen österreichische Qualitätsweine, internationale Klassiker und spezielle Paarungen für traditionelle Wiener Küche kombinieren. Eine kulturelle und gehobene Gästeschaft erwartet Professionalität und Wissenvermittlung.", "ticket_medio": "38-62 EUR", "problems": ["Vielfalt von Heurigen bis gehobene Restaurants mit unterschiedlichen Anforderungen", "Österreichische Weine brauchen spezialisierte Expertise und Kuration", "Paarungen für traditionelle Wiener Spezialitäten", "Mehrsprachige Unterstützung für internationales Publikum", "Bestandsverwaltung mit großer Auswahl von lokalen und internationalen Weinen"], "features": [{"title": "Österreich-fokussierte Weinkuration", "desc": "Spezialisierte Verwaltung von österreichischen Qualitätsweinen mit regionalen Informationen"}, {"title": "Heurigen und Traditionelle Paarungen", "desc": "Vordefinierte Paarungen für Wiener Spezialitäten wie Schnitzel, Gulasch und traditionelle Speisen"}, {"title": "Mehrsprachiges Management", "desc": "Weinkarten in Deutsch, Englisch, Französisch und Russisch für internationales Publikum"}, {"title": "Premium Weinkeller-Tools", "desc": "Verwaltung von großen Weinkellern mit Lagerungsbedingungen und Aging-Potential"}], "stats": [{"value": "33%", "label": "Steigerung der Weinkarten-Umsätze durch optimierte Paarungen"}, {"value": "39%", "label": "Bessere Verfügbarkeit von österreichischen Qualitätsweinen"}, {"value": "47%", "label": "Reduktion von Bestandsverwaltungszeit"}], "benefits": ["Spezialisierte Verwaltung österreichischer Weine und Regionen", "Authentische Paarungen für Wiener Tradition und moderne Küche", "Mehrsprachige Menüs für internationales Publikum", "Professionelle Weinkeller-Verwaltung für gehobene Restaurants"], "internal_links": [{"url": "/de/features/regional-austria", "label": "Österreichische Wein-Lösungen", "type": "product"}, {"url": "/de/case-studies/wien", "label": "Wiener Restaurant Fallstudien", "type": "case_study"}]}$$,
  $$[{"q": "Wie werden österreichische Weine kategorisiert?", "a": "Winerim nutzt österreichisches Klassifizierungssystem mit Qualitätsstufen und Herkunftsregionen (DAC Regionen)."}, {"q": "Können wir traditionelle und moderne Menüs verwalten?", "a": "Ja, Sie können mehrere Weinkarten-Versionen für verschiedene Eventtypen oder Restaurantkonzepte erstellen."}, {"q": "Wie unterstützen wir Gäste, die kein Deutsch sprechen?", "a": "Winerim bietet vollständig übersetzte Weinkarten in Englisch, Französisch und Russisch. Alle Wein-Informationen sind mehrsprachig."}, {"q": "Können wir Preisinformationen für Wholesale vs. Retail verwalten?", "a": "Ja, Winerim erlaubt verschiedene Preisebenen. Sie können Großmengen-Pricing und Weinclub-Rabatte verwalten."}]$$,
  true
);

-- German Cities: Zürich (Switzerland)
INSERT INTO seo_pages (slug, lang, cluster, hero_title, hero_subtitle, hero_badge, meta_title, meta_description, cta_primary_text, cta_primary_url, body, faqs, published)
VALUES (
  'de/weinkarten-software-zurich',
  'de',
  'city',
  'Weinkarten-Software für Zürichs Premium-Gastronomie',
  'Digitale Weinkarten für gehobene Restaurants und Gourmet-Lokale in Zürich',
  'Schweiz',
  'Weinkarten-Software Zürich | Winerim',
  'Weinkarten-Lösung für Zürich: Premium-Restaurants, Michelin-Sterne und gehobene Gastronomie mit Schweizer und internationalen Weinen.',
  'Demo anfordern',
  '/demo',
  $${"city_name": "Zürich", "country": "Schweiz", "intro": "Zürich ist Zentrum der Schweizer Premium-Gastronomie mit Restaurants auf Michelin-Stern-Niveau und gehobener Gourmet-Szene. Eine wohlhabende Gästeschaft erwartet Weltklasse-Service und tiefe Wein-Expertise. Restaurants müssen Schweizer Qualitätsweine mit internationalen Klassikern kombinieren und professionelle Sommelier-Tools sowie Preiskontrolle für hochwertige Weinkeller bereitstellen.", "ticket_medio": "62-95 EUR", "problems": ["Michelin-Stern Erwartungen für Wein-Service und Expertise", "Hochwertige Weinkeller mit teuren Burgundern und Premium-Weinen", "Strikte Preiskontrolle und Gewinn-Optimierung für gehobene Restaurants", "Sommelier brauchen spezialisierte Tools für Paarung und Gäste-Beratung", "Verwaltung von Schweizer Qualitätsweinen neben französischen und internationalen Klassikern"], "features": [{"title": "Michelin-Restaurant-Sicherheit", "desc": "Enterprise-Grade Sicherheit, Zugangskontrollen und Audit-Logs für sensible Geschäftsdaten"}, {"title": "Premium Sommelier-Portal", "desc": "Erweiterte KI-Paarungen, detaillierte Tasting Notes und spezialisierte Beratungs-Tools"}, {"title": "Schweizer Wein-Spezialisten", "desc": "Umfassende Verwaltung von Schweizer Qualitätsweinen mit regionalen und Alters-Informationen"}, {"title": "Erweiterte Preisgestaltung", "desc": "Intelligente Preisalgorithmen für Michelin-Restaurants mit Gewinn-Optimierung und Kategorie-Management"}], "stats": [{"value": "52%", "label": "Verbesserung der Weinkellen-Rentabilität durch intelligente Preisgestaltung"}, {"value": "66%", "label": "Reduktion von Sommelier-Beratungszeit durch digitale Tools"}, {"value": "38%", "label": "Steigerung der durchschnittlichen Flaschenwein-Bestellung"}], "benefits": ["Weltklasse Sommelier-Tools für Michelin-Restaurants", "Strikte Kontrolle und Sicherheit für hochwertige Weinkeller", "Intelligente Preisgestaltung für Premium-Restaurants", "Spezialisierte Verwaltung Schweizer Qualitätsweine"], "internal_links": [{"url": "/de/features/michelin", "label": "Michelin-Restaurant Lösungen", "type": "product"}, {"url": "/de/case-studies/zurich-premium", "label": "Zürich Premium Restaurant Fallstudien", "type": "case_study"}]}$$,
  $$[{"q": "Wie sichern wir sensible Geschäfts-Daten in der Schweiz?", "a": "Winerim nutzt Swiss Data Centers, Enterprise-Grade Verschlüsselung und ist kompatibel mit Schweizer Datenschutz-Gesetzen."}, {"q": "Können wir Vintage-Weine und Alters-Information verwalten?", "a": "Ja, Winerim hat spezialisierte Tools für Vintage-Management mit Drinking-Windows und Alters-Potenzial."}, {"q": "Wie funktioniert die KI-Paarung für Michelin-Menüs?", "a": "Die KI berücksichtigt komplexe Gericht-Charakteristiken und bietet mehrschichtige Paarungsempfehlungen für Michelin-Menüs."}, {"q": "Können wir verschiedene Weinkarten für Private Dinners erstellen?", "a": "Ja, Winerim erlaubt Event-spezifische Weinkarten mit angepasster Preisgestaltung und speziellen Paarungen."}]$$,
  true
);

-- Portuguese Cities: Lisboa
INSERT INTO seo_pages (slug, lang, cluster, hero_title, hero_subtitle, hero_badge, meta_title, meta_description, cta_primary_text, cta_primary_url, body, faqs, published)
VALUES (
  'pt/software-carta-vinhos-lisboa',
  'pt',
  'city',
  'Software de Carta de Vinhos para Restaurantes em Lisboa',
  'Gestão digital de cartas de vinho para a gastronomia em Lisboa',
  'Portugal',
  'Software Carta de Vinhos Lisboa | Winerim',
  'Solução de carta de vinhos para Lisboa: Restaurantes modernos, tascas tradicionais e cozinha portuguesa com gestão digital de vinho.',
  'Solicitar Demo',
  '/demo',
  $${"city_name": "Lisboa", "country": "Portugal", "intro": "Lisboa é um destino gastronómico em crescimento, com tascas tradicionais modernizando-se e novos restaurantes trazendo abordagens inovadoras à cozinha portuguesa. O turismo internacional crescente exige cartas de vinho multilingues e digitais, enquanto a base de clientes local espera conhecimento autêntico sobre vinhos portugueses. Restaurantes enfrentam desafios em gerir grandes seleções de vinhos nacionais com importações estratégicas.", "ticket_medio": "25-42 EUR", "problems": ["Gestão de grandes seleções de vinhos portugueses com excelente relação qualidade-preço", "Tascas tradicionais modernizando com necessidade de ferramentas digitais", "Turismo internacional requer informações multilingues e recomendações de harmonização", "Rotação rápida de vinho em bares de vinho e restaurantes de tendência", "Documentação e educação sobre vinhos DOP portugueses e produtores artesanais"], "features": [{"title": "Gestão de Vinhos Portugueses", "desc": "Base de dados completa de vinhos nacionais com DOP, produtor e informações de casta"}, {"title": "Cartas Multilingues", "desc": "Suporte para Português, Inglês, Francês e Alemão para turismo internacional"}, {"title": "Harmonizações Inteligentes", "desc": "Recomendações de harmonização para cozinha portuguesa tradicional e moderna"}, {"title": "Portal do Escanção", "desc": "Ferramentas especializadas para sommeliers com Tasting Notes, harmonizações e educação do cliente"}], "stats": [{"value": "36%", "label": "Aumento de vendas de vinhos através de harmonizações otimizadas"}, {"value": "42%", "label": "Redução de tempo de gestão de inventário com automatização"}, {"value": "29%", "label": "Melhoria na satisfação do cliente com recomendações personalizadas"}], "benefits": ["Apresentação profissional da riqueza dos vinhos portugueses", "Acesso multilingue para turismo internacional", "Harmonizações autênticas para cozinha portuguesa", "Educação de clientes sobre produtores artesanais e vinhos DOP"], "internal_links": [{"url": "/pt/features", "label": "Funcionalidades da Plataforma Winerim", "type": "product"}, {"url": "/pt/case-studies", "label": "Casos de Sucesso de Restaurantes Portugueses", "type": "case_study"}]}$$,
  $$[{"q": "Como posso importar minha atual carta de vinhos?", "a": "Winerim suporta importação de PDF, Excel e sistemas de POS. Ajudamos com conversão de dados e integração na plataforma."}, {"q": "Quais são as vantagens da gestão digital?", "a": "Atualizações instantâneas, acesso multilingue, rastreamento de estoque automático e relatórios de margem de lucro em tempo real."}, {"q": "Como funciona a recomendação de harmonização?", "a": "Nosso sistema sugere vinhos baseado no prato escolhido, perfil do vinho e preferências do cliente. O escanção pode ajustar recomendações."}, {"q": "Posso rastrear estoque em tempo real?", "a": "Sim, Winerim oferece rastreamento em tempo real com alertas automáticos quando o estoque fica baixo."}]$$,
  true
);

-- Portuguese Cities: Porto
INSERT INTO seo_pages (slug, lang, cluster, hero_title, hero_subtitle, hero_badge, meta_title, meta_description, cta_primary_text, cta_primary_url, body, faqs, published)
VALUES (
  'pt/software-carta-vinhos-porto',
  'pt',
  'city',
  'Software de Carta de Vinhos para Restaurantes no Porto',
  'Gestão digital de cartas de vinho para gastronomia portuense',
  'Portugal',
  'Software Carta de Vinhos Porto | Winerim',
  'Solução de carta de vinhos para Porto: Restaurantes gastrotourismo, adega moderna e Vinho do Porto com gestão profissional.',
  'Solicitar Demo',
  '/demo',
  $${"city_name": "Porto", "country": "Portugal", "intro": "Porto é o coração do Vinho do Porto e uma capital gastronómica em crescimento, com restaurantes focados em experiências de vinho e harmonizações. A proximidade à região Douro Valley atrai enoturismo e clientes sofisticados que esperam profundidade nas recomendações de vinho. Restaurantes enfrentam desafios em gerir grandes coleções de vinhos de Tawny, Vintage e vinhos regionais do Douro com preços e estratégias sofisticadas.", "ticket_medio": "32-58 EUR", "problems": ["Gestão complexa de Vinho do Porto com diferentes estilos e idades", "Clientes enoturistas esperam educação profunda sobre origem e produção", "Harmonizações sofisticadas para cozinha tradicional portuense e inovação moderna", "Gerenciamento de margens em vinhos premium e seleções exclusivas", "Informações e rotulagem para turismo internacional com foco em experiência Douro Valley"], "features": [{"title": "Especialização em Vinho do Porto", "desc": "Gestão especializada de Tawny, Vintage, Colheita e LBV com idade, origem e Tasting Notes detalhadas"}, {"title": "Portal Enoturismo", "desc": "Criação de experiências de vinho educacionais com histórias de produtores e regiões"}, {"title": "Harmonizações Premium", "desc": "Recomendações sofisticadas de harmonização para cozinha portuense e vinhos Douro"}, {"title": "Gestão de Coleções", "desc": "Rastreamento de garrafeiras especiais, coleções limitadas e vinhos exclusivos com preço estratégico"}], "stats": [{"value": "44%", "label": "Aumento de experiências enoturismo através de educação estruturada"}, {"value": "38%", "label": "Melhoria na rentabilidade de vinhos premium"}, {"value": "51%", "label": "Redução de quebra e perda em garrafeiras sofisticadas"}], "benefits": ["Apresentação profissional da herança do Vinho do Porto", "Educação enoturismo para experiências memoráveis", "Harmonizações sofisticadas para clientes discernentes", "Gestão de colecções e vinhos exclusivos"], "internal_links": [{"url": "/pt/features/vinho-porto", "label": "Especialização em Vinho do Porto", "type": "product"}, {"url": "/pt/case-studies/porto", "label": "Casos de Sucesso: Restaurantes do Porto", "type": "case_study"}]}$$,
  $$[{"q": "Como posso gerir a complexidade de diferentes Portos?", "a": "Winerim permite categorizar por tipo (Tawny, Vintage, Colheita), idade e origem. Cada estilo tem características e harmonizações próprias."}, {"q": "Como ajudais no enoturismo?", "a": "Oferecemos templates para contar histórias de produtores, regiões e processos de produção que enriquecem a experiência do cliente."}, {"q": "Qual é a melhor forma de apresentar harmonizações Douro Valley?", "a": "Nossa plataforma oferece curadores especializados para criar experiências temáticas com vinhos Douro, regiões e harmonizações."}, {"q": "Como rastrear vinhos exclusivos e garrafeiras?", "a": "Winerim oferece rastreamento avançado com alertas de disponibilidade, histórico de vendas e análise de rotação."}]$$,
  true
);

-- Portuguese Cities: Faro
INSERT INTO seo_pages (slug, lang, cluster, hero_title, hero_subtitle, hero_badge, meta_title, meta_description, cta_primary_text, cta_primary_url, body, faqs, published)
VALUES (
  'pt/software-carta-vinhos-faro',
  'pt',
  'city',
  'Software de Carta de Vinhos para Restaurantes no Algarve',
  'Gestão digital de vinhos para restaurantes em Faro e região do Algarve',
  'Portugal',
  'Software Carta de Vinhos Faro | Winerim',
  'Solução de carta de vinhos para Faro: Restaurantes de praia, seafood e gastronomia algarvia com gestão profissional de vinho.',
  'Solicitar Demo',
  '/demo',
  $${"city_name": "Faro", "country": "Portugal", "intro": "Faro e o Algarve são destinos turísticos globais com restaurantes focados em peixe, marisco e cozinha mediterrânea. Uma base de clientes internacional e sazonal exige cartas multilingues, acesso fácil a informações de vinho e recomendações rápidas. Restaurantes lidam com alta rotação, estações sazonais variáveis e necessidade de harmonizações com frutos do mar especializadas.", "ticket_medio": "28-45 EUR", "problems": ["Sazonalidade turística exige flexibilidade em estoque e preço", "Harmonizações especializadas para peixe, marisco e cozinha mediterrânea", "Base de clientes internacional requer cartas multilingues e informações simples", "Rotação rápida de vinho em alta temporada versus gestão de stock em baixa", "Acesso rápido a informações de vinho para cliente turista sem conhecimento prévio"], "features": [{"title": "Harmonizações Seafood", "desc": "Recomendações especializadas para peixe, marisco e especialidades algarvia com perfil de vinho apropriado"}, {"title": "Cartas Sazonais", "desc": "Gestão fácil de cartas sazonais com preços e disponibilidades variáveis por época"}, {"title": "Interface Simples para Turistas", "a": "Descrição clara em múltiplas línguas, ícones visuais e recomendações rápidas para clientes não-especialistas"}, {"title": "Gestão de Liquidação", "desc": "Ferramentas para liquidar stock em final de estação e planificar compras para próxima"}], "stats": [{"value": "48%", "label": "Melhoria nas recomendações seafood resultando em maiores gastos de vinho"}, {"value": "35%", "label": "Redução de stock morto em períodos baixa sazonal"}, {"value": "52%", "label": "Aumento na satisfação de turistas através de recomendações linguísticas claras"}], "benefits": ["Harmonizações inteligentes para especialidades de peixe e marisco", "Gestão eficiente de sazonalidade e stock", "Acesso fácil para clientes turistas", "Aumento de venda de vinho por recomendações simples e eficazes"], "internal_links": [{"url": "/pt/features/seasonal-management", "label": "Gestão Sazonal e Temporada", "type": "product"}, {"url": "/pt/case-studies/algarve", "label": "Casos: Restaurantes de Praia do Algarve", "type": "case_study"}]}$$,
  $$[{"q": "Como gerir preços diferentes por temporada?", "a": "Winerim permite múltiplas versões de preço. Pode ter preços de alta-temporada e baixa-temporada com mudanças automáticas."}, {"q": "Qual é a melhor forma de harmonizar com marisco?", "a": "Nossos curadores oferecem templates especializados para harmonizações de marisco, considerando tipo de peixe e preparação."}, {"q": "Como faço para atualizar a carta rapidamente?", "a": "A plataforma permite atualizar em minutos. Pode adicionar/remover vinhos, mudar preços e notas com poucos cliques."}, {"q": "Posso criar cartas simples para turistas que não conhecem vinho?", "a": "Sim, Winerim oferece cartas simplificadas com descrições em linguagem acessível, ícones e recomendações rápidas."}]$$,
  true
);

-- Portuguese Cities: Coimbra
INSERT INTO seo_pages (slug, lang, cluster, hero_title, hero_subtitle, hero_badge, meta_title, meta_description, cta_primary_text, cta_primary_url, body, faqs, published)
VALUES (
  'pt/software-carta-vinhos-coimbra',
  'pt',
  'city',
  'Software de Carta de Vinhos para Restaurantes em Coimbra',
  'Gestão digital de cartas de vinho para gastronomia coimbrã',
  'Portugal',
  'Software Carta de Vinhos Coimbra | Winerim',
  'Solução de carta de vinhos para Coimbra: Restaurantes tradicionais, tascas e gastronomia regional com gestão profissional de vinho.',
  'Solicitar Demo',
  '/demo',
  $${"city_name": "Coimbra", "country": "Portugal", "intro": "Coimbra tem uma cena gastronómica vibrante com tascas tradicionais e restaurantes modernos que celebram a cozinha regional. Vinhos locais de Bairrada e Dão são centrais, com uma base de clientes que inclui estudantes, profissionais locais e turistas culturais. Restaurantes precisam de cartas que celebrem autenticidade regional enquanto facilitam educação sobre vinhos portugueses menos conhecidos.", "ticket_medio": "20-38 EUR", "problems": ["Promoção de vinhos regionais Bairrada e Dão menos conhecidos globalmente", "Educação de clientes sobre castas e características regionais únicas", "Gestão de pequenas margens em restaurantes e tascas tradicionais", "Harmonizações especializadas para cozinha tradicional coimbrã", "Atração de clientes turistas para experiências autênticas de vinho"], "features": [{"title": "Foco Regional", "desc": "Especialização em vinhos Bairrada e Dão com histórias de produtores e características regionais"}, {"title": "Educação de Cliente", "desc": "Templates para educação estruturada sobre castas, regiões e características de vinhos portugueses"}, {"title": "Cartas Acessíveis", "desc": "Apresentação clara de vinhos a preços acessíveis com descrição pedagógica"}, {"title": "Harmonizações Tradicionais", "desc": "Recomendações especializadas para cozinha tradicional coimbrã e especialidades regionais"}], "stats": [{"value": "40%", "label": "Aumento em vendas de vinhos regionais através de educação"}, {"value": "31%", "label": "Melhoria na experiência turista através de storytelling autêntico"}, {"value": "26%", "label": "Redução em tempo de gestão para equipes pequenas"}], "benefits": ["Promoção autêntica de vinhos regionais Bairrada e Dão", "Educação estruturada para clientes curiosos", "Harmonizações especializadas para cozinha tradicional", "Gestão simplificada para restaurantes pequenos"], "internal_links": [{"url": "/pt/features/regional-education", "label": "Educação Regional e Storytelling", "type": "product"}, {"url": "/pt/case-studies/centro", "label": "Casos: Restaurantes da Região Centro", "type": "case_study"}]}$$,
  $$[{"q": "Como posso educar clientes sobre Bairrada e Dão?", "a": "Winerim oferece templates de storytelling para cada vinho, incluindo história de produtor, casta e características regionais."}, {"q": "Qual é a melhor forma de apresentar vinhos a preços baixos?", "a": "Nossa plataforma enfatiza valor e características regionais, não preço. Descrições pedagógicas aumentam a percepção de valor."}, {"q": "Como atrair turistas para experiências autênticas?", "a": "Oferecemos ferramentas para criar experiências temáticas com storytelling regional e recomendações estruturadas."}, {"q": "Como gerir uma pequena equipe com muitos vinhos?", "a": "Winerim é otimizado para restaurantes pequenos com interface simplificada e automações que reduzem trabalho manual."}]$$,
  true
);

-- Portuguese Cities: Funchal
INSERT INTO seo_pages (slug, lang, cluster, hero_title, hero_subtitle, hero_badge, meta_title, meta_description, cta_primary_text, cta_primary_url, body, faqs, published)
VALUES (
  'pt/software-carta-vinhos-funchal',
  'pt',
  'city',
  'Software de Carta de Vinhos para Restaurantes em Funchal',
  'Gestão digital de cartas de vinho para gastronomia madeirense',
  'Portugal (Madeira)',
  'Software Carta de Vinhos Funchal | Winerim',
  'Solução de carta de vinhos para Funchal: Restaurantes turísticos, gastronomia madeirense e especialização em Vinho da Madeira.',
  'Solicitar Demo',
  '/demo',
  $${"city_name": "Funchal", "country": "Portugal (Madeira)", "intro": "Funchal é um destino turístico de classe mundial com restaurantes focados em experiências premium e gastronomia madeirense única. Vinho da Madeira é central à identidade culinária, com clientes sofisticados que buscam educação e experiências especializadas. Restaurantes enfrentam desafios em gerir colecções de Madeira com múltiplos estilos, idades e preços estratégicos, além de servir turistas internacionais com altas expectativas.", "ticket_medio": "38-65 EUR", "problems": ["Gestão especializada de Vinho da Madeira com múltiplos estilos e idades", "Enoturismo sofisticado exige educação profunda e experiências memoráveis", "Clientes internacionais requerem cartas multilingues com informação detalhada", "Preços estratégicos em colecções exclusivas de Madeira Vintage", "Harmonizações especializadas para cozinha madeirense e peixe-espada"], "features": [{"title": "Especialização Madeira", "desc": "Gestão completa de Sercial, Verdelho, Tinta Negra, Malmsey com histórias de envelhecimento"}, {"title": "Portal Enoturismo Premium", "desc": "Experiências educacionais com histórias de produtores, processo de madeirização e tastings guidados"}, {"title": "Cartas Multilingues Premium", "desc": "Apresentação sofisticada em múltiplas línguas com descrição detalhada e contexto cultural"}, {"title": "Gestão de Colecções Vintage", "desc": "Rastreamento de colecções exclusivas, Vintage Madeira e garrafeiras com preço premium"}], "stats": [{"value": "58%", "label": "Aumento em experiências enoturismo e receita de Madeira Vintage"}, {"value": "45%", "label": "Melhoria em satisfação cliente através de educação estruturada"}, {"value": "39%", "label": "Redução em tempo de gestão de colecções especializadas"}], "benefits": ["Apresentação de classe mundial da herança Vinho da Madeira", "Experiências enoturismo memoráveis e educacionais", "Gestão profissional de colecções Vintage e exclusivas", "Elevação da experiência turista com sofisticação e conhecimento"], "internal_links": [{"url": "/pt/features/madeira-specialization", "label": "Especialização em Vinho da Madeira", "type": "product"}, {"url": "/pt/case-studies/funchal", "label": "Casos Premium: Restaurantes de Funchal", "type": "case_study"}]}$$,
  $$[{"q": "Como gerir a complexidade de Madeira Seco vs. Doce?", "a": "Winerim categoriza Madeira por tipo (Sercial, Verdelho, Tinta Negra, Malmsey) com características e harmonizações próprias."}, {"q": "Como criar experiências enoturismo memoráveis?", "a": "Oferecemos templates educacionais com histórias de produtores, processo de madeirização e sugestões de tasting."}, {"q": "Qual é a melhor forma de apresentar preços para Madeira Vintage?", "a": "Nossa plataforma oferece preços premium estratégicos com contexto histórico e análise de valor/raridade."}, {"q": "Como rastrear colecções exclusivas e vintage?", "a": "Winerim oferece rastreamento completo com alertas de raridade, histórico de vendas e análise de potencial de envelhecimento."}]$$,
  true
);

-- Portuguese Cities: Braga
INSERT INTO seo_pages (slug, lang, cluster, hero_title, hero_subtitle, hero_badge, meta_title, meta_description, cta_primary_text, cta_primary_url, body, faqs, published)
VALUES (
  'pt/software-carta-vinhos-braga',
  'pt',
  'city',
  'Software de Carta de Vinhos para Restaurantes em Braga',
  'Gestão digital de cartas de vinho para gastronomia minhota',
  'Portugal',
  'Software Carta de Vinhos Braga | Winerim',
  'Solução de carta de vinhos para Braga: Restaurantes tradicionais, cozinha minhota e especialização em vinhos Verde e Douro.',
  'Solicitar Demo',
  '/demo',
  $${"city_name": "Braga", "country": "Portugal", "intro": "Braga é o coração da culinária minhota com restaurantes celebrando tradição e qualidade. Vinhos Verde e Douro Sul são centrais à identidade regional, com uma base de clientes que aprecia autenticidade e valor. Restaurantes enfrentam oportunidade em educar clientes sobre a qualidade moderna de Vinho Verde além de estereótipos, além de harmonizações especializadas para cozinha tradicional minhota.", "ticket_medio": "22-40 EUR", "problems": ["Mudança de percepção sobre Vinho Verde como premium vs. bebida barata", "Educação sobre qualidade e complexidade de Vinho Verde moderno", "Harmonizações especializadas para cozinha minhota tradicional", "Gestão de margens pequenas em restaurantes tradicionais", "Promoção de produtores locais e vinhos artesanais"], "features": [{"title": "Foco Vinho Verde", "desc": "Especialização em Vinho Verde Premium com histórias de produtores e diversidade de estilos"}, {"title": "Educação Percepção", "desc": "Templates para elevar percepção de Vinho Verde de casual para premium com storytelling"}, {"title": "Harmonizações Minhota", "desc": "Recomendações especializadas para cozinha tradicional com foco em especialidades regionais"}, {"title": "Conectar Produtores", "desc": "Ferramentas para destacar produtores locais e criar conexão direta entre cliente e vinhedo"}], "stats": [{"value": "43%", "label": "Aumento em vendas Vinho Verde através de educação de percepção"}, {"value": "34%", "label": "Melhoria em preço médio Vinho Verde através de posicionamento premium"}, {"value": "48%", "label": "Aumento em satisfação de clientes com conexão produtor direto"}], "benefits": ["Elevação de percepção Vinho Verde para premium", "Educação estruturada sobre qualidade moderna", "Harmonizações especializadas para cozinha minhota", "Conexão autêntica com produtores locais"], "internal_links": [{"url": "/pt/features/vinho-verde", "label": "Especialização em Vinho Verde", "type": "product"}, {"url": "/pt/case-studies/norte", "label": "Casos: Restaurantes Região Norte", "type": "case_study"}]}$$,
  $$[{"q": "Como posso mudar a percepção de Vinho Verde?", "a": "Winerim oferece storytelling estruturado sobre qualidade, complexidade e diversidade de Vinho Verde moderno."}, {"q": "Qual é a melhor forma de harmonizar Vinho Verde com cozinha tradicional?", "a": "Nossos curadores oferecem recomendações especializadas baseadas em sabores, temperatura e preparação de pratos minhotos."}, {"q": "Como destaco produtores locais?", "a": "Winerim permite criar perfis de produtor com história, localização e imagens, criando conexão cliente-vinhedo."}, {"q": "Como aumentar preço médio de Vinho Verde?", "a": "Através de educação e storytelling sobre qualidade e diferenciação, criando percepção de valor elevado."}]$$,
  true
);

-- End of script
