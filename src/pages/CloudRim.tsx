import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Cloud,
  FileText,
  FolderSync,
  Inbox,
  Mail,
  Network,
  ShieldCheck,
  UploadCloud,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQSection from "@/components/seo/FAQSection";
import InternalLinks from "@/components/seo/InternalLinks";
import { Badge } from "@/components/ui/badge";
import cloudrimInbox from "@/assets/feature-cloudrim-inbox.jpg";
import { useLanguage } from "@/i18n/LanguageContext";
import { getI18n, type I18nMap } from "@/i18n/types";
import { CANONICAL_DOMAIN } from "@/seo/config";

type CloudRimCopy = {
  seoTitle: string;
  seoDesc: string;
  breadcrumbProduct: string;
  breadcrumbCurrent: string;
  badge: string;
  h1: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  trustLine: string;
  screenshotAlt: string;
  screenshotCaption: string;
  inputLabel: string;
  inputDesc: string;
  problemKicker: string;
  problemTitle: string;
  problemParagraphs: string[];
  howTitle: string;
  howSteps: string[];
  channelsTitle: string;
  channelsText: string;
  channels: string[];
  benefitsTitle: string;
  benefits: string[];
  controlTitle: string;
  controlText: string;
  finalTitle: string;
  finalText: string;
  finalCta: string;
  faqs: { q: string; a: string }[];
  related: { to: string; label: string; type: "guide" | "tool" | "resource" | "solution" | "decision-center" }[];
};

