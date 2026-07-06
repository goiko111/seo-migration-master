import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, CheckCircle, ClipboardList, Compass, Target, Wine } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import ScrollReveal from "@/components/ScrollReveal";
import FAQSection from "@/components/seo/FAQSection";
import InternalLinks from "@/components/seo/InternalLinks";
import { Button } from "@/components/ui/button";
import { CANONICAL_DOMAIN } from "@/seo/config";
import { trackAction } from "@/lib/intentTracking";
import { useLanguage } from "@/i18n/LanguageContext";

type AnswerKey = "listSize" | "stock" | "pos" | "margin" | "team" | "goal";

type Option = {
  value: string;
  label: string;
  helper: string;
  score: number;
};

const questions: { key: AnswerKey; title: string; options: Option[] }[] = [
  {
    key: "listSize",
    title: "Tamaño y profundidad de carta",
    options: [
      { value: "short", label: "Menos de 60 referencias", helper: "Carta compacta o todavía en construcción.", score: 1 },
      { value: "medium", label: "60 a 180 referencias", helper: "Surtido con margen para ordenar mejor.", score: 2 },
      { value: "large", label: "Más de 180 referencias", helper: "Carta amplia con riesgo de capital inmovilizado.", score: 3 },
    ],
  },
  {
    key: "stock",
    title: "Control de stock y bodega",
    options: [
      { value: "manual", label: "Manual o irregular", helper: "El stock se revisa cuando aparece un problema.", score: 0 },
      { value: "partial", label: "Hoja o revisión semanal", helper: "Hay control, pero no siempre conectado a ventas.", score: 1 },
      { value: "connected", label: "Conectado a carta y ventas", helper: "El equipo ve rotación, cobertura y stock real.", score: 3 },
    ],
  },
  {
    key: "pos",
    title: "Ventas y TPV",
    options: [
      { value: "none", label: "No cruzamos ventas de vino", helper: "Se decide por intuición o memoria del equipo.", score: 0 },
      { value: "periodic", label: "Miramos informes puntuales", helper: "Se revisa el TPV, pero no con la carta viva.", score: 1 },
      { value: "live", label: "TPV conectado o analítica continua", helper: "Las decisiones salen de datos reales.", score: 3 },
    ],
  },
  {
    key: "margin",
    title: "Márgenes, PVP y coste",
    options: [
      { value: "rare", label: "Solo al crear la carta", helper: "Después apenas se revisa el coste real.", score: 0 },
      { value: "some", label: "Revisión mensual o trimestral", helper: "Se detectan fugas, pero tarde.", score: 2 },
      { value: "active", label: "Alertas y señales por referencia", helper: "No reponer, liquidar, crítico y capital inmovilizado.", score: 3 },
    ],
  },
  {
    key: "team",
    title: "Equipo de sala",
    options: [
      { value: "low", label: "Depende de una persona", helper: "Si falta el sumiller, la carta pierde fuerza.", score: 0 },
      { value: "medium", label: "Equipo con guías básicas", helper: "Hay discurso, pero no siempre consistente.", score: 1 },
      { value: "high", label: "Equipo guiado por carta digital", helper: "Maridajes, estilos y venta asistida en servicio.", score: 3 },
    ],
  },
  {
    key: "goal",
    title: "Objetivo principal de la carta",
    options: [
      { value: "survive", label: "Ordenar el caos operativo", helper: "Stock, compras, costes y referencias duplicadas.", score: 0 },
      { value: "sell", label: "Vender más y subir ticket", helper: "Rotación, copa, recomendación y margen.", score: 2 },
      { value: "identity", label: "Crear identidad gastronómica", helper: "Profundidad, relato, premios y experiencia.", score: 3 },
    ],
  },
];

const initialAnswers: Record<AnswerKey, string> = {
  listSize: "medium",
  stock: "partial",
  pos: "periodic",
  margin: "some",
  team: "medium",
  goal: "sell",
};

