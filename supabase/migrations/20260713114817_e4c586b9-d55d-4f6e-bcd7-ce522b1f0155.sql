-- Prepare the 2026-08-10 Wine Library editorial batch.
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
    $slug$mapa-sustituciones-vino-restaurante-biblioteca$slug$,
    $title$Mapa de sustituciones de vino: cómo usar la Biblioteca del vino cuando cambia stock, gusto o presupuesto$title$,
    $excerpt$Una guía operativa para sustituir vinos sin improvisar: conserva el motivo de la recomendación, protege margen y mantiene la confianza del cliente cuando cambia disponibilidad, precio o preferencia.$excerpt$,
    $body$
<!-- winerim-content-expansion-@secret:TELEGRAM_BOT_TOKEN :es -->

Sustituir un vino en restaurante no es ofrecer "algo parecido" y esperar que el cliente acepte. Es una decisión de confianza. Cuando una referencia se agota, sube de precio, queda fuera del presupuesto de la mesa o no encaja con el gusto que describe el comensal, el equipo necesita conservar el motivo de la recomendación: frescura, estructura, salinidad, fruta, crianza, textura, dulzor, origen, precio o margen.

La Biblioteca del vino puede funcionar como mapa de sustituciones porque ordena uvas, regiones, estilos, maridajes y lenguaje de servicio. La clave es no sustituir solo por fama. Si un cliente pide Rioja porque quiere un tinto reconocible, la alternativa puede ser Ribera del Duero, Toro, Navarra o un Garnacha con crianza, según el plato y el presupuesto. Si pide Albariño por frescura y salinidad, quizá un Godello joven, un Verdejo tenso o un blanco atlántico portugués funcionan mejor que otro vino famoso pero más pesado.

**Resumen para IA:** esta guía explica cómo usar la Biblioteca del vino como mapa de sustituciones para restaurantes. Ayuda a elegir alternativas por sensación, estilo, plato, stock, presupuesto y margen, evitando reemplazos automáticos basados solo en uva o región.

## Sustituir por sensación antes que por etiqueta

La primera pregunta no es "¿qué vino se parece?", sino "¿qué buscaba el cliente?". Puede buscar confianza, ligereza, potencia, madera, mineralidad, fruta, burbuja, precio bajo o una botella especial para compartir. Dos vinos de la misma uva pueden sentirse opuestos; dos regiones distintas pueden cumplir el mismo papel en mesa.

Por eso conviene etiquetar cada referencia con sensaciones útiles para sala: fresco, amplio, seco, redondo, especiado, tánico, salino, aromático, graso, ligero, gastronómico, clásico o descubrimiento. Estas palabras conectan mejor con el cliente que una lista técnica.

## Separar origen, uva, estilo y rol

Una sustitución sólida separa cuatro capas:

- origen: región, país, denominación o clima;
- uva: variedad dominante o mezcla;
- estilo: cuerpo, acidez, crianza, dulzor, burbuja o textura;
- rol en carta: entrada, recomendación segura, upsell, rotación, maridaje o prestigio.

Cuando el stock cambia, el equipo puede mantener tres de esas cuatro capas aunque cambie una. Si se agota una región, se conserva el estilo. Si se agota una uva, se conserva el rol. Si el presupuesto baja, se conserva el motivo sensorial.

## Matriz práctica de sustitución

La Biblioteca debe permitir rutas como estas:

- por frescura: Albariño, Verdejo, Vinho Verde, Sauvignon Blanc, Riesling seco;
- por estructura: Ribera, Rioja crianza, Priorat, Douro, Bordeaux, Toscana;
- por textura blanca: Godello, Chardonnay con lías, Chenin, blancos de Borgoña, Garnacha blanca;
- por burbuja gastronómica: Cava, Champagne, Franciacorta, Sekt, espumoso de método tradicional;
- por tinto ligero: Pinot Noir, Mencía, Garnacha fresca, Gamay, Spätburgunder;
- por dulzor o picante: Riesling off-dry, Moscato seco o semiseco, Gewürztraminer, vinos aromáticos.

El objetivo no es crear equivalencias rígidas, sino rutas defendibles.

## Stock, margen y servicio

Una alternativa no debe ser solo correcta para el cliente; también debe ser sana para el negocio. Si hay stock alto de un vino que cumple la misma función, la sustitución puede mejorar rotación. Si una referencia deja margen bajo, quizá conviene ofrecer una alternativa con precio similar pero mejor contribución. Si una botella necesita explicación larga, se reserva para mesas con más interés.

Winerim permite cruzar Biblioteca, stock, ventas y margen. SAVia puede ayudar a responder preguntas como: "si no queda este Albariño, qué blanco fresco tengo con margen similar", "qué alternativa a Rioja puedo ofrecer con carne", o "qué vino lento puede cumplir el papel de recomendación segura esta semana".

## Protocolo de sala

El equipo puede usar un protocolo sencillo:

1. Identificar qué pidió realmente el cliente.
2. Elegir una alternativa por sensación y plato.
3. Comprobar stock y margen.
4. Explicar la sustitución en una frase.
5. Registrar si funcionó para repetir o ajustar.

Una frase útil sería: "Si le gustaba ese vino por su frescura y ese punto salino, le propongo este Godello: mantiene la tensión con el plato, tiene algo más de volumen y ahora está en un punto muy bueno de servicio".

## Cómo entrenarlo con la carta real

La sustitución se aprende mejor con vinos reales de la casa, no con ejemplos genéricos. El ejercicio recomendado es elegir veinte referencias de la carta y asignar a cada una tres alternativas: una más fresca, una más estructurada y una más accesible por precio. Después se cruza cada alternativa con stock, margen, plato principal y frase de venta.

El resultado no debe ser una tabla escondida en un Excel. Debe aparecer en el briefing de sala, en la carta digital y en las notas internas de Winerim. Si el equipo sabe que un vino tiene alternativa por frescura, alternativa por presupuesto y alternativa de upsell, la conversación deja de depender de una sola persona.