const copy: I18nMap<CloudRimCopy> = {
  es: {
    seoTitle: "CloudRIM | Nube documental para restaurantes y cartas de vino",
    seoDesc:
      "CloudRIM recoge cartas, ventas, albaranes, facturas, stock y tarifas de distribuidores para que Winerim los procese con IA, detecte el tipo documental y prepare conciliacion albaran-factura.",
    breadcrumbProduct: "Producto",
    breadcrumbCurrent: "CloudRIM",
    badge: "CLOUDRIM",
    h1: "La nube donde tu restaurante deja los documentos y Winerim hace el trabajo pesado",
    subtitle:
      "CloudRIM centraliza cartas, albaranes, facturas, ventas, stock y tarifas de distribuidores. El cliente sube, reenvia o conecta sus archivos; Winerim detecta si es factura, albaran, tarifa o reporte, extrae los datos y los lleva al flujo correcto.",
    primaryCta: "Probar CloudRIM con mi restaurante",
    secondaryCta: "Ver integraciones",
    trustLine: "Portal, email, carpeta compartida, FTP/SFTP, API, TPV o enlace de proveedor: CloudRIM se adapta al punto donde ya vive la informacion.",
    screenshotAlt: "Bandeja operativa de documentos de CloudRIM",
    screenshotCaption: "Una sola bandeja para recibir, clasificar y seguir los documentos que alimentan Winerim.",
    inputLabel: "Input cloud",
    inputDesc: "Cartas, ventas, stock, tarifas, albaranes y facturas",
    problemKicker: "Operativa real",
    problemTitle: "El problema no es tener datos. Es conseguir que alguien los suba bien.",
    problemParagraphs: [
      "Las ventas estan en el TPV. Los albaranes y facturas llegan en papel o PDF. Las tarifas de distribuidores cambian por email. El stock se actualiza tarde. Y cuando el restaurante tiene que meter todo a mano, lo normal es que lo deje para otro dia.",
      "CloudRIM reduce esa friccion: convierte cualquier entrada documental en una tarea ordenada, trazable y conectada con Winerim.",
    ],
    howTitle: "Como funciona CloudRIM",
    howSteps: [
      "El restaurante sube o conecta documentos: carta, albaranes, facturas, ventas, stock, tarifas o reportes.",
      "CloudRIM detecta el tipo de documento, distingue factura vs albaran y extrae la informacion relevante.",
      "Winerim enruta cada archivo al flujo correcto: carta, compras, ventas, stock, catalogo o margen.",
      "Si una factura no cuadra con su albaran, proveedor, lineas, cantidades o totales, queda marcada para revision antes de tocar costes, stock o margenes.",
    ],
    channelsTitle: "No obligamos al restaurante a cambiar su rutina",
    channelsText: "CloudRIM puede trabajar con:",
    channels: [
      "Portal de subida para cartas, albaranes, facturas y reportes.",
      "Email dedicado para reenviar documentos de proveedores.",
      "Carpetas compartidas con el equipo o la central.",
      "Exportaciones TPV por FTP/SFTP.",
      "APIs, webhooks o integraciones de proveedor.",
      "Documentacion de distribuidores en PDF, Excel, enlace de proveedor o formatos operativos.",
    ],
    benefitsTitle: "Que gana el restaurante",
    benefits: [
      "Menos administracion manual y menos duplicidad de datos.",
      "Ventas, compras y stock mas cerca de la realidad operativa.",
      "Menos errores al revisar albaranes, facturas, tarifas y costes.",
      "Conciliacion albaran-factura antes de actualizar decisiones de compra.",
      "Mejor control de coste, stock y margen por referencia.",
      "Una bandeja clara para saber que falta, que se proceso y que necesita revision.",
    ],
    controlTitle: "CloudRIM ordena. Winerim decide donde va cada dato.",
    controlText:
      "CloudRIM no sustituye al TPV, ERP ni a los distribuidores. Actua como capa operativa para recibir documentos, detectar si son facturas o albaranes y convertirlos en informacion util dentro de Winerim con revision humana cuando hay descuadres.",
    finalTitle: "Deja de perseguir archivos. Dejalos entrar en Winerim.",
    finalText:
      "Te mostramos como CloudRIM puede empezar con tus documentos actuales y evolucionar hacia integraciones mas profundas cuando el restaurante este preparado.",
    finalCta: "Ver CloudRIM en una demo",
    faqs: [
      { q: "Tengo que subirlo todo manualmente?", a: "No. Puedes empezar con subida manual, pero CloudRIM tambien puede trabajar con email, carpetas compartidas, FTP/SFTP, API o integraciones de proveedor." },
      { q: "CloudRIM sustituye al TPV o al ERP?", a: "No. CloudRIM recoge y enruta informacion hacia Winerim. El TPV, ERP o PMS siguen siendo sistemas operativos del restaurante." },
      { q: "Sirve para albaranes, facturas y tarifas de distribuidores?", a: "Si. CloudRIM esta pensado para procesar albaranes, facturas, tarifas, reportes de stock, cartas y exportaciones de ventas. Cuando detecta una factura, puede prepararla para conciliacion con su albaran antes de actualizar costes o margenes." },
    ],
    related: [
      { to: "/integraciones", label: "Integraciones Winerim", type: "solution" },
      { to: "/producto/savia", label: "SAVia: agente IA de Winerim", type: "solution" },
      { to: "/producto/winerim-supply", label: "Winerim Supply: compras y bodega", type: "solution" },
      { to: "/guias/como-conectar-carta-stock-ventas-margen", label: "Guia para conectar carta, stock, ventas y margen", type: "guide" },
    ],
  },
  en: {
    seoTitle: "CloudRIM | Document cloud for restaurants and wine lists",
    seoDesc:
      "CloudRIM collects wine lists, sales, delivery notes, invoices, stock and distributor tariffs so Winerim can classify documents, extract data and prepare delivery-note-to-invoice reconciliation.",
    breadcrumbProduct: "Product",
    breadcrumbCurrent: "CloudRIM",
    badge: "CLOUDRIM",
    h1: "The document cloud where your restaurant drops files and Winerim does the heavy lifting",
    subtitle:
      "CloudRIM centralizes wine lists, delivery notes, invoices, sales, stock and distributor tariffs. The client uploads, forwards or connects files; Winerim detects whether each file is an invoice, delivery note, tariff or report, extracts the data and routes it to the right workflow.",
    primaryCta: "Try CloudRIM with my restaurant",
    secondaryCta: "See integrations",
    trustLine: "Portal, email, shared folder, FTP/SFTP, API or provider: CloudRIM adapts to where your information already lives.",
    screenshotAlt: "CloudRIM operating document inbox",
    screenshotCaption: "One inbox to receive, classify and track the documents that feed Winerim.",
    inputLabel: "Input cloud",
    inputDesc: "Lists, sales, stock, tariffs, delivery notes and invoices",
    problemKicker: "Real operations",
    problemTitle: "The problem is not having data. It is getting it uploaded correctly.",
    problemParagraphs: [
      "Sales sit in the POS. Delivery notes and invoices arrive on paper or PDF. Distributor tariffs change by email. Stock gets updated late. When teams have to enter everything by hand, it is easy to leave it for another day.",
      "CloudRIM reduces that friction by turning every document input into an ordered, traceable task connected with Winerim.",
    ],
    howTitle: "How CloudRIM works",
    howSteps: [
      "The restaurant uploads or connects documents: list, delivery notes, invoices, sales, stock, tariffs or reports.",
      "CloudRIM detects the document type, distinguishes invoice vs delivery note and extracts the relevant information.",
      "Winerim routes each file to the right workflow: list, purchasing, sales, stock, catalogue or margin.",
      "If an invoice does not match its delivery note, supplier, lines, quantities or totals, it is held for review before costs, stock or margins are changed.",
    ],
    channelsTitle: "We do not force restaurants to change their routine",
    channelsText: "CloudRIM can work with:",
    channels: ["Upload portal", "Dedicated email", "Shared folders", "FTP/SFTP POS exports", "APIs and webhooks", "Distributor documents in PDF, Excel or operational formats"],
    benefitsTitle: "What the restaurant gains",
    benefits: ["Less manual admin", "Sales, purchase and stock data closer to reality", "Fewer errors in delivery notes, invoices and tariffs", "Delivery-note-to-invoice reconciliation before purchase decisions change", "Better control of cost, stock and margin", "A clear inbox for what is missing, processed or needs review"],
    controlTitle: "CloudRIM organizes. Winerim decides where each data point goes.",
    controlText: "CloudRIM does not replace your POS, ERP or distributors. It acts as an operating layer to receive documents, detect invoices and delivery notes, and turn them into useful Winerim data with human review when something does not match.",
    finalTitle: "Stop chasing files. Let them enter Winerim.",
    finalText: "We will show you how CloudRIM can start with your current documents and evolve into deeper integrations when the restaurant is ready.",
    finalCta: "See CloudRIM in a demo",
    faqs: [
      { q: "Do I have to upload everything manually?", a: "No. You can start manually, but CloudRIM can also work with email, shared folders, FTP/SFTP, API or provider integrations." },
      { q: "Does CloudRIM replace my POS or ERP?", a: "No. CloudRIM collects and routes information into Winerim. Your POS, ERP or PMS remain your operational systems." },
      { q: "Does it work with delivery notes, invoices and distributor tariffs?", a: "Yes. CloudRIM is designed for delivery notes, invoices, tariffs, stock reports, wine lists and sales exports. When it detects an invoice, it can prepare reconciliation with the matching delivery note before costs or margins are updated." },
    ],
    related: [
      { to: "/integraciones", label: "Winerim integrations", type: "solution" },
      { to: "/producto/savia", label: "SAVia: Winerim AI agent", type: "solution" },
      { to: "/producto/winerim-supply", label: "Winerim Supply", type: "solution" },
      { to: "/guias/como-conectar-carta-stock-ventas-margen", label: "Connect list, stock, sales and margin", type: "guide" },
    ],
  },
  it: {
    seoTitle: "CloudRIM | Cloud documentale per ristoranti e carte vini",
    seoDesc: "CloudRIM raccoglie carte, vendite, documenti, fatture, stock e tariffe dei distributori per classificarli e preparare la riconciliazione documento-fattura.",
    breadcrumbProduct: "Prodotto",
    breadcrumbCurrent: "CloudRIM",
    badge: "CLOUDRIM",
    h1: "Il cloud dove il ristorante lascia i documenti e Winerim fa il lavoro pesante",
    subtitle: "CloudRIM centralizza carta, documenti d'acquisto, fatture, vendite, stock e tariffe. Winerim riconosce se un file e fattura, documento o tariffa e lo porta nel flusso corretto.",
    primaryCta: "Provare CloudRIM con il mio ristorante",
    secondaryCta: "Vedere integrazioni",
    trustLine: "Portale, email, cartella condivisa, FTP/SFTP, API o fornitore: CloudRIM si adatta a dove vivono gia i dati.",
    screenshotAlt: "Inbox operativa dei documenti CloudRIM",
    screenshotCaption: "Un'unica inbox per ricevere, classificare e seguire i documenti che alimentano Winerim.",
    inputLabel: "Input cloud",
    inputDesc: "Carte, vendite, stock, tariffe, documenti e fatture",
    problemKicker: "Operativita reale",
    problemTitle: "Il problema non e avere dati. E caricarli bene.",
    problemParagraphs: ["Vendite nel POS, documenti in PDF, tariffe per email e stock aggiornato tardi creano lavoro manuale.", "CloudRIM trasforma ogni ingresso documentale in un'attivita ordinata, tracciabile e collegata a Winerim."],
    howTitle: "Come funziona CloudRIM",
    howSteps: ["Il ristorante carica o collega carta, documenti, fatture, vendite, stock, tariffe o report.", "CloudRIM riconosce il tipo di documento, distingue fattura e documento di consegna ed estrae le informazioni rilevanti.", "Winerim instrada ogni file verso carta, acquisti, vendite, stock, catalogo o margine.", "Se una fattura non quadra con il documento di consegna, resta in revisione prima di modificare costi, stock o margini."],
    channelsTitle: "Non obblighiamo il ristorante a cambiare routine",
    channelsText: "CloudRIM puo lavorare con:",
    channels: ["Portale di upload", "Email dedicata", "Cartelle condivise", "Export POS via FTP/SFTP", "API e webhook", "Documenti dei distributori"],
    benefitsTitle: "Cosa guadagna il ristorante",
    benefits: ["Meno amministrazione manuale", "Dati di vendita, acquisto e stock piu aggiornati", "Meno errori su documenti e tariffe", "Miglior controllo di costo, stock e margine", "Una casella chiara per file mancanti, processati o da rivedere"],
    controlTitle: "CloudRIM ordina. Winerim decide dove va ogni dato.",
    controlText: "CloudRIM non sostituisce POS, ERP o distributori: riceve documenti, riconosce fatture e documenti di consegna e li converte in dati utili dentro Winerim con revisione quando ci sono differenze.",
    finalTitle: "Smetti di inseguire file. Falli entrare in Winerim.",
    finalText: "Ti mostriamo come iniziare con i documenti attuali e crescere verso integrazioni piu profonde.",
    finalCta: "Vedere CloudRIM in demo",
    faqs: [
      { q: "Devo caricare tutto manualmente?", a: "No. Puoi iniziare manualmente, ma CloudRIM lavora anche con email, cartelle condivise, FTP/SFTP, API o integrazioni." },
      { q: "CloudRIM sostituisce POS o ERP?", a: "No. Raccoglie e instrada informazioni verso Winerim." },
      { q: "Serve per documenti e tariffe dei distributori?", a: "Si. E pensato per documenti, fatture, tariffe, report stock, carte ed export vendite." },
    ],
    related: [
      { to: "/integraciones", label: "Integrazioni Winerim", type: "solution" },
      { to: "/producto/savia", label: "SAVia: agente IA Winerim", type: "solution" },
      { to: "/producto/winerim-supply", label: "Winerim Supply", type: "solution" },
      { to: "/guias/como-conectar-carta-stock-ventas-margen", label: "Collegare carta, stock, vendite e margine", type: "guide" },
    ],
  },
  fr: {
    seoTitle: "CloudRIM | Cloud documentaire pour restaurants et cartes des vins",
    seoDesc: "CloudRIM collecte cartes, ventes, bons, factures, stock et tarifs distributeurs pour les classer et preparer le rapprochement bon-facture.",
    breadcrumbProduct: "Produit",
    breadcrumbCurrent: "CloudRIM",
    badge: "CLOUDRIM",
    h1: "Le cloud ou le restaurant depose ses documents et Winerim fait le travail lourd",
    subtitle: "CloudRIM centralise carte, bons, factures, ventes, stock et tarifs distributeurs. Winerim detecte si chaque fichier est une facture, un bon, un tarif ou un rapport, puis le route vers le bon flux.",
    primaryCta: "Tester CloudRIM avec mon restaurant",
    secondaryCta: "Voir les integrations",
    trustLine: "Portail, email, dossier partage, FTP/SFTP, API ou fournisseur : CloudRIM s'adapte aux habitudes existantes.",
    screenshotAlt: "Boite operationnelle de documents CloudRIM",
    screenshotCaption: "Une seule boite pour recevoir, classer et suivre les documents qui alimentent Winerim.",
    inputLabel: "Input cloud",
    inputDesc: "Cartes, ventes, stock, tarifs, bons et factures",
    problemKicker: "Operation reelle",
    problemTitle: "Le probleme n'est pas d'avoir des donnees. C'est de les faire entrer correctement.",
    problemParagraphs: ["Les ventes sont dans la caisse, les bons arrivent en PDF, les tarifs changent par email et le stock se met a jour tard.", "CloudRIM transforme chaque entree documentaire en tache ordonnee, tracable et connectee a Winerim."],
    howTitle: "Comment fonctionne CloudRIM",
    howSteps: ["Le restaurant importe ou connecte carte, bons, factures, ventes, stock, tarifs ou rapports.", "CloudRIM detecte le type de document, distingue facture et bon de livraison, puis extrait l'information utile.", "Winerim route chaque fichier vers carte, achats, ventes, stock, catalogue ou marge.", "Si une facture ne correspond pas au bon, fournisseur, lignes, quantites ou totaux, elle reste en revision avant de changer couts, stock ou marges."],
    channelsTitle: "Nous n'obligeons pas le restaurant a changer ses habitudes",
    channelsText: "CloudRIM peut travailler avec :",
    channels: ["Portail d'import", "Email dedie", "Dossiers partages", "Exports caisse FTP/SFTP", "APIs et webhooks", "Documents distributeurs"],
    benefitsTitle: "Ce que gagne le restaurant",
    benefits: ["Moins d'administration manuelle", "Donnees ventes, achats et stock plus proches du reel", "Moins d'erreurs sur bons et tarifs", "Meilleur controle des couts, stocks et marges", "Une boite claire pour les fichiers manquants, traites ou a revoir"],
    controlTitle: "CloudRIM organise. Winerim decide ou va chaque donnee.",
    controlText: "CloudRIM ne remplace pas POS, ERP ou distributeurs. Il recoit les documents, detecte factures et bons, et les convertit en donnees utiles dans Winerim avec revision humaine en cas d'ecart.",
    finalTitle: "Arretez de poursuivre les fichiers. Faites-les entrer dans Winerim.",
    finalText: "Nous vous montrons comment demarrer avec vos documents actuels et evoluer vers des integrations plus profondes.",
    finalCta: "Voir CloudRIM en demo",
    faqs: [
      { q: "Faut-il tout importer manuellement ?", a: "Non. Vous pouvez demarrer manuellement, mais CloudRIM fonctionne aussi avec email, dossiers partages, FTP/SFTP, API ou integrations." },
      { q: "CloudRIM remplace-t-il POS ou ERP ?", a: "Non. Il collecte et route l'information vers Winerim." },
      { q: "Fonctionne-t-il avec bons et tarifs distributeurs ?", a: "Oui. Il est concu pour bons, factures, tarifs, rapports de stock, cartes et exports de ventes." },
    ],
    related: [
      { to: "/integraciones", label: "Integrations Winerim", type: "solution" },
      { to: "/producto/savia", label: "SAVia : agent IA Winerim", type: "solution" },
      { to: "/producto/winerim-supply", label: "Winerim Supply", type: "solution" },
      { to: "/guias/como-conectar-carta-stock-ventas-margen", label: "Connecter carte, stock, ventes et marge", type: "guide" },
    ],
  },
  de: {
    seoTitle: "CloudRIM | Dokumentencloud fur Restaurants und Weinkarten",
    seoDesc: "CloudRIM sammelt Karten, Verkaeufe, Lieferscheine, Rechnungen, Bestand und Lieferantentarife, damit Winerim sie klassifiziert und den Abgleich Lieferschein-Rechnung vorbereitet.",
    breadcrumbProduct: "Produkt",
    breadcrumbCurrent: "CloudRIM",
    badge: "CLOUDRIM",
    h1: "Die Cloud, in der Ihr Restaurant Dokumente ablegt und Winerim die schwere Arbeit erledigt",
    subtitle: "CloudRIM zentralisiert Weinkarten, Lieferscheine, Rechnungen, Verkaeufe, Bestand und Lieferantentarife. Winerim erkennt, ob eine Datei Rechnung, Lieferschein, Tarif oder Report ist, und routet sie in den richtigen Ablauf.",
    primaryCta: "CloudRIM mit meinem Restaurant testen",
    secondaryCta: "Integrationen ansehen",
    trustLine: "Portal, E-Mail, geteilter Ordner, FTP/SFTP, API oder Lieferant: CloudRIM passt sich an bestehende Routinen an.",
    screenshotAlt: "Operativer Dokumenteneingang von CloudRIM",
    screenshotCaption: "Ein Eingang zum Empfangen, Klassifizieren und Verfolgen aller Dokumente fur Winerim.",
    inputLabel: "Input cloud",
    inputDesc: "Karten, Verkaeufe, Bestand, Tarife, Lieferscheine und Rechnungen",
    problemKicker: "Realer Betrieb",
    problemTitle: "Das Problem ist nicht, Daten zu haben. Es ist, sie sauber einzuspielen.",
    problemParagraphs: ["Verkaeufe liegen im Kassensystem, Lieferscheine als PDF, Tarife per E-Mail und der Bestand wird spaet aktualisiert.", "CloudRIM macht aus jedem Dokumenteneingang eine geordnete, nachvollziehbare und mit Winerim verbundene Aufgabe."],
    howTitle: "So funktioniert CloudRIM",
    howSteps: ["Das Restaurant laedt oder verbindet Karte, Lieferscheine, Rechnungen, Verkaeufe, Bestand, Tarife oder Reports.", "CloudRIM erkennt den Dokumenttyp, unterscheidet Rechnung und Lieferschein und extrahiert die relevanten Informationen.", "Winerim routet jede Datei zu Karte, Einkauf, Verkauf, Bestand, Katalog oder Marge.", "Wenn eine Rechnung nicht zum Lieferschein, Lieferanten, zu Positionen, Mengen oder Summen passt, bleibt sie vor Kosten-, Bestands- oder Margenaenderungen in Pruefung."],
    channelsTitle: "Restaurants muessen ihre Routine nicht aendern",
    channelsText: "CloudRIM arbeitet mit:",
    channels: ["Upload-Portal", "Dedizierter E-Mail", "Geteilten Ordnern", "Kassenexporten per FTP/SFTP", "APIs und Webhooks", "Lieferantendokumenten"],
    benefitsTitle: "Was das Restaurant gewinnt",
    benefits: ["Weniger manuelle Administration", "Aktuellere Verkaufs-, Einkaufs- und Bestandsdaten", "Weniger Fehler bei Lieferscheinen und Tarifen", "Bessere Kontrolle von Kosten, Bestand und Marge", "Ein klarer Eingang fur fehlende, verarbeitete oder zu pruefende Dateien"],
    controlTitle: "CloudRIM ordnet. Winerim entscheidet, wohin jedes Datum gehoert.",
    controlText: "CloudRIM ersetzt kein Kassensystem, ERP oder Lieferanten. Es empfaengt Dokumente, erkennt Rechnungen und Lieferscheine und macht daraus nutzbare Winerim-Daten mit menschlicher Pruefung bei Abweichungen.",
    finalTitle: "Hoeren Sie auf, Dateien zu suchen. Lassen Sie sie in Winerim einlaufen.",
    finalText: "Wir zeigen, wie CloudRIM mit bestehenden Dokumenten startet und spaeter tiefere Integrationen ermoeglicht.",
    finalCta: "CloudRIM in einer Demo sehen",
    faqs: [
      { q: "Muss alles manuell hochgeladen werden?", a: "Nein. Sie koennen manuell starten, aber CloudRIM arbeitet auch mit E-Mail, Ordnern, FTP/SFTP, API oder Integrationen." },
      { q: "Ersetzt CloudRIM POS oder ERP?", a: "Nein. CloudRIM sammelt und routet Informationen nach Winerim." },
      { q: "Funktioniert es mit Lieferscheinen und Tarifen?", a: "Ja. Es ist fur Lieferscheine, Rechnungen, Tarife, Bestandsreports, Karten und Verkaufsexporte gedacht." },
    ],
    related: [
      { to: "/integraciones", label: "Winerim-Integrationen", type: "solution" },
      { to: "/producto/savia", label: "SAVia: Winerim KI-Agent", type: "solution" },
      { to: "/producto/winerim-supply", label: "Winerim Supply", type: "solution" },
      { to: "/guias/como-conectar-carta-stock-ventas-margen", label: "Karte, Bestand, Verkauf und Marge verbinden", type: "guide" },
    ],
  },
  pt: {
    seoTitle: "CloudRIM | Nuvem documental para restaurantes e cartas de vinho",
    seoDesc: "CloudRIM recolhe cartas, vendas, guias, faturas, stock e tabelas de distribuidores para classificar documentos e preparar conciliacao guia-fatura.",
    breadcrumbProduct: "Produto",
    breadcrumbCurrent: "CloudRIM",
    badge: "CLOUDRIM",
    h1: "A nuvem onde o restaurante deixa documentos e a Winerim faz o trabalho pesado",
    subtitle: "CloudRIM centraliza cartas, guias, faturas, vendas, stock e tabelas de distribuidores. A Winerim deteta se cada ficheiro e fatura, guia, tabela ou relatorio e encaminha-o para o fluxo certo.",
    primaryCta: "Testar CloudRIM no meu restaurante",
    secondaryCta: "Ver integrações",
    trustLine: "Portal, email, pasta partilhada, FTP/SFTP, API ou fornecedor: CloudRIM adapta-se ao local onde a informação ja vive.",
    screenshotAlt: "Caixa operacional de documentos do CloudRIM",
    screenshotCaption: "Uma unica caixa para receber, classificar e acompanhar os documentos que alimentam a Winerim.",
    inputLabel: "Input cloud",
    inputDesc: "Cartas, vendas, stock, tabelas, guias e faturas",
    problemKicker: "Operacao real",
    problemTitle: "O problema nao e ter dados. E conseguir carrega-los bem.",
    problemParagraphs: ["As vendas estao no POS, as guias chegam em PDF, as tabelas mudam por email e o stock e atualizado tarde.", "CloudRIM reduz essa friccao: transforma qualquer entrada documental numa tarefa ordenada, rastreavel e ligada a Winerim."],
    howTitle: "Como funciona CloudRIM",
    howSteps: ["O restaurante carrega ou liga documentos: carta, guias, faturas, vendas, stock, tabelas ou relatorios.", "CloudRIM deteta o tipo de documento, distingue fatura vs guia e extrai a informacao relevante.", "A Winerim encaminha cada ficheiro para carta, compras, vendas, stock, catalogo ou margem.", "Se uma fatura nao bate certo com a guia, fornecedor, linhas, quantidades ou totais, fica em revisao antes de alterar custos, stock ou margens."],
    channelsTitle: "Nao obrigamos o restaurante a mudar a rotina",
    channelsText: "CloudRIM pode trabalhar com:",
    channels: ["Portal de upload", "Email dedicado", "Pastas partilhadas", "Exportacoes POS por FTP/SFTP", "APIs e webhooks", "Documentos de distribuidores"],
    benefitsTitle: "O que ganha o restaurante",
    benefits: ["Menos administracao manual", "Dados de vendas, compras e stock mais atualizados", "Menos erros em guias e tabelas", "Melhor controlo de custo, stock e margem", "Uma caixa clara para ficheiros em falta, processados ou a rever"],
    controlTitle: "CloudRIM organiza. Winerim decide para onde vai cada dado.",
    controlText: "CloudRIM nao substitui POS, ERP ou distribuidores. Recebe documentos, deteta faturas e guias e converte-os em dados uteis dentro da Winerim com revisao humana quando ha diferencas.",
    finalTitle: "Deixe de perseguir ficheiros. Deixe-os entrar na Winerim.",
    finalText: "Mostramos como CloudRIM pode comecar com os documentos atuais e evoluir para integracoes mais profundas.",
    finalCta: "Ver CloudRIM numa demo",
    faqs: [
      { q: "Tenho de carregar tudo manualmente?", a: "Nao. Pode comecar manualmente, mas CloudRIM tambem trabalha com email, pastas, FTP/SFTP, API ou integracoes." },
      { q: "CloudRIM substitui o POS ou ERP?", a: "Nao. Recolhe e encaminha informacao para a Winerim." },
      { q: "Serve para guias e tabelas de distribuidores?", a: "Sim. Foi pensado para guias, faturas, tabelas, relatorios de stock, cartas e exportacoes de vendas." },
    ],
    related: [
      { to: "/integraciones", label: "Integrações Winerim", type: "solution" },
      { to: "/producto/savia", label: "SAVia: agente IA Winerim", type: "solution" },
      { to: "/producto/winerim-supply", label: "Winerim Supply", type: "solution" },
      { to: "/guias/como-conectar-carta-stock-ventas-margen", label: "Ligar carta, stock, vendas e margem", type: "guide" },
    ],
  },
};

