import GuideTemplate from "@/components/templates/GuideTemplate";
import type { GuidePageData } from "@/components/templates/GuideTemplate";

const es: GuidePageData = {
  slug: "guias/como-estructurar-carta-vinos-grupo-restauracion",
  metaTitle: "Cómo Estructurar una Carta de Vinos para un Grupo de Restauración | Guía",
  metaDescription: "Guía para diseñar cartas de vinos coherentes en grupos de restauración: estandarización, adaptación local, control de márgenes y gestión centralizada.",
  heroTitle: "Cómo estructurar una carta de vinos para un grupo de restauración",
  heroSubtitle: "Gestionar la carta de un solo restaurante ya es complejo. Hacerlo para 5, 10 o 50 locales exige un sistema.",
  heroBadge: "Guía estratégica",
  breadcrumbParent: { label: "Guías", href: "/guias-y-recursos" },
  ctaPrimaryText: "Solicitar demo", ctaPrimaryUrl: "/demo", ctaSecondaryText: "Analizar mi carta", ctaSecondaryUrl: "/analisis-carta",
  ctaFinalTitle: "Gestiona todas tus cartas desde un solo lugar", ctaFinalDescription: "Winerim permite centralizar la gestión de cartas, estandarizar márgenes y adaptar la oferta por local.",
  tableOfContents: ["El reto de gestionar múltiples cartas","Errores habituales en grupos","El modelo troncal + adaptación local","Cómo estandarizar márgenes","Gestión centralizada de proveedores","Framework para nuevos locales"],
  sections: [
    { heading: "1. El reto de gestionar múltiples cartas de vinos", content: "Un grupo no es un restaurante multiplicado por N. Cada local puede tener cocina diferente, público distinto y posicionamiento propio.", tips: ["Sin criterios comunes, cada local fija precios diferente.", "Duplicación de proveedores impide negociar volúmenes.", "Sin visibilidad centralizada, no se sabe cuánto capital hay en bodega."], icon: "alert" },
    { heading: "2. Errores habituales en la gestión de cartas de grupo", content: "Errores que se repiten en grupos sin estrategia de vino definida.", tips: ["Carta única para todos: ignora diferencias.", "Libertad total por local: caos operativo.", "Demasiados distribuidores: reduce poder de negociación.", "No medir rendimiento por local."], icon: "alert" },
    { heading: "3. El modelo troncal + adaptación local", content: "Carta troncal define criterios comunes. Cada local adapta a su realidad dentro de esos criterios.", tips: ["Estructura de categorías común.", "Catálogo de vinos homologados centralizado.", "20-30% de referencias locales permitidas.", "Rangos de precio por sección.", "Límite de referencias por tipo de local."], icon: "check" },
    { heading: "4. Cómo estandarizar márgenes sin perder identidad", content: "Usar multiplicadores escalonados adaptados al posicionamiento de cada local.", tips: ["Multiplicadores por tramo de coste.", "Ajustar según posicionamiento.", "Margen bruto objetivo por local: 65-72%.", "Revisar trimestralmente.", "Benchmarking interno entre locales."], icon: "lightbulb" },
    { heading: "5. Gestión centralizada de proveedores y stock", content: "Proveedor principal (60-70%), complementarios (20-30%), locales (10-20%).", tips: ["Negocia con volumen total del grupo.", "Centraliza seguimiento de stock.", "Alertas de stock mínimo y máximo.", "Revisa rotación por local mensualmente."], icon: "list" },
    { heading: "6. Framework de decisión para nuevos locales", content: "Proceso estructurado para diseñar la carta de un nuevo local.", tips: ["Paso 1: Definir posicionamiento.", "Paso 2: Seleccionar del catálogo troncal.", "Paso 3: Añadir referencias locales.", "Paso 4: Validar estructura.", "Paso 5: Formar al equipo.", "Paso 6: Monitorizar los primeros 90 días."], icon: "check" },
  ],
  faqs: [
    { q: "¿Cuántas referencias por local?", a: "40-60 casual, 60-100 gastronómico, 100-150 fine dining." },
    { q: "¿Cada local necesita sumiller?", a: "No necesariamente. Un sumiller de grupo puede supervisar 3-5 locales." },
    { q: "¿Merece la pena centralizar compras?", a: "Sí. 5-15% de ahorro y mejores condiciones." },
  ],
  relatedTools: [{ label: "Analizador de carta", url: "/wine-list-analyzer" }, { label: "Calculadora de margen", url: "/calculadora-margen-vino" }],
  relatedGuides: [{ label: "Conectar carta, stock, ventas y margen", url: "/guias/como-conectar-carta-stock-ventas-margen" }, { label: "Soluciones para grupos", url: "/soluciones/grupos-restauracion" }],
};

