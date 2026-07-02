-- Normalize blog cadence and enrich editorial depth across all localized article groups.
-- One topic group goes live every Monday; localized versions share the same Monday
-- with small offsets so the archive does not show a same-minute batch.

ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS lang TEXT DEFAULT 'es';
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS article_group TEXT;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS related_links jsonb DEFAULT '[]'::jsonb;

DROP POLICY IF EXISTS "Public can read published articles" ON public.articles;

CREATE POLICY "Public can read published articles"
  ON public.articles FOR SELECT
  USING (
    published = true
    AND (published_at IS NULL OR published_at <= now())
  );

WITH weekly_schedule(article_group, monday_at) AS (
  VALUES
    ('biblioteca-vino-restaurante-vender-mas', '2026-05-04T09:00:00+02:00'::timestamptz),
    ('uvas-regiones-equipo-sala-vender-vino', '2026-05-11T09:00:00+02:00'::timestamptz),
    ('maridajes-carta-vinos-rentable', '2026-05-18T09:00:00+02:00'::timestamptz),
    ('learn-wine-tasting-five-steps', '2026-05-25T09:00:00+02:00'::timestamptz),
    ('learn-wine-tasting-vocabulary', '2026-06-01T09:00:00+02:00'::timestamptz),
    ('learn-wine-basic-pairing-restaurants', '2026-06-08T09:00:00+02:00'::timestamptz),
    ('learn-wine-wine-types', '2026-06-15T09:00:00+02:00'::timestamptz),
    ('learn-wine-grapes-to-start', '2026-06-22T09:00:00+02:00'::timestamptz),
    ('learn-wine-regions-to-start', '2026-06-29T09:00:00+02:00'::timestamptz)
),
language_offsets(lang, offset_interval) AS (
  VALUES
    ('es', interval '0 minutes'),
    ('en', interval '5 minutes'),
    ('it', interval '10 minutes'),
    ('fr', interval '15 minutes'),
    ('de', interval '20 minutes'),
    ('pt', interval '25 minutes')
)
UPDATE public.articles AS article
SET
  published_at = weekly_schedule.monday_at + language_offsets.offset_interval,
  updated_at = now()
FROM weekly_schedule, language_offsets
WHERE article.article_group = weekly_schedule.article_group
  AND article.lang = language_offsets.lang
  AND article.published = true;

