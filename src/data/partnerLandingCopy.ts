import type { SupportedLang } from "@/i18n/types";

export type PartnerLandingCopy = {
  locale: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  termsNote: string;
  fitCta: string;
  talkCta: string;
  valueEyebrow: string;
  valueTitle: string;
  valueIntro: string;
  valueItems: { title: string; text: string }[];
  calculatorEyebrow: string;
  calculatorTitle: string;
  calculatorIntro: string;
  clientTitle: string;
  clientText: string;
  currentHours: string;
  scenarioHours: string;
  hourlyCost: string;
  currency: string;
  optional: string;
  annualNetHours: string;
  annualTimeValue: string;
  additionalTime: string;
  missingClient: string;
  timeValueNote: string;
  fullCalculator: string;
  portfolioTitle: string;
  portfolioText: string;
  activeAccounts: string;
  monthlyReach: string;
  qualificationRate: string;
  hoursPerConversation: string;
  availableHours: string;
  reached: string;
  qualified: string;
  hoursNeeded: string;
  capacityBalance: string;
  capacityEnough: string;
  capacityShort: string;
  missingPortfolio: string;
  portfolioNote: string;
  sourceTitle: string;
  sourceText: string;
  fitTitle: string;
  fitItems: string[];
  noFitTitle: string;
  noFitItems: string[];
  supportEyebrow: string;
  supportTitle: string;
  supportItems: { title: string; text: string }[];
  processTitle: string;
  processSteps: { title: string; text: string }[];
  prepareTitle: string;
  prepareItems: string[];
  finalTitle: string;
  finalText: string;
  finalCta: string;
  faqs: { q: string; a: string }[];
};

const es: PartnerLandingCopy = {
  locale: "es-ES",
  seoTitle: "Partners Winerim | Valora el encaje de tu cartera HORECA",
  seoDescription: "Calcula el valor operativo para tus clientes y la capacidad real de tu cartera antes de solicitar una conversación de partner con Winerim.",
  eyebrow: "Partners HORECA",
  title: "Añade valor a las visitas comerciales que ya haces",
  intro: "Si ya trabajas con restaurantes, hoteles o grupos, Winerim puede ser una línea complementaria: detectas un problema operativo real, lo cuantificas con el cliente y decides si merece una conversación conjunta.",
  termsNote: "Esta página no publica una comisión, exclusividad, cuota ni previsión de ingresos estándar. El modelo de colaboración y cualquier condición económica solo se definen por escrito después de validar el encaje.",
  fitCta: "Ver si encaja mi cartera",
  talkCta: "Solicitar conversación de partner",
  valueEyebrow: "Valor para el cliente",
  valueTitle: "Primero el problema del restaurante; después la colaboración",
  valueIntro: "La oportunidad nace cuando la gestión del vino consume tiempo, dispersa datos o dificulta decisiones. Cada beneficio debe medirse por separado.",
  valueItems: [
    { title: "Tiempo operativo", text: "Cuantifica tareas repetidas de TPV, documentos, inventario, conciliación, compras y distribuidores." },
    { title: "Datos para decidir", text: "Conecta carta, costes, ventas, stock y compras cuando las fuentes disponibles se han validado." },
    { title: "Próximo paso concreto", text: "Convierte el diagnóstico en una demo o revisión específica, no en una promesa genérica de ahorro o ventas." },
  ],
  calculatorEyebrow: "Dos cálculos conectados",
  calculatorTitle: "Comprueba el valor para el cliente y tu capacidad para acompañarlo",
  calculatorIntro: "Son escenarios locales y editables. No se envían datos, no predicen cierres y no calculan ingresos del partner.",
  clientTitle: "1. Valor operativo para un cliente",
  clientText: "Estimación breve para una primera conversación. Para el desglose por siete tareas, abre la calculadora completa.",
  currentHours: "Horas actuales por semana",
  scenarioHours: "Horas semanales en el escenario",
  hourlyCost: "Coste aproximado por hora",
  currency: "Moneda",
  optional: "opcional",
  annualNetHours: "Neto anual",
  annualTimeValue: "Valor anual del tiempo",
  additionalTime: "El escenario añade tiempo",
  missingClient: "Introduce las horas actuales y las del escenario para calcular.",
  timeValueNote: "El valor del tiempo es coste de oportunidad. No equivale a ahorro de caja, reducción de plantilla, ventas adicionales ni ROI garantizado.",
  fullCalculator: "Abrir cálculo completo por tareas",
  portfolioTitle: "2. Encaje y capacidad de mi cartera",
  portfolioText: "Mide conversaciones posibles y dedicación. Los porcentajes son tus supuestos, no tasas de conversión de Winerim.",
  activeAccounts: "Cuentas HORECA activas en tu red",
  monthlyReach: "% que contactarías al mes",
  qualificationRate: "% que estimas con problema y encaje",
  hoursPerConversation: "Horas por conversación cualificada",
  availableHours: "Horas disponibles al mes",
  reached: "Cuentas contactadas al mes",
  qualified: "Conversaciones cualificadas al mes",
  hoursNeeded: "Dedicación estimada al mes",
  capacityBalance: "Balance de capacidad",
  capacityEnough: "La dedicación cabe en tu disponibilidad declarada.",
  capacityShort: "La dedicación supera tu disponibilidad declarada.",
  missingPortfolio: "Completa los cinco supuestos para revisar la capacidad.",
  portfolioNote: "Una conversación cualificada no es una venta. El cálculo no aplica comisión, cierre, renovación ni ingreso previsto.",
  sourceTitle: "Qué es dato y qué no",
  sourceText: "Tus cifras son inputs. Las horas y conversaciones son cálculos aritméticos. Condiciones económicas, exclusividad, territorio, cierres e ingresos quedan fuera hasta que exista un acuerdo aprobado.",
  fitTitle: "Encaja si",
  fitItems: ["Ya tienes acceso profesional a cuentas HORECA.", "Puedes identificar un problema operativo concreto y escucharlo antes de vender.", "Dispones de tiempo real para formarte y acompañar conversaciones cualificadas.", "Aceptas que alcance, soporte y condiciones se confirmen por escrito."],
  noFitTitle: "No encaja si",
  noFitItems: ["Buscas ingresos automáticos sin trabajo comercial.", "Necesitas publicar comisiones o exclusividad antes de un acuerdo.", "No puedes explicar de dónde salen tus cifras.", "Esperas prometer implantación, soporte o resultados sin validar cada caso."],
  supportEyebrow: "Operación verificable",
  supportTitle: "Qué se prepara antes de activar una oportunidad",
  supportItems: [
    { title: "Formación y materiales", text: "Se concreta qué necesita el partner para explicar el producto con rigor y qué activos están disponibles." },
    { title: "Diagnóstico y demo", text: "Se define quién cualifica, quién participa en la demo y qué evidencia necesita el cliente." },
    { title: "Implantación y soporte", text: "Responsabilidades, tiempos y canales se confirman para el caso real; esta página no promete un SLA." },
  ],
  processTitle: "Proceso propuesto",
  processSteps: [
    { title: "Revisar encaje", text: "Experiencia, cartera, geografía, disponibilidad y tipo de cliente." },
    { title: "Acordar el marco", text: "Funciones, soporte, tratamiento de oportunidades y condiciones por escrito." },
    { title: "Preparar un primer caso", text: "Un cliente con confianza, un problema concreto y consentimiento para trabajar sus datos." },
    { title: "Medir y decidir", text: "Revisar actividad y aprendizaje antes de ampliar la colaboración." },
  ],
  prepareTitle: "Prepara para la conversación",
  prepareItems: ["Tu experiencia comercial relevante.", "Tamaño y tipo de cartera activa.", "Países o zonas en los que operas.", "Horas mensuales realmente disponibles.", "Un problema de cliente que puedas describir sin compartir datos privados."],
  finalTitle: "Una cartera valiosa merece un proceso serio",
  finalText: "Trae contexto real. Winerim revisará contigo si existe encaje y qué debe quedar acordado antes de activar una oportunidad.",
  finalCta: "Solicitar conversación de partner",
  faqs: [
    { q: "¿Hay una comisión pública estándar?", a: "No. Esta página no publica una comisión ni convierte ejemplos en una oferta. Cualquier condición económica debe acordarse y aprobarse por escrito." },
    { q: "¿La calculadora predice ventas?", a: "No. Solo calcula tiempo, valor del tiempo y capacidad para mantener conversaciones a partir de tus propios supuestos." },
    { q: "¿Hace falta exclusividad?", a: "No se afirma exclusividad ni ausencia de ella como condición general. El alcance territorial y comercial se define en el acuerdo aplicable." },
    { q: "¿Puedo usar datos de un cliente para un piloto?", a: "Solo con autorización del cliente y después de acordar alcance, responsabilidades y tratamiento de datos. Esta página no inicia ni autoriza un piloto." },
  ],
};

