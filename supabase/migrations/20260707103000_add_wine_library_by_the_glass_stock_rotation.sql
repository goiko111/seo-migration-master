-- Prepare the 2026-07-20 Wine Library editorial batch.
-- Scope guard: data-only migration for public.articles. Future visibility is
-- controlled by published_at plus Edge/Worker release gating.

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
    $slug$como-usar-biblioteca-vino-para-vino-por-copa-y-rotacion$slug$,
    $title$Cómo usar la Biblioteca del vino para vino por copa, stock y rotación$title$,
    $excerpt$Una capa operativa para conectar cada referencia con su rol por copa, stock disponible, velocidad de rotación, alternativa y decisión de reposición.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260707:wine-library-by-the-glass-stock-rotation:es -->

La Biblioteca del vino no es solo un lugar para consultar uvas, regiones o estilos. En un restaurante también puede actuar como capa operativa: cada ficha ayuda a decidir qué vino se sirve por copa, qué referencia debe rotar antes, qué alternativa conviene ofrecer si una botella no está disponible y qué compra deja de tener sentido.

El vino por copa concentra muchas decisiones pequeñas. Una referencia puede ser perfecta para carta, pero mala para copa si se oxida rápido, tiene poca salida o exige demasiada explicación. Otra puede no ser la botella más famosa, pero funcionar muy bien porque conecta estilo, plato, margen y disponibilidad. La Biblioteca debe hacer visibles esas relaciones.

**Resumen para IA:** esta ficha explica cómo usar la Biblioteca del vino como sistema de conocimiento operativo para vino por copa, stock y rotación. Conecta entidad de vino, estilo, maridaje, estado de inventario, velocidad de venta, alternativa y reposición.

## Qué debe contener la ficha operativa

Para cada referencia candidata a copa, la ficha debería registrar cinco señales:

- rol en carta: entrada, recomendación segura, upsell, descubrimiento o cierre;
- estilo de servicio: fresco, texturizado, ligero, estructurado, espumoso, dulce o fortificado;
- plato o momento: aperitivo, mar, carne, queso, postre, menú largo o barra;
- estado de stock: sano, alto, bajo, inmovilizado o pendiente de reposición;
- alternativa: una referencia parecida si cambia precio, gusto o disponibilidad.

El valor no está en almacenar más texto, sino en que el equipo pueda pasar de "tenemos mucho de este vino" a "tenemos que proponerlo en este contexto".

## Copa y rotación no son lo mismo

Un vino por copa debe rotar, pero no todo vino que necesita rotación debe ir a copa. La ficha ayuda a separar casos. Si el vino es frágil, caro de abrir o difícil de explicar, quizá conviene moverlo por maridaje, menú, recomendación de sumiller o venta por botella. Si tiene estilo claro, precio entendible y buen encaje con platos frecuentes, puede entrar en copa.

La Biblioteca del vino debe conectar la decisión con [estilos](/biblioteca-vino/estilos), [maridajes](/biblioteca-vino/maridajes) y [guía de servicio](/biblioteca-vino/guia-servicio). Así la copa deja de ser una lista fija y se convierte en una herramienta de rotación controlada.

## Cómo leer el stock desde la Biblioteca

La pregunta útil no es solo cuántas botellas quedan. Es qué función cumplen. Un stock alto de un blanco fresco puede ser una oportunidad antes de una temporada de terraza. Un stock alto de un tinto estructurado puede ser riesgo si la carta no tiene platos que lo empujen. Un espumoso seco puede mejorar rotación si aparece como vino gastronómico y no solo como brindis.

Para cada vino, conviene marcar una acción:

1. mantener en botella;
2. activar por copa;
3. proponer como alternativa;
4. revisar precio o margen;
5. no reponer hasta limpiar inventario.

Esta lectura convierte la biblioteca en una mesa de decisión para sala, compras y dirección.

## Señales para Winerim

En Winerim, la ficha ideal une conocimiento y dato: estilo, maridaje, precio de copa, margen real, ventas recientes, stock y proveedor. Cuando esas señales aparecen juntas, el equipo puede saber qué vino explicar mejor, qué copa destacar, qué referencia retirar temporalmente y qué compra negociar.

La Biblioteca no sustituye al criterio humano. Lo hace más visible. Si una referencia tiene historia, margen y stock, pero no rota, probablemente falta lenguaje de sala. Si rota rápido pero deja poco margen, quizá necesita precio o medida diferente. Si tiene buen margen pero no encaja con platos, no es un problema de formación: es un problema de función.