const profileData = {
  estrategico: {
    label: "Perfil RIM estratégico",
    tone: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
    summary: "Tu carta ya puede funcionar como sistema de decisión: ventas, stock, margen y equipo empiezan a hablar el mismo idioma.",
    priority: "Convertir los datos en rutinas: revisión semanal de compras, alertas de margen y ruta de recomendación para sala.",
    actions: ["Activar alertas por referencia crítica", "Comparar PVP frente a categorías equivalentes", "Crear un cuadro mensual de rotación, margen y ticket"],
  },
  gourmet: {
    label: "Perfil RIM gastronómico",
    tone: "bg-wine/10 text-wine border-wine/30",
    summary: "La carta tiene potencial de identidad, profundidad y relato. El riesgo es que el valor gastronómico no siempre se traduzca en venta medible.",
    priority: "Separar vinos de imagen, vinos de rotación y vinos lastre sin empobrecer la experiencia.",
    actions: ["Marcar vinos protegidos por identidad", "Medir cobertura de cada familia gastronómica", "Formar sala con maridajes y alternativas por ticket"],
  },
  coleccionista: {
    label: "Perfil RIM coleccionista",
    tone: "bg-amber-500/10 text-amber-700 border-amber-500/30",
    summary: "Hay profundidad y ambición, pero probablemente también capital inmovilizado y referencias que nadie empuja.",
    priority: "Detectar stock muerto, duplicidades por estilo y referencias que ocupan carta sin aportar venta ni margen.",
    actions: ["Aplicar Pareto 80/20 por facturación y margen", "Etiquetar no reponer y liquidar", "Reducir solapes de DO, añada y precio"],
  },
  turistico: {
    label: "Perfil RIM turístico",
    tone: "bg-blue-500/10 text-blue-700 border-blue-500/30",
    summary: "La carta debe vender rápido, explicar bien y evitar decisiones complejas en servicio. La oportunidad está en ticket medio y vinos por copa.",
    priority: "Simplificar elección, reforzar estilos comprensibles y controlar el margen en referencias de alta salida.",
    actions: ["Crear rutas de recomendación por idioma y ticket", "Revisar copa, espumosos y blancos de rotación", "Medir ticket vino por mesa y mix turístico/local"],
  },
  pasivo: {
    label: "Perfil RIM pasivo",
    tone: "bg-slate-500/10 text-slate-700 border-slate-500/30",
    summary: "La carta existe, pero no trabaja todavía como palanca comercial. Falta ritmo de revisión y conexión con datos.",
    priority: "Empezar por cuatro señales: PVP, coste, stock y ventas por referencia.",
    actions: ["Conectar carta con stock básico", "Revisar 20 referencias de mayor impacto", "Crear una rutina mensual de compras y no reponer"],
  },
  superviviente: {
    label: "Perfil RIM superviviente",
    tone: "bg-red-500/10 text-red-700 border-red-500/30",
    summary: "La gestión de vino está absorbiendo tiempo y probablemente escondiendo fugas de margen, stock y compras.",
    priority: "Recuperar control operativo antes de ampliar carta: inventario, costes reales, PVP y distribuidores.",
    actions: ["Auditar albaranes y facturas", "Cerrar un inventario inicial", "Eliminar referencias duplicadas o sin función clara"],
  },
};