const en: PartnerLandingCopy = {
  locale: "en-US",
  seoTitle: "Winerim Partners | Assess your hospitality portfolio fit",
  seoDescription: "Calculate operational value for customers and the real capacity of your portfolio before requesting a Winerim partner conversation.",
  eyebrow: "Hospitality partners",
  title: "Add value to the sales visits you already make",
  intro: "If you already work with restaurants, hotels or groups, Winerim may become a complementary line: identify a real operational problem, quantify it with the customer and decide whether a joint conversation makes sense.",
  termsNote: "This page does not publish a standard commission, exclusivity, quota or income forecast. The collaboration model and any commercial terms are only defined in writing after fit has been assessed.",
  fitCta: "See whether my portfolio fits",
  talkCta: "Request a partner conversation",
  valueEyebrow: "Customer value",
  valueTitle: "Start with the restaurant's problem, then discuss the partnership",
  valueIntro: "The opportunity starts when wine operations consume time, scatter data or make decisions harder. Each benefit needs its own measure.",
  valueItems: [
    { title: "Operational time", text: "Quantify repeated POS, document, inventory, reconciliation, purchasing and distributor tasks." },
    { title: "Decision data", text: "Connect list, cost, sales, stock and purchasing data when the available sources have been validated." },
    { title: "A concrete next step", text: "Turn the diagnostic into a specific demo or review, not a generic promise of savings or sales." },
  ],
  calculatorEyebrow: "Two connected calculations",
  calculatorTitle: "Check customer value and your capacity to support the conversation",
  calculatorIntro: "These are editable local scenarios. No data is sent, no deal is forecast and no partner income is calculated.",
  clientTitle: "1. Operational value for a customer",
  clientText: "A short estimate for an initial conversation. Open the full calculator for the seven-task breakdown.",
  currentHours: "Current hours per week",
  scenarioHours: "Weekly hours in the scenario",
  hourlyCost: "Approximate hourly cost",
  currency: "Currency",
  optional: "optional",
  annualNetHours: "Annual net",
  annualTimeValue: "Annual time value",
  additionalTime: "The scenario adds time",
  missingClient: "Enter current and scenario hours to calculate.",
  timeValueNote: "Time value is an opportunity cost. It does not equal cash savings, headcount reduction, added sales or guaranteed ROI.",
  fullCalculator: "Open the full task calculator",
  portfolioTitle: "2. Portfolio fit and capacity",
  portfolioText: "Measure possible conversations and effort. Percentages are your assumptions, not Winerim conversion rates.",
  activeAccounts: "Active hospitality accounts in your network",
  monthlyReach: "% you would contact each month",
  qualificationRate: "% you estimate have a problem and fit",
  hoursPerConversation: "Hours per qualified conversation",
  availableHours: "Hours available per month",
  reached: "Accounts contacted per month",
  qualified: "Qualified conversations per month",
  hoursNeeded: "Estimated effort per month",
  capacityBalance: "Capacity balance",
  capacityEnough: "The effort fits your stated availability.",
  capacityShort: "The effort exceeds your stated availability.",
  missingPortfolio: "Complete all five assumptions to review capacity.",
  portfolioNote: "A qualified conversation is not a sale. The calculation applies no commission, close rate, renewal or forecast income.",
  sourceTitle: "What is data and what is not",
  sourceText: "Your figures are inputs. Hours and conversations are arithmetic results. Commercial terms, exclusivity, territory, closed deals and income remain outside the model until an approved agreement exists.",
  fitTitle: "A good fit when",
  fitItems: ["You already have professional access to hospitality accounts.", "You can identify and listen to a concrete operational problem before selling.", "You have real time to learn and support qualified conversations.", "You accept that scope, support and terms must be confirmed in writing."],
  noFitTitle: "Not a fit when",
  noFitItems: ["You want automatic income without commercial work.", "You need to publish commission or exclusivity before an agreement.", "You cannot explain where your figures come from.", "You expect to promise implementation, support or results without validating each case."],
  supportEyebrow: "Verifiable operation",
  supportTitle: "What is prepared before an opportunity is activated",
  supportItems: [
    { title: "Training and materials", text: "Define what the partner needs to explain the product accurately and which assets are available." },
    { title: "Diagnostic and demo", text: "Define who qualifies, who joins the demo and what evidence the customer needs." },
    { title: "Implementation and support", text: "Responsibilities, timing and channels are confirmed for the real case; this page does not promise an SLA." },
  ],
  processTitle: "Proposed process",
  processSteps: [
    { title: "Review fit", text: "Experience, portfolio, geography, availability and customer type." },
    { title: "Agree the framework", text: "Roles, support, opportunity handling and written terms." },
    { title: "Prepare a first case", text: "A trusted customer, a specific problem and consent to work with their data." },
    { title: "Measure and decide", text: "Review activity and learning before expanding the collaboration." },
  ],
  prepareTitle: "Prepare for the conversation",
  prepareItems: ["Your relevant commercial experience.", "Size and type of active portfolio.", "Countries or areas where you operate.", "Monthly hours genuinely available.", "One customer problem you can describe without sharing private data."],
  finalTitle: "A valuable portfolio deserves a serious process",
  finalText: "Bring real context. Winerim will assess fit with you and clarify what needs agreement before an opportunity is activated.",
  finalCta: "Request a partner conversation",
  faqs: [
    { q: "Is there a public standard commission?", a: "No. This page does not publish a commission or turn examples into an offer. Any commercial term must be agreed and approved in writing." },
    { q: "Does the calculator predict sales?", a: "No. It only calculates time, time value and conversation capacity from your own assumptions." },
    { q: "Is exclusivity required?", a: "Neither exclusivity nor its absence is stated as a general condition. Territorial and commercial scope is defined in the applicable agreement." },
    { q: "Can I use customer data for a pilot?", a: "Only with customer authorisation and after scope, responsibilities and data handling are agreed. This page does not start or authorise a pilot." },
  ],
};

