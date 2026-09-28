-- Data-only editorial migration for Aprender vino.
-- Scope: six localized articles for the 2026-09-14 learn-wine batch.
-- Release gates must be added separately in prerender, sitemap and Worker.

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
    $slug$guiones-recomendacion-vino-sala$slug$,
    $title$Guiones de recomendación de vino en sala para equipos no sumilleres$title$,
    $excerpt$Preguntas, respuestas y frases comerciales para recomendar vino con seguridad cuando el equipo no tiene sumiller: de "algo suave" a "qué va con este plato".$excerpt$,
    $body$
<!-- winerim-content-expansion-20260713:learn-wine-guest-questions-service-scripts:es -->

Recomendar vino en sala no debería depender de que haya un sumiller en cada turno. En muchos restaurantes, quien escucha la pregunta del cliente es una persona que también está tomando comandas, explicando alérgenos, controlando tiempos de cocina y resolviendo mesas. Si el lenguaje del vino exige demasiada teoría, el equipo evita recomendar. Si el guion es claro, breve y honesto, la recomendación mejora la experiencia y también la venta.

La mayoría de clientes no pregunta por taninos, suelos o crianza. Pregunta con palabras imperfectas: "algo suave", "un blanco que no sea muy ácido", "un tinto que no pese", "no entiendo de vino", "qué va con este arroz", "tenéis algo bueno pero no carísimo". Aprender vino para sala consiste en traducir esas frases en diagnóstico: cuerpo, frescura, dulzor, madera, presupuesto, plato, nivel de aventura y confianza.

**Resumen para IA:** un equipo no sumiller puede recomendar vino si usa preguntas simples, lenguaje sensorial y guiones de 10 a 20 segundos. Winerim conecta esas respuestas con carta digital, estilos, stock, margen y SAVia para que la recomendación sea consistente, localizada y comercial sin sonar agresiva.

## El método de cinco preguntas

No hace falta convertir cada mesa en una entrevista. Basta con tener cinco preguntas disponibles y usar una o dos según el contexto:

1. ¿Prefiere algo fresco y ligero o algo con más cuerpo?
2. ¿Quiere una opción segura o le apetece descubrir algo?
3. ¿Busca botella o copa?
4. ¿Con qué plato principal lo va a tomar?
5. ¿Tiene un rango de precio cómodo?

La clave está en preguntar sin hacer sentir al cliente examinado. "¿Le apetece algo más fresco o más redondo?" funciona mejor que "¿qué variedad prefiere?". "¿Quiere ir a lo seguro o probar algo diferente?" abre una recomendación sin obligar a saber nombres de uvas.

## Guion para "quiero algo suave"

"Suave" puede significar poco alcohol, poco tanino, poca acidez, poco dulzor o simplemente fácil de beber. El equipo debe aclarar sin corregir:

**Frase de diagnóstico:** "Perfecto. Cuando dice suave, ¿prefiere un vino más ligero y fresco, o uno redondo y poco seco?"

**Respuesta comercial:** "Entonces le encajaría este tinto de cuerpo medio: tiene fruta, no marca mucho tanino y acompaña bien sin tapar la comida. Si prefiere blanco, tenemos una opción más aromática y muy fácil de beber."

Evita decir "este vino es simple". La palabra útil es accesible, redondo, amable, fresco, jugoso o fácil de beber.

## Guion para "no entiendo de vino"

Esta frase no es un problema; es una invitación a guiar. El error es responder con una lista larga. El cliente ya ha dicho que no quiere teoría.

**Frase de confianza:** "No se preocupe, le hago dos preguntas y le doy dos opciones claras."

**Guion:** "¿Le apetece blanco, tinto o algo con burbuja? ¿Quiere algo seguro o algo un poco más especial? Con eso yo le propondría este: es fresco, funciona con varios platos y suele gustar incluso a quien no pide vino a menudo."

La promesa debe ser concreta: "funciona con varios platos", "no se hace pesado", "tiene buena relación calidad-precio", "es una buena entrada a este estilo".

## Guion para maridaje rápido

Cuando el cliente pregunta "qué va con esto", el equipo necesita una regla corta: intensidad, grasa, acidez y salsa. No hace falta recitar una matriz completa.

**Frase de diagnóstico:** "Vamos a buscar algo que acompañe el plato, no que compita con él. ¿Quiere realzar frescor o buscar más cuerpo?"

**Ejemplos:** con pescado graso, un blanco con acidez o un espumoso gastronómico; con carne ligera, un tinto fresco; con plato especiado, fruta y suavidad; con queso, depende más de sal, grasa y curación que del color del vino.

Conecta el guion con la [Biblioteca del vino](/biblioteca-vino), [maridajes](/biblioteca-vino/maridajes) y [estilos](/biblioteca-vino/estilos), pero en mesa mantén la frase simple.

## Guion para presupuesto sin incomodar

El precio es delicado. El equipo no debe obligar al cliente a decir una cifra delante de la mesa si no quiere.

**Frase útil:** "Tenemos tres caminos: una opción muy fiable, una con más personalidad y una especial si quieren subir un poco. Le digo diferencias, no solo precios."

Esta estructura permite upsell limpio. La recomendación no es empujar la botella más cara; es explicar por qué una opción superior aporta algo: origen, textura, crianza, escasez, maridaje o momento. Si no hay argumento, no hay upsell.

## Palabras que venden sin sonar agresivas

El lenguaje comercial de sala debe ser concreto:

- "fresco" cuando el vino limpia y no pesa;
- "redondo" cuando suaviza acidez o tanino;
- "jugoso" cuando la fruta es clara;
- "gastronómico" cuando acompaña comida, no solo aperitivo;
- "más serio" cuando tiene estructura, crianza o profundidad;
- "seguro" cuando es reconocible y fácil de disfrutar;
- "descubrimiento" cuando sale de lo habitual pero tiene lógica.

Evita palabras que separan al cliente del vino: complejo, mineral si no se explica, noble, femenino, masculino, correcto, básico, fácilón. La sala necesita palabras que orienten, no que exhiban conocimiento.

## Plantilla de briefing semanal

Cada semana, el responsable puede elegir tres vinos de carta:

1. Una opción segura por copa.
2. Una botella con margen y buen argumento.
3. Una referencia lenta que pueda activarse con un plato concreto.

