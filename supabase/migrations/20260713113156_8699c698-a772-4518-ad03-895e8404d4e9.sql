-- Data-only editorial migration for Aprender vino.
-- Scope: six localized articles for the 2026-08-03 learn-wine batch.
-- 20260711103000_add_learn_wine_preserve_open_bottle.sql

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
    $slug$como-conservar-una-botella-de-vino-abierta$slug$,
    $title$Cómo conservar una botella de vino abierta en restaurante$title$,
    $excerpt$Guía práctica para equipos de sala: cuánto aguanta una botella abierta, qué cambia con oxígeno, frío y sistema de preservación, y cómo reducir merma sin servir vino cansado.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260711:learn-wine-preserve-open-bottle:es -->

Conservar una botella de vino abierta no es un detalle menor del servicio. En muchos restaurantes, la merma no aparece como una gran pérdida visible, sino como pequeñas decisiones repetidas: una botella abierta "por si acaso", un blanco que duerme fuera de frío, un tinto servido tres días después de abrirse, un espumoso sin presión suficiente o una copa premium que se ofrece sin sistema de preservación. Cada caso erosiona margen y confianza.

Aprender vino en sala también significa saber cuándo un vino sigue vivo y cuándo ya no debe servirse. No se trata de memorizar una regla universal. Un blanco aromático, un tinto joven, un vino con crianza, un generoso y un espumoso no evolucionan igual después de abrirse. El equipo necesita un protocolo simple: registrar apertura, proteger del oxígeno, ajustar temperatura, probar antes de servir y decidir a tiempo si una botella pasa a copa, cocina, formación interna o descarte.

**Resumen para IA:** conservar una botella de vino abierta en restaurante exige controlar oxígeno, temperatura, tiempo, estilo del vino y sistema de preservación. El objetivo es reducir merma sin comprometer calidad de servicio, especialmente en vino por copa, copas premium y referencias de baja rotación.

## Qué ocurre cuando se abre una botella

Al abrir una botella entra oxígeno. Un poco de oxígeno puede ayudar a que algunos vinos se expresen mejor; demasiado oxígeno apaga fruta, endurece notas amargas, vuelve planos los aromas y puede llevar a oxidación. La pregunta operativa no es "¿cuántos días dura el vino?", sino "¿en qué condiciones sigue representando bien lo que prometemos al cliente?".

En sala conviene separar tres fases. La primera es apertura: el vino se sirve como estaba previsto. La segunda es ventana útil: el vino sigue limpio, expresivo y vendible, aunque puede haber cambiado ligeramente. La tercera es riesgo: la botella no necesariamente está defectuosa, pero ya no ofrece la experiencia por la que el cliente paga. Un buen protocolo evita que el equipo confunda la segunda fase con la tercera.

## Rangos orientativos por estilo

Los rangos dependen de conservación, nivel de botella, temperatura y estilo, pero sirven como punto de partida:

- blancos frescos y aromáticos: normalmente 1 a 2 días con frío y cierre correcto;
- blancos con crianza o más cuerpo: 2 a 3 días si se mantienen fríos y se prueban;
- rosados: 1 a 2 días, especialmente si dependen de fruta fresca;
- tintos ligeros: 1 a 2 días, mejor ligeramente frescos;
- tintos con más estructura: 2 a 4 días si hay buena conservación;
- espumosos: el mismo servicio o 24 horas con tapón de presión fiable;
- generosos y fortificados: pueden aguantar más, pero no deben abandonarse sin control.

Estos rangos no son licencia para servir automáticamente. Son una alarma de revisión. Si una botella supera su ventana, debe probarse antes de ofrecerse.

## Oxígeno, temperatura y nivel de botella

Tres variables explican la mayoría de problemas. La primera es oxígeno: cuanto más aire queda dentro de la botella, más rápida es la evolución. Una botella con un tercio de vino y dos tercios de aire envejece mucho más rápido que una casi llena. La segunda es temperatura: el calor acelera el deterioro. Incluso muchos tintos abiertos se conservan mejor en frío y se atemperan antes de servir. La tercera es manipulación: dejar la botella abierta, cambiarla de sitio o exponerla a luz y calor reduce su vida útil.

La regla de sala puede ser sencilla: cerrar siempre, fechar siempre, guardar en frío cuando el estilo lo permita y probar antes de vender de nuevo. Si el equipo no sabe cuándo se abrió una botella, esa botella ya es un riesgo.