const questionsByLang: Record<string, typeof questions> = {
  es: questions,
  de: [
    {
      key: "listSize",
      title: "Umfang und Tiefe der Weinkarte",
      options: [
        { value: "short", label: "Weniger als 60 Referenzen", helper: "Kompakte Karte oder noch im Aufbau.", score: 1 },
        { value: "medium", label: "60 bis 180 Referenzen", helper: "Sortiment mit Spielraum für eine bessere Ordnung.", score: 2 },
        { value: "large", label: "Mehr als 180 Referenzen", helper: "Umfangreiche Karte mit Risiko für gebundenes Kapital.", score: 3 },
      ],
    },
    {
      key: "stock",
      title: "Bestands- und Kellerkontrolle",
      options: [
        { value: "manual", label: "Manuell oder unregelmäßig", helper: "Der Bestand wird erst geprüft, wenn ein Problem auftaucht.", score: 0 },
        { value: "partial", label: "Tabelle oder wöchentliche Prüfung", helper: "Es gibt Kontrolle, aber nicht immer mit Verkäufen verknüpft.", score: 1 },
        { value: "connected", label: "Mit Karte und Verkäufen verbunden", helper: "Das Team sieht Rotation, Reichweite und realen Bestand.", score: 3 },
      ],
    },
    {
      key: "pos",
      title: "Verkäufe und Kassensystem",
      options: [
        { value: "none", label: "Wir gleichen Weinverkäufe nicht ab", helper: "Entscheidungen beruhen auf Intuition oder Teamgedächtnis.", score: 0 },
        { value: "periodic", label: "Wir prüfen einzelne Berichte", helper: "Das Kassensystem wird betrachtet, aber nicht mit der laufenden Karte.", score: 1 },
        { value: "live", label: "Verbundenes Kassensystem oder laufende Analyse", helper: "Entscheidungen entstehen aus realen Daten.", score: 3 },
      ],
    },
    {
      key: "margin",
      title: "Margen, Verkaufspreis und Kosten",
      options: [
        { value: "rare", label: "Nur beim Erstellen der Karte", helper: "Danach werden reale Kosten kaum überprüft.", score: 0 },
        { value: "some", label: "Monatliche oder quartalsweise Prüfung", helper: "Abweichungen werden erkannt, aber spät.", score: 2 },
        { value: "active", label: "Warnungen und Signale pro Referenz", helper: "Nicht nachkaufen, abverkaufen, kritisch und gebundenes Kapital.", score: 3 },
      ],
    },
    {
      key: "team",
      title: "Serviceteam",
      options: [
        { value: "low", label: "Hängt von einer Person ab", helper: "Fehlt der Sommelier, verliert die Karte an Kraft.", score: 0 },
        { value: "medium", label: "Team mit grundlegenden Leitlinien", helper: "Es gibt eine Verkaufssprache, aber nicht immer konsistent.", score: 1 },
        { value: "high", label: "Team durch digitale Karte geführt", helper: "Pairings, Stile und assistierter Verkauf im Service.", score: 3 },
      ],
    },
    {
      key: "goal",
      title: "Hauptziel der Weinkarte",
      options: [
        { value: "survive", label: "Operatives Chaos ordnen", helper: "Bestand, Einkauf, Kosten und doppelte Referenzen.", score: 0 },
        { value: "sell", label: "Mehr verkaufen und Bon erhöhen", helper: "Rotation, Glaswein, Empfehlung und Marge.", score: 2 },
        { value: "identity", label: "Gastronomische Identität schaffen", helper: "Tiefe, Erzählung, Auszeichnungen und Erlebnis.", score: 3 },
      ],
    },
  ],
  pt: [
    {
      key: "listSize",
      title: "Tamanho e profundidade da carta",
      options: [
        { value: "short", label: "Menos de 60 referências", helper: "Carta compacta ou ainda em construção.", score: 1 },
        { value: "medium", label: "60 a 180 referências", helper: "Sortido com margem para organizar melhor.", score: 2 },
        { value: "large", label: "Mais de 180 referências", helper: "Carta ampla com risco de capital imobilizado.", score: 3 },
      ],
    },
    {
      key: "stock",
      title: "Controlo de stock e cave",
      options: [
        { value: "manual", label: "Manual ou irregular", helper: "O stock é revisto quando surge um problema.", score: 0 },
        { value: "partial", label: "Folha ou revisão semanal", helper: "Há controlo, mas nem sempre ligado às vendas.", score: 1 },
        { value: "connected", label: "Ligado à carta e às vendas", helper: "A equipa vê rotação, cobertura e stock real.", score: 3 },
      ],
    },
    {
      key: "pos",
      title: "Vendas e POS",
      options: [
        { value: "none", label: "Não cruzamos vendas de vinho", helper: "Decide-se por intuição ou memória da equipa.", score: 0 },
        { value: "periodic", label: "Vemos relatórios pontuais", helper: "O POS é revisto, mas não com a carta viva.", score: 1 },
        { value: "live", label: "POS ligado ou analítica contínua", helper: "As decisões saem de dados reais.", score: 3 },
      ],
    },
    {
      key: "margin",
      title: "Margens, PVP e custo",
      options: [
        { value: "rare", label: "Só ao criar a carta", helper: "Depois, o custo real quase não é revisto.", score: 0 },
        { value: "some", label: "Revisão mensal ou trimestral", helper: "As fugas são detetadas, mas tarde.", score: 2 },
        { value: "active", label: "Alertas e sinais por referência", helper: "Não repor, liquidar, crítico e capital imobilizado.", score: 3 },
      ],
    },
    {
      key: "team",
      title: "Equipa de sala",
      options: [
        { value: "low", label: "Depende de uma pessoa", helper: "Se o sommelier falta, a carta perde força.", score: 0 },
        { value: "medium", label: "Equipa com guias básicos", helper: "Há discurso, mas nem sempre consistente.", score: 1 },
        { value: "high", label: "Equipa guiada por carta digital", helper: "Harmonizações, estilos e venda assistida no serviço.", score: 3 },
      ],
    },
    {
      key: "goal",
      title: "Objetivo principal da carta",
      options: [
        { value: "survive", label: "Organizar o caos operacional", helper: "Stock, compras, custos e referências duplicadas.", score: 0 },
        { value: "sell", label: "Vender mais e subir o ticket", helper: "Rotação, vinho a copo, recomendação e margem.", score: 2 },
        { value: "identity", label: "Criar identidade gastronómica", helper: "Profundidade, narrativa, prémios e experiência.", score: 3 },
      ],
    },
  ],
};