const en: GuidePageData = {
  slug: "en/guides/how-to-structure-wine-list-restaurant-group",
  metaTitle: "How to Structure a Wine List for a Restaurant Group | Guide",
  metaDescription: "Guide to designing coherent wine lists across restaurant groups: standardization, local adaptation, margin control and centralized management.",
  heroTitle: "How to structure a wine list for a restaurant group",
  heroSubtitle: "Managing one restaurant's list is complex. Doing it for 5, 10 or 50 venues requires a system.",
  heroBadge: "Strategic guide",
  breadcrumbParent: { label: "Guides", href: "/en/guides" },
  ctaPrimaryText: "Request demo", ctaPrimaryUrl: "/en/demo", ctaSecondaryText: "Analyze my list", ctaSecondaryUrl: "/en/wine-list-analyzer",
  ctaFinalTitle: "Manage all your lists from one place", ctaFinalDescription: "Winerim lets groups centralize list management, standardize margins and adapt by venue.",
  tableOfContents: ["The challenge of managing multiple lists","Common mistakes in groups","The trunk model + local adaptation","How to standardize margins","Centralized supplier management","Framework for new venues"],
  sections: [
    { heading: "1. The challenge of managing multiple wine lists", content: "A group isn't a restaurant multiplied by N. Each venue may have different cuisine, audience and positioning.", tips: ["Without common criteria, each venue prices differently.", "Supplier duplication prevents volume negotiation.", "Without centralized visibility, you don't know how much capital is tied up."], icon: "alert" },
    { heading: "2. Common mistakes in group list management", content: "Mistakes that recur in groups without a defined wine strategy.", tips: ["One list for all: ignores differences.", "Full local freedom: operational chaos.", "Too many distributors: reduces negotiating power.", "Not measuring performance by venue."], icon: "alert" },
    { heading: "3. The trunk model + local adaptation", content: "The trunk list defines common criteria. Each venue adapts within those criteria.", tips: ["Common category structure.", "Centralized approved wine catalogue.", "20-30% local references permitted.", "Price ranges by section.", "Reference limits by venue type."], icon: "check" },
    { heading: "4. How to standardize margins without losing identity", content: "Use tiered multipliers adapted to each venue's positioning.", tips: ["Multipliers by cost tier.", "Adjust by positioning.", "Gross margin target per venue: 65-72%.", "Review quarterly.", "Internal benchmarking between venues."], icon: "lightbulb" },
    { heading: "5. Centralized supplier and stock management", content: "Primary supplier (60-70%), complementary (20-30%), local (10-20%).", tips: ["Negotiate on total group volume.", "Centralize stock tracking.", "Min/max stock alerts.", "Review rotation by venue monthly."], icon: "list" },
    { heading: "6. Decision framework for new venues", content: "Structured process for designing a new venue's list.", tips: ["Step 1: Define positioning.", "Step 2: Select from trunk catalogue.", "Step 3: Add local references.", "Step 4: Validate structure.", "Step 5: Train the team.", "Step 6: Monitor first 90 days."], icon: "check" },
  ],
  faqs: [
    { q: "How many references per venue?", a: "40-60 casual, 60-100 gastronomic, 100-150 fine dining." },
    { q: "Does each venue need a sommelier?", a: "Not necessarily. A group sommelier can oversee 3-5 venues." },
    { q: "Is centralizing purchases worth it?", a: "Yes. 5-15% savings and better terms." },
  ],
  relatedTools: [{ label: "Wine list analyzer", url: "/en/wine-list-analyzer" }, { label: "Margin calculator", url: "/en/wine-margin-calculator" }],
  relatedGuides: [{ label: "Connect list, stock, sales and margin", url: "/en/guides/how-to-connect-wine-list-stock-sales-margin" }, { label: "Group solutions", url: "/en/solutions/restaurant-groups" }],
};