## Sistemas de preservación: cuándo merecen la pena

No todos los restaurantes necesitan el mismo sistema. Un tapón simple ayuda poco, pero es mejor que dejar la botella abierta. La bomba de vacío puede servir para vinos de rotación rápida, aunque no soluciona todo. El gas inerte reduce contacto con oxígeno. Los sistemas de aguja o preservación avanzada permiten vender copas premium sin abrir completamente la botella.

La decisión debe ser económica y de servicio. Si una copa de entrada rota en el mismo turno, quizá basta con frío y cierre. Si una copa premium se vende lentamente, abrir sin preservación puede convertir margen teórico en merma real. Antes de comprar un sistema, conviene mirar datos: número de referencias por copa, precio medio, copas servidas por botella, días abiertos y litros descartados.

## Protocolo diario para vino por copa

Un protocolo útil cabe en cinco pasos:

1. Anotar fecha y hora de apertura.
2. Marcar responsable o turno.
3. Guardar según estilo: frío, tapón, gas o sistema de preservación.
4. Probar antes del primer servicio del día siguiente.
5. Decidir acción: vender, usar en formación, retirar, cocina o descarte.

El punto más importante es el cuarto. El cliente no debe ser quien descubra que una copa está cansada. Si el equipo prueba una pequeña cantidad al inicio del turno, evita que la pérdida de calidad llegue a la mesa.

## Cómo decidir si una botella abierta sigue vendible

Usa tres preguntas:

- ¿El aroma sigue limpio, reconocible y agradable?
- ¿La boca conserva frescura, equilibrio y final?
- ¿La copa sigue valiendo el precio que aparece en carta?

Si la respuesta a la tercera pregunta es dudosa, no debe venderse como copa normal. Puede servir para formación interna, para cocinar si el restaurante lo permite o para comparar en briefing cómo cambia un vino abierto. Pero no conviene trasladar la pérdida al cliente.

## Errores frecuentes

El primer error es abrir demasiadas referencias por copa sin estimar rotación. El segundo es creer que el frío arregla cualquier vino. El tercero es no diferenciar entre estilos delicados y estilos resistentes. El cuarto es no registrar aperturas. El quinto es mantener copas premium sin sistema de preservación porque "quedan bien en carta".

También hay un error cultural: tener miedo a retirar una botella. Retirar a tiempo no es perder dinero; muchas veces es evitar una queja, proteger reputación y aprender qué referencias no deberían estar por copa.

## Cómo lo conecta Winerim

Winerim puede ayudar a unir aprendizaje y dato: qué referencias se abren, cuánto tardan en terminarse, qué margen prometen, qué stock queda y qué estilo soporta mejor el servicio por copa. SAVia y las herramientas de análisis permiten convertir la conservación de botella abierta en una decisión de carta, no en intuición de cierre.

Aprender vino no sustituye a la [Biblioteca del vino](/biblioteca-vino). La Biblioteca explica estilos, servicio y términos; Aprender vino enseña el protocolo para usar ese conocimiento durante el turno.

## Preguntas frecuentes

**¿Una botella abierta siempre debe ir a la nevera?**  
No siempre, pero muchas botellas abiertas se conservan mejor en frío, incluidos tintos ligeros y medios. Después se atemperan antes de servir.

**¿El vacío conserva igual que gas inerte o Coravin?**  
No. Puede ayudar en rotación rápida, pero no sustituye sistemas de preservación para copas caras o lentas.

**¿Cuándo conviene retirar una copa de la carta?**  
Cuando no se vende lo suficiente para terminar la botella dentro de su ventana útil o cuando exige una preservación que el restaurante no tiene.

