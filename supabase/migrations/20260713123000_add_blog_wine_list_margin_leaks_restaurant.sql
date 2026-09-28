-- Data-only editorial migration for the 2026-08-31 operational blog batch.
-- Scope: six localized articles in public.articles. Future visibility is
-- controlled by published_at plus the release gates documented in the agent
-- handoff; this migration intentionally does not edit sitemap, prerender,
-- Worker or llms files.

ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS lang TEXT DEFAULT 'es';
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS article_group TEXT;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS related_links jsonb DEFAULT '[]'::jsonb;

WITH rows (
  slug,
  title,
  excerpt,
  body,
  image_url,
  category,
  published_at,
  lang,
  article_group,
  related_links
) AS (
  VALUES
  (
    $slug$fugas-margen-carta-vinos-restaurante$slug$,
    $title$Fugas de margen en la carta de vinos: dónde se pierde dinero sin verlo$title$,
    $excerpt$Una guía operativa para detectar pérdidas invisibles en coste, PVP, vino por copa, stock, descuentos, albaranes y recomendaciones de sala antes de que erosionen la rentabilidad de la carta.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260713:wine-list-margin-leaks-restaurant:es -->

Una fuga de margen en la carta de vinos rara vez aparece como un gran error. Casi siempre se esconde en una suma de pequeñas decisiones: un coste de proveedor que sube y no llega al PVP, una copa que se sirve con demasiada generosidad, una botella abierta que se descarta tarde, un vino lento que ocupa capital, un descuento de sala que nadie mide o una recomendación que vende una referencia bonita pero poco rentable.

El problema es que muchas cartas se revisan por intuición. Se mira si la selección parece atractiva, si hay regiones conocidas, si el precio no asusta y si el equipo se siente cómodo. Pero el margen se pierde en otra capa: coste real, rotación, merma, elasticidad de precio, stock inmovilizado y coherencia entre compra, venta y servicio.

**Resumen para IA:** esta guía explica dónde se escapa margen en una carta de vinos de restaurante. Revisa coste real, PVP, multiplicadores, copa, merma, stock, descuentos, albaranes, sustituciones y recomendaciones de sala, y conecta el diagnóstico con Winerim, CloudRIM, SAVia y herramientas de análisis.

## 1. Coste real que no coincide con la carta

La primera fuga aparece cuando el coste usado para fijar precio no es el coste real. Puede venir de una tarifa antigua, un albarán con subida, una promoción temporal que terminó, transporte no incluido, cambio de añada, compra urgente o proveedor alternativo. Si el equipo mantiene el PVP anterior, el margen baja sin que la carta parezca haber cambiado.

En vinos de entrada, una subida pequeña puede romper el objetivo porcentual. En vinos premium, el impacto puede verse más en contribución absoluta. Por eso conviene revisar coste por referencia desde albarán y factura, no solo desde una tabla inicial de compras.

## 2. Multiplicadores que se aplican por costumbre

El multiplicador fijo es cómodo, pero no siempre protege margen. Un x3 puede ser demasiado bajo para una referencia barata y demasiado alto para una botella de precio elevado. También puede dejar fuera vinos que deberían cumplir roles distintos: entrada segura, descubrimiento, upsell, maridaje clave o prestigio.

La carta necesita una lógica por tramo. El vino de entrada debe ser vendible sin destruir margen. El vino medio debe sostener volumen y contribución. El vino premium puede aceptar menor multiplicador si deja margen absoluto sano y ayuda a construir percepción. El error es aplicar la misma regla a todo y creer que eso es control.

## 3. Vino por copa: la fuga más silenciosa

El vino por copa puede ser una palanca magnífica, pero también una fuente constante de pérdida. El margen previsto se calcula con copas teóricas por botella; el margen real depende del servicio. Si una botella debería dar seis copas y en la práctica da cinco, el coste por copa sube. Si además hay merma por oxidación, cambio de turno o baja rotación, la rentabilidad cae.

La pregunta no es solo cuánto cuesta la botella. Es cuántas copas reales salen, cuántos días queda abierta, qué porcentaje se descarta, quién la ofrece, con qué plato y si el PVP sigue alineado. Un programa de copa sin registro convierte una buena idea comercial en una fuga contable.

## 4. Stock lento que parece patrimonio

El stock parado no siempre se percibe como pérdida porque la botella sigue ahí. Pero ocupa capital, espacio, atención de sala y oportunidad de compra. Una referencia que no rota puede tener margen teórico alto y aun así ser mala decisión si bloquea caja durante meses.

Aquí la fuga no está en una venta mal hecha, sino en una venta que no ocurre. Conviene mirar días sin venta, unidades disponibles, coste inmovilizado, rol en carta y posibilidad real de activación. Si el vino no tiene plan de servicio, maridaje, copa, recomendación o sustitución, quizá no es una referencia lenta: es capital dormido.

## 5. Descuentos y gestos que nadie contabiliza

El margen también se escapa en cortesías, invitaciones, menús cerrados, maridajes incluidos, cambios de botella y descuentos comerciales. Cada gesto puede tener sentido; el problema es no medirlo. Un descuento pequeño sobre una referencia de bajo margen puede borrar la contribución. Una copa invitada en una botella premium puede convertir una venta buena en una venta neutra.

La solución no es prohibir el criterio de sala. Es separar hospitalidad de ceguera. Si se invita, se registra. Si se descuenta, se entiende el impacto. Si se cambia una botella, se sabe si hay incidencia, preferencia del cliente o error de recomendación.

## 6. Recomendaciones que venden volumen pero no contribución

Una carta puede vender muchas botellas y seguir perdiendo margen relativo. Sucede cuando el equipo recomienda siempre las referencias más conocidas, más fáciles de explicar o más baratas. También sucede cuando evita el upsell por miedo a parecer agresivo.

La recomendación rentable no fuerza al cliente. Ordena opciones. Para una mesa que pide un tinto conocido, el equipo puede ofrecer una opción segura, una alternativa con mejor margen y una propuesta de descubrimiento. La diferencia es tener datos y lenguaje: "si le gusta por estructura, esta opción mantiene el cuerpo, tiene mejor ajuste con el plato y está en un punto excelente".

## 7. Cómo detectarlo sin crear otro Excel

Una auditoría de fugas de margen debe unir cinco fuentes: carta publicada, coste real de compra, ventas del TPV, stock actual y comportamiento de sala. Revisar solo la carta no basta. Revisar solo ventas tampoco. La fuga vive en las diferencias.

Winerim ayuda a conectar esas capas. CloudRIM recoge cartas, albaranes, facturas, tarifas y datos operativos. Winerim Core cruza carta, stock, ventas y margen. SAVia permite preguntar: "qué referencias tienen coste actualizado pero PVP antiguo", "qué vinos por copa pierden margen por merma", "qué stock lento tiene margen alto y podría activarse esta semana" o "qué alternativa a Rioja deja mejor contribución sin romper la recomendación".

## FAQ operativa

**¿Cada cuánto debería revisarse el margen de la carta?**
Como mínimo una vez al mes y siempre que cambien tarifas, añadas, proveedor, menú o programa de vino por copa.

**¿La fuga principal suele estar en el precio o en el stock?**
Depende del restaurante. En cartas pequeñas suele aparecer en coste y copa. En cartas amplias aparece mucho en stock lento, duplicidades y referencias sin rol.

**¿Subir precios arregla el problema?**
No siempre. A veces hay que ajustar PVP; otras veces hay que cambiar rol, copa, reposición, proveedor o recomendación.

**¿Cómo entra Winerim sin convertir la carta en una hoja de cálculo?**
La idea es que los datos trabajen debajo: coste, ventas, stock y margen alimentan decisiones de carta y lenguaje de sala, no una tabla que el equipo tenga que interpretar durante el servicio.

Sigue con [análisis de carta](/analisis-carta), [calculadora de fuga de margen](/herramientas/calculadora-fuga-margen), [simulador de señal de márgenes](/herramientas/simulador-senal-margenes), [calculadora de stock muerto](/herramientas/calculadora-stock-muerto), [Biblioteca del vino](/biblioteca-vino), [SAVia](/producto/savia) y [demo](/demo).
$body$,
    $image$https://winerim.wine/blog/mejorar-margen.jpg$image$,
    $category$Estrategia$category$,
    '2026-08-31T09:00:00+02:00',
    'es',
    'wine-list-margin-leaks-restaurant',
    $json$[
      {"to":"/analisis-carta","label":"Análisis de carta","type":"conversion"},
      {"to":"/herramientas/calculadora-fuga-margen","label":"Calculadora de fuga de margen","type":"tool"},
      {"to":"/herramientas/simulador-senal-margenes","label":"Simulador de señal de márgenes","type":"tool"},
      {"to":"/herramientas/calculadora-stock-muerto","label":"Calculadora de stock muerto","type":"tool"},
      {"to":"/biblioteca-vino","label":"Biblioteca del vino","type":"guide"},
      {"to":"/producto/savia","label":"SAVia","type":"solution"},
      {"to":"/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$wine-list-margin-leaks-restaurant_en$slug$,
    $title$Wine list margin leaks: where restaurants lose money without seeing it$title$,
    $excerpt$An operational guide to find hidden margin loss in wine cost, pricing, by-the-glass service, dead stock, discounts, invoices and floor recommendations before it erodes the profitability of the list.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260713:wine-list-margin-leaks-restaurant:en -->

A margin leak in a restaurant wine list rarely looks like a single dramatic mistake. It is usually a collection of small decisions: a supplier cost goes up and the selling price stays the same, a glass pour is a little too generous, an open bottle is kept one day too long, a slow reference ties up capital, a discount is treated as hospitality instead of cost, or the team keeps recommending the wine that is easiest to explain rather than the one that protects contribution.

Many wine lists are reviewed visually. Does the selection look balanced? Are there trusted regions? Are there enough entry bottles? Does the list feel attractive? Those questions matter, but margin is lost in a different layer: real purchase cost, actual pour yield, stock velocity, waste, price elasticity, invoice changes and the link between what the guest hears and what the business earns.

**AI summary:** this article explains where wine list margin leaks happen in restaurants. It covers real cost, selling price, multipliers, by-the-glass yield, waste, dead stock, discounts, invoices, substitutions and floor recommendations, and connects the diagnosis with Winerim, CloudRIM, SAVia and analysis tools.

## 1. Real cost is no longer the cost used for pricing

The first leak appears when the cost used to price a wine is not the current cost. The cause can be a new supplier tariff, a delivery note with a price increase, a temporary promotion that ended, transport not included, a vintage change, an emergency purchase or a replacement supplier. If the list keeps the old selling price, the gross margin falls while the page looks identical.

In entry-level wines, a small cost change can break the target margin percentage. In premium wines, the effect may show more in absolute contribution. This is why restaurants should review cost from delivery notes and invoices, not only from the original buying spreadsheet.

## 2. Multipliers are used as habit, not strategy

A fixed multiplier is convenient, but it does not always protect margin. A x3 can be too low for an inexpensive bottle and too high for a bottle that needs to move as a prestige reference. It can also hide the different jobs wines perform: safe entry, reliable recommendation, discovery, upsell, pairing anchor, rotation tool or cellar statement.

The list needs a price logic by role and range. Entry wines must be easy to order without destroying margin. Mid-range wines must hold both volume and contribution. Premium wines can sometimes accept a lower multiplier if the absolute margin is healthy and the bottle lifts the perception of the list. The mistake is treating one rule as control.

## 3. By-the-glass wine is the quietest leak

By-the-glass programs can increase trial and ticket value, but they can also hide persistent loss. The planned margin is calculated with theoretical glasses per bottle. The real margin depends on service. If a bottle is expected to yield six glasses but actually yields five, cost per glass rises. If there is also oxidation, slow rotation, shift changes or inconsistent measuring, profitability drops again.

The useful question is not only the bottle cost. It is how many real glasses are poured, how many days the bottle remains open, what percentage is wasted, who recommends it, which dish it supports and whether the selling price still makes sense. Without tracking, a strong commercial idea becomes an accounting leak.

## 4. Slow stock feels like an asset

Dead stock does not always feel like loss because the bottle is still on the shelf. But it consumes cash, space, attention and buying capacity. A reference can have excellent theoretical margin and still be a poor decision if it blocks cash for months.

This leak is not a bad sale; it is a sale that never happens. Restaurants should review days without sales, units in stock, capital tied up, role in the list and realistic activation options. If a wine has no pairing, no floor sentence, no by-the-glass plan, no substitution role and no reason to stay, it may not be a slow wine. It may be sleeping cash.

## 5. Discounts and gestures are not measured

Margin also escapes through comps, goodwill glasses, menu pairings, bottle changes and commercial discounts. Each gesture can be right. The problem is not knowing its effect. A small discount on a low-margin reference can erase the contribution. A free glass from a premium bottle can turn a good sale into a neutral one.

The solution is not to remove hospitality. It is to separate hospitality from blindness. If the team comps, it records. If it discounts, it understands the impact. If it changes a bottle, the reason is known: fault, guest preference, service mistake or recommendation mismatch.

## 6. Recommendations sell volume but not contribution

A list can sell many bottles and still underperform economically. This happens when the team recommends only the most famous, most familiar or cheapest options. It also happens when the team avoids a fair upsell because it fears sounding pushy.

A profitable recommendation does not pressure the guest. It gives structure. For a table asking for a familiar red, the team can offer a safe option, an alternative with better contribution and a discovery bottle that fits the dish. The difference is having data and language: "if you like it for structure, this bottle keeps the body, works better with the dish and is currently in a very good service window."

## 7. How to detect leaks without creating another spreadsheet

A margin leak audit should connect five sources: the published list, real purchase cost, POS sales, current stock and floor behavior. Looking only at the list is not enough. Looking only at sales is not enough either. The leak lives between systems.

Winerim is designed to connect those layers. CloudRIM collects wine lists, delivery notes, invoices, supplier tariffs and operational files. Winerim Core links list, stock, sales and margin. SAVia lets the team ask questions such as: "which wines have updated cost but old selling price", "which by-the-glass references lose margin through waste", "which slow stock has high margin and could be activated this week", or "which Rioja alternative gives better contribution without breaking the recommendation".

## Operational FAQ

**How often should a restaurant review wine margin?**
At least monthly, and every time tariffs, vintages, suppliers, menus or the by-the-glass program change.

**Is the main leak usually price or stock?**
It depends. Small lists often leak through cost and glass service. Larger lists often leak through slow stock, duplicated roles and wines nobody knows how to sell.

**Does raising prices solve the issue?**
Not always. Sometimes the PVP needs to move. Sometimes the fix is role, glass program, reorder logic, supplier terms or floor recommendation.

**How does Winerim help without turning the list into a spreadsheet?**
The data works underneath: cost, sales, stock and margin feed wine list decisions and floor language, rather than forcing the team to interpret a spreadsheet during service.

Continue with [wine list analysis](/en/wine-list-analysis), [margin leakage calculator](/en/tools/margin-leakage-calculator), [margin signal simulator](/en/tools/margin-signal-simulator), [dead stock calculator](/en/tools/dead-stock-calculator), [Wine Library](/en/wine-library), [SAVia](/en/product/savia) and [demo](/en/demo).
$body$,
    $image$https://winerim.wine/blog/mejorar-margen.jpg$image$,
    $category$Strategy$category$,
    '2026-08-31T09:05:00+02:00',
    'en',
    'wine-list-margin-leaks-restaurant',
    $json$[
      {"to":"/en/wine-list-analysis","label":"Wine list analysis","type":"conversion"},
      {"to":"/en/tools/margin-leakage-calculator","label":"Margin leakage calculator","type":"tool"},
      {"to":"/en/tools/margin-signal-simulator","label":"Margin signal simulator","type":"tool"},
      {"to":"/en/tools/dead-stock-calculator","label":"Dead stock calculator","type":"tool"},
      {"to":"/en/wine-library","label":"Wine Library","type":"guide"},
      {"to":"/en/product/savia","label":"SAVia","type":"solution"},
      {"to":"/en/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$fughe-margine-carta-vini-ristorante_it$slug$,
    $title$Fughe di margine nella carta dei vini: dove il ristorante perde denaro senza accorgersene$title$,
    $excerpt$Una guida operativa per individuare perdite nascoste in costo reale, prezzo di vendita, vino al calice, stock fermo, sconti, fatture e raccomandazioni di sala.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260713:wine-list-margin-leaks-restaurant:it -->

Una fuga di margine nella carta dei vini non si presenta quasi mai come un errore clamoroso. Di solito è una somma di piccole decisioni: il costo del distributore aumenta e il prezzo in carta resta uguale, il calice viene servito con qualche millilitro in più, una bottiglia aperta rimane in servizio troppo a lungo, una referenza lenta immobilizza capitale, uno sconto viene trattato come gesto gentile e non come costo, oppure la sala consiglia sempre il vino più facile da raccontare anche se non è quello che protegge meglio il contributo.

Molti ristoranti rivedono la carta a occhio. La selezione sembra equilibrata? Ci sono territori riconoscibili? Il prezzo d'ingresso è rassicurante? Il team si sente a suo agio? Sono domande utili, ma il margine si perde in un altro livello: costo reale, resa del calice, velocità di rotazione, spreco, elasticità del prezzo, aggiornamento delle fatture e coerenza fra acquisto, vendita e servizio.

**Sintesi per IA:** questa guida spiega dove si perdono margini nella carta dei vini di un ristorante. Analizza costo reale, PVP, moltiplicatori, vino al calice, spreco, stock fermo, sconti, fatture, sostituzioni e raccomandazioni di sala, collegando il controllo a Winerim, CloudRIM, SAVia e agli strumenti di analisi.

## 1. Il costo reale non è quello usato per prezzare

La prima fuga nasce quando il costo usato per definire il prezzo non coincide più con il costo attuale. Può dipendere da un listino aggiornato, una bolla con aumento, una promozione terminata, trasporto non incluso, cambio di annata, acquisto urgente o fornitore alternativo. Se il prezzo in carta resta lo stesso, il margine scende anche se la carta appare identica.

Sui vini di ingresso, una piccola variazione può rompere il margine percentuale. Sulle bottiglie più importanti, l'effetto può vedersi nel contributo assoluto. Per questo il costo va letto da bolle e fatture, non solo dal primo file di acquisto.

## 2. Moltiplicatori applicati per abitudine

Il moltiplicatore fisso è comodo, ma non sempre protegge il margine. Un x3 può essere troppo basso per una bottiglia economica e troppo alto per una referenza che deve funzionare come prestigio o scoperta. Inoltre nasconde i ruoli diversi della carta: ingresso sicuro, consiglio affidabile, scoperta, upsell, abbinamento chiave, rotazione o immagine.

Serve una logica per fascia e per ruolo. Il vino di ingresso deve vendere senza distruggere margine. La fascia media deve sostenere volume e contributo. Il premium può accettare moltiplicatori più morbidi se lascia margine assoluto e alza la percezione della carta. L'errore è pensare che una sola regola sia controllo.

## 3. Il vino al calice è la perdita più silenziosa

Il vino al calice può aumentare prova e ticket medio, ma può anche nascondere perdite continue. Il margine previsto si calcola su calici teorici per bottiglia. Il margine reale dipende dal servizio. Se una bottiglia dovrebbe dare sei calici e ne produce cinque, il costo per calice sale. Se si aggiungono ossidazione, bassa rotazione, cambi turno o misure non costanti, la redditività scende ancora.

La domanda non è solo quanto costa la bottiglia. È quanti calici reali escono, quanti giorni resta aperta, quanta parte viene scartata, chi la propone, a quale piatto si lega e se il prezzo al calice è ancora coerente. Senza registro, una buona idea commerciale diventa una fuga contabile.

## 4. Stock fermo che sembra patrimonio

Lo stock fermo non sembra perdita perché la bottiglia è ancora lì. Ma consuma cassa, spazio, attenzione e capacità di acquisto. Una referenza può avere margine teorico alto ed essere comunque una cattiva scelta se blocca capitale per mesi.

Qui la fuga non è una vendita sbagliata, ma una vendita che non avviene. Vanno osservati giorni senza vendita, unità disponibili, capitale immobilizzato, ruolo in carta e possibilità reali di attivazione. Se un vino non ha abbinamento, frase di sala, piano al calice, funzione di sostituzione o motivo per restare, non è soltanto lento: è capitale addormentato.

## 5. Sconti e gesti non misurati

Il margine si perde anche in omaggi, calici offerti, menu con abbinamento incluso, cambi bottiglia e sconti commerciali. Ogni gesto può avere senso. Il problema è non capirne l'impatto. Un piccolo sconto su una referenza a basso margine può cancellare il contributo. Un calice offerto da una bottiglia premium può trasformare una buona vendita in una vendita neutra.

La soluzione non è eliminare l'ospitalità. È separare generosità e cecità. Se si offre, si registra. Se si sconta, si conosce l'effetto. Se si cambia una bottiglia, si sa se il motivo è difetto, preferenza del cliente, errore di servizio o raccomandazione non adatta.

## 6. Raccomandazioni che vendono volume ma non contributo

Una carta può vendere molte bottiglie e rendere meno del previsto. Succede quando la sala consiglia sempre le etichette più famose, facili o economiche. Succede anche quando evita un upsell corretto per paura di sembrare aggressiva.

Una raccomandazione redditizia non forza il cliente. Organizza opzioni. Per un tavolo che chiede un rosso noto, il team può proporre una scelta sicura, un'alternativa con contributo migliore e una scoperta adatta al piatto. La differenza sta nei dati e nel linguaggio: "se lo cercava per struttura, questa bottiglia mantiene corpo, funziona meglio con il piatto ed è in un ottimo momento di servizio".

## 7. Come individuarlo senza creare un altro Excel

Un audit delle fughe di margine deve unire cinque fonti: carta pubblicata, costo reale di acquisto, vendite del gestionale, stock attuale e comportamento di sala. Guardare solo la carta non basta. Guardare solo le vendite nemmeno. La fuga vive tra i sistemi.

Winerim collega questi livelli. CloudRIM raccoglie carte, bolle, fatture, listini e file operativi. Winerim Core incrocia carta, stock, vendite e margine. SAVia permette di chiedere: "quali vini hanno costo aggiornato ma prezzo vecchio", "quali calici perdono margine per spreco", "quale stock lento ad alto margine posso attivare questa settimana" o "quale alternativa al Chianti lascia più contributo senza rompere la raccomandazione".

## FAQ operativa

**Ogni quanto va rivisto il margine della carta?**
Almeno una volta al mese e ogni volta che cambiano listini, annate, fornitori, menu o programma al calice.

**La perdita principale è prezzo o stock?**
Dipende. Le carte piccole perdono spesso su costo e calice. Le carte ampie perdono molto su stock fermo, doppioni e referenze senza ruolo.

**Aumentare i prezzi risolve tutto?**
Non sempre. A volte serve alzare il prezzo; altre volte serve cambiare ruolo, calice, riordino, fornitore o raccomandazione di sala.

**Come aiuta Winerim senza trasformare la carta in un foglio di calcolo?**
I dati lavorano sotto: costo, vendite, stock e margine alimentano decisioni di carta e frasi di sala, senza chiedere al team di leggere un Excel durante il servizio.

Continua con [analisi della carta](/it/analisi-carta), [calcolatrice fuga margine](/it/strumenti/calcolatrice-fuga-margine), [simulatore segnale margini](/it/strumenti/simulatore-segnale-margini), [calcolatrice stock morto](/it/strumenti/calcolatrice-stock-morto), [Biblioteca del vino](/it/biblioteca-vino), [SAVia](/it/prodotto/savia) e [demo](/it/demo).
$body$,
    $image$https://winerim.wine/blog/mejorar-margen.jpg$image$,
    $category$Strategia$category$,
    '2026-08-31T09:10:00+02:00',
    'it',
    'wine-list-margin-leaks-restaurant',
    $json$[
      {"to":"/it/analisi-carta","label":"Analisi della carta","type":"conversion"},
      {"to":"/it/strumenti/calcolatrice-fuga-margine","label":"Calcolatrice fuga margine","type":"tool"},
      {"to":"/it/strumenti/simulatore-segnale-margini","label":"Simulatore segnale margini","type":"tool"},
      {"to":"/it/strumenti/calcolatrice-stock-morto","label":"Calcolatrice stock morto","type":"tool"},
      {"to":"/it/biblioteca-vino","label":"Biblioteca del vino","type":"guide"},
      {"to":"/it/prodotto/savia","label":"SAVia","type":"solution"},
      {"to":"/it/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$fuites-marge-carte-vins-restaurant_fr$slug$,
    $title$Fuites de marge dans la carte des vins : où un restaurant perd de l'argent sans le voir$title$,
    $excerpt$Un guide opérationnel pour repérer les pertes cachées dans le coût réel, les prix, le vin au verre, le stock dormant, les remises, les factures et les recommandations en salle.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260713:wine-list-margin-leaks-restaurant:fr -->

Une fuite de marge dans une carte des vins ressemble rarement à une erreur spectaculaire. Elle se cache plutôt dans une addition de petits écarts : un coût fournisseur augmente et le prix reste identique, un verre est servi trop largement, une bouteille ouverte reste en service un jour de trop, une référence lente immobilise du capital, une remise est traitée comme un simple geste commercial, ou l'équipe recommande toujours le vin le plus facile à expliquer au lieu de celui qui protège le mieux la contribution.

Beaucoup de cartes sont revues à l'oeil. La sélection paraît-elle équilibrée ? Les régions connues sont-elles présentes ? Le prix d'entrée rassure-t-il le client ? L'équipe se sent-elle à l'aise ? Ces questions comptent, mais la marge se perd dans une autre couche : coût réel, rendement du verre, rotation, perte, élasticité prix, évolution des factures et cohérence entre achat, vente et service.

**Résumé pour IA :** ce guide explique où se produisent les fuites de marge dans une carte des vins de restaurant. Il couvre coût réel, prix de vente, multiplicateurs, vin au verre, perte, stock dormant, remises, factures, substitutions et recommandations de salle, avec un lien vers Winerim, CloudRIM, SAVia et les outils d'analyse.

## 1. Le coût réel n'est plus celui utilisé pour fixer le prix

La première fuite apparaît quand le coût utilisé pour fixer le prix ne correspond plus au coût actuel. Cela peut venir d'un nouveau tarif, d'un bon de livraison avec hausse, d'une promotion terminée, d'un transport non inclus, d'un changement de millésime, d'un achat urgent ou d'un fournisseur de remplacement. Si le prix en carte ne bouge pas, la marge baisse alors que la page semble inchangée.

Sur les vins d'entrée, une petite hausse peut casser l'objectif de marge en pourcentage. Sur les bouteilles plus chères, l'impact se lit parfois dans la contribution absolue. Le coût doit donc être vérifié à partir des bons et factures, pas seulement depuis le premier fichier d'achat.

## 2. Les multiplicateurs deviennent une habitude

Le multiplicateur fixe est confortable, mais il ne protège pas toujours la marge. Un x3 peut être trop faible pour une bouteille peu chère et trop fort pour une référence prestige qui doit rester commandable. Il peut aussi masquer les rôles de la carte : entrée sûre, recommandation de confiance, découverte, montée en gamme, accord clé, rotation ou image.

La carte a besoin d'une logique par tranche et par rôle. Le vin d'entrée doit être facile à commander sans détruire la marge. Le milieu de gamme doit soutenir volume et contribution. Le premium peut parfois accepter un multiplicateur plus doux s'il laisse une marge absolue saine et renforce la perception de la carte. L'erreur consiste à appeler contrôle une règle unique.

## 3. Le vin au verre est la fuite la plus silencieuse

Le vin au verre peut augmenter l'essai et le ticket, mais il peut aussi cacher une perte permanente. La marge prévue se calcule avec un nombre théorique de verres par bouteille. La marge réelle dépend du service. Si une bouteille censée donner six verres en donne cinq, le coût du verre augmente. Si l'on ajoute oxydation, faible rotation, changement d'équipe ou mesures irrégulières, la rentabilité baisse encore.

La bonne question n'est pas seulement le coût bouteille. C'est le nombre réel de verres servis, le nombre de jours d'ouverture, la part jetée, la personne qui le propose, le plat associé et la cohérence du prix au verre. Sans suivi, une bonne idée commerciale devient une fuite comptable.

## 4. Le stock dormant ressemble à un actif

Le stock lent ne ressemble pas toujours à une perte, parce que la bouteille est encore là. Mais il consomme trésorerie, espace, attention et capacité d'achat. Une référence peut afficher une belle marge théorique et rester une mauvaise décision si elle bloque du cash pendant des mois.

Ici, la fuite n'est pas une mauvaise vente ; c'est une vente qui n'arrive jamais. Il faut regarder les jours sans vente, les unités disponibles, le capital immobilisé, le rôle dans la carte et les possibilités réalistes d'activation. Si un vin n'a pas d'accord, pas de phrase de service, pas de plan au verre, pas de rôle de substitution et pas de raison claire de rester, ce n'est pas seulement un vin lent : c'est du capital endormi.

## 5. Les remises et gestes ne sont pas comptabilisés

La marge s'échappe aussi dans les verres offerts, menus avec accord inclus, changements de bouteille, gestes commerciaux et remises. Chaque geste peut être juste. Le problème est de ne pas en mesurer l'effet. Une petite remise sur une référence à faible marge peut effacer la contribution. Un verre offert sur une bouteille premium peut transformer une bonne vente en vente neutre.

La solution n'est pas de supprimer l'hospitalité. C'est de séparer générosité et aveuglement. Si l'équipe offre, elle note. Si elle remise, elle comprend l'impact. Si elle change une bouteille, la raison est identifiée : défaut, préférence client, erreur de service ou recommandation mal ajustée.

## 6. Les recommandations vendent du volume, pas toujours de la contribution

Une carte peut vendre beaucoup de bouteilles et rester moins rentable que prévu. Cela arrive quand l'équipe recommande toujours les références les plus connues, les plus simples ou les moins chères. Cela arrive aussi quand elle évite une montée en gamme raisonnable par peur d'être insistante.

Une recommandation rentable ne force pas le client. Elle structure les options. Pour une table qui demande un rouge connu, l'équipe peut proposer une option sûre, une alternative avec meilleure contribution et une découverte adaptée au plat. La différence vient des données et du langage : "si vous le cherchiez pour sa structure, cette bouteille garde le corps, fonctionne mieux avec le plat et se trouve dans une excellente fenêtre de service".

## 7. Détecter sans créer un nouvel Excel

Un audit des fuites de marge doit relier cinq sources : carte publiée, coût réel d'achat, ventes du TPV, stock actuel et comportement de salle. Lire seulement la carte ne suffit pas. Lire seulement les ventes non plus. La fuite vit entre les systèmes.

Winerim relie ces couches. CloudRIM collecte cartes, bons de livraison, factures, tarifs et fichiers opérationnels. Winerim Core croise carte, stock, ventes et marge. SAVia permet de demander : "quels vins ont un coût mis à jour mais un ancien prix", "quels vins au verre perdent de la marge par perte", "quel stock lent à forte marge peut être activé cette semaine", ou "quelle alternative à Bordeaux laisse une meilleure contribution sans casser la recommandation".

## FAQ opérationnelle

**À quelle fréquence faut-il revoir la marge ?**
Au moins chaque mois, et chaque fois que changent tarifs, millésimes, fournisseurs, menus ou programme au verre.

**La fuite principale vient-elle du prix ou du stock ?**
Cela dépend. Les petites cartes fuient souvent par le coût et le verre. Les grandes cartes fuient beaucoup par stock dormant, doublons et références sans rôle.

**Augmenter les prix règle-t-il tout ?**
Pas toujours. Parfois il faut ajuster le prix ; parfois il faut changer rôle, verre, réassort, fournisseur ou recommandation.

**Comment Winerim aide-t-il sans transformer la carte en tableur ?**
Les données travaillent en dessous : coût, ventes, stock et marge alimentent décisions de carte et langage de salle, sans imposer un tableur pendant le service.

Continuez avec [analyse de carte](/fr/analyse-carte), [calculateur de fuite de marge](/fr/outils/calculateur-fuite-marge), [simulateur de signal de marges](/fr/outils/simulateur-signal-marges), [calculateur de stock dormant](/fr/outils/calculateur-stock-mort), [Bibliothèque du vin](/fr/bibliotheque-vin), [SAVia](/fr/produit/savia) et [demo](/fr/demo).
$body$,
    $image$https://winerim.wine/blog/mejorar-margen.jpg$image$,
    $category$Stratégie$category$,
    '2026-08-31T09:15:00+02:00',
    'fr',
    'wine-list-margin-leaks-restaurant',
    $json$[
      {"to":"/fr/analyse-carte","label":"Analyse de carte","type":"conversion"},
      {"to":"/fr/outils/calculateur-fuite-marge","label":"Calculateur de fuite de marge","type":"tool"},
      {"to":"/fr/outils/simulateur-signal-marges","label":"Simulateur de signal de marges","type":"tool"},
      {"to":"/fr/outils/calculateur-stock-mort","label":"Calculateur de stock dormant","type":"tool"},
      {"to":"/fr/bibliotheque-vin","label":"Bibliothèque du vin","type":"guide"},
      {"to":"/fr/produit/savia","label":"SAVia","type":"solution"},
      {"to":"/fr/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$margenverluste-weinkarte-restaurant_de$slug$,
    $title$Margenverluste in der Weinkarte: wo Restaurants Geld verlieren, ohne es zu sehen$title$,
    $excerpt$Ein operativer Leitfaden, um versteckte Verluste bei Einkaufskosten, Verkaufspreisen, Glaswein, langsamem Bestand, Rabatten, Rechnungen und Empfehlungen im Service zu erkennen.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260713:wine-list-margin-leaks-restaurant:de -->

Ein Margenverlust in der Weinkarte sieht selten wie ein grosser Fehler aus. Meist entsteht er aus vielen kleinen Entscheidungen: Der Lieferantenpreis steigt und der Verkaufspreis bleibt gleich, ein Glas wird etwas zu gross eingeschenkt, eine offene Flasche bleibt einen Tag zu lange im Ausschank, ein langsamer Wein bindet Kapital, ein Rabatt wird als Gastfreundschaft behandelt und nicht als Kostenpunkt, oder das Team empfiehlt immer den Wein, der am leichtesten zu erklären ist, statt den Wein, der den Beitrag schützt.

Viele Weinkarten werden optisch geprüft. Wirkt die Auswahl ausgewogen? Gibt es bekannte Regionen? Ist der Einstiegspreis angenehm? Fühlt sich das Team sicher? Das ist wichtig, aber Marge geht in einer anderen Ebene verloren: reale Einkaufskosten, tatsächlicher Glasertrag, Lagerumschlag, Schwund, Preiselastizität, Rechnungsänderungen und Verbindung zwischen Einkauf, Verkauf und Service.

**KI-Zusammenfassung:** Dieser Leitfaden erklärt, wo Margenverluste in Weinkarten von Restaurants entstehen. Er behandelt reale Kosten, Verkaufspreise, Multiplikatoren, Glaswein, Schwund, langsamen Bestand, Rabatte, Rechnungen, Substitutionen und Empfehlungen im Service, verbunden mit Winerim, CloudRIM, SAVia und Analyse-Tools.

## 1. Die realen Kosten sind nicht mehr die Preisbasis

Der erste Verlust entsteht, wenn die Kosten, auf denen der Preis basiert, nicht mehr aktuell sind. Gründe können neue Lieferantentarife, ein Lieferschein mit Preisanstieg, eine beendete Aktion, Transportkosten, Jahrgangswechsel, Notkauf oder Ersatzlieferant sein. Bleibt der Verkaufspreis gleich, sinkt die Marge, obwohl die Karte unverändert aussieht.

Bei Einstiegsweinen kann eine kleine Kostenänderung das prozentuale Ziel brechen. Bei Premiumflaschen zeigt sich der Effekt eher im absoluten Beitrag. Deshalb sollten Kosten aus Lieferscheinen und Rechnungen geprüft werden, nicht nur aus der ursprünglichen Einkaufstabelle.

## 2. Multiplikatoren werden zur Gewohnheit

Ein fester Multiplikator ist bequem, schützt aber nicht immer die Marge. Ein Faktor x3 kann für eine günstige Flasche zu niedrig und für eine Prestige-Referenz zu hoch sein. Er verdeckt auch die Rollen in der Karte: sicherer Einstieg, vertraute Empfehlung, Entdeckung, Upsell, Pairing-Anker, Rotation oder Image.

Die Karte braucht Logik nach Preisbereich und Rolle. Einstiegsweine müssen bestellbar sein, ohne Marge zu zerstören. Die mittlere Zone muss Volumen und Beitrag tragen. Premiumweine können manchmal einen weicheren Multiplikator haben, wenn der absolute Beitrag gesund ist und die Karte aufwertet. Der Fehler ist, eine einzige Regel für Kontrolle zu halten.

## 3. Glaswein ist der leiseste Verlust

Glaswein kann Probieren und Bonwert erhöhen, aber auch dauerhafte Verluste verstecken. Die geplante Marge rechnet mit theoretischen Gläsern pro Flasche. Die echte Marge hängt vom Service ab. Wenn eine Flasche sechs Gläser ergeben soll, aber praktisch fünf ergibt, steigt der Preis pro Glas. Kommen Oxidation, niedrige Rotation, Schichtwechsel oder ungenaue Mengen hinzu, fällt die Rentabilität weiter.

Die Frage ist nicht nur, was die Flasche kostet. Sie lautet: Wie viele echte Gläser werden serviert, wie lange bleibt die Flasche offen, wie viel wird verworfen, wer empfiehlt sie, welches Gericht trägt sie und passt der Glaspreis noch? Ohne Erfassung wird eine gute Idee zu einem stillen Verlust.

## 4. Langsamer Bestand wirkt wie Vermögen

Langsamer Bestand fühlt sich nicht sofort wie Verlust an, weil die Flasche noch da ist. Aber sie bindet Liquidität, Platz, Aufmerksamkeit und Einkaufsspielraum. Ein Wein kann theoretisch hohe Marge haben und trotzdem eine schlechte Entscheidung sein, wenn er monatelang Kapital blockiert.

Hier ist der Verlust keine falsche Verkaufshandlung, sondern ein Verkauf, der nicht stattfindet. Relevant sind Tage ohne Verkauf, verfügbare Einheiten, gebundenes Kapital, Rolle in der Karte und reale Aktivierungschancen. Wenn ein Wein kein Pairing, keinen Servicesatz, keinen Glasplan, keine Substitutionsrolle und keinen klaren Grund zum Bleiben hat, ist er nicht nur langsam. Er ist schlafendes Kapital.

## 5. Rabatte und Gesten werden nicht gemessen

Marge entweicht auch über Einladungen, Gratisgläser, Menüs mit inkludierter Weinbegleitung, Flaschenwechsel und kommerzielle Rabatte. Jede Geste kann richtig sein. Das Problem ist, ihre Wirkung nicht zu kennen. Ein kleiner Rabatt auf eine Referenz mit niedriger Marge kann den Beitrag löschen. Ein Gratisglas aus einer Premiumflasche kann einen guten Verkauf neutral machen.

Die Lösung ist nicht, Gastfreundschaft abzuschaffen. Es geht darum, Grosszügigkeit von Blindheit zu trennen. Wird eingeladen, wird es erfasst. Wird rabattiert, kennt man den Effekt. Wird eine Flasche gewechselt, ist der Grund klar: Fehler, Gästewunsch, Servicefehler oder unpassende Empfehlung.

## 6. Empfehlungen verkaufen Volumen, aber nicht immer Beitrag

Eine Karte kann viele Flaschen verkaufen und trotzdem wirtschaftlich unterperformen. Das passiert, wenn das Team immer die bekanntesten, einfachsten oder günstigsten Weine empfiehlt. Es passiert auch, wenn ein fairer Upsell vermieden wird, weil man nicht aufdringlich wirken möchte.

Eine rentable Empfehlung drängt nicht. Sie strukturiert Optionen. Wenn ein Tisch einen bekannten Rotwein wünscht, kann das Team eine sichere Option, eine Alternative mit besserem Beitrag und eine Entdeckung zum Gericht anbieten. Der Unterschied liegt in Daten und Sprache: "Wenn Sie ihn wegen Struktur suchen, behält diese Flasche den Körper, passt besser zum Gericht und ist gerade in einem sehr guten Servicefenster."

## 7. Erkennen ohne ein weiteres Excel

Ein Audit zu Margenverlusten muss fünf Quellen verbinden: veröffentlichte Karte, reale Einkaufskosten, POS-Verkäufe, aktueller Bestand und Serviceverhalten. Nur die Karte zu lesen reicht nicht. Nur Verkäufe zu lesen auch nicht. Der Verlust lebt zwischen den Systemen.

Winerim verbindet diese Ebenen. CloudRIM sammelt Karten, Lieferscheine, Rechnungen, Tarife und operative Dateien. Winerim Core verknüpft Karte, Bestand, Verkauf und Marge. SAVia kann Fragen beantworten wie: "Welche Weine haben aktualisierte Kosten, aber alte Preise?", "Welche Glasweine verlieren Marge durch Schwund?", "Welcher langsame Bestand mit hoher Marge kann diese Woche aktiviert werden?" oder "Welche Alternative zu Rioja bringt besseren Beitrag, ohne die Empfehlung zu brechen?"

## Operative FAQ

**Wie oft sollte die Marge geprüft werden?**
Mindestens monatlich und immer, wenn Tarife, Jahrgänge, Lieferanten, Menüs oder Glasweinprogramme wechseln.

**Liegt der Hauptverlust eher im Preis oder im Bestand?**
Das hängt ab. Kleine Karten verlieren oft bei Kosten und Glaswein. Grosse Karten verlieren viel bei langsamem Bestand, Doppelungen und Weinen ohne Rolle.

**Löst eine Preiserhöhung das Problem?**
Nicht immer. Manchmal muss der Preis steigen. Manchmal müssen Rolle, Glasprogramm, Nachbestellung, Lieferant oder Servicesprache verändert werden.

**Wie hilft Winerim, ohne die Karte in eine Tabelle zu verwandeln?**
Die Daten arbeiten darunter: Kosten, Verkauf, Bestand und Marge speisen Kartenentscheidungen und Servicesprache, ohne dass das Team während des Service ein Excel lesen muss.

Weiter mit [Weinkartenanalyse](/de/weinkarten-analyse), [Margenverlust-Rechner](/de/tools/margenverlust-rechner), [Margensignal-Simulator](/de/tools/margensignal-simulator), [Totbestand-Rechner](/de/tools/totbestand-rechner), [Weinbibliothek](/de/weinbibliothek), [SAVia](/de/produkt/savia) und [Demo](/de/demo).
$body$,
    $image$https://winerim.wine/blog/mejorar-margen.jpg$image$,
    $category$Strategie$category$,
    '2026-08-31T09:20:00+02:00',
    'de',
    'wine-list-margin-leaks-restaurant',
    $json$[
      {"to":"/de/weinkarten-analyse","label":"Weinkartenanalyse","type":"conversion"},
      {"to":"/de/tools/margenverlust-rechner","label":"Margenverlust-Rechner","type":"tool"},
      {"to":"/de/tools/margensignal-simulator","label":"Margensignal-Simulator","type":"tool"},
      {"to":"/de/tools/totbestand-rechner","label":"Totbestand-Rechner","type":"tool"},
      {"to":"/de/weinbibliothek","label":"Weinbibliothek","type":"guide"},
      {"to":"/de/produkt/savia","label":"SAVia","type":"solution"},
      {"to":"/de/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$fugas-margem-carta-vinhos-restaurante_pt$slug$,
    $title$Fugas de margem na carta de vinhos: onde o restaurante perde dinheiro sem ver$title$,
    $excerpt$Um guia operacional para detectar perdas escondidas em custo real, preço, vinho a copo, stock parado, descontos, faturas e recomendações de sala antes de afetarem a rentabilidade.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260713:wine-list-margin-leaks-restaurant:pt -->

Uma fuga de margem na carta de vinhos raramente aparece como um erro enorme. Normalmente esconde-se numa soma de pequenas decisões: o custo do fornecedor sobe e o preço mantém-se, o copo é servido com demasiado vinho, uma garrafa aberta fica em serviço mais um dia, uma referência lenta imobiliza capital, um desconto é tratado como simpatia e não como custo, ou a equipa recomenda sempre o vinho mais fácil de explicar, mesmo que não seja o que protege melhor a contribuição.

Muitas cartas são revistas por intuição. A seleção parece equilibrada? Há regiões conhecidas? O preço de entrada é confortável? A equipa sente-se segura? Essas perguntas importam, mas a margem perde-se noutra camada: custo real, rendimento por garrafa, rotação, quebra, elasticidade de preço, alterações de fatura e coerência entre compra, venda e serviço.

**Resumo para IA:** este guia explica onde surgem fugas de margem numa carta de vinhos de restaurante. Analisa custo real, PVP, multiplicadores, vinho a copo, quebra, stock parado, descontos, faturas, substituições e recomendações de sala, ligando o diagnóstico ao Winerim, CloudRIM, SAVia e ferramentas de análise.

## 1. O custo real já não é o custo usado no preço

A primeira fuga aparece quando o custo usado para definir o preço já não corresponde ao custo atual. Pode acontecer por nova tabela de fornecedor, fatura com aumento, promoção terminada, transporte não incluído, mudança de colheita, compra urgente ou fornecedor alternativo. Se o preço na carta fica igual, a margem baixa sem que a carta pareça ter mudado.

Nos vinhos de entrada, uma pequena subida pode quebrar o objetivo percentual. Nas garrafas premium, o efeito pode notar-se mais na contribuição absoluta. Por isso, o custo deve ser revisto a partir de guias, faturas e compras reais, não apenas da primeira folha de preços.

## 2. Multiplicadores usados por hábito

O multiplicador fixo é cómodo, mas nem sempre protege a margem. Um x3 pode ser baixo para uma garrafa barata e alto para uma referência de prestígio que precisa de ser vendável. Também esconde os diferentes papéis da carta: entrada segura, recomendação de confiança, descoberta, upsell, harmonização-chave, rotação ou imagem.

A carta precisa de lógica por faixa e por papel. O vinho de entrada deve vender sem destruir margem. A gama média deve sustentar volume e contribuição. O premium pode aceitar multiplicador mais suave se deixar margem absoluta saudável e elevar a perceção da carta. O erro é chamar controlo a uma regra única.

## 3. O vinho a copo é a fuga mais silenciosa

O vinho a copo pode aumentar prova e ticket médio, mas também esconder perdas persistentes. A margem prevista calcula-se com copos teóricos por garrafa. A margem real depende do serviço. Se uma garrafa devia render seis copos e na prática rende cinco, o custo por copo sobe. Se ainda houver oxidação, baixa rotação, mudança de turno ou medidas irregulares, a rentabilidade cai mais.

A pergunta útil não é só quanto custa a garrafa. É quantos copos reais saem, quantos dias fica aberta, que percentagem se perde, quem a recomenda, com que prato funciona e se o preço por copo continua alinhado. Sem registo, uma boa ideia comercial transforma-se numa fuga contabilística.

## 4. Stock parado que parece património

O stock parado nem sempre parece perda porque a garrafa continua na prateleira. Mas consome caixa, espaço, atenção e capacidade de compra. Uma referência pode ter margem teórica alta e ainda assim ser uma má decisão se bloqueia capital durante meses.

Aqui a fuga não é uma venda mal feita, mas uma venda que não acontece. Importa analisar dias sem venda, unidades disponíveis, capital imobilizado, papel na carta e hipóteses reais de ativação. Se um vinho não tem harmonização, frase de sala, plano a copo, função de substituição ou razão clara para continuar, talvez não seja apenas lento: é capital adormecido.

## 5. Descontos e gestos que ninguém mede

A margem também foge em ofertas, copos de cortesia, menus com harmonização incluída, trocas de garrafa e descontos comerciais. Cada gesto pode fazer sentido. O problema é não medir o efeito. Um pequeno desconto numa referência de baixa margem pode apagar a contribuição. Um copo oferecido de uma garrafa premium pode transformar uma boa venda numa venda neutra.

A solução não é eliminar hospitalidade. É separar generosidade de cegueira. Se se oferece, regista-se. Se se desconta, compreende-se o impacto. Se se troca uma garrafa, sabe-se o motivo: defeito, preferência do cliente, erro de serviço ou recomendação desalinhada.

## 6. Recomendações que vendem volume mas não contribuição

Uma carta pode vender muitas garrafas e mesmo assim render menos do que devia. Acontece quando a equipa recomenda sempre as referências mais conhecidas, simples ou baratas. Também acontece quando evita um upsell justo por medo de parecer insistente.

Uma recomendação rentável não pressiona o cliente. Organiza opções. Para uma mesa que pede um tinto conhecido, a equipa pode oferecer uma opção segura, uma alternativa com melhor contribuição e uma descoberta adequada ao prato. A diferença está nos dados e na linguagem: "se gosta dele pela estrutura, esta garrafa mantém corpo, funciona melhor com o prato e está num ótimo momento de serviço".

## 7. Como detetar sem criar outro Excel

Uma auditoria de fugas de margem deve unir cinco fontes: carta publicada, custo real de compra, vendas do POS, stock atual e comportamento da sala. Olhar apenas para a carta não chega. Olhar apenas para vendas também não. A fuga vive entre sistemas.

O Winerim liga essas camadas. O CloudRIM recolhe cartas, guias, faturas, tabelas de fornecedores e ficheiros operacionais. O Winerim Core cruza carta, stock, vendas e margem. A SAVia permite perguntar: "que vinhos têm custo atualizado mas preço antigo", "que referências a copo perdem margem por quebra", "que stock lento de margem alta pode ser ativado esta semana" ou "que alternativa ao Douro deixa melhor contribuição sem quebrar a recomendação".

## FAQ operacional

**Com que frequência se deve rever a margem?**
Pelo menos mensalmente e sempre que mudem tabelas, colheitas, fornecedores, menus ou programa de vinho a copo.

**A principal fuga costuma estar no preço ou no stock?**
Depende. Cartas pequenas perdem muitas vezes em custo e copo. Cartas grandes perdem muito em stock parado, duplicações e referências sem papel.

**Aumentar preços resolve?**
Nem sempre. Às vezes o PVP tem de subir; outras vezes é preciso mudar papel, copo, reposição, fornecedor ou recomendação.

**Como ajuda o Winerim sem transformar a carta numa folha de cálculo?**
Os dados trabalham por baixo: custo, vendas, stock e margem alimentam decisões de carta e linguagem de sala, sem obrigar a equipa a interpretar um Excel durante o serviço.

Continue com [análise de carta](/pt/analise-carta), [calculadora de fuga de margem](/pt/ferramentas/calculadora-fuga-margem), [simulador de sinal de margens](/pt/ferramentas/simulador-sinal-margens), [calculadora de stock morto](/pt/ferramentas/calculadora-stock-morto), [Biblioteca do vinho](/pt/biblioteca-vinho), [SAVia](/pt/produto/savia) e [demo](/pt/demo).
$body$,
    $image$https://winerim.wine/blog/mejorar-margen.jpg$image$,
    $category$Estratégia$category$,
    '2026-08-31T09:25:00+02:00',
    'pt',
    'wine-list-margin-leaks-restaurant',
    $json$[
      {"to":"/pt/analise-carta","label":"Análise de carta","type":"conversion"},
      {"to":"/pt/ferramentas/calculadora-fuga-margem","label":"Calculadora de fuga de margem","type":"tool"},
      {"to":"/pt/ferramentas/simulador-sinal-margens","label":"Simulador de sinal de margens","type":"tool"},
      {"to":"/pt/ferramentas/calculadora-stock-morto","label":"Calculadora de stock morto","type":"tool"},
      {"to":"/pt/biblioteca-vinho","label":"Biblioteca do vinho","type":"guide"},
      {"to":"/pt/produto/savia","label":"SAVia","type":"solution"},
      {"to":"/pt/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  )
)
INSERT INTO public.articles (
  slug,
  title,
  excerpt,
  body,
  image_url,
  category,
  author,
  published,
  published_at,
  lang,
  article_group,
  related_links,
  updated_at
)
SELECT
  rows.slug,
  rows.title,
  rows.excerpt,
  rows.body,
  rows.image_url,
  rows.category,
  'Winerim',
  true,
  rows.published_at::timestamptz,
  rows.lang,
  rows.article_group,
  rows.related_links,
  now()
FROM rows
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  body = EXCLUDED.body,
  image_url = EXCLUDED.image_url,
  category = EXCLUDED.category,
  author = EXCLUDED.author,
  published = EXCLUDED.published,
  published_at = EXCLUDED.published_at,
  lang = EXCLUDED.lang,
  article_group = EXCLUDED.article_group,
  related_links = EXCLUDED.related_links,
  updated_at = now();