const it: GuidePageData = {
  slug: "it/guide/come-strutturare-carta-vini-gruppo-ristorazione",
  metaTitle: "Come Strutturare una Carta dei Vini per un Gruppo di Ristorazione | Guida",
  metaDescription: "Guida per progettare carte dei vini coerenti nei gruppi: standardizzazione, adattamento locale, controllo margini e gestione centralizzata.",
  heroTitle: "Come strutturare una carta dei vini per un gruppo di ristorazione",
  heroSubtitle: "Gestire la carta di un solo ristorante è complesso. Farlo per 5, 10 o 50 locali richiede un sistema.",
  heroBadge: "Guida strategica",
  breadcrumbParent: { label: "Guide", href: "/it/guide" },
  ctaPrimaryText: "Richiedi demo", ctaPrimaryUrl: "/it/demo", ctaSecondaryText: "Analizza la mia carta", ctaSecondaryUrl: "/it/analisi-carta",
  ctaFinalTitle: "Gestisci tutte le carte da un unico posto", ctaFinalDescription: "Winerim permette ai gruppi di centralizzare la gestione, standardizzare i margini e adattare per locale.",
  tableOfContents: ["La sfida di gestire carte multiple","Errori comuni nei gruppi","Il modello tronco + adattamento locale","Standardizzare i margini","Gestione centralizzata fornitori","Framework per nuovi locali"],
  sections: [
    { heading: "1. La sfida di gestire carte multiple", content: "Un gruppo non è un ristorante moltiplicato per N.", tips: ["Senza criteri comuni, ogni locale prezza diversamente.", "Duplicazione fornitori impedisce negoziare volumi.", "Senza visibilità centralizzata, non si sa quanto capitale è immobilizzato."], icon: "alert" },
    { heading: "2. Errori comuni nella gestione carte di gruppo", content: "Errori ricorrenti nei gruppi senza strategia vino definita.", tips: ["Carta unica per tutti: ignora le differenze.", "Libertà totale per locale: caos operativo.", "Troppi distributori: riduce potere negoziale.", "Non misurare performance per locale."], icon: "alert" },
    { heading: "3. Il modello tronco + adattamento locale", content: "La carta tronco definisce criteri comuni. Ogni locale adatta entro quei criteri.", tips: ["Struttura di categorie comune.", "Catalogo vini omologati centralizzato.", "20-30% referenze locali permesse.", "Fasce di prezzo per sezione."], icon: "check" },
    { heading: "4. Standardizzare i margini senza perdere identità", content: "Usare moltiplicatori a scaglioni adattati al posizionamento di ogni locale.", tips: ["Moltiplicatori per fascia di costo.", "Adattare al posizionamento.", "Obiettivo margine lordo: 65-72%.", "Revisione trimestrale.", "Benchmarking interno."], icon: "lightbulb" },
    { heading: "5. Gestione centralizzata fornitori e stock", content: "Fornitore principale (60-70%), complementari (20-30%), locali (10-20%).", tips: ["Negozia sul volume totale del gruppo.", "Centralizza il monitoraggio stock.", "Alert stock minimo e massimo.", "Rivedi rotazione per locale mensilmente."], icon: "list" },
    { heading: "6. Framework per nuovi locali", content: "Processo strutturato per progettare la carta di un nuovo locale.", tips: ["Passo 1: Definire posizionamento.", "Passo 2: Selezionare dal catalogo tronco.", "Passo 3: Aggiungere referenze locali.", "Passo 4: Validare la struttura.", "Passo 5: Formare il team.", "Passo 6: Monitorare i primi 90 giorni."], icon: "check" },
  ],
  faqs: [
    { q: "Quante referenze per locale?", a: "40-60 casual, 60-100 gastronomico, 100-150 fine dining." },
    { q: "Ogni locale ha bisogno di sommelier?", a: "Non necessariamente. Un sommelier di gruppo può supervisionare 3-5 locali." },
    { q: "Vale la pena centralizzare gli acquisti?", a: "Sì. 5-15% di risparmio e condizioni migliori." },
  ],
  relatedTools: [{ label: "Analizzatore carta", url: "/it/analisi-carta" }, { label: "Calcolatore margine", url: "/it/calcolatore-margine-vino" }],
  relatedGuides: [{ label: "Collegare carta, stock, vendite e margine", url: "/it/guide/come-collegare-carta-stock-vendite-margine" }, { label: "Soluzioni per gruppi", url: "/it/soluzioni/gruppi-ristorazione" }],
};