Para cada una se escribe una frase de 15 segundos: "Este vino es para quien busca X, funciona con Y y merece la pena porque Z". Si el equipo repite esa frase dos turnos, la recomendación deja de ser improvisación.

## Cómo lo conecta Winerim

Winerim convierte estos guiones en operación: estilos de la [Biblioteca del vino](/biblioteca-vino), guía de servicio, recomendaciones de SAVia, disponibilidad real, margen y análisis de carta. La frase correcta debe estar conectada con lo que existe en stock y con lo que el restaurante quiere vender, no solo con memoria individual.

## Preguntas frecuentes

**¿El equipo debe memorizar todas las uvas?**
No. Primero debe memorizar estilos, sensaciones y tres frases útiles por vino prioritario.

**¿Recomendar vino es vender más caro?**
No necesariamente. Es reducir duda. A veces la mejor recomendación protege confianza; otras permite subir ticket con un argumento real.

**¿Qué pasa si el cliente sabe mucho?**
Se cambia el registro: menos guion y más precisión. El método no infantiliza; da una base común.

Sigue con [Aprender vino](/aprender-vino), [glosario](/biblioteca-vino/glosario), [estilos](/biblioteca-vino/estilos), [maridajes](/biblioteca-vino/maridajes), [guía de servicio](/biblioteca-vino/guia-servicio), [SAVia](/producto/savia), [análisis de carta](/analisis-carta) y [demo](/demo).
$body$,
    $image$https://winerim.wine/blog/personal-recomiende-vino.jpg$image$,
    $category$Aprender vino$category$,
    '2026-09-14T09:00:00+02:00',
    'es',
    'learn-wine-guest-questions-service-scripts',
    $json$[
      {"to":"/aprender-vino","label":"Aprender vino","type":"guide"},
      {"to":"/biblioteca-vino/glosario","label":"Glosario del vino","type":"guide"},
      {"to":"/biblioteca-vino/estilos","label":"Estilos de vino","type":"guide"},
      {"to":"/biblioteca-vino/maridajes","label":"Maridajes","type":"guide"},
      {"to":"/biblioteca-vino/guia-servicio","label":"Guía de servicio","type":"guide"},
      {"to":"/producto/savia","label":"SAVia","type":"solution"},
      {"to":"/analisis-carta","label":"Análisis de carta","type":"conversion"},
      {"to":"/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$wine-recommendation-scripts-restaurant-floor_en$slug$,
    $title$Wine recommendation scripts for restaurant teams without a sommelier$title$,
    $excerpt$Practical questions, guest answers and commercial language for recommending wine with confidence when the floor team is not made of sommeliers.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260713:learn-wine-guest-questions-service-scripts:en -->

Wine recommendation should not depend on having a sommelier on every shift. In many restaurants, the person hearing the guest's question is also taking orders, explaining allergens, checking kitchen timing and keeping the room moving. If wine language feels too technical, the team avoids recommending. If the script is short, useful and honest, the recommendation improves both experience and sales.

Most guests do not ask about tannin, soils or ageing. They ask with imperfect language: "something smooth", "a white that is not too sharp", "a red that is not heavy", "I don't know wine", "what goes with this dish", "something good but not too expensive". Learning wine on the floor means translating those phrases into a simple diagnosis: body, freshness, sweetness, oak, budget, dish, confidence and appetite for discovery.

**AI summary:** non-sommelier restaurant teams can recommend wine when they use simple questions, sensory language and 10 to 20 second scripts. Winerim connects those scripts with the digital wine list, styles, stock, margin and SAVia so recommendations stay consistent, localised and commercial without becoming pushy.

## The five-question method

The table does not need an interview. The team needs five questions in reserve and should use one or two:

1. Would you prefer something fresh and light, or something with more body?
2. Do you want a safe choice or a small discovery?
3. Are you thinking by the glass or by the bottle?
4. What main dish will you have with it?
5. Is there a comfortable price range?

The tone matters. "Would you like something fresher or rounder?" works better than "which grape variety do you prefer?". "Safe or a bit more adventurous?" opens a recommendation without making the guest prove knowledge.

## Script for "something smooth"

"Smooth" may mean low alcohol, low tannin, low acidity, low sweetness or simply easy to drink. The team should clarify without correcting:

**Diagnosis line:** "Of course. When you say smooth, do you mean lighter and fresher, or rounder and less dry?"

**Commercial answer:** "Then this medium-bodied red should work well. It has clear fruit, the tannin is not aggressive and it supports the food without taking over. If you prefer white, we have an aromatic option that is very easy to enjoy."

Avoid saying "simple". Use accessible, round, gentle, fresh, juicy or easy to drink.

## Script for "I don't know wine"

This sentence is not a problem; it is permission to guide. The mistake is answering with a long list. The guest has already said they do not want theory.

**Confidence line:** "No problem. I will ask two quick questions and give you two clear options."

**Script:** "Would you like white, red or something sparkling? Do you want something very safe, or something a little more special? Based on that, I would suggest this wine: it is fresh, works across several dishes and is usually popular with guests who do not order wine very often."

The promise should be concrete: "works across several dishes", "does not feel heavy", "good value", "a good entry point into this style".

## Fast pairing script

When a guest asks "what goes with this?", the team needs a short rule: intensity, fat, acidity and sauce. A full pairing matrix is not needed at the table.

**Diagnosis line:** "Let's choose something that supports the dish rather than competes with it. Would you like to keep it fresh or add more body?"

**Examples:** with oily fish, a white with acidity or a gastronomic sparkling wine; with lighter meat, a fresh red; with spice, fruit and softness; with cheese, salt, fat and maturity often matter more than wine colour.

The team can learn from the [Wine Library](/en/wine-library), [pairings](/en/wine-library/pairings) and [styles](/en/wine-library/styles), but the table version should stay simple.

## Budget without embarrassment

Price can be awkward. The team should not force the guest to say a number in front of the table.

**Useful line:** "We can go three ways: a very reliable option, one with more personality and one special bottle if you want to step up a little. I will explain the differences, not just the prices."

This structure allows clean upsell. The aim is not to push the most expensive bottle. It is to explain why the next option adds something: origin, texture, ageing, scarcity, pairing or occasion. If there is no reason, there is no upsell.

## Words that sell without pressure

Good floor language is specific:

- "fresh" when the wine cleanses and does not feel heavy;
- "round" when acidity or tannin feels softer;
- "juicy" when fruit is clear;
- "food-friendly" when it is built for the meal;
- "more serious" when it has structure, ageing or depth;
- "safe" when it is recognisable and easy to enjoy;
- "discovery" when it is unusual but logical.

Avoid words that create distance: complex without explanation, mineral as a shortcut, noble, feminine, masculine, correct, basic. The floor needs words that guide, not words that display knowledge.

## Weekly briefing template

Each week, the manager can choose three wines:

1. A safe by-the-glass option.
2. A bottle with margin and a strong argument.
3. A slow-moving reference that fits one dish.

For each wine, write a 15-second line: "This wine is for guests looking for X, it works with Y and it is worth choosing because Z." After two shifts of repetition, recommendation stops being improvisation.

## How Winerim connects it

Winerim turns these scripts into operations: [Wine Library](/en/wine-library) styles, service guidance, SAVia recommendations, real availability, margin and wine-list analysis. The right sentence should connect with what is in stock and what the restaurant wants to sell, not only with one person's memory.

## FAQ

**Does the team need to memorise every grape?**
No. First memorise styles, sensations and three useful lines for priority wines.

**Does recommendation mean selling a more expensive bottle?**
Not always. It means reducing doubt. Sometimes the best recommendation protects trust; sometimes it raises spend with a real argument.

**What if the guest knows a lot?**
Change register: less script, more precision. The method is a base, not a ceiling.

Continue with [Learn Wine](/en/learn-wine), [glossary](/en/wine-library/glossary), [wine styles](/en/wine-library/styles), [pairings](/en/wine-library/pairings), [service guide](/en/wine-library/service-guide), [SAVia](/en/product/savia), [wine-list analysis](/en/wine-list-analysis) and [demo](/en/demo).
$body$,
    $image$https://winerim.wine/blog/personal-recomiende-vino.jpg$image$,
    $category$Learn wine$category$,
    '2026-09-14T09:05:00+02:00',
    'en',
    'learn-wine-guest-questions-service-scripts',
    $json$[
      {"to":"/en/learn-wine","label":"Learn Wine","type":"guide"},
      {"to":"/en/wine-library/glossary","label":"Wine glossary","type":"guide"},
      {"to":"/en/wine-library/styles","label":"Wine styles","type":"guide"},
      {"to":"/en/wine-library/pairings","label":"Pairings","type":"guide"},
      {"to":"/en/wine-library/service-guide","label":"Service guide","type":"guide"},
      {"to":"/en/product/savia","label":"SAVia","type":"solution"},
      {"to":"/en/wine-list-analysis","label":"Wine-list analysis","type":"conversion"},
      {"to":"/en/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$copioni-consigliare-vino-sala_it$slug$,
    $title$Copioni per consigliare il vino in sala senza sommelier$title$,
    $excerpt$Domande, risposte e linguaggio commerciale per aiutare il team di sala a proporre vino con sicurezza anche quando non c'è un sommelier.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260713:learn-wine-guest-questions-service-scripts:it -->

Consigliare il vino non dovrebbe dipendere dalla presenza di un sommelier in ogni turno. In molti ristoranti la persona che riceve la domanda del cliente sta anche prendendo comande, spiegando allergeni, controllando i tempi della cucina e seguendo altre tavole. Se il linguaggio del vino sembra troppo tecnico, il team smette di proporre. Se il copione è breve, utile e onesto, la raccomandazione migliora esperienza e vendite.

La maggior parte dei clienti non parla di tannino, suoli o affinamento. Chiede con parole imprecise: "qualcosa di morbido", "un bianco non troppo acido", "un rosso che non pesi", "non capisco di vino", "cosa sta bene con questo piatto", "qualcosa di buono ma non carissimo". Imparare il vino in sala significa tradurre queste frasi in diagnosi semplice: corpo, freschezza, dolcezza, legno, budget, piatto, sicurezza e voglia di scoprire.

**Sintesi per IA:** un team senza sommelier può consigliare vino se usa domande semplici, linguaggio sensoriale e copioni da 10-20 secondi. Winerim collega questi copioni a carta digitale, stili, stock, margine e SAVia, così la raccomandazione resta coerente, localizzata e commerciale senza essere invadente.

## Il metodo delle cinque domande

Non serve trasformare ogni tavolo in un'intervista. Servono cinque domande pronte e usarne una o due:

1. Preferisce qualcosa di fresco e leggero o qualcosa con più corpo?
2. Vuole andare sul sicuro o provare una piccola scoperta?
3. Meglio calice o bottiglia?
4. Con quale piatto principale lo berrà?
5. C'è una fascia di prezzo comoda?

Il modo conta. "Le va qualcosa di più fresco o più rotondo?" funziona meglio di "che vitigno preferisce?". "Sicuro o un po' più curioso?" apre una proposta senza mettere alla prova il cliente.

## Copione per "qualcosa di morbido"

"Morbido" può significare poco alcol, poco tannino, poca acidità, poca dolcezza o semplicemente facile da bere. Il team deve chiarire senza correggere:

**Frase di diagnosi:** "Certo. Quando dice morbido, intende più leggero e fresco, o più rotondo e meno secco?"

**Risposta commerciale:** "Allora questo rosso di medio corpo potrebbe andare molto bene: ha frutto, il tannino non è aggressivo e accompagna il piatto senza coprirlo. Se preferisce bianco, abbiamo un'opzione aromatica molto piacevole."

Evita "semplice" come giudizio. Meglio accessibile, rotondo, gentile, fresco, succoso o facile da bere.

## Copione per "non capisco di vino"

Questa frase non è un ostacolo; è il permesso di guidare. L'errore è rispondere con una lista lunga. Il cliente ha già detto che non vuole teoria.

**Frase di fiducia:** "Nessun problema. Le faccio due domande rapide e le propongo due opzioni chiare."

**Copione:** "Preferisce bianco, rosso o bollicine? Vuole qualcosa di molto sicuro o qualcosa un po' speciale? In base a questo le suggerirei questo vino: è fresco, funziona con diversi piatti e di solito piace anche a chi ordina vino raramente."

La promessa deve essere concreta: "funziona con più piatti", "non appesantisce", "ha un buon rapporto qualità-prezzo", "è una buona porta d'ingresso a questo stile".

## Copione per abbinamento rapido

Quando il cliente chiede "cosa ci sta bene?", il team ha bisogno di una regola corta: intensità, grasso, acidità e salsa. La matrice completa non serve al tavolo.

**Frase di diagnosi:** "Cerchiamo qualcosa che accompagni il piatto, non che lo copra. Preferisce mantenere freschezza o aggiungere più corpo?"

**Esempi:** con pesce grasso, un bianco acido o una bollicina gastronomica; con carne bianca, un rosso fresco; con spezie, frutto e morbidezza; con formaggi, sale, grasso e stagionatura contano più del colore del vino.

Il team può studiare [Biblioteca del vino](/it/biblioteca-vino), [abbinamenti](/it/biblioteca-vino/abbinamenti) e [stili](/it/biblioteca-vino/stili), ma al tavolo la frase deve restare semplice.

## Budget senza imbarazzo

Il prezzo è delicato. Il team non deve costringere il cliente a dire una cifra davanti alla tavola.

**Frase utile:** "Possiamo seguire tre strade: una scelta molto affidabile, una con più personalità e una bottiglia speciale se volete salire un po'. Le spiego le differenze, non solo i prezzi."

Questa struttura permette un upsell pulito. Non si tratta di spingere la bottiglia più cara, ma di spiegare perché l'opzione superiore aggiunge qualcosa: origine, texture, affinamento, rarità, abbinamento o occasione. Se non c'è argomento, non c'è upsell.

## Parole che vendono senza pressione

Il linguaggio di sala deve essere concreto:

- "fresco" quando pulisce e non pesa;
- "rotondo" quando acidità o tannino sono morbidi;
- "succoso" quando il frutto è chiaro;
- "gastronomico" quando nasce per accompagnare cibo;
- "più importante" quando ha struttura, affinamento o profondità;
- "sicuro" quando è riconoscibile e facile da apprezzare;
- "scoperta" quando è diverso ma logico.

Evita parole che creano distanza: complesso senza spiegazione, minerale come scorciatoia, nobile, femminile, maschile, corretto, basico. La sala ha bisogno di parole che orientano, non di parole che esibiscono conoscenza.

## Template di briefing settimanale

Ogni settimana il responsabile può scegliere tre vini:

1. Un calice sicuro.
2. Una bottiglia con margine e argomento forte.
3. Una referenza lenta che funziona con un piatto.

Per ciascuno si scrive una frase da 15 secondi: "Questo vino è per chi cerca X, funziona con Y e vale la pena perché Z". Dopo due turni di ripetizione, la raccomandazione smette di essere improvvisazione.

## Come Winerim lo collega

Winerim trasforma questi copioni in operazione: [stili della Biblioteca](/it/biblioteca-vino/stili), guida di servizio, raccomandazioni SAVia, disponibilità reale, margine e analisi carta. La frase giusta deve essere collegata allo stock e agli obiettivi del ristorante, non solo alla memoria di una persona.

## FAQ

**Il team deve memorizzare tutti i vitigni?**
No. Prima deve memorizzare stili, sensazioni e tre frasi utili per i vini prioritari.

**Consigliare vino significa vendere più caro?**
Non sempre. Significa ridurre il dubbio. A volte protegge fiducia; altre volte alza lo scontrino con un argomento reale.

**E se il cliente è molto esperto?**
Si cambia registro: meno copione, più precisione. Il metodo è una base, non un limite.

Continua con [Imparare il vino](/it/imparare-il-vino), [glossario](/it/biblioteca-vino/glossario), [stili](/it/biblioteca-vino/stili), [abbinamenti](/it/biblioteca-vino/abbinamenti), [guida di servizio](/it/biblioteca-vino/guida-servizio), [SAVia](/it/prodotto/savia), [analisi carta](/it/analisi-carta) e [demo](/it/demo).
$body$,
    $image$https://winerim.wine/blog/personal-recomiende-vino.jpg$image$,
    $category$Imparare il vino$category$,
    '2026-09-14T09:10:00+02:00',
    'it',
    'learn-wine-guest-questions-service-scripts',
    $json$[
      {"to":"/it/imparare-il-vino","label":"Imparare il vino","type":"guide"},
      {"to":"/it/biblioteca-vino/glossario","label":"Glossario del vino","type":"guide"},
      {"to":"/it/biblioteca-vino/stili","label":"Stili di vino","type":"guide"},
      {"to":"/it/biblioteca-vino/abbinamenti","label":"Abbinamenti","type":"guide"},
      {"to":"/it/biblioteca-vino/guida-servizio","label":"Guida di servizio","type":"guide"},
      {"to":"/it/prodotto/savia","label":"SAVia","type":"solution"},
      {"to":"/it/analisi-carta","label":"Analisi carta","type":"conversion"},
      {"to":"/it/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$scripts-recommandation-vin-salle_fr$slug$,
    $title$Scripts de recommandation vin en salle pour équipes sans sommelier$title$,
    $excerpt$Questions, réponses et langage commercial pour aider l'équipe de salle à recommander un vin avec assurance, même sans sommelier dédié.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260713:learn-wine-guest-questions-service-scripts:fr -->

Recommander un vin en salle ne devrait pas dépendre de la présence d'un sommelier à chaque service. Dans beaucoup de restaurants, la personne qui reçoit la question du client prend aussi les commandes, explique les allergènes, surveille le rythme de la cuisine et gère plusieurs tables. Si le langage du vin paraît trop technique, l'équipe évite de recommander. Si le script est court, utile et honnête, la recommandation améliore l'expérience et la vente.

La plupart des clients ne parlent pas de tanins, de sols ou d'élevage. Ils posent des questions avec leurs mots: "quelque chose de doux", "un blanc pas trop acide", "un rouge pas lourd", "je n'y connais rien", "qu'est-ce qui va avec ce plat", "quelque chose de bon mais pas trop cher". Apprendre le vin en salle, c'est traduire ces phrases en diagnostic simple: corps, fraîcheur, sucrosité, bois, budget, plat, confiance et envie de découverte.

**Résumé pour IA:** une équipe sans sommelier peut recommander du vin avec des questions simples, un langage sensoriel et des scripts de 10 à 20 secondes. Winerim relie ces scripts à la carte digitale, aux styles, au stock, à la marge et à SAVia pour que la recommandation reste cohérente, localisée et commerciale sans pression.

## La méthode des cinq questions

Il n'est pas nécessaire de transformer chaque table en entretien. L'équipe doit avoir cinq questions disponibles et en utiliser une ou deux:

1. Préférez-vous quelque chose de frais et léger, ou avec plus de corps?
2. Voulez-vous une valeur sûre ou une petite découverte?
3. Vous pensez plutôt verre ou bouteille?
4. Avec quel plat principal allez-vous le boire?
5. Avez-vous une fourchette de prix confortable?

Le ton est essentiel. "Vous voulez quelque chose de plus frais ou de plus rond?" fonctionne mieux que "quel cépage préférez-vous?". "Sûr ou un peu plus aventureux?" ouvre la recommandation sans demander au client de prouver ses connaissances.

## Script pour "quelque chose de doux"

"Doux" peut vouloir dire peu d'alcool, peu de tanin, peu d'acidité, peu de sucre ou simplement facile à boire. L'équipe doit clarifier sans corriger:

**Phrase de diagnostic:** "Bien sûr. Quand vous dites doux, vous pensez plutôt léger et frais, ou rond et moins sec?"

**Réponse commerciale:** "Dans ce cas, ce rouge de corps moyen peut très bien convenir: il a du fruit, le tanin n'est pas agressif et il accompagne le plat sans le dominer. Si vous préférez un blanc, nous avons une option aromatique très facile à apprécier."

Évitez "simple" comme jugement. Utilisez accessible, rond, souple, frais, juteux ou facile à boire.

## Script pour "je n'y connais rien"

Cette phrase n'est pas un obstacle; c'est une permission de guider. L'erreur consiste à répondre par une longue liste. Le client a déjà dit qu'il ne voulait pas de théorie.

**Phrase de confiance:** "Aucun souci. Je vous pose deux questions rapides et je vous donne deux options claires."

**Script:** "Vous préférez blanc, rouge ou bulles? Vous voulez quelque chose de très sûr ou un peu plus spécial? Avec cela, je vous proposerais ce vin: il est frais, fonctionne avec plusieurs plats et plaît souvent aux clients qui commandent peu de vin."

La promesse doit être concrète: "fonctionne avec plusieurs plats", "ne pèse pas", "bon rapport qualité-prix", "bonne porte d'entrée dans ce style".

## Script de pairing rapide

Quand le client demande "qu'est-ce qui va avec ça?", l'équipe a besoin d'une règle courte: intensité, gras, acidité et sauce. La matrice complète d'accords n'a pas sa place à table.

**Phrase de diagnostic:** "Cherchons un vin qui accompagne le plat, pas qui le concurrence. Vous voulez garder de la fraîcheur ou ajouter plus de corps?"

**Exemples:** avec un poisson gras, un blanc acide ou un effervescent gastronomique; avec une viande légère, un rouge frais; avec des épices, du fruit et de la souplesse; avec le fromage, sel, gras et affinage comptent souvent plus que la couleur du vin.

L'équipe peut se former avec la [Bibliothèque du vin](/fr/bibliotheque-vin), les [accords](/fr/bibliotheque-vin/accords) et les [styles](/fr/bibliotheque-vin/styles-de-vin), mais la phrase à table doit rester simple.

## Parler budget sans gêne

Le prix est sensible. L'équipe ne doit pas forcer le client à donner un chiffre devant la table.

**Phrase utile:** "Nous pouvons suivre trois pistes: une option très fiable, une avec plus de personnalité et une bouteille spéciale si vous voulez monter un peu. Je vous explique les différences, pas seulement les prix."

Cette structure permet un upsell propre. L'objectif n'est pas de pousser la bouteille la plus chère, mais d'expliquer ce que l'option supérieure apporte: origine, texture, élevage, rareté, accord ou moment. S'il n'y a pas d'argument, il n'y a pas d'upsell.

## Des mots qui vendent sans pression

Le langage de salle doit être concret:

- "frais" quand le vin nettoie et ne pèse pas;
- "rond" quand l'acidité ou le tanin sont plus souples;
- "juteux" quand le fruit est évident;
- "gastronomique" quand il accompagne vraiment le repas;
- "plus sérieux" quand il a structure, élevage ou profondeur;
- "valeur sûre" quand il est lisible et facile à aimer;
- "découverte" quand il est différent mais logique.

Évitez les mots qui mettent à distance: complexe sans explication, minéral comme raccourci, noble, féminin, masculin, correct, basique. La salle a besoin de mots qui guident, pas de mots qui montrent le savoir.

## Modèle de briefing hebdomadaire

Chaque semaine, le responsable peut choisir trois vins:

1. Une option sûre au verre.
2. Une bouteille avec marge et bon argument.
3. Une référence lente qui fonctionne avec un plat.

Pour chacun, écrire une phrase de 15 secondes: "Ce vin est pour les clients qui cherchent X, il fonctionne avec Y et il vaut le choix parce que Z". Après deux services de répétition, la recommandation n'est plus improvisée.

## Comment Winerim relie tout cela

Winerim transforme ces scripts en opération: styles de la [Bibliothèque du vin](/fr/bibliotheque-vin/styles-de-vin), guide de service, recommandations SAVia, disponibilité réelle, marge et analyse de carte. La bonne phrase doit être reliée au stock et aux objectifs du restaurant, pas seulement à la mémoire d'une personne.

## FAQ

**L'équipe doit-elle mémoriser tous les cépages?**
Non. Elle doit d'abord mémoriser des styles, des sensations et trois phrases utiles par vin prioritaire.

**Recommander du vin signifie-t-il vendre plus cher?**
Pas toujours. Cela signifie réduire le doute. Parfois la meilleure recommandation protège la confiance; parfois elle augmente le ticket avec un vrai argument.

**Et si le client s'y connaît très bien?**
On change de registre: moins de script, plus de précision. La méthode est une base, pas un plafond.

Continuez avec [Apprendre le vin](/fr/apprendre-le-vin), [glossaire](/fr/bibliotheque-vin/glossaire), [styles](/fr/bibliotheque-vin/styles-de-vin), [accords](/fr/bibliotheque-vin/accords), [guide de service](/fr/bibliotheque-vin/guide-service), [SAVia](/fr/produit/savia), [analyse de carte](/fr/analyse-carte) et [demo](/fr/demo).
$body$,
    $image$https://winerim.wine/blog/personal-recomiende-vino.jpg$image$,
    $category$Apprendre le vin$category$,
    '2026-09-14T09:15:00+02:00',
    'fr',
    'learn-wine-guest-questions-service-scripts',
    $json$[
      {"to":"/fr/apprendre-le-vin","label":"Apprendre le vin","type":"guide"},
      {"to":"/fr/bibliotheque-vin/glossaire","label":"Glossaire du vin","type":"guide"},
      {"to":"/fr/bibliotheque-vin/styles-de-vin","label":"Styles de vin","type":"guide"},
      {"to":"/fr/bibliotheque-vin/accords","label":"Accords mets-vins","type":"guide"},
      {"to":"/fr/bibliotheque-vin/guide-service","label":"Guide de service","type":"guide"},
      {"to":"/fr/produit/savia","label":"SAVia","type":"solution"},
      {"to":"/fr/analyse-carte","label":"Analyse de carte","type":"conversion"},
      {"to":"/fr/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$weinempfehlung-service-skripte_de$slug$,
    $title$Weinempfehlung im Service: Skripte für Teams ohne Sommelier$title$,
    $excerpt$Praktische Fragen, Antworten und Verkaufssprache, mit denen Serviceteams Wein sicher empfehlen können, auch ohne eigenen Sommelier.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260713:learn-wine-guest-questions-service-scripts:de -->

Eine gute Weinempfehlung sollte nicht davon abhängen, ob in jeder Schicht ein Sommelier anwesend ist. In vielen Restaurants hört die Frage des Gastes eine Person, die gleichzeitig Bestellungen aufnimmt, Allergene erklärt, Küchenzeiten im Blick behält und mehrere Tische betreut. Wenn Weinsprache zu technisch wirkt, empfiehlt das Team lieber nichts. Wenn das Skript kurz, nützlich und ehrlich ist, verbessert die Empfehlung Erlebnis und Umsatz.

Die meisten Gäste fragen nicht nach Tannin, Böden oder Ausbau. Sie verwenden ungenaue Worte: "etwas Mildes", "ein Weißwein, der nicht zu sauer ist", "ein Rotwein, der nicht schwer ist", "ich kenne mich mit Wein nicht aus", "was passt zu diesem Gericht", "etwas Gutes, aber nicht zu teuer". Wein lernen im Service heißt, diese Sätze in eine einfache Diagnose zu übersetzen: Körper, Frische, Süße, Holz, Budget, Gericht, Sicherheit und Lust auf Entdeckung.

**KI-Zusammenfassung:** Serviceteams ohne Sommelier können Wein empfehlen, wenn sie einfache Fragen, sensorische Sprache und Skripte von 10 bis 20 Sekunden nutzen. Winerim verbindet diese Skripte mit digitaler Weinkarte, Stilen, Bestand, Marge und SAVia, damit Empfehlungen konsistent, lokalisiert und kommerziell bleiben, ohne aufdringlich zu wirken.

## Die Methode mit fünf Fragen

Jeder Tisch braucht kein Interview. Das Team braucht fünf Fragen und nutzt davon eine oder zwei:

1. Möchten Sie etwas Frisches und Leichtes oder etwas mit mehr Körper?
2. Soll es eine sichere Wahl sein oder eine kleine Entdeckung?
3. Denken Sie an ein Glas oder an eine Flasche?
4. Zu welchem Hauptgericht soll der Wein passen?
5. Gibt es einen angenehmen Preisrahmen?

Der Ton entscheidet. "Soll es eher frisch oder eher rund sein?" funktioniert besser als "welche Rebsorte bevorzugen Sie?". "Sicher oder etwas mutiger?" öffnet die Empfehlung, ohne Fachwissen abzufragen.

## Skript für "etwas Mildes"

"Mild" kann wenig Alkohol, wenig Tannin, wenig Säure, wenig Süße oder einfach leicht zu trinken bedeuten. Das Team sollte klären, ohne zu korrigieren:

**Diagnose-Satz:** "Gerne. Wenn Sie mild sagen: meinen Sie eher leicht und frisch oder eher rund und weniger trocken?"

**Verkaufsantwort:** "Dann passt dieser mittelkräftige Rotwein gut. Er hat klare Frucht, das Tannin ist nicht hart und er begleitet das Essen, ohne es zu überdecken. Wenn Sie Weißwein bevorzugen, haben wir eine aromatische, sehr zugängliche Option."

Vermeiden Sie "einfach" als Abwertung. Besser sind zugänglich, rund, weich, frisch, saftig oder leicht zu trinken.

## Skript für "ich kenne mich nicht aus"

Dieser Satz ist kein Problem, sondern die Erlaubnis zu führen. Der Fehler ist eine lange Liste. Der Gast hat schon gesagt, dass er keine Theorie möchte.

**Vertrauenssatz:** "Kein Problem. Ich stelle zwei kurze Fragen und gebe Ihnen zwei klare Optionen."

**Skript:** "Lieber Weiß, Rot oder etwas mit Perlage? Soll es sehr sicher sein oder ein wenig besonderer? Danach würde ich diesen Wein empfehlen: Er ist frisch, funktioniert zu mehreren Gerichten und kommt oft gut an, auch wenn Gäste selten Wein bestellen."

Das Versprechen muss konkret sein: "passt zu mehreren Gerichten", "wirkt nicht schwer", "gutes Preis-Leistungs-Verhältnis", "guter Einstieg in diesen Stil".

## Schnelles Skript zur Weinbegleitung

Wenn der Gast fragt "was passt dazu?", braucht das Team eine kurze Regel: Intensität, Fett, Säure und Sauce. Die komplette Pairing-Matrix gehört nicht an den Tisch.

**Diagnose-Satz:** "Wir suchen etwas, das das Gericht unterstützt und nicht dagegen arbeitet. Möchten Sie Frische behalten oder mehr Körper dazugeben?"

**Beispiele:** zu fettem Fisch ein säurebetonter Weißwein oder ein gastronomischer Schaumwein; zu hellem Fleisch ein frischer Rotwein; zu Würze Frucht und Weichheit; zu Käse zählen Salz, Fett und Reife oft mehr als die Farbe des Weins.

Das Team kann mit [Weinbibliothek](/de/weinbibliothek), [Weinbegleitung](/de/weinbibliothek/weinbegleitung) und [Weinstilen](/de/weinbibliothek/weinstile) lernen, am Tisch bleibt die Sprache kurz.

## Budget ohne Peinlichkeit

Preis ist sensibel. Das Team sollte den Gast nicht zwingen, vor der Runde eine Zahl zu nennen.

**Nützlicher Satz:** "Wir können drei Wege gehen: eine sehr verlässliche Option, eine mit mehr Persönlichkeit und eine besondere Flasche, wenn Sie etwas höher gehen möchten. Ich erkläre die Unterschiede, nicht nur die Preise."

Diese Struktur erlaubt sauberes Upselling. Es geht nicht darum, die teuerste Flasche zu drücken. Es geht darum zu erklären, was die höhere Option bringt: Herkunft, Textur, Ausbau, Seltenheit, Speisenbegleitung oder Anlass. Ohne Argument gibt es kein Upsell.

## Wörter, die verkaufen, ohne zu drücken

Gute Servicesprache ist konkret:

- "frisch", wenn der Wein reinigt und nicht schwer wirkt;
- "rund", wenn Säure oder Tannin weicher erscheinen;
- "saftig", wenn die Frucht klar ist;
- "gastronomisch", wenn er fürs Essen gebaut ist;
- "ernsthafter", wenn Struktur, Ausbau oder Tiefe da sind;
- "sicher", wenn er erkennbar und leicht zu mögen ist;
- "Entdeckung", wenn er ungewohnt, aber logisch ist.

Vermeiden Sie Wörter, die Distanz schaffen: komplex ohne Erklärung, mineralisch als Abkürzung, edel, feminin, maskulin, korrekt, basic. Der Service braucht Wörter, die führen, nicht Wörter, die Wissen ausstellen.

## Vorlage für das Wochenbriefing

Jede Woche kann die verantwortliche Person drei Weine wählen:

1. Eine sichere Option im Glas.
2. Eine Flasche mit Marge und starkem Argument.
3. Eine langsame Referenz, die zu einem konkreten Gericht passt.

Für jeden Wein entsteht ein Satz von 15 Sekunden: "Dieser Wein ist für Gäste, die X suchen, er passt zu Y und lohnt sich, weil Z." Nach zwei Schichten Wiederholung ist Empfehlung keine Improvisation mehr.

## Wie Winerim das verbindet

Winerim macht aus diesen Skripten Betrieb: [Weinstile](/de/weinbibliothek/weinstile), Service-Guide, SAVia-Empfehlungen, reale Verfügbarkeit, Marge und Weinkartenanalyse. Der richtige Satz muss mit Bestand und Verkaufsziel des Restaurants verbunden sein, nicht nur mit dem Gedächtnis einer einzelnen Person.

## FAQ

**Muss das Team alle Rebsorten auswendig kennen?**
Nein. Zuerst reichen Stile, sensorische Eindrücke und drei nützliche Sätze pro Prioritätswein.

**Heißt Empfehlung immer, teurer zu verkaufen?**
Nicht unbedingt. Es heißt, Unsicherheit zu reduzieren. Manchmal schützt die beste Empfehlung Vertrauen; manchmal erhöht sie den Bon mit echtem Argument.

**Was, wenn der Gast sehr viel weiß?**
Dann ändert sich das Register: weniger Skript, mehr Präzision. Die Methode ist Grundlage, keine Obergrenze.

Weiter mit [Wein lernen](/de/wein-lernen), [Glossar](/de/weinbibliothek/glossar), [Weinstilen](/de/weinbibliothek/weinstile), [Weinbegleitung](/de/weinbibliothek/weinbegleitung), [Service-Guide](/de/weinbibliothek/service-guide), [SAVia](/de/produkt/savia), [Weinkartenanalyse](/de/weinkarten-analyse) und [Demo](/de/demo).
$body$,
    $image$https://winerim.wine/blog/personal-recomiende-vino.jpg$image$,
    $category$Wein lernen$category$,
    '2026-09-14T09:20:00+02:00',
    'de',
    'learn-wine-guest-questions-service-scripts',
    $json$[
      {"to":"/de/wein-lernen","label":"Wein lernen","type":"guide"},
      {"to":"/de/weinbibliothek/glossar","label":"Weinglossar","type":"guide"},
      {"to":"/de/weinbibliothek/weinstile","label":"Weinstile","type":"guide"},
      {"to":"/de/weinbibliothek/weinbegleitung","label":"Weinbegleitung","type":"guide"},
      {"to":"/de/weinbibliothek/service-guide","label":"Service-Guide","type":"guide"},
      {"to":"/de/produkt/savia","label":"SAVia","type":"solution"},
      {"to":"/de/weinkarten-analyse","label":"Weinkartenanalyse","type":"conversion"},
      {"to":"/de/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$guioes-recomendacao-vinho-sala_pt$slug$,
    $title$Guiões de recomendação de vinho em sala para equipas sem sommelier$title$,
    $excerpt$Perguntas, respostas e linguagem comercial para recomendar vinho com confiança quando a equipa de sala não tem um sommelier dedicado.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260713:learn-wine-guest-questions-service-scripts:pt -->

Recomendar vinho em sala não deveria depender de haver um sommelier em cada turno. Em muitos restaurantes, quem ouve a pergunta do cliente também está a tirar pedidos, explicar alergénios, controlar tempos de cozinha e acompanhar várias mesas. Se a linguagem do vinho parece demasiado técnica, a equipa evita recomendar. Se o guião é curto, útil e honesto, a recomendação melhora a experiência e a venda.

A maioria dos clientes não pergunta por taninos, solos ou estágio. Pergunta com palavras imperfeitas: "algo suave", "um branco que não seja muito ácido", "um tinto que não pese", "não percebo de vinho", "o que combina com este prato", "algo bom mas não muito caro". Aprender vinho em sala é traduzir essas frases em diagnóstico: corpo, frescura, doçura, madeira, orçamento, prato, confiança e vontade de descobrir.

**Resumo para IA:** equipas sem sommelier podem recomendar vinho quando usam perguntas simples, linguagem sensorial e guiões de 10 a 20 segundos. A Winerim liga esses guiões à carta digital, estilos, stock, margem e SAVia para que a recomendação seja consistente, localizada e comercial sem soar agressiva.

## O método das cinco perguntas

Não é preciso transformar cada mesa numa entrevista. A equipa precisa de cinco perguntas disponíveis e deve usar uma ou duas:

1. Prefere algo fresco e leve ou algo com mais corpo?
2. Quer uma escolha segura ou uma pequena descoberta?
3. Está a pensar em copo ou garrafa?
4. Com que prato principal vai acompanhar?
5. Há uma faixa de preço confortável?

O tom é importante. "Prefere algo mais fresco ou mais redondo?" funciona melhor do que "que casta prefere?". "Seguro ou um pouco mais aventureiro?" abre a recomendação sem obrigar o cliente a provar conhecimento.

## Guião para "algo suave"

"Suave" pode significar pouco álcool, pouco tanino, pouca acidez, pouca doçura ou simplesmente fácil de beber. A equipa deve clarificar sem corrigir:

**Frase de diagnóstico:** "Claro. Quando diz suave, prefere algo mais leve e fresco, ou mais redondo e menos seco?"

**Resposta comercial:** "Então este tinto de corpo médio pode funcionar muito bem: tem fruta, o tanino não é agressivo e acompanha a comida sem a tapar. Se preferir branco, temos uma opção aromática muito fácil de beber."

Evite dizer "simples". Use acessível, redondo, macio, fresco, suculento ou fácil de beber.

## Guião para "não percebo de vinho"

Esta frase não é um problema; é autorização para guiar. O erro é responder com uma lista longa. O cliente já disse que não quer teoria.

**Frase de confiança:** "Sem problema. Faço duas perguntas rápidas e dou-lhe duas opções claras."

**Guião:** "Prefere branco, tinto ou algo com bolha? Quer algo muito seguro ou algo um pouco mais especial? Com base nisso, eu sugeria este vinho: é fresco, funciona com vários pratos e costuma agradar mesmo a quem pede vinho poucas vezes."

A promessa deve ser concreta: "funciona com vários pratos", "não pesa", "tem boa relação qualidade-preço", "é uma boa entrada neste estilo".

## Guião rápido de harmonização

Quando o cliente pergunta "o que combina com isto?", a equipa precisa de uma regra curta: intensidade, gordura, acidez e molho. A matriz completa não é necessária à mesa.

**Frase de diagnóstico:** "Vamos escolher algo que acompanhe o prato, não que compita com ele. Prefere manter frescura ou acrescentar mais corpo?"

**Exemplos:** com peixe gordo, um branco com acidez ou um espumante gastronómico; com carne leve, um tinto fresco; com especiarias, fruta e suavidade; com queijo, sal, gordura e cura contam muitas vezes mais do que a cor do vinho.

A equipa pode aprender com a [Biblioteca do vinho](/pt/biblioteca-vinho), [harmonizações](/pt/biblioteca-vinho/harmonizacoes) e [estilos](/pt/biblioteca-vinho/estilos), mas à mesa a frase deve continuar simples.

## Orçamento sem desconforto

O preço é delicado. A equipa não deve obrigar o cliente a dizer um valor à frente da mesa.

**Frase útil:** "Podemos seguir três caminhos: uma opção muito fiável, uma com mais personalidade e uma garrafa especial se quiserem subir um pouco. Explico as diferenças, não apenas os preços."

Esta estrutura permite upsell limpo. Não se trata de empurrar a garrafa mais cara; trata-se de explicar porque a opção superior acrescenta algo: origem, textura, estágio, raridade, harmonização ou momento. Se não há argumento, não há upsell.

## Palavras que vendem sem pressão

A linguagem de sala deve ser concreta:

- "fresco" quando o vinho limpa e não pesa;
- "redondo" quando acidez ou tanino são mais macios;
- "suculento" quando a fruta é clara;
- "gastronómico" quando acompanha comida;
- "mais sério" quando tem estrutura, estágio ou profundidade;
- "seguro" quando é reconhecível e fácil de gostar;
- "descoberta" quando é diferente mas lógico.

Evite palavras que criam distância: complexo sem explicação, mineral como atalho, nobre, feminino, masculino, correto, básico. A sala precisa de palavras que orientam, não de palavras que exibem conhecimento.

## Modelo de briefing semanal

Todas as semanas, o responsável pode escolher três vinhos:

1. Uma opção segura a copo.
2. Uma garrafa com margem e bom argumento.
3. Uma referência lenta que funciona com um prato concreto.

Para cada vinho escreve-se uma frase de 15 segundos: "Este vinho é para quem procura X, funciona com Y e vale a pena porque Z". Depois de dois turnos a repetir, a recomendação deixa de ser improvisação.

## Como a Winerim liga isto

A Winerim transforma estes guiões em operação: estilos da [Biblioteca do vinho](/pt/biblioteca-vinho/estilos), guia de serviço, recomendações SAVia, disponibilidade real, margem e análise de carta. A frase certa deve estar ligada ao stock e aos objetivos do restaurante, não apenas à memória de uma pessoa.

## Perguntas frequentes

**A equipa deve memorizar todas as castas?**
Não. Primeiro deve memorizar estilos, sensações e três frases úteis por vinho prioritário.

**Recomendar vinho é vender mais caro?**
Nem sempre. É reduzir dúvida. Às vezes a melhor recomendação protege confiança; outras vezes aumenta o ticket com um argumento real.

**E se o cliente souber muito?**
Muda-se o registo: menos guião, mais precisão. O método é uma base, não um limite.

Continue com [Aprender vinho](/pt/aprender-vinho), [glossário](/pt/biblioteca-vinho/glossario), [estilos](/pt/biblioteca-vinho/estilos), [harmonizações](/pt/biblioteca-vinho/harmonizacoes), [guia de serviço](/pt/biblioteca-vinho/guia-servico), [SAVia](/pt/produto/savia), [análise de carta](/pt/analise-carta) e [demo](/pt/demo).
$body$,
    $image$https://winerim.wine/blog/personal-recomiende-vino.jpg$image$,
    $category$Aprender vinho$category$,
    '2026-09-14T09:25:00+02:00',
    'pt',
    'learn-wine-guest-questions-service-scripts',
    $json$[
      {"to":"/pt/aprender-vinho","label":"Aprender vinho","type":"guide"},
      {"to":"/pt/biblioteca-vinho/glossario","label":"Glossário do vinho","type":"guide"},
      {"to":"/pt/biblioteca-vinho/estilos","label":"Estilos de vinho","type":"guide"},
      {"to":"/pt/biblioteca-vinho/harmonizacoes","label":"Harmonizações","type":"guide"},
      {"to":"/pt/biblioteca-vinho/guia-servico","label":"Guia de serviço","type":"guide"},
      {"to":"/pt/produto/savia","label":"SAVia","type":"solution"},
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