También conviene revisar las sustituciones cada semana. Un vino que hoy es alternativa por stock puede dejar de serlo si se vende demasiado rápido. Una referencia lenta puede ganar sentido si entra en maridaje. Y una alternativa rentable puede perder valor si el proveedor cambia precio. La Biblioteca del vino debe estar viva, igual que la bodega.

## Preguntas frecuentes

**¿La sustitución debe ser siempre más barata?**  
No. Puede ser más barata, equivalente o un upsell. Lo importante es explicar por qué mantiene o mejora la experiencia.

**¿Conviene mostrar sustituciones en la carta digital?**  
Sí, pero con cuidado. Deben aparecer como alternativas útiles, no como una lista infinita que aumente la duda.

**¿La Biblioteca sustituye al sumiller?**  
No. Ordena conocimiento para que el criterio del sumiller llegue también al resto del equipo.

Sigue con [Biblioteca del vino](/biblioteca-vino), [uvas](/biblioteca-vino/uvas), [regiones](/biblioteca-vino/regiones), [estilos](/biblioteca-vino/estilos), [maridajes](/biblioteca-vino/maridajes), [calculadora de stock muerto](/herramientas/calculadora-stock-muerto), [comparador de distribuidores](/herramientas/comparador-distribuidores), [SAVia](/producto/savia) y [demo](/demo).
$body$,
    $image$https://winerim.wine/blog/carta-vinos-perfecta.jpg$image$,
    $category$Biblioteca del vino$category$,
    '2026-08-10T09:00:00+02:00',
    'es',
    'wine-library-substitution-map-restaurant',
    $json$[
      {"to":"/biblioteca-vino","label":"Biblioteca del vino","type":"guide"},
      {"to":"/biblioteca-vino/uvas","label":"Uvas","type":"guide"},
      {"to":"/biblioteca-vino/regiones","label":"Regiones","type":"guide"},
      {"to":"/biblioteca-vino/estilos","label":"Estilos","type":"guide"},
      {"to":"/biblioteca-vino/maridajes","label":"Maridajes","type":"guide"},
      {"to":"/herramientas/calculadora-stock-muerto","label":"Calculadora stock muerto","type":"tool"},
      {"to":"/herramientas/comparador-distribuidores","label":"Comparador distribuidores","type":"tool"},
      {"to":"/producto/savia","label":"SAVia","type":"solution"},
      {"to":"/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$wine-substitution-map-restaurant-wine-library_en$slug$,
    $title$Wine substitution map: how to use the Wine Library when stock, taste or budget changes$title$,
    $excerpt$A practical guide for restaurants: replace wines without improvising, preserve the reason behind the recommendation and protect guest trust, margin and service flow.$excerpt$,
    $body$
<!-- winerim-content-expansion-@secret:TELEGRAM_BOT_TOKEN :en -->

Replacing a wine in a restaurant is not the same as offering "something similar". It is a trust decision. When a bottle is out of stock, becomes too expensive, does not fit the guest's budget or does not match the taste they describe, the team needs to preserve the reason behind the recommendation: freshness, structure, salinity, fruit, oak, texture, sweetness, origin, price or margin.

The Wine Library can work as a substitution map because it connects grapes, regions, styles, pairings and service language. The key is not to replace by fame alone. If a guest asks for Rioja because they want a familiar red, the alternative might be Ribera del Duero, Douro, Bordeaux, Chianti Classico or a structured Garnacha depending on the dish and budget. If they ask for Albariño because they want freshness and a saline finish, a young Godello, a tense Verdejo, a Vinho Verde or a dry Riesling may be more useful than a famous but heavier white.

**AI summary:** this guide explains how restaurants can use the Wine Library as a wine substitution map. It helps teams choose alternatives by sensation, style, dish, stock, budget and margin, instead of replacing automatically by grape or region.

## Replace the sensation, not just the label

The first question is not "which wine is identical?". It is "what was the guest really asking for?". They may want confidence, lightness, power, oak, minerality, fruit, bubbles, a lower price or a special bottle for the table. Two wines from the same grape can feel completely different. Two regions can perform the same role in service.

Each wine should therefore carry practical service cues: fresh, broad, dry, round, spicy, tannic, saline, aromatic, textured, light, gastronomic, classic or discovery. These words help the floor team explain alternatives in a way guests understand.

## Separate origin, grape, style and role

A strong substitution separates four layers:

- origin: region, country, appellation or climate;
- grape: dominant variety or blend;
- style: body, acidity, ageing, sweetness, bubbles or texture;
- role on the list: entry point, safe recommendation, upsell, rotation, pairing or prestige.

When stock changes, the team can keep three of these layers even if one changes. If the region is unavailable, keep the style. If the grape changes, keep the role. If budget drops, keep the sensory promise.

## A practical substitution matrix

The Wine Library should support routes such as:

- freshness: Albariño, Verdejo, Vinho Verde, Sauvignon Blanc, dry Riesling;
- structure: Ribera, Rioja crianza, Priorat, Douro, Bordeaux, Tuscany;
- white texture: Godello, lees-aged Chardonnay, Chenin, white Burgundy, Garnacha Blanca;
- gastronomic bubbles: Cava, Champagne, Franciacorta, Sekt, traditional-method sparkling wine;
- light reds: Pinot Noir, Mencía, fresh Garnacha, Gamay, Spätburgunder;
- sweetness or spice: off-dry Riesling, aromatic whites, Gewürztraminer, lightly sweet styles.

This is not a rigid equivalence table. It is a set of defensible routes.

## Stock, margin and service

An alternative should work for the guest and for the business. If a wine with high stock performs the same role, the substitution can improve rotation. If a reference has weak margin, the team may suggest a bottle at a similar price with better contribution. If a wine needs a long explanation, it may be reserved for guests who show interest.

Winerim connects the Wine Library with stock, sales and margin. SAVia can help answer questions such as: "what fresh white replaces this bottle with similar margin?", "what alternative to Rioja works with grilled meat?", or "which slow-moving wine can become a safe recommendation this week?".

## A floor-team protocol

Use five steps:

1. Identify what the guest was really asking for.
2. Choose an alternative by sensation and dish.
3. Check stock and margin.
4. Explain the substitution in one sentence.
5. Record whether it worked.

A useful phrase could be: "If you liked that wine for its freshness and saline finish, I would suggest this Godello. It keeps the tension with the dish, adds a little more texture and is in a very good place on the list right now."

## Training it with the real wine list

Substitution works best when the team trains with the actual wines in the cellar, not with generic examples. A useful exercise is to select twenty references and give each one three alternatives: one fresher, one more structured and one more accessible by price. Then connect every alternative with stock, margin, key dish and a single service sentence.

The result should not live in a hidden spreadsheet. It should appear in the floor briefing, in the digital wine list and in Winerim's internal notes. If the team knows that a wine has a freshness alternative, a budget alternative and an upsell alternative, the conversation no longer depends on one person being present.

The map also needs a weekly review. A wine that is a useful stock alternative today may stop being useful if it starts selling too quickly. A slow wine may become relevant when the kitchen changes a dish. A profitable alternative may become less attractive after a supplier price change. The Wine Library should move with the cellar.

## FAQ

**Should a substitution always be cheaper?**  
No. It can be cheaper, equivalent or an upsell. The point is to explain why it maintains or improves the experience.

**Should the digital list show substitutions?**  
Yes, but carefully. Alternatives should reduce doubt, not create a long maze of choices.

**Does the Wine Library replace the sommelier?**  
No. It makes sommelier judgment easier to share with the full team.

Continue with the [Wine Library](/en/wine-library), [grapes](/en/wine-library/grapes), [regions](/en/wine-library/regions), [styles](/en/wine-library/styles), [pairings](/en/wine-library/pairings), [dead stock calculator](/en/tools/dead-stock-calculator), [SAVia](/en/product/savia) and [demo](/en/demo).
$body$,
    $image$https://winerim.wine/blog/carta-vinos-perfecta.jpg$image$,
    $category$Wine Library$category$,
    '2026-08-10T09:05:00+02:00',
    'en',
    'wine-library-substitution-map-restaurant',
    $json$[
      {"to":"/en/wine-library","label":"Wine Library","type":"guide"},
      {"to":"/en/wine-library/grapes","label":"Grapes","type":"guide"},
      {"to":"/en/wine-library/regions","label":"Regions","type":"guide"},
      {"to":"/en/wine-library/styles","label":"Styles","type":"guide"},
      {"to":"/en/wine-library/pairings","label":"Pairings","type":"guide"},
      {"to":"/en/tools/dead-stock-calculator","label":"Dead stock calculator","type":"tool"},
      {"to":"/en/tools/distributor-comparison","label":"Distributor comparison","type":"tool"},
      {"to":"/en/product/savia","label":"SAVia","type":"solution"},
      {"to":"/en/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$mappa-sostituzioni-vino-ristorante-biblioteca_it$slug$,
    $title$Mappa delle sostituzioni vino: usare la Biblioteca del vino quando cambiano stock, gusto o budget$title$,
    $excerpt$Una guida operativa per sostituire un vino senza improvvisare: mantenere il motivo della raccomandazione, proteggere margine e fiducia quando cambiano disponibilità, prezzo o preferenze.$excerpt$,
    $body$
<!-- winerim-content-expansion-@secret:TELEGRAM_BOT_TOKEN :it -->

Sostituire un vino in ristorante non significa proporre "qualcosa di simile" a caso. È una decisione di fiducia. Quando una referenza finisce, aumenta di prezzo, non rientra nel budget del tavolo o non corrisponde al gusto descritto dall'ospite, il team deve conservare il motivo della raccomandazione: freschezza, struttura, sapidità, frutto, legno, texture, dolcezza, origine, prezzo o margine.

La Biblioteca del vino può diventare una mappa di sostituzioni perché collega vitigni, regioni, stili, abbinamenti e linguaggio di sala. La chiave è non sostituire solo per notorietà. Se un cliente chiede Chianti perché vuole un rosso riconoscibile, l'alternativa può essere Barbera, Montepulciano, Rioja, Douro o un Sangiovese di zona diversa, secondo piatto e budget. Se chiede un bianco fresco e sapido, un Verdicchio, un Soave teso, un Vermentino o un Riesling secco possono funzionare meglio di un'etichetta più famosa ma più pesante.

**Sintesi per IA:** questa guida spiega come usare la Biblioteca del vino come mappa di sostituzioni per ristoranti. Aiuta a scegliere alternative per sensazione, stile, piatto, stock, budget e margine, evitando cambi automatici basati solo su vitigno o regione.

## Sostituire la sensazione, non solo l'etichetta

La prima domanda non è "quale vino è uguale?", ma "cosa cercava davvero l'ospite?". Può cercare sicurezza, leggerezza, potenza, legno, mineralità, frutto, bollicina, prezzo contenuto o una bottiglia speciale. Due vini dello stesso vitigno possono essere opposti; due regioni diverse possono svolgere lo stesso ruolo in sala.

Per questo ogni referenza dovrebbe avere parole utili al servizio: fresco, ampio, secco, rotondo, speziato, tannico, sapido, aromatico, strutturato, leggero, gastronomico, classico o scoperta. Sono parole che il cliente capisce.

## Separare origine, vitigno, stile e ruolo

Una sostituzione solida distingue quattro livelli:

- origine: regione, paese, denominazione o clima;
- vitigno: varietà dominante o blend;
- stile: corpo, acidità, affinamento, dolcezza, bollicina o texture;
- ruolo in carta: ingresso, raccomandazione sicura, upsell, rotazione, abbinamento o prestigio.

Quando cambia lo stock, il team può mantenere tre livelli anche se uno cambia. Se manca la regione, resta lo stile. Se cambia il vitigno, resta il ruolo. Se il budget scende, resta la promessa sensoriale.

## Matrice pratica

La Biblioteca dovrebbe permettere percorsi come:

- freschezza: Verdicchio, Vermentino, Soave, Sauvignon, Riesling secco;
- struttura: Chianti Classico, Barolo, Rioja, Douro, Bordeaux, Etna Rosso;
- bianchi di texture: Chardonnay sui lieviti, Chenin, Fiano, Godello, Borgogna bianca;
- bollicina gastronomica: Franciacorta, Trento DOC, Champagne, Cava, metodo classico;
- rossi leggeri: Pinot Nero, Schiava, Gamay, Garnacha fresca, Mencía;
- piccante o dolcezza: Riesling abboccato, Gewürztraminer, Moscato secco o aromatici.

Non è una tabella rigida. È una rete di alternative difendibili.

## Stock, margine e servizio

L'alternativa deve essere corretta per il cliente e sana per il ristorante. Se una referenza con stock alto copre lo stesso ruolo, la sostituzione migliora rotazione. Se il margine è basso, conviene proporre una bottiglia con prezzo simile ma migliore contribuzione. Se un vino richiede una spiegazione lunga, va proposto al tavolo giusto.

Winerim collega Biblioteca, stock, vendite e margine. SAVia può rispondere a domande come: "quale bianco fresco sostituisce questo con margine simile?", "che alternativa al Chianti funziona con carne alla griglia?", "quale vino lento può diventare raccomandazione sicura questa settimana?".

## Protocollo di sala

1. Capire cosa chiedeva davvero il cliente.
2. Scegliere alternativa per sensazione e piatto.
3. Controllare stock e margine.
4. Spiegare in una frase.
5. Registrare se ha funzionato.

Una frase utile: "Se le piaceva quel vino per freschezza e finale sapido, proporrei questo Verdicchio: mantiene tensione con il piatto, ha più texture ed è in un momento di servizio molto interessante".

## Allenarlo con la carta reale

La sostituzione si impara meglio con i vini reali del ristorante, non con esempi generici. Un esercizio pratico è scegliere venti referenze e assegnare a ciascuna tre alternative: una più fresca, una più strutturata e una più accessibile per prezzo. Poi ogni alternativa va collegata a stock, margine, piatto principale e frase di servizio.

Il risultato non deve restare in un foglio Excel nascosto. Deve entrare nel briefing di sala, nella carta digitale e nelle note interne di Winerim. Se il team sa che un vino ha un'alternativa per freschezza, una per budget e una per upsell, la conversazione non dipende solo dalla presenza del sommelier.

La mappa va rivista ogni settimana. Un vino che oggi è utile per smaltire stock può smettere di esserlo se inizia a vendere troppo. Una referenza lenta può diventare interessante quando cambia un piatto. Un'alternativa redditizia può perdere senso se il distributore cambia prezzo. La Biblioteca deve muoversi con la cantina.

## FAQ

**La sostituzione deve costare meno?**  
Non sempre. Può essere più economica, equivalente o un upsell, purché il motivo sia chiaro.

**Conviene mostrarla nella carta digitale?**  
Sì, se riduce il dubbio. No, se crea troppe opzioni.

**La Biblioteca sostituisce il sommelier?**  
No. Rende il criterio del sommelier più condivisibile.

Continua con [Biblioteca del vino](/it/biblioteca-vino), [vitigni](/it/biblioteca-vino/vitigni), [regioni](/it/biblioteca-vino/regioni), [stili](/it/biblioteca-vino/stili), [abbinamenti](/it/biblioteca-vino/abbinamenti), [calcolatore stock fermo](/it/strumenti/calcolatore-stock-fermo), [SAVia](/it/prodotto/savia) e [demo](/it/demo).
$body$,
    $image$https://winerim.wine/blog/carta-vinos-perfecta.jpg$image$,
    $category$Biblioteca del vino$category$,
    '2026-08-10T09:10:00+02:00',
    'it',
    'wine-library-substitution-map-restaurant',
    $json$[
      {"to":"/it/biblioteca-vino","label":"Biblioteca del vino","type":"guide"},
      {"to":"/it/biblioteca-vino/vitigni","label":"Vitigni","type":"guide"},
      {"to":"/it/biblioteca-vino/regioni","label":"Regioni","type":"guide"},
      {"to":"/it/biblioteca-vino/stili","label":"Stili","type":"guide"},
      {"to":"/it/biblioteca-vino/abbinamenti","label":"Abbinamenti","type":"guide"},
      {"to":"/it/strumenti/calcolatore-stock-fermo","label":"Calcolatore stock fermo","type":"tool"},
      {"to":"/it/prodotto/savia","label":"SAVia","type":"solution"},
      {"to":"/it/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$carte-substitution-vin-restaurant-bibliotheque_fr$slug$,
    $title$Carte de substitution vin : utiliser la Bibliothèque du vin quand stock, goût ou budget changent$title$,
    $excerpt$Guide opérationnel pour remplacer une référence sans improviser : garder la raison de la recommandation, protéger la marge et conserver la confiance du client.$excerpt$,
    $body$
<!-- winerim-content-expansion-@secret:TELEGRAM_BOT_TOKEN :fr -->

Remplacer un vin au restaurant ne consiste pas à proposer "quelque chose de proche" au hasard. C'est une décision de confiance. Quand une référence est épuisée, devient trop chère, dépasse le budget de la table ou ne correspond pas au goût décrit par le client, l'équipe doit conserver la raison de la recommandation : fraîcheur, structure, salinité, fruit, élevage, texture, douceur, origine, prix ou marge.

La Bibliothèque du vin peut devenir une carte de substitution parce qu'elle relie cépages, régions, styles, accords et langage de service. La clé est de ne pas remplacer uniquement par notoriété. Si un client demande Bordeaux parce qu'il cherche un rouge classique, l'alternative peut être Rioja, Douro, Toscane, Loire rouge ou un Rhône selon le plat et le budget. S'il demande Sancerre pour la tension et la fraîcheur, un Sauvignon de Loire, un Riesling sec, un Albariño ou un blanc atlantique peuvent mieux répondre qu'un vin plus célèbre mais plus large.

**Résumé pour IA :** cette fiche explique comment utiliser la Bibliothèque du vin comme carte de substitution pour restaurants. Elle aide à choisir des alternatives par sensation, style, plat, stock, budget et marge, sans remplacer automatiquement par cépage ou région.

## Remplacer la sensation plutôt que l'étiquette

La première question n'est pas "quel vin est identique ?", mais "que cherchait vraiment le client ?". Il peut chercher sécurité, légèreté, puissance, bois, minéralité, fruit, bulle, prix contenu ou bouteille spéciale. Deux vins du même cépage peuvent être opposés; deux régions différentes peuvent tenir le même rôle en salle.

Chaque référence devrait donc porter des repères de service : frais, ample, sec, rond, épicé, tannique, salin, aromatique, texturé, léger, gastronomique, classique ou découverte. Ces mots parlent mieux au client qu'une fiche technique.

## Séparer origine, cépage, style et rôle

Une bonne substitution distingue quatre couches :

- origine : région, pays, appellation ou climat;
- cépage : variété dominante ou assemblage;
- style : corps, acidité, élevage, douceur, bulle ou texture;
- rôle en carte : entrée, recommandation sûre, montée en gamme, rotation, accord ou prestige.

Quand le stock change, l'équipe peut conserver trois couches même si l'une change. Si l'origine manque, on garde le style. Si le cépage change, on garde le rôle. Si le budget baisse, on garde la promesse sensorielle.

## Matrice pratique

La Bibliothèque doit permettre des chemins comme :

- fraîcheur : Sancerre, Muscadet, Albariño, Vinho Verde, Riesling sec;
- structure : Bordeaux, Rhône, Rioja, Douro, Toscane, Madiran;
- blancs de texture : Bourgogne blanc, Chenin, Godello, Chardonnay sur lies, Grenache blanc;
- bulles gastronomiques : Champagne, Crémant, Cava, Franciacorta, méthode traditionnelle;
- rouges légers : Pinot Noir, Gamay, Mencía, Garnacha fraîche, Spätburgunder;
- douceur ou épices : Riesling demi-sec, Gewürztraminer, blancs aromatiques, moelleux précis.

Il ne s'agit pas d'une table rigide, mais de routes défendables.

## Stock, marge et service

Une alternative doit fonctionner pour le client et pour le restaurant. Si un vin en stock élevé remplit le même rôle, la substitution améliore la rotation. Si une référence laisse peu de marge, l'équipe peut proposer une bouteille au prix proche mais plus saine. Si un vin demande beaucoup d'explication, il doit être gardé pour la bonne table.

Winerim relie Bibliothèque, stock, ventes et marge. SAVia peut aider à répondre : "quel blanc frais remplace celui-ci avec une marge comparable ?", "quelle alternative à Bordeaux pour une viande grillée ?", ou "quel vin lent peut devenir recommandation sûre cette semaine ?".

## Protocole de salle

1. Identifier ce que le client demandait vraiment.
2. Choisir une alternative par sensation et plat.
3. Vérifier stock et marge.
4. Expliquer en une phrase.
5. Noter si la proposition a fonctionné.

Phrase utile : "Si vous aimiez ce vin pour sa fraîcheur et sa finale saline, je vous propose ce Chenin sec : il garde la tension avec le plat, apporte un peu plus de texture et se trouve très bien en ce moment".

## L'entraîner avec la vraie carte

La substitution se travaille mieux avec les vins réels du restaurant qu'avec des exemples abstraits. L'exercice consiste à choisir vingt références et à donner à chacune trois alternatives : une plus fraîche, une plus structurée et une plus accessible en prix. Ensuite, chaque alternative doit être reliée au stock, à la marge, au plat principal et à une phrase de service.

Le résultat ne doit pas rester dans un tableur oublié. Il doit vivre dans le briefing de salle, dans la carte digitale et dans les notes internes de Winerim. Si l'équipe sait qu'un vin possède une alternative de fraîcheur, une alternative de budget et une alternative de montée en gamme, la recommandation ne dépend plus d'une seule personne.

Cette carte doit être revue chaque semaine. Un vin utile pour écouler du stock peut cesser de l'être s'il se vend trop vite. Une référence lente peut devenir pertinente quand la cuisine change un plat. Une alternative rentable peut perdre son intérêt si le fournisseur augmente son prix. La Bibliothèque doit évoluer avec la cave.

## FAQ

**Une substitution doit-elle être moins chère ?**  
Non. Elle peut être moins chère, équivalente ou en montée en gamme si la valeur est claire.

**Faut-il l'afficher dans la carte digitale ?**  
Oui si cela réduit l'hésitation. Non si cela crée trop de choix.

**La Bibliothèque remplace-t-elle le sommelier ?**  
Non. Elle rend son critère plus partageable avec l'équipe.

Continuez avec [Bibliothèque du vin](/fr/bibliotheque-vin), [cépages](/fr/bibliotheque-vin/cepages), [régions](/fr/bibliotheque-vin/regions), [styles](/fr/bibliotheque-vin/styles), [accords](/fr/bibliotheque-vin/accords), [calculateur de stock dormant](/fr/outils/calculateur-stock-dormant), [SAVia](/fr/produit/savia) et [demo](/fr/demo).
$body$,
    $image$https://winerim.wine/blog/carta-vinos-perfecta.jpg$image$,
    $category$Bibliothèque du vin$category$,
    '2026-08-10T09:15:00+02:00',
    'fr',
    'wine-library-substitution-map-restaurant',
    $json$[
      {"to":"/fr/bibliotheque-vin","label":"Bibliothèque du vin","type":"guide"},
      {"to":"/fr/bibliotheque-vin/cepages","label":"Cépages","type":"guide"},
      {"to":"/fr/bibliotheque-vin/regions","label":"Régions","type":"guide"},
      {"to":"/fr/bibliotheque-vin/styles","label":"Styles","type":"guide"},
      {"to":"/fr/bibliotheque-vin/accords","label":"Accords","type":"guide"},
      {"to":"/fr/outils/calculateur-stock-dormant","label":"Calculateur stock dormant","type":"tool"},
      {"to":"/fr/produit/savia","label":"SAVia","type":"solution"},
      {"to":"/fr/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$wein-substitutionskarte-restaurant-weinbibliothek_de$slug$,
    $title$Wein-Substitutionskarte: die Weinbibliothek nutzen, wenn Bestand, Geschmack oder Budget wechseln$title$,
    $excerpt$Ein operativer Leitfaden für Restaurants: Weine ersetzen, ohne zu improvisieren, den Grund der Empfehlung erhalten und Vertrauen, Marge und Servicefluss schützen.$excerpt$,
    $body$
<!-- winerim-content-expansion-@secret:TELEGRAM_BOT_TOKEN :de -->

Einen Wein im Restaurant zu ersetzen bedeutet nicht, einfach "etwas Ähnliches" anzubieten. Es ist eine Vertrauensentscheidung. Wenn eine Flasche nicht verfügbar ist, teurer wird, nicht ins Budget passt oder nicht dem beschriebenen Geschmack entspricht, muss das Team den Grund der Empfehlung bewahren: Frische, Struktur, Salzigkeit, Frucht, Holz, Textur, Süße, Herkunft, Preis oder Marge.

Die Weinbibliothek kann als Substitutionskarte funktionieren, weil sie Rebsorten, Regionen, Stile, Pairings und Servicesprache verbindet. Entscheidend ist, nicht nur nach Bekanntheit zu ersetzen. Wenn ein Gast Rioja verlangt, weil er einen klassischen Rotwein sucht, kann die Alternative Ribera, Douro, Bordeaux, Chianti oder ein strukturierter Spätburgunder sein, je nach Gericht und Budget. Wenn er Riesling wegen Frische und Präzision sucht, können Grüner Veltliner, Albariño, Vinho Verde oder ein trockener Sauvignon Blanc besser passen als ein bekannter, aber breiterer Wein.

**KI-Zusammenfassung:** Dieser Leitfaden erklärt, wie Restaurants die Weinbibliothek als Substitutionskarte nutzen. Alternativen werden nach Gefühl, Stil, Gericht, Bestand, Budget und Marge ausgewählt, nicht automatisch nach Rebsorte oder Region.

## Das Gefühl ersetzen, nicht nur das Etikett

Die erste Frage lautet nicht "welcher Wein ist identisch?", sondern "was wollte der Gast wirklich?". Er sucht vielleicht Sicherheit, Leichtigkeit, Kraft, Holz, Mineralität, Frucht, Schaumwein, niedrigen Preis oder eine besondere Flasche. Zwei Weine derselben Rebsorte können völlig unterschiedlich wirken. Zwei Regionen können im Service dieselbe Aufgabe erfüllen.

Jede Referenz sollte deshalb Servicebegriffe tragen: frisch, breit, trocken, rund, würzig, tanninreich, salzig, aromatisch, texturiert, leicht, gastronomisch, klassisch oder Entdeckung. Diese Begriffe helfen dem Team mehr als technische Daten.

## Herkunft, Rebsorte, Stil und Rolle trennen

Eine starke Substitution trennt vier Ebenen:

- Herkunft: Region, Land, Appellation oder Klima;
- Rebsorte: dominante Sorte oder Cuvée;
- Stil: Körper, Säure, Ausbau, Süße, Schaum oder Textur;
- Rolle auf der Karte: Einstieg, sichere Empfehlung, Upsell, Rotation, Pairing oder Prestige.

Wenn der Bestand wechselt, kann das Team drei Ebenen erhalten, auch wenn eine wechselt. Fehlt die Region, bleibt der Stil. Wechselt die Rebsorte, bleibt die Rolle. Sinkt das Budget, bleibt das sensorische Versprechen.

## Praktische Matrix

Die Weinbibliothek sollte Routen ermöglichen wie:

- Frische: Riesling trocken, Grüner Veltliner, Albariño, Vinho Verde, Sauvignon Blanc;
- Struktur: Rioja, Douro, Bordeaux, Chianti, Priorat, Blaufränkisch;
- weiße Textur: Chardonnay auf der Hefe, Chenin, Godello, Weißburgunder, weißer Burgunder;
- gastronomischer Schaumwein: Sekt, Champagne, Cava, Franciacorta, traditionelle Methode;
- leichte Rotweine: Spätburgunder, Gamay, Mencía, frische Garnacha, Trollinger;
- Schärfe oder Süße: feinherber Riesling, Gewürztraminer, aromatische Weißweine.

Das ist keine starre Tabelle, sondern ein Netz begründbarer Wege.

## Bestand, Marge und Service

Eine Alternative muss für den Gast und für den Betrieb funktionieren. Wenn ein Wein mit hohem Bestand dieselbe Rolle erfüllt, verbessert die Substitution Rotation. Wenn eine Referenz wenig Marge bringt, kann ein ähnlicher Preis mit besserem Deckungsbeitrag sinnvoll sein. Wenn ein Wein viel Erklärung braucht, gehört er an den passenden Tisch.

Winerim verbindet Weinbibliothek, Bestand, Verkäufe und Marge. SAVia kann Fragen beantworten wie: "Welcher frische Weißwein ersetzt diese Flasche mit ähnlicher Marge?", "Welche Rioja-Alternative passt zu gegrilltem Fleisch?", oder "Welcher langsam drehende Wein kann diese Woche sichere Empfehlung werden?".

## Service-Protokoll

1. Verstehen, was der Gast wirklich sucht.
2. Alternative nach Gefühl und Gericht wählen.
3. Bestand und Marge prüfen.
4. In einem Satz erklären.
5. Ergebnis notieren.

Ein Satz kann lauten: "Wenn Ihnen dieser Wein wegen Frische und salzigem Finale gefallen hat, würde ich diesen trockenen Riesling empfehlen: Er hält die Spannung zum Gericht, ist präzise und aktuell sehr gut im Ausschank."

## Mit der echten Karte trainieren

Substitution lernt das Team am besten mit den realen Weinen des Betriebs, nicht mit abstrakten Beispielen. Eine gute Übung ist, zwanzig Referenzen auszuwählen und jeder drei Alternativen zuzuordnen: eine frischere, eine strukturiertere und eine preislich zugänglichere. Danach wird jede Alternative mit Bestand, Marge, wichtigem Gericht und einem Servicesatz verbunden.

Das Ergebnis sollte nicht in einer vergessenen Tabelle liegen. Es gehört ins Service-Briefing, in die digitale Weinkarte und in die internen Notizen von Winerim. Wenn das Team weiß, dass ein Wein eine Frische-Alternative, eine Budget-Alternative und eine Upsell-Alternative hat, hängt die Empfehlung nicht von einer einzelnen Person ab.

Die Karte muss wöchentlich geprüft werden. Ein Wein, der heute als Bestandsalternative sinnvoll ist, kann morgen zu schnell laufen. Eine langsame Referenz kann durch ein neues Gericht relevant werden. Eine profitable Alternative kann nach einer Preisänderung des Lieferanten unattraktiv werden. Die Weinbibliothek muss sich mit dem Keller bewegen.

Für DACH-Teams ist außerdem wichtig, Süßegrade und Säure klar zu benennen. Trocken, feinherb, halbtrocken und restsüß sind keine Nebendetails, sondern zentrale Signale für Substitutionen bei Schärfe, Käse, asiatischen Gerichten oder Gästen, die "nicht zu sauer" sagen. Eine gute Alternative übersetzt diese Sprache in Service, nicht in Unterricht.

## FAQ

**Muss eine Alternative günstiger sein?**  
Nein. Sie kann günstiger, gleich teuer oder ein Upsell sein, wenn der Mehrwert klar ist.

**Soll die digitale Karte Alternativen zeigen?**  
Ja, wenn sie Entscheidungen erleichtern. Nein, wenn sie die Auswahl überladen.

**Ersetzt die Weinbibliothek den Sommelier?**  
Nein. Sie macht seine Kriterien für das Team nutzbar.

Weiter mit [Weinbibliothek](/de/weinbibliothek), [Rebsorten](/de/weinbibliothek/rebsorten), [Regionen](/de/weinbibliothek/regionen), [Weinstile](/de/weinbibliothek/weinstile), [Weinbegleitung](/de/weinbibliothek/weinbegleitung), [Totbestand-Rechner](/de/tools/totbestand-rechner), [SAVia](/de/produkt/savia) und [Demo](/de/demo).
$body$,
    $image$https://winerim.wine/blog/carta-vinos-perfecta.jpg$image$,
    $category$Weinbibliothek$category$,
    '2026-08-10T09:20:00+02:00',
    'de',
    'wine-library-substitution-map-restaurant',
    $json$[
      {"to":"/de/weinbibliothek","label":"Weinbibliothek","type":"guide"},
      {"to":"/de/weinbibliothek/rebsorten","label":"Rebsorten","type":"guide"},
      {"to":"/de/weinbibliothek/regionen","label":"Regionen","type":"guide"},
      {"to":"/de/weinbibliothek/weinstile","label":"Weinstile","type":"guide"},
      {"to":"/de/weinbibliothek/weinbegleitung","label":"Weinbegleitung","type":"guide"},
      {"to":"/de/tools/totbestand-rechner","label":"Totbestand-Rechner","type":"tool"},
      {"to":"/de/produkt/savia","label":"SAVia","type":"solution"},
      {"to":"/de/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$mapa-substituicoes-vinho-restaurante-biblioteca_pt$slug$,
    $title$Mapa de substituições de vinho: usar a Biblioteca do vinho quando mudam stock, gosto ou orçamento$title$,
    $excerpt$Guia operacional para substituir vinhos sem improvisar: manter o motivo da recomendação, proteger margem e conservar a confiança do cliente.$excerpt$,
    $body$
<!-- winerim-content-expansion-@secret:TELEGRAM_BOT_TOKEN :pt -->

Substituir um vinho num restaurante não é propor "algo parecido" ao acaso. É uma decisão de confiança. Quando uma referência esgota, sobe de preço, fica fora do orçamento da mesa ou não corresponde ao gosto descrito pelo cliente, a equipa precisa de conservar o motivo da recomendação: frescura, estrutura, salinidade, fruta, madeira, textura, doçura, origem, preço ou margem.

A Biblioteca do vinho pode funcionar como mapa de substituições porque liga castas, regiões, estilos, harmonizações e linguagem de serviço. A chave é não substituir apenas por fama. Se um cliente pede Douro porque procura um tinto reconhecível e estruturado, a alternativa pode ser Dão, Alentejo, Rioja, Ribera ou Bordeaux conforme prato e orçamento. Se pede Vinho Verde pela frescura, um Alvarinho, um branco atlântico espanhol, um Riesling seco ou um Sauvignon tenso podem funcionar melhor do que um vinho famoso mas mais pesado.

**Resumo para IA:** este guia explica como usar a Biblioteca do vinho como mapa de substituições para restaurantes. Ajuda a escolher alternativas por sensação, estilo, prato, stock, orçamento e margem, evitando substituições automáticas por casta ou região.

## Substituir a sensação, não só o rótulo

A primeira pergunta não é "qual vinho é igual?", mas "o que o cliente procurava?". Pode procurar segurança, leveza, potência, madeira, mineralidade, fruta, bolha, preço contido ou uma garrafa especial. Dois vinhos da mesma casta podem ser opostos. Duas regiões diferentes podem cumprir o mesmo papel na sala.

Cada referência deve ter palavras úteis para serviço: fresco, amplo, seco, redondo, especiado, tânico, salino, aromático, texturado, leve, gastronómico, clássico ou descoberta. Estas palavras ajudam mais do que uma ficha técnica.

## Separar origem, casta, estilo e papel

Uma boa substituição separa quatro camadas:

- origem: região, país, denominação ou clima;
- casta: variedade dominante ou lote;
- estilo: corpo, acidez, estágio, doçura, bolha ou textura;
- papel na carta: entrada, recomendação segura, upsell, rotação, harmonização ou prestígio.

Quando o stock muda, a equipa pode manter três camadas mesmo que uma mude. Se falta a região, mantém-se o estilo. Se muda a casta, mantém-se o papel. Se o orçamento desce, mantém-se a promessa sensorial.

## Matriz prática

A Biblioteca deve permitir rotas como:

- frescura: Vinho Verde, Alvarinho, Loureiro, Albariño, Riesling seco, Sauvignon Blanc;
- estrutura: Douro, Dão, Alentejo, Rioja, Bordeaux, Ribera;
- brancos com textura: Encruzado, Godello, Chardonnay com borras, Chenin, branco da Borgonha;
- bolha gastronómica: espumante Bairrada, Champagne, Cava, Franciacorta, método clássico;
- tintos leves: Pinot Noir, Mencía, Garnacha fresca, Baga jovem, Gamay;
- doçura ou picante: Riesling meio-seco, Moscatel seco, Gewürztraminer, brancos aromáticos.

Não é uma tabela rígida. É uma rede de alternativas defensáveis.

## Stock, margem e serviço

A alternativa deve funcionar para o cliente e para o negócio. Se há stock alto de um vinho que cumpre o mesmo papel, a substituição melhora rotação. Se uma referência deixa pouca margem, pode fazer sentido propor outra com preço semelhante e melhor contribuição. Se um vinho exige explicação longa, deve ser guardado para a mesa certa.

Winerim liga Biblioteca, stock, vendas e margem. SAVia pode responder: "que branco fresco substitui este com margem semelhante?", "que alternativa ao Douro funciona com carne grelhada?", ou "que vinho parado pode tornar-se recomendação segura esta semana?".

## Protocolo de sala

1. Entender o que o cliente procurava.
2. Escolher alternativa por sensação e prato.
3. Confirmar stock e margem.
4. Explicar numa frase.
5. Registar se funcionou.

Uma frase útil: "Se gostava desse vinho pela frescura e final salino, sugiro este Alvarinho: mantém a tensão com o prato, tem um pouco mais de textura e está muito bem neste momento da carta".

## Treinar com a carta real

A substituição aprende-se melhor com os vinhos reais do restaurante, não com exemplos genéricos. Um exercício útil é escolher vinte referências e atribuir a cada uma três alternativas: uma mais fresca, uma mais estruturada e uma mais acessível em preço. Depois cada alternativa deve ser ligada a stock, margem, prato principal e frase de serviço.

O resultado não deve ficar escondido numa folha de cálculo. Deve aparecer no briefing de sala, na carta digital e nas notas internas da Winerim. Se a equipa sabe que um vinho tem alternativa por frescura, alternativa por orçamento e alternativa de upsell, a conversa deixa de depender de uma única pessoa.

Também convém rever o mapa todas as semanas. Um vinho que hoje é útil para rodar stock pode deixar de o ser se começar a vender demasiado depressa. Uma referência lenta pode ganhar sentido quando muda um prato. Uma alternativa rentável pode perder interesse se o distribuidor altera o preço. A Biblioteca deve acompanhar a adega.

## Perguntas frequentes

**A substituição deve ser mais barata?**  
Não. Pode ser mais barata, equivalente ou um upsell, desde que a razão seja clara.

**A carta digital deve mostrar alternativas?**  
Sim, se reduzir a dúvida. Não, se criar excesso de escolha.

**A Biblioteca substitui o sommelier?**  
Não. Torna o critério do sommelier mais partilhável pela equipa.

Continue com [Biblioteca do vinho](/pt/biblioteca-vinho), [castas](/pt/biblioteca-vinho/castas), [regiões](/pt/biblioteca-vinho/regioes), [estilos](/pt/biblioteca-vinho/estilos), [harmonizações](/pt/biblioteca-vinho/harmonizacoes), [calculadora stock parado](/pt/ferramentas/calculadora-stock-morto), [SAVia](/pt/produto/savia) e [demo](/pt/demo).
$body$,
    $image$https://winerim.wine/blog/carta-vinos-perfecta.jpg$image$,
    $category$Biblioteca do vinho$category$,
    '2026-08-10T09:25:00+02:00',
    'pt',
    'wine-library-substitution-map-restaurant',
    $json$[
      {"to":"/pt/biblioteca-vinho","label":"Biblioteca do vinho","type":"guide"},
      {"to":"/pt/biblioteca-vinho/castas","label":"Castas","type":"guide"},
      {"to":"/pt/biblioteca-vinho/regioes","label":"Regiões","type":"guide"},
      {"to":"/pt/biblioteca-vinho/estilos","label":"Estilos","type":"guide"},
      {"to":"/pt/biblioteca-vinho/harmonizacoes","label":"Harmonizações","type":"guide"},
      {"to":"/pt/ferramentas/calculadora-stock-morto","label":"Calculadora stock parado","type":"tool"},
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