const fr: GuidePageData = {
  slug: "fr/guides/comment-structurer-carte-vins-groupe-restauration",
  metaTitle: "Comment Structurer une Carte des Vins pour un Groupe de Restauration | Guide",
  metaDescription: "Guide pour concevoir des cartes des vins cohérentes dans les groupes : standardisation, adaptation locale, contrôle des marges et gestion centralisée.",
  heroTitle: "Comment structurer une carte des vins pour un groupe de restauration",
  heroSubtitle: "Gérer la carte d'un seul restaurant est complexe. Le faire pour 5, 10 ou 50 établissements exige un système.",
  heroBadge: "Guide stratégique",
  breadcrumbParent: { label: "Guides", href: "/fr/guides" },
  ctaPrimaryText: "Demander une démo", ctaPrimaryUrl: "/fr/demo", ctaSecondaryText: "Analyser ma carte", ctaSecondaryUrl: "/fr/analyse-carte",
  ctaFinalTitle: "Gérez toutes vos cartes depuis un seul endroit", ctaFinalDescription: "Winerim permet aux groupes de centraliser la gestion, standardiser les marges et adapter par établissement.",
  tableOfContents: ["Le défi de gérer plusieurs cartes","Erreurs courantes dans les groupes","Le modèle tronc + adaptation locale","Standardiser les marges","Gestion centralisée des fournisseurs","Framework pour nouveaux établissements"],
  sections: [
    { heading: "1. Le défi de gérer plusieurs cartes des vins", content: "Un groupe n'est pas un restaurant multiplié par N.", tips: ["Sans critères communs, chaque établissement tarife différemment.", "La duplication des fournisseurs empêche de négocier les volumes.", "Sans visibilité centralisée, on ne sait pas combien de capital est immobilisé."], icon: "alert" },
    { heading: "2. Erreurs courantes dans la gestion des cartes de groupe", content: "Erreurs récurrentes dans les groupes sans stratégie vin définie.", tips: ["Carte unique pour tous : ignore les différences.", "Liberté totale par établissement : chaos opérationnel.", "Trop de distributeurs : réduit le pouvoir de négociation.", "Ne pas mesurer la performance par établissement."], icon: "alert" },
    { heading: "3. Le modèle tronc + adaptation locale", content: "La carte tronc définit les critères communs. Chaque établissement adapte dans ces critères.", tips: ["Structure de catégories commune.", "Catalogue de vins homologués centralisé.", "20-30% de références locales autorisées.", "Fourchettes de prix par section."], icon: "check" },
    { heading: "4. Standardiser les marges sans perdre l'identité", content: "Utiliser des multiplicateurs par palier adaptés au positionnement de chaque établissement.", tips: ["Multiplicateurs par tranche de coût.", "Ajuster selon le positionnement.", "Objectif marge brute : 65-72%.", "Révision trimestrielle.", "Benchmarking interne."], icon: "lightbulb" },
    { heading: "5. Gestion centralisée des fournisseurs et du stock", content: "Fournisseur principal (60-70%), complémentaires (20-30%), locaux (10-20%).", tips: ["Négociez sur le volume total du groupe.", "Centralisez le suivi du stock.", "Alertes stock min/max.", "Révisez la rotation par établissement mensuellement."], icon: "list" },
    { heading: "6. Framework pour nouveaux établissements", content: "Processus structuré pour concevoir la carte d'un nouvel établissement.", tips: ["Étape 1 : Définir le positionnement.", "Étape 2 : Sélectionner du catalogue tronc.", "Étape 3 : Ajouter des références locales.", "Étape 4 : Valider la structure.", "Étape 5 : Former l'équipe.", "Étape 6 : Monitorer les 90 premiers jours."], icon: "check" },
  ],
  faqs: [
    { q: "Combien de références par établissement ?", a: "40-60 casual, 60-100 gastronomique, 100-150 fine dining." },
    { q: "Chaque établissement a-t-il besoin d'un sommelier ?", a: "Pas nécessairement. Un sommelier de groupe peut superviser 3-5 établissements." },
    { q: "La centralisation des achats vaut-elle le coup ?", a: "Oui. 5-15% d'économies et meilleures conditions." },
  ],
  relatedTools: [{ label: "Analyseur de carte", url: "/fr/analyse-carte" }, { label: "Calculateur de marge", url: "/fr/calculateur-marge-vin" }],
  relatedGuides: [{ label: "Connecter carte, stock, ventes et marge", url: "/fr/guides/comment-connecter-carte-stock-ventes-marge" }, { label: "Solutions pour groupes", url: "/fr/solutions/groupes-restauration" }],
};

