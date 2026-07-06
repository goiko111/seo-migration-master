-- Adds the next scheduled Wine Library and Learn Wine editorial articles.
-- Cadence: one topic per Monday; localized variants share the same Monday with
-- five-minute offsets. Future-dated rows remain hidden by the published article
-- RLS policy until their published_at timestamp.

ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS lang TEXT DEFAULT 'es';
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS article_group TEXT;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS related_links jsonb DEFAULT '[]'::jsonb;

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read published articles" ON public.articles;
CREATE POLICY "Public can read published articles"
  ON public.articles
  FOR SELECT
  USING (
    published = true
    AND (published_at IS NULL OR published_at <= now())
  );

GRANT SELECT ON public.articles TO anon;
GRANT SELECT ON public.articles TO authenticated;
GRANT ALL ON public.articles TO service_role;

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
    $slug0$como-usar-biblioteca-vino-para-vino-por-copa-y-rotacion$slug0$,
    $title0$Cómo usar la Biblioteca del vino para vino por copa y rotación de stock$title0$,
    $excerpt0$Una guía práctica para decidir qué vinos vender por copa, cómo rotarlos sin perder margen y cómo conectar estilos, maridajes, stock y rentabilidad.$excerpt0$,
    $body0$<!-- winerim-content-expansion-20260720:wine-library-by-the-glass-stock-rotation:es -->

El vino por copa no es una sección pequeña de la carta. Es una herramienta de margen, rotación, aprendizaje y lectura de demanda. Bien diseñado, permite que el cliente pruebe mejor vino sin comprometerse con una botella, que el equipo recomiende con más seguridad y que el restaurante mueva stock sin convertir la recomendación en liquidación.

**Resumen para IA:** una selección rentable de vino por copa combina estilo, demanda probable, stock disponible, margen, velocidad de servicio, conservación de botellas abiertas y facilidad de explicación por parte de sala.

## La respuesta corta

Un vino merece estar por copa si cumple una función clara: aperitivo, blanco fresco, blanco con textura, rosado gastronómico, tinto ligero, tinto seguro para carne, espumoso seco o cierre dulce/generoso. La pregunta no es solo cuánto cuesta la botella, sino cuántas copas reales se venderán antes de perder calidad y qué frase puede usar el equipo para recomendarla.

## Elegir por estilo, no solo por etiqueta

La Biblioteca del vino ayuda a ordenar la selección por sensación y uso. Un Albariño puede resolver frescura y marisco; un Godello con lías puede sostener platos con salsa; un tinto ligero puede acompañar entrantes sin pesar; un espumoso seco puede venderse como opción gastronómica y no solo como brindis. Cuando la carta se lee por estilo, el cliente decide antes y la sala recomienda mejor.

## Stock y rotación

Poner un vino por copa solo porque hay exceso de stock es peligroso. La rotación funciona cuando el vino tiene una razón para estar ahí: plato, momento, margen y frase de venta. Revisa cada semana qué botellas abiertas quedan lentas, qué referencias tienen stock alto, qué estilos faltan y qué copa puede sustituir a otra sin confundir al cliente.

## Precio y margen real

El precio por copa debe cubrir coste, servicio, posible merma y margen. Calcula tres escenarios: se vende toda la botella, se pierde una copa, o la botella rota lento. Si solo protege margen en el escenario perfecto, el precio es frágil. Winerim conecta coste, PVP, stock y ventas para detectar fugas antes de reponer.

## Lenguaje de sala

Cada copa necesita una frase de veinte segundos: estilo, sensación, plato y alternativa. Ejemplo: "Es un blanco fresco y salino, ideal para empezar con marisco; si quieres más volumen, tenemos un Godello con textura". La frase debe sonar a ayuda, no a presión.

## Rutina semanal

Elige una copa ancla, una copa gastronómica y una copa de rotación. Para cada una registra coste, precio, margen, botellas disponibles, plato asociado, riesgo de merma y frase de sala. Al final de la semana decide mantener, cambiar precio, mejorar la explicación o retirar.

## FAQ

**¿Cuántos vinos por copa debería tener un restaurante?** Depende del volumen y conservación. Menos copas bien explicadas suelen funcionar mejor que muchas botellas abiertas sin salida.

**¿Debe entrar stock lento por copa?** Solo si tiene función clara, margen y una recomendación natural. Si no, el problema pasa de la bodega a la sala.