const profileDataByLang: Record<string, typeof profileData> = {
  es: profileData,
  de: {
    estrategico: {
      ...profileData.estrategico,
      label: "Strategisches RIM-Profil",
      summary: "Ihre Weinkarte kann bereits als Entscheidungssystem funktionieren: Verkauf, Bestand, Marge und Team beginnen, dieselbe Sprache zu sprechen.",
      priority: "Daten in Routinen übersetzen: wöchentliche Einkaufsprüfung, Margenwarnungen und Empfehlungswege für den Service.",
      actions: ["Warnungen für kritische Referenzen aktivieren", "Verkaufspreise mit vergleichbaren Kategorien abgleichen", "Monatliches Dashboard für Rotation, Marge und Bon erstellen"],
    },
    gourmet: {
      ...profileData.gourmet,
      label: "Gastronomisches RIM-Profil",
      summary: "Die Karte hat Potenzial für Identität, Tiefe und Erzählung. Das Risiko ist, dass gastronomischer Wert nicht immer in messbaren Verkauf übersetzt wird.",
      priority: "Imageweine, Rotationsweine und Ballastweine trennen, ohne das Erlebnis zu verarmen.",
      actions: ["Identitätsstiftende Weine markieren", "Abdeckung jeder gastronomischen Familie messen", "Service mit Pairings und Ticket-Alternativen schulen"],
    },
    coleccionista: {
      ...profileData.coleccionista,
      label: "Sammler-RIM-Profil",
      summary: "Es gibt Tiefe und Ambition, wahrscheinlich aber auch gebundenes Kapital und Referenzen, die niemand aktiv verkauft.",
      priority: "Toten Bestand, Stilüberschneidungen und Referenzen erkennen, die Platz einnehmen, ohne Verkauf oder Marge zu liefern.",
      actions: ["Pareto 80/20 nach Umsatz und Marge anwenden", "Nicht nachkaufen und abverkaufen markieren", "Überschneidungen bei Herkunft, Jahrgang und Preis reduzieren"],
    },
    turistico: {
      ...profileData.turistico,
      label: "Touristisches RIM-Profil",
      summary: "Die Karte muss schnell verkaufen, klar erklären und komplexe Entscheidungen im Service vermeiden. Die Chance liegt in Durchschnittsbon und Glaswein.",
      priority: "Auswahl vereinfachen, verständliche Stile stärken und die Marge bei schnell drehenden Referenzen kontrollieren.",
      actions: ["Empfehlungswege nach Sprache und Bon erstellen", "Glaswein, Schaumwein und schnell drehende Weißweine prüfen", "Weinbon pro Tisch und touristisch/lokalen Mix messen"],
    },
    pasivo: {
      ...profileData.pasivo,
      label: "Passives RIM-Profil",
      summary: "Die Karte existiert, arbeitet aber noch nicht als kommerzieller Hebel. Es fehlen Prüfungsrhythmus und Datenverbindung.",
      priority: "Mit vier Signalen beginnen: Verkaufspreis, Kosten, Bestand und Verkäufe pro Referenz.",
      actions: ["Karte mit einfachem Bestand verbinden", "Die 20 wirkungsstärksten Referenzen prüfen", "Monatliche Einkaufs- und Nicht-nachkaufen-Routine schaffen"],
    },
    superviviente: {
      ...profileData.superviviente,
      label: "Überlebens-RIM-Profil",
      summary: "Das Weinmanagement bindet Zeit und verbirgt wahrscheinlich Margen-, Bestands- und Einkaufsverluste.",
      priority: "Operative Kontrolle zurückgewinnen, bevor die Karte wächst: Inventur, reale Kosten, Verkaufspreise und Lieferanten.",
      actions: ["Lieferscheine und Rechnungen prüfen", "Eine Anfangsinventur abschließen", "Doppelte oder funktionslose Referenzen entfernen"],
    },
  },
  pt: {
    estrategico: {
      ...profileData.estrategico,
      label: "Perfil RIM estratégico",
      summary: "A sua carta já pode funcionar como sistema de decisão: vendas, stock, margem e equipa começam a falar a mesma língua.",
      priority: "Transformar dados em rotinas: revisão semanal de compras, alertas de margem e rota de recomendação para a sala.",
      actions: ["Ativar alertas por referência crítica", "Comparar PVP com categorias equivalentes", "Criar um painel mensal de rotação, margem e ticket"],
    },
    gourmet: {
      ...profileData.gourmet,
      label: "Perfil RIM gastronómico",
      summary: "A carta tem potencial de identidade, profundidade e narrativa. O risco é que o valor gastronómico nem sempre se traduza em venda mensurável.",
      priority: "Separar vinhos de imagem, vinhos de rotação e vinhos lastro sem empobrecer a experiência.",
      actions: ["Marcar vinhos protegidos pela identidade", "Medir cobertura de cada família gastronómica", "Formar a sala com harmonizações e alternativas por ticket"],
    },
    coleccionista: {
      ...profileData.coleccionista,
      label: "Perfil RIM colecionador",
      summary: "Há profundidade e ambição, mas provavelmente também capital imobilizado e referências que ninguém impulsiona.",
      priority: "Detetar stock parado, duplicidades por estilo e referências que ocupam carta sem acrescentar venda nem margem.",
      actions: ["Aplicar Pareto 80/20 por faturação e margem", "Etiquetar não repor e liquidar", "Reduzir sobreposições de denominação, ano e preço"],
    },
    turistico: {
      ...profileData.turistico,
      label: "Perfil RIM turístico",
      summary: "A carta deve vender rápido, explicar bem e evitar decisões complexas no serviço. A oportunidade está no ticket médio e no vinho a copo.",
      priority: "Simplificar a escolha, reforçar estilos compreensíveis e controlar a margem nas referências de maior saída.",
      actions: ["Criar rotas de recomendação por idioma e ticket", "Rever vinho a copo, espumantes e brancos de rotação", "Medir ticket de vinho por mesa e mix turístico/local"],
    },
    pasivo: {
      ...profileData.pasivo,
      label: "Perfil RIM passivo",
      summary: "A carta existe, mas ainda não trabalha como alavanca comercial. Falta ritmo de revisão e ligação aos dados.",
      priority: "Começar por quatro sinais: PVP, custo, stock e vendas por referência.",
      actions: ["Ligar a carta ao stock básico", "Rever as 20 referências de maior impacto", "Criar uma rotina mensal de compras e não reposição"],
    },
    superviviente: {
      ...profileData.superviviente,
      label: "Perfil RIM sobrevivência",
      summary: "A gestão do vinho está a absorver tempo e provavelmente esconde fugas de margem, stock e compras.",
      priority: "Recuperar controlo operacional antes de ampliar a carta: inventário, custos reais, PVP e distribuidores.",
      actions: ["Auditar guias de remessa e faturas", "Fechar um inventário inicial", "Eliminar referências duplicadas ou sem função clara"],
    },
  },
};