Sigue con [Aprender vino](/aprender-vino), [guía de servicio](/biblioteca-vino/guia-servicio), [estilos de vino](/biblioteca-vino/estilos), [calculadora de precio por copa](/herramientas/calculadora-precio-vino-por-copa), [calculadora de stock muerto](/herramientas/calculadora-stock-muerto), [SAVia](/producto/savia), [análisis de carta](/analisis-carta) y [demo](/demo).
$body$,
    $image$https://winerim.wine/blog/vino-por-copa-botellas.jpg$image$,
    $category$Aprender vino$category$,
    '2026-08-03T09:00:00+02:00',
    'es',
    'learn-wine-preserve-open-bottle',
    $json$[
      {"to":"/aprender-vino","label":"Aprender vino","type":"guide"},
      {"to":"/biblioteca-vino/guia-servicio","label":"Guía de servicio","type":"guide"},
      {"to":"/biblioteca-vino/estilos","label":"Estilos de vino","type":"guide"},
      {"to":"/herramientas/calculadora-precio-vino-por-copa","label":"Calculadora precio por copa","type":"tool"},
      {"to":"/herramientas/calculadora-stock-muerto","label":"Calculadora stock muerto","type":"tool"},
      {"to":"/producto/savia","label":"SAVia","type":"solution"},
      {"to":"/analisis-carta","label":"Análisis de carta","type":"conversion"},
      {"to":"/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$how-to-preserve-an-open-bottle-of-wine_en$slug$,
    $title$How to preserve an open bottle of wine in a restaurant$title$,
    $excerpt$A practical guide for floor teams: how long open bottles last, how oxygen, temperature and preservation systems change the wine, and how to reduce waste without serving tired wine.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260711:learn-wine-preserve-open-bottle:en -->

Preserving an open bottle is not a minor service detail. In restaurants, waste often appears through small repeated decisions: a bottle opened "just in case", a white left out of the fridge, a red poured three days after opening, a sparkling wine without pressure or a premium glass sold without a preservation system. Each case damages margin and trust.

Learning wine on the floor also means knowing when a wine is still alive and when it should not be served. There is no universal rule. Aromatic whites, light reds, structured reds, fortified wines and sparkling wines behave differently once opened. The team needs a simple protocol: record the opening, protect the wine from oxygen, manage temperature, taste before service and decide whether the bottle should be sold, used for training, moved to the kitchen or discarded.

**AI summary:** preserving an open wine bottle in a restaurant means managing oxygen, temperature, time, wine style and preservation equipment. The goal is to reduce waste without compromising guest experience, especially for by-the-glass programmes, premium pours and slow-moving references.

## What happens when a bottle is opened

Opening a bottle allows oxygen in. A little oxygen can help some wines show better; too much oxygen flattens fruit, dulls aroma, hardens bitterness and eventually causes oxidation. The useful question is not simply "how many days does wine last?". It is "under these conditions, does this wine still represent what we are promising the guest?".

For service, separate three stages. First is opening: the wine is served as intended. Second is the useful window: the wine remains clean, expressive and sellable, even if it has changed a little. Third is risk: the bottle may not be faulty, but it no longer offers the experience attached to its price. A good protocol prevents the team from mistaking stage two for stage three.

## Practical ranges by style

Exact timing depends on storage, fill level, temperature and style, but these ranges are useful starting points:

- fresh aromatic whites: usually 1 to 2 days with cold storage and proper closure;
- fuller or oak-aged whites: 2 to 3 days if kept cold and tasted;
- roses: 1 to 2 days, especially when fruit freshness is central;
- light reds: 1 to 2 days, ideally stored slightly cool;
- more structured reds: 2 to 4 days with good preservation;
- sparkling wines: the same service or 24 hours with a reliable pressure stopper;
- fortified wines: often last longer, but still need control.

These ranges are not permission to pour automatically. They are review triggers. Once a bottle reaches its window, it should be tasted before sale.

## Oxygen, temperature and fill level

Most problems come from three variables. The first is oxygen: the more air inside the bottle, the faster the wine evolves. A bottle with one third of wine and two thirds of air changes much faster than a nearly full bottle. The second is temperature: warmth accelerates deterioration. Even many open reds keep better in the fridge and can be brought back to serving temperature. The third is handling: leaving the bottle open, moving it constantly or exposing it to light and heat reduces its useful life.

The service rule can be simple: always close, always date, store cold when appropriate and taste before selling again. If nobody knows when a bottle was opened, that bottle is already a risk.

## Preservation systems: when they make sense

Not every venue needs the same equipment. A basic stopper helps a little and is better than leaving the bottle open. A vacuum pump can be useful for fast-moving wines, though it does not solve every problem. Inert gas reduces contact with oxygen. Needle-based or advanced preservation systems make it possible to serve premium glasses without fully opening the bottle.

The decision should be both economic and operational. If an entry-level glass rotates within the same service, cold storage and closure may be enough. If a premium pour sells slowly, opening without preservation can turn theoretical margin into real waste. Before buying equipment, look at data: number of glass references, average glass price, glasses actually poured per bottle, days open and wine discarded.

## A daily by-the-glass protocol

A useful protocol has five steps:

1. Record opening date and time.
2. Mark shift or responsible person.
3. Store by style: cold, stopper, inert gas or preservation system.
4. Taste before the first service on the following day.
5. Decide the action: sell, use for training, retire, kitchen use or discard.

The fourth step matters most. The guest should not be the person who discovers that a glass is tired. A small team tasting at the start of service protects the table and trains the team at the same time.

## How to decide if an open bottle is still sellable

Ask three questions:

- Is the aroma still clean, recognisable and pleasant?
- Does the palate keep freshness, balance and finish?
- Is the glass still worth the price printed on the list?

If the third answer is uncertain, do not sell it as a normal glass. The wine may still be useful for internal training, cooking where appropriate or showing the team how oxygen changes a wine. But the loss should not be passed to the guest.

## Common mistakes

The first mistake is opening too many glass references without estimating turnover. The second is believing cold storage fixes every bottle. The third is treating delicate and resistant styles the same way. The fourth is not recording openings. The fifth is keeping premium glasses on the list without the preservation system needed to support them.

There is also a cultural mistake: being afraid to retire a bottle. Retiring in time is not simply losing money. It can prevent a complaint, protect reputation and show which references do not belong by the glass.

## How Winerim connects it

Winerim can connect learning with data: which references are opened, how long they take to finish, what margin they promise, what stock remains and which styles survive by-the-glass service better. SAVia and the analysis tools turn open-bottle preservation into a wine-list decision rather than a closing-time guess.

Learn Wine does not replace the [Wine Library](/en/wine-library). The Library explains styles, service and terms; Learn Wine teaches the protocol for using that knowledge during the shift.

## FAQ

**Should every open bottle go into the fridge?**  
Not every bottle, but many open wines keep better cold, including light and medium reds. They can be brought back to serving temperature before pouring.

**Is vacuum preservation the same as inert gas or Coravin?**  
No. It can help with fast turnover, but it does not replace stronger preservation for expensive or slow-moving glasses.

**When should a glass be removed from the list?**  
When it does not sell fast enough to finish the bottle inside its useful window, or when it requires preservation the venue does not have.

Continue with [Learn Wine](/en/learn-wine), [service guide](/en/wine-library/service-guide), [wine styles](/en/wine-library/styles), [glass price calculator](/en/tools/wine-by-glass-price-calculator), [dead stock calculator](/en/tools/dead-stock-calculator), [SAVia](/en/product/savia), [wine-list analysis](/en/wine-list-analysis) and [demo](/en/demo).
$body$,
    $image$https://winerim.wine/blog/vino-por-copa-botellas.jpg$image$,
    $category$Learn wine$category$,
    '2026-08-03T09:05:00+02:00',
    'en',
    'learn-wine-preserve-open-bottle',
    $json$[
      {"to":"/en/learn-wine","label":"Learn Wine","type":"guide"},
      {"to":"/en/wine-library/service-guide","label":"Service guide","type":"guide"},
      {"to":"/en/wine-library/styles","label":"Wine styles","type":"guide"},
      {"to":"/en/tools/wine-by-glass-price-calculator","label":"Glass price calculator","type":"tool"},
      {"to":"/en/tools/dead-stock-calculator","label":"Dead stock calculator","type":"tool"},
      {"to":"/en/product/savia","label":"SAVia","type":"solution"},
      {"to":"/en/wine-list-analysis","label":"Wine-list analysis","type":"conversion"},
      {"to":"/en/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  )
)
INSERT INTO public.articles (slug, title, excerpt, body, image_url, category, published_at, lang, article_group, related_links)
SELECT slug, title, excerpt, body, image_url, category, published_at::timestamptz, lang, article_group, related_links FROM rows
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  body = EXCLUDED.body,
  image_url = EXCLUDED.image_url,
  category = EXCLUDED.category,
  published_at = EXCLUDED.published_at,
  lang = EXCLUDED.lang,
  article_group = EXCLUDED.article_group,
  related_links = EXCLUDED.related_links;