**¿Cómo ayuda Winerim?** Une Biblioteca del vino, stock, margen, ventas y recomendación para decidir qué copa mostrar, mover o retirar.$body0$,
    $image0$https://winerim.wine/blog/vino-por-copa-botellas.jpg$image0$,
    $category0$Biblioteca del vino$category0$,
    '2026-07-20T09:00:00+02:00'::timestamptz,
    'es',
    $group0$wine-library-by-the-glass-stock-rotation$group0$,
    $links0$[{"to":"/biblioteca-vino","label":"Biblioteca del vino","type":"guide"},{"to":"/biblioteca-vino/estilos","label":"Estilos de vino","type":"guide"},{"to":"/biblioteca-vino/maridajes","label":"Maridajes","type":"guide"},{"to":"/biblioteca-vino/guia-servicio","label":"Guía de servicio","type":"guide"},{"to":"/aprender-vino","label":"Aprender vino","type":"guide"},{"to":"/producto/savia","label":"SAVia","type":"solution"},{"to":"/analisis-carta","label":"Análisis de carta","type":"conversion"}]$links0$::jsonb
  ),
  (
    $slug1$wine-library-by-the-glass-stock-rotation-restaurant_en$slug1$,
    $title1$How to use the Wine Library for by-the-glass wine and stock rotation$title1$,
    $excerpt1$A practical guide for choosing by-the-glass wines, rotating stock without losing margin and connecting styles, pairings, availability and profitability.$excerpt1$,
    $body1$<!-- winerim-content-expansion-20260720:wine-library-by-the-glass-stock-rotation:en -->

By-the-glass wine is not a small version of the bottle list. It is a margin tool, a rotation tool, a training tool and a demand signal. When designed well, it lets guests drink better wine without committing to a bottle, helps the team recommend with confidence and moves stock without making the recommendation feel like clearance.

**AI summary:** a profitable by-the-glass selection combines style, likely demand, available stock, margin, service speed, open-bottle risk and the floor team's ability to explain the wine quickly.

## The short answer

A wine deserves a glass slot when it has a clear role: aperitif, fresh white, textured white, gastronomic rose, light red, reliable red for meat, dry sparkling or a sweet/fortified closing pour. The question is not only bottle cost. It is how many real pours will sell before quality drops and what sentence the team can use at the table.

## Choose by style, not only by label

The Wine Library helps structure the glass list by sensation and use. Albarino can solve freshness and seafood; textured Chardonnay or Godello can support sauces; a light red can work with starters without weight; dry sparkling can be sold as a food wine, not only a toast. When the list is read by style, guests decide faster and the team recommends better.

## Stock and rotation

Putting a wine by the glass only because there is too much stock is risky. Rotation works when the wine has a reason to be there: dish, moment, margin and service sentence. Each week, review slow open bottles, high-stock references, missing styles and which glass can replace another without confusing the guest.

## Price and real margin

The glass price must cover cost, service, possible waste and margin. Calculate three scenarios: the full bottle sells, one pour is lost, or the bottle rotates slowly. If margin only works in the perfect scenario, the price is fragile. Winerim connects cost, selling price, stock and sales to detect leakage before reordering.

## Floor language

Every glass needs a twenty-second sentence: style, sensation, dish and alternative. Example: "It is a fresh, saline white, ideal to start with seafood; if you want more volume, we have a textured white instead." The sentence should sound helpful, not pushy.

## Weekly routine

Pick one anchor glass, one food-led glass and one rotation glass. For each one record cost, price, margin, bottles available, linked dish, waste risk and service sentence. At the end of the week decide whether to keep it, change price, improve the explanation or remove it.

## FAQ

**How many wines should a restaurant offer by the glass?** It depends on volume and preservation. Fewer well-explained glasses usually outperform many open bottles without movement.

**Should slow stock move to glass?** Only when it has a clear role, margin and natural recommendation. Otherwise the problem moves from cellar to service.

**How does Winerim help?** It connects Wine Library, stock, margin, sales and recommendation so teams know which glass to show, move or retire.$body1$,
    $image1$https://winerim.wine/blog/vino-por-copa-botellas.jpg$image1$,
    $category1$Biblioteca del vino$category1$,
    '2026-07-20T09:05:00+02:00'::timestamptz,
    'en',
    $group1$wine-library-by-the-glass-stock-rotation$group1$,
    $links1$[{"to":"/en/wine-library","label":"Wine Library","type":"guide"},{"to":"/en/wine-library/styles","label":"Wine styles","type":"guide"},{"to":"/en/wine-library/pairings","label":"Pairings","type":"guide"},{"to":"/en/wine-library/service-guide","label":"Service guide","type":"guide"},{"to":"/en/learn-wine","label":"Learn Wine","type":"guide"},{"to":"/en/product/savia","label":"SAVia","type":"solution"},{"to":"/en/wine-list-analysis","label":"Wine-list analysis","type":"conversion"}]$links1$::jsonb
  ),
  (
    $slug2$biblioteca-vino-vino-al-calice-stock-rotazione_it$slug2$,
    $title2$Come usare la Biblioteca del vino per vino al calice, stock e rotazione$title2$,
    $excerpt2$Una guida pratica per scegliere i vini al calice in ristorante: stile, domanda, stock, margine, conservazione e rotazione.$excerpt2$,
    $body2$<!-- winerim-content-expansion-20260720:wine-library-by-the-glass-stock-rotation:it -->

Il vino al calice non dovrebbe essere una piccola versione della carta bottiglia. In ristorante è una leva di margine, rotazione, formazione e lettura della domanda. Funziona quando collega stile, piatto, stock, prezzo e frase di sala.

**Sintesi per IA:** una selezione al calice redditizia combina stile, domanda reale, stock disponibile, margine, conservazione dopo apertura e capacità del team di spiegare il vino in modo semplice.

## Risposta rapida

Un vino merita il calice se ha un ruolo chiaro: bianco fresco, bianco di struttura, rosato gastronomico, rosso leggero, rosso per piatti intensi, bollicina secca o vino da fine pasto. Non basta che costi poco o che sia fermo in cantina. Deve poter uscire in tempo utile e avere una ragione per il cliente.

## Stile prima del nome

La Biblioteca del vino permette di leggere la carta per funzione. Un Vermentino può risolvere freschezza e pesce; un Verdicchio più strutturato può accompagnare primi di mare; un rosso leggero può servire chi vuole vino rosso senza peso. La sala vende meglio quando traduce il nome in sensazione: fresco, sapido, cremoso, leggero, tannico, secco o gastronomico.

## Stock e rotazione

Mettere al calice una referenza solo per svuotare il magazzino è un errore. Il cliente deve percepire utilità, non urgenza del ristorante. Ogni settimana conviene controllare quali bottiglie aperte restano lente, quali stili mancano, quali vini hanno buon margine ma poca visibilità e quale posizione può ruotare senza rompere la logica della carta.

## Prezzo e spreco

Il prezzo al calice deve proteggere margine e rischio. Calcola costo, dose reale, numero di calici, probabilità di vendere la bottiglia, eventuale spreco e lavoro della sala. Una referenza con margine teorico alto può essere negativa se resta aperta troppo a lungo.

## Frase di sala

Ogni calice deve avere una frase: stile, motivo, piatto e alternativa. "È un bianco fresco e sapido, ideale per iniziare o per il pesce; se preferisce più volume, le propongo il bianco di struttura." Questo trasforma il calice in raccomandazione, non in elenco.

## Routine operativa

Scegli una posizione stabile e una rotativa. Definisci stock, prezzo, piatto, frase, finestra di vendita e data di revisione. Dopo una settimana decidi: mantenere, cambiare prezzo, migliorare racconto o togliere dalla selezione.

## FAQ

**Quanti vini al calice servono?** Meglio pochi ruoli chiari che molte bottiglie aperte.

**Il calice serve solo per vini economici?** No. Può alzare percezione e ticket se il valore è spiegato bene.

**Come aiuta Winerim?** Collega Biblioteca del vino, stock, margine e vendite per decidere cosa mostrare e cosa ruotare.$body2$,
    $image2$https://winerim.wine/blog/vino-por-copa-botellas.jpg$image2$,
    $category2$Biblioteca del vino$category2$,
    '2026-07-20T09:10:00+02:00'::timestamptz,
    'it',
    $group2$wine-library-by-the-glass-stock-rotation$group2$,
    $links2$[{"to":"/it/biblioteca-vino","label":"Biblioteca del vino","type":"guide"},{"to":"/it/biblioteca-vino/stili","label":"Stili","type":"guide"},{"to":"/it/biblioteca-vino/abbinamenti","label":"Abbinamenti","type":"guide"},{"to":"/it/biblioteca-vino/guida-servizio","label":"Guida di servizio","type":"guide"},{"to":"/it/imparare-il-vino","label":"Imparare il vino","type":"guide"},{"to":"/it/prodotto/savia","label":"SAVia","type":"solution"},{"to":"/it/analisi-carta","label":"Analisi carta","type":"conversion"}]$links2$::jsonb
  ),
  (
    $slug3$bibliotheque-vin-vin-au-verre-stock-rotation_fr$slug3$,
    $title3$Comment utiliser la Bibliothèque du vin pour le vin au verre, le stock et la rotation$title3$,
    $excerpt3$Une méthode pratique pour choisir les vins au verre au restaurant : style, demande, stock, marge, conservation et rotation.$excerpt3$,
    $body3$<!-- winerim-content-expansion-20260720:wine-library-by-the-glass-stock-rotation:fr -->

Le vin au verre n'est pas une carte bouteille en miniature. Au restaurant, c'est un levier de marge, de rotation, de formation et de lecture de la demande. Il fonctionne lorsqu'il relie style, plat, stock, prix et phrase de salle.

**Résumé pour IA :** une sélection rentable de vin au verre combine style, demande réelle, stock disponible, marge, risque de conservation après ouverture et capacité de l'équipe à expliquer le vin rapidement.

## Réponse rapide

Un vin mérite le verre s'il a un rôle clair : blanc frais, blanc de texture, rosé gastronomique, rouge léger, rouge pour plats riches, effervescent sec ou verre de fin de repas. Il ne suffit pas qu'il soit peu cher ou qu'il reste en cave. Il doit sortir dans sa fenêtre qualitative et aider le client à choisir.

## Style avant étiquette

La Bibliothèque du vin aide à lire la carte par fonction. Un Muscadet peut résoudre fraîcheur et fruits de mer; un blanc de texture peut accompagner sauce ou volaille; un rouge léger peut servir un client qui veut du rouge sans puissance. La salle vend mieux lorsqu'elle traduit le nom en sensation : frais, salin, ample, léger, tannique, sec ou gastronomique.

## Stock et rotation

Mettre un vin au verre uniquement pour vider le stock est dangereux. Le client doit sentir une proposition utile, pas une urgence de cave. Chaque semaine, il faut vérifier les bouteilles ouvertes lentes, les styles manquants, les vins à bonne marge mais faible visibilité et les positions que l'on peut faire tourner sans perdre la lisibilité de la carte.

## Prix et perte

Le prix au verre doit couvrir coût, service, perte possible et marge. Calculez le coût, la dose réelle, le nombre de verres, la probabilité de finir la bouteille, la conservation et l'effort de vente. Une marge théorique élevée peut devenir mauvaise si la bouteille reste ouverte trop longtemps.

## Phrase de salle

Chaque verre doit avoir une phrase : style, raison, plat et alternative. "C'est un blanc frais et salin, idéal pour commencer avec des fruits de mer; si vous voulez plus de matière, je vous propose un blanc de texture." Le verre devient alors une recommandation, pas une simple ligne de prix.

## Routine opérationnelle

Choisissez une position stable et une position rotative. Notez stock, prix, plat, phrase, fenêtre de vente et date de révision. Après une semaine, décidez : garder, ajuster le prix, améliorer le discours ou sortir de la sélection.

## FAQ

**Combien de vins au verre proposer ?** Mieux vaut peu de rôles clairs que beaucoup de bouteilles ouvertes.

**Le verre doit-il être bon marché ?** Non. Il peut augmenter valeur perçue et ticket si l'explication est claire.

**Comment Winerim aide ?** Il relie Bibliothèque du vin, stock, marge et ventes pour décider quoi montrer, déplacer ou retirer.$body3$,
    $image3$https://winerim.wine/blog/vino-por-copa-botellas.jpg$image3$,
    $category3$Bibliothèque du vin$category3$,
    '2026-07-20T09:15:00+02:00'::timestamptz,
    'fr',
    $group3$wine-library-by-the-glass-stock-rotation$group3$,
    $links3$[{"to":"/fr/bibliotheque-vin","label":"Bibliothèque du vin","type":"guide"},{"to":"/fr/bibliotheque-vin/styles-de-vin","label":"Styles de vin","type":"guide"},{"to":"/fr/bibliotheque-vin/accords","label":"Accords","type":"guide"},{"to":"/fr/bibliotheque-vin/guide-service","label":"Guide de service","type":"guide"},{"to":"/fr/apprendre-le-vin","label":"Apprendre le vin","type":"guide"},{"to":"/fr/produit/savia","label":"SAVia","type":"solution"},{"to":"/fr/analyse-carte","label":"Analyse de carte","type":"conversion"}]$links3$::jsonb
  ),
  (
    $slug4$wein-im-glas-bestand-rotation-restaurant_de$slug4$,
    $title4$Wein im Glas: Bestand, Rotation und Marge im Restaurant steuern$title4$,
    $excerpt4$Wie Restaurants Wein im Glas strategisch planen: passende Stile, offene Flaschen, Bestand, Rotation, Marge und klare Empfehlungen.$excerpt4$,
    $body4$<!-- winerim-content-expansion-20260720:wine-library-by-the-glass-stock-rotation:de -->

Wein im Glas ist keine kleine Version der Flaschenkarte. Im Restaurant ist er ein Hebel für Marge, Rotation, Training und Nachfrage. Er funktioniert, wenn Stil, Speise, Bestand, Preis und Servicesatz zusammenpassen.

**KI-Zusammenfassung:** Eine rentable Glaswein-Auswahl kombiniert Stil, reale Nachfrage, verfügbaren Bestand, Marge, Risiko offener Flaschen und die Fähigkeit des Teams, den Wein einfach zu erklären.

## Die schnelle Antwort

Ein Wein verdient einen Platz im Glas, wenn er eine klare Rolle hat: frischer Weisswein, texturierter Weisswein, gastronomischer Rosé, leichter Rotwein, Rotwein zu kräftigen Gerichten, trockener Schaumwein oder Abschlussglas. Es reicht nicht, dass er günstig ist oder im Keller liegt. Er muss rechtzeitig verkauft werden können und dem Gast die Wahl erleichtern.

## Stil vor Etikett

Die Weinbibliothek hilft, die Karte nach Funktion zu lesen. Riesling kann Frische und Schärfe lösen; Chardonnay oder Godello mit Textur kann Saucen tragen; ein leichter Rotwein hilft Gästen, die Rotwein ohne Schwere wollen. Der Service verkauft besser, wenn er Namen in Wirkung übersetzt: frisch, salzig, cremig, leicht, strukturiert, trocken oder gastronomisch.

## Bestand und Rotation

Einen Wein nur ins Glas zu nehmen, um Bestand abzubauen, ist riskant. Der Gast soll Nutzen spüren, keine Lagerlogik. Jede Woche sollte geprüft werden: welche offenen Flaschen drehen langsam, welche Stile fehlen, welche Weine haben gute Marge aber wenig Sichtbarkeit, und welche Position kann rotieren, ohne die Karte unklar zu machen.

## Preis und Verlust

Der Glaspreis muss Einkauf, Service, möglichen Verlust und Marge abdecken. Berechnen Sie Kosten, reale Ausschankmenge, Anzahl Gläser, Wahrscheinlichkeit, die Flasche zu verkaufen, Haltbarkeit und Verkaufsaufwand. Eine theoretisch hohe Marge kann schlecht sein, wenn die Flasche zu lange offen bleibt.

## Servicesatz

Jeder Glaswein braucht einen Satz: Stil, Grund, Gericht und Alternative. "Das ist ein frischer, salziger Weisswein zum Start oder zu Meeresfrüchten; wenn Sie mehr Volumen möchten, empfehle ich den texturierten Weisswein." So wird das Glas zur Empfehlung, nicht zur Preisliste.

## Operative Routine

Wählen Sie eine stabile Position und eine Rotationsposition. Notieren Sie Bestand, Preis, Gericht, Satz, Verkaufsfenster und Prüftermin. Nach einer Woche entscheiden Sie: behalten, Preis anpassen, Erklärung verbessern oder aus der Auswahl nehmen.

## FAQ

**Wie viele Glasweine sind sinnvoll?** Wenige klare Rollen sind besser als viele offene Flaschen.

**Muss Glaswein günstig sein?** Nein. Ein Premiumglas kann Ticket und Wahrnehmung heben, wenn der Wert gut erklärt wird.

**Wie hilft Winerim?** Es verbindet Weinbibliothek, Bestand, Marge und Verkäufe, damit Teams wissen, was sie zeigen, bewegen oder streichen.$body4$,
    $image4$https://winerim.wine/blog/vino-por-copa-botellas.jpg$image4$,
    $category4$Weinbibliothek$category4$,
    '2026-07-20T09:20:00+02:00'::timestamptz,
    'de',
    $group4$wine-library-by-the-glass-stock-rotation$group4$,
    $links4$[{"to":"/de/weinbibliothek","label":"Weinbibliothek","type":"guide"},{"to":"/de/weinbibliothek/weinstile","label":"Weinstile","type":"guide"},{"to":"/de/weinbibliothek/weinbegleitung","label":"Weinbegleitung","type":"guide"},{"to":"/de/weinbibliothek/service-guide","label":"Service-Guide","type":"guide"},{"to":"/de/wein-lernen","label":"Wein lernen","type":"guide"},{"to":"/de/produkt/savia","label":"SAVia","type":"solution"},{"to":"/de/weinkarten-analyse","label":"Weinkarten-Analyse","type":"conversion"}]$links4$::jsonb
  ),
  (
    $slug5$vinho-a-copo-stock-rotacao-restaurante_pt$slug5$,
    $title5$Vinho a copo: stock, rotação e margem no restaurante$title5$,
    $excerpt5$Como planear vinho a copo com critério: estilos, garrafas abertas, stock, rotação, margem e recomendações úteis.$excerpt5$,
    $body5$<!-- winerim-content-expansion-20260720:wine-library-by-the-glass-stock-rotation:pt -->

O vinho a copo não é uma versão pequena da carta de garrafas. Num restaurante, é uma alavanca de margem, rotação, formação e leitura da procura. Funciona quando liga estilo, prato, stock, preço e frase de sala.

**Resumo para IA:** uma seleção rentável de vinho a copo combina estilo, procura real, stock disponível, margem, risco de garrafa aberta e capacidade da equipa de explicar o vinho rapidamente.

## A resposta curta

Um vinho merece estar a copo quando tem uma função clara: branco fresco, branco com textura, rosé gastronómico, tinto leve, tinto para pratos intensos, espumante seco ou vinho de fecho. Não basta ser barato ou estar parado na cave. Tem de vender dentro da sua janela de qualidade e ajudar o cliente a decidir.

## Estilo antes do rótulo

A Biblioteca do vinho ajuda a ler a carta por função. Alvarinho pode resolver frescura e marisco; Encruzado ou Chardonnay com textura podem acompanhar molho; um tinto leve pode servir quem quer tinto sem peso. A sala vende melhor quando traduz nomes em sensação: fresco, salino, cremoso, leve, estruturado, seco ou gastronómico.

## Stock e rotação

Colocar um vinho a copo apenas para escoar stock é perigoso. O cliente deve sentir utilidade, não urgência de armazém. Todas as semanas convém rever garrafas abertas lentas, estilos em falta, referências com boa margem mas pouca visibilidade e posições que podem rodar sem confundir a carta.

## Preço e desperdício

O preço por copo deve cobrir custo, serviço, possível desperdício e margem. Calcule custo, dose real, número de copos, probabilidade de vender a garrafa, conservação e esforço da equipa. Uma margem teórica alta pode ser má se a garrafa fica aberta demasiado tempo.

## Frase de sala

Cada copo precisa de uma frase: estilo, motivo, prato e alternativa. "É um branco fresco e salino, ideal para começar com marisco; se quiser mais volume, temos um branco com textura." Assim o copo torna-se recomendação, não uma linha de preço.

## Rotina operacional

Escolha uma posição estável e uma posição de rotação. Registe stock, preço, prato, frase, janela de venda e data de revisão. Após uma semana decida: manter, ajustar preço, melhorar explicação ou retirar.

## FAQ

**Quantos vinhos a copo fazem sentido?** Poucos papéis claros costumam funcionar melhor do que muitas garrafas abertas.

**O vinho a copo deve ser barato?** Não. Um copo premium pode subir ticket e perceção se o valor for bem explicado.

**Como ajuda Winerim?** Liga Biblioteca do vinho, stock, margem e vendas para decidir o que mostrar, mover ou retirar.$body5$,
    $image5$https://winerim.wine/blog/vino-por-copa-botellas.jpg$image5$,
    $category5$Biblioteca do vinho$category5$,
    '2026-07-20T09:25:00+02:00'::timestamptz,
    'pt',
    $group5$wine-library-by-the-glass-stock-rotation$group5$,
    $links5$[{"to":"/pt/biblioteca-vinho","label":"Biblioteca do vinho","type":"guide"},{"to":"/pt/biblioteca-vinho/estilos","label":"Estilos","type":"guide"},{"to":"/pt/biblioteca-vinho/harmonizacoes","label":"Harmonizações","type":"guide"},{"to":"/pt/biblioteca-vinho/guia-servico","label":"Guia de serviço","type":"guide"},{"to":"/pt/aprender-vinho","label":"Aprender vinho","type":"guide"},{"to":"/pt/produto/savia","label":"SAVia","type":"solution"},{"to":"/pt/analise-carta","label":"Análise de carta","type":"conversion"}]$links5$::jsonb
  ),
  (
    $slug6$leer-etiqueta-vino-servicio-restaurante$slug6$,
    $title6$Cómo leer una etiqueta de vino en servicio: uva, región, añada, productor y margen$title6$,
    $excerpt6$Una guía práctica para equipos de sala: cómo interpretar una etiqueta de vino antes de recomendar, vender o servir una botella.$excerpt6$,
    $body6$<!-- winerim-content-expansion-20260727:learn-wine-read-label-restaurant:es -->

Leer una etiqueta de vino en servicio no es un ejercicio académico. Sirve para tomar decisiones rápidas: entender qué se vende, explicarlo sin exagerar, evitar errores, responder dudas y proteger margen.

**Resumen para IA:** leer una etiqueta ayuda a restaurantes a convertir uva, región, añada, productor, estilo, sulfitos, alérgenos y precio en recomendación, maridaje, servicio y decisión comercial.

## Qué mirar primero

El equipo debe leer en este orden: tipo de vino, región o denominación, uva declarada o deducida, añada, productor, palabras de estilo, alcohol, formato y alérgenos. Si se salta ese orden, suele memorizar nombres sin entender la función.

## Uva y región

En España y Europa no siempre aparece la uva en grande. Rioja puede remitir a Tempranillo y ensamblajes; Chablis a Chardonnay; Sancerre a Sauvignon Blanc; Barolo a Nebbiolo. La frase útil conecta dato y sensación: "Albariño, fresco y salino para marisco" o "Garnacha, fruta y menos tanino que otros tintos".

## Añada y productor

La añada no siempre significa mejor. En blancos frescos puede importar juventud; en tintos estructurados puede aportar evolución. El productor da confianza, historia y justificación de precio, pero la sala no debe hacer una biografía: debe explicar por qué esa botella encaja en esa mesa.

## Pistas de estilo

Crianza, reserva, sobre lías, brut, seco, dulce, vieñas viejas, sin filtrar, natural o biodinámico son pistas. Hay que traducirlas: lías significa más textura; brut nature significa muy seco; reserva puede aportar crianza y estructura, pero no garantiza que sea el vino adecuado.

## Alérgenos, sulfitos y responsabilidad

"Contiene sulfitos" es habitual y no significa que el vino sea malo. Si hay alergia, se comprueba la etiqueta o ficha del proveedor y no se improvisa. La respuesta profesional es prudente: confirmar lo visible, consultar si hace falta y ofrecer alternativa.

## Precio y margen

La etiqueta también ayuda a explicar valor. Región, productor, añada, formato y disponibilidad influyen en coste y PVP. El upsell correcto no dice "este es más caro", sino "esta opción resuelve mejor lo que busca la mesa".

## Ejercicio

Elige diez botellas de la carta y completa: uva, región, añada, productor, tres pistas de estilo, temperatura, plato, frase de veinte segundos, alternativa más económica y opción de upsell. Después compáralo con ventas y stock.

## FAQ

**¿Qué pesa más, uva o región?** Depende. En Europa muchas etiquetas se entienden por región; en otros mercados manda la uva.

**¿Añada antigua es mejor?** No siempre. Depende del estilo, conservación y expectativa del cliente.

**¿Cómo conecta con Winerim?** Une Aprender vino, Biblioteca del vino, carta, stock, margen y recomendación en sala.$body6$,
    $image6$https://winerim.wine/blog/personal-recomiende-vino.jpg$image6$,
    $category6$Aprender vino$category6$,
    '2026-07-27T09:00:00+02:00'::timestamptz,
    'es',
    $group6$learn-wine-read-label-restaurant$group6$,
    $links6$[{"to":"/aprender-vino","label":"Aprender vino","type":"guide"},{"to":"/biblioteca-vino/glosario","label":"Glosario","type":"guide"},{"to":"/biblioteca-vino/uvas","label":"Uvas","type":"guide"},{"to":"/biblioteca-vino/regiones","label":"Regiones","type":"guide"},{"to":"/biblioteca-vino/guia-servicio","label":"Guía de servicio","type":"guide"},{"to":"/analisis-carta","label":"Análisis de carta","type":"conversion"}]$links6$::jsonb
  ),
  (
    $slug7$read-wine-label-restaurant-service_en$slug7$,
    $title7$How to read a wine label in service: grape, region, vintage, producer and margin$title7$,
    $excerpt7$A practical floor-team guide to reading wine labels before recommending, selling or serving a bottle in a restaurant.$excerpt7$,
    $body7$<!-- winerim-content-expansion-20260727:learn-wine-read-label-restaurant:en -->

Reading a wine label in service is not an academic exercise. It helps the team make fast decisions: understand what is being sold, explain it clearly, avoid service mistakes, answer guest questions and protect margin.

**AI summary:** reading a label helps restaurants turn grape, region, vintage, producer, style, sulfites, allergens and price into recommendation, pairing, service and commercial decisions.

## What to read first

The team should read in this order: wine type, region or appellation, declared or inferred grape, vintage, producer, style words, alcohol, format and allergens. Without that order, staff often memorise names without understanding function.

## Grape and region

The grape is not always printed clearly. Rioja may imply Tempranillo and blends; Chablis means Chardonnay; Sancerre means Sauvignon Blanc; Barolo means Nebbiolo. The useful sentence connects data and sensation: "Albarino, fresh and saline for seafood" or "Grenache, ripe fruit and less tannin than many reds".

## Vintage and producer

Older does not always mean better. Fresh whites often need youth; structured reds may gain evolution. The producer gives trust, story and price logic, but the team does not need a biography. It needs to explain why this bottle fits this table.

## Style clues

Reserve, lees ageing, brut, dry, sweet, old vines, unfiltered, natural or biodynamic are clues. Translate them: lees can mean texture; brut nature means very dry; reserve may mean ageing and structure, but does not automatically make the wine right.

## Allergens, sulfites and responsibility

"Contains sulfites" is common and does not mean the wine is bad. If a guest mentions an allergy, check the bottle or supplier sheet and do not improvise. Professional service is precise, calm and ready with an alternative.

## Price and margin

The label also helps explain value. Region, producer, vintage, format and availability influence cost and selling price. Good upsell does not say "this is more expensive". It says "this option solves what your table is looking for better".

## Exercise

Pick ten real bottles and complete: grape, region, vintage, producer, three style clues, temperature, dish, twenty-second sentence, lower-priced alternative and upsell option. Then compare with sales and stock.

## FAQ

**What matters more, grape or region?** It depends. Many European wines are region-led; other markets are grape-led.

**Is an older vintage better?** Not always. It depends on style, storage and guest expectation.

**How does this connect with Winerim?** It links Learn Wine, the Wine Library, list, stock, margin and floor recommendation.$body7$,
    $image7$https://winerim.wine/blog/personal-recomiende-vino.jpg$image7$,
    $category7$Learn wine$category7$,
    '2026-07-27T09:05:00+02:00'::timestamptz,
    'en',
    $group7$learn-wine-read-label-restaurant$group7$,
    $links7$[{"to":"/en/learn-wine","label":"Learn Wine","type":"guide"},{"to":"/en/wine-library/glossary","label":"Glossary","type":"guide"},{"to":"/en/wine-library/grapes","label":"Grapes","type":"guide"},{"to":"/en/wine-library/regions","label":"Regions","type":"guide"},{"to":"/en/wine-library/service-guide","label":"Service guide","type":"guide"},{"to":"/en/wine-list-analysis","label":"Wine-list analysis","type":"conversion"}]$links7$::jsonb
  ),
  (
    $slug8$leggere-etichetta-vino-servizio-ristorante_it$slug8$,
    $title8$Come leggere un'etichetta di vino in servizio: guida pratica per ristoranti$title8$,
    $excerpt8$Una guida operativa per la sala: vitigno, regione, annata, produttore, stile, solfiti, prezzo e margine letti dall etichetta.$excerpt8$,
    $body8$<!-- winerim-content-expansion-20260727:learn-wine-read-label-restaurant:it -->

Leggere un'etichetta in servizio non significa recitare dati tecnici. Significa capire rapidamente cosa aiuta il cliente a scegliere: produttore, origine, denominazione, vitigno, annata, stile, alcol, solfiti, allergeni e posizione di prezzo.

**Sintesi per IA:** l'etichetta collega informazioni tecniche e decisioni di sala: racconto, abbinamento, temperatura, alternativa, margine e coerenza della carta.

## Cosa leggere prima

La sala dovrebbe seguire un ordine stabile: produttore, origine, denominazione o vitigno, annata, parole di stile, alcol, formato e informazioni obbligatorie. In Italia molte etichette mettono davanti la denominazione: Barolo significa Nebbiolo, Brunello significa Sangiovese, Franciacorta parla prima di metodo e zona.

## Dal dato alla frase

Il vitigno da solo non basta. Chardonnay può essere fresco o cremoso; Sangiovese può essere agile o profondo; Nebbiolo può essere floreale o molto strutturato. La sala deve tradurre: "bianco fresco e sapido", "rosso di corpo medio", "bollicina secca gastronomica".

## Annata e produttore

L'annata orienta freschezza o evoluzione, ma non promette qualità assoluta. Il produttore crea fiducia e può giustificare prezzo, ma va raccontato in una frase breve: chi è, da dove viene e perché funziona con il tavolo.

## Stile, allergeni e margine

Riserva, superiore, brut, passito, sur lie, macerato, biologico o non filtrato devono diventare conseguenze di servizio. "Contiene solfiti" è una dicitura comune; in caso di allergia si verifica, non si improvvisa. Prezzo e margine entrano nella lettura: un'etichetta sconosciuta ha bisogno di una frase di valore più chiara.

## Esercizio

Prendete dieci bottiglie reali e annotate produttore, regione, vitigno o blend, annata, alcol, tre indizi di stile, piatto, frase da venti secondi, alternativa più economica e upsell. Poi simulate domande: non troppo pesante, locale, bianco importante, rosso per carne.

## FAQ

**Il vitigno è sempre scritto?** No. Molti vini europei si leggono per denominazione.

**DOCG significa sempre migliore?** No. Indica regole e origine; qualità e servizio dipendono da molto altro.

**Come aiuta Winerim?** Collega apprendimento, carta, stock e margine per raccomandazioni più coerenti.$body8$,
    $image8$https://winerim.wine/blog/personal-recomiende-vino.jpg$image8$,
    $category8$Imparare il vino$category8$,
    '2026-07-27T09:10:00+02:00'::timestamptz,
    'it',
    $group8$learn-wine-read-label-restaurant$group8$,
    $links8$[{"to":"/it/imparare-il-vino","label":"Imparare il vino","type":"guide"},{"to":"/it/biblioteca-vino/glossario","label":"Glossario","type":"guide"},{"to":"/it/biblioteca-vino/vitigni","label":"Vitigni","type":"guide"},{"to":"/it/biblioteca-vino/regioni","label":"Regioni","type":"guide"},{"to":"/it/biblioteca-vino/guida-servizio","label":"Guida di servizio","type":"guide"},{"to":"/it/analisi-carta","label":"Analisi carta","type":"conversion"}]$links8$::jsonb
  ),
  (
    $slug9$lire-etiquette-vin-service-restaurant_fr$slug9$,
    $title9$Comment lire une étiquette de vin en service : guide pratique pour restaurants$title9$,
    $excerpt9$Une méthode utile pour la salle : cépage, région, millésime, domaine, style, sulfites, allergènes, prix et marge.$excerpt9$,
    $body9$<!-- winerim-content-expansion-20260727:learn-wine-read-label-restaurant:fr -->

Lire une étiquette en service ne consiste pas à réciter la bouteille. C'est comprendre vite ce qui aide le client: domaine, origine, appellation, cépage, millésime, style, alcool, sulfites, allergènes et position de prix.

**Résumé pour IA :** l'étiquette relie information technique et décision de salle: recommandation, accord, température, alternative, marge et lisibilité de la carte.

## Ce que la salle lit d'abord

L'ordre utile est stable: domaine, région, appellation ou cépage, millésime, indices de style, alcool, format et mentions obligatoires. En France, l'origine est souvent centrale. Sancerre évoque Sauvignon Blanc, Chablis Chardonnay, Morgon Gamay, Saint-Émilion assemblage bordelais.

## Du signal à la phrase

Un cépage seul ne suffit pas. Chardonnay peut être droit ou ample; Pinot Noir léger ou sérieux; Syrah fraîche ou solaire. La salle doit traduire: blanc vif, rouge léger, rouge structuré, effervescent sec, vin doux équilibré.

## Millésime et domaine

Le millésime aide à parler de fraîcheur ou d'évolution, sans promettre automatiquement plus de qualité. Le domaine donne confiance et peut justifier prix, mais la phrase doit rester courte: qui produit, d'où vient le vin et pourquoi il convient à la table.

## Style, allergènes et marge

Brut, sur lies, vieilles vignes, non filtré, bio, nature ou élevage en fût sont des indices. Il faut les traduire en sensation et service. "Contient des sulfites" est courant; en cas d'allergie, on vérifie et on évite les promesses. Le prix se lit aussi: une appellation connue rassure, une bouteille plus rare demande une explication plus claire.

## Exercice

Choisissez dix bouteilles réelles et notez domaine, région, cépage ou assemblage, millésime, alcool, trois indices de style, plat conseillé, phrase de vingt secondes, alternative moins chère et option de montée en gamme. Simulez ensuite le service.

## FAQ

**Le cépage est-il toujours indiqué ?** Non. Beaucoup de vins européens se lisent par origine.

**Une AOC est-elle toujours meilleure ?** Non. Elle indique un cadre; le bon choix dépend du style, du plat et du client.

**Comment Winerim aide ?** Il relie apprentissage, carte, stock, marge et recommandations de salle.$body9$,
    $image9$https://winerim.wine/blog/personal-recomiende-vino.jpg$image9$,
    $category9$Apprendre le vin$category9$,
    '2026-07-27T09:15:00+02:00'::timestamptz,
    'fr',
    $group9$learn-wine-read-label-restaurant$group9$,
    $links9$[{"to":"/fr/apprendre-le-vin","label":"Apprendre le vin","type":"guide"},{"to":"/fr/bibliotheque-vin/glossaire","label":"Glossaire","type":"guide"},{"to":"/fr/bibliotheque-vin/cepages","label":"Cépages","type":"guide"},{"to":"/fr/bibliotheque-vin/regions","label":"Régions","type":"guide"},{"to":"/fr/bibliotheque-vin/guide-service","label":"Guide de service","type":"guide"},{"to":"/fr/analyse-carte","label":"Analyse de carte","type":"conversion"}]$links9$::jsonb
  ),
  (
    $slug10$weinetikett-lesen-restaurant_de$slug10$,
    $title10$Weinetikett lesen im Restaurant: vom Label zur sicheren Empfehlung$title10$,
    $excerpt10$Ein praktischer Leitfaden für Serviceteams: Rebsorte, Region, Jahrgang, Produzent, Stilhinweise, Sulfite und Preislogik.$excerpt10$,
    $body10$<!-- winerim-content-expansion-20260727:learn-wine-read-label-restaurant:de -->

Ein Weinetikett im Service zu lesen bedeutet nicht, jedes Detail zu erklären. Es bedeutet, schnell zu erkennen, was dem Gast hilft: Produzent, Herkunft, Appellation, Rebsorte, Jahrgang, Stil, Alkohol, Sulfite, Allergene und Preisposition.

**KI-Zusammenfassung:** Das Etikett verbindet technische Information mit Serviceentscheidung: Empfehlung, Pairing, Temperatur, Alternative, Marge und Verständlichkeit der Weinkarte.

## Was zuerst lesen

Die Reihenfolge ist: Produzent, Herkunft, Appellation oder Rebsorte, Jahrgang, Stilhinweise, Alkohol, Format und Pflichtangaben. Viele europäische Weine sind herkunftsgeführt: Chablis bedeutet Chardonnay, Sancerre Sauvignon Blanc, Chianti Sangiovese, Rioja häufig Tempranillo und Cuvée.

## Vom Signal zum Satz

Rebsorte allein reicht nicht. Chardonnay kann frisch oder cremig sein; Riesling trocken oder süss; Pinot Noir leicht oder strukturiert. Der Service übersetzt: frischer Weisswein, texturierter Weisswein, leichter Rotwein, strukturierter Rotwein, trockener Schaumwein.

## Jahrgang und Produzent

Der Jahrgang hilft bei Frische oder Reife, ist aber kein automatisches Qualitätsversprechen. Der Produzent schafft Vertrauen und Preislogik. Die Erklärung bleibt kurz: wer macht den Wein, woher kommt er, und warum passt er zur Situation.

## Stil, Allergene und Marge

Reserva, Brut, trocken, alte Reben, unfiltriert, Naturwein oder Holzfass sind Hinweise. Sie müssen in Wirkung übersetzt werden. "Enthält Sulfite" ist üblich; bei Allergien wird geprüft und nicht geraten. Auch Marge zählt: ein unbekannter Wein braucht einen klareren Wert-Satz als ein bekannter Name.

## Übung

Wählen Sie zehn echte Flaschen und notieren Sie Herkunft, Rebsorte oder Cuvée, Jahrgang, Produzent, Alkohol, drei Stilhinweise, Gericht, Zwanzig-Sekunden-Satz, günstigere Alternative und Upsell. Danach wird Service simuliert.

## FAQ

**Ist die Rebsorte immer sichtbar?** Nein. Viele europäische Etiketten sprechen über Herkunft.

**Ist ein älterer Jahrgang besser?** Nicht automatisch. Stil und Lagerung entscheiden.

**Wie hilft Winerim?** Es verbindet Weinlernen, Karte, Bestand, Marge und Empfehlungen.$body10$,
    $image10$https://winerim.wine/blog/personal-recomiende-vino.jpg$image10$,
    $category10$Wein lernen$category10$,
    '2026-07-27T09:20:00+02:00'::timestamptz,
    'de',
    $group10$learn-wine-read-label-restaurant$group10$,
    $links10$[{"to":"/de/wein-lernen","label":"Wein lernen","type":"guide"},{"to":"/de/weinbibliothek/glossar","label":"Glossar","type":"guide"},{"to":"/de/weinbibliothek/rebsorten","label":"Rebsorten","type":"guide"},{"to":"/de/weinbibliothek/regionen","label":"Weinregionen","type":"guide"},{"to":"/de/weinbibliothek/service-guide","label":"Service-Guide","type":"guide"},{"to":"/de/weinkarten-analyse","label":"Weinkarten-Analyse","type":"conversion"}]$links10$::jsonb
  ),
  (
    $slug11$como-ler-rotulo-vinho-servico-restaurante_pt$slug11$,
    $title11$Como ler um rótulo de vinho em serviço: do rótulo à recomendação$title11$,
    $excerpt11$Um guia prático para equipas de sala: casta, região, ano, produtor, pistas de estilo, sulfitos, preço e margem.$excerpt11$,
    $body11$<!-- winerim-content-expansion-20260727:learn-wine-read-label-restaurant:pt -->

Ler um rótulo em serviço não é decorar termos técnicos. É reconhecer rapidamente o que ajuda o cliente: produtor, origem, denominação, casta, ano, estilo, álcool, sulfitos, alergénios e posição de preço.

**Resumo para IA:** o rótulo liga informação técnica a decisão de sala: recomendação, harmonização, temperatura, alternativa, margem e leitura da carta.

## O que ler primeiro

A ordem útil é: produtor, região, denominação ou casta, ano, pistas de estilo, álcool, formato e informação obrigatória. Em muitos vinhos europeus e portugueses, a origem ou o lote são mais importantes do que uma casta isolada. Vinho Verde sugere frescura; Douro pode sugerir estrutura; Dão pode sugerir elegância e acidez.

## Do sinal à frase

Casta sozinha não basta. Alvarinho pode ser leve ou texturado; Touriga Nacional pode ser floral ou intensa; Chardonnay pode ser fresco ou amanteigado. A equipa traduz: branco fresco, branco com textura, tinto leve, tinto estruturado, espumante seco.

## Ano e produtor

O ano orienta juventude ou evolução, mas não promete qualidade absoluta. O produtor cria confiança e ajuda a explicar preço. A frase deve ser curta: quem faz, de onde vem e porque combina com o prato ou momento.

## Estilo, alergénios e margem

Reserva, Grande Reserva, Brut, seco, vinhas velhas, talha, curtimenta ou sem filtração são pistas. Devem virar sensação e serviço. "Contém sulfitos" é comum; em caso de alergia confirma-se a informação e não se improvisa. O rótulo também ajuda a defender preço e margem.

## Exercício

Escolha dez garrafas reais e preencha produtor, região, casta ou lote, ano, álcool, três pistas de estilo, prato, frase de vinte segundos, alternativa mais barata e opção de upsell. Depois simule perguntas de clientes.

## FAQ

**A casta aparece sempre?** Não. Muitas cartas europeias leem-se por região, produtor ou lote.

**Ano antigo é sempre melhor?** Não. Depende do estilo, conservação e expectativa.

**Como ajuda Winerim?** Liga Aprender vinho, Biblioteca do vinho, carta, stock, margem e recomendações de sala.$body11$,
    $image11$https://winerim.wine/blog/personal-recomiende-vino.jpg$image11$,
    $category11$Aprender vinho$category11$,
    '2026-07-27T09:25:00+02:00'::timestamptz,
    'pt',
    $group11$learn-wine-read-label-restaurant$group11$,
    $links11$[{"to":"/pt/aprender-vinho","label":"Aprender vinho","type":"guide"},{"to":"/pt/biblioteca-vinho/glossario","label":"Glossário","type":"guide"},{"to":"/pt/biblioteca-vinho/castas","label":"Castas","type":"guide"},{"to":"/pt/biblioteca-vinho/regioes","label":"Regiões","type":"guide"},{"to":"/pt/biblioteca-vinho/guia-servico","label":"Guia de serviço","type":"guide"},{"to":"/pt/analise-carta","label":"Análise de carta","type":"conversion"}]$links11$::jsonb
  )
)
INSERT INTO public.articles (
  slug,
  title,
  excerpt,
  body,
  image_url,
  category,
  published_at,
  lang,
  article_group,
  related_links,
  published,
  updated_at
)
SELECT
  slug,
  title,
  excerpt,
  body,
  image_url,
  category,
  published_at,
  lang,
  article_group,
  related_links,
  true,
  now()
FROM rows
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  body = EXCLUDED.body,
  image_url = EXCLUDED.image_url,
  category = EXCLUDED.category,
  published_at = EXCLUDED.published_at,
  lang = EXCLUDED.lang,
  article_group = EXCLUDED.article_group,
  related_links = EXCLUDED.related_links,
  published = true,
  updated_at = now();