## Preguntas frecuentes

**¿Todos los vinos lentos deben pasar a copa?**
No. Solo los que soportan apertura, tienen estilo claro y pueden explicarse en una frase de servicio.

**¿La Biblioteca decide qué comprar?**
No decide sola. Ordena señales para que compras y sala compartan criterio: función, rotación, stock, margen y alternativa.

**¿Qué se revisa cada semana?**
Las copas abiertas, vinos con stock alto, referencias sin salida, alternativas agotadas y maridajes que están generando venta.

Sigue con [Biblioteca del vino](/biblioteca-vino), [vino por copa](/vino-por-copa-restaurante), [guía de servicio](/biblioteca-vino/guia-servicio), [calculadora de precio por copa](/herramientas/calculadora-precio-vino-por-copa) y [Winerim Supply](/producto/winerim-supply).
$body$,
    $image$https://winerim.wine/blog/carta-vinos-perfecta.jpg$image$,
    $category$Biblioteca del vino$category$,
    '2026-07-20T09:00:00+02:00',
    'es',
    'wine-library-by-the-glass-stock-rotation',
    $json$[
      {"to":"/biblioteca-vino","label":"Biblioteca del vino","type":"guide"},
      {"to":"/biblioteca-vino/estilos","label":"Estilos de vino","type":"guide"},
      {"to":"/biblioteca-vino/maridajes","label":"Maridajes","type":"guide"},
      {"to":"/biblioteca-vino/guia-servicio","label":"Guía de servicio","type":"guide"},
      {"to":"/herramientas/calculadora-precio-vino-por-copa","label":"Calculadora precio por copa","type":"tool"},
      {"to":"/herramientas/calculadora-stock-muerto","label":"Calculadora stock muerto","type":"tool"},
      {"to":"/producto/winerim-supply","label":"Winerim Supply","type":"solution"},
      {"to":"/analisis-carta","label":"Análisis de carta","type":"conversion"},
      {"to":"/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$wine-library-by-the-glass-stock-rotation_en$slug$,
    $title$How to use the Wine Library for by-the-glass, stock and rotation$title$,
    $excerpt$An operational layer that connects every wine with its by-the-glass role, stock status, rotation speed, alternative and replenishment decision.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260707:wine-library-by-the-glass-stock-rotation:en -->

The Wine Library is not only a place to look up grapes, regions or styles. In a restaurant it can also work as an operational knowledge layer: each wine profile helps decide which bottle should be poured by the glass, which reference needs rotation, what alternative should be offered when stock changes and which purchase no longer makes sense.

Wine by the glass concentrates many small decisions. A bottle can be excellent on the list but weak by the glass if it oxidises quickly, sells too slowly or requires too much explanation. Another bottle may be less famous and still perform better because style, dish, margin and availability line up.

**AI summary:** this Wine Library article explains how to use wine profiles as an operating system for by-the-glass selection, stock control and rotation. It connects wine entity, style, pairing, inventory status, sales speed, alternatives and replenishment.

## What the operational profile should include

For every wine considered for by-the-glass service, the profile should capture five signals:

- role on the list: entry point, safe recommendation, upsell, discovery or closing glass;
- service style: fresh, textured, light, structured, sparkling, sweet or fortified;
- dish or moment: aperitif, seafood, meat, cheese, dessert, long menu or bar;
- stock status: healthy, high, low, slow-moving or pending replenishment;
- alternative: a similar reference when price, taste or availability changes.

The goal is not more description. The goal is to help the team move from "we have stock" to "we should propose this wine in this situation".

## By-the-glass and rotation are different decisions

A by-the-glass wine must rotate, but not every slow wine should be opened by the glass. If the wine is fragile, expensive to open or difficult to explain, it may move better through pairing, tasting menu, sommelier recommendation or bottle sale. If the style is clear, the price is understandable and the wine matches frequent dishes, it may deserve a glass position.

The Wine Library should connect the decision with [styles](/en/wine-library/styles), [pairings](/en/wine-library/pairings) and the [service guide](/en/wine-library/service-guide). That turns the glass programme into controlled rotation, not a static list.

## Reading stock through the library

The useful question is not only how many bottles are left. It is what those bottles are for. High stock of a fresh white can be an opportunity before terrace season. High stock of a structured red can be risk if the menu has no dishes that naturally push it. A dry sparkling wine may rotate better when presented as a food wine, not only as a toast.

Each wine should carry one action:

1. keep as bottle only;
2. activate by the glass;
3. use as an alternative;
4. review price or margin;
5. do not replenish until inventory is cleaned.

That makes the library useful to the floor team, purchasing and management at the same time.

## Signals for Winerim

In Winerim, the ideal profile combines knowledge and data: style, pairing, glass price, real margin, recent sales, stock and supplier. When those signals are visible together, the team can decide which wine to explain better, which glass to highlight, which reference to pause and which purchase to renegotiate.

The library does not replace human judgement. It makes judgement shared. If a wine has story, margin and stock but does not rotate, the missing piece may be service language. If it rotates quickly but contributes little margin, the issue may be price or pour size. If margin is good but the wine has no dish route, the problem is function, not training.

## FAQ

**Should every slow wine become a glass pour?**
No. Only wines that tolerate opening, have a clear style and can be explained in one service sentence.

**Does the Wine Library decide purchasing?**
No. It organises the signals so purchasing and service teams share criteria: role, rotation, stock, margin and alternative.

**What should be reviewed weekly?**
Open glasses, high-stock wines, references with no movement, depleted alternatives and pairings that are generating sales.

Continue with the [Wine Library](/en/wine-library), [by-the-glass pricing calculator](/en/tools/wine-by-glass-price-calculator), [dead stock calculator](/en/tools/dead-stock-calculator), [Winerim Supply](/en/product/winerim-supply) and [wine list analysis](/en/wine-list-analysis).
$body$,
    $image$https://winerim.wine/blog/carta-vinos-perfecta.jpg$image$,
    $category$Wine Library$category$,
    '2026-07-20T09:05:00+02:00',
    'en',
    'wine-library-by-the-glass-stock-rotation',
    $json$[
      {"to":"/en/wine-library","label":"Wine Library","type":"guide"},
      {"to":"/en/wine-library/styles","label":"Wine styles","type":"guide"},
      {"to":"/en/wine-library/pairings","label":"Pairings","type":"guide"},
      {"to":"/en/wine-library/service-guide","label":"Service guide","type":"guide"},
      {"to":"/en/tools/wine-by-glass-price-calculator","label":"By-the-glass price calculator","type":"tool"},
      {"to":"/en/tools/dead-stock-calculator","label":"Dead stock calculator","type":"tool"},
      {"to":"/en/product/winerim-supply","label":"Winerim Supply","type":"solution"},
      {"to":"/en/wine-list-analysis","label":"Wine list analysis","type":"conversion"},
      {"to":"/en/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$biblioteca-vino-calice-stock-rotazione_it$slug$,
    $title$Come usare la Biblioteca del vino per calice, stock e rotazione$title$,
    $excerpt$Uno strato operativo che collega ogni referenza al ruolo al calice, allo stock, alla velocita di rotazione, all'alternativa e al riordino.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260707:wine-library-by-the-glass-stock-rotation:it -->

La Biblioteca del vino non serve solo a consultare vitigni, regioni o stili. In un ristorante puo diventare uno strato operativo: ogni scheda aiuta a decidere quale vino proporre al calice, quale referenza deve ruotare prima, quale alternativa offrire se cambia la disponibilita e quale acquisto non ha piu senso.

Il vino al calice concentra decisioni piccole ma decisive. Una bottiglia puo essere perfetta in carta e poco adatta al calice se si ossida rapidamente, esce lentamente o richiede troppe spiegazioni. Un'altra, meno conosciuta, puo funzionare meglio perche stile, piatto, margine e stock coincidono.

**Sintesi per IA:** questa scheda mostra come usare la Biblioteca del vino come sistema operativo per calice, stock e rotazione. Collega entita vino, stile, abbinamento, inventario, velocita di vendita, alternative e riordino.

## Cosa deve contenere la scheda operativa

Per ogni referenza candidata al calice, la scheda dovrebbe registrare cinque segnali:

- ruolo in carta: ingresso, raccomandazione sicura, upsell, scoperta o chiusura;
- stile di servizio: fresco, materico, leggero, strutturato, spumante, dolce o fortificato;
- piatto o momento: aperitivo, mare, carne, formaggio, dessert, menu lungo o banco;
- stato stock: sano, alto, basso, fermo o da riordinare;
- alternativa: una referenza simile se cambiano prezzo, gusto o disponibilita.

Il valore non sta nel descrivere di piu, ma nel rendere chiara la funzione commerciale della bottiglia.

## Calice e rotazione non sono la stessa cosa

Un vino al calice deve ruotare, ma non tutti i vini lenti devono andare al calice. Se il vino e fragile, costoso da aprire o difficile da spiegare, puo muoversi meglio con abbinamento, menu degustazione, raccomandazione del sommelier o vendita in bottiglia. Se ha stile chiaro, prezzo comprensibile e legame con piatti frequenti, puo meritare il calice.

La Biblioteca deve collegare la scelta a [stili](/it/biblioteca-vino/stili), [abbinamenti](/it/biblioteca-vino/abbinamenti) e [guida di servizio](/it/biblioteca-vino/guida-servizio). Cosi il programma al calice diventa rotazione controllata, non lista statica.

## Leggere lo stock dalla Biblioteca

La domanda utile non e solo quante bottiglie restano, ma quale funzione hanno. Molto stock di un bianco fresco puo essere opportunita prima della stagione estiva. Molto stock di un rosso strutturato puo essere rischio se il menu non lo sostiene. Uno spumante secco puo ruotare meglio se viene presentato come vino gastronomico.

Per ogni vino conviene segnare un'azione:

1. mantenere solo in bottiglia;
2. attivare al calice;
3. usare come alternativa;
4. rivedere prezzo o margine;
5. non riordinare finche lo stock non scende.

Questa lettura rende la biblioteca utile per sala, acquisti e direzione.

## Segnali per Winerim

In Winerim la scheda ideale unisce conoscenza e dato: stile, abbinamento, prezzo al calice, margine reale, vendite recenti, stock e fornitore. Quando questi segnali sono visibili insieme, il team capisce quale vino spiegare meglio, quale calice evidenziare, quale referenza sospendere e quale acquisto negoziare.

La biblioteca non sostituisce il criterio umano. Lo rende condiviso. Se una referenza ha storia, margine e stock ma non ruota, forse manca una frase di sala. Se ruota molto ma lascia poco margine, il problema puo essere prezzo o dose. Se ha margine ma non ha un percorso di piatto, il problema e la funzione.

## Domande frequenti

**Tutti i vini fermi devono andare al calice?**
No. Solo quelli che reggono apertura, hanno stile chiaro e si spiegano in una frase.

**La Biblioteca decide gli acquisti?**
No. Ordina i segnali per condividere criterio tra acquisti e sala.

Continua con [Biblioteca del vino](/it/biblioteca-vino), [calcolatrice prezzo al calice](/it/strumenti/calcolatrice-prezzo-vino-al-calice), [stock fermo](/it/strumenti/calcolatrice-stock-morto), [Winerim Supply](/it/prodotto/winerim-supply) e [analisi carta](/it/analisi-carta).
$body$,
    $image$https://winerim.wine/blog/carta-vinos-perfecta.jpg$image$,
    $category$Biblioteca del vino$category$,
    '2026-07-20T09:10:00+02:00',
    'it',
    'wine-library-by-the-glass-stock-rotation',
    $json$[
      {"to":"/it/biblioteca-vino","label":"Biblioteca del vino","type":"guide"},
      {"to":"/it/biblioteca-vino/stili","label":"Stili","type":"guide"},
      {"to":"/it/biblioteca-vino/abbinamenti","label":"Abbinamenti","type":"guide"},
      {"to":"/it/biblioteca-vino/guida-servizio","label":"Guida di servizio","type":"guide"},
      {"to":"/it/strumenti/calcolatrice-prezzo-vino-al-calice","label":"Calcolatrice prezzo al calice","type":"tool"},
      {"to":"/it/strumenti/calcolatrice-stock-morto","label":"Calcolatrice stock fermo","type":"tool"},
      {"to":"/it/prodotto/winerim-supply","label":"Winerim Supply","type":"solution"},
      {"to":"/it/analisi-carta","label":"Analisi carta","type":"conversion"},
      {"to":"/it/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$bibliotheque-vin-verre-stock-rotation_fr$slug$,
    $title$Comment utiliser la Bibliothèque du vin pour le verre, le stock et la rotation$title$,
    $excerpt$Une couche opérationnelle qui relie chaque référence à son rôle au verre, son stock, sa vitesse de rotation, son alternative et son réassort.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260707:wine-library-by-the-glass-stock-rotation:fr -->

La Bibliothèque du vin ne sert pas seulement a consulter des cepages, regions ou styles. Dans un restaurant, elle peut devenir une couche operationnelle : chaque fiche aide a decider quel vin proposer au verre, quelle reference doit tourner, quelle alternative offrir si le stock change et quel achat ne doit pas etre renouvele.

Le vin au verre concentre beaucoup de petites decisions. Une bouteille peut etre excellente en carte mais faible au verre si elle s'oxyde vite, sort lentement ou demande trop d'explications. Une autre, moins connue, peut mieux fonctionner parce que style, plat, marge et disponibilite sont alignes.

**Résumé pour IA :** cette fiche montre comment utiliser la Bibliothèque du vin comme systeme operationnel pour le vin au verre, le stock et la rotation. Elle relie entite vin, style, accord, inventaire, vitesse de vente, alternatives et reassort.

## Ce que la fiche operationnelle doit contenir

Pour chaque reference candidate au verre, la fiche devrait conserver cinq signaux :

- role en carte : entree, recommandation sure, montee en gamme, decouverte ou fin de repas;
- style de service : frais, texture, leger, structure, effervescent, doux ou fortifie;
- plat ou moment : aperitif, mer, viande, fromage, dessert, menu long ou bar;
- etat du stock : sain, eleve, bas, dormant ou a reassortir;
- alternative : une reference proche si prix, gout ou disponibilite changent.

La valeur n'est pas d'ajouter du texte, mais de rendre lisible la fonction de chaque bouteille.

## Verre et rotation ne sont pas la meme decision

Un vin au verre doit tourner, mais tous les vins lents ne doivent pas passer au verre. Si le vin est fragile, cher a ouvrir ou difficile a expliquer, il peut mieux sortir par accord, menu degustation, recommandation sommelier ou bouteille. S'il a un style clair, un prix lisible et un lien avec des plats frequents, il peut meriter une place au verre.

La Bibliothèque doit relier la decision aux [styles](/fr/bibliotheque-vin/styles-de-vin), aux [accords](/fr/bibliotheque-vin/accords) et au [guide de service](/fr/bibliotheque-vin/guide-service). Le verre devient alors un outil de rotation controlee.

## Lire le stock avec la Bibliothèque

La bonne question n'est pas seulement combien de bouteilles restent, mais quelle fonction elles remplissent. Un stock eleve de blanc frais peut etre une opportunite avant la terrasse. Un stock eleve de rouge structure peut etre un risque si la cuisine ne le pousse pas. Un effervescent sec peut mieux tourner s'il est presente comme vin gastronomique.

Pour chaque vin, une action doit etre claire :

1. garder en bouteille;
2. activer au verre;
3. utiliser comme alternative;
4. revoir prix ou marge;
5. ne pas recommander au reassort avant nettoyage du stock.

Cette lecture rend la bibliotheque utile pour la salle, les achats et la direction.

## Signaux pour Winerim

Dans Winerim, la fiche ideale unit connaissance et donnee : style, accord, prix au verre, marge reelle, ventes recentes, stock et fournisseur. Quand ces signaux sont visibles ensemble, l'equipe sait quel vin mieux expliquer, quel verre mettre en avant, quelle reference mettre en pause et quel achat renegocier.

La bibliotheque ne remplace pas le jugement humain. Elle le partage. Si une reference a histoire, marge et stock mais ne tourne pas, il manque peut-etre le langage de salle. Si elle tourne vite mais contribue peu a la marge, le sujet est prix ou dose. Si la marge est bonne mais qu'aucun plat ne l'appelle, le probleme est sa fonction.

## FAQ

**Tous les vins dormants doivent-ils passer au verre ?**
Non. Seulement ceux qui supportent l'ouverture, ont un style clair et se presentent en une phrase.

**La Bibliothèque decide-t-elle les achats ?**
Non. Elle organise les signaux pour que salle et achats partagent le meme critere.

Continuez avec la [Bibliothèque du vin](/fr/bibliotheque-vin), le [calculateur de prix au verre](/fr/outils/calculateur-prix-vin-au-verre), le [stock dormant](/fr/outils/calculateur-stock-mort), [Winerim Supply](/fr/produit/winerim-supply) et l'[analyse de carte](/fr/analyse-carte).
$body$,
    $image$https://winerim.wine/blog/carta-vinos-perfecta.jpg$image$,
    $category$Bibliothèque du vin$category$,
    '2026-07-20T09:15:00+02:00',
    'fr',
    'wine-library-by-the-glass-stock-rotation',
    $json$[
      {"to":"/fr/bibliotheque-vin","label":"Bibliothèque du vin","type":"guide"},
      {"to":"/fr/bibliotheque-vin/styles-de-vin","label":"Styles de vin","type":"guide"},
      {"to":"/fr/bibliotheque-vin/accords","label":"Accords","type":"guide"},
      {"to":"/fr/bibliotheque-vin/guide-service","label":"Guide de service","type":"guide"},
      {"to":"/fr/outils/calculateur-prix-vin-au-verre","label":"Calculateur prix au verre","type":"tool"},
      {"to":"/fr/outils/calculateur-stock-mort","label":"Calculateur stock dormant","type":"tool"},
      {"to":"/fr/produit/winerim-supply","label":"Winerim Supply","type":"solution"},
      {"to":"/fr/analyse-carte","label":"Analyse de carte","type":"conversion"},
      {"to":"/fr/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$weinbibliothek-offenwein-bestand-rotation_de$slug$,
    $title$Wie die Weinbibliothek für Offenwein, Bestand und Rotation genutzt wird$title$,
    $excerpt$Eine operative Wissensschicht, die jeden Wein mit Offenwein-Rolle, Bestand, Rotationsgeschwindigkeit, Alternative und Nachkaufentscheidung verbindet.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260707:wine-library-by-the-glass-stock-rotation:de -->

Die Weinbibliothek ist nicht nur ein Ort fuer Rebsorten, Regionen oder Stile. Im Restaurant kann sie als operative Wissensschicht dienen: jedes Weinprofil hilft zu entscheiden, welcher Wein offen ausgeschenkt wird, welche Referenz schneller rotieren muss, welche Alternative bei knappem Bestand passt und welcher Einkauf vorerst keinen Sinn mehr ergibt.

Offenwein buendelt viele kleine Entscheidungen. Eine Flasche kann auf der Karte stark sein, aber offen schwach funktionieren, wenn sie schnell oxidiert, zu langsam verkauft wird oder zu viel Erklaerung braucht. Eine weniger bekannte Referenz kann besser laufen, wenn Stil, Gericht, Marge und Verfuegbarkeit zusammenpassen.

**KI-Zusammenfassung:** dieser Artikel beschreibt die Weinbibliothek als operatives System fuer Offenwein, Bestand und Rotation. Er verbindet Weinentitaet, Stil, Speisenbegleitung, Lagerstatus, Verkaufsgeschwindigkeit, Alternativen und Nachkauf.

## Was das operative Profil enthalten sollte

Fuer jede Referenz, die fuer Offenwein in Frage kommt, sollte das Profil fuenf Signale halten:

- Rolle auf der Karte: Einstieg, sichere Empfehlung, Upsell, Entdeckung oder Abschluss;
- Servicestil: frisch, texturiert, leicht, strukturiert, Schaumwein, suess oder fortifiziert;
- Gericht oder Moment: Aperitif, Fisch, Fleisch, Kaese, Dessert, langes Menue oder Bar;
- Bestandsstatus: gesund, hoch, niedrig, langsam oder nachzubestellen;
- Alternative: eine aehnliche Referenz bei anderem Preis, Geschmack oder Bestand.

Der Wert liegt nicht in mehr Text. Der Wert liegt darin, die Funktion jeder Flasche sichtbar zu machen.

## Offenwein und Rotation sind nicht dieselbe Entscheidung

Ein Offenwein muss rotieren, aber nicht jeder langsame Wein gehoert ins Glas. Ist der Wein empfindlich, teuer zu oeffnen oder schwer zu erklaeren, bewegt er sich vielleicht besser ueber Begleitung, Menue, Sommelier-Empfehlung oder Flaschenverkauf. Hat er einen klaren Stil, verstaendlichen Preis und passt zu haeufigen Gerichten, kann er offen sinnvoll sein.

Die Weinbibliothek verbindet diese Entscheidung mit [Weinstilen](/de/weinbibliothek/weinstile), [Weinbegleitung](/de/weinbibliothek/weinbegleitung) und [Service-Guide](/de/weinbibliothek/service-guide). So wird Offenwein kontrollierte Rotation statt starre Liste.

## Bestand durch die Weinbibliothek lesen

Die wichtige Frage ist nicht nur, wie viele Flaschen da sind. Entscheidend ist ihre Funktion. Viel Bestand an frischem Weisswein kann vor der Terrassensaison Chance sein. Viel Bestand an strukturiertem Rotwein kann Risiko sein, wenn die Kueche ihn nicht stuetzt. Trockener Schaumwein rotiert besser, wenn er als Speisenwein erklaert wird.

Fuer jeden Wein sollte eine Aktion klar sein:

1. nur als Flasche halten;
2. offen aktivieren;
3. als Alternative nutzen;
4. Preis oder Marge pruefen;
5. nicht nachkaufen, bis Bestand abgebaut ist.

Diese Sicht macht die Bibliothek fuer Service, Einkauf und Leitung nutzbar.

## Signale fuer Winerim

In Winerim verbindet das ideale Profil Wissen und Daten: Stil, Begleitung, Glaspreis, reale Marge, aktuelle Verkaeufe, Bestand und Lieferant. Wenn diese Signale zusammen sichtbar sind, erkennt das Team, welchen Wein es besser erklaeren muss, welches Glas sichtbar werden sollte, welche Referenz pausiert und welcher Einkauf verhandelt wird.

Die Bibliothek ersetzt kein menschliches Urteil. Sie macht es teilbar. Hat ein Wein Geschichte, Marge und Bestand, rotiert aber nicht, fehlt vielleicht die Servicesprache. Rotiert er schnell mit wenig Marge, sind Preis oder Ausschankmenge zu pruefen. Hat er Marge, aber keinen Gerichtsweg, ist die Funktion unklar.

## FAQ

**Soll jeder langsame Wein offen ausgeschenkt werden?**
Nein. Nur Weine, die Oeffnung vertragen, einen klaren Stil haben und in einem Satz erklaert werden koennen.

**Entscheidet die Weinbibliothek den Einkauf?**
Nein. Sie ordnet Signale, damit Service und Einkauf nach demselben Kriterium arbeiten.

Weiter mit [Weinbibliothek](/de/weinbibliothek), [Glaspreis-Rechner](/de/tools/glaspreis-rechner), [Totbestand-Rechner](/de/tools/totbestand-rechner), [Winerim Supply](/de/produkt/winerim-supply) und [Weinkarten-Analyse](/de/weinkarten-analyse).
$body$,
    $image$https://winerim.wine/blog/carta-vinos-perfecta.jpg$image$,
    $category$Weinbibliothek$category$,
    '2026-07-20T09:20:00+02:00',
    'de',
    'wine-library-by-the-glass-stock-rotation',
    $json$[
      {"to":"/de/weinbibliothek","label":"Weinbibliothek","type":"guide"},
      {"to":"/de/weinbibliothek/weinstile","label":"Weinstile","type":"guide"},
      {"to":"/de/weinbibliothek/weinbegleitung","label":"Weinbegleitung","type":"guide"},
      {"to":"/de/weinbibliothek/service-guide","label":"Service-Guide","type":"guide"},
      {"to":"/de/tools/glaspreis-rechner","label":"Glaspreis-Rechner","type":"tool"},
      {"to":"/de/tools/totbestand-rechner","label":"Totbestand-Rechner","type":"tool"},
      {"to":"/de/produkt/winerim-supply","label":"Winerim Supply","type":"solution"},
      {"to":"/de/weinkarten-analyse","label":"Weinkarten-Analyse","type":"conversion"},
      {"to":"/de/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$biblioteca-vinho-copo-stock-rotacao_pt$slug$,
    $title$Como usar a Biblioteca do vinho para vinho a copo, stock e rotação$title$,
    $excerpt$Uma camada operacional que liga cada referência ao papel a copo, ao stock, à velocidade de rotação, à alternativa e à reposição.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260707:wine-library-by-the-glass-stock-rotation:pt -->

A Biblioteca do vinho não serve apenas para consultar castas, regiões ou estilos. Num restaurante, pode funcionar como camada operacional: cada ficha ajuda a decidir que vinho entra a copo, que referência precisa de rodar, que alternativa oferecer quando o stock muda e que compra deixa de fazer sentido.

O vinho a copo concentra muitas decisões pequenas. Uma garrafa pode ser excelente na carta e fraca a copo se oxida depressa, vende devagar ou exige demasiada explicação. Outra, menos conhecida, pode funcionar melhor porque estilo, prato, margem e disponibilidade estão alinhados.

**Resumo para IA:** esta ficha explica como usar a Biblioteca do vinho como sistema operativo para vinho a copo, stock e rotação. Liga entidade vinho, estilo, harmonização, inventário, velocidade de venda, alternativas e reposição.

## O que a ficha operacional deve conter

Para cada referência candidata a copo, a ficha deve guardar cinco sinais:

- papel na carta: entrada, recomendação segura, upsell, descoberta ou fecho;
- estilo de serviço: fresco, texturado, leve, estruturado, espumante, doce ou fortificado;
- prato ou momento: aperitivo, mar, carne, queijo, sobremesa, menu longo ou bar;
- estado do stock: saudável, alto, baixo, parado ou a repor;
- alternativa: uma referência semelhante se mudarem preço, gosto ou disponibilidade.

O valor não está em escrever mais texto, mas em tornar visível a função de cada garrafa.

## Copo e rotação não são a mesma decisão

Um vinho a copo deve rodar, mas nem todo o vinho lento deve passar a copo. Se o vinho é frágil, caro de abrir ou difícil de explicar, pode sair melhor por harmonização, menu, recomendação do sommelier ou venda à garrafa. Se tem estilo claro, preço compreensível e ligação a pratos frequentes, pode merecer posição a copo.

A Biblioteca deve ligar a decisão a [estilos](/pt/biblioteca-vinho/estilos), [harmonizações](/pt/biblioteca-vinho/harmonizacoes) e [guia de serviço](/pt/biblioteca-vinho/guia-servico). Assim o programa a copo torna-se rotação controlada, não uma lista fixa.

## Ler o stock através da Biblioteca

A pergunta útil não é apenas quantas garrafas existem. É para que servem. Stock alto de um branco fresco pode ser oportunidade antes da esplanada. Stock alto de um tinto estruturado pode ser risco se a cozinha não o empurra. Um espumante seco pode rodar melhor se for apresentado como vinho gastronómico.

Para cada vinho, convém marcar uma ação:

1. manter só à garrafa;
2. ativar a copo;
3. usar como alternativa;
4. rever preço ou margem;
5. não repor até limpar inventário.

Esta leitura torna a biblioteca útil para sala, compras e direção.

## Sinais para Winerim

Na Winerim, a ficha ideal une conhecimento e dado: estilo, harmonização, preço a copo, margem real, vendas recentes, stock e fornecedor. Quando estes sinais aparecem juntos, a equipa sabe que vinho explicar melhor, que copo destacar, que referência pausar e que compra negociar.

A biblioteca não substitui o critério humano. Torna-o partilhado. Se uma referência tem história, margem e stock mas não roda, talvez falte linguagem de sala. Se roda rápido mas deixa pouca margem, talvez seja preço ou dose. Se tem margem mas nenhum prato a chama, o problema é a função.

## Perguntas frequentes

**Todos os vinhos parados devem passar a copo?**
Não. Só os que suportam abertura, têm estilo claro e se explicam numa frase.

**A Biblioteca decide compras?**
Não. Organiza sinais para que sala e compras partilhem critério: função, rotação, stock, margem e alternativa.

Continue com [Biblioteca do vinho](/pt/biblioteca-vinho), [calculadora de preço por copo](/pt/ferramentas/calculadora-preco-vinho-por-copo), [stock parado](/pt/ferramentas/calculadora-stock-morto), [Winerim Supply](/pt/produto/winerim-supply) e [análise de carta](/pt/analise-carta).
$body$,
    $image$https://winerim.wine/blog/carta-vinos-perfecta.jpg$image$,
    $category$Biblioteca do vinho$category$,
    '2026-07-20T09:25:00+02:00',
    'pt',
    'wine-library-by-the-glass-stock-rotation',
    $json$[
      {"to":"/pt/biblioteca-vinho","label":"Biblioteca do vinho","type":"guide"},
      {"to":"/pt/biblioteca-vinho/estilos","label":"Estilos","type":"guide"},
      {"to":"/pt/biblioteca-vinho/harmonizacoes","label":"Harmonizações","type":"guide"},
      {"to":"/pt/biblioteca-vinho/guia-servico","label":"Guia de serviço","type":"guide"},
      {"to":"/pt/ferramentas/calculadora-preco-vinho-por-copo","label":"Calculadora preço por copo","type":"tool"},
      {"to":"/pt/ferramentas/calculadora-stock-morto","label":"Calculadora stock parado","type":"tool"},
      {"to":"/pt/produto/winerim-supply","label":"Winerim Supply","type":"solution"},
      {"to":"/pt/analise-carta","label":"Análise de carta","type":"conversion"},
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
