ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS article_group TEXT;

INSERT INTO public.articles (
  slug, title, excerpt, body, image_url, category, author, published, published_at, lang, article_group, related_links, updated_at
) VALUES
(
  'biblioteca-vino-restaurante-vender-mas',
  'Cómo usar una biblioteca del vino para vender más en sala',
  'Una biblioteca del vino no debería ser solo contenido educativo. Bien conectada con tu carta, ayuda al equipo a recomendar mejor, reducir dudas y aumentar el valor de cada servicio.',
  $article$
Una biblioteca del vino es útil cuando deja de ser un diccionario y empieza a funcionar como una herramienta de venta. Para un restaurante, el objetivo no es que el cliente memorice uvas, regiones o estilos, sino que encuentre una recomendación clara para su plato, su presupuesto y su momento.

La diferencia está en conectar conocimiento con decisión. Una ficha de Tempranillo sirve de poco si queda aislada. Gana valor cuando enlaza con Rioja, Ribera del Duero, tintos de crianza, carnes rojas, servicio recomendado y alternativas si el cliente quiere algo más fresco o más gastronómico.

## Qué problema resuelve en un restaurante

En sala, muchas ventas se pierden por fricción. El cliente duda, el equipo no quiere complicar la mesa y la recomendación acaba siendo el vino de siempre. Una biblioteca bien diseñada reduce esa fricción porque ordena las respuestas:

- qué uva encaja con cada estilo de carta;
- qué región transmite confianza al cliente;
- qué estilo explica mejor la botella;
- qué maridaje facilita una recomendación rápida;
- qué alternativa permite subir ticket sin forzar.

Por eso la biblioteca no debe vivir desconectada del negocio. Tiene que apuntar hacia decisiones concretas: copa, botella, maridaje, reposición, precio y formación del equipo.

## De uva a decisión comercial

La ruta útil no empieza en una definición técnica. Empieza en una pregunta de sala:

**"Quiero un tinto para carne, pero no muy pesado."**

Una biblioteca conectada permite convertir esa frase en varias rutas:

- [Tempranillo](/biblioteca-vino/uvas/tempranillo) si el cliente quiere una referencia reconocible.
- [Rioja](/biblioteca-vino/regiones/espana/rioja) si busca confianza y crianza clásica.
- [Mencía](/biblioteca-vino/uvas/mencia) si quiere un tinto más fresco.
- [Tinto crianza](/biblioteca-vino/estilos/tinto-crianza) si la decisión se explica por estilo.
- [Carnes rojas](/biblioteca-vino/maridajes/carnes-rojas) si la conversación empieza desde el plato.

La venta mejora cuando el equipo puede moverse entre esas rutas sin improvisar desde cero.

## Cómo integrarla con tu carta de vinos

El primer paso es seleccionar las entidades que más aparecen en tu carta real. No necesitas empezar con cien uvas. Empieza por las que tu equipo recomienda cada semana:

1. Cinco uvas de alta rotación.
2. Cinco regiones que el cliente reconoce.
3. Cinco estilos que explican la carta.
4. Diez maridajes ligados a platos rentables.

Después, cada entidad debe tener tres datos de uso inmediato:

- **rol en carta:** por qué existe esa referencia;
- **guion de sala:** cómo explicarla en una frase;
- **ruta de venta:** con qué plato, estilo o alternativa conecta.

Ese enfoque convierte la biblioteca en formación práctica. No sustituye al sumiller; le da un sistema.

## Cómo medir si funciona

Una biblioteca útil debería mover indicadores de negocio, no solo visitas:

- más clics desde blog y guías hacia páginas de biblioteca;
- más visitas desde biblioteca hacia análisis de carta o demo;
- más tiempo en páginas de uvas, regiones y maridajes;
- menos concentración de recomendaciones en tres vinos;
- más rotación de referencias que antes eran invisibles.

Si la biblioteca no cambia ninguna decisión de compra, se queda en contenido. Si cambia cómo el equipo recomienda, se convierte en activo comercial.

## Preguntas frecuentes

**¿Una biblioteca del vino sirve para restaurantes sin sumiller?**
Sí. Precisamente ayuda a equipos que necesitan criterio compartido sin depender de una sola persona experta.

**¿Debe estar conectada con la carta digital?**
Idealmente sí. La biblioteca explica; la carta vende. Cuando ambas hablan el mismo idioma, el cliente decide con menos dudas.

**¿Qué debería revisar primero?**
Empieza por el equilibrio de tu carta y por las entidades más repetidas. Puedes usar el [análisis de carta gratuito](/analisis-carta) y cruzarlo con la [biblioteca del vino](/biblioteca-vino).

---

→ [Biblioteca del vino](/biblioteca-vino)  
→ [Uvas para carta de vinos](/biblioteca-vino/uvas)  
→ [Regiones de vino](/biblioteca-vino/regiones)  
→ [Analiza tu carta gratis](/analisis-carta)  
→ [Solicitar demo](/demo)
$article$,
  'https://winerim.wine/blog/vino-estrategico.jpg',
  'Biblioteca del vino',
  'Winerim',
  true,
  '2026-06-01T09:30:00+02:00',
  'es',
  'biblioteca-vino-restaurante-vender-mas',
  '[
    {"to":"/biblioteca-vino","label":"Biblioteca del vino","type":"guide"},
    {"to":"/biblioteca-vino/uvas","label":"Uvas para carta de vinos","type":"guide"},
    {"to":"/biblioteca-vino/regiones","label":"Regiones de vino para restauración","type":"guide"},
    {"to":"/analisis-carta","label":"Analiza tu carta de vinos gratis","type":"tool"},
    {"to":"/demo","label":"Solicitar demo","type":"solution"}
  ]'::jsonb,
  now()
),
(
  'uvas-regiones-equipo-sala-vender-vino',
  'Qué uvas y regiones debe conocer tu equipo para vender mejor el vino',
  'La formación de sala no debería empezar por teoría infinita. Empieza por las uvas y regiones que más ayudan a recomendar, explicar y vender la carta real.',
  $article$
Un equipo de sala no necesita saberlo todo sobre vino para vender mejor. Necesita dominar las rutas que aparecen cada día en el servicio: las uvas que el cliente reconoce, las regiones que generan confianza y los estilos que permiten explicar una botella sin convertir la mesa en una clase.

La formación más eficaz no empieza por un mapa completo del mundo del vino. Empieza por una selección corta, repetible y conectada con la carta del restaurante.

## Por qué empezar por uvas y regiones

El cliente rara vez pide una ficha técnica. Pide seguridad. Cuando alguien pregunta por un vino, normalmente está intentando resolver una de estas dudas:

- si encaja con el plato;
- si será demasiado fuerte o demasiado ligero;
- si el precio merece la pena;
- si el vino es reconocible;
- si puede confiar en la recomendación.

Las uvas y regiones ayudan porque son atajos de confianza. [Tempranillo](/biblioteca-vino/uvas/tempranillo), [Albariño](/biblioteca-vino/uvas/albarino), [Godello](/biblioteca-vino/uvas/godello), [Pinot Noir](/biblioteca-vino/uvas/pinot-noir) o [Chardonnay](/biblioteca-vino/uvas/chardonnay) no son solo nombres: son puertas de entrada a estilos, platos y expectativas.

## Las rutas que más ayudan en sala

Estas rutas son más útiles que una lista aislada de variedades:

### Tempranillo, Rioja y Ribera del Duero

Es la ruta de confianza para tintos españoles. Sirve para carne, platos de cuchara, quesos curados y clientes que quieren algo reconocible. La clave es distinguir entre crianza, reserva y versiones más frescas.

Enlaces útiles: [Tempranillo](/biblioteca-vino/uvas/tempranillo), [Rioja](/biblioteca-vino/regiones/espana/rioja), [Ribera del Duero](/biblioteca-vino/regiones/espana/ribera-del-duero), [Tinto crianza](/biblioteca-vino/estilos/tinto-crianza).

### Albariño, Rías Baixas y cocina de mar

Es una ruta rápida para pescados, mariscos, ostras y aperitivos salinos. Funciona porque el cliente entiende frescura, acidez y origen costero.

Enlaces útiles: [Albariño](/biblioteca-vino/uvas/albarino), [Rías Baixas](/biblioteca-vino/regiones/espana/rias-baixas), [Pescados y mariscos](/biblioteca-vino/maridajes/pescados-y-mariscos), [Ostras](/biblioteca-vino/maridajes/ostras).

### Godello, Chardonnay y blancos con textura

Esta ruta ayuda a vender blancos de mayor valor. Es clave para carnes blancas, arroces, pescados con salsa y clientes que creen que "un blanco serio" no existe.

Enlaces útiles: [Godello](/biblioteca-vino/uvas/godello), [Chardonnay](/biblioteca-vino/uvas/chardonnay), [Blanco con lías](/biblioteca-vino/estilos/blanco-crianza-lias).

### Pinot Noir, Mencía y tintos frescos

Es la alternativa cuando el cliente quiere tinto pero no potencia. Funciona con atún rojo, pato, setas, verduras asadas y cocina más ligera.

Enlaces útiles: [Pinot Noir](/biblioteca-vino/uvas/pinot-noir), [Mencía](/biblioteca-vino/uvas/mencia), [Tinto ligero](/biblioteca-vino/estilos/tinto-ligero).

## Cómo formar al equipo sin saturarlo

Una buena dinámica semanal puede ser muy simple:

1. Elegir una uva y una región de la carta.
2. Probar una referencia durante briefing.
3. Escribir una frase de recomendación.
4. Asociarla a dos platos.
5. Definir una alternativa más barata y otra más premium.

Con diez minutos por semana, el equipo acumula criterio sin recibir una formación pesada.

## Qué no debe faltar

Cada ficha de formación debería tener:

- una frase sencilla para cliente no experto;
- una explicación breve para cliente curioso;
- temperatura de servicio;
- dos platos de la carta;
- una ruta de upsell;
- una alternativa si el cliente rechaza el estilo.

Cuando esto está documentado, la recomendación deja de depender de la memoria de una persona.

## Preguntas frecuentes

**¿Cuántas uvas debería dominar primero un equipo?**
Entre 8 y 12. Mejor pocas bien conectadas que treinta nombres que nadie sabe usar en sala.

**¿Es mejor formar por uvas o por platos?**
Por ambos. El plato inicia muchas conversaciones, pero la uva y la región ayudan a explicar por qué la recomendación tiene sentido.

**¿Cómo detecto qué enseñar primero?**
Empieza por lo que vendes mucho, lo que no rota y lo que tiene más margen. El cruce de ventas, stock y carta muestra dónde la formación tiene más impacto.

---

→ [Uvas de la biblioteca del vino](/biblioteca-vino/uvas)  
→ [Regiones de vino](/biblioteca-vino/regiones)  
→ [Guía para formar al equipo de sala](/guias/como-formar-equipo-sala-para-vender-vino)  
→ [Analiza tu carta gratis](/analisis-carta)
$article$,
  'https://winerim.wine/blog/personal-recomiende-vino.jpg',
  'Formación de sala',
  'Winerim',
  true,
  '2026-06-01T09:31:00+02:00',
  'es',
  'uvas-regiones-equipo-sala-vender-vino',
  '[
    {"to":"/biblioteca-vino/uvas","label":"Uvas de la biblioteca del vino","type":"guide"},
    {"to":"/biblioteca-vino/regiones","label":"Regiones de vino","type":"guide"},
    {"to":"/guias/como-formar-equipo-sala-para-vender-vino","label":"Guía para formar al equipo de sala","type":"guide"},
    {"to":"/analisis-carta","label":"Analiza tu carta de vinos gratis","type":"tool"}
  ]'::jsonb,
  now()
),
(
  'maridajes-carta-vinos-rentable',
  'Cómo crear maridajes que aumenten la venta de vino en tu restaurante',
  'El maridaje no es decoración de carta. Bien usado, reduce la duda del cliente, ayuda al equipo a recomendar y abre rutas de venta por copa, botella y ticket medio.',
  $article$
El maridaje vende cuando es concreto. "Va bien con pescado" ayuda poco. "Este Albariño funciona con ostras porque limpia salinidad y grasa" ayuda mucho más. La diferencia está en transformar una regla general en una decisión fácil para el cliente.

En un restaurante, los maridajes deben cumplir tres funciones: orientar al comensal, facilitar el trabajo del equipo y mejorar la rentabilidad de la carta.

## Por qué el maridaje aumenta ventas

El vino se vende mejor cuando aparece conectado a un plato. Muchos clientes no quieren estudiar la carta; quieren acertar. Si el equipo puede recomendar desde el plato, la fricción baja:

- el cliente entiende por qué ese vino encaja;
- el equipo gana seguridad;
- la carta deja de parecer una lista de nombres;
- aparecen oportunidades de copa premium o botella compartida.

Por eso conviene construir un mapa de maridajes, no una lista improvisada.

## Empieza por los platos, no por los vinos

El error habitual es elegir vinos y luego buscarles platos. En restauración funciona mejor al revés:

1. Lista los platos con más salida.
2. Marca los platos con más margen.
3. Identifica los platos donde el cliente suele pedir vino.
4. Detecta los platos donde el equipo no sabe qué recomendar.
5. Asocia dos opciones de vino: una segura y una de upsell.

Este enfoque convierte el maridaje en una palanca de venta, no en una nota bonita de carta.

## Rutas de maridaje que funcionan

### Mariscos, ostras y blancos frescos

Para platos salinos, crudos o con mucha sensación marina, conviene trabajar acidez, frescura y burbuja.

Rutas útiles: [Ostras](/biblioteca-vino/maridajes/ostras), [Pescados y mariscos](/biblioteca-vino/maridajes/pescados-y-mariscos), [Albariño](/biblioteca-vino/uvas/albarino), [Champagne](/biblioteca-vino/regiones/francia/champagne).

### Carnes rojas y tintos con estructura

Aquí no basta con "tinto". Importa la intensidad del plato, la salsa, la grasa y el punto de cocción. Un Tempranillo crianza puede ser una opción segura; un Cabernet Sauvignon o un Priorat pueden funcionar como upsell si el plato lo soporta.

Rutas útiles: [Carnes rojas](/biblioteca-vino/maridajes/carnes-rojas), [Tempranillo](/biblioteca-vino/uvas/tempranillo), [Tinto reserva](/biblioteca-vino/estilos/tinto-reserva).

### Quesos y vinos de final de comida

Los quesos permiten vender medias copas, generosos, dulces y tintos elegantes. La clave es no aplicar una sola regla para todos los quesos: un queso azul no pide lo mismo que uno fresco o curado.

Ruta útil: [Quesos](/biblioteca-vino/maridajes/quesos).

### Cocina vegetal y tintos ligeros

Verduras, setas, legumbres y platos ahumados pueden vender muy bien vinos ligeros, blancos con textura o tintos frescos.

Rutas útiles: [Tinto ligero](/biblioteca-vino/estilos/tinto-ligero), [Pinot Noir](/biblioteca-vino/uvas/pinot-noir), [Mencía](/biblioteca-vino/uvas/mencia).

## Cómo llevarlo a carta sin saturar al cliente

No hace falta poner un maridaje en cada plato. Empieza por:

- tres entrantes;
- tres principales;
- dos postres o quesos;
- una recomendación por copa;
- una recomendación premium.

Cada recomendación debe tener una frase corta. Ejemplo: "Albariño para limpiar salinidad y reforzar frescura" o "Rioja crianza para acompañar grasa y especia sin tapar el plato".

## Cómo medir si el maridaje funciona

Mide antes y después:

- ventas de vino por mesa;
- ventas por copa en platos concretos;
- ticket medio de mesas que aceptan recomendación;
- rotación de referencias asociadas a platos;
- margen por recomendación.

Si un maridaje no vende, puede fallar el vino, el precio, el guion de sala o la posición en carta.

## Preguntas frecuentes

**¿Debo mostrar los maridajes en la carta digital?**
Sí, pero con moderación. Deben ayudar a decidir, no llenar la pantalla de texto.

**¿Cuántos vinos debería recomendar por plato?**
Uno seguro y uno alternativo suele ser suficiente. Si añades más, puedes volver a crear duda.

**¿Qué maridajes debería priorizar primero?**
Los platos más vendidos, los más rentables y los que generan más preguntas al equipo.

---

→ [Biblioteca de maridajes](/biblioteca-vino/maridajes)  
→ [Generador de maridajes con IA](/wine-pairing-generator)  
→ [Estrategia de maridaje en restauración](/guias/como-crear-una-estrategia-de-maridaje-en-restauracion)  
→ [Analiza tu carta gratis](/analisis-carta)  
→ [Solicitar demo](/demo)
$article$,
  'https://winerim.wine/blog/experiencia-cliente-restaurante.jpg',
  'Maridaje',
  'Winerim',
  true,
  '2026-06-01T09:32:00+02:00',
  'es',
  'maridajes-carta-vinos-rentable',
  '[
    {"to":"/biblioteca-vino/maridajes","label":"Biblioteca de maridajes","type":"guide"},
    {"to":"/wine-pairing-generator","label":"Generador de maridajes con IA","type":"tool"},
    {"to":"/guias/como-crear-una-estrategia-de-maridaje-en-restauracion","label":"Estrategia de maridaje en restauración","type":"guide"},
    {"to":"/analisis-carta","label":"Analiza tu carta de vinos gratis","type":"tool"},
    {"to":"/demo","label":"Solicitar demo","type":"solution"}
  ]'::jsonb,
  now()
)
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