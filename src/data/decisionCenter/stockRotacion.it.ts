import { Package } from "lucide-react";
import type { DeepAreaContent } from "./margenesPricing";

const stockRotacionIT: DeepAreaContent = {
  name: "Stock e rotazione",
  tagline: "Individua ciò che non si muove prima che sia troppo tardi",
  intro: "Questa sezione ti aiuta a identificare i vini fermi, quantificare il capitale immobilizzato e prendere decisioni concrete: spingere, spostare al calice, ritirare o liquidare. Non si tratta di teoria dell'inventario. Si tratta di fare in modo che ogni bottiglia in cantina abbia un piano.",
  icon: Package,
  accent: "text-emerald-500",
  bg: "bg-emerald-500/10",
  audiences: ["sala", "compras-fb", "direccion"],
  topErrors: [
    { error: "Mantenere referenze lente 'perché prima o poi si venderanno'", porQueOcurre: "Perché ritirare un vino sembra ammettere un errore d'acquisto. È più comodo aspettare.", consecuencia: "Il capitale resta immobilizzato, il vino perde valore nel tempo e occupa uno spazio in carta che potrebbe generare vendite reali." },
    { error: "Non quantificare il costo reale dello stock fermo", porQueOcurre: "Perché lo stock morto non appare come spesa nel conto economico. Lo vedi solo quando lo scarti.", consecuencia: "Non percepisci l'urgenza. 20 bottiglie a 12 € di costo sono 240 € che potrebbero essere investiti in referenze che ruotano davvero." },
    { error: "Spingere una referenza senza misurare il risultato", porQueOcurre: "Perché si dice al team 'raccomandate quello' ma nessuno fa follow-up. Senza misurazione, non c'è apprendimento.", consecuencia: "Non sai se l'azione ha funzionato. Ripeti il ciclo: spingi senza misurare, aspetti senza dati, ritiri troppo tardi." },
    { error: "Riordinare automaticamente tutto ciò che finisce", porQueOcurre: "Perché il riordino è in pilota automatico. Si ordina lo stesso ogni settimana senza verificare se la domanda è cambiata.", consecuencia: "Finanzi stock che resterà fermo. L'ordine dovrebbe basarsi sulla rotazione reale, non sulla lista del mese scorso." },
    { error: "Confondere 'vino costoso' con 'stock morto'", porQueOcurre: "Perché un vino da 60 € che impiega tempo a vendersi sembra stock morto, ma può avere un ruolo d'immagine o di scontrino alto.", consecuencia: "Ritiri vini strategici che svolgono una funzione e li sostituisci con altro della stessa fascia media che hai già saturato." },
  ],
  links: [
    { label: "Calcolatore stock morto", href: "/herramientas/calculadora-stock-muerto", description: "Quantifica il capitale immobilizzato in referenze senza vendite", type: "tool" },
    { label: "Checklist: Rilevamento vini morti", href: "/recursos/checklist-deteccion-vinos-muertos", description: "Processo passo passo per identificare e agire sullo stock fermo", type: "resource" },
    { label: "Scorecard mensile", href: "/recursos/scorecard-mensual", description: "Monitora la salute del tuo stock ogni mese con metriche chiave", type: "resource" },
    { label: "Winerim Core", href: "/producto/winerim-core", description: "Il motore analitico che rileva la bassa rotazione automaticamente", type: "product" },
    { label: "Winerim Supply", href: "/producto/winerim-supply", description: "Collega rotazione con decisioni di acquisto e rifornimento", type: "product" },
    { label: "Blog: Come rilevare lo stock morto", href: "/article/como-detectar-stock-muerto-carta-vinos", description: "Segnali d'allarme e processo per identificare vini senza rotazione", type: "article" },
    { label: "Blog: Quali vini vale la pena riordinare", href: "/article/que-vinos-merece-la-pena-reponer", description: "Criteri per decidere cosa entra e cosa esce dal prossimo ordine", type: "article" },
  ],
  miniCases: [
    {
      profile: "Ristorante d'hotel con 90 referenze",
      situation: "22 referenze non avevano registrato una sola vendita in oltre 90 giorni. Capitale immobilizzato: 3.400 €.",
      action: "Ha ritirato 15 referenze dalla carta. Ne ha messe 5 al calice con pricing aggressivo. Le 2 restanti sono state restituite al fornitore.",
      result: "Ha liberato 2.800 € di capitale reinvestiti in 8 nuove referenze con domanda validata. Lo stock morto è sceso dal 24% al 6%.",
    },
    {
      profile: "Bistrot urbano con 28 referenze",
      situation: "Guardava solo le vendite settimanali. Non si è accorto che 6 vini erano fermi da 45 giorni perché 'qualcuno si è venduto di recente'.",
      action: "Ha configurato un avviso automatico in Winerim a 30 giorni senza vendita. Ogni lunedì rivede la lista e decide: spinta, calice o ritiro.",
      result: "In 3 mesi è passato da 6 vini morti a 1. La rotazione media della carta è migliorata del 18%.",
    },
  ],
  subtopics: [
    {
      id: "stock-muerto",
      title: "Cosa si considera stock morto",
      priority: "inmediato",
      porQueTeLoMostramos: {
        detected: "Winerim ha identificato referenze nella tua carta con 0 vendite in oltre 60 giorni.",
        whyMatters: "Tra il 10% e il 25% della carta di un ristorante medio è stock morto senza saperlo. È capitale che non lavora.",
        riskIfIgnored: "Ogni mese che passa, quel denaro resta fermo. Non migliora col tempo: si accumula soltanto.",
      },
      queSignifica:
        "Stock morto è qualsiasi referenza che non registra vendite da oltre 60 giorni e non ha una giustificazione strategica chiara (riserva speciale, vino conservato per un evento, ecc.). Non è la stessa cosa di stock lento: un vino che vende 2 bottiglie al mese è lento ma vivo. Uno che non si muove da 3 mesi è morto. La distinzione è importante perché l'azione da intraprendere è diversa.",
      porQueImporta:
        "Perché ogni bottiglia ferma è denaro che non lavora. Un ristorante medio ha tra il 10% e il 25% della carta in stock morto senza saperlo. Se hai 20 referenze morte a un costo medio di 8 €, con 3 bottiglie in media, sono 480 € immobilizzati che potrebbero generare margine in referenze che ruotano davvero.",
      queHacer: [
        "Filtra tutte le referenze con 0 vendite negli ultimi 60 giorni.",
        "Separa quelle con giustificazione strategica (evento, riserva cliente) da quelle semplicemente dimenticate.",
        "Per le dimenticate, decidi ora: spinta in sala, calice, sconto o ritiro?",
        "Stabilisci una regola: qualsiasi referenza senza vendita in 60 giorni entra automaticamente in revisione.",
      ],
      errores: [
        { mistake: "Pensare che 'stock morto' significhi solo vini vecchi o deteriorati", consequence: "Lo stock morto più costoso è solitamente vino perfettamente bevibile che nessuno ordina." },
        { mistake: "Non distinguere tra stock morto e stock strategico", consequence: "Ritiri vini che dovresti mantenere o mantieni quelli che dovrebbero uscire." },
        { mistake: "Aspettare che il problema si risolva da solo", consequence: "Il vino non migliora col tempo nella cantina di un ristorante. Il capitale resta fermo." },
      ],
    },
    {
      id: "capital-inmovilizado",
      title: "Come rilevare il capitale immobilizzato",
      priority: "inmediato",
      porQueTeLoMostramos: {
        detected: "Winerim ha calcolato il valore totale delle bottiglie senza vendita nella tua cantina.",
        whyMatters: "È denaro reale investito che non genera ritorno. Invisibile nel conto economico, ma molto reale nella tua tesoreria.",
        riskIfIgnored: "Senza azione, il capitale immobilizzato cresce ogni mese con ogni nuovo ordine non adeguato alla domanda.",
      },
      queSignifica:
        "Il capitale immobilizzato è il valore totale d'acquisto di tutte le bottiglie che hai in cantina e che non si vendono. Non è un numero astratto: sono euro reali che hai investito e che non generano ritorno. Per calcolarlo, moltiplica il costo d'acquisto di ogni referenza senza vendite per il numero di bottiglie in stock.",
      porQueImporta:
        "Perché è denaro invisibile. Non appare come spesa nel conto economico, ma non genera nemmeno ricavi. È il modo più silenzioso di perdere redditività. Un gruppo di ristorazione può avere migliaia di euro immobilizzati senza che nessuno lo sappia, perché lo stock è distribuito tra i locali e nessuno fa la somma.",
      queHacer: [
        "Calcola il valore totale dello stock senza vendite negli ultimi 60 giorni (costo × unità).",
        "Ordina dal più alto al più basso: le prime 5 referenze probabilmente concentrano il 50% del problema.",
        "Fissa un obiettivo: ridurre il capitale immobilizzato del 30% nei prossimi 60 giorni.",
        "Stabilisci un indicatore mensile: capitale immobilizzato come % dello stock totale.",
      ],
      errores: [
        { mistake: "Non calcolare mai il capitale immobilizzato", consequence: "Non sai quanti soldi hai fermi. Non puoi migliorare ciò che non misuri." },
        { mistake: "Contare solo le unità, non il valore in euro", consequence: "20 bottiglie da 3 € non sono la stessa cosa di 20 bottiglie da 25 €. L'impatto è radicalmente diverso." },
        { mistake: "Verificare lo stock totale senza separare ciò che ruota da ciò che no", consequence: "Il tuo inventario sembra ragionevole, ma dentro c'è uno strato di capitale morto che non vedi." },
      ],
    },
    {
      id: "cuando-impulsar",
      title: "Quando spingere una referenza",
      priority: "esta semana",
      porQueTeLoMostramos: {
        detected: "Winerim ha trovato vini con buon margine e buona valutazione ma bassa rotazione: non si vendono, ma potrebbero.",
        whyMatters: "Molti vini non si vendono per mancanza di visibilità, non di qualità. Una spinta di 7-14 giorni può riattivarli.",
        riskIfIgnored: "Ritiri vini potenzialmente redditizi senza aver dato loro una reale opportunità di vendita.",
      },
      queSignifica:
        "Spingere significa dare una seconda opportunità attiva a un vino che non si vende ma che ha potenziale. Non è aspettare: è mettere il team di sala a lavorare con quella referenza per un periodo concreto (7-14 giorni) e misurare se risponde. Se il vino è buono, è ben posizionato e il cliente semplicemente non lo conosce, una spinta in sala può riattivarlo.",
      porQueImporta:
        "Perché molti vini non si vendono per mancanza di visibilità, non per mancanza di qualità. Se il team di sala non lo conosce, non lo raccomanda. Se non lo raccomanda, non si vende. E se non si vende, lo ritiri senza sapere se davvero non aveva domanda.",
      queHacer: [
        "Seleziona 2-3 referenze con bassa rotazione ma buon margine e buon rapporto qualità-prezzo.",
        "Forma il team di sala: falli assaggiare, devono saperlo descrivere e avere un argomento di vendita chiaro.",
        "Definisci un periodo di spinta (7-14 giorni) e un obiettivo minimo di vendite.",
        "Se alla fine del periodo non ha risposto, passa al livello successivo: calice o ritiro.",
      ],
      errores: [
        { mistake: "Spingere tutto contemporaneamente", consequence: "Il team non può raccomandare 10 vini nuovi allo stesso tempo. Concentrati." },
        { mistake: "Spingere senza formare il team", consequence: "Se il cameriere non sa cosa dire, la spinta non funziona." },
        { mistake: "Non fissare una scadenza per la spinta", consequence: "Senza deadline, la 'spinta' diventa una speranza eterna." },
      ],
    },
    {
      id: "cuando-sacar-por-copa",
      title: "Quando spostarlo al calice",
      priority: "esta semana",
      porQueTeLoMostramos: {
        detected: "Winerim ha trovato referenze lente che potrebbero funzionare al calice per accelerare la rotazione.",
        whyMatters: "Il calice abbassa la barriera d'ingresso del cliente e ti permette di recuperare capitale in giorni anziché mesi.",
        riskIfIgnored: "Lo stock resta fermo finché non si deteriora o lo liquidi in perdita.",
      },
      queSignifica:
        "Spostare una referenza lenta al calice è una strategia di recupero: invece di aspettare che qualcuno ordini la bottiglia, la offri al calice per accelerare la rotazione e recuperare almeno parte dell'investimento. Funziona bene con vini che sono buoni ma che il cliente non osa ordinare in bottiglia (prezzo alto, uva sconosciuta, regione poco familiare).",
      porQueImporta:
        "Perché il calice abbassa la barriera d'ingresso del cliente. Un vino che nessuno ordina in bottiglia a 35 € si può vendere facilmente a 8 € al calice. Inoltre, il calice ti permette di recuperare capitale in giorni anziché mesi. Ma funziona solo se il vino ha rotazione sufficiente al calice per terminare la bottiglia prima che si ossidi.",
      queHacer: [
        "Valuta se il vino regge 24-48 ore aperto senza perdere qualità (se no, escludilo dal calice).",
        "Calcola il prezzo al calice includendo lo spreco reale (minimo 20-25% di perdita sulla bottiglia).",
        "Comunica al team di sala che è una referenza prioritaria da raccomandare al calice.",
        "Se in 2 settimane non hai venduto almeno 2-3 calici a settimana, ritirala e libera lo spazio.",
      ],
      errores: [
        { mistake: "Mettere al calice un vino che non regge aperto", consequence: "Servi un vino ossidato, perdi la fiducia del cliente e sprechi la bottiglia." },
        { mistake: "Non aggiustare il prezzo al calice per coprire lo spreco", consequence: "Vendi al calice ma perdi soldi perché la bottiglia non si finisce mai." },
        { mistake: "Mantenere troppi calici attivi di vini lenti", consequence: "Apri 8 bottiglie, vendi 2 calici di ognuna e butti il resto." },
      ],
    },
    {
      id: "cuando-retirar",
      title: "Quando ritirare una referenza",
      priority: "inmediato",
      porQueTeLoMostramos: {
        detected: "Winerim ha identificato referenze che non hanno risposto né alla spinta né al calice: candidate chiare al ritiro.",
        whyMatters: "Ogni referenza senza giustificazione toglie spazio fisico e mentale a un'altra che potrebbe vendere davvero.",
        riskIfIgnored: "Mantieni stock morto indefinitamente, accumulando capitale fermo e complessità senza ritorno.",
      },
      queSignifica:
        "Ritirare è l'ultima opzione, ma a volte è la migliore. Un vino deve uscire dalla carta quando: è passato per spinta e calice senza risultato, il suo margine non giustifica lo sforzo, o semplicemente non è più coerente con il tuo concept. Ritirare non è un fallimento: è gestione. La cosa peggiore che puoi fare è mantenere una referenza che occupa spazio senza generare nulla.",
      porQueImporta:
        "Perché ogni referenza che mantieni senza giustificazione toglie spazio (fisico e mentale) a un'altra che potrebbe vendere. La tua carta ha un numero ottimale di referenze, e superarlo diluisce l'attenzione del cliente, complica l'operatività e aumenta il costo di gestione.",
      queHacer: [
        "Se una referenza non ha risposto a spinta né calice in 30 giorni, ritirala.",
        "Decidi cosa fare con lo stock rimanente: liquidare, restituire al fornitore o consumo interno.",
        "Aggiorna la carta e comunica al team che la referenza non è più disponibile.",
        "Documenta la decisione per non ripetere l'acquisto in futuro.",
      ],
      errores: [
        { mistake: "Mantenerla 'nel caso qualcuno la chieda'", consequence: "Nessuno la chiederà. Intanto, occupa spazio e capitale." },
        { mistake: "Ritirare senza documentare il motivo", consequence: "Il prossimo sommelier o responsabile acquisti potrebbe ricomprarla." },
        { mistake: "Non avere un processo chiaro di ritiro", consequence: "Le decisioni vengono rinviate indefinitamente e lo stock morto si accumula." },
      ],
    },
    {
      id: "evolucion-stock",
      title: "Come interpretare l'evoluzione dello stock",
      priority: "este mes",
      porQueTeLoMostramos: {
        detected: "Winerim monitora l'andamento del tuo stock mese per mese: capitale immobilizzato, referenze senza vendita e bassa rotazione.",
        whyMatters: "Ciò che conta non è la fotografia di oggi, ma se la tendenza migliora o peggiora.",
        riskIfIgnored: "Uno stock che peggiora ogni mese diventa una crisi. Se non guardi la tendenza, reagisci solo quando è tardi.",
      },
      queSignifica:
        "L'evoluzione dello stock non è una fotografia: è una tendenza. Ciò che conta non è quanto stock hai oggi, ma come è cambiato rispetto al mese scorso. Il capitale immobilizzato è salito? Sono apparse nuove referenze senza vendita? La percentuale di carta con rotazione bassa sta migliorando o peggiorando? Leggere l'evoluzione ti permette di anticipare i problemi prima che diventino crisi.",
      porQueImporta:
        "Perché uno stock che peggiora ogni mese è un segnale che qualcosa non funziona nel tuo processo di acquisto, nella tua carta o nel tuo team di sala. Se non guardi la tendenza, reagisci solo quando il problema è già grande. Se la guardi, puoi correggere la rotta prima che il capitale immobilizzato si impenni.",
      queHacer: [
        "Confronta 3 indicatori ogni mese: capitale immobilizzato totale, n° di referenze senza vendita in 60 giorni e % di carta con rotazione < 1/mese.",
        "Se uno dei tre sale rispetto al mese precedente, indaga la causa prima che si accumuli.",
        "Correla l'evoluzione dello stock con le tue decisioni di acquisto: stai comprando più di quanto vendi?",
        "Stabilisci un obiettivo trimestrale di miglioramento e rivedilo con il tuo team ogni mese.",
      ],
      errores: [
        { mistake: "Guardare solo lo stock totale senza scomporlo per rotazione", consequence: "Il tuo inventario può sembrare stabile mentre lo stock morto cresce all'interno." },
        { mistake: "Verificare lo stock solo quando c'è un problema visibile", consequence: "Quando lo vedi, hai già perso mesi di capitale immobilizzato." },
        { mistake: "Non collegare l'evoluzione dello stock con le decisioni di acquisto", consequence: "Continui a comprare ciò che non si vende perché nessuno incrocia i dati." },
      ],
    },
  ],
  nextStep: {
    label: "Rileva lo stock morto con il calcolatore",
    href: "/herramientas/calculadora-stock-muerto",
    description: "Quantifica il capitale immobilizzato in referenze senza vendita e decidi cosa ritirare per primo.",
  },
};

export default stockRotacionIT;