const pageCopy = {
  es: {
    eyebrow: "Demo · Perfil RIM",
    intro: "Responde seis preguntas y detecta si tu carta de vinos está funcionando como palanca comercial, como carta de identidad o como una fuente silenciosa de coste.",
    diagnosticTitle: "Diagnóstico rápido",
    diagnosticSubtitle: "Pensado para restaurantes, hoteles y wine bars.",
    result: "Resultado",
    priorityNow: "Prioridad ahora",
    rimMaturity: "Madurez RIM",
    operationalControl: "Control operativo",
    demoCta: "Ver cómo lo automatiza Winerim",
    cards: [
      { icon: Wine, title: "Carta", text: "Evalúa si la carta tiene una función comercial clara o solo acumula referencias." },
      { icon: BarChart3, title: "Datos", text: "Relaciona stock, TPV, coste, margen y equipo para encontrar el primer cuello de botella." },
      { icon: ClipboardList, title: "Ruta", text: "Convierte el perfil en una lista corta de acciones para empezar esta semana." },
    ],
    ctaEyebrow: "Diagnóstico completo",
    ctaTitle: "El test te da el perfil. Winerim te da las señales vivas.",
    ctaText: "Con Winerim puedes cruzar carta, ventas, stock, costes, distribuidores y equipo para saber qué comprar, qué no reponer y qué empujar en sala.",
    ctaPrimary: "Descargar plantilla Perfil RIM",
    ctaSecondary: "Ver Winerim Core",
    faqs: [
      { q: "¿Qué significa RIM en este contexto?", a: "Lo usamos como marco de madurez para entender cómo un restaurante gestiona carta, stock, ventas, margen, compras y equipo alrededor del vino." },
      { q: "¿El perfil es definitivo?", a: "No. Es un diagnóstico rápido. El perfil real cambia cuando se conectan datos de carta, stock, TPV, costes y distribuidores." },
      { q: "¿Para qué sirve saber el perfil?", a: "Sirve para priorizar. Un restaurante superviviente necesita control; uno coleccionista necesita limpieza de stock; uno gastronómico necesita proteger identidad sin perder margen." },
    ],
    relatedTitle: "Herramientas relacionadas",
    relatedLinks: [
      { to: "/herramientas/simulador-pareto-carta-vinos", label: "Simulador Pareto 80/20", type: "tool" },
      { to: "/herramientas/simulador-senal-margenes", label: "Simulador de señal de Márgenes", type: "tool" },
      { to: "/recursos/perfil-rim-restaurante", label: "Plantilla Perfil RIM", type: "resource" },
      { to: "/producto/inteligencia-dinamica", label: "Inteligencia dinámica", type: "solution" },
    ],
  },
  de: {
    eyebrow: "Demo · RIM-Profil",
    intro: "Beantworten Sie sechs Fragen und erkennen Sie, ob Ihre Weinkarte als kommerzieller Hebel, als Identitätskarte oder als stille Kostenquelle arbeitet.",
    diagnosticTitle: "Schnelldiagnose",
    diagnosticSubtitle: "Gedacht für Restaurants, Hotels und Wine Bars.",
    result: "Ergebnis",
    priorityNow: "Priorität jetzt",
    rimMaturity: "RIM-Reife",
    operationalControl: "Operative Kontrolle",
    demoCta: "Sehen, wie Winerim das automatisiert",
    cards: [
      { icon: Wine, title: "Weinkarte", text: "Bewerten Sie, ob die Karte eine klare kommerzielle Funktion hat oder nur Referenzen sammelt." },
      { icon: BarChart3, title: "Daten", text: "Verbinden Sie Bestand, Kassensystem, Kosten, Marge und Team, um den ersten Engpass zu finden." },
      { icon: ClipboardList, title: "Route", text: "Machen Sie aus dem Profil eine kurze Aktionsliste für diese Woche." },
    ],
    ctaEyebrow: "Vollständige Diagnose",
    ctaTitle: "Der Test liefert das Profil. Winerim liefert die Live-Signale.",
    ctaText: "Mit Winerim können Sie Karte, Verkäufe, Bestand, Kosten, Lieferanten und Team verbinden, um zu wissen, was Sie kaufen, was Sie nicht nachkaufen und was Sie im Service empfehlen sollten.",
    ctaPrimary: "RIM-Profilvorlage herunterladen",
    ctaSecondary: "Winerim Core ansehen",
    faqs: [
      { q: "Was bedeutet RIM in diesem Kontext?", a: "Wir nutzen es als Reiferahmen, um zu verstehen, wie ein Restaurant Weinkarte, Bestand, Verkäufe, Marge, Einkauf und Team rund um Wein steuert." },
      { q: "Ist das Profil endgültig?", a: "Nein. Es ist eine Schnelldiagnose. Das reale Profil verändert sich, sobald Daten aus Karte, Bestand, Kassensystem, Kosten und Lieferanten verbunden werden." },
      { q: "Wozu dient es, das Profil zu kennen?", a: "Es hilft bei der Priorisierung. Ein Restaurant im Überlebensmodus braucht Kontrolle; ein Sammlerprofil braucht Bestandsbereinigung; ein gastronomisches Profil muss Identität schützen, ohne Marge zu verlieren." },
    ],
    relatedTitle: "Verwandte Tools",
    relatedLinks: [
      { to: "/herramientas/simulador-pareto-carta-vinos", label: "Pareto-80/20-Simulator", type: "tool" },
      { to: "/herramientas/simulador-senal-margenes", label: "Margensignal-Simulator", type: "tool" },
      { to: "/recursos/perfil-rim-restaurante", label: "RIM-Profilvorlage", type: "resource" },
      { to: "/producto/inteligencia-dinamica", label: "Dynamische Intelligenz", type: "solution" },
    ],
  },
  pt: {
    eyebrow: "Demo · Perfil RIM",
    intro: "Responda a seis perguntas e detete se a sua carta de vinhos funciona como alavanca comercial, como carta de identidade ou como uma fonte silenciosa de custo.",
    diagnosticTitle: "Diagnóstico rápido",
    diagnosticSubtitle: "Pensado para restaurantes, hotéis e wine bars.",
    result: "Resultado",
    priorityNow: "Prioridade agora",
    rimMaturity: "Maturidade RIM",
    operationalControl: "Controlo operacional",
    demoCta: "Ver como a Winerim automatiza",
    cards: [
      { icon: Wine, title: "Carta", text: "Avalia se a carta tem uma função comercial clara ou se apenas acumula referências." },
      { icon: BarChart3, title: "Dados", text: "Relaciona stock, POS, custo, margem e equipa para encontrar o primeiro estrangulamento." },
      { icon: ClipboardList, title: "Rota", text: "Converte o perfil numa lista curta de ações para começar esta semana." },
    ],
    ctaEyebrow: "Diagnóstico completo",
    ctaTitle: "O teste dá-lhe o perfil. A Winerim dá-lhe os sinais vivos.",
    ctaText: "Com a Winerim pode cruzar carta, vendas, stock, custos, distribuidores e equipa para saber o que comprar, o que não repor e o que impulsionar na sala.",
    ctaPrimary: "Descarregar modelo Perfil RIM",
    ctaSecondary: "Ver Winerim Core",
    faqs: [
      { q: "O que significa RIM neste contexto?", a: "Usamo-lo como quadro de maturidade para entender como um restaurante gere carta, stock, vendas, margem, compras e equipa à volta do vinho." },
      { q: "O perfil é definitivo?", a: "Não. É um diagnóstico rápido. O perfil real muda quando se ligam dados de carta, stock, POS, custos e distribuidores." },
      { q: "Para que serve saber o perfil?", a: "Serve para priorizar. Um restaurante em sobrevivência precisa de controlo; um colecionador precisa de limpar stock; um gastronómico precisa de proteger identidade sem perder margem." },
    ],
    relatedTitle: "Ferramentas relacionadas",
    relatedLinks: [
      { to: "/herramientas/simulador-pareto-carta-vinos", label: "Simulador Pareto 80/20", type: "tool" },
      { to: "/herramientas/simulador-senal-margenes", label: "Simulador de sinal de Margens", type: "tool" },
      { to: "/recursos/perfil-rim-restaurante", label: "Modelo Perfil RIM", type: "resource" },
      { to: "/producto/inteligencia-dinamica", label: "Inteligência dinâmica", type: "solution" },
    ],
  },
};