const channelIcons = [UploadCloud, Mail, FolderSync, Network, Cloud, FileText];

const CloudRim = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = getI18n(copy, lang);
  const canonicalPath = localePath("/producto/cloudrim");
  const canonical = `${CANONICAL_DOMAIN}${canonicalPath}`;

  return (
    <>
      <SEOHead
        title={t.seoTitle}
        description={t.seoDesc}
        url={canonical}
        hreflang={allLangPaths("/producto/cloudrim")}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "CloudRIM",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          description: t.seoDesc,
          url: canonical,
          provider: { "@type": "Organization", name: "Winerim", url: CANONICAL_DOMAIN },
          isPartOf: { "@type": "SoftwareApplication", name: "Winerim" },
        }}
      />
      <Navbar />
      <main>
        <section className="relative overflow-hidden pt-32 md:pt-44 pb-20 md:pb-28 px-6">
          <div className="absolute inset-0 bg-gradient-to-b from-wine/8 via-transparent to-background pointer-events-none" />
          <div className="relative max-w-6xl mx-auto">
            <Breadcrumbs
              items={[
                { label: t.breadcrumbProduct, href: localePath("/software-carta-de-vinos") },
                { label: t.breadcrumbCurrent },
              ]}
            />
            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
              <ScrollReveal>
                <Badge className="bg-wine/10 text-wine border-wine/20 mb-6 text-xs tracking-widest uppercase px-3 py-1">
                  {t.badge}
                </Badge>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.05] mb-6">
                  {t.h1}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-8">
                  {t.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Link
                    to={localePath("/demo")}
                    className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-7 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all"
                  >
                    {t.primaryCta} <ArrowRight size={16} />
                  </Link>
                  <Link
                    to={localePath("/integraciones")}
                    className="inline-flex items-center justify-center gap-2 border border-border px-7 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/30 hover:text-wine transition-all"
                  >
                    {t.secondaryCta}
                  </Link>
                </div>
                <p className="text-xs text-muted-foreground/70 max-w-xl leading-relaxed">{t.trustLine}</p>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="relative rounded-2xl border border-border bg-card/80 p-6 md:p-8 shadow-xl shadow-black/5 overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-wine" />
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center">
                      <Inbox size={24} className="text-wine" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-wine/70 font-semibold">{t.inputLabel}</p>
                      <p className="text-sm text-muted-foreground">{t.inputDesc}</p>
                    </div>
                  </div>
                  <h2 className="font-heading text-xl md:text-2xl font-bold mb-4">{t.howTitle}</h2>
                  <div className="space-y-3">
                    {t.howSteps.map((step, index) => (
                      <div key={step} className="flex items-start gap-3 rounded-xl border border-border bg-background/70 p-4">
                        <span className="w-7 h-7 rounded-lg bg-wine/10 text-wine flex items-center justify-center text-xs font-bold shrink-0">
                          {index + 1}
                        </span>
                        <p className="text-sm text-muted-foreground leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="px-6 pb-20 md:pb-28">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <figure>
                <div className="aspect-[16/9] overflow-hidden rounded-xl border border-border bg-[#171817] shadow-xl shadow-black/10">
                  <img
                    src={cloudrimInbox}
                    alt={t.screenshotAlt}
                    loading="eager"
                    className="h-full w-full object-contain"
                  />
                </div>
                <figcaption className="mt-4 text-center text-sm text-muted-foreground">{t.screenshotCaption}</figcaption>
              </figure>
            </ScrollReveal>
          </div>
        </section>

        <section className="section-padding bg-gradient-dark">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
                <div>
                  <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.problemKicker}</p>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold leading-tight">{t.problemTitle}</h2>
                </div>
                <div className="space-y-5">
                  {t.problemParagraphs.map((paragraph) => (
                    <p key={paragraph} className="text-muted-foreground text-lg leading-relaxed">{paragraph}</p>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="section-padding">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">{t.channelsTitle}</h2>
              <p className="text-muted-foreground text-lg">{t.channelsText}</p>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {t.channels.map((channel, index) => {
                const Icon = channelIcons[index] || FileText;
                return (
                  <ScrollReveal key={channel} delay={index * 0.04}>
                    <div className="h-full rounded-xl border border-border bg-gradient-card p-6">
                      <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-4">
                        <Icon size={20} className="text-wine" />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{channel}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-padding bg-gradient-dark">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 items-start">
              <ScrollReveal>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-5">{t.benefitsTitle}</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">{t.controlText}</p>
              </ScrollReveal>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.benefits.map((benefit, index) => (
                  <ScrollReveal key={benefit} delay={index * 0.05}>
                    <div className="flex items-start gap-3 rounded-xl border border-border bg-card/70 p-5 h-full">
                      <CheckCircle2 size={18} className="text-wine shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground leading-relaxed">{benefit}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-wine/10 mb-6">
                <ShieldCheck size={28} className="text-wine" />
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-5">{t.controlTitle}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">{t.controlText}</p>
            </ScrollReveal>
          </div>
        </section>

        <FAQSection faqs={t.faqs} schemaId="cloudrim" />

        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="rounded-2xl border border-wine/15 bg-gradient-to-br from-card via-card/95 to-wine/5 p-10 md:p-14 text-center">
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">{t.finalTitle}</h2>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto mb-8">{t.finalText}</p>
                <Link
                  to={localePath("/demo")}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all"
                >
                  {t.finalCta} <ArrowRight size={16} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <InternalLinks
        links={t.related.map((item) => ({ ...item, to: localePath(item.to) }))}
      />
      <Footer />
    </>
  );
};

export default CloudRim;