const de: GuidePageData = {
  slug: "de/ratgeber/weinkarte-restaurantgruppe-strukturieren",
  metaTitle: "Weinkarte für eine Restaurantgruppe strukturieren | Ratgeber",
  metaDescription: "Ratgeber für kohärente Weinkarten in Restaurantgruppen: Standardisierung, lokale Anpassung, Margensteuerung und zentrale Verwaltung.",
  heroTitle: "Wie Sie eine Weinkarte für eine Restaurantgruppe strukturieren",
  heroSubtitle: "Eine einzelne Weinkarte zu führen ist schon komplex. Für 5, 10 oder 50 Standorte erfordert es ein System.",
  heroBadge: "Strategischer Ratgeber",
  breadcrumbParent: { label: "Ratgeber", href: "/de/ratgeber" },
  ctaPrimaryText: "Demo anfragen", ctaPrimaryUrl: "/de/demo", ctaSecondaryText: "Meine Karte analysieren", ctaSecondaryUrl: "/de/weinkarten-analyse",
  ctaFinalTitle: "Verwalten Sie alle Karten an einem Ort", ctaFinalDescription: "Winerim ermöglicht Gruppen, die Kartenverwaltung zu zentralisieren, Margen zu standardisieren und das Angebot je Standort anzupassen.",
  tableOfContents: ["Die Herausforderung, mehrere Karten zu verwalten","Typische Fehler in Gruppen","Das Stamm-Modell + lokale Anpassung","Margen standardisieren","Zentrale Lieferantenverwaltung","Framework für neue Standorte"],
  sections: [
    { heading: "1. Die Herausforderung, mehrere Weinkarten zu verwalten", content: "Eine Gruppe ist kein mit N multipliziertes Restaurant. Jeder Standort kann andere Küche, anderes Publikum und eigene Positionierung haben.", tips: ["Ohne gemeinsame Kriterien preist jeder Standort unterschiedlich.", "Lieferantenduplizierung verhindert Volumenverhandlungen.", "Ohne zentrale Sicht wissen Sie nicht, wie viel Kapital im Keller gebunden ist."], icon: "alert" },
    { heading: "2. Typische Fehler bei der Kartenverwaltung in Gruppen", content: "Fehler, die sich in Gruppen ohne definierte Weinstrategie wiederholen.", tips: ["Einheitliche Karte für alle: ignoriert Unterschiede.", "Völlige lokale Freiheit: operatives Chaos.", "Zu viele Lieferanten: reduziert Verhandlungsmacht.", "Keine Messung der Leistung je Standort."], icon: "alert" },
    { heading: "3. Das Stamm-Modell + lokale Anpassung", content: "Die Stamm-Karte definiert gemeinsame Kriterien. Jeder Standort passt sich innerhalb dieser Kriterien an.", tips: ["Gemeinsame Kategoriestruktur.", "Zentraler Katalog zugelassener Weine.", "20-30 % lokale Referenzen erlaubt.", "Preisranges pro Sektion.", "Referenzlimits nach Standorttyp."], icon: "check" },
    { heading: "4. Wie Sie Margen standardisieren, ohne Identität zu verlieren", content: "Gestaffelte Multiplikatoren verwenden, die an die Positionierung jedes Standorts angepasst sind.", tips: ["Multiplikatoren pro Kostenstufe.", "Nach Positionierung anpassen.", "Bruttomargenziel pro Standort: 65-72 %.", "Vierteljährlich überprüfen.", "Internes Benchmarking zwischen Standorten."], icon: "lightbulb" },
    { heading: "5. Zentrale Lieferanten- und Bestandsverwaltung", content: "Hauptlieferant (60-70 %), ergänzende (20-30 %), lokale (10-20 %).", tips: ["Verhandeln Sie über das Gesamtvolumen der Gruppe.", "Zentralisieren Sie das Bestandsmonitoring.", "Min/Max-Bestandsalarme.", "Überprüfen Sie die Rotation je Standort monatlich."], icon: "list" },
    { heading: "6. Entscheidungs-Framework für neue Standorte", content: "Strukturierter Prozess zur Gestaltung der Karte eines neuen Standorts.", tips: ["Schritt 1: Positionierung definieren.", "Schritt 2: Aus dem Stammkatalog auswählen.", "Schritt 3: Lokale Referenzen hinzufügen.", "Schritt 4: Struktur validieren.", "Schritt 5: Team schulen.", "Schritt 6: Erste 90 Tage überwachen."], icon: "check" },
  ],
  faqs: [
    { q: "Wie viele Referenzen pro Standort?", a: "40-60 casual, 60-100 gastronomisch, 100-150 fine dining." },
    { q: "Braucht jeder Standort einen Sommelier?", a: "Nicht zwingend. Ein Gruppen-Sommelier kann 3-5 Standorte betreuen." },
    { q: "Lohnt sich die Einkaufszentralisierung?", a: "Ja. 5-15 % Ersparnis und bessere Konditionen." },
  ],
  relatedTools: [{ label: "Weinkarten-Analyzer", url: "/de/weinkarten-analyzer" }, { label: "Margen-Rechner", url: "/de/wein-margen-rechner" }],
  relatedGuides: [{ label: "Karte, Bestand, Verkauf und Marge verbinden", url: "/de/ratgeber/weinkarte-bestand-verkauf-marge-verbinden" }, { label: "Lösungen für Gruppen", url: "/de/loesungen/restaurant-gruppen" }],
};