const seoCopy = {
  es: {
    title: "Test Perfil RIM para restaurantes",
    description: "Descubre qué perfil RIM tiene tu restaurante: estratégico, gastronómico, coleccionista, turístico, pasivo o superviviente.",
    tools: "Herramientas",
    breadcrumb: "Test Perfil RIM",
  },
  en: {
    title: "RIM Profile Test for restaurants",
    description: "Discover your restaurant's RIM profile: strategic, gastronomic, collector, tourist, passive or survival.",
    tools: "Tools",
    breadcrumb: "RIM Profile Test",
  },
  it: {
    title: "Test Profilo RIM per ristoranti",
    description: "Scopri il profilo RIM del tuo ristorante: strategico, gastronomico, collezionista, turistico, passivo o sopravvivenza.",
    tools: "Strumenti",
    breadcrumb: "Test Profilo RIM",
  },
  fr: {
    title: "Test Profil RIM pour restaurants",
    description: "Découvrez le profil RIM de votre restaurant : stratégique, gastronomique, collection, touristique, passif ou survie.",
    tools: "Outils",
    breadcrumb: "Test Profil RIM",
  },
  de: {
    title: "RIM-Profiltest für Restaurants",
    description: "Ermitteln Sie das RIM-Profil Ihres Restaurants: strategisch, gastronomisch, sammlerisch, touristisch, passiv oder im Überlebensmodus.",
    tools: "Tools",
    breadcrumb: "RIM-Profiltest",
  },
  pt: {
    title: "Teste Perfil RIM para restaurantes",
    description: "Descubra o perfil RIM do seu restaurante: estratégico, gastronómico, colecionador, turístico, passivo ou de sobrevivência.",
    tools: "Ferramentas",
    breadcrumb: "Teste Perfil RIM",
  },
};