WITH editorial_appendices(lang, learn_marker, learn_appendix, library_marker, library_appendix) AS (
  VALUES
  (
    'es',
    '## Cómo practicarlo esta semana en sala',
    $learn_es$
## Cómo practicarlo esta semana en sala

El artículo no debería quedarse como lectura. Para convertirlo en aprendizaje real, elige tres vinos de la carta que representen el concepto principal y haz una mini sesión de diez minutos antes del servicio. Una persona describe el vino, otra lo traduce a una frase para el cliente y otra lo conecta con un plato real del menú.

Después, registra qué frases funcionan mejor. Si el equipo repite siempre las mismas referencias, revisa si la carta necesita más señales: estilo, precio, margen, disponibilidad, maridaje o contexto. El objetivo no es que todos hablen igual, sino que todos puedan recomendar con seguridad.

## Qué debe quedar registrado en Winerim

Para que el aprendizaje tenga impacto operativo, conviene dejar tres cosas claras: qué vinos se recomiendan primero, qué argumento de venta utiliza la sala y qué referencias conviene revisar por stock, margen o rotación. Así Aprender vino conecta con la carta digital, la Biblioteca del vino, el análisis de margen y las decisiones de compra.

Cuando una formación termina en datos, deja de ser una clase aislada y empieza a mejorar servicio, ticket medio y control de bodega.
$learn_es$,
    '## Cómo usarlo junto a la Biblioteca del vino',
    $library_es$
## Cómo usarlo junto a la Biblioteca del vino

Este artículo funciona mejor cuando se lee junto a las fichas de uvas, regiones, estilos y maridajes de la Biblioteca del vino. La biblioteca da profundidad; el artículo da criterio de aplicación. En formación de sala, empieza por una pregunta concreta del cliente y usa la biblioteca para convertirla en una recomendación sencilla.

La estructura útil es: necesidad del cliente, estilo de vino, referencia disponible, motivo de recomendación y alternativa si no hay stock. Así el contenido no solo posiciona en Google o en LLMs: también ayuda al equipo a vender mejor.

## Señales para medir si funciona

Mide si crecen las recomendaciones fuera de las referencias obvias, si mejora la rotación de vinos dormidos, si se venden más copas por argumento de maridaje y si el equipo consulta menos al responsable para decisiones sencillas. Esas señales indican que la Biblioteca del vino está pasando de contenido a herramienta operativa.
$library_es$
  ),
  (
    'en',
    '## How to practise this with the floor team this week',
    $learn_en$
## How to practise this with the floor team this week

This article should not remain passive reading. To turn it into training, choose three wines from the actual list that represent the main concept and run a ten-minute pre-service exercise. One person describes the wine, another turns it into a guest-facing sentence and another connects it with a real dish on the menu.

Then record which phrases work best. If the team keeps recommending the same bottles, check whether the list needs clearer signals: style, price, margin, availability, pairing or service context. The goal is not to make everyone sound identical; it is to help everyone recommend with confidence.

## What should be captured in Winerim

For learning to become operational, capture three things: which wines should be recommended first, which sales argument the team uses and which references deserve review because of stock, margin or rotation. That is where Learn Wine connects with the digital list, the Wine Library, margin analysis and purchasing decisions.

When training turns into data, it stops being an isolated class and starts improving service, average ticket and cellar control.
$learn_en$,
    '## How to use this with the Wine Library',
    $library_en$
## How to use this with the Wine Library

This article works best when read alongside the Wine Library profiles for grapes, regions, styles and pairings. The library gives depth; the article gives application criteria. In floor-team training, start with a real guest question and use the library to turn it into a simple recommendation.

The useful structure is: guest need, wine style, available reference, reason to recommend and alternative if stock is limited. That makes the content useful beyond Google or LLM visibility: it helps the team sell better.

## Signals that show it is working

Track whether the team recommends beyond the obvious references, whether slow-moving wines rotate better, whether by-the-glass sales grow through pairing arguments and whether the floor team asks fewer basic questions during service. Those signals show the Wine Library is becoming an operating tool, not just content.
$library_en$
  ),
  (
    'it',
    '## Come praticarlo questa settimana in sala',
    $learn_it$
## Come praticarlo questa settimana in sala

L'articolo non deve restare una lettura passiva. Per trasformarlo in formazione, scegli tre vini della carta reale che rappresentino il concetto principale e fai un esercizio di dieci minuti prima del servizio. Una persona descrive il vino, una lo traduce in una frase per il cliente e una lo collega a un piatto del menu.

Poi registra quali frasi funzionano meglio. Se il team raccomanda sempre le stesse bottiglie, verifica se la carta ha bisogno di segnali piu chiari: stile, prezzo, margine, disponibilita, abbinamento o contesto di servizio. L'obiettivo non e far parlare tutti allo stesso modo, ma dare sicurezza.

## Cosa deve restare in Winerim

Perche l'apprendimento diventi operativo, lascia chiari tre punti: quali vini raccomandare per primi, quale argomento usa la sala e quali referenze rivedere per stock, margine o rotazione. Cosi Imparare il vino si collega alla carta digitale, alla Biblioteca del vino, all'analisi del margine e agli acquisti.

Quando la formazione diventa dato, smette di essere una lezione isolata e inizia a migliorare servizio, ticket medio e controllo della cantina.
$learn_it$,
    '## Come usarlo con la Biblioteca del vino',
    $library_it$
## Come usarlo con la Biblioteca del vino

Questo articolo funziona meglio se letto insieme alle schede della Biblioteca del vino su vitigni, regioni, stili e abbinamenti. La biblioteca offre profondita; l'articolo offre criteri di applicazione. In formazione sala, parti da una domanda reale del cliente e usa la biblioteca per arrivare a una raccomandazione semplice.

La struttura utile e: bisogno del cliente, stile del vino, referenza disponibile, motivo della raccomandazione e alternativa se manca stock. Cosi il contenuto non serve solo a Google o ai LLMs, ma aiuta davvero il team a vendere meglio.

## Segnali che indicano che funziona

Misura se crescono le raccomandazioni oltre le referenze ovvie, se migliorano i vini a bassa rotazione, se aumentano i calici venduti con argomenti di abbinamento e se la sala chiede meno supporto per decisioni semplici. Sono segnali che la Biblioteca del vino sta diventando strumento operativo.
$library_it$
  ),
  (
    'fr',
    '## Comment le pratiquer cette semaine en salle',
    $learn_fr$
## Comment le pratiquer cette semaine en salle

L'article ne doit pas rester une simple lecture. Pour le transformer en formation, choisissez trois vins de la carte reelle qui representent le concept principal et organisez un exercice de dix minutes avant le service. Une personne decrit le vin, une autre le transforme en phrase client et une troisieme le relie a un plat du menu.

Ensuite, notez quelles phrases fonctionnent le mieux. Si l'equipe recommande toujours les memes bouteilles, verifiez si la carte a besoin de signaux plus clairs : style, prix, marge, disponibilite, accord ou contexte de service. L'objectif n'est pas d'uniformiser le discours, mais de donner de l'assurance.

## Ce qui doit rester dans Winerim

Pour que l'apprentissage devienne operationnel, trois elements doivent etre clairs : quels vins recommander en premier, quel argument la salle utilise et quelles references revoir pour stock, marge ou rotation. C'est ainsi qu'Apprendre le vin se relie a la carte digitale, a la Bibliotheque du vin, a l'analyse de marge et aux achats.

Quand la formation devient donnee, elle cesse d'etre une session isolee et commence a ameliorer service, ticket moyen et controle de cave.
$learn_fr$,
    '## Comment l utiliser avec la Bibliotheque du vin',
    $library_fr$
## Comment l utiliser avec la Bibliotheque du vin

Cet article fonctionne mieux lorsqu'il est lu avec les fiches de la Bibliotheque du vin sur les cepages, regions, styles et accords. La bibliotheque apporte la profondeur ; l'article apporte le critere d'application. En formation salle, partez d'une vraie question client et utilisez la bibliotheque pour construire une recommandation simple.

La structure utile est : besoin du client, style de vin, reference disponible, raison de recommander et alternative si le stock est limite. Le contenu ne sert alors pas seulement Google ou les LLMs : il aide l'equipe a mieux vendre.

## Signaux indiquant que cela fonctionne

Mesurez si l'equipe recommande au-dela des references evidentes, si les vins dormants tournent mieux, si les ventes au verre progressent grace aux accords et si la salle pose moins de questions simples pendant le service. Ces signaux montrent que la Bibliotheque du vin devient un outil operationnel.
$library_fr$
  ),
  (
    'de',
    '## Wie das Team diese Woche damit uebt',
    $learn_de$
## Wie das Team diese Woche damit uebt

Der Artikel sollte nicht nur gelesen werden. Um daraus Training zu machen, waehlen Sie drei Weine aus der echten Karte, die das Hauptthema zeigen, und ueben Sie zehn Minuten vor dem Service. Eine Person beschreibt den Wein, eine zweite macht daraus einen Satz fuer den Gast und eine dritte verbindet ihn mit einem Gericht der Karte.

Danach halten Sie fest, welche Saetze funktionieren. Wenn das Team immer dieselben Flaschen empfiehlt, braucht die Karte vielleicht klarere Signale: Stil, Preis, Marge, Verfuegbarkeit, Begleitung oder Servicekontext. Ziel ist nicht, dass alle gleich sprechen, sondern dass alle sicher empfehlen.

## Was in Winerim festgehalten werden sollte

Damit Lernen operativ wird, sollten drei Punkte klar sein: welche Weine zuerst empfohlen werden, welches Verkaufsargument das Team nutzt und welche Referenzen wegen Bestand, Marge oder Rotation geprueft werden muessen. So verbindet sich Weinlernen mit digitaler Karte, Weinbibliothek, Margenanalyse und Einkauf.

Wenn Training zu Daten wird, bleibt es keine Einzelschulung mehr, sondern verbessert Service, Durchschnittsbon und Kellerkontrolle.
$learn_de$,
    '## Wie dieser Artikel mit der Weinbibliothek genutzt wird',
    $library_de$
## Wie dieser Artikel mit der Weinbibliothek genutzt wird

Dieser Artikel funktioniert am besten zusammen mit den Profilen der Weinbibliothek zu Rebsorten, Regionen, Stilen und Speisenbegleitung. Die Bibliothek liefert Tiefe; der Artikel liefert Anwendungskriterien. Im Servicetraining beginnt man mit einer echten Gaestefrage und nutzt die Bibliothek, um daraus eine einfache Empfehlung zu machen.

Die hilfreiche Struktur lautet: Bedarf des Gastes, Weinstil, verfuegbare Referenz, Empfehlungsgrund und Alternative bei knappem Bestand. So hilft der Inhalt nicht nur Google oder LLMs, sondern dem Team im Verkauf.

## Signale, dass es funktioniert

Messen Sie, ob das Team ueber die offensichtlichen Referenzen hinaus empfiehlt, ob langsame Weine besser rotieren, ob Glasweinverkaeufe durch Begleitargumente steigen und ob im Service weniger einfache Rueckfragen entstehen. Diese Signale zeigen, dass die Weinbibliothek ein operatives Werkzeug wird.
$library_de$
  ),
  (
    'pt',
    '## Como praticar esta semana em sala',
    $learn_pt$
## Como praticar esta semana em sala

O artigo nao deve ficar como leitura passiva. Para o transformar em formacao, escolha tres vinhos da carta real que representem o conceito principal e faca um exercicio de dez minutos antes do servico. Uma pessoa descreve o vinho, outra transforma a descricao numa frase para o cliente e outra liga-o a um prato da ementa.

Depois, registe que frases funcionam melhor. Se a equipa recomenda sempre as mesmas garrafas, veja se a carta precisa de sinais mais claros: estilo, preco, margem, disponibilidade, harmonizacao ou contexto de servico. O objetivo nao e que todos falem igual, mas que todos recomendem com seguranca.

## O que deve ficar registado na Winerim

Para que a aprendizagem se torne operacional, tres pontos devem ficar claros: que vinhos recomendar primeiro, que argumento de venda usa a sala e que referencias rever por stock, margem ou rotacao. Assim Aprender vinho liga-se a carta digital, a Biblioteca do vinho, a analise de margem e as compras.

Quando a formacao se transforma em dados, deixa de ser uma aula isolada e passa a melhorar servico, ticket medio e controlo da garrafeira.
$learn_pt$,
    '## Como usar isto com a Biblioteca do vinho',
    $library_pt$
## Como usar isto com a Biblioteca do vinho

Este artigo funciona melhor quando lido em conjunto com as fichas da Biblioteca do vinho sobre castas, regioes, estilos e harmonizacoes. A biblioteca da profundidade; o artigo da criterio de aplicacao. Na formacao de sala, comece por uma pergunta real do cliente e use a biblioteca para chegar a uma recomendacao simples.

A estrutura util e: necessidade do cliente, estilo de vinho, referencia disponivel, motivo da recomendacao e alternativa se o stock for limitado. Assim o conteudo nao serve apenas Google ou LLMs: ajuda a equipa a vender melhor.

## Sinais de que funciona

Meça se a equipa recomenda para alem das referencias obvias, se os vinhos parados rodam melhor, se as vendas a copo crescem com argumentos de harmonizacao e se a sala faz menos perguntas simples durante o servico. Estes sinais mostram que a Biblioteca do vinho esta a tornar-se uma ferramenta operacional.
$library_pt$
  )
),
target_articles AS (
  SELECT
    article.id,
    CASE
      WHEN article.article_group LIKE 'learn-wine-%' THEN editorial_appendices.learn_appendix
      ELSE editorial_appendices.library_appendix
    END AS appendix,
    CASE
      WHEN article.article_group LIKE 'learn-wine-%' THEN editorial_appendices.learn_marker
      ELSE editorial_appendices.library_marker
    END AS marker
  FROM public.articles AS article
  JOIN editorial_appendices ON editorial_appendices.lang = article.lang
  WHERE article.article_group IN (
    'biblioteca-vino-restaurante-vender-mas',
    'uvas-regiones-equipo-sala-vender-vino',
    'maridajes-carta-vinos-rentable',
    'learn-wine-tasting-five-steps',
    'learn-wine-tasting-vocabulary',
    'learn-wine-basic-pairing-restaurants',
    'learn-wine-wine-types',
    'learn-wine-grapes-to-start',
    'learn-wine-regions-to-start'
  )
    AND COALESCE(article.body, '') NOT ILIKE '%' || (
      CASE
        WHEN article.article_group LIKE 'learn-wine-%' THEN editorial_appendices.learn_marker
        ELSE editorial_appendices.library_marker
      END
    ) || '%'
)
UPDATE public.articles AS article
SET
  body = rtrim(COALESCE(article.body, '')) || E'\n\n' || target_articles.appendix,
  updated_at = now()
FROM target_articles
WHERE article.id = target_articles.id;