const pt: GuidePageData = {
  slug: "pt/guias/como-estruturar-carta-vinhos-grupo-restauracao",
  metaTitle: "Como Estruturar uma Carta de Vinhos para um Grupo de Restauração | Guia",
  metaDescription: "Guia para desenhar cartas de vinhos coerentes em grupos de restauração: padronização, adaptação local, controlo de margens e gestão centralizada.",
  heroTitle: "Como estruturar uma carta de vinhos para um grupo de restauração",
  heroSubtitle: "Gerir a carta de um restaurante já é complexo. Fazê-lo para 5, 10 ou 50 locais exige um sistema.",
  heroBadge: "Guia estratégico",
  breadcrumbParent: { label: "Guias", href: "/pt/guias" },
  ctaPrimaryText: "Solicitar demo", ctaPrimaryUrl: "/pt/demo", ctaSecondaryText: "Analisar a minha carta", ctaSecondaryUrl: "/pt/analise-carta",
  ctaFinalTitle: "Gere todas as suas cartas a partir de um só lugar", ctaFinalDescription: "A Winerim permite aos grupos centralizar a gestão de cartas, padronizar margens e adaptar a oferta por local.",
  tableOfContents: ["O desafio de gerir várias cartas","Erros comuns em grupos","O modelo troncal + adaptação local","Como padronizar margens","Gestão centralizada de fornecedores","Framework para novos locais"],
  sections: [
    { heading: "1. O desafio de gerir várias cartas de vinhos", content: "Um grupo não é um restaurante multiplicado por N. Cada local pode ter cozinha diferente, público distinto e posicionamento próprio.", tips: ["Sem critérios comuns, cada local fixa preços de forma diferente.", "A duplicação de fornecedores impede negociar volumes.", "Sem visibilidade centralizada, não se sabe quanto capital há em garrafeira."], icon: "alert" },
    { heading: "2. Erros comuns na gestão de cartas de grupo", content: "Erros que se repetem em grupos sem estratégia de vinho definida.", tips: ["Carta única para todos: ignora diferenças.", "Liberdade total por local: caos operativo.", "Demasiados distribuidores: reduz poder negocial.", "Não medir desempenho por local."], icon: "alert" },
    { heading: "3. O modelo troncal + adaptação local", content: "A carta troncal define critérios comuns. Cada local adapta-se dentro desses critérios.", tips: ["Estrutura de categorias comum.", "Catálogo de vinhos homologados centralizado.", "20-30% de referências locais permitidas.", "Gamas de preço por secção.", "Limite de referências por tipo de local."], icon: "check" },
    { heading: "4. Como padronizar margens sem perder identidade", content: "Usar multiplicadores escalonados adaptados ao posicionamento de cada local.", tips: ["Multiplicadores por escalão de custo.", "Ajustar consoante o posicionamento.", "Margem bruta objetivo por local: 65-72%.", "Rever trimestralmente.", "Benchmarking interno entre locais."], icon: "lightbulb" },
    { heading: "5. Gestão centralizada de fornecedores e stock", content: "Fornecedor principal (60-70%), complementares (20-30%), locais (10-20%).", tips: ["Negoceie com o volume total do grupo.", "Centralize o acompanhamento de stock.", "Alertas de stock mínimo e máximo.", "Reveja a rotação por local mensalmente."], icon: "list" },
    { heading: "6. Framework de decisão para novos locais", content: "Processo estruturado para desenhar a carta de um novo local.", tips: ["Passo 1: Definir posicionamento.", "Passo 2: Selecionar do catálogo troncal.", "Passo 3: Adicionar referências locais.", "Passo 4: Validar estrutura.", "Passo 5: Formar a equipa.", "Passo 6: Monitorizar os primeiros 90 dias."], icon: "check" },
  ],
  faqs: [
    { q: "Quantas referências por local?", a: "40-60 casual, 60-100 gastronómico, 100-150 fine dining." },
    { q: "Cada local precisa de escanção?", a: "Não necessariamente. Um escanção de grupo pode supervisionar 3-5 locais." },
    { q: "Vale a pena centralizar compras?", a: "Sim. 5-15% de poupança e melhores condições." },
  ],
  relatedTools: [{ label: "Analisador de carta", url: "/pt/analisador-carta-vinhos" }, { label: "Calculadora de margem", url: "/pt/calculadora-margem-vinho" }],
  relatedGuides: [{ label: "Conectar carta, stock, vendas e margem", url: "/pt/guias/como-conectar-carta-stock-vendas-margem" }, { label: "Soluções para grupos", url: "/pt/solucoes/grupos-restauracao" }],
};

const GuiaCartaGrupoRestauracion = () => <GuideTemplate data={{ es, en, it, fr, de, pt }} />;
export default GuiaCartaGrupoRestauracion;