const translate = (base: PartnerLandingCopy, overrides: Partial<PartnerLandingCopy>): PartnerLandingCopy => ({ ...base, ...overrides });

export const PARTNER_LANDING_COPY: Record<SupportedLang, PartnerLandingCopy> = {
  es,
  en,
  it: translate(en, {
    locale: "it-IT", seoTitle: "Partner Winerim | Valuta la tua rete hospitality", seoDescription: "Calcola il valore operativo per i clienti e la capacità reale della tua rete prima di richiedere un confronto partner con Winerim.",
    eyebrow: "Partner hospitality", title: "Aggiungi valore alle visite commerciali che fai già", intro: "Se lavori già con ristoranti, hotel o gruppi, Winerim può essere una linea complementare: individua un problema operativo reale, quantificalo con il cliente e valuta se ha senso un confronto congiunto.", termsNote: "Questa pagina non pubblica commissioni standard, esclusiva, quote o previsioni di reddito. Modello di collaborazione e condizioni commerciali vengono definiti per iscritto solo dopo aver verificato l'idoneità.", fitCta: "Verificare la mia rete", talkCta: "Richiedere un confronto partner",
    valueEyebrow: "Valore per il cliente", valueTitle: "Prima il problema del ristorante, poi la collaborazione", valueIntro: "L'opportunità nasce quando la gestione del vino consuma tempo, disperde dati o rende difficili le decisioni. Ogni beneficio va misurato separatamente.",
    valueItems: [{ title: "Tempo operativo", text: "Quantifica attività ripetute su POS, documenti, inventario, riconciliazione, acquisti e distributori." }, { title: "Dati per decidere", text: "Collega carta, costi, vendite, stock e acquisti quando le fonti disponibili sono validate." }, { title: "Passo successivo concreto", text: "Trasforma la diagnosi in una demo o revisione specifica, non in una promessa generica di risparmio o vendite." }],
    calculatorEyebrow: "Due calcoli collegati", calculatorTitle: "Verifica il valore per il cliente e la tua capacità di seguirlo", calculatorIntro: "Sono scenari locali e modificabili. Nessun dato viene inviato, nessuna vendita viene prevista e non si calcola il reddito del partner.", clientTitle: "1. Valore operativo per un cliente", clientText: "Stima breve per un primo confronto. Apri il calcolo completo per il dettaglio delle sette attività.", currentHours: "Ore attuali a settimana", scenarioHours: "Ore settimanali nello scenario", hourlyCost: "Costo orario approssimativo", currency: "Valuta", optional: "facoltativo", annualNetHours: "Netto annuo", annualTimeValue: "Valore annuo del tempo", additionalTime: "Lo scenario aggiunge tempo", missingClient: "Inserisci ore attuali e ore dello scenario.", timeValueNote: "Il valore del tempo è un costo opportunità. Non equivale a risparmio di cassa, riduzione del personale, vendite aggiuntive o ROI garantito.", fullCalculator: "Aprire il calcolo completo per attività",
    portfolioTitle: "2. Idoneità e capacità della mia rete", portfolioText: "Misura conversazioni possibili e impegno. Le percentuali sono tue ipotesi, non tassi di conversione Winerim.", activeAccounts: "Account hospitality attivi nella rete", monthlyReach: "% da contattare ogni mese", qualificationRate: "% stimata con problema e idoneità", hoursPerConversation: "Ore per conversazione qualificata", availableHours: "Ore disponibili al mese", reached: "Account contattati al mese", qualified: "Conversazioni qualificate al mese", hoursNeeded: "Impegno stimato al mese", capacityBalance: "Saldo di capacità", capacityEnough: "L'impegno rientra nella disponibilità dichiarata.", capacityShort: "L'impegno supera la disponibilità dichiarata.", missingPortfolio: "Completa le cinque ipotesi per verificare la capacità.", portfolioNote: "Una conversazione qualificata non è una vendita. Il calcolo non applica commissioni, chiusure, rinnovi o redditi previsti.",
    sourceTitle: "Cosa è dato e cosa non lo è", sourceText: "Le tue cifre sono input. Ore e conversazioni sono risultati aritmetici. Condizioni commerciali, esclusiva, territorio, vendite e reddito restano fuori fino a un accordo approvato.",
    fitTitle: "È adatto se", fitItems: ["Hai già accesso professionale a clienti hospitality.", "Sai individuare e ascoltare un problema operativo concreto prima di vendere.", "Hai tempo reale per formarti e seguire conversazioni qualificate.", "Accetti che ambito, supporto e condizioni siano confermati per iscritto."],
    noFitTitle: "Non è adatto se", noFitItems: ["Cerchi reddito automatico senza lavoro commerciale.", "Devi pubblicare commissioni o esclusiva prima di un accordo.", "Non sai spiegare da dove provengono i tuoi numeri.", "Vuoi promettere implementazione, supporto o risultati senza validare ogni caso."],
    supportEyebrow: "Operatività verificabile", supportTitle: "Cosa si prepara prima di attivare un'opportunità", supportItems: [{ title: "Formazione e materiali", text: "Si definisce cosa serve al partner per spiegare il prodotto con rigore e quali risorse sono disponibili." }, { title: "Diagnosi e demo", text: "Si definisce chi qualifica, chi partecipa alla demo e quali prove servono al cliente." }, { title: "Implementazione e supporto", text: "Responsabilità, tempi e canali vengono confermati sul caso reale; questa pagina non promette SLA." }],
    processTitle: "Processo proposto", processSteps: [{ title: "Verificare l'idoneità", text: "Esperienza, rete, area geografica, disponibilità e tipo di cliente." }, { title: "Concordare il quadro", text: "Ruoli, supporto, gestione delle opportunità e condizioni scritte." }, { title: "Preparare un primo caso", text: "Un cliente di fiducia, un problema concreto e consenso per lavorare con i suoi dati." }, { title: "Misurare e decidere", text: "Rivedere attività e apprendimento prima di ampliare la collaborazione." }],
    prepareTitle: "Prepara per il confronto", prepareItems: ["La tua esperienza commerciale rilevante.", "Dimensione e tipo della rete attiva.", "Paesi o aree in cui operi.", "Ore mensili realmente disponibili.", "Un problema cliente descrivibile senza condividere dati privati."],
    finalTitle: "Una rete preziosa merita un processo serio", finalText: "Porta un contesto reale. Winerim valuterà con te l'idoneità e ciò che va concordato prima di attivare un'opportunità.", finalCta: "Richiedere un confronto partner",
    faqs: [{ q: "Esiste una commissione standard pubblica?", a: "No. Questa pagina non pubblica commissioni né trasforma esempi in un'offerta. Ogni condizione economica va concordata e approvata per iscritto." }, { q: "Il calcolo prevede le vendite?", a: "No. Calcola solo tempo, valore del tempo e capacità di conversazione a partire dalle tue ipotesi." }, { q: "Serve l'esclusiva?", a: "Né l'esclusiva né la sua assenza sono indicate come condizione generale. Ambito territoriale e commerciale vengono definiti nell'accordo applicabile." }, { q: "Posso usare dati cliente per un pilota?", a: "Solo con autorizzazione del cliente e dopo aver concordato ambito, responsabilità e trattamento dei dati. Questa pagina non avvia né autorizza un pilota." }],
  }),
  fr: translate(en, {
    locale: "fr-FR", seoTitle: "Partenaires Winerim | Évaluez votre portefeuille CHR", seoDescription: "Calculez la valeur opérationnelle pour vos clients et la capacité réelle de votre portefeuille avant de demander un échange partenaire Winerim.", eyebrow: "Partenaires CHR", title: "Ajoutez de la valeur aux visites commerciales que vous réalisez déjà", intro: "Si vous travaillez déjà avec des restaurants, hôtels ou groupes, Winerim peut constituer une offre complémentaire : identifiez un problème opérationnel réel, quantifiez-le avec le client et décidez si un échange commun est pertinent.", termsNote: "Cette page ne publie ni commission standard, ni exclusivité, ni quota, ni prévision de revenus. Le modèle de collaboration et les conditions commerciales sont définis par écrit uniquement après validation de l'adéquation.", fitCta: "Vérifier mon portefeuille", talkCta: "Demander un échange partenaire",
    valueEyebrow: "Valeur client", valueTitle: "D'abord le problème du restaurant, ensuite le partenariat", valueIntro: "L'opportunité apparaît lorsque la gestion du vin consomme du temps, disperse les données ou complique les décisions. Chaque bénéfice doit être mesuré séparément.", valueItems: [{ title: "Temps opérationnel", text: "Quantifiez les tâches répétées liées au POS, aux documents, à l'inventaire, au rapprochement, aux achats et aux distributeurs." }, { title: "Données de décision", text: "Reliez carte, coûts, ventes, stock et achats lorsque les sources disponibles ont été validées." }, { title: "Étape suivante concrète", text: "Transformez le diagnostic en démo ou revue précise, pas en promesse générale d'économies ou de ventes." }],
    calculatorEyebrow: "Deux calculs reliés", calculatorTitle: "Vérifiez la valeur client et votre capacité à l'accompagner", calculatorIntro: "Ces scénarios sont locaux et modifiables. Aucune donnée n'est envoyée, aucune vente n'est prévue et aucun revenu partenaire n'est calculé.", clientTitle: "1. Valeur opérationnelle pour un client", clientText: "Estimation courte pour un premier échange. Ouvrez le calcul complet pour le détail des sept tâches.", currentHours: "Heures actuelles par semaine", scenarioHours: "Heures hebdomadaires du scénario", hourlyCost: "Coût horaire approximatif", currency: "Devise", optional: "facultatif", annualNetHours: "Solde annuel", annualTimeValue: "Valeur annuelle du temps", additionalTime: "Le scénario ajoute du temps", missingClient: "Saisissez les heures actuelles et celles du scénario.", timeValueNote: "La valeur du temps est un coût d'opportunité. Elle ne correspond pas à une économie de trésorerie, une réduction d'effectif, des ventes supplémentaires ou un ROI garanti.", fullCalculator: "Ouvrir le calcul complet par tâche",
    portfolioTitle: "2. Adéquation et capacité de mon portefeuille", portfolioText: "Mesurez les échanges possibles et l'effort. Les pourcentages sont vos hypothèses, pas des taux de conversion Winerim.", activeAccounts: "Comptes CHR actifs dans votre réseau", monthlyReach: "% contacté chaque mois", qualificationRate: "% estimé avec problème et adéquation", hoursPerConversation: "Heures par échange qualifié", availableHours: "Heures disponibles par mois", reached: "Comptes contactés par mois", qualified: "Échanges qualifiés par mois", hoursNeeded: "Effort estimé par mois", capacityBalance: "Solde de capacité", capacityEnough: "L'effort tient dans votre disponibilité déclarée.", capacityShort: "L'effort dépasse votre disponibilité déclarée.", missingPortfolio: "Complétez les cinq hypothèses pour vérifier la capacité.", portfolioNote: "Un échange qualifié n'est pas une vente. Le calcul n'applique ni commission, ni clôture, ni renouvellement, ni revenu prévu.", sourceTitle: "Ce qui est une donnée et ce qui ne l'est pas", sourceText: "Vos chiffres sont des entrées. Les heures et échanges sont des résultats arithmétiques. Conditions commerciales, exclusivité, territoire, ventes et revenus restent hors du modèle jusqu'à un accord approuvé.",
    fitTitle: "Adapté si", fitItems: ["Vous avez déjà un accès professionnel à des comptes CHR.", "Vous savez identifier et écouter un problème opérationnel concret avant de vendre.", "Vous disposez d'un temps réel pour vous former et accompagner des échanges qualifiés.", "Vous acceptez que périmètre, support et conditions soient confirmés par écrit."],
    noFitTitle: "Non adapté si", noFitItems: ["Vous cherchez un revenu automatique sans travail commercial.", "Vous devez publier une commission ou une exclusivité avant tout accord.", "Vous ne pouvez pas expliquer l'origine de vos chiffres.", "Vous comptez promettre mise en œuvre, support ou résultats sans valider chaque cas."],
    supportEyebrow: "Opération vérifiable", supportTitle: "Ce qui est préparé avant d'activer une opportunité", supportItems: [{ title: "Formation et supports", text: "Définir ce dont le partenaire a besoin pour expliquer le produit avec précision et quels supports sont disponibles." }, { title: "Diagnostic et démo", text: "Définir qui qualifie, qui participe à la démo et quelles preuves sont nécessaires au client." }, { title: "Mise en œuvre et support", text: "Responsabilités, délais et canaux sont confirmés pour le cas réel ; cette page ne promet pas de SLA." }],
    processTitle: "Processus proposé", processSteps: [{ title: "Vérifier l'adéquation", text: "Expérience, portefeuille, zone géographique, disponibilité et type de client." }, { title: "Convenir du cadre", text: "Rôles, support, traitement des opportunités et conditions écrites." }, { title: "Préparer un premier cas", text: "Un client de confiance, un problème précis et son consentement pour travailler avec ses données." }, { title: "Mesurer et décider", text: "Examiner l'activité et les apprentissages avant d'élargir la collaboration." }],
    prepareTitle: "Préparez l'échange", prepareItems: ["Votre expérience commerciale pertinente.", "La taille et le type de portefeuille actif.", "Les pays ou zones où vous opérez.", "Les heures réellement disponibles chaque mois.", "Un problème client descriptible sans partager de données privées."],
    finalTitle: "Un portefeuille précieux mérite un processus sérieux", finalText: "Apportez un contexte réel. Winerim évaluera avec vous l'adéquation et ce qui doit être convenu avant d'activer une opportunité.", finalCta: "Demander un échange partenaire",
    faqs: [{ q: "Existe-t-il une commission publique standard ?", a: "Non. Cette page ne publie aucune commission et ne transforme pas des exemples en offre. Toute condition économique doit être convenue et approuvée par écrit." }, { q: "Le calcul prédit-il des ventes ?", a: "Non. Il calcule uniquement le temps, la valeur du temps et la capacité d'échange à partir de vos hypothèses." }, { q: "L'exclusivité est-elle obligatoire ?", a: "Ni l'exclusivité ni son absence ne sont présentées comme condition générale. Le périmètre territorial et commercial est défini dans l'accord applicable." }, { q: "Puis-je utiliser les données d'un client pour un pilote ?", a: "Uniquement avec son autorisation et après accord sur le périmètre, les responsabilités et le traitement des données. Cette page ne lance ni n'autorise un pilote." }],
  }),
  de: translate(en, {
    locale: "de-DE", seoTitle: "Winerim Partner | Eignung Ihres Hospitality-Portfolios prüfen", seoDescription: "Berechnen Sie den operativen Wert für Kunden und die reale Kapazität Ihres Portfolios, bevor Sie ein Partnergespräch mit Winerim anfragen.", eyebrow: "Hospitality-Partner", title: "Schaffen Sie Mehrwert in den Kundenterminen, die Sie bereits führen", intro: "Wenn Sie bereits mit Restaurants, Hotels oder Gruppen arbeiten, kann Winerim eine ergänzende Linie sein: ein reales operatives Problem erkennen, gemeinsam mit dem Kunden beziffern und entscheiden, ob ein gemeinsames Gespräch sinnvoll ist.", termsNote: "Diese Seite veröffentlicht keine Standardprovision, Exklusivität, Quote oder Einkommensprognose. Das Kooperationsmodell und alle wirtschaftlichen Bedingungen werden erst nach der Eignungsprüfung schriftlich festgelegt.", fitCta: "Eignung meines Portfolios prüfen", talkCta: "Partnergespräch anfragen",
    valueEyebrow: "Kundennutzen", valueTitle: "Zuerst das Problem des Restaurants, dann die Partnerschaft", valueIntro: "Die Chance entsteht, wenn Weinprozesse Zeit verbrauchen, Daten verteilen oder Entscheidungen erschweren. Jeder Nutzen muss separat gemessen werden.", valueItems: [{ title: "Operative Zeit", text: "Wiederkehrende Aufgaben in POS, Dokumenten, Inventur, Abstimmung, Einkauf und Lieferantenkontakt beziffern." }, { title: "Entscheidungsdaten", text: "Karte, Kosten, Verkauf, Bestand und Einkauf verbinden, sobald verfügbare Quellen validiert sind." }, { title: "Konkreter nächster Schritt", text: "Die Diagnose in eine konkrete Demo oder Prüfung überführen, nicht in ein allgemeines Spar- oder Verkaufsversprechen." }],
    calculatorEyebrow: "Zwei verbundene Berechnungen", calculatorTitle: "Prüfen Sie Kundennutzen und Ihre Betreuungskapazität", calculatorIntro: "Dies sind lokale, bearbeitbare Szenarien. Es werden keine Daten gesendet, keine Abschlüsse prognostiziert und keine Partnereinnahmen berechnet.", clientTitle: "1. Operativer Wert für einen Kunden", clientText: "Kurze Schätzung für ein Erstgespräch. Die vollständige Berechnung zeigt sieben Aufgaben im Detail.", currentHours: "Aktuelle Stunden pro Woche", scenarioHours: "Wochenstunden im Szenario", hourlyCost: "Ungefährer Stundenkostensatz", currency: "Währung", optional: "optional", annualNetHours: "Jährlicher Saldo", annualTimeValue: "Jährlicher Zeitwert", additionalTime: "Das Szenario benötigt mehr Zeit", missingClient: "Aktuelle und Szenario-Stunden eingeben.", timeValueNote: "Der Zeitwert ist ein Opportunitätskostenwert. Er entspricht weder sicherem Cash-Ersparnis, Personalabbau, Mehrumsatz noch garantiertem ROI.", fullCalculator: "Vollständige Aufgabenberechnung öffnen",
    portfolioTitle: "2. Portfolio-Eignung und Kapazität", portfolioText: "Mögliche Gespräche und Aufwand messen. Die Prozentsätze sind Ihre Annahmen, keine Winerim-Konversionsraten.", activeAccounts: "Aktive Hospitality-Konten im Netzwerk", monthlyReach: "% pro Monat anzusprechen", qualificationRate: "% mit geschätztem Problem und Eignung", hoursPerConversation: "Stunden je qualifiziertem Gespräch", availableHours: "Verfügbare Stunden pro Monat", reached: "Kontaktierte Konten pro Monat", qualified: "Qualifizierte Gespräche pro Monat", hoursNeeded: "Geschätzter Aufwand pro Monat", capacityBalance: "Kapazitätssaldo", capacityEnough: "Der Aufwand passt in Ihre angegebene Verfügbarkeit.", capacityShort: "Der Aufwand übersteigt Ihre angegebene Verfügbarkeit.", missingPortfolio: "Alle fünf Annahmen ausfüllen, um die Kapazität zu prüfen.", portfolioNote: "Ein qualifiziertes Gespräch ist kein Verkauf. Die Berechnung verwendet keine Provision, Abschlussquote, Verlängerung oder Einkommensprognose.", sourceTitle: "Was Daten sind und was nicht", sourceText: "Ihre Zahlen sind Eingaben. Stunden und Gespräche sind arithmetische Ergebnisse. Wirtschaftsbedingungen, Exklusivität, Gebiet, Abschlüsse und Einkommen bleiben bis zu einer genehmigten Vereinbarung außen vor.",
    fitTitle: "Passt, wenn", fitItems: ["Sie bereits professionellen Zugang zu Hospitality-Konten haben.", "Sie vor dem Verkauf ein konkretes operatives Problem erkennen und anhören können.", "Sie tatsächlich Zeit für Schulung und qualifizierte Gespräche haben.", "Sie akzeptieren, dass Umfang, Support und Bedingungen schriftlich bestätigt werden."],
    noFitTitle: "Passt nicht, wenn", noFitItems: ["Sie automatisches Einkommen ohne Vertriebsarbeit erwarten.", "Sie Provision oder Exklusivität vor einer Vereinbarung veröffentlichen müssen.", "Sie die Herkunft Ihrer Zahlen nicht erklären können.", "Sie Implementierung, Support oder Ergebnisse ohne Einzelfallprüfung versprechen wollen."],
    supportEyebrow: "Überprüfbare Abläufe", supportTitle: "Was vor Aktivierung einer Chance vorbereitet wird", supportItems: [{ title: "Schulung und Materialien", text: "Festlegen, was der Partner für eine sachliche Produkterklärung braucht und welche Unterlagen verfügbar sind." }, { title: "Diagnose und Demo", text: "Festlegen, wer qualifiziert, wer an der Demo teilnimmt und welche Nachweise der Kunde benötigt." }, { title: "Implementierung und Support", text: "Verantwortung, Zeitrahmen und Kanäle werden für den realen Fall bestätigt; diese Seite verspricht kein SLA." }],
    processTitle: "Vorgeschlagener Prozess", processSteps: [{ title: "Eignung prüfen", text: "Erfahrung, Portfolio, Region, Verfügbarkeit und Kundentyp." }, { title: "Rahmen vereinbaren", text: "Rollen, Support, Umgang mit Chancen und schriftliche Bedingungen." }, { title: "Ersten Fall vorbereiten", text: "Ein vertrauter Kunde, ein konkretes Problem und Zustimmung zur Arbeit mit seinen Daten." }, { title: "Messen und entscheiden", text: "Aktivität und Lernfortschritt prüfen, bevor die Zusammenarbeit erweitert wird." }],
    prepareTitle: "Für das Gespräch vorbereiten", prepareItems: ["Ihre relevante Vertriebserfahrung.", "Größe und Art des aktiven Portfolios.", "Länder oder Regionen, in denen Sie arbeiten.", "Tatsächlich verfügbare Stunden pro Monat.", "Ein Kundenproblem, das ohne private Daten beschrieben werden kann."],
    finalTitle: "Ein wertvolles Portfolio verdient einen seriösen Prozess", finalText: "Bringen Sie realen Kontext mit. Winerim prüft mit Ihnen die Eignung und klärt, was vor Aktivierung einer Chance vereinbart werden muss.", finalCta: "Partnergespräch anfragen",
    faqs: [{ q: "Gibt es eine öffentliche Standardprovision?", a: "Nein. Diese Seite veröffentlicht keine Provision und macht aus Beispielen kein Angebot. Wirtschaftliche Bedingungen müssen schriftlich vereinbart und genehmigt werden." }, { q: "Prognostiziert die Berechnung Verkäufe?", a: "Nein. Sie berechnet nur Zeit, Zeitwert und Gesprächskapazität aus Ihren eigenen Annahmen." }, { q: "Ist Exklusivität erforderlich?", a: "Weder Exklusivität noch ihr Fehlen wird als allgemeine Bedingung behauptet. Gebiet und kommerzieller Umfang werden in der jeweiligen Vereinbarung festgelegt." }, { q: "Kann ich Kundendaten für einen Pilot verwenden?", a: "Nur mit Zustimmung des Kunden und nachdem Umfang, Verantwortung und Datenverarbeitung vereinbart wurden. Diese Seite startet oder genehmigt keinen Pilot." }],
  }),
  pt: translate(en, {
    locale: "pt-PT", seoTitle: "Parceiros Winerim | Avalie a sua carteira HORECA", seoDescription: "Calcule o valor operacional para clientes e a capacidade real da sua carteira antes de solicitar uma conversa de parceiro Winerim.", eyebrow: "Parceiros HORECA", title: "Acrescente valor às visitas comerciais que já realiza", intro: "Se já trabalha com restaurantes, hotéis ou grupos, a Winerim pode ser uma linha complementar: identifica um problema operacional real, quantifica-o com o cliente e decide se faz sentido uma conversa conjunta.", termsNote: "Esta página não publica comissão padrão, exclusividade, quota ou previsão de rendimento. O modelo de colaboração e quaisquer condições comerciais só são definidos por escrito após validar o encaixe.", fitCta: "Ver se a minha carteira encaixa", talkCta: "Solicitar conversa de parceiro",
    valueEyebrow: "Valor para o cliente", valueTitle: "Primeiro o problema do restaurante; depois a parceria", valueIntro: "A oportunidade surge quando a gestão do vinho consome tempo, dispersa dados ou dificulta decisões. Cada benefício deve ser medido em separado.", valueItems: [{ title: "Tempo operacional", text: "Quantifique tarefas repetidas de POS, documentos, inventário, reconciliação, compras e distribuidores." }, { title: "Dados para decidir", text: "Ligue carta, custos, vendas, stock e compras quando as fontes disponíveis estiverem validadas." }, { title: "Próximo passo concreto", text: "Transforme o diagnóstico numa demo ou revisão específica, não numa promessa genérica de poupança ou vendas." }],
    calculatorEyebrow: "Dois cálculos ligados", calculatorTitle: "Verifique o valor para o cliente e a sua capacidade para o acompanhar", calculatorIntro: "São cenários locais e editáveis. Não são enviados dados, não se preveem vendas nem se calcula rendimento do parceiro.", clientTitle: "1. Valor operacional para um cliente", clientText: "Estimativa breve para uma primeira conversa. Abra o cálculo completo para o detalhe das sete tarefas.", currentHours: "Horas atuais por semana", scenarioHours: "Horas semanais no cenário", hourlyCost: "Custo aproximado por hora", currency: "Moeda", optional: "opcional", annualNetHours: "Líquido anual", annualTimeValue: "Valor anual do tempo", additionalTime: "O cenário acrescenta tempo", missingClient: "Introduza as horas atuais e as do cenário.", timeValueNote: "O valor do tempo é custo de oportunidade. Não equivale a poupança de caixa, redução de equipa, vendas adicionais ou ROI garantido.", fullCalculator: "Abrir cálculo completo por tarefas",
    portfolioTitle: "2. Encaixe e capacidade da minha carteira", portfolioText: "Meça conversas possíveis e dedicação. As percentagens são as suas hipóteses, não taxas de conversão da Winerim.", activeAccounts: "Contas HORECA ativas na sua rede", monthlyReach: "% a contactar por mês", qualificationRate: "% estimada com problema e encaixe", hoursPerConversation: "Horas por conversa qualificada", availableHours: "Horas disponíveis por mês", reached: "Contas contactadas por mês", qualified: "Conversas qualificadas por mês", hoursNeeded: "Dedicação estimada por mês", capacityBalance: "Saldo de capacidade", capacityEnough: "A dedicação cabe na disponibilidade indicada.", capacityShort: "A dedicação supera a disponibilidade indicada.", missingPortfolio: "Complete as cinco hipóteses para rever a capacidade.", portfolioNote: "Uma conversa qualificada não é uma venda. O cálculo não aplica comissão, fecho, renovação nem rendimento previsto.", sourceTitle: "O que é dado e o que não é", sourceText: "Os seus números são inputs. Horas e conversas são resultados aritméticos. Condições comerciais, exclusividade, território, fechos e rendimento ficam fora até existir um acordo aprovado.",
    fitTitle: "Encaixa se", fitItems: ["Já tem acesso profissional a contas HORECA.", "Consegue identificar e ouvir um problema operacional concreto antes de vender.", "Dispõe de tempo real para formação e conversas qualificadas.", "Aceita que âmbito, suporte e condições sejam confirmados por escrito."],
    noFitTitle: "Não encaixa se", noFitItems: ["Procura rendimento automático sem trabalho comercial.", "Precisa de publicar comissão ou exclusividade antes de um acordo.", "Não consegue explicar a origem dos seus números.", "Espera prometer implementação, suporte ou resultados sem validar cada caso."],
    supportEyebrow: "Operação verificável", supportTitle: "O que se prepara antes de ativar uma oportunidade", supportItems: [{ title: "Formação e materiais", text: "Define-se o que o parceiro precisa para explicar o produto com rigor e que recursos estão disponíveis." }, { title: "Diagnóstico e demo", text: "Define-se quem qualifica, quem participa na demo e que evidência o cliente necessita." }, { title: "Implementação e suporte", text: "Responsabilidades, prazos e canais são confirmados para o caso real; esta página não promete um SLA." }],
    processTitle: "Processo proposto", processSteps: [{ title: "Rever o encaixe", text: "Experiência, carteira, geografia, disponibilidade e tipo de cliente." }, { title: "Acordar o enquadramento", text: "Funções, suporte, tratamento de oportunidades e condições por escrito." }, { title: "Preparar um primeiro caso", text: "Um cliente de confiança, um problema concreto e consentimento para trabalhar com os seus dados." }, { title: "Medir e decidir", text: "Rever atividade e aprendizagem antes de ampliar a colaboração." }],
    prepareTitle: "Prepare para a conversa", prepareItems: ["A sua experiência comercial relevante.", "Tamanho e tipo da carteira ativa.", "Países ou zonas onde opera.", "Horas mensais realmente disponíveis.", "Um problema de cliente que possa descrever sem partilhar dados privados."],
    finalTitle: "Uma carteira valiosa merece um processo sério", finalText: "Traga contexto real. A Winerim analisará consigo o encaixe e o que deve ficar acordado antes de ativar uma oportunidade.", finalCta: "Solicitar conversa de parceiro",
    faqs: [{ q: "Existe uma comissão pública padrão?", a: "Não. Esta página não publica uma comissão nem transforma exemplos numa oferta. Qualquer condição económica deve ser acordada e aprovada por escrito." }, { q: "A calculadora prevê vendas?", a: "Não. Calcula apenas tempo, valor do tempo e capacidade de conversa a partir das suas próprias hipóteses." }, { q: "É necessária exclusividade?", a: "Nem a exclusividade nem a sua ausência são apresentadas como condição geral. O âmbito territorial e comercial é definido no acordo aplicável." }, { q: "Posso usar dados de um cliente num piloto?", a: "Apenas com autorização do cliente e depois de acordar âmbito, responsabilidades e tratamento de dados. Esta página não inicia nem autoriza um piloto." }],
  }),
};