const TestPerfilRim = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const s = seoCopy[lang] || seoCopy.es;
  const copy = pageCopy[lang] || pageCopy.es;
  const localizedQuestions = questionsByLang[lang] || questions;
  const localizedProfileData = profileDataByLang[lang] || profileData;
  const canonicalUrl = `${CANONICAL_DOMAIN}${localePath("/herramientas/test-perfil-rim")}`;
  const [answers, setAnswers] = useState(initialAnswers);

  const result = useMemo(() => {
    const answerScore = (key: AnswerKey) => localizedQuestions.find((q) => q.key === key)?.options.find((o) => o.value === answers[key])?.score ?? 0;
    const operational = answerScore("stock") + answerScore("pos") + answerScore("margin") + answerScore("team");
    const listSize = answers.listSize;
    const goal = answers.goal;

    let profile: keyof typeof profileData = "pasivo";
    if (operational <= 2 || goal === "survive") profile = "superviviente";
    else if (goal === "identity" && operational >= 8) profile = "gourmet";
    else if (listSize === "large" && operational <= 8) profile = "coleccionista";
    else if (goal === "sell" && operational >= 9) profile = "estrategico";
    else if (listSize === "short" && goal === "sell") profile = "turistico";

    const maturity = Math.round(((operational + answerScore("listSize") + answerScore("goal")) / 18) * 100);
    return { profile, maturity: Math.min(100, Math.max(0, maturity)), operational };
  }, [answers, localizedQuestions]);

  const data = localizedProfileData[result.profile];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead
        title={s.title}
        description={s.description}
        url={canonicalUrl}
        hreflang={allLangPaths("/herramientas/test-perfil-rim")}
      />
      <main>
        <section className="pt-32 pb-12 section-padding">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <Breadcrumbs items={[{ label: s.tools, href: localePath("/herramientas") }, { label: s.breadcrumb }]} />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block">
              {copy.eyebrow}
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl md:text-6xl font-bold mb-6 max-w-4xl">
              {s.breadcrumb}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              {copy.intro}
            </motion.p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 md:px-12 pb-20 grid lg:grid-cols-[1.05fr_0.95fr] gap-8">
          <ScrollReveal>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center">
                  <Compass size={20} className="text-wine" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-semibold">{copy.diagnosticTitle}</h2>
                  <p className="text-sm text-muted-foreground">{copy.diagnosticSubtitle}</p>
                </div>
              </div>

              <div className="space-y-6">
                {localizedQuestions.map((question) => (
                  <div key={question.key}>
                    <h3 className="font-semibold mb-3">{question.title}</h3>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {question.options.map((option) => {
                        const selected = answers[question.key] === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => setAnswers((current) => ({ ...current, [question.key]: option.value }))}
                            className={`text-left rounded-lg border p-4 min-h-28 transition-all active:scale-[0.98] ${
                              selected ? "border-wine bg-wine/10" : "border-border bg-background/60 hover:border-wine/40"
                            }`}
                          >
                            <span className="block text-sm font-semibold">{option.label}</span>
                            <span className="block text-xs text-muted-foreground mt-2 leading-relaxed">{option.helper}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="rounded-xl border border-border bg-gradient-card p-6 sticky top-24">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">{copy.result}</p>
                  <h2 className="font-heading text-2xl font-semibold">{data.label}</h2>
                </div>
                <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${data.tone}`}>
                  <CheckCircle size={14} />
                  {result.maturity}/100
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">{data.summary}</p>

              <div className="rounded-lg border border-border bg-background/70 p-5 mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <Target size={18} className="text-wine" />
                  <h3 className="font-heading text-xl font-semibold">{copy.priorityNow}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{data.priority}</p>
              </div>

              <div className="space-y-3 mb-6">
                {data.actions.map((action) => (
                  <div key={action} className="flex gap-3 rounded-lg bg-background/70 p-3">
                    <CheckCircle size={16} className="text-wine mt-0.5 shrink-0" />
                    <p className="text-sm">{action}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="rounded-lg bg-wine/10 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{copy.rimMaturity}</p>
                  <p className="text-2xl font-semibold mt-1">{result.maturity}%</p>
                </div>
                <div className="rounded-lg bg-wine/10 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{copy.operationalControl}</p>
                  <p className="text-2xl font-semibold mt-1">{result.operational}/12</p>
                </div>
              </div>

              <Button
                asChild
                className="w-full bg-wine hover:bg-wine/90"
                onClick={() => trackAction("tool_use", "tool", "test-perfil-rim")}
              >
                <Link to={localePath("/demo")}>
                  {copy.demoCta}
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </section>

        <section className="max-w-6xl mx-auto px-6 md:px-12 pb-20">
          <div className="grid md:grid-cols-3 gap-5">
            {copy.cards.map((item) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.title}>
                  <div className="rounded-xl border border-border bg-card p-6 h-full">
                    <Icon size={22} className="text-wine mb-4" />
                    <h3 className="font-heading text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 md:px-12 pb-20">
          <div className="rounded-2xl border border-wine/20 bg-wine text-white p-8 md:p-10">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-white/70 mb-4">{copy.ctaEyebrow}</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">{copy.ctaTitle}</h2>
            <p className="text-white/80 leading-relaxed max-w-3xl mb-6">
              {copy.ctaText}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to={localePath("/recursos/perfil-rim-restaurante")}>{copy.ctaPrimary}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white/40 hover:bg-white/10">
                <Link to={localePath("/producto/winerim-core")}>{copy.ctaSecondary}</Link>
              </Button>
            </div>
          </div>
        </section>

        <FAQSection
          schemaId="test-perfil-rim"
          faqs={copy.faqs}
        />

        <InternalLinks
          title={copy.relatedTitle}
          links={copy.relatedLinks.map((link) => ({ ...link, to: localePath(link.to) }))}
        />
      </main>
      <Footer />
    </div>
  );
};

export default TestPerfilRim;
