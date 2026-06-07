ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS lang TEXT DEFAULT 'es';
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS article_group TEXT;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS related_links jsonb DEFAULT '[]'::jsonb;

INSERT INTO public.articles (
  slug,
  title,
  excerpt,
  body,
  image_url,
  category,
  author,
  author_role,
  published,
  published_at,
  lang,
  article_group,
  related_links,
  updated_at
) VALUES (
  'alex-peiro',
  '"Cada vez se busca apoyar más vinos de pequeños vignerons y de máxima expresión del Terroir."',
  'Álex Peiró, sumiller en Restaurante Casamar, habla de pequeños vignerons, terroir y curiosidad como claves para construir una carta de vinos con identidad.',
  $article$
Originario de Palafrugell, Àlex Peiró tiene el restaurante en la sangre desde pequeño. Hoy es el responsable de elevar la experiencia gastronómica del comensal en Restaurante Casamar, donde la carta de vinos funciona como una prolongación natural de la cocina, del territorio y del ritmo de sala.

La frase que da título a esta entrevista resume una sensibilidad cada vez más presente en la restauración gastronómica: no basta con tener etiquetas reconocibles. Una carta interesante también debe abrir espacio a pequeños vignerons, zonas menos evidentes y vinos capaces de explicar un paisaje en la copa.

Ese enfoque conecta directamente con una forma más contemporánea de entender la sumillería. El cliente no siempre pide tecnicismos, pero sí agradece una recomendación que tenga sentido: por el plato, por el momento, por el presupuesto y por la curiosidad que despierta. Ahí es donde el sumiller deja de ser solo prescriptor y se convierte en traductor del vino.

## Terroir y pequeños productores en una carta de restaurante

Apoyar vinos de pequeños vignerons no significa llenar la carta de referencias difíciles. Significa construir una selección con intención. Cada vino debe tener una razón clara para estar ahí: porque expresa una región, porque ofrece una alternativa a una denominación más conocida, porque permite explicar una uva con personalidad o porque ayuda a crear un maridaje memorable.

Para un restaurante, esa decisión tiene una lectura comercial muy concreta. Las referencias con identidad necesitan contexto. Si el equipo de sala sabe explicar por qué un vino nace de un suelo, de un clima o de una forma concreta de trabajar la viña, la recomendación gana confianza. Y si esa explicación se apoya en una [biblioteca del vino](/biblioteca-vino) bien conectada, el conocimiento deja de depender de una sola persona.

La clave está en ordenar la información por rutas de decisión:

- la [uva](/biblioteca-vino/uvas) que define el perfil del vino;
- la [región](/biblioteca-vino/regiones) que aporta origen y relato;
- el [estilo](/biblioteca-vino/estilos) que ayuda a anticipar textura, cuerpo y frescura;
- el [maridaje](/biblioteca-vino/maridajes) que convierte la botella en una recomendación útil para el plato.

## Cómo llevar esa idea a sala

La máxima expresión del terroir no siempre se vende con grandes discursos. A menudo se vende con una frase precisa. Un tinto fresco de montaña puede ser la alternativa a un Rioja más clásico; un blanco con crianza sobre lías puede ocupar el lugar de un Chardonnay con más volumen; un espumoso de método tradicional puede acompañar una secuencia completa de platos sin perder tensión.

Por eso una carta de vinos moderna necesita capas. En la primera capa, el cliente encuentra seguridad: nombres, precios, categorías y estilos. En la segunda, el equipo puede profundizar: origen, productor, añada, servicio, temperatura, copa y plato recomendado. En la tercera, el restaurante analiza qué se vende, qué no rota y qué referencias merecen más visibilidad.

Winerim trabaja precisamente en esa intersección entre criterio de sumillería y gestión operativa. Una carta digital no debería ser solo un PDF bonito. Debería ayudar a conectar conocimiento, recomendación y rentabilidad, ya sea desde el [software de carta de vinos](/software-carta-de-vinos), desde el [análisis de carta](/analisis-carta) o desde herramientas que ayuden al equipo a vender mejor.

## Qué puede aprender un restaurante de esta visión

La lectura de Álex Peiró es especialmente útil para restaurantes que quieren diferenciarse sin hacer que la carta sea intimidante. El objetivo no es acumular rarezas, sino crear caminos de descubrimiento. Una carta puede tener referencias reconocibles y, al mismo tiempo, reservar espacio para productores pequeños, regiones emergentes o estilos que el cliente no pediría por iniciativa propia.

Ese equilibrio suele funcionar mejor cuando la carta responde a preguntas reales de sala:

- ¿Qué vino ayuda a explicar la cocina de la casa?
- ¿Qué referencia permite subir el ticket medio sin forzar la venta?
- ¿Qué botella merece una explicación especial del equipo?
- ¿Qué estilo puede recomendarse por copa para abrir conversación?
- ¿Qué maridaje convierte un plato en una experiencia más completa?

La tecnología no sustituye esa sensibilidad. La ordena. Si el restaurante sabe qué vinos quiere defender, una herramienta como Winerim puede ayudar a mantener la información actualizada, detectar oportunidades y convertir la carta en un sistema vivo, no en una lista estática.

**1. Un consejo:**

No perdáis nunca la curiosidad por probar vinos desconocidos.

Ese consejo es también una buena regla para gestionar una carta. La curiosidad no tiene por qué estar reñida con la rentabilidad. Al contrario: cuando se combina con datos, formación y una biblioteca de apoyo, permite que más vinos encuentren su momento, su plato y su cliente adecuado.

> "Cada vez se busca apoyar más vinos de pequeños vignerons y de máxima expresión del Terroir."
$article$,
  'https://winerim.wine/wp-content/uploads/2024/03/Un-vaso-de-vino-en-el-momento-oportuno-vale-mas-que-todas-las-riquezas-de-la-tierra-11-1024x1024.jpg',
  'interview',
  'Álex Peiró',
  'Sumiller en Restaurante Casamar',
  true,
  COALESCE((SELECT published_at FROM public.articles WHERE slug = 'alex-peiro'), '2024-03-01T09:00:00+01:00'::timestamptz),
  'es',
  'sommelier-corner',
  '[
    {"to":"/biblioteca-vino","label":"Biblioteca del vino","type":"guide"},
    {"to":"/biblioteca-vino/uvas","label":"Uvas para carta de vinos","type":"guide"},
    {"to":"/biblioteca-vino/regiones","label":"Regiones de vino para restauración","type":"guide"},
    {"to":"/biblioteca-vino/estilos","label":"Estilos de vino para servicio","type":"guide"},
    {"to":"/biblioteca-vino/maridajes","label":"Maridajes por plato y ocasión","type":"guide"},
    {"to":"/software-carta-de-vinos","label":"Software de carta de vinos","type":"solution"},
    {"to":"/analisis-carta","label":"Analiza tu carta de vinos gratis","type":"tool"},
    {"to":"/demo","label":"Solicitar demo","type":"solution"}
  ]'::jsonb,
  now()
) ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  body = EXCLUDED.body,
  image_url = EXCLUDED.image_url,
  category = EXCLUDED.category,
  author = EXCLUDED.author,
  author_role = EXCLUDED.author_role,
  published = EXCLUDED.published,
  published_at = COALESCE(public.articles.published_at, EXCLUDED.published_at),
  lang = EXCLUDED.lang,
  article_group = EXCLUDED.article_group,
  related_links = EXCLUDED.related_links,
  updated_at = now();
